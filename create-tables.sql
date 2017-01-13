DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS analytics_1;

CREATE TABLE profiles (
  id serial,
  first_name varchar,
  last_name varchar,
  email varchar
)
