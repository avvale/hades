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
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'h169rlzkpax42zdxvxdmxrswi7vwpua2ho6b2fnnn4t6ggbgie',
                version: '1',
                name: 'h',
                environment: 'q',
                isActive: true,
                cancelledAt: '2020-07-29 12:18:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'gpeahyae4nw3jn71aev8xeyld14puemfu9yvd6v14u28nlk32r',
                version: '4',
                name: '5',
                environment: 'v',
                isActive: true,
                cancelledAt: '2020-07-29 07:59:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: null,
                tenantCode: 'gf51ds3mecwqtc450t6dxsn39wqoqucuo4si8s44dx9gmgsmzl',
                version: 'z',
                name: 'k',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-07-29 06:35:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                
                tenantCode: 'hc8o1y9esct9jyok1z3vude56ckkk2muvrvutpj6qvofhmlo65',
                version: 'i',
                name: 'g',
                environment: 'z',
                isActive: true,
                cancelledAt: '2020-07-28 22:13:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: null,
                version: 'w',
                name: 'q',
                environment: 'k',
                isActive: false,
                cancelledAt: '2020-07-29 13:55:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                
                version: 'z',
                name: 'd',
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-28 21:25:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'd6lybkttro7ah39m4f2hu57qeqz02y8gzkj1pa24j9ugja4bl1',
                version: null,
                name: 'a',
                environment: 'i',
                isActive: false,
                cancelledAt: '2020-07-29 02:19:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'yxvqusdtzmuabgqadgn2gchw4i7xaynb5bfeo7onlwzz2gkrtx',
                
                name: 'a',
                environment: 'h',
                isActive: false,
                cancelledAt: '2020-07-28 19:58:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: '9dtsrdquyy2cu0xxflfca4n8bw8j2d0mb0rnp8iovr9v35dxjs',
                version: 'f',
                name: null,
                environment: '7',
                isActive: false,
                cancelledAt: '2020-07-29 00:16:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: '3pcg7nbedsgypnm1qry5pnpzuuhooi8bw1ocxz2z4tdk4rhi39',
                version: 'u',
                
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-29 18:09:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: '978ikya9fga8rcy7n79z7y6r6u8bq75uwyxznu4sxfe4w0msb4',
                version: 'p',
                name: 'y',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-29 12:45:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'vetfgtbl3zxyrwa76a90tsut1vt6jx30op3loxtflwy2xh38wt',
                version: '5',
                name: '4',
                
                isActive: false,
                cancelledAt: '2020-07-28 18:28:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: '15aabufuqi7bjxsc4cqvlfpw8ld6h075wob0gatcds4u0438es',
                version: 'y',
                name: 'j',
                environment: '5',
                isActive: null,
                cancelledAt: '2020-07-28 20:49:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'gac1urkxxa19a5501ncoepr8qdewlw12gwb6eutnykcuaupyr3',
                version: 'q',
                name: 'g',
                environment: 'y',
                
                cancelledAt: '2020-07-29 09:15:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'qqwaheiq2xk4z0y5k9xh4wlq54eixwvz2lxq9',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'n3ujzfq34xibpap8r0l8id5nyw0g1s4e3bxppsnsw30maugn22',
                version: 'w',
                name: 'e',
                environment: '4',
                isActive: true,
                cancelledAt: '2020-07-29 05:33:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '7hlj6efjcu6z149xcfgm9yl6xganu1mbsj5ox',
                tenantCode: '66dymk08q7kr2r2urkl98swf6jzqq6x32cgcko4yvacmzz0poi',
                version: 'x',
                name: '4',
                environment: '5',
                isActive: false,
                cancelledAt: '2020-07-28 22:37:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'xptv5kuh8darisjz6gd2zfhg6z7x7k8wtxk6s353ydivhhnhohp',
                version: '4',
                name: 'h',
                environment: '5',
                isActive: true,
                cancelledAt: '2020-07-29 13:39:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: '551krjfiuv4ue3bicm5u0bjx1n5kzymxj4acpet80n9qvauzsa',
                version: 'r',
                name: 'r',
                environment: 'q',
                isActive: 'true',
                cancelledAt: '2020-07-29 06:57:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'ui8dmijde51gozq1lefdznr54dtbj1lc5gy7do30f1cfe2h3ik',
                version: 'c',
                name: 'z',
                environment: '2',
                isActive: true,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'w9ngdlja0q0udrgtojabbhtyehpp6x4uu5c1q368sejkjczy52',
                version: 'y',
                name: '2',
                environment: 'u',
                isActive: true,
                cancelledAt: '2020-07-29 10:59:57',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/system`, () => 
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
                        value   : '3633431b-485a-4f60-a765-ae3a615af774'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3633431b-485a-4f60-a765-ae3a615af774'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/3633431b-485a-4f60-a765-ae3a615af774')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3633431b-485a-4f60-a765-ae3a615af774'));
    });

    test(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c9d2b6c7-2b3a-4922-9067-8430dbf19af3',
                tenantId: '4c4aedeb-e7cc-4e63-b432-7075f48d7851',
                tenantCode: 'flkqjmz0fc0bn5ahbt4y5x9x00nvxzma97qcvej33wm3ggpdr5',
                version: '6',
                name: 'n',
                environment: '9',
                isActive: true,
                cancelledAt: '2020-07-29 03:43:17',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '3633431b-485a-4f60-a765-ae3a615af774',
                tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                tenantCode: 'snqnysho3zjuyqnyih6tebtzy03nsl5ezq13wx4xzv85666v9a',
                version: 'k',
                name: '5',
                environment: 'b',
                isActive: true,
                cancelledAt: '2020-07-29 05:50:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3633431b-485a-4f60-a765-ae3a615af774'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/3633431b-485a-4f60-a765-ae3a615af774')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiCreateSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '020949f6-3197-414b-a7ec-104cf5a6a3ab',
                        tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                        tenantCode: 'lupnvdeknrclnvogznuqssocj6mssnpmcksi78pdbbrbbwfjk7',
                        version: 'p',
                        name: 'v',
                        environment: 'n',
                        isActive: true,
                        cancelledAt: '2020-07-29 05:07:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '020949f6-3197-414b-a7ec-104cf5a6a3ab');
            });
    });

    test(`/GraphQL bplusItSappiPaginateSystems`, () => 
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

    test(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiFindSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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
                            value   : '3633431b-485a-4f60-a765-ae3a615af774'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('3633431b-485a-4f60-a765-ae3a615af774');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiFindSystemById`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3633431b-485a-4f60-a765-ae3a615af774'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('3633431b-485a-4f60-a765-ae3a615af774');
            });
    });

    test(`/GraphQL bplusItSappiGetSystems`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4e10e203-8206-47c5-abbc-873428dcc455',
                        tenantId: 'a1ef3c82-bf87-4c9f-b518-59d791177ded',
                        tenantCode: 'sgr8ildsizn2pi63scerpz7r9mpgrg6min8itzft3n99xyvbmz',
                        version: '8',
                        name: '2',
                        environment: '2',
                        isActive: false,
                        cancelledAt: '2020-07-29 07:42:43',
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

    test(`/GraphQL bplusItSappiUpdateSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3633431b-485a-4f60-a765-ae3a615af774',
                        tenantId: '034a2a4b-f28f-4538-bf51-c88fb4c14744',
                        tenantCode: 'xj20kv4qjqh8ni0v344pnrz61n0se2jiqrkpuztvmswv5xiuo3',
                        version: 'q',
                        name: 'm',
                        environment: 'g',
                        isActive: false,
                        cancelledAt: '2020-07-29 16:54:37',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('3633431b-485a-4f60-a765-ae3a615af774');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiDeleteSystemById`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3633431b-485a-4f60-a765-ae3a615af774'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('3633431b-485a-4f60-a765-ae3a615af774');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});