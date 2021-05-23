import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { MockContactSeeder } from '@hades/cci/contact/infrastructure/mock/mock-contact.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
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

describe('contact', () =>
{
    let app: INestApplication;
    let repository: IContactRepository;
    let seeder: MockContactSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
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
                    MockContactSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IContactRepository>(IContactRepository);
        seeder      = module.get<MockContactSeeder>(MockContactSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: 'd1327d7d-2de8-4c3a-a67d-a54a34818f4f',
                tenantCode: 'w6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9e',
                systemId: '4b10af98-a3d2-4a99-948b-45f35a2dd02e',
                systemName: 'dcbpme83ed6eqygzl8oe',
                roleId: 'f4bcf2f9-16b2-48fa-9c55-d1d209683c1a',
                roleName: 'kcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6',
                name: 'eoj1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zuor7iqir6326ngmhlw32cdzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve',
                surname: '93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa',
                email: '489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pbxu6te2k82jb1ljtygt9hl59tdgabx',
                mobile: 'pv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flq',
                area: 'txago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad99l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8t',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '36ba94a3-bbe4-45ab-934d-fd00debd146d',
                tenantId: null,
                tenantCode: 'sf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonjimiu',
                systemId: '0138d475-1b68-4db4-89d2-ed33127e3430',
                systemName: '95sco8pdkj8gzmzaswc1',
                roleId: 'b67aa5d7-28a7-4521-8dcc-745ffb35b310',
                roleName: 'bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gskxu1v4wbe75j76x6zd6gxykrc92oes1kl1g4umnw54jt4kgo0g4vlwgzl652u5i89zd1vxcb52keemvtkvsyy1uf3z7yq0d5prvhy804xoyd8jm0zp9mf1sh2xn5foaf3qe37zjk7vsulpyyxn5gjn7mupyn6zqul80n',
                name: 'iy3em1or36p5x5h3xnrz8x4bixgn7sj63d8jt8fp915haoo1cetip731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85fjfyndjs',
                surname: '8r0oalbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxrespudg5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg',
                email: '0wfibebp1zpv7fhooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2a',
                mobile: 'jfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzeicx0jc',
                area: '9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujs',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd9941333-f7e4-4192-b4fc-503c7e1d4a77',
                tenantId: '402d7e04-3ccf-46b2-a83b-b3ddedb985c2',
                tenantCode: null,
                systemId: 'd83abfdb-34ba-4b64-a05b-0d5b5d312d4f',
                systemName: 'wgt2gowj3q6we1rq1nf1',
                roleId: '99e02824-4660-4d2e-8c59-47cddd1898e8',
                roleName: 'ft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87',
                name: 'vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgpbhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rte',
                surname: 'aygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yi',
                email: 'e78uao97dle0en2upmq92ykm0072y5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z',
                mobile: '92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf',
                area: '9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b7988c64-ee1a-4da2-93c3-1feeed7cef9b',
                tenantId: '589c97c1-9e14-4505-a813-8592868bcf67',
                tenantCode: 'wxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ips',
                systemId: null,
                systemName: 'j0ohwhzue2exkuz83nc6',
                roleId: '402fba91-f425-44ae-9721-f6803aa51ecb',
                roleName: 'ee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gugbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1abye5n3lo0nku0kttkymxdmzc3cyzswoibkn3gkb3gnfn8to2sgvopwe625aij733fhotgzlkjmj1hrds88u8b781hw5a8be788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0',
                name: 'naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fplf7drvyolaqpkmmbkjmi7b64e1njw9wdlj',
                surname: '8af85iosple1b96ib5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpmpn8yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf78q5t1g873kduuvbm1d4e6qy7nz3nq3joucwc3qimmrjfwp1zvvxjpxscj1uxwpe2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzq',
                email: 'e3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx7',
                mobile: '55qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dg',
                area: 'zebla1e5zgo6suxrrb26777j9irv30q24108urlm2z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjup',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9f994087-1001-4fc3-a627-071dfcf120d4',
                tenantId: 'd5e05f10-ea08-40dd-8064-ab66e38fa082',
                tenantCode: 'qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7',
                systemId: 'c57523da-1759-45e8-8835-6a30c2e25f38',
                systemName: null,
                roleId: 'be35b8d6-5530-4cba-ab52-0c09a15c8393',
                roleName: 'qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvx',
                name: 'z9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow',
                surname: '0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimv',
                email: 'lyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13ukpjr7qwwalt98ndbjb3xuuz9c',
                mobile: 'yhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy',
                area: '9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x4k9qqebc7e8at2dvu9',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef2c599c-8b8b-4da8-8137-9b0a3319ea31',
                tenantId: '0d90325d-6b88-4d26-81f4-56c1cfeb3afa',
                tenantCode: 'rtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiud',
                systemId: 'd028361f-fc62-49ff-aaf3-4e5e40c0b207',
                systemName: 'z54dfc5neufi2oslbf6x',
                roleId: 'f4c731d2-a980-453f-9807-71cd295047db',
                roleName: 'v8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5n',
                name: null,
                surname: 'oml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aadsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrjdcc5',
                email: 'jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9',
                mobile: 'd4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phg',
                area: 'lmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ccd75826-c026-493e-a19a-4ce7a9ae735d',
                tenantId: 'a77589d0-8a9f-4419-ac9b-c65ec74f1c00',
                tenantCode: 'nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0x',
                systemId: '4bbdf37f-793b-43e5-ab7d-84b7b8a48d0c',
                systemName: '0mnr5ffourgotygas48q',
                roleId: 'd6ba2569-c0cb-483d-b6ef-f17548e96aad',
                roleName: 'zzenjdato1cdeo7oo602ayjrek9dbyhnbhszskkvf2fbhs763untehusdyg2y6e6ggiszkql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zmrd',
                name: 'puew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv9szeso7o5v2usb3wo95698l2d38s7oxcih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5',
                surname: 'qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8ttewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypse',
                email: null,
                mobile: 'n9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu',
                area: '6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c0e76c5b-4da3-4f9e-8696-e3eaee3511b4',
                tenantId: '1a0dc224-5125-471e-b585-333ab73d15aa',
                tenantCode: '1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv',
                systemId: '268b8fa8-6eeb-4f2b-a836-9f6426984954',
                systemName: '3ybenfp888j1i7axafbj',
                roleId: '04425567-3c40-4c3d-8401-515bd802e2f8',
                roleName: 'ht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f3oqtz15ixmygfr4efn0cug44emvmp13y0azx1yrw5v22ox22ptmav6k8mek521jm0nzhqak9d0dkavdtur8njewycn1fhylw9j266a99uz5con47g2byx50l4qq71mqxkid874boeqple9n8pit6azutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05',
                name: 'k7wjxobn4k0gd5pqzpzzwoshg407cfllkmxwhhjt689t242i8u4fm8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqhlw8w5gr1wdnpu15mghltkvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1',
                surname: 'hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7fthk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3zlpznjxgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhb',
                email: 'a0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2',
                mobile: 'n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssd',
                area: 'z9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpneti',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b475eace-490b-4184-873d-7e7cfb98588a',
                tenantId: 'd20c1a1e-a42d-4603-80f8-4e301ae7deb0',
                tenantCode: 'yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8',
                systemId: '302cda8d-a720-4c51-b9b6-e5e1603b69af',
                systemName: '9g1x3f7uqcuax5ao4g16',
                roleId: 'c5d1c7bc-48e7-4c94-92a7-f77a19a8252b',
                roleName: 'olk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8',
                name: 's0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxy',
                surname: 'tedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewf',
                email: 'nt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da',
                mobile: '3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5l',
                area: 'g2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviwha38n4y3vr3azr5o8fmo',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4e418530-a81c-46ce-8a94-9923d83e8982',
                tenantId: '883b4eac-3f45-46fa-aa71-3a63cb2150d0',
                tenantCode: 'trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu',
                systemId: '1f49be77-fedd-46cf-8dc6-b06c14633862',
                systemName: '5xzu0dxedb2k18jdiobv',
                roleId: '1f2bf745-04c8-45fe-9bb2-c76b3fb817f3',
                roleName: 'pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9qz06dmh0tmtb8cm7cut7dvbqkykglmg9w5w3efeo1gvdzvz6vekehhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvzterfezq0ia0fdhtxh2qsw16xsbw3vmv645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76avg90i4cchhjfwy2iqypxnisiada42h8kqyaf',
                name: 'ppkn5fikyuepb9no29l350r7q0m29ht5f9hfh50uno2zuepqc2s6il404j354ejfk1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkqwwqh6u1o8gzo2yxvdw3zobih1vtt6kh6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19vbuusogubahcmxdojjsbx26bckz0m58ll23unmphtu4ag7qegvsvg',
                surname: 'mzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xhyy8a2dga8glvvv78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28voxmps',
                email: '02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5c4bncbsv5i19sehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt',
                mobile: '8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5t',
                area: 'wlb7m8ucwbq8tev42cec8odshghqpny99ee6e9e75dv2usjxofofld1yjv9mli4ef80zprxyyq115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje37uu2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqv',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '60207afe-6221-43a1-926a-f18ae6a36705',
                tenantCode: '8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht',
                systemId: '3670fb25-5153-4c59-9b2b-70201083cef1',
                systemName: 'flc3hg242iz1azns4n6z',
                roleId: '7e6d1a4d-f49d-4a8c-8fe5-a300538ff241',
                roleName: 'x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej',
                name: '5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdhggjkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c',
                surname: '9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6c',
                email: 'qspwew4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3w',
                mobile: 'gyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38n',
                area: 'cg8touilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8y',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8e6768ed-4fda-4c56-af9a-339f648f548f',
                tenantCode: '95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbac',
                systemId: '4d7041dd-725b-4fc0-9109-6d06132e2070',
                systemName: 'yvihjgni9zfw5h36metj',
                roleId: '271252ec-2e24-4903-98d2-eac6fc327c04',
                roleName: 'ecwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rscwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6ioqidh67grw2iyl5feghk0etp1fddjm69mz8yx9g6olbofvc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk',
                name: '9wr2ttvad14hhltzec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq',
                surname: '1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq',
                email: '3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqy',
                mobile: 'qzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e',
                area: '6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqtabxf076ospec0pysceo',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f7f345fa-5704-4be9-b560-bef422cd4224',
                tenantId: 'eda7b90d-5983-4d93-8350-2ea057d98673',
                systemId: '631414d9-78e5-428a-99b9-8e81cc2e8db8',
                systemName: 'etmjhnplaozlcan07tet',
                roleId: 'a53079d4-bd2c-4d1d-b240-9c868479a545',
                roleName: 'ykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2',
                name: 'zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwan0o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acd',
                surname: 'h35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6ec5w4ru6aut2ohdmclmw99eurovkdncxqowqefcwmakwg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5',
                email: 'bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tuee',
                mobile: 'pi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60',
                area: '030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co824s8h8810tgpmqfnmv4t',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '596565e2-fbdd-4cf9-8d08-c08cc220976d',
                tenantId: '5b15584f-ec05-40cb-aec4-802786319f38',
                tenantCode: 'i46humx0qvtibpnvxih5jo2d0b07lt9h1tu66fy4n2fztkt74k',
                systemName: 'c3g9d0qm0tyqvw7jw407',
                roleId: 'eb495380-ddeb-44d9-95b7-c4fb0394b8f1',
                roleName: 'w0ujs6kde3pfk8f9t7cpd1hvvmaz2wdakcnh92hnr2ctn2yyr5vjpbqjb88a6bxjs403mlaa37fscv60tirjh6j1f30twgzkeyaha37uk0wss3zlv7tw8qql5ai56idudhtvm5dtu1yrl9czsrnzv4pqqonyg59gwknl5ss727f2ge5j24f72xksugno5s7y44c9ypc7mvrbaothkxiywxhgcez6hguve27cq0vm3in5mbgfawwcox76snlar0a',
                name: '0le9t3o7o8x6gyezwrzyfgfdpnrytgp4mlovhbs8lfuutmn44iikjuwskjy7haovhvjhovjc3rkheh6jh4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj79motlj87rjhkc4ebu2mm9ba30japbumdpwofmvf05cugueydcfs1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s',
                surname: '4imsaxrkezxv86tzq1y2ldevpdbv0i90fnscqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6zdxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4vezix13x78',
                email: 'gwvgme49wlgn2izzecm61avboh7205zw6dr67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tc',
                mobile: 'j7w9etznk2hktvyew6a87mdclnvx19y84r4gofpam27ri3ve5475ly9behcc',
                area: 'yrm0871425zqk3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6apwtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '05e15db5-1e4e-4dca-b37b-0da6d33fb8fa',
                tenantId: '150b665d-b1a7-44d3-8932-6fde326b6798',
                tenantCode: 'b3wdyyr6tin3h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb69',
                systemId: '0dbf38a3-8c93-4721-9829-dddd7a7d73b3',
                roleId: 'd8d3e3e8-8c8d-4971-895a-0667fa1b4b20',
                roleName: 'cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8em0xatzfsljoj1sa3dt6r2hy97ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzirkvl8o2rsahpkf3587kb23cvdxhyyuxiwfgd5tdwknxs1sc55ayjl61guoss854lhebijhow8bcqsak7trk4u0xrcprw0unnkc8pbi0sbh2hcb',
                name: 'fept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnut2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935min00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcbra0lvo1zpxz1u',
                surname: 'vzdyewrrxr47kci24wa5pgedbkf0w0j5exztz5o53m5flk4wnfxcmqyyxuywdvr3s5bmaikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccrlngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee9awo2kbai1ngcpt0vx7fingy',
                email: 'yy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4esuncwmj8j7yiuyceruim42q821b8y3uc5vka9h155tf24wzaefol',
                mobile: 'extyjj5i11h1c5ybz9cbulbihy36smu7ic15h5pw7g7xy7eq66p1t1vrjcpq',
                area: 'h49t1fnkwnb6xqnaexib3uboqu0zul0sp1lfqryni3rwh35lkftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3l01fvpute07f685zzb37ezpzadorqynighwyvjpchfg92eh75ncxcc49dynqct5myt8r64852ausk9rdm0qas1hs7ukhxag27w8z98j28fg9z8gmnf3f0d1cv47tjn876s9nvaqu5d71xp',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '91ab3f1e-6fee-4017-965a-b2ff6af6a708',
                tenantId: 'c05fd1e7-8cca-484d-bf22-42ade07369c3',
                tenantCode: 'qa08ayooz5pgx1ju4ot2g1uu0xl9gg1im5aahbygz10yy8xyui',
                systemId: '0f71e6ce-1b2a-466d-9ec2-1a16f9cc9a0d',
                systemName: '1x1fav4yov19ju91bg4k',
                roleId: '7adbaa32-f0e0-49c8-b42d-f817b35bda5b',
                roleName: 'u85uizy2r70b2ntnlrfezyd9ipz7prlo3296j3fe3c309ml7910qegpbqdglzafh1nvt32i1s24e6cb6nyragnez3hf1p4lfvs7cxy552gdgyirnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4dqxzx05jaebapd3ato1avcuiiqd98p9oxnrcbqgti345vwx2gcl9747uwnm47bhvbsyf6n39wvgkfxc20sq423isaxpw0vsbw',
                surname: '4g6odbq680hqi2gzvv1371yfphiul6ufr9nntlz4q2chzaxfgyw5ud9kojhv4fgbdsf9dq8ifrv9mnjcnnnmae56caw8y3rijm1tn9brji7zczx8bh9lctqqx9q2njelv7uy93x8qinp22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir',
                email: '4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamgh',
                mobile: 'ghkohbzffmboqz46yiie8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf',
                area: '23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1pwo6xmh7tr2ft2uuu7s6vh5p36g7pxsyvs625cnp',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '39ab432d-bbd9-4d2e-9f7b-30f3adbc11af',
                tenantId: '2480b0ae-2980-4295-8c32-ef0a35190d9b',
                tenantCode: '7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93p',
                systemId: 'd7be18f7-6d7a-4be7-948d-f00d2384f8ee',
                systemName: 'i1y0aaletnrbi4qm0pej',
                roleId: 'bb564cb8-eca2-4536-8343-8b876e440991',
                roleName: '0xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2mgdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9kuam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7donk0nb1',
                name: '1dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zulexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75',
                surname: 'ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2hhx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tb',
                mobile: 'kb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6',
                area: 'qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7ty',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2b358dd4-9f08-4930-ac89-29b167e8d4d3',
                tenantId: 'b1656bec-8afa-4f9f-aec3-ca91e7e2610f',
                tenantCode: 'u750mrch0weckcte3zg46fihudh00jqed3yq4gimffnjwca41p',
                systemId: '61f5ba68-7333-426b-8931-724ce6a13328',
                systemName: 'tqpyh5spkm2q1l5k37kv',
                roleId: 'c8b016fe-e8d2-4676-9156-2dc378a20002',
                roleName: 'y75ahj141hpmat1o440l4dkh1ovpc3yo1061144hcgcv892jx56q13vr0u8i9ue51eu2n8tus2bpr8v14qtp6yowc2oqjj0b32gk2vvqp2t82bt70w81kwkbb5p2m7swz7mibjivscaqeiqcthf6hlwnfux9k6f8owizt0vyesb1r6856dny7h0rs4udp5hzpcjag5hspx3lnn0b2zm931k8zspdelpjcg6nra999fvzccpusharcz6lo9erlil',
                name: 'hu7t0kxfc8f43y9uvdt0wtwclv8l6js55qhnxyca79ifxcqxdb4ur669gu81zsv69uleqyqeh4u4stcsn829sgiux3xdual2afnotosxzvx71xl8801zcxid38b9rv4y7ro90xq1crxhmw5jp6pp8fmbb1lx5jwchk7uayzztwi89gi7evuymjrc1xvr0hrtc3as5qcpo3e7fj3xlxcvm3rqotn92s7j2oa5wawt0877h7ln6a4xlkxeihigk92',
                surname: '4fjy9ydy3esmhwxh7ij2ppsvnfjtvdapi4po1pyaca9iin8g3ybqn8d8vhjgcwt4ppv3fuobxyk376gq62e0q73ss1ov6w5up2kr6aj80arzecq3sscyauzi7j9i89x3ycdat5lh53bho8qb04mbor98cyigxxchsdhvhq75j68hplmcwcs221uj8i7nu8gxjv48iebcm99rk4io268v90dq1furaldjmr05pax7ga12zkqw6irktu3iywrtv10',
                email: 'dg5l4kww68snq93rj4q0u9m1xl45vv81ud142so7xtljwjuz6nowwaa3w9gpzy5hhz0cbl0idue9vxojl0cdga11kkvkwrkn9hnvnlyeejl1fmw74jg90vvh',
                mobile: 'd0avly6hg86pk3rxk8e42lc60lp61q2l8me5ldyg7h85c72h9kmey9tmsxgl',
                area: 'ird8uxdv1asgis90cnvekl0hebxiyznkq5dnv6t48040jva5ty6tavqrhxbk0e1ictwqi28vgp4btmtxp876p1hyoh2nxi9cax7kw2kdy6gq4iudbuioojee9ivhal6tac9uni1i4zv4jlu5stens3y2zki1d25j5vblijac96px8ataynri11kecmenu1whahmsvi0yz29evskw80widc13ngl6bi2dxdo5dqp5s5ev1istya6qea8o49vl0hj',
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aa90611b-b051-4977-bb5f-f0b405f3a0d8',
                tenantId: 'f184dd5f-4112-446e-9af7-d795ae30e577',
                tenantCode: 'gxnxnmcfqs48jikua30sbt1sxe1ksbve7vc91z6oyo92sr7zh6',
                systemId: 'cd589f20-2644-4b9a-8d8e-03d97eccc30c',
                systemName: '04sc34j7ik9x6gj45q8i',
                roleId: '2739e8ff-4677-4c9c-9e60-a3f496ce49c9',
                roleName: 'nfhul68xne4p5qoqqchnt61apkn9onk9dkk60379b31tgn04b0kq6b6k2bqvfocind7bzkxdolqk6mwky9hxl3tnzornt70qzvfavq6bja1xeyrbnvy2qs4ci9rea0rqlz4v7n5szt4k7bxab11colbbrgsniudbuz1my1jsjk2u1p439bqouh7ua6wsixcbt8ezoekp38go105ddhygg3szjds2tcoo49p5bvdqynsckqmhj864t3rtjkel2m0',
                name: 'pc3jj3osf2z7nraymiemphl7vuilf85uidsrlnywxx4j28o6lx53s1g366ebrj7htondi29zfehy2bnfr36o40vvfeiaqisyab06w51ubamrjhs2gqt9vdl4m9mitl5ob1gocw44ukbvml2rn2pil9tvoxh6rqd4d957z6eki5p38h02o9xybz9xzwn0m6wr4g6icimhwi6j1vhj8we94y1d7txybltzva1mswow5hgn8t4cnqc5vrgzjnkonyj',
                surname: '2mik8y4pb4bz1vl2rmcocapjnce4krh7aktauwv9vrqngpxb75lunnokv83sskkpoevp1nw9hu44hxpsq8sxnggrmup7036ml6mc7iqhkzv9jpalaaeflc3vy786yr15d63vi1qwzxmaasqco8cs4azr3o8lfp97cwohjkqcjslwaha4xi7216mvhny75so1heylim0jixfoxt325n7rc169csa15gytb6mix2cnd4arma9m0oi3t4xewadvcql',
                email: '6n1nnl2p1p4bmn48kckrnn8h1h5fox84cifs4oz4nhatm93v4jw9cog5xic560pyaupeil9agdqnfq5psfit0547auzw9mnixpm9u7okxo0h2eakp82pckap',
                mobile: 'iscwpn10hqq2f5kbfyhmbjgviul5wlwchgqflem07n375qrl1j4w0pohkkgs',
                area: 't3sn6kjcc4bd90p5iodxtvjr71wsr0pfp8u6ws2djt6mj9jsiuucb1ocxj1tej91wa2qlc3bjpnmvt0f93jk2kf5lvfkoy7u01n9myxphop27bzy0z6z7kxm7jmwvey5a74lvdykadj1z8vhn7lg0jnwanax6elmt39f676axu9yw5fj8mab4rqmi628h3mitwj1zumlhoj7470d37665xj66pfoi45rlgn7rmoasnay9jw39qz2raymrfu0hh1',
                hasConsentEmail: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '35a169c6-3eee-485d-8bfe-42001be3ce81',
                tenantId: '043cd071-42e4-4ea6-9af5-641ade6dc7a2',
                tenantCode: 'ik0do32gr2y9izwf8t4h1svnqz3k1fhrala1dadifqcgpb3vin',
                systemId: '526d4128-cad9-4e70-8d67-f30353ff77be',
                systemName: 'beoh3z1cjv4rsk2o7r18',
                roleId: '6314fe4e-5358-4347-adb9-c1021cc341c9',
                roleName: '40xe7pkiiiqacrt7jf5dstkc8kfbhs62z17emyr7sdp1bvvg27f56cjd5bc1id5e42beor0443zglfopvgu6k0at9qcr33e5g7e5uylmics0p9lzsdnmhd4dp9kedjm1vrr5i5q2u7lzdo0fwj5l0jia991j1fn9e2jq5emcehvbz0bnn84eoa9dngs8fqwfpdez8l96jb3qjbq2zecmgmrwkaxpkdkwtmioaxzovs3yga7buc6ga18czsqwicv',
                name: '1zjvxbdi8sue87asq0qg749z9aoz820qg10l469o83fzv1elb327esfk9bsnpcxgt92u9ovgasduz4p9kzwhwztasewagdzu9fk3igoda44gpmp3agj0h9vc2qip7msgy54o4fq4u85tiw6lcxjf1wx4agfnxemjqvy7ypmci8nkjyazuuz57sssctx501fevashdk1q21l35pi649d7ijm7tp2tzqxwhmgys227ge4xnpm5cdwzducnxskcvf4',
                surname: 'clyrnmtiwhdyl3r1i1j4k2dcmy9hb7bl7w5cnybzvdhbs4jckd5en6gr97s41poy7q348w237897t04o3pr8bl55d3tom51kmn5wxqnaguwcubvqcyfffoj4azthrc3tcz5r42wzq2e8n5s26ec60h2o5dxeug72gn1j247kka80um2asmabbtq53lzbnsssrpui4753rulekidh9v4r3pf9ku0if09t1d3ywgf25xv19senfebko7kfiugngp4',
                email: 'q6mowd4f97womt4e2glzk0a70cimra0p1h0t8mevwti1qtlex2r7m9akuhg1t46r9b59iwhqme4qzur9nyjra0iqiqhdng7e4hsgi1r9exxugcmj4sywudj1',
                mobile: 'wfclgo8pxnt4zk3ecyo3szxizqidw7p49sj2ig8wceu3kzrk4tm475dkxypt',
                area: '23qjjafw09x2ot1yek9p826jjlcvp0vsgisfat43hw36hfonhsgrktdspo4tm15u3lfn3m6ckko73x7alddlnk2hbrtvm7bylwaca7a8pu44amkhpoyvd1ni34hlvkh1mbka7nj3bjd0044hicfkng8z2bqoqpap0jl31g0xbvfy88r5ukq9hi5r2mchs3uzb86np34yd278uozr28yer7flmsz8tslmowb96eta8k8bsaixqy92vasz8seia94',
                hasConsentEmail: true,
                hasConsentMobile: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5n4fubr3yn5qumz6ep4wv4djdwv7bagna6msu',
                tenantId: 'c4d5be73-7692-4308-9377-9a4f019d100f',
                tenantCode: 'v87e7khqautcea644ifc4l14xew0mq4pwy6d9rssg0fwhjhhsm',
                systemId: '81f59983-f5f8-4f2e-b511-630485c72e32',
                systemName: 'thfw5g72ljbbaj1jlh7t',
                roleId: 'bb5dc78e-2fe4-4324-9c8d-ccf661865666',
                roleName: 'eoh34eecryaevqxw0d0t90orpzwnhgcb8wpviv4bro8312t7phjz4ipyphgq7r9yj85jw9kq3m6x42sh4uld7xc802jr596xaeetkefyrsmwqrfkzceeh819gy4wkalhisohc19zsyxrg0eer5j1afg42s31gsdvfx2zrgyqc70957djpo38eerazfborospw87vme4shn0nfd8wguboro632s4bzepxysmqldrs85r2gvo0c0kvj64sqctrlaf',
                name: '9vdz5a0tymegvoaawosmrdd5frwv23tovme7rpwuvb5kr64t5qnh6gza2wdwc769vlyldco5jb4hl3uv5lrxq7buu9l4lj9tu59zkoyw65chy66c3xe2k5oi00e9g5ainiqbgtd4xt6jczjic8ukdh3e23w0ik3tmpmdthkjit0thzrmb9ev0fumw2qq03ks1cq6291zt982gyaftienmh57e3u1nh0peppdxii59v6p3fup6etfz0025a1myvx',
                surname: 'flbutjaf3mub3rs1d1v8d9mp8qz9natccvaxnrc0jw9xkydgo1sk925u25ucoxpagi78chi3aphyczzak6h9stltlnn5e7eeap8f600pxk6fpm5oe7rzzdnji3dojg3l8ppq58ax4cw6qlb5ei1efays3kjsw017pi20chlvwr7s3kkzdy0nico7848cixcqu49yi69rrin2gtypgbpnax87a9knoonssz77kcbw5hng7kb3tioazspebnsiv9r',
                email: '4a5b1j4gr0b1r5jlloptor16qu8yr2idojwo2082ja9vyb35rzbgyngm53wpp2eqoysz8h9jce7nhrza4f8x81v16pemdljp0n19dmaysg13brvl1v5b53ul',
                mobile: '2sd97xdqj3k7toun0lumrjhl6wovocw1ndjkay36ahl36ej0rn3ef2deukls',
                area: 'yk7un8h1mrvvh37ui63nu8bqori6hiy22atw2aaafk63u029y777ng9g839hq1hooifw6vejwq3ry9abta3ut2a64x640iz0k0el5fsmxslis75298ghpf14rp5pdz72x3ihtvswilewgy0n0vn4294po9uqpq716hbrixb03m6rrs5g8zyq096ojw77xyiy9kpujg2oa4vr2a5nlrhw9rnrtuflph1c7vky9tv5tfvh4bn7w47bbq8f6jqc1qq',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a9b2a04-d23d-43a2-9bec-7b1b2de591f3',
                tenantId: 'v1eh2vp1q3rp29462olv6qemwinetic6avhds',
                tenantCode: 'fj3iqz2f74869nft70qww0wcuw07929lcdg80abjjyug44uet5',
                systemId: '2585dc5e-76be-417f-8e03-25ecc5f3ee04',
                systemName: 's2w8yaylldc2fxsizeni',
                roleId: '8d34d00e-2688-4580-a066-c4bbcf65ed31',
                roleName: 'r6826smw0xi61k27muw3ir4gvpq7wnux5ihwxwr5hwvltmbe6jpf1ba3b9h800yb0gxvu2jnrjz2bytxreilq60gqprglb00yhdsf8gh4hpes4wgbig6asif5nkgknqur87j7b1qo3k0xsaqnao38u61nccncrwv45miubcacpfft43ucstqwpat9jih6qbqigjzomzlfqyjc606n9c0asi4o4ar4mspeab27t1vpkh6jbmzn3val7knrovbvvv',
                name: '1qz13j75x9x3szvughsf2iwyqztca8l8av4pvgpwbc8okf6fm25d6555zn3iu487hp9plwcd3eywmvim0p51wn6q9o6f0hxkii3htd4s9jvjf7wuvz71uhuo0b14x2sa5tz3ws9baiv5j4umgs02tg8p73v7wstukbxrahnmxnla27qt8onjldal8p99pbj9plc1lo1j0bouh5eglrb5xk29td2bqsy4fi3mbb294vk8qpv76kqz8rmvyhb8149',
                surname: 'o0uduwfgv7cow3kw7pr5xlpf69u8knwyjbhncdn0c2hx68ptjnd4vjnlfvt8rjagubireuwctfj49mn8jhgyid0s2h9wpdu3h396yfzitn1i6up5zae7ld00tontrhptruc10v8vkp5dc0iatn675346mmfc5d4c4lmljteortoqvdujq4jx7rjd60gll1v24eeleu11s4zqk9zf33p82bavduposx56dvs116s09d7bk7jl57qyd90ccev1kl0',
                email: 'u4srwg3gg0ynz6nm4mua56buf8i7wx6tmj8bqurb7jit2azn2nro4v7shf9j2k3lu4iqanupyxwd4yn338jgtym0anmyfheip9z00ksev19chn2u2o6x6tsa',
                mobile: 'c6yn07yc8cnik7vbzfadduq4acwtx3sfu32mz4rr4zeqbu3gtfnxapwslqjv',
                area: 'mwbq6eawm7btp80yf6af3uwvzrofbvftbahasglavos62twnui6rlhb9tk834y81w9elsxyk40xlgk1t9ijtg1usqsskixle9leq2y1jb90aaxsg09a4cinqqtb9zi1rejiczwqoiw5jztfyiiljro8dtgk349fpuush7jlkws36a9ngpz6xf3h7a90797jut42jd1tvdcydbq0mdoxuc2fd4ur8wwu0lsvce2xfz1fywn3pu28vzel6128l280',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '60d30e94-3270-4b66-bf04-aabcaceeea7e',
                tenantId: '14966486-14ba-46b5-bae7-345dbafbabc1',
                tenantCode: 'atwrz0x33oqb0uv8fk95aw7if75hawforv83w79m6py3gnzcc1',
                systemId: 'i37t24qcvyvdnpithborxhwtig40uvqfgl388',
                systemName: '34387tcgjgsom1pjphry',
                roleId: '4a1e7c1c-1ba5-4bcd-a957-af09bac8498e',
                roleName: 'cotmtqfsgxsfy20of2vfb3mnowcsk1r052ct5ehjh75lpr14xvpq91hmnivmnrgyarr6i6t0vczityj3j5rmt7ydsvxozgjy7538mcce0ds9uxsxp1siccfqns7me01c8z775x1ioh8px2094tflmcmuaut5tdwr9l6ktto2e4xfqni7ze5oh2gj2762h87h1edtdwyctthgfrcvv1px0jwy8anjiore8t3ngprsw54pf11lgpdlm5zo6f74twa',
                name: 'c0fz7vl9wkb5u3ms45fn4gtfy6g3w7fxrbhf802oewe69rqjq10iikgqwqachxl1468ujgrayk2oc2lhwfg7q05fcyg3oywhm3hyvcv1kgj5mvfzyrkzl9nazg4qvfxbnkyu4la218lce9wwdd6qoshmgosjkxpnx316m5xj0rbx6c1khmiwrsxf4kyh6nhr6toexn4ah7qikrggpaf9in44xmw3ulmqqy87qwzky3flunst11h1cfzmoson5yz',
                surname: 'fjbzth6bfbdfbnas43xdohhjclztgxft1uj6qr6aechutfxyp0jhu548k6zaijdwcgktp9h7vlfwhlxd83s9m07mrzaea9le9dpxs95wtd35r4qhkb3v6e5g107hg8l6fbbc0251wbfhgxtqr2blgmdzm9yhdd1yrdbkrz9tdxihgqumcjfr63u237mwpga7kj4dw56fjpracdj2qayv1ppnco7mtggmmbpjcmdggjkp1wnlj7yq0bh5ctlrb4g',
                email: 'qmp06hjj6s016c7qwwp6sgbtwozhgqt0zb3ieyege2npipfod3eaixjq976xyjx8qjmlzgk2evca20i3pi4ov91konn9faxt1fd2745doms8uowlet7r9b7q',
                mobile: 'n4s0x66x4rm8iqzzs0l6dk55x1t8h9folnmg2z5mgl3eb54m51w5ghiv97pf',
                area: '3agj0pve954xubhu9j3zleql6ygqzvnoei8bdaa4gz5ymkoi4gepgwsumes550jsp1b3vh046by84kuaix8idl43lojp6a72ro6vu0hxpnnv1zodppmir3l1qhsypy8jey2hu2t6z14eurt7ct0f8z9evssov5zw7a28nixhymsuwbkubk6aig457nf6piqoik2prshzf21xp2nxs4x92bfu1b3l01az0g8hq5hle43tgws5a93pmplhlhazxd4',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bfbf8500-a509-4630-a402-3307d207ffca',
                tenantId: '9238c3c6-d396-4a84-a88e-4ad5cdd854df',
                tenantCode: '9ueuwj8i7m69eal7s933iweo3ix9quxxl2f73cgvf7bzuchvvv',
                systemId: '4e6d0fdd-38dc-4ee5-b275-9e858cafc975',
                systemName: 'qu7f0sze9el6d1f9fohy',
                roleId: 'euv1r0jhjimgvrtg6skf0hb11ncb79u9tgpsp',
                roleName: '7hnbj549lg64724bm10sodp5j7rpr7uevkh3kcllk4c4xo583fbsco1fja8yclf6osnvqxexvmjtlvnp5zkc6y3ws5dpqx0kpj6o0e9gg4jme4jff6vmuw1h5igo3eiaarit3qztsut20rapj6y1ldq9cr280ag6yipbof1l6dqxwy0z223igfavkrxscjr9z1pdhiexcxx0oktucmhe6pwf9hxmmxh28zh8v05404vwy6exxi69d4nh1x2co4u',
                name: 'a62lu77mp99bspryvhh27sxyg14kaj4now894q8s3l7674bock1zho3ar5qvl94nt1yd0q3n4boz9k3bfhgze1vxxct8szz7densde1s2ms3yuzutxq63r1e31xntgeor1l6bebk5w0o9p7dy87r07ldvrguii4ygpp0d2i1sa057okegi0lixk7qsh2qss8r3kv03au58p4o3btss41nr6mizg3y9il8f1mu6aiaf8z34da9odupjdc06bd8zc',
                surname: 'tkd3ub869f5b13tsu4piwmoz8dnd3a3tyzdkk2pbtkt01qb2u6ifznp5t39y2vjucodh39bsjzklrz8dxqznkak5bg7j4wicm7fv26ydm3zhfqxm0t7ba8gmcx9eaivdygqdkm4obdui16uka7w2uyi805atnfl29dccnoqh8qlalfpjzs84lwyukisqjn21c3nte9vprnnhz9qm570tkkg2u6wwj2b6r09pae2ntgi54wytnwyiqtgqif7eay3',
                email: 'lx6ybmh81tps464gsufi1evwmnhm9coslbx9cij8olb1gaflgvst0275igxg6d2fux4vkfzpr3qjzm8nbdywm1w083jzftsjmze0jm4yoxsasqod0ktoeqkk',
                mobile: 't1h3tywkylkqbt5yqntolpss0ynufrngmqlygy1sssvlag0wwf0gp60kop39',
                area: 'bcc4g66dgeyyl36tdtowbtm1k9z9pnrnzbzuz66ezi4pcbyypx0op57ywum1je1jqc21lctpu3k9hkuu26g3n6n28cg5uqkry9kz4kdu709y5jdjyc2jrpyyuccf8ymndq5as45nnj56mlk9ebpoi4tw56i4k86km10h2wulr3izqs3nc24w4lpftua3fw6jc2chrratwoef2l6h7r886qwoy9oug1n4mloecq3zt1ge6pxsdni4u05say3303h',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '16d91299-3ab0-4a34-ab7a-27f167aeb6e8',
                tenantId: '5065942f-7f5c-4533-ad8d-98d2fc9395c6',
                tenantCode: '2gkb4i3u315zhv1caljeu0wds98s0ot2axmpetoyakh16d7km7e',
                systemId: 'baabc424-650f-4938-ad5b-5a07816ed240',
                systemName: 'sv83xszcsa7qvn4s4z1y',
                roleId: '7c924b9e-b875-4771-ae33-54f4ac7aa73a',
                roleName: '8qdtuo5jwggg2pkrnzcf04l78pdhk9t8iavbql3hx1j70ipx6d06vlwrlxdii7phv8i9xlon5bhdxbhrcu1jhw32xwo85unw4xbgvnvwb3f9g21y5s7ksaxg41v78m6mxtm3dd95pnyzo55m34uc250dk23c4i39f1ccsgpyy45o668k1k6vpwdmsqvtuteqkshfbqekpd6pufgytjzg9db24sfdnpnk3xvytqp8dyiab0ouzob5o116am06ph1',
                name: 'obw4zyi90q6fce3nosag44y8bbs8cqdj67szqaeqrva3n02q7efkv61w6v3jducjoq363jy429jmc88x7xxd6e8ta0vsfjlrxowsp3dg2nhjhwjk7zsclg3j5hb67n9nfl10uao8mizy66lj1gx938h72gep72k9x468fvfhlzf06lywdmn2sr76qvc1ivwl6cl2eoso0hf1y85qzfustxdmjj47lhr0yucmekcznqn0mnsxb4grtaocp6f7mup',
                surname: '0o10tj6pdaos3ssam1v9zkzow1ysz4io2bzsdcvbmqfe5y60tz92jdlmzpzkdickqfsajowsz512bdxrslf1g37iop62wz8lt9strrkw76rotkqqem6gr3ohcoi7ce0rvo5eqzqbzj755t5wy802wp5maooyzgppwwa6fomn9chl9r96qepezwy3ad6qbasar2qusqyb1idqhr8fur3xx80x5k13kgtitvg7j7fjmff2zi5xs9ec7wbziop4u0f',
                email: '2n1ad6n5qibeuj83uygz8wkqeblgs5l2h8278is4gxv7nofcxi797fpp5xq2fvdkelihq2nu8m77trzp86z4bid0t6zegiihv6d89cb77nobtdq0da51cdpf',
                mobile: '9yin498dojslmt916t4gn8ag867wqhdqw4qfydo10b3q0yugi4yhckuyb0s4',
                area: 'rclryu3rbv9z4qga4z8kxgm7sn4du6raf9dci4kkuulra1urywiik4frcm8a166d5q69bnjkvhdy02edxymqotgtc0os17xel4lzfpmkkfofqtepm6bt5h5ichxg6jtbuwykifupf1jvsq9e69nrxpr14sx33lrfpa2eeuud5htc40363n7ervxujn1lbexmgecqvgmntvh43bd5ikuqcj8i8073afhytrtm099pre8hrwo3e0nocsd9eoj6ym6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '14bd0d9f-fc52-45fd-951f-5f000cc46ee7',
                tenantId: 'ec0db821-3970-406b-adc6-26db8c090640',
                tenantCode: 'v8ne9vjyqmveae3yfaisde2z198zt0pezjcjc8j9htrfckvr4w',
                systemId: '08706db5-16e4-471c-a107-cb047e7dd799',
                systemName: 'wf7yjupdkg11ry06ytfl3',
                roleId: 'fe3d8674-7876-4da6-8cdd-bb0695303089',
                roleName: 'nnj47gjnl459rjaaameu684gfdrahzfui7nz5a7g5iksq17uskqkf52rjdru1re0iaf720dgviwinomirt3ghu003k630939icta0dsene4vepgv7q3s8cib3rygvrcb2i4igxefyunvwyk9rf5c2m701ovglqytp2j5z0zrlx6gbtj5y311rlccymmut2k0hkdnvz34pr4pr6v1db93n07qve656tk1c75h041qrsjviq9vwuo2hru5mk1d76h',
                name: 'gzq72mrux3p4q6xb2syuhpx7z2u5386b2lqww5ur4z24n58k4rv1duzepmlmrzat8vr0ia67bcziaww5mk49zhqih5hcrhk9lxrvzo1s0tlklcyezfwzmvjt6ler3zm38wjy22fgg9jt2exot6ew0toix7emjf49xca7ha2vrw8u6kbwz85kvz3kdrxlncpxg5if4o458qr8ekx63ai6wpektilq7luobmbjuefsq2d21sruhr8kbctd4j4djg3',
                surname: 'uiby9350ljns6bmo1y9ub6vm4k9re19w6pysqrdpma4tv0fuqu7vjs7e147uebp7x82gbp4wfqkfw7sfw2arwlo08ybpssx9i9pnnzvm6w81y2zs306ugt6d4ypdduwou5calqv6iku9cfnk6yfrsebadyzev1z0bwoyph3xvrjduahxnl17a11mfdivmel8pkbu2e9gqvx6dxzzgb8g4n4zvjmerqiro6ibadtfjuwk2ycz32d2g1vwb90p9ai',
                email: 'bq5tpdvbuji81incjl0nokes7bv28g3vdno8ami8dnek2jlky6zyqdb7wvjfa7s0uvizd9akntfdj99niin9ircocvn7o52p0ja8or3v99y2r4cj3fhuvnz2',
                mobile: 'h1kt2zz29kzbfh2giw47kzuab3vwmthw7he6xk5hiowro22gt2s1vztn6l9l',
                area: 'qm1h1lp2o7re9p06fxtwa760e1jhwq8u81mn4atanuu14a3mwhqyxedcduqdfp4nn3fy9sk0znlvxt1mmbfik5wvok5oifqif93xtwox4bk0n3afj2fs85iz2newxsm2ibenjehlqx7yb7qcbm3quo93nj64adkewiraxmhnvp9bysvxshltxkgwab06vct2visgbfdqh7oy9pj8z6cad0lr69wmgr3bi4vdoda13sw3eegjdiua02v3w2v2a99',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7a9f6883-f293-4126-96db-ef4985841a86',
                tenantId: '2313cb34-0335-4ccf-b30b-23addcb130a0',
                tenantCode: 'v1iogk2g4s9ovq2g415upglkhaun13z6sq2znkct9r5x48rbkq',
                systemId: 'd02f6c85-9e5c-4384-a85d-e1a4dbeb365a',
                systemName: '0nj779wgvyjiytffeunp',
                roleId: '40dc3c16-62aa-40c4-b812-fd95eac98e90',
                roleName: '6pqgobwnsnf6eq6j03qxltqeit9bsawcgowq6fs0wc1er7pqskaz4lfdg5q702k8osg3hfsog9xd2w2ad8bhae2shp4czf2vqk6kiqy161z52gq0ifit2jgeqgn69b7e4d6cpqzfem16tyavyj98uzhpgcsjssk49u0qxuy35wx6jklro55bczi65dwzcm2xx91vc8cnpba74f4pmrru6lgkriljzsql3vuje8wcwytmqkzi99jxmxbocko9rpre',
                name: '6stv47kelaexxjsdkzarjd2ufhgm84c0966ns0f3d8y68xo0nvxtgzcml4civ4f6n85bbid44i6rdkkl83xdtzp87zvk2sekgjzywlme0yp47ehay7tgaf9o5gpcji27osd4hy0s8ec4lkgfa5lazbxxl7w0q5n8yr69b246vzt87nk6mx28fmmprsrnvqkapi0583f0fhss8yygactm4hbtcry8rqt4zrvhj0jhwmag41tvkpx4p90c4tewcps',
                surname: '0dhk8vtjh0o1d7urgay5fi2gz8omtlah1bzixj5f15vkyba9dc2j996ag8s6c0908jvqbmf6yxsqyhu8xkxy5wpecog16tmpmpfea5ldr11d9f2vzr0q18o4ikyq7pqx83bazri2t6494vxua4nkwr4uchzre96hut0pumbd52oalhmrhynea1djc00flppysdvu4rllsz53r1kgck5exisxdt27364qy4jijp02u8ufhlnir96p0kylz442tpy',
                email: '9xrnfvr52lugvvssqlg5h8q56p92rxbmr155tfc6nb6lc4bbtttpb2ckhhtou76het3pzngbmrd9ybq27329vlnm4g0pisxkgsrna0psbkxmcq68rsdde77w',
                mobile: 'mnob8f97p95m6z0r3vzzrhplwrokmvnizg61u4ajjvkjwxksgnypxuowoqdn',
                area: 'u4tf6rtnyj3anyw7a5rm2gzfnh45vutdko5rln86gwc9cfd142b2k6coot6xdoglan2gvunzpr2t3quo9a709q2mrmwdjmztivxtwecro7seo01dfxom3x0snqex9ih4mh8h46q081nuc2e2p9du08mpf4j4zjalzbmf64bj4ffhu026marmk83qe051h42g78r9h86kx8cf9yqxr0h4xi4qv96ibh0c4j77ejgkbet9iezbmy3o8sd23g4pqf4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fb9a92f0-810c-4a1b-a619-764032c35d7f',
                tenantId: '1b47c5c3-c330-4fab-8c15-dd7b90a50116',
                tenantCode: '1njzg7o515ue9ui0hg2ydmv7jpy3qr59jmby3hkec81ht0cq3i',
                systemId: 'de00dc5a-e3ff-4abe-becd-d501d891a32d',
                systemName: 'ozcpakmv49kj613dlwl7',
                roleId: 'c3b5abdd-cc28-45f3-90c8-795363e138f6',
                roleName: '0advzoxuklsn2rs6a5asxrx2lyfjmq7j1ga54w2l6k0jzc78esuzu3aqj9gw46ejrfdai3udotog1bu7jnnjofwn2l7m0g4zflgnk8cvhsj8tbegd08r96xoa83knrzct94rcgg1zslxu41knj3jtmmzc086epnut2359xrfp2dg0hot8628t7qfwcq69icho52srcpugtmdgrjxfmb21ut3hd3z3a9hwlp8ljs8vyk0ja0vawfl8ecrus9tupl',
                name: 'tdfyrmdaoc6c3fjtg88gq44qxb4judc5rkyecedtpkrtryjdkcjlu74l2oedrwwvtjenw8plxp16emvr8lwkd0fnlramset3lmugy3a37j7b572oqogfcd5mpb9hcknpm9k1976f69susnjh73uzim27aswr3l7phiuii6ckfz5yg1exq8o2v0i0aj5i30q7pvjumlyz16xgmjekoxsmu6j0njgucpxp86jxhpugc9d5s7wus4dh3pvqx6indwbb',
                surname: 'ahcbxhe29deyxlfcfd4szwa6brirc7wk1yweux10bzn0oe35k2ih2swx9z0lvks98n5c4guz33d183wk62n1t0sljyrduxpk4kfsqeg7q7p6ki2uqmgsjjktud2lp93hjqh1gkdhyh0nrhks68lyd8s6j3bo7w8cpyo1oq2277xt8vpxmuxaehmgnyytcsgg823p6et3lo6wjhuhvs136zvbbapeokvqiq4n96hhn89h8b4ouhngfmv3fx8fgd9',
                email: 'nka46ixr2c992d32h73wqze2yw01x4uyn2tla76g6wucq7m5wk79wuow2meceehb4pdfo1u70g2tdmzgun3h3arsrywm0tntq680zzid3e5y5k4z9c7gz1li',
                mobile: '304auk9cgrzqlcf9pgy7cg0qfmvc1y05cskv301vytzs9677qzp2h5vge33m',
                area: 'pa8kijrg5dh3taejixwio8h397r9tc846kqm49agbpo8fyvdmkwt0dwr5qv7hga4r92ihefcwjt3jeirr0ezqf2ma6wrj2wdwzdngc912zq7nbslr61ptmlb6xl2gm8i55l74ifo5tn4fp49tzqqdpa4gke6mwcjgdcfevirct2z1a1kjo7aeiaak7wkosh4lsmk743l2ggqecegu7mknmd9u289gj9gfyqnd5y1yuzd2bq0vej7pa1bepe0roz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '39060c54-2b03-4214-a76d-763389ab270d',
                tenantId: '52e3aa94-f776-4d62-bc2a-1a50eec5fcd3',
                tenantCode: '1ejq8ir9srprjgz5rj9mfgt86bj6dkkzp1z1g6i0eq77n7j35t',
                systemId: 'b0722f07-da1f-4795-86cb-fdd96a4d5531',
                systemName: 'w9prj459g53uukuily9x',
                roleId: '0cce66f4-f4e9-41d9-bf31-b0d2cb0fb4e9',
                roleName: '9t78n7t64zite0uzr1wwqi2veu0iubq494c7rwy4evv226wrq8xidospz6257bwqrxiabedixamiyf08funvwz9g6r782t5cjez1lnyjs7t8x2nr5nrwfganbkr5yxj9k8zr4q3pvxkgxmjjo30xikaad7kamx99h4xiipeddqjnfa4yf55jh6qwu65tsd5iuk5638tu33anxh28xedugicvvmklk7kawk4umkkkna4zxyxfqg2ie1up7oux3e9',
                name: '01ow5fls07wnmun8wj5srxpc48j6vrlxx0om8pmlyy6ie9b9t3v42ty85t6jeptwyvhsi6mzebuefhx3lw2uw11v6ttdfb40owskbo6x2e3a2ri00eo12hidzc526b70ycun7j0ofo1ijz1hlvwoqoszy84sg059hhwcug073pkb5mg1259rr9x1hixar8ff3ovt28ckloa4lg0a8s58p0s3ltd5qtj2ee2nkf0npd9iruwh2i2254fkj2wh7j0',
                surname: 'sf42dwjap2ifgqxobnecs6zyixgab9wkpedhrc9h6656h3sqz6e049igqv5etjjc6odwrh6jmk7aayxioy2axnq957f5wjvxnjs1mzot2dif1zsog9rqa4bz7g0xzn8pr76cfqsl4dhygahn1waaphkz1xagkz04tltrobdg4scncx2fmn7ky4um5o8i09okwgqesx1mlrmyrre7owqo0bk71iwe5ps6bynwxa9zoplab925huka1pn5xok03405',
                email: 'ximdpkof01zpb0lm9a9uwh7egzhugq0emmey772gogrr3i2g1pq79upe4p2u0sfirqbhw2rnsintkkr3dpq2v1z95jxinpwemfeu8ryd9xfrggmb7d24h8aq',
                mobile: 'm8qcxa731wo48hx9vwb5pvf0se6i8fxtm2yd4qg6ogfgizb2jpfchtkzadqi',
                area: 'wplg4f39ofyansbe2lsvou49ruj01tfh2uoqqs315lenxec0fhwhv18brzwm9wc6s36ii48yv2i90hovqdsjs3fy08yy1cjgzcdij8wm79z7eul6dye3hjc2hnees56ez20s5mz8kfocv81rq5hxv1fdxz4y2eo8mgarajc6gx2cf2bicrrpqrgpyk514dvxrpmgqnjngy72w132dbz02f99q2z84wd8lslz0nnvsfczg5kyva6cmsv5wqtp49p',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ac627a59-04ba-48ca-808a-1ba515e69b9a',
                tenantId: '7cb263b3-45c0-401d-887f-fd5699393c73',
                tenantCode: '6fiahwypzjdosznik2bojd4brg0jj5tmrrir3p6pz14diat6vj',
                systemId: 'cfb7d5e3-2be8-4b3c-acbc-9ed3d1ca6809',
                systemName: '2hfs7tsaerrmt06avb1g',
                roleId: 'cfc58010-8a88-445c-9aeb-35e09a6deaf9',
                roleName: 'ow659m8zpohddbu1b1yhy79tzi4s32ee47o6ee34kis5954k4rff4gi5rw2vhi745qlsjvd6449209juji7z886jkq1a0gnqr7zxjkrr8hdobkpvnv7kp08qhsogj093jl6np14xaprryltymllhslmo3ye24dk9d9wmgjh6xlwbbrzn01c45y4y3k25yd4p5i041ys1keavuwc2ijzpc62t5dd34xsi8c435ktuxxran0yx9ewnlw7l86xpq6b',
                name: 'g14o64d7ff62fpjaoqezsge7hrzve85mm29h73nzjwidvbfyp4yeb4wg3xz8yqbubhrsyepgcp5pcztf86i6xyen9ft32kmunbvf9mji1jpsms4x2f8f4wxgxyvxxazl61rqtmp4ctjpsvnsvr7wvrw4x1nyo0gym8vvs5twjv4iah9vndki50cozn0yfgqxexh7ayk26zlecfm2cm5jkz97eyeim2f51ey7gc12gu509rwlvn6z2z1jglhlgk7',
                surname: 'i10bgvmp7m280gabo5h0odu0xfk7tr22g67igk1qbik6ro5i4w8dtzkmiv2h9kcjh3j9rtitxnmzwjl1rb2hzxy3asyyvtv4a920hea4r2zu1lm1cwrtzc39gv0o8tuw0597wxaufk2l0k91mxbrnq63i5wypoulrk5ayhbscz2owmph5f3ig0myy5eqoqmp0xfalnhxc9r7710mde1gehhlri7esaias0fugxh2d7xv3zfllugmuo46ui0ci80',
                email: '09gtd2pvg61xfh8folvg9r4kgoag88ss6fb6x3p7yyryr1cs0ekszr3vkp4i3ekwgagecab4mdpasgfnql8i0pv8bpq1d4w8p4h8uoqqo00rfrj7vb6z8ktj3',
                mobile: 'a8q85o01j99g6xnhuyl3mb6s41yyhs5scjyz61v244x4fydqjk9vfwpk8zwq',
                area: 'ltwjf398o0bi0buh65v4cx2znjbs4ibu8v4ewbc8wuadocloaa8hfbzro8t3wwkq8dakgas4q7gxw04gap9rxa48pxujiiyboee376gp73e2r80vnw73zlpqib0ufbo2ure4r1r7s345z9czrsna7sjncukiwhysbxxcf4dubhrrbqg7s6gq59fc5u24rdmh261i9lneqn3yzopllz5t4xlrxkit3qu4ccc9rf3asl9ct7jx46dw3wf5wnlkvoo',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd62856cd-b4d7-4d48-95a9-691959b755af',
                tenantId: '66929207-c5f4-4eaa-b8ea-61ad15ac6d72',
                tenantCode: 'o3ncj8oulop96alpxh4308xh4u0f5s72ix6rqqb2ttdtycncr1',
                systemId: '5286adda-49fd-4729-8a90-c4c4014a9aac',
                systemName: 'dvq531o484p4lgtdze52',
                roleId: '1a04acc9-4292-4fbe-8152-6146df718fef',
                roleName: 'fc7qxfaesxxw1a1t2i25h650litbudn1eqlbkiqe0v1rqds1tj0y3npq77ln7ldlcc8grxm4ygs22pf8thv6y3ukugvznwu65c6xfd5n588wq9igdsnxqr0p7pef0tz4qvuln42xbk4f4vyvuj5rcl0meprujz9yr6uvmuwpkp7ae9gwb7wv1tzzg3nxduj1o5s9otgoytf3gwom79g9szj005e6j6a1k9eufte7kqgbyabplavwtmuada996dz',
                name: 'es6217lgm32e4q9o1c14jp4vbbs6h94659z80rpleh6979rr1f0sjcz4sqc1y9xt78w7slppkyf925l5wmqsdaw91pbnk0kgnn3ey3hpc5rj57lj78kuyw5tza8l1f84a570rk3msz74684bf5vzkmfpxmzjxo12zzphgwjiypsig75n8bo4wlhma786tdss96r4rzdl09am9x3g0sfujjn3iiukkjppw8t9tqjtp8cag3vd4uoom47tqgu031d',
                surname: 'jgol9qn0jfyvel6pmtagxx4sdnoz9paeo4jznwfzoahk745ruo2pi5qilo23u49ze7c895rccm17rnznmtdip0qkeowazoc3l8g6oauxjg0g0ixtv4699ju38hftvs84i3b89xcop6wtg419i4qdltb7f4qvbvf3nzocg9r0sz5exf63k2p0cf5t5epniwv38cb2cgrtranawobk1mubsjkfwq8appvrjjqzb9x4i9nwkusrlv6tuylw9ij0oqt',
                email: 'mhvb5758nsjeqvqnvvspzk2mroclte7sopu1da8uckkr4wh56w6rlezcv289hh9jkawcdltkykuvz71m2iimg9uiugi9p5p4npnht9k4sloeqwq6jfivaxr7',
                mobile: 'ja5cwtzjv690p9j4um8yvmrvlvwwn4c53vcv3pqpyf2ift7r6u64rc5femoh8',
                area: '289a44ayg41m589s4lddspyxj0l4lbr7todiorcurvbpkyee4xrjovcnju7p098hww87qxqk3tuu8sny1p267684u1ytsocv5yvnau2l4wq2le33sli9j6fw9a3t8bvhb5t5k4xqq9k1w5ghu3ldwhmzoz09kd23iypy6nvybxvme4rtk0qo589beof4k20ayueggk13ubul7odsa2ki6lqw05nylv9yzmf0xuy4ummihvwn6z66984559yuwrt',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f8f1c996-ffc8-45ec-9b15-d56c158b4a70',
                tenantId: '9948c441-3adc-42f3-8405-b7be75b1413d',
                tenantCode: '48onkhb3h7839dp43lar50d4cowpceb6i2pfirqy3ojjjcgz91',
                systemId: '80c4f293-98d8-416b-aa92-db6a5bab5fc8',
                systemName: 'rg9aqe213x8c1ug9xsmf',
                roleId: 'c5630d0f-d2fc-406c-80dc-fe0283115fb5',
                roleName: 'zkblplw5ytsox8odvdv7fi7hgo30oqnz6y60mw4s8qmfn79ea53tzr4831dth5ds1x3p4idkpuq6ddym5ebk4ll48o19vra1mnh4x41imlfj1zty0ievg83tve5kmnjexazzzrlp7hiu3lktjmggxqorjf8aap6kkgd69epkc92bdy0zirbzgdfzs9eycmv0b1b3okfqj5mqunadyjlgt8410p888bijjoztvqueg6pbw94va5odu3miy41ilgb',
                name: 'wks3b62pzla1a2eikn0ttvlgb8lfy253rl2c7ixgjyqvcq2r4z0qhvdh79pmml5wzrpf6bhhsu55ukjagfyw8yzixmu7awysjl3zi2ohmhiubdn13qot6pyna1sd0fm62srq7b0emecwe0q6d1rzaoyjs0l1djhbzus0cf0dl4ll47fm7k707pfadvbc5lilmng0ivzf8t1p7fvk2tihe3wqegwkaffb5fp89aiw9pnsrv8bjbwmyt1o3rgb86z',
                surname: 'n788z59d9xp89q2wk6q71b1tusqu6i1o49b5jatlmcenx55ofiucjzz9y4h0siagxoky9v5eaa9qum3rm3a7os4zrmub4r1m3zt419xqp8cqfxtrdcpq1uh6avns03ybmezsymlnnks2nntv2ux0hndnvcofhr10auqwepkbj5d6so1fe472q7rxgww6no8nv0c9bftiuoefy5x6bt0hk5zyaufrxlytf3t9eltu8ea35auh4qmb7y18xw1aiig',
                email: '95f3nizvu9ivkyagc5nt0iwtfu8u6zvtf3e0kbfizeno33qw5yacd2glat9nrf80umnmpzvpboqx2fqicdbldem5udfyn8dsd526r5annosf7dj4n1cr4hvs',
                mobile: 'nwc6ujsuqnn6k9mq3ucnadhcrj1i739llsv49zuo0z4ljd2hf3ori62r9q0l',
                area: 'p8qv4v20y4c2p9k49gqa5oez49ejltxj8z5mqgtk7ruxue9nw3pfkmzyrmjomd0uask0cnc2p0oom5e4vcj4yghau8737iumiy77akf94ptpxskula9d10ib5m5o4k46ivi6fwijeg4y5jrf8luaw8u837ml34b4j5nurjjst4lap6ledfczfgsvfc0405md2hy3csyp0yyjb403tbfpqnp605c057ytsp0zed4tgouqcjxp3hq1kn3p73ns27kk',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '50273bf0-12f6-4d50-b709-be4f970055b0',
                tenantId: '64a42807-7b26-42e2-b82d-c16c03871200',
                tenantCode: 'kidfzaqzb9h4hn8zcks6692ff99r8n8n2xbq54k5n2kbvy6peh',
                systemId: '200f717b-9cab-4440-b5f7-dcc9333bd9da',
                systemName: 'f0nd4se5a0uji7fiizw1',
                roleId: '7af935cd-4df0-4038-8b3a-3c722fce3996',
                roleName: 'h03o0ddcoycs69cg4nysfvq4o9dso49rk6kfxth8u8o882wa7h3xm7p9at3oc4lk57c52vu2dz828um1fegfmle6xkeltb2awbglevzl9a6mdiji48dh664jcu3ykbk7acp6g9s9ozy294o9eh7tiohpnc90dc8kjj1jhsvve1ythdq6x5y5yk5hnk16bs9qs23972zixtc49mqs7wejk4tnnu10awa7xykjiolmzr000jggmy1qzcb0jlca2x1',
                name: '68twe7kxenbiatfvu7m7czhxsj0cs9eri6je63vzhaqilthv17jswapyqs3ktzegjmemsm8alwcvmy9pnlw4cp1so3s6cma6q15s6zml2gcd2cl7a0f6u2idxeb7jzky6ggnpj2geujkynk5w4t80ze5lk0yd3amtw2nixqc4o21ndgaugl97f0ci53fhbksmlpj21yha47lwere5p6shggq832na1xk981e0nh08olqii21ffkw8yxranfzs2h',
                surname: 'e3qsq6s2t318jkj2garz61sx6v8x68ecrmz1weqg5oxp1eey1o361taudn4pigwc19umxs17lb292plt7kj8zbz964bq9sj39wng2253z5hy4kqczt8mlrjfqpx2xhj0dttfs487bloxvrogi4flg91ujlgtducsv2k2jzm0bmi6bqoqottt9cl34b5kmu6n6rbyi7rkb08xlmffdvcgh0gdh3268d18s562lyvgd7g7lb9i1wazz0ll1ieha83',
                email: 'z3trf65vjslzhqad07n4rzdyyfpcstcp4rmckllszh7dux0s4382csadilq3etv6kykkgfoln0e7golhxr5zet4tk8kc8k8cl5aehamajlu9e2a1xjyves1v',
                mobile: 'vbahbxckjm14fq7gn0tongp18nj4g5fxzsv00bo3drlv9vzphgepkjf39wkz',
                area: '9ccul1iqbemh56o7loxmu5cjrs7bum8ro18iwkwxrwzfj5u0v3rm9ugt8v4axoaqc5xnk13jk46hztj8wbxsywtemmri5clvkbg7d2t4tddnmkj157a7nuoi5t0tftlp9no7475pz2n4ez96ho9x5l3cjfzvrytm0u6xkerclewq6598pd2n1cul0udcenj2260wham4apdwh1ejtj34rqsmbmidw4vmruuzbp5yyb2l3kyezcv0rks8btb9r42',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '41ee2adb-f8c3-4e56-a933-0751ab6e4c20',
                tenantId: '07e894e4-c52c-4545-a5cc-a3c71099f265',
                tenantCode: '8ohqko97nqca5c0u1hu9tvw6ko1rrqrrpso2f0v7yh7vyr0b8s',
                systemId: 'd20027f5-8607-42bc-9d2b-46db91cfd59d',
                systemName: 'ctak0ay9si1vrxnsl5w8',
                roleId: '655bba2b-62ec-4373-935c-c19d5dce8278',
                roleName: '85lklimkay5wm2m8p8jqkn0vlbppy9o9krso24gd3t490vvjnl10fe993pktpx2ppzi389z16m0kqn8utunecg38f1p36gvzsk1zng67jigz1vz8sxyd0euwossnguegil6keeu3jgxvd2rvw9ft2ttgzq4xgt9y6hk67xquclwj6gtiw9a8ynsloh089udnf7w2c2l9co8ycy0ju3lv60csoc12cr1ywmv3fmq1bla1rm9jf5pu8jc1pbizhul',
                name: '73nugva75nez589xrfpxq8542x3dlr0vrn22kvokh80jz1zs4245x0d42bb8yjn0ry2bhu5x75i8yhwke8447xenb160yyao0hk88ya3d3mt15jlgt68mgohuc0qn17cfgw6rht48sx0f5fz0k12xobqccdt38t65hhgwpa7bjlzovugwdnymixuf78f1tojal830wnat8o74x51wxghsqax40m2gxglrx3m00es782bggxqv31mr28n5xgo6x3',
                surname: 'gpqlhniakd0110buxnnteqfl2dk31mggk9qdo89byqotna5ycbhmzg2owkkhmgtsvs6wpdzhkrsdkgby72bawt4mcxch47evkg8s4l13fekqjbgit64mpnkb72f80pc53vv4y1fqo1ypklm01sqgt0l0vty03tntgyovgr5a8kmkucdlqugp5rnaqc5vu5ceq70h8hfkbmlwjw9kxeg0ikqpr5fnx02n7k8ezrdx23ssaala9kd0gkbjr66at2s',
                email: 'd6kcaarv77awkk2oa53whybcx8jh8nvzp001fnp5tt5mial473ggifto0z5vgh54c8jfys2b0db43e99xg9m2eakq0s0sd17w6u1a5w25zmtl8iwt2qgpk8a',
                mobile: 'ufud1vubrtf9lb1gdv0golwwy6iq8dit7m32r6hjmny4t0slcuu2bj47y5al',
                area: 'mbvxiyver8wbqemmlunhgl6bvtwr81y81h8a3lm3ih18avhl0zbdkgc9v3ht25hurxljxgfeoi3hkm2fz8fxd1zp7ts5itp4rdnn6gtg95kyg9oru1gruzn2vgqbmeoa9kunipb72nkhhtgtj7q85p1pq7g19oe84tfm1h92402w5pl3a530mdwtry3ytof3iw24wiykv1bi4pt9k8xvsfiwepnsanssvpwpv1w4qp7ukoyomoxbbtbgdpop552',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '08008761-0345-41bd-8da9-08e494a6a683',
                tenantId: '36749e5c-574d-4673-a3e4-ab06f2848245',
                tenantCode: 'z61crpoaawcckg76foj64ot31jiu78jzvzbjktoop25cn6lhfp',
                systemId: 'b9e2d8e2-f073-44bf-9295-f97b69ba7d05',
                systemName: 'chcwilkx8cado59upnh3',
                roleId: '2f5d1278-c7b5-419a-be0d-a4f344d2ab41',
                roleName: 'lkwiszxrvss2k206re4t8ww4079p1qykh9nij52oc9rsbqmcijjwrpywnet92z044dsn0k8hlol76apmb522kov79itq0lpkm92mdqu9786dy6eeromipwwe0sgurf8t0k8zl1amid3f3ijwjlvkbse05tpmwat07j1v558wq4lw44ocxpzkxnbtti9ecc7avoh6gmt69rb8aegfbsl76rtjtkdab8eozbmhbtxi8o5wqyf9o97bk1vud4qq36k',
                name: 'pq0gsu4spoydlq7j6gwodu5figmwkn1yciss2r2putyvqs0i7p2uqm8rc0yjdh0h90k7f8kwghjt89lvh38nfsbbou69e8il7pf0bjljcs3ibplai0li4x5jaclqpq5ehcgh1m7m5qtukdqrm9ciitwntrm9m7dv77xnaq11o3zy9lkj5w3tkp8a41cdjabiior0a8pjt2nhx4x3rcm09f5krvjqhayj8cdw1xeah5lmv4rrqad4h7zs6oizxnq',
                surname: 'e0vr1zi5mgtyhseud9ygkzcb1ofbgbitpqycsgkqf1c4n7sswga2q8zl2glmt9vrcz1usue86spexdg4v563d482ed9m5kjy3fjj6etdj2sx2a56kxolmt4dh7xl2miur188jhy1o0h6rn0yj1do19epw99wfn0uo4gkf7ztu57iysmphht7r4bkpfdh1fov58as46p9yty28abn79wsjx1cnha19fyvzg3yfjkgr57lg1c3v7ri45uiuwg7y71',
                email: 'qlvr3kvirwv7jbpxif8uu2q5zblt39y42baaad72jaybfm3twve4992fmgn0drrweo0wrjny76qhb7lnlljwerfcvqs32lrkb69hz646md1mly340mdbgoav',
                mobile: 'mqe3js5alpn2uuu2l864xegrwb3xgvft9vjq5a5jaam9q215wgf128vfoldz',
                area: 'qk7h7lzmik0qujsxt6w1hbg1s2mrotlvg4amug3ez23mlsrdhq91yb17hoz7jwe0cej4iqq44rv7p8el9658j9bu72pyw4c5954iz5i7jm7a1oyn12s4dy70g3718x0y92l0bhj0nwjsdb3hq0r86xz16jal1oxjmfy1gqru6u3vgpjffuwccq32fubgfzgkb0gt88kaix1l0tij0g4rzdn2j51d6tgd0unjd9ifzdv4pmgrs8rbqlo1pp32ogg',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });

    test(`/REST:POST cci/contact - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/contacts/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contacts/paginate')
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

    test(`/REST:GET cci/contacts`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contacts')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/contact - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '94bcce63-002c-4f42-9023-55a42639f50e'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/contact`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                roleId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                roleName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                area: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET cci/contact`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
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

    test(`/REST:GET cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contact/3c2badfe-8ccb-4461-9130-a85271d50c15')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/contact/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/contact - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                roleId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                roleName: '0waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xs',
                name: 'ql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rk',
                surname: 'dhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegm',
                email: 'olj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyo',
                mobile: 'bcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5',
                area: 'l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/contact`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                roleId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                roleName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                area: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/8845c20e-2482-45b6-8ddc-ced7849771b7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateContact - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL cciPaginateContacts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateContacts.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetContacts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetContacts (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetContacts.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateContact`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        roleId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        roleName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                        mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        area: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateContact).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindContact - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            id: 'def9b000-5a89-407f-9bdb-6f701fed0228'
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

    test(`/GraphQL cciFindContact`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                expect(res.body.data.cciFindContact.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindContactById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07606f70-a893-4007-ab6b-056bc2cb231c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindContactById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                expect(res.body.data.cciFindContactById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateContact - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        roleId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                        roleName: '0waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xs',
                        name: 'ql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rk',
                        surname: 'dhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegm',
                        email: 'olj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyo',
                        mobile: 'bcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5',
                        area: 'l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
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

    test(`/GraphQL cciUpdateContact`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        roleId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        roleName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                        mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        area: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateContact.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteContactById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '305efa0f-c70e-4fcc-ad6a-19cb88b65e42'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteContactById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                expect(res.body.data.cciDeleteContactById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});