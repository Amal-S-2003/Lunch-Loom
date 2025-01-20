const comments = require("../Model/commentSchema");

exports.addComment = async (req, res) => {
  console.log("commentController");
  const { userId, messId, name, comment, profilePicture } = req.body;
  console.log(userId, messId, name, comment, profilePicture);

  const date = new Date();

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  console.log(formattedDate);
  try {
    const newComment = new comments({
      userId,
      messId,
      name,
      date: formattedDate,
      comment,
      profilePicture,
    });
    await newComment.save();
    res.status(200).json("Comment Added");
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getAllComments = async (req, res) => {
  const { messId } = req.body;
  try {
    const result = await comments.find({ messId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
