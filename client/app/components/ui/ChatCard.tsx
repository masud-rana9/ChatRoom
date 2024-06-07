import { FaRegUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";
import { useAddMessageMutation } from "@/app/states/features/rooms/roomsApi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/states/hook";

type TChatCard = {
  data: any
}
const ChatCard = ({ data }: TChatCard) => {
  const { user } = useAppSelector((state) => state.auth);
  const [input, setInput] = useState("");


  const [addMessage] = useAddMessageMutation()
  const handleSendMessage = async () => {
    if (input !== "") {
      const submittedData = {
        id: data?.id, data: {
          messages: {
            text: input
          }
        }
      }
      await addMessage(submittedData)
        .unwrap()
        .then((res: { success: any; message: any }) => {
          // toast.success("Rooms are added successfully!");
          setInput("")
        })
        .catch((res: { success: any; message: any }) => {
          if (!res.success) {
            // toast.error(res.message || "Something went wrong");
          }
        });
    } else {
      toast.error("Please write message", { toastId: 1 });
    }
  }
  return (
    <div className="h-[80vh] w-full bg-[#f8f2f2] relative  p-5 rounded shadow-lg ">
      {/* <p className="md:hidden text-[30px] absolute right-0 top-1 text-white p-2 ">
        <BsReverseLayoutTextSidebarReverse />
        <h2>{data?.name}</h2>
      </p> */}
      <div className="flex items-center justify-center flex-col gap-2 text-2xl font-bold mx-auto mt-10">
        {/* <FaRegUserCircle className="text-[100px]" /> */}
        <img src={data?.coverUrl} className="size-24 rounded-full object-cover" alt="" />
        <h2>{data?.name}</h2>
      </div>

      <div className='space-y-2 pb-5 h-[50dvh] overflow-auto'>
        {
          data?.messages?.map((message: any) => (
            <div key={message?.id} className={`flex items-center ${message?.userId === user?.userId && " justify-end"}`}>
              <p className="flex items-center max-w-[80%] gap-2">
                {message?.userId !== user?.userId && <FaRegUserCircle className="min-w-5" />}
                <span className="bg-white text-black p-2 rounded ">{message?.text}</span>
                {message?.userId === user?.userId && <FaRegUserCircle className="min-w-5" />}
              </p>
            </div>
          ))
        }
      </div>
      <div className='pt-4'>
        <div
          className=" mb-5 mx-auto p-2 outline-none rounded-md bg-white flex  justify-between items-center gap-2 w-[80%] "
        >
          <input
            placeholder="Enter your message"
            type="text"
            className="bg-transparent w-full outline-none "
            value={input}
            onChange={(e) => setInput(e.target.value as string)}
          />
          <button onClick={handleSendMessage} type="submit">
            <IoSendSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
