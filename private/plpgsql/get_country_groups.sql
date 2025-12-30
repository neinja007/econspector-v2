DECLARE
  v_result json;
BEGIN
  WITH country_groups_base AS (
    SELECT
      cg.id,
      cg.name,
      cg.description,
      cg.core
    FROM users.country_groups cg
    WHERE cg.user_id = p_user_id
       OR (cg.user_id IS NULL AND cg.core = TRUE)
  ),
  countries_with_values AS (
    SELECT
      cgc.group_id,
      cgc.country_cca3,
      (
        SELECT tsd.value
        FROM data.time_series_data tsd
        WHERE tsd.country_code = cgc.country_cca3
          AND tsd.source_id = p_source_id
        ORDER BY tsd.period DESC
        LIMIT 1
      ) as sort_value
    FROM users.country_groups_countries cgc
    WHERE cgc.group_id IN (SELECT id FROM country_groups_base)
  ),
  sorted_countries AS (
    SELECT
      group_id,
      array_agg(
        country_cca3
        ORDER BY
          CASE WHEN sort_value IS NULL THEN 1 ELSE 0 END,
          sort_value DESC NULLS LAST
      ) as countries
    FROM countries_with_values
    GROUP BY group_id
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', cgb.id,
      'name', cgb.name,
      'description', cgb.description,
      'core', cgb.core,
      'countries', COALESCE(sc.countries, ARRAY[]::text[])
    )
  )::json
  INTO v_result
  FROM country_groups_base cgb
  LEFT JOIN sorted_countries sc ON sc.group_id = cgb.id;

  RETURN v_result;
END;
