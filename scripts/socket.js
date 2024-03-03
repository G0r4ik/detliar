// const socket = io('http://127.0.0.1:30000', { auth: { serverOffset: 0 } })
const socket = io('https://api.detliar.com', { auth: { serverOffset: 0 } })

const countUsers = document.querySelector('.users-count__count')
const form = document.querySelector('.comments__form')
const text = document.querySelector('#comment-text')
const user = document.querySelector('#comment-user')
const messages = document.querySelector('.comments__messages')
const sendMessage = document.querySelector('.comments__send-button')
const screens = document.querySelector('.comments__screens')

sendMessage.addEventListener('click', e => {
  e.preventDefault()
  const userValue = user.value.trim()
  const textValue = text.value.trim()
  console.log(imgs)
  if (userValue && textValue) {
    console.log(555)
    socket.emit('chat message', { text: textValue, user: userValue, imgs })
    screens.innerHTML = ''
    imgs = []
    text.value = ''
    console.log(666)
  }
})

socket.on('chat message', (msg, serverOffset) => {
  const messageElement = document.createElement('div')
  messageElement.classList.add('messages__item', 'message')

  const messageFiles = document.createElement('div')
  messageFiles.classList.add('message__files')

  messageElement.innerHTML = `
        <div class="message__name">${msg.user}</div>
        <div class="message__text">${msg.text}</div>
        `

  messageElement.appendChild(messageFiles)
  for (const url of msg.imgs) {
    const img = document.createElement('img')
    img.classList.add('message__screen')
    img.src = url
    messageFiles.appendChild(img)
  }
  const dateD = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(msg.date))

  messageElement.innerHTML += `<div class="message__date">${dateD}</div>`

  messages.insertBefore(messageElement, messages.children[0])
  socket.auth.serverOffset = serverOffset
})

socket.on('changeUserCount', msg => {
  console.log('Пользователей на сайте: ' + msg)
  countUsers.textContent = msg
})

let imgs = []

text.addEventListener('paste', function (event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items

  for (index in items) {
    const item = items[index]
    if (item.kind === 'file') {
      const blob = item.getAsFile()
      const reader = new FileReader()
      reader.onload = function (e) {
        const imageData = e.target.result
        const img = document.createElement('img')
        img.classList.add('comments__screen')
        img.src = imageData
        screens.append(img)
        imgs.push(imageData)
      }
      reader.readAsDataURL(blob)
    }
  }
})

//
