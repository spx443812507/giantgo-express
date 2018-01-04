const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: 'string',
  email: 'string',
  mobile: 'string'
});

export default mongoose.model('User', userSchema);
