import clerkClient from '@clerk/clerk-sdk-node'
import { checkParameters } from '../shared/helpers.js'
import services from './services.js'

class Controllers {
  async getThreads(req, res, next) {
    try {
      const threads = await services.getThreads()
      return res.json(threads)
    } catch (error) {
      //errorHandler(error, 'createThread')
      next(error)
    }
  }
  async getThreadInfo(req, res, next) {
    try {
      const { idThread } = req.params
      const thread = await services.getThreadInfo(idThread)
      return res.json(thread)
    } catch (error) {
      console.error(error)
      //errorHandler(error, 'createThread')
      next(error)
    }
  }
  async getThrea1d(req, res, next) {
    try {
    } catch (error) {
      errorHandler(error, 'createThread')
      next(error)
    }
  }
  async createThread(req, res, next) {
    try {
      const { shortName, fullName, authorId, description } = req.body
      checkParameters('createThread', { shortName, fullName, authorId })
      const threads = await services.createThread(
        shortName,
        fullName,
        authorId,
        description
      )
      res.json(threads)
    } catch (error) {
      console.log(error)
      errorHandler(error, 'createThread')
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      const { username, email, userImg } = req.body
      checkParameters({ username, email }) // Validate required parameters
      const user = await services.createUser(username, email, userImg)
      res.json(user)
    } catch (error) {
      errorHandler(error, 'createUser')
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      const { idThread } = req.params
      const { authorId, content, anonName } = req.body
      checkParameters({ idThread, content })
      const post = await services.createPost(
        idThread,
        content,
        authorId,
        anonName
      )
      res.json(post)
    } catch (error) {
      console.log(error)
      errorHandler(error, 'createPost')
      next(error)
    }
  }

  async createFile(req, res, next) {
    try {
      const { filename, contentType } = req.body
      checkParameters({ filename, contentType })
      const file = await services.createFile(filename, contentType)
      res.json(file)
    } catch (error) {
      errorHandler(error, 'createFile')
      next(error)
    }
  }

  async createVoteThread(req, res, next) {
    try {
      const { userId, threadId, vote } = req.body
      checkParameters({ userId, threadId, vote })
      const voteThread = await services.createVoteThread(userId, threadId, vote)
      res.json(voteThread)
    } catch (error) {
      errorHandler(error, 'createVoteThread')
      next(error)
    }
  }

  async createEmojiPost(req, res, next) {
    try {
      const { userId, threadId, postId, emojiId } = req.body
      checkParameters({ userId, threadId, postId, emojiId })
      const emojiPost = await services.createEmojiPost(
        userId,
        threadId,
        postId,
        emojiId
      )
      res.json(emojiPost)
    } catch (error) {
      errorHandler(error, 'createEmojiPost')
      next(error)
    }
  }

  async createVotePost(req, res, next) {
    try {
      const { userId, threadId, postId, vote } = req.body
      checkParameters({ userId, threadId, postId, vote })
      const votePost = await services.createVotePost(
        userId,
        threadId,
        postId,
        vote
      )
      res.json(votePost)
    } catch (error) {
      errorHandler(error, 'createVotePost')
      next(error)
    }
  }

  async createBan(req, res, next) {
    try {
      const { userId, ip, start, end, type, reason, whoGaveBan } = req.body
      checkParameters({ userId, ip, start, end, type, reason, whoGaveBan })
      const ban = await services.createBan(
        userId,
        ip,
        start,
        end,
        type,
        reason,
        whoGaveBan
      )
      res.json(ban)
    } catch (error) {
      errorHandler(error, 'createBan')
      next(error)
    }
  }

  //

  async getVotesPost(req, res, next) {
    try {
      const { idThread, idPost } = req.params
      const votes = await services.getVotesPost(idThread, idPost)
      res.json(votes)
    } catch (error) {
      errorHandler(error, 'getVotesPost')
      next(error)
    }
  }

  async createVotePost(req, res, next) {
    try {
      checkParameters({
        /* required parameters for createVotePost */
      })
      const vote = await services.createVotePost(req.body)
      res.json(vote)
    } catch (error) {
      errorHandler(error, 'createVotePost')
      next(error)
    }
  }

  //

  async getBans(req, res, next) {
    try {
      const bans = await services.getBans()
      res.json(bans)
    } catch (error) {
      errorHandler(error, 'getBans')
      next(error)
    }
  }

  async getBanById(req, res, next) {
    try {
      const { idBan } = req.params
      const ban = await services.getBanById(idBan)
      res.json(ban)
    } catch (error) {
      errorHandler(error, 'getBanById')
      next(error)
    }
  }

  async createBan(req, res, next) {
    try {
      checkParameters({
        /* required parameters for createBan */
      })
      const ban = await services.createBan(req.body)
      res.json(ban)
    } catch (error) {
      errorHandler(error, 'createBan')
      next(error)
    }
  }

  async deleteBan(req, res, next) {
    try {
      const { idBan } = req.params
      await services.deleteBan(idBan)
      res.json({ message: 'Ban deleted successfully' })
    } catch (error) {
      errorHandler(error, 'deleteBan')
      next(error)
    }
  }

  //

  //
  //

  getVotesThread(req, res, next) {
    try {
    } catch (error) {}
  }
  getEmojiPosts(req, res, next) {
    try {
    } catch (error) {}
  }
  getReactions(req, res, next) {
    try {
    } catch (error) {}
  }
  createReaction(req, res, next) {
    try {
    } catch (error) {}
  }
  deletePost(req, res, next) {
    try {
    } catch (error) {}
  }
  editPost(req, res, next) {
    try {
    } catch (error) {}
  }

  //
  //
  //

  async getPosts(req, res, next) {
    try {
      const { idThread } = req.params
      const users = await clerkClient.users.getUserList()
      const posts = await services.getPosts(idThread, users)
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Controllers()
