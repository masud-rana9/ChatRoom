"use client"

import ChatHome from "./components/home/ChatHome";
import { useGetAllRoomsQuery } from "./states/features/rooms/roomsApi";

export default function Home() {
  const { data: rooms } = useGetAllRoomsQuery("")

  const room2s = [
    {
      id: 1,
      roomName: "chat1",
    },
    {
      id: 2,
      roomName: "chat2",
    },
    {
      id: 3,
      roomName: "chat2",
    },
    {
      id: 4,
      roomName: "chat4",
    },
    {
      id: 5,
      roomName: "chat5",
    },
    {
      id: 6,
      roomName: "chat6",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Chat Rooms
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Providing a platform for individuals to share their thoughts, and
            chat with each other, sharing is careing.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {rooms?.data?.map((items: any) => (
            <ChatHome key={items.id} {...items} />
          ))}
        </div>
      </div>
    </div>
  );
}
