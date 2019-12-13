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
  salary DECIMAL,
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
