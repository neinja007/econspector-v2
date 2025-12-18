-- PL/pgSQL function to get ranked countries
-- Equivalent to the getRankedCountries JavaScript function
--
-- Parameters:
--   p_level: 'countries' | 'regions' | 'subregions' (currently only 'countries' is supported)
--   p_source_id: The source ID to filter by
--   p_start_year: Start year of the timespan
--   p_end_year: End year of the timespan
--
-- Returns: JSON array of ranked items with the following structure:
--   [
--     {
--       "score": number,
--       "item": {
--         "type": "country",
--         "code": string (cca3),
--         "name": string,
--         "fullName": string,
--         "iconPath": string (cca2)
--       },
--       "coverage": [
--         {
--           "code": "temporal",
--           "label": "Temporal Coverage",
--           "coverage": [
--             {"code": "year", "covered": boolean},
--             ...
--           ]
--         }
--       ],
--       "rank": number,
--       "type": "country"
--     },
--     ...
--   ]

CREATE OR REPLACE FUNCTION data.get_ranked_countries(
  p_level TEXT,
  p_source_id INTEGER,
  p_start_year INTEGER,
  p_end_year INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  v_result JSON;
BEGIN
  -- Validate level parameter
  IF p_level != 'countries' THEN
    RAISE EXCEPTION 'Only "countries" level is currently supported';
  END IF;

  -- Build the complete result in a single query
  WITH country_aggregates AS (
    SELECT
      c.cca3,
      c.name,
      c.full_name,
      c.cca2,
      AVG(tsd.value) as avg_value,
      jsonb_agg(
        jsonb_build_object(
          'period', tsd.period,
          'value', tsd.value
        ) ORDER BY tsd.period
      ) FILTER (WHERE tsd.value IS NOT NULL) as data_points
    FROM data.time_series_data tsd
    INNER JOIN data.countries c ON tsd.country_code = c.cca3
    WHERE tsd.source_id = p_source_id
      AND tsd.period >= p_start_year::TEXT
      AND tsd.period <= p_end_year::TEXT
      AND tsd.value IS NOT NULL
      AND c.name IS NOT NULL
    GROUP BY c.cca3, c.name, c.full_name, c.cca2
    HAVING COUNT(tsd.value) > 0
  ),
  ranked_with_coverage AS (
    SELECT
      ca.cca3,
      ca.avg_value as score,
      jsonb_build_object(
        'type', 'country',
        'code', ca.cca3,
        'name', ca.name,
        'fullName', COALESCE(ca.full_name, ca.name),
        'iconPath', ca.cca2
      ) as item,
      jsonb_build_array(
        jsonb_build_object(
          'code', 'temporal',
          'label', 'Temporal Coverage',
          'coverage', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'code', year_val::TEXT,
                'covered', EXISTS (
                  SELECT 1
                  FROM jsonb_array_elements(ca.data_points) AS point
                  WHERE (point->>'period')::TEXT = year_val::TEXT
                )
              ) ORDER BY year_val
            )
            FROM generate_series(p_start_year, p_end_year) AS year_val
          )
        )
      ) as coverage
    FROM country_aggregates ca
  ),
  ranked_with_rank AS (
    SELECT
      jsonb_build_object(
        'score', rwc.score,
        'item', rwc.item,
        'coverage', rwc.coverage,
        'rank', row_number() OVER (ORDER BY rwc.score DESC),
        'type', 'country'
      ) as ranked_item
    FROM ranked_with_coverage rwc
    ORDER BY rwc.score DESC
  )
  SELECT jsonb_agg(ranked_item ORDER BY (ranked_item->>'rank')::INTEGER)::JSON
  INTO v_result
  FROM ranked_with_rank;

  RETURN COALESCE(v_result, '[]'::JSON);
END;
$$;

-- Grant execute permission (adjust as needed for your security model)
-- GRANT EXECUTE ON FUNCTION data.get_ranked_countries(TEXT, INTEGER, INTEGER, INTEGER) TO authenticated;
