import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('action', () => 
{
    let app: INestApplication;
    let repository: MockActionRepository;
    
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
            .overrideProvider(IActionRepository)
            .useClass(MockActionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockActionRepository>module.get<IActionRepository>(IActionRepository);

        await app.init();
    });

    it(`/REST:POST nfc/action - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'TCI',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/action - Got 400 Conflict, ActionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'ZAP',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: null,
                type: 'CMS',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                
                type: 'CMS',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: null,
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/action - Got 400 Conflict, ActionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'i0ohyt2pg23c15ncxbtoglaskztdfxky6py1b',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'ZAP',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: '6hfdjo8slnddiuovolwx1ly2z4g4wq2vgi1ji',
                type: 'MULESOFT',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionSectionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'ZAP',
                sectionId: '0k8g7lnj0ou1kukwnw77jn9q5v8iorj2enu2h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionSectionId is not allowed, must be a length of 36');
            });
    });
    

    

    

    

    

    
    it(`/REST:POST nfc/action - Got 400 Conflict, ActionType has to be a enum option of CMS, ZAP, TCI, MULESOFT`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'XXXX',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType has to be any of this options: CMS, ZAP, TCI, MULESOFT');
            });
    });
    

    

    it(`/REST:POST nfc/action`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'CMS',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET nfc/actions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/actions/paginate')
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

    it(`/REST:GET nfc/action - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action')
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

    it(`/REST:GET nfc/action`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f61efb8a-207b-4376-bb49-81097dab62ef'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f61efb8a-207b-4376-bb49-81097dab62ef'));
    });

    it(`/REST:GET nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/f61efb8a-207b-4376-bb49-81097dab62ef')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f61efb8a-207b-4376-bb49-81097dab62ef'));
    });

    it(`/REST:GET nfc/actions`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/actions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT nfc/action - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                id: '7deed772-1dae-42b3-bede-caa6bd1c4907',
                tagId: '26906b11-0891-4d8f-9c43-7cdbf9b5b704',
                type: 'TCI',
                sectionId: '3cd10e86-69d8-4e09-8954-a65feef5f1dc',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT nfc/action`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                type: 'MULESOFT',
                sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f61efb8a-207b-4376-bb49-81097dab62ef'));
    });

    it(`/REST:DELETE nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/f61efb8a-207b-4376-bb49-81097dab62ef')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL nfcCreateAction - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateActionInput!)
                    {
                        nfcCreateAction (payload:$payload)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
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

    it(`/GraphQL nfcCreateAction`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateActionInput!)
                    {
                        nfcCreateAction (payload:$payload)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6a3ba61c-315b-451c-bb89-998fd937a78e',
                        tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                        type: 'CMS',
                        sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateAction).toHaveProperty('id', '6a3ba61c-315b-451c-bb89-998fd937a78e');
            });
    });

    it(`/GraphQL nfcPaginateActions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateActions (query:$query constraint:$constraint)
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
                expect(res.body.data.nfcPaginateActions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateActions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateActions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL nfcFindAction - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindAction (query:$query)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
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

    it(`/GraphQL nfcFindAction`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindAction (query:$query)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
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
                            value   : 'f61efb8a-207b-4376-bb49-81097dab62ef'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindAction.id).toStrictEqual('f61efb8a-207b-4376-bb49-81097dab62ef');
            });
    });

    it(`/GraphQL nfcFindActionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindActionById (id:$id)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
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

    it(`/GraphQL nfcFindActionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindActionById (id:$id)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f61efb8a-207b-4376-bb49-81097dab62ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindActionById.id).toStrictEqual('f61efb8a-207b-4376-bb49-81097dab62ef');
            });
    });

    it(`/GraphQL nfcGetActions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetActions (query:$query)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetActions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL nfcUpdateAction - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateActionInput!)
                    {
                        nfcUpdateAction (payload:$payload)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '372a7212-4369-419e-af3b-2603b8bf35d0',
                        tagId: 'e398ebd7-628d-4525-9673-0d65276ed7d0',
                        type: 'CMS',
                        sectionId: 'eedd49e0-a93f-4571-ae32-7efa2b782a8f',
                        data: { "foo" : "bar" },
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

    it(`/GraphQL nfcUpdateAction`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateActionInput!)
                    {
                        nfcUpdateAction (payload:$payload)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f61efb8a-207b-4376-bb49-81097dab62ef',
                        tagId: 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
                        type: 'CMS',
                        sectionId: '20975c4a-e020-456e-bed7-d00bb4ba058d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateAction.id).toStrictEqual('f61efb8a-207b-4376-bb49-81097dab62ef');
            });
    });

    it(`/GraphQL nfcDeleteActionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteActionById (id:$id)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
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

    it(`/GraphQL nfcDeleteActionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteActionById (id:$id)
                        {   
                            id
                            tagId
                            type
                            sectionId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f61efb8a-207b-4376-bb49-81097dab62ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteActionById.id).toStrictEqual('f61efb8a-207b-4376-bb49-81097dab62ef');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});