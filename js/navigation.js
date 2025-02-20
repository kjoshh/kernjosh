function isInternalNavigation() {
  if (sessionStorage.getItem("isInternalNavigation") === "true") {
    sessionStorage.removeItem("isInternalNavigation");
    return true;
  }
  return false;
}
