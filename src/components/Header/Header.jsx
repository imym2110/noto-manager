import React from "react";
import s from "./style.module.css";
import logoSrc from "../../assets/images/logo.png";
import { Logo } from "components/logo";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth/auth-selector";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";

export default function Header(props) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const disatch = useDispatch();
  const signout = () => {
    AuthAPI.signout();
    disatch(setUser(null));
  };
  const renderAuthProfile = () => {
    return (
      <div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
          alt="icon"
          style={{ width: 40 }}
          className="rounded-circle"
        />
        <div>Hello , {user.email}</div>
        <Link to="#" onClick={signout}>
          Signout
        </Link>
      </div>
    );
  };
  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          image={logoSrc}
          title="Notomatic"
          subtitle="Manage your notes"
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end">{renderAuthProfile()}</div>
    </div>
  );
}
