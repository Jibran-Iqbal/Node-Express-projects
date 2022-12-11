//check username, password in post(login) request
// if exist create new JWT  
//send back to front-end

//setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req,res) =>{
    const {username,password} = req.body
    // console.log(username,password);

    // Ways to handle custom errors

    //mongoose validation
    //Joi
    //check in the controller

    if(!username || !password)
        throw new BadRequestError('Please provide email and password')

        
        const id = new Date().getDate();
        
        // try to keep payload small, better experience for user
        const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
        
        //just for demo, in production use long, compex and unguessable string value!!!!!!
        
        res.status(200).json({msg:'user created',token})
        
}

const dashboard = async(req,res)=>{



    const luckyNumber = Math.floor(Math.random()*100);
        res.
        status(200)
        .json
        (
            {msg:`Hello, ${req.user.username}`,secret:`Here is your authorized data, your number is ${luckyNumber}`
            }
        )


}

module.exports = {
    login,dashboard
}