'use client';

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter , usePathname } from "next/navigation"

const Blogcard = ({ blog , handleDelete ,handleEdit }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const handleProfile = () => {
        if(blog.creator._id === session?.user.id) return router.push('/profile')

        router.push(`/profile/${blog.creator._id}?name=${blog.creator.username}`)
    }
    return (
                <div className="flex flex-col px-6 py-2 bg-white border rounded-lg shadow dark:bg-gray-800/20 dark:border-gray-700/20 ">
                    <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        <p className="my-2 font-satoshi text-gray-700 text-xl">{blog.title}</p>
                        <p className="font-inter text-sm cursor-pointer break-words">
                            {blog.info}
                        </p>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center relative left-40 md:relative md:left-0">
                            <Image 
                                src={blog.creator.image}
                                alt="user_image"
                                width={40}
                                height={40}
                                className="rounded-full object-contain mr-3 cursor-pointer"
                                onClick={handleProfile}
                            />
                            <div className="invisible md:visible">
                                <h3 className="font-satoshi font-semibold text-gray-900 cursor-pointer" onClick={handleProfile}>
                                    {blog.creator.username}
                                </h3>
                                <p className="font-inter text-sm text-gray-500 cursor-pointer" onClick={handleProfile}>
                                    {blog.creator.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end text-gray-500">
                            <p>{blog.dateTime}</p>
                        </div>
                    </div>
                    
                    {session?.user.id === blog.creator._id && pathName === '/profile' && (
                        <div className="flex justify-center items-end">
                            <p className="text-red-500 text-xs px-2 cursor-pointer" onClick={handleDelete}>Delete</p>
                            <p className="text-blue-500 text-xs cursor-pointer" onClick={handleEdit}>Edit</p>
                        </div>
                    )}
                </div>
    )
}

export default Blogcard