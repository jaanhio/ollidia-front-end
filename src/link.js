export const baseLink = () => {
  let baseLink;
  if (window.location.hostname === 'localhost') {
    baseLink = 'http://localhost:3001'
  } else {
    baseLink = 'https://ollida-api.herokuapp.com'
  }
  return baseLink;
}
