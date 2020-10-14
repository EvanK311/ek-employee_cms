DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE Department (
  id INT NOT NULL AUTO INCREMENT,
  names VARCHAR(30) NULL,
   PRIMARY KEY(id) 
);

CREATE TABLE Role (
    id INT PRIMARY KEY,
    Title VARCHAR(30),
    Salary DECIMAL(6,2),
    Department_id INT 
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY (id)
)

CREATE TABLE Employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
    manager_id INT 
    )


-- SELECT * FROM top5000;