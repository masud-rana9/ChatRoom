import { config } from "@/config";
import { formatDate } from "./../utils/formateDate";

const getPosts = async () => {
  const res = await fetch(`${config.baseUrl}/blogs`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular blogs
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Providing a platform for individuals to share their thoughts,
            experiences, and ideas with the world.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts?.data?.data?.map((post: any) => (
            <article
              key={post?.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <img
                src={post?.imageUrl}
                alt=""
                className="rounded-xl max-h-56 w-full object-cover mb-4"
              />
              <div className="flex items-center gap-x-4 text-xs text-gray-500">
                {formatDate(post?.createdAt)}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0" />
                  {post?.title}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post?.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    {post?.author?.name}
                  </p>
                  <p className="text-gray-600">{post?.author?.email}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
