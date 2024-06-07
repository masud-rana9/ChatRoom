"use client";

import React from "react";
import ProtectedRoute from "../../shared/ProtectedRoute";
import ChatCard from "../../ui/ChatCard";
import PeopleCard from "../../ui/PeopleCard";
import { useParams } from "next/navigation";
import { useGetSingleRoomsQuery } from "@/app/states/features/rooms/roomsApi";

const Chat = () => {
  const { id } = useParams();

  const { data } = useGetSingleRoomsQuery(id);

  return (
    <ProtectedRoute>
      <div className="w-[80%] mx-auto mt-5 flex">
        <div className=" h-screen w-[100%]">
          <ChatCard data={data?.data} />
        </div>
        <div className="hidden md:block h-[80vh] w-[20%] bg-[#d9dad8] p-5 shadow-lg">
          <PeopleCard data={data?.data} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Chat;
