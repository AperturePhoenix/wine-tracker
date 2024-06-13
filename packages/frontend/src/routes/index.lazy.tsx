import { Stack } from "@mui/material"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type { Wine } from "wine-tracker-models"
import { getWines } from "../api"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const [wines, setWines] = useState<Wine[]>()

  useEffect(() => {
    getWines().then(setWines).catch(console.error)
  }, [])

  return (
    <Stack direction="column" spacing={2}>
      {wines?.map((wine) => (
        <Stack key={wine.id}>{wine.name}</Stack>
      ))}
      <div className="p-2">
        <Link to="/create-wine">
          <h3>Create Wine</h3>
        </Link>
      </div>
    </Stack>
  )
}
