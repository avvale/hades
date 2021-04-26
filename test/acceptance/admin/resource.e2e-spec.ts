import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('resource', () =>
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'rsq5fm8316pa2tjuqh00a8nbi2zg3j6j91yjm0i9nfvlmrq71llq5txbliakyve0x9xz1yog5eq1dz108szfqgkgf5pudvnsla6pili0sh7bseyn13b0r66t4yeh0j2tvv1lgi6jkii70yquluiq26u989hm7rdiap6g4gq60gkgr0bn9h9xlxhpin1n8kv7mucppf1pizmlkaxqe474b7zniqqag5ngvce1oiwbt2rpaf0e3p2dy50orqotgne',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: '6qv6lbd5k99gubimjm2gubcxhxk9krt7kglfnq2j6n0z4r7hkpouiyt7sn36zbpbxx92fzvdznpf45jhgx30c48gmtmv1uvf616evssez0q9cylcqjcn491bxgenv287afzlxgxxshxgpg3h0dh46nc9m2nv4hx9o9cxy4jp37bnlc4zp6mb80ezyfcdyalzip8941z99dk4bvnf6pygk3jvtaibci8qf13j8wwic8odjuu5a4n9grxy2imdvoh',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'arr4894nom15uzzkof4zxswyroihgodmlc5wxcrn6j2mt88m287162gori8l8b4nss7u2ibyk8ki95bn313bzbn2oqnry2k0wyyrsg2396mybn0s3eg4jdgaqjuhr6v1hd9csn984j9s6hko18lfcun0fe3438mmwq2hcc3zjaktrlz4abgfxgo5rkv2lks3cv97kn5x3iwsvue8u01omn31qv7qqxnb3mdvdx1m62r62q2y9j01f8gphe4zc3l',
                hasCustomFields: null,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: '2h7312y4of44ey3viojvpb6bl8tertmszmfce30lvps6g2mooqyxxifftgoaqvykbmd4jmnlbch1i3j16413zcf78pdejug5q03u8s2t4wj4y5uuw66kjxjoxsfg5qspzjfmo7wt63dny9etxg1yre3jig726k00hdhey32derldd08b0xnn3adzsgsfnjby51t0d6jm8mq8lzwota4l7vbx3yky3mcg3gqcjhw17xo07obkgqezch6qok8upgy',
                hasCustomFields: true,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'xivp4xmq0i6s9kvalbc2nskmhan8nqqayx3uhto0hl3g5beysvsdsqew5f6lq26idiglurimvzak58oybq3so6h3s9c7bp85ylz329edn9rb10xddoe0gg5npehfwi3bzkeuwj0725vhmqi14uwes89d08bowogt7lehupi8jgqex1pfb1hrl21mfzewymdlfljexrvzfa2egceaul2x5d9rt7uiwss5rx5eufqxwmp39tdy2e6oduvdk45otoi',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                attachmentFamilyIds: [],
                name: '3tebflxoocqfa1ka3z87hjoa4jfyvsoywfz0yakjs8uncuao3mae7v2z523kkdqwzo3agyxuukkn8m4g6s7tvnmb4uztrvqyjry29vsjau9r11c4lgos5yvdtzs5lq5rpm4g8crrrr7q0h1uguevsoarx8acp1f1lmbka9jhrqj440vz2fcvs0pyig0z090sh4itpz4lvw7pp21q1qd9s7d4qbz1pblrm8ayyqtsaxg0ysvmfrwdg3qxmkewm3n',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'f4pj0mt23hgmz4e0t1iuxctq5yweop473h1ksjpg0dgjej1513qve1drymg5cd3ddhsgk6estb3f1o2vm9x22dkgkur75rlkskj3h57we1t8nspn9f6eaqu74mak8a2alxzhn2leslgbm3858t10etgjjtbqptnff3nkegmhg7kmn5gqaloafaqbqzcfhuwtjwm2z344ggmequcbc0kcspio7kmrgjxgc28toj089qyxp2mjp6xi7yldt27hmrr',
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'vora2mnypill6lc76tql9c8he17v6tg17s7cayik2ri6c8xy9m8rv82yyk503r0yb2ev739m44iyc702vmtsiuktru5hjqmals4jct5785hxq3f4h3aez60ra3yrvyph5h0sw9obcy3bjhmns1prbu3ejq3o4rins5vdh15u99zhcos2yb8qc1fuqkl34qfyjncpr2n5fyandqtf37s4o6bikwaidi1c0zqyxev0curzddqzne5tlbqbl124udn',
                hasCustomFields: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7lfbogujf0d48a8tx4mccvq237mdgb3mgmh34',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'byczk644e5nybsryofneytimpa2suxudukovwqo3igvqwzxshgcl1xnbrln59j736p8m4vhbjuzzazjfmg3c6s63mget8h5oygjwjng7ric56qddmg2t41dtbncstn236h90jzxfqjobzkso2u1t0lan2egaph6r8l7mnbu9t4gtlwu13hp2k9q7jqva502i9oy34dacq9stap28k762qjv01rnf5v8l8oejiak2s1iijdrqb9co0tch7z9weo1',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: '78h88bokmw7yyyn4mtbbphuw7k0w12hvuebvg',
                attachmentFamilyIds: [],
                name: 'ojp0glzmgihg0cchohe9ki9tnb7kgeau5u55jxuehj2ab3en2xjskv465vmseqgnaoezscq3r4wsqp26vrxki1vs4q3y2h3muxbq93jtho0lzctc3rl8cgfe24y45zaoy19tgzk0nho6xq4wskxg0qnl80ii1soxe2ipqf2lxnn49htwv9nf7m5w3j5dmd64uwn73czv2bxxm3domgqm5utes8t9dpn07jw30pyfc2svrlsnasz3lfytpd2jtkv',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'wk88fuqb0gw56nlszh2monyi6gbyfx3t5c3kshfj1sxo63zdplet6u1phhsbkjp4ea8az27oltlbqc8q7awt8x93at4liv4sd4gi6q4wf9odizbp7r6istcdi4brxhjup9762fqkzdzfbgf32d6vmmm58g0v4l6vjwni7snlb1lf06bepgg9dirlvwr7ibaflkabehwggg532hewu78796dtsseycxm6vpea0n6kxsofdj40rk7417ynff9k2fih',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'n55vkzdzukuomos3ngaqh1uyq5f8m4fox94s59jvald2vupfp3g8302nwcmt3sx1wtxrqdla09j0o8xzdh0tvbtwjek55osw6g6ctyh7qm5fj9pjd3vyo3iuue4kipn28gd8anhjtysf29jidgot7crylvaqnpb2fshorfztureq0e29crlt8k1rsb5fbmuwi9l73hshi6drskop6vtv66v2n13v5bow53s59x6f2qlff3d2ck4bgkuz97xs7ej',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'kvisdt69yluu5s2e1q14gic2w92ucr0xqm27k7njo5ufneyfviivg6bvnvy29zu2a289pe23ubitvfqpn0wprowcixrnqgrhoczekfek0y4dt4ofrocqgjuw5awsrqjsaommuyomchmfl0mu36kfxke3iz6ch8d6w4022nxe0n1egrfobtjt8sx4apcdwpece1cphwtkf8izna3engiq2skfiu0zz72mq7dizf73pt4e2uimw815s6a1a67m541',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });

    test(`/REST:POST admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: 'od6jsbtbqj4n6p87n86pdvfvp98di8dvoj7v2tq73lub1np4hocdxqqu3aryrc72yn95d383ak3qcstebf4iv4dbwoba6fivmmqwkaye5ed1e44olpo6eyri87idibaoobp09e14nn3magqlh4bgsrxek8l360wq39utzh3418krg6qa93nicf7lfz9obokqaju0ug768t51o15bthksa43k82k11z6zn4jom77jc98bl6t0409r51j1d256jlq',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '193f10e6-aaeb-4469-97f8-c0d1ce37456a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/839f4a2b-892c-4f12-8d32-b6a07b6ed1c6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/07e11f5c-1cbf-4efa-bfd8-d52c2482cb74')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'));
    });

    test(`/REST:GET admin/resources`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b4691be5-8ffd-4d0e-b841-a9ba5ef82a7b',
                boundedContextId: '24ec4380-4b1b-40bc-9565-9e3f918e90f2',
                attachmentFamilyIds: [],
                name: 'wua2m5j1hz9sivp7akttyux08ofsvb5ithterkcwa2xjzueynsodit94wvcv04htu87320dtfk53war6n7ejz1gedkfpk9hqorqa32zh35u98siu5mwr0yx4turl2wflpgpl1hm1baax55fjifgnpkecz0kd3lkfm6dvgxh6243vfis0wm1li88swv6fcm5lujuxi8ojniqdwbrk2tojcoflh56oyuu6qnm3hum1r1gi91q519t55e9dadiui6f',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                attachmentFamilyIds: [],
                name: '3o1495fl41wbvqb83k0cwwi6mg6rovtlzwy9ryp7h4ejpd8nlo9krhvyotb7o9l8mrmomf7igifql5gdcubfjw6jiaym7qlyyjm1kwt9kj6w56l1fhxewis09u1j3hnoyel3jhr1nbsiv1w5bkxt4fiikpggcmwi0s245qma9u8i0mbrtsjpafs5al9jgq37nn2fuc0cy7v16g8qyvbwl8fb8ai8qstzl20396w8axdab5atr46pv9uzcg3rjin',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/eddc67cd-7d5e-48d5-adf3-655a58fc1c67')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/07e11f5c-1cbf-4efa-bfd8-d52c2482cb74')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '61710423-3b7f-41f4-8884-7684efef2abb',
                        name: 'czu5jk19heinr030q4iq6gnwiu0k98qdfvx3j1tcyqxprzvwxz5xr4k5ciuveg6cfce8pevq7zyfqahzngamsu9fpzz8m1ay5zz30ox5uzn9b4tj096wfofd5mck803659gy2sw4vbg870zlxs4llcnhn4eklidrifjmwkovpm8rtzzl15qc6ag37tzk3a7f2n5dqv7ai53m88ezqagretdfu8w8l3ghegoj8hq3hkmt4zq1stoul53txxq8ydy',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '61710423-3b7f-41f4-8884-7684efef2abb');
            });
    });

    test(`/GraphQL adminPaginateResources`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '9bb78c18-37d3-4936-affb-b96b9b874596'
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

    test(`/GraphQL adminFindResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('07e11f5c-1cbf-4efa-bfd8-d52c2482cb74');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '59452fe4-55a9-4f88-bfe0-ab5bf9d3e233'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('07e11f5c-1cbf-4efa-bfd8-d52c2482cb74');
            });
    });

    test(`/GraphQL adminGetResources`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c580ef05-42e9-499b-9fdd-d0213b2e86bb',
                        boundedContextId: '1ee5729d-067f-4728-b64d-62ca5f3217a7',
                        attachmentFamilyIds: [],
                        name: 'ysn7th7njaevklp5n39ql2tc264ooggx2r97f74zwp4ffbkxkq86oznwiywv3jfsj0mk3cvctiaxyk2x3fk9npaxmbm3k6k9i9wndupaud6xw68xeefrsmlro7fede358ps3e30yyjfxrfhsf0kvjjvpizqj1p96tgk125iravlgqojkvhgqd172k215wb8cliug4s74fz8tdsvg67597xyslgijbv38epyla8c4c9kutnbex54g45d3apegv1g',
                        hasCustomFields: true,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74',
                        boundedContextId: 'd45ec392-db38-437a-b950-1f48c9fa9e7d',
                        attachmentFamilyIds: [],
                        name: '9vw8vyhpyr0uso64qb8t8no2f6ydujndomhyhci1dhuf5vjnm44ngz410chwabkq7jvc0nj0320dpucq48mwl08414erh53hddt32y5zb2r8syslzcb35l6jejeq54m0guwule3gvrs116rcikr0ffpr5xdvnx98frm4tf6bt45sfv3qjx95quoyptiyebln3d0dmjeruta2gjf4o4r5fnhp39er1zov9rmxbkf5mypl2sdkryw1peabzhw305y',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('07e11f5c-1cbf-4efa-bfd8-d52c2482cb74');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6bf091a1-dd9e-46af-9996-fe7154011c77'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07e11f5c-1cbf-4efa-bfd8-d52c2482cb74'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('07e11f5c-1cbf-4efa-bfd8-d52c2482cb74');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});