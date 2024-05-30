const { faker } = require('@faker-js/faker')

const generateDummyUserData = (length = 1) => {
    const users = []
    for (let i = 0; i < length; i++) {
        const name = faker.internet.displayName()
        const email = faker.internet.email(name)
        const city = faker.location.city()
        const country = faker.location.country()
        const dob = faker.date.birthdate()
        const synced = 0

        users.push({name, email, city, country, dob, synced})
    }
    return users
}

module.exports = {
    generateDummyUserData
}