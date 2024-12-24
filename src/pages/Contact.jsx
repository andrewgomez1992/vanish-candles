import React from "react";
import styled from "styled-components";

const ContactWrapper = styled.div`
  padding: 180px 20px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 20px 20px;
    margin-top: 80px;
  }
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ContactTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
`;

const ContactText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;

  a {
    color: #000;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactSection = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.8;
  }
`;

const Contact = () => {
  return (
    <ContactWrapper>
      <ContactContainer>
        <ContactTitle>Contact Us</ContactTitle>
        <ContactText>
          For inquiries about our luxury candles or assistance with your order,
          our team at Vanish Candles is here to help. Reach us at:{" "}
          <a href="mailto:support@vanishcandles.com">
            support@vanishcandles.com
          </a>
        </ContactText>
        <ContactSection>
          <h3>Our Headquarters</h3>
          <p>
            123 Glow Lane <br />
            Charleston, SC 29401
          </p>
        </ContactSection>
        <ContactSection>
          <p>For wholesale inquiries or partnerships, please contact:</p>
          <p>
            <a href="mailto:wholesale@vanishcandles.com">
              wholesale@vanishcandles.com
            </a>
            <br />
            843-555-1234
          </p>
        </ContactSection>
        <ContactSection>
          <p>
            Follow us on social media for the latest updates, exclusive offers,
            and candle care tips.
          </p>
        </ContactSection>
      </ContactContainer>
    </ContactWrapper>
  );
};

export default Contact;
