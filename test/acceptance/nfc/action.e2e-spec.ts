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
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'ZAP',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'TCI',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: null,
                type: 'TCI',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                
                type: 'MULESOFT',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: null,
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'kwcsuhnf4jvaj5jep73g2fsrug2db7eaw07vy',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'TCI',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'm6bve1nb89t6rtzdzfsamcc17o4pkh50cs5ps',
                type: 'TCI',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'MULESOFT',
                sectionId: 'to97v0icqu7j9zgldsu4xr1e9464kmq7v5osu',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'XXXX',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'TCI',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'e8172046-483a-4019-80ae-4490f4d43deb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e8172046-483a-4019-80ae-4490f4d43deb'));
    });

    test(`/REST:GET nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/action/e8172046-483a-4019-80ae-4490f4d43deb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8172046-483a-4019-80ae-4490f4d43deb'));
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
                
                id: '184387d7-d49f-4780-8ba4-7122b12b914b',
                tagId: '08997a82-9a50-45fc-8bc3-af1ce88ba4d7',
                type: 'CMS',
                sectionId: 'ee0e4035-0779-4649-b24b-b88e8f7a85d4',
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
                
                id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                type: 'ZAP',
                sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8172046-483a-4019-80ae-4490f4d43deb'));
    });

    test(`/REST:DELETE nfc/action/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/action/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/action/e8172046-483a-4019-80ae-4490f4d43deb')
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
                        id: '51999ad5-caa6-4c93-9d59-e0e3c0eeb837',
                        tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                        type: 'ZAP',
                        sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateAction).toHaveProperty('id', '51999ad5-caa6-4c93-9d59-e0e3c0eeb837');
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
                            value   : 'e8172046-483a-4019-80ae-4490f4d43deb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindAction.id).toStrictEqual('e8172046-483a-4019-80ae-4490f4d43deb');
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
                    id: 'e8172046-483a-4019-80ae-4490f4d43deb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindActionById.id).toStrictEqual('e8172046-483a-4019-80ae-4490f4d43deb');
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
                        
                        id: '6511753e-0fee-43a5-aef3-770299d4769e',
                        tagId: '13c0ea68-e077-44d7-965e-cca933fb4f35',
                        type: 'CMS',
                        sectionId: 'f90cd7aa-b4aa-4a1b-b9d3-f69eab7bd92c',
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
                        
                        id: 'e8172046-483a-4019-80ae-4490f4d43deb',
                        tagId: 'ce122498-b97f-4fe8-8be8-6f9501184207',
                        type: 'TCI',
                        sectionId: 'e761f69c-99c0-42d7-a627-126f44b62d5b',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateAction.id).toStrictEqual('e8172046-483a-4019-80ae-4490f4d43deb');
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
                    id: 'e8172046-483a-4019-80ae-4490f4d43deb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteActionById.id).toStrictEqual('e8172046-483a-4019-80ae-4490f4d43deb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});