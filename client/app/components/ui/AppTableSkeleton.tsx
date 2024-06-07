import { Skeleton } from "antd";

const AppTableSkeleton = () => {
    return (
        <div className='p-2 space-y-2 md:p-4'>
            <Skeleton active={true} />
            <Skeleton active={true} />
            <Skeleton active={true} />
        </div>
    );
};

export default AppTableSkeleton;