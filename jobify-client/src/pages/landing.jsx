import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import UserService from "../services/user";

const Landing = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await UserService.getCurrentUser();
        const { user } = res.data;
        setUser(user);
      } catch (error) {}
    };
    getUser();
  }, []);

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <main>
          <nav>
            <Logo />
          </nav>
          <div className="container page">
            <div className="info">
              <h1>
                job <span>tracking</span> app
              </h1>
            </div>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
            <img src={main} alt="job hunt" className="img main-img" />
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default Landing;
