const fs = require("fs");
const { error } = require("console");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var passwordSchema = require("../model_password/Password_model");
const validator = require("validator");
//----------------------------------------------------------------------------------
// LOGIQUE SIGNUP
//----------------------------------------------------------------------------------
exports.signup = (req, res, next) => {
  const valideEmail = validator.isEmail(req.body.email);
  const validePassword = passwordSchema.validate(req.body.password);
  if (valideEmail === true && validePassword === true) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        db.User.create({
          email: req.body.email,
          password: hash,
          nom: req.body.nom,
          prenom: req.body.prenom,
          service: req.body.service,
          image: `${req.protocol}://${req.get(
            "host"
          )}/images/defaut/imagedefaut.png`,
          moderateur: false,
          date_deco: '1978-10-31 15:45:00'
        })
          .then(() =>
            res
              .status(201)
              .json({ message: "User created (FR)Utilisateur créé !" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ error })
          );
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(500).json({ error: "mot de passe ou email invalide" });
  }
};
//----------------------------------------------------------------------------------
// LOGIQUE LOGIN
//----------------------------------------------------------------------------------
exports.login = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mot de passe invalide" });
          }
          let token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET_ALEATOIRE,
            { expiresIn: process.env.TOKEN_TEMP }
          );
          res.status(201).json({ userId: user.id, moderateur: user.moderateur, email: user.email, image: user.image, date_deco: user.date_deco, token });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE avoir ses informations d'user
//----------------------------------------------------------------------------------
exports.userProfil = (req, res, next) => {
  db.User.findOne({ attributes: ['id', 'email', 'nom', 'prenom', 'service', 'moderateur', 'createdAt', 'image'],
    where: { id: req.auth.userId },
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => res.status(400).json({ error }));
};

//----------------------------------------------------------------------------------
// LOGIQUE mise à jour
//----------------------------------------------------------------------------------
exports.userMaj = (req, res, next) => {
  db.User.findOne({
    where: { id: req.auth.userId },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      }
      let account = JSON.parse(req.body.account);
      if(account.nom === ''){
        account.nom = user.nom;
      } 
      if(account.prenom === ''){
        account.prenom = user.prenom;
      } 
      if(account.service === ''){
        account.service = user.service;
      } 
      if(!req.file){
        account.image = user.image;
      } else {
      const filename = user.image.split("/images/")[1];
      const testImage = 'defaut/imagedefaut.png';
      if(testImage != filename){
      fs.unlink(`images/${filename}`, () => {});
      }
        account.image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      if(account.email === ''){
        account.email = user.email;
      }
      const valideEmail = validator.isEmail(account.email);
      if (account.email !== ''){
        if(valideEmail !== true){
          return res.status(400).json("forme email invalide");
        }
      }
      if (!account.password) {
        return res.status(400).json("veuillez renseigner votre mot de passe");
      }
      bcrypt
        .compare(account.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mot de passe invalide" });
          }
          if (!account.new_password_bis) {
            db.User.update(
              {
                ...account,
                id: req.auth.userId,
                moderateur: user.moderateur,
                password: user.password,
              },
              {
                where: {
                  id: req.auth.userId,
                },
              }
            )
              .then(() => res.status(201).send("utilisateur modifié"))
              .catch((error) => {
                if (req.file) {
                  fs.unlink(`images/${req.file.filename}`, () => {});
                }
                return res.status(404).json({ error });
              });
          } else {
            if (account.new_password !== account.new_password_bis) {
              return res.status(400).json({
                error: "nouveau mot de passe en vérification non similaire",
              });
            }
            const validePassword = passwordSchema.validate(
              account.new_password_bis
            );
            if (validePassword === false) {
              return res
                .status(500)
                .json({ error: "mot de passe non conforme au standart" });
            } else {
            bcrypt
              .hash(account.new_password_bis, 10)
              .then((hash) => {
                db.User.update(
                  {
                    ...account,
                    id: req.auth.userId,
                    moderateur: user.moderateur,
                    password: hash,
                  },
                  {
                    where: {
                      id: req.auth.userId,
                    },
                  }
                )
                  .then(() => res.status(201).send("utilisateur modifié"))
                  .catch((error) => {
                    if (req.file) {
                      fs.unlink(`images/${req.file.filename}`, () => {});
                    }
                    return res.status(404).json({ error });
                  });
              })
              .catch((error) => res.status(400).json({ error }));
            }
          }
        });
    })
    .catch((error) => {
      if (req.file) {
        fs.unlink(`images/${req.file.filename}`, () => {});
      }
      return res.status(404).json({ error });
    });
    
};
//----------------------------------------------------------------------------------
// LOGIQUE delete user
//----------------------------------------------------------------------------------
exports.userDelete = (req, res, next) => {
  db.User.findOne({
    where: { id: req.auth.userId },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mot de passe invalide" });
          }
          const filename = user.image.split("/images/")[1];
          if(filename == 'defaut/imagedefaut.png'){
            db.User.destroy({
              where: {
                id: req.auth.userId,
              },
            })
              .then(() => res.send("utilisateur supprimé"))
              .catch((error) => res.status(400).json({ error }));
          }else{
          return fs.unlink(`images/${filename}`, () => {
            db.User.destroy({
              where: {
                id: req.auth.userId,
              },
            })
              .then(() => res.send("utilisateur supprimé"))
              .catch((error) => res.status(400).json({ error }));
          })
        }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE logout user
//----------------------------------------------------------------------------------
exports.userLogout = (req, res, next) => {
  let dateDeco = new Date();
  db.User.findOne({
    where: { id: req.body.userId, email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      } else {
        db.User.update(
          {
            date_deco: dateDeco,
          },
          {
            where: {
              id: req.body.userId,
            },
          }
        )
        .then(() => res.status(201).send(console.log('deconnection le: ' + dateDeco)))
        .catch((error) => res.status(400).json({ error }));
        res.status(200).send("utilisateur déconnecté le " + dateDeco);
      }
    })
    .catch((error) => res.status(500).json({ error })); 
};
