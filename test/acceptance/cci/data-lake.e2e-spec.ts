import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IDataLakeRepository } from '@hades/cci/data-lake/domain/data-lake.repository';
import { MockDataLakeRepository } from '@hades/cci/data-lake/infrastructure/mock/mock-data-lake.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('data-lake', () =>
{
    let app: INestApplication;
    let repository: MockDataLakeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IDataLakeRepository)
            .useClass(MockDataLakeRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);

        await app.init();
    });

    test(`/REST:POST cci/data-lake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'pdlwezu88alcm3d6chms7l29bc8ysi5susnw7awr0pzfji99ks',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 't70geiazc5h6vgaesq0ixoo1vejus6nlz0cib5l7y6zqaxo7nk',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: null,
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'm966vxuf5rl7sgsbvniqh4is6cqhcfdpxd4bn3o1fp5q5uvw1q',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'g8nuvrt868mzi7amkom6gmbwy95lkiglwczpgjjb91bdycy4sw',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: null,
                tenantCode: 'tr4uocn523tnlq2v8dobp57qo3gpd98kcgcg5fwtrjcm4jlgrc',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                
                tenantCode: 'civbhazgrbsybep47jxiierxxdat36lij9f2rwilxe5ip2vwum',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: null,
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakePayload property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'nvr6mnfz3bxy32g23sysovekzwldjbfhxavk1szxnfth5p6dle',
                payload: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakePayload property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'sbd0yss1gj5yi93q2qg063pqym9ce1zj8k0quqio62ihct6es0',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'boetwj3hoxdvmzi7dhciytocuwf4h78rjl9xz',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'qehoi6k7i1f5gvd237n2kwu0c6u41bozmr6u0iitvo4rk3vaob',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '2qzfpb9igbmphc566ft1q0un54fj8bzmiucon',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'v1xfqeam0xxzdyw8wjhv3zajobv5kmh497yqescwu5ve8hjg89',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: '43nqe39rkb0680icurhhh3l3forwkhe7gcl8a',
                tenantCode: 'fd74i8ln3tpz7ufmactgjt7xnrvyky316tn6c7mk8r6t39sbd8',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'b9dl60litfdrgkv9zitvfkrqouno099jif4ggcsbz5tg0hhqw8p',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'w889b6nioo7b626wafli587vgpsns4mnpi4rmvh22aex9vfrol',
                payload: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET cci/data-lakes/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lakes/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6541074c-e083-404f-9128-7034e350b40d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '95c84534-6a1e-40c9-8f8d-09c371d9ca70'));
    });

    test(`/REST:GET cci/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/dffa4903-8db9-4ec3-a011-ddd857aabfff')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/95c84534-6a1e-40c9-8f8d-09c371d9ca70')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '95c84534-6a1e-40c9-8f8d-09c371d9ca70'));
    });

    test(`/REST:GET cci/data-lakes`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lakes')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a5a92cce-6fb0-4355-87fa-b9aeb46c9a8a',
                tenantId: 'f72816c8-ac1e-451d-84d5-3a1ffe4e46ca',
                executionId: '8a1d786a-edf1-4335-8d6d-cf8a7fc978c2',
                tenantCode: 'xrf3td9mmebieu9wv4s0ittnvqvn8wa5xj816v3ac3rf5hv9tz',
                payload: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT cci/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                tenantCode: 'zh17upz7mnpat761677y57u3l0brn1feauqjtdq53zt7270mso',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '95c84534-6a1e-40c9-8f8d-09c371d9ca70'));
    });

    test(`/REST:DELETE cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/865aa661-c6e0-4603-8c6a-047964035111')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/95c84534-6a1e-40c9-8f8d-09c371d9ca70')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateDataLake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateDataLakeInput!)
                    {
                        cciCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateDataLakeInput!)
                    {
                        cciCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2c94e60c-d0e5-4977-b82d-f4c09659f0b7',
                        tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                        executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                        tenantCode: 'z1lqc7uuvxtiooehps5wn5i7s5gfb6n5unips43y26mgyje40h',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateDataLake).toHaveProperty('id', '2c94e60c-d0e5-4977-b82d-f4c09659f0b7');
            });
    });

    test(`/GraphQL cciPaginateDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateDataLakes (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateDataLakes.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateDataLakes.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateDataLakes.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindDataLake (query:$query)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'a6ab424c-62f4-4dc0-8db9-b165d1006e36'
                        }
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

    test(`/GraphQL cciFindDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindDataLake (query:$query)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLake.id).toStrictEqual('95c84534-6a1e-40c9-8f8d-09c371d9ca70');
            });
    });

    test(`/GraphQL cciFindDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindDataLakeById (id:$id)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a4b9393e-3fb6-49bb-8260-e3b46a050136'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindDataLakeById (id:$id)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLakeById.id).toStrictEqual('95c84534-6a1e-40c9-8f8d-09c371d9ca70');
            });
    });

    test(`/GraphQL cciGetDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetDataLakes (query:$query)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetDataLakes.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateDataLakeInput!)
                    {
                        cciUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6885d29c-2eed-4b80-9a96-4784b2d2413d',
                        tenantId: 'da018872-fb0d-4cce-b851-bc6899a60c16',
                        executionId: 'bf56779b-4e32-493f-b893-a05001e220d0',
                        tenantCode: '3gko05ozzmodq7zpifiv72futg3fujis2oyw8div9xxjhwlah0',
                        payload: { "foo" : "bar" },
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

    test(`/GraphQL cciUpdateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateDataLakeInput!)
                    {
                        cciUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70',
                        tenantId: '8259b787-0182-4010-9f4f-cd7cddecc6ff',
                        executionId: 'e7a7be9b-0c79-4f34-a55d-c7d10309fa87',
                        tenantCode: 'v2f3syxodj3hxn5xt265cuz1qq5svmnc0ewlr486gqzkq6onqo',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateDataLake.id).toStrictEqual('95c84534-6a1e-40c9-8f8d-09c371d9ca70');
            });
    });

    test(`/GraphQL cciDeleteDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ae760253-60f1-44d8-b0c4-707070313952'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '95c84534-6a1e-40c9-8f8d-09c371d9ca70'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteDataLakeById.id).toStrictEqual('95c84534-6a1e-40c9-8f8d-09c371d9ca70');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});