import DetailAdmin from '../models/AdminDetail.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const createAdminDatail = async (req, res, next) => {
  console.log('hiiii')
  console.log('files>>>', req.file)
  try {
    const { fullName, branch, subs,avatar } = req.body
    console.log(fullName, branch, subs)

    const adminDetails = await DetailAdmin.create({
      fullName, 
      branch,
      subs,
      avatar: {
        public_id: '',
        secure_url: ''  
    }
    })

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "avatar",
          width: 250,
          height: 250,

      });
      console.log("result",result)
      if (result) {
          adminDetails.avatar.public_id = result.public_id
          adminDetails.avatar.secure_url = result.secure_url
      }

    
      fs.rm(`uploads/${req.file.filename}`)
  }

   

    res.status(200).json({
      sucess: true,
      adminDetails
    })
  } catch (error) {
    console.log(error)
  }
}

export { createAdminDatail }
