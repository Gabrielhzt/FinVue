CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE incomes (
  income_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  type VARCHAR,
  title VARCHAR,
  amount DECIMAL,
  date DATE,
  total DECIMAL
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  type VARCHAR,
  title VARCHAR,
  amount DECIMAL,
  date DATE
);

CREATE TABLE members (
  member_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  full_name VARCHAR,
  amount DECIMAL DEFAULT 0
);