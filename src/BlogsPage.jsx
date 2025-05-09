import { useEffect, useState } from 'react'
import Footer from './partials/Footer'
import Nav from './partials/Nav'
import "./styles/blogs_page.css"

function BlogsPage(){

    const[blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {

            await fetch("http://localhost:5000/api/blogs/data")
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setBlogs(json)
            })
            .catch(err => console.log(err));
        }
        getBlogs();
    }, [])


    return <>
        <Nav/>
        <div className="blogs-page">
            <div className='heading-content'>
                <div className='heading-text'>
                    <h1 className="heading1">A place to <br /><span>Create and Share!</span></h1>
                    <p className="under-heding">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br />Vel, autem! Voluptatem eligendi maiores nemo perspiciatis eius sit veniam nihil vitae.</p>
                </div>
                <div className='heading-image'>
                    <img src="../public/typewriter_banner.png" alt="" />
                </div>
            </div>
            <div className="blogs-body">
                {blogs.map((blog)=> {
                    return <>
                        <div className='blog-content'>
                            <a className="single-blog" key={blog._id} href={`/blogs/${blog._id}`}>
                                <div className='blog-text'>
                                    <div>
                                        <p>Posted by: {blog.author}</p>
                                        <h3 className="title">{blog.title}</h3>
                                        <p className="snippit">{blog.snippet}</p>
                                    </div>
                                    <div className='addings'>
                                        <p className='date'>{String (blog.createdAt).substring(0, 10)}</p>
                                        <div className='likes'>
                                            <img src="../public/like-hand-symbol-of-rounded-shape-variant-svgrepo-com.svg" alt="like symbol"/>
                                            <p>{blog.likes}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='image-blog'>
                                    <img src={blog.image} alt="Blog Image"/>
                                </div>
                            </a>
                        </div>
                        <hr color="#222" width="500px" size="4px" className="line"/>
                    </>
                    })
                }
            </div>       
        </div>

        <Footer></Footer>
    </>
}

export default BlogsPage