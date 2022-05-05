

let Usuario = require('../models/usuario')
const Bicicleta = require('../models/bicicleta')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Reserva = require('../models/reserva')

module.exports = {

    list: function(req, res, next){
        Usuario.find({}, (err, usuarios) => {
            res.render('usuarios/index', {usuarios: usuarios})
        })
    },

    update_get: function(req, res, next){
        Usuario.findById(req.params.id, function(err, usuario){
            res.render('usuarios/update', {errors:{}, usuario: usuario})
        })
    },

    update: function(req, res, next){
        let update_values = {nombre: req.body.nombre}
        Usuario.findByIdAndUpdate(req.params.id, update_values, function(err, usuario){
            if(err) {
                console.log(err)
                res.render('usuario/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })})
            }
            else{
                res.redirect('/usuarios')
                return
            }
        })
    },

    create_get: function(req, res, next){
        res.render('usuarios/create', { errors:{}, usuario: new Usuario() } )
    },

    create: function(req, res, next){
        if(req.body.password != req.body.confirm_password){
            res.render('usuarios/create', {errors: {confirm_password: {message: 'No coinciden los passwords '}},  usuario: new Usuario({nombre: req.body.nombre, email: req.body.email }) })
            return
        }
        Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }, function(err, nuevoUsuario) {
            if(err){
                res.render('usuarios/create', {errors: {email: {message: 'Ya existe un usuario con ese password'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })})
            }
            else{
                nuevoUsuario.enviar_mail_bienvenida()
                res.redirect('/usuarios')
            }
        })
    },


    delete: function(req, res, next){
        Usuario.findByIdAndDelete(req.body.id, function(err){
            if(err)
                next(err)
            else
                res.redirect('/usuarios')
        })
    },

    login_get: function(req, res, next){
        res.render('usuarios/login')

    },

    login: async function(req, res, next){
       try{
            // Get user input
            const { email, password } = req.body;
            // Validate user input
            if (!(email && password)) {
            res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
             const user = await Usuario.findOne({ email });

            if(!user.verificado){
                 return res.status(400).send("Su cuenta no ha sido verificada");
             }

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                        { user_id: user._id, email },
                        process.env.TOKEN_KEY,
                        {
                        expiresIn: "5h",
                        }
                     )

                 // save user token
                user.passwordResetToken = token;
                let xt = token
                res.setHeader('x-access-token', token);
                res.cookie("jwt", xt, {secure: true, httpOnly: true})
                res.cookie("uid", user._id.toString(), { httpOnly: true})

                await Bicicleta.find({}, function (err, bicis) {
                    if (err) console.log(err)
                    res.render('usuarios/indexReserva', { bicis: bicis })
                }).clone().catch(function(err){ console.log(err)})
               
            }else{
                res.status(400).send("Invalid Credentials");
            }

       }catch (err){
           console.log(err)
       }
    },

    reserva: async function(req, res, next){
        try{
            const uid = req.cookies.uid
            const idBici = req.params.id
            const bici = await Bicicleta.findOne({ idBici });
            let hoy = new Date()
            let mañana = new Date()
            mañana.setDate(hoy.getDate()+1)

            let reserva = await new Reserva({usuario: uid, bicicleta: bici._id, desde: hoy, hasta: mañana})
            reserva.save()
            res.render('usuarios/reservaExitosa')

        }catch (err){
            console.log(err)
        }
  
        

    }




  
}


