//Libraries
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./PostDetails.module.css";

//Assets
import articlesList from "../assets/articles.json";
import docsList from "../assets/docs.json";

//List of articles and docs
const dataMapping = {
  articles: articlesList,
  docs: docsList,
};

function PostDetails() {
  //Scroll to top
  window.scroll({
    top: 0,
    left: 0,
  });

  //Get the current url
  const location = useLocation();
  const currentUrl = location.pathname;

  //Break it into an array
  const parts = currentUrl.split("/");

  //Get the last part of the url
  const lastPart = parts[parts.length - 1];

  //Get the prop from the url
  const searchParams = new URLSearchParams(location.search);
  const prop = searchParams.get("prop");

  //Get the data array
  const dataArray = dataMapping[prop] || [];

  //Find the item in the array that matches the last part of the url
  const result = dataArray.find((item) => item.url === lastPart);

  return (
    <main className={classes.postDetails}>
      <article className={classes.container}>
        <Link to={`/resources/${prop}`}>
          <ArrowLeft /> Go Back
        </Link>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={result.id}
        >
          {result && (
            <>
              <h1>{result.name}</h1>
              <div
                className={classes.copy}
                dangerouslySetInnerHTML={{ __html: result.body }}
              />
            </>
          )}
        </motion.div>
      </article>
    </main>
  );
}

export default PostDetails;
