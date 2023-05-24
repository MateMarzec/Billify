import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { Link, useLocation, useParams } from "react-router-dom";
import articlesList from "../assets/articles.json";
import docsList from "../assets/docs.json";
import classes from "./PostDetails.module.css";

const dataMapping = {
  articles: articlesList,
  docs: docsList,
};

function PostDetails() {
  window.scroll({
    top: 0,
    left: 0
  });

  const location = useLocation();
  const currentUrl = location.pathname;
  const parts = currentUrl.split("/");
  const lastPart = parts[parts.length - 1];

  const searchParams = new URLSearchParams(location.search);
  const prop = searchParams.get("prop");

  const dataArray = dataMapping[prop] || [];

  const result = dataArray.find((item) => item.url === lastPart);

  return (
    <main className={classes.postDetails}>
      <article className={classes.container}>
        <Link to={`/resources/${prop}`}>
          <ArrowLeft />
        </Link>
        <div key={result.id}>
          {result && (
            <>
              <h1>{result.name}</h1>
              <div
                className={classes.copy}
                dangerouslySetInnerHTML={{ __html: result.body }}
              />
            </>
          )}
        </div>
      </article>
    </main>
  );
}

export default PostDetails;
