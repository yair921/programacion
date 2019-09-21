const ctrDistribuidor = require('../controllers/ctrDistribuidor');
const ctrSalaTipo = require('../controllers/ctrSalaTipo');
const ctrTeatro = require('../controllers/ctrTeatro');
const ctrPeliculaFormato = require('../controllers/ctrPeliculaFormato');
const ctrSala = require('../controllers/ctrSala');
const ctrPelicula = require('../controllers/ctrPelicula');
const ctrUserOption = require('../controllers/ctrUserOption');


module.exports = {
    getAllDistribuidor: ctrDistribuidor.getAll,
    getAllSalaTipo: ctrSalaTipo.getAll,
    getAllTeatro: ctrTeatro.getAll,
    getAllPeliculaFormato: ctrPeliculaFormato.getAll,
    getAllSala: ctrSala.getAll,
    getAllPelicula: ctrPelicula.getAll,
    getAllUserOption: ctrUserOption.getAll
}