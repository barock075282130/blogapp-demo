'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    const [userPost, setUserPost] = useState([]);

    useEffect(()=>{
        const fetchBlog = async() => {
            const res = await fetch(`/api/users/${params?.id}/blogs`)
            const data = await res.json();

            setUserPost(data)
        }
        if(params?.id) fetchBlog();
    },[params.id])

    return (
        <Profile 
            name={userName}
            data={userPost}
        />
    )
}

export default UserProfile;