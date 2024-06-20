import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { useUser } from "../hooks"

export const Route = createRootRoute({
  component: Root,
})

function Root(): JSX.Element {
  const user = useUser()
  return (
    <div style={{ width: "100vw", maxWidth: "100vw", height: "100vh", maxHeight: "100vh" }}>
      <AppBar enableColorOnDark>
        <Toolbar>
          {/* TODO: Add app icon here */}
          <Typography variant="h5" flexGrow={1}>
            <Link to="/">Wine Tracker</Link>
          </Typography>
          {!user ? (
            <>
              <Link to="/login">
                <Button style={{ color: "white" }}>Login</Button>
              </Link>
              <Link to="/register">
                <Button style={{ color: "white" }}>Register</Button>
              </Link>{" "}
            </>
          ) : (
            <Typography>Welcome, {user.firstName}</Typography>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </div>
  )
}
