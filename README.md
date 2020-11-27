#Prueba de programación
##Base de datos MySQL
Para poder utilizar la base de datos debes de abrir  **MySQL Workbench**, donde copiaras el contenido del archivo **carFormDB.sql** de la carpeta **database** o lo puedes copiar a continuación:


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

Y después ejecutaras el código para crear la base de datos.

##API Nodejs, Express y MySQL
Para poder correr el Api abre un CMD y coloca la path  de la carpeta del proyecto como se te muestra a continuación:

    C:\> cd "Path de la carpeta del proyecto"

A continuación ejecutaras una serie de comandos:

    C:\"Path"> npm install
	C:"Path"\> npm start

El segundo comando es para que pueda correr los servicios del Api.

##Visualizar API

Para poder visualizar la Api abra el navegador de su preferencia y coloque en el buscador la siguiente path:

    http://localhost:3000

Y así ya podra ha empezar a utilizar la Api.

##Excepciones
Si cuando levantas el Api da algún error puede que sea por las credenciales del usuario y la contraseña que esta manejando MySQl en ese momento. Si es ese el caso tiene que al archivo **keys.js** que se encuentra en la carpeta **src** que se encuentra dentro de la carpeta del proyecto y deberá de cambiar lo que se encuentra entre comillas dobles "  " a continuación:

		module.exports = {
		database: {
			host: 'localhost',
			user: "'Tu_usuario_de_MySQL'",
			password: "'Tu_contraseña_de_MySQL'",
			database: 'CarForm',
			insecureAuth: true
		}
	}