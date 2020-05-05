import express, { Router } from 'express';
import { check, query, validationResult, checkSchema, matchedData } from 'express-validator';

import { errorStructure } from '../shared';
// const { check, query, validationResult, checkSchema, matchedData } = expressValidator;

const routes = Router();

//   // app.use(bodyParser);
//   // app.use(express.json());
routes.use(express.json()); // for parsing application/json
routes.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
routes.use(express.raw());
routes.use(express.text());
// routes.use(express.json())
// routes.use(express.json())

routes.post(
  '/notify/:token?',
  checkSchema({
    token: {
      // in: ['body','headers','route','query'],
      exists: true,
      isLength: {
        errorMessage: 'token should be at least 7 chars long',
        // Multiple options would be expressed as an array
        options: { min: 3 },
      },
    },
    data: {
      in: ['body'],
      exists: {
        errorMessage: 'Data must be present and in JSON format.',
      },
    },
  }),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const validatedData = matchedData(req);
    const notifierToken = validatedData.token;

    const notifier = await db.Notifier.findOne({
      where: {
        token: notifierToken,
        // active:
      },
    });

    if (notifier === null) {
      return res.status(400).json(errorStructure('Token not found.'));
    }

    await Handler.TriggerEvent('NotifierReceived', {
      notifier,
      data: req.body.data,
    });

    return res.send(true);
    // return res.json(notifier);
  }
);

export default routes;
