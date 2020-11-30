import Clarifai from 'clarifai';

const app = new Clarifai.App({
    // apiKey: 'YOUR_API_KEY' 
    apiKey: '779905e99d8b4c4a9c724186a7429ce8'
});

export const handleApiCall = (req, res) => {
    app.models
        .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}

export const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
    
}