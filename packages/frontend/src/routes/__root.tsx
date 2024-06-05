import { Outlet, createRootRoute } from "@tanstack/react-router"
import { AppBar, Toolbar } from "@mui/material"

export const Route = createRootRoute({
  component: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>This is the app toolbar</Toolbar>
      </AppBar>
      <Outlet />
    </div>
  ),
})
