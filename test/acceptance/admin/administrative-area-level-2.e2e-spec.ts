import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
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

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel2Repository;
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
            .overrideProvider(IAdministrativeAreaLevel2Repository)
            .useClass(MockAdministrativeAreaLevel2Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'x0j7luy1',
                customCode: 'u39qtyu98x',
                name: 'xpfl3uzd3m2wme5oyqcl497pms3q9b79esav9itk8e5iuf2fk360bacyrpmzlvbjd9l6viikjhlwjibq02zxklbsxkjevb1f8yp0dkdjqwy1q66xmnpjjwsvxp0ykkid86xw7ewvey2a2rfirkzw7c842ejdejk7i0dwcgf7winrtu7epeogodkv6oeo2yykshfdk4okwz7es6fkn1s2eyfmfhvgr0b1qdkoxu5ccfylpaa6wwbeiqj3ttulk0c',
                slug: 'rs3k85j0neu0bsf4dazwtg9phqcsqlbfcz9l67to108qzv58tjhna6e663stnrtwki6i43f9osbrj4sa52j2mfa0rpue9bs6gwra4sw64xh5aprzzdva9xraxtsgjbfiojrkw2mdu3scibiuyya6fdtwuq0b4qn11ckf39wojqnghnghin6kirssrv50jxwyb0uea44dsykymqph3r64us0hzhnp9hml32mgemuhogh66vsmd226jcljf27ft8b',
                latitude: 715.91,
                longitude: 243.09,
                zoom: 10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: null,
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'oywde53f',
                customCode: 'ezhicxofni',
                name: '7f9g2sf50jiy8zdk2hckgzf5eyxag5liv9oj5e5zib6hdccd943lcn9mn7su7zkquv7mdvpzkl3tnlvlsblwm2bjgkykxzmyhe421phaogf3tgmgxy2wj8b5pf8ow18nhhuuxhkzj18sripukapv4jgtvlq900l95v5317a6dysnp62unktu1h901y5oco64fhy5o3eyvqw039b6ytynhxkvix64wulom6nsqm2zvwjaalzhvcw2eyl23isr57d',
                slug: 'a8wn8edpb9veuc291ncff8t3wr175w420lwm70nco2jkrp4fb8kpzzu7n6jnisqspgzh5g2bwqy6pr0j776eypctiro7d6v8hqocz6ahklj28904xuvfdsp4iest16ympra5iu89jo103f0ahlaa83k1g33ezo1gjzj7dk7788s4xwlvsyx5h21dp9f6hliwi0pjex0718qelajawe5hgyepe5aietpov33w8g1awuytanxagxaa2qivfpnwynj',
                latitude: 761.69,
                longitude: 441.17,
                zoom: 45,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: null,
                code: 'nqoin1f1',
                customCode: 'a09u2j5xu6',
                name: 'eul9ime5bm7tlmny4w0dxvb1nt0r1otfxlsbwsn1k8r3swzfgj6fdz11l4xhmxsdn17z3twz7ynijuk0t4exizq8bhpv6ntsjgf7fni767vu4wvaqgleeaan42f3xflrr8dvs9u2a86plkgsp8noeln3529citrkpi3zma1e17r0d55p6v47cz246m3pn9v3dhqcky7ee22wbqqa79yk1vn83zww47nhfh7mvor7r0i021rdu6liq9mfqwacwei',
                slug: 'yefgcud80jb809f214nemk6y14rb1cizb0w4xv0u7fyouf5zlghvk93bfoff68e3ttho6ab9qkirimnodcdqjok0k69np0mhwiuq6scxu3v92olg1fzkzflx1ywfs3yttctdv57q3krdlpddlr27r6b13a97s2ro2r3qom8gb7hcvdejpidi8lgw3xnehpyq2ap6i253dc2ttq2h8pkbmlmlow8umps7acsnb3c2n4y5w2fty14qn9fvf306ql9',
                latitude: 539.87,
                longitude: 880.65,
                zoom: 43,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: null,
                customCode: 'ig4frh2t4w',
                name: 'f6wyf79dbjf6emq6z06h3tmp9zv6zaijhmsuqkiu2huer7aqfidncsfe9ig4snz8d7rhu82bapddvoajpntl3qj7ce3w5plp5b6zivrz1tsed9k50e3i7ofvonm5ggr3c5vti52zp7w8ooxvhxr71i77cw19u2d6ljam3ea7gp14sdnuiqvv46y8cr5h3msr1gensmya00q036abzgw8usdehxzhvsz7iajf5ywki34tgh5wvehdoc0wjoexdys',
                slug: 'lz8ofcu5y54er1py6ucvnbkxc4ajefg8hw7f8a32dzu1rifbmb3bibcqv4ykpxpczh1k7dm42vh7sw97cutwed02t54q7wrtgpfr07x9lw1uy2ce4popswza72quxazij9wm8vu34cmpgqsyyjcqtm5mt8m5ot70mh8kyf7citjtkxyyxjwc846w791xq5jt0pbr26itvgxazyyg2aliv3qcodawidrmdbyr67tz1r85c7rp4d88x4c8i86sju0',
                latitude: 780.70,
                longitude: 319.95,
                zoom: 94,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'rc8ss6qv',
                customCode: 'xtgl2ppuiq',
                name: null,
                slug: 'cifyrooxxt164pwlkc5hkjf2p4d93w9dx3bj7j8y1pb5bi6pxv1n8836d6ddjhfraf4kbnx6c6uimahx5xrosl03f9ktf23oh759f3d4zzzuo9jomu3etq05ekeuv4f32eoppgj1x5tb5dtqg5ajagcd3vofw3p08hpi8v68u0ezjgl66zc9x87dwd2co6jplq1ybh1ha15xnxbk5niiy55abqrapbua9pxzoti50tkfwapw0zsa3gtyb7ojp6g',
                latitude: 237.11,
                longitude: 879.74,
                zoom: 60,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: '5sp72q4k',
                customCode: 'rhiin738fb',
                name: 'v0sfwbhz33jhp35fkhjy1hqhwfb4vzdtif1cqwyo1uje5alg9oozkoee9jr2zec49g5il1ic4lczaq1o4u2bn1a5o59buv01herjhcbxm3ce8lhkrfwj0791ccz3s96oygq7j5k85gl5s1x977pg2udpk04gxx9qc1uecpsgkqcor08bnjpn7j2wvark2rnqh1jfh86erdixpx4ksyr6asfux9ijego89dk5g7g8597ysqz76fozxu46ivokxbp',
                slug: null,
                latitude: 996.55,
                longitude: 314.52,
                zoom: 35,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'voz0b7zi',
                customCode: 'mr6b5x570f',
                name: '5fdff1s6wfqmygcx8m544qdwzcmkbsxt9vy0baj8wwevz3pfy2ou8b4mz7cc708fbey359da1s3eqfug8ft98x4bdcm25x6t0tiepsar49esoa79ywmbkry3ehmt9ehdatob75fpghlc9xyupy4o9xj2hxwzsmsk5qku3tngeb4r5vhmvgjy9cwf4x19hnqkoekpgdzv8d8n7te1bafu7rxvdv0w21h0wiuoeiky99hsb33tnxh81mldjyxgqsr',
                slug: '9mqwd0lz12jxmy17xftmxq2e6z0ome6brv3jj3idxhw7wvt7elousqovh8znqacdpoclzjpyphxr9kwcn8yc4vdze8f2avndcp1b8pqmyt1ajbffpp9cadwdcj3ryx64h6dr3cmk2ho62rvp8ahgmqvtdikta0v59qt1lpqsk27nobjcyngmut9d71f4tu1oow07swepr0rm051n1r9sghhjnvydmzwvclghis30x2gvmjs5dolktjidn94s96h',
                latitude: 979.67,
                longitude: 681.32,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'nzd5yl5x',
                customCode: 'pdiedwhuah',
                name: '83p7b3p2vgupar3lvu4mcbvhewkn2rfotxyshka2y0agyxx7bmuw2gq4gruonqcdjgr4vxwebv4fjiq7v02oyu63hjphrv4mhtuksqw2qzz6d50vdqllqd1ktp18qqc44r7x4kndqclmihbtl43wunx7kgulignzuzxzp2w5k909ccao8opi9jk871yyxvq7bt4mz1mi85stvidv70inpjy0lqvg04mur5lpq1oje7r8rllxgvmi0lncrky5z9u',
                slug: '5fvnmlbjh0npo2an2k79hxtmvub4vo5lb83o312csniwn2qlyhblbz2b5mg74pxfwtk3gkkwb82gmbq42ra5o8em3xiemd9ija0csye54tmmo07bqou3vzjpb9ry8wng41mck9as26zbiox9zlo5eui1f5h9t2zqy1zc5usl2oc5ewii5m6k5ot2pfb3il7lzm4htbiee17a8zucx7xynskk5oyux1twp9f49cr579ctvlh6jj69mds74lovwxh',
                latitude: 648.25,
                longitude: 422.88,
                zoom: 92,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                code: 'dekgw7id',
                customCode: 'qzjz2wg8m5',
                name: 'vhq622eff53sr3undp0xxgmeim8xgqqs9e0qk2ma1r3duik46ybc2av6yhuu3tj1vw33sjg1eb2owmns3ub2thtkiafe6s8m0isatc9os8rq77o2vdqyc9muqg7pavaz3gc1ulx0cjh96e5voh8xdxnukl3q4j35356yre5sha3ia4a14u875gflue9fh4640hrxad49jegne2s86socc3f69r971mfyi127gb7n2gnzln7mo31xyx7g9dwflv5',
                slug: 'hu1epx7vg1eqsjl2q4lytwwt20kr6ujlo2jrbcb9rvyl0ofdkby7orc0phfvzmtd3vaz2ashz8mvzbd21bwj6kn5g2jbjibm78d9kx06xeoqyey65l0y7gyayf542gs917umnneab237w0huuxmu0x96fn8frnq7i4mp5w0fowvuy2fzshzo44o7ilntdz3bwnm2dscemmnknz1o3eo26wlf7e2h4hklaxwb6btz4h1qkq4d28j3lcee28sfihe',
                latitude: 433.89,
                longitude: 582.28,
                zoom: 21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                customCode: 'c13z574735',
                name: 'pyavyl8twsm76u36o9hwhdlippl1662n6sxipcn7fx1da7ozlrlutg7ke5w0er5xi305t9fe255hc1xstq7o0n260v6jvtv6qjvfibamer3ftnw6ttr5drupb5diaigw0jcitg4ba8hfy4ql3kcvwfnlo8jriv6a7wqhjyj86sxoqyjivchovcz2qwflalozzggrr7smv6qyyehgepsgpbsbppb2gepym9g382neo83clxowp7s9b5gxu7ugh8v',
                slug: '4zpkzcvvhtoj5b7nor8bo5faeyax01xpglq7d3l6zta84c4dbf5z7ytup4bribixljoidgmpr7txu1gfg4hu6ab39ndp9hipp9lpyxebkt8z56pud0mr6lwh2i0le8fkm72h5a2kj4ftt613n1et3sfs49j4yawu5aqrwf1mxdca15u9h6fvpqb1le26mwi5304jwx67lm4tgcykv10hby8aty8qekb87w4fiaaess2nb7w54y9cdryswhi1jpa',
                latitude: 789.47,
                longitude: 368.68,
                zoom: 85,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'xv9l48f4',
                customCode: 'exl6o1a6mg',
                slug: 'tt4a3twrt68wwmwa6kz5wg3z8w0a0pu8atm7vbub1zfe4spsnlt56cl06dc3f2c36qjv5b8sn18dabx5xqzw5vu6c8maeesgnwzjsvc8att4t9yc7wqsdsjym75b66p1qexiapqjv1rwb4asjb7301x6ogndx60q0a161wwodb2dikhv4p6u6d0mo7c1id3qtpb5ogfhhwj17mqzrghjbbqmrtmeyisr2b7fovl6maj0680rg143bitj38488om',
                latitude: 875.58,
                longitude: 357.24,
                zoom: 13,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'dy10d589',
                customCode: 'd8r32dxjin',
                name: 'vcym3uzh5r04gdaxxhogdtl2atbn73ch26uxj4azwaclz12mh2np8s1vrlirqi7eqswzh47lyav5dnf7jyh5x8rlxfo4zg63nntrlwxamj1d6kxd4q2mnm9u96o7qdrr5e25mbfgo8flkkm4ax696p9d9qsx2wnwbu1upbp87zcl0guaac3654z583f5oomb2ajx151h4qtujv51njnchl3zbd1yqnis3kugj7pc3hes0a2akd5576f0iwuawl1',
                latitude: 877.86,
                longitude: 313.95,
                zoom: 58,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9o9f6ldrfh0xzhytf2ss37v51dnk6r8y48qsb',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: '4trf513x',
                customCode: 'myvvppvk6k',
                name: '67i680ajp7anbnb32wvjj90z31b37d3gd4tnjg3yd8u4kidpx9suzuc9fs4pqhe57mitutnxcj0pgdk4nzary9wyaaehb6g89jmbvwas5x1mnk8zywzrqjggi1n24f9y3k46h03odsz752mcvn9kxxdj8h7aprvnj0u1o9ont0x1a2ryi4d9q498tfkmzeb3cuctnrc6t3sz8oppvpws79rsyw8v9y9pq8nldjza3t4g1eryz1dovgi32lmp01p',
                slug: '9kampqjjgqk5a3q3topvr4v2ez8i60jhca8b3ybo4xa2fn53a009azb1zvy9bzex89sj8g4zxmyd5t023b1mrr7mt30ekguu6sozhj6bwd7zeti1gp14nnmmvluo5z6abllpvf6614ii9ux4kwy7abkuponyqxcad0jylmdcwgadlorskfp9k3y2lf19d2404fd8zwvm0d342h8v4i7cgrt66wktflvxxd1mht58bdxl6d7vluwigbyiztx8sci',
                latitude: 400.83,
                longitude: 109.45,
                zoom: 35,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: 'gczf0cqbf9cmt6k7qnxl79brkzynfo1fmck6a',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'izzok5un',
                customCode: '8lxz2oen90',
                name: 'schpr5nj2iil8qdvexw9dkriwju14mgxxcgkn40u1uc2wfr3dr70p9vlnyqmfk3j4ureqt49zruz9fq3oyp66rj3u5apysnpvlf1s8v02yflfy2meglbohejhuffjzdgdrx8yysjtl03unn9cikvb256ibsvavovm5lut4ffnlneylx5qw96c8fqn65b0kdzezcii999ml45qmizckzta0bp0c6qeb4tdi4vwm1pttn7q81xguyuos7jyrv76h3',
                slug: 'onm8y5hodv37c1r9br26wc6nj9wfl75evgscq2o5mmytp7sf3x4im8i5rn9uc35ra8bc2y8kty1xhzr5lkqo4xawdxulh0g9tyjib97wt5ooogr832lhoupd9o9n8gjcscja4wwejhdkkqrmtiiscka19fqmofkg9voyozaafp1kfn48sf0mpdhoi2op3wyh2pnofsajnzvsefbc89ixhwvfw7hy4v8pdzo9r0rfy1xdvidywdg2ky0smyssxq0',
                latitude: 859.20,
                longitude: 942.22,
                zoom: 18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: 'ozvu3152mp3tprhzedpt89kt123o3ou4l65ka',
                code: 'wgp0jfaj',
                customCode: 's31rhiop1y',
                name: '378iim3a8w4h6su7y6vzhqq7a9mrpptfhbkretbnxk18ez16hxquj1xp9fevqqhincmax9qh9ap5uam9har5u2tgiw2udhncmboevjg0wum6vvxk9cwyy32n90msw7xhnh6rqd9c8w04p5lsoj3yc0uupve6c7798oduo1mvdacjjp7ojnuaeuv8xujdio2gth826x6pgbipcij9739jmeujxphnwr2otbhmflwot3fhdezd2y6eqf7r5b6qajb',
                slug: '9abamd1tmakflrsljijy9nilx4wh4wb406o7km1lroko30yz5lz6ejc1jol75c47jj9aw4za649ps3wc12hpic6y69s1d4ueoy455k95od7ku0vvbntkmxy5i8uuo65upz38goibb3n7zsb3sb2bz3owz71w50ylyoe7gifim7i6b12w1ohngv2fk8rk2qk5xlks4nfea5im2jyg46v4kmzn1vw73updubjmm58wy4zk3vqr5dvv2mmfz8hyx6w',
                latitude: 38.77,
                longitude: 494.53,
                zoom: 27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'hq6qwzear',
                customCode: 's6nhi9jchm',
                name: '8cm6628x8iyd31rbh8f01xf7sq64tm0id4d3imed78csptrj013r16suespsx72qcw2iaf2mr64ov15h20a3yof4hvp5kwb5izck6fuzlimotecoxdurbtfa1n3bratqxgpyup0p1p04uch0maq5qzdmdw7ug5hijd3kaahtm4n9awwqe0tluou14zu80l3li3tx7hbc3f0ufd88upz480w6fd5fnv2m5cxozlp124x10o956h5v8ipq2kqzmel',
                slug: 'lci69nex5pbbnvkcjb7vcbeh2af6mpe0bv4qgah41w9k6wcm5u0ga953u02l8soz6k1apc69o3kt3bexkqf7q6dx3y3ip1hxyp433xg5ylfme9i85ehhhgjdmiuw1q7fe00yvq9cnumgru99kxj0elxnol46bcbrevvlwp009gr48lrld95xsnli3zw3h2x5t9y5frh8fpivo0axmlo0a4gs6xwjmk72dpsbbbrygtr31q79w3si92huzgpf93e',
                latitude: 193.64,
                longitude: 706.47,
                zoom: 50,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: '9chtx2os',
                customCode: '44jaw9cuap4',
                name: '1yccr7vh4s2h3atnnyhyqmzvwm807q9el6spxudtqcpf0lzvgw51tdlrjwe85gt905k1wmyzf3xaohd9ob183soshuwyfs1a26ufgmp2ympofyyv7x6xn4mesyd71ezry64va02ayvvk9aifckp59oc95t0gleyz7m6l3yb4i5kawhujs8qu57w8nytvgfv8lj3tg8pdznefyuoqyrzrub1c112n0mxi1ypy4m9tf511hd5sob4uy19n094htja',
                slug: 'b64rfteqroqfzod4175hgzxw41bb1rst72o1nfonc39tllnatvutkpdcyvp9gowrvgbscvqyrdzc9z0qsxp0zs2bkangz3fu7ngezyfpe6v98nmdthcw5ypx45y8lvolni5bwjuykcsc7d75wwwxqi9vzeevr2zqhavw2ppcrq4ghdtj2ujq9d3nqstfq5zk3r4u8567jwng4ksm3zan9r13r3wrctj0zxo5syjg4agh1osqoigth9aw8j0lcz1',
                latitude: 682.04,
                longitude: 46.25,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'nynregdn',
                customCode: '7kp91cyd8r',
                name: 'ribagm87354524og7myo2ooy783x246jkykqtzzyxpxrc1z00ssadxl1jg7j11h2up2bpca8hlzxb6s2dd0c4oywu0gh2u5k3ujr4rz9i1z4cozp25cwliudpmfcouigoqn03rn5op5jfnqk5j17ses09dl60u875wpsq5djhzecmkfyd9bbrgdxmlow6q6o7hxynxx0dgjpc8ao1nqafvaug1hc8nc9byj4ktzhq3029od7yszk6f5dk3df5wbt',
                slug: '80ueocxuf8iwpsjk8u7wyktb9df6m1ktw1xk37mzlp4uim96kvbzca9c1i953zuf98hd55kb39c1texxvn23viy72fo6fmrvabh49tjqrrfe1vt4s5f2hyahnchj3zofe9jllbv8ip0psmyc37kr664fa9t4neg3hb7l799lxxumczgsmcrxciitslz8dcd24uwn42jfo7giwxeivun9fvu63201yrekp85nswr4ul989wbr1gz0iy4imfj6x8e',
                latitude: 825.78,
                longitude: 452.65,
                zoom: 44,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: '6g41i7yq',
                customCode: 'm6p0dkqt9a',
                name: 'aqnbtd0ps6bbwa4go53dpdaijszydngy7s8ruoeh9218epffny911tumrc8uq9w0dabw6m28avsgvl7awif8zopcrr4ghgxjioqcenyjsemyu2wqugbmqjuzv6l9cd8uklvw7uwxdatqiybcfdz6als91js9r27ymq43q22pntkuowormx2ke9mnkv60rturkczksqedr7jc3ysyssqs1w9jcpqbliom1kddvh4rzbhnxqtn4oszz3n84cfm6ig',
                slug: 'h5mh225g9fs96kmdjvg5f0r137lsvoy55xx201pgzingy88md7x7yysdfea7n3in4ji4vr12g58idboc4a7otuo4dwo9yna5is0gvz6cn6262hvzml5hcaqzuzv8zg1495cr765d1tbn319umfw1lxofc2m3ni67jm8v539qx43ypmviudydy0h7rpie64y8oexj4juy23y7g914xx84oc751j56i618la9gk3p9iab89p9bevglxnoigr57m3mv',
                latitude: 627.56,
                longitude: 962.02,
                zoom: 61,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'mxhut6ej',
                customCode: 'kjwef1kd4g',
                name: 'hyhdu2ygb7ridcexytj697l4y7dyzd3uvnf8spuxtyykl1u9dka8vlxreljlryt4ez452zukmyifzquua5s56oqkc0yv68n72ihbegsc6w04s399k8sg2043l7wmph40yx62mrvyb5g5nqruleb5qwpryngxj288gyxui77k9cgtriv7ww2bspruwjfv9f4wl1r176rngocdvfxvvyl44kute1249hg0beq2ce1gt73u2u0ibeiaeb4kcf6ashb',
                slug: 'h7bt2h9vors9iwzyjk7e2oyhanh9ft95g8z55uoi7p92e7ha7l9jg5fdt6bu6fdbdquzmadsc2f9z3xo7tp3brd6gbsfelgg1fc8editxctyagluoafcp76jvw4xlfomh3ogic8ky4prfiea954a9n7xom1ydcx9cxyc94suu87aptxzuuae25wk6uteis6a2jy1k1r88kqo10yt195kpanyeeh471xmufbx1jou4aabbh305tl3zida0q4xkcs',
                latitude: 646.54,
                longitude: 866.38,
                zoom: 87,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'uz8gn5li',
                customCode: 'dlzfrw0wo7',
                name: '4xx9nsew9mj6d3onph909gvtcyo4b2bgchhiwhawkpmwwjjn1alpeoj151imphpztr7guc1ku6iqxe9h9j74eqlhvfoyc9qw3lbfm5eixxdm9gffhrrk7u0hvr2hnrj640cv9c8g5y48kr995kw1l5nhpc8p0oezqtx75uo6zw23oj3y6qaiijfnzoohaffs25sics4fiwfq3rnzohqgltrabhisdkegppytnnxjtipbe9htythxsil6w1caa85',
                slug: 'e2ua0o6m7qn6fnuj723aazd61o6rbi3vxv8ew9h4dgqtyd1qoxzukztroimjbh4xackfkacqkd39utqp53zujyntyvv6pl4ndvkre9fl3yonr294ld5gnjwrtl5lqwo154yfjs8heg168w24iqm4lo4wzfqzqyul2aqcrkphi6jd3111uu1iklgx8ttk1spo7qa9j5j9mu9s55baq505p0rone5tsb15na3718jvoqstib51ekrz8rjiw104yyn',
                latitude: 55.76,
                longitude: 427.30,
                zoom: 89,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'r50midme',
                customCode: 'ionl7anpwq',
                name: 'k0t0rpg7ysj6am6ddedqbb71x7010taldrez2yuq07nme38t65a2njr5euv21pbppx6q6nj1w7ngyayyfn9xit6bc4u6l6ydkeqclv2clsuovjolats9c49yzig0fsns64462uxuxcxbz6cd4d8wo1x2m0w4bzdq6maqqw4tlezmh8n3twjqr40cy84mdloyjgd09ak57a27cvvr58vxo5bm1c86lvztqrxrrt5ehkq9nmda4xy90wox3c3k7n4',
                slug: 'iaaweix276vdxmttbf0j4pvwftay15z57luhkl35hszufgyvalchnsridwb5k7s3qwyraoel2inox76r8ibb980ppcn7lfoqz69c9lv9hp65n1yd7ekf3j8fs77d3nk42rve2edudx55gw17hcva2rojot4t2xbtjsv89y05vq2v07o0ukdb174wlelsf6kax3xgjer6qq3ga3k4pnwh0ej8behnpwpk3xdsjsdw45mti97c3xm0w95eihykdqr',
                latitude: 190.78,
                longitude: 973.96,
                zoom: 345,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'ofwk99e8',
                customCode: 'wduc0ghdpl',
                name: 'azdw4fvdn14e0ne2evpak07lrwr88ufzat5i1us2tqqwb4mj4d3yn3msuitbw43e70abued5w6kbn4co20a0gs3lk6kqzpqvi78fvqrerauagawdmm38pc1y1v3axqobsjr3tbea37uoch771fcaz9m6soq24nk7hf4ry0r1nvz3hvq1dp0lay3ih52xol8e5mllcokn5naf2jtmawed9riv4xv3f6hgdkpw8y22q1wywa8ropxe3en9wawwfc3',
                slug: 'wfvw1dc5158bjqfsblc4v2zos1ek66ppj16cz9qhz74mf4kwd9vmv5w34elk21vtqsxengcovq5wefufdzjdsd2j8tl6qk49tb7q72ccvcihiht0ortipuxyfej31n5cd4ataz3vwc87ax7m7qylumqd7t40cimyhcu5p285w9lo6is3dr2alrjuq1j6uu8jk9v0xg4mhkfc7xkjt0i5n3ox5iiwn0zpvr4ziw8rbv6lw2cwuxk3vgcsakiy58s',
                latitude: 284.00,
                longitude: 382.69,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'ad3vvq2z',
                customCode: 'ck0q6fqh7a',
                name: 'l3nh6dhtoj25vgvpst9uzucsj8fw6sk09ev59e9jodfgjxwy3plvnej9bgeersycvaul2xikcndoszqgdbnxkgthc0esw4g0l4u5ca3xiuu1jw8os7bv5ogll59f4m733b7h3y9bmev40o2xpfkkmjqrvmggnrx4ilij86huwecscudsczkahv7r1exjy2vuysfn9ajzvk3l2kal3zgnr1dkkdbnrs3z9wf9g1qbjqc3yyl3pq4x1mmywzg3uyv',
                slug: 'qviuurjfpx94saf5ohp6rlrlx8fq4ae4uk21xycb5ha70dm4n8u9kid9a82wxcygqwm17e4rxg5ypof8pvqvn2s415l5s1lm8rn1ac80g2hj4fbtmgq97z5z3lmjq10v7x393ni2cyncmomorx3804axpmjvmtwpqglbpereisgcu65bowx8bdlpzjsgd8hqgujdr9pueqroppzita2xhtyqg84g07tfrxm0n7pg48uf4trkyqshsf722lmugq4',
                latitude: 332.77,
                longitude: 837.22,
                zoom: 68,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '183bd940-2a0e-41a8-9e9c-5e4aac567897'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a0bad4b5-28d8-434e-8df1-26055b29fbae'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/d0a3aa66-b0c7-43df-87c0-0bc6e8d1417e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/a0bad4b5-28d8-434e-8df1-26055b29fbae')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a0bad4b5-28d8-434e-8df1-26055b29fbae'));
    });

    test(`/REST:GET admin/administrative-areas-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a1d4ab20-d6cd-41c8-9fcb-e0a819b9ad1d',
                countryCommonId: '177e6591-eb81-4547-adb2-9b94055fd3bc',
                administrativeAreaLevel1Id: '71ec8139-2912-450a-be7a-413d663aa7b9',
                code: 'gq4egj7a',
                customCode: 'iko34yb3zo',
                name: 'tbawfnskwfo0jb33g5mcuqjfkkioe47o431hsigwtjqzxifzqrshydbsqosm0nxrc0twxj7p6w65wudhatcsknhyy46neu8goet4tdb33h5z6kbhx2ki9k393cpdyjeue2zqqcjhj9eq0kokmfe1dqwsjfaz9ur8h92gdfz2acpkmwlqtjrkrbxr18g3f2yru0tlsyb2vih0orf9hq2a23e47opn1g2kpidhj5da84r4d6paa6cpd34avin1avt',
                slug: 'dnhag5i47t950nu3vtuydcioljcg0fnvt9q115zzx8iriisj6ilcqqmby8h3kjmzt3llvug6hsj8o6f66tceumbibbae6w7gc6ggvd5e5r15anxnuamb9jfbl1kvt9ex882mul0l3diacclf3ncn0dihh5govx6i4rz1igeh5k03c44nb0lfes26ln83nsilz63f8j92qp0fi1uvgxtyekd7qab6edddjqhk5kbuxxnx3yj8afhptcdkumhjzl8',
                latitude: 583.27,
                longitude: 297.49,
                zoom: 87,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                code: 'psu0ztve',
                customCode: 'qa9za2pa1w',
                name: 'e3vw57kf07ty77hnqjoewllwvs6qgyxhlne9er13pp860z610j58oc02ydovu5ry5y7m933lrpdfpf9uh6pwglz0vpk85nnp4gpukf6ohw6cassastl41tsqpmg27riyt85njv5ukck376gsmvoxd7o48thakoz7zsl7l3fukxn0r5r6pzgz105r6pt3vjo3my368zrvofwgigtbiy1f1n2bjteetjsbdzoclqnhzs1lcm76z2u2aisydb1tm07',
                slug: 'glxjffm6gjsmgmdotqwn23v0ck7qls9iie7x9v282qunpswor2plv8k88tqfrt99o5hkcwbkzxbv4s0r4bs3k810xdno8z8bkka8yks5l00ek5ft96zwb3scnmr3kz3gvc7ncvmskxygv25j0e04wsryd2p632n41zmo3sggb8czbzrzhflmpiejortyyh3ln16nrxeo2tsrrwhgcoy5gn08p62z6csh9tkrey7637t906l7pram62vlgtw26cl',
                latitude: 427.86,
                longitude: 278.78,
                zoom: 85,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a0bad4b5-28d8-434e-8df1-26055b29fbae'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/9c51a25d-da8e-491c-862e-11770ab9abaf')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/a0bad4b5-28d8-434e-8df1-26055b29fbae')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: '48eea65a-feae-4721-8de0-71b037d48f25',
                        code: 'v7xxive9',
                        customCode: '3an76rq8lh',
                        name: '5006t6llaawq3inzv1oaccb8crx3xw0xhilftlxnmyd9m1m73ldrtyt8b0slzo3fszhmuqku0ojc2hhs7d6wq3seppvm98nst4i3ft5dsy80y99qzltfnnfyirnexo02floxlixgcbfnid0bkz5rot0497gru8173kh0fnu6tucumkv5htvskh577jo37kd3sofhmb9fm9qu6o5azkqtdpt3zvsisdfuehygge940av9oobx8kayyylw8e1gi2n',
                        slug: 'zuyaut1znsqfykhh7geai0uiv4aiisid3ht8ewsj8g9dtf2ihmjbrgn6ixyij7rxjfkl8668w8hfm27w17tm937sraw3ggy70hdq2cundqurywj26heyxyj3iy7o642xz3lrmi40kikkdo3vfcwuro22uneittl8qh5sjtcn8alaksj8a781oi8yte8mtezrkp76svjm8oyi9yikl73cpqfnwxhjv4681z5zijcdtfqxd3f5lll0drb4oaeasum',
                        latitude: 608.97,
                        longitude: 695.64,
                        zoom: 94,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', '48eea65a-feae-4721-8de0-71b037d48f25');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel2 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
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
                            id: '77c6c86f-7830-406d-8007-4fb92d1690cf'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
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
                            id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('a0bad4b5-28d8-434e-8df1-26055b29fbae');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
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
                    id: '7a10d3c8-5b9c-458b-b36e-e16181f073b7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('a0bad4b5-28d8-434e-8df1-26055b29fbae');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel2 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel2.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: '168ced32-9c5c-4570-b5aa-8d017518ab96',
                        countryCommonId: '56b07eed-f9a5-4178-8307-296f4fc39758',
                        administrativeAreaLevel1Id: 'be4fc1fb-ffc6-41f4-bb93-22afe44ac006',
                        code: '682lodey',
                        customCode: '6uzxwes937',
                        name: 'zsj08o568hake8lmf83tt1p0o80vn30dpx16t6tk0sun5a2wvzr6tzyf16lb0cz94yrjzkc4djv17wlz7eicgonigruhr3v4mdkgdpkbwz9agvqokdmffygfsepqc5jwqgsfsymph4h430kn3cwbcsg3hwirx2kojqq1n25l3wrn1wgikuayhmdl2z7lo6o9s7r7e3zr6xkkx6tmrhf0vo6f5gtjngpm83x1rja3dzexetz2msb2c1y6kk3m47g',
                        slug: '2wkgqwdcf8r3dh12hm8nrev4nhgcm72j2o6mcggzfm1yhbuwm49hg9ifb49f0zzcuydrp699rfgjzqai4yzlrscbjb4ww6410sm36tjddf6k3gbu47tqiqzspqi4nv1dfx4dt1zqt45zsijrhubdba4gwztqtttzi0grxgv9d5e34w2pnbagl58qxlfsvd3n1s79fc1q1l1c352b1hxe095o3ekh3u2ecc7y3xq7pddi1ko8jpvmkto5budzjb0',
                        latitude: 722.44,
                        longitude: 524.79,
                        zoom: 99,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae',
                        countryCommonId: '1d8a7663-d86e-4888-868e-ba67929a33f9',
                        administrativeAreaLevel1Id: '92a89303-cd8a-45a3-80c3-ac21ebbac24e',
                        code: '19h126ba',
                        customCode: 'v05nzyvqa2',
                        name: 'cl9cj5swklxoelh8wkzlztwvi4ckb5gm1t95xb2vkgkiyut9qwnun6ho6sofozdk0i4b8h2oehow86aalqaldpfgmjvxu6wgx19ngmn70tu6dq7dkmkl9lmt98vybf7u4twe9py18qe9syj5wbdy4tizfg3bf1jj941kg4x0s15f4jh6p9acyh7rg732btmm0rc514tc57ov4wvo1i0wonowtobkpw8ad5cxnebt9f9mibmwaj1rfjn1hf7z5pj',
                        slug: '6lmubgdn8v5s8m3hnz5qm777zbfoqprdp43b7umm2g5h65qnsrs2rm1dqi29varrsuzcw773ujtkcpe85asw7acxhuaq9wsboc61b5y3s4m1kfyrdrabmpdyos2qatgh9vavm82jml8hkvdxt66n3hq0azd2jonu8eoge957kya9h25fhzxr6va3kqa92x9oa4reinpngw49zmj7ly612ja8bcy983bzw9umdke4bv6gb4p8xehp967qgbmhqq1',
                        latitude: 360.72,
                        longitude: 42.66,
                        zoom: 54,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('a0bad4b5-28d8-434e-8df1-26055b29fbae');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'b4cc9b85-9f16-4024-8891-e02c8415e9ae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'a0bad4b5-28d8-434e-8df1-26055b29fbae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('a0bad4b5-28d8-434e-8df1-26055b29fbae');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});