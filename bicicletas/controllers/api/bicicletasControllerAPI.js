const Bicicleta =  require('../../models/bicicleta')

exports.bicicleta_list = function(req, res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })
}


exports.bicicleta_create = function(req, res){
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.lon]
    Bicicleta.add(bici)
    console.log(req.body)
    res.status(200).json({
        bicicleta: bici
    })
}
 
exports.bicicleta_delete = function(req, res){
    Bicicleta.removeById(req.body.id)
    res.status(204).send()
}