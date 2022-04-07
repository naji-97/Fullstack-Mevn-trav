const router = require('express').Router()
const mongodb = require('mongodb')



// Get Posts /api/posts
router.get('/', async (req,res)=>{
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray())
})

// Add Posts
router.post('/',async(req,res)=>{
  const posts = await loadPostsCollection()

 await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })

  res.status(201).send()

})

// Delete Post
router.delete('/:id',async(req,res)=>{
  const posts = await loadPostsCollection()
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send()
    
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://naji:naji1234@cluster0.trk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('posts');
}




module.exports = router