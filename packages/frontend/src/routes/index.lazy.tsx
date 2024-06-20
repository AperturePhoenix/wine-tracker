import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { type FormEvent, useCallback, useEffect, useState } from "react"
import type { FormTypes, Review, Wine } from "wine-tracker-models"
import { getWines, reviewWine } from "../api"
import WineCard from "../components/WineCard"
import { useUser } from "../hooks"
import AddIcon from "@mui/icons-material/Add"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const user = useUser()
  const [wines, setWines] = useState<Wine[]>()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWine, setSelectedWine] = useState<Wine>()

  useEffect(() => {
    getWines().then(setWines).catch(console.error)
  }, [])

  const handleOpenReview = useCallback(
    (wine: Wine) => () => {
      setIsOpen(true)
      setSelectedWine(wine)
    },
    [],
  )

  const handleCloseReview = useCallback(() => {
    setIsOpen(false)
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
      <Dialog open={isOpen}>
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
      </Dialog>
      <div style={{ flex: 1 }} />
      <Stack direction="column" spacing={2} flex={1} margin={2}>
        {wines?.map((wine) => (
          <WineCard key={wine.id} wine={wine} onAddReview={handleOpenReview(wine)} />
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
    </Stack>
  )
}
