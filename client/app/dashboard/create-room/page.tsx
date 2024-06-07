"use client";

import AppFormInput from "@/app/components/ui/AppFormInput";
import AppLoading from "@/app/components/ui/AppLoading";
import { useAddRoomMutation } from "@/app/states/features/rooms/roomsApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type TInputs = {
  name: string;
  coverUrl: string;
};

const AddBlog = () => {
  const router = useRouter();
  const [addBlog, { isLoading }] = useAddRoomMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = async (data) => {

    console.log(data);
    await addBlog(data)
      .unwrap()
      .then((res: { success: any; message: any }) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
        }
        toast.success("Rooms are added successfully!");
        router.push("/dashboard/rooms");
      })
      .catch((res: { success: any; message: any }) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
        }
      });
  };

  return (
    <>
      <Link
        href={"/dashboard/rooms"}
        className="text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2"
      >
        <div className="rounded-full bg-[#F8F8F8] flex items-center justify-center size-10 lg:size-12">
          <IoArrowBackOutline />
        </div>
        <h2>Go Back</h2>
      </Link>

      {isLoading ? (
        <AppLoading />
      ) : (
        <div className="bg-[#F8F8F8] p-3 md:p-4 rounded-2xl mt-4">
          <h1 className="md:text-xl font-medium">Add New Room</h1>
          <form
            className="space-y-2 md:space-y-4 pt-4 pb-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="name"
              required={true}
              register={register}
              type="text"
              label="Room Name"
              error={errors?.name}
            />
            <AppFormInput
              name="coverUrl"
              required={true}
              register={register}
              type="text"
              label="Cover Url"
              error={errors?.coverUrl}
            />

            <div className="flex items-center justify-center pt-4">
              {isLoading ? (
                <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                  <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                </button>
              ) : (
                <button type="submit" className="roundedBtn cursor-pointer">
                  Add Room
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddBlog;
