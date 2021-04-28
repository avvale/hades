import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: '67052f9b-d805-4fdf-ab31-72a018f2c99a',
                code: 'gehl9rte',
                customCode: 'i7ln4ick75',
                name: '3f7kidhtexs3q2npk7ia9mn4xvrk5lxbbtd84cbcke3k7tlcxem5ea1dsfb0435wighenu8v4ci75d2nlcuws7jqnntygtsaett02d6kg5apn1nvrnu1a2eklmlqzejfruybkmhmqqo3h9p03yomn9mp30sytw1xyeg1q6xqlcjidj0d1qbc2929ubaoc5aozeunzy2c3a7s9zjimf2nlqwwqwjuwo3xofmbavzspa85rtsuba1644qq8vpy4mk',
                slug: 'ca9adqq2vf0k4zeqqh3jbt4txyyvrufgo8lmw7l3wh8pug3a7h16b7kf9mpywuhq8xho1otrqbr9el382nz411ib275rqclpkm8s44s97t744s1gzy9r9ozhp44mqsgsb7z87l6etcqktqjum0ainr9dbc1lch1ik8h31dm5uje5zcz71q5oq91i4ppf3cljkbmpx1lq0m8f4kwkawji65yuy3ofpjxvbuas48x5o0wrrllu6g77yj8ujravbgl',
                latitude: 87218522286644540,
                longitude: 21323459231155944,
                zoom: 46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b4e9eb93-977f-4104-bb62-b20aa1988fdd',
                countryCommonId: null,
                code: 'ldsjfnd8',
                customCode: 'ofy8izzb7a',
                name: '8o7l6dnqc1b9qioq0rwuzf6hqdhmonc8d08v8x19jctnp8zqvwln2z998s4psnnn5itbeeat54wseoxjkxcnu1za7lpvty6pslwfzumcfcgb7scouw79r8maxzuxdi1j6u77yzgr68jlzfigpz57b2gds7ym2vsnorxmxsqg4acsg2ng90vj23l3lo7n5gbpovsyth5evjleewwbb81ej5kb2xfrlmapg5z0nv6pbgzc4h6pcpz6oj0455zkpaq',
                slug: 'jg7wjuknb8712f9c35j4amtd9ejgj8o8jsva5ojdr317b3shxtsn8wnnubg8gg0l2zwjgbkl8cdsoggsqkwpz8gn8id13l2vemlqwhsty61vlsnd1wwb6u48q063ttp9zjfazxkg2cqbvxvrbtdogqx7glvvjv2m8ds48keqvifgp3z268tpugjxr6kdrfmmgxy2adm99q1xta74j4xi3wzug20o20gdji58g18oh8j57fuu6cs22bos8uf5s9d',
                latitude: 28276062432703990,
                longitude: 33943662791933956,
                zoom: 41,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ec5f1fc-7c52-4fda-9d99-115ec73d6918',
                countryCommonId: '8abdeef5-233d-4af7-9e8c-d349f63d5ab2',
                code: null,
                customCode: 'rbcv0z08b1',
                name: '1tws60pzlkmb0mzzat3txqapsrpwy30maaniaozwsg6m62m594t9qllon0uet78sp2k2k35s2fv5r3g0h0tf6l2ze77fk6ud0s52au9llfn595hm0mzx81x8e8hzq63cp8dy9lue59ycnzhwjjnk02p0dzp25xepi7c7tmuilt4jmjj64bjylkq6mbdbrgfothgwlnynzxw9awh7fzgr7rrvkoevfcmgostbfphdbahv7lm6ihb0sgnikb14trw',
                slug: '7y9n1iek25tbie4i375q2sld9t75gxhx8ginyb279aiansc89vi8hxq0i5kv675ym57h3hwgx858j9mw4jj5s7gpu23ka0pbscys5oelbmnzpbxytm7kegglprqde45hic9z4csoc93185dogqwaxi7zj8pueli54c7vp29vayhyjse1he518xtljb5m1braqjiequ1qhmocxkidk3q7qk3eremaay6lr58tgyb4ohb9ofbpgq9mabd6dey6vqd',
                latitude: 26115679514363790,
                longitude: 11423667738217090,
                zoom: 54,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f8edd984-f7a0-4884-9ce3-a1e8769a05ae',
                countryCommonId: '30c2297b-3c5f-4e34-8e24-b9278fc0878d',
                code: '4xspp87m',
                customCode: 'k11pg0azb1',
                name: null,
                slug: 'to39kvd7fs4mckvisi1clk882dh3r4wnr8z1b33rebbutmtdtxqifs30t38j5jv2ghraomtr56kjbhp95uncdbhssmd2oqd32ob5funqnx8v5g1nz72mohywqtd4prk2g396suc0nbl38igfjlza1p7pf5uiq99voutk3t571bymzc3q3p1zbnj0j3nubygy0aqc8okx1vu99c6jhw1qiv3splt33lcjho28ryzbw7jz8ixm5tdwyq6yikxjtb3',
                latitude: 96589781019916620,
                longitude: 27775479051726228,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '286e9741-cce2-4098-8ff2-cd25587a0aa9',
                countryCommonId: 'e8fde87c-6b65-420e-9c8a-ed4d3b380e84',
                code: 'ly8elc9a',
                customCode: 'cmav5pyt8r',
                name: 'uo4bxnzodjezt2pio7cs8qjn7pynhavmb1y1qp3lr9b8y8ncurl8q3955olvlmb6i4n88jhz99irkb4pai0oq1cgyyzygpa10zzq9qvasd8e24v1whwpb4wsaeej2p5crmyy53np4pb8209oy1zcvws25b8ggu6bs9tfna8idkgkopag67uosmdzh87nq46bsydxw03g6giyognk7721bynfbbf5ztj30qe3lvdou1ahr1ats3mdtae0f8lhc91',
                slug: null,
                latitude: 23052163187455504,
                longitude: 90922944537350320,
                zoom: 80,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '6f9992ec-c745-4014-827e-324571be6984',
                code: 'cuewqv08',
                customCode: 'qq62ci5cr0',
                name: 'cevmtay7xjvqqburwvnj88ufrvkwp676spsacaxs3x638hs7rcvv90qekz1md2cd5dp7ulxtc1o080qflc5k9yrv6nh9jm5y8wga566tvblcn1ejcsj5i9i8p8coxo9e12o8i185bcekpmsu3ef5fycua917rkefxsoiggllsthwspbgzfi01z0ousyfp3fctmazctc1y6l2wezjlerx7khrw4cgn72648vpr7mgpdda8kfgyl4yrtfoesxrdg8',
                slug: 'vx6ovdtaxh4v29ulac57h1ax43z5krc2rmwlop33jt5y2x92bc26qgq6bd8wtim2rpaosvcjc7r9whyq87ymfvehasl3lzcxkoa7fk2jpe1f1i9ug6nmwom9vrum1nawjnu1yupn7gy80gddburqhp05hk61aohdetfmurgkoeyp4t6k1fl24eicbufk6a4colmaq0cj5q7nkj5p4v6i9eg4qr3tzas3wryfq0k88dsmqu3b71yfvto0aqettlv',
                latitude: 32923353206277080,
                longitude: 43327056881873320,
                zoom: 38,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b741c38-359b-47b5-b1ef-adca7be69703',
                code: 't8va9ymk',
                customCode: 't2cwnxoayb',
                name: 'agrqh2kd9av62ldchbc6vwk9v9fw07qsvsigli5qi3z1o8eo4gdstlnk3ujnxkdyie2fhrm4y3rw0u924codjm1imoe043myfws0s2g7p8x0ik38daif3gjkayppoe212j7hug6ry45n9e542bpj56nbv0crm9xblac3uga0tmlwo68lh3wo3wubzgj173b5trpyph7hhkux4d5zqzyo8hy835t030mlsd3ne6f7kkf141zkirkjz9beqd1tgvp',
                slug: '6cl4qzv3319tldlgtnx8bx1igkue94uu7sc304096l2jjrydga0ub61nn38zh7hbtwb9yfuxfixkwxu2gnxxbzylrdx086ge7jtvz69knpj4o4xi3va0rznrzjgcr4ueefdsncpzn3cq613fn3uip3r6m4uc6hg3yvymiirmn847g3zdgxjprntog3rx6u8rhy7m6rqva9jtpceej3yixls31thaj9judmqagdxvc4iq2r7eh9c2gr3fkv6647o',
                latitude: 67758932130800510,
                longitude: 35866416239565804,
                zoom: 82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b43951a0-05f8-40d7-a03c-b546c88909e0',
                countryCommonId: '597d6c69-82f8-4c50-9a7b-20f824ebc013',
                customCode: '22mw40s7zi',
                name: 'q8y1wug82t4wh5yhfx3vu0xwrtqyt7q22m791lda6zn55c4mg5l263ytb2tqdwt7voqvnav6i6uuiy4h50efyejgw3vmr1ak6xxgbyhtb2pxnpzqcqt76b4i8bryw1bc6ynk9qyfzhys278ueamawvc6wlvffwbeon85nchiewo43dp1kj69m1zjohpl17e8waz5oio3s8ovytbscp371p75bxji77rhm75jojqq9mnltjsa5vprsq673m14h0j',
                slug: 'svpqj7dtogr3aolbfz0feys7al6jz01l56750m5zfexzplb3w849izio92270dcj12xreoxriav1wlhwh9fr3w3lpnzm2wv5e9kzd4rr14q6w16gg6d57qxeinupewcg6ahk3ofdf16dz25abdanfyahtnjbmvcg48ofg36cqhh3j2ca26gxr8zjbjn56dtvm94lg7kd6ya7i6ei622kq2tbyzrnwk586wkk750jyzgixvbt71141p0m2tva16y',
                latitude: 83293124426372430,
                longitude: 78216523913696400,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b91c375-5b08-49f6-ac91-b4998ee17e92',
                countryCommonId: '4e03a1c1-2d6f-4869-8a00-3667571a9c30',
                code: '37p99xw0',
                customCode: '9mji4t7dug',
                slug: '2fh4fxr1tr46esovzkgw7otb9bd2jnh2izzwu8upoqsisi9k9hmhkzotofcpl8tlu0bdldij27m2ylxmfzifg0raszluuwsttpvf4td3h5c5r72q0mujdcnxq12gzdyvdbu0yy62qb4bem75y8k1hyaosht91jh11084y9d2u4x0rvugbc14oghttteftweo3y833683y1sts8bbvsk44awyjhie8wj3uaai4ws0dkkcjgqwshan6qhpvqkvmh8',
                latitude: 19129960990427988,
                longitude: 84617757816376400,
                zoom: 27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'feb0a5a8-308a-41ab-b4f4-1d2ed22c9cf6',
                countryCommonId: '12aa8c55-a44b-4664-a2c0-fc0cb672f22d',
                code: 'cbn8nb0q',
                customCode: '5tsxzjqw15',
                name: 'k4pg7wpkg94l2hyuoxxarp5kpnph9f0jyk040sj8l8r3nsbpl2jeod7m6u3frt5f7wqc0dw24q36eewdcvj5gvx8aon8t3324qfmr1h2d9ni52zzyacq8pr3yejavs8343j0097fg3osx40vfzlkc1q1jxbvfmsuosf77d58852p79ar1ouey2p2t0mojtvwsjol4bqe1ltcanyz8xhirdvbu7ncamys6u1v21dapvnxgcuov6gwyjbjwqzzp0g',
                latitude: 78188621288377250,
                longitude: 74931863133431780,
                zoom: 81,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2vdm8bt81g5j1fb6l29so3jyatlo45lalqbt2',
                countryCommonId: '332ca19a-1ea0-4744-9e01-d9f6c1571b41',
                code: 'be0qsu6p',
                customCode: 'jqxvzv37sb',
                name: 'teihno7o5dl8497zg7jnoowlfdoxag6zbjkpqti4c2dowb50nier5ily8e3agrdtz4c8hmwk6yto66kawl8j5tjr9tgqcwrra7ng884wz3kbcz8ybj4mehsgy6njdozd3zq8vr3qoox5ptu5lrnrmw0ympr70qjnausr8wnbarowpey5agi68b1gf4576sj3ytel16tgb5hqdxy47w5q8lt4jus7w97h7jeu7q8bse8k4fe15e8dzoj6g3hf513',
                slug: 'jaa7r1vgdw8586at9b1eprtbfkttdhyox45yalrhb1qsze1x3qt90ml6bk2873dbfxoqr00krr2nfpreuelmht9o3ox3zb9fkqvosrrnllpftvqr95l3nx8ukepvt6hedx87yh598t2gervp5yeqvan4u0oykxevvuz5txi36xjxz80dqfa3fhd8h09tl61esr3wkjqkjxflz1d3vz30c33uv31x5xa2bpa9e75r6zyrsshe8c55m6cla1ajub0',
                latitude: 76498171192120320,
                longitude: 60556346135219110,
                zoom: 35,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '59f4bbb6-af16-42d9-abd4-eef250f6158f',
                countryCommonId: 'q3byjkin1eydi0zumemnqsddvlkjwbgn529w9',
                code: 'nxs900k8',
                customCode: '0vje0stu2u',
                name: 'owbd8cyubdpq0bgxii5xvqafagnpgwz17yevzg5p9zcx92ro2959rs2rcilc81dk9jfvavg66qrjcsrm66cpjj8ri8do29c7ngr7836otghopxl0fhm9z07hs3i4pt1m7a0izdt2molr55eqe7kjpk9qyar4v14q2r0q3qh58wta8c89q2fdabn3fet2lhbyod1bx3gje4m79p9zmgmcfo5x8i5onlbapuhh0mw3ilhzhcx8b6tza6yks34urur',
                slug: 'po1caumqs0zdiqe304e8qwktkyz0y7wehudtgvwumroh6lvr024bhwziwet60wxdjez9cx1thvae8t531l2iifykzocqfqdz9hpayiziyrk9bg5u8zv3n2f9uhi7cnb7j6w3bro87vq3kr19oirajxolu7o3w927iizjg4y5dkv5eb6sa5z6trur9gg1km6jhloqug67nsabkclug7ozd71qsl083x0puy2p99yp35yvt7oy3hsss302ji2uoj7',
                latitude: 57263454561776500,
                longitude: 34722859601345230,
                zoom: 33,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2509d094-5966-47f4-9d4c-bf1029fc8115',
                countryCommonId: '59003d9e-54c6-4db6-9285-6fec0472d687',
                code: 'nvpp0ezei',
                customCode: 'd2x37hhnvn',
                name: 'dcy3ray521d6t1rumgkmx4m0o2cxs9zw9e7uoaw2kyx19lfk65779gzbldlpyn6h94itxfv33ohwspo27k22sdsdwzvqaimu7v36v4yy7aq8qplv89w42a1zgswyxau8j7spvrfhjlr2erarjp3ri9s77qxu9vrvbkmw3z3unwmnl6cis3ivxz4mg3eq3g30dd3r6z7lnztnbwkookfioipvcitlqm6kwh2oymbp6b8ekszav786glpgkmjcm81',
                slug: 'uihgj761pqg8d95vjh5u11sy3vr7jvwjwqns9u2t7p37u26szjj5ywnosyzr4jg7dhtc6rhmmsggs1ivb73tezf2w8e71xk9a5mz8d6pcsanr9w0jbtmua4ob6lt0g2j3bnd75s9u1kqkzjx389whfqjrddd8k5wyae5dm63yjda3g5owgq7rqzdmi9877ibxth1lmp31qac64m6jt6qppxij0viv19094ntbk5t076wpbay9bfgh1jdaue0ja4',
                latitude: 69146835888666910,
                longitude: 31035973254757600,
                zoom: 23,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '385ae2f3-a890-4171-ada3-7208c1c9d78b',
                countryCommonId: 'd06f0061-8725-4c8e-acf8-1788c921a9f9',
                code: 'j83o09o4',
                customCode: 'r9xe41una26',
                name: 'rqezk1olt7lmpapcvry7u3m6818cxq3ueuq9jxj1l4rr2j0gt7c07d1vvssap5d5t0riprqpcdd6qd6xl7qko1g3yy1cgyxu5d37pkd0pejte3aikv50m69zt7760ly4ahu8feti887pig0c6d53z1asojqs7ml9h04ubl8e1cys98z6h1fksahl6betv3rat5fdhgpv529ne000pwfo7znmjvm5y28j3gjoyi4ktizju6jxvyepakvi7p526nq',
                slug: 'njsk54a0uibtj2ldx5r8cfmxo8hnukl6e1e00n9f88e1bx6mfgrgodhba5lnvhonfsmubpy9zw1b2xf65s03xwl9antimnws0h8b0r1szbvpfapfppmg0lee7tiw2zoaa81jvlep1pxax5aggm2vusytiemxcjqdts3k1p54daeqcwzom3m1rkfqiuce8n1sju0i831h4y5pfad55kp3cw23n80i5cc641qupvn82f8uf2j3zcvqn2yez7s9y33',
                latitude: 19246819213599160,
                longitude: 78657201371045180,
                zoom: 26,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7e4a7de6-7ed0-4a12-9949-b63bb8aa4027',
                countryCommonId: 'ce0272f1-62b2-460c-86b2-63e70387a6dd',
                code: 'bloaxnry',
                customCode: 'mqfipwxnjk',
                name: 'on1uparbjia5qethanvzor9ihli2xwerqypapqtuddhur5piwiqccr3p4rgabka923dcc9l4khcc8lvzks9pfbpf64ya57mqdozh7qpbqxre4gpkuiacfdrwarsk9nee95n4z88mu15zsxtl06ur1bfduht6fkdplhl6rd161ve8m9bddei3m25d4o4rx4k1nkr4o4q1iy68zyvmn1zpwbbrddu2kk4zdndi7fqy59y3eayg4v8artb80wg1n9rs',
                slug: 'b976kaz150gxufx5o8kwnz1lq9ynz9u4g55w9pga7h0uiz1h47l9i2o726ylb3xhmvqiyvbdugbwri4k8rzsxna5x3xlojshlmnt549xy62v7z6ed34uvb7a3guhrks4rxpb5a9z3l0u87ug8cpyrpsoolb0i2r2wg035iii5njdbiuj9hjprwzdjtvvldg8zu3rc20znc3pj7bmlvxmeqikffwejddik8n6xmm84nkghblt23n4ueprr4079zh',
                latitude: 15342948431717748,
                longitude: 32418644572280612,
                zoom: 62,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'faef97c0-5f22-4dc6-8273-67c168beb7ce',
                countryCommonId: '20617982-6167-4762-a317-bc3df12e8619',
                code: '9ocystlq',
                customCode: 'dfn28sht8m',
                name: 'wxphgc4kcwfd65bssxq1z1nc4w40gpod0ou6ekwnsbswexgtpz65ck31y1jo3b8bgfdpuf1ak8r4cb65hv9sfilx2107nf5g482v2etat9bw22b6g68viotj2tvhm14cj5hkcpt781z3oubx9llf0g771i3au4bqfvucf0nyiac92el9fehtslma7719aaiwoemn58r7flv1mvwmgmblni48rpp70r6jv7a2huo5xmczi5fz3zfp6v0yqlv77ed',
                slug: '9excotruoddwsvtmatk0k2xxk5jymjwl8v431qg4ry39127wzgsbgbqu33vyaeokipqd1wdu1ad2u8uixi154s9gysg3ca7zq0d5350x97wjr6ilh3ac6msfa1kuzs9sxhzml9yye06wkf64ed136m6rpkby3yf0b17an364b80t2f074qgzxnoklqo32visrvl1nkmzr6vy4bmb3fmpdtgjiq5aq4n5u6kqvee72zsg51mqgathjl531jv2c4hi',
                latitude: 69985104826727890,
                longitude: 32129876679313390,
                zoom: 44,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f7398d2b-eb2e-4e08-8ecf-9af5d5140615',
                countryCommonId: 'b02d3d44-ac37-4a9e-b448-f55402491f25',
                code: 'ncb4z90u',
                customCode: '3k6197rjfd',
                name: '96my4k7gimww9yjrpl0vnt4gbwjyxuv2k651hxtqlgdqt9b5zb93tkgothlm2b6wf321ji3yiii7qd4e5yf7thbh3n1ri5hghnsv3l228nol14ngqcbz6dp612sodmlxq2h8j7jy8v2ah5r01f679ultg1omquysbmwvpm4u9t6paulr1c8vi7lv1eseor3jqzoea6q3di1s6cqdysrssqbu8rnhxwzl70rifbv5nwkip44g5t4ue05uhgiyi4i',
                slug: 'g3uf2hfdh7qrrprr8l1nthtwfncjv5hgjqryapi9cbr08y657u6ivhyxhxcupri90b9rnda0o2w44rekvwq1u8ypfh6vi1m9fppg71qighg56pxl935ycuic6xuir66gp8z25nk66bhofyiynwavbiin23t6pr7irlfqj5trdhisy55gnxjy0fyvq4tg6yhlfip24y11549n91p9gs1cjue0wpn8e46e4o5iqsfr77eqfiqhv40s8k8enyrf08b',
                latitude: 423384610150712200,
                longitude: 22095433431802970,
                zoom: 85,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '47255977-fd66-41d8-913b-dc902c9f4d61',
                countryCommonId: '2211c9dc-c25d-48aa-aac8-3d7879fde0c5',
                code: 'hgsrkm5h',
                customCode: 'hwvmx88wm9',
                name: 'f6ndxmdal907866j5ljjl9amg4p8n6c6wng5iqt76d0syq7022iqcu5v5zs3ph3lq2i1rt7gi5z7ca95twqy09oq554jac8l8gra01y2ie9xv1wg2myw41ou7uiwziudld8zd62k8326bcnb86sc0cv0s183y1sefdzhqbma4guec9ks4la6tfbnoredt3rpkxsu8yxm82eb8njtvg5jsko99b145fkgd6nf6bifqhpq7cntk8dv7szw01zp5im',
                slug: 'q9fth7w8pr3cwavxd5xfw5x1waoqlupzb9rz2abczjdi5n31utr2j0652gzkewq1ysf21pebbnrrdgpizeh5p7arq7rai46jn9w29a06y4g09x6h9a3qjwvvuya6bvp5f30pxr0wldbpgh5n0p3rrz2hgj85s1sg9158dfgyadsghhs41k0rw4ahaop8no336520bqilzor0zvip5xkv17i8p7d6d39lzjffnwphh7dy4fwqmx969sptu5sm766',
                latitude: 30787278711537916,
                longitude: 843680563506594700,
                zoom: 63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b61845d0-7032-4aa4-a0bf-e0797141e912',
                countryCommonId: 'c38afccd-b691-4b74-976f-165a3beafa6b',
                code: 's7u5he7r',
                customCode: '7fgxffzon3',
                name: '8mup1gzvyb149m9ffe0os2f48ncq8mpzldxtp515ftlbek8wfrqz2o8pcgar92t4pldmy97kgi9xuc81oyh7lkclm1qdg5ub1fs24z7ahz41cjzz8kbqc0m4w5lhp7o6em2asjswt1e9l3qohoptqeqok0g80kbpkbkafg2crsf8s8eqf9t3kbexz8wy4808ykgk47t3w7awdz91htatasitnvblellhrx2quml13qtycjjkf65bqj7gxl5zqyy',
                slug: 'g9d79evtj8t2h6trwwx4es6tkalqcqveto43cz0ioegu6ddaagokzz83eoyvt9o31dlcqg2bxb96s2uhi2lkj1ziv48txfh1f9mf85xqn2o0oy8votokb16p1aphvp41lk771te2kci6ak1w878bqylkljnc5ghalo5qy0ta65dhue82seafl5l6xs0mm93hiwuag80u9mbltn7z72zvx5njccgb0hpyy03aqtr1k1199ylnxraz8gkdfhdnqqh',
                latitude: 11337481231535566,
                longitude: 21862796056376750,
                zoom: 906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '07bed8f8-c5b8-4070-a7bc-23149053677a',
                countryCommonId: 'b5b96fd4-f2ac-4513-8c5e-5868c29cef08',
                code: 'z56vldmj',
                customCode: 'rkvhmarwwh',
                name: 'ojcaia6ofnlbyge5q9uevcnzvkx62blj3xeddh55al0q8psytbmj8ick5gt4uubplayy8eslq64f67kuryg96qgp6lljbpzovtj3rcnvcmfoc67ql573xblyoxv1mmtzkwczd4g5ww7i5bds1vu43mjtu4ddw4v8r3yb0vlkx0u9oy2ffvovak1ozb0bvegkk4vd1kwb0pr275d6ky1z7tkwi6156nt9bkgpxye80jr8v64ljoruczu7uurcz2h',
                slug: '4uugk0abgiijhet7lwoi0qyu4jtliugm4uih92y91oeeffgru11r2w6mqkbfmgll0ot70w23lke4yimsp99vsj1s2shj9lbazh22qg9ojy9cj3oydqqr6js4402vzc9l84hbehhbh07s92s3fkq4opgkzoisrpmazto7dyi6rjxpcqmwgc6si0bzqlalt9rzzdst0mxs8zccv2nlpyl55tq5kcbh3llmvft4geiklv83lmva8666wcdrpx2jyky',
                latitude: 44433744912519570,
                longitude: 43598678954467470,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 32409588176795452,
                longitude: 87557647984153520,
                zoom: 98,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
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

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '8005da80-0d43-4369-a7a6-a26f4564405b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
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
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/cf209bed-7dc2-4ab4-bc5a-8a9c180497ef')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                countryCommonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                code: 'scnln7a3',
                customCode: 'oqw0khx3oh',
                name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                latitude: 49852823101601970,
                longitude: 91166364718533400,
                zoom: 29,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 17339100768256676,
                longitude: 61168176248363500,
                zoom: 62,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/ca861735-a62b-44c6-8a70-67db83184c53')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '04528622-f7d5-47cd-8222-7ee846d25259',
                        countryCommonId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        code: '12v8rbex',
                        customCode: 'ch6iemni95',
                        name: 'gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4',
                        slug: 'kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z5',
                        latitude: 58196297881474440,
                        longitude: 21815862880003190,
                        zoom: 92,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '04528622-f7d5-47cd-8222-7ee846d25259');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: '7dec840e-e25a-4e1d-bf94-1aadc29bb0b6'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: '0b04e5dc-e2ce-43d3-b231-d0cdf7cd0783'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        countryCommonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        code: 'scnln7a3',
                        customCode: 'oqw0khx3oh',
                        name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                        slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                        latitude: 90673145812696450,
                        longitude: 52515657206892536,
                        zoom: 46,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 45353054227856030,
                        longitude: 42050448770276180,
                        zoom: 52,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '371c1b13-eb43-41e6-8bc1-401ffc40e715'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});