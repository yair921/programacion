const ctrDistribuidor = require('../controllers/ctrDistribuidor');
const ctrTeatro = require('../controllers/ctrTeatro');
const ctrSalaTipo = require('../controllers/ctrSalaTipo');
const ctrPeliculaFormato = require('../controllers/ctrPeliculaFormato');


module.exports = {
    getAllDistribuidor: ctrDistribuidor.getAll,
    getAllSalaTipo: ctrSalaTipo.getAll,
    getAllTeatro: ctrTeatro.getAll,
    getAllPeliculaFormato: ctrPeliculaFormato.getAll
}