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
                name: '369kja42v6858nd2rpxc1h0agn9rauts9js0hws5wipw5mhuzt69v408zw87dkmbh8warndrrogwtiagyzd5ttxwcohh19jndnwv5n05duwxkbxe4ub2uvvrvgv5t970v050q7jq79zz0ftr9wxqbta53u764amqtix9tutvu12q7rzqd8xz3hoteba12vt8f642w6l9w06vxkthd8mf9drk5iaji3hnd8abpn0yem4gm63qfoq1wtfpz71n1jn',
                code: 'pyr79qd0nx9dc33rvzzz5kfk7m1olz12z3chmof84hhugokr0i',
                logo: 'ea3ho92htqwpownfwtdws9wtkpm670kn79g8c2ra8yc0o32xjpxmmmntn8w0v6dsnodnndmweteodclbojlwmk4l4dqk2ypj0zaurn25gjvpjg1xrn8muv2jflb1hv5vcl1cn705qh2newknmuhry8e7fbd77tbtzrrlmed6ijyjkwfis9lqdediewhiyh6h7wxscjhvqhm65hmzqaxiry1lmo1drdyggu80858q121nf99cxa181k53m1kvean',
                isActive: false,
                data: {"foo":"-fPA[]FkbC","bar":"e28{9NI1/)","bike":73821,"a":63969,"b":"i^=\".iXa`p","name":6679,"prop":"2dif)lR?S,"},
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
                id: '0199bb41-a92b-437f-954c-d12c75fdb99f',
                name: null,
                code: 'wyumyrwbwpo3u9hkha7brjx6w7hibnjb6zg8rjzh50vasju8o6',
                logo: '2tskrrwajpfmmudpaowf5tvse9ueujffndk28spulquhuzlsouys69cmndu96ggg08mtenfadoijxul71depbf83noqbm2fm4umyzl09lwq6wyka8ngswb2qjv346s4znlsnw8b4hzap7nmzq49c3jmp2c0l8yx3mfblbv40ymkdompu54td614shmrcgnhc17f6pi8x1vx8fm3tu6qha65se9364vz8jsu6xc4p1ub3vjcmiro45rpmnp3qg3m',
                isActive: false,
                data: {"foo":"\\jQXZ:|8!H","bar":"\"-]})::)x_","bike":37204,"a":"zG,Hl-hw[:","b":"3TF}K\"Zj\\h","name":"W/!%4I}CEI","prop":84606},
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
                id: '868424b7-4bb4-40e1-a438-cabb01bf99fd',
                name: '3swt1bncq78qq1tz84b6xj5rqlfdeq6hgr3nx1j85d17my8crrxce0zt6j3jcuanyixoi26rt60k0n5pzc5eqa2jsvg4s4zu0ydd1h5zhfgr77ebh3b3yd0chfpr3047v7ujt6i65480zav1lnnt6wua8xso5t0kuq200kt2h1t83w5l0l2r2o2dp0lu593zzawisz584f5ugwnr1x26p0w214zteswbi7758wk22525ns7ec4ysrzvdn15dzla',
                code: null,
                logo: 'tj1leksfyz54l1p5edkw8xy7r0f2oo9tk5cgy60svmks5gna5ti9bwpetgp8u40v2mp9vo5iwwtkt0bh2p77uu92a5y0nq31k8gdh16g4gyr8m6sif8q0p6dxrtm6okv0ignxje57815fpxn4harer060dm6y50wbl0icmr42j334tobyz85kp8fmbgcx739h6k4ay4hkwctfisfs81hwk317uud39kjh8v2v8hlanol8kp59ag0u3ynm84kgv2',
                isActive: false,
                data: {"foo":"D5CuxOpDDC","bar":"W=T5xQYK^9","bike":"J;drE)8{6?","a":69219,"b":"Y/X[_\"I&Q[","name":25145,"prop":"5/v7%;q7sh"},
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
                id: '572d01ec-942e-4ab3-821f-62f3477621e8',
                name: 'zqewxrx3ac24amdwzlzl4ukdl2hmz7aaaax33ckb71ylexqzh0u3uis9zug3tr47qntjjoe0wggtwurwd7xgwo7cbdzrhjho63m2gy5h1snjhxhx92h5n2plcg77pcnmm624p7peq7wawfplzqve5g2zzksslqmqkrv8nr32da3t0gz7oc1sndko7x1hh6kiv2pwdjgbzn5bo0mbf92td1wrdpwn4ryy48yioz90gslu3drx99yb9r7etygod0e',
                code: 'ku9oyqbexkgv3wxvc164im0r3t173blf6ra077ttg6ukc0b5t7',
                logo: 'a40w11vx74r8to4z4g7q6iunnns7ied8jylstxy9bhf4uzd7sf8qqzfuw2q0b4dklu4hvz87b0rjekhx5kbyg9nnlepaofgodfix2mlm28ail598p3qtxhhqi1btm4jr31n0vaavbrhr1apfa4iqp7e2wlhyy5vbbagvqx4whxyhwwhbydr24sxvtdfyrdy0tobvoob2ikr68zdu0camk8hy0fwwzf1q6ju1fm8bt0u1bsky9p97hg721eatucc',
                isActive: null,
                data: {"foo":"sc`k,PE\\mf","bar":":]a:y7.(8*","bike":31756,"a":55344,"b":84637,"name":56196,"prop":38996},
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
                name: 'ai78wwqp745h6q0dr52fzh3kagm8on1guruk0ffisn5kqa93vmp4ccb1zjl448a0p46jhui3hf1vacx23nmxnk0gkjw7iin7y34rl1n17cddctgx89szvxct0vbs1uslg7viubaivtwgltonvw4ocbuxblspzq6umpvlprf3p9dke6qucafqnsh0il0wcs75af4g5f1u2mql6yyztvxgu5y2bb6ja8x3yb8yy81fwfr6i93po6gp43ov8o9nta1',
                code: 'sqmjawe6qeujmbap8xvp4jvt52kb9wlmjk93ekfqanjpkurk9j',
                logo: '8r6tk1dhm4ef7pl1rdlb7een3s955a1i16csfqctydcbdhvt67c64ak87ule1xmm0il3p50bnauuebgjby89brjegwspz81ti6txl9xwvbj7dlr5v96vibymzh2qyuxr8ovgmuhla5kx2iwf9zcwyazjhm1u1fxrt7dlsp34miuzydbuz3so2ssxqd1i0afwlenuh4fdhn5div3cq8eu8dtjsw1nzyiaz4s5pc8v07lmzdu12y1hmrysqfp8gp7',
                isActive: true,
                data: {"foo":"4X.e{8n+>M","bar":97857,"bike":7029,"a":"[b,nsK<cNg","b":"6%yChyuPy@","name":32656,"prop":6712},
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
                id: 'd9272fd9-35fc-4e85-9a75-c396fdee6048',
                code: 'wm1vhcndswfyq21vc1ojboqscwdvxksdvazw307pc4t5954rlg',
                logo: 'ssqi71p6i55xyetl46rmmcv86recyfkux6v0ipow5fbmk8if0chb04w01ddv2anaza6y4m60uh2uv1lsffctdbeywszvrnt4l51n4cmn2xuvb5lokh4u9el8koswvleo8gax07ev0unbjoce98f1npi2pioe9r7ha0gziapcr8aux3yopb508vyec91bvoirek783i9czbum612m58j4676s19fvjdwuajeh09lsv27x3cnw7hjrxmlr10fubx6',
                isActive: false,
                data: {"foo":6722,"bar":"CW])8AHHZV","bike":48982,"a":"&WDY@dI-BB","b":"a(zU?\"\"CT_","name":"fA`9N5n08o","prop":40896},
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
                id: '7b5f2d98-80c3-46ac-a0e4-93859b15dd58',
                name: 'q28x1n81yssg44zuw1gpaev96068ogaskn9nhyivdt0m3wdzqykep6a9ao6jllpa8sl0r068g2k1h0za1nf80jb110u4oha2o477zhh9jvpyhm21sl8891gj4e6xh9v1zpk74ide7o1o3f356cqffxnfhazgxk16lmff5ajl1pz1yhrnt2qvwths4tyhe8oozvr5m2wbux2jmgwld1tilpjt7c4q7x4gacudoj3rxgnfht1f24jvr2zhloidb6g',
                logo: '8iqlmijdfxvht40mxzj51e7i974yco0olhtdyq7f3wvsagtd7542mwmqm9fziwmb784g5u6uilvns3j5s9kxfxxyd48tr2uc84n5ucnx4awp5jbqbyczhk13d2b8vagoky6gt0wimjlrh4nrxtryp7juaz81lcwi1qafy7ku1kv6dqrmkd9grw4eptqzj4jq5tpincmchrstkrwzg78f4nrfdet6a082zj0rowg2ff41bj5bbcr4sdelybgnba5',
                isActive: false,
                data: {"foo":68875,"bar":85730,"bike":48332,"a":"yh(wXE],ve","b":"$3u\\W@0#w=","name":"p2O6U?rjs}","prop":"*7r6|#Hyo6"},
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
                id: 'abcbd191-3cd7-478e-aa62-f96111a7d957',
                name: 'vi4iqdwg6tcigy5oxp8bz4pv9tc0vjcy6rtr988cz4q4nbivrbo5ve8tal4k1noy0reloggvw5451kamycdss7wpeg3gh5tn9lk82ha3b33jg0g30kw9o07wu4jzumwyu6xynvzvxl1ebidlgskx4r36wpase08p9etn6htl4ebt8qn3jxyrthtckocyg1xus8qjhhtlkyl23d5tzglidqa9k8ncbcf4rwy7npksb2e0y3lv939u9r8ukdtkkyh',
                code: 'plg4xh0pmuv2e9v00ndt4sy4ioqsuxe0ecfbbpr80ede6xc6ei',
                logo: 'q3fvraxaj32avwqlp77ueumglsusdw3tf1h1lcey8hmnynpzz3zwg8rm8lw4spjjmbf219ie5wz4da9sjby6oag1x8omcbmel8v7lwwls2ug2pp6r3egpmow4ema7z65sl1d5cg3h482mm1eutlzcbkkp8uyfgzxzawt29jm832uzzlrt1lytx1op3ydtd18u1tj5fyoaql02h7dra2fpsunmswgm7vfajhxqryzodvqmyjnvo6k6jia7r5dg01',
                data: {"foo":60744,"bar":"ogv`R1|_o7","bike":"\\A8;{:E6-B","a":"!J@}I=4ev_","b":70201,"name":15225,"prop":"j^!t5u'QF2"},
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
                id: 'ntdvzakdsfcwmjab37l90zp917fr4qmv0o0eo',
                name: 'qdbaor3atviwbyci176ul34ls39lxvuyru04jrgob3gw7behf52k1l4i00yzhfcpbxmxyd7dki0bq6a8yclimlq35plo5q2tvwhmivxskz0hp4213ja0j0le0nlclvids02k04l7qv40j472y06e9afv5xpmgz31pto1dvg8n5zxe7dxudlu69upyq9bgjfrvgkusngahsyawv1kk1y5yhyu7izti56asqp4595tvwzbomqobhxrq069clyfzrt',
                code: 'tlpkbo8j59835347kxr5eezpx4cu684qvwk73s3qiof04cetsb',
                logo: '89tuyr2c7cd8yknjnm1hqqnoay1q8jbqmfva7sfpqibhjml2zev484wjqbdp1a879lrsfh9uq0ksoo5fk9zfmee60dz6vqycrqqt649xjlnp486mf7q7bqho8fxcm8j0zdg4u2kmjkx8xdempinaaufn77156njzcpo2kcq4856sv3ty209o16tyr4yomw8f6dkfxqiiewwvyw1vxk8p0dy06jwqmiprdehtf4pt19d37rxturqzk15r0t37x2o',
                isActive: false,
                data: {"foo":74611,"bar":"4[!icS_ZnA","bike":69928,"a":":fO2.o13Dk","b":"[YVOHEehY-","name":"p*?dn!0,Y8","prop":91265},
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
                id: '4fc8a42c-3bef-4044-ada8-7e599a2deb31',
                name: 'evxl2t2cacrng6w7jct9o8mkqhpz2bwq9whyvx4ej5v1s7b2ynt2wbzqq12y28rpujjkv35fog7ryzk7o00vkkkl2uubd197hjc3slocw5fpsckvofglgm5lo20x40y3oe2foo73gzbv541qvzujdy376skrd20sb1nbcihrqbfvkxo8vl8k6vu0wermz7fsn9117s627ugjma29rpzmqluv535p2z6o7e9eqcwzb1j6yelllm69sgbz0puo5v0j',
                code: '75ezl0b0w3ayat93bi87pmubc4folqlzhviei5ncn7j7jqs4l9',
                logo: 'kgjie5x99fxgrbfaetaitx3skmno99i32a71iktzg19r9evyuiej507ah7ltmijqbs6duxo24qw530yqd11kwladx99hkbvdrig8kmla1jntjbbnboc94tmdym7la5j0cc4oxqr8rb0lpq0hln87gemnxw6c6eoka8nbi6qjfhy9m7hh132zotu2yy8wqyzzj4hx3szj4lf3b1rf5qfiry0exgr2hcvqudvpaipfowahouhkul1imc4703uxy6h',
                isActive: true,
                data: {"foo":57096,"bar":65216,"bike":18777,"a":49103,"b":43559,"name":11366,"prop":91145},
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
                id: '9c9d9415-b0f2-4b83-9172-a32001d5294b',
                name: 'q0czdfoo0c2cku4mmc3gd1ye68pm9aod4vmlnhs8y8ndor69ynlfw8xfuo4ppfztjid0t58abh0xn596e95rfnzfris7ai4ayqximos9u7j6wl9x4jt0xk4phfhyopxkq0ee8t86twyhf6fr6b4dfglbihfpswtr2imybt6xja14yqm1iqun8q2rge0d007hxvbksacj6y61cb25wu81gsl2rgcdmm0ji3qzgd2mvytbzxmpgunkcf8ubxujskm',
                code: 'pxvbwodind26jtw3encfu3p8r7od78ak7gk03k294d8anfmn575',
                logo: 'ji6znl47ydbww35rnyf0z7v1xww0ax4mlfij2y0hqktrzwgdfwkh9kr5n6ossnt6uojdnteozgk4jgdvkcl8z6lw7nvd3l8wmuhw765qnw8x7jj0hlspmi8hpokst3tna9900zgxzxyp0w2fi0gyu1vls40ng6ybbbv0xec43k0jcpfm3mdfyo5w2r6xu9dcn7s0jx2xwdntv0rzkvjr13iebr3mggculifxuhimzwwgbcrpev0twu9tljh68ir',
                isActive: false,
                data: {"foo":"6uAXp{^iTq","bar":33328,"bike":25057,"a":"9NrH6J\"#@,","b":"wecB5;0IgH","name":"4C/Gi-^62>","prop":84557},
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
                id: 'df673a66-08d0-4271-b984-19270babfde6',
                name: '76qyhmirpyhudhpal3e90h6r0fo4gr0cma3cbrwg17szlen97a5ovgmsvcwp2ygrwvqbp0ch26hr8pbad9yhuwnl9brnn20kr1ln8oa4h9kezz0rbo0t6iktclgxxnops5dhpjy3csxcvmvuu9kx43pbfr3tro4o3ot42pkbl6or1vx0ln76uxg2jqonddn2qiogw8aqj2euu5cqmyocbjfn5s20xznns7tjjt5uqgtb7izbon81pqmbtg60fn6',
                code: 'hxd1ojq1kpoozsv0hdskto305ae0t7fj6qhtembzmzkvc0bapj',
                logo: 'r2k0iwg6n3tu2249daxa16jaa0s5gnro71fky7ji203kayobtrbeaytu2qwjczdafzei1b7du9gmf8473ssnue7w5tr0ohfya5jerfwan45rjzi1awwvlav85ivo3wrlw0z3g19n5y4jym4vzxzwsq4b1dgeri8a1wg5462du83959g6cdjwnac6ohd8k5axatl9ody5otvqr45o4ch23wvpz7ot2xtg4huy7n14bihx68cbzwucj7zbphkdw167',
                isActive: true,
                data: {"foo":"-zaCv#tq?{","bar":"2)<)hL&y3!","bike":"oj^..!`5tb","a":"vs^JWXpqh$","b":94364,"name":95714,"prop":78068},
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
                id: '50c3caef-f0e9-43e6-a478-d410e0c375af',
                name: 'q3cmq8jv7vki003rcmd6bgdg5ct8afpluo3b1obzl7ij7rl3awknl0cuvc3dm5z225obauicfx0a18fcjc313mssgg9ltolsjd8vdr4dsa797k0p2qho5yd3c90i4t8llkdoo36hvbzsv0vtzsewvmabtw2xod23qqxi9j8629bg43mnye3uolp9uwf57mp3478416ok7t4hcac3dghvr2oom2uqld9eilpvkf2rfqppyj1me9ill8qrcrsaol0',
                code: 'ef65n1vkniqjdhroy5wtvgdn98l6twn091skqoaw8js5f4xf7h',
                logo: 'v84gdgfwg1t09nr3xu9lviyc8e6zoti6e5ywuln42yd4sa2jfy5d9mes4695ckkgy0hbjb4j6gys4yas0nkbqsdeprd3mr2thykupkehgggkfy4i38uw0usxa8lc05bdsxqe5bnj7jcqqazapp4n9f50uk6o98gtbgv8zvhchzxi010rdk9cb0p5uls4jmh88fsljl55gwh9j798g0xi33i6oge36crmuat4lk6e6gj7k23miarvik2p55tubz1',
                isActive: 'true',
                data: {"foo":"+DMv|ry\\`8","bar":"I=\\f@lYH;_","bike":"e<R][tLos@","a":94223,"b":27815,"name":48702,"prop":"OmB9_UQ1?2"},
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                logo: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                isActive: false,
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
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
                        id: '0813b6d0-7832-4a50-92b3-5b2c145c4f53'
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/3fd35dff-18e6-44c8-951e-3fc35d4c640d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
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
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                code: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                logo: 'ahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14',
                isActive: true,
                data: {"foo":"P3Ll{3dXb)","bar":"6@C+\\adSy%","bike":7462,"a":71701,"b":66185,"name":52468,"prop":44625},
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                logo: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                isActive: false,
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/a3a2a71e-9a82-46de-b37b-6947d0ffec67')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
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
                        id: '2a649b4a-3fa3-4c88-9c5f-ec1943ee2efa',
                        name: '58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qio',
                        code: 'cdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4k',
                        logo: 'je3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59',
                        isActive: true,
                        data: {"foo":33664,"bar":91292,"bike":"?yGqBiu!.;","a":46790,"b":"J2JrTgHYaw","name":13571,"prop":"wP3Ll{3dXb"},
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '2a649b4a-3fa3-4c88-9c5f-ec1943ee2efa');
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
                            id: 'c7f7c69e-55f2-43bb-b364-47a74a2f37bf'
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: '864a3250-7910-4ffe-825c-ecc57fea30f7'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        code: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                        logo: 'ahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14',
                        isActive: true,
                        data: {"foo":"P3Ll{3dXb)","bar":"6@C+\\adSy%","bike":7462,"a":71701,"b":66185,"name":52468,"prop":44625},
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        logo: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        isActive: false,
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: 'bf1024ae-e914-491b-9455-f96273943bf8'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});