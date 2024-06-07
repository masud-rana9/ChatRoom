'use client'


import AppFormInput from "@/app/components/ui/AppFormInput";
import AppLoading from "@/app/components/ui/AppLoading";
import { useGetBlogByIdQuery, useUpdatedBlogMutation } from "@/app/states/features/blogs/blogApi";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";


type TInputs = {
  title: string;
  description: string;
  imageUrl: string;
};

const EditBlog = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useGetBlogByIdQuery(id);
  console.log(data);
  const [updateBlog, { isLoading }] = useUpdatedBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const submitData = {
      BlogData: data, id
    }

    await updateBlog(submitData).unwrap().then((res: { success: any, message: any; }) => {
      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }
      toast.success("Blog are added successfully!");
      router.push('/dashboard/blogs');

    }).catch((res: { success: any; message: any; }) => {
      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    setValue("title", data?.data?.title);
    setValue("description", data?.data?.description);
    setValue("imageUrl", data?.data?.imageUrl);
  }, [data, setValue])

  return (
    <>
      <Link
        href={"/"}
        className="text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2"
      >
        <div className="rounded-full bg-[#F8F8F8] flex items-center justify-center size-10 lg:size-12">
          <IoArrowBackOutline />
        </div>
        <h2>Go Back</h2>
      </Link>

      {
        isLoading ? <AppLoading />
          :
          <div className="bg-[#F8F8F8] p-3 md:p-4 rounded-2xl mt-4">
            <h1 className="md:text-xl font-medium">Update Blog</h1>
            <form className="space-y-2 md:space-y-4 pt-4 pb-2" onSubmit={handleSubmit(onSubmit)}>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
                <AppFormInput
                  name="title"
                  required={true}
                  register={register}
                  type="text"
                  label="Blog Title"
                  error={errors.title}
                />

                <AppFormInput
                  name="description"
                  required={true}
                  register={register}
                  type="text"
                  label="Blog description"
                  error={errors.description}
                />

                <AppFormInput
                  name="imageUrl"
                  required={true}
                  register={register}
                  type="text"
                  label="Blog imageUrl"
                  error={errors.imageUrl}
                />
              </div>

              <div className="flex items-center justify-center pt-4">
                {isLoading ? (
                  <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                    <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                  </button>
                ) : (
                  <button type="submit" className="roundedBtn cursor-pointer">
                    Update Blog
                  </button>
                )}
              </div>
            </form>
          </div>
      }

    </>
  );
};

export default EditBlog;
