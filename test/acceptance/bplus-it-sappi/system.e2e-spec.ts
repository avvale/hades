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
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '20yktutflu8eguya2o4md1sd00ol5nt4x9hzd1ueai77v2d3p3',
                version: '8',
                name: 'o',
                environment: 's',
                isActive: false,
                cancelledAt: '2020-07-29 15:14:20',
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
                
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '38gu596a8lq0kemaj7q59kgch0g0nh4wqvxuy84ydwz71omg6n',
                version: '9',
                name: 's',
                environment: 's',
                isActive: false,
                cancelledAt: '2020-07-29 20:44:19',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: null,
                tenantCode: 'tdy6t49xyw82lkt9kqx8ndmebemcc31f5ycwnickg82apolrvg',
                version: 'c',
                name: 'i',
                environment: 's',
                isActive: true,
                cancelledAt: '2020-07-29 05:31:54',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                
                tenantCode: '1z704y8gyx9c6nqo4kzrbc11go9beycngudjqag54rf6gzldif',
                version: '0',
                name: '5',
                environment: '7',
                isActive: true,
                cancelledAt: '2020-07-29 15:55:35',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: null,
                version: '5',
                name: 'b',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-29 17:32:14',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                
                version: 'i',
                name: 's',
                environment: 'a',
                isActive: true,
                cancelledAt: '2020-07-29 16:22:50',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 't8axpbh81gqp00d51tld7fozw52ib6fczrkrbdv9wioz0h0bcu',
                version: null,
                name: 'k',
                environment: 'g',
                isActive: false,
                cancelledAt: '2020-07-29 16:51:41',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '2zxszihp541qu5760dj0xot37w6jre7fpvvea62zvir307rd1q',
                
                name: 'w',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-29 21:46:24',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '7n0nnmgyhf6te5cedoppr111jpqrzd2kigqz5gshz7g3rp8cy3',
                version: '7',
                name: null,
                environment: 'k',
                isActive: false,
                cancelledAt: '2020-07-30 02:05:51',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'xtuhe3zys5sejuy89jzxn9ekn127v68hejxsmr7kgvxf0tndu7',
                version: 'p',
                
                environment: 'z',
                isActive: true,
                cancelledAt: '2020-07-29 21:23:51',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'zghe8exh4994ua042707hxluvfy81a8k4pm1tei7743wc34oa9',
                version: 'q',
                name: 'j',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-29 10:14:42',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'b4ro7qvbica9mu0hc643sdrsf52ls1c3b5ez1xza9bkhj4ib4u',
                version: 'b',
                name: 'u',
                
                isActive: true,
                cancelledAt: '2020-07-29 07:46:09',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '2xsman5zluvo8q056qpd3zmx45hd3qggsl2alzvjrkko8yk0l0',
                version: '9',
                name: '3',
                environment: 'q',
                isActive: null,
                cancelledAt: '2020-07-29 21:26:22',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'f00vz51stp0zus0pdzc0d1202jlfxzogny86c82rrz45yywt0x',
                version: '1',
                name: 'i',
                environment: 'y',
                
                cancelledAt: '2020-07-29 05:07:33',
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
                id: 'zm61i6jrq187knk6cs2yl80lt2pn56mvaj7wu',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'sfq3vqakidgy28pxankbzwr6zq3mew2j44dyci3m5ukoiwrbc9',
                version: '3',
                name: 'i',
                environment: 'z',
                isActive: false,
                cancelledAt: '2020-07-30 01:56:53',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: 'w296qhw9f6g5dl67th20jqtjaxuipf1zmr54w',
                tenantCode: '785eq6pwtb09vckzv3hz2t67tn5ci1lmv5w863dpctizvvb94o',
                version: 'o',
                name: 'l',
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-30 00:24:25',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'c8jn9hw8m92trb9c51crbvyfawpa9g677c5tcxppiyf0pquyvb7',
                version: 'y',
                name: 'c',
                environment: '2',
                isActive: false,
                cancelledAt: '2020-07-29 14:42:46',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '4apefpbo3tj14efcurm0lva5v5iodczj6t5hz1euyg71nq3rw7',
                version: 'c',
                name: 'j',
                environment: 'w',
                isActive: 'true',
                cancelledAt: '2020-07-29 06:59:01',
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: '8xyxdysipjaarq9v3n5mpjb9r8e7ia0cr40bdhj2eznb032ym3',
                version: 'r',
                name: '5',
                environment: 'b',
                isActive: false,
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
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'g2ctx9kyqqwitiq2wdqf6yttgpkk0tsxipzsq17y6idullmnon',
                version: 'i',
                name: 'f',
                environment: 'l',
                isActive: true,
                cancelledAt: '2020-07-29 02:50:50',
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
                        value   : 'ff12f91c-8bb3-4cba-b2b0-1d31867d9c3e'
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
                        value   : '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/0deda929-1988-43c3-8732-54477a3fbe71')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/6511b7e1-917a-4bb7-b86b-04b071cd7f9d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'));
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
                
                id: '0aa3d3ee-8dbb-48b9-8c50-7987e6e63f88',
                tenantId: '67d886e2-423a-4700-ac48-0cfc6e92caf4',
                tenantCode: '9ejxymlr7347erzmrw2ajb622dfz5mruo6xggfbqw9w5gmw8dj',
                version: 't',
                name: '1',
                environment: 'j',
                isActive: true,
                cancelledAt: '2020-07-29 09:08:40',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                tenantCode: 'jag19gmys7bseydf1d98p7u6odd50ukzr6yuc6bv2ft7xewm4u',
                version: 'b',
                name: 'k',
                environment: 'o',
                isActive: true,
                cancelledAt: '2020-07-29 16:19:36',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/9e2b7329-b8fe-44f3-bf5e-84105d893165')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/6511b7e1-917a-4bb7-b86b-04b071cd7f9d')
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
                        id: '3b6a714c-ac4e-442c-a0ac-b838727a1e4f',
                        tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                        tenantCode: 'yzgrvl96garle8qma6wv3jn0mhv6yk29t1xlfp7j11d9e121h7',
                        version: 'n',
                        name: 'f',
                        environment: '2',
                        isActive: false,
                        cancelledAt: '2020-07-29 17:12:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '3b6a714c-ac4e-442c-a0ac-b838727a1e4f');
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
                            value   : '1ab013a1-8921-40d3-af05-4fa1a19f0c84'
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
                            value   : '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('6511b7e1-917a-4bb7-b86b-04b071cd7f9d');
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
                    id: '0ce60854-8152-4418-9b49-90714236d365'
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
                    id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('6511b7e1-917a-4bb7-b86b-04b071cd7f9d');
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
                        
                        id: '59a5a6f3-197c-4711-a4a3-8caec6eee9b0',
                        tenantId: 'e5e50b5e-cfc2-4afc-b736-280bd41a03e0',
                        tenantCode: 'mkfejzclfq3o5auf4y66mkawg80u29cudqy9zgeo45j3l1h2ue',
                        version: 'a',
                        name: '1',
                        environment: 'j',
                        isActive: false,
                        cancelledAt: '2020-07-29 05:14:18',
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
                        
                        id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d',
                        tenantId: '567c33bf-b480-4f2c-8d80-7e8a59059c6a',
                        tenantCode: 'k5b0mcens16w17mn99swop4kkm5lwer4dcwfacqo8qnsrvorva',
                        version: 'z',
                        name: '0',
                        environment: 'l',
                        isActive: true,
                        cancelledAt: '2020-07-29 07:16:01',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('6511b7e1-917a-4bb7-b86b-04b071cd7f9d');
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
                    id: 'acb487f7-dba2-410f-9953-e7712a9b98e4'
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
                    id: '6511b7e1-917a-4bb7-b86b-04b071cd7f9d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('6511b7e1-917a-4bb7-b86b-04b071cd7f9d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});