import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Todo from "./models/Todo.js"; 

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);

await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to DB"))
.catch((error) => console.log(error.message));


app.get('/items', async (req,res)=>{
    const items = await Todo.find();
    res.json(items);
})

app.post('/item/new', (req,res) => {
    const todo  = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});

app.put('/item/complete/:id', async (req,res) => {
    const item = await Todo.findById(req.params.id);
    item.completed = !item.completed;
    item.save();
    res.json(item);
})


app.delete('/item/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost: ${port}`);
});
