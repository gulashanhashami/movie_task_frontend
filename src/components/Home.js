import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Stylediv = styled.div`
font-family:   Arial, sans-serif;

   .dropdownBox {
    width: 100%;
       height: 8vh;
       display: flex;
       flex-direction: row;
       gap: 30px;
       align-items: center;
         padding-left:7%;
       background-color: red;
   }

   .filter{
    width: 12%;
    font-weight: bold;
    font-size: 1.2vw;
    height: auto;
    border-radius: .5vw;
    display: flex;
       flex-direction: column;
       gap: 5px;
       p{
        margin:0 0 0 0;
        font-size: 1.2vw;
        color: white;
       }
       select {
        height: 4vh;
       }

  }
  .btn {
    width: 8%;
    font-weight: bold;
    font-size: 1.2vw;
    height: 4.5vh;
    border-radius: .3vw;
    color:white;
    border: none;
    background-color: green;
    margin-top: 3.5vh;
  }
  .btn:hover{
    background-color: white;
    color: black;
  }

  .box1{
    width:85%;
    height:84vh;
    display: grid;
    grid-template-columns: repeat(4, 22%);
    @media (max-width:415px){
        width:81%;
        grid-template-columns: repeat(2, 48%);
        grid-gap: 3%; 
    }
    grid-gap: 4%;
    overflow-y: scroll;
    margin: auto;
    margin-top: 1.5vh;
    border-bottom: .1vw solid grey;
}

.card{
    width: 95%;
    height: 75vh;
    @media (max-width:415px){
        width: 100%;
        height:30vh;
        padding-bottom: 3%;
    }
   display: flex;
   flex-direction: column;
   justify-content: space-between;
    padding-bottom: 5%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    p{
        font-size: 1vw;
        line-height: 0px;
        @media (max-width:415px){
         
            font-size: 2.7vw;
        }
    }
}
.img1{
    width: 100%;
    height: 82%;
    @media (max-width:415px){
        height: 80%;
    }
}
`;

export const Home = () => {
    const [filter, setFilter] = useState({ genre: "Action", duration: "short", mood: "Happy" });
    const [movieData, setMovieData] = useState([]);
    const [loadingData, setLoading] = useState(false);

    // useEffect to call the fetch data function after rendering UI
    useEffect(() => {
        fetchData();
    }, []);

    // Logic to handle the filter
    const filterFunction = (e) => {
        console.log(e.target.name);
        if (e.target.name == "genre") {
            setFilter({ ...filter, genre: e.target.value });
        }
        if (e.target.name == "duration") {
            setFilter({ ...filter, duration: e.target.value });
        }
        if (e.target.name == "mood") {
            setFilter({ ...filter, mood: e.target.value });
        }
    }

    // Function to handle the fetch data
    async function fetchData() {
        setLoading(true);
        try {
            const data = await axios.get(`http://localhost:2345/movies?genre=${filter.genre}&duration=${filter.duration}&mood=${filter.mood}`);
            setMovieData(data.data.movies)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.response);
        }
    }

    // condition based rendering
    if (loadingData || movieData === undefined) {
        return (
            <h1 style={{ marginLeft: "35%", marginTop: "11%", fontSize: "2vw" }}>Loading...</h1>
        )
    } else {
        return (
            <Stylediv>
                <div className="dropdownBox">
                    <div className="filter">
                        <p className="dropText">Select genre</p>
                        <select name="genre" onChange={(e) => filterFunction(e)}>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>

                    <div className="filter">
                        <p className="dropText">Select duration</p>
                        <select name="duration" onChange={(e) => filterFunction(e)}>
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>

                    <div className="filter">
                        <p className="dropText">Select mood</p>
                        <select name="mood" onChange={(e) => filterFunction(e)}>
                            <option value="Happy">Happy</option>
                            <option value="Excited">Excited</option>
                            <option value="Relaxed">Relaxed</option>
                            <option value="Adventurous">Adventurous</option>
                        </select>
                    </div>
                    <button className="btn" onClick={fetchData}>Apply filter</button>
                </div>
                <div>

                </div>
                <div className="box1">
                    {movieData.map((item) => {
                        return (
                            <div key={item._id} className="card">
                                <img className="img1" srcSet={item.image} alt="" />
                                <p>Name: {item.title}</p>
                                <p>Duration: {item.duration}</p>
                                <p>Genre: {item.genre}</p>
                                <p>Mood: {item.mood}</p>
                            </div>
                        )
                    })}

                </div>
            </Stylediv>
        )
    }
}