import { Alert, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router"
import { type FormEvent, useState } from "react"
import apiInstance from "../api"
import axios from "axios"

export const Route: unknown = createLazyFileRoute("/login")({
  component: Login,
})

function Login() {
  const navigate = useNavigate({ from: "/login" })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) return

    try {
      await apiInstance.login(email, password)
      navigate({ to: "/" })
    } catch (err) {
      if (axios.isAxiosError(err)) setError(err.response?.data)
    }
    setLoading(false)
  }

  return (
    <Stack
      direction="row"
      margin={5}
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <Card sx={{ minWidth: "350px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Login</Typography>
              <TextField
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ inputProps: { required: true } }}
              />
              <TextField
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ inputProps: { required: true } }}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
              {isLoading && (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </div>
              )}
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  )
}
