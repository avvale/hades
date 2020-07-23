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
                name: 'q',
                code: 'c3wfhoj4rod6xkloxdygkq770qxkcdmcnmwm3qvmezoosaezga',
                logo: '7',
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
                
                name: 'r',
                code: 'j9lekjt9008x5sapqviukqtahkb7ko912n284x3nwchhbidt7x',
                logo: 'q',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: null,
                code: 'hwssulav093027hmoy8ad6zsi3tdbs1dkkrfsb5zgqw05dj662',
                logo: 't',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                
                code: 'm3fxanyve9u83ppvxk2wjrry7i42swupbbd6hl3dsenvm64ymn',
                logo: 'n',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: 'w',
                code: null,
                logo: '0',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: 'q',
                
                logo: 'x',
                isActive: true,
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: '8',
                code: 'asl4rjp3jxni84mzpns3y9x9dqkh2loc4c9rrer4wsxl4qklhl',
                logo: 'r',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: 'w',
                code: 'stqbvvyobed3f8ercssa7q5dyte0kxsc62xz8vqbl61dpr5b47',
                logo: 'k',
                
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
                id: 'c0rpmyrt2jft6dfmvte1padv4wxizknedfztz',
                name: '7',
                code: 'po5tnse41khv9ylh184n4rxs78tyo2hv1i2a3l5wyrsvulup2a',
                logo: '0',
                isActive: false,
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: 'b',
                code: 'nulvv9xvxqxnekdx6grs9mpf6j3loeb3vum4wcewg45ztt87ov0',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: 'r',
                code: 'd7hjeydo99cprt7cgepi722q1ojpe7bf8dwdgpehnimpm8pls9',
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
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: '5',
                code: '0gp99rv9ip4qhy0jmnuvye0l5uq1y7rl3anwlytntsycb4vjo0',
                logo: 'w',
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
                        value   : '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'));
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
            .get('/admin/tenant/6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'));
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
                
                id: '1595b65d-b5fb-468f-8382-7385203cba29',
                name: 'g',
                code: 'dvs30az0hit8823f1umbsb5060lzul36shkpuc06w0lwg0co7w',
                logo: '8',
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
                
                id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                name: '6',
                code: '1qw50ygzz0etpx7911gbyzyun4ycidwv98riaywm7oqmjafmxy',
                logo: 'w',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'));
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
            .delete('/admin/tenant/6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7')
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
                        id: '08525d4e-8e4f-4ef6-9c98-413b96e241ea',
                        name: 'e',
                        code: 'y27td2y1ie52c9idze41xkcvxnpf4xt11kmsfiygucm1p4nwvs',
                        logo: 'u',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateTenant).toHaveProperty('id', '08525d4e-8e4f-4ef6-9c98-413b96e241ea');
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
                            value   : '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenant.id).toStrictEqual('6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7');
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
                    id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenantById.id).toStrictEqual('6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7');
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
                        
                        id: '7e2854b2-8186-411e-8a64-720dcd5a3641',
                        name: 'i',
                        code: 'kdc3w7ntbg52beuqc8vz8o9a5s50c4c2sg2wd6tb0rness945a',
                        logo: 's',
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
                        
                        id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7',
                        name: 'v',
                        code: '4oiaoe88dpuhezojbm5eqwq2w3mh28vkw4h2tbdxka22vmez3z',
                        logo: 'x',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateTenant.id).toStrictEqual('6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7');
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
                    id: '6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteTenantById.id).toStrictEqual('6861ce3e-6eb2-4eb9-8ef3-44543f0adfe7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});