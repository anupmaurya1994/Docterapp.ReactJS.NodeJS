import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Paper, TextField, Button, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import logoImg from '../../assest/logo_main.png';
import backgroundImage from '../../assest/login-bg.jpg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import './User_Activation.scss';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
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
    email: Yup.string().email('Invalid email address').required('Login Email is Required'),
    designation: Yup.string().required('Required'),
    phoneValue: Yup.string().required('Phone is Required'),
    otpValue: Yup.string().when('otpSent', {
        is: true,
        then: Yup.string().required('Required')
    }),
});

const UserAct = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [otpSent, setOtpSent] = useState(false);
    const [resend, setResend] = useState(false);

    const navigateHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const handleSendOtp = async (phoneValue, email, setFieldError) => {
        try {
            const loggedInCookie = Cookies.get('loggedIn');
            if (!loggedInCookie) {
                alert('User not logged in')
                throw new Error('User not logged in');
            }
            
            const loggedInData = JSON.parse(loggedInCookie);
            const loggedInEmail = loggedInData.email;
            
            if (email !== loggedInEmail) {
                alert('Provided email does not match loggedIn email')
                throw new Error('Provided email does not match loggedIn email');
            }
            
            const response = await axios.post('http://localhost:3004/api/sendotp', { phoneNo: phoneValue, email });
            if (response.status === 200) {
                setOtpSent(true);
                alert(`OTP successfully sent: ${response.data.message}`);
                setTimeout(() => setResend(true), 4000);
            }
        } catch (error) {
            console.error('Error sending OTP', error);
            if (error.message === 'User not logged in' || error.message === 'Provided email does not match loggedIn email') {
                console.log(error.message);
                setFieldError('email', error.message);
            } else {
                setFieldError('phoneValue', 'Failed to send OTP'); 
            }
        }
    };

    const handleVerifyOtp = async (values, setFieldError) => {
        try {
            const response = await axios.post('http://localhost:3004/api/verifyotp', {
                phoneNo: values.phoneValue,
                otp: values.otpValue,
                email: values.email,
                designation: values.designation,
            });
            if (response.status === 200) {
                navigateHome();
                Cookies.set("ActiveDoct", JSON.stringify(values));
            }
        } catch (error) {
            console.error('Error verifying OTP', error);
            setFieldError('otpValue', 'Failed to verify OTP');
        }
    };

    return (
        <RootContainer id='user-act-page'>
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
                                User Activation
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: '',
                                    designation: 'OPD',
                                    phoneValue: '',
                                    otpValue: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting, setFieldError }) => {
                                    if (otpSent) {
                                        handleVerifyOtp(values, setFieldError);
                                    } else {
                                        handleSendOtp(values.phoneValue, values.email, setFieldError);
                                    }
                                    setSubmitting(false);
                                }}
                            >
                              {({ isSubmitting, handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
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
                                        
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="designation-select-label">Doctor's Designation</InputLabel>
                                            <CustomSelect
                                                labelId="designation-select-label"
                                                id="designation-select"
                                                name="designation"
                                                value={values.designation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Doctor's Designation"
                                                error={touched.designation && Boolean(errors.designation)}
                                            >
                                                <MenuItem value="OPD">OPD</MenuItem>
                                                <MenuItem value="Cardiologists">Cardiologists</MenuItem>
                                                <MenuItem value="Audiologist">Audiologist</MenuItem>
                                                <MenuItem value="Dentist">Dentist</MenuItem>
                                                <MenuItem value="Gynecologist">Gynecologist</MenuItem>
                                                <MenuItem value="Orthopedic Surgeon">Orthopedic Surgeon</MenuItem>
                                                <MenuItem value="Pediatrician">Pediatrician</MenuItem>
                                                <MenuItem value="Radiologist">Radiologist</MenuItem>
                                                <MenuItem value="Neurologists">Neurologists</MenuItem>
                                                <MenuItem value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</MenuItem>
                                                <MenuItem value="ENT Specialist">ENT Specialist</MenuItem>
                                                <MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
                                                <MenuItem value="Veterinarian">Veterinarian</MenuItem>
                                                <MenuItem value="Pulmonologist">Pulmonologist</MenuItem>
                                                <MenuItem value="Endocrinologist">Endocrinologist</MenuItem>
                                                <MenuItem value="Oncologists">Oncologists</MenuItem>
                                                <MenuItem value="Other">OTHER</MenuItem>
                                            </CustomSelect>
                                            {touched.designation && errors.designation && (
                                                <Typography color="error" variant="body2">{errors.designation}</Typography>
                                            )}
                                        </FormControl>
                                        <PhoneInput
                                            country={'us'}
                                            value={values.phoneValue}
                                            onChange={(phoneValue) => setFieldValue('phoneValue', phoneValue)}
                                            inputProps={{
                                                name: 'phone_no',
                                                required: true,
                                            }}
                                            className="phoneInput"
                                            containerStyle={{ marginBlock: '18px' , borderColor: "#c4c4c4"}}
                                            inputStyle={{ width: '100%' }}
                                        />
                                        {touched.phoneValue && errors.phoneValue && (
                                            <Typography color="error" variant="body2">{errors.phoneValue}</Typography>
                                        )}
                                        {otpSent ? (
                                            <CustomTextField
                                                as={TextField}
                                                margin="normal"
                                                fullWidth
                                                id="otp"
                                                label="OTP"
                                                name="otpValue"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.otpValue}
                                                error={touched.otpValue && Boolean(errors.otpValue)}
                                                helperText={touched.otpValue && errors.otpValue}
                                            />
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 5, mb: 2, float: 'right' }}
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={() => handleSendOtp(values.phoneValue, values.email, () => { })}
                                            >
                                                Get OTP
                                            </Button>
                                        )}
                                        {otpSent && (
                                            <div className='d-flex justify-content-end '>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ mt: 2, mb: 2, marginInlineEnd: "2px" }}
                                                    endIcon={<CheckCircleOutlineIcon />}
                                                    disabled={isSubmitting}
                                                >
                                                    Verify OTP
                                                </Button>
                                                {resend && (
                                                    <Button
                                                        type="button"
                                                        variant="outlined"
                                                        color="primary"
                                                        sx={{ mt: 2, mb: 2 }}
                                                        endIcon={<ReplayIcon />}
                                                        onClick={() => handleSendOtp(values.phoneValue, values.email, () => { })}
                                                    >
                                                        Resend OTP
                                                    </Button>
                                                )}
                                            </div>
                                        )}
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

export default UserAct;
