import DetailAdmin from '../models/AdminDetail.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const createAdminDatail = async (req, res, next) => {
  console.log('hiiii')
  console.log('files>>>', req.file)
  try {
    const { fullName, branch, subs, adminId } = req.body

    console.log(fullName, branch, subs, adminId)

    const adminDetails = await DetailAdmin.create({
      adminId,
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

    await adminDetails.save()
  } catch (error) {
    console.log(error)
  }
}

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log('id.........', id)
    console.log('get-Profile..................')
    const adminId = id
    const adminDetails = await DetailAdmin.findOne({ adminId })

    res.status(200).json({
      success: true,
      message: 'create admin profile',
      adminDetails
    })

    console.log('adminDetails', adminDetails)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed admin profile',
      error
    })
  }
}

export { createAdminDatail, getProfile }
