import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route: unknown = createLazyFileRoute("/login")({
  component: Login,
})

function Login() {
  return (
    <Stack
      direction="row"
      margin={5}
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <Card>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">Login</Typography>
            <TextField label="Username" />
            <TextField label="Password" type="password" />
            <Button variant="contained">Submit</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
