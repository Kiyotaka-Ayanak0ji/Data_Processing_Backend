const { FinancialRecord, Sequelize } = require("../models");
const { Op } = require("sequelize");

const getSummary = async (req,res,next) => {
    try{
        //Fetch start and end dates..
        const {startDate,endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                message: "Please provide the startDate and endDate"
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if(isNaN(start) || isNaN(end)){
            return res.status(400).json({
                message: "Please enter the date in valid format YYYY-MM-DD"
            });
        }

        //Common date filter
        const dateFilter = {
            date: {
                [Op.gte]: start,
                [Op.lte]: end
            }
        }
        // //Instead of doing serial fetching of data
        // const totalIncome = await FinancialRecord.sum("amount",{
        //     where: {
        //         date: {
        //             [Op.gte]: startDate,
        //             [Op.lte]: endDate
        //         },
        //         type: "income"
        //     }
        // });

        // const totalExpense = await FinancialRecord.sum("amount",{
        //     where: {
        //         date: {
        //             [Op.gte]: startDate,
        //             [Op.lte]: endDate
        //         },
        //         type: "expense"
        //     }
        // });

        // const categoryTotals = await FinancialRecord.findAll({
        //     attributes: [
        //         "category",
        //         "type",
        //         [Sequelize.fn("SUM",Sequelize.col("amount")),"total"]
        //     ],
        //     where:{
        //         date: {
        //             [Op.gte]: startDate,
        //             [Op.lte]: endDate
        //         },
        //     },
        //     group: ["category","type"]
        // });

        // const recentActivity = await FinancialRecord.findAll({
        //     where : {
        //         date: {
        //             [Op.gte]: startDate,
        //             [Op.lte]: endDate
        //         }
        //     },
        //     limit: 10,
        //     order: [["date","DESC"],["createdAt","DESC"]]
        // });

        //Fetch the data parallely
        const [totalIncome,totalExpense,categoryTotals,recentActivity] = await Promise.all([
            FinancialRecord.sum("amount",{
                where:{...dateFilter,type: "income"}
            }),
            FinancialRecord.sum("amount",{
                where:{...dateFilter,type: "expense"}
            }),
            FinancialRecord.findAll({
                attributes: [
                    "category",
                    "type",
                    [Sequelize.fn("SUM",Sequelize.col("amount")),"total"]
                ],
                where: dateFilter,
                group: ["category","type"]
            }),
            FinancialRecord.findAll({
                where: dateFilter,
                limit: 10,
                order: [["date","DESC"],["createdAt","DESC"]]
            })
        ]);

        //Handle null values.
        const income = Number(totalIncome) || 0;
        const expense = Number(totalExpense) || 0;

        //Return the summary data.
        return res.json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense,
            categoryTotals,
            recentActivity
        });

    }catch(err){
        next(err);
    }
};

const getTrends = async(req,res,next) => {
    try{
        const {period = "year",range="6"} = req.query;
        
        //Period = "year /"month"/ "week"
        const validScale = ["year","month","week"];

        if(!validScale.includes(period)){
            return res.status(400).json({
                message: "Enter a valid period : year/month/week."
            })
        }
        const sinceDate = new Date();
        if(period == "year"){
            sinceDate.setFullYear(sinceDate.getFullYear() - Number(range));
            //sinceDate.setMonth(0,1); // Start from Jan 1
        }
        else if(period == "month"){
            sinceDate.setMonth(sinceDate.getMonth() - Number(range));
            // sinceDate.setDate(1); // Start of month.
        }
        //Convert weeks to days and fetch the data.
        else{
            sinceDate.setDate(sinceDate.getDate() - Number(range)*7)
        }

        //sinceDate.setHours(0,0,0,0);

        const groupExp = Sequelize.fn(
            "date_trunc",
            period,
            Sequelize.col("date")
        );

        const rows = await FinancialRecord.findAll({
            attributes: [
                [groupExp,"period"],
                "type",
                [Sequelize.fn("SUM",Sequelize.col("amount")),"total"]
            ],
            where: {
                date: {
                    [Op.gte]: sinceDate
                }
            },
            group: [groupExp,"type"],
            order: [[Sequelize.literal("period"),"ASC"]]
        });

        return res.json({
            period: period,
            data: rows
        });

    }catch(err){
        next(err);
    }
};

module.exports = {getSummary,getTrends};