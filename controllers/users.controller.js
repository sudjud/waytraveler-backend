const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  getUser: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json(error.toStrig());
    }
  },
  registerUsers: async (req, res) => {
    try {
      const { name, password_1, mail } = req.body;
      // Перед регистрацией пользователя проверяем логин на сходство
      const candidate = await User.findOne({ login: name });
      // Валидация
      if (!/[^\s]/gim.test(name)) {
        return res
          .status(401)
          .json({ error: "* Все поля должны быть заполнены" });
      }
      if (!/[^\s]/gim.test(mail)) {
        return res
          .status(401)
          .json({ error: "* Все поля должны быть заполнены" });
      }

      if (candidate) {
        return res
          .status(401)
          .json({ error: "* Это имя пользователя уже занято" });
      }
      // Проверяем используется такая почта или нет
      const emailCandidate = await User.findOne({ email: mail });
      if (emailCandidate) {
        return res.status(401).json({ error: "* этот email уже используется" });
      }
      //   repeat password
      // console.log(password_1);
      if (password_1.length > 4 && password_1.length < 8) {
        const hash = await bcrypt.hash(
          password_1,
          Number(process.env.BCRYPT_ROUNDS)
        );

        const user = await User.create({
          login: name,
          password: hash,
          email: mail,
        });

        return res.json(user);
      }
      return res.status(401).json({ error: "* Пароль некорректный" });
    } catch (error) {
      res.json(error.toString());
    }
  },
  login: async (req, res) => {
    try {
      // console.log('asd')
      const { login, password } = req.body;
      const candidate = await User.findOne({ login });
      //   console.log("asdasd");
      if (!candidate) {
        return res.status(401).json({ error: "* Неверный логин или пароль" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "* Неверный логин или пароль" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
        isAdmin: candidate.isAdmin,
        email: candidate.email,
        trips: candidate.trips,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const user = payload.id
      res.json({token, user})
    } catch (error) {
      res.json(error);
    }
  },

  addTravel: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $push: {
          travels: {
            ...req.body
          }
        }
      }
      );
      res.json('add travel')
    } catch (error) {
      res.json(error.message)
    }
  }
};
