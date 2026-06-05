'use client';
import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import LocationPicker from 'components/LocationPicker'; // تم إضافة الـ Import

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
        location: '',
        culture: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('Le prénom est requis'),
        lastname: Yup.string().max(255).required('Le nom est requis'),
        email: Yup.string().email('Doit être un e-mail valide').max(255).required('L\'e-mail est requis'),
        location: Yup.string().required('La localisation est requise'),
        culture: Yup.string().required('Le type de culture est requis'),
        password: Yup.string().required('Le mot de passe est requis').max(10)
      })}
    >
      {({ errors, handleBlur, handleChange, touched, values, setFieldValue }) => (
        <form noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Prénom*</InputLabel>
                <OutlinedInput name="firstname" value={values.firstname} onBlur={handleBlur} onChange={handleChange} fullWidth error={Boolean(touched.firstname && errors.firstname)} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Nom*</InputLabel>
                <OutlinedInput name="lastname" value={values.lastname} onBlur={handleBlur} onChange={handleChange} fullWidth error={Boolean(touched.lastname && errors.lastname)} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Adresse e-mail*</InputLabel>
                <OutlinedInput name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} fullWidth error={Boolean(touched.email && errors.email)} />
              </Stack>
            </Grid>

            {/* هنا قمنا بدمج الخريطة */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Localisation GPS*</InputLabel>
                <LocationPicker onSelect={(pos) => setFieldValue('location', `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`)} />
                <OutlinedInput name="location" value={values.location} readOnly placeholder="Sélectionnez sur la carte..." fullWidth error={Boolean(touched.location && errors.location)} />
              </Stack>
            </Grid>

            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Type de Culture*</InputLabel>
                <FormControl fullWidth error={Boolean(touched.culture && errors.culture)}>
                  <Select name="culture" value={values.culture} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>Sélectionnez le type</MenuItem>
                    <MenuItem value="agricole">Agricole</MenuItem>
                    <MenuItem value="domestique">Domestique</MenuItem>
                    <MenuItem value="industriel">Industriel</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Mot de passe</InputLabel>
                <OutlinedInput name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={(e) => { handleChange(e); changePassword(e.target.value); }} endAdornment={<InputAdornment position="end"><IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end"><EyeOutlined /></IconButton></InputAdornment>} fullWidth />
              </Stack>
            </Grid>
            
            <Grid size={12}>
              <AnimateButton>
                <Button fullWidth size="large" variant="contained" type="submit">Créer un compte</Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}