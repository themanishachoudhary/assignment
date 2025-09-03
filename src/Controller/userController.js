const userModes = require("../Models/user");
const {generateToken} = require("../utills/Auth");

const UserSignup = async (req, res)=>{
    try{
        const {name, email, contactNo, city} = req.body;
        console.log(req.body)
        if (!name || !email || !contactNo || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }
        const existingUser = await userModes.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const user = new userModes({name, email, contactNo, city});
        const result =await user.save();
        const payload = {
        id: result.id,
        email: result.email
       };
        const token = generateToken(payload); 

        console.log(token, "token generated");
        if(!result){
            return res.status(500).json({message: "user not created"});

        }
        return res.status(200).json({message: "user signUp successfully",user: result, token});
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

// const UserLogin = async (req, res) => {
//   try {
//     const { id} = req.user;
//     console.log(id)
//     const {contactNo} = req.body;
//     if (!id) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!email || !contactNo) {
//       return res.status(400).json({ message: "Email and Contact No are required" });
//     }

   
//     const user = await userModes.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.contactNo !== contactNo) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     return res.status(200).json({ message: "Login successful", user });
// }catch(err){
//     console.log(err.message);
//     return res.status(500).json({message: "Server error", error: err.message});
// }
// }

// const UserLogin = async(req, res)=>{
//     try{
//         const {email, contactNo} = req.body;
//         if(!id){
//             return res.status(404).json({message: "user not found"});
//         }
//         if(!contactNo){
//             return res.status(400).json({message: "contactNo is required"});
//         }
//         const user = await userModes.findById(id);
//         if(!user){
//             return res.status(404).json({message: "user not found"});
//         }
//         if(user.contactNo !== contactNo){
//             return res.status(400).json({message: "invalid credentials"});
//         }
//         return res.status(200).json({message: "login successfully", user});
//     }catch(err){
//         console.error(err.message);
//         return res.status(500).json({message: "Server error", error: err.message});
//     }
// }

const UserLogin = async (req, res) => {
  try {
    const { email, contactNo } = req.body;

    if (!email || !contactNo) {
      return res.status(400).json({ message: "Email and Contact No are required" });
    }
    const user = await userModes.findOne({ email, contactNo });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const payload = 
    { id: user.id, email: user.email };
    const token = generateToken(payload);

    return res.status(200).json({
      message: "Login successful", user,
      token
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = { UserSignup, UserLogin };