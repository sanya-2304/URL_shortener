// const sessionIdToUserMap=new Map();

const jwt=require('jsonwebtoken')
const secretKey='Sanya@234'

//func to create tokens
function setUser(user){
    // sessionIdToUserMap.set(id,user);
   
    return jwt.sign({
        _id:user._id,
        email:user.email,
        password:user.password
    }, secretKey)
}


function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token, secretKey);
    }catch(error){
        return null
    }
    
}

module.exports={
    setUser, getUser
}