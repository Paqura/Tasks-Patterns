import axios, { CreateAxiosDefaults } from 'axios'

export const createHttpClient = (options: CreateAxiosDefaults) =>
    axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    })
