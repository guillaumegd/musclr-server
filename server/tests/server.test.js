const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { User } = require('./../models/user');

const mockUsers = [{
    _id: new ObjectID(),
    email: "guillaume@test.com",
    username: "Guillaume",
    password: "azerty"
},
{
    _id: new ObjectID(),
    email: "test@test.com",
    username: "Prénom",
    password: "123456"
}]

beforeEach((done) => {
    User.remove({}).then(() => {
        return User.insertMany(mockUsers);
    }).then(() => {
        done();
    }).catch(e => {
        console.log(e)
    });
});

describe('POST /users', () => {
    it('should create a new user', (done) => {
        const user = {
            email: "new@user.com",
            username: "Nouvel",
            password: "Utilisateur"
        }

        request(app)
            .post('/users')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude(user);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((users) => {
                    expect(users.length).toBe(3);
                    expect(users[0]).toInclude(user);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create user with invalid body data', (done) => {
        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((users) => {
                    expect(users.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
})

describe('GET /users', () => {
    it('should get all users', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /users/:id', () => {
    it('should return user doc', (done) => {
        request(app)
            .get(`/users/${mockUsers[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.user).toInclude(mockUsers[0]);
            })
            .end(done);
    });

    it('should return 404 if user not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/users/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/users/123abc')
            .expect(404)
            .end(done);
    });
});