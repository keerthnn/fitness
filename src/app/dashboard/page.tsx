"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from "@mui/material";
import {
  FitnessCenter,
  TrendingUp,
  Add,
  Timeline,
  Scale,
  MenuBook,
} from "@mui/icons-material";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Fitness Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Heres your fitness overview.
          </Typography>
        </Box>

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
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 12px)", // ~3 columns on medium screens
              },
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FitnessCenter color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Total Workouts
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" fontWeight="bold">
                  24
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
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Timeline color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    This Week
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" fontWeight="bold">
                  4
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
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Scale color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Current Weight
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" fontWeight="bold">
                  165 lbs
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
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TrendingUp color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Goal Progress
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" fontWeight="bold">
                  75%
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4, // spacing between child boxes
          }}
        >
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                lg: "1 1 66.66%", // 8/12 columns = 2/3
              },
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Recent Workouts
                  </Typography>
                  <Button
                    component={Link}
                    href="/workouts"
                    variant="text"
                    color="primary"
                  >
                    View All
                  </Button>
                </Box>

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Upper Body Strength"
                      secondary="45 minutes • 8 exercises"
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label="2 days ago"
                        size="small"
                        variant="outlined"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Cardio Session"
                      secondary="30 minutes • Running"
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label="4 days ago"
                        size="small"
                        variant="outlined"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Leg Day"
                      secondary="60 minutes • 10 exercises"
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label="1 week ago"
                        size="small"
                        variant="outlined"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          {/* Quick Actions */}
          <Box
            sx={{
              flex: {
                xs: "1 1 100%", // 100% width on extra small screens
                lg: "1 1 33.33%", // 1/3 width (like lg=4/12) on large screens
              },
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  sx={{ mb: 3 }}
                >
                  Quick Actions
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    component={Link}
                    href="/workouts/new"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Add />}
                    fullWidth
                  >
                    Start New Workout
                  </Button>

                  <Button
                    component={Link}
                    href="/progress/weight"
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<Scale />}
                    fullWidth
                  >
                    Log Weight
                  </Button>

                  <Button
                    component={Link}
                    href="/exercises"
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<MenuBook />}
                    fullWidth
                  >
                    Browse Exercises
                  </Button>

                  <Button
                    component={Link}
                    href="/progress"
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<Timeline />}
                    fullWidth
                  >
                    View Progress
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Progress Chart */}
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Weight Progress
              </Typography>
              <Paper
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.100",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Chart will go here
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
