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
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

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
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'nep5wumh',
                customCode: 'ize4zxvyt3',
                name: 'hforvbej4580zbvnsbpm3gmbtsy2x2j7wmm760n1u4ndze8xk3bsr1w0mnr2k9o8ssslkn6mu1gw1ub7v2u39b66g04iy56y6ph3kbx27bakqzm4xdcdc3my5jhm8cbfn6mgfgqkenw2moj3ai0hl0og4qn5d94kj65wcsrcpeg6r8aazm7vu35kgzh1gld6eowd9i7burcoyh4ylmlja3sgldjd3z4362t5vh1q2q0sgs8cyk80233r1mcjb3m',
                slug: 'sku8glszbn8hd3ujp0oo1jvpr0zt0e4nwd2p66ca436i8y5ig7zlmb3q9u93jkw5fupk0n2357xwxz3bg8d8c5d3rwxt41xmmhzb4cd7cslzx4yf3d1qkis77bjv09bofp4tbq9vyrgn6ty5g7lnr1ysqlwm8fo4ccyl9wtghq8u9125bbyx82l5x6ncughnmp3lvrtyq1jwu7sgqmmcteafqbugstz70xah0bsjbjldkovbs9gng6kpe89orl6',
                latitude: 265.35,
                longitude: 412.41,
                zoom: 67,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: null,
                code: 'yp9954rh',
                customCode: '6k9d0vbkig',
                name: 'ydykcu775l570kqosx1nek86wlksammm5le0o0by7yg72aytwh0lgy6o27mmuz8yufjcbn3vasupq0jcrnld5qa67ppu9olpr16dp9xspoirfj5rsmlgfdoueezjip2i8yo3aly0azybsektvsumkqruedhoac83ohnxy6jdrpwubcwe3b17t30ronlqroc75atfjgtecnou35243b0hrzrp75z526zo24pn29kr3436kf1lta45pad630vkigv',
                slug: 'bs2pr1l1vd4hrudwr8ok9tq6wwdufnrq0mv4ns9xq7flaog3dnqdukfad0pjchnd2rfrho8pdy84h0nj4jezdn7ilyiadcnrhk7eomc7dc9qlndddbbsfroeolptvdejp6klwjl9y8aga1u4yktw0bts2fvrjlzr418bwin2c1dk8zwyf9flyng6v6cf7lgbvs9sqr0qyuog84tszoliybhqytizp2jwzk0w25hxi8xwn4qeukd23k67jfz11wv',
                latitude: 962.10,
                longitude: 364.99,
                zoom: 92,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: null,
                customCode: 'b1ab0aq6cc',
                name: '8z4s4ry5zx8agyzn52zsxle2d6fcoivabkdmnydg2iu6ww1hy6z1ckw4i5wyifh3rx95dk1apvnjpj9iy7ro9jurrbq97j0glis5qbhkp9eaow49a6llclpuw1s6rx7quigyxzcua474qkih4xldadkmfqy26yw9ol0ty1r1r0xuzufbpjzexw64y0jlcq3d0ce2neo5j91spzduj16h4zk1ffecuq1rppczebjdsmzmdks7d69x3m6xuf9e7bb',
                slug: 'm0tlxoisiuz949b8yealo17wyqqztmrlyozfpn0iez4k3fw0y7azbf6n6t04groll6ec5k0xjvmtxghysfq09gtlqinhybmspud8bcx29zbyem7pyg11bvk6owkm7c0sr4s43s1ate1w6k5yakso9zr14jbi6xdbsr48pvg27z7y1ttsiyicnxnvhfzfq6n2t6a2mk7fz2ykmtd8mhvyv87uvi8blfx4jll2av8c6k9bd2xe0j0f31thptcfsmc',
                latitude: 307.91,
                longitude: 419.04,
                zoom: 80,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'd543cz5b',
                customCode: 'xdvbxden5w',
                name: null,
                slug: 'n9c5bjnqph9m25z8h5mvwt7lb2o4wvq74np3kbulb1e5f2m7k1qizavv4gh1rczcmbx5lue6e2g51p6ay4tg4bigetscec6kerw5aqptrdagdodp388n8h60s3jd0wtqwibqr4aif3uuu369v8wxpchya9bjfp980v0tz1hw8jzya5mkbi0o1l68tmnkn1kej6v4iar95y8uzcdiytfm0um67xhbzm671hkij382ekmh0auo5tqq3bfyeysv0z1',
                latitude: 12.38,
                longitude: 729.27,
                zoom: 39,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: '3c9s9q85',
                customCode: '77w6rv4iw5',
                name: 'u6rh2l9xcuyvwjrr1kek0cgynlr80dms4w4gx05yp14vgpxez09wf7y1jhnfovrrshdr063pgvg3dv8i9era64d0wbi7uz1mcgq56y0m9uqej4qjhjfuf20ffov6m6ghayqaeb4vool73cbws0tkct6iyh9gg70h6jek5chnbixb7kk46zgz8z52tvhlhn0idc1s6b4dvzbo6hctgpzc4iqihquzbu3bgvy6u01qa4rl73qxss4zqnrts60lu7b',
                slug: null,
                latitude: 956.41,
                longitude: 986.55,
                zoom: 95,
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
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: '4ohaj2fo',
                customCode: 'zm32bjvv5g',
                name: '4jyll6hpbcw4cdas1v16izqjmdsvrfcukwh707m0g1cer3j1bfe9n6xh05sehfazr1voj9ep0l4dt3tznrwlgst09tj6nnbjrvy7ek9mjm39z0h1a3ysrriii8ldkwr0s7m9xfyj9zijn966wm30zcii7w6ecld9qx7g9u4hc9xcwnt2hb8w1ggnvlwlfyiap3p95nir9vcjwamqrx4oc7k1h4amr7agd3yd4in7hdyuz8te32i40mqz59k3ap0',
                slug: 'oiafqo8iifnl9ou06ffoaa3c5bqz79forcn9dc9ex2smgrgq0u3p4oq8vqkk1n4ywlx912kzhzlf1zhfrrmjms1zaagkd3o8adgp7mvhrkjzv1zsi2aiyad3n90k7du9rd9kwyk0pt6tjs3b1mhfh9gswxuzdzhjamscy8woxygzw4zk22f7rrhbkzpl8u66c4trk1dn0jg6bsk2mo3cibas9jadzc4r09mzn7wk1lsjk2sn9evrerkpj4emiwb',
                latitude: 653.51,
                longitude: 29.28,
                zoom: 89,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                code: '865zjwn7',
                customCode: 'ri5jso3ssc',
                name: 'wo67ashlpmttkj96bc8h677c6imrc2vur4jwlck7pdlbgdkr11eofbtkztj6ixkl8rxpdsixhedl0dpgcgdm8xmig01w9kmgt2ctln7q1yyfiemzjy119abukvxfelu6dp0jox0nkjr48do7ab3sju2wx18nsu8odpd2cqtevvo9bbwcji2as89sc9tjunf1tt9bkvuipjf5imvmqads0qspls0gc5g3itao0baqyq5cbj9rrbtxwblsnge2ock',
                slug: 'fklulephf70cvqqaur81q1jkkukhkgzoozubxu3nq2g012jpawfkwyuqqxg86xr9okztsv3kcg5lap8oxszj8r8tari9u878t7fhj7mmunjhiwapqanzh5kw79ue9uroqvj9rdg5fujomtgf9xg59lk8blymxc27sqq8ug6pz4ds680h9g1b51kgc6de5ir2z7bq8vrf1igqms99vnpdxi1l5arh54lpncx7jd2mbri5f1mji2v6q2jtfftqmlz',
                latitude: 894.55,
                longitude: 959.32,
                zoom: 69,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                customCode: '030m8849ud',
                name: '5jc8r7a0byz97gfrcdhuw30ou10in22s7vhvr8qv738fwm3t79lcey4a9aebklwfnfs70ublrmcnzl8k5t13fsb8tzhz7bkovvs7g4ryx4vnemmq0xyftdmmldjtozx9l6qr4b93932c7iyzu2xuyh3a4zxchgtp4ycz3esav2v8rk2apae9udgsgkv9u3jfxl0y2d1wid16bcwews56zktc8tg7w7o9g2eh5a3uqht5le3xyacz9t4unkch0kh',
                slug: '45zercp7agh9gqsqhwnfhnh3clv4dhrnv1i0kytoqn3xgqvekp05bvdn8ydrp2r498ah76zroy6cd1cvngwzir2hmkrx61s0rwe0szgd62zmg77c3sdp57rm9zz5dlpidqicmu8bfhmcd1ndxwwq8bdhda18azrslnegzoitbipolocydc5hc40uwnr4rb97n6x90oefaqftn74oyh15j9imkwqrdf4t37r2fm6qw3t407tudset4sv9ttdcs2k',
                latitude: 373.14,
                longitude: 910.01,
                zoom: 74,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'dyc9v9mz',
                customCode: 'b1kawv16or',
                slug: '85abjlz3z3dhzfsk7tcbdrctkypapjqsuitmfmi50wqyki8tc222a3yk82m92h5k5aqmeo9npgydfxdxwubhl81vtq7aj5hgyiaedz7j8dlbm1j23ob84xhvmoxaykexqw8gr2gdgnb6r64b7mjpqf0b1z1mvm663c2u0ai1rn7uknnim2jct7h50abrw7wnrrpalute1pohh4jn27lz4xplkxfjphtqno37ur6gpj54hnm4xpc4vjr9neh8dkp',
                latitude: 557.25,
                longitude: 641.81,
                zoom: 23,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'e1zhu9a1',
                customCode: 'b0d5iz9ymd',
                name: 'ae7a4qowj8efpdbwmxia70z0pkcsm2o5mnadxaiip2p3r3kegoyym9r1jjs69sf9x4chv746cdqubrz6fbyee1x63vlxyroiv34x6hnm5pb02ygsf7w217sm7xxwth1e5p3pdd0y87b4ywmbp7sj61mgfpa9yobp3lj632owznia616xt1qkaansox83k0uw47tgdrqvo6v5mgfwp9uk16gnyvykizfaw0ei4llbf6odmsnkx1sy3rizj3culd1',
                latitude: 264.65,
                longitude: 736.42,
                zoom: 26,
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
                id: 'koxq5k3v2mu4r96axlu1r0yeowutop9qrx26a',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: '1fpn5rca',
                customCode: 'frib8marx8',
                name: 'my98a7mjmwx7ihu648m4938ox470x7dpbmc9hl4h9lsnttwm4mqq1faquob1xz0yke5jc0vnfpft23ge1mhml6jkzc3pzoplirgyr0mithynxihq6p3mnny9z5ypdc8tb0qw4jk2oazmr484jicjotcfek8hplpg7mac79rqnmwmcfhi3nyhu80eeitr10kiw509zb7tlvas8iut1oxr4blfnucb4lqqw29jbbcblef989uxk9kui3zfvhluc0k',
                slug: '6wimby5hd2ctczuzxp3xy9zehmj7k5liizexo7mgcgqh6hpel6pvmp1s76np11t89pe796l8bjtxzvss2ygg2uxiln03fsaahliytdjfa1i85m54a19oorr91of88nrhc23bde5k6fnj6wyn6wdeld1qxfwb6iist75bv6w3axtype6vzifznghx8wj0jy664gt410c4wczdbfjrfxe7xolgrgonsnm05zp01dlmvpt7lfnwgyzwkc7up1rfp5t',
                latitude: 349.72,
                longitude: 670.32,
                zoom: 67,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: 'sojrakir01zh1bqa3868hfwiqm3lxlr8fksby',
                code: '64sikbvy',
                customCode: '6gidixjzhd',
                name: 'be0fpfm7766pn3p2okwbo0kogbwweai3pnqjs6j3p8meku7hnxauy6sndzn17pi94731ll97zg6t5l7qz3oksthlxbldospeimjpha98eackykscimva771awvyahrtz4u050eysrajxqfi4oks10pglk3meubz43y8rixzlhj9rhkt1rwtat66e5s9z7wsmamqmfel87xqc9xl4h48sh60tu8nbmacmj16p63av8gorzantssschhlidq5ubad',
                slug: '6bz1gwa3t2cpd7ze26o653ejovlmfpo1fk31g450iixocr88g3vf22x5sub0jvbxfq38hqb0w3gvzxugdhj4fdd307z84ydizjfgv0dhf8lkahq5uaa7gvdo81mtyp4ld2lc7mjth9i7to4oxk11ifff3j08zp1ujdt7th9e8ht9trjoeg5usyum6kqqr6cimzsvw313jqfmf0ptxx7aifad44n9icpp1rx90wm57cx10mkicwhfobpnbj4me2b',
                latitude: 935.08,
                longitude: 645.20,
                zoom: 27,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: '4i8p6cnmv',
                customCode: 'j9rqn40tvv',
                name: '890j2yim88hqqsohuq8pgltq5qoy1k67uhr08qqvd4ogblukb7we73l7c0zy1i7cnwkzebdod8r6nenirlt3y60fgxmgovtr4ua4yyb244ntmw3u2ms5dyovfxoidf33p65araa4244bzgn5ujvutrkulg1pm72kvgrppmoulsc4zfrzmfxx6srexpvglquwheos7ztzag5f7aftv0b8e7yolznw6gti5uidq858w6kuanu1t5tsbp1q6lo0qwu',
                slug: 'i4fi2k2t2xl4u8km1wvigri8iq2140731sl76f5ts8x9ja8e1e847v17xsgs8ztbvbpahaa0mhuz0wa0eldrrap5h0c6i6d8d55yokfqlb62tstnqcbw48knkaav99n427mhyovgydp49aahnf1i2gzkm7bt39i7ehphoesyhpso8a8yqner2xxynh0yl8erp61twv5720izlop7l05we5dpbrtvn9cx5fr4cxbbbx3wtnojl9okhcfeh0pnsw3',
                latitude: 971.94,
                longitude: 18.00,
                zoom: 80,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'dwww772f',
                customCode: '971ocxsur9k',
                name: '5unmizkhicjao6g4x9kbaxde6qs6glnilz6c41aqjpcirxhc0mmgft0nel67shuj5hjyrz2o3rkih56cjo085lr9x34xp8qmoxrony50ya71q9svojt4ohngzzko1o9ifnqfy0mha9yxaiaeu0z0xtvcui1udb1kynbkebje4z59y80n7lbyzf2t8eb6nb30zxj9fnt72jee80ptusd4jjr2unugalww2ru4ywfg1zrsmhj5wfj655lbv2xlt9y',
                slug: '47ho2h8szrg7uhmwrws1k02bgrkrhqrlilzbx3lzy9t17dabcjzlya4ne5gf7ccd27sdniobrln1g87pyg00kmfsaq8rtg54axnxn3wdk0t2y7yf0fidqz6y4dnivl1gfk1okwe3ut23403tpstz3lopssnej652srh7bcp8rki6mifoql49iqbcs3wtwmpfv94cln5w0yp2iqy461cl2eiszubafdprjz4tzdqh70slnyzbwwdky09v20x7wzd',
                latitude: 823.94,
                longitude: 220.23,
                zoom: 53,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'kfq85jx1',
                customCode: 'dgh72xr3jv',
                name: 'vsc0ov9e62w93t2skbzdysl25fbhhouqx1e88o35rh8b4tp5ocji50bn552s2jwpwugt9k1pdfjgehjj02t7od2bbi4igzfa6hls63brjfwtuu4bi50p0lz89x65cp62vsen3cqfba5q54lj3dq2226jv0y04lelsbm9o9ib7x99hpxtd32804ymfebg1ezw94327vksfisnr24myfgseoydpf3jvdv4m0unqxfbzyl0ofcir2cifxbydx70fbxp',
                slug: 'wsnvo348roq7ziblkgrezjbwjf4j5iv4768i6xbsk926a47a6f7bi2nygdp3n1wpe7q2mdip8xza66jectqqz2hx5git7x6dsv0pyt2rf2d40eqp9fio3su34c67r8g5vwxroi8tdllocogmokixr0gtrtdeibzqw6saoe8o522ngw3z8bh0uqg8goilgy7srwqn5tq1vpvmf83s92mmzp3bsh5acegi1z1w17i5u39uisxci2dk6vydmpv64ha',
                latitude: 672.14,
                longitude: 650.03,
                zoom: 52,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'es5fgi79',
                customCode: 'k2qxyr9uv8',
                name: 'f4vz03ey2wjpqymp7bh1e8crl5y1wi52e9j9d2nbsk4b0lz6c75wcb7m32n6x9fmnvp1l1h13h5sp0un21z2di5c6zguokf2f2jpm2am2omgpaki4z4r5rct4teuodmwfh27hskv0znz2wxcuf7n2cmv385gwuhmdjda60536ceixije9ffvovsyl0ue8adbs2yvdhh014nb1sfhwhenxvxmqzp6icbqvt4pbnt7v9hwc6xi4lbegblugnxaw8t',
                slug: 'f1p4dui54dmfviatd04uby2rish16xhw6nqgtj5ftp4umw5bna9ppt7uv2hgslx3m91j0wonnden36joilado8e9mk87equlhiw51ugk2ka3qz3rexfpxlc5fak1m4yml003vnqahni5ndttqxh8b9r74hiq1pcgm3eh9lrd6ffujcc98ky9mjhsznefqygw3qx5h7zpymev9sjuw8njaw1yomc1iaz3pehs5q5bqi4yzo1t54dt9c3ljge638z1',
                latitude: 185.09,
                longitude: 183.61,
                zoom: 84,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'vqogmfj7',
                customCode: '12t9uo6i0c',
                name: 'djc899gbd1hdanjm5hfnk3r8mynh9hlh87u7kddubjctzwigskv7b4sc5azlfjsv8yqdo8w3syz6rv6n216ukx6udhkwley16wf2m46bok4m8nah7u5fqlfuj173fwtqi45frc8xq6ch65748i7lnfcbiw2ae782vtb6lbfno9o11auevf1pa0s64w15cgb9l2ea4ecd19soa2m6one8xdtmxroaqtm0vf3zkhht80j4qr6j3nhf6mmzxd6xngk',
                slug: '1gqd0ymbjw5jldq2wh1jilbmoysch30t8i00sibsru7qfidu25a74bcl4mbu7pae44aqozjog2ajs6trvaokiw5jjsp51xtyot252tk7p1y8nuuxxccdnxfb4ykc1n2z83tvys0azhy1y3y7a6m4lfvgst17d8c9w72svc5i2rhwhwh6yrucv6ufyludm45a8h5mmsajc4yle95yhknhxvxkhqiw10sm3lf3qtzz4xrquu5l7t1l59ljwm2n5nr',
                latitude: 318.74,
                longitude: 449.21,
                zoom: 18,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'tu3naydl',
                customCode: 'udphg5i9s7',
                name: '5ampzy007tnked0go5en1m9pwjolviukrhhvl7qvpmnocrs3xmj1r28x7lm1jb644mc3gd4jf9vlmdygzva0zshta9txq7jousfu43x5h84m0v7dcng0wjscvzzmtul4hrt5p3mwfygrlmzq4v6s2cz2o1u1c1rut0jciuiizm52qh0uwm00wgx8fljwj3go7wpifud95hmcyqq94qm83zbg1svvwtfgg3zpkqay5tpakpla3yzvsgv6j3rku9b',
                slug: 'ktryhj7lcuqjrc6odrf7i2nq184o0rl87ju0i9a38kfvnh6jul9eo8lvdc8n9o3ene0miif422tn3remx71szro5pwvwkwo1gaz0fk4a8oxgei3kd15iyzanlacicys54z6znpwmikhwqh02y57hs4m1j1y7w7fozjgxt5gsa15ojjq3v9vv09wd2gk7me6hntx88tad762a9ipq592nzu1nqwmtc87z6zl398bvpl5rbn1twhcry38d5pei6i2',
                latitude: 233.49,
                longitude: 556.31,
                zoom: 20,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'odv09nhp',
                customCode: 'q4uyuy5omx',
                name: 'oaxaqwdo67vlc9u643tdd5xahks18zttenh0vnsri2qpsiz5hkaha9h1i1beslxtqz1m2t293zlx0n8d7lka2pl6kvkkuqs7fhirkex09hiw98iegwr0rydu5dydcwnswn00k1bc0jj8asg6lh4j8d16ftaduen5xu3xb97fbnf4z8582yhr4rsuk4ey79wd74tnawdbthqcvtqqdic2og3lnijo5f0rcx7kdyrnho6a4in1xbon4eqz8rj8xfq',
                slug: 'gmgmseg4h4rvkimbr1i9q6ka5u30taj32f2bs8ro8oe835q0izv6ehgiirymxt2pu3g1s1bk8y7u1nqyqll1k6emaqskoo6yir9y9piy05llereuedvbl60eelmojd3mxfmv5rby7o3po2920y9t0jepnc8zsn2cb3c3vu86hicxl6vp6f1f4pbi3ewdcdqc3g0swyzdrajyk4yohq4bywdcc7x6h2jumevjcabkh1cbyjz7auqn1yswoolevty',
                latitude: 556.17,
                longitude: 81.74,
                zoom: 861,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'f4p482mu',
                customCode: '74n5h4phke',
                name: 'cn90l1xhkzieqwom935tnmv1qj3quwnoaxg1v4v18ouuamlddt0n25hyytusq2yzqvftq77w7xs2zieod5fcxbfzdkma8ke2nlaeywfgatwc73cf1aija9ygfacax4hayc57hle593p1me8d72bgz5drsscytdb6odsdxdnkhjznyab9bgx2rpnwjci7st6h0f1io7ibrp1w5c1uk7ogxohj8e0s4gky5zllyzy4k1gaee08wyo9qs8pjvem0qp',
                slug: 'zi1pyz1qzv9chcy6gqyrvixtkne2630ylpbgfn5bzx44fjcgauk404xywfs4xjfngqt6l1ma9ee3khvfhh2pefvd7hz311zmpp7d9ihbe0x4crk68m9lctpep4dv9106tuw39oo3bx3kpyllic6nl10s6kzv7f5ch7c28f6p9ft22z6tl8up60yo5coee6ncepwby31io0jyqo5sk7r9a71hrk1090i6c8nogk68w00xrc3ghokcvkb2i2k68mz',
                latitude: 664.21,
                longitude: 689.06,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'uj0fi3x9',
                customCode: '8kurs9xfsf',
                name: 'rh1kn2izcdet6ydmbswv8n0sgxkdoa0bmde3kt47yi2lafl2n5odbunoo9o9y1srrcewd0jdy11u0oclhhfih6s51w7sshp6lwongexj22apsainsgzby4fe7ew8xka6uuqi4ungwquxzz2x2o74m0bnck0nmvq45celjvvq1py096z8qehpkoacufdznmalq8mzo60wa6tkkzew0bxdrvyo8fic85f3tzx9fdvrnmshnh7x17ozviv4ojrsmjx',
                slug: 'v82d12b8dm9wgslg3smeq3ote7hf5xlwxbnp5w25rn2wpbo54qxx07rgqy69b6j2ogzt9eadgnuvo1uyc90zuqwbez92gl4jksuvkiuefkxgkmj52i485cn9xm2a4kpvj3op7qzbqjb5pp0ojo2id36d5z7xme278tzz6rzklanvc97s1lb1so3cuhc1vp4fncocs00vmldnmjx79br6w11rsy07anwd3z00fvbe0lx7q43xhls2id4s5p724s1',
                latitude: 706.21,
                longitude: 567.18,
                zoom: 52,
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
                        id: '898964e3-a878-490c-b6bb-1f8a0182d2e5'
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
                        id: 'db611540-cd09-4811-b063-22dcd13c8e64'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db611540-cd09-4811-b063-22dcd13c8e64'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/c9e46513-b1e4-4e79-bf0d-ae562a7a0579')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/db611540-cd09-4811-b063-22dcd13c8e64')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db611540-cd09-4811-b063-22dcd13c8e64'));
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
                id: 'fbace265-9bde-4301-9ac3-f570369b8f97',
                countryCommonId: '6983c91b-afa3-4e01-96bc-406531f4c67a',
                code: 'jyu82wwq',
                customCode: 'lccgzrn9al',
                name: '995o5wqvsmyy6vwlbintcejw4ud3xc8ohuhx0366dasbpv27tuiasqi9i0os6v4llgdg0oeb8wze5gawtxeucd7jm5ndvxtetxmghk8lid7zeggcm2xlylo0qqvcp2v5bw3wv6cjw4jo6r4tbzwvjzntgtoocq0nvcetbmydzgkmna212lx1cyoyc4d39pfr2mw81fpny5sah5g5kcokml7xhrqwv8hsdnrp86yvlxbsxub1d3hag3ckdt37lb8',
                slug: 'vrau65t7sgmo3r1jbduqabnljd22tz6dmzux3rb5qexcatbokyrrlr7n4oc6dxrbjriife0q3amqnhq0kgi241blg2gi8p2m6lebgjcv4vdltwvrflfxqfy4872ykoj5ry3ilpb76ofoillwz91gma06vwgwbj2dqgeux0qmkrhbyivwalimxkqen1vlrnzjvqz7a3b8l8jqhyq2v86211czc2dyxiuqjyxdx1rb5gssko3nizti6piyakhy79i',
                latitude: 653.79,
                longitude: 265.52,
                zoom: 91,
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
                id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                code: 'xfmdao3r',
                customCode: 'tuwxlktawq',
                name: '10vaxhbg5a5tv4f56ficga2oud6u3ictoynhbv8vt3xlwg9td3v9ih0fu2ui7bcbunbas2fw28itdr8thmfhwt0s8k2jcld8zrma7b1qnz4rp9gyw5f5ygix289g3qjyd321exne02vlyzyyjjsc14lxohwnb2z8xnas3dvlepgzg2e8dzf9u947tx0402c3uxxeprn1hp474jtyquhllp2nssznv2zitciacnapj3han7ukqjiikbnfxmf152p',
                slug: '3b97st3lly9dobawu39js8bsbrsgbhar9di24i4crx042u9qrp80amk8hybnh2n8k3z00so60t2h149ajheuse95qisa87mxgrpqrgomfy5bh3lyjfgo4ril2ux2ya8dfg2kuvdhxmtn7fjacy2p73e3ykzvc096qs56xawa3qccvz6pq8pwyzdobtjpxc3ouvyutobi1sx23rzed0u14wo5wyegja3m1k7ei34i2vvgtjn202inuydfw7l2353',
                latitude: 111.57,
                longitude: 119.32,
                zoom: 20,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db611540-cd09-4811-b063-22dcd13c8e64'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/948939b7-fda7-4bb0-86df-dfbdcf1c1db7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/db611540-cd09-4811-b063-22dcd13c8e64')
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
                        id: '5766fd12-0e81-46f6-9d02-4b900965d23a',
                        code: 'n1or8c3c',
                        customCode: 'mtqerwwogl',
                        name: 'r410bqh93er93vtxxt9i6xkzmredpmq762a42y9wjxl64o3keu677pm9rqzjm1d6cfwznjlfavi7nuza934k24lbxdo4jki67rclfitpx4jdqdg1xdx8sdfe3bu8unq4809ww31jct1b0u9q7vhrfrz2jy6l77yoprbugti24bl3afi6n3jpnqi0mun12wf0ffl1rp912nhf823flp46zoinw3bya45iqk9qfy8igteqcae2dpfby72h9kwiq2i',
                        slug: '6nlde3h4cuaqiaxy54gierz1m8ug0ggv9um8ah1pez69fw7lxmfn8yxuzjiyooho0tr9b1gtuufq0s5i376yu0bojg3dbesfr43aqunehfrxq05znls13uxgl6na2o88yuab2fa026ov4ypp9kby7c9hk1ffsmenj0t7dt2kyy013jiammw85077accoz4kakd554jrnv1yyohlmq7y60ukxuaweqrca4yu1xq7bzeftcwg3mbll4z3x9g1me0j',
                        latitude: 454.73,
                        longitude: 870.81,
                        zoom: 19,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '5766fd12-0e81-46f6-9d02-4b900965d23a');
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
                            id: '60a39ced-8c7c-480d-8952-c57900a4851a'
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
                            id: 'db611540-cd09-4811-b063-22dcd13c8e64'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('db611540-cd09-4811-b063-22dcd13c8e64');
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
                    id: '7977c948-75b5-4819-a263-97b630e5f1ca'
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
                    id: 'db611540-cd09-4811-b063-22dcd13c8e64'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('db611540-cd09-4811-b063-22dcd13c8e64');
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
                        id: '737785df-ef09-4fa0-b70c-3f701217841e',
                        countryCommonId: '979c8df6-a951-4d14-987a-bf99af05c80d',
                        code: '7go3bqbz',
                        customCode: 'n1oyln60nw',
                        name: 'g39dlui20xi16ozaffaqs5x0ywmkttzsicnuaihw7xwt134nc15lqk0tp8kjyni5hkbenjaozd3loa49efrbdssnlow6kr5hybrh5b9srldbg9stnmxpbns3h6t07f2gjuasj0vv1vnzmtlzv0u922vf8kx603qfy94kp3zas2cgf2ki3vwjgd6c9ud72gum0lqk3gc2d9z8jfx1luh674fbowzwf23stv48o368xs7zl2kwlfryq4xi8agqksf',
                        slug: 'i7los82cizmat1pr2fs17atngcur3snukc0z8w1bqupqznf5xfogrgzto2x8w8tw30wx4xemibsozy549g75yf2j0cr0qe27y6p3nh33c51qmmfd88hoib6qzy3zy50mulo3395ayynn8b8nmg6o2z8mokl0tf31e6q62r9t7x3j2imas9w0ks4cc5cz03qefmplumzb1u8x78llo6bwcxjkdls2zq5ams6wpvzegmgaafcd2xbtm37a1qfe59n',
                        latitude: 140.30,
                        longitude: 207.16,
                        zoom: 90,
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
                        id: 'db611540-cd09-4811-b063-22dcd13c8e64',
                        countryCommonId: '19d3438d-1249-4a46-9b45-1d5bc4bcdce8',
                        code: 'moxmqdey',
                        customCode: 'fw07m9ecsl',
                        name: 'p16y6mqr3dhwblhzuwnc50oz642bwns9egj8g8f29eiwf2y0foeonals8em6i5gptatj6uzy98e06irm0b7tgu7hsglj737d6p6fjb4uzydmtr9c17pl84ao4wag6u4pzmsq0cxwevldjzvquus3cr9jsyy4wykp5zi0d1qjfyw4904mgq19zvz5txvq4e010zdlvfyl9l5e53dhsakx71al2mt7b0k1x1gjhujz7qwfx781fjxlntbk79ptpj5',
                        slug: 'bh4dx7aopcsc6m5xcu3nmptp0yn19hkveoo1jb7zafxod421yk4mhtiwcu914tskk1bqjb9hsvbktb09p2ktayenag4szk5gkpdc2p77363mxhvxkkq77yoq0877367oyp7myu1mz6pn7o6n68gccg33qu0fnkrb29h0dmza51ioo3yb35c64x82bb9z2w044g7n40tpupic1gyd2wqbwwjbbmkfdsoio0pr4qswdm3h8uhrxke9iprcf9tfo1j',
                        latitude: 668.17,
                        longitude: 649.68,
                        zoom: 60,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('db611540-cd09-4811-b063-22dcd13c8e64');
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
                    id: 'fc26ea77-455d-49da-8a44-c8a31b512e6a'
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
                    id: 'db611540-cd09-4811-b063-22dcd13c8e64'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('db611540-cd09-4811-b063-22dcd13c8e64');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});