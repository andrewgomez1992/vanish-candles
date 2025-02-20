import "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;

  h4 {
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #fff;
    font-size: 1.2rem;

    &:hover {
      color: #ccc;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  border-top: 1px solid #333;
  padding-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      {/* Legal Information Section */}
      <FooterSection>
        <h4>Legal Information</h4>
        <ul>
          <li>
            <a href="/terms">Terms of Service</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/shipping">Shipping Policy</a>
          </li>
          <li>
            <a href="/refund">Refund Policy</a>
          </li>
          <li>
            <a href="/candle-care">Candle Care & Safety</a>
          </li>
        </ul>
      </FooterSection>

      {/* Connect With Us Section */}
      <FooterSection>
        <h4>Connect With Us</h4>
        <p>Follow us on social media for the latest updates and offers:</p>
        <SocialIcons>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> {/* FontAwesome Icon */}
          </a>
        </SocialIcons>
      </FooterSection>

      {/* Navigation Section */}
      <FooterSection>
        <h4>Quick Links</h4>
        <ul>
          <li>
            <a href="/shop">Shop Collections</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
        </ul>
      </FooterSection>

      {/* Bottom Section */}
      <FooterBottom>
        © {new Date().getFullYear()} Vanish Candles Co. | All Rights Reserved
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
