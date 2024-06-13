import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import type { Wine } from "wine-tracker-models"
import { useUser } from "../hooks"

export interface WineCardProps {
  wine: Wine
}

export default function WineCard({ wine }: WineCardProps): JSX.Element {
  const user = useUser()
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">{wine.name}</Typography>
          <Typography variant="h5" color="text.secondary">
            {wine.brand}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button>Show Reviews</Button>
        {user && <Button>Add a Review</Button>}
      </CardActions>
    </Card>
  )
}
