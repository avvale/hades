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
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'MULESOFT',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'TCI',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: null,
                type: 'MULESOFT',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                
                type: 'TCI',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: null,
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: '80tdkgqxvvjkkgextbbtlzbgw9nzlo39b82eg',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'CMS',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'wouvtf80tnk14bs86gc5fp6ftvnbv6m4qst44',
                type: 'ZAP',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'TCI',
                sectionId: 'nzbphxqxb9c9wnmqk9exrxgz9175ur3mjsoj1',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'XXXX',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'ZAP',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
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
                        value   : 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'));
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
            .get('/nfc/action/ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'));
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
                
                id: 'a485a116-b35d-44d6-a845-f640fcbe1f31',
                tagId: '6c97412e-26ae-4819-9e81-ecb81d23b6ff',
                type: 'ZAP',
                sectionId: 'de241487-975a-467a-a678-0307871e5bb1',
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
                
                id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                type: 'TCI',
                sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'));
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
            .delete('/nfc/action/ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0')
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
                        id: 'a39f6a56-c59b-44bc-b85f-410d15630e96',
                        tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                        type: 'MULESOFT',
                        sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateAction).toHaveProperty('id', 'a39f6a56-c59b-44bc-b85f-410d15630e96');
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
                            value   : 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindAction.id).toStrictEqual('ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0');
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
                    id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindActionById.id).toStrictEqual('ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0');
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
                        
                        id: 'bdb4d643-2607-433b-90d7-677816fb3d94',
                        tagId: '917a632f-8ec4-4d61-b966-578912c512fe',
                        type: 'MULESOFT',
                        sectionId: '99310e30-8413-4b13-b057-1c9799fd875e',
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
                        
                        id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0',
                        tagId: 'b21327e5-d59d-4392-8109-3415bf7f4f80',
                        type: 'CMS',
                        sectionId: '02ebdb92-d2a2-4f32-92a8-1ee141200665',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateAction.id).toStrictEqual('ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0');
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
                    id: 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteActionById.id).toStrictEqual('ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});