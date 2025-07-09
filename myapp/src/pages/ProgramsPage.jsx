import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  CardActions,
  Button,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const programs = [
  {
    title: "Boxing",
    image: "/assets/boxingwebp.jpg",
    tags: ["High Intensity", "Strength", "Endurance"],
    description: 'High-energy boxing workouts to build total strength.',
    trainer: "Coach Marcus 'Iron Fist' Lee",
    duration: "60 mins",
    schedule: "Mon/Wed/Fri - 6:00 PM",
    difficulty: "Intermediate",
    price: "$60/month",
  },
  {
    title: "Gym",
    image: "/assets/weights.jpg",
    tags: ["Strength Training", "Bodybuilding", "Machines"],
    description: `Train with equipment tailored to your goals.`,
    trainer: "Multiple Instructors",
    duration: "Unlimited access",
    schedule: "Daily - 5:00 AM to 11:00 PM",
    difficulty: "All Levels",
    price: "$50/month",
  },
  {
    title: "Cardio",
    image: "/assets/cardio.jpg",
    tags: ["Heart Health", "Fat Burn", "Stamina"],
    description: `Burn fat fast with high-intensity cardio sessions.`,
    trainer: "Anna Torres",
    duration: "45 mins",
    schedule: "Tue/Thu - 7:00 AM, 6:00 PM",
    difficulty: "Beginner-Friendly",
    price: "$40/month",
  },
  {
    title: "Spa",
    image: "/assets/spa.jpg",
    tags: ["Recovery", "Relaxation", "Wellness"],
    description: `Relax & recover with premium wellness treatments.`,
    trainer: "On-Demand Staff",
    duration: "30 - 90 mins per session",
    schedule: "By Appointment",
    difficulty: "N/A",
    price: "From $30/session",
  },
  {
    title: "Chiropractor",
    image: "/assets/chiropractor.jpeg",
    tags: ["Posture", "Alignment", "Recovery"],
    description: `Chiropractic care for posture, health`,
    trainer: "Dr. Linda Nguyen, DC",
    duration: "30 mins",
    schedule: "Mon to Sat - 10:00 AM to 6:00 PM",
    difficulty: "Therapeutic",
    price: "$70/session",
  },
  {
    title: "Yoga",
    image: "/assets/yoga.jpg",  // make sure to add this asset or update the path
    tags: ["Flexibility", "Mindfulness", "Balance"],
    description: `Enhance flexibility & mindfulness through guided yoga.`,
    trainer: "Sophia Patel",
    duration: "60 mins",
    schedule: "Mon/Wed/Fri - 8:00 AM",
    difficulty: "All Levels",
    price: "$45/month",
  },
];

const ProgramsPage = () => {
  const navigate = useNavigate();

  const handleJoinProgram = () => {
    navigate('/membership-form');
  };

  return (
    // <Paper sx={{ padding: 1, backgroundColor: '#fffff' , width:'100%'}}>
    <Box
    sx={{
      padding: 1,
      backgroundColor: '#fff',
      width: '100%',
      
      margin: 0,
      minHeight: '100vh', // optional: full viewport height if you want
    }}
  >
      <Typography variant="h4" align="center" gutterBottom>
        Our Programs
      </Typography>

      <Grid container spacing={4}>
        {programs.map((program, index) => (
          <Grid
            item
            xs={6}  // Static 2 cards per row on all screen sizes
            key={index}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  pt: '56.25%', // 16:9 aspect ratio
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={program.image}
                  alt={program.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {program.title}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {program.tags.map((tag, i) => (
                    <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    mb: 2,
                  }}
                >
                  {program.description}
                </Typography>

                <Box sx={{ fontSize: 14, lineHeight: 1.5, color: '#333' }}>
                  <Typography variant="subtitle2">
                    <strong>Trainer:</strong> {program.trainer}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Duration:</strong> {program.duration}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Schedule:</strong> {program.schedule}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Difficulty:</strong> {program.difficulty}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <strong>Price:</strong> {program.price}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleJoinProgram}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                    },
                  }}
                >
                  Join Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    {/* </Paper> */}
    </Box>
  );
};

export default ProgramsPage;
