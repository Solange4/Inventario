import { Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';

const BienesSchema = new Schema({
  name: { type: String, required: true },
  cantidad: { type: Number, required: true },
  ubicacion: { type: String, required: true },
  descripcion: { type: String, required: true },
  creador: {
    type: Schema.Types.String,
    ref: 'Admin',
    required: [true, 'Esto solo puede ser registrado por un administrador'],
  },
  date: { type: Date, default: Date(Date.now) },
});
BienesSchema.plugin(validator, {
  ok: false,
  message: 'El {PATH} debería ser único',
});
export default model('Bienes', BienesSchema);
