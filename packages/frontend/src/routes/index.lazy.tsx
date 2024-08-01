import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import { Button, IconButton, Paper, Slide, Stack, Typography } from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"
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
  const user = useUser()
  const [wines, setWines] = useState<Wine[]>()
  const [selectedWine, setSelectedWine] = useState<Wine>()

  useEffect(() => {
    getWines().then(setWines).catch(console.error)
  }, [])

  const handleOpenReview = useCallback(
    (wine: Wine) => () => {
      setSelectedWine(wine)
    },
    [],
  )

  const handleCloseReview = useCallback(() => {
    setSelectedWine(undefined)
  }, [])

  const handleSubmitReivew = async (e: FormEvent) => {
    if (!user || !selectedWine) return
    e.preventDefault()

    const target = e.target as typeof e.target & FormTypes<Review>
    await reviewWine({
      userId: user.id,
      wineId: selectedWine.id,
      rating: Number(target.rating.value),
      wouldBuyAgain: Boolean(target.wouldBuyAgain.value),
      sweetness: Number(target.sweetness.value),
      notes: target.notes.value,
    })
    handleCloseReview()
  }

  return (
    <Stack direction="row">
      {/* <Dialog open={isOpen}>
        <form onSubmit={handleSubmitReivew}>
          <DialogTitle>Review For {selectedWine?.name}</DialogTitle>
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
            <Button onClickCapture={handleCloseReview}>Close</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog> */}
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
        <Slide in={selectedWine != null} direction="left" container={drawerRef.current} unmountOnExit>
          <Stack direction="column" spacing={2} margin={2}>
            <ReviewSidebar wineId={selectedWine?.id} onClose={handleCloseReview} />
          </Stack>
        </Slide>
      </Stack>
    </Stack>
  )
}

function ReviewSidebar({ wineId, onClose }: { wineId?: number; onClose: () => void }): JSX.Element {
  const [reviews, setReviews] = useState<ReviewWithUser[]>()

  useEffect(() => {
    if (wineId) getReviews(wineId).then(setReviews).catch(console.error)
  })

  return (
    <>
      <Paper>
        <Stack direction="row" p={2} alignItems="center">
          <Typography variant="h5">Reviews</Typography>
          <div style={{ width: "100%" }} />
          <IconButton color="primary">
            <AddIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton color="primary" onClick={onClose}>
            <CloseIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Stack>
      </Paper>
      {reviews?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  )
}
