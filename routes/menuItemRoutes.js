const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');


//POST Method to add Menu Item
router.post('/', async (req, res) => {


    try {
        const data = req.body; //assuming the request body, contains the Menu Item data

        // Create a new Menu Item document using the mongoose model
        const newMenuItem = new MenuItem(data);

        //save the new Menu Item to the database
        const response = await newMenuItem.save();
        console.log('Yoho ! Data Saved..');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }

});


//GET Method to get the Menu Item
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Yoho ! Data Fetched successfully..');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

//Parameterized Data
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({ taste: taste });
            console.log('Response Fetched successfully..');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Taste is not available' });
        }
    } catch {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});


// comment added for testing purpose
module.exports = router;