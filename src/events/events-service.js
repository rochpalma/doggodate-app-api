const xss = require('xss');

const EventsService = {
    getAllEvents(db) {
      return db.from('events').select('*');
    },
    getEventById(db, id) {
      return db.from('events').select('*').where('id', id).first();
    },
    getEventsByUser(db, user_id) {
      return(
        db.from('events').distinct('events.*','dog_profile.full_name')
        .innerJoin('dog_profile','events.recipient', 'dog_profile.owner_id')
        .where('events.user_id', user_id)
        .orWhere('events.recipient',user_id)        
      )     
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
        event_date: xss(event.event_date),
        start_time: xss(event.start_time),
        end_time: xss(event.end_time),
        recipient: xss(event.recipient),
        full_name: event.full_name
      };
    },
    updateEvent(db, id, updateFields) {
      return EventsService.getAllEvents(db).where({ id }).update(updateFields);
    }
  };
  
  module.exports = EventsService;