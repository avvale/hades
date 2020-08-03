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
                name: 'z',
                code: 'wl7oeo1gcdxtnzntyi60do4c86q9cs20mtg65r0yl5lt0vunkt',
                logo: '3',
                isActive: true,
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
                
                name: 'k',
                code: 'v93zi7xy7f76q20xvcoa6fn3ugviftqk22f1neuiv4cu52pxxn',
                logo: 'e',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: null,
                code: 'sukce7y9k8ymanian2mhrlyxehsmsi90cunuyc8giohtf6uhvu',
                logo: 'i',
                isActive: false,
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                
                code: 'rpog9b0tloixjgflppbshwexk9w3li30chpq9shncrfebf99rx',
                logo: 'l',
                isActive: true,
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'k',
                code: null,
                logo: '4',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'w',
                
                logo: '8',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'k',
                code: 'q132xv8nuae5kosubzos5g51iu558o7yfsiivg3900ed6yc88m',
                logo: 'm',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: '9',
                code: '4rcnvgbxqdoq0wlhjfru3iqjax30zlxghj8anvyd1g5aynkjq1',
                logo: 'g',
                
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
                id: '38izl2vkrxdoj093zt1rsuywddzpycvf7hm9z',
                name: 'u',
                code: 'k6ds3pqyvqaq3s6poc6y8l2klnwg45antygopt25dsscxk7w63',
                logo: 'e',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: '2',
                code: 'gklntwghvnui6tazqezz22olbjoeodl5ppgm3w46uon8i832tkd',
                logo: '0',
                isActive: false,
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'n',
                code: 'n5c34ymz7372tysadjifb17ar68z65x281pr8k0iioz6vrpjk7',
                logo: 'h',
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
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'i',
                code: 'btqlw8zuhcygaisw125if1458vysx6cru8xoktrgq067l700ff',
                logo: 'v',
                isActive: false,
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
                        value   : 'ec120690-72be-4c85-9260-32bd3fec4a6e'
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
                        value   : 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'));
    });

    test(`/REST:GET admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/3e165e80-1ec4-47e4-8c4f-429e914112c2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/d5071f5a-4c79-4e89-80be-88caf6f35bd9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'));
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
                
                id: '1ce43130-4a2a-471c-9d73-d5d631c78967',
                name: 'z',
                code: 'beuonjgt8xanmxnoed98f5cr52izfnrlzlbzpvw49k4viln56k',
                logo: '9',
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
                
                id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                name: 'e',
                code: 'a2cw3vtvhsafrv4ju1gbf41ujpo7pmonhg9aae9sxb2l9byhbg',
                logo: '3',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'));
    });

    test(`/REST:DELETE admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/4bd40cf7-878e-4a91-a069-2c89b8f92401')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/d5071f5a-4c79-4e89-80be-88caf6f35bd9')
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
                        id: '2d98b48b-f78f-448a-b09b-37ecc716f6d8',
                        name: '4',
                        code: 'kooc1vz4dbixmueiyolclae8d8i73cjcnty6540jh6b6rmozz0',
                        logo: '7',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateTenant).toHaveProperty('id', '2d98b48b-f78f-448a-b09b-37ecc716f6d8');
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
                            value   : 'cad490a2-4194-4045-baab-2359b46fbbbc'
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
                            value   : 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenant.id).toStrictEqual('d5071f5a-4c79-4e89-80be-88caf6f35bd9');
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
                    id: '94c4284f-8dc7-42c9-b616-895b7403bb48'
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
                    id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenantById.id).toStrictEqual('d5071f5a-4c79-4e89-80be-88caf6f35bd9');
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
                        
                        id: '83fc9070-2da8-4f56-a808-3d6efeeb45ee',
                        name: 'y',
                        code: 'xehqgoxb130fn81avdxp4fda20bq5ojtucb86i4yh3o2qa1lze',
                        logo: '4',
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
                        
                        id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9',
                        name: 'u',
                        code: 'f9219u22mb67enpdgpp5i40jshutsua5bf6vgozc50ygst9scv',
                        logo: 'w',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateTenant.id).toStrictEqual('d5071f5a-4c79-4e89-80be-88caf6f35bd9');
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
                    id: '87166249-eeec-4683-92ff-8e28a4509b0d'
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
                    id: 'd5071f5a-4c79-4e89-80be-88caf6f35bd9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteTenantById.id).toStrictEqual('d5071f5a-4c79-4e89-80be-88caf6f35bd9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});