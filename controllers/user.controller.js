import * as UserService from '../services/user.services.js';

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}


export default {
  createUser,
};  