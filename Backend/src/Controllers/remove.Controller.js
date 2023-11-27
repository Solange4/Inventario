const remove = {};

import Bienes from '../Models/Bienes.Schema';
import User from '../Models/Users.Schema';
import Admin from '../Models/Admin.Schema';

remove.Item = async (req, res) => {
  const id = req.params.id;
  await Bienes.findByIdAndDelete(id)
    .then((data) => {
      if (data === null) {
        return res.json({
          ok: false,
          message: `No se encontro coincidencia con el id: ${id}`,
        });
      }
      res.json({
        ok: true,
        message: `Item eliminado correctamente`,
        data,
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
remove.User = async (req, res) => {
  const id = req.user.data._id;
  await User.findByIdAndDelete(id)
    .then((data) => {
      if (data === null) {
        return res.json({
          ok: false,
          message: `No se encontro coincidencia con el id: ${id}`,
        });
      }
      res.json({
        ok: true,
        message: `Usuario eliminado correctamente :D`,
        data,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        message: `No se Encontro coincidencia con el id: ${id}`,
        err,
      })
    );
};
remove.Admin = async (req, res) => {
  const id = req.params.id || req.user.data._id;

  if (req.user.data._id !== process.env.SUPERADMIN) {
    if (id === process.env.SUPERADMIN) {
      return res.json({
        ok: false,
        message: 'No puedes eliminar al papatoide!!!',
      });
    }
    if (id === req.user.data.creador) {
      return res.json({
        ok: false,
        message: 'ADMIN => Traidor, eliminar al SUPERADMIN JAMAS!!! xD',
      });
    }

    const datos = await Admin.findById(req.params.id)
      .populate('creador', 'username')
      .catch((err) => err);
    if (datos) {
      let ParamsCreadorID = datos.creador._id;
      let LocalTokenID = req.user.data._id;

      if (ParamsCreadorID.toString() !== LocalTokenID) {
        return res.json({
          ok: false,
          message: `ADMIN => No puedes eliminar a ${datos.username}, ya que no es tu Children :D, pidele al usuario: '${datos.creador.username}: ${datos.creador._id}' para que lo elimine`,
        });
      }
    }
  }
  await Admin.findByIdAndDelete(id)
    .then((data) => {
      if (data === null) {
        return res.json({
          ok: false,
          message: `No se encontro coincidencia con el id: ${id}`,
        });
      }
      res.json({
        ok: true,
        message: `Administrador eliminado correctamente`,
        data,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        message: `No se Encontro coincidencia con el id: ${id}`,
        err,
      })
    );
};
export default remove;
