const mongoose = require('mongoose')
const Bicicleta = require('../../models/bicicleta')
const request = require('request')

let base_url = 'http://localhost:3000/api/bicicletas/'

const assert = require('assert');

describe('Bicicletas API', () => {

    beforeEach(function(done){
        var mongoDB = 'mongodb://127.0.0.1:27017/red_bicicletas'
        mongoose.connect(mongoDB, {})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function(){
            console.log('Connected to the test database')
            done()
        })
    })

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err)
            const db = mongoose.connection
            db.close()
            done()
        })
    })


     //Tests...

    //Crear una instancia de bicicleta
    describe('Bicicleta.createInstance', ()=>{
        it('Crea una instancia de la bicicleta', (done)=>{
            let bici = Bicicleta.createInstance(1, 'verde', 'urbana', [19.28, -99.13])

            assert.equal(bici.code,1)
            assert.equal(bici.color,'verde')
            assert.equal(bici.modelo,'urbana')
            assert.equal(bici.ubicacion[0],19.28)
            assert.equal(bici.ubicacion[1],-99.13)
            done()
            
        })
    });


    //Añadir una bicicleta
    describe('Bicicleta.add', () => {
        it('Agregar una bici', (done) =>{
            let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
            Bicicleta.add(bici, function(err, newBici){
                if(err) console.log(err)
                Bicicleta.allBicis(function(err, bicis){
                    assert.equal(bicis.length, 1)
                    assert.equal(bicis[0].code, bici.code)
                    done()
                })
            })

        })
    })

    //Listar todas las bicicletas
    describe('Bicicleta.allBicis', ()=>{
        it('comienza vacía', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                assert.equal(bicis.length,0)
                done()
            })
        })
    })


    //Encontrar bici por código
    describe('Find a bike by its code', ()=>{
        it('should return bike with code 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                assert.equal(bicis.length,0)

                let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                Bicicleta.add(bici, function(err, newBike){
                    if(err) console.log(err)

                    let bici2 = new Bicicleta({code: 2, color: 'blanca', modelo: 'montaña'})
                    Bicicleta.add(bici2, function(err, newBike){                        
                        if(err) console.log(err)

                        Bicicleta.findByCode(1, function(err, targetBici){
                            assert.equal(targetBici.code,bici.code)
                            assert.equal(targetBici.color,bici.color)
                            assert.equal(targetBici.modelo,bici.modelo)
                            done()
                        })
                    })
                })
            })
        })
    })

    //Eliminar bicicleta
    describe('Remove a bike by its code', ()=>{
        it('should delete bike with code 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                assert.equal(bicis.length,0)
                let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                Bicicleta.add(bici, function(err, newBike){
                    if(err) console.log(err)
                    Bicicleta.allBicis(function(err, bicis){
                        assert.equal(bicis.length,1)
                        Bicicleta.removeByCode(1, function(err, cb){
                            Bicicleta.allBicis(function(err, bicis){
                                assert.equal(bicis.length,0)
                            
                                done()
                            })
                        })
                    })
                })
            })
        })
    })



})