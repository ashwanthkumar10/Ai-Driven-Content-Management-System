import * as UserService from '../services/user.services.js';

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


export default {
  createUser,
  editUser
};