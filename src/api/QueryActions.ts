export function parseQuery(query: string) {
  const parsedQuery = `{${query
    .replaceAll("%22", '"')
    .replaceAll("%3A", ":")
    .replaceAll("%2C", ",")
    .replaceAll("%5B", "[")
    .replaceAll("%5D", "]")}}`
  return JSON.parse(parsedQuery)
}

export function stringifyQuery(object: Object) {
  return JSON.stringify(object).replaceAll("{", "").replaceAll("}", "")
}
