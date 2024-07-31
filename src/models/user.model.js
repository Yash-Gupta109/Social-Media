import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // so in every bd specialluy in mongoDB so agar kisi bhi feild ko agar aap ko searchable banana hai aur optimize tarike se 
        // to uska index true kar do isse kya hota hai ki obviously thoda expensive ho jata hai lekin utna bhi nhi so if we will make it true so isse kya hoga ki ye database ki searching me aane lagega 
        // so abhi ke liye bus itna jaan lijiye ki agar kisi bhi feild pe searching on karni hai to index true karna jyada behtar option hota hai 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, //we will use cloudinary url
        required: true,
    },
    coverImage: {
        type: String,  //we will use cloudinary url
    },
    watchHistory: [
        {type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
    },
},{timestamps: true})

userSchema.pre("save", async function(next) {
    // we are doing this chech because if we will not do this so it will always encrypt the password if user will change anything so we want if useer change anything only in the password then we change 
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// in this we can also make custom hooks

// as we know bcrypt librart hash the password so it can also check the password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)