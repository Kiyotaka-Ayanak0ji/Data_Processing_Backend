const express = require('express');
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/authRole');
const { getSummary, getTrends } = require('../controllers/summaryController');

const summaryRouter = express.Router();

summaryRouter.get('/summary',authenticate,authorizeRoles("analyst","admin"),getSummary);
summaryRouter.get('/trends',authenticate,authorizeRoles("analyst","admin"),getTrends);

module.exports = summaryRouter;