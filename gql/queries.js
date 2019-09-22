const ctrDistributor = require('../controllers/ctrDistributor');
const ctrRoomType = require('../controllers/ctrRoomType');
const ctrTheater = require('../controllers/ctrTheater');
const ctrMovieFormat = require('../controllers/ctrMovieFormat');
const ctrRoom = require('../controllers/ctrRoom');
const ctrMovie = require('../controllers/ctrMovie');
const ctrUserOption = require('../controllers/ctrUserOption');


module.exports = {
    getAllDistributor: ctrDistributor.getAll,
    getAllRoomType: ctrRoomType.getAll,
    getAllTheater: ctrTheater.getAll,
    getAllMovieFormat: ctrMovieFormat.getAll,
    getAllRoom: ctrRoom.getAll,
    getAllMovie: ctrMovie.getAll,
    getAllUserOption: ctrUserOption.getAll
}