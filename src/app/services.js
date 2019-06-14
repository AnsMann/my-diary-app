import moment from 'moment'
import 'moment/locale/de'

import dotenv from 'dotenv'
dotenv.config()
moment.locale('de')

export function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}

export function fetchEntries(data, method, id = '') {
  return fetch('/diaryentries/' + id, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function deleteEntryInMongoDB(id) {
  return fetch('/diaryentries/' + id, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function getEntriesFromMongoDB(id = '') {
  return fetch('/diaryentries/' + id, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
}

export function getChannels() {
  return fetch(
    `https://slack.com/api/channels.list?token=${
      process.env.REACT_APP_API_KEY
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
    .then(res => res.json())
    .then(data => data.channels)
    .catch(err => console.log(err))
}

export function sendMessage(content, id, sendAsAnonymous) {
  const messageObject = buildMessageObject(content)
  return fetch(
    `https://slack.com/api/chat.postMessage?token=${
      process.env.REACT_APP_API_KEY
    }&blocks=${JSON.stringify(
      messageObject
    )}&channel=${id}&as_user=${!sendAsAnonymous}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.log(err))
}

function buildMessageObject(content) {
  const messageObject = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*New diary entry from ${moment(content.date).format('L')}*`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Die wichtigsten Inhalte heute waren:\n *_${content.title}_*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Besonders positiv erinnere ich:\n *_${content.positive}_*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Besonders negativ erinnere ich:\n *_${content.negative}_*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Meinem Coach würde ich sagen:\n *_${content.coachFeedback}_*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Außerdem war mir heute noch wichtig:\n *_${
          content.additional
        }_*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `This day was: ${evaluateRatingForSlack(content.rating)}`,
      },
    },
  ]
  return messageObject
}

function evaluateRatingForSlack(rating) {
  const ratingMap = {
    1: ':pensive:',
    2: ':no_mouth:',
    3: ':smiley:',
  }
  return ratingMap[rating]
}
