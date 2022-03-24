const Bicicleta = require('../models/bicicleta')

exports.bicicleta_list = function(req, res){
    Bicicleta.allBicis()
    .then((data) => {
        let bicicletas = data;
    res.render('bicicletas/index', {bicis: bicicletas})
    })  
}

exports.bicicleta_create_get = function(req, res){
    res.render('bicicletas/create')
}

exports.bicicleta_create_post = function(req, res){
    let temp_bici = {
        id:req.body.id, 
        color:req.body.color, 
        modelo:req.body.modelo,
        lat:req.body.lat,
        lon:req.body.lon
    }
    Bicicleta.add(temp_bici).then(function(){
        res.redirect('/bicicletas')

    })
    
} 

exports.bicicleta_delete_post = function(req, res){
    Bicicleta.removeById(req.params.id)
    .then(function () {
            res.redirect('/bicicletas')
    })
}

exports.bicicleta_update_get = function(req, res){
    Bicicleta.findById(req.params.id)
    .then((data) => {
        let bici = data;
        if(bici){
            console.log(bici)
            res.render('bicicletas/update', {bici})
        }
        else{
            throw new Error(`No existe una bici con el id: ${bici}`)
        }
    })
    
}

// exports.bicicleta_update_post = function(req, res){
//     let bici = Bicicleta.findById(req.body.id)
//     bici.id = req.body.id
//     bici.color = req.body.color
//     bici.modelo = req.body.modelo
//     bici.ubicacion = [req.body.lat, req.body.lon]

//     res.redirect('/bicicletas')
// }

exports.bicicleta_update_post = function(req, res){
    let temp_bici = {
        id:req.body.id, 
        color:req.body.color, 
        modelo:req.body.modelo,
        lat:req.body.lat,
        lon:req.body.lon
    }
    Bicicleta.update(temp_bici)
    .then(function(){
        res.redirect('/bicicletas')
    })

    
}