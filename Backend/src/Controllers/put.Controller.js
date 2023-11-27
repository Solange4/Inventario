import Bienes from '../Models/Bienes.Schema';
import User from '../Models/Users.Schema';
import Admin from '../Models/Admin.Schema';
import { hashSync } from 'bcryptjs';
let put = {};
put.ActualizarBienes = async (req, res) => {
  let id = req.params.id;
  if (JSON.stringify(req.body) === '{}') {
    return res.json({
      ok: false,
      message: `ADMIN => Por favor, debes enviar datos para poder actualizar :D`,
    });
  }
  let datos = req.body;
  await Bienes.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  })
    .then((data) =>
      res.status(200).json({
        ok: true,
        message: `ADMIN => ITEM ${data.name} actualizado correctamente`,
        token: req.token,
        session: req.sessionID,
        data,
      })
    )
    .catch((err) => {
      if (err.errors) {
        return res.status(200).json({
          ok: false,
          message: `ADMIN => Algo fallo al intentar actualizar el ITEM`,
          token: req.token,
          session: req.sessionID,
          err: err.errors,
        });
      }
      res.status(200).json({
        ok: false,
        message: `ADMIN => No se Encontro coincidencia con el ITEM: '${id}'`,
        token: req.token,
        session: req.sessionID,
        err,
      });
    });

  // res.json({ res: BienUpdated });
};
put.ActualizarUsuario = async (req, res) => {
  if (JSON.stringify(req.body) === '{}') {
    return res.json({
      ok: false,
      message: `USER => Por favor, debes enviar datos para poder actualizar el USUARIO :D`,
    });
  }
  let datos = {};
  if (req.body.username !== undefined) {
    datos.username = req.body.username;
  }
  if (req.body.name !== undefined) {
    datos.name = req.body.name;
  }
  if (req.body.password !== undefined) {
    datos.password = hashSync(req.body.password, Number(process.env.ROUNDS));
  }
  let id = req.user.data._id;
  await User.findByIdAndUpdate(id, datos, {
    new: true,
  })
    .then((data) =>
      res.json({
        ok: true,
        message: `Usuario ${data.name} actualizado correctamente`,
        data,
      })
    )
    .catch((err) => {
      if (err.errors) {
        return res.status(200).json({
          ok: false,
          message: `USER => Algo fallo al intentar actualizar el USUARIO`,
          token: req.token,
          session: req.sessionID,
          err: err.errors,
        });
      }
      res.json({
        ok: false,
        message: `No se Encontro coincidencia con el id: ${id}`,
        err,
      });
    });
};

put.ActualizarAdmin = async (req, res) => {
  if (JSON.stringify(req.body) === '{}') {
    return res.json({
      ok: false,
      message: `ADMIN => Por favor, debes enviar datos para poder actualizar el ADMIN :D`,
    });
  }
  let datos = {};
  if (req.body.username !== undefined) {
    datos.username = req.body.username;
  }
  if (req.body.name !== undefined) {
    datos.name = req.body.name;
  }
  if (req.body.password !== undefined) {
    datos.password = hashSync(req.body.password, Number(process.env.ROUNDS));
  }
  let id = req.user.data._id;
  await Admin.findByIdAndUpdate(id, datos, {
    new: true,
  })
    .then((data) =>
      res.json({
        ok: true,
        message: `Admin ${data.name} actualizado correctamente`,
        data,
      })
    )
    .catch((err) =>
      res.json({
        ok: false,
        message: `No se Encontro coincidencia con el id: ${id}`,
        err,
      })
    );
};

export default put;
