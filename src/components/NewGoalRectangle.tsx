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
import { setAdditionalData } from '@/service/mongoService';
import { createGoal } from '@/service/openaiService';

interface Props {
  maxWidth?: number;
  userId: string;
}

interface FormData {
  goalName: string;
  valueGoal: number;
  months: number;
  userId: string;
}

export default function NewGoalRectangle({ maxWidth, userId }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    goalName: '',
    valueGoal: 0,
    months: 0,
    userId,
  });

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitClick = async () => {
    await createGoal(
      '',
      {
        age: 50,
        income: 1200,
        gender: 'Male',
        relationshipStatus: 'Married',
        occupation: 'carpenter',
        hardExpenses: 230,
      },
      formData,
    );
  };

  return (
    <>
      <Card
        sx={{
          maxWidth:
            typeof maxWidth === 'number' && !showForm ? maxWidth : '100%',
          minWidth: 200,
          backgroundColor: 'background.default',
          mt: 2,
        }}
        elevation={0}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            p: 0,
          }}
        >
          {showForm ? (
            <form
              onSubmit={async e => {
                e.preventDefault();
                await handleSubmitClick();
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
                    id="valueGoal"
                    name="valueGoal"
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
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  Close
                </Button>
              </Box>
            </form>
          ) : (
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                height: '50px',
                width: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '50px',
                lineHeight: '45px',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => setShowForm(true)}
            >
              <div style={{ height: '50px' }}>+</div>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}
