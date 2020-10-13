import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    IamModule,
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '456851u6i9rcrj3eto343r71yu6n8oreu09uavgufzt818yj5h',
                version: 'a',
                name: '3',
                environment: 'f',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-10-07 19:58:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'lhdnmshuxdqz7x79ysma7ma4epxx88xmm62rpa4qpmwysa5am2',
                version: 'e',
                name: '9',
                environment: '6',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-10-07 10:50:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: null,
                tenantCode: 'p6h0m5y3zfqimn5y402371edksxezko4zskcuef9w1gso3kee3',
                version: 'b',
                name: 'a',
                environment: 'l',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-07 01:04:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                
                tenantCode: 'l6cl0zrgzngpqv04lprq61ru1bz0fbo5mvjaz77qilm1koexlt',
                version: '7',
                name: 'u',
                environment: '8',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-10-07 17:30:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: null,
                version: 'm',
                name: 'y',
                environment: 's',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 06:54:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                
                version: 'i',
                name: 't',
                environment: 'z',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-07 08:16:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'zmt0ft7chw04zhdfagtb52puqqom1sqfkbcj4l9m7rcir4073z',
                version: null,
                name: 'b',
                environment: 't',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-07 21:03:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'b0xrmgv1q0t7g3omzpyc55k8quq2dscha1qp4ml8vn5itdwdgf',
                
                name: '0',
                environment: '1',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-10-07 03:47:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'aiiusl1n6sf8jtk7xm0yvp1v13n7380llz6de4qal902wujr6d',
                version: 'q',
                name: null,
                environment: 'n',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 16:52:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '8bj9ya57ggrdjkxebiuhdcgkgzz1367joh4toehri1wdygblel',
                version: 'y',
                
                environment: 'w',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2020-10-07 20:00:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'vec10ur21p3la6p9hxfqbb3js24vy0r3x059rmworj852td9a6',
                version: 'c',
                name: 'm',
                environment: null,
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-07 18:00:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'lb0zm32eo4q2w2n78lxemyjiuu60nceu3foas3a5hqg56khc93',
                version: 'c',
                name: 'r',
                
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-10-07 13:51:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '0vd2l2z2alho31toppurvozttu9hb9xmbcsl1fi4bdmpj3sbgc',
                version: 'j',
                name: 'b',
                environment: 'a',
                technology: null,
                isActive: true,
                cancelledAt: '2020-10-07 22:52:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '9x35d66zsil31016aix2lph1gneqh4f55b1g6b76xirjfpc2x4',
                version: '5',
                name: 'g',
                environment: '5',
                
                isActive: true,
                cancelledAt: '2020-10-07 14:37:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'ac8olda0g1qfa5mkhcl7ne3vlfw7fbcbkufugqe7raobfndg23',
                version: '7',
                name: 'm',
                environment: 'e',
                technology: 'WSO2',
                isActive: null,
                cancelledAt: '2020-10-07 10:16:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'gvk21txqcak7cojlb2ax2i5c9wjypsf6w345yls70gg1m69pj1',
                version: 'r',
                name: 'y',
                environment: 'g',
                technology: 'WSO2',
                
                cancelledAt: '2020-10-07 03:54:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'on8sikr5lp8ppywk179mosd79kxrn0ggu4qpu',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '1i6s3hiz4dj2eph6yqkpguuj3s8cevehv4pr8whti8w7s9dl60',
                version: 'o',
                name: 'd',
                environment: 'i',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-10-07 08:57:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: 'jj56s1vc4k0fgzihe4ygdbj6mtlcoyplq1z52',
                tenantCode: 'vhtinoexjo0zh697v545r0johbhpzalrirlf1u61329ciqdkyl',
                version: 's',
                name: 'z',
                environment: 'o',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-10-07 15:11:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'efhij1pmmtcpqctww1tzm8q9gmm1deu2bi5vheil8oxvzw7mfjf',
                version: '7',
                name: 'm',
                environment: '8',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-07 16:06:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'j0z3kld2ut59aof40fpmybk1zkr5p1ywp50nwlewpt0cadevjl',
                version: 'n',
                name: 'f',
                environment: 'a',
                technology: 'SAPSCI',
                isActive: 'true',
                cancelledAt: '2020-10-07 14:30:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology has to be a enum option of WSO2, SAPPI, B2B, MULESOFT, SAPSCI`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: '2ac60twiljpnynz6bbetfd5x9y82y9zj5etpjs6z1wq7dw08rk',
                version: '0',
                name: 'd',
                environment: 'o',
                technology: 'XXXX',
                isActive: false,
                cancelledAt: '2020-10-07 04:12:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology has to be any of this options: WSO2, SAPPI, B2B, MULESOFT, SAPSCI');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'm0bjh20fnp0sdp3a2eu7wgx1o2gxy251wuenu22z36f82vfmvr',
                version: 'm',
                name: 't',
                environment: 'b',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'sll8l748wf87a54opx9w682h3oryndnl3d7wfb72fxfx17etqm',
                version: '5',
                name: 'l',
                environment: 'y',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 04:35:53',
            })
            .expect(201);
    });

    test(`/REST:GET cci/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'cac782b8-2f68-4aa0-8702-826b09bc19f7'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '237d2072-de65-46be-ac8e-6c2e879b2c9d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '237d2072-de65-46be-ac8e-6c2e879b2c9d'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/d7a5eab4-2735-4a5b-bbfe-5753f7b199ef')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/237d2072-de65-46be-ac8e-6c2e879b2c9d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '237d2072-de65-46be-ac8e-6c2e879b2c9d'));
    });

    test(`/REST:GET cci/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '815b03bf-26d3-4bb4-86ae-7baa5b1f2976',
                tenantId: '8f9ea6b3-b567-4d15-969d-170647df368a',
                tenantCode: 't1ag6904c8wrrbkpvs9c3b22tt7gg9tpd8ozvh2jm8aubminkp',
                version: '2',
                name: 'y',
                environment: 't',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 12:35:19',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                tenantCode: 'md3rbkjwfuadpg9f5v886shpd8avu6s3pc8tmmqvhkzpzrn7sa',
                version: '9',
                name: '9',
                environment: 'l',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 18:02:54',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '237d2072-de65-46be-ac8e-6c2e879b2c9d'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/ab83496d-6894-40e9-b9ba-0e379c698e62')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/237d2072-de65-46be-ac8e-6c2e879b2c9d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '49b64260-f725-4df5-afdc-d9471a166b98',
                        tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                        tenantCode: '1wzylvsxsmid1mbn3l0vrgvc6tfxa5wd9vxjat8zyf2bkbobfo',
                        version: 'w',
                        name: 'q',
                        environment: 'x',
                        technology: 'SAPPI',
                        isActive: true,
                        cancelledAt: '2020-10-07 00:36:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', '49b64260-f725-4df5-afdc-d9471a166b98');
            });
    });

    test(`/GraphQL cciPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateSystems (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '1f21a531-0deb-4b2d-b13d-c9a94ab60393'
                        }
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

    test(`/GraphQL cciFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '237d2072-de65-46be-ac8e-6c2e879b2c9d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('237d2072-de65-46be-ac8e-6c2e879b2c9d');
            });
    });

    test(`/GraphQL cciFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '75577e56-511e-4a75-842d-40b6fa5df77f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '237d2072-de65-46be-ac8e-6c2e879b2c9d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('237d2072-de65-46be-ac8e-6c2e879b2c9d');
            });
    });

    test(`/GraphQL cciGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetSystems (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b80a2a5f-dad0-4c02-baa1-af97aaef2015',
                        tenantId: '7039ad2a-6d2c-453a-b793-ee77a39a833d',
                        tenantCode: 'ex9sl2jzp8skbzjurl0gbb6quztaia217cegpcxntry6q498ge',
                        version: '5',
                        name: 't',
                        environment: 'e',
                        technology: 'WSO2',
                        isActive: true,
                        cancelledAt: '2020-10-07 20:33:02',
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

    test(`/GraphQL cciUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '237d2072-de65-46be-ac8e-6c2e879b2c9d',
                        tenantId: '6fc49df0-1546-4676-a2e7-e3e7f1aa1164',
                        tenantCode: 'droyw7ck05mlqu1y6q77rtpqmnra1io3js8teaf5wlkfeyxujy',
                        version: 'p',
                        name: '8',
                        environment: 'r',
                        technology: 'WSO2',
                        isActive: false,
                        cancelledAt: '2020-10-07 03:18:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('237d2072-de65-46be-ac8e-6c2e879b2c9d');
            });
    });

    test(`/GraphQL cciDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fb88e2e1-3016-46f6-9c26-5f65c3e46f59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '237d2072-de65-46be-ac8e-6c2e879b2c9d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('237d2072-de65-46be-ac8e-6c2e879b2c9d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});