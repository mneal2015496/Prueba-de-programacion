const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

/* Login*/

passport.use('local.signin', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passwordUser',
    passReqToCallback: true
}, async (req, userName, passwordUser, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE userName = ?', [userName]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(passwordUser, user.passwordUser);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.userName));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario ingresado no existe'));
    }
}));

/* Signup */
passport.use('local.signup', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passwordUser',
    passReqToCallback: true
}, async (req, userName, passwordUser, done) => {
    const { fullName, email, roleUser } = req.body;
    const newUser = {
        userName,
        passwordUser,
        fullName,
        email,
        roleUser: "Admin"
    };
    newUser.passwordUser = await helpers.encryptPassword(passwordUser);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});