import * as UserService from '../services/user.services.js';


export const login = async(req, res) =>{
 try {
   const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message: "Email and password are required"});
    }
    
    
  const response = await UserService.login({email, password});
  return res.status(200).json(response);
 } catch (error) {
  console.error("Error logging in user:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
 
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, roleName } = req.body;

    const user = await UserService.createUser({ name, email, password, phone, roleName });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, roleName } = req.body;

    const user = await UserService.editUser({ id, name, email, password, phone, roleName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();    
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}



export default {
  createUser,
  editUser , 
  getAllUsers ,
  login
};