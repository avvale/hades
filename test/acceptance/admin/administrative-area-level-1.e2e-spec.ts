import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;

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
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'qwpzq88j',
                customCode: 'jjjp20xa3g',
                name: 'wgh6opc60w345gb05puy3ua2pteaqlb6yjjlou4wc8qqxkiwzhvspjh3kua9dq7z6blu1t74wz98b6bn73hds4jbd26oj2zhu1c3xcyiw3nk0zmxrfmwj5zvnt1t7vt1yy7rrojkh2vh2szzoxw258y4ez6lyf7t52iq3inaaws41t24p4w6rokgqwpdwbetvfs0mnuike90m76dhzo2gofrb5mykr5zsvxydpe4s0afonvnu8e5czf2wy5gnr9',
                slug: '61mfrbcuq09x9qcloedwxd5yhme96mw4covujw4umq5zq10c4evnpjmr1cutds9vuzkl0gt0izx7fvr4c7jt204qa62asqubr0vfi9xqv6zg0gavx6wzc5hgiaa6h5fk6fe4j2omvjy4hphh2223v12n5k82xy7nfy7bp4q7fx256ebt4d3fvum0qbqsn3347zb0cv49tcdmzkdunc9qjanqeow5bw146exlhm1iexmnd93t7g59wezrk94h82w',
                latitude: 693.31,
                longitude: 51.62,
                zoom: 99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'encfj044',
                customCode: '4u9n5c988z',
                name: 'ng43eif5mar8i9gfjdvidxiky9tgnd2ukwublufyv6a54d8gv2r8x9z56roy626n79djnso7rv9z68iff7im15okvfwcvdr23a6pezy644vhc3ithltxee0contrj1pnoghlfingyxnnjvd5dd6l7cmi16yg86rbqz24dfyt6kd70byv92z6dbkj45jg91gb9vn49oghjjs4qt0czu5bz8ro0selr1wswsdki0mhn5v9d91hubbah14p23eeq3f',
                slug: 'rys1ya1ufk1fllgazi3epluhhof5ip4qjpi7qv3dtgowja5anvackt62vvoz0qrnt6rflaa6n7t3q32nk8y6l6k5t0i4ii5idq8h6gwn1qdfze2nngxe03nwbgdij3hyztl98c4g95gkxtz9bted41k3h5mh48lrbp7f9wwn6pr6cf6knvnytp7rt163877v5o7e18qz8uneq40704hewk6dzy32ygec4x5hvqec8aj9f5qaau07jeihak50izf',
                latitude: 632.30,
                longitude: 317.78,
                zoom: 56,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: null,
                code: 'u4dw5cik',
                customCode: 'u435sirrbo',
                name: 'zm6hmqz9f7q8yxby2l4zuwxtdnmy3iauja4xnzd2vn4vb6hfucb4y7z21v6jpgdmid44b5jlkyq1upvpufcbpq58z2krco95g4fp1lifdq8dzznoy6wh7kmeekwr4dzs4e89438noy319z05cjpc60a8bc2tnxbv1p4ue1mbcs9yzxzq9h8rry6awbjd9vv4asw5jfspcdu8rks9hbocv960xtjncbhoqpelxnfo7j4b3ejbopdcxtopjtadeu1',
                slug: '9ldvb6d2fe12kq9aqtvqb8xwp6u6kd0evqpwbcgj995rzmqq0i80907w7che8rq2sj1ms2kdctxijbfqcy55xpvpqs5ev2tkvbismukjyf7oui17jyp1bh5e94kfo60cq79tfz9lrzigmigvvmma9fxlj2c81u3b8so6035yf99syvew353gorb607zdcuys4jt52fvi7tr9nlsvvfs5liji75h917e7eefnsmdh9z38fnvi59m41qh8zrsff63',
                latitude: 818.69,
                longitude: 428.02,
                zoom: 85,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                
                code: 'b54tlspc',
                customCode: 'p6c7oo7g3t',
                name: 'k03fp0mqy0swd6odco9fy156zemyfh4uu912obpxn01qi4y0xqnb6xjs7ad4sv27ndc2vh15583dvlotsmn8fd3pwh4m2igjv7j7e7saloszy7u28zjs7cjby1a0q6myxv3cp3t73wnwo22l9brf7zgyhi60yzjncxngjwkoejumtg2usp6eqwqk28xtzr9foa1jvroxx1q6k724662vkt52no0huz1leillci8roxzjg70kufhqbvamhr7ysij',
                slug: '28j818l5kb1potfozwxfls2d9b4e0m0k0qqvlkvqxem4ixlulb5zf7hb5mvyc9gn3v5oawvlp1mugqzuhnmdzunkhxv4nfhw8lwgo0h09leedr5kv69iqx72cjeo2u0kqfm7cj5lx150xemj7z9fivqyraqb2an9wbg2lprdkzmgus5qso6azak6xrfpzr1t3s5jbewwedp2jevgltr01oxdyvqd0rouxzwvag0k2tazusnslx1ps8dl0f16jtb',
                latitude: 749.59,
                longitude: 664.07,
                zoom: 59,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: null,
                customCode: 'hsq7s8yp40',
                name: 'oqqfq1xv8bhqqwxb7vl3jhkzqmpifs13x1qwnogdqw40q1qr45pesa2d0ztcail8c38ozrkhherkxdmxip697xk8n2nzj0yz46wzn3r5k5y9gmyk36li1c8e9e2vly3v0pdh1boakg2s5byt7m6s9kxf7xsn726ikxjom2golvxqqdt5msp7xmnjf3fzqzk63978hfxhn48602fle8faa15hgnrahhmui4mhyxpv3z3xahg6hbib6gjb7h77j7r',
                slug: '5so7puk0vk9x7jjb7ro813j0g16g6yck2hxyyo6gytr74my21j970zix35osyr1txwx48jc2q77pwz3od9rmvk5cpr3xus8ww0u5nsxbaf9o6m6lpawr3ubg1l8yelungmcr8j7cj33xoqx7v8n0xj9r4j6jmu5izc45v5komhv8qc3an25ftvl1k8ucjyu58pkuy7xx5w2fx2evophmp5jv3odpuwh5ij9wegg7a579i8mrh0e3qv12kmuzsvl',
                latitude: 957.51,
                longitude: 771.46,
                zoom: 53,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                
                customCode: '52v0c1f93m',
                name: 'vty8e1iaagtczwqxibdf73j7w3tr3tw5ksim4clqv94l3h3rql4iit54epz1kai2uju9omjqqiae30atq5oyo7ab02aonilg2jtuioqttxotn385sllhjn6hj7grcr7awj60q09m85p35t2axhj5z1mxczimcrv0c26s9co48r4gewq1csty45yfr9p0jf83phkb7xrchsx093a2jbzs4p2f7pdrkm4osux7776tv949i8gx0gcpcbhurh2vat5',
                slug: 'iq12u4dc6c8vnfar0nu5s4pu8lngyf7znchdl5nptdzzuslx7rywpsascfb0dynxzzppfq7ym0ii73ty4zzgo54v380rz10u33uwsu5568r337qb10kpt6a9wf08ztuwfogrx16nx3ii0xo5ydyv7xlxhucmx3fcunsh7kbxfcxgrovmi6jh50wwlsikltuehymz03daq9zbo0wt2h9l1n65i9vvtxlnxcs1r19rdfhtzhqqt4216l78f1km72d',
                latitude: 982.61,
                longitude: 208.97,
                zoom: 70,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: '2vvpz7l2',
                customCode: 't3yrc3vlx2',
                name: null,
                slug: 'l025d7cwt8jwgivshmbo928ywikwb0vr190tl2k588vvqbn06509t11zkg6kibk0w0sjvpxrbnn5buk1wv4dczvhwezg1lqpizaylpptbu97n2n8p02olv3j1jotu9ssobl8c1o1mq6n4p48uy7ap5zw6capxnycs3wdqgbssj5krpg7g2ch21nze8y6ggl49el90qqymaomr69smbl3r3a5xstuavmlijavq7r6i8p89uy2smb86135i98uzz4',
                latitude: 967.68,
                longitude: 584.24,
                zoom: 72,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'qi0ixll6',
                customCode: 'qy214x1aun',
                
                slug: 'jjisui0tg75afn53phyk04hvfkw6bchoyjctmyp3m1mtdoriagcrrequ6yo5hdsxahmiuechqg0lu5davsg3kiwzj0zt5ol3obrrb001i9dobfgebdgxf85xjj6pue4d1g0wd0j52funmd361j06an5mnncvjmr5dtukyerr7vqbzmodwu38dnrq5idxzmwj8pjl4c5sk63aq8n7598565pgo4fsmoo8pn49pzp5ojfrltuakqadpzjqf4zwwtn',
                latitude: 923.22,
                longitude: 154.41,
                zoom: 61,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: '7xtl07qw',
                customCode: 'tvq8ktle7p',
                name: 'g12jl0e3tk81hk3hvzclt1cdk8ez909ew4130te9lna3xlzbd6l9kha2kyf8t86gh1arx55yax4w30q1iof65fdbl2j4mj173ifxo91ofnj53j9169nfr3g2z3thh8h6pz392hg0c9q2jys7wvlkt33axrr3s645rl2xg1gt4bqs3xfs1n0l6uv5t64wy5c5japcqbu7oqf1ei10dpeyilwuenzz1wo90jirsvo5206ufa8gt9cg9wnx8rqzvtq',
                slug: null,
                latitude: 526.18,
                longitude: 532.62,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: '11pojszr',
                customCode: '5z16stpu7h',
                name: '3pe4tx3cyq2y9tu97fxd2buvfmpdwajonaw8wpnipcm88lmd0xquxkz4dzed3g8bw61ylc9trstltrr52ql2jgcdyg6ti7kwd90pnf2x7drz0l88arc4z5fzn0bhrmi17jw17zsc78b1nwp2qrgywlyh98w7whopteg3lxmdukwwbll8luhau1y0vx67hjxdf07u459ngdi8edq7dsffzt6o7o5tuzuy3ano5vn068txhfrdxwaeimseeh7i28z',
                
                latitude: 777.00,
                longitude: 645.70,
                zoom: 46,
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
            .send({
                id: 'zk94ylccty6ua35tngi1m47gf4epzwwaznbtl',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'gv1lrw6l',
                customCode: '1zdtldnfdt',
                name: 'ykkmpzvfnhey9kky555xyvgr3sybnlkaj7gigaxl8ymblzf3eszsxk04earptnlciw1oe6laxcupgik6pjug46tb00lu8yp9t2kpydpg3b1ijp5ndrph3auqw4j7t8rl7s4j8l2gknq51sypek3w29wyp263compo9ovacamj2818rrx3633sgbnnvoy16o40qjpukffygp1mlwwkaohnhq0w4s6n1t60e1f17ol3e9zw3o0tbbv72ptrlsy9oq',
                slug: 'iz5q8dzj02zkq7fvid5eaidt0ppuzo5ws8k7vmgnl3mevje1z24fif7fmh005x0xp1mvoybfoz0qwh4fif600mrcsmy3r1xuwy494tkffb3oofppuqejd956mmakcxuwwg2rwqs6t1hew3jldv1knb3xq7tsj84aos3p0pz5regoqp875bjybt59ynbknc08b53ay66nkyhkfq0xdtwmdojcpt0pbvosac1v6csln6hhuzzad3jvmsls7d3wvkv',
                latitude: 249.55,
                longitude: 216.91,
                zoom: 68,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'd15qqmozvpgbhjqyjbsoctejk0klcm9x2qr1q',
                code: 'ib6dozbj',
                customCode: 'illrrig4o6',
                name: '2npw3o5l420ilghwrflpksz8b1v8e7g50mnfggxqev2hd3d0svbpfdjlze5ssn5wql3215u5s0yz888ogxnph111gscale3ctox0nyphd0x7gmt5zb6hsdbas7qx0mpg7ubcfx5em4pplnw8a4vgih9oe54e4snxq6f1gmlw0640rtqbdfjdwk7ssvj7oqifip3vjy74ugawclyze5fxw5tpe2tvuznk50ahum96s0czuda06uso7p5c4jexf7x',
                slug: 'c0kwtypddaur5ii6bpx21f9c8a684zxwc61vy46rg6es94lffswmuecs9v60mz2lz1bz5angm2vwynpw2c5pq5hmm2vhec426saupyxr4p8wtrkgbpqhbqnilkot99i2zq3f62gnkq1i1dn7ohuhem3vdcabxnp4lsudiafhqahrl9dymiy5592p5zji62ufnb7vp96apy2zsf2aul87hiexh5vbvevpuvrsbpbfr0tsomvmu2tfj6sywux7288',
                latitude: 571.14,
                longitude: 678.43,
                zoom: 91,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'lfnqnj2u9',
                customCode: '4cre2j2e5i',
                name: 'mvackhj8pmylb13784ofnukhscpkojah3nfupnac7wcnklvsgqmuakkabugrggdi1rdk4enraozt3279yspc49hrkghaphxm4doyo5lpv2r0ip5dgwbb3crrjdd3vq145wqlrac97p5yizcrxw7fqohh51hw05blfvoorao7snpmh29l08jeanpmue98we9pt41ic76oggmzq524g2gs239nll8pti34k34y6nila7fbx120h9pyrq68uw10g6t',
                slug: 'icctqvtq4bz2a4ajawd37suk7oruve63b29carrfxlqqmlbbobiupijge1r6iwpm0lf49dg50y10re1xkmhsz0coky3o066c9bfabxxc67ktbxrdaf6l7fe452u7aiz5j197ru2j0n1amjsf6j5v27rv60kolv24sg4s16bdlpcqzi0xhzxuhb2vle77vlpg5ixx6b7tr5wko9qge4w3vblw7h9be3zxj4rki4w7kdcf91c6am6s60d6a70astq',
                latitude: 938.14,
                longitude: 937.06,
                zoom: 55,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'ywuhlqxn',
                customCode: 'alsxvy6qjxy',
                name: 'h676l3lj3hp9pnzem0tkn6uniydf9jgb9690qobd802gmp353se2z4ghk4it140y3diie7ukk4utfditxx4g2jpd6dhi2zrd3c5h91y1xzefsejljtpwmaq1t0v4us8je53nf7vleqmgamqeryjtw2c00gy0uym0231a0x2lj3yx2u55lrly82r6tic4ro9ke63x6i1uo8kikmob1sw40942ezt7cgyhc5tm26sgsddoy0ksgc4nr378iww5sfw',
                slug: 'u1ake16mwo1jza2fwfdwqzjawe51ts884240glquzi2x2qs4w6ltshcpvlur5irzlkvix1b45tirdqzmle2e8ui2efuul678bdkiy6ca7pl1dyeclp4abl2sulcpbm9kj6apnwxys2enaep8uox9so7maew4z1kiycpybk8krjlm24ap0q67g8ef1adaodiy8qazfw1frlae2vhf9s9n4m8pyu5k5ekxxxx564stm749pgy0grnb4mzy40nx180',
                latitude: 597.41,
                longitude: 526.00,
                zoom: 24,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'm5tf2yh4',
                customCode: 'j6s4ctghih',
                name: 'vuuhbxao9qtzfe3jbxzkvb3orirg2dehvixtjy87wzoqftl84v4bf6jdo92td84ynsdutwq68wdzte8jye7jd7lnn16jl78jxh5zbhgd2ksn3i2pzgcd7ga6oa5gwjwvpufzxh66186r41opu8hk6q0ftta8dxnwn8w0a4ucb10ke6h67pzvtz24cpt8x0oaeea5ze0x4my36zkuenntbkdmdelso1cmmdgn6ox7b6owqsx9qkb2y98pz1hcn4ft',
                slug: '75ac96cckxoc54ins5gmosu8w3ba3vrr3zui164f42mrdk71qei46c9ccnew2sjmrcdtwx0j567it58aodew9q9e2npk7h5c5tvku2r8u5haawbzp5nyc3sz47l10z10aef7hq5yae2j20o0p7pktjclcazvegqrfuh51xbrgii77h4mtev3s5yisuxpvm5td5s4eiezi4r6necl8zhjgugqqhfceklzyyao29doelj7g2sldalluam8i7lnfw2',
                latitude: 123.10,
                longitude: 300.07,
                zoom: 77,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'eiwatmx3',
                customCode: '8lw6vqpjaj',
                name: 'bsdk5mjpqn35toeg9ufsffbf7rw1nh163l8uq08sb2jwrxndjbrvjl4qobw00tdu4emkwvt36tmcq0e555bmc7hw31yzo88eb05jiacsp2zaji8ocbgrrc0rvelkxdo82ufdkfylzdcxm91vrxdlgacdwvrsh49b3toggwngjt1f7oxdbzd3zg9tmx7m2g8wl6i6pea6b14vsl7h2mlv0am11jk7eiss7m2iq4m8cavi0e5k3z3vb4jf6yxaanu',
                slug: 'ylfdg8el7ovxwzyo00i22ik16cqnczv31cxry0xeqa6gv5vpj80dg1t4768n1aee5qy109fsxfyopsibji2ku71durrz494rmuvvn6rmmo5hew7hiysoaadnogg15wdvlch9gg7li70ks8q0p2d9tac5n2mz6bpx0ueomx1ig7ngqz9mkky21239nemetbaro31x8plppd1mcvxwtu2kaq93umzv9dzklv2vjx0qaq2jruhrbfhmahlwrenjrawb',
                latitude: 84.43,
                longitude: 343.48,
                zoom: 40,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'fez6kyvl',
                customCode: 'civ9fep9b1',
                name: 'mphymj3p8oktwsxtmuulikguq6yhbeq34s5kd6rmabygprl38xj1v3mjy17iama2bn4cen11f5y2tdbf4xltrhn87ujq63hbj4n6zja8lv4z6ntnzzufcws88ptiaco5jqhczhr9ysn0433r37zclprhwu7l7o3pubsfrl5wwzkosf8rgr2i04kuucv5uatvl1rw36zi3a19rzpwsdt3mjl26ucvqsvl03cp4x1c8e9ud7kiukvtfudi9zr8rzy',
                slug: 'w32l9pf5u3z85e39u7mqtv38lw8yzemmr5cr3p04c04sal285c0fvok3g3tgi8wzmqpif18aln0d2gv2g1s6cbqk0ufq0mp7jf6flvndwyt33586nw38uor5lufb1yc85ciey7hhlhwniatkbdj0t2s9redcl3krq7pymmkf3992tv7viljuwc25uysxemcwpszp2b3al9jutz25g2y9nzewcj1sws3gv06ewzib8kx02efd49xo5cyvnix7wmn',
                latitude: 210.29,
                longitude: 594.76,
                zoom: 15,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'gnzsnya6',
                customCode: 'myx0b2ejy6',
                name: 'vtp9nm32o6e5wvh5e9plh8oshkexlzpreicfpvgmnuu48trs9aqz7h2tclc8xepu0d4pzlpxf84liurxgc2pxsrijxst157r09m8nkyb5ueh6rqr99f5fzwdc1bn63mhx38fyeaqn2xg6kdmvr49va9i4bq0n26gnqymq3s1gnfonvmtahbusvp9eqe0271yzvw2btfa97h7h2uy1ovhv8w59nrn7s3qwkg00d232ti3om2n8c6ghmzuz6oq8k1',
                slug: '17ycroit6whh671o8nd85eth8z9s2tkd6wcyixo62a394857g5179k4hch956euehujux5je6jzzmmx0qw2euwkccq4s489bu5gf14yev95ji70f8ev0576xr507lfnlt6t74gb0f7v9dlx4m2jc99ty69vm26ng6h5fkbx0n20awommgqpoo9tv6dx8cehnoewcehlqmhhvgijmpflucx83vdnr6fk5z4ehezn2ly0hq16zvw1rx36php47on0',
                latitude: 935.57,
                longitude: 823.60,
                zoom: 92,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'm8yb3vn0',
                customCode: 'dsvujkb0wx',
                name: 'y17a2hgqqib64sbpoflj0pkk73y8ql1cekstav0oqc552su54v5ju9l8upqbf14axa07cu3oyiaicylf3lyri4miieeixn7rv1dzl0922orni32k3kcifr1j262pmxonf7wunif62vei9cdb5cl8n5ls7yitnzdc662jxtzimkm54k6x614ra5piaxs5adgcriy8jqgrb1jvc832k3mc3faqe7p07dzlu7uexyzcy3n9vpml7lvefk9t98o4o3z',
                slug: 'ayvpi1zl0nuh04eixjj7ogen4xuc1zk93wdbf544opv5f33g0p3j71u54hfdr5zdbsic7o786ge3d0p9gldsf8vxshnonstgv866nqq806dcvhnv6rpivdchxja98jnpd248c8g8hw43ghpuzh2idj7dtih5simoc3vc4ijrinlwzskf2eveedg5kaubnfpwf4h3t3j6x5skuj4mqy0xx6273ew3f6f4atg2olfrgkj7g1g4frumpqcbv53ptqz',
                latitude: 327.07,
                longitude: 298.57,
                zoom: 251,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: '1cep7nit',
                customCode: '3a8xlt9jeb',
                name: 'd2ezdw8k4xjmopcattylhpbd0cd1qc0gyw0b8ha8yt1nirdqi0kxsrkqsj1ezsht7dpg00hjaex5wvwickpawe7uiyzfnlm78ngwsxprxpncwhkokv2oa3vjv9vwxls7b3una393x5t3u3p6ptuupmavkkxzliq5cgfpg13hb81gfq2tg9um9ju509hkt4u3rard3hsq5pg52n7gzjeuuh1yqedwpd4cyzgcs2zvao5mcwu8bh84ydd24mdcuaa',
                slug: 'qb2qlkza9tinbodlf19yxmh3u8i6id9p6aci2zbja00c39nrejgfsefyct7nxxvc0e0flhz3svhm2t5xywe55yy1io415bpx992cansrqngbpudcr3oh3ip55xlz0kjo2iueqhw5tk6n6behwdto8sagyofyyy2c4l2oy70b9i5jk89d2a6bhekgubic94ru8ur6hyoef2keduei5308j7accmrrs0w8ku6m4rq7sti9jqhu925bl1olt8erj71',
                latitude: 736.54,
                longitude: 252.93,
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
            .send({
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'sm5ecqnn',
                customCode: 'gec0hr5b34',
                name: 'mc7lzra0g72ya7yia2mv0juz199w9g7z12n2karsawetomxhtyou1fxx41nok3nhzag4pynohoqio8of9noo2m0p1yzrfhbxd2fl8eh2nuvwxj3zkci9agutyoa3hacman45ghm06m4ijad9hw2wf8fvve0cgr0bd69vgpp37ai2qiyzrh1enor6w4vsn5zaz4nytp4h3jqjr8fwmf8duuyjrztar95f7fqii0ptq3i4gq6gho9vqquttciuywr',
                slug: '6dtwi3yq8ibd4fcrnyjhsv1svxtnswysetq2tzxaqac94y4m8c5gg2k5xkvk6dnu9y2jlx4nzgcwvuvsy6tq9daxfp7jos2z139c5nig1ta66p4tufvt2n2z3omz59vxr7lgcqzv01im3xwcyddc8zkiq83wrnz3i12rrfxhmnas9kdzc05cjysj3v4ul5nijq1beyezc5vofjg6yqjkyrb76i49eta92hd029pl9htq4x4vzhiceyobjrmqq0m',
                latitude: 545.24,
                longitude: 687.59,
                zoom: 75,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
            .set('Accept', 'application/json')
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '43afb97d-276a-4d47-927d-17bdf591c485'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/10a2a149-d87a-4ad6-8b3d-103d4cda5e50')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/128c01a9-4887-4bcc-8e1c-03cd08c8c0dd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '43990c55-e0a2-41f3-beb2-9fce9c91fa52',
                countryCommonId: '36f48b0e-09fe-4b3b-ac2a-b166894f8a8c',
                code: '7ivbftmz',
                customCode: 'un7wcxjkop',
                name: 'e54w3n54acwa491u5yvanqvrz2g3tzc8og9gus860704o1qn0wb4qsqmiwr32loxxlkokw07jfu6cot3kcuvl3t9o347xt4twore8nzlo0xhuaumy2r21qw07g5jlk86lddgrarcw0x9js7stnot50w2r5lmgh8219b8rpvk8ni3b48aki6xgq70r1kqzjjno924fw0gnytrovhd01b0sopvljjthkh2ub40xx63nrlvb2es3kulqwljb2n8c03',
                slug: 'bqapclvb1g88yomoe4chcd96u4uoirf1jb0gzl4sj6ungf8zvpywu9g8909efjlpietuxikixt4zeu8k1cje0mls87vob2nhy2tt6lbq303ljccgghaoep4u67jmxpdll7htjytcrrs13rhv1bgn2ibnpdsw0n72t7cxx14t7bg5papnbc327usd8wuiu42ehgiznvl8x27977h2sagz8qxviqnt0jo03l4aippt6t9klf78bien09vowkrt3r5',
                latitude: 619.54,
                longitude: 18.42,
                zoom: 55,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                code: 'xty4t0u8',
                customCode: 'v7mlf3irxc',
                name: 'eefgihwjolibxx6h12xgawjr53rq2dl651bcig2jd75ufzmhqt05iruxswsn07kaa3jxsexn335rm9djmphh0zz2pzb84yttzmcwwt3iog7vbj2qomw9zcvsskku1pqsmiy65dg6shtx75hc835w4wbfazedpoe4wwf8wgriy35pqlns0dmrkovrnjw31m8s5bctdfrd0lnjqkbd5hb5qf41qcufdswnpr16ehwbws9g77bzyx6399653vbzqbk',
                slug: 't4s4xg1er1pt7olu5ajphofnk7hd08q84js6z92ar8f9g7zs0k6h8ylk3je1egcekzjjgmuj5l2jcyrnz8m125jx7u7jm8r7zc3nuwxx6q706nn8553f85wrmegt0ntscvqvcwfgalux17m4wjnonpazcwg5dt1iwv52rbz1tyx7oyecqtbpj5gf7sufxj43znfdrgxcohdamnju7uefpr57v8bfxp3gnbknjbde8yq1enlz8fzhzvfiryj2b6u',
                latitude: 850.21,
                longitude: 991.97,
                zoom: 69,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/ba148ab4-7ad5-49b6-b4c1-efe15998c387')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/128c01a9-4887-4bcc-8e1c-03cd08c8c0dd')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a7c7edc7-038f-4af8-ab6f-74823ce1e8df',
                        countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                        code: 'fl4okvzl',
                        customCode: 'wqaxlt7iww',
                        name: 'h239182a4y3ba0zxh739tjn5v9ej8n1j4gwytxb9c125vhgpl8z8fw26bhg8kec8hy9d2i3dmvn109x3amz7ipbhkn9ozktiuumw7otrcb5ivzwh3ai6qwzltx023m5jwjdwijwixtkymt8req59c89w7lxl5q5i8ue88r53kkzou8t45tdy21k17rebxjkd8ybkmdizfkl2mks197h5xcu11bvzhgegyihc57v6ebczqsj62dm6yisw8tme36a',
                        slug: 'c7oplt4ow80eil1605n4qt2ec3aonfvj2trw3swpot6smq4bzyflsfki5y4l3es7rugoldwzh57fkru8ry3q9vzcli156wjbziptsch7m4cmim2zdwdk20bauubiicjudku2lcysk6eldv0voh52x74g1jjpqmhkw9h64na3ex03ne1wyv3drj837wsuemw6p9fagewi4kntypjtt1xyc4v80hek7zq5esbhwn8yoyq762m2weicj2m128ik154',
                        latitude: 953.92,
                        longitude: 345.65,
                        zoom: 93,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'a7c7edc7-038f-4af8-ab6f-74823ce1e8df');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: 'd08e3ede-788c-484a-a881-edc47d643c04'
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
                            id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('128c01a9-4887-4bcc-8e1c-03cd08c8c0dd');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '5d85fcd1-cb7f-43a2-b19e-321b157ed3d1'
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
                    id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('128c01a9-4887-4bcc-8e1c-03cd08c8c0dd');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '56a9147f-96af-4721-8711-e468d7fae692',
                        countryCommonId: '9389afba-4e88-4da5-94b8-98d4f4f2eaae',
                        code: 'l6o93do2',
                        customCode: '9yhox4yxsi',
                        name: '64vlnjfw4mcbgv4aolsog182524rql1ws4lj5gsi61xp6k49ojysvj8lvkyeciidp58fustvwyctdyc3cufycnskknvsrgivaudu9u4f6in0dg1fbenlk8j7mu2waz0rerzzpjspgg1uzr9i6lmvm637u5uqbkzga8pk3k174sexp4uq64lk9aq5dhbz2alhyy1qkff495g1yhp6i9u9wb0hhsyahjz3qhube7vqfsvn8qm3jgsn0gvd8dt4now',
                        slug: 'r7hggjpoi445wnjuzdmiuxuvs99870ewngsexbnfq039glrpvpwtkon72qdxn80hsz195522ooqqz9x8c1dittdbewzasftf2kgqvb1scyvw4uhco1ouxfknmlg0c971dhp7dm0498j3r1iitktq6eirk0gjkjpyoyqv0q9ophlz6wgqwd4hbc57op7zx08lq8dwvw81tp7ehrndxw9dwzpoblbzh25qvsqnbqfxwg3ta6cqvjuq39hpvr9di53',
                        latitude: 440.24,
                        longitude: 820.16,
                        zoom: 49,
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
                        
                        id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd',
                        countryCommonId: 'cbb7d02f-eb63-426d-968e-23c2b44daa1d',
                        code: 'aau55ug9',
                        customCode: 'vysn2bt4ho',
                        name: 'm01a30dyj019ydmgm7q5bkvwn66p0emons8c8rx5hzg60xveyqgp14mqvfczizv94ovx0lhtbt9gz9bhuhoyn14zz74ibqf76loog6akn9y08yfcv6ugdkq3gd7vm943jcfikxuv5d2hm9cpmojyd41eg7g4n21blhxddqmoq3vyd4v94y7krno2xp175b6zonje8xvda2s5dkpn60pn1f4rj9eh9871f5s3ebylco57s40ngikkkc3qi021uxn',
                        slug: '18x38krxl9jqai5r15i6p8th2jtds9hmhiyvkyi2a1q6kiu131r6ymez8f64hibi0eadoq9tyqi3zx0832hnpm2f3z9ib1nhrbujnnxwfagy8z72rugnnz3g6m2oq9dvq9zn3qvwz8u4sprojja98icgfmb1lc50cahli87r4l046nheggedahjprmzvk38jbzt7l3dcytbv5lr5uiqm8prgvtz98bpmmajjpxxif5ufiq16gojl10znf5sxu3q',
                        latitude: 747.84,
                        longitude: 825.37,
                        zoom: 88,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('128c01a9-4887-4bcc-8e1c-03cd08c8c0dd');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'c745dc80-1914-4b78-b4f0-9099574880a9'
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
                    id: '128c01a9-4887-4bcc-8e1c-03cd08c8c0dd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('128c01a9-4887-4bcc-8e1c-03cd08c8c0dd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});