require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración de Body-Parser (Reemplaza a Express.json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVIR ARCHIVOS ESTÁTICOS: Esto soluciona el "Cannot GET /" 
// Hace que al abrir localhost:3000 busque y abra automáticamente tu "index.html"
app.use(express.static(path.join(__dirname, '.')));

// Conexión Segura a MongoDB Atlas usando la variable de entorno
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("¡Conectado exitosamente a MongoDB Atlas (Última Versión)!"))
  .catch(err => console.error("Error crítico de conexión:", err));

// ==================== MODELOS (SCHEMAS) ====================
const Paciente = mongoose.model('Paciente', new mongoose.Schema({
    id_paciente: { type: String, required: true, unique: true },
    nombre: String,
    apellidos: String,
    edad: String,
    telefono: String
}));

const Odontologo = mongoose.model('Odontologo', new mongoose.Schema({
    id_odontologo: { type: String, required: true, unique: true },
    nombre: String,
    especialidad: String,
    telefono: String,
    correo: String
}));

const Tratamiento = mongoose.model('Tratamiento', new mongoose.Schema({
    id_tratamiento: { type: String, required: true, unique: true },
    nombre: String,
    costo: String,
    duracion: String,
    materiales: String
}));

const Cita = mongoose.model('Cita', new mongoose.Schema({
    numeroCita: { type: String, required: true, unique: true },
    paciente: String,
    odontologo: String,
    fecha: String,
    hora: String,
    estado: String,
    motivo: String
}));

// ==================== RUTAS DE LA API ====================

// PACIENTES
app.get('/api/pacientes', async (req, res) => {
    try { const datos = await Paciente.find(); res.status(200).json(datos); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/pacientes', async (req, res) => {
    try { const nuevo = await new Paciente(req.body).save(); res.status(201).json(nuevo); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/api/pacientes/:id', async (req, res) => {
    try { const editado = await Paciente.findOneAndUpdate({ id_paciente: req.params.id }, req.body, { new: true }); res.status(200).json(editado); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/api/pacientes/:id', async (req, res) => {
    try { await Paciente.findOneAndDelete({ id_paciente: req.params.id }); res.status(200).json({ msg: "Eliminado" }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});

// ODONTÓLOGOS
app.get('/api/odontologos', async (req, res) => {
    try { const datos = await Odontologo.find(); res.status(200).json(datos); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/odontologos', async (req, res) => {
    try { const nuevo = await new Odontologo(req.body).save(); res.status(201).json(nuevo); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/api/odontologos/:id', async (req, res) => {
    try { const editado = await Odontologo.findOneAndUpdate({ id_odontologo: req.params.id }, req.body, { new: true }); res.status(200).json(editado); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/api/odontologos/:id', async (req, res) => {
    try { await Odontologo.findOneAndDelete({ id_odontologo: req.params.id }); res.status(200).json({ msg: "Eliminado" }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});

// TRATAMIENTOS
app.get('/api/tratamientos', async (req, res) => {
    try { const datos = await Tratamiento.find(); res.status(200).json(datos); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/tratamientos', async (req, res) => {
    try { const nuevo = await new Tratamiento(req.body).save(); res.status(201).json(nuevo); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/api/tratamientos/:id', async (req, res) => {
    try { const editado = await Tratamiento.findOneAndUpdate({ id_tratamiento: req.params.id }, req.body, { new: true }); res.status(200).json(editado); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/api/tratamientos/:id', async (req, res) => {
    try { await Tratamiento.findOneAndDelete({ id_tratamiento: req.params.id }); res.status(200).json({ msg: "Eliminado" }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});

// CITAS
app.get('/api/citas', async (req, res) => {
    try { const datos = await Cita.find(); res.status(200).json(datos); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/citas', async (req, res) => {
    try { const nuevo = await new Cita(req.body).save(); res.status(201).json(nuevo); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/api/citas/:id', async (req, res) => {
    try { const editado = await Cita.findOneAndUpdate({ numeroCita: req.params.id }, req.body, { new: true }); res.status(200).json(editado); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/api/citas/:id', async (req, res) => {
    try { await Cita.findOneAndDelete({ numeroCita: req.params.id }); res.status(200).json({ msg: "Eliminado" }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
});

// Levantar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`));