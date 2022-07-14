import CustomHeader from './component/CustomHeader'
import CustomFooter from './component/CustomFooter'
import MovieDetails from './component/moviesDetails'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function Movies() {

  const [allMovies, setAllMovies] = useState([0]);
  const [movieID, setMovieID] = useState(null);
  const router = useRouter();

  const handleClick = (id) => {
    setMovieID(id);
  };

  useEffect(() => {
    async function getAllMoviesData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getAllMovies`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setAllMovies(res.movies);
    }
    getAllMoviesData();

    const href = location.href;
    if (href.indexOf("?") != -1) {
      let movieNo = href.split('movieNo=')[1];
      if (movieNo) {
        setMovieID(movieNo);
      }
    } else {
    }
  }, []);


  return (
    <div className="p-0">
      <CustomHeader>
      </CustomHeader>
      <main className="px-0">
        <ul className="m-0 py-4 px-28 bg-indigo-50 flex justify-start flex-wrap">
          {allMovies ? (allMovies.map((movies) => {
            const routerLink = "/movies?movieNo=" + movies.movieNo;
            if (movieID == movies.movieNo) {
              return (
                <li key={movies.movieNo} onClick={() => { handleClick(movies.movieNo); router.push(routerLink) }} className="w-1/4 pt-1 pr-4 pb-1 pl-5 cursor-pointer text-sm leading-4 text-indigo-500 -indent-5 tracking-wide">
                  ▻&nbsp;&nbsp;{movies.movieNameT}
                </li>
              );
            } else {
              return (
                <li key={movies.movieNo} onClick={() => { handleClick(movies.movieNo); router.push(routerLink) }} className="w-1/4 pt-1 pr-4 pb-1 pl-5 cursor-pointer text-sm leading-4 text-slate-900 -indent-5 tracking-wide hover:text-indigo-500 focus:text-indigo-500">
                  ▻&nbsp;&nbsp;{movies.movieNameT}
                </li>
              )
            }
          })) : ""}
        </ul>
        {movieID ? <MovieDetails idNum={movieID}></MovieDetails> : ""}
      </main>
      <CustomFooter>
      </CustomFooter>
    </div>
  )
}
