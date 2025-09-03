import UserService from "../services/user.service.js";

// 🔑 Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const response = await UserService.login({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
}

// 📝 Signup
export async function signup(req, res) {
  try {
    const { name, email, password, phone, roleName } = req.body;
    const user = await UserService.createUser({ name, email, password, phone, roleName });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
}


