import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const DELETE = async(req, { params }) => {
    try {
        await connectToDB();

        await Blog.findByIdAndRemove(params.id)
        return new Response('Deleted successfully', { status: 200 })
    } catch (error) {
        return new Response("Delete failed", { status: 500 });
    }
}

export const GET = async(req, { params }) => {
    try {
        await connectToDB();

        const res = await Blog.findById(params.id)
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response("Get Detail failed", { status: 500 });
    }
}

export const PATCH = async(req,{ params }) => {
    const { title , info } = await req.json();
    try {
        await connectToDB();

        const existBlog = await Blog.findById(params.id)
        if(!existBlog) return new Response('Blog not exist',{ status: 404 })

        existBlog.title = title;
        existBlog.info = info;

        await existBlog.save();
        return new Response(JSON.stringify(existBlog),{ status: 200 })
    } catch (error) {
        return new Response('Update blog failed', { status: 500 })
    }
}