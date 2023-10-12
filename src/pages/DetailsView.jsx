import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import Switch from "../components/Switch";
import MovieCast from "../templates/MovieCast";
import MovieDescription from "../templates/MovieDescription";
import MovieInfo from "../templates/MovieInfo";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 2;
  height: 232px;
  background-color: ${(props) => (props.darkmode ? "#000" : "#fff")};
  color: ${(props) => (props.darkmode ? "#fff" : "#000")};
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledMain = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${(props) => (props.darkmode ? "#000" : "#fff")};
  color: ${(props) => (props.darkmode ? "#fff" : "#000")};
`;

const DetailsView = () => {
  const DetailData = useLoaderData();
  const [darkmode, setDarkMode] = useState(false); // Initialize dark mode as false

  const handleDarkModeToggle = () => {
    // Toggle dark mode when the switch is flipped
    setDarkMode(!darkmode);
  };

  console.log("DetailsData: ", DetailData);

  return (
    <>
      <StyledHeader darkmode={darkmode}>
        <StyledIframe
          src={`https://www.youtube-nocookie.com/embed/${DetailData.details.videos.results[0].key}`}
          title="YouTube video player"
          allowFullScreen
        ></StyledIframe>
        <StyledLink to="/">
          <FaArrowLeft />
        </StyledLink>
        <Switch
          justify="end"
          align="top"
          darkmode={darkmode}
          onToggle={handleDarkModeToggle}
        />
      </StyledHeader>
      <StyledMain darkmode={darkmode}>
        <MovieInfo data={DetailData.details} />
        <MovieDescription data={DetailData.details} />
        <MovieCast data={DetailData.cast} />
      </StyledMain>
    </>
  );
};


export const DetailsViewData = async ({ params }) => {
  return Promise.allSettled([
    axios(
      `http://api.themoviedb.org/3/movie/${params.id}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&append_to_response=videos`
    ),
    axios(
      `http://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`,
      axios(
        `http://api.themoviedb.org/3/movie/${params.id}/genres?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      ),
    ),
  ]).then((data) => {
    return {
      details: data[0].value.data,
      cast: data[1].value.data,
    };
  });
};

export default DetailsView;
