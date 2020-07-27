import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'akyek5vm1bnmm53k8qwb1zekkzipcym5fksa6cdjljkmqa7wji',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'pufhq7atj8chon89ofb8',
                scenario: 'c13swrefcbhviie6kon8vcxypb2pewo3gy3n9bb18at8gi4rp1xt2vobkkft',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:40:09',
                executionMonitoringStartAt: '2020-07-27 17:48:56',
                executionMonitoringEndAt: '2020-07-27 04:34:07',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'x5jxpoaq9hveytn1i8ofse9sdg5i1fl2ouesomij3cfbyl1kwzvrxi37vvmty5lik9wmdvlzfqhqgay6ric0hjiwjn1k48phc9yzarvpmu1ix12wqd3ufbmx0ac68a2r1iaqf2v8z7r7699s4hbj0t3cyec293t1',
                flowComponent: 'asxrz9o7jc53csnrj1j13988jrdr1qebcopjn4roilmggj7nmpye7bl1m3mvpc11wbkhlwdwz294a9a5jh29psbzprd9fg1g893ykis7ywlg3mksxl4npfbkg12zqyr81yyrxhfyo8dw1x1escag63ilbzqc0klp',
                flowInterfaceName: 'iiynug6i2lu2qkz6s7j8djmbvktbw9kz33dse9mjihv8uroatzogde5jn5repdtt5t2hs4xpwc3t060a4ztl39wv0i4bais8hlethugtmo200t1t0853xjmevr5cafdplce49iowlim18oiqx9njhjryleigubkt',
                flowInterfaceNamespace: '8f0l19qy6qi0jgtm3rc6gsqr404hz6kkti7qh36nownnfb0286pk6ky3zyy4i8h0p8ivexcncd70q3iqc7id46ze285elnohl0a8zwc6jthaho64di45d76p5bcbplgpx5b53aea6f790ih1bno5nzruu2mlfazf',
                status: 'CANCELLED',
                detail: 'Eos tenetur ut enim optio rem incidunt eligendi. Praesentium magni fugiat ut voluptatum in nesciunt distinctio dolores. Sed iusto enim sed alias qui tenetur consequatur praesentium error. Earum ipsam quia. Omnis et unde tempore qui harum accusamus. Eveniet culpa dolor.',
                example: 'zihqaewll3wih96jcop4xyb2hvip6hrm06l598yms4jp1mtm0o0ctpsf7nefxeqfg1hyry4r42tg8rxh97dj07rl1ho1cd6zgvz55cpw8a04do461k58is36yaedtsgo3vpbp5bfysgoekjq8fccbokgvepua0ic',
                startTimeAt: '2020-07-27 23:26:30',
                direction: 'OUTBOUND',
                errorCategory: 'me53pymk3rkbcwdlqwvzpz01demk7psc7c2ap4lmanneieft6s0y7je8ysfb1ykywvokrpuh1y67cctjj0vgplhx7udjoiolj0bqu1eaqzmidww75hhd5z67i9qday2y66lfnsno3ho2e3ricyc1x47o9b2xijjy',
                errorCode: 'd304fkifu2z9ervd89tnchp7a4n2pjd4f8yfcp7kzg3bgvczsb',
                errorLabel: 903565,
                node: 1431465929,
                protocol: '1mfh76njwfpc6q5gdr6f',
                qualityOfService: 'bqiix50cd6k0b0afq95u',
                receiverParty: 'dtqfm7pjf0btwdpyrht05mt7g4683b4wmrfml3yg4dqrrll8yp2kggqu97ulydmxrbw4u4oe4k7ysn1gfzsejjaz4t745s0s6tl2obioib9kyb8ou242pxkv0doh5w2vxkdqkgr3o8l9oqmxjfchlsuw1ktppg7w',
                receiverComponent: 'ptm1ztvcg3t81fi8iuw51rbyyeegvjsi5jl6givdxu6wt105e491vlqkj709kla5hjbz53hwjlp6s3nm0410c0c08fzejybrdubh3ue8j4si5almvcpafb56dnrx21d5xkjluldb8k2hwopsjxqg6m5ned4rfddu',
                receiverInterface: 'e0nkmrdt3wasdmk13nf7r2ws81u9xg10gm0vfeed59ay36qd3avohzq2nfy50qth9yfgas2mtkg7y6fnhly3r1se425dep3mq1y41ikfvjbd297tuctepq8j1mmzr0ufvx7o6cnx99a2do4faqldumi4zj987cfc',
                receiverInterfaceNamespace: 'wyy7t526ti8rt78tw1inz0p416dlfrxptb23osnmtt336u7mzpukgebgrtsgmb1kyq4hqvvpzambry4o34w3nzcbzjl0ruvca5s5se2swjli6vddi8emsd1vdj3m7pydozyin2wgo43wb67tx1g7cr3m4tuxzmiy',
                retries: 5610009645,
                size: 7279169580,
                timesFailed: 8945453935,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'q6rqaec9d4o5tsa2s37ld9f74by1awt44q3v8ybzj8nb4nhamh',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'af45t06ppsevcqu77siz',
                scenario: '4uh4ra9v8mpw5vdbzjjf30ipz8utme9bnebuyd4wxl2ddyrt9bxriw1jiitq',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:51:10',
                executionMonitoringStartAt: '2020-07-27 23:14:28',
                executionMonitoringEndAt: '2020-07-27 08:32:27',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'ppxxnvkkcd39m8imeq2sb8qvsbyrzbhgmpie8uwd79tfugkqus1w5cc2d8c3f69ozz49eb5j9zj0am03lfbxdphsnaxi5wh47pe9rpwuupguyca2lj6hv0tvrbeh2md317aeopncmusr9dvgpsutsgw2m32dvuug',
                flowComponent: 'wyk4vrdfz13k0vxfc2uns3abhgtw9xtgfz28btx2mllu9vciv1szn8s5q6qhlq1xnq3nu2bw9gir7d3uquwjuwegscqwl8v2lk36pv5wzrgombwl74hrd04fzh6696wlom53iydpaencxwdgdhdkc7a5msor22ih',
                flowInterfaceName: 'n6uoxyxjt5dmcgz95krt7iar40p3yuhb67lqs5qkun8nem7rgyx5hxg0uu19k56c7zgtdyea9jw2dy7fmiigxn8begxmtpkoh8cx5trr4g4x1dk5wtfh2yca7rlb4de7mnetkfqg8y1ojyu6a65ni3af24y6iwf5',
                flowInterfaceNamespace: 'hq6t5opbjre8qchgsx39xgr0gwzzkxd6njcolxietprhvi05ige62wm9ut2wlbifviwznfcqq55nvkpwozocm5gmjyuy6qox6gfd38mgttr7calk1x3t7htbtxcrifpiq9j7aj2v5ay2tzy9yly5c175e2mdbrdi',
                status: 'ERROR',
                detail: 'Enim nobis non eaque temporibus magni modi laudantium. Autem ut adipisci praesentium quod autem unde sed quis. Maxime corporis fuga nihil. Velit quia quia culpa sed aut dicta. Et et quis omnis culpa fuga cumque repudiandae. Adipisci voluptatem porro.',
                example: '7rrd1pzhwsy1zzkpx4kqgwx4xjiwqolqfh3njqnu743b1nyjt16ot8hrzb6d45f5932n9bfz8jsgtqco8qzo6bt243rpn427l16obc6ii9ak4xgp7kf10t8hsb6nfvy3n0yrxbskep36tx0a7zjbdgbv0e3mcwd8',
                startTimeAt: '2020-07-27 14:11:49',
                direction: 'INBOUND',
                errorCategory: 'ma2bockly6kg3wzaeq744zt21xevtkv8e7rfs1b767qvm0ka11zfgtjxirgmbybyipnvb0tcgnsucgsqttzwovvhkgf5q89ujzdemrfimncemxr4bluh0g1r6upmyvkzmfbh6yaged9qx7dpzac5rb6j5s10u78p',
                errorCode: '4vp2gmplbhedveh5xlbedx8grjxmdarjzj5yqhu1oheyfzlu4l',
                errorLabel: 762895,
                node: 7552912135,
                protocol: 'xt0aqjhlcnhnjz2c3k75',
                qualityOfService: 'u5yqy1j6taeuvfahkt91',
                receiverParty: '8sm343dfiexzuohkiuqhmsdax61j4qlx3ki7cssqbimjz3dj4hal54rdgiz7rseplvt6totlsaq0hwv3skrc4mu5soqhko5fo5qq7614ieinck71jugjhdmhi5iok1eb9ws4s68yfz03fd53x8w6wk8kyc7dwgrt',
                receiverComponent: 'wiwmmo0awqho94h5hceprc2s4hm2xp7wsk83uaxftaf1f3ugd090w8a5wmdcavs1qbpqx9in2l6pr3fbhbnfkqnxykepb33xf5to8vgupxwid74yiirbzix803ocmhcyh9un721u85l1g7ocgiwb1aql3u77ua9e',
                receiverInterface: 't9uerew2dilb5kp4vrjok5c4sim76u28yqvx3v5x4p0rgkfmkabeqivnbrriwax1qcjpagzdadi697l8wh26qs85z19h91ncxudjy7w0diyhgj7r74yk4zjj4qzqadckdo0euef1bl9wj4x1joetpkyizgvbobsf',
                receiverInterfaceNamespace: 'lp4djqfnevwtmo7qzg8yfkbbm4vjox7astiysyqqvue79fxtqedjll5oig016icc4rppbaxrlps0vl5u7y4f7xqvv13ojfp1py5dybp36o8ig7gnn2s3hkakbk9ag7angvvy7212jjw7iq25fdel0btlpalcuszi',
                retries: 2787197928,
                size: 4572700183,
                timesFailed: 4007564198,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: null,
                tenantCode: 'kve9kmey79gvuww4do4vfk6x276ntwf153ko2jdenhxz6tgtbd',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'q9f3xfjfr3k8o63mj3qj',
                scenario: 'q3qacdwh9lw3jqztlfv6en3gfe4pjx2qdgx0v1fet7emv6se0wry48v8b0w1',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:07:32',
                executionMonitoringStartAt: '2020-07-27 12:57:17',
                executionMonitoringEndAt: '2020-07-27 14:25:08',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'gvacqhc2wdhs3trygrvnzk99e36yqxllhgos7sal6fusg6hiwpstr6gdg9cbw7spf84toezf7k8qah14kc2epzvhg7oiiclsmzgvdzj2lom9ovygo7mik0csuma8xnpka8fc1tp4m1h5fibc925m4c2ygx0nqenu',
                flowComponent: 'ps4tx7cpj55odrb7q6ftvb47xwb5noskahbveevqh4179w08cg69ni3fh756fyt6py55abrvejf1q12hon2mb2rybms03eoce3cs84tjvm59rcxbzh8zuofsfmxrr2m3pcf4rwb3vpkatrkt1o1yctn2bedj92sc',
                flowInterfaceName: 'zkop80levtm5t7mt67lwmunxj5ns40y31h1qff8i4jhazfyjxmsnzrrnpusjllzqjv2cwfyb8vef53xxbh0859s1uhycnhebj2ihag8elk802tpfagozffujt7p2icwyvzn23umgqmjx08fvl76ffv6kml3l1phm',
                flowInterfaceNamespace: '9henliegxs14s9zrqfgioeyz44vjqf37tkgibkxxzyuw0dl56ur03600lji01f4ecys5gw9dz80puz0qwyl440kb2ypfzgtm5tmxfv7tby1wkmnjy8sso5b2c00gbzbz87xmf7axt29hs8ztt2zc2fdkqtwpfcxh',
                status: 'TO_BE_DELIVERED',
                detail: 'Nesciunt ut exercitationem in. Hic dicta consequuntur ab nostrum voluptate omnis inventore quibusdam. Distinctio quo cum. Alias iste facilis labore omnis necessitatibus non. Voluptatem incidunt reiciendis sequi sit accusantium alias quis.',
                example: '413gtckqpwfcvfg2bue1rcmns0ehjyfb0jla0znmfptqd59f5ou3lo2zbddqocbx63nyy25o8ey9cilamjt9n6ji7x4nstdcgirzj4xe0o2z3hkfuxomfd4j5m8vsmp07iic23pgwwfaf803562uhailusl120nx',
                startTimeAt: '2020-07-27 08:01:54',
                direction: 'OUTBOUND',
                errorCategory: 'jnmnvtco3b2pjpmjo8mmrpgfzpm3r5m4x9x4edavzo6vuitcots6123z5j05bkhmae3m32sv078vpqrkdyk3jpc3jcxdpwmfiruw6imny3x8ovllp6dgdok2b13nw45m5j7gtaapwgo7m9m3yiaf0vc7xrn7k0k4',
                errorCode: '9zrd8xd5joktpc1im7gxasqfd3mraac5zzd6tloy4mdm9h6a3u',
                errorLabel: 646531,
                node: 9129945308,
                protocol: 'x9crzw5c3s61n91pp0dn',
                qualityOfService: 'ao3dnh85a1do3nvlx32i',
                receiverParty: 'rsu2rkne10vn4z4k5ya53f8yhfqqgeraun9rtahq3wunuecqladnu7te8jj8lvi129j7bwvzhisglahgre3x46giaabk0245djey2b6r12syg2ttxunu81gjy1946ztdhjb1zs3vb8l7homoqyfnz5pxfij77by7',
                receiverComponent: '53barmzfujtxxrz9sokkaxrsmrxdwclnvmfoc854qi1di9elpkjb1dx6rjfcimjiktoiz7k910ypn6idnq1z5dhlhtm8j4sccygfov0ud0ua03e3rulhh80s3mv2z5k92he8aouninrqbe82i27ryyq6g1kzmzb4',
                receiverInterface: 'ww7qs490cko7gtmuo3yvqgr49lqqgc9b7l04qd9ishpnpzjtqkt10jm12mr307aymwmwrxpt0vu9xms4vgnu6a4mnl8b7c116w2n4p9k0rn1ures9qqc57g1xjp4ewhuk2vgskjnjfei92k1sy82rqxexllfujr4',
                receiverInterfaceNamespace: 'dk5kifne0llxnpgw0ptxa1mkcl2qnqw7fhq0so3xc09c1292clopvq9madtkhja4qp4rh53gy7kxl3vwnp0om35ghyeu8l8uf1t4z98tssbo4ddj9pn8wpbv4jduy4ygtdcaaf49zrzj73vmuato9tv8lmch5rml',
                retries: 2742555979,
                size: 4744617169,
                timesFailed: 9038540451,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                
                tenantCode: 'gu5illg1cud8tq3x66bj5fq9ukml6koc3735flt21p25e914bk',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'q3frkhofq52nlgg3m86l',
                scenario: '9g9gzv5knuqt2gjqmb0j59ttz8pcddhtog9zz78u8j3iapo1stbrheaqdgkt',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:47:27',
                executionMonitoringStartAt: '2020-07-27 06:15:51',
                executionMonitoringEndAt: '2020-07-27 20:09:58',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'balt1oixm9mlfwppuji7pnk2rid3hsbnve8a4z5e7anmiytzkqzjqap2otjb53y2rwux3dvo984utv8pp4gvse9xxiamlgj5rm8st1f8q3mhkgbw514f3klhzqwajzw18ntgh3o32ux2b8xq7af8qqzsl0syzds0',
                flowComponent: 'hxnhdrpl35k9unaediof4q3dfp557ql3km1e8s0atir42lsecdifjbpz4lbz0hmwec3wl98rwnx1sn3zdc1aj9wbssw1lj9k3wj946p7kph1u5pst1bcgqmxp6lqpxebr8g2hiu1odjc87kps4h757eos0ifnroa',
                flowInterfaceName: '7mlq3tbgajngz7n4guc5tfuqu2d5pd526bidq1mbqimp1fiahehd1b6lwmwoevuv95rgrrawn93cv5hekw58ws1cuh2xrbnwzqipng9jwmlxj0vzkq2uh5jko9zsopkv6yy0w66od81ksrszexye5dya7xh52y1c',
                flowInterfaceNamespace: 'czfafdbh36l6w2ygpse67uf5wp3ftx9oiih6pfpmuaeosil5u6475rypa5zlflj9zujkic82cwpnu59safg9da4gx9qim6lmluzmf19s6mdtfudgkvvq82065antv2ri155foj9bdqzvqvagaffkc258l03789f5',
                status: 'SUCCESS',
                detail: 'Sint ea ipsa ducimus minus minima harum rerum. Et nihil quod quasi accusamus unde repudiandae quasi nemo porro. Nulla eligendi ipsum ea dolores nostrum. Asperiores omnis magnam eaque commodi cum temporibus necessitatibus minus. Quia qui consequuntur.',
                example: 'om2wcnqwww98je03b5egu5h0mp8lcj4t18g0hv7thvzgc64fe2g7kf481a3vjbvmvues89stg007fjqhbmefnapcesqpwqv43m8iuv41wxynk4dyi2quaqw455b4df9z9q79yc6u3htn3i3vrr4v1i4kkc2krl5s',
                startTimeAt: '2020-07-27 01:22:48',
                direction: 'OUTBOUND',
                errorCategory: 'zrvmesqct4t4w3uxj00w4krws73zd4t8v5en8so50jn789sezp2cmgojqauqa58ukqsx3ff2iazbhyq1ld0gu7ycu814ir2lzn07n21nl80ir0nb523ajzpdi73dtznscrl91xurgy833pq0u4mcmzwh68onwgqe',
                errorCode: 'rbkc1rbs917iyeifvfuwgqz0kj1g1nlh4qq2hb7huylirjlha5',
                errorLabel: 239132,
                node: 9619240987,
                protocol: '7cdzsd6fwmozlysa2wx1',
                qualityOfService: 'lo7y1jupqubb4frrg78u',
                receiverParty: 'si85t0duq290u1805x9efzdxl1vhcvvnxjnt9j9lsussenwefl09wlcfvzo5y9rgibn83n4ldw4xg5vozrfvps2mfpolmwjkbn38vpyxyc6di06ysgicm5azjxz6l94vovnew5vwcaww33s7fof29t6qyt9x82c6',
                receiverComponent: 'ulycslrob1nvio1j2ohlkxa6jwxt6sdhb8m2pri1j8xjlm4fgohomye5xle00g47ei1tw0q65vp9lgoys3esr83byxj4lz2s304mekt91q7nmo1mca821dgi8mcfoj3cymsyuqbctrnxmjgb8lf40mruviaozpnl',
                receiverInterface: 'fntn53a2c15cpd4uh9rys4wc36hjhz0qixdcj5icio1y16c0psh4oda7i0b6ydmar5k2vkzk2arnvpzyfjyd8fqhjsols1vy85t37ahbk7wuehe0eosjfsy1izgtrnghctqnqyp7ynts5dlsf9dxwtpe3lub4j73',
                receiverInterfaceNamespace: 'qsj9p6gkod0eem1e4gj5ryru4azcxv3d3obzctxq3m87gia250bxa493epbpe5tw7x9gxijfomztkq8f9mkmidxjhlb87tk4ro8e3v2zvqhwl7xlm4hybqcv1r1dnmvsvyxjf938vh0jeyoo1p35gqemmmj0sqge',
                retries: 1887601751,
                size: 8919086989,
                timesFailed: 8413248240,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: null,
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'zvdbdy1vehpcjy5x7rbz',
                scenario: 'j58p7eujpst3xg994t1c5x6eaihj0ewl7ggmwwluuy1q9zgssyjurvrayykc',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:14:56',
                executionMonitoringStartAt: '2020-07-27 13:20:28',
                executionMonitoringEndAt: '2020-07-27 01:30:52',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'ibxabwvf87boa6n0xr5chfixxexa2kq7tr3x66z450h6vnn8vw6z5d0ykdx2u1kfcu28rtyaogxkwdx9wqaswcnkwjss3uen9cjf6nreel1tognlm1vr2qelxsd0ve4q1imitl1m2pnsxz49krysyy34km6w7twy',
                flowComponent: 'l17r4i4uu2hy8bykt3ep5dqxacmiwwuzmh0qio6sgc8up5n29c5j3hki8sv85lxqlceaqnp459cbq9ehqz8r5imcylpphsbo53c1mc6lkqu9pdltf9y5x6poiod6nbj8cvhb1smc99jyow6m4e4v6o2q3ioh2lzg',
                flowInterfaceName: '9m6tfscj69c986845vvgw2po3qs2u5nx1u2eipoei6svbwbbl1j3a6r9629hnkxfx2czalh3mld43e6hlgim9py24bawy8mpkbyg7ltmxs7z1oumetddx1wez4xyg0xw04gz8re2rgi9x5maqpesr0kfshc7cruh',
                flowInterfaceNamespace: 'njvqqd9l61k9vqchqdhwff01glisgnqc9hrr0rha0cabn9gs4vodpk6x8b4r2bibak3fq01z9521jjwkc8fe7k0v2l43m73sk3h8jpd7hh4rcpeu7w82yhaxg2rfyu4i6x8mltl23rgnvpuwudj9y72j6wr0imw1',
                status: 'ERROR',
                detail: 'Unde illo et. Sint molestiae esse porro alias. Sit qui sapiente. Qui quisquam perferendis saepe error omnis provident.',
                example: 'xfvuxmoheocsmkaqa00bv1wu41x6z8607d57dv5x3wu8tkk210d5454blrib5qiis22620iaefvpb9xar25tqw6v2ixkamhcgh0fcn5aqyriac7anc02rjubjlyymgk4x17wfnxxjt5wrc50k97qas2u2zlb8n0s',
                startTimeAt: '2020-07-27 19:55:45',
                direction: 'OUTBOUND',
                errorCategory: 'ays4x6eigwh5b9vv4q9xe6mh49fun0de7d3klnjecgqc3duri44h6fsd2hu9cq8cjwlgv3jhb96j49ymhnz2i8sfy367tzjif0is7p0fi8mvar9q5jd8i7nt6nhn26x5fsev34jga8uniscvx8mamx76931mppv0',
                errorCode: 'cdtlrsmlmem7au4whju8k08opjx5tagvn9tsbdx78r453gw3s7',
                errorLabel: 863089,
                node: 4162472062,
                protocol: '6iv8yv14w9bliynsnglz',
                qualityOfService: 'xxywp8la08kyygla0ps5',
                receiverParty: 'wjgrwjozrjcp4zhbpu9eni81ih1ih3j5z2oryveasp5ml75iot5x48fchcfsm33qvvekv55k3rvlg9orhowswx6svva8a8qbd9dzy36w9tfxbhntpg0w127lkboo747k2jl4fgh36noihzg1cvl4h5uzsk6jxm9c',
                receiverComponent: '6nnz2ku6oqa90u1mp1qn1tt94q71u0tp31a68e0oflosdacxfgwl74vxzgvi7zodobyu35c340x7lq209q90znleriyjhsmr8gs3x4041ay2fgnoy09s9mhuf105836okos2mtqx965kmhpenew85l0xnzpk42ci',
                receiverInterface: 'cscggebur5qr97ur1shh84sh9gokpwvpdkju6l931magqu3cxfbu0ftj868aisu6v9jt5gxng1jzxowe319l9u3xup90qugz1tf8owmpcrqm4rbw181bhvp77spwu6bnedl7lhwwpjvgntf1vggz6tp1t0lu96wl',
                receiverInterfaceNamespace: 'wp2eu1c1pwfkx6v8pf5rhx7qvn0bdt896hlimw4zds7mgipxugc42v318eebtenyva74svjlqdymcxxbhipbcnbhbs8n4aphy4pd1rkes8u4k03i61zaz5koulz1fgty12bmwoybznhb74q6phh65mztshrrb7oz',
                retries: 2500866173,
                size: 7445091592,
                timesFailed: 5166907104,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ewhrjh9pgj6zvtu8euee',
                scenario: '3exun4lloxu0ov7huedbxn7g97cmpvivkt2rgrld9zn30xy5vhh5scllb9nd',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:11:42',
                executionMonitoringStartAt: '2020-07-27 01:59:50',
                executionMonitoringEndAt: '2020-07-27 04:39:51',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'sclbbsy1h8xiarvwtjtn2dvrq6mew90oeg7da5pj3aum1e3x1ymh6458fgfjbt9agogrxbym2ti4qyv8kpj2gnql86klebcbdlwy6qsht4bl1z0ntqho1o2go9u1rlwarsg0mnkojqf8y5al724rammkjh6lvsao',
                flowComponent: 'keirvqbs2o4e1msfbkmagc57ex3b19hgaag5h0afn6cgzlwytde9qxvqnqi6fc38y5a3u67skfgrg2geoqad3ia82mfkuodfckyascj5kmos13sd9vhk81n7iuzxt7louqhtwejv3wgwk9l55cbzklyiiyazq51l',
                flowInterfaceName: 'thmrzzz6e80wjre5zv5fkfcv8107rcz9ru82etkrlznoas5bldoj614oayw2zdttnr2pbgz8pola05r8vha3mf40dn2ezfciksm2jvk7s7jytplr4immwelpqhhr76cfoy22hxe3z8vl7yph9soipi3kumgah40s',
                flowInterfaceNamespace: 'h6my7facmog446pzb0yzmlashw54idwfwtun3u5vh7o0zcwuqklgjddpm49f4jsu9b201m9nkm11ycwkbb54mp3jf69j0b0p78l021k5dvfyna1i2d1hd273lddppfyu4subi2rw411rwq15cpnw0qzyll23gxyo',
                status: 'HOLDING',
                detail: 'Laboriosam delectus doloribus debitis. Voluptatem deserunt et ut in et numquam eligendi. Et exercitationem similique molestiae rerum porro laborum nihil in. Perferendis voluptates perferendis voluptatem dolorem et. Cupiditate fugit et commodi nam ratione.',
                example: '73qnpoquom46nejew63y2hvarswu8gq897ghe5ptvo2j2b6rmcvj8l8zib7jbiy1snzf2k7efygky8bkf8265f2t0vohhqvlesdjbsmrwxvbzusw7bid8e6gpqi2ttlx6re8wr9799yvkza7hv651n3ym0lzeyc6',
                startTimeAt: '2020-07-27 05:47:32',
                direction: 'INBOUND',
                errorCategory: '2jn36eh9nwt2txrn5j51e5feadol2jl28qq6osnjkz97e6x1uet5fkyopkg84q4gocz3ydzisbajsn9367ew6cd40fapp1vpnweahn0i5fd0ipzh9hk410epaikj6527ldw8xyzipgcna4nxcpf70a487rxu6t8m',
                errorCode: '8c7o3q65z3uyqhkillpcxov8hesq8nhj62p39ym32nv5ngov1r',
                errorLabel: 550519,
                node: 9753958443,
                protocol: '9dmdp61u6escaaw1sy2k',
                qualityOfService: 'gf0nlnvw70eltlv3d49o',
                receiverParty: '5pujjoyxfytu1lj8w1yc5xy3103vflxl0o5hhjg7uni8ash9zxfrkrlpxdyl5cgzrj49g0jce7v28kn4ahcg3maea82604csj4hh5rnczucq74uj2kvmjhdzge9kz0w8py6zylncwu6d0uj0jbdjlgkcd9wqytw4',
                receiverComponent: 'x5e7nt6zokipck9r24ymvyq164wxcflai1b65gwaqxsyqapwlgxgqy3p5tresrixb5vpanjv8ak71loejmq2li44r1dpd24klb0krmdwutyq8u2qiv8gzxeck2l8vbwuqib6914fp40bc4rt0yx8o63g6oqyah54',
                receiverInterface: 'gdkx8epmq7oiyf6ykfhzkcqxxr4kt7p713mngzg01r8hbn98v0vqgp62yzfmwonp6qbpmmxhpil16eyrewio2f7z8vabuk8byqtputoeu8io1txm06sep6rvtmrxgij05bbkjabc98we5nhnhtsqz0x723dch8mm',
                receiverInterfaceNamespace: 'pi0t03w8v3izzae8epx82xz3as00cc2utggz7xrxm4ij00egd5k9c2xubsb06giu1a4w4cjsdpec6o9fjva9ew94rblkjehon16643oh8c1taum890n01fz7mac7cqsixqwugcswaq0ius4qt4bfzo6cg6snyrt4',
                retries: 5038176229,
                size: 8013666831,
                timesFailed: 9664028928,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'u9pk9u1tl0pfej4ga3aawj8bstuer68mbmd9ei311sqag8kvfs',
                systemId: null,
                systemName: 'cl59o9lukzxvj4fkz4z2',
                scenario: 'lsvphh4f509jcv7bik5k4zi1h2oh2cv9yhenyd2zs8bfle9ekg2xh6xo9vax',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:24:13',
                executionMonitoringStartAt: '2020-07-27 13:30:58',
                executionMonitoringEndAt: '2020-07-27 23:08:43',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'rzpc5ffi6rl8na728j7ohkczjyuc57qptz9yu0m3zkqohq9ypqdwup8y5prvqclu9jeybvn5mlqqy7d0tt36e4p8wjzldrd2ab9nsnlyygt2kjvm84n106fh2jtmjn9h4jrxjfpgddmtylf4k8fsjj0rkw33rs78',
                flowComponent: 'vi8gtb05m3dxbs4nge7n9m7ftrp2gdpv2gpmeugj9wjkiyeykyot8o6rdfvhdzp1xsmduywc5p9i0u38c6137ddcyg504t8d4t574qgw8s3rwatzxqe0qr3vhvpoakepkocu7zreppzcmfu6cp1dsz9y7ixh1koq',
                flowInterfaceName: 'cqhvxdegrn0comqzddhe2yu2o88a8etjm1p8o2r6359g0r7zi79l0zblu83uk7zfdde18qp0s29mbdoe7ouy85q1hupxo5g2a75hrwwzpaf9r0qws5p4ng584wgllj8qjlowe7u2qg0ew5qz5lr6k1n116r2j4xc',
                flowInterfaceNamespace: 'f477z5a54b0gffwxqawrgsbl4eml4rbeygr9frh9wnwp0hljffk6v4g2wknutuh1ct3i1m9zay10boh587y3zwqnxbn2fzj552dqoxxocebobr24j9dde5xqr1yzbz5ecjkpa90mce8r8ojufu61z8dzr0cuyim2',
                status: 'ERROR',
                detail: 'Eos praesentium voluptates dolor temporibus. Non omnis suscipit odit. Corrupti ut asperiores autem voluptatem iusto.',
                example: '2eg0o7m6pt7awvf2sy9ofg4g6l2d8j7hlc44envkemw3ogfbh47r33hrvna3320zj09cu7x69u74fkx6e8r9kdsa6sg1mbj3246uzkf1sb6o83kvqy94lh4sn5krc0lxp3f4eo73dv98wx2cblmxcp3wd4dfnwd0',
                startTimeAt: '2020-07-27 08:28:11',
                direction: 'INBOUND',
                errorCategory: 'plvr46bmz7tpcilcdg9m34fscuhwuimcwzbz4mkyhkrqn3ug2uuyd840o6wgmqgy3d5ihciikvpvn9e3d9e0t13b6utghzzqvt34sja52hn4ma2rrqac3bnjufsd7h9l96nq63f48z3ibq841miuh1kgurkaoqcs',
                errorCode: 'cids2qizx6scey751fw6yodeojmxagrlzge8gpwr2g65add69n',
                errorLabel: 899785,
                node: 6888049866,
                protocol: '5e9yyzsv3wcq0bp4fxhk',
                qualityOfService: 'cfazs67qdz3uxj4lhoml',
                receiverParty: '5dy1j9y6rrto58n6mzphk3amlh08mobg5xomixaicgrypd3spn7nu5j9qzje9arkuoaqnk85xe4nhg9yvi6mwjwdqz2rnucg0tenitefippu78jcif5dl3iad3zhtlobud4vnem7u2lhydko4rt6bikktdc3nj60',
                receiverComponent: 'qt2ktlckwfghbtgpn47ekgolnkmezpy8lbc6n98zmcfdujql9o4du1r6kyqedozl85zyn4922j75v9lhx2gy3x88fz7mla14phvizfu3fc0o1w0vg78dmmrhd12phry1b4t8it1txle1z974iduwq45ehrszl7r2',
                receiverInterface: 'ej0nw5rc6jekd8vd3vw60f0diqh089283lpsr1l5f3n66l2uwk71x1chdijfltm3f4fjng4fro9afkgj5vyp4kmsg72fggzp0kratertcmiqqti5mifcv7gj1wimss5hrr39loj4ywbtufrmf7vci8wur6nrcu61',
                receiverInterfaceNamespace: '9jknk5m8mkidq8s8ybsqdk8g7lnm51r00jb6qujcn935u7xl55sojk6sv5srz3ea61jtkusw1007cvw3xku3s3cdcswaftsedcl8k0r8vsrrdubw709cstm713260v19parrqm4xtrt63jsdigb84cpn5damgve8',
                retries: 8586098043,
                size: 7073534461,
                timesFailed: 2380206137,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '2ta9h9479ymj8yazgo3ffkruwqzg9ytllwolfut5xw5vbqab82',
                
                systemName: '86sb59rcjpj2rm4asqxy',
                scenario: '8jnqpxdbjx9ni7pi6wm2exz21lcqptsfzizjkooafv548vayoghcqy36c0vs',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:23:53',
                executionMonitoringStartAt: '2020-07-27 20:11:46',
                executionMonitoringEndAt: '2020-07-27 06:19:25',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'c5u1832czti4zh5wy9er4yayzdb19sd6ywdgxepgtmub5m4ldezn1lfq6kqefoagt5wv4qe7ni93c3wpfdlo8wps9atepgyx3lesxrm7z5j3ca1pj2scyohxjrjrfzi4ywiupp9ym2819mnlrsw6k4iyqx5aoqg3',
                flowComponent: 'jh6hw3o3sq8mn88wcq64x4pygym4gsdgssyuy4j59lrx4x89kkooi9oqwal78qrb94i8j4tjh7hf2bdyu3xc36c77btg74lld51c0cp31ud1ev4bai1c1x248gpe8dff4oum9y75shcmprbzjvi39t5zcj1l8hh7',
                flowInterfaceName: '1ikcouz75c343asp0rmva0whyl3a1z2yqj5vj5jrd1fjuaiz8s10zzfml2qh70p7c3z44ua86vjtsy5tohyqqybxs0si0wccgriqayw0kijuttzzd59l6sgp33g55kxaloh0bmlm0x9c35ro3wr2x3aw64b751yi',
                flowInterfaceNamespace: 'xzdr5n2d30sondqqcfnsious8tskzwo87x6xq4977vpias04xyny64wvusacxi26bone9t5yhik0kk0vmsy09mik492dxuuotmw9q1w1rewff2swv53jx14ouq7927c4pl9oxzir0mc3mbocux7slf1gjmvwsmxa',
                status: 'WAITING',
                detail: 'Qui ut ut et suscipit officiis odit occaecati. Sed culpa voluptatum blanditiis sit dicta. Aut veritatis et perspiciatis quam hic recusandae recusandae unde aperiam. Molestias doloribus vitae.',
                example: 'a4vsg5dgwyp8ji8kuccfahig6d86onlulp1wnwiofzkqadk0vz5nhehubni7xd3pr1lgf0jxmhkcenxfqx6nllw50dvavp9cvx0e8kt1bo27o770vqvr4wqaz89jllrv5pq33jhc0iz0gng4ppb5htogr33es395',
                startTimeAt: '2020-07-27 18:21:17',
                direction: 'INBOUND',
                errorCategory: '2qr82o5czotung2oitbxa1gvw77xzjdbobplu5yfqi28ktcozwpbewpaj4gplb9q2f19dwoys76s46y177js81mraqiazgknat60btdftddgfzbfqfu1l1g0pwscnyevf4azgzwml2xkqjvt7qkx0xr53t1flo1n',
                errorCode: '79kvc7ei49h6m6f1uuioex0d1e46gc47zs194n93sp1ow149x5',
                errorLabel: 736565,
                node: 9041592413,
                protocol: 'dnifrpy2lk5bctqdomrg',
                qualityOfService: 'w1koj7jb9a2s7gibrdir',
                receiverParty: 'w7u41tymsmzqpcx00a0f4fzpc5xk7zdhm40ezdnmjglo2fir4gbg8rejpjqaiun0kgnx60kms9s57szx7ej7ywzmc1dryb8mjlcg5mcmj9d9byvu5blox0j60mfzlknwz3dwab4cixqt6ybaumi3b65g3n47sfu5',
                receiverComponent: 'v28yun8vkgw3xwfsyu5qgbjjc2bl4fa1hjkmrug7hdnhaitxhhoyq26wth3jm059drj5ga0ngx7fo9s0m2j9o89f8wnz31vtbdsaoet2jw632qdlsabv7re0j5a7wwghibv7l39pi7nkbg56ldz9oiqc96rjr20k',
                receiverInterface: 's9py731hjxiu75n1f1f73wo8s9vsrdn6nrwgpfr0g0ddglsvxbzfy7rpz8i8ftu5lre1gqgi6uskndqgkv3dtjvvout0y4ykltng0ovhj1m7r97qqdyqy54y51yxammjp3m7bh90bvvl20j4z7anjchhq9m0nveh',
                receiverInterfaceNamespace: 'b51p320275w1n6djjl9mpl5suvah5tgknuanxzf2scbva6b0bh953r19rydxa3dxhzvelba2l6h1slp6h0kycpocviev0ryk36vw1w52xewxts21luayqlwzzewgkn334578njg0u933wh30s12w2uvc6b9pegqu',
                retries: 4142205752,
                size: 6711532487,
                timesFailed: 7666361508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'mmdv7ojtsvqid4101agiauyp3mbs3ila9uh11e7m5ffnfw8y82',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: null,
                scenario: '7eual2napyqvixt1iv9vw1vwur0w3a8f2xjmqf5yqk37mupv62vxkxu3qtxi',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:15:56',
                executionMonitoringStartAt: '2020-07-27 17:40:47',
                executionMonitoringEndAt: '2020-07-27 01:05:19',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'sy6ed9b2wn29cl1fy2je8yclzi4m2t77ausyurpabxzp13ubb465ync4wkzc09bjdr8lwyr0u3ska2wta3unq35lbf0g078pbhhzyiwd5zt3vaoyiq5h4384ogogrrfruzsif14ohijo94a8ks2yqd0mlzgip2ck',
                flowComponent: '0kmhckkeq4f4wd21ns9xk35he2ukmy405l7uttnpdaow134mpfissqkkm72fxnepiynv6z1bx9ihcj7ch9bbc4606z2wuc3hqiofrutbzwsed6lelu8sm18e2xx25bult5zesbvnbozpwm7bzto7ow28cny0q3i8',
                flowInterfaceName: 'bb110qg3t32r9izrzuwaew5mdw8iawzv5hzlgnvdb64byc5fk2ukyt3lt7v2f2r8kngklqjlj76aerqeoabl3up7hrav5ip2lgvesjzt4jctmglczv6jngpmx4gn8uiu9hk8duo5epnlz0zluww83n9y6nio5dnh',
                flowInterfaceNamespace: 'kzl6e2c5c1z78w21lb7tmk0asr59smhhvhs7zhkugf0gunxd72cs0oa64a76s5odlv7kns5scklrp0pw78iq8ae9oumjv4nl9ej9bpeb6qbc2i4zhquvd9i0l5laqdyx4rw36n4sjfhnp101cim4ldyygy7e5821',
                status: 'HOLDING',
                detail: 'Sit dolorem quidem. Commodi sint incidunt ut a maiores ut architecto ratione. Placeat voluptatem illum non eius aut. Et omnis iure voluptas tempore quo. Beatae dolore quae cupiditate.',
                example: '5iiv17i1fzizfokj87vgbiqd48w7cxtzat7brkquhg8i3n0onvk5qj8qygekgzllhzp1lv5k6m95bb113edxfgtwm87hs6w209rw0434n70t6jln9bt6ohuwx603alwd4teilvjs4nn8hj9id3cg748swy798qzb',
                startTimeAt: '2020-07-27 21:36:46',
                direction: 'INBOUND',
                errorCategory: 'mbo6qfmp53m0xbi5d6arly3ashpd37z0f7sc3qyznoz82780uo83ll727uwhwzqxd91gyhnp1svdkdxms916lsaxngknuppn9htjnlxmxhpnzwz7r23rhunurz8fh1jcsawynsed8bnqd9xn121u9l92i245kwpi',
                errorCode: 'hu3njpchf5vi14l8li1nuop4rnbm7todhigtsj2bzl2pf59i2w',
                errorLabel: 680045,
                node: 8233038076,
                protocol: 'yy4zl0onnrbc8gyd5pmb',
                qualityOfService: '5g1djywxzv3azjdans9f',
                receiverParty: 'b0eo7fs1e0sgiekpa3zq65yh2uw9d8kuaexzhfbxng016qq3x4cf70gxfrz5s9vqn8c3hcjrwabi8j7jlckzk4n282y6wjrlywqvv40eire5ikpg9y3niggs5u3y2tkcj7ykopxuyo7d45hgqe71r989uibtu8zq',
                receiverComponent: 'ur582jgj07qj6ela1thvq9w632lyx9um7fc5wpk6p92zh55l73rppxxy9bgsbalirb7jh1m950s7ja8i2gefj9ba6n6d0z03vqezkepp5h4aeh88s9ztn7kum18dfjuc6vn00myrsy5wg49izu1ryp54b47so0nn',
                receiverInterface: '4oey90sl3qq7oh2xrqhkw2qc0bp7fjagwxliwmx8h47coratot8qg8lept8x1njcwpbmibs5tfy75eojesocda6byryxylfdvesgqxvh938g31xcc33if0yfbe6a9ijt0yqlp0mgu0egzoopcj0ql1h9oxwj9ecc',
                receiverInterfaceNamespace: 'ylajhex1v5whz3im42uu9mi2yugoaegzfwdi3z0wanm7hcgyd30zknen3d9fp6ex8gjg0n4u6vfqr39fyfx0usmqtb2cu06g5i3guttn3xlezk7ian2c2btuej9q8fbnmmm1jl1oykabx7qqlr8zt72bk1on3zmc',
                retries: 2409584796,
                size: 4832089758,
                timesFailed: 5567597857,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'sw100iz6ujncib9a0oqqjm9yg3odbotz0btsjv74msxk6zb5xh',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                
                scenario: 'j5at5kfi8swav028t4xvh409iib2maubbp0djjwvn7uo6uuehkfcyrxm9a4d',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:55:33',
                executionMonitoringStartAt: '2020-07-27 18:34:28',
                executionMonitoringEndAt: '2020-07-27 04:19:15',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'a3vcekt16qn97ed3z0g7hdry6kwbhbqlss6j72sap3zqjug6ezufm8pb2fd9eu26aeshhe3rtayvn505wm968wxpt1waml8g5kasgkfr2d4tlu17uz18ln6m0wdwzf5x76o8waebepvff7uetx9q7la6irfcjtb4',
                flowComponent: '6o1rwrugf51nml19kw7m3w6y5c2uhw09hrgv4q0mskbftdtr5k4epmxns7vv6jr5pf4nisic9mudpj65j8ej8jftodl21pjpvamwkhynak93zblfx6jggldpw05itlut8alg4b5gjwnls27j3rtle3b3zsh2ou8w',
                flowInterfaceName: 'rw1dzvnz59uht443cufxmz90du9tv6rh9rqoo907ehrngm6hhn1ojfpb3f87j1wadqlfe9tiwxlk7owhtk5k7ud8ctxqvag62b65tu7bhsz3n1weph4i24k0rm9yin6753b1imq60fy9tm9ggxx2hf18tv4mjdzs',
                flowInterfaceNamespace: 'aq4yeguislzsc68vehm9gsvk32buzuyvpdi8w71tdnzqjr5lzf6jixj8wckdibj1k4152e7yp4vbe472i6iuzlf1dyhvz7bp2kh2d5ilqk4tqstl08vumrdcv1tz5hvtp6j94hamfhm7ekqylinzu8lzfqt6465i',
                status: 'TO_BE_DELIVERED',
                detail: 'Est autem reiciendis occaecati nesciunt voluptatibus recusandae eligendi. Assumenda aut molestiae omnis reiciendis. Cupiditate sed blanditiis voluptas commodi qui a hic. Consectetur sint quasi et natus animi.',
                example: 'bx6wzznnda42vt5ti0dej8zle9p7fa1uob7re7ktb212ha30n8hn22vd50w7g02443tay43fi2y4i432k08dclfotucavbyg1wy2cok3kob462vkakvbzrlawyf36sefwz2zivhwr3pgwhft09xi96dkt1riml3q',
                startTimeAt: '2020-07-27 12:28:37',
                direction: 'OUTBOUND',
                errorCategory: 'xlst6nppqrfob840md7masx46r0xx6t6ubueuw79z1y8ib5cky6rtfkwc9h9vaxx32lv5rf4j8x5298yv4m06t3pu8d8q56p1nivxmrylnliiny6raeo2pldaarzzg8q817uuthmkdbtaazra3wojq8gzagnxrve',
                errorCode: '93w7ezuvew8extemqfserk22zy6uehexafliuxc83c9h4sowg3',
                errorLabel: 578008,
                node: 6960648968,
                protocol: 'jnox87kb32nvl8uoqowi',
                qualityOfService: 'zqwq2bjh5zaa7ci7x6u0',
                receiverParty: 'lx1h35sbv20ji3cqv85y4m4t9jgf96lqsr6856jm78f9b193u6r470imve3lbl4ctxys3ap1nt66y37k8qzjkkluzr2mdq0wr8litcxh3lruejuy5k0ddru3rsc2tmu4kog363sq8wrknd0uut9soehn9rt4adu6',
                receiverComponent: '6jvfq3xo2kb1ke6ngxjic18hjkj801fhxdmne0rl5k47fy8pc1u9sj0j9bajjw5z6ugjnwxgosxasrqja3dyitpyvg527d2cmu799q6nni0w7qaae94pcjga1rkub2z2ob70lqy58wujdn340faryoaodi34870e',
                receiverInterface: '9sz4gl3qlzmcfuqe8ebc877j3e2w67t73zufefhlfcj6pjoxe44fmt19w69kmk7e5cnixvu62kgfi0d422k0qts3wkm6olsw7vdwu8cbozm6d5s4fa4qkpgs269g5783k5fsiyo42yrdqtxuwlk6g8bpzm06fdc2',
                receiverInterfaceNamespace: 'oon5mzli5r4iynxn5ss9np1ol8f22n1gko9lkbhigeh3bpnyqtzudulhdzil3xvuqipc67ah6t1n9lvo11fk2wv5c6yqc3cns9551bdqkpe7bms6b3hidkx41h8gvji5vzx23zgm5gq455lmum8d20pyarjdd38n',
                retries: 3656371186,
                size: 7110745168,
                timesFailed: 8998423481,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '6i6va439lfbjyr36dm2m305hjjlctkj8kytzuds413q58gtdj8',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'clodr7zuheo3sd03rvb5',
                scenario: 'qg27xuuwrf8h95ko7ducdix1xd6yy6qkm6xuat25vffu6czz9wsg1m1xiio4',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:15:38',
                executionMonitoringStartAt: '2020-07-27 11:46:24',
                executionMonitoringEndAt: '2020-07-27 06:18:19',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'lsvqqw0ha6pkozvnt5vr140cgnah8sayadrzlnsofsp5b6qh3tagyvxpuwferdgruxfqnmw2fw05gaj8r4pdolg8fr47fwd1z9bd82u4tky3rmerw6pkiaw983ltjpvz88fp8usvaa3g2yigymysmk1h4ycctzcv',
                flowComponent: 'puzyit7myit4a1d4jkbskfpbohhhghugh7wrt4fmlb1fj0m8w9xwlvdtuau3oaw4r8dlyhcqzokhkaqgm0xo920t72x1fr0cba8tqa3iqkb7c9o2onkrslk9s294vngh96gat4jg0twcvainpezurzti75hsztix',
                flowInterfaceName: 'eg77a7pv7vjjyqu1kqp1ihk1p0h0vlroo4nk2ct8jpu789x2jsuqtmjjrhv3diaobmzsev2a9hhs8m4t53c1zu5ffuzixm6erqkizwf8bjvb3n9pzs7opns1pgau8lcp71tt1e3vvrp6eun11rg5d666z9nj7k4t',
                flowInterfaceNamespace: '9ci8uj7bfw24jqpxpvf53ph69lr1wbqs6fttk7na2c972pc6f0bdl5kp3xustgmlfhfmn41ckeqfa2p756jjyhb3sz9r58dn2kj1ekus28fycf947l0byghy3p6xvuhyv0sz2fwh1nykx4qi1vul64bohtoczvfo',
                status: 'DELIVERING',
                detail: 'Dolore possimus voluptatibus. Rerum incidunt doloribus sunt. Et suscipit nam sunt officiis. Odit quod repellendus quo iure.',
                example: '2lvyf12r7plgkjvpzk17etoio3wv641od0hirqpch66qd9a40a9xb3x2gne4sp4tkcq6f0v82dlepghtt1es9euetz6tmg8f7itr6du9ujm6p8c3eigx7ver7ilhrdzce2v9wvs6glhzss8bjbqytk5e5sceov2q',
                startTimeAt: '2020-07-27 18:51:17',
                direction: 'OUTBOUND',
                errorCategory: 'ik95ii38b5fkcjix4zew0n3vgczbhv6pdyuhm8agtr166lx2dkqs0ek2kyxvb80jlh9w73k2wzy8fym1te7vhrucxz55kskyk4qyyutbbsm7rwz181azdzqbg48sktdj3hr4gc6xpcvhudu14hnxrjsbc8uavusx',
                errorCode: 'ut90m114xonni37tq0lbj9q8vxmgciwyns5ufgrz9yrm0fevwz',
                errorLabel: 672534,
                node: 5186088210,
                protocol: '5fdgobtbyy737a76qam9',
                qualityOfService: 'chispcjeb1i9pqt056s7',
                receiverParty: 'w23ycx52b2f6f5q87xss76v953pqii9zctare0268o91ftunrq4cv7octcfdkwhsoit7y9x2v0r3t5vg4spyl2fkridln8xgvecu53x3g1nufkp5ucfpt6p94fjd6vv876fqe1dey9b70wl2034o8k9uwu06kh7y',
                receiverComponent: '98vlasmpd52bztcaomss3fo5uh78vpnyehu5v6kkpr6shl3g9cvygyqnlzh9h13z9oymze8qugbzlllvrep8lo5ahe2fb3cuybeam7tvzg51fu00hjxabzzwumn3xiv7kjvmsichj7sso7hsa5yva2f0qedkjikh',
                receiverInterface: '93mg5x3wqhn1j4je9k17deg0gnjpd2aijd0s4k6us0ndf09fqxbhb5kgja8c5z4wnlo3j0oibcce9dopnm0mx1bz6rn1lnljin37eywslcrn6wqloxhnh1djnggtqqx1xadxfcq87pn93lk2os8wsb5ujmybrnqk',
                receiverInterfaceNamespace: 'm5aua70v5kzqdm0r0d1gsx5fxxonaf3m929yufxh8kdgmvhu8r0is00g46v7besyr5g1v9uk3tc9z1njsobhykroemnv1o0pcnskvby3zw1n7h9pb4xgj0gdq5xcr15d77ivhkec1obzos9y752p9otlk9v2rv0x',
                retries: 4189658647,
                size: 3660557910,
                timesFailed: 8501996744,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'zrvxx9pmaccblkim98n79if0zmgys7grcp3rs6a9tftxi3onlf',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ownmm47pwnelz3ou3n9o',
                scenario: 'ibhkd2ngkt238jgv8tpfowzkebthg0bh9aywdwovt2sh5de6kbx4qfg4foht',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:30:12',
                executionMonitoringStartAt: '2020-07-27 07:06:25',
                executionMonitoringEndAt: '2020-07-27 23:15:50',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'qrlpo37nad2qrpalt6kc3oscxd46fo41rh5zbscifjmkclzymfuynpdg81biaqnc4354ni7qu9hmyhg27y6ikmp60wci930gkiuzrivm99lz60abxitxrizz3po7va5l7k1oeqc53acfftwybi4ym0wtbn2dwa5v',
                flowComponent: 'qcr0x1juvqwehzjakwih8cyer1l1eu73etx68fspupg1xh8x3i6t315yc46hk61raczmij4ul75pbg0xcb2mc7dgt4omgl0aabfrkwg01kence9lq9jz80mv5uhgs7ze5gxfgtqj28mw1i3hvocnlp8gioa1pu9a',
                flowInterfaceName: 'cuaxwkxdti2aokb38f3jb4dk8clp5opehl0g6dyz3gjsz0gftmkz6brpdrti1r075j87yeowc21vuytgcfe8766dw59s2obwqey3uet5g6nialhg2qqle8jlmvl8557qfmoz6qj4ixlg3gx8qj6iqbuyr3yt8l1j',
                flowInterfaceNamespace: 'bx3kggy0j7bkm4qz50ut7b0ckge06qzk5gkxdv7ipkpyjjysaov238nnbx1faglezgt8d6wlonx7a9j6la8ayn7iq9evo1peinolh3gktsutvbammwurqmyoo1hqq7jjfwrvwduju9i355gphca7pkx9ptoj70wh',
                status: 'ERROR',
                detail: 'Aut magnam laborum repellat dolores eveniet praesentium quas. Quo atque quo totam tempore id. Et ipsam occaecati omnis.',
                example: 'lbwa57m8xw9elt3dowx0z4dgxl2m13rpo9n12owyfbnk2vfssorw36ijj054sjhmueqksv1jtk55wqklcqcr8u9718y8qua2qocl94qms2a8y5qzjed5eaz5pnjx7a8cn8lshawg3p17e21o856y6cwbwey8io2a',
                startTimeAt: '2020-07-27 12:30:05',
                direction: 'INBOUND',
                errorCategory: '54gqb21v8oxnktd8ioxl832ua2z1zgurbammmafmnqq1hejnfjghvi6reznjv5dwos4tn9x8s2fxzsvab14idxo4pkgllgjn7kdviycbya8qivxnyic6dga4lsj5xwfsdpqqv96gb8xa6d6x2koxsb3x6cn1ukas',
                errorCode: '9of3quyms29fszhi39ss3bxjd048oa68el7dpy26uk7u9jzf6d',
                errorLabel: 325700,
                node: 4302058810,
                protocol: 'bpla2xuavz56sl434i6m',
                qualityOfService: 'gmfvwa1yjmpfmmbp69ry',
                receiverParty: 'cvzhjicuhemf9u0omglcfdnrq2le9wsg2ifrjpwi39sxvcgmx2zy1gv0xo50ajqaaoa6370kajuwbbf6c3zcw0b1ils9g2qb8yctj7pvwuhwhc18zzxgf087ynjsyamx9c0gb0pub0mxvokcobmp88g41vzribxj',
                receiverComponent: '52fan0kz7xpx1989iy2jwj5becnbrdio5l2ws9hn3rgca94rer5lu4sw3jn59svy9e3zp5d0qe32i4rh81ugfrkjqo8z5e3mb5q1ou0awl1zp3rxg2sjuzjqi3a45mm5i7d0qs4bdqyhtz4m2tphpm8gypfwnj7j',
                receiverInterface: 'n04bsj9o3jfj97othgwy16amvosp9xm4x76rzdvok7idftxaueih2op4yfn4dcvxjweas460xf869r54g37v717qbq50c9toxqg6u4q7lynsuo4rbocdaqhaekrr6ahewhdu7r3w9owyqz6n8q7c59d6qdv75n4m',
                receiverInterfaceNamespace: 'hixp17645r9ge02d4onciynejmfp44bu6om9xt308og2jzt1yogli3fjr91srh7o3bcfey1hrdo0s3abyl8swgrx0h8pt5m9m00n22w80j7fcu765oy45840hltfxc0g4j51gqaeeksg695f73hl6aru2pkeicpg',
                retries: 4024376591,
                size: 1118316567,
                timesFailed: 7228417519,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'jm2wxtiay4y8isaeoeyximi47uujlhoxe4v0fx92kt4mg1ng00',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'nf28c3y3adg0buzlt2bd',
                scenario: 'mn2u7r98egheura45lu03r8njuenl5j8pck4r5nqcuvrhwh1g57182pxyk2n',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: null,
                executionExecutedAt: '2020-07-27 22:01:40',
                executionMonitoringStartAt: '2020-07-27 09:17:21',
                executionMonitoringEndAt: '2020-07-27 21:38:58',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '9rhe7u19v21oisw6cko8bbftuutpc9gym4xjvr9aw6hcrukkcn8pus1xrft92i8supb1qz2qmgj1hxmy8o4x8gyxd4ku8ooztil9nus1g9b56rpjiwco4xak0qhxn22kupw7fwgg8o9ueu9gibfhodb8mgw7fvk4',
                flowComponent: 'cqpcu9szb0yh760wjqu3vij99r6znjtjojum7vwrj04fsw54h9etegz524bnvts7rkbk0563n3hgtgnfmbpp7dx3508qyfhdimj7ojep98b03h6bph4drabm2ru0tut5wwye2mazfd54l6870frvne7xxxnnwwhk',
                flowInterfaceName: '12urzmhke020cvd1juxc2vinoop7weio5r4enyhlbn5e9r28ycbj32low9xdcwq59adyg31i5jj33npp4r5hpu6x1j8cn5mbapjj1i2rafhr5u1twrrihvjpt0phj6j836xb9e5utgwghm73049997otf23u5x5a',
                flowInterfaceNamespace: 'cnyaemd5m8wy62t6gwi7960d13o9qxijzx2ih8ctejbpl9pudnmf8rdw8gwpo4pyom7ebpwjjq3ddjsrbh9y1vqbskbo7i9zfzv1wzswoos0rkz3o6nyqme8yswauaz156uusvow4rhmdol50byfap6vma2o1vyq',
                status: 'HOLDING',
                detail: 'Ab ullam facilis harum tenetur. Id et corporis blanditiis doloribus non dolorum ipsa veniam. Et odit perferendis dolore debitis soluta deserunt. Accusamus expedita odit voluptates pariatur repellat voluptatem. Totam sed exercitationem sint sit error debitis ipsa voluptates dignissimos. Deserunt eum aperiam modi ut sint.',
                example: '0rkv7new2ckuno4lz88y1bgcwr2lcxyyb9ychrn7wf5fu8e4uetltlfsj2jn1wxzgofrm95xyay70wqvammsqld1cpnih3pcew6q13o4i5i3xxp6wcfmegztg0g5yer941u2k1r2zm7ofvwxs4ypek5dim25wmvj',
                startTimeAt: '2020-07-27 03:19:37',
                direction: 'INBOUND',
                errorCategory: 'ak7wafrytupz60mrl1cu77mmv6dt9gjl92g5uagqw6txl0qkivpl8lak7osarrgaaw97xu3ba5zhctamnvhhahg0w7mo2eod1ywm468uyj0h1qy3r962q9oztchfk10023bd5wbf8l0i52bgequlaj8smp5d15b9',
                errorCode: '8e4vdi1ezc63di3yor6w9y15ksshoryn3o0fyybxy0b8zk6t90',
                errorLabel: 646024,
                node: 6951355466,
                protocol: 'f0y7i3apqwlyef0lhbzh',
                qualityOfService: 'tq1xvtpcimaojlw88krt',
                receiverParty: 'no3jg8iultkj27zdbc2g2f4t8qjwzfuf035uaicttbpd4w9634pwlvtyzlikujzfvcs36jlk5axhpfi2m15ysq1ys4imdimmb3fvoxbj5huendo13rbd8jhnw4nhpqd58b3i61b18of4gtq77s1seztzlzqf1o63',
                receiverComponent: 'ammzlyb5w4x3zh3epnokvq4jx1m4jy6i60aagrq9ompp3p73lbgq8pertaa547scvumicgh9iz2lbqzqxaujj96pjzwfswr1omq9eh9nymoq9xnffllmrqw2ks9b1i8vboh5chmqpp8lgyrmowwy4cacbol9bijy',
                receiverInterface: 'on5v19m289o7k4f2hku7mn3i9mwknrcdzq3secql6cn3iyd3t3ujwrx5wuvx7bkac377n62u0m3dxw0jpshg1yyccvv03nxv8kgd68eh4e4y6u5u42r5x3l4s5mufa360ry436ba9ou1itzbkjuhv3p8xzz5gybi',
                receiverInterfaceNamespace: '43rf4h7vqs013xbsv8y8sbd9lj1juy4vnbtk4z95cegas90cpb9cnkjblbuc531tm5pnjo6ffjcg13z6lt670a86kjfxskj7unnpeegj47oq5r4a54a14ddfq8j5iv4ote32bwx68f4jl8xdpilh8l4ect98lj0u',
                retries: 6709764847,
                size: 6710231656,
                timesFailed: 1901929366,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'cv1uf5bxbrw3pezsugikdaf0stg1jgfvstgn7uyhegpzzlb30l',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'x32ds70247fzuf0g22oa',
                scenario: 'i7af5kzpf2zbmbkx5dapbl592q9eca7vcljp031ucjl4gxoefrwzvyqb81bj',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                
                executionExecutedAt: '2020-07-27 23:59:10',
                executionMonitoringStartAt: '2020-07-27 17:28:15',
                executionMonitoringEndAt: '2020-07-27 01:57:17',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'auvdcfq1jj64i5z7plqx5gn9uqoguvubr47x5cc43d7ifxxfl7zietltw32gk4nv1spbolivw1w4u1u9nfv9uuo5buz7bymynkh37cz6hifxxag3x1y9xjos8v7ks90nniw645b3ml6w4k4d8tny1fnz1lth7ppc',
                flowComponent: 'czamgqhcyp55fun0l1xjdt03ut5oj66nbxnihzeir91wtvszmr5fuu55u9y0lg3j8955086ykuaxucqfhfm9eb7awuv7b4ixlz7pq93f381ilitkf66nngq4sihnszu4kjw6rer5fwljw09vn1yhlwlfbd99djgl',
                flowInterfaceName: 'vamfpgrc78kfwkaowlg38d5rvsts1jna7uqod21iqgd8b8dhz9m0pa627o8ijhfzhun7tm2si5vre679yc959qf2u1lc45wymiq1by6vi36kbea30llo4iw3552975sp7lf1k1clnxq02cvd2et9exx2js9yodvm',
                flowInterfaceNamespace: 'nsbggdxzucc6j3y2x1lgtvfnaqb667s8m8r31mfrmcqirsplsl4msubevjvjy08sajjv3uo4s119sm74r7t0n0tvmznf2rcld7sg88652eixep0phuke70l0wkfifqltmkktlyauvrm70builyajwe2cgb0flbm9',
                status: 'DELIVERING',
                detail: 'Omnis voluptas asperiores sunt dicta. Qui et quis minima voluptas numquam consequatur ea corrupti consectetur. Aut soluta aut expedita alias.',
                example: '5rno1auqt9qz8g5e5bf20hm4qwk70bm3r8a48a7kuk1avafyw2wyhiojeg22tgk8pc8px8wdae1u92u4p8t0a7igp3o13v90dh5k07ypwilk1da9fmita0il6iffmzfnid1y9vrx6rzm2sbz4tmibk40ayg3za2o',
                startTimeAt: '2020-07-27 04:57:41',
                direction: 'OUTBOUND',
                errorCategory: 't0ga81vzmn5d9trvij58j9zvdpvi99b4couo55w0epke6r4piv0dg1o1sa7iau97mp0ypm8q2ph1r6j62nyl8m1mmktc8iax7ax9yq8xe18wnx943olgbjkr9i2ehveswvqtgy8oamyt54oxgd862e4n5fzfw8x9',
                errorCode: 'mrgmzdyn7tr8vquvhhi3jy7l6skmui57urxcex5pvml6i7gikg',
                errorLabel: 843289,
                node: 5366161917,
                protocol: 's34lkd20d7bt15sbeb79',
                qualityOfService: 'xd2cfovkc3lzxitbptd7',
                receiverParty: 'o5cmzk9ojqeewrsmabg90l1cwl6ro6t9u63r7wd3cd0yqg8xf32p1w2t838t471lolkqe74b25x1wy8m8lxhx7jtgqwjrtx9wjc6wv0l913pz37abie3vot1kkbgprq1q4yfb3dr70h1hws4aqdc43k3j6zd5rlv',
                receiverComponent: '8efit2pknd76ziy9s28b01kqy7zkxcakkawkkn1drr05kdr3z76hn7owa4ejvel4deq1xkyakk696ap2p4l6kwgy60p3r74r33259393sdfavoboibo17t40iixpmm26huiw1jvncuzo5drdhbse204hellia8r3',
                receiverInterface: 'vi6bf5ceciipicbhmh57tmh0wsvxd35b3dokyvrznw5l2u7r1uzpc2uqt346m0vww4k8l3c0pcwsss5vko96w5iq6609k2a5wdkxsepu67554mo3hgv9hepbqba1ctwckiehxk518symjbh9a1g306ktg4hcdjgz',
                receiverInterfaceNamespace: 'p17576t2zkvkrnj4twjznneruotcpvjs6hjk9zvciqeia2icdx55uflfh6b2x7ekmlj2v87a5ij3604rlsdfwyyydx2bn3uswes32mzmu8nvuvi2ahp6pnimca8392g1i2d0wrnc59ws3djyg88br9kunmp486if',
                retries: 2992333691,
                size: 2882251378,
                timesFailed: 3953833476,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'vkwfxk4jklcaozmja2l08zysyrusy5rp4l8vlqi120gah1bvm3',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'qhwfz31yy39tzrmyed05',
                scenario: 'x30u2fhp9ezt7pgehumb4fcj5i8wpw50fqbgsvq8898j0zcekj5zt9szq7ly',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 20:18:11',
                executionMonitoringEndAt: '2020-07-27 05:04:31',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'ucqnorexdgpwrajxzlfn4xwfb3btr2rt0mbwfzg7wk8rcz2z2iiwo4qzsi0wso02othxhpv0v6d6sg9twhplz0ubjhpr3t5bnkh0p89vkhh8bw0f8xthl3dvhue8ysdodfxx9txwfssg3k4fm0vssln2td48e6l5',
                flowComponent: 'nhr17h23m6n3hjdlzui9si9u6nl4kvss3dpsn2qf2742x8sm4ldnsyrvrp1pmkzrz5powa7pgfnnowliqd9ku9jbwajcqbo4rj1zaa0fnvtbfvr76ilkh1vrl0pqwuzml5g6bj75m4w5rbtbo9hmctwe5pcv32nj',
                flowInterfaceName: '0v2v1hpw6a6afh2dxk71n7j9eghm5hwlnzu4zp8d2x7dnsgwtaq9ck5kqtntlfgo8lwg0xti250nskpmiu729ub4cv1iuftgvz33v9oshl3xf2g5478yumcsq2q4rscaaaqjgbyt19em4gtf69gd9xi3yquj2dqw',
                flowInterfaceNamespace: 'yva629spn2h0ki6x5xa02a26awghupbe2lygdylw3p7aide7bj67bhb142w8j1ia8przgxzculmae2c1p4miulngbcp2a4fbpovsr9wzync9zsaer5lfya21mps2iuyjg6ikq1h1cu97lrzkavqqduyntqt8naf9',
                status: 'ERROR',
                detail: 'Qui dicta adipisci cupiditate est aut et eos praesentium. Quo similique adipisci voluptate aut reiciendis est aut. Molestiae nostrum ut distinctio laborum temporibus ut excepturi quas dicta. Molestiae modi velit quam placeat occaecati blanditiis eligendi laudantium minima.',
                example: 'ejrsgfk490g5ekax53jj0mkfnheozh8zm6j9ud8cclqltnrybc9gzgdkmrisjvns7e12wkzp0b5kam3fyk1cd9xlk14j1k372p1j8d299p3uh366mj3jnesu3z6wzzhmxmsswer6wa7rhut2tl0q19a3qk6vn891',
                startTimeAt: '2020-07-27 15:31:31',
                direction: 'OUTBOUND',
                errorCategory: 'v2ch25pgzaeu67bc4911xhh691qffr5hbpgsujyzygte9iiqroip271q4zckblbmhq0jpnxjys4jj5w8qzbzbv984gdm5frqgdy8prwzwnfls3xtjk7su56pnkqogs2nfp8wpcetlkl4z158c73hmcswsojykqse',
                errorCode: '2jy0a5s8n75q9978fxaf4apr18oro941wrsp5ovfl8synnalns',
                errorLabel: 119885,
                node: 6920866227,
                protocol: '3e1fn4lrqq85wgbwi26g',
                qualityOfService: 'aboshf7t0lvnw8ujko76',
                receiverParty: 'egscaomyzdbztbvo1s7oit4lptjn4ykg8c9eq6lynij9yv6x4v8wpcrj40lafua7gpeqcsmwygh2zwyi5qlu05w77kr81ynxbgamnmp53uv2aoas2bqf0ukp6gckku4ruhktfkrota6g82m23ozqu0u2ni8ii9m9',
                receiverComponent: 'hnbp0w7xdsxxh7orvis6irr3oyqgkro1q2hp62bgryfm9uius68houdaqcxagbdtii3ghoqo522dq9ftgqg0hucs2cjh0l5mlzwae9fl0kz6vtj84ukxl8f6kc3zyw88yacvmv2k2kdmzfcf9z2gbkbooltjtt8q',
                receiverInterface: '1hik9uo883cqkdwtw8ust8kr3wg412axmd4w7wrdthdbk8mnqu5y5uwu6t763k835pk4xtvsw2wyqjrh6n3qco3vvljpz4uyb1ek1hdrwsy3x726nj0p8kf4w0685ocxptlpukb0hunsas74wgkvn93b4hnvo49i',
                receiverInterfaceNamespace: 'ajbkte2fsi9p5vnh5iq0op5r0vbmm1orqtfizb602tffostxi5c49xel40jb1l8swdeqbcqol7lrgubzv9f8srx7a9x102b1f6fa2tqlu2osh5nl2m18289qzmvov18lai6k6qphvmh83ce854zs7wzsai1dfdh4',
                retries: 4722892987,
                size: 2743562393,
                timesFailed: 2001430915,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'boouh8181l76dczexmcrbhd5avke75x8m8feugaj1g9qxf8l93',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'bsnxfxwwmk2qiv8a0xby',
                scenario: 'g9txtz71ijaoql4agtcyihvw97qrsw5zixdvop26ufochk99l1wuvi73iguf',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 19:53:11',
                executionMonitoringEndAt: '2020-07-27 07:18:31',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '1ioyrgxgipuosi6n1jq6hfetntqyv49i7a4n0ftxo67c1wn6lnikggjl48cv0hqpwmyg1tlbaivgfmkn0m1spof9v6j4o0zx65l0f1mzswzdeefpeh7dvwfgifdog8i0dvtc8iw7jnjg122vnhmcbjzd6f3p25fd',
                flowComponent: 'sn62h8rntzdr1nk9v2mlvev4v2i8t6tg93ama4va188zffeyevr5ke9pu1s7j94vtd5l15ecuobrverw5wonq1qohk99fpg5xtsswec6fv4yy22swyug0w6ntgql29hux6sw0seymerjy05v2eheo3fhfyvxaxf2',
                flowInterfaceName: 'bm91yayf8kq8qeb4i8jct1goc12rz53o4qe2ddx32mroha04ezhq8a42nppgn1ixaizx7ia2vwaqxujczw4xujiehrjxsgfqmfdjfrwlinq4o11fodue0vnqtoi1p9objsrtdrikaqefwd4akpk1atuixbtwxcyx',
                flowInterfaceNamespace: '3ywio8x0ii7r2n40wij5gh541bcf4mooyof2vva8f7bi31rhoalultjpindaphda1su9gnqdrkbr8hwpl1rsko1xmvkm6f1wo4q56m4fepwo5h1a8ggo86apvrnmhiudfbfw7k0pgr4umc8vti6yf6vs9q9ijyvs',
                status: 'CANCELLED',
                detail: 'Consectetur eaque numquam aut est voluptatem est ratione iste. Ea quo non consequatur est sit vitae totam ipsum. Enim omnis soluta.',
                example: 'f1vn9fypnod70fwmyojwbuibfunwtr20dofjmt3i0gegixgmktr2rvai163f9blp4x7m0ok5re4ls0bpjw58b436v4od71nobplmhy4knjpierk4rk2ohiyujsys16tt107o5cegoryw1me9qi0zla7bpki4j9cd',
                startTimeAt: '2020-07-27 08:10:20',
                direction: 'INBOUND',
                errorCategory: 'hlite8zzx83jsbk1g39328dsgunn2gob4ztnt0x8qqdksk0q9cxox7om4eu8ri1gkk3tiwg5uee94zcxwc1pinrobji1jyqzndetky9qyi8auhlmrj8qy8t7sddtkur92qmk1pwjn4ozocp3cwae6scwbortn5gf',
                errorCode: 'sohcw3ulimz696sw5mnh2djyx807xt7x8fj2i5smpjgq3g0edd',
                errorLabel: 902247,
                node: 7933861194,
                protocol: '1155h1qk1dq3b6qz0wlv',
                qualityOfService: 'cn89imbst3h7i5n7hfw2',
                receiverParty: '1fgxkncnl6432cr6jp0c05mr8bm975wg4xetx2dr6elzx7t02sgqp7atl3pqmu58x3lrtzhb253jtwq1xt6mvyfripu5o8fonp0xxylxqu2zmb7113sk8b84h6bjt358ysit8tabidjb6r0xgoqd1zilqxdnbbn5',
                receiverComponent: 'gueg9b3nn6qtalbygy3610eeigwpuq1svf7i4oownu5bex56zdg39ot1lw5a87ocar8x566h7j6lcrjvuij37f8c7vxdv30xcx6cfrzfwp7ryjtxqwmyulci4rlrfcq22uv79ofqqfs2fgwotz0sinz6ov220810',
                receiverInterface: 'car7skum6h53cn6z0hgj5e7jj4vldcs82js2fp33x5jnbbx7cynoq6cp7ja0740x4i0jiqnb0i2hzxxkrut4aqngyc4bdbje4gxj74grf7hdy1xsrlh0o6x1mw7jpfqqhrzoiv7gqso7bhglcv9mm1nj4kdcayw8',
                receiverInterfaceNamespace: 'vlu8xe5rjg6go6afovjm889d6rose6ancipl6e7zolvrhq0vll93dm4jpyymx2qi9nfkczqfqe20t676t0tbgup0us7qdif359jx24chcycjhu2vpenfuawxutywbtorhvxwgs054ukz7dq09y5ormj3mc8vxror',
                retries: 8739257681,
                size: 8348573331,
                timesFailed: 3909925743,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'mq2k5qlwak8vb664i1nlmf89busfukm3xq4ds0ljrmwn7f2d6c',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'lwsimwt4vgyrpnnr9gjl',
                scenario: 'dxuia3976ij1acxksi669c5hue6j9c4bismhay4qq2zcwz4muq8xu8uvpnyz',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:27:47',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 15:36:18',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'w45y5b0eqd6a7lio53slofn20xuvd9l28mro95naxemnn36fc8uteo0ekdzzrgagkt1n9pw6oji0158vxnh4b2u7nla433t4gosbqwro7lmt1moydge5pua64xv2waeih5ufrf8ww394hyf18bayxmp080pgq07k',
                flowComponent: 'fvhacr09k73j5wwy3dbvdweotvv4lfqh9zhtuvtlkxisxd6h1ruxk24lczj30pipga4p3vjxv96h3kxt4tmgld3jezm0c3sdjot4uftuth4pcn5xufteuwy1ow1ce8ra0669kt1ebwtvzcsshr4vpgf8xxayhmei',
                flowInterfaceName: 'ftlmk8uo06b2yabq7t1kfy729i040u7by9krqcx39raz1qaj0empzuw6fqf3dzvtawxev9o701kp1utc4knjkc38h8cdnwcrric3i6g5hc2tjyrpoleoybvl5i174u1nvjvgwrodrwbw1tamn2g8bibxmb1q5gvj',
                flowInterfaceNamespace: 'b65c2byy2j3r9fn014s7r5i0glwreth5ynxa8je60o92v6x0qymbknae1o39kvslap30z2wczodbapmdwewts81cr5rbch0tx0q0wnszp2smtb82bke0globrw8g67dh893uvcngpbdfjtetzdc4uwoeomesfbdx',
                status: 'DELIVERING',
                detail: 'Quibusdam unde non est voluptatem libero eligendi beatae. Fuga est voluptatem hic eaque molestias magnam. Dolores corrupti optio quasi ab eaque. Dolor ipsam autem ipsam voluptates quasi.',
                example: 'umtx74efnumn048ztomw8qklx0yl4pznewmbea01xxk8gcdhgb6c88bfbay7mga2pw3t4nmb3yajunr1nc51ft40augithym9bdgadr23ctebloszdoa7dec249dgceugpwbowl4pgv1mtovssi9oz46r67djmup',
                startTimeAt: '2020-07-27 12:39:20',
                direction: 'OUTBOUND',
                errorCategory: 'zsjnbgrh0x5xrih7vf09mt62n8pxk3ifipdpse5yj9xptzpzqx28439aeilw436tfcsa96i8hx8kbazfrzygyjbnzp0a8yl731q7m4i9kc3hdzr2n6u16lwn1v4sxmao2j1dssblpcengk652tjud6uyyphp1qea',
                errorCode: '1b2nnemrs65933mxmwlnfcuxomhzly7ssm1lvqxv9ue7xfe83p',
                errorLabel: 447600,
                node: 7538849708,
                protocol: 'dne81kdlzrvo5rptrba6',
                qualityOfService: 'wdldetg5prhm586s7deq',
                receiverParty: '9mbca8xf5oudfg4vlt5jqhzwuaz81lwe77rwwyk13hfky68s5wtexumq74lwyefksz1m970ry57itbp7o50tnq8cbb66te5p78d1spsel3ymwk431cgzq8cnk8r396qa39xiyxbzti8ydx38p0svacwbtaaluudt',
                receiverComponent: '6c2tfyc7o8z6f03poq2brnqh1338kevrekfhda76dfsr6t07c5u4byx6p11zjtouz1o3x6c6m8v4ikcdxauklbpp628uhbc9rw3qlwwo624366p2pnr345nunxpg9wslafdyaxj04rrn6hl3vicqs15r3lch4g6u',
                receiverInterface: '7owerock71ydbnuderlih3uu2xk11klrg7woyhijooadlg9b5nevibq7uhox35ohxcn8la8h7zkvtkwme0r9nwokux44pj1rvk7j4mvqvdx3w6ga6yqj9wtk7jlde9lc1r7edzar2w8af4ezp43hrsi08wf3sm85',
                receiverInterfaceNamespace: 'ya5g8c57smq9ou6r7joafe65nu2pb7y17bfpvw676vlg0uy4j4lo00rl9iu6r5qpb9c70zc4tg4lyacvthemxj5bj1igk4ulfs6k3jgf1i6oe5gy9ws2innu5jppddcsiw7f18tfuoi0855h3te8bsqpztdd7jgn',
                retries: 9620045974,
                size: 3792689219,
                timesFailed: 3833690435,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'qm00m1is3fjob4rlcaeny8wsq0dtb3z71up23gy3s2u2higu60',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'd4xjx3lukx58wr4lx2zd',
                scenario: '42y5180kf48eridkcy88pg21pzx5220v2jmhizhae1wumu39opgk9vcattvs',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:23:39',
                
                executionMonitoringEndAt: '2020-07-27 18:16:19',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'x82j3uacgfzmurhji9hs3eo6o8ztzluz2whj82tnr10s38hra9oy1c3s89vpfyuiu7e6ibdl02x8gji92ea0g81s6antrl1q93wqvh6xth5xbmlybkto9fd2w1erigyeo93uvrhbag3kaobjt0z02ziykvmc16ha',
                flowComponent: '3bgfxzyjdd92e3saz21j28x0lxwkcjdt5k51fd3ts0v8wmhuogalryt0hp9c88g8piqa3vonbphi8fe08a1ac4es3uygd9z9klkgvutkt7hlkr5vevzwlfqjuaksbsh035zqagy3aef6fj5euqyof3q1qasw9g4t',
                flowInterfaceName: 'mq2zqlrw0ut27le5rkc3q3r9q3jslsbge5n4e4ticelcwhruf3adce9muqhda0r1uo0pip1036rijfiv9bdyddcsldq0gftz8e27df2foimw06go8ze1rmxvg41wu81173z1wndrfmjhio8rbhtbwbxf19s3664p',
                flowInterfaceNamespace: 'xm55urshfisg03vk7epdpbpfft3yzhqkzsbmm9d7ho9prkhwf5eh75toyl6a0awxrex43x5to81xmihz60sohi07d33shgdaavb3u4iw4sl9qyis6nie4zxzwkmrbwwtbvrkwteqk5k7bjn7n3cxcb9w0xv6sleg',
                status: 'ERROR',
                detail: 'Quod asperiores vel dolor molestiae eum quae quasi tempora. Cupiditate molestiae eum rerum cumque quia possimus aut. Dolorem aspernatur placeat nesciunt aspernatur. Quod similique dicta.',
                example: 'kdlj4o3x0tiqbf301hrembdqdegrdi350xdjxnq7p209tit0vfiz4jdx1ygbl3fjgrqaym0dnala5d25412nzh41ew2v5d54v61cwk3jgn82f02qurvg38b5xpt69jlhjr9vv3drjfqgbd2tc4lk9e7ft0yonbmn',
                startTimeAt: '2020-07-27 22:58:59',
                direction: 'INBOUND',
                errorCategory: 'i19g174lirva041hqg25ocknc5qqym979ekgu8mpfsq3u4x7gbah3ou3ll94bo3nqv2k6movagzn1pd1zfhmamcs7byufgdg1zxpamwkfsa8csrhkesvtg9p0h4130rote9qhbi92yr3oh2dt0ekyt3bjnx816s2',
                errorCode: 'l3t2ohm4nyyrjmws7cea6ui4hyypz9fbwp218zq4l4k3fo126v',
                errorLabel: 316970,
                node: 8503411742,
                protocol: 'c5xndixhuhvaf7wz41k2',
                qualityOfService: '4udbqbl7gowxr1sjoqjf',
                receiverParty: 'nl583xh5p18umy8x6fmaeqkrs50tabe1dal5nilmobfvjbqplg5ioiqo1c3mx528m2mvrmprbidyentka9rr0s782fanfolvk3knaefds5zef5hra9cjsfxxuhcaamusv9qz1pfh23srieqd9ygvaqwbvcdabh2u',
                receiverComponent: 'my7oauj3r11s1stn6nt5vp4ajg5hqy88xnxxfeaz0qikor9mlgvb1ln8odzeu3zjnimjf7io1jqhb8wd64va1kua6p44zwbwvm60bfn5q46y89ioj6vmuaq6i9grhcccabkyettgkgq6rc1tm9upy440uijeewvy',
                receiverInterface: '7bcwmh7rhyasciar4ls1zmy19scw18aszxxdgqh60bges0d17gi4g1y0gjz6tron6eize2thhqfbfdvm4vx3j9p6azyv4e85pq3mmvktnncaxvbanu0b42s8eqz41uakm1ua33cl1ku3cnaapci6of91zaezyrf2',
                receiverInterfaceNamespace: '9i04jj3zkp9xxskwrj0g1qpgvi0gabdvvwatea44gvfqztin5u7rg0pkq86sf85j8pklkwonux5yku6trw8jl7qpmi430lwn6228axb2etvazvkn2vpu2ze6iuvpz7i2058ccxjp23sz98fbebzlfa0vks54tjew',
                retries: 5158677765,
                size: 6039826937,
                timesFailed: 4085944431,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'kr1s9nbw9hs1di0iyq3xs58qzeflzrgcinejsi662ji6vr16xh',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'fdcnqe8z293fqe45ojux',
                scenario: 'vg3myjeoqv7bz5pgjm6xkjc2su5tqmgsbronf9ic97vhotn3f48ngsct1ntn',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:25:22',
                executionMonitoringStartAt: '2020-07-27 03:46:53',
                executionMonitoringEndAt: null,
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'mwfheaxd488zjexcz9n72kakve8h0bipxojvj2u128rlrmmt9trencgc7l15v4uplmf80pxedgftivdhfsy4xzmtu0y6kixlud3gfbo6fd3yago0na7kcbql4v8rpzus35ju9ms04dz53e722dinqhvmvkhgx28o',
                flowComponent: 'xnud76vwv4ym3ai5idi79a48or74bw8buvc2l64q2zfan686s8hm02u34l2sqk2zy4ruyzidg7oo0mzegc9ktd7dnczd017qip6pz2x118j0drda0vwmbd59mbtd6dlv2eqhzogr34f8xu6tirknnaib9a5n5gcc',
                flowInterfaceName: 'njrbphyse4eryqtr5qo5sf774u2gckwd7jze1cr4fpgsgi60h0phqbmoit4uxv3yvvnhpcyy98b4enhq5w87q6vsvu69u1elxzhmg5g1fi5rhx225rnzeednhuixzpbujsa8ih6okyntqg82zz23iyhb502mgmuk',
                flowInterfaceNamespace: 'uk6sixgfd1e359cc8xn7ns24qdtm57rao7k9f6280g9we2h8zrhwnlxcqakiy21dcm5mdwu3t87f1c1besop437zk031ob312boz2qx90465e1d5kwvfa6xwd5gcm5947x5qjim58gdhgnvl7pt3uitp8maarh01',
                status: 'SUCCESS',
                detail: 'Nesciunt quasi et eos in nihil ducimus alias officia. Deleniti ut fugiat rerum maxime reprehenderit reprehenderit deserunt animi perspiciatis. Quis harum quia est occaecati voluptatem. Omnis qui a. Ratione eos vel est commodi.',
                example: '926y2vdkqpd5sv1l5jhz5nmxr95zfqpeh60bmypeegyzr0ymxggcus6ul3mwzd5s2niao9mjyym0w0h3y1msypgmcjw9s98x82fqc9ytahdky0oha88yv9u44dr44g3durlns0397lu5j8corow3jjh1m2a7998w',
                startTimeAt: '2020-07-27 19:02:23',
                direction: 'INBOUND',
                errorCategory: 'h8yemow1raumyaen58yqf9fga1qqnugglyxkny96iv1tt5d0n4jx2wa1mv7xwpe91o9hzwi3ye8fxz2c1h3fpqpy5aigkh7v4y4vfbsod1lcdb9rlkhyd31j10xjw6wk47zlsggln5ovnpox3b4zu6e4usrvdqs9',
                errorCode: 'hx89hjj3xlhpaiy06humdgq67088txyupkxm6tjpd2edxs6pus',
                errorLabel: 886572,
                node: 2840771871,
                protocol: 'dc4mjxzxcqfmlnkpo2bb',
                qualityOfService: '9k8r8bvbc950242guhtn',
                receiverParty: '990c315j5c9qxmut10t5c1t3dw9rkr1709thcudljzae2hcgj3fgb3mpqjypyv0frxknjc95peeqbf8k72hu5wqxw9duo8a48wj25g10idzk283w8ee4clztj7ccx3u8s9z3jlbli691tcacy0lqanhqkayomogk',
                receiverComponent: 'vnkx6vfr4l0lnxdi03sj2hdjnf5vy42ta8124n7etz7k7lbqwvhmo5pt263ic4ti4cabcn9cd26n431d9nsc2is07qquyrpxa8wdvq8wg30k7f4bi9kguujy1z3jvul0vyevjo62jl3tqadyf0m1vzvwazpahcbv',
                receiverInterface: 'jtd4hy0eay68u0hdl1fg45x5sclhp9dhmw4oxzzzjqbbyxdd7erj5qfpiabvyogdx10gcha2ee9gpg0y1kgu9hpw2jmb6m6gb2q89m8sju2c0g0dnvc3rtx1qy48j76bafgt56o42hpi0qt72pn3gbprrq5wc8ro',
                receiverInterfaceNamespace: 'zfrt2ugwck7jrldaztokrgb9pc0mbnl1xnzl8ez27w6gqih6xftrdm53y3av1crqempygzpsv4lrq2c2whxx6pf2qmwjtl7qgobrawh7qkzrbhrfg8j42u87vmbk3vpk4bnhjgeak9d9uh30avz3erh4x58zt6pa',
                retries: 3741627078,
                size: 2892882429,
                timesFailed: 6916057029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 't0uhcsw4c4rf93jsx34mmosbgcnaxynfs2qep7hhk50a3w3xml',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'k67rpyqu7yxjxl94poy7',
                scenario: 'g1e7q4xedys0m6171npqy8rovsyaeonjg2dacrypgt2hxkyuxwc1q1lk31f2',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:53:09',
                executionMonitoringStartAt: '2020-07-27 17:27:54',
                
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'nqsfr7r0iw31e1ms7msiw8qs4auuyvfsyr3wbdznt6bv0lqjbondbeboh3ch3t8jxbaz14geix41abb66ob7potq68f7i60y1lxq4dqu4c7tc595heflc7n9185wnzuoqmxdxx2kzr1f7x9n04el5v7rh6ff3y8d',
                flowComponent: '73zjk8wi3fgi7y1wf11rvu059w2svjxde5m8958iaoq8pwa5eq6xm06li2o4bxlxp98bc56lcs78cho1c49edgbh61floz3xk4lo2shuzrk71isbe6p6qry9dzfzt66b0ou7a3s8spa4td4rxpd2hdy2r6jn4z24',
                flowInterfaceName: 'gwavdbm7ssp0vqdfz4lv3iq59f2g3buc59qm1jmmi8w8ot3xjung7dnb32qvbm8ww6pgenujt4cfcgfmmtbe60xdflwk55jrkmwm61llkk03m1ni5nri1etc3be40onbxrgf4ahsoqme2xq4fscyuacbon2m0ijf',
                flowInterfaceNamespace: 'cmciod8oy7yc7x4xejjxzr31k288d6ybdxf3wznxdeddj16q3xvemrbx9a7iyk0nlrjif27y90un41233oywg3r1mva47nhy9lvrazfubjea9dlydo7ywxpjb1s8jertbrmyfnmdrbhqb251kzrc9jw7wxntahcx',
                status: 'SUCCESS',
                detail: 'Ipsa error perspiciatis unde fuga soluta sed est voluptas. Atque architecto deleniti. Deleniti et consequatur. Error voluptatem quas aut beatae omnis et exercitationem est. Consequatur illum facere deleniti laborum corporis quaerat quia omnis praesentium. Est sed non ea quo aut eius sed.',
                example: 'xw20fl0tiwuzxaj6aflmqeiq7xsy5miw5byfyfcptz84q52ewu894fuwf11v5go5qvbgz2xt69lgiz7dqkbi7w7zmjmkuki6svn3nyhkq7e5wa6mkfrgqdajf1eh4332a1m7ohrp3rq5ag2chrphypy5fg34jphb',
                startTimeAt: '2020-07-27 15:37:12',
                direction: 'INBOUND',
                errorCategory: 'o8wptnmgzds665pip00trxt6k1cgsjh63boc8wb7qvk2286jtykit3yqlm1nuw6hiauena0ae52ygmv91ugd72lvvlbfri7l3jt05tefm97qmhlnkrpa7kdqrf42qx7t79sju30apy41nyop6y7086c9f981uzpq',
                errorCode: 'o4bhyoi9h2mx7kecqf2fc2vdmfkldkcrbvn184eroropoy9poz',
                errorLabel: 601583,
                node: 4823882360,
                protocol: 'pjo9yv0niqb8tbvyheq4',
                qualityOfService: 'crr9xwazd13nei8mrrh0',
                receiverParty: 'gyzev9zaudqrv4cb9ombqbuvb7kibnjlj2od6crv9a7jefe8zdj3v8c72f8ebjjkjnnhd1ohfhbsyocb2j3i4s2qc86jn2kmdi5n8g9dm509m4cxzi7s5jmv5fvk3c75epti0rh77hnn1fiu4m37o6mkolalcgkz',
                receiverComponent: '6tnluso4yl0i0aclfokvhjkgnwyz8qqiocsu9siaifau1vzpm7g6s3qlj4ysg3758x8l2bbg84z0cw1s62fd5h3ybd2h1by8dzpcmnemlmpeyp9rj4k75st37bqvre1wom8cz4kx8yjg9d5gco9jk1rgqafgp894',
                receiverInterface: 'gvp2jsh1jkwy29rnzw43ahnd6pgemtymaiqyzhfefymr5qwl6wj0p8avmiv9l7ice468aepqtxwgeo086tji65ewq36spm6dxz9hojtqn6w8ao38mb5wdkaxq2mhz0ujdmba627vrioqj9bq38zi18uj91rgnuy2',
                receiverInterfaceNamespace: '5wr6ocx86e52puj2hnafaowuukrl54xfpa9whao531iuo3wphdoglh3hlxsb65hfq1ozq14qyodkatk25z77ywrro3u43qup42lzsn4e4e0x7wplbn6xv0pwn9ert7ztoadk74nd4tfltx9abw90byn6mrl92bzo',
                retries: 3099886257,
                size: 4041502722,
                timesFailed: 9984070439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'x0n2vge8yk4q9mbltqyvjq7q2h9d27msj4evnbavj7sckn4piz',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 't8srcwdx5c6jrkafm1ra',
                scenario: 'jjoms9xem3s1nngdfd69zfcyae6un14onr050acn8dqaf0ljpdtw4a3cgjbv',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:28:22',
                executionMonitoringStartAt: '2020-07-27 04:08:14',
                executionMonitoringEndAt: '2020-07-27 10:02:14',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '2xpxfz6g97yvdgwxkpw388nhnslvq1pyr4tg8pttafu2s9lex2pmbra1oenb3kuhetwe4m7inqgls10cm4pe5cpmb1l7b5u9a2g9xcqlicnh5kh780zgoq3i51r97ddo7y8j3swu8ad1wn3omgoreje0abe9tukd',
                flowComponent: null,
                flowInterfaceName: 'z2t6hfbp8bp8hcvpif8kkydug94zsxdpi1hfwhcwac0se6b9wwl8uh5lmpi4arrp53c5wai295zpskcmkzjdlobwd0n40cco0j8wiyj5d3y2n1g8sxwf7y52ces4l8omptkxdtf4k1knkybw8gmb2ly0ygec2ira',
                flowInterfaceNamespace: '8rcpqdirq566lsbyo4sp53b69dpc01ppa29twyaym4daqv7jsjlt6eq65tadxj3sz5maccf9axuuurjn12cdb4nxwkesxiskeck2t2q3ynklxs2d0chmrs6soun7hqt3ixg450bwmokxg8dojdw1s79sw1q1yupu',
                status: 'SUCCESS',
                detail: 'Cupiditate occaecati eveniet qui hic dolor reprehenderit qui. Quis ratione exercitationem voluptatem aut praesentium earum unde. Asperiores eaque nulla asperiores quisquam. Harum et ea minus sed hic itaque quaerat tenetur. Et non vel velit beatae possimus culpa molestias omnis modi.',
                example: 'o9ehahyoackex7hsmiorfn2c0jl7gqpcy8pg9qqb8edqf2a2adeez8k2mn7xyuy2lx7qvm0wjq1ngusfsqycisflcxz37llnjgz9l0ut8tmdxxpb39z59oizcdjl0b16su2kzrgk7ngo0496tbnr0yf2fk277wb1',
                startTimeAt: '2020-07-27 11:29:24',
                direction: 'INBOUND',
                errorCategory: 'ae5at78057y83kgso6vgnk7iq5f81kbi8hbhaxyno08jip5cdlaudy23vrexju7b7igtapdo1h4ywv56q1ln503s7iov8id2abpyeyp55ntk8vbn0122e2j99km8spetwz65m2x9sqy4djkqcb0p5ohnsr5qzk5n',
                errorCode: 'i108njvldqnp6ce09k1rbm4jy8ekj3mrkaeg79a7bevdgd89ev',
                errorLabel: 878764,
                node: 5552851020,
                protocol: 'hybkfacoy6r2fcxb7h3v',
                qualityOfService: 'aunutfd437iel1ftf2bo',
                receiverParty: '3uhaqk4rs1hhqnitsdab32uo6zqrabvw9b9fhc8zb0k1bucb6x9f9rnzt6d1qlqo84ilrjobxmumpnbke9pczjinqd0i0dvt4w1ykhglaj3p1jf4j58pzyrf6fu302v408ymfnnurcuzaxmfqaf0bj4b3yyabr2f',
                receiverComponent: '5diwz6juvveimq7m13hh6e5gecanvwu7sdm736zl01yg928x9i3kr6so9f7wnmmt6bbuvz0nfhaxf7mkyg2ub23brn82cuflgvm0h0h7ke88v3ovf0y7i86sf5vyho2c1dn8ua40pddtzaeub1sx0k62un5ddfoq',
                receiverInterface: 'nsi47gxtuxwp20xt989ths8hol3xrzpc59yozppdvsh87mu8yxx4cp75t1v26um7lo0vuhjhom3jvaipwd9s4avlj43embibe1v06hvgy42ko1wpzc3q697n8w1yudzz1cl3nssztx35p8xdewueq15ot7ebkt4z',
                receiverInterfaceNamespace: '49rhjqn7n0c8exyq74p9eiu107byq1j8pb9vpjtqcdvhakj8k2j6dbdot338mgs0j380papjv5a6fewud5iaer5zzivinonkr3tz7t8cn71sc7e3a0rm90ug62l9omcwot4l66x886fw2o2nryza77jwx4pbbcqk',
                retries: 4158969546,
                size: 9602466771,
                timesFailed: 9594608084,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'ewis66onwtqw2495y0gu7naf92lmyqra5remg1rzwfedit5wui',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'dtq8f3xxetk6f700gf8f',
                scenario: '8kb7oyx35axfjdctfguo9furz4jrk7j70caufcsdrnj1ygtqs0up8s5xll32',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:41:24',
                executionMonitoringStartAt: '2020-07-27 14:14:05',
                executionMonitoringEndAt: '2020-07-27 13:17:53',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '5vep19ci70iueibhvyngsg3qpsle3khw0e0q7766xw1tgirlrkv8uqytu3wgg8642ztx91ucy1xohm89kw8h74xg8v6wx24r8uar4j5b43087ijhyf2m04ysc97payj5voec0de48dg2km84cjfxgdeqse3av8x3',
                
                flowInterfaceName: 'dj4hz7dv5u1y95e9uuy265nu7t5ep3478foniwcco7bouo5i78ymweqoaxy58bpbpuc4pjwx0zlcfs1dkgdpmapzvcf2mo9cu1fpimr83utws908bvgnz8wto03s8c9km56nvbndr8fy7xmbzugrm8h1voyyxk0a',
                flowInterfaceNamespace: 'cfmfekrac7nhz1ikzljn2cw20d0kezknxyha819w2rpw6ilbfmueu3cv5scip1yhrkyxze49x2666z6v3wdckijwtcz28z8xf2m5mb0qwk2mu5k4e2yn0zqf8raaz8rw4c9qratvooxrhtcywbelrdqjgbslqne9',
                status: 'WAITING',
                detail: 'At qui ducimus ut laudantium ea consequatur recusandae. Deleniti velit consectetur explicabo. Est animi id repudiandae hic soluta ipsa vero. Iste eaque aspernatur. Neque quisquam et excepturi modi asperiores cumque quam. Laudantium voluptate et voluptas perspiciatis consequuntur vel commodi atque harum.',
                example: 'afv4hgzaft8r0clpakbv5xpp3u2xyod3wdkkbeb4sihlpk0xrr0p6a1wyo59x4zsyhkxj2sqlusrkkrcvzv24d18m0pbnu07rh3ouk9hp2dmqylth19rvuuplj97qj0942a5juh2mvsktw0zu732r6w6uil3do0m',
                startTimeAt: '2020-07-27 22:39:56',
                direction: 'INBOUND',
                errorCategory: 'taxz6x2mekxycyh4uq3notwtdkh7xi9sxvw2z1ptkcu3v9f41vd2jl7o73sccqxykw1tolgquitj7q6y2i49w12z5zmhlhb6v92f3kapmy5bnte0sb2h22alyaoyrzbnztfo63cz00t8zqhrsq8g4v99kddiq6ml',
                errorCode: 'zwcifwenopsgsbx6xb3ni7i7b4zk87gbdc90595c1lx3l53rir',
                errorLabel: 955742,
                node: 9138449028,
                protocol: 'q46nie4ba6sm984p5tgh',
                qualityOfService: 'a1g4l1fxn5el4n13vwbe',
                receiverParty: 'lwsvnnqb47z69bw36pee3jxj9c7wvvmwz8vmgnt30tspjjtum3us8xlump8yw6tfy9vcy4lwbezvwc9nulmvuxudl08td8g3l2nv7nx9v4iu0oufzd21njzciuu9cv4cpia2kgi9zaywv89m9oev2h6htr4yy3fc',
                receiverComponent: 'm7xdtcbqwzlo5d3endw04exw30w7srohlleko34unt9gaxvwjna74270n54s0qnhck5rlx8q24iht4zyt0dncm1mndszafjsw6kp02g54wx4l7233uyty03y1zyg5wprexv6cy2k0fxkpb92r5xqlzzrc9ubehe1',
                receiverInterface: 'hizywsq27d0h94xjypf6tbtiebke8dw47u7al1jc0v2bkrxebi5k9aqatfsh2056q1ui4yoebksbn6zsvmwtnyueq03m8ka1vfumuwq3i5qfdc35u99b76iohipfu29ib78z58a0nxshzrn2tgc5h5o7y18ui0y4',
                receiverInterfaceNamespace: 'sfgjfjgdxid72d9gp8ptcoqb9v7ah4ifis0v890t2vo66ofykjfosbzbjjs550vp2mrxd9q7u3o3ja2cxaj7zsh7eu90jiplfy0tmd9hlo05diq2nxhp1ggd6s5ugrfxllhxq358xe81ohapfmztmpy745fetut4',
                retries: 4418137922,
                size: 2371683438,
                timesFailed: 5559475066,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'qw3uot26nxwy72gyzkizpw6vzp50qma656zpymob8bmlggwj1n',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'wn87k1m0f2ecun4v58ju',
                scenario: 'n828bmz067nl3x25yhvr9hmcd18z3ya2o4tf4iyf97bplwcu449390e7bccl',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:29:11',
                executionMonitoringStartAt: '2020-07-28 00:14:10',
                executionMonitoringEndAt: '2020-07-27 23:18:12',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 's43x9sw09acb56vapdpyxbpgy8z5vk3fi3czerxs614bpmxp7lgn41noshmjrhxqnmfn7fco42bzjy3lihywxpjr3zqxif69tgbbbiw7q31glzba3t2kf10p5m0ajtyzv5716hh7fshc4hcbzrax3csc6uhz8c1j',
                flowComponent: '38gv4tw21rhcjy3qstejyjw90frv7x7ecnd32rk53thfmr433iufi9s5zi4u4113h7riywk8rodpa5jx150vynizy80gohcxatv8qja3kdvusvdf4o4eiz3hqvzbf1b352pefofcsdee92dcos6gxhzpae9azgir',
                flowInterfaceName: null,
                flowInterfaceNamespace: '22nyikns8xfa9t3ck4ree4trtopcbvujgvszujgi7m0bozucjmmhu2ioqjkw5xkippoixtuheir6ov67bjyqd575he4qx3i5r3oh0ft1upscehq4ic8ytcmak5gbtp2zam86mp9ulz0cu72id2yayp4d81o3fifu',
                status: 'DELIVERING',
                detail: 'Magni adipisci fugit id magni sapiente. Quidem ea quam dolor placeat non. Non inventore praesentium error dolorum ut fuga voluptatum aperiam tempore.',
                example: 'j69zrpwc133nv0h6c0wjysylbx4ygs93etlo4grgrkkatdkad210f5a6rudt098w7cftvizlyjg89rai8wqdcfyt547b1zs10ngyve5oql28ewhyuy7hkf5ybflc8w0ro1dvmf63syxs89an67k0yhdb6p0tn13t',
                startTimeAt: '2020-07-27 05:28:16',
                direction: 'OUTBOUND',
                errorCategory: 'l15e7c1uwsi2gqglkn718buuyn52bwms2pmalad0vck69fhxat0zohxq2te7r1v19as8bgpa0p5lh085ed76ynk1771gwac0gq7866gkxq5hyf3segnrkmcanzbuu7trzflufuuy49ymlio6ihqfgndsx6hnn3iu',
                errorCode: '1m8hqugjsu2iqivcjhyvjeqw3su8i8kgx2w9nk145xjna23in2',
                errorLabel: 121518,
                node: 7030766989,
                protocol: 'eoa5z5cu74ttry14a8ml',
                qualityOfService: 'hvfgzdoj7mj7mf7xz5u9',
                receiverParty: 'b86rx31253c7y7wpk76v57gdc1o7xhpfgtvg8ftnrxb9lyrev6bn2qog1j1n8cpzar5i7swlw1kmec6ojc1r89ksqchj1q71ws6wy250l6wo3rrznz5skskqatsulak7da4y8zmh4tpr9bgu1dg8qdh5xsu6cilr',
                receiverComponent: 'mz0hfl31sfzop63l7mv2svpo2prh3o2xgcryyl5uzomtby57rmvjvc0v1qiit5zeaaadnrvgdx5c1j7vj7mt6ymxvkitfrzcdeoblwc9quu0iesz05qlskx64t3igsqemv1syhl62yc9htdud2zbr5l64a86upc9',
                receiverInterface: 'cq3vfhmcqsrczduj5uc7dmykzpjv66cauzrb0cr8cxc83x6170yhme74disrshtld8ighippnq1hfjj9nj4xxenfmzps1qaqcm8smd1j8lbjjl2pyramberkfc1xsi8cf3ks3pxvvue0g5as8ep2amkk9am8jbt1',
                receiverInterfaceNamespace: 'z8tdrwjhkcd7klja8vavj58q2jn7vkel5oqncmysgvi61h61rfymp4iks0dqhg0tna7hoaqt4em6lfle3ay3zsw9v57zxkhalcerqtjmtbr7vf7lzro10ehcd19u856l71irb2mq8ucot4lgsh7om7x25kz62o45',
                retries: 9188074164,
                size: 6722460619,
                timesFailed: 8806632186,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'dwwu77pzx61j4xkfozkcz3lq6naf888q2z3mwo64v2hzu1gtvs',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'l64s608c1dtgxiu2z4zq',
                scenario: '5qtsebsu5x5dqpg4knuwyyqi5pk48b4yk1483kzk4nc8n16tu086wr95zw2q',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:50:39',
                executionMonitoringStartAt: '2020-07-27 12:00:26',
                executionMonitoringEndAt: '2020-07-27 18:26:53',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'kjacp4okuiokw09b1dsh2n9eiivdswq828b32a0y6vzinsdro3c2ayfxehyy8gztdufzyu21n7yk0oga83gywsri4qv1x2ene0o8zhcdj8hwrt4mm21i881n5xtcn7fk9eks2mor2mq6mfxtlrd6kxzo1p6lvgnn',
                flowComponent: 'wl6tirxk5xf3fcsgkuqvaphsvn2dta6aspiojx5efx1fqbk0v7vzb263m87hjjk88r407h46znfiaoonexkp35s11dnlva7bg2axvain58o657yt4wg4afb3uurt3874e3fd9grl1dysreosb003mq60k0hxdq82',
                
                flowInterfaceNamespace: 'tve6q27cdx19dd7boolwb75eijkxyb4mutcdh0vnepbadcwf4sqr61a3zocwb07iehtmjiy0jvwausqfdyyzaa7zxj9b3zlcnau95y186mrezo7ebzzq7fkgj35u01glf44slfof6lup8t9dttqcwjjlit834nwi',
                status: 'ERROR',
                detail: 'Doloremque fuga est odio non sed provident aut. Molestiae odio aut blanditiis natus consequuntur maiores et. Vel aut sunt voluptatem magnam mollitia.',
                example: '8evh1ke6hc9mwb8ez5w31fdqccrg8t3wqso3mwhprn8jxrwy1qd8qkdru46k9qqz1ol04wy9chbeclswiho4mxj38jrn2cpjkb5ldxmdi85p8xlgqxf81p4ns7gk2is5jqzpdhr6zxg1ajbq9w637vax67sypo3a',
                startTimeAt: '2020-07-27 08:15:49',
                direction: 'OUTBOUND',
                errorCategory: '9663gk5cafo6oczlzfy2qpbmpxnw633gip2ei707huslp35vis0apyqgm9iwxksz535tpxeqffd00zmgun3su5t53psinyzrnk5ql51gbdp5joujagmfnb24g69vjmegsap76xw4qbkrlr5s81xs8wypb4f4kpo8',
                errorCode: 'bz80z5k7xe1rttbi40l0qtb7kyk1pwionuxfqapu1s65oks92w',
                errorLabel: 513063,
                node: 5017027201,
                protocol: 'vwdamaddmk5dgkfv7uim',
                qualityOfService: 'lk5hfxm7tzohbhx5y98g',
                receiverParty: '3efzs9zsjqfdosey9uyylknngpomzvxpu98p6wn6i97txaf6yg5bqkqo9tkrnmplrfv7sxcvdtzd1lhhi75x7yx6m8vwwb9ltweue97w0u5xurw7f3iov072lhzl8y2cdwxlj4cys56lxa56165g26zzf1lme5k4',
                receiverComponent: 'gmf745cwfnisns9a1wcg72u38mk6f9hae8a7tjshzyh3zcy3q5v2b2328xi4bbucqbkave27b4dpl1kwo3r9p5ue6u1exae9767vdwqc7ngduwyhp0iez8cf031e7aqnp7r7bnfbwtpfnoyux7a8vt6rtohsls96',
                receiverInterface: 'b8inhxo3klgtk07d36kbdyh88bqe0eehl2jf8f3789013gb1s4lnwfpffvogvlvat96utrs0ygphy1et3nev9qcgtvt8f97u6gsenz7u4b0rl34wooxbj11a4r3pyhky6xl3k4tgmust14hw4f138ef7v06n45xr',
                receiverInterfaceNamespace: '2zln5rizvliroe0j5zzkgmnbl8qiikjqeh31qepjerdb3y3asc9c81tm4skc9u6n30pi8gpb1qrk1bjjrmgu1qg7migmr1iztdpfyxgr3g87oo4vtpwyg69qt2x9f3p2x0ddjmh97sn4fla2wdziytpq7ssbnd6k',
                retries: 9960200284,
                size: 7224212189,
                timesFailed: 3618430399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '5z03g5ec8kdl9g5ig12u6vzo05o53g0nmegynq5flf1r8gmhet',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '5ab4c1ke8tiqxructqjp',
                scenario: 'qrym661fozneg4e5qvcr5q1gtx60fq7xs8je5i29xztlkbh14g40h1u1iluw',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:05:03',
                executionMonitoringStartAt: '2020-07-27 14:40:58',
                executionMonitoringEndAt: '2020-07-27 17:46:53',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'n7q1qokr9x7f4xfa3528giavsmwum87tr5vozm0sk5yh3jmg5nzzdo0hu01ua46lcd9zyncsb4tg2yuai1mwtr83q6q91if3r4dh1suwcyybdynzw5jxm6benmaebpntu3fgki6c9b9kpc0aq6mft94398vlmpsr',
                flowComponent: 'k6q54rvii1e9gp7rwdh0c3ivqmxdtnm04fmszifxcprodx3udf70ilrxbaoryh2jhhgageg4pkwgev6tkpyt5qmbnfwkvdqefkfkiqrmuptzur313jyo04bdz2ky9s6ukv0zkb52covdk7c4n2rq351zlr66c8ec',
                flowInterfaceName: 'o03g5am4bms24a7p7xz8mgjeg0ydrmog5a8g9f1u457rbtput99imw27lenu32dsunpab5bcz65p6vdtsyd0o1zs3080rk0rziufvc6e8240ltrlwn0q97lbpj9em3xpcmfroh7rtgimjbzfon6e5o5x6vde7uui',
                flowInterfaceNamespace: null,
                status: 'ERROR',
                detail: 'Voluptatem aperiam officiis dicta incidunt voluptatibus. Optio cum quis aut et ad eum facilis ex. Fugiat rerum sapiente sit eveniet sapiente asperiores. Nobis ut et earum minima nemo quae tenetur.',
                example: '0v3ru469odv6m7yt3u9ucho02wog0c2znftzt6krzyp3eeo1l4jsia8vqntxlmqkjhwlptqu13jri26j2mpnjckjn9am4hsgv1yjf0pzfzis2khnivui4s31qla6bs0vvbyptosd1mfr4glu1weyobw68mf6zboc',
                startTimeAt: '2020-07-27 13:47:15',
                direction: 'INBOUND',
                errorCategory: '9izung4c16qd3i7n6vijwxf47orri6xv7ntsm2eq70r6o3n8if514th4cpb954dsfq4ytpdhn5zn1ev3duie594hwdimrm2sbygpbwhq4kgro2k0ocllteag7eowsiqlaccjqxmq9brxno17t70n7hbgfmm08x33',
                errorCode: 't41vz04bf6rwq4vfx5zkv4dg0a907xf639360w5duoumlc8l8e',
                errorLabel: 848179,
                node: 4236192909,
                protocol: '7zayc3n4q4xp2a9pzjsu',
                qualityOfService: 'zc143kiabpa7zpicj7cp',
                receiverParty: 'hcawh5gmgg7ahymyjr4s097215xtdbn8s3ziya6nm823snkr34z4mjqs1tj4yqgxzzb5fnxabh0qruagz07fplqrsrjcjem5v7a8jleas5i0rkmv5nrmbedak5a5f3cuesj8t0ze0h6hsyw93ro9tnf4z3kapf9h',
                receiverComponent: 'leuv6h5dihdr0t5hi9awrvv57o9if57cualxsacgfkii72c83syneb7129zriwzzyerbx59s99w50mgfe0axb1aahug40y9ldblrptwamcvpy3rfniw6z9w9ru6kgv7u65s0hku157eeysl73mv7q6txyu60oeq5',
                receiverInterface: 'piveci1yy4rho6bocso2drfrdx5w0msfvkl8od4965anvglmx3elsd16rv3jp2a0sjxokkb0rhcc1toa4hm3yn97bbcd7mwxc2w8k5bu59a0ffls8z9vpi07kqp38om59kyamujbg0ka3dagweowlk69khsbopz1',
                receiverInterfaceNamespace: 'wa875dilf4tngfeposa7i4x5qbpy1gge4276ee2jflcidgilniahytpz27ogrsd8jz7xc9fxdlom0cxytgtm6ko31youtxg2bzn4rozl6outga4ujo7qnwk33sc34p4i9eqpw9lp4stz3rhl2ghhjzmj7mfxmnq5',
                retries: 2283713467,
                size: 3922193948,
                timesFailed: 8442563148,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'xwornu6em6eg2kxkhedpum0qhz29o579evvjrp6p4c1cn5t9sf',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'zh4ou5eh4u55fjlmpj9p',
                scenario: 'ut9kmehim0if9fa1si3ucsedvcc8i62tqn38r0ztcrkdgfc0xltxxohqis2d',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:42:22',
                executionMonitoringStartAt: '2020-07-27 09:01:16',
                executionMonitoringEndAt: '2020-07-27 08:59:58',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'h84fvxqzhf0x1q0r6s4t0ymle0ihzodn1ih9k7lwz0chq1072f9rk6dcwzjou2e1abr1027cqr8x8gkbo04okn23hzt48erubzj780fzcjstqvcvwm4uadmonfrhg53trtjf30p66v3jrp45o7x10ldrdgi3d605',
                flowComponent: '4bo283j930lh086o8nqts29al54in8ipq6op40hj1ras0ko0ej1r8ndgc08e53b0t82e7h8p3fdal7jyntp2tdk5nzujty2r7qlvwt43busb991ji97yg79v9u1pc1adovhq2576aqjsdctqugykrg9nqv5st712',
                flowInterfaceName: 'ymiiiqpf34zhqwe9urbi3986vc8j1i724b2txkgyzs9xlx9c68ht7sr3trir9ij24qruwof6v2ttfkcedbng27lhga8026mx2qplodth2dpfr3h4s10arf3dji0w66uybuiluzomgq7iwd4x5co6kevj27xkt3vk',
                
                status: 'CANCELLED',
                detail: 'Eaque esse amet ducimus itaque dolorem aperiam recusandae. Voluptatum unde modi adipisci accusamus cumque est exercitationem sint. Consequuntur id omnis et nihil blanditiis. Amet sint magnam temporibus. Excepturi quod mollitia eaque laborum voluptatem ea eius.',
                example: 'ojj7iw9vsco8ugf2s80mn54jmban5bmu66qae1nbrbq652t8z5py1bhg8ingh6ked4ad8qa07j5nyu3w59o1j6a28x4xc5fblgcw41uqn0rxaskgu3dxgcqudzvnefkdgh8ya995e3l89a801f3cw9dje4gunxk0',
                startTimeAt: '2020-07-27 18:07:34',
                direction: 'INBOUND',
                errorCategory: '3jmo1ls31jbber7h2dyo27jkpvyfwbiomwux74nbdgjworks99963uwv7qx563yga4u0iscybulm5iljahzs2901h7bhet5e5k9ef3m8m33h7gmc0b5lpb0qqvekfnpgbp6i68wvi3blty0pjkpifwhutpsranj4',
                errorCode: 'wgoyurkvtsos775ce8ovjq4obonkjknl3y0m3esm8db02k4x8r',
                errorLabel: 117407,
                node: 2164274429,
                protocol: 'f47qf2u6uhjq3jx06use',
                qualityOfService: '6r0414rizmkv36dxmbhh',
                receiverParty: 'ymrr2tduezmht9i5tr1avoy4balml99b9zbifsb0mwcdvx9xrcfzz1byni07skr094ftqn7eonuqg5kaa47fj0i5zcwckget68jhpx5ujmqrclstdz7wrgu8ih65yy5wnbfkv3d2fag9gpoovrx70n4je8be5esb',
                receiverComponent: 'dyaz2cgwr8o8si6b20ecbfxask9pr719jq280mdqud3d4y9tnhytzrlwki2wzlh7u83ru70gulxup1tix12wm0jg7jecdr3uyrjsjo5osxdbz01szfw4ayxxb4l3roedp0jxcucx3hduq6ri9ivlip3gudm5jwzq',
                receiverInterface: 'tp2itcatxheqolcky5vej2ek4ivin3dhsu6xneyf255kgdayuplqxgzlawb2u9rm6y7ns5igefqngsykn31b69anpugztgtibatcw0q2a3jbqw4dkv5j53lahz1l71kmgh1hvtjz67o7x5jyvy833mkhiw2f54hb',
                receiverInterfaceNamespace: 'syivm962qmqi6smch3446lqhif7rto0ukfgc5vs2aeraskpv12nxggsm7t2oma54g8fzyriiay5fxh0ja8jbejl2xqenspeav1l8ei0vi2xu5kqxcntwleybcbmux73ar4mpzeaftsdwbjl5vw426l3hrb3lzs5z',
                retries: 2632143545,
                size: 9426562893,
                timesFailed: 8461002203,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '80f7oryaeh846geet33hsz108i5ptrkoepv6s35xlwyxlz56kp',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'dyj3q3yb68jz9wv5idk4',
                scenario: 'xhmu3m62jfv76nbcrllk7nuj8zcu4inkc68h00w41ei6ik85ei5qvy34a6ja',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:54:48',
                executionMonitoringStartAt: '2020-07-27 05:41:15',
                executionMonitoringEndAt: '2020-07-27 21:54:03',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'hitw8xqerbsxcjiznp0cejlqrqjzpns7slhuba3auhahbttvw0p1zswus3hfjwoa05p5c78f8s8j7elfvrppb11q9fwdz8lvdt07nt0wb7uqnlbmmmix8y9uwch334jhvxl3w2aoyqyxjji001uxy6x2d0hbifau',
                flowComponent: '4s8mr2xl5oupgsh29uxvo35757olaw3yi50odnk0fhnebzlfo56v9446hznq48he8v7p606qw7lpethc7rb23b7gunonx1h6pj41yshexude4wtdadgut2rmkvqknuo3l2o49xl1aov1azlvb8o3eicqx33p5f2n',
                flowInterfaceName: 'wjwwa6p4yyyw92gkd1kj25cu79k7vrerpn8vauzua8dt4y6y0wvy647xoxkrfjwj6p2baz6o8na1p5y1t3kwfm8oy0nbf18352xlura100ze9v97cw8rhqk7xy8zyct9x5j47h1x7vry64fzgk9wg9iw4lo5dg8y',
                flowInterfaceNamespace: 'rcrika3lg0x4ahgd641ac9zzrk453hpua5vhpn9l5tkk3w0e50j367ogat2pwieyw88cz1rjrvbzk4ao1iozgcamp7bvkf6pdhrcrugjzneecfl23lj20skop1u9tvwxuzt522ohzylqzbqqkawshkkebtk7bs4j',
                status: null,
                detail: 'Fugiat eaque quos corporis fugit veritatis. Harum sed quia quia. Natus non et. Excepturi quia dicta dolores rerum. Ratione non rerum natus laudantium vero accusamus quam. Laudantium omnis suscipit ducimus.',
                example: 'mgdif4x9f43kixinmwu404ljbgc31t7rg5fbtnidpxa9z2hx45hkur989puv94o877vlzennneidns640os6se25namxco4hjlyrqgudyju1naa4u34b2jlppsudphrtwu3cpipe7ukj5llweh4tukiwoh9rwo4o',
                startTimeAt: '2020-07-27 06:57:24',
                direction: 'OUTBOUND',
                errorCategory: 'ob4zzalv5hd4a4cf300fx2uas03sxu50js94kyj9tyqpqc9f9lhezesptn272508h8uf812vovoz1fjwnrukshc8ef7gfgo58tx4spb8n8g78yxu2ivndwlarxagodtrd0hq1vpwup1eqqm1ppyksd39mlom68u2',
                errorCode: 'cao19lsi6rx2u5be20hl6x65u25oxs5qqc5iu23skj6b49lb8m',
                errorLabel: 150610,
                node: 1113898751,
                protocol: '27sbo7ejyehk3yhha3ti',
                qualityOfService: 'dg91jkixg1u4mte82222',
                receiverParty: 'emhjyuyjw85ddoxtko3w6rszpimj8xoyky3u5z6au5sarvcr1ujz1rgiu94mq6uontr8ixoeyfh4ewser7sfwrmzeys7mvzg4iakvh131qpp9ooppo0nknfv4m13gbky0ddn4ljb7rb0jtbsxrhontmprq1ks5pd',
                receiverComponent: 'e93ucbm0em7zwd1iafax600odsfcdnxo66m4jlhwsqnlfwfu2mkg5s3zf0e9c9i8lpsxe62m8f62q7ksoar4j0h9299jnn6aosuw9fpsqy6cocgqbe4ulr36gog1kgqct5qaqml7a8ujovtlnv1cv4rjxqgr6pfj',
                receiverInterface: 'b2bz9hfdaphl9hxutwe06nnvtihs045r9cz8gz18nalzxvyx7hmtz9kan07wb3u3loqxyy7bn1dpn26bwa4y6uu159s5ohpi3vhspgg26z9iegqo80jnt86aesng8rk4gjx9i9o3txjgrkz26tir8ymtu1k437ev',
                receiverInterfaceNamespace: '8ggg8b41aggv0xznf1feq0oq5gsw1w0ukzqlp9wy3qu0nxje1ncf7g9yfrc71q10cfncd2x7rwdjhn3nq93r6k8slnliidbe9vy8gad40nj0dqen6n22817c0efaunz96grty2aes1tokt14czyon16zgoi2265n',
                retries: 6624140161,
                size: 4241460059,
                timesFailed: 6900329174,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'ec2kyay42pc62sbp6z5pie60i6g42n55m6mhq9zgtp5v1dvb5d',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '5y6wvcty4w1025sb2hmb',
                scenario: 'eddx1m2kwl6wukv2vom7q71t4ggutz1s51x4lprbtxi0o7z3fer1rp3dyqqj',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:24:42',
                executionMonitoringStartAt: '2020-07-27 21:58:45',
                executionMonitoringEndAt: '2020-07-27 06:29:28',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '4xt1z9j14t1rumnq915sc5u0n6mxjl65uip5hkmr4ci2g8n3ocoqxpwup1z2ecvc6re42e18y93y3ni2bqzqllpyhjj6gsjprts6eypf7y9nlr7gxkez51tx5zuwi3ej07rodcnwcxk0ox8pf72humoovq050aho',
                flowComponent: '62twg6hw31yyn1novfy4fctwyx0vgcz8syzfcrvp6h3cxcnj8rjq67bwruoko5lf58z7a8co9w8or8tj3e623yqjm6a30psny0puhhxk535tupy8i4fbej8f5z14roa241uvmyw70u1f3s7ym21dszb1cs13qveh',
                flowInterfaceName: '1cmz1ittcmajpwy72yskaoexxz1122pswf1tztgpkujc2mqsupdt9mds61va7razo5kkl2tj1us5ibk5ibn8amp0tkmatpoefis55f71dn9n2gts50rd2x22nlmu6gjj0zv0jb3nmts5u16fqmhm2m2o0qlk5qvh',
                flowInterfaceNamespace: 'jm64ktmg3ra7h9bgtmj4o5yb24t78hnzdqwaid917ehupzo8hffjkr8ibv9nhhx6efnffvpzvh4yrm63yzq5kitl4ndylnymeqql65kkljuopwsp4des5xx4ps4ef8lc67op447mof5g3h0aujoawjkd6ckav0sj',
                
                detail: 'Est deserunt eaque sunt. Vero possimus neque odio sint aliquid eos enim. Ut voluptatem aut in sit voluptas commodi culpa. Quo tempora voluptatem aut quas est eos voluptas aut tempore.',
                example: 'y1t34j3agz68y8y54q6wuz9o4lmg3fnifzokm1a5t36p1l8sax79nzyvurelkq3hfuy58i0ds6hgjpxarcioufnts5mraywjlym1m621mr2us1aqvd2t1pyssbqy6tppnlasiw4pdh0gtgljipcqrixtr9aq5ymt',
                startTimeAt: '2020-07-27 07:35:56',
                direction: 'OUTBOUND',
                errorCategory: 'bgey87cxw15n265nfbfwldeyir95cs37mtde0rhpjikxqjmjyogm72q1xhk94vejow0q4vizv65t8so4wegsray4ewsnkbq6srw9958e81hoszpuf05qi4tdrgsboo9h0gvii6abbcpzu52ir2gp2yuwgy0ieqax',
                errorCode: '5yfg4yfucrqo3mjvjjrtk22zhytmutdgvajj437gibw7lb0386',
                errorLabel: 880824,
                node: 1833152499,
                protocol: 'nv0i4un1skzyx8taxcgo',
                qualityOfService: '6ajkzpyf42zq2bz1cupz',
                receiverParty: '0bh9ic7kx9z9fo2pdhaibzvqtpnbvl9nilgvjo2cbsczpvpy4iqu8ikn1tffam95stvpmxkkofy80xrdj7a6flsjpnha7qqahfbeyc7ogtkzqhta782ep0pp6up8osyd2q64pi0kmaa7yl0jl3swwwdvr6n7t8ot',
                receiverComponent: '48gq9bti5shengjnv83ap8gz5wfdnul6csmqyud8zj29qg340l5xbx058ftvznafsv6w9hmx3xs8dklsoruyrrwkzrggzm5kmdvsd82fphyclkyzo903qv7kf2i8iw2y4juegvh7uyzzv6if8f4solbqyvklp8z0',
                receiverInterface: 'u4l20r2aelu628ffifs1pbxo0test2y02i00wu6gw4o6rx8cz0pq4bwdyh36535dkhzbmc2pehtpev1a3i4v5yrfhi133uh9nhgkhhlw4zkde5buoidb71hy7378foqgtoq6cy294q8sxxnno7376bdbp09xppgn',
                receiverInterfaceNamespace: 'uxb99c170p2a2kyjs0t3qvsg3re9ik74libb8l11qojcyqg55r2j5tf8g11pjpglrfolggsqaw1gijfbk5p61raqs288a0sk7yxc3d4j1kgozh1ny7x0t9hpqvglt5421w46y77q5244592jjijp1scax0nko6ww',
                retries: 6808291890,
                size: 9100833771,
                timesFailed: 7069370255,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'iubrgdwfwnmyzi71e7vyl81w50tq6l03bnrxevbohm19tyzh1f',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'tj2wyv4m01xzlxeitrln',
                scenario: 'jteodr07wi61nmqqozauakml4vwpdpkkmgh1ttkeugdvi5e1glded8vzu165',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:23:51',
                executionMonitoringStartAt: '2020-07-27 21:15:38',
                executionMonitoringEndAt: '2020-07-27 20:19:55',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'gttjj11oak6faqh3147wo61n08lkdyezis5v0zab9cv4b2ud44qrqlg278xzofje2z9sfq8kjc2h8ac0dupebekrij5owgwvfxvomxq752voapxnxwrdwzrqkwv212az1518kj9xjxwzebsszi54i1rwt8u1bvxx',
                flowComponent: '2o6ej7cawtg50r9s7y3f34ds3ym2p9bvhh5u46zd8ypvk7bqpm0oldhro62c5jjfofx8r475v89eutwxf4r0rlns1r6mu8m3hhu5rls6ug26fg1aoppf3pib4grfouk7dm0syrre4pobn5maqrx0u29eoj660a0e',
                flowInterfaceName: 'p6rmzyubjflbqz62tdz5948hgtdo7uaazzt78bkhxt4nenufavo74s0q6zp7csq9sneayi8dnlzfjly0otpy2shtrmf3sn0jkwz57jomff1mfw8psgek3gvtgurnv4esjwo5dcnuw68ja2y503anysztevb3ocsa',
                flowInterfaceNamespace: '8byrlyqfsgvwtdg9a5lwooqzjf63qswrcxhkhfqeyfa81d6g1uuf8j0w0r9bx2syissqpjch3k0pkjpc7iztsptorrtw1x1vep3vasjl8zf6sxy0mhpika383cmbxza2njhuihpdv9fnm7ybp19w9yig2m5tll97',
                status: 'ERROR',
                detail: 'Numquam illum a. Repudiandae iste esse. Quibusdam natus nihil quo optio reiciendis minima nemo.',
                example: 'bpzn1ds3nnihouswq6ryac4lqkgt85f1zi78n5nmbn24wut5nhz820yocublgratjo4he8thsqg3ako26n6z8bjj7uu8fu3fau2qiomznze0ljqsfgcncx0rwlsfdas3086yzz0xq01vv8i27jpkcxbhnx0jtztu',
                startTimeAt: '2020-07-27 18:05:41',
                direction: null,
                errorCategory: 'y1yse2xu6epds80eomt7stgb35gn8o97uta5vyyc3wylrn976a271rpa3tpuwof0r87o2rit5wf0yizfrn26lw1viufzwcbql0fch342v27ugqc6do0l3hjxc37xejj7sjupyj8ws8g1lrjjtgjddufsolszalqn',
                errorCode: '3g6j9iheogg1g9osykq6k56swk3bo6ktgua131ip28lj4eav61',
                errorLabel: 890748,
                node: 3977033683,
                protocol: '091azgscttzngojq4065',
                qualityOfService: '6z5aoxd80ko1fskgzjjq',
                receiverParty: 'f8fo4z76pn7xrdwwi1x59wyx2qzwdneomqt51ksvcwlcrnt0ghc3qpqrfx3ih0cfnunh4e82vzv7oy8mx29xzv75nyqzui2kc6z8xgoxsnyesz1geakpwurzjorvxmh37116rrqkq14s5unata3xubn3yqcn3llj',
                receiverComponent: 'yvzmdmqopn1s8xm90lk14pov1e1ax823nfm99c036cii3nqzzgtjg6tav4g290zxuv12p38g1vnbl6p8vtut86d5jy43uz214eeddc3yygkbtf7to88g8e3lwnqn0kawd2vnq61fs02erhha3mzdtaiq4k2luno3',
                receiverInterface: 'g9ipisggxvb9a3m4nv6faj71n3jmdq00j1l0y671v455l67hc72mn49y42i7jrs15h830pgvmi2l6em5kejhfuumkm2mu1axnwfpypkrhxdyf2yvb5h6z1crkqhw7iu68qo4clwbqs3iq7dkhs5rr0jccbn6tara',
                receiverInterfaceNamespace: 'ul752x248pk0g8a53kaiqehtprhos4cne29mqfngaclkhvf9gq6j2bwvgeyx2msf1bfhsp2qj93vokx58nbf99yahuzcmx252jyymu5htg5f5xdf1v1n86dd5uhvbsihymqazdkel6rvwqlb28a7fgwo10ls87m1',
                retries: 1581103419,
                size: 4710373950,
                timesFailed: 6894787171,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '8v4dhys8t0nlbfi6az0olrz46mofoj0qtqs0zzwgdcr1508ktx',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '7gur8hla0sxkzqv2m67b',
                scenario: 'zn7jqxz7p0nwlooi8rxsmi28ty76x39whchj6phiry2h7n290ldcxzh9m2t7',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:51:57',
                executionMonitoringStartAt: '2020-07-27 15:53:15',
                executionMonitoringEndAt: '2020-07-27 06:33:01',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '4tngxuuehel8qklghsnov3a5vospk1lkm5pfck1xvtp7h821w0letrtazb4ow223h355xwr0z6vp493bejo1ay5d98lcbc350oyz7qt2y2ptz8zjfu595lx703on9y5tcrqealikchs5ilnoju9gciiggmy2h9xd',
                flowComponent: 'b6dj8gsga6kwl5rbigj0a3xcelwib12gkeoaiwn7sn7nlhlododdf1p0bi3quhhazngfkcbsr7apei0fsu9icvncsapxg52utklk1updrec5z4vp4s4pk50trr14jrgg90kjszfqpty2vtmv28y817qdhzz5jocm',
                flowInterfaceName: 'bdivi6j4p34d8qfivvopzudalg7ftzvx8fs97fxunlwyl09wdygz347ox7u2xmgbyfrlx6icem6duyn06mkawz52p2edae10zdnficcoyjsly9hihmzozzfqx50lfss5bhiwes5kgtoleeru0qk0ar389npwmqk6',
                flowInterfaceNamespace: '1x1yvmqp3h5x19so9klxt6pap01geepnj0zbvxiq1anmjom463tkfd4d2s87zc997277hlbzzc7gzk3qjvcdri7d7iqd3o8x0xtc5lacqtal8ckybtb5poudijlddv2dvbp20ke7h8x84ldqdk92dofuzd9rzuah',
                status: 'TO_BE_DELIVERED',
                detail: 'Et iure sint voluptatem rem voluptatem voluptatem. At ab facere ea fugit. Culpa a sed.',
                example: 'nyecx44fcylkp1yy1gzv89hmavmyas3u4x1vjdo058lzcui9qhllov9nsmh69mrhch3p8wnvs2aa25ilwh2dbedxzxau29p6l5p5pkh36a6ayq3ibpd0u7rjouh8uvgvcneti8snkc7mpfe7rmuq2gufigf3q5d1',
                startTimeAt: '2020-07-27 19:20:06',
                
                errorCategory: '8i6hlsvid2kq4tgmajbl91osi97ebwk46htrp06nouazdmiehfvmf3vb49496rdxjxzwhmr98gma10cq7xeeu035efm4fhvkom081ihrai273aomzt24thnki688xaxmn0kk8bi90djzejwnj22wbxlmk3newh66',
                errorCode: 'xt3x3vm1bzoqkau1de8ieuyi4ki7uu82y6ojxwwqvt48mllss6',
                errorLabel: 252778,
                node: 7565739852,
                protocol: 'psa9r4yc91nh2ye64qsz',
                qualityOfService: '92yo7zcpvj926yf1y38f',
                receiverParty: '5586hsk9cje5qls32sx0fgqtlcahlkpag2atypfgkpeh6dx2976sq4ibv1kh1ptkf4f6zmnf72x4qeq9v4t7a8z9tj1rzts1d0mvw041qj06gd6d0xiuf2uppdc8mutiblb1a438dzdlz841lfdro22ln1ya6l19',
                receiverComponent: 'ko7a523fbuqucoz48cowpe8lbkpyig3rtspvnj1wxou6mkmzmwvhpo5iizbj5ffk5qxd1g4nv7dkcqhnn0f528bdk0dxeocd7ajes6i2ulxox15dakw6531q2qk0rm4d8df6ou9vbneawlqi796xhhswue3n11a0',
                receiverInterface: 'axe1fdv6c8y44gpk332ejly966k2vbta0sona3dzp7sk9ktc4klmjcvxcnudbnrw0jam7gqs41fasokj7lu0v0vy0byssgyspvq1x64sqs30n8k6tydbug6ciqt7tpcm13t4elmij6gxw7shq2rk4a94kpyjqdi1',
                receiverInterfaceNamespace: 'pmafvm9r25paik9yz9lgctxh77urakr0mcgc7afafc5xefddisqo0ygt7mofp89l8umqerto4406q8kmyzoxtkmx4b0j73fvjjkkkm3dy48i4diimcqmhjqzki9xrfveh9crxl2u9rvps2sbykmv20hz2rpn05bh',
                retries: 1039654384,
                size: 8771528317,
                timesFailed: 5097885004,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ul8d2olcr709p9bv9y5op78vcw518l8fgwub5',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'c3ylvclwnovx85e5ioqi6knemas4git0nlfd0lwqy4rn2me8fh',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '9wyeh5dw4llyeaet6an3',
                scenario: '3zn6i067ruqqjz1hwof6xrs9hkh2f42mxw6df037upoia5jx5v5oav5i0me7',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:04:47',
                executionMonitoringStartAt: '2020-07-27 02:51:49',
                executionMonitoringEndAt: '2020-07-27 05:22:30',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'az5o8qwsd11cjt9dlomp4raexpb2fdjvkunca4ci2vn5y8g2za1q0n4uv32ov7duiatymtq1rjgq2h1kkzuyfxbqe53pclqhjx6uq2gg4y69yhlvht667k83dv5m29xm24b61ab2yv67lwpr36oy3dn85whg5j93',
                flowComponent: '24ehk7jrm6r5e2rz8i2k442m07iwjqr19kthq5pwrskxg4j8t302v2du9286x5gjcnpvdsr9r1n4wgcrl9i1bryapsa4tqn2j2qif0n6vueccaf4xjp9ohk5uad4tpzdloqn3c6mxq6f2rd9j42yu1rpi5alu9rv',
                flowInterfaceName: '83amn4d7wjzd6tioxu0esn5qli9t0ucqgz57fpju9z8llx8t9gap717ed59pfcebdf1njfbfqwou2xdkjx1cvkkvnz9gg61xdb1nplmxxhdi3z8txpf4z93ibslzch0yq0fqrcej1g768s6lmgqifdrl5p0pua4y',
                flowInterfaceNamespace: 'zuy3lu26cdcv36tcgpi0nkngc5k2culur0pmby5djesnoawje59rpici7472p3fw1fh7sszxgglybnxklzol2qwkfbxupylc0y9gzq7im97x8l4suxhwl0zxev3sue5na9vgvr6x47m48e7503j04pai5uhxko6e',
                status: 'CANCELLED',
                detail: 'Ratione perferendis aut accusamus unde officia quia porro. Suscipit blanditiis harum facilis sint qui consequatur tempora odit esse. Perspiciatis commodi minus et. Et consectetur aut soluta rem maxime sit inventore.',
                example: 'n7v289m6xmuzqrsrd82gr9ta5l0c6ww8p1adwmm264dtj138zhtlj6xzb54r6xnkbhb31t9vyvzerly7vbee4n5gnp2e8audv5yb0c21yb5rveuxx4miio8mw2dv2pjy72nop1gozbco1biqchxfnkz5gnw4ebxl',
                startTimeAt: '2020-07-27 19:29:11',
                direction: 'OUTBOUND',
                errorCategory: 'r3pcawlme6au2uelok36zmv6hjn5yoek9bntbvpequ5lvvoam0hbeslgs069p6ocndgefzwyd11pa63uko1ct1flkyrynqfrz0l13emiw0po5k5u7237g4cjwgbax9a4fkdwbnsdx43ojrs2d40i98csiav2nnjy',
                errorCode: '5ns77gytswc22ylwc05hbk7pm513kh2b3qxtlcmi343bcsmfro',
                errorLabel: 432740,
                node: 2837157160,
                protocol: '733er0md65szdwxkx2sx',
                qualityOfService: '9d9acffgf66qnccrj5ax',
                receiverParty: 'gw1c4gdshgybxkh2wxq310rptoaw6xr0awpanyp4jpq3pwph9p13w7w6r2gyl0zmp049o1ma0djaxs01mhntwe4ufxocfcb2oajrwbocpq13j02txi98upjvjqr8f11xu0diooo2dsw4yfy9563oaxb6cihb1ctv',
                receiverComponent: 'hcxajedqpz8ieg6nb7pzkjvj1pgx0rbs3pdw4o5mv70sletp83zwxhn4htwqrknu632f56rgg2a36be1d1tdddsz1opli4mo7y9qceyvqrd82b89vfsdezc7gaq1jgl0mhiylpsq8exhexm6cf6af7l8xcdoywas',
                receiverInterface: 'kwapv8ivrzkp7hqln7gt0qhgeodi9rtnzcs5v737et9fze6mkzva0r63xiw18vlnjxdv91xd7owg8fos08paddf927w4xsypgflb4ajbqnzd4i0xjcwvhdrmomttcub4xs728jkjwxhclavadk59joeja54j8w61',
                receiverInterfaceNamespace: '0k0xxoy20s8k6lp3n5kgetl5s8qfik8ws6xjfsgrico3ttqx1zby911f37b4idclwqhajqbdhg8ji1qr0nqhwud8yf5h1k0dnlk333ta3fjom72xgu3ps76e5pti6emsvixbhjni0hia8fls3c5m3h4f6m6toajh',
                retries: 8085526793,
                size: 6780275601,
                timesFailed: 3484380188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: '0ib6c14mhpdmu49brbyzrvxt8yu1nhkeu4r65',
                tenantCode: '0vuxx5aypiqxvinkzl4a6pzgn4ydf07zv817g2rrlvz4cvc2wu',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'cjh5879bxrqtzhw1l7zn',
                scenario: 'z09t4nskun5530m9otql7ae638j3vezm08t6e4rvy3gpw7y09jzsvvtkhxd6',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:23:43',
                executionMonitoringStartAt: '2020-07-27 02:32:11',
                executionMonitoringEndAt: '2020-07-27 01:31:15',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'rd71nwzk7hmi0qhqdzfmbiynt9pzusr7p3zrnsv2haq17jz8rzy1gzpl1gxtrm6hb2d97wc8g3gm5l8i57ml6zlzbw5f0jn9gn966ktj1l4ehoqyncugkfn0v4hb6ai6u2iikpgxx5js4aep5eqfwvmi18kb7rqa',
                flowComponent: 'mgin21t6m35lts4matq3wx1q1max97aplw69a6psesw1xn4jybtcagajqklw41epf0ykb8uufv0gypyamx0m7e6e14oyemj2ftjjsxpo0t630xc834hmmfb5vxus2nz30sgyj1euy5dm38buqpp3pixj1guuyjnv',
                flowInterfaceName: 'sfq8ygm7afn5zemu4nt95qsbvismcvvjvswp21fdm1k291c4qgs45q1polj0blwk4vxgb5yzquqiq5qkissc2kvia4uj75tx992esk27p68gosh5hedeockvvbyqt5e23mq2cer1td653w2o1lq3wecrm6pw3eno',
                flowInterfaceNamespace: 'isrcri741ugh57siroleo2tm37si6x61axc4uf8rbqu9wupj9rdjbvit5cd18obkttqsutk8mjybccezfypigwm598tkxp32t52kxgykgkpcgl6pcbees7sgzgoshavekzh63e0m7qhjjdq1log0kvmya4v76n45',
                status: 'SUCCESS',
                detail: 'Ducimus rerum aut. Aut voluptatem est quo consequatur saepe. Et veritatis neque autem autem. Provident ut aut inventore mollitia illo.',
                example: 'c54bgsnqyi02835q0frqc916hliooqwzp2wojar1grasxz5ybduiyuqryj2ibwcbvw0840wj1lb2qtwuz80yqzxmlpdgveij02s24c5a5e08ed0ivvnzvrf3jh7moxxkjqwzx1f5z9h7j9lgblcpoqlul9a66v6r',
                startTimeAt: '2020-07-28 00:45:50',
                direction: 'INBOUND',
                errorCategory: '5cwzjv790nv22nuxa2teyfhm7id833j3z68lr33lfu43uanaatj4up0all2ytq8ooag63nscan1rut7hhhq3em2pc2girmqhpq97ry6a16sfjh0xn558kaqus47br21et6e25l3ke88d57vn2d1qz79xlw0n7pz2',
                errorCode: 'btbbqjy9j6hybudvawirvc458rq54bt7sb4yvtkhri79vakcm3',
                errorLabel: 837446,
                node: 1225827852,
                protocol: '6rsnlqagwji8d1cn3ccl',
                qualityOfService: 'm4atzhpebfnis969b6t4',
                receiverParty: '8dtd5umt74g086ktal0jtw581vedn3n7f79kp8rn7e0n5lz00u2v71xtmjsq20qsvsgk59fdmy7a4fqiqimltsz52kdlckt8hwu3plh6v6cz6shwatmb831g37bcv438tjg9uj3snf9m559i11z9kdshto16hfaq',
                receiverComponent: 'b0itnh7d1jbm5e23fkdz6ohosddrsj33j544wvsw1pmcd6u2wr7vge5qc0ktgmm9q5m247yfqt0kl8qsxxj9vq766bnjtz8hhmkf21o5eg4wbb8hunhk3l4luucp61ams64lp8p9f0kuldh1n45jlta2aj5hz5s5',
                receiverInterface: 'elmkyxndavqq64v50tve8geisxfhb103k460gsa384v3lhnw3h71e43jlecqr1724kqhfn4rw6mz6rc2fiafd0jm60krzn2p0odswl9gig4vs8p14quv4jinyhtjonz1cj3804hex3rlp05rdjbcshnlktxbze3e',
                receiverInterfaceNamespace: '8qw8dsdpe6kn4nb1d3e8q1lbujobkeon7e5dvnm2gp699cgkhx5e8rn2j7y8oht66w3ny97g5mdw3mv8b8cqu4l5w0u0wcf2z0njtsd00amn7xkmu1esnizn1uwm2jixwdm4sneuw8amjjki73ebmuj3gaq2nsad',
                retries: 3402410173,
                size: 5285227192,
                timesFailed: 9617967373,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '3wcp8uunkfcuaq9qbxl07gaz5gozos795113cpbt59edxmrdig',
                systemId: '1p554wq5p8bpotwd5a2u4u2p0wae2468q934f',
                systemName: 't3ixtpk8kcpi35ejeqc0',
                scenario: '9i45sfeykhmzplxgh6v23vgiljcqjit51qx2j6jr25xpbdszy5jfts6pka0x',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:29:12',
                executionMonitoringStartAt: '2020-07-27 20:24:06',
                executionMonitoringEndAt: '2020-07-27 05:22:14',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'x665wkzr2c99raihonj3094e56qmavb73c4fa8n4d0dmh5eyg2a2cvrqwtk3kawcz0ebxpn8prkl0n5rc3zm1cjmvyj623nclmqeegncgk95ag2z18jwu68jiga2lie23osa8cvo86s0y5bgwuh7rxpcdllc739u',
                flowComponent: '1i5zffyv22zff1q5t74w2v48hr0nh53faljs5k5beup1pwae2znt4jw95ux0at8rljql2i6saar8jubz1ppr2abdw59w0gttiejxz0bvouzz1txsn9555l4r64kf0hm4zp9xf6d761eznitqlmwq1aaarqp3pe1h',
                flowInterfaceName: 'irbkcb0f22lmkvc0djcweu0t20hjpnd5hn9cna5h0qib4vlvgajtkja9x55gwsmwsywq4rezbaly23ckch5fp0t0ebzn7t5of0msix5c0ls9zesrzvpaa1bgm0p11olrlcpmopq6n0sy5yb2789w9yrrjb49s0fc',
                flowInterfaceNamespace: 'uqo9dryuc01as9u018827rvllr367a802liz3m1vetzih91o005ignm2tby08tiy2aflc5v1ffiqg0829czuglb2fumnm0mutnmj4ilejzmwrbvwqvpuc8noenjedkawpkk8zz4dq2i4jg3cx0lujhchne6tgoz4',
                status: 'ERROR',
                detail: 'Tempore a facere quos omnis et. Atque qui excepturi blanditiis quasi illum repellat voluptatum. Nesciunt unde velit accusamus quibusdam. Fugit enim velit necessitatibus magni.',
                example: '58gga0g5bexurqk7hj5otjci6riak13cj85ey093vshoeiv6pipvzfi1teau0uv88t904kqcqk6b653cs4sw0z9ipy65apznmfwazjitdxpzrx13cvsfvrqffx4sxwf0xtjl6yjs9ogbfktolbr3z9cygin12gx0',
                startTimeAt: '2020-07-27 20:35:55',
                direction: 'INBOUND',
                errorCategory: '6qgvub2wpv8hgn5z6j17fb7f8nvlwpzvvkb8rnmkgv5c2t0hj8mdkmnt2kgau4f4puqpb4p9za2dyhzhcrjrymh3awszu7f1yx6wfhbzbq5j47rlqj63k3bplcdxunjqeip21e4rfh0jhcih40vr4jm1i0skv4ig',
                errorCode: '3pjhf9gt455hkn9twq3l12eqdw9l34zohjy02ic9bl36onohui',
                errorLabel: 117983,
                node: 9903023603,
                protocol: '05gt6ey6qqphmxrm5u3c',
                qualityOfService: 'yr482pucd79d1vuhc18v',
                receiverParty: '3x81juf4g9cxly9kg3pn4f398t0nly82ccod32rdv1vryg43bgnhtx9dss5igwxagoihqmnduv78tulhuy1gwlvl8bh4ysgty2lauw02nxd9qw8qfrlkx7u8kpizdvrn0m8ktbsj1bn3yjgazvevipvt9uttl76e',
                receiverComponent: 'j8plazzp4xn6waes0f84ce5ijx7hcavvemc0x9n4wkytm4fhs3sgnh05y2a03glbp4ehmbstszx2ex999up5513nl6d6flmnplyxb5m2ulaq1d7utccbn08qoqmy52hhzd8mh2pox4q4ruubqno0pmyhoqmhkqx2',
                receiverInterface: 'g0tlzdbepfk6tjbhi9wd34weytrp6t6jxrpuabgjb3gacb098k4xerwi5iuozxjyoaw6u1401c1pxgiu4ebrndobmbuswkq88uvk79yg5nbf51838pwgmcreq70ded7pao6gty4bplw9f4c8ud8pcc3phqdxtuu4',
                receiverInterfaceNamespace: 'lmguue311xbc7y0cvp0a04vgr2r071bwvfeqmbdfh2zy6fw2oy5obofzv0erwgabd7wfpi1p52hfadmmgiofplf9mlkjt020t9t8trst4d1baflz6chdbmruhe8k9d2o0054pnvlmchhibxjhhltciygtv3wy6gb',
                retries: 2088653816,
                size: 5959059464,
                timesFailed: 1261231687,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'gyoak5596cai4jn1sbccfmiwmyy99vjg5q8zq7ewr8mt4qjlz2',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'xq1g3e115ub6pxtd683c',
                scenario: 'qpn4pe0nbmvr0i4rbwfpevb9r6fv2tbx4hx9zigcbeyoq7xmgiazrqmmm8u1',
                executionId: 'iaju52r760wx1wn0f92m3zvokbygtojz9mkk9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:01:54',
                executionMonitoringStartAt: '2020-07-27 22:56:53',
                executionMonitoringEndAt: '2020-07-27 03:44:30',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'bpgmklyxj4aq79x8ytyzwvjqsiih2vmueaa5mn8fnwukbhwyvpwr642k35h3j8ycfrxfxjwfcpuidh29lobi8scy0junz83d4yxy2i8gdl2vbt9ymrpu7siqer50omqffe34ymk13lmpnv7so8bcwmlte9sipvva',
                flowComponent: 'sc3i5u1fbjf6gpqpp5g4buke8vt8k8d79v0h9lojtqdtei7r4435h2iioeuanipujkbwh7og70cawiqehpljqzfm840342c2pfusytf1mm06cvckrsoj6g5m3i7zarjafsd206daccknwmlyabioxfhrpe06zwkd',
                flowInterfaceName: 'mc5vjl3akeep1i6th0jkrxdgwagtnqs4r2s9xrpvj0h93atjjo9ybefxopyvq7pm7mmjxsim0ak5k1bx1euuqavb4x3isbwj9vx4xzbowehzvt0zyfqqjoa8y49ed8karq5i42gdbdhievjckvfvx4aowsijgind',
                flowInterfaceNamespace: 'jtm5dpx3kb00grurjybgvtyqp1gornl8nuas3vsk1jep2hnsr889bbtmes9wvznk5c7xukrwfji584yfu60qjf2qzc45s2sgxeq73dekm8l7pcca1oc837emkbhtahogwkth1kqe7usyh5e70mx6p5zhlqkith6i',
                status: 'HOLDING',
                detail: 'Minima neque consequatur perferendis distinctio. Doloribus eveniet facere tempore eos asperiores. Incidunt magni incidunt. Enim sunt nobis. Eos autem architecto fuga tenetur consectetur quisquam.',
                example: 'hkckzfnx6ufa7t4b7p7fs1ehhqemlauu8zejxu56dvu7x19eyql21me10p4av0pz2f72zjk2y9n19f8was1evoakf7lr650xff8jt98zwbh5jh0c1mlkr1ctvyssp74hjg4qens7vebpdpm69ajj6do2vl5ln1bj',
                startTimeAt: '2020-07-27 01:17:39',
                direction: 'OUTBOUND',
                errorCategory: '7a7dz45rrf8l93vzbhykdeutf7a3ck9grbuozhu7stwz6ghvraz363aahs3xocdvbc8x406p2tq6wao7hfgy5f3zviddhxjvfpan4dfat6p8clzxseme9vhxwktt4rrq6mlh226xk8x6mjiqc267h5tjstcuicdm',
                errorCode: 'pxdbrgbscy33p3gwdsrw5ooreobs0axyrze2kfole22j3ra6vp',
                errorLabel: 372331,
                node: 8863893205,
                protocol: '7tmtlakeur91foz144dw',
                qualityOfService: '0etytw5ekimc5en2o2n4',
                receiverParty: '3rmexa81x5dk9nei10fq0tiijtys5hn0w1oetb668223vwclr3cvxfi98f54h7cfiv70f1ky2akucwaezsf0nkssdw2t9i1b81jmhqnjh9kd6e1kl89najwe7x3o3rv9tu9i6ftzdfliw60ewwjutbsr6n9zjng4',
                receiverComponent: 'hy2zgawtcjtyi890o3n2x3nmbn21dk6ku2m1n9pxzzc2ter32up2jkf6tyvdd2ob7smbjajhpu28h4ny81eje91yvo25de15rsixos55928nzp29a630h03g0kv0tizmxbhfazrmrf16nlzj6hut6f8uxw44r2u6',
                receiverInterface: '98nt3jp7v7axnf8pew1vvz8hx8ydjoqskh5c7x3l5x0cahbgqjl0qolnh84wuoudtkztvvjffm01kwkigekp5axr3wo27mp3zlvdeqseowc4alp2aclh7eoep9krwdj4gk6yjzius3ivwr8b233m2hf3yre8xeyi',
                receiverInterfaceNamespace: 'giswvbmt13vn5xp03hlh0pthq3h2sl08thuhqwmpjaugdur7lgnkow4rhcxygdigvotbbhzcofdd214041wuqksxsn8i0w723xqa1haqiopidh2xn72ca1lfpi0gazw5xyko7xjgksr1scs0klbrzpr95ztkmx0v',
                retries: 6276635786,
                size: 1759388475,
                timesFailed: 5357044664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'vcniakn56tn9gydgtcbk8z43i9kych5eqigyn2o7966jz4uhmf',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ns81soo30tfgfs49e3ru',
                scenario: 'r63llz3bu1tesurqs8xnyegywwhl856lkl7hfsv15v9jf4zuvy2lzibv593b',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:28:13',
                executionMonitoringStartAt: '2020-07-27 13:23:35',
                executionMonitoringEndAt: '2020-07-28 00:05:06',
                flowId: '3zdu1gyigse8z1z4g5zqqr4y5o72o2bkh4btt',
                flowParty: 'wzyi0ehknkf8you7aeptdxyfngmj74isjbfuwhtrryytbkzomjexii61k8ednv5berdlop24twlfe4sfyaxhh2s0ulvg2zt2zsx6695pug1s78przn8r65b81ta23rt5raqoujdcusej0o9fud8bi8ugjlq6o6co',
                flowComponent: 'sbzf98561ctovmp5er7tfanxcuamr0umezcbmkijf6dvb7engpww3kmcdhpei7199kup5cp1klykdxpy144ymgjhdo11mcfz75jshlifr8tcka4q5sskxyvmrhrh97anf5djsa504hdxab0iibdndygl3m3opakb',
                flowInterfaceName: 'j53x56jxq4rhxxdyfxmwnopu8m5tn593nzbbv3huea0j850emtjsirnie7kcekhg7wwznpjxmju3jd63buqvp6btcuemeu2jk5muihzohi11fy7x0b75dt871ce9d3necc4mq20he33k4uh4ef8kx4b1n2yl8yec',
                flowInterfaceNamespace: 'jkcjets2blfey0sic3ekz7vr2js75lp0ni2qcib3jeworuqbxtlas9d79ohs6bpdqt8nfdvxuul79rvh209q4c5rhgljkrmmaqn5andjx5m4lu60p5lzlw33hkfl27j49zwal09y8bewyxp2sdr7leuouvfooeud',
                status: 'HOLDING',
                detail: 'Inventore iste exercitationem qui perferendis et qui voluptas. Nihil provident enim culpa sequi nemo vero. Ut sapiente delectus et officiis tempore dolorem minus rerum. Dolores dolorem velit quidem minima vero similique saepe quia sit. Quis et soluta maiores.',
                example: 'ev3zea0kg3s8ehz661twt6s1wszm3iaxuv4eijoc2e55ho11ga4hmopyionl2iym8qsun71gi5k2spm2dpo1x74a0ebujau9fqylrlzxef85ggvihhet85f5tvm3k8ppp0p82aaa2nfd7ubclu27tzaahapcr9cv',
                startTimeAt: '2020-07-27 23:59:01',
                direction: 'INBOUND',
                errorCategory: 'g6p00iuupib40rn9o2yhevwd5zc711j8u18jz3y56wg5th5t8wfy860q3kaos943x75795tgzwz5j0d1cv3teu9wqeuw4rn7bohzsedoh3cgxv43b7d1s7tduxrsebwxseu56562sii6gd3d6g9acbubhd8d5ffd',
                errorCode: 'q3zc5eitwrxsrx5aat243z5r2mlilkno4wkdezig1hwcmsdudz',
                errorLabel: 389063,
                node: 7172793267,
                protocol: '6vvyiit40549z22i1y2k',
                qualityOfService: 'dsskr0jenb846u0ttd18',
                receiverParty: '0q9mlihpbu0dwx0ejdm6h8euzbdfklfz1vaobauo7n6hbc11pl8s7jloeh9dxyl6yaa0gujs3r4mdvomvoqoq8po2e2ng0c4saxk2tp1w4nq1zzbgrr20hz4iendy5n5dyxfmyttcnsb1ay7fb1joqqkm2lds6je',
                receiverComponent: 'x2p5sf2nxzqrxgf8k8ahrlmgph9ehxi2gnlvyr1iwgfwwjzg2dz4dgwdrtdn2b1ldi2u65674hv4828kw7yvzb8oisez6i8v2ztn5b9fksgm3avrkrt4odnkrqng49swx5wd8ij88lo6k6kbz5a8a53nsimuaz3m',
                receiverInterface: '9kahxxlk54hz9nc3wzbpkd6rro21nxpgzd55iilmyg915exs00ymz2rn92cdrzd2fg0om4txz9e7k9e2o7stpbi76aw5ved84sxf92ar8ziqgy33blnppncmozythnhkyml4ayr5zw7yn1y7627in1jpheez7i8h',
                receiverInterfaceNamespace: 'v5an98mix518fjg7qrh8dgvxy9jvlfnhp2vlfghz3pavv64f2kahy2gj9jxiyeyyvmfuknviia96lx5tztixodn0y19qqi74g9rvpt3ffgifarm1kz4vux093z6xf8o6lf4nyzgzt3d65dhqurridiy9sdgqp606',
                retries: 4631995969,
                size: 2959437367,
                timesFailed: 1904249140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'yy0d07qt6nb61a60cqgdyv3wf2d5r273h7rrbzbh194xnixpque',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ctnz5eligp6d45038n9d',
                scenario: 'xh6azvhnx7lm6eif4iwhak32kfescn68wjzt3omoat93zxk1mdzf2594vr0w',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:05:40',
                executionMonitoringStartAt: '2020-07-27 06:05:48',
                executionMonitoringEndAt: '2020-07-27 20:24:32',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '0gik7yop345pxwtnvmhnj53aqx0k3aqy2bbojoq2348fk6vgkfzvrmwb7z15t21e8661vljbpdnmwdzl70afi2vrsex65ptbm1912q97eibr8kta3mhnmhmpgwslt0xndbtg0rwv4oygbgvf7hrvgft6jldfx4o6',
                flowComponent: 'dzu2xb16hh2kcz6rwsehkblez0gia2tzgflm6we7p6bcbsbi4s6wykdinyiim5uhc7i14zw67p3t1fr6td2ap4akpipajvr3wkbuxxncxg3ro5ooevxagjiyo2q2fy70byfeth0uikwqgwi3n7w32ozzd5xizr7x',
                flowInterfaceName: '01zepa11174xz1z1ldhgm753iqsyd2akd7flpf6hgiepc5fkm84ch04d10rwpuyp2xupx46ydag6jkd7iivthby6awrgy2ju0exrhec08gvd08mylfo9q09wuqrikffir9qs3a6b3gmg9s2381kcjmtqmciaq6dr',
                flowInterfaceNamespace: 'j5zo1lx0v2ir1dd19whslfuyo9tksk9u6tnvbi69lv1l0bxf0gujcuclwnni2y0dtls2xl4ca65nx9jyv5w1dodbb2anwsniemzu6ornvbnlhhf2y1o433qtverrv1ifzyiirbubgu824ma2srtl6fpso0e7br54',
                status: 'SUCCESS',
                detail: 'Magnam cupiditate asperiores placeat et ullam excepturi exercitationem. Beatae ad commodi. Rerum doloremque nulla qui id ut.',
                example: '41bl06v25r694hotom4pe77ihhc8pfrymxvkwd41rbbre68y1c4kjbu495jzjbf23marb5c4wiknybz7ehxpvdd0bjevl8mbu6ml3v6hgbwcz8c68nhdmiz6esyu44aqwmttdu1ak9bujclhi7bltjvai56q8jn4',
                startTimeAt: '2020-07-27 04:36:00',
                direction: 'OUTBOUND',
                errorCategory: 'ukz5953oeboh5ajz49oycbsf3vbslgxavl72h913lm5f9t87bda3dchs3wao49bq3j4sxgyqtnut04taahqu553p7z4ik8rqfd4pgd7rj82mc71jxoebbx7bbp2qx4uqrwvd7ma4ovyzxmo9v0jen6gb1k6alerh',
                errorCode: '8qye9lgn3dbxnhr48m3tir3dgvx69cr43xykea2kryhbm22s26',
                errorLabel: 896488,
                node: 5985288200,
                protocol: '2wustje1ujkesd8gtp5a',
                qualityOfService: 'r1h9vm842ghwyabxgy9b',
                receiverParty: 'entdvfsrm01xoxesns8hqjvfc6etlvr12vempcdijlg3toko9jmtx71bjtz5p9dcs9i6dt1gtai9mj4kdpzowojdnjcg0qx5qhgkqwkdnvx8rud605yiqepp6447owji50e77z50b97fu123e6yxg1dflk1dyup9',
                receiverComponent: 'fgfnauzjqxf7yxlq1nhmjxel0pasrr3kkjz3t85apiokwt3amy233oj4mzwwuz5o59n1qjbdccmfo8xhmkghtvsrcsett0f8f3epvnyt3l60kvdr15upe8cfsu9dmvyw8h2h4b8jooizvtpy3yg5s8nodlb3q9ex',
                receiverInterface: 'ms9fes92dmgfezf1wfeckdmxyll7tms71o6aeqoqse17oxlj216m7ogm2idbqdv4o11jztoamst1zj2dwwaebuu950hs3rd5laobxol8io2ytli1803k56tnqj8xmjd13byxudsbgj8xw2wumsb8699nfrjnaybr',
                receiverInterfaceNamespace: 'r523o9vok3wm17dyykekb4t4iucu2jju5qqfb25y169ja0qqkrev1lvhnrr6r7488dfrkjc527cm18s9rgi5xlypu47rijnauecdqlokug2nnwqsq07mchb94pjuft47dy6r17pylqxpe5dwq83n8my5i6n3mkps',
                retries: 6696025755,
                size: 9876666479,
                timesFailed: 3555116391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'z4t7wfyylidle24uiqdk5jz5bwhxl66mxnhzqk53v530nlb11v',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '1qbd77eabkmojyrzfosdg',
                scenario: 'z7gbbqoug5r347xzowjn0alwbn1xtld3eh4gbklfe2t68n8mx8dosmur6udd',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:00:19',
                executionMonitoringStartAt: '2020-07-27 17:28:03',
                executionMonitoringEndAt: '2020-07-27 13:58:59',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'x5ar093r2utrgko7m37g7ygojwbzgcb443vka9ythdn2ni73hx6jyw6oa3bo7be4pj92doaouz218fxje9b4qsm8wlpiyz5oy7pyd9ntwiqtbdiu7ikxirf2j5lc0zrcxym5cjuc65eszxjv3dc3zmb2sbr8x1wz',
                flowComponent: '651wvre8vmucwo51zmpcjl5jvv5sabo4u86si3gm3zl3jckrtm97e9jka8g5y3n3v3s253ixz3kccw293ygn45thqkwli8lugi744wmkm7npxnl6s3p0erj11xvi7aq1708upr4l59adsjxt6qajvq3tjvppx4t4',
                flowInterfaceName: '2qmq2xnfkvmz2tangxu87uzw17u65jiucvkzvw9latrmvf3w2m72go73s0ld8m67smw907memv5odwxjr6uf8443ig9jdhn98gs29gds50l4rwu0w5wmxakiyuhz0kwjit8iahmseo46kdvo8j3346pbjpltsq6s',
                flowInterfaceNamespace: '9qyav7hiwdi1bij932d4qw7h9ai4nf6i40ipd70czzta0ireyonxdv0wyotckcfnppagqf52dr71q5a2uaig3flofy753vwnhd94oe3be9cx1exsnkq7iewgf0wf4ewudn1cqkdvojcm00gy0rvh3gi6deubozxy',
                status: 'CANCELLED',
                detail: 'Nulla facere eos sit quidem quo voluptatem laborum. Cupiditate sit maiores voluptas et quaerat quod aut harum. Sint possimus et ad quaerat dolor et. Corporis animi rem harum. Voluptatem commodi ea fuga repudiandae qui praesentium.',
                example: '2g66b41uc7thzioljc9xzjisfabg5ftozi88bivgc5tux3v8chhwkfqwa6dffib334ek6x0m5ybouykysfrm7xiu1fc9emrx2ydvfhvy89xgwpd2qprwzg5i2f34d8k6k5s5jkp00fhjjvf2dn82qdq2z1jrpwft',
                startTimeAt: '2020-07-27 14:11:24',
                direction: 'OUTBOUND',
                errorCategory: 'hb6gfnepj089zfmp6yhkoutncyqunv2r2aea08gqk2ma6ax5bu56e9le6y50789p0qk5zfqzr0w6l3nw2ujntmlmgcher3yasutn185dnrqx4oistjvi22zmkbwnjp7120rb8e8l2a9y19znjdvb9et58dr6117u',
                errorCode: 'hxicxvif4c1mxay7u2h09lst7v0pce6wtykisqj408jn5w0wyt',
                errorLabel: 505387,
                node: 5991375134,
                protocol: 'u6vjw8me0dmucbrg1d5a',
                qualityOfService: 'uaypgitsd9sl5u1ke9kd',
                receiverParty: 'w9hj9mxcitl49cxsz8qwokwqyp8s40zhgkqokvsw7wbaajo3u62wa7x7s795iezefd2g4ivev4obtr0e5xfcwslmaoy47olui5vmse15cafwq2lv2so046giap0a6qye3qgyqoemtg712akgj625925glw7f1tyi',
                receiverComponent: 'ocbxcg8ryhy48e1nw1l21wd7z1cjdf0mq89msub7qecel7eo9v3pamfbx9vd1wlj0mkk4oq9adjhj2424bclvkaauas08esuad5e4rjrddtlsd577shj5hebfy6fi177e7ta9pxts5tohlj7o5kg2fb3kmubxr3j',
                receiverInterface: '8z093fqqencnbf0ewnjdab2mh6jdzi8mnz4jg6ipddunge3yg0cjjrnp1y4wjg7r5c8iwbknn8dop98x4wmj0vjriwje9kq0u50ypk42xxyk33ezpgd0yniur3cpwa6o9t0zfd8km7ptu0jdbpbsl5ipj6r1f7jo',
                receiverInterfaceNamespace: 'owbvtg2oozjfgir3m8yih980hcy8c4n77t2m6osme308o0t15rr9hxnp9whg4sj4eyclx46fgr5zcxd0b830964jiyc7lpsl72fjbnniltv1d8oljycr6cgeq39yfbojwk8o1ceks7cm9f7yf84nmupaqn7usp5r',
                retries: 4136734710,
                size: 1839137418,
                timesFailed: 3725359334,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '5m6z8pmakm9j1d1b2lu9sjr59p9gp1n9a6207w8g5n6di404y5',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'eg3eo7ze2p459pcxr4in',
                scenario: '12eseblibdg2qsibii8p8pntn333a35bmgcnclkhdwzgccdrbb1x5r8e2wz4y',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:11:48',
                executionMonitoringStartAt: '2020-07-27 03:45:59',
                executionMonitoringEndAt: '2020-07-27 21:01:28',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'hd804bqszy3buxgoijflvfkcxy99d27xq6fc3fzx3be5vciur3920cuyww8r53q14740rk5ht18klibo1nys73bwcms1wi3l87a80ei3239k1b5rldzgryeh2ljt1xx0k6zj4bmj7j4r6b1f9egsmdkjt1hwqla9',
                flowComponent: 'izmdkudxbqwu5tidtw4422x2nu5z2koumbgqnd3j080g8v7sixuusk60r4hqpeb0ocqn7im1j9hn9b0452w21he5d8wprrivbngptdbq94mwlyr8uud3gatnrwol49prxg2pxkzq7mkjjvpcgx8qmea4c4t90eor',
                flowInterfaceName: 'xogomvaozwiegpl5of39y1zocem3j6n97yy9wg18cepq84d77h9w2zcj5pz6bwy6oftqybcyero3d133s5nwj4jhjesx2lcqau3m3k9kqa5gzmt05kuinojo52b7i9hn19jg8fb7eg94rtjak227o2aqv3qf31kw',
                flowInterfaceNamespace: '1eakllz90d3emg1k1lmuiyjle9e87wbtsalsixrdf8i1j4sz8qzc5bxxl9sbotnj4opn6uwpauhz7yfrnix9f1cel05t6nmt1ks3w5o6oeoas4yanm9f29go1yp1p9w05whatjaaqmsmiylhkw6hhfbn9ipkdffi',
                status: 'DELIVERING',
                detail: 'Est dolores fuga. Eveniet esse maxime. Eos optio ab non molestiae aut.',
                example: '55jpy12cp8tvmdbeeykq9u33qtsftwf6zxl68ysb40fay49k6m0cnq0l1xhqd2285s88p5tmcc5vvpo8ocglfcb8qyz91xueybf7jiaq91t0cx1zlo72tz6yw3pubqj3t6bv97i0f8dn5by91dyix5zbe33go285',
                startTimeAt: '2020-07-27 21:09:10',
                direction: 'INBOUND',
                errorCategory: '6mrqxflzr8a6lor4w92lyfs1yy1h5kss7acwkopzweui6g8klt4pbe0ls578bptsn5om7wneuire05wulszplmvlmztuwaqkejh5h43kz65ja0jbupebgc7ye1v0tkpmrzkngwrs97i9e2j9ykl8t48mk2e451ib',
                errorCode: 'ihqeqa5dl2yhranwhcyjky1dep5jx4zvgc2ygtd6qzr0sowyxs',
                errorLabel: 785390,
                node: 1668511891,
                protocol: 'pvaf50cn7zha7f8tr7t8',
                qualityOfService: 'jd1seisr0iwvswn2h0zb',
                receiverParty: '3wjamz6xq38xh1s4bj2apies63lg0f8b9ex728g80lixph6j7764rpak2b9zskn3r5n4lbktmami7ngqbcsz75e6zshgt355ei0j7g5l4zj1tlsz3qzibjty5gixttt6pu98vyqluwu7eqlrtjunn2h8eu77tfmd',
                receiverComponent: '31zmydeijfzn9a2e6j3gxcejtpmuqntccqvh5v64g4t1zvmpdcjn852j4onc89w57anctg1lpmj3qrhn4wrnarbqo70et3z4v0uhpcbi5vzrp0ox0v05h536ibwy986im80lana9trud75f25ttil67lbk2sdi5t',
                receiverInterface: 'fqcbcsdxfcyjvx0is3ldz7csgi8l15sfikis1q2sutmjxses17cx6vzf1dmhpac62qshx4mwujtsgysnav1qvn9i5wdzeppcirlluhz3m6gli1llo0co3chvvngferlnmpumngcw6yl75kafn7ugzsmhek31hzvd',
                receiverInterfaceNamespace: 'kyrm6zsu4726q49c9p2g5yrl4oeegkjn42erszg4zddcebdtwjopkqhpsv688zkv1bh39goxq1p0nu37oja1d9jv61y13shyunk4h5hz6wdscbxpxaglr81c191m45gdl31rfjk16dqy4comfnsriyj2397gocxx',
                retries: 3342776081,
                size: 2933825922,
                timesFailed: 1988397683,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'wh3tln82oltzwfygv0k36y6ndardxqnx2lduw9pb2tme6x5hxm',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'qw0vrwcfks8c78m71vxp',
                scenario: 'fa0jjy5b6sguaywlkzkoqw9rai9rckj0a1a3uoijfayudb9ylznm78nm2i09',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:09:22',
                executionMonitoringStartAt: '2020-07-27 07:28:25',
                executionMonitoringEndAt: '2020-07-27 12:45:42',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 's0wkec27evfs1ixmnul3k9qeao5163cmdtkb5vy4vyc8gozrdaabixcyczxf7cnohdduxbfdwiz2zbe4e9wkbnjvlrgfh875xlberqedgemnw3try5ft4mk6hocwszma1kj1a5c7o6s9xelp4x3eih0i3h6gwsssl',
                flowComponent: 'ysan316qfqj4uwmy8n87p4e6ypi47rak1gp7c0f2g5zar04vzrzn52o1kqz1j62r9ap5lovv9tj1kbkp8xnr04pn24qg28ahusctdims4kmczg6ko8amf6f08hhvof9yvov8zismh3jn7jfaw1s8iz3f4swl832b',
                flowInterfaceName: 'qgdqnqhvlfnm3qm7cfzrkihekinux4w33dijmt5clljh4u3ez2ue1ltd24a33mc23spr967rd9z8uughkx7fca6khcqrcc6zl4vjqt69dezq95hulcuso24wosqbo2635b13j18p7i471h0aibi08b3i00yyui4y',
                flowInterfaceNamespace: '99jac8ss3ejzgvjzmo6amtfqbj55jwxl2t4qh9pni2nh4p1jktjnwpml4f0sxdshmop71x32lcuihx515hskc2vxg162sq66yimmeo2nw47690zju7dodx9vffwvby6hmaf4tvn0x166gs2dgljvr9fqoodrtlyj',
                status: 'ERROR',
                detail: 'Consectetur pariatur labore sed optio consectetur laborum debitis excepturi. Dolorum saepe ad culpa corrupti eos. Officia voluptas corporis sequi sunt soluta magni. In labore voluptatem iste reiciendis repellendus accusantium assumenda suscipit.',
                example: 'b8re6iimj45jgrnr5r6fqqen2u6ntn1ut8cvj3n1t2xbkeowgewblng72x8k9y1g7macr9nbtkvym918ek05kictx8e1lvk6f5sjj4zo2c5n9cl1ghp3pnkxwxmfhoe1f7xazc2j3i3nofdm147ddwj38iv2ynxf',
                startTimeAt: '2020-07-27 22:52:03',
                direction: 'INBOUND',
                errorCategory: 'z7iq888qbyc0tkufcn1r1cu91cxv882p0evrwbch3li2hgjlggn6q0kur59si0k9db33wfnkuowdim8uf0lymkpc9t3zdw00tflseobkh9j7zozb3566thjyd65u7bk4slwexfo9dyvsz6v0goq6m2r3tw6qblhc',
                errorCode: 'vrqsd0j66shdcx9qskgmmpkk75cj7bmywni15thlpmc9nz5ilb',
                errorLabel: 473574,
                node: 2090100066,
                protocol: '44qlytpo0wovx4q1c49c',
                qualityOfService: 'xnj1unv77f8kvgvq4c1e',
                receiverParty: 'k6qb4bsxdsv5uczhsieps0uwghb2huo76k111ro5or49dtoiookwyrol283smo2urkk1pmw2u9bc6sgev1awgnpnfzms3t622tdpt1cwte7mei6nux2kv2iojii34g0uryw7fnx4f5lme968eu1s3z3hqv8654rz',
                receiverComponent: 'h37fb1ieqe97wi6lquq5tatsz8nn2355jv0l3krhqgieeqamuai6ammuh0lmhxrzp763z61nmbanywae55xbsnx396w8nv01026cwwntlswwlnwi9fozqsvnp5a6wreh17jy0ns1ajjvny3ehyejcsyjcf1cc4fv',
                receiverInterface: 'sbuhn3xnf4yfuzmgxfxz9nqb1aq7ysbijx9tlnvhvkub2zpty08xnv1phrgp21l8h8xc3ri1hi3qqf09j10bz6rfrh4eycdap8qsw2ox0kjulpv0b7gohfx4tfod2jlb093dsp22fyg6lie6tvhx8gh1wkee35ym',
                receiverInterfaceNamespace: '605yxecux9n5macg3f807djq0d1rib799ssu1hnfqmr3bhqoxseh2lr6f5bs92q6pfe39rw6wzroxm7pz3tq4oedvobdo74cajy7iqqlimxnggdjep5p9vzwph9kazncrxz1kns36hvpuhfvokh3poz1smwu6rqv',
                retries: 8947812952,
                size: 2053267944,
                timesFailed: 7584016610,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'vfl6sumovbl97eiryo1rwgtfiey7i5ae0224xbuqatcoefw2s7',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ostseasa8kaa9zms7pp1',
                scenario: '1r0h3a1rn7vr8rymwp7r5jaw1co517xm9ei8ybfgqam2geuthxwjqnxa7nz0',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:39:18',
                executionMonitoringStartAt: '2020-07-27 10:18:16',
                executionMonitoringEndAt: '2020-07-27 04:16:58',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'wiqethfpl1khh2qta4424ph9siajd65p8a5xznb462f0ul0mrr195kb5oegdxwwyjvf27fxn0czjjifmmwlj6ksjwifn54q771cfkjghpiic4904yjozpiffhxhv2pwypk7u30dtwhux6kvgvdpbzum2bld28i7x',
                flowComponent: '41ccbvulyt4xf1e26dzjchctd1hjxw23ol6ppdqb4imv0q3jjswxqqkg8bjqmruzqa0axlvix9ujtxg3gm4wujw7hpy4kjk9zh8xqz3b8dl84bbiyvafi1nnb8o0ulvqye35y4x4twqvg0s7gpoo4re6w00mbxk17',
                flowInterfaceName: 'd8zyiumizjlm8wplgo4j5wsljws8vtha3kfmbo6x1slfr8zi01i3i2063ksx1ea7oakb862ojsxic1gjjy383xpe5y2zupk8835r8f5bt97pt3ifmr309t5d172a7n13qv7sq7eulydo1z3japkfjamqria66mop',
                flowInterfaceNamespace: 'tfyodikux4au3cmvrvrjaffiqnezbz4hbf0x853bczo2qxxne3l9j07sluoiodvx8kvm0j3a1bgvm3akv3aubjk6miwoioj8rc0321eo4kmrm25vqebn17ylvladyira5sgqckafs73ness0h62fhqu4vykc3amq',
                status: 'HOLDING',
                detail: 'Praesentium exercitationem voluptas dolores neque doloremque. Eum molestiae ullam tempore velit qui est sed labore. Tenetur aut aut. Est corrupti asperiores et incidunt voluptas culpa. Porro odit consectetur non eligendi in sapiente amet molestias dolore. Et non officia reiciendis nihil ut nihil corrupti quas.',
                example: 'cdt2nv5nnlnknj50xxapfjko7t38ze9tcmck6atf49s7nqp9zcagmpc8br743zanv4x9kzyf7zqhsybu7di1fj7m803dmuqic6uosxvpeefqzowm9o7pdosiofg69vvhmnb82hb7ngbpiwpkt0hrwj044fawv78u',
                startTimeAt: '2020-07-27 01:28:56',
                direction: 'OUTBOUND',
                errorCategory: '9mddc7v1xxath2csh39y9v6zppebcxydaz5b4mekan55kzet9qy54b3psssbjqvfq3kmimjei0gjdley12xnrkv91r5s439sv4usw83v9f5uaohr4ocfzrsh2rosniz4x6c7uekt7hj1f8vmyt304oam3y7cbr8i',
                errorCode: '23nlzd6d5dkd4ejs09jd9jswhltqswf5m2dguqgeanbxsf1ohq',
                errorLabel: 293344,
                node: 9772354259,
                protocol: 'dj04xtbu3bka9rr339bi',
                qualityOfService: '5n30esv18vxdh8xfu2nb',
                receiverParty: '46hl2crhknhsaxdb41suoreo1cylyl8eqchha2t9pgwb8jkbjxxb451dms3d2bfx6rfc5fv8ns5y8pbn56f295hqstg8d40n2kc17ix4t6mfj614dx6nlgdixgab2ntgaydlz7s7fmht9tgd7ee7n4rxfub2op4u',
                receiverComponent: '9f9bxtyqhap0gca1melpsddow4fkcr8mz48n5c8tggb5jc7p7dk7d9okc1af83q3pnung9i5zeb6r4vc8080v94fwubqnd7l2c48wg9h86o0wtpe0c2xltmmhg9drpqu3x41stnrmfpdg6qic7ky9hzeh5jg8us7',
                receiverInterface: 'v3xvsxinok8vbv41bgkgz9ku67yhij5i2vwb4tk8i3s7ij6r9hbql3iv7wykmhxwv3nmp4i6g8h24m3lpbonphv7clbecan0suchnhsyoloye3kcecrg81sqt1hdffhrpgomdcsl1q09whju079z0ceg0mkhxizv',
                receiverInterfaceNamespace: 'dk0qeylo1tw180yh4rcucmk8f4w9y6udsb5h5l7awgufip1pme7owcr1vigbrei6bir9erxptef70qqyscy0zrq7ufcjt733l9kb0y2w08v1mhu02asv4mr3nof8u1yfy7kmn9r0u38i4wu900yn0apat5h5pxol',
                retries: 3687710238,
                size: 3477243132,
                timesFailed: 7105991589,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '3viq4szhf2d6gffwxd32p79blpuovd29o59hlvc2vy7fc1ji4h',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'kwho34ithphfjrhh95tw',
                scenario: 'b6myag0yvkx9vy7p6wx2cj4lg2abhde5cfes6kfxrpc5l2c0t6c7kxwc9ayk',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:09:41',
                executionMonitoringStartAt: '2020-07-27 10:54:18',
                executionMonitoringEndAt: '2020-07-27 05:38:34',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'rgs7948tggmzrhkpgvwrvjvruua5ob5c9e3rtfm4307jy5uf7t75envox3viddkjlxl5ireh6f7wbospojuovx7v7reddv3789dszqj4ps9zlviduquz7w6z3e4p9diwmgm7iqxg3k91a419gost75n8twhvkgor',
                flowComponent: 'o2skg6pc691qqmwscbz8sm2lp89k4qaw0av66uiiqhfc3py6eg7gq6z080uxlw1t3g52tm7uccviu56bpxmw765mprwzydk7ksna8ui13mb3kr95m9auan874gxckv3a5a3m8ik1gv4ivkgh8252ypu2lzny1dyy',
                flowInterfaceName: 'ur4bq04euzchzyrc5yeevrq16gvjp5em8iogjbbx8noex0j2euxsof2c2k3bua31ertqqatfnnecxdtkbyk10y6p4el45hkc17v6c3n9pom4i07y7obkqpdiqv6kbc034yt4f87ppu200ohrk7rttqkeeenh1x1sw',
                flowInterfaceNamespace: 'm3q48i4a6c6v23vzkiy05of71jlsxdjebck533nfivssc8jzvuxzpv8m991m3bw5a2agmcu5tmuxw2kjbor5siutimpu6e8hd56cpxvcrbktmjy2pzqlidmzebbvy39q2m44lgcvrec0eps6n5lq31hyhutfp8es',
                status: 'SUCCESS',
                detail: 'Quia natus doloribus perspiciatis illo labore enim. Hic non ut facere corporis iste voluptas molestiae aperiam. Et quis maxime fugit temporibus distinctio nisi consequuntur ut voluptatum. Eaque vel et aut id et quaerat. Consequatur non ipsa voluptatibus totam mollitia dolore voluptatibus. Quam omnis ipsum illum et et accusamus.',
                example: 'tnzs6mkveh4n3rp333j1eds9zst2bioys9nryv5t2q5l33u43e46535jrp6fjhungnmvl3ye3t52o8skuxu3sr8cs1r2s96dv3umg9l4if8i6tx364bwxya9o0jzh1p05klk22kdm73mq7ix0q5j4x836mc3as05',
                startTimeAt: '2020-07-27 01:07:46',
                direction: 'OUTBOUND',
                errorCategory: 'wl8fda9jx21xs659thybmw8at35wv3w4lhxzxoccz3sr9ijp6s0q2g3cjtq2a7i4hduq65sidnroaxhcfdh1xez80f82m5589gskux3vu8kpwy7yc6q3pxxko9zkp9ynhuf5xurp7nbhzycrpkckpy9jqoueu86l',
                errorCode: 'c1mt31x5t83gh55rc89lpoi81pommu0pytmgys9mxykqnhi7ih',
                errorLabel: 853997,
                node: 1374615018,
                protocol: '2debb34bq5zhsnfey7je',
                qualityOfService: 'vvhblxxkclbbv7lri3ol',
                receiverParty: '1lkocybz1f2h8p70p9egrfkq5jhcq7bhwdkn0spfs0bzgfi6lzxhokb0bfp7a9yie3wtm6uvbo6x8kn2izss587ydnbectwot2w69sc2ak5691izu2g0u3vkgezr69j6hg2toqf0cvs6t30o3ec9rpsgxb9dau2r',
                receiverComponent: 's5u2w7j9haerbj8by6lgjhs8jhf0xw5ewhd5amcsdglqzedjooxzbl7r3mvkaf1mi16etmiqhm5k9blyyt17kgvrfshlltzbborn42le5ztzfm8yd86qm7qr44dicqk16vsvdvhgkgiywpwln8jxa8sxkf90ldg9',
                receiverInterface: '5drm8c01ekg10pf51c15xhajwc5j4qyvq7a6vtcqhkqiqvrw9o4idqxwpzplzoqaqz6e9zq1qze7l8pe5b51kdm0t58qmaog0lfeh7n2m7omhvf6u61umfsoyneodsfsr35nwnike2r11lzv0ass1ayd40fknger',
                receiverInterfaceNamespace: 'jl7tyoi43sz8sasczakhrp1fl1bhgsote1k8j6aa2f2w582ksi9e2vi6igkkrb6c9t2qsj11exn10g6kjgcm0om442wku9u70pya98v6dzqmpt5z2jsaurfg9wj9vy61v47vz3c8nc7gxyubrsg4q28m3ab0vw04',
                retries: 9333625763,
                size: 3963436165,
                timesFailed: 1658352142,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'dewr5cz059bmnqosw9o6h1h1vgqpfy1pcsz6pghucg9dan1dd5',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'd7b6z1bur4wpklqcfesz',
                scenario: '8cps2mzzigrjrk5rmlq2v4rqfxwy4v7jnaxyilieay9bqsmqe8ls51gh61jc',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:07:53',
                executionMonitoringStartAt: '2020-07-27 09:50:25',
                executionMonitoringEndAt: '2020-07-27 17:35:15',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '4xk8muhpbv4y4xujtqsj2mzm1oi4yxh4toh6gh7awens11vuwleq6itcq8glp7ew8w68x3gi5mxsrf68mrqyfgp8pvvv7m5ezglxlu3iqfh7ef1xlmfje0og1oz3j3zjuu0jxknfdg5ihxpt8bo7adq2zniovx1p',
                flowComponent: '3u1wnuqvfipoh3rzqeeckwvx97f7a7mqsx06lpydvjaw1ufqr8ehm3cl16xm8lu6uhlix1egmtlp6rebf694k1iufla8hva1pvw2ln1o0wxh7gumshir1w1ckktfr2ymobvoyw91w8tyucmxm968hntxntaz3j5a',
                flowInterfaceName: 'lm42xh7ywu2oos7i5oh355zvs4942v9yiwc9ophruq2n7fjxzwicdtw2fs7r7yr1y0q0vavcv7h23fkjg8k54mv9p6bad3qje74uaqfal5oyual9omoza3ajxz2h63wqdll3dh0636bfbrx02ulj8aqdexxkm5lp',
                flowInterfaceNamespace: 'zxrkkr7ax9ywoh5jhy8jxszfr16qjla3yt5qqybnrzuhar2v59a1gm86qilru8li0u7fww36yjn0589rrenn2mm95tzxyjzljbnq66ujq2b6j9cu6u2cjhejmqvkxe5o0gqxtgazr2swqmrk2l8b7wsjufa0vx1r6',
                status: 'TO_BE_DELIVERED',
                detail: 'Laudantium quia unde sit quisquam sed voluptas voluptatum consequatur quia. Aut ut non vel rerum quae fugit eius. Eveniet fugiat et iure asperiores. Delectus dicta delectus atque provident aut soluta. Est rerum explicabo voluptatem error veritatis quis deserunt. Occaecati repudiandae sint esse facilis molestias fuga.',
                example: 'kz131npgu8cwr6eph4lr0c8k8b8azrulrf22tgi98jgcgeyl5zs1tatpa7emscsmx3wwcadtj9ocmb0zuqaonee580saodzcmdqg9c5lbf6zwgpplm7toyijy4l3b9u264yqzk45ywz9o0ks69doeq5f643m3kzj',
                startTimeAt: '2020-07-27 17:27:53',
                direction: 'OUTBOUND',
                errorCategory: 'xblw2ek0osy3odoj2gyg1bc75eydxlaqcqd85tv3s2or5jysk5fz3httv4ff5qedkru4da72zrfhjwju0l2rkg77a4l7gvbptjyp063aaek0443ogszqg8gb894q79e2xcgy27kh8rtagiwl9jhkheuo6g3jwgma',
                errorCode: 'sxctapff9ml0uhw71drj7tfw0c97je2rh5m6j59qpmpfjbin7v',
                errorLabel: 239806,
                node: 9860569197,
                protocol: 'fwlzz272k5xg9ywonezl',
                qualityOfService: 'grg3qku7bewf65382gpv',
                receiverParty: 'a1ax66ung4dcix4fsjj4tsqvdlu4apa1dzqyf6ly11t52q5abx76201m42q5zu1kkbyyorjp1hi81e6qhmlrsz1acz4ngrp46blnnp1mvu2op09hkiv5rz1556nql0nw1p049i996ozwzsdeut9t2q0r0bkwdgrk',
                receiverComponent: 'kire1tndyjqnitm7c2jsbt1uzrz18ox20zoz2mxpmiipx1ams4ybqjvayawvigw3sy2tf06a7tn0erptuw7dosdpb9i6d4f38zop1wupr9ueurc9uezw9yivk1clcay0oljtb2e7xzbmhg3sjbdpxwqd9yhzpc8h',
                receiverInterface: '51ail8wmtd4d3h3xvdb1vqppzo0lqlon4fyfrym8qjw8rfmftumtv84j8dbpw72sdkdmof43bntz11odiqpalv4iwfgmv9ew9vz7y1qeny0xvvdad65lnp0xt88dbpjq3unqqjqcbz15fogujbz3q4yq0wg38t7i',
                receiverInterfaceNamespace: '31a0a6tw4ok0clv0r9yij5h5me6u44gq4nqyap37w18280g7zloh74pgjhgwp4s14rea4ve6kjbuhn4zuak7kmikf96sn8p5iyjuxczndlv9naak01s717vagl28n5iipqtbizrxy4er6sfbz9aqgbphsad1jdkr',
                retries: 4629317121,
                size: 7866098178,
                timesFailed: 4297263119,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'of72pe81bktdhcmx6fsi5m9cm9n706e6scbcfmu8zch45gtj5w',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'q6pzic9q6ap7jdvl7mb5',
                scenario: 'o9pm3q2ixft07y9ax0ejtnuweg769u2c99fb09cwcsedw2kimno5y8pyk1h6',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:26:22',
                executionMonitoringStartAt: '2020-07-27 15:42:37',
                executionMonitoringEndAt: '2020-07-27 03:29:38',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'j6dilphv0k9manfvaomkbhy3pikz3tmakn7dlopz23jbyr0oq8ytzgce9jg6scq9xylwp8l9tmbv6azqs0u85jv5i3o39pgy348uwpcfkxajlzxz4z1chkorpqm8eeelw7uo7x4v64kefhjpa3twslogehs8bz6f',
                flowComponent: 'pna1b5bmtl8h7ry5oblffre7m28aper2o8xkllsjxyvnsvyrndcg4e2f8qg6b94uouou5gmdow8wn5su4qa9qwm4udhjprfco1ah9vaa17xhfwqfvgwnataz4loj30vub70tuylllw222v1p1op4t4sgbzhun2lz',
                flowInterfaceName: 'iyetdn1go74pufu1s5zt65r9swdmeldsklych0qge8ivi9lx38nq8tqoczjuz0sfk250spgi9j7utpq5llz9jdbgtepgc84l89psrftpb3r7kgyn6zm6f6q8a67qced5sx2k1mgef956o550vqzo0vtroomgm74k',
                flowInterfaceNamespace: '94iiht0hr8h4pafu9h3429tbltl7o8x1o7udcbpkagfawsp8bv8niz0gnbsb0ao972htmu8yfp660hjnhlxzkviuuv7jj3me2isaxs3sj4srmopreq83tux9nf2bgksdnojaufk47h606lcp0x4glkd6drfcehad',
                status: 'TO_BE_DELIVERED',
                detail: 'Et laborum hic quis optio blanditiis. Quaerat consectetur sapiente facere facere. Quasi et et ducimus. Et nesciunt suscipit eum cumque a similique qui aperiam. Voluptatum qui rerum atque. Rerum architecto libero dolorem molestiae veritatis in aliquid qui eius.',
                example: 's4tdhrp3w08n050pdoo69whb95ehz1irjrjyg0vcbyjqx0floy4gjw5bavqmtvwxnu69mba7yuidnvjm4jir0vbhjiz5xmq1o1u94m8lel9rhezviqp23655fc3c6jkq49xx402w54qf9q0red3pfxooco9w2omna',
                startTimeAt: '2020-07-27 15:27:30',
                direction: 'OUTBOUND',
                errorCategory: 'jhbhog2s55x18xw9iiznwj4upzgk5o62875oe8wuzzwd49evoofxe4308e88uwyrizxh8v9pgiv4k94c6p6tcj04xtc1x5c7qgi9sg3d2vomy9ei5n2qg7xsyc23p4pm626f5fopz7gnw78kydi9dkd6tbz5cvrt',
                errorCode: '95vxs05gqgij1kwwi2lzw8zn6jgh7446dq0to7be1h280porvh',
                errorLabel: 257157,
                node: 7076474078,
                protocol: '0yltqs4eqoc9pt7sepbb',
                qualityOfService: '5a5stblebp9i6yzphkvm',
                receiverParty: 'ozk3lp2cmoqfza6ekp0idqbhgu9dnst31yp1vbmk0x3egwrsz2ldxcw0t40tm09ud79xzco0gv4teyxqyyf77zn4nyp8s1lponppo93mexyychp7uu0ae5di6j7wyncsa2v8rdbwesftmnpqcbzo7m0y61y85goj',
                receiverComponent: 'cafzj2degxihj70p9myjt34xyvk17dkzuct26fm153vd53heq04vgvix8czxdz9x84oir5e78gtui0fk2cn1dssj99v0you031tlg1sgy2z6d4c8dspy1jzn297kubq6napt71g0bbc58olt30valqbfhynwzrlu',
                receiverInterface: '444fw6uspfy70fnjemzcxjwc69n6r3jmyt45ui0eziu3mmx81sviz1vwdescn7h7r9m91xarh4robxqki4rej2li2xkfh2dg4eskebumwgbytr9vxeznsiduf2rnyv02y1dm3c177s7r3d9esv5u4lak2uyed1m3',
                receiverInterfaceNamespace: '3i8xva3rhgd8yymdfgm66lqzhwx9rgurnuiclip80f2czum45ahj0m0h9enjxkz22i49mmq72ury8sk6k5jxjkxie26ycsajtpoi66wnli8ihbzqqmqsujoexl2574zsiob9zr89vgxuni2jxy3wygg0w9ejfowf',
                retries: 2964512878,
                size: 6406969678,
                timesFailed: 5543463785,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'a8evduuuekp1h6sb792z44pdzovblzz4wu2tiv3t6azkum678r',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '5d16mih41pyfkw2s8psx',
                scenario: 'byg65uk6fe63n22ncliw7jrskx23r3x7tlywfgwtr28l5g3tl8ienwoqpvev',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:25:57',
                executionMonitoringStartAt: '2020-07-27 10:31:17',
                executionMonitoringEndAt: '2020-07-27 22:06:20',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '872veyionv9bvfoae36befe3ztfmgow0oesvri53rg462l9b7g8pbtilcfqbojg26t6an0777kesje6g9k23khhml4ez1fs8v2aclvjf6w74d7nl3twbfl1stmwf8av659hsqel39zem0gqysywbnuu2d5nukwik',
                flowComponent: 'c7euelhoi0vzgzc7fflzjrf0ybgs55blgizg2wttferly7g0p9cogz8n9kvthclqz6naqemlvfza8qogq6w5x4ja9hmteeh1m4rzjc6ndtrmh6j0nk2w37s4kv7mimdrfbs3yibucy98l20au8foy7jidkjr8nti',
                flowInterfaceName: '1fvwaseldlk89ka29mf19zy02tqux8rismysdklt340vsyxv52vd87oat1p322lx9v63f171toj0j360iyuapa1e9chbosu2slhomk6vi0agcq98tqa6k616wad3qho108t6t31bbifmi3ih9t9qtr1m9pi3r98y',
                flowInterfaceNamespace: 'dctptz2r2r4v2uxi1xvwthv5nx0dqopnd9xhaan1ylnnzbzq0v1zoukef1uz7azayzv8mzx7at18uv9y6depiwcucgihu2uysiqcx1f6ul1gm0vqi49njom50cdau869y58moalpb2h0j4qy5tv9fd6crlzcg9ta',
                status: 'DELIVERING',
                detail: 'Minima ea repellat enim. Et nihil dolor aut illo. Est a voluptatem et quam pariatur et aut.',
                example: 'n552v3ujlv2rpj4uztml9lhtp6cibtugq0iyyugjj3f6tma3t3jz9jsy20a5wgto6z4yih0xzb3oxjw1644dnb7n610dsl2l8s2f3rxvvohrjlf81khd1gpsauf5yi10xh99p75oh0taa2abammpmfpk38pstcvf',
                startTimeAt: '2020-07-27 07:12:01',
                direction: 'INBOUND',
                errorCategory: '9rl7t9b4b5it4prywlay6sf9z4gto4kv8g8g1d4a8tg9ycrb1iik7at68by60q3v2676qb592pjao4m0m99ibx1otw7khji6il2vyki8oic0s0d4obi2h0x6sxgslwm3zzvhy9a7d1jp7aawov6pdwh0szpvfitjx',
                errorCode: 'cj5dvr5p6zje29a7b6qyun2nyzxya1hl9imo187wv3czhe9ecj',
                errorLabel: 511738,
                node: 8016406718,
                protocol: '9yrluzy39xh53kfgdre8',
                qualityOfService: 'otonuk7gba2ld86afek8',
                receiverParty: 'ar401u3hfcqc7k2gt00z49jmr76n8r7y685nluzm3fzgruxafnnv56hrlgqy47faokuwxja2614mvuf77z7kgsyerge83ovw4f0j4sipqp6brtxlri31stm4d1vzjkgfyf9i72xtv05soe098toi2veqlt36dk8l',
                receiverComponent: 'vjhlk40shh5cjjmaqup2n33rdddwc9a9ehqbx77zxuyf298gt2pltq1v7boxw7l96n7q2ijqryeytnped28a476320ke2n0p1cdgcpk6zvwmsanxqm1zpd7w3t17hw6x1mgkgl0270bdtis6wby9ps7pdo3kbbsq',
                receiverInterface: 'esyr4imsb9sbicfk42uur6fodgparny5ltvohql3u2zmi9uc3hqrne2teddnbo0ig4g1t54btwqephcucbv0dblrfy2mf9o1740p7wd4tiv8miyk7mpqpexso5y51qy1eci7155kc8b5yy905wref1ee57yx3i7v',
                receiverInterfaceNamespace: '5hi45rzehxyjr52wdbdysv3ity8c10lhnbvbac1ki2d3szrogoubb4bbga0ugni8b6z96jeks3q9bah81frd9axjnmyy1gg4enhrylov9urfyqdwk6dtz2eys8xfdnld61enpco5ai90gaol5zafgm6sr1zcj5xv',
                retries: 4034477358,
                size: 9148355144,
                timesFailed: 8271804985,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '22jn3sc50j18fx8kduuhm48ft1j7smdcdpd8xbw6bcia8w7h7q',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'zldpaorcfgo50b8163oe',
                scenario: 'j91q61pulhasvbmc8h1njlbti7kt08gamjv2iqrp43dskvo884v2hqp9b3ww',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:41:03',
                executionMonitoringStartAt: '2020-07-27 05:39:49',
                executionMonitoringEndAt: '2020-07-27 19:37:07',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '7zdfi1m6cn1bl720llby4vbd2ud05ocx1azdiy7nu2snmrcjiwuvntbq0unjeam18qz4sl5uct2mlesw0rpcf6penicyojprupxlwn1l9e9ahjqtqjcy6g6o2dsk1j2l0bjgxwunihxqrlee8apv1fqr48ymeydh',
                flowComponent: '274celptfb27whe48uklvc1fbeq147mxpacouzb1ercpnbfmj993j423qpheipe0n3s2h9yw3q60od59z3jy32i16yvc50vpf831gm7eebq2qd0t6zsn3tnkczgwqjne62ki52gzbvuzorwkwd4lfruns5l0g2xt',
                flowInterfaceName: 'qy2g4wr92t2nghy3gddzr0lvjjuuo70sc8v5lv93eiv537oh6fo555h9n1rqh2v8hn6rxx70js0ncvnvq9szw3bpxf9zsdpd38qqrr70agcod4ow3gnqqegane55kgcx1yym61obu5ira3hg8udn2uj819q4gr5k',
                flowInterfaceNamespace: 'bmt2ls2hxqgkoc6brghlziv8tkn8iy9p95ywbbwi4wzfxa02p4i5whs8110ixfrpwldx7vg1zx3rjp5eini6oe4h4bdpmqupdv5ykrbmwv5u1tiyz386o686j0vapxlxghd3bk49z242s9ckfrpqeglbya632e5w',
                status: 'ERROR',
                detail: 'In eos itaque rerum sunt alias quas. Labore laboriosam labore cum autem. Facere eos laborum laudantium est provident rerum dolorum inventore atque. Consequuntur est dolorem dolorem omnis ut voluptate. Voluptas vel inventore.',
                example: 'azxoechr9jauvfcwnz996vggleos8r9w5zo9a0kwt5fwofx7vfij8qtm8ntkdfnoyntpxatak3uyuvplwbmpaatzvkqfe6grl4nw4m2tr7dlkbaz1gkg8wxi0vi3fgc1d4e2lt5f924dns5xzcp9l3olppju2ao4',
                startTimeAt: '2020-07-27 03:57:46',
                direction: 'OUTBOUND',
                errorCategory: 'f2pxt7vprtlf7wztrkeayq39ka6qbl0eepq6ti7gj9s8fzhkpkifujlm8kx437o4tw062m1df1lct13j97wnhg02m2rsrugljmcr4wbzoztbax2gwhwhz6rsu1l19i0u1x35qjobjie7pwuhben7bvimjpzitohs',
                errorCode: 'bnfe4n9rj47ktyfuxs6xnk7erptcbzmvagnrfoczzvrwfyqur1x',
                errorLabel: 666910,
                node: 6157513731,
                protocol: 'ycmgcdusf4unqg2887e8',
                qualityOfService: '62ya1pf1ifli7fxhpcx0',
                receiverParty: 'ml6j89e26ydfyqrktln8aex2q379m3okq6of5jqy31lusfj8snkgnmum2s8ph0y3pywgd8oehryyuau2twda99v28kzopqu6nqsnazpniv5fcrdweck25g2td4zetqz99n1331dodglk5laa5k6h67doulk3gowe',
                receiverComponent: 'ed1v78xkd8up8d2xo95f1quub63hww10zgz7cec4ygfsrk2itwvey373f07iw2yklagcy9j6la7woaftx9z9tibebpbt6l3r9xsdom0f9hj345cy7a18jizcecbu45klk929awr4xgniqj111fgwo69v1ll8ia2h',
                receiverInterface: 'o9j996kaf2arksxt1y0ljeqr4psz5vlryqydc9bpjz6zxz2y1v64d9a77dzg5qco03qnl5trcc1mc17euwbchhgu23iojvhh4z49168j4x4de2t9j2aevq42ywkhdshs51q0b68sgs2rz8ub6wxn8vq4sf4whkn8',
                receiverInterfaceNamespace: 'tbkh3bn7xz68ixlyv7pk5xhj0f7grlatqakkihyvuqj9ykgmvckqmod12692t56d13joka61v5rsu70waif6zst63c78rmv6h3sy94hig49mzp602zgk0axbilbiystmtidqm96h71zsrph2qo2uo99j5jhosoqj',
                retries: 3002804444,
                size: 6602841957,
                timesFailed: 7119794647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'ipqyflhvovnjt5x29gj0cbe1u4kqan27472iv9k9idh0d8j19t',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '9i15p3mmdetjzi4x2zmv',
                scenario: '7dkjdgfb2dwp5ilkqyhzl00i2x0nlgdlh9b4bgri3t1yomn34pn5kr02hut7',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:38:22',
                executionMonitoringStartAt: '2020-07-27 22:52:45',
                executionMonitoringEndAt: '2020-07-27 01:17:17',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'h6s99q0u05gvfty9wbxes3pl9y00nzzipi0loahfasykz84m8c53x5y23i0m6zq0iry9r3pti7k5zaf2nui2ohfp0levv0g3sjiz7dubx7izpcydh7h3anudn6hhgobpqxbrt8q4ubuyrfi8hqblr90r6ahxkees',
                flowComponent: 'w5x61q821mbjvcojgk5dn98p7aqyct9vs0d9ydxbmrluk063k91rew3lgbueg6ahonq483uyd7j8ypbk77oq4x3g5h6rh2eiwaxf2sbgc5tdfvdaozyh1v2mrasxk3fzhvk81hyf8ycz0uns8tv9jscwsst5t2y7',
                flowInterfaceName: '6reuakqddrgqyvh6i7a6z9mmt5fnpairx6xkoba099sa4xzkwnqvihrpyzawps84nc107za6hxj4mn2l963qlmm6dn07gpuk3d6xoyo65s5awqz5fuisvtq2wfdehjti58urwbfffcpwq56qtzxwt18fbeqcg7z8',
                flowInterfaceNamespace: 'aafk3yers69gov4clax0ikobnsy3nqg3eu8s2f3ixnyfyvd9ll421syna0uesrh6xvwgjm8a6wtj8vddyo8frn3ow1iz93no1kl66d3f9sn9m2rnzs8ih8m252yfklllgkfwyhi8pfooubl94oxn8stnlkt2i8vv',
                status: 'TO_BE_DELIVERED',
                detail: 'Totam nam aut quia fugiat in nam aut neque. Ex aspernatur et repudiandae occaecati beatae. Qui eos modi. Fuga alias nemo molestiae porro repudiandae at rem. Mollitia sit sint dolores aut atque. Ipsam doloribus assumenda ipsum adipisci.',
                example: 'slphcmzxal5pvsgfkvv97rld1hm62wvm3wlptb2sd3njm9u4j6dlg9x0yrcwoqra65fke5hashhqpoc7c41hfrf6aud1qjv1nkxx7hzkkemt2j8qnyi3uc16tahnm7i5n39oxfcuy7djamau9m19uftwy5uwx1ih',
                startTimeAt: '2020-07-27 10:44:04',
                direction: 'OUTBOUND',
                errorCategory: 'x37arc58sx1zu40i3u0zqutjj1gub6d47rfias1cdjrwbtl6taq7jqbvymboora84v5zrpxknyn4zjxu96zy9ucpy5liigssrm2614zssql1ynq68a55vh2hzvc4a7p5z5uchps5sge6ews6yhyvxtmxb8n4ol3m',
                errorCode: 'g7v0dziislvn7i5q8z0b08zv1akdqlw9g3g5qhzmq4dsw7tre5',
                errorLabel: 5058289,
                node: 3991234756,
                protocol: '1sqqhduw8ndii8vpeprx',
                qualityOfService: '6avo8314j8ajscbbkxr2',
                receiverParty: '7ky53yp0dc3aruutt08rirggh6ppnws4pk5w10dk8dtu4556ipbaiy254fx21i9lzupp1r57oo6fgu20sifj5tqf4xezq6590ykvi5kkvl44pdptrc8ezrs44bh2e02zjsnr1dlbqikhzsdlfw41673erqzx1ual',
                receiverComponent: '9b5flwvj0k6dj0z3mp4bt22g3m4wijqzyy95wx32y2cjslkdio55dt5hb13edx5tmeonu964rvaam02qq4hbul9vfbo74b1hydtkj2odam5wusxc8t0inr4rb97emlkggrsbh274dq6z1fixuqb6tup80ouv8wzn',
                receiverInterface: 'stdourmvsat73p2lr8a66cd6k43evm09duomns2buvujt4zzqfhoqc6p4younioadcjyu45o3zos0f733tb37wxhyx52676vle3shpsee67y56vmiidnc4zi2gn01se41kc892sf0xusq6nmlwpss9mn8pw0ytqd',
                receiverInterfaceNamespace: 'u0gp1qisa9gdad8356yrvxa72ua3iwok351xf7wx8gsgjumxyax5j7knrlotzuji5u8u1e6f1n43k9bhq8ydn8xt06ykegvq6agiaxiwx561agfo0kv5lmn61d7n3199fiou9gglwkracjc31favaqmah85q4iad',
                retries: 6075840997,
                size: 3051497217,
                timesFailed: 8758047600,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'dsosmnaetlz84i4camb2mq15mzcvtdgebh7dr7ct7n48le4tgm',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'oj4ulcj3iq0zhjo7usni',
                scenario: 'm6upsfsa1mpevuwg0wq6kesvoglmvkpmvhhofco5aewid75khb5uxhffip1u',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:29:05',
                executionMonitoringStartAt: '2020-07-27 08:21:37',
                executionMonitoringEndAt: '2020-07-27 04:14:25',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'rk78b55uhwnwiq1bjkupiauki5oo3ukfu6fgvl9dkwbfkhp768vmfrqdq9jogqip33wzmmrlmw4l74rqqkjqdaneqof6hatmsvvk4ntqthnwsb1zoa0n0ieb6ztn40r99kr21izsb7bc8cr455newh316kge6jxa',
                flowComponent: '6q4e9654uzb2cp14zrm9wrxy5fv73rpvm5nti98k0gmx5hrsb3taub5e12uc3tx7djzyfwufnne9ahtcx4sy0lam2srud5j8qdxky7muiwadvizhjg9rbvp8598i25to1k29sxgulc8urqhm8m9e82xbfkaa7wuf',
                flowInterfaceName: 'ehhsewnnuua2k6e7de7n3yaa0xxi9ngeifvjfr5fpr7l3r4sqyoijkwz9uqmh09e2nbepakfoslm35opzm8on0h9f0fz0o7muaj55tsr0lcufvq248vs2lqndno3r8257zfxtuootiu5ernskk824cn45vczaear',
                flowInterfaceNamespace: '2waab7ztft5hp09akyix3g9lo5wzbo5071wdltkwb856qpnv669q0quofgqga33c8l3km43hg443y4h5gi2use9kw1qs4ln646tvr5fn83ldjqzsmweihtbqm2skb048djvj5uftidr34bbsi7ctvcfkfesqonkx',
                status: 'WAITING',
                detail: 'Ad consequatur similique omnis quod repellat aliquid. Asperiores cumque iusto. Quasi dignissimos sed perferendis soluta autem. Quia unde sed nihil ipsum sunt id repellat praesentium.',
                example: 'uivoi1lqjlddzjzsfvdvgv49iiil69qmwk9xpt4hfivu5a793uvz8aooljhpj25q5qh53uj2bxo04nmcwyfznvy44woy677w0ubu9ttfqusx65lochlzlfxg616u7qteoic4v9mvgr89s733jdrxyn2ir7zlh47k',
                startTimeAt: '2020-07-27 19:21:22',
                direction: 'OUTBOUND',
                errorCategory: 'lyrn1lf22byd29dsg5sdqzkebdmvulj9xxv8kgnlu33414iuieuqxkbjzuc087sb5u42hys69d89csf3miibkp8dv8t8opt0xzdpu9vyc9ge5z7zwa2svnv1msrpx9w3lya5eoh256cc5fun6avwchs67vhmztto',
                errorCode: 'n7lft25gk2p3i4jynbmctejz3gxj1bg5alwpefm8gmbdl0g3xd',
                errorLabel: 631374,
                node: 68287169620,
                protocol: 'dogw7lk059j9jmj3kewl',
                qualityOfService: 'p5tdhkegkl8g2vrgkhd2',
                receiverParty: 'n48bkrzobv45fu1gs11iv3hpqhk3pkmpdi1lojffy1598felrae6dkjp1os2ocqu3vwdryukgzb963wc00j40xhw09qei5iemdxzyfh45cm2txrwvqxgwczzhi5h4pg69dga0hoar71buf1l08kgmhsuzwkirxpf',
                receiverComponent: 'l9kgp8x74m7ezrpgqoc71nn94r4b0dy33t5non0vqqfaz3vpgfzdq0i1p7uxa33cm560rv4f54yv2cxqj4lrtqa5csxdefidk7ytlgt5tmnmyilgkk4dmp14w82prm2b9b3zoig5acfijsj86jqgmh1l34uruvz8',
                receiverInterface: 'atesfd5jfj5q497j0ze4a9l4d9mitxnebta3awodbm2yk2rn8lyxt36u1gotzwbcnvr3knvqa38we7bxj55m0jx33u4vmy2uf7iagdfnlu79e052mjv5i7uf20hpf7orbxgf53txyy9jimqh4rem0hklu9vqys5b',
                receiverInterfaceNamespace: 'gx2u871iprsxpq3cd5x7eyeftltcpdlkmwt3ilvhwhn3zha0l6jexy1tqhenjgod667rlcttnk387udp1a2vwjnunm4qv5mp6r78oo7y7ud7tga64rl3lrefg7i3b0n5sbhyxzrk8wtf3m5rr3ed5lj5lb8po9t7',
                retries: 1486524012,
                size: 7685357782,
                timesFailed: 6082494407,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'tp942ih4wulb6wxmhlbkydzx6ao00torubgyg7j9vj34lcyj91',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'gg0v4o94jfrs0blhcprg',
                scenario: 'p86owuhjkhatywom7iuv9vpzz525y2xcb9xmb570e3otktukiya66tyo3f2e',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:14:16',
                executionMonitoringStartAt: '2020-07-27 18:14:04',
                executionMonitoringEndAt: '2020-07-27 19:30:13',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '68o9bcei5rreu9rmyzqm5eguwi1l9d514lruhvy33ql6mgrvsndjhfh2wy90qn8sb8gjk9nwt3fbd8b69flf4bllntn65lj019ozjq4k4u4e2lakbn0r0dffno12es99sgfp9eph6h3q4f1ithw4x2gli46kz924',
                flowComponent: '03sba66wg6ravjif7ip4r3zms9g9aq40pmr58k0en4uavjruog0rzm7zgil9rqztxslbtq7qevmskbtyu3nqyl56nwmbcdu4432vc4rnqb32v3n0lsrbyxjfj5n5ls7o04q3ezc83hwxb5b5mzs81aqyfuvio0en',
                flowInterfaceName: '6urmgo9r6tyg9zsva5gpfyc7qijbmip77of7rk956wsjxs597j0qv42kb8miasdd4lnpaxw904yz65bxatnr82ij8dr5pt8fuzrsib5ivndg2mrr4tfbkgs7r1yhigekgtiu694d13leslr6zak0euqr667m3edx',
                flowInterfaceNamespace: 'm9bqjv68koe971eqo8f8jb6z3sq9839kdiwsfp9sbxiqgw6tcci8hiuqvodk3uek3irq8ymx7gnqhwi0alfbo1qltrv0diiry9zz2xl94cwc5b99icgi6vs31p7wl2tkssm4y8tuupc69qx5srhtnmgisl8s7pm6',
                status: 'WAITING',
                detail: 'Aut in a facilis animi iusto exercitationem placeat illum minus. Autem qui deleniti voluptatum. Laborum occaecati dolorem dignissimos illo accusamus.',
                example: 'eiugz4s9o2v0kmy6w6o11wmrcizevb5ie09i62ydbljpgwnu9bl37d16awbzk3ajh08h9n256nx6m3dgawp4lgka62kzm93q7rc7id7qd3bors5n45ozfjovynv65dp9quorqcytv17rv35m84t4qo6sbtozhvy1',
                startTimeAt: '2020-07-27 01:40:10',
                direction: 'INBOUND',
                errorCategory: 's31jfid493loey9hgj133sy815dhsijcey0w18fwbar5f9e3gy5elpuu3ynqxtn22656og6xkbevputepexhbh13pyu5d35bmsibc2yvjsvhukj48rcgspvibbfz7m9uaeg1sl16ty9gll7sykdyevssvpuv1215',
                errorCode: '68fhc0zy0j0oasf35y9wa3m026kwdf695h71hb3aosem70mzb7',
                errorLabel: 213270,
                node: 1114573403,
                protocol: 'xbf1682kh0nb9frdq3i0z',
                qualityOfService: 'blt4s1e7kn0gq5icx91o',
                receiverParty: '0wmw406vbvyugub2czb3t7ln1g019kgmitx4i7z7agx91lku3xirbzqyl80x54ad2lzdufj7em4ogn0dxyqtis68nx3akqi5ezj00rvb7zmkv2lgfxsw61wjg1rpmfxqm7grn0mgjim2pynmg4za7ax2fe9b3ug4',
                receiverComponent: 'jmy7bpj76mkrzxwb8xi6hubthnjh0v8ksxq133f5uloo22hn6lb6znlz6pappdhx7hrrohbfba5h3o7qlsedl58mlxug204t3at2tafh92snkqjlffgsh923762hzuf33b8s36tyi3rwaonp1p29kgbu47negt1k',
                receiverInterface: 'xvki18w2jqkz8g505wgryhrht4m7iuk25q478gugdojc3omc3kv8m6wxwr7wqk0b9m31y45u6vesm3wvbwx9qr3c6vfqx6nkupfs7x9eztwph7j0mdshshyofhd9d4pu3b4jfpei270c5ie6husff6h00dy5aerv',
                receiverInterfaceNamespace: 'uxwlstc8vb3up824m4yzc97qck22q9mlvmna3n0w6hkw6cl5mtynwtwsr5ejz6j2b9bl7clwiddh4281ki17d895hw3xvqzkng9y2ungwuxcd61b8320huvesxx5hf1zap74vupf8dbeo9bbdw0jo8u7h2tfg88c',
                retries: 1602304192,
                size: 2205921375,
                timesFailed: 9675630563,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'dlepv8uisvya4zlnf8x1glpf528bsjzqkfp0d40oi3vnw5n4z3',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '6xj5mdc8lxf4hm2bwn1f',
                scenario: 'd93i79lih5cz003u0r2mcvadpq2sqdc3rfvblyafjcb9nmtv006v6pup68zw',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:21:02',
                executionMonitoringStartAt: '2020-07-27 16:11:41',
                executionMonitoringEndAt: '2020-07-27 03:18:46',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'vrsyiojfgq99etqz973oj0n28xngqa3wc4g1fraxf1wlwabrcdwj54us9rb7b2d30brhkjuphjt80elx24bi78r68iat6f15c6nlezmox94owry8t5h2c9znd6vixktp3jwg4i9pcrl41reaj8qfbi5yzs3fhizv',
                flowComponent: 'ap25p6mo26495mreoy570x3q6mztjgkij97948oqs4qjrmzglhcdqjmkoasvjvci2dvu3sh81rl390fv59ziwme1kvk4akgzop5bsplcinjy0wzt4krg2pvpdsrgmgm8iik2qe9fy88jy64taqfm2a4nfv8w8xer',
                flowInterfaceName: 'x2ww1yklnq8uoyujjtud0t5lvl3ld61gl0e7w0uxm1zeg4evvfkwl3gwhaaznh575r46xcdbx4toun3jc4xezddk550nvfhbodkwks22lhxxhq52u2utm9nqjve9hzc5ha6ia9tnx2rkl9aqisrpqe6zviwwin6u',
                flowInterfaceNamespace: 's6sgwfqtn0eah4ng932ayovq7e6jau49hly51fn1y692nxfskghxuqkgjjuz1n2qb2dja1tjmg1fjwgap6oejw4dlnc0j9b9ioftyc3uw2j2ih6w25pr3710rz6qb0fndf8jhhsn9r8l1cc2r46ouans7nm0o0ow',
                status: 'SUCCESS',
                detail: 'Molestias officia modi et dolorum rerum assumenda sit. Qui ipsum distinctio eos. Id sit exercitationem nisi. Id deleniti molestiae mollitia voluptas omnis incidunt ut eos. Eum hic qui possimus asperiores.',
                example: '6br475lpgdaflno3tkroj9ninp74blsgjct6cds5lxo85pn9tqpqgfk9djjk5pck4sobnmze6inmm2a6gq0iqwvdakmaqr7zgg7c1k28pxod22r9s69yaey8xy14p218j0nmhoqvoa0ec3mvzztk2rldqxfewgaq',
                startTimeAt: '2020-07-27 19:12:19',
                direction: 'INBOUND',
                errorCategory: 'm16spth2gy2gg94eb3rzfvzs5hf9992p6io2adouciuce6h5tn132f7ma1ceeypjbdn07idkbgiqe7e7hxp1iwvb4237qnqlxohnfhe13m04jiqzar80bdc9dxk7jm3xlhrnkfbx08b49n0uodqm0bxwn34xvkjh',
                errorCode: '2wu7i6d8rnj4lxzexk3xsconmp5kuvmnn2xkmzd84augwvrzzs',
                errorLabel: 575075,
                node: 5704757681,
                protocol: '8yatwqge7a8yih6f4la5',
                qualityOfService: '2kkz3fwlz8nmshh0cwcyc',
                receiverParty: 'u6435g9z3cd904ri19m0e8l33mdfv4xdiecuta6puo4bx2fc8k5ferm9683dhacz4d8egqo637wq7xfa7ae4ro93zx1j633a3d39m0ejsboc879siqikt8jx3t4tcat8zcko84nt2i1vp58vl006py2k6hf5nymr',
                receiverComponent: 'zqzwkcmuk68839bivfe7b42b9oiyrocuspnygzienciqokhe792h1aw0yd6uvfupvp1vhnienjs1e86768z1mf9lyo0gv3i8w9740b91h64e2rxefdvp2otexq3unovvg4x41msw7yciixltl2bcpbxja4xx9y60',
                receiverInterface: 'bnvgit8117wvnhzbf26r31i7bz2y01z4vsjye0shmfbbwxvtzb87z6w1k2gydkqob8782g77d4enhp4zhs9qz425ndi1xx7bv9x4xca8qbkfqc2322pz8olbt1ox9nl39hfvk9ni758kdbo7xb7xr9bpvcj664ki',
                receiverInterfaceNamespace: 'vhjmhi2jw4wtwvvyaykyb777ahpi7m66v0rgeulc6j14l81gkb5smxt5chh8hzu4nr1at9upykufawt4donaizx4s1v6nn9lkpm4n2s5rm9mqhhhdodz4szhymxanq1o2wzxw7nmi4kymdxhrh8jjm06escwskzc',
                retries: 1513724617,
                size: 3370559696,
                timesFailed: 1551742473,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'ksh7ql2u2io5vlnp7wevbsx5uur159y290fzxnbfwnxzxi8t4x',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'yz5t7onc675dyqkk2qcg',
                scenario: 'ok96h4znl86sp7ql3xzc73f7zp6zmgyky83oq3wpugb6zo92x5ui92nooub6',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:36:14',
                executionMonitoringStartAt: '2020-07-27 09:58:14',
                executionMonitoringEndAt: '2020-07-27 23:00:03',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'lp35m0b70i06cfn7kbxo7n0izxmmapx7gz5k4hnt0xzxs9zcicecz6efalhr8pv6j41p0g1pc4609hh3sv8wizmb5vxbepbw9aeisizrpx3k8vgp4rkbqqid9wn42ynp6duflu3l2t0wjtzekn01bgtwrscwplhj',
                flowComponent: '19c3d3pbhxows9d751q7wpin5z3fr4i67ds1mi5iim45hef6x0q4pklpjk72hgnt6mg4r7xw2fqq8g650mmqe94r488cqll8ghewlf7u0w3wcfo9w2990lthsypvpw96eoje6ed2q53604dd2pj8kba9ifhsn3a5',
                flowInterfaceName: 'knvlq0eycal0coei7upgucarmjo2yjto9vmrjpy4ca4uz83yar7fduj0hv6zoyni59w0sygwu9l3zq64y5zipszgxfxf8lefhi3io7gdey83zqrnn9bvn70c7w6leetmwj7yuzsv0l6g4fj4frwgzmti65uf406r',
                flowInterfaceNamespace: 'oh88efh5a6gxo9iszz1akzzj0zgk8oqxp6r32vzhp9f15hfhr83lxmb1tva0ssxu1vfjzw50jq57l4jrty7zib5a89bwitkg4g6gbsmq8asoa70q09jfg5s4bg43kwcuhf8uiuw1n6shivslytvvqdu3f7tr64cr',
                status: 'SUCCESS',
                detail: 'Aut est molestiae magni. Voluptatem voluptatem maiores delectus dolorum consectetur. Numquam ducimus omnis harum quo consequatur voluptatem et architecto.',
                example: 'pt5fbh57s4gers4zel5yozw4snrr3lfwg90eb41yqv54n2vappwxm3rxeyg415fimgjv1gp5uht9k23bzik9kbal7yzp5s1p4bgo0ivd55c5czf9tpzowxve15n4n3vbz1wdrtrpbsk3yr7vh02o8dvst9ipv75v',
                startTimeAt: '2020-07-27 09:05:59',
                direction: 'INBOUND',
                errorCategory: 'o03zqqlbk7ep7an5spps8v6ygp8jsywo2gyy3xptn1n2bknhl6dij15enq8ml7vj6kl8kpb8zchq0xpdjw0bxvs43tlgiwmo1vj7iamashezknuxpp617fon2qffcbmc83y2a9fqbu8c62x2rohxgmveqexi1jvv',
                errorCode: 's13ed2alracl61xsncg396829dp43z6f5hkmj7tbpjklg45kbg',
                errorLabel: 551137,
                node: 7740070400,
                protocol: 'yq5z5i2n7yoq6v7q2jmb',
                qualityOfService: '1hku0aphmzk7k6ta332j',
                receiverParty: 'rlxqxlvq4pr5xwcxrwnsfzdxpztfhk8ixk63snf1dg1z8ae21vwlrgpsh2pk2ksvy84l762q3z747ggr9tya1geu9wxc24ribiosk88azpke7lb17uzxj23qh05bcgvtuza40p3nir6jczc5k58ig2nygiv78pmjr',
                receiverComponent: '34g1611dcod89rf8iu5tdxmrgqlzyjum8domepvisxpjzdc4oei9656i71dwmguminlv5u2uce8khshina5wec0i7w2y4jec5g3z934o2v008r1o0ik2a8m6y0degrf7kc5mdgtm92zmdydd9x4zhua7n29utysz',
                receiverInterface: '4d1nt1g22klhhwqjvxo2k283u6kr6lcxkcqipgaykzwan79hg9k277bbr50f1c535g2l16uppkgm7mvr2q8xxq8iybojk4y4f3atgzxhtcuz0939ey1w6oyt9ya1xqzv9murlu3kchrhzt1vrj4ib2hnxvrmblbw',
                receiverInterfaceNamespace: '2g3hhfg5o3haixgkjrllv2vsdd9h8tug3w6k0kvx1qsqwicj2a906hjdsnhvsmudqxa7uwpc7l74nz8g8hcnmibiq8sg8jwqmhtuf7vazi3bkx20qtc0wwfat360opsoyiw9hxr3z1od8tfaedmybva004ge74h5',
                retries: 1924572625,
                size: 8819668691,
                timesFailed: 2596862697,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '9gk2wxrlyftq8fmp3mv3qz7xd73gk875nngl88u7q8xkra5r69',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '7jtunqbdls44uw65fdq3',
                scenario: 'py9lpvzv708wdmc0rmzmc3uvkah4c9rf9vbui7d384cje0nluookcnkd0fab',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:29:12',
                executionMonitoringStartAt: '2020-07-27 01:57:23',
                executionMonitoringEndAt: '2020-07-27 04:55:05',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '2capv2w66k92xu052jmofnug0apvgf4c31ai2jh750ti6e7o7kwms8y6f84rcrh7kkftmjb5ew44e5ncgm6u16ds5ues7zl1s3c0rr7gvqvruuxteiwcqyfundy8exml10so443qip9lb1wyiuobv7kyattsqrb2',
                flowComponent: 'apxp63hhxj1w8pbihvor981imw0af8b1cdufyqnjch9v0kd4in8xj5sju4ob53am0nyeocavenj9floikzkxyvsfqud8ceur49o9yu5kc33ig6qjdiaewhxmm6z7mkjbzyi6kz1vza1dhvbcds7embzgptsz7aku',
                flowInterfaceName: 'cm0p439a21kpexodzs91sn110no8754i6msr6zpr8n5r68o62l716kq15ostwy9n9isy38nsc77q2w01tvhysj9pd4b3yrbz9vh7ww5cses9m81drtcdwiv34ackk2d25s8jqdm17iyu1kof0htnxryxd3a6yhc6',
                flowInterfaceNamespace: 's6xzk9t831nqkcj5pxm2w39orzl3j19ccuqo4gupejr7usfnvzukwbxgt9vrf1e0ig7gt6814q6o1hwgm3zwbca4w3j7u42nedgxhc9gnn0r0f9rvkdbud3gldqvtryl04006xdb0kb3708wogg1chxkpywrn7r8',
                status: 'TO_BE_DELIVERED',
                detail: 'Perferendis qui veniam nulla quidem. Aliquam atque rerum iure debitis autem quos voluptatem aliquid. Veniam tenetur nihil ad officiis maiores voluptas nihil. Id inventore molestias possimus voluptatibus soluta. Sint consequatur suscipit doloribus molestiae consequatur.',
                example: 'nucw0lfykf5qu2ehrkzkf1whkj554prz6dy1dlc63htg2281ecpbbdmqm53ucjqvoi37i12adshbhirkzdez1ll1b2vpeoxzlnxcphxw9nwm8p6ib3xp6yppvsi8aoqcxkg3cfm26mfwsstl7te1ji31ip8ycjbw',
                startTimeAt: '2020-07-27 05:42:39',
                direction: 'OUTBOUND',
                errorCategory: '1d7fmfeo4u0539wwx94oofmtmsnbaw7n7i098rt7rxlm8rdd3qka90ouj5hjnggk8qfdl0s334diflfg67uy4b7ge5kq5924za0fdvtue8f1nnoy16tfmpja5rwlxmmtr1r22804r3prer78i858mp06lirhgkcr',
                errorCode: 'ia2zooy7hjs4e8x2ubbt1jjbvo9jfqgxmytsov6qddcrhtjz1r',
                errorLabel: 545897,
                node: 2081943239,
                protocol: 'p0borxtdnwl5hoagy5v0',
                qualityOfService: 'av4ao7gasmpoxtyamvft',
                receiverParty: 'q4oegb5xcgyg1airdo76x7w26pa1rhrtow8za8zjgqx90abh229uq09qccpwpd8e3hxfb66qdbukarjjq6j8rg40sfa79jn15r9dt6a9s17cjuz99gk5534bvr52mvv9mmqm2qsvoqjf68ewpf7hyf6chbpvo6xm',
                receiverComponent: '8940jx5xtdl11m546iouynskxvyp08gjggavgrrbhhezejs1axprq8jt21t337dzoem0j0hkn15kqr86zremrqpy0r909z39hv1u3oji2dd4zd2ghlut6m7or9rd0cp59n98e4i8a2c7zdiismxihguc0xcjayxso',
                receiverInterface: '6j6a1j4vm2efwy380y46akz4l57nyyhp9qtcwdzc1o0lfb0o4a3v3gin7k9szjmgatubokg8lptv2gcrkfbrsk1fbrhka5som5530opln5xbqq6l4az4vd23ozvfiz92ce17m3lsy55t2rr6xrsabgkxtbls9u4v',
                receiverInterfaceNamespace: 'wxjwe4oeq0a4io5zpq87a65ylfuo5wv7hkbdia2qa6km6zqt5jqi2ilokv2ybmx3dqe4vya034uhsvwvery780juzkg3asz8rqe2d154n9lkzrphfkjgiq0sgo1s0e6svfrh10dhey3xsv0ihbi5jg56r6jd4jnf',
                retries: 4268177526,
                size: 1646801093,
                timesFailed: 8791701933,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'b7z0brpve0k2m21j98xntysba4ga6zu9sdiwa88u0xqfuulzcn',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'squ13u2f7w57wzy6c2uo',
                scenario: '2p7s6bc846iannhko6cx0kd3eeves30p82jxbetdbj4d71vq20nu9i6dn7sj',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:13:17',
                executionMonitoringStartAt: '2020-07-27 17:16:58',
                executionMonitoringEndAt: '2020-07-27 07:35:41',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '0vo51j7767adix8yu5q55syjnrggwn20nym4ha1ve4o2wdel2l50u0isa3r0kurjvwfkpojm63llg2iabeb95fy1qygqpkbjmlxhwlr0nadj78iqkeoo89yidkzp4cuc807qm8g3h81r3o5ulpbhzx1phwi350ce',
                flowComponent: 'kz4pwpb8azhp53izojv0uv6msf4fs4fvkkx61s89r73933smg3zd2sp85x0lqmpothzn7u3jqp58u5649b0fcnh5g6acnt4gy90aw71amek699o60mxi2tvtc1a4tljf6jqtow6nacr7bcig3ilk1e4ldlia9q0m',
                flowInterfaceName: 'z0ml1d75lun5f15nup2mcui3i7ay87sexfw9jszqhzlxbkbddaw4n6waikfawmnd3jiq20bcxuj876iuor3mhqdbdpadki2e8k41wu7nyj5p7vcox5bj6jzb7q4t28jsd3bmjwty3hpclyy4qfzpbh8ox37e64q1',
                flowInterfaceNamespace: 'z33bs0b1go7amp5fgl8rt0ey7g0pjxc0fu4tgr68icjlvjstnrfgc4e7rvakrzjr2v795q3usutz2ytdc8ujc6yt8ebj94m7ikf1bxn70p3v7cso6lqhnzdyejwl6ivirhj6qysewdncnved6y8nsdzo5vlyf0fl',
                status: 'TO_BE_DELIVERED',
                detail: 'Ratione est doloribus ipsa iste. Officia enim sint numquam aut voluptatum nulla ut amet. Laudantium nulla porro aut. Voluptatibus reprehenderit et. Sapiente cum esse veritatis.',
                example: 'pji3iiwf3kjdojidrretaf6cj0a94glt5w1mw47crrgzgh02xohq01w5yxthu0o1vv9tmq1e1o4fmoq4kqrdj0bm6w1vutzu1a5pap8m7pi1pphj2nxx0mnaag3ivi0bw3hr6cyp3nvsmhdpw7e98lnzmjjvgsvx',
                startTimeAt: '2020-07-27 05:55:59',
                direction: 'OUTBOUND',
                errorCategory: 'cz1j7fl3jntuayfghqwuz7gjl1awt740ox673id3il3ucsk7yt1k55x2tsgyisbi5um9sxx7qfe0k2ow1gtxxnzboe1wjfpo3gaw4080jbfb6uu9lloy3edlycjvqxxbpzzsyo2kau2itdvearpcl01teytulue8',
                errorCode: 'bbzw1jkyx52v9xkonxykxvhy64gxsu178gp3ivgnzgcvc677bo',
                errorLabel: 862207,
                node: 8878025545,
                protocol: 'hw2wceh3tiduds6fl301',
                qualityOfService: 'ejdn32k9wv79a1vg7717',
                receiverParty: 'k596n5fadjg62sdd1726agvnlktzxyiaibp1s6krskmp0upjadeo5do05hh0wcg8cptl7unb7rkip3u64o89o12yks63yq1x5psa5bf00ucf563nxj2me6p7eo7hijm6l6s7u3xz2cr1cpls017svs115w2ue614',
                receiverComponent: '8vgp9nj15i9u5kizmukku7idxhqfgcwuv58ldb3vbmfajfl9a2z8rb91l9v4qi4hmnxv9jeboebht0apf6jc3tixdyi0ef3ngzvm4zyu843jin5ucxtmgb6nhxvquya5kui04ti8ar6kmqgklqb6t7nj2xehtskg',
                receiverInterface: 'sawfpuucebl7y3nf439aeznsdf48ufhi7601m75tecahsiialwhjmoqmubk3j1slz4wuor2z256psd6jlgkd0xm7abya0q75jqehnv7kei9egs6ghnll7vx8y4azzdn1blj6e80390lsuu31bo5o7iqsf1xwonrsl',
                receiverInterfaceNamespace: 'znvyfh7wsamj1ysop4bjh8f3zc5alerzrmogcksgbkgxllq29i4xdj3oxjvt7duoi0js3rkju5i8258nr502q99o2fuc280298heiwumz3mlguc2jfggjhka00rla69tzkp9v1hfpdgveqee4czetv01pwu8k98i',
                retries: 6826789681,
                size: 7154464751,
                timesFailed: 6462617531,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 's87pgut9erb8ev4j0l4syj2t7wnlks60layrp1cbh2zf7lgjd6',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'zx9qzp0g0aztw0hwovkz',
                scenario: 'alws4mq1a6wov4j62434j8wbmkt13ftnesmmtnl5jw9ffkbi8gczgmierf4y',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:13:28',
                executionMonitoringStartAt: '2020-07-27 12:38:49',
                executionMonitoringEndAt: '2020-07-27 08:19:13',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'm59btqvabs4xsn6ryidjuw561gbzcae2xte7aatp6px63xsrv6xi33og9gk3g4xb4bq9a98mrxu9z8yps44pora4xtlqu2mb6env4rkg1de03aj3zopj0p26depn8p8tw0orb4prnnkaf42rybqdgyvdbab2fd74',
                flowComponent: 'ilfhljp70um78gg4yzs3hew0jkmpsn0i3oczb86kejx4jwjo1r8fn6iehwy4eu8xdhrjydjxnuh78xhqrd3jr5t5voji1f4i7seq5qfjqhvnahoh4qtn7xk3co8jplx4v7dqmt1b989cww8ou4a9hek0s94leghn',
                flowInterfaceName: 'zju62xlkbu5mxifcx815noupsr4b4yvftioq84jm8mkje52hibp1lfdi9m2daq988l9c3ep3xc160k7p1x5x8ou3ve142erj0qmzymu3zeomxivu32yiuptsdunog1w1zkxg6fdi8m04el6xo0udsbtilxjf7314',
                flowInterfaceNamespace: 'ofz193unuz6ovqf8ut9ffn726qowm8mp4cx1dc6o64doe3k793udmd7w380ty8u2ekixeol4l7qaeo5nl294odis68s2eepojlzuyszbqjnxwoecm444kymwwsq6c2ytiwfzmq14j2if9gacfnzcmbpx8zw2xj7m',
                status: 'HOLDING',
                detail: 'Maiores voluptas eaque sit eligendi doloremque tempora sequi. Eum et possimus occaecati eaque beatae placeat. Quia voluptas nostrum omnis quis occaecati voluptatem mollitia. Aspernatur quibusdam ex. Qui velit non et porro et dolor voluptas.',
                example: '98upu2oqbqhoukntzvfk2trdta12dj4btdi1q16c0h120wmaxtqzepjif5dplw4oqey71n7gbvftxxyah19brneuozolhfisgpxwth4txpf5wm4x5vfnnxdgejfel2oszouzcajwvyvn2k1oy523l960kf2981c7',
                startTimeAt: '2020-07-27 10:32:15',
                direction: 'OUTBOUND',
                errorCategory: '2kigzli8hzz5y379smsjxyc63i41m061gv9cbm055ms69vob0rrrqyealgdu1lm97ci46q6b95fuua2zomkjh8tqztc5ci87kx5nv0v8qisvf5ov70h56ogz2rjv065hfs5ck9d928r0i499ozwajwhozdtz8uno',
                errorCode: '71lxvpc71lwlzqk16oeaib1jkg32y2a5lxm6th9kgcpruhj0g4',
                errorLabel: 968489,
                node: 7128668596,
                protocol: 'k496ir5suuk5oe5su5qa',
                qualityOfService: 'eiaj7633tzrzmgvuodw0',
                receiverParty: 'ekye9shegjpatl20gkpqy33c5159xvjcxmxw2nn2g4fwqmb1l11eb8v4s0v6qnhyegbdmytu39rfxi8h034h3boxqs9j3tvze0mh4e70fu32iol4zzszcno1q9n5ij6a5q6u2g12y2h03k3u9qad36c4mj06xjwl',
                receiverComponent: 'ty3hs1czt92pj7ooz31ogmn9rgkquhk726nfctokl6lzzuzr91ndw0xlqjkhjfl71s9axv5bqlqoqxrn1zmamc108lwnukq3pn5ru70bp6ewb3cbd5i4wzd6i07udusyzdblbhfnhh1juwpsubvipot0mxcrfhx4',
                receiverInterface: 'm3y0fo9qo2myxs021uvi3j938odg96ypz777qnzvi4m3oero2n83kxma4reifaof6qo62oosaegga8ni0s299hoyl1oged77xjsfsrcjj33curneyl0y3tdxo7eubrehr9i47yoq5uojbbi0daynlgkwjv2dsq6c',
                receiverInterfaceNamespace: 'y6brkl1mef0hmqebcjk4ppktvhuyv5jkhvv6qxi6aihrk2khc9a67htdk5hw5589hllacu2bayvyhylommas2sjwf5fhwe2e6xh5q6cb1oczhmjz3dyamz5b8rdfrembzpwkefhzbwcnqwvf8xqxgdr77i5ugb65n',
                retries: 8769180977,
                size: 2641533760,
                timesFailed: 1126813709,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 's6cjxto4v0dizwwd7fmmoe7usz7wq1p41rmbm87abrutepmitb',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '6nseckpofl27bemyobhw',
                scenario: 'dmih9l9prnow3muzwjwngutgf0w1rtqcxaenl9gk0rcdtoyyup07ipyi6wwn',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:34:24',
                executionMonitoringStartAt: '2020-07-27 07:09:46',
                executionMonitoringEndAt: '2020-07-27 13:58:39',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '8ja8xm36y5j1tzzy0qegeifkm14krg1r7y4k7wu9s0gsjr96yjr4q96ztln8j5z7zk96wmzsgn8m8whh4jfl2dtio6j8uo0ueajpl2g7feogalm1ldqj34dxn5x87jztfl6e7iydqmmpyezj8l9hcxea0el8mf5b',
                flowComponent: 'b9vbq9jbfav7k7uumlmlg1nkqvqyxkix0mjc87g6avw52vcm7tn4u4uqnbqpi2yl9curmtupcxww7mcv0yhuk6qxm1d1i90n7d4t4lt4bp90z04by05383rpnvzsqu385fn8o017mx5dq0v9x1n8ggcxqx2514cy',
                flowInterfaceName: '75ep8oyskg1ioyzo5vu5byvi5l8baz9yy6idsotm3eira4hgyzj9hcgrxfwpuxluaqfcxako4f1tm6uij6jquz0xvk1t5dbtiakntjlzfz7dxu12r3xqna1bdwhsrglnx1ps1v2xb4bmiiuzgd3m9i0nutzqs89z',
                flowInterfaceNamespace: 'otmw2uljr9fuq0n4qh4tupsd8g31iwwvejy6hz6dcp3oln3ns3jj0j4omhxi86urwfgox4qhpfrm4vl4523i5pnqnnszutatxesxe28zpbdkqx61g3iibihabgu8u9s1btuy6durl4w9fmt23swskuxjcx7w45vk',
                status: 'TO_BE_DELIVERED',
                detail: 'Ipsum magnam molestiae. Commodi aspernatur nesciunt ratione explicabo aut est laudantium nisi exercitationem. Rerum deserunt est quisquam autem non aut. Qui magnam voluptate delectus omnis impedit est eos est. Soluta rerum cum velit.',
                example: 'koc4zdrw4815k43iaba56n100s1c47ky4dx9bscza6gdlyn6uzmcwbibkp6sh1rjmaurev019tqrsex1n84tbcgeif6m0r4c2qaprf643gi8a20et3r9gpiusdxdv80tnbkuug0a301wpfustfkqsja6w95vh3rb',
                startTimeAt: '2020-07-27 22:07:04',
                direction: 'OUTBOUND',
                errorCategory: 'je2ccdmzpz5fc3m93ohuma0cusapxjsmzurvopmsk07wht92tlfqu6aotzyp3dbeydo0iilzamwox8vypyn06zcjwoudagc1y97cpl3yfpw2301tv9ni9kj6d3n17567liuiepigtkn75wmgw2kf67qqzxgt8omo',
                errorCode: '4l7ckopozt2ixs6c2nwb7k3pvc1b69uj17xj8011p4hekqq9t1',
                errorLabel: 522389,
                node: 7911521084,
                protocol: 'cc10dkxhnejdfnr8qr99',
                qualityOfService: 'fqjg35qenu5v8y0a8ugw',
                receiverParty: '0u91s9v2vmjiqu09mjha3exn7i0l3t38dtvimcpc654zp9vqe5zyun9o6u8o52how6h3vqdx1fp1qr1h5p8ac5hfow5mum3djwzawg6pio5xz1n7069vh2r9gia9ozdurtqt5fmecujn44wmyc1btonjzivqawob',
                receiverComponent: 'k259xyz2jsfvokfpvwt0dr8lv5owac5fel3rhegwg0gg4ha6goyezeql4hkaz1aksh7gwcfpyh0idqw1hwb3n8kf1e1x31ldcbe1wetjlq3tetnlirr6z1xz3er1b2lliudzswo7frclvytm57bweh9fqhips1gv',
                receiverInterface: 'c56m3vnpnsmu6h5ke3cp6w64ba0xkzggrm2rmrtf4e6b04ff78jou8y42w2eu41pg9dg10927r1phfu30ecwbbmcsz3ix1a5iorlwi1xobhqwqi5734iu9ahvnkaert0x1ziyw4c9lu6xppz7ywp1p0hfrm9f8ad',
                receiverInterfaceNamespace: '8jpkd7qxf3lk5bszgxtzc0m1i9t7b8909nqbofztpa0q6u5h850hnx3n7zitzerfxra3ulbhs6awgtu453vs2oi31sqnghpjitr81ghzdup044dpnsiwl2glimqxkxub20knfegxj8v224z86kxznusmkv6xpc55',
                retries: 91348774706,
                size: 5782300000,
                timesFailed: 7508952919,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '82nmgo6e3ei4wb2vqhe2l4wz124ooqdgms6bpvhz2ehv9co6t7',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'w8qqh1smt38eg6tn4f4a',
                scenario: 'igt0h0zryrq545u431xqzfziu2psvffzrlqazzm4bvevt35c9t566vlx8k7u',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:50:19',
                executionMonitoringStartAt: '2020-07-27 20:29:50',
                executionMonitoringEndAt: '2020-07-27 04:50:03',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'x2jdtzty02lxesdivnfvs22qk5a4ybt7wc9ehk558bnizg4k63c8xzer7a4fu0cjiwusws5qtq0hdarqqrtyl611wk0jphbpkibre2jux6xxsudhzchzcy92q0r9hibfv5i2cbjckvrr3m8m1y94zyztj63erbw3',
                flowComponent: 'j9gs24e2thw966j3csnw05506szw80msy350ko8ib5kq3p67ck9l89yov0nonwqwjkmt817jrlxjh6h5749n9ktmw4pzj2n24mclr513xkv5r27e1utnutk9okwcv6v6oyhj6yg9fa6x7wl9ybdw5e6kure9bk9i',
                flowInterfaceName: 'rg2l2w0ud9gm2i0i1n0wcgu4d33tjaf6q0qowj2n5zzidcjv4mwrhtx8wtccxn4deqqtwatpufzk6uojw0i6q315bxnjgb6ybo2nc30juas7wfqkoebk8ayhqummx3uwdl8r7wo73pcdpphi66jgg998cects97m',
                flowInterfaceNamespace: 'esq45yq1uwi8l5dopee1nzg6r11c1e6pd5brh89pg7lv7pe9uw8w8ngqqnrrmpek35oq0clg00pcig8uw28ej9wbu6dftmnl97t2sbuzdmyhuj20txg33jg4mtmoubh6d55i19jksrmgpg17wp56hbgvxl2jno8o',
                status: 'TO_BE_DELIVERED',
                detail: 'Et placeat eum est similique et dolores necessitatibus. Laudantium aut ut rem aut recusandae quibusdam. Velit dignissimos beatae ratione eum labore. Est sed aliquam ut ut.',
                example: 'sksj1d6971d9l1u727z32mvc0z9lr7f1hm5o442hvs3du27arefjawvatb2agfn5ln00pcm9jlho9o4xe24htzo4v54hkrklmfi6mtijw9e68ku2rj3g2astkdqf4a3glqqx59d83dhzlsz67oi3pgztrr52zkys',
                startTimeAt: '2020-07-27 10:55:39',
                direction: 'OUTBOUND',
                errorCategory: 'pynlr63vnzqx9r63oo61m47pnb7p0nzj294vkhmufe8wvy4ni31azkyugkwmb28gjioz620t78gl7a17yfis8128ef623nb081cwtfdjrmo3rjetb62swm26dojupiu7vqsoohxkruq08pvrbidnasd453eckgn7',
                errorCode: 'cr5ss74bk104x7ual5g1z3181f7w2hqriu2tsw0gf6resh9xd1',
                errorLabel: 552049,
                node: 5584185532,
                protocol: 'hdl0l5mwb77ew6k6xcng',
                qualityOfService: '4awwijmbxr0a322igclz',
                receiverParty: 'qxtn16wzqumzuu5cajuuo4bicu3vhgdp0pqv2o81d5wbkmzi2sbfgtymfgiu475bupk0zbikbol3mqa4t9zyjvii3f97sfr5oobn0s0vk177tldzrbfuis4gmf2azao4ju44kixhdt2ukvyl2sugqlfhbnno1pzl',
                receiverComponent: '5osi8y6tw41797bledblly9wev88bg62ef8lqwepvar7jgvbo1kvqtvv613i78hpokbmrzv66ctmfptoyrijdgvmsvihunfblzin0ze0zroyx5cctp4utkz3brdgaf27gpa2c6qx52vn2gt8upwsp9z3x7i0smnp',
                receiverInterface: 'zsaco5eu9ppbuq24sfzia3apia2qu8eoxfyvle41q5anl8zppytp8mh9dbtlnbd89gazwoxxmhpos5rx79g0l64j6ddaih4enplr3o3b0hz2kdf8f5l406dqj8cw2h4vn0nr2ny9wby8aw918hwwjgjn11p37en3',
                receiverInterfaceNamespace: '42bxtibegr8ft94dx5xlb2j4xuaf26y3u39nq77qqzwltik7f8ei9n8lb6swyq555jka5j9qbm17kyd2ro4r7pceuarka2cjaw0nq82ri8mxwkvz4w4owmwm61kne86pp7o4dr0nopziymqhvw4vf7tggn474pqc',
                retries: 7413726848,
                size: 21341474906,
                timesFailed: 6816644049,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '6rk49kvtg6azx1ghzs6ae9f7fykj51vvpr9qc63630dmbcpfs5',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'qoqb2vz0d2fmd41pame5',
                scenario: '3v4kbatl37hke0ltyygbl718tvfyuzj8jjhi02hxpj0u1pb8thwi9pcexs53',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:56:04',
                executionMonitoringStartAt: '2020-07-27 01:25:50',
                executionMonitoringEndAt: '2020-07-27 01:08:48',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '3pmh5ibkyr372wi93rrv30hnj7c6z0vv4imdzkxgmh490dgzwxtrwml4wkwrnsdyybyl4xwrt9hexz9tqd4jwc4pxei84dztw6og3nx3hw2axixgy45fu03ekfmk7yawmc4q6jw2td16t3frrb7xhcy4uq9zpyjh',
                flowComponent: '8tv86vyawficvwntg8o3qnepoqvyln0hoayrxmh4cju2zeo9tl0xnf7smi38q8mr3b7u1z06wxhz1ac7d7r5sjdu3amq73hilnqom9ywg3ska2tj8nrhi2uwsz9prmndixehougf120qshyhr7e2iz78ow5ue8hn',
                flowInterfaceName: 'rpwfbqe7nfsakikbellnrw6kwdwoo0q96w15ufzhavjwl3ajzd95jh6ys9cpm7nfmofjkovquf7w158q9qgoa2103emxo2cx1u8vvdgk72nxlorear5a3upq6vkqc63z4qubhvggnmak6hfku6x2ihhk9xg8uokw',
                flowInterfaceNamespace: 'gfhoklj8aoqpskk34j5wuazqigeh43wuhud13ualgzfmuw1avnt5nqdgp4tmjaivi265nshk5866ojno8sgmk3vwfaufvzbdnivwdq08uvrnod7y6616o0dbk0acdoiwcs8rdsmg13oylxxhnacm7i521lourl42',
                status: 'CANCELLED',
                detail: 'Officia dicta esse reiciendis quas voluptas quasi. Explicabo qui distinctio est. Exercitationem autem quo qui fuga id. Corrupti omnis esse.',
                example: 'acmyqs1i3my7adste1xaaf0qfguddvbh2ej6li2t7z39dje314mjpsdy7azj5ysap7y1dgxgkrn74m6vrcctfv7onimox97t634dhsyw9uit91ksjdayk9im5hz48dklwyfmmq8f5d57te4xj8qzok5j1kyhvaz3',
                startTimeAt: '2020-07-27 08:11:31',
                direction: 'INBOUND',
                errorCategory: '84kw94vio9y5s3ydpj3948fq2m2ujn2h691dd59u3bujozfwhil7jp89hc7je44caham5qamy38jam8mg5hcg7q0kpmhtry0z6et5fzkn6chtnvjjz9bd31ufq53r77baxldq7vik345gbvm7d4mzbv1y7dy6jlj',
                errorCode: '4htpi2wvs861t2z2p5x6xetrk1p2nct33t8203in6pdix6pabl',
                errorLabel: 806324,
                node: 1369725746,
                protocol: 'yr83uwo7b89wz2q8zu6k',
                qualityOfService: '192820kz1i4juzj891vh',
                receiverParty: 'mb02kyb38swm5c0277036gsx5rv6n5ptmu7ko4g3vvl0vfd4xfpqc79poiccjxpyvf0cfqfhl8wnfrly1r8egv1m592vta7v3d1l5j0ocb3f4b8thpwq5kyy2vlmbhsvctke03cdcx4k1pp2aovylror7pjo2upw',
                receiverComponent: 'kn4l1qws936h8c9uhwv04qp0tmcl96mpsgjyl6ojoby7754hpy1jgd64rymv9bg5bhgzz6x7xk7dv99dkth9wzwoy0iekwodmasa0lzbhs1zts3t1swe0m8bnq0stij18wt9ouwdvhwmv9c854ks9b9b23y4v9rn',
                receiverInterface: '8cuqtn5ugwvt55pmoj52lf4filrinsb1mfrqzum9h2hjf1c7do5kmbru2bmh2qj8479fulowir1bxuwr97cz647olhsb9ldv0ru4lfhq52ji0j77xscn7xzsqjx2ifalsokxeto3ikw4jaoxmayjm754zricz8lg',
                receiverInterfaceNamespace: 'e3b5oekfuca35fkpfskb5u0ap3vemljxchy83ldbo7gcgtg7z62yp4gtjojcvzszco10muptazcbzhykxjblce7fenu9x2qs06yf6zwbggnkk3mph85eddqw04udj0wtsfza4jqcj2by6blu0v9jkl23ho5x3q0v',
                retries: 6550427479,
                size: 1166988515,
                timesFailed: 99791746847,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '1z326puosgz2yix8obz9lm96nw00j2h6ll7t8gyxhxlcq6bh3r',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'yc5nqq7rsttjosjq5894',
                scenario: 'cxtwaxs2djyppvkejxsdg4ldmczwh3m7hw46oqmnw4xmpk4cq8sadz4v4ocx',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:33:34',
                executionMonitoringStartAt: '2020-07-27 08:16:53',
                executionMonitoringEndAt: '2020-07-27 13:54:56',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'vj612djhjjgojvyd09v06umxhu4ch1knyse99nzd3zsank6zg6tzebcrj6hv6286gt1uf11gj4jh0oi7ewkjfjg3v08umbl59sn6pf9hozq727tasbyow02x7rp1mdrjgy14y5ljgg6t88v42xxh0yema9bp7wae',
                flowComponent: 's89hqxhjpe8ok2v2le4iavngqorgfo9y5lawdaijpvh40cjhu5cphw6f5r2v57m9314zbqxhxe4naqhbwsjyc6et270o2ode78e0pyz3pp2zvymv1q03f41z5v70lkkbh2pcv3lccqefj5imbjqm4q9q52tijnjw',
                flowInterfaceName: 'qe4y33os8st2pie9zdvbhdnso8155o0fgk2lpkazl9kvr6tldgsfgk9n812nsbcbzl1ea6tov2vtzigox49iazuw9xaecpstfdextnl53cvh12wuu0arljbvgjinxweuz709qpzrmqfo0ask9of9ynqcuak1ui61',
                flowInterfaceNamespace: 'em49vwbnaccngtcncbes6eh76356im6zf4kaq7jx82px713klrg2pvi587d0qrcpu4svd54mwtz64exf3njiop87t9t82j3d1b3wbz8s05rz59uj7fr3zv3udbaxhl2o0l9lsrkvmy4uasbsat5bgcoxt7xbehng',
                status: 'WAITING',
                detail: 'In rerum aut qui sapiente maxime qui vel vero. Distinctio omnis culpa voluptate consequatur molestiae. Aperiam ea ducimus. Harum nihil accusantium numquam dolore cumque ut ipsa.',
                example: 'kfq4rmxn7ilx4t1pb4uwialpgzsfpipv6bs70snm8fichw3hwd762qwm26m52lmppsd9tzyd6mcp4efzdlehbirwc9sf3xsk8ryo5kn8rxqcbj37nl679i5vbhh740rhpmf9mkaoe08rq2q9pq4k68bhz2ntmnn1',
                startTimeAt: '2020-07-27 22:30:57',
                direction: 'INBOUND',
                errorCategory: '8kway6e59q4o49rkldkzb88ymaodq6ukzhanlbb6km515ro28sxs9fs1gdn93e67q8uqkb1f5mtnitz2bfhdej8jf9oeges6lsj7pv3ibxyowwx4gf8cn7ai12tjr55rfyvzsbbcitme1w0jovjyus81c0oxeck6',
                errorCode: '500h4r3y51imzrabqz2v2m3f2agolvf8xzbxrd3r91uq103h4r',
                errorLabel: 799042,
                node: -9,
                protocol: 'am93e67w6v24jjeugq3k',
                qualityOfService: 'pikmeljls1t8dyv5xywh',
                receiverParty: '2nwo0na8e1x5rb2u0nxawrapfuvpioh8q7cuaxr8dhqdss60yykdt7xhx1pd5uywmj1v51tzxr8119s7die1qztmks9mbob2fqoaffuogfknjsbc5s8rzt89licruux6ej5ltk6hc8rtwsw74vkz9qeb33jyjbrf',
                receiverComponent: 'v2anza12icneg30zrwfs48g4c1uw2yvsqbzk85naav379pvvsc2z74bx9mlu74ga0c7c3y95kog2dr9r3vm10u9q5vjv1qqttfbb8it8j381jdymhu5q42b3dktssw8kz9in50tlcpmeqgav31abmgrf6uxasxv5',
                receiverInterface: 'c6hwnoab7jk16o8abgt277zbnvabwe28kqkgtol58apdza8kkhprjgo95oy6mtizuy7toycz3ulg875o7430h5errpt0s7g9eb3302yc2w62h210h3ddcuweyph7j2i8rju7yu0fku647juoikptyrfshge56kb0',
                receiverInterfaceNamespace: 'bhx6yfcp97qu67ofa7lqse04hjeu8mw3gh615k0uo8ckcw2b14vdfnyb2r4urusgj8ds37f0e8cyv4qr4g0fnv1n16kkvvz3dsa7dcfh1s26gccb1ax0cbcpgc02eg3nkc4d8pb71gejr40vcrz1koe74zt8s6p5',
                retries: 8926838235,
                size: 4205308959,
                timesFailed: 2076749896,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'z20rg6tit62t9m0ytw15noqstlisv4yddwlhwxbp2xqn6wirl3',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'n1osv1sct9ddkybnqc85',
                scenario: 'qqxekvy29qcsudvnqkvpmd7m0ctp0fyquuhykzjju6csdhnhacgc02wd1ffv',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:29:57',
                executionMonitoringStartAt: '2020-07-27 08:24:08',
                executionMonitoringEndAt: '2020-07-27 14:31:04',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'k6wfa1heooxm31wgkxlhk73issqohnyytzkoashdbwh8199kwqdzi2wv07l7r7hq990iwnwex624sriyg7yr1ibpg982wuxf39090wgclqssdeyioett9b40mkqb0g6ohyuhczi6f5r4roakz9a2i2wb9mjkp9a9',
                flowComponent: '32f3e6g62t1u3fa2gfn4x0kwhde6xzf2oeqbj5a4ftgeuwrexf1q1jtxkv0yx7q52eo0fedthuitk20293wqnkilbfucldv35tkzf77t0krchi54g6b9059kefty8bsix0xmv8utbta4xmoxiyedocwtrjyirc5v',
                flowInterfaceName: '9ymp0ccui33oqs82bncu8pnmj80at5ywdcs67e8t4vz1yea5fydxmyi72lw31nimic5ngo555n3fv6n7862nlk1n0g89pzxohro7i22vmsey323x4ft9umn599k3o5tdje9oq7blnwugbhym16xre9lj0v552368',
                flowInterfaceNamespace: '5nt1d5hq4cyunp5bze4jpya4cr6d927mmy4u11x9qh6743stg1e7s35mnucovdlu6pur6ji6392yui5ajohy2orxvv7aivk60nw8gbtuesz95drj7qf8t9nmcn12q2wrtikbywj5tc5vskyhujcy1tfizkyvbisv',
                status: 'DELIVERING',
                detail: 'Accusantium ut amet. Et ut rerum. Facere ad corporis est consequatur. Vel temporibus est esse pariatur nemo. Provident beatae omnis occaecati officiis est eum commodi ea quam. Similique et et porro repellat.',
                example: '6aut68xnyqqz0yc8zgb0ekos6uurpjel7n1mu464voxacwi9a32zra8il0l62znns6348xnz2fhkj4rry20barsw2a50dzepw4e2v0ad3rzlt3tz1ekk36b4pvliba7z82703xdzndh6b3sye76nfhicrb6zhwmk',
                startTimeAt: '2020-07-27 09:39:52',
                direction: 'INBOUND',
                errorCategory: 'po1qh1tlu6hx6bjuvxyfznal9zbomhqi5zz2n0v4gaxmoutg63m3gceuiwdb86gz973yodtncwffd4guls8f4f4ej9u6chyg18idx0esu9pwnpnkohvxi0a3v85tovz64do9y3dwfuhj0vswb9x219gle6q1myz5',
                errorCode: 'wwhwsc1aqnzvxwb2obmtfme4p9ug8r4nkidgw3jh7xt4jz6fyp',
                errorLabel: 644541,
                node: 7619927924,
                protocol: 'dpcyc26a6erjk2dk4oj3',
                qualityOfService: 'yr254v7y1bmyi336ef8u',
                receiverParty: '82nllhwdx9097gsq9h313noiz31w0qbj0p89lt0n0mxb66159t551ficjg8nspjqnpsq4jsl86gp2t43dvb07bsab5pt0v2wui4y82uiz5fbod4k9ggm19wm2mcsb7oaslftc26ovemdijwkmkae3xw4k1wf720w',
                receiverComponent: 'kdet1131t5fmv89u5iq18m50xzakhu2xqythvony55dw70uxohje3dgqoq31xqocvj1m3grzgwjd6wjrzh0w570fe9vdtfiuj8lq8o0lp48c8z28wrurw51aam44dgd45vns0dp1r4x2nirxzx46ermeonzxnl4f',
                receiverInterface: '85n1zovhwwjumobl4w2d8w91lfaau515lb6j9u37n94ysif2dyv2d549hihhhg5je5azholvl4kdjfcm50vn3rqzcxtiia1yaiqzsgv90o4rbol9jk4gyvfv8gequeo9r7rdieoc40k47x3gdmi2m9yfpuefbpqr',
                receiverInterfaceNamespace: 'y880wxz70qvpsj3ttsmhd8qw18yhbun4qsn0rwarvm4qipftj8psbnpme63kj6wuehunqtwpegxk28gk7a057fxpfkksm4hgsyh3yhyy0h9zf08qo2jut88o28v5np4q0ah285nztwyc7zba145ihdsa1kjpogps',
                retries: -9,
                size: 5586632823,
                timesFailed: 9044521891,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '2wvidfufccddk2dncc853c40p8pn5w757stjp1rcd4woft5otx',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'nz36gvckebwmgkppab0k',
                scenario: 'zvk708o42eb9k7j8lxwo6wjkrmxwxmmy7127s19pvmzylwf4h7v7u183t5g5',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:16:27',
                executionMonitoringStartAt: '2020-07-27 15:40:19',
                executionMonitoringEndAt: '2020-07-27 21:44:47',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'j0vnmktgrumz1fixuxcl6kaefi1x43bexf0gbvn25yk9czhhlw85xbtvhgz5gblml1den35okcxr5hx1jzdholqdrbv8am76dzax9jf6cu2fhazts2v3n26fvq0cfzp32yxrrd19wrtjxm4l7546n53tg06u175y',
                flowComponent: 'bttsuqde8k2hv4qvfj7jx19cuiu55ancnyfoani8nfg8d9pi0na86akexzfastpzc6m6dwwossjzc5gk8qdcbrs7ospsin0ppqtksptv4gw20kk7sn7vz9h0wh5x32ehr4ivh70sxilr8hk8orq5dn986wmva5z2',
                flowInterfaceName: '4h8bqswl00k8l3ia9rlj4xt0uyxfzigncjbb06nahr3bh9zal4yqm678dtvaw760vnvc6sjy2t0tiymhkddtmbasiluv8ntq3h154bzxedbe9zo9cyhojjtuo9uf7yydtjxsj7y2cee8qytso4gu3cr10jydj5h7',
                flowInterfaceNamespace: '3pitfqpvoaxq0z19rb8nwmsktdoisvvrlc0ksn190kgu0niapzlswyuz93xoypu7b07x81sz08z589n449vjocnxsst9u9dtyk0g2nj37foc3fjfafa7fi0lij2ske1mszd8ocxm3vu1z9ap4qygc0cg5jke1jtl',
                status: 'HOLDING',
                detail: 'Enim laudantium sed aut ratione. Occaecati quasi et qui nemo rerum adipisci velit est. Officiis consequatur eos ut est quia voluptatem. Quo culpa quos eos eveniet sunt.',
                example: '43rrprb0da777jukoaca8h9meuuhynjt021n96gydtvsemye3gyi267csdlnjl6uknzkzf60d0i0luxqf7xz5p0rxxln2nuk2u7l5y4gh3xylnmrw0o5jncnholmihzq5tbjmj3xp25fbjfgs6v5nuhn958a8oid',
                startTimeAt: '2020-07-27 10:51:30',
                direction: 'INBOUND',
                errorCategory: 'e2psf9wvihq1c39wyy6wv6ciliby7t1tdlv9v8zt5noy1n7bxz6cp3oyl4xmdfbcns3txhj52qu9exdz1lroxc0qh809oja7yvopd1s0hl4gw71tziyze02mvhgw3kp99j1m5vy33112q5576pa62540zva8s6pg',
                errorCode: 'qufo00dkmyylumg5i4c71sv6inw8zyz9gkke4kohhs1uh47wwk',
                errorLabel: 679159,
                node: 9732650003,
                protocol: 'gxjkoo95v4mfm246e4ql',
                qualityOfService: '155ojnmkr7nj348h5w2c',
                receiverParty: '5cprpu8a85t5m99q9hw190z2d1slfa7v6xv510e4ik6piqfoz8o1bd9m01ylm7qd17nt8xerk7e4d0qs16f4stbgl9q0xwwterikyhqkwtc1fguy6ty118x98lyjgsj4v1kr2b3ur3klaxtda9qvpek4e4tk5eh2',
                receiverComponent: 'lo7jymuaiipmc29gsl8t4kmextiz0vngwq55dkzfsa2uef6qxr1ww5ejfj5qtugzlheawctk8uymowcpmuc8fzr7kr7vksntu6i5s80t31ub55e5042o0cqjzfad9rausyrn9kej6fvsum64a8iayjx1l1d44jjq',
                receiverInterface: 'dt9l5wnowr8imuygp9fccb4zsee23v8go1ot4f8pp9a39fxko4a2gol1kzk0x07kdkpqh94yu5eyh3k8nw9jx1inabfi9t4wxrb4gbm59mcictfhbuidxl9tyfow4vc4l5nqizlptg3woduwu7ipx3fqlr0jveie',
                receiverInterfaceNamespace: '8noo71oioer7053pao5gikw3c6o97bzmlnks35n83jnlnmlkbrer3n6veov65wtajbvmhhrhwuvvswq2qrapc10nksmik6x98857875vgti9yv2o9f417cnjylavjol8hpqbhkno01eekiiecxb5ebdbvn4nrutq',
                retries: 8631988132,
                size: -9,
                timesFailed: 5629783120,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'cpcaizjviq0rlbey39s8iez1gbxrxyf8ybjv2wb7uayxmyy0i1',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '6aae53i3inikkx7hphab',
                scenario: 'rma61kza9vylxmm6gpjog44zacsr9qtibzg20zx1z4rmigkw9oy3m2ayid1s',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 21:35:45',
                executionMonitoringStartAt: '2020-07-27 15:28:16',
                executionMonitoringEndAt: '2020-07-27 22:09:51',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'uzcfn2as0ykdvgzgahx8jhqxakxs8pysjp41nvglz0mapxa995nvwdmkaakb4bver1z1t1odita4exws1s3f5i1jh19pthdaqwrk8a6edqp89j29rdd66o8eqitrl8sp392boxqlj1f1eqzq541t83efpwaoqshp',
                flowComponent: 'ns72jk8xjaleaq9jb41zwz7zxli8jq19b9c1szm7rm1m57u3mq32vc6xwb801tnk15gjx09lsocgu1lm40vdsgifaamare6a44newp1fz4zj7bf2b98squie8d1ooh0qv9u1mn9d7bn4gv2j8c6z3euug04r85vd',
                flowInterfaceName: 'a7ubh6y71nf2aw9xwwm4ytpd61zj0ypxxj1dglmmk0bj8w9g2jije8d5t7anv78wnrv3ehnjmy0d1uz4xfo9auo3nfekzhdnb9m972xhd0b1jk4bvyo5e7j4hc88lv7dxr84kqkc2qnkt9xybnjym8ttq5l6gv4p',
                flowInterfaceNamespace: 'k82qtckksrx8ukyf0wjizff7gnywih03qbvmpbeqb4ornw6o2ipw05da0z34ec3lpe8pjs25ypr1h9rm640rya44nc8xte25btdelwgnmow8c0iffdvw3hfg5qrxbw9icpglngenbjoceaqytush1skpyx8edcfb',
                status: 'ERROR',
                detail: 'Cum tenetur rem in sit. Commodi consequatur perspiciatis non doloremque voluptatum. Id ab magnam perferendis aut est et qui et. Molestiae et dolor sint vel temporibus quos laboriosam harum. Accusamus temporibus et id. Ad iste maiores maxime deleniti enim dolorem excepturi est culpa.',
                example: 'kqemnqtmsh8ylt7fuysybadzdv9xgaiopc5ct1l1ivq48377dm0toz1810dcah2qq4knebjceij1z1q62bxf2frzg6f3q041yvlyy3x1i4ys5y1990auz766joem4mj50jfl77abp0bthwgn2hjcwvulu6ohm3la',
                startTimeAt: '2020-07-27 02:47:18',
                direction: 'OUTBOUND',
                errorCategory: '80gicecfy6fbay9ngmb3ipkeflmiq8itf8rde30125psou813rejmarbs2avryemh89pzoe3y6mwi75c3a5sirdkbf14kxy3ezafan3gk7029zqjd1omque5kj5wzloyt94xh5u0irygnv3jn84h5z1de1ocxsys',
                errorCode: 'y5ifu2oi0kza1ebqwz3bjscssjh8k9qyb5xsfyhyprnfuesf1f',
                errorLabel: 994767,
                node: 2474792597,
                protocol: 'ehmudsu1otj1nyet2kxx',
                qualityOfService: 'sf8aus8swx4zr38kqab8',
                receiverParty: 'p8k07tvtpc1vhe4zmaroysx4yjlw2g4l2k1a3v1d0gvikrc1wq2vh0ytxqpc1vn95ndabtq3qp48ily01xpap1zalmef7ux8myvkhjngwarpaxp29m5rqm4b43si7kan2yzpzn6o60kjmk3t202vn3kb1tfo7wa3',
                receiverComponent: 'l6q7rpfygbdcr0p0p2nspmlqnluiqfq0gx494fmtbouwzy9u8fo4fah48qf9tv9qatqm1hz9z5xrf6a5g0zel569mf5akgny49ag3zi5w6qvkbjmk90hm09dcpvd3nxlrjwqqbyt0oc9m0ptz6ni8b2tsz1ysws0',
                receiverInterface: 'a0x5t5gzl2uek2qge8hdhbfa5qr120rhcnnaa9ud3mpdj2l61yf54b5d0hcq0s06wc8wtmaugsnfvssio6dqmb0m3qqjwr7eehr76hkbclu89npvw3teurflaqqalm4lvjb96340t05rxa27gf8mym2qvbldpktb',
                receiverInterfaceNamespace: 'rcvpglg74el4pftyx67oy98tw52su88fiy8xdq8nt5o19tb36i7k2xdsklh4bcn58ogpkg7s2jrmn3ds40kjnegsar0q7an0l25sewj9vm32xsvf0ty0k6r3jfrcom17h6bm4smsywpi1x1kq3p0kw99h3civpw7',
                retries: 5795130293,
                size: 4797970202,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '3981b1wb6ktbz2javqbu78e47q9ewtzuw8c1wdlu382r5v0b4t',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '4ocj6fzswc778mz2vbza',
                scenario: 'urhnxhf9cpgmjh3fmhwn0dfwzdcmnkqif8h9hpajedcjhv4yokd0tikn964v',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 06:17:49',
                executionMonitoringStartAt: '2020-07-27 04:24:49',
                executionMonitoringEndAt: '2020-07-27 07:36:05',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'p3mdjk68rl2wqtbgzulm3rhw753csykcnmjlnrj1bvhwe51n7fqz66p59q62056tyfpw50h1ycdfvsxkixd4jih6144h163epwxksne1ocmd98t2jnvhz5dfm0iyyaxv3y0b5qr5lfgxbbpiq5empucs38blrqn2',
                flowComponent: 'g95252qa6vejhmq6hvhutln7zyanf0jxw74ine2ms4cqlt82eryf4z10cizmbm7hpzhq970h3ndro8mc8fbxsr23ma46wkokhku3t42j8mv2l5n9twfzvzxcsvzzthmxqa3170bfhd5vtc61euca55ndo571v218',
                flowInterfaceName: 'pzar4zay26j4x7032uybor5fdfff78r7ls84g833uspwaakszmxqar8ip70kqi14pallm7k31anzvtoe0kacz88nazgexw5qle4upe85k5jcxhflcsv2d7az8dp11zydj1v8ds6jdfic04kzp1z01fsmeu7006wv',
                flowInterfaceNamespace: 'oai6n4ubumo28n9hbapczo47qemcrg5cycnncptrcj9z0uxdlxyf2eihwdivyurreu97kixlgb0mx3e1sx45vxvpc0nkkobrlwjhldhqeuutx87uvoomrixjev8fppmgbdnr30dsk4ch81d3jhn5f5pdd8y1kkki',
                status: 'HOLDING',
                detail: 'Assumenda mollitia voluptas facilis. Aut dignissimos nostrum. Et et rerum quam omnis et.',
                example: 'p8y3o5jqzsc7366xscjhvf83xzulyvqxmqf65zt5vv5ocaesuzk5nxr1edgo9uu211ru5324xe9od8gulu7dqqisbcr9bu84ww8adz78cs173b8fkk0y2bhzq176h96eejolsfcpsj4q82lb9w3m1twg1u7on3hy',
                startTimeAt: '2020-07-27 11:54:17',
                direction: 'OUTBOUND',
                errorCategory: 'xgz877ep08e99wsjusre0dh7c616g5pnab8x1vvc09k31xxikl34bx4mehe1qy1ybewbowtmulzqvhlalfec21dlcyloiz7k6mw50l3i2dzs1lmicxjb4t3upr8lrophj3x3r3t4du5ipc7l4f7i14rpo321zbkm',
                errorCode: '1sy5t510d51tkjigkdj9molb1b5j6ovobxqoko2t34ruogm93v',
                errorLabel: 874499,
                node: 9548505857,
                protocol: 'ed8axtt9oroa9r092fih',
                qualityOfService: '403n9qms2u2rlhkz00n1',
                receiverParty: '2yt3d4k5gvz7knz1tqkp5wpjq9afxknd3gzv44064hcju8vaqk6p9th8jsyrns5whm5pdsq2qve9wijsmfc4jo8bwzw3f8xvwot7pyg3h86e1dbaqacxmtvfe2sv0orvlsi4di2zehtrv76b22b3l1hsmymydczf',
                receiverComponent: 'bc8j766d9pcok6wqz64cro6ffsi8zfi40ewkvt9bp8rg7b63bsav2s2k5ajj72yieeyec0towuaru514snfqtc4tk58wgtwcw1e425ox6y4ze1a0mibqsmyjb44vipk4q6k9smp10lfbx4hblj5ifchab7rhvibo',
                receiverInterface: 'trtwxcuu3ujc60wjplcf0m2ktdvd1ywh8ltcnai7vn012q4ui4qfwhbkfg93v89bhewcn7kybssyitsxy5ao6y7ykfbkkdtj7962lka7nvn2a7f1qba63vtdinfuzur6fc151ja16txd13g5434ymncewzleq8wg',
                receiverInterfaceNamespace: 'rqzdmxe4ep5qcmhoh0zw9uxifwy6z4gnrwcab1skhyqa7ndxxuw79yz4l7rchxndb86jcvqi1ukqtneoneq9lcvi88swbs4i7qj6ux70ey5s0tg4huyi484zh9brvmsvy0o3yvza6xceg28ywmw0zmiqaykna9rl',
                retries: 9912113477,
                size: 4511608581,
                timesFailed: 8614706932,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'gzg0l0jt26jbndl6e7a4t7ttystwkh6x7koqey45b2h0zp9ure',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'tif7txt63d70m3mngptr',
                scenario: 'csegzrdyu6ccbul3uklsh3be9ix78b7wxfj6ng94cfv1s9eobgazashpzo62',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:59:55',
                executionMonitoringStartAt: '2020-07-27 18:08:38',
                executionMonitoringEndAt: '2020-07-27 13:41:46',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'pb9as32fnidzzzul1097whmsohwe9kc4vya3gve98kuswjpeq9toq1pf07fjs7i3m88hym55llxgtkhpf63j3r7jhschdt4s63qbp4s68gq6bj2lufrv936azlmzfrgri8s41vj1z8yudje130gp9cefooh7jxgh',
                flowComponent: '6xuk32sw3lnssjtgn4bd6vzr8i2o5vzyzmgnm9sht3f82lrtxrx8fq33huqq4awsbuxf8b4qw6qnev14xezjwfg89llvvrkfdacqv7ah341f2ufffpc1095leqkugmlj6movphwxvwcoqi9t7umqunndtzx4hh8k',
                flowInterfaceName: '4t3ngju3inynnwr3aiuk4xlsvpt3lvaniitakxx8sshel9z9fcjbmo0pmqkgipdmns7vsz7ibgtucux50naqrj3ftq52p6nb4j0krl98xvlrnxgv056cclnw978j6vzhdxdz56kv2v019nn2g7u7pfi57xj4x0i7',
                flowInterfaceNamespace: '0dio7mcsl3xrbktf1151bfiq58jrgy3xaaf561c6hk8cy2pv8jg1za97wzmgn5l1smn650bjxgao1c1ujgzpymq4kqjmgizrh0bjgs4hhcrx9pytp1jfioibvh0408g97qzvjnrmf612nqemulws2zsnzprxmee6',
                status: 'XXXX',
                detail: 'Quis voluptatem labore. Eum velit tempore sequi voluptates laudantium quos et sunt. Harum voluptas inventore quia doloribus ex voluptas et est. Placeat qui consequatur explicabo quia. Ullam non et dicta inventore quaerat animi veniam. Debitis dolor in eaque molestiae.',
                example: '834cbebb1dtdn8siz7wa26oqtp7pgu8aplgnqyv9by3l5xshfa6pc3me5dh6s67wth0bbwb4rku3lbqlzutn149k3mo8nkyzieaznszgtvpezppzpz73bf72yy0uhrcoe4tcb2gfo5m7a2mcdlrijqa7guo07017',
                startTimeAt: '2020-07-27 20:20:07',
                direction: 'OUTBOUND',
                errorCategory: '3dqanu15sczcpm15v84t8fs1mhoj6gjplaljr0wwusc02ztxmkjzptve7652ldbngc14ocnxotgxn4gw9akg8cpduk8bje6ljulsux2qu45stw2igcwf5c4t4sggwzzxyzwknqbibexh94mfq8frl4a114sduy8c',
                errorCode: 'bjoq1b6aanr2hjm1m7qexot3z53lzzvgunywapt1vcmkklq4z3',
                errorLabel: 800041,
                node: 1886018383,
                protocol: '6cpbl47gk5mnpdm98jf2',
                qualityOfService: 'pbhkaphkjyt8mseof5ve',
                receiverParty: 'nozo8aya0tbwyvi2o6k5pdr9soc488hkbxyybdzaadbql963w8pm7e1z3s6sjt317k3ghn3kdnbn7q68l3ga19nbve83f5rmq0zftq9i8qhowxq9yea3gvdkwy144ksvlyu6c15us7yofjwxiyj2traazc2pmzsy',
                receiverComponent: 'vm18na44btlgv25hy1hvxf0k50pdemb1r6rn9kmy364yipvhb2x69n8j787hxrzarfdvxupuuibvy70dykiba5pau1ag0mtuzwph86r1cferi80256hhsn26gmbv5h5mqrk8feu65xv01019poiyk08hjd8pjgud',
                receiverInterface: '1n4p824g00w8cxirme24xyo99n2kkwuad3oma83m5px56n9mqcgi5hj395bbv6w5s4pssluf7ozz5wdx4d5d8hmk18nm52dxcr85tciimsojdcuqioc5t4h5eyqjgk3jtu74yy679vy35ild5c6ft41vk0ahevr0',
                receiverInterfaceNamespace: 'prlasqs6w7mer1e1xv8wuizemuhvls7xzwp54mpg6skp0zliekf2uuuf623hpy1efop2ttjfldo9hsbpflgqalmmmbysyuc087dozkazxk33udg769gtafv9wjh6mmlzrwq61ggbidmfeue0k598bpyp0u0l9vd0',
                retries: 6568461449,
                size: 2195628620,
                timesFailed: 3882475537,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'n190zc4glbffmfghb8uffb579kajyp4qalvxvaogmuv3mldqlg',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'nvg0u5zc0x8wthdsivec',
                scenario: 'vae40vjaljifxbgg7sap30e6i5bt2hs25lf7eeur2kqzaw6fvs0kja4d7389',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:02:10',
                executionMonitoringStartAt: '2020-07-27 22:26:11',
                executionMonitoringEndAt: '2020-07-27 14:36:49',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '3j3gnqcwb1r8fgihpcc194irp9nq40cji9ks9mgeh3hijx73ua7fsonprpgh8v23vp1yunfpdrlqjx3s9di7vzwisfglizfxrpmhlhrwpu77lnxdqy381xofzuki7b4tdbliuy4o7x0xlsanzn8v0t4zoiw9hxlq',
                flowComponent: 'm53wqwu5wbxg6vcm3gfqpp22mux1hwqhpmu9r97swv6i4ro67e45tb77f1b4rvzt2amaobdf51b8dtcenddg4h5379lxbl45k6gcm6pvnqi88xzg6u2d6cmjnnkd71p7zwt22a9829gzwqg49kl5422fzvb7yeni',
                flowInterfaceName: 'chqc020nyjc9vmpr830omzkafexp2meqpswqro4uhk1uhcrotkxfeelu5ebn3d6ke8ki51e5aznt1spscdy069aqxc34cc648unu2y65zdb81mw3e349t9i2odlhhx665zvsg3bbn8dgu9z4acc87pa4l31kcry6',
                flowInterfaceNamespace: 'nqt8wus4iil8i5vzj4sd25cuyafl2ha7khbzorhle7eoiepiuduznjqx404pxt59ek8gp0pmmrp8tm66d73nbu9zyx8rvzfwjlh2ag21ceil3vi7axzkiwgfam810p77xsgnk5iu6grph0muiytw4x6t6a2m0myz',
                status: 'DELIVERING',
                detail: 'In reiciendis vel dolores. Qui fuga ad esse. Iste quasi soluta iste consequuntur asperiores. Tenetur numquam accusamus vitae quidem non eum aut. Doloremque hic ullam necessitatibus repellat iusto rerum assumenda.',
                example: '6p4w359dbu3g234xals01pcdqoco8atw3jbuu2074w6j3w29nw3pl8zyq1lzt2fyk4wlmfgehs8nca83xhol9vc26sgq74yyoagssmnb2xt340tt4cb9ap0frc9h42hfprkvd4lnnphfus55dlt4r18xjpdsa6tz',
                startTimeAt: '2020-07-27 16:48:09',
                direction: 'XXXX',
                errorCategory: 'tnpmr8h5yrzsp1s9ryzvli3ny1howczoj2flydh0qgmuyslph8lhxlttvo4c7zo4avkf417x5qrr7b3jouh0if3ydtryvo9f1am9reaqnbkqh1yyqun8f2q3l3xgg0mwdpj4fhdyro7yuuxf4iwz91fnlfkua1ty',
                errorCode: 'xosk0jptijhb4zqp1i6ii69g35rm37yrpti38dzrovy71gj2xn',
                errorLabel: 706759,
                node: 3713004970,
                protocol: 'jm4vsznhebezz5t58l79',
                qualityOfService: 'c6vvnb2xvcqdg9li4z6y',
                receiverParty: 'wq5qbf7qy8atxwrvysnczha51l2lyybp3lc2avauvon6wbnffvjv1oemhvb02f1enps1k5finztfwl8hf36k7uu6c3zia6aqgw6b6eg4mw3b9ul50aa1nnjf2ec16gcj6pe3kvjt8dgpj5plqar1ef53xae0tytj',
                receiverComponent: 'wl7cts5t75zjsxxr0c2gdc9yzjaz8damlhwegf3cj0wrfmxdpy3f2z18fwr1byl15oxidu1n8ec4ga8qwilf3jh60xujoc2qf7k7swjiawc4200gxuiusccxyatbhb9nydocmd7gp5rgr4xhyd1wc0694o1al5bp',
                receiverInterface: '5f2zkc1exac2f2ufi6fb4we21rzq4rhjjbxh8qjbqivn1lt644yysycwqo7aop1r6qjhw5xe54t6e30h50wwkkbtvieewuydjgvg9gmicwauv57roozebinm83dpfu6t4ept1f2nkbuczz9fqpay47mpr0amd18i',
                receiverInterfaceNamespace: '2tm0luzet3p9tyc5u8b8wpuiapbwhpni5qg6e6z4o0gehsy5rz7vh8r127ifn52eoyab2yu62eg8z71kjjcgwx3o3adsnvxu0uiv7cp7lmt3xg6onk8wgcqul6giio41bttw3mnrptawwe6fxkx60r3ktqxap9ql',
                retries: 5492464729,
                size: 7070444770,
                timesFailed: 9789974624,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'kolkk3r71ajyu1we9kw7uw72m9yh19czcdt503gbsq7baiog0d',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '7ir960qz26wc2zmr2jhn',
                scenario: '5c3awi5e2t7pmkjh8roik8bksljgs46o5pp78b486iqjaw3s3z1tkh531gbt',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 20:06:48',
                executionMonitoringEndAt: '2020-07-27 13:46:04',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'ogjurrtwiwzodi0mt9bih2njzhgcrbro8vj561fq5dptku8504q08mtq59xb192jnp4zbyrr2jiblp0evyp2t8rxm6ydlkguyyxspfju3n9mwgff8kr2z5y9wbeaa073g778pvbbsie5lfk9qtdnrb4ijq39ld50',
                flowComponent: 'oerjfemtvttja6anlytl4wd806yz5at484ewr6kxeze793ng2usb732bvlb81xyrxzh093y1l0qkcsiy549syl8e5bsi5pywqf3owfsfprk11sw01p75ep89y1wwpo9wmckei0h6eqwquqjkmweis6fa0w0ynr6k',
                flowInterfaceName: '0nwon0hwtu0x1vcdo18gmbfprxw3ozmv2c9xhliubia0tmfk2s73gj7vuckixb6y2bc2ehqrad92uw2aj3sprc78ag49q2on641fj9g83ikhhgcu3iwdc9bbtysydbe8izuar74tn5g75aykm848vnic98a3eei7',
                flowInterfaceNamespace: 'a9ptnzv5rh1ls13dhdri70r0voaozuuj4ssi0o08grocb7x1mrj84wrxj11tidlwu0ej25szk7xxlhqr3g1lfarlf3o3vj849a6titpxqc062tyf23ui4q1fqu2h3t2jkt3f25p4m319pjwjxnla4rn4ucg2x302',
                status: 'WAITING',
                detail: 'Quis nisi repellat recusandae nobis voluptatem nesciunt dolor amet. Inventore quo placeat ducimus. Deserunt ut dolore illum corrupti. Ut ullam consequatur voluptatem quis expedita quasi omnis reprehenderit quia. Voluptatem hic quis saepe dolores.',
                example: 'z9g6bkcae0fa2j3cinhqx031b39kj2v8abp7zu7w9lc6p73xa9h06gprxns4ly58f77o9nzw08p10rj9jk39x4emnq7mrzo1x9leq9luxcnxoz6oob3p68bb8zwtq88fs6fy9jldvupn1thwjzhiops8h7l2gnis',
                startTimeAt: '2020-07-27 20:39:51',
                direction: 'OUTBOUND',
                errorCategory: '7bhedtuwzlxrsdpmj0ygx2qt814f4nsxs48kffj5ayeed93zrehrw4r6vhkjn2fq0nelnr7ebiq9c3e7cf9o4b55wszpyxg0cc0vzqe0mqwa0up3550l62p0suahjm177sp2wk6345hpi6ya6cjc2o0uqlicgief',
                errorCode: 'jjprm0ea3bulx1nkr9e9hjtxa2cj2fck3dau5vc057g0nryxns',
                errorLabel: 770704,
                node: 1729763630,
                protocol: 'zanmeitgn3si3wk5mzv2',
                qualityOfService: 'zyvr2c4kftoosutknuiy',
                receiverParty: 'rqgds12axghqe0lo3mhq6n6ryyb8mvmto6sq40cfewiuzqn2vbe4u4jqyvvsflxlthoi23y7y2uwmvajgnhoqk5ryjzsrlug77jnvv06y8mtmjym9lfrb7z9fxvzh2flek8rt9sog9zneza5kjfa3c17m4i0gy7q',
                receiverComponent: '1o2qmq3ridbf3kbo0btrueme7ycqx8ff4ep18vuelrkyihwhf1c50aietfs39tj886lbuwyxfk3r9j9q9sxqnw0kmrt1xuwy7vf9gtblcvgxsf175d6kxtubyxmhpn69mhcrkgdy6zr81b0n5cekv3ig5hbyq6qs',
                receiverInterface: 'vx7q7t8lmmmkgmjglprl7exdmt6qmp0tuennmu1udrav1j0ransd127k7orepol7akhr6ui4pfnb1s03m2b7s4kko2h4s2ue2arwgve88of5sh0plx4hzye4owip3yk1vns0qyniu89w54hi372w810iozocrwfx',
                receiverInterfaceNamespace: '3ds4facevdlgezfhp6cas67i8gcsprfjvrdyhf3m37meij4unvmycb50axel4mpljz318fta0tyzdq9vinfuhcu0gl991n3zfhzrnte27qollhpk4oyx6d6jnx9h3w62mb6z609rbqfyq3drskwvkvqgcooffoas',
                retries: 6765343946,
                size: 5907589809,
                timesFailed: 8371375534,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: '2lk5hc7l09aow0kq2u0jo16ggnc8x2ejq1zmzfgstqibg3t22h',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'wjbezfh057r48zk1nk42',
                scenario: '29vzmi7fash8iq4uvcvk6wafiz8yehzx5yw9ibw7erx105u73hlzdzko8s1j',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:42:16',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 20:59:47',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'uuhnvw9oz59qdaizciboozs9r4tc7bsh5j7grwnltxzfcjvbovfmzidiekpz4clmugnj2qot6q85finbjmsvee72snbf7y92yxw5rc3e2pt5r33rx257w2bm3k8tla6u131jthrq7nfrow4b3n8jrvnw7wiu6che',
                flowComponent: 'i0e1b49jv0ees2gy4p0kadt5nravnbvoedpv3ow0aywu2j0lpec94dm253z1ztp9xy1g4cvjemwy3amj66fk8kt48sczkg59uzrg5sq5dfhur8tto02lfm2dfeloltftd8arizioox3cwjy0d8s2zcglioldq878',
                flowInterfaceName: 'ly4fgajllgji86dg5x7ibsguqbub9ngegjj5a8n04gk5xjfgotr776hc02lt616ynwnu0qgdvo0luvwjs0bobvz7z29cditokbx2fim82b6tg0e3wk6727m2h8n4fi8g6k6yrfz55jswdpwih24ffubpn7ajme7o',
                flowInterfaceNamespace: '2uiv1it45fbuj6ux78iichmqe3mspkxi41khwnmdden9p53cw6k5yazs0t3nwhmt5p0u0is6jll3rj97lnjyx87gfpreuwu5zqswx4sdi14y65wtwnl9kvztis5r0bxj119zzff0zenilypgc12kv5g1f25hx1ky',
                status: 'DELIVERING',
                detail: 'Non reprehenderit voluptas et blanditiis animi nisi pariatur distinctio. Aspernatur et sed modi in nemo. Qui aliquid fugit corrupti possimus eaque est ut voluptatem commodi. Eveniet maxime ad eos quisquam consequatur ipsa molestiae similique. Repudiandae possimus dolor fugit architecto possimus nulla nihil.',
                example: 'imivlpeeto57rkryupeauvwzn4jv0kohx57us5478j21haanb6w0e4mqi8pwwibiztm29c8nmo93x8xyea23wz4xqyquqjq4zydpsdv6tniphevz2jgyuaw7kkakvi4dqpzcxv5uvpns9s11fe5l5whzz0v3wa0h',
                startTimeAt: '2020-07-27 09:48:03',
                direction: 'INBOUND',
                errorCategory: 'g62squgbo9x83e32jqtsoqs58z4vebv5p33siwk1dgi1lit0njtmkcxein6mfy68m2phnk3bjgsj6i8ahw0gyu2u5rqa934uoejnpc5hqpksehbb3smr2b4b36opjhn1aapj0ar5183fprgcrj0w409fdabzq1j3',
                errorCode: 'hc6zyedm73opfxz8ystcp9nv5s4jsj9iuw6qdnivk1kg9kqvh4',
                errorLabel: 138489,
                node: 6584522506,
                protocol: 'l4v3wg9yrif28a74iztx',
                qualityOfService: 's6jwbdbxrndeoohnm59v',
                receiverParty: '18ab3y08zkc6d56wdtwyxcbe1xabgcj8b3pdhx86qgjyvm2x5m5xx15bfi5y1xitcig9gqu7cfr31erms67kro4380cmg9fz81ik1jtnywor5gy03ka7ahzf8u54qaoiyfis4lt1uhmzx9ubzmknsx9up29hlef0',
                receiverComponent: 'phoe6c70cp756t79dqu1i3h8qoibfgzwmqtins2u0kjty3er5bmqe6xmmg2lf6s63yqlk0o0jvn3h1ldsjr62umscpihsfc7l3quv0au6kf06z3c2huigsd79voxhwyd1nw1v7l3naien33ej6n3fa2o8y2xgoay',
                receiverInterface: 'v0dklmnfb7qzzf211rsrm26mvf536n2z8s9dz6w49ldkairjsvlhtxjuh5oztcpwh87v08qy5ypg4zmc96ehaaesr6f8ggjtr25ogxolkw6z90uomg81a0dqa9ox0fcyr632yw68nkoqgtjzdrvkzt7eka6wbpym',
                receiverInterfaceNamespace: 'cmrvclj5hh16cp24d1jb3vqmvqkd4kt9f6lxfdk8vz0yenylapylxoqjr58z8qu7vyapugpmelkxo6eyg12wnarmputuekkr2zmeglgq8lfd9vmsaes3eavhxwasl7lzaao5t145bvmm5fkbte4dzknoa2fsci9n',
                retries: 6638884405,
                size: 7919391131,
                timesFailed: 6824619387,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'er9jnehcsy7ktkojt7x98i0e1vabg13a148b9lnbcnz82dj1um',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'dfnv2jsj3m03e6jyt8rc',
                scenario: '3ghoin4gjythffk6yt876buwf33cyngydto6qh77b0xd37drf4zuwu3uqhhl',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:38:46',
                executionMonitoringStartAt: '2020-07-27 17:48:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'xtzbf4fj3zxao8rncjrmhwe4l8a2f1agenqkcvjcz1jsjr9u62ah9qlbua6hrk05m50y2xeb8ba2gt5d50w454086rqqm2b7a6athebamz5mcbsj0dlmgvvedstfaxfsaqo6g8irqqt5l4xbwwb3tl5g5ipw1cyg',
                flowComponent: '5rdncufukxzz4k1z26zwoashd2vtq9d4vi39lorp9zs9loxoi79uaz89q62bt5eflxoptmej3942fo0syrowq3m0em3ahhd8wllwg6qikeeluz5uiix9uap5ji7a4o9g5h3tak4g1jfbcmj98qfijelpmk3oqflv',
                flowInterfaceName: 'wxzsxv9r66uk90xd9rb1lap4pwssw1okygqc24ggnqbvou6reoqbek19kkgmjdz138y8pvug9r9d4zicqkexfqucd6dmvl21f2hxtlw4enutbeczz1e30whfy80iwkkxbb81x1o0tbm3taa5be491nksh6q22rfz',
                flowInterfaceNamespace: '9xhdwz6ovlricjpz52r4kbqqgn73fkfs4fkvkqi9vu0zgb3spocx9nate2es951qfl8wkqss36ghsgtb31mebw1zlheiqtt2j1s2khkqq3ze2dwta5jgs0i823y3c1p1qb3izhker7293q3uu7r8ham9ipcyp4ib',
                status: 'CANCELLED',
                detail: 'Voluptatem iure consequuntur et non molestias qui est. Temporibus libero adipisci adipisci porro asperiores. Officia delectus iste ipsum libero soluta tempora in aperiam. Qui aperiam sint porro.',
                example: 'glzs8f85dax52eq7o4bizqxb1nqttp26nfgom3dfc5pq9iddukw9hl43t0sm60x8bu4lafzudehb6y0ik82i5rvs3uika5rwk1fcenasfeb3uif1yc61fkz7yv7m588sm706fx2ze5gjrxncy195b79zxmk4zmwn',
                startTimeAt: '2020-07-27 22:05:09',
                direction: 'OUTBOUND',
                errorCategory: 'avoox5d2hm6hgm4sxcek0ugy2lqtblhrtw5suvk325n089hs4fximuh736ajan8n2ertsdpuo61xd6u6anqgmpgkr5ag21dflcxarhjlfvgqbeimo9e3g70kaxphp7o00vejyhn1xu80c8uo2frazv4hlqgmg3qk',
                errorCode: 'fm6fyvi19sjdksbol060iftrs8qm9xma2yrcj4oz68tmid3irk',
                errorLabel: 409000,
                node: 8855693901,
                protocol: 'kh2x1kjvnd1ffgv2pbjt',
                qualityOfService: '809y7i2pty1epw0szlvo',
                receiverParty: 'iuyouwpwa94546xzu0riynwp1054jbzjx2tanhespwqnvoa0w67p6grk1bxf9fd3d5naaqhxa3p9phkdof2c6i0r7bp8ewh929cajj4aoq7apj55wbe7ig80xl6y5oauumv62kr7dwet1v5mu4omtusaatgsokhb',
                receiverComponent: 'p4m5vx5etuef74jzbmzee5amu61xo3ec9rw0vfu4oetyzpktio1m1mf9zm69xf27mhumdxi4i1u9fkv5n930bm28ntvepjbkcvx0m264k2zqjjjk55ngq3oebjrna4wf3514j75pvnxtztm953vijmuint819gzi',
                receiverInterface: '5gabu0t9z1mjo8xhnxy4f467f37pa76if6l8xrsohbfcs7z5t4ws4mxeddc0gecqd1o0sfqzryf5b3jgy28bpog9n3i5fegwxfsyiuvev42rqezcsbwkkbe6hhp6frdsridhjik7ffs8oo6a5suvosfdq2zkf0f5',
                receiverInterfaceNamespace: 'nqntpcdxmypfn49pb4r1sh1ilonzj91ycn99ct3b7527xws0bhhuyh7z5olub9c0mreq8xqt27rkdlf6ladb1g6mfx0w5zhgo60m0z7avxrx75maw9ntkwsojgw301g1tswm2tivlw7atgp0t5gicy3x3i91q9gg',
                retries: 4901332986,
                size: 3922021980,
                timesFailed: 1074269562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'vrmo31qahdgiu4atkiakj4oyhbj68y4heofmjui2dxhjp4vdq8',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: '0vm31j5vc5exiuavqq7h',
                scenario: 'g35xeqacmrsry7ae9uu2p2n9gh60lmnp0jwcrsi2t5ufucbdmvpqwc3caxom',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:07:07',
                executionMonitoringStartAt: '2020-07-27 07:19:56',
                executionMonitoringEndAt: '2020-07-27 10:58:25',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: '8wgpn8h4qq93sihy8z60rac3n294o247o50nyvic8wxthwgwbidpehabejcigwcb7vyzp32eji44ifjo0a8go3rdypuczqk3y7b1erg7nrs77btb5l6lngoeimcby5u6ck8woa18eaera5cbluphqxrihqmqeo6g',
                flowComponent: 'ke89yd5fo1vngoajr6giq2pecmstcac5p7hglsw4hyhbs906tujtttt61a5i9sxnbh4yyaz634r12r13h7c3ogyclzxtzsbasizuyl93umu0s1xe0stoxrmji80r23gh4r33plebf2nekjbpy7q8gh4rd4ly7f9r',
                flowInterfaceName: 'v3go2gxce5oflx9bla4b8idv3rcmqfdhxntn7dgtumij6c3eddiddm9n3yb4ltbdw76kvapzpdnpfmxba7yhjzyyxen9f6unp1a0276m4qqfweqztabpp1q3fzkbvbt2lv8fjzy49uuwotiryyhpq889kaj3skvc',
                flowInterfaceNamespace: 'zyu1af98kcmnzqve4nztu15e8xcephwkyyj6vs9mivnm6qwvb3sd766arafs7pqw1tqklflkjtvup103b2t43gutbbqx5y6uyplratiz5kz86d6u84wqm31fpn8msi803s5w77hjilj1rrbw9r8gwi8tbyxf4ilt',
                status: 'TO_BE_DELIVERED',
                detail: 'Vel odit et nulla quae explicabo ut aut. Commodi cupiditate corrupti atque repellendus repellat asperiores omnis et. Debitis magni dolorem dolores repellendus magnam culpa molestias et aspernatur. Quam cumque dolor nobis natus omnis. Eligendi asperiores pariatur nihil quia perspiciatis ut fugiat earum sit. Necessitatibus hic vitae.',
                example: 'gu3fcpt31xhmpcxnymeutcao5cfzq551hufq4szqqezy1vo2tpk5qz1jzcrtke054iuow1lwh5wvvibp4c8ud6mvjupj3t0an6gehxolja2bislitpgeeo9apdr7q6rm4bm2ddvu6d6k2lcsk7o92pcllttwi84b',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'hcoh2gpu1h5hn3ckr3g881yp55mpx8oueewida7m861vu7w3nysi1bahq43lizsixmmob8xcbjoofe3wzmi0kxeh6az8jnslfyblg615rkoqnu57ouekeqy0ztto6r0f1hzxhs4du6nfl45irpyk99nus2fi8lok',
                errorCode: '2zbrchcyt5pikzygd8hgxbbfgran5iqc2lh7s14n2i116ziokw',
                errorLabel: 823297,
                node: 9768493435,
                protocol: 'oq18dqmmbwwrrawtb9jo',
                qualityOfService: 'kuvkhx6c3vjcr9itlrsi',
                receiverParty: 'us5ga8bq2h4psuw7pjiubzvgman192z7tgxmvgrtdyk305jo2avt7c75u474iq7tew4r4pn5nuyj89w8mqgnil67d4ndvud2i9fhmswgfzo06xx5tthj3qr3v5326hkb4sj3y55sofobwzrezlxas4wqfzd98ypi',
                receiverComponent: 'krd2hlbmbozjgp3anzciu36jofon066k78t1w5nj4qkka6fnztbsl74p4z1ypp0i99kgoxb39edo032udv6erq8pvuk1kg219vw4fk7kvej17r2g63x732506macd0h7ca72gglyw7oq5p2tcs0oe8n54jhudv3j',
                receiverInterface: 'yv2nccabwho8e0rjd1c24icbv0vjm7y1i8qro9o40nnbhkhsy1194bcj5mulg465082bpp5j96138qgomi4cnr5n4951db34dczqrs6tqa19mjounjmynfr9zvvtx2dbpg67coowypvb1rc5og9a85adg3kjhur5',
                receiverInterfaceNamespace: '2gjvqg1xsxw5ts8i7tpftspyqbb5n8cxv5rykdvlxdnwpz64ifq5wsvvxbw8ve8phpzt6457n626dpu22wtgr03x4t32swwyfc6xw2uytrv5m24z7s23f0u8q2kuqbd4c3nj2wocs07h3ch2571rhslpukjccpee',
                retries: 1853265591,
                size: 1312136080,
                timesFailed: 1539178862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'r1i2mfesab8sprzzjmhhre8asfep0x6ay4ikahia3em3uih4l2',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'ci98f3y8m8rmveoqca6y',
                scenario: 'qqknj8o2kyk37qkhw0mtgpjlq3sctrioyctt4slp58chjk50qsl0qs84gdfx',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:04:05',
                executionMonitoringStartAt: '2020-07-27 07:13:30',
                executionMonitoringEndAt: '2020-07-27 10:36:16',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'hstd2ly3cjcm1cdb175sdmtlir0xp96n0h64upvn3i6wvtmlnpn8eoe1uk625mjv5uk65jsehnb81xvpjp8vi1wco5d7srt3p1v27sy7czpkwzxcp9ph8nuvqcgk1uy4io7u8cwlyu3f28qt208k3v7apj5ojafs',
                flowComponent: 'bhrxcl16akyh09o71swrbdpd0paj2v1fezwep843nh9ijqgwvb8filqtgcqcf2d08skk7az7a2hgytwv9ec6pvq823r3q5hm97mbb3an9f6l8h9tqcpcmyvx8g7ts30n7nvz066q8euz95p95qodf03aoeilnncd',
                flowInterfaceName: 'pre3wh3v0emlm8sb20494hwu9s0rppembhs02p3fcxqhzeb5ie21y2snonjzuznfadhhvjiczcsc8d10joz5m9txy3eccauqw86i579vd99ov11e26rsip5asw1fnx73s440ic05xo8dby0d566wmgduej0vad08',
                flowInterfaceNamespace: '8fodgb4j25g8a6q169eqs8qwh4vfhajoqhi5netvmsalgkk4bmfn1t8qulw661yv7wfa3sgexvgu108nh8lioq6ys4m7xiown4lk5478gq9cqqdkqbqyfadjmdpw5xs25co8ufnfmzqkhkkg1lebn1g4bjbn8bc8',
                status: 'SUCCESS',
                detail: 'Rerum perferendis esse. Itaque veritatis illum error placeat placeat. Sapiente itaque minus accusamus asperiores explicabo sint facere aliquam. Ea qui eos saepe. Iste minus similique iusto cupiditate.',
                example: 's0srwzic79xowxumndn1tqb0omejzxb9tn5vpp45i2fdjhjd7l1z7y8akxl9qepck227bgtwab494n5rr7iqvosim2av86rnlogw6hqjikjjbbgvhd6qybd7ev9i7ws6ibj2ml7g1vrrgu7ifv411eolz28uicuz',
                startTimeAt: '2020-07-27 03:41:01',
                direction: 'INBOUND',
                errorCategory: 'uchdtixa5kq575g4ucqfg54dqppuur9s7lsfpcvrvou6rfcrrk36wim9ku3vlb805uz4gv5ej8bq5lq3uedtmzkyphhq2mh603g9dbd24glu7fd89kcdu8cs5sckich74pn335cqag0dfbukhyi1cueu5rjmphih',
                errorCode: 'vc2xw6rvcklcj6o5d7cqhwrjpr4m1ifgl76vga98j3ahuei0ri',
                errorLabel: 430690,
                node: 6040036030,
                protocol: 'erog4sju1un4rx0oo4xr',
                qualityOfService: 'cy1v859qhj4qnul97opf',
                receiverParty: 'iv1z2qtk37ipog2n3r3tvoh3edmfyvg9ow0ypuc4ojnh8v67qth6t2k260ck5t6acq1bs4sixasz6r7s5isghau817qekf72ls8png16u91sbaaijnowxbgthc8v1424700f2mfxc17rq57qmtdy4rvaonz2m94b',
                receiverComponent: 'zwrl1opkokn7ohgm20i7o9w665s9vc0w1vicvio8u1koplmwc72z69jqnx2bu3bbci3ta0ib99pvrodpo7ibtxha1jre36g6na3opocbkj931n22hrfx5es2sozxf7v9q4ksxquevt7faepax6z1zb2a3n6mdffb',
                receiverInterface: 'sb7ki97jrpoqshirsk1z3bviof0o03u8rjb6se9101xuywxi18ob1fqzjyjt2n5ko4noo2eketpaefmfljln54m40auq0m5a1imsplnwcx494f45c9r6apyeu9p0cg88696iu7r8w8kywo38j3rskepc0boyw49i',
                receiverInterfaceNamespace: 'b7pr48wu5sun9kr4zsztx6avp9zx3bzl0ok9p5c3k0j3f9f8k0c6dqig3hl87384dkle1ynuy5ogkdcgqb9lkhbiw0wk9rxeyrzdik66jhvrbqdmf706pkboretgyt9m3ivr76v78z6hkdgfg6dysernt4b5l50p',
                retries: 3015387077,
                size: 1474505017,
                timesFailed: 2539093508,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3a4ab88e-5a0d-4644-828a-834ca446cdf4'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/3a4ab88e-5a0d-4644-828a-834ca446cdf4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a4ab88e-5a0d-4644-828a-834ca446cdf4'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bc10f843-f005-4396-ac7d-382678fb6e43',
                tenantId: '9f9eb72a-99d0-469b-8d67-a330a9f318e8',
                tenantCode: 'thu5nxqk16oqmfhhkquihfrg9n92zv9w74vqvoyd6pdlelbph2',
                systemId: '86208ef1-de5f-401a-857b-2bab1f8471bc',
                systemName: 'qbnyw23tty9x8dxeap97',
                scenario: 's1nwewb0gnbkktkevow7uu2gdspuj5bm4pa29t3evfulfh2n9i1me6r5poo8',
                executionId: '4fd14579-e12f-44a0-9a55-bcda93626343',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:56:50',
                executionMonitoringStartAt: '2020-07-27 01:43:47',
                executionMonitoringEndAt: '2020-07-27 10:00:27',
                flowId: 'a9075fdc-6fcf-417c-bd2a-7e26db95b6da',
                flowParty: 'c9dkv9pf19336g7f7xtok90dc3b8uauxj580btoyjz5lxico4yzcxk0trhuc2vy10wxy7x2s6f24o1qhcg5hmj2o1h57oo40i9pqnkesbyrq8x9mu69y6n5is3f81b0eoy8n5bndkvubhenesatsp7ln1u8galjl',
                flowComponent: 'vy3b8mfv7mygcgai3x6h9i3xpnx7az7x24dh1iyh6ymacogq88r3mmcviis29x1bn1qktxra527lw1c7y22vxnww4tl7i0xd9rbq84586lc2bco98l1it7yfsotq5f728ipkkkid0f0rm6ameghzzorf4h9agspv',
                flowInterfaceName: '3pr7qazdxlmxn45m13pfooxpduiz1ljw4p41nr9kmiex0y7lp4ax471rtwivpt3rfsh22a23pturktetkrwq2gt4batsjbvnpryj8iapjfx9ch5dprsu7gl3269uclq3pmxz30freoctqvl89g9pndfql9jz61e6',
                flowInterfaceNamespace: '854v5aacyzlr28jesrkevo0ino5qdvyux7cdjfdci563gf7plduvo5v9lrb2y7q28ai1wy1raah1qtbc05mf26lnm8c6ubeyn4gadrohxukw3622tmv02rdkoxrkcieki9lcfxh6saad6b6ffilmmlcbix7zworz',
                status: 'HOLDING',
                detail: 'Iure animi alias incidunt reiciendis eos. Quia nam provident aut incidunt voluptates quis. Ipsa expedita est ut consequatur. Sed at vitae nihil illo non sint incidunt ut. Ut sed molestiae. Enim qui quod dolor.',
                example: '3ou49db5t00o4ve2un516ir1xd4f6hnbj03s5o1daz1pjgm2ck2wifr400ghjzcx86x5un3zq74fr112fcfr0jy2va4ht54a9lztgh3fosfvrn3zv8wyqyi3a0veb4q57d1i8s6cv992myhv70vjwo68a3qrv4gd',
                startTimeAt: '2020-07-27 17:14:25',
                direction: 'OUTBOUND',
                errorCategory: '8zsxb9wph1r7fu02jdad0aojy3oyy29xapz6op3uludze34gylb6oaezffxv2968zhuof4xcucoi1ko111pp7qo85guwdw429c4058zon9ggxughlmta7orovoa64qt4kc4zkzn6x3ud26j2uo8im0746hvzeerc',
                errorCode: 'qwovdwlwj5xg6l1gaetslnmd8ot4nutl79jkciexns26nflbck',
                errorLabel: 100875,
                node: 6131934754,
                protocol: '7ifu88k3at8vpfwt34p0',
                qualityOfService: 'zlr0l6byestsjs9m7xps',
                receiverParty: 'oorl8aybhmt0j4p7ujwt6ro4nrb1megrqbppmc2vhgtawccoturnspgsdy3xlj2vo1nlwosgwtad0xfks6jvwo8t63wgbv9bfxojl929e9f1qo00ozzs9dalchuwceosb6qli6b1o8bwjoi5abpp31lor52ptaa3',
                receiverComponent: '061hp9aq9yucx1p2lhy4t7cn2jasf8xxodn2sjik5uyh7pov2t11q71pbndgspvzgjouakau9y4wjt0birn19heqxw320xl78djbl3yfkl9fli9mtxpp9e5se8u7zan969yjrhxs6xba8zube48o11ob9gy8r7sj',
                receiverInterface: 'dz20kkhqaz55dzw3agr0mb1rm4cggc47e8pjwcadmwra7gu1ewujcq3yf14w08yzhprrixqseo9u2vgps3y51f9o1u4r0m8o5lkhs9xqtkh1au4bexmi9ga3zcivu6hhxbcqgoq7ll0wdgtwcxza5oyq00sppnir',
                receiverInterfaceNamespace: 'tc8w89uab9idczy6od6yo01wnajcfvb4r1m81sth5mp0whhyiez0clrrnv7ds2f9elpkfmc22uz4kw5erfz3tx2edvb4fibfaasj06qrz9l8k2fmr48itqs638tzy42bqa3o2j7o1yu26fs8emnb0ofqu10uo507',
                retries: 1696672150,
                size: 4943721593,
                timesFailed: 8011178110,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                tenantCode: 'm5zk5ba5dpnzexrglbtwwq6mgtfdkjcnkw94q9avvkv23njqi5',
                systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                systemName: 'gln3sczgjyboz01un2nd',
                scenario: 'tvygzzxftuwcd5vmeqmwvi10043zsvdvjgt2gr81cdveno0r8f9so23pnmma',
                executionId: '037868d3-322c-4179-bada-292eeba79554',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:34:43',
                executionMonitoringStartAt: '2020-07-27 14:40:30',
                executionMonitoringEndAt: '2020-07-27 13:49:32',
                flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                flowParty: 'ivluo391chuq4ohn9g0986qt7qgkdr5uwlug1q6d90vt11sx659q1goavgjcksryjfpcqj0cfxyybmlc4x5d4og27zxxt87f53p77qtu4l6st6p81exb896f1dd1zzcelivp1pme6nijes1xmakmtlom75pa6ws3',
                flowComponent: '855myqr43oethu3lb6hjsngwh6riew2mampzvishsaci4l6zdt7egfx9dvfb3vclss6jqb8zmy4gackaxjygg10axeen5u9rtnxzp3zuzw9ybhgfrn4gl1leaw6mw4y8rcv2jdb5dvgtjv4k9sny20j1fhqsff7o',
                flowInterfaceName: 'f0mq1w2uecor2fq07bmwd94izzxaibhk6wmz6gko79smb3z3h0hio8o0gziiuzielwbkblvlrs6f510bislu5t90k32qqe05bfqw1jwi8aezkjzx02au08392jijgqqjfcfcl52ft9lh92fkk9j94h3mv9jldih6',
                flowInterfaceNamespace: '3h0dqn0msvg973vpgz7p2ynrugx1uwpy8ovib3w8rt7cgiizo4c1hu62mmersm6quz563bfwbm65lnrvfzum09ebp80a00svle7kwpgg0sgzb5twlvil26zwoiv8pvtgj40ycjsn7zsa9rxw5oe7cd1h8xo4144q',
                status: 'HOLDING',
                detail: 'Tempora aut odit. Rerum facere non tempore quidem. Labore voluptatem in omnis repudiandae velit.',
                example: '5z8fe1rnxsad3auq26z8ilscjrhl99bfgknxbkp1zhdrw4lbhhv96l7dh61py8amxrdfqwylhe361n8176e4aszwgecoez35u9jik01his4vhwf6f116fpv0y53eznnrbb7oaaz3grjb4mdea5t2076gm6cenlbb',
                startTimeAt: '2020-07-27 03:13:42',
                direction: 'OUTBOUND',
                errorCategory: 'u07hq2qqzjzou0o89ddzf09otxeoxibtew9zo4wlomh4v4gvbrdhhe1c47qx5wdw0dkgbr1o4jwwnspmp94nly04d7umi25g986rqfczdmltvboqg60atm24vczjb6axvjr2vm7jf5y78y6ltb66wgyappapcs53',
                errorCode: 'kwxz43loj4swd21740cqo2i9ahq22hx50njezxkw0w8qbzsoos',
                errorLabel: 900391,
                node: 1389958417,
                protocol: 'ztnb0ykb7ozhm8f3kxxb',
                qualityOfService: '5l0juvcr5ildgu7lyadj',
                receiverParty: 'gri7mdh11gbyvuvqzi7ttu5fqngk1izz6xvonifh4pmcuy4ykp3gi0fhxkdngtdmjvfjt4gf4fpdc5tnjpzkf5ceao7nrqvz52mwatqpic5dewa3xzlben8dsr94hxm5swnno6aec8ujvak9ebkgfkzaoftpe0v0',
                receiverComponent: 'hk15z1eqwqn13vik0dzgztlkfz4f4a1pjctdzbhyhy3ii53h574fr3122lw7p1gliztdk0l2u113vfhuozxnd3rikc6s0w8cw4eznfy45qicvcd9f1y50pj2by9zpx5g8mkoeafb8piy3knc6fiohm5w9k40k4c7',
                receiverInterface: 'gjq6nwlyvkrc91slpvrqurjk8juzxt7pvu06xgqcr7ysifzf1w44dolh222gfauzc87nf3ujr740lbei3m03v0t5wn9ihvsrtr4f25904ecijqcorwgmr0helz76shhunerjjk3deqa210ia2hnzsjcmqk56044s',
                receiverInterfaceNamespace: '6ym4ykfw2zfho1rpfrom67yvmbia285wnwlewalt1azpos305tfkoazewxm9hr1476tfdx0efy0ix7vqfwnhtqap1rbbqnow2e5iqtr0d92vu7g1lj91cfgdcnpdxx11hq8xfnopb7xqrh2isz9vp1k1cywiznf3',
                retries: 2362513692,
                size: 1189069084,
                timesFailed: 9336270006,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a4ab88e-5a0d-4644-828a-834ca446cdf4'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/3a4ab88e-5a0d-4644-828a-834ca446cdf4')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1a054283-b0a9-42d8-8252-b23a2e1b30ee',
                        tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                        tenantCode: 'vzdl5698ccc0g4glozzmy3b8395uq27kfyedof4y5r91dpb1g5',
                        systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                        systemName: 'rt126w8jv4zrg7753529',
                        scenario: '1207dowemlhyrlz9a0k60cguv615ulu75q00u08i8rhb6eltytnfyc6zemxw',
                        executionId: '037868d3-322c-4179-bada-292eeba79554',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 02:49:58',
                        executionMonitoringStartAt: '2020-07-27 16:43:26',
                        executionMonitoringEndAt: '2020-07-27 22:52:44',
                        flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                        flowParty: '02w8h3wva6ysxt85pe31d6z76sxlv2ieuc2xtesbv40sgq11yj3daswsbps1s539u948shywczh9vpirz1zg9tlbwku8ch4h69kog2d2nb06a6q8koe2h49yfkel6bdw8a3amjm2z5zrblbdb99n4ao06nz4lztq',
                        flowComponent: 'gsrut4iuh5nry7gy2uc967ywu0a7zctiwn2advvf1o6devhihe9r8mxx0lmk1wb1smfxewh9ak31vzrj5q64jyk7r6vjw13idhhvfe7w9aqtogll835xf15bghzvhfcupw73st2pm54ko7rrnxv5e1fjugbas99n',
                        flowInterfaceName: 'dp6ym1srpbhflbjvxbi5nc5mxlw6iz62644g4qwpcjmvsjlwfzt7yzy4a92e5zruoit30p8g6e81cwwzz3xc94df4ahbwkb659d25uw28n96umlsqlnqz7kw7k8ivago7p4jn0wpnpkcibk7pspt2kp4vyrq11vb',
                        flowInterfaceNamespace: 'l5l8vhdq8km1hfl2zrhij3sahd612yycty919owa4s6oplvxdjqwtn225vp9woc8o2xw4rlo6z6ee8znboua62of7lfybvp1ne30h1gv9io5d9gyhf3s084m8jts1qz4oae58o9xfob3e0us7jwjzor32hzgw55n',
                        status: 'WAITING',
                        detail: 'Est consequatur deleniti ut eligendi consequuntur recusandae. Accusamus quasi qui nihil natus et incidunt. Soluta dicta velit vel quia maiores minus odit. Fuga voluptates occaecati excepturi dolor maxime quis. Beatae qui labore illo magnam voluptas.',
                        example: 'o240chu45u5m2ewoas7xczzhibkj3neuitqnlhzyp5co5ddc5uacy7ztqvfodrpuvntwow9auygc3gqk4g1q7aoucadbd18qidos416t7peggmb8rkzopq0zh3h1yu2c5poaud4yk5t0ttsxwen035s967282fjv',
                        startTimeAt: '2020-07-27 10:25:43',
                        direction: 'OUTBOUND',
                        errorCategory: 'yqeh98egjfebgofr37sc0ftwaxllf3lgv3ueir2big6pp4wsnl663zt69kehlpej2ja2bgnx7hyn44qll37hdpx9whblxrq4j7e2ehpl9b1rtmc2gfnqe3ed9ljdkydxwp1zb1ioy9o6ek9h3r5o2qwpc481q9xu',
                        errorCode: 'i7q7kqss9h4jxyenwfrk9unctg3wx8kit5qb431pga5p1ftxow',
                        errorLabel: 748408,
                        node: 8789723667,
                        protocol: 'uk8q7gph08zbsogugz55',
                        qualityOfService: 'ujvlufj9w4knytspbpzb',
                        receiverParty: 'l0hr0lgmce8rjsaoy83245k0wgewcl4k8shdv9fioxprzgtt33g9l56izpw75mv5oazuuf86jlu1vd63eegad6tlh5aaxggaog8vy1vua06j35sirayv8ec6punkugy24b9lg0f6ei7vhuhfyont3byktlk33rdb',
                        receiverComponent: 'h2biwjljqgeynnt31eafn9spex3oekzblq0xhwk03pxadcevzze5idwhx1zmtfd6vc4c1mq8os1h53lsp9ug1bj5iswlyenfg36sakkfe7m8b58hdjgj3rzxbace9f5g0l95rq6burst6381chqhdazeq8f8ojd3',
                        receiverInterface: 'n95sms131kwr3ucocrv2u1izsv4tbqdc8egxny6nrfibzs5ohm9cu8dyot8bw93murtsahb9vmwcpas89aqaszm14q8txlxwa1ndtwn2yv7juumjxmq6i1g34nx31fw83pye7bj9rh4m1245kp8d0yuhnebxe7tb',
                        receiverInterfaceNamespace: 'zxk1dh71j1igjpsl3vdfl0ymu9pfq95fgus9e6hy4ab93yi42elor02zb25noozmvuuu0kz8mtkezliny2dmbvd7y8v3kkn9jwa7uagghaimorhwvusdy4klb14dvprju3y67kfxs1zldxruqvnr4vo8669ofxor',
                        retries: 2478965021,
                        size: 7731776304,
                        timesFailed: 6632775410,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '1a054283-b0a9-42d8-8252-b23a2e1b30ee');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            value   : '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('3a4ab88e-5a0d-4644-828a-834ca446cdf4');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('3a4ab88e-5a0d-4644-828a-834ca446cdf4');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a2d055e6-1e6b-4099-9638-fd956c043136',
                        tenantId: '2b09c90f-d047-44c3-9270-a7a16ed8ec5f',
                        tenantCode: 'r8506zfy2p6flhm5jhjxxjdgze8k9zjy6onm0x1maly7ds9vlz',
                        systemId: 'e07c989b-45be-4190-8f41-db3fb2a635dd',
                        systemName: '0x08p6ecrp27k1et9hyn',
                        scenario: '98ba5kd5v3s1r33h50zognexniwr92tyvbkhsddeuqyyavzbei6dvcs85jp1',
                        executionId: '64b70667-bbe0-4823-a901-257c516b491f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 22:15:32',
                        executionMonitoringStartAt: '2020-07-27 21:13:57',
                        executionMonitoringEndAt: '2020-07-27 04:44:23',
                        flowId: '5f8a65ad-d7dd-417c-889b-c5cca6fbe23a',
                        flowParty: 'tdl9pqt6h7psy0m83kl6clgvt54zoebs28wvne2fx8b8ni0mblwkff12dqnxhenoikc1nj4jaf8kq3k0mkg8tz94blcup3uqqrasxq7l0pubc9dbdrp3f8ri44p3dhup39kkixau4dwoqnyqw66y9yjgja3t0zbx',
                        flowComponent: 'odzd3qchszne9hpdwizhzmuebkiunl64kuvf2w7zz7h2rm7eq9txwjjzwc98zxg8l3gsi2cxruiubtg7mobef53vbcdp523v9y7lktctjmuy79ui10qrm9f6icqyja7aaqjhg1ccxpv44sh3rv04vigytyjpko3z',
                        flowInterfaceName: 'tfarmqwvpum10cdp2x7ffqr94neiz862moki8ma5fzufshrg0nf1g2q55aa5ak9i1rzct552suevbwbvfwsnr83bb0agvdyudaexl5v0gfitehchi4hycm55brwm2t4wnv1n4021bbvk97yqp8tf54eh1ot3wr7m',
                        flowInterfaceNamespace: 'h99l8e2v4jyvt7lp5x0d7twp2awiuuf67lwwtyr29auwvtmb7z1c5d9nnofylgn90rwilm2qnd8fkue4au7ogl0nuxd0zieb0gjtnsya6yy37tm07vxf113pyxyelzhc4qko1ey38vt8a3jwjl8tsx0a9ypqbbuj',
                        status: 'CANCELLED',
                        detail: 'Velit corrupti totam eligendi soluta eveniet assumenda maiores. Hic sed ullam sunt facilis est laudantium. Debitis voluptatem dolorum eos ut alias ratione omnis eum quo.',
                        example: 'd1h762wk7oxd47myd99s6iudn48ni34k48s8h3hih76ht7zfr3v6hx871t0enbnoh2ehm4sn2mroemde4g6ncd92thl22itlm3xswwmezxj6xjby0flbphiajfo35zuuava2wg2j76lune8j51hi21q08u281r2t',
                        startTimeAt: '2020-07-27 22:07:13',
                        direction: 'OUTBOUND',
                        errorCategory: 'oig4zulbzzg9r4gb0r3s2k27p1okl9wervf0gje2kpnarlkqcam6e4vtkvnq06lrb8ubfem23go8q4u82ruwi3mifxug3wd04bhuddu9zichsmw6itg2qx42eo6rdvaruwmfhou7d6o2vedh8cfxqmine7mup1r2',
                        errorCode: 'ty5utp6s1wk3fpi2gmcgs7frgat2h3pzd0yuunb8nhu2g8uxbt',
                        errorLabel: 822675,
                        node: 3015749344,
                        protocol: 'afaenv01yqmhlep57ns9',
                        qualityOfService: 'qdw5je56jekisivo0d4q',
                        receiverParty: 'xhj9r734n0u5w5k5t0kcvv7yrwfoc62to9bbk2ue34b30yke1rtsz7fxz7m34y3ic7s7bvp2l5mqf8j5ud2ijwyxr1f0bwgfq3rccsxon4a2jehre2eisxbvdp5beo4g6z4xsiln826cpibrd0q1zbbei5y8ngyd',
                        receiverComponent: 'd4wfky1t1log9w69q1hkmk21yjluruwq24jzn1we6ievwdct8clu8fqgyqhtebv15mbvwh7finpnpcbbeninz7iacg7ufqq5vix6fb6c7lbf180y799b3ewrsoeudo9nclsoh8bnt9s4v09p5feubb1mwfvhseem',
                        receiverInterface: '7s1jhqyl6e9oa9uzv7x8nm9f9cfphnoe1h20553y0i2cbdkqihi1gpydq5pfhiiayrpx6p6p1wifachph2v1emlduqwju4u0knkmn5yhtipqb2baxn8jvw6dogi6wmghjo5fzcd2m0sb1dgs2b7oefzqxpup3wlc',
                        receiverInterfaceNamespace: 'zg8cjqmyovty6gfv0539n95mqte8a94e1dnf4zzxu5gbmbw5ev3buiy02oj06hj3sacjdlxq9eaqv8shrkmpowc4iy3xb1am3cb182mfa9a5qt6rykehy7xvujronojyumazutxuqnzazln4cu9s32d09fx9xfsi',
                        retries: 4331764576,
                        size: 8899544924,
                        timesFailed: 7282035046,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4',
                        tenantId: 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe',
                        tenantCode: '2y9evswtxx7fyhssnyvtk2ocqvaztao8sy3pjs83bv39clhcox',
                        systemId: '62c25b1d-785c-4414-8fa4-f5954855e72d',
                        systemName: 'q5nyt8ovqb9npiqrfdt5',
                        scenario: 's8opum8zd67l9ddlx47lcjij7k1dvuq7dc27fnvo3g8kr3mus5heznu03u9r',
                        executionId: '037868d3-322c-4179-bada-292eeba79554',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 01:28:34',
                        executionMonitoringStartAt: '2020-07-27 07:38:35',
                        executionMonitoringEndAt: '2020-07-27 02:44:08',
                        flowId: 'ad9fb78d-ea7e-486c-9312-32dce5d85c46',
                        flowParty: 'eehdzg0wt200m17pevwnkdxiogtvjvt5oxhwjuedyeccqooidwcs8oxdug2vbglw3ta1n7yojobfq9dhxjzzrn9tdto0fd7srgswdx2f8vs36jjeuzrf2b5h0oqo8zlrdqe0j5ri9m53gxtzkfjktxec8k046yda',
                        flowComponent: 'sgbcqqpb460uz4352djyqc6dmemfwd3mtw6rj159g2hnly6g1yubmcrqi1o2oued0lsf8b6q26teck32aksw6xxjkbig329aoep6377io00gvhj2mr36f2c0t3rupabxx5m5po6b4fuxejkxq0jo8qvtdbmd6g84',
                        flowInterfaceName: '35gfcgocgnrzc1apa784jxs7p3sm8jfxo141qnvoyofe4g2jrb85b703o35l6ou4orp5hzp3oz76a1dkb0wkdn1pbd20miwai19x4m809ynl0k5lj1fmaq749gaz93b5t6fp4mh2t40cr1okxjdo5l0rrhjvsezi',
                        flowInterfaceNamespace: 'rkt3wdmjy8m1zz1vl0suqcu1m85u4cs3n7ayaoqgqa4kkyab8xl3f59xvtivualnjvuo5zzq3m64muhiix2vxz5kk5gkqixvkhx6cfcbluu2nw3x8gntalllrs642xu6bbynza440kvn2l9mjajimfs5l4k6c69l',
                        status: 'HOLDING',
                        detail: 'Fuga unde necessitatibus impedit. Veritatis aut in eum exercitationem ea ut. Magni magnam dolorem exercitationem. Rerum iste est. Vero porro sint adipisci eius numquam.',
                        example: '6frvhclky7o0kps8lvh3k96k3hm12sns173a7pk6r3foic2p3kexq9m7hadmxy2vqa2d84ytm0kggbjze258gvsk2km8quvlv6b8ne49c6hfz9zgwxdzylv45roqqo51k83w1mucjkn6cm1fwmzgzl2i6bnf2rlq',
                        startTimeAt: '2020-07-27 13:35:51',
                        direction: 'INBOUND',
                        errorCategory: 'nrkzjd7ahe7t5skzdublrt4mlvix473z6umwojhw9ejdmbkpmd39543duy96mp0hirclovfda14nbscog75t54om439vt2d82lw0yecpsun7ijgjcrdf8z8zgv1pk801ti903brgddje25nxkk9ze57u5c4yiu7y',
                        errorCode: 'hb627rvfz91thbndj11ij1vy8irg852lumlo8oox5rl2ya24m2',
                        errorLabel: 526754,
                        node: 6697989397,
                        protocol: 'xf6n1ku6oqorbk83cg78',
                        qualityOfService: '78x16rfcm9btieg5ydiq',
                        receiverParty: 'qhmhhtco3b9f0qu544gx3jc5tolpz3pqntq3ker76y5tchugdvxmeh0b3y4xv0378buueaezinpw0zcy1cbf3dm0k2uiz0scar7o29q2wpfko6632fqin5blksbrjow4jcbrmd7n26ticce4cqq0qsxcua6us8az',
                        receiverComponent: 'os0mdqrqz1l889pi1dmdqebjur4nna9dr57i0ijp97qxeks3kl9h6nf75dui7x00knbxs9rw8g5mugoby746c3a64b2kk0aua0syhovcot32nk52gxskxaf2w9l62bzbc0la4oynm03l42182t14zhgx2qs7l0lu',
                        receiverInterface: 'sn4wivmbnj52ubxths5nivzvq6qzw7z622un1xbpu1dynhyn4zqg28ug1wgb2rrkh51nv5spwqyvjnaizqicnmz1yc2f60w3842sv26d1wshs52901mmhaxhsa4yjzil8mcs57oi13it13vu3rwutom893qiijp7',
                        receiverInterfaceNamespace: 'xculq11aad0vlmsn6x78awp9l4si0mc5oc08v2u3a2tf7eaf95upygmf8xe82c465ztc1yspo92oxo7b0g1zaft87pub44q0a2h3a5g5x62hxpzyetobijjxhnpx3qs1htgpzlfrgkmcjl4s2vpv7y5gsa1gyogc',
                        retries: 7642656283,
                        size: 3064897689,
                        timesFailed: 4939534146,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('3a4ab88e-5a0d-4644-828a-834ca446cdf4');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('3a4ab88e-5a0d-4644-828a-834ca446cdf4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});