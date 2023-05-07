/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllResults,
  getResultWithID,
  deleteResult,
  addResult,
  updateResult,
} from '../controllers/resultController.js';

const router = express.Router();
router.get('/getallresults', getAllResults);
router.get('/getresult/:resultId', getResultWithID);
router.post('/addresult', addResult);
router.put('/updateresult/:resultId', updateResult);
router.delete('/deleteresult/:resultId', deleteResult);

export default router;
