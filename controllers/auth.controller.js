import * as authServices from '../services/auth.services.js';

// 🔑 Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const response = await authServices.login({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}

// Signup
export async function signup(req, res) {
  try {
    const { name, email, password, phone, roleName } = req.body;
    const user = await authServices.signup({ name, email, password, phone, roleName });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}
export default { login, signup };
