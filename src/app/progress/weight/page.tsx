// src/app/progress/weight/page.tsx
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Alert
} from '@mui/material'
import { 
  ArrowBack,
  Add,
  Scale,
  TrendingUp,
  TrendingDown,
  Edit,
  Delete,
  CalendarToday,
  Target
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

interface WeightEntry {
  id: string
  weight: number
  date: string
  notes?: string
}

interface WeightGoal {
  target: number
  deadline: string
  startWeight: number
  startDate: string
}

export default function WeightTrackingPage() {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([])
  const [weightGoal, setWeightGoal] = useState<WeightGoal | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('3m')
  const [isLoading, setIsLoading] = useState(true)

  const [newEntry, setNewEntry] = useState({
    weight: '',
    date: new Date(),
    notes: ''
  })

  const [goalForm, setGoalForm] = useState({
    target: '',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 3 months from now
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Mock data - replace with actual API calls
        const mockEntries: WeightEntry[] = [
          { id: '1', weight: 77.5, date: '2024-07-01', notes: 'Starting weight' },
          { id: '2', weight: 77.2, date: '2024-07-03' },
          { id: '3', weight: 77.1, date: '2024-07-05' },
          { id: '4', weight: 76.8, date: '2024-07-08' },
          { id: '5', weight: 76.5, date: '2024-07-10' },
          { id: '6', weight: 76.9, date: '2024-07-12', notes: 'After weekend' },
          { id: '7', weight: 76.3, date: '2024-07-15' },
          { id: '8', weight: 76.0, date: '2024-07-17' },
          { id: '9', weight: 75.8, date: '2024-07-20' },
          { id: '10', weight: 75.5, date: '2024-07-22' },
          { id: '11', weight: 75.2, date: '2024-07-25' },
          { id: '12', weight: 75.0, date: '2024-07-28' },
          { id: '13', weight: 75.2, date: '2024-08-01' },
          { id: '14', weight: 74.8, date: '2024-08-03' },
          { id: '15', weight: 75.0, date: '2024-08-05', notes: 'Current weight' }
        ]

        const mockGoal: WeightGoal = {
          target: 72.0,
          deadline: '2024-11-01',
          startWeight: 77.5,
          startDate: '2024-07-01'
        }

        setWeightEntries(mockEntries)
        setWeightGoal(mockGoal)
      } catch (error) {
        console.error('Error fetching weight data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddEntry = async () => {
    if (!newEntry.weight) return

    const entry: WeightEntry = {
      id: Date.now().toString(),
      weight: parseFloat(newEntry.weight),
      date: newEntry.date.toISOString().split('T')[0],
      notes: newEntry.notes || undefined
    }

    setWeightEntries(prev => [...prev, entry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setIsAddDialogOpen(false)
    setNewEntry({ weight: '', date: new Date(), notes: '' })
  }

  const handleSetGoal = async () => {
    if (!goalForm.target) return

    const currentWeight = weightEntries[weightEntries.length - 1]?.weight || 75.0
    const goal: WeightGoal = {
      target: parseFloat(goalForm.target),
      deadline: goalForm.deadline.toISOString().split('T')[0],
      startWeight: currentWeight,
      startDate: new Date().toISOString().split('T')[0]
    }

    setWeightGoal(goal)
    setIsGoalDialogOpen(false)
    setGoalForm({ target: '', deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) })
  }

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setWeightEntries(prev => prev.filter(entry => entry.id !== id))
    }
  }

  const getFilteredData = () => {
    const now = new Date()
    const periodMap = {
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
      'all': Infinity
    }
    
    const days = periodMap[selectedPeriod as keyof typeof periodMap]
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    
    return weightEntries.filter(entry => new Date(entry.date) >= cutoffDate)
  }

  const getCurrentStats = () => {
    if (weightEntries.length === 0) return null

    const sortedEntries = [...weightEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const currentWeight = sortedEntries[sortedEntries.length - 1].weight
    const previousWeight = sortedEntries[sortedEntries.length - 2]?.weight
    const startWeight = sortedEntries[0].weight
    
    const totalChange = currentWeight - startWeight
    const recentChange = previousWeight ? currentWeight - previousWeight : 0
    
    return {
      current: currentWeight,
      totalChange,
      recentChange,
      entries: sortedEntries.length
    }
  }

  const getGoalProgress = () => {
    if (!weightGoal) return null

    const stats = getCurrentStats()
    if (!stats) return null

    const totalRequired = Math.abs(weightGoal.target - weightGoal.startWeight)
    const achieved = Math.abs(stats.current - weightGoal.startWeight)
    const progress = Math.min((achieved / totalRequired) * 100, 100)
    
    const daysTotal = Math.ceil((new Date(weightGoal.deadline).getTime() - new Date(weightGoal.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const daysElapsed = Math.ceil((new Date().getTime() - new Date(weightGoal.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.max(daysTotal - daysElapsed, 0)
    
    return {
      progress,
      remaining: Math.abs(weightGoal.target - stats.current),
      daysRemaining,
      onTrack: progress >= (daysElapsed / daysTotal) * 100
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LinearProgress sx={{ width: 200 }} />
      </Box>
    )
  }

  const stats = getCurrentStats()
  const goalProgress = getGoalProgress()
  const filteredData = getFilteredData()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Header */}
          <Paper sx={{ p: 4, mb: 4, bgcolor: 'info.main', color: 'info.contrastText' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Button
                    component={Link}
                    href="/progress"
                    variant="outlined"
                    color="inherit"
                    startIcon={<ArrowBack />}
                    size="small"
                  >
                    Back
                  </Button>
                  <Typography variant="h4" fontWeight="bold">
                    Weight Tracking
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Monitor your weight progress and achieve your goals
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Target />}
                  onClick={() => setIsGoalDialogOpen(true)}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  {weightGoal ? 'Update Goal' : 'Set Goal'}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setIsAddDialogOpen(true)}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'inherit',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Add Entry
                </Button>
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={3}>
            {/* Current Stats */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {/* Current Weight */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Scale color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold">
                        {stats?.current || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kg (current)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Total Change */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      {stats && stats.totalChange < 0 ? 
                        <TrendingDown color="success" sx={{ fontSize: 40, mb: 1 }} /> :
                        <TrendingUp color="error" sx={{ fontSize: 40, mb: 1 }} />
                      }
                      <Typography 
                        variant="h4" 
                        fontWeight="bold"
                        sx={{ color: stats && stats.totalChange < 0 ? 'success.main' : 'error.main' }}
                      >
                        {stats?.totalChange > 0 ? '+' : ''}{stats?.totalChange?.toFixed(1) || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kg (total change)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Recent Change */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <CalendarToday color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography 
                        variant="h4" 
                        fontWeight="bold"
                        sx={{ color: stats && stats.recentChange < 0 ? 'success.main' : 'error.main' }}
                      >
                        {stats?.recentChange > 0 ? '+' : ''}{stats?.recentChange?.toFixed(1) || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kg (recent)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Total Entries */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h1" sx={{ fontSize: 40, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                        {stats?.entries || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        entries logged
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Goal Progress */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Goal Progress
                  </Typography>
                  
                  {weightGoal && goalProgress ? (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2">Target: {weightGoal.target}kg</Typography>
                        <Typography variant="body2">
                          {goalProgress.daysRemaining} days left
                        </Typography>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={goalProgress.progress}
                        color={goalProgress.onTrack ? 'success' : 'warning'}
                        sx={{ height: 8, borderRadius: 4, mb: 2 }}
                      />
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {goalProgress.progress.toFixed(1)}% complete
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {goalProgress.remaining.toFixed(1)}kg remaining
                      </Typography>
                      
                      {!goalProgress.onTrack && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                          You may need to adjust your pace to reach your goal on time.
                        </Alert>
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Target sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        No goal set yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => setIsGoalDialogOpen(true)}
                        size="small"
                      >
                        Set Goal
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Weight Chart */}
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Weight Trend
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {['1m', '3m', '6m', '1y', 'all'].map((period) => (
                        <Button
                          key={period}
                          variant={selectedPeriod === period ? 'contained' : 'outlined'}
                          size="small"
                          onClick={() => setSelectedPeriod(period)}
                        >
                          {period}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: number) => [`${value} kg`, 'Weight']}
                        />
                        {weightGoal && (
                          <ReferenceLine 
                            y={weightGoal.target} 
                            stroke="#ff9800" 
                            strokeDasharray="5 5"
                            label={{ value: `Goal: ${weightGoal.target}kg`, position: 'right' }}
                          />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#1976d2" 
                          strokeWidth={2}
                          dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Entries */}
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recent Entries
                  </Typography>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Weight (kg)</TableCell>
                          <TableCell>Change</TableCell>
                          <TableCell>Notes</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...weightEntries]
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 10)
                          .map((entry, index, sortedEntries) => {
                            const previousEntry = sortedEntries[index + 1]
                            const change = previousEntry ? entry.weight - previousEntry.weight : 0
                            
                            return (
                              <TableRow key={entry.id}>
                                <TableCell>
                                  {new Date(entry.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell fontWeight="medium">
                                  {entry.weight.toFixed(1)}
                                </TableCell>
                                <TableCell>
                                  {previousEntry && (
                                    <Chip
                                      label={`${change > 0 ? '+' : ''}${change.toFixed(1)}`}
                                      size="small"
                                      color={change < 0 ? 'success' : change > 0 ? 'error' : 'default'}
                                      variant="outlined"
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" color="text.secondary">
                                    {entry.notes || '-'}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton size="small" color="error" onClick={() => handleDeleteEntry(entry.id)}>
                                    <Delete />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Add Entry Dialog */}
          <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Add Weight Entry</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                <TextField
                  label="Weight (kg)"
                  type="number"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                  fullWidth
                  autoFocus
                />
                
                <DatePicker
                  label="Date"
                  value={newEntry.date}
                  onChange={(date) => setNewEntry(prev => ({ ...prev, date: date || new Date() }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                
                <TextField
                  label="Notes (optional)"
                  multiline
                  rows={2}
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes about this entry..."
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEntry} variant="contained" disabled={!newEntry.weight}>
                Add Entry
              </Button>
            </DialogActions>
          </Dialog>

          {/* Set Goal Dialog */}
          <Dialog open={isGoalDialogOpen} onClose={() => setIsGoalDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{weightGoal ? 'Update' : 'Set'} Weight Goal</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                <TextField
                  label="Target Weight (kg)"
                  type="number"
                  value={goalForm.target}
                  onChange={(e) => setGoalForm(prev => ({ ...prev, target: e.target.value }))}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                  fullWidth
                  autoFocus
                />
                
                <DatePicker
                  label="Target Date"
                  value={goalForm.deadline}
                  onChange={(date) => setGoalForm(prev => ({ ...prev, deadline: date || new Date() }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                
                {stats && goalForm.target && (
                  <Alert severity="info">
                    {Math.abs(parseFloat(goalForm.target) - stats.current) > 0 ? (
                      <>
                        You need to {parseFloat(goalForm.target) < stats.current ? 'lose' : 'gain'}{' '}
                        <strong>{Math.abs(parseFloat(goalForm.target) - stats.current).toFixed(1)} kg</strong>{' '}
                        to reach your goal.
                      </>
                    ) : (
                      'You are already at your target weight!'
                    )}
                  </Alert>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsGoalDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSetGoal} variant="contained" disabled={!goalForm.target}>
                {weightGoal ? 'Update' : 'Set'} Goal
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}