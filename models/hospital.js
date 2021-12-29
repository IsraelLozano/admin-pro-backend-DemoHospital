const { Schema, model } = require("mongoose");

const hospitalSchema = Schema(
  {
    nombre: { type: String, require: true },
    img: { type: String },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      require: true,
    },
  },
  { collection: "hospital" }
);

hospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", hospitalSchema);
