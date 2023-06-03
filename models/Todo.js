import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    
    timestamp: {
        type: String,
        default: new Date()
    }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;