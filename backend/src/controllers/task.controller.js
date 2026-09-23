import Tasks from "../models/task.schema.js"

const createTask = async (req, res)=>{
    try {
        const {title, description, status, priority, dueDate} = req.body
    if(!title){
        return res.status(400).json({
            success:false,
            message:"Title is required"
        })
    }
    const newTask = await Tasks.create({
        title, 
        description, 
        status,
        priority,
        dueDate,
        user:req.id
    })
    return res.status(201).json({
        success:true,
        message:"Task created successfully",
        task:newTask
    })
    } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
    }
}



export {createTask}