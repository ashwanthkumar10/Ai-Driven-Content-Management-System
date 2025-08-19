import * as UserRepo from "../repos/user.repo.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createUser = async ({ name, email, password, phone, roleName }) => {
  // 1️⃣ Hash password
  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

  console.log("hashedPas",hashed_password);
  

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

  const createUser = await UserRepo.createUser(userData);
  console.log("Inside service",createUser);
  
  return createUser;
};

export const editUser = async ({ id, name, email, password, phone, roleName }) => {
  // Hash password if provided
  let hashed_password = undefined;
  if (password) {
    hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  // Get role dynamically if provided
  let role = null;
  if (roleName) {
    role = await UserRepo.findRoleByName(roleName);
  }

  const updateData = {
    ...(name && { name }),
    ...(email && { email }),
    ...(hashed_password && { hashed_password }),
    ...(phone && { phone }),
    ...(role ? { role_id: role.id } : {}),
  };

  const updatedUser = await UserRepo.editUser(id, updateData);
  return updatedUser;
};

export const getAllUsers = async () => {
  const users = await UserRepo.getAllUsers();
  return users;
}

export default { createUser, editUser , getAllUsers };
