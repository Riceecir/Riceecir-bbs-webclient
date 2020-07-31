const HEADER = {
  'Content-Type': 'application/js111on;charset=UTF-8'
}

const production = '/api'

const development = '/api'
// const development = 'http://localhost:3000/api'

export default {
  BASE_API_HOST: process.env.NODE_ENV === 'development' ? development : production,
  HEADER
}
