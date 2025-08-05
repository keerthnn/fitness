'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  FitnessCenter as FitnessCenterIcon,
  MonitorWeight as WeightIcon,
  Straighten as MeasurementsIcon,
  Timeline as TimelineIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as TrophyIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ProgressCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  route: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'weight' | 'strength' | 'consistency' | 'milestone';
}

const ProgressOverviewPage = () => {
  const router = useRouter();

  const progressCards: ProgressCard[] = [
    {
      title: 'Current Weight',
      value: '175.2 lbs',
      change: '-2.3 lbs this month',
      changeType: 'positive',
      icon: <WeightIcon />,
      route: '/progress/weight',
      color: '#2196F3'
    },
    {
      title: 'Body Fat',
      value: '15.2%',
      change: '-1.1% this month',
      changeType: 'positive',
      icon: <MeasurementsIcon />,
      route: '/progress/measurements',
      color: '#4CAF50'
    },
    {
      title: 'Bench Press PR',
      value: '225 lbs',
      change: '+15 lbs this month',
      changeType: 'positive',
      icon: <FitnessCenterIcon />,
      route: '/progress/strength',
      color: '#FF9800'
    },
    {
      title: 'Workout Streak',
      value: '12 days',
      change: 'Current streak',
      changeType: 'neutral',
      icon: <TimelineIcon />,
      route: '/workouts',
      color: '#9C27B0'
    }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'New Bench Press PR!',
      description: 'Hit 225 lbs for the first time',
      date: '2024-08-03',
      type: 'strength'
    },
    {
      id: '2',
      title: '10-Day Streak',
      description: 'Completed 10 consecutive workout days',
      date: '2024-08-01',
      type: 'consistency'
    },
    {
      id: '3',
      title: 'Goal Weight Reached',
      description: 'Successfully reached target weight of 175 lbs',
      date: '2024-07-28',
      type: 'weight'
    },
    {
      id: '4',
      title: 'Body Fat Milestone',
      description: 'Achieved sub-16% body fat percentage',
      date: '2024-07-25',
      type: 'milestone'
    }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'strength': return <FitnessCenterIcon />;
      case 'weight': return <WeightIcon />;
      case 'consistency': return <TimelineIcon />;
      case 'milestone': return <TrophyIcon />;
      default: return <TrophyIcon />;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'strength': return '#FF9800';
      case 'weight': return '#2196F3';
      case 'consistency': return '#9C27B0';
      case 'milestone': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'success.main';
      case 'negative': return 'error.main';
      default: return 'text.secondary';
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Progress Overview
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarIcon sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Last updated: Today
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats Cards */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3, 
        mb: 4 
      }}>
        {progressCards.map((card, index) => (
          <Card 
            key={index}
            sx={{ 
              flex: 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}05 100%)`,
              border: `1px solid ${card.color}30`
            }}
            onClick={() => router.push(card.route)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  backgroundColor: card.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {card.icon}
                </Box>
                <IconButton size="small" sx={{ color: card.color }}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, color: card.color }}>
                {card.value}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {card.title}
              </Typography>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: getChangeColor(card.changeType),
                  fontWeight: 500 
                }}
              >
                {card.change}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Recent Achievements */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Recent Achievements
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => router.push('/achievements')}
            >
              View All
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentAchievements.map((achievement) => (
              <Box 
                key={achievement.id}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    backgroundColor: getAchievementColor(achievement.type),
                    width: 48,
                    height: 48
                  }}
                >
                  {getAchievementIcon(achievement.type)}
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                  {new Date(achievement.date).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Card sx={{ flex: 1, cursor: 'pointer' }} onClick={() => router.push('/progress/weight')}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <WeightIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Log Weight
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your weight progress
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, cursor: 'pointer' }} onClick={() => router.push('/progress/measurements')}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <MeasurementsIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Body Measurements
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track body measurements
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, cursor: 'pointer' }} onClick={() => router.push('/progress/strength')}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <FitnessCenterIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Strength Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View strength gains
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Current Goals Progress */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Current Goals
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  Reach 170 lbs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  75% complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                5.2 lbs to go
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  Bench Press 250 lbs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  90% complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={90} 
                sx={{ height: 8, borderRadius: 4 }}
                color="warning"
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                25 lbs to go
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  30-Day Workout Streak
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  40% complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={40} 
                sx={{ height: 8, borderRadius: 4 }}
                color="secondary"
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                18 days to go
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressOverviewPage;