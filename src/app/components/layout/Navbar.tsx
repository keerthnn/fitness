"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FitnessCenter,
  Dashboard,
  SportsGymnastics,
  Timeline,
  Person,
  Notifications,
  Menu as MenuIcon,
  Close,
  ExitToApp,
  Settings,
  Help,
} from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  const navigationItems = [
    { text: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
    { text: "Workouts", href: "/workouts", icon: <FitnessCenter /> },
    { text: "Exercises", href: "/exercises", icon: <SportsGymnastics /> },
    { text: "Progress", href: "/progress", icon: <Timeline /> },
    { text: "Profile", href: "/profile", icon: <Person /> },
  ];

  const isActiveRoute = (href: string) => {
    return pathname.startsWith(href);
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 4 }}>
            <FitnessCenter sx={{ color: "primary.main", fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              FitTracker
            </Typography>
          </Box>
        </Link>

        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ px: 2, py: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={isActiveRoute(item.href)}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "background.paper", color: "text.primary" }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 4 }}>
              <FitnessCenter sx={{ color: "primary.main", fontSize: 32 }} />
              <Typography
                variant="h5"
                component="div"
                fontWeight="bold"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                FitTracker
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                  variant={isActiveRoute(item.href) ? "contained" : "text"}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    color: isActiveRoute(item.href)
                      ? "primary.contrastText"
                      : "text.primary",
                    "&:hover": {
                      bgcolor: isActiveRoute(item.href)
                        ? "primary.dark"
                        : "action.hover",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          {/* Right side items */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile menu */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                <Person />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Profile menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 1 }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Signed in as
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {user?.email || "Guest"}
          </Typography>
        </Box>

        <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
