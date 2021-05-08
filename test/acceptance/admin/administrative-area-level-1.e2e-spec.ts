import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Seeder } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.seeder';
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

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel1Repository;
    let seeder: MockAdministrativeAreaLevel1Seeder;
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
                    MockAdministrativeAreaLevel1Seeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        seeder      = module.get<MockAdministrativeAreaLevel1Seeder>(MockAdministrativeAreaLevel1Seeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryId: 'da167d8f-a2c9-436c-ac85-67fe9648b87f',
                code: '277vnudi',
                customCode: 'wo22iezy7q',
                name: 'ly3dutjq6zofdpoa6ff41jmuh8qp804b52vyfvu97v3jr36s5h1wrkkenbad0u5wa0onx62jg4rckh0nj216830efgghob2mn23rs37hs3f87uilvolz05fv5qw0o23z3i4phwbvu39z29wuos7f1yls47vepstuv8mwshfiwveszmfvp1ivles9hopmym2dhou8xs7kzfeejehk7fdqhumcnbqwr5kaxuh2btc2kfv4x9h3vix4jfdrst55jhz',
                slug: '3zv9ep0k44r34oxxxosofzvnga8llr35wer6rkmydwoq835d31fe4f85h2tk9na92a39us7nhq3xjme6gvv85vupz7fh65x5k5j5yuw2r7btkh6mlkpht0matmu1sn38yjpmy4wdas12xrymyjkvky9xqmsw59o3w5jr2t1c1wchdghh56vu4irp4tlpwaw69w73bp2frlrp77ey9deyyi0g0d8pgfhi1qdhm2yipggs1dj9h62lfvac8yzubhv',
                latitude: 72799735910009760,
                longitude: 43845924517970370,
                zoom: 48,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6ec24821-0d1e-45fd-af9c-76d6510e565f',
                countryId: null,
                code: 'pepzagbu',
                customCode: 'gtv9q4c883',
                name: 'j47bs8meut5immox4jwn1li57ha8bnk1s8tab2kqlo5p8gqxdp7rsm7wtn5zlkp1ll4qkxl8i0qpulia86zlitknbc0ls887am005xdsimtynbywm7ckd8oax2ruhavvsmdjvugnvy08sd8ez6jftkmo9pfsogwq4g5j9r8mfpamyaz7opp9hcf61w63rxjvw9o7k1dx7ta6ogr22s06cy1cs1on99ejkrth0reubdtjgcfv79si4ayr1u9ijwn',
                slug: 'm5fonfisvhz9gaqcxbrc3gbgwkx80mrkndb01xx213gingnxjwvp102laakwctxa93tftdqz9x00gso2wj3gf98vk62ihluku1i7072vht2dnyg18y13ljvd5omm71ai26l4uld9rhleuium94r3yue268z5oi5vvywt35op4pumsgijdb01jd6ey6ip8bdb0xuny6chjt5punaql3id7bezue1tjl48bltrtd9xhbc9dm36qle9lg7nwub8otr',
                latitude: 97311009957479490,
                longitude: 99542719932664500,
                zoom: 30,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '89302f43-d090-47f4-bc0b-d877100fd150',
                countryId: '1cc62334-cd4e-4ddc-ae4a-200d57f2402b',
                code: null,
                customCode: '4syc02db8w',
                name: '8poelqcqkghvgl3lues13uorhpzx4a0yk29cxdobbo4lengzegmzv4j83z09jebrp5zdiv92ss82tuux4c84tc3wliysrecw0jn4w0fvvkl1xyz1fz7khpgjx4u8wzo7jh82tyk8avqn2j77nx3cn8kgpxbo0r34dy68ovkfqdjmq9ryet90rose1zobhk9yaryzijk2akg9u1a99dfkgtbc9ou0nnuh25h83ymiaghioelm2oy1gfwgk0z6dxx',
                slug: '8dmpxz1qv0xw72j1bdxo6qfl3jdgwkuu14hz1s98lhry6bxdf67h5jkdf5i0b8c4zsx4yx62w4b8279nufgqyniaa4ehkpqfu46cll4hz1tq15s5m7tafg7y67kv7uw1doznbm9ujph5f2sga6az0r023q7yzjexhir596x9zuazqrl0qmymwzb8wbhipj44ayb52t2mxi57leghu2dzwo5hjouft0pmuq0fjppv1l0giutvk8fpg07l4t1pq66',
                latitude: 61549711323577640,
                longitude: 49225888226791416,
                zoom: 30,
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
                id: '5071cc2a-7669-4013-adee-7c0714d27f39',
                countryId: 'ef11f2c2-c842-4623-8290-1843cbc65def',
                code: 'khf299me',
                customCode: '3r6hzrnpgg',
                name: null,
                slug: 'z879sw3tqsn5blm3u0g8t7x9bmck2f7j9h0ylubkl1py877z12x2yopd4qx5kh3wyajbzvyo2hx3kb4g8u138o1s8nmpad2k4jjcdakesu0kb854b205n03tdp55s2c5szt23yg3t2j4glpikm8cmh5poi1zvvydf3ev1d2a62hxhh5626qkuvs55j11440hieczhvmdzqw9kqkjrsuutikbv3k49wwpjg7qxu7qy7rjcj6mkltvaebhrn10emf',
                latitude: 81990807515819040,
                longitude: 44902969924018720,
                zoom: 97,
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
                id: 'f951e34e-f46c-4a80-accb-60647ff66916',
                countryId: '1205562a-4563-4ea4-9e3f-23cae59a37d3',
                code: 'iau351dl',
                customCode: '5yf07xuznr',
                name: '82sm9rekvhrzrdet7uiiqrt2izb4z6g6r0nsnu8e82b2ieqyqovij4e9mz1goqye246osnhkrj6e56egvecw1xw5z8xkd7ydfgafskr8fbo7tde65iqi1zej2on97bilmt54ws76qsxypash56apfpl4w3sc47yerfftn3vg80zgz50ix1lj16u0fkfpmjr8a6devl5ftq4lvqvg6j5ouvqujseiy0e5w3450n9tc53fn6fp9qlggpbxz2xpvo6',
                slug: null,
                latitude: 95112032418348350,
                longitude: 46597255303910020,
                zoom: 84,
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
                countryId: '70083a97-b1a6-4ba5-bf44-5997ea027844',
                code: 'kmagfxxe',
                customCode: 'r7c3x1xjvw',
                name: '6s37d6u68zxajwc9vdn9yw6kmh5uo6eftyzfoyw2lhqk6oe476dekk5wzd43jnlv1jx2kn09j7fmbf4wjajjc7ss4fieltwcmq72bdwjf9ysfism4iudaan1pcjdnlq830tu6b5zxgwmdmgyoj4uj361h7oblzd4p2stm46ruqtiywwfc1y8b0x9k6e0aw4v17myw7mzhb4ny23rfdgbnii0pyiu4b6x0xg1gxo0dbli9ydyt8usanuz004wh95',
                slug: '7qhow47159lqvcx4mmo70i2o702quiiez10wq49z1k5vkuvv2dnegt84e6ycgmqreg95xxar51plmnzw8r0tgesckxfnzbfffefhg51qq4tteuwu60g16go4h29x32k2df932xmmqu756rae8q5vyj7zy42a00td31imon30o01r1v2sdd56w31bwg6p32xjv9hq87jbgjmaolq85njtaoe0m7j9rgtp2ub0ux2d47dt4isv60k561yu2u532se',
                latitude: 17894188262554662,
                longitude: 57263400960704660,
                zoom: 66,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'afc6e79f-2ac2-400f-840e-dce0d7d323e7',
                code: 'uzh2z2ki',
                customCode: 'j4id32tdz3',
                name: 'x8qggmltoeko3b1kteyadvbnnd7fn6ca4rfhruu3j21v5r38se4gepirtzcgr4iy6u46wu7veb5l7750jx29widema62turc3tzzhziy18tmxxeh8md9h1e0uk7khsshfdt01ke67kiy91ey9xsww6nku2sab0u6o17t0z8ke0d1dh1bjxenn87q061hxqyhq1xv4xcb03fkweaytomcxke15w4ssxc0f3qk0jubkkqzqpo5jt21ylr7bihahgq',
                slug: 'ouov1limm0w1h85e3ppfwoitv7ip13ywn8dd090b01r11yfwiw5bwnl9rg8alaz7v4n1yzxx4a92ij5nd6ehu0y4v64yj9u8srpjwl8gra7u6x2qtccvd6rut5jpc02tzri2wouaptx6xphoiti9bs420wiufo2fe5qegfi1a912zyc4wxtiogmerery0m2pri2kevj5blmy1a4swhbq9g8ywym5jd8ucbe1t6h108txde1g2j531zzeq5teze7',
                latitude: 48331430683442540,
                longitude: 74516262234557060,
                zoom: 31,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4f8e6472-fa73-435b-b2a0-4d5c71388283',
                countryId: '85a3afec-9b0a-46cb-8486-923e8978321e',
                customCode: 'qoj9npk40j',
                name: '6dbz5cwo34tydaoh9fg4ppqf7q51gil8vxaygweefumvwx8zrwig5pp0hmz3aodkevflru8dj4hxpy0lzztpggdyup3044a23v1e8nbpdgd0azks30cjmoqj0808m2nvnt1j6ntmauq06v5hr4lvuc2324em8bh5dzo0vkshejnt3kjy48b9jgab7upbt8pc05lnzys8lbdfx72l8yv0yz447ac5ooc7a95mdl77fcrppelxhssxgnyd90bekbn',
                slug: 'trmn2jszykr31sk3irx7genhovermlml8c4760e53h572g2bghnnlm68g8kp5qkw4oiwa1h60ysi3nod3nnsmdw3mmcrh9bi7lji4pmscondb3svidpc58vdidtjkavz0v7v8wkti5aqsuj29ajo0hh9thkohor3vu7m1bny6w038t7uf2irth8fck4rci10vw7inv312vbz1a15zxhj9cr0f80x4vdwack3yi4yogdawb8gw911qhagpv1i2rp',
                latitude: 66526258594584936,
                longitude: 64966820521858740,
                zoom: 45,
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
                id: 'f653e9d8-c569-4c95-87f3-e4d25cd09f35',
                countryId: '0e5661cb-aa7b-4d79-9e01-ad7f07da7890',
                code: 'jzvi12fp',
                customCode: 'tuhsiec038',
                slug: 'ob8e9km1wtxpi7bbhcj79z6yg0ye2x667tb0bbq4bufxsagrpm05yed8ol8xkhgtur5ug0mmvk4lcsbq096qk4810fdwrsuzlar7nq3bgvsbfncstqq9kna8638t9s9lp63v9te6qoxpvwjcz4l11p1hcwkvcgj8xt452brnl5v19kl84i8rp7xa8fyez46lzvxhje51reqegouhvv3sb7db6oli03o22bt67h9vv1bc2rkucwwvf005qoio3of',
                latitude: 93697174586115260,
                longitude: 92450819524910660,
                zoom: 70,
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
                id: '12172cd1-f420-456e-b178-dd67161983c5',
                countryId: '70e5660a-5a86-4ccc-ab27-14df45913224',
                code: '7o62by12',
                customCode: '5xn2vqt6yx',
                name: 'rwtenffqk1b6ciz2wucvbknm2abzn8151oy7n5xkrw93x3clodzx77thbb3a9869zogvt311zp4v7j467zph7u6e5x6pcdc19h2tpxnbji2579w8bpsoxyqoi73c6mg2u3tqcs47ewkk1jj7or1yov3phnnnlykanfyw5if6zoxc6xbhi5l4nqmn87betbze1rcpdee9sxq6ka2715hp8ayb52obp077guxdm1ytcr70mci2syakroh38rkfeq6',
                latitude: 21606813207792120,
                longitude: 29732697417367690,
                zoom: 48,
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
                id: '399m94r51ucvq29f4m9amlkcrh0q86oviqxmh',
                countryId: '34d71f68-9127-4961-8854-7822ceafc07e',
                code: 'x8w0kz0i',
                customCode: 't8f0oecy1w',
                name: 'ojbeadpaxdejcax848hbuhmlyqdvjg4fxoy297j8ojiug1uxq78312orogos1s4ui1a0vo0s0vf6g0gyblw816ac74x8tdse9h9v2jii8f2dtwn2i0uszhlzbgx8q4nsp0gm3p0l9kb98dgyb00gb4wonzqafn9b2osowk57zs02yb12d7xbv0cslfnyjpbwdf2bz4guicdry4lreqge9ep57b6fjknieshgm306c4e8j5c0z16qrbirzps3nty',
                slug: '16we16fo3sqoxt63ewsracuoairknbx5jf2306k1e7eeqhmq6tdlqqps0m8xubvtujayvbpff3sl8w306h70cfbn47usva6sqmspf54iinpt1hv27ihrafdye5we4bsu904vh1dbdzztr3ziatfvos9sz5z48jg51dn7wetlk8jelaqkmja47tcpjau8r9bs9qeskdca0fmw6jzfdacdu2zp6yrr6zk9r0msvjcrgf96256t1s7i228o67ujb3t',
                latitude: 80679625924681970,
                longitude: 79592524025148220,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b2f40dfc-edf0-407a-84b4-f57fc9549929',
                countryId: 'n0nfbzqq37x03ar18s58hwk7wgtmjt65fpwt4',
                code: '48fczzky',
                customCode: '1t3wa265rr',
                name: '3q15b0m16dzqu0x71ijhewt966c2ss6exwv0uu0sme5w0fj1cr6ids7uho949anby6uv9t7flur3zs8ae04aunyawk0hj35jezgqwae4aryjv0h18jyhjp7u8usjlnh47ilfjwppw9go9hhnhjmrqx5b8ayyivbeswpax3tpelhp6zu9divxb2f8ze00c7pg696eg42xy5z2w6i0km09x5ewth9t60k6t3u0ahjmlvi68llojlaabqxu1jwxc4e',
                slug: 'lleaai438kmn59h63nvqztzee7nbu4jumv8i4htxml06upps1guozp19m1wz8kb9icilau126x4r4bb8ywjrvje6hn3ibo5g4msuv5ha6pgpdzz9adfy4yea7k9r9hhgdbrzfd3qzdmfqq5jztwv6d8x2zakm7p32vs2hoi4egh7z7kp0ffvwhxjocjy6fim8nkufdvgfdcxwvwr1p1nk1879z3w9srtlmvz5z3qoezgz1vwque11pvs0u0fqyn',
                latitude: 81579341272902110,
                longitude: 80080018552468000,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '47e6f273-3acb-4261-8365-90ffb895059c',
                countryId: '66c8e710-aa01-4dd9-a430-3c7027ba86c3',
                code: 'mlucfhke4',
                customCode: '4cw3rkhm3e',
                name: 'oj730vezzcs3ysru405ubwy5gyrzvgltzd60lry93yp22p0s39h03zn9yn29rpdltmj137ubbkhc4xmglz4j4cfp801juc1ivpsiqylsnzr6ywjrtaczwt5k9mwpi4nt6k8zja7dvniscnzxdgfqwx7zmfyqykx4tu6s3xe6yjnfitta0dzhwic85fgqqa7wfq1zd81myqlx9veez6qxdl5xq79t5i9d6wqdnbip1zkn79728abkccap3b0ouvv',
                slug: 'g4d0sld8to44o3e0zqv5fz4txmux48n2gt8vu1ok4oji3aggsltk9ou2un3788s0c54fpk7pw3gwbnxsptddnrqaehsxz2dnq0fmohilsgpi29uqbl3xshod74zjg0ggxew5kg4ajrqckxl6wnwdhv5qb4zqsjandani8rduy2kn28yngpvkmy4se3xwowqxerqgtfx5o3fnjdgglysgpzdeo831v19gupq2g6zuicslhtequ2v4n5colgnfqhi',
                latitude: 20079709769351790,
                longitude: 88762039607443420,
                zoom: 69,
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
                id: '4fdd93c5-6d4e-410a-b563-654b1bcc37f3',
                countryId: '81781541-0552-47cb-9767-b1d987b2ff4a',
                code: '3s268rad',
                customCode: 'ekezs9ueoi1',
                name: '7a1jl1kjsyqj7gh6t4cajcr2l2ui5z30bholrf6e2t32z0qdmgfwt1mrxkixhelcbj353kmg18a5gzweyp4wjh5qbh62ar8gl0v97shz80dd4kknxb5dhbgf2c5m7kh8n1w274q6wy7g0wigdbq8o29hu3qnpixsggbbmtkhm24vpoxtg4ztmtuwrxgfwd2ujlpk9dx6puwx52duv0o8aoiauzyw5kpbciftpqf39q1nvnkigz2zeomi3t2cn11',
                slug: 'v68qsd9whtm4bhi8nhummd4fzlqi03munwuu16z08mlgd6gkz899o20lxtlgn1e4ivielq4j0k0c9d4m3qu0y96l09sq8jw40lnpjr9f3bmgt0a7xdrp3y81lue9cmell2cq2h4g11c3ozi82zca8tfy9f5u1b42tpikylaeqtoxzgzk3myr582uwf520kk3y0sy9k4o8ezyr369r7mncaf493ffsgtqaw6pu8ive6l5rv9ff1lxqjqckw1w562',
                latitude: 58449532700449704,
                longitude: 77109723779400850,
                zoom: 14,
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
                id: '63c55f97-12dc-46ee-8bf7-271c30792f8e',
                countryId: '3d822078-34e1-4195-8291-15c4a309d6c7',
                code: '16e9f8qn',
                customCode: 'wiaa35qsq6',
                name: 'bu9pr50umznywd9l1e117jun0srlcj58odx2wu87t1m56qkgo2lnzzgmnfwjfzm6y7dga8yzj2ldyh8i84l3je2ufhcur8eb96aq0raaucj96kkvt2l4astjxbwmwz3lciiytinlsypusaxh4z39k9nu41063vsxfw1iifxtodk1x3ir6aupl8ervsxpcw670v8vj7wu48iydkgqj744h2ft7c1zcf73tn90zrb940mfsr5em80qp2656n4163io',
                slug: 'b3v11ep8daa90rybsvf51jyot3b2tq9w0ld0ght4u2mtruwdy2utgi78s7ncdx2k5ck4fu8dkfz3jqbxku5h8u95dlocp6hq2n5dwyjqfn7q98eoq6ms2flfmwvllkl37rzz9fo8gau32xmd9jyk4o5pxn9ymzpyhzuba8ql6h35b5lmzmzuklhseri9pbqsiwmmuekt1ctde7swexoheian38dxz7wvnnm2elj928u2b7kbvik4840wrkql3sb',
                latitude: 87238107578551550,
                longitude: 86640732843764740,
                zoom: 40,
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
                id: '5e6c0a3e-35f1-4927-b7fc-f3a5f7d5fbb9',
                countryId: 'ac1aa0bb-f32b-47d2-90fb-80724cb4fdb1',
                code: '876salme',
                customCode: '14gjoeima8',
                name: 'c3rduh4lii67pvzkck8w107tih448gk4x2nr7ooet4tmx7g6gj7jbtstaanoq2v3p4w8kfqfjt0jwv84wi8tmixz721sz21u1i7mf3ynk8qfw8buyyrwvoh7lw4ze5ok2prsbujevwi86m3wxdrkaky18q9x7fu62z4jmudn2j2odjg6z7cgat4hpx4o641mtk0z3esom7nybcrs1ljkfbmic0zbx9o651tfssy34q21ar2adh29bcrj9jlv5ad',
                slug: '5umf23663jty1mejan7d6eiq4xij50k0wlx7i0mqejdegyv2ldxeofd51mibbpoi1y5803iborzmedwyhf0m1hemhxgfnr7muzb0acmvso5ldrcrqytqdgzfqm1jh1k87pp0lf0xncxq804xhkesib5b9j0vmh6p8e52eyhpxfsbulzpg06pxwbzrv7931ghdii843lkc6vaegwssooizwyrwun3mpahrigmca3oeab0y571ajcph82p8osq99ur',
                latitude: 28117417964848756,
                longitude: 17567911109242264,
                zoom: 43,
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
                id: '52282588-a69b-4364-9daa-b3350804bc34',
                countryId: '3828534f-bbed-4ad1-b6d2-517b9de7071d',
                code: '6n4dnqd5',
                customCode: 'v1xcs9cxec',
                name: 'rp7kkz20mn7mywil5wwkseii4a9f7n3hc6niw206u8qowrr8bmpdpypmy3dcpt08lxkutu2asma4jlqlnt6muxt4we0ebz01lyjjv7q79bn3d2nxvz5ogas30zkdtr2oqafpycbe3ug00k9ovugb40zbebh4x7vo2fca3fk5s6vmhcf1lum6iwgdcslhxzjhbzvvjbrvfd511gp0gavufisfkcybuc6qcguefcnbw8xd6yxvvh9v1pm12bi3yqg',
                slug: 'meblacl6hcyut2x2bgw1xed6ahgm6tyxic6uldmcdwm5f8x40l025nonn183loidx3q1iyvw4pp4yybjrkuah3cs1wmmcp4r486c3xck9y96cpjrz3cgjymxedlllvigmj1cude8rko9v0qi1sukao9i6xpq4v80bj7egd0k1t1bykyq6l10c6trtevgtxp9ezh3ii6ioqt3n8ki5kiym9zkkoxecmuaxrs7q9siwm8wj7fse82rkvawooflcb3',
                latitude: 750264663374539900,
                longitude: 11379598468612968,
                zoom: 91,
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
                id: '078a8788-130e-44cc-ade5-1e62df2a7ff9',
                countryId: 'e41f0476-5fb2-4616-ad1c-b995eca0b1b5',
                code: '1k93trh4',
                customCode: 'uxl1vo3de5',
                name: 'r772rbnet66p4ojfixeb3bw1dddbetyo6ubtp4q7egxc6q1rjzn3zk2poqwx6ufdlwewyql8r5gh9zx6uqslm8t0lq0s17ljpdoi58mvcladzz0tp5jw0uk6hlqytsrms4iej7qxup6qeq52stn8yghyvw2cs4pmfk84wu6yigwy3x8xwtqglifumleaely4xqlccdne3ivax2naa8ayeh3nlrzytg4xz3k5i6hqovdg5hy9b4dvb04nqrqepyk',
                slug: 'tjbigogewdakc4nlcm41gm8vl14r2pncwfhu3oqvj5hiy7yl3xw4pd5uyfp6gmqx18vl9w7392gjlvh36sknak7wgmc8opbq50bpkmyclc61dwrzzkwzuxovzxo510p8l7ksbhvhmmslgg0ngt2ir45ve5dympxiexdphph44hnijnkehh3jzt02ly8oz719dijo5s1ts56eairtbg4c437aa14k6u0sog0oerixfj4i5b97bq0l0ypodj9p8iy',
                latitude: 26677040001714600,
                longitude: 471642763980442200,
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
                id: 'ff78c088-628b-47bc-847b-3b63887d97d6',
                countryId: 'e59a5251-21e7-48b5-bb1b-0a3195da90d0',
                code: '8yaik9w5',
                customCode: 'apmlynpcfy',
                name: '6vjksmkq37d6xe4a8c6wyfw8y2y5iyt8rte4q8i3zfuyv9amp1le15bqbdtwb9j7sjt9nok02x701jtkev4cv0bw2455g3vd9pljt50g228z69an828an0vrxm3dyjx0g4f0q51g548plp7n5ywnkjkxdu2gnttu4wb3qsmkso7qwmq6n3n3n4nnif2ts0spl07gs5cx8pwcm29fn02gwhrivhah2bucw5q1awjgt54p5bczpmmsicvhd3cvn6k',
                slug: 'glxstkf3k6skio3pf7hw94xuoonjxoavd53nu1q2jenv3rbc0oumsjxqgujsz4r49fwxmokwule860wayx2tvex8uwtweo3i0bd6w9q1bku4sh3spiblwoqllyk9z8hs1k7bo6un2le77rv5ekftn971h45m7lychu1lezqikmnkxg2i9ytz829n4mf5i7xxd001w5nb1859lypty8ibgq0c0b7l0nysqc90f428uug4frm33il26qambfv8cq6',
                latitude: 49549509964257784,
                longitude: 26909169681870016,
                zoom: 649,
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
                id: '0a66dd45-8a02-487e-a691-e769ca833845',
                countryId: 'e59274fa-30b5-4949-943e-ea782655b7d8',
                code: 't85494bo',
                customCode: '82i416ycb5',
                name: 'qa6a27xr84eqbtn8lx1386iaq5qz2y9a3kdn1cvd3u56teb9rw1mapp9yadyq80tpb44p83nnwzrojprklda2sz5v86ux5a0595m9htqturzmcxssgrow937ixej72e2e5m1f0k2e5i8ouknhjh006rxs6b0vxr5hxloer5ok3gnte5ybncgqaajx4wcu1wlv9pycxs7hsyyddab7mm1vcfz262ef36r21ypsigjjuo4dtk3vjjvn0exyhfgieh',
                slug: '10bc6eddlvsoyet05ppafpiavwa7wke5ogyv3ojtl2viym9rpt9cstk1rcstedzxuokndrcv6ducuvid1fwfvj31ji3ev3t7naqpdxgy2wynvh9k42nlunwip99khnj5m9oznj4hzdfnqhyk1yugxvi13v7eqntvkzho3sgqyg5lknfng3otk2d8zlmpzgycbg0wmkm5rlkh6tl542tveb0hte3ljlzst96my1dqcj9e6n6ayilvvc7mi0y07i1',
                latitude: 52329655240078280,
                longitude: 77128271093964130,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: 'fcf31af7-df2c-483c-b39a-e4436883ce21'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 40404411667703650,
                longitude: 50391649519524460,
                zoom: 82,
            })
            .expect(201);
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/aa139b95-b20f-42f5-b224-040e53fd9cb1')
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                code: 'scnln7a3',
                customCode: 'oqw0khx3oh',
                name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                latitude: 81966150999047520,
                longitude: 59899045041504730,
                zoom: 10,
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
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 64849125949451080,
                longitude: 55748208780772820,
                zoom: 52,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/52a7a8ad-cd18-464d-a23c-ed69f06dc79e')
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 79408995196086180,
                        longitude: 82521829689740220,
                        zoom: 74,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                            id: 'f6e6c2ea-34d5-4c8b-ba60-742797cb3c11'
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
                    id: 'b831dc43-e408-4775-95b1-b483c0bf5671'
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
                        countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        code: 'scnln7a3',
                        customCode: 'oqw0khx3oh',
                        name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                        slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                        latitude: 57926546920370080,
                        longitude: 63519496804626850,
                        zoom: 63,
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
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 22305826252114944,
                        longitude: 85042204735367090,
                        zoom: 61,
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
                    id: 'c4e5a3c6-850f-461d-b405-2f881cb608a6'
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