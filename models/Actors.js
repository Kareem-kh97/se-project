const Dao = require("./Dao");

class Actors extends Dao {
  constructor() {
    super("actors");
  }

  getActors = () => {
    return super.getRowsWithPagination(10);
  };
}

module.exports = new Actors();
