import { Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { json, unsplash } from "../../api/unsplash";
import { Link } from "react-router-dom";
import { SetSearch } from "../../redux/modulos/search";
import { Dispatch } from "../../redux";

export function InputSearch() {
  const [search, setSearch] = useState<string>("");
  const [TotalSearch, setTotalSearch] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { Search } = Input;
  const dispatch: Dispatch = useDispatch();

  const buscar_photos = async (value: string) => {
    setIsSearch(true);
    setSearch(value);
    unsplash.search
      .photos(value, 1, 10, { orientation: "portrait" })
      .then(json)
      .then((data) => {
        setIsSearch(false);
        if (data.total) {
          data.search = value;
          dispatch(SetSearch(data));
          setTotalSearch(data.total);
        }
      });
  };

  return (
    <>
      <Search
        placeholder="Search for pictures with keywords..."
        loading={isSearch}
        onSearch={buscar_photos}
        style={{ borderRadius: 50 }}
      />
      {search && TotalSearch ? (
        <Link to="/search">
          Se encontraron <strong>{TotalSearch}</strong> resultados de:{" "}
          <strong>{search}</strong>
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
