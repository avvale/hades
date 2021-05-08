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
                countryId: 'ced69942-25fc-4587-887b-16bfbb34b73c',
                code: 'fvnpjdd5',
                customCode: 'q4hznzrk01',
                name: 'x0lnqx56t4pyqvsg95jgsz21oon0c2lxclvg4ay33r4frmdt960crjb65ve9c1x4mzf7rb96f2oksnnj9rc22nkmdwscoizpsy6exvouyqyaj9y7ju4f8wl2x9ujujj9r1zu2jvrauiykcghr1xqzyxs2k7sx8tlvthtbr5qtx0870gpy0olanom0ynma2hi81run7se95oohdg0te9ot3qcg5vny20yddab4p9nfz05nza5k4eoiv9f9eci8h0',
                slug: 'xuw1sazvjdm1mnbyby69hox9hoqmaf8pbvt5lgti7l20wpytzfbu7zrb5rb3so4dlqqnvfpv689ggzerr6afpww930svwi23ojvkxnp02q3mcmef1bwgwesdznkfjsj4usu38em2n6q7tjpa6rxkikrb45v4jvlfz2bwwxxeoq78meanefgphvid4uvnl5805a1gd0scjj01dffo0cl80kw4yykhkutemcyyjdx4r1u5g5l09tui8zyc6eqvyam',
                latitude: 40942382877359630,
                longitude: 64318470941463600,
                zoom: 91,
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
                id: 'a344281a-79e1-4a97-90de-594dd22bf38d',
                countryId: null,
                code: 'lxhrjff9',
                customCode: '0kwk2wbgge',
                name: '34ci9vwt32obmq35jhjubh4s52rw2zev70k93r51gpojcrx1w6c618h36gplvb2ikzyhjx16qukhenykfu0jwz65vtni7dh4pqug21duobp3umh6no1m40m0jg53qjp2ll4jkpo111h0rat1jsjxdcft70z82vzvjzd0m1z23pcr7whoz6ph21sj1c6vjhvchgafvol1deu6u9yq7fn7q990ozgf7vcm40q6mzz23qg7oew96aqp4dj4ergc4el',
                slug: '34uj6s1vvu1ym568vuj83v0ufqrelh9w9250806k8yy8e7hf334ux632xhkapwnu5k03w6z5kh378x1lh4b0a4gndqttq6hie8onrmjpr18ntlq2jryywtge10fjxr3rgtvidlhby6mxp99hj5wi4iovorfamwhi3nfk6ftp50ar8zzx39rkkbkqtqflqp2hqwabuwqxzay8wavrrf3jphyzfsjk024s42erzb8eabthecq0swpm3e7orts2i30',
                latitude: 83539601668140770,
                longitude: 75243495701487800,
                zoom: 24,
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
                id: 'e1142b15-9805-45f0-a934-48b1d5049c89',
                countryId: '781acdff-3f4d-42a4-9464-529e14d8afce',
                code: null,
                customCode: 'kqdk2cb2a0',
                name: 'tlyyi9vtchujxaqrp4y6j9ma6a5qkztxch557p9bar7dts3dtuitcurx3cygmwgxilh74yhlfr1woq2550j2ytq659fx7fhq5htk5p21ylrah6k5fxtsxgr0winrheeln2zkr1rrm37v4kl33p3jjy01a3q4ym8tonww03zzix097uoa0whacbdxzb4v95nj6i55r7tbc3k52ivrfv9mibnj9u1th3dgz4lagtbnl5prdfry2epsw55656pf6wh',
                slug: 'hvn7fl0ujvjxdelqzbdmfkwnaa5y6znmx30i1fnqud4ohse2fzciu8sq968kfrvumwchedcgd2ydmebo1wdss2dlouuocg0vnl3t2v0uanwtvi7fenhcvnr4et9qftoundah36i9m6o21qmr7ggfzcww21v45vd3v4dre0ru267advnsnux60ozenmmeler2wltc5nna5iah43mgih3kq2b83zzq9oer4esqtux4larnc7cfu0ic8xis730dqqc',
                latitude: 30141991285831372,
                longitude: 74402752954931620,
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
                id: 'd942096c-7722-4d01-80cc-00e210fff283',
                countryId: '1a9efbe2-aee6-4b2e-a42c-b1ffc2e65959',
                code: '53a3n9pb',
                customCode: 'dmajrs1jdq',
                name: null,
                slug: '9h8ytxltyduk6cojrw9cg603rgz6nfuesmfdv7vtzy7ez32tk7ssfglh4vz5ulm38oszg28soirfsf3znlswfxtwoe9w4ob2wk9r7ft8cidzai0da9ykqg2nme5bfd3pzo9bpgribt6xrtuy30hbxhksouxst8rkqlsx92xqufecegno1g0m13r7whnahx57898bl5yo6nx1nxs9izcj1nlig4b6w50mq6d888awn5mrmuf79ziv27qlzk3eglc',
                latitude: 96926623694530220,
                longitude: 83507772297271760,
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
                id: 'cc07da29-1de2-43ca-a191-64f427c6179c',
                countryId: '91068235-0548-4b4f-9a74-da7730436957',
                code: 'j3q2zxfc',
                customCode: 'p632xyd74a',
                name: 'jppicmvheui3eladej1jdiu08b2otaufuzr9d0npp2ngkb1nrd6db1bprz3oo8qc28s63hcqjuukk09zkvwws3vys181kat4nc0pb1xn3zehwq9v6pw15by4q2q7ivbuzeqbijwnf67wxq5uo0a0ek3r0hdp98wishizaaed1mzm8gajnw7fl6knym1bhucbtwyxnqy6olcrlrxit2axidvdy1s7phfpfkzv2upovco3pxgx7tv2te2wl8f17xc',
                slug: null,
                latitude: 21489442280263440,
                longitude: 79847594927769820,
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
                countryId: '3299aa2e-389d-4356-844b-3f23bfca743f',
                code: '3zy7jwiz',
                customCode: 'z38vv9m0df',
                name: '4jwxuas7de6tt4hqjd40mno6yvf1p062fqsv9cgkjvd7nju1ryqao1490a3d6nhlkiyshe3u0bxsm1i4km8wb1npsnan3ia1crzqpyy12hwcpe0v59zjmlpf3pdu46vktejllzrercgwm5ovybqfurrzang3dfwreva91rzrapouo35kfes1ymko9n6ryv6h5pkwnju1smnsbyvx9wfe22knfwr914smpofxqjeevl4j4rb7epv8uzaymga2nnm',
                slug: 'j9upnladlyscduxkk1lf2zmrhjnaosc2m0gqtt7hrc4tbav4xvquznkpyp9ipxa6pto807uidb4ngciwcvek4nqijki51fwi1ixy5cahvux7vchjigx6bwcw6li50u4bkwlj10r0qowch1roos6q7lk7jp5gw7o7k5ciuv43vzfv7wdeqctr9mpytg179ui591o41kpaid2bxa08ii05fgqh0dlvf6hm4o0mbhqrp6yy2w3pwl0ysuvcd314x7p',
                latitude: 15259501884304896,
                longitude: 39290393612458780,
                zoom: 99,
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
                id: 'f23c59b9-8df0-45c8-a238-14d8a96026d9',
                code: 'qynxed1v',
                customCode: 'nleicgj8b5',
                name: 'p65snu93uqam0aa71vcx86kbuq9vtf55c6oebl17bxmrya37xpvalp8fyw30eibbtuyefnhkkk0nnv9zqy5bgrgbwvmyaodsg4ll1movh2n04vc4xe3due0jxnqno5tcdc8maghhycgqehiqkr7n97y5cozhe47f3sp294sm34pcr093glmi5eb8viwwrf9x70ua6ql9tu1ud71db6a0mi9nbgcnhe54l6l449ea2mvmfhm40oagw71g4variab',
                slug: 'ay60hvaeww13dmgrqyvuxshpqro51dz9e41888kfk2eok0tjxljj1p4nmxwc1gl1s451zhpxf0tacy1izzgqtnpnqiml5rwu1ji5zn7q3egyx9cwi7nx9egtw7a5doc0a9lw5p8kh53mqi9ailn6bb1pabf1vjtfxku9zjzvx42kuk5m2dvwgi6zme66rp2bvnyyfykq2xvt1ektke9vhio9l7q5b3lxkv650zazvaoylby1lvfujlun0ffn1tx',
                latitude: 52890773497180890,
                longitude: 30252370433521600,
                zoom: 32,
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
                id: 'c264cfd9-5c62-4e62-8abc-21bffe695295',
                countryId: 'ae7644a6-88c4-4e94-aa9a-ba628fc9d799',
                customCode: '8quggci3i4',
                name: '5y7rj627o21mpwr9s6dp99ene5ilhqhk0xqp3aaypradj5f9fb8x5qy9bg2mqqt52xh98va1havsw9ioha9ob46wt054jag32khfzifi88wyx14xxgliyez5jvcsakvuksf4bggv0zdj9ue3g9qhbcyysqt82vqze5nny3iqxciv4ihfap89711ctujn63buo6gk56tn9y7puh5r8cwo0x5gnl6efwqn169dgva3gc3g4mgvq3irrehltx8qohc',
                slug: 'ddteemjftjxozp8dp6n5r2gx01xtb6mc4u2bc645w30f1thq8zea6skw1yx50kw92fh1wgby1w3ofbwb10o5yyt22rct16w53ye09tdmtkkncgu0l9itvy0t094sg71mx2tpd6hlmbl8k56mweafa824r4v452jbfli59ew25ozboc0fjd7nkke7tz3yqteajjq2kh4zn500hjc19tuffdw3dchtmbjpbynscxrvrvcjvs2wgsgkydvsch06b1o',
                latitude: 23239237352216784,
                longitude: 44666865168014900,
                zoom: 78,
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
                id: 'eeea9d63-f195-4c4e-8483-a2b871624dd3',
                countryId: '489b9898-4db8-42cf-8e34-209a7148f7e3',
                code: 'lxk5uvar',
                customCode: 's3cebmkb67',
                slug: 'g4c1nq1pnee8wozikxlsap1d0jhuw66rzloorsd56cs3zojge0c2n2k2pem2cmbrie62ti7gmv9f7vz8m67b1666o8d00asr2ek2v8ahnv1ekcn8qmlyp4s9gzuw9n8qgfnmxut3oc8gp8lq675qttrgf1m797nm084kndfargdj13x6jhzzsneyq2gxmis08dtfgk43k5wwhdq6o0bxo2qo6libvqh7fnq7f410zcyc94z20apwxjwnfdzw5fh',
                latitude: 75153465147878130,
                longitude: 26847913249655990,
                zoom: 44,
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
                id: 'b43858fa-453d-4649-81bb-114af5fd066a',
                countryId: 'c3bc092e-d7c8-4394-91f8-22a724a588c9',
                code: 'j2n59ybv',
                customCode: 'eh6p2fewql',
                name: 'kyb3843kezpchgwhyls36oba9io54v7aee6otau6oxt1lb5xqjlpix5zosincu3fg3llp40huanjo3l79r26u9tuqspy8n8ty6409kc5lrsje53ej7xmhi5xq7nrq4u9l5wyykmitykkq1dzon9hq1v6f8jmvlv3qie55b1w2zn8lmcvp25jgxiavr14cbfewi05xyyglqq5c2y6ic8inrrtgza5gze34jn0qd65xu4f8k77azc2rbx158dm5ml',
                latitude: 14019647272951948,
                longitude: 35074708062936180,
                zoom: 30,
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
                id: 'j7zchye4ucbavl1tjzmtuno4fulx0jb4a8m20',
                countryId: '08d949ad-370c-46f4-86ed-6943954ab147',
                code: 'vwy97n26',
                customCode: '9iszlzxufw',
                name: 'uct6j0ps4fawwxu8060qh6eyr56hoipxb7c7chctn4sy6lyp6f28qnurvukpxixv246wyg3sar2rs94s4yv3h5taim66gbonozxd1y449sfqezdy7aic1fswbcvp61r84xtmj4oxa3xrz1jtwh2zlu56svg2jy71s3z8nk475obiyfu2605p3qc2mf4e4ugq1623tuwa9budaq3vx0xsiyr61bgqbp1fmm9n71eux8kwalj5s32fzmwr066wd2l',
                slug: 'fo66ynzo175zs0ajfm0co3omxnkrcu944gwbqu1mgk5m5emrlxdw2ds2fz3z006lrdc6rarrpyrrciyz6ytba2uwrqva3ktx5pevpla2z40oi15pn3v30f0a7ry2r2gye432xjgwdunw91ej9r3b0rxy4d6b8nqs8mntfs4iw0wm644ppi87y70ru8h2lvpxf5573rta8u27840yc8be2u3yhk8xt4s918hg7ju93f25q0dywlpqug4dof5y5tu',
                latitude: 49641537041383820,
                longitude: 29554982667004110,
                zoom: 10,
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
                id: '535a83db-b703-49d5-a0e7-c964c583cd94',
                countryId: 'y3yuowrkyxwfc51fyqvs1ge9kfy2d82hm63g8',
                code: 'jf8dr7vc',
                customCode: '71fetmu36q',
                name: 'cvxnd03csinyd9wh7ba7tycnnhioxpilk5d4qf037kqftfxk84bod0yepd3ifo8oft1hfmvxv7uq4a4jyl0d6opkx5yrv46cqt4hwl8p1kca22dlyvapq91d2it84v5w063h2e5b9q2vovlygasadrxep7we6pyiru6q83os427kekrvytao91783c56zckpgyi55h2gw3mkkzs3y7dzoxux9ap5kk1njj1du09q5gpq40xtblm6efqq0qwbn7v',
                slug: '6a3ir8j7ip53iwyddvwshk3iim3f8rqzjsxu2ztipru57qakl48ag91uhs77ux103t6s91ec59dkqv85ojn9es8ra4u96d4y1j8n9sdub02k1ze3c8zfmhmlt1oc6bzukpvzu7ys20h4vhmkkx0vb9iu30c89tinf9ttr2sbj1izb3lo5iwml9qn1ebgjpc1trtkdjt4oz0tn4g39vm3dofyxcqz1e79dpvtth4tl6jqq427otpm78sy86s7wyg',
                latitude: 16782889808350908,
                longitude: 73372967011550460,
                zoom: 34,
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
                id: 'b2d0fa5a-72d8-4bfc-94de-e26dd0c64703',
                countryId: 'e70352ce-090d-4a77-bf57-36cc3266c4a8',
                code: 'cvo3xvwox',
                customCode: 'zls0spr6qy',
                name: 'c1v1tc3xlreq6ceoql5y8d4weadpq26tk9lwd9op9nk8zfcnxvrwfzuknru2k9eki3sm7p8dh022nr1dmhmbswphaxq25wfsojiyv6zlq2qp806wltxy9lo93dm7wfs9d8v9m5jrpsnqc8dqbeqk1j3tm3q8ygahhebr8w7vgdlylcxf55yh772ciip1o1b2s2xdj1ummiez0hnv4451m5pzslvcua2e2x4w1g1rf3awbm5lzrxra3zw4gbw0cd',
                slug: 'ppkjx6rmbin0czwtwpl6p1ehcqg4z2sud9zqjcc6bbi2rvc9yicjxgsct2usdd04ek6klnyssfm8zmxow6hpyqwyf0bzj80ufkxwoxrzsjhk0jh2nnp2fcyj0m88v03o20hzfhe30yga86ouhboz5n822nizen6alft0x219czu8ig836xc5iv7otpsqykn98kqmo3vjyi97zsf1qa7ddropokg7107ivb21n6sa2rck2kgrm988kyw7mozivgp',
                latitude: 94686039763940500,
                longitude: 62387277062352740,
                zoom: 52,
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
                id: 'd7648e0d-9a1c-44b6-ae51-573c21daa7e2',
                countryId: '034150df-d811-4318-8a73-7fded3eb2cbe',
                code: '5kkv9yhb',
                customCode: 'f2pkosjo3yz',
                name: 'iagdzi7735m8wegcrzz5otwx9z0f252dvsxr7y555barev3as4h9w5jkauylx7yj64ciqo3pkid73lwwswzk2fp72eqo509mnwxgrr9wxr1fzp4o4muiwua3of4g4frqv6rdke1ujqqlb1afvdd589zrzrxnquqb8jj1fiyudqw6twtexzxvl0whzo8ycfprhxqhludl3qmllofk8qau4k6zp2ymlr8v8v0fr0biu9nt7zte9fu1mod3pdcmtb8',
                slug: 'e1stvw7uh1exr194iq2hswsd55zjdjnwka4o1u3o6ucj3xd61hxxeycfu3dx1debhlojsz5wfjn2gga76fdd8a8mpx0o7bk89p4n2ez3xzhl51uvlfak1o2ki6e68ximfiq218e0jo95a74lzz0cn3y2rl663tvxr2m21qhfmujbvocm9btkan86ar1wrkdk2fb13ap2l1yjf4braqxxt53pqx17kh2v41tlw8vkp6ivcg49tw2ivsfke8b56j9',
                latitude: 13445586028019678,
                longitude: 51222816927514130,
                zoom: 46,
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
                id: '1a291ec1-303b-4164-8df7-2d05c916c44d',
                countryId: '08ef4575-98ad-4b9b-be42-843d774e0448',
                code: 'oueepi19',
                customCode: 'oqkhv204hw',
                name: 'pttlygoeluza9ayepodukb39wtklqr9lxmt7vm70ld0wfnmim662oqbj0qobfk5jm51lilv0hfh10el7m08mrmwtfdaszx5u6rhpqt0pgvlzn7vdri558quf1my2no0xai7d1uotv7f6nc1n6p4pg7a31mft0bh9mh6k6qf92nbjtshwjjsnhtg6qinx6kfxjd9epfhu4hj1xfkhqoalnq2euqkd10q3cyd27lmpmg0eu50i2z3up1tzcsgqorai',
                slug: '59abslpiegbaoogs0b65rbmrrx6kwetre5fzcn4lbth2gqdu6f5lwx6nhd5sfaptpbbydhgqabx7e8t6rtcflss0y1yvthwktrmybfo2rfxde4c460jteoe7231pal20hrq4ob2521heh8fwgcpqnsactzydvypwqxwws8lru7kifjcqv97w1ojlb3vmsr2g9a99zei4xzateuqqqt75txva4scbiszjwdeue8lrizm8xi0d13bzpk39f8rqrs1',
                latitude: 94064947282180910,
                longitude: 24108125741882144,
                zoom: 13,
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
                id: 'a6ffb981-92d0-4526-9aaa-9766a8c3d000',
                countryId: '0ecdd743-671a-40b1-bfe5-0041815eaa67',
                code: 'gd289ww7',
                customCode: 'luh1jnqdzl',
                name: 'a42jj6kdfqn1rbjsfrkr89zxs019n0leb126whce16uw8x9n7nu4ayc60ks7ctb29u7886fd59wbuk4ctkzc4d5ci2ukt4j9s0kz42rklbcydnrsx463qyutour2sp11tjt76zq2toc6pemajoqy71bmoendkv5wblwf00sh9l3spn0xiqsk6nzkov1m4ubthu67xmba4vsg3itdj0ruyvnj5dno7al7jwk4yfto1dc5yzhaagl5uacx15snnrn',
                slug: 'fio40zv062iajvjax3b5nnql0ntggdulfn3y01bsh0n76hwnl83wz1ttuhiausk9woygwt9huy8spei9ehs1b5ie5869mdta9hl7r98kxp8pjoq1pw578f9nosovn5wyatenrzzwfqc4xdchp35jhr1xhthf4i2o3xbjj8satrev4vgwtn9qyc2owv8rl6in4ygehy0rnxlp4fnpqpyqjrwjjw4j4d0l4pplj8763rjrtt40ol1nnr4qbrbhfjdx',
                latitude: 16982918744048356,
                longitude: 34204934076018724,
                zoom: 42,
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
                id: '37acd742-ab7f-45e8-afb8-e9c7db7177cc',
                countryId: '84b76c2c-3282-4944-bc3f-6c352680cced',
                code: 'nsxifzba',
                customCode: 'i3wd6r4mj0',
                name: 'infwzl1ui0yezt0uibuqgfc7g7k3hnte9zscto66vc5gz57nr4lb4brcxzqbyzhrwz6ln3rj7pcik9jaf96okyk53toeo41cvaldcb0hs9ba5o5wlotko1xv72peats4ei2yjaq3rrt4lxzgiseh4uf8h9grozb48e0n6omy0erb89gaihewn9tjuc5slrh7rbh8cfvxt4tou9zv1oxeum0t4wrw94vh9kytupcvkhgdfiytye4ylvdjoj1jy80',
                slug: '7nu9hdeyovkk664exnvwimez5w5o6y7vebhpa0oxe2gic85iawr7uqgep2iqx88apn7lflqnd1xrj7tzwrqbx374oxcqe0typ9yhy975196w5163rho88vrv9mhzoltg4dswnh1pdoxszsnqbh9jsna11f4zp4ipv9bpu4qfoa4qbxhzpsql40fi3bp9lc1jstuy7mlvkp7a3mnymrknnsf3u28rt6mnxderp5i68hjsdo5e7z1nn4z8a2ctrvv',
                latitude: 726890684235132200,
                longitude: 52374080553654670,
                zoom: 36,
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
                id: '4d6d265c-9030-40ce-87f2-9a54c82f8582',
                countryId: '973447ff-81fa-4a22-a0a1-f1332aa0ca32',
                code: 'ceataaiv',
                customCode: '8zve58aqjw',
                name: '1yvhimn53q94xggmznnxt9ikd6cpq6c7e2j9q1x9fgq9eiyhzj12m3bps4b52ow5dyzf2bl0synllao67nqivhajrfzgdjr7bj6l2a56d90wefkakmo87ewa6d2im5adszs6nbfor8br6ari5p0njtdpe9txwofqnqd2uyg3gqpxi4v5fiduatujk6ytsbreo2s1i339xtyg31nj9vntx102vpra16ob360gd78e3jrhqwhineqwyucmpntpwls',
                slug: 'gpjo0e4roigpt4h98szsu5v6ohx1ebtq4zki60sercid1b7l4axan71ips7d5h80mjki25jvsae45kj9up4vpsvpaui5oty5aemopwobxrclaq0m3f4qj8rtnlltbywp52n1abypr7ocnkxhcc32kzvsjjwwmymoy55nldk9kta5ke67cewr0k8eiqodi532nnhill4bybd7szx0jod85alw5ljhnxay9fuumfk6jjo8x5k6yun8qc05z8z7025',
                latitude: 21471830225851616,
                longitude: 495632278448491400,
                zoom: 87,
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
                id: '8aaa7ad5-6e02-4740-9965-9739f326213d',
                countryId: 'd97a6e42-df02-4db1-8535-fdc41667ee96',
                code: '6m6qg9rd',
                customCode: 'cmkq3w5a5q',
                name: 'bzygvz97hyt1jnry2yqamcrsr4gj6tehbp1y46pglv6q872amvaoxjpxas5r9t2mrlty0ajwz9k2gcslq4080c55i4opbvsadogwtc40a850z6c6bginxprhuvqnoljbh5oaf5ybfo3248277178kgvjs8gnc3zd0h2e2n08sx4a25ylwf7e1cqdrrijiwuyieq02rdj8c1ahugqn1etff4d2165ym662neps0v3de3nn0wiwl24rzg889nbpgp',
                slug: 'dtg9g8r02gea3y0vpm1fqm346qpo3feny9carzsj15bar04msit8fmxrzmfbeoc1qr2p4oij0qc1xqp4r4v28u3cfny227vu81l6b51ad5nipny5palktqqvg6m90wxvtjn07fht035oxirkqe0icfpsqerurdipkcm8ak0wrezuy5dxh4gjj8n86gpjfpdoku9vkzmlzw5qtq0opwzpzc76sew7clirlqz66ba9ketz6hkz98r0h19ydwrjjfe',
                latitude: 77100158536455460,
                longitude: 95274661897211780,
                zoom: 262,
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
                id: 'a1f6c25e-db40-4719-a846-94534a362639',
                countryId: 'e2bb6622-6adc-46eb-9c32-346af353fbea',
                code: 'ki60tw5v',
                customCode: 'xth0475gv0',
                name: 'ge2uzsih5awzvys70fu6kqc4w8cjn57u1hgxcghoh7bo8d6bgb6fgv3urdxmmozczj4yitrhtba1b32r3udbcj4o43k85wqrqvte72hg6mpidwh65svr49s5okedl9misyfxetka32lrds46xf2e0z57u0gwpu4wtc7vhrn8qg53hvk5zavmxk90ilcfqvy3l84wcvsfscofj4dfvaedvu8nh5q5ioju25swry0r190vsipgolyaddu1m1xincd',
                slug: 'jq1od0yzc85l465gkbsesca38fodx7j7dap8wch9c7xxzy76jkhl5vknbq2anng4u1shun6ke0iicdx4ksz6w9f4gk6d64ok9qmuahum8qo78xbuoy5ghxdlaovvuhice13b8ltglvyhd1izjt2ms1hc9t12xppmgf8mbhk9xsv4o7q2k4vr0hs16tl8thhz0iovp7wt5kpfw47adi6mk7tpl80okt4s5jxvtjd01qtlwdot36oxudjqu4yjc6y',
                latitude: 39184317653368270,
                longitude: 73541754602915060,
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
                        id: '748df8f6-06a1-4e8d-a6f8-018dbf9b242e'
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
                latitude: 73747872013337070,
                longitude: 46216177485674890,
                zoom: 27,
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
            .get('/admin/administrative-area-level-1/e68e1095-63ec-4ed1-9f06-d7423cbe2325')
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
                latitude: 74215322658064690,
                longitude: 35200785237004260,
                zoom: 66,
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
                latitude: 70863842492434320,
                longitude: 20426079708813770,
                zoom: 67,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/5d7f88fc-b094-46f9-a5ec-1a7c0babe35d')
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
                        latitude: 43212859806500510,
                        longitude: 18845902668791224,
                        zoom: 32,
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
                            id: '70c8ecf9-cabc-4a63-8238-4b5f3bf47f35'
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
                    id: '67f95dcb-add2-4b93-8486-539337bc2367'
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
                        latitude: 91479037658806990,
                        longitude: 16665093146931726,
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 17163254598704444,
                        longitude: 85056871766923100,
                        zoom: 47,
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
                    id: 'a77155f5-03dd-4226-9c33-5222750a800f'
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