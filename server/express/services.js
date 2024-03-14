import { LoginLinkModel, ThreadModel, UserModel } from '../db/mongo.js'

class Services {
  async getThreads() {
    const threads = await ThreadModel.find({})
    console.log(threads)
    return threads
  }
}

export default new Services()
