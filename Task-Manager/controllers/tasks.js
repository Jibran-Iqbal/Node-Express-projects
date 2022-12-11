const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res) =>
{
        const tasks = await Task.find()
        res.status(200).json({tasks:tasks})
        // In the key:value pairs if the key and the value have the same identifier like
        // tasks:tasks then we can omit the second part(It is a es6 short hand)
        // 
        // So basically 
        // res.status(200).json({tasks:tasks})
        // Is the same as
        // res.status(200).json({tasks})
})


const createTask =asyncWrapper( async (req,res)=>
{
    const task = await Task.create(req.body)
    res.status(201).json({task})
    // res.status(201).json({task,amount:tasks.length})
    // res.status(201).json({task,nbHits:tasks.length})
    // res.status(201).json({success:true,data:{task}})
    // res.status(201).json({status:"success",data:{task}})
})


const getTask =asyncWrapper(async (req,res,next)=>
{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id:${taskID}`,404))
        }
        res.status(200).json({task})
    // res.send("Get Single Task")
})


const deleteTask = asyncWrapper(async(req,res)=>
{
        const taskID=req.params.id
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task)
            return next(createCustomError(`No task with id:${taskID}`,404))
        res.status(200).json({task})
    // res.send("Delete Task")
})


const updateTask = asyncWrapper(async(req,res)=>
{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!task)
        {
            return next(createCustomError(`No task with id:${taskID}`,404))
        }
        res.status(200).json({task})
})


module.exports =
{
    getAllTasks,createTask,getTask,updateTask,deleteTask 
}