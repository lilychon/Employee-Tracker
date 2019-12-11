DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(5,2),
  PRIMARY KEY (id),
  department_id INT,
  CONSTRAINT FK_RoleDepartment 
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  CONSTRAINT FK_EmployeesRole 
    FOREIGN KEY (role_id) 
    REFERENCES role(id),
  manager_id INT,
  CONSTRAINT FK_ManagerEmployee 
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id),
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Lily", "Chon", 6), 
("Jeff", "Lee", 1), 
("James", "Moon", 3), 
("Jane", "Kim", 4), 
("Kate", "Jung", 5), 
("Eugene", "Park", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("UC Engineer", 90, 1), 
("Software Engineer", 80, 2), 
("Network Engineer", 95, 3), 
("Security Analyst", 70, 4), 
("Service Desk Analyst", 60, 5), 
("Applications Analyst", 75, 6);

INSERT INTO department (name)
VALUES ("Unified Communication"), 
("Infrastructure"), 
("Networking"), 
("Security"), 
("Service Desk"), 
("Applications");