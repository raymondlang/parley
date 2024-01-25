import { Link } from "react-router-dom";
import ParleyLogo from "../ParleyLogo";
import "./SessionHeader.css";

const SessionHeader = ({ type }) => {
  const title =
    type === "login" ? "Sign in to Parley" : "First, enter your credentials";

  const rightHeader = () => {
    if (type === "login") {
      return (
        <>
          <p id="signup-redirect-text">New to Slaque?</p>
          <Link to="/get-started/createnew" id="signup-redirect-link">
            Create an account
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <header className="session-header">
        <div className="left-col"></div>
        <div className="center-col">
          <ParleyLogo isColorful={true} />
          <div className="right-col">{rightHeader()}</div>
          <h1 className="logo-text">Parley</h1>
        </div>
        <div className="right-col"></div>
      </header>
      <h1 className="session-title">{title}</h1>
      <p className="suggest">
        We suggest using the <strong>email address you use at work.</strong>
      </p>
    </>
  );
};

export default SessionHeader;
