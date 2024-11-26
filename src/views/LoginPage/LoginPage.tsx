import { useState, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from '../../constants/regexConstant';
import { authProvider } from '../../services/authService';
import loadingService from '../../services/loadingService';
import style from './LoginPage.module.scss';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required('Email Address is required').matches(emailRegex, 'Invalid Email Address format'),
  password: yup.string().required('Password is required'),
});

function LoginPage(): ReactElement {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form submitted:', data);
    toast.error('Login error');
    toast.success('Login success');
    try {
      loadingService.showLoading();
      // await authProvider.signin(data.email);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }

    loadingService.showLoading();
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={style.wrap}>
        <h1>Wellcom to RC DIAGS</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder='Email Address'
                />
              )}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
          </div>

          <div>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input value={field.value} onBlur={field.onBlur} onChange={field.onChange} placeholder='Password' />
              )}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
          </div>
          <div>
            <Link to='/forgot-password' className={style.link}>
              Forgot password
            </Link>
          </div>
          <button type='submit'>Sign in</button>
          <div>
            <Link to='/change-password' className={style.link}>
              Goto page change password for firsttime login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
