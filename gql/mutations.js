const ctrDistribuidor = require('../controllers/ctrDistribuidor');

module.exports = {
    addDistribuidor: ctrDistribuidor.add,
    updateDistribuidor: ctrDistribuidor.update,
    deleteDistribuidor: ctrDistribuidor.delete
}