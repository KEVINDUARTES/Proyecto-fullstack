const { Router } = require("express");
const charactersRoute = require("./charactersRoute");
const occupationsRoute = require("./occupationRoute");
const  characterPost  = require("./characterPost");

const router = Router();

router.use("/characters", charactersRoute);
router.use("/occupation", occupationsRoute);
router.use("/characters", characterPost);

module.exports = router;
