'use client';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => { changePassword(''); }, []);

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: 'administrateur@email.com',
        password: '',
        gps: '',
        typeCulture: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('Le prénom est requis'),
        lastname: Yup.string().max(255).required('Le nom est requis'),
        email: Yup.string().email('Doit être un e-mail valide').required('L\'e-mail est requis'),
        gps: Yup.string().required('Localisation requise'),
        typeCulture: Yup.string().required('Type de culture requis'),
        password: Yup.string().required('Le mot de passe est requis').max(10)
      })}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <form noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Prénom*</InputLabel>
                <OutlinedInput value={values.firstname} name="firstname" onBlur={handleBlur} onChange={handleChange} fullWidth placeholder="Prénom" />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Nom*</InputLabel>
                <OutlinedInput value={values.lastname} name="lastname" onBlur={handleBlur} onChange={handleChange} fullWidth placeholder="Nom" />
              </Stack>
            </Grid>
            
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Adresse e-mail*</InputLabel>
                <OutlinedInput value={values.email} name="email" onBlur={handleBlur} onChange={handleChange} fullWidth />
              </Stack>
            </Grid>

            {/* الحقول الجديدة */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Localisation GPS*</InputLabel>
                <OutlinedInput value={values.gps} name="gps" onBlur={handleBlur} onChange={handleChange} fullWidth placeholder="Ex: 31.6295, -7.9811" />
              </Stack>
            </Grid>

            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Type de Culture*</InputLabel>
                <Select value={values.typeCulture} name="typeCulture" onBlur={handleBlur} onChange={handleChange} fullWidth>
                  <MenuItem value="cereales">Céréales</MenuItem>
                  <MenuItem value="legumes">Légumes</MenuItem>
                  <MenuItem value="fruits">Fruits</MenuItem>
                </Select>
              </Stack>
            </Grid>

            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Mot de passe</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => { handleChange(e); changePassword(e.target.value); }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" color="secondary">
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />
              </Stack>
            </Grid>

           <Grid size={12}>
              <AnimateButton>
                <Button type="submit" fullWidth size="large" variant="contained" color="primary">
                  Créer Un Compte
                </Button>
              </AnimateButton>
            </Grid>
          </Grid> 
        </form>
      )}
    </Formik>
  );
}