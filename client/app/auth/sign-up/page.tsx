'use client'

import LeftSideAuthComponent from "@/app/components/shared/LeftSideAuthComponent";
import AppFormInput from "@/app/components/ui/AppFormInput";
import { useRegisterMutation } from "@/app/states/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    accept?: unknown;
}

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const router = useRouter();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const onSubmit: SubmitHandler<FormData> = (data) => {

        if (data.password.length < 8) {
            toast.error("minimum password value is 8");
            return;
        }
        if (data.confirmPassword !== data.password) {
            toast.error(`Password does't match`);
            return;
        }
        const { name, password, email } = data
        const submittedData = {
            password, email, name
        }
        registerUser(submittedData).unwrap()
            .then((res: any) => {

                if (!res?.success) {
                    toast.error(res?.message || "something wrong");
                } else {
                    toast.success(res?.message || "Successfully Registered");
                    router.push(`/auth/sign-in`);
                }
            })
            .catch((res: any) => {
                toast.error(res?.data?.errorMessage || "something went wrong");
            });
    };

    return (
        <div className="flex lg:h-[100vh]">
            {/* this is left side div  */}
            <LeftSideAuthComponent />

            {/* this is form and other staff  */}
            <div className="w-full lg:w-[58%] h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
                <div className="max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
                    <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
                        Welcome to ChatRoom 👋🏾
                    </h2>
                    <p className="text-[#645D5D] text-xs lg:text-sm">
                        Already have an account?{" "}
                        <span className="text-primary font-medium">
                            <Link href="/auth/sign-in">Login</Link>
                        </span>
                    </p>

                    <form
                        className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <AppFormInput
                            name="name"
                            required={true}
                            register={register}
                            type="text"
                            label="Full Name"
                            placeholder="Type your full name"
                            error={errors.name}
                        />

                        <AppFormInput
                            name="email"
                            required={true}
                            register={register}
                            type="email"
                            label="Email address"
                            placeholder="Type your Email address"
                            error={errors.email}
                        />

                        <div>
                            <AppFormInput
                                name="password"
                                required={true}
                                register={register}
                                type="password"
                                label="Password"
                                placeholder="Type your Password"
                                error={errors.password}
                            />
                            <div className="text-textBlack ml-5 text-xs mt-2 space-y-1">
                                <p className="list-item">Minimum length of 8-30 characters</p>
                                <p className="list-item">
                                    Only lowercase, numeric and symbols allowed
                                </p>
                            </div>
                        </div>

                        <AppFormInput
                            name="confirmPassword"
                            required={true}
                            register={register}
                            type="password"
                            label="Confirm password"
                            placeholder="Type your Confirm password"
                            error={errors.confirmPassword}
                        />

                        <div className="flex flex-col col-span-full">
                            <div className=" contact-input-label   flex items-center">
                                <input
                                    {...register("accept", {
                                        required: true,
                                    })}
                                    required
                                    type="checkbox"
                                    className="mr-[8px] w-[20px] h-[20px] cursor-pointer"
                                />

                                <div className="text-xs 2xl:text-sm text-textGrey">
                                    By clicking on this, I give consent to

                                    <Link
                                        href=""
                                        className="text-blue-500 ml-1"
                                    >
                                        Terms of Use
                                    </Link>
                                </div>
                            </div>
                            {errors.accept && (
                                <span className="text-xs mt-2 tracking-wide text-red">
                                    Must accept our privacy policy
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                            </button>
                        ) : (
                            <button type="submit" className="appBtn mt-4 lg:mt-6 w-full">
                                Get started
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
