import { Link, useParams } from "react-router-dom";
import { getAnimal } from "../../config/apiService";
import { useEffect, useState } from "react";
import "./Detail.scss";
import Loading from "../Loading";
const Detail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    listDataType();
  }, []);
  const listDataType = async () => {
    setIsLoading(false);
    let res = await getAnimal(id);
    if (res && res.animal) {
      setData(res.animal);
      setIsLoading(true);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="grid wide container">
          <div className="row">
            <Link to={`/animal/${data._links?.type?.href.slice(10, 27)}`}>
              {data.type}
            </Link>
            <h1 className="col l-12">{data.name}</h1>
            <div className="col l-6" style={{ textAlign: "left" }}>
              <p>
                <b>Description:</b> {data.description}
              </p>
              <p>
                <b>Age:</b> {data.age}
              </p>
              <p>
                <b>Gender:</b> {data.gender}
              </p>
              <p>
                <b>Breeds:</b> {data.breeds?.primary}
              </p>
            </div>

            <div className="col l-5">
              <img src={data.primary_photo_cropped?.large} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Detail;
