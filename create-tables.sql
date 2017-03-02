DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS analytics;

CREATE TABLE profiles (
  id serial,
  first_name varchar,
  last_name varchar,
  email varchar,
  url varchar
);

CREATE TABLE analytics (
  id serial,
  cookie varchar,
  time varchar,
  user int references profiles(id)
)
