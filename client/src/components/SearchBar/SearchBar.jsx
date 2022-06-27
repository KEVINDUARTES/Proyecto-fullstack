import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../../actions";
import './SearchBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();    
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length > 0) {
      dispatch(getNameCharacters(name));
      setName("");
    } else {
      alert("Please enter a name");
    }
  }

  return (
    <div className='inputoxix'>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={name}
          onChange={(e) => handleInputChange(e)}
          className='inputin'
        />
        <button type="Submit" onClick={(e) => handleSubmit(e)} className='inputin'>
          Search
        </button>
      </form>
    </div>
  );
}
