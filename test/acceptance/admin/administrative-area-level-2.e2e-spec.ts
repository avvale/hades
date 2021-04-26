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
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: '399zeoup',
                customCode: 'lkbcqeu9gl',
                name: 'xza3ivfskmmaalelvl98ymxhduox1661syzr614qohh3dydlly87ygqfqt3rl8fgnnb5ueh2o06lf6pi204kxjik8hmb8r7j3d4atgqt0sj5cayvmdy2qjl4tjecbtywjbhxz1uiyaeul9xlovxpoiexwaftbg9ifojg05axfa4vxok1nqxbxl4mhsv0lafl9g5dm9ornw2ob7y601soezhizf3ejf0tzj7nj5s2yndw73dp4woaaa0qzjh29yr',
                slug: 'hdu2mevmd71ufdzqggd58q3i3b0rc3sd0ucllhzy3x3q94bt7xt70tas69h0gwo3bhrq43c1r0y0frl1vsu4j37rdrtza46v8drcv03k1ysdg5furvr6gdx7o3m2xj7exnge1d4v4szojg5xsemlivafobuujrmrrzmmwr44xmoze4ufgn5hbnxnpynl0r9i1bao8nmh0t4gun0tmm09fx4ugv6bswpdh4g41xb5js81n6ps9yjyljfs9b33mji',
                latitude: 569.04,
                longitude: 699.19,
                zoom: 82,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'p9cle7lg',
                customCode: '3swwz6vwin',
                name: 'rzf0gkpa5243l0hstx23i40euhmwm3p65f2414y92k0sc6j9zh1b1b3hlkrlclgmpjf6ky1cxgdnrvkvbrrac04ie8s11qd7liv41kuddf307jyfy67dwbywaktexdu10a812ujq8ak9prgjk6514g6423n7r8r1naeztcywzggea4dcqjzlvepqtvb6astweab12lgi7z5awoerhbghfirrjyfp4b1nxdi6sf30sv35nonvz0r8qbxbfmswv7o',
                slug: 'j0ilp1u50ow23rqmuuv0gcnr4tngzdh74lwstgvcbyzslrgjnwgjqtudvrk7zv33zf7ze0vlknd0qkl92s5cmhz2chsxb35rqklag0lflu7bzj3ezves1dunl3sw2tv0bh2pergdbyrp0fw3dqfl8ir1moj0jxf93xeeb0a74ovra2d9h6na9wczbzamy9bwtp2mqawep3l77dknfs0z87b7n0mf47zr43i0xdnm5xn8zqv8own1yb40nxm3chy',
                latitude: 896.66,
                longitude: 779.52,
                zoom: 95,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: null,
                code: 'l4s7kykz',
                customCode: '7ijbb0n9bo',
                name: '37ob8bs0ru755h8w5vvtny0sve6j5noc2hz6724q71jdcmt8urf7kv0gh82bsnj59n2nsnfk4bcca3nh4d2t2ofl337r7vi9hasyuctc7j5hg44arfwp0oh5pz8x21hr5rudsr80rke2mb67468dyjoa7ekp9ofoxnqo3rh8y1cldd08zjhdzcgehazv2y0mtievlltciwz42t0mls7o42dz021c0b4ir5f1e2hbuewcfmykhzut9ulbf3w2t8b',
                slug: 'jdhterx5o8pzw3se6snolf1x3jix8yssxknx8e761plb5linq6zq1wtcpjzs8dfdykfvwgy8bareunltzxfai1o3rwpfzqd0a5zypnmw95hdzrxjz45vndgv5knu2l678i3d28fhrzoicgykf35p1lf5r9nbrty01pnazg23utl4u1m8d06d6u683vfi73lwj0vlmkatus9un4leeteacrkbpxgahopa7ov41kyye4j9l1ejxu0mhqtsa3mwvpl',
                latitude: 349.71,
                longitude: 893.88,
                zoom: 69,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: null,
                customCode: 'd57o8mi97d',
                name: 'k5vie4yoe9medqgnj6k0nr26jwzpc39wdeyayo6bs6qwuvszjvkidwlf6l6hmh4piwyaw2a8m4dcgr5b5r5tmuhiom7qni3z5aazxmu5lh3r5p5rg0usrlm6v5kngpmz94e81yn6qcljpq8j58t43lo6lmxagooviwfov1lo3gzhwfn67ry64u4vf83x9lrlx0kw9h9a26g7qz2a7wqfo26pjvhlg2ytx3dxavdyw14mhtvgzlgoiteuli20acf',
                slug: 'mer3wmq4t8h4alsvjyg4ewo51i5w65pesif6fobbjymlncuzcqjcg2da5fhv179hv9u181t71k4a2mfj3d408i9rb9q1609q1qvw5c2ecfrvtomtkcmfih5vfoqen4chk84h39h9g50w6h79jqjhergwn7tu8i33yajxvm6gn6oju2u413638vb7ufb3ubn3b6xbmhmgdyjm9hrjdjq15qhmhlmgjpkv6rzcz3lue4ha1q3a3og6ine6d2gl9wa',
                latitude: 870.01,
                longitude: 781.29,
                zoom: 34,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'i204xqi5',
                customCode: 'r5v1xig5w4',
                name: null,
                slug: 'zhgd1mjgnnwr0h66rq0lbyn1y52tqso1f7ovtmc7pd6njsu2n1qjk69b3u41syo689vpxplbl2ctdqp8ja2yiotthnh5rxt9prltbs6v5icgmi709slcuclzpw1hrrx96k35ctszkoman963ro05e5hia0z6ao7h7f5es4xqnfwjq3tp9vx2ob9pj5gr5091op1b2cx7m65vwlmp7kasx1ho54wy0gxmchsqhxsf6wsmbaanq3cmjofr153pwel',
                latitude: 80.00,
                longitude: 796.76,
                zoom: 42,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'dojrcws3',
                customCode: '276mtxwh9f',
                name: 'osh65n5pymhzytb2nqib4qhtxz2k6fjubzlt4fsv47umbwb0ne1bp9ji7ll0s961dvl7b7hog5d5kcnefpc0wv14iwzmq2vttf86rxsoxv40njc6lohl14ds7gbe3n32fui33wv0ya79d3sbt3l2d6lb1i7i98l172i2akfair0s8dhi6ojshlsfo50k5fjg73o4wmjen30h8vjgeqh640t7iwll3o2mqf2o8rm87t66o16i5iu6uthit5oy56j',
                slug: null,
                latitude: 442.15,
                longitude: 9.23,
                zoom: 45,
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
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'enl7g4ba',
                customCode: 'vo1k4aci9i',
                name: 'bdgyfn7myz5a0i8m8ntd3mez8w9gflwt9l1b9i3awk4umtsf31ppibn1pwxzf4jcb27auhlcl6ngtax49apfo4jmgwnwetw9o89as2qwgt07f5kipmlugi6q975kbvxhhv0tkydfrq8o7z0s3cb5v84jd8ssr3cbg9m271g9v6gk16w3vcdtfdwnnazi7p0el1ec54yemz2qmwnbi8xatnvvni7wchzzqzsmujnkm3enckumxtloyzpfu1jhbre',
                slug: 'yafsifzuleb7axlwneweob2x7f15mlk2q8dl3q6zx4dfyzig25uimp0rtynqn8xc4jvt7r89yc5klir74b8qwkyxyoli8hue49a00gjcjgqqahwybro9sqducyc4bahka53092jh03rto4pw7viu7yxg8dsmrk4srs8a0mabwz4ippj1f45x1h18ltpw5k330239x2eoild4w85z5fyn25ne7x7l2usjysvwpc18akf8fw00v40u7nwjx294knl',
                latitude: 141.64,
                longitude: 978.45,
                zoom: 16,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'd71i9kut',
                customCode: 'p4kiyer14n',
                name: 'lbwjr8sg2bh1se2xs5aalcxr8mqsxnsew921z47t3n3erj7z9lo4e96fhexevb4gkkk946p5vvutqj5rlgkmjmz4vmec5sb93a1ikgyshfnz07cx0yx84fzds98zn62fqltbaqlji7zo1q533dyc0j9sxc2fwpeswuj9twcdqx3mux3hettds4a5skvhvvg07uglb8im15o2q3z0fyx41krsumbhovskddoka3xr94vyuh10myc3btd7v8l913y',
                slug: '8a8j54ze8jbykjgb7xtejti78hyene5i9s1z12n2ytian4f5smk4sy3ems86ba8olwbajqcn5my457zm5oovl7iwzw414o4sjzosmcwltt05xpaa3jzafarzyd2ykcbou9ib1u96vd3lp7c028fzsxiip8vobunox21vz8rwoxzgj64x3rp6v7oi6qacirm5xdwsllewkuvbl0c16tiexkoomu969vn89244f53ha7jxa2xumndy4lm20xwydqt',
                latitude: 847.12,
                longitude: 545.49,
                zoom: 88,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                code: 'sezmwbbk',
                customCode: 'k3veg2zfls',
                name: 'v88xfi9r2l9loahaxk9ywcd8cfkl48x2myt348sbahyhkfxb49wlqtbltbmukc3qchyt1t5um5ya0i4w8f5ojxhrarwe1tut03wk7oa815fvq1bfjukmsumwhn03001730y2o1x4zdq7leh4w2gl5w3ij3d3okle3lml33a2hdqmqu1r16x0fvt77f1f8e63wvdlf0yy091qrgk91ce6o0xucz13nb2nj89q314s5nwpr24br6yx0pzol75df3e',
                slug: 'brdgifdmydjw1cjwhml9b8xxyohv7ft0rosiwrancugmcpt40u8sshws8c0cz4ro4cnxqvznzgn2tde2195nkffa4bcw3x6gyh4xicfhacwe77dfttq2qc14k7vo80ub4f6tobv19wb9zh152w71zkw40dodfb5sjj1ubfg4dscf9qnvqg7if06iyacydi0uzhgo7s8zmfmlyia2k7678d5xna5qdoz403h22fluy2ew1vrzalxl4oru08w3s38',
                latitude: 82.70,
                longitude: 938.03,
                zoom: 46,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                customCode: 't55owcslog',
                name: '7a2db7x1ez9vsadq86q1bd986g3avnbapxevww954yy0xxi89zsevc17xjcykuuwlf3i7gf9yx4hwk4dorwurmjs3kcnve9t1kjpl5kfeb8v4e0nue06f83nmhhauk1w37kzjy2tso2oieucs10ewps2s8nh8xquwqcf8g9ncey10ze0rbx71b5scbejaooowh7x31jacr9r7hkvut5tvywlc0cj8rnigwag337rodj2gqpwcna0s616d9hazpj',
                slug: 'ivye5r9wyjbrpch1sts34h3rdo6uhzlq5yi21u47d1m5hzh3hdnkfmdolgarx1l31wva7bd1u9e54zwavk4lsrkpozl2isp8n4mko465gltxkvrzddqasp9k5474p3ocqeasodnwltp2h73y711cn4vrzbf2oq3w1hmwb5yelw4jd4445nboz5k3mz9aifb6z0ay2iskjw12tcop4ekp5umsxprrdcz46qnr2cpbjr3oj9aizhv8z33lnduh5pl',
                latitude: 353.50,
                longitude: 399.28,
                zoom: 33,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'bhbxyszs',
                customCode: 'hevonrdogd',
                slug: 'q585sf4e2pzl1k4kpzwzb9be3vlre65gyp5qesmohc62f1tr73iy5u56vnc91i80uwdwp6k2dlbgdbi9vple1mvyblp82ko26v7hdmn8r91v4txie0ram1q3sd4usw7kpvjdd4b4kzo15fivukhed8mrc9cybtx3teixqwbjjk4ryfwxiow23k3vr6plsflgpbkx4vxqcy94qigttgc4mfahxyvih1kgi8xznz64z9soid2d8qiudk1rkcku2om',
                latitude: 148.88,
                longitude: 572.48,
                zoom: 12,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'e9car6q0',
                customCode: 'snvwji8jk2',
                name: 'ls2szn33ujpaa7o9nad2vu7uyzr2ouklzizhv43odtli4iqxh4b7clgi2fnlxxzvzjeqsaokedhtpf0qdi6cgx6onh88g2is9g38eu1348vafebvcuaj7mms655cnvifjrrhvv5zxn0ink0a5q6lntxsfa508i46et2nli1mcrs8dp8rzw3t0b3x1jm54529hard3q553kvlbgc09ot5wmjpwsz1c8abe5y8xys8tz6w7973n8bv50kx8d0t1c4',
                latitude: 978.80,
                longitude: 595.66,
                zoom: 84,
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
                id: '1qv1g6fqj64cvtm6vkfk8fk2uwivnk89zk55y',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'fkga6z9r',
                customCode: '78si02c00u',
                name: 'd6vcv921molw2bxc5a4ndga39albdx6ki8m872y2ad2iclgx3w2yvf1gsw5dh7q2txqfnt9xqgn5tr93nh8gxq5mq65fq7f4i3q31is2x2jh6xzir7p598mz7kkneq6e2kfrmme54kdcwljgdhb6yw1t5374h3m6zhvatwk5sqv6bcb4ke15lkyucc6o7gew7viaay1nk9cihsvgzcbda0t0j5w3tr7i2ojk3xfwqsv003e6xdpj47iwynickew',
                slug: 'iz44xvgb8ecqf7q9dwtjkzmhuvitch4tablimnqsx0qpvdacf1lb0jitwujcwmzfqz7k5rrhtdapto499th3ctlsuakij4ioxa23cccytj8ph2ax5gqf9xotc7ijnjfonqvy7ylowlx0o23tixok659oic6dobqijikz115der7nck667ymwexo99vs3fiwlb80u5fqhzu7ok0icrv88r70ke0pntryyjs6ivmcd55lpf5a944q0x4ca6annsqz',
                latitude: 933.60,
                longitude: 719.54,
                zoom: 14,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'ugrzeqshhrxq118ztqqu5cno72lqgnde8w7if',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'cug9ga3j',
                customCode: '2idez0itj6',
                name: 'ldubewbzqey7wndf7aenrgsi6qu599w5cfwsektlhjl5tj9pup6dj51gf3nnf0gfmi38x3cff41vrz8awikwy1kls7vaabscgbajudenid4w6j5it8ix0nq5v3gce8whb4nmxg7tdnahzeso6ih0mb0jz0ukd71jpiwldf9jqteehy04m5qv4z7obsqlsk6yn2zm6eyuf4jvwjm0o3h44b1qu0cpfyn1zfefki6mno5h47itelqgknxq7h62n1g',
                slug: '8nefz9aoeafdqzwz0gaka153q42y4fr14scb8pg1n9bgh5uur24nrzz9rev7zyljb14021kk8e1issdf9j0lgqjzocucqf7c9225q62naorzl9d6jmmd7v559mfofqjm8fl6omemjvjnm7eegpxsiz07fgptuf8lxexnvcmy2h4csg25ne9dendxr3c7483rdt4jvrjjwmdpb4frukaxbyqpfx4mcw5wd4sv7s9dnm5mq8evx0kebfrb42ycvb0',
                latitude: 21.19,
                longitude: 273.79,
                zoom: 84,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: '2vpup20imgcdoptdu3xk532v85gc7x0yx3hyw',
                code: '4fiszcwu',
                customCode: 'rju660tmmf',
                name: 'xy562rk5n47h07wwre6y463jsa7suv8eq1zaxm2dvrk4c6g7aji7oqne10foh2slc03pc2u669ymn8vcgmg137gtjy9gmjaexn1op66xpna6lfna294sjjnntxu7u3m5fsn9oqaduw4zbsutw2o7xb770wtwoxci6ivss8ht6xx4n7jp240r4zt6keu5gdzsn6u99te3rqa77k2vri9wgm0s371sf93dar6bds6djace074a3pkk50cwepbz1ju',
                slug: 'gtx2aadop09qcem6xh1v9p2c0v7m94a4tc5ks7c4ft3yy3hgk0hagf5sl5to1ny646291yyrq76cqt64q3ffmzpikljpsi6bf21bikoivppta9nauiis70mi7or1qogft8sbh5t0bx4v7kl0n7vitf0tmqtsjqhd1s3xem7ed4updcu7p4vz0udqiu24yvxiazaoxlcm71pbva4tp4mt4umqwgu7zi1ug53msddbyqt1pdf003xzxn8bicf0dx6',
                latitude: 110.06,
                longitude: 935.84,
                zoom: 62,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: '3c8tl9p62',
                customCode: '8j3605gnq3',
                name: 'iyof1w50fhlzvilu52lcgap8urblijfu3ptfg7cg38gdb4dmvno32k7sfdva6xfydd47qbk0jad3673g9q9uds7udl8bxmqwr342i6a5vnscmooms41y4i1x9bjwq2yemyyh0yff9jhcdbjjk1uojmuvrqfuir0hm705ncf3xqt319oorarr0cfl6keuakt1zfd6hc2doji8hvlseejnxjiva3tuhdfjzx0kn83i8rpsage4isn49tjj7mmzpti',
                slug: 'psbtcj84cjqc0z9wvelrtjm3771b8e3np1nlemwu99xpayrm4oft10f7jvcs3860vlp94uzogypvu325op9cf3zfc6l6l357i231xh5seah3yn4fzov3smu0tz0sdhmho55anxh7itoz6974zu2dqysauovn5fhwc4r4v8okqgyxxneoc1f7wuurfn57faq6ly98l37y82rprakvsmkd6le5lc7hgl3q8uou1wgt7t3on979ldmils0vdx84jj9',
                latitude: 181.57,
                longitude: 612.03,
                zoom: 68,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: '1mo22p0x',
                customCode: 'b3qsmphfqsv',
                name: 'sjwa5w11n7qnyje901sttvtfyocq9k3kd91sf2zvkttlxfnv6vpvc6tdpne35dzxu1voqv7byknbqqzqicytkme050ogjsbm9bk4j3m33q5t0uiwz4jwa7migf32zbb6zsbeh05i17mqojd9jgcmnqtz6ofdxl0dq8h15nlha5nr6pwob2pcdk4h181djrvvb8dk6wh6vtyz8353cipmsb25jvh6n8x17pd2r1vx1odnb0jcafral66sovujw7o',
                slug: 'v46hjr92baue3q7exzdzubov64tmm3van1czvi4my1qf9a7oepglse70xi74eqwx1zvb72yw3m1ga38djbocolxcj8kqht48ie597zc0evbx6poloze8kxnvmlzllghfwj0728o3arou8xgl85kgoso7pkgmh2380mxgodfs5m031e7q0bbbhgw2ve47dzig5he5j0o84o6d4me23xd9m0vqv0cryw40deharpuqzgai8c33vzjv4cctre9jli1',
                latitude: 393.30,
                longitude: 811.17,
                zoom: 28,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 't6s98fnu',
                customCode: 'r3hs5ewz1p',
                name: 'vu5e1gmonah7dlafppqzxzzl4tfav5x3ev76wfhmd7459xda356w7loha8p29zhmcyno3p5q8bsfmp25032r3um28htbta16uxca6i4aqrp2w6paed7wm6cinhcg71atvq654a4nzxiuhae928ex964zar4gmhhg1oo3o6deum484o3kmwaequ03m3iedhax5qa7smstk2glzcuclkmsm5s7aj34nje8mirgu6nwl4s67j8972ula4ppdc9jvc9v',
                slug: 'ns6qce29s31m1f0jcvh6pngcxsvdklvfyceg4ahjq2tb19ykedy487wzyeua89yv85l3duv19ltay58481cjwhdoaz1vv33a854qe6hzjl0btx0rpdlxkplge1w50fr47icoqt97xa1xxegnmogmco88ok3hkwshot3b7o71znulbt3zhmivvsttnd7hmqztsr5ek1di2s1axhflsxh2l0vvpwwwfxd2xw7ru5o0ybyhuefxzsgo117vgdx69y9',
                latitude: 76.00,
                longitude: 666.38,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'poj6zks7',
                customCode: 'cu12qg0tnh',
                name: 'q05icu3mgeq4hvl6gokubydq8dbeq8459qizuveuf1iyfr8bhjelo56lrc3yqsom2hgxr2n96iz104s3gjjm33eu4ftbimzvsas5372o2973wfoes6q6tc17mdn0rxeww4ju38188aasflvqnmrcy4yx7437fexdat0yd391n1rni5cjugp0o0mkkc7m9zs3rgahq5lvap2vjyq98wjv504ndbh4lh6luyiipu7etmf83q7vzlddcg7a8stploc',
                slug: 'ftd9d5iz1ympfax9gt6q5mwc2qnjc4ypnze3l2oygy207fx78ajrqynftdexu04rkqslj1bza85o9fhxi08n6lny6bwow25s2cs3nsmuadugktqblfrghyzycsdcba36q9yb2ztf6vlm6w769hs25j2c6bwo3smxyzky68p29qnq8vinb24qbqiae9e9ifmkh24d1yar4imymrxymaky7um4wo6w1mxjt5ckczir6nb6a6qbhnlf9iwaaxvyaazw',
                latitude: 788.36,
                longitude: 254.49,
                zoom: 39,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'j2kyu319',
                customCode: 'ob20245zbr',
                name: 'z7wzdv61uwtilzcvonk3hkh3hjlm47dcyrk08er8zuhhcr55sg9iarvut8aptwbuwrvhjfpn1a2kiup4ixie7vwtnppyxfljek5w5t2v9ub7hzf4wx5udtkok4bchn65tcxpwn1tv4y07sbkraxy793y8m04t8tq3jwvrwj5jd13rgomrbyam4e88acu98v9zd6mf8h9230w7gkrjg64a5qxakhmfmm38gt76tf2vm848vhun7l9tcwff4f9cwz',
                slug: 'upwi4pedfh1kh1ouq8nzjwaspr2gqveuunb5jscrzakn9aoa1f5yod7p5im4yuxmb5zxbd82kc9zwhq2d8etqfdrsqddr26jsm7g0bcifzzy14bv1i4e59pwhufj3nom2c8a2zzwk1xdt0ndt8u0e0u5ar47hil2pcer5hythjtqaqw7fu3r0ntjmj6rhiq3ootm5fmjpm19nc166wha9tf70q99o2bjpbyu5iw3kcbg7edeactfcd2tmx6geyy',
                latitude: 425.74,
                longitude: 856.53,
                zoom: 98,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: '74fyd0ji',
                customCode: 'lzgt82hvfb',
                name: 'qe7sp7ljz18ll70pna2bj32o4co78jtejhld69bs2umwbh6to8tidnic4rjdickvcnfzfypwykd6m1a1jcqdyqah0kdbrn3n2m0vbd8ld1drp75r5j3knel60ewqdv11cp4mtjubnc2dw7ibgzvhng2hm32phq5be2hsz17w55z5yzyiyjmzdy3e2mmhntcih2z59k410eqeex56himqnbqyjhhf7rs4b1qzd8bct8nfpm3w7q4i14oy88nzi3u',
                slug: 'j5qbrrkhhcw0hot3xxby9b7odtb985i1jm5na7rrkyid2ictu81yp1dhs1vdl9u9u7bxms6dho9vsaj34uwa832ww0jrs2u4zpa94pr187osirw1oa5ixnefvft3qbn1eoyh9p28lm874xbgoo7mge43wmpl41iq7iiu2pkh2s4pg0z5bbtg79c7w9f2l8m45k1npgp9fwb6on7bob2dqeu75ubdviij2d35phyfr03h9jiy7b8n4xxu19vy9ox',
                latitude: 587.56,
                longitude: 40.95,
                zoom: 35,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'kfqmdcbi',
                customCode: 'pqg80a8275',
                name: '9iqehyn09klk8sk7r1wwopgfr6r1w3zuf20zyy0ryvc7a2j2ib2rtci5t4mxkcw6olt4r4y1zyiiro75xaq86a9e9y8i9or74u2onban5wguo66us8mhcownvwhh3m7vjn4vn7h7trz0ia6mxvlxdi8t6ra5zsr7gx0fvcknqpc44rhuxwbjw6eu17m6hynb1hsxf34raz73c5im1l9tug2ghinj9nbnwc5v0vy8zmrq4ctd8drbln5g8ghvtaa',
                slug: 'zbtibeegaotoevrddjcrmns27d9ivd4o23dwt6ru1b7a77g7q5xnhh7086m3g3hjkv581vhupv2nflyo96nopbilfkxevr6sz2ryody8smgoxyhmkscp3t4lxkwon1wlm60mdgtnt5tfmumu4jxry4t8oeoegroftf3fsix8xs6taau751knzfepay1dnmh76txxijxwsi41wxyo31y1aixocf3h7ib0cllofet93esuzkn53fqgafpicgu2uxq',
                latitude: 730.17,
                longitude: 372.71,
                zoom: 612,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: '5l1aqajw',
                customCode: 'ilg3blb58a',
                name: 'aercdcsvme80khervzhb7egzn7lv1zw0k8u7dd85mct2m74klehsdze3isdpa4lrv75fzll2m2eftf414zkvcfuemrwfj9zpcu8w3vsoabtudvr8kw9ty27ogpep6rwjs19em2j3zomn6kqgqmtir471v5ic4uiva1vnmrvekzfdgx8gjj6mvgrwhge8bsq5ca3livdx7h6ixwzmngz87bdnini4r2qtxw71r8etd7z3fasjv0njkv0an1oxnyy',
                slug: 'wvdj1bdaw1e3eht1shs3t46icr87fuixwqp1mhsj6l9s08pzo7tnebc9143o1weiso6k64a2q4jihqsl7k6mdtdufkcuk3p9hpw52sdezn8dugbohs80w01ib02ayaxh4vt2rcm99l2r7sjta7xhyi5tsx7dncqzq89v2ytsbliicibuc0m7c3afuxsfuidjij8sjjipkwgp6b2i8w72h0lycji4me4gox1oiyih028tu0vp2q6rm01hp7cbcqv',
                latitude: 69.75,
                longitude: 944.95,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'r6geu5pv',
                customCode: '0w2wire5z0',
                name: 'x9eisw1mtche3d9g570c3yo96n1a8skrtf6sob1of86scoealtp5zpzx38mfupm05c6boeuc0m0cyp9yfa06pl34n65ygbvdz5fy5v3gbg47i2vs9znnepyukz24juu99mb3pdvqpmb8g42yhoqxaxi12xek4y3k9c2f8uhntscxa2lwvvipj23wnz3uvdku3dhdjnrvekt6xb0lnah3uumf4ta172ptg4ayt5iz8gtq6bnmejyg4kvbt25ke90',
                slug: '8e5sb6lapogy09g0ree6pd9jgodqk1om9kzfkqokmlh98bhcqqofbbop4rrchypbjmzthz0s7gg2iygyq2lifmz4138zfh2ci4evy0ggyeys1i3b3u8wte3xflwi1nvx3a2zu5qu3l9yrym0tlcdofu01zifm1es63kb880ebawhvceop9lmpr8p17kxh737gsb8av115x32fz64crecr3lt7jw41j1r9fy86mmnin10qifpj78b9phsndtifdm',
                latitude: 302.55,
                longitude: 730.80,
                zoom: 24,
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
                        id: '28ff1b52-8714-4bea-9c48-d9180a43a99a'
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
                        id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/60545e6e-f58b-438c-acd2-0b32528b34bd')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/fe8b1dd3-c8c1-40bb-a675-e734e088943f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'));
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
                id: 'cff11cb4-5b10-42ff-8e17-bed398fd5d4e',
                countryCommonId: '8b9c40c9-3405-49b0-a317-7583fcdb0e73',
                administrativeAreaLevel1Id: '8f7d5e85-9d20-4e21-864b-41397572f6ae',
                code: '2ro44t7a',
                customCode: 'amumuwmmh3',
                name: 'otxqo7kflwemfjwb27z867hpubkg8op8msrt6cu3v7hpbxom1h0ffr9kab6ee6b64skrm6ywic39m30blakhcbyrgjtqvxgdiobnimympjxzv15lsjqn8o18g9flmhe0bkiv4mk53mmy7islx0werw9uhfmeop1spkmjyxk0hbiei69xktnvn42hoexff2t39il8vkpxou8np7jrmvjc3bgpa6o797xeqo0yuarlppy5i14mmla83p24oe7gdxz',
                slug: 'akxzo6rw9p9qy8d2mn1wljmr3w1orbaxb3bfuxvy3z71dk3ayd7d3znx233h3okm68qct913p0fl9ab0wtnamg5cih05tomfutjlcvgtbkkw5eaueledy9vx5d31erbuo5nkp6azn03c7lsjnp19k0m57lv0ofybkcngfpzqyibwqsfxptg13sfgupqw7v0vpjt2h5zjcq1gizjxbg1r5wq6hfo0og75cp01xrmfmtp3hro05f8bk95qfzzffv5',
                latitude: 207.55,
                longitude: 520.45,
                zoom: 77,
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
                id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                code: 'lqugwf5f',
                customCode: 'ufrtgk7kx8',
                name: '72ig91qaoft3i2t6gc71nlwc5c9kmauv56wwxpnw7ziuixd47df18hscfou1mxrnruevpj25l6cl0am89fez9gby9uc9kdz2qe4ztv0u62lkfl10cjzb7i8902ye5dywruw6purr5tcmb5k9ggttkjcgojnh5gyvh3a69vetd1ltor15ivikmhzbnrusl8f6qqrebzk61x3rqn7z9ox529fy0v07h87mqnxv5s3jqlfdfksw5ogj0a0qgx7ki79',
                slug: '668q5f556d9uugqn4c70tc77w5skloy9s8ygpwdvlml19f9jwn0cvzfcytqr9jtguzm140skb5xke4s3upe1w9u1j6kvufade25c9fgj3ziha1tt3qmqs9tnozso0o6oj09hzbl5o9kpxq6uye4i2asosrtk1k9anbm53sezn5mzc4gxx0lw78gwk6ctc1cebwkbg58jujn42vz20wp89zlv8f9jof0phybeoqirkzi9jscu439f99tehhkw17j',
                latitude: 999.18,
                longitude: 384.88,
                zoom: 97,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/be537ff2-85a2-4830-82f1-d870c7d9966b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/fe8b1dd3-c8c1-40bb-a675-e734e088943f')
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
                        id: 'ba2a7109-a5b2-49ce-9fd0-5b5983a39438',
                        code: '7gy7cu74',
                        customCode: 'udbwh4z71n',
                        name: 'u5h3gw2cf0usupmsu1ejiztab7qgri7nhc3ltlci3n49azskvpewzi92pfgk1y7rxcxt6lgb8t0vxim5v3vbq8p32yg2u5pks4sqzl8ayzwedeqksq8pt5s7qhnt7dtmuoimgo99fscfapq525jmdltavggaampjg8erwzbi1n30uysj9pbie0u086qwi8td2triz9v5u46ink1c8zzztm33de9tt7rgn7yb60bpic14tmns72pgubnud1v1itq',
                        slug: '973ldj3sqk13ff22g1edvbo7lox6i97880bijvo4hm95gjpxup45qq59i2wehly6sietfmlc93regj4243iwsoq275ot0s7184p9dvl2aekt9o8owkva7uikb71qdlawsck759ymjue70ktu1gdcyd16k5z9d0l1cj7vofhs72v7ysre0ujch0bnqfwabkn5lxyx829jva9qgwhfiqjaua80p1jyeh2vuamtus2g03z1ux4yqdh9rw6ec6p6gph',
                        latitude: 205.61,
                        longitude: 896.20,
                        zoom: 48,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', 'ba2a7109-a5b2-49ce-9fd0-5b5983a39438');
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
                            id: '85c398a7-8fdf-46c7-aa49-03434e6354e0'
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
                            id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('fe8b1dd3-c8c1-40bb-a675-e734e088943f');
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
                    id: '57ecc889-7b45-4f1e-8f41-0a823760eba5'
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
                    id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('fe8b1dd3-c8c1-40bb-a675-e734e088943f');
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
                        id: '94ad378d-37d6-43f9-850d-52cba452fb35',
                        countryCommonId: 'c02613f8-6890-4903-9c17-6a73cdc4d3d8',
                        administrativeAreaLevel1Id: '034d4894-22d1-4cc3-aebd-8de3fc947e3c',
                        code: 'f3v2vkly',
                        customCode: '7qyx8shbew',
                        name: 'w1zfnppwyoo1u6fbifvm983h8bt66dgemuzti6sosoqvwy0e91t1clszf2vmgt1317sjxiwh9l9po8v722fwt13vo9f52n11mjny107k2physoe5z4n082ryw0m0kzwxok9cwzwddjgshruntfsscy1rvocq7m61ojwmpnqc90d3apy40inxv93kszmk7sukns313s0gqiux9hvysb3xonksccmyqjizaqc3tkhj356kbm41efx63ntp7ufdx4x',
                        slug: '1xx59iyvvkqrtrm8rls9bbgog1jn72ke75j7h572u69zlynxj9jkhrbqn41hd1ydl9h8lb1473zuy8cg2pdpt2k5wvxix4usarif29xyipq3xifmqfday54sbttq3y95mjf2im6tm17i3rbn6gm62q5x1x6bo0jqc3wrcgz7425e8qcpoqhra8jlf82gg3a29k1crbw9k65jan5qjo1t892cwqpe5dqmos8f8ubasc2akbh5pnuiyxwm33o0j2f',
                        latitude: 453.35,
                        longitude: 532.16,
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
                        id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f',
                        countryCommonId: 'e844330f-2a82-4f93-99cc-27dab0ac7778',
                        administrativeAreaLevel1Id: 'ef62b3d0-4b08-469c-80c1-eff9247955d3',
                        code: 'czo5xisy',
                        customCode: 'cdgui2qp1c',
                        name: '8hil8h4oqhw2s6khlunp0o56a6wyygaa3gf33j1bdexq6rs6a8cc80kpuhy8pcxo1068c2mqg5gdhbd8hhtweyp687zmoz8opw0yhymon9bw76mv6clrujzpq331nmd30lyzyoymu2ff63ymqpss5j44dlwhenvwqsv4gtyiakdk15g4sk89xrpdb0r98rwunk4hfpkphd3f5e2el4rxvbnercuxaffl4jmefc0ci9bfedwrsh98k8za41d1bge',
                        slug: 'mtrxey8maugovtoxiu9vtk516166akoan9shohljbes7flvaknsenwywoue174ldbn7ub0q2voejop88j2kwaw0qr0smnqxs6ljwtcs9yrasvlmc4gyf3rrs30t5hud4vr530iue9p49ylkbqbpbk9p0nsqjtk42y2hhhy9u9y3vj1ddde3ufexxns4bs667fdx9znkgs3wch2qga2702q36cl3i30ki0viqq63psmvy32dvthonwm3wux0fxsc',
                        latitude: 697.16,
                        longitude: 655.53,
                        zoom: 21,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('fe8b1dd3-c8c1-40bb-a675-e734e088943f');
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
                    id: '27bcb75c-4dfb-4a03-acbd-fda0514f7f34'
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
                    id: 'fe8b1dd3-c8c1-40bb-a675-e734e088943f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('fe8b1dd3-c8c1-40bb-a675-e734e088943f');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});