
INSERT INTO department (name)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 4),
    ("Salesperson", 80000, 4),
    ("Lead Engineer", 150000, 1),
    ("Software Engineer", 120000, 1),
    ("Account Manager", 160000, 2),
    ("Accountant", 125000, 2),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Michael", "Reeves", 3, NULL),
    ("Sarah", "Williams", 1, NULL),
    ("Jack", "Johnson", 6, 1),  
    ("Emily", "Jones", 7, NULL),    
    ("Rachel", "Brown", 8, 2),   
    ("Michael", "Davis", 2, 1),  
    ("Daniel", "Wilson", 4, 2),  
    ("Matthew", "Miller", 2, 1),
    ("David", "Anderson", 5, NULL), 
    ("Christopher", "Taylor", 4, 2),
    ("Nicholas", "Green", 2, 6);
