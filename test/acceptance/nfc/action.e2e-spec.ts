import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('action', () => 
{
    let app: INestApplication;
    let repository: MockActionRepository;
    
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
            .overrideProvider(IActionRepository)
            .useClass(MockActionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockActionRepository>module.get<IActionRepository>(IActionRepository);

        await app.init();
    });

    test(`/REST:POST nfc/action - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'MULESOFT',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/action - Got 400 Conflict, ActionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'CMS',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: null,
                type: 'CMS',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                
                type: 'MULESOFT',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: null,
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/action - Got 400 Conflict, ActionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'fh28hqis3x35b19mwle2n0b877tir83kcdeex',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'TCI',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: 'rzmoayg6f0sf4lb5tqgtewgndcnsfaij9luer',
                type: 'MULESOFT',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionTagId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionSectionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'MULESOFT',
                sectionId: 'yik8mpius6oww8uppryqwnibwmqoxtw142fw8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionSectionId is not allowed, must be a length of 36');
            });
    });
    

    

    

    
    
    

    

    
    test(`/REST:POST nfc/action - Got 400 Conflict, ActionType has to be a enum option of CMS, ZAP, TCI, MULESOFT`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'XXXX',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ActionType has to be any of this options: CMS, ZAP, TCI, MULESOFT');
            });
    });
    

    

    test(`/REST:POST nfc/action`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'CMS',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET nfc/actions/paginate`, () => 
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

    test(`/REST:GET nfc/action - Got 404 Not Found`, () => 
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
                        value   : '7a5c4c9c-e002-4171-b41e-f25cffb0476f'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET nfc/action`, () => 
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
                        value   : 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'));
    });

    test(`/REST:GET nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/3ea9eaef-0870-4fcc-9816-c57200975331')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/c8c8ffb7-a2f6-40e5-9510-780dcefd036e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'));
    });

    test(`/REST:GET nfc/actions`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/actions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT nfc/action - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                id: '21498720-0301-4229-881d-3f8dbd8ec578',
                tagId: 'cc890c09-cda3-49b1-bcdc-cbecd6da9a3e',
                type: 'TCI',
                sectionId: '67ed8fe5-2bdf-45d7-819e-9b53ada7448f',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/action`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/action')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                type: 'ZAP',
                sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'));
    });

    test(`/REST:DELETE nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/210785c9-a7a9-448e-b6e0-79a0dcfd818b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/c8c8ffb7-a2f6-40e5-9510-780dcefd036e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL nfcCreateAction - Got 409 Conflict, item already exist in database`, () => 
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

    test(`/GraphQL nfcCreateAction`, () => 
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
                        id: '87a18c3a-702f-4f3d-bbc9-060ff649891b',
                        tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                        type: 'TCI',
                        sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateAction).toHaveProperty('id', '87a18c3a-702f-4f3d-bbc9-060ff649891b');
            });
    });

    test(`/GraphQL nfcPaginateActions`, () => 
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

    test(`/GraphQL nfcFindAction - Got 404 Not Found`, () => 
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
                            value   : '0cb8b6b7-f6bf-4d89-ae20-934b7d9b98f2'
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

    test(`/GraphQL nfcFindAction`, () => 
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
                            value   : 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindAction.id).toStrictEqual('c8c8ffb7-a2f6-40e5-9510-780dcefd036e');
            });
    });

    test(`/GraphQL nfcFindActionById - Got 404 Not Found`, () => 
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
                    id: '88c8c0b8-3b10-410f-b677-ae16d81209db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcFindActionById`, () => 
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
                    id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindActionById.id).toStrictEqual('c8c8ffb7-a2f6-40e5-9510-780dcefd036e');
            });
    });

    test(`/GraphQL nfcGetActions`, () => 
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

    test(`/GraphQL nfcUpdateAction - Got 404 Not Found`, () => 
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
                        
                        id: '4563f228-d6b1-4323-adeb-a5a729c34c02',
                        tagId: '99c1c665-1cba-41f5-999b-1e78a2e818a6',
                        type: 'TCI',
                        sectionId: 'b1f8a529-11df-4d6b-b027-65cbaaceed4c',
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

    test(`/GraphQL nfcUpdateAction`, () => 
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
                        
                        id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e',
                        tagId: '2ff08fc5-1866-4a56-9d0d-39383d9c4e38',
                        type: 'CMS',
                        sectionId: '5a75015f-af05-4611-b047-7bd15e670544',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateAction.id).toStrictEqual('c8c8ffb7-a2f6-40e5-9510-780dcefd036e');
            });
    });

    test(`/GraphQL nfcDeleteActionById - Got 404 Not Found`, () => 
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
                    id: '0a1cd5f1-75c7-453d-b6db-504f1cd8d4cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcDeleteActionById`, () => 
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
                    id: 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteActionById.id).toStrictEqual('c8c8ffb7-a2f6-40e5-9510-780dcefd036e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});