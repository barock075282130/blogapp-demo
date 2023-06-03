'use client';
import { useEffect, useState } from 'react'
import Blogcard from './Blogcard'

const BlogList = ({ data }) => {

    return (
        <div className='flex flex-col gap-3 mx-5 mb-10'>
            {data.map((blog)=>(
                <Blogcard 
                    key={blog._id}
                    blog={blog}
                />
            ))}
        </div>
    )
}
const Feed = () => {
    const [ blogs , setBlogs ] = useState([]);
    const [ searchResults , setSearchResults ] = useState([]);
    const [ searchTimeout , setSearchTimeout ] = useState(null);
    const [ searchText , setSearchText ] = useState('');

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, 'i');
        return blogs.filter((item)=>
            regex.test(item.creator.username) || 
            regex.test(item.title) || 
            regex.test(item.info)
        )
    }

    const fetchBlog = async() => {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data)
    }
    useEffect(()=>{
        fetchBlog();
    },[]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    
        setSearchTimeout(
            setTimeout(()=>{
                const searchResults = filterPrompts(e.target.value);
                setSearchResults(searchResults);
            }, 500)
        )
    }

    return (
        <div>
            <div className='flex justify-center mb-8'>
                <span className='flex items-center mx-3 font-semibold text-xl'>Search</span>
                <input type="text" 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    className='px-3 py-1 rounded-lg border border-gray-300'
                />
            </div>
            {searchText ? (
                <BlogList
                    data={searchResults}
                />
            ):(
                <BlogList
                    data={blogs}
                />
            )}
        </div>
    )
}

export default Feed