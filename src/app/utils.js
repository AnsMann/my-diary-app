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

export function filterContacts(contacts, searchInput) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().startsWith(searchInput)
  )
  const contactsInAlphabeticalOrder = filteredContacts.sort(
    (contactA, contactB) => {
      const nameA = contactA.name.toUpperCase()
      const nameB = contactB.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else return 0
    }
  )
  return contactsInAlphabeticalOrder
}
