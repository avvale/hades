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
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'u9xmyad1y4qn9b8rodl5unkkpmz2d8t802knsynznztqtpbhd9',
                version: '2',
                name: 'g',
                environment: 'i',
                isActive: false,
                cancelledAt: '2020-07-27 11:31:19',
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
                
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: '68jq266zp62utuqpf5n06qnpcgvgmfg9y0ob5ilxq2oeg3fpej',
                version: 'w',
                name: 'a',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-27 13:21:51',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: null,
                tenantCode: 'hz2yaxtk9fltgbfq2yus5cbhasvtfadwnu79ee3mea5l10v89n',
                version: '7',
                name: 'v',
                environment: 'a',
                isActive: true,
                cancelledAt: '2020-07-28 01:08:20',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                
                tenantCode: '99uwf7l6ejmrlf8oiqqgltunugvt34e3zq3j3jbko9l81veq6v',
                version: 'l',
                name: '0',
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-07-28 02:39:12',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: null,
                version: '3',
                name: 'j',
                environment: 'k',
                isActive: false,
                cancelledAt: '2020-07-27 16:13:19',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                
                version: '0',
                name: 'c',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-27 19:16:19',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'llop929rhgwwzq5ab8fdepnkxw6x0x04ls1njbmqwp1uannquh',
                version: null,
                name: 'x',
                environment: '0',
                isActive: true,
                cancelledAt: '2020-07-28 01:59:32',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'rxgd1jpjs0ev4lmqirg6o1unmcwgolatbx822drmm3kc9cgtzv',
                
                name: 'h',
                environment: 'v',
                isActive: true,
                cancelledAt: '2020-07-27 16:24:02',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'jvrg7u2tnwlgsc05s0tgcg51xxcf8diwsgbxxmt965us937h31',
                version: '9',
                name: null,
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-27 13:05:49',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'hw4bgrgluyoup2qlt02tdxy8ynl4uda1u2gkf9h6ommfe5h4bj',
                version: 'f',
                
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-07-27 13:12:45',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: '5buanfe4cbk2zdhswrn7h2oj7noupwbwwgc8u2k4h64btlmjnt',
                version: 'o',
                name: 'p',
                environment: null,
                isActive: true,
                cancelledAt: '2020-07-28 04:35:02',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'bf691wj406ovlh8nxq5h7rqb2scc5f2cjuf17cxf0um5bxgbns',
                version: 'u',
                name: 'u',
                
                isActive: true,
                cancelledAt: '2020-07-27 14:53:24',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'b6lbd8qsnek6w4v0hpa08j1r3alrsrgx9yoqpxoe80upmndep1',
                version: 'x',
                name: 'y',
                environment: 'i',
                isActive: null,
                cancelledAt: '2020-07-27 11:39:58',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'p4eeik3dxx7d6k9cb0kgoprqb5qy52u6fq647o9whz1huzfh71',
                version: 'b',
                name: 'k',
                environment: 'q',
                
                cancelledAt: '2020-07-27 15:58:52',
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
                id: '10ols4sgvcibpufysj8sgqv00hmtv9k9mbojv',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: '4k8wmnbu8u9hlzazgfqtpi0i4qibykb7rgckvr93kdm55sayn2',
                version: 'x',
                name: 'g',
                environment: 'x',
                isActive: false,
                cancelledAt: '2020-07-28 10:10:58',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '5pemme8xuzk153nwrlrsiob6030mnu0zosq3k',
                tenantCode: 'pls4i43yry1mhkvnaukvob4o0gsxe8ow9jjdehhk43zeo141ah',
                version: '5',
                name: '5',
                environment: '6',
                isActive: false,
                cancelledAt: '2020-07-27 21:24:49',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'opg9ry5hu0qgqqyoynakii89gqoumfox5w256zc7z2l99vgk4uw',
                version: 'b',
                name: 'q',
                environment: 's',
                isActive: true,
                cancelledAt: '2020-07-28 03:28:27',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'v2hyln8c8qfxhsossfo10eeafs0uw5qemyae5ct6k0783l8ihc',
                version: 'j',
                name: '3',
                environment: '6',
                isActive: 'true',
                cancelledAt: '2020-07-27 20:12:16',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'xpfd6t76zv1a9132rj9md8snyr14gpqwzhgxypl9akazhckluu',
                version: 'q',
                name: 'u',
                environment: 'u',
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
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'k5im9f1k7u354cmzn0b0wz8hg10x7l0grt8sjthw3jya390c09',
                version: 'w',
                name: '6',
                environment: '3',
                isActive: false,
                cancelledAt: '2020-07-28 10:32:03',
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
                        value   : 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'));
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
            .get('/bplus-it-sappi/system/e32f997b-bc6f-4682-a004-1c2d34c8e55c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'));
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
                
                id: '687f6d84-be47-4457-81b4-997f280c8c7e',
                tenantId: '014ebcb8-f257-43d5-931e-727c0c6f0fd8',
                tenantCode: 'joxd5rmt2m6uvixewr7dqy9ngy4c78ia5rcc0qqo3ck4bfjq4v',
                version: 'x',
                name: '8',
                environment: 'q',
                isActive: false,
                cancelledAt: '2020-07-27 13:30:50',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                tenantCode: 'lrf10vtiiyee6lae5nmgr129v0x6k6d4f5y5w2wux9a3uacjjm',
                version: '2',
                name: 'b',
                environment: 'y',
                isActive: false,
                cancelledAt: '2020-07-28 06:37:33',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'));
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
            .delete('/bplus-it-sappi/system/e32f997b-bc6f-4682-a004-1c2d34c8e55c')
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
                        id: 'de3da0d1-a11b-4ad8-a774-77e6e98e721c',
                        tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                        tenantCode: 'l4dx2gvrpda1cn24ijrkv10kb42hu3m7gaguspkg04vqgn4vis',
                        version: 'x',
                        name: '5',
                        environment: 'j',
                        isActive: false,
                        cancelledAt: '2020-07-27 23:35:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'de3da0d1-a11b-4ad8-a774-77e6e98e721c');
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
                            value   : 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('e32f997b-bc6f-4682-a004-1c2d34c8e55c');
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
                    id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('e32f997b-bc6f-4682-a004-1c2d34c8e55c');
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
                        
                        id: '9360380f-2c7d-4542-8d32-521622005610',
                        tenantId: '628b8bb0-3e3d-4297-a26d-adc526e56e2a',
                        tenantCode: 'xn23pd4ccasfmjfn88sodv9fbr64g2t865t8vvsnt5glhbjzcz',
                        version: '5',
                        name: '1',
                        environment: '7',
                        isActive: false,
                        cancelledAt: '2020-07-28 09:50:44',
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
                        
                        id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c',
                        tenantId: '8e58aa31-ebae-4d55-91eb-7b6a97c1ea5e',
                        tenantCode: 'qxbbe1jksn3409pwqp1qxdtdxzys2yjojt8aiwndihyketudi0',
                        version: 'i',
                        name: '0',
                        environment: '1',
                        isActive: false,
                        cancelledAt: '2020-07-27 11:27:45',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('e32f997b-bc6f-4682-a004-1c2d34c8e55c');
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
                    id: 'e32f997b-bc6f-4682-a004-1c2d34c8e55c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('e32f997b-bc6f-4682-a004-1c2d34c8e55c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});