import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='background'>
      <h1 className='texto'>Welcome to Breaking Bad (feat. Rick and Morty!)</h1>
      <Link to="/home">
        <button className='botonex'>Enter</button>
      </Link>
    </div>
  );
}