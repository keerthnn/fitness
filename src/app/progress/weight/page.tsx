"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  MonitorWeight as WeightIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Navbar from "fitness/app/components/layout/Navbar";

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
  bodyFatPct?: number;
}

const WeightTrackingPage = () => {
  const router = useRouter();
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([
    {
      id: "1",
      date: "2024-08-05",
      weight: 175.2,
      bodyFatPct: 15.2,
      notes: "Morning weight",
    },
    { id: "2", date: "2024-08-03", weight: 175.8, bodyFatPct: 15.4 },
    { id: "3", date: "2024-08-01", weight: 176.1, bodyFatPct: 15.6 },
    { id: "4", date: "2024-07-30", weight: 176.5, bodyFatPct: 15.8 },
    {
      id: "5",
      date: "2024-07-28",
      weight: 177.0,
      bodyFatPct: 16.0,
      notes: "Post vacation",
    },
    { id: "6", date: "2024-07-25", weight: 176.8, bodyFatPct: 15.9 },
    { id: "7", date: "2024-07-23", weight: 177.3, bodyFatPct: 16.1 },
    { id: "8", date: "2024-07-21", weight: 177.8, bodyFatPct: 16.3 },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WeightEntry | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    bodyFatPct: "",
    notes: "",
  });
  const [timeRange, setTimeRange] = useState("30");

  const currentWeight = weightEntries[0]?.weight || 0;
  const previousWeight = weightEntries[1]?.weight || 0;
  const weightChange = currentWeight - previousWeight;
  const goalWeight = 170;
  const weightToGoal = currentWeight - goalWeight;

  // Prepare chart data
  const chartData = weightEntries
    .slice()
    .reverse()
    .slice(-parseInt(timeRange))
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: entry.weight,
      bodyFat: entry.bodyFatPct,
      fullDate: entry.date,
    }));

  const handleAddWeight = () => {
    setEditingEntry(null);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      weight: "",
      bodyFatPct: "",
      notes: "",
    });
    setDialogOpen(true);
  };

  const handleEditWeight = (entry: WeightEntry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      weight: entry.weight.toString(),
      bodyFatPct: entry.bodyFatPct?.toString() || "",
      notes: entry.notes || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteWeight = (id: string) => {
    setWeightEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleSaveWeight = () => {
    if (!formData.weight || !formData.date) return;

    const weightData: WeightEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: formData.date,
      weight: parseFloat(formData.weight),
      bodyFatPct: formData.bodyFatPct
        ? parseFloat(formData.bodyFatPct)
        : undefined,
      notes: formData.notes || undefined,
    };

    if (editingEntry) {
      setWeightEntries((prev) =>
        prev
          .map((entry) => (entry.id === editingEntry.id ? weightData : entry))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
    } else {
      setWeightEntries((prev) =>
        [weightData, ...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }

    setDialogOpen(false);
  };

  const getWeightTrend = () => {
    if (weightEntries.length < 2) return "stable";
    const recent = weightEntries.slice(0, 3);
    const avgRecent =
      recent.reduce((sum, entry) => sum + entry.weight, 0) / recent.length;
    const older = weightEntries.slice(3, 6);
    if (older.length === 0) return "stable";
    const avgOlder =
      older.reduce((sum, entry) => sum + entry.weight, 0) / older.length;

    if (avgRecent < avgOlder - 0.5) return "decreasing";
    if (avgRecent > avgOlder + 0.5) return "increasing";
    return "stable";
  };

  const trend = getWeightTrend();

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
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
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <WeightIcon sx={{ fontSize: 32, color: "primary.main" }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Weight Tracking
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <WeightIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {currentWeight} lbs
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Weight
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {weightChange > 0 ? (
                <TrendingUpIcon sx={{ color: "error.main", fontSize: 16 }} />
              ) : weightChange < 0 ? (
                <TrendingDownIcon
                  sx={{ color: "success.main", fontSize: 16 }}
                />
              ) : (
                <RemoveIcon sx={{ color: "text.secondary", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                color={
                  weightChange > 0
                    ? "error.main"
                    : weightChange < 0
                    ? "success.main"
                    : "text.secondary"
                }
                fontWeight="medium"
              >
                {weightChange > 0 ? "+" : ""}
                {weightChange.toFixed(1)} lbs from last entry
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="warning.main">
              {goalWeight} lbs
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Goal Weight
            </Typography>
            <Typography
              variant="body1"
              color={weightToGoal > 0 ? "text.primary" : "success.main"}
              fontWeight="medium"
            >
              {weightToGoal > 0
                ? `${weightToGoal.toFixed(1)} lbs to go`
                : "Goal achieved!"}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <TimelineIcon
              sx={{
                fontSize: 40,
                color:
                  trend === "decreasing"
                    ? "success.main"
                    : trend === "increasing"
                    ? "error.main"
                    : "text.secondary",
                mb: 1,
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {trend === "decreasing"
                ? "Losing"
                : trend === "increasing"
                ? "Gaining"
                : "Stable"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Trend (7 days)
            </Typography>
            <Chip
              label={trend}
              color={
                trend === "decreasing"
                  ? "success"
                  : trend === "increasing"
                  ? "error"
                  : "default"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Weight Trend
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
                <MenuItem value="90">90 Days</MenuItem>
                <MenuItem value="365">1 Year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip />
                <ReferenceLine
                  y={goalWeight}
                  stroke="#FF9800"
                  strokeDasharray="5 5"
                  label="Goal"
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#2196F3"
                  strokeWidth={3}
                  dot={{ fill: "#2196F3", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Weight History
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddWeight}
            >
              Add Entry
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Weight (lbs)</TableCell>
                  <TableCell align="right">Body Fat %</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weightEntries.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {entry.weight}
                    </TableCell>
                    <TableCell align="right">
                      {entry.bodyFatPct ? `${entry.bodyFatPct}%` : "-"}
                    </TableCell>
                    <TableCell>{entry.notes || "-"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditWeight(entry)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteWeight(entry.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Weight Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingEntry ? "Edit Weight Entry" : "Add Weight Entry"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Weight (lbs)"
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              fullWidth
              required
              inputProps={{ step: 0.1, min: 0 }}
            />

            <TextField
              label="Body Fat % (optional)"
              type="number"
              value={formData.bodyFatPct}
              onChange={(e) =>
                setFormData({ ...formData, bodyFatPct: e.target.value })
              }
              fullWidth
              inputProps={{ step: 0.1, min: 0, max: 100 }}
            />

            <TextField
              label="Notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              fullWidth
              multiline
              rows={2}
              placeholder="How are you feeling? Any observations?"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveWeight}
            variant="contained"
            disabled={!formData.weight || !formData.date}
          >
            {editingEntry ? "Update" : "Add"} Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WeightTrackingPage;
