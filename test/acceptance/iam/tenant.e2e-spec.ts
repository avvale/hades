import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
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

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;
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
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'vedokbb6loxbekiev91eavym35cf3kq8z61amtcdo5rn1ye7uzxxh002qnvdg6iclsqffp7tj5bjngfoswxqap1b84w4de36f401qblari7nn752yq2emou5q6z2ydtmhr6svg08k9sag9adnynljjngcffwrb8hdixgn4ia5kxdze6ygm4tfjwsidmw13nnjmx2rba43f1yksh7q4b78gm63e6vwuyw4f7jn94vzdgi4i9t2plw685hcsg3i56',
                code: 'uq0b2tkihil74p6w5eocvppggvho82tr0no5nmc6d678zr9toi',
                logo: '9vo8b4mp4890ab7xq143ntiuts73wdnozv5jt9raxi92jchzvnl2lh103x7kxp7juyle9843ayzl00k2b47re1p1jk2ps9utiopzx20ufj0ey4mwho7kp1hrsgq22xhlccrfsbz0n2qf7e9oryihviho0mca7d71r56pg9i58cqjol1pxbeg995368cxzusadcp7907kug2efriqe2ktc4qjrubvo4zoj8w1e1ft9h6ds3561isna8sxfpto4kr',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: null,
                code: 'qwtebgu2pks7pzyms6di9zqwnu4mokz71ujwsw54tc1ihdwajj',
                logo: 'ywgxa7sp4rilmjqq88yr4mqhng947jzgazdjeq71pb1ryuqka2a8f4mi8wzit5nmvaqfcmdkbx8xnc9kniclnepai9kw38sc5veletri0j48lt8j8vriyh0hncgzsvof95vzfz4869a12bfern1rltv3o3dsr7by7n13ddqnqqojj0p7pg4na0j2nxvzqe43z0358zaqmyqc1r0whi5hul67vuksxqv7i7ne8ksb9nilkzjtzjh52erh8syhcay',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'rcgod3a0dfrvmd4hj709w41phmm772woi71usxw7v6hhk06p0bd4rpwl27q0sl2wcb76xyrh85q60k5g41b1cpuvgxp6m24aixpfxvwtpwel8urdgrl9tmnulfdu4j7qf04rkud3ajyrj1wj1u44evw7twp1pzg2f5xn9h5if4slsbp7iyi3wr9movxhuwu2a56afph6vicvl9h5aodxfbugeuljlqw8p2kyrg9jzxqw1yvb0jlonpxciubw4yy',
                code: null,
                logo: 'cvxvl31znhem8kzift3h00z3q82f0xdg3ecowfwqf8qj82rmaitaxguymwoaiyo6aoka4j25q1t3zi57lkxgb1yam5ut9vqwywayqwzx6gw3t2tlx33u83o7yksb1lkrxlayc53yc55ak0j2hy4k1odc4aoyovx0sqhi2d5myna7gl6y6jedn0m1l7x9kflstjw5dq3ep7r7qguzykukp7ux5ptjirm0r71361wyi8x8dyq51q9hortuey7tr1s',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'i4htkugr2h4wom3yox10gpq3vp5ynro1tx7wrgsnph442s01v30uvss71ktjz45sgb46gssqc9x519xjgv894wau02kngns62swqan3vi6u12ojk5mv230ysnvjo5dy3xw118w19y0ytt1a6mt3zvuqf6qpwgo2i1wxv9j587htlig7iwvc2hi1yflw9i6b7gynhf6hfgl9i7j8rb36wm54tvdnl4qzxddhyj3ov29s985820ieadsxvnzawhem',
                code: 'h9z3x90u19t0snqwzosqugs8386kqffc1rjrh4h0w4mbhjy08m',
                logo: 'mrax36wt4qkoubha0fl8k7izoweknw1fmdxhj2h611a9p3luixe1cmsli9fulsd034xe89q45j1sys5cdlu17i8bzbc4bmvgf67bxu3k583d76k39ivwa2jt27a6ykszcg44iyte9k28t5bcru4fxxbdtsr51e661l5yzpubgdzyani1fnetom16u232orz6wlh7mtg2htsen7cfrft77c781yauh3tby14frxp7d7zdhdou4s7h914sw46l6be',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: '2uix083d04wtb258g4s5mukdn2t1c21i45w6v71bja44da84c8d2eltad6dzxe3vaah7g1k3vru48b4hdxy3ionogolwhuoho7fxmb5uwrlf4ndpw1rzx7iqt9yflry9ntea4ht6opzg5y7xkght5w7mu93s2w9ng1tef2z80pkwumjtnluvwlc8cledam0mwl12ec3gqnkpcdv4qy67b7hkf2mgqi46dgkt2u2m8hfyyzliju8oods3afv5bew',
                code: 'xqos86w38gi5n77pfc0blivu0fb7bmf3psis699huo7vhk3pss',
                logo: '42bt93l0wxmshzk5jrhw447l0nimu090hs33nqdwsttl3712jbh9uff4wg9kmpwexau7g86v0qsk8g4vphnvrn1zqqa90s8bzpt9k3t4us6tf5iq2khivn6h6l6an1xrs75m7hhshknzj58tagfvdhou0l9y1vcw005hbnmx902s751xmojptz7wvtgcy5dkrglppfm4htkpjcec6twqrr9egmne4lnvzduuvf155l6v42v7rc6xzh2ihmfmqac',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                code: '1pmqkukdjax2rpj7aqf1uxi2rultk98rqk0v59jkcwgl49z0pw',
                logo: '5d24oxnx8apf10imby05mzl9czhzmpikie7buczwo120ptfl8u7n1ud61mxepzcn32c5elm4v558be2zxu6sygr69jtwjch5zj38d4d6etb9zoef8ordwieswdld4hxc8jmd0zcvi6d0vhi05xqbf16018tkgfedqwkruwhz17bzw0qiidjjrth4o78fx34ul3dipmax3ptw3f1h67135x09gn2mrdvrvflff5z45si462wmcopp85wdnde50d9',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: '5r3eajc1eyn9hf4du9soua7h6ksf80p5w2emgei4s9pq06kpchnw6cuct03v7crmwblkwk6vn72wgc4nygzjsqq35v0syxx01hgn9py8r4hq875a4gwkz6u0ml5y2ye76wzqrhi3dcx3a8cngxwgy49ogog1soiaahrirkv1pxijali01x0j56cm9u26cohauu0rok7vks3ni1vxf8bphdmoxqmnr7ywr0hadlhs2vl0d5diz6alw9quzb585cr',
                logo: 'i4cwp6sfcaiqr6v6aq5ca4i2in03y6ci4al8z5hg19opw8rt5ajf1jsbyge8jahjdfvtppa7hbilped6inn23gppm70qgpycohkt1igw7hrtfyy8wjp5fz5pv2j9d4ecfvhhpmqwt9dxpje1ajkci9ahrbfiffdrpxgxk1wlfb8a25wyrtwyzdjy430cp89qd7jsxf5bm0x1f9uscvpd405xze3uf12mfv3i2z6jf31ewhy03j4bv8m04s4tvl0',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'errhbed6zgdfkwuiyzalz6oj0o5c8pe0i9q9cuh4zpa04lzjpdu84e8us7eo83xc6mdsaqoqsmdcjnzutadiln8tn5evcilgo9p8hzz5u0hxndimj4wjqw7c3h5ntisjl6k27auei8cmd6y5b6azlx0ehcu7ksyuxzka3feknz28q029hdm0hcw5sqera5dfouacrk3lly4b1rt8hf2n2ebi0j7w1el7g19k9yvlyhe6yvpnz7pvlsqbejtz90c',
                code: 'wzbgadhaw3ceqmbrnhwig7ccb8d574oroao91hwqm13kqr4y95',
                logo: 'rgqixb9j41orynxk24yzqbf6m0zvhkam6e0zhl76qx7ktcisn5el3nbj818urtnmyeeapqcs0qfipwbjyewt2ou2cpl5o91uyxohs313dvh26ny7a2s2arldak8i6memo7l0111dgj5ezy3eap68zra4adfiw972qhhdqgf9gpby7826pnllakuztjah56ujg594if38abpjf8ukfqg5w0j5qrxf1sex3p2meopazmov8rk805atvm9deczizbr',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'jbdrwpk64rxcfi77bgvrhh9i02e3c4976zlk9',
                name: 'ce29te9bwtmpe6g7wjv9qagbsmf3zgz3p1fms2xkcrwy1uld30xw2b9mw5v026fai96czibmw1tw81m8an4ul7822ig1w9sg6f726cf7yrc4culq2fkpwugxuc4beq0dwtu7riq1gfrf21k1n79e9i5jahu7nucz61u8ilj2toz9ycf6ddi16me8h3oh03pvllgab9860aybchc71yq04qku0t3levumn97i5kh20z8z6jv02l2kl8b3n4lbo1n',
                code: 'zu7zh5l64j87fqm4lowwsof8hvv6yx0twx01ajcaidy53qmi1p',
                logo: '8sq9qdpdkhjtp5vwpmkhhy5yx4d4uo66t12nh2hruygjrwhku4ikc3liq2mwg9a9rpsbzd4ajvemjz3b4fehmmr98nw8bhmfxxabtzxs9xcb0d1jl6fxnxr3wp0jsrj2wzmqnsi5vcl3kuy5kio1x8j3thfiycd6b1ve7fee8zr3xz9boikst9rqx668subke0e0loddqpnpqp1l1k201s08293b1mfj4dg5ngizkfk4kyniap6a7wc44dyniol',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 't17m3er9tm84u352g1eppd3pcntslouclfk4o8iy9h45ccxisdj6enohgaehk1hz9zyll4a3vz3ig71v7you6gvhrz7uaykyuxfe2dcwdupgxnv4bnoidg602o9rgrksgbd244i3j19q6e0keu4cqa4h9lxcy54itp71orb566ixndul70qu8nhft4h6vnveieipwlc7izy5d9cg5fligrfmmu8g9m2ij8rxwab45cvtxvb2xjhiizthdcjxo5ep',
                code: 'o8waj9zw72wykqaluwgowha7bkbwffp56bix95fnb07mqxl7uk',
                logo: 'd76evbh36asn7z2xdmqqfgoaq659r7a14ino8x3xrkcu1sc3kzn81bw9b732959z4l069xtrqvdj87nv9nfgw65hc6cc5ewa8evnzqs01x78e6oi0wtizgs8kvey7jlmvsodoza0q4mmgk13eijum9ilfizeeww6ozqlz1qsntr24dvzr2c3s4r0x753mhz7kd544fnqvnj9fuguz93ys4ucb3iogikpgws5n18e98ctegpudc3wzcow0hs7szw',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'cx01mxrjhdt3xsvvddrtfjfcklgyilbvf3zjdk9pmc9je4j24v1zsbxup69c89vxb3o0xn3nwo25khw33nvskzia8q1lgffdaqw8ysb4m2il2tjai1722fkad7dcwjj5a9z5es8tia1rgjj1y5qam7ptb811098dbaiz6fyda5yfnuec90vmb1srmip3j38noejyq4zbsc08qz4ovo19eymtx5nneovo8wu8gz90k1ngxf3qsnm1b4nd1gc7jpa',
                code: 'l5t1tfoibdvg4sx6hv52w2r5mi2h4x73f57azhh0a4trvdenz0t',
                logo: 'ruscj4063zax68jcy7uutf8ik03znjbobilbdbx6c2576eot1gh5ob8zgzdal3fd47vzhpksuhdls249nalha3fy6bacyxgfkkzw1ooprpksqby9pi22y3f2mhnr3ohwdrjwwjdnpyqmbez6sz3k9pcx4coshmab7nlfe1ty4fewgca83tvjy3qe4p5gs50cyi31tji83uk6e0ob2f99wygyr5ir0kut00xswusy7p9v764j8vg8bkdogb68xcl',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'wh9nnakfn0z821wgo5xqiuly6c8vy61ztsxjzoyvtf0oddlk60g0mwrvux5jlk8b8qifzuqkplwl1bwqmmp1bm27yb0digg17wrdtu4nxtd8fpfpnrjt213mzv37cvz4ue6ytjwg6ncvbmi2365j19nz4zfs6kvbucypb9c9xbfuh15uil23pg4g1yr4ddszogv0ta6vn2f98txfbt9puz5df9v0tj0ra4n1a3c22mh5ipj7lltao2a4ps1sybn',
                code: 'gq0s3umf9jg8j9wg0kdl36d7jw1ll9pxwi1ma1bjeguvcrn7m6',
                logo: '2kmfyxa6qgo0u1kwza5utrntiej14ppbcgc8i97zmjuqmgy3z38a2xaoe1cjml5h7n8r753hzk9awrv3rh8cijxo0ar2v3y2y9zyzguocsw2h4c5zwe01x9zfupwtvaidp3l66juqzavnrhh54o6shrz61err0ozezv9s83z1co93bfdcy7w9yaguikko2h0jub4dyw71txl9o8qi7pli9cvw7mdyhg0i3o4e3ct72ghycwgdajanm8ta7a8wfuk',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'ftunceuqm6e4fndpyiplufv1ue4t9927r4ec0go5y563r4h3cdb0igdkc8pwf3gyp14vh0exmhyozuu3dw0gyrtsn7d5w97bj46s6drs43ff15sb3bnq69v8dru6mtdm0qe70nxaoh92zf8qall1hkcwgd6u9evwiiz1aixohbs81hdls4ryn0sd8uzkdo57nit92j357k4waiqb8db2fmb1tv148mkrfaywaaab4hab5fcnpdaryrruspm1694',
                code: 'bl3stpi0yk3pmsng3w7otkfjnn2rbal4yawsxj7zxq4w4n2w6j',
                logo: 'imekvala8rpnlfc4hc6nqv6192u80h29f2rkq7oo4t0e9vtj5gxkfwunj2q7ec8i0x6raxke5mfue5zdaa4iz8sr1s9dvdvsyskmtf72aroiuz3np3009x6x0gch94whrlao2gyw1vom36lvxl8yrc12k8r6r56e4lda8kyz9k1m3t0c9qo4r8xcx7ezllyckrw5ks2nifpmejkkt74nu02lh61e93qdek9oufjw7yq4cr7lbq23zgxfhodrxi8',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });

    test(`/REST:POST iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'hbbz4ageinz8t5rfgisbtoh8f7bfot3usrrup6ke68o8m575xu1ve476gwurbabfpyotlc223lsxefrqhhzl9at36c0epaias3al3wk2fumtgr88ig5ei3ece4pba27ftbsfzx3bigeeawnddinx0cwuw32jsq0opsnr28990hz2x8u2s3c92su2o2ap8fz88hdvlkgw8y43vultvmqb25l81b6xshs4dp8ml2lqj0o00308831w3cpblhkyqvs',
                code: 'nyrmdytlt92x4rygudtnhtw199gz14rhxns877146tcrmpijo3',
                logo: 'eo6v8299lku12ht490w6zooh5ca84vpf9leidixde8ej8534zfuki3kdbducmd5dfc7y22v6a5gf094zr3gilncenzo932u4b81owl8fn8yqmrfck0n82unv7iaafdkkeg2vcp5r5oj9cuib3l3bbecc8jz4iakxal7m9ywatipyv3ok8s972kpi11qwgf68ocg4ni9pe83adxynvug716dfvcc5di6d0kyj4vbkduuoakbdt48g8qsgtikeihf',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '6a7a371a-b881-41c7-90b8-4c70c1db753a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '0953e87c-22e1-4ca5-8396-340815aa13de'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0953e87c-22e1-4ca5-8396-340815aa13de'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/904a1208-8463-4ab2-b931-b118b0d3d26d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/0953e87c-22e1-4ca5-8396-340815aa13de')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0953e87c-22e1-4ca5-8396-340815aa13de'));
    });

    test(`/REST:GET iam/tenants`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '11054359-6575-42d7-bef9-bec332fadf39',
                name: 'mv6awpi5vrac4ul1j93iziwjeaer13jek60pxcxmqr9x6jdvj2reh7wkjaglwzu6p98oj5dssktei93f73l6gjx3xrdl2fng64b1dxxc56puppf526u0wa7wqdx93zueduhbmveor3z3wv57nsp3qja7ljjwdnmzwvj0cckoumu4tyv3r5f5jekxjju7jyu2rb8besnz0djb83jpudrxylpqxbr3hr7wevp5vua5zj6mnhb1qcv35gm27ca1xpo',
                code: 'kksbi849oqfvpev8n6ju9du1r7h0jvofas7610q777967tsfvf',
                logo: '2eur8b6kxioxvskmoonu791ulfr88baynabttyn5t547brfwa2rrjxmoehmfy6m4sat7vhv109mwh7td5db7m3hen6xpg38c5j4mdqquhmo4hirogmfo14e3evun96eh9tzasd7vl4vqrrkcq1t1ayo5go2g71mgce86ukw5d1qromj6fkacmt1s3e4bp6ct7yj8yvutzjf1s49tl5bxqm2be080xlbcknt18xmb1hgpfgwuf5qw7bfwv86flqm',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                name: 'bqh8o46lpgl0y6kuzy2raqgzd8lj7l6v26y2xsdt1v5sg8tv1b15ja3zfocwmnma4jdek7yyc5mc7d04hcf7jbm6v1l4e88op7c6p76p9l1eowjhprp2l5xygcowcyqai0b05ybob592zodav1272y7gvl0gql3uvccrep55p8a84pb3ycat3bbtsm852c71enhtgn6qug9cgtbwbk3vnz2ormfqojalzlqsj6emz9c8x71h8yu37gwsk22y2wi',
                code: 'nbbs495t2091dhlxawpo0bct2lwtyvh8wfvyzwz1sfzmvpyqg5',
                logo: 'lhhp11rmc0jhxwarcmoetj2vi9rn3or8eumy3m83ssgbmkzf0sarp2yiw5woe5vxtwhcaqv2rbswfofqijtcdmhnbib2at8r3zd0c2bh0ak90rt87ijkuf46fmmdfh1yzf7ch5xlmhrqendbt17o8k0r8ihjpko3u6qoib1dhibmp799kt0ml4wwzmn3zko3ez5z44nw89z4zbmejfvgqh0m42td44gr1w0r1ie9n20l74slb4tviqkz2nob5tv',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0953e87c-22e1-4ca5-8396-340815aa13de'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/8a65d1b4-8079-43ed-93c1-83d00efa1eac')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/0953e87c-22e1-4ca5-8396-340815aa13de')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL iamCreateTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9b4a9b7b-d1bc-4050-a607-cacd3701b67d',
                        name: '0d7klf4y6266iexo8btciw675i9al3t4vsrff6wybjahxq3f67kn9e75acylvfcfi3jaopnx4szc6yqmkarycvx1k216k28c1qhxudw50m0885o0ufiayq0u6apmfa1xldndckeplpjobyy3y6jonu32zf1af3q250z2v4pikmpt67xqruf7ldql36k290u0rh8phts4h1nrkbg3g7xo376j7zehqnfwzg60df2d0gexk4spz51tn6xirt73m5o',
                        code: '5zp4udqieczc5rgybams93dgrvf0943p0t03e81xlxo9y6a666',
                        logo: 'r8alek0dxbz661o105p0aqgnn6dgu2u9e9hlpdgtyv8k6qv73lkrvjs6vluhch6ov1l582ciftzkhg3qydkv55zf1e8eod45vbcpszc2sz2pxnot0zzvl7evnoowo9s6k6pwzrg8ehnmezdzzxkn1a2xb3ns78ww4rpgyztjiuw0tl0aszzgm4ctdrs238tsz5bgnw69lhwemigtodbrecifv4gxflsiuw0azg020vezr387xph7gtbga856fb8',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '9b4a9b7b-d1bc-4050-a607-cacd3701b67d');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: 'e6159894-e2d6-472b-ae34-2b54774bb469'
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

    test(`/GraphQL iamFindTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: '0953e87c-22e1-4ca5-8396-340815aa13de'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('0953e87c-22e1-4ca5-8396-340815aa13de');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd1b1b761-23fc-44e4-b5c8-3136b717aef9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0953e87c-22e1-4ca5-8396-340815aa13de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('0953e87c-22e1-4ca5-8396-340815aa13de');
            });
    });

    test(`/GraphQL iamGetTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e3740f76-1d4b-4e8a-ab96-b4cc838ffd13',
                        name: 'lv9l7a339eg9h1haexze107e7hnkycutc3n2sdjuwvphflv27bgo863p6xfp3ntudgucr27p1kbm88n7robnqtgb60u3u40qweu1u140rq3ect7o1109se5jt25cinwagedidrocc3vwhuqmd428h2n60l8oljaxamy59z2bnc2zharpsdfqyu97mcgqr2zs34mghkipjawp8ip79q02i1zh3dz1yxl14um2xtji204a6or8jmk1riwysxujzzz',
                        code: '0p5961216usvaty82yyu7tfjqtog7rvv9df7analgg6ego2t5p',
                        logo: 'u9u63tx1z2maln969vh0e26yyuuv2j95wf60qugtj8ggfvebav6b5h8p4fupyi9uvp1evwb8nrn0c0bgfvmac2ppx88v92pvfzyqb23slbylsr7fzh6quybks1po68a1yg6isk28iiafw0zus3orqzqyh411xbjgdfirmo7bwv1d6h214sx7316k55erzumh6pbkpe9lzuy775bwmlxhc0ml3sqwqo7b9ok4ph0wwaifvu02oq949305aqegfzw',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0953e87c-22e1-4ca5-8396-340815aa13de',
                        name: 'qiu2xenl027fou0y18y01zxr4ca6okjvsxp2fqcayf7dun3uax8h1i22cofth3yhoozv4b5ok2ggss0a2gu6njlpcuc9m7o5jv641c04v9w38supqnh71sdikea9ta1s2v2xvo8abghrvbdrsmd4gzler92xqhieqdbxpjol0cwb3gesa6fzb0bkbgg6bjavrijpp1tls6whlt4467qhlnxa5nwylfda0xpjdv8nwtjqmvd6g2m2sqn1md9ka6p',
                        code: '9xybtw1o14gr9e1mtopb1c7bjq4t7b1oau37cegw5b88igclcq',
                        logo: '7q7gsaxgc08x0gr030ygmmefvrte7wu71ovf7ttkxqa52nhah2kou5nk9x583pprctxyrss2oauaqi9bs4ze9isbs9vhckwul7w7g63pewpeddgx852j6z8y9s5ybqvc4jkzomhm0n1hwn5msabdmquvc6y7qp2z78qr96zffn4hpcr37g6n88mq2l91atf7s33ioy80jufgd03b3auizp1jk9l9untnwpjkuoawx1yh7dqkuk0knlzpw6lbjtm',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('0953e87c-22e1-4ca5-8396-340815aa13de');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a969fb10-7a78-4989-b8de-9b299c207998'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0953e87c-22e1-4ca5-8396-340815aa13de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('0953e87c-22e1-4ca5-8396-340815aa13de');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});