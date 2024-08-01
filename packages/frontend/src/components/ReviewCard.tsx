import type { ReviewWithUser } from "wine-tracker-models"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import { Card, CardContent, Rating, Stack, Typography } from "@mui/material"

export interface ReviewCardrops {
  review: ReviewWithUser
}

export default function ReviewCard({ review }: ReviewCardrops): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1} maxWidth="30vw">
          <Stack direction="row" alignItems="center" width="100%">
            <AccountCircleRoundedIcon sx={{ width: 50, height: 50 }} />
            <Stack direction="column" justifyItems="center" alignItems="center">
              <Typography>
                {review.firstName} {review.lastName}
              </Typography>
              <Rating value={review.rating} readOnly />
            </Stack>
          </Stack>
          <Typography variant="subtitle2">Would Buy Again: {review.wouldBuyAgain ? "Yes" : "No"}</Typography>
          <Typography variant="subtitle2">Sweetness: {review.sweetness}</Typography>
          <Typography>{review.notes}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
