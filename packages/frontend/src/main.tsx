import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@styles/index.css"
import { App } from "./App.tsx"

// biome-ignore lint: linter mistake
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
