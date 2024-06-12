import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"

export const Route = createRootRoute({
  component: () => (
    <div style={{ width: "100vw", maxWidth: "100vw", height: "100vh", maxHeight: "100vh" }}>
      <AppBar>
        <Toolbar>
          {/* TODO: Add app icon here */}
          <Typography variant="h5" flexGrow={1}>
            <Link to="/">Wine Tracker</Link>
          </Typography>
          <Link to="/login">
            <Button style={{ color: "white" }}>Login</Button>
          </Link>
          <Link to="/register">
            <Button style={{ color: "white" }}>Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </div>
  ),
})
