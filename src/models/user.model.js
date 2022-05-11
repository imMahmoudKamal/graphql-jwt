import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email feild is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (mail) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mail),
        message: (mail) => `'${mail.value}' is not a valid mail`,
      },
    },
    hashedPassword: {
      type: String,
      required: [true, 'password feild is required'],
      validate: {
        validator: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
        message: () => 'Please enter stronger password',
      },
    },
    firstName: { type: String, default: null, trim: true, lowercase: true },
    lastName: { type: String, default: null, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

// compare passwords when user login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.hashedPassword);
};

// hash the password before saving user into db
userSchema.pre('save', async function (next) {
  try {
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
