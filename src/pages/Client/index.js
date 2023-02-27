import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import Total from "../../components/Total";
import Home from "../../components/Home";
import Detail from "../../components/Detail";
import "./Client.scss";
import { getListType } from "../../config/apiService";
import { useEffect, useState } from "react";

const Client = () => {
  const [listType, setListType] = useState([]);
  useEffect(() => {
    listDataType();
  }, []);

  const listDataType = async () => {
    let res = await getListType();
    if (res.types && res.types.length > 0) {
      setListType(res.types);
    }
  };
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        {listType.length > 0 &&
          listType.map((item, index) => {
            let name = item?._links?.self?.href.slice(10, 27);
            return (
              <Route key={index} element={<Total type={name} />} path={name} />
            );
          })}
        <Route element={<Total type="organizations" />} path="organizations" />
        <Route element={<Detail />} path=":id" />
      </Routes>
    </>
  );
};

export default Client;
