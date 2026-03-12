const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();


if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('<password>')) {
    connectDB();
} else {
    console.log('MongoDB connection skipped: Please set a valid MONGO_URI in .env');
}

const app = express();

app.use(express.json());

const books = require('./routes/bookRoutes');

app.use('/books', books);

app.get('/', (req, res) => {
    res.send('Library Management API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

