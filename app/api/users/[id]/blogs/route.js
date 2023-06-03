import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async(req, { params }) => {
    try {
        await connectToDB();
        const blogs = (await Blog.find({ creator: params.id }).populate("creator")).reverse();

        return new Response(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
        return new Response('Error to fetch blog data', { status: 500 })
    }
}