import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Header() {
  return (
    <HeaderStyle>
      <div className="inner">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="4" width="36" height="46" rx="4" fill="#F47B20"/>
                <rect x="4" y="0" width="36" height="46" rx="4" fill="#F47B20"/>
                <rect x="6" y="2" width="32" height="42" rx="3" fill="#fff" opacity="0.15"/>
                <circle cx="22" cy="18" r="10" fill="#fff" opacity="0.9"/>
                <circle cx="19" cy="15" r="1.5" fill="#F47B20"/>
                <circle cx="25" cy="15" r="1.5" fill="#F47B20"/>
                <path d="M17 20 Q22 25 27 20" stroke="#F47B20" stroke-width="1.8" fill="none" stroke-linecap="round"/>
              </svg>
            </div>
            <h1>
              <span className="bold">BOOK</span>STORE
            </h1>
          </Link>
        </div>

        <nav className="category">
          <Link to="/?category=전체">전체</Link>
          <Link to="/?category=동화">동화</Link>
          <Link to="/?category=소설">소설</Link>
          <Link to="/?category=사회">사회</Link>
        </nav>

        <div className="auth">
          <Link to="/login">→ 로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.color.background};

  .inner {
    max-width: ${({ theme }) => theme.layout.width.large};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .logo a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .logo h1 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #555;

    .bold {
      font-weight: 900;
      color: #F47B20;
    }
  }

  .category {
    display: flex;
    gap: 1rem;

    a {
      color: ${({ theme }) => theme.color.text};
      font-weight: bold;
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .auth {
    display: flex;
    gap: 1rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: ${({ theme }) => theme.color.text};
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default Header;