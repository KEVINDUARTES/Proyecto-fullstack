const axios = require("axios");
const { Occupation } = require("../db");

const getOccupations = async (req, res) => {
  const occupationsApi = await axios.get(
    "https://breakingbadapi.com/api/characters"
  );
  const occupations = occupationsApi.data.map((el) => el.occupation);
  const occEach = occupations.map((el) => {
    for (let i = 0; i < el.length; i++) return el[i];
  });
  occEach.forEach((el) => {
    Occupation.findOrCreate({ where: { name: el } });
  });
  const allOccupations = await Occupation.findAll();
  res.send(allOccupations);
};

module.exports = { getOccupations };
