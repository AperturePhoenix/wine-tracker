import { Stack, Card, CardContent, Typography, TextField, Button } from "@mui/material"
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router"
import type { FormEvent } from "react"
import type { FormTypes, User } from "wine-tracker-models"
import apiInstance from "../api"

export const Route: unknown = createLazyFileRoute("/register")({
  component: Register,
})

function Register(): JSX.Element {
  const navigate = useNavigate({ from: "/register" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & FormTypes<User, typeof e.target>

    await apiInstance.register({
      email: target.email.value,
      password: target.password.value,
      firstName: target.firstName.value,
      lastName: target.lastName.value,
    })
    navigate({ to: "/" })
  }

  return (
    <Stack
      direction="row"
      margin={5}
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Register</Typography>
              <TextField label="Email" name="email" InputProps={{ inputProps: { required: true } }} />
              <TextField
                label="Password"
                name="password"
                type="password"
                InputProps={{ inputProps: { required: true } }}
              />
              <TextField label="First Name" name="firstName" InputProps={{ inputProps: { required: true } }} />
              <TextField label="Last Name" name="lastName" InputProps={{ inputProps: { required: true } }} />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  )
}
