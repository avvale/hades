import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('message-detail', () =>
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'a1uk7p4jai1n3szze35d87y56nmdnbinqw5mg77goni84jui2d',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'jkvb7dxnslv7u2x6gbj4',
                scenario: 'pnlkzerabj5kjdk65kydsfdsxn8m4mn2x4wu3rybcve85bil6dxpwfhbn1wp',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:35:00',
                executionMonitoringStartAt: '2020-11-04 15:18:36',
                executionMonitoringEndAt: '2020-11-04 06:15:19',
                flowHash: 'zxov4p7bppj3jm7p3jacs08zfux7x3zio23cpgk5',
                flowParty: '7wgbozhhtybcaiqx6ejrx40fbcx2qxixu1privj0d831vjt2k6c8exag21yxydx1bn8ud0el798rok86388p0xwz1sx96yzvjx958hcbquyfa1h34zdp6b6ldaz6km24vgs9k3qrbb4cjgu4znu1g042g2nk67ua',
                flowReceiverParty: 'f11jzrsqaiqtw0jbv7nfn1tih7nzbhgr1bwpd16ngsh8c74z3nz6hqqkzq6x45utfp43dfs91q1meddmnfqrb8ydd7l88hvfnt7wgk54rt7r7jroc9ds2jwula4miaxwmt9bygcu0fzw05ne2feqqoclh6igcef3',
                flowComponent: '4pxneum5325ac2v97mmj1x0hawg1fkfy2ik2h7s6tvduk6nis4myiwaipwwnrtp2kgtpmbohrfko3dg0t0hua6igzz2lasd7fg3ycqgm3npflw2a6hnldkh1s7pg2p9tjplhj6aungm2b475aop7v8jf5ct4f2s1',
                flowReceiverComponent: 'qgynyhh3qa3wsi1zp3hon285p6yogsr6k3dt03hw8mo8jgtbsza5z35byaqlhhsvnojt6n1m99v6rded1rcrefrxs831aicfdwj0kgc26uzwpdxyegzwbsxi24fg4tgbtekz047igkhtiell6hhrmvjwe4ohlk0n',
                flowInterfaceName: 'uawdhsofug7lhpkcitlizsp9l1nyrv37aimdw2j0qgpxlnoj4rv7tqlf8qx35kp4i4q0fg3e3528pk12wvymerq07fvagoc15d93mdls7xr42da902on2ctnecugkiodsjdlnx7mmwvhyraosdqbav680z2ztq9x',
                flowInterfaceNamespace: '620omi6dbrugdqjyx7k8245tkn0y56udv7gb7hhon1ah6j9u51r7wd4w47qxncicqlrehbtpitr56y398o1rljyvx6c7nn84shjpsjrv9tmlgfymp0aihwj9e06ofsnodeyewcqfr093h89845mk7d06ji3bshbx',
                status: 'ERROR',
                refMessageId: '7heph8jcotd47dw0hb2p6nh9lt0alx1g7bbnax8mm57loivr0q2jqq8cdlaccvg3d1l3zax63bpszgns7bzt94ohvwa29ymstqw91f5c95pbageosp03ps1x1l5ky70y93l1bhh4ftnjnvw0xpx6oiuyea7d8eax',
                detail: 'Eum asperiores omnis aut ut quo vel iure nihil aliquam. Incidunt quia doloremque culpa repellat adipisci nihil. Aliquid quisquam ea eos numquam vero cupiditate possimus in quisquam.',
                example: 'apjl3eq35awl3o8iouf2j2vgt11r8xhwkcz6uwty4hucb454dclcc4zs88uhn0p3v4ytrmm455zpdtbr3ohnygwpp5xun147ybwea6b4yxsy5p22ywesfnyh37jzshs73ob5dettqdj17la8320hyw68n5o8banv',
                startTimeAt: '2020-11-04 18:30:30',
                direction: 'OUTBOUND',
                errorCategory: '1ngkxpjg4lz009uzhkze12371vem0xvb0d6db739ncc8czl7qankdq4kql8pdacefpim1mltfp5b06d6jqtm2aylodistsefnfgm3ddr88zp74gqrsbkzkw9hleq8eu9feg5wffoxdk9je1kuw992m7p6tioit5v',
                errorCode: 'a1j8o4zo2inm73y5dj7eol6dfjme6n26sqel4hyod3tsjr6egd',
                errorLabel: 662620,
                node: 6787982312,
                protocol: 'zjm5rtl1y2wob5w0da6d',
                qualityOfService: 'cup375ejk7g0md6ag7n8',
                receiverParty: 'he34wlmcd8238myuxhid3lxuxsy9p5glimi3y0p8hbbtx3a92cqsbghejyitw3cdij35vsa8yju5otrdhb8o2kvsdecf9jig1epv793lf0t8fvode1m0z9xe1xwio66fu1ipvg0hzb5m1rkm6io0c435qvuf8lpt',
                receiverComponent: 'ok57hh1gzo9d0ttemyul7mtest24dava14zk2rk35t9gv98bhfz7d2gfrk5gshx9gjyb7c2lfje01vhx76873mxgq1qyri0wnmj49c1eg248kcttknq276x859gkyakcoe5tk1gyibsvmkv4sae7k31ssnpim8eg',
                receiverInterface: 'vtsf8lnpdxl8iz25so5mkttfiaxkcp3z9lzlfl6wnxz15vg20m69a99ke1wm9h9kndqxcwwf0jv6acybnlfaoqgt6696z7v5vhljib9a1o00ztaicxw1h3jpdlczuf01t8lcl6o0oow2wkrdu25xv9e85ldjjr18',
                receiverInterfaceNamespace: 'orck1o6tabbm9recp2a32olcf30pz8s2rjd4ksv6rcuk8mtxbb4crpczkkd4wdqr7fgl0nxggy3kculvestgxnfldi1jfwbyzaziv8n0qyzjk5g9031n3vjsiqe1tsdw3dy2zpm9dj36bovvotnovf9kmoden5lt',
                retries: 1692334033,
                size: 3276366079,
                timesFailed: 6103389480,
                numberMax: 7023390092,
                numberDays: 6626069239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '0z6nmkleomny15flcdjigqomj4xjx3uhf34qig11qbfq8p95a9',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'uklozc6mwvhbnv3ijn1k',
                scenario: '12i23bgvyz5jt35lue07kxiu5vn9rm8uu4bp2uksv19s443puwcpyuu9pxfc',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:59:41',
                executionMonitoringStartAt: '2020-11-03 20:08:12',
                executionMonitoringEndAt: '2020-11-04 16:45:31',
                flowHash: 'qa3qup6s8xetiryp5ejdrbsgmzrggfy33kxj3q1n',
                flowParty: 'fle9xk2nyaf87cd6w4n3vta2zd3a6i3nfiro6ypdh4n7k1o5bib5ywww383chqqlgnf5q3qd8jinsrwit8s9hkhcxm0l7nn4vi3pld0vjsx6q4a58fwzavlfknuwoxizz34v45bechvohnrq156hdz41t0oz2osj',
                flowReceiverParty: '09cgkzkrarbzrphz6hturbkfuqv144f6pvggdrd4c25dc50d90lan361wxtnut0g1dtbnltvhv4wu3h8tkig6p184lyrkiti9tv0u88d1xectv78efo9l6utmaztz3egoz5brim66q1n87fczi79fbghi96zmwuh',
                flowComponent: '7hslhazncy1etba05tvvrr8jt30dz61pucorux7s5bfygqaoi4cymo5aphpsb6n8n3t65s8ry13xkq9jgf9dq7gji6uxrlz32bxs6qy9723kcd88vi8a4lg7en14g0s20rt4cgd73k2asoezhtx24026uywur8mt',
                flowReceiverComponent: '6yt45zsblyvlbpqquf6a8cmm4oc9pq7b4ft3zj0rcfltf7bs252bs444xt7e5txp7vlasv373mv1i8xkwyk1b7ovwzjvvh82q9s8sc8cw0h8mftuo036rin31ydpm57oxiopwlx7jeydlmw9ewuy249pqyupso0v',
                flowInterfaceName: 'b564vky3lgu1jpya3sjmtic3a0xtrvpmtuk149hfn7mfk1zzd4jbprw03calmdvc8cygui84pi3cpwhh3nnu2o9t9yyydsxr53r7wv30c559skqf5268p8l4ze844q17216pxc5l4afugx9klvhpl5xn19r3a7oo',
                flowInterfaceNamespace: '718o64edn2mltyzeqvcjjf90jlppdrexqbmqfgiekefvnyiy619dzyoch4dz7ke51lq4xb36o7h1tqbf8rd3jvatrcwjn5pyh56iykipxsyk0r25mzdb7w4mw4ecni7ci5drr6kooj8rjml52w3oenzbfjw7z9i6',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'vxkr3szfjweicrn8dt94tu9wm2yeeo757ml3frj9y3bd9g0rusr2iy1euokl48m6kbt4nmdrm2splionfd2oojf7e2ph00mohatffwwis46y9knwzp8rk0hd8jtff6m6hu7vd0zyvluhjcrvno40mxi6vkelugzh',
                detail: 'Minima quod dolores ut. Quibusdam voluptatem aut sed est voluptatibus non. Unde voluptatem cupiditate architecto necessitatibus voluptatem. Exercitationem et veniam non. Voluptatibus est ipsam amet iure facilis. Officia quod dolores.',
                example: 'irplwhm77l84e79f473kyoawjbcvmyi84ms8dnmd3p8zhw7de3nilx91thpipa0c0b1dl7smoso3qji9i11abel6xp90ggwxl6gnqtqezd2nbohgigihety5thz4zhmhwsnswtiqtbcgjaul5smmp3su5cg9yuuw',
                startTimeAt: '2020-11-04 11:50:07',
                direction: 'OUTBOUND',
                errorCategory: '7t79crvrkn6qulbh0ftvff22nf7oijnbw8e6bn4wbi4wlfkc6j4uuuxiaxv1bkao5b6yrf1rjdpgjw16999x4ghnmht9kr6gfc6zz10yut2b9rjfz55vve2beds177axk7x51dspfzs16so1nsmy44wm2pfshlss',
                errorCode: 'mu5gqmc4vto5cyem9qzl4d8l2b2aj2ka5dkddcaw549w8es6b6',
                errorLabel: 939894,
                node: 2713959026,
                protocol: 'gezf5rht2zouqs5bjqvo',
                qualityOfService: 'zoimwzcnv00cz5wcwncr',
                receiverParty: 'anwm5a3nn1fisxbq6nfy0aa0qak95clx7xjhx62jc7jlmkthw6yrrdiznjh217dzt0kixkiws39i44w94qmowtgbxvdhw9cufyo8fhdcl34f9r54wt7ugc0rj6jkb0ujb3092qzht1y4au4jahku7q9ey77f0pxm',
                receiverComponent: '0jsn4liq46bklwhvpasm8jx6g5fplj4p8flxom88smf58pwjgg0hcqo2zy9gqj5yiycotyq0mcshbzvk6qdj3dbgsu5fdcxpzvnfi2emqxdbs688ofymnt3zhkn49r2czu1ic0ihjabwzzncazaihhpn4sep319b',
                receiverInterface: 'kw5jvieoqsvxghub24ljc2b01plgq1oulojzqqjykphdtmorya0pb65j8nsga6uq9beesiyg1xyb6mpp92lnvfkh7gdoymeen3lq1n197kwtjkrgtajw4d1tjggs7b5apzdnz2ne660qnfkjjc05338rfu0hu2zo',
                receiverInterfaceNamespace: '9gcrs0bmzb61wa80syjr7bx15x40m38yssbmj838c15vjmasu4d72hw7favibmq9x5h2g6socswpch0xkj4cue878h8o0prf3ejeqn8od3ch7tfdygah6yrwtk01t5ypp6pc1gvmvmrd4rdi7t82j5vina8610pz',
                retries: 8941401033,
                size: 2861709365,
                timesFailed: 8428952958,
                numberMax: 4992450508,
                numberDays: 8284399493,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: null,
                tenantCode: 'diftzbzoohl1uh6cigu33s8fsg7w7fzk7j1b1pe25agcbgmts1',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'doe4qwvva3bx993jgrbw',
                scenario: 'bu3ub6gm4tqefs4716h1f6j3xgy5ga4zx1bt0cs11g6sn0ox3i38c2ystajl',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:24:51',
                executionMonitoringStartAt: '2020-11-03 23:32:20',
                executionMonitoringEndAt: '2020-11-04 17:17:31',
                flowHash: 'd8yhpanvkifjymrz9nck59o8p4tig42nvnyxp849',
                flowParty: 'n0muy2p0gae14mnm901o2ss8v8n164521sex9ng3mgklsvlkijm5lnuwm5v7yw89umc8b6xg8yr0a1l3kk5jea35npqguoluv2zdanr0pa5q46btqh04tagevtb9z71xt7a85tsqp1svsf7zmjxtce1fdf2ka5b0',
                flowReceiverParty: 'vk9li4qvbdrdb7a7x5uzraobmuc76xx2pnxqrkfp2hyk07zjb9gny06u0my7wkjz8119ddbt82esz4mvdhfbd5pghg89idv3uxk767mkypjn1nk0iwwvvqe6jgy5f35n4zl3d9pnrkswzpnwsghiexofnt646ydo',
                flowComponent: '5w07469ot7dqgrvl19bbo1bvxzi2ufep4dp6w3s7du61mv652xf7h7uccni6wzq2b29991l55flpfnsxxggywjxwymxntgzca2jqs1djsuayudhh1gvd6iyh6wtdo74xzopfyqrjkmhh26tr9s0snzz7e64q7sn2',
                flowReceiverComponent: '5quulwz4a8uhm281jagokpci6j2eqdx73tocfei8mj9xolyy57yfcbnp360i5r3kn3yv7tnsmkomcla1h675fi43a6s1ec58vf4ivsseuxy34b8v4dh5u2s9hyiwkaz5115zytsr9bme5lqsni3ekq89g7l03435',
                flowInterfaceName: 'cuplrwkeb289txh769jrspjfrqvbc0v2mu4gd9z9cxungf22okqem5592rd761qt5e3vgsmrtmjkdefg6smjqmjmrz8nfge5nlbyi2n7ok45xknttq7orebhiaq6cxt1iga7unx1ozs2uac775tcmkc4u10klq6n',
                flowInterfaceNamespace: 'i05wlluwvup4u5nant54iog2xrbthgs03zbz7sz6djcjxfb3vf85tl3tf5r3fbyv9kcjpp0o7ir79e3vpg9pxi3yqxdjgosf6j2mp6rydegrk0h8qugcy9gn8e798pu1mx275589k9l3y4ywaph73zhxdwjlvntx',
                status: 'SUCCESS',
                refMessageId: 'ukk1hi6r3o9rpv1fjfos0amcnt9pa6rc8y23eg432tg5r7dez34bcqvygwqohgcg580k6lnjy8fk02fci12j03sl141ucnjcfxdod2y2fizommfv21o5ple1irkntm65fe3824vo2qbufi531n77bvbzoiq3ql0u',
                detail: 'Qui sit accusamus fugiat est nihil debitis qui. Reprehenderit error quibusdam aut qui libero odio. Odit praesentium totam et eius. Ut doloribus cum qui nihil. Excepturi pariatur eos sit quibusdam. Excepturi sed nulla culpa quod voluptatem rerum corporis.',
                example: 'nq5m8ni962hw5tdw91w1oidejvxodqjkaqimqtamj1v0n5nxxv0t4ik6jc9hs3np89fu0lkxk2t5ik65zztkuenuqg95qcz3eemqp0v26uxnvzv5ebzud4nwfeyub5hkn7ev99qrwskfwsxbboxqsmpvigas3x4t',
                startTimeAt: '2020-11-04 16:17:31',
                direction: 'OUTBOUND',
                errorCategory: 'urt4xhwu5thjphmb4nrhlpn65a94nfwnyhuxslkautpt5h8ty61j5okizdrdxq8p61unm9ogog2j5am5xqrfkdec7yrs73az4he0k6c96it0lpclree13dkthapgbnh9rnlslp6r2rsm8y25ys0kflz9pbn1a80f',
                errorCode: 'c3ryc3v990jb82nef8l7l3w0lhagc6f3pwh6b9c6ul8xnunrlj',
                errorLabel: 593942,
                node: 6381034763,
                protocol: '7twtfckb1rt5gluyz5i0',
                qualityOfService: '9mt1f2ae1wr98xysout7',
                receiverParty: 'tvpyg4gz3ofxjiwx4h2kv8mg6otf7vu8v0bib3exmeo0qtofhsx2hndxy6wpq39qftts2f8ftj0ecr2ifrrirw2kpp50seilb0tper84xjrlt1yckazlhy2iss517vbgyfo3jix50yoywpfbv98shsiduu9txq6g',
                receiverComponent: 'epfjil0xirj8qbro1qu2vj2rlaamryguj65cayq80cvkdy5z27o331e5gxq76sgwc4o723c4sqcp69bwt9nc65xj1xa831ujkkvz22aj1a9fv2zzfra516i5r8hw2hjf3s1gvku1g9ugw8lzaqjwnun7wvjfac7u',
                receiverInterface: 'tt8mnildhu5joo9lngmpr8n6qmrtjlezskzpjv0utkxm1uu0wikac4hxqq0gkx7v6h5es00cxca8rz029ywea32cti4n7rhs3zhgh52s1mu9nasbyv0wnnk4acpt410jqplf1oo4m91uvg6qwv6fii5uickjfox4',
                receiverInterfaceNamespace: 'gyxpah5ajh5vd3e0n90yd5v6zhb2dwh298luqpj5e32bnvilsb6zpzsg3r80glu3i2r7eul3bxmob70qzzdmnmzadqxy45e71aqz0fauavk32iyw3ohv052no6ep45t96lz594gnbgng55bcwk2h8s97jgzlbjse',
                retries: 8943069052,
                size: 7190347202,
                timesFailed: 6191111663,
                numberMax: 2055843254,
                numberDays: 8933822369,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                
                tenantCode: 'in0i2r2jctyrbx6qxyl902mkuugdnpbc2y4qvafhmbi35y3ol1',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '59sv551z3niw9xqsjlgi',
                scenario: 'rvr4b7ecnnt2wjvnygffsnxja8t645h6nvz4mch8cy95ot2ihd6k0a8yhi76',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:09:51',
                executionMonitoringStartAt: '2020-11-04 12:25:17',
                executionMonitoringEndAt: '2020-11-04 16:38:17',
                flowHash: 'c4rh38ct68x3y5vo1w8loieo8brwhb7z4j9qjek0',
                flowParty: 'iymexl2t87f7hbxl40sxge9xoqvhqrd8nil9u3m1muvf106mj42o7rcr8mlzbac3l92aff8t0n54yzl9jnh20gs96b198bl2zp1sbssar4r8rcz953jcjcwlrt741p0zewnskucj9r7rapn14cv4628in94wbypq',
                flowReceiverParty: 's0v94nod7ss19dc2zw0q7jy9ctery0b5kooyxt8p6zdvueeozz2lcnv6wmvt2er9w2luzeirk8fclqk9se86omjt1mzrqcy3iimg0wmb8oezw1wwjh96gkgb0mxdfpg4gdp7uvza32bqplxbiborlfz6qo3tbcc3',
                flowComponent: 'r9093x53cftwmanbkimlg95lb4lj7322wuofyxaypckjoasmv2osj8mzuc1dxbomye6d24ty0pbtk8035e3k5op0ggou2183nuhf42tqpckzr5lncv75ranalhbo5f3brgcah3fw6639xpzbnev8al8kz4uqd9u0',
                flowReceiverComponent: '7j3eschhae30m684rx1terk1faitjgjrli0fdtk7xw6ubzzo7mfl8dqwrif1phnvug540a5v69k34nvgjcdulwhlud8qngr5rpjjw63y1higz9mj138lh3xk1uhygppade59dlmbjf4jyu5lozmy3d4lkukh3pri',
                flowInterfaceName: 'uiv6u9blrjo401gjztww2ptp9gyn4p0byixk10y0uuprugv5oog04ra4l2jxgq4nkccgrwh8jf8frqnl7k1zfu5t0uo6qv38tbh8n3uysc7s6mchqwl5euud744of8x14o967xy99ig527tvw090j8uzsyc6gbfn',
                flowInterfaceNamespace: '23bbamd2hiobrmwf9gw6xiwavndhbcvf5zhjwew7rs2jler9t7r39dh61e32kf8d7xom8lmo612mp8dmn9qkqolz3irarihi6li0biphn9hw0tqaa28kc8hs86mm32nnq3taxt4kk508r5evc81xf7nehotooqbm',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'pm97igf8iu4g4wfdkvsvvkbe35ppq152u4yw9h5vt6t305d8pe6t0x90w6oy29f652xged90ou546xhv53ziicw7be3wc3wv9ow0gq86hyc2f73f06gkpn29apj705w619gdckm8k01yy3shkz6el7awuvzwfo72',
                detail: 'Consectetur id iure cupiditate dolor beatae quam accusantium itaque eum. Ut repellat quo autem qui. Officiis ut in explicabo dolorum porro quaerat et voluptatem et. Rem nemo quia quam atque.',
                example: 'npppe1tvzas7uf6xz0v6qx5s4jblgs9w69bfa5pggd6kuqk8oo5mnm3jbfgjh5ng40ubr19dy8y173495nopfc27zjw6lf4q21ds1qyi3iqz5plmsh5b4etfn1wug8ttycnahusf74e0m3o4qg8tcxypwpg1gb1o',
                startTimeAt: '2020-11-04 04:12:43',
                direction: 'OUTBOUND',
                errorCategory: 'tuwf64lpgxxnxvzfn11620x8sg05jfxryi1avgjnfg66y4kbpkopv52lk7wnjur2ptldkulfzck1vbag5b23k5m1l69gye5fsus4kqg8bxmm3tddv4rxjzuuyq7zmkl0692b5sx75c8a86fkis0y0y8frwpun2vl',
                errorCode: 'mj3krua228pn2ivgjw88xc5yy0wsw0yundfucrf6583mfvx8x5',
                errorLabel: 993918,
                node: 9089960700,
                protocol: 'n84vrxpdwf1h02ldk1in',
                qualityOfService: '4imklmfmslmiwdtsew7p',
                receiverParty: 'u9hklt1ztiu0856as2etkqd9yrbukhrukdlxyghw0ygjguftevu723tpx9y1no9v6pdpvzd8k3g6jyoxmoc2ygq4ymjq56hj0bl5atowvjkeof4lq1pcatxnt3me915goagmqgmdyx410umcw855to031v912dtl',
                receiverComponent: 'dm6axo0yq5z2nk4vizff05ouay9wzp4tye9v1h96ynhu5hixcpmk7lo5jk4z8qh9ak1ojw578ier8lzey0c174bg5n4uksmk7kkdfcvb1n0xyezlas9cxxz6gg69t2bk1e50j3d6ifat9x6g5u0og74iakwasg4l',
                receiverInterface: 'n5i6npjpob1lnj11xhhvodohbrtpiyhql8sk2t6elefwux7xgb13ywnqiyk69ww966b35yz4nipoi786u33rirdtegs7sxdsg1g7zxg8g24p0hci4fe2az2png2j45hs0lae7bj2dcqcc8pazlnqwbbvm4d0hwub',
                receiverInterfaceNamespace: 'qxbvw08ifk6v7owvhx7v7pjt776ejv6f61t15bm3aod5j8vx4lkyekw6m4qorg2uygh9t04p36vstoqxzexaq867ts42zjdit1k7j3y6mcc9d7s8gtolatl6gugqb6fpv2rwwjx7nel9g225ab4ue6jlhfwcxx4w',
                retries: 5477218821,
                size: 4442336290,
                timesFailed: 6373579946,
                numberMax: 5072023020,
                numberDays: 3033603478,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: null,
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '0hm20haxcqovcmsidz2w',
                scenario: 'bdya0s7y6ptfem9i5nejp3www4qgre2ahgej3v2tnfn7ldlpou317qr8jlmn',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:27:17',
                executionMonitoringStartAt: '2020-11-03 21:55:07',
                executionMonitoringEndAt: '2020-11-04 01:25:44',
                flowHash: '25u9bwrq21o0nilqygefeuoquxh3gdc3qpoa9moh',
                flowParty: 'w3yp66tqva5r08ryw66fs2l07jpmw13ln9tc93q4t5zhi5h2eg85yg3q39vg3xj7qs2cf9eobr8hts55oraf1m601u9rtj586htvi49dksgplracqmvu0nr036ofs7oywm73lt8a9vcf0qn7hxufeglfq5kd485y',
                flowReceiverParty: '249zw8jwsox4o1c3n0lxgjyv4joinhtfyyow3oadg5zjcv7mitlcq8wh3sup6yn232y0zuw6n3rljsvxl98osjmqv60ios3o1947xlqscmee9qjfhjvv9nf9x1ncu5rrejifdbe0pldcsgz3vi4cz652ocynberi',
                flowComponent: 'g2nxjh3zn5wk62buaw30q8d9rwshe26k4kdat3mff2jaz422w7naeha61k402eanba5hfrh9tr6uqqmxirayo3cw4lyhaswah1u6utq4mf512z5v2mols0y8dv2qku5cd18cqh1nm5eha1l7lw9q7cs88nkua7v5',
                flowReceiverComponent: 'wl6ki1se92ix0r422asv7j4so7g1a4qx1r2r6a57c1v9xyn678xpfnh6vx4br1jt669pu0a5hot8qqx0p3rxkao9eudijgm2jtqxx8l0xtjinbx4mj6t3tyeh9jiekopolhwph3w6wpm5zimt0x11wzyaiclz6jx',
                flowInterfaceName: 'ryau2yaw2bl6bcceieaai7hef4jeskl3gw4m6kzn4084xawa0irmd34g82rdiyas7e6oii0shzm5qcgpywqr29usfb6xb8e175qg0ac4s8wwvdttc389ypvm4a9d256s45wdjzaxd2zjjkd8wq8ffisizjy3jtf7',
                flowInterfaceNamespace: 'yh29k71g4sn5lkwsuhr3nmk041725c1mxgdhlfjo97o3f251wa13uz4rmt5340s2a5wxm36rbyd6kmvv7cr4hqi84c5jf6y1izwzbkvcxvsnmm4drcmgwpkboi9m74ffwp5x9cr1ja3d2ecp4y8n7omjitvt8vjl',
                status: 'HOLDING',
                refMessageId: 'la2d6invo8806i0qtjhdbhsatwavvwyvhkb7bibj1h4i8tnk4pr51r8cekbpz7m3hkv8y7wgecy907bpzkxvmao8bigp7d0ffefnygdsz5scekmhjcutn1plgabarrd41bptsr7f6hmbkwilitfue8ldu3nbc880',
                detail: 'Porro quo officiis nesciunt cumque corrupti debitis expedita corrupti. Eum aut velit cumque rerum atque quis aspernatur est. Velit eaque modi omnis explicabo ex inventore vel soluta laboriosam. Amet voluptas et autem necessitatibus maiores et rerum.',
                example: 'me95u81s4qhkx89280gzgovt5e8l8ltf0efjokrnmioitjsy84bfx02broawyo0k684lu02fgv9a55yar5cphiyiurzu5qr6dfwsbl6zeww6vnai48bz5gcri53vdvteklhi2z8n87c8rd2k3umyc74e281f7gog',
                startTimeAt: '2020-11-04 03:35:53',
                direction: 'OUTBOUND',
                errorCategory: '803dg07a6x8zvym8f13io1e8fwxh311771fiv2g0lqjorb75joo348fml9djvqq4o6wdfvqn9dgzquvltpjf0kspcwq0zmbl325vxi012q04ws6o8jswopwcvc8ttwvo5ybzrx3787ilsvb1bmotn38mu2ycveza',
                errorCode: 'xfku640xdwxtfvdh7fq2dig4d3bqkl1gtqgr5dz3gujr34yi97',
                errorLabel: 445637,
                node: 8328687123,
                protocol: 'gnf2wheumngt1wpefhda',
                qualityOfService: '5uo04wcwwwjujhornwty',
                receiverParty: '0ynn0zkvosqutcw6n27w4y5lhlyjdnxcz64uxg45m6l3m2dz83cxtjld3hwb0q7aocn7giv4sdnkqzrov21u76ekft6h83r47dhglj7xldojolj7x71cs05tp6k9erygzzi6zyn2dj2td3gz06bw9hpj3bxi7ij8',
                receiverComponent: 'rfus88hdnu16cgtk0nmj9epenp56v8jyiim3on76ntrncdhob125gmk4aj7tr149p165rjd0q0e4jldhktqodmvsx57pfg4e6alcde4x1lbdz6wc8kkf1av2ixpfsliusfcn67iw9mev69c4cqrr1009w0b0unlh',
                receiverInterface: '8e9qh964dlkmagb6sdgkq2hgf24tlesqpwb6s92jocim94x3ayoxotasvg6fm4t1azyu6jlo462i2dlxet5x89j7u3b668gn4epq6m2i6n3gincti5i17r8uzx0u9mcluxqjr224q09jari554wvahvylac9fvef',
                receiverInterfaceNamespace: 'jkz65oyuxo9crk4ycnkvge12d9sd3q97eqv2uwldxl3hwsd6kfj4oldgukvzwcy8384o2zaqnmf4snbdpfxrph569nwm6vunut5fyegiapq52o9agq1tmm8huvmhhxt3uo9arb3rt0o96fi0r895ug633eavewe1',
                retries: 7856635448,
                size: 4056660705,
                timesFailed: 1495472250,
                numberMax: 8362910012,
                numberDays: 1830886967,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'sz7mfrm0bgcqhuyxx7dw',
                scenario: 'a6v2ptv2e39f8xy3ahh85kg2dgvcwh6ybnirxk8t0hlveaotqofje6m7mxy6',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:52:57',
                executionMonitoringStartAt: '2020-11-04 10:54:13',
                executionMonitoringEndAt: '2020-11-04 18:05:33',
                flowHash: 'zayojqseafyw9wb7589b84kf195h0orgnsykgu1y',
                flowParty: 'zpue58dga56cg13t0c912qkun8v4l7bu17uqlcqg6m81e6z0fesualmz8psswo9ng2q6jffn89dxg8079715akf4am72k478s2fle6xm2cwswog9ry4csem80ma7jk5ybdg5wd2892fzo9cph5k4n0lztuf5svum',
                flowReceiverParty: 'qcs7lf63hwaxefj1jlre0lsnob597k627ik196rqsknnlog4e081l2lcy5na2rn6b49nrn6plx8daw9b048oex7r1fi0dindr778m7wp02j9918rb8wqr27v3g1t3xeh7kg2uvm63wnicq9w35cui4u6ul168lzh',
                flowComponent: 'xtcy8cq3iposnw84khorkmkuyzh0n7enojnew2kv0d63t33cge23r7fzua8vp70ppdjpgw2jgnkusbayqyy54qsx56i8tdxsihd5hr4w7xuyo2jbmtuoci3ghl00c5pt3j1onaw1v5it4lv65ruxtebx7a11doqx',
                flowReceiverComponent: 'gwk2bf88jf5urqa8r6mq89j484114ilnbjtnmpkkq9c5omxebt7ga4504k4n7e1nmwmn98ikrm8om2brw4iq6c6c52kme1rqqude0s92j18zt2jj5ibd76w76wvx4dol124orvf0nsdmynmm4rdktfm39dg6eln3',
                flowInterfaceName: 'pjjy5sy989qjblz1kglvhhefbfxlpjiku22puc3rj7thqv9kfl5yeooddomn2qeenonzkmtbuwj1e8ak8rzgva3oimrkmyjggvfif9epqclhls7kmb49ysgdyat67k48i8xol73z4nqxym51onrhidg2vz5mi2av',
                flowInterfaceNamespace: 'oqdit5sz75g5b0m0ddqo0ikv5h9vlonxdzn3kx7bc204iacp5rduweii7qm5ha0pg4m331147cuyyc2qzmngtsl7psgu2kbkt077zvlzkv2pxgj12u6407ipzurz2wzgwhtamoj4wzaicw83jev9dkscjq7pbo0e',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'ec39eso7xdp2dhxeu3xskcegzyvctlgcylxukmi8zqqwl2ym68udsxlq5b5bfkbkl0y6plpl6veu2tv81f7ovwv5ugeycfpj10yw3opoy6mdz6ww29by2cmlqfs1mdi44pcex822bs3nycox6o25sqxtnnwkojhn',
                detail: 'Et quia quos qui et ut quam dolorem. Laudantium mollitia eum atque nobis. Repellat quas beatae. Rerum aperiam ipsam. Recusandae id dolorem. Vel inventore aspernatur rem aliquam quisquam cum totam.',
                example: 'vdiaqh2mn63swmh00p91bnsmwb91x6a47ytocvo4fq8p7ver0lu2q0azzft2l1uy1vbbj299thxil8c3kq8fualjlnqjx45jte3ohcdk1dpuznaefo8ib7fbe6ldzbnp19byjr0oohnrrcwcl33xs96wp1z78z8q',
                startTimeAt: '2020-11-04 03:53:36',
                direction: 'OUTBOUND',
                errorCategory: 'w24ex9s40k5j897eds2cewkwdpo9d3h96zggf7kco8f6phvntxqgiiva2yythgnsfuwv5ksqoq2y3mazhecxm8p66h6xw2ju5nttgjh56abafsr81x4lq70vn9kizrq9eng6azwrluo5lqir77d9fcpoaq2wa7rx',
                errorCode: 'db2wkzlq5hiw5yk20vzjrt8hbx7g7w73m6qp40zcp9aal2sq67',
                errorLabel: 387799,
                node: 6168955715,
                protocol: 'v47i35ik3a5m9jldtupz',
                qualityOfService: 'sgxnyq10tdggj0u6xzq0',
                receiverParty: 'uxw9finflrj8np5p0k0ekv1upu10xeyumplzo63bjsonya52t3gn91zx4ca44j7us8kqswp1lfd3oioqbr3vhjujqhdmk08583odze5a274zykr5qzimzhupwie90x6waj9tn4rd4m9gjxpx3p8m51r0m99mm31b',
                receiverComponent: '1cylh1344ptadzg5lgig0hxvmy52yqd7rzzbx3vi89ij6te8xsill0cgnxj40lp0wbsjjafkokxdr9lgafttcjaw208aczghlrqq7c930u9t5k7m6a0i14w1vuocf0e0l8atpgbiq0idot4xvnxtap8nqffydt9t',
                receiverInterface: 'u7bjmgj8prvrfv3dg74xjc0uficod2s0lkf6j2f9skyw6ajaw89dtriryxertwncsls2ydugid99qqoq95ucve3f624g42z0ect8vkry0trw9lcfwesjc0rk7p99o4wpveljn8vs7bhdqx2vzkq3jjzdjrksnrcy',
                receiverInterfaceNamespace: '2xmgpnnk6qcldj4ecljdi7n56hsv1pb75iij2qqvmeq8qkxwqlscg1iv4xmw947rdxoqwreaq4xmns6xocbc0bmo0b2ptwuu5g97bh96qfc7wdlkghgzunvmhp0k6i8o3p9ftvtn4995glsg8uqhc9e6qlxo35c4',
                retries: 5799353076,
                size: 9826840745,
                timesFailed: 4085672411,
                numberMax: 6611577368,
                numberDays: 8110346208,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'rrmqn2s4u6iwxi8g40y9nkijljbufyctnruyq0bewryzkj0h6g',
                systemId: null,
                systemName: 'y7is3mefbo43htekvcsp',
                scenario: 'do3zr65kwcghe5ypp07xlniclwvghr6f4hgwbtiggh8mmqghnxyqofod1ego',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:11:19',
                executionMonitoringStartAt: '2020-11-04 13:12:51',
                executionMonitoringEndAt: '2020-11-04 04:12:31',
                flowHash: '0gepm9sj6o7x7kb9dwgslqx9bd4dg1s51n51fbok',
                flowParty: '48az85ult8g7z3860xj3uhzk4cwxt6vmqbygmdkfugo7mzztuytezclahqebyx8gn6hsvzl3wd5483n3uxr1wyyimtohpfvvkhy2tjg5simzxhrqhj3mzpfjqiqcaz8cfxtqdyb5opa4tz0z59nsmfa403lmf345',
                flowReceiverParty: 'alh1jx1970ux0w2nr8qmid7ff92rpa4ye5rz4jzl1msp3s74z7dxbj4a7o3nxn2na6r5t4h6rse1nl6mb69xe2saav6ta8kfna9h3iqlr5n7m1i44h6z2wxdv107x2yslhgn2w61w5w6p77yhlslria7yiuahe7u',
                flowComponent: 'rja0keir3c8njdg8mvul9jlk9s9fpz3hu4z5ki8s8biup64pfsn5uamxhs50d2fpyj6y7hdnm9ajc133skr5cpwx9zt08p8pf3xzome3de6mgrnds0oluk63o2kwvbx2otlkauuouknhu5sqi80cecrocyxa318f',
                flowReceiverComponent: 'tv5vxwqwte80qwbj56kco6bzudrfa5i6um2i7j7cm9j63xd4j1f25sozrtos3skm7gc8quidladberm93d2jundqjbn1zruywidt2cnvjgfcyyrblmvi3x750kqfyrv2kofty4id6is2yk7iv4sqff02awr1r2na',
                flowInterfaceName: 'sfnprbnc5ttcklqc27t8qjdnnwvufnvr946xulkzsnm1txlak5l2j1zx07o5ow0qgzdfefa9cong37vix40m04xmrmhqql7ecaduuu2y9k717dc8izuveh91dbj81tmqdynyrsg5zgmsi4xla3p8npsi1j32f47k',
                flowInterfaceNamespace: 'qaf8px5buh7gjkxpkqaw3p1i3ygdilo4lg2ro7qudvaep4eyibigh1nn7gndjb9f6cferhgh4npwfkz9klykulmap9kqreins7zlk7xuwehg4n9t1mhwqpdso7287mnf7nrwvqdaqwlhblf2wlrni6uugkym0xn0',
                status: 'CANCELLED',
                refMessageId: 'ieng1tlyrr205t0z5udo0f3b2h6bnhbh5sfbhnvb3cv0pd6tkfbw0indr7zsklrcwc6c9m41i8oexm7575eyw6v9nk1ph3xf6f54klaxujxbibdmpie3xp9e4ao31kepv130gqcujze4u80qw34rky2slr665ps8',
                detail: 'Commodi enim minima asperiores quo dignissimos est harum sit ut. Mollitia tempore dicta nostrum sed est fugiat. Et et maiores quos maiores magnam nemo incidunt.',
                example: 'u44on2lnj0eo2p4e8gwytg5dxus36ga8zlwnv1iseiy7fw4ow51wnyy5z3lw88fikdh86wgg33ifd3f002ywc9voful1tsz0g4bguppsjo2ykz9x6p0ows7wwl4nmlztvetu9kxj7dmdvddjcdm0w1poakhlc905',
                startTimeAt: '2020-11-03 20:01:48',
                direction: 'OUTBOUND',
                errorCategory: '9hss3577wojnorpq9qwbcdpkyqt8ma7yi73ejbfhb6v4vemvx66mzxecktgitzqls899xv2of1wtzxetdxnpiztud060135usc693mxdjhfmwwge84jow28qvb34y4oscauw8h0z2yt2zde4ojjnith1s0k04axe',
                errorCode: '6nqywbjl4mlw5ipsqyixarckmhohhvdtlq3k39pp1ypvg3zi1t',
                errorLabel: 259729,
                node: 4739946554,
                protocol: 'irmt7q2jzyduil6seimq',
                qualityOfService: 'rzdcioj2v9359mvgwli4',
                receiverParty: 'ocixrcp62qprf6ipmnirwt1xwv6im1288wcw1b1jap5c0uz4qdbffwso392spp1lo6d116hhgr5676sys3g0dloa0ojvbb76tsnf55pqssrl5otogk69eqgn6j91e2uogmpknid0x0js2gqafz1qbqlfywvfrg5a',
                receiverComponent: '51wzaf6ilthiuo5sncw697ijn61n7oyh01bknnmn9n1xi4sh6tsgh85uxr0rsizz7o3y30lkxhhi2io5ixnkidl1os15dhvaj9q27r6aq0emvqkj9993h2l9bcazxnlk0ggvihi3fok64dhdd8zng39h27mecc7v',
                receiverInterface: '4tu5lxxthh1s06vjh3xtf1mo4yxqdrejtyrpgd9j583rsfj75u7q6csqi4jgjz3jyz05cz309rkkx2c2n5lcl6z6glmrb5zv48ikh7nrrr84f3xmi1dk15nz8kye8qym6qpgp1oby5klmovj3hehcsmm37zkahw8',
                receiverInterfaceNamespace: '4vwyg3cbqup2poezuymru0o0pzzwzuf0pj9vxby9l9chfr0b5lkjla9jy4t9gmrnwonbglys12hhclm9lme00e1e5c16ktatkb3v7t1m06ghea8m3fm3czrs1avl00uhw0g0lwnqwpe1sgsyl3bafj969yz1ponk',
                retries: 1044711355,
                size: 1524135274,
                timesFailed: 2491165677,
                numberMax: 8633603324,
                numberDays: 7701643316,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'mege3wbpcm1u83629zpza4hrp7pbfd8jf2gj4hlt16agqiar39',
                
                systemName: '8mtkjdbln4j7iejg67jc',
                scenario: 'b1g7mfi9v356fwp53vr9pk7hcacnplw9fqocoze92p7vyx2mod4segndr105',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:09:26',
                executionMonitoringStartAt: '2020-11-04 11:46:49',
                executionMonitoringEndAt: '2020-11-04 09:03:00',
                flowHash: 'c8ib1v8kqv3l71u9gpw8suit3m0uvjs56r2ak39e',
                flowParty: '2gq5ehlyvair4oi9atg3kv85stjpftmz0gq48qznkya6isnte1d7bkrjkuvz6bdecyb35aexi71024d3zotgotctq32harp52tac69uckfbuib40q7pby9dpm88plm1xep3p75w17bywzj3jrujrzzybzw8m9fq2',
                flowReceiverParty: 'xervhni7jbv0nraxdyexdd016kex6u3n1vir1u59754om2hrkzailsfh7b00oxaj0hwbmo7u948apajygbt0eqf0yu9da2ogjc5fc0cv6sibi9durxd8d3nl7yrwvxp4nh3yldnja9fkaffb9iyoe1erhgzb8ljc',
                flowComponent: 'dglcoi1sszftzch3yknd6xf8oe3nwqfwcxxg5kum3aci41h99pbvrpxnz43fs4thum2qx1fb1dr7fbbcrp0orx3or9tk0043gxqq9e0py786cyc69a2n1ewoj5y9264wuhh6kq3ojx1hjz7jj1lzca3eukkx2990',
                flowReceiverComponent: 'jxyhtvlxzg76hfor9ur90w1144g41ttj9per7oc6b7hsdqx339ygxfabvtl1uzsjjnbtubjmq6dtvy9v2iu4nxts0cphjdcfkcq48d1sut9fbptbc9pesz16yjxo8yo87qyhcwzgroikmliuy53n305djyx2m02x',
                flowInterfaceName: 'eb87sckxv5msb8wbc2ctnzgl4m4jhjsp4s6cwucl9g6net68gnxyirl7cymsj9zilt53cfizxd03dqmpz2fgb8oa730fe5tun6tjx4m07rqtwud06cdwemboh5kdeh7yrvrm0lgp5y9o9lho0mcco77yn1nfok1t',
                flowInterfaceNamespace: 'pcnjccb3f1jp6kgayz057sjov3il4y4c2vv40ihx7ux4rj5dmibo5h0fnjgsqq8ycnqctut8fl151mofz6v1st7p4qoz51bi6l6tri6gvgjumvd1v0ve2vjd0422kxq28hx6z0k13nur81b24rn28uk6t0uob9j2',
                status: 'CANCELLED',
                refMessageId: '9dqs88215tcs7hd3072xm2focofm1ybnwxk5r8m6zr9ybfgk95l19vb8dav9827qowpot6yig67cr3sdiewka5njnlo0lx80q7rum1dndr96hu5icc04mgskcxoxsjdue0qw9actno4nwj8uif1hleuhdm6rn7kr',
                detail: 'Qui labore repellendus et numquam repudiandae vel tempore voluptatem tenetur. Aliquid aspernatur autem incidunt. Dolorum consequatur tempora omnis minus cum dicta perferendis ipsum. Laborum voluptatibus voluptatem sint consequuntur dolores praesentium laudantium.',
                example: 'iy4xajcasof2ryebvhluf4w4m3j069d37ofi80vyh3xehpwad3ixkutmnl6eu93xtprfsukeq7c8e5lkjooej51r8p4daj59py30x2qh8xv3p43hyjgw65vds7accpgdyebwza1jgozqx4ky76wpi72cmfc6oled',
                startTimeAt: '2020-11-04 13:09:11',
                direction: 'OUTBOUND',
                errorCategory: '0k92pv9c01ci65ujouwzh8yi8yqequ8qatzcichmmahexdj4q81ckswkugjnaftn7e3grtstfprqivmrqcoccuoe3x4kr8dz0mstcgzrnfia4f0j6d6xq8w39uie8rwcf7jbzyrynxd43pgicdxuvlxhzegzm4mp',
                errorCode: '6eswznxjfnwmov7aygv3a3fv2du94nwv6ulhyvpbsg23i76rll',
                errorLabel: 519259,
                node: 8579556062,
                protocol: 'bmqc2w21mpg8qt6iusan',
                qualityOfService: 'eoxjfwmx01emy9o4h5kf',
                receiverParty: 'sudra2qnk2y3f6mboot74iy0flxcacv4sg14frards5yylewb85gaodrzwae88v2230g9c47qvenatimvjmtvn5p2k25y8bpugzva82py046j3wz8lb20cnsa4jddbxang2yxpq8wtav8mqlg6kxix0om0jc6yvw',
                receiverComponent: 'llxhr4xy05m37kgy00mf5kl5d4tfjo3705qy6ig0c7ihjq81trnudr2htukdo1cskyvoviw031kxsqkjsgytu234ez51kjy7ig2kojwu9650056t1aaiaff37qcayiegcnh0uzu0wilecx2t7ekpn4cc53qo60au',
                receiverInterface: '7qw06xjsf9bv3fnw542temyt6ms2wg6co5g4bpip0hvvxzqc6aqdksrmdyie2qtxs2fx1ittqz7nhrg0r46ysdejaim9ft2jldln1ibsa2wf5e9x80zaaspdcypcpjlrzlbuhbpjo29uryun8vyok0enhgns4gr5',
                receiverInterfaceNamespace: 'nkg64088hibti2m26ramkt3tqk7i093v3f7u8acf92rjq3w6b3taf1fa5h1znkyhstwdxf53zb4trk3tqdxg33ikb6u5j0i6wmtzu5lsii94d0f1cqp0jqpc3a1r8yvhcj3lbtw37hvbqfcqkc250mf88n2xtqmn',
                retries: 9269149860,
                size: 9032163336,
                timesFailed: 4306629759,
                numberMax: 9759402915,
                numberDays: 5070033131,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '0ovur9c8j459tn8gxl4k9ei4xmsbilbhfjq9f6utfnctmgv8yv',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: null,
                scenario: 'wnoi80mi6hj09iz3g3bxfcezsjyu2d7u5lb1pfgylhetz7xhaipnvh7hz53y',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:14:17',
                executionMonitoringStartAt: '2020-11-04 17:14:48',
                executionMonitoringEndAt: '2020-11-03 20:09:58',
                flowHash: 'h8k4llz5qrsq65sujygbvyrn4i4mf7g5d77uhs0x',
                flowParty: '4tps0gsumzltawp18cltwsa5olucc2uo90t78pj2tnxmk9n9ca0wvpr1iysoe20l83ira4ndthvs3ahbm4ka737rn97njsxup7af127u0ycy5tf6kc1rnhbv0ni54z1f6ktqqjebv8cka27tku0wn97apjjxijz7',
                flowReceiverParty: 'r3ryq7vbtl69bth0rme7klu88u4zzurb6as20zzg47b8gg0a7mt7ltb4jqkseuqkv2jqotuorgmcb7rehk1wb947dr4fswfsw8mrb5vpywjzgiuwb0jbxqbqoybvhl12ny002co66yrrzw61o9chbw3g5xdu74ox',
                flowComponent: 'iuk04w5tdoa8xsc69ny3pj88vndf3c28bepfjvuxcgavr3j317d1bkv9bluhgc566699tag6kdpwx8kdrcijftiv2gkbzw6thjm3t3rluvv6kr5lf8wwiuvda51zcgztkz5t7bg7kqc6kya7nezfr8yegge7kqsp',
                flowReceiverComponent: 'c1pcvssz18fspukhnpq5agypezzknb3zia0csw1xiwgzsgi3czvh10knfpgf3oyux12wp098es1ywxf7c8i8e4xaaytmb2pftyrwf54ugx26zn7xoabi7omw8wr6ptdh63m818v34imt0r3jotvi1pd9klrhsslo',
                flowInterfaceName: '3x7hdtcg4ukzyutowprozxvgmzkjwr5neha1fg5mqhmryi92s1t74qu3ror4wjouua9i0ik9bsgt21cbnbergcr2t211dtimq4o2fed49y3xdua222512byg750hyycfzsi827qj9162hhqavubcv1afeem3pcdx',
                flowInterfaceNamespace: '4drl6cg1l9k932bnv65rlhio8csv62y04wtc403hkvh8nl2wuxzk71qhb84khiw2c5hmtdl0wigobk4puz2fgk3hlers5cu5vsb93g9963lj9tz0c2vysoc57dkzy9ol6pvkw5ve45dwsyqgatpfvcn3ki924h24',
                status: 'WAITING',
                refMessageId: '3mehweykq61cfntbvv7xc0fqoc06tz4jcurc2sp5yfczctnil3w0ydnxjyojxanzy71zxg04iwsmlsm4bexas8vprkkt8lmprmel32xix9cxud0lwdv99snmhopwxjqvukaws8wjr9m5le2cv4nxpg91s03yd92s',
                detail: 'Unde eos voluptatem consequatur voluptas corporis ullam. At reprehenderit error aut. Vero sed aliquid nihil qui voluptatibus provident.',
                example: '8e2ff9di1y12vcuqqflhvy0zn2eultrrvy8bi2l4o2tp9brjlv2w1q4p2un530on1qfpo1v3si3bymbygyak0hbgp4du091e1z9pfk7wez6h1yn31kv9lcd7who1f136l1sm5gnmhriglp5zpl3usytuvz04si5z',
                startTimeAt: '2020-11-04 11:57:17',
                direction: 'OUTBOUND',
                errorCategory: '0mwl477oladcndcp5df3xbje9mohei9c02r68qh3jn891udd2qxl9xjjgfumiuwwuqlnfzvy3oyem26pojeluuwnjuih348xw7402fda9eqkvpscgofl42e3cdvflh0rx9xlwuof9i55rfla0s9dayyr9ruc1pfb',
                errorCode: 'vxctkpnbqfislz1gl61u6t3dptgmttoye90fk1vem6wy26dnie',
                errorLabel: 341480,
                node: 6490153116,
                protocol: 'ygfkcyqh738x2fql3tdv',
                qualityOfService: '9g6zcks1d4kg32ri7lds',
                receiverParty: '3al630efjbp5f9x30s69qidg52ez994tvh59janxqz1awi1yji966t4nvikgyzc1x7o8wha42r3oqq57of8icp0bm8f2bzrqidy9zk1qv9dedzyt3asrckvs522g96iuuptzqj7x5a7bynitqb7v7rr4rgecsea9',
                receiverComponent: '69j6kpmh64xz8lpaugsh94l6l21enrczqv8k2d9wrhcyvc3zi8r4lj1sxcw27uvut042nuvz7vjvi7vyvpkv9qys4efoz7kbvoo91jodng4g62e9nu1o8xtb2kk1pajd6c7o93u7sx26mwnp5grqx884w3d59z9l',
                receiverInterface: 'mkokty8b2976pb8i9tia8vdwz65g51pm0wa983w1nirdt1ujlvx7c7t7g2mhb7a41ho3ge4gdo0myj0mzczerty1bw03c84kugy45jizxw4vm2f5ej9mz7feqvrdso0u1abnalssntosf814y8pchdkg0ut0oklg',
                receiverInterfaceNamespace: 'ne31u0o7do6u7072t3nt9r0axctxhvxijn1emyy1pxna500sz0fl2e10749mykh2gt90qu533hh6cia5778aiol750dy7cvoztlfg1e8llz46fb782u2oj4ounhtbj490zws3u1or2m8xcomv2ggk1hfsp4o9ctn',
                retries: 9899930158,
                size: 2394304809,
                timesFailed: 7279437978,
                numberMax: 1992385723,
                numberDays: 2877455768,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '5203vk061nkfx4uf3enzfwlytuxdbgzo2nw6wf1n2k9ep3de8y',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                
                scenario: '35u3eae1uutz5obfcxi25j628m98k7pvaowbuzarh8qbuf7w3jtauf1v1haz',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:28:32',
                executionMonitoringStartAt: '2020-11-04 02:21:40',
                executionMonitoringEndAt: '2020-11-04 15:48:47',
                flowHash: 'bde2jch9qg22i8ujcrdj85z1m1me3186dv0yh6jv',
                flowParty: '4a9bvz7bnev29pcnmy67kxk6r2z7i5jsfm5ki369b945raqvme5wzl5k5dgtsrxl34vm07186dt4gno98lmsxye1ri8mbfttbeolfzc8jly33p30bnher3btyju8ib0mq27on87uwiak4ggerakl7c6pz5ercid3',
                flowReceiverParty: '2h7hra0wdtwq7agdooq02uxpd69svttzy0sr531sntm6h83om3cqgg2v3wns8jeocengeps493jw8g280pmerxlan98rdrddczc4a0jcu7ab2gqspt0hzes0nuy3pbarij450e6mou2ck7e2dvsapv1vrn5p5hgr',
                flowComponent: 'hnijrku5u4ks5uxg2f7wbvc9x2drncscnrks7n16bvx54z3m9kkjgducokyasi9uw7vsh0sp416r03b4a5jfin621ptwu6vhxbgo7zm7exrqoglpavu9fkmyx75xe7kjk851q7w9f3k6d0op7wmyhj3retlcl9tp',
                flowReceiverComponent: '69ci1z1rw2pkxqcjzr6fg4wjl571anxrdqims289sh9lm59y7g1y7vjw4hhlyt5lkadaga4idoyfjpfb1nctbxcbv8yr613ukms9qorpwo6q3oatpvt1pyri28l2lsuk3vnqti4vhi4ybhjey4kc0f58vsgqyrl3',
                flowInterfaceName: '2e3pgtugk78g5wwxna66tqjmcvopa8id4stk3kr83z47w8z1tic15b48q0mqhi1umf8n77tw2xf163rkw3799u8m5h6c8ayugzgiqcsjogj56ma6vtqalmaysk8hdbxbpo002fj4dii250txzq05hkjd21kcbrqm',
                flowInterfaceNamespace: 'z6hrhonsekxhobimkwi7cppmpsn3vz9ibgy381dynkb066ontnxspmyvoskkphcvd0aryacztwxco77879hp6vrhyshx540q9k85snmzkht9s2ef4e2bnxcgfk114lshvhxlxaqr6d7bxn1cm1x1es513ezx91ov',
                status: 'CANCELLED',
                refMessageId: 'y0lkcjz9wldnpaikyoojhvcnqhvqd5hxe1bsykpuvch1za20b3i8fax6dufuhi1p5knn6vn3cntqwzvgyejy2bqfin6y3nb8mfkvr291w67357q5zi6mcj7y57l48pri654uu86dn7qtxqj062y5gzfo6sb42g9l',
                detail: 'Ratione voluptatem nemo molestias reiciendis. Et necessitatibus temporibus sequi est quibusdam. Magni aut illum non et voluptatem nemo molestiae quia perferendis. Ut repellat neque libero et adipisci. Ipsa recusandae id consequatur excepturi minus consequatur ea.',
                example: '028hjmh081dj6pb30sm1efyzdg6w4llbp3ybm72j083h5f8m6nv7dt78w1zwzk41cr86sf2urvtaoi9rclif28ni0casmdyeu7byruj0ulsgdphb383b6nrbwwghgjf5tq8dnm7fwdkrebtv3dol5zfsura6xiwf',
                startTimeAt: '2020-11-04 18:40:23',
                direction: 'INBOUND',
                errorCategory: 'm6l67fyvykngfbte9te2jwjl33zqw01q5pzh8i8r8jfjsvnbeg1nkhi51v0ourthjx310rt2xpfkomfqx6wvulxmwnx31pjkyb22z7xii7a7nrbc248vdysf569whx6wdmqaijroqfhbc6jssemeu4gylpsh6kox',
                errorCode: '38r8g0sx9r8q8oiioerntfdviiik1iiyx7hdvvrhtxq4tyq93c',
                errorLabel: 876761,
                node: 6487487774,
                protocol: '1wex692riea4x1qolndk',
                qualityOfService: 'k5e0q2318uo10pyn9io6',
                receiverParty: '1w7441irgfe54zv95k95g2d4mgvj7a5s6ue28wgd4u644bwf1wwxoj60ff6k42mgo8qwsxxtxdbkciakulm6tht3s3z9jmnkefohihabu5uzlktj6vsurrk54nojyy1yci2og9mqdddr8erzlsdtyo7sge7w7neg',
                receiverComponent: '8jjzhizst0bgknkckwf5jhcwsh4m3082yaonghp4i43ijqzo5xdeqp4klbn96841hytrgrriz6qk40kx43v0rfv5var7jvjf8k9yzouou3cg6dbdj1p9c82dflk0shv6krco2k76foiuoefne8sdo0efj8bi1r8h',
                receiverInterface: 'nzkluyfrsvoouyk2jzddrmkm1i1yweo460vquokis2ck5z9l7n77vktfni2e6ua56x6i45xqo3ubo2cs9cz9wftvputxdpiyvg0fdead9lb0017p0v5nzw9q2pjd4stu6cn17oyqv4bh8eahua63m42bfneqgxb9',
                receiverInterfaceNamespace: 'trah201a7oni61bpeq0n4bnh9q6x0j3g4gggabofg4upasxq4uohyjy38xitrvzohbmg72cxqsurdrz0pjvocbj6yza909703h6gbkilagwnjhtawcp08v05m7w0hwn67w95plnme3n1u3qn0cqh4xcmy928zlcj',
                retries: 2955261135,
                size: 7516018111,
                timesFailed: 8959782936,
                numberMax: 9946387626,
                numberDays: 4117974926,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'uwetmztqhl5v5nbbxnyq1imfirlwkmm38vd66i6ucdv1rr82fc',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'fr5jhhzpfgaoeofg9ep3',
                scenario: '55ydijq4ix79gaejuqx3ielhp2qhr0b6sdncfnw4la4xub77qjv1u4xw34s7',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:33:51',
                executionMonitoringStartAt: '2020-11-04 03:11:44',
                executionMonitoringEndAt: '2020-11-04 08:20:14',
                flowHash: 'h4l11we4u9uhjm4de90qsjd123md4bzgc0xlz8su',
                flowParty: 'qq0n8i3vfcrhb28ki3muexv0wcu85vkockne3gl02ramsq6dmntkg5zm6kqnt01fyb69vmwc7ymvxph3oll571ppwgnfwx8gu4pjs0bwut9fr2tugguolqx569whsz3nxq0tmnl9j8wf08z1dcj51wwr342ekj70',
                flowReceiverParty: 'vv07eou9rklsydk04b1cm3mec84lneafagaglvckgkugft3x41xwut6i3s7df087ew1ifonvrnl8zory2oeze61er8bqzs8t2b9jf3f4wk6wuz64trbhhyz66c6z1xt4zh247mmia4ha6st4mia76cflyv439fe8',
                flowComponent: 'fxjpwzmlc0ewlskmnuqvayejq5ou843kvo0945re45de3lsi5kkpqua1pnezfjdp1vh0hh5ie4k6sv6xczr50vsjpft52f5zulagp4amhmr4yhmcr4f5dv1v7cq2mkfr1l88pkymip1tjn7sg1wo3e4oku4i7d29',
                flowReceiverComponent: 'ehefcxrw45eblja8u0trr80lzcmw6onikamxd2l77e0sl2u9xglz33sz0gl69k4t9ja5i2tu7vyajlwix1tdodsep2fyewipbe71twwjra4ilkzr24n7a83pp443jmtro2h1y4zsqgcpj3e6objlz0dibph8dkhc',
                flowInterfaceName: 'dqayl0c2piacg5djcav74utirnah29i3ef4ev5dbzami6tkabdx3rzf18lo7irn51tlkw5tip8je0aity7wjtqlzanml7jxt47ak27mzmopio26mvoz9a42a44ztbl1qlzisee5jn8tf99y9l8mkigu61zf8nvg0',
                flowInterfaceNamespace: '2iki2ejo4zdma43bvfgc9i5j4d4hqsjqan2nglv909wflceppwxu6makkpxltlkmwod6m5uszjsy0uw0yo2hq34guq78tfiaiyhjqirm75oxd7smow78ms838itpcexayc9jfdhj53bogileul3g1gplhpvy0mmj',
                status: 'SUCCESS',
                refMessageId: 'v6e544whg0fx9iucppx1pztx3s2wikvpi1wv1ghq8qh7bhsx3wzvn0hiarjhc7ndolt9d9h1o7g04b1s99c0mipyticqwzwl4nz63vvq837puc3zelbqepx3v5u4flcx14vb2tlwfqr04fh59ql1arom80qoqg0l',
                detail: 'Sunt debitis dolorem iusto laborum eum voluptas quos reprehenderit. Numquam eius esse temporibus culpa maxime illum enim quia. Sequi dolor dolorem consequatur hic dolores iusto eligendi consequatur sed. Voluptas asperiores aliquid nemo cumque sint qui.',
                example: 'eybyckk9z7pqu9goram9wz51q59wgsqr25ler7b4o74monzo4vndm1muvblprocd1qtr31v4b1nfzixqb6eel264v3vompueqp7qfwfyve0qjevtjrqpy7h66u8lygjv1ywmzqu6c4svb5wsvvgky58x3v1aco9f',
                startTimeAt: '2020-11-03 21:53:40',
                direction: 'OUTBOUND',
                errorCategory: 'kqhz4uqmlx0i2rrpg1noe5rltn5uaw0zu8k1mac6rhfwu762ct4toh3scmw22ya5ww3x5n2ma2fw1at9g1mnfz3muvikzccv7o21c6reku958bvlmdi2ymdohndppdm61g3yzylgaetfj1qiqyxmzqkuqnzdtpjt',
                errorCode: 'o2ikz6ay7dngldsc6gwylvjtdi3r20po1p908twxpqrkadulll',
                errorLabel: 938103,
                node: 7396100454,
                protocol: '8vtpsgl6llakqvdb1z62',
                qualityOfService: '7gqh1ec67c8wznxwg6ez',
                receiverParty: 'd46ft3op925orit4trwi2liw49uv7sut17va7sz99pimirsg5litmswy860fng8ddbwsjmzeaj1ejydsqal1y5o9lhew0r2s3yit31s31bins3dqkf6qqhnrwis0ssblkjjbyjzjlofuw1q2xnb9x9icw9huzbkb',
                receiverComponent: '3oa06jqgau73cuc26jixmfkikdjfo4yyfhp6w05kvb0qdgjy9cbtwhh89cwr73onpmc4p3xe4iohew64o6e6usujzb6oc2p3nkr2jcia54ozppqjw8c33ru3j2p0t6wdbmtlmgzihydqs8smx1iaig1hrdk0hsr4',
                receiverInterface: 'd8gouq5j4e8lezo19io3tva9cr2q15li9tro5tr7252lniuf5dmgn9xbt6q86ro921uxo7l9wea4up46r9jqsxp5zodghpwu09yo0na7hr5hh23ibl6u05ejj857ipucz6b9qaol6eej585livs6scdfrocwo7jt',
                receiverInterfaceNamespace: 'pbr6ihezgw1ltm5zzjeb43yzp1swwz985xbw734vovqzrgcsyft0sus2rrnyhep4dnwd6e0akmhjg18n6272t06bvqq7nwzhlijrp29yj8mfeaj8yve2ofwhh9uboh4hktlb9fwnx00q2kqbusqdkd9b0beoeayn',
                retries: 8605616645,
                size: 9624931261,
                timesFailed: 7779151244,
                numberMax: 3961447767,
                numberDays: 5017137898,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '3g2yh3ozt4u8a2mxc7z6581n3ftymdmjazjx3hjsyhgvlcdxlw',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'z0mo7tc59jzsrp79pqxo',
                scenario: '0rikxk883qz52iq1y2h8399qpzzm4vmgxkpuaijbeo4ozylonn7kkuob0jfc',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:15:15',
                executionMonitoringStartAt: '2020-11-04 03:05:29',
                executionMonitoringEndAt: '2020-11-04 09:37:31',
                flowHash: 'bc5361oj8j8gdqqgk1k78ci1zxrbdf4np2ns9qdq',
                flowParty: '0aamhxfm1csi2ev2dydrznt40h1zj07u0c6hoxb6auqk3usza3vwnkjotdx2unkkn5k79bjegis48rof327qevzgrexzmc83gphmmpym8n1niuyswzr7q2j61cy1jnthr7wm68uneyomnn4we9zmqt33kzy7k8yg',
                flowReceiverParty: 'mi2jrzoxkv9gcjwsxbx2j4ku1uf6y5drvug0kbbcqy72dtur1uzygs48mp62hzupanz2ljzk2czg4q5ltbugwvospat9vfgcxrrbs6ngoas3msitw8id3ppc9c6kjl9e8cum6vkn4ccgd081x3ubn0aaszl940vo',
                flowComponent: 'a89sh9hroo4kvnigmumulf2fc036ai9s9c7y97wim2vqbg4g4kt4e4bz49akxp9z01kzfws77z4bhpsfn9ay10ezgtxtmpykpa4l3goouol86tr5dhapzi32hjwr52gqskpj1jgkwjxx2q6sprivpagvsjkpg4tf',
                flowReceiverComponent: 'hm0ox5qqi2is8pq5uqjbtry7q049ihd6qd6x2n3qkrordwuh2t4q06kick65c5u7646u525nj9j8jzghsdf91bqd9oy6gqt4wwj3sb7b75y1h0mrjynxy0mccfhhn48kvqwwyilw25antr670t1lj2f8bpnd4tm7',
                flowInterfaceName: 'uuukkef3rp9zs3llc69d083r7h29hcf7xf8ujw31n4hkbkkd9wbwadt17utctasjtymmk5o6pgk5xco2bhjzveyhgqk66caga8pqhv6e8pdfd27dl6cbqx11395n7266k6sqfjhocbseyw4dmeqzq780i3wycna5',
                flowInterfaceNamespace: '6hp34nwu9gfe6439zagonvuoy6lvful4uhvdgic8x0rin5trb0kjy32s8x2bjublv5q6m4l97lmzxijuq6bmztcqc9ag6vjz30ik848rszat5okjlqnpl90ytlmgl4r9yznfr50ey2ldqe8ov9ru0ydnt2vc13gg',
                status: 'SUCCESS',
                refMessageId: 'as58ehats8uutapi87idbceiubq5h891h5n3ztc7xkfrkyldczcqkn4u0lg9w26d4ez4n6lmra9t3kih72hdl1eyh8l3rh3sg3broc1j4plf2uvr3v00rdm4b6tdvp58pz51je1a3va8am83y2cl3mqws4z6wknf',
                detail: 'Dolor totam quia corporis assumenda numquam repudiandae nobis. Voluptatibus saepe iste nam excepturi quas consequuntur et. Ipsum qui totam in fugiat vel ut repudiandae id. Vero quod deleniti similique sunt ea tenetur debitis et dolores.',
                example: '0vpm9xprd566igfoeuta665hd37vmvskauq8ff8fk6u2ijalvxhox64qpieiksgxm2sedsvwjdj67itk0lpmjnktg9cync6gtz0c42kc7depdoyz481qcbsafwwmn0fd9zxf0ny1qht7uo39f2nyz4holvvhzirc',
                startTimeAt: '2020-11-03 22:17:36',
                direction: 'OUTBOUND',
                errorCategory: 'uil3930vjjfpfwfas0t9ii745l1x1o466ud3joaqq0u31i2dk605p7tkz7rrlmpnvgns9uw9jvgqn8de8pew3hlb5cs9vmvhwws6nueae5n0relvbt7ljpvsczc2njlr16a5dd4j4xaslvtg53j83g8uqrgq09q8',
                errorCode: 'k24lqwvb1op54r8zhk86of3x38pm5iyddnv8vgy1opu5rvowog',
                errorLabel: 664049,
                node: 3069561254,
                protocol: '2ari7hce6stiv95863rt',
                qualityOfService: 't704b0snns7yec441d1w',
                receiverParty: 'tu4kg5gd9frdtvexe7ca34cpff144a8mgg2rzf17ojfen5m4blk4te70r2fgvsmauyldqvtmj5rtyrktsh85gdtufo2u8sw92zf3nt2sim8t9im1hh5n1n1y3hh8xin59z22z7hou65n4ymnprepqe8dl7mgt9c1',
                receiverComponent: 'un8ojamyve3uka0oaz0v3nlisbdmu29philb5i1psvd9calov0ehq9u6zs7e76drfohs7xendvosp9d21t0ibepwystt52tppbxbmxqnqyfo4kerx7jng9ql8twg2i4ktwgqjt66yyvfjwq204gdiau3eoo3mhim',
                receiverInterface: 'hjn9ex0wgcn9kay1a2g1z1dgf3c3fvl1wna9pbdhh4mz09tu1gwtz10kiiu320a596ysims6paxqcexpsdzopddhn8m9uz2zsr6m4o4hk5o570zuna4k2nx7f26ddq5byudwz7jj1nwpzgkgxur4mccvc5y3d2rr',
                receiverInterfaceNamespace: 'jpxxbs1ieaorlcxotgef30wx0igbi2612bjqr3nrmhxufefo6asqzj4tpkthn1zovvx73qjwri4p734cbcl99lmkvobbzay2qckodt9hjavjcgs7o9gzn4fy8n40342wj8wgtkww98r5eoosn6b6vcyl96txbvdz',
                retries: 3994961893,
                size: 1124832607,
                timesFailed: 4388492814,
                numberMax: 2048700265,
                numberDays: 4792427991,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '2wur0z42mi46j1rruvbitwra8kqzptdclfoz92gmzhb3ozlaxf',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'zgxk865qq6dw5sgy5l6e',
                scenario: '89c0ne6aubjitdgt0xp4xxcfuxuqnq3xpng7t3jpcqbm9baub9wgrazghf1e',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: null,
                executionExecutedAt: '2020-11-04 15:57:54',
                executionMonitoringStartAt: '2020-11-04 09:00:23',
                executionMonitoringEndAt: '2020-11-03 20:56:15',
                flowHash: 'hrfcwvyq6bd1bixsupivksokkbsox2bu88sfobk0',
                flowParty: 'dqbgmyuzzo9j4iqo12ajujkrdppfyh7fbe4yai9s2o9xefor3bkj3hnd614m65ldylrggnghekwja1haae0ur0we9lfe2m7q7340c1qq18kmuowqzkpj1fx96osxspmej007w3m7allunl2ke86aw0pew73txb53',
                flowReceiverParty: 'u1c0rgzr79who3q6ycchwri2szu2hw6b883uh58ktrwhbpe8bb5fi33iaklqi5xsa8murhzpdwqoqyszfv1hkuo3aqeg93vxw9fysfngqmc30m1hxy5zvlyn8hxfx3jregqayug7htp8pfkkqxm2lrzufz3acovd',
                flowComponent: 'hxmfas89qiwz1ij6r0q3t2qwfb5fbs1dv1cozqtbp7kjnhpy3x3wn5rfs879y4ef6r0okfnt7qhxcwml7b349b4u51p8cwnj4l0ar3q5w8scv65nabx50t16ztv2r577urcd1t0ofvpcdwt6j92rorf224fhu0os',
                flowReceiverComponent: 'yupem7yu6s34j8t86sudmf6bbok8y3npwxt2gr290565g8fkr6er6arpjl3rbm6p4g1hvynx6l84ooxo64qsx6nhzggev47jbknazzslx17nah2slmnpeeyqdt8c5jvhxuq65y0bqcoq61obkuti01ibflgnl2cv',
                flowInterfaceName: 'v1ihoz4w85ervgiiellnmace0abhjemp5564tv4jlzxc03yum3vg6ryo53cy4hlyvg0xvtundp4levcb0eo9sm7d5xdptr24ddanppsgltp2gussno58kpks0o8gxf4d8npp196702e7gniws654ovpw39skzflf',
                flowInterfaceNamespace: 'eabwe6vr2jyzpkzezj754ewk0kkaqdhtsnwtt4pc55f95n91yzmk71imzux5mu6pl3yweiyodzqaemfw4aysfkayf2ox5ohcg6ez6s3nxgkkqawk06vx5bfkndffj5kqc7gsk4166iwmhvm99jzbp4q56zgzx5ao',
                status: 'DELIVERING',
                refMessageId: 'mej1islxqxscuo683emfuvmowz6jgor2hlmh1dewm96ur7eb0j6f1nl76ih3upxssfdtx4ivitpe4wywmgm0lxwc7z7ivye3yv6ltx0ype0m1gpklncqa0pbvpvqquyu57i4rgvrhqj8gnemgc22pomk4do9ofta',
                detail: 'Dolor numquam hic ea. Tempore impedit non voluptas corrupti cupiditate cumque recusandae eos dicta. Veritatis repellendus mollitia omnis quidem.',
                example: 'uujt52lirnq5scx02sbawxbezevup2ivtt806tvp4m9z62n8peqlxptszmicjabbev6wzx5z63z9u5qw1i7bszs1d2lvincqyda4wegnphc0n7urlns93qcq1707gnvlsbpj9n6l98d4d7rjls2thf9uioe6fom6',
                startTimeAt: '2020-11-04 00:24:56',
                direction: 'OUTBOUND',
                errorCategory: 'ncnndf3z6x3k46uy548brd8pez4iqcg8dfr7sj3mbjo9mvtbekymm5ek60bgux3livfcekcj3pgopubpne1cp0aq36fwuuf8ro9gdnx11xdif5m4yiaexqz8t2wapeo504gid6nhnkhg12w0ymfiaavge307vzt1',
                errorCode: 'nqa5pu1o8rv1z6n1yfvad9hwgn43nv5zptjv0jdap44eqev4sz',
                errorLabel: 616754,
                node: 5042203816,
                protocol: '2frpv7hspnqial7ntsag',
                qualityOfService: '5z9bmw5uht9mgup9ave3',
                receiverParty: 'u4iloxjc9q3bq4ykvoj5kzzlrnwvd59v1cbj3whla3ye143efxe6x25758senv2vzjgowq1dipdu7u1uqtgeg79ikkp91cw6hbf8xkggnsk1t7d47urtdcfpz4suyu0zr5vdhtmqda2bseymnn2ntcy1zhs9xh2d',
                receiverComponent: 'h0rbd1qcr9mcmkye56aqo5jy0tg9kmrzbuwoexeecyq011uzmbxfe6q8urz3a5rje0kg1wceu6vdl722xembe4vr2nsmr1d3ymlg5axmnu6m3mtl0m7cwz9zwc6jpb3rvxfip18k3gtecz3nvhm4fubtdcr9eva3',
                receiverInterface: 'ti6bv9atsbug34uuc5zvxbsnd2xhxzfb081cglk9syb9t0s87i4aytmp3wwuihc7wohv74j6hd8roxcoq57gfdlvxanx84p180znwkndxjquc7snem0aw0ycbsyri005ixdiaxcvoms3jizve6y7yoszegllfooz',
                receiverInterfaceNamespace: 'she2et982r7urrrndjmmmabo6yn4oujb0uw7vv8re2xtpuv42gt1twthoohh7hbjhn9qrxiv5aw943vurujfi8fxoinkzac0b45qdj1sf7i0q8rn7586gvjb77mgldym7a64zsqgh62t0dw765luxfby0hy8jk4d',
                retries: 1025052773,
                size: 2999768450,
                timesFailed: 3451695135,
                numberMax: 9190312535,
                numberDays: 7508056249,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'rqaux3mzyzxez53w1opvm5egsrvlhbv5xy3cf5hkac6tcietnw',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '8n3uxyb5pccixk5quabw',
                scenario: '3brt9ard2l0jhi5srpogsk5h5szhhznf8op54c3s47828rvcorlbqay969dp',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                
                executionExecutedAt: '2020-11-04 16:44:59',
                executionMonitoringStartAt: '2020-11-04 02:48:22',
                executionMonitoringEndAt: '2020-11-04 02:45:38',
                flowHash: 'im8wn7psqnmhavzuo9wc3or1t3f43oo1ot88rfy5',
                flowParty: 'yy2kgd6axf10pcovsh5pb6lhsoxwm4j89507bx652l659vs0mjndg76pn0c0aluqgnoc5hg72e858bffgagoqv9o1rvm42fdgmaztef2wkcb8uk61vrpzx0qby7p36qwy56japhq3hgw05ys4pojm017zwsgglyv',
                flowReceiverParty: 'd80diz7itycerei795prc6dgs7ftxnkv4a2wum8lm6n9izipjpspd9utkb7r4mopnpniqdumwv97ruikbrhp4mvs2b8pqvp8osddt1oufqt6mi3tf0em1jorotba0s8jd94y9d0y2j4xd9aoodcw5sio966229fg',
                flowComponent: 'cciodxhqcqpc0x76433wn81phz1a8rzks1jkli72wu2k063sjlsbas5m83uu9jv49838rmeq71qlgl6ypd2eibtycfyhssei2vtuxej7n6ygatvkgq51xwh69gmzrwsrbjnk5yqufb4xjjb84tyodooqmcdhs0eu',
                flowReceiverComponent: 'ahhksin808320s39vr212larnpyeecnos5ztpp2dcbsdhijjpn2r24xo0wsryupuds9kh5cf0a4gxzo4aoph2h10atf1sb2gx5eiwsri084mqcwswetma82jcuuri2o51dds8jv9z2y8loakyvim4c0s0jiklrfs',
                flowInterfaceName: 'w8s010baq5tve6ztsh5yqzkf9czc4rcvalje5b52mqe0xyuvya3zy8rtnemc4bfazurj0xxpcgmejrebspdlrvify3tu4a5fxs1w2fo7sw439scl4981u67c8nxp34ojryps38xjw47zoq7u85er0dan1ov9raeg',
                flowInterfaceNamespace: '81zm2zfcicf31w38ki9o3rtnmmekkzwcc7vph7fa7hypkba4wvnm8um8qfu6b2w1oucq35nusso410xvi8za3ofydzjjh0vssvx66wem1ff0laxnrckwfid37gxt3kaejj1mh9bh5efjjxx6fjtwdnk9ocohai8i',
                status: 'HOLDING',
                refMessageId: 'af7ijil2rmc82seh9wf76urph5ppw8kythbi39ywje5i5pnrd8wolpg46kkf7ik69nzwreu0ma00c2ke4v7hnp5u1qzaz7ky2cflhi3uvaib0utdrm92qsg39f19ab7cg5l3zpa5x8g8s6v7s3v7z4qnhyrhgps7',
                detail: 'Culpa odio commodi est nam aut ut est non. Exercitationem eum impedit. Corporis et aut nesciunt nihil.',
                example: 'd3rrdc138k8roif3sevyakf29bdl6l2736sq8suxqyriov1lr6fbsz95iywgomndmxcs66x3gm598dgm9whyhak097lyybg7y2g39zhfwqr2ylp3m8ty6ziguijjaa12gw2a71nk7fjt30zs84tmmigcn2f400zx',
                startTimeAt: '2020-11-04 10:45:58',
                direction: 'OUTBOUND',
                errorCategory: 'xey7hv214omcc73jo54ldlf6n7qs49159gzi04f6yck4l67vxfr97lkrwm1d0phjme3ddg0x1ck1cy63f8e14vfrix2348j1rs0tibvnm4k7jdj4xfxe57x07aob7h3wmkux8gcdlweyykvywr8dusbpteugk5fn',
                errorCode: 'lwczpvo85az06bw4q0wv27bblm01n7d40u6k10t2drlgf5nrf2',
                errorLabel: 737193,
                node: 4688104733,
                protocol: 'mguy9vc3hwy81sds12b6',
                qualityOfService: 'sb8gla3zm33jcto6p1u8',
                receiverParty: 'twnjb8vytot04m5aqn66jh6y01ggkw7kzx3bjep71php9ktt9nqh4q52l2n3neksslsvvlgea6kij5idyewuy8hypacbg8izvb8sf3ovob4m5d1b7a8tbl5q4bx2wu5nob13e782ipmyuutp5mr8sr8rczjy58bt',
                receiverComponent: 'wwphxk4k6la3kugual2xaaauizvohqdbbuq7vmm8mr98her8wc6qmwpsi57otocsd5yjdrvlx8eztgyv6efs7rx07iekovbnh6wzdbv842ygilzoxbbc18glrwsp8bqo6xlbwm56kdp2iwp8724iz5qfzapegh43',
                receiverInterface: 'c480ewjqxf06bnfvdmu14c35n8ofo3o3mc90ash7r2c64eb36mcpvxrncz1loqyvoud5irke3pyjmwsvl6b5pia6muppt1ovqn4kv40pr8m3qidbunatpns32g10jagtfgz4khbql2rphh5p9nk3pbxryxruu2zf',
                receiverInterfaceNamespace: '5b6elxjcsq12mv6ujvpy2zqz8xfjdw67if0wrb633rehatytunk4mau1m3dfn2i7hw4dke5i9hd8ye20o9mzmy30sz9d6xilewtqcae0jezrh2zg3clbt9jkg1ws1s7f6fq6h4ky7apl1p1qjr7nk8f49esrozue',
                retries: 8993272804,
                size: 6637739603,
                timesFailed: 3758706745,
                numberMax: 6445438397,
                numberDays: 5141933282,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'k3sh4b59z3o4saacp8gcozz6164t7itvjqoiwjskyxk4xqvvll',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'ch5xxds3l505h76mbmxx',
                scenario: 'ml58rn21qwcadzpt50uxepqx0q3tichsnmlolc8r48t628px0aao1zy565yz',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 05:35:28',
                executionMonitoringEndAt: '2020-11-04 09:17:21',
                flowHash: 'yu9u8j3kstucj25u6x6hvf09zmcioqu3c83sm6w0',
                flowParty: '5avmtsm51v96h4omcd07qjdrsb9g8qy9a8fwk58z83scvb0npqwqwm8bdnidz70ivkiic9po7kuyw60mfpwc4kexc2shbog0hq2pvcl8horwixqbi0kz0mhjk3fm764679tciqgiq3vld3iwwwxnqzqwp836oyj0',
                flowReceiverParty: 'agralezk1mhdbudw5c75asv1oyea4ln5lwlnr2foh0tnx3p4fr3el0uzdvlsccbw20si1f406lz3ug3okauohnjwxfr7xuj3eznis33c7pw5lil4fh8kny6hqb9k49v6sh471hi9n8n7kyjjhuuy6t3enwjb62we',
                flowComponent: 'l5wtd48wvyiyi6hx7bpnstfsozov035w145ckjtf5fp8mgk8bcfngh9eixmx5puxszm32vxhe2ggzgql9dttidials87k4mx209756r0rxufom1v37p470xi3fgvj5qx5uo72242iqesls42w1u7wtilm7jgsyqi',
                flowReceiverComponent: '0dw5t6di0231noiwnrq816rtwlnt7h7dmlt5vxdu6ezohnxilxytolivvp9yqrsjql3p1mh4m959blwwjaan04276okzs7d1oxg93380cwf0p5nfwaiww2g7t8kb0ojfp8nuy0g01l5uc8h1zdw8fidqbfpafd9o',
                flowInterfaceName: 'mju3bdmhx07w0n709lz1gyish4ddgqku12t3mhmpec9wubz8wmilimlsgrajlu2qvhp0g6kcvnm6jifxtrbre9cjzlj0lvbfqalq1nbow8mhedfg07isw3u5zfjn6mpnh6xx03z7jd9vjx5cme42jsubfsb1eb2r',
                flowInterfaceNamespace: 'py2n71cgatlimby4f3avg96hovaeesr4uvmpl7zmzmhbpviwlqtxtvg016ajngvf0rwh580ivqgd8wt6b52siym5m44451hyo1r0alds9iru8kqqzm2znskkpj3t8euea0im10dm6m93k7jhkxja9y7arxummoft',
                status: 'WAITING',
                refMessageId: '2zy75p1qcoz1afse44ma22br9wf0uhenrq4hvnkqwu6pl06aruc0pfrx31gawqpnrog4imltvidfrnl9xzm5q3wrvhmznhgw994k8cjjp11johl8ul3sl923hhdrssyijtoj4aclbvfxjpgleoccev52b4tv65ys',
                detail: 'Rerum distinctio iusto magnam inventore et id. Provident distinctio qui necessitatibus. Deserunt cum nostrum sequi qui. Sequi qui qui animi mollitia quia. Est molestiae soluta ea adipisci dolores consectetur. Accusantium voluptatem et minus harum qui cum sunt.',
                example: '0e2mxhihyc5689garan3sz96xvqk43zy8zyhu25y6a5a6lv7vuzip04rpo5n6i7dljkhn40f92vted6g8hi58916mlixeh8fe4s6h08rvq1810y9ejbnrempewd90pscqakewbixnt8n9vhi905e6rfy1nlg2lz7',
                startTimeAt: '2020-11-03 22:01:03',
                direction: 'INBOUND',
                errorCategory: '9hskn19yinit44t0n0fr27yj3owikgblmi8ikvbg9onx12pjlxp3xwq9ehwol35rpuinsdezefaf5hx29odeltr2thsvgpth1my95v55jc53t7ftnqnbzgd58p4zcc3esqp1v4187m63ypbelf7ixuc2mx0atght',
                errorCode: 'pun48czbp9eb0eb04r655tchu4esww408k7j4swekz842g5kj8',
                errorLabel: 913251,
                node: 9556580115,
                protocol: '5i59fw50wduys91e1qac',
                qualityOfService: 'juoxexfumohnn4ynntvo',
                receiverParty: 'sb6xdswbkehgk276ettplillvxfam8197w7eb9ome99mkkifgefep7wu70mwcd11z2dini0d50hxwpurk4ibqqspn50uzxic1dmzgjgsykjxfqc4vtop7w553uincs56wcokx9viss6lmn3ctolq86is7sl5qado',
                receiverComponent: 'eqv35khbc9a7zd8zc09xrbghvy5stdniu44lxtfzgrk6l8l0o905ruqp1kdg7nhesyi6c8ur7lm5im9sgvyfnygxes5i4ru6exm3hmbt85i5bjkmu5g3wt1pzgz19ut2tvntutw6808gtv7mqy3xv61h9eomxhmk',
                receiverInterface: '68qebtpt49bhc71soq7kvkevjaevd28fjextit7ubxg3nm4i3efcatjlvaxy5ocagi7r1jv50alfhyu2fw17tmkhkta2pfo28zrt9r6dz0n1nj4ds8kffhyypg41y7v9nxlzy4kzrr5p2x79p1a1gi0c0boul97r',
                receiverInterfaceNamespace: '8f5zrqlvvypgbpw8292dfpjw6f2k4k5sz83fgmaddy80jpsju8u0yj86xl2m01h16v1bmoyodub21pub1ltcmcpogd21bggcp3cesl2z1waw05yvce77fxpev5ynlhr52a4wug9bsbqehbr8gmh10k9d2pf5bgtc',
                retries: 7259103875,
                size: 3456070919,
                timesFailed: 1202798546,
                numberMax: 9861482931,
                numberDays: 5091618177,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'fhpus9rtohrdc7pb4urmxl5fjkx1vgddk4pr8jnr0bmlwd60pb',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'zni7kckrcgvmwtg74511',
                scenario: 'aajuuz2foozavk4p4z7tr5jogavqadaclco26ea6o1aer7zx159febvizjgd',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 10:25:11',
                executionMonitoringEndAt: '2020-11-04 09:06:11',
                flowHash: 'bjxk8vfowbt0u91nu9vzctb6htc5pkwqvojb8h4a',
                flowParty: 'ue691okp71i9hw1jej5ipvtkqu5m9kzj5yabk59e9v83hsd3eptzfl8is1ev5059escux7rwer4r9c7zg1nyljac5e1g5pix7fpzmxwgodu7my8mczn7am70pqxea2vyyhc77bnof7bwfaymx9q53qek9775968m',
                flowReceiverParty: '08x3edxzcn7jdprtkvemgx616o8bprb88janqkd1j9ui05mvyuhuuoone4wxtrz36vi6ekwkjtacnumltz9cgnrvxtz9vh2o838r14u8nke8ao04z8actc0v95rpy8mlpmy1qcpswoftkim45hxuaxh2zq6z6fqo',
                flowComponent: 'jtnrysxheewl1wd2sg10688r84cj620uipjr7qg0frsbmroqro8t54gesy7q5ua5ncg8dhsd8514jb84eqk1fn00sga7jfo96ipsvz1o3e0sj9sbbc8eni2y7nl8pdt8sx50kds6azwpoyqzxhwh2tuxl34jv9yl',
                flowReceiverComponent: 'vl24zfhidt1rihz3epqvne9skoq4y3yg0os8y4nrhu12raifwtbc1wu8293138hg5sm7zr2txsnumchhnsv68tlepqgc37rem0wtu9p5rk8at64gdj3641bh2eaqk3ecuy6tsb5g3dl16d516v4smk1okxv674sf',
                flowInterfaceName: '2gx4hw41cfhc8nz8gfaosn25e6882ykqcr0mc6bt0a15obgzoxsiw80rpompq18n5op6ujpnn1u87n1sd6ysppuszi4qxfa9qao2fyugw9gf4mq3uk46350gb7sbkf0skn53bm7uyxx0i6fgnh2jmwhr5hxu0qc0',
                flowInterfaceNamespace: 'ja4712vbtgq7pquoq6nlr8831lgqg0fxy7egvk21bzcny8vvbxulok6m3o8fueei7hmr83lh969jxqluryyppfdcewylnso0xmie9lghrci86vhjyfgayn8r7x76myphmhs8i2qwuxt8kl4y65ea63l8wduzun3z',
                status: 'ERROR',
                refMessageId: '6hbqnqodip87vsuvc48uytfkpunlc28nah0u276cgt5kyrhcl7wv63uubwkk4rahyfpsqwy9fzz1f0myyzjdw45wgf8cecumi1fc0unk5uum7pprqmz764ajqmgpxd0iim473p9atkceo1uqupdojf0xn265s8fn',
                detail: 'Numquam corrupti inventore asperiores expedita molestiae delectus reprehenderit itaque. Et id illo fuga ut voluptatem. Iusto neque qui ipsum est in quibusdam deserunt velit. Non quasi voluptas et tenetur ipsam.',
                example: 'mfw3v3k9fveigaam7l6v2lgoechsoqiiowbaguxdjiy4douw2eww8dtzd81se4ryadby137vc7a4ua4tlv95arhc862oymslj0mx8ix50t3k985ee6l43j746qy2mvfd0raud1yrspo9p7zobyd5k0dui7xi1xt8',
                startTimeAt: '2020-11-04 07:16:07',
                direction: 'OUTBOUND',
                errorCategory: 'bkffkydhti1lhzrr2avgpyww3y2v8ldcccrq4tloon9o079a6m99xcrvgt8kq2wfwe8rmyje8qms1fsi7g9w0obmvu2hgj3n0v1pe8t7jpf0ma4toq1l8j27jutmxor84huj3j8m95xiwuflisq7xa2331t246k5',
                errorCode: 'wohacpywmfyiljit1em06va42l18abkj27w3iehlmmmvradva6',
                errorLabel: 936417,
                node: 1085377114,
                protocol: 'eovqdtzxkd261nv28eev',
                qualityOfService: 'ktptv2f99gkaw0j3fstq',
                receiverParty: 'fpkq4ivagzybrdczcgem4v45pg0mxtvv3hu0mac58o3f7uclywnrdylmxcogy9pcgocehmpfawb3b2yg8qah5fnud35ij42lofsiwo9kcw6hn614ro8371fkj3q5s5xhq7aq8nnzkt45fh3y5d8blm2o9jn2qfwt',
                receiverComponent: '2acujjmvhgx8zghaz9k50sylufq0zfzks2wufpnwluonnvr63betj4i4b6ioj6th45mlop6j30klrkm62s22t1s8md9i9ptzix12b5q74hoiv1qgf8y4mspjzavihuf096ec3mwmzuh10qdbbn6kww971ar1uyep',
                receiverInterface: 'e66mwsr669ju9y2o3cx3zd61n5lj3vma7i575e9qxn6bjkbrxzdf4gwq31dk26j5giyki5kv5mf0zakidwk3c407oubgxrd0gweacgjp3bwts1kdf74l9nt4xlp81ukzmfucfjwa65kt3kqif5nv0kyejzxy5vh3',
                receiverInterfaceNamespace: '932tf317095i87hrd7dxaxp0rvmrw2hoorawakhi0jm46tdqq91z3uc31uoar2ni5qn5tkal9plib0t0plct7mjpyztsg7xtftbvt8lfb0hxqcj3rsu4fo8tvbqrcgk7h9kmdnlvyaj1hsn9rglsihp0csu4r5ux',
                retries: 4152116704,
                size: 3450493105,
                timesFailed: 8514338146,
                numberMax: 3210103410,
                numberDays: 8072001481,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '7bl088mcpmqnhhsd8jcerj3xg284y6rhrx5dcoltcjwet06ute',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'b1cvh43yj3fllk9jdsyx',
                scenario: 'k63gavwm9i2ertnwdw7rdyx9kffq70yjevftgxxcoxy016ws7ampnrep1xep',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:28:50',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 12:43:50',
                flowHash: '6ctosclhk0jtb9y0v15eoxfdd2npptouhwcowt7t',
                flowParty: 'jj8e4q17lsr79o1q7pz66ftf2nkonoyr22458ms26sxnftv7t43x3q27vww4r9njya7zfc5fimzfs31jvf9pxhkx4a30wa080rd9blpo9oboo48spgyk9wajv1nn0681eytji150ec38b77ldyr0jnodlrh33j6d',
                flowReceiverParty: '3tsb94bgzh640p0r6xsf676f06sn80zwkkzp52hzca0fouyfzi2w4xux8h5e8sd2w2dwbg63a90f8jzhkppzokszjq9g22lvdoacn2kfl5ujjoygsiikfzvek3syr7s4j0bfs9l8gpsldkzz6zltrdlnw5ziddnd',
                flowComponent: 'xwafw28fh5w1f8nfk3jwjxy75w8toq09oqrr71sjtcjdqhv3yv3bmwo6q8hv8s0u110dik6qebxwi8m1hjagrclyind22wgfm8bezqdcqpoc8xvnitsad4p5e4sifhgafny2wkb5cwqjaq72hr1gf5bnfeobipfz',
                flowReceiverComponent: 'x2bibatbcy2f20j0rmhwzl9krqblc6w8shlfi90x2ntdk61na6kd2hzttdku74xs47b4fe3ztdaa18gks0523o0jkcmzace96jgorpdub4ivchfvs9ky1h760nos2hisq4m5yecpnoysb4cfta1ponp63h1p6g6p',
                flowInterfaceName: 'dbcuqcvs13pgv4k7rpk4hna0zn5snf14vix2krlf47um78r3m1dyhchim9swzifi8kgpwkp02nnfpxwle2r4sfclxksttmus1ilon2zohxd6xe1ed1w4yqney6f209g7n7spc8sbt8qk6kb9p24osm9lootdhkxi',
                flowInterfaceNamespace: 'dmyhhqja7qwbn2kj16vpwh06uks4at3k5ua011kpgsdnv5qkarqv0id6clemqsx9d2o0w1r7k15aendpd8o96vigoz7lcskmjrgx43oi5j22cqc386msv84g6ytml0t5ebk4gut1ch5iyjhaz9mgbysks784x4v7',
                status: 'HOLDING',
                refMessageId: 'sodgr0pi1n06y2q17duz6snr7d35y90jwg5b7nz5k3l968a2lx2n3bbmyt8kj00zbsljqmoafhqabqu4zxb9wsn7uikl8clx4kxopv234nbin8f1isid13d0wzcm4gxggco2ws3ljdgq424zb4w3lwu3urhgkw1n',
                detail: 'Reiciendis cupiditate qui. Cupiditate cupiditate dignissimos natus. Enim vitae animi. Occaecati commodi quis facilis qui cumque repellendus. Odio quam iusto perspiciatis mollitia provident aut. Odio omnis accusamus eos possimus nihil doloremque sint nulla rerum.',
                example: '3123afx28hmkemlhut1n3qfw6ahxcuu4axub3be48j36hethjoiumor7r3npceltvazyh1wo6a6xhxzrgc61t4aa1jcqflu380zagyzpmog7ywl4sruct5czsyudpzkjzzhbiosu46y72lp7pol2y0mvoxsz0ikq',
                startTimeAt: '2020-11-04 19:12:13',
                direction: 'INBOUND',
                errorCategory: 'fctuaouf07aarn024bp9edyd0uw780rd723emqomff7peh40bcgonn7gik8sqn728ejmom5g6emsqfyyr04sjqeh4mpcsnm4hpnbsjm5bjh0nrpgo9193rb8unml1vel8z469hu07pzgrf5ok8ryqdii1m43gyyy',
                errorCode: 'nrzwma10ic9zyxys6hwouoi64u6du1khgahjlx88kd9sgfc2c5',
                errorLabel: 339934,
                node: 1959629357,
                protocol: 'tj6vt9z87u4geewtf08j',
                qualityOfService: '0bq0snm2mcrrm2momsz2',
                receiverParty: 'wrnli6gdehvdw54mzujibb1eblldgr2n40dad7h5qg6haoy1ldo9sh7aaxpddxemfpfou32onvekjuf9hbczm3ccwko81daiqpaoriqkxqqatkk5huzcy4jlt9tifzqnnys3bsq2kyzqjtk1y72q2mca7gsoqhjr',
                receiverComponent: 'ur91rpgltxd42i8cq05uhei514g3xs8vwpr47xb5tpr0khsfdggzy31xewblh7uqsrwrqve5wx54tw2uo5scug9lxs4wytkdq6kmboqghgerpmy5yknbfvyo21qgbnih1zt01a3vkpxurdhydi5gnzlmjf1nay9z',
                receiverInterface: 'z35wwbgqbg0y2xnmdx77chcij62ftndfxvnlhxs53uyfoyxhudwiopuxhwe9mf1m8kttk5sbhjvd4ozyvoeyop12ts3281yo6wcebatisc18jg7kvkw0eegy9bi2obvhy9yx7hjnirdlticqifl4r27ofypwdls2',
                receiverInterfaceNamespace: '08ua7kpycsrtyxmrjh6groziswgqe78tivzd8k3mq4jo4b85f119q30ag3mnci69gq2gefedi83sr59wqvo7d1yv8glc0xkxh6k4gzlx0kiyh50zkdvrj7omxvhccpzgamm3pv3xyx0814092dmwuan3ki3pny1a',
                retries: 2234561249,
                size: 6578078135,
                timesFailed: 1122805202,
                numberMax: 7800485999,
                numberDays: 1706839147,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'nvg9wj8iy6595ze2esw4c9hia9z60royi3e27npseukc0hngp5',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '3p2bg69wex2san4w5h4n',
                scenario: 'zzyrptxriyn38rpqva6eeg2vgok2n0c7m0y5xi2f8lyzn13ufrk4szjxqytn',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:50:11',
                
                executionMonitoringEndAt: '2020-11-04 04:03:59',
                flowHash: 'orzc65z2xoakub9txva0p0tmpk60w93q115ceg2v',
                flowParty: 'g08jdqgds2ioc1w1j0toyx3s5m0x8v0e0yl8idbjl926e7lcpmoafleb5o7v9grik97t9z1ms70it5y516tc02ve3cqatqa6filpxy31js5tz38uh7ce72jqfprk10tvkjyan05ol16lwoor4e6tma3e4xjljcmh',
                flowReceiverParty: 'hx1xu5zf2d5lyuvg420s0wws5jw1u8aaeo1a82chz3vj5l5gymh3ix8ejl28wc9mqco0gafs8o8q9m5yylrlw9iaw20nd0e14bty388y3calsgp4ng5wornsjk73pi267nmiq26fdc11ki6vbuiyfn5onx5fh9x4',
                flowComponent: 'dp6xyec5dsg526nna6q1xnre78osuh871j89cr7byp465s0qpenap4ynvlu47jdta3hn9hsv24r5c7kfizkyvq46x5qe9trgv78y0190pmnv5uhlszmt1m6yqgl2tizjlw4coy477b5sjvx1oxan1yc0c6wa28zm',
                flowReceiverComponent: 'c4s9mhuy5gbaofg5msjtbe88w2j5me3eo79jgyoxl6qofmaipityiide4grk5tb7f6pce6z2al7p2q62dgyb223qmm23fw4p81i2bx2ye5k1swcmzlb2qy041bay6ozdi0ym8gjfb5gzzzvabazkr5ict2w4sspk',
                flowInterfaceName: '6vhdh7dtv7dz8n5f4hc4lnsuspnwuh7xyz630pq7yvvvnrjordkvzf5wa1r7n8rbkg65789qp225vhqatdglppd7hhrp5wlcu2m2i390ej8xlvazka7uvj76b49uohjbkdzho3j81nt5xaoxuwl5entkjj7wk7vu',
                flowInterfaceNamespace: '0tcoingj9nwf1041kts1oh42tiwpn4hdxmfej9yfzguyvrvwuv1uh4eqrx5lic9usoirs9fupbxcbjmknalh6w1716w4f31ryi97q0ebv3xdqdmthnc5xdipxz6pyyqhox018nrz1rh4sn9our99uyzemkw64f4h',
                status: 'HOLDING',
                refMessageId: '5wk13u6shmpvfcou1ubbhcbigktdxfg0izpd0k0wmkyexy0943e3ykyuy3utweghl7d5m7bgkbijh80gwbse4qmomchecrop40ei0i779aow3al50zadr7xejvddynqc2amt51agjpsr0h77z9cw65m8cm28ftdo',
                detail: 'Impedit deserunt aliquam doloribus dolor dolorem voluptatibus amet. Nobis doloribus natus voluptas praesentium eum necessitatibus voluptatem natus maiores. Esse doloribus atque et modi quos.',
                example: '9ffqy8aahutqc1wqhugfejd94ybmf3ymfjoqhzlnikhlvs4xpgp17iyginl9ns2am0zolnk8ci95df33hbyvvfgt7kdef5mdg9a95cvby0glu1shnlelajbeftm1sa49ahylg3oqxh0lz69oi8pmw0xf6ilyejpi',
                startTimeAt: '2020-11-04 01:00:22',
                direction: 'OUTBOUND',
                errorCategory: 'pk3u9e701tevrl7grjxdciyjcviwuhll37fm8o3ud739l6doj0de4z5crmtl5bcy8zfkxyqfaoqicyxcs3x18qbencqjke1cmc1fo9e67mrl9e2voq5bwpa02htgg6tz7hriihgx5ccpd9t2q2joq9tqiq7172l2',
                errorCode: 'uje3g9snmj1bwmxb3r955ydhprggsgs459l0lgqqtmy7egdswk',
                errorLabel: 114011,
                node: 9447906988,
                protocol: 'fc5lgfj1c51fitvh8vy5',
                qualityOfService: 'sg5w7p6073i8izar2vq2',
                receiverParty: 'xg63sxpl5bnd6spv3tiuryv6jnfdyzsipmvwee5z5b5e0anvwfjobrx6129s3y215m412q6tbw7rn77e06wkad3kipbg5dd7tctk7xf3j7vh9tc1hrrp0klorjth5lrvnneiaebt1lmmvgu1crdk11hqgrsqp8a6',
                receiverComponent: 's58i5rbkd7fxur1klx7wlqel1vyx9863kq6fccpiltphbl200sayskz2lnrkbkagt4j7ug5awzapdg4zpz7kmr82ftydtjsrwzc1hwz1smqvj2xffj3yndxecw190nqkxaaz8rzuq6sbggta7184j9ds9vw7zj5h',
                receiverInterface: 'n95w992y73noq47jz92ulz5xpmkw34lua1ta01z5tuggbp7uehdkuu6d9sxxela67utren0yfncgxv0b8pryi8vlnh0t1pvb7y6wwa34rmdhfkjnsx26bxaqaa3ocw3pk7tgzn619lg6edewimtf2qrrvnhs1wl0',
                receiverInterfaceNamespace: 'e0p41bw309rvbdp9b487n3ossv014lp3hd1qs9kjx5dyb80wq2w5s2y3ewmmow2q12q90wchkrin0rfyu88ezmeoeplrhyzpsvrxvk87dbgmsq8ikn592v2dfwo948f3cy9i6kcl5faovzqpd5l64a3v5bo7f3sh',
                retries: 7293314489,
                size: 2406647416,
                timesFailed: 1078476713,
                numberMax: 9317511675,
                numberDays: 8016094619,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'dd75r3d6zlk83n15gu0p1yvoah59orbq4d762ympn4ufcxersd',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '3osm9j8f27ep8l07rupu',
                scenario: '4ptoj3khfbh37w6p83q0p67nv7dbzwyh367b7kao3vafw94sk8tzsv042dh1',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:59:09',
                executionMonitoringStartAt: '2020-11-04 14:24:52',
                executionMonitoringEndAt: null,
                flowHash: 'ae11r7ioh5bpcvx0n9gm6brw36blu0ky24i3g2s7',
                flowParty: 'h9zzp9ghoh50ena8njxldmcb9lya6kn9bwwcfgn4pmp9e9k0nwcxxp694m1e1o619oali3lyqosneyb1np8srslrdsssojzpdsa6nud997st8llfa7b59kkhe6s1uwpkfzk9gbx173669yxf11608bb9ih5cr72l',
                flowReceiverParty: 'v4d35uhtp4ifrq8jv4nz15mj93p6ygl9ovaraw9q5xdffprax692oy28j96pwr7bmf2zbkz4jo3qyqkquax16hvubpogcn5nu2mp7e3tev5ycc1sbz2h1ba9tyo6ol0fvx17z0tyxksvpawq342c5eyi3fil5l1n',
                flowComponent: 'jal1ctm7kr5sboubn9dpjan82fuujemxty2ho1sbs01mzfoefvqke0uu251w11nhdrrfem2a1ic064eg3834599pg552knnva0ot2fgkfzaypgm62lzcw3c2n6av5dpyent1whurznskmigmdpyr96jo8s2tt7d1',
                flowReceiverComponent: 'co0u78zt473pyxynvukrlmwhj66brtsewb3o7fda6p1x8x4ng4b26ar5e3qnv0ty30sn5fu498nybylmeidz4uwj9xfuqb03vtkle34rtopxubt22en84g2trln2fj4kpqsh1eesfyasiu4as3f2jicicwnclh0s',
                flowInterfaceName: 'cu3oj93q7iretq8x2to6e3svggi8xdwi2hedp8quq40sytoh1awqa52fjdptxdegteoq1hijyoe9hgvjyvaggyf5t4s1p925muoudf4ucsk2y56xbwgdovzhb996ejlcp8yenjeawy2jys28pwrthl0h5ckvr2ow',
                flowInterfaceNamespace: 'qwtfilxkfjyxb4qc58u4io6tr8c7p3j25vxwuu4iwk9k6la6rgs9ze301tiaat9mb17bf2z63wyi8ij1bvoy4f3haa26qaeudqulg81u6lb8yfwqtpb7yrssfoeyizpepemnrj9gps3w9bdutpnm0cepagf4gse0',
                status: 'SUCCESS',
                refMessageId: 'oi9ptromw4c19lz8uz0by78tcg9w3xr82newyoolmo9p4ireou8vta5gwg3pbbghchl0wom687zji6jumzdy3zkxd1qe4qxq6xpzgdxj0iiw02khh75dttbr4xzjzdmkm9wkzxeq48qiqjm7dbe552xz39anztzr',
                detail: 'Nulla dignissimos reprehenderit fugiat. Vitae fugit sit perspiciatis architecto numquam. Et explicabo esse aut iusto sit. Neque velit ea fuga ducimus fuga odit ducimus. Qui et aspernatur.',
                example: '98f9huxqh90nxcoh57e3y0o18lambowr634m43nltkf1kkplunnjxx0fvr5jynr2xm6jki4g6bzwg23ov6ax5gwl5fvxk9etsqluu9f8zy8bwedpzzfj1rt6koaees5yzhovyhc94rp9wmi1x4r4u9mitwwx5nj5',
                startTimeAt: '2020-11-04 08:51:58',
                direction: 'OUTBOUND',
                errorCategory: '20wzgbedr8qdskwmfphru8oe59q5wsha75ah5z2ex5h4zcy29y956zsxurwng8uhlis8ozp32fbucw7ggvmjeh7l7iy8k25t1zi4ogelwitwth0vm2i8p09wrapj9hj3457su5jm6yk4f8z0hnvu27postpc559j',
                errorCode: 'a4557x05dv1dpkiqvqpqzh2fujitp1nsn9ai2qwgub0mh15y7w',
                errorLabel: 501787,
                node: 4657338856,
                protocol: 'vb7j2zzgx6lyge0oc3la',
                qualityOfService: 'vlbpibvmmy7zbtwrcw90',
                receiverParty: 'q6n7y41wughn8vx7439xtkyo186k13yb7eqt6hm2bdyahb9pqgd2zslf8xnmvdgozdwc3xra85cr4y2hqyrsyjtycg39vunmf7xvkv2n767glef2x3kamc00mo0olsh40yvvgd4yc00dc3xijmsu62hogp9qjdv5',
                receiverComponent: 'gzl3o61c0njfoezcwfdw7zd70okn3j6xqbd5qcvzxkci4uma9rqjw83qea2fa0subrpzjhawfccfonge5ym03opck4zfkqqxnv1qsr7adyr5zcbwzb8vya7js9wvj4v4adv4y5humfq2amhufve3tyklm2i8p8io',
                receiverInterface: 'wy0zzfhdm6sxm04z6qktcx8zn8fkpwzq0kz2b0w43pcgfp4z6r37qneyf11p4hsuj67z01n9n4epdorzx840b7f5u5gnos4j7e91b5a455sryz93ad34v24mz8fsdqxgsnmwz4prnrlgdqes10dfkf36956lyxzv',
                receiverInterfaceNamespace: 'dcvqkk6vvc9d4d4tlf0idhj3zxlkupos9l1e7wkbsr4q2jnkyfzjdc4zdqef39t2zilq89ystpeyzyy4d51etjnogtjvn98unfs7qh8sl9j6x1nbmyz0keud1novroxeoafhkfntybfnm4loe9vxkv95l3hdh19l',
                retries: 8660975560,
                size: 1106395398,
                timesFailed: 1951579906,
                numberMax: 9206748424,
                numberDays: 2852605818,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'hu4qzkrisxzcety30noon4btd4pclyecl4s5uhi8g8rgivwop9',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '5nhouz45nvi8xiveifsu',
                scenario: 'pq39cabdpmle032kvhpj7098rmqzbtmwkhhz7e67uleh8dgpu1464jhcmmms',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:00:42',
                executionMonitoringStartAt: '2020-11-04 01:41:29',
                
                flowHash: '25o89vmqnk4xgjzj6pd7bsujzu34hu8h8kx33r77',
                flowParty: 'alfihtk0m19nvmm08tl6ubacs97i4a90gbccmgfw4pc9xrlkz21pd54z766qvzwp9ep1wlx1kq5ufjpagak0v0n57hvxmok9mgrntz1ff961e3d92d61cubvm3bjhu5msn534qmebc01lvuy2me4gje2ivtdy7oi',
                flowReceiverParty: '73t3mgvv5uwl2rxgxwtxcwpqg638lv7hsq976ewgru9b4nlu6d79o4vp1qo0yx02pqr8sqzlspiam316k9vy5ciwin1e19m0tiiy20l7ayyafcusywuo34jw9trtvd90xisoxjy4xhups7awrhs4ycohb5ilu29h',
                flowComponent: 's4k1norzufy2q48sai58gy2hd62gypm7whzzprmjex5y1n0azrn7418ph9bm7ejri9u9lddzwkjsrgpse20oyvj79rs1don77zvnp1n39bbv4gtxn0cjyul5hgw1mtzuesnzslhv9d05kircrbk2006wi3rqcu2z',
                flowReceiverComponent: 'dtcjeq069e5pngjm4wkkmo7n36ksj114pwddigm8fhex7kgjjtnsha74m21vand0owqmdbxvmgnc112p6r8106nciqlj1r5ofr9ciehdtqdiedei0u76vn107m5y3i131lrii9yv5h49wma8r9hjj35ui8w1bx4n',
                flowInterfaceName: 'goupm9gbgsyyinch2tk7j7lyf01tsrhh3qcz7enhusrg2m2ijz337dwqq9ay4jn6rx43f8dylcpoekmv2bsrlvmhsb6y4pgoxmgbho8uob5btdk9wvirxyqbt4ze8z1fbust4ieb5417fbmgsr2eihskjvhjukhf',
                flowInterfaceNamespace: 'ueogk1f3cz8ikzkyrevd9w709bs5vjwk3qwajhovk3bye6k8axq9ohmqiu2jezpnc20sait50zncbfh8qxn63pnxd9wueji69la1o2opl4b93dedkxawjqakxlqc4nuwj9vq7k6s9s1g9hyamvh546rfsvydxd44',
                status: 'SUCCESS',
                refMessageId: '6p66ohy0y46spvdxgw001od4bq01nqt60jv4zczs51qjtvw0vafx51js3j8jnbij0nlw885evg4v10on8p9wt8h8robny63ujwuuj4l0ve6yy3g8jr3xz8dqn6rqgokaqeh4hv0ungnpbiibguzs1hj42945tzrv',
                detail: 'Vitae optio et quibusdam aut accusantium. Magni sed ut nihil maiores rerum. Officia corporis exercitationem ipsa. Quasi ut omnis ea quis ipsam illo consequatur delectus. Inventore voluptatum qui similique perspiciatis enim et atque. At veniam dolorem provident qui repellat laboriosam quia officia voluptas.',
                example: 'ookwn8k1qcht6h1e65kjy0hotomldi32tao1pk05407vdmoiz47xgczeo7fknfd41vloptoiu5v3lcwwimfehnzq6x3soh2wl1knwq3yaedl6vdy50y6xsqrb3hl40qvgmz9myvhd12ov2en1g9ehhbinjhvczzb',
                startTimeAt: '2020-11-03 21:11:22',
                direction: 'INBOUND',
                errorCategory: '1v7gvt3qr9iivvdhngumgbb97cqu28yzhsx6592er488ie21z26cjywg6nbtyoatgo49diglumxyvw93uiaf3detsyt5ptb4nogouz0bzkex0zpwfjrxzbff236dke3yp99gl1oum939pz4ymr0vpxaicevipcnj',
                errorCode: 'rypcj0apc57oxft6oa79qg2kv0bsib1gxa5wcnceq0vxt9p115',
                errorLabel: 236826,
                node: 2477954007,
                protocol: 'xqqtc0iqp6jvd3an4mp7',
                qualityOfService: 'uicknjmbauji3yxtrese',
                receiverParty: 'qrvwb6zau6bdoc7qnks6c8cw116qeewopcozhvgmvvc1wj3jia28gr8x39yhe0lnkwbuh7hjh8jbvkcrdb1blo8n8cxxk8qu9fzdat56v26ult6x5fj4n4twfxdklu3qjgd1evp5sqwcoy0y2k8mpklgaliddjen',
                receiverComponent: 'f9sx6bnyw287124qavm6669z3yvq6c6m4skbdtrr5leukaorze14fvv2ixq0weo9pw6msoa4wk5hu59xlvbpso4kys8bu6hmxycm21rh10c776wbim9kcejpinu0i8i41k84lvoo6t6g0hcw6ud3mmma3uvn96t1',
                receiverInterface: '0e97xoj3smw5ttos7f6q9xyxguu5lsfoxn34puqwybj67tv8a1z080qp9ge7uz2ahcobrwrisewhpzkf2zjcpchhpo6gv69eaj8tfbgbo7wu9we5te4e9xs6x1giixeivej7fbmec56tpazkhxt78ce4nwrujupn',
                receiverInterfaceNamespace: '97jst7z4958gwcu9qo5iuubfs70jeer7kovpxkd3iidv227ualrjsrq3xihb0753h25pwlhoh4oijqpyokfqynycrjgro3qenkyjvbp8akgizaq2o6nfinnfhxerj669rfwiemijxnsfbvmr2apzxi3px0tac5n8',
                retries: 5716635093,
                size: 1072329178,
                timesFailed: 2916810307,
                numberMax: 9012005993,
                numberDays: 7270156458,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'rcfyvwp4fc91m6ed7dsuzaumyghws1b1dgzs48ixy2hqns417i',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'v36fz8bate2g7fa7inqk',
                scenario: '1efpf5goxp68f2d9olm4tagq5vd1lgany0posh5a4hcenpp7kxqh0lvvd6ut',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:46:02',
                executionMonitoringStartAt: '2020-11-04 13:22:42',
                executionMonitoringEndAt: '2020-11-04 19:28:24',
                flowHash: null,
                flowParty: 'adz45rw69yjlvefw1p04evmbkmp4n3fl2ql50gvmdmgmo0223cw600zfmerv0hykvn9ai3gnx3bm6316yx6q377068qwnzlg2cj0decpjglyhim9rckkiefypfbxjpnel47j9dt6jbjnd9ztc3mghlh4pqov3gev',
                flowReceiverParty: 'aw94hv6mt74n8ba2k2oe2dsmqbr3r2vfdutylmgkns63xx8rjfeowjd5kol7dndd94b7w0x3amvrxl648j42uxhxcxvbldnpwiwauk0t7r1prf2eunsf0glojb1k0imchrn1k6j8dbk6u4ybi6x88lb7y9n3palq',
                flowComponent: 'w47zymr170aul4r0iz6so4l1rzvyftz98uzxtkwwxgb6my6wlkedg1kzl7di5b8zfbpvwichbzoh5fx0wxbpjc5qinedyznxjifk77mijbbng0nyuppm276ac6npmnt6fyw9h3jbjoi5g0vyua6n3oowakz3cbov',
                flowReceiverComponent: 'l9luitz2ffj5kxe71qkcks48aoeyupjzzlfxm5tq8ma44xm4gq2w9g2vh32a7lmph23n8c9z1d0o1qzbqj5vgxbcfyourkqmw1lnhjb1d6lx2xb5wvuyfgp8a69gl0nfajc1g9fuwdeep6uv10o2zmh8wvwvsod6',
                flowInterfaceName: 'a3e40mua1focoi69bm57bo2xvx13md33121c5xei6y2ytmdi8mhh3x6uxhwjc0k8lp4epihc0joiw7agkal6ffv6n94v28fquipj4df35uwn0y1cq3szosn8nj3m3c3yftv5axis2mltaltd03hdrdgaxmfec7zy',
                flowInterfaceNamespace: 'j7nij6nldqqtk4zv36c6neh97q9zc928z22peaq03rmln3vcllumvab86aip6sohrd768zkscvjkcde3m7wdvayh72cexn4pg9hjf3archefbxp0u2je9atxz1zlq6ls6puu5axju4yc7qn77unyfrecbrg5jxsq',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'oqan9aypukp1jv9dr9olbe9ldj6nbd7wmgoj5nznxvkc2c779wnzxrx7f7vr3ad9j4csd33eorrwdj97v9r4qbirsd5pyvl8p13r0g3mgry616tbifl4wuzrvimekl6py5rjjhxs9uuirhobwghsy8muu4mw5261',
                detail: 'Aut totam et. Est quasi ad odio qui. Quo aliquid saepe qui accusamus quis laborum. Eveniet sit est veritatis vel aut. Dolores et voluptatem.',
                example: 'dttwi0fs6n1pdyac75zda70y5eai5ws2w4ww4fci0bbmdcr3we8mhoosu80l54lq5bten8xjmw3zohq8b0z7xb4q2g2ip4edl9wa984qhrc4wgnru6h0culpght1zidy5rn14052txgbbbqgt3ycusktneabgksg',
                startTimeAt: '2020-11-04 12:22:16',
                direction: 'OUTBOUND',
                errorCategory: 'uxbpmxis6pwaz1lrh6istyw10fw01hahdwchsfmkotibzvx5oh5s2pq9kh01qolangu2biraczz2r6na91luh80817zlfm4zhkyfk89hyow4dyg4x26pin7vnhqbakxkoltbtvzi5yqlu0dortvjeb6fw77dbcss',
                errorCode: 'fmbvri622tle8rglfid135540j5it7z6le9zllmmu3euhodfpk',
                errorLabel: 169569,
                node: 7862725732,
                protocol: '9qdiue51a6ag3rizzuvp',
                qualityOfService: '9e0ehtuqd0m2f214zfw3',
                receiverParty: '3371x3y92q9fo3rwpc491tpbr64xlbv5fwmkqizvnw8u4bxce3x2l7upxr2fatnrxww1drm61la2pwgk45gzx0uvqbg6qji381z3gpzr291y9vkwnlwtmsf9kgo84ulb89lhnqu9uy168vtdbw4lzk0lcrwnx4ud',
                receiverComponent: 'xmcn43zzv6xcuumftox4zop3c2ei3utk496igpz408mvinfdr3709xtahfbwwn1ioxtxcc2bjmn5ahh82m958sjqqoid24tvgrhwkfettdjtykmm3mg7ox1b4pvl2fhkjyzvpuci3ae8l20ub1w33e40dkly76zm',
                receiverInterface: 'i31o3ld02dw6ak2arm0yzofzel3avrgs1wfa5kfz824k1iwj8wob58v6ckjkn7ic3rbv5ns7rdxmjp4ogzvz2hcbjarzubbpbo85fc2f016qtl4yjezmbeycibw5ewmbrpzvt0wjehj7ib7ue9uz6vdcz0iom26z',
                receiverInterfaceNamespace: '4r1nkc70rkgne3we8k5k4l4ez1w46goh28ltyuzsdk4a5rux38j7xaudo3vewswv2baloqaw6nnh9vrhm3n8g0lze4ycc7s04kpdtqy6r3wkj0mg8w1ne75wcl8m0jlwwkw3fwxmq873cu0ofthp9abfgoar4zmm',
                retries: 4376561787,
                size: 8998284253,
                timesFailed: 5894749320,
                numberMax: 6130133481,
                numberDays: 5969490209,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'wafwa25p4e53dzt5o1i2v1jwp6o1e408lw3xez56lwo976qwbf',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '629ijl0qfuk4iiugbrug',
                scenario: 'vrr7npgdwcr40ih6m1bqg6n9vfy5iu4ar7ez754vtgebdfos22i78zliyije',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:47:37',
                executionMonitoringStartAt: '2020-11-04 01:59:55',
                executionMonitoringEndAt: '2020-11-04 11:49:42',
                
                flowParty: 'mi8wnnzvqek862ch2mz52kla817gkfltek5mwav08iex9qe5mm0ymnfrlqrmatsdj41l4veesgpro4bjtffi4iv43lu74dfv0hx2zngkvnz3ckqkm2bofi5gi56qvnwsyefdcbskdtis9ihuu2rnd4xattvvylk0',
                flowReceiverParty: '0tq9nc5i9an1mu0brpv8yhrvyej9u1zrhipfm0cf3s2tzmipzg2rcjl3x309p6yjxd5185hvwr8p7xnrhwsrvw3ytddi73hascq7f6q0gktq3mq63bmztp9n2z58sckhsk70kz3eihciw3dt87lll1md9xlqg55s',
                flowComponent: 'uyviajmz3hihio6j01nmqofpx8349mrdcbgeho97pdtsatzue0ztzljirgdgkazify76bepe03ea9302u8gxgkp7ml38mv4a6fejl7clke916nxrddr99ivv752bmwdayxshop2uje9keazvrocfhoidvq56ywvz',
                flowReceiverComponent: '7blqyw3p84r8j11xthmnl3zny5nsnq7cdcniavo7xtk7r0efkv3kntxv231jrpn4yvwldra5w9och7p9zo5161wurikwwi0maafx823dtczxg7ovwti91w11z6alpba597ztu486ni661c81ovx0c0lh6hmx87yw',
                flowInterfaceName: 'b19yfcjx3pvd76y4zxaatqftn6k6l9jgoaxk4bu5jhyt8ocg3rtt35yg87tnxfbdf3bwx7cncf4fyq9ycjmr1hdu3nlygma755951nf6gy6n1p4kjncd78545o7zv1n8gri673xkc5smw8eqdzhygtg7gi8w5wde',
                flowInterfaceNamespace: 'ztd3sykqpidzg73yizpsfuj6sk31smpk8lf40qa4rnfpvfp6a5ggccssejtuypt9p5rjd7c6bn5lcdmhi4e48zwcvovq68fzqs3j5i3den9j11pf1ccyxhpkr2smcu5c7f7l29c2icltjljhampapqm8jiw8y1rk',
                status: 'CANCELLED',
                refMessageId: '9p8d76817sk6e5hq48d2jm87plahfd19b7aqihgjcvmtww4lj7udu8m1vn934m3vzisc70dpp7xv9y72zen628ei9hv23xc92ejn7qxi2z2308r2x8b9vejiynf9trq749s13hsz2l69oe61slf3psbxnxcj42ma',
                detail: 'Amet accusamus nostrum atque accusantium. Voluptatem beatae ut id. Accusamus quia provident. Expedita iure maiores commodi dolorum fugiat. Sapiente consequatur fugit dignissimos ex laboriosam qui. Vel ullam quasi numquam sed unde incidunt suscipit veniam deserunt.',
                example: 'djhb5osun9y7vx5e2jbr4b00wxnksrez3fjg5r6k2fnqwdhj25qiywt1omatsuo12p9hnu1l1ccahvvej2qovn6wbsjuatmv6b5mpeqo2op7ex0girlny6mcp6azu5swuun24erk96dtm4ositflu0g0lerb83q8',
                startTimeAt: '2020-11-04 19:24:19',
                direction: 'INBOUND',
                errorCategory: 'nw3a8hvrentc2rpl7z9ekopuoajnfljulq1s8qqstpnc53zihcc8baw12v6bouo6bao61yzcppb25b1ubgtpy85e216q1j6i9iwv0ez0l902glstv60dga6eq8he96qrccwl50qw0jxbd02nuqq496bbtxw66vjy',
                errorCode: 'kvn9vzfjebk6n451fgnpf478gr7xnte25g7c6a0hzuyml506ac',
                errorLabel: 952731,
                node: 8129587330,
                protocol: 'bg1ul9c4f3km51s9a5mv',
                qualityOfService: 'p75183yam37enzz2sxv1',
                receiverParty: 'c27c56h98tjkew9z3tcy01s171rz2jty0f8byuo634adtzhpyxehbu86djle004f0kbqqnw2ske8apv7krlg4xbgxbacryljcl2gaf4jb7d125zu919j7vmztw6zqkqlde3f48ag14vak3zzw0src73pixobu3oy',
                receiverComponent: 'btyyg2oojfwbsl9xj0ii4zmwe39n8c44sag8ycx3gbr0meg9z635w1hozfgbbec6bg5dhauxjvhsz4ak5p2yhxhjpt4wg5lkey7altp19vj6drnq55e6nb5p4ivta4tznjd6x60mz3ridmvwmgh9m5abs4dhc7u7',
                receiverInterface: 'esqixyow4kvmfuhk07b4fpl8efybaq9xfwkbaeu3qdy321thtsomakt2myvovbooses8e21xlppwmrbtpsij9gnfq5b294xb1dlk59j7n11qlj4mi2ql71w9l1drmua3gs6y1iv4dxs4by36ngjxzut3iq0n8ywo',
                receiverInterfaceNamespace: 'xx7kmi2kiychaqs2gdv70vceplyg32pu9hc1ymvp8f6gyw6m44wrxm46dmftz1ti2fwu2k5aj6ljebhxw7rxtjo0dmzdmwldva1ixn1fhzc2hriw61wm5dhdg66ci4y0b4b3364laksgdodzhvwa8uc1pbjg4ofo',
                retries: 3118194120,
                size: 2559141122,
                timesFailed: 2714978832,
                numberMax: 8751962513,
                numberDays: 7028630912,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'tbb0govc07aq8m0hvjerzourovftltx7aeuu40enprshm882jc',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'j7z35dhuw4bpqba08dt9',
                scenario: 'y29faqomd8rd2pri4uthtgrlatzoo3xn4t2ud1k7rz220f2k63g8f59fiw1q',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:23:33',
                executionMonitoringStartAt: '2020-11-04 17:44:11',
                executionMonitoringEndAt: '2020-11-04 04:38:16',
                flowHash: 'fbh4lsqycxvoujjvmhv486bgysjhhzdlky61xafs',
                flowParty: 'uxt6sqt2mvs8wknae48gr4h5d1yrlrlttptpdwjoupih92q8zqzchhmlghd2oknbj9ld49didtp7k2wv6qbj1cvsfpcbjppsdpnjl0p2q3wx7wyxlau3am5a9i5gwiopl7cccik26bfoxhm7cba7cdbkzy9g89lg',
                flowReceiverParty: 'fsgpcw4177lbgc40du2x0epuigfsbfh3dv8lwg9kl3c9s5pdz06vyzwq6sy58009e4v7yahy758y70rn3osygx4sa5ayyd7hwxzglradd80bmtnfwzapr5n7vuh5ugx93r7f4uz00p97nbx3lxrv6bmfbnanesep',
                flowComponent: null,
                flowReceiverComponent: 'zxjfvx6qhpiu5qog9rg062sjr7imt3rqzwkzy0tczivzmfd8fjwhoaernsndopjh1ghdza7xn76v4v3cobywoytfypgg6et0c6crpdo6nyem73lx0x4xnktimgmdu04ra8xtde6hs8etdwbq6yl0arta47viq6y3',
                flowInterfaceName: 'wc29tkke4s1yqv6hq2gseqeyrqra4oof6qnykuadru9nn1psbk7tuag3j2inbz4mnvyz5o8mm55135we34jnxctmweg9wx1hbaphb1m6rmnt1zbyvx6f4k3moz51rmzvd58twalm6w3xt4yb8puzggsvzl5zxeqo',
                flowInterfaceNamespace: '2fd1dg9ax4mdgcu4co9vxdvko2tjflwe2u9evp24klqsz99qyv2weq29vy82n47tqjcwczutqq58gb5d1vo0n39u95q9ujijzz0zbxuq72df9w3jc6mvidqbnfy8tqlegxyf8a4zrmkoeiae0nih3g0zz5fz0cuq',
                status: 'HOLDING',
                refMessageId: '66kswhipkg6rtvhk4kyjdoskik2sf7kxd0dxnhzc2v1nfv3mnxivro70fvidiyx4de3l46j075o4y79tzsovfy3wqqpy1ap23ydg0djxgoc0uq121ttdt1n774b1n0w31idik7skzr2jqm2n2l89a96f1a66dsvm',
                detail: 'Provident quas labore repellendus quos ipsam non nesciunt est. Aut maiores ut quos excepturi enim excepturi. Nemo nihil aliquam dolorem aut hic eligendi quos. Id quo dolor enim. Et explicabo architecto recusandae quo in nihil est. Rerum et quisquam provident quo et quia pariatur sed.',
                example: '8miqhafh1gfjwnhg4k4wheze8mchzne01pcvl0klodan4tk2oyw5pnckh87mxz2qnw4h9htn8p124pmqj8mp1oswgkex75laoftz756dgvsl0inu54nrsoe5it8ozrqqy4nahojj28jgs87rfxm61y9tyr9mqigx',
                startTimeAt: '2020-11-04 18:13:55',
                direction: 'OUTBOUND',
                errorCategory: 'umaw3k5hppf7q1cb4syyqaaoz3phs3n0qm4td3dg6z1t8no0u0t6lcgh6484768w9kv2bz1p8vpgrfyy2214h3hnz6fkomn680vmlrh8023ju6c23yb1m7w0fb7fprwn7j17w9en8h1qs4zozkdjk8ws77lych0m',
                errorCode: 'fyq8b2fe92x4ghvs4t30beghuz7c7d3qgfxnjrwoosyiqltfeh',
                errorLabel: 771439,
                node: 2043032102,
                protocol: '7uih8ba7omw8sp72uqcx',
                qualityOfService: 'chq8tbgxes00q8xb8qw6',
                receiverParty: 'kmesumcglol3l5y2klcqgxy58ph3s2if1uqexvy5djmef426nuqddfxdvfc4ik6j5qpysghkc2o5t2zvdflfmdr7wy0urvracwtxok6eun3ik2wsvypfymngog53ler75kylk3wh0klu5jolrapmk5rq1ocdl1x0',
                receiverComponent: 'glyac2nhcoyo42pw0uqw6apos2floanwi95v7zxr3isog2dpig6a0c2h7b093fs3ccby638g44m0x8fz6gf82f3ynwmidtx17sme24a6c5zlfa0m9yl98awne9u0acf6x3rceuo7cwtgdorxinmbach9inyha7h8',
                receiverInterface: 'nxhg1kvwws7h17gs3kqpwi9l97hztjzi00cfbw325x1fngibb0n6mnd3ifnkxf4u3c4g9nnig6l1cph90nhqodcra62i95fmwglpmylipxwvg7xbe5jzxi0c94zm4f6shqzu14w2ljlip5iol27uhhrhnczjtzpc',
                receiverInterfaceNamespace: 'rnpzrl5on4cjuli9a07skn5v1ab0hgdqtin0hbo4p4w6bvy7okcazxyz1fuxwqws6tahbuuwxcdhjfyxkevw2mvq21qxhdo203moyr8731z9vlmyg58q43pelo5a1q4b20jxuyy830uuqrdf262l1j1dkokkxhjw',
                retries: 4653990258,
                size: 4767406179,
                timesFailed: 9753364394,
                numberMax: 7415225067,
                numberDays: 3691698679,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '1ydlno5u37paty1nqjrtstw5d5gyx58xi9g5331bhk26v8ctrc',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'oiyqpbiab49i6pb1wadm',
                scenario: '6hx0n6u3dp8ozo3jte23wrhkhce7tz4ys8h5dehxftyfndz6o0bp0zxkbnxu',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:47:04',
                executionMonitoringStartAt: '2020-11-04 11:42:07',
                executionMonitoringEndAt: '2020-11-04 06:11:05',
                flowHash: 'ylqjad3u8emiux5miihrdesvgc8hrweolj67nvjj',
                flowParty: 'ialghy0uuw37irf4gxjjtnsnb66pczplewz34pussxhiul08apku7ccfux0waci01i6t1n74qekgkagp6l2ulb07cvpem6ukg9lr3124jt4h81fp7mansd6odh57pkrhykjywk9df8swetwo8ckui241fjz5whas',
                flowReceiverParty: 'maloy2tzkxrvpm46bgbg69h8x313dnbad0vrgww1akuqhpzb9jdyghacq7cyb1ezfn1jojnmp4ego5exawzm5eif2qgvxe3jjufx4u0fi15uzwtiz5lw3t739wozd06j4fl7tiv669ydg81kwhapif3hisrxlxjp',
                
                flowReceiverComponent: 'vcu1zg5qqgdez05t29btjzk3siz4h2qix54j89gxe8f5f2807x3zoswc1xqweequw2dvyqdosqsaux327jk7bhdloyfbajds21zyuuegwq94kd6yzgfohqjps4z78qhi73iicz7zppd35oaqjzkv4xiltsyen51t',
                flowInterfaceName: 'o2a68ukrxt0gcd57bczpnl37jcfu8n44jndtnr7sno97uqwi6jij6f87uv0twmw5nn0j1tc4yv9igwkr79b3bivqjcg2h4051xhpdcwd6zm1y81r9aprpfuh21poy66x5f8m2ophk6sdicpnnnywjzn09d1wb516',
                flowInterfaceNamespace: 'epm9f2qjifdh373pn3lzuk5hpieg5ftj7sunxujjdh8rp9xydstvgd0vsosivck7hl2cgi3mpfxnvjhd5ht5k6kf1ht57vdrn4fx72qanf31no9n5zvnoeql6nzfrfym0m89dllk80uhi43qh6w23d2fkavugjy7',
                status: 'HOLDING',
                refMessageId: 'g8eapqi59v8x304hwgh6mh9bfgm5r1ze2z1c6roo0lxcv7arje6drox1dznkfxbm36b79jk7lhmafnvwnzm46wx5rfyq2jne73ti8ijhnof0x5akmrks0oltm9btbksqf0j1i021c6fyzjfdnw5i6jum8xxwhkqk',
                detail: 'Officia ut magnam nihil. Nostrum commodi saepe a recusandae excepturi quam facere eum. In velit blanditiis cupiditate quis eos. Numquam doloribus quos explicabo quam minima architecto. Molestiae ut omnis libero. Excepturi sed in porro.',
                example: '9e553p3ephl9wcnut74v3ddqv1x29g1meyrarnxpse60pit2cipqbanfw5us29tdsx2wn3qmr8uwmq73am26boijkj22ckuzx4ghpxkv43bikmnl0zzg4uapr6ymjrwwwf2joz6hm07bcje5oig3j6urkemjo79y',
                startTimeAt: '2020-11-03 20:36:17',
                direction: 'INBOUND',
                errorCategory: 'y82wi9fov3raftpog75zx84vaxd7ranundct7ewir5gzfm8zyebl8v333kzb11bz4de30dm8c9436c25h5k2g6mqwuug5ft3nmqnwhr4gjhw6pj0l3evvqdfecynnn5kax7eqjn7xhwn9ybl5txjc95txul7khqx',
                errorCode: 'o1g36n0ncqbg6i56hnzgk0mfm1q9ya1ow8cme0jx4zgqner7qf',
                errorLabel: 499391,
                node: 7852794824,
                protocol: '4zq09t27lkabgvyd5d8n',
                qualityOfService: '9jjac492zms8gzs6iec3',
                receiverParty: '1i7i4xcqgs0497qbuxt7js8uyj55i5bs54fnqj76z8cri5j9812ec8wrrc7zyelci02rwj8xrjbxptb0zoil1ahipq50iiyn4c6vs4u1mtw3yuw1u6v8cj9ix2qjk0777s0ogra8gq0r5fouh8em56v8yy0078t2',
                receiverComponent: 'y9qx2mjx59z9rmnu2lnrm3q1gtq5lw9636b48mje6wagldm55q885t5wbw5fge8n7w5ef737eaxb6cdf9cxo00cv7v8lfglmdwax7l8upa07ec1jf9iwgsb9dtrzxfni9x1ized044trbbovzg6tuua8vzk2gwpa',
                receiverInterface: 'yunglav9kxdhhk2700u1n63blr5zhbl97xbtta56lyrck8xhu0t9h5uh28neaovmdwd67y67vqiao9suuj1oywj5ogix0zybh7xvifurziom1e7xg53uuxkdgegb0txsa8jguwuufjvb91g5i3hg12wc442fq4as',
                receiverInterfaceNamespace: '9cffaqpruefyxgclk7c87zd7k9rbjklh38synxcsxvfroz5j6wawbe5gvi05glp5adft02fnxjj70k2772lg1jgrebcx4qsmobhrdqcjj2nakts5msgj4ukx8y84xshgvhxe8gbwuq36te06tf6zstssycinr0te',
                retries: 9823662231,
                size: 1541041487,
                timesFailed: 9082531163,
                numberMax: 2307614243,
                numberDays: 8648630248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '094ff5gnagxoqv1ol91bqcayi35ima0nve4o258kjbew79ckmk',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'qe7fyt3j6a7kd1yy5dhh',
                scenario: 'e4bwpg3xrf908h0ej1unjv78zdt4am2i2hl12hdp910j1kce656xg9lp2m5p',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:03:43',
                executionMonitoringStartAt: '2020-11-03 20:06:48',
                executionMonitoringEndAt: '2020-11-04 19:26:47',
                flowHash: 'esedhrt50ncql6n2lyexydyzorqympomggucolxa',
                flowParty: '284q5in03jmwozm8skwqqmutrs7y2cp2yj198s4q11u2j56w2ggzgpp2tlo1vh8bpwwk40pdflps5fv76ghavia1hwazh7fowngx7l495ljziflk46ej7ndz5oxnmgp1lrjfray9jypitilqi83cc0hwp3evkaxk',
                flowReceiverParty: '23trov23ca3p0zreqi9zz1x30cms4p9867iko2yqzyovil6b7r0n361wcj4l8gwqs1lxopqshsxtnu8m92m9a0vdxclzm5b65uyr5my5fn41z7570albz9qrg4k7zowiccpl9aj7689v0xv5pln9gypu4jxh9gth',
                flowComponent: 'r3zpr1bu1lyxufewim2c0ob6spzqjf1b7jxq7ozhi7u11qu7s058duw4td1ytj9880mxdqcipm2vzjz7zoa154e3zj7dx36gfi0mjj8v4oqgrj195qjgbg7cc79ld6u28b3xgr8hq1v37uc3o436h206ou4h9q29',
                flowReceiverComponent: 't9074xlmmk4no4kqdi81i0t3hwj0saqp2s7g8mqq981p0ta3d16l8tdk4f40xzgvcrwfbxtx3lu0px4e8h0p378trdiysbwsbnxree96yv07c65yi2ikotehcjd1by0p4zjqn93s91e4jkoyvvntvzo6b5ooh2z2',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'dvo447hefc1k4p0mi8axux6pualf88mxfzly0myqm0gx2m269z450q8s0n490l0wj46amv93yh1nzhq9slqjsjcaxiegahfk8nf3ugdeglthw3lbzu57xlievb69afwadf4vhcs4ofzaqif9wg4fh1qqx81s4lvl',
                status: 'SUCCESS',
                refMessageId: '76pyeox5hk8nnj9v5qy12r9q511vl35tm10psp1e36mvz4n8iyczix64mnuvr2nzyfca3vupacibzq5abw45tz5kk8qanoizzehyvoz4kb8zukjo1v99hze249nm1uqrwsmuomxqhx5xcbfflzkt7y8qbfq7gzuv',
                detail: 'Alias voluptatum quidem qui. Aut et omnis repellendus non. Eos velit voluptates. Repellat perferendis officiis ab rerum iure ullam.',
                example: 'a6xpv5rw8qppi39cjr6xwxa1fvt6t0n6880yf7xpdj9qjlrn24k4h1bllw0u1ocb51dow2z0qdg9ekhl81pnfiym15kjsx5yepmr32docoe7ay3wt2izwx4c6ta7wmp04fihqotdimulrhsp8fwzuidl969357cn',
                startTimeAt: '2020-11-04 05:14:37',
                direction: 'INBOUND',
                errorCategory: 'mg4ddpe0dlt7x0z4vucgm616hgtpeo9ss7lodyyhjr1qhkrph8zvy4v009a4ekgjk9ev6jmfmlpn93i0jkvwr3f8c1j6azz9i4hdjjyo0ri4h6ul7racaljbtdla1yozfdw7nfenr6m93pqgx4hji5uecp90grcf',
                errorCode: '092blbhsevv7v34lf51w86mhcx6muki4zlsa3pw465jedoyv3q',
                errorLabel: 265362,
                node: 9705960295,
                protocol: 'uwro68c5140cv0rc7r6l',
                qualityOfService: 'xy5m0n70yhg2nirskkx7',
                receiverParty: 'l0svb9c8yo6tsc6o0dfa39ia8r838irpi0bo9rpk3fqy0ivuph6x5hfr809fbhnnojsw3avhw2n3zudhitriqbgu1g6vl4b418kcnniida2ow99tqytp31wz2l9lywf8f7m5pzh8hp6wjns489hpkqmh9n8fs5mo',
                receiverComponent: '5ncn0g72zmhlexfrdty5nxa30w1nz5upq55jt0p4vjspo4r41fk7dbiud7lqn7hb6bvsdc4f85ama6gbzr2nzppehanxdjsj9ljpf4pkavgalsk4vvqbmu8344qpklh1cfyxrd2igf1yetacfp0d44numbcwaaam',
                receiverInterface: '3pxvghzy5u9nrjakuvqufv3fsc7w7qe8pd744fe2jmwh0ylx88x7ueq5yw34l58r661rimphrirliwo9j2ey3d2krn9gcbb618sqjgj5rjj19ohqygwdadghs7vy8ezqvy4iaxhgvbcd5h0m59dwr3d2uhcdefo5',
                receiverInterfaceNamespace: '1aaaiidfcgzv09izhh7qgodze2u6cn7s7uammv0ty1e3f2jvpdsc640d8rt0d3rn1yoifhq7l38wsa3jskbieo7cz2rhmx149mb8e1sgovh3eyzbrpqsq9wj7ecinurrbbk4jyq05sntvpk90hm4ymh4bczenokt',
                retries: 1593061891,
                size: 2829050338,
                timesFailed: 6408381300,
                numberMax: 6800418653,
                numberDays: 4612295415,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '8sk6mc3fzkjmswxfq3w1yzxbylabahsnlorg5c6rjui28bbro6',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '1txwn5lqbnuq0aqsu3lq',
                scenario: 'ep8i41us60nr63fhv5iyi6ecrn0h0bkgk4ikplecf2rz96bxbre6d2ecx35t',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:57:32',
                executionMonitoringStartAt: '2020-11-04 00:27:20',
                executionMonitoringEndAt: '2020-11-04 14:51:00',
                flowHash: 'o1bs8qta41rlmxcb25hv4cit41fhbv77z2xm95ol',
                flowParty: 'm0nlf5k5nsrqk4e5g1omni0pbdzq02ocfdmxbouovswlimo4c5e0reaaxq4b5qhiowffx51cf7mgblwxwkllrsz74vwcsud5jgxdyuq4nvf8qfj5zuhkob1ptc1o5rkjal0zsl9kqljyudln2cfvojf7pmos1blw',
                flowReceiverParty: '3vqbtcc4fzvpmaj95m2vqw0d90zetzdezj0ae8rwam0050obnjl56hvhy00e5nc8j0iplgrr70vww7syz0r2uqbxsh9s1t38xyaysn76m5aptxcsoyl6275qda5cc2dlnazqts6kso95twbnzu0booedjuinqqb5',
                flowComponent: 'gy8htzpil8wfujs9yguz3fjmpeags2o1225w3rcaw3yh6io7zf3pwat027izxyctwjpk3omrutxpbeyzszav70ajqebjbqlhsbyu4qhpxohw60816b2cqyqq7ac4fafpzyyv8dhg178lq27hroqdrqhsttr9q1m5',
                flowReceiverComponent: 'evravwzapoyv4gf1grndbcwq65ehmwx5cktrvwtodt9zxihhan4zji7kwx9s89w0mvkhtxena6jvlr0y315xihikvs7ej4phqatn5gtraim875z91gcdenvnuev53q6euqusngkyh3j3qyvvq5v2x6w4yox8j8u0',
                
                flowInterfaceNamespace: 'mgluiy1f4hp8dt22bxqz4okxe60nu5yv6tew6l9dfec9gd8jcw9pbd7bxhjez19hqtb3tcwb6hbx8q2660w4nwb83rs7o7sv0nxq5o7v1k04lwz49qmfwd345dp2kbdpv9rk3reviaab7u572in3hdln5cjcga8o',
                status: 'SUCCESS',
                refMessageId: 'it4236mbkdy7v1tqalyxc2az4vy21ig709lf1932fw3opsrjd9nyetxr9gfu2rcnx6mdpd7fyzq3yh7fgk6j8w6vebrutvyij4rfv90703f1mcrlcrdx5i58y00y5qkl8clps3hx5kdcdng9dbixkhopwmvt0297',
                detail: 'Quod velit aliquam est. Et perspiciatis non labore sed ducimus architecto odio occaecati. Libero qui dolores officiis. Qui consequatur deleniti vero officiis sint omnis eum sint provident. Libero omnis et.',
                example: 'nzctqbjbjmvgh0ljrwca7gowt390jr1s8jvj5xvytgqdus16c6pc9ht0j9zv2r67372qrp7x0n671njaoy9ill5ut4iqktmehnewgojteg5isz65ugrrte81pegmpav1w7j66uo2ykyyzyrcky2ael0l2zv0cdwa',
                startTimeAt: '2020-11-03 20:57:51',
                direction: 'INBOUND',
                errorCategory: 'i4u6kgooxwyavmgc5qpcni8g9qoqfsy45971t1a2pcrlxael60yzpve3daiwzb51gfsikeuptf3e3ojsyb9d8s5usjokyu6nw4t3fve6hn49e8vjf4ltmhjup5r2q8s7eosdv0itc62tmvfcvu3vq430xfvnvgwt',
                errorCode: '85lnna85aspjpia6wr2xlry69lp8p9t3elzvi5zls542skx5bs',
                errorLabel: 901017,
                node: 8435566008,
                protocol: 'cmhlr3a8exvxda66u8yj',
                qualityOfService: '8qode3at3ndonyy5m7eb',
                receiverParty: 'erck0fnnx1hk1wsh9mqhrunyl35kg3sn8wzepnow0jtxdk2zsixankrttpidn4b1ob9vwvs4ombze9u0n51nk3hww42oqgznthqz1lpa9rbt1ulgftdwb8ycs8pp4t2eu4ofvkm2agrb36ibgbpzgd6mnv85jwdk',
                receiverComponent: 'wmdn2qfwsq2j5ziccax1s5ed74xashqu40097fccypk7xorm9g0jw6ootci7rtg3n6nuzpprnur3jrk4wlejpmis8yvrmboswdxltbi22rxcyao91n95wcswfprx0s61b0d5p0y0dvhq5l9jm6ezegpgcvr3zuv9',
                receiverInterface: 'jdm431spjm65yjb6wnxhm8ga2zuzs9pwgii8ejrixvfdsqwucio6u0wn4rrcubbgzysgsz9cxe6g848xnamm79zubnr8tkuvwpgjonpo87g4epdz3vxkpdb0y85buesy0romiw6ro3nmtakmckbdg9g51lhvufit',
                receiverInterfaceNamespace: 'ngmzsoubkknq92ml1c1golj80doaiwo8jcsmwbo3hnrj0hwwrj4dd3fruzlkoopso49pijjv5907ywld6mgkx4dynw2icmwasp8orrsb6uvl2d97fiexcvbxxcj7a8llafw8jy3acwajdi7rfdwb6kzoet02cpt5',
                retries: 9374709346,
                size: 7542604657,
                timesFailed: 4539347732,
                numberMax: 1867224450,
                numberDays: 8358251701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'qsxzpwza0vntduxdpa4mgt0p5sdn952xoiyzhelazeool3lwap',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'l3en615qyvfcf0y5un1e',
                scenario: '5o5215dx4cb7lyzpzyheut2cl4l8jxsqfzjaw20a37ljui12yhiotv36ih9l',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:43:06',
                executionMonitoringStartAt: '2020-11-04 19:06:31',
                executionMonitoringEndAt: '2020-11-04 06:11:15',
                flowHash: '7hafivsupmouupoy6zyxz16wbvlnk1b154atjzd2',
                flowParty: 'ho5nsfcdmn70pvj9ofxu9lx4j3x53a78ou3ip22eeqyeanslnztjfdk37lxw4hso9ljjk6mkoi4rkn9gn2ucrhjkalwoipkl3a41ma0otoiom6zaxkgazjmkaohymqefqk4c73c8krlhco2sx7ai2ch3e1efb1bn',
                flowReceiverParty: 'fgnt3mog7rpwek6sixc7iv0rxls4gy2atpy2x9v0mrsqc88ee5h4ekryjqxpn5d6xay0tps1z9pgnui5wpgybijv862oadogb0runricixewbamngddbf17i0qatxmons31n3xqxe2vtt1c5ibjz25t1vfaa49tf',
                flowComponent: '4c2ehvg0sj7oh9wy65kfzkbhflk5tof3jae5p7vxp3c7bywsf0sfvmoo7y7jdk3553ughpxnscbq0kbnbff6egl8lbxcne34wkfuadugx7pfvd0j7qza877vxvdsbl8tr0gvb9itfgx3f9fhmtxmpkucltxmisof',
                flowReceiverComponent: 'm7hgq75d4mfvo9oohl5q53y91qnmc5scqxikao03oa1n5h8nalr38ewp3lolx9mr6jyoz4uf24ps2ibnca8e7qlsxn3c9w317wo8sqnin3614e5ujfb2uiad8bs32cqtelodcp3m9h0rfjkpqdlrjk0mbqtnh4lh',
                flowInterfaceName: 'v356qny2jxv9wulhlrfd8qnhlviqv6mhaainljreu9kzsfm3u25dj7e9zivp9jbuff37oz3yu7d3fuz2z5p3binanb04u216f92w7x36z0yjffhcoupcjdlqq2wpyk9xd6tns0trdrzi86z38h5xpjh7npbwnvxj',
                flowInterfaceNamespace: null,
                status: 'TO_BE_DELIVERED',
                refMessageId: 'jhwhsbby0ezwe88z7u5f4is6375oa5evd3mccqsdvwzd9hvf1isr43ucjp8n2one4yrnn4leq0md6tjilk49bks161gkssu7zjz33so7t1ywbl5oqz0nogif5v7t6aj8s3sgz3pwsf3jsql3625vqurfx8f80x8b',
                detail: 'Quidem illum ex rerum. Quam ad cum aliquid ipsam aut ipsum est. Aperiam provident quis consequatur voluptatem. Blanditiis alias sint quia earum sit.',
                example: 'tdaj2hgdow9ebj8g78n003zzvhigun15izboj382ty82kbavfuz0u6bs47142rt838va7ovhbhq5esa9ajttp124c7lbhj3nyvexfmocvlvz9zllq4elje9fl8wecmerjat625mumdobvbd3w3ojc7knuigjb0v4',
                startTimeAt: '2020-11-04 03:28:17',
                direction: 'OUTBOUND',
                errorCategory: 'qrus5h6s7zssqzjk8n2laab53lt1mpwe1pehhvt89ldofnti9xpn2ndviq0ifbaf1dok08yf7krhquy7ayd5a3g04fo11z4oy97ta2v47ebqnqunw8047l9d0n99lfnuzip51ng3mfto6ves9g4xa6ayh0ukuyc1',
                errorCode: '4404y0pea5rbz80u627cp7nleb3h48c5nu34c4q7uuoe1yzm35',
                errorLabel: 667263,
                node: 1377550742,
                protocol: '7k0rpb8oe29fkss0cxql',
                qualityOfService: 'v1ft6envtr4zromli9xw',
                receiverParty: '42befpzjsssxz6pxn4xil3lr19olsqruc0fqc9y5xphn3r191crn7x5b7yn7hw0ucmt1qp229bdjjjx7rzwtyns4ah7ntlrlubir6ngbn8f29ujbtnildpgq5h20c9u9litgujn6ipiua8ry1wcv1mp8wqolm6at',
                receiverComponent: 'ibpct04oybgzzxp7kny8k23mbyasg4auh9ljpiyzotrsiqh1hn5wyldhn802wrlc6uqf1oks5mtfhnortn9ge9vmwojo8gv5l9i3xgd5zropsps7779ai3ab91asty6o1sfnz2smb15n2xlqdodl3vxe39rpe69c',
                receiverInterface: 'ue7ovpbt3hj0miyr489avvumodg2o0wknydwijjeq5qedg6b8jqjbptfyhq9zwf0fn515s8iv3barw2k2b7e9lsgvwkuu7p702ev75dkm8sqg2cwtl7vxiutb06s4bujpugbw1m2pclip3399ydcs2ldn526jjom',
                receiverInterfaceNamespace: 'pccvnr1wbmt9eylj12se1357db4uhvo8b5pxapyf688os5g82lmmi2prbtibgpk45v22a686holzm45adyrujoae18fmcw3kium8gqrc8qliflu7hgp3fju7gipu1ey2xiz3cec944qjy4lcdwp5ij1synxcopzp',
                retries: 2532207073,
                size: 8826887605,
                timesFailed: 5901269727,
                numberMax: 9818737048,
                numberDays: 1167643920,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'yhqaxvazdzopcznjrq5qinj9w82gzj5zksesbbzasf04zmtie3',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'v7odha2cydkv49y3bip4',
                scenario: 'zjfenrdz7csry7c1ihi0aoifw2nioz5iluk7o45hd8p4nu9uh31u8pequ3ov',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:42:53',
                executionMonitoringStartAt: '2020-11-04 03:38:35',
                executionMonitoringEndAt: '2020-11-04 17:15:08',
                flowHash: 'afiz3rhhhygsr5c8r4w9twl5yhx20816rxd0cbyr',
                flowParty: 'ow22eaz3nkk85bdnj0tpup1bqsprc0n8s0wpvhujjlb8cv53udzadbbsofmza7762z31zkl3eebkjmyzb4isuaqz45ii8dlzehrjpio9dh00t85a0vy3j76c8suq2ns7hrb48qg8oxwgq1kaurzuvhw92z7ys03x',
                flowReceiverParty: 'wpe3avffqrtuopjzgt2in71t9fd9tvsnmjs5t7y0xfc3x1ayvano2btnl7fdxhlwkj0muypixbe9cr57xw4r3ygdmhltdpra3xlye6sotphl20e9tempog4ogtfzfpmgyq6lvp1b3qpn24hvahzit2g56znlwc2w',
                flowComponent: 'bc8xwf90nbtqw7qbcn1irhm8jodw4plu03ol6itu889globnesvk59l80zmfi926kxbj3gqi82mf9vnesuipgo1v5vq946j8cff6iqw1dd90kvnu363n7hgn0pwd2fzu94p72a5tx4ma16hhiqatssixxbeaptgi',
                flowReceiverComponent: 'cnkcraq28r90xlz4pwmxn0g9thsc18hxstt9p56xcdxyas5atsf4u636e9kvscikkxdses8ocdeg62oxatjr5oqy34nlc01nzpdfaxmuhus345ucet4w86ukb6ummx4fkuc6chh5un85tv5s4jp54orp3ngl9tp2',
                flowInterfaceName: 'ufjxbzwi9ct9co9gy9gdm8g0pgpmi7bg19m3bfh7stf64986zx2lm3uj5a6yystvvjrjb1rl0bjff78xc8azu60tq5dam7hndsofg7c4fwg2yg7o4d34qr102n0rwdcci3xjozzj24a33xliv8jaot8v9u69caqi',
                
                status: 'HOLDING',
                refMessageId: '88hronbd1gtp7l26vo40g6lwjq6z2vhcerts5ju4d680chw67fpbxrg8ntfekx6d21paff8d4p6mf34rzxskl88of245n09wp7kxkkw8sb4o59ct9nbmksoby16k991dbw4xhcu4pzngtucqyvlubdb5e25zrhp8',
                detail: 'Voluptatem culpa dolorem illo doloremque et praesentium incidunt. Voluptatibus libero cum. In temporibus similique earum pariatur blanditiis corporis.',
                example: 'esz3embwo6kcv09pn3tqqkal0by3639hue6ggb611ilk5wxz3gdp99t8emau5lp47lze4sldzo2wxw7z4u3e0se1q3an8dqepjsr3ctsugwpdzzmck8dafxgsn0yddpqxkfh1xl7jg16raan8fgcs7szpyc6vfke',
                startTimeAt: '2020-11-04 01:25:57',
                direction: 'INBOUND',
                errorCategory: 'deazu6ay6re69hxge4yzpe936bci3bobqgqnhslnswdks356ak42sht04ba2lfpkn7vzkx1mapsw8eziiyzr5ofjnkee7yy9wfyrz8ol04dtb1o2ft4nbttxzoghz5wc7ijxhyipm4wmu8ktx8egvwklqyvw681y',
                errorCode: 'fz1c96vdfnqfljrkwspkrdr5bxxyls0icl49ybjcorxiuotghc',
                errorLabel: 976103,
                node: 3369888581,
                protocol: '5zw7ykm6xm752kqinjuh',
                qualityOfService: 'dtdwmvegs18k7969jhlw',
                receiverParty: '1u3rt93jw3g670exyb582v59dc0hsdrsnvz6xyflcykgd2lycnvnkxzzxli3s954jftjg5vat1hoe8dsl8m0f6uwaag0xpn3hrrzqvhtgxibq89sbh1z6wa8at3k58x4s8lujoje3vb0110hqzqipm0a67326rdl',
                receiverComponent: 'nh8j8liw6cwvjxurve9a9zebb0pna3y0wkybmshlidb3rd2xvttr7nqp4kgyq4oxkgh9vstmhj2but2y3y13ugo3a1ltwfghwchtth03mmosrfq00zckrftlrbf6k5o7qy41jb51m9wue2x00i8xtmtjlhyu761g',
                receiverInterface: 'fvbhafsayhijwf2uxoicc3wxku6m5hg7uqu6sn2v91sbpx0f6wk9ilrzyvd5dzcawsz216kfioptwbjtydkc9p9chzz54xqh5ybjl57z6b427e4zligmv41wviz7ndynonhlbf17dllysbntksexq9dfzbnytxo2',
                receiverInterfaceNamespace: 'vyfjsg36iw3c5lw28v4vyp7zq2lkd1jiepraaum1a71pmrl7sih8gsgphv3wok2k41sgg2sckt4qr3aoy8tbivztl4wo3sln64vr4wh9h9g3ecc2kcavq7q5hawnljzth9cd6swg6dwbnwfvb0hts1awkhviher8',
                retries: 8949691307,
                size: 1521804115,
                timesFailed: 6782812900,
                numberMax: 3618155587,
                numberDays: 8520495904,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'x5ovm3w7p0doq5asnde2ygfn7nirgny32tfv2oebuvjnil2rzu',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '56ja9p76fxobfaxrrp9l',
                scenario: 'phihy9ngwqm5gnxyf8z9y2pl5qqkugy9mtbp5ntdvlod3a5wrh9dj4g8jr82',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:04:44',
                executionMonitoringStartAt: '2020-11-04 12:21:41',
                executionMonitoringEndAt: '2020-11-04 01:01:22',
                flowHash: 'zfywyqt5i12i1p1x46zazgstmpp28oiorurqmwkx',
                flowParty: 'yuixi3zgj0usz536tsmww2n7tyquiv9m00k5oa7bknf1cneajdad3glv9jygoezb41yzwb1ol3k6vbokyww9i44ydxuizqblbotk74o4i3vftpfgamcm9s99asp38bglejiygyj626djz2ri10fh8rely6stevtd',
                flowReceiverParty: '7flujc7i75ztr4kd0u9a2x7k59g5ne8ltejpglmn138yruyxqa87s0stzammyaj1cw1rtm59cx48rdxw1ojcbfvr8u36wvejebrgc3rsl2itltwaaesfq2bodu4don821xurfh6sdwyp96x86insu173bxvrndhe',
                flowComponent: 'slpsiq5sn7anxuc921hzecfcz3xao7fonfm5z1ozfk1sbz2affl8vq02oixty0abtu0dk0og5cs812gaqz5sona4pc1amk0z1993k5zbgm2pyivn06a782g2f0bytpbj13ltuqqkecv8r0gg0nlwbfjw8xi1ox30',
                flowReceiverComponent: 'b451wlq8j4ejyx55rloio46epzx1bo8gypd4bcvht3g9i33wmpedpdvdpcpr20zh3rxunrwr8jzdtl0ac8wdcttfgjpfyb8il5917yceh9hrkxkj99yufpy2fsox7y3xcodok984krdb19uvcaxi0uwsxkh5wzi3',
                flowInterfaceName: 'm1fu9tww3a52aaa4nnqhpm35xfq540hvggjpnit8llhbg8z6ghd6u5kvim5t6e4fn3bjtgicsygbqckc4iye9dlj37r14j0tltd7vj3nv666h5byhfj4o3lfkhcpyo25hpufy43x7co77pak7sgvl02mw14c3g9d',
                flowInterfaceNamespace: 'jqtis86thjenudtdfc8cv8ihsns1b8rdiaypxneus1fi9emagnkgdl4hl5lkro6lfhng6rxffcmirpfrxq3ie100jsfganclpw0m5ktvf3iwtrrc8n0h9va8f49mtkd4126fnrgarhukdff1042hmfv02lb04mwy',
                status: null,
                refMessageId: '879iait232zw0k3fpzgcw693g4ld0sb8v35u3ggocp2kbhpq28mom10da18o79jv4hbyg8n2glgw7e86a43fnlwn1fmfnbsvklc5au1m5mzxdi0v0vmdpqhyzm9jvyf9pueiidsmlf5udjfxz6dphgn2n2jkknu0',
                detail: 'Asperiores aliquam ab est in voluptas aspernatur id. Earum sequi temporibus deleniti. Sint natus doloribus est consequuntur voluptates. Non molestiae voluptates recusandae magnam fugiat et dignissimos. Occaecati nisi reprehenderit et id ut velit culpa.',
                example: 'qhsyoolzed94k80ggyjt9thzlv5vk3gsmv8ks4e4hxz758580zwexot2gyxfttz1l06e2gy5i30gyw67twa61v898cf3wdwl8trisssa2018h7swgbbt9vrq94drqc9gvxtw7ka2wzwcno2e43jtmt6bxk1ipnbq',
                startTimeAt: '2020-11-04 11:19:16',
                direction: 'OUTBOUND',
                errorCategory: 'lyc78qyn2r4a2dp19nm2gm5uyd4tvvlfc9a3hu6ryxqwz1bk59d8omu41xzcreadbjitvyedqwewl6jzmntp5b6rzy93ezfns3tkbtbqrjnnpsl98exle42lkh7k418bg8u03mb7tr7fd323rptict3vc4armgzq',
                errorCode: 'hza6euh05cxbxwap0dcekwujwfahgut3gupuoqwz8dicj0go1p',
                errorLabel: 974769,
                node: 1975476006,
                protocol: '72rm12jysj6onvqzeyd4',
                qualityOfService: '4vhjhv6k6yl29icd09uh',
                receiverParty: 'e6e31l5h7h1m1ouj1pdzucxbwnehrnbf48jyuantdjhat2gxw1finc2ls3sir4t5vlnbdj69ehsvwxwmagtsk515kqjncj868ueg7e5efexwyg6ga9fsyvqppy4jax7hre8arto0xew0faybpvk06jln2so49xy7',
                receiverComponent: '72xivmerqq7dd413uduziehm5npx27mel94705bdo1j9g5pb4phfmhpm0wwhbw7jhc55zxiq1dgd79c9lrlgopcxajmvp3bwvf9gxx8zfs56lx91k8em3024zadz08aflupntqlxjo44d2hknw20254s2gxi5sy1',
                receiverInterface: 'pbg3bpykq2exvf98r6u6i7eh2bc9oiqyz33ijuk78846gbfitwbzdfwfrskxswv927mwulz3ye9ti7sgt462v1rsggt0cas0os1ts6i64alz3vy5dhnwywjufzx0tfai7yzpktocairrmyoy8ne9210sclan5uxq',
                receiverInterfaceNamespace: '4zfqjjs8jkjshxxxw096wpvozc8v9fwf6nnojrtvygwsnfjwua25kdxu3heevdrqwdu75k0ewvfebaw7bixysldle7yrsfy4041285x5ez3qb07ebiqgaryuzlnyizbj0feurn5b0rc6uby3le7wbrrvnj6d9zyl',
                retries: 8473346240,
                size: 9224408312,
                timesFailed: 3591178549,
                numberMax: 2278793054,
                numberDays: 2665440719,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'aqahqldtzw6vv7g3v0skftibrdv0ozomi5j59g53ek2tc2sahf',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'e4uzq0gpftomzrsyeyjl',
                scenario: '8a1j92mh3xtibry03bnphgo5k003dywiwov7tkpm4drkevlzeekxzsf8821u',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:18:18',
                executionMonitoringStartAt: '2020-11-04 07:36:41',
                executionMonitoringEndAt: '2020-11-04 10:27:55',
                flowHash: 'gp2e00kd5gwur3g8i8ubyfggssushmcd42neqd73',
                flowParty: 'xmguhyjebijtldlp7pgp44d3ppgegwg0ozn493ii8gw17obgaw400h4ijgimwaczdzqt3zqznpvnjh5g32nz50h2sv4yl14m4xg19pbu867uf1knf7tmfthyan44gt01b21fdvfxytefwnmittzj775e3v8tdbpf',
                flowReceiverParty: 'ukwpx2j3rvgdtoz8sy67epbwqep1awjm2whtpismv4z3x4imjo85vs9wvjbve5d80u59o4gj4jgjyjnvp2xypb79tbi25euv145zs1vkbq0lv25hepb52ji14yf8vkgjw28906q28n0a7wbo7yxoqqneeu4ofmd0',
                flowComponent: 'j64t07hyw77zvheu15r90gu1hfqwot78ah5ekvovmsrypukfxuglotbqgoniz0jnjjxrnianjej8rh5jmp43h1go6qxflv8skux9ozciktdf41pmrdl14d42h2i32p1v9h14fuq7d7tzhqe37pu1mtl38dpte3f2',
                flowReceiverComponent: 'gdatybez9uqgnlb7fz8o68tkk8fkihxjwgyem3vo5vfzacgc0pxrmtsdzai55viknmfegwi94ee4hzw3w1qw3ppal4zd2n8tsr9n0yz1xujbzyfmdycve5qrefrakfog0gf4acoje788bhp6820bpzf25xiitix4',
                flowInterfaceName: 'dunl9q5lxj0oxixy28o2cel7rymruvjzykn1omh45gsj32s36443r7n6iibqxf94avlbxue1iq0pmdgisbloimruimkhg6pcvoyoy2s4mwj63bvyfeffd2km2uw5lbbwdye876agralxczo46xqhsa27pc6zr30v',
                flowInterfaceNamespace: 'nd129vi5bagdw0cvfkxpx9i2ua18dvffln5jnicx0t7yag1sx2qdjx6xxe2ocq5wxzbx3tom9k1d10mw5zeaht3c2z4mr0q6k68qxwpadcqrkjocvco5rjrpzsev8gszenvn5kizit2fwuhed220gllkjkrdwgrl',
                
                refMessageId: 'w084gviinla3wcwt8tumt24kj77i3p514whbtqocxtzpap5sw21hvzb580ykedmicqc8eod7yivd90f2yxcy8x6u6xhyj8qiz8q8xno3lqlrriyxq1k9mirw8soz6z2rvxh5ycz9x2sg5imcotn2pu1w1luo6497',
                detail: 'Ut est officiis est. Unde odit nihil pariatur tenetur praesentium minima ipsam quis in. Incidunt sint ab possimus maxime totam corrupti at. Sed eveniet deleniti iste non dolorem qui voluptatem quia vel. Eos unde et beatae similique iure placeat quidem voluptate totam. Et quae iure praesentium animi quo.',
                example: '9zy00vag3it1fxvoh9nkny60vhkhhv34mupzx8t28rlz0pyxnn5clgvaozcvly7a64t0ubpteevtpmcdf5zs0ezxg5xrev67305uxhguu4nqlnb5dgirt81hbz9o2jhqzmew93v97t1a12d5ei145tiiiluro75t',
                startTimeAt: '2020-11-04 15:29:45',
                direction: 'INBOUND',
                errorCategory: 'cwv2h2njm4hjr29d6ra76fiv77q2c1mkaeaonm1u8893uz0k8jcwm0p9wvci15h1y9ri34rcv8jkld0x48ifufi4lm07fuvqnyhju8q326ao1ahx6uy4guu1anztgq406yzzh2329zcuayi4z8oig6f95yovivl0',
                errorCode: '618z5enw7fxs9j74wh8ibrwkbx3pcv4yhqgqfy7dzbjp3kx2ls',
                errorLabel: 589493,
                node: 9326855880,
                protocol: 'v9xld4uiigze026414sn',
                qualityOfService: 'eqwnmw709e5p84azhpw7',
                receiverParty: '2cvf2iikmnnyu5j0kacox3wkxo7gi2vrflylkpvj6lu77sbm6delgv08n96o45qify62pkwzjqcy2ylmx4l8n0elyy7s9wjgxwxmvl4s75wxm02yillsk59j6sd0vrktjs9nhmnthiakzgjvevdzcc7z8lvcdigg',
                receiverComponent: 'n3s2k7uj7xamhlfj6dvw6aq4dz9wpkx0m9p45q5jaf0q2crokdwrhc9ptehfvlzy2yiu1a51nwkx5xjsteddw5pibxwrvekotvvurm55089x8d8ozz5ggeqd9w7ddqtd7fzb1k8fjmuuru6ce9s7xnwvibvw2ryh',
                receiverInterface: 'nnqt4nd7qz3scyydnvtk9ibw0vaiaf4cplj2b45dr2tsvxpbjaj7dw6nrb2yxoqtvryv7bowf6ngnimoqfvmq61o96trdokolp5hqalqg18g6p3oymxa4i87s9bgyt0px0tqfqg0mk8nwzc57q1uv2owc36o53vy',
                receiverInterfaceNamespace: 'cq9lhwbi0m3kikueeznurcp7v1kf8n73wbi945aoogn6tgp46gxaf3w3egmhum0kid2pegvv2mqt9utmlpsv5spb0n22hgohfbb927to0c9dfrb6jqe7brmdkda5tptfi3vw8mh4x85cuu0nwdvdji6z0r17wb8f',
                retries: 5644524814,
                size: 2695739046,
                timesFailed: 8422265008,
                numberMax: 8733610272,
                numberDays: 8940601372,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '3cudhjj2vbpbei8fr0jt9kvzdvkpvy2putr5lkgg3cvplusyh5',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'wddmxc7413gy3icsjjhl',
                scenario: '3ep122iczm9y6gnow4y9q5w1f7wfdnvbdj0zs3avvshu8dyovgkdn02xe78u',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:47:39',
                executionMonitoringStartAt: '2020-11-03 21:11:18',
                executionMonitoringEndAt: '2020-11-04 09:27:37',
                flowHash: 'rm7jydw1j046pggyby6pc39hmq5ylmacuz8lskqi',
                flowParty: 'yah8xqyissbmloj23yhlvznve7s4qvdhux09wq3ro60kkcqy2yrv5we76jpap5d5m0ut6kkcx37dje0xo6xuyps695c1kbymerthhl115lx9wsaeon0jswb2ccvrpezftc59xfdwg9iqghy8twdqyyjwluwcz41n',
                flowReceiverParty: 'ztdynwgkos7edb4fhm7qqce9jxprhfivw1glxm7c5zyj580jnjvh0h38xssvtapxr0mzju14iybbml2troca1cocp476afl2ufprxihaxax9qu4i5rkz7sg8tjx15hvtv6mdhtejztsnhvx4afh18a57vlehbfpi',
                flowComponent: 'znjzatsetlwxkl6e7ja60iyhlt7414fqi3tdm1lxpcna9yen5062t6pc3mv5xm5g7fgac4sxxc6otj5vd87mc5ourap4nerei2p47t7kohr319yii0d2lhrgumjum4i2l4d2f98xh9aeuu2aqg497m1y0xq9zdu6',
                flowReceiverComponent: 'etccf6y19xmq2asu67niwslx85n2q222lhnv72ibom5hwdotsiikbptnws9xhwmmg9xgse1hpabuzj1fheete1u53ok2bv5z6quamaufydys8up82x3i2m2n7tghvbcaqo7u03f65g049zlw9afs62bxxqd8z9tq',
                flowInterfaceName: '2tjjbuiynwf6jq43bxy3ufg21prf8hf0mvenpkrupk74xf5wqruxgs27xdbq5q4miym4fxqhjncvcopd2b8bx57qxjieitkneetb8mxjf90tpgvlsefyygnffujj8mj90pggnaqp4wm5mnkeq5y9v9bd5nqvj3ib',
                flowInterfaceNamespace: 'fzr51x3p60m5u0hysi5lkvrt9d5kgntk2gu2fazwqfs4zcscofld014v5vdjl3uv6mo8b2h42ighc28tbtfu0laixhaza4rth8ccbpl8ip0734ar067rp2tpiwbcuoafhsp6ukfu9jwqm2s3f050uq8wwlujw7ja',
                status: 'WAITING',
                refMessageId: 'tz51vgw9nm7i5rtrf2c6r08j6zdobnpmzshfhahmpyevfqj44olzjonxypht6hcaytdewybfjkllb8el85p1l9xav7p75r8blttcr9w39qt6nw1b3fe7hpymfyw9ydtumar52q77jveg6rwk4g5ba3i4exb7685j',
                detail: 'Esse et est in fugit. Ut distinctio similique accusantium. Consequatur asperiores sit magnam sed.',
                example: '9fhczhozr76dikedl8qejv9fd2lwu4rlfske24c7a1gaiol5810swuk9zd0bctfiz5hhc119o82um4tub0rmuuintncc9nlsuv49qdynlrb4ikunxi8fqzd77l8fte7eo5yeouvliy224azhv8e1l7z7fak40us0',
                startTimeAt: '2020-11-04 18:36:40',
                direction: null,
                errorCategory: '3d1u8iowopiboarnefr46cswdnta5v5be8imesxnoo7gi56nm2ccbazbpt9fogxmnrzhba9931bbud5u3jo4p24dnusribk7fuj1sxqoh8dvujoq1rfyjm7f8ui3argxp9t65eqrjd01zlunknkxqok0zuij7yp0',
                errorCode: 'g6ruzi1jvgkkth809sgxydc9hkfuuwzmxu363onyab724brsua',
                errorLabel: 969509,
                node: 5220449483,
                protocol: 'k60tcxdgoubuk7a8gcnj',
                qualityOfService: 'g3c53sgx32fcz8o3kynp',
                receiverParty: '1czdjyg0n1vm1kn1976l3sopq4505czmulew45ve0a42yipqg4ca1jmnxln0z5oe7amfud830nbst2hqjcgcr8qbosrrqpdx5j3gdplgl5ze2a756722zu6lx5svstun7iq5vn15fhykbmmfa6bktuo69x18621b',
                receiverComponent: 'rhklkbyopya9db9jevnki398yil7me2eoluok84n891azl198gp2wrwgtm8w37n76tjze4fb0nvzvo1jgh14y0xb2vse3foxo25uk5pycqmlp1dnxdpei1dvit0wf8aonif3qww00nr1fc3pp7ezjyalyfk6slp4',
                receiverInterface: 'bm2z05yzbmy3y680cby1dmp5jtud8hqy8khlgapqulvsorkvwx7jd9qircubdorlnu6vll873ve9s0cxx20s60n52r5ir1cmzii13f6c50qsz87a6op018msh5qno788wloerdn2shih7w6jdr2xvq9acidhgeby',
                receiverInterfaceNamespace: 'enpdzydzmlgnxxxeooue9b4oi2t1jl3suu95fbgp4foagh2od0bja46pa1uehimpyf6xivghxik7yfmxq106q5ylxr8gvw42q3zk7xov86y736kpatcerp4igwuj7wgbsrdv12o2dtdx8byeotf5v2rcttd33b0j',
                retries: 4073347878,
                size: 2190642299,
                timesFailed: 4941695002,
                numberMax: 2218307025,
                numberDays: 1151521570,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '6qicr7oeaf5o2g7klcvu5r5qkg1yp1krs397uj0hqmgma5siip',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'luzqylmf1raa7hk0tykl',
                scenario: 'w27bsz7kzid00xynp0t0255licbjy1v71qyvrp6wq2o0ohlyllbvmvvlsy9a',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:39:22',
                executionMonitoringStartAt: '2020-11-04 13:21:46',
                executionMonitoringEndAt: '2020-11-03 20:33:46',
                flowHash: 'gihzgjr5th2x8nqxdtr1go4cach888hwgy7u7b8m',
                flowParty: '6iipnwotoun0ne47mlod31cpm8n0ymcifmotcy2njddxhk30kxgsngcuk2wp04r401k95p6apctg0gst63rgckhzg0xk8h48o4eh5rlski9vwr1vqpotqk4qlpvgm9r6fiw52px0pywh173uxk308sanye9d6eum',
                flowReceiverParty: 'bszgxrv98jw3s5zjui92r711qgk7mknawpngv0bye9mevup0ytncxnxpigi8czeknwpw7hhfnltxp4mfz6cmdht549qaopvn481a877wjk5u883zyapvxbyvkgct5omemtfaq2b54t5dq6urmpr5d10in56fcjya',
                flowComponent: 'nrcm7bv9981y7h8hk6zwp4ves4pqy8s2gzh1ii6hq18qw0wd9tz2v828cdorbyqf57xrlpxsjjwkyy7usmisbwnnqjyamuc0g8m9xf8vfwk3h7m6nqrdvycsrs6xlsq8y4kkm01xy4fg6xm51buwb3l8c5on4adz',
                flowReceiverComponent: '7sfbevkdc0h728n4fkh5pbmfdkvkpt5lotmkzc8o5rwycyvh3nlce3cd1mn27qo5gi54k7q3m4yl8y79hctjlmxvhxgijzpp4d3zy2l1puwnsx0w3q4o32uef0ca7tvmrfkemkloklxf4gszwfj7yrjnbze1wfy5',
                flowInterfaceName: 'kswt3xtr6u6u6kghb4qxfdkshwkxoo7nswl8ccehktkqzxgq3opi10u2r97it70bpem3h6sa7qc4qoo6160zb4j5tyo4wb7d1jwaqfofycetg857p82d0oybwses2i9gwk2ahi58teq4nf3ux37blpvbriziwecb',
                flowInterfaceNamespace: 'x9rgu1v8sn6qamrzbfzg92y2vjzb2qcw47ovs3l7o8r3fmi1et4re6wxyfdv9dqmkcfoywl7svb85htd17zwckak4xompvufi5bc8emyy5qzh8nel25xgw5wvlgar6k3bje78c8x2p5l7rqrp1se1b1xjb1znius',
                status: 'ERROR',
                refMessageId: 'u9l0svlmdkj3740zf7folv3lj48ovtydkuvwdjtj715vypg2sou9r93cpwvut6knkgunzozbi2ib8r89ppyl09zxkrmu3ornamuf9cceqfioxcd302280whkolkz0hj8gxadqlvhtcprromfstokv11sm7z7nc3p',
                detail: 'Dolorem in laboriosam blanditiis assumenda. Reprehenderit molestias omnis quis accusantium et ut doloremque. Illum vel dolores quisquam. Vero molestias nisi quia at architecto quia iure et. Eius numquam ut esse dolores vel similique.',
                example: 'twrvrp9om3qbm7ayx5gawywnhssltt8azfsm0pauh2z4d0492j9yp21iodkbuc2xitnf6aa7awfcy1k58pjbou4t7mh2m4qfe62d5l6m6ybb15yqb687k9578wrqxh8zix4c3pjhiah02gjffuk02g2uxfc3p73j',
                startTimeAt: '2020-11-04 04:45:25',
                
                errorCategory: 'y01i5qg8oj3yqz169v6qj7w92vkgghvualuafryl36dd6whsc7pwe20meddcg89bb99ebpvh23lnbhxk7kwijf5z20u8gnpt32aialegelvxdowqyb62v442uuk3xui1jpn8p9u1317120ubfc3vl8zg5txgmq0g',
                errorCode: 'gmljkd5idppsue1elt3wzrhnh0evx8twhn4z8kpvtqs93tvauz',
                errorLabel: 683965,
                node: 7743455282,
                protocol: '7gk4yv3ct393ktpkyojg',
                qualityOfService: '4vdk696wuv2l5k4kn1qq',
                receiverParty: 'yzrbgf9zhzcl3k75ivq55wcde35xigsvdzpihnydphevl1pv6doofow7zaln7z9i0u291hronok8nb733fs0j6rubsfm1lsn346kh2p4nmg4ljn9hh50prc23xkl9jxydifyi1pxn31dgdjgipxbt47t1f6fg0qq',
                receiverComponent: '6xks7biyes9arm23vmsa91lxfsfvdeqcry4jrrx3p4gez2bq2q2o5007aa0z5wxgbemn51oa0xjbilx83h92e3pic9nifpgojzg9vsjm3xcna45pxcfkhdor2z4vbpqyqn4pf1vk2oglqtivo9kmoqpmb1f9w6bi',
                receiverInterface: 'n2ffpzs84t110ovp9zsgg7lcvbbawa1xmdrgkz0nq8ykq5ha4vdpb3w4f0568xfimrv0bh30wldjkh83smsgudl1h8ckg52hmj1vayofu39voyiletjeoacxxhh171ibhmfb2ux3psliaadynjkh6r3a9mvbv6fs',
                receiverInterfaceNamespace: '4i96bob0yt8fz45fjel36p1s312zy81vj05jo44zz4ktsfq03ar95tr7zc8a2xokne3jfmae1iaelsk09sb8cwn5987w89bz2svzx73y0vzoaqg6osvtpsuhysob2xmb7rtqivy50z43lrrp630qv6m6solhj7pq',
                retries: 6178985699,
                size: 2598403462,
                timesFailed: 3177158192,
                numberMax: 9640308149,
                numberDays: 3128292036,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'z9lpo9alk97amn7v54em42jbk1d3fzarb6kk6',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '20o24rfzr7zfddlvzdqhb3f6nyrl5kuy68lsdczsp3tr0ekud7',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'uiyb137ijwrvzt56rx7o',
                scenario: 'cggjgzjnlkrmxnytt1tjnqqlwcxxwz5zid2qozfctwfu0jw97rmuh2qz0j8c',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:46:28',
                executionMonitoringStartAt: '2020-11-04 03:03:02',
                executionMonitoringEndAt: '2020-11-04 17:41:09',
                flowHash: 'jditjrqo2a4ukjivn4n5708gja0vtx2zy0btn2jj',
                flowParty: 'pxt1u2jyflidt8a6ydx0uahbm4w4h3ow7oc98zoj1hpanc6dtwanf8gssh09bzu825qzel2n6ato1tkttrhybat6asqpntvqr2vamoc1e02fokgkyu5y9wlobnx8kg9d6999quygbkymlqgasf389qw8aex28ob1',
                flowReceiverParty: 'j6gtrr1u9oqrocva44oorzn73qfsi1x6ifksj675ccn4c1o13ii9v0hgp85nnoff79yqnbeljb735vtuv7atfgtv8c2dg3h6t9wfote6bciz4p8o5ctx1l1gtoktph8xa7rdrjuq3o4d0mhkdus7qsb6nzpquxg0',
                flowComponent: 'es8rz7zzm06a33ajjrlqdivl1a42kg3rgowprfvtr0dg6rlu60klrtg7psf3ykdv98aj0z87t4h4qyl2elnpbqtja5j668z4mhal0wgw0ye2nmo5gnprij6qn0iwtxr0fvhzvjzp9xgtg2nmuxskar430h15206c',
                flowReceiverComponent: '6ejxl0qleks50otrssorlv8jni73t3wqg8ujp9301qedssxp46i61ldoewyj26phufwo75f8e2byzzz1diwgpu4qbnnncfcavkqzcl0bqq15vhpgzempbryre9013je0608uzcpxzssckvqctxnir0pua2o3aumv',
                flowInterfaceName: 'gjwexkn5beew9rzy6kfyg0is6t9en7u0rxe9wri51xna8kqms894a0qfytcb7s797gxcut801esivkqrovltv157a4giorewocnmnbfsg4892y06areih1s51oq1g183eum6ctsuouvrz224pz7j8tjlujfyg7vq',
                flowInterfaceNamespace: 'dugnyfbnckw73honk1ih6pfewdlwj37nznwmkmflt5o52r6acj3gkvvr3c221kus5t9syh37fzhnvwkscug416b3kbjtyqpxqkhpim8quxfxrvqefesdcepbmn49jx6yhjph431v2256r6lxn2x56f2a8ewjx78w',
                status: 'ERROR',
                refMessageId: 'jclpx11zsjentxlqpboc6or40eo8i10l4wqedlk06s95ygwegfenqj3vrjjj489zpyznmx130jajytj8mhzwelrlq5z66izx5j34rw5nb8gp08owuq0uriljwwyl2a03o4lv30j1keq7o7xfooqmc17twi4cwl2q',
                detail: 'Consequuntur et delectus cumque consequatur. Quod alias omnis occaecati et natus omnis vel ut facere. Vero in ea a quam id mollitia cumque et inventore. Sunt minima beatae nisi excepturi. Tempora recusandae odio maxime illum dolorum tenetur nulla.',
                example: '6ycgfs62q1zi4uh1o7j9z1j4yil7nzh683tppm4btu996dtb09qfkf1vieyhm1b6zik1kbgausak4evrgxes287qkjc4mb82nzt9bibl7jx6vry0egpkl9ui9yfzrdsbag769x3taj2wb0js96asmxej8ce53an8',
                startTimeAt: '2020-11-03 19:55:49',
                direction: 'INBOUND',
                errorCategory: 'jder83dcqwe1i09vw88abzltnk5nnxerbzqxypm3pwsson82o8x2to30ljnikpwkzbzs2mahrvf9r8oxqpvxr5ej1omh4ajzfvp5cegg5bruws7irndb4g92htmazt488vdlzi8cjyxxueiamdjqsldwkr74cg50',
                errorCode: '7ehzap3f1arvnbe4sr419urkpmzla5usuupw3vo2608j5fmkk2',
                errorLabel: 127385,
                node: 1801473656,
                protocol: 'u5pqwbvxwczqrxuupjsw',
                qualityOfService: '52yfemxs3xsrju922nc0',
                receiverParty: 'b2n1f7vogpgx24j8a6ccju9pqbqjcjr9ngrgmjsyj32mehhvvp0lnub8hllld52myocgh7igig3aybd8l0e1i4grq5nbzszji4zl55f4e3khktss8k8zz0q126nedjg5azeq3tgkrupue6460l1e9ede2s86htpr',
                receiverComponent: 'ews934re31sykxve1ui3oiej39osfkpn1tz6h3cq1o2ur2h32pxvzm2oju5kenfbazeqdpikybcoelifqcnnxckllprlmg0wfrpsv3rgw99s27k5yvcf4u80ibc6ffxar752pzwn7xglrjptb5kr1w888szj43nx',
                receiverInterface: 'bum3cbzqsaui1o4bgfi3kh79hv8binp9v71pqz89vxtf6jjiwar7ycalt58mk88y5npaqx3zvlpmaqdxcnjk9v1166hozgskmznvm017ysfav7jtlhcbpytz7d88nguw6c5iqv0unxz1zlpb610xm9xy71xffzko',
                receiverInterfaceNamespace: '4wd7pqjy8fuem0kfc0yvkfc68tgxf9v1gxs897976b2kufvjks23x4qrn30g054kp213wfwva25of3dil6dg2lnz363n94wvotmxd52dinao52nc4rdjv0n03q0pwsmthip5xfhajtr89ucy1zvp3j8jz4u4lm36',
                retries: 9478959307,
                size: 4330166043,
                timesFailed: 4584366667,
                numberMax: 9908103856,
                numberDays: 8182637451,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: 'g7wixgejgwc9gn7zpfnt56htzonemba24yidh',
                tenantCode: '10el77g1fuolnuis80nuw6c75f1dxhteodx90plcpwwb9ve705',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'rcghus2xdhegwntvt28b',
                scenario: 'tvkpb6bxeooaj0jsmulk13hf9bnwcoh81tzvuhlvcvy0k71wwt3st69g1s5d',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:44:19',
                executionMonitoringStartAt: '2020-11-04 08:34:29',
                executionMonitoringEndAt: '2020-11-03 23:34:58',
                flowHash: 'jj2sdl6f5v6n3ntpj7n4uul08becgs0gxnkinxg7',
                flowParty: '00oql2k8y31kdlpb895o9zf8kfprkqyw6mpw85kv9lwkpqazsy3q9mm8erendawjvmmk8iwkiko710h7simcqczoqd6v6b4ahcbvqs82cvrk5paxw6653hy2jnh8bd6t9btwefypz1t6g0y1yxt2l5rkm0g0q5de',
                flowReceiverParty: 'qbemuygwikw3w1em0mtsq0m4ec3d90axafi1aba1b4s8gtu3g69daz13te02tcyqh7rp9kmdaf2loltjkdckbeuzk9378lpqoa5h1cxzbtj2n46rgv8jxved7s6k4rk48v0zfkh5gaj30azy5xc63xr5x9klcpj4',
                flowComponent: 'r7dsd9cskyy8sw2pq5uu5t9mab1oxma6tasraqngia1pujaiivh3hx1s11alhlwafmo1ju1cft6o0ndo47zawwv4r64ildite48f7woion80z992258apmk4b3z6e8x3letzgkxnuz2dgppnj1w786vllda2vv1r',
                flowReceiverComponent: 'on43ys82vb1dc8war0frtwa4gf4ybwbn0igcmk4tjp5h2aed638rxs1isgtc3ir575rw4ypui2puz5fi2bjg5eqm9ct00z0w20u3ixpnxvxqpwwu9aebo6mkxy80n16w25g9z6ej0ae2dag65mg6pg745g2zpwqd',
                flowInterfaceName: 'i808ptgyj2r6osjtsmc09yym6ur40pkb6sa8mkye0ckxyx1v01r2a6pkti8z623n0fnqkpbgrb3o0fjweaip3eni4fcliado4hqkt4etsg0q17ymqev4q98gv4z4r6tfn3siulzd3xt2kn8j5cdjr30qkiuapdcr',
                flowInterfaceNamespace: 'jpoumwep96dkkeb3a6mewvh3h5obmzoutywrid8zbfeo42a9w92sdk7eyirf7vk7ltr60rl0wzpopa8sb0llwbsypdtq3ksgnr1vauc5uee77ewwuzfall32xwvycove3aca439qpdwn81xmjdj2ef382o50vvo1',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'zq55fvllltdxg6yhuavc8vwsftrg7e3qrp70cq29a42squp44vd62hcm7w47nthss9w0ppn9ekhegbrekcihx9z6taqd579lef4cc1e7fn153ezrvi3zq3oium7aasvnnkw5zpf7c5jti35plxcrq43agbkm5fpp',
                detail: 'Cupiditate ipsam rerum sed non nostrum consequatur. Repellendus earum voluptatem. Ut sint repellat temporibus maxime. Debitis ex maxime corporis a quia eius corrupti accusamus ut.',
                example: 'cuj3tv95z95r07p6hzlu411bt4babt5bcglrgwj35vcd090840ggjna5tluvi95n1pylljkf5pp5518oss8b4wbbddivtefq7ov55g8ipqe0vzygfjnk7ivssk8zl80tqiiuk85jdq6ga67jjis20wwa1pqc0mye',
                startTimeAt: '2020-11-03 20:58:46',
                direction: 'OUTBOUND',
                errorCategory: 'rnz113qcw3knydeqenl1d1n29j7fhe4kktsz55blnck467cmgboxwyvmmwggr8ojtjng353g7bbsxq5m1crmm78j0b7aiex5q5hrxh11zaloecrx2pzxplorg2qbi2p3kzb8sphm0muu2j6ohuwbf7db97kz2uer',
                errorCode: 'o4wimuq49x9ujbmib4buhd9f55tlit9trzhxthaj0s4f3rkhe0',
                errorLabel: 423484,
                node: 4882328192,
                protocol: 'rvc87g2wpvxc2crpts2r',
                qualityOfService: '200nvs2f0czztyydfmo5',
                receiverParty: 'hqoijyco44a1mmgs434imeth79f90kvbajvcw0bmj4x7lxhcopfgdlyb88wryofk9mj0wqaft7a6vm40x4wrlmlxakuonava8ym2wzogcwy7t7nxxgvosa1qo3sd3cd5vy2wftgut0j3rulfjjl6qazmn7evs2cu',
                receiverComponent: 'mxecglg53rgnty9bgf7u6bflpntir9vrg8s9znr77q0nv80pj7gpf9sil4ma5i7v6yofo8kt9ksp2w7g7j8ujov9zj9d52k5ivp54m2oh1i96udjtwf70elpodq5vgcocx9uzyxtspreh1dvndulb18vzxcn9d7i',
                receiverInterface: 'ongjjz60bquc6b8ou1n1hgrblm9dubpgxavddvmsbbbi3yzj8z0pz3127qygre70hbp8xwqyt1dbevouowfpd9fx9z4je35k1q3vmduvkn4i7lkwtzdxkqvw3bfp26tpobvc4avt54mxsjlo1829qr525xt9lpo6',
                receiverInterfaceNamespace: 'do3fpihkmedihd55d74o10oilol1h4cjatigpi1n1jg5im9rgk1aj2pvjk58vi9jtl0pk0exxn630g7z137w46tqomaroltg3cy4a7iisddc4cyniw6yja76ndjlywotdw5u18e6ui40uapch91ci0j3wmv443ml',
                retries: 2360521642,
                size: 3534363511,
                timesFailed: 4197460513,
                numberMax: 6442156527,
                numberDays: 9257312596,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'trzr6ztogatcbqqs954a9lgt0pxmberl1qeybpzhl52o5agm4b',
                systemId: 'tvcckxc34g442t8xdndv3439xpvy4yz006ohs',
                systemName: 'b0wdk7rdz1ckx739lqjg',
                scenario: 'qrnvr1tusth3ry7z3if37b5ebuo1gpao0eundcweu3pm9j65zlkujaiznhmm',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:15:37',
                executionMonitoringStartAt: '2020-11-04 18:01:20',
                executionMonitoringEndAt: '2020-11-04 06:11:24',
                flowHash: 'zvy5do7vfqowt9fyjwinymh3xp74n4s6ut1lluhn',
                flowParty: 'nw0dta3c71vqhy0j6s7kausp3fgqfbhxy8pqektkfl9nwi6h4j0g84829qkee8s1hw237hmsl1kjds3pttljj2yo7j96rlkrb50oqzjsniy28mxqgygy95rdnbllc0l6h8r915u7br4z1kbvo4lppjipt06wkzx5',
                flowReceiverParty: 'dvb10mbjma6m6ygeauzhjac6bswlgxwgiqhfgge8z5h9dfufr40g4cp5wasflwhoi4gek47tmds49cpvsvvgm1tgtfsyrg0y69j5jj64cg6jle9030rxzo9nxhcqkqwld02906dlupqmihb9q26vo0jekxmkmloc',
                flowComponent: 'c6kkoxqnbzf5ub42g5bo5m77sxharhw1acol61jeyk9s48ek51k6iv6yvu490xwx5zquxxhnewu6my3zbmoevsj74zo7m6x0bmhyfbd56l1ahb77oysz023urg7z8es83kp9l3n7vdgkzdf4u71e583ta6cyyi4m',
                flowReceiverComponent: 'nhohhnqv2t9bb43budvlotevt4isatf4yofpswo34cax0m0ik103ylu63n2nfqdxepec3ssw4y1jd7xgxhfgvsq0a61qb6c24eph0w7jmazra460c4cs53ckkx2g0yb3bg84l3hkbl5kc7bmsfz4x0vp32r3nsmf',
                flowInterfaceName: 'm5gnnv4656hnpm8yvdyvx2mbsh8jbckfr7rhig0x2i2omh2dk27hdugudxj8ltsrdxndyot3rcduoz9piiqpgx8599ucs4f71t88oj7s302qyqqx2sjxs0k5ppdf9w192m2bhabk1o8plw2opjxj334xrg2tcj0d',
                flowInterfaceNamespace: 'dzvxs8nfapprhsv5ssw5tcb0hunnznj5fy3hmowi6qnam19ie42spuqdgle4fo4vswhdw3c2rqd8tdvbmopc1bnwsehjvoaf1pmwj6fzwoe2qsykxyl56qi9y7z6jn60ogedrj3lb57twb7n3xsk8eiutx1836m9',
                status: 'SUCCESS',
                refMessageId: '1weziycf636ioy0imajb8b7inou7s61b6jmbezmqygi5dswpcnkig3woqmox6p1e051xlsyrvf6gdkkeh2mi96lg0knbe08tn63t0mpxl7c9lxsbtmgo11jmkuv3tn5bnxl5ox27xm2anx7jwzg7ot9tbk1t3tza',
                detail: 'Eligendi dolorem qui veniam doloribus dolores dolor deserunt. Earum tempora numquam in quia sit alias. Sint et et doloremque veniam. Assumenda odio cupiditate neque consectetur et enim dolorem quam rem.',
                example: 'svrjhambl3qf8chzh6o4pp2h01416l18x4g0t3z66vxtusgsu7d0l7jza3gaecbuuyi6st0azztoy3pzw0hewq9y124j2t4gsmieefhbqcvad0xxgzyelntnkl44x6g1esvrpopwcopsg55jr9x1u1v0h6jlamll',
                startTimeAt: '2020-11-04 19:19:57',
                direction: 'OUTBOUND',
                errorCategory: '3uyl127lp1lw332wy7yf07ecywluflmd8dd7nefzm070cjv0mn0xwtyjf1hziy9zaf7wiv4xj6cny91r6vfjl49zga5k8yqou3bzx4i8aow554ou9kw9fjugomhr4px8qepkurewx1m21yr6uwz5lux9tefzvqvp',
                errorCode: '1el14b7x7mfoe68u7m0kzyqj0sjju8md8a0q7zabosh665fd1t',
                errorLabel: 686017,
                node: 2531715687,
                protocol: 'p0ksz4f5q9pr31rh1ky8',
                qualityOfService: 'f6mdz1je7aqxlpnj9wqo',
                receiverParty: 'l6vxpx1y4fule6g8gvg3iwoffqs4e2bs5fm9r9y6pnre21ozemd29bozotiz80c0mnpoiql7zo1kjzw5axpk7heotlejttfh20pr2sv34rdcx35wkdrbtqleuldkl123b2knqf4wfba6cjdd0huy2v34x9segqi3',
                receiverComponent: 'ql2pntdx0aib112w3rocvz8tvqipqkqrgqdwjoxdzlgmg1ovg9n7fj37gkpn5xfnpjz29ppi1nrrb8a94inzzyop1rd9sgypop5k4vkjhkfxkg68smjc3xwb2mox2t9f6kk153gqi4n4p7whuo8gjlll3i499c2y',
                receiverInterface: 'ypt23cy88sr95zzzzpt65h7rgpm2i7xceyijfefs2qnw8ywn0dkk0dtliuyk9uixtz4he4nddkxm7hof5y4wcv7as0kpxtuuodzq63hj6tw0q6jzv46hje07cfo4vatxaiz3tuuoba9hn1avopw02cma5m3hrm1o',
                receiverInterfaceNamespace: 'j41fvsq8a1dywocigd1d26ereqdci0j33ulrx8h7vzy1xwsov009vgwq81pklb2t3ytdghibwid76gktgbsdwu8bvw6z2tb1lbwposnawnrltv9k85a7cffyhxkdhfkx39wdla23j6r0dosvy0x432wu35llyfcg',
                retries: 9048795785,
                size: 7487063552,
                timesFailed: 6519168349,
                numberMax: 9238979845,
                numberDays: 4289893689,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'knxez7xavt1xuwlhpi14ksqppbo6dd7887ycmlpuyreo0qp8i8',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'm12cv0zd94tbting3811',
                scenario: '0kzws0hjfo9sh1detvcnm0v4uwyvzmlnzlq7n22tsugkj9mgne3xk85yjbcz',
                executionId: 'w6who65m548ddvzy4e9v7lvncl3hpf8vt2j6e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:50:26',
                executionMonitoringStartAt: '2020-11-04 11:54:29',
                executionMonitoringEndAt: '2020-11-04 05:31:08',
                flowHash: 'bttdkrn4uev14zhlfkpljusvs7ft27ib83xvj4g1',
                flowParty: '8lp2ylcmejo1upau72j2wuji5s6mr2fwo3tsn633mqnk3xv8xg0094u7d7zyf1z49rd582hfpyj5o9hcb3n8cfkedghx7yeal5bd2saxi072ux05e5wxcqh59wlp7oqitjxq108auokysij5hiojs869wov4vtq3',
                flowReceiverParty: 'qudr5117xxq5tdymkgmxn8b09jfe6v71yyorvqbqqtwuh6el0zj6lrrdfusyyl3eibo1app98yyhc1foe04eso4uh7bije55n21kqljm1h1nedzhjeb1ixwf7oagzgq24n29i6df7rfzrfkwlo9qnskm7em34r48',
                flowComponent: 'v45m2i8uydse65eh3aszpginmdxduemoqj07azmkje022bpy8euk76v0kq4uuy6ywvgvfrtdx5p9synhweeimx2rvyncqd0a7ghjtcynozqo6xhw5uohjbglm64vwsxhr0o7tb2tyiw5298zpv5t15jxnrwe3rce',
                flowReceiverComponent: 'xmed4m2akvv51bbhj12s7yz6pbiq9t6u8kjmqyg7ta5vo69tvw1jiuet3slzkwqe9yd4ouktzrrxavoa61fn1rxfqwidehtehdtz34ene42jkwoxocozdqyk9xe4ou4dxnckfx3csox7q2r716is7m0ueuo1mu0v',
                flowInterfaceName: 'faocfnw9b9tyup0b9h5wyuv69k06coqofpdwbhayroptclsi3jdwjab7gz2vfmdvgvbzvzu29iwfib75pbucvab4t1e4ba6cw48wgr5ucrhoy6upouls9h0gsgfmfc4yz6iyhnhaf5mta83049bupvqisuihx6qd',
                flowInterfaceNamespace: 'ycnd134cljn9qag0d8zp2tpalukj80utv9pinolpvwsjkuvwre858k073wotcb6vzfn26xr7z4pye2bxq63xe7aiu9jiporx62dduunmlm6cvdm0z3f8b34qpdicqw0jfsjs56z8en91m4b0p2zocgjaes9aq4a1',
                status: 'DELIVERING',
                refMessageId: '68pu0z2gblnva40dfaki37fhmrck6vmittq6algo677odhjtu291ei87jsmo9te6qs4dxx15nl5jg097pc3fzrwlybzgs2xypsget1k1jq094lcv9izmiefy18fhysjgqkjw1jrnrs3ujz899oo7k6e5dfej7wnt',
                detail: 'Ducimus non corrupti sed laboriosam similique beatae et. Voluptatem necessitatibus amet maxime aliquid sint distinctio exercitationem. Est repellendus aut inventore veniam reprehenderit.',
                example: 'n9fid7acd7b60tn7uih75ak7f3yiasw7tdrvlfyhmemrh4u3a88epnjq2ix1dh9yiqv3z4t6d6yhkga7fpemv253nnvgvpt166ef4ofnidg0vnqzazn6z21azm7i7f06mqrc6qsjvp5o58md5y7zq9dcqxn3o9rj',
                startTimeAt: '2020-11-04 09:52:46',
                direction: 'OUTBOUND',
                errorCategory: '1dyake6e47b8ro4io3og9wamohvyuu33uuzbz831outzo0zjfmk64aybb4sun680u2lfi3uwgrrss5im8okcuq5z01nflrhhjk6q6gfc8rs2arydi4th8eks3ihwngv8ik03u26a45r18wotds34wl4m52famea4',
                errorCode: '8e2vx7w70688q9qdv25i817hg6ggdr9pw6os160ccvs9rhg3lv',
                errorLabel: 687506,
                node: 7804128367,
                protocol: '2dzd2dwkpyou0evrfbnb',
                qualityOfService: '3r2to3g04x3ecqc2gs73',
                receiverParty: 'ytfr1xger022e67pj0ybg0tu7z7vutk12yanh7zwxjfrq9qisehf6aq2jqup8hq6fz3rhfgwyqhnhk3lph5myc6wh1m8k51kqgsvf0p7hdnrmoesypg2ost06gqfhz6ikposh4scf2kulb1u1vfs74msce2q8m3h',
                receiverComponent: 'eqmsqdgmhiscz21o1uhf78po9i0trafwl27evwtv73q9nn5rffg61x7ivfcvdf78tylk6tmodd0kgd4hvtqpq115alm4il52qzdzh7tmj17zwkzh0pdmmylar0rnpflj4kqzqi0k6pf92q1js75r7c3xmhriq6lb',
                receiverInterface: '03lhzja1fxf7v48tm84ejvhyns88ufds46nl16s7jh0lxj9sjs81kh5b6q2v85za5no2r82adyiitc3px87nivhhziamczncwl8omo2h7ze3jvwfgmgu257q7y8lqulx8kf7yqygsvxnj0x5enbezps8wbh8qke6',
                receiverInterfaceNamespace: 'ixesa8lncp5zd3o1e503283jj6mw5btcalrjr7vfk85j2vjg3bom9e3rmzs0l072dmm1yayvg03z235fj3hwe0zv8pwhzuvcmryzwnyavnk45u2f035ej3hzmvc3dzusqwzpsepqvl0svqvpl6zf8scae9bfhej0',
                retries: 5298979284,
                size: 1620765804,
                timesFailed: 5876820197,
                numberMax: 4987723737,
                numberDays: 3786111040,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '1gj09ayzeio5ly6uq997lu8k78jv4v06m14erfvo7qno6kabsv',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'ouo2aum9s69wnxvug9zn',
                scenario: 'pdiib0id2lufaw4nm9gm83r6lahxw0e4lwljeqct0785vo877ajlkjbbxxjy',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:53:00',
                executionMonitoringStartAt: '2020-11-04 11:30:11',
                executionMonitoringEndAt: '2020-11-04 01:54:44',
                flowHash: 'pa8ofdf9yizzt5s5u1yromo4ubivafs1lpk2qgdqz',
                flowParty: '7yup57v2iyekrm2531481itiigb44nsnkirpp9t39ms1b7g7h2vu4hhtkeb7ncglu050o5311zqoo12orhwlxhatsi7hpdkqp908033uj1lk6hjsvltkj5y1d1xeb18wiuf5rdkd6pu8wjbctb7qux5xj1nfrdff',
                flowReceiverParty: '9462z7sa314535ais0heds9tqkyd8h9oxlhj9alj7dlbafazly06frj8hlj2a30lhq32tg1qtb4ljey536drgdr034bjy2swbv3ogroscdk5tse5atwwip268v3ogg5zsf0sjqd03emagyl6fz46mgg06j31iog8',
                flowComponent: 'omi7j456o7g2wl3c1369m6ip81wsssn1ottm0o52v42zocz6p3lno05xhbhu6iipjjys44enc407044mnar1qc7pjz8mhxas3sdve6k1plsyq3w1qveezrlw245c3pzvvtlf9ltg5f2tvdfe2tjbt1nyiywxpnnh',
                flowReceiverComponent: '19olg7um62sl1t7ckvumt8rtt6nojw7qzjj7d1oxyuwwwufkdtog9l24nejfuntyl1uev9xkxowi9xhfrbsy2edid2uc13f4s23jqglnq0vaqb0sakgzgfkso10801huw7gxanrc2bhj92ubr5q4eh77t5y3wnw9',
                flowInterfaceName: '5ynzah68jvmurh39y9eujjlfyo9ke2nbbu5c78s1jldlkz6hv3na5pzqit9rch4px0s1zl6t61ooftik0ji7oxeei2lvz9pzpw8fagqnml0rpok8kpadph7p65aocm4pq0pkz0yviv5qjssihhml5qvgln5u4vns',
                flowInterfaceNamespace: 'ytw19bviyvkgrrsr0ag8n3r9djsrmdlhf93v88dvp0fnlhnbrbka16m2ngx6ac1goohxcwx9icyju635elmeynajjgc1j2ru29a9bpdy9ci6nu94u57xqaannk1xvoz58luixgwkorr9mvcgz66tnyymllb1z4jt',
                status: 'CANCELLED',
                refMessageId: 'stcazqismcly67werredem1bvyybhh94oi59c4tgzquo367d550kdww018ai3kkgvgy8vdlr2u1mexsmsshbxxv76fbtu957eu7a1dora5n3yc77dwnc358irnme5p8ghizdsc04hl9rqnsfunm6xqzklyozi5kj',
                detail: 'Ex ex non impedit expedita corrupti. In asperiores et voluptatem dignissimos necessitatibus magnam eius sit. Rem molestiae assumenda iusto et ut. Quisquam illo suscipit officia eos tenetur voluptatem ut recusandae adipisci.',
                example: '8wlm3eg25597gr1w7391t62nztzgc88ssq4qbvuauhfkmy9emt0e3jh9rtpwk76yusfn3zkk9xf3hg6ojcrrii8dk5gqhrsup1kodfzu67op8od177iptkpqzmoxrob3zalf4831s5pe8ip2zduvg75uyugtewek',
                startTimeAt: '2020-11-04 08:23:10',
                direction: 'OUTBOUND',
                errorCategory: 'z003lbpbonbn393zcrcdf4wfkmj7i6byzzhh6pbwjzqqfau0vg69ft6pcb8nxjce897mt0x7d1sf322bducslr17fvm07g069q6xf0fgmudm2wyopz9flq55dk5oirrkm6ok1p1w3eg1pdll34emmfzzh7imk1ne',
                errorCode: 'd1iuykdipqq7my5ldsfpbbeo6npqsv4f6tmjfdqrqhrvclcvuz',
                errorLabel: 151992,
                node: 7048167695,
                protocol: '0jfo2w2es3vjjosgqqaa',
                qualityOfService: '7k3jvwzmclyujw73yw79',
                receiverParty: 'yta0r9wkkpoxpaszcem2g6ekadbgwaujz838f1p63e8sifm3lqhqdbf8fwferi3q5xvcx1ctaxqa967v2p9dpbo68fk7a2d6b95y2vxopazsraolpnah8gzg4wprs1nhikdov71d5yhhomxh3dply85kelbfmcqo',
                receiverComponent: '1g2g0kfoixyrn96zx1tz6hhf4xs3dzam9ge1fvetoo5fndwaxfq53w2hr2haauxhscfxdbcr0i93c9ka694b0qpjx7gpei7qzkcn7xi6tz8euk4oxgm5rihbg98e2nwvnyxnzopc262zx84n85519t652d88r505',
                receiverInterface: 'ufy8v3klag9c6g1vddg1exhqcicb2s3rdv6i6o0zjun2zooa6pe3b4bqpluy9t08k96cr50ti3oopiceub4xwkvvt19j0oe33vd1uq95h153t59rsk636dofckufc070qq504tcld5e8da3r2moxirjuov059ejj',
                receiverInterfaceNamespace: 'jj35qewegbf3bhiylez3gk75p0brxif1p5g7d3wm7jz7x92yy4eank1hxed8te5ngt0gz8rr6uwax87cpkunwtuqmya7o3vhfdknfwjfqn5l6xyydoahft3f0xd9baasj88ug44067taayprwd8fl44lk9nrwhf2',
                retries: 8120472510,
                size: 9265283462,
                timesFailed: 9249260204,
                numberMax: 6175734895,
                numberDays: 4245274583,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 's88fwkjya2j57n74vvpuo40d2yqtinzgoe5g20aiy9lv53lqacf',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'gptfc9fl5hrv7vyimyfa',
                scenario: 'i4b9tjhsjp79b7n9kwdgvg568kjhni85r6rmzgwxs6fhnqb8sgukylugzf34',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:38:01',
                executionMonitoringStartAt: '2020-11-04 05:51:27',
                executionMonitoringEndAt: '2020-11-04 06:11:29',
                flowHash: 'zlozqkrm1c493ycpegs93wbofdgmsudgn2b6271v',
                flowParty: '2wnnxasnvxprx1ou5ibsolz6f4hl1g6x9p3wzewc3j64ko6ybw88buuvx25xs1at8hsbafxgj6nbyi6aa9c0lpe7js01mr7np27xbx6jgiwo8iuuu8jhaofcpv7l4sfsfh0mpd8aeoisk8c3dty3sw5zf5zix9cy',
                flowReceiverParty: '064d7m52fb5zpg9sinx6srsdtch8bi4kyetsjwl9rjpvg33nff23tlc8k6mhfd0xzyhuhtef8wdnn681hnodn83it6yy9y2q1y4dpgp7sw6lheclsmzcobb1qgeq5c99fd9dsfy3j8b0d1leh25ftrdq5fgrhhi8',
                flowComponent: 'dk47kx8pvo2bjz0kwbc7wtwf1dpzfirgzuqs7q0j7emt5fcwbedk6g9pstq3i76cclrs9s74thmull4yqmq0poejnktc70egz9e1pzya7f5hxos8sngcp3dub6728nut6filxms6nxsb7di0ge87fabesle62i87',
                flowReceiverComponent: 're556v0ryonacixxvr8nzmj1ub1gmjlss9zwkho3ggn8ge4be9f1l5kl9mgm7pv0vyr0lkulqqqw7bf5184ttxt06ljpssvfgop2istr01qm5iqxmqxthigyzzin4937mu6cgqsxdn7w33ucl0tlmfhg6xrvjrkw',
                flowInterfaceName: 'emh1rm3xfd6bqqp9d61xicpoe34yiyza3icnxstoljs352qhbdz9vrm97jl1ahpvkoq2qlz5hcf64v4lj5f8t07fdt7uj768nd3jqr4wrlkxkd9uwyou715ahrfdjviagnw0ydgc4a9r6npr8rprd5sicvlknfpf',
                flowInterfaceNamespace: 'j862soo7yuqxhifrjq1ervrmxunlrkb1o2koyb0igqe6pq2g4s241xdshdty1lgulhs08uv8i1xk8bye6ui0401lw1m0ntvozpgy0vvznkg1oq6gc1amx1q4bm7h7rj1kbc36tnpna9ed3yosgo28853dvme77rg',
                status: 'CANCELLED',
                refMessageId: '7f5x1ygou1vm9fl1dail1m8ff3hab2bqm451p61gjsz63i17bcodrro8r2icp39mwy2ohyipuc2n8x5mjwpp0xanybzx7m2f1dw1h0obr0ad4h4sirsi5dqdq4i7oh2mpxx2u5ku0m86zra1uv7qzvpb50yilkx3',
                detail: 'Similique accusantium cumque earum fugiat. Ut ipsum omnis omnis. Quia ab tempora corrupti voluptatem. Illo optio deleniti fuga earum aut. Unde et ea quae.',
                example: 'wqbnl859yq0u5nlbj1wypiuzi3s3z9o2gxz1202br7gls0qbhhlji7jb5esuheczga0wrkaz3252ddjmuw1pr3lyblgcl2ls6k8yfz0n85zcuqetrbbrvzvevvynz8y8jpgg3qou8g8e5comcj63myrr0obnobdo',
                startTimeAt: '2020-11-04 11:07:00',
                direction: 'OUTBOUND',
                errorCategory: 'frum5h6tkpptjf2l4tz3v81g9ieaye7lwamtua9dvg92wgodg7n8dh7a1e2f0ey6ywsvuzlviw73jifbvr11zukhbsh0hmjk03sczzlgopqwdq6ankqh4igysihm50q5tkjwuwx5aw6cun555xtw1qnpgu287hxo',
                errorCode: 'no7gj4pilv9im3kpeg8facyfzr4ve47oq6740lyrh4xab4lcin',
                errorLabel: 941223,
                node: 5640654849,
                protocol: 'zrstbv9slc6f74bdc78t',
                qualityOfService: 'eem3c1w4eodjh9x2p75c',
                receiverParty: '9pv2m4qe8k59b961yv5cskqr5pxbnav3tb2xyspbiaiymfczqqk8i8yz04v36hanfv0ierpzc7qpb2kgp9pt7zxet6zlksc7693lqiyxo7frgbog3wipzwdn4aas07e5kchug55nxmyhwfnq1uso6hzj3ckby4no',
                receiverComponent: 'qq4omj7huzbg6ura2mng2unv6v4eynqin4sdg7wi7y5cne88j4526m3iwhytzk7bciujt1k4hd9ebg6u495r8ku93hgm8oicp867h1cdkqfktca3njmat7gke4jqzgll0hmec35wxevtgdd99qxye66iexg0kt0v',
                receiverInterface: 'c4v96103criwdiwgl4q8k3fhfmsnq3vdk4g9zuiq6ohf2h96wg9jub83xbtaeajanogn9h5z2y4gj3ckrrsutmv73rhwntz49t4arxjklme46603z7t6um4q2ytttrg6iz7jhfjolbwb80ykzb1rkk56kq7avq3u',
                receiverInterfaceNamespace: 'afaa5tp933hdqgnm926flykq3m1dm1ihqvpnek99hap0lzc9y0gro01d44tx1e7v12kj2o12gys1vpzztkby425n3ck0m5uc3iob0wous2m0iwrst4tgp6v8p3rjyse4n06nnaflrk920m8i8p2nql3153c77f28',
                retries: 1129913770,
                size: 3611800818,
                timesFailed: 9143324629,
                numberMax: 3138688934,
                numberDays: 9612716039,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'r1o9wivnjpfqo8ve3pyt38rp5tlvhmvsdr78xlu18fubfwz03x',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'kh3graixje5k8r3h2svg0',
                scenario: 'yz1k7ynqoiboex7v6zjodt1ldjv2q0lw3h4x5r48k0p5iz7an1ekenq3j7hx',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:17:15',
                executionMonitoringStartAt: '2020-11-04 10:20:21',
                executionMonitoringEndAt: '2020-11-04 18:41:49',
                flowHash: 'f2eho2rt9ms21gwe9q0v2208bggws7lbr8datpm1',
                flowParty: '3syf5i01v60nqtb6k8vu852nvj2xxheq65nwxuqdw2uung2dinp3f0dfzlz56pzywfh08gxy4th91p892l5txulhyrdh48xwl56hm5mvcpznv1pn1eiuya10wrw4g7mgl4odmfxsi5fzvve0sb3of7etmejvphyy',
                flowReceiverParty: 'tjhbjltfat9eht840lu0nvt4fk6te1xu96fesuywgqjja5mxi7gh5q9960uxurcyviweztrccgcg1onpfwwrbmdmud468p7feobkf5z5awr9soxefb072feriji2pmkoit3crqlm841277jaupo4i3qf7f68bezw',
                flowComponent: 'zq4tmwoshqibwquks11fmuhiv0dqbjb4ku6fzc5l2omn3omq2t1ae8n95ynsgmvnrhd43ds3fdmmm1q6et3b5wg3spgtsaegmcln1lv5hjhna2kheuaoqahk5x0oabu32eg34f92cjczmo5rb92ryovz65wez2g5',
                flowReceiverComponent: 'zufjvctgsp3rl2zus8ye2ovmf4or4vygx7kefwl48vi4bzq30ba0zt1c8p0xrvrui77hcfd5c082khobv2uc2llpke5ijsihe3x9wrx7o04jbpwamf1oxtg2xxzrsu65w7tpkfdp48nxmfnfszegrtxynp6semmv',
                flowInterfaceName: 'q3i8v5gfqtykthacywlkyus6ixwrl4hgnmr1chmoveoa4o2u3c9dje5u1q07236ch7uewuevfn1q8aaqu1gjmfaa9j4v9owziy58luk1y7r0thxecfrlwwmn28a6ifkgu9b1s10w241fsgvkqoqgn5sgf7fq2pws',
                flowInterfaceNamespace: 'gxjh26nby4rhttfvby4x6a95x0u6uyws2penupy6lua6xc0whuzj3gsl9ibvo5v197fawwr9opr2hzvie6p4dyw134dfxdcqwquu33t62ysrq166hdy63xgt5tutpelo1uqemkeojoy4ve7di37lw951jdhbxyyd',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'tyq9amyj3b1lp1rbi6dbdkmxtmm15xkrjw8rfgeghumos5yn69dcbhvpp28glzraah42kbet91aauthmgg8gegus2yvc5zo748ma21wpk116a60g7npt5amq6vganv03p9ljy9fxho4z3fcpiqmb3mbsiqrio52f',
                detail: 'Aliquam iusto rerum voluptatem. Illum repudiandae ut molestias alias quis rerum et occaecati exercitationem. Doloribus ipsam dolore iusto dolores.',
                example: '5hvw66ltrc1uvmayf6sdqabru7mgxkd4q7eg38hnd8md9wq4o6k061aipg5ndfgyx73q0oawef08dv6j4rwu4ac7pueck7zs7iz8t9lmtsdvusw3kcetm87xaty0nbn0ux7jrk5gssexvtj8gunzsbtfwlzg3p6m',
                startTimeAt: '2020-11-04 04:25:40',
                direction: 'OUTBOUND',
                errorCategory: 'yyt9uwnfrouz2agm9r56aa1wcgphnjsinlcp17je9rdhzo120sdbh0a7r29wxufzwn90x8t7bv9fbvdc6xohxre7970s6e77n6wr6je8ux8ivtut5mfpeqfi1g9a2psx283hq27bgsw6mw627gfdffcb3xra094f',
                errorCode: '4tunmz8dhtkfm7fo1b7psj97lfba1h9gzuw0hpn8e48m3ze80p',
                errorLabel: 294763,
                node: 3931119238,
                protocol: 'xiv7eymdvirhdjae455d',
                qualityOfService: 'o123pe8cu68x1t3vdmuv',
                receiverParty: 'fdx65qhtarbfp14bv6vgdceu66w993a76oh03zn5pnqb1b7dw8tj2qwwiz3b82asxjtoznpfixguexk6pkmqwdhrx8fvijezuza3dw4x5qnpoelvmnixp9nwjjkcw6mcawqbve3plb8xnbo28s8vvy2dz54a1olx',
                receiverComponent: '8t2t2c6z3mxe45prnm3p1gnlfr8y5fu8qg4sn5cquxfozesz10eic9bfianpliws1ao6f1mo3zphpue6o1t3wv057exg6rrhpbdk8vw0ij3wk4rcsrf6b72vwsiap7df8h7cqr71jj6k5f7gmtg4syogh4avsrm5',
                receiverInterface: '1y3x8tuia3s8va55ejrdwcxomh6a3nwzz8x75jor44tmdi3alqo83odbqi7vop4gn7jzd0zt7wu028kl7q4l50lfdnvz704v41xoezdtb0vcakvj60pux0iwmo1zkfo909in85j1koj4cevayv99wvo6l4x4f6gw',
                receiverInterfaceNamespace: '07ah7w8a71kcvallzvpadjz1i0nfgttpjdf29ike0yutz8tgxp2hp1pi4xs0p0h808s45848p8krw2wh0qgoj7h7mebrbm950ce8hx7r4yzr6sbfnb17kg22qd62xafp0webiau479p2mvsnatjoaz6gunkw6hht',
                retries: 2439527952,
                size: 1614325017,
                timesFailed: 7151105204,
                numberMax: 8677799055,
                numberDays: 2703390767,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'hel7meszkpgvzc6bw4j6t269hlqg5q2jhdp0skn2px1jjtbvo4',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '6gl2lq6qhmfza57yylkx',
                scenario: 'pyb2jhzerwli2yzh7rw42anchtyr30jcsxjhhcoo6txcpq1wsbc2uumsuzfml',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:46:24',
                executionMonitoringStartAt: '2020-11-04 06:29:23',
                executionMonitoringEndAt: '2020-11-04 05:31:05',
                flowHash: '1tubp7nlwtvezdgrx3f11bv5zggseqrdmzxn8tny',
                flowParty: 'mgv7vqsntr35jpoh9jbk3e1cgf30mqty05550mlks52fmhrapymqdt9sqa3kt9k0x04gtxa09cetko08iftxrwho10em8nrakr6r719xm8azhkdmia4lr01c94ihu0q0ubduc4iixia73anvwacf83km3yj3fze4',
                flowReceiverParty: 'xxq184sy32b506n0qlhy79nc0ay4l5gullonvb5nsbtgg35bkik0yjb7ggl7qt3djurw9bl1gvpbtn5t2dsn9m0ncs63x82045ecoyjs7jkq2dji5k7n1bz9761wwyk55rmdskb94y1j04klp9wojjf6rp2w99c9',
                flowComponent: '8red6tqk0lrqejkovpwdg28iyxy49e0iq37p0y4yllzlnfj90gse7ympaxkze909dq5l7w1o6460rj3qehuqufg32nw055odjk5rjqlr7lnbt13ptdo2xf3u3btz0a37ldymea7zla1sybypwmmwv63lqas4x6lr',
                flowReceiverComponent: '0wu7yguyjhstwc3oeks0qw3yx7vp5wziv7lgu1lcrz8btvvbvrj91qjpw2jvzac5s9ftaa3mdyihgyumk5uuolz3ms0960qdjq03iisf5nkdz5c4ths95yixhfp8oeue46a0c44kksrue4852e23na3yhpydu5x1',
                flowInterfaceName: 'eaw5tjio1vlugso0crvuzdyuvr1047bn0oiw7zrnohg0pluz1s2r6krahhbzw71kwqese0pdynb86dgm62utp05edehgm1gy38hl4zpc1ifwgf86acrzmlpqstr8ihz0mowr2a9sb98m91ywevnco5ii8trstf8c',
                flowInterfaceNamespace: 'k56496eu738l7yvjk9g7mspnkqsjn5smalm7i2cxr5h46tn3g0i8rtcifzgntotap2r9amwi5v75svzl6nhgt79ti4po2uw9w6ix0pi07i353jkxazeua5o8oejmotd94lk3xxxosrbz4liry8lgq2xmr0i7ajxv',
                status: 'SUCCESS',
                refMessageId: 'c1lb2gx4s2t1d094t7glb8alrfra4fetiqgaw5d20b6wuv86ho0ufo9vw5pi0amoyfjh658f69351te7w1qsz6ooivgm612bk02e9bly2ndfomptfcdk0ypmxyq5mo3vnv272xmxfdy6znpb3bxyfjrspvabczg6',
                detail: 'Quia sequi enim totam itaque voluptatibus. Blanditiis illo porro officiis delectus incidunt excepturi perspiciatis totam corrupti. Sequi itaque tempora consequuntur. Dignissimos porro expedita corporis aut vero inventore. Dolorem sapiente recusandae.',
                example: 'btb3j2sch4ps0wio6v8g8pyjtld83h03hpiutnep4oa8v9swt7exs3fmi3koy554kpfe88y7cqumwwi38ih5jnbb584g0ks2eink95lo2q8j4ddlhx7xnaeqib3ju5wd5h7mdjqsg4kn0qvefhnaj26o4yt85rfk',
                startTimeAt: '2020-11-04 05:47:57',
                direction: 'INBOUND',
                errorCategory: 'q84gauczrcuysidpf8amot4j7avvsubgh9tvj8ws7oz625l9r7lxkw7fwb4j7xocyccz6gxhxlbeh1jqeb9l80l8h6comzkjdo0o5mrfh90ngwb9oubieoeqirahh4hhg6l38iqom07mmavwxaewddqq1iditbkv',
                errorCode: 'u04a1kmi3b15bb8vuylmiiq5cm4c3bp3tzql6jw83zpvnyze3v',
                errorLabel: 254813,
                node: 4575747285,
                protocol: '6d6tvhb4ois3ijgnfurl',
                qualityOfService: '3c5471qx05iwvj53azau',
                receiverParty: 'd07a48ab3vscx8swlakcsk1j71lixcgkasg18hqjomr45mk0vulgwzouf98bciqqd3ox4n74f30ed53z86brffhbz9u4xg60bvnk6vbmefixorkptimkkv21wmwv8qxeprg0bmdeyj7tsr0xltk1s2v1sc27a446',
                receiverComponent: 'q0xjp4bjtuyb15yjv6xo68wweiwnzsjyzbpszsxge51lko8cyyx4p37zej9b18butsjqfavuf2914z9whoza7vvsgjhpp5zexpkv4bu8n4hwets1tcxvktyzy4lzfhe5t8pmnb0wyyjr4odaysspvwwyryimdo00',
                receiverInterface: 'ulz02rbnbh5zj7o9xm6ou7fqk6rhch7k8yq3kb1yi7xnd4qf70r3pgexm07derwykhajjrewpcqj6gvrjtwfpbn898pwnq1fyc14rn3u6fazg6xamsg2egz9783q6jfifbkbjlzsp2z80e4k049svrhah345gyoq',
                receiverInterfaceNamespace: 'zwk3oyobjnbciz4bsfnr19nf0v46uet0ha5xzrtmf6tt11sf98riwvhf74v93h17y54nunu4avq564m37kj980rnh4jrcp9yyln6i0ic5eh4frhjj9kl9gade7beurmzeo2zf6wo6mx7vpsor30hntppkw8fq2d7',
                retries: 5714454209,
                size: 5071276316,
                timesFailed: 5914643220,
                numberMax: 1512967070,
                numberDays: 6687051642,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'xtj4il2vaxkmiwbgbcqd31nd0xt5pppidc2q1os3usx621qyxy',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'iz723181bdre8qrj76tb',
                scenario: 'cb303c3x9gm7aswjnyfe4me762kc1s8vqfn6iz18coq9tl9y31umynl3ehz3',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:37:19',
                executionMonitoringStartAt: '2020-11-04 05:35:14',
                executionMonitoringEndAt: '2020-11-04 01:13:31',
                flowHash: 'ncoi1avw7go3t7z7lb1d3igyyikr37wt565vq8y6',
                flowParty: 'jjtkv1vtaxatbi2w5w6z9sdlnw4fqpmgrp6jvxe79pxze2ldn2wxwlh39p08zi41iml42vfdyn4zlw9hkwr0f3tcmwgr9vcsvxcl9iadpgbcpk4ma71xmepfiyu4cs6maqe60ipmntca9h3p0r8rvvvn4sx0bojnx',
                flowReceiverParty: 'x34u87i571gkq356y0zbqakapyrorrcmtcd8mgpvdwo2rdbz6vnce8ghkroxh7dk3aw388wn7yoqcul35l1m4nkf0qknxqkypq0knx1w9lmrhwsuga5p10lwdpmwvvzsfmvhsx6sgkqjgt4zoam3z6p9pozwvg14',
                flowComponent: 'ybdxpaywufk9dv6vm8s09q7f09upvjhbpv8svoubity7lwzh3zl26aelw6q9kr6ctwt2m4kxlj924n6w7oqtowwhda097smyr4l5yx6mg69p1c5lv23bkfn4of0q8cgnwt8i6sk9wsu1bw1682yxwiqzri8578y2',
                flowReceiverComponent: 'jwp0cnwix19jkt69arc0z1dt1a0jk3x6thj5i05cvkdpt0g6sqsezmsesofpnkw86oepbub139t62is62ekum21fd98dkm5im9l2fd06us3shmyg7jdqy25lf58jbgo5cabmxsy8nn9x5xknvddo1autjlscydp9',
                flowInterfaceName: 'w0xpffak5w7xjd1dmwfflp60tt45nhou39trgv3iryenxwxvsrennbagw4tula5j4jac7ajdvf37gxgdtwwftwioti316bnp3gj7r0wvmk98ptm5pbidb8lubsmsv4v08a6jazrihptsvo9nnh29repb8usngrgn',
                flowInterfaceNamespace: 'f8kyvp6wvh5c0p9180pknooecr4vz65yrbj4llpp5762ml0udmyogfq9dvuwzqxbhp33xjp3lj8ei7ppdxm3s07sjgjtjritb4pnq1wug6rlf4pdoqp7fugcbiacu6w3uc7hqbzqzx1d7sncxxnir1f895t7eskm',
                status: 'SUCCESS',
                refMessageId: '0nxdfb2ocuxbrc42rwhl9rsrpjwvxn5ww3fu30nyhuukxhdpv17jqyeixswmji1nnlrvjtk9jgz8whqp9mrijh2pikcoidctul57bu1obua7x9n593im35gd3u1axikdouwy4qu71e03i4hmy3a9ogibntp23tci',
                detail: 'Doloremque soluta sint itaque hic labore eum. Cupiditate voluptates consequatur molestias quod ipsa qui nobis praesentium doloremque. Praesentium eius quidem.',
                example: 'mo474b7bqnl9gtkk5u9a003mms9u8tew85pr767lowhfg6o28ulbgiqwx916c2ag7ik7mwgdbpyxij1hwrmphbs8cnx9vjxazwpt6n988fhtx0n38yr7bn1sf9odms13zvsnrdmxij2r0obuk0f0123o2c5lgmpq',
                startTimeAt: '2020-11-04 13:39:14',
                direction: 'OUTBOUND',
                errorCategory: 'uemr1rhp5x7ci2qz7n1q34w1sx40zh09gosqpii46qeyttvkodm1c69go4i2beovawmqvn9udfq0t3qlc4jl6dbig2dkfhepj4x3sgdsaoozurp8mpevzu0vd97yxkfdkyfkg7xfsor0gjth5713lb27c1j5qvnt',
                errorCode: 'l76vq4mn58r7tb1n6kt50kq2ab3tiwzp4kbl5dvno3vyl34tgf',
                errorLabel: 305175,
                node: 2632708245,
                protocol: '8hknny9hiqan6puebbyk',
                qualityOfService: 'brjy3snmsdsjrgb87o6t',
                receiverParty: 'nr2hlazy782569nhxoy7ksn803o1qv1jd2kp6lhtkmzr4iop218ckdx8z7fs9wvwl5bzr8mjfm7yg0x365g7dhau6xhxgx6o8029lp3dmq7uv9ufpvemqe3mrin02kzbn51xvpybxj2x8ikv7zb03evjxbw0ec94',
                receiverComponent: '52ji5yx1gpdvyuv1tbtrhfb4uumslsgwr0onrv9bpacyavnao32z49avcanudejjdsrn0aep97ahyg6fzb2kwi5nw9xc83vzml77rru3n7c3c7ixexfqk3yqkemkjdr147lbkjzafo2tltverssl1bqyp0lfl8ek',
                receiverInterface: 'gpc7nqk9ze7hn0mn94hc4vwr2qfje5vorobwguh1xtj0u5iuwm7812mz7v6arbszdml3703ewha233jx59goib1k92uakqko7dutdwewzo0u9f6y3qng4rc4a8f649x4pkk8o4wdnhu1smugoy4t41wfwgvi3s89',
                receiverInterfaceNamespace: 'tdxjlu0kwezuy2231n8q283h4tagtxl0ldzyhkvhqerz101yhposq9p5hlqcervwk6fod8pxu26idbfj18lzmycaroxjhrtgtwavy3qj7xmrb832luqnpfq7j6tt7bgyfzy6le8d5u86m6rcwn7181ggfbjgcmlw',
                retries: 3616151966,
                size: 9125524236,
                timesFailed: 5859136150,
                numberMax: 8053330639,
                numberDays: 5579701039,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'idahfnozahbh3thzmuq5ph8z3085c3grf8iy40r9s9c1dtidhd',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '5nan0yygki6jpwdkxrm4',
                scenario: '7c1yxec3lhev00s7g63fyoyp2uq8f9efywomp0vtte98svwxzvizl8bvbvp7',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:41:47',
                executionMonitoringStartAt: '2020-11-04 17:06:46',
                executionMonitoringEndAt: '2020-11-04 12:02:12',
                flowHash: 'tcikmc86a80k18a8jny11909xw6p9zl4z5cuubmg',
                flowParty: 'w52uldetu3yafpirhif4a2i7url7s351j624uinazhsm8uhguvuz0jdfclh32oakztdb99ysbc9ra3nq54tt37k3cdduaozwqzzz3x4te51gvxo46upn1joa3uyq8min3jiz361n8hk2bwopjfr6ou171wujhxbg',
                flowReceiverParty: 'nd95jpc8obk1quyci7mafv05emcb0toncmtmiefc3mdif59jbh8e8d69m9wc1nrpkccgsnv13d01pahoe0uikpaj3naichfjt5m4w9fpvyndw9todo0h1nu81bnfsp87ufa35i26qe6u5duy2k03gb1f8rkjqr1m1',
                flowComponent: '8rlvhe8jll4ban6dqye2xb92gnvf2tk576wcvwjbszxq24vrkj5w9oycxmi7wimq57chxtqirsn82aima392tdi3ysje1g6ncrr7ne0wjz55gsvwo8hk15yyn7grjx0ylb5875wyzfap96brb2kbbk3tk3wkhae7',
                flowReceiverComponent: '98ppxbq89j7mr5lhpv2dewk8m57yasnfogkmzbdju4rfevyruwy3g0qywnl4h4izxw7y05swabc26yxkmro4ymailb15h15j3ypavlgufqwokhstql6qmvd8npoypa4ziirb1iia64zakyy6zxawdyke6q966n1c',
                flowInterfaceName: 'dd5xz76bk4yo7nb37f0tppgke8defso4w9fic6q00662bcrt9vgx76pph2c4anc2gahkq0vjw29v41xome4ovbpx9dueslzngt7da8bji5zcxt9k9juq1fz148ml8xxkk702z1q6161xrizzgxn5vs3ill62ctl3',
                flowInterfaceNamespace: '3tmjxovb17elem3y00kphrsveg96iwq35ga7hpqn4htwb50xdjxfv5ki7p24htf786aiyc561wh1dhw2tbf0adgmug8xxd9tvvpfo648mqrqymsrudxfgvjdrllecf6cqvydfqaw1v4zin9w66rij47azyqxqx5u',
                status: 'DELIVERING',
                refMessageId: 'w0n89hzes1f7rsdmirfthennvil4ue59d4cvgcii5hyprpad1fn0y0n0nv0usdappggnfiu8wbv4fsjs1wyndrgola58g2z96v4w72m5n6914y4tlbxnftxepacqzsazyedigplzhwi84pbad6mrihs9oynd1r02',
                detail: 'Accusantium et consequatur sint molestiae laboriosam. Quis recusandae minima. Inventore vel voluptatem velit in voluptatem. Suscipit natus id laudantium facere nostrum maxime. Qui culpa minus quod.',
                example: '0m1xm78e1qf8tk0h0ngq7ivt76ost0xpgxaejp5q2e0ycx7ogvbj1kkt2i5k0cf00axqxac41nwqhfl5ybfc4nq9wvovgn04g7fa763sr0u3lrhp3nij66muvgu1nz17r19z6vfry6svlbp1jmdpmm1qkvd1mmnh',
                startTimeAt: '2020-11-04 01:27:26',
                direction: 'OUTBOUND',
                errorCategory: 'a1w6wlkjsm2hnzfrkqtmddl5yhs2dcac6rbfyvpls1s8mp9ly5aihqzk2xukmeastedjm6kvwgwm4269a6r01d6jf6k3e9mr90gizd5xhyc3abnw1b03ne69v1765y9evyg0ph8a70idlc2x9luvubovu1lxujpo',
                errorCode: '5cv95baaqaxubjdlmwbofv9yeq5s5q02y24r5p9hd4dklvrfm8',
                errorLabel: 223277,
                node: 1323532522,
                protocol: '7uursbyogatxcog2hy52',
                qualityOfService: 'zxbxo4two089h4ezn5je',
                receiverParty: 'migp191vyw6sqbvxitpkp99wtdf9jiabn279h1io2wmnw6ccdwslgswzp928kwolx1m35ht8gqxaiikzok7my338vcd2ykoflpyspwwyjuo6kack8p8p7u3e5hi78u2ixatfj5u0njkpcjk7ukvvapdgjac4mn9e',
                receiverComponent: 'iimno90zq39a46ql74f7vtm4ia2e1r66i1kn4xsxvjk0rj1k76j1vk6vp7dd91qocxuxqt3b7oreeglb9vc66ni9xoevo37ht95z0etagj8z761ebeziv29oroweega0ko9ud32h2frtmigo2w6pq1cqj7dkzgsw',
                receiverInterface: 'nnr55wjlpq0tasm3mo50w9gsnz6r3eu9npsjw94wbiyqb0s1xjjgrfsd2zneigo0yhrrgl1vri6qinqb2by5i3nbsnwmzb3ypmemhqw6hji9o4euor8wbljwdatf4yjphbmw5v4yqkthhtv78vf9aiin7r6mgiev',
                receiverInterfaceNamespace: '49pvbui2t70epci1yk6ndx1aibu3ek7mo0ewe738idt1c3q62bmu5k35hwojr0qxsyfjseblpe2qlwh5ma4t36aa2esejxcha8k57kcmljtgn4g805ihrjswxgcfjngg7oew5cbjbhn4gcac81wwebaf5fjip9ry',
                retries: 9864436688,
                size: 4465211907,
                timesFailed: 9913013158,
                numberMax: 9349848035,
                numberDays: 5332522245,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'bymbcfv63ouyj3dlucvdq8ixcd223oj3zj2lhhjp4lqlzcmxvx',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'zgcr5get8uv8qu2ryqmf',
                scenario: 'cp7791z82u60lrd2gq6qt2ta6q75l4huwx2p6344b0i9ft6sd9ttrkd14sla',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:48:27',
                executionMonitoringStartAt: '2020-11-04 13:51:28',
                executionMonitoringEndAt: '2020-11-03 19:54:17',
                flowHash: 'sedxjd30g75rqpsgpyawru090woctyzxcb4yh4m1',
                flowParty: 'j35t3jdlimr6lpgvze5v6fkalgfgo7lpln4xx6l9e5qh58qg8dwtyqwcn8ijxu9y04qsja8dmqgq1duhlj9c4sy0pcfyecdexoe1e31ukr1t2m728j2kerhln11lq6k20a4p0st0hiwngubvbuuxvrj245a642uo',
                flowReceiverParty: 'isapckb0k5mvi616qrt25mhxem5yplgbuvc8bdn58fz3wohexcx2qxmadoz51uek8v5hyyqarzz0xli663wlc1jepfutrp5qnja5v4k8gemjtgkkkvh4287iylhrkptjbj0lfft0wibeccte7wqgxh9tfm06o1tg',
                flowComponent: '8nqi0n7r1rbdb6qgspfs5x9sesgeotout9iyhtvvfgjdihyvzzrric665ro2d9a34chrj2fv6pobckl9hddw34sclnjr9keaeit311g56tq1iu9hfdkvamaro37li78himm5fj53v8oi822oyzap5brncy1la1ups',
                flowReceiverComponent: 'xno9op411oh9xcuc2ekjapxrshgg3hngymhww2xwz51glk23tvm3d0q9twrohwvn1mi2y0zuqp5po238bvahnnng54o52b2rku6ywc1c74zx5uj2owmz5gx001x2efq4calg6dqd3u4bcikddr5pgg3m9792j2kl',
                flowInterfaceName: 'qk52ddk08zwmnzpbmujghoj4m55sb0xwpb9x5g06xfimt200q0v7ec4rpfl9f8ny0o6w7hgpymbt8jia287c4c9pyll2ar72rdsydfiwfk1nakk08ikxux1cbpb7trxkmi62x4438c46ag5zcscjauqa514vg3xl',
                flowInterfaceNamespace: '1q4qle5b25gz2ox011rm11lcmwwzerhh29arjfft7zfrt4wjr9gfpqot0s80qtr79f1k4q6fe5n9nbobziuirf1vj73e1imntx4g561p1jiqe7et7bdgf6a5zxksnufil4mqio67y7f0fem3vq8b1q7sbiux6274',
                status: 'CANCELLED',
                refMessageId: '9ukpwayyvuutlk61x2rwrp81zwz8ip8s2o2giqa7utvjbo3dwzptf57ri18ga375ou3ljx4rik6udtw1dree9qxe4cyh3lfpig8kz94sera15qkgrb59hicagjuf3duzu22iic3838244oitfnwn0wyy5lvmff8z',
                detail: 'Sed nisi sed eaque sed. Rerum quia qui et voluptatem. Nisi magni et. Consequuntur totam harum pariatur laboriosam totam quas. Aut non quos deleniti provident quis consequatur numquam voluptatem laboriosam.',
                example: 'rjpqqrtgb6pgcbpx31begmpj1fvy30ltyqotz3jwbpaz9qk0xgvhmhapovuaubm9n7ilwqjvvu3u0uub36qchn5vphirpr4qrs203khgf3xq72jkuhpd26kpkaklmmics3xngws3tnj5gapvu0im6jipcaf0opkp',
                startTimeAt: '2020-11-03 21:59:02',
                direction: 'INBOUND',
                errorCategory: 'wzmuz201n7d58bk9vihvv4kf8bd964cxq3e952ybp4xu3vt6k4q3vz6ewa1zvbxv3gd0t8r1ul7t532a8o6g72ve76vu4trmp1d4sjizx2ugq5b5ix6kmnfzst9cv50guchg2a1qo78c7opkvpq4dor5s611yefh',
                errorCode: 'isie80hod6ht58i7f3sskowjgjs26rt989t7wsx98rtnvgwvhq',
                errorLabel: 815312,
                node: 8638094489,
                protocol: 'oqnb6qrvf0v7wp37ghm2',
                qualityOfService: 'pg4lkqk7pw3q7ult1v62',
                receiverParty: 'h8h71jbmxsd6go3yuzlawlg8bsekq2s7aq2xwq9z6to5tnvqdamivbuim1yurur25hb4uzroywb7uvfyr0gtr67j4wujdm10i7w9m4whgnjqwbihfzwprndkpkzit9uxqwyhfxjzuqmc69o242io5jmr6wjjrsvk',
                receiverComponent: 'yfuxk835p0tivmaelr2w43es33g44vzkymynp4jz90lxbuzlxv0o7puey7nns8n8jw824uflswqlt5ozsz7ivejn2sqpfe4n9q3dkd0ze26l76w3jeubewbr24deeennvjnzsm7funrj7800linnyk2n9tmmh3sx',
                receiverInterface: 'x443jchmz39vea8i0w7n3evl3winty55l2sayx7ilg70k1magn14e4y60ofb010nw314ldgfbao9trg0fer07euv3eepanoqhs6090yrjzfcuv5laqfrkcls229f500wxdj1fnemkhk253nktxms9aiymf4jck55',
                receiverInterfaceNamespace: 'l2shbmxmdmci06oz43qs67qj2oxifzpfxzspslx9q8ncbvcjr004xr02h2dxl2v68mnqtm2q3g40fzqhervi5jhv44cvyi1w64af5pwg4ofetz4vx8dwvmmqpeerccvrf0yxx22249l7xiy30igv0zya7phe7b16',
                retries: 6641719492,
                size: 7543655259,
                timesFailed: 1054644224,
                numberMax: 2966390243,
                numberDays: 1656331335,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'u58qb8nsxcmmfjli2b3ph2hn16chi9dtucuahxp79mhymof7rx',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'qex50f877x8hsjf9vl8z',
                scenario: '1nni3378ojk4g4zp4c1jkfpdfefnh2zh0fdw3fd4a1i7qp9mq2vg8gluu962',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:39:30',
                executionMonitoringStartAt: '2020-11-04 02:53:33',
                executionMonitoringEndAt: '2020-11-03 19:39:56',
                flowHash: 'hjmrqe5094v1tatq4bd4n1qew9t0j3c86uc6unmz',
                flowParty: 'zr76mmkf99zaocbpotqfuxziu1i0qlwo7hzqcxlm2srpa9cf5lsmflhv4ud9968eyrrhimq8eblki7er4rubwvrfs5g0y9ezp8tl56zbdyeambqnf1qofpz6sj79o714j54rys8txhwrmcsi8usams9lmgkqhnwi',
                flowReceiverParty: '0rdu2h24cun9inhkoe49kwudzta2xi9hjok0nzdwnjavmwc76m8n6ukl9v8mo4dayus0g6m1af2at2mi7nlosbkvaqcf6qrsimllk1oxdlfsgd650y9fsf68qugwpd5aowvzwwx8owybzlfls95ov4t55giatyjd',
                flowComponent: '0xumoct72k6yorc9zgo88ribn2nslqaepecgoadvaczgbo6phgq8ktl5zlp8ixi5010is3js2izh86vbvky9ko53eb6j154t5ca95an8mv3eohv8pul5e23ekbtdm8rht6fgds9bdqsfa0vpc8t9sm6peyf2w1me',
                flowReceiverComponent: 'tgw6x70ckrnsw789dsfaqcp70jn34l1woi7kldqcx4bssk0sx3cz3yvw9jdj90bp4f50uj70xbjk3zehq3qduwq2amdlr1g3bgna4zpp32v3iq7eyz3sddi2tdlx07kfup8dwuqjyshbvgtacs7qub8f3g9guf2xt',
                flowInterfaceName: 'tmwrtbkc6iqogtddnqs67j3vyq7733cwb29djs23km3xu3y2ukdb060tlszcwm6176qaoerop0kr7z678lhy4okg8fhv6jz0refyc23ntfnott12kxqqh52o6wu03feced90ke430zqp28urv2c31y8rfvobc4ak',
                flowInterfaceNamespace: '65piw8713orau8a2dr44q8703uls00gkokah19j740zo4zv7cz4jgyq3h0nte17bq68i97ww6ipgkip1fxi5jym9d609ghwh2efgfrhj01vcmrxhpaezvegoultd2t4gfgi3bxntw8pgrgjfto94itatppl4stq9',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'puzxw8wbg8fbrp7b153k84sxmy4mc5p3zdugabllyu3didjcnm446gvy2qp75xztk30q0sivo4q7fkw2ato3lcu1csvtgkoasgfvweufo5x6ip4vsmojqqhcx2brb4aji4n82k5vmyxmi5vfh1oey6m6ec6ys13t',
                detail: 'Est voluptas voluptatibus illum ut molestiae asperiores dolores. Minima quo velit in reiciendis nisi nulla est. Libero accusantium sapiente et. Totam explicabo tenetur fugiat.',
                example: 'yf2x6z89mvawgak2pkvtk9hiogt398tcqzttvcesve30q9fitqh7qsgb7nqqipqtucciva3ige7gpqukke4vu65jt9jc6lf62p2stsjnb3iivruaygtdamk97corhiz3eelnhnohqrt79umhx2pyyunywwz5k7xz',
                startTimeAt: '2020-11-04 16:05:14',
                direction: 'OUTBOUND',
                errorCategory: 'utyt6akw58p4kes8jj484xblqq2jot8ta6iexaahcemnay1dwkeirx6kikcqldeyqbzy62tzoboaeyr23jecihz2dioxhcen6gbjjv1c3bwxjk4oo5ywjnlmzdtsd0xi4mf9z36d0w44o2ymu19gw7d5532v0ekl',
                errorCode: '79b54k4pwuj4in3xwpt9tlnzgcfte3d4xkaluqofqkqz22n0n8',
                errorLabel: 503450,
                node: 2618873889,
                protocol: 'j845s15r8n6lzfkmf56d',
                qualityOfService: 'crictndtuaf36sip5zou',
                receiverParty: '90fsgcfayzjtvdmgql3wn95krdx6ex9k8yrmoqb24ijvkrl6f8ce8wai8o6fqa7bo2vuet03zwjniy65u44erflox7ycrfdef4hq853ujkplheyu6hgb23qifc9azhb5ap9c32jwyen9ya7b6vphxbft3vop1zyx',
                receiverComponent: 'yebutbla4qbc7deh1ax14181vxxpwmchmt0wjlpjc68ioqlmfdb86ylz9j1pzn9qthp7av4wfsfotxdvgh2pwyg86uukizuqp8cz9w0cjl04gpboarlo4lul6fe2rex1c2q6pyukn7gozatez5wuqmjhr7ipc7nq',
                receiverInterface: '4sfw2zbdtr2u5fn976jiiw5ntbarcq3jc2wfs1vi3fwlaaozx3whuprsp1ce9jgl78z1q2al13jihxbrm81kdv0v7ifvlmmnxzafdpvszq8vprenexapwb1gici1t8fivbcmx4qtvgykfdunguhxd8q98gg30449',
                receiverInterfaceNamespace: 'j34me802fi7yfw8xhikerqw8loe6vw9kmc3fsgowo2wpwfj22w0bqoikhws6otc7corco8mt8faifuo171mn1cemwt7cn3z0fj8hns1en1bi5zwdsleav0ydd6u8ynk4kn6tohlav9xud0qeizvrg9jlogc9ekme',
                retries: 2494086405,
                size: 8770374374,
                timesFailed: 8866363457,
                numberMax: 3336561593,
                numberDays: 5504256253,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'rgltq8vad3mmi2ghz8zdyj3nu31vf08asmrsphuuf8hfra2cn1',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '4ial3i43rkou02yioddl',
                scenario: 'bj88cmwm111bxn4ok1n3nbbb6fmfw515kqn9ytxzz01wz6mbokmal3qnd09u',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:16:32',
                executionMonitoringStartAt: '2020-11-04 14:28:14',
                executionMonitoringEndAt: '2020-11-03 21:27:57',
                flowHash: '9kgcs3v16xk34n59at4r7jphc4keqdriagzne8ik',
                flowParty: 'tew2qt4g9rgepu67b0yxaqsxhlhfiwo28p6css3c27untk1rpdsttejx9of13nthofl4u4bj5j6dev2ef1p86dktl9suqtkpgpqe0x60hnbq9250d2tcrjhzo0v3z5eo999mlyijni1ywo5e2kkm8mk3pxrrmdj6',
                flowReceiverParty: 'uhy8iifa0kbztg2nb5g8cedcko004k5g4b2dqdpsz40btjs9uvoqcdqztn79dkkt7y3mi23l5dx8rhc6319033f5eugsyp0go14m3f32819975vpd7w0kqevjzxqdqv2my6sky0cunedc5wuhq5cjw55rw3kkfa5',
                flowComponent: 'vq7byim63f6pef7uhz2bfwhhgua24gd4h0zp301q1puv6m3y1s78p22xhdhl5dqon6iq7t7ml2ndd1z0yndmwfa3z5adgtr5cieagf2xqr3d3xfw9k3n5w0l8ro5hlcnt7cpq95aj1tyfw7n1wu3koj21879ybvr',
                flowReceiverComponent: 'ce3rxdy2zicipk10vnxaxygglfykvgb026uln27zwnw4pmwmxb51w8p8owrg8e7f560ex4cwnao7ei6url4rus5wn1acy8tsng8louunelf02x07y9banwcdfxgkypre8ny08tbm8g9hji52ue8panpre8wskte1',
                flowInterfaceName: 'j2l64tr0ddo0qso9jcsvtkeu4xuvibzn0d7ykkszeyg8hx190jgzqquyp7agkr8na454rah1wbk8pszi3z6etpjn5pmhb5y8bb4d9u03n0e104pkgeon9zkz3t26mhcaouyxfk6bmpfc377ya8y9qv2q8gnovqnjb',
                flowInterfaceNamespace: '9mx0hs74rssz7r8dg8027ys8g46f3oda95sa0iirjah816cvgwvvvqq372mo7xssj8l1oe4cv5qdfbixn6ti9bag0jypgm2taschhsyjmtaosdl1879udjx7q6slthmlvahfoulei4h401czdp4jvkzydeaqknqk',
                status: 'SUCCESS',
                refMessageId: 'ac00h2hddqi8meq8qdpan5prtkulq0xh0d840ubprqs7kd362woggf52lsn0oaaw0dznogqvr24s5veog4dxhfvadrbdaminbb79l623cxhhlfxcwxvu5t32n81xd3a7u0inhubmfruvsctnb8j36stpsa3t8jjt',
                detail: 'Non doloribus sit dolor tempore perferendis. Reiciendis autem commodi ut sunt id quaerat. Similique optio ducimus dolorem aut aperiam deserunt minus. Animi quod et ut provident commodi molestias qui. Quia repellendus occaecati perferendis reiciendis corrupti autem velit consequatur aut.',
                example: 'la07g8geisb1xzj014xyh6buod23sjbrkjrjj9ar1td5rzrqcs807s61locnuzowmizjhvfp3gnscmkhp3r85ycwpaeuzewu334bi40vql1xuvk03bahylaqyim4nd2742pz028l324umvg3lutmg1q9orvqhf3n',
                startTimeAt: '2020-11-04 09:25:46',
                direction: 'INBOUND',
                errorCategory: 'ux76coi9efrss18kn3ob0dt2zuk5tthrp6mffvmzlvzsyzlyf9kcwninr5j4nqq9un9jujt5j45fwc0t0zk0054xexfidzzibet6bj4271tr7d678evbwi0wi8s5ryob4x1hp2kz74ac56vf2iga2xvg1vyhhp8p',
                errorCode: 'qbuz5xklco4p24y3x6ffkl25o2f8jgoqmp9fta22nyqepxm88a',
                errorLabel: 680381,
                node: 4828002222,
                protocol: 'qk452puhwuv4nwiitrtb',
                qualityOfService: 'zapyn522qymfkoswe9pk',
                receiverParty: 'g3fobsjtgi8pve4925ezeaw66y9hwp5v2cnkg8qmqfdejyiqpns02aeum3mm46k7sipmowxvu1soz6r2tt7cxwttoijqvqgwgm5dlbsrhu9oaeke0gwutp8un1olxy64gskjl7r6ainv3cb5yx7rtadhmy51ku9e',
                receiverComponent: 'zkr7v8hropqdkrot6la4csyjyvlgoedn2z89epaq58mx0p4eam9brmmw9d30kz51mdue5v0f1rn46xcc38di0gagn11s0ab8ov9pgqlsc0gvmm000kvgz0dsl1ku0fdarw2ie1mw1bl5wmoq5ho0xbiwwusnqbod',
                receiverInterface: 'cbps4kh6yj81cise40kmffu5w4bsputcxs0pu5mrttrllcqgn56jvtcoy0r0gj80jspgd30ymdcuiwd6vc58mf4zq4je8ki736z4irjl4tapelazfnb5a9pkm1lcqjswjm1kj7yq2m5ny21utcg790vfizbplxwi',
                receiverInterfaceNamespace: 'wc1y8ajk7506ukya7xpgv7jftumamvb2ot8mmd9gxrnjp9fa16xszcttxeklw1xgx4cutsr1sjdkwqom9s568v8rfr8y8xw6jgyd7u5lw4zd5v6w05so00cc2r58idkvn1mv13p9vvnztwxf36b0njwnhxlnhksy',
                retries: 6801370719,
                size: 7417975244,
                timesFailed: 5654072086,
                numberMax: 6394907955,
                numberDays: 3096857829,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'izo79qgrt6byuf4h5ic5ed0mc411mxle8d6t4vjx8juel0rjsw',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'd0vifl2p0udk94t7xew4',
                scenario: 'htd7b2liiwwexikg4w9umuu3edvd9cylfowwuvdujmpt69m3nrbx3gldcrlc',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:27:37',
                executionMonitoringStartAt: '2020-11-04 02:51:04',
                executionMonitoringEndAt: '2020-11-03 19:43:18',
                flowHash: 's3op79bbrud1nhs0i6fw5wj38ccnt94nlxhq6n1f',
                flowParty: 'xqe8ry5f6e9divymsilv14nzy47pq3ju7f8sljb7kxvnu9hfbbt0fpp1bcdzjwikuyttzfmu103zs07h9fj9xskcu9zqkmkiccz37gk89sb5wjpioqolgrt9upn7dmm1o383xvwi3tavzip3htg3ho7du1acgh0d',
                flowReceiverParty: 'jnboka5kj7xjqgzhtmcspon1twdpmd75h6gglfuq67me4gohstgiqbsjh8i2dv37k1y0aqiymimda8mqmf3f51r5jdixc5zk79xj2aovyzyllqdvlc1pues9vldoikut3wl59i8cchxgesz9z6hi1kuggxjj6d0a',
                flowComponent: 'zbdeyrfwz5hteh5sgit7sh01wosmwdclv79wukkglgvupyp89r0n1sqpw2lx7ljfz67ryisn5bhxapluoz1qyokihhpe1yvctk9iuxs2276p80nlgvwcq5dn0dgi3sj02xkwhfa0cc6sj1htw7i4snzxhf52rfba',
                flowReceiverComponent: '6lu5ys3zgitwspafa61ydi99sv7vrxt85zn3a7ea7x32h10dyjwdjh0mj6e9l04cg3edboqx748016d3otef17gmegpbfgfdzfik3xu0zeoufnlt6ltp4usg8tfr9vpj2lx8dbqljauhxi68jf2j8h61czr1op7l',
                flowInterfaceName: 'pb6x5aqeo00cmxscgpa8xt3zo6i4sw54i5appi4vjs19b0b719mmxecxilobac18r34bhife573qbhnockssluxw34time1b63nmdmqaa7t8dh329j01zqzoyyls4cspy311zdfm9p24t5pmpxewcme7jpenl7t4',
                flowInterfaceNamespace: 'd847t9amgnh2ww0zcv50q6gxhzlcrzvzfm2u48trax6gwds5cvc7b32bad3z3v0seulcnco56gafrg46ccb0ne5u2n5vz8c316hojvwb5671814rgziz7lhnhs0hquo0b7jj6uso8jtwi4irpgwi9opoizwg8cytv',
                status: 'DELIVERING',
                refMessageId: '1ngm6aowhjn1urr5m6wm2ly5hiyflgmxk35xk2n3zgl8die29z096rkga7lc79tbcunx192g1v048vrtkspnb1zz5famk6jldv6fewimd0n7hmhv4t63429qyloqow2ojpid6q9pcrbesua8hzgwotkuk1aebr83',
                detail: 'Laborum autem non. Et quia error vero fugit consequatur dolorem voluptas. Consequatur magni quisquam. Est maiores quae consectetur voluptatem ut sint suscipit magni.',
                example: '33ty7qy4ulots2nz6kkxwvqh07wsgf6m61gnid72a9zo2fvw5whui8i6hdz6npzszj79085h0pse987h4ynm1foc473z9ltq83qo2fqpbr5pm34sujdkbkqfvr7pn4slseh8afz3vs02gzhaf6meca3whwuo3bq6',
                startTimeAt: '2020-11-04 09:30:31',
                direction: 'OUTBOUND',
                errorCategory: 'g7ra9yardk5944g54a4aplmyiov81ge1kb2r39c30phtj3cj6thdpw4v3p87so718h97cmgb08lywh8uhu3aeb2habfsr9m4m218fwksoydj0d7smrmqdme0i6u7x8zp7sap0btg3e6y693ad1fv2owaj7gk4v21',
                errorCode: '1w9wkjpr1rcofqnxo4v9220amiklwubd543dvd9u9vb5d0yykp',
                errorLabel: 100543,
                node: 3244409626,
                protocol: 'vnlqoc4hcfnnm48h8igx',
                qualityOfService: 'roaqpkmtfhra47pi37fo',
                receiverParty: 'm4erv19tvaz7a3h6hmwqqfwszubpszox5pnsm73e4j9koqpibeopg62pqgmzitn8hslbgczqln24otfj5zr30gogw1cdfs57lzrb2lzxzkurxwvmg0kkr8jvatm6iyoee0qbxdsmro5d5skdyq33blvozk3t9xxs',
                receiverComponent: '7298x307ks71b4mivpk3g3qd4w2aejpysuhebsuwi715dp6j4izx2qcb2mshahl9ti6luxihy9dvrqftct6z8jphcvc851laanmw572dkm3l2inis7dhggvxmgyamng0qayzuq21mzcxmk32kmfztstqhuxnu9ky',
                receiverInterface: '7ikta24k0893yk13xe27i0r7i47ezq4hry7f4u0cqcbor7o975sduibu1tny1aq10e3fqidoaqhrf0dcqslr9t9039lmke2var4x3etaqkpmzp25uuljv7yqzvydefj9bmhe0iolzd0pycdkbpf4namzctc7rjr4',
                receiverInterfaceNamespace: 've17sv7htqhpig1g8newhr6w0yeq1kutmuhgqizwfno07fp8y8jkvywb9yptri1ghokfvvgfnqb65zsd8b1smzslr3s0b149zk3esxq29f4por0j37fesv1awawuykosgz0s46spyodzdaxswsj2vpt324q1vxoo',
                retries: 9823175660,
                size: 8185540357,
                timesFailed: 8711283249,
                numberMax: 4553712846,
                numberDays: 1698058498,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRefMessageId is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'f7zplddu2c9120lf4ovfxaeya0bexo9jubwmrlhwrkpluy8mcr',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '7akytafuiycjo4xwa7uc',
                scenario: 'i36d0qy9i3oje5kq8ff0qdmk2dwe7t02cbtl01epn9mrg5tv0begiympkynw',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:55:00',
                executionMonitoringStartAt: '2020-11-04 12:24:37',
                executionMonitoringEndAt: '2020-11-04 05:34:09',
                flowHash: 'w0xld9y0yzahk8fk8hiizwihltvc96x5u240fru0',
                flowParty: 'dg4krj4j03nc35vzbz6lexr52y4qq4gmetc5psqo3xhgmizlyjxmogxgn6dbmk4zyv3a6auvktx3ygeeex13wlk2qkn1273lcst7zzvqwdssy7sq3lw7mch101tealcwkux1uctq3q3sypt8fewatwmbylkwur5k',
                flowReceiverParty: 'jt1980ljcmvjcefrkw809gyv9v7l12eq5uqo38n6yn19p00ltsvusl0f8cz7h1x541zl8ejnvbwinvcfjgznnt19q07dq8wj82s5li7oc8eew4a1272769gtz5x046t8eoe8ku3bhbh2qwc7ay8gfvlxz6hdkse1',
                flowComponent: 'nb8l4wb72iyfjxm47bkd516vqa1kxhi905ppb26m0kal1hlrc9k3pxtw6tjdds1wht142u2ifo1ntcheikrc145yi5hmegf3057ge6lpw9h4rjm46hgj43aarj8qqnzzhzifst4sma8vqoa5orn8ysbqizsqc6he',
                flowReceiverComponent: '2zpqq9o1vw7flu55kkothi1tu1b4nvjl5e9pri5mjcq5ulovqi1uk4ns7oam57qodw1a9goaf1kogh16aitqygfgcyl4sv56xe48cgy2lz4hg0hqdpcl27kulfmc6zpy9olx9jzxn28zp4qy4vd96u5s87nvezv6',
                flowInterfaceName: '6aprrvigv5034h7g9vrsdi9f64xxm4yuiq2jmguhcnfyetema06m93ft8ck2yo8ao0spk99ubbk54w79zzukpi26nz3zil3mi7ynvd4c4c6bdobi6brbfbxp238hmlwu1hxzrcr93auufkuuxvtuq1n00hdt9vhx',
                flowInterfaceNamespace: 'yaufqwqfr1ot6ej1gjrmbt6eqbaob0pkpjxu8k8befjn13jtqopy3ax3nlvml8iv78vloe662axk35b4lcarovm57vgr4wf2eq3msl3koyvb0amkubjg9qx2lvtwyjerrvbkiqc0rhs2d4347v5m8hli68riugis',
                status: 'SUCCESS',
                refMessageId: '7asg5rfrcac3zctd9s1zhdbzfjtzx4k8l2feexojsltjnsy7ephxp0f0me31lc7e2aasj0g5nr5vdq33s1i5xja5poumlz6h2lsw2ynj89k0tknzl9honhcgy7fqf5ns76phboyfulzkksqwgja88qryvz2chub3e',
                detail: 'Est a suscipit. Nihil et dicta quia assumenda qui doloribus labore quae ut. Reiciendis quis saepe. Nemo veritatis et quia nisi ipsa beatae porro animi corrupti. Ducimus doloribus voluptas. Officiis enim quasi commodi et corporis iste est omnis non.',
                example: '9q8tu47z81var7esgznarood5tnnivyvpa2pt6h8pt1ybw6f1kqzrs19or9gj2l3swb74q3tkwj54fojiaq247z0ieezxi59noeoqwlr7wla4xpg9s1lw6fg1p6c6mndzuj0k2prdph2jbx2eabxsb0dnghbxsam',
                startTimeAt: '2020-11-03 21:01:21',
                direction: 'INBOUND',
                errorCategory: 'jelzax14p4x5xxtxinzk74tummwogsv2xk4rb45zpxbhlvnbw91vun58oj988tbj5aquof9faela5v6m1qhfqnk98ctv7nkjizcqf4cjmckrkjv4ijauav0yasg3552zwxnahc7vlrtc8r5eppd0khbnavj257au',
                errorCode: 'rles0jwxbbvl3tdq2l3ycmw0joxnbqn3h7twn1ibm4j6j9zsjl',
                errorLabel: 418346,
                node: 6552184740,
                protocol: 'wlpr6jhsx19bvjdpc0ld',
                qualityOfService: 'mis01k9blyznk997zkvi',
                receiverParty: '1zzv3w36q4gbyijysuor7j4xsx3ypuhy5wro4dj35p1ilk8qboranj95sebw8wai321i9hqcgsx4nuvts15e4fz2hjb8k61k91fsfcl54oc2tv58hxi7bmkmslhylft11qholdifx4vuy5fhaikpy91np6f9ot65',
                receiverComponent: 'u9xu17jrm00tiqhwi4hxi1t78cptsjd8fnb2ryokvzoxowrmrctajbiiy74t8mtg6cqro5eqqqm9ya86e1rlxrenllbcb404m6rdcra3bvisrrx035obaec8fk3ju5if8v1cqqc6klxgb5bqcgtwvwar7uyicweo',
                receiverInterface: 's3tn11s3x5yqpirhyv5ydx3f8piew79ohvq1kq1iuj0l8ywawbbx8zotytm6r2c5ratrsmjsa1ijtmk5oi9pgj1jurpqslentk7mulaov712x0er36uud25kmbc0uhag5bfisfaavxfpkz2f9knxb2lr7dgihpvb',
                receiverInterfaceNamespace: 'iyr3089mbtu00ynai6qa0gdelqtnyd13k7a0ow9ownkjelk1zxj5ij54o6exmw1xhthj6elm6ssaosji1eft9uz9djv93lzffiyvdt98dt2ngw59xger3puckiljxrx3eno5s29sr01ylt6faka26u69dqashqrq',
                retries: 9853949682,
                size: 6946533355,
                timesFailed: 5458938783,
                numberMax: 7170786051,
                numberDays: 2679994100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRefMessageId is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'g4j8ola5h4fcqgiahzxllr55q9lh69vf6ja66vspnyj4no8cld',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'r2koea0svri138vyq3rk',
                scenario: 'a2emhuqn3k9u6szzv3r1jumpozlzyde6qupx7ogdasybend9qofx78dt3s1f',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:48:17',
                executionMonitoringStartAt: '2020-11-04 17:58:06',
                executionMonitoringEndAt: '2020-11-04 07:33:27',
                flowHash: 'j9ti0233g4mhktowr1eqb0r8t7qfowbjoyof1ysc',
                flowParty: 'ixnzvxeoy6aa380aon3uizzm01co34ylqon4jv3y740yigw2oxc4zizvb6x7h5vbex425rvutip1b95vckilbyai59qpcp2dw31f6qu5kzuuhac9a1lfwnf1flilqiqh9jgeg6w2bz4pgkrssmc4ppqkjczrwu4g',
                flowReceiverParty: '21bgrxwl44vykk5ibdlvlez7yj4m33xlmlh8oljzuj1sikwq30tetnzctr5s36ngzcstb7k1u9owf4ja8c9ldjfn3i2wz5d5texvhslpncg4mbkc6i9oad8c1bcb7wl4h17tn3zu3ltn6u4kcglapdank3cdszsn',
                flowComponent: 'jb2e38dj2a8uhia102agxbvrtu5ftnm00rfhzxletewimjegbcxmbl7js69mwo6n7i8ia38vywfgkv5wxcv8b4aovur5nu2ykyz85mcfm762s4zyuhfxa23g58khao1zj4cpus1emf8vcq1cmbal3qb788duao52',
                flowReceiverComponent: '9li25lscsbu5t9ijqggv9p7avaba7t756yipxkrh218ncx6d5f69971svlkyxpc3e7zwsvr0o2kkjoes80be3fhfjcvym00mzrltb6ed1cm87v5r760555khvk33mhjxz1tffw9jwz17nzmeysys3j7ncs6znwnt',
                flowInterfaceName: 'zc9ftb9rtoirseqdo9e27p97thfp098iyslrg0w4jcl9o83exx2kies863cueze0q7tdt0lpt22ibilc8n2ur27ftwi5d8xnea1c2ks28defirk14hgz8q2gm63938u3qw0fl0lll49iwqfwmwkjsnikyykpi9eh',
                flowInterfaceNamespace: 'aa1iokursyn2sgdf8dhtqkbxai6bpyb50p3362uxutzq11gc91xu0umz9htskzzq7yekcwnaj9eg5qadpkgoh5n22eqj8i1s9h15s1ntgz5rng2jicrhea2okf8gyryq39oe4au7po61xp823f2y3158h6uv2lm1',
                status: 'SUCCESS',
                refMessageId: 'ret6f6jookze437vb44dgz0eqpxfoquhb39v4zyb6lygq0qqnoa3sfeqleqfawz1178nir7o42xn508j7tc9vdelnaolsgmn0mxm7g27r5szpm33spyykdtsc9zvaj2vwyq5f77796ra1e1di4oqlivg2xxaa80l',
                detail: 'Magni molestias consequatur est quaerat omnis. Officiis expedita doloremque ipsa molestiae perferendis sed possimus unde. Praesentium sed tenetur ea recusandae veniam provident exercitationem. Blanditiis molestias optio magnam voluptas voluptas. Sint ea officiis explicabo voluptas expedita ipsam fugit similique omnis.',
                example: 'wtbkb1mtsonlrjx1wqq800urfpwvvj2y1metkcxtgdrwvvz83zn6989y9tx4sfth436ww9th8gw4fboap2fe7wt7xpbyp4z00wn4zv5b20b312kncvelsinbflwscydd275mh3iavfwxby0z3juea73rxh12ylmjg',
                startTimeAt: '2020-11-04 04:54:59',
                direction: 'OUTBOUND',
                errorCategory: '9uoibbsnt4lyfjuatgnaht4mijn4wr3fkv46qq6rfm5ra6i10ftfa62pacttwu040777f3odqgknfbw3fb1yeqks7ghccjmsjls75bteuuf3ojq3tc70auawng493cdhjjgb3x84z2l9xlbdkp9h9rohdbgkgaiz',
                errorCode: 'kurxszl6wgaqgcltevgy3k0ze94qw6rkok4ryis2egaj2gl3qc',
                errorLabel: 315883,
                node: 5055881313,
                protocol: 'letvknifkpf7mu8olz1p',
                qualityOfService: 'nssk57xy8g5bc4w5axva',
                receiverParty: 'wcp4ee9898gczqnrmcc6vt2fg0bthb1n5qk4c9w2n6753nymy9crh2s4dwn6yhzvaby52dw6j4jaz5sacctopxwors4k463j3u1cbcn60uvy0xl6brxh77osj69yflxepicf6aztogcjxw07r8pbnatkmbri88yb',
                receiverComponent: '4w1362rzoawrcrd9a8n116ektwuk6ml7pxjfy1uidvb16l7d4iv1ici1wnthz870ygo4pb51jttywt0oegzyywndw94jyk767390522ozyuxio4sv83dqsdhcimnfyno6lt9zt39me76w548zpwtw62cfpcnszhf',
                receiverInterface: '8si8dpi0fkxxqq46nvxs5syglx4smxg7w6q00fmvuf0r5zw9ipx9c0cq37czbr5hlia0qd1ucvvi5740iriyh3l4y34u5gpf5uok8vjtne0kcxydm6mjykq2w5jkv6gyoalqhm2upmc08xtx5d6ga0z0i7vnld6y',
                receiverInterfaceNamespace: 'zvn2oljsn7cppeqyxjdd3nlgsjutlavtxabz1omcbczqttu3ueh38nr340iaeifpl7ghp3xlytrlr77q2y5pu16t6b8bk4br5jnnnlv3qmwb0ygvamjcgtau1f0jw6m54w48tb832u79aef7mlp1phj1lgbz91h9',
                retries: 1043942425,
                size: 5443620016,
                timesFailed: 8006066974,
                numberMax: 8511219956,
                numberDays: 2727164656,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '704hd1nnpnbnj2qjpqqxvtujbmqtiqnhnh9r4t5a591w9ditjk',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '2r3s5lifiyzb8lh07bvh',
                scenario: '0f3488m4obxhvvit82q1pchy7ad0g4i5aervm7ur3xm7kmbglz8juz0jom8e',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:07:56',
                executionMonitoringStartAt: '2020-11-04 15:38:47',
                executionMonitoringEndAt: '2020-11-04 01:52:17',
                flowHash: 'n9builqzjckpzhdcehicf2gl0uycxb74ow4f324n',
                flowParty: 'oyxljomb2jo5xlw809bu7ellrqqmkl36zdyvne74guj7txnzozyfa6vgjn9f2igjiv351kwdft4yfiu3ekiad9giutzrrm4nmvzeu95ih8tn2wa8zzbni0yk5doexbt7a4klllhbcv4bfhm11hbcg49b3reek5ev',
                flowReceiverParty: 'arvdu8huxiupllb91zfg96krzupx6tb65499cu8tq7brcg5a6007u7e3k89dpjgc777wv161wynvfvmn1vbn6xcilx4wq3sw475667j8v2ui5gmxbje6f7lvi9194sxpelbigxj43punti2n1fabpam1k5io4k1z',
                flowComponent: 'ej84lke8r2dvy70fu5f4gi7opeftrginfhlc4y8twidlixge34ucawm53358j4gl04w3kg63hkfn2qa2ehqpe977akbdvrssyp4l9xw92yvraya4ctmjg0kbl63ucccdipvabt5jhcayegj9kgt79f4yjtkjqxzu',
                flowReceiverComponent: 'putjk4q6su6qdi6b3m51fe1oa9bc31fjx7xr9kx11cd1rinceqnub0kg40769m6kzdzworu9gvibph60urrbk4601srbcmjcokq9dtz32hi7d2kpywncezuqz475y5v20h1yp6b9e447fuo0k4b224gh4n6xcr9h',
                flowInterfaceName: 'vk78cmopz2hxr8x03qupdbs3a78t28bmfo2fpemi8a9975vx5s0r7mzj3sl53728hl5a5aunv4bhbditaopp50y9efzrjn06hu0sivxibag16d678meieqcn9net3yqknat7i4o3gd4b7mguailgjcpz2dzhfxjz',
                flowInterfaceNamespace: 'x3dungfy1poo894wv8gw7o4jbpgvdimt2ekj2mkdmkjwav82yw85fr5bjinu478fv1wbndcybf0pgxj6gruyg3pid4bp2e13cosc7i3odzk9sgwxfxevao6vo6q9yc0f4gw49nqm3debauammvvbfgsy28yepyvo',
                status: 'DELIVERING',
                refMessageId: '2k9dwmq7ikc6c2bzhs0m8v22ke2q2og3xnerzpgquw8cyht993qe85fucbdsh9pq0eeujhchn2kz6cb1fj0loy2p0s8ipaae9tazcg6pb1vyv6ioufb5fvqpryfco3ns12sxzbqozwfil58ajhd5rthbwgyi9xpw',
                detail: 'Est minus qui dolorem qui. Soluta consectetur dignissimos id fugiat error possimus at. Quaerat odio vitae. Quas est placeat ipsam. Quod perferendis veniam nesciunt.',
                example: '0gosaawq476jq11qtiijiba2tjwnwgoyhjh943x0ctcvwkapppxs6rwh94kly6us4a063zxo82tsl93x4ne5dwvgnwa154fuiglb4wn9ivi7ye546cc9mzuormfcdi1nac9jz71g3e5mftk17uw5qd94prmh5bh2',
                startTimeAt: '2020-11-04 08:00:12',
                direction: 'INBOUND',
                errorCategory: 'wui6llguaemws47khfonakykp7cih3ajjc30mliyeny1r62rawqx0x6pxsjr6chnac91ozyfxekac0v9dbq27aln3fq5xbvnn5uvbn3btfl8kq21dg4t0optrpykkhxapwnm33ojvv8z744j4a8n2iqe69o3r3lah',
                errorCode: '901e5kwgs5tn70pykrr67ps6q2lxt2qz8sfavr2atyfd1k9af2',
                errorLabel: 109946,
                node: 6755012525,
                protocol: 'wh0glgsb7jp4zjeg3324',
                qualityOfService: 'uk7ufoxxkcgbecqy6yzy',
                receiverParty: '4myxy8pqi3viqhpounr7s5z1cczmojw1i4bwscs6mw7o410izo3e033oe2im3358ziuxjojzap0dd2ir80e7lnhqdtkhp7hsks1a5gh64qf7emz4vyw1sc0cb8yvc2ew99o50n46d6do92vq58d232mseklibwi4',
                receiverComponent: 'c3mrpfgn8pgd1tisv0hz3tjyjkpg2m5lpoc0j1hanmh5v5irom0qu19u15fmwpbhpf2f6gricgacz08albxxwjnytvzsqhydf08uy2k9lk3px37nbbwoo2adary2e5jj0ja0e1tlogew3vb1zrddymxt12zj8hlj',
                receiverInterface: 'ulp61q3j1469xphbyurscwsx5hz5vhgxwmp2yv1ia2qvi0x0kahjtw61h9r8cg5qrffz94dfdf8cw51q9x8d3s6rcffb5voi7060widld2s7mhlad4qivdt9fko672vjx0lffzbtiwal3m7a5zrae33tx4yuyse2',
                receiverInterfaceNamespace: 's24352svrhh3wjd0ybveypwzj79ci4h1szy065404f85dwqzxuoqah5d28zzdrj9p3f3y8n0gsb9dgscune8j9uck929afbyg4t66a24smr5mxtaub7ag8pyg6pvngtj3jgg86bqaoguikazib3iyrrryl2a61bp',
                retries: 2985467241,
                size: 2993945210,
                timesFailed: 1397707272,
                numberMax: 5842114395,
                numberDays: 8127936427,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'krx7q931i716bf04m7qssap6yr4jf6xz505rpwzmgcl0ae8f4i',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '625zw54dzpyfwrrlfgfk',
                scenario: 'vm27u73r9drazcw42dap73ioqyxdbh4qaebti6omijbbbjvzwxiz8wvyj7x9',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:04:41',
                executionMonitoringStartAt: '2020-11-04 08:10:55',
                executionMonitoringEndAt: '2020-11-03 22:40:26',
                flowHash: 'doy3pflnwuuxg19yj1da1vnk0lpzwy51u8w2b3tk',
                flowParty: 'q37w50077wy0obybq4sle3lstr7mxs5pmakulfx5z7mhy1m10iobcu4seyqlk22b1h2titrhgn5aefd7zdmnagfls5ppfhxllz8dimqg3yxgtgg5gevy8fd2jhm8n8roejsih9moboixc423aadt2i1wz9wwrhje',
                flowReceiverParty: 'ald94voq9l4bswfq5a3khurqenud9k9s3ezhdew8mljucyjdq25814llr6bxeuv4j01beqwz53x598zobk6vtn8pusz5b5c6l08t3m5gskedunkq9kxgr91a09jk1wtshzcevjwdnl9kiihlelvby8k50kilm6pt',
                flowComponent: 'bnwbym2eb7dqtf75ubfswrj4cuz6ptsciyn0dwpd45dm5rl9cxewodcynsw00r1m9uhk2mqtranu7ddthduuo9uuveoqlrilair7515o22zcf84s4yoxip05g6iz62na48ehyjzzb663yj7ndpa9mc7ls7qocipq',
                flowReceiverComponent: 'kfrawuq6jzpnxjlhyild0oijj025s50kig4vmzeccbro3vyg32eh3mg0d1xleb6xfgud2o0opyjf1jzoffdp8yaad89vu8wid4u0w2p975b7ld1wypvgt8o7e388ykggd704rwqagriia1eq09eg94oadtpt6zvt',
                flowInterfaceName: 'qvcz3m51oxx0qkljv5mrlvpizzhqbs5s5kcl7c651477lsonz9ryukq6l6e3bx3ttk69jy6xgrwn27dsio99yifqrd0h9dcbts6wjouvfa68f5g1wqg0wzrjo7l53z3ikyto1hi466jpbleqtta4kjg7etjg2cat',
                flowInterfaceNamespace: 'ja6yb6bdzzncgytp0srg7awlzsv0bvg6dubrzbu0zftvvfe0i7vg9y73japavm6fkoj63ahocy8hcja8kfyj5q4yl73xtkjuj8tg59u8i8xdl92xlw3mvvzq0e8lhvpz360zm9noeeltct68uywfwu94xq5opvxd',
                status: 'ERROR',
                refMessageId: '487zjque2z9mp5z88oa23uayd7plpd3hshm7w9uippi0qi8cgkdbiwh110ia0wfc0wgwnl08vb0n43pr3qekv80onoa1ry86tnxu3yov58xuiyrvi2akesrkfca1lfqfmjz3pnpjjjdce62apv5gxt9cgot20kme',
                detail: 'Veritatis ipsam tempore natus. Nisi qui aliquam asperiores officia. Doloremque minus iusto non. Soluta reprehenderit in a est et eos.',
                example: 'vecqwng0zadbzeq08p5cv59pwpiufmjbcjcmawx8pndhn8bbim5c6xoaly2w0a9eiyr5kg4ss3ozfmemkdtiu2ipkjlf6cld0oak0g67b56l1drymhtc2ujtpnmjpdhl6oqkn1s6bdlpdvnrnb6k3zh9lcsas5mq',
                startTimeAt: '2020-11-04 11:31:03',
                direction: 'OUTBOUND',
                errorCategory: '0gkzkt1l3up0dapzj8rgrwldh4j5us41ncd9ockue4hv8toc0y92scdloagp4pffzltvqd5utzva7ll8mvnll20h8ifaj18uj5pch6qokf502c5qyesozbska8txpd3myhl1h99fa3re6h75nw05eiqkpt7ujxou',
                errorCode: 'j0kt5e7o789szk395gp1thu1gvixd81gp50japj16qvdl9ered0',
                errorLabel: 286675,
                node: 9179538255,
                protocol: 'geq62l774udqxbet9pu2',
                qualityOfService: '9g001p41imzi9zsnr60q',
                receiverParty: 'lv71687g7hxkma56aj8xilv8lb9gb11xet5iped2cy8vxwuvr93u0nwxkv3ym3qg1tzqaimkerfmpi88pbj0925plr9ghxaxur36fsikn6gj6dnt0mq30yswyhdsbagahggi0x01s17xh4j7vd9kp2m07a4b3uta',
                receiverComponent: 'fhhmozghcjr3xa1fjebuuty2z43v0n91xr9pzahxc88vqtyqeaydposchs7uuoro3wqf64guugb4auoox2fk60y7sjdgf4bsxidcuzq25cydhfwvrdst07r4bxfk7odqpyz2n78xucil34r8zh67as202fqc544r',
                receiverInterface: 'ooag9s253qx8fvxe94wm6ppwtm494a2zrzvak5735bf3mm34hc8gxo23qfv7zl1hoyv3cgjp4fzrayunmdauajhorkac7okpgwzyddv69vtqr3aal3nkwcljscowx0ajywq2dopt4yo9w6bol40x04pggcm5n9zt',
                receiverInterfaceNamespace: 'ymc2bapyxd4cvbitk76c5wjk9h3y4w2sombx4zqlw5ggx3ezsk1xum9oa40ifswws99yl976vcxd0s7lmnnxak0iz8n20n720udbuaathbbosfrvvc6fppusrc51vj3ep06f10gwzglgejmwevqaqtzal7bvfs1q',
                retries: 1353065441,
                size: 4406105587,
                timesFailed: 4392920418,
                numberMax: 3948911063,
                numberDays: 3348712205,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '3rc1mcwjrzvctckxvvm1t4tyt554u7f162g5igvq95ocvyfrtg',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'u2rzv2hwm9id06oo65nj',
                scenario: 'w87h1910irxjmbaaxx2qx06xb46fal500isenca8mqht3jrs0d5fybbh73dz',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:00:12',
                executionMonitoringStartAt: '2020-11-03 22:33:30',
                executionMonitoringEndAt: '2020-11-04 11:42:48',
                flowHash: 'muq15emab4f19v9v36dgseyvl328s6ndud3s8i07',
                flowParty: 'tbjqeimsyc6devmrxkm2ri0h7gfq3ise7clhwm0rt61fudbuo7nqhnxuv2mfp0d6gbu0fdorxc22sao959h183tjb0oscd7prsdf9n6qe6wxmb8xx98mi18zg773oh0f42b5i01g7bmgc0tnor7t2x7lni0xt9ol',
                flowReceiverParty: '2h06cb4emp8ai9cscq17ig3an7nbwm6xl3xxvpvu0cx9nozb7u3ga3p9hzdj22ddf4scc43r3xulay9vc8cyx10yu31uuv1fwa1ytadrlgr2exm42gt1rgrl2it0cez4vm24qhum2da0xfn0hy7v6f1z6ne2cuia',
                flowComponent: 'mv5ii3ev57ba21o0owlu6fr309pfdi5cq7h9w53wpllkwypgm73z6x6ive7oohqb7t328rrgxs11alv90sfgl9u4ov8vi5by40efgphjvtgic6110te5zjh7pw33sljl3e5479yaq5f6i0ybpc20ev96dqxvm2zh',
                flowReceiverComponent: 'pc1bony3fm0v20i6hlhe07iasfsg88lt9utsg2pygscfbzc5kaqtykrcxruemnv7oqxpjidjf9wjre8qcv3wqccp8wttujq676jedq93b4sx5fvci4m22c847r2wup1xcfng53uyvlyjgud7p3xdds3ouj80mpza',
                flowInterfaceName: 'aiv1y9twbi6nyguum1d1orq0lc0ck3oyp0465i9jdp651qkeqrnkg6q2p9zftfy1ux09y2epmow0mlz54zetgbqeb04md3osdv208ejz4sf1nn2lecqevc9x62x99n0gmunga0dtvu1t645k2e7hu40ccd0m9kgc',
                flowInterfaceNamespace: 'fqtvvf9v9acbcdjnzb2z82xh52mk0rkqh9k7sbkba7wmonb3513lfv6su2ttsahe55vgu6eo4yl9lwpdyrqmf2u2pkqqze2u2owpldql61zcmpl9k7jkraoiti2ipwl30e5loxzy1a25or6e0semuchsgxgmhpah',
                status: 'HOLDING',
                refMessageId: 'p0z2x6g1kz8vr52eo2yuznjtwf16so239adfkmi3zwruge73vjz5z3aqazwausya8w171b9re50ef8xkp8513yi7rv28nhqwonpv0k9eq77wntw2941j0xdz0ckayaeyez3cwvcufpi8w00zde0ok071uezgf381',
                detail: 'Omnis placeat aliquam quia nihil qui accusantium impedit quasi rerum. Ex eaque deserunt aperiam aliquam et explicabo. Possimus illum eos reiciendis reprehenderit ducimus itaque ut ut error. Aut voluptatem necessitatibus sequi odio possimus natus.',
                example: '5arj711wc9ny9qplmwrazinwzzftd9ne0ls97gsb2qolsl4am2npjxjc4ajvcviex9dz5j9kot3pjyjicezifphfwzm71f6khfhpzhuek3ay056vus8jdcwshnessmxri3xny2d23jkjlzo4tvkscw2pg6yzdevp',
                startTimeAt: '2020-11-03 23:15:05',
                direction: 'OUTBOUND',
                errorCategory: 'kxv93v83drrohxjxz12l8ct0h6hqkhxo0q6l5iuxftcci4oxnp9f4krn4ba9gepa23zonyrdh92tzhmdlfsxm2bavjwyqu22lkk8qz4vhldrcgufg7g0z2toblh94eddo5f7jf4coyp4q0r7f3ik84yxe4vud575',
                errorCode: 'qwgc0xdpolb7zw01hedyp46rlakm0kfh39rkes1ruq5n7me2l1',
                errorLabel: 4839929,
                node: 8522771706,
                protocol: 'x0surap36u80j0a5molp',
                qualityOfService: 'qpleorwrhzwiutawyr4t',
                receiverParty: 'wjuurctp8sm7nya8nsipnbelq3u0gvsv75f743p5z60s0fjh95ze2b31bq7j45dwge1s6rr8kc83m7rhsk7mcwgj2r7kzmdgiwbneec54kggh74rmuet2qfgi1r9dx5emeckcbot9uad0pegdfwz7v1yyz2mmxxj',
                receiverComponent: '9yeivpc9gebes95ozo3t17ki2hm5qyqnbei8210wmr69zg7nvr21ndtkdg3rq320r725id4hj8zk7mndhguklj36gbwbitxstjhyvnj7hjgn3cljm9xj13cdffmvtb2dt72dynkrps0jt7cwurqgzl43s5qmcjs8',
                receiverInterface: 'n07g86643zgzxk9kcwjd8knalmvb154e6l6y0v05n5u5daqu2ryagd1g6jlh4ac9c4118imytjg0pnicpr2a6yt40lag91gus7dlp7qwhdt12kuivzqrilfw95uso525vvocwk4v8ioot4w80ksva77urg39zitz',
                receiverInterfaceNamespace: 'ed8biipsf9wjonkh7j9yln5cb146czpgustdalowsqv8ydphh2ct3h3hx4h4xpxe9jsxxpouodf4p0lwkhwlpriqd2ciofkhz2s1lx7e60nmpil4umnsgxfcec9tgxx60odkn0gbse6i2ozayxkocmrf8xo2jcib',
                retries: 2694681383,
                size: 8769250394,
                timesFailed: 5767707440,
                numberMax: 1933337130,
                numberDays: 2043633046,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '7m98uzsw2o2uxr1uoeol9nxb8fsks970ctnqzmfva0joapqk3h',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '6sk47bhpkgbyxts8iucz',
                scenario: 'u5hmgosxgfgy76xl0srdj4s3d71of7wikk5vh94k50sgyvwe9arzcekw9rqe',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:34:38',
                executionMonitoringStartAt: '2020-11-04 14:03:13',
                executionMonitoringEndAt: '2020-11-04 16:40:57',
                flowHash: 'mhmg95ronjkq7fyb1i6gonrojkqzfsa3ehw000wg',
                flowParty: '55wv45uu2g2j49udqh27271rakid7j5hp8j4r1n70t5rl44ui5tuyze6fvsccubv9y2tx3z4daoru8ulbd3ap4z87a7hi6htt9ewxpuo8lyzy92tmjm9h7ozr8ow7xgql55eke17h8zinbgk4dkrisu66j8wicmy',
                flowReceiverParty: 'qnxs320dbihgwd3ssgxfonten4u0oo1t8lfgpozghw0zkg790n3yqjv89h3cneviww1pcpc0b29u2gpii9vrepw4jxqua90zoch38gzcmif87yvj29dnl1up1d7cym5xznexj5g2uirxn4gv6qr2nv2x235swrol',
                flowComponent: 'efaa68kd0ipsr3ir0iv6wkwvp34aain0ujd95lciml1qxn1p3q6cpx4yvd0dh1jm4b8bd17xqy4a45g0gmmvidb6aykyhqis7ltz3xpkobn21lu8d36xkjs10orqwv45kqxxrpkapyr3eqjqe9amigcnkbi0g9lr',
                flowReceiverComponent: 'r5lun9ngu94xoitdms1q3rjc44q2p1qbj057mkz3t642lgxtrs4qcxdstjfnyw96jc1kyv2ccz4l9ssl7vq2ra6poztoopd4xg0y9s9t5tc7vd8abcc7cprdaqx0yjb27vt4ue0oeejzyp2kw1n2k6tvq3dojza2',
                flowInterfaceName: 'nqq59udufvoo60vk91cbsmy6sjnwly8n0hzwzer0ampuumgu97w4cwush3id7pk8cllg5khzkcz08hvofqmf7whid5hssgnmtl82ne891dght7kedcwrta3llgqssoexw02alqdu3xapk8n3wa3b2pp0sajfjhxt',
                flowInterfaceNamespace: 's5pjv6qy90hge8k4fqqk6wqnvv6bux81ikrca8o9337yt19mecyw8oj62esii2xpkdp4hinyydtv24n6lb1rowh7n9xuigmbhbyu46pn0p6eee1yzbwdxkv5sd4gquvruhj9e24kt4u7qyaugv3v1tqg2bzlg9gx',
                status: 'WAITING',
                refMessageId: 'wc29aiwd2scsxlg3thw2axqz017daj45rygxghby6j1lkhx4y8bdlxus20gpghhtrxhpa0yfz1vt5u8hjap72n8cq2kxgwq8xmle0fniif6v4vupmy9o6r5wb0fwiqzfassv6s9s9ddkmlu5ql916ln9s5lrai3u',
                detail: 'Sunt itaque perspiciatis perspiciatis a iusto assumenda assumenda amet. Itaque et amet sint quisquam qui voluptatem quia facilis quia. Ullam libero omnis excepturi tempore tenetur et. Autem consectetur sapiente aut iusto dolorem consectetur quo nisi.',
                example: '7kgu6a3gimu4a7zhxo80u5jje10oquas0ughk6sy7qlp8dvkjolwvtptd284kzskfto17d65ixkcjx0h016nd80safi9tciqw7sc275zx2rfrtpt69vdqlr7wyd1w6yyhtzsdxe4tfmb4iv9j4hcl878md6vonty',
                startTimeAt: '2020-11-04 19:17:30',
                direction: 'INBOUND',
                errorCategory: 'xq7ec6fypn5xc8zrpkujuofw3n1od5ykc9jiq5w20zk7y120qyn1xx5j180m0oyy3sazx68dfokclidb623amq4vu69wvtw06gfwcui3dazocxzd216osb3oykqxtoepki0pekb91sw2yi8wyl2kjjak384f8gji',
                errorCode: 'sm50zhxs92d3wl8jihz22suoq87usx456xseljai60xby0b0lp',
                errorLabel: 989972,
                node: 57271315119,
                protocol: 'f1s493d993kuzuqrd89m',
                qualityOfService: 'vfrutcak8oqumgli0x6j',
                receiverParty: 'cmwwo3wdyribgrdgg1zesfuim9qt28ka6z2w4fil9gqbu18mox2tht0tmjuk38vnmdv2g7xsvbz5x2zoewqfs6zajy2kbj35rguynsdccs2h4vdotpz9pgbn6x8myw2ri6gjysj9xmuqbgn938nprlq3h92kawk7',
                receiverComponent: '7p535u276xll5e9vt2046p7r8u4tkkfec9yiozhpiw1k63c3q87n1sb6n9bfp5u4ppuz0hg478iumk99po7z9ydoimxguw2qtxpa362dfjayx4y3bz31lqrs7mrsc5pfxws66tce9q6t45lez61r1eatdzbpcyl0',
                receiverInterface: 'trrvzzl6v611kphjnmgnqkzenoi68qihfbyfnjs2odtaiareuuzvna6xn4jhlr9pl6exkm1poer8cxum8qk2ktg9jgadmcwts4qo8p8yxu9b3nx1isavfnj9esahrjoehd2x72hk1ipnnrbp0ys45fky7xnoefk8',
                receiverInterfaceNamespace: 'uvezistspd8297d3lxcch7wsea9i4y8ibpxxm3pxp1jmb5zvd6p6325d7ranecf6oqjaplklrpz4264e0ks529jwlb9yo390yyhb3tacbqpgh0gvfp1upln5mqz4vjhwp3ma2mnyxfc7pa9y6vb5ql1mqev18hqd',
                retries: 1652506795,
                size: 9906785096,
                timesFailed: 8149067793,
                numberMax: 2140913103,
                numberDays: 1084474468,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '7f12c98p5bi13grwoz96b8g9eqxyft8pjpipa0hx60ag3qdszc',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '455wtnw8azzt60j44ez5',
                scenario: 'vdwhhtgrqv5m7i9k05zp5xdiyde12uchne5sdi8pd93afu247qqik3b0whp1',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:52:21',
                executionMonitoringStartAt: '2020-11-03 20:10:09',
                executionMonitoringEndAt: '2020-11-04 01:31:06',
                flowHash: 'ifqzhe5mrcvrmym6wdpt7iglhy0vpybw6ofsa16f',
                flowParty: 'wwrovlm68rhsb1bjwsou04ooytqrqqrucmztchrsauc3kyf2h446y9ha3jk2i5bwxg6em21pbvoei3x3i5hfolu9sgh11vq7h2vrr3lj14xzyh3awauhl7i41nxjo39u0v26v3lrqll7fh0cakub6jclackha3gp',
                flowReceiverParty: '7fh16qk3lpxxqaou2d7f2csyr7cz25su3v9zod0kieglxv71vzr23vj17u43rfft8hazk7629m5zwruzrkb30yujftwrhndelyafkxcbsxvoobmnqvt58uxqxkquetppytbrerz6fzqh0drqkukvea5szn8u9rnu',
                flowComponent: 'j04v2a7gt8zawrw77zwode2l6gr1a6w9me2l9izuyzd097jk39fums8saapy2oi234nas4i3gmxdh438jbq9ors9lzif8d1yviv7ijd14evze12mmy7r1zm2jelxenq4hq8ak0ms5pdy90rd9ykdfjl4hq9cwhdd',
                flowReceiverComponent: '3ja9tgpkc0mc942uzv61qg1lgs5x22daxm6xj6le85kuco2w75idnu047n8avotmd52ecnwdpg5ynyuyuwb86105wkep2xeareh31khs3iezqueyqm22wry09m0iip7c7ecg8t9ngcgetix4gckywe7m244demr7',
                flowInterfaceName: '1az8fh3bq5ghpvoi670e4ca2tbclswq9ptueyytyr66rm15yxv3dxeoo6u5fhvyxn817r50dwuxkq8eo4sbmf29mmzo19ijswezvuem9ee62pw6pbw1d02uvhsrs5rxwb91b8tb4hgqrlbp6pfqm7g666mmpvzsv',
                flowInterfaceNamespace: '6fhtwnxb7ykq5m8022y7px77sgejjomo4yrm3xcf5ykp17sw3accs14ivuskwqs8y9563rh4dgwrjws1zjq768kozg4d45obe1fotz5wu1varh175hvt502edk6f0mv9rtqkzkdfmwqy37okfqkq5l8q65wkn76d',
                status: 'ERROR',
                refMessageId: 'ex62uxbj2vps4gbgahjutefqqatrf7v9w0ldnij6mrwawv4vnb8dt56ovcyzu80dy80356fs0qhh0oxb2tfhipaqnj8wry3mm4k1a9770eirmhucg3hoy3mo52a9ftg3a5wonemumakgwsae5q7wcdlogyy4ddmt',
                detail: 'Laboriosam suscipit reiciendis mollitia. Maiores odio ad. Sit magnam vitae beatae. Quia quia culpa id magni amet repellendus tempora quia aut. Repellendus impedit fugiat vel quas recusandae animi nam.',
                example: '6v3cu67rd8lrw1ns843ukobh9utnvm8v3glw80i2ionynl6j018jqsal9caqqaol2a5nz7nj8vzj5d7dflp7u0xe0d7bnsll4gxt3nva26ljs3j1b6cxm2r0isxb9vcxt2j6nezj87tvuu9cii26jz5kzurmbd97',
                startTimeAt: '2020-11-04 15:29:04',
                direction: 'INBOUND',
                errorCategory: '1fuocyw91j8891ffodonlsf075dlu0qy64d3v5epa50ughzy2gd4qasqcx17tvmaqym9nyau0vzovwe00xhy9radhwmtuqe6lano401c6spyhmnhs502jvopi2anxzop64kqpf7bale5pxv0dq82y68fmp7a3b1z',
                errorCode: 'wvy1rpmpr44q7haviybgvazz6n6r8fc90s6g75n2cei97ws5np',
                errorLabel: 484914,
                node: 5021407565,
                protocol: 'wbsfxu79sfpe81dtx6dlp',
                qualityOfService: '2fl7xmzi9sz7jtq73fx9',
                receiverParty: 'agzn52ag5wlazllayl0ckjlbssqyj8sj0u5go8qkksa9wgrrjxir2n7ohuqog42jp724kol0nk72g6r785u95elzu3a6ylqzkloi2lws1ge38vv2ytcos6lobiw2bmpjwk9jp1jd1tu505oy2iadxaeyjp3i9pi1',
                receiverComponent: '8omi2l1q32c06r31vmw3ntx2lo2wfmmtrd0qd2azqc7ogvped2v6ka59soho06nfmsjgq4qvziygjr7qijk3ytd66evuv8owtpzrmjpefn193mbt5t78emgkg51q1azzzi68jnmofazt9200qqoeguyfptkxvr7z',
                receiverInterface: 'ldf1wukpc00jhgg0lz4e7nt03x390p90b7z4r9jee6ewwr9wonjw0pqxrpwbyk22iiegvwgrufhm606vddhrwo4rm8tbv2nglre60shktufn24zd40shpmnmgecglrsd1qbvejd7c727u82k1axryrfe8o1o05wb',
                receiverInterfaceNamespace: 'p0dt3tsczhf3nwn16zj3bhsw3kgdqwl2wy64p1q762s4tdxc5o3cd6dwgb7pk25qqobykyhcxp3fjekgzbd6d4cu5ilpf2llov32x43fdv81lq3o60naxifnjk2mgepxeoxrlbo2a7g9glheeqiau9wbu02abfbr',
                retries: 9938008655,
                size: 5901534229,
                timesFailed: 3498279424,
                numberMax: 6093146235,
                numberDays: 1310970883,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'd2a5j34afaelejcti06zdzhg5nt80fd0hbim46yqrxl1fviiff',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'hby7x7955tvgblw9ykvl',
                scenario: '1n9d86oqypa0s7rrdd7vo47x2ngd9ew4nkbbr88rjrihuok15w74peujdiyx',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:33:16',
                executionMonitoringStartAt: '2020-11-03 20:06:58',
                executionMonitoringEndAt: '2020-11-04 13:49:45',
                flowHash: 'vdhcukk4m7dexfrmgq08z5y6wg54thhaeh8ip6gi',
                flowParty: '78ddklx1cg8p33xr7c3h4ju8zoomxyak7l81vnywja93pd29rf7nfkoc3ru9pw80qpy6l94bthid308x3lkkqi96hjbouxxtzz3u69ukzzqn0jpjj2sb3vdapb8gs5vbplh3vbbldseuzxuufavjgjcbawn2uxjs',
                flowReceiverParty: '4brkir6suo8l4f8ea95f13wu2g16ek4qxg1sxrha72benxgvcp7fxso6ss87fjavqrn6x1qrrrrf2podt6qm60iyizm8a4vi0f84dqzhydrod0jkx75gklrtudf9yka2o3pa4zigzlnaohdn1o0jq7xdf2si9lrw',
                flowComponent: '6gzbc1dk0xmvip6m1uyemq6i942bp2smf9eyd43aczaqi8dgu42u6fez05w28hbtqvgpvx63k3914l3peek06n8f50hnonxhuf813u2oorr8fcakmdz0mhdfre6k9bd370s9rwxehrwwmc24zbdsm00v2hrhasf0',
                flowReceiverComponent: 'adw6n3vgkgfg3aajr66rgtvvmb6okin3usrocdcrz77rotc6523dva8etgs0f6jx3tppqgc3ojzkbd9vxiwow5sf6qlf4noxk6n40u4kdtpilluf2etjh34b46ihb0gpsdkenjtntirv57ajvtxor6ib1qo0ikfp',
                flowInterfaceName: 'zbqka0pw7yyian9bq1ol8on2fhjvge5d982yg16hs4du7ep38mocljfrkvtiszb6gtahj71ysmlzmbnxvj36136upggjensj0wj3qxjm5kgwsdc6koaod3siqv9et7ms8hlpgrms9r094pr3574m6lx7nkld4l75',
                flowInterfaceNamespace: '8xh6qy5txbygflfgt0ou8ftuyvftkzig9863p4hqaunxkxjfs1kbr0ti8ox4loi979vflxlew24xtltwarlg5044ax1f3xmaoea51zswfbcyuhzaujjrnbrwltx51ciaj83dq9f9fumbpwsl0zkpxrpuknkho7y6',
                status: 'ERROR',
                refMessageId: 'v6lbfwkko3wratjy0s0sjwo404zu9ks1obh6tu0picns6vi6yehxdnhkwgjipgip5hfmhvb72yuufa7xmtq9qir9sdia6u7u2t2nwel98bfyym7nbrucp6a2zi117rx4irfjrr8nmw3jixn2hh2xnbmndlq7uzj5',
                detail: 'Et omnis excepturi porro nam. Reprehenderit quasi unde vel eum totam placeat non eveniet voluptatem. Culpa voluptatem rem omnis cupiditate. Pariatur dolorum rerum distinctio ea. Et consequatur est autem eveniet distinctio hic in.',
                example: 'h9p4070rsgdb2treg3zc71zujd4iof8sx87meger46otw15091n25i902eswltu6533qejxnqpuj4ahigioakksetbm5g4ahyjtaacgzq4yic2cymlx5k136rsgm47o5gx2l25xo2msiecph3iyze0sry5eo6zjz',
                startTimeAt: '2020-11-04 07:14:25',
                direction: 'OUTBOUND',
                errorCategory: 'd6rly3co6hqeb9aayvqkceix2jgumzp1sxu7k5nbsjht2me92efgklsxuv5776cy5v6qt32e7s6wgffu0poyyunu31rnwagbqulkhyq206nqd1hlinwmivtdtudh0s288bmcz9xcj87akxtlmab189t504vknuke',
                errorCode: 'f3ybxhy5ue3z2u1yuwulb023uwi4w28k1s49swo3wfnrd4uzlv',
                errorLabel: 406098,
                node: 6297898314,
                protocol: 'fbtk88dwf3hn0kkvr45q',
                qualityOfService: 'chxtqyjdvfgb1u8buskmm',
                receiverParty: '9wxniml190tlq37myxtd7gpw5x9fil1luuren3jjj1c40hvkousngygkv7k5vpk8bqfa64uvs6wo6nlgb5bzeymbrrltkzfy9d8ubvq7wu4c06tuguiknxmh50cbqculn09z8jk6yi6bi9sqd5dprmfxqrq9r8s7',
                receiverComponent: 'r2n9ubywfmuj1hk8ptfivll5pw40vw01lq3stkxj1bzvohkzma9t2h4pz5jb5wvyetknshm6csh8ve1tsbfb6cmiufbm06ugj781og3l8ktu20w143wvmx7h01s4iu2bdzhjmlww9hcdbp5wrcj9regze0g69fsv',
                receiverInterface: 'iwt5jj45feg78wdt2qgb8rbmlfiawp50105174u747uuyck8vtcjhnb9yrm1edrb6vwo6cstex58lhjzrrr828ru1p1r7qbg6no4f8s1uhqefua04noufqfhho2f9i6gmbo7es219dm833mkk791h8d15dsn31s9',
                receiverInterfaceNamespace: '3hktyslsedjfeoowqkfhdapzf03recy9w7uvxypew9ck1vv09gznoigy12g4gic0v1g8v64kgvswirw3qjzgq0sx88qn8s0yaz1tfzbzg6gjgc31ut901ci6gbfududcvjswf2pjvgw53ifr2ej5bh8qr97pb1dh',
                retries: 3746226436,
                size: 6174105960,
                timesFailed: 7635451844,
                numberMax: 6207371186,
                numberDays: 9709864240,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'eng8ddp0a67beaqrbbu79ezh57o5c3bbjj2mq2wwg9ktqp0n8g',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '4jxkmn949bsb8brcsjsc',
                scenario: 'bi07b5475wf3gzmxnd98puqkmjwte7zwecqlqp2p3ris6gjbxmo5bfr9pi61',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:37:56',
                executionMonitoringStartAt: '2020-11-04 15:01:39',
                executionMonitoringEndAt: '2020-11-04 00:13:32',
                flowHash: 'za6mn9nm09cxvj47uask4w82sbu2btf5nzuxkhw6',
                flowParty: 'e99ijdz5looqlplk2498ldvvoi79l1mv2v1q35bqk2yef6clqlpyxrr5xgvwkli6aytrykgcd0muuqe5tollj1md5tdfru6mr7zm1irylrstgj3mlyggyc76bhvr8v9xo4x0pk81cr2qj7cy380psbztgmx4qz3u',
                flowReceiverParty: 'eutkvzsojl25qos8t3xcvcq8uam5ljh311o4mqzkkli84fnoceoq8t9b1gsqmglaadu6rqrg9cfigjbydlcabis7rv6weoct3trdalwzj1ef0rdm7i7j94qseew03g8kumbowp1ag4nu6rnek78jygauzfr0crvq',
                flowComponent: '6xkuuvdcpkg1j8qtmfmp97x9ijhb0tmpk038h5bn6nd1q42s3kc15qsax7xq5bka773jqa56ek6n5c8sratadyw9t5k72zq7vq487lfbs8ou6ypxgcpqn8l13a0247n3oasku4o1lspdbleyuyvcceljleaqxnqk',
                flowReceiverComponent: 'd1wggnuzjs80ka2k36j67qlnshaplylsa4f27bfnek4acu8d9uhfk61y6w0ofgw6c5ccy7008y99zxdnypaelxnippriw6t412yf4hn3e5vj4eles4c36dw5y1vdecue8ftke7fvdo8xt31m0ccwxkmte4k9c27o',
                flowInterfaceName: 'kwgthl3rh1rvlptzje6e5ke6qh4ful187snm3agcenq37kb6mts9y2xkncrkn7pwqo1iqtmp17qge2x8lxajhlql61t89w7gv2nao0dmb3xx5lm1e2zuchhd9od04bt915wrdw36xgvenyb8fc6mgfkooshnmfim',
                flowInterfaceNamespace: 's2gh8u96c9mhksjvms878bvl7n05vrx3ns8o3ks9epmlxbrg2r9o7ox8fsdiz8p98bvx6fkecmg2tvi05qef203yrgl0d10e9q8q0568dlvyicjof10cokgac78z4a052sgvory4u6nxtqfshswzjlu1m4di1kz1',
                status: 'HOLDING',
                refMessageId: 'h3gk8yciagx02sw6z59steyq1v8q891au1qq8zsg2bh3ahn7ut3exmzn4hqeehxkrkywb8k44ktdhe15sq0wblu33f0je98diftuvljds93z7pgjxpp6144xm6xlkof0yok0oes8izh7gsgh7u3gpfsg5kws3f06',
                detail: 'Quia expedita temporibus. Et qui ipsam quo aut et rerum. Qui tempora placeat.',
                example: 'irp0yc42p25i2ok12grshmqawayj8ycawcmzprjuhyv7ek1z37m7fst6k3k03x30v7ayvezhpwu5o7qk26j5v5ul52ghmkm4sqatgxk3i0lv9rs7cz31509obe4n2e1wuztexb3s71aipoeqvlmptnypzzklakdc',
                startTimeAt: '2020-11-04 11:16:05',
                direction: 'INBOUND',
                errorCategory: 'hav722neww28qou829ovnxui7ieopztr664vvbx6q2xgu0ip90uu9nual2dnt638umyna84dxcw14id375mzoq46rzjynfgnlnn9rb0ojiofxlm2f15oiz281g0g1yote2y66zjs0whkbc2uvtmi63f0xmkt98gv',
                errorCode: 'ept15ojt9xw0b31lltnkusx7xiyqhzyo1o4lini4f2dwu322ej',
                errorLabel: 970454,
                node: 1082204011,
                protocol: 'kgq6d4hb3ewpr173l6bp',
                qualityOfService: 'kavypctwvfyql3aggpxo',
                receiverParty: 'bxdkrjmayh5k758wj143v8icsvhq69tv53pwkccpo9z1fqsd0qcr2y4bowmaip6g28rjwykzuikaqra2niaginpzqrcdnobooywka2vlhy8af6zx3bmolyako2ij3nyfsvzwo2nx2tzvidbvkg42e1wh1vus6pzt1',
                receiverComponent: 'smpv54a9sn0hoha953bznlvovhnyw0o7efi9k45df56vksbc6ovkmpxngj6dj7mcnjnrzbid4c68eet0t0s1e7k830sa06qkrztns3kw6fgjjjyoctkt7macqrgd7bv21dfy7840gevvi68t1yagtuqlx0c7de3v',
                receiverInterface: 'iid2fqwnvp4u6mprvhoes4nsxs7pzgnaoj7n7t95tmbas8rrtls1w4l13pgocp96nvixc2fulije28nvrdd6qqi76skibijima17ti9ys41sznql0kxqaoxz9vnpanqs1wps9zzlomogqs27bp3shvmysrfd24ln',
                receiverInterfaceNamespace: '9ihprj78t11tqgk5pyx30h5or12k903bcigyux3vgzqeuenoir7cjr5yn7l8xq8lzfyfc3pc2pa2ripjalcx9rvmk0kgm6yjoeryye4589qxuk8q80nxhxs98yhbfitypgujqnzj3cq4yjk79s97f2j33i768ps0',
                retries: 7924203244,
                size: 9579929802,
                timesFailed: 8008505905,
                numberMax: 9995722198,
                numberDays: 2525331580,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'xipmq0kcic7vxr54l4c2470aw20vu2nrdyrr47k89edigxk5cc',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'nmwfx1dj84yj15c5oyff',
                scenario: '6puc0drhfwz195xowesb6hvgibog08a2372jzkm950np1qeslkem5q6tq1jo',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:19:49',
                executionMonitoringStartAt: '2020-11-03 22:39:52',
                executionMonitoringEndAt: '2020-11-04 12:31:09',
                flowHash: 'xpeaca0gaeywqp1vtxmd4x427blfky3qfz3yinyo',
                flowParty: 'jypwzcnq26oztuyuevnhvk75fr4bsf05bf7qeoj645kqv3o4agdec0afnv5z3b39put9dmitpa08lwiddlxh42y9ep4sqjkpj4xndtiqv5qbztk4wh4d4cj5uwhom6yf8mrerrjbhd8b2z9lque1ads3h1brxe1z',
                flowReceiverParty: 'uuxsd3i9wsku1vy3e4gb8ny8v08d2slf97pokat5pylykmma9g5jbog07fdrvcrbgcn6y3ziugd1uy3dkxbt8m7f8zy049lqg894jvg0oinr4cylynwhng7udxhiwiehauv5okgx90p16rup3tb9epbv3u1ljjy2',
                flowComponent: '3fvhdt4a28chvpqkov81nh5rs1glrzexq51q8n6ohbf99rvrc8llnv0dpu7esugjrsvzu87om6swx6abvluywn4f07zz3qx20l0n3ce035wczecvgbq7siykub3xxrnhu17qgtqnflphzei7r7px3xe7c5b9vwvy',
                flowReceiverComponent: '2ao1xglltk7dx7ktcbnr1a505y0qx9vetdlxqkbql1v6y4yorgqnirchx7xt7h8qtwehxdgyfuq8g918jdjs5hf65pq319uwdfaq17kayuxchug1og9d5oikcp0jm09oltikynpvmxc688p30po0v7pvlg8ipwwy',
                flowInterfaceName: 'rop12o6z8pipfawxc4agdr01yl0zhsy3ef5o3sxgeab1eoawps1t10iztn70ilpfqi7k6dv5a1065qfawa1fy6kzde56e1khd583vu46geumi77marcr8t2k37nop469i7pi8ii8zneboec0k08ju0v498p7zxbc',
                flowInterfaceNamespace: 'lobgbye2tmhh9bf4qff18z0jeilumru7babx49dim2kwhd6j42ldc8t93yxjxwy0v94bwb7eqmbof80uec9wrv7cipe89wlppuazcgdxou9lpfw76d9n5j4n3hu4vyyxiqerjno3kfkq30lpf5ukyjr8djnksm5t',
                status: 'TO_BE_DELIVERED',
                refMessageId: 's5yrqe86ldgh3bwq9avsep29kej81lhp04bzpw9g0qfhj26pujfkpbnn12sq3v2l38ja0bgtqxqps4jruw51tt0vpalx40qo35cjle4ibrz7vtpbdnaajh62cyob691lfoyltmdzy2ngv5savt89u2maa8v4vqxl',
                detail: 'Non nemo eum aut quidem odio voluptas ut. Cumque quia molestiae assumenda ut ut ex ipsum. Nemo labore et perspiciatis veritatis. Natus blanditiis enim. Est est dolorum et id ut ut.',
                example: '6oh9p18aw0igx2pqe5lleqqy5t34d6tyfp8myeof5mskpzubi30e4v6i2jprpyrcfc848vlhuj0z7t2774szo2phtsb6m3cakfddritznaop4i5w7ge1roliwue792hur3awyjc9c71u4jry22c2riri6m3k9gn0',
                startTimeAt: '2020-11-04 13:15:03',
                direction: 'INBOUND',
                errorCategory: '8v7cn80nn1s7pqo68vt3p7ers5lprrpr2bbd0na1j2rb6lecy1on5nq7kttxd7lye8zlosmgh0gz5kbbsqqzpnpknja8nwgq2pyrd9ofcl45o08xsgy0vpw01si8pjy5rummu6exhfjrd6t72cvdc1rg78f9b9xf',
                errorCode: '94xl9jymlwrjtlzocd3vez0myv6tj10mu3333ffhbarwur0qvm',
                errorLabel: 448027,
                node: 6704326591,
                protocol: 'a3kxxgykhmzt9w1aho5n',
                qualityOfService: 'gw0f5vegixqn1v9heyoa',
                receiverParty: 'laa7lpheiy9tjqzbuflblcea9mvckm24rk40xhe8z74l03ldeca75fgjv7vj57y5x78810nyjxsv3uqj4yl0kbg3brwt0i3jmsouiltlkpi736zw94ibp2xquwsarbj3pltphc5zorpgzdyq4qc8blctcsnlxkwd',
                receiverComponent: 'io3r69ps49jp8fu9deh56f7q08ma5294tz0fn5j6g6hspiz5reol6f26jt2jmvnqsc7qtek8bhh175yztz6autey7036k2xanyap9i1rtkkufkz9xafe2i44tvnunjli31o1509elbxzal1fm1o0qrstm8l6ah318',
                receiverInterface: 'a4dvq7nf9eekepjnwkti3kw9acqvtp5tq35a36dle9ky1p4f9abf2gqddmwicxjtgp15ox0ajwd52x8s4eyy1rcw2to5vrc98rzdqz34882gn0ic4ed8zqensn0291doswxo8nowwcv9vsy32s090m0fr94i3cfm',
                receiverInterfaceNamespace: 'kgi1nugvq6q5k7lbdno1k2i34x7jnay1nvjj6npgotrl6fg0mvvljzis14xqyb4scgfa7ehynwjhiu0fex1lfzv0gca0ere4jbwbct5veghgw6ey1kiqx966qewn5paiwzc8h4rsg1ns3vtv63rn5oh0s07n8djr',
                retries: 1125020725,
                size: 7580587499,
                timesFailed: 5913101173,
                numberMax: 9427108985,
                numberDays: 9374676807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'o6dpmp1g60j3i83b9f8f7r0eo95po7way9fwyey7kbwdduk1fr',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'cnwh3ii5babme9awl22d',
                scenario: 'chul68opwndqo5lb2pc8s56u6586bzrpyyyctofdgstpfkbzjnbxn8her22c',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:03:50',
                executionMonitoringStartAt: '2020-11-04 11:34:21',
                executionMonitoringEndAt: '2020-11-03 21:35:35',
                flowHash: '081k62wkbu83ds38sq3qa8xfxeo1qbappkyzns96',
                flowParty: '8jb50q4hdcnvvnn3w2xapvcmd8fdx5c8m0n7n1558ig0x4kdfvifkryan5rq1lqmh90omx0ydlfzksccsl78horssonannu2wju2a5nfrn9qoltybcvx5mf6um81tb7zx0o3o0vxzsqypq3rfoj1lcrstsfvjg2r',
                flowReceiverParty: 'g8hv5nybt22mmtudcrxosu1q90mdkkedkwjutgqoxt1sypwkopead8t1kbrjalqsszcjwfnmvt6463eabbsd65e067qaxp30bl1l5v8fajscoh86hhopj33dky7yojmlts4jh5vx1esyyumiw3mozp50ndhq0nsi',
                flowComponent: '4p286qlrem85stpcrroxc0080n6ulvxs5rm0cp9q0fyoe7rv24q2lufefxa0i5v0wl6qoobu0bcyziaq52njri52gzt8dxbintwsgm4ynfv8ksdtwx2viydy36frdqcm1nlc4cs94igxltbpaely49jwguvf6hk5',
                flowReceiverComponent: 'e9s2swjvzb7yzxejn6xgenjjn3bubirvmu51z7ntgdrirts3y6i8n02z9gsi5b96l69q3r81isa27n95iemjnbx9gaviq86nm56nueets29c1eeufixvlu3oz0kaku7dhalf1wgl0c7679x7bj09k426tlwy8r7p',
                flowInterfaceName: 'v6rxw397rb7xaqxl8mz3mrdun35vben58i33g1g4ujroik9tb8k9rlbw9jxuq3tl5gvt69xdnsdt5jgr18zxu8mo2785ma0qvnyx4uy81b0lgc32500r8x0h98p7trye15u56fyzktaby5w351dpms6rvl3l79ed',
                flowInterfaceNamespace: 'r9931jtvclu2dss0l44gaxfeab6zf36ra2kewttv2m0sib8pimmzgtc9ma9mjupaet9boptmt0vrz2khzx9ev7wvzsc773gug8tnzsg817nyphs1sk2j9jh2wm9ldkuysdsgt7c9y057h30i6kg82puyo99pys8w',
                status: 'TO_BE_DELIVERED',
                refMessageId: '31zhaj7d6jsvebr5y1vv9qw5so5td68ezhd151jp025wfng4itttjqjmge9jpas973rvv0a6ky2lqjkuf004ebpz1lfak40uop06upj32thj4kzjg394vcijk8geh574v1xcbdf5hthvdfxjz70p152o8hm7jjic',
                detail: 'Aspernatur ut cumque rerum mollitia alias consequatur aut. Sint harum alias qui id dolorem ducimus. Quia unde officiis ut. Vitae vel est quo aut cumque dolor nobis. Magnam exercitationem voluptatibus et illo repudiandae nam id quaerat facere.',
                example: 'ou7r64dctg4gdbmnj5lb78yg9comdf495jyfxtnohgf6wobe3j2ccc6geive7lz6tdw2dffpklgdhq1kl8r31oob5rdj18dz6djx91i7hh1bt76isfauuimsryzigr71l4jfi3bjvad4038dceqexfznk1owuv8g',
                startTimeAt: '2020-11-04 13:45:36',
                direction: 'INBOUND',
                errorCategory: 'vpmg6meapy1l4qxcfkw1elly6n7nxsqax9wnnt0vvyxyljo0ogvr9uoq7cyg4zw50x0vyajn08kcukpvj14n1osylglbb1tm43uwf1342w1af29jnjtnxv10rqo5f96lgsayews4ttfzwus7ecsmjlv39y58i3lm',
                errorCode: 'i552z9gzfxic0d3imm6qncw6oeyxepl3giktt74sy3t05y7h4n',
                errorLabel: 567517,
                node: 8680937982,
                protocol: 'xo70mzx28lmwdirg634a',
                qualityOfService: 'd81a44x9a9h2d1xy8mxx',
                receiverParty: '6n4njpgr7f6w0ya4tksh9p859jpd1gy9kcpce633v1pdshp1vm442l9wezd5f8lhn6zs710s71pag1oshgcit0advtp69zlkfpu2gh4eeuf9lps3jxzdoah5ltewzghya5l45y4y7dc18kgo3rvlycvj3l5z811l',
                receiverComponent: 'tlsvc72lanxqtpxi6c7dbhdijzuyhvrvm1us7mgtvdj7qgw8rhopxgdi4lf0meslt9w3krezg93uuym70a4vk63s5325ljff1aagzee745u84aha81qvfem8p1tvsjzy7d6tod2j1gyb9698v950djqb05u238o0',
                receiverInterface: 'pwxyc3t7fg5dv2qj3hhb7fbi9w7mfi1p5uo4ygi0h38kzy58esygs9i1re0qu0kdtfrbn3e7gf7ufxzghb66gning3933n0acvff5qniry12lk4z8ydjra4tfyoxv1pt87ozp4z2wj1v2eq9gmt5cdxxhqvv1w430',
                receiverInterfaceNamespace: '47irudz1c6ukkhr8gm11j3m2lk44wkev4pcc5x26xi0yj557qwrrwywb8w2neyv9vhdce4m1qcqzqzml7duat0rt4sms96ckqhtpljjco59ww0aguj0k0kt0k1f1woulmp2foa5q9syfqvbrdapg91lomul36061',
                retries: 3398695342,
                size: 7317879154,
                timesFailed: 4202138789,
                numberMax: 2624225375,
                numberDays: 2932052300,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'j9yozonnbr33nn7h6llwghvrjf3uwth5grx1exggi2kloppkyb',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'drm9c4032pitlc8052ws',
                scenario: 'bqd0zlpxa8cj16gjv7rpf9bf3iv8yb3h01mvjp8z1jzveteh7qgg75qidj01',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:53:21',
                executionMonitoringStartAt: '2020-11-04 06:51:20',
                executionMonitoringEndAt: '2020-11-04 01:39:25',
                flowHash: 'rhnvqxwaecaw5hsr4em2e6atwwe7boys9rqpyshj',
                flowParty: 'm38jsanrcci7l8b2rk46ilauqzdlfo5s9lw4hw33ttc7bclnd0s4r1d25qgdvxygk15s92vp7lumy5w7sqfixf414jk2dmiyrnu2owl7p55z4cv8fcgj0xd8z2ie0rxvegc631cv93xxl28zzeo44cg424d0u7ij',
                flowReceiverParty: 'llazldeuav0ejs7rgai9ayp9fk1bpeyiat63mqsgkttt43l2k7mut96v7l4pxrkgpkditof92tr4r9vg76t2cuqmljwnlcc14xmji8d9430tss86bn1htvn8awb794vujex7zdjquggwanzsbiw5mv4uzdmma43m',
                flowComponent: 'k4nqkycnhuq4tjic9o7u6ud0ajyvwpsia3w6kfx5oycs4evn6vend7nr46suvfwv4w63fycur5e2p0tubaemqrhspwbwrlhp1ju0zvr768hulxq6cy6pu8j84p0rnqqvjqps3gpj56l744yhm24erabjjultbmab',
                flowReceiverComponent: 'kn9d8ceyu5g8j4gze7p7l3djzflwcf18u1q419j3z75brk91n9n1p3vh8obkfd0l2fy4r4xgf7u06let35xibt1pc15842f8khzzmlsaihp5rsd5hxh7kxdqojny5ai2ty9x40v3iyzsdil2ig13m4j3vb8kwnlp',
                flowInterfaceName: '11rsxblc838vy12yumci95q9ksqf4x89mxwlg50ifito32mx5zocyi3s92csyab5dys17rtklq1qhzzx6rowfw786nxo2swo9x06rtdk7kbvlz08g3zcj4xth420s8gaeswfdp0ibvup00asx5dk14fwahfhi5ni',
                flowInterfaceNamespace: 'dahvo6kvdhj2xe8nr3d6i0exc5voy1la6md37uaaw892bj9s46z8p5rvkzeipnai7yz0bnelkooz7p3yw4wtjiog30h8b8m7o8ih5ygwyorwu543i8i50i61a150l9izgn022w2nj0s1vvqkamcisvf7j03msf31',
                status: 'WAITING',
                refMessageId: 'yluimne6nu94d5jar9zrlyapncqjp25vliad5u89ylemwlri5fmsgv4diul4wkhoe6avdux8d96l7cbsbv55wx2qf8czleiogwnhu684ubgbm6hue8lycrw196ck1tqr8iujyr4wngfgz4ppoad4f6gc1iz5xb9l',
                detail: 'Quia natus nihil quia vero nostrum et et enim. Blanditiis corrupti et quia inventore voluptatem at voluptas. Neque corrupti qui commodi quia omnis blanditiis.',
                example: 'qwthjtz60yb1hku1jv8wxix1a0jifhnu4vvzwwbv4lxu5e6bkez9c1odgb7q3a6d1kn29ewn1pt75f65n3t8zay8jsfmojwrirgap6o82gekid4d3qiiuv3bf6qlgx7qvb5on7qtjwbxkkz66h91g6fbv82sutdq',
                startTimeAt: '2020-11-04 13:40:09',
                direction: 'OUTBOUND',
                errorCategory: 'fr0wbc5dtnpzwyzdjayfr57d0bv977k2wuh0d1j98fm6sohm13e1psun5898cw0jhqan529bhlv4mfjjfs5n0mza6gb3zcker5sdbewo3p7hglprz6uxemzu3k1m9mw30obxeuqm37v2y797grzx8679wqy572kj',
                errorCode: 'adq38n14qy1sj5z0lzta8g2i6vs56nmyug4sc2cerjlbnccb0f',
                errorLabel: 447019,
                node: 8569563477,
                protocol: '31agpmukn9lm7pj9nlvy',
                qualityOfService: 'o01u8w8vploulz0q0eu7',
                receiverParty: 'zjshhwfdk5ut983xvsbl4a8d2i09qz89gogld6s3g30yh9bya7hn4a13brs7a8d5o85p74drf4emghb5qsv9mi1x5tpb89fqdt99ymx17drcvab4hah7y82qhoqul2hp3qd4t74odh1z7e8dp7r913fnjb4l93tk',
                receiverComponent: 'xjconf2wp747v8xp13j5odh0kyj3aura353xfnioworz99pl15eprrxttjr3t0da3jt8jkmohhta73hv03nzg3nvzfjnt11qvvpex817qney2vgjeufni6rwz1xckoh6sezjh67m39wxd68obkp4brpnqjci6ueh',
                receiverInterface: '7cpcgvi5dl52ifmop1hocm6lfj2pezwowct2cb5d6pwql7xiqp8rlqzd8bhceuol92fzi9g252fpamcj0pr092h57m5eyvozqn3m3ifm5dr15d29g6e4v61zavep4f5a784eur0ockvn96ccq6e817nm9zj2f7kz',
                receiverInterfaceNamespace: '2n8xyjlkeqvhiu6opt37bqawpq5d3l2oc1dd4mo8cipaaeddzpi328kcyfefyfsgkphdgixd6vd8c6you66ptacbc90asry9sdfmsrumtwvlmtpvrh4x8pas7f2ikqcrnbt85n6noj0l4tibegjaqaquk09vn6724',
                retries: 7678721439,
                size: 9395127216,
                timesFailed: 4630596499,
                numberMax: 3880160165,
                numberDays: 4555553786,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'q6fmnsf07k004m7d4s9wk28viab9h2nljrmqdkwxz3b8a0s4xv',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '77v2zfwt9srzbudbx4ch',
                scenario: 'd1y1renopcyn4syku2msygcizwg7k513jcwixiiswov5nvkmoch5811gyl2p',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:05:32',
                executionMonitoringStartAt: '2020-11-04 16:28:12',
                executionMonitoringEndAt: '2020-11-04 18:41:33',
                flowHash: 'r3k4l3xzg25b0ga8forr1p2fquvtx6oeas25h8au',
                flowParty: '99emt2a20o95txj0ls6rwgosghkijafhgv1kgyptc3a1roncwpkco2o0fwdw24gelz9slcy2mvqyu7jj1ady19jpblj1ejtctxd2jygmepdnzb767c3ash8k6j72mh309rwnoir1n9nn9xyftvnuluow7xfg85f5',
                flowReceiverParty: 'nvyyosxohpytxitb57edgsbetr6ddi8zndgy7ws21be2ro5u5g2gqrgq04uo526rjolepm75z6dep3p29hp47spsnsfeonexiz3fzjn589okewisrw8y84dyho3ya9qhhlbgqiduq27wdnaya9mewcqaklqpvner',
                flowComponent: '9wmmlcw26jdbqb7ojk0q9l6g1u732okkcrpta8lb4zi0qlm5qzp9bd0h7bwpbupw70saqysrmno9as6g56mqaiy5edl65b4vdk5za0j2erjomtjvaumjdafmnwth3cyjxopguuvhccvv69b8rcypgwgj8om8a7xd',
                flowReceiverComponent: 'tl08jfnfuc1l8onhgiysb978gokteb2raizzwixxmik38ij14dqaaug4x14m1h6lmuuhttwok7awg714hlpjfwkqtzycasz7b2fkxzo7z8li6apnlxbt2ftmbcfag1v3ln8ex9uwc808jjjwb5hbmcme9tc6mb9x',
                flowInterfaceName: 'gqcd25m92xpysq4ijjuq8qkp1ykij2bku319p2swp1lzmqh506qoesz29i0popntkeskl1om472xmfnh2542b6squ701jl469xnvdc8a06i5yejr2qf6xza2o5bwtbggttmjcy7bjuvi6cucbhnvgpwmdw1dozz0',
                flowInterfaceNamespace: 'g3a45j884xy4c6w5k9ggfg78q3rjni54p0kkyk5xnacwo0t8c458acbwj71dtnsarrkvd49bf39eict8erprrn7hguhlwbo31f0td1gh40w1lkx1akakn9gniosdgbt1trbddrf4nm6bewocop08o88gw1sh7wcd',
                status: 'CANCELLED',
                refMessageId: 'xc643jmsuy5klmsiqyz7mm9acnu2vm6knkkzqj8xp1727i26t8glh7hgaaulhjpzdwzqafi1rf2yuz806rvideayeufv5fd0sh5lfcq2y4svkzbqc1otusjztn05u7wt66bjl7ytaf9k7ut1bgpwelbi0kspencx',
                detail: 'Dolorem esse enim non voluptatem quidem fugit quisquam. Sunt vero ut soluta. Nihil eos earum veritatis ea fugiat repudiandae magnam.',
                example: 'cs8ev6ieo0n9reqp3sb25bgyoqkp257bq4g22qhtliusgnzafasaaf8p5wuzwqgd3ftu8or5fffrqg1zaumxnn5afzf9nicedd5evv3awzsrol29b5lq2gesmdm27cf1auqdfsyxk7ms3dm67ajbbbc12f9cvu4m',
                startTimeAt: '2020-11-04 05:38:39',
                direction: 'OUTBOUND',
                errorCategory: 'jlopdxywwh7rmaa313hkn0hjzv986hh35xm4i7qb3prk8iawpfrj4fx9lkptvbqkfiufjvwh3cwzvnc2ka9fiebiozgr0uezyu8nmde68plf846qyjhal6xntm1myp7iwvzfdk666uu3qm41x7utl6a5o0srq0t0',
                errorCode: '8q49gughbu9rdyqke92zyyfl82jlwx0wa7e7u2xo32trxwnjru',
                errorLabel: 868697,
                node: 2885450900,
                protocol: 'izijcplv67fm8sczrfkn',
                qualityOfService: 'ne7i946ftrf2v8kczn3b',
                receiverParty: 'tpp49qd5iugszqdxottmft47n7hl93cq81yfawoduvskohytj6qs3oixjo4w20t1gj79cdiursozakbm8y86x9148kr4qdx4ijhknuma6yugoxbndr5bknhhv05audivgh1sf7omnk65hzgd784dx7s8fpg3sjkj',
                receiverComponent: 'f7et5tlk6wogtjgtfji9eyak96q0ut5jgkcq21zebktwsgagkomkp9vfw00lqralz7lj5g6rov6amgwxvbcxzyimhze91sflcw0pww6y1xvg0i6pn88ibpm7lj0nt0axf6aaiqwbarzttkfsqwqshgk1vbqd7izi',
                receiverInterface: 'prry713f6gozkaqlaj3ys1hcy5bsljdbdcf9zrztw7xf5wu2amzr918rfu4vzzpbqbxgfvf0s9ltcg7soeznr6als1h6gphqlskw96i4zz7qpfha9w8ensc8d4tgjlxpzolx0tnh1fc5jf1bo875hii2ytht28s6',
                receiverInterfaceNamespace: 'zkpeuta5blz8e412lazphlqt4jw7a7vbnakpqv92gav42v7xhmh0eb8zu0rnhb96eijx8jn774fz1lqphpbpwpfubkorsyywmlnhocjevtn2fzmduy9mrjjrjlsmruly0jr1ia05jnguiyrjytjsa189w043pj8n',
                retries: 41996175442,
                size: 6539231485,
                timesFailed: 3763715479,
                numberMax: 8519782214,
                numberDays: 7419986559,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '6ckcghnk4fow5q8g612em6gsxy1xxfn5vk1usez78xiz421vqe',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'pzuwxnof44s2vws4l51h',
                scenario: 'xzz0k2fgfxf782xrqn71y6qmn47u1qpp0l3hmy3m5l7s6fqa9cwyymis1y27',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:45:56',
                executionMonitoringStartAt: '2020-11-04 01:27:49',
                executionMonitoringEndAt: '2020-11-04 14:51:45',
                flowHash: 'tr72wqmtvab5a1ghfld91dlpsc4mqvo2e7mbojow',
                flowParty: 'w2upg0gwb5zi953zd30dp2awa4fb9yn52xvs41k7an2vf8g1hj6u00p304pklif461ky1canyd2s173z4fhvytzvgpmh3kwdzskz9fc58pusnpr2su2sax0mscr23zujwg6jpzrkol1lkwy43iyokyy09zf2da2h',
                flowReceiverParty: 'pkghpgaj9dpn7q39k00alhlkory6v4wdhxawhvmppauhy9m61cazyd89eyupceqdywvpmfo2rxtmkghnagqctqh5nzg83f1fhkijvau1ikgojkdqsqpkouulvsl2d2onmvknuielh3fhsm4o0g6awwhi90gdg9ia',
                flowComponent: 'ndjbag9eggjwxiug3qnbp6wp7xt3m0frlpfbziteq3tu71ohqlkpowzigwwv8dagh5215mg6n2krjgemhbfcru91zgddzbok3th4q0le7gthzx8qf8j6whonzvetayqbep3pwhiq3rhybgcecetknc06d9xlv9vz',
                flowReceiverComponent: 'ht3mv2lar8d9e4rg5d8p17a5bvw2b05wt687znctfcnxwtobzpbsfkk3f2dlwkq2wm6h8h7qrn031xsev2xnn999lw4ucrf4osq0jzhj5kmly52301rwc9pspnmfc691qfr3w4j6jeidnhmc3jg6cx793owz5syx',
                flowInterfaceName: 'tsnbwrhkfncpxo0xqig3kacfk1dxoon02hxa5e0m4ad4zm55xn4tbmruc5at63u2vqrejqepmdje4ptipqswq4ibkiy1xulse2wpl60cgxi0i1j09ky934wrm3eo5wdbfv2ymujrtg6bjzq0qc7qjm8w2fs2hfj0',
                flowInterfaceNamespace: '5u6nihsawjrkafl56qlaqd46azw6mxqhzqp92c2ycusolsa3riijnjikiwcgrpfz48wfphw2z65t1cr61ob4pxoyzoegi69mv2tvnbppczqdp8k0s36agsvnbx0e1nbw1j4vni52d7vq97b0znjdevckj12mk0ij',
                status: 'CANCELLED',
                refMessageId: '9yonddu63ghj80s73mlxdq80td1fsfmpwpjgb63j94r2mrpn7et5s41tsd0z8hho99k9w0uo82ct9lp8mb2es7n0dfi5ovgqbmkkenlnm0hpahskgk2t3lj4mhv6x4dwh1emv3ahz04wlj4u6mu4c08mkfxgzy10',
                detail: 'Aspernatur rerum earum eligendi molestias aut. Maxime nam consequatur animi molestiae excepturi nam ut. Asperiores aspernatur veniam ea totam et illum esse illum. Qui voluptatum ut et dolorem et doloribus. Itaque exercitationem cupiditate quia recusandae qui dignissimos magnam repellat.',
                example: 'dw5kweele4retteydq31rgmkynv8acu6gjalsdvsfjvu4k5k3d0z6ylr1b0jdwn9c2q5naamc3gka0es57zsqlneyrvtws3rztibi77zuf4lxf29k5no736z2ie249n0jd9vzoazknsbjj1irhr1f54ful81iquh',
                startTimeAt: '2020-11-04 10:41:59',
                direction: 'OUTBOUND',
                errorCategory: 'n8xzjbajmi899pnzthfxrgsg4g9ciwbnitmwtsdpsqrp5bgxzsavp346axkp3z15agjfyrkymxg10jj0um083rf5v7tbhtv8zx091ikb8e7o3z2d1wwqzivweq7qmbgno2qnj3vpo6y4vpmwvb2qkobymegcnwfd',
                errorCode: '3x29xj50kiuxdnuov8adztjpipn2a38qif5khagxzkqbbevhds',
                errorLabel: 348826,
                node: 4540162164,
                protocol: 'nzfcx2oslkgt4sjzhgor',
                qualityOfService: '1iqsnmrt2aq3qqdqrwkp',
                receiverParty: 'voddol7qlz34nidw7zc30ppjj9o5qddmpi05t17jqc8dlxoirm6lpy20mg2m5r0rv6iywqb4o5vkj7oja69jbx5uugefftrgwcmeomxu1a9doqsgk4jc0mue25vcspvk3790srcybni3el3hrnfkq8tpc6wbv18n',
                receiverComponent: 'dersoh6whxlzry05nc4zxvz4bhpd6qzi5uz7ficy43bjljh2235tfq0u4zhpdutjp8189kr0n8hpclwvhzp49cate9ojwr5bm4uo355t0ec4blejl9kt62rl84sgdi2nffvhff9zccy1p1gs3v9ew9vti4v2x7dl',
                receiverInterface: '0hl73u8icptbg9yikm9vihpfgx841rwogykjk3jsf9gozs6fl4a9lc7ocp9rpihr4ihz354es4ba4btu3ao567dep96piq7rrm2pkhn2b8bkbgo2j5vjbuns3vv4geoy6pj2fz982t56r7p9nt9ifneb3a2i9lf4',
                receiverInterfaceNamespace: 'xlaslvln3k7wcjgj08nueczhjyx1q61xg9os8kb0ombhfhdvqu6cjljbo5ds6a79hhjoe5jvrfwm9o0uz8g9en8f3e8yqqeu4m676a3tr72h2rm9axl1mh1rlqseww39jc3gzn0yqghi9sfy8g6zs7sm6saz44yb',
                retries: 1411926325,
                size: 63296490597,
                timesFailed: 2637156758,
                numberMax: 5225575422,
                numberDays: 2239362376,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'mwslx8jfp1ha6h9ehf2ihkg8oa1o6qigof4g53g0z2mffh4zy2',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'd9mc18ge3cd5vno542rg',
                scenario: '2o4lgmt0ghu5q3z7ry5zk2wra3kqztvlu1xmw5voyk25w0dp6uxhby682mnc',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:48:29',
                executionMonitoringStartAt: '2020-11-04 15:14:55',
                executionMonitoringEndAt: '2020-11-03 21:45:54',
                flowHash: '3m2tzhnwei7m5imppnxcs70lqx3vbvklm9lfasjx',
                flowParty: 'hmibe9usxp0m3fpy2ym1l5n7zfaz6fqaygb1nedv8wf2qtwht8epr13a3yk8gylh1zicxeq26tdbyy3qr5qglau7n25tpbjr0yc4dvq6vaepkjznv5icbpbwni91r0i7kh62xk10nvgbnr9oxc00z3pfgugk497h',
                flowReceiverParty: 'iy1ttky6rwyvoeoq94krtgl16bbtswh4v8hvt3kn2rkoq3a6f6m1qnvnm20zmle59jb9p14rstv1pbdj0zopecqlb2a4wyf4nyfiw4hey3nmtlxqgczbgznya14uvkbk7d47zx9smenlfsc1pr8prirezv9zqt0b',
                flowComponent: '930a8zcdznst6chs53kn6wl5mfttt0xd0god7s27thqycuwjtndpsrz4xrasaeo9038milwej4kg1topktgtxocr80h5reljoxhmmxjhtr3hs32g9ellgnvljbww8emuhnl4e4rhqd9nkz5hp592gurbno2u6qsb',
                flowReceiverComponent: 'q5yelwg4rtb951qkesqb8x7a7y3steldar7vfo7lbp8s7834ebuneyano3soosidq2xjjoecemsxhtcpuf7h17bxipk26r9226cd84hvg4wtek3t0wwujybs0z4qqo6wxf225jtsvg3ewki4bc8nyvlxhe6kzap6',
                flowInterfaceName: 'zg2amghajj3qiw3w2mj56juf7r9dz1aj6qtrc2x04b49dlphun16ey0nmunusspmatzqwkgza423geewo85xwx0f9on4aiitw4bnwpns988xidwr4wb9wxp01r72klyhoqw8xsa935z577r90mjit8m8620xh567',
                flowInterfaceNamespace: 'gydsgt5virt9813u1vle8kcxjwxs6ic9e9vbmpd2dmyxtus1y6lhrurjmcadwm9wxfntv7illq1b1cwu68lg824tvrpuvyz32za0q9s9bn3u4g6qbjrxoc2z19z1g4g5pp6kcb2givmms5ihpvl228gknhjyhtz4',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'vu4yqvttzeplqq7jivo1hqjx2qwc7wbjl0d2ug0dzwi7122nikgp9bsq5z2y1pj3i64743wmtgt0wksikyn17rbdn82ggz912858vxfaaak4hgt56ook2t1j1szt0b2tw26n90m21kfigbhl61djinuw96lywkny',
                detail: 'Mollitia et corporis quasi aut enim voluptatibus cum et. Cum doloremque saepe consequatur labore nihil laborum tempore ratione. Iste earum amet magni illum. Voluptatem ea cum neque architecto corporis.',
                example: 'zkv68mgsutjeeafplatx4d1j7j5kqwz0r9ve8elzdsez4c3wk5zri65zyo2oxtx7ckl86ovqyjqt8l0q88nrx3afqp873wxdxnqqylov5us4x3veuttlkkubaqay00p2wizmt7shjvsehshj9bzapt9l2gqrpxzz',
                startTimeAt: '2020-11-04 03:28:45',
                direction: 'INBOUND',
                errorCategory: '9w7yyug43q5dpu4xmgsfbktt4rsyopy1t3x4g5hrmy3dnl27ndbgsqtanmxosbxgreo92ilsf13vibhlqlot5nh7ba7uqhkiqqswxnx9lz1c2mymge057sxqjjicfvk1u29rxo707j06849ajehms691fda4bpg9',
                errorCode: 'g3a7p8x5rm101pbwtrc44wy3nbzxsu3rbp4duorsg3siqu69dg',
                errorLabel: 658793,
                node: 3810127769,
                protocol: 'kl3d13leh4ecptbktwq6',
                qualityOfService: 'dyw3vcjlxed8gsod9kt2',
                receiverParty: 'xdm76v3wpfa3vbeumgdm3bq86hl8lgx2k9q9gt2uailziewubnp1pntxgdce5o54tm1x3ho568j2v3cv7nrkl8kk087z5w0j5ved9w7yvequwvlb83ijl1k6yivo9qw72tnxv33o3v6pbm1h1t6n40e9hfa6cbw0',
                receiverComponent: 'ks461z1j7qa0g3y9i2qfwjozttpuqld3qpdxds9s78w8jshynspf450jayymot806amapjm9uho5b32z0laaynpgyj7oa6zo8lyng97wka2wvo05urpjo913ho9f2yr7o9zn6i27j4q01ncjdfsl1262qgdbijjx',
                receiverInterface: '4f2rpsi2d1v0cceh0u0koyh2ca0vk006oloxvmlqfs8ti0hw5pyd3ae92k3xk27izusaz54q18sf826axr7gpgrfjbkvtvlj8ur424bce7d7axrujy0dga4049mtcl79bbdigo1l6tnj2vl0vu11lr7lf94ch9n9',
                receiverInterfaceNamespace: '8pnl5rojv0q64y4isb632tjkxl5yta5beglwhdymz459jeogz5dl9912apw56mutsvr027jq5j87zyxxl3ndfn1zstnn6dxipdpqkl3xyqp39dlfu5ts3q34cp71hrlvdg626c9800xvx6uhjunrgg1i9y134acc',
                retries: 6342985331,
                size: 6861473733,
                timesFailed: 63569203549,
                numberMax: 4721259601,
                numberDays: 2106780219,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'ps8i0au26anjtz115vpt7vxkw919li4tpsbzstum8e1wy7iyts',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '2k4efcnku45preim1rp1',
                scenario: 'ou6ie15alkt5khpqaieoclo2pp28wvppk3qj98ws6iqexjqgs25z79tlzqyj',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:03:36',
                executionMonitoringStartAt: '2020-11-04 15:47:49',
                executionMonitoringEndAt: '2020-11-04 10:18:52',
                flowHash: 'sr9itnuu9zefkge9ai7jooq6i5ixvvpseiddpmp7',
                flowParty: 'kz8xzw5ozb29y63rj3ajrqi9meg3o940zj8h7vudru79p9fw3fg5bgw2aamy55hmjenhfsldye095b7trsypie6flyoc1i9gq62d14xivdg3fojr03rx2j1otij6c08gyhib031x3maqbqb465i4p13z2ybwnsdb',
                flowReceiverParty: 'jhl2vzi14nkil84scqjsg4itnb1ney754p0kw6xft2jpcm6ywm78pa1yzvo9fk0bbhl4c00ulehrq7rraj3ycvuuybjvnzsrk24rvmkar1qj7tsnr97jyag4vct4i96k5oazapizf7uhaxlujr8dfzwsj91wdlxm',
                flowComponent: 'z6bo04u3xusdaqkw0730017vy36li1sm42jvws57bcblbo8vgyqqa9i6vwwd5ovc4nbl23buglrhvzyep60q2epvncut4zbamm6i3erhlutiky68r184wpdq7bi5f226rjwbu1k3u7k49asol5116cp0uy431o0j',
                flowReceiverComponent: 'qxald0caa1gwipm689w4n5mu6wdlpcs26ng6de1z7efe7goxzmb0vpt2j3gal2g32yquhkg762qp1h58leiui50drk5kl8pygh79rmoxmoj58i5c0oagkor8olvfcwc3wzlrekmez1cyhhkcdlmdazp4xilap7n9',
                flowInterfaceName: '3aiqo1nlz5x0nwetvl7hbk2cvuygr0zl1o4jsbter7s6uo5heoyhh866kk5cch759cdf12n5ld4oyen5ts29jyncb1kd3qrmrrrxjhzxrixa9hy15nqp8w3xdyqpn3kyxh7l63vi93if7fzfdozq7x0ywmqgvtj6',
                flowInterfaceNamespace: '1zgxvt6txoxy4cbpdirtplut90zce2mpq6u82v2ro00dr8dsi9ioxgt66zwggcby9171fnkx3trjf97m9nv06g1f3t4lnqtq3bzm1ljxowwex14cucsk458qeoek851b7vdrcox5ankbjv3dheo8jx8gukz9x794',
                status: 'DELIVERING',
                refMessageId: 'of3enfit1ml436awh33e07e7pfcp6egkkn0ioweoh3b9l6xp0ev2518sa6rkf65gh4eer965nfwzv3xh6cvpefhbsqpnehhy1d9161411xbsisz1t7ulzddkzhh0jdxjl6s0bdci7h7pgn4gqt2euzjsdoaid1ea',
                detail: 'Omnis quia totam sunt corporis animi est sed est officiis. Qui qui ipsa exercitationem rerum itaque voluptas. Explicabo illo odio dignissimos qui iusto. Atque aut sed itaque hic soluta vel architecto iste.',
                example: 'ovim52vntorshas12do8rtfsniudvk4o4krtdq0hduat1erl5rw1cqmme7c1111v68rx89ogywc6wqqqeiaoouhwxsmi1ql7wuccquqx85gsb2rfbtbwzr3ggnjouhmkygxjzamtxg6qoks0nd5cp1i7kjcsj6v2',
                startTimeAt: '2020-11-04 15:12:43',
                direction: 'INBOUND',
                errorCategory: '2tcang3nosa1ldmvzih01y95rr326vrtc2ou1iuhep0lwifvvy25vrm8oj4tjl29mj5cyeomwazwqx098q2y68zwq9tttzj956h0iade8njokcv6r86hq541yv5s8p5584usn1w5wuidzs3m4gfahlus20srwk8t',
                errorCode: '7v4gfcl1g58y5pz9kwpz1pdmju1eql97asjdb2usuhx2wpp356',
                errorLabel: 565562,
                node: 8189447344,
                protocol: 'ifjo0lj9p5wlhtaf8wxv',
                qualityOfService: 'ai40rjkt3d6ugof46w0f',
                receiverParty: 'usaw3nfe6r7tl6k1szb2owzfdmvn348niij2ve8265w306565rph6dz1dp2m4l0xhyval7suuiyu79i94648wdfl2qt7m6ifggcwrihr7pb7iilvlrbpze71fitctcugolhg5u6lblxyhrzmopeea7ywxkqypaev',
                receiverComponent: 'ivd7f1241by2jib6epq1pootot1ij8ein5n1r8w7bj8yoexbop3glrsxtvsrb2bbyyzv6mcpacrvctxmntyybt5gdoynfhlebh92743kwyni9s5qzegdei4sdwjmwsd2ekwpgvizfqtymfj0wsc7enjtjbrjkymv',
                receiverInterface: 'pjvkwaqlvec7z4u2c3eeqg9q85ovm633sjhi3kfrmyssfatzp3buozio9q6m58mhjgvvh9l4ctkw68ocl097admliq1mwp8iic6iocoffgu9g8q92ajkln1ta1txadnf62z2bf6wmz61el5ysx2p0racvftru9d8',
                receiverInterfaceNamespace: '47fmjouy5gb2aks8lfti0f2i8luxb7p0yd3649jcpbhl9me9ys8qabq0by5t42fbz8eg6j9utk3ur4szvwp6bo0sa49ylquulsf80434h5yzy5pukl0dnfnhg8b9sw3drsm4qqvada3lkjap3408o9ozrfj1a13m',
                retries: 4834963596,
                size: 1926885316,
                timesFailed: 9110745326,
                numberMax: 29303566338,
                numberDays: 8662926356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'gel288ylt9srzr0f7waklilk7fa50qcv0z7z1i3rg4j8z3b4wo',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 't5r7jywqcxa7dgh9xdqm',
                scenario: 'beoaegeabgwqcs2c3xwpqdwycl65ggt2rqzpgexvq5ekjpkxaonbyrtt8kqp',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:36:48',
                executionMonitoringStartAt: '2020-11-04 12:18:55',
                executionMonitoringEndAt: '2020-11-04 06:28:55',
                flowHash: 'lxu9nd3ox1kf18q0cr55abw6otvpjentdxslyln6',
                flowParty: 'xf0hx0z644nr20hc1zmyyrvr05gfiiek5hdn549c3eib6lvp99vienu5n5uel1p67dxzgpm14zx6c0o52wo0xuvxh58ve2yzawtoqepzfufhipc5jssmparyo69karqtvmlo1mvw6551u3g368cizx30sd303vau',
                flowReceiverParty: 'xwkyvourvrhclzyfezurpnpfvb28wrxmr14e3yexj4v7ndci0xniwen6t6quu0hsdysabasz3j8wt3bhupkqwur73dxqxnlhlick4pa03c9zgw60kp87pj5jcm68ps8u108quwgt949q8tzkfpq91rxb9dm7x0dd',
                flowComponent: 'omql1upat28wwffz2owlkcv23h4gz4gklx5dy0rgc708kl7xon4r1x6kqwlz1ahdzawqu9bk3vmkfhthj7krx37yb2evypm9563qptbh62pj9g52q05ceryoavlq8pvjz8hyfuzzygt8ldwe4gaxdoq69kjmotf0',
                flowReceiverComponent: 'b8oo048trr9lca1dwu7q3tk7fz1ndthh4giskhgrfhjm37fydsj025cv2mxu0nz4sasy2lnnyv2ju3t1i7s0e0qdpmfuq9cssumxb2tv9fkkneq4hx7d3stdzusfor2ktldffzzn59lr2rrowmbq0rkh8cqo7ili',
                flowInterfaceName: '4h68cibrgif6p7160257hvmkyooji4ixypir4sxi5afbdiekxyjlaxhkdfbkilqv9n74xb8psmrrt5jld45a9lhx1xoymed676ogbnany7a4xswrk52aqrw6npzwq3b6te6gw2gojrl6y95msczv76kiit30ghuf',
                flowInterfaceNamespace: 'b0g3n0bpeojxbi2jw7nwvwsjgm46ese71nvuhzbpzvsh29cynb8b5a8q2onile7qt3z4jy28r50vdoo41llsozaexn8io3ngb1r6vyac55j0fujv8df7e7127o7fkqmzyn9lxly0kryelzfecc81bcraida0kwyf',
                status: 'SUCCESS',
                refMessageId: '7pcucb4gxa9rbd800hn1qi5qw04y7q0hd2idjvdssd6kw29hcdrjbsb7m3t3rgky2xbdpv70trfclubcmw2x6iwo07zxrnvfg48qkcvotkhbuasszsw91g0sfnboqgf3a1c3qj52kctvnnu9v1gk90nws1kw1jgo',
                detail: 'Aspernatur nisi officiis assumenda sint est similique sed sed. Ut iure et expedita et qui et iste. Assumenda fuga velit cum quo quo reprehenderit aperiam reiciendis. Pariatur molestiae non suscipit. Quisquam id non ex ipsam saepe perferendis amet ipsum rerum.',
                example: '6x45zonb5nvgrj3j7clmayeoqr344qvhrxq2jqte8kbumb3f3bp7n40ps7wrb1m1yyky0lovl5thbkwbidru7rre0sueixphpptqhs3qb7p9bagyw2lq2cf7b4clezu64ktx94483sf3f7k0hkcevh6ns9rf9j1t',
                startTimeAt: '2020-11-04 04:23:19',
                direction: 'OUTBOUND',
                errorCategory: 'c6y7akxqa27il1hl2hyg1ox1r1pdwapp0s4f4ujw7fsq5f66vuy0i54i2mar3c8h17bagby97q9doupn3shsn04fqxd0wzr5uwbctf23tkzcsnjl4znop06jr8cl9t5gbn8vtp6mvnfk6ijevl6jx4m8r7rcl27o',
                errorCode: '1bvnqkwuo1ev5luda1lj0f1jsznf0z9g9hsr96dckj8f9ue54z',
                errorLabel: 995729,
                node: 8840211163,
                protocol: 'tw54y5iflx71zisha3es',
                qualityOfService: 'dhhnxo3kidwc1ptwxpnj',
                receiverParty: 'ozbrpwg432j6tvotm6fuo9iryp1nhactwc0blujdjw292fatpuhsn94qfp9cdyfnzu9xxh3c24ebb7apbpevho273yuamzmhuyvcuxp8ir7nx4jmorqs9yf39sr8ax9rcj452ywcz6d3ds9s2rxl37hnnxiqqi7t',
                receiverComponent: '8hnpfrv8l9aevkwco6f9n30mx0biurmvphmvwe2bkzl8x9ei9yuvklxgjqr7v1f426ebfb7jyxpfj8umfscq6krc1z5xldok26dv6yz4yolgiub27dsn8vx7ek43xqq4cjpuye02xl8km3mskxjb8tcfkzn0oreg',
                receiverInterface: 'v4qrryprfz012yfrpidjftnt2cvz7qarsi5pgsyjlj2qmq6nnrmh0t9a1hc16ext9ev8mnffeojecaow2xnarwowm8eacgto37svjg2kc3jt7vf2yd66mqbaaopv1lixnq5z9pmmrrplfq868gch8lzosbsnpgtn',
                receiverInterfaceNamespace: 'hbdabjdsn284cu2aa4m4pid8x8o573covnblyzhy3w2cwxka3lbbkuvnfcd4wz7y4g7pzl6azcbzjhxealkfyoj462wiswce32qi3jvg8kglcxwrwkyjr5b6vpse3ke2nj5ho3x0ints0qjawu07szdm2023zldi',
                retries: 5429165392,
                size: 4941382576,
                timesFailed: 7081522305,
                numberMax: 7597216442,
                numberDays: 90212854812,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberDays is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'gw9odl4x9znzw6z7apg6xveifmyfrpl3uh6a9bkvtffby9kwxj',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'mphl6a4707vw90fnt970',
                scenario: 'z1k7c9ptty5mrk4d2b0baucsz664j1iuviozlnjrhwtpby12jp9h8t6zswv9',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:17:53',
                executionMonitoringStartAt: '2020-11-03 23:37:03',
                executionMonitoringEndAt: '2020-11-04 11:13:28',
                flowHash: 'njiouk9cau0ligpb8902ldej09cy7rg5mvh46zx9',
                flowParty: '90gv15grxamsntzry0yrwakdfmwlaj7ane9ssadvorihxsora1uzwpk1qrn7c4f9sts4p7x0ajgdi96dbo3llr3lgtybjy4f7bhjfqw5anjsfmh9pk13c655zkhox3xei901qeoss6iof13vtogxwmk2214cipsp',
                flowReceiverParty: 'eh9ytzi3iem9dzy9g0bmx09rhbqdbc5p55v9tevy3atjvchg8k386iibjjtnatydn888lmlbdeaa11yhvwqp98d702qzpaw1bcgeirjqxqb609q91og1pvn62k1ua74ayycd30sx1bvc27901949nmc2awonfmgi',
                flowComponent: '53oxm3wkrqlh65yz8qcgv9u04kdxgbgx19mresxwom8otvn0elwe7nkhaaxed1amlycvdc68qpjekraxtx7fzc284sh29wq4piuzb06181gl78o6sfitr7rfkfi2vn9bml2cffmwg2i2fbqoxwgyko1hxyq61v98',
                flowReceiverComponent: 'mwyjknpvp1lodsuo9gsflefiitt6o3xrsbks26hg44xa76r6b1tz2tc2sgppwil0h9fiunjkfs3pst12ngpt7xs5s3rfuug5fqhrdqti2p1vqgmo0rvnu2tw3hsbyigjtg9k1stev880gafoe12oex83jzxfanr5',
                flowInterfaceName: 'q8n9wuv6ydxrr56jagx9vos67p4hynadmrkrbg7f0d63p3l0d9k1cvf8yfydvmd8ywvilha1pwae9klu3x7t5l7ranreoll39zce1qpbhyo8sddya1qg20qa81xdrp88z4x5hj9j8if2gldrlfxw6htwmasc6m9u',
                flowInterfaceNamespace: 'max5t5mvgmfyfzz332qdqdp4ynszqw5d8ky99120i29byowgp3ba24bf2pwhi5ys1eyi9ak6aeftkkujafdcugthlbqrfe56h7suz810yp6qo0wq2l6hfwvcewh3zukfbwxh819bp0i0v45xgnxw2x8uj5f5o4wi',
                status: 'WAITING',
                refMessageId: '95b0ip4td2f1rotamx1nlruyxwmvdjep8tapwb9vmbz2hnsipb7v4h9xttik6ywpv7fook1rzp5t6ii3usiote6leb7qh48ipvifvgy5wmwxsks4et4n7g1t4nn893p8t0n14o11usobzz7ve75faii2ykz9sv66',
                detail: 'Cupiditate voluptatem cum autem tenetur omnis. Aut doloremque quasi facere dolorum in cupiditate odit nulla ipsam. Illo expedita saepe distinctio quia doloremque et quis voluptas. Maiores ab hic. Inventore accusantium est vitae voluptas ut velit maxime perferendis doloribus.',
                example: 'ajij5r0hq8nc713artbi6479xfw0snotcaofwjqh5u97x2nqp9a6664ztawfw9qz66hzpzbjw63xfdj10dh5bqbrrcb7jh7u8b0s4jxncxgfn4zgqoi03fkskcd74kjvucy5hqi9romqn96b992m5g36kvi3mjp4',
                startTimeAt: '2020-11-04 03:44:40',
                direction: 'OUTBOUND',
                errorCategory: '708xotre0qh6kfx00mieksu8qjam15hqps94diwiqldgyshu1n4o5u6dpemtkrp22rm6mpoc0hr5etwt1aook1cxap2prbsvke44dpkdk18wz3ox8kbadq7ih3imsyhbn4k4myeco39kvel6vcnfr27x3yjipt6z',
                errorCode: 'q7b8q1wyz0vkvtb7efu1ovmsu9x89c1qnk1jr5zwq713xqelaj',
                errorLabel: 404225,
                node: -9,
                protocol: 'ixl4wq1b6locdw661vgk',
                qualityOfService: 'c2lwsicnfwbgqqeq8yo4',
                receiverParty: 'jnorypthr9zdcjv3ij6wb5kh5ttc25skpm37fosvgz5df160h09j0ckzqb7siues4w2u972thtohexczppgek452hoqkmhu1ex5r8tlxawlbxeen46ujbyx2t4uxtlinzgrk3yt3shs6bxbkocvtw2b6wb1ll5fn',
                receiverComponent: 'npt8eiffmchri36i07jjsytzkfj46ro5jqchs2be587q2uvdtx0yx8x6y0p9ze0jpy9gxqs6xht28ghcw08l8ctwu8f0jtojkim2o4dms9pqfpmfim1eijl6axrpo4phz7wxjoc2x9h6tilgyyxtkdr2rwqxt6wi',
                receiverInterface: 'y3sr6fph3540d13p1m0vtk2nah8q6dkypsf9c3k7ldraxrym05pbq7zsfs2c2ro5441me56n8ww8cufi25jv2ybia1gxxwi8ipf8ffjin5knp7izl99z9grsoqw65dxm3ekp6h8scfvf9etvx3mla15igm68lhbh',
                receiverInterfaceNamespace: 'bv4rj2ylg2r7jmiap01rybk55pljpq2yn07d2lvt4tr09hx7xtuw515d6174smevf8kol660g8k9iu14ts64hgzjo73fzuq7ezrewfq3hbhyvy1ilohjb3fx1v9j0gnzlyxj709ozjgnkajiuxneei5rkdtos5r7',
                retries: 6814675251,
                size: 4541116275,
                timesFailed: 1940120543,
                numberMax: 5888184263,
                numberDays: 8968723302,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'tceqdyfa23rib40ww7reumciedje7s785vvmno5ysw10j91h2p',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'ru8o6vg7dz73fqt47vcg',
                scenario: '3b9iy1thwc3pmpx9j3jes3uzfimfbqqp7apdngy4t5eymnu63tsjkecchpxk',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:24:20',
                executionMonitoringStartAt: '2020-11-04 12:41:34',
                executionMonitoringEndAt: '2020-11-04 05:25:57',
                flowHash: 'eu786x3q29vfmn8mgol85vbho5egwvbydro9uvh5',
                flowParty: 'oph9pldn7l4d203obsztqiu4ilxygb7lclnu40lcm4743etczjg1n2xgebsbz5o4u5sqccn2zwotyo1gv4ofmpx7mlzj6673w7yzersy1ccl2n36f8j1131iyegpewe6m76incnumanwhch6sv8e2uyf77mz9aqi',
                flowReceiverParty: '7no5otie9s30jxifqjgxjhwvn2dlzcfwwb8i7hrgk2jh27lx8jaqstptnwhkii5llymvxcr7a5mceck88k5fkxosjuap9537cicu1ga22r6yd66m1e4blvo3fub8gukdi7pif0ebvb7kmjguhptb0e1784ipx5yh',
                flowComponent: 'obvi3p9to6gq31b6c16ma5lfo9orc17dowaegj1xorww28vnptghmucxn182t7zrm4i37p406un3bs0zz4rg7g02xt0z8a36blrjbnomnrrb9x08s6flg1fi2djmjtfwb394djhtjqkxyxbscyadhpe7baq3fd36',
                flowReceiverComponent: 'jayr4yublo6umvwzscixgt9nzbya9ys75mdyl7we3qtliiksv246sog424b592b3xp0l6rbobr14nf5md9atfd2n0s60mstgzl3ldf9a63ejv8hb5eeq9ayqfb19acv3t3m7cxr2g7sky4g6o35h020rmfc0wzcm',
                flowInterfaceName: 'wm60odl4s0g7xg00d0nkwacnu4st8wwpygdks8py234e0zdok4hzftxb2dhu3ao1wfpkuhc74foqktts1ea0un3lj2d4v7ifwswdcjjiexsb2kzxg525zxkspdyknufft4oamxy2krmpouc99iijxilo96kncmd1',
                flowInterfaceNamespace: 'b37b8vs3j4l3vgcy7gf2xqux8iqlf35nmcdp2s0w1hhaysf4ec9qg1n6cz7qyqpkbtu3wdjb7e98yby8dml7r3j2ptoenajmvmta8amjsjnov79fbvlf532n2kkgo1fxy99krtced69jf2w7gsnq0k9iv8n9184w',
                status: 'HOLDING',
                refMessageId: 'm3zf6b2ploquqoi71wdrlovzjfl4kvik3atjk9wp5m2x8s0vez1au1t37takvc3ji54ix1b5fht9fvspq5swz6yfwuvwmar90mgu0b0duwrbhi2cq4mlnkp1upie14vrdjnufkyeclta6mfz63fg39y2kljj1b5y',
                detail: 'Harum aut odit necessitatibus aperiam quo. Dignissimos nulla excepturi modi animi sit aut. Et nihil iure. Earum quam ut omnis quas similique repudiandae eveniet et. Quia maiores quasi quo nemo sed culpa cupiditate.',
                example: 'mvqdu7o9iibx0zb2w8g5xhls8q6zbzqxsyl5pyg3c2lb4s116t0ivffi61bee1p9y6eo9l7iya0jl0kmkkxc6ywoxo5lrlzxtqoj96notmeszrhyrpiw02vtv9fy39nluc1bb8usmfh8hcc4jji6pvbpgyr6ldf1',
                startTimeAt: '2020-11-04 04:29:43',
                direction: 'INBOUND',
                errorCategory: 'pw2cw675yesk1j82c62ep12a1qnhtyfnoaymgfnlceboc555d7wh55of84ywqctndlbvkxbdli0hdzmu82ftomd1rj3fwhb784gflpco3j88cij0bvvm2nrshvoqs40jp1z80l3p1ssiprsmeb3rzqu74of21udy',
                errorCode: 'qtvgzje7gpsjad0b25zerixoy5uu7yfm07avekopqoxbcglk31',
                errorLabel: 357620,
                node: 7511907209,
                protocol: 'saxfyr5ul89jzadve3q6',
                qualityOfService: '0v8k1wvyajdh7my9icdp',
                receiverParty: 'jgujxzq8gwpebkhqi1zknx3uvkzij28v1lrbnt1a6m0nau8w3j1lsidztc54d02xnrtbw1bbp4y0nakdi4h717cxr0d5cnib70cn1ztodcmt4vetuj815i6ddyqw4vte6hdyy517w5ambjza7felvg1mkmlw3koh',
                receiverComponent: 'pwjtvqs0bsp036tna8s7a0omzituufj078cgretat1onkii2aehnrl6falqhhokj9vcjzzvg4b0sou9klwzb34wdailjqtrlbjbcje01e2b1jqmenybh52fen21gb0qvosv3llz9xxu64kctaj7g440hq1kbc1d2',
                receiverInterface: 'rfewjl5147eibwbjiqa194zn1r9h70buwol1st10ts0rssd3rda93ernj8h88f7t27jhayaqh06e08xrr572s6ajnl1w49ys0uhfa2tdcyhx3eoklto8mfs5f6hnwoyrnne8tsvhy6e5a1ernzu94b165mcsh9rd',
                receiverInterfaceNamespace: 'mweqlctoc5uaf7v4s0oebvhtblaejqnfczvs6uw7z1rd9yxkn4hh8v2so2vswrtqflfpu0bsbfi1hxl1mj4wik55id5gnukj1yt7pz2wlcohr7v81vmth3b73at6ylxgx9fxnbnsq63rgbytj5vab0kz7n4rhfe8',
                retries: -9,
                size: 7644160352,
                timesFailed: 8234739307,
                numberMax: 8902301207,
                numberDays: 5241271960,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '3h1uxrckjis8fb6y1sjond9g85ud4dbd5f86fp3bas0fd19qeu',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '0q0xlpiz4uo94yal7gno',
                scenario: 'yb9m2bfzvzxli7mdtl8p4td6y7lcmjb3p41w83zi53bgngxpk7aguaasiqql',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:58:31',
                executionMonitoringStartAt: '2020-11-04 13:02:48',
                executionMonitoringEndAt: '2020-11-04 16:00:34',
                flowHash: '0pc4kboifhna6mbjxw3hhucv1o45huqugxkozutf',
                flowParty: 'cgvmw1x0hpa6i182ay7topnsxisrdiafwgt8xa4cln1w0hwi705s2636lwuzsdvbvprtc0glo7xpo4t1hqj6wcdoxaycxz9v63xj5ivvbs2skovm76rexx5gp1x6xlrs12umfacnq1rw6223uf8rumtw437o1xpo',
                flowReceiverParty: 'z47yafluksivwd10q6ift6r8xgrff9aaz1mrnts5rldq0053mkl077dtwxa497s6v13at6cjs72065f1qdzm5m2x1fcksenjm1b62xh5d3jffw7lt7gzs4tfwrbhmeb6ipdumqjg1a7noxnoa3uqik7kul58mnkb',
                flowComponent: 'q1ni8qzl4sw6jm9ii8320ri1eddv7mac8mt7sl3c73zvhvogezyzw2yjacf0rs5yee8zlhorqw1pkrihsmot28cuzsti6m5am831imo6i1wrgcljzlylmcih350kzgaivd468hqsx6yp92ljov4kmz4rvj4vxmcf',
                flowReceiverComponent: '39d1qztgry0qyiyff3bhccfbh9ipqwkiicunmdaj41j0lmpav5qhhaliilmy1x2rhxzpcc78cy8lx4uqlvk027wu2qnaytapi7y1yob22fdc4mdg9b9aiaqt4m1gajzp0wsjdiiqv7pl4jyp76j47i5u37zh22mw',
                flowInterfaceName: 'le07iky1f4h7h8n94taj88u2hq4aanf9wp6zjob2uq6givqo3fxk4jknr7gm6sub8myh3k2qjy3nszwb0wbe548xxqhiahjoi3d0ikrb11awnjasu14xbhg6jlmzhxiz5f63ryup48l6epahoxp8rxzo878mz2m5',
                flowInterfaceNamespace: 'yd2owd123zeumnf9p49tyn3ukhxs2b1ldou1sf1yimsnag8epxlx0sazeoezb8g5g4b79c9mbyssg9581d35a9ashiak0uh6j1jj11hfmv13cews4n54vanwt5cjskbinbyc8int59b6nnd62u8ps7aav01zggiy',
                status: 'ERROR',
                refMessageId: 'uq48r8g6ptqlijh5cq3kpvxppk16agsu9q1ezimigkb0q68scmeyw86dcuf6751z85qlya8k0vr7fash3xmjcheti4hua0xpanweqxrcmh5tvlwxql6wtracr1bspkoacylzjcqdikqsol86wyl6jvfd1s2l2u23',
                detail: 'Facere a sunt numquam reprehenderit commodi. Consequatur aliquid ex non. Eius rerum dolor.',
                example: 'xk72uk9suxfvn02u7conchqi5sz35m0hwrdczg240c4qq18c8qbpn5xzdrami346oyqewhaambczaypyt04ntlj0ucxdq0z4hsut5f3cyb8afj166etvw83dah1aymzil92flzgb8lu3uojpedj5xh231m9pphz7',
                startTimeAt: '2020-11-04 10:42:09',
                direction: 'OUTBOUND',
                errorCategory: '9cojv48pbzympvi0t5qpbkacdrvwr47a3s7h7vlz6c3m7v5ringb5viinuu6pzc48xb0gruxvis5w2r1jlu108r6fpyv0wk4i24c3eo1qmnmpbnd69ta2ir34r6y4fuonei0gg24dv2u053e6zq8empy00jt94nb',
                errorCode: '8yb1rf4ldqy1bsyjsjy621koha38dhb7jxow1i4t03lc6b0j88',
                errorLabel: 159833,
                node: 4623780158,
                protocol: 'ruzzorvflyvrwnheoq3n',
                qualityOfService: 'p44tc834og1t16wio9n6',
                receiverParty: 'ivknttfvr50nfu4v8hkpzksbeij53bsy2sykwxepclyxiinbqelzx1irstuuexbtyqet0gku10t1hlapq5gy4zmn525ir97c1ds3areuy6rbrcu7bvevie1if2mnl4xvrff5xmtq8z5npem35tr5oa2ie8zx5lov',
                receiverComponent: 'sybvt28uv3y6282m6xs0zmdgw6cogp2wewi6jxgeb40p6ysucdb538i37m15dxxkipbrwot90jffmpvrd28gl2vva6qormcdz98a8tqn1xpw3gw6i7k2qy62pgr58llx58hbd2ykblmx70aouxqbpunmfyy9degh',
                receiverInterface: '3vobge0ube94fggr1ws1psg1zttd8fm6godsp95zbfu5gstfzmpqnxpgpk0chcvk3nz2vtbjym0817xbpz3gsqda8yuur6m0ugapikuqhsrn453wg2cx7tzegqats3tc8jkluhrd7fhep0cpf75s8ithsbfxrhx3',
                receiverInterfaceNamespace: '3brevnx2hdirrm570mqdzrys937i1sgt8t4umnrmsvc81i8rexuiay1kpmkq98irknyqk7myny8wqfqairry0uivvro7ax8ndhx6oqeg085kx48c52naje8raezncr42kmuyt3yztyaw2mcxtpdkdfzt7tb4g5dv',
                retries: 8378206240,
                size: -9,
                timesFailed: 9209891361,
                numberMax: 7537561006,
                numberDays: 1588104638,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'nlyt6asqfawbpx25oaw7tyhxcw9sbs7ryqcgzq52x153jwq43d',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'ajdojzpvhq99cyxwimhh',
                scenario: 'wfyzjsxa2fvqwsy37zolkf35kse5w6kwjbz4v5rt1k1gqki2wkanhxzvbaoh',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:53:16',
                executionMonitoringStartAt: '2020-11-04 05:03:18',
                executionMonitoringEndAt: '2020-11-04 15:21:09',
                flowHash: '71gwulzsj1dcdmddcxt045wdbyk7jwlm2j273fhg',
                flowParty: 'mzxczkk8bjkvriwvx0lm4c386cpgfwhp3xhdpodthp11us3vc3hub03zw9jbjq3afylgvym30ys0ksnj9h48t4hn7m9h5itnovridor3bjmoid80wulwfkaskjqhw173i3wsk74fpct0uwi9ekwwwgiwy7vzm66k',
                flowReceiverParty: 'z92tcyu4bxgw79hbzhuu3wlmowqyger2gm8usmuteapb1hnci1ol6dzmkjzyhqc5u5axp6kzaoef3lfwqkh7i28emtffd0h33q5hldhbcs52ku69sitw3qxejo3epdk8eo3x8lqv28v5jwq0tykoyuvcfj3dhw4y',
                flowComponent: '607cwp05x5rduzz87sliaioqc5xxfy5pgj86592wxf7x8ta9d1vivx44j13raa256et7n6p6oe7qd0lslj7ewquj80l07xh6c27yhd14kczdvcdq1bhb7pv1el53luuewg2b5hubi0ioe2oionzws8bp8miccihw',
                flowReceiverComponent: 'l2zdkrd02i8gencfvspbum685qtf2bzzb3crie36peqvwmd55ak0eufx8jizp83mwwhtzxrl3mkqofcqdrbpb2fha68ag98clns0migw455epjkgjw64yjmp763ehzo5nyn0lkicecemshl3eh9yvgr4kc31x414',
                flowInterfaceName: '4o4yizumkxgko13dao6iysuks4k1hx92clszc3eqfuapb9fh0csh5c9pk3lbxb8k2xee34i0k5cocnlfn3jcemlxvbbljqv1t8fjl6mo3al49w83n5ome9i2u0be6bv9k4uguff7lqnvs8pjp44xf8yw9wmnvytw',
                flowInterfaceNamespace: 'ty5a5hpmjus9e5ej34k9ubjb5v6vbbo2rcboyq5ctf4r98p0m3fbnxrpp6j6ob47qswijhiv4cpe70sagw3j5641y6mhzmylv6t7uz98zqcd70r9pghintuql8mofs80wi6nb4e01likd1ktv4tnhvef4lydhojs',
                status: 'TO_BE_DELIVERED',
                refMessageId: '16t264f4zyjk262s89p7w1wa6jvdnf6812wroiqyfhqw1ww6t6iq0twunypgklusfasqslrb3xvbitca8esbvkawx8i9z7n49pq4gxqa0g5uyl4uqlpsfh5jsqtljhsrdw6wdqjleuwzcnnsgxjreyc0gtvabal0',
                detail: 'Laboriosam quaerat corrupti dolores beatae doloribus. Enim nisi dignissimos deleniti non vel sed et ea. Minima possimus et. Quibusdam iusto voluptatem ex doloremque aut adipisci sunt enim. Cumque inventore aut dicta excepturi aut sed laborum minima. Sed neque sit quam molestiae ad similique.',
                example: '2krnpetha7fdh1pw0ghjjbb8lqccwgq1si0hash26mqpzpmeykesrayasmrsp39baejlmbotyks439yt3agk95kmm4603qmld35rs63w1j2cnijrmaukd21dxh94l6anvmemnu5738gv4vbcr3u7us50eofhp5ap',
                startTimeAt: '2020-11-04 02:57:33',
                direction: 'INBOUND',
                errorCategory: 'ykv5qmc20dae3z9k28wtc6ewlghis72d6w4ow07yvxhiw4kui76n4u1p4xg7it683hfmy8k5knvuuw3cjjmlndtfi4dj76xa9uiryr2sdo4oy3cdl6ibl6xpxwsnd4ngyewerv518o739tfy7l3scms8dvns1va1',
                errorCode: 'ypc85p8z2m3l14osodk7tcsmrxiun5stey1mn7wfl7gah130mm',
                errorLabel: 293783,
                node: 5981433979,
                protocol: 'm3yep4pqhu1jqzouign7',
                qualityOfService: '8hwjs53npv4qza0ztey5',
                receiverParty: 'hyfrwmhbg27yqjb4y490tg0nhg5qlnd0hkqcs2gdy3u1npzqqezdur76wsl5mv8g0clw139b2613ys6iejclx4nf7k3z4ecqh4s7iz0dlk6dcoj0k0ibld3ww0e8bg2rwz0g21x55n3yhlw8u6tgiz6nzpcgeriq',
                receiverComponent: 'u8ar00viqrvh4gjnsx4dwhj1cgunm12cmua4qbqhrgyjjua0cu2k9zqngnmca8vhwpw4whanhsc9se8mmoqtxxxhlkptdlg2zccuju9a6jbe4vq5xijri4hs8cup7o3gecc1r1inkd2kkmtvjzvw8yrpazhd11hp',
                receiverInterface: '5gs1zbkidnl7vbpx1d155c35ovmx6bz9ap3x7divlcwghlqg9po6qs75tyhbsvlo54be60nyfmy8p8io30svjununb77bbiz2lwgjf82q6zm2wzghhja3bg4g9lrhseii32hyjezt1lnct5jv6u0hdh3keu1dbdj',
                receiverInterfaceNamespace: 'qlwd2fz4g7nupl5cwvbx2g1sdy1f8xr9jc55rtb2x635rya5spavar3j927q4go51ysfvocxsntosv4iq3pb7ecn21cx3cmw9fn5hkvu78w4q8wjiqc2bp8hd2hkfmuhoujhwjhpbw5zwq9y7gb2459f9di3wm10',
                retries: 9963508296,
                size: 3923898713,
                timesFailed: -9,
                numberMax: 5038364868,
                numberDays: 7645789327,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'fsysa5fki2nyqm9qfcb1dye5qkp899sj0y57wia0rhlflnd90r',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '8g9mst80uh8jy5o1k888',
                scenario: 'm5py8junp9b3moj149f37x2sf8lrcnqovachyf64p2hnnjhmkf0r0v7fw1wq',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:07:11',
                executionMonitoringStartAt: '2020-11-04 10:41:09',
                executionMonitoringEndAt: '2020-11-04 02:19:12',
                flowHash: '3hmmpr5exqkhd6v72800pnwoqoduffofm3xur7np',
                flowParty: '8pkdspzayspeizzcs6moxemc5l0lyfu6uoksx1y0wnec8nznixhp36w9w7q77vmjastoitj0pbzrovwvekyd4huegi7kvb6q5oodysfri74wnff91yd61d484fc4sbg1cwuqqmhkcjtcsyr30qvkpqq7k9pvbsu0',
                flowReceiverParty: '4qonqzwetwmas7s5idbm2dlvb50ovb17lb45yhhfk84gcm038ygl55pquy8u7yfsbvwo9h80lqj7m6wtht3mlz6cnwuobneii3tzyfjndnon4bskbpdkwtdc043hdean7dp2wbomr8pa63kteprli4z9ek8mrv91',
                flowComponent: 'm70igu348wpfi9muadpix2jnkhx0i4l0sle8c9mpftn0nadtey1r8zsi53ynwjvami5won5kkofpu7jojltkwtfzbvd3noui3vj4of0czazatrecweepgmiohekkbam5kdeyf1cmctzao8335z9qfak1bc0qrmd6',
                flowReceiverComponent: 'oqq1qq365nlnpn0upxh26i1tqjlvkgtrkpe4z1vvp3l59sztrx1py6qsrhgt7loiugyq510ij8to86f1hrgezvagksgzylemgpj82luzyp6z96xmc1q1jks47vv1vj1798nxbc8v3bhcx7fvyhbk34bny6vkacam',
                flowInterfaceName: 'r50rqc6tyq2bmw7g3ejg6cqul9i8fcz354i5tks16e08ffa1snrz0kzzh7mz8ecy94wrhnhye9hl1aksm9erlwrkbokid9hcdqbrwzaxcjq8h34dgxxd09qfzqs3f5rhq4ool8mlery98ruubxpo9ncfw5hvys90',
                flowInterfaceNamespace: 'ss3njtir0n8qcklwzz6kv7prlw5bmnq3qwo74hfloht2jxe2s735sbovkza5hjffsm2sfo9u64bdxed56eknpj1pdwf71x9w3tmhhhp2am0kwl2l5khhc4t2txi6opatadddp5az2aoi7po31v5tu30dyy2rsajh',
                status: 'HOLDING',
                refMessageId: '4l3ty9k6ey5ersl42hzar5v2mvqsoi5lclmnhj6449hfjn2hlp3zptekz4plp9dnpqlwjb4rckvqpw59c17y3rycw3og7foeon5i5v2ldm61mv2gtdy63kibgz6hmf00nlawo3wuslb7dliwq8mztx39im1ey4di',
                detail: 'Sunt et aspernatur natus quo ut at saepe. Labore quisquam at fugit dolores et dolorem et est. Exercitationem minus magni aut aut harum non sed. Fuga illum aut voluptates non deleniti temporibus eos aut. Rerum qui id.',
                example: 'sbleo1k3bwbgrnnfra1ihbn7yxcpnvhmo10mfz505151rqvka7a3t4u90wazp49c5uwl9yzb7t0v7mvkioix71n5ib0l83obrln5s3v12jvb1tmmvy5amyrmvy6doq7fz1mvqhj5rscz5s7bkjldazte71gg09vc',
                startTimeAt: '2020-11-03 21:47:50',
                direction: 'INBOUND',
                errorCategory: 'z5uvzsf744ve53sl41cep42dpwtj9j2472smxh0oc7crtob3aqjtxkln5ry6grhufz84xcmj0wjsa7spxawex6s7a1pj9pg0lgeuysbifhs4lveynqkuem80j6zef61k60idi7ooz6kydt2ykdmglcbnoswbfjlh',
                errorCode: 'fg3duh6uqfr5ecmhdsc74amxagqyl5yfn83eedxtd3vwi9xue7',
                errorLabel: 831580,
                node: 8873909184,
                protocol: 'bcyrfnkt6puc6wrmqmqp',
                qualityOfService: '5j3s4wbkyqybc7fgamva',
                receiverParty: 'c63fqbltuhq2ugj7a01c16d4cm1dhdxj02k1oztxders0j9qg89070836u1c3u1n7r57k9kt2ku4sdwqf7wt6btm9n09hexqqtagikmrfs0pksncvtc8xc2nle8iduax9bt0etj5b4am7fd6pvkw7kb2xv75099t',
                receiverComponent: 'dff6p005quk5wooplaf5ffxhn7xpnrul9uytmr7cusfazgawmrepwzowhf0bum45l4xmero7kc7zws2nqjkvieeqm1mgxwihpbzwdktjapl0uwuzxx8jiwmx2hkqb3e6nx2ubvx1s0pf6lfn2f2t10xs032opaqq',
                receiverInterface: 'i79oxy6shkeregntjyf0g6lh0wqx94lsrisg74ufg6wzyhsuh0ij2zhw19on9m1wgzd21ixx56655r5x67ya8h1qjef1sjxvb1sivfdw65m9x7nmmghgrjqg301go7ry1jfmfqbog8xbyoz1qvobsq942l1kjhe1',
                receiverInterfaceNamespace: 'wn3osid9a7xr9qhy9dx799khu5bll0zxgtl5b52ws5u6r3v9019ygzsy0bav7mmhm36of5tvsg1tqgfhavarrtdc56rhk6ape9eg9grvwmozv9wom0ls3gbg7bhw9ho5aad64oek02w8i3kkmq8k5x1f0cyemmhs',
                retries: 8463918056,
                size: 4009124554,
                timesFailed: 8930655167,
                numberMax: -9,
                numberDays: 7827856440,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'viguv9ssnr8fg3gck998lg2crkgl6b4v2195l7r1rtsrmpc7k7',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 't7wxkh0k8mvnkematljt',
                scenario: '0eapjyso4m3y61t8syg51yxp366bxhrwhj5gmz0y375fmcodcyxt2saft24c',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:05:51',
                executionMonitoringStartAt: '2020-11-04 01:12:44',
                executionMonitoringEndAt: '2020-11-04 06:33:37',
                flowHash: '6din758dmqenjmgb39xk192el03yb4xu6xuzwqhk',
                flowParty: '5gcuhhutjie7ds7ei4mxq4we18bxyo5117odsszpsssxbkelopzhxlefivk8djbuq3rfarjhk2htzef8jfamzt4zcenkrpy62a0b3tk8ht1kjcjuwyzynb1w83pkqm267b2ovutwgdwihq2xni0ytnsusndz8d7y',
                flowReceiverParty: 'iccqtg5phfdm2gg89313mqe8xyml8abd5y85kgav91re9w5vp4tbwki4879s99y5za3xdi19yzlrbzkcka2tdmgk5ifm2x7fed7f6iu0f14uemijwpby6y71lfnyk35jpvdyxbfrzyzpwphg1r89rp58r7x9cbkp',
                flowComponent: '8jyg45fg7mhta44fh1c5n1ttgap5sxx0fmcs9fgb6ok23cz9n66q33scerb8q4h8as7l4wj7we94asgjgwuvrdrvt5lj5e73y2kuiqnyd9h9w1za2x5mvs9auledw0lkcbcsew94vbyv82r890vjs7aagutyt9nx',
                flowReceiverComponent: 'ouneo7vjg0rcq4wsyjoqba6uqup2ecv5op9tkenuj2x9ymapzj6os3uki5ap1earxi7sxm28ki4zr6aezf1v8dve6aan8id49a1vax1lm911gk5i65lmhbqy5jolgbyemd8dh2bo2fed2ihpnpcy6at5wctpxanu',
                flowInterfaceName: 'cot5fn4dnpfq225qocuckoz3kvw4c4lo9b37se9re4rmjwqoe4hjw7d66vbyw84frkvtxgtlbydh7211m7rd1bil2ny350q7bqwv36dy59m9h3fdnmo0pqbcud1mms0iztxh01v960xd19dzxxujhbaejcwk4ozt',
                flowInterfaceNamespace: 'o1kke2vp2ozrp2oowc9bvsdoqwn8icw8bc71s8mmzomyzfzqiyl617i6pjhycdhddd3dzc5oy08avc0856wryyrao9tzb2qgr7tva5zun8sxq4sidkee5be1ajrnwft5cx8jzvjomtpof1uh2o31yf0v6vg8sepm',
                status: 'WAITING',
                refMessageId: '1nyfx2zd4i3q5efz7x7h8v5uuf6rh17udf8e42yqajuby3r3r55rjumoac4agpu3kp7v3itgt5f2fz9aixfaoomcwpdw0l1vkf3gb5iuedailh28sccu40a2p30fvb7toa2k373nlr3ukn2ek9m1qid25ymrzewz',
                detail: 'Tenetur dignissimos aut excepturi cupiditate. Perspiciatis in enim suscipit magnam molestias. Odio aut laborum. Aut velit voluptas eum dolore delectus culpa fugit.',
                example: 'l7fhpvgwcqwtr8hy5sxtptwg89lj3elbf4ggt0wzcv9w2wbqr3yyda9jo21hhm12ouxzu03cvh92xjjb53c7x3fl574hrv6hu4yeskalvan2dlyvyrunezvbofjeolvzq9x14knc5ksclszmaicofx1fcm1ewwyo',
                startTimeAt: '2020-11-04 01:56:36',
                direction: 'INBOUND',
                errorCategory: '0trzr77u76h0zancve0gne3p8vcdogf13440ymn00m8jf1qw2gwdtg342l7mt1owisv74gl3pir7gtgip6krczcbhm7rhjsbz1ogiesccjtt7e8ezpiv8ux7xygd5oglcl0nldrr3pa5ipe91awr83m5045pkppe',
                errorCode: '49bjyt1yq729h4g4ys6uxix6k6el0jk811gin01s8nkqfqxmko',
                errorLabel: 836210,
                node: 4800871717,
                protocol: 'ttalyg48ndxsj1c57mdp',
                qualityOfService: 'y3d0albp61srlw4d92og',
                receiverParty: 'wgheozg4i3x5kctpfd4ftzyg9blzpzll2kin4qcsuysfj1tgjefkd256tjtknobnn93by01gajne3y0quxkgshja1cjyx6jc999n69auwy8zfxbudgiua3tpjwkk8m3ayfdz4l37zwnhjct0wpn85eubkpa8b7w0',
                receiverComponent: '79pu6srl3zo09sfn60rjqs18346h0iwn1ltu5q8isqcy5p67m1ix3dv9mtaixr37pdjb2af6tvyuv2424t288di1sio6tz90n1rntsv0ym8xtk3w1kdngri81rqgtp5mjxtixe4eka28o6lpgp8n4lm9nr77sxog',
                receiverInterface: 'y84qhqdzva1y45w8id7grescxr7fwmqous9tcsb9yuuv1vvepvy5lnyblp0505rjeipviryybwyxfdimyl1cec2160ama3rs7qv39dt14g85xaxvy7nzuh9jueqdsddkr396z9ml4dn28nnmbwm7x8xjzmppgvri',
                receiverInterfaceNamespace: 'f34hpbhvlmjdm7m2wu4urucwwp7y09kq1oo0ev9lbd4cqb12gbh8uzmolavuuth785gn1weux1sj4wcf34aaopl1pdpybuxhhw40mgufhi01a9fwheedlwki6iz33zopd5sseoum0d0e26nkx0umrhmp2epdi7b9',
                retries: 7186451641,
                size: 1905502875,
                timesFailed: 2305924197,
                numberMax: 6287651776,
                numberDays: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '17aoypwr2hs7g3ih0ovb5qaxe4qrv6guyfjwvngigxl9dglb78',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '9bezqdjx341u7bsk0mgk',
                scenario: '2iuqmg9xu5tmx45zgrul7yzw3u8ds8x9hchap6yzbiogd3zwz3s2ynrvbd2v',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 02:16:56',
                executionMonitoringStartAt: '2020-11-03 22:31:37',
                executionMonitoringEndAt: '2020-11-04 15:18:17',
                flowHash: '6wf9j1n27slt6f2v1q0shl8wtkprjo14rzoyon4o',
                flowParty: 'ijxd0753nup0xuc9afph2g2z6n0b6gj6hfdvyk6ji9yki8iw4v4977f7ao764it2yzun6w2frenllq39ciqf38phu11y5ldzao92yt83eqou80103wg4rpo50xxj7qclwupsfyjmjccuaov4q5x219neknb2q56g',
                flowReceiverParty: 'ov77ujizzqv5equolxfe51u1ubvbvpywgh57v6ymmkt8gwgq4ppxu2upzlniajdf9ba8dvlcd74438gigpjsfqvnisixkhlxyimbzf2tyxlfzr4eqsw8auxy6p2pyi3smokrkmbwq5jlqiqfhydxosr2no9ehau7',
                flowComponent: 'myebevm4rimsyed7ox2cjo1clj5tdlvku4m18zyew596364ppf68vb9a70wzyuhrkymrdw01wqfvtzjht5tafp92wuf0ujg0rx0r0uxh3f138d00bpvni0849gbjrpjylqmifaxjtezkbeh0yqkfh79ukc44qixf',
                flowReceiverComponent: 'g49t150x50vberrknwlg1xwpnvk4g3jfzge71hfw50ox59m682fl58htvs66d7auvknr79hw6vv3ok0h9irvuciygoicse3laaot8dqx4fqk7437g9gvb19kv2ztat15ys8mtgi8np9w83c53juildti6mteobvj',
                flowInterfaceName: 'a49hfli8s52gzlvemgqxiqhx1xngwvwu7ntmm17ejo1jq2fs9ygql59110xszwwihrdr46p6vzbvhiamidkjbn1wwe2dbvgc47dv91fsapt8lvr817vueihjspltda6s10663f32gx1msd71wrwanalzoi8t46yy',
                flowInterfaceNamespace: '1ge4nnt42h220lhizghzwria2dquzncx5rvycf6hsl3wyaaff4yvtkpv494ynmpalj3bvsjubhypjz2kzd2omq6xmljz4szzg6uuyah1lf8qqqouulvpm2sze497k45qxfs5xtbli52eor88vnswnj427lrcjgx5',
                status: 'DELIVERING',
                refMessageId: 'akahsad14yiznk7aflp6nwqtv5h1hyj3jsz0tierpky0nim5zw70dc8pn331e4rakts3dyhzra9sbxi6fmiv9m5pn9jo40p3lno8efosc5z3szeipu1krudx4d9ml5g8t3cv3cobdlevsz2c5ylr9pks81o3kokj',
                detail: 'Veritatis iste quisquam perferendis omnis dolor quia fuga. Et cumque explicabo in id omnis. Fuga recusandae et voluptate perspiciatis nihil.',
                example: '5hjjem6k86967jja00499e2gpf5bqnuxc31f0jza3qy0o6eezknm26m28hvz0evzxj1w5zkxxaagipqoecu7homqb3u5c4vmgwel7kdcy2uwz7fsgrvjrcale2sg95bw4p36c2apnttvvqeud8664jhqr00gqm5s',
                startTimeAt: '2020-11-03 22:01:25',
                direction: 'OUTBOUND',
                errorCategory: 'dopntdy6arfkxftbgzvva71xypoqtloe3uq92hlx93153p1n04oyt5nbw5u5z5w90gkyl38dr9846zc7pkt0vty04gmtbgq9p5o2wg7jb308qcdfdnp1hvnwamasjiu9b9nbukjbx274mfwz3j21gzrep6wdc9qc',
                errorCode: 'vsyq3dm01hjewr966bqfy12tv76e04dmlmrooo6xxoi8ul9hn0',
                errorLabel: 176631,
                node: 4846370540,
                protocol: '5y8cvrjj3y9k1226uvk8',
                qualityOfService: 'pq4ya55g86ea9zdfyjnm',
                receiverParty: 'fc2fj5maitugsvu8qaddhyc72ggt9xej20bj6tnxnvj658yj9h0rof8wcwyntqq64m9k3n3zd6jpz20t6lmz28bcrzkfg95bruroap598rkdndgnsgufku4j9s1qlbj3s16hou3ou2na4w02yohnjlbbxhnhxcc6',
                receiverComponent: '3p7sdu3ejjjmfj7w6v0ww3ozcvvgfnmrgnmhufh3b3nvoljwxy78jqldesydqrqegh52nsoezrezskyk7iuzucm2i6gxj7fked6tnvo0um9dab56fdpu59ntt6tv2wd2s2qexmllts9xomik4zn6gvvb02vjzted',
                receiverInterface: '21k5e34mkbvaa6q2luoh7mypu595mwlvvsdkvieup7cnmnu8ihscdjhagiadxy95imwnmi06zmreke5ltgnr7bn4h4f5l9q4h2ao8eb423oli341x7sx2qelmu7r6d5ehk7akxejxl4x2q8bf4cyt0w8g7sbe4uz',
                receiverInterfaceNamespace: '271bg8lr7lvhx03y13b392alo7f1mnsg1new14nlpfckphku6t9vnoovz40jfvdprv0e4j31vf0ungul5xz2nr64zv9dsu3t88arbx4i9z09o825xhg1tg6u2bpk5zp7wlq5ook3kcvmgacshwltddyad1zn6cpn',
                retries: 5008811399,
                size: 6349254459,
                timesFailed: 5155452667,
                numberMax: 2112448274,
                numberDays: 9771511800,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'adu61w92zgt3uhz10makg6gdoq8ljz2813naby2q7u7dgy1ish',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'o4wt9pidli1zp8ur834a',
                scenario: 'wfvo89guxzv94ixrk8fkitr0pgaxm6dkui4d69noa3la9569fg32ee2qx2kt',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:48:24',
                executionMonitoringStartAt: '2020-11-04 02:52:40',
                executionMonitoringEndAt: '2020-11-04 05:08:44',
                flowHash: '48svkjk8dsg0zyafxzmr5jtku6d9a4motwk2l19c',
                flowParty: 're80jq7dbs0mm04u2q96e0858n2253pa91tmc12y04hxtxetnynxerhslybilxbe0wioxd24zk3iwle2kgxumndwf0upxxw9x5e2g63chdvj4fbxjmkf2ucdny6bxpsp11e8rjqemscg05feaiaz2w41pz7lwo6j',
                flowReceiverParty: '82yxp6aj0th2x07teywru4pcjglm7vtnpuwswy2o8ks0l7x7kzpbquezsd0rvxk4kch4pnibqx0c15s7rv8jtxoe708ybrlwsuut6r2f03l4ouskxlzo98ajii8y18uz5m9bnc4bug9257tyc0ge2aqtf93d5upr',
                flowComponent: 'bepn10idr7zfmvo8x8sf0zvp4bodveiluhu9vnrfkq5xu5rslqx2c3uth034mop0up29l1e85vkhtzg9i4zb5cu6lxg57w837qtbqag65q6ujlf3wxzawj5jf6mf0frvvdvzuz4329u5nabsxatwt29quo3xodgq',
                flowReceiverComponent: 'ty6pj7276juz7fgz3s207dyatnbgdgskey35g8f5payc3a75x3pzqvztwk1x5yw4rp51ultd0xqlfptewu0sfgcd4yhnm5tok7dl9ust1zbmilvhn9bmvqkio12kr6qtg7r4ut7i3zkn4tzfudo8wmzd8l97n2q7',
                flowInterfaceName: 'ydygq8nj2on6f1wr1zy0jhodkkpwuw757tk8ud3lobgwaqhrweaavjbxocliyr517de9kzz9q5iklogggqcr46iov9m61qw7f7jdsy32foc8af8hhu71oaj3nnzxkq2v3jqm23ss0mt0liwjg62usabb70r5e5av',
                flowInterfaceNamespace: 'u42il1xzjjhuwg63a7nd9k0ztd4wdfgjoj6ic8k1e0wco29px2zru03u5c95w2heradnkxlblxz4g7bj722is1q1h73ysefir200ruwyogm9pzos98c6c6fhmbvub29b4p0un6s6g8gqcjx3v24ay4i3jzcolh0f',
                status: 'XXXX',
                refMessageId: 'uvyddwxa4neqd7s35ngy3busk9qnxgqaraaiudmqwvwq7mnt7m6p3jj29v8pfv8k6u6zk16jafbilw1ezq2uvtd28r0rb43u9mr16zpj7h05enlvodsco2iuzhuzvkwr2459z0ha7d1rm49kkw8vd63mgxrsr2zo',
                detail: 'Aliquam id excepturi cumque consequatur ipsum. Ipsa iste et dolorem ea tempora. Est quaerat consequatur.',
                example: 'hgjknw5u4v9xgvg0ufl0raf2y8z3p9t2p9lx2byu75ba767w2z6kjsc6torzg62g1jcptg6klmo6qsh9svio4gpg0te31llcy9i1knyhsf9y1r7efvhhnuz143gmh7txg7l8mtr1ur8y00sall58uql18xm39xcv',
                startTimeAt: '2020-11-04 18:32:50',
                direction: 'OUTBOUND',
                errorCategory: 'j75bgrp45j98luuipi42slcu81m04a8xphpmxkz3a2sm891fzi1xy6fbcqzy5ul57n50z60v0dp6kvgp826lnzw7vbhty0zeyv9c9c290h4us5qrrcaqzkqxrynlmmf7qewjc4uvh0mmz3yeaoqrrlbfkqmb93sc',
                errorCode: 'mytr6h8mr0je17zqev59ku2acgvfffji4net2fdx0ryatgai9a',
                errorLabel: 856759,
                node: 4584231377,
                protocol: '6iwn7uopyxsfg0tjrbum',
                qualityOfService: 'fqckccyqwtugnprr4shx',
                receiverParty: 'psjsqhpcmrd41mvhy7b9lw12ggpgc83xf3pos8wiyqjbzc9jsfipw8dnc83v6i0h0cp19lgdbpobkfazdodyn0k5yesd7hmr22et673hld1c1nrf9c6e809dlmn6uwm3jnycofhaxwdvsv9fhg1v784q7m5ne7bq',
                receiverComponent: 'h1mtr9hlvvapb105m1oxbomlvl5woomultelwsea0tl7fkrmfc16quk3dzexl0c5op14p3v902rw374z9x8gddfsu2npr92kuena1eykfgzpohjg1cdwx0q4mwgikk89ogi1q3yqqtvjhgb0lnrurc8dux9g91ep',
                receiverInterface: 'mhgcr3ai5avt31n70xx32pf3p57vb0rk057xaz6emxy732x0a82dgdveteyevyymcr9wmn8029947j6ch1v9c7lwi7mei6cdhut9yj35wv7cje0bipmpv0zrg95ao1zpnd6bsh1dvmq84ycsds5fxsormv5bzrv7',
                receiverInterfaceNamespace: 'sqsn52mffxgvqmjpj8fjv1o6rvnbtoj9bqj4ggzezp9rjag3fcg5nb79stabzb5ypgtnsjwz2jb3i5717ydj91hv2duwwkfgdnmmjymn4rpbmysy6cu8a6kwdjek0jt9drhba21yc9jhnp93mign82p6101d8ex9',
                retries: 7535567092,
                size: 4340288473,
                timesFailed: 9503622985,
                numberMax: 6796671074,
                numberDays: 5293471176,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'ejxeqowxxzebkv2vhrvro9jajhk2br0m2ud3o6igxu0z00fme7',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '5j2zv5ukel0vxes3pd8b',
                scenario: 'lfs25oyafc5v8gjnc75azq21y2vlww2mu9m4n84fobity09vlcj6f0ikfv2f',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:20:22',
                executionMonitoringStartAt: '2020-11-04 09:15:26',
                executionMonitoringEndAt: '2020-11-04 02:21:18',
                flowHash: 'ko9kawxno4pihgn8qp6wiolq7prua8i5yubmlwiv',
                flowParty: 'zp0qdzmz51dz7gi55gggghhmpzlsbhzteu87z5fbdvl6s1smn1un8whlal8yd5wiow5tf938wk6m63x4bzg3thr2eq93v6zmytkjjurhp56ju0zdnpa43xk1960rz3wu79izuc6iwkd3y4trhuvujjgmgrqqwr06',
                flowReceiverParty: 'by96luv7w6vpgu2l9llf95hmev5y7me90nhsceggcod9xlbtu89ejnz7kxbx8s9q0o8pfyvv4qzzvlui8ad4i1u227k6j9g3vikjs9e84v1kn95amwlwa2br9o69tg1stqcfrvfussfe21693w96p7fno6ff4t16',
                flowComponent: 'gsm3qfhzn5am1dxpcfrieew7h3apmv6d40k494zohbuvlrzdj31nbo1a6exg1pucss7fx7w3nttzddqcp7m103x3a29u7dv3fzua62gampipnw962vnseddxzrypphv8bg2kovq32jnyenm8cku1bo2kr7cxu78t',
                flowReceiverComponent: '9cmywtth2cfdf9pwdn5utgw3mesjpsu99u2w486lt60edzn9dui768x3ken6fanp9jslyqns275lr7ktovodqtup8smtcp5l69fcgd06uukkog18xkg3mmfx1jnykw0k7k14sdzc2xfs3j8ilw89nak9zt4jvxff',
                flowInterfaceName: '8sotpw1z1lr61u0fne4cx65uawm3tjsdpre0pgrp75mmznvqnidu7jl0c2mp5mw9klv1gv460472e0uavngayhd2g7juib6rfvyoqjt84ix1mw642gy0pzvtfhpyu51ymago9ifa8r3dkugxhaxep4nsso76bfmx',
                flowInterfaceNamespace: 'mlz10gcpkb49t4e90p3jbyd856lsq8vl5n5j56nnifqi2mo7exch179zjs383p2diijg8i2yuciwc6e7l1fx6j5311j85nhrrolcidd3tvl9raff99ojvehfih60iuctprs3kxczh7sk149i6vti92rgqzb2np0h',
                status: 'WAITING',
                refMessageId: '0op8cteyzz4d2r125b9juch4w649boufuioq7qdavx6ww5ge8sa4ep81aks529yuq5rzcz5x9qhh0p6cqmcqphndj7o1hdd6u1nlgntzjofxv177ika7xbtfi5ay14pp0qlrodsz7v98vx27vb0js5f8kh4hy7m7',
                detail: 'Voluptas voluptatem ea dolorem earum. Molestiae est eligendi aut. Culpa aut ut nihil aut. Alias suscipit dignissimos voluptas distinctio odio sit sint eos sed. Et at et quasi quia ipsum.',
                example: 'wvr1guz1izlgonsjoh17djtnwu6bz4a7us86o4ywq5ce5xouzsecq18voizh70261uca6ijyjl1niorreva4dr9oagpoh6xtburdocxa36skxf186wtchngdsn6it079r416eo4dt7h98btfbgpacbpgvull43dd',
                startTimeAt: '2020-11-03 23:14:39',
                direction: 'XXXX',
                errorCategory: 'auvl9ah2m1rvqr4fg3kz1mf3jt0sopy8a656eam4vivue5jmn7qxvmwdtg8yegk93ncsbvhj4t1kl3herenvs0r3za8tkfqv8pj1hzy2lqkn9rwqp9scuz51lydrfz0aqqfl6iymyezwl346xz8skwdl87eiqrka',
                errorCode: '1bxhbf8l8iwxkzy317ix22hkruam9bk41m4bv4obwzp0yfzsme',
                errorLabel: 827072,
                node: 3106547231,
                protocol: '83gpprasbp0ui8uge3t5',
                qualityOfService: 'q39112kiea1m42zeecs0',
                receiverParty: 'poaz7rujwxhrnmlpsqwoqmx38g16ksr5l2p8b1gn8k4lr82fu09r0rkwbnje84z027l5nxbv7snpg6tuc3jhmp8hpyr2dlewad809b77a2qaxugvkz5h17lhi5k5gjygu69rgkwngrd31m9yzrrr8xf51bn51in1',
                receiverComponent: 'nmq4jozu7bcpulkvu9oetkt0lxzwmxj88kps53l4efwe8g39gdd9r7rfjgla2o2cs47kus1xgl43wux0jge7fgr8i7gs3iutjbwzx06zvftsrsw0r8bh1jw0xl4gbjfhjo10070qgec5cjahx95xeydk3clj97p7',
                receiverInterface: 'uhezdhot70j9e26rk2o2nm4ei3jf0ojet24pcpmyg0tdrxwt3v2xx8sehlm9tf9gq2pg1byeuwj0ia65w76r386d8k4a9lvzdhyptw2s8ld33h1lm2cces8puxz2ao9htoyvjd9x6qf1kms46deewzadh844o7yd',
                receiverInterfaceNamespace: 'e8509w9uk98orkdmaups41j2g3aite1xhhwyl6znassynskya989qvys73vsnig0rztnocr8vhztpzkerwfhno040e3evuil3r6rr7ri6xuz8mh0yxwaf534jh6ncy6vvli3r6uhzo2hck98gx4w1nz0h6z6tz98',
                retries: 4638005154,
                size: 4281707413,
                timesFailed: 9095511764,
                numberMax: 4683008605,
                numberDays: 5084390617,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '7wsqnr40qf0119glek1cubklwatyyll82x4pee38n80og31fa4',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'ajo78bxggnjkyr2czudb',
                scenario: 'l4yb5y14tlg4ih1yfw5vzj608jk4pfnjgsyqwzb48sv3etcbx1bryehdhjo7',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-03 19:51:12',
                executionMonitoringEndAt: '2020-11-04 18:33:46',
                flowHash: 'zd86c3vm5q7804gkojelrt7lttbhd7fndvdm42bn',
                flowParty: '9ghbewzp98jzywj0wbuef1dv1b7s1ga9m4qj41o2cf120c9yn1wrvqatu5fxyharlqbaku3iid8u9pms2revgcv5jps3ssy1s2f8qk1vv5vrsnttmt1a05smdfjkz80bn8d5jsdflciyduy8rln0fggclec0v43z',
                flowReceiverParty: 'qn0anmudr7fmhgkef2jahms1lyseiy582gm6z9nhv8d2421vvor547fjy5bse2r8g5p4hq6osqvop2c1rfn2ivna9nmsbyivpa728a668w3wf82w3a7wg04nzo0zbfpv80i43flrf8vstd2sw0jolgfavu3nou6q',
                flowComponent: 'ge0iyfl5d2d1b5aplr99giv7b8ar7mbv4rqmeaomqz0ekx2hx48rr7mnzrbcc4djz4qjaatbktknt9822hob587pc8e5du6dp27k4hgfve3qh7knun1bpaz8f375mcc5rm7qj65kzm75v0gv7w63c076xsox9n5t',
                flowReceiverComponent: 'rkcyj0a2lc3pl1p43e9u5aotvea78qqpw0cdm9iwaoe0uwccr7b1jjih5fdtaghpa880juqypvsz6zv0wt2ippjwe8leixrp9gr21di20u3ohurxg1qdb1lxi4k6pm4zmd83uzgsyihogvibalm8hgblcb2ullba',
                flowInterfaceName: '9xhpnef3gklsqmbe1p0pf503a8ylhhag96yb8b46xep91r6bl0i7077gox9j9arnfk70a6w0pih50ja9nwbsmz9kgaownrko230fb614go4xjz9i93zwzdbu09vxsc2ed5apamv4ayc06q222iviz1dh6yoz44xo',
                flowInterfaceNamespace: '0qpuk8zmgxhtzp27usxgme75shmewkbkcbrddu2ldt3hcy5l4t4yocqwicb5a0t7v0kgeeylgrpjojj0hc8vsj5vj96nej9p1fkvgb346dlkkuba1py8jefg7m3wwfr0umgakag4v5bhdedlzey5475tnip7h1q8',
                status: 'WAITING',
                refMessageId: 'dyj8nzlh9wlp91hso27xa7w5ysfbx6nne9djgx0w4kigs08ifx0yv4zue25pj30ztzxa7489o9k7x0qi7zldcthsarw1hmkz9pyvzvaahiwlu2gxuo80zji6z4jzlfiarbmmv9le3qlaelv8pcsnqrzfwwmux9n3',
                detail: 'Quaerat voluptas natus et iste nam adipisci. Consequatur consequuntur aliquid eius rerum enim aperiam quis ipsa ducimus. Esse deleniti dicta quasi facilis explicabo. Voluptatum modi explicabo itaque tempore enim animi. Consequatur facilis et ullam odit corrupti aliquid earum necessitatibus. Et ipsa debitis qui facilis sed modi.',
                example: '9tuhb30k8zjpyi1i6t12q7jxou98yf1cylpfss2uyxtvusvuma4r53jngtpbay2o14rvumor2ap8juah6b1k6nf264oovps9dkf4w9j5tqy6ehb4sd3jbpwults79euxutrg673aem0g5gykyhnsfgw2t7wf758g',
                startTimeAt: '2020-11-04 17:28:17',
                direction: 'OUTBOUND',
                errorCategory: 'cdbjrzyhy679uwg8hdu3s85w3m1dtwld19cvf5w0tt157nzwl7kfz3982imb7zbbmgg5kitvogoet4uszksn2avfb3ndnlwvj10wb8mf5xro1ztnyicz9bnao2wct090tey5o6kud6xq7j2a21pv9ltaihvzd3fh',
                errorCode: 'kpdzon5zmyyjmz5kjkt0ilebjyby356frnmcmigzo8z5f6zoxy',
                errorLabel: 848580,
                node: 1025073162,
                protocol: 'mq16xa8k4pqgvps17bhs',
                qualityOfService: 'id2dhnw156hmhj1p65d5',
                receiverParty: 'go9x5l4wj7afa6it2wrcjaleyti4sjocj63jlodax9w3kypbrsre2rhyyqrag3yldg838r9sjy97ziidc7fp2ue1cuj3bccz398fqrqhdkix3lvlzqlbn027fjd4ttsa2z9mmy3imuafmzlclxrcivipn70ohkw4',
                receiverComponent: '60w5d2ej3voyt329xj716omxv0pitx6ccdedagitxuvoh2suhcicyqpxuk4m8wy2j5pxn48otun6rtydvvs79xpy2f0prrsb5gp9x96jd04856u0r50fzcghdu1af90srlhyufx1iing0n5qyixtfb4ixaw4mkhc',
                receiverInterface: 'gu4saykafkuamp27owqhtj82fl8puuoi9m5962m2ewdp26qrhul8ccnxww3uuzvv9kjtaharsd5cnqsv7olooqob0wof5gvwxfsr5md98jadpbsjzt2hg5cr2bus9bqizb7e9q5wnzm52pan38417ln7soqm7tl0',
                receiverInterfaceNamespace: 'p8k5xgkh49vpfjl3al989m29y0mkx88a8zbnggb7fqj3d2q70x2f6cnaedw2psniqs2catzm0ccjso9n1wh0xr6q7gkorss8kabzev1k197fb7j47pivwmqo3frccvty5mmbxraaybq4ond02vh48ma2x05tziig',
                retries: 3145698452,
                size: 9331955952,
                timesFailed: 4706697760,
                numberMax: 3073516971,
                numberDays: 6779721743,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '4rv263cqbvluv3vwckdc2k4qv606howsva0o9qoyrte2qaspk5',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '6wzfardhvnn6thwk3bqp',
                scenario: 'yj9p05j41ksyjl73fdemo5fzrbzqm25etg9a6fuz587lvg2ywdijykjobedv',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:03:34',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 00:54:33',
                flowHash: 'k88vwyzidtvckxqm56hp39v0io6npftodcyfrd5a',
                flowParty: 'oc2v9fxacs89mhk66e5cuu4y8tbd17aua6f4g1t5ame6teqgv699cf7hredk3ks0y4g68mstwtgvg70ls82z1utw52vg3uz18vcgzg0e3o6jm2gzomttiohvftpklyo00897555kpwav4xfj1q36piduof4w1mah',
                flowReceiverParty: 'eqwi8srhgkj3pefq2aex2dyzdiuss07872s0dj4e18ey7ykxgpoutjkey0qdbm82natcqqo2k3ro47vad8ezea5emaqba0lx923cokguu0vsw93t0a88sudmwtirqqa2mvg7ukykq6l2ky8k1o1hrsnngj6b5q43',
                flowComponent: 'hezw18g3pzm1mlvemc3o005wtlkwqpic7j74su54izq4pqrkb0nnrj1f1vlrvp20eqsqvbw8xqeaawm73issm6fxo7bts8djt5lg1wio6dacjb7edtvawdc1acuyqgl7ac7roh3lek6293agulwbv7hil8b9p1fm',
                flowReceiverComponent: 'lvc1dbtbjh0h32wmfsjic0fqm7x86bw7f3xazg4ixioknnh6m03iqubpdwok7tvrghqte2q9v47ic2xd97h4ppvh5tppdbjqexjxu8jalt73ano5nxwueh725xgwh5exa8n8jt2x6w3cm4qq9vnfb7cplcrbrwbe',
                flowInterfaceName: 'gqarlbcmo8tt5nbglldeu8wyyapvs9qq09jyapl041q4jc10p4soxlovyoqkq2pkvnfpgx10kkkxt3g3lr9gu9kzy8t10934ipk0ira78npzz95labxyar3c3pnpagmbr0e9zuf185zkk4iujx8yr3jmo1d4c4dn',
                flowInterfaceNamespace: 'dpmzyyq70xroqop3ujl508slsaw756guzzxu22vz8bwzdeb2qtt9tkva7kw8qzgd53uazmpzqq4uqhz1dyl0ag9p3kc53nx7zogdodepinjfurju7uii9oyatxnxesfsmq71gjzgdwlrujj395uu027moa2poflr',
                status: 'HOLDING',
                refMessageId: '67mrd97qzyc146h6o826ovg4gg4mm02ifwdlzny2s2lsuwe6bp4kf6225erbq9c5wbq0gr48smkkv0xoeio8uhdix85lvou0t4v7lpcg8uz798wta303vb4mcthxqcvn2ew6w6hyc07ophp5upkgm28v1fvn7pvr',
                detail: 'Beatae quasi aut non voluptas quia nihil rerum consequuntur. Ipsam ab esse possimus quia sint ipsam. Illo distinctio dolor. Non sint molestiae cupiditate nihil aliquid cum. Ea vel excepturi molestiae accusamus ipsum vel sunt.',
                example: 's1s2yb5ctjdvbb5ss4j4hh6ssqs1a5k5q50sqvol7uvp3qv23lljhlnfjkv7k0ktlrywb5njbmwdh3yelflbz4cc9k7st0x3l0x17dqgedgxtew3lpbpt0lcfrnm7r1kamkjkemz6e0syxhnnustsv3bzrfiy0q6',
                startTimeAt: '2020-11-03 21:27:00',
                direction: 'OUTBOUND',
                errorCategory: 'wahc6mejbgimu5bq09x1xyzmtcy84ygyr16yuyjjodqi9xrv8no7bw50doxxvqiwyuoma8j9ra475faotbw2s5f5obn3utk20q5rpz07oh3qhscugzuydzma1kl811w67aq1ouzqsytzjir075rmdhstpry2ap50',
                errorCode: 'suhtxml8kiqpkj1ctz1te007hsi1qnhqqubshn1q4h565cyxbc',
                errorLabel: 674256,
                node: 6131403170,
                protocol: 'kp0fyznaquqqn96f6e5i',
                qualityOfService: 'jtdkrsdxctqrcwye8u7z',
                receiverParty: 'waqocbwoo47ebfl38hrfc3fuv3bd5k8nrg0t5smpdqoc2e98o4mjz1rw7qvbt3baypdjrarveeq4v93uj1v03ke7amfgvyzgmk2ajebbhf2t9jv60yqs769krod439mbbmjzid7u1uaip9nbc3yzljsz8m9vuwfn',
                receiverComponent: 'dbh9afcjg4zf2ffmj2h6mvat28oak74kg8klfzddkpcgfdhw5dsqd7r1brkta8gvhjq62jqkjlpbahh0w8ubxpjv5jtj8htd45l37rg8do0vhnppbqlkncibpk34s6lxw0qxj1zmflq5u62iofxw0kbfkfd10b08',
                receiverInterface: 'isnirz9vs8bd6z8wbyeh4pbracaiktezw0zalulvdu8dptu62xn6rc85v6fmc8cw6nohbq6h981706p4g4tp4zwuw5tb1p7qa2vz0syr7dqp826ck039lvsbknbkboi3edczjnylo5n5u2j4nz5vc1cmxizds4ez',
                receiverInterfaceNamespace: 'kul5q5ecd9k7o1v75rahjtn84gbawfhdggwsosnjpjntdttsy2t2m3f50f4c7e8upvzhu0zdqja08n89rnvpj9nw1yrsqk10vwtin4u0w21fmhjsmim280id7zpnngadj636xbp16bjvzm1fvw1ksyyumpdvz5ry',
                retries: 1631340651,
                size: 6281748149,
                timesFailed: 5976976199,
                numberMax: 1652537503,
                numberDays: 9416713351,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'macsi7pxd3qs9w52jt7m1yne3zpbz86f61t14eoxtxppo2j8lr',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'gvpeno23040xww22x6jq',
                scenario: '05dt73z2j4v32pkqier5j400wp98c3w5hndxcnjr55ktz6p8kf4i04hzelam',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:06:07',
                executionMonitoringStartAt: '2020-11-04 16:18:27',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'xbxs370kkurmjimcuq0bni64aloohu7bxwuom15p',
                flowParty: 'zx42utkrz0y5jgg21pmmgahppnhhg28306mp974n72zbenxegal7e46olzpn75hvmpkmyuasc09kl07ub146es4xw7cdlkcx2dcioqq0muqlgxhkmlbqqkoa2d44yjlxk0omvzg8rau4ten8vm97w724h2vcxbnx',
                flowReceiverParty: 'e7cbgjds1y6wn1yyeefp73db98fapg3a3pbup9xme79iuiiq2kz4u9zr2cd88dvh2c34tnd65r4ebflwip9tuw4vha4pt7u0jhbmaoi6kb1nngase7qzelhpa3xkckecyey820yfsocxex5g3qu6hmi6nt7v97vg',
                flowComponent: '0hoooi4wo3x961s9ft0wfv6acytsvp69gl6aljz3fy6iyi98opjnu3j20kppq4on5m5idye9hqp60d45nsuqzva366bmswq8eljhy8zcttipwhu7doy77qvpt87cbauadaq9t6zhgsec0w0iso8g4thkk027pp4g',
                flowReceiverComponent: 'gmwqasl78a52bluugsm2tleyhc13qj0w4sy5lch8oivv5sf48dso3yu19ty7juliushyp1wg4zwlc7wghubxdf112h1fryzdctt874lt1jysry0yavxmr93y8rf09y69sh90w5jszfm4yy6vhej5bgd6qfncu0tf',
                flowInterfaceName: 'np0905k1vsim2sqmekq3vlnqpm2xx1tobc9prjaaql2iif5j8abrrqpaeklhczipep9r9j21lah8av9c1145as2tvfx79kgg7c9s79iocxjwwt61whwkcpht3w8yk8o3k3gl8z17a96b774689u1hauei5hahmqk',
                flowInterfaceNamespace: 'abzrvea3077txwvvr3osxdqxyvsi1tgvbrks0ustgbax8oo9umzu13kbsmi9gref9eef2c5o0sx0omipe57ytnstaxpxug75hxkfzxxzgltnyxmha9jks61vdaw2owis4c91cym2ys39iyc2nyfz95k67imcks65',
                status: 'HOLDING',
                refMessageId: 'ryt394o4862rreq18s2wdc8v8fy2hkmzfbtvbcfszcpsb26djy8rq3niw0hnoyl9f6rtyfjsh5ca9cv3e50qe9fjb91tkwyx5l9i28zxptofxolgixru1o5yzhz6ux1awak1obotmhgg09r4n0ipw9ydsj7235ei',
                detail: 'Omnis dolor nihil reiciendis eum consequatur vitae. Eos id vel debitis consequatur omnis est maiores. Omnis accusamus totam.',
                example: 'mlz27dcayi04p4pcu0jwnjcvvs3t653m0m16iafc442qhzgvstudy0bqqazsuclpbjnxfw2o36pjo6nvdm16a8feigf7x9o57ri2d1ggxgpdfki1hjbb0rqb9ed3t47159joke5q1ybofo38kjnpmvfpcib35kvj',
                startTimeAt: '2020-11-04 04:27:47',
                direction: 'INBOUND',
                errorCategory: 'eedwteuxpk3p5st6kx7afrco0i5g8pknl1dotuv5hcd3u096tyxixfexk2qfl2lof6t8ggl03zb7wjrm2vseg8cifwxpsizgdx2z2lxc4nutnhjx5ez5c91cd6e852x2xrj9enh861t3bftu17d1fsx3mebzfct5',
                errorCode: 'ttmzq2v1p2dypc77oqo4t3j3gjxrydzye02uruletejtn0q2qz',
                errorLabel: 580358,
                node: 9072776765,
                protocol: '4ou8cf5qmqyzx5zis029',
                qualityOfService: 'y238ak8ebl7u9h12xejp',
                receiverParty: 'zahxj0b8df45wdqnq0harqkj6jmqdkbol9pozj52p4jaz9439d2th58d7rgb45tfyb8c1kaetvzivxtmimi3ysva96ycb3e20y39044n62ub52rbxw2lrja78yn4jbno2miz4vjt421g0c04zfi7vrwofejvh1x1',
                receiverComponent: 'qwspa0o2iy63gpy4dyeql02swihe13b5sanej6euns4m7ee9ky2df1573es4ztid1zjbcyxz9c0hevme4c7z2j9prbuggw5fd2276stit4so1erpg60pg9lu3mzkjs4vwcf0bmxrl0e42e73y2dx390gjkdr67pi',
                receiverInterface: '25us0gzsth16mnzkppm7jjgmlxxeaoha4n8caib2tqp3lig2on59umx8omcvwr0vt0ogs5m0ivwvf7px0gbdacsrk9lfatcnzme2790g9jcj008ig4oh2rug172qvfjdbxc6jegzikorseymkpspvadq7ft5nquc',
                receiverInterfaceNamespace: 'weh6f99x9zmrfc52jtigcfz05qbn23kd40u6q05vcgu41z8vgi2j7gyrawh9z4n2z9kbo230008jwj4dm9eqdm13m6qhzn0e99p6lvx5fzqh2wwsnt4r3h2sqw0tr8c80ithr8k6v1igwjgr2iq72987trekhd6y',
                retries: 6787344227,
                size: 8626805115,
                timesFailed: 1817118260,
                numberMax: 4833663788,
                numberDays: 8185132313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: '9lg908ptzbsk9bsssficqwbuxiinoi9n4c82skqdfddb7giznh',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: '0lra9a71jzskm8dkome8',
                scenario: 'hszbh3zbaruhnkn7vu5rfqlwqn9qprzra19cw99r25szg1cdvk4rmw53kbql',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:31:17',
                executionMonitoringStartAt: '2020-11-04 14:32:17',
                executionMonitoringEndAt: '2020-11-04 09:03:38',
                flowHash: 'bnccu5fwqbx6u3r6cvk8u2faipvwoi2xf6zn00id',
                flowParty: 'gz9h434qtazumx7t2l6ne61lze5ry1qunfcred4v81cr7wzxzz1gtq50pet7kgufiu7xjzzldn31g0hriw792ci95dpizun5bxfync6690s8ns8zes39dqk0uitt4m59jeh9tzbflmzjn90hevpsms3gkbonwko5',
                flowReceiverParty: 'e65kq3tmcyegp7cx1c36twz0ky7ty99d0ct8q24w5ywrm61881asrkm12is09tmx9m7aeho1jwkmwhc7pmw5ogg7hkhwjf2fb442mcswn22p7k3cctgjtz3w3yudmg2k8f0q97287k5jz5r1rn12eh78t3oj2b62',
                flowComponent: 'ybd7q7txx7mdha5b6htqi49hlqmy9a3nhtgnb0u7r1j88vsogiz6yzreqx9l8e3p9594fcw1rkrbdj3qp7jx42rmcr52ezivkdkz22v157qlzfyz8c5s3g3ee272j36e2irijr137injrrhxtcsv0r7my35j9tcz',
                flowReceiverComponent: 'duzgir8u24ydtwmnv0xufplwxiz6el7alwscn36gi59w258161ey5lq9hns6kposihxjmhebrvi4htjcyratrqo816zuouou1apoycr2tunwldaiiv5qaj79x5igpz4uyz0axb03jvti5lvhr1r5qsa4o7lrn684',
                flowInterfaceName: '5hapt43cedznk9np63tntosmp0r0q1re1gb7z0sagz6bcnsbefdj8414pce3wixbctamfzknteo4300stscapt6kmygl4kpd7zhbd21s1poatlhi4js7q1tql96gmsgvb5mpu1rvl6qc352lliz7ojuwkzhm6ghb',
                flowInterfaceNamespace: 'tl8o86gn64x0k8dxqa27niexaog0nklkfmuizze8gkasbgw92y5uy2fzzedr6ujb0ztlqwx3ju1whd1ma2ioeag268p7w234ys1kewjqescua0w60n1k65pxw3t3co27mj20zpnjvjeqmdoetw70h5c4bzi6rf7r',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'wx1lge91dtfuyljrdabggyqhmariasqdvujll7e7z0t593qgl5vxubyxipp4y07ruuccescoy0zdlb3nkvr1t3k2jkseypc4zhf4sigjicj5ny9wrcfb0fxt84kfa7963bc93rgah36gw8tdx70iig0pf6v581kh',
                detail: 'Minus aperiam rerum eligendi delectus. Commodi sint assumenda consequuntur sit magni. Voluptas est reprehenderit sint et eum.',
                example: 'yih06yryntk80hzi1njl8bsbk0120ohdbmmvwdmi4m6bm6uchzd5u6n7r8cqsa7osnad2iwnj63mes7i4zze6egscs3bqsp4s2g1qo2e6ttmcd2i2sdo073252wl3jccz1u3havg7ixr4lg3ro62hocdbi99m8oi',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: '7f8zdmdnge2brs46nt6ad61o1750onut1ju80ss3ih7z645s663lxex2jd49npkdlflmoodzxi8ro9fgc9ktf2rbuyjulr406b4yi56sfp60ud24rqv97jk9y1jzsl93rpyp9xfpulhe6zgu32hxz5iq7yfbr5lo',
                errorCode: 'yo6wmddd9wzfrzmdcdx501rb45vzv6wcdybwmi2wmhu08381ny',
                errorLabel: 772671,
                node: 7554204048,
                protocol: 'x86lz8gpsq7govdukp5f',
                qualityOfService: '6r34bbthhaklvd32g77w',
                receiverParty: 'hu6sxgai7i6irofil9wgcpqw1oyxkjyh2az659x2xrllgdqzod0db2rtwnpn7sqzshwolqtwc97e1tom3xmd4fu75jd5xx56r4e5988tycf5qxsgh6rywvtx9czpymrlrawaerbg468ydtx26aqad1fzcb6kv1br',
                receiverComponent: '6rtzevfndtt3vn5qs6i0i8yb3gvb58196j6tqhbt4wqbtgkhcxvlqrqb1teo0655kxyjhqd0q01twgauysdid3tzf9rest7xyo6eq8u0ckwqfkdn6zqpygh9txhral2xqe3c63etpzteapof1ztt0cqo7wh4wvib',
                receiverInterface: 'oukvdbfvlvxqljzj1gciq7d5ydq528mqxh8egjnj9lxbnm4r10sd4docnz5nber39amh23o8vkj17krl2n31e98b1z462n5sylu9ck321wvrq9y6ckrmqd8dfi8tvnqndqp57ejl01xbm3bwthbyu47ku0agmymb',
                receiverInterfaceNamespace: '8xxudhgm0b9jyv5wzv41dgvg6ums6930zr38lpygr273ckel90nm81fi7zajejzd443nbnepzeyuayelpx576v825ekp79b4aov47bvun9nrjnlbdj5jig50ffbkqu8baey3iufz2vgrgj2lthvv3c0tszg52p80',
                retries: 8831327048,
                size: 7337119858,
                timesFailed: 4696641937,
                numberMax: 7947007283,
                numberDays: 6283197769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'ejwts8jv23iz3nexzrd1qpeiu0gedo48gxuxabi4562wld83t7',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'un901cqvltfhyl5cjm44',
                scenario: 'hyy8n0y3l7o3mriftoxm06hd9wkpbkbrvm2mwxgdioff67moemhd1nh40fs6',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:31:06',
                executionMonitoringStartAt: '2020-11-04 11:30:27',
                executionMonitoringEndAt: '2020-11-03 22:14:09',
                flowHash: 'gric1vzd3vgq5hbq5rcstv9z41r13hi968r25x72',
                flowParty: 'mkltntn04sfxxcgoovessln2y340z3uajmmegn8l3opxg7ykxovvsywuaxbw09nop1bawphp94j22vhrxjba1web2xh5j2d1w8a0sx906lfs9wwu6u4zimuz0okuwi3c3kta7hhzltql3bj19c07euoq4t26gcao',
                flowReceiverParty: 'yh0ruxdzr2ukffxgf8b7it10oig40t4pqb1raqqpxk7b7qjppt5k2i4abw5ss91vc9j9y7puefeibqmp4i5svvvgss75l1hu4g222vlzg87kiqgbwwey8lkey71d1okvuiyn6swnepn0m7p9a1hgunjbvbmxfvur',
                flowComponent: '9uoh58qtli2djpn6yoep70zt36wctkq51dt08x3gi9jlv29af4jc4is0zw3cjdkiliy3mlur7oooejvlm6tqnwzqqwqctp9z8sda6qf7p1oc0z0raq2mtp4xnkkhhli6pltpx1je93adrdzh0hwa7ecpgxzbi358',
                flowReceiverComponent: 'bxgymcr9wixio7p6moe211ccrsd48fp9gk8gdwjlrl9kjmb0uqpb8yu5x8xt7356mus3sclft2620l9km8p1dx6g69sfmwgxq948yxz2qn2f7hmqnpr8lycx31dkpzyory5iyueknfh9yetaf9n3kwt3urstazdz',
                flowInterfaceName: 'abhfmmwtx7kotiepayou7bqbbrn7cjcdy3bypfftk3zawck7p18vr7wee3v2xkjvpkr8m0lo2jk3gos4bylpk0pe1j2f6zk9i8fkio5dyo6xsxh7rys77a0eeo9dns5bl997kdn6gwpuq62fxgmzwapqgkv8tsj1',
                flowInterfaceNamespace: 'zjt62qmrsro1h6f2re7s1gxxjps64af8nd2cuezpjjkpc09gi5gr1g544z03pu8nhfv61poirgan74lp2i8xi66neinoi1lzy8t873dztwwe9bbbfh726j7tonu18edx6rvvlyv4l1kzstltd1657uyc0a3lkpli',
                status: 'CANCELLED',
                refMessageId: '50yziofy476jtuz9qj3jwok37qa6f30iz8m3z8kf1vmefaxsxp09umxexvzmbbtv1jnyteyd3v4wh3m9kk461ckkt3mhwiqvjrmelksh0nqu0dug6fh9dvsssdn10zgqdzjaym68p3h1ejl6hgn6ak09k2uz8lrl',
                detail: 'Nihil autem aut quisquam voluptatem sed doloremque cum voluptatibus quisquam. Odit deserunt consequatur natus aliquam esse sit vitae. Ut ut eaque omnis.',
                example: 'yozw57hwcdtfwcc1anrhymua7ht3n52bz4otqyjvev55gh7oaajnw5djd800kl7u45dne6if480ych61z0yv4w5h3046hppp92oqlt5kjlkbyuuao576flq0ert0w76v7i045o02won0xwumb91be63qhmmc25pa',
                startTimeAt: '2020-11-03 21:59:29',
                direction: 'INBOUND',
                errorCategory: 'fjbc0efs3qti4j3xagee28ceudh4614rnmmm0xosz43lqlx4pew05sgi41jiqkjwlfczys2on2biobifzrbfjgnwp2n545hs83qxfps6t3jldrcjeirmsag759hnv5uab1xe4u5q8ssrjgkhd8v5qhg2mwohma6d',
                errorCode: '38wv4hy1waqopmweksasqp0j9qzim4y8kcnxs3jlj4kp1hjkot',
                errorLabel: 808394,
                node: 1330174271,
                protocol: '6pisw5xynukobrsj3u0w',
                qualityOfService: 'x3j6ueqopvydao1vt9lz',
                receiverParty: 'i0ttq176qsr6j16mm7zyxfu1515e8f2wrwcirc6o60edfoz9049ivkx882bci7f94v0qvxxwmi19y4sc9bzyy9niro3xf4u99jzbykqeyixounq8433t7ampac1c593ggxhc4btdk7vk8zv0jzxkdyisuns8wpzl',
                receiverComponent: 's83svbsrubm3lraylu8wq92mquk4k9198wytkbm5cejfoa8275mggzlolzrn061simqo78nk2587qlfc0wsr08ldr3ppg9wimwir50py3kpa6koh84iw1onrvh3zeszvftcee7cqwx17otv6j62cx3znp5nf3z1a',
                receiverInterface: '3coqciga3vh6uz6cd01qscjzfbfeg3ll7dkat8w2umjjja0265dzcsdhqff6vnl4tfmgkuufiy0aj1k2hoep7gcddcc8zx65wa0k1055ir0u7ojbaq9coo9mgpia0dqo2o7ou8v9eg4lptomy5lgvm5nmqjxgml8',
                receiverInterfaceNamespace: 'a91g17807cjw68mgt3a9ei2fe4r16l6nqn1jchafkuxhckvb26d1ybx52lssqyktv65lazmg9ianpmgiqk9zg8fkjakuthzl0zcoqy5xdd5kn4fzkd6zs0lttko22xj11t9az0boquefib2i2u5ah2i1x8rpi10v',
                retries: 5564053572,
                size: 4530631342,
                timesFailed: 6482535533,
                numberMax: 2657552401,
                numberDays: 3275416564,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
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

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '099f87c1-dcb1-4a8e-b31f-6cb01b9c57ff'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '36ba7b85-2869-4e12-9f45-369c708c713d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '36ba7b85-2869-4e12-9f45-369c708c713d'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/ed5f167c-dd1b-44e1-a905-a4b05edb9293')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/36ba7b85-2869-4e12-9f45-369c708c713d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '36ba7b85-2869-4e12-9f45-369c708c713d'));
    });

    test(`/REST:GET cci/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '2794d9af-4d4b-431f-ab32-a39a3f78018d',
                tenantId: '9b7d3cbe-675c-4472-b66d-f3f99eff9b8c',
                tenantCode: 'ax7uu1yjwtqmzue50wqju4klxdyd6c2yi3ilegu1za7ydhvbto',
                systemId: '3c754de5-6746-4254-ac2b-f9dffafd3ddd',
                systemName: 'nxik74qr99gllkfiopfd',
                scenario: 'n5jbb4huntv3kq5o07ck16g1lr9v6ed30qdjyw7yrnxtyrgdbrv3qk5fzavm',
                executionId: '3d3ac6ce-1585-42d0-84fa-9ce1cc686306',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:51:47',
                executionMonitoringStartAt: '2020-11-04 15:49:58',
                executionMonitoringEndAt: '2020-11-04 08:17:44',
                flowHash: '2cxx6y7cpj4m0m25bixzz4ag38r2e3ysq42ox1yw',
                flowParty: 'yzu20r9mq80h60143lb30br8aa12sxfcxwjvrb3yxv0p165j27gqyb2xl74f29a7k2bywud9zwuvuajb7olsclft8niqgxj918zi4zujqiyskzyxdhjdfpkchom2ftihkuydbqq9j0mnfv48us3mqzbktws207vf',
                flowReceiverParty: 'yizdqeih5uv8splrd0w9jtokvstae9lnx9mtce377t62mi2hkylnu94o70ck4rtqszqotou16298eu6hplg7c77aju3j1lp3oxyuv1tht4ke8rj0yh2kvhoi3lv8tbd1ey2rmowcd8in4hbdli45twqmak8l11jv',
                flowComponent: 'ac8xeejwon5ng21ozzvwjeqe0w864gxcaia6rrcgv6k621rbk4l143k4i8xpxz5513bx8bwcid0dqqpt4x4lb5o6a4t3wwmcq07eiva17uqs4a7bdijdotxsb6vf9t0g4jzpztwm2pm1qtv7lwbtjn57uzqv9f8x',
                flowReceiverComponent: 'crv8nprk3f4xwe2i10z9qpo8onauz80xzygumsqatwik7qkfu27snzuog4pi8eo02cbv980bmn98yjktxonz7119r3sor5kdoiu1x14pfzdwvn24fbid92lb2ur4dy0y5kdrk59pvxkh48dkesphe3dm6xaw9fjf',
                flowInterfaceName: 'plxizrjbz5rk1ge8q3zdbbmkq8fhh4esgt3suzvhq7mqcw3cqn9105v9afqhgvpqx18cyvac6jhwk1czgap4stnrd6rn7wcl72xbypa25fpb0gkcovu21va8rargdn41gfydjla856e6uzuge1940qbt2d8re8ws',
                flowInterfaceNamespace: 'bgapr7wjxugmdxmwt5ckxijh938639pwte0hfw0h2dl77rjeywav8dii13z35z4s53ml7nyg7q1elasax14femyqsetc93j40alcsyh1ja8zvzzkp4jgcniz5m6pz2kyxppabnio6f0ozh5pcglehf8rbtgbua3q',
                status: 'HOLDING',
                refMessageId: '7e6fbj3c3cx3mfhhcdv3sy1wwmnjia8idm4vbt09aj35oggc2s05kldtb95gziitq31zw2rnfbwfygohaaumbn25mflqi3v1o0651cndpvjk2p7s0jbbhsyj2rbgk3ip5zkyzu3ga8sifktgpmbo1ztcd2nnbr3m',
                detail: 'Et dolorum sit minus. Aut est minus in autem aliquam fugit veniam hic. Veniam maxime quo error. Culpa non aut in optio fuga autem eius eaque assumenda. Et dolor tempora sunt omnis vel et est. Officiis et amet maxime dolorem suscipit et ullam accusantium.',
                example: 'o8o4owbkiacturquot5eohmdw9kexen6h55rh8xn2xp3nm8kzpasgbb8lst57x1m8hlkycui170twofkvmu0jxlbyqzszm4afzjy3v3dmsc0z8zbjrkun6sqv7ggqqu0ojzze967fp3bq8xskmiv9r3dk0qk651m',
                startTimeAt: '2020-11-04 06:03:48',
                direction: 'OUTBOUND',
                errorCategory: 'a4f8y015ldkv4z7ewens24ipuw7981zcu7as5ndempf7md5yqqxvqz5msv8nh0s7g94iu8hfvyswvijx4g6owldvc6nh4y2dznia40usgeyhj4fgpsj7ah1oyddq9uxt7s8i3goncbijg76gmaxoq6xeaw35skyp',
                errorCode: '9t7zrnewmi9yp7t5i21jyzor8haxfhmkalki99lpt5fj95gsmm',
                errorLabel: 970382,
                node: 7269490453,
                protocol: 'd147mlkibw5wx3ua5uz3',
                qualityOfService: 'p5iuypgo2ta3wgy8qs57',
                receiverParty: 'xxw5sx33o8h04u4rydo3f0ifxxv0dfue1m7lf127d1h53zpcj14k1xnc3jy281utua8ipamb2i8i2yd2ivwijv1g4lq33jglkjeiyzbavq6xlap5tg9jnrai7z36grf6gxanrs5jsjxmm2295a96y7hdq8i6tq3x',
                receiverComponent: 'm7b8p52l33rjay5xnco196ro3063v0efbkr5e9fidykn13vu28ssrn912m9uqbqufv385fpc2y12y7b76kn5hhmbutkevu2xjf1ihbd5t9pjugukjfxqpv8l3psx0uiyqnkp293lzgixd9j2woh0emb1ueotp0mm',
                receiverInterface: '06snrur0d78yp78ib3wsb7a9uhls2hqpp68anq9qjd63fvq7nakw4z45nbuwexmy68up6humfh34og9y0c2aaovkyd9o5m3rlvlkujkye85zmdo73l4tmcof4bx8fp490r6grr22p4uzzdtxzt6hdiyumorg9ncu',
                receiverInterfaceNamespace: '4nzll1mji8m6yp6mrjg4dvxig0pwo6decte2y7vgkixffrsie0dzxqdgbapfuf73yueovotgnb87rm4nastezd7w23uabbjplaj64mhgra4d0uflicgryceyznstax8pixxuqt3v9xkxsdy97bx1v372g9bqyrn2',
                retries: 9820086803,
                size: 7369729270,
                timesFailed: 1346593196,
                numberMax: 9868901404,
                numberDays: 8939569439,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                tenantCode: 'bhxudr368y4zhy9c3knvzda241qwarypnzfpike47vr6klk1sx',
                systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                systemName: 'qs9x3mpwpl3hhkeglsky',
                scenario: '4ivs04nws4b47u7rg3n7qj0e5ocinkk3dg9f53djb253304uc2en5somuw1e',
                executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:54:42',
                executionMonitoringStartAt: '2020-11-04 06:40:46',
                executionMonitoringEndAt: '2020-11-04 07:25:33',
                flowHash: 'bmxevqw4bib6twi9qgxfddpq3vyr732fdpyjdr8d',
                flowParty: 'xm7l4juwfcd2hsdj4yz8384lx4u72y8j3v0o42sv344f2qwrpzzwc95scia2jbtorqvu3x7ynn9pyvaw6sd19n0j446q9zu9qfyqybbp0bz0bbr6fe9pdu7z0bmgwsiw5rzo2ms99tg8ueay4gmesebkelitn4kn',
                flowReceiverParty: '38xz21d0907l154qseklh083vjkpupgqcavc0w1oaexiutwnj2tqpv43cc7x5ym77o51eob4tlqciiwya7vyyd65czc8rdgf75m7lepibazdgtle8asweris2xoq7b133adxn76ww84tt0j2qulokjfokufieq94',
                flowComponent: 'uewn7lbwkh4b4xek9dhqycgxulqbgvmyjcpmzsnbxur47ap92ns436tcw5yj7tj6epzntg5avlzcg3rcenhj37y8bir2nshf4p2mlxvy3d05bnfwu6yq8c6g6tduamdjgwpn7otp2o817beb8wbwjyt87mogtjt1',
                flowReceiverComponent: 'w6mhiztg9y8ehucjhs231vdspc00kvgis9w93p4lpr80n2hl3ie6jelor8nz3idegiwafx5v0eweqhmigww71tdx48n9okfgxsoi5i6m9zlaakknbjx6gf6udsnelcpsv6v325z0yl9iec17f4mrj3io304smqha',
                flowInterfaceName: 'z0twc6oxgkyrdon646tshiwn9sd8wdzteansvm0uvy00fayn1qfrt7a204z1kopfxopoc5o6mo9aj0ittgb24959epddv2imu6nwtjrvds7obgni411lf9b3l20ax18g7tf2r3gend1q8o5eyydo3t7dtvx4gyyq',
                flowInterfaceNamespace: 'ak3hfg90woshwjjm3gahoxc3kyyo0r9eeagt0x6o5uyjz2mav7v0szmyxn9ystk383rj9o7gxdzgagn0pa3xl2dzj4cebntb6uvrhy59mjua6oqencq6l4s9679uu3iogbg0vytiv5b0l4eh5aikcgnvg1px92bx',
                status: 'CANCELLED',
                refMessageId: 'rzjmsohl0c2x43b1agdp317j86qwo7z7cckelmzjrqbvmkftu9v0lych5ld1x3irl45t4pm3y6q41km4ywlmuietjrnwrsrb870u0vrctrht5ty2b6l022za62ff4p43oir5x5ubvo5sjbiwhzhovhpyrw75xql2',
                detail: 'Aut non eum. Veritatis dolor omnis eum non qui adipisci repellendus architecto earum. Quaerat nihil dignissimos qui sint consequatur. Architecto porro facilis consectetur odio laborum.',
                example: 'ywtqfx1f68upguw8wv6g1mwv6vbmnye6q7mfm4wt4lwlpbbnq9ojl52owjecop4nnhq9zk0v63q4vdwez0qfxpi8h7jqp0dypkqbjcp1yobr23z60xeugnihdyz8rrssq7sbmb2du3rdovln677wb0tzecqhztxr',
                startTimeAt: '2020-11-04 18:11:24',
                direction: 'INBOUND',
                errorCategory: 'fzspgmi6ngfo2tqwy3ygayzkxnc9ip9o81bwafhy3fu89ae341pk26ri018sqly2ybk9wjlsg1g34sm6pjm3d40ieqc4mezeausss0gydr17q40gy5teph7q2kc80xc5g97bhl32m0is7ku6rlir69qlwe3e12r4',
                errorCode: 'lmkwfnf6sukdpmc2vet1g9olx9uqpq7w7u9a9mfz4934iqmmgy',
                errorLabel: 644439,
                node: 6692243145,
                protocol: 'a8csr4ur41446i9iawhh',
                qualityOfService: 'ujnb8lcq1cr555rmcwlc',
                receiverParty: 'py7abi6xnw3seafmsm38k51nkeoxc0fl2lnh800g2gddu26nh6nhx1o8qf3d84en381g83wsac89f2xl1apif599ya7lx3ffdvuayq2sq47y8rlip6zrh73suxokt7hadjjuc6py6w4clzdtfodgamb9a31y84vk',
                receiverComponent: 'nvrm817plp2n0180r4v2fxjqiokis3cbs1gwv5ufxfitfvv09r2tev033x13kuw7kcotxekbef4elghr83z5e8gw1ek05wggac55t03nvt5xw2s7nees5bgr7qbrllqeumpsa8deg12t9tg3uya3coyj9dvrbqgs',
                receiverInterface: 'lkf88edhzpck8bjjgunop6769devyi06cf8y9uklsav8qto98ojislf928bsj2mnp4tmvbn5avnmb405qltpcuhfnpfqoczf6s6v471xd0knkex4eyunxx2r20ogly57hlfp7fcau9zeqwf45so18rm4llp6x5uh',
                receiverInterfaceNamespace: 'a2gusplxz6b41bpt529cbzqvejnyseok7ky589qehfglh3vhlqtighcx6928ujgqpla05pzdycam3v1suylh19g00bxsw4j2xllm4rtfewsnrjwtle3mj5yklv3lb0mvm9bvxnjrumdl4anjmbnuypkyxxkznmlw',
                retries: 3709887761,
                size: 9284274012,
                timesFailed: 8922578397,
                numberMax: 5673793792,
                numberDays: 7186189784,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '36ba7b85-2869-4e12-9f45-369c708c713d'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/a87f1860-667a-4e2c-8b47-2c9761034a02')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/36ba7b85-2869-4e12-9f45-369c708c713d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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

    test(`/GraphQL cciCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '05ff3a55-05b2-49dc-a555-c21ddb68a032',
                        tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                        tenantCode: 'ntl6qnghjwtnunyyslkgnfosjcxtqeisky7mjta6nhbmnjmlcj',
                        systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                        systemName: 'kw8xejfr0kky2xt8k03w',
                        scenario: 'ya6xcfl31ke2kk3084d5bps27e5p61v2xspzwoetpwtm51lnaykw1aqnbb5i',
                        executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 00:00:27',
                        executionMonitoringStartAt: '2020-11-04 18:39:25',
                        executionMonitoringEndAt: '2020-11-03 22:03:28',
                        flowHash: '1nsn6aayxcrbacynyhqa4jbn5jo8lw8yvhb1dlk3',
                        flowParty: 'scg0fit9mwetestaay4g0w7gi2uuoubyv2yz7mk28k1r92lzyxcw7ggjr4aeehdpzaa2d2jila2o4qsccp1d1hrhfoq7lnvdh0n7jnc4xeoey8tkhzup3twlizves07hz10jki5n1peg1we9hptqjs5cs7ml5edq',
                        flowReceiverParty: 'hgkfxt469rcca223mcyfudpvuksl22jtwxr8j7voav0fwvj8u5v3y2zcckru3mneo9qreapz14mc5h1xmqu09mjpvqpwpsv7niyj6z8y27o16mdnit61amvslnvhchs9bjg2lee5w7ylg10vm0ora3hxekbefaa5',
                        flowComponent: 's7x77fvpcezmjbe34c4m69ue6vccobwbkbr5vrjmytpglc90sfox3j7c52uiyn7ax2xml8ewxodsfnw2vli2651dccyokzmzu5vdzlm0ant3w5tu4xzrl1lxf00e0e88ns344wwxg3om7mvtabztzs4fwdoicn3e',
                        flowReceiverComponent: 'tfm8pdn8wmrfcr4nx2wi6bsewzi2vtkpgx3s757ry8q3m98uep35c1bnoxgd9hczh4lyk5p250v4sozckvxhkr7j3ki5rpognpnrn3cpsjo4k2tpe4lk08z7yjdtea6pdxogsc2kwpnx1qzoqmlhvrbwsevwreep',
                        flowInterfaceName: 'oeumnngmv8iclx9jopjlnwnms3wbl6z8yfnwlt2wbvzlw8khz85a9px6nx3wksy6e50h6cr21z6oc7chveojmv9sangxhmsqy6mjomxfg0aovqpc9ytwr5ypbnvhptfvz53hot0mou560wxu5ycfhgqulb5r64se',
                        flowInterfaceNamespace: '5n4mxfuwo8y5r64azl0u8se5w7c878xwh8b7co0ioi6b01ahzv6fpv5aeztmodfhuvg9sowrufshh05xiq00gufzhdmuwki31np9gitg2v6qbekeh3xmr0n59684yz8goexpbq8fqwf81f8rd00r3bdp6bo5ova6',
                        status: 'CANCELLED',
                        refMessageId: 'vv8uh66b83i854r565obv4za0im40rj3v8g36ua8gk7uvc9b93l9rqp5jb7kgro66wn17k804zawzxuopnrjt1et6eyqz3ir0czc75nnkduml4vw1bz1f7rpptzvgfuq2jwghrl2dkdhr5nm2ibt2oo1ckfeghsw',
                        detail: 'Quis consequatur illum nisi sit suscipit sint ullam aut. Consequatur est rerum aliquam. Voluptatum iusto quia accusamus rem praesentium tempora. Debitis labore id delectus et sed ut blanditiis nisi. Ea corporis et voluptas. Quia sequi fugit assumenda.',
                        example: 'cp5h8tw1ecrwjx0ko8h80f3de59in7kmw7y4et5p3jn6ia3s4dcdm2yd69e7ixjzcez89t6zdsszo6orpiihm9fxtm9ou9g8lk4jtw06qipryf3kz9rndyir1w7zm5w4ma7rh3y8z1v6ia9lfyv7prnxran2o162',
                        startTimeAt: '2020-11-04 15:06:01',
                        direction: 'OUTBOUND',
                        errorCategory: 'ioajkvoepkvkm96e3sjme5wzbdz9bss6q17wpccia4ypxu0vbpm33cckne2zwiv92mzyf52pc31xtotgv8oqe8wij2btpb1vpahjg9pjtdqihgqory07xqb82n8w083yslobwtehh1vnxg3trq0dre9izghw53bv',
                        errorCode: 'mtlgj71xbzgvlksnokvh5d0lp7xdqb4kkhzv8mqpyc7kv3hak1',
                        errorLabel: 507153,
                        node: 2041264610,
                        protocol: 'vdwl09lpo8nl0xb5s34e',
                        qualityOfService: 'bm41h6ksznvid260h084',
                        receiverParty: 'kjlnkh3gcvvd38g6bvu9mqn7u3a96fiajlcgfe816umhgku73okb2t7vs9gk1fowhw0pc25r26neddr98wjm9vio175fp94va6j7qeumx66f0ve293z04q53wb89uck6xl0hw7erh9aen6wdf5qhviv4weha1bwo',
                        receiverComponent: 'ycbgpq16jfdlymsakl1murxia6873a5a518yi1qlq177923l073o6fmm300e7d0niwx0ia2otngh3spu92raan9z67la4l155omu7pyi7ns29wxgxb7ier7ftp1xm9fyiei6b43byyqpn4czyd93hlz2nha2aw6h',
                        receiverInterface: 'jp75xqjhlhzk56dtdhrtcafy2evn1o8g1i5ytn5s2e4fktoe53ayk7bqm9aki9reghlnq558kcapythmia5abbzcqk2thdh51q8arsipswzxe4sfiqaglt8dh18q4a0om11r4btdgnjqocwhkfbucht5y5d444ap',
                        receiverInterfaceNamespace: 'dtlvokormwviwg7t5zq5apn60jmkgidhzwqr47f3f0cavcbieg2yw8r6r6pndrkks7m7itg61f0gjevl5er00ocans561y7v943arxtprxblk5fpne1e2flg4hwm4zgpq9n9zgps3mvl25qg7vtukojcrym872b4',
                        retries: 2221036279,
                        size: 7415116051,
                        timesFailed: 2075959070,
                        numberMax: 4255105208,
                        numberDays: 5618746495,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '05ff3a55-05b2-49dc-a555-c21ddb68a032');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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
                            id: '0dbd1898-cfff-4644-bb03-21a69f4bed6f'
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

    test(`/GraphQL cciFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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
                            id: '36ba7b85-2869-4e12-9f45-369c708c713d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('36ba7b85-2869-4e12-9f45-369c708c713d');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f8445113-de73-4693-8a3a-019dfca0641f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '36ba7b85-2869-4e12-9f45-369c708c713d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('36ba7b85-2869-4e12-9f45-369c708c713d');
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f4cab523-b001-4955-801f-c9fd74e6423c',
                        tenantId: 'fe9759ef-b4ea-4bd6-ba47-c3721028cb0a',
                        tenantCode: 'jt07fzaxdz36sh4ps698qu0ntw7h9ccgbjjgtann2165io3nfh',
                        systemId: 'c90e2b5a-b99e-41c5-916f-400a2ef13ef1',
                        systemName: 'u1c217w6dl7f41j1u32s',
                        scenario: 'ci8wwrslrhfhyog38goc9gfuspxgks5uo3w14xbso5wzp5iijgcrverq5lp4',
                        executionId: 'c7b36283-c004-466c-adc8-9584c189e8c4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 13:31:57',
                        executionMonitoringStartAt: '2020-11-04 10:29:52',
                        executionMonitoringEndAt: '2020-11-03 22:06:29',
                        flowHash: 'znjpptj2au9vdiwg00ftqqwsy58s77290938bjnt',
                        flowParty: 'ap27ra0mbgjjvhcnv5d1o3xy9whz60dxv8qyhoryyvnmpvi9ougxv5ni02o4fxbpzdqv4d78a17gjtltrxj57jybf1bzzyg3ob4m1d0xc6zv5hphnqt89ze9epvtaxga4bkxcvplnt45brsvze1hh9omlyleb3ql',
                        flowReceiverParty: 'deduyh97p7xst39b72eqcerc2dwjhjtstbv9djjjbvfd4l6q6ur6blthtzrlmsey4852pqml9315nda5o15eaqdvvh7h6up90d76cur811faqyr9v4fyslz074z9u6373s6cix0njxfwpo0mxpk4afebzrpf6c5q',
                        flowComponent: 'x46cp8e3civbfl0adyv77a9as5zf42krkr2xtcd4p1snn9el73aiqdzolr4c61qlvy75wk9wbr8zi4kbgmrv7fj8etx30usyz19a1lsf4iwqoviktd8xx5rcj8wsqtpn5f6myahkinmc8nu41axwwd0wuyv6n9zi',
                        flowReceiverComponent: '4fz59c95omlutmxuymcz7vczrp2ffjklmzqv60fxltvmghwse1wv84wl6r9bct8hisjlwm66phasmuvuatyjqfmi5my8hr95fw6773g0at4tsqx1ox5vypk3m9ybhare11k0fofn3l03sktg4x06suo5h5hf174g',
                        flowInterfaceName: 'pv16a9qbnd2dao79tc7oft1l46a0cqnwyeizoqvoxc8guezh37onhgulvz7cfx5pkkw7b6r7z7ns4bu8d48zlrbhjh8uax46ln3wa8g8lmj9yy1slnpjtue8oafvlnmuq46dv9blzp9sd6cle7j3f93czkx3bpvf',
                        flowInterfaceNamespace: 'rw7ux65qo3wq35pzk5evxn95502bs2c1u0hiyyneg6s6olkyegmsi9zknzhnt9dhg7mi3ylv35806qhz2xf4o1or0c3fitdyw6kmjilazfu3sumj9sxuzwzodzb95kd798j5hqdmv07zq1f3qjfrno7031hb2hvm',
                        status: 'SUCCESS',
                        refMessageId: '2f6vuf3dohad4x1oh0ii4u0ccjjg1pgl68vv7bmwr7vglrmxjixdbgnvcwiivafapudu7strwbsgg49a0knkapk758xmjqa9ayzag8nx14bi9d2ejmbvfpkjw84ruzh9z0yda27bkuul5nozbejg5dyvq6siw4tf',
                        detail: 'Magnam cumque et voluptatem itaque consequatur dolorem beatae quas et. Illum eum et minima libero. Dignissimos nulla quo unde. Nesciunt voluptatem qui qui quasi numquam ut. Sit qui velit debitis fugiat. Tenetur id quaerat qui autem et laudantium perferendis molestias sit.',
                        example: 'ct9ynpnww3fa60d9m4yrghmhj599i8sbua4rypd1vr4bcn935a4sxmo5lui4ugsggrckqwtvw9gwsk6e4dsbiuzupwtg2lm1ggl5ysiu34icqz8cjs3nbjoik2ajioj1d8j5btut96dd6t8fm0blpiy8a2ox2c1e',
                        startTimeAt: '2020-11-04 06:34:56',
                        direction: 'OUTBOUND',
                        errorCategory: 'h0z911b0q5z3tlsibqpve37szq9evjjkbq76980jnxm83bqo03u5t5m4ja2h8o4800wewojj1386dfnscxh3aqsvppdoiglha0qpq0ezoam42ov4cp9zvlru1ozqq1udkdho19u7xsfb40yqrtifrcxxwwf2l18x',
                        errorCode: 'fxe0sd2njdvzgyh833swabpe8ooacj595tqrwfddxkeq54337d',
                        errorLabel: 737679,
                        node: 5427827294,
                        protocol: 'tqoz2kvfe3ict4xttq20',
                        qualityOfService: '51ahqn68wtudy54bl0jh',
                        receiverParty: 'f170zr5i18ockbnjl91znbg5fwk3c7zwi2clxvm1jq6ux69587wfamkwy0o3b2sjzxud0rd4yh1zyc56wzpn3f4i1xmos1n9vqfcayc4rvmoobmhh808pgacvucougsd9av9qnidzfb4cckfjw2ih52n5g4ddhg1',
                        receiverComponent: 'rrrdfhjfyzmefcfcnvyv3iy98e725xwm1di0mzx13xng8qk9cevmfp0o9e68rfebxv3px3f7ixzmshycfxliy46j4fjt1uhxkremqrl6f30xw14q7dm1sc50o2876jh42eg1odzgzcv2j34gky0iobo3vzv19zza',
                        receiverInterface: 'jhkbj6e367glu65ie4ugvv3fj54ww3z37p5ik7hs3h3o2ntd44b93krwepwsk9teyre3jmybbp8rvq7kh3v8jwrlv5i3ypuxhi0qvvat98ht74a1jwaebfk670vp9qkuygqxua5dtw3j0tz11xl4tw7j4bytcgkl',
                        receiverInterfaceNamespace: 'hr0fqgwr5eseluij6qzmhh8vvyozwltqroyofe5j5n13x7o1aurm5hgv348tdk3xqqhsv825muy9mh3rykugu9ffz3ehaeferlj8y7dtw0cao6kfnembrzcmx6qfusz57gcl9zkgm01cco32i7vpslhnx0e38wnl',
                        retries: 3984734952,
                        size: 5263262131,
                        timesFailed: 6191724262,
                        numberMax: 2283254415,
                        numberDays: 6579918678,
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

    test(`/GraphQL cciUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '36ba7b85-2869-4e12-9f45-369c708c713d',
                        tenantId: '762132b6-6419-4716-b2c1-ed7e1d0a20f7',
                        tenantCode: '4jbzei26aef6y0p3m9apmwu5hxiosrjd828oipcycs0k26vip4',
                        systemId: '62c46562-0b32-417b-9fa5-09c58b612796',
                        systemName: 'u0us4jg6f9cpqeof47zr',
                        scenario: 'zqpxxt27pljhjl8kururwwqbo9isdhjyheos56k7pwgb9q7dddau7fnk80cg',
                        executionId: '474c5101-0881-4a24-bd56-77f8401e3b39',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 10:18:14',
                        executionMonitoringStartAt: '2020-11-04 07:08:52',
                        executionMonitoringEndAt: '2020-11-03 19:35:41',
                        flowHash: 'rarkg46hc7kv9kbc7e71zxy2cv1px7ujy1spxg09',
                        flowParty: 'dsdfbj5vmaesvduak6ah8ovlk5dxfasusv1brq7loza87i5y822w8n9h78y2zpi0dqlmfn0ari7cary8ss8z6um50zjlb03ftrt3ndxizgs4nzacd2jvvhzpknbd27zj1y8rc2hikkow3hrp5w3h7asnqullyotf',
                        flowReceiverParty: 'h518fsg5nv8w4bjz1hyz1qm3grotkmreiw488ljm03xa0ywwvfytfwu06ltbwoyw9lv2dsa7v668q7l1bmbr5wixg9bbizyccqyu6wqjb8asmn1t6uognefdj7e3mvku6oa3yq3agmon2uk5p5unsthl5n8lqf86',
                        flowComponent: 'd0e5qxkxl6ll91rrtvyug9vidjkjpkjtiqt98p136sjfyqz3dms1iovvjk777brimwomht0z7arzfvlstok7h2b4zmw9o3stg9dxig94u21ik2zej6zlhdu4wwv9yl63zpc3bcxp5wizlg146wwuzyvi8xbd8ya4',
                        flowReceiverComponent: 'pn3r62b39vftwp9dc5q1hb8s327rlysnyhqtx6734gghzzc2ckg5ovl0issdl1yweq9f0yfii6poyuxp7kk9ax6btvgv80g2hzasi8zb3yma95ai06iheibn0e1b6jxhqdge35r70btks7877ctbn1e8qvrr0c6j',
                        flowInterfaceName: 'zvc3dmtzlyu8jtsikl6u6ubq6u2cyg90h2ulbbphv2ngrec98jkp4gzte0l7kh7qtwt05ryj57kdvfcxo23g855djt75m7fui16h94lc3woyom5bk9cu9zrb50f57nfi0w23uyqdfbg3mxp8bdfpwou3inul7ppm',
                        flowInterfaceNamespace: 'rkrxhx7ohay0n7l1z90udyb3io77dpkq5j5oko0yvzxune6s58dff02ov2ps56sw2yknsf676w5wpbnhd8yx14oi09rlkirdnzisxqpduir6iyyo5s47l5oj3gfd111dyv75h8usu3x3wfqowb0f536g7egh18hi',
                        status: 'HOLDING',
                        refMessageId: 'dh0ywrx66k7b9434204jw09djpv6rs7ltw4fyzd0gsubxu6jgma98o6umw7kwnuv17qlisplg1c6pmblew6ml64rvcis2yb2o73hpbk7uvszj96jxut4buxnv31a29k8umkqokh1yt0j1qxntfhrrpnu7rs1uaqh',
                        detail: 'Dolor quo praesentium temporibus mollitia qui et. Ut velit aut ipsa ipsam perspiciatis quam incidunt vel assumenda. Est earum accusamus et quas qui qui quis optio et.',
                        example: 'iaos9dns8t3amdf500j4emsrshxa7rg02hbdgf2zhgckowt7pxkyjd8wtj8przf1rvzlp98hvh1obgyxsfex23mi0d4r6uiz99q6otp63w5pbxbdgaseqzstn4fy2gyvoofzmb6n3k04clotnvnr0u6ti4ssehrz',
                        startTimeAt: '2020-11-04 01:55:13',
                        direction: 'OUTBOUND',
                        errorCategory: '9z02d09mfht7nk87ow9l1r9v3i48v8f100i8f864e0nsl1czwu87ynb8w5ctno6ujkzokgwf0zuvv9rcxj8fq7uwa0ai6ibkq38thj6oot5dj0rdxawfmc37az1nyi2t1zdh7c904i35pbvgx05ubitgz6cq4bf3',
                        errorCode: '8frzjomh4c73ltrdcc3rhzqh9zw9wr4wu7j18wt02l40zkp3zc',
                        errorLabel: 907178,
                        node: 4344369891,
                        protocol: '6844u7o6aygbuvlaxj5y',
                        qualityOfService: '5z7ey081jzf56eya2pl2',
                        receiverParty: 'vkhkxibjr7qhh7ncvnn6zwgbn7z0di2uz9x3oeespcmrbym0bgca0ppczzfrnvhvke09txom10p0ex96gqisbl9hi2uxedpmrkjuwgjpycf7lc5dfilu5fovzp01kznsvhz98eqfupcwk925r1mb0hh2i5lqpsie',
                        receiverComponent: '9uqhzebt34su73adp07gkuuy4fpspfuzhrnjmx9u2hwctwiqpzdjtanyajztjj785ew61jjzwxw75gclx29xz6rshenp6euom6l7bt4or3c74vp7res2gmudw5cc25dypv2jmntvvfus8wask2e3kmbzbg60tvm5',
                        receiverInterface: 'yjb5oe3w0ukj8aq7b95gx2azf66iekxvld1bp2nohaqcobl795mhoof3teyip5jct4ss92mkde02evtdlnqrtfn66d9b5vq30458v7fs28stt16pnu2gzwkcw58lej0pmpx9vdowd1rnyafc8eh7ejzp4wstoe2q',
                        receiverInterfaceNamespace: '29w44wblpsccjgo3qga7qfjiei85z19uzq1zuz1o7mmr8fwc7469i897p8zthocuu52m5f35bui5pnmccccqfz7rsv8ave7vtgi4ti9wgplz4vjoiuu8u1u84h3fmj0dh5tnmap0knei2d8okppp81mau5hgwktm',
                        retries: 7624626069,
                        size: 2824017803,
                        timesFailed: 5724505227,
                        numberMax: 2876809779,
                        numberDays: 2909896455,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('36ba7b85-2869-4e12-9f45-369c708c713d');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6a11a674-d170-4172-aa4b-00a7c992a708'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '36ba7b85-2869-4e12-9f45-369c708c713d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('36ba7b85-2869-4e12-9f45-369c708c713d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});