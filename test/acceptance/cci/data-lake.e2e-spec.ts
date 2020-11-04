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
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: '1tw12zs2pefuojmxu4jqes076zl98lcewmo3ql76prfmiv0jfj',
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
                
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 't4wsk0vnl1fmnorzjwx4odcgva1tpaluakvp7sv9mwtu6rl44o',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: null,
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'nahz78pt5y7ybqov1es8ku67m2bnpbo2bzyeky4zxcqdjapip2',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: '1zffdihmxhdbnhiudjsr9sk4z2mbm1xptohgzc65h25a41ahv3',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: null,
                tenantCode: '3kgr0k79a5i07ucgli1fl2zqbkrwoz5bpi1dehpjw4cv2ndw2x',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                
                tenantCode: '566oxsaf20ofyvp2br8nrxo2w18d03jpa2mc1oro8vcd7wxtr6',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'scksbq8blw9ral1xpx6bnte5r0sxnvv4qtyj6ai4soqyenvahy',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'rpvattnctf33tbej9qqbnhwxsqq1ia0vk5w17alnc0j9ikotnr',
                
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
                id: 'btcxf572663d0uzsj4vx5uinwv7gc24qt3uxr',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: '3fx9vvv5abjbbzczixlloausn4crajn3kastvjrwvpzhjzvupc',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: 'b8cs93etr9utzabdphmf6jgyuq6h8prjj6tql',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'gjmfavei7a6kqcg2nlzkqkxxqpdwsfxxv0cotklry05l50mual',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: 'wn1m0leolljiri1u3n5qz4llh11utm7eci5bn',
                tenantCode: 'sc0euikbfwczl24pj72psxyblkrepqfuj7kgsbh8oei7xa3q62',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'a3paep2oeboyxdzrll7lliwvipqe9sxkz4bu9ft4xqmkqp8rcvu',
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
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'oo4khbdyftqdtxg6f6ghf7hjm5tuakomqb3qxvfvytnxuvpydz',
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
                        id: '6b52c951-5795-41b2-97b0-17b7dbb18e81'
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
                        id: '18bf6be6-7f85-48ce-9215-ce15011a7d41'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '18bf6be6-7f85-48ce-9215-ce15011a7d41'));
    });

    test(`/REST:GET cci/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/1c41c209-e5cc-44e8-b9bc-63e11d04934a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/18bf6be6-7f85-48ce-9215-ce15011a7d41')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '18bf6be6-7f85-48ce-9215-ce15011a7d41'));
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
                
                id: 'db347245-11fe-48a6-8f14-fc840777a6e9',
                tenantId: '1a8fe0c7-edf1-46ce-8138-5d07464f5b83',
                executionId: '434b8bca-c119-4824-a9b3-1cfe2f04fa21',
                tenantCode: 'bu2n9u1mcqrknece57qe561af4yym0nb95ag9bzsnq2oxckeom',
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
                
                id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                tenantCode: 'b54qs0bn07coanr62dimcymbjfqpe4ks16t7vw37qze5vmpx49',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '18bf6be6-7f85-48ce-9215-ce15011a7d41'));
    });

    test(`/REST:DELETE cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/4a523795-bcd4-406f-8d27-45380c85234e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/18bf6be6-7f85-48ce-9215-ce15011a7d41')
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
                        id: '6cdee789-6b29-48bb-a669-cc4121e36004',
                        tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                        executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                        tenantCode: '4h6axkj3tuwlz8kzoqpdkijwvnslkc5hsgzi2o0cve1zf9ormn',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateDataLake).toHaveProperty('id', '6cdee789-6b29-48bb-a669-cc4121e36004');
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
                            id: '414f7e32-fa2f-4580-9982-8771e2ce660a'
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
                            id: '18bf6be6-7f85-48ce-9215-ce15011a7d41'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLake.id).toStrictEqual('18bf6be6-7f85-48ce-9215-ce15011a7d41');
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
                    id: '073adacd-05d5-4dda-8c66-e0304feee85f'
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
                    id: '18bf6be6-7f85-48ce-9215-ce15011a7d41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLakeById.id).toStrictEqual('18bf6be6-7f85-48ce-9215-ce15011a7d41');
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
                        
                        id: 'c4e7c728-0537-4e78-8456-6430377ea5e4',
                        tenantId: '53c2bc95-abfd-418b-86a5-137c228edffb',
                        executionId: '8632973d-c395-4c16-8f6f-93c5ebbcf1ee',
                        tenantCode: 'hfn2icnvpy85u5ngof8hv3edtj10rig70kkggue8mattf5ef26',
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
                        
                        id: '18bf6be6-7f85-48ce-9215-ce15011a7d41',
                        tenantId: '1e2f633b-610d-43a5-b5db-9fc5e6340409',
                        executionId: '5c35f8c8-1ee1-464f-89ba-42195e66dd38',
                        tenantCode: '374kvysyc7xgs1ctsoyq6wax7mqp7j2vvsgyfyd515mg1welhq',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateDataLake.id).toStrictEqual('18bf6be6-7f85-48ce-9215-ce15011a7d41');
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
                    id: '2eed39d8-3615-4cea-9c79-d6b7ef734245'
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
                    id: '18bf6be6-7f85-48ce-9215-ce15011a7d41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteDataLakeById.id).toStrictEqual('18bf6be6-7f85-48ce-9215-ce15011a7d41');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});