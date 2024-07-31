import { Card, CardContent, Stack, Typography } from "@mui/material"
import type { Wine } from "wine-tracker-models"

export interface WineCardProps {
  wine: Wine
}

export default function WineCard({ wine }: WineCardProps): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5">{wine.name}</Typography>
            <Typography variant="h5" color="text.secondary">
              {wine.brand}
            </Typography>
            {wine.year && (
              <Typography variant="h5" color="text.secondary">
                ({wine.year})
              </Typography>
            )}
          </Stack>
          <Typography>Type: {wine.type}</Typography>
          <Typography>Alcohol Content: {wine.alcoholContent}</Typography>
          <Typography>Region: {wine.region}</Typography>
          <Typography>Country: {wine.country}</Typography>
          <Typography>Description: {wine.description}</Typography>
        </Stack>
        <Stack direction="column" mt={8}>
          <Typography variant="h5">Reviews</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
