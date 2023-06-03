'use client';

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditBlog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ submitting, setSubmitting ] = useState(false);
    const blogId = searchParams.get('id');
    const [ blog, setBlog ] = useState({
        title: '',
        info: ''
    }) 

    useEffect(()=>{
        const getBlogDetails = async() => {
            const res = await fetch(`/api/blog/${blogId}`)
            const data = await res.json();
            setBlog({
                title: data.title,
                info: data.info
            })
        }
        if(blogId) getBlogDetails();
    },[blogId])

    const updateBlog = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`/api/blog/${blogId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    title: blog.title,
                    info: blog.info
                })
            })

            if(res.ok){
                router.push('/profile');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form 
            type="Edit"
            post={blog}
            setPost={setBlog}
            submitting={submitting}
            handleSubmit={updateBlog}
        />
    )
}

export default EditBlog