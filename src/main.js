import './style.css'

const formular = document.querySelector('#formular')
const eingabe = document.querySelector('#eingabe')
const liste = document.querySelector('#liste')

formular.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = eingabe.value.trim()
  if (text === '') return

  const eintrag = document.createElement('li')
  const name = document.createElement('span')
  name.textContent = text

  const loeschen = document.createElement('button')
  loeschen.textContent = 'Löschen'
  loeschen.addEventListener('click', () => eintrag.remove())

  eintrag.append(name, loeschen)
  liste.append(eintrag)

  eingabe.value = ''
  eingabe.focus()
})