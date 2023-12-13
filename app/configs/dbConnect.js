const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://hoalq:kenkaneki123@cluster0.adn2ex0.mongodb.net/learning_platform', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = dbConnect;
