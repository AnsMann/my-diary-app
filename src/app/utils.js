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
    const nameA = itemA.name.toUpperCase()
    const nameB = itemB.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    } else return 0
  })
  return contactsInAlphabeticalOrder
}
