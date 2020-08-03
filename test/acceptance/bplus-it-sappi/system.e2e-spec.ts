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
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: '8exgadpogl6xoc7ew12mbhvq2x20ku5jph4udw854s7o0dtny6',
                version: 'w',
                name: 'o',
                environment: '2',
                isActive: false,
                cancelledAt: '2020-08-03 10:05:11',
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
                
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'zpryhnnkkvsr301ryznuiz1wsily847svpgu6ztojnzfua4x6m',
                version: 'u',
                name: 'q',
                environment: 'n',
                isActive: true,
                cancelledAt: '2020-08-02 21:24:22',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: null,
                tenantCode: 's8nhs4ojew3lacc4cwcpt0e2cho4z1sbviol1bb9d39ene32hx',
                version: 'q',
                name: 'm',
                environment: '2',
                isActive: true,
                cancelledAt: '2020-08-03 13:46:07',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                
                tenantCode: '923xlm5bokjnr3gv89k1786qdfxrcc3iv7vz8f8yy8feirkqeg',
                version: '5',
                name: 'n',
                environment: 'p',
                isActive: false,
                cancelledAt: '2020-08-03 10:38:58',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: null,
                version: 'v',
                name: 'j',
                environment: '3',
                isActive: true,
                cancelledAt: '2020-08-03 05:53:54',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                
                version: '4',
                name: 't',
                environment: '5',
                isActive: false,
                cancelledAt: '2020-08-03 00:43:39',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: '5dniswdairfbzae1oh2bzrj2jzsr0n3ng34cbclqqr10hlnegf',
                version: null,
                name: 'f',
                environment: '5',
                isActive: false,
                cancelledAt: '2020-08-03 13:48:30',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'jge5wws0zrqohqts8ht2waq77axmi3npvarmr2hyqtaidvu6yj',
                
                name: '5',
                environment: 'z',
                isActive: false,
                cancelledAt: '2020-08-03 15:15:14',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'f00bbi479gwwp9easwvfxpwv987aofoezro6y5jupsy5k1v1sm',
                version: 'p',
                name: null,
                environment: 'j',
                isActive: false,
                cancelledAt: '2020-08-03 13:51:15',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: '7faeekj07crp70owo1bpjnerlqkvjbv4ffuqto44mh958e57b1',
                version: 'v',
                
                environment: '3',
                isActive: true,
                cancelledAt: '2020-08-03 05:40:27',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: '63x129m46p4pq7lgwaq1pw1o6n52su0rv649olrjo0eqsvwdhc',
                version: 'r',
                name: 'r',
                environment: null,
                isActive: false,
                cancelledAt: '2020-08-03 08:07:12',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'n6bsj3v12yjhjn6sm5bnctkijrxaqmh9qgrxuv71emht4o1rs7',
                version: '6',
                name: 'q',
                
                isActive: false,
                cancelledAt: '2020-08-02 18:35:10',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'gl6736xzhym17g5wrnpqfn5h1jim6kkvtxmr2u57ybygfjdhnj',
                version: 'c',
                name: 'k',
                environment: 'b',
                isActive: null,
                cancelledAt: '2020-08-03 02:21:52',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'bp6at75mbrejr7fvtxuw4sjnozb9xq8g5zcvcwhm0ihj8tp520',
                version: 'l',
                name: 'l',
                environment: 'z',
                
                cancelledAt: '2020-08-03 15:20:34',
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
                id: 'c9m7rpbfgj06tyyo6q8ka14uj4v086ambv76b',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'ae61pkreroiu6ohwob9qdzlaqc5ca9vshay9b69nur50m234ov',
                version: 's',
                name: 'z',
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-08-03 11:27:15',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: '11h8g2v5ncgfc55kg5y82wgwkxhx7rfmv8g66',
                tenantCode: '5o8krg5ylhrm6twl4ea9kd7cun9hi7vfvwvnhao1uwbfqqwb8f',
                version: 'd',
                name: 'a',
                environment: '1',
                isActive: false,
                cancelledAt: '2020-08-03 02:21:34',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: '6cgt9ae6blxxep9qu9l95j3xkq2dmmyxle5294nlyn57frwusn9',
                version: '3',
                name: 'r',
                environment: 'g',
                isActive: true,
                cancelledAt: '2020-08-03 00:36:25',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'd88lf0vp38nb9mdlxt3zncnk0r34369u2i5ueu03fyoo8dwa9g',
                version: '0',
                name: 'x',
                environment: 'u',
                isActive: 'true',
                cancelledAt: '2020-08-02 22:12:09',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'vk6bfds07o0qcld9m8gg18953l7z951ebmaeksle80itegftrn',
                version: '3',
                name: '3',
                environment: '1',
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
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'qtzq20q1x0uk0nso027qr3dg2zgtdw28wq4rbqd4kpv4f8h1l2',
                version: 'w',
                name: 'z',
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-08-03 18:01:17',
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
                        value   : 'ea914570-f5e4-4d14-81d3-1e734b2dcc28'
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
                        value   : '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/cd450e75-34b4-4ba5-bcf8-ab5a9ccec1b3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/08bb92a2-c253-42bb-9441-4a2d51d4d4a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'));
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
                
                id: 'cf8a79f8-1606-4843-ba90-d284eed2fd17',
                tenantId: '4f52bd4a-c21b-4209-ba13-53183962d5e6',
                tenantCode: 'wetccvgjroajfl2uu6gfpg2h1be0pca6grwuyaxcsecov8i641',
                version: 't',
                name: '9',
                environment: 'u',
                isActive: true,
                cancelledAt: '2020-08-03 09:04:24',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                tenantCode: 'yg0tazv6n5d6sav2najr017lpi5w55g94her17qq7ftumwq0ty',
                version: 'r',
                name: 'z',
                environment: '7',
                isActive: false,
                cancelledAt: '2020-08-03 16:19:45',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/5f23e85f-e64c-46d3-b2cd-5df8d6bf6a20')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/08bb92a2-c253-42bb-9441-4a2d51d4d4a2')
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
                        id: 'bc1576a8-c410-40b4-95e8-553bdc15adf8',
                        tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                        tenantCode: 'wt1690c343yuxafnc4c3gz2ksdykufk71ntyn9me9uul3imetj',
                        version: '8',
                        name: '1',
                        environment: '4',
                        isActive: true,
                        cancelledAt: '2020-08-03 09:06:22',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'bc1576a8-c410-40b4-95e8-553bdc15adf8');
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
                            value   : 'e9c4f622-e7e1-4390-a896-021a64aaddb9'
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
                            value   : '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('08bb92a2-c253-42bb-9441-4a2d51d4d4a2');
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
                    id: '3383cacd-3854-4846-abb1-65c623138838'
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
                    id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('08bb92a2-c253-42bb-9441-4a2d51d4d4a2');
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
                        
                        id: 'a40c42d4-f0a3-4726-881e-c6084197ff89',
                        tenantId: '75a6a250-e362-4015-9435-7461a864c548',
                        tenantCode: 'rcm9s9rz35r93d6650czigz6h7ma19550c7hug73e0rp0ta3ml',
                        version: '0',
                        name: 'c',
                        environment: '4',
                        isActive: false,
                        cancelledAt: '2020-08-03 00:51:38',
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
                        
                        id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2',
                        tenantId: 'b1944053-9996-4fe8-b552-42634ca0f289',
                        tenantCode: 'kdjcfsvi8hqhdvb7r33t9o0jvhcet97zb8aa5flj651u3uxm4g',
                        version: 'x',
                        name: 'r',
                        environment: 'd',
                        isActive: true,
                        cancelledAt: '2020-08-03 15:00:20',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('08bb92a2-c253-42bb-9441-4a2d51d4d4a2');
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
                    id: 'd508254f-6aff-4f38-afa5-7384bf322e43'
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
                    id: '08bb92a2-c253-42bb-9441-4a2d51d4d4a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('08bb92a2-c253-42bb-9441-4a2d51d4d4a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});