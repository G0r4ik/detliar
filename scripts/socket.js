// const socket = io('http://127.0.0.1:30000', { auth: { serverOffset: 0 } })
const socket = io('https://api.detliar.com', { auth: { serverOffset: 0 } })

const countUsers = document.querySelector('.users-count__count')
const form = document.querySelector('.comments__form')
const text = document.querySelector('#comment-text')
const user = document.querySelector('#comment-user')
const messages = document.querySelector('.comments__messages')
const sendMessage = document.querySelector('.comments__send-button')

sendMessage.addEventListener('click', e => {
  e.preventDefault()
  const userValue = user.value.trim()
  const textValue = text.value.trim()
  if (userValue && textValue) {
    socket.emit('chat message', { text: textValue, user: userValue })
    text.value = ''
  }
})

socket.on('chat message', (msg, serverOffset) => {
  const messageElement = document.createElement('div')
  messageElement.classList.add('messages__item', 'message')

  messageElement.innerHTML = `
        <div class="message__name">${msg.user}</div>
        <div class="message__text">${msg.text}</div>
        <div class="message__date">${msg.date}</div>
      `

  messages.insertBefore(messageElement, messages.children[0])
  socket.auth.serverOffset = serverOffset
})

socket.on('changeUserCount', msg => {
  console.log(msg)
  countUsers.textContent = msg
})

//
