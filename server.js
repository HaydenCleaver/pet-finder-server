'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require ('mongoose');

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.listen(PORT, () => console.log(`listening on ${PORT}`));
