import { createLazyFileRoute } from "@tanstack/react-router"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Index Page</h3>
    </div>
  )
}
