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
  Paper,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Straighten as MeasurementsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
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
  Legend,
} from "recharts";
import Navbar from "fitness/app/components/layout/Navbar";

interface MeasurementEntry {
  id: string;
  date: string;
  chest?: number;
  waist?: number;
  hips?: number;
  bicepLeft?: number;
  bicepRight?: number;
  thighLeft?: number;
  thighRight?: number;
  neck?: number;
  forearmLeft?: number;
  forearmRight?: number;
  notes?: string;
}

const MeasurementsTrackingPage = () => {
  const router = useRouter();
  const [measurementEntries, setMeasurementEntries] = useState<
    MeasurementEntry[]
  >([
    {
      id: "1",
      date: "2024-08-05",
      chest: 42.5,
      waist: 32.0,
      hips: 38.5,
      bicepLeft: 15.5,
      bicepRight: 15.8,
      thighLeft: 24.0,
      thighRight: 24.2,
      neck: 15.5,
      notes: "Post-workout measurements",
    },
    {
      id: "2",
      date: "2024-07-28",
      chest: 42.0,
      waist: 32.5,
      hips: 39.0,
      bicepLeft: 15.2,
      bicepRight: 15.5,
      thighLeft: 23.8,
      thighRight: 24.0,
      neck: 15.3,
    },
    {
      id: "3",
      date: "2024-07-21",
      chest: 41.8,
      waist: 33.0,
      hips: 39.2,
      bicepLeft: 15.0,
      bicepRight: 15.3,
      thighLeft: 23.5,
      thighRight: 23.8,
      neck: 15.2,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MeasurementEntry | null>(
    null
  );
  const [selectedMetrics, setSelectedMetrics] = useState([
    "chest",
    "waist",
    "bicepLeft",
  ]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    chest: "",
    waist: "",
    hips: "",
    bicepLeft: "",
    bicepRight: "",
    thighLeft: "",
    thighRight: "",
    neck: "",
    forearmLeft: "",
    forearmRight: "",
    notes: "",
  });

  const measurementFields = [
    { key: "chest", label: "Chest", color: "#2196F3" },
    { key: "waist", label: "Waist", color: "#4CAF50" },
    { key: "hips", label: "Hips", color: "#FF9800" },
    { key: "bicepLeft", label: "Left Bicep", color: "#9C27B0" },
    { key: "bicepRight", label: "Right Bicep", color: "#E91E63" },
    { key: "thighLeft", label: "Left Thigh", color: "#00BCD4" },
    { key: "thighRight", label: "Right Thigh", color: "#795548" },
    { key: "neck", label: "Neck", color: "#607D8B" },
    { key: "forearmLeft", label: "Left Forearm", color: "#8BC34A" },
    { key: "forearmRight", label: "Right Forearm", color: "#FFC107" },
  ];

  // Prepare chart data
  const chartData = measurementEntries
    .slice()
    .reverse()
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ...Object.fromEntries(
        measurementFields.map((field) => [
          field.key,
          entry[field.key as keyof MeasurementEntry],
        ])
      ),
    }));

  const getLatestMeasurement = (field: string) => {
    const latest = measurementEntries[0];
    return latest ? latest[field as keyof MeasurementEntry] : null;
  };

  const getMeasurementChange = (field: string) => {
    if (measurementEntries.length < 2) return 0;
    const latest = measurementEntries[0][
      field as keyof MeasurementEntry
    ] as number;
    const previous = measurementEntries[1][
      field as keyof MeasurementEntry
    ] as number;
    if (!latest || !previous) return 0;
    return latest - previous;
  };

  const handleAddMeasurement = () => {
    setEditingEntry(null);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      chest: "",
      waist: "",
      hips: "",
      bicepLeft: "",
      bicepRight: "",
      thighLeft: "",
      thighRight: "",
      neck: "",
      forearmLeft: "",
      forearmRight: "",
      notes: "",
    });
    setDialogOpen(true);
  };

  const handleEditMeasurement = (entry: MeasurementEntry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      chest: entry.chest?.toString() || "",
      waist: entry.waist?.toString() || "",
      hips: entry.hips?.toString() || "",
      bicepLeft: entry.bicepLeft?.toString() || "",
      bicepRight: entry.bicepRight?.toString() || "",
      thighLeft: entry.thighLeft?.toString() || "",
      thighRight: entry.thighRight?.toString() || "",
      neck: entry.neck?.toString() || "",
      forearmLeft: entry.forearmLeft?.toString() || "",
      forearmRight: entry.forearmRight?.toString() || "",
      notes: entry.notes || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurementEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleSaveMeasurement = () => {
    if (!formData.date) return;

    const measurementData: MeasurementEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: formData.date,
      chest: formData.chest ? parseFloat(formData.chest) : undefined,
      waist: formData.waist ? parseFloat(formData.waist) : undefined,
      hips: formData.hips ? parseFloat(formData.hips) : undefined,
      bicepLeft: formData.bicepLeft
        ? parseFloat(formData.bicepLeft)
        : undefined,
      bicepRight: formData.bicepRight
        ? parseFloat(formData.bicepRight)
        : undefined,
      thighLeft: formData.thighLeft
        ? parseFloat(formData.thighLeft)
        : undefined,
      thighRight: formData.thighRight
        ? parseFloat(formData.thighRight)
        : undefined,
      neck: formData.neck ? parseFloat(formData.neck) : undefined,
      forearmLeft: formData.forearmLeft
        ? parseFloat(formData.forearmLeft)
        : undefined,
      forearmRight: formData.forearmRight
        ? parseFloat(formData.forearmRight)
        : undefined,
      notes: formData.notes || undefined,
    };

    if (editingEntry) {
      setMeasurementEntries((prev) =>
        prev
          .map((entry) =>
            entry.id === editingEntry.id ? measurementData : entry
          )
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
    } else {
      setMeasurementEntries((prev) =>
        [measurementData, ...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }

    setDialogOpen(false);
  };

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
        <MeasurementsIcon sx={{ fontSize: 32, color: "success.main" }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Body Measurements
        </Typography>
      </Box>

      {/* Current Measurements Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {measurementFields.slice(0, 6).map((field) => {
          const latest = getLatestMeasurement(field.key);
          const change = getMeasurementChange(field.key);

          return (
            <Box
              key={field.key}
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "33.33%",
                },
                boxSizing: "border-box",
                p: 1,
              }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: field.color }}
                  >
                    {latest ? `${latest}"` : "-"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {field.label}
                  </Typography>
                  {change !== 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      {change > 0 ? (
                        <TrendingUpIcon
                          sx={{ color: "error.main", fontSize: 16 }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ color: "success.main", fontSize: 16 }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        color={change > 0 ? "error.main" : "success.main"}
                        fontWeight="medium"
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Grid>

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
              Measurement Trends
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select Metrics</InputLabel>
              <Select
                multiple
                value={selectedMetrics}
                onChange={(e) => setSelectedMetrics(e.target.value as string[])}
                label="Select Metrics"
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          measurementFields.find((f) => f.key === value)?.label
                        }
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {measurementFields.map((field) => (
                  <MenuItem key={field.key} value={field.key}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedMetrics.map((metric) => {
                  const field = measurementFields.find((f) => f.key === metric);
                  return (
                    <Line
                      key={metric}
                      type="monotone"
                      dataKey={metric}
                      stroke={field?.color}
                      strokeWidth={2}
                      dot={{ fill: field?.color, strokeWidth: 2, r: 4 }}
                      name={field?.label}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Measurement History */}
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
              Measurement History
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddMeasurement}
              color="success"
            >
              Add Measurement
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Chest</TableCell>
                  <TableCell align="center">Waist</TableCell>
                  <TableCell align="center">Hips</TableCell>
                  <TableCell align="center">L. Bicep</TableCell>
                  <TableCell align="center">R. Bicep</TableCell>
                  <TableCell align="center">Neck</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {measurementEntries.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {entry.chest ? `${entry.chest}"` : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {entry.waist ? `${entry.waist}"` : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {entry.hips ? `${entry.hips}"` : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {entry.bicepLeft ? `${entry.bicepLeft}"` : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {entry.bicepRight ? `${entry.bicepRight}"` : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {entry.neck ? `${entry.neck}"` : "-"}
                    </TableCell>
                    <TableCell>{entry.notes || "-"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditMeasurement(entry)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteMeasurement(entry.id)}
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

      {/* Add/Edit Measurement Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingEntry ? "Edit Measurements" : "Add New Measurements"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              fullWidth
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
            />

            <Grid container spacing={2}>
              {measurementFields.map((field) => (
                <Box
                  key={field.key}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "50%",
                      md: "33.33%",
                    },
                    boxSizing: "border-box",
                    p: 1,
                  }}
                >
                  <TextField
                    label={`${field.label} (inches)`}
                    type="number"
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    fullWidth
                    inputProps={{ step: 0.1, min: 0 }}
                  />
                </Box>
              ))}

              <Box
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  p: 1, // optional padding
                }}
              >
                <TextField
                  label="Notes (optional)"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Any observations or notes about these measurements..."
                />
              </Box>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveMeasurement}
            variant="contained"
            color="success"
            disabled={!formData.date}
          >
            {editingEntry ? "Update" : "Add"} Measurements
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MeasurementsTrackingPage;
