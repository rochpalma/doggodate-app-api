const xss = require('xss');

const CommentsService = {
    getAllComments(db) {
      return db.select('*').from('comments')
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