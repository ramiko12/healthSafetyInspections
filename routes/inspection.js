const express = require('express');


const inspectionController = require('../controllers/inspection');
// const categoryController = require('../controllers/questionCategory')
// const questionController = require('../controllers/question');

const router = express.Router();

//gets inspections assigned to user, the user will be passed in with the request via the session cookie
router.get('/',inspectionController.getInspections);

//this is the creation workflow, will grab a template inspection and 
router.post('/',inspectionController.createInspection);

//updates inspection , can also trigger completion workflow that eventually sends emails via the query string ?action=delete
router.put('/:inspectionId',inspectionController.updateInspection)
router.get('/:inspectionId',inspectionController.getInspection); 
router.delete('/:inspectionId',inspectionController.deleteInspection); 

//get Inspection categories, will get the questions then retrieve the categories from them via populate
router.get('/:inspectionId/categories',inspectionController.getCategories);

//will get the questions via the populate method
router.get('/:inspectionId/questions',inspectionController.getInspectionQuestions);


module.exports.routes = router