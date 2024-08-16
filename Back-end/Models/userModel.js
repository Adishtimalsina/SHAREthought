const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  thoughtString: [ThoughtSchema],
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
});

//encrypt user password
UserSchema.pre("save", async function (password, next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
