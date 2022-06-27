import React from "react";
import './Paginado.css';

export default function Paginate({
  charactersPerPage,
  allCharacters,
  paginate,
  currentPage
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='ul'>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className='li' key={number}>
              <button className={number === currentPage ? 'current' : 'paginate'} onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
