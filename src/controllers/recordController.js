const { FinancialRecord,User,Role } = require('../models');

const createRecord = async (req,res,next) => {
    console.log("INSIDE CREATE RECORD:", req.user);
    try{
        const {amount,type,category,date,notes} = req.body;

        if(!amount || !type || !category || !date){
            return res.status(400).json({
                message: 'amount, type, category, and date are required.'
            });
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate)) {
            return res.status(400).json({
                message: "Invalid date format. Use YYYY-MM-DD"
            });
        }

        //Record object
        const record = await FinancialRecord.create({
            amount: amount,
            type: type,
            category: category,
            date: new Date(date),
            notes: notes,
            userId: req.user.userId
        });
        console.log(record);
        //Resource created
        return res.status(201).json(record);
    }catch(err){
        next(err);
    }
}

const updateRecord = async(req,res,next) => {
    try{
        const record = await FinancialRecord.findByPk(req.params.id);
        if(!record){
            return res.status(404).json({
                message: "Record not found."
            });
        }
        const {amount,type,category,date,notes} = req.body;
        if(amount){
            record.amount = amount;
        }
        if(type){
            record.type = type;
        }
        if(category){
            record.category = category;
        }
        if(date){
            record.date = date;
        }
        if(notes){
            record.notes = notes;
        }

        //Save the record.
        await record.save();
        return res.json(record);
    }catch(err){
        next(err);
    }
}

const listRecords = async(req,res,next) => {
    try{
        const records = await FinancialRecord.findAll({
            attributes: ["id","amount","type","category","date","notes"],
            include: {
                model: User,
                as: 'user',
                attributes: ["id","name"],
                include: {
                    model: Role,
                    as: "role",
                    attributes: ["name"]
                } 
            }
        });

        if(records.length == 0){
            //Not found..
            return res.status(400).json({
                message: "No records found."
            })
        }

        //Successful Record fetch..
        return res.json(records);

    }catch(err){
        next(err)
    }
}

const deleteRecord = async (req, res, next) => {
    try {
        const record = await FinancialRecord.findByPk(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found.' });
        }
        //Destroy the instance.
        await record.destroy();
        return res.status(204).json({
            message: "Record successfully deleted."
        });
    } catch (err) {
        next(err);
    }
};

const findRecordById = async(req,res,next) => {
    try{
        const record = await FinancialRecord.findByPk(req.params.id);
        if(!record){
            return res.status(404).json({
                message: "Record not found."
            });
        }
        return res.json(record)
    }catch(err){
        next(err);
    }
}

module.exports = {createRecord,listRecords,updateRecord,deleteRecord,findRecordById}