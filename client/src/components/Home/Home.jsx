import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  filterCharacterByStatus,
  filterCreated,
  orderByName,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = allCharacters.slice(
    // This constant will save the characters that are going to be displayed depending on the current page
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  function handleClick(e, item) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  function handleFilterStatus(e) {
    e.preventDefault();
    dispatch(filterCharacterByStatus(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="background">
      <Link to="/character">
        <button className="button">Create your Criminal!</button>
      </Link>

      <h1 className="h1">INTERACTIVE BREAKING BAD!</h1>

      <div>
        <div className="cardCreated">
          <select onChange={(e) => handleSort(e)} className="inputoxi">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select onChange={(e) => handleFilterStatus(e)} className="inputoxi">
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Deceased">Deceased</option>
            <option value="Unknown">Unknown</option>
            <option value="Presumed dead">Presumed dead</option>
          </select>
          <select onChange={(e) => handleFilterCreated(e)} className="inputoxi">
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">Existing</option>
          </select>

          <div className='div'>
            <SearchBar />
          </div>
        </div>

        <Paginate
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginate={paginate}
        />

        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="button"
        >
          Refresh Characters (F5)
        </button>

        <div className="new">
          {currentCharacters?.map((el, item) => {
            return (
              <div key={item} className="order">
                <div>
                  <Link
                    to={"/home/" + el.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      name={el.name}
                      image={el.image}
                      nickname={el.nickname}
                      key={el.id}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
