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
                email: 'zhavnmwl08qsjp42wxcb5zno6k2gs5venmkiogfmkqonpp17igvmtbmzekp7b72oyxck36i4acteqgxgdfjmd0e3m7cwmhdwroak0fqx89nytq9slg7jpn14',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: null,
                email: 'v6yamqaroe9a8q7vtoyclmaaiw75j3afden1uc0hrhcmuholcc7ootal2euljx9jwi61zz8qpfihcnrgei9c8l3legki0tzp88sk70magcp900vn3stv59tr',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: null,
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: '63ypxdt4t9qapp4orwqcqmvkoulglnkjlvzy3tx9hfm9pm082732ue0fkb2rhqkun2i8p9xdx4ainht201iqz2zgw442jt8ag196dl19zeklfsnriyudtk2m',
                isActive: null,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 'cbos512oj7fpldrddpw7y1o56uj6pmvstqcotqkmq7ezf3zbc3hy87phyx2sy2b85b4urwl60bd6nzbrhmnhczm2uodlxci5t92r2l01isgu9lvqc1jfwl6n',
                isActive: false,
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'maryxh4wfdxr98n98qjkrak1yr21ppyd0qklyazih212rp8y3j9vkvm5jrtq4n2g4b57kitq6jsb52nlb6du27oer7x1bhi36a61mmf5k9w7z5qbt260nn1o',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'fyfpry75406ep15szlairf4zjedvc6r5si90aeouff6j3es0y847tpvwlwfthgmduafw0wutsl0hz06f92mn0vm9rdvhux0eg0jn4jhvnzvsixo6hiczt0bw',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 'g8mejd6vzq4k22eaaub4617zmpj3vo99r5c5fur2kx3v7xhqc2jz6sltga8t0w4t8z8bulfn7sbh801uwtl007z4a0vkwocow6fh97gesrilfq8mzhpupvtl',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                type: 'USER',
                email: 'kbos9w9n57gcrfsdz10md57z2t92xwlytipn6p3e8p8klsbxfcz3mip6ng5cds8uotqdj5iutoycmpuc6v9yz3yin6y3sr41u9li66gunm36sotw6nrv28pl',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                email: 'pmzwg83pks7wbv2rjdvindgidfu7i2tsalyfj1tv98qv20mp4avd96ww3k0nlhmkux6jxzd4s17dm9ext4kofe7io3svor9ki93znnlkg6sx1199cb05asvm',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'cbf0affxtdkcfkg4nv9l8q3r6m962v1xpkl9r9hfjag212mmhmbp03vonirwb9ey4yrooogoj1ok5sdakkzclg0vho4g39vrodg8552gjmpzo2f5389uzd5b',
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'eiuvmq56t5i5o50ua1hci8tau0wa71q8sfmxhztw0m113bnfq449zim6nhqnj5rvuk6bfnlo16oyegbeh9tyvjc7rf5j4m0zh9irnkht59aqe48l7srakw9h',
                isActive: false,
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'm5qwn6syydbjyghdd6zewhpwnlfgoab78075d9eosqm3gf3vc3shticjzcxmvspkipiwg0yk15hs17pb6x1uqqobhg4jyv7u0yjh6zwkuytui5ms8l4ncoij',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'z8n9ylx2dzmh5n88at89iwc2an7llik718w20ig2z6dh3ajic6gytssfiu22mi37vkcgj6cggiegpcxobxfp6one5l6d6mikpnwvky29pxm930zhftubqxjn',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 'by3bml1bqbh3eo9p4rp3cs4kw5ybv9weurvfgqrp9012wkbeevi4qekqo7i152wwc2xvlwzi99chs4ctakp0awy0w3hgetjqfi207sl1rjozk487s8yw0h0h',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'jb56r9w7osr3snnognv0jxfp6gkk8gbrrew80',
                type: 'USER',
                email: '12ts7j58s0do8qirazotvm9n88njaxukwya8tslhqtfbv7aogex66npfz89nziwv2x3gq5c90gonmccp4tkut0ol64itrldgafx8fed49e4gmrexx2tuzvgl',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 'ti9if29d3a0s2kewqb6g6wj10uyo8ff8g6pcrzm4hrjjgs2hhvvggk8jv9pi2isvjy0xhkil7imtema8e7l70gn3x6taqc8q4s6qjmizlpn28baxa5ob15gi',
                isActive: false,
                clientId: 'tefnbtwux16e9hl4rme074tev1zk9li1jhafp',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 'h1794u8m3ym4g3mnc0wrdxz1cbpe873jf4gzhmjeat3pdqm6vzyca94kv4d9iomvwk19j5zdmlc688qy0tq86ziaeu8ndwvb5tgrzb7u8n1sek8tb2syopf8v',
                isActive: true,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'SERVICE',
                email: 't73ts4zegb92jj064mvkuwxnbkdhp545ztouco1zjvz5jk7asxu2a7711ysm60g0tqvvd9gqun4gen3gck95odb01vv2uuhurivjetnruxvvhd5edmb1akal',
                isActive: 'true',
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'XXXX',
                email: 'fk6liz3ddus8iyknlr4cnagysmzagy9joqz4rd245kyy22hr06lq70jp8ogarnd807vklweho9d795eacrnx7lvoeb61zc5llj9oseyfthf9a384uad3a2uk',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'l3j1ukfxticb4b1hr6zfosxi2qjyavqqz507oh6np64z61rpg8m1868j3w3ir2vhiu5gxkzbn8a9ddzip2qhpg52irkgxwtut3xigb1g7lbcekbq48y0qzjt',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                        id: '9c68064a-238e-44e6-906a-194cbcf9c8d4'
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
                        id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/fbc6173f-3247-493a-a8ce-05b67a265672')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/ad19d5fa-626f-4586-9a5e-42b87dffb9f5')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'));
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
                id: 'eb20c0a9-5c86-441f-b34d-a14012ad7df6',
                type: 'USER',
                email: 'xpmihzzn3m6xr0qmz10lx5l5nb25eh0xaqs14z5a3g5gv68c1m01oed7fmsaubeezgspq0sda4sxivxekglvt7ex3p4jaei6xpgyxbx58yv2aynj804nk6nv',
                isActive: true,
                clientId: '3f1ecf29-349a-4b18-a0a4-49006a13f143',
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
                id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                type: 'USER',
                email: 'wcvc1s067lna0y3fq1u6jf50w1j6groihp4qkajvxgmul8r2eyw2fbcvixyqx6m48kjy9izu2bpolf78mfukuzppfsefmcbge1ytzqpf19hh7xui88i39k15',
                isActive: false,
                clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/c5151834-2828-4a63-8d6c-7ba9c93af2ae')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/ad19d5fa-626f-4586-9a5e-42b87dffb9f5')
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
                        id: 'fced21cd-13b0-4dec-8170-43c8fd6c937b',
                        type: 'SERVICE',
                        email: 'cpv1ur3e36ynyrsl28or1anc6wmjkjx00kfro78c9yt4rbsrc99863fl1ar0pzec066f0y86n6cg63rrz4vi4w2xd0l5lgnatrptrabjguy7g2ygx1omkfgc',
                        isActive: false,
                        clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'fced21cd-13b0-4dec-8170-43c8fd6c937b');
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
                            id: '0b782d8f-7e3d-496e-9fae-828b2445b3d9'
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
                            id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('ad19d5fa-626f-4586-9a5e-42b87dffb9f5');
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
                    id: 'c5f5a19b-4728-42b9-a04c-9b59a9f9da8a'
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
                    id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('ad19d5fa-626f-4586-9a5e-42b87dffb9f5');
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
                        id: '56c97c6c-cd47-4674-930c-f33ff33880e2',
                        type: 'USER',
                        email: 'j7y55dheek0c2o4q6q99yz2ic0c4z4l6uj9bdbdcjjf7d7n15yc8165cgwpgv9o2kd98crckarbow5mke0bf0fi8kp6irjbthtslthuxpsin2bwvbt9cyqb3',
                        isActive: false,
                        clientId: 'b6c814e7-3af2-40b5-bfc6-bb9d1e9f881d',
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
                        id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5',
                        type: 'SERVICE',
                        email: '4g0hlldmq7pha18edd1z1uecctrmz48e1ec6qj9zj6w2ufnf489neqyxthmrmqusfiocgf5hi0ix1j5m0mvb4z8rtqw6k1y6ndn1uz6zs7v6f5mvlktnonh5',
                        isActive: false,
                        clientId: 'b82d4df5-c589-40df-8ece-61e75c5e0a3f',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('ad19d5fa-626f-4586-9a5e-42b87dffb9f5');
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
                    id: 'c87b9e81-f88e-49ad-b931-985a656070cf'
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
                    id: 'ad19d5fa-626f-4586-9a5e-42b87dffb9f5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('ad19d5fa-626f-4586-9a5e-42b87dffb9f5');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});