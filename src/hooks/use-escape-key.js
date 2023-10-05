import React from "react";

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
}