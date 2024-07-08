import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Paper, Grid, Switch, FormControlLabel, Typography, Slider, CardMedia, CardContent, Card, MenuItem, FormControl, AccordionDetails, AccordionSummary, Accordion, Select, Chip, Stack, CircularProgress, Container, useMediaQuery, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import './Dashboard.scss';
import try1 from '../../assest/try1.jpg';
import try2 from '../../assest/try2.jpg';
import try3 from '../../assest/try3.jpg';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const cardData = [
    { id: 1, images: [try1, try2, try3], title: 'Hospital-1', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Dermatologist', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 2, images: [try2, try3, try1], title: 'Hospital-2', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Cardiologist', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 3, images: [try3, try1, try2], title: 'Hospital-3', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Physicians', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 4, images: [try1, try2, try3], title: 'Hospital-4', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Neurologist', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 5, images: [try2, try3, try1], title: 'Hospital-5', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Gastroenterologist', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 6, images: [try3, try1, try2], title: 'Hospital-6', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Gynecologists', location: '123, ABC Park, New Road, Near Advance City, Surat' },
    { id: 7, images: [try1, try2, try3], title: 'Hospital-7', description: "The bustling hospital stands as a beacon of healing in the heart of the City, its modern architecture blending seamlessly with compassionate care. From the moment one enters, a sense of comfort permeates the air, soothing anxieties with warmth and professionalism. Bright corridors lead to state-of-the-art wards equipped with cutting-edge technology, where skilled medical teams work tirelessly to restore health. Every corner exudes efficiency and empathy, from the serene waiting areas to the bustling emergency department. Here, a diverse array of specialists collaborate, ensuring comprehensive treatment tailored to each patient's needs. In this haven of healing, hope thrives amidst challenges.", titleNew: 'Oncologist', location: '123, ABC Park, New Road, Near Advance City, Surat' },
];


export default function Dashboard() {

    const navigate = useNavigate();
    const [valueFees, setValueFees] = React.useState([0, 100]);
    const [rangeStart, setRangeStart] = React.useState('');
    const [rangeEnd, setRangeEnd] = React.useState('');
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const initialVariants = ['outlined', 'outlined', 'outlined', 'outlined'];
    const [variants, setVariants] = React.useState(initialVariants);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setIsLoading] = React.useState(true);

    const [doctorType, setDoctorType] = React.useState([
        { label: 'Dermatologist', isChecked: false },
        { label: 'Cardiologist', isChecked: false },
        { label: 'Physicians', isChecked: false },
        { label: 'Pediatrician', isChecked: false },
        { label: 'Neurologist', isChecked: false },
        { label: 'Gastroenterologist', isChecked: false },
        { label: 'Gynecologists', isChecked: false },
        { label: 'Oncologist', isChecked: false },
        { label: 'Endocrinologist', isChecked: false }
    ]);

    const [availableBed, setAvailableBed] = React.useState([
        { label: '3+', isChecked: false },
        { label: '5+', isChecked: false },
        { label: '10+', isChecked: false },
        { label: '25+', isChecked: false },
        { label: '50+', isChecked: false },
        { label: '75+', isChecked: false },
        { label: '100+', isChecked: false },
    ]);

    const [statusFilter, setStatusFilter] = React.useState([
        { label: 'Full Occupied', isChecked: false },
        { label: 'Most Occupied', isChecked: false },
        { label: 'Available', isChecked: false },
        { label: 'Empty', isChecked: false },
    ]);

    const [hospitalTypes, setHospitalTypes] = React.useState([
        { label: 'Specialty Hospitals', isChecked: false },
        { label: 'General Medical', isChecked: false },
        { label: 'Clinics', isChecked: false },
        { label: 'Psychiatric Hospitals', isChecked: false },
        { label: 'Trauma Center', isChecked: false },
        { label: 'Multispeciality Hospital', isChecked: false },
        { label: 'Surgical Hospitals', isChecked: false },
    ]);

    const [hospitalFacilities, setHospitalFacilities] = React.useState([
        { label: 'Emergency room', isChecked: false },
        { label: 'X-ray/radiology', isChecked: false },
        { label: 'Operating rooms', isChecked: false },
        { label: 'Outpatient department(OPD)', isChecked: false },
    ]);

    const [govSchemeApv, setGovSchemeApv] = React.useState([
        { label: 'Ayushman Bharat Yojana', isChecked: false },
        { label: 'Amrutam Senior Citizen Yojana', isChecked: false },
        { label: 'Swasthya Bima Yojana', isChecked: false },
    ]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cardData[currentImageIndex].images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [currentImageIndex]);


    const handleCardClick = (cardId) => {
        console.log("Clicked on card with ID:", cardId);
        navigate(`/card/${cardId}`);
    };

    const handleClickDoctorType = (index) => {
        const updatedDoctorType = [...doctorType];
        updatedDoctorType[index].isChecked = !updatedDoctorType[index].isChecked;
        setDoctorType(updatedDoctorType);
    };

    const handleClearDoctorType = () => {
        const clearedDoctorType = doctorType.map(doctorType => ({ ...doctorType, isChecked: false }));
        setDoctorType(clearedDoctorType);
    };

    const handleClickHosType = (index) => {
        const updatedHosType = [...hospitalTypes];
        updatedHosType[index].isChecked = !updatedHosType[index].isChecked;
        setHospitalTypes(updatedHosType);
    };

    const handleClearHosType = () => {
        const clearedHosType = hospitalTypes.map(hospitalTypes => ({ ...hospitalTypes, isChecked: false }));
        setHospitalTypes(clearedHosType);
    };

    const handleClickHosFacType = (index) => {
        const updatedHosFacType = [...hospitalFacilities];
        updatedHosFacType[index].isChecked = !updatedHosFacType[index].isChecked;
        setHospitalFacilities(updatedHosFacType);
    };

    const handleClearHosFacType = () => {
        const clearedHosFacType = hospitalFacilities.map(hospitalFacilities => ({ ...hospitalFacilities, isChecked: false }));
        setHospitalFacilities(clearedHosFacType);
    };

    const handleClickAVLBed = (index) => {
        const updatedAVLBed = [...availableBed];
        updatedAVLBed[index].isChecked = !updatedAVLBed[index].isChecked;
        setAvailableBed(updatedAVLBed);
    };

    const handleClearAVLBed = () => {
        const clearedAVLBed = availableBed.map(availableBed => ({ ...availableBed, isChecked: false }));
        setAvailableBed(clearedAVLBed);
    };

    const handleClickStatus = (index) => {
        const updatedStatus = [...statusFilter];
        updatedStatus[index].isChecked = !updatedStatus[index].isChecked;
        setStatusFilter(updatedStatus);
    };

    const handleClearStatus = () => {
        const clearedStatus = statusFilter.map(statusFilter => ({ ...statusFilter, isChecked: false }));
        setStatusFilter(clearedStatus);
    };

    const handleClickScheme = (index) => {
        const updatedScheme = [...govSchemeApv];
        updatedScheme[index].isChecked = !updatedScheme[index].isChecked;
        setGovSchemeApv(updatedScheme);
    };

    const handleClearScheme = () => {
        const clearedScheme = govSchemeApv.map(govSchemeApv => ({ ...govSchemeApv, isChecked: false }));
        setGovSchemeApv(clearedScheme);
    };

    const handleChangeStart = (event) => {
        setRangeStart(event.target.value);
    };
    const handleChangeEnd = (event) => {
        setRangeEnd(event.target.value);
    };

    const handleChangeFees = (event, NewValue) => {
        setValueFees(NewValue);
    };

    function valuetext(valueFees) {
        return `${valueFees}`;
    }

    const handleChipClose1 = (index) => {
        const updated = [...doctorType];
        updated[index].isChecked = false;
        setDoctorType(updated);
    };

    const handleChipClose2 = (index) => {
        const updated = [...govSchemeApv];
        updated[index].isChecked = false;
        setGovSchemeApv(updated);
    };

    const handleChipClose3 = (index) => {
        const updated = [...hospitalFacilities];
        updated[index].isChecked = false;
        setHospitalFacilities(updated);
    };

    const handleChipClose4 = (index) => {
        const updated = [...hospitalTypes];
        updated[index].isChecked = false;
        setHospitalTypes(updated);
    };

    const handleChipClose5 = (index) => {
        const updated = [...statusFilter];
        updated[index].isChecked = false;
        setStatusFilter(updated);
    };

    const handleChipClose6 = (index) => {
        const updated = [...availableBed];
        updated[index].isChecked = false;
        setAvailableBed(updated);
    };

    const handleClick = (index) => {
        setVariants(prevVariants =>
            prevVariants.map((variant, i) =>
                i === index ? (variant === 'filled' ? 'outlined' : 'filled') : variant
            )
        );
        // toast.success('Look at my styles. Try Toaster Demo', {
        //     style: {
        //       border: '1px solid #004f71',
        //       padding: '16px',
        //       color: '#032b24',
        //     },
        //     iconTheme: {
        //       primary: '#004f71 ',
        //       secondary: '#FFFAEE',
        //     },
        //   });
    };

    const handleClickClear = () => {
        setVariants(prevVariants =>
            prevVariants.map(() => 'outlined')
        );
    };

    const ToastDemo = () =>{
        toast.success('Look at my styles. Try Toaster Demo', {
            style: {
              border: '1px solid #004f71',
              padding: '16px',
              color: '#032b24',
            },
            iconTheme: {
              primary: '#004f71 ',
              secondary: '#FFFAEE',
            },
          });
    }

    const chipLabels = ['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4'];

    React.useEffect(() => {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timeout);
      }, []);
    
    
      if (isLoading) {
        return (
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <CircularProgress />
          </Container>
        );
      }


    return (
        <div>
             <Toaster position="bottom-right"/>
            <div id='Dashboard' className='top'>
                <Box>
                <Card className='tab-bar'>
                    <Box className='d-flex justify-content-between'>
                    <Typography style={{ fontSize: '14px', fontWeight: 600, paddingInlineStart: '10px'}}>Filter Tab</Typography>
                    <div>

                    <Typography style={{ color: '#005ca8', fontSize: '14px', paddingInlineEnd: '10px', cursor: 'pointer', marginBlockEnd: '10px' }} onClick={handleClickClear}>Clear All</Typography>
                   
                    </div>
                    </Box>
                    <Stack direction="row" spacing={1} >
                        {chipLabels.map((label, index) => (
                            <Chip
                            key={index}
                            label={label}
                            variant={variants[index]}
                            onClick={() => handleClick(index)}
                            style={{ margin: '0 4px'}}
                            color='info'
                            />
                            ))}
                             <Button className='mx-5' variant='outlined' onClick={ToastDemo}>Toast Demo</Button>
                    </Stack>
                </Card>
                    <Grid container spacing={3} >
                        <Grid item lg={4.3} md={0} >
                            <Item className='leftSide_Filter'>
                                <Card>
                                    <div className='d-flex justify-content-between mt-5 mb-1'>
                                        <Typography sx={{ lineHeight: 1.5 }} className='filter_title'>Hide already seen</Typography>
                                        <FormControlLabel
                                            control={<Switch color="primary" size='small'/>}
                                        />
                                    </div>
                                    <div className='ms-3 mt-2 '>
                                        {doctorType.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={`${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose1(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                        {govSchemeApv.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={` ${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose2(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                        {hospitalFacilities.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={` ${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose3(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                        {hospitalTypes.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={` ${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose4(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                        {statusFilter.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={` ${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose5(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                        {availableBed.map((chip, index) => (
                                            <div
                                                key={index}
                                                className={` ${chip.isChecked ? 'chip active' : 'nullClass'}`}
                                            >
                                                {chip.isChecked ? <span>{chip.label}<CloseIcon onClick={() => handleChipClose6(index)} style={{ fontSize: '16px' }} /></span> : null}

                                            </div>
                                        ))}
                                    </div>
                                    <hr style={{ marginInline: '20px', borderColor: '#b5a6a6' }} />
                                    <div className='d-flex justify-content-between'>
                                        <Typography sx={{ lineHeight: 1.5 }} className='filter_title'>Verified Hospitals</Typography>
                                        <FormControlLabel
                                            control={<Switch color="primary" size='small'/>}
                                        />
                                    </div>
                                    <hr style={{ marginInline: '20px', borderColor: '#b5a6a6' }} />
                                    <div>
                                        <Accordion defaultExpanded>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <Typography>Fees</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <Box sx={{ width: "100%", paddingInline: "30px", paddingBlockStart: "43px" }}>
                                                        <Slider
                                                            getAriaLabel={() => 'Range'}
                                                            value={valueFees}
                                                            onChange={handleChangeFees}
                                                            getAriaValueText={valuetext}
                                                            valueLabelDisplay="on"
                                                        />
                                                    </Box>
                                                    <div className='d-flex justify-content-between '>
                                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                            <Select
                                                                value={rangeStart}
                                                                onChange={handleChangeStart}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'start' }}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>start</em>
                                                                </MenuItem>
                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                            <Select
                                                                value={rangeEnd}
                                                                onChange={handleChangeEnd}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'start' }}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>End</em>
                                                                </MenuItem>
                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion defaultExpanded >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Type of doctors</Typography>
                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearDoctorType}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {doctorType.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickDoctorType(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion defaultExpanded>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Type of Hospitals</Typography>

                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearHosType}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {hospitalTypes.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickHosType(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Facilities</Typography>

                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearHosFacType}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {hospitalFacilities.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickHosFacType(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Available Beds</Typography>

                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearAVLBed}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {availableBed.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickAVLBed(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Status</Typography>

                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearStatus}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {statusFilter.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickStatus(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion defaultExpanded>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <div className='d-flex justify-content-between w-100 '>
                                                    <Typography className='filter_title'>Goverment Scheme</Typography>

                                                    <Typography style={{ color: '#3333c2', fontSize: '14px' }} onClick={handleClearScheme}>Clear</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="chip-app">
                                                    {govSchemeApv.map((chip, index) => (
                                                        <div
                                                            key={index}
                                                            className={`chip ${chip.isChecked ? 'active' : 'inactive'}`}
                                                            onClick={() => handleClickScheme(index)}
                                                        >
                                                            {chip.isChecked ? <span><CheckIcon style={{ fontSize: '16px' }} /></span> : <span><AddIcon style={{ fontSize: '16px' }} /></span>}
                                                            {chip.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </Card>
                            </Item>
                        </Grid>
                        <Grid item lg={7.7} xs={12}>
                            <Card className='rightSide_Main border-0'>
                                <div>
                                    {cardData.map((card, index) => (
                                        <div className='card-details' key={card.id} onClick={() => handleCardClick(card.id)}>
                                            <Card sx={{ display: 'flex', borderRadius: '5px' }}>
                                                <Box className='position-relative'>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ padding: '10px', height: "15.8rem", minWidth: '24rem', borderRadius: '5px', objectFit: 'fill' }}
                                                        image={card.images[currentImageIndex]}
                                                        alt="Your Image"
                                                    />
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: '1.5rem',
                                                            left: '11px',
                                                            color: 'white',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            padding: '5px',
                                                            borderRadius: '5px',
                                                        }}
                                                    >       {card.titleNew}
                                                    </Typography>
                                                </Box>

                                                <CardContent>
                                                    <Typography variant="h5" component="div" className='card-title'>
                                                        {card.title}
                                                    </Typography>
                                                    <Typography className='card-location' >
                                                        {card.location}
                                                    </Typography>
                                                    <Typography className='card-decs' >
                                                        {card.description.split(' ').length > 50 ? `${card.description.split(' ').slice(0, 40).join(' ')}...` : card.description}
                                                    </Typography>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button variant="outlined">
                                                            Button 1
                                                        </Button>
                                                        <Button variant="contained" color='info'>
                                                            Button 2
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
