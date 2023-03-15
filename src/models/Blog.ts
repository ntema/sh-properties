import mongoose, {Schema} from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    image: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const populateUser = function (this: any, next: () => void) {
  this.populate("addedBy", "_id email firstname lastname username image role");
  next();
};

BlogSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

export const Blog = mongoose.model("Blog", BlogSchema);

