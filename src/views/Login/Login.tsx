import { useState, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { authProvider } from '../../services/authService';
// import style from './Login.module.scss';

type FormValues = {
  name: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
});

function Login(): ReactElement {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Form submitted:', data);
    setIsLoggingIn(true);
    try {
      await authProvider.signin(data.email);
      navigate(from || '/');
    } catch (error) {
      console.log(error);
    }
    setIsLoggingIn(false);
  };

  const onNameChange = (value: string) => {
    setValue('name', value, { shouldDirty: true });
    trigger('name');
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Name: </label>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                value={field.value}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder='Enter your name'
              />
            )}
          />
          {errors.name && (
            <div style={{ color: 'red' }}>{errors.name.message}</div>
          )}
        </div>

        <div>
          <label htmlFor='email' className='form-label'>
            Email:{' '}
          </label>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter your email'
              />
            )}
          />
          {errors.email && (
            <div style={{ color: 'red' }}>{errors.email.message}</div>
          )}
        </div>

        <button type='submit' disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
}

export default Login;
