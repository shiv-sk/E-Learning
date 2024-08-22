const Category = require("../model/category.model");

//creating a new category
exports.newCategory = async(req,res)=>{
    try {
        const {title} = req.body;
        if(!title){
            return res.status(400).json({
                status:"fail",
                message:"title is required"
            })
        }
        const existcategory = await Category.findOne({title});
        if(existcategory){
            return res.status(400).json({
                status:"fail",
                message:"category should be unique"
            })
        }
        const category = await Category.create({
            title,
        })
        return res.status(201).json({
            status:"success",
            message:"Category is created",
            category
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get a category
exports.getCategory = async (req,res)=>{
    try {
        const category = await Category.findById(req.params.categoryId);
        if(!category){
            return res.status(404).json({
                status:"fail",
                message:"category is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"the category is",
            category
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get all category
exports.getAllCategory = async(req,res)=>{
    try {
        const categories = await Category.find();
        if(categories.length === 0){
            return res.status(404).json({
                status:"fail",
                message:"categories are not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"categories are",
            categories
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//update the category
exports.updateCategory = async(req,res)=>{
    const {categoryId} = req.params;
    if(!categoryId){
        return res.status(400).json({
            status:"fail",
            message:"category id is required"
        })
    }
    const category = await Category.findByIdAndUpdate(categoryId , req.body , {new:true}).exec();
    if(!category){
        return res.status(404).json({
            status:"fail",
            message:"category is not found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"updated category is",
        category
    })
}

//delete category
exports.deletCategory = async(req,res)=>{
    try {
        const {categoryId} = req.params;
        if(!categoryId){
            return res.status(400).json({
                status:"fail",
                message:"category id is required"
            })
        }
        const category = await Category.findByIdAndDelete(categoryId);
        if(!category){
            return res.status(404).json({
                status:"success",
                message:"category is not found"
            })
        }
        return res.status(204).json({})
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}