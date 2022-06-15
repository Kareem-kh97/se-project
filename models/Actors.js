const Dao = require("./Dao");

class Actors extends Dao {
  constructor() {
    super("actors");
  }

  getActors = () => {
    return super.getRowsWithPagination(10);
  };

  getActorById = (id) => {
    return super.getById(id);
  };

  deleteActorById = (id) => {
    return super.deleteRow("id", id);
  };

  updateActorById = (columnNames, values, id) => {
    return super.updateRowById(columnNames, values, id);
  };

  getActorByNameWithPattern = (name) => {
    return super.getRowsWithPattern("fullname", name);
  };

  addActor = (columnNames, values) => {
    return super.insertRow(columnNames, values);
  };
}

module.exports = new Actors();
