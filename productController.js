const Product = require("../models/productModel.js");

exports.createProduct = async (req,res,next) => {
    try{

        const product = await Product.create(req.body);
        
        res.status(201).json({
            success:true,
            product
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllProducts = async (req,res)=>{
    const productCount = await Product.countDocuments();
    const product = await Product.find();
    res.status(200).json({
        success:true,
        message:"Route is working fine",
        product,
        productCount
    })
}

exports.getAllbyRating = async (req,res)=>{
    try{
        const product = await Product.find().sort({ ratings: -1 });

        res.status(200).json({
            success:true,
            product
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        // console.log(`Received request for salon with email: ${email}`);

        const salon = await Product.findOne({ email });

        if (salon) {
            // console.log(`Salon found: ${JSON.stringify(salon)}`);
            res.status(200).json({
                success: true,
                salon
            });
        } else {
            // console.log(`Salon not found for email: ${email}`);
            return res.status(404).json({
                success: false,
                message: "Salon not found"
            });
        }
    } catch (err) {
        // console.error(`Error occurred: ${err.message}`);
        res.status(500).json({
            success: false,
            message: "Error occurred",
            error: err.message
        });
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.loginSalon = async (req,res) => {
    const { email, password } = req.body;
    try{
        const product = await Product.findOne({email:email})

        if(product){
            if(product.password === password){
                res.status(200).json("exist");
            }
            else{
                res.status(404).json("nopassword");
            }
        }
        else{
            res.status(404).json("nouser");
        }
    }
    catch(err){
        console.error(`Error occurred: ${err.message}`);
        res.status(500).json({
            success: false,
            message: "Error occurred",
            error: err.message
        });
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { email } = req.params;
        let product = await Product.findOne({ email });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Salon not found",
            });
        }

        product = await Product.findOneAndUpdate(
            { email: email },req.body,
                {
                    new: true, // Return the updated document
                    runValidators: true, // Validate before updating
                    useFindAndModify: false // Use native findOneAndUpdate()
                }
        );

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
            error: err.message
        });
    }
};

exports.deleteProduct = async(req,res,next) => {
    try{
        const {email} = req.params;
        let product = await Product.findOne({email});
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Salon not found",
            });
        }

        await product.deleteOne({email});
        res.status(200).json({
            success: true,
            product
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Error occurred",
            error: err.message,
        });
        console.log(err);
    }
}