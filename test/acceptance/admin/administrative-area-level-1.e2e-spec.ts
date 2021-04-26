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
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'lv2idwb2',
                customCode: 'd2cio5fb95',
                name: '8afs952g60f5gi8sn5hnza77dxhwk1oc5kthviw86udb5ucmwby0tpzzj0s9fnbkgg7bix9axowfzpaexa80wnd75si0ihmunkd12ix435p75y4ufoxe6obch6cbksp3i44cp9l3sf3zhzpth5qqfomvu7egx6yqr1wubresdt0vdysxo3lyp64itf0plybo99l3lwytg2dw6e3ldsinhujyb36uakx3zys02e12w1u38l6peasihut563gzy8l',
                slug: 'b21f0y8wnl0hhbx01x1t54x7vavt0a5mguj0ce6wlf6smqgi68pcaai5fw4asqbq4vdqb8272b1ifry5wsyvm2zza2v46eab8rmhborhi3vov9l8fogm6m0xkh7h05vqqh9lywrehfq81yx4n2qfnrhpguv9zllb9p65g9rq47pesjhudrqs2dxb35i4188vo0ujmstkrrydec6s2bj14k3j7fwl0ezp8x7rm5ke2ti3w90vlua96wi6amseec8',
                latitude: 60.71,
                longitude: 994.23,
                zoom: 91,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: null,
                code: 'n6any8es',
                customCode: 'xh97h7nn1o',
                name: 'xl7i9mmt8ayqjzy93vy9oev8e50raedebjchlkik8avit68sn9jb158btbp33g68vodm3o22mhog3z23bmvcw0pvy78kv5smwaan661zdhf8w3mkmx245los5ijkwbxljdwr4xtjxh2cm1usxy32u5sftxy8nyzcon6e5340mbf7cd69wtwzj0a7msaceagns8kt3tp758seu3z2ajapyery97rrtyo9dqlv6wkrzqku2epvkpxu7owa2bk5tfz',
                slug: 'm5sw88ho1z3bu5zyplp54g6zm30emy97127m5b7j5bnp0uwp6lihfm5g2krk7qowxbr3qo6mcus4ef6z0hgkyhhn5rnoqnzd5hl20kby8172pcgrv455om0mh2qylpte1rcib60q7woqog2z598f8iuxujitn8tflnvmif2lizbp549svt190663dfuypsf5pssmnefciqh3jriakdzqeupa31y9vystiud9xhksb85hst6djsexuopnfrv2zr2',
                latitude: 395.35,
                longitude: 684.42,
                zoom: 44,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: null,
                customCode: 'd5mlk00cqj',
                name: 'vt5x0nwgk3ly8u67zkvu5l1ew5b0njt5ol9s6azmnxs62parw0t4gq3kwchamepeplejz9ltoigamyu4l7k274qo2flrnlgovm8auo177e36zxxq6nlmit5bc7ahzedu7mryweuypp7lduemd5r116sqrv9y6t88zv0crgfyvrk1y191uvkr6gtzofojxpi7a77zzepjj5si4je2d5ldw5dcqka8gsv9rsphhuu00adaso0x7ahtgdhlei0jfb3',
                slug: 'xg1i81ik8jb40o82x867oeaihrc8leabew21ghxro01vxztv4070xmqtqvw6ag2kpyiazguebdh5sba6z19qz6sojray3jo853qq3z2ame2ywzpvb9n2iabi985pisch718bvqu07txyfkn5rkdjuw0cvsk9w1pyrv1kmw91efgxg4nq848yprh8al9kkqdz6ivs14il01qfmxnc2kkgr0n9edx6d7dll57xt5lqzrobbijffcyxmpmj0zlrnxx',
                latitude: 444.73,
                longitude: 199.13,
                zoom: 83,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: '5qps6x67',
                customCode: '86zowe4mgs',
                name: null,
                slug: 'cug3sa4pk038cncshs0w5lov5debnldvqouf4csw78a094efc8x96f4h52eof613a47na800ez1w5ge2bcm54c9i8qd2ydzf8vktt47fa4pw2zsglzj2fzjpioiwqr0zxj5etu50fipyx6uvv6db7bxft4outw6ljtly3ycm3krx70e8k94yu0rvyarfcy9x3yx2k7wirr6d0alvbbrm1gs7prg97iiuhx1mllx2snjczqf166u2vxy1hh5ziw9',
                latitude: 520.82,
                longitude: 870.69,
                zoom: 96,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'uljogqlk',
                customCode: 'yppuym2o8s',
                name: 'b1sjm55vasuby2jrahhvgicbcfo72ct22a0pige26f3hvnzksu3wgc4isys55d71h7ovoc766s7i5tefuauezfu2hoqwz6hav656xxj0v9r7klqswx6tomdqrp6zeoa2t3itbwmo745gslgwmc9k7736bjtxp6juxzbek1rkn8wxyxgqzdeyq22uvr2z6m3ppbgc37mk6fh67xckz2f1j19mb8dgwm3jdrw0w6ns3gtuzgwdxuwu13tlp91liyb',
                slug: null,
                latitude: 258.78,
                longitude: 555.06,
                zoom: 78,
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
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: '0rlu4bq6',
                customCode: 'gswg8drice',
                name: 'yeo3y9i8k4kngsak2gnbzusa5y8t8ue6xcko6uef8m7t09dfzsq3stu7ngelep52ktfwi58fpb9710wom50dn220pduobl87ud48mv1uyylpkjbdfk5hkbbl4vybqwhnjwi199td3x1o4po62gjo3r9d6r4403sh7hhzsi93phnkc1h4taccbpeykuqsdwulaewl3yqbdelyn62l2apsf1oih086001gbducjwyvoqbmo2nhbkwh16flu0r80gq',
                slug: 'ejgu7aumdp35t8s482kdh86qe7ul0soenm29gfup7m5raxsmv7dpsvkeq42aofkdlvu3yhyjlojh7xkif0054bz67iutx28ctnfbpvb99506oz42kyvwnh7nj3xaoc0rc2ezg3yx3b3ybagj6mn77ja8aej3abf2tu1ov5ioh1tgo9dautnll3l7bzfrxnbfs41co22e0fygtyzm95aq3gheu1xrvscsesbmkslys5mhzv1b5umvnl5twkl3490',
                latitude: 368.60,
                longitude: 974.55,
                zoom: 11,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                code: 't0gq72z7',
                customCode: 'ovthq2beqz',
                name: '89q387gmbdihkqwrocrq2sym2qphahe92nisd2ke1qn3lr6lt8ymfwjwqc3mekwp2z58ozkbsg2ulpni8hm5cmx0335v5g1hpxeb5gc5u7fuburv6p22ut8ejsozqpzr2498hwi88z0fvne88oyq87mtuzxfque8o5ijbgprb5tkyxkjfugwe9lh4eyqokhizv9dq9q4ke7gxfyb01xkplj7rcx1q0kv200q6x5bz0ivatitthdtx0j6x72465p',
                slug: 'dnqcuf959jil3bxh6nzzcdxfgdeyyn5rx5qhmqc08yzo8kb3v1ypx32500szg74foj48arrpscjnkzsjxuy2q4k71qzls0gy9i6mscpm3979ub42jd72q8456jtake2ntsikgwfl5repxbhxm447woaswlleewnhdvilfx9vv1g48qq2h6k3wofugd8odq1494o6nx8j71akd8mba866dhfbfqtzk0db2dwznu7sl4zup3tvqsak2tzn7zuv715',
                latitude: 899.75,
                longitude: 758.57,
                zoom: 16,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                customCode: 'jzkovcyudm',
                name: 'y7cjcltb51xma4qga4efthji0raxgk92cv14ac0xbh6z9iix38gpqaz4aya0cmyn1e7kwfi1cw3ajqumow0ccx0ngul3alw09b3sntglduo59os6ozxlg77idxkt4ftar6mbgo212toyk9kj3hefvegn2i2est7qcpdv70pm0064vyd79yvw452aeomoj1wi8jujzej95hy1ypfx55xvx6nihjpx0u986yrg65flm4gyesgxy5r0dbpu5yz0xdg',
                slug: 'lbcirb67b9wkpfypg94j8mly5s6j0zb3cdu3bgdnkk2j1eir1mvqp79nk58blo0q7da44swtru2abm3z44p7rx25t37yyd0oftllrbw5q74x2zgg7nuc34m50z3wad5oenrzk34ffcv6unlb3urp4trfgj31cxkti0b9klgarh3ljdy5zqo9m5umjjg4gu4q3nyfh3hx1ga2se96hw9t7ys3l0dz50dnkint62x221c20pt6mboa3swj9iiy51v',
                latitude: 630.73,
                longitude: 80.89,
                zoom: 30,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'vmlhsy5u',
                customCode: 's7pojn92m4',
                slug: '5mnssx3wuqbw0tw6x61rx1dwe5lp0aj01e56xqhzwj2rvajxungl5agzt25zqokwfodhplipn3k7dllsgzuywinhngp39qjy6w9q6jak8472jfjnhrkc6h1mlimxvk7djwepvccfcpmp88tcopww45qfhjqyzkmvksrb4qwgwem1gyedqvset0shlu139rw5u3flzfx5qbz7fm2wmjsbzh0qoc3chb65ahf0u92smdim9imycs4hg5393otzmrk',
                latitude: 785.61,
                longitude: 974.61,
                zoom: 56,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'drgq6r3c',
                customCode: 'qgsv58z6tz',
                name: 'stwd3k7leeti0s9hwry00j7y9yglqj5cqcb0jcnurndfp5yvfvwnrmuht5r2eb8f5fvi8bzpla3jzdk6mn3kphp043dntjz6470yjfffgvytuy1igchuce42dspb18etzl53opy6sxo45e7yp0rs08kjrnmna10euk0sy8hz5h4gedw3eoghnffxjebeqpi13e9kbjx5q6vfip3ayolaif324i6m8tucbmzljxpzqq1nx56d9uwwi5qg3s8k98e',
                latitude: 882.36,
                longitude: 316.64,
                zoom: 42,
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
                id: 'hr5y6419s6jowdjsfdztb8x7cj9bn9dbnm4j4',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'zd4q4x40',
                customCode: 'bok05roekk',
                name: 'aoufa5hyuquvqfkwph57xj8lxnp2381ovoksiihqcsrrls21yz7r3t96p90wczfzreglh6opfbjbyqeg7anklhuo0txf9zxow4ecz8ixymonbql93io9pvc2rnxh1brkanczxu1jr5d0xk59cdr6ymxn8ddeis1ohjro1rqhx2pb54ro0w9404lmaombig5842ugq0w8oxunmvjpnsb212wcn6i4hzk56eegtsxmftbmczr4w34jykk63dk9gt4',
                slug: 'rh95ni0knkthvoibhmw07y6j6kl2pwzva0uy355zvv8sblc2z14x6tiyg1chd7ccguq2ued2t6l9h04b1t9g1gznpiqg0tj2n32ueqjyw84ce503g0cbxta970crlafpwu5ozo6bf1v8vqdae1naxo2g9rb4m6tql8ipkfzk6n3ka97w3aisbfb9opkj6nexb0m2u1bu62xv96waq9r08e2jyqkifykjchkvywd5ykt0b7r6gwg7miccwl1tmjn',
                latitude: 757.94,
                longitude: 153.92,
                zoom: 18,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: 'zr528anwsx4tsxi7uxodr9xk66vdt4og6oowq',
                code: 'qu0qbr7y',
                customCode: 'wnro2t0gz9',
                name: '50h70tp14bniajq9fj3sfbp59ygtkxdbbne5zmprpul7szo98zlk285utbmk732c6mj05rzjs35mx6zwzje2go7tknk3xtauf4jndoiafy321mr2y2v55ncrlclf12imuz9ssd8eqzh65h8fjruhwr0fxkp9i01836ejy1ydi3h377nky3fgq4hvmvd0ssc87z0qnvab2fmchrd5np50wsys00wxau9a27q59fkskvigpdubg9zj14a4ogap4x0',
                slug: 'jshjm8lwokr4nqnmv73v6um5a54kk1r5ijy4pl88g19oux8q1gmpsf47olztdfb9mzxe6ha3a1izji0b4gobxsdxrg1xk0gjxowbelmnpoyt2h7yqzmahmd3yfiu8gij6xaxf69pwsgp1757eq68pkjqkmrco21xu7f1zz51k19gird3am5k4g8qqtrmiuzqkgnodawoopqm5tlf4oq4u5xebwxw5w8d06ru1cheqk5ev4pjn35b3l90jddbu8b',
                latitude: 670.94,
                longitude: 685.55,
                zoom: 94,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: '1fmbw91rh',
                customCode: 'vlsyy9gv96',
                name: 'zw0d7lzxhodljxpxzixl58hi56kb9epyy940tikgbrusdt3t049nbr0subnvawe0m38ci8ayittxcp5lwc9p16jv7nujtenach0giln2t17vx2m7k9igkxd3cpe2p1zurns06ourfg3a52cd1ej7is4db8emiwjx7szqypyqv5w7a79wbm5fu18s4vmtr5svla9ywi050wg442wxltx7mph2i551ciazjy9knxhfnahx77df4ax9818k05vtcow',
                slug: 'kfpguacigr4jwyinzvbngh4u4qsdf9ht0wy33i0vefi0wannsoi80n3n6mvr4vjuxcxdu333zkwmb7ozxb2iibay72m25bmqr1qyojdxzxy614eplhi81x5xqohlq2ibsu32vvhlvp7p3bk0ovte9qi54gyzvhlh56eo827v4d48no5ua3nbmujohfj9m4lo86aa6d8v41g8adx654qlf3ghfr8m8yagpcwl6xkjzdqc7d60ye7orjgpkepyf8q',
                latitude: 320.02,
                longitude: 327.37,
                zoom: 25,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'hfgkkk6i',
                customCode: 'j9juie7g3j6',
                name: 'z107rn0cf1omliwzti141pyeal8q5sh40avrjsngkw4mmbwpf1b57j4x4otbz1w1qhy6p8djciigyezpjydqbyc2s2gthh6nkm4238voh5mctumcx1c34k7tlsjj0gsdopkxdebmqy9jkrwl9w4nt294rqhkjdh8l9xfrbbnlh6i799d7rnnub0tdh6iomdjv9vk8f3ln0bivqmc8wwn1963po51tfy56xeko3sqgbn8itt144znjy8osa2ty2k',
                slug: '75oekastrtf5owebuafpzt9rg5mkj9prxd2wn3rbcuckynti45yxptd5f6i35g51q8x5anqrfj6isx1guthq1bq1o31j830olcebmel3dz3qnx79ctzdc5x36rnh1lx6z0l5o7p8fj4ut9i7uhle0ss8d8dojjqghzz06ma5gvah6zg0mrdjnnj9yc4xycq5qoodxjoiwwx2qm8ig4timujlz4i0gy92ks9bw2wke3f1cbu0awaflu36itgjnqz',
                latitude: 294.82,
                longitude: 552.74,
                zoom: 10,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: '7x4hi9kz',
                customCode: '2tblrdztvy',
                name: 'aunfqrb6oqk6bv44tcvyvk38c612nhosez9xct19hdzgbyionjrjg128x91jezq8qgfev6dp1hjjut1x5994nraozlulb7xu3hq9rrognifj5l2gsrgkf54js3td658fhuu18x4l4jhzfo5o236d1nx9zphxykage4p01vrkfu9v026nn70yxc30ptfe9rzxreaps1u0f00wnlr60plbcagsecm7ux0notqodboll5zibjgkuryo1ayuq9n0gjcq',
                slug: '0orh3a8dhf4fizbarfgp9hw8wrhm36vxyf13mebz7dfr6zg0y3akack6mxv96w0vyad1jyifpv4go8098omy7nmi71ibahi0rxrms5x0ehs4swp3hwkdq6zw7z40f7h7ltadvo646d3tqrc14zxxrpp1kw39cvsbi5xmhp16zdumgysr8vuf81o91wxnuxliuo9rnomp634iqhuawishg3c5nn7fy5lwjhvbimv6v9l2o21u2dnaw9h03q0km1x',
                latitude: 251.43,
                longitude: 728.51,
                zoom: 54,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'atiihi21',
                customCode: 'jso42hoj0a',
                name: 'xjl7bd9cdnirpuivttpbvkvf0ulmlkvc2f0gtjp5tfzxylwuh64trkttwp96h2fo7y76806kwha2wdkz13lehoge0j59yqxgppqt652pka94mujqeuv7shsxt1z1mzpggxsrum2y1mg3gixoy53akwqxrewe135nr7jshfgu3strcygb3aboybvkmcmtjp81c2siiwmedrc6rk9pm3nab1hqar82za52t538hja23ynxy4v10nfaarip1dvz8bs',
                slug: 'kyj31hzrjby8ga3d59z5xq2cbuadnwt8px1i2fpm9p0u58tbtnc8uv029mes1dkxc0x0svd24tdcjb2t9rwfuqus2reospiq6ece1ufdyf53pou5l1hfzztqpc3zjwxxg07c3tim30yft22hyiv30auq1t2qlzqcxfdsyowzqoemy7xn6lgayov7rslygwye2oy7vqr2j5hwbabu53l412pzctit28m82vr8t3k0pd8i3fy21i1cp5qqm1ytslg4',
                latitude: 623.09,
                longitude: 508.23,
                zoom: 12,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: '6zjqiruu',
                customCode: 'f9eq9xxdkn',
                name: 'fmg8motnqpjeoysvqzmeubrzycwrodmme9zk09dxnu3pvbapgadtn5jwz0j755zuzvf81apmclo2dxgoq5smgfp3jfz567z8bgc7co60bwr6idg1b9v17ie9wl6wz0ffkugg03m1pg8g5em9zm4h8wi639f62ixwin4f8m7pbkv8hr6yuidqtf7cfgke4f9t7429ha896jact7zm4a6iss4jndclc0jy6xldh8h5ew4fz1jtvz8lyt4nmbnbve1',
                slug: 'ichzhn671jgk7wcux0x0yono5e1my29n49u57wrva17juefcwlzv9ugqrajm2ef2m8rvlzs8u416lxuty87rbu4a89m1jderer9nblc2qg7k9dmve7cm6h1ip4ivi9sag4x23mi0kiet77186ezy5jd22g7ul4xvowrle3wk03gv8zq4wvw9825e74cvwvqm2udh63cnqojabuwcnv1r6nocaexwgf5f87f6svia0yccnhh67mqpbsw79pub4y3',
                latitude: 413.46,
                longitude: 893.23,
                zoom: 64,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'r64j3mi2',
                customCode: 'q3viq3kifr',
                name: '9c6yxthcygs33vjj50eztn5399d7quvaj4axajrselp6dgeyydztbzu05dfp1cxqy3j3brlsrat5y2pl4wj524gm9cx4pr9198gb7tzb1rk5c31mlaj7bdm4hufxd7r9yq1loqkmsv8xaz48s29zwy1s9fgxy54p2lglgpktwqs90l6x3a139bo709xo013ejq08kn3b9oufv7ru3qqxjhmx9m5eugj751pqd2t8fed4u7x45fl98i45imb9ixu',
                slug: 'jh1vt541ceqang35eby1mfvf3kpci255npl2a5ufqpjoyjwpelt6430xmecdogfdlh1vf10kht9qlsr6j4zfh108vjzyytfb3qr1t0bg2wcp8davwu8uyfy4m7jxk8y5wjmg1nt3bwagtckra2ltcw2gmoko80ekb0xgeellhvlz93494dtzh3oc09egz4my5vvcq3vqq7esyt8wwbda3biqgseh1p3u02ibly3hl25vqio3v2nww3pswm282h3',
                latitude: 0.48,
                longitude: 995.24,
                zoom: 54,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'oef2t9q5',
                customCode: 'bb7cyzuseq',
                name: 'hhvf26lu8akyfrwxnqx6yi9w714boatxam6bxhh8apafo03qcxwjz5cjmpooydccrx3re6quz64smnqw9a0u54cwf7giuzuztq5lr474l0z8ft32spojpeyvjcti3ucw1ko6umwd3t2sx844pf2eumuyn9rs0t5d74xexuk9nkjshn2td6gjsn8s1aw46zsjy64lzloi4j8m7qx8yakw634vcth8ktd5rt92mecs18unlaurh0q7ght3chcnzhz',
                slug: 'gxkrgt9w61zzljmq1201siewmho8clrmmed7j2y6fbv6rp68nkz7ma2o5zuq5h2y2sym91zighs0db2tjvt8huapxwrpralnpsjlu9yrrr0m372pmrvim2u7wjenyrm6nh4xou6qil9tefabpiupchgc1bhreur9b3payr0o3gidxo8q518gaefv9xdyinbvub0ziurduip47y8yqv6hshjtc5ilemcltkmsu5dvq8llw58q9yhi855oxqgcb4n',
                latitude: 828.81,
                longitude: 100.15,
                zoom: 227,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'psojx88f',
                customCode: 'nj7fupwv9j',
                name: '5znjav2m372u6k8k6m993bs6h78u3kzm1evj4blvgb6gxwwsh218v2pz7sxsthplmiktip1cnnimem912hwa5w0v0w4spv4wbnmbkqd9e51kpircahxxz10u9uih6ldmxmqqndpd5cq14yzhrdqxsplcbzjpx91fojb8fteq20hfnaot6gnq7zslb607eawdsao6ktxvxf817a7qo43cqrynuqazc3t8sulqjo9qc64j7qaxp7ie0um7lsctag5',
                slug: 'ob0of9mn53d7n8ay4w53c9ei8klxi6j52j5ep8z5ggsdf5e32bza9wqjqw38b1qdsjxuwjj8fobewfp7ui1qir30cvkjggb6fm2r2e3zs0vb14kphdalqnkssivx1ba0ipgfi5llagwn91phquixn25q9qb4t0aogr3tawtqhgptwgdoju3jpwzf8d2yndxg4ahl9paktovlpcif9n6c6vh7rbsm5mnnh6lqbn3arlz5jvi50u4gb4gbenxnriy',
                latitude: 433.98,
                longitude: 972.64,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'an0rjbhj',
                customCode: 'up9x082weu',
                name: 'yvsz1uu3iermc3n4ev28q681v1xhz4797ojz5idzojjjm8evnx79m7q6m8hvdladshssqzoyc4q0kdan2zyk3c25d1vlyhlnhbdgldqbw53a61s0pcdopmmw9wj3dr16de3fvdq517s94v38hzjqjkkw2sm2wnby2ugo2j0rafd4g2f6e101c720mqapji032ksz2gfbhor84ziqz29hgk7t6g2fbfiifyaz8utree1sudgyexkwkahlcqglrqs',
                slug: 'jnjildjuh7a9k4wmcosjsk51x8ddmvo2eskhgpnim2ylob6j14c54e0n2gt9e4s1oufjfuz0n10isykt9jxt3reoz3ep0avlp26e08eahaztzrvb8h261ghwl173iiyjeyi322vfdewkms18j5xs9vuzzzx0yawt23m0gz81qw7bvtocbmonjit04wqhqpmnghysadir69vr7ipe0f3rks0q9hh9j5vwx2bqw943cxivciem0eqagugjaawd8hz',
                latitude: 129.18,
                longitude: 486.79,
                zoom: 46,
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
                        id: 'ce00eedd-6233-492d-80e1-359109e3e0aa'
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
                        id: '0c8837b3-080e-4e96-a2ba-098f64cf6077'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0c8837b3-080e-4e96-a2ba-098f64cf6077'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/8a6aec65-2f7e-4303-b507-954a415e9f32')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/0c8837b3-080e-4e96-a2ba-098f64cf6077')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0c8837b3-080e-4e96-a2ba-098f64cf6077'));
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
                id: 'ba1838ce-a315-470a-92c4-e46bf2c6862b',
                countryCommonId: '4cffdb6e-e25f-4dc6-bc62-45a7397b7a7b',
                code: 'zi817040',
                customCode: '0x7w13i6u7',
                name: 'xb3s9qibzblhgvrvdy3zc12s1245fc0bhkeayjliw50vph0uov693c1h2o0hfavmw0ybbg6o67g66b2bjrghmlgbx76p2mxraalmh1wkc66o098iqdxt000yjktma0w7moyeial18ey4uqsoqn5578d9sc0z5c831ng4hm9aoq3fr6us76j1e22s8gqcuuyecl5jimq36eb1pvpj8smojzev556ijqdcbyxilhyhc8qktjrobxrmfho587fgni4',
                slug: '7nto6b530xmtwio6zef8i0abgsq3t4vu29mna2wg5twgt0j7cp8sdvmq3o8onr3k42p5rt603wgyzqojls6v9claaj5gbqrsb2q0seyfqa686g9ai9eqoth6jjda4sjpeifc8nzysvhz9jv5a7vkbxfzeqq9t4xyamatfbrtgfjnklfxkn55zd2m4c16l4jkgj2rftn9o6ye5x2w8571klpqj7go9h37rumksuyubudjatdk737a2glnf97vvok',
                latitude: 105.25,
                longitude: 783.23,
                zoom: 67,
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
                id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                code: 'cc0s2zl8',
                customCode: '498ibzaq7f',
                name: '2s772d5xxa79wvdnv0c1gpkfyjmwcryqgreqo8wkb624b2sk3w9ck0zxt9vat875afms6x5ond9s05xx4aj85frn3oxsba9gkamfydkrpw8g28agb1nhhab6yhi2uzgsj9p17l69o0dqqkvetsc99slt17jeimxj1si0qfz93ha1rlz8qluqsvlmqj3dgnogt05hot1ymd2mf4o8huuiej94njmfcfmtl9l59pmxr0qi8o8xvtqc7t13o8fdp9y',
                slug: '5dibdiu0qsrqu2hiep49zy41267bzqbtisg30ro9fytg2m80oxrswwvcn4xwfs7wfxfjwgiihjzn3fsspq0qk9tm5uu8rlukcamfveg6oz1vmdiglinpnejrrdu386b4yq0hxyningf0wqkcfanss6c6hlvgffl8cnw2fwkvgq4myeh27b06lu4423b6ltuse0qqzgef0fmz2e2kqs78om2s5jlrsmltoha53pbs7h43eshuec5hp4xk29nrs2y',
                latitude: 368.44,
                longitude: 834.59,
                zoom: 72,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0c8837b3-080e-4e96-a2ba-098f64cf6077'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/802b95a0-c0d1-4c8e-8a74-b207b0289914')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/0c8837b3-080e-4e96-a2ba-098f64cf6077')
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
                        id: 'c4199cba-37be-42ff-a5d0-dfb8bb485784',
                        code: '45e91c30',
                        customCode: '7un73sarvv',
                        name: 'vgwpttqv6fcjf132xzuf757a2cd9qgy3p3khyzuwtjpvshic5k5lyp12shr6jtqezx11plec1b3rp8crvykzeltaaub1j4hhu7wh9kwurng3phbc3cld8xzhuvsazi67qosf0fw4ospf5shah51vl4e6yjy8swzgxcfyvpo6zwexgk7w9oy61xsd9ok7kecluhp3emipgc01xyq9rdoh3vtt91clwh434m195y9dg9dafvq61bxmiofny2zlve0',
                        slug: 'gjzjqq8tgy7q9tkxbuz9psxmd41flifnec8be2xw8gnbaz4jy9fb03wjcqqn519gp7d81crww7l8zhhx6xn5hdtkoe2mwuyrles498vbha07k9btrcn27f2pxgrzbkg0s8pk97cvcif093k7naauxgw07l875pd19yrl5vngvcqnbi38qg5b9sioqrqqws4z3r07n9xgd9n1w127hr3bci9a0mbx9tjao1m9rh4izfdq5lyo40pwmmqpx1v7fta',
                        latitude: 216.42,
                        longitude: 765.06,
                        zoom: 59,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'c4199cba-37be-42ff-a5d0-dfb8bb485784');
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
                            id: 'a396fe22-b42f-4bc3-9fe1-72a991d27132'
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
                            id: '0c8837b3-080e-4e96-a2ba-098f64cf6077'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('0c8837b3-080e-4e96-a2ba-098f64cf6077');
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
                    id: '69a5fd71-086f-4f8a-b078-d77fe078f5d4'
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
                    id: '0c8837b3-080e-4e96-a2ba-098f64cf6077'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('0c8837b3-080e-4e96-a2ba-098f64cf6077');
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
                        id: '27544302-cfeb-4c96-a314-a0572c8086fb',
                        countryCommonId: '46d10de3-5a29-4ebd-8973-d71e6153e9c5',
                        code: 'ep0i2a31',
                        customCode: 'akmt75l60b',
                        name: 'lnw53sddoeeos6hj8303yvxia3wgjj47rt09dmyiq7ij3dnrs8t5a6okhz38d0ay601fn6w7h9698wlkcxojqxhaafs7tsw3whrnywysiunl4r093sewgnod1i6fp7cnhrfuzipt55m9wzmjdkuzjem1gudhl7cqfc0y5f7v4tzu23tipno39y4azzv2jl7ajk1g32xkts2mjd55yrhrzipdi97jgalxhxkaqf736035ehnurqvj08ccmmvj8kv',
                        slug: '7ptkfvhyhvb1f99yoogt671kp1fu5ui2chjao13ne7t0pcr308fhz1t8eu9mvdkqw1ci4xo71jvelqkkkjtlqqi0c65v85in3zgmbtqvf6eqknajevvxml8zoavfthbzx7p9yduflvpdwp8yh1xyh42srmyikpwwz9zbp8a7eqf1yf3q6cgqmx3xfd6zxspg51772faub9z58886swdqeqlh1uuc65rnzm103cmz9vk5ugcx5hzc6yk796qelha',
                        latitude: 925.06,
                        longitude: 914.66,
                        zoom: 77,
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
                        id: '0c8837b3-080e-4e96-a2ba-098f64cf6077',
                        countryCommonId: '2c219573-b0db-4f3e-b33c-5197f71e4139',
                        code: 'gclgltvt',
                        customCode: 'rae6iq3m0f',
                        name: 'iyaj860xzzquwrwe4imrxmwgje4w8asgmfo9h1vj314470m86uee5l0e30b566q9ubwb2x6tsk3kqdausnbjs77rbob6rv76e58y4uxc1ohircvx9hvoxdbe47wzgrp5xsi0rxhi1dgexdtvv55ug409v1v9ftxjb5o28kpas157niv4ehwpd2ucs2yw6krxa6b7t64bntyw0shetni5kc5iryxx5p5vlvbjuklr33ovjww54m7a12l9qsgcq6f',
                        slug: 'bkqrlny5xl26n23t7mrmgys0w36abzup8ir6s2vrg2uxbncli98m90r4h1o78j7hkeurp6mvht8hy3ubiyqsllestjv8dc55vc2k0q1zxft9kbxdmazddze8247rhwf1avrvjxtj1krzp4vghl2t2hthth5mq0troc3zgaso37uaw254y5dggara840j9lqde6u6i9w83kknhba38sb4ed2fcls88z40xqrzef1a25jmbzquj3nv0vrt3dzon8s',
                        latitude: 324.64,
                        longitude: 207.14,
                        zoom: 79,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('0c8837b3-080e-4e96-a2ba-098f64cf6077');
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
                    id: '4cde9b42-80eb-4791-9577-36e3f0304a2c'
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
                    id: '0c8837b3-080e-4e96-a2ba-098f64cf6077'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('0c8837b3-080e-4e96-a2ba-098f64cf6077');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});