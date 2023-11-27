import { Router } from 'express';
const routes = Router();

import get from '../Controllers/get.Controller';
import post from '../Controllers/post.Controller';
import put from '../Controllers/put.Controller';
import remove from '../Controllers/remove.Controller';
import BadUrl from '../Controllers/index.Controller';

import Auth from '../Middlewares/Authorization.Middleware';

routes.route('/').get(get.Inventario);
routes.route('/search').get(get.FindBienes);
routes
  .route('/user')
  .put(Auth.AuthUser, put.ActualizarUsuario)
  .delete(Auth.AuthUser, remove.User);
routes.route('/register').post(post.UserRegister);
routes.route('/login').post(post.Login);
routes
  .route('/admin')
  .get(Auth.AuthAdmin, get.Accounts)
  .post(Auth.AuthAdmin, post.AdminRegister)
  .put(Auth.AuthAdmin, put.ActualizarAdmin)
  .delete(Auth.AuthAdmin, remove.Admin);
routes.route('/admin/:id').delete(Auth.AuthAdmin, remove.Admin);
routes.route('/bienes').post(Auth.AuthAdmin, post.CrearBien);
routes
  .route('/bienes/:id')
  .put(Auth.AuthAdmin, put.ActualizarBienes)
  .delete(Auth.AuthAdmin, remove.Item);
routes.route('*').all(BadUrl);
export default routes;
