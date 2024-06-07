"use client";

import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdPostAdd } from "react-icons/md";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbLogs } from "react-icons/tb";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      path: "/dashboard",
      Icon: MdDashboard,
      label: "dashboard",
      relativePath: "",
    },
    {
      path: "/dashboard/profile",
      Icon: CgProfile,
      label: "Profile",
      relativePath: "",
    },
    {
      path: "/dashboard/blogs",
      Icon: TbLogs,
      label: "Blogs",
      relativePath: "",
    },
    {
      path: "/dashboard/add-blog",
      Icon: MdPostAdd,
      label: "Add Blog",
      relativePath: "",
    },
    {
      path: "/dashboard/rooms",
      Icon: MdOutlineBedroomChild,
      label: "Rooms",
      relativePath: "",
    },
    {
      path: "/dashboard/create-room",
      Icon: MdPostAdd,
      label: "Add Room",
      relativePath: "",
    },
  ];

  return (
    <div className="lg:border-r border-[#DDDDDD] lg:pl-5 2xl:pl-7 space-y-2 2xl:space-y-3">
      {sidebarLinks.map((singleItem, index) => (
        <div key={index} className="overflow-hidden space-y-0.5 2xl:space-y-1">
          <Link
            href={singleItem?.path}
            className={`relative flex items-center gap-2 pl-2 lg:pl-4 2xl:gap-3 hover:bg-primary hover:rounded-[10px] hover:text-white hover:font-semibold group py-1.5 2xl:py-2 ${
              pathname === singleItem?.path ||
              pathname === singleItem?.relativePath
                ? `text-white font-semibold bg-primary rounded-[10px]`
                : "text-textSecondary"
            }`}
          >
            <div
              className={`w-9 h-9 flex items-center justify-center text-black rounded-full group-hover:bg-[#F5F5F6] p-1 ${
                pathname === singleItem.path ||
                pathname === singleItem?.relativePath
                  ? "bg-[#F5F5F6]"
                  : "bg-[#F5F5F6]"
              }`}
            >
              <singleItem.Icon className="text-xl " />
            </div>
            <p className="">{singleItem.label}</p>
            <div
              className={`group-hover:bg-white absolute h-4 w-1 right-0 top-[35%] rounded-l ${
                pathname === singleItem?.path ||
                pathname === singleItem?.relativePath
                  ? "bg-white"
                  : ""
              }`}
            ></div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
