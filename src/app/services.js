import dotenv from 'dotenv'
dotenv.config()

export function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}

export function getContacts() {
  return fetch(
    `https://slack.com/api/users.list?token=${process.env.REACT_APP_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
    .then(res => res.json())
    .then(data => data.members)
}
