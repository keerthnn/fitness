"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider,
  Stack,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Remove,
  Save,
  Cancel,
  Timer,
  FitnessCenter,
} from "@mui/icons-material";
import Link from "next/link";
import Navbar from "fitness/app/components/layout/Navbar";

export default function EditWorkoutPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you'd fetch this data based on params.id
  const [workoutData, setWorkoutData] = useState({
    name: "Upper Body Strength",
    category: "Strength",
    notes: "Great workout today! Felt really strong on the bench press.",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 185, restTime: 120 },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: 85, restTime: 90 },
      { name: "Pull-ups", sets: 3, reps: 12, weight: 0, restTime: 90 },
    ],
  });

  const categories = [
    "Strength",
    "Cardio",
    "Flexibility",
    "Full Body",
    "Upper Body",
    "Lower Body",
  ];

  const handleWorkoutChange = (field: string, value: string) => {
    setWorkoutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const addExercise = () => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: "", sets: 3, reps: 10, weight: 0, restTime: 60 },
      ],
    }));
  };

  const removeExercise = (index: number) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/workouts/${params.id}`);
    } catch (error) {
      console.error("Error creating workout:", error);
    } finally {
      setIsLoading(false);
    }
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
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Paper
          sx={{
            p: 3,
            mb: 4,
            bgcolor: "primary.main",
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
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create New Workout
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Design your perfect workout routine
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/workouts"
              variant="outlined"
              color="inherit"
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
          </Box>
        </Paper>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Workout Details */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Workout Details
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Workout Name"
                  value={workoutData.name}
                  onChange={(e) => handleWorkoutChange("name", e.target.value)}
                  required
                  placeholder="e.g., Upper Body Strength"
                />

                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={workoutData.category}
                  onChange={(e) =>
                    handleWorkoutChange("category", e.target.value)
                  }
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes (Optional)"
                  value={workoutData.notes}
                  onChange={(e) => handleWorkoutChange("notes", e.target.value)}
                  placeholder="Add any notes about this workout..."
                />
              </Box>
            </CardContent>
          </Card>

          {/* Exercises */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Exercises ({workoutData.exercises.length})
                </Typography>
                <Button
                  onClick={addExercise}
                  variant="contained"
                  startIcon={<Add />}
                  size="small"
                >
                  Add Exercise
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                {workoutData.exercises.map((exercise, index) => (
                  <Paper
                    key={index}
                    sx={{ p: 3, border: 1, borderColor: "divider" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FitnessCenter color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                          Exercise {index + 1}
                        </Typography>
                      </Box>

                      {workoutData.exercises.length > 1 && (
                        <IconButton
                          onClick={() => removeExercise(index)}
                          color="error"
                          size="small"
                        >
                          <Remove />
                        </IconButton>
                      )}
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <TextField
                        fullWidth
                        label="Exercise Name"
                        value={exercise.name}
                        onChange={(e) =>
                          handleExerciseChange(index, "name", e.target.value)
                        }
                        required
                        placeholder="e.g., Bench Press"
                      />

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <TextField
                          label="Sets"
                          type="number"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              index,
                              "sets",
                              parseInt(e.target.value) || 0
                            )
                          }
                          sx={{ minWidth: 100, flex: 1 }}
                          inputProps={{ min: 1 }}
                        />

                        <TextField
                          label="Reps"
                          type="number"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              index,
                              "reps",
                              parseInt(e.target.value) || 0
                            )
                          }
                          sx={{ minWidth: 100, flex: 1 }}
                          inputProps={{ min: 1 }}
                        />

                        <TextField
                          label="Weight (lbs)"
                          type="number"
                          value={exercise.weight}
                          onChange={(e) =>
                            handleExerciseChange(
                              index,
                              "weight",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          sx={{ minWidth: 120, flex: 1 }}
                          inputProps={{ min: 0, step: 0.5 }}
                        />

                        <TextField
                          label="Rest (sec)"
                          type="number"
                          value={exercise.restTime}
                          onChange={(e) =>
                            handleExerciseChange(
                              index,
                              "restTime",
                              parseInt(e.target.value) || 0
                            )
                          }
                          sx={{ minWidth: 120, flex: 1 }}
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <Timer sx={{ color: "action.active", mr: 1 }} />
                            ),
                          }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Submit */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              component={Link}
              href="/workouts"
              variant="outlined"
              size="large"
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={<Save />}
            >
              {isLoading ? "Creating..." : "Create Workout"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
