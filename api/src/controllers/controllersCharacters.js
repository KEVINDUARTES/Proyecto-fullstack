const axios = require("axios");
const { Character, Occupation } = require("../db");

const getCharacters = async () => {
  const characters = await axios.get(
    "https://breakingbadapi.com/api/characters"
  );

  const charactersArray = characters.data.map((character) => {
    return {
      id: character.char_id,
      name: character.name,
      nickname: character.nickname,
      birthday: character.birthday,
      status: character.status,
      occupation: character.occupation.map((character) => character),
      image: character.img,
    };
  });
  return charactersArray;
};

const infoDB = async () => {
  const allApiDb = await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return allApiDb;
};

const allCharactersApiDb = async () => {
  const api = await getCharacters();
  const db = await infoDB();
  const result = api.concat(db);
  return result;
};

const getAllCharacters = async (req, res) => {
  const name = req.query.name;

  const characters = await allCharactersApiDb();

  if (name) {
    const characterName = await characters.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    if (characterName) {
      res.status(200).send(characterName);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } else {
    res.status(200).json(characters);
  }
  return characters;
};

const getCharactersById = async (req, res) => {
  const id = req.params.id;

  const characters = await allCharactersApiDb();

  if (id) {
    const characterId = await characters?.filter(
      (el) => el.id.toString() == id.toString()
    );
    if (characterId) {
      res.status(200).json(characterId);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } else {
    res.status(200).json(characters);
  }
};

const postCharacter = async (req, res) => {
  const { name, nickname, birthday, status, image, occupation, createdAtDb } =
    req.body;
  console.log(req.body);

  const characterCreate = await Character.create({
    name,
    nickname,
    birthday,
    status,
    image,
    createdAtDb,
  });

  const occupationDb = await Occupation.findAll({
    where: {
      name: occupation,
    },
  });

  characterCreate.addOccupation(occupationDb);
  res.send("Character created successfully");
};

module.exports = { getAllCharacters, getCharactersById, postCharacter };
