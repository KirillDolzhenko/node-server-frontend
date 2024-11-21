export function getRTKError(response: unknown): string {
  if (
    response instanceof Object &&
    "data" in response &&
    response.data instanceof Object &&
    "data" in response.data &&
    response.data.data instanceof Object &&
    "error" in response.data.data &&
    typeof response.data.data.error == "string" &&
    "status" in response &&
    typeof response.status === "number"
  ) {
    return `${response.status} ${response.data.data.error}`;
  }

  return "An Error Has Occured";
}
