require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./models');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');
const productRoutes = require('./routes/productRoutes');
const productDetailRoutes = require('./routes/productDetailRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "StockifyHome API",
            version: "1.0.1",
            description: "Documentation for StockifyHome API",
            contact: {
                name: "StockifyHome API Support",
                email: "angelporlandev@gmail.com",
            },
        },
        servers: [
            { url: "http://localhost:3000" }, // localhost
            { url: "https://stockifyhome.onrender.com" } // render
          ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productDetails', productDetailRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
