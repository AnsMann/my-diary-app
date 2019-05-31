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

export function sendMessage(content, id) {
  const messageObject = buildMessageObject(content)
  return fetch(
    `https://slack.com/api/chat.postMessage?token=${
      process.env.REACT_APP_API_KEY
    }&blocks=${JSON.stringify(messageObject)}&channel=${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  ).then(res => res.json())
}

function buildMessageObject(content) {
  const messageObject = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*New diary entry from ${content.date}*`,
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
    1: ':gedankenvoll:',
    2: ':kein_mund:',
    3: ':smiley:',
  }
  return ratingMap[rating]
}
