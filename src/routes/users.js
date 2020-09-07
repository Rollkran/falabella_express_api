const { Router } = require(`express`);
const router = Router();
const users = require(`../users.json`)

router.get('/', (req, res) => {
  try {
    res.status(200).json(users);
  } catch {
    res.status(500).json({
      info: 'server error'
    })
  }
});

router.post('/', (req, res) => {
  // console.log(req.body);
  try {
    const {
      rut,
      celular,
      correo,
      renta,
      ...system
    } = req.body
    if (rut && celular && correo && renta && system['x-user-browser'] && system['x-user-os']) {
      const id = users.length + 1;
      const newUser = {
        ...req.body,
        id
      }
      users.push(newUser);
      res.status(200).json({
        info: `success`
      })
    } else {
      res.status(400).json({
        info: 'bad request'
      })
    }
  } catch {
    res.status(500).json({
      info: 'server error'
    })
  }
})



module.exports = router;