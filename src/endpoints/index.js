const { Router } = require('express');
const { getPersons, createPerson, getPersonByDocument } = require('../controllers/personController');

const router = Router();

//Empleados:
router.get('/person', getPersons);
router.get('/person/:type/:document', getPersonByDocument);
router.post('/person', createPerson);

module.exports = router