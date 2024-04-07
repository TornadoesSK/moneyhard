'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { setBasicUserData } from '@/service/mongoService';

const SetUpPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    gender: 'M',
  });

  // Function to handle form field changes
  // @ts-ignore
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('Data');
    console.log(formData);
  };

  const handleContinueClick = () => {
    setBasicUserData(formData);
    router.push('/set-up/2', { scroll: false });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Set Up Your Account
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mb: 4, backgroundColor: 'transparent' }}
      >
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: 'transparent', border: 'none' }}>
            <CardMedia
              component="img"
              width="80%"
              image="/set-up-page-1-bro.svg"
              alt="Set up page image"
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Please fill out the form below:
              </Typography>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleContinueClick();
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      autoComplete="name"
                      onChange={handleInputChange}
                      InputProps={{
                        style: { color: 'white', borderColor: 'white' },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      name="age"
                      label="Age"
                      type="number"
                      onChange={handleInputChange}
                      InputProps={{
                        style: { color: 'white', borderColor: 'white' },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="income"
                      name="income"
                      label="Income"
                      type="number"
                      onChange={handleInputChange}
                      InputProps={{
                        style: { color: 'white', borderColor: 'white' },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="gender"
                      name="gender"
                      label="Gender"
                      onChange={handleInputChange}
                      select
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: { color: 'white', borderColor: 'white' },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="F">Other</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SetUpPage;
