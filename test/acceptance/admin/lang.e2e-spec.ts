import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('lang', () => 
{
    let app: INestApplication;
    let repository: MockLangRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);

        await app.init();
    });

    test(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'd',
                image: '4',
                iso6392: 'gr',
                iso6393: 'u0o',
                ietf: '2yp85',
                sort: 114022,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                name: 'g',
                image: 'u',
                iso6392: '9h',
                iso6393: '3rr',
                ietf: 'nn0ag',
                sort: 231771,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: null,
                image: '1',
                iso6392: '2n',
                iso6393: 'er8',
                ietf: '5lsvp',
                sort: 482508,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                
                image: 'n',
                iso6392: 'sj',
                iso6393: '1zj',
                ietf: 'y0l07',
                sort: 549995,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'q',
                image: 's',
                iso6392: null,
                iso6393: 'fqx',
                ietf: 'n83hd',
                sort: 125192,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'e',
                image: 'i',
                
                iso6393: 'k5f',
                ietf: '9bgyk',
                sort: 269048,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'o',
                image: 'd',
                iso6392: '8k',
                iso6393: null,
                ietf: '0b8mp',
                sort: 401761,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: '8',
                image: 'c',
                iso6392: 'ml',
                
                ietf: 'tf1ba',
                sort: 960502,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'j',
                image: 'i',
                iso6392: 'ij',
                iso6393: '3zc',
                ietf: null,
                sort: 832941,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'w',
                image: 'a',
                iso6392: 'zq',
                iso6393: '5qq',
                
                sort: 270893,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'h',
                image: 'v',
                iso6392: '8g',
                iso6393: '1o3',
                ietf: 'ezmso',
                sort: 448814,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'v',
                image: 'e',
                iso6392: 'ep',
                iso6393: 'xvi',
                ietf: '72qam',
                sort: 277862,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'enso2rrnrjghflh1q1tj3rc9s48cv0axq7vg4',
                name: 'x',
                image: '2',
                iso6392: 'ap',
                iso6393: 'qa9',
                ietf: 'cor0r',
                sort: 505097,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'f',
                image: 'k',
                iso6392: '1pq',
                iso6393: 'acp',
                ietf: 'pzge4',
                sort: 619597,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: '6',
                image: '4',
                iso6392: 'nn',
                iso6393: 'qyi7',
                ietf: 'f2iud',
                sort: 333840,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'd',
                image: 'n',
                iso6392: '5s',
                iso6393: 'lj1',
                ietf: '3zul3w',
                sort: 951048,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'k',
                image: 's',
                iso6392: 'uq',
                iso6393: '5ig',
                ietf: '5a4tq',
                sort: 2648291,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'l',
                image: 'k',
                iso6392: 'o1',
                iso6393: 'yr0',
                ietf: 'v9mlv',
                sort: 593787,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'j',
                image: 'm',
                iso6392: 'i5',
                iso6393: 'mh2',
                ietf: 'n7mau',
                sort: 746122,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/langs/paginate`, () => 
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

    test(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/3e5b1cd6-6860-48b3-b4b4-a442d46a981d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'));
    });

    test(`/REST:GET admin/langs`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: '322a9fb9-ed4f-4068-8ede-597e41de4ebc',
                name: 'c',
                image: 'j',
                iso6392: 'q8',
                iso6393: 'edn',
                ietf: 'zz7z3',
                sort: 369743,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                name: 'j',
                image: 'u',
                iso6392: 'mo',
                iso6393: 'q3k',
                ietf: '98h50',
                sort: 223581,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/3e5b1cd6-6860-48b3-b4b4-a442d46a981d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateLang - Got 409 Conflict, item already exist in database`, () => 
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
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminCreateLang`, () => 
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
                        id: '794f6637-de58-456b-aa71-76f13e321ff9',
                        name: 't',
                        image: 'o',
                        iso6392: '7l',
                        iso6393: 'jd5',
                        ietf: 'wm5xn',
                        sort: 880658,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '794f6637-de58-456b-aa71-76f13e321ff9');
            });
    });

    test(`/GraphQL adminPaginateLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateLangs (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateLangs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindLang - Got 404 Not Found`, () => 
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
                    query: [
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

    test(`/GraphQL adminFindLang`, () => 
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('3e5b1cd6-6860-48b3-b4b4-a442d46a981d');
            });
    });

    test(`/GraphQL adminFindLangById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
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

    test(`/GraphQL adminFindLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
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
                    id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('3e5b1cd6-6860-48b3-b4b4-a442d46a981d');
            });
    });

    test(`/GraphQL adminGetLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetLangs (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetLangs.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
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
                        
                        id: '2953c5ad-79c7-4356-ac4b-dc707a12f49e',
                        name: 'f',
                        image: 'p',
                        iso6392: 'nm',
                        iso6393: '1kp',
                        ietf: 'uvofr',
                        sort: 624150,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminUpdateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
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
                        
                        id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d',
                        name: 'k',
                        image: 'm',
                        iso6392: 'd4',
                        iso6393: 'wle',
                        ietf: 'ncb3a',
                        sort: 675576,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('3e5b1cd6-6860-48b3-b4b4-a442d46a981d');
            });
    });

    test(`/GraphQL adminDeleteLangById - Got 404 Not Found`, () => 
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

    test(`/GraphQL adminDeleteLangById`, () => 
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
                    id: '3e5b1cd6-6860-48b3-b4b4-a442d46a981d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('3e5b1cd6-6860-48b3-b4b4-a442d46a981d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});