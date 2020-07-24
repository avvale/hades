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
                name: 'f',
                image: '0',
                iso6392: 'hj',
                iso6393: 'sgk',
                ietf: 'z7lnw',
                sort: 239514,
                isActive: false,
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
                
                name: 'n',
                image: 't',
                iso6392: 'eg',
                iso6393: 'pz5',
                ietf: 'v0aje',
                sort: 803655,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: null,
                image: 'v',
                iso6392: 'sf',
                iso6393: '1jb',
                ietf: 'pc8qr',
                sort: 547165,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                
                image: 'j',
                iso6392: 'pq',
                iso6393: 'xz8',
                ietf: 'n321x',
                sort: 933819,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'n',
                image: 'm',
                iso6392: null,
                iso6393: 'nn2',
                ietf: 'vo7u9',
                sort: 429876,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '6',
                image: '5',
                
                iso6393: 't2s',
                ietf: 'skw5z',
                sort: 214628,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'v',
                image: 'x',
                iso6392: 'ks',
                iso6393: null,
                ietf: 'ax1lg',
                sort: 462642,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '1',
                image: 'f',
                iso6392: '1r',
                
                ietf: 'lvww2',
                sort: 738397,
                isActive: true,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'i',
                image: 'h',
                iso6392: 'hb',
                iso6393: 'tax',
                ietf: null,
                sort: 588076,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '7',
                image: 'r',
                iso6392: 'qu',
                iso6393: 'rjg',
                
                sort: 804944,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '9',
                image: '6',
                iso6392: 'a9',
                iso6393: 'k2m',
                ietf: 'kph1m',
                sort: 916330,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'i',
                image: 'p',
                iso6392: '3l',
                iso6393: 'upy',
                ietf: '6o8e2',
                sort: 746115,
                
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
                id: 'g6bgj6r3txt3qh1xzhapobh9gz7boea07bq9p',
                name: 't',
                image: '2',
                iso6392: 'w1',
                iso6393: 'u01',
                ietf: 'bfobo',
                sort: 153728,
                isActive: true,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '5',
                image: 'm',
                iso6392: 'b4e',
                iso6393: 'o3p',
                ietf: 'ej881',
                sort: 811716,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'h',
                image: '9',
                iso6392: '8w',
                iso6393: 'k5pg',
                ietf: 'yw0ic',
                sort: 289670,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'e',
                image: '9',
                iso6392: 'ug',
                iso6393: 't0p',
                ietf: '6cdlx9',
                sort: 880090,
                isActive: false,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'f',
                image: 'q',
                iso6392: 'p1',
                iso6393: '1bw',
                ietf: 'knsta',
                sort: 3875295,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: '5',
                image: 'd',
                iso6392: 'r3',
                iso6393: 'vjx',
                ietf: 'tem97',
                sort: 680768,
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
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'u',
                image: 'x',
                iso6392: 'mf',
                iso6393: 'tu6',
                ietf: 'tetn2',
                sort: 898764,
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
                        value   : '7935d89d-bc14-46e8-9e30-8ba56a34ba52'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7935d89d-bc14-46e8-9e30-8ba56a34ba52'));
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
            .get('/admin/lang/7935d89d-bc14-46e8-9e30-8ba56a34ba52')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7935d89d-bc14-46e8-9e30-8ba56a34ba52'));
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
                
                id: 'eb2dde42-3fb4-4a47-9d61-463c42c7957c',
                name: 'o',
                image: 'j',
                iso6392: '95',
                iso6393: 'ort',
                ietf: 'qnnl4',
                sort: 611564,
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
                
                id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                name: 'b',
                image: 'i',
                iso6392: 'rj',
                iso6393: 'sl4',
                ietf: '3hf69',
                sort: 997610,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7935d89d-bc14-46e8-9e30-8ba56a34ba52'));
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
            .delete('/admin/lang/7935d89d-bc14-46e8-9e30-8ba56a34ba52')
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
                        id: '486f47ba-a1d4-42a0-b2b6-b416ea53783d',
                        name: 'y',
                        image: 's',
                        iso6392: 'g4',
                        iso6393: '1ea',
                        ietf: 'nogva',
                        sort: 866249,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '486f47ba-a1d4-42a0-b2b6-b416ea53783d');
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
                            value   : '7935d89d-bc14-46e8-9e30-8ba56a34ba52'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('7935d89d-bc14-46e8-9e30-8ba56a34ba52');
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
                    id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('7935d89d-bc14-46e8-9e30-8ba56a34ba52');
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
                        
                        id: '713c7a2e-5737-458f-b615-cfca97651264',
                        name: 's',
                        image: 'z',
                        iso6392: 'm2',
                        iso6393: 'qgi',
                        ietf: '6cfax',
                        sort: 564886,
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
                        
                        id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52',
                        name: '3',
                        image: 's',
                        iso6392: 'je',
                        iso6393: 'nht',
                        ietf: 'uscqw',
                        sort: 181938,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('7935d89d-bc14-46e8-9e30-8ba56a34ba52');
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
                    id: '7935d89d-bc14-46e8-9e30-8ba56a34ba52'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('7935d89d-bc14-46e8-9e30-8ba56a34ba52');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});