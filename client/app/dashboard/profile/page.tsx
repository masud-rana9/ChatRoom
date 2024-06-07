'use client'

import AppFormInput from "@/app/components/ui/AppFormInput";
import AppLoading from "@/app/components/ui/AppLoading";
import { } from "@/app/states/features/blogs/blogApi";
import { useEditProfileMutation, useGetProfileQuery } from "@/app/states/features/user/userApi";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

type TInputs = {
    bio: string;
    profession: string;
    address: string;
};

const Profile = () => {
    const [Profile, { isLoading }] = useEditProfileMutation();
    const { data } = useGetProfileQuery("");
    console.log(data);

    const {
        register,
        handleSubmit, setValue,
        formState: { errors },
    } = useForm<TInputs>();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        const submitData = {
            ...data, releaseDate: new Date()
        }
        console.log(submitData);
        await Profile(submitData).unwrap().then((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Profile are Updated successfully!");

        }).catch((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    };

    useEffect(() => {
        setValue("bio", data?.data?.bio);
        setValue("profession", data?.data?.profession);
        setValue("address", data?.data?.address);
    }, [data, setValue]);

    return (
        <>
            {
                isLoading ? <AppLoading />
                    :
                    <div className="p-3 md:p-4 rounded-2xl mt-4">
                        <h1 className="md:text-xl font-medium">Profile of {data?.data?.user?.name}</h1>
                        <form className="space-y-2 md:space-y-4 pt-4 pb-2" onSubmit={handleSubmit(onSubmit)}>

                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 pt-20">
                                <AppFormInput
                                    name=""
                                    readOnly
                                    defaultValue={data?.data?.user?.email}
                                    required={true}
                                    register={register}
                                    type="text"
                                    label=""
                                />

                                <AppFormInput
                                    name="bio"
                                    required={true}
                                    register={register}
                                    type="text"
                                    label="Enter your Bio"
                                    error={errors.bio}
                                />

                                <AppFormInput
                                    name="profession"
                                    required={true}
                                    register={register}
                                    type="text"
                                    label="Enter your profession"
                                    error={errors.profession}
                                />

                                <AppFormInput
                                    name="address"
                                    required={true}
                                    register={register}
                                    type="text"
                                    label="Enter your address"
                                    error={errors.address}
                                />

                            </div>

                            <div className="flex items-center justify-center pt-4">
                                {isLoading ? (
                                    <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                                        <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                                    </button>
                                ) : (
                                    <button type="submit" className="roundedBtn cursor-pointer">
                                        Update Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
            }
        </>
    );
};

export default Profile;
