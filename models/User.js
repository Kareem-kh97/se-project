const Dao = require("./Dao");

class User extends Dao {
  constructor() {
    super("users");
  }

  getUserById = async (id) => {
    const [data, _] = super.getById(id);
  };

  addNewUser = (fields, values) => {
    const data = super.insertRow(fields, values);
    return data;
  };
}

module.exports = new User();
