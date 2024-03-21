export interface ThreadSchema {
  shortName: string
  fullName: string
  authorId: string
  description: string
  lastUpdateDate: Date
  creationDate: Date
  numberOfPosts: number
  numberOfLikes: number
  numberOfDislikes: number
  logo: string

  //   isAvailable: {
  //     type: string
  //     enum: ['all', 'authorized', 'limited']
  //     default: 'all'
  //   }
  //   hasAccess: [{ type: 'string'; ref: 'User' }]
}

export type ReactionSchema = {
  react: string
}

export type PostSchema = {
  _id: number
  number: number
  postId: string
  threadId: string
  anonName: string
  authorId: string
  content: string
  editHistory: string[]
  creationDate: Date
  numberOfLikes: number
  numberOfDislikes: number
  replies: string
  files: FileSchema[]
  user: UserSchema
}

export type FileSchema = {
  filename: string
  contentType: string
}

export type VotesThreadSchema = {
  userId: string
  threadId: string
  vote: number
}

export type EmojiPostsSchema = {
  userId: string
  threadId: string
  postId: string
  emojiId: string
}

export type VotesPostsSchema = {
  userId: string
  threadId: string
  postId: string
  vote: number
}

export type UserSchema = {
  _id: number
  imageUrl: string
  username: string
  email: string
  userImg: string
  karma: number
  registrationDate: Date
  lastLoginDate: Date
  numberOfPosts: number
  numberOfComments: number
  respect: string[]
  hatred: string[]
  subscriptions: string[]
  roles: string[]
}

export type BanSchema = {
  userId: string
  ip: string
  start: Date
  end: Date
  type: number
  reason: string
  whoGaveBan: string
}
