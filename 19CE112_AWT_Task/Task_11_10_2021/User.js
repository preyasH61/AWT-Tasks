const mongoose = require("mongoose");
const brypt = require("bcrypt");
//connect with mongo atlas replace with your database
const conection_url = 'past database url'
mongoose.connect(conection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`db connected`);
}).catch((err) => console.log(err));
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
})
userSchema.pre("save", function (next) {
    saltvlaue=152;
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.genSalt(saltvlaue, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
        });
    });
    next()
})
userSchema.method.comparePassword = function (plaintext, callback) {
    return callback(null, brypt.compareSync(plaintext, this.password))
}
const userModel = mongoose.model("LoginUser", userSchema)
module.exports = userModel
