import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '0pwirf8kktu74f8hfwiq99fcd2i3digtl5em7lp8kblfiodh0u',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'ubr1jvk1epnp0btu5q5y',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '5nrjmwg0b0n28j689tonfr0x2srydompbeemux9129l9s4l94jxjt8aswtxial03apcbdxbpzx7d7x0cepdo60fp8csghfbs3mvea1t230suu55i3vzuyar1ynppfk4hkpdjtn3y2zibwkqzfps2g862dfwdxvxwmqfaceteiosnghe6tvllolxra2x37yv32ev1ucmgnxb41euucvu5itb6hqjzsmkstd18x7xr1ay7shtuhni3apkar22m9ez',
                name: '9o9q32ugq3zx2a806pbc0quv42gg5ra6c5dhsjd81jzuqlbcindk5z4ei35cx6zar50t0xkcvwdis6mb67ap6ztbujnoej3xfqwiughv1ddz1js3khjkro6411rdt1fknqppf7wujrp8atvvmfq49otdu8osuf5v804efcvs4tnnkbf6p0j9vlfqnsphr742v5in9v5ofg0t4ue3zcmnzh8jykq5r4nk78fv7aqq6xhxu4txz5ddlnv2watlje8',
                surname: 'aepwchtfmu9cte46ru1i45kx9oqspg0lheu9zp99j548dr3hqzuhvxf65enc6h6k1hcv7w7sgnkhtm6t3zn8j82jfaco49z73qzkg97xrad4ta4rz1plcwhta7bst4c3tllmkha3kdw468rfzajo34gh0m9zvfaxdhwogqgjrgo1kfxew53v4ch0x8a84e7cnd9m81qtb1k5xeff5k9sjgphhlee60vy4xm87fym3v6rj0vfxsun0oyjytq563z',
                email: 'yhohe8ocdye1p3z0yi28k2aariwcmztluqf7gtinhzz3qx1nmpr2q425yavd5tnx8ueivbfi8sz4afaahpmsd3g6b5m9ta2dxjl46bsf52cy0uh6b3l2d05y',
                mobile: 'as6iz4e1jknm4fnwgsiu8y13jpe93koulyl7febslhiwe0dmwvbkw7cnu5rj',
                area: 'doewxhnekot3xzer3ax58ew1g5sxlc7c0i9a1hfxpe7i255kwincx4ovbnoekftyjwamezaarni0lq2huv86p9c8lhyphpgd8uttlu2xgia1u13859a3kj0aeabxdfof7d4g08edqfmian7dhaeu5nrgn2vlt88lkzr41hjppw8rr1xxpc0qnwmpdls5q2nzrgxhmtyky4x827sl5w44cfvawuf1sgh3zu4jxbd2wawuqrzhpc7eh5hkzgqn312',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '6f717ijep32vhzl46ketage2dl41tjc2crv1mv6cum1xi505p7',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '9u485jpjupuhjx17fn7h',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'p0vqul4zm1cpje8pb2636yegydzogtd53e9am2olpppuqw6yahbusyi9oxwwx4liavuw3frdf8gmbzkdwqtech0ngpzmtssud1el8megsq2oun3eoti51v6vmuna8000mfo4xwfg7btz50met68efa2e6cee47oi4xqy4ql3n9tn7jpnvfy5mw0kddhmlfjeoch216sbk7n2rlhocjhk5opiu0hnu2smbxh7x4fu1eitfxh6v876f34r5na6hul',
                name: '2a9wdcpuztptx46l5hq86zb490kilg3yicoyha4d1oq3yntxhcvjtytuiaq5g7aa5fc7dnphs2xo6r5im4abehoaxz8tw12pxdtkgmk0bcgelyo0lgnkdhsndyo40cu8l1qp16vrj2vpaciuhta09z66hxiof981bonjzzshmk4rjvfmrvvwpzx6nrt1tynzb3fihp5y37qtlyr4pkkxm4uw6mclbt7y7m0moou441l3yx87g4shj7fjgvo6c2b',
                surname: 'nbp8c7s5a502y3oyq146s5eg3v7itsmskmqms2xbkrnr4ksvlyengq7tcinnbejafv8o0kuvwdo0caw36pbur6no7awnx0pdptj6isopj2vu9rtlp0iv4ab2d1u3oa2fnvbc2zyp7xxav767psyr89ydtr7o353yyf1rincld65l5ggqn1xk0oqj5xxfyyehll37kqvyixtvauab9q9t6v0cbks4zn5yms4rkjhifacehixwjrx7s5rb46627qf',
                email: 'cp24lpyfws8be5hx0xyb0g4u0omjefrs7aips6eurhurmx6f04xl02cfk2q8xiuy48pewhh0g06g7udhsg4gjcgy9750l3iuwotjzo5rc6szeghdbwauve65',
                mobile: 'anqcn9jjpqbusas9p1i7lkb1b50ic98t2q64ij5unsnsh2m5j1fks5eur8zq',
                area: 'zf1254wgsoqs4di774gu2xot34ntlmfoy79mvfjprhxd9oyyz349kpran96r8w6l5u1pszzzlu1t2oe1alt2ukop9d6nd1qnrhwih5zw5h7utfd26qxov52tdzochu2k8qj016ndm6fxn15ropeaowc55cj7ks9zoqriw41146epc1tr5ac1dq3li9bbhhemhgck0w9s3h2z44xn2c7jzrrsjq6vw12dzfun1tjhn9zfn05ihmvci6kbh21zbwm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: null,
                tenantCode: 'wniruk2w8lziyic0xwfdektqycatcmvfut3mebgl7fo78tkbfv',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'ar7ficzg8ni07mx815uu',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'qbk3lbpkuc3063mbmd9tqsp40mxl7u1hv6u6re2s4emajvlv99jhomcz3ug9yhsgdxnavo6rh5jbcdqjdydf9wmcs8re6hyz53lovaw2de125jxpnykr29z8vbv7fth1fcid1iuzu7f4nm7so2ssgsv35kb9cct88hdj33hemqxcnqlmgdccoz366qh98pxjy6i8mw5z5tzxigyvk5q6yd5qsdo453skurti4ja8pviwfgihjjg9m10ul6yfxa9',
                name: 'r4jg1mxo9hcy118ld1ab0cxw35iu6xhrnicyc6bavtvtgispy5c7c0kl1vo22osglm8gkuk5q1zeasj7y912mwq9jlfotav5e17cg61ffr9i5iirrc2jfcwz3zvfl3g9tl0db4e0yv7rw1wjv0fbmsc5j9cpcwc11uw4qv9vt0138l3666crnuz0sj37weypze3sot4vl1yjc9do3sa5whk302yxyjrw8b37aszh79r3dokhem3bwzkhikc649q',
                surname: '835ztfddlmx0b7cgpstdqdcifh9xv5d4yieeqedy36gqh79op76k0z85s0q10br4jkx8mm68jceb1zg9tshmmlnz48sz8ajooj8g2kemfh16051995mdtdayxuq34yg8xnk66mcai6mi0hmuxfn5iekfbva4e0jlk6804sxv7vw7onhtsv16905xr7ue831eqau048ehcuqbbt1m9zubn85j0d9m2npvb4kpymik8i9cza9dtow24glhs6b9sb9',
                email: 'rxu9oczo6xkino6aoyehijdt8xos3toeb0khqutpjzudh5pmad94yp6o1iu0v3afamt6qlcv9qs8yjz7u5pmt2qve6o375opss2rp20vxl38r5zxx8y75f01',
                mobile: 'exu2cooefg5xzo20csc51oeqr0t91qf1ydxi3mdoe2ysf3lzcewa8r024bvh',
                area: 'n61my69kzz8gmrlcbqqy0juk3b7unepxh1llig9mz0nx5y5mux291rh1sygzd3lb2os3fqqfdtip40mvlszi4gszpasp9kg18bv54zs7hovbxcqoeju5rovmd94dukn8qcgf0ns5dgnbwtoinyviwbbepgnfaatfppordnrthkcswxzsz06bsgqw9gwt30hn78qlu5gea57kt2d4fn1wleth6nf6pzhx0atzqvtt6821w2n19l1nmyal4vhfv0u',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                
                tenantCode: 'q8qjwwywzifuj1zzgch4j6hkcvrw0kshyzu5g5tc2ww37fu9uf',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'f0i5brf3qg5mgpjjtvxb',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'ubdoncyvq7txph7mhhcgtnqg3gc39q03gtxfd3kju4ygp5vgwpk8r5y5sl37o4d45d3brsp5z8byj07zchegk9h7v5x205y8aly04k3vounxkehix2avn713bk08c4otn6j9v32axldhccc5zuh9k50o70pkf0fwahe1z3hb3kzd0ssommjp6vgjuu2mv6dtmogtm43xxc2vsdj1m8jqa9778lzikl7i8kv9d3ih1cnxer8mdhqlu58d6u0htny',
                name: 'oyzw2gwre7ezrfqzravmgm427cueyefgjzwzmgvznispdpcnic7vs4c80ofkwzr0723lfe707aqiks0uxtj7uz0a829g0nz76gtfyjkrov3f6vz4g9r1sxdnznvafzigeo5upx1mtny7p8eyk30s0qfqwsujo8nym01vpymcshdals3di48ey7wbipexxk4ho2hd8ynhydp4o171cv3ea6rvm2fgopbcks4uxhks4rxb0lbju8omgww28cz5lfh',
                surname: 'ncjonphl7mpu8x3s46kl0lylupheogvy7umg8b4appfbvjx2nu65fx8x48n652krhjtlarr03ys3p3trv38a5q9gcghp4mhs1vkp1pol6wlqnov2ycp1ufixfmzndm9q5hgmtem6adgeyayzubgpdiym08bpqq8rcvu3as4vc7t4o5547sd4k8ihwdebttaloluacbbboi7i2sxn6u2tq9kx0ogy83c6d8nghtwceirabavoqpja2ibhla3acak',
                email: 'smmsotlmhfekjuupc8t0fwz3kmx91381v8bqo9t5aihgze68mepa4dnz8d1tm96sxvctdbcclcinyk4jo7kqlmj65sra74ves3kgblskhht1jh6rc0ha2bfc',
                mobile: 'smy1k8vr3v1iwogivu0q08a3ehq26pptu0jw2no9ldfc18z10v6007pacehp',
                area: 'cj1v3d88zx20cs0nk0k268ou7c0l4vszr94tbg156dpxwujxztx3oybtzfgut0xr6d99zmlm21qo4u9mtpwfi4j7kepks02ycjku8057mrmmuqxduby8n0pqvultb7ecccajswze54kzvxyn3bc1pfhxv8o2r79lbfwzrpi2575dv7hl0wckg7rxx45or8j5mvuiup63ja2fkyonsu65i7z9r6x3sivu8wj0vlg1420v5ejs9o2o2bz5gjif5k6',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: null,
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'wn4ks2tao903dsfr4u3r',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '4dnogeeoeui2c22r9ie6b2f0tyf85lbcepd2xcxptxxovet2194v4h54dqke49luio1p6gwcd19zo026wryu9rir16pih1eodmvyorrh2cy2t4iqesp30nm1126yih4v3aioftdkd83ps0ew26tq5ge48cvhqwc34cayj7g6d0n7lc1hupxyq327mgcslgguqj938e2zo0lmknpdeo43hgpsu6n72kxw28jhbvgxa15f6bwabp9xnuzd8k6m5g7',
                name: '9ki7a3kn9zikt7k6qyo8nt09eexf1xao1xob27b0vala8kkblei24zkzljv8xro2eyukl6ka84awj0nxs5wklo2bmrs4s7bnyvcrjb00xfwrvi8qmrs8n55l0elnyx4ptr6nlxsn58dly1dhj1dk43f4kfhft1kd2po1f6n6anskqiqxu4jtfs2b86srlylqeju8v4b0qw6ulzbc4xnp4122einba05sso31fhc2xwdhhqu0fuf6mj95flm71q7',
                surname: 'klfldk8u9wtzaqjnsiwaj2crq064lq22kunakgfdvzl4j786qv14bu56mwsx1jsnn6qqc5l8rhryfiw5zrs7bxaykiei5traa1jlfr1lnr1osbspwbac4kmuf34o8z4cxg8vhhlz9k3c533wfjktqjl4sbkpfoprfvzebczf63omi4oavt5cnsqwqema9u0wx1a76m07ki4qewdhedre18pwx4d4k0tm63g4posqmmzekqrrtooboh9t6pqlbts',
                email: 'n7edujjpz35ncl92rq0evg4zk710eai123rvhizwmr9kbnc0uvzw3rwfk9rzbjlvt3kcuynh2cffc7qa44cngjpv5tdk6ige0lcgjfczul7khv1r3hhpdtsq',
                mobile: 'td1of1kbw4tn7n5p1ehmpm647z0yeyf6qaaeiz0ftdcb4r6gg3v9pzxl935f',
                area: 'zwv0r6intb8v4ql63l36o4qjq51y7kzroj2lrogp8473imtyb9murotnt8z2jxstog1jtegu9vc3j30jn1zq39ot9jdg0fpw7vw4wpnxel91a4uj3y1cacjrlicxvutbb5cb1zeh4xek00fwi4ob7gx16ux9esiffpjq7zr4kka4unblrmy5cgayz9g31t2rqnpxjqfldjk1yipfgljcgc5r8yu2qzctbe8k5s4ct7t8jhatnh0mb3ssr959yxv',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'p6e81unsz52nzuk218dr',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'k7r21hr1k4thygtf0e8dkwyw05u9wajv8e0qasks44ajyho6rsmgjsvrp8csm1gp6lmu85hvryjm2g1ro511ful548zez5bjlwwzxy38vxxtfrlypv8efilahs7j9qt1skmsm9s3hee7ml6b069icihq4w54h47k83cc0wrsv4c3yrabvw6dtj4s9fjd4jf02ipjsnx8quj0iqa937n76obt6ipl1wvkk0ouju2joi24dnl719e0p5wje28gruv',
                name: 'mybjl74qje1wqy9njp4xel04p3tv7ppzlvmi8nq4zaok564lgrjbymhwvj3wvoxnpt77shkfdi2l49cl1ay1l5ajm8z74m3czl0op2ektpfe6nazj7wg5xguq3x392kguy618adqpmxvtz8e74v1m6zfz5svb2ciaq9b7gxt29f5qubt6e0mb4hubqlxho7yw8qp9a6qj61bjrd1py7hvp7865azraxjq6bxtilef78u2o8mpnmwkb1ssmpt1r7',
                surname: 'niommgfbvdo8xff2utoppwzerjnof9dw6mgyuplnj86f5jaayfiamepo5j31xoe8hmb7tie8c97ien3qf4o666smvldc0oj45cfljacrtn95guy1j41nxvtaq4g4ly3w4v4u2frnrjc2ul5y1w68rapiy2j2v6k8uuslab6vlpo7yoa3nh8xkvq6xjv4rc8z8lju8oppan2a6atqbkep4drtp3x0rvr0xsit5szt56859blkhfky8r8qouvol6z',
                email: 'lvmr92egusf95tibtbk0u8yelmk9n5mjf1rgtysqqgzjmy37oh1aka39gxw94c2f9r0j8ccmyvwyb0241zn017psoy6uy6uu9f55ly3c886hgzgo8sbobi7a',
                mobile: 'f0ra58jx3do3elm7w1d8lkimgcqbtijenq0dui0zkcmzlm9a7ob5no2fvoe7',
                area: '459dg7cm8dsjkarm087uldhuz1b1zavu8s8urasl4hfnbijnqecp2hjluija0dpvs9xdbv74fny1ahaw8cwxpj4eop1n8rfbg50u42l30pyifv83p8ph4bk89w4logspe8wf4wz30dm0yutgh6aa8dtif3oln6fbhhyx4bwzs8zmztx0u8k4lwb76gjml1cn7myn7wb5cyk05td31hohu2serjuvc8ox6ydjamqpq74mi6din6gj3tx66ytibpj',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'hh53bz9c8pv8e0nsvqps1hpm722tgbez1e5xf7z4w0ejk9b3ia',
                systemId: null,
                systemName: '02ewsajvs8ftbn5o0j2e',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'wnp5x19xa4mr6ffkzz5ko27fr5n6zv7q1h2z96x0bqluj6c6e23b7e0ymeg76ot7y91vnlyelqk4brmt99j3ij7ehvsyjn4i4w4q1pfk3sc4rvcu05mjfasfmqmo1c5s7ba4c1132xnhmarzvmpxwhudlspr8pkir8981trnqee5jake5zn3lo81rgmyo1gc6232rdikdnt901oa8vhu3pem0hi7wpyrh9dyjfewid38n4hqb6noihgjozep0vl',
                name: 'xo4z4s0vgv3say2h0gs1cfk1t58r6wwxdrlqi1ia1e99wr9zgzbgfeyt8wxrzk42k9opykdwg782oqg693z157966zbyyp8y0l0s5v8u2hi7trxexugj1xn40s87hmsl3a6vt1s55rzjmhiyihmalpadwt7aslxvl81ctx11q13rgc1vdwg0lq6sfcp652l3fb74g6e61u2wcj4iyi6eee2ccb26ah6rmvbe4ui8mig6th5gmfz70rtc13aaxeb',
                surname: 'tkny9x2iekwa63bf2e745uzqhrafczozfsjxqooqkveoupw4bhnyxzd0gzvfo71rtnpb1yvwi2jfnaensnku8rowom6oxdz35z1ii0jcx33mw8p33oloq2emt2r1dicfxbd1w0ph2rjgy1n95qhwdtzid9q80plcccpshxu5g9onddpgm39gdel63nfr1dnsuwobbokjk8u0xmw0lecfsz5l4vqtajxe9kz5yxnx1nmfgm6vtom4ebil6s5salv',
                email: '7pad5uaxj2ypuvswiw6w6ygrzsw15if17zib2tkqhb7ox3izjv2vl6ugcu5w3si0q1xey57tmhv16ogllqfw4x3ve4dz71icfcq14mc2guhff29put7akded',
                mobile: 's6p6two23s5oj8ma2l11uxahvnbguy8x306bpsbtilijlqskmaa5ugvre36r',
                area: '19inldn20yasexnnd475g48hzlpvqtgjqmbqwphelbebu9duvn3pnhxvth3yk9qdos467yiy3ffxobo301gt9f8kdxn7crcu711jftvqjs0ooj6egpiwb1x3rios1lmwa9qr2t2scm3oednc62f2pkb3fxkxptzgk05dshai6iotc6ne9wphd1qcxmy9lomhy4vg49c74x4z62644ujcbbpz35ciqbdpuotlekimivz7s3gkc6zugzrtf2jd9g1',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'kl3ctb1dhlq4ov1aet6i7dn1tpl1cckdmicsq4uc6o76wlfdmq',
                
                systemName: '6g9pmrqffq9bdzwgst1c',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'retxuk8k72vvb3m0mxdtgcg8obygaulqwyssor0i3g9rk5lnogeax8cgc9ywkzxy16uihs71xx8yqe3m6et5x67ksgvkbwqnyynyr20ft4b3m7ax1ecyx3e5k0h295pflvogy4ez0iij9cw12pnqr6aa3l50cwqru9q9z7lt0v50zar7o4ah3n1q0sa0ozicisdv0thvz6yg32rnwqapp41gtsuhu8im12xme2t7ndeaxtqzj9kmodvfrogzj03',
                name: 'uld6fudfgn1nltfthb48a4hdpghsb2t3e9tt19jds9q9w0y0tldxzh21pf8p6grnnrgrl987a9dm8q37k34n67zbb4i0j8znlpe9g2k2wvzoh92eh9pij7s36egvuitulos51evxrd2qdcrar0gyjllidkitfpwi2ocznpsfqja3xliqip9kvuy7lfo7eng1f164g1bup4dvkblf7negphntb6s08qbapq0s2f6419jtxhwdpvo3ny4vdavjjzv',
                surname: 'okrqmmywchgsxh6ka751fc44kp62wwhiux5hld8f3dtjbguziqkhbng0uacgmobrze8nzzn2tg4biw638ebrjzhuvcftfcwml7myiklfbbosu26js7wat3es5tcabq9hexjz0l7d1hhjbcp9ju8d784gbrybjt68rtxwid8unjset5nzaamo2097wg9zpfxxm6tnxqsqywckvuug98yf6kxuka52ewim2yai6akc88dc0sbflhjgt8olyfqf483',
                email: 'zcwgczk16vbdmefb5qioyc10wvz2tj7um4x9dg0z8sj68glaoya8kt8sp7gamafm7g2s3fv2lu5eh21xmnnbv2fatw4y6kwcsa85mkbinua793sb5085u3ux',
                mobile: 'ine3tx7z0ttcf3x390shm4d4hy67i6mrs2k1cbqw0ut8zj4w2432d8znwjx4',
                area: 'tmeqfied0quw7m3x9fmirjlj4nfks735dhqkkvwxmk98s96p2s3h7oysglms1ls9k84tlcbmscm49iapzsfkpia6k8aeef6tyfm2mhs8fuvwbu1epo5mt9lkw5vbmjr1nzsfjvro9fx0g1hcspwmj8vzqi495lx21q4dy8s416ruvif3majzvtxq6jgzdhdm47laqviwdxq2m3qa1wc6zaf1syrt9gm3m34lhga2tiv64shncms0whzkb5a3qcj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'imody1py8l9othvhc8tdt43ptteb40uzvy1z8cszxxhdh9ro51',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: null,
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'bylamdqow2g3fgu0mprk9d1hqzztf2vuvdci2qf2rbm0vigfljbfbgsn5qw444vv02tntiz97dfjldyoos27tyvs0ilik2waw6fyf37zd4c2dflakgmtmuykiz3mhshfqti9bteox9wgl6xyz14tor45ng5xixbfuy8rxkkoi4xb5amjk8ads8y8iwblh0zijeenp7ldlb6ojzy49xbm9hm7aeqafokfds0odypukzedfobrb4q00lm1yndabwq',
                name: '4v3zthdue9ikarzg6fivyp7pnn4iepmo6pnhdf5mnegta3nraclj15h5fo4ffqslhmu35irc6pvta8hfgqfaplfvicjcg7ety7y08wo443w4wqmzaahaqbhl41md4ujgiiojkdzzjgyaw20mcwoe3u0gymr0xetyegcdr6a22sj9w1u42gnqg9od8k86qod8xx9drj4ab7yu3n2n1m886hqvdgppoio1onx3i1w4oz3km0xp2pf4j7di82h1iy7',
                surname: '5g7wx22kmyxavb39s5iszdwof3yr31yj77yturyfnmzzdxb3i0fue690du3rvnq944tur51gs617ct99dgw1zz525uptnon5oizup4m2lgfyeldnug4pvaqrwrl52zxuuothjr2f4583gy7rpq8gaqfrvfpekzuhm9f22jfuwhdiz58fbckcsw09zjvywkz259gkdpucz5p0gnzt5e9mbcj7eqe57zgyeb3139d9m4gt6dlkjdbiy7ulewf4xix',
                email: 'j17aqn9i28lbb74v29c691xpx5oegjixvg4462fiqu0vxeacsr8ilm7ii10pq6nhlske4ewjlmg1ecppuw4ewtdmpwa0bczfkzu8n7aj5ehc7l3p9wdw6wpw',
                mobile: 'kbjscegjcnt4ystlhq1bce7pkijlydarcs9fut82gtywfzf62siiq6sl1r7x',
                area: '87amydf9rft41bnngrs689ataenfvv0a0bwif16mh1ngd14msqdzpg772txw4m1sy7g2veu2sac1dhbyg8aoz5k9r5uywoamiu0esa7ifjrw7fh5mdetk6964n7zroptds18zrdewb5z8l1fclbng8ei4wm10oecuu4p274eosenbevhuwmor4exr8jag78gybuoq0034ea4low7wqtxypebj39nmjkqv8zb8w38cx65b1ipbbc5pjgevsgd6uy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '27b0rw5udnxxnramgztft00jirhaiw8pj30vxi80jbnu0clz1w',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'jyu5opmtpy8k9mle0yan1bw0eoksk1q82car34e7zmxdmufa21evvbelgr115jbqbvu248lb7016jiry9oax7pjr82armlxpncfaschjyq9727wp9fdpf1nru1ctiitkceo76utdkdgtitzhx361cw8977h0w0ylb7fourxv7rtrv6do6lr61b1a0d6a3ahia93qhtsq7ottagulnzzzn1gh42ge3bmys5eb3ci9521nv537q1ec6wrurx9tgq9',
                name: 'vpavhvkiph68vemtz8ij2rggjqll41l3023yskyxeinkkmblyxcix5p7j2cpji3g48h53ntjlfxkdbofavbnf24umqqpatvkrmlmewrpbumvihkr42lodzzt399dsvrpu2zqmiv1dqm9kqi3ypqj5nvz8umb624hqi33oywf964skjipda50kco182qglbdy3myq73ymuebw2cmxf3ev5vnlauykt2ickiew2c1t8rdvpvn5d6a4rhh911uy2rf',
                surname: 'v1gq6f8xdwa4bhxyleiyf41zijmber3ewxfb8cmbxixmfrwnduvpkal3eqrau5agxw80cuz6yodgpukvzmh3qonc2j7w1r3anqns03xkd45cvbycdj1vqo6kgyow8bx9qiytqoaddi5h57zb7px4ld2sdtwt3zvx2h7blq79trcuw24mc2ln3qh4qb7cl291wbs8zzj3tfpmwgecnbap0wpudbfu1tj4mntp9caoslfsoxjnpnpt02coeeqjb8x',
                email: 'oy8tcnjigi4o7rakmroh8thg931j6js27qyfeci3duqynyqgnb0ysabiet31i3foz494dfj42hh1fjzs0sri638sqrod95wcq5mij5xb63n9twxmbyuq6r3j',
                mobile: 'dfn68p43kf2xqssbj3eefvo38s7kbtrcqwdvtz46w3dzf41a38o03xwzm6na',
                area: 'gexh6dph0udbi3qffljjabcgpgkrqpwsrp0ujqlnqsqupfboth8lqa47cq55zbwun2z55tokdb7d28lxtf7wervt0uxl8k4mm018fgay4huex096pb76ubaa1mom687dgj9qfw6sce8y48x0nhlmm8d1j6lzizcnv6480qk1jvsift4wwqb5gwgoy1dd254tm84jqf1kpc1h9diawb049333n0j3kzkvt3emw2rfj6151cs8b4kszp3970p8p0e',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 's8atey40cmh0lqopf3705wadj9e8g38gwfde3rl0yf8zu6bon0',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'ehrg5lexny665d408ktk',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'dvcrv7gnzvdpj8jxidu14030fd8rk7bn4eigu3s3ssmo56r4qg9ft7zpc3z4yno0hxqw3zr4gvq9mziv2fwubmg2m65631osyg1vb5ac1a98ydjrh0kymj086fk21fyznpn5tyfjo472t6uvb1z06uebrljawnwv2od3hvi7dclgesalf5h20o7bb689ninf1xd3010q4a4fnxh907tzpkomeofr77u4vm8edm46c47j4fxkin8ztp7ysgmk1ut',
                name: null,
                surname: 'y2vm96elz762qauzefonb93ug3a2ab6aqr9dqs57q4na2d94tlz26f1ejz9k6ui17px3ypv9sk16iotwmsxfrinoeamarjnrxow41k23n5xw9ldgyqvqftoffcd5yf4sx4ow888mrfvflnhz4jmatz95ldad80c4i6zy22svasow11cbpjxor9eujmu109v47k0fauw385oi2kc3d90gt6lficiznou38f88u7mya1ts5anujbr4at5rvsi4jq7',
                email: 'gkhkyoiwwlumfdkt82s7q32lzi50nu7geamqzzn5ijskicyo8lsecb8slxki4hkdiwxh47bb559hj5cmj93yg4o0blryhw6auyuwbpz3blq4s94egpuxq6iz',
                mobile: 'ge0trro18scm96vb0zjzl36i0f7jgxte8tpozudw3xdhdb6yvia8nztmvmkg',
                area: 'asrmy02r1t1tg5yptri10arqmkpjp3ff31ndgodvyjerw4cg4s91w8w8lka2fptf7dm6n1fub2tuytbdy50k2jhpd55jbqxj3ua4cvzxc15t4u7vcnfh94jrgutkenai20yjjhefrhf9x8tun25vp5jw5427atj8fh4hm333sf889eub8f5qxbzrfcpowytzxlepaixgiaynswggr0osowqi9vyl63u7jcs2105icb2a9whjpiajgwrdksgm65j',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'wzpnr4gaq8tczbgktpm4f04kpva50k82jsw724w8bg1101m67y',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'vca578lgthylt41hkjwq',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '62ws6mkfxieuhnqwixz1tbes1ukpos5gprk6oh38f282hf8e4ph9rqqiiz18ow8nfxfnskgw7otruo0zrizo15znd610nhoqq1mpjr1k5xxgrpk4v7d5hapzbi69nar45yspwrlhnjtpxbx2lhn4bddj2phbb3iz7fjpj1uetozw7sagc3nkwotr11d1ky1icnj6r4rofnwy93za305nq83xvzq3jgak8bn0da7yj3fat4gpt2mha3f1tulan3q',
                
                surname: 'e9sdn25okwbmmd4fm2sltzaqzy5uc1ixvn055ad7zb7kdvbkwih4dwfmkz9g3b2ugowum2wh8gfw273x3plwfbaghizes6zvbbdrt8pvu4giwbc0ge9cisxmog5rqleb0ij58w1e2zexurhc78fala6vuvxmcecbsdsfexzgvwpzaedupdcdf7sj7igdtg5nnmindixmcktehtcwmil7z6ngw8d40nslrqy9p8w2lg2kqt9q12otgtpfjg8qle0',
                email: '05m6gqi735prt3i73wvdcy1jp1i86qq6seelybi1m9sfv1sccbosygygpcah6jm829twt246lujhdnx0a4l7l782ffqgg91pgwbte23dwbh82cw52trumukn',
                mobile: 'cr8eezupkjtwisq45fbeeg5aaedd3jbv1vc6ghnsu337w7g4wgpzuum1fxqm',
                area: 'n3rwaw1kbdfhrcgbt962yqrkjsemmavdozgx8ftewos2w09nd4vnxbaiuptevp04leg7jew2notlto1iruug9h5kyl6e95tj71zz8gc5oudlkz9vl455y504z3bbyez4apzfyfbmr7hkqdejiah0qjf3kk5ryf306pt13fex9ueyk8rc0dt0u9hxr9q1oqzzhr508au8lzsqpsazv5v4z61wb6aspbi48pjzali5pa15zs9tailaw6b1w4vqndz',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '2rrqv8g5rz57pvr3asd7apjjwimrljevq0xj17iommqz7ys9ms',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'hd5uenl0194ik28diody',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'xicmzmcwycihg1u00p0vs65h439nyfmsff0q8288j5yul3092bir5cap6n51tgyofrld6w90cgyezrh3avf7e3fsc1wtndqf2j0blq7qgofg1edur9bnd1w364bczwbupug64tu3tl3frsfhij2x71qqy3k3gnd0d05urgxfq92z4skgwpvuia1msml9aalg1l1hwtsjwyu73wvf20ns9u0jhkww202obfihaas382kb0gwvdah483imq0zci3l',
                name: 'ka0m6sylswda2zu0ara40xdf7eoacepqxgrmduxeowtln0ardmhtjsezarz2uv0vxy0vllh9ytwgg1wrk2w6bgauj5d7w3kal48wtjbk1ki63gmirzpigscyu8ojnr1z359ahywgnu7ujj5ntaivlb72641hsd0rpayswref2ci7s7xiqld5gphulwco6cvz4damu2dwr68uqrxculg906tim9k5z4wgeoo16pjk8prjokl1h8xw4uj6w8ehiiw',
                surname: 'pgfy8k4pf7n3nl45em672ndsbgogneuhe1g9eoch1vuoa4suyb2jcwwstll9adwvw1y40uqpivrje28o5i35thchkxik2nuacj8dq2gx0rs4d570er0ag7a2umo0cnfqkflypzg3qxjc3fxzkyborbgqeno9wlu4dyssreqwx35nip08dcxl53ac3f0igqk1z93t9hxa7vm2hmj6gyrnuzpgn5w09je1duvvym21xrnesxc0wkaa0p4rkl2th9z',
                email: null,
                mobile: 'lbltmggemyvopxwi2quop2dxf09izcke38tq8ss8m93xyuctq4g1rz05szer',
                area: 'au5hxpmbedirlcy43cyb2hzvbco2osg9yu1yhm5kwcihn02zowh4hvev9puwsiio7an4euhdy58vlmyl5k3zmjad37kk9tn6cyh9ztb7fo8wis9b7n5a2jrfsbhetiggncb3dkk4p6k8fw12rkr8of70c62ecayd0ubpttzwqbdg0f5a5fihjfpfv8liy8nzf2zvytlmj2jinzfxcklse6o2k2rv0n6wav9ag1eujaiha40ybeq6hw6lomnkpmt',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'rsbilf333hs6u21zqri3wg4b8ewxrcm9jahe3o9ro5uv62d2zo',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'v535870wvftoqvtmi67f',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'sozyyb1g1bepz3xoitaa3zp1zwxzbjjy6pdk01w0v0vdbck3lo6xyj07xthpoatzvqr70pybjd253g7ucxhikrw3te73926dqt0gqtmxu457qu3rodgl2lqmkeq3bl8qp69isbh6z8qp8361i2h0wxz68as4an00cd4fl35m7vv250u4oosudiwhtq2qdd02bcz1cniz4xpswd5v52uxyhzt0jr3mpgg7cbmnuk4wssfrofgm89dm7azo2ztkyp',
                name: 'ucaw86895y9ijeobfv7tuwup38sc7if5jw7byuemtfpteymzpuv3kmujfbryp5vlgsf7l0qwkul1l7yv1qdh0rfpwhpepcz7h9hoeifjyae4ttmxor74508yh9wb2n1m4o3z5530bi143m5f7i4sr6an2vr0rrirb1hxlsap401qqlxq6k5iljho83sdkt161549r1dx07jvletnk45htzgc2rcipd5dsaxzehkqu8fzixw6rv62mqcooqnqrmn',
                surname: 'oaq6shrvuvrzvb64c3mcjv1apnbewbqfptelp5p29kzurhyxz0ufk82chknolddfsfp5072gnfv7ibcawk660h805uzcfpp3i0p8l5gifdlk1dtkaemwqlz693s86zb0wl2neg77rj4jphl2cg8k8w1ewqzbvjwpsvb6t6ameb1lc7yt2qkguhzch50by78mp2qhhprej9lqeg7cy3u1p4lsfitp1h0xkghveytsqle9somvjclbsodxqz8jtbe',
                
                mobile: 'mdha6j533imqghfjwcldh8pa34kpf6ubo2qwwrcvqqcaj15xh0z1e68kcy2v',
                area: '3c4oyfdrgj7vbuh3sooe1zrbgrsnxgdx65022nd891rx6kbhatg146834xg1kw1pnrsvco1ue94qerzmctg0qz0izvbqkqqfthdk82duyks4p8ub1q7knuf2ynt2ppgu82sdxw53fd43os80jen13udvv7q3g0m8ygocp20duimjtfeqx6ebr7azjonu4c4t63vm521oqbuk7vq2h8ttf2yii4ud6mfrbkjrjssdaa4dppr93ifg62axweh35q9',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '7yyk3e1jdokpz31kdwhjhn7o45ccm4z4qqg8ugdxwzg8y3s1vh',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'l39nq61koj3jwaavagwy',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'ef5fwagjtjtu79goczgmmokulng8dqe4l1yygdg14xstpffdl90d3h8dj8yhqhm6fdbvyemijyzyt6kt0g7h7pz31lo41ax0wm212ujnsrdghrxd1z4o0c4ulz0vxo1snwn0fvxm7q4vnar71yef19mpojhwmo79rvq5hluf1uoec1ozl5egbqcyptpgl0idxlv581vtl689p9v48ownqoy4khisrmepk33d9e0nl109k8ys02s0xzma4f5nd2a',
                name: 'sh7lq87r0wkoat10uquzp6n5z4cxdoo5ll3n4t3rgyxvghnxjlojri1q92h9zs03ge3lctgktwjan9ceucivx2t1qh7sxqamgn5j7hv6315k78gvgiil3dy76xs71flwexpppslxhip7r8g6joff38eg4sik3xko0226dnopyj2uw1rlj6th6x341ciu99g0uxx2jlqypq0wxxacjmhx3xcdqstkmz0l0d42hemvap7z2wmkua6iut5u2qk8yd3',
                surname: '04nfi6uw5jf2s45ur9ysmmvyy9rz5z18gl73wwqt37gqk9dtp1g180obt3rs3dvt1bc2m0a1s34mw7f97hepcpqr6klh5m1ybuyl4skek8fovnhoxfcvbzevpm3fiuenk99kfgp51pr6fi5esiwm5s41p44cfekgfzukzk1y2ki5yg2ga3h1tcdzxd8s5ytrwlqow9xz652bny5yyig8iul60b6ptua0cq2k5d7wixyqj7cqs6xlaqk18utf38p',
                email: '3mqdf4xwgpo5azxqyoa3pte9ilbey0ko1zpejs1hcm13y6vaezbq2mxvo6m7kodo3erb46jbkn4mx4ay012058jxezb4hverc41n38llaitrc0rj6zzzshfv',
                mobile: 'slmt90ktsj3wr5l7vtm1ebp2whrem09m6mf4nkj33w79viv419hvj5ggu40l',
                area: 'ccyf30qj9m08vushmtxx0kfanhj674kq03t16o4sn978aj7sdyecf1q1rb1ux2r0h26oag65zpig7w3u4p8h1r7mww5si7zdo82k8rsbma8ndssmtwrfout9buscqtnl3pytfbvvvgmq33fs7t1umzqtbfwfov2jc2md45hmix97dd7t69gufy1fprambd3exhqrbax644c2qnzx5akef7wpumfy5nzrk3lhjck8ltkhutnp6ipcek4m5zwapen',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '3381j7mwbjuva7mrzra9rctibtgz5bsdqegy6mn394ighnbaie',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'iok3485n4c18mo3l2mju',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '4pifp9k1w7d0rbko1fgb0q782eaxw0yw48ut0ykkdhire110bs8ijdtv7myftvl4iqfieilswhdvir3gz2a1z4lsylu0jrbsqxqu2rqlmzqe9aufi37e59uel55xcismmzfg9qmbneedl8w6l48kn7apwy1ks81q6xxcv1n2tbaqkfae7a8wqrbofs14ccvw862x2q4es4yzcmrff0hy147jj99fpg5xytk37ghrv5uwrg2l3nkjhnoywchofw6',
                name: 'a4aib4wgh0o3xcqxackiv8l6gb3e06mabtmo36w4nd30ol3tgml4y39t3o6qfhctt4hwnjnflg51xgrffmc1z4am8b3rmfcm1230gs6floi192qbr91f2akeyopg0mgrmiowwgvt2zz7rzo61ffq8yter938vury247by65jxj8in7c1qnmyplcas8dmiwdyhcu997ak7mghxo55xycewz4bwajsbkvfv5j5ozorf5926zu9j3fc67b3q6jfkc6',
                surname: '8jlj31276zqarg0jwd34vaa4zrt9km7x6jliteqv2f4wkerqj4bkcfg4hk3lvrpyi2gpbm60meqv0a0ylz1msbdzgi6273tg9753ejfssmckvt2j0st4777hhbpb8m9hl11ll9rd9e4ugplga7hj7wfy94zf8nsmb1oyqvrsk9xpkbcp2m4m73a4d1squpidalve3ijssr6pq530cjz2jvcb3yzm3e97lslehe5kyk3bf4n3adrlamqqpqsmedz',
                email: 'nr6o08b9tfq359c8pmvbqigt8vcy2brw490h720kof866xnemw9sb6vhu6lj95u1lfkl54jz5ypeo6kgrddlce2jf0dq118x82nj82kwjupy7y0xqqbywurd',
                mobile: 'd1xekyoo2sbkklhmaa6m2ahg3t15vmxzlgo0ld60ai3qro8c78978vesuqb2',
                area: 'goweqt23n7uo42b7vuc4qn0ucln153ndy34ftw0ffyes6fv9h36okdunnlaq5no8e54wx7gnsc9bgz3srvj073f7j4j91o0yxah7z26qie1wc26xqy62vatih483w8ecumiag8nt9mhvhee5oezalsek7uk6gvuutsjeyimq2j2gu7uckvhyqn2m7sms6jxc15iab033s2f1b0twqgvh8o5tbkp0g3styvqnj7arehjhoumjyp3zvh2msngjfgk',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'gu795lhqljatt862q7tjvnfa9lguhav0hukpzeewu0338e49kp',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'rmnibqg9ydo19p0hb342',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '4facbbxroar3dn99jfwsaf5ykc3tekwvu4wqprrhoo6s2o50cjc92oqramchn8oivc5vo9prw4sem5okokaqps1zwwtlnkbr43inrduk1bxijss82kjmicrwo6wbvgpuhv1mp7iokpr5c4ve2l6k2qrb6475jh83cdmgaz98s70p3s8f214252hz9wrk8glabv58u6c7m3yhgfjbvqd3z2akn27h8zx56dnja8qzpcuzlnsiqu7e1ujomvp304j',
                name: 'ijutrdjnb9faj0ue0ohrw9y8k6v1p7z3r3w4v4xi1e3l5vq65vi63yaaqxq25wqa73j2uusw24z5yquyz937kudg3r063yownqpz8stsof7ycw83uhh4iqpz2kbl2rp0xkzmolvmn44c7rlu0n96d6vu50u00zvbz0k4o0tnx2djlde5psy8oj6b3a5038sitcnnhu6embilwda4s9rqrrsjay3s4pbol9s0mfjqdbschqysqfmjxjhrsp2uz85',
                surname: 'wrecl9unh2vqr1ue8eu88iohs9g4fur0psmfddjjox3yf9nu2zjie6qmaetl6irvpg7mwtv4t23pb3ey8mub7wastelrpnvrealkgr6oe09ifcjaneq2bqbm6ytqoj8li7wzwm05trqnqmoiqsudbw5zewyc52b2ykivt9p3b6qvhmqwlkwu58n6ng54f4p5q4fhpf61yjwdeakka3hx7eee47ue9ocgetrbiwlazcxp91kochtv69rr7n6jtx6',
                email: 'ii0zq9me15x32nh9swdek7bo6glxo5noc7jbsyrvauoy7o5l1b0xkfwvghl2xgui9jz96e5ayejvvsj2ldammeaim95l995xn06bl5801005w3mr9qgyelux',
                mobile: 'y113u3pg75vwnlz2ni5gztel8mw6tjz9tk7n6ac7e0ha592tkem8rj97l3in',
                area: 'y8wvb88w61o4z8sx55dtzktg3v5i4aaawxlsntgu8e2k3r7s55xowmzarles3oebjqp55a90ylpypgx4ofcfviu2vcori1bej88fst40dlr33jgd96eicv6lu7djg1c128s414k1nr787yfwvfjz7crtov1pgoeif2opmmozbghdp4rgyfwzwejjz4tc08qzukjsk23v1sjq0ewx7oz5tt7q2c0bxjg9uk0f1h6df9suzglinfbq0jw3nxl3qwh',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'nagyzrimlc29jf2fvr9pbagdq7j8iqfezv9m2mdqeirlz1q7zf',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'yo6bmy7lj5fl0dhmryov',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'yj2fd0n75fup6s26330uthcghu8ksdidjwqjcmjnqvynkwznujsnf01nylqhfpci0x6io89du8ndh9fey175r4a7e7ojoph7jtmhsstic3guz452m5j16k02cbgpk52kqbmqovefhvy1mz8agu3jqizq41r6omq1q7l5i11fpl757cyfxx05siypljqx4zqbafgaaeszoy7yvkrp70dguun5ebp8ajc9tvzn18xbdbmotowj9n0qk11i64pyfwq',
                name: '9kjwghykcws4c9lzxv8641cdk8b82h7qlpqpezinkqwyllcedxuzo3j9pkrf2xce22gert2e9a8hns48yl9g6govhrdvwdr3fhzhwb67qjhbkwqqbogz67at7n8pf4ulw43je2224io31noqzkuihn3ljbqa9psqzoyqvu21g20gwlq0fvz8812zd9djbgbma9y02ir4l4bm41lz1dccstzr9rv0vaczf1taxrm6be9n2ie3cn17oq8xhyih720',
                surname: '93y53r5y631zhjgwekr002d7446xou63gkv0yzyllpvkagchcdx9wmpj44gt1zmvhif26uh4o4nazdcueu553209izggfcmygin2d4v5944ms6wfytb4dwl0puk3dndk4ch2qn1wknq5mraipewopgu7u5z0tjwjmc944gfrimnp57rv0adrm86u7xpj8ao9axxpakzg0pbeujc13d8r4k723l9dcytyq9prrwby1pabsgx8dr54ort3i3abqz7',
                email: 'npq5d13xhj16h2qqfpr0phm4hz3e1gtl2w1n6l6lj7fv4u17h14c7730il1eouqhl314y0bk25wshgpmp2y3vxwy6a946a8w5owr2mp2t7gx08l1jfzc7ddb',
                mobile: 'lo5hxfipou6rh3mcf5obo60wgy3s58qddjvhx7b7o9hq2hlroqx26xwj47gk',
                area: 'wc5vtcg5fv3smfzx0dauvunyjwault0os14hrjt4vt7wxr8n5cngjqma66lrmx32y8a8mtirfn3431ya8rn8m3225o34rs1crnwq2vzr5l6ocxd8uf5if7nvwnyekkl5jmct8qfyctlxd33aqn4cql34wegp8a59nxnpercm1woo09znv7zrjmwfpqxzvem1xwe73v6k3olhnbkvg6j4hb0rrv48k1wnsee18jm0onbvifocw3iewltml0zdr3n',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'mbwfal2rrwjlkpxp966th99a3ri7qgkiv7uou1ijrutmsij81n',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'scoweg0k5dbfb4l8h6lg',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'tn06cl7z33swh58fl9zwksdgqgxpgw5xqxrnly7qjus2k4sxchzy505vqqsnhf8izhfqz0azi8cd56vtdttjyqurtq4ygpmvq72l1lz1db7z91oce7d6c0i6gj5u8ic27ok0nfgppv5nykd2f6so4grdmosx8llhx9izqz3in9tdtk3pfkfu488y6lm0gu84y1iol6nabph9crawidz5sdyeb3t39r73ogls3yvbueg4vo1qt2h0aiu21qi2buj',
                name: '1wuegj2dae92jq2h6cccug72v3a32cjy179kyky6yay1vidqcczd8jn1tcin0cdjzwgoz4sz7v0037ducvjszs2w0hp9sov66rg05oczcnxtltqx3d024b0vuqnom3u2ps96xsplavntnx41lsx7qsefbfh88l7exuveo83lvkycub213sc5x440axx8nm6bq5mj2j8o1ekn9l8b1ap2bczz1fmmp39bm2pcd1tkdwwv95ss3nqlse53hl0ktcs',
                surname: 'uvcl4voj34n6cmauh6ewafsh7rfqzwdchfxdpzxhzqdx78kdtsrdofds75250ym5mxsyao8wk319zv0ka6l5bu2q7t07zyxe8uis2y9j2cvoimpl81ill5pxdc7yhsilxylvksekbbuu10qgprv8ihhz2v10yp07nemifysaih2qcj07x6jf6ib6lcajsknmicjm61vuho8ev3kfk4s6nb5rdmld9olvkny205iffuyw9fjztsv870on2qkt4e5',
                email: '90pkw10exac01lbdng3d9hp4ijfy3zhmrb13l61usz8ca6oqa4unh4ezo2xd4r4xowg5n5nr9uwzderrqmwvf2wnk2clb5s23tq4miz6opwf34wdf0lfmry3',
                mobile: 'nro98k2pi4u3dlsxbk16ovpwqvgp0ddasuzml5cih04iyaymkz0s6o8aoolm',
                area: 'e7f55ik8enyj4nb8jpt07ubrc3r8etewenntixgf3qfgchwpph2rd6u0cankawxwnj1xol9uy293z46gqi3yj13htzrb9euqg8fsy7evoiggqqa8mzud18a0m2xcxr2zn64h3q8o2gd8wxcaf4nhwgwk690mq9v6pm7wmsnwa9msjno29tezy2hnfr58fv71dw7ujtd9x69sobsm1br2ktzrvjgo8xzr0posf2j5r2u869mklm2zitc9fihx5f5',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '5ab4tjrw7bu6ku0kslxxkjig6ztdsj0ag6k1qmk0zn3rbl5cwv',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'yczz92lc44xfi13olkcu',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 't3ou8w2rorayz3ueemz0la7sp53aedc69180af28mt6fp99ms044slpnmfhi0dphpponkek9o0n6ve0tuzs7csq7mea0uhuthaqfgpvbc2zzexul2mhsrg3wlhm9jbb4ltlgfalf42ypwia750w8xmgthsheyk5o6yiuxtbzcp3v5jsk423d6vsxq9r2sz7oszqyehvv6vrg3nct0tcgb5h9ox6k8rzk2ham9e151ph1a2pk4tsur9x6z75muns',
                name: 'm7gi3ok6sl1ijmf0blyvcb5d1r2ng95hoyjaiepmhgtybpvmfgpozcbjy35xcwep2h8w0rqu9f6awzwcbcf0dqrxgszw17zz9yali337kdzyqlud3rhrn2cod17vbf9n8zvlwbqcrxrb830ycnhqubvksliw9eozw4krmsp4wcepyyz42vw7lnclddtu0nxtluarwu7kl1gbgy3wxb700jzo4l05gyrd0z6sd17wlgovci6xklhzzooof2k885x',
                surname: '9cavqaj4hcd1fgboeprtfhg9416w91frmccsjkmub479uyqvxw9b7n38x18x871itx1vdw2q9fgwumtbva3by72g5ijz3bja3k68w4rt9vdym532sfznors3ercwkxvg88fldqs3j2s7up40vcoq9l61mvcdgrvp6v4uqa5zzj8uo5v9cfxro7szjrxchpxxgy0zkhebcj6hfnjonf63cjlsrk5z8lxnnkn8fuglkw0bzovu6o6c9lau4zufj9b',
                email: 'gtyx4aq4jfoz20y30y4kgqllbl7q3j7zef7znwq0ocwqbdx69hmu9ujlbfr0rtqr7qlsozc1ftoz2gvtwcncykkwyjpxrlsofrk094zl2g9tmpiud88z43dw',
                mobile: 'rf1c9uvkswzm3tayutqf91zw5p9aakoe4mjx93gm58s8ex22xci2g6msbawp',
                area: 'an8slvbil69xlfzud8lmip8z17hu9hitvfjahphq5tjjv305tx37l9m4qqa9klpphpn2geg4qs6k3gj86u6ps3cno9s3pto837dif7jm8buqq6znnkal0skuca5s24mchj09fjxbreh20kxgpsw9dvzhn6k4gvlgodnm2lt7rys3gbp7u2fv6ffz9ghcb594m6bgeks60slcrmq2870099k2ykfsn4bw3k6anexb37ezktl5lpitwzlqsojbkwk',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'i3rqi2cvqjnpfyi721642jj9hq9s7ur65c1ej',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '04i4pk4h07apiyund69ei0xa9etgfen5iino781xp5rj3lzt0o',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '7vho8yl51xl1tk3w8kcz',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'ptfuec116f92oc2cvr3oki1d2ricpbx6fdnrn1kvaa1bgmzfizt10dts9sgraffjrhw4d5bazgv0qemtw9tmid7rgf9xvsvj9r6fmxy4qokbvoixubgwmk153k9ybpy9595bwqqcs9kxcoc6dr6m20819rytg4fip14dypg5mkx419unouhmks9sx3h8cttomhgh3z0roxqhmewaj60hqtjg831e6rphsq0q3z59c9m6icfzuf58iffjltkkk3v',
                name: '9z3wjeedm254m01a14za7t3gedwjay6r1yniflsek03a3e4wpocajohu5iqyc7r438f7fa695ybcz6a6y1vja1280rp4g39y8glpg1mw07phfb61g2gxxtp5fr4hbq1v2hv4w7uyokg7p8uywvontg4eayivwibypfheg7d5e7i3drwjjurx2vkvcspufn9wa0ahfx5h5lqjf5cb1r7z1pnakh14m4xpu89p79xo8cz4rdur3b89qg4aqr8pp2n',
                surname: 'eqx7m37dtsxjogfpo2fzul7s1k27vfww7glq9vh98puzqubh67nivdqfc74cufz3r35cxod944c79r4nml4uff8t3bsmg7dm0x3wnjm7679zfbuh2qq9vn3bxsdfqpz60rlxj8gep5nwzdmyngj4j4hmidhvlw41f930v21ge76pyp8jcljwc68sr1qxsdpn25n1x0hjjpw8vgk6116kak3fkr9h26z6xxfjohkn1ezvbggrxnr3cu6d319601s',
                email: 'mm9gnlx71t25czizey4crkuyri47jk3qdu3a2t0xbc8tg7os4z46n14n2cyjbjaf2x9d3bauy3dx4t4w4j4exrw5jmz3h4wjbfg2chy8qw8b0r38o3ugaxps',
                mobile: '10h7vfttzcr9glazouf4vno96jvaqhfi7raziooj3x1h89snd4zvf6m7jzkx',
                area: 'arxrb3jxlqxxshnnk5dbtu87zswdji4j6smvhylkrlbex5gkg03sow57eltmlwqqgu1iwg10grvhap6vlpbdd1eiewzed5ua0vh3ob0uzt8n6apstfp76urix99ftdxcffkauulpspetajr1o51cgeztn0a5j42ua48mhh23y3xxffigazthch5age026i98fmnss72qavctta6kguirem6t7duwgfs6eas8hjilcqhbbdgpuhlgcwp5xdh5ly9',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'xf7fs8cmivzadpt6ee0weyyikkru3ghai3wf7',
                tenantCode: 'ou81er3teuy4gj25eoddj34ni9fllzabe03v5dhe4wivjcx5rm',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'n1dh5fprjjwwpbrq9u20',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '1kbsc2nyrq3hguxvblkbrpqwb0we86wgfdzdapkj44e4yg96w1y5n8l0n77vmma2bn252zplz69cyv2jvaiqx2meotbtqlv008c5voyhejslk9i9508kovp7bfjgfksk5q2bh4bfilnpghkz19faq757w0r2gf9m82n86wxiiv8i2833ef5mktipcopodog1g7yutir3to0375ote6bacf3x9fxy6sbu1h7wwm1e8g0gpzr3o6ugdv57oumot0u',
                name: '7z304mzas7zhgt2usidkinobbne7zmyfj4rvuxztcd0fh2ftyyi8p1ktvlogfuo4s6ozsd7v28j3yey9511tpgqd4k30k9mpogi5ff413h78nju81hqwettx6d3xqhjc3iltqp0lcvq3ysd432scmu4h725zmykl5ydt87lyqqt1yr9dn8pgwhdyclebpg815m8k5odaq5se8m6axo4sn83jl5ckdzxik36uwsh9wgirnyl10sjknkmhrplvu7v',
                surname: '9ugf11s5dovxlcrirg7xmcaskn7ezo8igvvlg3ucr24zcs9yb0fs5oygkxejxxjspnhpc3bcprt78gkl3sdu88kxwo4n5q12wnt2pxyq6tge8t8ugb0lrmtd57mktpzaadducls2hna02gkdls2l030gzx1bv3jocxx4d67ss3vqfkq106pavepgresd3angmg0gm27n082xfr5eyz7jgwvhc5ub367853udg0zkfzl78kg3w4248lym4ergsgp',
                email: 'z9tgyjyfjmlhzk8f5nels0us23g7trngmqlgcpfjgybn6z479szmup1tixd3ba7vccrzq8vih3m7xkznaniuac5ne9a3dhdf5mlpsbpp5z7lx0ps526qcfyg',
                mobile: '3nm0q0r2x3c1fyth673s1vqbror1netd0xp0oyozmc6tecxk9jcrjxhd2o48',
                area: 'tibqe36enqafkp4h6u3yfrumcydqcll0ahrh4lkispztyp1108w4z4kzlzhfvvu95xe7jtrm0ebe3el1kjbrdjemc4v3k3ozpcmwze2eoj85c0fzu7iljvm4g2p90nz73lqolv5youuhbon2zrubo3xzf84x1hmh7svjn5mykomjjd5uibqnkflqcqr08dz2dvt1meq23a26jvoueq6xeiw1wng274xaaijsx7oee06lwtn4brrhywfnosy3nbg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'ff47dhw8tejz0nle5khbxm1e5b65m92llkppp1vxitl09vx48l',
                systemId: '66u8lnpsozaeirfhf0pekhawn4pirwwbmfg4u',
                systemName: 'gb4vxsuob0f1wb7zh6dd',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'hor8989xaxep8h6o0a8uhv5p9w7h4h7zx1zzhvukr3ui17clqobjnd7wyarr614zyl144mdzqtp27gz08rp30j4gwwzoywg3soz96z8adued1q4waiwn04shnvzzjawjnep2ta3n66m9q8oiruo3cfat7z2ng8fino8lxbfzs1x4bffepwac8ayikqpn14f9ykd5yv1esuwpa8p1ckowpfpck3takgm7vplfqlevctw26nl0ps2kvathx7uicj6',
                name: 'nb94bnp4cucc75235mzfes4hfwcvqn1jqt3l73f58x0biwzdegdrxz9qe0v01l2teholappojsg3squs0uebxq82zdq5tmeod2oteovp2cjchwmrojqp1lfs6pw8d2croleq0k55erjh4ynghtozbryya2l3j6fepvwxgxchulg6rookdcypeod1j3fuh5m2587yms4f0vvmxkf3ylbmwpicszeaaft7vt3p9qq3ka8yqkyy5z57ef1uzhsikpr',
                surname: 'zwg8rgcltkdbt2dmrwo06ttabx9ihel3tl5f5ecyakjac3qnalzklu3jv2ugcehsl6w2h9fiehzygqlykk3bw58iodeybbv8cqmzstmnworotef943ryazrfmti50x27aalkat4offdn4l6881ugf5p4o4jmc9m0y9oa6m42sfu75xdbl0puw5vxl29icgc4vjyy02jiu5hy2r40tcasut6qvbgphqm6cwwai5znc6xizrgcqttadkeyockbjjs',
                email: 'rjes8zoytx711v544i5ckubcv2rwvj9h4bcz5y05o6mpb55vyz6ctbnitwrz6c5i3uamy78axd3n0roe8518f5uu4xguq845289vkfdkjowv4gnrs9fevsaj',
                mobile: 'nfa8clzqxrspazecudd7970snk5r54f8wjh008dugoyh7hd7295n9x52c2bj',
                area: 'rdwravvjunueoosixixtudqmcp4b8zblv71wpdtcois6mb7o3xyjmnhx83iqnz6jgzhgjn51dlh5pijbbkzjgxrlstb7y818e1omwau3gl5m5gn92sk0m50j6h16j9jcd5nk38x6y3dml299al00mqmccen0auw4f5cluo193l9o4rw5thrq8tptc5k3gstwrxdsa3l3soot85yxqjofayq9ea25fcly2c8btqvs045wyscol9amlde172s58vk',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'cx156nxu4goyjefa7fie4xrmekhnm620je3c930ggz9ey3dvnv',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '3ugbkmziyx5hkiwgpovl',
                roleId: 's81qjo4aoini293xhzlvw0tydqe0vecqezagc',
                roleName: 'l5ylhjblrugk9dvde3tjxk4y5ckjuusjo6whdx1orkci2q81wrkembbp4uv6dlla0ajr0t8hpd60zgcdi0hv7vh56elbfkid57byvhieiju75wt6o6plxm1cvbx53lk8o85hsmdimz8ujdx6s1c9mr9hg33yxww4otdr2lpgpqf6u9m9dba335jqzsf1eyjnlu9ge45ahpyyqlb7ujpcl8mbl6t8py52l7lp81guih6wmrg3ipov5dvinrb2unh',
                name: 'pagbu4icugfe5xt9zd0s2he5g3tfpgr7tdq4ndpnjsx22uiwthv8z636uz69102wnlhgm4p3cvmggnf3s0gl49a1eaehfmm4ukca5zyml6kx38qh31ohrmw1klxkvz8y0rwh0fd2imv9ymhq6uk3q4nsif2k34iunu7w8j3iwu30gtk6d3zve4m6g96sa0694p9x91kpdoyiz2tjawy179z3zhzqd6owmllcdwejyr602u0khx6yagzcpx77xyw',
                surname: 'fosullb850x680dbkuf5rcunry6s8kej8yg0rq2whqsyjmccckh9v6z2drzzepftln60pb8ac6j585wct16zob36jxr6883wv847pd5ttmxk6huono697mfw5h86peqb3w0d8qjc331535cqfnae31qofn8sjvzwxikoc2gn3f8l87diadpxf2dhye2wh1ggyqyhpf7vhb9kmdiw2eskw5au93gl5x4irn7ll3umv1bihge27pwz06ww9syfl2d',
                email: 'fj4ew8g9gnmojstlv2q7gc215y6uodpxzt8eq97gizgu6q2qzwbcuqae8ttbcgedz3llagqe4zqi6nwwaxesu2zcqzerxbk6i7dwwctvr5uaol3d3ojyhply',
                mobile: '032i3ln23y03d84r6is23lvew7oh2mj3mg7zjhy8selj8tlo77irmrzmo572',
                area: 'dbhw4flt6vtyfy2pkv5ckneyjkq1ewbwz66y8tbqxikzt02qcrz4g2omy1bh7f14c6zwt5xh05yyzjk80dhyzj6f5654jfewz6balurf5y71dqndzhypjhh2rje7nqp3b7fe3g914ksg0nq3jdg3ru3z8l5eh8n625jywre06yxj9s8pfr46ew4ohwj8wiylg3h148m4sb4koz6thcgc5tvgb6qtkbvt78zjf7bbdx1ycun4in8rmxwpl1pminh',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'g66cyoato9s6g5zmmy868lvqeve25h7xlggi9gpsqx4pl31losm',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'strecbgefkqn1wj5t3y9',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'sef6rk3ijk8zd1t9541h5wi7mgdwnmge2guvuo7mtyj6z9adehyh303whtpyayivwkxbpvopp3e02sm475lx0tt3rkud9q6c5esgtyg2iy3bt0fei2csimycneis34c5ku74tkh678im2nuip8ityrvfugh76x7kxlc9mjzwtdpi3n844fc2md5x5ju9deeezkmmaso63w4lx9f2k3w91v4t85mkx9vnn4y3eedeetcdwcp6mphmi9u1h17pim1',
                name: '606sw5i5abgup8k5lkc66n3v1764xpt1byx9314dmhsx5twhl7qcknly85eddernzncrkr1s7277wot5s3coe6z2m712tl7xhtk1c0axxeyjsykevygjzp9o1okt9vq1mbqk75i6jb459n5x29ir8f3icacshbmet27ilcguiitybkk985qjoabhahy42h9etfxyvhwobzxf5doyta4nkydnoftyyphvmcl88aieelcbephyu23fp43eycylbqv',
                surname: 'mnie3r8dbnrqj88vroepnk1jtbg8dtqhswedxr9hxu0t0ft6p7ud3dz46xuisiqgu6xgifzyp68zqj6x917tii4w8tpaolodznxnncb9859md2k2m43y694j1q0oxrlu0005w0irkouh76aag1svdb74zr0q1r5amjtiwdozzdoepep2ydjddcmj4o6jdjsuwopc54wk8ww7cebwhfxbjvhzclbccpyp6zcbf6mcxbbokc5udpfrcx5ne1vk8do',
                email: '9jkpr7tyvcys5kksbmjh0lfpoue7i2r94v766l4hzyd9kzdhfnqhtank7gpha2b8sfgows7ve54cusnzd2vzmzl3xrd6d9oz1mbhw9vftebozl6wpwwhwe28',
                mobile: 'ej0qgz02qji5vdq9jnwe8v6zii0lmgt691gmo9gxvw7pbkqpjdb9eenv48g3',
                area: 'n9pa0ruqem41cls5oqi7nmsdgog51fcnqrtc4dati7j70z34ule34p37hfrd7rbvl3x581geun1dljd9mjgj3jz5ordifb9hu288k7id8b3zkn020y129zf6dm4x9fj7c3vl8yd7in4nxi8eu6xvadr4p7gxyy9urs5q7ym3q4gglob2vn2e5zozibm87esqkah2x515lp65f7lixz2ozmu62m64rxc7oijiqge9jvnnedn5khtaotqoiirjt9b',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '57oubplwux17gi9zhptnrpdqo20db01rifgavkng83opjs0l9a',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'lwktx1yu315thn5t85bwo',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '22r83x0kapso2qtttxgwktnom7cgzmiq52ovwquj2gjkyv8ad48xb2tyxoymjcjgj91azon6gn1v9ot4zk6yyxcpoidemlbo66yjnx9sgmsbvor4t9rkv9v9ph5jjo1g3z5kqfcsq84kzh1c6swg964xs5vznsf8idw0dxtda1zle5stsmf0mrw5sfhvfpt40rzy430ky318zq99ov2c927q3zs9qpt5twco1z1geugexnafnp76xn5hf10naza',
                name: 'ai9zgd24o5qliaed3jh04odzk6j10tupgr1323p0ueq11ax19ymx667cv96nscs9qphaxri52cfsjbkneudv1t41i6552yus43ptfruf80w4p8kq7otx3ruo1uvrbq18i5zbtxwzsi5au9h8hwwbg3uh3xo7mqjk8tlg4wzuoj722ht16d83qrsilkrxfkr27upti2bqdiv0kke2anvr9yqk5osurbwchdtylfpvpign2guhz43f9kwtc9e0tgm',
                surname: '24cfc1w3h1nhamkw4o2uos8buuaehdb649mh074ga25g4by4h1rl74k0fha5n00di3bvla8c6nqik5wjly2h8e5ppzv8sjnjexo94yw12vk50thgt0osy99rrjn1i31v9y25m2sywjc0xc3spwbx28lk2bmnqa0d4kul4g9v7d4h0qy7qe1jk7am3pd5w0oznztt1rm6qjdrtnkhv7wt6r2k5ttq1g16bu4os0lfi4lqz7ck32auckhnhj0jj13',
                email: '4dasqh6xu49bkgk2jfkuil6m0isd5tdrvoy5ig4yzksyczrpbok06qxmv7opaf5njoegv13mtcbwydw9vojrhhzo50bcb66gkz76fiw60ewq17zv20ez76cd',
                mobile: 'p78z3pigw1xslcop1fyl7u2p99i7gtulxn3o6haqy9ofelnubp505uwpi2t6',
                area: '2etbvwg8ggfblekl4gahaa9667isy2dy079klogr00cpyo3vb40w3ole52rtu2ivayje1pmqikffh0j9bcz5ciwb84h9htx84h52fm83fjw0ll67vrymrpqic4tupr5sn9h0wak7daxr8ea8pdnlyelpek3apfbx9j0qpn5b4qnx9bs1u6gvdgojyu7qelcvzrasvhe289ceygb57u12vg44229ur4bxec62ox64wnft64k2nvseq41m6xdst3q',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'nsfpzo1npo7x5nt1s2rmovhjr59df97nibwsv1wqa9efcyompb',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '364hfwtes63rhjxvo4o3',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'mazu99ne12ijjdg42s8xd3scevbe5jm2v3oy8hzwe0jwhq1h2eiq3zi7hnnm105ux3obtbm5aul42hiyibftg80p9mv7q99kz6yydlh2ipjvcrcc3hgs58lappvnvi8o31a6jw31vx6nop5t0exmyp7h8ohseypv1o3dm08k0j9knzgyqqonkyitqu5ab3uct6ask420541ckp7nemmni8pxmfh140bb71ia7bn7s6uet5vtus4u3gwwx7q02ujl',
                name: 'vvvamckf2g4r28xxdlg6t1m4habslsbnck11hyp6bp5i3x4hlc3pn21gn8u6ms63ny98nz5p0knksqc3rf63kkb0ooiwbc8zsczfs7ng5pwrt5s9fu5w1ym3pwaozu3zt63exnmryery8vg93gssuaj8hdiy9ausxxjlukam7rkxiec7wvf773i2d9db0uoh8ewvre5hx1bqy41pke43ssixi4qulofgybj8casnyhvh49xfaft2li62dqitkc2',
                surname: 'd5qkq2aebmbly0ysv399obgsteat0zze7sdw9pkpknbpbqg7lj7g7eqetxrzw0izwfmikim84yki8a8oar19rvy5q9vm8ferf07hcqaf6y7osvm7v8i452yh2tkc9o3hkrvrro35mll7va962r0s9mbomc7isatn6fkxios35hb9bx3lt56eqweryaofza0gsf73897d1o0q2oxs8pg8syzizdopy3m55nj3zuxl4qy4zuhzlqiodakhz1x8oua',
                email: '50j0plza6pv74tnzpe6fopwhe0sx3iyya1c4skjauqdt2gr2viz6ivn3dmr45dfa9q76rzskblnw49qj2wix9mhvonxf0bn4m8h23zorfs4xikxxz9lrmrh2',
                mobile: '3rn4l6vpgsx027pxcfz441drgrc1mlidevm3tvd513b36c1z0hh8ejzaavf4',
                area: 'pnflzwvozxh2cac0wvo3ly7xfefl1px4s5c2sks6uhjo0mt9oxnafh0w8vn8beakc4fge0n7eucsbnrh8g6t4bt4p7b6llpy20p5meqj5plk7vtjldl8wvkqfh43wbfzwuyuynxqdba6dam4e92l2paas6mgmx74zcbgij5e2ldrf8vtgpyssrtxhdxf8ptkazjxw8yqilj0a659rlsgppo7ecfqs7uskw6okwte0muxnncgubuib19q7yfc4m2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'sw72ir0gj2txxbp63ie3e12e2lj3sewwt1nk61lit83btds211',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'l589dl4nibtnu8s860ag',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'skc1pvi80br14h5v0ylv6evjsbtp6rr0exjymcpvo1sftc9dewvr8wl18iw566xhccxe1oceu4aiax88odt4wdnyw0x96z3t483qj98clgpq4bue02wynfj03c6djynso7crcehasvervxoa3cthjfcsec3sjvmegjyurntz51kvhj0mvdnw3ld6te881gldltmz1gh2zus8n4glgrtis2v5k0pedjojptg8tkw8aie207us66idrtra5lk3251',
                name: 'rasgbgx34bi46fq1t85nixyqjewbh7epia4ksickc9tavpga4sakgv290lcarb8laxhvu85pyqkdco8h2e44mp322hbw8y5wn6b32sdc6zlgosjrzu8dwk4ye9kv2x8pq62wl93sjuhwc5d8i55g7seone0pv9xvr57fjk3rfls7fmuf6m871ok3ukxuccb412viicjhrdax7vykxgqef18supmof0x3p4k47bq12nmsx3m9z073cf9h45hagdiu',
                surname: 'lm6aqvchv08ba7hyn6sk2bphm6z4p86mgsgbujy1eq9q3l2b1cf0uwabo5elvcvcat74y9a7oikhr3hjl4cifqtthwrpzemheyralovxnxz0z1784hjtjj9iqjlvoz5nusbstx013nm3wlw91k17zrwt6yz29318etu14o4urzyevx0g6uoocvmcbz1qwc9u11rq4d3lzp467glk7xy2505y0a939jp2n4y1gzromgrf6zqy9s534ulcsxu6mel',
                email: '314jyqds9o9zsr2dgdtmi7wlrg5r4lqzrvrd0hnuf7em7bwyrfc2i0u7845domzx6pyde9qcz7n73qpifv7m0we1q01s9isi6lh5ahkpdzes44i6vuvjemk5',
                mobile: 'p20796e82f1vakl32bbhja6n0v1szxq3hofegy3gx209shbdquwov6jin7r9',
                area: '1n3j3pwibe3nej8p9qpvyea87c5spyw5ct8xkfid7gwbghbbddm20yrpiayfdn0wcoap7434ucre97l1e64nkvfm6eq7uyh0tq2ha5p81m5a2rtxfy74r6r6n0q6af42uja5cq0d9v1x53vlso9bbmy3ltkaxjde9wi4wqacxtgp7b118m0pqflifcx7xmzjf9k55lrp2a6xbr3kdej42nys9ka0za0or0ii5xl2msiptjf6ixf1ju1q3iuufgl',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'leo0i92s361ixsj2n63hl9rnqgdnbxi9s4v098fy0te6thtku3',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'db9zp0ipqyik14agm6tl',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: '1it6efvnnf1kswv7i2otj4kg2c0sq9m082souq50n9u6ilfr99y14cxmaiwhjh1oyxjqzl8hvh3e40r13sc74053fe4rbm7fyipjl6ztd65nynp61novstv0cilx0er61hyhfg8gz6u3ekhutyo7wrdwlar9ujbgr5fzjrl8taxc8pcw0o3nml7icd5259m9m75f2rli9at5rmippma5xfm8t8f21o3o46hnun211f9tgngdxe67rfwzxshl5yf',
                name: '9853xbqtq8qsnzxc983huh3ttapv2seu89prwnsns62o73wqt8wsfq5qcedl0nkkv4ibkuq13ux4c5qz76vx2kw4bbxb1zyfr5ocnkr5b05myfuw70mmfm8rpxltgd2416po0uznyk9u2z4gcs6drac3wbmoke8hvg07izx8jfgmr9d44jupucy3scz2w10tcmhs22igcmg9bd27mnclau54v6iou58geksanuxn6ghw9t36s84jot73w6im6p3',
                surname: 't88f6xg1l1sf8c2wx521gj0zh4rqylrkmhc2107nfs3exrp2kn5vy6zqm1u9en9gntdwmlioayf50a77hkr50d0227mg41cvn70cifimqdi1k7kquete3luhrt74niokf3l3fl898a0ck9sy38es57d6g4z16j29qywwkqe3xigd4mx147ml4sv252thmhhg7fblo5s92a9228pzhom739u2sk315c7tel8sfl58ytvwt26s4cc95cfgmwvfw816',
                email: '4l341x07sdxjldnyr00fv4vaa29mb3igs2ge41puc29i43v1ao26v25m594bu9byk6s522zfqwku6b9nkwzmlkt512shybamvcgqvq5zukf1kp4m1jsa3djl',
                mobile: 'klbdw56bpjximi7jj3ytccf3290ebksjw8oj98hfsur4100x6sco6xo9maen',
                area: 'z4153a7qc8fpgswym9vwitt5mgii66ngaol1nqcvc0bfz4krmwakqlb85oxpniy5ipsmcpoy1gmblpcprm7qc4hr85i25fv4xp93zyvg6cnpc9ulrcpf61kct569mbzpcf3lfjamjyc2e7z9cyj5dgproey43v8uxy40c35fccciajf5h4s7cuxqk804r1ibevfbws8ia43w9p46060teigphig6kfr76n6sbhnb7a9izkn616xck3lfiokdm02',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'l9ek1s0rar8f2vo84bbgiw2cjegbmbj3ydqsr3htu687ugfjyk',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'nn4344yq3gln9j4baonc',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'r3xegyes1p0jk7cdtpbnx431h7byv2j31a7lgbv2cw18i1xe7d73tizpbxp4au6xp3zvxirkyorclyprcu2c6lu98wzibbcbqk8u89c1vonwc4kjwvmbpi5m046ckpww1ogzdrvw5mqeckfgkqbk0exmvmp3l4no10x96pb2fvndo2zevf4ncqfig25e1q8lkou4nxy644zfpeyxdfqule25mkgympurcje1f12u6ym4c8kucbzg0s5yta1q0d9',
                name: 'fc2u6fuzhkxx6ajwbf0kkxv70edqd0vke17th8n9ppb6qzinyxrbd355ywf2217s1tvjwxwqu3jlse7i4ll5l2wnumrxnn2och318cq9bh07ugdxmxojweg2bl0hs3cc3e5qu8z0gmv078skxwq0gq7u7unxokdg3vcyjfn2r6st2cddcv59h0vrr2yqj2d7trexwzznx58dapz6cacszkbhekadfs9tbkcmbnddi0q02sewr5pegsryt3izb7r',
                surname: '6n2y5ccbq03140ngaz732woei9wctg78f8gkq7jxs5ix1iy6m6xneq2mmi0umunplc3kdcbxxwailltauzdr7xy8urf9uzjjupfk5mttxrdzqu9irtstewhhqbbf676zucee16elpil3fbkr6qv6rdvjslb8l5dgbw3263bfriihj9rd7mdau2d4e83ysj3ugbcw9lq72d2rtnw1mownu00m98865i8dauhyft8t2w41fhv7m61qsnwsht0w89p',
                email: 'toqp69f3ukpmx03h388uvxu9fru05ypwhjujiumjp08h9a2qqby48o0anclfgef5ppo2e2kphwfmcxy5zhv1vq2cj32uyz1wa4qsxs3hmo7j3vvzpw4mthmwm',
                mobile: 'el41zpu3176jt7sj5z2in78huet7f12r17xnmx1hgcrvcrzvz2zar6t74bbw',
                area: 'qdy06td66n2wdz2hne68rdkl7erg2l7m456cgwjedwfjw342k1f66sxtffjfh3crb8djnwary7zl74vw7rfje4qqe1070vlrvfkbx75bs0ysllozbc7skkb2f7px105sc74w4288r2wunhkgbe67xomieuv5bh5h1qz5aeidwm6xngbkvvg6obxsnc0bw89v2mthak802yuqkwr3ei8n3vu6uszgb6rxz9xu14pz2fnqc7q09g2hisu3pxw7rxr',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'qjv64d9nudf6isuf038q0eldbu7oz3v5p7df65y3lvpb3kukvl',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '8iag593r0n3qday44mv0',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'tew2aikeco1aa6fmwxqq5jq3zodl15lmpp8ac0ombqzwmm8jdw9nvjagix5ti6zzrdq87u504ufjkzrd00kucidrrz41abic8fjzk7scj9qya1n8h2bqsdmic5eul8f9hgzoby2glv7nckzc0cj13mpdwmnyibhwu5w5wg0ozi7h0lqwy00r5feo88iw3kbjv6ykx6sjgdxi19pgtd5mcb0nerl37lzksqvla78ysnmke2kjbkcrrdof8usc2nc',
                name: 'dj033mjkdohmjye3ireti1z9qbx2lbq58w3dcxdc212kfjdu4ph4dne5j07vuinls3xulgwlp8ydhvwndewgsx2rwle0ovt4zp7he0t9r8y4n9lu2cmce8g6k3gusi0cuf03y327to4wuy7f384o111fad5qci2r1x2dxf11i2slixpcffiwwc4cih1oesq63ag6ocukgsb4hoqeq79w00e5unhnh7s5em3up8hzp2eynwvxbwmkvxgu4br180c',
                surname: 'a86p39q2rd4qyrsxk6740l5pncebxkf49j4b72ahjshcg79a31iecynf2capby3boqk61axgwohvuwkxv3v4n9vzmzzgaa8nyv99cip0op5vyab8ntp2nctm5glm9gqjy0zdu7xhbxr6erheqqwv0uzlaric9moieidblm2qsoaeqcgq5iyblz9rjtxt7g8nfe59yzcc5sl9lv7ml2bfc0u8w143g2gajncbsjq54zuk10iyc72vmxqm2udf6kn',
                email: 'mdy68nohyjtrxtrk1l8n5yojyeqb6tguk33nj0gp6tckt08b52ku53gor4h2ylws3dayr6uen4qny8r6s9ltctec19y5fgr9temdga45b234m0xbqcctvuhi',
                mobile: 'do3uwjfih7m3lt07akbuzpg644z5pvlo6v56ryjo3xr9jjb49l0x7xjekqxo6',
                area: 'wto60b010jikiafbteqyfe9apeai9v71zu7a8p07hvl8khxyehm88a4q52blx1ta9zrrz6ucxhdnrjnzixg4mg1rk850fjsrfcrspfxcf9jv7vxmb0ywuswnn9wiw2rw9q4w0vka01oojlypuweq3zw04gtuznpblhvnosn6zgrodu0bd17rv7plvzlokdehznub324imbmmwce1jwbtol0nz5qi3d8bnopnui6usmkkydj1ekce4zf2x8ykvza',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'fwg2lvr1igklgeuj0d8az7uala750dlt980k8dso87jyho9s2a',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'f3jkhuq2cq501h408rzs',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'd2n1og9bzt7634bdukelbaz5mss7wea24wmcp60bwvkeq6swisjdckut4bee1axi3nlw13uldnpgtb582op4rmss04j9ysxmh2z5yfhgv8eplass82h07a6wtmxkeumnbddemtu5q6ukraf4we3x5u4a58ztptdlhn74okneggfo94ynx9qhmue5yf40oqn58cnl6mritysa7qnnudzxetutyyky5d887bzv1m54fbz1gprbyceq7dli6nqvwqh',
                name: 'i7d1jtznoem84guce73tffov4mp55cnshadbmvf5807z8fuqs9vlqmu6jisuahlza8jpcg4kbu78i2vj0h7i40hhlveuktsb0kptwecttolp7czn1bou48zy1zdv0vru2ay07xlfc3vswc6kq8zxr1lla5zx1644kwp319b2amv2wxkm160raw9r7cmoj4wcm67ucvhmndc3hq1v9s3l4mby4x7co7c4yul6td58rgc0hqfwo8pthzbts8l5fd5',
                surname: 'm7ipwj058jo0btsuuy2cp1p6yx6ofr61l5c80dfl17jbqplb48p6cugpjzvsa3669t89kf2436rmo4t9wwc50rcjevxwa93hca0jukmmneum92ghyseju3cribl6lmfsjx450vp8pu4pvx931aixvfv7c4bxotewytg97pgrlh7y9ayufnez3alcsuz2918ao04h3xthsfbx1uahrvn7w4f3gjfzegaakhvuk07e31y6q7h64mkl5hs2bnr6pdw',
                email: 'crzzw11ady01upxa1dkd2k0gwd3sxy164dlbkotn6ra6eb1uecuedtjak3d3zi6op8morfvqr2uroit4rtmzus5hvelyd98y4nwlq72uu8r3dtt5fvxeaxtu',
                mobile: 'xqooojg8zit6euvt580yf3ht0pagpo7oc4hipydalm3pqt8099mg3ekro980',
                area: '6gpcqqcc9ii0w6kmwssc50vqxj4v5rqry2my6vnzav0ysmgqbnhs4pm1svq1752ffou8ov1ys212ygayx4n0ol6zgyiwu11wq2g47baaimfaioh6hyzpkzftcar9gyo755e8ioz06fk7x6wmxxfaz9eyxqbcuquwvmf75qao06lih9d7cgz5xdlm81nsinawruxp5zhkzz3id3czyo1icqzovfsk5d0dlqb8a6g3sm7bmzafk7vfkdvmplyo6hty',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '2vyi900uiw0sawzldl7s5er12ujbi3ocmglc1elup1d4x24ew4',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: '8ts6q8cl1sgkptpbz8ry',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'ssvg647hc80t35nverie6327c6gmloeljdkpo4i5laujdds4oiemf8cqj1oqaf3bowl12swtx8y2vol74s6t1do9jpfzasabv3c0mi3z32dg8h3xinssrd6aqbodk76jezlyc3x3ensv7theqxr4x3vnuonurvca1yzpx2jl4arkcz4gwxr3fuk9se7yham544pekf8db043ra08xki2n9o902a5lkv2pvyou9ugkdcmg4fn9p9mf3xq94ukjou',
                name: '6owebl03idc4pgadw1nbuvqlgzh3ciqoi8wyw5spcv096jogmg5t8coroynm24t86v4zet4bnyfjxp0oug9a10jb1c38lbfxnruy8ul05afaf2rd0h9a6hqhbjg9gbhe4qtp1gibjlwlykj53jpo4d22r4w6fl90m7key1xhai8b6gbwctlxjvxy38z0scpypmo0j28zl1rzqafd3i6t2sb3nkmx0mx1mjw7i7flh2r8vl5diy90eatjolgu0pk',
                surname: 'j3ff4v4gvc3og3xnx3h1u10qhdchlyfinpji4fc2q74f1jc8h74teeujr9jqyjvtdhq63n24pmpq3vaf71d4blge9pzyjhttrrlzeujm0xpv0vsy3otz7skk3gcx7do39gnuf1fpr7t9qu7a4umvh8jyw7nhjubd0kofg6fvycu289gnckv970fetwm5v2g5yf6msigwyv936hqjq34kwz85z8gdhexipbtjtdorppb43bh0z9jybgemlr5w98e',
                email: 'l8k0cwrjdc3el8t8fntwlyr0gqducos8kzr401dbiwd011oc2ecygfjsth9ssztvcj9807v0er4kd4qvdh8e8knu4ymnut4htaqekdxwdfj55ywmx1ik7c2u',
                mobile: '4dfogi6tta7ljc88zae65qa6y38z15sq5agt259pqv12gf5w6bj5d43yu7dy',
                area: '59kg3263bnlnmbaqdvnj1ohczngrsd131cqaplkvagib7kn9jsilq77w06inf42rjzhceyge0kx5dvh014o3nfvx7pilfd48mgic5pb9pxrwlz78e3nv3z68oxdke2p2br1w821j4vbjgelwou0a1lueuc4j0u9drctb7i2n606lb8v6q46igy3utizysqa752qdodkpald84wei1uc5vag29yulbs4kr2dhalx3fmbaifh89e0yfeffdibd66d',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'ty9eoxoiqr89uzj6kwitwpjxumydu5c1d8j8h1t76177ty27eb',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'qnutqd14vcwwzdlt7289',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'f7ave4idh2f6k5bdsj0iai6lgremvw3k6yuizivci83cpgio7gc3aexjdibwn1jlfl5mj1cfh4w56p6c80ihv8uyf4d96allgrx21vxqvk7fjofdj4cywrw97sga72n4l5vvznjl1qrfhyobvy8ui83mmehhsu7a4dpxsiqmoy4gxex6p62pzird7b5vde293qe5001p3qypz5bxy6odk1lwzw1d0r1tu9z5n9akdktihfyyznbf48zsllw7avj',
                name: 'w5o22e7n0mhzqqk8ckfagl0r8gbm3giyc1php43l1ipkowmqvschuivl9cymz58u89ylptla8efd9qj6xoudzamat9m0fzws524rfox9wt4vupvezgq495hcdhngq18vttdwho1uxq4kz65r6xgpmnnykshyrh5wy9fzpzopvoir4p2jh4t8g9iqex4nif4zq6v9k25usua8lnjm11bz9sqfy0j6bhs9utqhftceriqga4cis4y2uczlox3xcpn',
                surname: 'j32rz0g78u2fd3luf8tjwd44wfxa21g1mcd4ony13yyg82l0m7ptxncgiief7mc7tl70a65ytyvw3iz7fjqeoi16nsg7fsqis40jwq4zwuwwljy99ima90d81cm0d1wqvcgjchbt2qerussbvjdjiqqua1ojalmplxwjo0ryxvm5w6gmix8mhshsefly3dloddslalj3ssdc8k8fss1q78ej8jocfpihtypqigvd9bg2h54cnn1bov61m9x7n5t',
                email: '0gvf9aaboqdgfwaqwzwy1an7xszde7u7x6mwr7kenvbdoeyb2cia5abxj93bqdjkxolcin9e0x8x9txc9yt95geytp55mhb35ripkzepprvtr7g7qgvqrd22',
                mobile: 'xbzogv6g3yibnk79h9qpw0k85j0xvw310x0gvaoqx3k96o92i07xvw5r1tch',
                area: 'hn6htopehand1z7imw1oj3a5einng34cuu52vidt1jwlirb8za9csh22omcfem318120z6qnx55yrrojwnfzblvde71gkptzt7txlizw0qarlpvxrfjwof2k6x8bx6y1h06scapznkxx3v1090k75qoyoam51goqnwfhqf5h7osutuap6uzt30w9j6rczqw4c0ocucda5014abhdlyxt7zqhdm80bc41dljoozs2j29g8w8wdf7qk1aofxh5zp3',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: '6rjvnrhvcxum0r649l6a5h9f5gr2p8rx68jo5o1uxczx3b2cs4',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'u58soowadwa89850m6h4',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'x453e24o3xmpooghtv7w12dm3nzwk44wgsxz5e8b7v3jugcgnhm7fubslkjve99wm6h7cybpq9ugf9ehmplufys22f972a2u95pg0cdgh0uzb49s6j9bzdui4r1uc7ygv1uqrc6n9f7h285ltn53b3keozp8jkvcfgqq1qm1r7ifz4opylz9um7zc9ifqpkle0brc2f3yxmv7mgmtpluumkzt9w65debb4vs5u2s7lujsf9xbdjqb3850ixprmd',
                name: '66x82zgizalo2p6qs3u8jniqnflpu37vxwgafyk9aq1h1u00ogqn0hxlldd7c7rqqcmup9y160qrwkup3almq1x1b1j9q990afcedx91itjke2i2avi7x8oxh5lfpbk8jqt3c0fii6ww8w9bhllo5iyjjpqy5kgut7l791hfjv08fxnj2dwvgzytn8nt0mqwex3l89hqcnfjthbw8thu7d3nuktvtdct5ao3xm9rf8pg6f7t9sjfnq72ftq61bt',
                surname: 'bctf9qenaqim4qh9ycvug3yen0d85d30rbripyqerj2a9cujeyctkglnjf5uzin1ub105f1q0p8sf2m2zwces6xhqlodgdx4f3x2ql3l11lm4w96897o72k55toovzvda1kf3tsu2vk8u5tiw89sfum58laqdpmezeb9bzrcik7lni9f2mwzzgffm9ohykpbvzku2lapjvc8sgqkl406hh61g9emqzaehfwbu9mrynzw2x3s66havvyf55p5wrp',
                email: '34h1f7058xrbuftk8kmbuaqbpe6yq6tfi8jbdm2965zggy42ci1mvzj84ukmsc6m8nhiup2qaj54ynsuxkrm89619qa3a8xsd8fq6rviyheidypdxt34ii9s',
                mobile: '07q890dhvrnj7wl33ep110cmf0zjbaotyuhoa6cvu6ey7vsddut2jwkmiav1',
                area: 'tq3j7lv76y1qvuun25wfsi9on8c3kx98yyxpjkdb2yp8ovd7aju0nqeudl3lbzvvg0jrgoqftmpdgp8g5dk1esjj2ausypboxikj7e0zrp1b91hp4yzd7t3mgj0d87v0x6gxiv47jzml93mj83gowo78a8qp0eyjr39zhtpk0g6gzm3r1098q48h5vlhv0ypt01t6jleio7vudiagl9swvl3es9hpmfybeh5pv5c2npd90li4pv2zfyusjpmff4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'eqxdhqzynozl8y0htf0kq997o6f4cmpp5kwmfifpy7myk0gz0s',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'imijxdt9lg0k54q0hutp',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'hj73telt9sy5gs8b42fb6aljd1whttjhcveiax7hdlnbjxsjcqd3787ruwqo70dfo67regu8he130r5a2sqz0v4tct7szi3g130z6ko5tv9o3i0su02yl17zm1o72hrb4iepapybimcsv94o404vsev6ggkihzcuppd0oefhxsz1vs0emgxyp2tbemo9mklka26vcy41ci2w4dme1hnc6o3t3trgbzi86ssts3iyhv5zvour82n25ptg2ovsxdm',
                name: 'cbzazvsb0sqa5bjdxm7hngmogbogtbpnvv5unoizbkj96xjhuohiwygg5ayqlh0vqiwgrzj26gzyzp0vq066v6yjqwuszf0st7zk72jw0yknsvioyousqbjd4628ajb3gy3tnpbqd3mr9d7mw3k8hkx568pbtms3jtoy3jz7h4y2iww7ysx0zg8wli6sanlie2q4zmjh3fn9h6jimxxcimyyuxvxzujr3lxew8joz499krjuj2ayiqeaqxf22qi',
                surname: '0wbpgpi26qj9z4cyyly1c1949fcg0nq84h2zimyzbvjd09x3h6soqzuinn3ryhmqh9gswkp18swkwitnfmzy5mv099cqjlvrtykox4nc8q6s5toub6otptpx98lskf4k6alrwv2odgsr2gdgm0tp4bn11n3k3ydxtpyg5cj6euy545q5dm4z86248ecok0vb0a7gzd6kyyr5jvafb37dj64i39td3gx8hruwfn2rxps91f8er4l22feodpdi0rr',
                email: 'onnlse0ul5cmamh4twewueic6r60e6tqnfii4cgyj6bu8rzo9in88297a6jlfcuzsjr13yxe8ct4n9m2ieb68gtfdwlaex8231f8s5ls3w8og3kqcy0txh24',
                mobile: 'kwsldeld5fckl4ds13oum1jqt7nonidamw69utcl3hwdue7g6g8ymel5rv9y',
                area: 'kbbrjrirn33vs07cnl08jvo82xous99790018xs1gvrzt0l2fj4xi279cv2rcpgy4wwly82hw0ulsz5exmh2m8rnpvqdb7z5yn0cjj6xatc2qqwfo6mpy44oyuth5dyvd8r0x6truoso64h436gkhjjpzneuxkwwo2yhhe5lopvl2cb88qdbjwl4e38usrz5bp9klkcodz1vxxv71p7u9w8n0il7yhtxdc9dxbq2u4h15o7aio6g0ra4dfgip4y',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e60c8538-c42a-4b27-8fbb-7f24537caa68'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e60c8538-c42a-4b27-8fbb-7f24537caa68'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/e60c8538-c42a-4b27-8fbb-7f24537caa68')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e60c8538-c42a-4b27-8fbb-7f24537caa68'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '51c92623-9dc5-40a6-b08d-5b9b6b475494',
                tenantId: '276f44bc-b07b-4ce0-a539-c7705849b7e3',
                tenantCode: 'nfoumpbjh0c99cgy67lwv9fc0cnpztq7q771xd7xliw0o4iwya',
                systemId: '50633fba-fbd0-4343-bfec-a0d9f78b18f1',
                systemName: 'u2xul8ao4etl5lph8inj',
                roleId: '1c2de047-840f-4c38-ae0e-5bac992e8153',
                roleName: 'rvin1oow79l5vp13d89ofo33lyj3c4d7y9hucvasewyc9jtavy5394z7fttigyeszgjtfiububyrjh2iesvi8lb1fmb2lpos3r8wsyziz3k23se86iyzbimoyte1mtnjneyua1ci4unf70tlbqez6tke3s03fb3ov1rnx90we9m7wls4b8yn57dg7f5np33d8hmee6kvqa5aq9onpk3bwsjotqvfrb9gi9s53vcj7sup2gq0kd2o7vuh6pya01o',
                name: '6yv86du974t1pjx4anokgpo7u7rx0tibyl9gbwf3jlpyrp3gvzjp7kjw6sljlexmufwva3s3rck35rizoqbzh7qbjktufdw35tdpz8oydxdgq9xuhpnnsjklhm1u2xwaegw62nkpss0nbg6vzwtm0f5nn12cjbdu663nv4y6vyaenl6roz2g15vgbrpn6y5of70o568nlnjdwdfba28ay8e822n2q1y9qj0knl3hxh43qmfcnjy52nppc4tw7sw',
                surname: 'w9yurrz2f59mvnikcrx35gyad7rl6d1p52cyms8x1h1upiwwny0ia8f1f6sycn5fco1h3lpqngvsa4o8vfrhf90nadlzp9rw64sbb1f3jbf4bc1vpn3z39l9dc1rrmv1r9yb3lxjf0c49jpnvmug8aio231e414rpil7n1e3j3lzh5lx95qrqawd6vxu09y04e7ru0jmwtv9zcntr90b87d9nxhn0yc50pzp6ys6f7wn4xqgu0y2d8iqm3oe89y',
                email: '6yej0g9reu156egmytdgr1bdke2rnathe4jp868bco0p74bjil111avkrdsao3am98vjtkuivebj833v9fqvwvcpaoj93gp3v08c1vnycj283l1gzkk5kb6e',
                mobile: 'foq08z4j3thsv37glyja4ea2awddzuaejfhsu02y7inczd94xhf28xovg7s8',
                area: '8ugshfao1g4g7onpaxgcj2tdwpbfb4utzu5vffywditd6x79d0b1outhqrw1oki0cu4bbty4w3q7anpwkdujt002suza8k9utzc41d46jggsv6e12dbluvl0tpvlpee5fw00exe5tdozwyviv6rjgx510ccsyo7pee7j5nw41qnlxe69vne2kyabtxkchifhulwiydxapvxrtppm1atbmvjz7h2qk30f0jrmg1013qnyyrgptfa4u8b6uex86p1',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                tenantCode: 'c0kcvfhjsb93xcwhnnxy59tfj89y0secw24498p8no1ranyvag',
                systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                systemName: 'i8nh0cviw2y4zza983u1',
                roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                roleName: 'rd07dza8c1g86kxg6od2we9tgge9n9cof2ou3a9i4zkck8459olb7x0yxq1zfa2wvcistu6owoez56d0b0tle6f0jj2hjc8l1oazttm2mb3rmkv65fajca41pos2l6sfl30llen95p2sptulhi91anw9chmg7kzbs3sa7hekmku1oaovo2vjo31u0dyz014p4wue50u9cfanhyf5p4fojqzpb7iiq4vv3yu5n52e4ua6k798xqrk44565aq8ggc',
                name: 'v1crxd1p47habmghx3nzncxfubu0jsz1mq66bdf6v0w542g78ly98vkr26nj2b9ms4am2gnmd6ac5ecmninfavx49p5pofw7heq4vryusebt6n8tsiiwf8bihbjfrvanq9wqu760fn361cdigxpjoxrjcxlot04c2mfakejxvnqaq7xqggpce3taobe8f8zp8i6q6kk6ut1yctmg2x2e06fs2ou1put1yg4zjb129ricej8flxm1gsqpmlg14ki',
                surname: 'xcll6h83wgj4i7aaaisz7325zeduyyo9c6gi1rc3thh9jazbfc3oiqtau6oiu529z8xiekw418s8l8a8de05kdqb60toa28oamee5wegozxqot04tpd6u8d80fe67lp4jut7owusl05l9qgcoinagbzgnjb1bpki3fh2sfgks3jj9vygjkmhsvu0rmr7k1zwcrtdujb4lmyukb5z1b8sc87724kxteaa12ex8rha7uoqq63bv3b5hv6e2ofjv6q',
                email: 'bgkklb0kudnrks8s0d3vyyh10vkemseqf628thsi3tl1g0ngoefz5pxx3dpuk4bxp6y2t3cg21012cc3r44ijmzzeu4ikqfcq1bwe0veirinb33bypkalzum',
                mobile: 'gsz1qqtsvdni1zdhqq5jw8g5snzd7zjmxgz3iqtj4he9unraet46htwdxnon',
                area: 'm6ru0azow8h1lsjhjnzzidi9tkgzn6brpa92v8rx74s8505ezz2mgolauzl90xx4j2uvqgdf5b28wiahb7hf6l2c5ge7jv6s9lpxle321schvhlvryf00r0nkh4jshini8mb3kzjzqfiafpylbrr2n16o81as7i7lmaxg100fuixa71mjcyjj7mk8659bq45i7nm84qfvbepdeapiu8e1nx79j8yz1cckg9wslf94shf7ux79ovjl2ny28svcte',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e60c8538-c42a-4b27-8fbb-7f24537caa68'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/e60c8538-c42a-4b27-8fbb-7f24537caa68')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                        id: '21db4554-6495-46d9-8112-5210a339e3fc',
                        tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                        tenantCode: 'ax471mkrtb6e9ujds4qtcd8w9z6gxxapnn8z06926h2tug53py',
                        systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                        systemName: 'akj3pidxaohwcr7a6nkh',
                        roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                        roleName: 'cp5tzloecprk60sjeiblr0ctnigqese8bfdvahdqbh6epms7siuhlruyirenjqze86jne44e75gsxy8h9pxn2acadc3uslp25bxjlnkrkd75vvhyryi02gl0gafu9edt2zkrkbyic5cs5s6xupkkarslyuo9gv2o9ki0ftoiob6conspkh3uc1hl1q9bvhyw5t74bycpntjrutt96dl2x3utn3ly9kqsrkl54ibpyz0avfzaz2srw1pfl4gip5b',
                        name: 'am3itsrnbbn1iwpbkkgq456ugv3ncati8uszep0en1926kazhcqwxz620lywg3scgw7fkyf4mvtgg0z8gx5bq5aukbswpvbxfzr9ngu8c67t1pc7dtisa6g4ih9yvnpv3r555faznhm9nk38s2jvv1ug3y5o99mgtd51c7u4nshswbg43dyzkczgq4vniba2k3u0teefm4rajh6417amxwp9qw6ep5t1g42prz2yxbt778orjimss0skf3f3usd',
                        surname: '9mv9ebm7oe8uve7z3wvoa8oacffvs9sl88sa21hiiuj1f3dlesjx3vpg9i5s991nmgvov2wxp5d8lwb8u290hihc1fmpkplg5v42jr5mswnbq42hc2mx99k866q0m3sw9m4hvgsr04efhqjhvwzbu1vlwucgi7mcl1upqgwj78wv4hep0z790beonf9nfq3dxmun1815i6qhvzec2oh8fj9h6z6uhrwb0rwh8qhd2kwsapkby8fs15u3elileex',
                        email: 'qn8tcz6gb06rw9veb7m96ft44703o1la6iyfzccb0hceomxa94mfgqkq4hnwfpgd04z7i47dyyk2qpiggi0jzxkcg10p5t2iikilwvdt064yyaxgat0b9pp5',
                        mobile: 'ytf70kn9v2gxy6nh09m8nbdu3ndoititowowqsc7t2kyqr7lrttk2wt6dwhs',
                        area: 'zbef9ymj1ld6u05q9ay7xbhczzp6i683vd2c4v7w974ekezkabynd8rv9jaj5sqv29hbbzfa96biyidjqrpb3n67z0fa49ibk2nty98871ilfoqdmk2ngxgp2zmjhy12whaq0bd6n6t4drb0mdplz0kor63yj4r823ya71s0nw3rr1zxkxwi0p3q4ujar3bafcs8e207sk05yp5i90maeyml176pti5udkfcbcxput42kb7h8pqeraneqq92jar',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '21db4554-6495-46d9-8112-5210a339e3fc');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'e60c8538-c42a-4b27-8fbb-7f24537caa68'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('e60c8538-c42a-4b27-8fbb-7f24537caa68');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('e60c8538-c42a-4b27-8fbb-7f24537caa68');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                        
                        id: 'f40d4d24-c008-4b83-aa09-0a0c0166ebdb',
                        tenantId: '5955b3f5-4c4a-445e-a088-507b57341fa3',
                        tenantCode: '3wir7vy07280cjm5lmqts7g6ylojg5ppn1qbbci7y61whqg3iu',
                        systemId: '36224fae-42b5-4db2-8da8-562646523d07',
                        systemName: 'e5on0drxfpv5865j8e9l',
                        roleId: '0d79ced0-331a-4ce3-90b1-e5ac8a498cb7',
                        roleName: '7gv79t3jobwezbxdleh6fq9tu6418j50ts9glvgkuo1z4p5alpe9vpwp8yce41h2slk9gyutw4tzcbwj3nur4kr9u1yuuzjsaegsk10c0v953eqxmez2tjndbg7upekvb3qxtquzkp87zgu7qnm2jwjip0pczcczl1elyv5o1gfx9l5fe1yw4hku4n7jpnos1tpc8gy3zgig4c81lc13jj4xj8n7hx6gcfqjrw9inc6tswdyqqldffamb96hyza',
                        name: '0ej6ff36vxdpnz4ljrxbtunanb9bazur774y4gi89285cxr4fehxt2dis0bix1831lpj18zh32dkn0c1c8okjm927qqmmampnx29xrvbv9o9mb6p08fmi8uct1brkqkchyal0k03njrsovs52siz91oriklkok0m6f8bm2gzglq82h7ir1kfurh9tpyy10hwmbmybrrg81dvzurnuus3aya0dx0jkbygis2amshh4mmoaiw8zzad1jzod943roe',
                        surname: 'oqoq4254guy3fp0cmejy8row0wgad1qg95t5an2jzoqs135ecr887vgsxoopf3ye8qpkyac0mfc3g73uxcn422zrbt9i9gpub7rh62w7nbrkb007hnsiob6t0txp7dfccr3bynpiwssftn5isnsio2rtgunmq4s10m5g08zx76odbt1mtg24uy3qbniwziy8y7qxwrn28ekgem9ibei31bvaol2546c002u8nzva9d7pdyakae0r7tp1ktj8h7r',
                        email: 'j6qqhl0q6bohotp1btygh63fz6fp5dew6fa1iwp52waz2y4ol2kdskwgcu5fqojp22330nk380h0pqfhj5abb2bmfwka0nfyzqan6ci91x8cdlgy9fdpdcmo',
                        mobile: 'qz2lb2287nzq4nqwtraofmkykd51u58fgt0fjg4degw1ixsroyqhkcsv27n7',
                        area: 'mfqb9b6h5f2ftkc47jiiuzpxv3ocfc51043uei291vj938quez9rmhfdjte4i7r6bnizsprzx64wygw1a2tvtum9vfjpnq35zfc0b17quqyr7k7fcmwzir45s1786ppaglmbdrpkktab0l9mkierfdwkosl0vxwsibdxtajnkxtu20nz46rj51hbdzmvzkyql0cqsoqso3i8c0nj9rvu3ma4dl1m61owa14avd3h15ahhlgwfjni4gkivg0l66b',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                        
                        id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68',
                        tenantId: 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2',
                        tenantCode: 'zb2q71corc9y9id9mrrfhmpg885n4tqrspq9htv3v6acv50xxq',
                        systemId: 'bf65679f-14bb-497a-9015-7e5b17016c69',
                        systemName: 'trtcdkqawt22ixv9quq4',
                        roleId: '16574f2a-6689-4135-bead-3d85d50e2c05',
                        roleName: 'pemhe9oseqe8j7ckmhdgbvkrn1qx61sqivpc6ixq6fua9kyv72p80jcj67fiv5uznwy8viqu82wqag10z7b2h2asvr03sc1xlrl71jfcjwdwa0brw5rubcrva9xjqv3j24eggflv0i0ptuad3forrin2zebx243h6wivlcikd9lraq1zk5jmjhmfi36o8d63u96wo2vgdlyq8owvuu3a9oimnzwqp8xp6g6ht91j1hjdtqxqt6mgzluyguf5t4k',
                        name: 'gf8i3lsj30f3dremhwd1kxkno0at89cqj7zhhcricmxu9vrqa4ky1213a9tusucg9kbvgpnbuo5bjxpm8n4undiiqpidd3rjd570a9ql0v2yr1qvayodnenfgkd13gfxu4l5fnc6tk4u4qadrgmeh8rwo873xscljb1ejmah8sdulkw7us1dguxiscfr8nrhf2eajltn8dkvuv8q8e77i74e6ivz676xv9mjxez1pll1jdwrpbj9ohght4rvw0y',
                        surname: 'jyiw12skpm12b3ap9x5b6wq95q8y2rckiaa5d6lpr2l93idi8kaqlqubg80bwcnjhchnuitmgscy3eb5a6bkenp9m8jv3fbnst4vprop7evyhnjt8e7brnk9n730727xk1qmkytcoihruvn23kzvh8alca9hqqjv8v1rlr3uyajnvmzwzvwfpndi83ouvglmfaw2wr5ow8w2e8uqvuv3g3ykbjzewalzdrcbbx3s7d80878w0wrssdwbbp34azm',
                        email: 'olnxf5i3a5wux2rg77xvv0alhdqk7akezutsyb1dpd5g9ogpfvi7tby7lubxiuuvjx6x3rb0f9x56344a5ude1kfhmf48fju0d86wkco9mh4ko7qye40mzdg',
                        mobile: 'e5em6qaash60o59bswjki9u1worrl8ye8i1mzlac4ugt5s1iasilne6z9oj2',
                        area: 'cpnn5hzn4ucp1c32bwii70c5qrlxu13xv2qej1ypchtna2syoungczf94oxnl9ct5ld83xry6jo6br63dq8b4z638j0pbogug6lrnvmnff45om0lnvweyb3908gkka4sazgfx9ozpnt3te5kupamc9j08xbn5au23rji3w2t7a9iozw1p9728rhbyffbc93e6797b65m71d7zydcsy5hm39g7mw8bm961rkmgawkoir37shi8c1qax3jtnjcf84',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('e60c8538-c42a-4b27-8fbb-7f24537caa68');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
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
                    id: 'e60c8538-c42a-4b27-8fbb-7f24537caa68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('e60c8538-c42a-4b27-8fbb-7f24537caa68');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});