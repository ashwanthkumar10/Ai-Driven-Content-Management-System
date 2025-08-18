import * as userRepo from '../repos/user.repo.js';

export const createUser = async (userData) => {
  try {
    const user = await userRepo.createUser(userData);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; 
  }
}

export default {
  createUser,
};  