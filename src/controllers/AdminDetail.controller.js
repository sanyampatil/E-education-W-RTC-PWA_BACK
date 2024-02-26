import DetailAdmin from '../models/AdminDetail.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const createAdminDatail = async (req, res, next) => {
  console.log('hiiii')
  console.log('files>>>', req.file)
  try {
    const { fullName, branch, subs } = req.body
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
        folder: 'avatar',
        width: 250,
        height: 250
      })

      console.log('result', result)
      if (result) {
        adminDetails, (adminDetails.avatar.public_id = result.public_id)
        adminDetails.avatar.secure_url = result.secure_url
      }

      fs.rm(`uploads/${req.file.filename}`)
    }

    res.status(200).json({
      success: true,
      message: 'create admin profile',
      adminDetails
    })

    await adminDetails.save ()
  } catch (error) {
    console.log(error)
  }
}

const getProfile = async (req, res, next) => {
  console.log('get-Profile..................')
  console.log(req.adminDetails)
  console.log(req)
  // const {_id} = req.adminDetails
  // const adminDetails = await DetailAdmin.find({})
  console.log('hiiii')
  console.log('req>>', req.body)
  res.status(200).json({
    msg: 'hiiiiii'
  })
}

export { createAdminDatail, getProfile }
