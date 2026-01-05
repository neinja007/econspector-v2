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
    SELECT i.id, i.name, i.code, i.description, i.unit, i.chart_type
    FROM data.indicators i
    WHERE i.parent_id IS NULL
  ),
  children_indicators AS (
    SELECT i.id, i.name, i.code, i.description, i.unit, i.chart_type, i.parent_id
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
          'frequency_sources', COALESCE(fs.sources, '[]'::jsonb)
        )
      ) as frequencies
    FROM data.indicator_frequencies if
    LEFT JOIN LATERAL (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', fs.id,
          'data_source', jsonb_build_object(
            'abbreviation', ds.abbreviation,
            'icon_path', ds.icon_path,
            'name', ds.name,
            'website', ds.website
          ),
          'origin', fs.origin
        )
      ) as sources
      FROM data.frequency_sources fs
      INNER JOIN data.data_sources ds ON ds.id = fs.data_source
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
          'frequency_sources', COALESCE(fs.sources, '[]'::jsonb)
        )
      ) as frequencies
    FROM data.indicator_frequencies if
    LEFT JOIN LATERAL (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', fs.id,
          'data_source', jsonb_build_object(
            'abbreviation', ds.abbreviation,
            'icon_path', ds.icon_path,
            'name', ds.name,
            'website', ds.website
          ),
          'origin', fs.origin
        )
      ) as sources
      FROM data.frequency_sources fs
      INNER JOIN data.data_sources ds ON ds.id = fs.data_source
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
            'indicator_frequencies', cwf.indicator_frequencies
          )
        ) FILTER (WHERE cwf.id IS NOT NULL),
        '[]'::jsonb
      ) as children
    FROM parent_indicators pi
    LEFT JOIN parent_frequencies pf ON pf.indicator_id = pi.id
    LEFT JOIN children_with_frequencies cwf ON cwf.parent_id = pi.id
    GROUP BY pi.id, pi.name, pi.code, pi.description, pi.unit, pi.chart_type, pf.frequencies
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', pwc.id,
      'name', pwc.name,
      'code', pwc.code,
      'description', pwc.description,
      'unit', pwc.unit,
      'chart_type', pwc.chart_type,
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
