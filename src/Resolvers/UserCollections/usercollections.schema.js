import mongoose from 'mongoose'
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import bcrypt from 'bcryptjs';
import Authorize from "../../utils/roleAuthorization";
import mongoosePaginate from 'mongoose-paginate';

//Converting time to American UTC -5
let time = moment.tz(Date.now(), 'America/Cancun').format();
let unix = Date.parse(time);

const userSchema = new mongoose.Schema (
    {
        fullName: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        Address: {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "student", "therapist"]
        },
        verified: {
            type: Boolean,
        },
        password: {
            type: String,
        },
        email: {
            type: String
        },
        confirmedAt: {
            type: Date,
            default: null
        },
        sentAt: {
            type: Date,
            default: () => Date.now() + 3*60*60*1000
        },
        coords: {
            lat: {
                type: String
            },
            long: {
                type: String
            }
        },
        img: {
            type: String
        }
    },{
        timestamps: { currentTime: () => unix - 5*3600*1000},
    }
)
userSchema.plugin(mongoosePaginate);
//SignIn Logic
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare( password, user.password );
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;

}



// Generate Json Web Token for Registration
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const secretKey = process.env.SIGNATURE_KEY;
    const token = await jwt.sign({ _id: user._id.toString()}, secretKey, {expiresIn: 3*60*60*1000});
    console.log(token)
    return token
}

//Generate password hash
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

// Checking Role Authorization
userSchema.methods.roleAuthorization = function (collection, action) {
    if ( Authorize[this.role][collection][action] === false){
        throw new Error('Access Denied');
    } else {
        return true
    }
};

const User = mongoose.model('user_collections', userSchema, 'user_collections');
export default User;

