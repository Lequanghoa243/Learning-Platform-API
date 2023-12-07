const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    const conn = mongoose.connect('mongodb://localhost:27017/Learning_platform')
    console.log('database connected')
}
module.exports = dbConnect;