import Jwt from 'jsonwebtoken'

const generateToken = id => {
  return Jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}
export { generateToken }
