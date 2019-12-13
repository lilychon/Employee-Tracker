INSERT INTO department (name)
VALUES ("Unified Communication"), 
("Infrastructure"), 
("Networking"), 
("Security"), 
("Service Desk"), 
("Applications");

INSERT INTO role (title, salary, department_id)
VALUES ("UC Engineer", 90, 1), 
("Software Engineer", 80, 2), 
("Network Engineer", 95, 3), 
("Security Analyst", 70, 4), 
("Service Desk Analyst", 60, 5), 
("Applications Analyst", 75, 6);
("UC Manager", 110, 1),
("Infrastructure Manager", 120, 2);
("Network Manager", 120, 3);
("Security Manager", 120, 4);
("Service Desk Manager", 120, 5);
("Applications Manager", 120, 6);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Lily", "Chon", 6), 
("Jeff", "Lee", 1), 
("James", "Moon", 3), 
("Jane", "Kim", 4), 
("Kate", "Jung", 5), 
("Sinae", "Kim", 7);
("Irene", "Cho", 8);
("Catherine", "Choi", 9);
("Sam", "Hong", 10);
("Sean", "Choe", 11);
("Daniel", "Lee", 12);
