import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/read-wines")({
  component: ReadWines,
})

function ReadWines(): JSX.Element {
  return <></>
}
