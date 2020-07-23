const xss = require('xss');

const EventsService = {
    getAllEvents(db) {
      return db.from('events').select('*');
    },
    getEventById(db, id) {
      return db.from('events').select('*').where('id', id).first();
    },
    insertEvent(db, newEvent) {
      return db
        .insert(newEvent)
        .into('events')
        .returning('*')
        .then(([event]) => event)
        .then((event) => EventsService.getEventById(db, event.id));
    },
    serializeEvent(event) {
      return {
        id: event.id,
        user_id: xss(event.user_id),
        event_name: xss(event.event_name),
        location: xss(event.location),
        created_at: xss(event.created_at),
        started_at: xss(event.started_at),
        end_at: xss(event.end_at),
        recipient: xss(event.recipient)
      };
    },
    updateEvent(db, id, updateFields) {
      return EventsService.getAllEvents(db).where({ id }).update(updateFields);
    }
  };
  
  module.exports = EventsService;