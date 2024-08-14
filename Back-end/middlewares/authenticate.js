const { GoogleGenerativeAI } = require("@google/generative-ai");

const jwt = require("jsonwebtoken");

const postAuthenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const verify = await jwt.verify(token, process.env.SECRET_KEY);
  //decode token and get the user
  req.user = verify.id;
  next();
};

const checkingPost = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: "fails",
      message: "Your are not logged in yet, please login first",
    });
  }
  const verify = await jwt.verify(token, process.env.SECRET_KEY);
  //decode token and get the user
  req.user = verify.id;

  next();
};

//method to find issue message
const findIssueMessage = (issue) => {
  switch (issue) {
    case "HARM_CATEGORY_SEXUALLY_EXPLICIT":
      return "We detected sexually explicit content, please make a change on your post.";
    case "HARM_CATEGORY_HATE_SPEECH":
      return "We detected hate speech , please make a change on your post.";
    case "HARM_CATEGORY_HARASSMENT":
      return "We detected Harassment, please make a change on your post.";
    case "HARM_CATEGORY_DANGEROUS_CONTENT":
      return "We detected dangerous content, please make a change on your post.";
    default:
      return "We detected abusive content, please make a change on your post.";
  }
};

//run to check the post for abusive words or threaten
const checkUserPost = async (req, res, next) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI);
    const text = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result =
      await model.generateContent(`Just generate answer in text if the given text contains any of this abusive or threaten or harassment or bullying or hate speech or personal attacks or 
      sexual harassment or threat of self harm  or blackmail to people if this text does not
    contain any of this just return ok: ${text}`);
    const response = await result.response;
    const responseText = response.text();
    if (responseText === "ok") {
      next();
    }
  } catch (error) {
    const ratings = error.response.candidates;
    ratings.map((rate) => {
      rate.safetyRatings.map((category) => {
        if (
          category.probability === "HIGH" ||
          category.probability === "MEDIUM"
        ) {
          return res.status(400).json({
            status: "fail",
            message: findIssueMessage(category.category),
          });
        }
      });
    });
  }
};
module.exports = {
  postAuthenticate,
  checkingPost,
  checkUserPost,
};
