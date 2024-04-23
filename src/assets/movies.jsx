import React, { useEffect, useState } from 'react'

import axios from 'axios'

// let id = 1;
function Movies() {

    const [movies, setMovies] = useState([]);

    const [addMovies, setAddMovies] = useState({
        movieTitle: "",
        movieReview: ""
    });

    const [update, setUpdate] = useState(0);

    const [updateMovies, setUpdateMovies] = useState({
        movieReview:""
      });

      const [error,setError] = useState(false)

   
 



      const updateChange = (e) => {
        setUpdateMovies((prev) => ({ ...prev, movieReview: e.target.value }));
      };

      console.log(updateMovies);
    
      const handleSubmit = async (id) => {
        // e.preventDefault();
    
        try {
          await axios.put("http://localhost:3000/movies/"+id,
          {
            movieReview: updateMovies.movieReview
        }).then((res) => {
            fetchAllMovies()
            setUpdate(0)
        });
        //   navigate("/");
        } catch (err) {
          console.log(err);
          setError(true);
        }
      };
    

    const handleChange = (e) => {
        setAddMovies((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/movies", {
                movieTitle: addMovies.movieTitle,
                movieReview: addMovies.movieReview
            }).then((res) => {
                fetchAllMovies()
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/movies/" + id).then((res) => {
                console.log(res);
            })
            fetchAllMovies();
        }
        catch (err) {

        }
    }

    // console.log(addMovies);

    function handleUpdate(currID) {
        setUpdate(currID);
        // fetchAllMovies()
        id = 1;

    }

    const fetchAllMovies = async () => {
        try {
            const res = await axios.get("http://localhost:3000/movies")
            setMovies(res.data);
        }
        catch (err) {
            console.log(err);
        }
        // id = 1
    }

    useEffect(() => {
        fetchAllMovies()
    }, [])

    return (
        <div className='MRS'>
            <h1>Movies Review System</h1>
            <div className="movie-form">
                <h2>Add Movie</h2>
                <form action="#" method="post">
                    <input
                        type="text"
                        name="movieTitle" onChange={handleChange}
                        placeholder="Enter movie name"
                        required
                    />
                    <textarea
                        name="movieReview" onChange={handleChange}
                        placeholder="Write your review here"
                        required
                    ></textarea>
                    <button type="submit" onClick={handleClick}>Submit</button>
                </form>
            </div>
            <div className='movies'>
            {/* {id=1} */}
                {movies.map(movie => (
                    <div className='movie' key={movie.movieID}>
        
                        <h2>{movie.movieTitle}</h2>
                        {update === movie.movieID ? <div>

                            <textarea
                                name="movieReview" onChange={updateChange}
                                placeholder="Write your updated review here"
                                required
                            ></textarea>
                            <button onClick={() => handleSubmit(movie.movieID)}>Submit</button>
                        </div>:<p>{movie.movieReview}</p>}
                        <div className='actions'>
                        <button onClick={() => handleUpdate(movie.movieID)}>Update</button>
                        <button onClick={() => handleDelete(movie.movieID)}>Delete</button>
                        </div>


                    </div>
                ))}

            </div>
        </div>
    );
}

export default Movies;