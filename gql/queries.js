const ctrDistribuidor = require('../controllers/ctrDistribuidor');
const ctrTeatro = require('../controllers/ctrTeatro');
const ctrSalaTipo = require('../controllers/ctrSalaTipo');


module.exports = {
    getAllDistribuidor: ctrDistribuidor.getAll,
    getAllSalaTipo: ctrSalaTipo.getAll,
    getAllTeatro: ctrTeatro.getAll
}