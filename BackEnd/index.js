require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server Running on 3005");
});
