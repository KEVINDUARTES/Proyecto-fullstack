import React from "react";
import { getDetail, getDeleteDetail } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './Detail.css';

export default function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(getDeleteDetail());
    };
  }, [dispatch, id]);

  const myCharacter = useSelector((state) => state.detail);

  return (
    <div className='backgrouny'>
      <Link to="/home">
        <button className='boton'>Back to Home</button>
      </Link>
      {myCharacter.length > 0 ? (
        <div>
          <h1>I am {myCharacter[0].name}</h1>
          <img className='imgx'
            src={myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image}
            alt=""
            width="300px"
            height="400px"
          />
          <h2>Status: {myCharacter[0].status}</h2>
          <h3>Birthdate: { myCharacter[0].birthday}</h3>
          <h3>
            Occupations: {" "}
            {!myCharacter[0].createdAtDb
              ? myCharacter[0].occupation + " "
              : myCharacter[0].occupations.map((el) => el.name + " ")}
          </h3>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
