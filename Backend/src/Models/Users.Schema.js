import { Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: [true, 'El name es obligatorio'] },
  password: { type: String },
});
UserSchema.plugin(validator, {
  ok: false,
  message: 'El {PATH} debería ser único',
});
export default model('User', UserSchema);
