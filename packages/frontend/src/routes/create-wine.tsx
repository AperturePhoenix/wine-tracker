import { Stack, Card, CardContent, Typography, Button, Grid } from "@mui/material"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import type { FormEvent } from "react"
import type { FormTypes, Wine } from "wine-tracker-models"
import { createWine } from "../api"
import GridTextField from "../components/GridTextField"

export const Route = createFileRoute("/create-wine")({
  component: CreateWine,
})

function CreateWine(): JSX.Element {
  const navigate = useNavigate({ from: "/create-wine" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & FormTypes<Wine>
    await createWine({
      name: target.name.value,
      brand: target.brand.value,
      year: target.year.value ? Number(target.year.value) : undefined,
      type: target.type.value,
      alcoholContent: target.alcoholContent?.value ? Number(target.alcoholContent.value) : undefined,
      region: target.region.value,
      country: target.country.value,
      description: target.description.value,
    })

    navigate({ to: "/" })
  }

  return (
    <Stack
      direction="row"
      margin={5}
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <div style={{ flex: 1 }} />
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" mb={2}>
              Add Wine
            </Typography>
            <Grid container spacing={2} columns={{ xs: 6 }} mb={2}>
              <GridTextField label="Name" name="name" InputProps={{ inputProps: { required: true } }} />
              <GridTextField label="Brand" name="brand" InputProps={{ inputProps: { required: true } }} />
              <GridTextField
                label="Year"
                name="year"
                type="number"
                InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }}
              />
              <GridTextField label="Type" name="type" />
              <GridTextField label="Alcohol Content" name="alcoholContent" />
              <GridTextField label="Region" name="region" />
              <GridTextField label="Country" name="country" />
              <GridTextField label="Description" name="description" />
              {/* <TextField label="TODO: Add image upload" /> */}
            </Grid>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <div style={{ flex: 1 }} />
    </Stack>
  )
}
