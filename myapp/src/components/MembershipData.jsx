import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Container,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { membershipAPI, utils } from '../services/membershipAPI';

const MembershipData = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadData();
    loadStats();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await membershipAPI.getAllMembers();
      if (response.success) {
        setMembershipData(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setNotification({
        open: true,
        message: 'Failed to load membership data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await membershipAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      const response = await membershipAPI.deleteMember(id);
      if (response.success) {
        setNotification({
          open: true,
          message: 'Member deleted successfully',
          severity: 'success'
        });
        loadData(); // Reload data
        loadStats(); // Reload stats
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      setNotification({
        open: true,
        message: 'Failed to delete member',
        severity: 'error'
      });
    }
  };

  const handleRefresh = () => {
    loadData();
    loadStats();
  };

  const exportToCSV = async () => {
    try {
      await membershipAPI.exportToCSV();
      setNotification({
        open: true,
        message: 'Data exported successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      setNotification({
        open: true,
        message: 'Failed to export data',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const getBMIColor = (category) => {
    switch (category) {
      case 'Underweight': return 'info';
      case 'Normal weight': return 'success';
      case 'Overweight': return 'warning';
      case 'Obese': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Membership Data Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleRefresh}
            disabled={loading}
          >
            🔄 Refresh
          </Button>
          <Button
            variant="contained"
            onClick={exportToCSV}
            disabled={loading || membershipData.length === 0}
            sx={{
              backgroundColor: '#0b602a',
              '&:hover': { backgroundColor: '#0a5025' }
            }}
          >
            📥 Export to CSV
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : membershipData.length === 0 ? (
        <Alert severity="info">
          No membership data found. Submit some membership forms to see data here.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">Total Members</Typography>
                  <Typography variant="h4">
                    {stats?.totalMembers?.[0]?.count || membershipData.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">Average Age</Typography>
                  <Typography variant="h4">
                    {stats?.averageAge?.[0]?.avg ? Math.round(stats.averageAge[0].avg) : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">Average BMI</Typography>
                  <Typography variant="h4">
                    {stats?.averageBMI?.[0]?.avg ? stats.averageBMI[0].avg.toFixed(1) : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">Most Popular Goal</Typography>
                  <Typography variant="body1">
                    {stats?.goalDistribution?.[0]?.goal || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Age</strong></TableCell>
                  <TableCell><strong>BMI</strong></TableCell>
                  <TableCell><strong>Goal</strong></TableCell>
                  <TableCell><strong>Plan</strong></TableCell>
                  <TableCell><strong>Submitted</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {membershipData.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.fullName}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {member.bmi}
                        <Chip 
                          label={member.bmiCategory} 
                          size="small" 
                          color={getBMIColor(member.bmiCategory)}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{member.goal}</TableCell>
                    <TableCell>{member.membershipPlan}</TableCell>
                    <TableCell>
                      {new Date(member.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => handleViewDetails(member)}
                        >
                          👁️ View
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(member.id)}
                        >
                          🗑️ Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Detail Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Full Name:</strong> {selectedMember.fullName}</Grid>
              <Grid item xs={6}><strong>Email:</strong> {selectedMember.email}</Grid>
              <Grid item xs={6}><strong>Phone:</strong> {selectedMember.phone}</Grid>
              <Grid item xs={6}><strong>Age:</strong> {selectedMember.age}</Grid>
              <Grid item xs={6}><strong>Gender:</strong> {selectedMember.gender}</Grid>
              <Grid item xs={6}><strong>Height:</strong> {selectedMember.height} cm</Grid>
              <Grid item xs={6}><strong>Weight:</strong> {selectedMember.weight} kg</Grid>
              <Grid item xs={6}><strong>BMI:</strong> {selectedMember.bmi} ({selectedMember.bmiCategory})</Grid>
              <Grid item xs={6}><strong>Goal:</strong> {selectedMember.goal}</Grid>
              <Grid item xs={6}><strong>Experience:</strong> {selectedMember.experience}</Grid>
              <Grid item xs={6}><strong>Preferred Time:</strong> {selectedMember.preferredTime}</Grid>
              <Grid item xs={6}><strong>Membership Plan:</strong> {selectedMember.membershipPlan}</Grid>
              <Grid item xs={12}><strong>Address:</strong> {selectedMember.address}</Grid>
              <Grid item xs={12}><strong>Emergency Contact:</strong> {selectedMember.emergencyContact}</Grid>
              <Grid item xs={12}><strong>Medical Conditions:</strong> {selectedMember.medicalConditions || 'None'}</Grid>
              <Grid item xs={12}><strong>Submitted:</strong> {new Date(selectedMember.submittedAt).toLocaleString()}</Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MembershipData;
