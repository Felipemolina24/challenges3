const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = model('Task', TaskSchema);