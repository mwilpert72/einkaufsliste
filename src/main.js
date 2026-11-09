import './style.css'

const laeden = ['Lidl', 'Rewe', 'Markt']
const listen = { Lidl: [], Rewe: [], Markt: [] }
let aktiv = laeden[0]

const tabs = document.querySelector('#tabs')
const formular = document.querySelector('#formular')
const eingabe = document.querySelector('#eingabe')
const liste = document.querySelector('#liste')
const leer = document.querySelector('#leer')

function zeichneTabs() {
  tabs.replaceChildren()
  for (const laden of laeden) {
    const offen = listen[laden].filter((e) => !e.erledigt).length
    const knopf = document.createElement('button')
    knopf.type = 'button'
    knopf.className = laden === aktiv ? 'tab aktiv' : 'tab'
    knopf.textContent = `${laden} (${offen})`
    knopf.addEventListener('click', () => {
      aktiv = laden
      zeichne()
    })
    tabs.append(knopf)
  }
}

function zeichneListe() {
  liste.replaceChildren()
  const eintraege = listen[aktiv]
  leer.hidden = eintraege.length > 0

  eintraege.forEach((eintrag, index) => {
    const zeile = document.createElement('li')
    zeile.className = eintrag.erledigt ? 'eintrag erledigt' : 'eintrag'

    const haken = document.createElement('input')
    haken.type = 'checkbox'
    haken.checked = eintrag.erledigt
    haken.addEventListener('change', () => {
      eintrag.erledigt = haken.checked
      zeichne()
    })

    const name = document.createElement('span')
    name.textContent = eintrag.text

    const loeschen = document.createElement('button')
    loeschen.type = 'button'
    loeschen.className = 'loeschen'
    loeschen.textContent = '✕'
    loeschen.setAttribute('aria-label', `${eintrag.text} löschen`)
    loeschen.addEventListener('click', () => {
      listen[aktiv].splice(index, 1)
      zeichne()
    })

    zeile.append(haken, name, loeschen)
    liste.append(zeile)
  })
}

function zeichne() {
  eingabe.placeholder = `Was brauchst du bei ${aktiv}?`
  zeichneTabs()
  zeichneListe()
}

formular.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = eingabe.value.trim()
  if (text === '') return

  listen[aktiv].push({ text, erledigt: false })
  eingabe.value = ''
  zeichne()
  eingabe.focus()
})

zeichne()