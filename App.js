
import React,{useState,useEffect} from 'react';
import Movieslist from "./Component/Movieslist";
// import "bootsrap/dist/css/bootsrap.min.css";
import './App.css';
import Search from './Component/Search';
import AddFavourites from './Component/AddFavourites';
import RemoveFavourites from './Component/RemoveFavourites';

const App=()=> {
  const[movies,setMovies]= useState([    {
      title:'B13',
      image:'https://m.media-amazon.com/images/I/51fVz8BPC3L._AC_.jpg',
      discription:'Action',
      posteURL:'https://youtu.be/Gzg9kuH_M0g',
      evaluation:' 10 novembre 2004 (France)',
    },
    {
      title:'Shootfighter',
      image:'https://m.media-amazon.com/images/M/MV5BMTI2MjYxNTUzMl5BMl5BanBnXkFtZTcwNTQyOTQyMQ@@._V1_.jpg',
      discription:'Action',
      posteURL:'https://youtu.be/IBUyCSKju9I',
      evaluation:'5 mai 1993', 
    },
    {
      title:'Coup de foudre au Plaza',
      image:'https://media.senscritique.com/media/000000107499/source_big/Coup_de_foudre_au_Plaza.jpg',
      discription:'romantic',
      posteURL:'https://youtu.be/012WdIK-bBI',
      evaluation:' 28 Dec 2008', 
    },
    {
      title:'Urs',
      image:'https://i.ytimg.com/vi/b0HzLYJla1M/maxresdefault.jpg',
      discription:'cartoon',
      posteURL:'https://youtu.be/b0HzLYJla1M',
      evaluation:' 12 Sept 2020', 
    },
]);
const [favourites, setFavourites] = useState([]);
const [searchValue, setSearchValue] = useState('mouvie');
const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
};
useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue]);
useEffect(() => {
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
  );

  setFavourites(movieFavourites);
  if (movieFavourites) {
    setFavourites(movieFavourites);
  }
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
};
const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};
const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};
return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <Movieslist heading='Movies' />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='row'>
    <Movieslist
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddFavourites}
      />
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <Movieslist heading='Favourites' />
    </div>
    <div className='row'>
      <Movieslist
        movies={favourites}
        handleFavouritesClick={removeFavouriteMovie}
        favouriteComponent={RemoveFavourites}
      />
    </div>
  </div>
);
};
export default App;