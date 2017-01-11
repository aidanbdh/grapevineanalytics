DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id serial,
  first_name varchar,
  last_name varchar,
  username varchar,
  password varchar,
  email varchar
)
