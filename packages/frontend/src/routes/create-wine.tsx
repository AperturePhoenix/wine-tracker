import { Stack, Card, CardContent, Typography, TextField, Button } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import type { FormEvent } from "react"
import type { FormTypes, Wine } from "wine-tracker-models"
import { createWine } from "../api"

export const Route = createFileRoute("/create-wine")({
  component: CreateWine,
})

function CreateWine(): JSX.Element {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & FormTypes<Wine>
    await createWine({
      name: target.name.value,
      brand: target.brand.value,
      year: Number(target.year.value),
      type: target.type.value,
      alcoholContent: Number(target.alcoholContent.value),
      region: target.region.value,
      country: target.country.value,
      description: target.description.value,
      image: target.image.value,
    })
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
              <Typography variant="h5">Add Wine</Typography>
              <TextField label="Name" name="name" InputProps={{ inputProps: { required: true } }} />
              <TextField label="Brand" name="brand" InputProps={{ inputProps: { required: true } }} />
              <TextField
                label="Year"
                name="year"
                type="number"
                InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }}
              />
              <TextField label="Type" name="type" />
              <TextField label="Alcohol Content" />
              <TextField label="Region" name="region" />
              <TextField label="Country" name="country" />
              <TextField label="Description" name="description" />
              <TextField label="TODO: Add image upload" />
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
