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
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'ux22kycxlsblh4kn4txc2203owgpmo1f55psc40tm8y0od2oq1',
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
                
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: '3zgrmlwmf6b8p4iekc5mribwh7dqckdbv45isi3m503hw9akpg',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: null,
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: '92fc5j9do7t1ksh7sz49u8w7l4t9ckflncvnlkv5ux4a1ovyw6',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: '7i30zuhleij6ha6z1k2kc8wquxoqjyceizrhrk04ff00p2betc',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: null,
                tenantCode: 'il9cy0fdlzm8288e8cfz6tz3z9q4bac3ky71vku7ktnx6ijxr4',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                
                tenantCode: 'cz4ms4kdzcue0b02zitcsxb65srkg0pefjf5y95c6up0vme77k',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'p589cp7ejs9g7dym54h0fnyuun1cam4q6pmokdto0rp558dqh9',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'hmeknb1syqof2t63htr9hmadfu9kt4bnlva03b4fj7ktt8m3g5',
                
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
                id: 'g2cwbciiv6dq7uj6qws0sktpjqm0um77hs5hm',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: '9mvbigttg0sydaoi2p9qooj0og1euieofav2284a0afza19cj7',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'keqfxck4z60vqelktnwzfeffn2mrnr5z6bqo6',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'wje4mthynurn1ojjn964z31pm012bjag6j3kw2zt3pc8qc9fnc',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '5anfnjrnrturhqd02izdpz2u7qndywjzkmu0v',
                tenantCode: 'qjushoiilqmzl5xh27rrfjypygitkm4r9hbc0wbnmr59ivxgpu',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: '9tsvmoreri108lezelnch7r6mti7i09ubzoik8v1t7103qvmh06',
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
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'sce1drcjjbjcrf05lbt78371b12fkewh4l2oxafzxihu3cny38',
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
                        id: '740139cb-5da1-4d29-8d0e-192629239405'
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
                        id: '12a260fd-a6b4-44f6-8619-813d0a41107e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '12a260fd-a6b4-44f6-8619-813d0a41107e'));
    });

    test(`/REST:GET cci/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/4d1b49a1-4373-4f33-902d-19515510ea41')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/12a260fd-a6b4-44f6-8619-813d0a41107e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12a260fd-a6b4-44f6-8619-813d0a41107e'));
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
                
                id: '3aab23f5-3039-45b4-b4c8-28f5387cd1af',
                tenantId: 'af228f44-fd41-4ba0-b250-75708fd562c9',
                executionId: '9daefb91-5d98-4340-9b8f-ce77495dc004',
                tenantCode: 'i9jfavgeufc0usrky1xp4tziejyxf87j6whxmpzdxc39s44k9z',
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
                
                id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                tenantCode: 'w94t84sppitipvb18n4ogw0c5qkqzhxo7s59cz6go1frs8wljh',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12a260fd-a6b4-44f6-8619-813d0a41107e'));
    });

    test(`/REST:DELETE cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/aae89ee6-da71-4e8b-b45f-c8b290b67b93')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/12a260fd-a6b4-44f6-8619-813d0a41107e')
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
                        id: '91ecb2b2-9545-475a-a061-1af59d7b9511',
                        tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                        executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                        tenantCode: '5uf545kgh9mjvfiugtbl6fs161lvrq8oopsepk6kkgsyrnqu1e',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateDataLake).toHaveProperty('id', '91ecb2b2-9545-475a-a061-1af59d7b9511');
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
                            id: '3c558398-a05f-49a2-9e6b-ac185c47997d'
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
                            id: '12a260fd-a6b4-44f6-8619-813d0a41107e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLake.id).toStrictEqual('12a260fd-a6b4-44f6-8619-813d0a41107e');
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
                    id: 'a517168d-f627-4b9d-8cf1-57927c91bb03'
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
                    id: '12a260fd-a6b4-44f6-8619-813d0a41107e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLakeById.id).toStrictEqual('12a260fd-a6b4-44f6-8619-813d0a41107e');
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
                        
                        id: '6eb9ddf1-8a28-41dd-9678-ce1a0a0e767e',
                        tenantId: '459d3d57-7a38-4812-97ee-de78491d957b',
                        executionId: '2d4fe24d-58e8-44ea-8f6c-69e3e1081f48',
                        tenantCode: 'fzy8ewq4p541rubxl7scu8ih59kd3n8njdj2n3v7kt7uw9g55v',
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
                        
                        id: '12a260fd-a6b4-44f6-8619-813d0a41107e',
                        tenantId: 'c12c8c56-7db2-4474-a30e-ebd2dad2fce4',
                        executionId: '484bc070-626b-443e-9769-6afa19bf107c',
                        tenantCode: 'cn3jaal3m3w9z3bdkiyubnun80baidmhc40hip59pwdedl01yu',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateDataLake.id).toStrictEqual('12a260fd-a6b4-44f6-8619-813d0a41107e');
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
                    id: '3f2c4fe7-b1f2-4a81-aacc-52e7c906edbf'
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
                    id: '12a260fd-a6b4-44f6-8619-813d0a41107e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteDataLakeById.id).toStrictEqual('12a260fd-a6b4-44f6-8619-813d0a41107e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});