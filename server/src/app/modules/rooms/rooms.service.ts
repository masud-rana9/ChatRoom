import prisma from "../../utils/prisma";

const createRoomsIntoBD = async (payload: any) => {
  const { name, coverUrl } = payload;

  // Create the found item
  const createRooms = await prisma.room.create({
    data: {
      name,
      coverUrl,
    },
  });

  return createRooms;
};

const getRoomsFromDB = async (query: any) => {
  const {
    searchTerm,
    page = 1,
    limit = 30,
    sortBy,
    sortOrder,
    availability,
  } = query;

  // Prepare filters
  let where: any = {};

  if (searchTerm) {
    where = {
      OR: [
        { location: { contains: searchTerm as string, mode: "insensitive" } },
        {
          description: { contains: searchTerm as string, mode: "insensitive" },
        },
        {
          utilitiesDescription: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  if (availability) {
    where.availability = availability === "true" ? true : false;
  }

  // Prepare sorting
  const orderBy = sortBy
    ? { [sortBy as string]: sortOrder || "asc" }
    : undefined;

  // Retrieve paginated and filtered found items
  const foundItems = await prisma.room.findMany({
    where,
    include: {
      messages: {
        select: {
          id: true,
          text: true,
          user: true,
        },
      },
    },
    orderBy,
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  });

  const total = await prisma.room.count({ where });

  const responseData = {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
    data: foundItems,
  };

  return responseData;
};

const getRoomsByIdFromDB = async (id: any) => {
  // Update the rooms status
  const rooms = await prisma.room.findFirst({
    where: {
      id: id,
    },
    include: {
      messages: true,
      participants: {
        include: {
          user: true,
        },
      },
    },
  });

  return rooms;
};

const getMyRoomsFromDB = async () => {
  // Update the rooms status
  const rooms = await prisma.room.findMany();

  return rooms;
};

const UpdateRoomsByIdIntoDB = async (id: any, params: any) => {
  const { name, coverUrl } = params;

  // Update the room with the new data
  const updatedRoom = await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      name,
      coverUrl,
    },
  });

  return updatedRoom;
};

const UpdateRoomsMessageByIdIntoDB = async (
  id: any,
  params: any,
  user: any
) => {
  const { name, coverUrl, messages } = params;
  // console.log(messages);

  const existingUser = await prisma.user.findUnique({
    where: { id: user.userId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Find the room to check for existing participants and messages
  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      participants: true,
      messages: true,
    },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  // Check if the user is already in the participants
  const isUserInParticipants = room.participants.some(
    (participant) => participant.userId === user.userId
  );
  // console.log(isUserInParticipants);
  // Prepare data to update
  const updateData: any = {
    messages: {
      create: {
        text: messages?.text,
        user: {
          connect: { id: user?.userId },
        },
        createdAt: new Date(),
      },
    },
  };

  if (name) {
    updateData.name = name;
  }

  if (coverUrl) {
    updateData.coverUrl = coverUrl;
  }

  // If the user is not in participants, add them
  if (!isUserInParticipants) {
    updateData.participants = {
      create: {
        user: {
          connect: { id: user?.userId },
        },
        joinedAt: new Date(),
      },
    };
  }

  // Update the room with the new data
  const updatedRoom = await prisma.room.update({
    where: {
      id: id,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      coverUrl: true,
      messages: true,
      participants: true,
    },
  });

  return updatedRoom;
};

const deleteRoomsByIdFromDB = async (id: string) => {
  const deletedRooms = await prisma.room.delete({
    where: {
      id: id,
    },
  });

  return deletedRooms;
};

export const roomsService = {
  createRoomsIntoBD,
  getMyRoomsFromDB,
  UpdateRoomsByIdIntoDB,
  getRoomsFromDB,
  deleteRoomsByIdFromDB,
  getRoomsByIdFromDB,
  UpdateRoomsMessageByIdIntoDB,
};
