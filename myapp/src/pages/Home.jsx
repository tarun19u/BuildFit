import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './FlipCard.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    width: '100vw',
                    backgroundColor: '#f5f5f5',
                    padding: 0,
                    margin: 0,
                    gap: 2,
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                }}
            >
                {/* Text Content */}
                <Box sx={{
                    flex: 1,
                    padding: { xs: 2, md: 4 },
                    maxWidth: { xs: '100%', md: '50%' }
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: { xs: 'center', md: 'left' },
                            fontFamily: '"Lucida Sans", sans-serif',
                            fontWeight: 'bold',
                            color: '#333',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        Make Yourself Stronger Than Your Excuses
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: { xs: 'center', md: 'left' },
                            fontFamily: '"Lucida Sans", sans-serif',
                            color: '#555',
                            marginTop: 2
                        }}
                    >
                        At BUILDFIT, we believe that strength isn’t just physical — it’s mental, emotional, and unstoppable. Whether you’re a beginner or an athlete pushing limits, this is your space to grow, grind, and conquer.
                    </Typography>
                </Box>

                {/* Flip Card */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: 2, md: 4 },
                    maxWidth: { xs: '100%', md: '50%' }
                }}>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >
                                    <img
                                        src="/assets/HomePageImages/Fitness_Men_Bodybuilding_Workout_Hands_Belly_586682_1920x1200.jpg"
                                        alt="Motivational gym"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                        }}
                                    />
                                </Box>
                            </div>
                            <div className="flip-card-back">
                                <video
                                    src="/assets/HomePageImages/Workout_Motivation_Video.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>

            {/* Features Section */}
            <Box sx={{ padding: 4, backgroundColor: '#ffffff' }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        mb: 4,
                        fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                        fontWeight: 'bold',
                        color: '#333'
                    }}
                >
                    Why Choose BUILDFIT?
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Feature 1 */}
                    <Box sx={{
                        flex: 1,
                        textAlign: 'center',
                        padding: 3,
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h2" sx={{ mb: 2 }}>💪</Typography>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Expert Training
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            Professional trainers to guide your fitness journey with personalized workout plans.
                        </Typography>
                    </Box>

                    {/* Feature 2 */}
                    <Box sx={{
                        flex: 1,
                        textAlign: 'center',
                        padding: 3,
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h2" sx={{ mb: 2 }}>🏋️</Typography>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Modern Equipment
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            State-of-the-art fitness equipment for all your training needs and goals.
                        </Typography>
                    </Box>

                    {/* Feature 3 */}
                    <Box sx={{
                        flex: 1,
                        textAlign: 'center',
                        padding: 3,
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h2" sx={{ mb: 2 }}>🎯</Typography>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Results Driven
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            Proven methods and tracking to help you achieve your fitness goals faster.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Call to Action Section */}
            <Box sx={{
                padding: 6,
                backgroundColor: '#333',
                color: 'white',
                textAlign: 'center'
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 2,
                        fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    Ready to Transform Your Life?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: '#ccc' }}>
                    Join thousands of members who have already started their fitness journey
                </Typography>
                <Button
                    variant="contained"
                    size="large" 
                    onClick={() => navigate('/membership-form')}
                    sx={{
                        backgroundColor: '#0b602a',
                        color: 'white',
                        fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                        fontWeight: 'bold',
                        padding: '12px 32px',
                        fontSize: '1.1rem',
                        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#0a5025',
                            transform: 'scale(0.95)'
                        }
                    }}
                >
                    Start Your Journey Today
                </Button>
            </Box>
        </>
    );
};

export default Home;
