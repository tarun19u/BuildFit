import React, { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Typography, Box, Button, Stack } from '@mui/material';

const TestimonialPage = forwardRef(({ content, background, isCover = false }, ref) => ( 
  
  <Box
    ref={ref}
    sx={{
      width: '100%',
      height: '100%',
      padding: 4,
      boxSizing: 'border-box',
      backgroundImage: background ? `url(${background})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid #ccc',
      position: 'relative',
    }}
  >
    {!isCover && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(223, 223, 255, 0.8)',
          zIndex: 1,
        }}
      />
    )}
    <Box sx={{ position: 'relative', zIndex: 2 }}>{content}</Box>
  </Box>
));

export default function TestimonialsBook() {
  const bookRef = useRef();

  const testimonials = [
    {
      quote: `Joining this gym changed my life. The trainers are supportive and the energy is amazing!`,
      name: 'Alice Smith',
      title: 'Software Developer',
    },
    {
      quote: `I feel stronger, healthier, and more confident every day. Highly recommend to anyone!`,
      name: 'Jason Lee',
      title: 'Freelancer',
    },
    {
      quote: `The spa service after workouts is a game changer. Total relaxation!`,
      name: 'Priya Mehta',
      title: 'Yoga Instructor',
    },
    {
      quote: `Clean facilities, expert staff, and a very motivating environment.`,
      name: 'Liam Brown',
      title: 'Photographer',
    },
    {
      quote: `Their cardio programs are effective and fun. I’ve lost 10kg already!`,
      name: 'Carlos Ruiz',
      title: 'Content Creator',
    },
    {
      quote: `The yoga sessions bring me balance both physically and mentally.`,
      name: 'Sara White',
      title: 'Architect',
    },
    {
      quote: `Chiropractor services here helped me recover from back pain fast.`,
      name: 'Tom O’Neil',
      title: 'Fitness Blogger',
    },
    {
      quote: `I love the sense of community here. Everyone is uplifting and positive.`,
      name: 'Rachel Green',
      title: 'Fashion Designer',
    },
    {
      quote: `The boxing class is intense and super empowering. Best stress relief ever.`,
      name: 'Mike Johnson',
      title: 'Accountant',
    },
    {
      quote: `Every visit to the gym feels like progress. Fantastic place!`,
      name: 'Nina Kim',
      title: 'Student',
    },
  ];

  const pages = [];

  pages.push(
    <TestimonialPage key="cover" background="/assets/cover.jpg" isCover />
  );

  testimonials.forEach((t, i) => {
    const bg = i % 2 === 0 ? '/assets/page1.jpg' : '/assets/page2.jpg';
    pages.push(
      <TestimonialPage
        key={i}
        background={bg}
        content={
          <>
            <Typography variant="h6" sx={{ mb: 3 }}>"{t.quote}"</Typography>
            <Typography variant="subtitle1" align="right">
              — {t.name}, {t.title}
            </Typography>
          </>
        }
      />
    );
  });

  const goPrev = () => bookRef.current.pageFlip().flipPrev();
  const goNext = () => bookRef.current.pageFlip().flipNext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F0F8FF',
        padding: 4,
      }}
    >
      <HTMLFlipBook
        width={400}
        height={550}
        size="stretch"
        minWidth={300}
        maxWidth={600}
        drawShadow
        flippingTime={700}
        usePortrait={false}
        showCover={true}
        mobileScrollSupport={true}
        ref={bookRef}
      >
        {pages}
      </HTMLFlipBook>

      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="outlined" onClick={goPrev}>
          ⬅ Prev
        </Button>
        <Button variant="outlined" onClick={goNext}>
          Next ➡
        </Button>
      </Stack>
    </Box>
  );
}
