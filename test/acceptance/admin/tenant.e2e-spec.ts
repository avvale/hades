import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/admin/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/admin/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () => 
{
    let app: INestApplication;
    let repository: MockTenantRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST admin/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'a',
                code: 'blu6h1fm9tzzkutfouo1vhsde1quesyaoklxf9rhrrtk47waow',
                logo: 'a',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'm',
                code: 'ack7hxxjop56qo974jyuzx4vrb6ngz7ry8rzpuugtrf7w5n65e',
                logo: 'g',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: null,
                code: '5jm30bm0syunqxqgiufnp9359catnb82pz9x61466v7k1rrjoc',
                logo: 'q',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                
                code: 'z4hswb6ryl5uz7g6er7purniihxuujw0uzxpfd0wdcrgcjl1eu',
                logo: 'm',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: 'd',
                code: null,
                logo: '3',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: '2',
                
                logo: 'k',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: '2',
                code: 'k15yk8m5ed3f62l6z5ivtsmz0l8e2hw689l4ouxvtgmqqxtu7p',
                logo: 'o',
                isActive: null,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: '0',
                code: 'skypbp8f4hfdhoep0zb959tl12lknwdg1cimcdd4e7gpt38w98',
                logo: 'z',
                
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'yraar9o8o642ic9a4q6g5wpbgw9vvsxldfa1c',
                name: '2',
                code: 'prdej0ud859m7nttxw54enbjx5hlqccka6ss9ysy4di9dp7mjc',
                logo: 'x',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: 'u',
                code: 'yjfpq2i771jx9krrvxpy7wjq6d7ap4vg71kqrzf2cz61garmldw',
                logo: 'x',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: '9',
                code: 'r12p6v9oanjhgpsld3udvh91txa67zil8amc4wylrnc2i4m7hg',
                logo: 'g',
                isActive: 'true',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: 'u',
                code: 's22avh0en3s521wvqrb4jai7hnmbc8p2d712sw3sa7y45rw56q',
                logo: '5',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenants/paginate')
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

    test(`/REST:GET admin/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant')
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

    test(`/REST:GET admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'));
    });

    test(`/REST:GET admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/39e96ab0-63d6-4e7d-882c-9cbe5d2aa316')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'));
    });

    test(`/REST:GET admin/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '2fb28c93-4773-4003-9acb-b5eeed6c0f66',
                name: 'p',
                code: 'taa7esqf4e1d166pw0715wf1ziet7i3qzrzw9rse3ypw55e583',
                logo: 'a',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                name: '0',
                code: '8rlgudx6cs6yff1k0kv2ezsrdkcqdt8ikkm3dj53pmp26q9ktj',
                logo: 't',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'));
    });

    test(`/REST:DELETE admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/39e96ab0-63d6-4e7d-882c-9cbe5d2aa316')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateTenantInput!)
                    {
                        adminCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL adminCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateTenantInput!)
                    {
                        adminCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'adfbd1be-3b94-4c6a-be51-17bcafaf9d84',
                        name: '5',
                        code: '5n28bm2l7h72p6zf38lcq9crthhvc81xsf30c6arnf54je6mu0',
                        logo: 'h',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateTenant).toHaveProperty('id', 'adfbd1be-3b94-4c6a-be51-17bcafaf9d84');
            });
    });

    test(`/GraphQL adminPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL adminFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            value   : '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenant.id).toStrictEqual('39e96ab0-63d6-4e7d-882c-9cbe5d2aa316');
            });
    });

    test(`/GraphQL adminFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL adminFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenantById.id).toStrictEqual('39e96ab0-63d6-4e7d-882c-9cbe5d2aa316');
            });
    });

    test(`/GraphQL adminGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.adminGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateTenantInput!)
                    {
                        adminUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f21ccf4b-1f0d-4c29-9f92-482d02c6c4a8',
                        name: 'f',
                        code: 'q3uu5w04xbsj5fzxxc5qs2jtz7mnm3j3qllbw3i0801c06oygn',
                        logo: '6',
                        isActive: false,
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

    test(`/GraphQL adminUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateTenantInput!)
                    {
                        adminUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316',
                        name: 'w',
                        code: '4yxifjhjgyt9c2f9ujutf7v3nxd4g5pnkt5buozqf929n63xrl',
                        logo: 'e',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateTenant.id).toStrictEqual('39e96ab0-63d6-4e7d-882c-9cbe5d2aa316');
            });
    });

    test(`/GraphQL adminDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL adminDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteTenantById.id).toStrictEqual('39e96ab0-63d6-4e7d-882c-9cbe5d2aa316');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});