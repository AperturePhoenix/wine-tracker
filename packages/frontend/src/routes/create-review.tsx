import { Stack, Card, CardContent, Typography, TextField, Button, Select, MenuItem } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import type { FormEvent } from "react"

export const Route = createFileRoute("/create-review")({
  component: CreateReview,
})

function CreateReview(): JSX.Element {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
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
              <Typography variant="h5">Create Review</Typography>
              <TextField label="Rating" name="rating" InputProps={{ inputProps: { required: true } }} />
              <Select label="Would Buy Again">
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
              <Select label="Sweetness">
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
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
