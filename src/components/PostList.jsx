import Post from "./Post";
import classes from "./PostList.module.css";
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
      {type === "articles" && articlesList.length && (
        <div className={classes.empty}>
          <p>
            There are no {type === "articles" ? <>articles.</> : <>documents</>}
            .
          </p>
        </div>
      )}
      {type === "docs" && docsList.length && (
        <div className={classes.empty}>
          <p>
            There are no {type === "articles" ? <>articles.</> : <>documents</>}
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default PostList;
