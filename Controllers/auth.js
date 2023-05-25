const express = require('express')
const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const {generarJWT} = require('../helpers/jwt')
const bcrypt = require('bcryptjs')



const crearUsuario = async (req, res = express.request) => {
    const { name, email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email: email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese correo ya existe',
            })
        }

        usuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

        res.status(200).json({
            ok: true,
            usuario,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        })
    }
}

const loginUsuario = async (req, res = express.request) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await(generarJWT(usuario.id, usuario.name))

    
        res.status(200).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        })
    }
}

const revalidarToken = async (req, res = express.request) => {
    const {uid, name} = req

    const token = await(generarJWT(uid, name))

    res.json({
        ok:true,
        token
    })  
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}