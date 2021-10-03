import request from "supertest"
import { app } from "../../app"

it('fails when email is not supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: '',
            password: 'skdljf'
        }).expect(400);
});
it('fails when incoorect password is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'a@a.cl',
            password: 'sk'
        }).expect(400);
});

it('Respond status code 200 when credentials are valid', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'a@a.cl',
            password: 'password'
        }).expect(201)

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'a@a.cl',
            password: 'password'
        }).expect(200)

});
it('Respond with cookie when credentials are valid', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@a.cl',
            password: 'password'
        }).expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@a.cl',
            password: 'password'
        }).expect(200)
    expect(response.get('Set-Cookie')).toBeDefined();
});