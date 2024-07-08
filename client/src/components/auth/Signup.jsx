import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Link, Grid, Paper, TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import logoImg from '../../assest/logo_main.png';
import backgroundImage from '../../assest/login-bg.jpg';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    c_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required!'),
    t_and_c: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Please Check Term & Condition!'),
});

const Signup = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:3004/api/userSignup', {
                Email: values.email,
                Password: values.password,
                Comfirm_Password: values.c_password,
                T_and_C: values.t_and_c,
            });
            if (response.data.status) {
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <RootContainer id='signup-page'>
            <div className="overlay"></div>
            <FormContainer elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={isSmallScreen ? 12 : 6}>
                        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                            <Box
                                component="img"
                                sx={{ height: '4.625rem', mb: 2 }}
                                alt='Doct App Logo'
                                src={logoImg}
                            />
                            <Typography component="h1" variant="h5" sx={{ textAlign: 'left' }}>
                                Sign-Up
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    c_password: '',
                                    t_and_c: false,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
                                    <Form>
                                        <CustomTextField
                                            as={TextField}
                                            margin="normal"
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
                                        <CustomTextField
                                            as={TextField}
                                            margin="normal"
                                            fullWidth
                                            name="c_password"
                                            label="Confirm Password"
                                            type="password"
                                            id="c_password"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.c_password}
                                            error={touched.c_password && Boolean(errors.c_password)}
                                            helperText={touched.c_password && errors.c_password}
                                        />
                                        <FormControlLabel
                                            control={<Field as={Checkbox} name="t_and_c" checked={values.t_and_c} onChange={handleChange} />}
                                            label={
                                                <Typography variant="body2" color="text.secondary" align="center">
                                                    By continuing, you&apos;re confirming that you&apos;ve read our
                                                    <Link variant="body2" underline="hover"> Terms & Conditions</Link>
                                                </Typography>
                                            }
                                            sx={{ my: 1 }}
                                        />
                                        <ErrorMessage name="t_and_c">
                                            {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                                        </ErrorMessage>
                                        {error && <Typography color="error">{error}</Typography>}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <CircularProgress size={24} /> : 'Sign-up'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Link onClick={() => navigate('/login')} variant="body2" underline="hover" style={{ float: 'right', marginInlineEnd: '30px' }}>
                                Already Signed-Up? Login
                            </Link>
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

export default Signup;
