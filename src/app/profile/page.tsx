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
} from "@mui/material";
import { Edit, Person, FitnessCenter, Timeline } from "@mui/icons-material";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    height: "5'10\"",
    currentWeight: 165,
    goalWeight: 155,
    fitnessLevel: "Intermediate",
    memberSince: "January 2024",
    totalWorkouts: 24,
  };

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
                    {user.name}
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

        {/* Replace Grid with Flex Box layout */}
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
                    ["Age", `${user.age} years`],
                    ["Height", user.height],
                    ["Current Weight", `${user.currentWeight} lbs`],
                    ["Goal Weight", `${user.goalWeight} lbs`],
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
                      label={user.fitnessLevel}
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
                        {user.currentWeight - user.goalWeight} lbs
                      </Typography>
                    </Box>
                  </Paper>

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
                        75%
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
                {[
                  {
                    title: "Weight Loss",
                    description: "Lose 10 lbs by June",
                    color: "info.light",
                    text: "info.contrastText",
                  },
                  {
                    title: "Strength",
                    description: "Bench press 200 lbs",
                    color: "success.light",
                    text: "success.contrastText",
                  },
                  {
                    title: "Endurance",
                    description: "Run 5K under 25 min",
                    color: "warning.light",
                    text: "warning.contrastText",
                  },
                ].map((goal) => (
                  <Paper
                    key={goal.title}
                    sx={{
                      p: 3,
                      flex: "1 1 250px",
                      bgcolor: goal.color,
                      color: goal.text,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {goal.title}
                    </Typography>
                    <Typography variant="body2">{goal.description}</Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
