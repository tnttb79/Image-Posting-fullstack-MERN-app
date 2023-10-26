import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
  // get the token
  const token = req.headers.authorization.split(" ")[1] 

  // verify if the token is valid
  if (!token) return res.status(403).json({message: "No token provided"})

  try {
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  req.userId = decoded.id
  // pass control to the next controller
  next()

} catch (error) {
  console.log(error)
  res.status(403).json({message: "Unauthorized"})
}
  
}