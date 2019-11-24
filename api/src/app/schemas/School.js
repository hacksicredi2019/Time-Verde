import mongoose from "mongoose";

const SchoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    themes: {
      type: Array,
      required: false
    },
    series: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("School", SchoolSchema);
