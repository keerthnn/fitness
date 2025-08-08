"use client";
import {
  Timeline as ActivityIcon,
  Add as AddIcon,
  FitnessCenter as DumbbellIcon,
  TrackChanges as TargetIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ExerciseKey = "bench-press" | "squat" | "deadlift" | "overhead-press";

type WorkoutRecord = {
  date: string;
  weight: number;
  reps: number;
  sets: number;
  volume: number;
};
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  color: string;
}
const StrengthProgressPage = () => {
  const [selectedExercise, setSelectedExercise] = useState("bench-press");
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    exercise: "",
    weight: "",
    reps: "",
    sets: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Sample strength data
  const strengthData: Partial<Record<ExerciseKey, WorkoutRecord[]>> = {
    "bench-press": [
      { date: "2024-01-01", weight: 135, reps: 8, sets: 3, volume: 3240 },
      { date: "2024-01-15", weight: 140, reps: 8, sets: 3, volume: 3360 },
      { date: "2024-02-01", weight: 145, reps: 7, sets: 3, volume: 3045 },
      { date: "2024-02-15", weight: 150, reps: 6, sets: 3, volume: 2700 },
      { date: "2024-03-01", weight: 155, reps: 6, sets: 3, volume: 2790 },
      { date: "2024-03-15", weight: 160, reps: 5, sets: 3, volume: 2400 },
      { date: "2024-04-01", weight: 165, reps: 5, sets: 3, volume: 2475 },
    ],
    squat: [
      { date: "2024-01-01", weight: 185, reps: 10, sets: 3, volume: 5550 },
      { date: "2024-01-15", weight: 190, reps: 9, sets: 3, volume: 5130 },
      { date: "2024-02-01", weight: 195, reps: 8, sets: 3, volume: 4680 },
      { date: "2024-02-15", weight: 200, reps: 8, sets: 3, volume: 4800 },
      { date: "2024-03-01", weight: 205, reps: 7, sets: 3, volume: 4305 },
      { date: "2024-03-15", weight: 210, reps: 7, sets: 3, volume: 4410 },
      { date: "2024-04-01", weight: 215, reps: 6, sets: 3, volume: 3870 },
    ],
    deadlift: [
      { date: "2024-01-01", weight: 225, reps: 5, sets: 3, volume: 3375 },
      { date: "2024-01-15", weight: 235, reps: 5, sets: 3, volume: 3525 },
      { date: "2024-02-01", weight: 245, reps: 4, sets: 3, volume: 2940 },
      { date: "2024-02-15", weight: 255, reps: 4, sets: 3, volume: 3060 },
      { date: "2024-03-01", weight: 265, reps: 3, sets: 3, volume: 2385 },
      { date: "2024-03-15", weight: 275, reps: 3, sets: 3, volume: 2475 },
      { date: "2024-04-01", weight: 285, reps: 2, sets: 3, volume: 1710 },
    ],
  };

  const exercises = [
    { id: "bench-press", name: "Bench Press", emoji: "🏋️" },
    { id: "squat", name: "Squat", emoji: "🦵" },
    { id: "deadlift", name: "Deadlift", emoji: "💪" },
    { id: "overhead-press", name: "Overhead Press", emoji: "🔝" },
  ];

  const currentData = strengthData[selectedExercise as ExerciseKey] || [];
  const latestRecord = currentData[currentData.length - 1] || {};
  const previousRecord = currentData[currentData.length - 2] || {};
  const maxWeight = Math.max(...currentData.map((d) => d.weight));
  const maxVolume = Math.max(...currentData.map((d) => d.volume));

  const handleAddWorkout = () => {
    // In a real app, this would save to a database
    console.log("Adding workout:", newWorkout);
    setNewWorkout({
      exercise: "",
      weight: "",
      reps: "",
      sets: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddWorkout(false);
  };

  const StatCard = ({ title, value, change, icon, color }: StatCardProps) => (
    <Card sx={{ height: "100%", borderLeft: 4, borderLeftColor: color }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {change && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon
                  sx={{
                    fontSize: 16,
                    mr: 0.5,
                    color: change > 0 ? "success.main" : "error.main",
                  }}
                />
                <Typography
                  variant="body2"
                  color={change > 0 ? "success.main" : "error.main"}
                >
                  {change > 0 ? "+" : ""}
                  {change} from last session
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{ bgcolor: `${color}20`, color: color, width: 48, height: 48 }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", p: 3 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
      >
        <Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Strength Progress
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track your lifting progress and personal records
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddWorkout(true)}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Log Workout
        </Button>
      </Box>

      {/* Exercise Selector */}
      <Box mb={4}>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {exercises.map((exercise) => (
            <Button
              key={exercise.id}
              variant={
                selectedExercise === exercise.id ? "contained" : "outlined"
              }
              onClick={() => setSelectedExercise(exercise.id)}
              startIcon={<span>{exercise.emoji}</span>}
              sx={{ mb: 1 }}
            >
              {exercise.name}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Box mb={4}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3} // spacing between items
        >
          <Box flex="1 1 250px" maxWidth="300px">
            <StatCard
              title="Current Max"
              value={`${latestRecord.weight || 0} lbs`}
              change={latestRecord.weight - previousRecord.weight}
              icon={<TrophyIcon />}
              color="#10B981"
            />
          </Box>

          <Box flex="1 1 250px" maxWidth="300px">
            <StatCard
              title="Personal Record"
              value={`${maxWeight} lbs`}
              change={0}
              icon={<TargetIcon />}
              color="#F59E0B"
            />
          </Box>

          <Box flex="1 1 250px" maxWidth="300px">
            <StatCard
              title="Last Volume"
              value={`${latestRecord.volume || 0} lbs`}
              change={latestRecord.volume - previousRecord.volume}
              icon={<ActivityIcon />}
              color="#8B5CF6"
            />
          </Box>

          <Box flex="1 1 250px" maxWidth="300px">
            <StatCard
              title="Max Volume"
              value={`${maxVolume} lbs`}
              change={0}
              icon={<DumbbellIcon />}
              color="#EF4444"
            />
          </Box>
        </Box>
      </Box>

      {/* Charts Section */}
      <Box mb={4}>
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Weight Progress Chart */}
          <Box flex="1 1 100%" flexBasis={{ xs: "100%", lg: "48%" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weight Progress
                </Typography>
                <Box height={320}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) =>
                          new Date(date).toLocaleDateString()
                        }
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        labelFormatter={(date) =>
                          new Date(date).toLocaleDateString()
                        }
                        formatter={(value) => [`${value} lbs`, "Weight"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                        name="Weight (lbs)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Volume Chart */}
          <Box flex="1 1 100%" flexBasis={{ xs: "100%", lg: "48%" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Training Volume
                </Typography>
                <Box height={320}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) =>
                          new Date(date).toLocaleDateString()
                        }
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        labelFormatter={(date) =>
                          new Date(date).toLocaleDateString()
                        }
                        formatter={(value) => [`${value} lbs`, "Volume"]}
                      />
                      <Legend />
                      <Bar
                        dataKey="volume"
                        fill="#8B5CF6"
                        name="Volume (lbs)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Recent Workouts */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Workouts
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Reps</TableCell>
                  <TableCell>Sets</TableCell>
                  <TableCell>Volume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData
                  .slice(-5)
                  .reverse()
                  .map((workout, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        {new Date(workout.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{workout.weight} lbs</TableCell>
                      <TableCell>{workout.reps}</TableCell>
                      <TableCell>{workout.sets}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="primary"
                          fontWeight="bold"
                        >
                          {workout.volume} lbs
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Workout Dialog */}
      <Dialog
        open={showAddWorkout}
        onClose={() => setShowAddWorkout(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Log New Workout</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Exercise</InputLabel>
                <Select
                  value={newWorkout.exercise}
                  label="Exercise"
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, exercise: e.target.value })
                  }
                >
                  {exercises.map((exercise) => (
                    <MenuItem key={exercise.id} value={exercise.id}>
                      <Box display="flex" alignItems="center">
                        <span style={{ marginRight: 8 }}>{exercise.emoji}</span>
                        {exercise.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box flex="1 1 calc(33.333% - 16px)" minWidth="200px">
                  <TextField
                    fullWidth
                    label="Weight (lbs)"
                    type="number"
                    value={newWorkout.weight}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, weight: e.target.value })
                    }
                  />
                </Box>

                <Box flex="1 1 calc(33.333% - 16px)" minWidth="200px">
                  <TextField
                    fullWidth
                    label="Reps"
                    type="number"
                    value={newWorkout.reps}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, reps: e.target.value })
                    }
                  />
                </Box>

                <Box flex="1 1 calc(33.333% - 16px)" minWidth="200px">
                  <TextField
                    fullWidth
                    label="Sets"
                    type="number"
                    value={newWorkout.sets}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, sets: e.target.value })
                    }
                  />
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newWorkout.date}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, date: e.target.value })
                }
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddWorkout(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddWorkout}>
            Add Workout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StrengthProgressPage;
