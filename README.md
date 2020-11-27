<h1>Prueba de programación</h1>
<h2>Base de datos MySQL</h2>
<p>Para poder utilizar la base de datos debes de abrir  <strong>MySQL Workbench</strong>, donde copiaras el contenido del archivo <strong>carFormDB.sql</strong> de la carpeta <strong>database</strong> o lo puedes copiar a continuación:</p>


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

<p>Y después ejecutaras el código para crear la base de datos.</p>

<h2>API Nodejs, Express y MySQL</h2>
<p>Para poder correr el Api abre un CMD y coloca la path  de la carpeta del proyecto como se te muestra a continuación:</p>

    C:\> cd "Path de la carpeta del proyecto"

<p>A continuación ejecutaras una serie de comandos:</p>

    C:\"Path"> npm install
	C:"Path"\> npm start

<p>El segundo comando es para que pueda correr los servicios del Api.</p>

<h2>Visualizar API</h2>

<p>Para poder visualizar la Api abra el navegador de su preferencia y coloque en el buscador la siguiente path:</p>

    http://localhost:3000

<p>Y así ya podra ha empezar a utilizar la Api.</p>

<h2>Excepciones</h2>
<p>Si cuando levantas el Api da algún error puede que sea por las credenciales del usuario y la contraseña que esta manejando MySQl en ese momento. Si es ese el caso tiene que al archivo <strong>keys.js</strong> que se encuentra en la carpeta <strong>src</strong> que se encuentra dentro de la carpeta del proyecto y deberá de cambiar lo que se encuentra entre comillas dobles "  " a continuación:</p>

		module.exports = {
		database: {
			host: 'localhost',
			user: "'Tu_usuario_de_MySQL'",
			password: "'Tu_contraseña_de_MySQL'",
			database: 'CarForm',
			insecureAuth: true
		}
	}
