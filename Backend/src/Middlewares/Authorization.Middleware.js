// Aqui va la autorizacion
import { verify } from 'jsonwebtoken';
const Auth = {};

Auth.AuthAdmin = async (req, res, next) => {
  if (!req.token) {
    return res.json({
      ok: false,
      message: 'Acceso denegado, por favor inicia sesion',
      sessionID: req.sessionID,
    });
  }
  verify(req.token, process.env.SECRETKEY_ADMIN, (err, payload) => {
    if (err) {
      return res.json({
        ok: false,
        message: 'MALDITO USER => No te quieras pasar de listo',
        sessionID: req.sessionID,
        err,
      });
    }
    req.user = payload;
    next();
  });
};

Auth.AuthUser = async (req, res, next) => {
  if (!req.token) {
    return res.json({
      ok: false,
      message: 'Acceso denegado, por favor inicia sesion',
      sessionID: req.sessionID,
    });
  }
  verify(req.token, process.env.SECRETKEY_USER, (err, payload) => {
    if (err) {
      return res.json({
        ok: false,
        message: 'MALDITO ADMIN => No te quieras pasar de listo',
        err,
      });
    }
    req.user = payload;
    next();
  });
};

export default Auth;
