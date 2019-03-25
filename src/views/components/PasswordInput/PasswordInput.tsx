import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import style from './PasswordInput.scss';

interface PasswordInputProps {
  value?: string;
  error?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  error = false,
  className = '',
  onChange,
  onBlur,
  label = 'Password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(event.target.value);
  };

  return (
    <FormControl variant='outlined' fullWidth error={error}>
      <InputLabel htmlFor='password-input'>{label}</InputLabel>
      <OutlinedInput
        id='password-input'
        type={showPassword ? 'text' : 'password'}
        label={label}
        value={value}
        error={error}
        className={className}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={handleTogglePasswordVisibility} edge='end' aria-label='toggle password visibility'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </FormControl>
  );
};

export default PasswordInput;
