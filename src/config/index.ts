const config = {
  baseURL: import.meta.env.VITE_API_URL || '',
  env: import.meta.env.MODE || 'development'
}

export default config
