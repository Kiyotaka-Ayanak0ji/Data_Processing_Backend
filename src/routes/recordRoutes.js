const express = require('express');
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/authRole');
const { createRecord, listRecords, updateRecord, findRecordById, deleteRecord } = require('../controllers/recordController');
const recordRouter = express.Router();

recordRouter.post('/',authenticate,authorizeRoles("analyst","admin"),createRecord);
recordRouter.get('/',authenticate,authorizeRoles("analyst","admin"),listRecords);

//Param Routes
recordRouter.patch('/:id',authenticate,authorizeRoles("analyst","admin"),updateRecord);
recordRouter.get('/:id',authenticate,authorizeRoles("analyst","admin"),findRecordById);
recordRouter.delete('/:id',authenticate,authorizeRoles("analyst","admin"),deleteRecord);

module.exports = recordRouter;
