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
import { setAdditionalData } from '@/service/mongoService';

const ExpensePage = () => {
  const router = useRouter();
  // Define primary color
  const primaryColor = '#1976d2'; // You can replace this with your actual primary color

  // State to store form data
  const [formData, setFormData] = useState({
    monthlyExpenses: '',
    job: '',
    'marriage-status': '',
    mortgage: '',
    'other-loans': '',
    'current-investment-amount': '',
  });

  // Function to handle form field changes
  // @ts-ignore
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  // @ts-ignore
  const handleSubmitClick = e => {
    e.preventDefault();
    setAdditionalData(formData);

    router.push('/dashboard', { scroll: false });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Manage Your Expenses
      </Typography>
      <Card
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <CardMedia
          component="img"
          width="80%"
          image="/set-up-page-2-bro.svg" // Replace with your image path
          alt="Expense Image"
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Please fill out the form below:
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="monthly-expenses"
                  name="monthlyExpenses"
                  label="Monthly Expenses"
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'white', borderColor: primaryColor },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="job"
                  name="job"
                  label="Job"
                  autoComplete="job"
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'white', borderColor: primaryColor },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="marriage-status"
                  name="marriage-status"
                  label="Marriage Status"
                  autoComplete="marriage-status"
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
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="single">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mortgage"
                  name="mortgage"
                  label="Mortgage"
                  type="number"
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'white', borderColor: primaryColor },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="other-loans"
                  name="other-loans"
                  label="Other Loans"
                  type="number"
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'white', borderColor: primaryColor },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="current-investment-amount"
                  name="current-investment-amount"
                  label="Current Investment Amount"
                  type="number"
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'white', borderColor: primaryColor },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              onClick={handleSubmitClick}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExpensePage;
