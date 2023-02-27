import { Link, useNavigate } from "react-router-dom";
import { getAllType } from "../../config/apiService";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Footer from "../Footer";
const Total = ({ type }) => {
  const [allArticle, setAllArticle] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    allData();
  }, []);
  useEffect(() => {
    allData();
  }, [type]);
  const allData = async () => {
    setIsLoading(false);
    let res = await getAllType(page, type);
    if (type === "organizations") {
      if (res.organizations && res.organizations.length > 0) {
        setAllArticle(res.organizations);
        setIsLoading(true);
      }
    } else {
      if (res.animals && res.animals.length > 0) {
        setAllArticle(res.animals);
        setIsLoading(true);
      }
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
  const handlePage = async (input) => {
    if (input === "add") {
      setPage(page + 1);
      await allData();
      goToTop();
    }
    if (input === "add-2" && page===1) {
      setPage(page + 1);
      await allData();
      goToTop();
    }
    if (input === "reduce" && page !== 1) {
      setPage(page - 1);
      await allData();
      goToTop();
    }
  };
  return (
    <>
      {isLoading ? (
        <>
        <div className="grid wide container">
          <h1>List {type}</h1>
          <div className="row">
            {allArticle &&
              allArticle.length > 0 &&
              allArticle.map((item) => (
                <div className="col l-3 m-4 c-6" key={item.id}>
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
                    <div className="name-animal">
                    <b>{item?.name}</b>
                    </div>
                    <p>{item?.breeds?.primary}</p>
                  </div>
                  </Link>
                </div>
              ))}
            <div className="paging">
              <div id="pg-links">
                <div className="td arr-cover">
                  <div
                    className="arrow"
                    id="l-arrow"
                    onClick={() => handlePage("reduce")}
                  >
                    <img src="https://img.upanh.tv/2023/02/25/left-1.png" />
                  </div>
                </div>
                <div className="td">
                  <div id="links">
                    <div
                      className="pg-link"
                      id={page === 1 ? "m-pg-link" : "false"}
                      onClick={() => handlePage("reduce")}
                    >
                      <span>{page === 1 ? page : page - 1}</span>
                    </div>
                    <div
                      className="pg-link"
                      id={page > 1 ? "m-pg-link" : "false"}
                      onClick={() => handlePage("add-2")}
                    >
                      <span>{page === 1 ? page + 1 : page}</span>
                    </div>
                    <div className="pg-link" onClick={() => handlePage("add")}>
                      <span>{page === 1 ? page + 2 : page + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="td arr-cover">
                  <div
                    className="arrow"
                    id="r-arrow"
                    onClick={() => handlePage("add")}
                  >
                    <img src="https://img.upanh.tv/2023/02/25/left-1.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        </>
      ):
      <Loading/>
      }
    </>
  );
};
export default Total;
