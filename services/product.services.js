const Product=require('../models/Product')
exports.getProductsService=async(filters,queries)=>{
    console.log(queries)
    const products= await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
    const total=await Product.countDocuments(filters)
    const page=Math.ceil(total/queries.limit)
    return {total,page,products};
}

exports.createProductService=async(data)=>{
    const product=new Product(data);
    const result =await product.save();
    return result;
}

exports.updateProductService=async (productId,data)=>{
    const result= await Product.updateOne({_id:productId},{$inc:data},{
        runValidators:true
    });
//     const product=await Product.findById(productId);
//   const result=await  product.set(data).save();
    return result;
}
exports.bulkUpdateProductService= async (data)=>{
    // console.log(data);
    // const result= await Product.updateMany({_id:data.ids},data.data,{
    //     runValidators:true
    // })
    const products=[];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id:product.id},product.data))
    });
   const result=await Promise.all(products) 
   
    return result;
};

exports.deleteProductByIdService=async(id)=>{
    const result=await Product.deleteOne({_id:id});
    return result;
}

exports.bulkDeleteByIdProductService= async ()=>{
     
    const result= await Product.deleteMany({})
   
return result;
}