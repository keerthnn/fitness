// src/app/exercises/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  Share,
  Favorite,
  FavoriteBorder,
  MoreVert,
  FitnessCenter,
  Schedule,
  TrendingUp,
  Person,
  Public,
  Lock,
} from "@mui/icons-material";
import Navbar from "fitness/app/components/layout/Navbar";

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string;
  instructions: string;
  tips: string;
  muscleGroups: string[];
  isPublic: boolean;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  isFavorited: boolean;
  usageCount: number;
}

interface ExerciseDetailPageProps {
  params: {
    id: string;
  };
}

export default function ExerciseDetailPage({
  params,
}: ExerciseDetailPageProps) {
  const router = useRouter();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockExercise: Exercise = {
          id: params.id,
          name: "Bench Press",
          category: "Chest",
          equipment: "Barbell",
          difficulty: "Intermediate",
          description:
            "A compound upper body exercise that primarily targets the chest muscles, with secondary involvement of the shoulders and triceps. One of the most popular and effective exercises for building upper body strength and muscle mass.",
          instructions: `1. Lie flat on the bench with your eyes directly under the bar
2. Grip the bar with hands slightly wider than shoulder-width apart
3. Plant your feet firmly on the ground and maintain a slight arch in your back
4. Unrack the bar and position it directly over your chest
5. Lower the bar slowly to your chest, touching lightly at nipple level
6. Press the bar back up to the starting position, maintaining control throughout
7. Repeat for desired number of repetitions`,
          tips: `• Keep your core engaged throughout the movement
• Don't bounce the bar off your chest
• Maintain a consistent grip and bar path
• Breathe in on the descent, breathe out on the press
• Keep your shoulders pulled back and down
• Use a spotter for heavy weights`,
          muscleGroups: ["Chest", "Triceps", "Shoulders"],
          isPublic: true,
          createdBy: {
            id: "user1",
            name: "John Doe",
            avatar: "/avatars/john.jpg",
          },
          createdAt: "2024-01-15T10:30:00Z",
          isFavorited: false,
          usageCount: 1247,
        };

        setExercise(mockExercise);
        setIsFavorited(mockExercise.isFavorited);
      } catch (err) {
        console.error("Error fetching exercise:", err);
        setError("Failed to load exercise details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [params.id]);

  const handleFavoriteToggle = async () => {
    try {
      // API call to toggle favorite
      setIsFavorited(!isFavorited);
      // Update exercise data
      if (exercise) {
        setExercise((prev) =>
          prev ? { ...prev, isFavorited: !isFavorited } : null
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    router.push(`/exercises/${params.id}/edit`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this exercise?")) {
      try {
        // API call to delete exercise
        router.push("/exercises");
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    }
    handleMenuClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: exercise?.name,
        text: exercise?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
    handleMenuClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !exercise) {
    return (
      <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "background.default" }}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Exercise not found"}
          </Alert>
          <Button
            component={Link}
            href="/exercises"
            variant="outlined"
            startIcon={<ArrowBack />}
          >
            Back to Exercises
          </Button>
        </Box>
      </Box>
    );
  }

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
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Button
                  component={Link}
                  href="/exercises"
                  variant="outlined"
                  color="inherit"
                  startIcon={<ArrowBack />}
                  size="small"
                >
                  Back
                </Button>
                <Typography variant="h4" fontWeight="bold">
                  {exercise.name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Chip
                  label={exercise.category}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }}
                />
                <Chip
                  label={exercise.equipment}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }}
                />
                <Chip
                  label={exercise.difficulty}
                  size="small"
                  color={getDifficultyColor(exercise.difficulty)}
                />
                {exercise.isPublic ? (
                  <Chip
                    icon={<Public fontSize="small" />}
                    label="Public"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }}
                  />
                ) : (
                  <Chip
                    icon={<Lock fontSize="small" />}
                    label="Private"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }}
                  />
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  opacity: 0.9,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={exercise.createdBy.avatar}
                    sx={{ width: 24, height: 24 }}
                  >
                    <Person fontSize="small" />
                  </Avatar>
                  <Typography variant="body2">
                    Created by {exercise.createdBy.name}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  • {exercise.usageCount} uses
                </Typography>
                <Typography variant="body2">
                  • {new Date(exercise.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={handleFavoriteToggle}
                color="inherit"
                sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
              >
                {isFavorited ? <Favorite /> : <FavoriteBorder />}
              </IconButton>

              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
              >
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Description */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Description
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {exercise.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Muscle Groups */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Target Muscle Groups
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {exercise.muscleGroups.map((muscle, index) => (
                <Chip
                  key={index}
                  label={muscle}
                  variant="outlined"
                  color="primary"
                  icon={<FitnessCenter />}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Instructions
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.7,
              }}
            >
              {exercise.instructions}
            </Typography>
          </CardContent>
        </Card>

        {/* Tips */}
        {exercise.tips && (
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Tips & Form Cues
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  lineHeight: 1.7,
                }}
              >
                {exercise.tips}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          <Button variant="contained" startIcon={<Schedule />} size="large">
            Add to Workout
          </Button>

          <Button
            component={Link}
            href={`/exercises/${exercise.id}/edit`}
            variant="outlined"
            startIcon={<Edit />}
            size="large"
          >
            Edit Exercise
          </Button>
        </Box>

        {/* Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit Exercise</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <ListItemIcon>
              <Share fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share Exercise</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete Exercise</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
