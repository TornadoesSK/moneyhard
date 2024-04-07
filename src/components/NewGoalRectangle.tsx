'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Props {
  maxWidth?: number;
}

interface FormData {
  goalName: string;
  valueGoal: number;
  months: number;
}

export default function NewGoalRectangle({ maxWidth }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    goalName: '',
    valueGoal: 0,
    months: 0,
  });

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth:
            typeof maxWidth === 'number' && !showForm ? maxWidth : '100%',
          minWidth: 200,
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {showForm ? (
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="goalName"
                    name="goalName"
                    label="Goal name"
                    value={formData.goalName}
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: 'white', borderColor: 'primary' },
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="goalValue"
                    name="goalValue"
                    label="Investment goal"
                    type="number"
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: 'white', borderColor: 'primary' },
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="months"
                    name="months"
                    label="Months"
                    type="number"
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: 'white', borderColor: 'primary' },
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          ) : (
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 50,
                height: '50px',
                width: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 60,
              }}
              onClick={() => setShowForm(true)}
            >
              +
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}
