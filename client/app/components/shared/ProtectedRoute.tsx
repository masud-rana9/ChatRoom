import { useCurrentToken } from "@/app/states/features/auth/authSlice";
import { useAppSelector } from "@/app/states/hook";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TProtectedRouteProps {
    children: any
}

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
    const router = useRouter()
    const token = useAppSelector(useCurrentToken);

    if (!token) {
        return router.push("/")
    }

    return children;
};

export default ProtectedRoute;
