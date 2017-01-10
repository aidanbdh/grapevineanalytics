DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id serial,
  username varchar,
  password varchar,
  email varchar,
  first_name varchar,
  last_name varchar
)
