const request = require('supertest');
const server = require('../api/server');


const Hobbits = require('./hobbitsModel.js')
const db = require('../data/dbConfig.js')

describe('hobbits model testing', () => {
    beforeAll(async () => {
        await db('hobbits').truncate();
    })

    describe('testing methods on hobbits', () => {

        describe('testing insert on Hobbits', () => {
            it('should insert hobbit into the DB', async () => {
                await Hobbits.insert({ name: "Kevin" })
    
                const hobbits = await db('hobbits')
    
                expect(hobbits).toHaveLength(1)
            })
        })
    
        describe('GET test to endpoint /hobbits', () => {
            it('Should return a status of 200', () => {
                return request(server).get('/hobbits').then(res => {
                    expect(res.status).toBe(200)
                })
            })
            it('should return all hobbits', () => {
                return request(server)
                .get("/hobbits")
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
            })
        })
    
        describe('Post test to endpoint /hobbits', () => {
            it('Should add a new hobbit and status of 201', () => {
                return request(server).post('/hobbits').send({name: "kevin"}).then(res =>{
                    expect(res.status).toBe(201)
                })
            })
            it('should return hobbit added', () => {
                return request(server)
                .post("/hobbits")
                .send({name: "jake"})
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
            })
        })
    
        describe('DEL test to endpoint /hobbits/:id', () => {
            it('Should add a new hobbit and status of 201', () => {
                return request(server).post('/hobbits').send({name: "kevin"}).then(res =>{
                    expect(res.status).toBe(201)
                })
            })
            it('should Delete the selected ID/hobbit', () => {
                return request(server).del('/hobbits/2')
                    .then(res => {
                        expect(res.body.count).toEqual(1)
                    })
            })
        })
    }) 
})