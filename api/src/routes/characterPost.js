const { Router } = require("express");
const { postCharacter } = require("../controllers/controllersCharacters");

const router = Router();

router.post("/", postCharacter);


module.exports = router;