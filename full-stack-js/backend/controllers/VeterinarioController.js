import { Veterinario } from '../models/Veterinario.js';

const registrar = async (req, res) => {
  const { email, nombre, password } = req.body;
  try {
    // Guardar un nuevo veterinario
    const veterinario = new Veterinario();
    veterinario.email = email;
    veterinario.nombre = nombre;
    veterinario.password = password;
    const veterinarioGuardado = await veterinario.save();

    return res.status(201).json({
      msg: 'Veterinario creado correctamente',
      veterinario: veterinarioGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno' });
  }
};

const perfil = (req, res) => {
  res.json({ msg: 'Perfil' });
};

export { registrar, perfil };
