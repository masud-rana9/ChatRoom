'use client'

import ProtectedRoute from "../components/shared/ProtectedRoute";
import Sidebar from "../components/shared/Sidebar";

const Layout = ({ children }: { children: any }) => {
    return (
        <ProtectedRoute>
            <div className='py-2 lg:py-5 flex'>
                <div className='hidden lg:block w-0 lg:w-1/6 h-[82.5dvh] overflow-auto '>
                    <Sidebar />
                </div>
                <div className='w-full lg:w-5/6 h-[82.5dvh] overflow-auto  px-4 2xl:px-8 py-5 2xl:py-7'>
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Layout;