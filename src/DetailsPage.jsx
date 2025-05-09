import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import "./styles/details_page.css"
import Nav from "./partials/Nav";


function DetailsPage (){

    const { id } = useParams();

    const [blog, setBlog] = useState({blog: null});
    const [author, setAuthor] = useState("")

    useEffect(() => {
        const get_blog_id_data = async () => {
            await fetch(`http://localhost:5000/api/blogs/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }).then(response => response.json())
            .then(data => {
                setBlog(data.blog)
                setAuthor(data.authorName)
            })
            .catch(err => console.log(err));
        }
        get_blog_id_data();
    }, [])

    return <>

        <div className="blog-container-details">
            <Nav/>

            <div className="blog-title-container">
                <h2 className="title-blog">{blog.title}</h2>
            </div>
            <div className="blog-content-container">
                <h3 className="content">{blog.body}</h3>
            </div>
            <div className="blog-author">
                <p className="author"><span>By:</span> {author}</p>
            </div>

        </div>
        

    </>
}

export default DetailsPage