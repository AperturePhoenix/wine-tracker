import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { type FormEvent, useEffect, useRef, useState } from "react"
import type { FormTypes, Review, ReviewWithUser, Wine } from "wine-tracker-models"
import { getReviews, getWines, reviewWine } from "../api"
import ReviewCard from "../components/ReviewCard"
import WineCard from "../components/WineCard"
import { useUser } from "../hooks"

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
      <div style={{ flex: 1 }} />
      <Stack direction="column" spacing={2} flex={1} margin={2}>
        {wines?.map((wine) => (
          <WineCard key={wine.id} wine={wine} onShowReview={handleOpenReview(wine)} />
        ))}
        <div className="p-2">
          <Link to="/create-wine">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Wine
            </Button>
          </Link>
        </div>
      </Stack>
      <div style={{ flex: 1 }} />
      <Stack ref={drawerRef} direction="column" position="absolute" right={0} overflow="hidden">
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
                height: "calc(100vh - 64px)",
                maxHeight: "calc(100vh - 64px)",
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
    await reviewWine({
      userId: user.id,
      wineId: wine.id,
      rating: Number(target.rating.value),
      wouldBuyAgain: Boolean(target.wouldBuyAgain.value),
      sweetness: Number(target.sweetness.value),
      notes: target.notes.value,
    })
  }

  return (
    <>
      <Dialog open={isOpen}>
        <form onSubmit={handleSubmitReivew}>
          <DialogTitle>Review For {wine.name}</DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={2}>
              <TextField label="Rating" name="rating" variant="filled" fullWidth />
              <FormControl fullWidth variant="filled">
                <InputLabel>Would Buy Again</InputLabel>
                <Select label="Would Buy Again" name="wouldBuyAgain">
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Sweetness" name="sweetness" variant="filled" fullWidth />
              <TextField label="Notes" name="notes" variant="filled" fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClickCapture={handleClose}>Close</Button>
            <Button type="submit">Submit</Button>
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
