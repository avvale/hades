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
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '6dw337j7ags6f6q6m0auh67udcuf2weto0832a0bvoahlmyobe',
                name: 'r',
                tenantCode: 'y',
                environment: 'o',
                version: '0',
                isActive: true,
                cancelledAt: '2020-07-24 01:24:30',
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
                
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '3sz1c3gc07kdmvdtpgpfxl0lj3va5sps0pzdqwle6fo6unwauj',
                name: 'k',
                tenantCode: '1',
                environment: 'l',
                version: 'q',
                isActive: false,
                cancelledAt: '2020-07-24 02:00:23',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: null,
                tenantCode: 'pd957poifc08bz1vhn58dii7xk7xrc470l33xry5uh3x59z0yu',
                name: 'q',
                tenantCode: 'p',
                environment: 'x',
                version: '4',
                isActive: false,
                cancelledAt: '2020-07-24 03:09:19',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                
                tenantCode: 'fyqi33uujswh62p2y89fatxn1yd6h9nxsh8mo9uhi12vsljgqy',
                name: '2',
                tenantCode: 'w',
                environment: 'j',
                version: 'q',
                isActive: false,
                cancelledAt: '2020-07-24 12:16:28',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: null,
                name: 'h',
                tenantCode: null,
                environment: 'r',
                version: 'w',
                isActive: false,
                cancelledAt: '2020-07-23 19:21:36',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                
                name: '1',
                
                environment: 'b',
                version: 'a',
                isActive: false,
                cancelledAt: '2020-07-23 18:42:36',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'sj6e0e2xo96yhiqncyrfvtl4ey5fxwbvgfwyfjra46lw86zz8l',
                name: null,
                tenantCode: 'n',
                environment: 'o',
                version: 'z',
                isActive: true,
                cancelledAt: '2020-07-24 10:34:36',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'xq9amfpojktn04kbgtt90lx0qj0bihndytkxntkpunzf9a454r',
                
                tenantCode: 'k',
                environment: '7',
                version: 'j',
                isActive: false,
                cancelledAt: '2020-07-24 01:42:32',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: null,
                name: 'b',
                tenantCode: null,
                environment: 'v',
                version: '1',
                isActive: false,
                cancelledAt: '2020-07-23 18:38:26',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                
                name: 'z',
                
                environment: 'e',
                version: '1',
                isActive: true,
                cancelledAt: '2020-07-23 22:45:27',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'n0h829qkom5dpotqpj5o9czc2ptjrn4c3sfmweuvtb7oikckie',
                name: '9',
                tenantCode: 'j',
                environment: null,
                version: 'i',
                isActive: true,
                cancelledAt: '2020-07-23 18:06:53',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '3f3lxwgsz0up3xztylgg9en9v9dp7ywbmw9cvco3v1gkj9ci3y',
                name: 'f',
                tenantCode: 'p',
                
                version: 'p',
                isActive: false,
                cancelledAt: '2020-07-24 07:05:26',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'i2qmh65jnlb04x83q8ksb04ix8ur9vl3hvecvbpbhezlhiwq84',
                name: 'x',
                tenantCode: '3',
                environment: 't',
                version: null,
                isActive: true,
                cancelledAt: '2020-07-24 15:01:20',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '8bgmcz1wc3hx4jcn1i88fs38tf8ql9fzugvayd9d2i2js3lliq',
                name: '7',
                tenantCode: 'w',
                environment: '3',
                
                isActive: false,
                cancelledAt: '2020-07-24 15:04:57',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '42h7mddif9v0gqnd33melujbeqvjji370021xt2wqbe31bqmg5',
                name: 'v',
                tenantCode: '7',
                environment: 'o',
                version: '9',
                isActive: null,
                cancelledAt: '2020-07-24 14:46:05',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '71ckx5k8hfm2hc3bbuo4e9jt2xycns29jvzy8nbf84nakqq5nz',
                name: 'e',
                tenantCode: 'h',
                environment: '4',
                version: 't',
                
                cancelledAt: '2020-07-23 18:48:52',
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
                id: 'qnf1154dh7zj7n5uqyjgt05ie7rqr51l3wr9m',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '1m7l5q7jbxf42ungfhzgmyhhi2061c6udyugabr78b18kbse6r',
                name: '9',
                tenantCode: 'e',
                environment: 'z',
                version: 'k',
                isActive: false,
                cancelledAt: '2020-07-24 02:22:09',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: '4qvap0ih6b50qfl1ebsscyadlmrktemf7xcyc',
                tenantCode: 'uwt67qgrdcbkc909gulldif4jcsz05sybfcvj16fiknvzlwqt8',
                name: 'm',
                tenantCode: 'd',
                environment: 'w',
                version: '6',
                isActive: true,
                cancelledAt: '2020-07-24 12:15:27',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'b7i5d6h7rq2nmoqx1ryy9dtxhexq7pdye53aavp1zptlbue26p6',
                name: 'n',
                tenantCode: '',
                environment: 'm',
                version: 'w',
                isActive: true,
                cancelledAt: '2020-07-23 22:29:39',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: '15s2nhvunvwu8jl2vtw1suqtowdhljf9mp05ll39w5354wo5y3',
                name: '4',
                tenantCode: 'm',
                environment: 'y',
                version: '9',
                isActive: 'true',
                cancelledAt: '2020-07-24 01:59:14',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'ea6et7knfm7wniy5e2bed1miwult4ro6s5j19brxltnyhoejkk',
                name: '9',
                tenantCode: '3',
                environment: 'g',
                version: 'i',
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
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'jwho9yebncflywtve3i100ohxcntr6t0jqw7zffhtrjcmxkb41',
                name: 'a',
                tenantCode: 'b',
                environment: 'n',
                version: '3',
                isActive: false,
                cancelledAt: '2020-07-24 04:45:04',
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
                        value   : 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'));
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
            .get('/bplus-it-sappi/system/c4925865-d8bc-4350-a8c9-6ebd86c72a43')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'));
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
                
                id: '02a4da34-352d-46a3-9ea2-256893e7a867',
                tenantId: '8edb5292-7434-4b7d-91ed-0a16b68daeff',
                tenantCode: '2adm48pxublbk6k1vgwsgm8ostxnbw9n3o74aitljafrkq6keu',
                name: 's',
                tenantCode: 'w',
                environment: 'e',
                version: 'y',
                isActive: false,
                cancelledAt: '2020-07-24 15:15:50',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                tenantCode: 'zdlldy6ctcbe9esakectjlavejmiv5v2hii9ddaxvboizqojof',
                name: '9',
                tenantCode: 'b',
                environment: 'c',
                version: 'o',
                isActive: true,
                cancelledAt: '2020-07-24 00:42:45',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'));
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
            .delete('/bplus-it-sappi/system/c4925865-d8bc-4350-a8c9-6ebd86c72a43')
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
                        id: '24366daa-8f0f-466c-b029-b80eb09f0c85',
                        tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                        tenantCode: '7zhq22vnkngs18jq5ijrukxr3qgj6mh63af4sekdafgprcpbyi',
                        name: 'b',
                        tenantCode: '2',
                        environment: '7',
                        version: 'k',
                        isActive: false,
                        cancelledAt: '2020-07-24 14:35:32',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '24366daa-8f0f-466c-b029-b80eb09f0c85');
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
                            value   : 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('c4925865-d8bc-4350-a8c9-6ebd86c72a43');
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
                    id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('c4925865-d8bc-4350-a8c9-6ebd86c72a43');
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
                        
                        id: '598a468a-6645-4767-a80d-76657f704b0d',
                        tenantId: '00935c0c-3856-4dee-8de5-873039e26631',
                        tenantCode: 'qg4gv96mm25qii8miwr889ok50o1sso6wh7qksal6kouafck2k',
                        name: 'r',
                        tenantCode: 'u',
                        environment: 'p',
                        version: 'z',
                        isActive: false,
                        cancelledAt: '2020-07-24 00:33:31',
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
                        
                        id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43',
                        tenantId: 'd17ef18b-88db-4e36-8373-92ab91820f7a',
                        tenantCode: 'lf8k9nsq4z2sbocjirjzczdwkeye34c02o0bwvekr6lem3df37',
                        name: 'b',
                        tenantCode: 'i',
                        environment: 'y',
                        version: '2',
                        isActive: true,
                        cancelledAt: '2020-07-24 07:59:03',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('c4925865-d8bc-4350-a8c9-6ebd86c72a43');
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
                    id: 'c4925865-d8bc-4350-a8c9-6ebd86c72a43'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('c4925865-d8bc-4350-a8c9-6ebd86c72a43');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});