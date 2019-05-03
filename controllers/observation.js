const Observation = require('../models/observation');



exports.postObservation = (req, res, next) => {
    console.log({ ...req.body.data })

    const observation = new Observation({
        ...req.body.data
    })
    observation.save().then((result) => {
        res.status(200).send(result);
    });

}

exports.deleteObservation = (req, res, next) => {

    Observation.findByIdAndRemove(req.body.data._id).then(() => {
        res.status(200).send({ message: "deleted successfully" });

    });
}


