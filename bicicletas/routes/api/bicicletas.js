var express = require('express');
var router = express.Router();
let bicicletaControllerAPI = require('../../controllers/api/bicicletasControllerAPI')

//API GET, get all bicis
router.get('/', bicicletaControllerAPI.bicicleta_list)

//API POST, create bicis
router.get('/create', bicicletaControllerAPI.bicicleta_create)


//actualizar, borrar, crear todo via API

module.exports = router;