const express = require('express');
const router = express.Router();

const User = require('../models/User');
const contaisnToken = require('../midllewares/constainsToken');

//Obter a lista de usuários da API
router.get('/', contaisnToken, async (req, res) => {
  const {name=''} = req.query;

  const users = await User.find(
    {name: {$regex: '.*' + name + '.*'}});

  res.status(200).json(users);
});

//Obter usuario por id
router.get("/:id", contaisnToken, async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findById(id);
    return user ? res.json(user) : res.status(404).send();
  } catch (error) {
    console.log('Erro ao buscar usuário:', error);
    return res.status(400).json({message: error});
  }
});

//Criar usuario
router.post('/', async(req, res) => {
  //Obtendo dados do Body
  const user = new User(req.body);
  console.log(user);

  res.status(201).json(await user.save());
});

//Deletar usuario por id
router.delete("/:id", contaisnToken, async (req, res) => {
  const {id} = req.params;

  const user = await User.findByIdAndDelete(id);

  return user ? res.json(user) : res.status(404).send();
});

//Atualizar usuario por id
router.put("/:id", contaisnToken, async (req, res) => {
  const {id} = req.params;
  const body = req.body;

  const user =await User.findById(id);

  if (user) {
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;

    return res.json(await user.save());
  }
  else {
    return res.status(404).send();
  }
});

module.exports = router;
