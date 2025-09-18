import * as UserRepo from '../repos/user.repo.js';

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
};

export default { editUser, getAllUsers };
