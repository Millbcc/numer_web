MySQL CODE

CREATE DATABASE numerapi;

USE numerapi;

CREATE TABLE linear_regression (
  id INT AUTO_INCREMENT PRIMARY KEY,
  x FLOAT,
  y FLOAT
);

INSERT INTO linear_regression (x, y) VALUES
(1, 2),
(2, 5),
(3, 8),
(4, 10),
(5, 9);


CREATE TABLE bisection_method (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equation VARCHAR(100),
  xl FLOAT,
  xr FLOAT,
  epsilon FLOAT
);

INSERT INTO bisection_method (equation, xl, xr, epsilon)
VALUES ('x^4 - 13', 0, 8, 0.000001);


