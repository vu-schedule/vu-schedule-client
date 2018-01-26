import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:49756/api/'

const appService = {
  getSubjects (id) {
     return new Promise((resolve) => {
      axios.get('subjects/' + id)
      .then(response => {
        resolve(response.data)
      })
    })
  },
  getCalendar (data, id) {
    return new Promise((resolve) => {
     axios.post('calendars/' + id, data)
     .then(response => {
       resolve(response.data)
     })
   })
  },
   getCourses () {
    return new Promise((resolve) => {
     axios.get('programs')
     .then(response => {
       resolve(response.data)
     })
   })
 }
}

export default appService
