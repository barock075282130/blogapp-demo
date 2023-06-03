import Blogcard from './Blogcard'

const Profile = ({ data , name , handleDelete, handleEdit}) => {
    return (
        <section className="w-full mb-5">
            <h1 className="head_text text-left">
                <span>{name} Blog</span>
            </h1>
            <div className='grid grid-cols-1 gap-3 mx-5 mt-10 md:grid-cols-2'>
                {data.map((blog)=>(
                    <Blogcard 
                        key={blog._id}
                        blog={blog}
                        handleDelete={()=> handleDelete && handleDelete(blog)}
                        handleEdit={()=> handleEdit && handleEdit(blog)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Profile