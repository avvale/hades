import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';

describe('lang', () => 
{
    let app: INestApplication;
    let repository: MockLangRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);

        await app.init();
    });

    it(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                name: '7be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f57be2504d-1a4a-47ff-924a-2c81404f77f5',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName is too large, has a maximum length of 255');
            });
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                name: null,
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                name: 'XXXXX',
                image: 'XX',
                iso6392: 'xxx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                name: 'XXXXX',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/langs/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.WHERE,
                        column: 'id',
                        operator: Operator.EQUALS,
                        value: '1c8f7dcc-e150-49c9-9fcb-1db310ca6d90'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.WHERE,
                        column: 'id',
                        operator: Operator.EQUALS,
                        value: '94c893c1-3eb7-4f22-a878-b405c6d42e09'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '94c893c1-3eb7-4f22-a878-b405c6d42e09'));
    });

    it(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/ffdd5ef0-d622-402d-9e54-11628d81c1c7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/4470b5ab-9d57-4c9d-a68f-5bf8e32f543a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a'));
    });

    it(`/REST:GET admin/langs`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '83595fbd-723b-4219-82fe-d0d2d3d61a74',
                name: 'XXXXX',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '94c893c1-3eb7-4f22-a878-b405c6d42e09',
                name: 'XXXXX',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '94c893c1-3eb7-4f22-a878-b405c6d42e09'));
    });

    it(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/77738260-5734-4b31-8ccb-367c2d98aa28')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/94c893c1-3eb7-4f22-a878-b405c6d42e09')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3cdb80ca-9138-4e17-b876-41f04a97fa68',
                        name: 'test01',
                        image: '',
                        iso6392: 'xx',
                        iso6393: 'xxx',
                        ietf: 'xx-XX',
                        sort: '',
                        isActive: true
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '3cdb80ca-9138-4e17-b876-41f04a97fa68');
            });
    });

    it(`/GraphQL adminCreateLang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                        name: 'XXXXX',
                        image: 'XX',
                        iso6392: 'xx',
                        iso6393: 'xxx',
                        ietf: 'xx-XX',
                        sort: 1,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
            });
    });

    it(`/GraphQL adminFindLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: 
                    [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL adminDeleteLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});