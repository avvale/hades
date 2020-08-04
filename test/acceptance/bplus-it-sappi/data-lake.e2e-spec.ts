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
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'e1ahsxmawxge56pkmns1e5io0gd3did8mjfruwrsdo5hrio8ax',
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
                
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'wnox2dxzt7iqhser8weasty4fiec993qhcemzr8lq6lrbl1w2p',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: null,
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'ilsk6yrxv9x2xecvahbszyj2mal17bhlvxbcmay15cnm7193js',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'y6yfod61apjhg8gu6vnwm8bq3n5y9q7qbhbet5bmncmq5n1icd',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: null,
                tenantCode: 'w8hbfq6matclx7was1zvx7sjen8oh3lfihaivqswqhr4xq0lxp',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                
                tenantCode: 'zwxiikeqmjhpx6guln3u0e8jlg68q7mqkldv7cbte7o2np9zr4',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'ixfk57sdioa3jeho0wnwtmjjb0q01fviwetxp1fxvfpslua22u',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'enor6w0tamrdwn0n65ild34w87vgmtzm5bu3sratib65tq6ohs',
                
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
                id: '7osoj3hlwaas8kll4om68eat34be91hytao8b',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: '4pd7qw1yu79rb6k2ub3hg3fi3830mwi7o3ki1v920svs5gl34o',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'mc1aiacu4ghyrl0siirf7no4dq5r77cj92dt0',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'jqkqjs4yzfffabas4z0zcsgb9x25y5rm8b7xyqyksskqsfk12k',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: '13wej5tnfud28cg0qvyf6qaiktjelo3cgxfna',
                tenantCode: '5bxrv314ktdjojvd7jt04mad0k63ue2kr5erb0mo4ewyiueh20',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: '70igvamzwwqx8gy9ygwgzgi9fnmvck0bo9oz5i4s3zz810ydrr7',
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
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'r07jmk6j2ukf4wnk6t3g70matqd4jw9paopfsf58my40v16vbo',
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
                        value   : '9bc5d3cd-f7bc-42ca-a8d0-1412adc0bf99'
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
                        value   : '85c508fc-4ff3-4302-97c4-e063fc222446'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '85c508fc-4ff3-4302-97c4-e063fc222446'));
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/64f9f1e9-8bfe-4530-9e69-16def31df5dd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/85c508fc-4ff3-4302-97c4-e063fc222446')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '85c508fc-4ff3-4302-97c4-e063fc222446'));
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
                
                id: '6c41ee14-fcaf-448f-a9ee-892bb519b908',
                tenantId: '4da1c624-76b9-4d92-8be2-3cdb604c43c1',
                executionId: '4d790888-361a-4dc5-bc22-89249a6eddc7',
                tenantCode: 'b5hs9jkcqiczizeojxq9xzc96uqvfunixkgcapsoybr1nhzmew',
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
                
                id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                tenantCode: 'fz1ujth569yujomnvpk8bn9tbz94pmdpm6run9d8o74cj7jkgt',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '85c508fc-4ff3-4302-97c4-e063fc222446'));
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/d04970a8-927f-4338-8f77-3ac0e11f6f05')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/85c508fc-4ff3-4302-97c4-e063fc222446')
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
                        id: 'c0b5f4a7-7fa7-4a2c-92e5-ebae02aefb29',
                        tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                        executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                        tenantCode: 'q4bo8fz5aehu2a2mtog5vyn6l2t5aoks2txhd4zet1qbva6ded',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateDataLake).toHaveProperty('id', 'c0b5f4a7-7fa7-4a2c-92e5-ebae02aefb29');
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
                            value   : 'bc7745c8-cef5-4e49-9ddb-6f01d3637685'
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
                            value   : '85c508fc-4ff3-4302-97c4-e063fc222446'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLake.id).toStrictEqual('85c508fc-4ff3-4302-97c4-e063fc222446');
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
                    id: 'acdedc80-a8d3-4ccf-89d7-92e5a809970b'
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
                    id: '85c508fc-4ff3-4302-97c4-e063fc222446'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLakeById.id).toStrictEqual('85c508fc-4ff3-4302-97c4-e063fc222446');
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
                        
                        id: '13111e98-3b48-4cf7-af4e-3d20bbb17549',
                        tenantId: '59bf7f4a-d358-479a-b3ff-679de10ee171',
                        executionId: 'b7467d67-724d-4e90-b4c4-e28ae65f66eb',
                        tenantCode: '6cucp41ypursu5iu3mayg0x2fjav67as3fhgor196rhr9cyjc7',
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
                        
                        id: '85c508fc-4ff3-4302-97c4-e063fc222446',
                        tenantId: 'fc512c5d-bc2d-49cf-af78-ab10a07b229f',
                        executionId: 'd7f5c8b7-83d5-4427-a15f-93eb3a68fc94',
                        tenantCode: 'ii22okf98ec6kzqvmu0ea26cwun4q666uc3fl81ijffp6u0z9l',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateDataLake.id).toStrictEqual('85c508fc-4ff3-4302-97c4-e063fc222446');
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
                    id: '6bd597cf-733d-4dcf-8582-37bdaae0fc27'
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
                    id: '85c508fc-4ff3-4302-97c4-e063fc222446'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteDataLakeById.id).toStrictEqual('85c508fc-4ff3-4302-97c4-e063fc222446');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});