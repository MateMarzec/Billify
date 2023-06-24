//Libraries
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";

//Components
import Post from "./Post";

//Styles
import classes from "./PostList.module.css";

//Assets
import articlesList from "../assets/articles.json";
import docsList from "../assets/docs.json";

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={classes.container}
        >
          <h1>
            There are no {type === "articles" ? <>articles</> : <>documents</>},
            please come back later.
          </h1>
          <button className="primary lg">
            <Link to="/">
              <ArrowLeft /> Go Back
            </Link>
          </button>
        </motion.div>
      )}
      {type === "docs" && docsList.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={classes.container}
        >
          <h1>
            There are no {type === "articles" ? <>articles</> : <>documents</>},
            please come back later.
          </h1>
          <button className="primary">
            <Link to="/">
              <ArrowLeft /> Go Back
            </Link>
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default PostList;
