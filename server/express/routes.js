import express from 'express'
import controllers from './controllers.js'
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from '@clerk/clerk-sdk-node'
const router = express.Router()

// ThreadSchema
router.get('/getThreads', controllers.getThreads)
router.get('/getThreadInfo/:idThread', controllers.getThreadInfo)
router.post(
  '/createThread',
  ClerkExpressRequireAuth(),
  controllers.createThread
)
router.delete('/deleteThread', (req, res) => res.json(111))

// PostSchema

router.get('/threads/:idThread/posts', controllers.getPosts)
router.post('/threads/:idThread/posts', controllers.createPost)
router.delete('/posts/:idPost', controllers.deletePost)
router.put('/posts/:idPost', controllers.editPost)

// ReactionSchema

router.get(
  '/threads/:idThread/posts/:idPost/reactions',
  controllers.getReactions
)
router.post(
  '/threads/:idThread/posts/:idPost/react',
  ClerkExpressRequireAuth(),
  controllers.createReaction
)

// VotesThreadSchema

router.get('/threads/:idThread/votes', controllers.getVotesThread)
router.post('/threads/:idThread/votes', controllers.createVoteThread)

// EmojiPostsSchema

router.get('/threads/:idThread/posts/:idPost/emojis', controllers.getEmojiPosts)
router.post(
  '/threads/:idThread/posts/:idPost/emojis',
  controllers.createEmojiPost
)

// VotesPostsSchema

router.get('/threads/:idThread/posts/:idPost/votes', controllers.getVotesPost)
router.post(
  '/threads/:idThread/posts/:idPost/votes',
  controllers.createVotePost
)

// BanSchema

router.get('/bans', controllers.getBans)
router.get('/bans/:idBan', controllers.getBanById)
router.post('/bans', controllers.createBan)
router.delete('/bans/:idBan', controllers.deleteBan)

export default router

// FileSchema UserSchema
