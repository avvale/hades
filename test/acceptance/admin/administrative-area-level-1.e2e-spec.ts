import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

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
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '8wciyd0q',
                customCode: '63uic7tv5h',
                name: 'l774lzs7zmaeroh5h2cvyi4zgtvr9z5uwjqcurcu6dqg7lvcvgsg71v7zmbsv6o4lgecrvu88dbk2914p35h9odx1wgdnrwllfy7lpek8jucwst3ojsf5xlfqp3u2z2xer959hgr4n5ya463kapeyxiad3civpnw8xu7tlsbaamtngzs1t1khypm067m3fw251gmq1o4b27evinaukifp1kiy6ha93g7jde762xmk6ni0t9br0xj9ez9akmzngl',
                slug: '0rleuc6w9xf5wbkzxpp4132y31qz0jhp05tg60sa5xo7040wll6fbfp2ryu7csqqg9wtpwp161j1mjo71c14m3dw1mfq2i6gix81j5mmzn8nmxfqkh6j0ls1jdl69lf3krvq3v4jh0ujfgct03b97z94ujyxcizrd6n1ljufduev646ekt013jjsfb3y6zbjd2otff03o4efcntnmhx6ju8q5tl5vlmyax5j1rxa0b5tjwqd96z4x83n1iywswz',
                latitude: 227.07,
                longitude: 333.38,
                zoom: 26,
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
                
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'xhaxf9wy',
                customCode: 'yzkwnq6e7e',
                name: 'eywvdmjcwz8xvb47v8aw7vo9fvztm4gvcjce41ezs8w0o7rhvl5pe7tht1jxknmmpbagtdmyrhua6iis7gdbnue6hz3a1k1h844u05g9mdf0g40srwzykylqc0y40txz730b8esfwnl3837triqmrh7bm6b7hupm2gtoyd49l1t4bza3m4f73hvfeixmobhdy09v8jpe2zmjl5cc1q8tl55a35dk9u8qut7sci7tkisgd2e038fmikv2h6lcp9l',
                slug: 'mrjleoywvi8whihms5ecq5al1vhxkam56lbuxcrcp9qany5b2140lw8uidt3y9lggjghxa26uy0f7nn3eixdubdjqz0r0y9hcr2pvnlkj19baryx28bwc1mg4l8qpv0w93npqa7htsojfi66m324csxp6w2nz5wxrva4a3t3cfi08ox4n1ddy4ksmwzfae64pmcfeeoeixfe5hergypz0pkubqkgl1g0zyk024bmmbymwv8wc89upy7vpcymi3c',
                latitude: 202.29,
                longitude: 136.53,
                zoom: 66,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: null,
                code: 'hfztn0oc',
                customCode: 'dpnhcxrk0l',
                name: 'lri246z59pea4yhseswtrlm0qoad17mlmfcas4r8qqdhtfxab019cqovtbgihim3pzns5hdjj843wy3s9yozgyxhe01167iv5je7z1enk2f10dws3n5iffze60vazcwm1rvj6wsbkkq6wi8appm63t7ng1u8ba223bj8u4pjdtrnov69ssr4wdlsq944mqjac2r46dr1rdgsboecyhlwfxq8myzy5m49vtwvrpxzam458jr2ifbm0hjuy1c0feu',
                slug: 'zsakeqhlzi7uil8irx21s1zoq8l1nji4f0b0h7i45mj7svzhkopvnmg1ue8ba9iq20ie6yvluzallwsguy1j1nz6tposstj6ee2xwqk3ghyzjsw53khaqmtbd0v6jki0k703wfzjzix3kg9lgn92qfzkhu79j9cg3pybl57pz3yz2cp1muq5007vlegcscpeil9xe5dqazdsf1yh24aqjyxqmj1a277r4jo4p1zw7qsbj2nf0d9vkddvlre8zlv',
                latitude: 831.05,
                longitude: 72.32,
                zoom: 10,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                
                code: 'af38f73t',
                customCode: 'kkz2vvf04l',
                name: 'eqxsg31ko8adg8eltjo2t587az7e9sr9kqnubo4tgnrzm32q9rni0p7p89fp8ssuf95phgim7u5abvc7qskfv9b76aursvjqubhzd1z28yrvszypre8giqo6mtcwszwlpdh5b13qkoj5w294cy9k4it8q9977t97kmk0ukm4alerg65v1kyyejlyzyjehhy0a4wz11rqq3x8o2k98tuqb6tif46x23xgdbybqv1jpudv66ag1y5rt24f0pqp87y',
                slug: 'erjsj3ejvcjc9uzi3m2pab1c3dgbrleydzxonprtztog40vt91f4ta35xmfi9zyu4prjb9bgdb65ocdb987mkdvnxhzrxganjsahkxbrvawyptgo6loz6orb8iscfgajb5ozy05ox7gwn2xrrzms3h81f6zqhh2fml1jmuhti4tiradz43jtjojyrprztwbzkjohxelbu0agpfvokcjx9ywhlpoca1z9np2fjk9wntpt012ki0z9gg7kolp9gfs',
                latitude: 893.88,
                longitude: 179.09,
                zoom: 49,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: null,
                customCode: '3s3rgqv91p',
                name: 'uxxjpnjcxdvktick3x8kgqb4ipbn593k8jwnlee0aweocwih2f5z02ajli4o6yx9a6a5xeg6qvjx7yz7o26mdgsi1wxwnhrynyr8qq7h0bacagowz6f10jdstba33taksob9d4rv58dtts1007b7xuvnhdhcx05q4yhqep7xpyutwgtmgx2c3zt9xrbss8indmr6pk188fsj4nec0qqdtl8tobi05vyoevq4oa0ch2lx1obo8ofghg6dmgz09bj',
                slug: 'oo6tcrd50avy0z6zprjr4rjkcz3ujgf980rl9f681v5yrjpbc33vm27b1a3sboiaql9t1pzecvzyo5adev9pjv9xnualvd9fqmre5sooxnml5g5ackykqafph7ts7oi2h0fuihk2rd20ywc23tsgyxcyxafkwe5y01wm4p99eqpv79uvxrc2ulmscame1d5ii2z8gy1mp3p7dxkevij3bihm0ki004lucwsxh23ce3zts8uy8zka7dsg4581c5g',
                latitude: 731.46,
                longitude: 779.01,
                zoom: 30,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                
                customCode: 'xdssmi59pg',
                name: 'cbvj59qrf7g02tr8mml5c7bduusihcsborrc54yo9httuciyafwzdr57ct31dnuuvb9zax2t2mc4fk9yy1fgmpztt2e14n49q7um0rpkrl7wmbviqqm5jrsngkmh8bggxf8d0443ir1wx91km7x2hgzsbfg3b64uycxj4g7etry3j0wm154fcac8f9neg5zcdypi7s558pl5xqq5izjx8syxga6gfycv25uyqcsqycaz9owcfvv2r6r7cfwowh2',
                slug: '3v2muk5i5exxmqvmrgbez8kmx88yvxl6if9i0juz9hi7fixsrdweb2im2mk3emujfd1uop5kx5yntbqkdpffj5f7ztgkiwhf3r79mktrkv3f2sd3a4exlevgfritslhlnksqii67o42dqqtpliffhsg7z0j43qt01smtzfiui76s742fcfrf78dbaywkbscfyyngo2ubefp3b0ffjvaigizgq08afpzt2olq5g1l8l39c41rww0ahhmc09qv6gb',
                latitude: 113.60,
                longitude: 820.71,
                zoom: 45,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '393sidud',
                customCode: 'ex0wmcph3f',
                name: null,
                slug: 'tpmtssyfno210u4chivjyv239aviyegw6tfupgqcn7xjfcrdcy35u8yb84a98rkcod7slj0mnqfxa138077s7bxaacz3e1e1v8f3n8bz41rf1ma8eq7hguxzhz7y11q7qynunu48forl7d7d4n6732qxktt8ryjai5ft9olzdqj8e2e7srw641t86ar5h0bo5axscpw9qdpiy8kews757pj0f8tpo4x4ay2gnxluvc1q5c1cl1adzq23v4edy5i',
                latitude: 934.87,
                longitude: 936.04,
                zoom: 55,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'rf9nra4m',
                customCode: 'b6jvop5w1u',
                
                slug: 'osbgid6zuf13efkeowo04jr1k2uysh2ybxrqbs2mza5enyuad1ezmbf86pp0txe42vsy4ld9h859sunal2mosrgwr0nphb97uhwdgblg5xzioamu8eojaf44if6ay1qj2getksbxd9sneqlu8bgcncxbqw1kh6pdit37j0w261ea4fnf5cla2wh9k60j69zip6tdoz0jk6dp415e7n5d5e69l2pd4r7iqxaypbc8st3xr83ygkd4a19w1lvg1n6',
                latitude: 85.10,
                longitude: 326.88,
                zoom: 43,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '2ttql1tn',
                customCode: 'jpygb6xpxt',
                name: 'nrchmiwnw2tmvl5x62a184r4ard390gjnhdb0gfsv651uclb35xr9ta6slb8zmcscj1fao46b9ql6sjhrh9xdi7xqcvwqcv2ll0gyq3y56n5cnolaluah4cz1yz7879mw057s4mdwe54eg62bv9hvlt65pz2pi2emlrrl9sn2sdnrv3dg5i7z6y7ntmazbkczwlwrirr42a7d0wu9105u1syw9tphfn2eqrzu6zezbl6rmudv4m8zfq8a3w05uv',
                slug: null,
                latitude: 886.50,
                longitude: 243.01,
                zoom: 39,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'byo4lyap',
                customCode: '535amk31xx',
                name: 'w39ui65as2zsmmkk0s254e1qj55tog9y5g0g4pwxqbjnb03s4mlj76yulz28ew6nvsue25mop9saqct90j7hjpqdut2nyyp9ou4ogo799fe39i0v16v83gezx0kbw7d94cr4zxcug56s0lu79u5ex322bj0csphrl8shqguda9njzkj98qadypohb40ttbt8r4z26n7pmqqbxdjolbwjxnot0lmz717kc481p14yi2yovlr5u4486aaf494rnwx',
                
                latitude: 460.63,
                longitude: 46.21,
                zoom: 16,
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
                id: 'gw3lrfcn475k5b0lsszmumf31gq72ykd9orvn',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '6ni08gcq',
                customCode: 'l3t6mbevsj',
                name: 'mutvnl2rnjrbzx2k1d0xdt1flne1byooqqcuibnb4reu74urtr9gcgbjazwhcbuw2tdtz8gvmbrfovqlijyyd7o11xfl02ivmwnzz8z514pd5j6bnqdztebaf9zxkscqi8yflqwvng9zpfy2psibrdhxpzwfdpxcb5ot8bdj5rb1x43qffef9hnwegsok3za794slr20lb3f1mdy36x77kb2gapch4p2c8t1dd9uz05lh8dugumcn7v48horqs5',
                slug: 'vuzsrnngezagoh030b4t1kqwry6th4okz7nt9cy88s7fjrftkz3xjdg7hnob5qqobv78o7fnjdvlschf5ryemjs34v2pzomr96pw1pw6qd742s4csk12dfvgome271j4wu1v9sqsezypgiv0z2w5dhke7q1ismnmhr7npudlwmfh9o9oibcrv52wbwdyi5ykp6vetvuheva6qsseeoh91hwnm7n6e59q54k4b2vzzz8f3eveu4p6lulkgdlkw7l',
                latitude: 3.08,
                longitude: 840.71,
                zoom: 50,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'pg77ohp875c91krrulnm90hhzmxkozevpse3z',
                code: '1gpjgwuc',
                customCode: 't6ioz6lfox',
                name: 'vtg0euhbn2g1nl7qoewkd0bl7u3383rtfel3laiii79kvv16ws1dcqhybu17sgprgrwawx56c9szjrtbexed45ej52mm27gb2asj5gy7d37b1c189hkwzfms57h9zxyw9jzcnsyt844ltgv6oz79lag3fna85o8593253ol1rid16emb33i9ph08ljemsmpzgsdz33epwj8a9b8gmyhdifyle8qj0fs8e5dbfxkk3jex74c902ih74ydid21ucb',
                slug: 'yvphgk2el3fv6zkg9lv2wusjxj0drgzcwiylq7f8w3g92hgokvqnvavuhblf5veekawi4dsovfn36elekbwkkgxm5kk5h724yo4uo2dqt4lo1okwhqewrl88nt1mrfk3lws2pznvqcxqkelrdjspmy8gf1r4b0fadky3bpby7xt8ugnm578ndgxgvm04bei7mlj1wc0c9p29l8kd9a13jbrfdqk1h37vsba7xrrcqqfk4yb96t421k5km8ovvmq',
                latitude: 715.93,
                longitude: 421.08,
                zoom: 17,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'u9wpqimt1',
                customCode: 'c5ggwsaf6v',
                name: 'nssssynrjtge7zkldvkut62et0pxx87dsbxzrtgzb9piumbnxhxl57579juvzbkfgb5y1msmhvpy7ll758tlicpkbk5x1pzhyk17wavia7e5r8d54c5hx13a5bwev1clpjy1mjvzd45nryuvw9lx6ffqrz26jcw6c8m9kcuxwo45vfakleswpe5ksqukqcn838p4el9x38hiqet568glse0nkwxivt1hf79o9yrrgggu6pceuflwx6pfyhrha77',
                slug: '5hgemt7xx8pptt6f0l31h9cyewkrzv0j1b3dk8uqjx6a9wue0xgqz9dyl9y691z4bznge6q4pgnq05eg6z8t49ceaca38k6jciask9qawfoi7bceupe400cjvs4z8y2nn0q7cgzua9v5ajafahatvjrqeysygmojpwbg277cu02wyx12rqdn9ctmu9owq5frynwmtja0moyo1ibyiqgy9hgoxeqvc7dqku0v1cs03xa91mkb5ru9997lbmovnhw',
                latitude: 658.89,
                longitude: 111.24,
                zoom: 24,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '26ir0j1u',
                customCode: 'uqi8dofod51',
                name: '7bl1or7do91tytoweqtumtfofbqi3jo2ttbdf6ytqfx1013c9rqzs0b5cyn03s0qj4i1jrchqz2k1m0urfc5zhq8w65q4gh9ejtrop35y5kn0u4gt6yqhlt5ligsds28g9dwh480mtrg2nass2ihj4nvzo547intmq43an2vtjfsxjteydd6sfc1s4z2yozrurxvsyoywtrorsm0lrl5ev3fp4r7ao9u2gzg5r2pirfxlrlfmnpcz1attpctqed',
                slug: 'j85nnazybtlibjrmz4t5tj25jg1a74mit35edt0ectb8wd82m4qtzdbx66it7g2akzfckpp4ha8e3swzjqgqll283wdc1x89dbnskaao2ccvlec24f10vhypad4tldf41nde44z1j20x0llehtk0nwrv5qxihad0bsk1w899ul7rczp2sjd1pvxprclxeknl0fd2in75ax3w5f9k7x7f56ej23v060l3su1o1rko9snp4ihp0859gsz63mdvf3w',
                latitude: 705.97,
                longitude: 892.72,
                zoom: 15,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '1hogrcjo',
                customCode: 'a2da8tvx04',
                name: 'yiuofgtudueeo5vr8cg1coearm3exvv7rlxcc8h2llwdnaubzhjaev939yvgsphqwocmk1ftwot8zt3thnmsblrt53363fmes14gwb6ozwbz19233vgt41p84gnnk1z9czccfos34txwkju39104tgopomjzc8jqlzzzpsr022unknhof3br7t7e5agfze7d1rq1m6wjnu8qajxuuxcjbp43a1dwf8yyv8xayxc3ginb6ulkvoxjov60bg0z3ali',
                slug: 'rlpcnnz1fco127x3rroc0kwfsfmkuei4vbiugjlulp6sxemxs514saont49fdkhc787gvlwmv9cyjc7om1z1zk0gkm13cwhgp016sum2s8tclu49luiokxvm7fibjptv6twf6572eh9dap0hm27sytri9fnjckebfai86kk6t19qg4opehiqr7qpjspebu7ti7qnobgmz0waskdx1xll9cfn6kwpon3tfr2qchm8cshjxanqxsqgovngtp3v2zh',
                latitude: 789.24,
                longitude: 526.88,
                zoom: 78,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '0hwiuqli',
                customCode: '230drx3nyy',
                name: 'jn1r7v8pcoeexkwzer9ek29i3ovp6swuv1ojbw1gwl5k9694jqrog3fici01s7flvgv31we4miw330zehycxxio79cf8teitjp318hm57ojmg2oqxr673g5i9esjhq95ydagedbyhzsviyghwq0lharh1f6xywp1wvn6a1pki59fa5u14mkmjjtai8modb0xovnjbyt802cbrjby8874ren62hvxgjstsg90rs6fzvliwn4ivpwyusamdznhzu8',
                slug: 'mp69s0vlofuman6m0zwi137xxqvj3to7g0404f9ncsbdvpegv8jilm0hjwf0k1xhl3v8trxyn3phs0q0pzof1ur94a0lg2anarmrm62q7b7s81uixbjl6be3bm2lh55icdtk92t1wg4f1900nkhhrajd7c5fkczo7za71xwm1o1lefvnb5f6ovqcnncuw3u4b78cnptdiid9awngcyc40aff2qm5rfwvc6f8re83jsu6xcnqqexbxofdzjmls17r',
                latitude: 87.92,
                longitude: 890.48,
                zoom: 79,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'xqjezndp',
                customCode: '31js0w7ihp',
                name: 'cjhbokz0l35ocjppddyih3vbwdcu3zh9yrio23f83sybkyfth0wskif9288dsowalobjl1swct44ceq0amnzzo6hybevwwvllivbwjytb5b1sfakce79py04ygjct2vpqj6rpjbwscrzha1j923iu4waizekdqxxdwy7v5ssymefq5hkioxjtfaw8cl1g3x07ij59bnmipip5zb9rz4xs75l2u3cusfhni0wkte71kyjalm6y7nidoj349ua32h',
                slug: '9b7fsnpfp1qb7bgqxard0im8ux1i8n399zdgwcm6udhb6eymlkaa7m4xazivsbmo31d0u64553van4zij970syvjgs2kr3maetz8wq97bs5g2tlvbncgb5cdfy8z3v55x3qq0g8qbp73rtjoa41pf9ih3sq1n24zdku766z7wbtpmsy85w4xpr9502bx0iobgv4d7s2bv83b1yuk3dkmq7zi74zvhzk966af0v0dz7yerr2gvbabmu5u74i2gi0',
                latitude: 932.06,
                longitude: 515.99,
                zoom: 53,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'sr874tcj',
                customCode: 'jsqk0b0la8',
                name: '79td82ecmx8gl8q2u97r59zmc2vhtdulietvpc2315748xgnylf4zo700yh8e8jan8q28neli1ex2mq27w61isntx29acimzxedhz5o4k4ov8w5cy4iu7jwqp14hxasxvcn6y539q8775oibvp8btxxfdcfij483cuei5q4oafcllg10np5890poyd3aww6hljcyfklg8r62kz739pri6knlsdv2ioivhhtg6zh7425vdgpaf28vebpkumfkun3',
                slug: 'ks4sdty15rc0xa0ioacggev51pd1xdkqhljztl777sb2vk9kif82fic9tid83106pye81feaosir9xbj3glbccmsu17gd5eippo9hmnf4nry732z6d68fyvvclinri0pl94sfd606lngznmybknya58cxouzhckon0ux709zz3fx198ew85xe1upkm8d7aeagmpa65iu2nhsnphgyfzwik6x5ghsw95ramcdy377bz52wjuuo86io1oxia2i4te',
                latitude: 587.27,
                longitude: 642.87,
                zoom: 91,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'zcz1qwid',
                customCode: 'dcqzumv13l',
                name: 'ozg31jghe6m42it4zt7634d2n84g79872l72ehqkutk4lhuj36yxu50fuxxpq67xj6of31x3dcn4e0utf0j6bzjgqtj8oaejcaf6ynj22fqqfkz9aatmirrf6ytlwea24uulu0pqozppcr68x6yp088xwzec5eagzxkdwo2q43zq6uit6gj7p3rpkzqhgs2kgmtx3zk54pnfi4rnw5oc2dwmvmlo2mhnjq2alipg2xp4zontduhnkrces4zkwab',
                slug: 'gretog5x4n4b7psy0a1b3pmpzlc1t4tibuzf1ka5vcjcy20pcwmkkuv4zzj9vblntyp4r80hfcmvx5cdwu66n54mbzk3meski9ir6em3898t65l1vzajg9zelniujuoi9j6le7ey35hsj4i2ycs8625mfnypqy71crw3j458aw6721kje8k045hffjwwdx0m5o0incdmvhzoauxts7gv1ftzzgg8q90yid1wq9c2b58gtuqnhog6afuozsf3u6l',
                latitude: 786.27,
                longitude: 848.28,
                zoom: 736,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: '6bedherv',
                customCode: 'it2hcucncp',
                name: 'ffzh6piw5nylb9e1kv690e18va498vfu6nqdfofxfbmvfhs0wzqkb0l3bmtnuhgexww7p0l687a8bu5ed2a4k2a9c562pggvcjryfe7z4s0cg8pr8e9hlgs3cm9fosmkqgmzwarvw3yf9bqwuhbu1msuzpm7mvrh9nmz22e2b96d4dawedbrpnkvk36azkp2lej21p9l2ucl3lykro3iawe4kd189o5cxhmn52f0303wjlencn2wtmpo5gjo2da',
                slug: 'v0iysmcbdcap9jn2n82ozxjdpx419j1vmyb0lev700ib4ra77b43qy4pwob54t0lx0vnquafv3zbvh16ukxb5fuppn008i1q66y1leu4z8lw5oap524imzjbe0z39heuufzvk0ily3ajij53fc0y60cijlah3cdhmweigu9f4dnrndno0yq1klvyepca34sqbc1a7a4j5d8ci7nu80qrj4c2i4vee9ahbue9gvfvb3lhwfk0mlfzi6r7n9cumvs',
                latitude: 253.58,
                longitude: 363.51,
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
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'e5nhsbp0',
                customCode: 'ufmu8gd2na',
                name: 'qyzoq26r1kddap37tqkrzg63i4e9g98dzwvdmqxviuzbqk4hxqvvflvva4fd0jo3kdo1pemhtb7hpa342x0vj0xlfey3awrl2xkw0vzz6ns54cxbinkdrnw2e8i6ltzbzsb1v1h6iyzkb1x1snnkdxrun54ydy1orll5j9rpzwwad86m80a9j1z4mw2seji3hfellsytq147o59nc7nknww3c9miqauh74jtxh073758m9ctj90wcfyhjqcry9d',
                slug: 'mh8q88ub3v0bt5wuki0hcob6la951j6345bw3vidl7suxbflb125ei6pendwguvvyaf58fm45wja8el60r7rglzea2l6v1m5hvia23abncdy0s90dy4v1kbi36sxxe6kwe1nrjducee9d9ry2934oh2p1a1jusz1dt6fhf4bv9k0yrp9q9nu2j0cu4eojryd34o7451tawqb7khnu2wa6fwwyu1cxkvx1hul7keki2cmtm7847klztccp1u358o',
                latitude: 354.85,
                longitude: 523.79,
                zoom: 41,
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
                        id: '1ab83401-d73f-4cf9-99d9-76fe069a7767'
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
                        id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/889c695c-a197-4c12-9ad4-674d0e1550d9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/cddbedb3-10ab-4e8a-8f58-6621afcb6784')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'));
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
                
                id: '4d44df75-746a-4082-a7e2-0e30a0e2b479',
                countryCommonId: 'd83d1817-61ed-4bdd-96b8-b4ea0ff6fe84',
                code: 'y0l3zozl',
                customCode: 'k60fomkopa',
                name: 'auoekn9oi1i1pus2w7bcljljy6jn4t1le1oaam0rj5n8npanpcfrw6ch9ioee9j8l1dc6bxl0av9pp22miluqymutmy4ktk9xaedfmslfi9344ltfz26295n5l68q1gf009b1wq13gq03taqn51nzoobg9f2xcvav1y8xg9h8wlyxqkpahk9f99ul7miggq8q8aqifgoof1m2lnaecu3hoh1789h0v94o11d5ikoivgqxez42tqx912s7htozed',
                slug: 'h1sn9dxgj9smg5vvweguzrxzjclr6zzv46uu9nvkadvu36z5ix58j9oy36pca5px14gj06bxzknzjke2nltiokkfp9lan08bprhj1mvgt1yoh6i215aserowtetv72axbye7svewybdv9monyy77chtwsv72qwtiiwv993m3mejucvgjhgszx89e179uf6x1pdr9l1p5j5e4zn6l1ffa3sg2nkvjkj14i3crj6f1cli9nx8l3vdbc0kemulgkzz',
                latitude: 551.44,
                longitude: 714.85,
                zoom: 39,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                code: 'ogqiba69',
                customCode: '0behhizp3a',
                name: 'bnsd97bn7fhcmz1utgyecypwu6t7p4akmswjm5uvu9eygx1ti82fw2ofrclajd2kzok127zajpn0j4e11kcnzhip96v10ubbxugehc5hjt1sbmms3xxgdfoolklpeno70mgw7axvdta01jykah48prx49bhqlhlth3d5fzo7dhco30gsxhybwsvozl6qbha5x4nxxpuig0ahrz89trdoy1ifmlz6pb3ioocblmprthijnj5eykcx7cr1m9vrxw3',
                slug: 'yezkusd8w0315ekpddrxovgkm27bmlwk66xcow9w903o1kr9b6gw4o8v3awbfw73q1zhgain9vula9ms6b0kwjmz8hdpn89f4dwux0l7t04a7vxu6g4uu12gyyw5a57bgmhthctfdypx57fau6l0rhhrou04grjdfnr8xj5ggbdmj2hoo5yedltencvyno54opaq8ywdka1dp9xvvhgaaxiubm0cbvagd558nbt1uoc1ph5wdy8p2bxas2kfukz',
                latitude: 321.78,
                longitude: 713.84,
                zoom: 15,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/66042c0c-479f-43ae-bef1-07bd10f2a957')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/cddbedb3-10ab-4e8a-8f58-6621afcb6784')
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
                        id: 'd86af204-2c52-4534-a384-7946bf54449d',
                        countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                        code: '4ji6hhbp',
                        customCode: 'xita9uriy5',
                        name: 'fnsr38ovrk0n2patkp296lyphz8w5srir2s4rb2edihoticifztpi087ffkmahub8dosn1w0tsftyka71yt9hmqn5fy62mlihvs81yv48rt87rfr84gjtxmpxrf37crkdbxdxmllyl52b6zwkfzbz9j47l6cj8yicrcn697fxympu4i2awtcpwxtz36ndj3jigqs9mfwfruwp7za3thwsuzt547u6fubgghmd2yr1iiok1ngvxgp348vl7yywgf',
                        slug: 'gfux5igoo9k05haso3y5mblzb83aowzr2iu7pyv44g5nhmiseesi1fzg2y9p3i74hefsnetw0xpl45i3in2d88ivmtvj73j2f4w9hotwqypkvgj1bxr40dqte5b65ky8tclqvoyujzgqe0d38gyv8t0hqbub4ljo2bz1t1it1r5c33v5ee2cu3d0q2bkc98gt9mzp8kd9ylkba6avnpy192w0bt39642263tul9wvjtmud99tryxz2exo360e8z',
                        latitude: 364.33,
                        longitude: 433.41,
                        zoom: 87,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'd86af204-2c52-4534-a384-7946bf54449d');
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
                            id: '935ea20c-1e62-4f45-82b9-ca0e6983e7a0'
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
                            id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('cddbedb3-10ab-4e8a-8f58-6621afcb6784');
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
                    id: '08b2016e-0d3d-4245-b9f3-279c9c7cf3fe'
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
                    id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('cddbedb3-10ab-4e8a-8f58-6621afcb6784');
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
                        
                        id: '68400a9f-5815-4d42-a990-a16a7468e746',
                        countryCommonId: '1b112f5f-3db2-4182-aeda-dd362c16b8b2',
                        code: 'o5phoqlq',
                        customCode: '1dsb1j7ovu',
                        name: '1zxq60t0apgosrnzpkoorxu9amiqpoyjnxltfn7uwl4jeysg5wzaxqeks4c5bn01sxz1po3gih7ceskks7tj3dowe6u03rw2vt8tk3ybkacsvb5ndthmmdynukgfgrvr17j95daq63qdn3u4myk81sztil9e4fp4x35sb4h3kyo7k5ve4u6v5reok3m8o7nzsx5yh5c28f70liqcqob2s3ww8nemax612p1k5nlgn7invzjhv3wc9c154mm7wec',
                        slug: 'tyymhwq4cr43ljj1sp94jpnu75demipoeewz23ppf5q4695qox81xrw9b4nszmnagz45n93jvza6fnvcivponthbjjq3gu0ac7r71of0yy2n3giwwgsbfx52vzc7yiu0445mk4kjz0c7rbtnrlxmxesh1yu2v2ougz0slvfgfdce5rpgg9um5t9a3l4xtafbcj330c2fb1nf6qlxj5zykntkgzksyspbugkz2aqd96tcdstdc3jjio8mjvmn8zh',
                        latitude: 338.26,
                        longitude: 212.14,
                        zoom: 23,
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
                        
                        id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784',
                        countryCommonId: 'cb358cb2-dafa-42fb-a129-75c189e34293',
                        code: '75c2py84',
                        customCode: 'toj0nlfy8s',
                        name: '0j8trw2tobx26dr8djltz0htd59bfpch60cddmc0xbkc26dfbm3a61uqo0u5ch8te5z8z3udkximubs38sjgc3zdr68bnsea2sq4km156v6mtqibi741ny4h0fmfusjg3mmjm8klokb74jo861q1wc6lae513zwq4h7mr7x28le51lcw6p2l6rf8iebprucsi0hpcnewis6zzsxzfmoaj6vse8szmj36yxuqweohr3z1ncrz20xopacr458r33l',
                        slug: '9n0jdqi4qqd7cowf1jt69u8sqx9u8uzxocx9fmpjg0w7tyiwt82rpza2pdl0n5kszlrst05jeb2egv25qrbrlfb53bmvatltwn2omimdzrn316jt5xgf7guv5kfm6wnwen812ttx0ew78z5mun17g8ty6zc1posqxso2foalnigeh4rhwntxjs8iyj3n1dqemp3eskne1ptcza3w8y0o9yakvvan0w6o4d8k21uoig2zp43w3r5xbpqy0rmfh87',
                        latitude: 111.84,
                        longitude: 623.62,
                        zoom: 99,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('cddbedb3-10ab-4e8a-8f58-6621afcb6784');
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
                    id: '6cf44bf7-f728-4d8e-9056-e3b3b4127614'
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
                    id: 'cddbedb3-10ab-4e8a-8f58-6621afcb6784'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('cddbedb3-10ab-4e8a-8f58-6621afcb6784');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});