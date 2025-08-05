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
  MenuItem,
  Divider,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import { Save, Cancel, Add, Remove } from "@mui/icons-material";
import Link from "next/link";
import Navbar from "fitness/app/components/layout/Navbar";

export default function NewExercisePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [exerciseData, setExerciseData] = useState({
    name: "",
    category: "",
    equipment: "",
    difficulty: "",
    description: "",
    instructions: "",
    tips: "",
    muscleGroups: [""],
    isPublic: false,
  });

  const categories = [
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
    "Cardio",
    "Full Body",
  ];
  const equipmentTypes = [
    "Barbell",
    "Dumbbell",
    "Bodyweight",
    "Machine",
    "Cable",
    "Resistance Band",
    "Kettlebell",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setExerciseData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleMuscleGroupChange = (index: number, value: string) => {
    setExerciseData((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.map((group, i) =>
        i === index ? value : group
      ),
    }));
  };

  const addMuscleGroup = () => {
    setExerciseData((prev) => ({
      ...prev,
      muscleGroups: [...prev.muscleGroups, ""],
    }));
  };

  const removeMuscleGroup = (index: number) => {
    setExerciseData((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!exerciseData.name.trim()) {
      setError("Exercise name is required");
      return false;
    }
    if (!exerciseData.category) {
      setError("Please select a category");
      return false;
    }
    if (!exerciseData.equipment) {
      setError("Please select equipment type");
      return false;
    }
    if (!exerciseData.difficulty) {
      setError("Please select difficulty level");
      return false;
    }
    if (!exerciseData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!exerciseData.instructions.trim()) {
      setError("Instructions are required");
      return false;
    }
    if (exerciseData.muscleGroups.some((group) => !group.trim())) {
      setError("All muscle groups must be filled in");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Filter out empty muscle groups and trim values
      const cleanedData = {
        ...exerciseData,
        name: exerciseData.name.trim(),
        description: exerciseData.description.trim(),
        instructions: exerciseData.instructions.trim(),
        tips: exerciseData.tips.trim(),
        muscleGroups: exerciseData.muscleGroups
          .filter((group) => group.trim())
          .map((group) => group.trim()),
      };

      // API call would go here
      console.log("Creating exercise:", cleanedData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/exercises");
    } catch (error) {
      console.error("Error creating exercise:", error);
      setError("Failed to create exercise. Please try again.");
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
            bgcolor: "success.main",
            color: "success.contrastText",
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
                Add New Exercise
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Create a custom exercise for your workout library
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/exercises"
              variant="outlined"
              color="inherit"
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Exercise Name"
                  value={exerciseData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  placeholder="e.g., Bench Press"
                />

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    select
                    label="Category"
                    value={exerciseData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    required
                    sx={{ minWidth: 200, flex: 1 }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Equipment"
                    value={exerciseData.equipment}
                    onChange={(e) =>
                      handleInputChange("equipment", e.target.value)
                    }
                    required
                    sx={{ minWidth: 200, flex: 1 }}
                  >
                    {equipmentTypes.map((equipment) => (
                      <MenuItem key={equipment} value={equipment}>
                        {equipment}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Difficulty"
                    value={exerciseData.difficulty}
                    onChange={(e) =>
                      handleInputChange("difficulty", e.target.value)
                    }
                    required
                    sx={{ minWidth: 200, flex: 1 }}
                  >
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={exerciseData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                  placeholder="Brief description of the exercise and its benefits..."
                />
              </Box>
            </CardContent>
          </Card>

          {/* Muscle Groups */}
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
                  Target Muscle Groups
                </Typography>
                <Button
                  onClick={addMuscleGroup}
                  variant="outlined"
                  startIcon={<Add />}
                  size="small"
                >
                  Add Muscle Group
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {exerciseData.muscleGroups.map((group, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", gap: 2, alignItems: "center" }}
                  >
                    <TextField
                      fullWidth
                      label={`Muscle Group ${index + 1}`}
                      value={group}
                      onChange={(e) =>
                        handleMuscleGroupChange(index, e.target.value)
                      }
                      required
                      placeholder="e.g., Chest, Triceps, Shoulders"
                    />

                    {exerciseData.muscleGroups.length > 1 && (
                      <Button
                        onClick={() => removeMuscleGroup(index)}
                        color="error"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "auto", px: 1 }}
                      >
                        <Remove />
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Instructions & Tips
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Step-by-step Instructions"
                  value={exerciseData.instructions}
                  onChange={(e) =>
                    handleInputChange("instructions", e.target.value)
                  }
                  required
                  placeholder="1. Set up position...&#10;2. Perform the movement...&#10;3. Return to starting position..."
                />

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Tips & Form Cues (Optional)"
                  value={exerciseData.tips}
                  onChange={(e) => handleInputChange("tips", e.target.value)}
                  placeholder="Important form tips, common mistakes to avoid, breathing cues..."
                />
              </Box>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={exerciseData.isPublic}
                    onChange={(e) =>
                      handleInputChange("isPublic", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Make this exercise public
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Allow other users to discover and use this exercise
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              component={Link}
              href="/exercises"
              variant="outlined"
              startIcon={<Cancel />}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? "Creating..." : "Create Exercise"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
