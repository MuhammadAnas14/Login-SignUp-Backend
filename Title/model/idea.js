const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignSchema = new Schema({
  FirstName: String,
  LastName: String,
  EmailAddress: String,
  Password: String,
});

let data = module.exports= mongoose.model('Sign',SignSchema);