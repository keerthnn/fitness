import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  IconButton,
  Divider,
  Stack,
  Paper,
  Avatar
} from '@mui/material'
import { 
  Add, 
  PlayArrow, 
  Edit, 
  Delete, 
  FitnessCenter,
  Timer,
  TrendingUp,
  FilterList
} from '@mui/icons-material'
import Link from 'next/link'

export default function WorkoutsPage() {
  const workouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      date: "2024-08-03",
      duration: "45 min",
      exercises: 8,
      category: "Strength",
      status: "completed"
    },
    {
      id: 2,
      name: "Cardio HIIT Session",
      date: "2024-08-01",
      duration: "30 min",
      exercises: 6,
      category: "Cardio",
      status: "completed"
    },
    {
      id: 3,
      name: "Full Body Workout",
      date: "2024-07-30",
      duration: "60 min",
      exercises: 12,
      category: "Full Body",
      status: "completed"
    },
    {
      id: 4,
      name: "Leg Day Intense",
      date: "2024-07-28",
      duration: "50 min",
      exercises: 10,
      category: "Strength",
      status: "completed"
    }
  ]

  const stats = {
    totalWorkouts: 24,
    thisWeek: 4,
    totalTime: "18h 45m",
    avgDuration: "42 min"
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              My Workouts
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your fitness journey and progress
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              href="/workouts/templates"
              variant="outlined"
              startIcon={<FilterList />}
            >
              Templates
            </Button>
            <Button
              component={Link}
              href="/workouts/new"
              variant="contained"
              startIcon={<Add />}
              size="large"
            >
              New Workout
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, minWidth: 200, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FitnessCenter sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">Total Workouts</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">{stats.totalWorkouts}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, minWidth: 200, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">This Week</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">{stats.thisWeek}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, minWidth: 200, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Timer sx={{ color: 'info.main', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">Total Time</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">{stats.totalTime}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, minWidth: 200, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Timer sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">Avg Duration</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">{stats.avgDuration}</Typography>
          </Paper>
        </Box>

        {/* Workout List */}
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h5" fontWeight="bold">Recent Workouts</Typography>
            </Box>
            
            <Stack divider={<Divider />}>
              {workouts.map((workout, index) => (
                <Box key={workout.id} sx={{ p: 3, '&:hover': { bgcolor: 'action.hover' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 3, width: 56, height: 56 }}>
                        <FitnessCenter />
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {workout.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(workout.date).toLocaleDateString()}
                          </Typography>
                          <Chip label={workout.category} size="small" variant="outlined" />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {workout.duration}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FitnessCenter sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {workout.exercises} exercises
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        component={Link}
                        href={`/workouts/${workout.id}`}
                        variant="outlined"
                        size="small"
                        startIcon={<PlayArrow />}
                      >
                        View
                      </Button>
                      
                      <IconButton
                        component={Link}
                        href={`/workouts/${workout.id}/edit`}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}