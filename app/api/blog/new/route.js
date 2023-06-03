import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const POST = async(req) => {
    const { userId , title, info } = await req.json();
    let time = new Date();
    let day = time.getDate().toString();
    let valDate = day > 9 ? day : "0" + day;
    let month = time.getMonth() + 1;
    let valMonth = month > 9 ? month : '0'+ month
    let year = time.getFullYear().toString();
    let fullYear = year + "/" + valMonth + "/" + valDate;
    try {
        await connectToDB();
        const newBlog = new Blog({
            creator: userId,
            title,
            info,
            dateTime: fullYear,
        });
        await newBlog.save()
        return new Response(JSON.stringify(newBlog), { status: 200 });
    } catch (error) {
        return new Response('Cant send data', { status: 500 })
    }
}