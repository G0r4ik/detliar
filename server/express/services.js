import mongoose from 'mongoose'
import {
  EmojiPostsModel,
  PostModel,
  ReactionModel,
  ThreadModel,
  UserModel,
} from '../db/mongo.js'
import clerkClient from '@clerk/clerk-sdk-node'
import { io } from '../socket.js'

function normalizeUser(user) {
  return {
    id: user.id,
    imageUrl: user.imageUrl,
    username: user.username,
  }
}

class Services {
  async getThreads() {
    const threads = await ThreadModel.find({})
    return threads
  }

  async getThreadInfo(idThread) {
    const threads = await ThreadModel.findOne({ shortName: `/${idThread}` })
    return threads
  }

  async createThread(shortName, fullName, authorId, description) {
    const thread = await ThreadModel.create({
      shortName,
      fullName,
      authorId,
      description,
    })

    thread.save()
    io.emit('create_thread', thread)
  }

  async createReaction(idThread, idPost, react, user) {
    console.log(user)
    const emoji = await EmojiPostsModel.create({
      threadId: idThread,
      postId: idPost,
      emoji: react,
      userId: user,
    })

    io.emit('reaction', emoji)
  }

  async getPosts(idThread) {
    try {
      const posts = await PostModel.find({ threadId: idThread }, '')

      const users = await clerkClient.users.getUserList()

      const parsedPosts = JSON.parse(JSON.stringify(posts))
      const reactionsInThread = await EmojiPostsModel.find({
        threadId: idThread,
      })

      function group(emojis) {
        const res = {}
        for (let i = 0; i < emojis.length; i++) {
          const emoji = emojis[i]
          if (!res[emoji.emoji]) {
            res[emoji.emoji] = {
              emoji: emoji.emoji,
              count: 1,
              users: [emoji.userId],
            }
          } else {
            res[emoji.emoji].count++
            res[emoji.emoji].users.push(emoji.userId)
          }
        }
        return Object.values(res)
      }

      for (let i = 0; i < parsedPosts.length; i++) {
        const post = parsedPosts[i]
        post.reactions = group(
          reactionsInThread.filter(r => r.postId.toString() === post._id)
        )
        if (post.authorId) {
          const user = users.find(user => user.id === post.authorId)
          post.user = normalizeUser(user)
        } else {
          post.user = { username: post.anonName || 'Anonymous' }
        }
      }

      return parsedPosts
    } catch (error) {
      console.error('Error getting posts:', error)
      throw error
    }
  }

  async createPost(threadId, content, authorId, anonName) {
    try {
      const thread = await ThreadModel.findOneAndUpdate(
        { shortName: `/${threadId}` },
        { $inc: { numberOfPosts: 1 } },
        { new: true, upsert: true }
      )

      let user
      if (authorId) {
        user = await clerkClient.users.getUser(authorId)
      }

      const postData = {
        threadId,
        content,
        number: thread.numberOfPosts,
        ...(authorId ? { authorId } : { anonName }),
      }

      const post = await PostModel.create(postData)

      return { ...post._doc, user }
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }
}

export default new Services()
