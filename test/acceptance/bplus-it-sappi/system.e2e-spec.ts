import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'l',
                tenantCode: 'j',
                environment: 'n',
                version: 'i',
                isActive: false,
                cancelledAt: '2020-07-16 14:22:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: '9',
                tenantCode: 'h',
                environment: 'o',
                version: 'f',
                isActive: false,
                cancelledAt: '2020-07-16 16:39:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: null,
                name: 't',
                tenantCode: '6',
                environment: 't',
                version: '2',
                isActive: false,
                cancelledAt: '2020-07-16 03:27:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                
                name: 's',
                tenantCode: 'y',
                environment: 'q',
                version: 'c',
                isActive: false,
                cancelledAt: '2020-07-16 12:10:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: null,
                tenantCode: 'j',
                environment: 'e',
                version: '2',
                isActive: false,
                cancelledAt: '2020-07-16 04:53:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                
                tenantCode: '2',
                environment: 'j',
                version: 'g',
                isActive: true,
                cancelledAt: '2020-07-16 17:32:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: '3',
                tenantCode: null,
                environment: 't',
                version: 's',
                isActive: false,
                cancelledAt: '2020-07-16 06:21:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: '8',
                
                environment: '6',
                version: 'l',
                isActive: true,
                cancelledAt: '2020-07-16 01:05:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: '0',
                tenantCode: '7',
                environment: null,
                version: 'p',
                isActive: true,
                cancelledAt: '2020-07-16 15:59:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'k',
                tenantCode: '4',
                
                version: 'j',
                isActive: false,
                cancelledAt: '2020-07-16 00:23:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: '9',
                tenantCode: '6',
                environment: 'o',
                version: null,
                isActive: true,
                cancelledAt: '2020-07-16 11:04:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'b',
                tenantCode: 'a',
                environment: 'z',
                
                isActive: false,
                cancelledAt: '2020-07-15 20:45:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 't',
                tenantCode: 'q',
                environment: 'q',
                version: '7',
                isActive: null,
                cancelledAt: '2020-07-16 01:01:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'h',
                tenantCode: '9',
                environment: 'f',
                version: 'x',
                
                cancelledAt: '2020-07-16 14:16:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '61l1ffu2vrvpygozsw25vmb63uy7tswcw8v91',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'r',
                tenantCode: 'a',
                environment: '6',
                version: 'z',
                isActive: false,
                cancelledAt: '2020-07-16 05:46:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'ro1mk6m63k4oss309girsa3lp7cnr5z6i9zpn',
                name: 'u',
                tenantCode: 'm',
                environment: '9',
                version: '4',
                isActive: false,
                cancelledAt: '2020-07-16 08:18:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'u',
                tenantCode: '2',
                environment: 's',
                version: 'v',
                isActive: 'true',
                cancelledAt: '2020-07-16 06:24:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'k',
                tenantCode: 'e',
                environment: 'y',
                version: '1',
                isActive: true,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'e',
                tenantCode: 'b',
                environment: 'n',
                version: '3',
                isActive: true,
                cancelledAt: '2020-07-16 18:07:07',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems/paginate')
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

    it(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
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

    it(`/REST:GET bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '585253e3-dd6a-496d-a067-168ee65c3167'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '585253e3-dd6a-496d-a067-168ee65c3167'));
    });

    it(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/585253e3-dd6a-496d-a067-168ee65c3167')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '585253e3-dd6a-496d-a067-168ee65c3167'));
    });

    it(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '61ff17d1-c9cd-4cad-b24e-ec5150a5c2e2',
                tenantId: 'e593a2c9-c302-49e8-8351-01b02e1cb255',
                name: 'e',
                tenantCode: 'g',
                environment: 'b',
                version: 'w',
                isActive: false,
                cancelledAt: '2020-07-16 04:40:41',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '585253e3-dd6a-496d-a067-168ee65c3167',
                tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                name: 'w',
                tenantCode: 'x',
                environment: 't',
                version: '1',
                isActive: false,
                cancelledAt: '2020-07-16 09:13:34',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '585253e3-dd6a-496d-a067-168ee65c3167'));
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/585253e3-dd6a-496d-a067-168ee65c3167')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3ba7e908-0ce2-4419-a124-47718a23e745',
                        tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                        name: 'm',
                        tenantCode: '9',
                        environment: 'w',
                        version: 'l',
                        isActive: true,
                        cancelledAt: '2020-07-16 07:04:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '3ba7e908-0ce2-4419-a124-47718a23e745');
            });
    });

    it(`/GraphQL bplusItSappiPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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
                            value   : '585253e3-dd6a-496d-a067-168ee65c3167'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('585253e3-dd6a-496d-a067-168ee65c3167');
            });
    });

    it(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '585253e3-dd6a-496d-a067-168ee65c3167'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('585253e3-dd6a-496d-a067-168ee65c3167');
            });
    });

    it(`/GraphQL bplusItSappiGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetSystems (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '67017a73-68ab-4a49-844e-e0fa16f1de6f',
                        tenantId: '98fc4b30-eb7d-42c1-bd9c-58ad119dc52a',
                        name: 'q',
                        tenantCode: 'g',
                        environment: 'q',
                        version: '0',
                        isActive: true,
                        cancelledAt: '2020-07-16 02:25:33',
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

    it(`/GraphQL bplusItSappiUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '585253e3-dd6a-496d-a067-168ee65c3167',
                        tenantId: 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
                        name: 'p',
                        tenantCode: 'j',
                        environment: 'h',
                        version: 'n',
                        isActive: false,
                        cancelledAt: '2020-07-15 22:13:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('585253e3-dd6a-496d-a067-168ee65c3167');
            });
    });

    it(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '585253e3-dd6a-496d-a067-168ee65c3167'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('585253e3-dd6a-496d-a067-168ee65c3167');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});