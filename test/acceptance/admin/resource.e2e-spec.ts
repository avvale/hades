import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceSeeder } from '@hades/admin/resource/infrastructure/mock/mock-resource.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('resource', () =>
{
    let app: INestApplication;
    let repository: IResourceRepository;
    let seeder: MockResourceSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockResourceSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IResourceRepository>(IResourceRepository);
        seeder      = module.get<MockResourceSeeder>(MockResourceSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                boundedContextId: '44e6d1f4-43fd-4fee-93a3-2115b47af912',
                attachmentFamilyIds: [],
                name: 'czbq4uvzd72xfjcqghqjyfey0d52jy3amo167ds9w7r0grhl568fexl7vwn48fdv1pumhurbw345x5hyr87g71p2ozdoowdwfomgp6hjpwh7vixigh74ocnw7z8qchn56jisyhles4mvyzucwqloz521pzy1xn19q1d3znp8xrq40vnhzzq7boif4h859oehaa49ferylesnuyrh8315hwoah7i46swo69q2frlwtyw0pqxwzjlfa2tmc39gxbq',
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '9d553acd-78c5-4385-a02c-098cc8897939',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: '19boma1htpwujdi842uhehb3bybxpr5ndszjnctsbqoycq3n36omh80lz74fzbbb82w8iylq76crxrn5ez8vjjwr5drg08emv7uyh9c8to191b9s9t2dxx9mpnlav76ddvx8uu3zf4q2ixs2wv6w4ik47b897b1c815apkudn0dsynwgwwhjzuq78ogwo6cw26h43al0ywdydy4b1a21kskvsvog0mlr2kyimwyz7uij3ouxrhcxfjwvzmh0u8k',
                hasCustomFields: false,
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
                id: '0ecc9ec9-e5d8-418e-8862-358e58b92fbe',
                boundedContextId: '96c829fd-cb0c-4337-b86e-73aa51015e7b',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: false,
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
                id: 'f22aae7f-4de7-4403-bcdc-a1c4efcdf59e',
                boundedContextId: 'bd252609-0fab-4b2c-9d89-7607c3e7fa6a',
                attachmentFamilyIds: [],
                name: 'zjfo6vjnvu2uz9v3taf58mothm3sz3wkdtzad8r2er3jeb3b4u4s8mrcixqdt6rw2eujesas7b1fk1n8uykwsz6xjrj0y4d6b5nb50wweiq75wezatkq81x775lbng8ivw7uksnqmuojchtkdf4wxh4e3t9ax57ql3bgue5h06pkl5nbdauoy8115pc0rsepxtke8rx9l4154lna0l43hpf27d94z9ivvleq2cq5mq5mjpz1akictbef6fn0qw5',
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
                id: '7273890d-94bf-4002-ac99-124db04a0077',
                boundedContextId: '80e8ac28-8c1a-4590-91dc-5c3c2e52b024',
                attachmentFamilyIds: [],
                name: 'yiroleku8l6a3ki7c7pcfcq10mlsmg8uo2glig5x9wdht82yjohpmftpw7bbntily2jheibkt7tvxkdiubre3m6lxlgwzbgin9p6bmgfj7wi7et7bx37ql7wgy3i1jcnhdugw7sj209u58k9wcozolx8y8ohnfrqb1pc3lgrmahc3rdq95g5el21b1tge9wb7f2oza7nj9ljk7wor23che3tchb4mncnhzio1sf1ervj16ynkhkn4olryseikvn',
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
                boundedContextId: 'ac91d66c-4184-461b-88f9-209b04a085c4',
                attachmentFamilyIds: [],
                name: '0bfk0ec3cxf23ax6lqg8ne2ne98ihuu3dut5gk0oaicgeppntycqm7tiqjerz0gu4e32uri6t7wbbrs6s1pmmcxvz8zchytldk8mgfmclsxdnmlw5y8tkqga3u0r7nm7y1qovavum4ttmasm8atmibxz798feu1gjea5e2pur7kiut1vei8zjseulio30o9ps6uwkakoyycptk8wiaa0evhjpeo8dfemitkhrmjcx8rjf6gjrqgfrxd1kks3mwe',
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '03e4b1d5-5a69-4f02-84d3-6750db7fbc03',
                attachmentFamilyIds: [],
                name: 'mbccjn1oi1w9twma74lmm2fqu1lkaeoiyi4v6o9e87cckxtqsldfq2jtvphr9xhpg6y34hfkghjuf1ryanfusktki4xhpcl6jn0n0vmip7vmat47fy9we7qkhjytcz9msghvp1tarfazpyzeo3kyfbl31cipt9ir2qo9cb1dgqrx8df6r098advikzrwgrff50fso8ntqj0qlouc8rj7hhgatmuaik2g9hmwais5jr397g5tvdw0do8udxg3z6d',
                hasCustomFields: true,
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
                id: 'fc70f07d-651e-4f95-8fc7-85e9c7d340dd',
                boundedContextId: 'ec7a228e-37b1-4967-9db6-82ed444d7aa2',
                attachmentFamilyIds: [],
                hasCustomFields: true,
                hasAttachments: true,
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
                id: 'db85f96a-dba1-4bc1-a6da-f655bdf45a46',
                boundedContextId: '94dd4ca5-5709-4f33-b878-8eb845faf532',
                attachmentFamilyIds: [],
                name: 'uji87qmy0rwez8i0nbmdz7tr9silygbcjrqr0d8jicghvf7prssggbrxzmzhmaa4z3g8qqil1mmdfayccxriu36c9335kglxospvd70sjyeddgmmtehncpqz7a3t04azb9hnr5fbqbdawefthdc65zq7gj2sjcorr7udimur0y8gkcnd1h6vypvmxw8gfam78v81subj8g20c1p5vpex5ijbnumqt2lt654kf0je3f813dlxpfq5tm8xf60mfee',
                hasAttachments: true,
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
                id: 'ac56f1da-9570-4bb8-913d-409efde6f9ee',
                boundedContextId: 'f254e4d1-e377-4eff-816d-ec78b65846c6',
                attachmentFamilyIds: [],
                name: 'zq9h5bhbzrs14o5iyzvoo1b9hctf877rk9ugjt9o4mtz2cvpnrvebwiaj2sn00eqjyn72hfm5gturp2khjqj5nvqf94jdeteqvvjy82tls4cmhy32msm5iadqoi95iawjjry7bh0xj8fv18mev99dqkegop8xkedinqhualf43qgvqo1bu0l1u4iqs1byi07lk6t7cb72agw70h3tx26euded4c4jacx63i1zlwtmkjtdlf1euj21g60duuhurf',
                hasCustomFields: true,
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
                id: '74cjm9l2tv23mbwqdgoivmxef0y17zjve7j0q',
                boundedContextId: 'e3b060a2-3cae-412d-bb51-fae7eed99257',
                attachmentFamilyIds: [],
                name: '149k05j0g6tg0a3upftw6537q6c7tkwc8xrj2h5hhvsxe9pttig1moitjiqtrb6au12yf2t86opc3zf9anuglw2qu7jv77y9m4m888q11ixyzk15fzegyrwk81jd8n1cdfj7zujoqd9h648g2o4tjg3oo3492txwg6ih6k3x3n46ksai4s524w0m63u33wyixlsvr3dbxeigf6sp8ved2syu3xzdcux33fr1po91ik67dou2it7mnu6hlwx7ao3',
                hasCustomFields: true,
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
                id: '243f9152-e278-49d7-b66f-2d03f4303303',
                boundedContextId: 'ks299oenr7yk9ghrny08osn7zkqh0ixm1nxc4',
                attachmentFamilyIds: [],
                name: '9hfg1qb0mls4mrgps1yd6lvgu1vglp55baueez2qw1d3vnebq8zv5l4lrq9bavqjfm51iifgawe170vq4nw98xx0i0qz2fey1fyitybdd7hda81hxzz84ptc0b9p1oq9n2n72powzx0q0fpv2f4o5bl7wftsllh7vsn6efm909a112wudqmcfp8ymmmwsbiz4reslo8bgbqn1trlpkemxp0fsa024v76r7ui2ri150kjbuac6ttg19kzyu2fpkf',
                hasCustomFields: true,
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
                id: 'daff4e53-742d-4406-9dfd-86130cf5dafe',
                boundedContextId: 'f96fc0e0-1e7f-4e93-8e1c-9d7ddcb95cb1',
                attachmentFamilyIds: [],
                name: 'alp1zwe6lcv1vod1lbv3kezmb42sfo2cyn8vjy4sw096u5zh2a330xfijllrlnawmkgjia90jb11csihesmnszhu2edlt10ii8nak87qpb399gddjea66mumczxxnhuzz44ctkrbta3dfmpx9f4gl5et1gi5unkh350e0jtf2rcivd3agfbpmwj70y1jjdmc2f2zxauk5f2gm6zjqo77yg4h2yufuo9u9wf9mwr7m5xfk0ih0lpbwdvwjxd590gf',
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '9cbc9d17-24a9-44f3-9900-a0aebac97bc1',
                boundedContextId: 'ed9f00db-8eff-4e78-93ae-97119bbabde4',
                attachmentFamilyIds: [],
                name: 'ur0l2e3b2yjivfosqcuor3btldq910dpbt27am6nuy0ok0scggnt63tclcslaw08cx6hq6ni3ya1rn5m3o5r9wi3radjliqu34r6xowwovpch2rtvk8ba2zwkxa296dvnr6hop3163rai9elmgezndstuw95okvpgll9gkkfbkf2rklaabb7kri0eg4a43oq2rua6yp5r1a93wp574wlqflvh0j8jt51lfm07y4wsx5xnx64hjvfoq7ol10qyid',
                hasCustomFields: 'true',
                hasAttachments: false,
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
                id: '4a07fa65-0498-4145-acef-cbad5c052468',
                boundedContextId: 'ba0bdc91-1a39-4357-92e8-131626348af5',
                attachmentFamilyIds: [],
                name: 'k2bc0igxpxx92c8j7leplsl9aiqrxe593uxzgs3f1evlxgzx2gzqn6ho6b8unudg3qz3pqawd40hoahyubyr1e38nre4oz1k82ioarhkwctv8t2hdd588a9fdrlxcj6znepvzp29gzzlr3vwfk9m6sbmawsyt7x8ugg0t9hhebeme3im5qzyod0d9ht9535wnvhy8wcnbn26pytjft9x9v5gxqrob5opu5v2gfl8cswtg6k1v3bg5kv4jje6vj4',
                hasCustomFields: true,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/resources`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: 'f5d54b64-cf81-453f-9c17-ddb5e37eec4d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                boundedContextId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachmentFamilyIds: [],
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(201);
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/5795f896-0fcb-4b8e-a625-4e6e3fc8e8c0')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                boundedContextId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                attachmentFamilyIds: [],
                name: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                boundedContextId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachmentFamilyIds: [],
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/dc779200-65f4-4a00-9204-570986d7de40')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
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
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
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
                expect(res.body.data.adminPaginateResources.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        boundedContextId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachmentFamilyIds: [],
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                            id: '273bd2e2-fb3b-4b97-bfbf-9ffb78da7c11'
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: '660210c3-a41b-462c-8180-40f281c88a94'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        boundedContextId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        attachmentFamilyIds: [],
                        name: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu',
                        hasCustomFields: false,
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        boundedContextId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachmentFamilyIds: [],
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: 'fa3dbb3a-34d6-4d0f-a835-6b7850071d04'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});