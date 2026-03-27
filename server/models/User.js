import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    credits : {
        type: Number,
        default: 20
    }
});
//hash the password before saving the user
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
   
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
   
// });
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
          return next();
         }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

      
    } catch (error) {
     
    return res.status(500).json({
        success: false,
        message: error.message
    });
}
    
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
// const User = mongoose.model("User", userSchema);
// export default User;