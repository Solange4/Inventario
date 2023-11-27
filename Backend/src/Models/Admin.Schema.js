import { Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
const AdminSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  // movimientos: {},
  fecha: { type: Date, default: Date.now },
  password: { type: String, required: true, trim: true },
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, 'Esto solo puede ser registrado por un administrador'],
  },
  superadmin: { type: Boolean, default: false },
});

AdminSchema.plugin(validator, {
  ok: false,
  message: 'El {PATH} debería ser único',
});

export default model('Admin', AdminSchema);
