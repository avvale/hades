import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('summary', () => 
{
    let app: INestApplication;
    let repository: MockSummaryRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST nfc/summary - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-08 19:12:14',
                counter: 2944569910,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-08 19:07:10',
                counter: 3070134837,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: null,
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-08 21:44:05',
                counter: 3229186270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 09:51:25',
                counter: 7888680693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: null,
                accessAt: '2020-07-09 05:33:27',
                counter: 6963134645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                
                accessAt: '2020-07-08 19:05:22',
                counter: 1883346325,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: null,
                counter: 7650275525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                
                counter: 2311073964,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 09:33:04',
                counter: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 05:42:31',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: 'qaev91un12lsunai849w51475ek2r6rl6ssyq',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 10:11:14',
                counter: 9860197249,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: 'caqmb23kra4nfkh92knsta6bqx3a1gn02na4m',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 03:18:02',
                counter: 9903628381,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTagId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'f1k4lbg6d63ci9uparjubffjdok2czx2ocjm7',
                accessAt: '2020-07-09 00:56:12',
                counter: 2073162688,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 07:24:50',
                counter: 54598512081,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryCounter has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-09 10:08:22',
                counter: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryCounter has to be a integer value');
            });
    });
    

    

    

    
    it(`/REST:POST nfc/summary - Got 400 Conflict, SummaryAccessAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: 'XXXXXXXX',
                counter: 5393507839,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SummaryAccessAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-08 23:25:12',
                counter: 7133363015,
            })
            .expect(201);
    });

    it(`/REST:GET nfc/summaries/paginate`, () => 
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

    it(`/REST:GET nfc/summary - Got 404 Not Found`, () => 
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

    it(`/REST:GET nfc/summary`, () => 
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
                        value   : '9a8c9eba-8693-4291-a6ca-290ed515da45'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9a8c9eba-8693-4291-a6ca-290ed515da45'));
    });

    it(`/REST:GET nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summary/9a8c9eba-8693-4291-a6ca-290ed515da45')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9a8c9eba-8693-4291-a6ca-290ed515da45'));
    });

    it(`/REST:GET nfc/summaries`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/summaries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT nfc/summary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: '88dba81e-81a2-4e9c-8de3-277043941509',
                tagId: '9cd4161d-6228-4a59-855b-eee34a721b59',
                tenantId: '5ae57979-7e7a-431b-97f2-83f3d66f0c15',
                accessAt: '2020-07-09 08:45:04',
                counter: 9459081196,
            })
            .expect(404);
    });

    it(`/REST:PUT nfc/summary`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/summary')
            .set('Accept', 'application/json')
            .send({
                
                id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                accessAt: '2020-07-08 19:40:10',
                counter: 1255824107,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9a8c9eba-8693-4291-a6ca-290ed515da45'));
    });

    it(`/REST:DELETE nfc/summary/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE nfc/summary/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/summary/9a8c9eba-8693-4291-a6ca-290ed515da45')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL nfcCreateSummary - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL nfcCreateSummary`, () => 
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
                        id: 'e0bf1383-59cc-4ed1-929a-7b64cd8d6e55',
                        tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                        tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                        accessAt: '2020-07-08 20:24:23',
                        counter: 9269346000,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSummary).toHaveProperty('id', 'e0bf1383-59cc-4ed1-929a-7b64cd8d6e55');
            });
    });

    it(`/GraphQL nfcPaginateSummaries`, () => 
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

    it(`/GraphQL nfcFindSummary - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcFindSummary`, () => 
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
                            value   : '9a8c9eba-8693-4291-a6ca-290ed515da45'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummary.id).toStrictEqual('9a8c9eba-8693-4291-a6ca-290ed515da45');
            });
    });

    it(`/GraphQL nfcFindSummaryById - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcFindSummaryById`, () => 
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
                    id: '9a8c9eba-8693-4291-a6ca-290ed515da45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSummaryById.id).toStrictEqual('9a8c9eba-8693-4291-a6ca-290ed515da45');
            });
    });

    it(`/GraphQL nfcGetSummaries`, () => 
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

    it(`/GraphQL nfcUpdateSummary - Got 404 Not Found`, () => 
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
                        
                        id: '29d572db-477d-48aa-95ab-2d36fe844509',
                        tagId: '271c89cc-55f4-4bc1-80f4-258c41d3b85c',
                        tenantId: 'a0bdd368-b94c-46c0-bd78-c429a4b6a0a9',
                        accessAt: '2020-07-08 21:46:43',
                        counter: 9516688592,
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

    it(`/GraphQL nfcUpdateSummary`, () => 
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
                        
                        id: '9a8c9eba-8693-4291-a6ca-290ed515da45',
                        tagId: '2a71fa2b-9564-4990-b3fd-502329dcafd1',
                        tenantId: 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
                        accessAt: '2020-07-09 00:47:19',
                        counter: 9148161525,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSummary.id).toStrictEqual('9a8c9eba-8693-4291-a6ca-290ed515da45');
            });
    });

    it(`/GraphQL nfcDeleteSummaryById - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcDeleteSummaryById`, () => 
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
                    id: '9a8c9eba-8693-4291-a6ca-290ed515da45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSummaryById.id).toStrictEqual('9a8c9eba-8693-4291-a6ca-290ed515da45');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});