const request = require('supertest');

const server = require('./server.js');

describe('Server Test', () => {
    it('db enviornemt test || set to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET Request test to /', () => {
        it('response test || should return 200 ok', () => {
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})