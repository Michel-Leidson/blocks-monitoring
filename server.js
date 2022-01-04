const client = require('prom-client');
const ValidatorService = require('./service/ValidatorService');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');

const server = express();
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

const gauge = new client.Gauge({
    name: 'missed_blocks',
    help: 'metric_help',
    labelNames: ['network','validator'],
    async collect() {
        const validators = await ValidatorService.getAllValidators()
        validators.map(async validator => {
            const { missed_blocks, network } = validator;
            console.log(missed_blocks,network)
            gauge.labels({ network: validator.network, validator: validator.name }).set(missed_blocks)
        })
    }
});

/**
 * Put metric gauge on register
 */
register.registerMetric(gauge)


/**
 * Enpoint for receive and create new validator
 */
server.post('/validator', async (req, res) => {
    try {
        console.log("Validator create endpoint\n", req.body);
        const valid = req.body
        const createdVaidator = await ValidatorService.createValidator(valid)
        res.status(200).send({
            status: 200,
            message: "Validator created!",
            validator: createdVaidator
        })
    } catch (ex) {
        res.status(500).end(ex.message);
    }
});

/**
 * Endpoint for remove validator based security_key
 */
server.delete('/validator/:security_key', async (req, res) => {
    try {
        const security_key = req.params.security_key
        const validator = await ValidatorService.removeValidator(security_key);
        if (validator) {
            res.status(200).send({
                message: "Validator was removed!",
                validator
            })
            //Remove validator of gauge
            gauge.remove({network: validator.network, validator: validator.name });
        } else {
            res.status(400).send({
                message: "Validator not found!"
            })
        }

    } catch (ex) {
        res.status(500).send(ex.message)
    }
});

/**
 * Endpoint for obtains validators list
 */
server.get('/validator', async (req, res) => {
    try {
        const validators = await ValidatorService.getAllValidators()
        res.status(200).send({
            validators
        })
    } catch (ex) {
        res.status(500).send(ex.message)
    }
});

/**
 * Endpoint for receive missed blocks of clients instances
 */
server.post('/info/:security_key', async (req, res) => {
    try {
        console.log("Info collect endpoint\n", req.body);
        const { missed_blocks } = req.body;
        console.log(typeof missed_blocks)
        const security_key = req.params.security_key;
        if (typeof security_key !== 'undefined' && typeof missed_blocks !== 'undefined' && missed_blocks >= 0) {
            ValidatorService.updateMissedBlocksBySecurityKey(security_key, missed_blocks);
            console.log("Signer Key sended in query http:", req.params.security_key)
            res.status(200).send({
                status: 200,
                message: "Info was collected!"
            })
        } else {
            res.status(500).send({
                status: 500,
                message: "Missing parameters"
            })
        }

    } catch (ex) {
        res.status(500).end(ex.message);
    }
});

/**
 * Endpoint /metrics for Prometheus collect
 */
server.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

const port = process.env.PORT || 9991;


console.log(
    `Server listening to ${port}, metrics exposed on /metrics endpoint`,
);
server.listen(port);