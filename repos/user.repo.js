import prisma from '../config/db.js';

export const signup = async (data) => {
  // `data` should already have hashed_password and role_id set
  const createUser = await prisma.user.create({
    data,
  });

  return createUser;
};

export const findRoleByName = async (roleName) => {
  const name = await prisma.role.findUnique({
    where: { role_name: roleName },
  });

  return name;
};

// Edit user by id
export const editUser = async (id, data) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
