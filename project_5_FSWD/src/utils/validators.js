export function isEmail(str) {
  return /^\S+@\S+\.\S+$/.test(str)
}

export function isNotEmpty(str) {
  return str && str.trim().length > 0
}
