const { FinancialRecord,User } = require('../models');

const createRecord = async (req,res,next) => {
    try{
        const {amount,type,category,date,notes} = req.body;

        if(!amount || !type || !category || !date){
            return res.status(400).json({
                message: 'amount, type, category, and date are required.'
            });
        }

        //Record object
        const record = await FinancialRecord.create({
            amount,
            type,
            category,
            date,
            notes,
            userId: req.user.userId
        });

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
            attributes: ["amount","type","category","date","notes"],
            include: {
                model: User,
                as: 'user',
                attributes: ["name","roleName"] 
            }
        });

        if(records.length == 0){
            //Not found..
            return res.status(400).json({
                message: "No records found."
            })
        }

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