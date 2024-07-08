import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress} from '@mui/material';
import try2 from '../../assest/try2.jpg';
import try3 from '../../assest/try3.jpg';
import try4 from '../../assest/try1.jpg';
import { useParams } from 'react-router-dom';

const CardDetail = () => {

    const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const hospitals = [
    {
      id: 1,
      name: 'Example Hospital',
      location: '123 Main Street, City, Country',
      review: 'Excellent hospital with top-notch facilities. The staff is highly skilled and provides exceptional care to patients.',
      doctors: [
        {
          name: 'Dr. John Doe',
          specialty: 'Cardiologist',
          experience: '10 years',
        },
        {
          name: 'Dr. Jane Smith',
          specialty: 'Orthopedic Surgeon',
          experience: '8 years',
        },
        {
          name: 'Dr. Sarah Johnson',
          specialty: 'Pediatrician',
          experience: '12 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Intensive Care Unit (ICU)',
        'Radiology Department',
        'Surgery Department',
        'Laboratory',
        'Pharmacy',
      ],
      rate: '4.5/5',
      departments: [
        {
          name: 'Cardiology',
          head: 'Dr. Michael Brown',
        },
        {
          name: 'Orthopedics',
          head: 'Dr. Emily Wilson',
        },
        {
          name: 'Pediatrics',
          head: 'Dr. Sarah Johnson',
        }
      ],
      images: try2
    },
    {
      id: 2,
      name: 'Another Hospital',
      location: '456 Elm Street, City, Country',
      review: 'A well-established hospital providing comprehensive medical services. Known for its dedicated staff and modern facilities.',
      doctors: [
        {
          name: 'Dr. Alex Lee',
          specialty: 'Neurologist',
          experience: '15 years',
        },
        {
          name: 'Dr. Rachel Brown',
          specialty: 'Oncologist',
          experience: '12 years',
        },
        {
          name: 'Dr. David Clark',
          specialty: 'General Surgeon',
          experience: '10 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Operating Rooms',
        'Cancer Center',
        'Neurology Department',
        'Pediatrics Unit',
        'Maternity Ward',
      ],
      rate: '4.7/5',
      departments: [
        {
          name: 'Neurology',
          head: 'Dr. Alex Lee',
        },
        {
          name: 'Oncology',
          head: 'Dr. Rachel Brown',
        },
        {
          name: 'Surgery',
          head: 'Dr. David Clark',
        }
      ],
      images: try3
    },
    {
      id: 3,
      name: 'Central Hospital',
      location: '789 Oak Avenue, City, Country',
      review: 'A leading hospital known for its advanced medical treatments and compassionate care.',
      doctors: [
        {
          name: 'Dr. Emily Johnson',
          specialty: 'Pulmonologist',
          experience: '9 years',
        },
        {
          name: 'Dr. Mark Wilson',
          specialty: 'Gastroenterologist',
          experience: '11 years',
        },
        {
          name: 'Dr. Laura Adams',
          specialty: 'Dermatologist',
          experience: '13 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Endoscopy Unit',
        'Pulmonary Clinic',
        'Dermatology Department',
        'Cancer Care Center',
        'Physical Therapy',
      ],
      rate: '4.8/5',
      departments: [
        {
          name: 'Pulmonology',
          head: 'Dr. Emily Johnson',
        },
        {
          name: 'Gastroenterology',
          head: 'Dr. Mark Wilson',
        },
        {
          name: 'Dermatology',
          head: 'Dr. Laura Adams',
        }
      ],
      images: try4
    },
    {
      id: 4,
      name: 'Central Hospital',
      location: '789 Oak Avenue, City, Country',
      review: 'A leading hospital known for its advanced medical treatments and compassionate care.',
      doctors: [
        {
          name: 'Dr. Emily Johnson',
          specialty: 'Pulmonologist',
          experience: '9 years',
        },
        {
          name: 'Dr. Mark Wilson',
          specialty: 'Gastroenterologist',
          experience: '11 years',
        },
        {
          name: 'Dr. Laura Adams',
          specialty: 'Dermatologist',
          experience: '13 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Endoscopy Unit',
        'Pulmonary Clinic',
        'Dermatology Department',
        'Cancer Care Center',
        'Physical Therapy',
      ],
      rate: '4.8/5',
      departments: [
        {
          name: 'Pulmonology',
          head: 'Dr. Emily Johnson',
        },
        {
          name: 'Gastroenterology',
          head: 'Dr. Mark Wilson',
        },
        {
          name: 'Dermatology',
          head: 'Dr. Laura Adams',
        }
      ],
      images: try4
    },
    {
      id: 5,
      name: 'Central Hospital',
      location: '789 Oak Avenue, City, Country',
      review: 'A leading hospital known for its advanced medical treatments and compassionate care.',
      doctors: [
        {
          name: 'Dr. Emily Johnson',
          specialty: 'Pulmonologist',
          experience: '9 years',
        },
        {
          name: 'Dr. Mark Wilson',
          specialty: 'Gastroenterologist',
          experience: '11 years',
        },
        {
          name: 'Dr. Laura Adams',
          specialty: 'Dermatologist',
          experience: '13 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Endoscopy Unit',
        'Pulmonary Clinic',
        'Dermatology Department',
        'Cancer Care Center',
        'Physical Therapy',
      ],
      rate: '4.8/5',
      departments: [
        {
          name: 'Pulmonology',
          head: 'Dr. Emily Johnson',
        },
        {
          name: 'Gastroenterology',
          head: 'Dr. Mark Wilson',
        },
        {
          name: 'Dermatology',
          head: 'Dr. Laura Adams',
        }
      ],
      images: try4
    },
    {
      id: 6,
      name: 'Central Hospital',
      location: '789 Oak Avenue, City, Country',
      review: 'A leading hospital known for its advanced medical treatments and compassionate care.',
      doctors: [
        {
          name: 'Dr. Emily Johnson',
          specialty: 'Pulmonologist',
          experience: '9 years',
        },
        {
          name: 'Dr. Mark Wilson',
          specialty: 'Gastroenterologist',
          experience: '11 years',
        },
        {
          name: 'Dr. Laura Adams',
          specialty: 'Dermatologist',
          experience: '13 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Endoscopy Unit',
        'Pulmonary Clinic',
        'Dermatology Department',
        'Cancer Care Center',
        'Physical Therapy',
      ],
      rate: '4.8/5',
      departments: [
        {
          name: 'Pulmonology',
          head: 'Dr. Emily Johnson',
        },
        {
          name: 'Gastroenterology',
          head: 'Dr. Mark Wilson',
        },
        {
          name: 'Dermatology',
          head: 'Dr. Laura Adams',
        }
      ],
      images: try4
    },
    {
      id: 7,
      name: 'Central Hospital',
      location: '789 Oak Avenue, City, Country',
      review: 'A leading hospital known for its advanced medical treatments and compassionate care.',
      doctors: [
        {
          name: 'Dr. Emily Johnson',
          specialty: 'Pulmonologist',
          experience: '9 years',
        },
        {
          name: 'Dr. Mark Wilson',
          specialty: 'Gastroenterologist',
          experience: '11 years',
        },
        {
          name: 'Dr. Laura Adams',
          specialty: 'Dermatologist',
          experience: '13 years',
        }
      ],
      facilities: [
        'Emergency Room',
        'Endoscopy Unit',
        'Pulmonary Clinic',
        'Dermatology Department',
        'Cancer Care Center',
        'Physical Therapy',
      ],
      rate: '4.8/5',
      departments: [
        {
          name: 'Pulmonology',
          head: 'Dr. Emily Johnson',
        },
        {
          name: 'Gastroenterology',
          head: 'Dr. Mark Wilson',
        },
        {
          name: 'Dermatology',
          head: 'Dr. Laura Adams',
        }
      ],
      images: try4
    }
]
  

useEffect(() => {
    const timeout = setTimeout(() => {
      const foundHospital = hospitals.find(hospital => hospital.id === parseInt(id));
      setHospital(foundHospital);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);


  if (isLoading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress />
      </Container>
    );
  }
    
  return (
    <Container style={{ padding: '16px', marginTop: '100px' }}>
    <Typography variant="h4" component="h2" gutterBottom style={{ color: '#005ca8' }}>
      {hospital.name}
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card style={{ marginBottom: '16px', backgroundColor: '#f7f7f7' }}>
          <CardMedia component="img" height="300" image={hospital.images} alt={hospital.name} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card style={{ marginBottom: '16px', backgroundColor: '#f7f7f7' }}>
          <CardContent>
            <Typography variant="h5" style={{ color: '#005ca8', marginBottom: '10px' , fontSize: '18px' }}>Location</Typography>
            <Typography style={{fontSize: '16px'}}>{hospital.location}</Typography>
            <Typography variant="h5" style={{ color: '#005ca8', marginBlock: '10px' , fontSize: '18px' }}>Review</Typography>
            <Typography style={{fontSize: '16px'}}>{hospital.review}</Typography>
            <Typography variant="h5" style={{ color: '#005ca8', marginBlock: '10px', fontSize: '18px'  }}>Doctors</Typography>
            {hospital.doctors.map((doctor, index) => (
              <Typography key={index}  style={{fontSize: '16px'}}>
                {doctor.name} - {doctor.specialty}, {doctor.experience} experience
              </Typography>
            ))}
            <Typography variant="h5" style={{ color: '#005ca8', marginBlock: '10px', fontSize: '18px'  }}>Facilities</Typography>
            <ul>
              {hospital.facilities.map((facility, index) => (
                <li key={index}  style={{fontSize: '16px'}}>{facility}</li>
              ))}
            </ul>
            <Typography variant="h5" style={{ color: '#005ca8', marginBlock: '10px', fontSize: '18px' }} >Rate</Typography>
            <Typography  style={{fontSize: '16px'}}>{hospital.rate}</Typography>
            <Typography variant="h5" style={{ color: '#005ca8',  marginBlock: '10px', fontSize: '18px' }}>Departments</Typography>
            {hospital.departments.map((department, index) => (
              <Typography key={index}  style={{fontSize: '16px'}}>
                {department.name} - Head: {department.head}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
  );
};

export default CardDetail;
