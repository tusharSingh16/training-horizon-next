const mongoose = require('mongoose')
const { string } = require('zod')

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    linkedin: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'listing' }],
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ 
    },
    availability: { type: [String], default: [], required: false },
    phone: { type: String, required: true }, 
    address: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    isApproved: { type: Boolean, default: false } 
  }, {
    timestamps: true 
  });

  module.exports = mongoose.model("OrganiztionModel", organizationSchema);
  
