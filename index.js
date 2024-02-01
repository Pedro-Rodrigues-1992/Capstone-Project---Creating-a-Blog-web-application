import express from "express";
import bodyParser from "body-parser";
import { validatePostTitle } from "./public/scripts/postValidations.js";

const app = express();
const port = 3000;

let Posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"))

app.get("/", (req,res)=>  {
  res.render("index.ejs", { Posts: Posts });
})

app.get("/newPost", (req,res)=>  {
    res.render("newPost.ejs", { error: null })
})

app.post("/newPost", (req, res) => {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postContent;

  const validationError = validatePostTitle(postTitle, Posts);
  if (validationError.error) {
      return res.status(400).render("newPost.ejs", { error: validationError.error });
  }
  
  const newPost = { title: postTitle, content: postContent };
  Posts.push(newPost);   
   
  res.redirect("/");
});

app.get("/about", (req,res)=>  {
  res.render("about.ejs")
})

app.get("/contact", (req,res)=>  {
  res.render("contact.ejs")
})

app.get("/update/:title", (req, res) => {
  const postTitle = req.params.title;
  const post = Posts.find(post => post.title === postTitle);
  if (post) {
      res.render("update.ejs", { post: post });
  } else {
      res.status(404).send("Post not found");
  }
});

app.post("/update/:title", (req, res) => {
  const oldTitle = req.params.title;
  const newTitle = req.body.postTitle;
  const newContent = req.body.postContent;

  const postToUpdate = Posts.find(post => post.title === oldTitle);
  if (!postToUpdate) {
      return res.status(404).send("Post not found");
  }

  postToUpdate.title = newTitle;
  postToUpdate.content = newContent;

  res.redirect("/");
});

app.get("/:title", (req, res) => {
  const postTitle = req.params.title;
  const post = Posts.find(post => post.title === postTitle);
  if (post) {
    res.render("Post.ejs", { title: post.title, content: post.content});
  } else {
    res.render("error.ejs", { message: "Post not found" });
  }
});

app.delete("/delete/:title", (req, res) => {
  const postTitle = req.params.title;
  const index = Posts.findIndex(post => post.title === postTitle);
  if (index !== -1) {
      Posts.splice(index, 1);
      res.sendStatus(200); // Send success status
  } else {
      res.status(404).send("Post not found");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
