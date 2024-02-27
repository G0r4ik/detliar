const socket = io('https://api.detliar.com', {
  auth: {
    serverOffset: 0,
  },
})

const form = document.getElementById('form-message')
const text = document.getElementById('text')
const user = document.getElementById('user')
const messages = document.getElementById('messages')
const sendMessage = document.getElementById('send-message')

sendMessage.addEventListener('click', e => {
  e.preventDefault()
  if (text.value && user.value) {
    socket.emit('chat message', { text: text.value, user: user.value })
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

  const messages = document.getElementById('messages')
  messages.insertBefore(messageElement, messages.children[0])
  socket.auth.serverOffset = serverOffset
})
//
