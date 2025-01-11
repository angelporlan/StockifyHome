require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar modelos y arrancar servidor
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
