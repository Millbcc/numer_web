MySQL CODE

CREATE DATABASE numerapi;

USE numerapi;

CREATE TABLE data_points(
  solution VARCHAR(50),
  x FLOAT,
  y FLOAT,
  equation VARCHAR(50),
  xl FLOAT,
  xr FLOAT,
  epsilon FLOAT
);

INSERT INTO data_points(solution,x,y) VALUES
('lr',1,2),
('lr',2,5),
('lr',3,8),
('lr',4,10),
('lr',5,9);

INSERT INTO data_points(solution,equation,xl,xr,epsilon) VALUES
('bs','x^4-13',0,8,0.000001);
