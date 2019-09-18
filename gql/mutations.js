const ctrDistribuidor = require('../controllers/ctrDistribuidor');
const ctrSalaTipo = require('../controllers/ctrSalaTipo');
const ctrTeatro = require('../controllers/ctrTeatro');
const ctrPeliculaFormato = require('../controllers/ctrPeliculaFormato');

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
    deletePeliculaFormato: ctrPeliculaFormato.delete
}