import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
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
                            validateOnly: true,
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
                name: '2',
                image: '8',
                iso6392: 'vj',
                iso6393: 'dfd',
                ietf: 'wytbp',
                dir: 'LTR',
                sort: 255794,
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
                
                name: 'r',
                image: 'q',
                iso6392: 'f1',
                iso6393: 'pyl',
                ietf: 'zpfxt',
                dir: 'LTR',
                sort: 893309,
                isActive: false,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: null,
                image: '2',
                iso6392: 'ka',
                iso6393: 'c78',
                ietf: 'co6tj',
                dir: 'LTR',
                sort: 253235,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                
                image: 'p',
                iso6392: '7w',
                iso6393: 'y9u',
                ietf: 'f250i',
                dir: 'RTL',
                sort: 618084,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'm',
                image: 'u',
                iso6392: null,
                iso6393: 'mpj',
                ietf: '3nv00',
                dir: 'LTR',
                sort: 194797,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'o',
                image: 'w',
                
                iso6393: '86l',
                ietf: 's6feu',
                dir: 'RTL',
                sort: 799833,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '2',
                image: 'l',
                iso6392: '4d',
                iso6393: null,
                ietf: '21q5r',
                dir: 'LTR',
                sort: 545858,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '3',
                image: '8',
                iso6392: 'ba',
                
                ietf: 'fkvky',
                dir: 'RTL',
                sort: 352688,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'l',
                image: 'o',
                iso6392: '2f',
                iso6393: 'e8b',
                ietf: null,
                dir: 'LTR',
                sort: 195523,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'd',
                image: 'y',
                iso6392: '83',
                iso6393: 'ry0',
                
                dir: 'RTL',
                sort: 247845,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangDir property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '9',
                image: '6',
                iso6392: 'oo',
                iso6393: 'q4y',
                ietf: '0r573',
                dir: null,
                sort: 705082,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangDir property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '2',
                image: '3',
                iso6392: 'aq',
                iso6393: '9cd',
                ietf: 'u9f3b',
                
                sort: 754603,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '9',
                image: 'z',
                iso6392: 'po',
                iso6393: 'jrv',
                ietf: 'bhbly',
                dir: 'RTL',
                sort: 149239,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: '3',
                image: '9',
                iso6392: '1l',
                iso6393: 'kt3',
                ietf: 'mrlv6',
                dir: 'LTR',
                sort: 106818,
                
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
                id: 'k0bpgssud4hym9ug9cusj9vwl378oi04ong9i',
                name: 'g',
                image: 'v',
                iso6392: 'ua',
                iso6393: '1q0',
                ietf: 'evb3d',
                dir: 'LTR',
                sort: 508445,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'k',
                image: 'q',
                iso6392: 'pbj',
                iso6393: 'orj',
                ietf: 'yz4v1',
                dir: 'LTR',
                sort: 740505,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'h',
                image: 'a',
                iso6392: 'my',
                iso6393: '7g77',
                ietf: 'xw85k',
                dir: 'LTR',
                sort: 838181,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 's',
                image: '3',
                iso6392: '2l',
                iso6393: 'tu5',
                ietf: 'di04qa',
                dir: 'RTL',
                sort: 754448,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'w',
                image: 'l',
                iso6392: 'kr',
                iso6393: 'nzj',
                ietf: 'a2l4j',
                dir: 'LTR',
                sort: 4933717,
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
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'j',
                image: '6',
                iso6392: 'r8',
                iso6393: 'cbf',
                ietf: 'co9ep',
                dir: 'LTR',
                sort: 246025,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangDir has to be a enum option of LTR, RTL`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'f',
                image: 'i',
                iso6392: 'gu',
                iso6393: '60r',
                ietf: 'xk6tl',
                dir: 'XXXX',
                sort: 158212,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir has to be any of this options: LTR, RTL');
            });
    });
    

    

    test(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 's',
                image: 'r',
                iso6392: 'zm',
                iso6393: 'y43',
                ietf: 'wm8zd',
                dir: 'LTR',
                sort: 478223,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/langs/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ebe8cb26-6957-440f-aa3f-1db7a4683e26'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/319195df-a1c8-40f8-83a1-470dc1713e3c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/f9646e2b-4f9f-4cdc-b052-868cfcd43053')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'));
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
                
                id: 'a5875998-1a0f-4727-b977-bf83ee500672',
                name: 'g',
                image: 'w',
                iso6392: '9w',
                iso6393: 'hpm',
                ietf: 'w26uy',
                dir: 'LTR',
                sort: 413841,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                name: 'p',
                image: '7',
                iso6392: 'k0',
                iso6393: 'pfa',
                ietf: 'r81n0',
                dir: 'LTR',
                sort: 271866,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/b40211b4-3423-4dad-b2b2-2e14c9b0cf1c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/f9646e2b-4f9f-4cdc-b052-868cfcd43053')
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '35498a5e-24dd-43c5-b456-d8d2af952896',
                        name: '6',
                        image: '1',
                        iso6392: '11',
                        iso6393: 'kqj',
                        ietf: '8jzkg',
                        dir: 'RTL',
                        sort: 957992,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '35498a5e-24dd-43c5-b456-d8d2af952896');
            });
    });

    test(`/GraphQL adminPaginateLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateLangs (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateLangs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '28c52285-175a-42ed-8f7e-5b4dea9c286d'
                        }
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

    test(`/GraphQL adminFindLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('f9646e2b-4f9f-4cdc-b052-868cfcd43053');
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '819d43fc-4ba4-4aa4-8232-cc8d25e0f495'
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('f9646e2b-4f9f-4cdc-b052-868cfcd43053');
            });
    });

    test(`/GraphQL adminGetLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetLangs (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '72794950-9681-4a6a-ac8a-b8623ac229de',
                        name: 'c',
                        image: 'y',
                        iso6392: 'i4',
                        iso6393: 'n4t',
                        ietf: '27y04',
                        dir: 'LTR',
                        sort: 545814,
                        isActive: true,
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053',
                        name: '5',
                        image: 'n',
                        iso6392: 't5',
                        iso6393: 'b6q',
                        ietf: 'yrtcw',
                        dir: 'RTL',
                        sort: 958974,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('f9646e2b-4f9f-4cdc-b052-868cfcd43053');
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cafc172a-3c57-4c19-9e6c-00d4ac8fcb3d'
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
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f9646e2b-4f9f-4cdc-b052-868cfcd43053'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('f9646e2b-4f9f-4cdc-b052-868cfcd43053');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});