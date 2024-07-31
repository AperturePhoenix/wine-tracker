import { Button, IconButton, Paper, Rating, Stack, Typography } from "@mui/material"
import type { Wine } from "wine-tracker-models"
import { useUser } from "../hooks"
import stockPhoto from "./example photo.jpg"
import WineBarIcon from "@mui/icons-material/WineBar"
import LocationIcon from "@mui/icons-material/LocationOnOutlined"
import BubbleChartIcon from "@mui/icons-material/BubbleChartOutlined"
import CommentIcon from "@mui/icons-material/Comment"

export interface WineCardProps {
  wine: Wine
  onAddReview?: () => void
  onShowReview?: () => void
}

export default function WineCard({ wine, onAddReview, onShowReview }: WineCardProps): JSX.Element {
  const user = useUser()
  return (
    <Paper sx={{ maxWidth: 450, overflow: "hidden" }}>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" p={2} width="100%">
          <Stack direction="column" height="100%" spacing={1}>
            <Typography variant="h5">
              {[wine.year, wine.brand, wine.name].filter((v) => v != null && v !== "").join(" ")}
            </Typography>
            {wine.alcoholContent && (
              <Typography display="flex">
                <BubbleChartIcon />
                {wine.alcoholContent}% ABV
              </Typography>
            )}
            {wine.type && (
              <Typography display="flex">
                <WineBarIcon /> {wine.type}
              </Typography>
            )}
            {(wine.region || wine.country) && (
              <Typography display="flex">
                <LocationIcon />
                {[wine.region, wine.country].filter((v) => v != null && v !== "").join(", ")}
              </Typography>
            )}
            {wine.rating ? (
              <Rating value={wine.rating} precision={0.5} readOnly />
            ) : (
              <Typography>Be the first one to rate this</Typography>
            )}
          </Stack>
          <Stack direction="row">
            <IconButton onClick={() => onShowReview?.()}>
              <CommentIcon />
            </IconButton>
          </Stack>
          {user && <Button onClick={() => onAddReview?.()}>Add a Review</Button>}
        </Stack>
        <img alt={`${wine.name}`} src={stockPhoto} width={125} height={300} />
      </Stack>
    </Paper>
  )
}
