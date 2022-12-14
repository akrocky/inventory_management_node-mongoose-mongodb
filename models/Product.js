const  mongoose  = require("mongoose");
//schema design
const productSchema=mongoose.Schema({
    name:{
      type:String,
      required:[true,"Please prove a name for this product."],
      trim:true,
      unique:[true,"name must be unique"],
      minLength:[3,"Name must be at least 3 characters"],
      maxLength:[100,"Name is too large"]
    },
    description:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true,
      min:[0,"price cannot be negative"]
    },
    unit:{
      type:String,
      required:true,
      enum:{
        values:["kg","litre","pcs"],
      message:"unit value can't be {VALUE}, must be kg/litre/pcs"}
    },
    quantity:{
      type:Number,
      required:true,
      min:[0,"quantity cannot be negative"],
      validate:{
        validator:(value)=>{
          const isInteger=Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        }
      },
      message:"Quantity must be an integer"
    },
    status:{
      type:String,
      emun:{
        values:["in-stock","out-of-stock","discontinued"],
        message:"status can't be {VALUE}"
      }
    },
    // createdAt:{
    //   type:Date,
    //   default:Date.now
    // },
    // updated:{
    //   type:Date,
    //   default:Date.now
    // }
    // supplier:{
    //   type:mongoose.Schema.Types.ObjectId,
    //  ref:"Supplier"
    // },
    // categories:[{
    //   name:{
    //     type:String,
    //     required:true
    //   },
    //   _id:mongoose.Schema.Types.ObjectId
    // }]
    },
    
    {
      timestams:true
    });
    //mongoose middleware for saving data: pre / post
    //schema -> model -> query
    productSchema.pre('save',function (next) {
      //this means wich data comming
      if (this.quantity==0) {
        this.status='out-of-stock'
      }
      console.log('Before saving data');
      next();
    })
    // productSchema.post('save',function (doc,next) {
    //   console.log('After saving data');
    //   next();
    // })
    
    productSchema.methods.logger=function () {
      console.log(`Data saved for ${this.name}`)
    }
    const Product=mongoose.model('Product',productSchema);

    module.exports=Product;