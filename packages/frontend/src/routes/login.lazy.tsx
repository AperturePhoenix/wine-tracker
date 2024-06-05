import { createLazyFileRoute } from "@tanstack/react-router"

export const Route: unknown = createLazyFileRoute("/login")({
  component: Login,
})

function Login() {
  return <>This is the login page</>
}
