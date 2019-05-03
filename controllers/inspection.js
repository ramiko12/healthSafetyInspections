const mongoose = require('mongoose');


const Inspection = require('../models/inspection');
const Question = require('../models/question');
const Category = require('../models/questionCategory');

//get all the inspections for now
//TODO get all the inspections associated to the current user when we setup the session
//as it will be part of the request
exports.getInspections = (req, res, next) => {
    Inspection.find().then((inspections) => {
        res.send(inspections);
    })
}

exports.createInspection = (req, res, next) => {
    //get template and then clone it and change status to created and assign to current user (TODO)
    //get the questions and create new questions with no answers
    //and replace the questions from the cloned inspections with the new ones
    Inspection.findById('5c74b809aa69811a42a272d0').then((inspection) => {
        inspection.populate('questions.question')
            .execPopulate()
            .then(async (result) => {
                //console.log(result.questions);
                const templateQuestions = [...result.questions];
                const createdQuestions = [];
                for (let question of templateQuestions) {
                    const newQuestion = new Question({
                        questionText: question.question.questionText,
                        answer: null,
                        category: mongoose.Types.ObjectId(question.question.category)
                    });
                    const createdRecord = await newQuestion.save();
                    createdQuestions.push({ question: mongoose.Types.ObjectId(createdRecord._id) })
                    console.log("created questions", createdQuestions)
                }
               
                const newInspection = new Inspection({
                    name: req.body.name,
                    status: 'Created',
                    inspector: mongoose.Types.ObjectId(req.body.inspector),
                    questions: createdQuestions
                });
                newInspection.save().then((createdInspection) => {
                    res.send(createdInspection)

                })
            })
    })
}

//only needed when we change data on the actual inspection
exports.updateInspection = (req, res, next) => {

}
exports.getInspection = (req, res, next) => {
    console.log("test", req.params.inspectionId);
    Inspection.findById(req.params.inspectionId).then((inspection) => {
        inspection.populate('questions.question')
            .execPopulate()
            .then((result) => {
                result.populate('questions.question.category')
                    .execPopulate()
                    .then((final) => {
                        res.send(final);
                    })
            })
    })
}

exports.deleteInspection = (req, res, next) => {

}



exports.getInspectionQuestions = (req, res, next) => {
    console.log(req.params.inspectionId);
    Inspection.findById(req.params.inspectionId).then((inspection) => {
        inspection.populate('questions.question')
            .execPopulate()
            .then((result) => {
                result.populate('questions.question.category')
                    .execPopulate().then((final) => {
                        res.send(final.questions);
                    })
            })
    })
    //res.send('Test');
}


exports.getCategories = (req, res, next) => {

}
