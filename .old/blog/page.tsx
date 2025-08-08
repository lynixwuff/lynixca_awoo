import LoaderEvents from "@/components/LoaderEvents";
import Navbar from "@/components/nav/Navbar";
import { Link } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Furnal Equinox 2024',
      imageUrl: '/images/fe2024.jpg',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 22, 2024',
      datetime: '2020-03-16',
      category: { title: 'Furry Convention', href: '#' },
      author: {
        name: 'Lynix',
        role: 'Website Administrator',
        href: '#',
        imageUrl:
          '/images/profile.jpg',
      }
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />


      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/banners/blog.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/45 via-black/45 to-transparent z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Blog
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)]">
              Follow my journey across the globe, the universe and through the digital frontier, you'll learn a lot here.
            </p>
          </div>
        </div>
      </div>


      <LoaderEvents />

      <div className="sm:py-32 hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-400">
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-100 group-hover:text-gray-300">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{post.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-100 object-cover" />
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-100">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-gray-400">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}