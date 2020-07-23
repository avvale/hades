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
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '2lfhg7nzps0qp70x74j8ocavip5w78rihr0dp2lehci9poqdlb',
                name: 's',
                tenantCode: 'i',
                environment: 'n',
                version: 'c',
                isActive: true,
                cancelledAt: '2020-07-23 01:16:09',
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
                
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'tynva8fn8mos0impjjxn09h0tnhp90o1v00qcn7k4tqcm2gpgy',
                name: '2',
                tenantCode: 'w',
                environment: 't',
                version: 's',
                isActive: false,
                cancelledAt: '2020-07-23 04:42:28',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: null,
                tenantCode: 'f080gvkukbken01es6zanwmto9ouuegzzqud79wpg1pz40409a',
                name: 'e',
                tenantCode: 'c',
                environment: '9',
                version: '9',
                isActive: true,
                cancelledAt: '2020-07-23 06:40:11',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                
                tenantCode: 'e9y40f53semed91nr0m5rk5yt9jz0dmlwiz7z8kmdu8iohh7o2',
                name: '8',
                tenantCode: 'e',
                environment: 's',
                version: 'a',
                isActive: false,
                cancelledAt: '2020-07-22 22:23:37',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: null,
                name: 'l',
                tenantCode: null,
                environment: '7',
                version: 'z',
                isActive: true,
                cancelledAt: '2020-07-22 20:55:15',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                
                name: 'q',
                
                environment: 'i',
                version: 'q',
                isActive: false,
                cancelledAt: '2020-07-23 05:28:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '0i28k6r0p1w8j4qeq3l0o7g0072l7nd3ysyb6d6vz2c93axeqj',
                name: null,
                tenantCode: 'i',
                environment: 'y',
                version: 'g',
                isActive: false,
                cancelledAt: '2020-07-22 19:32:32',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'nb8qk40gq9q9nqjqdkgg50tzrh617fx46shhzfqc1cv8jq6gl3',
                
                tenantCode: 'g',
                environment: 'i',
                version: 'n',
                isActive: true,
                cancelledAt: '2020-07-22 23:03:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: null,
                name: 'p',
                tenantCode: null,
                environment: 'l',
                version: 'r',
                isActive: false,
                cancelledAt: '2020-07-22 19:28:17',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                
                name: 'a',
                
                environment: 'j',
                version: 'y',
                isActive: false,
                cancelledAt: '2020-07-22 23:49:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'dfrhk17grzn2y39ei3u0dffic1bp6vjjwi6kot85y0j1gd259p',
                name: 's',
                tenantCode: 'i',
                environment: null,
                version: '9',
                isActive: true,
                cancelledAt: '2020-07-23 07:31:48',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'hebasu5bdj9ywwx0xm7ak30kx18rxrn4rsrtq3f572tjg2ntz9',
                name: '9',
                tenantCode: '6',
                
                version: 'x',
                isActive: false,
                cancelledAt: '2020-07-22 20:56:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'tnz8lwt3k9jxqx54vqqtcf1n75y6iucnpq5cglgtsw4jyic0vz',
                name: 'v',
                tenantCode: '2',
                environment: 'u',
                version: null,
                isActive: false,
                cancelledAt: '2020-07-23 11:17:10',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'cdalycv7p04wu430qg4dsq3q56fe48q17giu9xukrcwb4vxzuy',
                name: 'p',
                tenantCode: 't',
                environment: 'f',
                
                isActive: false,
                cancelledAt: '2020-07-22 22:21:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '40ga6ivfp8hf5r5bbufbdb1mqbhbtrup0l6az2x25vhw70lybn',
                name: 'f',
                tenantCode: 'q',
                environment: 'x',
                version: 'h',
                isActive: null,
                cancelledAt: '2020-07-23 17:44:13',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '7vrr09hjqfh8s91dxt0j3na1n9tsdyjafgcthowcyskydtsyzc',
                name: 'z',
                tenantCode: '0',
                environment: 'k',
                version: 'o',
                
                cancelledAt: '2020-07-23 12:26:37',
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
                id: 'rcunk9mu3p1p6hrfs2xrkylmzfqg2a4r7tbor',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'r8ft7rspwt6hbinskw1z5m7hdbhk1r9xj6diip5dplhbstx2tr',
                name: '8',
                tenantCode: '7',
                environment: '4',
                version: '0',
                isActive: true,
                cancelledAt: '2020-07-23 14:14:30',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: '01wcul42qo8s5cywedlrjlr2hk45hule53w0x',
                tenantCode: 'dp5ya0mw3kztspm2ba8gz7laj7ik0czfpx3uk5e6v20p0xtrto',
                name: 'w',
                tenantCode: 'd',
                environment: 'u',
                version: 'q',
                isActive: true,
                cancelledAt: '2020-07-23 09:28:01',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '7wijuueszwuxvu2flyjag01jictc5ccjrpp6trmzbupi6b47bre',
                name: 'l',
                tenantCode: '',
                environment: 'x',
                version: 'k',
                isActive: false,
                cancelledAt: '2020-07-23 12:39:00',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'ewcacnnjslzyuwt2jxgi03fr5voibb6q2bkntkkv7im9hcpojj',
                name: 'g',
                tenantCode: 'z',
                environment: 't',
                version: 'l',
                isActive: 'true',
                cancelledAt: '2020-07-23 06:19:53',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'up9qdfex9rde18l9r476l3p7ka19pvlaj167g3o0c26y0qr0qn',
                name: 'l',
                tenantCode: 'h',
                environment: 'e',
                version: '2',
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
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: '18hys3toyrmtkfum8q64cp7zd60ay9i0btckubv84ifwv3uo8x',
                name: 'b',
                tenantCode: 'q',
                environment: 'g',
                version: '3',
                isActive: true,
                cancelledAt: '2020-07-22 22:59:05',
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
                        value   : '3f839078-5306-4e8d-af37-a68968a8c38b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3f839078-5306-4e8d-af37-a68968a8c38b'));
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
            .get('/bplus-it-sappi/system/3f839078-5306-4e8d-af37-a68968a8c38b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3f839078-5306-4e8d-af37-a68968a8c38b'));
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
                
                id: 'cadbb9f2-85b5-46b7-b86b-f4a6a07ca3d3',
                tenantId: '26d80588-bd3b-444d-9e31-d7b733acdc31',
                tenantCode: 'nkel8z696mrbirlsij6bmjesjw8bwbeny6wdiz9mp3kadtk9b0',
                name: 'u',
                tenantCode: 'a',
                environment: 'o',
                version: 'i',
                isActive: true,
                cancelledAt: '2020-07-23 09:40:54',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                tenantCode: 'vkk2v8p8xktehlklhkrsuhnhn10mdhu9dsa1eagoep301jddxz',
                name: '2',
                tenantCode: '6',
                environment: '4',
                version: '3',
                isActive: false,
                cancelledAt: '2020-07-23 14:30:48',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3f839078-5306-4e8d-af37-a68968a8c38b'));
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
            .delete('/bplus-it-sappi/system/3f839078-5306-4e8d-af37-a68968a8c38b')
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
                        id: 'fb111051-99ba-4371-a09a-bfbcde981829',
                        tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                        tenantCode: 'mcghnq89a5od1pnuhreotx29txg8yo93b8pi2wbtdth9s4uywp',
                        name: 'r',
                        tenantCode: 'f',
                        environment: 's',
                        version: 'b',
                        isActive: false,
                        cancelledAt: '2020-07-23 08:27:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'fb111051-99ba-4371-a09a-bfbcde981829');
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
                            value   : '3f839078-5306-4e8d-af37-a68968a8c38b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('3f839078-5306-4e8d-af37-a68968a8c38b');
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
                    id: '3f839078-5306-4e8d-af37-a68968a8c38b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('3f839078-5306-4e8d-af37-a68968a8c38b');
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
                        
                        id: 'd90d4ff7-c1c7-495c-adc9-c52f840bd88c',
                        tenantId: '4f389676-24ad-495f-ae71-3baf4e94a5f1',
                        tenantCode: '4dlzn87uqex8mu3l5ydghcw2kdst9jf8ym4p1s5zkoitd4r1ni',
                        name: 'a',
                        tenantCode: 'e',
                        environment: 'z',
                        version: 'n',
                        isActive: true,
                        cancelledAt: '2020-07-23 10:50:45',
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
                        
                        id: '3f839078-5306-4e8d-af37-a68968a8c38b',
                        tenantId: 'f98f3681-6b53-45c6-bc4e-8d76f871f02f',
                        tenantCode: 'r5gj2rtfswzc3vusp7k1d1nbvuedcgrq168kth7t5g2y65a57v',
                        name: 'j',
                        tenantCode: 'd',
                        environment: 't',
                        version: 'p',
                        isActive: true,
                        cancelledAt: '2020-07-23 09:11:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('3f839078-5306-4e8d-af37-a68968a8c38b');
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
                    id: '3f839078-5306-4e8d-af37-a68968a8c38b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('3f839078-5306-4e8d-af37-a68968a8c38b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});