import { FaRegUserCircle } from "react-icons/fa";

type TPeopleCard = {
  data: any
}

const PeopleCard = ({ data }: TPeopleCard) => {
  return (
    <div className="w-full flex flex-col gap-5 rounded">
      <h2 className="text-[24px] bg-white text-black p-2  font-bold w-full rounded">
        People
      </h2>
      {
        data?.participants.map((user: any) => (
          <div key={user?.id} className="flex gap-2 items-center bg-white text-black p-2 rounded">
            <FaRegUserCircle />
            <p>{user?.user?.name}</p>
          </div>
        ))

      }

    </div>
  );
};

export default PeopleCard;
