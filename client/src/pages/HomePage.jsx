import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [blogPost, setBlogPost] = useState([]);

  const GetBlogPost = async () => {
    try {
      const result = await axios.get("http://localhost:4001/trips?keywords=");
      console.log(result);
      setBlogPost(result.data.data);
    } catch (error) {
      console.log("Error on getting GetBlogPost", error);
    }
  };

  useEffect(() => {
    GetBlogPost();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="App">
      <section className="contentContainer">
        <header className="headerContainer">
          <h1 className="headerChild"> เที่ยวไหนดี</h1>
        </header>
        <nav className="navigationBarContainer">
          <p className="navHeader">ค้นหาที่เที่ยว</p>
          <input
            className="navSearchingBar"
            type="text"
            placeholder="ค้นหาที่เที่ยวแล้วไปกัน ..."
          />
        </nav>
        <section className="blogPostsContainer">
          {blogPost.map((post, index) => (
            <article key={index} className="blogPost">
              <div className="blogPostImageTitleContainer">
                <img className="imgHero" src={post.photos[0]} alt="" />
              </div>
              <div className="blogPostInfoContainer">
                <div className="blogPostInfo">
                  <h1 className="tripName">{post.title}</h1>
                  <p className="tripInfo">{truncateDescription(post.description, 100)}</p>
                  <a className="tripReadMore" href={post.url}>
                    อ่านต่อ
                  </a>
                  <ul className="tripCategory">
                    <p className="tripCategoryListHeader">หมวดหมู่</p>
                    <li className="tripCategoryList">{post.tags[0]}</li>
                    <li className="tripCategoryList">{post.tags[1]}</li>
                    <li className="tripCategoryList">{post.tags[2]}</li>
                    <li className="tripCategoryList">{post.tags[3]}</li>
                    <li className="tripCategoryList">{post.tags[4]}</li>
                  </ul>
                </div>
                <div className="tripPhotosAndIconLink">
                  <div className="tripPhotosContainer">
                    <img className="tripPhoto" src={post.photos[1]} alt="" />
                    <img className="tripPhoto" src={post.photos[2]} alt="" />
                    <img className="tripPhoto" src={post.photos[3]} alt="" />
                  </div>
                  <div className="iconLink">
                    <img
                      className="copyicon"
                      src="/images/hyperlink.png"
                      alt="copy link"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(post.url)
                          .then(() => {
                            console.log("URL copied to clipboard");
                          })
                          .catch((error) => {
                            console.error("Error copying URL to clipboard:", error);
                          });
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}

export default HomePage;
