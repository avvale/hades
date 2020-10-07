import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
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
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'n047ztfh96o0j3ktq16oe6tkuh4j6b7qv1h56k98dbwugpts24',
                version: 'd',
                name: 'x',
                environment: 'b',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-07 17:38:41',
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
                
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'fv42olwsx6budonc04teutjtykxxb6n7nz1tbp6x7wk3i88otd',
                version: 'e',
                name: 'i',
                environment: 'w',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 00:26:37',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: null,
                tenantCode: 'sxib4qt7kex5u5pmfgnmw5zy7opxpfrlou0fm5frhlzf67ot8z',
                version: 'j',
                name: 'c',
                environment: '9',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-07 07:14:52',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                
                tenantCode: 'xa4jm8qtdesbu7tbkppesuulp9grc7kmu1helc1q5bfzdg1qc9',
                version: '2',
                name: 'b',
                environment: 'f',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-07 03:25:35',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: null,
                version: 'z',
                name: '4',
                environment: 'm',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-07 16:56:51',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                
                version: 'g',
                name: 'y',
                environment: '8',
                technology: 'B_2_B',
                isActive: true,
                cancelledAt: '2020-10-07 21:29:49',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: '129z27olmpqmsijbakkko97mkemvh2oo0cg2o6xu5tb1gcy4vc',
                version: null,
                name: 'u',
                environment: 'q',
                technology: 'B_2_B',
                isActive: true,
                cancelledAt: '2020-10-07 08:23:36',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'vp9sud71n8uh8ep9v0tffseqg11dh9cku8dxl8l1zchbwjc65g',
                
                name: 'r',
                environment: 'w',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-10-07 10:33:02',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'bh4srv2mmlw9j3it6h1k6h280hn6phbbiq1brgkvhamgifo7xr',
                version: '6',
                name: null,
                environment: 'p',
                technology: 'WSO_2',
                isActive: true,
                cancelledAt: '2020-10-07 17:53:09',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'vmk2skzrb4jlv7g2x2iy1k4n33n58612onzqd5l4izz1ljf1gz',
                version: 'w',
                
                environment: '8',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-10-07 03:07:26',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'qjmnhb3a5uiy8lfpvgl61ngmfq7hd0uqpgc9n5rgcimwsmxlg0',
                version: 'z',
                name: 'm',
                environment: null,
                technology: 'B_2_B',
                isActive: false,
                cancelledAt: '2020-10-07 04:27:49',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'b3idj71j2up0a80fc8kuynngksd2fx9p6bxsqqm1ujn6p4if5l',
                version: 'l',
                name: 'u',
                
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-10-06 22:42:35',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: '3bes69ju56fqbrekrl2f9hkqw21qqz2ddrxcytfdf1mo9nalfd',
                version: '7',
                name: '7',
                environment: 'n',
                technology: null,
                isActive: false,
                cancelledAt: '2020-10-07 03:15:21',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'zvp3ivf8368bpqhccz4eyvy1c31b6xodvncnwix763r8yqpje9',
                version: 'f',
                name: '8',
                environment: '3',
                
                isActive: false,
                cancelledAt: '2020-10-07 00:22:54',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'zm3ob3445gb5dlv51tn5ew0b3gh9ryfvcdcvoy5ii03rbai2n2',
                version: '2',
                name: 'l',
                environment: 'c',
                technology: 'B_2_B',
                isActive: null,
                cancelledAt: '2020-10-07 06:26:51',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'tcsfjdvpgpmqzkrxpqg01y7krxacf1hc7z8ms5vnsygyz67ni9',
                version: '2',
                name: 'l',
                environment: 'r',
                technology: 'B_2_B',
                
                cancelledAt: '2020-10-07 16:50:46',
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
                id: 'heevgkxgv1ww7ct637kjjs8b8faiot4kbqwtq',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'agalpnfxkj3thrqata2y0db4tqk7fcubyl2x3uofnczu9lp672',
                version: 'l',
                name: 'h',
                environment: '0',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-07 08:13:52',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: 'nnoz7ee7vampulmxvk3gk5wpfaj4bvk5reuby',
                tenantCode: '1ooq610pzg61nwcj1k7fhiaogfzw5uae14vycotwhr5iyqf3ai',
                version: 'n',
                name: 'n',
                environment: 'b',
                technology: 'B_2_B',
                isActive: true,
                cancelledAt: '2020-10-07 18:55:08',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'jxubt5muqj0m48ierlx9wn99xy9xjpghpjdie3ngx64ri2h3kef',
                version: 'b',
                name: 'f',
                environment: 'o',
                technology: 'WSO_2',
                isActive: true,
                cancelledAt: '2020-10-07 04:33:47',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'ws4ctlnmw37tbioyyn3xuozvath55uquhhl3dvtptkduspe0zn',
                version: 't',
                name: 'q',
                environment: 'l',
                technology: 'MULESOFT',
                isActive: 'true',
                cancelledAt: '2020-10-07 09:00:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology has to be a enum option of WSO_2, SAPPI, B_2_B, MULESOFT, SAPSCI`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: '3z25qzr8vpmv9kopwjbye5l0qgco075qgfk2afflqto56u0jwx',
                version: 't',
                name: 'a',
                environment: 'v',
                technology: 'XXXX',
                isActive: false,
                cancelledAt: '2020-10-07 16:12:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology has to be any of this options: WSO_2, SAPPI, B_2_B, MULESOFT, SAPSCI');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: '2r2k7cpvnp1bsloifrsnii778z1vkqen34ab0292chxu8zd143',
                version: 'u',
                name: '1',
                environment: 'f',
                technology: 'WSO_2',
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
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 's3uopjr2mhdog7u293qyry796bs0472lfpl5qzsurz4yrl47bt',
                version: '6',
                name: 'i',
                environment: 'e',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-10-07 05:00:59',
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
                        id: 'e79f5423-34c1-4e18-986b-c2a9816933a1'
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
                        id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/1ba30975-c38c-4cc8-a12b-f053b65ca680')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'));
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
                
                id: 'f732880c-7bc9-4818-807c-bc276e7a2089',
                tenantId: 'c9d6d032-376c-4925-949c-3066d4d502eb',
                tenantCode: 'dc73qfuq10kqivw713k1sx84291lbbpjb0cini8vi12d8faun5',
                version: 'e',
                name: '4',
                environment: 'r',
                technology: 'WSO_2',
                isActive: true,
                cancelledAt: '2020-10-07 15:13:06',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                tenantCode: 'hmpbhmy1pa520gzn4rq3t5kdgxrdbhnvgyqwj1x07mi92itwsx',
                version: '8',
                name: 'c',
                environment: 'a',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-06 21:55:07',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/529f4b03-ca93-442f-8f28-c62d44e6f7a2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf')
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
                        id: 'f887b57c-adf9-4d5b-87a1-1837afefc368',
                        tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                        tenantCode: 'qj7u9o5gngjd5r9k35vd0glaic3vlaraghhr0kr5m4yibb8rzx',
                        version: 'i',
                        name: 'j',
                        environment: '7',
                        technology: 'WSO_2',
                        isActive: true,
                        cancelledAt: '2020-10-07 13:25:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', 'f887b57c-adf9-4d5b-87a1-1837afefc368');
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
                            id: '570a69f2-c6d5-417c-a71b-26dcd121d87c'
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
                            id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf');
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
                    id: 'f0225098-98b0-4da9-9702-32377e3d5cf4'
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
                    id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf');
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
                        
                        id: 'c91e6a9d-8388-4a17-9e90-638149d80aaa',
                        tenantId: '4472f9ff-9619-4d14-b1d6-cc2940e61ccf',
                        tenantCode: 'p6y3icj5ofrd6yy4b4uv5mi9ei5wzxgi7r85rylxqyqp4x4o3m',
                        version: 'z',
                        name: 'r',
                        environment: 't',
                        technology: 'WSO_2',
                        isActive: true,
                        cancelledAt: '2020-10-07 00:37:36',
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
                        
                        id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf',
                        tenantId: '178616d5-3730-44e7-b381-c318a0f8741c',
                        tenantCode: 'ou79j1hotor4pz2i61o8lo5zgr0owytqvjjuilxm35x2hyve02',
                        version: 'r',
                        name: 'p',
                        environment: 'r',
                        technology: 'SAPPI',
                        isActive: false,
                        cancelledAt: '2020-10-06 22:45:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf');
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
                    id: '8320a6e7-f796-4fc9-9445-3c6188a13f9c'
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
                    id: 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});