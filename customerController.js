const bcrypt = require("bcrypt");
const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");

// Create a new customer
exports.createCustomer = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await Customer.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message: "User exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({ ...req.body, password: hashedPassword });
        const token = jwt.sign({email:customer.email, id:customer._id},process.env.JWT_SECRET)
        res.status(201).json({
            success: true,
            user:customer,
            token:token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllCustomers = async (req,res)=>{
    const product = await Customer.find();
    res.status(200).json({
        success:true,
        message:"Route is working fine",
        product
    })
}

// Customer login
exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Customer.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(404).json({message:"Invalid Password"});
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},process.env.JWT_SECRET)
        res.status(201).json({
            success: true,
            user:existingUser,
            token:token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get customer by email
exports.getCustomerByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }
        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }
        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the customer ID matches the authenticated user ID
        if (req.userId !== id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        
        let customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }
        
        customer = await Customer.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        
        res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
            error: error.message
        });
    }
};
