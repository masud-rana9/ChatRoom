'use client'

import LeftSideAuthComponent from "@/app/components/shared/LeftSideAuthComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/app/states/hook";
import { useLoginMutation } from "@/app/states/features/auth/authApi";
import { verifyToken } from "@/app/utils/verifyToken";
import { setUser } from "@/app/states/features/auth/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AppFormInput from "@/app/components/ui/AppFormInput";

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        login(data).unwrap()
            .then((res: any) => {
                if (!res?.success) {

                    toast.error(res?.message || "something wrong");
                } else {

                    const user = verifyToken(res?.data?.token)
                    toast.success(res?.message || "Successfully log in");
                    dispatch(setUser({ user, accessToken: res?.data?.token }))
                    router.push(`/`);
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
            <div className="w-full lg:w-[50%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
                <div className="w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
                    <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
                        Login to your account{" "}
                    </h2>
                    <p className="text-[#645D5D] text-xs lg:text-sm">
                        Don’t have an account?{" "}
                        <span className="text-primary font-medium">
                            <Link href="/auth/sign-up">Sign up</Link>
                        </span>
                    </p>

                    <form
                        className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <AppFormInput
                            name="email"
                            required={true}
                            register={register}
                            type="email"
                            label="Email address"
                            placeholder="Type your Email address"
                            error={errors.email}
                        />

                        <AppFormInput
                            name="password"
                            required={true}
                            register={register}
                            type="password"
                            label="Password"
                            placeholder="Type your Password"
                            error={errors.password}
                        />

                        <div className="flex items-center justify-end text-xs text-textGrey hover:text-primary lg:text-sm">
                            {/* <Link to={"/auth/forgot-password"}> */}
                            <p>Forgot Password?</p>{" "}
                            {/* </Link> */}
                        </div>

                        {isLoading ? (
                            <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                            </button>
                        ) : (
                            <button type="submit" className="appBtn mt-4 lg:mt-6 w-full">
                                Log in
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;