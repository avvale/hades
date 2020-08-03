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
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 01:11:37',
                counter: 1698749643,
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
                
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 05:23:26',
                counter: 9085701527,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: null,
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 04:19:51',
                counter: 3588776676,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 18:16:01',
                counter: 1761783544,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: null,
                accessAt: '2020-08-03 00:40:29',
                counter: 2663177138,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                
                accessAt: '2020-08-03 02:30:04',
                counter: 5855773236,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: null,
                counter: 7498816613,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                
                counter: 7507240285,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 04:44:59',
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-02 20:07:14',
                
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
                id: '7d8opdhy2oliup1g7lboomznwkw2213ci627l',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-02 21:19:49',
                counter: 9321513694,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'ykgeydjmz0xjxydys1e2nzn43is3ffxxwaf2y',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 05:37:38',
                counter: 3087364184,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'jsdh2dbys6yji6de35nhldnt3aexsdgpunwpn',
                accessAt: '2020-08-03 16:19:05',
                counter: 7411527089,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 10:08:52',
                counter: 83180268138,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 03:34:55',
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: 'XXXXXXXX',
                counter: 9936174792,
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
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 03:34:32',
                counter: 4302000412,
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
                        value   : 'c1a7049c-50bb-4fc4-80a8-6c4b725496b7'
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
                        value   : '47ab947e-e34c-4a41-8c1f-553b00b5e074'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '47ab947e-e34c-4a41-8c1f-553b00b5e074'));
    });

    test(`/REST:GET nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/17aed0ed-d36e-4b60-82f0-e7c615c7f3e1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/47ab947e-e34c-4a41-8c1f-553b00b5e074')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47ab947e-e34c-4a41-8c1f-553b00b5e074'));
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
                
                id: '16de539e-cded-4c5b-bbdd-33bba1d21250',
                tagId: '8303aee0-b228-447d-82dd-7619134f28c9',
                tenantId: '995f2e9f-c9dd-4691-9b1c-c04aa69e3659',
                accessAt: '2020-08-03 00:55:21',
                counter: 4568031905,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                accessAt: '2020-08-03 13:34:34',
                counter: 8990695325,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47ab947e-e34c-4a41-8c1f-553b00b5e074'));
    });

    test(`/REST:DELETE nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/4a4c5905-6e92-45cc-8e0a-1aaeef838feb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/47ab947e-e34c-4a41-8c1f-553b00b5e074')
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
                        id: '39c3843d-73f2-45ce-9274-06421221ceba',
                        tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                        tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                        accessAt: '2020-08-03 10:54:03',
                        counter: 8594251431,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSummary).toHaveProperty('id', '39c3843d-73f2-45ce-9274-06421221ceba');
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
                            value   : 'af4c192f-a793-42d7-8efd-5f8d62580040'
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
                            value   : '47ab947e-e34c-4a41-8c1f-553b00b5e074'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummary.id).toStrictEqual('47ab947e-e34c-4a41-8c1f-553b00b5e074');
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
                    id: '7333d400-1353-4fe8-b4f2-b298741e8c3c'
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
                    id: '47ab947e-e34c-4a41-8c1f-553b00b5e074'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummaryById.id).toStrictEqual('47ab947e-e34c-4a41-8c1f-553b00b5e074');
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
                        
                        id: 'eadc3513-ba7e-4e7f-b82a-57f8cb32a79a',
                        tagId: 'f002d289-92ab-4bd8-b402-1850c311a961',
                        tenantId: '64540021-89a7-4e57-8092-42ede2521e87',
                        accessAt: '2020-08-02 23:21:12',
                        counter: 7175797609,
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
                        
                        id: '47ab947e-e34c-4a41-8c1f-553b00b5e074',
                        tagId: 'd9ccf76c-1368-4705-94cb-c26a91976043',
                        tenantId: 'df4da993-53ab-4140-9aea-693b81839dcb',
                        accessAt: '2020-08-03 00:11:37',
                        counter: 5754589850,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSummary.id).toStrictEqual('47ab947e-e34c-4a41-8c1f-553b00b5e074');
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
                    id: '3bede51f-2fcb-4414-a945-417fcee6cba9'
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
                    id: '47ab947e-e34c-4a41-8c1f-553b00b5e074'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSummaryById.id).toStrictEqual('47ab947e-e34c-4a41-8c1f-553b00b5e074');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});