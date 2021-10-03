import request from "supertest"
import { app } from "../../app"

it('Expect 201 return code', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'kjlsdf'
        }).expect(201);
});

it('Expect 400 invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'notemail',
            password: 'kjlsdf'
        }).expect(400);
});
it('Expect 400 invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'kj'
        }).expect(400);
});
it('Expect 400 missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({}).expect(400);
});
it('Expect 400 duplicate email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'a@a.cl'
        }).expect(201);
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'a@a.cl'
        }).expect(400);
});

it('Expect set cookies', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'a@a.cl'
        }).expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});