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
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'rujk6zdd',
                customCode: 'a7u6ksrwqt',
                name: 'wpibi31oz5w16piee5u1isc3j09sn392mj32v7ok63kkhfl5fl30u7xf8bu8e4hgh38nflrr2gmxb5n1xvjp8msno4i60vee7v8bjovsrn0vj4yal5fgj4v7uyow2hlj6wvtrzlturc470qxr9xpgkv37peuqcib4ujwv5jat8w9ihha0zu3imp5v5t77zz22b4x1hq1vn7ieib5nqtyao6a2s5gfp9dtbjt76w4ngg9tb6n5xx1z0x1ngnjlhj',
                slug: 'uonhb2xnh5enl0r9g9levvcwss7em19kj2eg799560q9k582g6a05ysuwhl0fkfehk7w7h21yo3t3qcygq9hdbdl4i7ikytlyyta6imhvk9a9zz9kklhknp0bieah8tqbq3bol3uzf6r5enfs4q2w4koizp8x6ewe1j4ew2q4y0iyf9e8qjn2agv1tnz5qvvfa09y1e83p6xxsxjwgy36apt4wh3ah4vrn7zoabcfgjrv4qhbzxz63sboeuyjjq',
                latitude: 151.14,
                longitude: 716.91,
                zoom: 23,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: null,
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '17pr8m2i',
                customCode: '21kz5edyb4',
                name: 'my44va312z3a8nh6ujmqz6gz2hvdertohazh7n5pavgagn421s318odkc55jrlwfyuckjmzljwlt40plag4zx0iobjr77yjbl14smuc9mn8x6qipyeapypwz3e45a1ker50ha811zbj2w7gsa4xorachn3015je0eneu4sgyvflwzzy9ph6ytm6n7s281yelk8ushf02j7fi462z1za8ybj3jvqu41bgy70u40p8g116kj629zt03hba7f29v8t',
                slug: 'jvgt33p0p4dfb7x8xgwpmu912e91x3pcu58r1tmk0z4085x27a0dyhul981en1bhrj2a34wrr2w2e6xrycale1hezvrypdx3rsntnq1dycdh98ceegrpxkzwxxhu83adl48ih06l8tyobpak0nn9baz3mtcvys5j3bo1klqz8mbtyvq7pbs8gwqtonmk33y4igbuh0rsak8ow5rsy78kq6er3nj9hzrg6mxc6qocgnsfywiuvxfr6tq3ho0sv9g',
                latitude: 848.50,
                longitude: 330.27,
                zoom: 68,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '8rcz1m43',
                customCode: 'gvcc8zf307',
                name: 'usdy4war4n2hc7bzmm7enj6dlb0mooqgs08w6nnwhovutw2x5x1ts7rte58x2n1u3iogz9jwvn056glj3aahjyc231o09ewsko6o8x1ssxotxv193ijdqn8pnrnxu2ingrdizgyals48nosr000a82qps48i1tlmci3bwktw8n4vu5agyralgsje9bm9avy2eqwdwg60uoe69fs8x5ymgr38hkjkh6ke4aecsjewsxn2ty7sjao3tn2mywv6z5x',
                slug: '6zhdebbu9yx68297l046y46ffiq6gpaqx17qu6sm0so1z5c8hydptz1ht1x5c9i20vxt92mycjiwi86y6ieyudav7kkubided7mv8c431rok4a49o8tkvav1h97s8zvkoiytgomebeqcwc9jn7qrrf94qvieirw8m4te15kear07fomrnjvaybwia2zg7c2pfsvha7dxo40veekxzbywgwpe5y202m1tnjuheokalthg2i0w86pn235oute9tbz',
                latitude: 253.44,
                longitude: 976.03,
                zoom: 78,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: null,
                code: '1b9g3vr2',
                customCode: 'rhva12dbzc',
                name: 'mhyfocn5vy0fpj7iohhxb7ne036e6icwlcgmbiii3xw4rlj7kk0nvt9kzint3t4a5dving6odb7mal4alwhxpsurxkccrsmm2tl2gynll8yrpe7qyso9mpgcafi7opz547cw5js88fs7zxczz37gidb8uia2d2v1vpigtd6u31ztl8h892ia35cizxzjkzjcemxz2tpzec9h516solqorz3u35ral210jd9jjptdmusgrvrhflhu4jhi0cft5hu',
                slug: 'uzuo1oj86bs9ldg5w5yykj78wyo43m7p7p0vu5gc46riu0rrslkp2pf5n68vtfr4mztrz4he5qdqpiriey0a36aqz4mf5ck4fqtbhdqm4rgke7zlmtrgk0aly1ozczdin4spjl62ivg1y9huuivbgg0683qfm80dkpl6zcix4xzit27ull8cgctyf25f6vhqet2zszywdr7rufw9wcwql9ujiikf1cf2epycfgpb4c7rwupctz8xmi6v1ikikod',
                latitude: 49.27,
                longitude: 332.46,
                zoom: 11,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: null,
                customCode: 'yc58yl0cnx',
                name: '2cj8lndcg0vxr43vmlugpm94zivl60wlv60o41oeuhx0j26rswi0vfl18l04nkq9m8qp6ozeuoulimlcdqevneqo8vh6tjir13n718umhkk37pq9z2ychyibla7apr9ittr2q4a61bdv2xv7q7fuduhikp0kmwl36mxvvcljrxjrwrwab0yxndnlr346fvrjqqm98w66h687gpxr1mw2yc6vqb80cfx21wh164miz3ziqr56dxf0d8cdsck35pn',
                slug: '75vj36rm0yo8t0vxdca315umeqllofnvm8790n9ca92a0p9qx4d4xgunv3gxy9asghd7fj7kskfvfmip6e1c0fmf2gs14yfzjhtys5n0fun0edx8stay00lc52uz5fybt3rwavqug7tz9uxhykvly5kusvr9fstl60en9iobvyim2gmiy61mclxewajzf49eixcc7xxv3vv1kowy52klwbjkkmg8e6gp33ykyoybeaowz15j8f21wc58nf1urqt',
                latitude: 132.18,
                longitude: 695.88,
                zoom: 25,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'xpea8smz',
                customCode: 'q15pe0vzal',
                name: null,
                slug: '0czi3x9jtebyl5gzbhibbngy177yj9vimbhmpu055h7827g3agnc8lks2b8mw0r91v55o7oxy33mqx8pmk2igxc28i4e1rkyc2rzx8hnu0u45adkt1nx8m185vy9jlozguho2dxwwyh9099qetz86r63mkf5q7mfv6nq3a48pyrcnaweut8clgzbaxl4b4ca1x81b26405zyoocano63l5sc9ez6w54c3mg4r1k3wan3f3nne9lpgijpk79bzh6',
                latitude: 797.87,
                longitude: 112.30,
                zoom: 22,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '19yru0yf',
                customCode: 'r8nho92k2w',
                name: 'nauftidiln5s1uz7nzxqec9dzq6ftt2iedatuupadrlv7sjg68c5tyy8t6fejef5d6dfscw2j70sbqq156ks41b6gaqwf2cbs5bpf7xdv854rka1pmi2hxvq6ipi0n1mpxeh96foo458wz552lbhdyz1had69n2j9hlnfewrfwtqp9cqgoxh5vlqpsvoeumgq1pk8l6hnpnswuwl9elgbdmfo0idqptvq3ig4a0ied3fqkxlh2iveje647g6xc1',
                slug: null,
                latitude: 727.21,
                longitude: 6.85,
                zoom: 19,
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
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'g82pxguu',
                customCode: 'glr9dfnak8',
                name: 'vl8liebyst5l1s616bmjmwoehvrnonbrnutui8ygokpnjl0nsq78o8f7awo0i9etpu2edckl7kj30q33kchfcs87nanab30hvmut5yud6vfj0gbqbqhycqgubtjnk916rsvbrr7880a6gnj7nwjbjgc1ltfncrg9bdqzgp2bzl43hfwf795jf12fd1dfkaf1uux8xz13lrzd03vlosndqaqh0811l7p8gio2jmrkcu9weavban5fmb1tdx0xcvp',
                slug: 'n6skihtdkto38gynptf6pa8o0iv311v0t60qjbz09s497fph08i6368yoeidsptx264zqfajjndb5kghypc0jnx2bt2rxmvwtksnnbl9e08gjzy875jlhv4qw6pi1hp15upxv3p9ms71y1cfe8wuyjydbpp145r0myid8d69zvtx28ukz5jx0iph6zxwybtkjc9y03xq87yrcy3e7og1q83jhxx6a77gj3tgk0s9g4frjzgm8wcmfevti5li44b',
                latitude: 571.89,
                longitude: 958.62,
                zoom: 38,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'ditzzbz4',
                customCode: 'e2sidvmuom',
                name: 'xixfyvswx02qrac99c3yk9s9zuh76315vcivffl5d03f17gccju59bpqhnlebwveqoxvqs6tbiminzixu5bjn6cdxwiizxw7g799oppirzs19cbq89lk03x1y8u3gu8ewaobqr4my6n6t2bgiquhfsk0v34vm6dqfcj7zaxlajqv7acw58djhm5sbovlze1fzqwktyxjtx3w6ezpxd45etrz8zcvktm7rdcp16014o85c6clkztt2dl65msjhwf',
                slug: 'p0ix7rh7zzmd3bjayc0mjg36fkwhl81crn4kfdgzeva60d4t5qbn2kskhwtsgzdl993q9uv6h8umgw6llruwe2n7s3g8t6h7setjz9ls6uif1kkijmzc2zxitmzhuaiu6epiivni3cko3bbvbpi8taw1t86dpffyochou3xfimfyy50nskq2ja89fzgnvc96mslhp2n3i4m5a1f7s1iyxzt283jgzdfy6uwo5qw0fpm01bek1ss7uxfa8bo4xeh',
                latitude: 241.52,
                longitude: 964.43,
                zoom: 25,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'l6tz1epg',
                customCode: 'jx6kl03jxk',
                name: 'elzl1zy8a2obmk31sthv7o02az97gh9mljzrfw96dk7kznn0hywg1rolxqeb3felek41rj0yqeehtesad6uxxyti1ek59ch3xz6rbz2vpak22s2o66xw9v7c8was6fi1lm8mecktfnc5fvu1ny69ywdgdftygxsjmgf6irg2tu2tjr9yqe685qocv8oheeh8lcawqzs82i6s5sgirzdjocth72i06irq2k2d3i7yvepdggxhibtdhbjegqbviwc',
                slug: 'iaz9i5aq0hoynmx6sqt1m2b3hok16vrl2dxg25b2zvajidkh3neu6ley5ge7kuxnrq50ltw78g25zorisp8hssge1v8l2ztokuu14envb8z10ibsn0blx146sp0vlg1wx5yah1s1g7q8mccchwj73sw8s4872iyvr20bktyg0axglso4pk0v20pqozizjsxc8lcbupet2h8plp1g2hu7ipqksgf0ud1wygdorut6y85zsy20q2j5ma21zzzt2k6',
                latitude: 355.89,
                longitude: 839.04,
                zoom: 52,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                code: 'wvjga47h',
                customCode: '45p17zv92q',
                name: '1crizbpwpa4mmoyyw6slygfqo4g0bbjcq3mabyny6qlqg4ixdvqshlaryniigy1woon60log06juimig7phxyaf1hzzrz5a7iij3r5ccejnpb5k195gm81w8dvojxaypdlnwdy251162rm5blxcr78yg36z8uaznczath8sb335k98ck612inc3r0fusd5mi0ihtqzfsgsuk3rm0i21zw6ibz639n9vahkxis3pcpmjghf6orez2uagtkfkz8qa',
                slug: 'gffp54yfa9p52qctdyyvldw57k45zcoo7sipn85tv8z9cnsoumm0mcc6vv2ihei0dh2uj6wy2hipjj1k0z2vj6ivyyxhbaq0v4eoaqjxw3znbxu1k0c3nz0510sffyj5liacmc50v27woub6i81i8v35ojcufb4q2rteg8tjanpx7011aszanrwwoq40l3cae3ab9ta48sq5asp3pbket1aywoblzxcdp4c8owf7ug040v765zxlcbkwsbvt762',
                latitude: 628.18,
                longitude: 104.08,
                zoom: 20,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                customCode: 'wthpxeem1e',
                name: 'k27eex35msje6rjl86q5pfpi4t8lr4wazdbchxyystal36lu03koy3g0str9hyjydoxzdne0s13jqrtjmvzdnj3v2h8ktbkhnj0ezwjioebsvmahwxavoit61x4trc697oej1pbeetzu4jpumlnrz89zffyay1ktufn5ikfdzzi0pp1ox9hxcgozd5oiiuw0d1ugedpw8te75gc59anedyk6hihdijfhzuxgsyjxp7w6boq858ux6cubijg9hh9',
                slug: 'x8tomyjrg6he3lhw44kqckn91id1o49p9se1urg897hgysfficz5ctty1fof51850r2btl6cpq3mkxxdl1rylalfmga8sbr2zb7bygycxvm4v41ubpmjhahpc342m8rb5abnvmemvj0pj0ts8emnw442tc0ewdlkrwgf7ro408mk5ovnjizuwjqao37gwsqb7r2vu8v3p6roiatkwsgal8634ef50qhacdi2mtrqhbbmcdnkczminrofhds4e1y',
                latitude: 309.34,
                longitude: 806.48,
                zoom: 36,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '4t4xuwjf',
                customCode: 'jq4et3v3n0',
                slug: '6b7ma6mdgd03i10fp90c36bapi5fgbfnvrhcfq402jd9of5kbhlhacuid6nzcq3zk6y5y7q8rmgtxe3h9e1cx0tgmoo5pjhn87bjtkvds2pk24rm8vm14uwogtw86am0ztn1iscscgvtxtfu1jt6pyynhf03gkxr77yjqq0zbktby72kub3xkpzdxtqclrc2sys2uuukr5r7feloc72e4r0ncvdgxx136wkkm938gefaz622qiy4e8i8fn1r4pf',
                latitude: 878.49,
                longitude: 491.99,
                zoom: 43,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'ncvz9kwh',
                customCode: 'ff7qwgcu95',
                name: 'k85675l95o1i2lqmve3npsmsfnx80p6nyn3sjb9ev6k4ymi3yfqnlgfd2r2yywmpgd3nid8y8cdwad946qack4smzt03peda3e7uj0dod4x2pt55t3qgvuclqy1v6jo5usba1gtr1xfsj5uvlh1oasdnpl7zsi8kjm2xgx307088zm58ak4wxz3957ezm6qucotkodyxfltgsbimjw4xk21m4mf63f7aa2godaaqma32ceh38gt3dl3gln863mu',
                latitude: 202.47,
                longitude: 51.95,
                zoom: 49,
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
                id: 'prfm935pl9t2uf9a4w50j8lhhehkypmqewqql',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'unjhxujh',
                customCode: '9rqrbu0tod',
                name: 'x440x6aqga6pb1ijl81vf7l7670czb56z6bzq23vn2ga22gswy4rh7hyrcogzy6cq2l0mqqsp47p849t8jvzg3skx7125tjrwmova3wecwyzbf1vnotjg0m1ver4qvtw3aikyat6cgtu9la546bjv138jpb0x371n4s1beluqbgeghz5wfmavnl0xqvs738m78nqd6tcqkeu68vl1o297gy6nlspcdwqq031wmlj8o9f8scfc5jg0jxp2vy5jkw',
                slug: 'kryt4oyxger6c3u7deaqb72kw8fbt2web9vq6h1mp3i0cqk8wuq67ftw91zx8353rmlxr28mcgn6ptnpcxju07gorgfx39n9cyxg8616rjyzjrkr21mp26ib6i7atk69ea1qscnexzquyyqk0r48adnxzza5p5be7kfbfjtdcbhfvuxhmvpck7jiwx38m7vhlmlro7pzoz8gzksexv8j3bsh8yvyx42f9wav6ajxb50ickx93rliayt2v073gxy',
                latitude: 237.01,
                longitude: 675.47,
                zoom: 38,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: '58y0u5wacrdkl2egnlh420240ry6tfqb9i3ot',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'uvm5gqbn',
                customCode: '3bpd8m1qyv',
                name: '89hl5leblvl61jw04gie753ogcilbejtqbyrl3lu0avkfrpbtkqvfilipxft15jsvr3hya5gg6axuuj3c5drv2icwm9j6167x8gnlcmkz1llhcfdhsonu1mc2sbzt2pc2jwvuuyt6ho5o4n22n908gjz2mvown6qca7awro6z1t27t9dkkq9jz9ft9nv6iukfkrj4wjog7fch15kd6zpd7q8qtbsr7az7i814u9wsjp83lqirwuxb6yi8fuasvm',
                slug: 'qypt5zpsdrmb5whukb4znbgdjireabykoqt43lroozelbu36s6flf6uz9h77uq833pvgbs5mrpmib7q1fj7hldxk74x0d7e3hs8qlcipawz7aerd0skzj0f8p08uh9qk6t5z51pj55w252404ol4jtybdqx2spvf8om9m4nvgfdwmddqtodgg2y54uvwfaanihwtv6jjqq4lb6ha4g9w3vy7apg5cxdubvkftuuynv9vb0rernb9zcl74i0cpif',
                latitude: 654.95,
                longitude: 259.58,
                zoom: 76,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '1v917bd82e6eqan0rydklzdu8f97xcu11fm3l',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'w1v2g20g',
                customCode: 'r6jgzqsj7e',
                name: 'i2y2boqoypr9ogntoiwdb5tptxy5ut4uwfyciv2xz81oa3fdnea0xhjqmbysu12mupq031m9ncccobbes36n6lh4id704fw6gwd1mdmjl2hbusxk4daefgvp8s20luj06skhlf7jf2s4fuuov1sqxtrvd9gywlo98nwujtrrzlm33d5qz62svrp11agya6j02vxz61igb09mge7vxhj4eeig55yispe4pzbzy7v6f34zenec6a2g0lnk1zyrpph',
                slug: 'r1bowny1lvk6mtn197vxr5e5iv8fk4w9u6pvvr8i7f4ln1mtjpebtbynog21rj2rpyp5tnpvk1v7x2vh5159zutoz2f0rqft7iffpyn191r6vj8gncoqpj3o57quwg2tmgesu3jn5j3s1y83d2upvk87643lgoz75sf954xp1pyfdhdm4kol91vrwklhjgd1v6v2bud30yf11au0wv7dnost1wsxr0g0j2ie8dss33hiym70aveprxqojcr6pba',
                latitude: 339.73,
                longitude: 207.75,
                zoom: 57,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '3ost4it63puod23xq58rjrj14rgiht58ss6py',
                code: '1q330sje',
                customCode: 'tffrrewuxq',
                name: 'nsq5j07xjpw61oq6gl71ms0m8wme0hyaxurqxrx1glaequf85m7k4ni80ejcdsvy4bfppgsrw7bgakswqj6wkwnn8ufic8bonc3rntd1qdix5trx6aaoaxuzy6wkow94c5zrb0uvw9qwarf7syd83q5v2nsdfrv8atow25r7qw55fykk4cmpka2s11c04ha1ned51fs3pzwoiwy2s1b89g09f2ybazpulax67jb2m8tbzq9mx0c5zthkho4byox',
                slug: 'jk58fz3zl4u4v0cacc9fwulbmcfjxtwjzpsmak0u8y310owe0pqfkmwupxex8skrr5sxt1q95fxkl48k8m9txu3xjauvv2hwucxc0a234av4j8pikms3ua96ymlcetzw16qou78t29689f727qk7o0t6tjgucw0w6z23a1ts89paetaf1kl9dqjwxp80yyy3mr23ssanmf2ame4wvsdqryyfvheq97ssyk59fpwa2s5777n2gx7vqf7w5nuxaoh',
                latitude: 563.88,
                longitude: 635.79,
                zoom: 44,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'r77yvi2ki',
                customCode: '8fqnureq35',
                name: 'frfeyi1yzn1xl0s558ygoudl7drfe3ilcmrzbf6rdferbqkvhrlyx0clphomfg9vpffc34sz60oge6bsabieh7mh2pjtm5it7vgky3dcob1o1zilrwanqmdmsbgamiq0pi2puw61kybvs759gxnkyzc5x0i9v42o64ygjv1zqaqqk5ey7qxwxdi13pqyqeyfxwkwmij6vri9hczt0tsag37krb6qi2h3q4hlw619m7kb9v6yxpx8fj61bhenbo7',
                slug: 'hlcotwt368mwz42jzrrvvpn7sufbc9g96gq18k1rfcc70zxrcjr0gio17fl6ilot4jm3c5v5sdnjocmriyrsilbd12uzl1gm7wea4xgiqh4puoxplfl7jwu7orbrle8pnu1o4w3b4chav3gbchv1pjv2hw1ppc8a2by495bo1b3c06obaqx32exis7zvct97rm8nu7rpi406mzde8wuo4cjgdf9o08uzwqrqv2u203yef3s5rg2a7oybnaadexk',
                latitude: 426.54,
                longitude: 731.32,
                zoom: 60,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'g4jeczfp',
                customCode: '4igc0b15xfd',
                name: '1os7bwvz89bz4givwj4n80dhl2khtp0950i9ie0uh8migwo3sux69t6onqyr3wh9p9r5qoyzjkwstmi36ok8bf6c9v696gojayviswt5mze9u3vgxm3n1v98nqbf7jg2lb5qmm52egaij96vei9273j4ekna1vq28hr5lkf3qrs3skrlpo4r1lujefnpn6kxahm3t3dkrionyzl2mpgkiosruevzkjrh8khu1yd9bcx549uzbcoaxnzeh8oliyx',
                slug: 'f6pmvz9znx2zh1id7q56ndfzt2hvepejzfo7d3tt5jwdzvj264784ek2kk1juviyxhkvin05xaf7rb1746ahwwz6nf0oeuzv9stsy6cpvgss2xchuzn00z2xou202mli98qadskytled6873imu4q61z86ork1vhqhkhpk9vho9ksyc8p8e5f7esdabk4xunvk1kb5t85opc7jch46w5qlt5hx9eggcuu2hsnvhqhomy8gnjt55jgynjn7c0m0y',
                latitude: 526.66,
                longitude: 208.29,
                zoom: 24,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'm0t8ly08',
                customCode: 'hyv38gy5vi',
                name: 'jjlrqf65i0vb7hilt22odeugjjhu8pujwpelsovo0ntxr3kjqn3q2qknnwklv2jut2sfuvktd5gmggla53lyqsl8y814blxubei3objpkbdx9la5ygxpgaf0zezdazknmczx92hthci85vgecbliykop4l13c5sa4yqazxwt74xwusvlmfuqd2khnsxxk2psd8flxjt89zwxv774hr7i3fa196lsxkij6w7eznond13n6r4fwz3q3r3lc4hgg8ov',
                slug: '0980qs91xttix8jio89jtsmyaaufatofy4hcsgmkn5yh2w73omdkdt9ea2sqp44ok7hvofq7t092zcxz6ssobn0nbwqdmsppl08v1d4wyzoqwyu51h87d0sk9akfpd8f9j08ftb3pyjvjlmle8o7mno7b7mow3gkqzh5ver4s8bj69r7s7uvm6vb7p4fdwx5dvb73pacmpwmst6ak1pvkqfa5e7lcftftbr1jbs6glmcbwh8gxwwzh980zmwot0',
                latitude: 855.66,
                longitude: 961.46,
                zoom: 44,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '64p26kyr',
                customCode: 'l7s9xpd0w5',
                name: 'q0r36a2r5x2j5cpszho2uqkih6ubig31ipod6ulbp0gzerf0fpwabqst2k428pv81oezohxw4r12bya7zighr4xyfb5954n566ssfycydm8yha2ttbi98kpnmsizvidsm9b2xqgt5gks1hzfyux59v501h4mcsn0kjryzuh59ynedbtx6yrj81e9mt8yt206gu4mi1pzj5buikasrs47oliooscafaxn2na0n66mc6t8nxeyl03578mqvp361ao',
                slug: 'ugdrgarppps7jdztgzy2x905mgo89xfkelhpqoonbfx8bctxaqdyouxuoffqwkn3o9yaxhsx9w2ca5eqx0skb7mqmg8m0pxvi14lm9wafdoasvwqoe4x3x5lkpclz6lw6zgssgpyi5goblovg9tmbb5pbew5fl5a66xh5e04mk8zywhdb81bxpg5k52ypjsf3yuy08zp7w83xp3stukynlweyygcyxhy7wd1kkdytgao42xhngesq77sf63n15w9',
                latitude: 518.01,
                longitude: 683.71,
                zoom: 58,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'v3ffu605',
                customCode: 'aw3edeb7wn',
                name: 'wm2fb576pln81seiuijxu360bymzqrjcjiwc1xbn3fnwvrocjgvf9tlv5zgxa4yze9g99e97d6v8a9lzmz61kyqtghae9yz7ky6c975i019ga932ffv4q9pd4eed8x8vrx3le6f85p8q2gxt85zv99e2x350ga3ukhwwv2to85scvf06or52sf7thwvnymnv1ep6vjrcwie7vf4fv0o2mt8c17e44jctcnrtop18yehc2e2fs5a561fr4gyatnw',
                slug: 't2o6t3x0qmcmdi6m3rhg71e8rt67051v0wchmzjuxf5vir7mcovsgvxj2y8xzv4t5kg9bntub7bl4msuilsx34gtfjl7jl8jgoliavui4i65m79bzbkjfzax88tyyxj3ctc2a4h065i3v23zwu8tme1lie0jzetffylqt2wcnv99p8n59xeenqlcod0x4869c8hsfxizdlkro36va9uc855vwxus5zb0v8gl1cvpehdld1d5602wk1cpz3sbo3c',
                latitude: 105.21,
                longitude: 628.23,
                zoom: 89,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'lhpun5n2',
                customCode: 'usnppl615o',
                name: 'a4bu0em4nsw25jhambwww1cu6hfzygahxjxs67sssmj0cckgxs2ew6pe43a4svhmom882a21ko1fzvoi173e27ujtd16iwjueoyvqbm6sbgnf0awixi7974n1v9szbf75rs4mt69ytjq10igkvdd40axepzk85harckkkiq9kng88ck7gwro7k6rktgxe3k2ms64k39m01y163o4s4yvcwawy8dmb5tai82hzolhcxzkj08uwbp1mw7reokhp6v',
                slug: '3i5fr5bbjl3vf2745d7g4m9bq7ijt6d404ptmgjdk2nc1iesln3cgqugl4824zb35xbxfmrav0po7adur7f9gn4qj5knyr4wkwsv0bom28vn793dyjcwvpaeyc1sqp543anpntuop4vgkyhso8052umy48i0oktkpy3e8i0zthueuhkn6z0amnabhec3gmcbz35j6lz1lxgvq0h7kw9fq0tc8hs4zd0zdlftv9o5v5h3l5fhfkgzeyyglo6huju',
                latitude: 417.24,
                longitude: 298.10,
                zoom: 24,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: '1rj2omdt',
                customCode: '72x5m8726s',
                name: '0rcfjq9ug4vjlm3jyrtb7h6s0yud5tyn83xbandv0zz7ee5nnlyf0dv8vwmc0ugsf9m9osu9naut5oprutie1h6rm1hafd7rkqwzu2ctpvuzogel6xpxg48v5goq6xxxgmq283a0dxjit1fw37ogujky3njqroo06393w3cf6jj0flsnxadewcb5ei1sqs27yl5vuqypjispgkh7mtqn2un0v963bdr3jzudxmptkv7kro9q8r5o2vruaqdjtel',
                slug: 'n07hbo8xj50zfqq7xrw6dglugu82wd1d6q2jol8rofbnrrth5cdvybfuyy3ganotvg7b9y47i6w5v44o2o3n3ylsz1aeoaimcjhr2votuifqooy0qtkpour93iwj85624j3v0walsep6zv9d3cs3e8u3l2sgbe7lgobwxak2zacnwl4c8g3mz7k14ej66r0jre7q8c3lzh02wvhi5n22rdwk4xbtkj1axmmkacp6akr0esvfw3wsfmq8duvxyr8',
                latitude: 226.09,
                longitude: 968.59,
                zoom: 297,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'k8jkwlns',
                customCode: 'hc1luj9a56',
                name: 've8gd7pj7s7l4co1qhifolw3tgiurcj4zfe3osho6y6shg0vm2y8j8buyo8cj0vgnme5398sr5x08tj3vc1umwksa5ah6lsnvplouwmslxp8lyuqfjsmfr17ihvfjgoq6agg26lsbhctsnaomz7ov1l3zekx6t6wzkynwychihverne1qocqu3kosgg72k79ggyw978h3rlmxtk7jth7x6kp340vbtu5tkv3pqz5p3afg4zlwsf50tob0qzoqgq',
                slug: '7igt94xkum5klh0948j6n47fed8ysr7rapjev7hnjgqqbdju8lwswqlh3ucyxmd0at0x6cdeknxf8iweittxi99hxne50oh6e71e2ycnoeg2zjtdn1sibmmt1qphza2ey1ekn2j6lqbh80e21n3f4xt38gg42gmxz6rc8hchv73tinz4n3u8rimmcnfhrp2djn80lps7pb4n3g31dpqtgakmofwsmdlquoeljj56dm7cv0ucsrfpsmh5pyc0moi',
                latitude: 609.53,
                longitude: 608.17,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'g7gi1i7u',
                customCode: 'd2kdzoc0bc',
                name: 'pjtaqfsm8nxqalyaaxs3j2lwaxkxne0jo2f8bcgmj9hrmsi3l28x8pgflnkiazxypcwk3mixr4o2hd4m0raazywhbrsqpvdyrhuq97khl7dcdpk720na5synjxejj6m03rafn2v955gxfo78sp1qgfk3dhjekntk594by9sfjpcu5qdvb0e5v2ridgn40sqts09purbyowvz3ggwhplu67dipfrthzsehm0q46ex44ir24utat9kaxwbzn04bku',
                slug: 'fi5rp9rue653q6k3plon3zs4dq9geaxxen7n247axmcmzaorobzeftqyrbrk8i6562xqao75reiwk725df4wuzyf0ua2dl57kb1v6bcb15cf70klmjzohb8z9qrtleintjl4ev7ta13oitiw1xq9qae4cfnouq5ng46xnrh8d32e1lyy71cz7agrrcclq6wa48r1tw63tzpmbkw9pk14rxgxkptfv6cv61l9yw57ox6jkpxfg1401y78mmbx531',
                latitude: 326.39,
                longitude: 106.03,
                zoom: 79,
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
                        id: '6dcffd66-deee-4d0d-bc1e-440d98d9167b'
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
                        id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/875bb584-04a2-46a6-ad5b-bf8ada87e6ce')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/e1dcd18c-8517-4e2d-94d0-f5865320bf5d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'));
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
                id: 'c9156239-c24d-4ad1-91ad-82ab39a74a4b',
                countryCommonId: 'd0ae3a59-618d-4a8f-a9e5-49a93969c4b7',
                administrativeAreaLevel1Id: 'ce6f97e7-8738-44e5-acdd-61dd3447c9fd',
                administrativeAreaLevel2Id: 'e8bb35bf-4b88-40ab-9950-74cf21d1b6b9',
                code: 'fgonqa8y',
                customCode: '4g7uybnq89',
                name: 'wez00yhabgp6izrk8kb1iv5bhlk5u4sx9ao8io7x1tjnn8s8slf6gjphyod5uzwzdhqfigddy4di4o5n691ocjkfbem26gbatbpirf2nuosijgrnahaw64xwj931wgf92jfcmvnqez9c9qtolibmme3m8vuwntw9euj6wq559bqe09bnsu5np52aukm52dcnksu8r2ld9whinvyozhbgpmo4wx3n2rl21c4zymspc0vaqap69oejz8xhi4sb84s',
                slug: '7flkan648c4wkovby3vsampsfwmgjvvw4fa5xnu29cbvaa505soa20xspn0zcby2xuusjjs2zxc3876puxzpjqbh2wfsn75ya8wj1cg8z9e7ob52tcw8f23tt6sokvcpz70prc9cql2f1dadludblcp0kfxye3lgn6q90dt2mk5j079169d9xkyybs3h5ssz8xaxwzp19i5dknnuj91x3w9p4lfnnqb34elxbku8ml4u590d2n4vohiitriz0nu',
                latitude: 523.65,
                longitude: 625.97,
                zoom: 20,
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
                id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                code: 'la1hjt8k',
                customCode: '0cspy1i2f4',
                name: 'tforqbvj1mzavuzpdzbxdx65j25le6nsshi6qlrsnypqgl06r9jt8xku2u7ul12420xxjialdmpx8my1bdfdsnwxkjb0buepethry03ply5hrz9v86nfq70wylwgr3vtbgpuho7rkidzjvchkugalb2hh1yvgj748t43jzqin9xy5tslkhylfgymuejygj01ceopuhgj4th3378oqsuz6q6kpvegmn9u92vtb0fm4cd2w7belzpxj6g0484a48u',
                slug: 'zy6udp0nvzxo8groc4hlsxmcjweiuogz9kylq2vvte4pgvf89nd4gqmzvwj05rugxq99hnsm0kf5ht74innvrwi537jth8u2vbigl381p3wzo768kd3bz2fgu043njlh4v43qvv2zdbgymyzdsdt9fomcm1dy9likchw6k6ey3k2dbwh0g9kb1svbnsq4vhdo4iedryfiwyqmpzdi9qxr3gd075likc5ixumj0x3a5bu5nu1vwbndqk6ip3zpho',
                latitude: 108.71,
                longitude: 746.56,
                zoom: 16,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/847f68f3-ea87-48be-b7cb-2a01f44887df')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/e1dcd18c-8517-4e2d-94d0-f5865320bf5d')
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
                        id: '66c5a4ef-545f-4219-a94d-685dddddcb3f',
                        code: '2uewkb1h',
                        customCode: '7o8tax2rjm',
                        name: 'ftgduwzakosm4ijtjkg7wmqj594jps0menht8mfz0lviyvx5gqkimalwprei6xcski2yua2o1l9okh5kmf4ko3zzutkti4ec6nqgalqo7lnf2sf1v6258p56sawgtdhcfrxa3q4xgam82elru660dwy3zk589x2ik1uv3niuazswdrpd4nalxuox1r0dctvns3lrgcv6z8ckblzzgv09iwduhvsft95g49xuxop4b1rijt0dya1qqptfuyvznpm',
                        slug: 'f8bcze89dooubrr3rxooot9uwz4yf4qdzbbzxs48vzac4m9pofk6crg66w0inuk99tbe4irowdbrbbbr6fb6boyry8u67knb2gp7lo9lvm9zoz7n8jx4fpbogw8sv6aowdstvm1mfsdwxc2sc9y8opg4x478v9lknaufju7zh326okd0koxlothz3xbigqlf31u0rk0z3eex7zj5hp84bmxodlarbbklnggl3ilk6zdp36jk3qgotslstrlsptp',
                        latitude: 465.71,
                        longitude: 716.86,
                        zoom: 78,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '66c5a4ef-545f-4219-a94d-685dddddcb3f');
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
                            id: 'ff6c3165-a1b6-4209-bb4f-1faed4473e3e'
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
                            id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('e1dcd18c-8517-4e2d-94d0-f5865320bf5d');
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
                    id: '156d8eed-9c35-4dd7-b360-98683742ac83'
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
                    id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('e1dcd18c-8517-4e2d-94d0-f5865320bf5d');
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
                        id: '5f08f255-f02f-441c-9715-6a04d591b520',
                        countryCommonId: '39ae248e-d0d3-4031-aadf-e82a9f38c2af',
                        administrativeAreaLevel1Id: '5056a4ab-05b7-43be-b106-8950a64edf22',
                        administrativeAreaLevel2Id: '76ad60c1-1373-4253-9ea9-fd53155f69a9',
                        code: 'tjnccfc0',
                        customCode: 'aa4pk6f8t1',
                        name: 'oqs1dk6wvo7niyq3y9qeh3ksuew1ei730ddl5jgmgoh80b7g74uge7d29ru0hcijxrj69w0eofesn2nm3idzewvcbej5bnjyacxuwzryzkqoo0unpyglh1v9my4ji9nh123glhvgjgimrwuup9zi7hfkx44kp1mcugw6xn5tvamh7oas9pa8asfjsm4eb73ih8atfi8rhrm4eb5ekll09yave8xtiw4d0qzjug9xij3mmmop33htjbz1b46xxd6',
                        slug: 'y4na21ujp911hld040wt181ez24g7g6vzxseab5wmnr683y6s0fjuqq4tj0q2dcy6etwu8kpyw7f4mhzdp1xse8b1u6fsphu4yblhmuqknfia88am3x6tncx7js6dqru73wzt90y63gb2ocdlcb3inr7guj0q7udrrv592x7703npldx8xke25r707egn9sbhdz2r43gn23sbzca6ng57q1nidmqdb6qoko7ukott9jpdzt2bp177l2gilv264f',
                        latitude: 751.43,
                        longitude: 696.43,
                        zoom: 53,
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
                        id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d',
                        countryCommonId: 'b38d57da-f97a-4333-85fa-b783b5dc96da',
                        administrativeAreaLevel1Id: '4f27a645-1f25-43e1-a881-fde231f67d38',
                        administrativeAreaLevel2Id: '83fcf536-b5e2-4f3f-8f10-8893eb23fccd',
                        code: 'la5ofmdi',
                        customCode: 'ho263rfxc4',
                        name: 'hjel5h1cs3xk6uf4by5h5ym9t986g0zyt83sriniontt3rw3kqol2jh4bxc5ueg1axmyh8emngiv6xz9a6h8gjh9n57w83340yow2cp8m5tx5k69u3mvjzbehkkdl8qd36yajth2cwksxni5o3fmphe28q8fkmt7d0qv64vnlq8t8ww2qt5d67vfriy4kt0wk1gd6fg28cf8vlqt5h7sctpx46xea98xgd3k3dij1l62r6p2dfjti4azc1c0urh',
                        slug: '3bvylelsegqaqxuq7nw9p86gmsz1oesx9so0o0nig1gpulsa4okhyejma2nyk3jxvfp8awvfsolh66qcvw3a0pygujon5iwm41el1xmn75zlzw7zygw9l0l602697nysl1vjw3j02k3fd35c45hdaeliq9luddorbp8pexwokunik1qg6l6b2gzeg28jvm9ywoazy21gfmyrcgjynlphf7fp8ttat4clt6ooh5praafbegkb4ab5tflkevwm0b3',
                        latitude: 995.22,
                        longitude: 319.40,
                        zoom: 51,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('e1dcd18c-8517-4e2d-94d0-f5865320bf5d');
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
                    id: '7c4a653a-c1cc-4694-8593-e68a43120a03'
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
                    id: 'e1dcd18c-8517-4e2d-94d0-f5865320bf5d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('e1dcd18c-8517-4e2d-94d0-f5865320bf5d');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});