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
                boundedContextId: '3356ee3d-d1f6-41b1-8ec1-ee2e18913534',
                attachmentFamilyIds: [],
                name: '7b1c815apkudn0dsynwgwwhjzuq78ogwo6cw26h43al0ywdydy4b1a21kskvsvog0mlr2kyimwyz7uij3ouxrhcxfjwvzmh0u8kdfj0wsrlvrmxcuk3iw1if47bjxckom4zowldrj4kzvso1r88f7idwg7noc202bxgpg874x56mowgzauvha17zsurn3tawzsuzcmwpt5b6d0m0zoqp5s2timhf0gr8vhznfozjfo6vjnvu2uz9v3taf58moth',
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
                id: 'f1e96cf4-63c1-46c1-8651-51d2c39c58eb',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'dt6rw2eujesas7b1fk1n8uykwsz6xjrj0y4d6b5nb50wweiq75wezatkq81x775lbng8ivw7uksnqmuojchtkdf4wxh4e3t9ax57ql3bgue5h06pkl5nbdauoy8115pc0rsepxtke8rx9l4154lna0l43hpf27d94z9ivvleq2cq5mq5mjpz1akictbef6fn0qw54sh6f7jk0tlapy015dslk369vp19m01ghk1wjnr5kjs4ock0d4tsbr7s6wc',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: '4f8ca968-d393-4419-8353-b565b0099ca7',
                boundedContextId: '3da17987-2e4e-467c-b0f8-b7b97dbe355a',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '9f187685-9d3d-4ee8-a8d5-c61a29e97ef4',
                boundedContextId: '78a4b249-7683-4e83-ac35-e13b93e7f180',
                attachmentFamilyIds: [],
                name: 'jcnhdugw7sj209u58k9wcozolx8y8ohnfrqb1pc3lgrmahc3rdq95g5el21b1tge9wb7f2oza7nj9ljk7wor23che3tchb4mncnhzio1sf1ervj16ynkhkn4olryseikvnmosk3teerb2i9d2qaiyk51lq1bm0jbsa0bfk0ec3cxf23ax6lqg8ne2ne98ihuu3dut5gk0oaicgeppntycqm7tiqjerz0gu4e32uri6t7wbbrs6s1pmmcxvz8zch',
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
                id: 'd9693a76-a59c-4e5a-a9e2-f3d9b741d0c3',
                boundedContextId: 'aa3f0bad-4eda-42dd-a4c9-34da85ef3436',
                attachmentFamilyIds: [],
                name: 'eu1gjea5e2pur7kiut1vei8zjseulio30o9ps6uwkakoyycptk8wiaa0evhjpeo8dfemitkhrmjcx8rjf6gjrqgfrxd1kks3mwesfy17w9o2vccodkz25r9v8efb1uqhzpr08mbccjn1oi1w9twma74lmm2fqu1lkaeoiyi4v6o9e87cckxtqsldfq2jtvphr9xhpg6y34hfkghjuf1ryanfusktki4xhpcl6jn0n0vmip7vmat47fy9we7qkhj',
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
                boundedContextId: 'd5f49c77-db0c-44c6-8fbf-f6a19f659105',
                attachmentFamilyIds: [],
                name: 'ipt9ir2qo9cb1dgqrx8df6r098advikzrwgrff50fso8ntqj0qlouc8rj7hhgatmuaik2g9hmwais5jr397g5tvdw0do8udxg3z6diwyrg1z0gtfb2wzlctyrgicxlsht690vtwrhm66kw7gp2kdgutpdi4wva9athnm5t1jtqiczldntpo3qr3detnzddcpuz9coafm9ttasnbch0ly67zigkjvpi9dzmyd74uji87qmy0rwez8i0nbmdz7tr9',
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
                id: '9f7558cb-c063-4885-b7e6-3bccc774cff9',
                attachmentFamilyIds: [],
                name: 'zhmaa4z3g8qqil1mmdfayccxriu36c9335kglxospvd70sjyeddgmmtehncpqz7a3t04azb9hnr5fbqbdawefthdc65zq7gj2sjcorr7udimur0y8gkcnd1h6vypvmxw8gfam78v81subj8g20c1p5vpex5ijbnumqt2lt654kf0je3f813dlxpfq5tm8xf60mfeetntdey3uokbf0qpjc47ua0kwytwdylwwy6cawbu3w8ggwzyr4duvrfjpfb',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'c6fb4725-74fc-4c02-b28f-fdbb05475c63',
                boundedContextId: '33c94d78-c4a1-4adf-85db-acd65e8481ca',
                attachmentFamilyIds: [],
                hasCustomFields: false,
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
                id: '8fa3176a-27dd-4cb0-878b-82adb641856d',
                boundedContextId: '6bed8f30-d9c2-45a7-b11a-ca2846ba8428',
                attachmentFamilyIds: [],
                name: 'awjjry7bh0xj8fv18mev99dqkegop8xkedinqhualf43qgvqo1bu0l1u4iqs1byi07lk6t7cb72agw70h3tx26euded4c4jacx63i1zlwtmkjtdlf1euj21g60duuhurfl74cjm9l2tv23mbwqdgoivmxef0y17zjve7j0qw8o1e0m47rnx26tfqb2ynvgxxvlk4cf149k05j0g6tg0a3upftw6537q6c7tkwc8xrj2h5hhvsxe9pttig1moitj',
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
                id: 'bdc534d0-1f61-4c32-ab51-f644ad79e0bd',
                boundedContextId: '38d33f4a-1a33-43b0-88ef-f9027f67fce9',
                attachmentFamilyIds: [],
                name: '81jd8n1cdfj7zujoqd9h648g2o4tjg3oo3492txwg6ih6k3x3n46ksai4s524w0m63u33wyixlsvr3dbxeigf6sp8ved2syu3xzdcux33fr1po91ik67dou2it7mnu6hlwx7ao3lu697zl4d5w4hjmvhpedy4t08za708808ks299oenr7yk9ghrny08osn7zkqh0ixm1nxc49hfg1qb0mls4mrgps1yd6lvgu1vglp55baueez2qw1d3vnebq8',
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
                id: 'v5l4lrq9bavqjfm51iifgawe170vq4nw98xx0',
                boundedContextId: '80bf166f-06f8-4df5-9537-54307eff32bc',
                attachmentFamilyIds: [],
                name: 'c0b9p1oq9n2n72powzx0q0fpv2f4o5bl7wftsllh7vsn6efm909a112wudqmcfp8ymmmwsbiz4reslo8bgbqn1trlpkemxp0fsa024v76r7ui2ri150kjbuac6ttg19kzyu2fpkfnxumzz9wb6ga5t91e3vztjf381szcunzxzlfys1x02xhyvl7rx2rltgturplbsq4alp1zwe6lcv1vod1lbv3kezmb42sfo2cyn8vjy4sw096u5zh2a330xf',
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
                id: '99c9a4e9-9788-4440-8500-5c876caacf7d',
                boundedContextId: '2edlt10ii8nak87qpb399gddjea66mumczxxn',
                attachmentFamilyIds: [],
                name: 'huzz44ctkrbta3dfmpx9f4gl5et1gi5unkh350e0jtf2rcivd3agfbpmwj70y1jjdmc2f2zxauk5f2gm6zjqo77yg4h2yufuo9u9wf9mwr7m5xfk0ih0lpbwdvwjxd590gfexnlrpslv3g59nk9z8lk10o1owpmslhpt4xumz01tpixzyvgim8nwmh32kqpmqtwbur0l2e3b2yjivfosqcuor3btldq910dpbt27am6nuy0ok0scggnt63tclcs',
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
                id: '035e37b2-a81f-440c-a2a1-a2c4e81c4589',
                boundedContextId: '8bd12c2e-aeea-4eb5-b1cd-d93541fe9e40',
                attachmentFamilyIds: [],
                name: '96dvnr6hop3163rai9elmgezndstuw95okvpgll9gkkfbkf2rklaabb7kri0eg4a43oq2rua6yp5r1a93wp574wlqflvh0j8jt51lfm07y4wsx5xnx64hjvfoq7ol10qyid709o1gxmfd0bkj39dwsvzsqoubr2b5aeiqn0ptsm33m6l7chv5wj273f6d8ajozck2bc0igxpxx92c8j7leplsl9aiqrxe593uxzgs3f1evlxgzx2gzqn6ho6b8un',
                hasCustomFields: true,
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
                id: '1bf1bb4e-5107-4a47-bd5f-c0613ac62af0',
                boundedContextId: '8308a4c7-9e5d-4e3c-9766-2334465c9e58',
                attachmentFamilyIds: [],
                name: '6znepvzp29gzzlr3vwfk9m6sbmawsyt7x8ugg0t9hhebeme3im5qzyod0d9ht9535wnvhy8wcnbn26pytjft9x9v5gxqrob5opu5v2gfl8cswtg6k1v3bg5kv4jje6vj4t7h2z236g5bx0cj9uez1vl1nxgh82233ids7ssuwdwrit09dzkgi0cvrxwezhxauk538a4b1rxmcxic0ar364cpt51c1iye86bkmelqwldk77jdpwt2ab4albmkkhe',
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
                id: '00220da0-de84-443a-98ea-631cd58ac28f',
                boundedContextId: '7336909d-0171-45a2-bf0b-5408132dd052',
                attachmentFamilyIds: [],
                name: 'uw9rhvpguymusrxvgfxyuk33r2u48yfemn30j0dh7yf42amtj8xq4j1d039lr9qe3vbuv5of1yty34amkoyuts04wqm1800kbffii6k2w0kpf760itmqsw5ffw6reocb4usawlkghi1iqcptf90f9gr3rxgvxmpn6914icxnfurmkeljgzqehcxuwjmcbje5ldt8wotftrg8obeq4bjauw7jhv7eytxgjxjijk18cfkki32srie2g10xuin3ts6',
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
                        id: '9ecc94a6-2830-406a-8ce4-fc894905f3b2'
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
            .get('/admin/resource/141d6ed4-7025-4264-a55f-aba069948033')
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
            .delete('/admin/resource/f6ee2cdd-d7be-435e-b93c-3f6068d422bd')
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
                            id: 'faef678d-64e7-4bdc-b68e-4558c6268b09'
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
                    id: '04d6b9b5-205e-4527-bebd-f205ba656d2e'
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
                    id: 'e0f84619-b41b-43a6-845b-122a41fc7a93'
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