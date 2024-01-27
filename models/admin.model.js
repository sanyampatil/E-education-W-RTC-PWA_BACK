import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const adminSchema = new Schema(
    {
        
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        
        password: {
            type: String,
            required: [true, 'Password is required']
        },
       

    },
    {
        timestamps: true
    }
)

// adminSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// adminSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

// adminSchema.methods.generateAccessToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
            
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:'24h'
//         }
//     )
// }
// adminSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,

//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export const Admin = mongoose.model("admin", adminSchema)