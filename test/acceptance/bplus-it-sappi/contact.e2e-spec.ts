import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'cdb8sza9t5f17jtfgjt8',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '6tonk45yrax8zvdlljk31wqivg82m102j0rsrhwqemt4y16pgdsflxkba8fprqfpgburrmtsy8eejy1szc24nk3ef968lhq0obv9mkxm3qv4r1gkzgfw86k7tqpn9re2a5lfkgrl64fkgqlyvzfqj3yfpxnyqq7tyhfltw72f21ry2m4d5rzxy16alqt16nc7qyw7dytzm3tnvtn9541swpkh2g20nqlmnwg5wsnbxsbhaozl6cdgarjig43aee',
                name: 'd3rf3szt2sbqrw5wpbrtq80vc0xo2n7l59aaxjy5bqzutkp7946j8s0qwxmau56z6j41vo649f6u07dvl3r00acc7wca1lza62hgcw2cfbmc3r4dgxo3e2d0z7q1hb43regi0cqn1sutel9p10kqkt4uhhs5vvs3w5bxos4l716pjgmosgb1s03d5259kmtno2pvs53heecduxsnaxxx9q912v1hq607jbb6k8s2p147w3f1ypefypezv856qpk',
                surname: 'el3l3zhnr0g1q5mf2uuzs5rr5jw0ul0zj33972i7jpx27zs13uol3rwis0uvr4nq4anvhchaqrh64vnhhc0e1hquntd5anhhf9bbtsbrcxwk5xhy8a8yormm19sck77vx36294u0rx6ya65tulf2rlyafihujbdaarf49yrxkucyu8tsgs39q0hl3az6j022bsu240egpklqam0w21tk6dribuu83lctvcma5quuu06qr0fsmwk4kp9lnjxtroa',
                email: '062fydt7roqdrwqa5org6x1ch2l3f36pfcybfddag1502tfzn59rl7zbv7zymmg2wjduv99bwc896lnlcpuzoihtqpguuyml46eyvgg3dvqf8f7w7fmdsdqh',
                mobile: 'deili89z7fnbyz1qte2bg6iv2unk2b3ip0ijluefeot3n4w0vhrk68uhzfjk',
                area: 'f7r56w3ipyyf05ev9bzkxmq9pbx5kvqhd5spxfs2bai6k2e81396mtfdsmfdi386xd0ymvjn4bt3y4te02ll1yl144001h0n4lteax3j36ayrt3vo3qptzgyp9qs42ggiz6hjws2pe86fd9ddgphf33ofbwkm62omn7w15f8dchvjz3lbm5mrj1nv5h87ekvom6xi77je4wux386s3zkrkosx07vttkv68m8eweyh0v16brz42lt3t477b31t2z',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'fjfq2rmz3dzl7l6nvrq5',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '37t91uvi3w1rngp7qa1hgt364zjeict9bs3z0aon81e91qeez0h69e6fy268urhnf0jp0kjsylddgobhurbo7ykx5xx58l00vld38wclvb18ut3pm5j1cjpb1mtz9ymakg97yvx87xyy216mqavjev346sbj1un1fe4yfa37lwuq5710jkycs48yehm1m6unw2nucoqi3wjvyouapca5wp3jyqf3j572343ldd1zmk1nesoe2olls5l3ranqeqi',
                name: 'x7aps6fnmk2au95zm9o0mt23klsde4vvm634ih8u5wz7frqa1vxeqz4e9c2iixtrnjjap3kgsehmyty8hpjyd2s3wzwhopp8fhvwssc0jrmghs1b19e3jc2g9ye7cy0i8pkrvq6ab7v2wp9tleu3f8drh541ix8jl9h07netuj3zadw0riy6x8eyzt1d11ctw6kudl814ilpw097txxrui1ucgtczqbak0yud23z9udabhsbszvzyg0bmmfe5a9',
                surname: 'bue2lfwtns3spr6eevf9u4zojqa4u8vov0lozji5yuc64lvgo07fs3bwhtveniuwqnlv8nfhyyi59z1a3satyu4kc1soznrr5bzft02jm8h70nz24k54p9jtia3ycpqz4vqk5nhabzngo03g9s7oue834rhpyjwv4krhr0rjd101vxahzlr632tcge822t6dwwt16jtzcq5ydjubrznnzgbcxoscffrascpusnq0wfozvzbapbkte7vbgpvmei0',
                email: '3vfauvl2jg6yrpvnmg2w9yec9omnluamz7dqp5tbodx1l6mv4syquk9u31x3kd2w45r8ikk9mtyi5uwufgxduixbgsjzu4xkos2um8q6jye6hs7tsr6auqd8',
                mobile: 'nsiglf2eyt3049l9oxtw880kg7gqfv09j58dwioyl1j7gntmdng1ixfd23e9',
                area: '1sqlyvse2fp0kxpgcnkl6cc480pbq3whujejgvt9q3nxyb415olt7pd0y4w5nv1u1qm0g18rqsg0xsvqhdsm2y8fly1f34lo6850l2y5syx0ay16o33x3te2fbh7d45n3fr21o6xqad5pmshlq89hrtunz2k80cgkt1mtdoxht28n2gd2e5f5tdmc27ghxwzzpb4c8zp3wrrrbumsaonaaqoa4h4y2awik1obimyzwcon5ymx0h9nzcjzgwttas',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: null,
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'r90fvoae7738pdgwpvrj',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'yxm028xwfxxrphqlsotd8oo2t53v9mm5cb7140yabg45si1ufzk7xicxbhzhk2f4770qcspe8vziwblluy820lrik53wfymcksc86il5858j9cv3vkx8w8pf28m33ezq97ykqmbnbyte0eykpidom2fiwq9kzep7q9f8nfpz6uflcs12iob3smxjvafmdsrj37yvqu0socf6adrcqw7uvyo1563gtfszey7666denh3sioem5j3caqkfctnhr34',
                name: '39rgajuv5zn3tmzz8fgydqlqxn0de2pf9vt9reet9n4i2etxp61bywmtj1hq2ipmc5up2obzwou95g71t3udrbnse98fjfcz3000vxwt8gnsyh51m7rd7iztilpioopc1t0lladgxk51t645ft6l0jitqlmz11qgryyorr3xqsjzwkvdoqm9rceuhq54dqp99dltccg9fgbtt9nud633cb5lk39m1y3ia09pzctnd6qhx92550l137jjxo3lv5e',
                surname: 'do3vjr86yw5afbrbf0a55ucodejl7cuhipyo0ddvm5gc5kve60mye4nns6xe4hbff6izujjbocc04cfkztfzpsawgz73o7u9lqpisr10y3yvhywsw1wbr7x7260an7wynz1ip0xy1jolpgxhx54cn1fk5xwhj90veghqsircic4a41cmvxs71cizoco6tyiaup93bz9dyflelegxrcy4f4qbcy1ne2b9sizpynpafgxb7rc9f9xqzb09ppdbtx5',
                email: 'qmfaw2xmn7kp22csjo5ihmus1aa9p08vcltvsdhid46gkg2uqej963h5civpz94udomrmoojy503f7e18gpw92p4c9bgn3i6m8f0vy760r4okqdawur1elon',
                mobile: '9901zndrm5q3q9g3fpm4h19ww84ljyq5yngba2sz65b3km3bk6n14mk24olk',
                area: 'xsjgo3bj8r36f8qmbasb0ilb7kanhawq7xbro5hkhmxem3yvmkp4f6o51nuow49g64i2ma6ocxuvnpvyve8dqsyv6dz4e5svm0cu8et95ug4xjow8fi2utij5x6dz0mojxzypxcj2lii2dxmh4htt63trqca2gqx0owaze7bwx1saywlkx09voyj8486jp1jnkn6dzavvo9lsed9qimercbw8coejas6mljwfb8j15zt19gvr4llyr5qnlds2x6',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '0dbffrpkxz3qa7vd7e3e',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'pbhjhida57yqg0sa2zvdvg9o77zjxvo3bgqkzi9yuxjxyu312kn8avik7py0774xyj0vyqkno18l9v9y1zl5fnwmnh09q654nv7lamg3q7ykrdrr17qw84gyni09g2t3bfnpzovhvcl9md9jxet9jvg7e8j6p4546k7hc5hs4vzp7fafoylg9x61n73funleukxbpioc4kgf7v7gc2d23hpo833k123suxwqaxxuad457qhzcf0pjwabq7rusfc',
                name: '3dcsxy0v1rb6nst01lms3vjx8pibjahr195hpekhhbmna98yrva9fprk0rfk6rne75lk7tazrh1tggp4cbt7p54bm7xj7n7qzvzgz4zcp9l8wlaey2m4gg4bn131j29g0n7qho6qyg1lbcjtv1xnbrnpvlt4gfddx9cm29pfsj1t1ruhzbmn7w4cvb662hkty8wg3n1y0skpy2o3jgd65e6jejrva2w8120xbvc6t8b59pup30we9uddqap1ne1',
                surname: 'vhszyy7txcs2j7fd4nt4zqls6mhiyum2m0h5e07yl1n1cjaeltvyec2hbh17i98chrl1drd7407wm0uabd5fzj3eoewd5ppxy1hs90zgo700uzv4efj28yv9ibbo7eg5k044ya2kd5n7wq7msneyw4boc8hwsiibxwg0mou66cxpnetgru4aej4fxc48q6edh613bcbr9rtg0pc4vv33qibd7zp56s9o37al5wo5ub0rdoun6perwlox01sqf6q',
                email: 'q8qif6doaogexsn6suz3m4kj4py6b8j0n7krlcy8g9v08hwnlck48c83z8xybztwihleaj6f7cdf9ac0h0slq5zauqkq14xwt2q84zn272ug6tv5852007bt',
                mobile: 'nlqxmfzr9ax9ji03f8mvornhlbo0htdjsjdrnupnw6kwiui85jh61m9c63qn',
                area: 'z3p6gbii2gl3v650qbv2cl0pndlofwlz4dlb425f05m0r8wo6l4qnfvcyuugjbdz48dht6k5aw7lkch37g7eyaqfm0s9t59qtss04cw4jqwwqw948n3czqvycjxl5bjszriipapua2ta8yusp0yoyqadb16xcjs5xqm844zx7zaxeis7x7jxy1vfakd5tczqwno3ejlm45qgrjf7cvre347xc7n1gli6vd8hn8bm3co58e8qtzw17ejsy32o4bh',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: null,
                systemName: 'z0ljlr5ee7wqc2dgwird',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'eag5go9s42ul76lp1h8hn7fxroq7hbqvln81rkf7n9x8yda3o31e85ma1wea7atis7wa048xmsx3vejg4wmjt14z9kr5l5at3a9n34670n4qapub4f8siv9gao000e6pxir9rh6a0v3pv0czwtiwjes5wwxl6leeep843coopjpxu3j5sexsbple4r14fq3fci7kz71ejkiqnq1z7uh9oh0x1f3n8lwpqez2lypjacr4xd70t8vy72bcrnvf7c1',
                name: 'e5y8v77fiuxjpk5d5mou9nw83q2svystvnvpb1cqm5iuruvrpt2uiy6gbhl9pk0inqie8i9lrhkmmtdata5ymuppfzchm2y81oi0pq7ribunofzwm77ceconhh66ysq5mn68d2569p1ds5q9jvf5mr37n3fjk5jpp4glto1eliyms78hf66fju3vdqcdblhoorlvkf0losgrzphuxam4njoczyk5dp2pfa6b5f49dnoawn2ncucozncyz7eoztl',
                surname: 'sd6g1cp6j206pc036hf66l89l5p4wm61cus5tbp7td6svp92vzd1pctjko8flcm0hy8ds0077i49eyuo36wczwh8rcmru0vi4l7mjivj4y2oipk9tewpzkj5w739wnxqyi2ksuvgoba9qc2am0qzdvd94e8hhqchcq0knqzhjhwd91jvho9hl8jm07322v4cxdme5qfk077u6h9nu9rlkdp9dxpw2rozfzbr3s7p0kwl0jq7fkf2f0y7lim5wjl',
                email: 'r00mgarwt3lw221j93d9f460zo1npkcfhonu3vg2of9j4up1i2rub4uqxmf70cpradx2t96q8bobitijyrlnfwifipmq8r5fad5njwy4h8h3q1ir9nay3sjq',
                mobile: 'klg7krjrm4735orh6oiqu2rxlb33g7mphmhil3j5gur9mcxo90xu2wp7tma3',
                area: 'gdi0e42c9mj6pzez5zrge86pms4i1l5ysjqysuhjm74pitaa8w98sorae72dfdgptiyk31aax89hnijtm7phfhue39edqp3cxco5pyhj9mfczes6dyayqc42n55sp82ty9h3tavlenxn6ldp4fxbit9j1d5jtqagy04pw3bu1aimjxh0501zgiku6eebvb8w6b66rrzjx1hdjx8gln2or605ud0hki92u5gdrzamlnto3l0ygybc26zlxf324uh',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                
                systemName: 'z75f5b180rqiw3v77sd1',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'roh029bs1vvh18u6o46yinlfa1gbnzh08my3a53u49xcv0y66p3cfzmoxwruerqoxx8a4tqedl94c8td2yhf53j6lnp0zcgck13lgdacydkftkvk0pww9gy1pgm580lj3fmkk028jwhv3oo7kz6dx0ppp2e5s1z2sbfdy0v5u3ht2ejlnot010d7guu7817lmtj8z77p79fpriclyh4tqru228hek13rv3b87mi53ji626120uwn87t8pws6twp',
                name: 'nw44kmyc4it5jkynb0ojcfgo5vaabnoizbbzbb3yfnrtgdeptu3yh6acstt8pp0stenu2ju70jlhgq2lwdic8gc7aixm5whuktm6qpjg5jjsid2z7qh7bewsru39fhdkrq4a21ss4z8ef01l29z2b0bpf7epnxk9po8h9kousxw3yyu6ki0s5apnqsd8q1ofjpxfhkykymo2n5da03hw9915ngkwf49ca7a5r5ho0d5bwfx08n6xgapufy84s07',
                surname: 'vcqoc5yfxvvolulsunufb12fnhtvpy91uuy3i1bqmtyy4a1rj4xbxhl3eo49oo6ud1p2b1oawu4wzwk7pk1hzfc9bre1j208tbo1e9hmz17jiwhc819ekr2i10ev021o6d3mzlqx6yfjahffrdttubzzr0a79fb0gl28fauth4v9uk8yhj42pmuuinqefdf7kq11187qn9pf70s3pvykkmutbawlt4xr49fgv1l1y1g37vwcs83tiv2m0wfszga',
                email: 'xxagbf9b7qu8b06j207ft6plaxp7dym48lqng79bzieoxmlst1z7es6gg3p9ijaeegy95r7ok5dk611vkmld51as9c9ndh3kmjo5sflvnviljlh3hgdsva8i',
                mobile: '93w3kyfk0qtaqgl2ypcjtehs1j44ooq9v1cf4ve02lygst39diyn3f4xlw49',
                area: 'b8u5y15v4kq4ca61sj8iz9zp9cqxqnhrx9bbncmdb3mbkuz3qguld20zm6yvwkrwjcbpvfop1zi6uhah2e4rys9zm0v5m6dlrnwtelo8xxq9xoiwmrlpkfzzuj7x5iw0kicso5aber5wu7jb2ql4ds2fmrlbtkr7ppe6kre6ab4kkbko949i4h8kpgy9fcnllo2j8qoromwi7xnpl3j1bx3etrw9drtubo4t8f4r9ru9h1fd5sbu0njgho3pqcy',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: null,
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '9jr695juwucyh6mer18thqjp5i0u1ofra5s7z2e7f3p1clgcmto8v53fs8g8yl03yqho2zwdfv7rrw90dgdjjtysshaha7n0zsnw4cmf95s9a8leo129s79mdhgm3xx7rncheb47boa4hrn9fgyxn011ygu2wm78lzdr5xzm3tzg7xzzwwzaf4tcckrhdz7yvxwhy5nwtar49ge3jda6ax05y0slgih920ylgaqdu6voohpsa6nigt8i6gdgykx',
                name: '323auiqbmu7t4kqcbuacvzwzprykyybdaxdgoksxo9wlzg8avpgcajg1cl4nu6zgzewsuju0sprjkc5ozbrgq6latqipcntby8ywwl59pmbcq4rq2e92ens6ts9ase82kuzbkyh0tizsx3mvwzo2qftleq0x6ak05o24giiyk8srby4qu5uyav6u7nwrq4rmr3pwt09nx83vmozohbroq9ciuuq6tsiycm0x6xu6s7jqdem4r5mqe13g8qcdwqj',
                surname: '0so6yr24u7cqlcxqwa4n2w2u5tuc26jf9mi1ep8tqcizzo0clscv243e0wu6vdr4ewm8rnv4xw66tgkf3t3aa86x3z4kq6aioegmj7sgmca1hggzm0ye40euvr3lofst889d6kisf7k3cauqymohg07cgxpncqu64zpnkrvclp1ehunwk8mzd6yhepjpttoqcjuph406n7qrvjjv26rzat24ja3e84fags199v2za7fbqv14r14xa1jf5ycr8jg',
                email: 'c9fzaa72h7fvr1u3vfmo5lmeq1buvo7ov8e8ildvkmz4d40s6t40nm9yr2cl8bqbwdeiyhg42jl1rhtz9py1miqcpn18ww69470kcrepdzklp9kpgx4ocbun',
                mobile: 'xdbz8enfsbav98bi02kb9w6fbri1noev8jz30nt0vjie5r70psh4fh5sg3cg',
                area: '3rar2yf11k5zhemioit93ckqnhvt83mvkldi3paqllz2y4f2p4qj3i2rlrsx5l725hc5ojzujhnqccdlxzrlu2j7xq8nxzjwz4h9xd1u6gf05m54l39a8ohtgyb6h30c7i2dckdbkggp4ruz14ncckjv1zthgeicdxohfhfzcldx5az2zb1tlulprvxz798sdy8hkdz33y5cqzf7smth154opdqtltkzx519t0zbdnnmlxq5qqzu0i6o5j033d5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'nssuj7xiz9nkm3szhl9k1q6kr5lo7pun5z679gmoyri0wo51csfknlnocujc3sjo0x8cm2iawtfoigysvf2lyynm4zu1ihaof1wtj3o6kgh57wlgmwdz8p71oe4n2enzdae7mur7l6c8s1bzlh345r21v624oudl0e9aw7fymlploxa76738q5dc34zkp4j0s50lkvxbw9y67ehlrf0ymx5la0x550aqb7v9izat58wcsfhz9n6076pvvr2jymg',
                name: 'yazn2e8174ymgikc4l1zwnteuu2cn58xzdkv0x32577sev44sfau39hqs6l9d3ms0al475sbevg651pxdd8gt1klidnuizw0es7srpw8i05xgljc6ctcn9ns7f8yi0ihfn51307m7ga8qf695r2285mxu7ji47hfdczn4exk6loeacugg8pskpglyyri3lby88zz50aeqnha2bz8gfjvzlx8h9anq1elphbvvv3ixwc627i4003l8w3av8untyg',
                surname: 'tl4pwcp1z9oz4soxef4ncqgah49aiqaxr8n1bu3zea90igjjfi2k1b89zthv4vrpjbufcindkoarkdr9i9x53i34qmz480qee75jqvtrt0y2igb4768c3uzf0qvxfzltu6exttt9ku8uvl1zutezw429e1llhjakpvcyg5xpackhyrhaa6krjqzffnlfdympvueckat3bkaqzd3h1pe4e2up9nq4wz5bebj77plgxnyc6qixovlptujok9yxray',
                email: 'hwaq1h5baxcc3u3ackg7aird9c2wepws9dkpbd1sda2jojn0yyzpekfiaq0xqatlc89090v1hxel6kph5gwc289hg0v7gookgn9pjdgflkikxn15bbg415xv',
                mobile: 'yyo1iap0a6sadl0l6lpaemklxrbq6t0yp45bbyan4doynhe017pjjs8wtkgl',
                area: 'fe46udqymszfk55xst5xlag2f8mnr5ofcqrutr3lnmyde46a3wjgdp969bv7m9nh0ula5dtpp9f4me1jf48j5l2xt99adrybt2qbcml9b0hwj24ntp6bw5m8fihd0ibxkw8fjx68tx02ci9r8ga9ice95ujncwm2e94aa0fltt6q5g2pisorkvhqm00wuw4wknuyiazyalr2d02mu83b4ssoegs5pf625p71fi6b2qba997t3dnj718xfdh6e2x',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'zf0dd5kyad88za3aoksm',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '6i8gurrqmdatqp4z4qpqrgvvmiodxo1vm43upokihhp70pep6unoar5f8vj5o2zzlsd9vplnzxgbip2v149nweu8c1tj0c0ehxte92kojv3ju81n27l9s2f1nyfak33enpfk3v3mxtgolfil2ow6tkalqd0sn7ev2y8r5q5hak3gj0g38znaxew37st047idwbwx8aelx1qq4z7i29jnc0lxbj4f8bmp4grzvgmwlmgp3073cuf3se5vnslgmyi',
                name: null,
                surname: 'cr3fuamxuxxfdti8qh899dmva2744fos8a5p22zpohexan9srv85fywcd8j8b1bdxtilsvt84tpzji1kgb944121vgfdzbj27qub404p2fl17nh19myprh1zs2hv4l7qtalrzhlvbnbwmzcua3vm5f2dnl94firl9x8bg0874a7pdyf8jjvp2m5gpv7689vpukc2zmm2pmdxwljqwyimlvvxb2muv21ysv9mrwdnovrrgia2btahpmtcthii65t',
                email: 'g5375x4t1o16e5kwr2n939afvevdef9xo0ws8elpny0c24ujx3hinhir9irrx861u0d8hawxdizkn9ylhh7ogn6e4dj9fmatwbdi2wimcxn89vnouv3n8n07',
                mobile: 'hrdvy09lolz8ortttr802kff21q4jtuiy9db9fwnj0j78oa482q3ajhc9hi4',
                area: 'gs7ktltzoaokiawk371nxwx3yaq7kjpwnlfc0iqyc17c4ntc5xapgnfqenaeklu38dq0kiplfss5hg48wb4445zfk56nbxyemfhhb4ouvt3mfonmseyqzdni0suplag6jqg0hba760vhe4x9tq1gk2ejam33sqmf9aqed6ijg33eg0g5xl0kwz19h69kxuc19qj22wu7s412pafm8cs1i8nx2ezi4y19eqg0w9a7o553zkztq4b4dnzq03tg1xw',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '1es9p41ku9dvgxbo11qc',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'wqw0ssz4vi0xuf4o5ukt2rnqbjv9f18vldncmtzzq2v1zixfzfnpapqva8hoabhdjndgvb4kx6w1wwx1dnasmlxlk3cd3n4yx6p51vvya3tvh1xoaz92sf7lcfux7zll2v414nzgq9sdvh2mv95yp4mc7lqho13xxoigu5r2xha121ggkl84uvb5bxa38aaeminlnj8jxvd6wze5c2dsjnq8lqu9lb2u7c805ischylteky12mafi7s5blz76sa',
                
                surname: 'gbotlck7ua1g7nr5o12mpaks935vfaubdp8jy2zdqdcdq77r8ysvlaacpmm3bbka4ztou2a8q3y0jeb45lvltzr9pxts85beko1fbi8kz20zpj62m1xx0rlc2qlt92owr1r6c2evg38016rxo8xflgnyunfcg03lsufxeauqxgdpp5g0in7ynchb1bsprx43ylg8r7il8sf5n2f2hvt4ihsye0ueb3x916r5rtple8wyh006s8ffgbfqju9nxho',
                email: '8r2dgufujlv11jrlesbv147wtx30ji353fp7x9ne11an1tnn5fpzzdbed5anqop0mjmgz7s1pub2bh8rud4x7wh7f7we7envfwx3pa15unvt80p3aifcs25u',
                mobile: '2kr57shv7antnu23y0ini84z8pjtlkmbplrwascby7jom6ae17h6nn7h0kyj',
                area: '8uyzslqs1mzvqu65c5gm2ucwsmarq7h1prt5zpyf8s34hyfyzvjc8nb1s9x8ktk459a69247m46n8t5n0dshrjl2yc8luu7h61n7bhkuiqbkc0d15pj1b7rxa8y7fpg4a5jl9q6pjn67wrntoz1lsnw4isib2hmnpah0gt7gutxqjo3a50yjful47qsukz7y9ybbm5qn3aiovzhva9l4bzoky6a8zmca76ky7o2a7x60wbzw9xe1iphnr9juji1',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '07kcnnq06mtz9vutdl2x',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'fmnkkc5b1q7pg9uxirq4leavyd0oacl9fsyz34hsr91mviof937fk7py35odtzthkrnyk9v4hwkea967hndyn9r1colxczbczqjtfxt6w5dwkwg9u258yp6jmc1akxvcn0cqr7b2tdmikd6f6m7y1cbunmqk0es5fzno0rk57kcox73nz0c5zhmy8p5hq34fjjska41sq9q7dyqwxwdp8otf364c44yuvrcqpnlfcwol12mtv309kfjmcj0ocwq',
                name: 'in8gsm1kxkknbm2rj5rdav0zaqooptp0hpkjp1q9nhsems6brp8uqkaey66fhjeznje801zbgum2c85frzzx1ndlxo3mmdc3lqrsfshrl9ynhuj5ahdwbb2gh8n805qw36tpv5plb5xmpwxf6gzg3teclglwt8rf43z0jozbb6jyr9nomlqa0bf46pp8o7muboayaau3qh23nkrhdgvrfxnlp2dbu1u1mzkbu2qy8s6khw3wotylnst8fsieyen',
                surname: '138hu46nvby5sgctb6csbbig9k4bk0gcgqgsjkoedk3abdn8nwim9y0465obt0xy59arw0vj05cckcse2bxa2k9j8ufplpss6knhg1pvcmllpzbseh1zdcq5egf5mtxxs92qnyjpq6y8uhii6cw2epx1txb9b9rrykqmsarzednlc95nuq5jmmawitcix3b5s0rw3b1yxhlg0ig8fd5itfsugume53v4f8x261ba676rloaup8zxlmh8dx84eic',
                email: null,
                mobile: 'yseatdrsrpuns4hyjpky6o9jrvr9abgh30z86tb1lcfmeyk0o4omfeb150o0',
                area: 'q6welqqmza8c6olyydimkbn20vn78l7jlyplsm3dyry6fdu0zfgchrejhw1674og9vv5k3ld1betla3xcr4hworb5aqep1u8z851s768eewvec1h1mu5lxhpmrkexcl3n34xubhg5jwwn8i6batv0ndhfcevkl9gz2do3pxnxjdztgj9bq2u20smxbjfw888qnhgsdlmow4sdk7h3prfte2r8fh1i1q83ybknt0m213x8geply1oi1ejyfeza7m',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'hzttiniwuygkhrstr1fe',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'q9byyw4k6jmawt2ddg2mzyr2km4tal04etuewbcc1bl1msig909gk9jj7q2t83cryw2cqsem3kyt1jdg7vjx7gzdps980byjwn5opfdtecd5fa7hcdnwa29c6rbfjt31bu2zndwbhrhdiyxe45qakm0jcvlmo2ttysbj5266mykc72dtco9z8px0ub2eymo6rdpylvh68k0qad6eyevlgantxv8x923bxs1ydk0q284wb11rs99z0k18srpinam',
                name: 'b9pe6jakboteqn2ijcm5er9qgorg7vszpp5utq8xvrq4of7n4hociq3agqow8e72gpctrwov3fwcy4nfs5cdkkhgc2384l91xiiu7lbrf10hmpgfj3ot6t2u0ymbhomyq9xfpubrg9wj6ln4u0l6rzw35s9sk7zosn8tkd5s6cbf54s453o3n5w8bvmw55pnr0fawmrz6wqhab5e62rbqnu11hcqn4w6yhsdazmy1cz8gc0jd1njb0hklkfxpt8',
                surname: 'ee64r3lafs014j2lp2al1vl2x1kuc99jjlgu9pnuol2wx6rw6bw1vtm5jwww1tnzx64mtn8eu52nmtwjxnxvyut40n56kxan87e1atziyxatbflk464efwybdrfck7m6ywj9v4tf0ew0nh44yj9go0zmcyryu9izhprldopzspu76575nbcwohdupty4g5d3u0ivxyvqqydjbyk8m45jdzhdk3cndabr29wug20tjsjnxeq9f5pkv3a74rfixb7',
                
                mobile: '9dhjmtahv5dnsslveqro2qp5luq99kfjl4trrbbap7a32vup8xkd6mtt8v4j',
                area: '0l3vx2dqq935whs0r2u3ltwuyxfrm39lkhgm96j0sb9najclj53gs510y6un8etcn6h0nkzplepscqbgpiad6e4y4axzb9ncy5wrfdjdozlbnpf36f33hkv9yfrjaqau5gv3848jkr49uoqavov7dihvbi8ax12wpez1i4ju4hg3rqjlqf5zo1xxjbw9tqwzbjc525k0y00rgq3nv5wf8mah4i2gkxrmigwi9hs892lz5x6y0tmqyvwh1s7a5j3',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'sjmkh567ce9vd630nh02',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '7mmddjh4ukup60ltcbxgh67bop1krc2nx667yldrkm0pj2l8fksl2z5ega42l3z2tfmrkrhycgkl4aqic9dodcqvqi2ga5lamuzvdp3zuulq0jx20mmpatkzi17p6h2e1a1zyqci30xxk30tuku1bz0makpqxccgpfagnxg2jwbmkm632d1fyzuj6b78adovkzk0nq9jjorp2g5asvrfj42380t1eol6icgascli8j7xjyo9p8v23g6rqprh1o6',
                name: 'su5q7sw7xk578ii0dhg7209ogd04i1i04ja365yd7gp6q21k0qelh93d2tmug6wkjer56b4jzctskoss6qofm4boucnj609mm196fucoky1h7jo5xtgyvbyw54wfyu3p6rp9v6b2m7i2sidnq8ok2o8ekfj0tfiq07gjbffi1hmupq68d944qficbtzjo7ikd8b7kpmrz3w87qedgeml3k0cgr7kzb3bcjcwn3c5x971g8nii699nmww7z9n844',
                surname: 'xm37kzqw0qm2noar8ywg72lj4tdbzr8ya63qp0hz4zifvcb6mzflmfnjerg8f0w1rxyedg6s2lpul38m8t85cqw4artzpfi2sxzzgdw6xvxsf8gxtkgcsbotqxoxt2cwpwii4u4jsya5qgwgdrrz6d37ucmia4v61bup24d0tyrywsih4wx8d2hago416kv4c4f4uemk6iqsyq7f3zoneufkfebauzayo19d6n7dexqucqopsrnuc68wcldjjul',
                email: 'dt3ozzyh5ahgx7bfw310bpxia5db0ro2fz9f7daqdy6wbrzx959yv0fufktuds1hn1mik1r9iknmrufjcmvy6v5s12ar6x6r9gi82zhm32b2jj2jlaezt8dw',
                mobile: 'qq6rt6x03pyho3xs5s6m9co8zw8651htxg0guo75xj0958huutkqrfzmqfia',
                area: '1qf3h80axk1to4208q1lo3lc7n8yu9rqcyyjj62sxrx2jvgv5ijra5b2j38tdyhfy3co6uodujbq19nja9iobed68fipd80re5lw7q5jaej988qemvsfjf1vqawkwm14fv8qk2i2n14bx13hou9zglflocei01zti1xb22ren8frtbc45lrehvzgcb4uq7w8syqfj8uesm7lcq1j0emz9kg555vhg9u2356a8jvkt9m8cv9nuwx9s6szd2qzpkk',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'vr3h0gxgb6lszkpff9s1',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'qn26llh5t9m300qrxxlyu5lbe1fna4lqpxx5nm2s8hjy3s7pr3ewyizz6f0unxqgbzhf07uy0y0cjkky0lf8hrdl283k219ylq6qmje4dh9qkkdzia4m5gbbuqbw748x9yq9ist12pwjbz2yhv833vvbtkelppi6uv3uwm7v0ork5u2kl18ablnnidtm5zcmn600e7zo56umbaooqewddy4dz8yxchhno8m6s21760945hv83gjl5t8d9grf41l',
                name: 'r8275l4x8rc1zxcbwawaztjy3dnhj4636n9m565kdc5r8jxh8id8wzqpwy1ch028no0ynhxetimodctgw6kbxaymm2ia2g4wcodpfv5o4sqpdbnbn60p8ziyi2d4zaamae1vbhk42xt1evt4471orzaqqib5tjaxrqfahvbi3vuv7vsdn2oodpg5o31ol4hn9yhu1nvpusyb9cxvk7x86n006i7z6r7kre4m6l7ezvg3a0a6atwvo42fmuksv5u',
                surname: '2exby2fukqpcedrv63us1aqvjydrf3ovjoni3nf5bf5wmy73u4hm024n4ddlt8r7zod6p536b7d94vhoyihzmgqwn33xzsssjmgvadvuigtpyidt39vbkxnrgn94qqt7e2nfet1i44c63pzzckb013mo24ibnmtti7qn7lhml95auaxu7zp274x0b46ehr8hq824osmxg0x9mlcnk48u773cu7zcapjp5t0ac6zfbnvlx3trsp2kfz035comsaq',
                email: '6kiol7fonnpvs3ctzxigruuplk4rumana3quccauhuinpvr6fm62y78sgovtd6pbezokk80z7r1pewiyqaf3a68wjgdsnl2o6inza09k9u6aobe9wnniyl6j',
                mobile: 'o83m2qo9cl8qxgf8j7dbf13lm66gw8hw2nc3nkn96gmrpksfaohocb3s7484',
                area: 'e6jg94k4gqbfs63iml6c8ybzxcv0ub5i800t2e2hifytco0d6qlertwpl7je3let9nzzld6mrk4zup824ciyujpvk2w16eox1e4f2o4y1981b3ob1tubk73zm5mdwpjxw4nva4czsg0x65oy1u2ncx92o68t2fye5xhxrw800pv7i7yzc2ayuox5toivggelk4kotyo39s7ecrfb6n5wvwpqgkzjw9dv5pka2c9lfpj4aa4837xtblxtmdi8x0v',
                
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'tjd31hmgxnuty4u84v5v',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'd11gbzex1oksqwfjiv8jkuyi2o6uaa9iqcgx3cgplbezo27nyy6ih6f5exto91meiqy55hfsq24l6vfbmafxmxogekqkl51g4w1lzpa9skt0zczgpvjut9n78wokplkrhgj2ro8umfao30tltwjd215hyow18f6wi43089i4983jafgnhaj5s59lha9vliwlv94oxveyi3l7iamzord4c5t38cpgz8rmx1nmjg0uxu5zvko0qk81car005dbe8n',
                name: '79njboly6nels0gmdtiwh8ugnd0pgi5q5p03b1r03yung83b00ri4k56qgz8ix9r196sa65cm11i3gcf8a9u7dt594lj1cx3itbci4p0vp10lbhn2h1uacstp6is595aiuvjd08npjiofgavvgprb1ad3payuisqgjh9rn35mz2php8osjr18irxoydph675k8hvftikb3oi014km11bmlljdwtteboddxakyxpjx7vzhezdugz4yjtyszwxq1q',
                surname: 'ljm3xb6qnq966y1ix3snjdfz938mrm7k63nylac2nc1mk99al8i2a0mq6g0hnpi9lf8kklueok8jmpbmwxnc840vaqambx7rog1wrrnbbdsmq9gsbiqtxhx4v49m6ckbgcjjsbgfe3hhtgbfimuuyelp5w6cg00t52hpjbp97d2gelm179qytgch54s6s8d3y49dvqm1vb4qqyiw1cvqued16y0mkogymhmo5oa7iaddozix5fsrwumfifp0tjn',
                email: '33rh6akgl6tbquwdrl4he0kmjj0fntiw6t6lhmwm9z61fwzkqembvyo6uat9ro1flwtuye7y8vhb815t3oden7d6fwa0o4a4wy4vht5kveyr3nfdi0lgixuu',
                mobile: 'n2vnmcmsojv0g0hdueg07s3e8excsdlb2p4sya5r5z9npvcla6dg9m278c5g',
                area: 'ketotr3p4inmpf195btc7al28kjkgsouh4jy1a7xw621hjn88ptu37xjfvxpwtr30jado3o4hciij5eiezd848u2xqdjnb7jha5uhb080hda8w0loqslnm3p38eb7b5xq13imgek69n28anjukk30k4q9vmn441903d4vcr9a0zntz4vb3k0whuez2ekexxv642hfy88b111z7bpypvfkhzhjsgck3ffa910a88ldn2v7ey49857smmh4z5d4ox',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'x1sk40omgd2w02pfhluz',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '0v84dc8k99wf9nye9kvxedqa5wr4nwam1kd4we3mztf70xno1se9r96l4lc7m5wzaowael4kti89rs3chk0dk1wxtwfe214kh94nr1d6zgbyrizcmnrxlg3yanei9osdmrj3zed1gi1i83g9poj5naya3wcn3hrtwkfcxs9125lbajhiricbsqv5jrp79r0luzq86huunju9pokmt3kfm30nl5lp5glr8x1189c0in0mpuzuoovqvcyq5u1wgs3',
                name: '4vvorpx6v4yxq9zu09ivv3y1n499o7ttn6q9op9pn3lqy3q80n34zo1smtga1jn30gs2dqbhbcw3osdkqyivvaeq5owrtc244e9r1h3g5wym0wfp1er26l944xvui2z0n7b2hvdumiehqomxwvkcn04lwkzq8vw4ve9v5w4ltr6j288r0hzrcfeon3m22cvf9btk2qiv6dzf7fz79i05xng9qpmqty3rfhmrkrws26oo7jxoz5ro1vw12l02ys7',
                surname: 'qcijfdo5p8lmud07ve5gto738woardjofs4vpldxpf0i1faex1w9d7qy1oi9fdmqaqegjt6p8z2tktj3lf5x9rh8r70gnhcqwd8sm3ch6ukwwfhu3f94vmngui32e3cd9uqo7gmkvdn9mdina1moiy7cw4ecug5xvj55aiqj9wq9pndcbzcf9qp2fdjwmw3z9l5q6ub391s39oe721omota33zu46zwnet7jo70c0hiiv568ig72zj00a3e3cn7',
                email: 'q8ig3juceiv62vxh9p6amqn1b5iqcw83bmnzw6kxpz5ybhvsrkosfke29y8sy7xwgqviyiprstxi9sc98rductds3llmq252a74cptvjzsneaq2twyvw7gxh',
                mobile: 'a7qgp8pbvr5o9aptwvee0gv9dmegz63dkdg7434q0kpz6hq3bwfh7hmybi6t',
                area: 'p7xsbkwh29zdrnzl7yflslju4ufk7oizrjz6w21qsbnqm8z4c5vlorclk0hovchbsb061xsyfuorzp0jbjc3ndorr9i63htybzx8jqflafrq05wu85vqtbyxuqzxw5qlj7m33mzn3ickus5tfvt7oekow1duxaioly4u3e7lt6qbw958liuq719s8wbqqhjzi4vgle66fz399bnrbzhy9xkl6dhkf9oazemyvoqhj91jlk7jk8xwfpcmfzv3d54',
                hasConsentEmail: true,
                
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'fbzixmz8pi6ejnvbzon7',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'igom4f7v9uzt6blr7mylqrroofjnd213lmo6mva7ynx59x6mb7dn15ffgud2d4ufhvbpolix0afy47samwprfo9gs6upcr80w7fuk4p164ym5la5l9shcrrp6mo9pt4wd2c08i15d5gublmruag49lrygtobbb7tbbttm41l1vvt56lih666luzxz5ymqq2imic438hggp8qqb3p7pi1qztidjh9ktm7w7em2acslcwyhdnc1newud1s2ql7qg4',
                name: '0mns63hnjui9yhc6w3z96egd0onu2g1d8ijxa0bazbsrrcupygysf9yku72cjii2ck79aa6dowjsv8pehlllgd4lvb99m09xb3utp37gf035a3fxpmk9x8hbr9hmyd56islyj4x9axqu95tnb80rbqxoz5iblvbxjuy62dz5q5fxs9hg4qp61bxeu1y5kxr640usjbg1xudagwwq4csuqel23lszsshy6qtc1heosug0va5tbl889aq2y1qnjem',
                surname: 'qjua3tqg7ui15402a81b13sjf8u6qcl7zp3tg4p0j5vfb1byeuj2ulon51msxhlmk2r9vy0jss91rzsgeim0b0reomxfx94kppgv27inp7obsodve2ju2l2o5c8yy2jwybwzof8zaeywzip1vpq9ju7ie2txyxz53k8lmkjodffqf90gy5tb8fcmyt64258jr8ribfoosfl1to6ptnzqfxoi2tqdoua0erahwp2gdo999w9s9dedurg8m9dj4u3',
                email: '8hia9s1z9pc369qemtir0ok07bkbrjyxpanr0fgmt148q0rawy3lp802uvv3yrhvs1k9iusuxabqy93s18s3sqbo6u2kkk75snl2oafsfvass7bvkkql7zg5',
                mobile: 'qrtftmizowof6qgo34ygeit8iz2a9jbbgagw21ni8n0ncuwnaj6ck0xhl9ka',
                area: 'obxlmcgq5chrz3qlb94hmts2fvwo4e4khhvqnmmqw8ayn4qis56d0008u5a23b6pre0o4bemlq1rap1fqjv4oya3i56358bwfr4vidkq6i4fok3u9shzg82wfz0lekx1wt7iwerfl2bjts6kpnhxkwbg5ttyl9omnmn8kksx8p5vxf010n47wedhi26zcpghx8byp3gnmwb9gbv9uubuxm3g9h9nu8jfu800cicdpvq4w6c682mfpzrb0h7v9w4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: null,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '6cg76odwzr5ceut72cbj',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '63avm0fgs93rulyf4d5z82fas0lktzw24pjaxmrs5h9pmivtzsen03j9hn7fko8k2mutabkfeyf6my4t24gw7o6pkg1ltiycwhw6b7a5cauehfajiam5vo6karqmyqm0u4gg8bl6kchp2dh87e6bj725ttr428hlseulh1426nhn3r7hp0zkblyqcay5175ok1hu9t7icy1gmwfo07iefrot7os4vj9mn8o1c5wrz1fn6ci7m7ybaosxeq50s47',
                name: 'pmzb7w7ogcqz5tk9vk7srwidw5jizqwvjs5jw4znsusdix7wie6tns7hieig0ljr9zylmc2k3cga418onhpl2p8u7ef3yibjcgxd56bfstvbrzcghiuof7jqaiwjxpbwtf0veffek48x397oj2u60c7hr2xgijs0yiu1zxl0yze2ttw1a0dmg53i8lakkm7j9pt0e2i59mittbaks12kasq3qsi6idgslxh8dqkt3sh7em24mp926c2ysfq41i4',
                surname: 'l1r4ap0aq6o15i1w0maco7lauj6k69rhcknau1d7fhcd0bletlpaiu8yrqfd70c1cbpub611virh7gcduygt0nzamoxnaw9m1ipk7l5xul0lo01tw3yvy20is25ze2g2sqhvidex73iltjwb6wd6h6leey653p0i1s1969bzl0h5raku3xxuyeovqnpht8fcrfg6ogz4pcra3wuac80wadyqmf9fworon9yffmgy8qjqujap23pn927ff4qww2v',
                email: 'iaivhgxytvjj9w9m8lcxi7w3ag4wgrc314hv9lp2t0h0674fu1xw0thpft0qf5ot7xyc01bnqsvfms6gwyxnl2al1ml5lzupjn31vkel2v89wudw90ap837y',
                mobile: 'xztpoa5t1o36g6fwienmfe1y9nc1na9cvvv2iqapdvou91fzh8dqdkqae68m',
                area: 'aib01ye5yp8hedst0nf64bi5picd5q0zlomcvz32dpw3rj8u638tj8vegybuy04br4651x14vwqfuwtqfbrzc5azu8zgqpuksufuqy2uihzhfit7ljsz1love3xon3njp6jsj5bhcr7ynfa0jvis3vbmcdezx7qtoznrtrbpit6p3echwyuwpv0a2qbrs56s3h3pahd3e9va2wm93082g2ac5nvbidksr0bnqyeu7170blpbcz47pzhbgga71fq',
                hasConsentEmail: true,
                hasConsentMobile: false,
                
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'l32g3u796sndei3j4o9l7wtncq0zevevujph7',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'nn0vwz0rar658cexjcul',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'n48pajxk0ng2oxhm16b9l4hf5ch8taj2w4jhk5pbk76awlor0w4xebkic5mzsv9cup9jt0pakkg9hvbbm56ot0rzjnvd8r2cfcf1qutzrnlvmryjy6nrp644z8v1ycoljwn593hwskxnv7gpt7955sozq4ubikc8cwogvgadg2h2dhu04pemplflvsg7hd83rur0bskrfvmucicywmb62lu1kecwwxkvlrspaz32cufcvrdrtjvbhw1xsrvco0u',
                name: 'adgt9tuqd46r3op3w19yhvo7swmalxxg5gv7yyvog2g4kfgcki74f5j5tk57reqpjqdycp0mmn6b0u9mybrt4mozz0zj8ud53yo16qtw75thfgindqq96p2s8civb2h5f0aeqxdp3f2tii0n21qtx20y4pfz566g2r2wgt1niiyqc6qos9g9imp764sf604rxlqfwoxtvw4sazk90vus2sshde8d2qvc5qw2c4yvzscvpbziewmx0gl5hkji2vs',
                surname: '5enwhq5mzugijdkhbg223c0o1iwkq7ues45x7q8b5g5nizh69xf1j0415u7qfx7ptie50rdzc499o6co4k7limiy1fu7z81gu8l4pynmaog2vsukqzryhfaso23s1rnlkzyhccvy1dd0c94rnowo9vipcyw5xge43x1n8r3ugc4twn8g4sp87zzz72jixlqmqo0hr2mp03p99tog1t717h7qmlz2dibf5djgmkasylm1rwcjkaohi7dnbxabvry',
                email: '8rotmv1z23gcn629toy0rmf3h6nh16lu5oq8ig8bbjtgqhmlx0w528s3mdl1cfru9jklm1zgip7fec606aprp7e2w4ql1d3omi8t8r9nyka1ouius6gbmaar',
                mobile: 'ra01ptx8ogpisdcvp7c4i1q8k8uuudqbxkcakom5yw9ifmjt73mgonhhywme',
                area: '9uo9k2g26aezrzctk5nr2o1eidbf4jhl95191f8hsokcwj5y48s20nuffrv815foson6wa9t54n31kamxt6opuuinih5qj4qq582guvqttgmk5ognbszmkn4phr8jl4abqcr0s38u0cze9pqf8fe7ybn5udkvjliu2eeccwml0jc92961mr93rd73wyu672hsyte8vss0ck4g7akzs6bzwjjonslcbpv4hmwig0ovjg9cml639k62s8jkm37v40',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: 'gbw0wxz7rxdr2kql3qe9ordbs2j4lp7ubbynx',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '7qqsk36wyjtiqanfjj4s',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'frv2wf5sfocwbbwvx50unyp1lekzza698mgteh8hkazlmz4rth3g4xor18roq7k5t8d4bbw3lrd0xm2nf1p2ruqiik2up8rq5mohxwfqvt37t0i7717k151p2eo0wm2y7ioh497mt8tgcam74qoh30g8g1kfbe4wace4uu26iz8inmfgr06om4fjtp2eqv4w6bkex5vp6w7p68wzgmr9tyc0t5t745o122jg7br2y9dn6ltpnwz5lu6wog20cnr',
                name: '62j13m2recsjjpq9iorv1yg6x0kz8p8m15jy3tdzer3882l0gjxgfymrxoy7tbov8ww9wqhaz6exqyoiy0w7s9x2lsluppfcb81szsaq6o9k06mmkdkzp2bs0mhmq52z3wk4gtleo75a7e9fadh4931ud31hckc6dc77clwcyfr50ij5r2vhkh794zqjzrf3qw8wwlgrvas3c75jltyoebgy5acx3zj58jm3oext24zdytog34d23cwc9k1xj27',
                surname: 'shad1e3kme3j0cn2ii540aq122dm2asfvn5gfup5mojr4c34rsibz80wiaoi9kboutlj85kzx5ff4qwlicnhx81777m880j0gg2issq1vup5ijpzrkwxdkokrdiz2s6hn53kfnexyw9195rrm10p19hmu639k9zpe1nekdu376crp2ifv1qas090tjrf6d7uasy7bgbxid4vuwshm4nuw9ama4k4lw7prp8rzhfhnpz41nyph9n91aehk7eo31i',
                email: 'ep0vw32yf8umdag4d5n355dexq9hi31dlob0tyc3npp15cyfcbfk931zw9eqbaum5mcpmgrbf039yw8esghjebi899gl0ojrueuzdxrvmz7to20ufg1ots5n',
                mobile: 'gsjpkflqskcz0u7nfay15w61w0hpdgf9jvau97tijjtsxkdg8xwckn9siww9',
                area: 'b6kblydzyrj9s68yxmin0hw2p9uvyzr93z93u3e22om3y7b8hwbydvtozp92cmcza3r429layt49qdzylv92xjmfppiol7m314d1lq3v18r3yerh81spssm04orw8vghcleb4x839lcfl0opdunvwj8mfmdc1w5svr072l9rkclc7hy1n4beafok5ecwx3bsrwxl9pbzp09u6y5d673892fmmjwvhsynhbe4x50jfkh6ctqe86ngn1vpb6jemuo',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'y22qg89mmd962rgib96v7jrrkl4w57i0b9udz',
                systemName: '2y7zt9qjg602oue809i1',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'ch3kae79lq3ofmb2h24f1xikub6lq8glzglf1qlt44slaibovz62t95zkm6vekg88e46usem1lmxuysliv2wvry78x83ql0irea284x6jh5kxtpan8xmlmslhi2k2cbbbu1vrs7502c9j2u9h7z0npckr5m2bqqr7zudh3b3jkglihu8uoegoqyopsp2ikwysn91axxx0twwuqtj4d7po1p94elh3b6z1xpacai5h3m08lc6e2tnwgrp0cpldk6',
                name: '7vy17st2araofgr7buodewppnwb1yknggvb3exm9s4ufuc6iafpvkk0ms5mlw7dtugvch3o47505m2nanq8pp8xx4e5borhpbrw3ne6uss446gqzzxnkay5hjk8zf3goibzbsn4ewt07y1jroi6mki52dc3jo0y7h15dtacjg6a62qelllrxtr8m05q7j2kbirsue94d3jzke1le78gabovyp0utbfrmfmeobqncyceidmov4jrxygu6yu2f0zc',
                surname: 'hpfiepds02pbzp1p7nmuaypcug32nkzre9xc6o7yfpkz79a18886xeoovokw3gcl9q52i2nmbwclphw86yirpdq0ky0qojfdy78lgaklmibinwqfp7768tykw369ww28dupnsysshdlpd8tg8uyfr0pd2l977d8899r2mc6cnvey1s0zqeatcbc6x45gf6mjl6u1uts5wm031utz0y8nhwhklxjb6qrlh3xoci8c9e4bda9k052ts5ai9vtrhq4',
                email: 'zab6oygcsdnru61usdxgyy643s8an4kqe21217jjyogitu99owc8mlkj1rjc56kh6up7spy8v8pb6s8ualu7fm96s81gmiv27nnod7atsm32yev6qsww1dfz',
                mobile: 'wl1librsns4sm6uo33yp74szlpni049yy8sleax3uo3mukju869kolme7phf',
                area: '3tt7pb77urf7xf1v8ck8uzt4bshr64r82ht48lq1r3jnuioqj2e8w42cjwuypxlnzq05dlh0bu2bklmc13f14xrjnvsf75dhku95wsjd6k13k80iw3zddbhphm98458brezdn5yiyt5emiff93gusmoqsd3wg9od8b2ej0du0re0keq1l6u0z5vkiovt54y7k7mt7stfqw49moa5d477pyh9ozt0ic2n1k4kposecb5hto79ode31n0w6u5x30y',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '6pfvc30toq9ltlceirap',
                roleId: 'jsgk0bq4y1ju14ej2qbcb1ij6vm3hoj644lio',
                roleName: 'a3vuvavx12i3959kzv9liswzqw2a0sgxbow6bawjcfmybnq1zybctv5o3zi946x2smojmalhkhzfb0erceiold29zn8zlf4mvdaqvd5fwajzmmi4znvx4j24x0mvue3f118icwzzowckoj0mjt9klp5py263730filz98uwxtu77f3qd1uq1ebxf5t8w1eux49owuf52hydcjphzr4drdv0dsbbxbajzah7x4nhtasoefxmg0sw0nj4eo7vir97',
                name: 'f2bgxn1nt3jdyxdrvi765ubyhoqx8006gbsevjtnvvtjpe5pqzuc481vwvtznyizrxzrdl80yasu4xxyl1bezrmngjhycfz9v2zgdklsln8nlwflmpinuginxhrg1g8f6c0lemdc8gyxtplaob0erzrxtrn7wpcwp7iofyki20wtkdx60atbslzaz3dlpxqkz7gjhhzbinbv2tmt82r9wkpw2fscobmv89nztzcyt4ayd2r33kxliq0a9tiol4v',
                surname: '6hy26tsyw0z5c04bumre1mvtqz1vpfyfl5em5npnt0r6ymmojb5vvqmdqrxq1fuc6aubpqduz2kdok21ft3mnlkghytwekwr66sev06kpl36y1vg18sgyie1ik04a7h02eai4psly9bm8il226590tgyqgajw69os9h8dqzyqt0enrmaza2dpkxnu49q5xvrvliu9uvhu0985r79es8l4cjt0ohl6dy1uqfx94ah6yorfdnvmkg7ucfym6ezld0',
                email: 'ragh4kw7vqodg2rbqr3ukw2rc10c44kz6xnrtwzw7ztd7dxovr8ax1mujnv0fb8osvcbw6zsezxnw7op5vs43kyubmikbi6gh0z51h0lccxkaw0fet41o78d',
                mobile: '2m1c4oy3ca1df93x3s3xqk7bjf6gs3dufpxemlpw32mikin1w98tjtg430w6',
                area: 'nl8m6n4itwwjijto42lglhz3t92a6lf8npenrw8inyaeh7zkmow617r8dgox7mjn1mp22yshy28ph1htptba7hse9pr8qcbzbtbu5lnqcgpibnsyvbvhtvr14mke13y1hkwcoog54nhl06vlnebmz0d46jo0jtfh8jayhsj3ko8i4cv6nz21u5wmbzpbvh0yex5syila8rfjyr8h7uujp2lvz7pvw0re5a8c535f9rn8y8ja1ft06zwn7cpog4r',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'kh1v29wfjv72yylyopfnd',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '5yulp8dmsbj8ib4hgkbucgpk7laftvxs95oks9aupai3nt9fsx18lpr7rbqm1ztua20e6cb0s7ueyexoko4jvfe7e9p9239nyyes0uqhdncci1djyg49psyyp4f7phtlq2zm58f9w2sdgm3fi3yv12rzonoj5nyi6y65hm0kw8m8llifxvyz0mmfs6tvcf6wr8w9frxswruc2durzehw8p8j87klzqq78bzh1pxlcy32mxsbby5qczr68wdc2ga',
                name: 'qc8f3xnx6o6n6x8wnxxtsuaedh8wduym2i0t672ikrdeuyj1blox5wi7tnoyhy75b3p865etprxcww1hrtwx1oy7fcq8e0slwa1xue57e433xews8nqedjw2q87deepzxqw5znx9fcueectzj06exh4jc5ondv7ni4qfl7ye88hh4qe7aumef8zpw68z4n6cjv23kzqh8fucjdlwn8m49d66jg7uh1ts8rh3q5p7mxueys96dkl5j7jvfblptxg',
                surname: 'iavfkre0r2icr0vsop36isqm3rb5co3vrtgpxetysla97wfv3yne5u6zma2x8s24nfwoz8axrbos8d9ki3p9zzmj07bpwtkp0tw3q0zknsh3ds1qekyx4uk4ecuq1ec0gtdhwbj5ngblbu0wdnjtqc7rj6x8e92p6il3e6ou70u1yv2ss70schyo291dyrxod9xi2jreem9k0s1aghjycq3xuou4nabia00jta3sv5qq57rnmj398to1au8qtpn',
                email: 'a1oqsohpi967frkq0x2wuftlzh7sppvq4azocpbd4n152zcbdacnx0yva9pcugrn1h0w41xvu2ksxgs8hfm8dkzviaid1923vkb7bkhajesrrhkmmzxvopho',
                mobile: 'lepcgrus5ozukpyhx9urms3iqlpksfjp1g45cij2fll81n07ol6rjv8jfmgq',
                area: 'hkd7vnle2hcd9ju2elvk1u7oisa9z5k2tp1ow5z6vlt1k347r54e2yhm3nh9wvn0gdfmuncuhdzfcnc6a5u5ykuvnzcb9aqsp7xe1wk79xnq9hosyou29y8d971w6kyz1naen119qpl5kh5j8ow3ymy12ilozgtcvq4096naa89q7kmb1m2x0ehftqbuolmtnvrf69yiceh44on4u0vzvjy0tbu455m5iucms72j5d2rrl34h3io1alqfmieej7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '09918llpug085qllmeyz',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'vo1f7mpa1z79dx0vcww1cwpqxslhyd2ssrrz9hdahab6c0cdb8k1dr30cvy4qj98abe3u67vf7o3dkfamy6xxcgwlrn5gie5is3b7fq7tn1k3wr5hbua75ipm3xpmbngdgpu9e6hxk989pwsvizv13458bzi7mp5gz43rilarypjlfz9p4lxalm4glmyzknooxr97f8ta1hr894kkgbroxju9p4n7f1hao6azy6i5r3edbicty67p9aj2dn5oilf',
                name: 'gxdmvpbfzp5a79urnl3cam0z560i5um4yxswyjeskwxkn8mgm5tw4e1c09byfxyeibc781yafb18d5jfm6yi60kt9wn5s4irp1rprfbc6e30auleebw50j08i95h6a6svhgbskrp86747pascd2xcn6zau873sct4f06wff8rybzlk4975s0rgr67hq9ro806kx183t407skvzcpzj6asidatptvujkvpa1gyi7ob1ohwfpvruhcmg5gv9h4saz',
                surname: '9yy9v65sq0v1ofm0jo5gjaisjfewvsapxsr20ngyw10oaav97e04mxhm0t7lz7afo63xx9a03zb6yymwa61o7ddfsn96c291sn53bll1nnc2tiek2wvej4kyjm7w1k0dahieb7ihn6ztvhjq00cq8qbnmcmptsm6tkww7o0qgxjovhwmixih3j3ir3kqurqk1eidsf7cn9z09eqetzkj8j62gbpq5o60n0v9308qgc20h13wy0x216fqvolzzd7',
                email: 'qizib09zsib087zw0r9ammohclow64ku8l5yc8wjprma1f6a1fxyah9ccuw7xk6ht2b8ac5ga647yae06yuo2qt6xeys9qgfvkwaxsuwic3er8l60coevhzv',
                mobile: '8j4oyhqw60st3zz5kueancypft1bjwvturio3061k1iy3ksgnvd95eomi44q',
                area: 'szc0y13hn4e35s0ok07gb7zthuc71irbr0sivyuwb86qvg4mkx08g43i71cgdnc2y6bmvtry5f3bkn6qjb9x376eoltfpp9leztnojugov99iirxbj8b9tmbvyo3167yjq96tgh9g33pucpjjd8ffsngrua86ej1i43h6daesb0mxffwmidnonzbsxrjlusxzn5ncxhmj6x14lc6avz84mva3cl5bahfoeygm3dsr2g9vtypmcern6b3o8hgzr5',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'rbg1tr9tm6kylyoafkvm',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'htuu422og1bz9l6s6bmopzjoxvnro9v3nfxuq3gfidxqmgeh1tz7bb7hou85c6fc6ev86tktbq67qx9xy33gt9zo4zht1md668u4mz0bsn3amn73p43hoq135t1m8m8u45tetzzrd6eqpup1wemztopqymxq2pxlz00pk8egl9941z9c3jppa18uopkywjeb36qdcaqlkr7u8emvqqyy6b66frwjfrrnqx44tzz9sjvq44c7n6rc2zhplzw69vq',
                name: 'usy3lk01qx2xo1s2t0xabrn57ptzzihbqftmn0o8bvrfdqbl9w2pj1zpljwkfw37pkaiqg8ljceglny2aarn73dnivwp8p43wcr1d1vvlv51sm9w8mym37wrczutp2k2a0s5z9ehd5gtk5t61j9ophro70lpfjtez82l23wyk7b2i2ycmftce8rvdp2vaw3s5szcapkjlypo3i9r82tzhl7485cjgd41u3g9hjx68x7sw1kz8udjrcy8e5tvuic3',
                surname: 'l9gprsv42nmz42djqopnr3boctfeoyzejooa0wsx7hy1wxksdwnm28m29pd42s7tuw2c97gpuiqmnutmbrskvtpfo9zm2mndwuzk47lrl7j3anlgrzjoxrdr970dv82u5pmeocdat3p5lkmeyxs5jcvb9v61ozvon1d9vmusal4x53r38tp2s68h2e8z4cyk64vcrf2iwonphhleww8mwqgyry9ddoyujs7dmvnidrqlanx3si1rhxggdr6a9ac',
                email: '0k6nlaw7l8r0wkt5vywsmcqa14c5msfwabic98zut8g9sqe6e2284hfx2ijerosa47oqys1kupx20gum11jxn84avmatg51k175j6z3zx49svvslm5pa9krz',
                mobile: 'beypa1wkec2u4s4r7phk5164b10nz3hr8yep9c9yyhmd0h59syqla4jakt74',
                area: '9k84mzj9g3u79ktdno60o11omjmg64hjwc4qhg6pu1iiqhpq0v8f38xvw2utfy2kqi7d7u2nkkh12n9il44i434fh2j8sztizdnlmpld3v140mytvsa30b0g75nf5q6ga9dcyk5z9hoxbcpbca22402jt7zyp9809przlq4ks9jdyrnne9okhu929rkafbwyj3sjcla42ssiq4n9rlyfy854qnh2b9xr2ugbbe12g7n02rq4o1adbiqhednektp',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '6m9pejeu75yg49aqjyjx',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '9pzrvz4xwk47c2b1zf26x224x0tttwhnp049vghfbr9j32iqbogppgfn6itfuw3nia809v684nfckcpjgy40y0w92xldf0nieeagedwafhtrjsiaxleips24r1a0xjtr6asfihdtvrf81lay06wucv4ij8m0mhevpiuk43758rjteldemat45eadmfdul0fro8ktwy2d1kxz2momc6e8varmldee7hzdttem7cfvyrfialzg7ifq2harbz6ecaj',
                name: '1qxcqu16r377hmkkc3x24h7njsaj8ko8tc9eelejkvr8zmgra3dskybexpu1yyszxzo8yl46g1ajmvusizl2rdx4s84mcsyavc1cspuwz42ebgfk11qcmt9x0sdfjlzp0r4n3npr9yrnbzkome2vep815myjfuxrnwueodlg1dwvbdvjshy3czxe2jd2pz5cj52g28bjje0855vjz43kv6j8bh3nxga75yfq1vqvjqx69867ce14okms1daoaor',
                surname: 'x76a2w6o01kyggktzmt9bfjzl7gtoodti4er2qxrvrroeew21wo0nwtz2x8tegcetgrq0aithi5t0iqsodoa0z3gq5joa884xqkt0n7n407voda4xwdfsz3ubj72xhw543a6jl35l1c5b4nsl5hka99v7s1je80zt5c2ll14ryrzjt1l18vq3fieh05se43bu1i1wfmt6b52p9en65qwo1rur5pdox8l3j5cawfiq5rtnk9w9si1fygi75ho9b70',
                email: '73swwlxa801to4ojm8kuhs7vzp10ppr0iumsvrugl974up71t4f6hxcn6gvrfjv1ydpge81yjkmmlghjq8rs081bsqu8k9xzopumdep6w17xscme60h9g4zg',
                mobile: '05551ag20c9c7urwyun019x0h0sx0tww4vt4qudgpl7uhq7yauxlr8fnjvc9',
                area: 'hgvzrof02zllpg5s20iumcs1bp0q3aj8w2igqhe752gt4riau9rzrpm2qkoe4to5dyvlovha3icroc3kt4mby0pzslgp68uczhsl4r8dz53juwgu4egc6wgwees8h5wllmkfscdzdlqlxf4xxadlrbfgomt6cbauk5me36tag82gslwunlizl8vtxcyzm2jqzxoha1lwoe6ts5dk4a9eegmz51v8gwtv77eiluu4yywocajo6o6894ajw3zhh2r',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'mwhlo2uidgtw6btkfikj',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'bxfvt27j8o9n2vi2xq7pty7n3k6acxlrojtulsqcr5mk9fa9piaauiselww26ha6etcizdywsbhyhoo5cvqaia8lcgutgvce47v7nibx6jh105fodhwc0u7eihb7p4vfvi4wrhxks6pl3dfhg1q8qyqaftemeeowkvft9jvj1j9xc337s110fc6l8qqom3yev1nv4ijn2oeqyfrzamcki6jni6dhf9q5zzs7qhbyg7ijqbc7v4twejapbuu1i00',
                name: 'jytd3buyozyp8gr6ywf4gh5sp2l31wugoik4zlmp5t7fzoui8pq1zcyqbpylcnmvk1ficgzx7ol33to9z1lsxtgie022yf1fj6qt1ozbx65vxz9rfh0uezq95m134haov3ff0qbovzs9z4ib826y05oytmxd296sv840qh6t2f2b5fq2qizvv072rye2i5nvmh166ifuefpx19cq13jlc9he9adnvcq4dtlvmy5fbis74tab8znwiou8djm45jp',
                surname: '2cwb1obj2jrhj750yqr4shkalnkn1qeceiptioo3t9axamgvk6a5vj1wz9hyagc0r27t1hpu6ah4qafckmuj05kcdgbdb5lwouysvyllgtqzqy9nqkefv0we9yrj4l4ltxqtjdk8d4v5r0ldfg9e3ibf938uihi7zbne8gnpimmowyyr0oq47mirfvr86nriwl45iilblt8ui4ybrqhk3zjz0wyodxygw1n0cht160vcopzj9ixtaq6k9dmu0lz',
                email: 't1gggp57lebjw6m26cvn7cyhiaylqimr6trqgl2ifn86cct6ecu9p9euu0cjbxr4r7m55ir7rtcjowo62eo30z1rbc67278mrfnamiclb3m8ultk9rmsex1ly',
                mobile: 'a6pg29re140qniq1ig54cgw8zoykyb8z7zz3sbd5puk6a5ws625ma3efgmpo',
                area: '54t9ywgeisq07ec8hk81knfoikfjshb90zgktru5zvjq6ucdizivy2ksn51hk504lwsbog7o5p9aqx5jie8qw2jou68qflkmlzm70gwuphp8ey1916ffcsbnca9h87mk8eos3w36mmalqn07b68trvquehnzac92xroqq2ilfhbfjichbp8dvzihv4go793xp3jjz3vug1istv511k3iwxsxu01qgs3wqqaewottkdt94kav6laabwms9gl3i4i',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'oibcdgx0rml8n3hbjl5f',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '48wajr77nndz6msu3wsymbor3iqpl4ve0nxgzhzgp06v7dh1a466xqtx4sg4m6hdxe4vrc4ucnu9r9e3cwam5hn9uil1agkmlq7h2r74afbeo9ok18fjdsqig521hqwq2farjgna17d5j2vuu554gcuoihk59lspujrg1xbo1u2syhseq01btyven8xdb3jsspp7u53xo8n0x1udyy8zg1r6tc0w0z0dmiv5zlvqmyv4cc9h2hgunoh3yo69301',
                name: 'uobiw98fqh011bg272vkkrety1e3cexhgg0q2okqck0x2yobxesum7o2xt7dphj5e8lygpbi80g4rcqousxcxxrqmk2c18951nhe6rop21hiiozbpg7k25d24h2qzckslmn0fur7xrd7nitugtsm2g3bppire5k12exg8bup0t1usmbhdip1sz330t7vcnym495x4ykp64dl824q6grzryv8ny4tueq80840anfzo825v0xr78w9of7l38yq0nw',
                surname: 'tmg3nafpqr3ce6718a4zs7tv4j7t64nboy0381zstd7t836sdmx3tifp25dokg8lkbzg5nz0cxhd0pdjv3k6j0vt21rvejr3n3je3md2jan6df613hoy7yc5aqt6ueptryjat2b65km3euadnxr66kmq0hmioq8rcbllxp4u4co6344nsjrfbmsmln3bhnzlfv78rt7xrfvn7r9v772ew2ryve95v2w14da7x0o1xnwknonefijvxslpj7n4mqh',
                email: '4s3m1t6nqk0sj0v351tqg9bqqcrgwzd9hkhc7oy88lkcsbwnjtd80wasn6nbel8fpvfhdm1pi4rlgz47e90mts19tg100d6jefd7ktu73m960w1iuowfi8g8',
                mobile: 'nj7wibxa9c6i3mtuwue7bu2b54u86cnykeag0v6wln9k54kusbiuk5bwkavma',
                area: 'l7vp10f6ejwt8er1o1fp24liij4fmsge3lvov6tpatnickykho8s0awyhep8quu09i7qm6vq6uapftje1gib6ujbjbsrt7rkzi7jeqjtmphlvpy6mszxcfsvo7w7qenx3m1h3qsgsx8wkxjy28b7nkgciitsqukc8sd33w5if2cpxl375ef7ejlsl87kchu5fiqwvptlx3htfiksa7azz1nxh703dlsq8euf67x4ib74se60sq5wxpifugzmjad',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'bf1j2gtdm9hwch77maqc',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'mbgprciwnkay0e385aw4yul3wk54ivku52ng2rf2fcqeszv1tzd4mvlo428zcs1zhs22cup7nkqirvchycy4wlc8mpr1jpgs4kezk2e8txurt8pjlyrqs3jvz8nmfqt87vx4nplxz081ncrjm5rfr5dh7woh58ufoj0aaxkks5rgv6m3d1exsi05z4bbro6iz6ixa9sln442w576vtthnvny1zbov9o1miks803mkmo0gz94xr1i7xx57ag8k70',
                name: 'mdw2na43bhpt4qyfs4bsr5supub8uan7ch6m9627zg73xlzk1w2o8b9y0nfc61fnoap66kq1bdj3355v1fq3bojo3kc2hl5yzkcsbi2mpbdekf3ut2pcvrilkyl2prbhl1traulfqf8zp8ixyqzae113dvnly11cq63iebee2lj4jby7099nqtkg2xvd2ru8v1vxetbzyc0fhxuci35xbb81qgv47h5xrblyyq4mh9ioo6gv1emxsr1wu3wsstu',
                surname: 'u7xgi98mduxv5d3f85qq1z8rejgczrmzrj63g8i8ryq2dzpan183qh1e24iqaheve06c4xh29nccslghgt55n26iyu5ljoq6iojwp95ool22b1z3swp6pp4psmver9hh741b8jp4yyx6gmns53n4nfdhelx6c5h1gj6tfxsxmb5jls58bstn4x5mdvbna8p1cpy70jkovk20n1pq36zyv840vkchse5pry2haa680o1qcb32shihyj4lscwyrn1',
                email: 'r6x3m3cscwouzk6mh6m0tcaymg6c6elxi1www4t4luco6ydewg253a7byt9lt91cre960swcoa04jm658m1xk79te2nrjnff8i8wdfhegqai2jinhcgmqp2q',
                mobile: 'ho35au5ds1b2exk9hviwo4y6n5o06nj8v735sowpnrmjmd6gxynloyfe79z2',
                area: 'sekg128hzc9p2kollbepk98ufa3vv68i1pltcp4wl10zlplnuv5yja7bwpikmxw43a0zu82msr7j9zsmcdcu5py3c25jtoi4ar92bpqdqldaz5d1c9zbkjtmwtzj942la04mqq4g3hqbwyn52hrb26vqx5iu5svy4ed9md3g66fjgx5gspkb32e3mrh2ey2a09el3ff7r2yc6ldmbtm2y28k2ddyordbuj7dkys2c70l31gwl76ic61ppy582huk',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'bl0g9boac5ynz8w71pxu',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '4t1b105qs94kck70nmvqkskv5clk7y6mke669wi69acfcqvhklbcmyrshqjnbagi5sojra432oeo9piobdhfghjmw5u7qczzm8pk1jtqm648ij597h6r2g5pgkz5upvgvjfls98ru88uioqnc3fztvf7bpkx4kl5ni0cj2fgt9sp9b84er0ceuigxxkjpkasog1ng5arcjsd42xnnx6arow30fdqrkqr6x76txy4q5hipbrlmq2bycwn88l2dbc',
                name: 'tdq2442izk990r5v7fpj4szfjx5wy5uhduk6zrszv1h8jiag75in8qv4kgfg2thi5jicwi226qydsoxlxy0dltz1oj20p060562z6h5q2sbmeps30ub5ktbwqxbg9lvc32cd6ug10idxipevtbbk6ue3dud2auy2clwhq82e0d53f6kjkiirl4baxoms1ax7ohzk1t71mejco02odgqk0ztcf9614t5fyfg4wbqa8n3esfg27l23o1mra0o4zk8',
                surname: '1zr3bujo5js1a7dqads55x6si3y5y11xh5iflfc3zxl4kcdro2z6k8jsd16q9cbstjx51fxv67bqsxhuj9byyo5cp9vuhzmqk7ps980574hq0gka7uxnj89gpxl6jy0393pn6eplaa2yq2yayxidadtqlypmvtkv5rntdhakh8z5j5dg76rrxbqzvy5d226ycct2o6bpue3y6f7m7r9wdvm4meccj744mbksjbctetpi3j4l8grza8xc1z55zz4',
                email: 'pgtwycpmtfa8y7y3ida4w1qu10s7xic7c6y5bokzezqhdja6jrwztc24lwvh9lg04xuygh7rhhy2g272bgkvo98643x55owdgyaijy9ur1cp0nujadyv2ewq',
                mobile: '0i5hmxwlvtfy32acc414tzkpzxp5cj7rrhagdy5e39fvvyim9ujx8llmkudk',
                area: 'x269f9qezus2bh49pee70ltn6wssbpsjjpxflz54tyenqekruba4qz1cvu53for3qtmvasfoj5lvgnhtkk55li07opf4mov6a1utl5ext5jf8w0nbput5wndzy4p0uw7eedjge0t6cgynzcj1ybc98uri005p6e0po4mj8yj873anw15vx8jet3r5ppnxabekccb7lbh27ryaaxxvvekm5son626nzq71kkz36q8o58nd1x9h0uawitywgyqtl0',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: 'pfkhwooiukqbwxy4dj7j',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '5uli1b7m63llzed6yjnf1h4cpwgxm1k9h61pykurfe77wyzr3l5g03y69dne1xzdif4v3dt7bfuqji25crcsgvzoea3rtqemv3angzdw0gfe6spbilp1qhsvgh5xr53fkzmum4mumwmji2sbx3f5rgxlchchn3ulzbuyf8bwli98dxawrico5xlr3xguyix8jaqsi39x8z6rarv1lahm4yvsh92a8w4f46zscxyhf5bopufblto93euf6rgvd4a',
                name: 'jptcau36qo13057ktdzn8dtnz34tdf9dwne0jg5bp5f4grrdt6fhhw59v9j0hbughjeawuvr6hd74f7ho4k6flewyiitnhd7zobmmvzf58cwrcuzljidsf7wpikpprduip677l0ye7o6fihrcp3t02abbg1i99s62kt2g18mgihz6r3523agfsdizpha2lnc29anvd5xfgyfj1klr9stx0iph893lmyn7jm26xnwb7m351c0cnqht9cb2g7guyu',
                surname: 're5e7al1r3hey6sthhsmg994d4bgtevfge185sfv1uv61es9h5d8f7ukoaekzhu6mlzcxhp8c0hv466mcm5d9n0yoq6l24uwwh7wg9ajlcb10p2d1h9yor8xkz1lqgsnq6jela4pz2hpuswz9ratve6v9ql1wdde0iae3lbjxtiauh52t2s7dqyajpze9yptnik8nfeogwpkt1lqamqidm19ghovyieb8o461jp4bxma1h05r3tqixhohz4x6t0',
                email: 'o12w865ubyrt0wdh3r2g036lj1y67y1bb9po8ixe072r50zeng4fk0n9mdp2ut7ankn1vrrd23l7yuicztaxjo1weairhapzvsn9mprkdos69lzrokzu1s1y',
                mobile: 'd5gqnc2fsacolwzlql05ifzi1lh613e3z8rcdkdfmwz7p9y0asyknx2l6p5r',
                area: 'u3ytfx8tmn8b7ujg0v01611k4lwgccp2x7dg3pu92pakplmu9u7s6jklqorfycaurvlrqu0zq179rbz2z1bc7xhrx8gh72p8ph4med9i658dm6nymteu3n92213as4ngz3uradbxicwsxt22e32dl0gobthm8d0dmthfxkgrdsw5m58e1jow4fphnnk3nxvsfzzxwhcjr75glzjxwjefgicuxmt4j4pcziingw8opl1jqxzmcqs4a88s7apl1h8',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '2q08q25de9bo49c0dnvt',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '3az4s6qhxvkfnlpx2esrljxidhj6c9fnlx2768y78d11k3fzp3mr47scb1q45bpp66np83yjdj8ra0dsh56g08zp59vllc2h3v5hdd5dw5898g3cb1uew8h1shwctqe4dv5wp3n76qiodpoxk2zdl7v4vtijhdzmjigogjax1d6zfslbo8t5i917zpn17h49lksordykv357x60ozjot6ifeie9mw4wbr5qsmg6a4p7amrrzww4xfdl3shzuwzs',
                name: 'rkiozmyh6x7ti1aoz3id6x1g5lh60fts1gc71n67b0maemqgj0bxmyphy7s0apevq2diebttsy0zkhoxj3haf3rcvhbnow0ndh1e5aycuct7nf9mh9epvpvq47o2etihpn6jtzkv9acjvwd8no1xeiobtzk3fgqiun8z6pbqv2rqt9zs7fuu47do9r79x914az5fymea9rl8cc0f51xgr1wg6tltiaesjwo3vopnnlhg4z2bn8xfyt4l8d50o5o',
                surname: 'jaruiba64vyr87ay5kk48y7gfqn2y974nxbx657o8i22cz6phvgy4sgh5ajppaamst4sivhkayi038zgqhk3b5l4wmvl3l0736rqvmkrqg3kpzlu2990fki1u8m6tbafbhyghvago03aatvo2h6wdpafrtownpgz6fjamswpze77v0ox97uigdcc0z7bxcnde00cmwc2s0glms5q1ncvlauznr5eja1dvdy6jkzn4o9u3j2sk6l5r4i9cxhke0f',
                email: '0biffspeze24cn7puntgjagcgk2err3lo4mjwz76pgjzp7c75s6wnafm23tkrg55i52x0l6dm5mdg5z8y9gpdoccgdgn2db8ap8fm9wbr703apnv6183d2zo',
                mobile: '903rfc0xq2f0xswhzmhym12ky347mgbvqpvfhx1n0uwuj17ce2kdmdh3yh5i',
                area: '5bm95rvhu72r86sezvwe2pn3rufiug6pkh8kb6sxq70zbyr6hyh6a5ncuyh1cd9fgp9l3p5qs8vua1zvwqbw9awcw2loytj074t80t2lpt3gcgan0r83jksxkxbag6rsa2fvl2k0sucnewl5p33tvydu1k0lf1xjedqgi9581l31xvq4cz68nylelf1b0lgv7ancikb9s7csl6u0oncgl6x7fqryna0suxp8amxfhg4kzitf3cbafjb4te96tvv',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: 'true',
                flowsId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '3w9s7zn1thicgdh8luz2',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: 'hpr1092wx5ohq7btok4vp6jw0p68ttngnrwnqkru552145p2mooka3kkwptom1jbqdw4inimiedsmcb2ydl2z5m6awq3wpcp2h6srfswu3r69ucn9zmov30zokd2048l9ixvkkj90qrveh4936r95zi62yni66nml6no3iuwtnvi1roplrpvj6kaiw2b9nwn34dzezrgq94o1i235lmmd8zadwwbhd6uf1r1ygrwn96i4tljfzck7zh8gxlovlj',
                name: '4b8d4kan9cgs8ckianer6e5qtmo91s1tgvkdrs1cvtjnichg8brhnauvm0up9vrtull3t0qrv7ygyhmup4m8nbwtsto5wgs16fvbu0i9aovs1m9m9bz0i25ju7tx52kyf4ypz37qj6jt5nnopnftfwdtfv5llnubt22zmdfj1zrckrfnritso21jwqrbyrddihsj362umpr926h9tx701bmzte4l7j72msal12jh193tofekoujl7ag3tr1rrhn',
                surname: 'r9lqqroemmdyspsxpbhe05j76676e8i7bu36gcnwpvrkeoozwgqr1axvgmjfvwtzgmkipomgqhouutu31fttu2l6w2xdpvg59ym7xz6hebmfniafsrr796zm0yep5lyzbkfo7l48rfbort2ntuasii0jlkmzb3ke6rem0xyjual6lzdi53p6xcz9iononbpvz3lkrgx33rjf5z568c9jislhdrge45m2kpajadu92z435q5woosn83ak2cjeplk',
                email: '7kkhh7ffpqb56bdwac3lqbdm5dal9di0xfgq8ggcgn8085x6t28ihnmf5qsjwagyjv2cjvvyrq8uiinjamzh77w9d75yuecv429i2vtvuigjoi2wf7wnorr8',
                mobile: 'wfzvp0yaqkc7ihq9jlqpryt23u98hfnll1w453evxg33ndwpn87h657by9ij',
                area: 'zquhn06nklcan4hgbblabjrb1pgwc29f7sfr94wv1b9dnj4mfsziba2m4dvjwi4mxlenn0jca6j6shzb59t1i3mhukrjksqw4ronbhkb6lhey1hri05j9bw8rtkzjp4zi1n2zbpb6rnx86ldfrsspiglln2ezevxkijk360hjvxi93iws4hhrvpi0wy8s9h8b1j33rnyqqrnpsvrn9m95i2bqiyqto5tbew12mtze7ntic3huojnut1sesfo14d',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/contact`, () => 
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
                        value   : 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'));
    });

    it(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'));
    });

    it(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '24f160c3-8543-4459-8ac6-14597ba50b1b',
                tenantId: 'dcc45a3c-1fa8-46e7-abc5-2c4eecfad122',
                systemId: 'e86caad5-17d2-49e1-9083-87359df75788',
                systemName: '8dzuz4c7qzy6zbhmpsjm',
                roleId: 'd7122471-8c90-4272-944e-606f1a0f0a61',
                roleName: 'ftsy4uroi0z52pgc0xsz4x6taqycedijne52chd19vs0wib7cq2kaiid8ii7ceoyic99z0yca1jtyaugrbn9hjyihwuar3ppaya2k98478odz3iqakv21j50kjwiu2b4q0mrcsf2yiaip54p5kkxh6uhhhw3lwppv1vhx7rjmhkv0orcbzicdph79lmj5iz6pny9chj8z9axzw5vjbiswdissp0iczhduye2n7lciv9szqldig9zp3n77cime7b',
                name: 'iuafkyug1zz9m7zrx3tghe0flzrmhw42w2dd2l7dppgcrkpi1zfpy59w8ctihsbmcp4jyfxjxxp41f3e1z65h8uajta7bp08hyud9bno5vsagfg4k6o4es1hj57xs7t8y2ntwew02ds7obomxnccf6uudtn0ip03tsfv4vm6sq2md6kf151uf2xw8d14zcyibemtxcs5dmyowr8psdmutc8wwaiqhqi4ivd6b4kqnsm277hx73oqexduhv0bxto',
                surname: 'sn439jqkvm6n4c275k61yk8kcmxypd6av2abpdzhl6dmeefy9bb633ihtl9rldu0ygspgdpguxw07j1vzjtg68n7jlzp56m6qr0q9lljnz8sicb325j1vkkruueb8xd20m6e50099s8oh7qwhdanthfgfx95i6nf2c22qj7sw2wu4oncr8xvqsbj51fhwm0jpgjmjwo9sqeh9o4ffixhjdgngisqx8vb1e4axtcxypiu43ayy6bj4abmzyxrisu',
                email: 'sy3hvfhny17dcrtav4k0gge434vyrvaps9s6baq2tm3obv7axifl3e92axra19xiywn8d79zium1iylz9ccd3mtqg6i5q6vyz8ghoq12agz0xwblby5lmv6p',
                mobile: 'm6k5vd34125ja1gwg730po7991h8z1g2h4gm9ue3ergjzfygyfew10j5yqmr',
                area: 'f93ice3gah1s88jthc2j7jsjrn67sas4ot4us4zvzxjsjv1aom3mdp0aceq10ij70kzclws95p8fnzm4xp51rossi05prmq0izgpqw91jbi0kmugf5bobxv9n4weakfiqbmotuf8x4c5t53w6odpz4ymz3wthpclxn7f6nts3yldi48xtf3pydezvuywtiq3p2gu2t8r50xmk2yfvks7sinnfw205wvoyw6y9hxqil8n2q0wp6lltgi7g0gsk7t',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
                flowsId: [],
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                systemName: '2m7teb0hqhvk5ev9msat',
                roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                roleName: '8k70cqzipbslft3xo5cmr4rhos7jzkc0o683g8biuzrvsmiwbb2a5t6vkz8ua1izfdcag8vovekkrj07xfxjw7ozhw0digvtwh5k219pjjs9njp5ndm65nufr3s9u51z5ezf2s9y5io4jjda4rgbqlegduuoue9bkbz8ik6atldyp9scmj7a2msvphpgq6iv4fvdj6nil72fylfkla7zxgjtwy2w2esk2fwns1b5du3ra9zhkt872if0lhkv5r7',
                name: '15yqhbwejtr866s9kgzepps86z1xpqgnyzc2lh14r9o1ilx0gk8brmihux54vq2jc4vrfo3zs3pepajq0brjio4bghftkcw8mboadmhwrm0q6imoix13tsxzekkqmq32u8urgqu5328w4faa4kajog7esxpusmjo07u8dqkpkzhz0a73wr5nm64gnhv49k9q7v645ms0br8hf33bwrwe81j2xi74unxl0aenbka4oyme1774bklokhnnx3trj96',
                surname: 'f14ktlcv0k4qfz2zvtn32djowfq4c2iqmvfrcb2swi8xrjvf2aclwtm875000j2nudaj58ty4jfslu3svnndnq5stubt69cissvst6ajhhxbby60374e9zofyb9elx4y4v7sgioi0srrboqioj1hl0ic8vlm4m71q7fvs019p6swwk3lvbaflu9ezk5m2q7mbe80chg2gbxz85shdo9eo5xhbeu905r6imgbhwzdrbn1yaxk5tbo0gthhs67wcm',
                email: 'j1n6jf9anu2qpp6xnok3ulzun3b4p71mdewfh2yhucdyy9dzr5qfk9lhf2kng1nt3c6ajkivunzantoe7nj649hurgx1tbg8vaqzodkmpcoyqtfzws52vkvc',
                mobile: 't8qrt0py0id3q0exjz2nniuuwa6k778xiv86sn7mcit4o3dmpgclvx8p8tcr',
                area: 'f2erw8asbrhqzjdcazkr0rluuhlclbbxqqb5j4rjoou9tkobrwoirpvp2b3i53qzdqgiajuyvgn1vsn8cmzr64klgxd7fz6z1cmxph0z1qljwfyyg49zz8vxb619k463apj8s5nwaff6kg1wt4dnddqiel0g07uae6dxfhmglpb15cje552wst8wp8ojh5nwzipqsc1ce641v95ugtdb6os2b93ntijn3ywxi31hq9uc9vc4hgpolqw783a61qx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
                flowsId: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'));
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateContact`, () => 
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
                        id: '937b17a3-81ce-4cdf-b3bb-7ffaf99df8e6',
                        tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                        systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                        systemName: 'br4jcfjh4p6eskn1efm8',
                        roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                        roleName: '2lxnwhzfqgdf34odtchwu6mynqcz0v2hvzqoyt96fwgnm6gfaqw5yow7i6j43c7g6zqw9ycuubnsclsays7jjycobhyk0y7vezkqzsurid3obz0ql83d01vp4crxa0damxlt922xi2b0hzv2f2qa4l39pp23htxu0cpvpjmw6xj0lwbzgb63nsz0e8398fj8gi5cfom337oomtyrq6v77vzzob0fv1eo92zvwzga2qdc997k6eyyu5q290f6x4r',
                        name: 'fg9rjnzdmdl4mjhj1dm6g6aaigz0nh1abdsmnwy502p2wuifln62hp8oec1mhazuqkmqt8fz3gy55dwfq1ula70ix86niw3wxhujndwuys99953qxr0yfpt51e6kuy1jn59qp12zxos85gzlr8b97978ox8idv6xqhrcd9fieajukkousy5ls6w7bxp66v46o2dixdjx528ttvl3bnibzftxdz5pmc320taafft29ljm42agxi77mz6ovk8adhm',
                        surname: 'gm5s39o4uzv1vdug0yf1e1woezbfe5m5dlt02mrkptshwfq0z9wh5uykrac7jpozu5846033ra23t3ey0cmd19c9lyh4xgbbhnp7jdvmfqfw9a7qvhhnnz1guwc7cqsxck18s3joada36bpyq0wlqxczjtg5xksc3xy4k43g3sjmuw2ew10ogcqpk33y6g8gauhl4w9ve83v2vzlg5uk5pyp02g6niagn754vs4kgme66ecjm9jdaf3i5kbdt5h',
                        email: 'jou60ehbfq0ahzjmtbnkznnxi9rcg85h39q51q0k49p9i3gbjpbelokss0cf5quqmwt0l9jb1nher63lmsaavbuvf0eoeflssbsypf6icqb3lvvxswe474mm',
                        mobile: 'tcl0vkz6td08pviezxv7he7j0vju529b3545u37zbq17sgmhlc0tvzfk46tu',
                        area: 'kh8hntfv5u7hyrqyuii1yd8tchfkmk0j3g9q677vvzby95jx8al6i55ggwyby7n9p29hv3sutzs4bcb8he8fur6fksgsrxlnu3acvqod9uljbu9fihbxf42aex9wthwdl1bq63fqy0cza02kc3elysf6wxkj9jrcnvnxhbxbam067p01ks1f2h56vp3djuj2smbbyak12orrbv637ezcvkvs8tjee7wpdtuvu6lgo7aj7ppu66nhyesfjfo4aif',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                        flowsId: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '937b17a3-81ce-4cdf-b3bb-7ffaf99df8e6');
            });
    });

    it(`/GraphQL bplusItSappiPaginateContacts`, () => 
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

    it(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindContact`, () => 
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
                            value   : 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80');
            });
    });

    it(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindContactById`, () => 
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
                    id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80');
            });
    });

    it(`/GraphQL bplusItSappiGetContacts`, () => 
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

    it(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
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
                        
                        id: '1126daf2-0f2f-48d7-b08c-377b4338b159',
                        tenantId: 'd6284325-1f11-4f19-9dab-cc4aab094245',
                        systemId: '12f3936e-7480-49ab-bf89-c317e30f3ec4',
                        systemName: 'e0l6ie1czqd5fyv1nf8w',
                        roleId: 'f53a11e1-5562-4fd1-a75d-ea524ac91e02',
                        roleName: 'ezmw50kzioywt3yuxcs54rq1dglbzvp0m0uj1r5qw6bnyqkzofl806qpe6j4rx1dsyfvrq3gfedcz5loahb75hgb8gk52ojtu5bf1md9d3eg2fmzonugfgeg5w65p7haqfhnbr1zfyhlmsizcep59os8hnl2ag1j08kfv0jov62gnd7ecy5sb7lj90c0fidcva532uzljxi3yloqtxeicgy6ibf2b770abif1i5xrj1ynv0i44uvtbo3c3cj6ak',
                        name: 'vxdw794izc2w1gqzbsyn0x2yuxyb7vhc7h4s5jcmy3y7xpqanm94pqbrmx8dcjlgap9dhe7kosgdsz0eu43c7yqu2p8ul3yn9eiwfqyqcepi4ocg11lik63zz7xwyffu8zw3gq6r71b6wig2nqifw6qjyhmj192bm8wcrfh82jpzvnvl8j3x0b37hl2qu3d099zmcfm3f4yrrazn4ilyct3b6c60pj4dyczzlkldnr0g1349trn0qs0oqmiumsd',
                        surname: 'rgjdnq6d3ybrwwvw6ad5e8b2z097a1sslafgk2hqz9nfznr2dhx5nysa5i0ut5s1e20a3d133wbnd3jwd018zymvgis4jjno2b3f08mwnym1y8kyz2xc4bdb1oqs8g7a7wu28si2wldq0br0rn9mprjo56fdvyrive36jn38lxcdfekipo9www3bhztud3i0ur9lxs50to0hpmvkleni6rnxw61f4dqiid1wzmt3vpuhhvm06o4xotbss0y0wzd',
                        email: 'ny5c7dhjipu94wpjrzny0mihgcsnm0cbnkh7dnoufjvssfkgg171g33dsq86j9dh4mve9e48n1hlt10cye9y97an54ko26twk4lyuhm0fyicjs8cuj5g8kp7',
                        mobile: 'aumx42rq3stud7xqvlhw7w9qbvqso6ve92iz03q6ap5qxycbe6hxdongi8qt',
                        area: '9ybp3elxj0f269qs1ocnt5dz485rvmm3rt84086b1hvxztf0fuxui0m5uuhneao47jq42jut1sftayaehxggf2l7m7frkfoney7avnp11pxt1ud4278jg5leqh3wtufmm0gky6hwf0xs9m94dsej3xievyr4f508uw90chad9bf9w20kmivzv5yssaz8jpna2mv5fc1ap9g1xyeowhkc429fl9rn3ki6iiiko2qanopcnx88oemw77f4zax16di',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
                        flowsId: [],
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

    it(`/GraphQL bplusItSappiUpdateContact`, () => 
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
                        
                        id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
                        tenantId: '93a48a94-53c9-4509-bef4-dc81f8af7be7',
                        systemId: 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
                        systemName: 'dx5ds36l4zah6gt85fdz',
                        roleId: 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
                        roleName: 'lzql4es89e9u9htbogzw5s0xianih9soa99nmao989kflbj6u5pjzlx9m10js5tog3w12wrzgwa4dbwuzra8eicdtv09a6cob6ntcoir7kp166vjp0n2k0ow5cwvzuck4jph9xqr46lj38708fewutibyltjvnxv5hscbvr43sd34ts88mj3axcwsosc2ybymk6f8k05npiu5jyerbc7ahdyi1mr40mk64ghv7ug8tlrw4y1eghmnha0b6otdjv',
                        name: 'qnuxkaegqnsjr1kutr1d8tvfbc57vbmoq5o5ibenshep1aczw3ggprbay2thnvbkbcb1dyi27l942ejvehqzs2v6hqw9x2clv18lu84no4y409jw2aqzeekyzixb67fe3tbjw5xkvs2pchc5sz2trvjegob8hcp1t8g4euger7wmsjs9t2kx2a5sl9a2z7gm3wjhaxxls6wzxl5uefw4ll8j1hd906t2r84ztpk362v8p64eemc3g99co47le1k',
                        surname: '4o6oblkwu9xoxmle1vu20oo71icy5frf99tt0oq2vsyjdioowk1mq7quj3yzl2coe801jd060owmkvqyyg8or7a6aycqz05gpfv7dm9ujfd5zbz1o59rbydxyelrr1km94ce7kb2x08m0n626f01ga926wxbxso1athd36chie2g0l6mk6v9qefom9b3y40jby66gjpzkp6e7ahknofuei2tut9f52th5r7y4mb00w3a3slkaebx7ec847tyo5z',
                        email: '2bicp5rft3ec05g9d7gpie32b7jxu1coz0ju65sz94nzaeu5vv2j0z0ghe4okodlj5iz0mi1jz9s55pxz6c2apm3v4t72au8ufhdqzr90bx67jhpnyletvek',
                        mobile: 'wdd8mxqg0jk9q2mkb0ju1a014wfy4ki2belkjfwzpkuu364anbroq3avrqmz',
                        area: 'vxf5hyxxjo2ezya9jjg374x9m33uu0efrohulsnlv1co6s6w93i0od2d0dp41c1uyc43lyvgiyziuki1vkin7qch9gj0kvubcshgfuf5nwtynyrpwfrrrs8tlxxhq3vs9s0k57kc0j8c296q31vitp2guj2lsnlh9dcwl8rzdnjvvyihc4ncrpgtlqvipecp2cqomns7bk6t0dj2r0z648f4b0qk0x922xtvagzohab6ttfhawvbpxqrfdx08ug',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                        flowsId: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80');
            });
    });

    it(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteContactById`, () => 
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
                    id: 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});