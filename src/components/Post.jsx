import { Link } from "react-router-dom";
import classes from "./Post.module.css";
import { Book } from "feather-icons-react/build/IconComponents";

function Post({ type, url, name, desc }) {
  return (
    <article className={classes.post}>
      <div className={classes.icon}>
        <Book />
      </div>
      <div className={classes.copy}>
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
      <button type="button" className="primary lg">
        <Link to={`/resources/${type}/${url}?prop=${type}`}>Read More</Link>
      </button>
    </article>
  );
}

export default Post;
