'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [ blog, setBlog ] = useState([]);

    const handleDelete = async(blogs) => {
        const hasConfirmed = confirm('Delete this blog?')
        if(hasConfirmed){
            try {
                await fetch(`/api/blog/${blogs._id.toString()}`,{
                    method: 'DELETE',
                })

                const filterBlog = blog.filter((b)=> b._id !== blogs.id)
                setBlog(filterBlog)
                router.push('/');
            } catch (error) {
                console.log('Failed to delete')
            }
        }
    }

    const handleEdit = (blog) => {
        router.push(`/update-blog?id=${blog._id}`)
    }

    useEffect(()=>{
        const fetchBlog = async() => {
            const res = await fetch(`/api/users/${session?.user.id}/blogs`)
            const data = await res.json();

            setBlog(data)
        }
        if(session?.user.id) fetchBlog();
    },[])

    return (
        <Profile 
            name='My'
            data={blog}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
}

export default MyProfile