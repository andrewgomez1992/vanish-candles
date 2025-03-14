import styled from "styled-components";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Shop from "../components/Shop";
import Testimonials from "../components/Testimonials";
import OurPromise from "../components/OurPromise";

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
      <Testimonials />
      <OurPromise />
    </LandingPageWrapper>
  );
};

export default Landing;
