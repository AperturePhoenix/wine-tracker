import type { ReviewWithUser } from "wine-tracker-models"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import { Card, CardContent, IconButton, Rating, Stack, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

export interface ReviewCardrops {
  handleEdit?: () => void
  review: ReviewWithUser
}

export default function ReviewCard({ handleEdit, review }: ReviewCardrops): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="center" position="relative">
            <AccountCircleRoundedIcon sx={{ width: 50, height: 50 }} />
            <Stack direction="column" justifyItems="center" alignItems="center">
              <Typography>
                {review.firstName} {review.lastName}
              </Typography>
              <Rating value={review.rating} readOnly />
            </Stack>
            {handleEdit && (
              <IconButton onClick={handleEdit} color="primary" sx={{ position: "absolute", right: 0, top: 0 }}>
                <EditIcon />
              </IconButton>
            )}
          </Stack>
          <Typography variant="subtitle2">Would Buy Again: {review.wouldBuyAgain ? "Yes" : "No"}</Typography>
          <Typography variant="subtitle2">Sweetness: {review.sweetness}</Typography>
          <Typography>{review.notes}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
