import { useEffect, useState } from "react";

export default function useWebGLAvailable() {
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglAvailable(Boolean(context));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  return webglAvailable;
}
