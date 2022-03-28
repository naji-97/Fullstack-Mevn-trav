const router = require('express').Router()
const mongodb = require('mongodb')



// Get Posts /api/posts
router.get('/', async (req,res)=>{
    const posts = await main()
    res.send(await posts.find({}).toArray())
})

// Add Posts
router.post('/',async(req,res)=>{
  const posts = await main()

 await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })

  res.status(201).send()

})

// Delete Post
router.delete('/:id',async(req,res)=>{
  const posts = await main()
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send()
    
})

// async function loadPostsCollection()  {
//   const uri =   'mongodb+srv://naji:naji1234@cluster0.trk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//   const client =  mongodb.MongoClient.connect(uri, {
//     useNewUrlParser:true
//   })
//   return client.db('vue_express').collection('posts')
// }



const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://naji:naji1234@cluster0.trk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url, {useNewUrlParser:true});

// Database Name
const dbName = 'vue-express';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
 
  // the following code examples can be pasted here...

  return  db = client.db(dbName).collection('posts');
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

module.exports = router