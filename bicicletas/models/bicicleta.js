// Obtiene la conexión con la base de datos
const { bicicleta_create } = require('../controllers/api/bicicletasControllerAPI');
const knex = require('../database/connection');

let Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id
    this.color = color
    this.modelo = modelo
    this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = function(){
    return `Id: ${this.id}, color: ${this.color}`
}

Bicicleta.add = function(aBici){
    return knex('bicicletas').insert({id: aBici.id, color: aBici.color, modelo: aBici.modelo, lat: aBici.ubicacion[0], lon: aBici.ubicacion[1]})
}


// Obtiene todos las bicis en la base
Bicicleta.allBicis = () => {
    return knex
      .select('*')
      .from('bicicletas');
  }



//Eliminar
// Bicicleta.findById = function(aBiciId){
//     Bicicleta.find(aBiciId)
//     .then((data) => {
//         let aBici = data;
//         if(aBici){
//             console.log(aBici)
//             return aBici
//         }
//         else{
//             throw new Error(`No existe una bici con el id: ${aBiciId}`)
//         }

//     })

    
 
// }

Bicicleta.findById = (aBiciId) =>{
    return knex('bicicletas')
    .select('*')
    .where('id',aBiciId)
    .first()
}

Bicicleta.update = (aBici) => {
    return knex('bicicletas')
    .where('id', aBici.id)
    .update({id: aBici.id, color: aBici.color, modelo: aBici.modelo, lat: aBici.ubicacion[0], lon: aBici.ubicacion[1]})
}


Bicicleta.removeById = (aBiciId) => {
    return knex("bicicletas").where("id", aBiciId).del()
}

module.exports = Bicicleta