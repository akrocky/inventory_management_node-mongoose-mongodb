const { getProductsService, createProductService } = require("../services/product.services");


exports.getProducts= async(req,res,next)=>{
    try{
    const products=await getProductsService();  
  res.status(200).json({
    status:"success",
    data:products
  })
  
    }catch(err){
      res.status(400).json({
        status:"fail",
        message:"can't get the data",
        error:err.message
      })
    }
  };

  exports.addProducts=async(req,res,next)=>{
    //save or create
  try{
  
    const result= await createProductService(req.body)
    
     res.status(200).send({
       status:'success',
       message:'Data inserted sucessfully',
       data:result
     })
  }catch(error){
  res.status(400).json({
    status:'fail',
  message:'Data is not inserted',
  error:error.message
  })
  }
   
  };