import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import "./main.css"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C32148",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#78081C",
        },
      },
    },
  },
})

// biome-ignore lint/style/noNonNullAssertion: react boilerplate code
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  )
}
