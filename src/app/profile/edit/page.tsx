"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import Link from "next/link";
import Navbar from "fitness/app/components/layout/Navbar";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    height: "",
    currWeight: 0,
    goalWeight: 0,
    fitnessLevel: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to load user data");
        const data = await res.json();

        setFormData({
          name: data.name || "",
          email: data.email || "",
          age: data.age || 0,
          height: data.height || "",
          currWeight: data.currWeight || 0,
          goalWeight: data.goalWeight || 0,
          fitnessLevel: data.fitnessLevel || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log({ res });
      if (!res.ok) throw new Error("Failed to update profile");

      router.push("/profile");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fitnessLevels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

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
        <Card>
          <Paper
            sx={{
              p: 3,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h1" fontWeight="bold">
                Edit Profile
              </Typography>
              <Button
                component={Link}
                href="/profile"
                variant="outlined"
                color="inherit"
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Box>
          </Paper>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Physical Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 13, max: 120 }}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 5'10"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    select
                    label="Fitness Level"
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  >
                    {fitnessLevels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Weight Goals
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Current Weight (KG)"
                    name="currWeight"
                    type="number"
                    value={formData.currWeight}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 50, max: 500 }}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                  <TextField
                    fullWidth
                    label="Goal Weight (KG)"
                    name="goalWeight"
                    type="number"
                    value={formData.goalWeight}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 50, max: 500 }}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  pt: 3,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Button
                  component={Link}
                  href="/profile"
                  variant="outlined"
                  color="primary"
                  startIcon={<Cancel />}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  startIcon={
                    isLoading ? <CircularProgress size={16} /> : <Save />
                  }
                  size="large"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
