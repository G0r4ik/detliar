import { ThreadModel, UserModel } from '../db/mongo.js'

class Services {
  async getThreads() {
    const threads = await ThreadModel.find({})
    console.log(threads)
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
}

export default new Services()
