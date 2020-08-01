## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
createdb cyf_classes;
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
create table mentors(
id SERIAL primary key,
name VARCHAR(40) not NULL,
years INT,
address VARCHAR(100) not null,
city VARCHAR (100) not null,
postcode VARCHAR(100),
country VARCHAR(50) not null,
favourite_code VARCHAR(50)
);
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
INSERT INTO mentors (name, years,address, city, postcode, country, favourite_code) VALUES ('Carlos',10, 'C Canalejas', 'Barcelona', '08038','SPAIN','JavaScript');
 INSERT INTO mentors (name, years,address, city, postcode, country, favourite_code) VALUES ('Juan',14, 'C Riereta', 'Barcelona', '08001','SPAIN','Java');
 INSERT INTO mentors (name, years,address, city, postcode, country, favourite_code) VALUES ('Jay',12, 'C Catalans', 'Barcelona', '08028','SPAIN','Python');
 INSERT INTO mentors (name, years,address, city, postcode, country, favourite_code) VALUES ('Vincent',19, 'C Raval', 'Barcelona', '08038','SPAIN','REACT');
 INSERT INTO mentors (name, years,address, city, postcode, country, favourite_code) VALUES ('Ricard',10, 'C bond', 'Barcelona', '007','SPAIN','JavaScript');

--4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
create table students(
id SERIAL primary key,
student_name VARCHAR(40) not NULL,
student_address VARCHAR(100) not null,
student_city VARCHAR (100) not null,
student_postcode VARCHAR(100),
student_country VARCHAR(50) not null,
student_code_your_future_graduated VARCHAR(50) not NULL
);
select * from students;

--5. Insert 10 students in the `students` table.
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Akond', 'C Riereta 32', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Alex', 'C Raval 33', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Juan', 'C Ramla 11', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Anandamaya', 'C Catalan 88', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Ruben', 'C Ferrocarrils 92', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Gustavo', 'C Torrasa 32', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Gustavo', 'C plaza 23', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Umar', 'C Turkey 66', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Thiago', 'C Catalunya 99', 'Barcelona', '08001','SPAIN', 'yes' );
INSERT INTO students (student_name, student_address , student_city, student_postcode,student_country, student_code_your_future_graduated) VALUES ('Alejandro', 'C Sants 92', 'Barcelona', '08001','SPAIN', 'yes' );

6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
select * from mentors ;
select * from students;
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location
   
create table classes(  id     SERIAL PRIMARY KEY,
mentor_name  VARCHAR(30) NOT NULL,
topic     VARCHAR(120) NOT NULL,
date date  NOT NULL,
location   VARCHAR(120)
  );

8. Insert a few classes in the `classes` table
INSERT INTO classes (mentor_name, topic, date, location) VALUES ('Carlos','Node.js','2020-07-02','Barcelona');
 INSERT INTO classes (mentor_name, topic, date, location) VALUES ('Juan','JavaScript','2020-06-02','Barcelona');
 INSERT INTO classes (mentor_name, topic, date, location) VALUES ('Jay','React','2020-05-02','Barcelona');
 INSERT INTO classes (mentor_name, topic, date, location) VALUES ('Vincent','css','2020-04-02','Barcelona');
 INSERT INTO classes (mentor_name, topic, date, location) VALUES ('Richard','SQL','2020-03-02','Barcelona');

9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
create table attendance(
student_id int references students(id),
class_id int references classes(id));

insert into attendance values(1,2);
insert into attendance values(2,1);
insert into attendance values(3,4);
insert into attendance values(4,2);
insert into attendance values(5,3);
insert into attendance values(6,5);
insert into attendance values(7,2);
insert into attendance values(8,1);

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
	   select * from mentors where years>5;

    - Retrieve all the mentors whose favourite language is Javascript
   	   select * from mentors where favourite_code ='javascript';

    - Retrieve all the students who are CYF graduates
    select * from students where student_code_your_future_graduated='yes';
   
    - Retrieve all the classes taught before June this year
   	 select * from classes c2  where date <'2020-06-01';

    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
    select student_id from attendance s2   where class_id=2;

