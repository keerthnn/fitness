import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  Paper,
  Divider,
  Stack,
  Avatar,
  IconButton
} from '@mui/material'
import { 
  Edit, 
  Timer, 
  FitnessCenter,
  CalendarToday,
  Notes,
  Share,
  Favorite
} from '@mui/icons-material'
import Link from 'next/link'

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch workout data based on params.id
  const workout = {
    id: params.id,
    name: "Upper Body Strength",
    category: "Strength",
    date: "2024-08-03",
    duration: "45 min",
    notes: "Great workout today! Felt really strong on the bench press. Next time I'll try to increase the weight on the shoulder press.",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 185, restTime: 120, completed: true },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: 85, restTime: 90, completed: true },
      { name: "Pull-ups", sets: 3, reps: 12, weight: 0, restTime: 90, completed: true },
      { name: "Dumbbell Rows", sets: 3, reps: 10, weight: 65, restTime: 90, completed: true },
      { name: "Tricep Dips", sets: 3, reps: 15, weight: 0, restTime: 60, completed: true },
      { name: "Bicep Curls", sets: 3, reps: 12, weight: 35, restTime: 60, completed: true }
    ],
    totalSets: 19,
    totalReps: 167,
    status: "completed"
  }

  const totalWeight = workout.exercises.reduce((sum, exercise) => 
    sum + (exercise.weight * exercise.sets * exercise.reps), 0
  )

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Header */}
        <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', width: 60, height: 60 }}>
                  <FitnessCenter sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {workout.name}
                  </Typography>
                  <Chip 
                    label={workout.category} 
                    sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }} 
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 18 }} />
                  <Typography variant="body1">
                    {new Date(workout.date).toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Timer sx={{ fontSize: 18 }} />
                  <Typography variant="body1">{workout.duration}</Typography>
                </Box>
                
                <Chip 
                  label={workout.status.toUpperCase()} 
                  color="success"
                  sx={{ color: 'white' }}
                />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                component={Link}
                href={`/workouts/${workout.id}/edit`}
                variant="contained"
                color="inherit"
                startIcon={<Edit />}
                sx={{ color: 'primary.main' }}
              >
                Edit Workout
              </Button>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: 'inherit' }}>
                  <Share />
                </IconButton>
                <IconButton sx={{ color: 'inherit' }}>
                  <Favorite />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {workout.exercises.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">Exercises</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {workout.totalSets}
            </Typography>
            <Typography variant="body2" color="text.secondary">Total Sets</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="info.main">
              {workout.totalReps}
            </Typography>
            <Typography variant="body2" color="text.secondary">Total Reps</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="warning.main">
              {totalWeight.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">Total Weight (lbs)</Typography>
          </Paper>
        </Box>

        {/* Exercises */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h5" fontWeight="bold">Exercise Details</Typography>
            </Box>
            
            <Stack divider={<Divider />}>
              {workout.exercises.map((exercise, index) => (
                <Box key={index} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: exercise.completed ? 'success.main' : 'grey.400' }}>
                        <FitnessCenter />
                      </Avatar>
                      
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {exercise.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{exercise.sets}</strong> sets
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{exercise.reps}</strong> reps
                          </Typography>
                          {exercise.weight > 0 && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>{exercise.weight}</strong> lbs
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            <strong>{exercise.restTime}</strong>s rest
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        {(exercise.weight * exercise.sets * exercise.reps).toLocaleString()} lbs
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Volume
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Notes color="primary" />
              <Typography variant="h5" fontWeight="bold">Workout Notes</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {workout.notes}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}