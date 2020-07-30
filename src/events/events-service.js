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
       // .then((event) => EventsService.getEventById(db, event.id));
    },
    serializeEvent(event) {
      return {
        id: event.id,
        user_id: xss(event.user_id),
        event_name: xss(event.event_name),
        description: xss(event.description),
        location: xss(event.location),
        created_at: xss(event.created_at),
        start_time: xss(event.start_time),
        end_time: xss(event.end_time),
        recipient: xss(event.recipient)
      };
    },
    updateEvent(db, id, updateFields) {
      return EventsService.getAllEvents(db).where({ id }).update(updateFields);
    }
  };
  
  module.exports = EventsService;