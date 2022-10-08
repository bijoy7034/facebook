const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModal = new Schema({
 username : {
    type: String ,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    default: ""
  },
  cover: {
    type: String,
    default: ""
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  desc:{
    type: String,
  },
  city:{
    type: String
  },
  from: {
    type: String
  },
  relationship: {
    type:Number,
    enum: [1,2,3],
  }
}, {timestamps: true});

module.exports = mongoose.model("Usres", userModal);