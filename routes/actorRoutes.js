const router = require("express").Router();
const actorControllers = require("../controllers/actorControllers");
const authenticateUser = require("../middleware/authMiddleware");

router.get(
  "/addactor",
  authenticateUser,
  actorControllers.renderCreateActorPage
);

router.post("/addactor", authenticateUser, actorControllers.createNewActor);

router.get(
  "/actordb",
  authenticateUser,
  actorControllers.renderActorDatabasePage
);

router.get(
  "/actordb/:actorname",
  authenticateUser,
  actorControllers.searchForActor
);

router.get("/actor/:id", authenticateUser, actorControllers.renderActorDetails);

router.delete("/actor/:id", authenticateUser, actorControllers.deleteActorById);

router.put("/actor/:id", authenticateUser, actorControllers.editActorById);

module.exports = router;
