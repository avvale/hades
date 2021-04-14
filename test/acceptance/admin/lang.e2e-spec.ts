import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                name: '1',
                image: 'q',
                iso6392: 'h6',
                iso6393: '29m',
                ietf: 'td775',
                dir: 'LTR',
                sort: 994935,
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
                
                name: 'y',
                image: 'c',
                iso6392: 'yg',
                iso6393: '03s',
                ietf: 'e3y3b',
                dir: 'LTR',
                sort: 716544,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: null,
                image: 'n',
                iso6392: 'sl',
                iso6393: '11w',
                ietf: 'q04tg',
                dir: 'RTL',
                sort: 479219,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                
                image: '0',
                iso6392: 't4',
                iso6393: 'v10',
                ietf: '7zrkn',
                dir: 'RTL',
                sort: 910634,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '0',
                image: 'e',
                iso6392: null,
                iso6393: 'jmb',
                ietf: 's886p',
                dir: 'LTR',
                sort: 447055,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'p',
                image: '3',
                
                iso6393: '3n2',
                ietf: 'tgg9k',
                dir: 'LTR',
                sort: 577111,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '4',
                image: 'p',
                iso6392: 'uw',
                iso6393: null,
                ietf: '8mxpd',
                dir: 'RTL',
                sort: 216172,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'r',
                image: 't',
                iso6392: 'v2',
                
                ietf: 'vzl00',
                dir: 'RTL',
                sort: 169102,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'b',
                image: '1',
                iso6392: '9c',
                iso6393: '7ly',
                ietf: null,
                dir: 'LTR',
                sort: 645525,
                isActive: false,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'a',
                image: 'w',
                iso6392: 'sk',
                iso6393: '7x8',
                
                dir: 'RTL',
                sort: 131647,
                isActive: false,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'r',
                image: 'd',
                iso6392: '14',
                iso6393: '5hl',
                ietf: 'svkzb',
                dir: null,
                sort: 816772,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'g',
                image: '3',
                iso6392: 'on',
                iso6393: 'qlg',
                ietf: 'm14b5',
                
                sort: 765879,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'x',
                image: '1',
                iso6392: '5j',
                iso6393: 'tji',
                ietf: 'jlb3m',
                dir: 'RTL',
                sort: 304958,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '0',
                image: '3',
                iso6392: 'nx',
                iso6393: 'jsd',
                ietf: 'ouj4j',
                dir: 'RTL',
                sort: 426420,
                
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
                id: 'yweql0xsnqpf06rnn1g2aqf40s6aagevb3cni',
                name: 'h',
                image: '1',
                iso6392: '4d',
                iso6393: 'q4r',
                ietf: 'd4f9j',
                dir: 'RTL',
                sort: 179678,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 't',
                image: 'p',
                iso6392: 'qx8',
                iso6393: 'g80',
                ietf: 'yr6vy',
                dir: 'RTL',
                sort: 560553,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'x',
                image: 'u',
                iso6392: 'd9',
                iso6393: '5gxt',
                ietf: 'fnwzv',
                dir: 'LTR',
                sort: 645229,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'd',
                image: '5',
                iso6392: 'aw',
                iso6393: '4gg',
                ietf: '4c676y',
                dir: 'LTR',
                sort: 417004,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 'e',
                image: 'u',
                iso6392: 'as',
                iso6393: 'ade',
                ietf: 'l9sgi',
                dir: 'LTR',
                sort: 9796372,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '2',
                image: 'f',
                iso6392: '51',
                iso6393: 'vna',
                ietf: 'kx672',
                dir: 'RTL',
                sort: 967792,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '3',
                image: 't',
                iso6392: '5d',
                iso6393: 'whw',
                ietf: 'vmbz3',
                dir: 'XXXX',
                sort: 403648,
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
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: 't',
                image: 'u',
                iso6392: 'si',
                iso6393: 'm0u',
                ietf: 'je6j4',
                dir: 'RTL',
                sort: 885641,
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
                        id: '59e8d3d2-bfd0-4a78-93eb-6a199fd114a6'
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
                        id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/6c71b442-ad44-4595-9f27-89fc168dd53d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/c7844ac2-d52c-4225-b706-bb39d6eb6d2b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'));
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
                
                id: '97ae0a7a-8398-4bbb-a1aa-4e8ef4f79c49',
                name: 'h',
                image: 'g',
                iso6392: '7q',
                iso6393: 'ra0',
                ietf: 'e0h2k',
                dir: 'LTR',
                sort: 709531,
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
                
                id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                name: '7',
                image: '7',
                iso6392: 'dn',
                iso6393: 'joy',
                ietf: 'jaja5',
                dir: 'LTR',
                sort: 114362,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/2d132451-10a1-4871-a04c-dbe5d3407248')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/c7844ac2-d52c-4225-b706-bb39d6eb6d2b')
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
                        id: 'f7d1b36d-494c-4fec-9c38-8ecc601f049f',
                        name: 'w',
                        image: 'r',
                        iso6392: '7r',
                        iso6393: '6dz',
                        ietf: 'qsy7p',
                        dir: 'LTR',
                        sort: 904496,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', 'f7d1b36d-494c-4fec-9c38-8ecc601f049f');
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
                            id: 'c0059cce-6d9c-4cc3-b09b-9d09f7c2ad31'
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
                            id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('c7844ac2-d52c-4225-b706-bb39d6eb6d2b');
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
                    id: '70b8e6cf-ef27-4b64-add0-3d1f88f4ebda'
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
                    id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('c7844ac2-d52c-4225-b706-bb39d6eb6d2b');
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
                        
                        id: '261a817f-0409-4b53-af1b-ab9b43ba5c61',
                        name: '0',
                        image: 'z',
                        iso6392: '7c',
                        iso6393: '5j7',
                        ietf: '4zdvg',
                        dir: 'LTR',
                        sort: 721301,
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
                        
                        id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b',
                        name: 'b',
                        image: '8',
                        iso6392: 't3',
                        iso6393: 'ay0',
                        ietf: '7b6m3',
                        dir: 'LTR',
                        sort: 656353,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('c7844ac2-d52c-4225-b706-bb39d6eb6d2b');
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
                    id: 'bc1504eb-e3e2-4bfd-807f-2343941a433c'
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
                    id: 'c7844ac2-d52c-4225-b706-bb39d6eb6d2b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('c7844ac2-d52c-4225-b706-bb39d6eb6d2b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});