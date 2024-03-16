export function checkParameters(url, parameters) {
  const emptyParameters = []
  for (const key in parameters) {
    if (Object.hasOwn(parameters, key) && parameters[key] === undefined) {
      emptyParameters.push(key)
    }
  }
  if (emptyParameters.length > 0) {
    throw new Error(
      `${url}. Не все параметры переданы: ${emptyParameters.join(', ')}`
    )
  }
}
