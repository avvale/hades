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

const importForeignModules = [
    IamModule
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
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'k2073imam18nkhzyb42r7dfdh7vrfr9i1umgco5rupw5e92a1l',
                version: 'm',
                name: 'y',
                environment: 'z',
                technology: 'B_2_B',
                isActive: false,
                cancelledAt: '2020-10-21 00:25:52',
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
                
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '15jpprse2lef1vx14wl1b8mfpai5dlx9344mbqcvqogluwuj9a',
                version: 'g',
                name: '1',
                environment: '3',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-21 00:54:26',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: null,
                tenantCode: 'dy62o8gyo74sjpze8jj83wfef0uaopntsnyanq5psjg3nom5h8',
                version: 'f',
                name: '4',
                environment: 'f',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-10-20 21:19:31',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                
                tenantCode: '64a2ds4sr5b9kofb1japrbdz8sad38jqpfmb2x6glptiayk2yr',
                version: '8',
                name: 'm',
                environment: 'y',
                technology: 'WSO_2',
                isActive: true,
                cancelledAt: '2020-10-20 21:59:41',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: null,
                version: '3',
                name: '3',
                environment: 'e',
                technology: 'WSO_2',
                isActive: false,
                cancelledAt: '2020-10-20 14:42:23',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                
                version: 'z',
                name: 'z',
                environment: '0',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-21 04:57:57',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '6tcd6f2hkwxujsp5mi075avnaj4arhf7rb82d2xcvg6xxopi3r',
                version: null,
                name: '9',
                environment: 'p',
                technology: 'WSO_2',
                isActive: true,
                cancelledAt: '2020-10-20 23:09:16',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'z43re4lqkh50g59e8l58kastwv8xpzxoezja4e7tvag1rikd09',
                
                name: 'y',
                environment: 'z',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-10-21 11:01:39',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '91gt2qevnhj07iguu1cyfv0w0bvt85g6t2ljnlcgmga74mn4yu',
                version: 'c',
                name: null,
                environment: '3',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-21 13:05:02',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'ziucyntkkk4fmxqvurxtpop9dyjv9odgw5p1bgrryrihph88nq',
                version: 'q',
                
                environment: 'f',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-20 18:23:17',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '6ana2qx7h2qfxl2knslji043tm5jilsnd9jo2o249weae06nxo',
                version: 'j',
                name: 'a',
                environment: null,
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-21 01:50:36',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'wtgpqis7t4tvdeuizmv7gj4mn80h7ch5oxyo390ovg69bdjmtv',
                version: 'q',
                name: 'x',
                
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-10-21 13:09:20',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'i7siuipxnmw9bajfx0554a1a104nwl75lvb4fzv5fdak16j0zp',
                version: 'u',
                name: 'g',
                environment: '1',
                technology: null,
                isActive: false,
                cancelledAt: '2020-10-20 15:25:11',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '0ktkq3cb12ofbv26ocfpm1fv98n0zt7s9vo988m4j3drx2y2ha',
                version: '5',
                name: '2',
                environment: 'e',
                
                isActive: true,
                cancelledAt: '2020-10-21 08:51:03',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '96vqgtza7uc36wt1r41faguiopd1vwi02vvrblpfa82tsziji9',
                version: '7',
                name: '5',
                environment: 'k',
                technology: 'MULESOFT',
                isActive: null,
                cancelledAt: '2020-10-20 17:08:32',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '2pk6b75gbn7tlunxyvsru11rql3iu067pf3tm7lnh9rma91ksz',
                version: 'n',
                name: 'q',
                environment: 'a',
                technology: 'MULESOFT',
                
                cancelledAt: '2020-10-20 19:53:19',
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
                id: 't7txqz96yr9pc5gmt05ynkkwgc0hlzno6f4s9',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '8rv99ovzk0tyi6v21tbdnpob56vqrhxzho7wwzl0q0azs31ty1',
                version: 'j',
                name: '5',
                environment: 'z',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-10-20 19:39:38',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: 'uv61xm9zwrojuemuvo5za4i734izkq7dopczp',
                tenantCode: 'uwrr738p2qcqkapk9zx6cejdk8si9jxn8iq9nlvl266np74dzo',
                version: 'g',
                name: 'd',
                environment: 'f',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-21 03:06:06',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '8ltqr2qvyb7qqr1ow3h7x2nki95yefmx6sh40jtibdtpd4a8564',
                version: 'm',
                name: 's',
                environment: 'g',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-10-21 05:25:58',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '0a1dckgtqvem7qbftyy6k7qmp0kssoz04sjowb4ah6kvvfyz8r',
                version: '9',
                name: 'r',
                environment: 'e',
                technology: 'SAPSCI',
                isActive: 'true',
                cancelledAt: '2020-10-21 01:17:11',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: '6v2s079a43dx0k9il3oy7alig2jihychjt8grwg56uluiolc85',
                version: 't',
                name: 'b',
                environment: 'j',
                technology: 'XXXX',
                isActive: false,
                cancelledAt: '2020-10-21 05:35:34',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'htoput6len30uuofge6x5d5qnw5fuzr3wyff8ndv8veg4z785d',
                version: 'd',
                name: 'u',
                environment: 'f',
                technology: 'SAPSCI',
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
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'se3w584uzxuz5omcr8yczf2zeuzwfxoh8g7c6sz3stwx9deefe',
                version: '3',
                name: 'g',
                environment: 'h',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-10-21 04:09:19',
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
                        id: 'fae02651-b546-426f-b6d3-dd2770e74869'
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
                        id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/98f996e2-68a5-4176-81bd-b1e6d8409244')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/bf51ae93-0b0b-4a7e-bf77-d6929af768b8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'));
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
                
                id: 'c5baa1ed-ebf4-447b-a411-1228e494559e',
                tenantId: '96d38343-c204-41f2-bd63-ce3397805061',
                tenantCode: 'u3acdnomo2i28mtdo4mlsvmzmctlmu7e47m8fdliydj5gpdv7t',
                version: '6',
                name: '1',
                environment: 'e',
                technology: 'WSO_2',
                isActive: false,
                cancelledAt: '2020-10-21 02:52:03',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                tenantCode: 'qj2i5mpro0p9fc6g7rkxn5jyb634ovmpx4m1ye0my0kwqoswcv',
                version: 'h',
                name: 'k',
                environment: 'q',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-10-20 19:59:13',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/e5dcd38a-03bd-4055-aafb-2ea718c33cab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/system/bf51ae93-0b0b-4a7e-bf77-d6929af768b8')
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
                        id: 'f2ef5b98-c6cd-43ef-b37b-b1514b028b0c',
                        tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                        tenantCode: 'j4uee3lpvvxz1gotrify230kgn5c9j6pzg81junrc6567im5fa',
                        version: 'h',
                        name: 'z',
                        environment: 'q',
                        technology: 'B_2_B',
                        isActive: true,
                        cancelledAt: '2020-10-20 15:20:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', 'f2ef5b98-c6cd-43ef-b37b-b1514b028b0c');
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
                            id: '95e6c907-6acd-48ab-8ddd-6b9fcc090fca'
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
                            id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('bf51ae93-0b0b-4a7e-bf77-d6929af768b8');
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
                    id: '61ecc3ca-0c2e-4f86-b31c-080195741325'
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
                    id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('bf51ae93-0b0b-4a7e-bf77-d6929af768b8');
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
                        
                        id: 'ac37cfcd-476b-4a8c-a033-332f68ac8b16',
                        tenantId: 'd5bc0009-932a-408f-8904-afeed3a3ee79',
                        tenantCode: 'cait8tq44avvzut8p50k1ycdrunh887qbxajj1eamshbfngfma',
                        version: 't',
                        name: 'e',
                        environment: 'x',
                        technology: 'SAPPI',
                        isActive: true,
                        cancelledAt: '2020-10-21 04:46:45',
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
                        
                        id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8',
                        tenantId: '8e7f99e1-ed68-4e16-ae7e-6bea5cf3e85f',
                        tenantCode: 'z5pj59a58ec5ywok2mio3lexpq1bukze2gcb6s07jenxfl279o',
                        version: '1',
                        name: 'j',
                        environment: 'q',
                        technology: 'B_2_B',
                        isActive: false,
                        cancelledAt: '2020-10-21 04:11:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('bf51ae93-0b0b-4a7e-bf77-d6929af768b8');
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
                    id: '1be4503f-f46a-4f46-a4a0-1539fdab90aa'
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
                    id: 'bf51ae93-0b0b-4a7e-bf77-d6929af768b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('bf51ae93-0b0b-4a7e-bf77-d6929af768b8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});