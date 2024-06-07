import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { createLazyFileRoute } from "@tanstack/react-router"
import { type FormEvent, useState } from "react"
import API from "../api"

export const Route: unknown = createLazyFileRoute("/login")({
  component: Login,
})

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    const api = API.getInstance()
    api.login(email, password)
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
              <Typography variant="h5">Login</Typography>
              <TextField label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
