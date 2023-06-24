//Libraries
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Book } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./Post.module.css";

function Post({ type, url, name, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
      }}
    >
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
    </motion.div>
  );
}

export default Post;
