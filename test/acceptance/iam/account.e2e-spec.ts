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
                type: 'SERVICE',
                email: 'eynpf6t82qdkm0ybexprp7wxefnipbtoz2g3s0cf7co22k3zcwctf874w3v06mdfpg92mzq3clpvmvokhvn6yeoambodkzf8kw5cdw7mh396wuw2uq7zfcxv',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: null,
                email: '2p2rcfho6ni0pqgspnyv6co7eoigcc5tw77p9jcl0uam0n3ftejqu4u1txkwxrg0pspykorumz64mqjlwnjd31rrme4scszph18p3c8d9ma06oq07jeo9f9t',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: 'uhq0bq1mkfc1b950rnajmxuq0d9159s07opk8lph48ig0oxanjhs7el2oyju2on35m2yrzy0sbqjlfxo35v6cu1a8ucriwsxkj8ixvlrlrh7kd7h9qbxdx9m',
                isActive: null,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: 'cenm0aawq1llzcak1kkc6y6orhksvyz7zh0r1jo0reba1wgjtre5g7yny69hkc3rtosicljbv9rf06zx7ou9duvs4rm49kkettsd8lh5dem18zsoh1kz3unp',
                isActive: true,
                clientId: null,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: '01emxcl8uci4emneovqttjx588y4i073fgnti36b7zbz22jp1xgszu0rhirdihu0d13yqfnsnx88y2459fw70uir9v0u8d0vp2hc7lmqd3jkker7o54ox69w',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: null,
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: 'lwtdc0lms5ckpfxlrg48zby4l4ikb4xuejdd3e4138t1e5kwsayvu5a2wbzcc3wxklu2nswataza5wn4xalzt2wsqcqlvppxhy4t4clewfns6fkltkhm5g0b',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: null,
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: '14gozqitzlle1k8jalal6vo5muc3pi5z7dfieaiga8jau58a8fkuie49xutpmnacs1jliwazzeriqjqa1biat2eujsdg20cwst8i5symxxleurjxznvha44v',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: null,
                data: { "foo" : "bar" },
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
                type: 'SERVICE',
                email: 'bd2orarq4ho4idc6jj7tl6juo86msojmd2tx59mpoiyiz2j2lufe6goyc4o3w83yhmd5g4354j5s686cmns5ri1fa7r7s3bsef51lpbeid1k1clqmhkifacs',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                email: 'idvhi53usv9freujiqryil9d0h1oz2s29f8rf1m6nu3pz23y2b60qdshyh39un3ksw601dpax473z02gyepu0493pwzgzd2o02xddl8z5eo1ltc1oqj8zzfg',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: '79057xe8wiwps1wprjm38nz7g4xkevm82xprp9wdf2daluta9fvpo1vlc4z57yjzt7ubmdx79abmthezy2h9pczzd9x5okbefv0h4bs4to76dqiisks4aabf',
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: 'rtrtk8ek8i49xdyjhhh3eezy15u4253ipmn1sc188ynqm7pnjsrzzyqnjdqtxluyn66k7psyieh857rco4oixi4yzaysqmaowdqrfdzog21qf47d9yuulrs7',
                isActive: true,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: '6ogfk87juwkfj2gn0xl5w0102llmndvfwaxohzuygd8ddvff4j9tijsbag61rjrlfbee5e0knkml681l5yh89awbt2yzy7y0ecmtzwa73b36ip37cydaikzc',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: 'nm34syezo5ix9mu6ie3kaoxard87kigy3hlpnxuuqwjvf9ovvqty47dcnmplhs07rwu224j8qgcmeu8ihbn1nrff34d00ev2369tho6kcyks10l5vh7a54rk',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: '4kcxkx2378mixx7tuowz6mspbnz8wlaw22i3tpe4rcz659e7d49wkue81q4euhhjsduznnbrcusq01qbc2umx09382co559ln6kww25kmgqn43nohlfolzsm',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: '3ohwgnnmsjeermhfe0ev6cyn75oytvmf12gak',
                type: 'SERVICE',
                email: 'i4j1j9oyc71ibubkjerjo6bt7mhcs1oaazk6xidgogg4k2m6d0y1awghlz5c3ywl0ur01i23kc9qwcu15m9p9t78xrkbso4kntb241z09hypjdsyyfiwc678',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: 'jjjj1otxtdj4hmr1hzeesswfesw8bgxc3rszcogrsnorlzvca10zniza3w23owjefd3mbgz2lz70yg50tebgtrqu55drhov5t8db4o8q87tmj9zl79cleyiz',
                isActive: false,
                clientId: '4pv6cr68pt4blsthtwgv4v499pxqoc1zgfp65',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: '1y5nz4yoimehxdswv1rdctjjtsfdpioafh94asv5hbbrue0d7hrpdqrmnt0nkjsqk4oolipeujo9kg7a5iyph48noto3naib3yrskj5i7mc16npcerx50l5zm',
                isActive: false,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'SERVICE',
                email: 's8e0nk5m9ctyyo60m9klo9vq3dqelzow4ktb3bmbur3lxh99e06hj47a4ikox57avm2zftmd293on2299ugiyx4c1uta77frvueinl8x87zq4j9dc1qo3r1k',
                isActive: 'true',
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'XXXX',
                email: '9qy47kcw3f9ees7etx3k6uzf655npcf33qb56z4vomi52uqaog32lyhc1httrxenns0p6vg725gjtbjad0jg5x5d9dlzxs2o4wfqanmllox0r8ltpzobqz4l',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: '7p5r0zcfcfii42mnoabh19hqd6d54kcwahcpoxyoiq0vaejpep1d9f2yedjdjilpqtg91jqu799kjxch15zi79msou76rskrybmxj509zogryvnbqiux7ttr',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                        id: 'c2a3ede1-9d68-48a9-aac8-0905e59f1993'
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
                        id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ec7bb7c5-252c-41a3-9124-840b26e21b49'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/e39db8d2-e8fa-472c-b5a4-826acd2fd025')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/ec7bb7c5-252c-41a3-9124-840b26e21b49')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ec7bb7c5-252c-41a3-9124-840b26e21b49'));
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
                id: 'cc0963bf-6dd6-4b7e-882c-d8699408d823',
                type: 'USER',
                email: '83i79ru9lwnjdjlpsn24wr8o1vk7ghnlfon8cm2z34s5seebiumexyi3t8omowe1ez1svoj4tpow42sp9r4p4r6cuizu7x8cdv7p5gktdy7ksljxe1vfm6p1',
                isActive: true,
                clientId: '36150899-8fc1-4663-b548-f81deefbd033',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
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
                id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                type: 'USER',
                email: 'uar0wxx4zt0ablczbjfgxseoa3dfrd0ta2anlgrf32f2r7auqdymjxqzzn4ugqid0ez3tv3z9qj4do7aqbxg77utw9zgwgp4ausx5a8bzgtb9c2xrvby8f2q',
                isActive: true,
                clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ec7bb7c5-252c-41a3-9124-840b26e21b49'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/97ed907c-b7d1-4e41-8b7e-7f378a13497e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/ec7bb7c5-252c-41a3-9124-840b26e21b49')
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
                        id: '7251be7b-f2c6-4fc6-9dae-cd1f8f02d294',
                        type: 'USER',
                        email: 'n82ib7u3oldozsjsdujoggvh7ix5ttrutvgujoi4xz3oam0tv1zizho5255cyzhxjtepuhyukpfr4mic4l0brmr6hy9s0rrpptnvqxjn0jgzawudtzvoe4re',
                        isActive: false,
                        clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '7251be7b-f2c6-4fc6-9dae-cd1f8f02d294');
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
                            id: '619bb5ab-1449-41c3-a99d-01f6c37b1e91'
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
                            id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('ec7bb7c5-252c-41a3-9124-840b26e21b49');
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
                    id: '2fedd102-079e-4d96-ba94-e5fd12c79866'
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
                    id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('ec7bb7c5-252c-41a3-9124-840b26e21b49');
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
                        id: 'd2420c4a-9009-426b-9324-7a4caee966d7',
                        type: 'USER',
                        email: 'rr6i6zs79eo1jnxqp3h0kjnvk4zdh9hg0g2d1vldrligy65ba3njwt90joovxykplq94i2hd4gfirjtle4hyrnhsa4cxenpgcyzoh8o1p6h0isif3uytgkq0',
                        isActive: true,
                        clientId: '3fb97b15-78e8-421e-82fe-290787cbced6',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
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
                        id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49',
                        type: 'SERVICE',
                        email: '8j43kztae3ev6kdfknrenkyp84u50mfd39vfn0xn8ujagsbt6f16kjjlvp0legu5zx0x0v2j3kz69dh5x6mw7k60cw7aedhqk9yd4zgmrt05uginq1otauxk',
                        isActive: true,
                        clientId: '1c3f6c0e-318c-4124-af48-be1463c73099',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('ec7bb7c5-252c-41a3-9124-840b26e21b49');
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
                    id: '2664f4c1-e884-4a2f-b774-5a233537ce30'
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
                    id: 'ec7bb7c5-252c-41a3-9124-840b26e21b49'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('ec7bb7c5-252c-41a3-9124-840b26e21b49');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});