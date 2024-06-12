import { Link, createLazyFileRoute } from "@tanstack/react-router"

export const Route: unknown = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <Link to="/create-wine">
        <h3>Create Wine</h3>
      </Link>
    </div>
  )
}
