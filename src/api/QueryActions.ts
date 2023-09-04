export function parseQuery(query: string) {
  const parsedQuery = `{${decodeURIComponent(query)}}`
  return JSON.parse(parsedQuery)
}

export function stringifyQuery(object: Object) {
  return JSON.stringify(object).replaceAll("{", "").replaceAll("}", "")
}
