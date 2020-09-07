const express = require(`express`),
  app = express(),
  morgan = require(`morgan`),
  bodyParser = require(`body-parser`),
  jwt = require(`jsonwebtoken`),
  config = require(`../configs/config`);

app.set(`port`, process.env.PORT || 4100);
app.set('llave', config.llave);
app.set(`json spaces`, 2);

app.use(morgan(`dev`));
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json());
app.use(bodyParser.json());

var allowMethods = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
}

app.use(allowMethods);

var allowCrossTokenHeader = function(req, res, next){
  res.header("Access-Control-Allow-Methods", "token");
  return next();
}

app.use(allowCrossTokenHeader);

app.post('/autenticar', (req, res) => {
  if (req.body.user === "test_user" && req.body.pass === "test_pass") {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('llave'), {
      expiresIn: 1440
    });
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
    res.json({
      mensaje: "Usuario o contraseña incorrectos"
    })
  }
})

const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, app.get('llave'), (err, decoded) => {
      if (err) {
        return res.json({
          mensaje: 'Token inválida'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    });
  }
});

//routes
app.use(require(`./routes/index`));
app.use(`/api/users`, require(`./routes/users`));


// Server Start
app.listen(4100, () => {
  console.log(`Server on port ${app.get('port')}`);
})