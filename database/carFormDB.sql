Create database CarForm;


Use CarForm;

-- User Table --

Create Table users(
	id int auto_increment not null,
    fullName varchar(100) not null,
    userName varchar(100) not null,
    email varchar(100) not null,
    passwordUser varchar(100) not null,
    roleUser varchar(100) not null,
    primary key PK_id (id)
); 

describe users;

-- Vehicle table --

Create Table vehicle(
	id int auto_increment not null,
    brand varchar(100) not null,
    model varchar(100) not null,
    year varchar(100) not null,
    licensePlate varchar(100) not null,
    state varchar(100) not null,
    user_id int,
    created_at timestamp not null default current_timestamp,
    primary key PK_id (id),
    constraint fk_user foreign key (user_id) references users(id)
); 

describe vehicle;