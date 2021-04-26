import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: MockAccountRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                type: 'USER',
                email: '91uflof1dch5ko2zqloigbrrtp3setqbnu1g7apnm23bz75p795yw13etyjtbtoyhzbt5p7uxdu4yqlud6e8xxsnlowomd3pk1p5vhvsewh3jka6ypcclq2c',
                isActive: true,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: null,
                email: 'sq66h1pq61sjxz2dijxygfr3skwnnxy2itsv7kuvehsv1bp2joq13jla2t6xqmhvvmwv72hzaoomc0w3ckxwxht1qg8g3cehijntie2gh68qaaxa6ngdttog',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'srx7pfkt3x1ucjmxbr19o7w30dtjerf4zvdf3xhqfzvk8qf6hg4u4yypqcff2955rszqa7pyvvore99h1dp31k6n76a4ojzrj0znylogkp3rpse61isjlym7',
                isActive: null,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: 'gh7ylnzfd1yz3le2wuisztko2lzafr3y5ipzr8cgz1o8slc4uq967jmleoknc2i5i3zcqkyev6jkx6tua48aax7r32b0yo85i10ad0e8y5104xjg00n3axsr',
                isActive: true,
                clientId: null,
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'j7j0zbe1pgledutg5p72cbdhqvo8gkgx6ybppg80q2q4a892lbsnj7g5fruknr7ytwbh3zrtmgahapw1906vckua775k3mhpudg74c6ayeuzdz144od40hn2',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: null,
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: '33zlkgmwsdxqx020fkle6f0295ewfe3lms516cdh2wvthwzsnjusv1fjvf7vpbtueybwkq30tqe40upiqs4waw5xqv66txe95vlo15b7le8haat0y5bpouyc',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: null,
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: 'ueaenk3iw072ohgw7zdl04ttxbpwd5tvgyqxrqftenlj5kehqrvp6qqm0snnid710krewuh3jvcbwoueho0lwkwmsszrwdw33blwbw2eczyx7ywrz5ori5em',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: null,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                type: 'USER',
                email: 'wgej96ldjwmdhvdjdb5yf754fkbnap7ifasuxw4c4lonze34k9ef8cbp2o9tui0d9dhmpjuvxn2iazx24b8o0oq81g5fe1m38hyrzy3hngx8b7nocnfhk1c9',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                email: 'ff948bxy3lyw8qwhvjii03b5cwidify7vqrpcoxytir9asg9oqvlanhck95yu74n12mumb7uqkkxxfnjy7qot788u2h4wcyhhy7iwej9cwmj3o3bosxecu7t',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: '7ofqtahg80sg0oasl8o7uhrzfky6ehu299xofylrqiqrt3iow3jqymn2ygfj5a7uvzit0vd5iw1ppzmsi8kvm7j8xxte4jrb4pd7kul8v0bmjfz6zahxmg2m',
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: 'bfco2r670jn9ybld14rxo9qb2lixnzpvv6016ce3u8k4kwm66kmqsx2g4t5bzvmhsiio35kcsxwzbjnx4hgfl5tyvbkfdfp4szp2m9bkei20mn0rha12c3pc',
                isActive: true,
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 't7uxgs1p9xkf5xiwrv1n7lptb6i6z1bd0dm0w75g6e6byignucvid4jv2hz21xg92vlb3b3uy1ash1hyxjvxw62zexbpfnayzg2m5mgmgjgprev43goeb40a',
                isActive: true,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: 'ys66cmedsdj54s3xgpiw0b8y4ml57pci2ef51flg1fs3xvnm4me8542in2blko69kol58swsgk96gq8epjopqmc6p6gerqlxp3ijkvjmh4046re1gvzxhm4m',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'ljm7g6s930gsk90u0yoyolixym03govmq26ffs16a0tvabg4lz961zx9anzrkit9qhlfn3u749nja11wfp2yfzyjtd6pwtmunmwocuzkebmizosfde9bun2f',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e8ebsbdwxrax36jyb02co4d3yqfb3bdkh7v0a',
                type: 'USER',
                email: 'nhbxqd1njbth1zimob9pbt1leyin6nr4th954tvfqtrdzng6n9v35x5fxixu2b3x0j98tf0fi3qli1agr4tk4926dy8iol8wi9satkn1ycypidna8missajg',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'zbf8yduyt2yhnl2v7c3rzr1x8hscl7pfmj61oa11pq3823p4sebc9p8wytv9l8qf1gc5h59hdhhycaksk4nmik5jy4f4anmgciihvfa1fkfpwxxgtjg76tus',
                isActive: true,
                clientId: 'v7lgsgp97px76738lwzz4706knj3gm8x3btej',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'c8et2187vtppj054j2f9fszfwf56edeujvqusb84krcw3iwbh2o2fqnb9oxmne9yhqz6y1mudjjo1ucq7wo3lip45ae0oxaq9svfde4h848dhjfz8ey1mnkqn',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'dxbgqfd7a6ke12a2qajxdm8zxcpkhfkcts4mxjpk741j0n3g112qrr1p302iz09g9565ouctyuldad492uni6k40r4okoiznj1tg6x0iljz45sawyeczamv3',
                isActive: 'true',
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, Type has to be a enum option of USER, SERVICE`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'XXXX',
                email: 'km64fhxtmsjmuyk5xp8oq13e3l56kqtf7kfr3bp2609v0rspyddgiaa6e49wf3z9ruyett75dgv5oyck42c8ipzsrg2v6xaqu63o432qohtw1fu3bkxpncpi',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for Type has to be any of this options: USER, SERVICE');
            });
    });

    test(`/REST:POST iam/account`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'SERVICE',
                email: 'y82n98bhcv6qsz2tf531bwjpvgj9nv9vub2ow9ahy01loi9a8ap4sy2bwijfyi6dquywqu5clogy0w9boli5peerbse4zbrgdowczrzn7tb5gprcx6z034yq',
                isActive: true,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/REST:GET iam/account - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e22f39ff-f898-475f-8310-28a55078e3da'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/4b7f1c45-f5b4-4270-8168-00a34b1af92f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'));
    });

    test(`/REST:GET iam/accounts`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'eb52ce93-5c1f-4545-b360-435266f00860',
                type: 'USER',
                email: 'p69fx53tzdbzdk2fg5xp326rl3b03bw57q3x83h2ocg7gszpvrsr4svy3lxy01q4c3gyg0tg0dxsj84v07t136colvq8cqfatxyvlnpvsihytqi43mviyblp',
                isActive: true,
                clientId: '18429ee9-e44d-4b57-965b-a7daff0c61a6',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                type: 'USER',
                email: '2t2hl2tcsfwrylj9ncwmngszbaurvyqmaisyc35mxyae4fx7oa9mpfy6y6lp7nkpx75549j8mqr7vb2yb2tvsfwalvu89gh24dlt2qxtxw973s32lq5mxhyw',
                isActive: false,
                clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                data: { &quot;foo&quot; : &quot;bar&quot; },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/55d291e7-d819-48ed-b26a-6466baba75ed')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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

    test(`/GraphQL iamCreateAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4e5b429e-21af-409c-87f0-fa598940e5f7',
                        type: 'USER',
                        email: '0yc7kbepnmswetuqjp759qfpe9ml8sqyl0dm36eilpwg6s925qhhgv73fkvgnak4pc9yz86732ri3dky79d08pmgzp1okwxo4fmz0awq3ffpaa12i4tqk59s',
                        isActive: true,
                        clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                        dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                        dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                        dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '4e5b429e-21af-409c-87f0-fa598940e5f7');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: '5b212354-8ac1-4aff-a1c3-91a317e49595'
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

    test(`/GraphQL iamFindAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7aee6fca-9435-45d5-9fe3-e972fd8f31f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b');
            });
    });

    test(`/GraphQL iamGetAccounts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b5d5ce58-1197-4c94-9f7e-e9e303839c42',
                        type: 'USER',
                        email: 'h1nr9nqjl60loxptpld6gsny0sqshlxm4jd1hzwe5z1tium27750awycj8h48bw3o9q0wm2qicq758s7z6zkhyv3ndyl0p4b4fotdrti9kdckj4uth8alr7u',
                        isActive: false,
                        clientId: '96b19c1e-021e-49a0-a5b2-b451a605ad18',
                        dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                        dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                        dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b',
                        type: 'USER',
                        email: '30sbmke9t6b0xgcrerwzrqfzxogd7a3hoezd4c6cophbra1q3geqt2jcx5slx7ykfa4nw5tn03ea7iq7iv5ujfkzymq4ji4l0qryhllvfs0mlwolfifhhfrt',
                        isActive: false,
                        clientId: '7651bb44-bc6a-4127-a5b5-cbe9677f8f56',
                        dApplicationCodes: { &quot;foo&quot; : &quot;bar&quot; },
                        dPermissions: { &quot;foo&quot; : &quot;bar&quot; },
                        dTenants: { &quot;foo&quot; : &quot;bar&quot; },
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f0d7dd96-de0a-447f-9619-c6897911f456'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('f5002b16-83f1-4d5a-8ae1-1ed5cf9ee77b');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});