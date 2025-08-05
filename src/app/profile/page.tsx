'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Person, FitnessCenter, Timeline } from "@mui/icons-material";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  age: number | null;
  height: string | null;
  currentWeight: number | null;
  goalWeight: number | null;
  fitnessLevel: string | null;
  bodyFatPct: number | null;
  memberSince: string;
  totalWorkouts: number;
  progressPercentage: number;
  weightHistory: Array<{
    date: string;
    weightKg: number;
    weightLbs: number;
    bodyFatPct: number | null;
  }>;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/profile/login');
        return;
      }

      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/profile/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const profileData = await response.json();
      setUser(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">No user data found</Alert>
      </Box>
    );
  }

  // This function is no longer needed since we get progress from API
  // const calculateProgress = () => {
  //   if (!user.currentWeight || !user.goalWeight) return 0;
  //   const totalToLose = user.currentWeight - user.goalWeight;
  //   const currentLoss = Math.max(0, user.currentWeight - user.goalWeight);
  //   return Math.min(100, Math.round((currentLoss / totalToLose) * 100));
  // };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Navbar />
      </Box>

      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Card
          sx={{ mb: 4, bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: "primary.light" }}
                >
                  <Person sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {user.name || user.email.split('@')[0]}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                    Member since {user.memberSince}
                  </Typography>
                </Box>
              </Box>
              <Button
                component={Link}
                href="/profile/edit"
                variant="contained"
                color="inherit"
                startIcon={<Edit />}
                sx={{ color: "primary.main" }}
              >
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Personal Info and Fitness Stats */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mb: 4,
          }}
        >
          {/* Personal Info */}
          <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    ["Age", user.age ? `${user.age} years` : 'Not set'],
                    ["Height", user.height || 'Not set'],
                    ["Current Weight", user.currentWeight ? `${user.currentWeight} lbs` : 'Not set'],
                    ["Body Fat %", user.bodyFatPct ? `${user.bodyFatPct}%` : 'Not set'],
                    ["Goal Weight", user.goalWeight ? `${user.goalWeight} lbs` : 'Not set'],
                  ].map(([label, value]) => (
                    <Box
                      key={label}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography color="text.secondary">{label}:</Typography>
                      <Typography fontWeight="medium">{value}</Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      Fitness Level:
                    </Typography>
                    <Chip
                      label={user.fitnessLevel || 'Not set'}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Fitness Stats */}
          <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Fitness Stats
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FitnessCenter />
                        <Typography>Total Workouts</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight="bold">
                        {user.totalWorkouts}
                      </Typography>
                    </Box>
                  </Paper>

                  {user.currentWeight && user.goalWeight && (
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: "success.light",
                        color: "success.contrastText",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography>Weight to Lose</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {Math.max(0, user.currentWeight - user.goalWeight)} lbs
                        </Typography>
                      </Box>
                    </Paper>
                  )}

                  {user.bodyFatPct && (
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: "info.light",
                        color: "info.contrastText",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography>Body Fat</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {user.bodyFatPct}%
                        </Typography>
                      </Box>
                    </Paper>
                  )}

                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "secondary.light",
                      color: "secondary.contrastText",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Timeline />
                        <Typography>Progress</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight="bold">
                        {user.progressPercentage}%
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Goals Section */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Current Goals
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                {user.goalWeight && user.currentWeight && (
                  <Paper
                    sx={{
                      p: 3,
                      flex: "1 1 250px",
                      bgcolor: "info.light",
                      color: "info.contrastText",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Weight Loss
                    </Typography>
                    <Typography variant="body2">
                      Reach {user.goalWeight} lbs
                    </Typography>
                  </Paper>
                )}
                
                <Paper
                  sx={{
                    p: 3,
                    flex: "1 1 250px",
                    bgcolor: "success.light",
                    color: "success.contrastText",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Strength
                  </Typography>
                  <Typography variant="body2">
                    Build muscle and strength
                  </Typography>
                </Paper>
                
                <Paper
                  sx={{
                    p: 3,
                    flex: "1 1 250px",
                    bgcolor: "warning.light",
                    color: "warning.contrastText",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Endurance
                  </Typography>
                  <Typography variant="body2">
                    Improve cardiovascular health
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}