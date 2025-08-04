"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Paper,
  ListItemIcon,
} from "@mui/material";
import {
  FitnessCenter,
  CalendarToday,
  TrendingUp,
  Person,
  Settings,
  ExitToApp,
  Today,
  Assessment,
  Schedule,
  Add,
} from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Note: App Router uses 'next/navigation'

// Mock data - replace with actual API calls
const mockUser = {
  id: "1",
  email: "user@example.com",
  name: "John Doe",
  avatar: "/api/placeholder/40/40",
};

const mockStats = {
  totalWorkouts: 24,
  thisWeekWorkouts: 3,
  currentStreak: 5,
  targetWeekly: 5,
};

const mockRecentWorkouts = [
  {
    id: "1",
    date: "2024-08-04",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 80 },
      { name: "Squats", sets: 4, reps: 10, weight: 100 },
    ],
    notes: "Great session, felt strong",
  },
  {
    id: "2",
    date: "2024-08-02",
    exercises: [
      { name: "Deadlift", sets: 3, reps: 5, weight: 140 },
      { name: "Pull-ups", sets: 3, reps: 12, weight: 0 },
    ],
    notes: "New PR on deadlift!",
  },
];

const mockGoals = [
  { id: "1", title: "Hit gym 5x/week", progress: 60, target: 5, current: 3 },
  {
    id: "2",
    title: "Reach 15% body fat",
    progress: 75,
    target: 15,
    current: 18,
  },
  { id: "3", title: "Bench 100kg", progress: 80, target: 100, current: 80 },
];

export default function HomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    router.push("/profile");
    handleProfileMenuClose();
  };

  const navigateToWorkout = () => {
    router.push("/workout/new");
  };

  const navigateToProgress = () => {
    router.push("/progress");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", p: { xs: 2, md: 3 } }}>
      {/* Header */}
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
        <Typography variant="h4" fontWeight="bold" color="primary">
          🏋️ Fitness Tracker
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={<Schedule />}
            label={`${mockStats.thisWeekWorkouts}/${mockStats.targetWeekly} this week`}
            color="primary"
            variant="outlined"
          />
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 40, height: 40 }}>
              {mockUser.name.charAt(0)}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={navigateToProfile}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Quick Stats */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 48%",
                md: "1 1 23%",
              },
            }}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <FitnessCenter color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {mockStats.totalWorkouts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Workouts
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 12px)", // ~3 columns on medium screens
              },
            }}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <CalendarToday color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {mockStats.currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Day Streak
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 12px)", // ~3 columns on medium screens
              },
            }}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Today color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {mockStats.thisWeekWorkouts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This Week
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 12px)", // ~3 columns on medium screens
              },
            }}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <TrendingUp color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {Math.round(
                    (mockStats.thisWeekWorkouts / mockStats.targetWeekly) * 100
                  )}
                  %
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weekly Goal
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3, // replaces `spacing={3}`
          }}
        >
          <Box
            sx={{
              flex: {
                xs: "1 1 100%", // full width on small screens
                md: "1 1 66.66%", // 8/12 columns on medium and up
              },
            }}
          >
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="Quick Actions"
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2, // replaces `spacing={3}`
                  }}
                >
                  <Box
                    sx={{
                      flex: {
                        xs: "1 1 100%", // Full width on small screens
                        sm: "1 1 50%", // Half width on medium screens and up
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<Add />}
                      onClick={navigateToWorkout}
                      sx={{ py: 2 }}
                    >
                      Log New Workout
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      flex: {
                        xs: "1 1 100%", // Full width on small screens
                        sm: "1 1 50%", // Half width on medium screens and up
                      },
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      startIcon={<Assessment />}
                      onClick={navigateToProgress}
                      sx={{ py: 2 }}
                    >
                      View Progress
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Recent Workouts */}
            <Card>
              <CardHeader
                title="Recent Workouts"
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
              />
              <CardContent>
                {mockRecentWorkouts.map((workout) => (
                  <Paper
                    key={workout.id}
                    elevation={1}
                    sx={{ p: 2, mb: 2, "&:last-child": { mb: 0 } }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {new Date(workout.date).toLocaleDateString()}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${workout.exercises.length} exercises`}
                      />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      {workout.exercises.map((exercise, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="text.secondary"
                        >
                          {exercise.name}: {exercise.sets}x{exercise.reps} @{" "}
                          {exercise.weight}kg
                        </Typography>
                      ))}
                    </Box>

                    {/* {workout.notes && (
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        "{workout.notes}"
                      </Typography>
                    )} */}
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Goals & Progress */}
          <Box
            sx={{
              flex: {
                xs: "1 1 100%", // Full width on small screens
                md: "1 1 32%", // ~1/3 width on medium and larger screens
              },
            }}
          >
            <Card>
              <CardHeader
                title="Current Goals"
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
              />
              <CardContent>
                {mockGoals.map((goal) => (
                  <Box key={goal.id} sx={{ mb: 3, "&:last-child": { mb: 0 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2">{goal.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {goal.current}/{goal.target}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {goal.progress}% complete
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
