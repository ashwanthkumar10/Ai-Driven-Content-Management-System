import pkg from "@prisma/client";
const { PrismaClient } = pkg; 
import prisma from "../config/db.js";




export const createUser = async (data) => {
  // `data` should already have hashed_password and role_id set
  const createUser = await prisma.users.create({
    data,
  });
  console.log("too long" , createUser);
  
  return createUser; 
};

export const findRoleByName = async(roleName) => {
   const test = await prisma.roles.findUnique({
    where: { role_name: roleName },
  });
  console.log("testig roles",test);
  
  return test;
};

// Edit user by id
export const editUser = async (id, data) => {
  const updatedUser = await prisma.users.update({
    where: { id },
    data,
  });
  return updatedUser;
};

