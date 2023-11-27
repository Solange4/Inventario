import User from '../Models/Users.Schema';
import Admin from '../Models/Admin.Schema';
import Bien from '../Models/Bienes.Schema';
import jwt from 'jsonwebtoken';
const post = {};
import { hashSync, compareSync } from 'bcryptjs';

post.Login = async (req, res) => {
  if (JSON.stringify(req.body) === '{}') {
    return res.json({
      ok: false,
      message: `ADMIN => Por favor, debes enviar datos para poder actualizar :D`,
    });
  }
  if (req.token) {
    return res.json({ ok: true, message: 'Usted ya inició sesion :D' });
  }
  const body = req.body;
  await User.findOne({ username: body.username })
    .then((data) => {
      if (data === null) {
        return Admin.findOne({ username: body.username }).then((data) => {
          if (data === null) {
            return res.json({
              ok: false,
              message: `No se encontró coincidencia con el username: '${body.username}' ni como USUARIO ni como ADMINISTRADOR :D`,
            });
          }
          if (!compareSync(body.password, data.password)) {
            return res.json({
              ok: false,
              message: `Escriba bien su contraseña de ADMINISTRADOR :D`,
            });
          }
          let token = jwt.sign({ data }, process.env.SECRETKEY_ADMIN);
          req.session.token = token;
          res.json({
            ok: true,
            message: 'ADMIN => Logeado Correctamente',
            token,
            tokenlocal: req.session.token,
            sessionID: req.sessionID,
          });
        });
      }
      if (!compareSync(body.password, data.password)) {
        return res.json({
          ok: false,
          message: `Escribe bien tu contraseña de USUARIO`,
        });
      }
      let token = jwt.sign({ data }, process.env.SECRETKEY_USER);
      req.session.token = token;
      res.status(200).json({
        ok: true,
        message: 'USER => Logeado Correctamente',
        token,
        tokenlocal: req.session.token,
        sessionID: req.sessionID,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        message: `No se Encontro coincidencia con el id`,
        err,
      })
    );
};

post.UserRegister = async (req, res) => {
  if (req.token) {
    return res.json({ ok: true, message: 'Usted ya inició sesión :D' });
  }
  let body = req.body;
  const user = new User({
    username: body.username,
    name: body.name,
    password: hashSync(body.password, Number(process.env.ROUNDS)),
  });
  await user
    .save()
    .then((data) => {
      let token = jwt.sign({ data }, process.env.SECRETKEY_USER);
      req.session.token = token;
      return res.status(200).json({
        ok: true,
        message: `USER => Usuario creado correctamente :D`,
        tokenlocal: req.session.token,
        sessionID: req.sessionID,
        data,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        message: `USER => No pudimos crear tu cuenta :D`,
        err,
      })
    );
};

post.AdminRegister = async (req, res) => {
  let body = req.body;
  let supers = false;
  if (req.user.data._id === process.env.SUPERADMIN) {
    supers = body.superadmin;
  }
  const admin = new Admin({
    username: body.username,
    name: body.name,
    password: hashSync(body.password, Number(process.env.ROUNDS)),
    creador: req.user.data._id,
    superadmin: supers,
  });
  if (!req.user.data.superadmin) {
    return res.json({
      ok: false,
      message: `ADMIN => No puedes crear cuentas de administrador sin ser SUPERADMIN :D `,
    });
  }
  const adminDB = await admin.save().catch((err) => err);
  if (adminDB.errors) {
    return res.json({ ok: false, err: adminDB.errors });
  }
  res.status(200).json({
    ok: true,
    message: `ADMIN => Cuenta de Admin creada corrrectamente por '${req.user.data.username}' :D `,
    admin: adminDB,
    sessionID: req.sessionID,
  });
};

post.CrearBien = async (req, res) => {
  let body = req.body;
  const bien = new Bien({
    name: body.name,
    cantidad: body.cantidad,
    ubicacion: body.ubicacion,
    descripcion: body.descripcion,
    creador: req.user.data.username,
  });

  await bien
    .save()
    .then((data) =>
      res.status(200).json({
        ok: true,
        bien: data,
        token: req.token,
        session: req.sessionID,
      })
    )
    .catch((err) =>
      res.json({
        ok: false,
        message: `Algo fallo cuando intentamos guardar el ITEM`,
        err,
        session: req.sessionID,
        token: req.token,
      })
    );
};

export default post;
