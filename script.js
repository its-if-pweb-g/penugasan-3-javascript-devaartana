const form = document.querySelector('#form')
const inputs = form.querySelectorAll('input, textarea')
const sendTxt = document.querySelector('#snd-txt')
const sendAnimation = document.querySelector('#snd-animation')
const textField = document.querySelector('#textField')
const textFieldTarget = document.querySelector('#text-result')
const detailBtn = document.querySelectorAll('#anime, #manhwa')

form.addEventListener('submit', (event) => {

  event.preventDefault();

  let formStatus = true;
  inputs.forEach(input => {
    const targetWrnText = document.querySelector('#' + input.id + '-wrn')

    if (!input.value.trim().length) {
      targetWrnText.classList.remove('hidden')
      formStatus = false;
    } else {
      targetWrnText.classList.add('hidden')
    }
  })

  if (formStatus) {
    sendTxt.classList.add('hidden')
    sendAnimation.classList.remove('hidden')

    const nama = document.querySelector('#nama')
    const email = document.querySelector('#email')
    const pesan = document.querySelector('#pesan')
    const scsMsg = document.querySelector('#scs-msg')

    const data = {
      nama: nama.value,
      email: email.value,
      pesan: pesan.value
    }

    fetch('https://debug.nafkhanzam.com/web-programming-e03', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'no-cors'
    }).then(response => {

      sendAnimation.classList.add('hidden')
      sendTxt.classList.remove('hidden')

      nama.value = ''
      email.value = ''
      pesan.value = ''

      scsMsg.classList.remove('hidden')

      setTimeout(() => {
        scsMsg.classList.add('hidden')
      }, 3000)

    })
  }
})

document.addEventListener('DOMContentLoaded', () => {
  textField.value = localStorage.getItem('dataText')
  textFieldTarget.value = localStorage.getItem('dataText')
  textFieldTarget.style.height = `${textField.scrollHeight}px`
})

detailBtn.forEach(btn => btn.addEventListener('click', () => {
  const detailTarget = document.querySelector('#' + btn.id + '-detail')

  if (detailTarget.classList.contains('hidden')) {
    detailTarget.classList.remove('hidden')
  } else {
    detailTarget.classList.add('hidden')
  }
}))

textField.addEventListener('input', () => {
  textFieldTarget.style.height = `${textField.scrollHeight}px`
  textFieldTarget.value = textField.value

  localStorage.setItem('dataText', textField.value)
})

window.addEventListener('resize', () => {
  textFieldTarget.style.height = `${textField.scrollHeight}px`
  textFieldTarget.value = textField.value
})