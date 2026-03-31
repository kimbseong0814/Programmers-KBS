import { styled } from "styled-components";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <FooterStyle>
      <div className="inner">
        <div className="logo">
          <svg width="30" height="38" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="4" width="36" height="46" rx="4" fill="#F47B20"/>
            <rect x="4" y="0" width="36" height="46" rx="4" fill="#F47B20"/>
            <rect x="6" y="2" width="32" height="42" rx="3" fill="#fff" opacity="0.15"/>
            <circle cx="22" cy="18" r="10" fill="#fff" opacity="0.9"/>
            <circle cx="19" cy="15" r="1.5" fill="#F47B20"/>
            <circle cx="25" cy="15" r="1.5" fill="#F47B20"/>
            <path d="M17 20 Q22 25 27 20" stroke="#F47B20" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          </svg>
          <Link to="/">
            <h1><span className="bold">BOOK</span>STORE</h1>
          </Link>
        </div>
        <p className="copyright">copyright(c), 2024, Book Store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  background-color: ${({ theme }) => theme.color.background};
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .inner {
    max-width: ${({ theme }) => theme.layout.width.large};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      text-decoration: none;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: 400;
      color: #555;

      .bold {
        font-weight: 900;
        color: #F47B20;
      }
    }
  }

  .copyright {
    color: ${({ theme }) => theme.color.text};
    font-size: 0.875rem;
  }
`;

export default Footer;