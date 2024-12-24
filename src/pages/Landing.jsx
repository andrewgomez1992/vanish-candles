import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Shop from "./Shop";

const LandingPageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Landing = () => {
  return (
    <LandingPageWrapper>
      <Navbar />
      <Hero />
      <Shop />
    </LandingPageWrapper>
  );
};

export default Landing;
