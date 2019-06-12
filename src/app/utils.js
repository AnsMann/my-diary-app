import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

export function findIndex(id, diaryEntries) {
  const index = diaryEntries.map(entry => entry.id).indexOf(id)
  return index
}

export function handleSlackContactData(contactdata) {
  return contactdata
    .filter(contact => contact.real_name !== 'Slackbot')
    .map(contact => {
      return {
        id: contact.id,
        username: contact.name,
        name: contact.profile.real_name,
      }
    })
}

export function handleSlackChannelData(channeldata) {
  return channeldata.map(channel => {
    return {
      id: channel.id,
      name: channel.name,
    }
  })
}

export function filterData(contacts, channels, searchInput) {
  const filteredData = searchInput.startsWith('#')
    ? channels.filter(channel =>
        channel.name.toLowerCase().startsWith(searchInput.slice(1))
      )
    : contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(searchInput)
      )
  const contactsInAlphabeticalOrder = filteredData.sort((itemA, itemB) => {
    const nameA = itemA.name.toLowerCase()
    const nameB = itemB.name.toLowerCase()
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    } else return 0
  })
  return contactsInAlphabeticalOrder
}

export function sortEntries(Entries, sortBy) {
  switch (sortBy) {
    case 'Entry date up':
      return Entries.slice().sort((a, b) => moment(a.date) - moment(b.date))
    case 'Entry date down':
      return Entries.slice().sort((a, b) => moment(b.date) - moment(a.date))
    case 'Create date up':
      return Entries.slice().sort(
        (a, b) => moment(a.createDate) - moment(b.createDate)
      )
    case 'Create date down':
      return Entries.slice().sort(
        (a, b) => moment(b.createDate) - moment(a.createDate)
      )
    default:
      return Entries
  }
}

export function filterEntries(allEntries, filter) {
  switch (filter) {
    case 'shared':
      return allEntries.filter(entry => entry.shared.status)
    case '😃':
      return allEntries.filter(entry => entry.rating === '3')
    case '😶':
      return allEntries.filter(entry => entry.rating === '2')
    case '😔':
      return allEntries.filter(entry => entry.rating === '1')
    case 'not shared':
      return allEntries.filter(entry => !entry.shared.status)
    default:
      const Entries = sortEntries(allEntries, filter.sortby)
      return Entries
  }
}
