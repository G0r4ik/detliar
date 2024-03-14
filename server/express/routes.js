import express from 'express'
import controllers from './controllers.js'
const router = express.Router()

router.get('/getThreads', controllers.getThreads)
router.post('/createThread', (req, res) => controllers.createThread)
router.delete('/deleteThread', (req, res) => res.json(111))

//

router.get('/threads/:idThread/posts', controllers.getPosts)
router.post('/threads/:idThread/posts', controllers.createPost)
router.delete('/posts/:idPost', controllers.deletePost)
router.put('/posts/:idPost', controllers.editPost)

//

router.get(
  '/threads/:idThread/posts/:idPost/reactions',
  controllers.getReactions
)
router.post(
  '/threads/:idThread/posts/:idPost/reactions',
  controllers.createReaction
)

router.get('/threads/:idThread/votes', controllers.getVotesThread)
router.post('/threads/:idThread/votes', controllers.createVoteThread)

router.get('/threads/:idThread/posts/:idPost/emojis', controllers.getEmojiPosts)
router.post(
  '/threads/:idThread/posts/:idPost/emojis',
  controllers.createEmojiPost
)

router.get('/threads/:idThread/posts/:idPost/votes', controllers.getVotesPost)
router.post(
  '/threads/:idThread/posts/:idPost/votes',
  controllers.createVotePost
)

router.get('/bans', controllers.getBans)
router.get('/bans/:idBan', controllers.getBanById)
router.post('/bans', controllers.createBan)
router.delete('/bans/:idBan', controllers.deleteBan)

router.get('/loginLinks/:code', controllers.getLoginLink)
router.post('/loginLinks', controllers.createLoginLink)

router.get('/registrationLinks/:code', controllers.getRegistrationLink)
router.post('/registrationLinks', controllers.createRegistrationLink)

export default router
