const express = require('express');
const EventsService = require('./events-service');
const { requireAuth } = require("../middleware/jwt-auth");

const eventsRouter = express.Router();
const jsonParser = express.json();

eventsRouter
  .route('/')
  .get((req, res, next) => {
    EventsService.getAllEvents(req.app.get('db'))
      .then((events) => {
        res.json(events.map(EventsService.serializeEvent));
      })

      .catch(next);
  })
.post(jsonParser, (req, res, next) => {
    const { user_id, event_name, location, created_at, started_at, end_at, recipient } = req.body;
    const newEvent = { user_id, event_name, location, created_at, started_at, end_at, recipient };

    for (const [key, value] of Object.entries(newEvent)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    EventsService.insertEvent(req.app.get('db'), newEvent).then(
        (dog) => {
          res.status(201).json(EventsService.serializeEvent(event));
        })
        .catch(next);
  });

  eventsRouter
  .route('/:event_id')
  .all((req, res, next) => {
    EventsService.getDogById(req.app.get('db'), req.params.event_id).then(
      (event) => {
        if (!event) {
          return res
            .status(404)
            .json({ error: { message: `event doesn't exist` } });
        }
        res.event = event;
        next();
      }
    );
  })
  .get((req, res, next) => {
    res.json(EventsService.serializeDog(res.event));
  })
  .patch(jsonParser, (req, res, next) => {
    const {
        event_name, 
        location, 
        started_at, 
        end_at
    } = req.body;
    const eventToUpdate = {
        event_name, 
        location, 
        started_at, 
        end_at
    };

    EventsService.updateEvent(req.app.get('db'), req.params.event_id, eventToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = eventsRouter;