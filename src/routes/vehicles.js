const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const regexPlaca = /^[a-zA-Z]{1}[-]{1}[a-zA-Z]{3}[0-9]{3}$/;

router.get('/add', isLoggedIn, (req, res) => {
    res.render('vehicles/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { brand, model, year, licensePlate, state } = req.body;
    const newVehicle = {
        brand,
        model,
        year,
        licensePlate,
        state,
        user_id: req.user.id
    };
    if (regexPlaca.test(licensePlate)) {
        await pool.query('INSERT INTO vehicle set ?', [newVehicle]);
        req.flash('success', 'Vehículo guardado exitosamente');
        res.redirect('/vehicles');
    } else {
        req.flash('message', "Placa inválida");
        res.redirect('/vehicles/add');
    }

});

router.get('/', isLoggedIn, async (req, res) => {
    const vehicle = await pool.query('SELECT * FROM vehicle WHERE user_id = ?', [req.user.id]);
    res.render('vehicles/list', { vehicle });
});

router.get('/deleted/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM vehicle WHERE id = ?', [id]);
    req.flash('success', 'Vehículo removido satisfactoriamente');
    res.redirect('/vehicles');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const vehicle = await pool.query('SELECT * FROM vehicle WHERE id = ?', [id]);
    res.render('vehicles/edit', { vehicle: vehicle[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { brand, model, year, licensePlate, state } = req.body;
    const newVehicle = {
        brand,
        model,
        year,
        licensePlate,
        state
    };
    if (regexPlaca.test(licensePlate)) {
        await pool.query('UPDATE VEHICLE set ? WHERE id = ?', [newVehicle, id]);
        req.flash('success', 'Vehículo actualizado exitosamente');
        res.redirect('/vehicles');
    } else {
        req.flash('message', "Placa inválida");
        res.redirect('/vehicles');
    }

});

module.exports = router;