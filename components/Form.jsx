import Link from 'next/link';

const Form = ({ 
    type,
    post,
    setPost,
    submitting,
    handleSubmit
}) => {
    return (
    <div className='flex flex-col pb-10'>
        <span className='head_text'>{ type } Blog</span>
        <div className='flex justify-center'>
            <div className='w-full max-w-md'>
                <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-3'>
                    <label htmlFor="title" className='flex justify-center items-center py-2'>Blog title</label>
                    <input type="text" value={post.title}
                        onChange={(e)=> setPost({ ...post, title: e.target.value })}
                        placeholder='Input Title'
                        required
                        className='border border-black/20 p-3 rounded-lg w-full'
                    />
                    <label htmlFor="info" className='flex justify-center items-center py-2'>Blog info</label>
                    <textarea className='border border-black/20 py-3 px-6 rounded-lg w-full'
                        value={post.info}
                        onChange={(e)=> setPost({ ...post, info: e.target.value})}
                        placeholder='Infomation of your blog'
                        required
                        rows={15}
                    ></textarea>
                    <div className='flex justify-between my-2'>
                        <Link href='/profile' className='justify-start bg-gray-200 px-3 py-2 rounded-lg'>
                            Cancle
                        </Link>
                        <button type="submit" disabled={submitting} className='justify-end bg-blue-200 px-3 py-2 rounded-lg'>
                            {submitting ? `${type}...` : type}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Form