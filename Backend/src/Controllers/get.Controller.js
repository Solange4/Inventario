import Bienes from '../Models/Bienes.Schema';
import Users from '../Models/Users.Schema';
import Admins from '../Models/Admin.Schema';
let get = {};

get.Inventario = async (req, res) => {
  if (!req.token) {
    return res.json({
      ok: false,
      message: 'Acceso denegado, por favor inicia sesion',
      session: req.sessionID,
    });
  }
  console.log(req.session);
  let cantidad = await Bienes.countDocuments().catch((err) => err);
  await Bienes.find()
    .then((data) => {
      res.json({
        ok: true,
        token: req.token,
        session: req.sessionID,
        message: `Inventario cargado correctamente :D`,
        cantidad,
        inventario: data,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        token: req.token,
        session: req.sessionID,
        message: `Hubo algun error al cargar el Inventario`,
        err,
      })
    );
};
get.Accounts = async (req, res) => {
  const cantidadUsers = await Users.countDocuments().catch((err) => err);
  const usersDB = await Users.find()
    .then((data) => ({
      ok: true,
      message: `ADMIN => Cuentas de User cargadas correctamente :D`,
      cantidad: cantidadUsers,
      session: req.sessionID,
      data,
    }))
    .catch((err) => ({
      ok: false,
      message: `ADMIN => No se pudo cargar las cuentas de User`,
      session: req.sessionID,
      token: req.token,
      err,
    }));
  const cantidadAdmins = await Admins.countDocuments().catch((err) => err);
  const adminsDB = await Admins.find()
    .populate('creador', 'username')
    .then((data) => ({
      ok: true,
      message: `ADMIN => Cuentas de Admin cargadas correctamente :D`,
      cantidad: cantidadAdmins,
      session: req.sessionID,
      token: req.token,
      data,
    }))
    .catch((err) => ({
      ok: false,
      message: `ADMIN => No se pudo cargar las cuentas de Admin`,
      err,
    }));
  const cantidad = cantidadAdmins + cantidadUsers;
  res.json({
    token: req.token,
    session: req.sessionID,
    cantidad,
    users: usersDB,
    admins: adminsDB,
  });
};
get.FindBienes = async (req, res) => {
  if (!req.token) {
    return res.json({
      ok: false,
      message: 'Acceso denegado, por favor inicia sesion',
      session: req.sessionID,
    });
  }
  let vas;
  let busqueda = req.query.q;
  let parametro = req.query.p || 'name';
  if (parametro !== 'cantidad') {
    vas = new RegExp(busqueda, 'i');
  } else {
    busqueda = Number(busqueda);
    vas = busqueda;
  }
  await Bienes.find({ [parametro]: vas })
    .sort('cantidad')
    .exec((err, data) => {
      if (err) {
        return err;
      }
      return res.json({ data });
    });
};

export default get;
