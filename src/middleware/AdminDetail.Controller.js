import Admin from '../models/admin.model'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'

const createAdminDatail = async (res, req, next) => {
  console.log(fullName, branch)

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    return next(new Apperror('avatar file is required', 400))
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    return next(new Apperror('avatar file is required', 400))
  }
  const admin = await Admin.create({
    email,
    fullName,
    password,
    branch,
    subject,
    avatar: avatar.url,
    coverImage: coverImage?.url || ''
  })
}



export {
 createAdminDatail
}
