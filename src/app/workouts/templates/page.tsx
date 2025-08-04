import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  Paper,
  Stack,
  Avatar,
  IconButton
} from '@mui/material'
import { 
  Add, 
  FitnessCenter, 
  Timer, 
  Star,
  ContentCopy,
  Favorite,
  TrendingUp
} from '@mui/icons-material'
import Link from 'next/link'

export default function WorkoutTemplatesPage() {
  const templates = [
    {
      id: 1,
      name: "Push Day (Chest, Shoulders, Triceps)",
      category: "Strength",
      difficulty: "Intermediate",
      duration: "45-60 min",
      exercises: 8,
      rating: 4.8,
      uses: 1247,
      description: "Complete push workout targeting chest, shoulders, and triceps with compound and isolation movements."
    },
    {
      id: 2,
      name: "Pull Day (Back, Biceps)",
      category: "Strength", 
      difficulty: "Intermediate",
      duration: "45-55 min",
      exercises: 7,
      rating: 4.9,
      uses: 1089,
      description: "Comprehensive pulling workout for back width, thickness, and bicep development."
    },
    {
      id: 3,
      name: "HIIT Cardio Blast",
      category: "Cardio",
      difficulty: "Beginner",
      duration: "20-25 min", 
      exercises: 6,
      rating: 4.6,
      uses: 2156,
      description: "High-intensity interval training for maximum calorie burn and cardiovascular fitness."
    },
    {
      id: 4,
      name: "Full Body Strength",
      category: "Full Body",
      difficulty: "Advanced",
      duration: "60-75 min",
      exercises: 12,
      rating: 4.7,
      uses: 892,
      description: "Complete full-body workout hitting all major muscle groups with heavy compound movements."
    },
    {
      id: 5,
      name: "Leg Day Destroyer",
      category: "Lower Body",
      difficulty: "Advanced", 
      duration: "50-65 min",
      exercises: 10,
      rating: 4.9,
      uses: 756,
      description: "Intense lower body workout focusing on quads, hamstrings, glutes, and calves."
    },
    {
      id: 6,
      name: "Quick Morning Routine",
      category: "Full Body",
      difficulty: "Beginner",
      duration: "15-20 min",
      exercises: 5,
      rating: 4.5,
      uses: 3421,
      description: "Perfect morning energizer with bodyweight exercises to start your day right."
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success'
      case 'Intermediate': return 'warning'  
      case 'Advanced': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              Workout Templates
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose from our collection of proven workout routines
            </Typography>
          </Box>
          
          <Button
            component={Link}
            href="/workouts/new"
            variant="contained"
            startIcon={<Add />}
            size="large"
          >
            Create Custom
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {templates.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">Templates Available</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              4.7
            </Typography>
            <Typography variant="body2" color="text.secondary">Average Rating</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="info.main">
              {templates.reduce((sum, t) => sum + t.uses, 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">Total Uses</Typography>
          </Paper>
        </Box>

        {/* Templates Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {templates.map((template) => (
            <Card key={template.id} sx={{ '&:hover': { boxShadow: 4 }, transition: 'box-shadow 0.3s' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                      <FitnessCenter sx={{ fontSize: 32 }} />
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h5" fontWeight="bold">
                          {template.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ color: 'warning.main', fontSize: 18 }} />
                          <Typography variant="body2" fontWeight="bold">
                            {template.rating}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip label={template.category} variant="outlined" size="small" />
                        <Chip 
                          label={template.difficulty} 
                          color={getDifficultyColor(template.difficulty)}
                          variant="outlined" 
                          size="small" 
                        />
                      </Box>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {template.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {template.duration}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <FitnessCenter sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {template.exercises} exercises
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {template.uses.toLocaleString()} uses
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary">
                        <Favorite />
                      </IconButton>
                      <IconButton color="primary">
                        <ContentCopy />
                      </IconButton>
                    </Box>
                    
                    <Stack spacing={1} sx={{ minWidth: 120 }}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        Use Template
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                      >
                        Preview
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
      