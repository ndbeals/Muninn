import { Router, express } from 'express';
import { check, query, validationResult, checkSchema, matchedData } from 'express-validator';

const routes = Router();

//   // app.use(bodyParser);
//   // app.use(express.json());
routes.use(express.json());
routes.use(express.urlencoded());
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
