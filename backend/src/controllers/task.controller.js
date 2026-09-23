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

const editTask = async (req, res)=>{
    try {  
     const {title, description, status, priority, dueDate} = req.body
     const task = await Tasks.findOne({
        _id:req.params.id,
        user:req.id
     })
     if(!task){
        return res.status(400).json({
            success:false,
            message:"Task not found"
        })
     }
    task.title = title ?? task.title;
    task.description = description ?? task.description
    task.status = status ?? task.status
    task.priority = priority ?? task.priority
    task.dueDate = dueDate ?? task.dueDate
    await task.save()

        return res.status(200).json({
        success:true,
        message:"Task updated successfully",
        task,
    })
    } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
    }
}








export {createTask, editTask}