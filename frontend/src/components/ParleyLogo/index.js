import SlackLogo from "../../images/slack_logo.svg";
import "./ParleyLogo.css";

const ParleyLogo = () => {
  return (
    <div className="logo-container">
      <img src={SlackLogo} className="logo-img" />
      <h1 className="logo-text">Parley</h1>
    </div>
  );
};

export default ParleyLogo;
