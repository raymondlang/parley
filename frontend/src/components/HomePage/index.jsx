import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar";
import "./HomePage.css";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser)
    return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;
  return (
    <>
      <NavBar />
      <section className="billboard">
        <header className="home-header">
          <h1>Made for minions.</h1>
          <h1 className="yellow-text">Built for papoi.</h1>
          <p>
            Connect the right minions, find anything you need and automate{" "}
            <br></br>the rest. That's work in Parley, your banana platform.
          </p>
          <br></br>
          <p>
            <strong>Parley is free to try</strong> for as long as you'd like
          </p>
        </header>
      </section>
      <section id="home-info">
        <div className="grid-row">
          <div className="video"></div>
          <div className="grid-text left">
            <h2>Bring your team together</h2>
            <p>
              Gru's Parley has channels: fun places for all minions and
              everything needed for work. In channels, connecting with other
              minions from different departments, offices, time zones, and even
              other companies is easier!
            </p>
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-text right">
            <h2>Choose how you want to work</h2>
            <p>
              In Parley, you’ve got all the flexibility to work when, where and
              how it’s best for you. You can easily chat, send audio and video
              clips, or hop on a huddle to talk things out live.
            </p>
          </div>
          <div className="video"></div>
        </div>

        <div className="grid-row">
          <div className="video"></div>
          <div className="grid-text left">
            <h2>Move faster with your tools in one place</h2>
            <p>
              With your other work apps connected to Parley, you can work faster
              by switching tabs less. And with powerful tools like Workflow
              Builder, you can automate away routine tasks.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
