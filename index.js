const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./app/models/bear');
const CONST = require('./constants');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://adarsh:sample12345@ds125331.mlab.com:25331/restful-api');

const PORT = process.env.port || CONST.PORT;

const router = express.Router();

router.get('/', (_, res) => res.json('Welcome to our API!'));

router.route('/bears')
    .post((req, res) => {
        const bear = new Bear();
        bear.name = req.body.name;

        // save bear
        bear.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Bear Created' });
        });
    })
    .get((_, res) => {
        Bear.find((err, bears) => {
            if (err) {
                res.send(err);
            }
            res.json(bears);
            return 0;
        });
    });

router.route('/bears/:bear_id')
    .get((req, res) => {
        Bear.findById(req.params.bear_id, (err, bear) => {
            if (err) {
                res.send(err);
            }
            res.json(bear);
        });
    })
    .put((req, res) => {
        Bear.findById(req.params.bear_id, (err, bear) => {
            if (err) {
                res.send(err);
            }
            bear.name = req.body.name;
            // save bear
            bear.save((error) => {
                if (error) {
                    res.send(err);
                }
                res.json({ message: 'Bear Updated' });
            });
        });
    })
    .delete((req, res) => {
        Bear.remove({
            _id: req.params.bear_id,
        }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Bear Deleted' });
        });
    });

app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
