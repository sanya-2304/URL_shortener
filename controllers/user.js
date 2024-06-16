const {v4:uuidv4}=require('uuid')
const UserModel=require('../model/user')
const {setUser}=require('../service/auth')

async function handleUserSignup(req, res){
    const {name, email , password} =req.body;
    await UserModel.create({
        name, email, password
    })
    return res.redirect('/')
}
async function handleUserLogin(req, res){
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
        return res.render("login", {
            error: "Invalid username or password"
        });
    }
//    const sessionId=uuidv4();
  const token= setUser(user);
   res.cookie('uid', token);
    return res.redirect('/')
}

module.exports={handleUserSignup, handleUserLogin}