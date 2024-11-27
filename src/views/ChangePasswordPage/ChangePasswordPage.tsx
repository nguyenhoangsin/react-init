import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { authProvider } from '../../services/authService';
import loadingService from '../../services/loadingService';
import style from './ChangePasswordPage.module.scss';

type FormData = {
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
  confirmNewPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

function ChangePasswordPage(): ReactElement {
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
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className={style.wrap}>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name='newPassword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input value={field.value} onBlur={field.onBlur} onChange={field.onChange} placeholder='New Password' />
              )}
            />
            {errors.newPassword && <div style={{ color: 'red' }}>{errors.newPassword.message}</div>}
          </div>

          <div>
            <Controller
              name='confirmNewPassword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder='Confirm New Password'
                />
              )}
            />
            {errors.confirmNewPassword && <div style={{ color: 'red' }}>{errors.confirmNewPassword.message}</div>}
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </>
  );
}

export default ChangePasswordPage;
