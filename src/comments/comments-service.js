const xss = require('xss');

const CommentsService = {
    getAllComments(db) {
      return db.select('*').from('comments')
    },

    getProfileComments(db,id) {
      // return db.select('*').from('comments').where('profile_id',id)
      return(
        db.select('comments.*', 'users.full_name')
        .from('users')
        .innerJoin('comments','users.id', 'comments.user_id')
        .where('comments.profile_id',id)
        .orderBy('id')
      )
    },
  
    insertComment(db, newComment) {
      return db
        .insert(newComment)
        .into('comments')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(db, id) {
      return db
        .from('comments')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteComment(db, id) {
      return db('comments')
        .where({ id })
        .delete()
    },
  
    updateComment(db, id, newCommentFields) {
      return db('comments')
        .where({ id })
        .update(newCommentFields)
    },
  }
  
  module.exports = CommentsService;