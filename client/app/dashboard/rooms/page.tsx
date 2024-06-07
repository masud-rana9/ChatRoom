'use client'


import AppModal from "@/app/components/ui/AppModal";
import AppTable from "@/app/components/ui/AppTable";
import { useDeleteBlogMutation, useGetBlogsQuery, useGetMyBlogsQuery } from "@/app/states/features/blogs/blogApi";
import { useDeleteRoomMutation, useGetAllRoomsQuery, useGetRoomsQuery } from "@/app/states/features/rooms/roomsApi";
import { formatDate } from "@/app/utils/formateDate";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Blogs = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")

    const queryString = useMemo(() => {
        const info = {
            limit: 10,
            page,
            searchTerm: search.length ? search : undefined,
        };
        const queryString = Object.keys(info).reduce((pre, key: string) => {
            const value = info[key as keyof typeof info];
            if (value) {
                return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
            }
            return pre;
        }, "");
        return queryString;
    }, [page, search]);

    const infoQuery = useGetAllRoomsQuery(queryString);

    const [deleteRoom, { isError, error, isLoading, isSuccess }] = useDeleteRoomMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Blog delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('Blog deleted Successful!')
        }
    }, [isError, error, isLoading, isSuccess])

    const columns = [
        {
            title: 'Cover Url',
            dataIndex: 'coverUrl',
            className: "min-w-[150px]",
            render: (coverUrl: string) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={coverUrl} alt="" className="rounded-md object-cover w-16 h-10" />
                    </div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[205px]",
            render: (name: string) => {
                return (
                    <p className="line-clamp-1 max-w-[30dvw]">{name}</p>
                )
            }
        },

        {
            title: 'Date',
            dataIndex: 'createdAt',
            className: "min-w-[115px]",
            render: (date: string) => {
                return (
                    <p className="line-clamp-1">{formatDate(date)}</p>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            className: "min-w-[185px]",
            render: (_text: any, record: any) => {
                return (
                    <div className='flex items-center gap-8'>
                        <button className="text-xs font-medium px-4 py-1 rounded-full bg-[#E6E6E7] hover:text-gray-800 "><Link href={`/dashboard/edit-blog/${record?.id}`}>Edit Rooms</Link></button>

                        <AppModal button={
                            <button className="text-xs text-white px-4 py-1 rounded-full w-full bg-red">Remove</button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deleteRoom(record?.id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.title}</span> from the rooms list?</p>
                            </div>
                        </AppModal>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <AppTable
                columns={columns}
                infoQuery={infoQuery}
                setPage={setPage}
                onInputChange={(text) => setSearch(text)}
                headerText="Rooms List"
                button={
                    <Link href={"/dashboard/create-room"}>
                        <button className="roundedBtn">Add New Rooms</button>
                    </Link>
                }
            />
        </>
    );
};

export default Blogs;