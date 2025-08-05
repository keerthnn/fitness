import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  FitnessCenter,
  Favorite,
  PlayArrow,
  Info,
  TrendingUp,
} from "@mui/icons-material";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";

export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      name: "Bench Press",
      category: "Chest",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscleGroups: ["Chest", "Triceps", "Shoulders"],
      description:
        "Classic compound movement for building chest strength and mass.",
      instructions:
        "Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.",
      tips: "Keep shoulders back, maintain arch, control the weight",
      isFavorite: true,
      timesUsed: 24,
    },
    {
      id: 2,
      name: "Deadlift",
      category: "Back",
      equipment: "Barbell",
      difficulty: "Advanced",
      muscleGroups: ["Back", "Glutes", "Hamstrings"],
      description: "The king of all exercises. Full body compound movement.",
      instructions:
        "Hip hinge, grip bar, keep back straight, drive through heels.",
      tips: "Engage core, neutral spine, bar close to body",
      isFavorite: true,
      timesUsed: 18,
    },
    {
      id: 3,
      name: "Push-ups",
      category: "Chest",
      equipment: "Bodyweight",
      difficulty: "Beginner",
      muscleGroups: ["Chest", "Triceps", "Core"],
      description: "Classic bodyweight exercise for upper body strength.",
      instructions: "Plank position, lower chest to ground, push back up.",
      tips: "Keep body straight, full range of motion",
      isFavorite: false,
      timesUsed: 32,
    },
    {
      id: 4,
      name: "Squats",
      category: "Legs",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscleGroups: ["Quadriceps", "Glutes", "Core"],
      description: "Fundamental leg exercise for lower body development.",
      instructions:
        "Feet shoulder-width apart, lower hips back, drive through heels.",
      tips: "Chest up, knees track over toes, depth is key",
      isFavorite: true,
      timesUsed: 21,
    },
    {
      id: 5,
      name: "Pull-ups",
      category: "Back",
      equipment: "Pull-up Bar",
      difficulty: "Intermediate",
      muscleGroups: ["Lats", "Biceps", "Core"],
      description: "Upper body pulling exercise for back and arm strength.",
      instructions: "Hang from bar, pull body up until chin clears bar.",
      tips: "Full range of motion, control the descent",
      isFavorite: false,
      timesUsed: 15,
    },
    {
      id: 6,
      name: "Plank",
      category: "Core",
      equipment: "Bodyweight",
      difficulty: "Beginner",
      muscleGroups: ["Core", "Shoulders"],
      description: "Isometric core exercise for stability and strength.",
      instructions: "Forearm plank position, hold steady, breathe normally.",
      tips: "Straight line from head to heels, engage core",
      isFavorite: false,
      timesUsed: 28,
    },
  ];

  const categories = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
  ];
  const equipment = [
    "All",
    "Barbell",
    "Dumbbell",
    "Bodyweight",
    "Machine",
    "Cable",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "default";
    }
  };

  const stats = {
    totalExercises: exercises.length,
    favorites: exercises.filter((e) => e.isFavorite).length,
    categories: categories.length - 1,
    avgUsage: Math.round(
      exercises.reduce((sum, e) => sum + e.timesUsed, 0) / exercises.length
    ),
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Exercise Library
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover and master new exercises for your workouts
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/exercises/new"
            variant="contained"
            startIcon={<Add />}
            size="large"
          >
            Add Exercise
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {stats.totalExercises}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Exercises
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="error.main">
              {stats.favorites}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Favorites
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {stats.categories}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categories
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="info.main">
              {stats.avgUsage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Uses
            </Typography>
          </Paper>
        </Box>

        {/* Search and Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
              <TextField
                placeholder="Search exercises..."
                variant="outlined"
                size="small"
                sx={{ minWidth: 300, flex: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="outlined"
                startIcon={<FilterList />}
                size="small"
              >
                Filters
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ alignSelf: "center", mr: 1 }}
                >
                  Categories:
                </Typography>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    variant={category === "All" ? "filled" : "outlined"}
                    size="small"
                    clickable
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Exercise Grid */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              sx={{
                "&:hover": { boxShadow: 4 },
                transition: "box-shadow 0.3s",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 3,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3, flex: 1 }}>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 64, height: 64 }}
                    >
                      <FitnessCenter sx={{ fontSize: 32 }} />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          {exercise.name}
                        </Typography>
                        {exercise.isFavorite && (
                          <Favorite
                            sx={{ color: "error.main", fontSize: 20 }}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label={exercise.category}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          label={exercise.equipment}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          label={exercise.difficulty}
                          color={getDifficultyColor(exercise.difficulty)}
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                      >
                        {exercise.description}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Used {exercise.timesUsed} times
                          </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                          Targets: {exercise.muscleGroups.join(", ")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "flex-end",
                      minWidth: 120,
                    }}
                  >
                    <Button
                      component={Link}
                      href={`/exercises/${exercise.id}`}
                      variant="contained"
                      size="small"
                      startIcon={<Info />}
                      fullWidth
                    >
                      Details
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PlayArrow />}
                      fullWidth
                    >
                      Use in Workout
                    </Button>

                    <IconButton
                      color={exercise.isFavorite ? "error" : "default"}
                      size="small"
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
