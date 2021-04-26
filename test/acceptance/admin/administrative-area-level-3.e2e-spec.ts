import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
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

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel3Repository;
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
            .overrideProvider(IAdministrativeAreaLevel3Repository)
            .useClass(MockAdministrativeAreaLevel3Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'ijzkeydi',
                customCode: '5l1jt1u8nw',
                name: 'y649y7uxprxxn9kngo9hdrbkfpjhjqcojz2xsoc8jnuyvz712s5dkierzzsxx6eopbwm8bk7iuudym6bcc2aoce7rv9mor6rpbnsanyzkgvc4pkswhp7qf4x4n1awn5iv3ypl0a0y0tbi0uabt9bpzqh1qrl3b8j8s2ry1zma87vxkzi9dj3ezu4kauygnea8ihbwc69oe1lvhnbqvkh5542evpyfv3wi2pi2ukvmexupdm0ixqgsorh72cgiww',
                slug: 'rwfse2gy20gjkbvet9un5rt1zgn7sbvgp32hia600ei08dom1t0qk142aprksi66iqz9v2qykuv4c4q6db5ikcdhpbtc035hc52136eavnns9p6esq2pqrty59i6frc1n9vw39d8sgjm2tmu30xwsye9qxurcc4g2en6aixkiikp70dft7fallsvbifkzu70qpbo0r0diykgny8tle8n7v0hko6o353g72vh4vtjjwvtcqrfpzgwnr6numqur6w',
                latitude: 440.56,
                longitude: 546.68,
                zoom: 53,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: null,
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '1nd6d98z',
                customCode: 'as3vysrhew',
                name: 'nv5v6vafhoshj3rktc426y4r48pedknecma1jsoofkxfg09khaspuekdy6c75rdpi1izjw0fzwgc4yxusgvwp8ku5g2pet209zdtlw2u3o5dsk5vda77s2krxu8l2ygv7bffl2v4xekvg99bvmkwx7lxif6etyabpmq1qmrhtb3sqd8r136snpj2sro4hoe4pv3ntahyjjtkow0dqjne40nn6r0gvjchr8f5ydvg0n78017z4drajtps5bzmp24',
                slug: '3f75eblz6cd5croer0jxazsa9144wvpdmubh8s8d7lhm0zwrl9gf1s6vzj9sy8ksm2y1o8erb3hwzlj0fm30w0us0edmzmhsp4gkjsbtb2fz7k0ui2x9amadd2dh0bndig22ts4y1ll25i1cx9ho7a0mxfgtkb5l2qxug6f7ghggkm2027rdkf8jexbn69fyujtf5ynswuw4rpu5v38yahcnvm75e2e7ateqe4fyjnreve58t2tqqwakv6cijx0',
                latitude: 901.97,
                longitude: 943.05,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '2mxq6trh',
                customCode: 'k5wl1s2tnb',
                name: 'a4jwm3ks9fnovrybvee9xuq2taidsgsdb6k5zj2pp219w4o7emxmnm9l6qr2go3gxg9krocrbg6nl2h3439wpzb3r01a65qy3ezxtmplc4g58k9biy77mqb0mnx6hdzmkya2u8l04oba1vgx4hrv7edrehq3enie5jfi9iqgxfc76a4ctlqbw5fk3ohbiw7qz054068bdv140v9ijv1ivozog5wud4skgxp62bh7og8d1ee5ctfug82zjk4f4d0',
                slug: '3vdsbyhqs20aa0phcp8mpawkysgofimsl126i8772gegdrt4drptwtczjybsu01yeyuxwq375q6uuadrs47bpvqhrhgr1if5fd9mtumaoas1jkndvtz3yjaq8fz9s7cwkiz1eb1xhrxcim3vchcm014ttxy956e83fb34ptcdtkkgrfh40dbcxogjynoi0c9hrogxgnt8f7odxbywub9yvrm4vk3a2elu6i8uw1szcf63kkrghg91rc072n1f06',
                latitude: 932.15,
                longitude: 625.91,
                zoom: 41,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: null,
                code: 'wh67r1na',
                customCode: 'kg8s6bc16b',
                name: '8t4l5d7b8wnxd4im3p23tnoaeyvvouhy8e2vvts2hal53nd7l2leqsheok1d7e0p1udq014g0q8saqse3hxjb17680gc6jxtbggqmtkedj7st222jv4xxltp98ultmgyes7oj6dode8v89tnxyczkfhfvu3habp0ezqrsmcunzolc2jy9aytjm4n68ahljf8tgc82f44vqq5s0uio78er8plthk3nnb16gxouji8c1nhowbz5fxtfkkxrnqz5v9',
                slug: 'pdfkgqslgsn9nz6wzp1mw3xx127qnvez0sssgp93q2jdcrnduo2r22k6prlsawrwm0lxfn3gc49yrtveeonaoerci1c92d7jp8pg55ue261urvtz3i4q5is3d07p2houek21q6flsuk3jq0qx4ptzjmloyvdpatcnfx9id8a6fkm9rmccimcqu405nnvq4le8igoj90wqkz32aq7uglgaq3sqqj9t4kctnw11aph5b3jah83bo2qgpnxtzylg4k',
                latitude: 373.75,
                longitude: 282.91,
                zoom: 66,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: null,
                customCode: 'uljgac3iau',
                name: '216znaec0tyjmr8tfjlbhotwkj3r0dp7axffcwoaho50npp3dgglvprxvvnise0bz5b2uc2idttyv1l8uwmos78ekmw95098m0mg2f9gliv5dzivwwc9t1l9ltgxc809zyztz8lgmuk40jp535eeeja5mc9r5dwtp61hds27vnvp5b5lhzwqeq9nw7t5wg4xdamxvj2mkexd4cptirym681atgwn1562jlav1aigqde0j93nibr44q2pifnf9rj',
                slug: '6b6uh96r4zazc009vipsruunsngr6dqovdnss5dux23yfd1lz6wl6nui997cq1izlgjkx88zexwxu3koy1rmauj1nx07mo605h7nr2waif3hewvvvbeawh9gjwgpq99lxab2255t74mdkfa7nexb1okh1x95f63cb9xchg2e6hjyj82ycbkjw06ibj880hsf32nsmzh96jw8ln7oo3xv85pbtkhr6dhzlmkwqqsvokdm56kgyj8lyf5gbiojisb',
                latitude: 678.41,
                longitude: 750.74,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'kk9ksx9o',
                customCode: '6yhkc8aavx',
                name: null,
                slug: 'rzwpgyi01nirlvpq7re4vnt2pl08p37scp29a0e1dp8kbjxdvo1f5mswnsz831kirva4ae7o65i2lrdodbyb7k5tx5jygmb487md8aw2jmutpu6n87vz85roy3w2uvbnh73uml1klkwqjhwub6a04jymr7mr25az5c0qo008mpy1yo4lekwm9b72ffqx3r7csoo5tj6qowyj0bn6tz31lo7fae6iu2nr2lhgcldngijwvh2w70e70z0dbnzerzc',
                latitude: 538.61,
                longitude: 951.50,
                zoom: 57,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'iqztp897',
                customCode: 'wcx6fseqeu',
                name: 'f8hms72z86n2v8q15nc628w8alakblrte6d1s12hfw14qv5mvihatf7i7p8hoq5pe7ejfp63xb574s2rh92tywleudeee279ui0pbgvnd932gno7rbj1raofv5447r063uue6gnzxvafh9xopsy36s77319obuz0ii4xj6u69gpqbwutzpkmgpbhdibrxzikeydq8ld3tdiszuqfwr0irfnn6upzy4w2lahzwrfb7vxpoe0q9db5svul4d5ykdd',
                slug: null,
                latitude: 645.53,
                longitude: 178.50,
                zoom: 15,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'lzpo013n',
                customCode: 'bdmq27ofut',
                name: '6xj1mxjvvo3ri6pkv1fej8m9s2jemjusltuicz9ho25sc2ksyouksohwdqzwt42qsan5857t3n21kckvf0xw19yx5l0o2qdhajb4nwci1anpyshvh2ieo9ffdy6vire8kziuk25dpuetjxlpvknhbl7hngfce356encdnpxvea44p3xhv16w3ww61mwfzelo5ww7bsycfcxirx2x1vkdk6lckzhvgnl3nlx3rsu33vhrnhhngy3g9hrfehqu51p',
                slug: 'gfsvmwc4b4nt7ed41mp8nolmhn0jw8rvpmd6rhbjvx65egvj79wslbi1c9yv2eftojmj6xdcd43dxv3bqc9852gmos7iexkjwtptrws49oyt9tg49t2oi199zn0a4k1mu9atgcmoosoqdcwsoj2p2p7i20vr4w2z5jycwgen1fmbe6u5mxooeo7z3lt549fi7bmbtq5lqzc4e5f0vt4hv989aecvzx2ps58wkc2r3ijqdgi1v08kpxil11whvct',
                latitude: 894.31,
                longitude: 777.65,
                zoom: 56,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'ttnl0xys',
                customCode: 'ozhtwdpkxj',
                name: 'qbsf4h0pp55tg062s6i7xdptpnq44l6hhbb6kceyrcebysy8bb47prjdrky8zuwnqttpfs5a8a50l8cdtea8bowuklwnxxgl8ouzg4efolr3r8v59p59duk4yemo1mjbtbnyxg8rixjm15fw8mb0q5tayc5tpijfu5yz2elxcljm17q8bfls89v10c61kqd79i1lto6uqxokn7daiteg7iluu5q08q29egwx2tj1znq80ghusjpc0i1ekn2onq5',
                slug: 'abj1pjndp4txhzxknsrpnd6lblymibgtvfgnppdy0l8uh37m04furxcia0um0xeweljyn36g7xcdvwwvncpvbwjabnljebe4jez7csmdegxcosy2duz1wdb76rrrtvy7nfizrkrza92tsks4m5ewrmm1w0d9yrawvqynctcqky390h7pts6gi18rgd3phd1p1cg6oxleey95qmedpluxkh1qrcuxcilmqw1z3uxugnro61t9tbzskzul0vwpefw',
                latitude: 219.94,
                longitude: 498.47,
                zoom: 82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'o1el2i9r',
                customCode: '12e9751t8t',
                name: '26muk68nok4frdz10s0j6yc8bw94pen58s96msnvej9qkbmxagpzmamwb5esskcq98rtro0em260blpys4z4hn2yx76e35am6nyymbxnpt4l8z2rrh7osey46z8qqozua2bnrdkwn2c9sm28p0lw0uw7njo2bj8nxnr37wa3d0t9pdkzz33209feiebpiixv7n1gnw516gq5zfir6plcqfnuqckr2p5zmskcbddb8l2unsjywjsrsizzbh61g77',
                slug: 'uuvbh2xq56k2kg9lmcz1tegr05zq6o2rg10kjlrnlajnjann6fscxq62nnuhryplo3jn3ai0nvw3vp5wfm4giikmol6m59vts8t75ei68kgtlfoujbo1wkgo0lbjhxk5unlf2tcq1hnutbpaope58fgznbio046736w4lwjdrypucqjxfei0fpdgup2ostch0iij2ss1smiprb0vpmmd45agt9518cmejrivx5yidraujx7srp8olhk2fqyfbsv',
                latitude: 569.23,
                longitude: 796.63,
                zoom: 27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                code: 'k73tesq5',
                customCode: 'bgm1dd55oo',
                name: '3lwe66w1c2hqlfjw6obssc7a9s0xzqvzfyuoa338f39396x9izcz7kz9r34dj0lh74p16nw1gpn5wo7vtv0zf9j0zte4sp8to1y7soe1y36m2lqxm6bjlgeif49bozqekk4yktock8a8zzdz5gav7hw5kx4y8ty4fptriuk9jkha54q47ajv9qd4dmzbrox4b4vd5i3yke8d418h7ux34rusd9shadkokwv9q7o0belmdv5ttfso3vg8ta4ffig',
                slug: 'qqgvrzimgrjiy89ld3m3kltx8mmzlptdx248t5wrrrdlr7h8o0vynhrr62df0rcxftzdxlspvl1uobnjmrmgvttlft81pt64b3ycqe474h6ibvgh8q2ot9sai7ol62q9lxzex63csvsoef78mm8qf37h8ce1rugppvo7ikwemu0d8kj3z6m0yj61cbs7sv14u2w491l3zutstiob87253tsul2vvyn7zeseuardpeewvux3790uzeem9w9a6072',
                latitude: 959.09,
                longitude: 674.35,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                customCode: '4cz55gscfw',
                name: 'xiuzb07cxq0a2lu5mhd9nfymb449s5ufzhcgpym0hzgx5u8ft3nzd6xh5198j9p4wicdkm2jeii2ukcx6xexk68y0aai5cym11bx1zquzilha8nu51pwjm6txgbxqnwaopx9uzdjyt23797f42mpfnpuc6ifml5vue2ydg656htozpviz2im13k6j9lmzh6rb5jiqlqhdez6xcfb6eqzj11jb152q8dtiymc9lnyazdgd3ko7nk51kk3hh6g254',
                slug: 'hrsd2sntjna2rbdrsnt1f8xotu8r81s53mgxsbux34ty9qgd4kx3ej1dukjfusnwpky077mv2v676iv20k393zd9pm9qjexu8wze9wziwqugpyybj6v97c7877x1foyqysdjbzxaeybojuszttambtz0x6mcvgjyf0ljehgozgphtkakm1gkldu5hkm76nb64xqc3n1345ejabn4utjsar9eri5672w38n5zet31u0fijme8wxms88mqznrjwjk',
                latitude: 231.22,
                longitude: 141.96,
                zoom: 84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'jfl7euy3',
                customCode: '2t134plz95',
                slug: 'pn1vzj60s0njfwirn612j5jk9uuqfgw58c2jgrlrfvq7lk8pxrbraxzgu6jpnqscqax14cpuc4mjcg0iu4qr0mg850mlebsv2why3u9ry7toa8jktb0t713nh5uee9jca0y9mp7zh1atvps0fd1mmyorysby74cemdhyznobij9ecqu32qcisq5phht25dzss5ojrdz2a9g129yvx0u9novyuff9i51woqydv9p0pm3shq8m1leoudi0fhy24no',
                latitude: 352.08,
                longitude: 149.27,
                zoom: 73,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 't3b5mgdb',
                customCode: 'm1nkvgqm1o',
                name: 'eg0ww8cco6oi1s36ifxl9cf4mhy1s700rrku79v8f5z3rgpbuzwlc82risnbkf8ngh00htra3zmaivue6l8aw2s5a0kc8cvu7lvvabhnaq4icfn8iohxdrt99axpggckvsd86lehgni2v1ij3hdv6g4jwpvmoglecuq977gjoxq4dxo22ejfz74m38y4stkssg0zu2rnxfpjivg3euv283u6x2f2kwtt82p3hig17h70hlrz8ma3hvvqmsauu7r',
                latitude: 89.63,
                longitude: 246.91,
                zoom: 13,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '89seuorjl0omz3ofi1qfphwpsty0vics2qykj',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'zc7l1r07',
                customCode: '8zosay0p8l',
                name: 'ds6s84lqkiuqn1vlhhtumu0ccyjyem8cv4gqbho3rwildkqg0sq4szxmjio9en0pm78j36hqecdzczgliapuzpgjb32bdz3h18yt2chicmk8e6aeijt69pxt4iyb5xj6czujpgrp4n799c4pu7nb0rc5uq0wkv8875x0272zx1zlpuq1vforiuflftw6r5a4yoybk7j514h1bs60di1wkq4nf5baqu5kx7wro0jwxep6ctbfrp3iq0vukddakrj',
                slug: '32gqvk5cpempvjrhk6i9ezbc9v8zlaas4ghegjhuuzv0p81rujcif81j3pq2l3323dmjv64uh5ek4szs4dzx40jcpsr0r86rxa2xps1611owfzh3pza6hu7icp773d8crl46nxu1c218pb0u96j63dt4pa84jw1j6o6w719aqis3jdo0z13grgam89r7g0ec8ja0yoilvrprb8wra1kjd82b9rujt46ausxfa6ps0dkzmsc5wi414xlt4wl0pp3',
                latitude: 182.45,
                longitude: 75.52,
                zoom: 91,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '69cy1aiqfj6k207xjt5x1wl8r9f2wpm18bv85',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'qtaa42ti',
                customCode: 'cc1d5g3o3y',
                name: '1zmlerf3pisjzerzk0enavq8ifpkbztxwxtk47loinbiuw52la432uqhaf238rhwvvtk3iigt94uqp6n9vi148vh0t0p800l70jueq1xiug0j61g0r6n047ct45saug35ieohiqnvwei1c5lcilduyugcn3n9zpekk161a20xj3jiik4qwjes2d3zri8k7i3ll8hxvn53tlqfouscc4vlfj4rsv4d61wp2wspv3yjuy7yw899kfk3mw5mrqjer7',
                slug: 'sjpiez6m2h0gf92ne1kj9s0w8v5wx00ii3l3yxg0t557m08cez6v8ruou8vzz73ggp6e83ci1s52f8mez56g56ipbu1j06mxlnedvs1wwyd81zholyuyu81jclb50316cwbcsx2fe9husmifg3fp2j4zwvl0o1j8q8fl90re76qtdlirb7lwy727ypirgewkcelf8hstu3getctp8wr92r6jjyi87aa4odtcheq7wgicv7yks3sbcni70bfomrp',
                latitude: 810.13,
                longitude: 417.74,
                zoom: 70,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: 'zu3aixv7z7nb5w8n8brjw4qn1w19tyjsq0sq3',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'gpuuc52l',
                customCode: 'j4fcciak0k',
                name: 'rezc3538pvwnnm0mlcr35b5j8h5r6apunpghncponzf3blayjlh79ndn016urf7cn71c00cf85lv7zwq8woh5t0ten4q916ioflkakb29ah8j9chaegw2gi0w5rdihhzm0dbis90bhpj1yg8428bp6gdro0ig3oxsmcutzb5rf1pgq1af0xwrxhrka8kelmcgq0t0b0qtpzh0hm7ykdbhhrc7qo3n16cbhuzonf8gsalqxihs68d5s8sspyh0r2',
                slug: 'enx7qieg7dh2acjfezjcdm19y3487buksw1pjvgfzrx5af8jds1rw8qpw8vqyniim10nzx938gfh7q2zecytvi7jlolzzpglwq01d4pp2k6ouc51iahpl7tq4l1ljjqqa6re8cbva28xlsxxe7q3giiuv984g3s5dhq2oe9ujeb0fe0rab1ovok457ggyxrgmlexiizyrkp86si0emlmilwezkpndzb3dwp46i2a0qs7q0g5gzi30ruuj6bdjn3',
                latitude: 467.12,
                longitude: 310.69,
                zoom: 14,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: 'szzpuytpl5cwvceue0cbh09vcpjbmzozhsfbi',
                code: 'wry56r3p',
                customCode: '9nf65834c2',
                name: '6q66md87nj7grcz05q0j9ww4ule9cvg9x36k2kw6c71knw9nfvqvkguwsp6cxccby9soyemreo94m63ckvzq63apn0lqu16ai2nhlo04vh4wgnwqtxd6180n9a3hbf9ylsgyyp4p7zsgre6txhiu9r6gdz61cy6e41czqx6btb2um444sw08k2352vqkz7syoj1cx7bgfd1jehw3v14zvgkj07ysno2047mqrl3a21f7p6sloc6j3ve8e2zt38s',
                slug: 'cy3i1eiktv0zxtgqfneg6gy1jmyvycbi2oc7wndkxacjhd9t7ystnelv3gt8gvvv4kst7jsefya73m9f08ziny0ss6ss4htjijq48jczdsqxclpqdi8xi8q2gtzsdqhc8whey62c0481fn8c3fiy1sfzcexox65qv4ua1hf0fvyhqeubobxrsd5yyxlhahwfql4eu7yyvryvql4ppjsqykgrrt1to8fol4mu3qoyhyt1e1850kce0arw012t4lr',
                latitude: 637.05,
                longitude: 870.72,
                zoom: 86,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'l5hjxwqyx',
                customCode: 'zg2lsgutn2',
                name: 'wcjz51k8agwpzu5yrn5yrn7k2brizril8ve6y65eeyps667xh3j3z5bf9138503n9gnxa3t1vnuvkgodvks5otapsbipmo6bed294y5wr92w0ko7ya2ha39j931fgy3oav6u0h170d4ro9bhn6u8953uae9jlq12yfgfw1iysi5vwqfbs9use8hruwsqtgmmc9cj0qzt3qqehn657vkkb16wd7oej2cprlvh2sca0944l4fd96hez4dwam0b74a',
                slug: 'upul9he98a4syutqllmwwuql28fp109h60n0cn31f5ftj6cc5x1afn76aby4vodsd8p7a7xz3qxkjbnr2i4ky57lx6b55tlsxkp9ja7dd61e2cyen9gi8kc163yu6rsg88lx9lt5xubwp6w1l9m7gbefohilleefd6m081g9qdhanjfgh7mvek7jyf6bksu06sx7lwvtqndggghecw49ez3g4hw0n3x4s6b8bxxxz4qnod0eg8jamcme8ydq1rk',
                latitude: 443.66,
                longitude: 877.75,
                zoom: 25,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'i87agbtn',
                customCode: 'bpl3072ywv8',
                name: '2authpw6pakzs3nifcek1o9msfysyb3wvlvz5gz0sdm38exec4w9fjh61961daev4ab3tvkl9x9xp3mt7e0g36dbjqhl6x72n3g0ntengrehogmk00r3oplv2ntqo0iggmntanrgtqslcohzd0lo81x8e0qdrglyvkgcggkn7nupmdewvm2osiwok95po21a1xkrp8kp3o70312k73a8ku1rtmgtn5y32mcyy3kv4un9ta6lvmjhnsj19kj8sq5',
                slug: '4ffbm1s20qecb2lrwp2auvgo0c9q4nsfb6y4t9r071yurf5jilycsqi5gnokjud9f6tsgbfsfti6qbdh6ht766mpkiolg2rqfnxjnedgzk85udpyvb3wrdejc3mzyz65mjlkl5w8hm3u2vt5mpmcylj42jzge1pb7a85bcpc7syzle9dmjhk9hmj26uayvxv16vo81vp0ewd9594vyaatbfjcrtc00r8enyrmy416ezae8g39rcrw4yx9d14dfn',
                latitude: 790.91,
                longitude: 102.99,
                zoom: 80,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '2gh93qoi',
                customCode: 'bo47qrwxb9',
                name: '7h5yuy1v3ltcs53602s4cavpml36tobv1q1jnqxloderxhoaq1fqasiq0pfq130pr5yz7r769d4n88lbiwq4t8faov9ufi00jc1j3soub1vqt3sp35sxutjzzq1e4yahvwwl6qzpqc87rjsfzz8l7wovq7960bcfb4gl7lmwzmg7ipw7a8rblbhxvz65tyy2zva214lu3w14cqksqjn4123fxmvrl4oq7oy1lobt3bhejkqg4heliepvj8v88wav',
                slug: 'v013u2ghwfw6hvud5o7j7wa54ox8zahif8guh21sz0aixqdu6spknj6kii64gcwe0c69w0cmftnel4li3gqgk6s4i8yq01pmv55cjlmg6ac90251t9qk7l8l491e6soad9ljfrxjjjajspvbdhaflrxqnvd7m5uha6we8f5w1pxcpxb0yleqhlh91zmroyicymoekmr6ota007cu8pae521j9z4zb8jtbtc9ifo5dn1fjfct5ksut1chqg730od',
                latitude: 444.06,
                longitude: 665.88,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '7h4g3b26',
                customCode: '4fwj4js3oo',
                name: '11asqxswecb4zu00qh5zrj1o877p1fhnd1tgmvs2wk6nasdupncz3ra7j4xtwfvd5p1lm92v6xe35qp9964g4huk16blszuhb9f5lsot7rc8hvz4g7lkqpk0k0nzghc4w9yshpt795jg0k9rviyiyp3qayxtrm0jmoc5lgj7pa6smlkx9nqhk3ca2r0uh6ccwzyzju9oc2wt147omo70wtjx2my2nu9s8lewojvoq7j6l93n4d4bh6l4nbownbp',
                slug: 'ovtlan18mo99bbzj4nmeis2no7vpvzm0sn33ayzox8ejhm1205nrzzbnmpxeostvlfz0hvdsuvmlz9wttc6nfqu0a06zqcq2ba1j5m0odya6avqpz7bw1ktp6nxbuucoy22owja8rrg8w8rmm1sqabbist1pxxyizifnwqw503xvj2v28ckkgy0w8m78s2ynsvc93vdhjss1d2cdy12gp7zts12l2upvswsrhkv7z122drc3frzxzk58mzjdhw31',
                latitude: 219.26,
                longitude: 433.42,
                zoom: 39,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '6wka5ha5',
                customCode: 'hp2ja8930s',
                name: 'afzj669yk06t5na3ag6o3xld6puplt6gkxumxrgxz1avrr6smwljw27e5g5fmlx33f5cp8s2cdj1934kob6xjq9yjy4nayulr90adnc74y4lvjspyl48hnnstczsv4wjns2mld1xz6lafnzozix6sa7gi26j1kaimj688a9uxryvladxhs63tjsx56zty77hrme1pl8vdbhklgq1w7inqy4slurw73st9ebgvaoezji4p2t6bx7nduscwr9owvw',
                slug: '1o7awtl5mbyo20omrz9s1byxyqqe5f0lghr383tkbrbxd4bbm1099pqeqyov67pyn31j175rjnw4p40b55yt8k3x31z0e70gqpp3npgzk5qmitymyiq5u5t613cyd3wq05mibwa6r16fs30j34zlw6frg38mk8byu2dtgiyf4pugqo4v1b5ljdsw7e3uo6lnz2zev4mgjxxqilm4qey8clg5f2wij8sb5ms5e3l61dekdv8z79wtoiubvi4l720',
                latitude: 497.76,
                longitude: 973.52,
                zoom: 77,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'o3t4tpjb',
                customCode: '9jf1f81674',
                name: 'lq4yyzezj02fo5ldprohkwg6a3jp5iqswnsqxpugyu2tbp5ys9l3mz4ohwo420eucwm5ssh6w77fkkmeh0tjidmakto88wzpdnluljjuuwgyi6ludr0w8itz8mmmzrb4bmdars22shx5phedrsrpp07r5hgymrdexjkxm86drsd55sjrbhgw96edluzw30pd1x8x7lshym1xq6lro2t90bji5i5bk8ay4euop8gnljf6sq8jla9hthamuji3xoa',
                slug: '3fx2i5dsu5y2juvdxastjjlj2fta5gv3d9l6jrr6vov5wy9wxf5g3v31sfx05k2bmykf1cr0oe3srsd46qj48b1ltohi2ebq3dsjad81h21cz54l8eedssb079frgbhz128epzkbymiebglg4jlv473dpiw5ib38x9yae9jjre7o8ziz3stmzsn4v3sdqcw4aedzdyvwtiefpvo8byqxfx1froc16b7o1orwma51kqhksg93jc2uup6xwxxh5eq',
                latitude: 106.88,
                longitude: 383.10,
                zoom: 52,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: '965d1o3u',
                customCode: 'kv4s9n3ebr',
                name: 'mzugbt1btt9hq5ub51fofvwyjjv8cw44x8s5hgk29e0tlaxyp1b0buwnmum1c2pfwzg70zw7kx3kkhjf0ezqhwrosbp7jskp62j4y5i12qctjkawv3e685hh43qh8421878lxjat4vyevnc9qfe1k07owkmqwqq4209c4dll2t8dskv62cvv9ry9wgkrls77v0zv1fitw42pxnd2m1c65134a9inxr46elv8cl2kxofdd5yb0tmyyoboc7cxjui',
                slug: '3avb7rozwm163j8swzo7io5rawc3epojswnbsr7wmst2rym1xvvuql5kcnsnxhflnx0d7efjb6nxv2lnod3e1qhvdey9mbo9knw3v2hsm4hyss78v71pzvhu7ndh2ipemsr4iqn5lfq77euwi55nv9sylss1o2sp43lcb5j6yzz51nk7ygcevqskiy42xedyaj2wt7xun6j39hg2pvh3btiutkh30gqc9v7ler4490dxsgt0chbya64txvohut9',
                latitude: 884.87,
                longitude: 891.89,
                zoom: 226,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'gpz0uj2i',
                customCode: 'eieuoeu0e0',
                name: 'x4r5rum639byixki6zikm5iirr1zo1q0qpphidnw0tqin03mg1m8kxrlijeckael4bshix2tcehjpt00vefwkop7an5r5dy0aqmgictg7dajnd4ugxj9ncyej3n42kqny60afh58ii389cpr2uyh2dgobfggb23vabl9shuyp6fxtfgzwhbhfqrpmhb7l9e9biqt5y0ebvvzq9rmuciala06txeljhaslq76ej9umk4yzp8v303y67856v1xje8',
                slug: '8pa9mbapcv9l0atkzajtuw0ucreoysxy7dj8kv06brb03liymhk4gfy31435erq4v71ubeaj5zudbg6fb2zddv62z6ffbjer1yv9hy2day0sisw4kw608hdpb8u0nah2wbmgqrv9an0eue43iwkviehr1u876tlu28qfpplvxql4vh7ygfy5x6uvgzruh1a9d8zzaan0u62s4nn8yauwsikkp139efj8oi1py2iyedlpabjwyq92db3kwr4iwfb',
                latitude: 152.11,
                longitude: 488.72,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel3Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'm3fajpu9',
                customCode: 'x70870e46q',
                name: 'bprihvbn20tktwejzpy0jy6k8cpzcd8qcuy9vqq91qgjkfn3rnx1t0n56gvaa2q80snz6gxpref5c4r1fv83j1fcdme3geguam1vl2wds1tb9x6vctm7on5n8s1insbw2pw5baf23vmmim8k51w3kizh516sdmrbcpcj7n4z23uv6xhneebtn3rjn3rajq221zmroukq1g5cl9m3ukwofa1hggkobawfaa4bzmtkqeq6x92rc9znnupeyujb2e0',
                slug: 'cm1eyi6b80f4pom48v0zgjbib4tcz79psqjdmo9cpdhwzzjkqfx0ssgbrmnap5r5iea5flafyybhdhm288k1rsf8aq23d8tkp6p89px6j2fkgzjaxohfkvg5x90i2whrj1m7cuqqa3tlbiqvrizrzxswnhx91pjembm68mlzr3b96malawfr8w74rkykph1ditbizfb061tmxqt1rw8uhpkckpxk64fofbw7i9x9mwquu173mrm5allkse77lbm',
                latitude: 93.24,
                longitude: 811.39,
                zoom: 80,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-3/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3/paginate')
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

    test(`/REST:GET admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'dda1f41b-0a84-4e45-9f44-53a003935a37'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '34164c86-e9f6-4880-92bd-a5dfea252a20'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '34164c86-e9f6-4880-92bd-a5dfea252a20'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/45faf892-dbf2-4dd7-9c87-dc667812bc7c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/34164c86-e9f6-4880-92bd-a5dfea252a20')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '34164c86-e9f6-4880-92bd-a5dfea252a20'));
    });

    test(`/REST:GET admin/administrative-areas-level-3`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd0e9256e-f494-49d5-af3c-d6faee9374eb',
                countryCommonId: 'b0715ba9-7435-4b91-941a-0005972ec932',
                administrativeAreaLevel1Id: 'a99b50b8-e0c5-4ae6-b996-c951fc441349',
                administrativeAreaLevel2Id: '5bcbd636-67b8-4c3d-8137-73f8b64b99a1',
                code: 'rhp5arhs',
                customCode: '2n1ftbjkpf',
                name: 'c5ikcu60j3fhuj5hfo0075v7s92x8jcwrmlzcqawyp3s8l76745s1wid8qf6b4vxdi2nvihlc7i3o0scxrll5z03hybqfdk7l2jki1bto3vo7adwyfdu8yhq0p6rm2ryzsk4zgg795nok169f8u17vrlgr5z3j5dp7gts3lstsu87yqloxnvza7tybqkbcfogu2f2g93q2xvwa59lii4yeek7g3515k4hvpj6r2pqgeuzbwg16o4zx1oeqqzuq1',
                slug: '0l15c15p9c2sq1rxv3j0rhlm8q9etipob8kv14umz384xwbs3t4lti7q84oqlek6g2vefgp1s7pyhm27ehodlbgqpm7fdyskc94jmaeutxw6nxal62849ozb56r4g7u160s07j7oppa5twme0z2x5x7xbli71h900gcagabcqs0v3t0r25oqb80e789idedbvo2m1j5awqzoq4bmbxb2lrzlgsjcun244gzxgh4gsvqls4laliwueah6wqs4bb1',
                latitude: 606.07,
                longitude: 909.40,
                zoom: 27,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                code: 'ikre7xfy',
                customCode: 'roupd99gpy',
                name: '47w7ekdb18c9rpbg7ogfe0c403hfppcx850zmsylot3c9z8rb4oh2gmz1hlxwj0ouou0ljerdbiu2gepgkvud5l40kc6pm2wb7vizmejewkah1mm1wx75xk062hytlhtzsdecbwn537xhhkme724b2ih8r1bb591b2xpuvt4enylfueocwkjii3zlnkr4lfyr1tr0cyd66unhtxmkb4tek2rye9wnsavmnk109g4tyr16i69e8cczdksf8oktic',
                slug: 'cvxap4xpsozlep9ibdvwi5jh8wtb5al2xnd7dqv9zbkuxojwskxtysbegumyi49aqkygkwvshakekg3ir1sldw4p2gh0w4zd7nb5r71nzdb1zikffe26grpu7xbdjsk045abq2ccyrss3nv6toub1dz2855iqw24fk5fc0h9pli6guvo8gdiggw7xyqghz4xzzib92wltwobowknhdgwwrthjxpvg52a99po6l1u19e6zw0w76mh45cl2o6evaz',
                latitude: 673.51,
                longitude: 257.42,
                zoom: 83,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '34164c86-e9f6-4880-92bd-a5dfea252a20'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/a8e5ba56-344a-478d-9682-797ea11e785b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/34164c86-e9f6-4880-92bd-a5dfea252a20')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '97a08684-f053-4de7-a081-37c04699839a',
                        code: 'pob5pvqw',
                        customCode: 'lx6cyj7luj',
                        name: '4xj8fg8xxig2v61t7iun3zpbfasw9p92vkd61vt6putt3wzicooek6seykorhet8d1flyhkf141uqfpz2wxg929iap0b17fvpthfisxnv7hduvh4aieq1xjf95xpq9lvvaznv59diezwo8vv4d8nnuo8sk4gf4czpacc7xjv7tzkagl2xyrnhkxk62pxmxjvslh7ul7r3y732jq5rpo13m7qey2m03acipd7vfyaxj8vwkyh7udfvyi5g6tvfog',
                        slug: '6wiv3gdhnpmuakqzoan2qd99tup97oui4kbjyb7vs7hrb0r0syshpdpdsba29vtnt98tgh6px6ay9tfs6rq2thvm2ifn13g2ez7j5ctwr9ixkngfq7q0nbn47zya40tqj5n4txhei01lhkjogvdysabptv4daisjvz01u4m9ksptwat42p89a35nymm91mvcablyrayqn1zy0h7snrhqzu95equxftbeofihet495w1ny88om1avzfoks15gfdp',
                        latitude: 734.08,
                        longitude: 6.68,
                        zoom: 10,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '97a08684-f053-4de7-a081-37c04699839a');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel3 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '1e32474f-f497-44f2-b8e5-c1c46ef08bde'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '34164c86-e9f6-4880-92bd-a5dfea252a20'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('34164c86-e9f6-4880-92bd-a5dfea252a20');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '680874d4-a871-4aa0-af65-50708372fb41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '34164c86-e9f6-4880-92bd-a5dfea252a20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('34164c86-e9f6-4880-92bd-a5dfea252a20');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel3.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0c3a3b46-5efc-46a4-bf89-e74727edfc2f',
                        countryCommonId: 'e799dd25-8b80-4250-b221-6d10fb55118b',
                        administrativeAreaLevel1Id: '86ac4503-6d9b-488d-9ab7-a8d66d0387b4',
                        administrativeAreaLevel2Id: '29fb4cd4-ab03-402c-ae7a-cd79a86f52a4',
                        code: '8is98o5v',
                        customCode: '4ds6akwpsd',
                        name: 'ywpx9fazkkuf4nlh4rsgpp9743odeb7jaeoct36yyr3ydtp8mo0m17xnsz72lebdvj20e52k04rcmjl2l1feqi5q67viraezre765s0pp5pcjmv4q6r3r6lgom16onhtyqhonjd565n1haf7fufk3qu4yhlj7m0u49fedkd029tgvdwul91afgvwx2ojtlnrd8fwh8y20dndqhwanjp3b5uubbmiwtgdmoxxzvuvgte5sgqjwprgog1rlnmdwc9',
                        slug: 'aob9q64b4dwa1erbqdckfi82ch2hw1y9cc0hek7da91fd0be9g6hnogkbz57d2814g70rsw3ftg5qh81ddgu14uu70n5s1cedpw6hcyhrm43c76dqotrmd51wf31k86alqsaff44yrpk8lloidvnqpdlcnqamy2qof1mk2tjzjo4hqcuei0tro3l3p136ls2brx7eq2gqvjpb4w32xuo98sy6njl1wsgmqhs7vh84j4nay1foy0l34ebnxbtnmf',
                        latitude: 49.87,
                        longitude: 154.46,
                        zoom: 49,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '34164c86-e9f6-4880-92bd-a5dfea252a20',
                        countryCommonId: '5e84eb4d-2e00-4876-a0f7-ff857e0bc863',
                        administrativeAreaLevel1Id: '896a45be-7272-4ead-9fa7-cb56d1a656e0',
                        administrativeAreaLevel2Id: '836b674d-7db8-4ffb-af8c-cbccdba35af0',
                        code: 'brmfo3xd',
                        customCode: 'oyru82ujxt',
                        name: '0d6cgwklxb1by0xke9cfbqw4gz76or1ihl8ssoe4pldlphccx68cnqd2vqrffdjo0xhuw9lbwu370a0yvm32mg89r1a8bhv1mb9c2hb7whq7d337tc00wjzsjgvwxuy87n8722nmerfp22gx0b9wvznjz1q82fblh2uzo39zjrhnq1yg57bn99bq6g4vdafmo41fdi5m13mclk7xcbeklczcibrsw6qe1eu78aqq74pulaz7l8d3d3bg46gaag7',
                        slug: '4vjjmjzvmvfmrp6quaptp53ttxrk2icre093537yy2krfvkdpyy83ezanacw91mr0r7r6kwenco88ltyls5r9pl34v7yckl1ff5wu7k2gd6t3i94ucih67d65ma250tslpgw727wj167elrzucfb1l6mxzkeh6xgfbvbj7dcx4mxk90eygdykvjguixsv4v8i8yc458dwc3vos4c5by9kkphtbc5coivg0bxd3woentx1zv8vz7jn8bat4j6xsu',
                        latitude: 64.88,
                        longitude: 583.45,
                        zoom: 17,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('34164c86-e9f6-4880-92bd-a5dfea252a20');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aa926901-02de-45cc-892e-b335eac05576'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '34164c86-e9f6-4880-92bd-a5dfea252a20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('34164c86-e9f6-4880-92bd-a5dfea252a20');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});