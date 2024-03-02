const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const food = mongoose.model("Food", FoodSchema);
module.exports = food;