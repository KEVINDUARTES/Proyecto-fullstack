const {Router} = require("express");
const { getOccupations } = require("../controllers/controllersOccupation");

const router = Router();

router.get("/", getOccupations);

module.exports = router;

