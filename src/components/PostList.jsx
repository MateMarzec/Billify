import Post from "./Post";
import { Link } from "react-router-dom";
import classes from "./PostList.module.css";
import articlesList from "../assets/articles.json";
import docsList from "../assets/docs.json";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";

function PostList({ type }) {
  return (
    <div className={classes.container}>
      {type === "articles" &&
        articlesList.length > 0 &&
        articlesList.map((post) => (
          <Post
            type={type}
            key={post.id}
            url={post.url}
            name={post.name}
            desc={post.shortDesc}
            body={post.Body}
          />
        ))}
      {type === "docs" &&
        docsList.length > 0 &&
        docsList.map((post) => (
          <Post
            type={type}
            key={post.id}
            url={post.url}
            name={post.name}
            desc={post.shortDesc}
            body={post.Body}
          />
        ))}
      {type === "articles" && articlesList.length === 0 && (
        <div className={classes.container}>
          <h1>
            There are no {type === "articles" ? <>articles</> : <>documents</>},
            please come back later.
          </h1>
          <button className="primary lg">
            <Link to="/">
              <ArrowLeft /> Go Back
            </Link>
          </button>
        </div>
      )}
      {type === "docs" && docsList.length === 0 && (
        <div className={classes.container}>
          <h1>
            There are no {type === "articles" ? <>articles</> : <>documents</>},
            please come back later.
          </h1>
          <button className="primary">
            <Link to="/">
              <ArrowLeft /> Go Back
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
