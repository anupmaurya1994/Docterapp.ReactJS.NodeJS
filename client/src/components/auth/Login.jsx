import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Link, MenuItem, Select, InputLabel, FormControl, Grid, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import logoImg from '../../assest/logo_main.png'
import backgroundImage from '../../assest/login-bg.jpg'
import './Login.scss'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from "js-cookie";


const RootContainer = styled('div')({
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
});

const FormContainer = styled(Paper)({
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'relative',
    zIndex: 1,
});

const CustomSelect = styled(Select)(({ theme }) => ({
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#c4c4c4', 
    },
  }));

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#c4c4c4', 
      },
    },
  }));

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email address is Required!'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required!'),
    language: Yup.string().required('Please Select Your Language'),
});

const LoginPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:3004/api/userLogin', values);
            if (response.data.message === 'Login successful') {
                navigate('/');
                Cookies.set("loggedIn", JSON.stringify(values));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    const navigateUserActivation = () => {
        navigate('/useractivation')
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <RootContainer id='login-page'>
            <div className="overlay"></div>
            <FormContainer elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={isSmallScreen ? 12 : 6}>
                        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                            <Box
                                component="img"
                                sx={{ height: '4.625rem', mb: 2 }}
                                alt="Gujarat Nursing Council Logo"
                                src={logoImg}
                            />
                            <Typography component="h1" variant="h5" sx={{ textAlign: 'left' }}>
                                Login
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    language: 'ENGLISH',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
                                    <Form>
                                        <CustomTextField
                                            as={TextField}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        <CustomTextField
                                            as={TextField}
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="language-select-label">Language</InputLabel>
                                            <CustomSelect
                                                as={Select}
                                                labelId="language-select-label"
                                                id="language-select"
                                                name="language"
                                                value={values.language}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Language"
                                                error={touched.language && Boolean(errors.language)}
                                            >
                                                <MenuItem value="ENGLISH">ENGLISH</MenuItem>
                                                <MenuItem value="GUJARATI">SPANISH</MenuItem>
                                                <MenuItem value="GUJARATI">FRENCH</MenuItem>
                                            </CustomSelect>
                                            <ErrorMessage name="language">
                                                {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                                            </ErrorMessage>
                                        </FormControl>
                                        {error && <Typography color="error">{error}</Typography>}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                                        </Button>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link href="#" variant="body2" underline="hover">
                                                Forgot password?
                                            </Link>
                                            <Link variant="body2" onClick={navigateUserActivation} underline="hover">
                                                User Login Activation
                                            </Link>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Container>
                    </Grid>
                    {!isSmallScreen && (
                        <Grid item xs={6}>
                            <h1 className='title'></h1>
                        </Grid>
                    )}
                </Grid>
            </FormContainer>
        </RootContainer>
    );
};

export default LoginPage;
