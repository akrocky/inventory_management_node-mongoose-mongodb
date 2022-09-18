const { getProductsService, createProductService, updateProductService, bulkUpdateProductService ,deleteProductByIdService, bulkDeleteByIdProductService} = require("../services/product.services");


exports.getProducts= async(req,res,next)=>{
    try{
     
      //{price:{$gt:50}}
      let filters={...req.query};
     
    
      //sort,page,limit -> exclude
      const excludeFields=['sort','page','limit'];
      excludeFields.forEach(field=> delete filters[field] )

      //gt.lt,gte,lte,neq
      let filtersString=JSON.stringify(filters);
   
      filtersString=   filtersString.replace(/\b(gt|gte|lte|lt)\b/g,match=>`$${match}`)
    
      
      filters=JSON.parse(filtersString);
      console.log(filters);
      const queries={}
      if (req.query.sort) {
        const sortBy=req.query.sort.split(',').join(' ');

      queries.sortBy=sortBy;
      }
      if (req.query.fields) {
        const fields=req.query.fields.split(',').join(' ');

      queries.fields=fields;
      }
      if (req.query.page) {
        //50products
        //each page 10 product
    const {page=1, limit=10}=req.query
  const skip= (page-1)*parseInt(limit);
      queries.skip=skip;
      queries.limit=parseInt(limit);
      }
    
    const products=await getProductsService(filters,queries);  
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


  exports.updateProductById=async (req,res,next)=>{
    try {
      
      const {id}=req.params;
      const result= await updateProductService(id,req.body);
      res.status(200).send({
        status:'success',
        message:'Data updated sucessfully',
        data:result
      })
    } catch (error) {
      res.status(400).json({
        status:'fail',
      message:'Data did not updated',
      error:error.message
      })
    }
  }
  exports.bulkUpdateProductById=async (req,res,next)=>{
   
    try {
      
      const result= await bulkUpdateProductService(req.body);
      res.status(200).send({
        status:'success',
        message:'Data updated sucessfully',
        data:result
      })
    } catch (error) {
      res.status(400).json({
        status:'fail',
      message:'Data did not updated',
      error:error.message
      })
    }
  }
  exports.deleteProductById=async (req,res,next)=>{
   
    try {
      const {id}=req.params;
      const result= await deleteProductByIdService(id);
      res.status(200).send({
        status:'success',
        message:'product deleted sucessfully',
        data:result
      })
    } catch (error) {
      res.status(400).json({
        status:'fail',
      message:'Data did not updated',
      error:error.message
      })
    }
  }

  exports.bulkDeleteProductById=async (req,res,next)=>{
   
    try {
      
      
      const result= await bulkDeleteByIdProductService();
      res.status(200).send({
        status:'success',
        message:'products was deleted sucessfully',
        data:result
      })
    } catch (error) {
      res.status(400).json({
        status:'fail',
      message:'Data did not deleted',
      error:error.message
      })
    }
  }