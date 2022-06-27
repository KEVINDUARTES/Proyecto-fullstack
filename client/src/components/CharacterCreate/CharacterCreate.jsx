import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postCharacter, getOccupations } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./CharacterCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.nickname) {
    errors.nickname = "Nickname is required";
  } else if (!input.birthday) {
    errors = "Birthday is required";
  }
  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    image: "",
    status: "",
    occupation: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("input", input);
    dispatch(postCharacter(input));
    alert("Character created successfully");
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      image: "",
      status: "",
      occupation: [],
    });
    console.log("input", input);
    navigate("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div className="backgroundCreate">
      <Link to="/home">
        <button className="botonx">Back to Main Page</button>
      </Link>
      <h1 className="text">Create your Character!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cardCreate">
          <div className="text1">
            <label>Name:</label>
            <input
              className="inputo"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="text1">
            <label className="labelo">Nickname:</label>
            <input
              className="inputo"
              type="text"
              value={input.nickname}
              name="nickname"
              onChange={(e) => handleChange(e)}
            />
            {errors.nickname && <p className="error">{errors.nickname}</p>}
          </div>
          <div className="text1">
            <label className="birthday">Birthday:</label>
            <input
              className="inputo"
              type="text"
              value={input.birthday}
              name="birthday"
              onChange={(e) => handleChange(e)}
            />
            {errors.birthday && <p className="error">{errors.birthday}</p>}
          </div>
          <div className="text1">
            <label className="margino">Image:</label>
            <input
              className="inputo"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="text1">
            <label>Status: </label>
            <label>
              Alive
              <input
                type="radio"
                name="Alive"
                value="Alive"
                onChange={(e) => handleCheck(e)}
              />
            </label>
            <label>
              Deceased
              <input
                type="radio"
                name="Deceased"
                value="Deceased"
                onChange={(e) => handleCheck(e)}
              />
            </label>
            <label>
              Unknown
              <input
                type="radio"
                name="Unknown"
                value="Unknown"
                onChange={(e) => handleCheck(e)}
              />
            </label>
          </div>
          <div>
            <select onChange={(e) => handleSelect(e)} className="inputox">
              {occupations.map((occ, item) => (
                <option key={item} value={occ.name}>
                  {occ.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            {input.occupation.map((el) => (
              <div className='right'>
                <button
                  className="close circle span"
                  onClick={() => handleDelete(el)}
                >
                  X
                </button>
                <div >
                  <p className="p">{el}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <ul>
            <p>{input.occupation.map((el) => el + " ,")}</p>
          </ul> */}
          <button type="submit" className="botonxo">
            Create Character
          </button>
        </div>
      </form>
    </div>
  );
}
