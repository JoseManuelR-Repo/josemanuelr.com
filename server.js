const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-proposal', async (req, res) => {
    const { proposal } = req.body;

    // Configura tu transporte de correo (ejemplo con Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactme.jose@gmail.com',
            pass: 'jwsx xcvb wijz bmad' // <-- tu contraseña de aplicación de Google
        }
    });

    let mailOptions = {
        from: '"Landing Page Propuesta" <contactme.jose@gmail.com>',
        to: 'contactme.jose@gmail.com',
        subject: `Nuevo interesado en ${proposal}`,
        text: `Un usuario ha seleccionado la opción: ${proposal}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/send-contact', async (req, res) => {
    const { nombre, email, telefono, mensaje, propuesta } = req.body;

    // Configura tu transporte de correo (ejemplo con Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactme.jose@gmail.com', // <-- tu correo
            pass: 'jwsx xcvb wijz bmad' // <-- la contraseña de aplicación de Google
        }
    });

    let mailOptions = {
        from: '"Landing Page Propuesta" <contactme.jose@gmail.com>',
        to: 'contactme.jose@gmail.com',
        subject: `Nuevo contacto interesado en ${propuesta}`,
        text: `Detalles de contacto:
        
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Mensaje: ${mensaje}

Propuesta seleccionada: ${propuesta}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});