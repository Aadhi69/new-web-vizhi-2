export default function useWebGLAvailable() {
  // WebGL detection removed — always report unavailable to avoid WebGL codepaths.
  if (typeof window === "undefined") return false;
  return false;
}
