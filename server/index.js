const express = require('express')
const mongoose = require('mongoose')
const foodSchema = require('./models/Food');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Mathavaroopan:password1234@cluster0.7yanlbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true
})

app.post('/insert', async (req, res) => {
    const food = new foodSchema({
        foodName: req.body.foodName,
        quantity: req.body.quantity
    });

    try{
        await food.save();
        res.send("Data is inserted...")
    }catch(err){
        console.error(err);
    }
})

app.get('/read', async (req, res) => {
    try{
        const result = await foodSchema.find({});
        res.send(result);
    }catch(err){
        console.error(err);
    }
})

app.put('/update', async (req, res) => {
    try{
        const { id, newFoodName } = req.body;
        await foodSchema.findByIdAndUpdate(id, { foodName: newFoodName });
        res.send("Updated");
    } catch(err){
        console.error(err);
        res.status(500).send("Internal server error");
    }
})


app.delete('/delete/:id', async (req, res) => {
    try{
        await foodSchema.findByIdAndDelete(req.params.id).exec();
        res.send("Deleted");
    }catch(err){
        console.error(err);
    }
})


app.listen(5000, () => {
    console.log("Server is ready...");
})




