
import { uploadOnCloudinary } from '../utils/Cloudinary.js'

const createAdminDatail = async (res, req, next) => {
 const {fullName,branch} = req.body
  console.log(fullName, branch)

  // const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //   return next(new Apperror('avatar file is required', 400))
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar) {
  //   return next(new Apperror('avatar file is required', 400))
  // }
  const admin = await DetailAdmin.create({
    
    fullName,
    branch,
    subject,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || ''
  })
}



export {
 createAdminDatail
}