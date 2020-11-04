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
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: '3uh3d6h9i3sp6po3dt3eivy28hj5po0sjb41opio1oo6yuhrns',
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
                
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'xiw1ycxccmh7ylpn2q62rxeqot5lwp2tvp34gnjlrn5s77take',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: null,
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'gbzm9dz7q3p3uj95wztr6gpbytpx6gnvx45gnyrnlkd6ivrwwz',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'n05km1qozzeumkgvjyxwstydx4lp9poemcr4oiw7236mjeheqk',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: null,
                tenantCode: '47624bcfthwsk9q2q2olukgaewjyyot1a8cgcgjk3zo89wk2eq',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                
                tenantCode: 'wrk1g5ooawlq8ifq29jxz7d6zyg55up4lxgmoe7mw1kerh8ooe',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'kgkmttefvyurut3lwnddaj8jkzlqdvydofh26gh991oozhrp9f',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: '07pvmbhs99jptowef3uw6t1eqego0ou05dpi9mpt0as452g152',
                
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
                id: 'goga82semfm7hetzfa0e7ieh7ypwya49u7ncv',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'i7aooxcj7y4g4wk9knsm7caqn0wjkc1em5nxp96k7iw63a5376',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'ua619ihaia9g8utkbrnbepaztbpc1cwmjydhd',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'd592fg9lp611k67wcguv3zqvb3dw9f5shure0atn8z0qujvohu',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '678uj1he7g4lu3p257ruk0lngw3cus4clpf53',
                tenantCode: '1sr7tpznkglgyz1wlwhiy0zysksdnk5nu4b1gj5zcmidl0mfb0',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'dz1g0wclmbdo2cckof9xdh29ibe33x33tisxdj8mldqfu12cebm',
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
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'v2s7h2sfznouwjjuzlqcd4lt73905j8u1v7v5n5i5xs4bnt6cd',
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
                        id: 'fc2e4b26-c51b-4dfd-8257-24af49fe1892'
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
                        id: 'be295675-be15-4dc5-8b67-02b73759b316'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'be295675-be15-4dc5-8b67-02b73759b316'));
    });

    test(`/REST:GET cci/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/a30a9297-48a3-4888-8258-fa81324dede6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/be295675-be15-4dc5-8b67-02b73759b316')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be295675-be15-4dc5-8b67-02b73759b316'));
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
                
                id: '78249cc6-3231-4058-aab5-80cb94be0557',
                tenantId: '1fdc57e7-77e7-4fb9-aeb3-2fb63535a936',
                executionId: '7978372c-41c7-44e9-85cd-731200dde650',
                tenantCode: 'e7gkwiekdoihnyuxng5vz5ohkdxgo3mmlbe47bm3n2s1818xsx',
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
                
                id: 'be295675-be15-4dc5-8b67-02b73759b316',
                tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                tenantCode: 'clbqactqdbuup3zawo9l3zc8vq48jgm3p32dr8dvqjfy0zz08j',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be295675-be15-4dc5-8b67-02b73759b316'));
    });

    test(`/REST:DELETE cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/2cd96892-0fcc-4d34-87e4-816b3ad0f04e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/be295675-be15-4dc5-8b67-02b73759b316')
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
                        id: '0b8d5c6b-d477-4126-acae-ae4042ce1ee9',
                        tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                        executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                        tenantCode: 't924sjq7db6e0v6oc5clfa5jwwb6foox9yrbybsb4o8xdn1dk5',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateDataLake).toHaveProperty('id', '0b8d5c6b-d477-4126-acae-ae4042ce1ee9');
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
                            id: '2e69c13b-7d5a-4332-a72e-01007c336574'
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
                            id: 'be295675-be15-4dc5-8b67-02b73759b316'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLake.id).toStrictEqual('be295675-be15-4dc5-8b67-02b73759b316');
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
                    id: '8d425f26-8d38-4637-8b23-f1d9209757f8'
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
                    id: 'be295675-be15-4dc5-8b67-02b73759b316'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLakeById.id).toStrictEqual('be295675-be15-4dc5-8b67-02b73759b316');
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
                        
                        id: 'f5aa75f2-c948-4feb-b48f-4b4114f5b8f2',
                        tenantId: 'fc4ad108-eda7-498f-b9fd-7fc16a501f2f',
                        executionId: 'adb8b579-be72-4bf1-8426-9f108ece26c6',
                        tenantCode: 'ako4q2laq3lervuervxe4dube1ucumgldtbaj1ggo9uc74ikfd',
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
                        
                        id: 'be295675-be15-4dc5-8b67-02b73759b316',
                        tenantId: 'd03bc105-a47b-4fad-b931-c212fa84bb09',
                        executionId: '2d7dad85-76c5-40e1-aafb-3634cbb41b18',
                        tenantCode: 'l0pdux7kl2yln1mnjpfu89bs1pnj4r3p7a43j2jju4mhcorwe4',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateDataLake.id).toStrictEqual('be295675-be15-4dc5-8b67-02b73759b316');
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
                    id: '1236ee21-1f52-4206-b8ab-a56842a21763'
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
                    id: 'be295675-be15-4dc5-8b67-02b73759b316'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteDataLakeById.id).toStrictEqual('be295675-be15-4dc5-8b67-02b73759b316');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});