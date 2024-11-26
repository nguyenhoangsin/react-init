import { useState, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { emailRegex } from "../../constants/regexConstant";
import { authProvider } from "../../services/authService";
import loadingService from "../../services/loadingService";
import style from "./ForgotPasswordPage.module.scss";

type FormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email Address is required")
    .matches(emailRegex, "Invalid Email Address format"),
});

function ForgotPasswordPage(): ReactElement {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted:", data);
    try {
      loadingService.showLoading();
      await authProvider.signin(data.email);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }

    loadingService.showLoading();
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className={style.wrap}>
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Email Address"
                  />
                )}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}
            </div>
            <button type="submit">Send</button>
            <div>
              <Link to="/login" className={style.link}>Back on Login</Link>
            </div>
          </form>
        </div>
    </>
  );
}

export default ForgotPasswordPage;
