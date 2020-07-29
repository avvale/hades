import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('summary', () => 
{
    let app: INestApplication;
    let repository: MockSummaryRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    NfcModule,
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
            .overrideProvider(ISummaryRepository)
            .useClass(MockSummaryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSummaryRepository>module.get<ISummaryRepository>(ISummaryRepository);

        await app.init();
    });

    test(`/REST:POST nfc/summary - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 11:59:42',
                counter: 7261743801,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 03:35:46',
                counter: 5643186802,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: null,
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 08:11:05',
                counter: 6646205102,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 06:35:35',
                counter: 2995750307,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: null,
                accessAt: '2020-07-29 05:54:02',
                counter: 8819425996,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                
                accessAt: '2020-07-28 21:14:40',
                counter: 1830365714,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: null,
                counter: 5438522393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                
                counter: 8599777133,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 01:47:25',
                counter: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 02:25:07',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: 'uhr6jap5wjbgp62znf2d4cfie6j2dyi8e5faf',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-28 19:20:27',
                counter: 1314343826,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: 'gxmkml6vs7uym2tmz64brk6l0ygzhnku5wy3k',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-29 08:45:59',
                counter: 7768632838,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'etfhr98884rfd15cxfkxq3lhwdg0s9hffh4qm',
                accessAt: '2020-07-28 17:54:35',
                counter: 3475610851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-28 20:33:04',
                counter: 35058867703,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-28 13:41:24',
                counter: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for SummaryCounter must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    
    test(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: 'XXXXXXXX',
                counter: 2228362829,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-28 16:49:08',
                counter: 5455196494,
            })
            .expect(201);
    });

    test(`/REST:GET nfc/summaries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summaries/paginate')
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

    test(`/REST:GET nfc/summary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary')
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

    test(`/REST:GET nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4a588db1-5149-466c-85aa-e52a60d6e35b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4a588db1-5149-466c-85aa-e52a60d6e35b'));
    });

    test(`/REST:GET nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/4a588db1-5149-466c-85aa-e52a60d6e35b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a588db1-5149-466c-85aa-e52a60d6e35b'));
    });

    test(`/REST:GET nfc/summaries`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summaries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT nfc/summary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ea4b2b18-943c-495c-8c99-14a1402108ba',
                tagId: 'cd484004-7a6c-4f72-b541-dee205bff0f0',
                tenantId: '52e2385e-e14f-418c-9c58-f0d2f16eeacc',
                accessAt: '2020-07-28 20:07:36',
                counter: 6063670299,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                accessAt: '2020-07-28 21:28:12',
                counter: 9134483378,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a588db1-5149-466c-85aa-e52a60d6e35b'));
    });

    test(`/REST:DELETE nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/4a588db1-5149-466c-85aa-e52a60d6e35b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL nfcCreateSummary - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateSummaryInput!)
                    {
                        nfcCreateSummary (payload:$payload)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
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

    test(`/GraphQL nfcCreateSummary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateSummaryInput!)
                    {
                        nfcCreateSummary (payload:$payload)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd0f4b531-619f-48e9-9960-7dffe1717f08',
                        tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                        tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                        accessAt: '2020-07-28 21:35:06',
                        counter: 2690725387,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSummary).toHaveProperty('id', 'd0f4b531-619f-48e9-9960-7dffe1717f08');
            });
    });

    test(`/GraphQL nfcPaginateSummaries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateSummaries (query:$query constraint:$constraint)
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
                expect(res.body.data.nfcPaginateSummaries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateSummaries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateSummaries.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL nfcFindSummary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindSummary (query:$query)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
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

    test(`/GraphQL nfcFindSummary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindSummary (query:$query)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
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
                            value   : '4a588db1-5149-466c-85aa-e52a60d6e35b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummary.id).toStrictEqual('4a588db1-5149-466c-85aa-e52a60d6e35b');
            });
    });

    test(`/GraphQL nfcFindSummaryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindSummaryById (id:$id)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
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

    test(`/GraphQL nfcFindSummaryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindSummaryById (id:$id)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4a588db1-5149-466c-85aa-e52a60d6e35b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummaryById.id).toStrictEqual('4a588db1-5149-466c-85aa-e52a60d6e35b');
            });
    });

    test(`/GraphQL nfcGetSummaries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetSummaries (query:$query)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetSummaries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL nfcUpdateSummary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateSummaryInput!)
                    {
                        nfcUpdateSummary (payload:$payload)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3441c352-38ad-4a0c-9129-c4bc8c1142db',
                        tagId: '702263ee-adb9-4139-91fd-334f073e772a',
                        tenantId: '629de35c-6ca2-4c99-bf16-a616e570b206',
                        accessAt: '2020-07-29 11:01:01',
                        counter: 9313836464,
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

    test(`/GraphQL nfcUpdateSummary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateSummaryInput!)
                    {
                        nfcUpdateSummary (payload:$payload)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4a588db1-5149-466c-85aa-e52a60d6e35b',
                        tagId: '4e16d9fd-085d-49a1-9974-0783d41f9f11',
                        tenantId: 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c',
                        accessAt: '2020-07-29 03:52:04',
                        counter: 8790925630,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSummary.id).toStrictEqual('4a588db1-5149-466c-85aa-e52a60d6e35b');
            });
    });

    test(`/GraphQL nfcDeleteSummaryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteSummaryById (id:$id)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
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

    test(`/GraphQL nfcDeleteSummaryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteSummaryById (id:$id)
                        {   
                            id
                            tagId
                            tenantId
                            accessAt
                            counter
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4a588db1-5149-466c-85aa-e52a60d6e35b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSummaryById.id).toStrictEqual('4a588db1-5149-466c-85aa-e52a60d6e35b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});