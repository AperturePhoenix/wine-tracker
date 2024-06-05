import { Stack, Card, CardContent, Typography, TextField, Button } from "@mui/material"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route: unknown = createLazyFileRoute("/register")({
  component: Register,
})

function Register(): JSX.Element {
  return (
    <Stack
      direction="row"
      margin={5}
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <Card>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">Register</Typography>
            <TextField label="Email" />
            <TextField label="Password" type="password" />
            <TextField label="First Name" />
            <TextField label="Last Name" />
            <Button variant="contained">Submit</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
