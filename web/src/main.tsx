import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { useNuiEvent } from "./utils/useNuiEvent.ts";
import { addToast, ToastProvider, Button } from "@heroui/react";
import { fetchNui } from "./utils/fetchNui.ts";

export interface ToastProps {
  title: string;
  description: string;
  timeout?: number;
  className?: string;
  endContent?: React.ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "flat"
  radius?: 
    | "none"
    | "sm"
    | "md"
    | "lg"
    | "full";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";
}

// Define allowed toast placement values as a union type
export interface ToastPlacement{
  placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
}

type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

function NotificationSystem() {
  const [placement, setPlacement] = React.useState<PlacementType>("top-right");

  useNuiEvent<ToastProps>("toast", (data) => {
    if (data) {
      addToast(data);
    }
  });

  useNuiEvent<ToastPlacement>("toastPlacement", (data) => {
    if (data.placement) {
      setPlacement(data.placement);
    }
  });

  // set ready
  fetchNui("ready");

  useEffect(() => {
    // on press ESC, call close fetchNui
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        fetchNui("close");
      }
    }
  
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });

  // cretae button handle
  //@ts-ignore 
  const handleButtonClick = () => {
    return (
      <Button
        variant="solid"
        color="primary"
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50"
        onClick={() => {
          fetchNui("close");
        }}
      >
        Close
      </Button>
    )
  };

  return (
    <>
      <ToastProvider
        placement={placement}
        toastOffset={placement.includes("top") ? 60 : 0}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <main
        className="dark text-foreground bg-background"
        style={{ backgroundColor: "transparent" }}
      >
        <NotificationSystem />
      </main>
    </Provider>
  </React.StrictMode>
);
