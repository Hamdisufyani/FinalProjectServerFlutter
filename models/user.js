const mangoose = require('mongoose');
const { productSchema } = require("./product");
const userSchema = mangoose.Schema({
    name:{
        required:true,
        type: String,
        trim: true
    },
    email:{
        required: true,
        type: String,
        trim:  true,
        validate: {
            validator: (value) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
            },
            message: "Please enter a valid email address",
          },
    
    },
    password: {
        required:true,
        type: String,
        trim: true,
    },
    address: {
        default: '',
        type: String,
        trim: true,
    },
    type:{
        type: String,
        default: 'user',
    },
    cart: [
        {
          product: productSchema,
          qty: {
            type: Number,
            required: true,
          },
        },
      ],
    });
    
 
const User =mangoose.model('User',userSchema);
module.exports=User;