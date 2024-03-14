import services from './services.js'

class Controllers {
  async getThreads(req, res, next) {
    try {
      const threads = await services.getThreads()
      return res.json(threads)
    } catch (error) {
      console.log(error)
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
      console.log(1)
      const { shortName, fullName, authorId, description } = req.body
      checkParams({ shortName, fullName, authorId })
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
      checkParams({ username, email }) // Validate required parameters
      const user = await services.createUser(username, email, userImg)
      res.json(user)
    } catch (error) {
      errorHandler(error, 'createUser')
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      const { threadId, authorId, content } = req.body
      checkParams({ threadId, authorId, content })
      const post = await services.createPost(threadId, authorId, content)
      res.json(post)
    } catch (error) {
      errorHandler(error, 'createPost')
      next(error)
    }
  }

  async createFile(req, res, next) {
    try {
      const { filename, contentType } = req.body
      checkParams({ filename, contentType })
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
      checkParams({ userId, threadId, vote })
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
      checkParams({ userId, threadId, postId, emojiId })
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
      checkParams({ userId, threadId, postId, vote })
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
      checkParams({ userId, ip, start, end, type, reason, whoGaveBan })
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

  async createLoginLink(req, res, next) {
    try {
      const { code } = req.body
      checkParams({ code })
      const loginLink = await services.createLoginLink(code)
      res.json(loginLink)
    } catch (error) {
      errorHandler(error, 'createLoginLink')
      next(error)
    }
  }

  async createRegistrationLink(req, res, next) {
    try {
      const { code, userId } = req.body
      checkParams({ code, userId })
      const registrationLink = await services.createRegistrationLink(
        code,
        userId
      )
      res.json(registrationLink)
    } catch (error) {
      errorHandler(error, 'createRegistrationLink')
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
      checkParams({
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
      checkParams({
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
  async getLoginLink(req, res, next) {
    try {
      const { code } = req.params
      const loginLink = await services.getLoginLink(code)
      res.json(loginLink)
    } catch (error) {
      errorHandler(error, 'getLoginLink')
      next(error)
    }
  }

  async createLoginLink(req, res, next) {
    try {
      checkParams({
        /* required parameters for createLoginLink */
      })
      const loginLink = await services.createLoginLink(/* login link data */)
      res.json(loginLink)
    } catch (error) {
      errorHandler(error, 'createLoginLink')
      next(error)
    }
  }

  //

  async getRegistrationLink(req, res, next) {
    try {
      const { code } = req.params
      const registrationLink = await services.getRegistrationLink(code)
      res.json(registrationLink)
    } catch (error) {
      errorHandler(error, 'getRegistrationLink')
      next(error)
    }
  }

  async createRegistrationLink(req, res, next) {
    try {
      checkParams({
        /* required parameters for createRegistrationLink */
      })
      const registrationLink =
        await services.createRegistrationLink(/* registration link data */)
      res.json(registrationLink)
    } catch (error) {
      errorHandler(error, 'createRegistrationLink')
      next(error)
    }
  }

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

  getPosts(req, res, next) {
    try {
    } catch (error) {}
  }
  getPosts(req, res, next) {
    try {
    } catch (error) {}
  }
}

export default new Controllers()
