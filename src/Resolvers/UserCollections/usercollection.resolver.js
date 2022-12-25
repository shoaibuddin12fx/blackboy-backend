import User from './usercollections.schema.js'
import sendSMS from '../../utils/sendSMS.js'

const userResolver = {

    Query: {
        async signIn( parent, args, { request }, info ) {
            try {
                const user = await User.findByCredentials(args.data.email, args.data.password);
               
                const token = await user.generateAuthToken();
  
                return {
                    token, 
                    logged: true, 
                    email: user.email, 
                    role: user.role, 
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    img: user.img, 
                    _id: user._id,
                    }
            } catch (e) {
                throw new Error(e);
            }
        },

        async getUser( parent, args, { request }, info ) {
           try{
              
            let obj = { ...args }
            if (args.page >= 0 || args.limit >= 0) {
                delete obj.page
                delete obj.limit 
            }
            
               const user = await User.paginate(obj, {limit: args.limit, offset: args.page})
               return {
                   user: user.docs,
                   offset: user.offset,
                   limit: user.limit,
                   totalItem: user.total
               }
           } catch (e) {
               throw new Error(e);
           }
        }

        
    },

    Mutation: {

        async forgotPassword(parent, args, { request }, info) {
            try {

            } catch (e) {

            }
        },

        async updateUser(parent, args, { request }, info ) {
            try {
                const user = await User.findOneAndUpdate(
                    {_id: args.id},
                    {"$set":{...args.data}}
                );
                console.log(user)
                return user
                // if (user) {
                //     return{ updated: true }
                // } else {
                //     return{ updated: false }
                // }
            } catch (e) {

            }
        },
        async signUp(parent, args, { request }, info) {
           try {
               const user = await User.create({ ...args.data });
               const code = sendSMS(user.phoneNumber, user.fullName, user._id);
               const token = await user.generateAuthToken();
               return {token:token,user:user,code:code};
           } catch (e) {
               throw new Error(e);
           }
        },
        async deleteUser( parent, args, { currentUser}, info ) {
            try {
                const user = await User.findOneAndDelete({ _id: args.id });
                return user
            } catch (e) {
                throw new Error(e);
            }
        }
    }
}

export default userResolver;
