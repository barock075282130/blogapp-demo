'use client';

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateBlog = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [ submitting, setSubmitting ] = useState(false);
    const [ blog, setBlog ] = useState({
        title: '',
        info: ''
    }) 

    const createBlog = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/blog/new',{
                method: 'POST',
                body: JSON.stringify({
                    title: blog.title,
                    userId: session?.user.id,
                    info: blog.info
                })
            })

            if(res.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form 
            type="Create"
            post={blog}
            setPost={setBlog}
            submitting={submitting}
            handleSubmit={createBlog}
        />
    )
}

export default CreateBlog