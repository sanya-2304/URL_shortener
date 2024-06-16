const mongoose=require('mongoose')

async function connectToDB(url){
    return mongoose.connect(url).then(()=>console.log('db connected'));
}

module.exports={
    connectToDB
}