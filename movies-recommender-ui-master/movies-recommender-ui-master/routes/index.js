const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {
  userGenrePreferences,
  userHistory,
  userLanguagePreferences,
  userSubscriptions,
  userTypes,
  users,
} = require('../models');
const moment = require('moment');
const { getGenres, getLanguages } = require('../util');

const tokenForUser = (u) =>
  jwt.sign({ userId: u.id }, 'cshsgahabshw83829hsh', {
    expiresIn: '1 day',
    mutatePayload: true,
  });

router.post('/register', async (req, res) => {
  try {
    let { name, email, password, subscriptionName } = req.body;

    if (!name || !email || !password) {
      res.json({
        success: false,
        message: 'all fields are required!',
      });
      return;
    }

    let alreadyExists = await users.findOne({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      res.json({
        success: false,
        message: `user already exists with ${email}!`,
      });
      return;
    }

    let created = await users.create({
      name,
      email,
      password,
    });

    await userSubscriptions.create({
      userId: created.id,
      subscriptionName,
      expiryDate: moment().add(1, 'Y'), //1 yr from now
    });

    const token = tokenForUser(created);

    res.json({
      success: true,
      user: created,
      token,
    });
  } catch (error) {
    console.trace(error);
    res.json({
      success: false,
      error,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.json({
        success: false,
        message: 'all fields are required!',
      });
      return;
    }

    let alreadyExists = await users.findOne({
      where: {
        email,
      },
    });

    if (!alreadyExists) {
      res.json({
        success: false,
        message: `no user exists with ${email}!`,
      });
      return;
    }

    let validPassword = password === alreadyExists.password;
    if (!validPassword) {
      res.json({
        success: false,
        message: 'password incorrect!',
      });
      return;
    }
    alreadyExists = JSON.parse(JSON.stringify(alreadyExists));
    let dept = alreadyExists.departmentId && (await departments.findOne({ where: { id: alreadyExists.departmentId } }));
    alreadyExists.department = dept;

    const token = tokenForUser(alreadyExists);
    res.json({
      success: true,
      user: alreadyExists,
      token,
    });
  } catch (error) {
    console.trace(error);
    res.json({
      success: false,
      error,
    });
  }
});

router.post('/updatePreferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { languages, genres } = req.body;
    let user_ = await users.findOne({
      where: {
        id: userId,
      },
    });

    await userLanguagePreferences.destroy({
      where: { userId: user_.id },
    });

    await userGenrePreferences.destroy({
      where: { userId: user_.id },
    });

    for (let eachLangPreference of languages) {
      await userLanguagePreferences.create({
        userId: user_.id,
        iso_639_1: eachLangPreference.iso_639_1,
      });
    }

    for (let eachGenrePreference of genres) {
      await userGenrePreferences.create({
        userId: user_.id,
        tmdbId: eachGenrePreference.id,
      });
    }

    res.json({
      success: true,
      genres: await userGenrePreferences.findAll({
        where: {
          userId: user_.id,
        },
      }),
      languages: await userLanguagePreferences.findAll({
        where: {
          userId: user_.id,
        },
      }),
    });
  } catch (error) {
    console.trace(error);
    res.json({
      success: false,
      error,
    });
  }
});

router.get('/preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let userGenres = await userGenrePreferences.findAll({
      where: {
        userId: userId,
      },
    });
    userGenres = JSON.parse(JSON.stringify(userGenres));
    let userLangs = await userLanguagePreferences.findAll({
      where: {
        userId: userId,
      },
    });
    userLangs = JSON.parse(JSON.stringify(userLangs));

    let tmdbGenresIds = userGenres.map((g) => g.tmdbId);
    let tmdbLangiso_639_1s = userLangs.map((g) => g.iso_639_1);

    let allGenres = await getGenres();
    allGenres = allGenres.genres;
    let allLangs = await getLanguages();

    let genres = allGenres.filter((g) => tmdbGenresIds.includes(g.id));
    let languages = allLangs.filter((g) => tmdbLangiso_639_1s.includes(g.iso_639_1));
    res.json({
      success: true,
      genres: genres.map((a) => ({
        label: a.name,
        id: a.id,
        value: a.id,
        name: a.id,
        english_name: a.english_name,
      })),
      languages: languages.map((a) => ({
        label: a.english_name,
        iso_639_1: a.iso_639_1,
        id: a.iso_639_1,
        value: a.iso_639_1,
        name: a.iso_639_1,
      })),
    });
  } catch (error) {
    console.trace(error);
    res.json({
      success: false,
      error,
    });
  }
});

module.exports = router;
