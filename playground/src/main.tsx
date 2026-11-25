import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TipProvider, trackPointer } from "@voga/ui";
import { App } from "./App";
import "./app.css";

// O anel de foco só aparece para quem navega pelo teclado.
trackPointer();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TipProvider delayDuration={200}>
      <App />
    </TipProvider>
  </StrictMode>,
);
