import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Rating,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { type FormEvent, useEffect, useRef, useState } from "react"
import type { FormTypes, Review, ReviewWithUser, Wine } from "wine-tracker-models"
import { getReviews, getWines, createReview, updateReview } from "../api"
import ReviewCard from "../components/ReviewCard"
import WineCard from "../components/WineCard"
import { useUser } from "../hooks"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [wines, setWines] = useState<Wine[]>()
  const [selectedWine, setSelectedWine] = useState<Wine>()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    getWines().then(setWines).catch(console.error)
  }, [])

  const handleOpenReview = (wine: Wine) => () => {
    setSelectedWine(wine)
    setShowSidebar(true)
  }

  const handleCloseReview = () => setShowSidebar(false)

  return (
    <Stack direction="row">
      <Stack direction="column" spacing={2} margin={2} width="100%">
        <Stack direction="row" spacing={2}>
          <TextField label="Search" fullWidth />
          <Link to="/create-wine">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Wine
            </Button>
          </Link>
        </Stack>
        <Grid container spacing={2} left="-1rem" position="relative" columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {wines?.map((wine) => (
            <Grid item key={wine.id} xs={4}>
              <WineCard wine={wine} onShowReview={handleOpenReview(wine)} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack
        ref={drawerRef}
        direction="column"
        overflow="hidden"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            position: "fixed",
            right: 0,
            zIndex: 2,
          },
        })}
      >
        <Slide in={selectedWine && showSidebar} direction="left" container={drawerRef.current} unmountOnExit>
          <Stack
            direction="column"
            spacing={2}
            p={2}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                backgroundColor: theme.palette.background.default,
                width: "100vw",
                maxWidth: "100vw",
                height: "calc(100vh - 56px)",
                maxHeight: "calc(100vh - 56px)",
                overflow: "auto",
              },
            })}
          >
            <ReviewSidebar wine={selectedWine as Wine} onClose={handleCloseReview} />
          </Stack>
        </Slide>
      </Stack>
    </Stack>
  )
}

function ReviewSidebar({ wine, onClose }: { wine: Wine; onClose: () => void }): JSX.Element {
  const user = useUser()
  const [reviews, setReviews] = useState<ReviewWithUser[]>()
  const [hasReview, setHasReview] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (wine.id)
      getReviews(wine.id)
        .then((responseReviews) => {
          // show the logged in user's review first
          const found = user ? responseReviews.findIndex((review) => review.userId === user.id) : -1
          if (found !== -1) {
            setReviews([responseReviews[found], ...responseReviews.filter((_, i) => i !== found)])
            setHasReview(true)
          } else {
            setReviews(responseReviews)
            setHasReview(false)
          }
        })
        .catch(console.error)
  }, [wine, user])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmitReivew = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    const target = e.target as typeof e.target & FormTypes<Review>
    const newReview = {
      userId: user.id,
      wineId: wine.id,
      rating: Number(target.rating.value),
      wouldBuyAgain: Boolean(target.wouldBuyAgain.checked),
      sweetness: Number(target.sweetness.value),
      notes: target.notes.value,
    }
    if (hasReview && reviews) await updateReview({ ...newReview, id: reviews[0].id })
    else await createReview(newReview)

    handleClose()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmitReivew}>
          <DialogTitle>Review For {wine.name}</DialogTitle>
          <DialogContent sx={{ minWidth: "300px" }}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography component="legend">Rating</Typography>
                <Rating name="rating" precision={0.5} defaultValue={hasReview && reviews ? reviews[0].rating : 0} />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography component="legend">Sweetness</Typography>
                <Rating
                  name="sweetness"
                  precision={0.5}
                  defaultValue={hasReview && reviews ? reviews[0].sweetness : 0}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography component="legend">Would by again</Typography>
                <Checkbox
                  name="wouldBuyAgain"
                  icon={<CancelIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  sx={{
                    color: "red",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
              </Stack>
              <TextField
                label="Notes"
                name="notes"
                defaultValue={hasReview && reviews ? reviews[0].notes : ""}
                variant="filled"
                multiline
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClickCapture={handleClose}>Close</Button>
            <Button type="submit">{hasReview ? "Update" : "Submit"}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Paper>
        <Stack direction="row" p={2} alignItems="center">
          <Typography variant="h5">
            {[wine.year, wine.brand, wine.name].filter((v) => v != null && v !== "").join(" ")} Reviews
          </Typography>
          {user && !hasReview && (
            <IconButton onClick={handleOpen} color="primary">
              <AddIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          )}
          <IconButton color="primary" onClick={onClose}>
            <CloseIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Stack>
      </Paper>
      {reviews?.map((review, i) => (
        <ReviewCard key={review.id} review={review} handleEdit={hasReview && i === 0 ? handleOpen : undefined} />
      ))}
    </>
  )
}
