import mongoose from 'mongoose'

const conntect = await mongoose.connect(
  'mongodb://admin:mongodbpasswordsecret@217.151.231.54:27017/'
)

export default conntect

const Schema = mongoose.Schema
const mongoId = Schema.Types.ObjectId

const ThreadSchema = new Schema({
  shortName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
    index: true,
    lowercase: true,
    match: /[a-z]/,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  authorId: { type: String, required: true },
  description: { type: String, trim: true, maxlength: 500 },
  lastUpdateDate: { type: Date, default: Date.now },
  creationDate: { type: Date, default: Date.now },
  numberOfPosts: { type: Number, default: 0 },
  numberOfLikes: { type: Number, default: 0 },
  numberOfDislikes: { type: Number, default: 0 },
  isAvailable: {
    type: String,
    enum: ['all', 'authorized', 'limited'],
    default: 'all',
  },
  hasAccess: [{ type: mongoId, ref: 'User' }],
})

const ReactionSchema = new Schema(
  {
    react: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 3,
    },
  },
  { strict: false }
)

const PostSchema = new Schema(
  {
    threadId: { type: String, ref: 'Thread', required: true },
    number: { type: Number, required: true },
    anonName: { type: String, trim: true, maxlength: 50 },
    authorId: { type: String, required: false },
    content: { type: String, required: true, trim: true, maxlength: 10000 },
    editHistory: [{ type: String, trim: true, maxlength: 10000 }],
    creationDate: { type: Date, default: Date.now },
    numberOfLikes: { type: Number, default: 0 },
    numberOfDislikes: { type: Number, default: 0 },
    replies: { type: mongoId, ref: 'Post' },
    files: [{ type: mongoId, ref: 'File' }],
  },
  { strict: false }
)

const FileSchema = new Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  { strict: false }
)

const VotesThreadSchema = new Schema(
  {
    userId: { type: mongoId, ref: 'User', required: true },
    threadId: { type: mongoId, ref: 'Thread', required: true },
    vote: { type: Number, required: true, enum: [-1, +1] },
  },
  { strict: false }
)

const EmojiPostsSchema = new Schema(
  {
    userId: { type: mongoId, ref: 'User', required: true },
    threadId: { type: mongoId, ref: 'Thread', required: true },
    postId: { type: mongoId, ref: 'Post', required: true },
    emojiId: { type: mongoId, ref: 'Emoji', required: true },
  },
  { strict: false }
)

const VotesPostsSchema = new Schema(
  {
    userId: { type: mongoId, ref: 'User', required: true },
    threadId: { type: mongoId, ref: 'Thread', required: true },
    postId: { type: mongoId, ref: 'Post', required: true },
    vote: { type: Number, required: true, enum: [-1, +1] },
  },
  { strict: false }
)

const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    userImg: { type: String, trim: true },
    karma: { type: Number, default: 0 },
    registrationDate: { type: Date, default: Date.now },
    lastLoginDate: { type: Date, default: Date.now },
    numberOfPosts: { type: Number, default: 0 },
    numberOfComments: { type: Number, default: 0 },
    respect: [{ type: mongoId, ref: 'User' }],
    hatred: [{ type: mongoId, ref: 'User' }],
    subscriptions: [{ type: mongoId, ref: 'Subscription' }],
    roles: [{ type: String, enum: ['user', 'moderator', 'admin'] }],
  },
  { strict: false }
)

const BanSchema = new Schema(
  {
    userId: { type: mongoId, ref: 'User', required: true },
    ip: { type: String, trim: true },
    start: { type: Date, required: true },
    end: { type: Date },
    type: { type: Number, required: true, enum: [0, 1] },
    reason: { type: String, trim: true },
    whoGaveBan: { type: mongoId, ref: 'User', required: true },
  },
  { strict: false }
)

//
//
//

const SETTINGS = {
  anonPrivilegies: { messagePerDay: 50, vote_per_day: 0, emoji_per_day: 0 },

  allPrivilegies: {
    messagesPerDay: 1000,
    vote_per_day: 100,
    emoji_per_day: 200,
  },
}

//
//
//

export const ThreadModel = mongoose.model('Thread', ThreadSchema)
export const PostModel = mongoose.model('Post', PostSchema)
export const FileModel = mongoose.model('File', FileSchema)

export const UserModel = mongoose.model('User', UserSchema)
export const BanModel = mongoose.model('Ban', BanSchema)
export const ReactionModel = mongoose.model('Reaction', ReactionSchema)
export const VotesThreadModel = mongoose.model('VotesThread', VotesThreadSchema)
export const EmojiPostsModel = mongoose.model('EmojiPosts', EmojiPostsSchema)
export const VotesPostsModel = mongoose.model('VotesPosts', VotesPostsSchema)

async function createUser(username, email, userImg) {
  try {
    const user = new UserModel({ username, email, userImg })
    return await user.save()
  } catch (error) {
    console.log(error)
  }
}

//
//

async function createThread(shortName, fullName, authorId, description) {
  try {
    const thread = new ThreadModel({
      shortName,
      fullName,
      authorId,
      description,
    })
    return await thread.save()
  } catch (error) {
    console.log('Error creating thread:', error)
  }
}

// const thread1 = await createThread(
//   '/test',
//   'This is a test thread',
//   '65ef313ba541b0500d45c358',
//   'A thread for testing purposes.'
// )

async function createPost(threadId, authorId, content) {
  try {
    const post = new PostModel({ threadId, authorId, content })
    return await post.save()
  } catch (error) {
    console.log('Error creating post:', error)
  }
}

// const post1 = await createPost('thread1_id', 'user1_id', 'This is the first post in the test thread.');

async function createFile(filename, contentType) {
  try {
    const file = new FileModel({ filename, contentType })
    return await file.save()
  } catch (error) {
    console.log('Error creating file:', error)
  }
}

// const file1 = await createFile('test_image.png', 'image/png');

async function createVoteThread(userId, threadId, vote) {
  try {
    const voteThread = new VotesThreadModel({ userId, threadId, vote })
    return await voteThread.save()
  } catch (error) {
    console.log('Error creating vote for thread:', error)
  }
}

// const voteThread1 = await createVoteThread('user1_id', 'thread1_id', 1);

async function createEmojiPost(userId, threadId, postId, emojiId) {
  try {
    const emojiPost = new EmojiPostsModel({ userId, threadId, postId, emojiId })
    return await emojiPost.save()
  } catch (error) {
    console.log('Error creating emoji for post:', error)
  }
}

// const emojiPost1 = await createEmojiPost('user1_id', 'thread1_id', 'post1_id', 'emoji1_id');

async function createVotePost(userId, threadId, postId, vote) {
  try {
    const votePost = new VotesPostsModel({ userId, threadId, postId, vote })
    return await votePost.save()
  } catch (error) {
    console.log('Error creating vote for post:', error)
  }
}

// const votePost1 = await createVotePost('user1_id', 'thread1_id', 'post1_id', 1);

async function createBan(userId, ip, start, end, type, reason, whoGaveBan) {
  try {
    const ban = new BanModel({
      userId,
      ip,
      start,
      end,
      type,
      reason,
      whoGaveBan,
    })
    return await ban.save()
  } catch (error) {
    console.log('Error creating ban:', error)
  }
}

// const ban1 = await createBan('user1_id', '127.0.0.1', '2024-03-10T00:00:00.000Z', '2024-03-12T23:59:59.000Z', 0, 'Spamming in threads', 'user2_id');
