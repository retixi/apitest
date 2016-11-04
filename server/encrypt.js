/**
 * Created by zhihuazhang on 2016/05/15.
 */

var bcrypt, encryptionUtil;
bcrypt = require('bcryptjs');

encryptionUtil = {
  encryptPassword: function(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  comparePassword: function(password, encryptedPasswordToCompareTo) {
    return bcrypt.compareSync(password, encryptedPasswordToCompareTo);
  }
};

module.exports = encryptionUtil;
