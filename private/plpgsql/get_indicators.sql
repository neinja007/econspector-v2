-- Parameters:
--   p_group_id: Optional indicator group ID to filter by (currently unused)
--   p_user_id: ID of the user requesting the indicators (currently unused)
--
-- Returns: JSON array of indicators with nested structure:
--   [
--     {
--       "id": number,
--       "name": string,
--       "code": string,
--       "description": string,
--       "unit": string,
--       "chart_type": string,
--       "parent_id": null,
--       "indicator_frequencies": [
--         {
--           "id": number,
--           "frequency": string,
--           "indicator_id": number,
--           "frequency_sources": [
--             {
--               "id": number,
--               "frequency_id": number,
--               "data_source": number,
--               "wb-code": string,
--               "origin": string,
--               "data_updated_at": string
--             }
--           ]
--         }
--       ],
--       "children": [
--         {
--           "id": number,
--           "name": string,
--           ...
--           "indicator_frequencies": [...]
--         }
--       ]
--     }
--   ]

CREATE OR REPLACE FUNCTION data.get_indicators(
  p_group_id INTEGER DEFAULT NULL,
  p_user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  v_result json;
BEGIN
  WITH parent_indicators AS (
    SELECT *
    FROM data.indicators i
    WHERE i.parent_id IS NULL
  ),
  children_indicators AS (
    SELECT *
    FROM data.indicators i
    WHERE i.parent_id IS NOT NULL
      AND i.parent_id IN (SELECT id FROM parent_indicators)
  ),
  parent_frequencies AS (
    SELECT
      if.indicator_id,
      jsonb_agg(
        jsonb_build_object(
          'id', if.id,
          'frequency', if.frequency,
          'indicator_id', if.indicator_id,
          'frequency_sources', COALESCE(fs.sources, '[]'::jsonb)
        )
      ) as frequencies
    FROM data.indicator_frequencies if
    LEFT JOIN LATERAL (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', fs.id,
          'frequency_id', fs.frequency_id,
          'data_source', fs.data_source,
          'wb-code', fs."wb-code",
          'origin', fs.origin,
          'data_updated_at', fs.data_updated_at
        )
      ) as sources
      FROM data.frequency_sources fs
      WHERE fs.frequency_id = if.id
    ) fs ON true
    WHERE if.indicator_id IN (SELECT id FROM parent_indicators)
    GROUP BY if.indicator_id
  ),
  children_frequencies AS (
    SELECT
      if.indicator_id,
      jsonb_agg(
        jsonb_build_object(
          'id', if.id,
          'frequency', if.frequency,
          'indicator_id', if.indicator_id,
          'frequency_sources', COALESCE(fs.sources, '[]'::jsonb)
        )
      ) as frequencies
    FROM data.indicator_frequencies if
    LEFT JOIN LATERAL (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', fs.id,
          'frequency_id', fs.frequency_id,
          'data_source', fs.data_source,
          'wb-code', fs."wb-code",
          'origin', fs.origin,
          'data_updated_at', fs.data_updated_at
        )
      ) as sources
      FROM data.frequency_sources fs
      WHERE fs.frequency_id = if.id
    ) fs ON true
    WHERE if.indicator_id IN (SELECT id FROM children_indicators)
    GROUP BY if.indicator_id
  ),
  children_with_frequencies AS (
    SELECT
      ci.*,
      COALESCE(cf.frequencies, '[]'::jsonb) as indicator_frequencies
    FROM children_indicators ci
    LEFT JOIN children_frequencies cf ON cf.indicator_id = ci.id
  ),
  parents_with_children AS (
    SELECT
      pi.*,
      COALESCE(pf.frequencies, '[]'::jsonb) as indicator_frequencies,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', cwf.id,
            'name', cwf.name,
            'code', cwf.code,
            'description', cwf.description,
            'unit', cwf.unit,
            'chart_type', cwf.chart_type,
            'parent_id', cwf.parent_id,
            'indicator_frequencies', cwf.indicator_frequencies
          )
        ) FILTER (WHERE cwf.id IS NOT NULL),
        '[]'::jsonb
      ) as children
    FROM parent_indicators pi
    LEFT JOIN parent_frequencies pf ON pf.indicator_id = pi.id
    LEFT JOIN children_with_frequencies cwf ON cwf.parent_id = pi.id
    GROUP BY pi.id, pi.name, pi.code, pi.description, pi.unit, pi.chart_type, pi.parent_id, pf.frequencies
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', pwc.id,
      'name', pwc.name,
      'code', pwc.code,
      'description', pwc.description,
      'unit', pwc.unit,
      'chart_type', pwc.chart_type,
      'parent_id', pwc.parent_id,
      'indicator_frequencies', pwc.indicator_frequencies,
      'children', pwc.children
    )
    ORDER BY pwc.name
  )::json
  INTO v_result
  FROM parents_with_children pwc;

  RETURN COALESCE(v_result, '[]'::JSON);
END;
$$;
