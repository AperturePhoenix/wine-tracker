import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import type { Wine } from "wine-tracker-models"
import { useUser } from "../hooks"

export interface WineSummaryCardProps {
  wine: Wine
  onAddReview?: () => void
  onShowReview?: () => void
}

export default function WineSummaryCard({ wine, onAddReview, onShowReview }: WineSummaryCardProps): JSX.Element {
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
        <Button onClick={() => onShowReview?.()}>Show Reviews</Button>
        {user && <Button onClick={() => onAddReview?.()}>Add a Review</Button>}
      </CardActions>
    </Card>
  )
}
