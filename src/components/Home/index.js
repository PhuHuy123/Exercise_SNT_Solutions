import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import { getAllAnimal } from "../../config/apiService";
import { useEffect, useState } from "react";
const Home = () => {
  const [allArticle, setAllArticle] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    setIsLoading(false);
    let res = await getAllAnimal();
    if (res.animals && res.animals.length > 0) {
      setAllArticle(res.animals);
      setIsLoading(true);
    }
  };
  const handleClick = (id) => {
    navigate(`${id}`);
  };
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isLoading && (
        <div className="grid wide container">
          <div className="row">
            {allArticle &&
              allArticle.length > 0 &&
              allArticle.map((item) => (
                <div className="col l-3" key={item.id}>
                  <Link to={`/animal/${item.id}`}>
                    <div className="course-item">
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${
                            item?.primary_photo_cropped?.large
                              ? item.primary_photo_cropped.large
                              : "https://i.imgur.com/y9P9su4_d.webp?maxwidth=760&fidelity=grand"
                          })`,
                        }}
                      ></div>
                      <b>{item?.name}</b>
                      <p>{item?.breeds?.primary}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
