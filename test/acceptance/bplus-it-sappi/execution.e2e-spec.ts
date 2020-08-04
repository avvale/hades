import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'c81yyj9ptuxodhnof835b2ba4vtffwdagpm4fbseh2kpe71mpw',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'sl0l3t7trwusgzuq4c3s',
                version: '8zlfjii97xrrc2jvwers',
                type: 'SUMMARY',
                executedAt: '2020-08-04 06:13:39',
                monitoringStartAt: '2020-08-03 16:28:08',
                monitoringEndAt: '2020-08-04 04:10:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'lcb1a76yd64mqxqb3zizkkxrbcupncph6l51dwzq9z99ipm5qo',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '8qg0h9bmzifsac45cjq4',
                version: '08b6oqta5a1tvmrjxg7l',
                type: 'DETAIL',
                executedAt: '2020-08-03 18:16:36',
                monitoringStartAt: '2020-08-04 02:12:21',
                monitoringEndAt: '2020-08-04 10:29:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: null,
                tenantCode: 'e64sob58gvhmzl9aavaw8fef94aupdhli456a24rh0xz8rbqoc',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '95gvxd4r57b436emq5hr',
                version: 'm2qjcx4p577fyqc6dymn',
                type: 'DETAIL',
                executedAt: '2020-08-04 11:31:13',
                monitoringStartAt: '2020-08-04 14:21:46',
                monitoringEndAt: '2020-08-03 21:16:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                
                tenantCode: 'i9m0qpi0f0erf0tahpwewx86d44krce6nwx2hht0f9tv707nkh',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'k7xwixoonpspnyhvjyvo',
                version: '9h53nz2bodm6og7200it',
                type: 'DETAIL',
                executedAt: '2020-08-04 12:39:00',
                monitoringStartAt: '2020-08-03 15:12:08',
                monitoringEndAt: '2020-08-04 11:32:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: null,
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '06iqd65vsw94myehqkjq',
                version: '7btck4txf30pm1d3q6bz',
                type: 'SUMMARY',
                executedAt: '2020-08-04 02:07:15',
                monitoringStartAt: '2020-08-04 02:51:41',
                monitoringEndAt: '2020-08-03 23:21:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'xlxcj76ohzbznkaiya4y',
                version: 'r9jqx6n4ycsim6l8p69u',
                type: 'SUMMARY',
                executedAt: '2020-08-03 17:45:32',
                monitoringStartAt: '2020-08-03 21:38:04',
                monitoringEndAt: '2020-08-04 02:03:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '3xsnnw5v9ykexgklzw4fsjmq2wstr0ayumha4pbbj4mzjegosk',
                systemId: null,
                systemName: 'fxfskesrxfk3kg2267nk',
                version: '8w0sjskgmmp7307gaar4',
                type: 'DETAIL',
                executedAt: '2020-08-04 07:27:04',
                monitoringStartAt: '2020-08-04 04:50:13',
                monitoringEndAt: '2020-08-04 01:08:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'y5pheqs1cdgge55wkagyye5cljjp41m8arn779hjkp3zferakd',
                
                systemName: 'eeiy45ftr5wn4vh0fp9z',
                version: 'w9v5ue3lwgx293q4hcf4',
                type: 'DETAIL',
                executedAt: '2020-08-04 12:46:45',
                monitoringStartAt: '2020-08-04 06:28:32',
                monitoringEndAt: '2020-08-04 00:12:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'ffv96aeu43sbp4gukp2xgzati627timkk3igeuq8npc5i1lvqt',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: null,
                version: 'gakvlxyojfk959skyj7b',
                type: 'SUMMARY',
                executedAt: '2020-08-04 03:22:04',
                monitoringStartAt: '2020-08-03 21:33:55',
                monitoringEndAt: '2020-08-04 12:48:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'dc2m3pzlynbcqoitntbxdadalh8k9zx9niresb3eatepv01z9i',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                
                version: 'lewcay2n3vmxr3xqqni6',
                type: 'DETAIL',
                executedAt: '2020-08-03 18:24:27',
                monitoringStartAt: '2020-08-04 10:59:20',
                monitoringEndAt: '2020-08-04 03:51:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'rcqz11th3fmnt4541q1rauhzja24jhoe15tiglsugh01xss6rf',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '1ri8l4h66sjvmalg305n',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-08-04 06:57:35',
                monitoringStartAt: '2020-08-04 14:21:50',
                monitoringEndAt: '2020-08-03 15:35:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '8n0x0rpl1ck8axwqyant0eoboio2dixheqcpb3sr7gko3v6sv0',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '7nt7mx9uk2l6dv3l7lih',
                
                type: 'DETAIL',
                executedAt: '2020-08-03 15:00:51',
                monitoringStartAt: '2020-08-04 12:42:46',
                monitoringEndAt: '2020-08-03 22:55:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '2vs6mmjdg44v9ucqjn4qqtb1pnbm5760rw0iu7h7sd6wdyot0g',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'oamuvbi6dmok1penu7u8',
                version: 'r1dfy9p16m3sh1v9p86u',
                type: null,
                executedAt: '2020-08-03 14:46:54',
                monitoringStartAt: '2020-08-03 23:34:34',
                monitoringEndAt: '2020-08-03 20:18:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'j52da011oy1egphckme836bt2gwgd1kvg5zftw96enyr0z7fec',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'hsm4lqzydutpbycowflu',
                version: 's3yn7kg8a90e3lj2s42g',
                
                executedAt: '2020-08-04 14:26:45',
                monitoringStartAt: '2020-08-04 11:36:25',
                monitoringEndAt: '2020-08-04 07:16:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'gm8qbxzrpome4pa0r776ra2z1c32tsz0c4xe7m1pvaitsxcf18',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'kkqkm3ocgcxueb8f54mb',
                version: 'ebt0ks0ckmfyxjrh1695',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-08-04 09:57:59',
                monitoringEndAt: '2020-08-04 12:12:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '5jbohsbmhpeq1ii6fvgoxehxmythce42yx6zrx1mnp82vyg08g',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'oxwvvtadxd23j22f43io',
                version: 'qfysanjgi10vrt3wzr4e',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-08-04 10:39:09',
                monitoringEndAt: '2020-08-04 05:32:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'tl0aae8f1s0d1aou6y9onffsagzs6u1ivyf8wv1naovbewirk1',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'jujvegl431ypd9x0ssjt',
                version: 'm5a40e5irbmr5i4fh7a8',
                type: 'DETAIL',
                executedAt: '2020-08-03 22:44:52',
                monitoringStartAt: null,
                monitoringEndAt: '2020-08-03 17:54:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'qx0f9437hldr9usa8qrpvsdqx5wsfc30o2iju5nxe4qsidpg9g',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'd0gmzw5ej70c05417tsw',
                version: 'bq04dl170a65lk20azax',
                type: 'DETAIL',
                executedAt: '2020-08-04 02:26:43',
                
                monitoringEndAt: '2020-08-04 13:56:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'morenhmxyr2f3dtltzctv0kps9vuiwrenvp3kpxeaurnvbuypj',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'w1lgfus560pes7gj2f66',
                version: 'eix5mscmb3h5jo02s83a',
                type: 'SUMMARY',
                executedAt: '2020-08-04 07:50:54',
                monitoringStartAt: '2020-08-03 14:47:17',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'mm80laxp7pcdcnsdsza3wd9rzba3dn13tbpqwoin09ujf9en64',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'd3ixemu75ca50kkuf54f',
                version: '8vlkou7oqsaqfznpu0s5',
                type: 'SUMMARY',
                executedAt: '2020-08-03 23:35:08',
                monitoringStartAt: '2020-08-04 06:22:08',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'gz41r8qlr5gtqzvwz83cu491ibkv70ndhy0k9',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'yhhflitnlptv589z1qp3jl39nx9asc3v2oen1eakvp2le9x6g3',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'nerfcjl6crt969nx1y42',
                version: 'r1elpogsyl4liwzuigga',
                type: 'SUMMARY',
                executedAt: '2020-08-04 03:08:30',
                monitoringStartAt: '2020-08-03 17:31:02',
                monitoringEndAt: '2020-08-03 23:23:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: 's71s9kzvpgsrzh07ciz9ptwl0yl7n6uvlcjmp',
                tenantCode: '0b3wxnqb64csy44kijkuqzo87io4afnnph53smxlf06kyqvu1s',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'm0d34xknnlgf622hbqvc',
                version: 'zcoatjw5slrcnv9c5ejd',
                type: 'SUMMARY',
                executedAt: '2020-08-04 04:11:13',
                monitoringStartAt: '2020-08-04 05:30:15',
                monitoringEndAt: '2020-08-04 12:16:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '9h766x7nxqaj03tv0keyfzxvwi46cyc4bd6i20pobol6ad5rj9',
                systemId: 'wn2ij16wsr6gg5t5vppn9uj3mai7176woax2i',
                systemName: 's66kryu6jb7dg4ovytih',
                version: 'megrvxf646lbjeq51je4',
                type: 'SUMMARY',
                executedAt: '2020-08-04 01:31:10',
                monitoringStartAt: '2020-08-03 22:21:19',
                monitoringEndAt: '2020-08-04 02:28:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'ivrvsydoqwjckrqxr5306o41yvhlliev14ri2tkl4oj41qh4rnm',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'bjzlx1t71keynqiov5u9',
                version: '7z3dh1axczobut1b31tf',
                type: 'DETAIL',
                executedAt: '2020-08-04 07:28:13',
                monitoringStartAt: '2020-08-04 12:28:29',
                monitoringEndAt: '2020-08-03 17:06:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '2a1me39vfgsditshzxgm5an0akdvw75ubwdjrx3006feugkcuj',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '1aghehx0zcw5kuj3edf2j',
                version: 'k1oxvm9cbei6etjklgdb',
                type: 'SUMMARY',
                executedAt: '2020-08-03 19:18:14',
                monitoringStartAt: '2020-08-03 23:04:32',
                monitoringEndAt: '2020-08-03 15:35:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'q1gdyr44j4btmpdb917a2n410nqrpd6lybnwexrykrmlkepruf',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'l4p5i83odw5ef3thwhdz',
                version: '01mjh9x470ciycuoat6eh',
                type: 'DETAIL',
                executedAt: '2020-08-03 21:04:49',
                monitoringStartAt: '2020-08-04 11:04:31',
                monitoringEndAt: '2020-08-04 06:38:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'zqkr7pf7b4seia9u5o7bi4ippdeh123iilwdm4w3q4vlrd9yzj',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'yfso258igajhtjy04i02',
                version: 'r89f5x7luspm3sro65rq',
                type: 'XXXX',
                executedAt: '2020-08-03 17:46:59',
                monitoringStartAt: '2020-08-04 09:25:40',
                monitoringEndAt: '2020-08-03 17:01:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'fsid7v52bzg1vtpr50gjpbcphm29txqesqyix06iev6gxzc198',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '1er276shmwtl7uv0d0zr',
                version: 'jc6uxtiib3x459w80891',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-08-03 19:34:54',
                monitoringEndAt: '2020-08-04 10:45:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '9w7sfpzaycflfoc6hhm3n65vszyxiy8epnms51owvavcxb0phx',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'gbkhc2c0f3ktfmkcr0uu',
                version: 'uxw1067a5e7mypewwszc',
                type: 'DETAIL',
                executedAt: '2020-08-04 02:04:55',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-08-04 08:12:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'vuh6cj17yt5pu5k1ub8bexh8v1zg4oihbb3k7l8u5awfgadgr4',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: '75tagrfi9xa1xp9vitnr',
                version: '9yvahahdgbj9dkfz0k52',
                type: 'SUMMARY',
                executedAt: '2020-08-04 12:10:37',
                monitoringStartAt: '2020-08-03 16:08:43',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: '0hgf3e28ju6pg38xsr8m80lapg9jbbd4b1ev9rztsfsg6a2iuw',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'fje5kwmy5cbg8qwubpwc',
                version: '5xndhnqzz4k55fjor1ym',
                type: 'DETAIL',
                executedAt: '2020-08-04 11:07:02',
                monitoringStartAt: '2020-08-04 14:11:20',
                monitoringEndAt: '2020-08-04 14:12:54',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions/paginate')
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

    test(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9ffa1558-e390-40b4-9e60-5f8d3715847a'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '42c42341-6abd-4ae2-83ff-178135004361'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '42c42341-6abd-4ae2-83ff-178135004361'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/97ebf3e5-7f73-4772-9cfa-38ada599b7aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/42c42341-6abd-4ae2-83ff-178135004361')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '42c42341-6abd-4ae2-83ff-178135004361'));
    });

    test(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '326da2de-a2f8-4098-a122-b0346428013d',
                tenantId: '19da1af7-7026-40aa-87c1-9f8454223bb7',
                tenantCode: 'jcgkncsw6vwadskuwbxxqgeock978h5r5bofka1kay3ydwpaik',
                systemId: 'a704227e-6de7-45f5-8c2d-e02187dcb5d3',
                systemName: 'l3h3qr01ki9e7fu13qhr',
                version: '2pllob9adsnvgkbmr360',
                type: 'DETAIL',
                executedAt: '2020-08-04 08:30:00',
                monitoringStartAt: '2020-08-03 17:56:09',
                monitoringEndAt: '2020-08-04 02:06:22',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '42c42341-6abd-4ae2-83ff-178135004361',
                tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                tenantCode: 'y74wyyfowqj5flei2h6ho6ip0x2gvbgrc21mbkx48u34xgoyp5',
                systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                systemName: 'fsaccjzd1hz2sz37j28g',
                version: 'vfeotl72hbk63cjwi26s',
                type: 'SUMMARY',
                executedAt: '2020-08-04 08:44:23',
                monitoringStartAt: '2020-08-04 03:47:59',
                monitoringEndAt: '2020-08-03 22:23:59',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '42c42341-6abd-4ae2-83ff-178135004361'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/9550bf6f-7e5f-4fac-af22-942378cf6bc5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/42c42341-6abd-4ae2-83ff-178135004361')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7eaae0e8-97d5-43b6-88ba-a52bbbdb3b46',
                        tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                        tenantCode: '9g1uaf2krxjfbv3vdxg1v4hd3olu619e9yg3oofskraivkhi5n',
                        systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                        systemName: 'nwxdg9e0xcpfac53nx79',
                        version: '8glf39caujh6drfj5qan',
                        type: 'DETAIL',
                        executedAt: '2020-08-04 01:09:43',
                        monitoringStartAt: '2020-08-04 00:05:55',
                        monitoringEndAt: '2020-08-04 10:38:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '7eaae0e8-97d5-43b6-88ba-a52bbbdb3b46');
            });
    });

    test(`/GraphQL bplusItSappiPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            value   : '5fe9559b-be99-45a2-859e-5679cca96101'
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

    test(`/GraphQL bplusItSappiFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            value   : '42c42341-6abd-4ae2-83ff-178135004361'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('42c42341-6abd-4ae2-83ff-178135004361');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8b3dd9ba-d047-4d35-a150-0327bef9bdf7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '42c42341-6abd-4ae2-83ff-178135004361'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('42c42341-6abd-4ae2-83ff-178135004361');
            });
    });

    test(`/GraphQL bplusItSappiGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetExecutions (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'df37d9ea-7c3e-4f02-8589-f1560fbc11ab',
                        tenantId: '7a70d098-2a3f-4440-84ba-e01870976067',
                        tenantCode: 'bz9m0lsnw9m2onnwg66jxmv00ey98rdjx87bkb9bwrpbc3yiru',
                        systemId: '4e976cb4-7a10-4921-a666-e88433d48ac9',
                        systemName: 'bmxd5dusbkf9164oyvzc',
                        version: 'xijm0lith05k0930zh60',
                        type: 'SUMMARY',
                        executedAt: '2020-08-04 06:30:14',
                        monitoringStartAt: '2020-08-04 03:32:51',
                        monitoringEndAt: '2020-08-04 08:47:11',
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

    test(`/GraphQL bplusItSappiUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '42c42341-6abd-4ae2-83ff-178135004361',
                        tenantId: '32e0b9bc-2745-442e-9cb8-26c56f335f14',
                        tenantCode: 'uknrnjnmjz9ayj3snkutoogd4wh92punpxt327x8oqdysx722v',
                        systemId: '9298603a-1abe-4be8-bc3d-cc00be0d6506',
                        systemName: 'au29g4oy7t5f3l23aiuv',
                        version: 'hqteh8k4qit5h01jmhvi',
                        type: 'SUMMARY',
                        executedAt: '2020-08-04 04:42:12',
                        monitoringStartAt: '2020-08-03 15:48:43',
                        monitoringEndAt: '2020-08-03 22:55:28',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('42c42341-6abd-4ae2-83ff-178135004361');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2efb34af-b9ea-4a79-b011-b739ce25e2ed'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '42c42341-6abd-4ae2-83ff-178135004361'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('42c42341-6abd-4ae2-83ff-178135004361');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});