import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
                    BplusItSappiModule,
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
            .overrideProvider(IDataLakeRepository)
            .useClass(MockDataLakeRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'nl5lf76svqc508ytqni9kq5y3qd2aey9nz0b02c6ypcu32ibnq',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'rngxlsw5npr46rc5xulbtrge3umnyuzivvtfo6tpdu5irjqwul',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: null,
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'u450oaf79opn6pyaufm9zl1zjmlsobwevwf742yvnfg79r604q',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: '8c8azcc2lfroqhbramhuj772kh2dxdc4p39k3a478swmoawf7e',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: null,
                tenantCode: 'aout8vx0on7l622qblbyvdrx4lf3vd1v2c4x44mcz0519pzgik',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                
                tenantCode: '1gjqiafbe8llrxqo77q3bw2g8crw0glzs1ngr8nxfc8doypmnx',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: null,
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakePayload property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: '1333vb0gux8g0gp8wh6lbovi9m17ov66gfpehmlu86xfeihlv2',
                payload: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakePayload property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'eyek4ml01zwlrxfmqxk6mxsuwxx73p6g3wbzajvphkwp3hrc7p',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'vwoaxn74tm61rlistfuhrhp210dda0xm64t97',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: '8ezszetusvinkxgspdto9xpg9i3y3eqapv7cqa6crnlrfz9sdg',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4of3372979etrxh4fo16dcancsb2sl7sad950',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'nxhcxm9rgm9b8jzvwao3yaebkxg081lklnhcssi5kxy2c4d3na',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: 'sz12u535waecjfipl40f219s3ertrey2implh',
                tenantCode: '6tk2geli7v56whzq9vfg0qhncq1eobp6ucszqcwbjmdqgl8ufi',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 'xkoplezxn7s88vhmcr8lomqqoz601lg7mm43v21fq216kc1k0ld',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: 't7lmipmj8vu97vgntdmbj3uxly62tqo6zwp0r41z5n1x1krpqf',
                payload: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/data-lakes/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lakes/paginate')
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

    test(`/REST:GET bplus-it-sappi/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '62f530a8-472b-42b0-8ff9-4c1ac831e446'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'de62920f-e158-4b9d-9eca-0e29b758ab56'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'de62920f-e158-4b9d-9eca-0e29b758ab56'));
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/bfed2dd5-9e40-42ef-87f7-84e215ce508c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/de62920f-e158-4b9d-9eca-0e29b758ab56')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'de62920f-e158-4b9d-9eca-0e29b758ab56'));
    });

    test(`/REST:GET bplus-it-sappi/data-lakes`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lakes')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4476b91-ff1b-4d42-b64e-b35f97962664',
                tenantId: '5535a88e-bf4b-4428-b402-a7622cfe600e',
                executionId: 'b80296e3-f081-4b6e-bf6d-61e9c963af79',
                tenantCode: '4zxortcts95vbee05k1tpjvzmfq6s27w5xwntzpxhmv501jh58',
                payload: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                tenantCode: '9n61xqemjgrojkfs83palvz07r45j2gu11eg1qijagfomwz12p',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'de62920f-e158-4b9d-9eca-0e29b758ab56'));
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/e3dfe02c-4dba-437c-80c2-65ec0ef96729')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/de62920f-e158-4b9d-9eca-0e29b758ab56')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateDataLake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateDataLakeInput!)
                    {
                        bplusItSappiCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
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

    test(`/GraphQL bplusItSappiCreateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateDataLakeInput!)
                    {
                        bplusItSappiCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f9b720c6-5d5e-4da7-aadb-c60ea55d0f24',
                        tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                        executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                        tenantCode: 'pymqrm5n7ioa5y3o4anzdbcaxmnab6b1lw05ohrjrjr31jhyaq',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateDataLake).toHaveProperty('id', 'f9b720c6-5d5e-4da7-aadb-c60ea55d0f24');
            });
    });

    test(`/GraphQL bplusItSappiPaginateDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateDataLakes (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateDataLakes.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateDataLakes.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateDataLakes.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindDataLake (query:$query)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
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
                            value   : '2d0956d0-7c1a-434a-bf70-3284462006d9'
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

    test(`/GraphQL bplusItSappiFindDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindDataLake (query:$query)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
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
                            value   : 'de62920f-e158-4b9d-9eca-0e29b758ab56'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLake.id).toStrictEqual('de62920f-e158-4b9d-9eca-0e29b758ab56');
            });
    });

    test(`/GraphQL bplusItSappiFindDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '965715b6-a617-459d-a33a-02b85b3287f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'de62920f-e158-4b9d-9eca-0e29b758ab56'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLakeById.id).toStrictEqual('de62920f-e158-4b9d-9eca-0e29b758ab56');
            });
    });

    test(`/GraphQL bplusItSappiGetDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetDataLakes (query:$query)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetDataLakes.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateDataLakeInput!)
                    {
                        bplusItSappiUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd7937d0c-3223-4623-b642-6031a1a632fc',
                        tenantId: '2c9c53fa-8747-429a-a3ef-2448fb8f386a',
                        executionId: 'baac7861-7f89-41ca-ab51-dc1c675f53a5',
                        tenantCode: 'h53tg1030fzv4cca8aqnl17mkuljygkgwk336fdhprlqaw046a',
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

    test(`/GraphQL bplusItSappiUpdateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateDataLakeInput!)
                    {
                        bplusItSappiUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'de62920f-e158-4b9d-9eca-0e29b758ab56',
                        tenantId: '4e20aa29-4526-444c-a1a4-1977bb855144',
                        executionId: '6cf13f7b-e530-427a-bc63-2a3b6f520bbf',
                        tenantCode: 'nj139hjz3d9hogdqm9qjg3f4qzzgx5ietxxkdrbbuf2m526qqo',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateDataLake.id).toStrictEqual('de62920f-e158-4b9d-9eca-0e29b758ab56');
            });
    });

    test(`/GraphQL bplusItSappiDeleteDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3d9c8ca1-2bd4-4a46-ae29-fb4a78b6f97e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'de62920f-e158-4b9d-9eca-0e29b758ab56'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteDataLakeById.id).toStrictEqual('de62920f-e158-4b9d-9eca-0e29b758ab56');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});