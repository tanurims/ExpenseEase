const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Income = require("../models/Income");

//add income 
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {

        const {icon,source,amount,date} = req.body;

        //validation
        if( !source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
        
    } catch (error) {
        res.status(500).json({message: "Server Error"});
        
    }

}

//get all income 
exports.getAllIncome = async (req, res) => {

}

//delete income 
exports.deleteIncome = async (req, res) => {

}

//download excel 
exports.downloadIncomeExcel = async (req, res) => {

}
