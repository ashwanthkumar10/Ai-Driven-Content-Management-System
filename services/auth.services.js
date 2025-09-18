import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserRepo from '../repos/user.repo.js';

const SALT_ROUNDS = 10;

export const login = async ({ email, password }) => {
  // Find user by email
  const user = await UserRepo.findUserByEmail(email);
  if (!user) {
    const error = new Error('No user found with this email');
    error.status = 401;
    throw error;
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.hashed_password);
  if (!isMatch) {
    const error = new Error('Invalid password');
    error.status = 401;
    throw error;
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '10h' }
  );

  return { token };
};

export const signup = async ({ name, email, password, phone, roleName }) => {
  // 1️⃣ Hash password
  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

  // 2️⃣ Get role dynamically
  let role = null;
  if (roleName) {
    role = await UserRepo.findRoleByName(roleName);
  }

  const userData = {
    name,
    email,
    hashed_password,
    phone: phone || null,
    role_id: role ? role.id : null, // dynamically assign role if exists
  };

  const createUser = await UserRepo.signup(userData);

  return createUser;
};

export default { login, signup };
