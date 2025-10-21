CREATE DATABASE IF NOT EXISTS numerapi;
USE numerapi;

CREATE TABLE IF NOT EXISTS bisection_data (
  equation VARCHAR(100),
  xl FLOAT,
  xr FLOAT,
  epsilon FLOAT
);

CREATE TABLE IF NOT EXISTS linear_data (
  x FLOAT,
  y FLOAT
);

INSERT INTO bisection_data (equation, xl, xr, epsilon)
VALUES ('x^4 - 13', 0, 8, 0.000001);

INSERT INTO linear_data (x, y)
VALUES (1, 2), (2, 5), (3, 8), (4, 10), (5, 9);
