import mongoose from 'mongoose'
import { PostModel, ThreadModel, UserModel } from '../db/mongo.js'
import clerkClient from '@clerk/clerk-sdk-node'

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
  }

  //
  //
  //
  //

  async getPosts(idThread) {
    // const thread = await ThreadModel.findOne({ shortName: `/${idThread}` })
    // console.log(thread)
    const posts1 = await PostModel.find({ threadId: `${idThread}` })
    const posts = JSON.parse(JSON.stringify(posts1))
    console.log('getPosts')
    // console.log(posts)
    for (let i = 0; i < posts.length; i++) {
      console.log('getPosts for')

      if (posts[i].authorId) {
        const user = await clerkClient.users.getUser(posts[i].authorId)
        posts[i].user = user
      } else {
        posts[i].user = {
          username: posts[i].anonName,
        }
      }
    }
    return posts
  }

  async createPost(threadId, content, authorId, anonName) {
    const thread = await ThreadModel.findOne({ shortName: `/${threadId}` })
    const newV = thread.numberOfPosts + 1
    thread.updateOne(
      await ThreadModel.updateOne(
        { shortName: `/${threadId}` },
        { $set: { numberOfPosts: newV } },
        { upsert: true }
      )
    )

    let posts
    if (authorId) {
      posts = await PostModel.create({
        postId: new mongoose.Types.ObjectId(),
        threadId,
        authorId,
        content,
        number: newV,
      })
    } else {
      posts = await PostModel.create({
        postId: new mongoose.Types.ObjectId(),
        threadId,
        anonName,
        content,
        number: newV,
      })
    }
    posts.save()
    return posts
  }
}

export default new Services()
