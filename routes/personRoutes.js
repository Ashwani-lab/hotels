const express = require('express');
const router = express.Router();

const Person = require('./../models/person');


//POST Method to add a person
router.post('/', async (req, res) => {


    try {
        const data = req.body; //assuming the request body  contains the person data

        // Create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log('Yoho ! Data Saved..');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }

})

//GET Method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Yoho ! Data Fetched successfully..');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

//Parameterized Data
router.get('/:worktype', async (req, res) => {

    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {

            const response = await Person.find({ work: worktype });
            console.log('Response Fetched....');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'Invalid Work Type !! ' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
}
);

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from the URL Parameter
        const updatedPersonData = req.body; // Updated Data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //This will return the updated data
            runValidators: true, // Run Mongoose Validation
        });

        if (!response) {
            return res.status(404).json({ error: 'Person Not Found !! ' });
        }
        console.log('data updated..');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from the URL Parameter
        const deletedPersonData = req.body; // Deleted Data from the person
        const response = await Person.findByIdAndDelete  (personId);
        if (!response) {
            return res.status(404).json({ error: 'Person Not Found !! ' });
        }
        console.log('data deleted..');
        res.status(200).json({message : 'Person Deleted Successfully...'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports = router;