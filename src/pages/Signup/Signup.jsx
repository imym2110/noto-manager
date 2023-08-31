import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import { AuthAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "services/sweet-alert";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const submit = async (e) => {
    if (password === repeatPassword) {
      e.preventDefault();
      try {
        const user = await AuthAPI.signup(email, password);
        console.log(user, "jniu");
        dispatch(setUser(user));
        await toast("success", "Signup Successfull");
        navigate("/");
      } catch (err) {
        toast("error", err.message);
      }
    } else {
      toast("error", "Passwords don't match");
    }
  };
  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signup <br />
        to access your team notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="password"
          onTextChange={setPassword}
        />
        <Input
          placeholder={"Password (repeat)"}
          type="password"
          onTextChange={setRepeatPassword}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign up!
        </ButtonPrimary>
        <span>
          Already have an account ? <Link to={"/signin"}>Signin</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
