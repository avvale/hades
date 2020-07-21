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
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 02:16:05',
                counter: 9974676576,
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
                
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 14:58:47',
                counter: 2075055293,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: null,
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 11:10:05',
                counter: 3490313753,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-22 00:00:28',
                counter: 1802646012,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: null,
                accessAt: '2020-07-22 00:17:28',
                counter: 5958494516,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                
                accessAt: '2020-07-21 16:04:48',
                counter: 1575927724,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: null,
                counter: 7419703310,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                
                counter: 7888835853,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 03:14:26',
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 05:46:31',
                
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
                id: 'e245j1ckayfok0m2dc0sw5g7dhwjslpsz2qps',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 16:18:14',
                counter: 6538587711,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'v0xiyv4jaqnrtrf8frnc1mzr29mnlo8ovv457',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 19:13:20',
                counter: 9923628539,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: 'gpg50cpnvdzi8u397xcu98tbp82dwyl8sctp5',
                accessAt: '2020-07-21 03:29:14',
                counter: 8767523602,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 13:02:12',
                counter: 24422796113,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 15:00:32',
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: 'XXXXXXXX',
                counter: 4301403034,
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
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 16:04:12',
                counter: 6312631966,
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
                        value   : 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'));
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
            .get('/nfc/summary/aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'));
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
                
                id: '26f5adbb-23eb-4c43-b66d-223d41245a66',
                tagId: 'cff66916-be88-4234-b455-0c80af63526c',
                tenantId: 'ae69d699-3d2b-4956-b7f0-16d5ead29c27',
                accessAt: '2020-07-22 00:59:28',
                counter: 4086720052,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                accessAt: '2020-07-21 19:31:38',
                counter: 4724432461,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'));
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
            .delete('/nfc/summary/aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9')
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
                        id: '46c6220e-a5c3-4256-b4e3-2f68dcfd0305',
                        tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                        tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                        accessAt: '2020-07-21 09:07:31',
                        counter: 3752189392,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSummary).toHaveProperty('id', '46c6220e-a5c3-4256-b4e3-2f68dcfd0305');
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
                            value   : 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummary.id).toStrictEqual('aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9');
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
                    id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummaryById.id).toStrictEqual('aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9');
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
                        
                        id: 'dad822f3-ca78-4764-b579-2fa1d81b9ed4',
                        tagId: '093d234d-d41a-4b43-bab0-865855e5022d',
                        tenantId: 'd006c3b9-46a3-4c0d-b32c-4f4323500986',
                        accessAt: '2020-07-21 18:12:13',
                        counter: 8472859567,
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
                        
                        id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9',
                        tagId: 'ec1d4999-3670-4cb7-9ac2-990874b484ae',
                        tenantId: '8f5e233c-18e5-454b-8ea1-93a855544e21',
                        accessAt: '2020-07-21 02:00:13',
                        counter: 5544147129,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSummary.id).toStrictEqual('aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9');
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
                    id: 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSummaryById.id).toStrictEqual('aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});