import * as bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const createUserIntoBD = async (data: any) => {
  const { name, email, password, bio, profession, address } = data;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Transactional approach to create user and profile
  const user = await prisma.$transaction(async (prisma) => {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.userProfile.create({
      data: {
        bio,
        profession,
        address,
        userId: newUser.id,
      },
    });

    return newUser;
  });

  // Omit the password in the response
  const { password: _, ...userData } = user;
  return userData;
};

const getProfileFromDB = async (user: any) => {
  const userProfileData = await prisma.userProfile.findUnique({
    where: {
      userId: user.userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return userProfileData;
};

const UpdateProfileIntoDB = async (user: any, params: any) => {
  const { bio, address, profession } = params;

  const updatedProfile = await prisma.userProfile.update({
    where: {
      userId: user.userId,
    },
    data: {
      bio,
      address,
      profession,
    },
  });
  return updatedProfile;
};

export const userService = {
  createUserIntoBD,
  getProfileFromDB,
  UpdateProfileIntoDB,
};
