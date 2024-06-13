import { Stack } from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type { Wine } from "wine-tracker-models"
import { getWines } from "../api"
import WineCard from "../components/WineCard"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const [wines, setWines] = useState<Wine[]>()

  useEffect(() => {
    getWines().then(setWines).catch(console.error)
  }, [])

  return (
    <Stack direction="row">
      <div style={{ flex: 1 }} />
      <Stack direction="column" spacing={2} flex={1} margin={2}>
        {wines?.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
        <div className="p-2">
          <Link to="/create-wine">
            <h3>Create Wine</h3>
          </Link>
        </div>
      </Stack>
      <div style={{ flex: 1 }} />
    </Stack>
  )
}
