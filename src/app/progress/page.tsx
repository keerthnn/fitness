'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Paper,
  Grid,
  LinearProgress,
  Avatar,
  Divider
} from '@mui/material'
import { 
  TrendingUp,
  TrendingDown,
  Timeline,
  FitnessCenter,
  Scale,
  StraightenRounded,
  Add,
  EmojiEvents,
  ArrowForward
} from '@mui/icons-material'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ProgressData {
  weight: {
    current: number
    change: number
    goal: number
    data: Array<{ date: string; weight: number }>
  }
  measurements: {
    chest: { current: number; change: number }
    waist: { current: number; change: number }
    arms: { current: number; change: number }
  }
  strength: {
    benchPress: { current: number; change: number }
    squat: { current: number; change: number }
    deadlift: { current: number; change: number }
  }
  achievements: Array<{
    id: string
    title: string
    description: string
    date: string
    type: 'weight' | 'strength' | 'measurement' | 'workout'
  }>
}

export default function ProgressOverviewPage() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: ProgressData = {
      weight: {
        current: 75.2,
        change: -2.3,
        goal: 72.0,
        data: [
          { date: '2024-07-01', weight: 77.5 },
          { date: '2024-07-08', weight: 77.1 },
          { date: '2024-07-15', weight: 76.8 },
          { date: '2024-07-22', weight: 76.2 },
          { date: '2024-07-29', weight: 75.8 },
          { date: '2024-08-05', weight: 75.2 }
        ]
      },
      measurements: {
        chest: { current: 102.5, change: 1.5 },
        waist: { current: 82.0, change: -3.2 },
        arms: { current: 38.5, change: 0.8 }
      },
      strength: {
        benchPress: { current: 85, change: 5 },
        squat: { current: 120, change: 10 },
        deadlift: { current: 140, change: 15 }
      },
      achievements: [
        {
          id: '1',
          title: 'New Deadlift PR!',
          description: 'Achieved 140kg deadlift - 15kg improvement',
          date: '2024-08-03',
          type: 'strength'
        },
        {
          id: '2',
          title: 'Weight Goal Milestone',
          description: 'Lost 2kg this month - 73% to goal',
          date: '2024-08-01',
          type: 'weight'
        },
        {
          id: '3',
          title: 'Consistency Champion',
          description: 'Completed 4 weeks of consistent training',
          date: '2024-07-28',
          type: 'workout'
        }
      ]
    }
    
    setProgressData(mockData)
  }, [])

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />
  }

  const getChangeColor = (change: number, inverse = false) => {
    if (inverse) {
      return change < 0 ? 'success.main' : 'error.main'
    }
    return change > 0 ? 'success.main' : 'error.main'
  }

  const formatChange = (change: number, unit: string) => {
    const sign = change > 0 ? '+' : ''
    return `${sign}${change}${unit}`
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'strength': return <FitnessCenter />
      case 'weight': return <Scale />
      case 'measurement': return <StraightenRounded />
      case 'workout': return <EmojiEvents />
      default: return <EmojiEvents />
    }
  }

  if (!progressData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LinearProgress sx={{ width: 200 }} />
      </Box>
    )
  }

  const weightProgress = ((progressData.weight.current - 77.5) / (progressData.weight.goal - 77.5)) * 100

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Progress Overview
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Track your fitness journey and celebrate achievements
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['7d', '30d', '90d', '1y'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'contained' : 'outlined'}
                  color="inherit"
                  size="small"
                  onClick={() => setSelectedPeriod(period)}
                  sx={{ 
                    bgcolor: selectedPeriod === period ? 'rgba(255,255,255,0.2)' : 'transparent',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  {period}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Weight Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {progressData.weight.current}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          kg
                        </Typography>
                      </Box>
                      <Scale color="primary" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      {getChangeIcon(progressData.weight.change)}
                      <Typography 
                        variant="body2" 
                        sx={{ color: getChangeColor(progressData.weight.change, true) }}
                      >
                        {formatChange(progressData.weight.change, 'kg')} this month
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Goal: {progressData.weight.goal}kg
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.abs(weightProgress)} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {Math.round(Math.abs(weightProgress))}% to goal
                      </Typography>
                    </Box>

                    <Button
                      component={Link}
                      href="/progress/weight"
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForward />}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Strength Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Strength
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Personal Records
                        </Typography>
                      </Box>
                      <FitnessCenter color="primary" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Bench</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.strength.benchPress.current}kg
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.strength.benchPress.change) }}
                          >
                            {formatChange(progressData.strength.benchPress.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Squat</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.strength.squat.current}kg
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.strength.squat.change) }}
                          >
                            {formatChange(progressData.strength.squat.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Deadlift</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.strength.deadlift.current}kg
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.strength.deadlift.change) }}
                          >
                            {formatChange(progressData.strength.deadlift.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      href="/progress/strength"
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForward />}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Measurements Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Measurements
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Body composition
                        </Typography>
                      </Box>
                      <StraightenRounded color="primary" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Chest</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.measurements.chest.current}cm
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.measurements.chest.change) }}
                          >
                            {formatChange(progressData.measurements.chest.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Waist</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.measurements.waist.current}cm
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.measurements.waist.change, true) }}
                          >
                            {formatChange(progressData.measurements.waist.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Arms</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {progressData.measurements.arms.current}cm
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: getChangeColor(progressData.measurements.arms.change) }}
                          >
                            {formatChange(progressData.measurements.arms.change, '')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      href="/progress/measurements"
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForward />}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Achievements */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Achievements
                  </Typography>
                  <EmojiEvents color="primary" />
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {progressData.achievements.map((achievement) => (
                    <Box key={achievement.id} sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                        {getAchievementIcon(achievement.type)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {achievement.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(achievement.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Weight Trend Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Weight Trend
                  </Typography>
                  <Button
                    component={Link}
                    href="/progress/weight"
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForward />}
                  >
                    View All Data
                  </Button>
                </Box>
                
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData.weight.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: number) => [`${value} kg`, 'Weight']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#1976d2" 
                        fill="#1976d2" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Actions
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      component={Link}
                      href="/progress/weight"
                      variant="outlined"
                      fullWidth
                      startIcon={<Add />}
                      sx={{ p: 2, height: 80 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" fontWeight="medium">
                          Log Weight
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Track your weight
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      component={Link}
                      href="/progress/measurements"
                      variant="outlined"
                      fullWidth
                      startIcon={<Add />}
                      sx={{ p: 2, height: 80 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" fontWeight="medium">
                          Add Measurements
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Body measurements
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      component={Link}
                      href="/progress/strength"
                      variant="outlined"
                      fullWidth
                      startIcon={<Add />}
                      sx={{ p: 2, height: 80 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" fontWeight="medium">
                          Log Strength
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Personal records
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      component={Link}
                      href="/workouts"
                      variant="outlined"
                      fullWidth
                      startIcon={<Timeline />}
                      sx={{ p: 2, height: 80 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" fontWeight="medium">
                          View Reports
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Detailed analytics
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}