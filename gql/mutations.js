const ctrDistribuidor = require('../controllers/ctrDistribuidor');
const ctrSalaTipo = require('../controllers/ctrSalaTipo');
const ctrTeatro = require('../controllers/ctrTeatro');
const ctrPeliculaFormato = require('../controllers/ctrPeliculaFormato');
const ctrSala = require('../controllers/ctrSala');
const ctrPelicula = require('../controllers/ctrPelicula');
const ctrUserOption = require('../controllers/ctrUserOption');

module.exports = {
    addDistribuidor: ctrDistribuidor.add,
    updateDistribuidor: ctrDistribuidor.update,
    deleteDistribuidor: ctrDistribuidor.delete,
    addSalaTipo: ctrSalaTipo.add,
    updateSalaTipo: ctrSalaTipo.update,
    deleteSalaTipo: ctrSalaTipo.delete,
    addTeatro: ctrTeatro.add,
    updateTeatro: ctrTeatro.update,
    deleteTeatro: ctrTeatro.delete,
    addPeliculaFormato: ctrPeliculaFormato.add,
    updatePeliculaFormato: ctrPeliculaFormato.update,
    deletePeliculaFormato: ctrPeliculaFormato.delete,
    addSala: ctrSala.add,
    updateSala: ctrSala.update,
    deleteSala: ctrSala.delete,
    addPelicula: ctrPelicula.add,
    updatePelicula: ctrPelicula.update,
    deletePelicula: ctrPelicula.delete,
    addUserOption: ctrUserOption.add,
    updateUserOption: ctrUserOption.update,
    deleteUserOption: ctrUserOption.delete
}