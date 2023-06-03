import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async(req) => {
    try {
        await connectToDB();

        const blog = (await Blog.find({}).populate('creator')).reverse();
        return new Response(JSON.stringify(blog), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch data',{ status: 500 })
    }
}