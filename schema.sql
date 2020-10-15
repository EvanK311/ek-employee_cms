DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE Department (
 id INT AUTO_INCREMENT NOT NULL,
 names VARCHAR(30) NULL,
 PRIMARY KEY (id) 
);

CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(30),
    Salary DECIMAL(6,2),
    Department_id INT, 
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, 
    PRIMARY KEY(id)
    )


