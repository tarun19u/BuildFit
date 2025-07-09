
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const services = [
    {
        title: 'Cardio Training',
        img: '/assets/cardio.jpg',
        description: 'Get your heart pumping with HIIT, treadmill sessions, and endurance drills.'
    },
    {
        title: 'Weight Training',
        img: '/assets/weights.jpg',
        description: 'Build strength and tone with free weights and machines.'
    },
    {
        title: 'Boxing',
        img: '/assets/boxing.jpg',
        description: 'Learn boxing techniques, improve reflexes, and relieve stress.'
    },
    {
        title: 'MMA & Self Defense',
        img: '/assets/mma.jpg',
        description: 'Train in striking, grappling, and real-world defense tactics.'
    },
    {
        title: 'Yoga & Flexibility',
        img: '/assets/yoga.jpg',
        description: 'Enhance mobility, reduce stress, and improve posture.'
    }
];

const trainers = [
    {
        name: 'Alex Johnson',
        specialty: 'Strength Coach',
        img: '/assets/StrengthCoach.jpeg',
        years: 8,
        cert: 'NASM-CPT, CrossFit Level 1',
        bio: 'Alex specializes in functional strength, transforming everyday athletes into powerhouses.'
    },
    {
        name: 'Sara Lee',
        specialty: 'Cardio & HIIT',
        img: '/assets/SaraLee.jpg',
        years: 6,
        cert: 'ACE-CPT, Zumba Certified',
        bio: 'Sara\'s classes are fun, fiery, and fantastic at torching calories fast.'
    },
    {
        name: 'Mick Harris',
        specialty: 'MMA Instructor',
        img: '/assets/MickHarris.jpeg',
        years: 10,
        cert: 'Muay Thai Black Belt, BJJ Blue Belt',
        bio: 'Mick brings elite-level fight training with a grounded teaching style.'
    }
];

const AboutUs = () => (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 4, py: 6 }}>
        <Box>
            
            <Box
                sx={{
                    backgroundColor: '#f7f7f7', // optional subtle background
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom>About BUILDFIT Gym</Typography>
                {/* <br> */} 
                <span>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: '"Brush Script MT", ',
                        color: '#444', // dark gray for better contrast
                        lineHeight: 1.8,
                        fontSize: '1.05rem'
                    }}
                >
                    
                    BUILDFIT isn't just a gym — it's a movement. We're a team of passionate coaches, athletes, and everyday warriors committed to helping you unlock your full potential. Whether you're a beginner stepping onto the mat for the first time or a seasoned lifter chasing your next personal best, BUILDFIT offers a space where every goal is respected and every effort is celebrated. From high-energy cardio and power-packed strength training to MMA, boxing, and mind-centering yoga, our diverse programs are designed to challenge your body and elevate your mindset. With top-tier equipment, expert guidance, and a community that motivates you every step of the way, BUILDFIT isn’t just where fitness happens — it’s where confidence is built, limits are broken, and transformations become a lifestyle.
                </Typography> 
                </span>
                 {/* </br> */}
            </Box>


        </Box>

        <Box>
            <Typography variant="h4" fontWeight="bold" mt={4}>What We Offer</Typography>
            <Grid container spacing={3} mt={2}>
                {services.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.title}>
                        <Card sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            '&:hover .overlay': {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        }}>
                            <CardMedia component="img" height="160" image={item.img} alt={item.title} />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                            </CardContent>
                            <Box className="overlay" sx={{
                                position: 'absolute',
                                top: 0, left: 0,
                                width: '100%', height: '100%',
                                bgcolor: 'rgba(0,0,0,0.6)',
                                opacity: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                p: 2,
                                color: 'white',
                                transform: 'translateY(20px)',
                                transition: '0.3s ease'
                            }}>
                                <Typography variant="body2">{item.description}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box>
            <Typography variant="h4" fontWeight="bold" mt={6}>Meet Our Trainers</Typography>
            <Grid container spacing={3} mt={2}>
                {trainers.map(trainer => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.name}>
                        <Card sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            '&:hover .overlay': {
                                opacity: 1
                            }
                        }}>
                            <CardMedia component="img" height="200" image={trainer.img} alt={trainer.name} />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{trainer.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{trainer.specialty}</Typography>
                            </CardContent>
                            <Box className="overlay" sx={{
                                position: 'absolute',
                                top: 0, left: 0,
                                width: '100%', height: '100%',
                                bgcolor: 'rgba(0,0,0,0.8)',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                opacity: 0,
                                transition: '0.3s ease'
                            }}>
                                <Typography variant="subtitle1" gutterBottom>Experience: {trainer.years} yrs</Typography>
                                <Typography variant="subtitle2" gutterBottom>Cert: {trainer.cert}</Typography>
                                <Typography variant="body2" align="center">{trainer.bio}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
);

export default AboutUs;
