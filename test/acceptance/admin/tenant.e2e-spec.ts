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
                name: 'i',
                code: 'm5yeubqoqfl5roi2nyk8m6cn6j37pbfnd5zyduaapo8fr8enfz',
                logo: 'o',
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
                
                name: 'i',
                code: 'zlq1874sfwct2dbmny0uk6tnn4mlo6yo39k5qsyksr79ix6nzu',
                logo: 'd',
                isActive: true,
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: null,
                code: 'm443x8bn5ajwelt1lo4k4halcyi411wo0do7jo24xzokj5uyzg',
                logo: 'z',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                
                code: 'qwp482x3k78w5piqtlnow1ggabxfzs5j0o65i9yzm4h4nza26r',
                logo: 'k',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'p',
                code: null,
                logo: 'd',
                isActive: true,
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: '4',
                
                logo: 'x',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'j',
                code: 'mv4qnuazyilojiues1dv8y95kg559i05n9ddxgwocov5pbt900',
                logo: 'f',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: '6',
                code: 'rxr3iry5bh8y1vpt5pqe57zbb4869p5lb6ohptxyeqe0co7yqk',
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
                id: 'xjcz73szvdy3gc1qpm9avzmsbiidwelws6rx9',
                name: 'w',
                code: 'ld2guepuu1acj04lw5p1uoppl6qf79ttnpaf2kmp6s04xcllhs',
                logo: 'o',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'u',
                code: 'w2hxl5377v67rpulyz8oyhtsnbpeo3xbibbtsjjlinpr5wp1yhg',
                logo: 'l',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'h',
                code: 'ofj530fzzwujfupm54ziekva7khz0aodxbcmer4ei71nty6s6b',
                logo: 'w',
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
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'd',
                code: 'obij8o8c77z3fog744fper1e0xg8co1w1lpk8mqzsizi0qbz81',
                logo: 'b',
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
                        value   : '5fb93c0b-8e31-4e68-8ac0-9a9a0fc4965f'
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
                        value   : '1b552b0d-1718-4b66-b041-b74e81731088'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1b552b0d-1718-4b66-b041-b74e81731088'));
    });

    test(`/REST:GET admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/f831fb0f-6a3f-46cf-8682-605fd18fe3f3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/1b552b0d-1718-4b66-b041-b74e81731088')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b552b0d-1718-4b66-b041-b74e81731088'));
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
                
                id: '1ee5e79e-8819-46c1-bb8e-6f90c1f69b47',
                name: 'k',
                code: 'ep19i4ubvmhho108e7oql69836ncinsds24s8ah7u40iqnswpg',
                logo: '0',
                isActive: true,
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
                
                id: '1b552b0d-1718-4b66-b041-b74e81731088',
                name: 'u',
                code: 'dh4gvyuodqj1ghmngt0eetj6bdtdsa92rvou898i9758ixeqbu',
                logo: 'e',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b552b0d-1718-4b66-b041-b74e81731088'));
    });

    test(`/REST:DELETE admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/deb5a078-65fb-4141-bf08-c49ded53d168')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/1b552b0d-1718-4b66-b041-b74e81731088')
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
                        id: 'e17649a6-17d5-44d2-a19c-d3234ea49db6',
                        name: 'a',
                        code: 'a78ojqtsrrzsx7srum6p2tn45csmu0lzysi9k6mg28zdrnpacv',
                        logo: 'l',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateTenant).toHaveProperty('id', 'e17649a6-17d5-44d2-a19c-d3234ea49db6');
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
                            value   : '61e38777-f65d-48bf-9082-c0ead0cc60be'
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
                            value   : '1b552b0d-1718-4b66-b041-b74e81731088'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenant.id).toStrictEqual('1b552b0d-1718-4b66-b041-b74e81731088');
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
                    id: '0f6f8bf9-d1a7-429f-90bb-c8991ddc24fb'
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
                    id: '1b552b0d-1718-4b66-b041-b74e81731088'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenantById.id).toStrictEqual('1b552b0d-1718-4b66-b041-b74e81731088');
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
                        
                        id: 'fecc11aa-2693-4b24-a99b-e12eb9ac79e5',
                        name: 't',
                        code: 'z5aftvrv0t6xy81tqoc0lnqsdonnjoy0x4oukj67fhkb1r59rh',
                        logo: 'u',
                        isActive: true,
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
                        
                        id: '1b552b0d-1718-4b66-b041-b74e81731088',
                        name: 'f',
                        code: 'xuihybt43iogxxwaj8cwtx7f6jyf801t1vh5ows5ux6ez41u0c',
                        logo: 'x',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateTenant.id).toStrictEqual('1b552b0d-1718-4b66-b041-b74e81731088');
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
                    id: '945d8923-f783-42be-a5e2-3a3bc094acae'
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
                    id: '1b552b0d-1718-4b66-b041-b74e81731088'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteTenantById.id).toStrictEqual('1b552b0d-1718-4b66-b041-b74e81731088');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});