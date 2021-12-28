const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("DB Online");
  } catch (error) {
    console.error(error);
    throw new Error("Errr a la hora de iniciar la BD, ver logs");
  }
};

module.exports = {
  dbConection,
};
