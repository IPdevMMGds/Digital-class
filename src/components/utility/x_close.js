export function return_(navigate, path = "/") {
  if (typeof navigate === "function") {
    navigate(path);
  } else {
    console.error("navigate must be a function");
  }
}