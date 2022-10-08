const express = require("express")

const Post = require('../models/post')

const router = express.Router()

//create
router.post('/', async(req,res)=>{
     const newPost = new Post(req.body)
     try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
     }catch(err){
        res.status(500).json(err)
     }
})

//update
router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        await post.updateOne({$set: req.body})
        res.status(200).json("updated")

    }else{
        res.status(500).json("you can update only your posts")
    }
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        await post.deleteOne({$set: req.body})
        res.status(200).json("deleted")

    }else{
        res.status(500).json("you can delete only your posts")
    }
    }catch(err){
        res.status(500).json(err)
    }
})
//like
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get a post
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get timeline posts
  
  router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router