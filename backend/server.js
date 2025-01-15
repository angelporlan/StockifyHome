require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');
const productRoutes = require('./routes/productRoutes');
const productDetailRoutes = require('./routes/productDetailRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productDetails', productDetailRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
