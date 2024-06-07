import Link from "next/link";

const LeftSideAuthComponent = () => {
  return (
    <div className="hidden lg:block lg:w-[42%] p-3 2xl:p-5">
      <div className="relative bg-textBlack h-full w-full rounded-2xl lg:rounded-3xl">
        <img
          src="/assets/auth/abc.jpg"
          alt="left side "
          className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl"
        />
        <img
          src="/assets/auth/dots-dots.png"
          alt="left side "
          className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between rounded-2xl lg:rounded-3xl p-12 2xl:p-14">
          <Link href={"/"} className="flex items-center">
            <h2 className="text-white text-xl 2xl:text-2xl font-medium">
              ChatRoom
            </h2>
          </Link>
          <div className="">
            <h1 className="font-bold text-4xl 2xl:text-5xl text-white mr-10">
              Share your story on ChatRoom. Connect, inspire, and grow with a
              global community.
            </h1>
            <p className="pt-4 2xl:pt-8 text-[#F5F5F5] 2xl:text-lg">
              Welcome to ChatRoom, a place where sharing is simple and
              inspiration is sparked. Empower your voice, ignite your
              creativity, and build meaningful connections with a global
              community. Every story matters, and together, we can make a
              difference. Join us and let your voice be heard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideAuthComponent;
