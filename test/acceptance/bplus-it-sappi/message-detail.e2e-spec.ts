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
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'nvjpvcgbh92qnn4hfbht6aciueieml0ioi46lqzbqi9vxmu3zw',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'ko64kapk0rfjv6fw72f7',
                scenario: 'hujqz6mn3y75h0noknw1uupkkzmc4r6wecp3zygpogne502ra9pp4uv7ac6t',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 23:18:20',
                executionMonitoringStartAt: '2020-08-04 06:54:10',
                executionMonitoringEndAt: '2020-08-04 10:49:40',
                flowHash: 'il5koebalbc4e16x7kfy5tyfgv0200ftfodkfftp',
                flowParty: '2r1joobpjgqfk0erz80k8bvsss86bmniegybw1nmx226f3767g0tcabd5noz7m50e7wbxf8mjc62l8kz8cme8c17qb15x8dqkxwf216wv27sf2cfsxfc8uiibrsaso2c9hpfczgas4ybaryf77kiq20jjwnnisoa',
                flowComponent: '3q32ncanu3mx9yoxroa6opmaeymyt2myuhur2v8lvf1fvqzzt1wf9qdb9jcebmgkqddmzp50voqzc4lcjummiytuwju2gwhy2sg54qlfwast1eoanjbpfxucin2vz3nh795fvk9x60bfcee4b1kostbnr5nczfz8',
                flowInterfaceName: 's6752a9p1ufnupss6degu157xij73v1hxo1mc3zeo0bjns0kpzbikjt8suipektkbfn8l828nsxiarsds6141t767sdvfyqhwbt2juti32yy20sl9qx266jpbrm78otx590qyw1t1czynb0rcz5qhmmixd47pdmu',
                flowInterfaceNamespace: 'pet0sko9dneziyclo4pr7d2jb74omhy9d4cmq04xz4ufi1lyj691llgg2ywa5o67cfiwnkcrj434qnozylncf5hrel5j7vdr3brehoxoalzhxlo57p8s1bih7zxe6ieg5ino39512ha5ph7jabc5lhxmmoosq06u',
                status: 'TO_BE_DELIVERED',
                detail: 'Qui nisi dolores nihil repellat qui. Nisi minima id quas. Ut ducimus praesentium. Ut aut eum occaecati id omnis et eum in. Quia culpa voluptas sed ut. Nulla et nesciunt distinctio aut sit qui pariatur.',
                example: 'ktrh8wjuo7rh3cye6hcexw4bzvvmqpw8z0cmoch1kkh1ssr1tkms8g1jhy1dhcyo25ix8j9octepfu4p9mb1i6bxoj5zc0rqa070yvy4fahljgozxlxtzjx4ce3n5t7lo9pqyc2ptv3jhfbvu6znncto2wclphei',
                startTimeAt: '2020-08-04 08:49:45',
                direction: 'INBOUND',
                errorCategory: 'h3bpojug9mf4l5lxiwt0yei3x44zow67c23bdp85b38z0f7623i90uxjb54ceip8ftdtmylnzy4m1o5fs2awmoxgmuwlw5nl0gsuwvv3x64am05up6138nehxluvgyvurahv34o23kpef5te4jcgp3h98zxaabcf',
                errorCode: 'l9bhw6yax8x8dbqjzci385odhfv57bcua63unbpxojro0o3h4q',
                errorLabel: 632039,
                node: 3639587433,
                protocol: 'zk1q69f1xzh2d2486amd',
                qualityOfService: 'zc1efg0ts07wxliklfo1',
                receiverParty: '51ffsyhc0m46ozt8x7o4r8o3h227ywvv1zemsnavrblxr0erh0j6lff1fptnbz4q98tw5oh5nqrhki2jbpqrs45epfgqol8muoidrqua03qy9anlgi3zvhxgm35a4t555d0m1juanh1mwjib7h471glkuzrrphnk',
                receiverComponent: 'fg48vcgdmlnhw5ndt5gt4v8d8zm2ue51h5gvfsgaz4swagd439btbybvpsa5wq0vcj5pegg2byz8qkbj7ufsqd4vvru95e2zbn2dfey9o0hracaruz8nemgf6i1aoabhou2je6z4vubij7tb6tm78c2gbmdiza7e',
                receiverInterface: 'cnojhzz65nih1v83zrgz5bsf9i7eh5v9gho43odlsybwlcyl14zd5a4qn8yabn3fnmwg75gxsncylqzlswys9l0bthqx4hsmpmfw6vgziklong56b3zlvjsnaftunweslbo9l0ge222lmh33wg0stfz86fq5lgtz',
                receiverInterfaceNamespace: 'y3xsmau7lrvtm3fnflttpii4p0mcai4zxccgerk9nzenzmekaxmkuedrxjpf0k2rjykd58y1sq25g3bvzv01eauikwx42p64hy4d2wzoh08f370xjpv08gbpuobzwinsscyq9c5p01dmv11tmz12h7qp5abcmzg2',
                retries: 1200593669,
                size: 2704990680,
                timesFailed: 6935437384,
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
                
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'a8ma1xfji1l08suqtyb53i5rahpfdo75hh6j59lb5uuefwunm2',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '0lcmcru15fdn5masauab',
                scenario: '7gh3t1ghxg6fjp851vit7oy5lwmg9njdjo5bppzqshu8ulv70bqlnisoltz2',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:56:38',
                executionMonitoringStartAt: '2020-08-03 23:51:41',
                executionMonitoringEndAt: '2020-08-04 11:43:09',
                flowHash: 'yr1u3vozyhhtkqgp5kqgk218aix3uzsyx2aj9aar',
                flowParty: 'ym2wkkbwz2c6nvsj69novvbpzq0ywi8sdsftwktzyvho1pnq5kikziwq8b24b8di5u3ykygssocekevf35pdzf5lem1jme684i4zcv0xlliu22oiu46g14xfaalif3o2lb83pbwbczxhnsou073j4naizfq30y2r',
                flowComponent: 'kml8jofdo3zwcnxlo8ohaldjhf3qsfe3x7k6b0seik6ebrer9rry00r9qv06hakj9l95rdnf9nryculn98tpyo5y2v0hlmeo554tdarpu9agzvix5xhkck7e6wz4608gbgu0ill4k1uhqdisv9dgraz4p0kpxga6',
                flowInterfaceName: 'bvgmfntigacw8jr96f2tvj7rswztak6566ffuam5pz4cu09y3shtqa56kyeagltoci60rtsivuf2urujkkcw1ady4amdkqp34lti3xlzgikej46l5das0nfpmu857c5h6k2dccltm1nrlwxteyanagdg3w5zwvs6',
                flowInterfaceNamespace: 'z4ia5h59agjiuf12nxw7gnevl4ohqa0wzwedix5self80e0wqvp71yi9jjppp4u8ff5rwx5nqzny4fqcabu4or1iojqri8myrr0ij6fpp9s8ujvljmbodd4m7pdpz21wo5a3u4qpgi4ih5n3l18ixlyi98phrvwq',
                status: 'TO_BE_DELIVERED',
                detail: 'Qui rerum aut nesciunt cum error laboriosam consequatur inventore. Quia ipsam sed dolorem reprehenderit aut. Aperiam laborum expedita odit ut rem possimus.',
                example: 'tky0ftsuztx2c24wry50bcbyzuw4bbtgz2xp0ww70ui6fsanznq8leconb8gq36muboytfydzari4d8hh1b86n6k357p03b2l2m63nwmymt1rf420q4ab6kfstg1581eltoruo9mqq18i47gvbd94huw6de42ue9',
                startTimeAt: '2020-08-04 03:51:50',
                direction: 'OUTBOUND',
                errorCategory: 'kes8rlf3gnaz4dbog76sheatuwc57ede6cvpdcwmlh34fffob4opse47mjtw1wwfznx68sfq88h3cqkew8l6zh76gwgyvmsqyud53zxtbi0wvm4z42l7o5zvapqlhg77gi9gkxgh45tpsdmyw0ro00zvz5y869an',
                errorCode: 'f5samixbmhl7wvzlpjpwrdvk6fxe9tzvjhceewgdqy61svavng',
                errorLabel: 172286,
                node: 7862641047,
                protocol: 'zw8tlqoa2igzwxs8xjua',
                qualityOfService: '1tg8m8edjnh5sjjcqv6f',
                receiverParty: 'x5qqopj8jgtod9zzcjwp3q4yq3ria9514f3wnn4y6cxrkkokt00286t2gp2te3xtif5i5qshkqx4tc690jnd4cpxvhvq5ifpa9sdq9gj374ragqp3ivrmp730muqddk1tih92ydca0m0919wjwmq75aqar04378e',
                receiverComponent: 'e2xyw4q4v0xaj8r07bly69qlhnhkpcx7k5guf2r43v55eltnyjlm3axz7qun6ov3clud5lwl3lb4ycjc3i07izii2n4xtf8jyo9na3y45e6l6eu6qp2y0cwqw4p5leldbngeetecpxwe00x4wq5br3648wstkr4x',
                receiverInterface: '2uz58lyoq282ao8l0rudres58t0tmdpwps2n58p3oa78r251w0t89nr82po6pbn7pbge32va87gmtuniwhhgmlyicgg7bz7fk2fkvpelr3yi3p72n03bctxbtdru3mkb1z8wvqf2nrlal2tcsx1m0nnk4292ioio',
                receiverInterfaceNamespace: 'k3yhutc2jdaiz52h36ls0y1eqjbcqh4s1lj9rwj5ljxuxa2wi3sxflb2iiecnsjcrnynptjezg1xz3ec5w9tj4sv1tcv8xlw2xmfium5cosvyc32pqx2iddfabegqg1zly0d2i343n76liaj7ugtpnjw70xgwk3g',
                retries: 6907168923,
                size: 6547063551,
                timesFailed: 5838408663,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: null,
                tenantCode: '8oib4wtj8igmx55k8cbc64lx7yf805jv9v8jrayh5xj5rqa3tn',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'lammv0ctfdn7ua6ggmod',
                scenario: 'w2524ui00wt11x09t6y4lqee25bbwexf7oik546udc67603a02r8zxg79rsg',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 08:52:57',
                executionMonitoringStartAt: '2020-08-04 05:01:11',
                executionMonitoringEndAt: '2020-08-04 13:43:19',
                flowHash: '7an9e0ge97ex6autkd0rd9663yb7cknii4lu1et7',
                flowParty: 'u2n4ybh5rnogblkjwgq6w3vpg9psklajsvv7rp37tiyjh502f8w5o61v8z5mjpkp7x9vmk5kt5vl3tn9415wwwgy5kw5u3btkawb3apvtnfzaf3qm2nt1qk8vilnnteqijhirubyzfp8zrzsstcax2259s3177oa',
                flowComponent: '5v6bjejtclfhk5qn0b2yv4w553e61coh7glf3g9ymofhg3c4qikzr4cmcztwen9lppi6apxqbwqg3eg308ttrsf9wcunyslnyys6vui3roux9nql8wrq8cl55870fl4xmtesy92ybb2q23ps0uoyn0j61h07glul',
                flowInterfaceName: 'me9tqx2c7m3optueqhtxdypqagpy9s7x5kyl68hdaz07ygdrohn0f7o8kd350t95278em0ozat3mo8ikobw45cca4gl9p4472tmfxbjvdv92a4img5oo3qkasqvwz9c1g4n6a9iivdlln1dg0ywe1p7xq4shzb8c',
                flowInterfaceNamespace: 'xkjbaav6nzwzf4boaw1fzx1ggisvch0bpvkpyan06pnn4sgbvzj7pyc1jths9nqdq4bqc6dhbphsyocjpnjg4cb58ml9a65cnzha8z6u0uhp099gkoi3s5azr9qcx38cii4ygngesaw1vzmxmrdscl36pe3w3nc6',
                status: 'HOLDING',
                detail: 'Fugit ratione explicabo aspernatur repellat accusamus. Sit dolores quia vel. Cum dolorem enim. Et nobis soluta cupiditate unde.',
                example: 'q2mwzg4386lqj7eofevnkt3m7w51pmhzk7z2vovj92adrag661re51hwwlx0o34g2juq11252mykb4e6vq1f9625i545y6b5w417f9y42ghskv6r2p3z4t4xn6pg3apckpcas05yywsx19az52g55av75cop79jp',
                startTimeAt: '2020-08-03 20:21:43',
                direction: 'INBOUND',
                errorCategory: 'ri1ajgd1si50khqf1us4vug8h7704vjidqx2ojufevgvk3gm28suoywi11exyl9v0aaf9g9defjkir7j6ifj6pc5cp0194q8jo5g5pa1l7hz8k0kjdxy32auw1src28q0ckght0npff4m7y5eo5rg44ly3q0idrb',
                errorCode: 'rxu10e33ll8gm2li41ucb1bmfq1z4l36t296dbtprbbga9170j',
                errorLabel: 838883,
                node: 3893490550,
                protocol: 'zjlaokvz4uzycg5bs95u',
                qualityOfService: 'bg23rxui5uag25tj4z6k',
                receiverParty: 'g64sh2nq18imhkp79mz97ecyjnczxuc0t37fccuur7idh2j8ie0o0y50ylotcmev2ivsvrkebw7pg3v1r3amfqvzazfzs9i5felnpg99957uw68vjcnmyinzgxpiqadjohw5o04a7pq98ntd5tiwg2uiysl5zrdx',
                receiverComponent: '21yqpojq5jy9vyt1x66lzxhj6jxc1j3rvqxive070d5xcbqqxskgc71k7drw1l6agod4gxr81vhzphvcewynzf2n6nlm1fssvk1ky1kn1u8z7eoz2okac5q855vrswsc1xy0rdxkkxs9efmfaoezu3w9cd8kmsth',
                receiverInterface: 'edzio8i7yr69xalsr1pop5tfcvs880zswyi685o7jn1ik19zjrigx2m5nlajgmgpo4pzeix4inx1q964l3542m1xf2lt6itk6bfpk0l3xpk0be55jqhxgz4whs9825861rrum4qpwq15krn6byldvtffo4sh3ohz',
                receiverInterfaceNamespace: 'yme23hyl26j49vqt326iuqzbzvsep3mu0ezixb477cefyrjkxwaq53xpys9d5hhzt8i6z2st0izomayxml3yd1m2tnonmpu7v6nexc38xjby3qjchuayhj28qmhmvg4ge5bvz473nh3bsxy18h7x359l8vrf9kil',
                retries: 1358159168,
                size: 7626718046,
                timesFailed: 3326681088,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                
                tenantCode: 'vcmfhx5ct8g6bux2s0l2f9776w9vf6a96vgb13v4h2p676oe47',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '27ubmca7jt1wh7sog3sl',
                scenario: '22ra4ayhzulq89ycvzodi5qy4qwyn2ry5uil4z83iouvqm9m05dg3gj5nboz',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:06:30',
                executionMonitoringStartAt: '2020-08-03 21:08:23',
                executionMonitoringEndAt: '2020-08-04 13:28:32',
                flowHash: '4igunea65r3x97lr2jhg2ggdesl6tddw1f274v6b',
                flowParty: 'r1z71bjlti44hxa96xndhypbfr5fgg2tz6nvf17mh930gp5rmhuzihs7ho2e2mfchhbb5neezsoj22kkanxfd49ftdrp43bdo89rfbil139jr4dbqwizscqe4oggrw5hw64uqapu6vqxtkq2jeoksvh67onff0ng',
                flowComponent: 'gvz2rwyvmhqbo9sz2t8f01fnfubvqbmm0wbe2plzf5h8lpsepgfnkwpnhb5o9nle5x8ppdr1yfexlxsahcy8d9t4lb5dqlymyn2vr2vw4yjjk5mb76mz02bb963g8o9dfd8i1shh6897ts1ft7f0d91hdz6zmrh1',
                flowInterfaceName: 'qmmk2uxh3l5d1yscdy2f8my7dft3kfknqyqp8sjmofdmoi9e0ouiy0kjomm6u13u6s7yxrzv56tgmybjbpwe322p2rjo6v6wnivng0lij7q7mwjwz0465iey5bj6vmn6syx4kgcrhachrl414enktkysuruk3npd',
                flowInterfaceNamespace: '0wh5k1iuxz7pgbkun707sku6ytug44ivnscb60veo57ba9qnxytont081z1kqggty7oxwp8d2sh0b8zrlfce7obd96v84scfy9yhb1d7f29qbq5iqtb3fv6ulsozzaw8s6qsm7kglary1nc1ue6hitt5if2hg2qg',
                status: 'ERROR',
                detail: 'Mollitia enim reiciendis ut accusantium sed consequatur. Et molestiae quos deleniti eaque accusantium aut non eaque qui. Sunt ullam doloremque. Voluptates temporibus aliquam rerum voluptates. Tenetur quasi voluptates consequatur voluptatem doloremque soluta.',
                example: '8qbcd0v1ngh1zeaan5r1louh0nvbfwxu3l3cplq0pegl3f1dcekizypowf2qaj8p573y0l77zc2hkrgs4gz4c0s09xdov6i7mk0ozq52hm1nso5yw82tpzdm0jchoa805oqudjycl0hktzxqedcm5dtvxj405hkl',
                startTimeAt: '2020-08-04 05:46:06',
                direction: 'OUTBOUND',
                errorCategory: '5lzylroxz9mhs1vu6cojethlo3bqhikiwhq29ljjlw2da4oikbwajdoe63d3w07owgxvhhhndkp2kf2qsn1bsp80dbliirj754e1b4p0b6vjoc1ehv022nd2lqzcfycgh1c0b77ty0m5ow4864rfcao7a7px04t4',
                errorCode: 'v7i4t2xmwwbykn78mg48qbpgr34uigx3drcypv9cp4ye0v1qd7',
                errorLabel: 166416,
                node: 7811385334,
                protocol: '4gqpyhos88en9l0hjp6h',
                qualityOfService: 'znuh3lrb7b75bsvda8s1',
                receiverParty: 'dct6929805pew2sehbuim8lvolb8cagny76u618ns6nuw53eed544fy8nrx2e6ssg31yp6fiz193a2d3yc17ap4flxqgmka7913bc91hrdfg3yhopw4inhe5snmg97f0l9438fbohr49cxys674gnjjljh75nbgl',
                receiverComponent: 'uqxlie8tfbtbvctybyt188x04gmynhqih61vnn7fbz4vvvhq3393j1i7ir5qysdw1v1nlubvqcmt7adfk4wbr3joa8jvrbdk9c1zmq1zxgs3ls7a4aj7ipf4629w1s6oqwui4dm41fxw6jc22lxrxxh9auclzhaf',
                receiverInterface: 'tjyqxtfoodsca04y752kjtzk6saityiy8vyhb6hcv8763vei0gfktktwt93znl3rryzmhgbxd7idgmeie6p7fxptvo2px68r1kirndby80xt3k9868lhueafxa46n3q9l7wbbw9tp64mqtdzvm6y1ksgkdpsm2x8',
                receiverInterfaceNamespace: '7bol4kcav8kmwfphpj989nzpfjbcro46wlb1b3abuo4cz52uzc2mzyf9uc8chq8w0185mmmrnmt5ocgm770mkbuf68g12gog68mjj1h5xar2xp9jymjb9pi630fnyi02xlj9k0so7i6u8rikjf8447h8zxfc4x5k',
                retries: 5590925082,
                size: 1905717992,
                timesFailed: 8522649260,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: null,
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'e4nn1umfwai683jkzrg7',
                scenario: '6gi0lrpqisitnbnc6vkhigrledll1d37ayddi2xshxxzlkiqd2iu8ilb8plb',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:06:05',
                executionMonitoringStartAt: '2020-08-04 05:58:45',
                executionMonitoringEndAt: '2020-08-03 23:51:26',
                flowHash: 'wc9npdf6f8haf6ga14y49tz61rdurttaksyl4hkz',
                flowParty: 'lyksk2xe5pc1r9vheumv2c9lbi86u9q7xziixf4dwcba9acxpuw98w9ydjqeptfwfkvl8r6zjw683l8ahh9dslv3cmzuplh8t0gzhpojzm4de1pj40g87ioj89givzdakhqd9xa20vos1v4r4yghntfnll9llhxw',
                flowComponent: 'u1zpvn705hhheasw8jepbejpyiohwct5qzcg07c3gwagz7y4qxxf7yhb4udimmytcw9z4f7evrs9a05k0sxt35oy1h8iydennf6bu0mm0tgf6jgfo7ip350ufxzgcyqhu0n9rqyubn8mnjqvcg4h7porrry7quez',
                flowInterfaceName: '6ke3hq4siq641l2q3u6khcac6465yykatk785j94t18seoglpl6zs89uqlrngwjtp958t9plzoo8igfesl7r2s4egiuaa09h59qlh56vn3s8lscvs7ufssjud8pi21gsena22l1nbgyc3hqx96as5r0l1ttddzhg',
                flowInterfaceNamespace: 'acthabn2hv6rb0r42n70rs42wou1xspiexaj21lzq5jxmeddz1i0rqn0ud9uoqiwe3d5af3p11rwnhni5pxn611jfboohlqdzol5c98btw2dbmcvoauppgqb427cipywiw0877vwet11g9ym8oc1a04wgc9thf72',
                status: 'DELIVERING',
                detail: 'Eveniet voluptatem earum placeat quaerat repellendus atque autem odio. Quibusdam omnis nostrum ducimus nam enim. Laborum nesciunt aperiam. Nam cupiditate minus. Fugit necessitatibus nobis illum et provident amet. Eum rerum numquam minus dolor.',
                example: 'ktdjpxx5rgl5b73gouliu7ozewtjgckks31ras1wtf44k81nne2a9fcz2c0c67qfazo9pwtyf001avuigyo3olzfbpyunqwq6e07t9maqkylfikbhz2dqo8n7vg0x1cwjq5ci6bs98li0elyzeu851aij92mkrwb',
                startTimeAt: '2020-08-04 01:46:18',
                direction: 'OUTBOUND',
                errorCategory: 'p12e2tv5nl0iz43rpy0ixz36yk2vvjf0go3j8t52xjkij0f7r9b65iptb1xg1b1fl64zo0kg0nhgg7izr674ntjr1re0muixkrd4xkmfjlgmxuryz9afic9i9424lorkixtzgtm4fxummieri7lhbqgt4yd818n1',
                errorCode: 'x5nfwfc8803mjksv168b6wt58q1yl2176x9cgwv4bnmghbzruu',
                errorLabel: 232948,
                node: 8853549501,
                protocol: 'ok848x4ar6m3u04kvsiw',
                qualityOfService: 'atjcv09mlk9yb0xib3qe',
                receiverParty: '1ml1dlr4cyhu5ks4uf7thru6o1dmx3wrntop6im69pk5jnbd71nk6t8d7ip8c1mnqedczon9vung694syah3tfwwqz9dvu3nrwr1guqe9xxudjqnw8ir79a3xyhvauy4foo774uhrelwxqbqmyggvg57kcjjx0jn',
                receiverComponent: 'dam47nl2hvu7afy9kan9xv3o1mblyixi115ubjhdx55pu6n4154bgnqx7sbhmr163gdabw33lb573onb56ll42cpplxdqug9zoinmfft4be1lb0i4drmdzbxiytfu9gh7sjbtqo1y34d239kbud8yb01e4l0vh5v',
                receiverInterface: 'ddtb1meuh50ur9u93nryc866623vhfpg7043t9ey6eapy0gdvbhuotcu1d65vufa5ws67pcbswi9b8x57rezswsixo47h9qvdac9zucxy3qoairerlc72j8giv8lve5mjdi7gi4y2pke0hfjrsb5r7340ajgmcl6',
                receiverInterfaceNamespace: 'afyw2rmxc6owrbycsphfxautt60ksjhh9q297ykinswlcashhdgbqyhttlib7ux5xdxz43pxca42fi1wlulqp5h6txek0p72agtoltoccnradi8a3inb1vvv6vlxudu6076h1ebnp6xtgyuxkehgppx9uhkn6a4p',
                retries: 4216638766,
                size: 7156006754,
                timesFailed: 1629831918,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'kbnozpr52pmf9gg4kv95',
                scenario: 'be8wyxln6lilcblwcxscml0z93if99mdceez529hlbikj8ndt1l2mpttll12',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 22:18:22',
                executionMonitoringStartAt: '2020-08-03 17:51:09',
                executionMonitoringEndAt: '2020-08-04 10:55:51',
                flowHash: 'vx1wo1d9mf0clgokj62m7tod9ptk2x1ml6ygs30k',
                flowParty: 'p18y82bozxxmfu52rk26tub1nijaz835m1v2es69qm56z7kgjbop6p2bx2szl9m78g8gznvcj9pkr9vq4e5crlaa7feyjc4b6hom66fvwgz7bu7mipbordz9rxj8161z0u43cdq1mq2jw4lafvteb5y64pto1xqf',
                flowComponent: 'rnjg3rua6z9oup5iro0w6oy5e3t79c1mdejvct2zcfnrqlkx2o78nqhp7erg524dm0s3g4vory373b1pzhgk2q5b0o8vmmwapxus8389lfm17zzvdsz2ezb5s5vw8bcwwikiqa3b2ytwt81y0kcc43odjd8yiv82',
                flowInterfaceName: 'y25r7n56ryjsnwcwsp5f8e06iu5j5ieef4bccp8h5v4n5ur6nmjq9dlg8k239sd8uze5z4uk0qa7h9br75g5v464hsioj2ytb45ahgkcldakdnx3jklj2rg8uw67021mtiai27g7oyqvn3bbd8uu8dn1b1ks8l8u',
                flowInterfaceNamespace: 'qjxhj54y44xjpytwkidisk57v1lschve0h9o56g2n1bvg5a65nr6h3i52lmmen4j1a1xyodhcy3a1d0g9z0ifzrs5bcemzpt0lwjhee7xctkzkf8rkykvlwff7q4sa4rwrpcdfr6eetv2rh1wvdqwicpiq6alolq',
                status: 'WAITING',
                detail: 'Quo veniam cumque ullam magnam. Itaque vitae harum et illo et dignissimos optio aut. Consequatur labore perspiciatis quod voluptate necessitatibus pariatur.',
                example: 'h2nmz1osgkmazgly8p8oho72asceur77g81rffgnca72b1ict7vt8ors0eayqmg1w32njlvp1dz4zvrnlcsu5k7ap6fggbyh6hft49jjxuyta6p59s27owc971ft3x8rrdd4jfysm7zcfwn83k70kv8swkwafb06',
                startTimeAt: '2020-08-04 09:05:14',
                direction: 'OUTBOUND',
                errorCategory: 'bwkod34xzhatsgl84xeup0m9pydp5xkx67cornuxq70oxgt0xzsdir6djkzg6j8vf9owfcscjqv3p1cyi5a41g5nz1cn92yh7ze69s7iy9khtqxoq4oe236187s39e7jcj82jhbba7j9dh91c89aojro78hk1x7k',
                errorCode: 'pllen946eqovxyounzdir635w9hnvqzt3pvhnkazjywhtd3qaw',
                errorLabel: 457866,
                node: 6813734273,
                protocol: 'y0bgdgai8ta5ed9lc83f',
                qualityOfService: 'z8gf4133djqnpbmkxmdk',
                receiverParty: '15eewplkzelwi330818rct864vwfcjf7bbwls40cwl07haqatg1umtlbo44yfe09s9h62h93afl7wbv1do378b8o57gagsndb8c4pgf4od1vdljqpgar4x5fq51gwhhopav1u1fm2u198v50vurwgmdzpa4f50e6',
                receiverComponent: 'djyx3gyli2go8nac0wl6brk1l0ryrafurnull4orto6lxtuhz4lstqfy7zc6d8j2vz97566muyqfevhyfwjb8bb3np3c203j2gxxihasjblwyh6r189cy7lulje6tcsr459cbrwle2vakce24olvvhw1zpj59qgr',
                receiverInterface: '0i5lgt7qcjrj69km89kk34p37exmwxpugshb5q36yvikxywnj8dgvg07q4ihlc3zlo9tihy7eenql2a8j9xr62bpmd0f7vqei2bscuk4f3zxyecfi8mcsue9fcj0a5evb7zox0o961u3zs9b3i3h171bea18iwj0',
                receiverInterfaceNamespace: 'jh3bfctd69iwntmsjx9iunpbbncmzhc1a3obcumbe6olnhsii6hhd7mktn24ylnqrmxwaoez8jyk3smyfyvbzoiews7543hd18jhho5y2qb18vbqc8iw5d6xz0a9hd4gg6jb7nyssy6c8bc7vnq7amy4kf8comll',
                retries: 3056049444,
                size: 4303848248,
                timesFailed: 5307492616,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'i47tj3mvhs53klfkkbdgxxho7g7kmigm0to02jnjzsgoo03rmx',
                systemId: null,
                systemName: 'wxftvfiqe7a5z16fzv3n',
                scenario: '72x6re6blu0gr4xeiztmjnpg8xrc0eh3p1rlra2w5zqqsw9wo562w2bl7v6c',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:23:09',
                executionMonitoringStartAt: '2020-08-04 02:32:54',
                executionMonitoringEndAt: '2020-08-03 17:08:49',
                flowHash: 'sbapa230ovbk2ll9wkamb8ie76ahzbhn5w3bkmsq',
                flowParty: 'ng4kde119d3fuab3ov7cskwrmzmefd7t4nn72h0et3cmds05uyje70rgccu38co25m1c1iihax2n1ptfjw3lmpf7bhpf828fsmw3b8i0nmyesy32mjnjyu5ab0g5ryhg6hgz9cb0uv7ufmktghmy0okl1mf5o757',
                flowComponent: '9uu7pcwc62pyn2kcwzy1us0kkp2qf4bz84pl916t5vr363ekm7uxc1sklny4o4bwk2smtym2mrlvv0rpu4wfafkqgi46r6bnsq725eb14bla3q260t73k31eu3ieowzbnp6d3601slx0o2b8d3i612ts5a9auzbc',
                flowInterfaceName: 'gce08kw10kzo31p4gxsdksr90bitirwqs2xhz0o6k73rre4t5gkp5fmc6zglqo9vfl09dabqf3720u8216shu7ifm4ngh1ns5bi1cbmyjgah5nfk2kweaih2z9oc4a32z4tukx0bpg3netppkm1mz7vpat3h0jbt',
                flowInterfaceNamespace: 'zdyym6mxc6n9ab8j01wazg4dc4snhqc8qhwdwemwcmz8rxs4x0arxw8i8gvmoslgcctgvzg8wo8uzfd9xjoq7bgwq21op4tdhpwnq3o4bfxcaa5gfy8h8qrbzulipz7g7tmptic2zy9nbkuds4mrgg9xkvipvwv2',
                status: 'CANCELLED',
                detail: 'Earum consequatur voluptas vel iusto. Sunt qui necessitatibus sit officiis rerum. Aut vitae dolor unde accusantium est voluptate perspiciatis perspiciatis non. Ipsam totam nostrum exercitationem. Repellendus consequatur aut magnam omnis sit atque. Qui dicta ut.',
                example: 'vvmuj3n9i1hodskvfloz6w11u74ocllrhdnruslsgnsfr32xyygle20imehhraq0fo3xswfdzgcfgjicrevqq24ml1pstgqwvj2s38vak52hkiuxuxfkqsezgv4flp8gw9ljta3fvgwp9mm62tzpz2c1fmjyng3r',
                startTimeAt: '2020-08-04 06:55:58',
                direction: 'OUTBOUND',
                errorCategory: 'ojtx5jyux0p3frlowk1qem5ojc77y19s03satsuwpw3vcegds2crs097pv9ffsrn20llypaghtistktma8px3bp0c9w4p3zbmunv6otl1nsyylrij5j2gxyydvqe2p1loc3j3otkklcajf9t8jzx2nw6xr54omgs',
                errorCode: 'cjbiwqh3d3p22p4hmcwxi9qblswgv4zyny9qd1ncbpd3gk60xu',
                errorLabel: 791964,
                node: 2013709708,
                protocol: 'ir5xgtxsrl45w39ivqmq',
                qualityOfService: 'uentr0wde46xw0jlytxo',
                receiverParty: '67ntdutbhbrbyzqssao1d219m0cs6i99sg1oxja709asvad4gsmf1ocat0rocyebl4pgp2io9mx9g3dpflizu9rfa3gcur3ahyjnxevwsta7k3t5xe4va80ty7d9pftjsax5h9gjcs9g2s9afnrmzqbe4h8ext95',
                receiverComponent: 'vh352r4z6zarr7hth0325wah49znipx36jmb6bsracdyoyigm3dm5rqq6lmz3i4wpviurg8txlwl3g6m6hwgsk3dv3ctlpysgegf5t6h4naloky1cy0zrwaj96ko14fcoja1h3f1308sr9s2oha8bor2hp96wz6p',
                receiverInterface: '6zkkm5flxb825higlewc6dajt5cok0vgiqejrk7a65q8qn5iwz0gfwhmlkkwf6kzad2rg2unwrf9qbpgs810kuggp712hs26ne7fuiu19pcdsg4ggft8thrkb2v8osefyluhgtk9gqljhyw27qzndmhns3ygwekp',
                receiverInterfaceNamespace: 'tjndynqngp6cbn1e9zalu76ocf2w4nwd21b28he14i3qva2hm6lonh70qncuex9m3idwytdi9olmmm31yr1dk3klzh2w0cgdstf6kkosbrl744d23q11tweeipjwa0kam3qf2sm4vc1z9es7n3fgnbkmc28sn38s',
                retries: 4314593997,
                size: 6178933426,
                timesFailed: 6961761419,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'jzv83kkh9n98umftvcfwh0enmpr5fdtjowabyppybgfzpbk9vy',
                
                systemName: 'diw8yx2a04jwfqpuqfb2',
                scenario: 'tayltbwo5hdqbzc4h55fzisqqp5qkt2izqvam5opp56vxmu4kmvohkeoavk9',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:50:26',
                executionMonitoringStartAt: '2020-08-04 01:49:59',
                executionMonitoringEndAt: '2020-08-03 21:03:21',
                flowHash: 'qgu67e0z2xrrabv42y6sx82wgaow4nxdqcm69cq0',
                flowParty: 'rq04ffkbw0clap1cb75930kae0slew2kl7m68437cz2xkwcwm9a0wq6nnm4w0und4m3aulumlokspo8xgrbv94634ddw9l0f4rrypcm1vry9ga4fnzgk49yi9e0x6bfhdvhat272lr43e32l4npiq5gya597v3ba',
                flowComponent: 'kvey30erfnriugu44p7lzjvk9zkwjg26x6bulegujiijdjjwsq3i5z4d9j5k0v9c66hnih6hfy4lhzt8a8ixfe5yddq6rov7v2cv7ut6vr3r1f263h48yxednclr29e35z3y8nxqso5tpdln8nlvyxpa7fgx0y3e',
                flowInterfaceName: 'clj2cgdlyk354zvbtep6eqph4em84mo8xtq4yuyoekq2apmgcsrlmmyxqbsewqr7ycpwk13c113l5dj67i5j6a6rb825o4habgfklh5kepascftcx6cj5trlpopx0prs0twzcjg2a3bca984i96276f4fjzw316v',
                flowInterfaceNamespace: 'bm4bomu0et66k4k9kpneu0yi2nauahxw9wiwsr9sp5j10tcznyoeghqtdhfuuhzi8kes4tag7au68zyhz3kzhm6w4j0hc2w024ryatshp3hn75sbi2rbo37f7zgljam66tv9qsit8x662mgfhc4elat8y7tid5j6',
                status: 'TO_BE_DELIVERED',
                detail: 'Ipsam sit at et totam iste vitae assumenda numquam magni. Et ipsam similique natus eligendi consequatur modi. Aut omnis omnis inventore illo corrupti optio et et.',
                example: 'p108923rltii4qwe8sg5209njo81inu5vm88grn2q0ib7tffw6eyk4966fhx9n8u9mm9cyh14trqv5k2kv6b9y25d07tjea9zdsc41jrdgc99e57wx519837zcuowa7gr4l0ikttca26v260osbwwccs3ln18vda',
                startTimeAt: '2020-08-04 02:13:21',
                direction: 'OUTBOUND',
                errorCategory: 'olfjj0ayd5ng8ly8spiy4q32eqxq0os9604qd7uu90p91pr96td3kjkr5wfvbm106vl21mlsr4hpe7hg30zapuqfks0l58bzelfrigrc0p1ije5m796ksz6ohbbjpu31cndhgf6p687qmeihn4h6ckwh9iz8taof',
                errorCode: '3hx9nr6szodo3pz83wihewbf8gvr3ww1eint2g4low2tjic1tw',
                errorLabel: 580854,
                node: 4888073584,
                protocol: '4xqp0k8fzch5eiuowxxa',
                qualityOfService: 'x189lhh2yvv2s9grw4f9',
                receiverParty: '756isprghs0vi1b5g6h1153dkvxkoct68ko85zmgylrvwln4ejnd1la7vr7117f5wtkqcgyqm11p0z4okm5onk8dqbp56aqy4i9q2gi9nczgmrjg10i5ibltcj0y6s95yk9qxxvidvkgfnojvfvoff3l0ls5xxvy',
                receiverComponent: '34690xo1447bmo5ujutxtc4nheoebl5q5akqj8goxi5wxv83nu7h87weyfh50es32exe70yasq1toxjhn37v9tvqh22gjzr0rkhiov2ovcahg69a8og3nizd0a23u2h9cenpiaxemmw5z58t2wfovdvo9a8anka1',
                receiverInterface: 'bferij9efn2pjxgi529rbuafwhavx988pu4po0ed8v4ucegua5ndei8ddapuobkxbvgoc5uxapvm65c78rd5cm08f1l1rdmigm1u9o6qefutqi6ex6140j1agugig5apcf3xl7d9ughvawxjxn8al0vexbewdo11',
                receiverInterfaceNamespace: 'ihdjegy9ujslmb6zwk532rpqvk0l4dxfmba1mhkwm03kkk6f9oxkepy9246jcu1v0zsko4ytwe6zd4rgdp1trz6hmq3wt90p4dhi108dqnue71mtn93nfvsux6fm7157c9k2yorgomh3xxwxbj3igwb1w8zuqlmh',
                retries: 2598215477,
                size: 3198104072,
                timesFailed: 1897561593,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'smwfaftmk9hmlw6brauoxxwje9gq0zlcc49kv3zqwcz9afj97e',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: null,
                scenario: 'yhfojzzfx5ukwlh2bx5vna6h623e40m6ubk1re9hr9nh7y3ddq60zmr84hu5',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:54:10',
                executionMonitoringStartAt: '2020-08-04 11:47:59',
                executionMonitoringEndAt: '2020-08-04 12:55:32',
                flowHash: 'zjq4ir63h1h1xbibhph49uhku7v3qivs9v82ztjg',
                flowParty: '81yg2de8vg2cawoblsv9kwmracokuiktw9l588krqiot8tlupmpyf07hzqq3p8xm1h77f0lple6ei1x12qk8avoyssa1t4zp4pbilol5z1g6dh2bbxx5spavhv724bx9g0415m4hm8v81anr8kvan9yiue57gjvz',
                flowComponent: 'qglhqxi2eyafw907ff95i83ooj5dov5krdnb8nv4ohnbadgodhuy79utlgxwqbmo4y2cagdmhywlmyhpz35gqjtowrhuhw0thn0s0dgjsrikueh7c5e601c3r1br36w5uneu7l26iu9z1v5g9ahj0ksemoo586vv',
                flowInterfaceName: '9dmzt98phcy1747p7vbc13vd7bnuenfx4dx0lb84j7xwcbb09sslg92v4sbupuj9hiwol2kwr6h2h7lf7xequmehayj80itsols5butk2jv3gleqwj4z6si5us1ag2n2oyv4ri77sii3t5qfog04y0cc3g6qfd5x',
                flowInterfaceNamespace: 'ev47o32vzx4x2lvuqbjrk6qbkau9lmekcz4j8bi8btgdw7pty6hwo2r12f32ciqz51rlzodss4812jjjbk911vxp0whndz54hrly2b2yermu3wvkqpig0ps3jvusom0qxv5jsb9agifr3gedpcsq1eohtax96952',
                status: 'CANCELLED',
                detail: 'Est et reprehenderit. At voluptates laudantium optio libero a. Cumque repellendus aut laudantium. Voluptas quis in. Alias tempora eius adipisci molestiae.',
                example: 'z9ff6s2rxu0mh9e1j132o6oijnrr5lp04udufxauzv8uf2vnli1oyzk1bbveaf5u4mvitbcr5s23h58qxy95ujkg739tcr0mokqxusmtn5iy7463pxh29n5efn0lm71d9fb8utjjl3yjrz0syhv4pe48yuha1049',
                startTimeAt: '2020-08-04 08:24:48',
                direction: 'OUTBOUND',
                errorCategory: 'bi4fzjnzx2swse1x1uuuiwiss5hc806qjvo1ufp2lamsoshez0i3068kzv087cqlhft6e3lx1gqqj85d11frgniecw8u8wxsvi364cdjgnfoa9py0i4febd1frtewtodopfklcwcbossnsi9fgk7pyimgii7ypxj',
                errorCode: 'ekxdop3g3hkb3tiky33og4yzi9gdf5rz3c9s5jlipvg06hxktw',
                errorLabel: 263675,
                node: 6679107312,
                protocol: '8e7dhtgo53efeo7dy7tf',
                qualityOfService: 'd0einahycsk3zue8s45o',
                receiverParty: 'mb2qgy5zm24tnwjgjig1c4x7jpvwbnn4cj5qmsczk9vn233xk06ygqrkulg2fdinn5qskb97gugm5siozncnthlonf28sp353xxzfhk914m9bygsy074yxsxcyrgb6rm27upkw8ilizylacbew2ip97yx0ae08kb',
                receiverComponent: 'fmebvkejgteyljvyerasceux6jp6kihqhr2kg6g5gio4xigywm401robinyws1ycx1t8irty3dfac3xb87fo5nd72tdxlm51h5y0z74xk8xu5cx29mi3sf73byf6fkxu2gmm5atjm3gjnf8eefsemk0cshblv2a2',
                receiverInterface: 'dg42haore32h0p9xauvm1izqjasyhoeqdkidu84u5qm0wy63h386mddkwv9dz2327z7767bdscrhmysiq6jtzygc7f9y75vfvmxc82y2zv7glr5uyq2q9edu1f70q1dbz2wjhiml5lcvb3mg58eu6p6fcz1c21hb',
                receiverInterfaceNamespace: '1ios3t3qyp2ov1vz6wfln83jqcjq72gnmdu84in9e84aj13vhday509uorleiueas9p9ses5a1v9pwbbfuetodepqh4tuy29zz8eg48i1mt4xlbf3hhfd9eizbuqp68hs00skw23swe0vs3vrftc1ckyel3h1w4e',
                retries: 9069606512,
                size: 5120346394,
                timesFailed: 1354252867,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'ddx674dcw2kzest5aq22izfrz54k4b8w12ie06zwgldobqspu9',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                
                scenario: '4c5f5n18qsv667gupprwpx5ml9kvpx6y9j2t9a7vg3ruq80mi91ksxw93lvl',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 06:11:00',
                executionMonitoringStartAt: '2020-08-03 16:06:50',
                executionMonitoringEndAt: '2020-08-04 08:15:27',
                flowHash: 'a9kxwlm3vtlfa738bud5th8kuz1al1vspncjywxr',
                flowParty: 'z80kcackwrljf5rs3c0qbinggcyg2miqs5co66sxevqdpp9ab6hej9sgi94038arlpiuzxheqeusrboc0xp9y2xv3v6c88gqs8nmozjliwdkfebisdbu19eebb1wyl8unkohgx6wrcr5tn0db9luz3uny6vyrhlu',
                flowComponent: 'fr0xwqa5y75yw4t76t15ijmdlnssehc9qdm1wulwogmaceiiamqj24fs2t2g5v8372leqqqm7glr3cvy6p6o418lr8rhefo9nx65ufk9gm9oy6ku9wq4jz75zacxxicq8rl8ebea8u3fqxud63iv7up6rcj83318',
                flowInterfaceName: '7wkw9lntcmo97nz14o01jg079mrbcv16gxxttn8j1lso8btgdxbntubxj84qghvqehr5t1un0mi4bxfguoh313p58y0rimttjka4aghfoyp2ua0w66esfw18nwsutm8wxwxw1smth3enowcigehc8863pwcb6z2w',
                flowInterfaceNamespace: 'yii0nc6prqolxynancbos6otw7efej3i8x1kpio58rlw5i9luz605bu1tf8639u1ox6eupcy496s74r62fxm4pq3frkbs18833ldqw7wotnh070l9qt5v6uwqwuath1rgaaerhnbc14n7kno6qxn07zvkvktqw7s',
                status: 'WAITING',
                detail: 'Quia culpa totam. Eius atque odit dolore. Mollitia eum est eos quo omnis. Vitae ab omnis deleniti.',
                example: 'a1hj84ttydcgjq4fls65ts7r27vxjj2plguxpttvsp4jlnjr19dnmhfe9u4y7t8l3cc0bus2cs5py186qcn5pzwjiwos7zdwjpkm6vn1pmv2a36w1zwprx38h46tdwiy2hlr9w92yi2o7hp9b5fa2hu4ri8cp867',
                startTimeAt: '2020-08-03 15:08:34',
                direction: 'OUTBOUND',
                errorCategory: 'zrwvjwfyj9ifu48kfsa68s6rtfkznuq08i1p4nrzm0tgfyow02nmg3ud57cxu6xsjlbyayvgdgw8ykteqtj80s44jkjju5aysfwilzdng8n9dc1xo1fgz7ts5q02600menoyt7u3wdyy96tyk1jc1wor06ebdxkf',
                errorCode: '054vdllxjtumn249no5dj1yb1huanx9uecxl6hqeppfct417i1',
                errorLabel: 126238,
                node: 1091954168,
                protocol: '80qguqj2exmm81bcf8rb',
                qualityOfService: '8imbol17hjlpc0t0yr83',
                receiverParty: 'sk9py68bequpvxjt9s51mipap2tqnel8yqplgtdfpuazrx8z5sfufawomowp1x3cf1axnubvpq9olof4w2cnuut2rpfjdhwifqoami00ole35g1ssfjnw3134zue8ooifuwnb3fok0reylo0it3i4e87a1zl2hbt',
                receiverComponent: 'g89vlz20k7882ffrfhod840iflowl257rfab2iy1j1xtk8ae7biet6cdfqb5rnrnt6nszrmibpygk3hwpstpixqzfwpbzxfk00lmzahvovpyqem9bbh6pgzasqkkrdmumkjbbmtazhxsrmcmap335spzr9x3x5id',
                receiverInterface: 'g5d6bwz493h2v1661c23fwlvezlb6h4hlq3o9yonupq2gwzcjiu1gykbvakpdc351txuax92nl5yrntf5u2m6s22xny6bmvku5ecunjdqsbwwygq7c8zfphmpzee8o9nb8kwttypnboaog7kkzsjjju4lp2dqxq2',
                receiverInterfaceNamespace: '0bgbt6sfit35pcgi0oh3badlo7dyjxjxdxoeh8ehce1fr7ro1heo3an0kh0kwx69u2c035l1k3hp3b28831tzlh4wt56kr92cfa2y7tvs2fp46q1bbfbpn27axfyohnsn0pmevtgjyuzjsc499t703rdntxo33d4',
                retries: 1311894829,
                size: 1129140895,
                timesFailed: 7542925624,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'p9nw8lvp8obbtd9h5r1inrczf8vnl2oa0lfr585fdot4dftktx',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '6bqyn0buax7ru0q69vla',
                scenario: 'w4z3sngvmq9at0b4ogom72ygys7sixyuj0ery67u7vglu0ogu7xi4oj3jeni',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:20:18',
                executionMonitoringStartAt: '2020-08-03 23:20:39',
                executionMonitoringEndAt: '2020-08-04 10:32:37',
                flowHash: 'r58dcoh5dww03b0gxirirkj9pmckergmislmx5fu',
                flowParty: '51n01g7xw5ljvxxixxfcnhw7usdkf8zygdhw3tinrf091d15gczmbb8kzabn0r7h34ka9al58lgt4pbiktoepoyi26alhmjzz6046dus2cs1kqljnf4x74ln95m5ylp304f9kjhyyjo0wskaiqssufdyog3vdfvb',
                flowComponent: 'jl9n0rpiykvxrbqchbzaptc2cf7qe9rd3jx2dtmamabz8d5x8rb8dl3fdkfxmnaah831wmifsd72gp3gijlaxclxg43ml3jw7h5ayfzuz40j89s8beuhjufa1iymmpovaeem1ec0otpfnr066kdnqjusolc7tv4u',
                flowInterfaceName: 'be5mf1qq8psoctni0jy6ebgjew1g8sj5slglf1vh88nnd3jzmzxpltt40er83e8d689j5umolkmxda0nf2k335k1a3tg782lnjp285v5l4ov98afilxbvihlsdsbdghnsnpty9yuov3clbshzdeexfbzcoxozupt',
                flowInterfaceNamespace: 'gtpkwv1hfco6yo14ktfmhtgz8jtwnp895c0ays7ntmblkvshmbqa56yph2pvton54smd8c4s9p6fbsie43imfl474vgx8rjxqcfg28lbd9wjp4ea7p1iijxsi6oyk68itun1g9qalcxwwsc1rh4ymajkz590dpvk',
                status: 'CANCELLED',
                detail: 'Velit ea non omnis nihil nesciunt itaque velit. Et sed et nam. Ut et reiciendis. Id vel ut quae est quos sit reiciendis autem nihil.',
                example: '1volnal1m8wbb67a9qchqez1t4mmnha9figjyuqinb7lvd5qzodf2jt34ltvzgwsnjpwt963kbd1h9hxt4l5011j0ac33rcx8uxpokhi7gadbwxeed6osdol2tedszpwnpr1l581hc6hq7g1nuz4k0v9fr90i34z',
                startTimeAt: '2020-08-04 02:35:22',
                direction: 'INBOUND',
                errorCategory: 'hxaf7jhl26e0tkxzrjp30x66bqzvgw3j0c9zlog525ytupcvy2ytk5i6i77lj0rnowkxicoyrbmm4qtz7lqfcczwuvss45htr9jmh2p65wzv40ob018njwcpijqxz50nr1nzq7crzqr8mnnlfoy273ojdhx5swad',
                errorCode: 'q0uxxayifjl3lqaru3599vbwaol6ck0nr2ytpi285pth98krpy',
                errorLabel: 563394,
                node: 8517098566,
                protocol: '9yoi0wi37m5tdadr5551',
                qualityOfService: 'we7ntzfi8orjkezvdwku',
                receiverParty: 'dm01m3tav4do7w4up3yer8eyedvfpm7fx7gfa6mqcsfy83g8qrf6pq4rtosr9vpueaoez4omioku0lhzf023dbsopams7m4hhslea4yv7fpulstbknfq7vdxz7i107qjlohcitx8o91utbg9n06lxidfi8o68dgg',
                receiverComponent: '5xtxnd3gqwcurf6qmnmef74lpn937d4va8t0zgznigwb12wfu8k57atb3cnw2e3ioe8f14rumfcmnv6iz1sxjuvb0hgrhsvoaqarnayk930661tic9j04a6esl3eyeccv271qa6rg1bdw737eibvp6d6igk06099',
                receiverInterface: 'lvk9snk1hjhjlr106k1i07q1vf1ie8ahgqom3lkuxt6xwd0ad3qemnsg2la5hqynxkmh0mwqzloa1xn2walu31f1l88e221cyqx3ume1ibcak5imr2xm377x3nuq4v1r7rgnach2bh42y2rqrnjtnzls51ubwdke',
                receiverInterfaceNamespace: '6h0n6yl7ggi9gg4qu5km2tl1y1t6lhk38xoy7s78pjgavxmxhifnrf2px5jzlvk0obulvwyiu7fdsgwusk4vjzlfsbdewc9im2cjtyu8ofmt2wjdho7uxca8a9nxk2rgbwtay5mgtt9pi8kmcvtjmzzt4yi4p4q3',
                retries: 6762035089,
                size: 6587178610,
                timesFailed: 8468712831,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'xvpmpifm93cyo58vnufqcyjd9e65fk8xlomck0l33qs6vkmhd5',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'i6yak9g5mz9agw720j5l',
                scenario: 'w1rpx374asdlrr50jtklqq19xix1nkjgnszspzwlq3yxyt8br7utfucedfft',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:03:33',
                executionMonitoringStartAt: '2020-08-03 22:36:41',
                executionMonitoringEndAt: '2020-08-03 19:47:47',
                flowHash: 'nqqj0n06uamibftqm6fuzkqkan5crd4afog9kqdp',
                flowParty: 'a86dd95gputwfz65eaiz88vn048oek10fcn42pcu2be0pw7go2wvqvshc6jdzp8wecmw9pzeseae435hp3hmzyfitf1j7cid5igi43u0jwjzqm1lx4rkswp7x4chv6b89buauegsfdsoxdpse2acd3as4z0ta4nq',
                flowComponent: 'wwgpiwsa4faq18h2ew7y0d5q0kw4144yytu48t9slr7nhurz3jyudkpd6dnqjbz5d869kfdymqrjlh9hs31y2fbn0wap3uilmy08z3jvb6obnmk3hyppp2v8ol97q15muzxkzes9bi5tkwx0xwrha6brvvyk9mhc',
                flowInterfaceName: 'edpnae83jldlpvonbasma4m370fhzhe5jhdatqfxa3cf99e2cra7vmhur3b1mjlzkdzuc4m7qubcmwlmhfdhrqnuycwnvio9xn70a7wqbbse0ahmj4kk753nomqtoczkw59uu1r7u6fic9ubxwuao28kgbdydmvp',
                flowInterfaceNamespace: '4ans0fsiw8j6ekottdkxxaxdhyyb0qd10oz4z4qoo4orf0gnhute9572ythdbzl0e2drpbjnq7g56iqpy1jvmzrd35y31j7nu7cypkoln35m4l23y5s93buxq3588156xi20n177luz4lusizs0ddelsj241axnk',
                status: 'DELIVERING',
                detail: 'Beatae id velit aliquam tempore magni vel. Nisi maiores omnis voluptatem optio debitis quaerat tenetur veniam. Repellat quod iure. Magni est eum eos aut nihil veritatis corporis quod. Numquam quam rerum et et laboriosam sed consequatur aut. Aperiam et enim.',
                example: 's9v408zn6410gxupsr1ocge0ac3leifexyfz2jq2u5q5u7stx0taqjbrdioerkht54tqn0iv3o77hmm4nisxy9a12d7xbsvc5dc6uj6gk1yq9ndu06fku6ah6u0z4isaspwc0fb8fy4cckiaz7agipw5vovrtxat',
                startTimeAt: '2020-08-04 12:49:48',
                direction: 'INBOUND',
                errorCategory: 'cmc91r36xd7ngbcq87a5nme7kh9o2wu1d5pj6ng3c4c7boz0mayw1z98pk05pvzcjy28t91b49or0r234y8pygw83imnydfqi4r7xyek4bwpz4x3ergr613qta8bmscof3q24ofjpw1w7ax2tftm1j0f6hq3i8tf',
                errorCode: '0uxycqlmvt8ycdotc2azw3w7q335lcypbs24su1lyo6jigiibe',
                errorLabel: 924325,
                node: 6100842228,
                protocol: 'tczxv80d52wpcmriio2u',
                qualityOfService: '3kpgbpxqbsyo7ts7jbkq',
                receiverParty: '8u3i7ycdx2uc5o5zntfkjm6fvxldw8mfrzz4ueeiqcnmup4flqiixdoge0eu8qecsygtshvchxxpcvac6yb5e1ovl0ct6wdrxndeqbfi32ajiymts7dmpx1ouu0wthwctg3kqtitvx8r04i54fni02hr2fufsduu',
                receiverComponent: 'e4hd5brgenf4cwfek6hn5waavh3h6hvihoqzge9fa757adb1idgad0q3hfawodubtbrk1l9x7gqdub88m1myga7s91ls7j9lvavmrdul8d35iwkcaigf4j6n5an2pallgyrj9l5r2egexhan4j387fcvta0m3ufz',
                receiverInterface: 'adz25r7xfmszwg94wrv6u50cljg273fv7h9exock2q6jtmisccd55xk6f8duek3ujekj9gmvko0irbuu0podtengss6shq7w9fqwb71hp8aje0xk25j1xnz2tynxzyjd65b73o6031qf0pgzw1sm5p4wv4rc65b9',
                receiverInterfaceNamespace: 'q4w2th0ulbzmvxp3v4bul1rlhjyp6bliokyju0ha3l78gu1kteoctwn5xasoxu3yxo86rkubwf75jamt0a0m75kt5h5d193ag1ac9qkbx75hvjfmawfyhnc1o8kge3i1f0j432ii56nf1oj2twe7g1wx5tj7jg1c',
                retries: 1298534637,
                size: 4954542660,
                timesFailed: 1122845690,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '4mposyv8xnbyoccw2cycvhvzpfyavvt3q4vjwktb7jt4j62pde',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '01b5t3uihvweqxnf6jwa',
                scenario: 'zqeernp8z1lg933oaumlhy4r3qwlpvfgxt18mlizf2sem6xy35m70w4mb2vo',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: null,
                executionExecutedAt: '2020-08-03 16:32:31',
                executionMonitoringStartAt: '2020-08-04 11:55:32',
                executionMonitoringEndAt: '2020-08-03 16:25:53',
                flowHash: '7fl3se0qhxil9ntfoh9otln4ndyihts1te3m0wm3',
                flowParty: 'ybj2rlh5ls9scjls205ncawv1gvylmeb337ocxy2lz96wco9tp2v3yvz4cf00v9ql9kq5nzimchlfmzoshovk5q2gsznbqglr1jmc8qw4ma3obf62pmsbtrrwj1vjxe3qpp6hgva7rsm1b82tat8i8shniqmrc83',
                flowComponent: 't7wxe9xsow4rwwlbxyivwfye8nkkhlpgaq19y5e8wf6br7m7xsxtoyxd1lbwhgag9l1q4h5z1mh7mchxjf3ssk7cl9l84269e0zqi4aozkioigvppe9f5dw6k6m28k7skkf301strfrruh9ic485cpwv69h5v38y',
                flowInterfaceName: 'vnuhdt6g16j4p7274eakv9fa3fys1auui9bx3sk6qvpa23vhnt1azo955yldpw6oelrq0xa7s03wfhhhmxas43riqipaikaj16bwwd23bywf13usebr7ubmvtfa2qpar7ivxfs6eou3tgyc5gydhja4lesexlqdd',
                flowInterfaceNamespace: 'wcbp9mvp4r6wlf94l5kctsxpou2of4vei2kihu9f3sdrvhjq45nkn7xnjs8ynga9bv6bbewxbqgh9tyly0k711n7bfy6sczzb2do5a4empprwz4f6arxiyb07bgvq65gijc01mrcukvvzvstgz9o8bkltrc05475',
                status: 'HOLDING',
                detail: 'Nisi similique optio qui mollitia eum et itaque. Ad dolorem omnis voluptatibus deleniti repellat. Dolore dicta omnis recusandae nemo error excepturi ea consequatur aliquam. Iusto qui culpa. Sed dolorum laboriosam eum quo fugiat rerum.',
                example: '6kr54a1hro6uk5ti1z5o47imxghb9cbwwjczpyslot1kx6131c16t5l0sr7lrp986hlfwqf7uiukj2d1utz4oqjks18swk017fvi6ficg320oyud1stqby2xj3qssmb6ttef544klzv2n0scpsx4o5ebkp24qzzc',
                startTimeAt: '2020-08-04 01:39:11',
                direction: 'INBOUND',
                errorCategory: 'j5n315ltu3tbwi9s0mcbadvikvlzw7wcc60svnlflmyljunv4v5vf5a7k3v19jb9ninwuxdyxmczr2s96itgagy4d379s2bx89ykvj7oyh08dabxdziraqt35l5ljnvwggqn04iimkh0jw7mom7pzltu64sw5w6y',
                errorCode: '40ut4x42qpzrcbkmpimb0uensaoqvqz4zzv6quk5pvv2xo45pw',
                errorLabel: 958208,
                node: 9030627686,
                protocol: 'gu9oj4p7fzwd6u0oox9b',
                qualityOfService: 'j97up4mqfnjoqgw5ba7w',
                receiverParty: 'utfqq36jzmgki1joua8k4g44sv1jb0hqnj3tlmh8tjr4rpz7r3lpu2pjx8wuyl95s2fo5r7afpaijwq8liy7koekaaqb86luop08r58dm8fnm16lzjwee5zw5rs3r05q7wrr77xeadkz84obip8cq04z9ywf3tsz',
                receiverComponent: 'jplbmprq8noppsi1k0rro2zxmkgefmgjyjhe1rk090yhy4mdycf6pcbv6e3dfm4vbhp70zluunufctdyo4x3a1qi7l1uciqrdgfa7bsfkwvsxesk5z4e60rm7l3khe2txy2xy1xjobgd6vboh1uf50pwqsz21kp8',
                receiverInterface: 'xgt7y4mpifz3x22hswx6ogi9mvwcqt03y48igv0rmo53ju7c68eww1onvp6kic2udciuxdrofe7nf2ydcsmfqoq9yqdogjfmecyxsuzk23bmsyr0ykmuvyjxksq135ryrtkykdnqm6mvoy7gq3w6qet1nhqxzc7l',
                receiverInterfaceNamespace: 'rnbxryukhe78xbzjyyriqpxnjm5x13asmnslzbcjn5bltgy21r9k7u5tgwn0yawbr64vmu4fv21x8dr1j5xvdn4dehab3aoxad3y1yif9wjguxxx0zrbruft3p45b1jund6n4nqoak7qaxzz9rwn3ej4ixngq6k8',
                retries: 7232560714,
                size: 8711518884,
                timesFailed: 3917099952,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'kgyf16b5643l8vta4c3dmhbyf7y2p81zov4cw21ip9s4iitu9o',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'bev9pwbfxfswv4ptz9tr',
                scenario: 'wze6gmbre0ewpf263hmdtbjf4xkhq3dpwp6vizmopsj7p9tba6uvnzjb20ps',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                
                executionExecutedAt: '2020-08-04 09:15:43',
                executionMonitoringStartAt: '2020-08-03 14:56:32',
                executionMonitoringEndAt: '2020-08-03 22:28:54',
                flowHash: 'vmv8ljssshm06p4vk7o692oz6enirge9xftson7m',
                flowParty: 'dk3gdg434k4bnntwevv8sq8rexz35c2s5tjnlwldu4j6eojgd3sjb0naqjr7f38bdyfaqy18ff9xw3dn0ax00qy3arl4ct3j4gmeufch48l5jjkg1zf0nl8b4mszqhegg0b82sp9chb5rq22dxdtqbjmkg17tpgw',
                flowComponent: 'v9635r4rb10beu0175y0psvgdyrjs9v4os8pz4lddvfuleirun0waj8sf60fmmykn29fj6p3lk86o950z6e7ltk8dru3d1vrec8wwrez1bkq12c8asne2l7tpvq9825pvai6qzpdz74c9lhn86lwolpg5m8zluez',
                flowInterfaceName: 'ribgbt0wpafio3yj02qfx89smu2c0uvbku1vokqv4mwzh3w6qijq14f3djtidop0vbp5zdtlke1u0e2w33risrpyk97mydr6lj36v1xf0iqni5sslob7s82om7rm2930q45jj3dwkrndcokzk7u839jgth1dybnl',
                flowInterfaceNamespace: 'jp7bo7w6uh0ch93x0l5u67p6zdq5sp4zhh7hrqizp3r8nzwvx6hjr1rx2d99tyndrr2guianobwg12xx8mvs0oyes432ru9aozzuj9k5towagzs9xm1vjsmmkki4sjuc5ok9i6sqt88qxse3oidvayj1lh67r611',
                status: 'TO_BE_DELIVERED',
                detail: 'Eos atque totam. Nisi ullam itaque ut sed a dolorem in quas ipsam. Atque voluptatem illo dignissimos quas dolor et amet eius eos. Laboriosam ad iure. Sit eveniet aperiam. Natus quo a qui architecto et autem est voluptatibus est.',
                example: '8hop3k6wkwain7o2euq8br8uiesxncaot18q6d86sqtvxcjklmllmzoqelojavtk8xvqcoi9iwey0ojt3gdkz733vmybekcve7fi9fssff7ryd659n974k1lxt0hdamrwzlwgahar5ug6er46i7swm5potjot5u7',
                startTimeAt: '2020-08-03 20:43:18',
                direction: 'OUTBOUND',
                errorCategory: 'eypwkj6dmot7q1q5mos995io8kxl7qlapxli1rcnddq0ais3g06svxz1ydwhm3k4qngljy41q4kzrfj02n9gftg1fimgc4nztvkz5vri2v8q4hpbwr5t0an3r2545kpdf93ysbqbtj5oq1f4wbi47v7sec1oqpr6',
                errorCode: 'v806jq467zb0msd46osyz3gctdsst3hiv8fq4jr0r01tjy84c1',
                errorLabel: 147665,
                node: 3638290683,
                protocol: 'h97j1m6uz18u35kwtizu',
                qualityOfService: 'dhq5hh47l7txyq703wgo',
                receiverParty: 'kw6pha99wn1vsbc4sn2vk7e3jy9n2z981n46pxyo4yagnnd182zymnzm9mhk22f0z4w53nswr8kds9x3h1eqkitfr9676h2075cxd672eeievs78xubwaf5m3qj9pnn6f260jut0dpfeft4o8la3ktdqr8jd5iqd',
                receiverComponent: 'p7jse56x30bthyb98x38nk5mys2awl4r0pj7tnv1xjdnlk8asfu682c6gion5dzekn1criizbtpih8j3y13e5jxwwonr7hy9oa8k4bq5k21nciqewojue847ummzoih5p3ry60wzgcyovco0yno631jc4uig0398',
                receiverInterface: '8oi8yaa4i7v3lbt7biaczy0u54cooy138h8g745q73um8acmda7bc1tfr01wphdr2mpfzutss9t7p92sh5kw7wf9y1a06lngst2k1k4vtikbaig2yk2ewvgrpjloma2mw83zbvd7n8818yi9ywyxruwu6qiyb0hr',
                receiverInterfaceNamespace: 'bqhbf5g7oxm31o5q95b8f7auugi55jpag2df95ihcdns39pq640ltwbg6irclpbx3cs9flzcoba83mrf65fvyjkktivnaq8up97jqtjl05g6n033upp54z5g4yuhh2z76qnh5z5sv28usorz16yl71g1wi4e1fbx',
                retries: 1337238762,
                size: 6223783197,
                timesFailed: 3343492014,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mt9fen1ccawn3rgk438na2l7dwx0fiouvlqz6mtt10jnimnokf',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'byho454c9mvq7d2xx0i7',
                scenario: 'fl6uzgzkkrdwxo43ckyirhg9l0f1aco0qzpdiv383qriq931d98xba0vy9f3',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 04:19:10',
                executionMonitoringEndAt: '2020-08-04 12:02:32',
                flowHash: 'w651so24balpf8nkcib3kemkxo09uhqg6j9tbffz',
                flowParty: 'ivffmkeq2xtoxfx2p9qhydz6qkxyzws62mezn5fw6fn5tzyepgii0u51soczf3aznn5kcm7uu8z7u1e0v724xy3hyevv10x8mzbooswubfxkrl8i5fslhhgzu5h9yfw8iv4kors9hq9zpwxy0n3mm05wxir1g89i',
                flowComponent: '7r2v3mhdghkmafs3x5qmubfhsucdfzt4g8l9hiotp0inj3r4ph0nv0dh29rmsu2e4r3pd1uxcnniuoqijyrby6993ul0vjxiy5znanbtw9ijil70qjsqesuyuquce05fh8iicam8929bc2du4u2i7v7es5k80wr8',
                flowInterfaceName: '4eufknk3k6uwu7uu8mvdpk1sfffip9mkobjz0ez9wu0ekr6e7sy7mrkh8cgc50ja7qaft2kk6wvk4zrvgba55axt73jjk69mh1mmzh1bgqupntfl8zry2lomn95n61osryw0zpkl6qmoyweum5lqlf1m6c0wlz0z',
                flowInterfaceNamespace: '04dd7ajky0l7v10lfpe92f3y6k8g7ircere0fvrcgj6vk9yvz9eustokrbzjw2d1t1s5vexswvdnlpqm2c4sfqkc2zs09k17gevkqy69jg01tpjsm9m523tba2vyc05k0ogxnhcmavq0hc8feaxh8az6qjh8va4h',
                status: 'CANCELLED',
                detail: 'Magni sint id sunt impedit itaque tenetur. Eius possimus esse neque sed minus et aut. Quia et quam deleniti repellat debitis quis eligendi. Dicta adipisci voluptatibus voluptas eum commodi. Pariatur eveniet odit expedita soluta sequi et dolores.',
                example: 'ee08puy1vpinvxqupu26zhfandbhebs4mly2eu4q1ndcrtdnz4pqcuzgeyfnyntyqed4n1tm248wsz4govc95qzxrhq7scewvlxn7x0dm35cp9a1zofyvefwpa3smgfal93srz3lz2yw20p64y5ecwrm0lozh5yc',
                startTimeAt: '2020-08-04 01:55:21',
                direction: 'INBOUND',
                errorCategory: 'wzwdyeoek42wz8ojzdbhczytsqtny09zbi0gcr0prrwi6hnz7lwvg19k6i0fid4g8od8ube1rbh3zc1polobiaecjtjz9xntwj4vs7o389s18ro3dvpyoii3uut30ilwt5hreyk0xsctckws3l3xw15miufv714b',
                errorCode: 'f85mqd6avi0sjeg39umpgn212xo54cdoom7htg51tyym4ljoom',
                errorLabel: 663670,
                node: 1998426703,
                protocol: 'ja01v8drwk0mowx9k7e7',
                qualityOfService: 'm741yft9p7td2rle5kju',
                receiverParty: 'mp31fl9picakr9axlytek31jq0igjyqw4wszr4ikagl9bo0sr4euihhwqirfk3yaykguhz1rzni521ol2esp8o9hesj1wfxt3huezhbopsp33mb0vaj7094fqbx5jyf3zqpreaos4v3hs8xzkv7v5njl5h4yvcuo',
                receiverComponent: 'pkk6zd6x1mx9u52mga0og0spkv48enn9kvzma1hle24yaqucm6lfobj728512dz0psfzjgrb7oxyg5horqxep87bz08qeamr4oev1r6o7d4xxpfwzlsi98s4hydvw6sgtfcxh3v84178vpspaz0fjai0zv6jiexo',
                receiverInterface: 'yuoimw4lc6i3nt39siymmkl5j4k4ke5xzfo451jf1piimxp2acwgntq48s2ue0txhs9kg4amefn2z42is1lx1e8rvimummau8hgpuke8pvs1bh19gu8li888z4j9ok8rv970wt8929rybvel4p6g5u1i8vdjiorv',
                receiverInterfaceNamespace: 'jkc4dj6jvsv1hm68z01ckki9cyuqkmaabrgic2j4gj01y9qmyb5dv75avtgglp8tg0cofi9100xqs40isu1xpy5dng5auxdyi3zhzvsxllgd84uxpmug20wo7s8jtd11cul4xzipj9181tkbec3der05g8alh3wt',
                retries: 7613888621,
                size: 8192863205,
                timesFailed: 8348877869,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'xtapcepe3poonj5gn1po30h7z5tpj9jn1yphfycf54leakd2ri',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'expnhuhdhizq7wzumrwh',
                scenario: '3xl1thhokvwpcvv94elixy5mtpq53989h64g0jrhjm6sj5ayzw7g5ro0f676',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-03 21:27:58',
                executionMonitoringEndAt: '2020-08-04 08:53:23',
                flowHash: 'hmqmaoalsnma3kn6stgg8z9pa2rtnickk4bkx017',
                flowParty: '7xtmjg9yv9z8cm22plobmmrduwjp6id20fogx7t0ocrtmmgzvvez89erktysnkrym39dndpr9fj4ft58164fqulccmee3n7au8qxlnee2a2vlizg5n4u1av3twlass04a3y3anek1ezks4jyx4poq282hratdrsn',
                flowComponent: 'dbcykesmh1lrjmi29zevjhp9634f0s4a6y7zfucy8u2qmk92q826qgxtruh07wy0zg692yago3up0myv23o3m212iwqqr3cjhdb2cqkv287l84xxo6g7la0uibvbr74yyevncm5fwh53i5s98xjp9a190bg2r78f',
                flowInterfaceName: 'nc9fa66i64cz3akjjqc9taii703e5rgc0g0qi5y9hs4ntixflmcteexkpzompfr7i6t5xkewwyo4ybkczwpylo6x7qtnkpz2xdvg4j8q02u76sd5b9jkl1jukuqoeyveezd06ki7kbtcxbno42mvx4g8olvo7rn9',
                flowInterfaceNamespace: '3nvwweej1cl0dym7lmbuqipu8jdwb4n0w18mddd6twzsx7lyg94rvdrcrs0amz5uhpdct45nd7m60c1w0bolkdpgir5nnmmog8w7cv42fnjj4caza9l8m9j7cyt9qvxy863dno44lk7sanzo7871po2s5hdsemgy',
                status: 'TO_BE_DELIVERED',
                detail: 'Pariatur delectus quis voluptate eaque molestiae eligendi nulla aut ut. Beatae officiis incidunt laborum vel repudiandae aliquam rerum totam. Ut dolorem est blanditiis sapiente est itaque. Hic omnis commodi non omnis. Ut ipsa exercitationem dolores facilis saepe.',
                example: '1cvp2z3ctak3opqpcq7sztpm4lzynygte7l4i37bgqpb4bt7irv400n9n15ya1123cfuqqgpif0o1roxujs15os9gyntkje6t9qdb9yr7qhadslnysuomgmydz6jje0a9bt1wgg6muj8a24ei3jmoocstmowcmmd',
                startTimeAt: '2020-08-04 11:50:33',
                direction: 'OUTBOUND',
                errorCategory: 'cv4cnn1krae75walgjza2jp7dscnvp99g3p7k4j79mdkin2v2m11xf5rqbnb8y6gvhvhtkpiiw6aa36vsv6pfeyn803dak03an4f6l1b13eg9q0lhufaz3z37ts7pqzkcls5c3jy0rgdm1t8p30ednngrce07cgs',
                errorCode: 'hgafg741gqbkvbnm4kevdbo7r1wyil75xhhxdjqcghoaucco4o',
                errorLabel: 800478,
                node: 4656842411,
                protocol: 'pyra2ozp93t8zbsf0z2o',
                qualityOfService: '2h24p5ckm5trajr5hmvz',
                receiverParty: 'c8cvokoe2u7q2d83gzxv9ohkf1qiyxpx57kp8wvmwdnmfcqz9bcbabguq02hnv9m166xp108xrvkp5i3655gcsa8gya461u39k60cmzc4ya9v4z9dnq6o82b3cdg99i2659drwtxx8gqgq654w21uk7z4gh877a7',
                receiverComponent: 'kt77ag45ikvqm0dk4vej9a0cle6va05wvx8lcessupq6zwwmtb27836gjse1t0d7iextcz32iyrcdruocd1v29j14qjqxj2ssqk6y4ygmyy19ati55bs35n89xrqe1mx1nbpaclvgdxyz5nizc2vmlhrpudevb2b',
                receiverInterface: 'svh7pwttwesaj00lgg6igog80q4bpnoyxgcciqc5tatqbatcz7956ba2ne51yjd2u7zmfji34ka2xleu6dxwg43enwp3wnduwk6e2vaqlydf6pqvrcba5qbwm80ennbw1rtqtpafghohz74bkqriw1xlbet0gjnc',
                receiverInterfaceNamespace: 'fh3eyhjvp9baa1v3fploulavw6mff00lt968imh8rfrqxcdogha7q1q9jit36kgypf4d4aqd2razltbsto58uyfh7ot1c4d9epzya3nn3sxzxbz4m09ixoso61rctbj0lktqorhbjevx3xk9io8mt0llce4sgwnf',
                retries: 7249766002,
                size: 8664924041,
                timesFailed: 4929512398,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'dndwpnivhru5m8pgfg6nmc9ine8g5gc9q8dpiz20oh0wp2uy9n',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'mazzxeim90i1jxch3bva',
                scenario: 'kg1ja40vr4xo4xl6dbsbmg9nwpci5ot1r5ezygydyi4a6mjbz0nr23cljmz7',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:14:37',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 14:15:06',
                flowHash: 'd3j8dq200os9kobh38s8wvjnlijzmo7o0n68r49s',
                flowParty: '5fxgio5k756bqvapifxwfekmh7wogr00mt9iephrs9cndzo8i4zh9snh1s43ncqiq817ue2iqvw75mf8xjqn7pudh59hdjfptb5c7nkil79pw0m17e4fi8iopekmfm2vlgyljqxwmtx93rmqwxfbkv1wsind7jgi',
                flowComponent: '3efm1l6jafzc3k3adrezk5g82tbl1276vq6wuhouhtnhzq1cs3mpbrn6oq9s1q25dxmy8eyg5id7evylounyseov5suknkbx3ainbr2ipwtq0wtaf2fhv13oy50wevum5s9um3ztjjut6ovuajvjmdpvsezvtw1d',
                flowInterfaceName: 'bebwmpcf0yffcangzfc69zcv04erdn0ljf24w9yknusqhu718tufarqxvcyf5b3ojycve421gzbja92e5yu4a5usovj61w2bt98frlahpms72swy2ipgqwglanrtmlh2ic7zi9fens4zpuqruneis9ealj79dk7r',
                flowInterfaceNamespace: 'kny5qsvqure9obmv18j0v8mzoidmnzdp20tteilmox6iushg88vfl4uwc7v4v5lunficy6rt8i8un430an1fsldllmhsiboid4mxilm15mtepy01758qdo9ihpo5fc22jpbm6v1zbvlg1kba5z5u6j5iy723tvia',
                status: 'DELIVERING',
                detail: 'Quia at laudantium autem ut. Quo tempore nisi est. Veritatis dolores est.',
                example: 't3uh0blhdy9j2dneywyeo9r0yqtp3p7025jguir61pu1895bjcvw8jdiz3untm0wv99gpche7fjz3deg36qe834yjfro46yj3bmsga3xo3gtw10gz9nkapprbpx0cnel9jog4hbg41l2breb0ahp1zktpnozvas1',
                startTimeAt: '2020-08-03 16:22:50',
                direction: 'INBOUND',
                errorCategory: 'fd5mc8m2ahi6mku697fcevubepoubx0qzmi83q3afkoiweyi7fkex3rox3tc6ab5e2sagq893cf8u76mhe8ba4tnfnu82s6cvizs6db84fe2oqcfncau1hqiv22ho6daofem5p0wlzehuyqawkrm6wa6u9jc292x',
                errorCode: '4vbo3zuxpwicfslcazwmh5yr7btk1r9i5msylknglg4fd0gizm',
                errorLabel: 242568,
                node: 2350186861,
                protocol: 'f7gb6s5vcuvyi9he8eew',
                qualityOfService: 'uyrjexcr2xxigpm8ubh2',
                receiverParty: 'tgxhbdwjz7k3hhqktfodkok2ihexi1opcdew3yp6qx8pzpn1xoegtqvh01ync25twyz9y7oxw6xhejjzyvkf3e3gi051qwybt7ktet0uni1i17r6ql1hdu0w2pq77pyv43oorpapkqmymbk80jv33nk1ntmq2phi',
                receiverComponent: 'p3mfq7vnoy7jcsyjx1jj1ojlbvefa3uzj85grg6omdqknoa61zsvkgurqzwvtw3ez2tf969kngwp31zzraenlsnbe8hdfadytczw3zf2qelkuaw06993gj3dbk3nbowg21k7vkzibzno6nv0lyyqvgkduld90626',
                receiverInterface: '6slx2pqxvuqp22m85w6ye5pm92hl6k7a95wl1dgyz1d2oksqou27c5h4ng73x7ubwdgvxexe0ldo4ykcdk1g18twb3we6rl45jbads20h1tfctikgt5np9aaj1wq11ompkzzpa4b91dgzqit9kjmhc0t47diy3a1',
                receiverInterfaceNamespace: 'a3csa7gv6p4d2p52vlugjri0rhs6no671ygl1yeqo7l7m4e9dbn0wpulxxeu2y1r75sijn121kwa9eftimv18yn6g0tanb6yg7ujx33y5kaav0osjo0dm04mitz18hwtiiuvmtv51qv4e1x1zgity3b3qmhqf2gv',
                retries: 5287644647,
                size: 5472266095,
                timesFailed: 3008534937,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'ygncbr5cx17qglz5jrfgnh6h172nvg88lc8dhjhalu5ms9t5zc',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'wvt1ba7u0phulbh7oyna',
                scenario: 'ox72s5nno4h0ok8zprw2gwr65jwfm5rmyl3333os0ky63yimspwhdxrtp1fe',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:08:15',
                
                executionMonitoringEndAt: '2020-08-04 08:28:42',
                flowHash: 't554bxlqls0xfjlovajexeto7vc8bnh9cwjsod3v',
                flowParty: 'yr6fqilb9e94kucl7rxg1l93q8a9l8bfl0s9b8cw8us1xlsms1gq8vt1wrirs9i4izkha5rzaw7ued7bg9kxnlgz63yx0yamwdyy1u7va9kl9odmctcil6fdxh2ad38z5zntoajnyo6xwdlfi2dsszhhq9uwzth7',
                flowComponent: 'mwdfsg90gu93ptt19j60jm9eqyp8zmlfhqzf6pb8yqp88ga8m78dqa876msb3nybe6ptzxbpc95hv5b6xsegdn4kmj50vshwraetchz4eqxfrxg41y2jqo4qsm7wq63bgj0selk0l3kpp12tedigmzjphnki11rn',
                flowInterfaceName: 'tynbbw5nqcdsdccdx7xkbx4gh81nr26i5j7lx262a8n39zttz1x64g7jpmiw9hiambg37yv04tnpc6myllp4bvwwwocdf7gu2saz95x86sf04smthuwzh1etd1s4ch5e7lqhz6gmnncztlh5c027wp2aca9id1dy',
                flowInterfaceNamespace: '5x7y32ij03tvdvjgfkrwv24ar77eidj9im4ub1spxz4zpqy0os2tqnc2a9mk6qruz9tryy27eqw3ieg8i50qhyk68xpcf2gk5l23suvuefpzd8ftk23p80wee2gop4f3lojzpfzf94499lflt09rcys8qndaxuv9',
                status: 'WAITING',
                detail: 'Corporis veritatis ut accusamus qui. Earum ex neque saepe explicabo aut dolores. Omnis dolores consequuntur sed. Amet et vel molestiae optio sint.',
                example: '0q9s9jxy3ex6af9ynb9gjz91q3fnx23e0bu72g6z92zo0une3l6k0jk6ft7dtsyqovdp03mo05pjonxvqv4cbz7tithxu9mw9j0qrqmtx72qa9xbq2k7gp2a6x2qsuw539p9pwx5bfnbkaxuh0z9bm0qjaxtrj0e',
                startTimeAt: '2020-08-03 23:31:57',
                direction: 'INBOUND',
                errorCategory: 'mcsmqa1kddt4excsiy4lklnomnibh2hutzdfbexplqgz1mbr3m43bzmkerboxqckag28qxl3tqj86zidflrjhs2o86iuz00aqd13psed8qn5b58gup53lpqrg4n02uy6mrlw0crt9zzhjqqxdusienobhrg9laek',
                errorCode: 'jlvcstwmq0t7314dppa2f9tewk8jvggaeiicqbdzckpcm1rthk',
                errorLabel: 646065,
                node: 1058566431,
                protocol: 'oj1kactw7klxljglxbgx',
                qualityOfService: 'l0yozpb9mxjwsbjlccxq',
                receiverParty: 'tuw6nxxr35cwauw5mlo6j84zwfq7amdcfvorlpxxnum44btewvi5w8yr9tjbyladigw84ei95vwjrwncuj5h5ip5kyhhhdjv3y8u8w4xfq553k8u2zesm2jps1zvwmbdm44gw4oo274zp9c1t2xxh0s11u6r4tzw',
                receiverComponent: 'kqsnc05rzh9h7rpq8rlgximka0dg923ijjmmmkc6exp6cowt8ibth6tk5cxb0ues1b8xswvumbuoza6t29blg7oxjwgej93ztq7vvrdw9ilhiwwmg7uulifr5t8x4403xjyo6zbt739eczstwowuy1mxuhewwlhu',
                receiverInterface: 'niwsyyjbhg4p3taiv9szss1gnc1xqeqjcicyy92ikcb4klxs00hft7weh0kd1fa47qu1o03uycolam483e1hr0k35l179v33xv5kvolzi1nitkexleap5hkhk2vev4kdad0az1reohlqir7m0nk4ca14dyrphzo9',
                receiverInterfaceNamespace: '163226e58j1xo0lal7xuo4x2qtzs353q9k9sdixl2g4975g4uypvsj4p84omess05zi3tq73urjyyv0wcw0q0qs56knihsn891w9uucr956nqcrvt6gb2heq802vko0jicdbrwhuh1aqw992bz1q9qpfcf9tds30',
                retries: 6604730033,
                size: 6776063329,
                timesFailed: 7305467343,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'vl2zocjwt608v66u6abh9bhouz6hkxdgmbhsdva3pf98ogd6fm',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'kvgfktsliuupv22pwfds',
                scenario: '9et9ayvqcbinpvzk7dyv1jrzy60ad18heb6ehbmhnx9phnngfuf3o6qj7g1w',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:54:07',
                executionMonitoringStartAt: '2020-08-04 12:38:40',
                executionMonitoringEndAt: null,
                flowHash: '7qis83zd4ido65435gfzr829e4qh2agjult74wbu',
                flowParty: 'zrdivnv6rpmagzscju0ly384n4rr4wb7sm8u3i7254hsdgnn3opbwdpiolg8t2kiem42y2m14ritiotsj3t8oslyqp2umt6bdeuja8bj68rzovx3gmnmlg8e9ohf8yvsqj6s7njzxo8ahzk08le1pm6uwufhvegi',
                flowComponent: 'rx5t729nlqbyncwai0ml55dmjnqf1womd9033oas8e6ua5byo0v64mktqk03fxvpulk5usi1dtk28cpqj9cpd7r6ela8ihdztfrqy264yrovcof1nopjtrd70ntlhutg5p842rfby8vkcmy8nbk48y0jwtvbp5ox',
                flowInterfaceName: 'c59bt1itddl2rbxp59076qtjxyj7xxwb4mv0zoig2q192xe909edbmwpuce531cvuvo4a6rsssh8ci2uajy6u0cb3aoh4kfw2v0v0jhcc60k03vag94ss4psd569kvkwek6kqxnreqkrfx71h4gm1f7o5meeegaq',
                flowInterfaceNamespace: 'u3wdl2gaywre9tcmra45vf8jvkoxy4m4kpk62oe6632plkqkblaz6yzyk9p2hhsdw79a5xyws7zhaxrdz11smiv55k8p2edzm2qk3iea9jf0ka2gqzfc960p1clb7xnc2enizead0wdx7phddgedotdccz4z4w7b',
                status: 'CANCELLED',
                detail: 'Ipsum officiis ut qui. Est veniam doloribus consequuntur voluptas. Laboriosam quia nisi minima ea.',
                example: 'csn1s3snzxj6gk00azwpk7vyk7hnmlf8flf9lisu6op69t6fkn80rh8rq77ugfpvzdzjjee4afu5o4nsma12eijiwtvp61jk2d172lthponcy3i1d6v0n74q98erbcn0z63dlpypm8vd2qc1c1hccykncevzbtkr',
                startTimeAt: '2020-08-04 01:39:29',
                direction: 'INBOUND',
                errorCategory: '0dhszku4anjaush4nt79mv5q2plzmf89tbuvyqoryezemonkbkl57vqacioy45w59m3jy5y12dw0jigbyp5zws91umi9u0dm9f3hwihqudkshfe9gjrmv46uztrfkzrdt6eqruw7uoi33gixw3at9twpdc07ewfy',
                errorCode: 'qfj2tz3awxvlqzhozc6g6vhetp08268rcylymuv3q5ahehw2qt',
                errorLabel: 944037,
                node: 1713034793,
                protocol: 'dgzl6f2ll4yp8nzqr49z',
                qualityOfService: 'x0qgi72qzrnfqpelfzqg',
                receiverParty: '3q64f1f9ebtdmjvxsm16qn6fkys319nqtuxewjzmcrce6zdu876svo52qa1c1r6z61lzveomoy0o3905h8kmj1wliw7r5n7vtvqtbsjbeo2o809st75tlgz42jlouz5nyemwg2ymub7kmbuc5970wj6bugrsfg5r',
                receiverComponent: 'gqkfxdm6oefvw9jgpkl7fpttm5drk35un481ahye0xci0yknor0bbl9p9j08c8658dohjun5lx43d4plebdmcdzyfh18bvp4hibawtxca8dowaw2c0m4ie9jasd0z2xezy0yy3k7fz9ldse4dvx7gejwwfq503jf',
                receiverInterface: 'jrkebgdn3xts3t9o7slsp8v8dl4ewin5ee752jm2f239ltufayc093agnt4ty0lt6qt57x4obk2smo67hs6x8w2qu51jadid8chzjsswt2s04ne4pgdt4c4oww176iyxr9bys2gaghu26bwi9dvwfkrrte99u7oa',
                receiverInterfaceNamespace: 'xdsdftkx7vno1rb1dr02pn4y9z4sll3r59ymrrmo4v896nz39pz6kyz79irnb0xhrj9ynaslkj9x30wx596xnwfkbopi7ydl231xwkifrgiae64igvkztxqwmgjqfsfxed6vcpshe095jzda1m12a8ylri6d8wgs',
                retries: 7512645278,
                size: 5931843300,
                timesFailed: 8774255057,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mdfnsvde8ikulwrt92hn3wow8lwjiyhaowt49aw7qbdcwbqcas',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'jrto8oc3cd9yh88ojrc1',
                scenario: 'w91rs5o8r7i1gswpmgpwf6ypd56mz6xeg7jhvqqwp0scy6vhumug76ewhaj9',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:15:25',
                executionMonitoringStartAt: '2020-08-04 03:31:09',
                
                flowHash: 'gb9dl3gla37003d4zcetx2xl02h9ejkxpmk27oqz',
                flowParty: '2viuk8930sxpnntsoyb0c3gl8qxqb6hula3xghhvi6wk83vj57ujznzuw7x8ju2qre3ezdrh3ybf0zj45399kazhl2jx9erii2aw6uhpcrxispxfxconiqr3t4j3gvv3tacpcgh0bkq5yayee7gcy2v3le38oziu',
                flowComponent: '6hwzz0ecu76k7uep6km1wdcjljki5pj8hylczpnooxy48ktthjklcta6elchfe90nuzwvkljuak5pkb92wpt7jjpp4erpwmnpiod5lnpmqemi3m3gflkw6f6c0d6nzruvaczfmyr8nv3097p9w8rjnrh9fqoo3rm',
                flowInterfaceName: '5wo7a81lzu12fxsek4hdo4ng143pdcydee2zjfht7exwm4cy6eowts452o56xtmcfp3wc2kmlqv26ogat8eu0ul5ca1bchwyl3bnxph168fhyogmn5du3wzy5468yhdty6c05rr6sir3szjje8082124h6xalwut',
                flowInterfaceNamespace: '9oeflat2g4yceyxzvlb3gcdy78ob83t0b2znuw0dejx1ynr50wuuq9xtcmy5v87560bwwqo48sk8rdkacla7mw2ngm0ylmnogyji7jp8l87doeuazvcyx3lw0blyq4c87b0pljy9kqannf673bkbbksw1wwdgxek',
                status: 'SUCCESS',
                detail: 'Eaque dolorum consequatur qui et similique nesciunt et eos. Quibusdam quibusdam rerum et. Maiores placeat consequatur eveniet aliquam consequuntur quo iste praesentium. Eum officiis voluptas eligendi. Veritatis est maxime similique aut impedit sit est ullam aperiam.',
                example: 'oh6wsz388wwt2m255ktni6ugoww4ahe3og8zbpkar346w2ix0vetrhp9syi40y9z4ska5s4yaat5w59lk05wjc4vudo8wp0sf26lv6x1uckql8d47c31n0h7uowb2qxskq465858frly7ck9ga4ghd7gtokbr5wn',
                startTimeAt: '2020-08-03 17:34:05',
                direction: 'OUTBOUND',
                errorCategory: 'lnh1y9jcg7t6ky7k0d7t9asrahsqvwq5lqs76xjizbkrs4s08xsih2z3hbl44dgfxsb8fnt9cbicd5x2wq4v23msyg0kngxulur2mpd7bikqygqo23sfggua9gx88p8x4eji6j5e0cee0qcjsg1e1cd70nylr83n',
                errorCode: 'pg6h1yjvyzgj0mesmxze9mqfwg4wovq2oj1v6siinse3p4ctqh',
                errorLabel: 115986,
                node: 2448911134,
                protocol: 'ixc0cw36ouoqssa17s0t',
                qualityOfService: '5v9yygvlpu876vsgi4xu',
                receiverParty: 'ybsy73fnpeb81wsvko3tlzya78gtvzvonw5ezsukbxi5yjmzg7pnfahar6117o0b0typfkzztoim5i8ldjob8j0l9g9zd2399xbqo326cjskw5j9pme64thm4yfeg76nv7r5mf95qfvf4v04zftpmek8wv29fe0i',
                receiverComponent: 'ov19pjppxipqvie9q6bl1pmaq80752ow0vcsawpp0j33h6zuu4h4jzmljbq6144gjj024v7imihtdpsai97wlh5pp259r6580fzimdtw9xe36u2ssaze1kihjbopd351vk026xckirlvoemgl3sgh9p8xtpnp8z5',
                receiverInterface: 'fa3puwuk2rs6fzypn3lcfz69wuuwlhn9ew9qco19i4eqsf0vbcar3krx3ldzxy1tcnj14i5mc4dgd2m5xg2udpio8pat5b887ga89a2qe0z3jqfy9bv5ety1ayr15jek8lwewuv0gll008w3fnutgeeiu3er9r9m',
                receiverInterfaceNamespace: 'ewqteld5kglv4r063ick16xtbvo3egelyowgy6qjc6igmw3cts6sls2yhd21vh5c95si19skt2zzl1r8t4dbh5pgcw78jyw1pr8p5tt5rubr43xwyj6otb5eqsvwve3mw3f5900gp4lc45h6homop4vl29icxpul',
                retries: 6721231821,
                size: 2008923210,
                timesFailed: 8361491551,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'rdela4e0eye1lrv84v705q7u0s12164iuqqskj6uud987od8s2',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'bmjrqejbipuz6azw07pb',
                scenario: 'uyd7tqrs5b1twhewzwhxyfytnxtfrmgivbccd6871tu70ntyl4dxsszf6vva',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 01:58:11',
                executionMonitoringStartAt: '2020-08-04 14:16:54',
                executionMonitoringEndAt: '2020-08-03 22:37:31',
                flowHash: null,
                flowParty: 'uq84nztpxzn8mza57igoslh28ktsx6mrpzhi9hjypn1sglojynijyy4s5jiikjlwe2zq4a97dr4yz6ln36i5fhz5uwq6vss3v6m19nj0qboc4e26aydqq03b1tmx6in2e6qh07z4tx8m3gjoph0ty0zdl3hi0qhv',
                flowComponent: 'b1c9jhjr9n7zkthsx9x9xox749gkk2u9xgmc6n9uyyw06dr5d4fc9t1nppvasiub139ph2uakaw6l2uz6hz1sqymhnz72ze9dj11g4e02pdc5721833kyy2t6wk3oq6qejjljeo43y4g40hr7lk7yyclb510yqfq',
                flowInterfaceName: 'mtcgv1i0mpvoc2lzehh2fhp38qklm2e0f7qlif7ua6wytiu0jumag29r1b0l81ms151lpy5qbct791yw8ckkb64sbke64520c21wy1r3t2r3xb3j4x1it7vguq1gza88l7zmoqfxch1k0aix4nptb8q7zeretjuo',
                flowInterfaceNamespace: 'nxy75wuz33yqku9q2nse5a6o9xh3z836aa8mz8f6c3nlk6ir47axvj53c03u72f7sc5uir6o8qglmmda3nv33vkf1g2tsk6rszdlfapke4d6h8h6stlrjxs5a9i57zzyarq1pt89qky43gg5yh7e2c0ooi0n3362',
                status: 'ERROR',
                detail: 'Tenetur velit fugiat in doloribus qui quae ipsum dolor. Rerum molestiae tempore sed at. Modi quia quod. Architecto sit et enim illo quos ea sunt eos. Magni mollitia reiciendis ut nulla.',
                example: 'lcbr4eu1zmhja4tmp5vq3rpff0wns40glltfzyyuet4jvwq9ggtlvfqd214p5k7nq6wwebm72h4y3fkq9exfnq6j6i8env9g7fsxxrzh4s1whrx6dd9k0hjas3kolh42jtzokfm8r2zv9o1h9w797wh03u2sh2qf',
                startTimeAt: '2020-08-03 20:32:23',
                direction: 'INBOUND',
                errorCategory: 'ci1symvkmfeg0zmxpqlfdc0fv901nf31cwo4h6xbd1i5l8bbkg59rnaaiv7ckjo6hnt32ni3mubqo88ufimb4086vv57p8gh10tba34z8ri7xj6dbuc4pf9be4m99uhzvhmk5phxx3ylbj9i0ktkqxxeg5gjdvvs',
                errorCode: 'f8z35vpmhoa8a8gzs8q4kptq16rk1gzfdg0sca1msv9oe9recl',
                errorLabel: 439561,
                node: 4490095607,
                protocol: 'vynamn92z9a7esoxyqjw',
                qualityOfService: 'ysnkyvxeowl19t6jvefe',
                receiverParty: 'jeag13ucgxuolvlq0bg5hpz98x7joswlncd1xg5rp5odecf97b5aq8i0lfhrbbn6ah6u0eky1w8l8qqwe0mfnozw2v6n2uu0hoyornxxs5qgvvo6sq07vs0zw0cddx1q0dakyl05iugv6s5f8ym6fkdznzcxnr34',
                receiverComponent: '88gqf5phddg4fu7oqfn7df5ohrrm0eujl4pxibplxqs6srk8n72ihb58rmenjau4ymc0vtenox7mk7uqfcnq66j9e6d4403kxwg5zjvw02sb7pwr4anfabonck2z1u75epmqkmgby3ei5f384br6pbbn5sh4882l',
                receiverInterface: 'ykc248w1kbg8yya7t20cwvtibgw9etua1p76q1ivl4u1b8saasug7dywnd0ar8jp1ye29ry9aq1y8ywo4wqevnikfenvoq2w87xdcy70nu1kk21adg5hzvs4vfhhaas2j1jjqn04mje08trpyyz883fnvpqc6osu',
                receiverInterfaceNamespace: 'bjl7p9eyey2kskr3znlnhtqpep7mqx2iekvazlq41mf28n3ktcl6ufc1glhx504h22k3btzjukumm1ort8uw5fsaerszem9zcffokzen6rq2nuhrert21nlb0ue5kk9aph7pxpdcq6xz0v3qz9q0muzcz2s10qus',
                retries: 6683930958,
                size: 3099027009,
                timesFailed: 8030095970,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'x4r69xv9svy7577wf6x4471o1ht8j4lc1t2xzegk9dyeduikb7',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '8xc6ndxzardu7on71opr',
                scenario: 't9ozwhm5e3w60lkrccorad9hnjzfi9lmwxtpj375o0nxnsbv9x3m9xs044a6',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:05:41',
                executionMonitoringStartAt: '2020-08-04 00:54:07',
                executionMonitoringEndAt: '2020-08-04 00:41:16',
                
                flowParty: 'hzanzflemoe8kbsv6yl69xchw96iaymmjcscftbk2xflui3g69noh76hza7swbet1d5hdpqf19mzon8mr4fzip5fm1m6k2iuim005fntdrp0gkudhkm5zya7icz1sdrdenk9f5bwtj1h07cuezw0nc02z0elpfxo',
                flowComponent: 'z8i1pg34drwp6qepq3r3ug18b7wt3r41vmzo9hnw0ukvrcgexfggo9ggs1niepau5ei4k7kl8cbvz3cdcz43yxjgzoxk0uxys909dt1tkfkx6q5y8uzxz68ac1sowx6d8wwn8xrvr0nsxdhzhu447calgo5cswft',
                flowInterfaceName: '6hog0itdfqgmhnwxxbduiq9z7k79iuzrf9fkl55okbyu3ol65jqxk71i1d75ekhcqytz1o81juzz7a02az72d9wmzx5rdd1h229std2bgrraohhw10u57wk3k04zsy6ia7eww5ckut1upekmx414sudf9ytc0mtq',
                flowInterfaceNamespace: 'tmd9lh83rkrg2v9ywlxexwpln96jk2xtk946vtvp2oj7xr5qsqs4uv85bwa1pbhpw47ee8803vi61rm8h0pjpmpggejawsusnq3r4hpvdc9wt3ib3d0t5y39mnz08rkrm73k28xmllhmr2s27olh5sx7ynwm0zvi',
                status: 'ERROR',
                detail: 'Doloribus eligendi molestiae at dolorum dolores libero possimus. Ea molestiae autem. Expedita rem quo blanditiis veritatis dolor accusantium nam. Sit aut culpa.',
                example: 'wyd6f0odakvnfnqqgtn6u0wozqu9qs0lle24ihrwpu5jlmol9wqvju1duex18v8tgr6hvs2wscujd58e464na6oaegyofi0dgxkrbu68d4f5ehclg0i3t0g3ttb1wxvkkkwwn210u72f6v6c18485710vs3ypd1g',
                startTimeAt: '2020-08-04 14:28:56',
                direction: 'INBOUND',
                errorCategory: '0igk0lkciikx69mzo00x1mphxszm9v339oavm51rxezcy5otlyytoyc7w65xmewoq9bd2tm7jxgsr801nyx6cgt92irlc07c32iwhqfxotlr1il3e05b3wj7wobwh7tnrwq814ror1clg9wi0r4l2cgb2lxrsca5',
                errorCode: 'ay7bvbo2rtl8q3d7hh2vd73dnxxlodlc2fj48rbj0o9fja9g1u',
                errorLabel: 300838,
                node: 9029490607,
                protocol: 'j75okipflzui8k0p68aj',
                qualityOfService: 'ylq1fm6zqsqsyhresvwj',
                receiverParty: 'fkoe81439jfzmzqsxmz8xom90mg3toc87avay99dh5n5qmi7j71tfgytcam2j0l3c1uxe9flxfocqyohv1nwheq50em3ukx3kyfli7uavadpyuyfx0e4rx7jo4p886zeo4ao131b60p15lpga3so7cw9ebahm21l',
                receiverComponent: 'pphkyfgvqhzcbfo8ywkqalwl7hkkt0sm5p4g503rmf6o5uf1itlkszaz78jp0ytpgkxm7dtnkz5zpjv9447vqpyjw5l72yu7g6zug3bvww1stvem1ib98eejdxv139xmdozgl1qycjcz3bg8yv8nrelgz9xl8dvg',
                receiverInterface: 'vrkrbl2scp9fms6jhs4jnm8lvtvshigvz2v0xugect4dya7d8ap4j2sa87rdfu5hg68jdx5b2tjzlruufgihf62slwg49rysmez3n2yfzpla5myko91cn1wonb3ocm2y5cu45ibrto2li4js6lm0zhf0lrm73p5p',
                receiverInterfaceNamespace: 'o2u1zqgbzvvwopqhv7s0l71l17d6lvkqr4330d0tbdodr2w6taz3e3dk1zqm6dfflg9qkf7fv6agqpcom5tlp184d1grwe6qeberjr5l4hkcirddu822ykwa67ayeh9sjbvhrng4cramr15f7q0nvm0jvqe1b8vj',
                retries: 1400721851,
                size: 9009565407,
                timesFailed: 1350436916,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'doz4uwip49dsqbip5kll3ctv0mu31vnp8d79rhyda4ozcnm189',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'pwyr9ferx5jtht6aphh5',
                scenario: '7es0o4frh3h2ljqtq6f5cltki8czaenp9qi5412uyeyhehmhmo0rmqrjplia',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:13:33',
                executionMonitoringStartAt: '2020-08-04 02:25:37',
                executionMonitoringEndAt: '2020-08-04 06:31:31',
                flowHash: 'mlvvhgp6gy25he34paeov5jbt09yb48uv03f43ys',
                flowParty: '92geawwbvyf3oz2agbf6z6ml4t1t2wg84wk62t08w5bojz4l2w1wpqpxszjb76csfmxlfcsidtaqnrkajzxonuz61f0wcwakdu1zkrms8hcgjjb8iy45lbxee6rr6agv0r1lsimqi66t9jt640si6wo7hfc7lz6o',
                flowComponent: null,
                flowInterfaceName: '0tvasose2p1zqh3ailbcdaktmt0k7x18zm6uu98ojgrwtwbivtih300s2nz6gw4noenniy4193i8rjbmvu4ersdifreofe2x3zoclen3mqedmsi4kozktz5vm7rmk7ix6k0ac2njz9hw7unp9lxdecq7vk34lrzo',
                flowInterfaceNamespace: '5asg1393uehuevypjwq7f0ly2sncqya9vemjyoz6qsqyhvlowz43z9v7ibk7g4m0axs8t65bj8svaztt9sqcsznf0aaroehr7063t0jmyg3kyju3b5fcyabg2ov8smfui34fvka57093y2rnz9br6ih23wyfdvk4',
                status: 'CANCELLED',
                detail: 'Reprehenderit cumque libero. Illum et vero excepturi. Corporis aliquam dolor est quibusdam sunt. Dignissimos rerum quos explicabo aliquid placeat error distinctio aliquam minima.',
                example: '9q4tcdkuzrczu4kaqbmc6imlw8y5x9dkd3ux8zdshw6fgl6q9dxp83c4zfz3yrhtpjdnknslmyl8bzkn12vem585txj8glpavwayndc14i4yrzhp3pxeqmts4h2n0u4wytawv48teiaathsafsxkz5f5i06pnyok',
                startTimeAt: '2020-08-04 06:01:17',
                direction: 'OUTBOUND',
                errorCategory: '16s91f4mb6dogzkm401vufv8q8hzishqlhi22tzr3eon0nhtbc05xo53o0pn9vyo0yuo1oqynrgq3ftih2s8kt3as0omejsv7a35nexh8by6twwh846jui2ius6vejfkigq0dsrat1bd8gt5yuauai4fzip5icfc',
                errorCode: 'zpp6pu9zmmf4bmjofbrtkulwn2ksul6t8p6g4smm53a3ucoto3',
                errorLabel: 475234,
                node: 5891308192,
                protocol: 't08rd2xcgu5duzr01789',
                qualityOfService: 'yn8mlyd9mmk67ijmtlol',
                receiverParty: 'jb8dfmektzjshyv5f5mxpkqkido3jjacsb51hxuhwj7yh5lb50ouy05sdk69fddzbuxx2x63b7f493hc4lorjttaopbd8al0w6zvkscvb2fvpivbeogdb2ll7xef2x5kjfc0d011i31cfl9rxjwd2lfqah4mdwuj',
                receiverComponent: '3i5y8e9ctcybp00nx6as8ywojv5g2dkz73if2czxdyujjavx1ab4576nvs3unz3wibsi8lcbplr6asssju8a2cwai3nk58rrfoxprg5ibu8wdcfjpogwecwk80zfrv27x4woyltxuzt338bpfunc5m8s7dnrn3gi',
                receiverInterface: 'easbljzb36sk17obm8s4afwz3lurnzvvo7hcstvwkm7y5hb8m6vtsylwqqe0t35m1v6tk1wz9ocx81s5gxti4zu7g5nj3fb7sz9oge5epzirrs625apq8axzj11btihnkq2mlnf41e5u6xetpkcvzl12k6bxqmp1',
                receiverInterfaceNamespace: 'r6xrmd4vctjqt3zcnzbuqqpl964dzdnj3ufu0jpsh5qxco016l71vncwwxxk20xus6ccxlcv7cnms0t2bits6zhpyg2cos1x0119vbdjsxwvpm2jvppytaum8yk7l9fzbo4b8g98w18lf57x0yyee22jwn2cuna9',
                retries: 7707845729,
                size: 7628867725,
                timesFailed: 5120977544,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'a6ginnngkc789wdswavijzvid05ibovarqgy31787hgjci3bvb',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '54nm4sy7x8nf7ws1jjbm',
                scenario: 'h1gus2m2z85rst29dl4e9493grmmimvquf27juci8u23yaddska2uv62ofgm',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:37:56',
                executionMonitoringStartAt: '2020-08-03 21:37:49',
                executionMonitoringEndAt: '2020-08-04 09:09:21',
                flowHash: 'mitndsa7wm652e6su2pj6a8baqwfcjkfud8qui0h',
                flowParty: 'tbv2pr2icp23v151oqdyl395r1xb63enxb5702fv3d1l5x3acnljlj9e2j1081z8szz3nj1e4fnyvq5bqxrguw20jwug6agsn18lfva8fr6x09rgrz88n9ptxr9vcyus6aw18peyimb8xok1rjdv0mitcapmbr1u',
                
                flowInterfaceName: 'dsfvgj37jl0yps02cyd3lxh0vnv06m6276rgld1ydersw11w2tlmry78x43eb2ku57zfy15x40o1be3qp1d0ahvfnub9gfbnr0jb19xstfa1ff91p6hikjuzfvxgbie5ajdf2yrg5ovdmlknkulo2rhyeza5g8fp',
                flowInterfaceNamespace: '1gktees6gunns2utvx36sxu9jv05ux1f50ivqe7omrebcj4frvzwhuqb59zt4mcsznr0x1c8ws1b5elpji7ubzymv5kwkyle2q8pt3gqmfx2lp9rmmadlg79fxrqvvxc14r2zmlb55xzp601lh6rv4w3ic8jc59b',
                status: 'CANCELLED',
                detail: 'Totam dolore qui nulla voluptas dolorem autem. Incidunt quas corrupti. Laborum magnam itaque nulla facilis. Aperiam nam natus laudantium repudiandae odit incidunt nihil. Similique soluta in. Possimus occaecati provident mollitia.',
                example: '3bb8544jtz2abk8h73f48jcmwqkqfgqeccrkc47jraslhbj9o04m9tljzvztnoegp4po2x0w6ychbdv88uahxolf87npfeob1cgptr9l6xuyjnue801fz4eisj0ujkz38z19xj13jfv3afsuasc7lkpmlsck6tm7',
                startTimeAt: '2020-08-03 23:58:12',
                direction: 'INBOUND',
                errorCategory: 'cdhbhcjlwshje3qeh2vn0rllckg4ulopbf7sgy0j0tbs7tz3mqamaisoyjk4131vq992hu37chlevjep2oua6xxtzvhh0kwuy9qkg35cgxaww2tp4z0419lxzrsplgz4c4f5vwqci1trw55d0odm3htunbwntkl4',
                errorCode: 'ah73egdrrz3gh2co50djiq5mwc1yx2ky685czeb9qrlccafbdm',
                errorLabel: 650338,
                node: 4186737880,
                protocol: 'plfnx3dwsure1ncv4jr7',
                qualityOfService: 'nux1p4fccbinyt6dqqxr',
                receiverParty: 'tmtw2ar8dv541rgx4npb09bpsqxq89gn8dxq6h9mioa8fs7dhar5x5zu2xjn647ckv66g1m1pwqj9mkpzbp0p0vb65kufyp4bc8xb5fgfhqsp7nsps8mps4619f3kop7ffsgppkmvvq08853ysee8nww1pat6fyk',
                receiverComponent: '2mpmdncgof32y5atyk7f32hv0gur59yu5g4j6iojkbwp2crjmqqskf1rl4esf0cyk002wtesb641nsyw5n1z63nrqerjgmpllu75asa066ez11scasrd0ke2l8iz9bgonxfb2edbmlxjxexqp6bhcfyr4gz4ptsu',
                receiverInterface: 'm2ai6sbprxupkyceafrvcyx4zsl7qykapwthg03vc7c3adt2qf9yb3sq0mh2pb1tpy8xkg7iqak8ajlu316s1i7j79vunl47yw6e5olhb3tyj9b82oj18lyysevzc69j9qglrn28s786xjjgkq4xphcdaorvnhr9',
                receiverInterfaceNamespace: 'hgzwi80tr1lkgdr63nsujfe3mqkf0frn8m0dnneascilji0opmow0746yzre6wfb80zxrbyfwzyzryy08ehud5j7evflvfflb4606mxfuelz83jreikkk1xa0lgbuc58d7jtv36qlbvnsz9wjif13n6d164g7sfc',
                retries: 2285274740,
                size: 6997701344,
                timesFailed: 4245261358,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'z2c444led4gml044tcm112pjnkhzv56w2hgnoqnnscy1ymr15n',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'ft9lbecwn9ahkbeix1vm',
                scenario: 'lyo6lu9mtjoibyn8nn49mhkn4amt2xay1tkipcmqi44z1b6rafhdykamo29x',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:21:22',
                executionMonitoringStartAt: '2020-08-03 15:08:44',
                executionMonitoringEndAt: '2020-08-04 02:19:40',
                flowHash: '0pwvsnck7wcqq9rk94mendkw7owrrop5hc726z17',
                flowParty: 'ccbnq62b4oph1sou4hl691luajl2oewwda2fpde82oh2vos0acj5x7xslsgdyuua7bci6mynvhbaztaoobrw51333xj9eo61upccyje87dewfef2bh70b8tfubo0mxjnqw4ndwa9apcz59qc54cz3vy6nobijhk2',
                flowComponent: '2nffd1hs0nkqb9vnmvj023f2aazfm7em373f4t91uy0vb8ij4bi678j0riuifay4i1e1z2aebk8lvbmopiy3x4cxr80hxzmb1awwxb6axsni7bswc53m2wk8jv25q2qih3y3n8fnjvfo0yps3ncy0t3ptjg0wuwm',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'kw9a56rjo8u2iyxyk6hy6wgw81g5qax5b41ov49yscv23qe0lv9ssw1c6qcgwqtk6u80mx8t0ibw30wizim7hfxaswodoeyossbkg41e4e0m8z1jqa525mo1ir4fmlske0xk6uea9s7w3dkk9pdynln0xl7p1ux1',
                status: 'DELIVERING',
                detail: 'Sunt quaerat cum placeat officiis deleniti exercitationem asperiores error. Quo exercitationem laborum quia. Velit numquam libero et et et. Ipsam est doloribus explicabo doloremque itaque voluptatem eum.',
                example: 'ypf45je00z25xgquw6yf3mhaqqshgl25pqmvwchus6tq8qg8ufyr5jdhv1t25w9mitxyvqmj7lxbd7rclt82l094sr7hmq4fns6vjzbizi992g0etjmjs5yax63qz6lt08r6pruic7x8u3jsaxgu5p3hsr35zy8k',
                startTimeAt: '2020-08-04 02:45:38',
                direction: 'OUTBOUND',
                errorCategory: 'xn6pol6bgh1pq4qtueen8pc3ucj2b8iswfaxulnuorq3ogruq1508w67a5gt7mov36rve6pv5k0krts9d0iekrbvh0onuju5t6t5kzhwbn47enb34p1vwxto2853udcj86v1g4uydvtskxdddt7kzv2646kuwrwb',
                errorCode: 'e6isff5sklxxc8nkngrfyyx6kj2w9jbzmhzntp6jj9kn3dcadx',
                errorLabel: 376240,
                node: 9596592226,
                protocol: 'd4q7qm1m2qyjr4sum1qb',
                qualityOfService: 'txlkrkyir8up0v6fgt8y',
                receiverParty: 'llywddw42f4vh7vsgf54ujy2x7ox999aiz0972hnvyiwnu33sre2krano8mkd6za4nqmqncy9u6wzjcmxdtrktyu164uhgrkqthbq509jjce3oplqwv3turd44zural817zxemt0t1j7clda3bvzoeb99kybrivs',
                receiverComponent: 'iqzieis4jbtkk29fbhlw77isqt05rfkr0lh3d7k3yt0bb6q1579nlwjc1ytfjrx1pywv4f6kd398o31r9b9mo5pw9sixqnlv2ql02g8st58dsgc2ufq7kfrk952nnwm5sk72mr18vxuq8egxnq23y1r7408n84q3',
                receiverInterface: 'mcprwqhirmqq6lehlfupjjud8sfskjl92n1j8j0pcnsllgqoaxq2ykk0awphfvpxkkkhfhl97sflit8k62jjolb3o5mz8qur1pkm4zhi7z3xinr8ugj85mzvmmxlqxa5t0l62ppr901tzx3n39gybqorkm9soqxk',
                receiverInterfaceNamespace: '3ph84qdyyd3ueitf600ihsj3m29nme4hqrq68mx3bu9a9iwm9yf7owdfuurp5p654e8ltu6lvlfl8ocbpiqcvkzzs593s3z6k5zb74fd6m19aqfnj46zeams51sesu4nbln7g5k7jziyhgjx51dnp9ywxqgyi4r6',
                retries: 9241517761,
                size: 9551224513,
                timesFailed: 9576648622,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '923xjgqtawy4skrxd9zcnbn4ydsj7iotpb7ope37u9mu22nc8k',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '9zcsro3mkn7ehfl3m55k',
                scenario: 'r9n2frrggapta9pc58t9lk8odmymc66bz3qu7k7gukifmttb6t7ievn2k7rb',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:52:06',
                executionMonitoringStartAt: '2020-08-04 07:22:04',
                executionMonitoringEndAt: '2020-08-04 06:08:11',
                flowHash: 'pq8v1a3oxgk62l9ihf4x7lis5626ynoypz9dlgvm',
                flowParty: '8hzqoo1gm6aq56pik3jj62rca7vvxicznos5zjik71vi6xjucwbnn99b2tey8v44gv8redlm9aaht6ncd4qzp93sm02x9x615tr4y3uj1yyl2y6osj15kj27h2oline4ri8rcs1zay7cuac974nvnv9wdg0updhr',
                flowComponent: '3od452bht8wiub1yerx3wrhcwro6nv0m685tbzqcyf33hnf18bvhh0jobg8l244vh3f3r4lad93g5co54zoe2lnd5epp8rm84bjwmrkf5too5qtmyx2v7dtkyeai7mkqw4qjzjqrsaljrd5onor5hben58ux5jux',
                
                flowInterfaceNamespace: '642jfxd0n7qj06qa35yru9k8k9cjxvann85saqqv7jihwcscb6q0zv7grbz3maiy4ke2hbwhpy4at1nn1egfr1p4e4copv3bhlobi02nd07nvbtgxicw8o2u6ondgewfmknokyskodsyhoaxje54txsv5yfc2ub5',
                status: 'DELIVERING',
                detail: 'Sunt itaque officia vel quisquam sed illo. Minus odio quibusdam commodi esse voluptas consequatur commodi excepturi. Ut qui perferendis reprehenderit molestiae. Quis placeat error quia perferendis quo nesciunt alias.',
                example: 'o5i6ieoiudbp1lvp9do5775494h20bbfwjqannyhm8nqtf88hwudrv1vk9tjueob18gagn4i6o78quyoc8tyhv59sp89sdeocr1qlazq9auuxw9rm8omgocvv6161r8aa9nnexdmf381mzldenjwlapege06ts3y',
                startTimeAt: '2020-08-03 15:17:30',
                direction: 'INBOUND',
                errorCategory: 'avx45qh5jxrwjvfe8oksjxfa3vo9futhpiua345y13lsrwe3iuku2cvwat9ee37d7x3exyeo39x8hem9r8olf2ruhuvck5ewnxc71vml6e97vtbbk77zowk3094b932jch4p7ng4lchhx7ysvnwh1xrwbf329q89',
                errorCode: 'tzsa38h27r1ljo9394n3m89epnny6i6zhh7ggdnsjfldq0ezuu',
                errorLabel: 373629,
                node: 2180432943,
                protocol: '5kpu1n3g1tzxbgea460e',
                qualityOfService: 'drcuiq0p0olpmvfu17my',
                receiverParty: '8w12v4xhihdoe4520jsy2go9mi4f5ykceq81wmpjy68q4c1o9xngknowastk2qwap64ul6hrfes115atvqmck4goah1r20n5gxvhospstkoyg52dbaejtbr2adnhxdo6f654ku7u4vpwar49qq6sfq21f4fv6vk0',
                receiverComponent: 'lovyzwvwk320qstqlvli86igzki8n5ue04ki3370hffwundlucvyyzxmwjswoa4346i91fy7uav0pmvxrnbory6en2lusxdcsvd5bad9ct1mkl40yk2zsf8vg2b9o8ibmm7n6nldl63fjj18ew3ei18y56fmbcmq',
                receiverInterface: 'jaaepynr068g3vae3laeslka78ypry6dfrfgf8yxm20vxrsfdb5g7qbtarymt5tca22g6qazcyb3cvyxzsgl6j3v4q1xndny2lhxoon87c2h4gnwo20y4il0zkf9l5btdruk77gm9o06jj2knj752e6ir6gcrois',
                receiverInterfaceNamespace: 'bxon98xucjfqhmx4n0i5kte1ib8hmwfcbzd0w3md0of60sm1n9k38m3n6jw9h0gy5pi7md07nx5p80n7e4wkgdjtubzbwbkpbkn6phqlsb6as08uqwejjqvi5nzy2z3hymavu2j19ca75udg57mlkyjgx6yeyeu4',
                retries: 8769893554,
                size: 7401198341,
                timesFailed: 9867824591,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'z4mb9bqmykd1sfpbnqhypcxjm4k6w0pfern2uwyxiqg14qq9l9',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'ylx8b5nle92w19wdrgya',
                scenario: 'ob3okwkr0aw5l84o2zzdjyw04nqgd0snttpeitmo5p7cfw99woucooy9e385',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:41:08',
                executionMonitoringStartAt: '2020-08-03 22:54:38',
                executionMonitoringEndAt: '2020-08-04 08:21:46',
                flowHash: 'amjcr2efq9e31jx980u3l2iyesfs7rqp3gpvgvre',
                flowParty: '1q9xcfpo6m3vsy6l9av1imgoxufkmkorp8ihz5itdwg5fs3wynth36t6jjki9w3h0zcopkkw0niqiucmoklukk0y7dunmjpo4dfgtgh15wy3mxlfspoyrnl577uv1ynq7ctqe2mfy50liqqj9pgkivg239qf76wh',
                flowComponent: '3ui79sf4u3we0nfbvht869dgvxxy5ox175tsvw1j66pbyctb3jrq4h7wl614gp131petc0q112u8e642x19r1n1hfqoez8lahq5ho2upjw32ubjbd029mzp2wckzutsu34kdkunmno0gj8r5iqacl64hit0ydduy',
                flowInterfaceName: 'k543sfifp7n1nplvw9six0bpulwpn27mnjcpk9rz21i4m1982powxnk7cov118wlrnx6n8opnu3jshia7grcr02eua4cpdo1ns4n45itoqt45kyafhk2ccpcak3vqdwb0url1y13y3liwcooyc23bxmz4sdg5ixm',
                flowInterfaceNamespace: null,
                status: 'TO_BE_DELIVERED',
                detail: 'Enim non voluptatem omnis dolor quo mollitia modi omnis. Maiores explicabo harum officia. Adipisci cum necessitatibus dolores est.',
                example: '3lrlmfm261jnbao41lvbtkw12tpzjqgs85bc0xjj53umlr1p74dn2d9aq2a57n0udb0dnxqibzfu5arp4a9jxt4ufbf6rc4t6epprlb6i3wbjrht9j3edglxc5nrpy3chadl8va809j3nr1iq283keq1ldeg4u0v',
                startTimeAt: '2020-08-04 11:21:34',
                direction: 'OUTBOUND',
                errorCategory: '13yfuxr8rx5flmu7b3crur3871nz792g31269x6gekjdzfy8iiyo8xb2ykrzz54ivd236lhzzhen71u11dyarkxghpmadsuoicz370zp83acfxnbo4l70lmk8jejgec14dfnsdousumlx454fu6qc3zxf45qb27s',
                errorCode: 'dkyqrxw4mx9rmqjegukwrgerftjxuca6limvmvzbpv630ssmqc',
                errorLabel: 427853,
                node: 5551773930,
                protocol: 'kivsaj8gweyz2n9izsk7',
                qualityOfService: 'zojtnfbselgk78p0v17f',
                receiverParty: '7zp19xnfs7qhwpvaq27o4bf8ppkf0qkagx60lhh6sligi9inhoc80zrz04p4y22wti2f210fa32mprvueyjzat3kifjsd819kc3d87mwchg3zjgew695m3kdd8g0721n3z9ysalp86vvvntpaomm0ulgw7sh35yc',
                receiverComponent: 't1mcimda80zxi64rkllob45x2ujyecrtx4s4lmooqptry0jb38t147o8qro27puqhcx8amnxxtigoyxdntmk3xu2vwjahmqws1cm2pdnhrd8w544bw40qavw5s4p7avwhlkzcdbeks27fayw19dfhne0f4smia3c',
                receiverInterface: '9zazzaq2j0a1w8nz5cv4098zq83r7t569yxoya4gk9ktjmos7zp95jhte778nwvirfgzhmlxs6b8xaw18zvqi5o5w8b18d6ejoz2xg3mu5yncurq651aevtk9cl1ll5yxm4ynueghnll26txdhptmvvaecfgptm2',
                receiverInterfaceNamespace: '7qfrmppbvtbdadb6j4en7v7g10zk45whiebn9dv9ep8ju1m50qavecrorhr399gdeko5rvo2o2ofqg20gj7rvuq85ujs1y36sulltvnaw261r7yvw1bv7a4v7g2adncacciaq305t1r5xbynu4encepib8dtimz4',
                retries: 3551126864,
                size: 6232034239,
                timesFailed: 4070392833,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'z6w6vw0rc6onh9evqfv1p4vx8yzcd0q9og2asrtqpioi82zpwq',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'd7grsil9x859a3ire5hl',
                scenario: '93qsdgclsuyc8z7q24pndk72snj7rpgbgu9buu0g6fneuvbnfc69nzkfrc3m',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:49:45',
                executionMonitoringStartAt: '2020-08-04 04:16:59',
                executionMonitoringEndAt: '2020-08-04 13:53:17',
                flowHash: '8z2njmv5v1x4hawaqevmno4p84mjlh6rp7z0kspp',
                flowParty: 'o67jf77nizmp3nviedhy2e364f8q5tlvcifc8ta1da8eszxd30k5v9cqu5a0k8pq5q9gqnyvw5qa3xl8vtzdjlumb70gh2oh899fo87pzqz7uvwrcgyr18d43eayei3zuy8px43wh4hgg7608os2k8v8xdayq68p',
                flowComponent: 'nc7jxdrh9m1o1bp136pbit0fjy98m2fgbbzmqoohaot4qu7fer3q9j0dpy7l22v1vrh97nd1cwhnvs51pmedxvox5m3hzn4kuzjvx7sp996pt1vp239c0e84hrq84ortvyt6cr61xs92v6y68cifrpuxn3tl2uxl',
                flowInterfaceName: 'f72xunxmhwyzf2p3og3wt3zce3z0saupc8lwk0ggylm4n3s9sbh3706nur8ry56ogqrydfmcp9lgwzsjk9qkq5rvwqnro6al46etu7phgrx67ry7f3nwvexrcdmdp2zt6t06t0wgij2rbc6q3q3wdp857i64o6gm',
                
                status: 'SUCCESS',
                detail: 'Unde velit unde pariatur. Corporis voluptatibus quia veritatis aut aliquid debitis consequuntur aperiam a. Rerum a ea sunt dolor ut voluptas magni magnam. Temporibus aut tempore delectus iste voluptatem. Quam est rerum voluptatem consequatur autem quos nisi enim. Perferendis placeat accusamus deleniti deserunt eius aut deserunt.',
                example: '42jqim5b4s55ajpupb866lako0znocqgrim6oibrsk34cqul7tpauxsyqui6ol1x8txupix9u1lma4nukm6ptvq9vktcv12yt86cyvla65hd38irrnr9dit0r2pgry01638fcipdd3xd9miiqo671gg9j0oxr3ds',
                startTimeAt: '2020-08-03 16:41:58',
                direction: 'OUTBOUND',
                errorCategory: 'o9vnilopc7vjug65blin8ru09gz219bw3hv29emuepllovwwhih4qo3ycd2q02wr04a8rqqyu66f2guikg0vgnjb8wak3t79pz7ncsincumr383n6ptgr88vtq7nv8ncxnuolu4quwruruuf24tqbbmscit9kufa',
                errorCode: '2w51qot1n5yxskbrx25bczx5hmsjyoz5jfq0ddxaj9w79o8q1u',
                errorLabel: 618091,
                node: 4011842980,
                protocol: 'ya7uv0fzspsgov0kc1yg',
                qualityOfService: '4f44ldjj3jbj5fpdv1y3',
                receiverParty: 'wlcjfhz77z8aakbsfitpz6amy1g37aama9bk0kzo48007ko7ssw37gvwugv11v3afatovhx0tvltzid23ic4c06xh9xz3pcg8sewv7cgulr39xqfw16i2imqwoylkff9m50l1xufitxnqani86rat5cn4fax29t8',
                receiverComponent: 'byieaxgb62vur4cgd576zdyfjd09xk98tni1g2d3zop1bh3clsjmttrof76dz79xdyhw07ehx0122o3hes60uo6ke1ndbmeib0uth16q9gdc4y6g0yrwoh1ho9oiiu7sd8301icxecnfy6i4eko1l4stzuwojiq1',
                receiverInterface: 'pe7dxe5lkt5dni9mtm7uvg15u8x6luj8ua3eiy2wj7vc0lcx72d4uorbjpj44mwy1i5kydbmnceh8k9t8xytatxn9fkcp7om0bysv9s5g83mbmjeiukaaonhhdqoln78tfk8palexk3squ0kmk2e437no2rddsdr',
                receiverInterfaceNamespace: 'll0i870oeseq2vf4y6ddv1en6xhl3en180pipt3cckdmndu0gbw6kzxfvbwnzahns65qbzpda2dz1uklh7mqx7agq4p12tygwl45ch368qzrs93dtsw0x08fg6zenidx17ctaqwrg78j3g0jfxzm2fwtnkzq6yq5',
                retries: 9829352757,
                size: 2936803388,
                timesFailed: 4122624067,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '89crpi3ljbvzg8380vupd1fm4ztv4jplfyv4b2kwgjqdzlvkkj',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'p96267x3yq9txtg0ntwf',
                scenario: 'sm07lsqfacmfqyqu11m0zwsk8d26bvywygzhdcvr60wdkue7hgcuy8tl8mf5',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 01:51:32',
                executionMonitoringStartAt: '2020-08-03 23:54:24',
                executionMonitoringEndAt: '2020-08-04 01:17:58',
                flowHash: 'njhnrnokdrykuczhowc27p7h2105a8akq1kyrzas',
                flowParty: 'zcbltrh783eo0zs8flooo7zxbqdor85uqx0pckibcqef94r8x66mddwhuwgpic5mnk2uxz6uoomafm2du16d91zemtrb98p661fng54fqzf5sz8upiachtc42sjpxdqmsm7c2imbxds6gzwdx8bgf83ouxlhzk7q',
                flowComponent: 'qirngyfsins7mpffo0wwp1y3b64ntj8oomdbmj59i5p3sx0kemvhj0p00eomm14dfteu2uh7ekpy8vlsadife16j9i6r1uvbsllgygv60vnbl4lm4loq37qkjrcikzz5h4udtvu7iif0cqma45ai1cwrupjattbc',
                flowInterfaceName: 'lvfcax0gaqbk1dhde4s5sgefmvi7b5guhluiny0rncj9md3wqb39phxat5y96k9k1pgckrp1s80rle9qkqkb48ezbc3e3w8moqd1601esnu7m9hk875ubokub43hd3t3d0vpyu2ts4z4rqnchr7g2sxfu043dd2q',
                flowInterfaceNamespace: 'gtymdtbfl5hwzmailavkkncdcpqihi7va2nlncucqc3noqbtreijybpwse3zvey8ufung9733izf53540x4zo233sbo642qfyychuf6eqofj8s85y6g27wej6msyy0bb0aq8bjzks2rke2h9d0h79r7164yjzcs6',
                status: null,
                detail: 'Alias non quas alias. Et voluptate unde. Beatae assumenda voluptas totam magnam et quia rerum praesentium dicta. Id cupiditate quis aut et. Similique odio quis optio cupiditate voluptatem quisquam delectus ut enim.',
                example: 'hrslzcybi147ar4hc1jiw28azxbtep6zlh4qpwqxmk4do3g1oqse5g1z3av3berad7johj4a1xbdchr4k0iju55ynp1nsg6hl37zwt5o2pw5fnjtvdccwhye58qk4z94djblrcifqh0onm10ntxvp13x4bjay0ey',
                startTimeAt: '2020-08-04 05:42:47',
                direction: 'INBOUND',
                errorCategory: '5ahbh01oh2z1cnb32y83fqxe22vqq6foojcszzvqvppany49yuxs7drx2zr9easj3hwj24dkl7bgld387wf6w0zsmb2x27guxastadwximmw7kadj02da7gu4lb9fqtvdmq6g4qrg0e29sb24k24kah1sphj4lyr',
                errorCode: 't1h66o3n2va3d783zqokyllitpib1bhwythr36rb3jmgh8gz4m',
                errorLabel: 283792,
                node: 2187013704,
                protocol: 'jvleqkpyvrl68ojbrtc5',
                qualityOfService: 'ijmim3dvo2e4brbg1c8s',
                receiverParty: 'u3a6fgtayr3c3ocwk551ijfbp4xdcehxpmbyl2agqhx5pa5j9whj2d20qqhaomzrajfl9u6zpftrhnnkixwuunh1exra01x4ep4w929841akuxg9wa50ueszinu3u3nvl0wgy4alsjlerhpifvee8plyk7e9jw0n',
                receiverComponent: '9sl6f5j6ifceum93mtifbdacbh0pbib8is8q9101w65e7bykytrdhkcdl698zjiasrjgvctjr10cbe0zlbae8xxtvbp45wgjay7zgot3jzgssn2octcsqh7kylshcbjmepp2k3wggo9xvybxrlqr5pa9ktyc5tmv',
                receiverInterface: 'zrjoh7tswq5hcs2mcfm7nkc9eibitbj9yt7jez6y0ncp0l23ov2ygrht9we4wvlpyp0vp2v44k9zfr5qtk60r604vz0dxezyd4hxfpbbzj0vlvfsdarltamkff4d4vvlf5lj1yyo74jxovdx139zwm706mnub3iy',
                receiverInterfaceNamespace: 'nc64v3qkdbhxg0ynt18oiqt3q4ljstwhgkj8ezm8wdcyo8lrc0msoy0iuio6mq3fdvy2f2p8nawwk2yw8icyrjjv2o4dvfbhw21bevxi66z4zbqhvma5vd6a2f5pft431r9cgowxa4vf52q6g567lbguurh776px',
                retries: 1107305621,
                size: 3302300274,
                timesFailed: 6041926170,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '8hrkrjbvowc5bg8vofd8qz2grhy59yy0dh6sc5qbuyejr3p75i',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '4hcqi4ng161h1zjc9ru0',
                scenario: 'cu85y9agr9t2x1buvlr68phlau8frgmqrdwh489cwfql9agffjsrvhoifq2d',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:39:13',
                executionMonitoringStartAt: '2020-08-03 15:14:38',
                executionMonitoringEndAt: '2020-08-03 21:20:47',
                flowHash: 'hu70phrbohrr22k5xb3nfd5776gfwomplf1mcqfo',
                flowParty: 'ivrtuwzccjdiw1jqb6tyqww8bsuhsvz1mt2jq182vxlzx95y2d0de9ebqg4obq047km29is3uxk5pcfmurxfon0so5r9rwtxg1n6gczgom1e8x0e7pupdfx8qx1p37zxovr0wfsr1e5248pgiod997cescfazlm4',
                flowComponent: '673zdktdb12aw5mbxruj0bzlqd0jimtlc67e4ov38dhaskjb2uvv292ehne8je0ikdto3n1obt1ahoftlla6phrc4cxcbdo8ud37g04ihjc4zrmqpi4m7ig0grz7nczqw0cncxt2hfqpsed5nc5k884yfvrg7b2h',
                flowInterfaceName: 'js7sz2njgfipu7c3yf52izuuk19v28bejcp4zi7edrn9dxr0709m20ww1j8x9lsinydee21hhaahpyfqy6b64dppxof9x4pub9rv61t4y4u7ac34itrymjhio2xup6jmbpci98m64w73k2k42a17eumoquspx1g7',
                flowInterfaceNamespace: 'ie78bk7vrh4majmkqxxb610s505co0ww8o7o17tc8fscf2myddmi4bo26u9q6l8yslwmyf6t85rw9y3kzmchnjz0vi03phhl1qha1hr8np80unlsj8mv8rnwpgtny9ie7nzp6l3e5xv0tkm8e5kwhfunh8tnlv8y',
                
                detail: 'Eum odit excepturi soluta. Iusto consequuntur error in. Ea quas quia cum ad officiis. Molestias qui deserunt doloribus expedita. Veritatis beatae saepe quaerat sint repellendus.',
                example: 'vfxspnwnap61c3vvtj71zprj1xsy1wfus1og65bkgfwjvngqjwmvhh280n2k080cddb4w8lq29195t1cpoe9y6nn6oescp0skm5eytss53rlues6whetg1k8vh487vo6nkz11ylw82hsk31k7nq8hluuq0em36pj',
                startTimeAt: '2020-08-03 23:22:08',
                direction: 'OUTBOUND',
                errorCategory: 'hfi6ozjjgq804arwgk5yu4j15pg4gcthhx17ts9437layhd3amzfb2ffr9j7v7xx9eoka8nqygcbjujynhwfi7vhfhdh7si5h02jhy0m23xtzxrom71l5bhw8k7iucpmk1m7tzn9e82d048fd2sdqmd6biq6lwt2',
                errorCode: '6erjzri6uqrf7ch1h8f0z53svdse3kqy41act0zrkko5n20rxd',
                errorLabel: 722867,
                node: 4036082310,
                protocol: 'evbi3scgngwrbjv67mtl',
                qualityOfService: 'ngapqwjze1djlnn0oztm',
                receiverParty: 'waopcdhkicmu8o4prfs7djdi3djd69zqfy5tigwsf9v0x4pax55bg3i3tpwp3gbo2lsn1vsiiqip8985q9muiy59epif0niz8eu2kv25acb7ov46xi7vyrcajhkxf5t27u50rz91j1sto5pzz30ssrzfpy8bn3pv',
                receiverComponent: '3m4mxiahvrcughceveecztj603iilbw5v8pf3kxndaowsegs1nhhvaed3dtdrdokmd5mc78jxv5trckg4gq6b9sb5fmgp770sob1aa2nxx3ssuu1qo05vm5589t12nkas7moo4uiw5cardsdehgprdxqjuhgob28',
                receiverInterface: 'l16x9y48ioalwscpafkhqx2dx1cgtq9rqjci7d2hhdrs4wqpun2djxpt0bo07k9lhzetkfoajsbsny5h09qznm9l6gjuev29mb93nnoj1c9i98j6147537xa3h0z2a6mcumiswjmn5xllxo369u5e6utk9tfn41i',
                receiverInterfaceNamespace: 'zwf6iyiimvceher1xs0cfxbwne7ce7knqpf1zci52l870xx90upa3iko5ppziarxsmegv6ulv4xgl1ob5xs4iz7h5lt909xt7wtcjs13tufdv13cz67rnoiql21k0h1qqe361uwl9uf71b7kws3pzrvterlvhxmz',
                retries: 2854056411,
                size: 5871078154,
                timesFailed: 6845145089,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'ofq6e393rnof9qgxl1xlz0n8iencqghc61zou4gj5k345nmrr4',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '4ya5lf31b2grh7100rfn',
                scenario: 'ngc70u59ujnbadi1rg9kktpxrgedvq5bghjwleh6dcvigm6n61l4yzv4z4xx',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:19:04',
                executionMonitoringStartAt: '2020-08-03 19:08:19',
                executionMonitoringEndAt: '2020-08-04 09:30:35',
                flowHash: '78iea34zhm538q2wmxybwvi06ksqtdodf9l923zb',
                flowParty: 'x8dgbvjktaas33g67pwkbd777jyudi6fqxkgngqp3pc2mcnenp6lwu7rlrgp8m2r311j1xe1t1rccawldkoc4ktwhr3gbhoyvybak8zj6hqbempubn0r9d6kxl5jope7b3njq1dkvjo6vygwp4n74fueuxtj5oqr',
                flowComponent: 'gp7cy463528udkggmrh66hbhkbamyzoew9n8lx4coc7dt0bzj3gxhjngzwpgfr5w9foo5v2wpc7glt9a3oa2h86ef435yh2usaoo9xyqma7p1c641i0uojf0mbe7zl25m73ynhecfwusnsjiaff3wx0byuqcalyi',
                flowInterfaceName: 'jghot2tojsulo51d74pk24c7k5bz1o6fpbf7b554hjjrrxein2k0lvml6ejptgxp7poh5tc8278t7lgmk39wv5q2d7uiarb50l0ag2hyrjn78pnckub01aiv9oojhkus2305cya3qtitdg7k922r8vyaev7ir14l',
                flowInterfaceNamespace: 'hk6f4uaafed4jaxo36yvp0qvz4tj4jnd8epuzyae5mweep2o57e7q06ungccq18zxy0someex4u7n1djc2krpqurr2stw5lks91b0r7o2at8kp434ty9dd5thux80709bepqtut0ug0mrdith57fywm3gcg9huk6',
                status: 'ERROR',
                detail: 'Soluta nisi odio nisi qui nihil. Est cupiditate adipisci unde. Voluptas explicabo mollitia et rem ipsum dolor sint cupiditate. Sed saepe quia. In quisquam velit.',
                example: '8q9pz31rw06ghl1ou66h0b4lmsikje8w81yqpouajb2j17828x9jum05u8ny8q0yas7xqyzj4zw7euj8ltpn75rcztor9ys0cfovxakbasju5lh2r1pkdw69tkgz5wq7dpswqa1g1t5bp4dy1qghxfnealucqy0f',
                startTimeAt: '2020-08-03 23:54:16',
                direction: null,
                errorCategory: 'e3bkwwujkqlnwr4eq9kgzk8cwocccwfywocbb16i0wwx0zjjv5o3y1rscft0dsg6ikdfnik7ttpst2fkquufcybkjk0yjqas6c19k55l3gqo3izy0kx95dua7hstxy0vf0obo6i630cpry9a0nuvavy5wmlovujo',
                errorCode: 'icow3k8snzxtyi9mwza07zil5kjq2ep4vro4fotgbjvskadhto',
                errorLabel: 720415,
                node: 3719588963,
                protocol: '72g5ecva5cfyj4u9ugl7',
                qualityOfService: 'ejfu1v6dizxb0hzbelgw',
                receiverParty: 'g489cfq6dx5yabzocx12drcqzk434h9ilh463ufta3u98y4evir7t2s2q4zfcagvwn6lf9mydnewj3v938jtti0qkaujheddl0s9f79yxutyiksllhyu8xa5ejs8ua622xc5m2zaxmlmovdxwg7dnbpgkj4jmzql',
                receiverComponent: '6k7i47wtfw29t9chy8yglhy4tw5g42zt2ge91pu079hkoukh1ijbbhyrj4mdjz4gimacv62uyapviz24qhsjvxyta67d4xbzi0fevbxtkpr4sotv4pwcy2x0rn69h4omxykltjbn9r03sqi3vgzmppfmuy508uqx',
                receiverInterface: 'y89s48544zb8gsqurfmo9ursjufrt9cq391r4eqbsjwftsm5eqohzn2vx03wn743rnpc8skiyozh1ebos7goadoloujm8i3p0yjarkwus2wqxmx1rtel35rm4618tq4ou2fe52tz6u4r8ifnsejdgv3o8pyufl4u',
                receiverInterfaceNamespace: 'cf5ae1vf8yrcr6gm0970cik952j4ye7qvlak7e549qn2dwza7rbqhqkr3v6ci31undbd1at2s1jptauu8n29l3die61d6mv8xgcaaag5kcyvycm64dv3fqxrqgx6cov1gsvrmhn28gxzv4fhe909q9baggkvdceg',
                retries: 6923000216,
                size: 7062662789,
                timesFailed: 7835134145,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '0fs1w8pxswws7htx9uim0nk51ccolaagtotrq4ttxwv7qqdqfk',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'swnplonlqc2jo71qdz8e',
                scenario: 'ledx70xhia35uz9kesra4rnjcllgm4n1js5pulgwtrcak7emvg2umycturjf',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:26:33',
                executionMonitoringStartAt: '2020-08-04 04:24:41',
                executionMonitoringEndAt: '2020-08-04 02:40:02',
                flowHash: 'jyf16d5jdog23hsll4z1nh44qe6vybnvunnv921r',
                flowParty: 'qebv76566p2cy0t0ltkor8whlq11n63jmyt6fni0l5uql3xl1meoe47dlxg28mfrdd3aqdtdchb2n4n2jdg1jt9pwumj6bjx7sakpz2ieisar5wuvkn15rr4un2tqvnckfkyq33hp9kfesxdy5sp7qydrg084rco',
                flowComponent: 'mvs3mzqoinpsk8h11iuytlagcwod9znajkanjo1amaoaa61g2sqvkdd742t8100fpxgqwf84lbjsijk0fhh7pokpgijjn8ax5kmzrp16a3mic9iepl5z01eyjozi2xx726ac88i1lrnzuyudz3axo51d8zcyd8m0',
                flowInterfaceName: '7adv9ccld30joakj9gmgxy7luvahmln15q0nw50a7rzhyji47pzj3vq1qlaqyobp8uw7wyhgu6fh09jnfells3wke9kg9j0xeli4mgbezel0dxosynl4qslaz2x5lpn4t32powel1oe66v5u6t6nw4sp9zxjelsl',
                flowInterfaceNamespace: 'hl3v1an0hq82ktnkfpika56n51nwywypv3woa5zat1ytpytwkvn9c68n5n847iyvfidiw1pbjy702uj25x1akploqa6fpjx0sj5p37wlzjuoij84xoqvzg4zeelhqt44ipsqdoxo6zashwk5sz0fhtgpgtkazft1',
                status: 'HOLDING',
                detail: 'Fugit non laboriosam reprehenderit. Eveniet harum voluptatem. Voluptate et laborum in velit quam laboriosam sint. Suscipit saepe enim iure distinctio laboriosam laborum corrupti dolorem. Quas maxime aut corrupti itaque quia a autem fugit.',
                example: 'q8qidoj7e3v031wus9gt0o0cluwn89sqngoepzvp2c4fd6u57x882lsa21c1l5r7d3rjkrkkl132x10eiso1p00dbdbfz4g4evba7oyrfjy3hv8guumpnaasrnz36fhm4rzkmq37ori868f09i70s6an68ui0zuu',
                startTimeAt: '2020-08-04 03:52:20',
                
                errorCategory: '60di9vpkbgoserw8cxi21ga2l7j6h22a7tptqlvtzag8szdj18vqlpxdc0703gudi44ux2vqqh6hnd345ncwr7c9rvj4y1vr5wjtomj5o4zahc0w74seb2xkp03sxbuy7iq7h17rudd67d3h8fmheo1mboswvgf2',
                errorCode: '6r6pbz7e3g9hg5lt7q2wndoqo1q9zoawfu87j68dflc7x57gbg',
                errorLabel: 590736,
                node: 7768064291,
                protocol: '2lp81jg83xkjpm0cqcpi',
                qualityOfService: 'tutw9jjt6yvtril9csul',
                receiverParty: 'wf8rwlqdcbpkinzjfdyzsw90htxybu6fh0wmpviu38yaxp336rhidskuihn6s88rml2zhys5c6blmatewldlp17xw4vsmexz6m7dzro1x7fub3f6j21cc82hi9bgtnstip84dha9dnoez7s5ub2juigd6u4hkq5y',
                receiverComponent: 'egytb883rzzaom8id7n6cx02jae4l9w18favbtbfglo68vv8hvtfixq7ea04jzm1jhltbr10drbkto55e4svtrmlc64fjkk1gsmsx0fbchk6ege9qiatlr519ekcc8oml55sz14rtgpc8mgo4g1pibea0x0kqw41',
                receiverInterface: 'bruklq05px67c7s06vn9fvxz3jkz4p3jhsf6fh9i7eb8uxqbtuboz1oh86ewawzdvdnonna5cdacbs09qj4dx8ffawvytrn6kyy9nn8542dm5n3b9xkoqf4unp2obl3e1n15f03guno91qh1qdiw35xhs09ehz42',
                receiverInterfaceNamespace: 'l000bwcvw91ij94mpl6dlasfuy3rc1kmt4fst28nbmdiyoosqoajeo4zbabijjfuxegnxbjcvj7tw5p61oaqbdpiy4qf3qr2v70avfku4ji9oujd7a43u9b7i81wg0fr0qly0l4zymslbf6pygcv8eipu3357r1s',
                retries: 1546918798,
                size: 4047000813,
                timesFailed: 7868727019,
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
                id: 'dy9yv4ka3sfss6po3883grimjgkfhpbkq6ufo',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'z4wthn8ro7h1t75uppofiax3175do4241hch02l85u2lbgql99',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '9erzn2gtjagmnu7rmwpr',
                scenario: 'l00d3k2cgpkv433eec2v7qeuuwjr9n3xqip3gb81ieo4eti3kgzgrp7pnsxw',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:50:26',
                executionMonitoringStartAt: '2020-08-03 18:22:12',
                executionMonitoringEndAt: '2020-08-04 08:25:24',
                flowHash: '5t7dck3d7uo5zysnpqmi0hbnbp8q6z89bppwh2z6',
                flowParty: 'y2h2r9wv2qotx3kzle6e13h7w0bi5z04ee9v1ippoaka0e55sj24zbbk45gfvxpisy2qc5brxme8gtr75vfif908i9wftbz4x0nffjc5frgms94nw541709pk5otr7p0b4kybw3xtpnuls5b8aeitzyxbv25jpvn',
                flowComponent: 'ugv00k46vek2nsd4mx0a0z8wgocibzo11c97noymm6j7t9tmrmnxych71h3g3v3ya2s9uwnh74fwp2ayzrh6zpysmykrgm4h0tuof7gr6beegrtebucsu7931hse0v5k9zam2qsaftk9khti44dzpem2fwvykwet',
                flowInterfaceName: '4r79qu6iybzaqv95veixe5icrancfztrbzl5rjz4z9d35hz5f467w4q029rgw0xgizemvg7giqz6tp6i7hpa14o58zhfkisnxkas8874dqczr763pqzanphupg5piop7zz68br6nqdhoi4tgbh1ihl64f4bgf03a',
                flowInterfaceNamespace: '45xzknfejkijje6nieb2igki5xiwhm0prgiheidt2f87ii9svwrrmr42p5zl3it9l0mk7mlrnu1ttd6pc8p9ylnwv0fcugobnaytlf69ajj5jyqiwdzre2e8yvu5k25z2ky3jpxxwhy8ytaolwzhv50vekal256i',
                status: 'CANCELLED',
                detail: 'Ipsum sed repudiandae cupiditate. Commodi quod vel sit eos. Eum aliquid doloremque delectus possimus non mollitia officia assumenda. Et recusandae sit. Qui accusamus dolores reiciendis nihil voluptas et.',
                example: 'bwbtxi0ypjnh1m1x7pjqy0gapcgw5ik8a0k2b3p72idwv5unfwdzrps23q5c9locmduiubc5jkrcabyj53b2kkqssm16aasfi14z87ox8d4m1p6f3o62a400jk8pcnu2n0reby62jxjo087h7947sgsh81zsy05f',
                startTimeAt: '2020-08-03 23:07:54',
                direction: 'OUTBOUND',
                errorCategory: '2l3svzim59wcejaie18dhtr13vsglkhaunczxnme26q7r8vn5tvgn6s4ouwkupm28chvhxfc60622ixwehknx24qedg66741bddfiqsw4x72irsn2zqbfl6noay1g6b577lc6d667p5mz3uplr3tm0x6ksx62rcv',
                errorCode: '1hqsdyekeyeybngdru0kenn7vl0s64k9bmnpu22q1rfwxazgop',
                errorLabel: 891132,
                node: 7940216369,
                protocol: '5gikveyjg4d41v7qxbqt',
                qualityOfService: 'afb7mprncyl6kvebwkq9',
                receiverParty: 'z1m89ubvagv3ec20dpzal0majpl16a2z5jjvlrkvnyi9yv1swkcxqplpceoeb8uxlfuyshq0o6t4r0js14t24codrxi8j14p5b8e90pjn7vt5ddqx8dvcn04cyzsy9pob0g4tywr8z3f4mdfln5tj9i48gh8jvlj',
                receiverComponent: 'rokqzlad18ix4lkigskhtypkevzz6o6ikrjobfiuuxsifbszqvmd0ucjuf1lw9anrwzy9tgj7y0ihedot8s4tr8h9h4zecqxhhofm3jbgs2rma32ro5z9vpeowg4g8epbv8mycv13yw67ls4do933qkot1pgf89p',
                receiverInterface: '7h5ouek8st0ibzqxwdjz74ugrot1602hhqziiixdtwhc5lumeaijxlvadukh08yudxkhxm3hwl28q1fuvl2kxhjxf482fypfag4iesqd7oso153c6sm3xftt7vwbddd6hbnrm16mt7j1zc9318vu86nklbtltbid',
                receiverInterfaceNamespace: '07zknsoxhb8tl4xjcx9fb9gndyc0yp6hkw4gypveyk4kidniwhlralf7j2yuwzdnbf9h0en3x40hdjit08saoupdo5c6vwsqpwckittp51zig829k7p5unvktcm551iog97k4pl12dy1gj9tq9zww6btkz3mtdk7',
                retries: 4832714984,
                size: 6850763737,
                timesFailed: 5968790348,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: 'dokvi9m3nrcacguzrw2b3x9d9bmhegykfp5cd',
                tenantCode: '7rcmge50gbn5hsp8l7jxvqk09hwnr9ktvcdi9y6ewnp91udwcm',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '10xcxhl50tr8hlmypm6y',
                scenario: 'vcwk2vaf2h0j1857lgr8r7r3ez7p6qxzarmr98lqtp3kg3wpp8qsdyrkybzp',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:07:46',
                executionMonitoringStartAt: '2020-08-04 02:07:14',
                executionMonitoringEndAt: '2020-08-03 17:53:47',
                flowHash: 'k84oc832k2y95s2dxlysbqbm8fgv9j49g9c2uf27',
                flowParty: '8ftg3l5qpoaqcczitmy3c3peinwobp1iocdwyz2a1fovam2255btx8krtlayjoz83syjcsg5ccgyv1vmg7tzvxhcfcls8kb87ew4zd0pa7coizdx87xyowptxa5m23igrninlrv4yjom8mhs6ztso0kvzfi9pu2i',
                flowComponent: '6a8ti6ema8mat2pb8y65erb5whqyj4cfxvfcl1uky59d92l62mzsrl7gptye32nrrgl6lrjrh8g3tzna6wpthq9jrw3w4h38ws4h2mje66333ud69tys2t31m7rtclobs0mz6ys7gh0y2iv1fvop8p3219w7ifso',
                flowInterfaceName: 'ahezpdi2mu8tokhkyl82zkj9fhors7whyrm7weo915wisxglzxj1sbubxnri5m0v8eowlu8o3xmxql2e5rgfs9e6t399ab1gily48ue0gorjnnrk6vlq9zcbmjtxupb28ls5jsivxlgyvlyz2uxtjeoylnt3uwd9',
                flowInterfaceNamespace: 'ubolncso94g5ymmvdqlqts7np0afenav0x2v5e5ujlp2l7hrfggc3h20xelbhxoq26i3hxqwyvq892o5bxd7arlhncak089rd1il4kfllsv7xrdl8h3cyeygyi86ehyb943hwoayrb6fzes6s677deujg893ulk8',
                status: 'HOLDING',
                detail: 'Unde expedita sequi vel. Harum a soluta praesentium nam vel. Et deserunt autem ratione consequatur dolore. Ullam velit architecto. Eius et tempore ab.',
                example: 'zk9tuopeyypai9z2fg2nfcac0d0y9lf5zgen9nfwp0oro8up5mneblyheg3nmadw8yveoiwjavjyqd1c2qb1syluhkph8wzqy0r0vkc6hdtzt0b6k8emyi9ogpijw4soxi7j5ijnbd1go4ywaqfg3uobtx9cyryt',
                startTimeAt: '2020-08-04 03:26:40',
                direction: 'OUTBOUND',
                errorCategory: '0imqgwf527khqzgwj01nzirv8mqu4nwjapq1q0uvm2cjq3st1euzswfghs2qhgx9rvl0qe5mo0i4ky89e6um4jf0xxg3hoe7mnwbbzp4reewvxq4c92zt902h8jbln7gt2epeabwkg8gqieeq4173eppg1ewuvel',
                errorCode: 'z5ctxgf3fyw97hqap4lnrqd1gk4akxkk6fbl0nr6m88ned2gq3',
                errorLabel: 239101,
                node: 1278847681,
                protocol: 'nwz5rwe21tusv1hq1nl0',
                qualityOfService: 'n2fp5skzsxcmn3htj703',
                receiverParty: 'ixcneam76ivbe7csnk4wy9l6ou5kd94tms0rcit7j4wjmklv8mw2vs24b6vk5jxn472k2lperi8y24u3hi2xozdfy3k8y62jm7etc7ei2261l3p3wy61bd55ufu2rgzuyzzpwthqccnnpihls30e0kpxmnls85tn',
                receiverComponent: 'ueinp4h9jtr12dx4s7qx3xvwuk4joopmprd66fol5xrifu4vqiy0b858p7rxlphaf1n5vxq9uva7mqb15kxlxh7c0w65y4e0j6ogslslz7ztt4gxsfdlh4acwcl0n5vvs8vi1fv19593eehy7qdy4z8szpmzfieq',
                receiverInterface: '4vffv9rlss0hzskz5slx4qpns0ydnqpl8w8c719ry4oy4d5pt4u04n81r8n5mo3ml59w0rgooceohulwbrfsyjmhxub7r04sezhlkdjxt89zt2bxxxa8zs8cs7sga97i48dzhhwsurexmgkeo1zkn88ylyevjz1q',
                receiverInterfaceNamespace: 'b8rwxcr0b0f6c62fzzk8o4qanr5ozv0j8bjdpxqjuwp6kpccbtk2aofn53yvr8yppcywtk1ibnjz6ohc3e1i1uh12yoea3hm975n7redsrg1q5gqmktrlvtmisc2nqjchy1krqgbt2m12dwkqyi7d542h0t0itdn',
                retries: 5831509941,
                size: 5921010278,
                timesFailed: 8805206627,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'scl0hwst6wjd9iz3yscowenjmglv5j52h2vtimltdveucchfo2',
                systemId: 'vbve77xh9k86mvzjj855z3h5gs3i39wv16sd4',
                systemName: '6z1neo5wrbupapsh58hw',
                scenario: '8ns7wezrp0e2b6rk9di9ecdgufbfijkz1imqb6cvypxrw2vl8rnfgbp7gbhm',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:49:29',
                executionMonitoringStartAt: '2020-08-03 15:28:32',
                executionMonitoringEndAt: '2020-08-04 00:09:08',
                flowHash: 'nqz6kln3lhjydw838p7n18891w0vvwl9rhx603ig',
                flowParty: 'vcg97sjp4xl0qydnpri4xi7w7kbey66jdr1ip0ro6hzr3ndjx6dy39jvmq208y8m6xmohh58gun5l7sgewencxacjcdodpyp0oyr8iypcwcvju16w3ezrovvfkmwsa7b4wmbrsq8xyh598crtjoi47r2c66h90v9',
                flowComponent: 'aw7k5g2dqzwfrchppzvin3twuoblrqla08emcnjx2le71914hyrmxe8xpvxwg38hmmd4iuutoayltksz9bjqmxlvl55vm7mfe329ss5fnpj4mt7a7dwg60eg26ahog49zrmfmmrrzfquuft1lfj3gd7gvj5d95u3',
                flowInterfaceName: '13go97f2deresgo11u0a92r9z34xqdi2zt2r54st9okqrbga36hqfnvfn78bnehgjhsgry4y57eimrilc95tylbiwxf9y87yej0pzt31xauzx8h60bwq9j1fxli1awghhdzctbgz0cwdekiz5celspzxq9o8d2sp',
                flowInterfaceNamespace: 'y3pogv3gkxhbmq2g5gg0znp3qdfpoe94oaneb2j2wzpqlo920gy1jm5iqcqgb1klpezfgnc5qypgwtfg4ikmj7mkxwa75waqgz3xex6f93io1ordyphizs6nv5xnule1bunepn63487bt4pjkwc855mwdrp9htzf',
                status: 'ERROR',
                detail: 'Laudantium eos tenetur reiciendis molestias omnis occaecati. Earum doloribus suscipit deleniti ex. Quia odit earum ipsam quos nemo cumque.',
                example: 'hkm4azzxf6710yg4nxxs389klvo5jnkr6g7w504teq56ed06sqtqgznweahbz911am2kmozo1suoy078x9kyh94bnrqzccldo40aq22wkj47ywivyaurlulmd9qw59z1od7luw36w0knu27qb191i0lvs2ax7rst',
                startTimeAt: '2020-08-04 03:40:57',
                direction: 'OUTBOUND',
                errorCategory: 'ep1qqbfxkblch9k03o1yrq4ybixa1sv19rnn12lnoar8234xsch3k5klh7hb4pmfum41l0dox615gfysxquydswyouru9dncnpochdpi4gk3k40s0qguzfutxm4d89982j4oc504prm42hdgbduc7wwaarmyzyrj',
                errorCode: 'vd58a1sizsv7fabk78yfqlfcie597x9im3ykeo51rpmmp17d2u',
                errorLabel: 458239,
                node: 4389273537,
                protocol: '1aal0sf0kky4nglkw2cy',
                qualityOfService: 'ch477k18v5ydsknnqnc5',
                receiverParty: 'qv78gxetyz5hx2ngr9ya1m6aac18cy6amu3u7rnxqqyk2xylwpdyygso9gf1zafibmfh35yraa5votgetb69pcogmb0btczc8nyou06vq7zezh1d4y43kk6gtobvw160wkte4bxshq5y8kh4m8ihe7nn4lzp6k7j',
                receiverComponent: 'hyt5ppcxws97d22dhb5wthrbbxte8xgsiw5xmtv9s8pdfid3u7fbd3difn70oe4egw8mz2bm81h66mai9brjehduswweyikovwlrq90gv8kfpqpc1nm0helftt6kxxshc6s1vcvfwfsmaon528lp5wwf8v6jt3mx',
                receiverInterface: 'iqqnjue8i9955v0wdv0ngwgx98hbgoi6n8eg2cat3kckbnrh92yjd64a3eep75evqlsnll71vd2csn0boffr8kbepfay1b6hteh3ldj7pco88ecp10sv2jebe7petx5ipui0xhvdq4jvmt0z11t4pl7r8szdyvkv',
                receiverInterfaceNamespace: '0bqv32nia05abz4cbrhobpj9za58z7qas8t9yd125h055gjhcyrr9xix8mlmo37p97tp0m99kzz9hiazi6nqrkzy55h1g9zlm8h9p7evvga5q8r5gamgvdj1114nxbda1rihhvx4an561o5l0msrx5gz8umyeusj',
                retries: 2725307565,
                size: 1840512333,
                timesFailed: 9224014196,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'h7wemq0quzz5dw87a26buaz0f3ax4oc681nf2tsounbrqs8cq2',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'sok48bsmytp3jwarv7ml',
                scenario: '0x6rmqbp3gsqu7hkvb9wmxnm4p2djvtykxnslcnfyry4o7afamp2vxu3a3yo',
                executionId: '4g20qu9mze8nksmorkedxssxtxsjet5hba7fb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:03:30',
                executionMonitoringStartAt: '2020-08-03 19:14:11',
                executionMonitoringEndAt: '2020-08-03 15:25:39',
                flowHash: 'enjvy8d2hehydbi6dyb2jwl058l9lesz6d66fg5m',
                flowParty: 'e9dnr1fv94gzzy96zj01r042e3eqycfc86hz785edvq6vj6ti7035wucj61076sfq4llo2ine7anrrybpxkb7v6veu2ix1qknx25ho8sk3b054ddlnnl8sux5ejyf69eqtdkfmj9hz4qjv2crfq7x68lh605x7r7',
                flowComponent: 'njcap7pi2kkjtpty7mqejcg5x2ys3757amc23mwnxvu4gmg4r326d7hzurt90l7io00xx0ks1vg4qgro9rxx6m5f5mzttz1t5dcm9hh5nn8vj45outqdazq1bkivtchzb8lpsshbv90tw0oogpnkxqra27au11gm',
                flowInterfaceName: 'b1nntxqa7xxj9q6rl0bsh2j05so5rnpu5y1k4zsnt983z22jdjh552awlj22syqcqld49ggv6y7p3t8gipd2css4mefanhu7u31gywsldhpz04zst98wdvy0kn5bo0prwu7ybtoem4mz3k2fvpxza0wbmt1ezyhx',
                flowInterfaceNamespace: 'n0msc3roudm8iyjwnunw3c8f6xpbr67t9fhww363fz5701m4s99ywrl0q4shrmkn4ysn6vpsjub33hktt77a2razo85303vetpvf97whoy7abv3fkmvbxhyah35dlzmem130yedl68biril8uvkz9p268mv6fu3z',
                status: 'SUCCESS',
                detail: 'Quam minima mollitia optio et consectetur aut. Voluptatem ratione quis iusto. Aut voluptas consectetur nihil.',
                example: '9ts64t9o9jwjam8vdi7euhqjyb5shnktiu2spgubqnvy1uajmhue12fyvknwu3y8mempjf7agshadjkl97r184c1k262ej16z48xxaikqxx8ctme5f9ts7pdg847eaq2dy68wjni60v99084ci90ubpunvwmhek9',
                startTimeAt: '2020-08-04 08:17:58',
                direction: 'INBOUND',
                errorCategory: 'nts3pdifr61crku8nxol5426j3euwy7x0ylhad38dvl9uzrrgbel8gidcc4dqrlpuoen6jd5ex8hfd3dvw1hj2lpqllej0kelavmiuhy04filwppgt40qz8gn35rsagpi6on0jackjt2i8jetij9yi1egv6thmhj',
                errorCode: 's2hgkxir4mkxe6quck9bolv6d2whgenz8waa91gmcamaafz3y6',
                errorLabel: 409848,
                node: 4111575160,
                protocol: 'ijxr33fekjvi9kv93b1l',
                qualityOfService: 'i4qyxx5vfji82loysoqx',
                receiverParty: 'igicljjshkty55cm2cdjkr4ma091egmy5s6muo7v61t0vbgueobvukahadabxzi6lnwyimwsvdngwoo6qzdwto00faugxefxheill1fztwjtpzk8mjdk1i4divwoo3aglgzs5c7nv5m8hnnzuurh2om8famffy2b',
                receiverComponent: '82bk344n0nqjozg0y7ksylnl8tlqndwru2oj6ayfikzkblowux1r543s2t1335ztdhhvvg8mczqt7gzzexv8hzwiy53w8j6r9gccmcka0y1l7hcfs5l9t2r4om6lju1ienmck5kmirez9522adduadsw220lpqdj',
                receiverInterface: 'mu7ctvwjzbpwyrqcawaovmqw2pf6br93cegbuacgnk0ccci5qahri2lfv1l6qeko9atejjchpc17fm0xklzqyhlauehv35i3jhzq6bxxd97e6mcyif63y2evf84dn57hkzywyewiw79vkgg7i1w913jw7bv7s9ia',
                receiverInterfaceNamespace: 'witmf7ctepuglamw7b7h2y31asntklmaisns4iru5jssac3jkj7tfnadye3jrw2h6zh8z7f7bvifvtgu1iebu16t6eyltan8pijp9wilpbet31k6ri4p6v3losql9wb3o2dlzruvujm309wre5a3awu9o78a6nx4',
                retries: 8530399268,
                size: 8366517942,
                timesFailed: 3135375508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'emgn6ch8mas05ndmuksir35z1ffxmgn1c317upu6ewmn49qai2',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'zo9who6ujuzumbzwx2h2',
                scenario: 'vv4v5iowqpajgyaal5il8d21unbde5ld4zirdvhq1v8r6qme4gsw5ev8h88y',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:42:48',
                executionMonitoringStartAt: '2020-08-04 05:49:24',
                executionMonitoringEndAt: '2020-08-03 15:41:38',
                flowHash: 'yg2iaeic21i9b3pkjtqooo3hejx4hhb8baolnrt7e',
                flowParty: 'ul9oa20ivzjfcxs9237tq6raakd0wasjh8hsjakoryd4sz7uctylxcpx13mpf3mn73tcteeamyb9wfuke1dlrafgqltgia0k1m6nbxnu77lzkxebog1itx9koexpfmli7setpstwpgd78udnm19jen9mscmoz086',
                flowComponent: '3ouv9za2d1vbju54v1q16vd182ul0qw9albau8d3ye65quwgt9ufs65pk82ew5h50uank68xnripja11qbaof9098rqveiojub9uvtmfipcgos6pqto5nu6rb0a3zfmpkfh3y57h09vy8ckksyjdjne7gvelsl5z',
                flowInterfaceName: 'vtvpcr0y6qtr54xqjlvodxvrnt8qz5hnpcgnkat5lqb0ogkihdnerqhldy77v14kt8gyvvg68ukwhra1df9k18bj6rvzkz8329nte569bdtb5wknfnqoj971h04pza8qp8zavx546kag6kesl5h5sevk2mewolmj',
                flowInterfaceNamespace: '6l5vdyboe9co18f12g6cs1u6ir5jxvnpb1f7ek5t8rsjqed1fygo0lfkqmueygsfvqf5z1duqor1a0cbou6j3re5cyy3qdlnyamimsr5huc5nv9li6yq2bqinl4rbqo3d81nnj5x5ab32yw4meauo1qjri8girbn',
                status: 'SUCCESS',
                detail: 'Repudiandae laboriosam ut. Aspernatur dolorem alias deserunt. Nemo et ea cumque ut accusamus. Et similique laudantium modi distinctio qui eaque expedita aut aut. In sit vitae harum et numquam a. Maxime quia sit quaerat consequatur ad doloribus atque tempore.',
                example: 'x6brkblpqthcmjagtpfbb9cpgjbzgy7zi154xf4aaxeqgxdrhdvdz1ede30vl6n1iujvj2pvgvkcko7xpdwceyrgym4jibvif8j8tt0j6j2vhjrlxsk1w37egnd9a8lp7tb8l2x93rfmfhy82m3p2q9nn2siyaui',
                startTimeAt: '2020-08-04 05:06:37',
                direction: 'OUTBOUND',
                errorCategory: 'hs88ey87e6pxr70h6mgjvlf76du4yjw8hq627qt41j5a2blmw2svii3iqnzfcwimz5a4a2r5cxtf1cwiccxhasgiz3u2ls4xoh6co51igmcaaqt0nb6z26knzcjospgdq3o7z6gxn3bc0c2l1hp6tuvy0r8j3o6x',
                errorCode: 'hebsqyg4zuliev4yf2jfizhupt973ms86ug4cpu2fjmcgxwv01',
                errorLabel: 454455,
                node: 5792055107,
                protocol: 'awy53fwnxb5utjyf5ajp',
                qualityOfService: 'b2qb2cyeygu16hwnneg2',
                receiverParty: '1lxdvuqu4as2a092wjhuly467ik2bnjb6gu05w1oti8kwhcpgq44m5dobxbli357xcbybfco38146u5izlkl2eeqld579rt9x39hs9rwonjybt50qdgt5j4dknlg523i2juqdsdca6rvsvenfyxpqdw4xmzt34uf',
                receiverComponent: 'ov4p2issy2puq2l8ugc6kyt12m83upteezirgwm8avt15f8wtlkkv8gu0sedz3kjc6me6jrw485jxzcqslfe8ce2ul2lcrx7ua48e5scw22qpca34x5vcua8pl81vssmjwatsw01xga1atits5ib3npm616qvbu0',
                receiverInterface: '3zubp35ppci8jw6qtbyq8fxgcumtrehgp489nue2wcu1g5y8rf3b888jdezo698dmzikchfmw4jdmsyza6uum7solpkn7gdtbvnl8h9qcorj5rp7grsjjie8i23380qaczhvtyxp9wqetkvlqre7bapa27lclv8b',
                receiverInterfaceNamespace: 'q3g0w72d0pbaj2qqb02pzr1dwosqk80is5kj10vjakodrkxf8fow3p8vq16fdox55qm7l77l6uu8ruj14j4dycs0bswprexmz4uc3l56z1yvo7p7cqc305i6q3wgb18leyb4ovhr539szqtxfdhkd70bd6h6fa7f',
                retries: 9888840743,
                size: 3003703795,
                timesFailed: 6199713598,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'd5clo4ltwzqso8g2kowytg61b8w86l3ku4qcpo34pha4uy6kop8',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'u1wy1br34zic7m26aqkk',
                scenario: '1i562p6y065j2zpjkev242uye24iuy0ms0p5eq0p60vxes31opb9hqm0otub',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 04:52:51',
                executionMonitoringStartAt: '2020-08-04 08:31:55',
                executionMonitoringEndAt: '2020-08-04 00:49:54',
                flowHash: 'ql9ft7zn3oclye2cfrwvmp34vcnwtzk41kbshw1y',
                flowParty: '5sd03ypwddfyzw8n33blq4t2bee8wcq6gecu20mrkjxafzsblj6jp0toepob3xrtqf3364h3o319hs4902fuf805u76atasqu13cjn2yxg3fbuw2pl6s9r3bq0ejc7t4dax60cbmncyp34xi4jak3fdwhi47hml5',
                flowComponent: '7wlvwhrv4h72q3wzntqxf9ijr73hc4a12hgyaj1sfrl9lidkykrk2wq7qy5gokh7xl4jc28rbdgkazpqsu7rx05jp8tae40yc5yzp4caqhu9xbmqvi1q7kd1hg6egh28fhbbpuhszt0tc0c41fm17f4ev2l0d77r',
                flowInterfaceName: 's384i04knr9wdnhqhp6yqygs0z76kjvscdwyzfno7i99zmjf4pjknyd5le1scy3no0t007g6ch5z2ind5x4v79gw8mk7dsphtxodnz9zom2pjyfs5f3mtd76icm3ocelz55noks3ba0edxqaf9z9hxxylx6mgbe8',
                flowInterfaceNamespace: '6ezawdszzsrg7y7bql2zgwv1c2z8e6e7ql96pzksklfgpo02eoabucd2y9awiy9pg2jw6gq8lgo2gsj6qb09ivki95s1s45ajbh2uk1897z3p47i5noye2ufr7icx8tmp3oyoxyb3i19cx4bmxlaxowkzd6m722l',
                status: 'TO_BE_DELIVERED',
                detail: 'Doloribus numquam beatae quia id nihil inventore rerum non. Reiciendis sed in ratione ullam porro quia aut eum. Molestias distinctio nulla vero. Ea culpa dignissimos. Omnis eos quo aperiam assumenda fugit at.',
                example: 'ynslpve4azru2w5kpd8zg2a5pvcsygf1488tze1wmt1fzee1cwlgy0crbry99cuah0fpuz9u2p2jixtsh04exo46z9eijnisds6j04u0te04rox78h83mmhgxe9eoxl9fj3x2rtdbryplwnoql9nrxd2crtyqfmj',
                startTimeAt: '2020-08-04 06:03:46',
                direction: 'INBOUND',
                errorCategory: 'zh61hw1s7qib29aymuox9qhgp6omr7wvjf2z6utl7tauj86rxa7dxd76dfy3qdgi5h90p7984urrtyeml6euwc3560jjcl2febjpjso0v9e2ed6zzmdhxps87qmwwp4rscx953jazypjuln90tyserbjghxzynrp',
                errorCode: '4shoebpg8p4y8hl32vjhx7v74ps887qrexfsc2pxijpbvjd8gg',
                errorLabel: 957051,
                node: 5969829496,
                protocol: 'dvpmemn0nyi6q4n7v73k',
                qualityOfService: '0y9o75jzyyga2co55kv9',
                receiverParty: 'e8sfgbs3n73ki1jhwh1grg8a5qc6cstqc6l3ljo7mhm89akxk28yvnpfbsvcwo6o777gfxc5gy43ub9pwr0t505656714n2hcqpv5crm6fd84nt1aehcv0hriuyurqmw8p1at6sli098x46q6s981ayv20xvmczt',
                receiverComponent: 'cijsdlg8wm7gtmbg3cj48hv9pbxldnkg3j7ckdcn2mpoznq05v5iuddym14kwfb5ywgta2unrt5aynkt6kf9zcy0vvavzeolmlat7jsgj2wf9ls3k65jie17j5611047qrehp6mflbpzj4hixqqjh4h7ccvgac1k',
                receiverInterface: 'nqdm1euoi8tz0gpoozy6isx5vmu2ox0d5p828ye7e0ygjdyfrmlzdowtus0i6qftsm4dfvkzq9iuvvch0o7wvsntlb8ba948tm09uv28bnhdxwd04v73le67x50rncwn5avnh8k3ka3r3wimj2vn4exixl6ewhjt',
                receiverInterfaceNamespace: 'e340l1xv5k7rnlhf1fnswm87nzr9zarqxgq2kiec6voikape7crkokb75mtaiiuk62obz784dx1gvjfl6ztkwph3yyf58dwtdithwqhfeoeoq2mrjiy6j92pdhkdrdvgo5fxspo5io91q97hof4bqqqrcen6walo',
                retries: 3395767577,
                size: 5734380341,
                timesFailed: 4345464175,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'm68g0dm9lllp3yjhxzyss6jm94938483ecgfy26y74iouxr599',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '6duo3kqolla65hyd12isx',
                scenario: 'yhtpdhd8v5whyku8n2gbiljqbu1digfyhjmzfumei427n0ygnp3o1yvr2nii',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 08:15:04',
                executionMonitoringStartAt: '2020-08-03 18:58:46',
                executionMonitoringEndAt: '2020-08-04 10:10:31',
                flowHash: 'v15dd4lld8b5usk9xb0x868h54bk50vgay0cd5fg',
                flowParty: 'm2kwc13dr6y80eda8t6e7scnw5pa7npvguz3jusw9euwfi1e7cy1srequ5c4witiz0t3h1rkkt4r8t9s46zqi23sjaovsj07g2xc5tjdmejjr1tas6x6z5x0qf7pbthspy79m2pamt9vp6jji7dx3unzywxqea7t',
                flowComponent: 'ipajws45vpy2qitsmd7x6fmqvktv9w9uccck91gkta48qvfyjght0gdxo79g7yjqmnjg2zrpcoqcvykumjvn601j2c6psgfu48bakynzoscams4j38yf09iqe8yjas1bjxpz819nleb5k18jbrtwcqcmmt0yw6yy',
                flowInterfaceName: 'pankcj1ltcnmn2fd6bku0s6t3p6vgnly5fat0szn6dczumokhgjdgykrqvjfnbdhv6rdyun1pwrmawpfyifokv6821tmrarovr3vudy7hangq3xcnyqx197ongymstlabtqzjxykpg31me9pb4o5f5j5e1rpwego',
                flowInterfaceNamespace: 'i4l2nto0jqps1npmohcalp4fs25mb3yvlgruvcbz5mdpzkb1tzjwxz629g3e1r1699wtkw866z39o802s98pfzs2c9sx6pm09isu5d50lzuz0y775ksrorzttuhvk3grggbf07ydut9ul8oli2w23exjd7cc968e',
                status: 'TO_BE_DELIVERED',
                detail: 'Quam quo quo et. Esse fugit qui ullam. Illo placeat error odit laboriosam. Amet fugit pariatur exercitationem architecto est ut error. Eligendi in consequatur vero neque molestiae dolore enim nihil rerum. Rerum natus autem.',
                example: 'we4td0f0hl0i9mvxuxcbd2ptkdqk3pnjupoqgzpd3vaaeur4a76ee2yi15y6qxcd4vinax83y5w64hh6echreen8iubyvrbaz63fs7dqsanoyoaxqim14o083dtjl1hz6z15rjuyytzh09kf2yazggzj2exj11eu',
                startTimeAt: '2020-08-04 13:27:39',
                direction: 'INBOUND',
                errorCategory: 'f3t4m05wwoa80956pz7g68hvk4a0wce11rlgrlz3mrh9gpiwgktm9jp9vmfo44zveu11b5l3fangs8auulpd4ihhy0csgw52b5ctqalihyvdizzxl778m3zzplah45j1d2yjnvomp56da9u6rd4skwf51rt9waek',
                errorCode: 'k5cnvpfe3uy13csfmhvx4eemudocf6ab8boecot6hgdx5sfqi7',
                errorLabel: 313707,
                node: 6671646009,
                protocol: '3ei2bea1ogdd1vtrrj4p',
                qualityOfService: 'nuvx0fmgyp5ls8lckro2',
                receiverParty: 'm85wb8tixtcslq9mmfo45waur87g89c2xyqbmd0hg1hfdginb5l7nuug9wzjvg7p7v7w0tla35i4q049bmmsjamiduo2dmu1rnhrkco3tqcjteer7xujeofuar9zwowrn1fvuuvx7c23ww2zys43xuntem3s1tqy',
                receiverComponent: '4qpjbbb9gxv3y6mki0nv1zj905er2j9yu6nmq2zfrfd5slsgs8bevqn658akozzak72plgim6nra1i5bi2cjpjxdis1vqzgcfs9p27zdn55ir1kc5gfqgk9lnmq3hrjmggeoqepb0tukucpydtwc3mg3civpzkk3',
                receiverInterface: 'bkdqq973nezyob9vapq966touumwlpsoqq9c5wqzvrb9r8885let4yfyrzzd90aqrjeeks87p8mj44s0g7whqxewelb8w0gi84fz0drhsg224tgjor7j28x9dkcv6fi2pspfla6oxaarqlrls2xk95f9djaq5c8i',
                receiverInterfaceNamespace: 'yrqegqj4pkkc87pnocqtn6vh2877by0jatq05ou2anmfxfyk66df5m9bvrdg4mexasrdm16bm0pvgz49tfl44bjk5013hpka9r9gvxd9k5xjb3bpocf0fzyr6djjuy8yfezj62ze9y84sdfl02mcquf09rpwqa1l',
                retries: 7003448122,
                size: 9645428055,
                timesFailed: 9216618707,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '3m7gwd6mccflz9rzc9fmdy59de2etj97r3dgurw1ixgyhuznol',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'eafy3wfmh3ldrbcd37l1',
                scenario: 'aw6z8gfcg98iwlzckbfrf2vtutj2xq2vzb07a8imgzl96g8ubzsn7fcfm07no',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:29:04',
                executionMonitoringStartAt: '2020-08-03 16:40:32',
                executionMonitoringEndAt: '2020-08-03 15:00:36',
                flowHash: '3pp24idr9bine5u3hyse6yc6w9wzvesvk5q3yjax',
                flowParty: '32ouegs105xzuvhv0c3ocx404or8w6upbjlq79z3ygwm3e7tdpj56c6tz66j8xcobn5m0vsc9ab1a1kv4wgr88pr14yeotskzedndvh8sat0xl45xom9tibbcatuz5beufh2qq2iygbkyp6cm3bri01jbgmtmowo',
                flowComponent: 'ixejq4482hx43q13cpse3jjy6wbdqu2i9zw3tbhwi6sxgyyl4ke0rain3s01q0ysiwb9x5qsgbme0p9yw6a3l2a8log57ghei6xw6mw4tgzht5ap5nej5b5jj51bp1no4iueextmdxvv9mpu6ihk3cvo8zwcce4t',
                flowInterfaceName: '06pcuouqzn9xs8qamqx5r2nfxdjrbj7sv5jkgjyagvfcce6cc9dj5axcewpjoan2mw2yaoxnhckmywj61wqyz25tm9rpjbqr7ueg0kfnewhfnrwywl6kc7mk8cmg2doe6lydu41k0o9578kuzpwl6p34sj8bj0a5',
                flowInterfaceNamespace: '3svbxbds12nasizf96lvzmy0hfefuwbtcv2emh977d8j75suir7y8v73o3yrtl5ftg5izt21sp1pn4t6vc7bm2c0j7xpbe95yoode7dcnk76mbastux2scvwqiaxkzne2javwbed3n1opxtwuakszg91a5i91x4e',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolor voluptatem odit. Molestiae et accusantium. Tenetur non recusandae. Ut odio aut.',
                example: 'zpdpj4wfgv4i8a76wivuvzz0z8pu0409zylsxgsy16if6zgjc9v5b8r85kfxk1l4djfdtg922yoayj198qjc9lzkkga3sznazffynx4ptzvl5bapk9umtha6ktxg77mdsdb5n414tlqw1v2fupr3l26etdmgdv4g',
                startTimeAt: '2020-08-04 13:32:43',
                direction: 'INBOUND',
                errorCategory: 'w584i5krf27pxpl3epj85zmlnv3adho89bqm7xznnmv1h47qpn4699z8m2x5uw92wf9xrncikaw9z241429mi6qvkv0g5rk6m13r3agrhgl77ywaegeoar6qnedoky9olu7zf6qjuz0c2h2ckyqntdjcshv7xnxs',
                errorCode: 'wqjyogl0ei0gr809u8znl3wk1ele849ssuatsxhu0sx008lc41',
                errorLabel: 930498,
                node: 9268348340,
                protocol: 'o8ejx6eqk0g91nlga7es',
                qualityOfService: '8wu6grf70ctzhe8ds84x',
                receiverParty: 'n5ygib9q9x25npq0bydhest4a5736ht97ckx29gfwi73xiud8p1lx9ua9abe8463iwag01kwuvveeugc15sw6l0zvpyd8i5bxvkn04fi9vu539jkl7992zvhthrltuvrt8xqn2nsvkch4gyxu88wpq184wk4ik7u',
                receiverComponent: '77n35c3015ewqbhlxbno56k1k1v4goa054bcnmx0cmqczii2ju8lhqnwmuaxr0p8op8wx9q3rroxl39pnj526326ar9fim11xvxum79s67bvr3568wjchhxgyzh9m1y3ky1meyy3s5duy3pxhzybdvjkycv3s0bw',
                receiverInterface: '8j73ekmbls9wne1g77owlddmnijdbefg27pc4mtgbfg3oovrb6adyfivverb333591swthb2gydnsb72ohhsqddq7gadukg3xbwqxpvjpql2pnse8a7gijah1rw9yyy8oyezyhazqj538n1m6e1eotfkj3tsuz8o',
                receiverInterfaceNamespace: 'cmvujlq4fjben4259gkpqde87byibmogi64jhxvne7osaj4tomfj56cfulu3ulrnunkp4j8bc8p5duydbzaql5chxw3o5t3ogq7095fpk1lp1y3fp3nk2ozsgztkr42mk4vomul9pcqgxw2b2l7drdpbc50tr0p9',
                retries: 5101175316,
                size: 1100077096,
                timesFailed: 5629821019,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '9kd713ri55yj8gkzyz0omqaqca1mgd66k7lt1ffzji5xh42rbo',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '1y2g257clv47pe2su9j6',
                scenario: '5khow7n02wgh52h2jfozwka5plu163jgv31p19om9lo6d3e350trqv7r5bok',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:19:56',
                executionMonitoringStartAt: '2020-08-03 21:56:53',
                executionMonitoringEndAt: '2020-08-03 18:59:17',
                flowHash: 'omasek9uounz600pt5n2j50ucutc47fd4otl32d9',
                flowParty: '3r3n83g2igaorjferthbnr9yvnygs1nyx967t1yuy4p4lisgs9zqttftu0etyfczeifo9i4kofwnsz6w4w31qre49hflrz2xvffvise4ngvmp3h0rlinhpgpq46d4glcwyiwxqo155ey83e00mbge9vc5omv5fpjn',
                flowComponent: '59j6ojce1sytgranwphyicbfbkp8f7fmw5z6g2ppm3vruzt6h7p0bikh2c2cx0wr6vi479gum9lcwyl3w0s30ikt5dh74ckktqajtzdizc1mfwv7k91844906lb7y8jxdqt4np2fqs6jmg6ma1pl69fekzexlf70',
                flowInterfaceName: '5kuynr3kloqxj8pvohm4glki7du315ce7qatoen0q97thb1ezd99prvx806eawmt3a21jlbq2mc14wsxvr3g6nj7j5i8wyurzls3lal6i9qsash4a6qpfmn0x1focyz7huupo0cz1hn90wh4235b4o46y0v7owht',
                flowInterfaceNamespace: '4nudwzvj6hbxjn0bs5a6g4q6urqi0h7x49yimwiqbpdfdwmm0kak1dllcom6zri7ntyjz9l5c81p09o71rzg38gyqmri7jh1bi3fap5zocdbqaanar2mfrieudq2z3i1ubzrqnbjprchv3m4x6ywq80hbaqw22if',
                status: 'CANCELLED',
                detail: 'Temporibus magni nam aperiam. Veritatis eveniet corrupti assumenda omnis ipsum tempore quo enim. Aliquid repudiandae ut assumenda in. Beatae esse omnis non expedita sit sit rem.',
                example: 'msdj5erogsit31w7f42vg11ti3hfj980tmlf9uemhak386ykv84reraij58ui5ftlgybgmch0kr1kilp5hcvibc8ek9iwo5kjg113in3wq0813f9h5l85zs3cnkieehjh8vx5e2n4x3rdnnlo3a4njjaekfk22en',
                startTimeAt: '2020-08-04 03:51:29',
                direction: 'OUTBOUND',
                errorCategory: 'ksf9dxor7dgn7r0hzrzghubxftejodvfowgoyw7wqwgurb2tyymox6hoets5pp748o1n1k9vczlxghijnrd5ho7du6s82ee8uiry1fsqe78ksbz7ituh525vacresh6miygdqxyymoy7pbssjy373hg8bskksdlv',
                errorCode: '219tpn8l6uznu7vbcibs9k9ryrp6iocpbifzs31m1b9t3x6vnt',
                errorLabel: 356876,
                node: 5745200794,
                protocol: 'im4zcwca3pqrtwmfg0h0',
                qualityOfService: 'daaqmiufrnotq4fpsg9b',
                receiverParty: 'm0njrhneqremk6tby56v44591agzaucwv0y3aa1ih42db6u2y3i31owr18k9vi3i7rlws08qvy2ngq5rub9cxd8c3zh3hwlniy2vy150gbyuk0b3f7lx1qbf3733z7gk6ihwsa83b49bx75xsva5fjxxjd5e21vk',
                receiverComponent: 'tfrc256q689wp7wau652fkq18q0qnrsdntz8jxmks97o4342s67luik3ij7npk02e77arq4grmr7ca4as9i0aa7r1i0g6bm72rjmumexxznt88sl8v3o6gcsd990sfti00qbb04k6uehyns3ogyc7uvck1hq9tso',
                receiverInterface: 'xo6j0h4fdlyx9x1widyego6pqkh6x6q4lmqrets4y72fujk8tdmgputuxwq03b6yjep9kmcbouqce1zgp96gpevsl91ammd58qltxpfsxdprj4nqabj9hnytgfzcbc4vygeaw3p67nnhwsif9ibwq845av2al09n',
                receiverInterfaceNamespace: 'z19mp15dy2o6ryl07f57wp4zq85tm9dx4rv5rp6nvowyb6hl7qsov8372kaz76m43alzk2h5xt9a6ug46r5aw5ggrq5qw57hvh8ozd2dk6ysipc41302wxes15ezon2jlu1a1jhpe5zd4kgqru37r9w6v3ephrqd',
                retries: 5104871699,
                size: 4443475269,
                timesFailed: 6028904369,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'vjvk8i914esmdccedd8lmn8x4igu96p8qnyh02pebdscjbxvqj',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'vltuhf5ei70rg3ewg1rb',
                scenario: 'cuqzw21n7iz44fkjh2ptp1ggfcdqvxkhvrcd5nuufmbqqjb01spnkxdcxl64',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:24:27',
                executionMonitoringStartAt: '2020-08-03 22:35:45',
                executionMonitoringEndAt: '2020-08-03 19:23:06',
                flowHash: 'skpivvpp43b96u5nitzr7hyse4rvvb0o6ccecfua',
                flowParty: 'm0l7cv1y3445g2b9e997fr5er007lokzpa18ju1p6bc4pup6vb8xanknu1n09am3a3g61y1rdoy6561e84y6l9rq34qbmr1gwv8zokf23m4ruq6gm2yl903dtne0acg2geqiit8oly1xylk4uu0fz8l6aowe3zhe',
                flowComponent: '0xejtqt0ogr8w2zbecrxnzor9zbk5x63vutekmfpn5yn5xcg7n5fgl2aqqwf6f6v9jd63wiq65gsrdhou4trlama72yo26gz0g5a5cqpz85ptrqv398xb2s1v5b8c6szoxavaqtbbkrhvrygl2xnsu0dav3snwqpq',
                flowInterfaceName: 'o3zlspgnxog87ocpy9bkb7nmvx8oqqr68a8r5c1hex3z9gx7zksamzxmvno0cxefjlc6i2z37jc8exi9o4yi7tbv77brgxiinqdqz8b7soe19ct2qsmzxe2z2s1rll0xnxnkrg0uhr2k1ucm939815d71slcjpbu',
                flowInterfaceNamespace: 'o0iodbt9vsiq6ca2p2k9a2w464fxs27blfqivtmwtco0akfdc5twiphn3ds3topn0vbzhygr1y7f6h41nyxsc0vk3ry7mdwl5tnbnzu1sa9m0y0wm5u2legt08fhz41902tx6lrvs2x4kifvwrfmpa9r6a7ikj8d',
                status: 'WAITING',
                detail: 'Ex quaerat aut voluptatem iure. Est et eligendi nihil. Magni et qui est omnis nesciunt qui et exercitationem. Dolores qui aliquid autem unde at est numquam. Dolor similique et rem et magni facilis repudiandae. Adipisci veritatis eum in fuga ad voluptas.',
                example: 'ow55v8n7gb4qghrly0u8dw3beqlmx87jc0ocyxe3g173dbwy34epuithtclap7putodo6ijftubxdq4lemqqoghsgtbqn8eidh9sqzj8nmqx3ym3qsua222js12383ne3kb0w6tn6l50srm0kk9ceuxasmqm37ly',
                startTimeAt: '2020-08-04 04:50:43',
                direction: 'OUTBOUND',
                errorCategory: 'zvr03jrcjj3ugx91a7ep56a8u93d91h9lmw8dwtlnlfnk5d5rdi9f5czt8vx8p021b1x4fuozforkwk2fq2dph1qf8bmwmslzh4rwk6j39jeivi1fkaex7eg6s0jy0ngeqjtreq0ntlcdhlvvo7jsrkzkaz0t2gc',
                errorCode: '7chocbyn9muqba56wseu1t9tkltsp81f9cc4a12kcc2k91znj6',
                errorLabel: 912679,
                node: 8395780736,
                protocol: 'h21jg7690e7nrwwkjazy',
                qualityOfService: 'b33azo8xpr6g6n5qrrf8',
                receiverParty: '398z1rokpf3k9oh0n6yiijb5x4fdocpicmpygke62e4jj21kjbfllexvnyzw223kiqy8os0hp462ffuwq00nu2uj1hpt9roesx6wa7vkqkq1wpx02n02g7kj3o33hzksuptn4la8dqjuxgbbj1o21hp9kbf2hixf',
                receiverComponent: 'dz18bh08tef7vup39d91tagjqid7cydoys9yxms9vb9u14bswrdohchev6zjmdonc4w442m3ue7skqo0jz7geh2bteylcwu1vcejanwsygn34vc5ej36lv8i4ubn8v4lupkw10vt24b7prs5idr5xs7zu4fcd685',
                receiverInterface: 'mbpgi3sqrd0f6cida5eegu89sf5x6yj17glywtdzlzohpmyyumwpgohtnez3c51h7t1pyg3kpba1qzbotdly1fnz7kjhghheg8d3a895i56wiq5p73qqqauodxogv2bu13g5hpgdtdp7gkq9eacryrlx4t7bdkne',
                receiverInterfaceNamespace: 'fl2uumh69awtvsjp9es5sru081izoq2ujzfi9x29px7m7c40k7c79p0uclqbbouju8xlnn8e8t7rhxgwogms3jz1u7blystmq7qrhdfs157puzmz5oo425vh1ji7zuxpgyldk5wqzo9mmphte3zjjgkg2prfwtxv',
                retries: 9545070287,
                size: 9303729441,
                timesFailed: 5636278333,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 's8eb2he608hhlxt4v14h155c1sdwt6ymviaedn24uxm0y4fm8x',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '422oabanjfsmskz728at',
                scenario: 'e7fhykb817tpuex7d6b5m7hzn0210omzexj9ogzvqdpr697d8hzvnym7k10x',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:10:20',
                executionMonitoringStartAt: '2020-08-04 02:28:08',
                executionMonitoringEndAt: '2020-08-03 20:10:59',
                flowHash: 'x7nnp9y08gvb1lmnsnbegkto09iodvg4uxbxzvcs',
                flowParty: 'zoq2ubkzhrwqah9xm414med70b8qqvwhcxhkiqhu748s4yqcip2glqzntl4ndzqpmh9owu80gwm5n376rcugqlbh1mlkrjvdvs166eemdj2ht1oithfhi1bpwz9tqe9j3gjhtwdaowyl2v6utstxlz7vkypdk9sg',
                flowComponent: '1shn3rjqklyote7qr75qhb6jic1plabm7ek5xzvdontz6b7uux2b2qb30weq2prnejfewdu6uwh5qasuaw78a3p5woajbsfq0wpz4pgqiykdlyqeatbr5h2nub1r2v7j71tnyypfiwkfi0303umhjkzagj5s0u2j',
                flowInterfaceName: 'xm1zxnaqy9vtr9piesk3i68wpnfwx27yd2c5bkm059ahmhod3p4i3bodhes8yiqnbiueeslrzhbdx2cborbw82ewcn1exmlv5pil2faxn0gzxfx1qat0ybqc0qmz61cmh329q0kest4z3s5oevj6xybuqxk4cxs9t',
                flowInterfaceNamespace: 'rg5eirgza4s7fj14vrxezd06laiykpkkvuukf5z69o2y3z0ph02n809xrg1ew8kpc2m74rpqoivevc8m0wr1i80jqjg1tjawxb4865q3r66oyha26z5kuq81pubnp0qcoxtb5cfpq3utnys7ara63ffo3zoe830y',
                status: 'CANCELLED',
                detail: 'Nulla est velit culpa. Eum ad aut eos rerum atque qui. Quas qui quibusdam. Eos in molestiae voluptatem nihil voluptatem voluptates amet omnis velit.',
                example: '0pl7fh505717ju9x9hjk1ow61ts17hj9j6e948r2l946jub33olq12qnpx62806a70bid2oec5s9gm7qxjtt3avrb99aewhnd8q92c8t6t69lkf9se28oyxleep7o8pmns9tjfjhrezznq73u0msszxqc58c3x1a',
                startTimeAt: '2020-08-04 12:04:07',
                direction: 'OUTBOUND',
                errorCategory: 'ng5limtbg7tvqxezy144lc096ufd2f92ftxb2bjiyaekp6d6xo3eiclwpiqa3y35gnb5leg4gnvhvc1xpweniy5pc5mdpq3ms91kia1q6fggp4gce5zk0x94ktvg6bvdqeticot4k7eshxfolv6gys6r5k801tyl',
                errorCode: 'w0i7h5pffwledxrm40kb997v6vid7v0of7nls60oy1g3iestnw',
                errorLabel: 696744,
                node: 3046056620,
                protocol: 'ujnwc616lt0l0b7pj0jz',
                qualityOfService: 'c07rzqlg8y5zexhmuh25',
                receiverParty: 'fvtuiz95yd1eun3whfu4caw77e7x3mvkqpucrsjrwp153oqzx6rj2n6txvrdfbqd5zleoisl40wn8x2isflg1txrkcvnsblmixv73b8687fq7xd7x5909xh6yryt8k2ov0k9z15ey3mf04ot30l6tx9tu1xtrh00',
                receiverComponent: 'zrmad4a2tep2x60y0z73mxh74ehpe94v687eoevqtkyqoexqjmwnmxq3xp83usl27d1gwvh7fotld4457owexlcs9zuj20ao3z44qlzjxntyrdal8r06uuvw59t1mnxaf0oo7lalxgvvsqjdakoqp63r44lw6v8a',
                receiverInterface: 'xrj7olpkvff1r5z01snhc6w1nhbevhjafsrsqoosgbl3d67eqdk8e7s93te26on3zfzevey88k3t6iteq0b1qe0h4cl6r1j13pw8tdn388us9wtzq029p8paxkpwp3fooinc0opn0eqn7u1awo3tz0r5z0v5xhk5',
                receiverInterfaceNamespace: '3n2sph1c6v2n0b48bzl65h18fgqbcpqbbmsyvoe4glfuxhr8oq8svbasyw5ixsou8sj6he43w17fx19g80pfnpmk2393ufqkkefa9t5kt2fsycn3ns7bm32mkn3jmb22qiraurqyo4r1td09x9us5udpaqq6kb05',
                retries: 4540391408,
                size: 3257229218,
                timesFailed: 9968959179,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mszab7z0tfm7a4ye8c1yy64jhhaglwtwandnleqadzp22t9gto',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'jzpwtv61sxz67uzcdx1x',
                scenario: 'hx2y0czrqfh4o03wvudlcgitewue26o5p3x9r8l878lt8uzq8o11ck77gsyg',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:55:55',
                executionMonitoringStartAt: '2020-08-04 09:43:25',
                executionMonitoringEndAt: '2020-08-04 05:14:20',
                flowHash: 'xb7nnxesh5f296lo0f9xpd24cx0tz15tbe5z6kp1',
                flowParty: 's8wdgiw3csjttdtq9bv2rpui0lk2frah0pyivva36fp7343xuqjocxyup6ad53zuvwellkz9yv1prjf9uu1r5t7vs354tiv7dghhy0nznyg8corknql99rfrtx9z9kmra6lfuc8nistlv7d6qwfuag4wf5dhyvj1',
                flowComponent: 'gdgdcvclgutmez3qx1btm5jntznj9da9htxzuh2mjn40u7vsdq6716e6au01dnv6cz6kc59j4a44gy2y4805l6nx4xz6svaems22z8p3sbefprn17o8jsfstsmv06bkyxyqx0c5iws68v0pcyg9ow40tmodd0t7o',
                flowInterfaceName: 'sysftgekoygpbgp8ihwlfkqq7szjiimgpsa4vmanfharpzuqqpybjhrenk9fs9twxho6b8nzuh0gduj40wskv9ia9wv2grfu3y6ywo2tz5opbwcglgl970tukrshglx1m6tu9h75mv3olmn1ad630j5vug27vs2t',
                flowInterfaceNamespace: '9wp95tszpyodpf2bboj0eyrvzooywjoln8f53tw3cxp1k5cf3on1vdi938kv77qq4ehi9zyww6kbsc0opw6kur6x4pub7prpuroq3b62zi5u3jwf46rnvaxwuor7cp2zzkw7xw2k0npjdiz8d54xm0jaewc825pu0',
                status: 'SUCCESS',
                detail: 'Atque quaerat quis praesentium quia possimus quia aut. Sint ex neque dolor explicabo sit non vitae hic vero. Quia ut sed odio cumque. Veritatis aut perspiciatis dolore.',
                example: 'mm696phs4tr1rp7g996cag20h6vqmghs1zpb20t95xoy7p0rx52v304genif4v08clfa4mr59r93c3htzsajf3upyn54ht8zhs1t1gf01f3eyvkrkaw6a64lgwa405lwjf69b541zvmxcd39cfbw8zbq72dxry1c',
                startTimeAt: '2020-08-04 06:49:05',
                direction: 'OUTBOUND',
                errorCategory: '2bbuk7xqovtwciboggybu2jjmq4oqy0gzkayli9bbbyfsdfgwx0xx8l64u9arxak3psjsrml1c1hepdt2fqdsruqu31g6z4bauyn332df8w4caujrsxu5y8p3e98qji1682vsrakl9t351i5dixoofknx504wg5g',
                errorCode: '5i3uat7ddip7cx8uoqywc1mk506vntbmqf7rf2h8obyvfnyzf0',
                errorLabel: 381446,
                node: 1192890412,
                protocol: 'uogonrix0fspz64d2trb',
                qualityOfService: 'entzzjkyawtpkplygt4v',
                receiverParty: '67jzknhmv9dacdgngv1bkq78bjrc5pdorogixd0z9382rx6mtf5rputbulobyoxmx67yn35k5gpael6nhub3pfdjhifcgb1du5az14qotmf4gzxv9fvuvvigvgy0sslq05qx88k9bs0lt9hqh34h7gf82riekdar',
                receiverComponent: 'utvlq8f6vg1frfoobui02x5uh6nm60i0d513mexe2vl2xailpelse072wy43fnnsaqbdznuu1gf3yrqs2rstv884zhb25g0owowe2z8zxyrne6qg5p1h6qg8zrkof5gazztoysjddg68in8m6k2zv33mtstzaiy2',
                receiverInterface: '03wn5xsc2vlhdgmrzk4yjvm1az5qyh935graii70wwhxt2eespbyywlce3jl4xw774yzt0huvlp9i4swmbfueeh3m85ucgahzf5oc65ebso15o0k2dak0cp43yxzd2vpp5u6xmlyding8pg6ilwtsh6jxtj6n0ii',
                receiverInterfaceNamespace: 'ktfwwu4u6leu8w9favhg2hqfm6ns3115bl3dy3ysrwgyt92k5qxzmz3qo1rww6nwrydmwnsx7n0jfudsj1dgyawt0slcqxxxb1qqewkoerrqza7jnbejzfl7twn5lveblpph0tx6bglhgi0idcg9zmfrsg6s3l9v',
                retries: 2754991237,
                size: 9485916848,
                timesFailed: 3260469737,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '9ohu1o2pq1pqeqpmrtwfarulbufztsnw3kqkeg0daiy6izho44',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'yiyvaqmkero7rgbif9y8',
                scenario: 'of6lou8a9orlh9og7427kq0yarc7y8cki5sctci2tame2i0kzvmn3n1cyypo',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:09:57',
                executionMonitoringStartAt: '2020-08-04 08:45:50',
                executionMonitoringEndAt: '2020-08-04 05:22:43',
                flowHash: 'wbofo5mxmfbfsfdy4d8bpbpw3l4m0kp7h21kbdlf',
                flowParty: 'ttu8i7jnv36165i6059ryq4af86jrq5dmnuhqse9lkhilae23sf6kdnkjlfiojqj3jn2j81b32sb6bioi2dxykxdlakv6cxfzlo57cp064opw3bwq978jcrutmdpfw7svljbfi5dd5ejo28iabxzts2jjnj889d3',
                flowComponent: '0ux1i8kv8bat6a9u64sgv7v0p8nv4q6zpuwddzmy8953pd9pxhlop4zveetbrw193av0zexf1btzw36bugc264sejamk11ridhazhjd1vchjd7a2ellnm5au1wria40vunifpq1kb5pg17j80e0oxf602pr7rdn2',
                flowInterfaceName: 'a7n2ikrvj0a0g4efkp4f8a4h9bu5zw9p01xcge3jmow2vsaywpc38dr7t503lvts2r6o6b8a4ties6z7dcuz4zq1e28lr7i3y48og64w8fohercvor6g1v5es49m20qgsi2vzjba9ynf81xs6zv8a9vfc99syc9k',
                flowInterfaceNamespace: 'va11ig76p4hxxytt9i0z4ygew28kqdv8bv8oo0b7plybu90eb804lgiue5b702f10678s3wf5bk2o2c4l4ozsh9x2j5khu6gyyq5clujfh2ortanblgfcf1xicmfukgvt2pht3fbo1hz6a3n850rpi1y1t85jmtf',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolor modi dicta debitis occaecati. Eos quam voluptas maiores sint asperiores laborum praesentium itaque. Eos laboriosam natus quisquam ipsum. Autem laborum beatae consectetur architecto et. Eveniet suscipit illo cumque. Vel ut voluptatem voluptas.',
                example: 'gj17n24rz3xyz7nv1aj1cqrbp7ovynfcf4mt45fh2wzmkx0udyrr9xjz5sl07707c9jgjhzcc5v87hgqc6xvpwg7228hhh6klp6lem1wl13lep0rjjfaw7cefn68v9s0feahh0e4mw7nswpeeiii9ufq0jbnc9ij2',
                startTimeAt: '2020-08-03 19:44:27',
                direction: 'OUTBOUND',
                errorCategory: '7266zcmar53n1zsw978zl7ra2diwsj6jm48bqtfjvt19upg4quli38oixq94kl4urem934px2zl0mhx0fgkw7ezp2r9w7pss32s728gk2mwlsjqewflp8jjd9xgcrc9gxzsexfigy8447fvj1t32p02q69sqw1f7',
                errorCode: '5lacbkv6z1y6f5a5wriqocv1ccgmonzvu2s5lrjjyvvd2p2rkc',
                errorLabel: 673012,
                node: 6717042033,
                protocol: 'xd58bhxea3k9sampmpzr',
                qualityOfService: 'gswiduph9n87ti3haon2',
                receiverParty: '3kpcpdkz5pom1ux3pwdzaz1thf3ntwg98v51voe401nbsush7gdqkj6lwhyijk2699ro8iyjaahsl7ju7f5kctgzwjliosm3mimfuql2abp1djs17wxhr0p2ytuor47vmpa9eeukvguq7gjat9wnnldkhhoqp9ty',
                receiverComponent: 'etu4s43bgxy2hvuc3o03i6kaid9k8t2dh4srj9qp4ee4ydf2k3emevwhw8wlxvuxuz85892afh4gs395n5exncldhkrhxroylwz6s9wppayohbmp50czsqa50dxwnxnylix6risc9gajov8233ww00ysn1rt2a4r',
                receiverInterface: '43i47d143vqcbdstxlw33bezld6dcsltotkl2j0z45cbb57gnmwkqz9sn2ktcwf4vn3vew9og2cbvvrbrj5gzgy10hw22zg178l8bokkgys9zwqu2sfkwg7pdakxlkslylsp51oti91bqi9856r0m7vkiau66oc3',
                receiverInterfaceNamespace: '6xyo9g1tadhcsrphbrlpytsbxft3d6kh2ebd9ddj1e2uixf5hsza4mgchqib4999wgzd4hoa86t7vrzpltrk4141dhsdgzoq55woqwq3eydcrxgszm41ldw7l1eghcbb4gx4166st21uw8g1969hp5suptbrwxpl',
                retries: 1095881474,
                size: 6052642544,
                timesFailed: 5115844335,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'oc8wy9yyp7uk0h8igoh8qqa7a72mqn7vfd7gkqzbbd1q06vird',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '4wfujcee9nbbwmbpynst',
                scenario: 'aye34uqm0pn56o0nziw33g1hk45tg2yyuffc93mzlkmbi9lv5c543wgu6v1s',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:46:30',
                executionMonitoringStartAt: '2020-08-04 12:09:23',
                executionMonitoringEndAt: '2020-08-03 17:26:07',
                flowHash: '2vpzrpelvj37dnciogo2tqd0071171lhfoquezm7',
                flowParty: '1rgcz8ck8htd1lb0fnu9zu0mdynozolhoffoqqdhto7kmspuj1uvyunmh0xkdiuv3s7y6in79b25ywez0edewjdu23wyh1q6f4dqzbzieh66ubn3p35t8vp0x3igefxxnwsj24onvk9n104qef36g7554n21uzw4',
                flowComponent: 'hi7l785a5a93q12wnayynh9dzyx7nvmp85bo1kwlq6pm37ebcu623xvqfnrkk6qbfbg5gphrzoj5gcp3zojczqzw1n62c5on0x6ivb8u2sin89qesv1dece1mpvd1595e0fyf9t0zlg9crrgqhhuytbrrua1l3qc',
                flowInterfaceName: 'tlz6viuk6l2tdiwcua1d5mbvdh1aropvpf15gd4yvjf433namzd5fdjpq37rayadobzoxtkg35o2j2trfwwh2pnynldf4mameew0gx6zrdn50noxb03h821v7equqtk25p1hcspmxxluafc3cypqfcbzwi317er8',
                flowInterfaceNamespace: 'zl3pmpafz702c1y6klrsb9x2ru9uokgvlqjzcivqt09fg1ijv0au12sgnvg24v2scsve0ua7dsf8fxx84qcm7qz4jeou2bd3i5g455cb5zqge011cphlc8zxj5wu0wt8ws1521nx9gfv47e6g90g537h6udc4qhl',
                status: 'TO_BE_DELIVERED',
                detail: 'Qui quae veritatis eos voluptate beatae rerum natus. Architecto harum minima. Natus vel et cum quos.',
                example: 'st2nyul04bbojyciuwrmepjd9pbnhwuh2q6jn527d5pl3a3q5dfo13wtulab1nll3znzic9ujbn6ht8aiqbiuku6tj2se22obrh4pbbrjmmpy9679x9877pgy0bgj0m4vzkm44noswi9jaebtrgd766rdmt0xqvw',
                startTimeAt: '2020-08-04 07:55:50',
                direction: 'INBOUND',
                errorCategory: 'xr8pisqqy94kzerbuljvmg6091mbxp65uc1waup1jg52ilq06j37hfsry0g0t86ta6wmknz900ibedaobxkx8v6zjbfwdic3fmeh63lhct1alvbo1zqv2c1kf18vafk12ec7w7wxgv0vtkwzxvo291w7guzamgtk4',
                errorCode: '5tesrhflek63vu8vgck144ucj90fs90zjx2msg7gvgchgk0fl1',
                errorLabel: 654133,
                node: 6206165898,
                protocol: 'vq8u0qvj61rlk7aje4dl',
                qualityOfService: 'vv6yxnx33t0lo9qlp5zn',
                receiverParty: 'biuc6ffkou0oydnr144dx8i4hp06fvmpfnu85x9wwes0zldfqv3gf6xdmhwk796j4vqctbbkfxr4lecprq5xwvr4ktotwh82iyivzobuqa6vqwo6zeul5g3fb53pyd7p32tpja6nu29rft91c2cvhky5mfrahncp',
                receiverComponent: 's4bhix5iyr8npe2lp8z3qccowkqjva2825b5lb4jggliquc6wly7pk57r2kypoqh8xm2bhm7ekr9kxo3momeu1hb4rdmgvoyvgmkmf7cq61e73vluelmgwbtr0h64ssgkldjzvn05lwyyrdrny1kl95a4sjbrile',
                receiverInterface: 's5zstftnvhhqzx3ybzqktg74co2weglogtus9vlp45g1xcj0lh24gua1mgai85j2n3mjdveoz793t65p3kih10v7oavag2t9m60x1hjb5hnoyni2bbqlj5ty903d9ahzqe6659gnv9fxh0k1trrr9sf2mrgbdq01',
                receiverInterfaceNamespace: 'zuod8phchiqx7uhhvg08mbk8zokoww6wfeykubf2nc3uf2r1lj87uovaneqy4cwwohe6f41n1m4fulo5nui362nt4rkkcpjc0sdssfq7grnkj5umt4jtjx4e3f01ihyan6lr8lo4v1yhs0nhheyctaxg442cfdmn',
                retries: 1811082968,
                size: 3507041204,
                timesFailed: 3258322426,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'zu17ruuztmpsn4lsvfoyvu0og2mkxq2skumwir9kyjldz67kpq',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'gjz1fjo5pw4x0tjenbd2',
                scenario: '761cik56o6aqhr43fk4bme61z9q7a2d95vtrovqro6ovy0n49z0lsvhzcom2',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:39:13',
                executionMonitoringStartAt: '2020-08-03 20:39:21',
                executionMonitoringEndAt: '2020-08-04 00:20:45',
                flowHash: '59p938cbcjwgzng6p62ik7m0i9jaw1f81ny3rcgh',
                flowParty: 'buuu4m1bbvqhhoz3k2ykre13aqakyrht8u24l4h6d8gs90qj1momw560qv16l9gyzyh9ljli3rdv67yr8bkr6ldqu0o2qzv2i2sd45wdbfxff5wcahvr1cgsyyi823aq1abpoihmiuf2su0062mzga21byy2f6po',
                flowComponent: 'dfz7f2x9l0gdbnro96rjbw5vv284r0487t3zcsljjemrecq383zmp2vpun4wnfologqqv3j1ux9d06swvp666wwqwj24i8btuw5b8m6i4qjphblxj07bfjihrl2jtmxspqhctcfyhykjci7mwxvvul1e8qtyoxyb',
                flowInterfaceName: 'vajj1hti5obq85851jpocqy0n02y3eoea5gnvvgetbig2grj78qjgdlp3qwzhrkbmd3sfdiqupfz903u1p9b4qing7qurgerq85u4znz1bmvw3fw67h4f3fdpdwat7j00326kiy0jj55zfvixz6n3s2pnxhgd05b',
                flowInterfaceNamespace: 'f3i2iun6u55m5hxzmfho83ya7tfms9br0cku34ltwn99nhoj1q5mwph83bw3o4g1pup2ireho2qfphr4vez9308ahhrl9dji2cfwyhvt2a5aiwmdjv4hh3e1yoq08ruv8b4hxdvpf2ja9eq12asxcqfcyjpw6oo7',
                status: 'HOLDING',
                detail: 'Et reprehenderit porro possimus. Impedit voluptatum laudantium nisi iure vero ut voluptatem rerum. Ea quam pariatur a quae accusantium aut. Deserunt error aspernatur ut libero eum rerum ratione quia.',
                example: 'y63kqgtga2du2v3xi5ayicif9bihjahs5fe5xjegvxffrq4xka5wnacnmi2bqfblvagjxt99lbeg86ayge1kfcyb6n7tvke2hy97as30ukdg0qc38nvzzmbf8dlx2pc95vjv2tk4iabwf9bwen5kx3aupxa1e2iz',
                startTimeAt: '2020-08-03 20:49:39',
                direction: 'OUTBOUND',
                errorCategory: 'baxu82axk7hdf4jb146sbvoaos72nj803e72r1s5gxf80te2llawsq1c180xzaxwhrm52mhjr2j7rps3ez6x5im2eqzs10d7syr5ejdn566lzlog0h6qcpcez3i09365blfd2vu09av82okb8ytfx00ok13dtwq9',
                errorCode: 'rfg6exer7mypx7x56vmgss6en0ar47sbj0kdj0z1d8aawsmsrwk',
                errorLabel: 184516,
                node: 6957689605,
                protocol: '4tn5ishxqug03coyliu5',
                qualityOfService: '5ubh95isxibm089k5zs0',
                receiverParty: '73hrb95pi5jjt39nlvimvbphb9yzflxe1i820q9llrz36dsha6kus1zy3epnx64jlhvqt8jnuzyjvnfnu5r9juld1i1jt6nv4jt1e8lrkrjy37a9c88x6eg3xajzy21kz0gv5m28fezuo23pi98n01hrligvw8oo',
                receiverComponent: 'j15plnislfxg873v3m82yc2l1x85gjrw5fx0zs4wg7kuxygzvgoxyzc0ic2isndr5almwneme7rh9pa3hpq82xvq4u77lk0rtzok8piwpxm8icujv9j5ae9rnff2gfaegdqz1eaq0c50mpaath5grsdfr7xscxhg',
                receiverInterface: 'z7w9p0r55bhuxgyv1j7ekkme7pc9t2bjkoq7nz7h7zbpmh50zqz3tq5z5cy91wkhx64a9gkw8gtuxwwv5y96evc3elydx3vfbozh1fuqqq8hm0wueexcj0en5098aqhan6891o9d9hs4brk05dgjpi0rajpuwn25',
                receiverInterfaceNamespace: 'u99w0g0ps3x0wd3i4pkojgvlcfg2r8io2d1wc6pm66gzs04wcjxgrbhwycytt5ranw7vav6hw929gwh631orzmvhaqxuk37e0u7j45y823ofpz21q2vpglkjqhj3m4lw4qpmuuetlmfn45xenr8wxr0omxh1i2lz',
                retries: 4798186991,
                size: 8313397020,
                timesFailed: 6767834168,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'ebmw8h1fuo7xnoc17t7tu30u80pk43z2izxzgfduzlxoc80fcc',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'h7tf6ae2b61w0s5k9zjl',
                scenario: '0io5zihzh542dhn217radnjw78f85spq4fgixf7xo9ckfbth64oujiw1nb5p',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:08:47',
                executionMonitoringStartAt: '2020-08-04 08:59:12',
                executionMonitoringEndAt: '2020-08-03 15:17:22',
                flowHash: '4mbih5u59jqi19zcgpy0pvmlwruiw52slrxmmf7r',
                flowParty: 'sww5kzmp7a0ke6tpja68s6j7c9cq5ixhv00xbfgbi14u1m87zg1knigihsb56zv5hk4i7jguloav84alu7h7wzjapedl9iniahpcl0gkjt4to9n5x0c4r3qjb1icu0pz301h1865pr4123bm6ofrmklcub99dnpt',
                flowComponent: 'trra1mm1wcz9t9f3dzqq70wvn76sicejpkyynwmkdlpns40wowyhh946o298djo33jndsnyt0y2r2qpufksvy11ikn3vzg1br3jx3ebw9m2qkjty43yaqke5zhrjdhhv34n0tp55co9iaoehej0t86xu9hjce00a',
                flowInterfaceName: '3sn5snqdw1aujf3vbecxyxixtvh53nqpn536f8p53oq9ilfm91e4us3ixlassfbhktjz7tup1jxsiux56qxshcdwzf1uirwrujto5ix4v329536lb8khnnzahqa1v0w2ix08idyefnuuvcjz6mu848g97jrjhiro',
                flowInterfaceNamespace: 'hkahwed60xca3yb8mucddnr2u19qzx12bwsvg71pzq07vliur7k83gn1yxfy8m0nbf832n3u926yep3j2e0zyp1b7hl2tzdzk2bgu6u05eclojwqkmfsu8mx5y523flf2jnjdqqlx7l491eh6erl73xj3ole1gqv',
                status: 'SUCCESS',
                detail: 'Iste minima soluta quasi mollitia non et. Nihil autem laudantium incidunt consequatur non consequatur deserunt a quos. Ea qui in voluptatem. Veritatis nihil repellendus laboriosam.',
                example: 'u8z2ylrusgntra27nghqiy5zwwvi721pqbwbaevj3frcbutglfbuu44k3ann6xs58banjll0e2f4cs9max2wde499kp7526xu041dcy1bng5j1goh5ndfzvbvr0aya94wlt66s64bjsximk70pb1cptw2qa8zdn4',
                startTimeAt: '2020-08-04 11:53:55',
                direction: 'OUTBOUND',
                errorCategory: '98mzfmqlev7p2sgnca5ybz2oehwnhp27halww5zhtyrqsdf4u5c60e2g786d7z4wn4ago3a74r5u99cf8v60xkm8d59pjnj69m63oehz7ddt50ihpmu4dvfluk81k0yituuaa485tnlzavoqrepkeholkikwgdzb',
                errorCode: '5mmwac3nfuy4e5if21ncikammj41m1vuaafr0168hbk3jcdnbh',
                errorLabel: 1154552,
                node: 8930799476,
                protocol: 'j7ygj1ke7dfk0sn0oa8g',
                qualityOfService: '4ujdmj663r7fs7q25oap',
                receiverParty: 'mruizfzi1jefvrf7989plxmdgde7q64jx48ezgapsvs5jxzldlidm31m5irqlei6lip60eihph8xjdeh6cgxgj667kk90pv0edi43nakafx8pxg0vvrvlik2tgrtu4uxuqmkh8qos3qn7lbfn8wnb0a6jcqib0bv',
                receiverComponent: 'aalony8x8n252a6joa5c44pacrlz9kk9r38qyyk4iwrfh3zc2li5qm4qbsy3yx2941jhwg4s5h46wc5two57w22iervicms0gj1xg4yorz8nctmd4k80u1jrqj45cnuw40q7ejtehsh0r3ftugwywkm7q4gvhz8b',
                receiverInterface: '0br4bsiqt734ce4vj893xcvvxi7ik2c6n4l5udd9kvz99lm5b3bbs279yqv3nrgsfw1f11ado4oxvhglmmoxh1ighcjqkcsd0fin9xjw8fdsa6f8fq1vvtpm9698gzm5h74m92e2afrmrehqu3wxdwjwfp1jgtus',
                receiverInterfaceNamespace: 'ue0db2ag0cwgrwrokfnfqqv1ohruqxi1ahq0mb3r669g3l6t3uhdqgie8exysbgd9xrj1x8zg08uy4ahpx2fmqr0px59zaln1gwcea6124utkr33png8s7a4f5jmq8lf11fjh9k5eotyvj341hqoczaoo1b6jcqi',
                retries: 3648895638,
                size: 4418710132,
                timesFailed: 6782861470,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mtwui51rm265yk7su870078p1dvbs8yqly573b8ycroz3koaky',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'bgbxh7sh473jzz7b9bj1',
                scenario: 'if9ofu3adyt2k9khwqipixb76by90tglizcikpf9ozrvosikkcygvs2h9wfv',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:05:33',
                executionMonitoringStartAt: '2020-08-03 18:15:35',
                executionMonitoringEndAt: '2020-08-04 08:32:55',
                flowHash: 'efri9wzds1nttt8l8evcyenqskjr7cre7wmy9iw0',
                flowParty: 'zi3gw8gk6gxeq855fa5lxar8yai0xlie9xdi7gvmr2raydfxjj4qhkktq5re8aq2kzo04o2rhmajocxclwq330zy3ygvw5805n8pjhj8kuu3hjaxxsb1ppjbczvudyrwvvi4nczienr1o1k3ajkcig7797y7ov14',
                flowComponent: '6encmb54wck5d9d2srssj5j3o0mmpe75omhp3pxpbkpvi4hdwgyjj8ekah1t7iysmlctscql1ntiewgvk1vv3dd8b2sy55owi3p0s39ij1vptemxaruv8s3zdilx5quwfxogtqmfn5mvtkd8o2q87la3wja0cxw8',
                flowInterfaceName: 'ggj8hfup2q37ts8rf1e2lw78kte5mrm2y7ld7bikcxwped5aiee4uidch2zattzr1c4kpq0ntj3da61ssg13os1osth5cd09acmd2910g9r4kpo4aa94z5ow9578eh6sdq1we6tbtwdr6bho6mnbbumkatkb3qd0',
                flowInterfaceNamespace: 'qqsu2ps1p73h05s503drrlbw99kf2lhzsf4xi3fwisuh0dw14qv8cik74zfun0j3qtzti3m9iv1l33ry5obudv7wczo5wkhqmaczk0brb4vgzcrnieuzncu0lmj0txp2jrtyhusedz6wt8cnakgu5xwxe43pmavt',
                status: 'HOLDING',
                detail: 'Laboriosam dolores ut incidunt asperiores. Quidem beatae exercitationem recusandae laborum officia. Est quo voluptatibus et soluta. Cupiditate dolor veniam incidunt qui commodi et veritatis.',
                example: 'qtztucuyyxo0xi983nc3e3awmksw2pxj3e28gq59res0yslriprisinkeesb93ccx7x63gp1qvzf6bk7tfir2iovoqvg97oi2b5syp86lxfh51nimdb4dmkygsjdmd5h7whzyvkoruw5srrt4nxctw85mbfq309h',
                startTimeAt: '2020-08-04 04:48:01',
                direction: 'OUTBOUND',
                errorCategory: 'xqfocqe17pbr2v0w9jkdofoschkggh1qnaw7uhos314sptorsgj14dy2r7ui59fngq3ow7ufkwrfzc1wxn1j5f4ll9uatzljrc7bf96wk0z625j7tmy88kw9jbvo4l6vhzzviyl3ame0h2ne87xb0kb1lrm99wuu',
                errorCode: '7xup6kz2p9wr4vusky6lzbwpsx6wb1z0kjs3f09df6970zp3lh',
                errorLabel: 957154,
                node: 31584079894,
                protocol: '1busy1vq7lm34kkayrut',
                qualityOfService: '86v8xymu6vh8w9m1d1n9',
                receiverParty: 'kid7wthw85d0qwsqgvi35wnfxe0rpv32bs9oe73mnd50zy4yh0us8nr4dqwj3huf6eo502rzyablxbur4syltvld6g36jx31bp42gmj8x4fqhwvftkhasyruh0ubaeqkumgvbi04jp5x58rt04ay0uh509nui7mx',
                receiverComponent: 'ous4zglwv2htkcddufit12mcsjfgsv0mqtbux5e5ga2s5r3lwmmzvv0jlw2tnj2l5ipeuabre998umblxkj3lbb589h1u9evqachkhcjdxd6kshhy6zp0e3h75om6wh17af3p5prt4l4ppwn161rhiru1izewjhp',
                receiverInterface: 'l747p7647k21dprwgxqo3hoe5cuah0fy2wd2w2kbm0qblxn1cz57a35opbxkcy41uezm1nupfhehjhe4wv36xlq48t1dq2onay333t8msip1s36maw4uhw0d1fb9v4xqwucjec6yblsve593g07k9p0a7drel8v0',
                receiverInterfaceNamespace: 'qsk1qxu8lo2w4bj2u0yswghixjfvjk3yyn5mxz7plh4bsv9bn2fduiyjjd0a13q9ocs8w98788f6ts77j0c8ovh6tmnmp5y4w1wf4ir1xlk9rdvvrs84k2fya7msag4kf8z7ggzh1gh5wc0jvkyvouy80afwxqyr',
                retries: 3501312832,
                size: 2832335323,
                timesFailed: 7557386051,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mu2rne8mvijjkpe64evhxw3m5o4lz41l3cu3v1xvwqt6s042w4',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'jdh6h34gzrymto6dzose',
                scenario: 'fxkko08hi17nclcwxoznafdk6vm92ytnjdimmu0ix4uf97s8a7fpn0tai6tn',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 19:29:46',
                executionMonitoringStartAt: '2020-08-04 00:30:51',
                executionMonitoringEndAt: '2020-08-04 14:19:07',
                flowHash: 'j02lv3vcsw54ghreqlubjxrron3f8vb3hmeuxzgf',
                flowParty: 'udniuylgkvox6u3j8hw6ycr2kf7h7apujs1af5b72i5r2rkzty9e37cf6u8qgel6qa9gnyphzr012s6dcizcrxn22wan3v09ac8fnbflu5728fvuaavrcuai3i6a5aefeptqsynhchn7q3j586c14a7qk25iyylw',
                flowComponent: '4ms94rtatfhlgzy5lt2jofuqbth96kc4ngcq48q5byp5iyl3alc0qn8rhi9t7y34whi25bsu7ran1mxybcky97tw2l957b2038exd74lnicb8nq4bozyrmuhp1h116qb1f7gaw9kce4lbg07zfz6klkg9ahcyxn5',
                flowInterfaceName: 'aoeuiqz3lzq4fu6v04xrp3l9t2h7j2jdkys54275txme9nzz0q3k5ybcoczkgmlis2u6pumilcyuig82wsblvy7m3cylj2ol0ov4xwk9bvc2gxzo7xqdrsjzol9ty28pilkhmvxfclz4ndlxkz6idhm6s52154is',
                flowInterfaceNamespace: 's48oaa39603bh2mkssychj5iaaunkq5ztp85y25ashcuyhfh5z80dru5yvdwnvks36tsed75r23vxgz9qhu52dlq8c9launr7odjssltv770n6y4snq8i2u0wm8h4x6a4qbvkg0b7myhrirrzvb3gafjkyzlmnq0',
                status: 'HOLDING',
                detail: 'Quibusdam et culpa culpa molestiae quo mollitia perferendis tempore. Qui odit pariatur rerum. Numquam nostrum incidunt ab facilis fugit. Alias eligendi et deserunt voluptas eveniet adipisci. Qui et impedit fugit doloribus dolorem.',
                example: 'gawu6k02z3npfduhzxhldhju84t020xnjrhcaqnmypfmkarz8nh484931ip6df3w5qpv8j9fi9efbfe0ttnepwkgftkuiiqi6ctef04qp8u9nsia9vr9l1e6uedd362c9j1pr2p97ls8zwfo2apxip6244gqmhyj',
                startTimeAt: '2020-08-04 10:38:42',
                direction: 'OUTBOUND',
                errorCategory: 'no0lh8wq110jqptpx4p1837o88lju1ecxr41o8922bo68fv4eulc1z5c8xu9vjypuiuugaoh95srpki2ouxuuuyvb5hsk3pxc9necypuo21syio6nhu2bkkxw3eygbm6lgntvsg3snx116au9x81szp4bgsqor43',
                errorCode: 'dqdezxrzgg09msvbkkpzlwtsqu3k53gjlh5j5gri6at5tazrxp',
                errorLabel: 565759,
                node: 6264258013,
                protocol: '75d5bedt82wdqd50zehf4',
                qualityOfService: 'pk2zz0iydippai6lh5xr',
                receiverParty: '3jelmz2c01oikv56syjseri9kk2fsm0pf6uvflayx4v45s34sr6pglfhmcxqswhw6o6ixae9xq24erdgt97guwbs68zvz772143xnr03igs2xbotmfty2kekne0japhdao61v34xbwgpn35kmhc4mjvoe4xtzkv8',
                receiverComponent: '52f49aqi3nfhtv3fzgj9g7kcc7p1afn6fb7rahqj2cg4a5o5298lvwqqnhmsn0nhhkemyys41ftlj8pikvdionkrq3mhnxdw26xfxmxn9zmqzq4kkmp0ctgo6spseh380x29e8jt1aek5ei88q1rmm0qtcq63zgs',
                receiverInterface: '1mohiyg1h4co3kz97w983btywopbzl7rj998jbz3y0jd6ha84a6u6fgegkkp2n52dxfcgw8pb7pcztg0vggav0ajlr88zhlnvgp498u7xopryogck4948lfcgbcf7fiypoyy0m3wl3jkne3s4kf0xkjzyjifb1bx',
                receiverInterfaceNamespace: '7wsnqqh2i6ev6aufojijjgo8wm3dqsnr06s8vcg7jde7ueiqh1hjk07k7cnemft4m1aeidhaws9h5z8zqnq60z7lwnymeuks9ycofr013nq6gmaymd45cmwe67l9arleeo79rlec54afjdldjmj97pu06yi62g76',
                retries: 6607762575,
                size: 8128371451,
                timesFailed: 8373463949,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'nub5pqsj3qju07cd2f7i13sk7uvpbqhesgi96oraiy32lk8a9k',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'nn6fp10umn7rws3zzy50',
                scenario: 'ajjbenhhu53pwd8hy81j037ghz2icfzp7osxjy6j6snbxbnktt2tlu48dxsg',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:53:48',
                executionMonitoringStartAt: '2020-08-04 07:58:34',
                executionMonitoringEndAt: '2020-08-04 13:48:40',
                flowHash: 'xsqe35yo227cvau1gqqo5s8af64hd4ioyrgkfpab',
                flowParty: 'oti052ld5un6mgj81lc8c7ju0ibsndpnoufgalzgkgzd00u2krnb01fwyl3cgywc7wlp1io9rs08c1ejvmbuuljjr3p5wkmwuojbi21mow5tp9gy1ovusalexvmwrz35k48ddls6o7lcuv5mhsmu97zciesj51gb',
                flowComponent: '4cpncy5bwu6evqilsxzqio9e2ym77c6ntikhc8p35pfamhnvz36mpsqmk4tpj2xdfxlok5q5vi62via9vex1cj00zb9vt7hbghzsa93e72xrin64y1icfeum8fcigb5xhgum86upg2uhr2kiq29jr69flwbw8yqn',
                flowInterfaceName: 'lc5mdce927nyrkkoo4h0wfyxwqqa9fggbnnz470om8zoadcz9np15ashya0xbcchja2jywkngxbxjngsnffxid6219wk8ap2xhsqml26x24pcpm7lx0q7y89qd2va7y3gu5rg8v4urysfwjroifeq67k2lesisi1',
                flowInterfaceNamespace: '6h9zol31baxlf8n5ulh8fjw90w7riy04ufjuxqpawrjnt47193yuzmoe1syq95b5kqtubteyhnkz2u56gitgvyjctig8woj6702w8vz1ek21vpf6m35z2ur7pzdddo0wh599hjv9x2in7jvulnc29ng2plcatsmk',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptatem quia rem omnis quod qui facilis illo suscipit. Ipsum totam et. Iure quaerat incidunt voluptatem quidem amet recusandae.',
                example: '4i3cvfwaz2dzj3dxx5zvo25stz679p1rno9yb91h6gavytxecd6o2uywbiohncjkob7au5yoq5j74l6ti0wuat1e4dydtfsrui90i43vgucrmomdk7a8eozjpjmchmjvpyn46j3aotvpid9d2a25w527ck63xto5',
                startTimeAt: '2020-08-03 18:11:02',
                direction: 'OUTBOUND',
                errorCategory: 'msx0nyfo59m2y07s4j56j7rwg4ogmr5qf65qqmhi8wzy0vd99uqnfvqgn0v9lklb0wwq3qwlhdqj6zral4wzx13mudzwyek68g9513bgo156f6crerdctcdd0cup9bpurhvj367c8eyn10y9p0ymnqmy1fo4wxe2',
                errorCode: '411o0p6yxsitt62ep0lvj0bwithqoqvi1gs1ln8as7xupht48e',
                errorLabel: 275733,
                node: 1524052660,
                protocol: 'v1b8ww6bak1tlic516u9',
                qualityOfService: 'qz9q84koq47koeby5cmnl',
                receiverParty: 'cb6c1h5n3kj29ecynxxbqjvxrms1gzvr2ivlivsbdmw5sxu1sm35ube6j9s0tlkpzdkr6ajyqqsyqyg6fltptz7zw0yttj1iapq2pekg1on2hvbv2fzy86r3gnh35yyf9y72isvl7xekyuegu3x8v5t74xar1bhn',
                receiverComponent: '89q2e0hsaup5tb61xt19jkaigj3jtfbc6euphuvxrdq3acr1ayjur9elnd21906caj0m1vocey99imiffmn1orxcbhtei86rbbwxgh1nzrkhxmdpfzln4x8n21l5hwm6axet3u6vcy8f5or6nahkckaf4r1t8q7p',
                receiverInterface: '6x2l3dpzu49zrq2086s62o9t8n3sax6bkqr50gqup2ex9p6tesfsiart1h7awbbltncdrcniowswunl88bnr9mtryxx0o3xeuyp7mymvt0oms7kosv28q1ldcwkjaf59j45jd0c2c0yxffhlfqywrtrp5vr4e7vs',
                receiverInterfaceNamespace: 'o2rsod748hf5n5o1j5t6tjpvq0x8oe138mutkv6r4s3a345akka5586oxbpexf9blirp3fva1a9v6eefb608h8lztdz0xqmvnj2x791soq4lfqc7gvfzk0qwzpgyl29bnpx0cy8hpenqokky7dfvsx3f7tswhbvz',
                retries: 3017261532,
                size: 2130811909,
                timesFailed: 2004308129,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '2sadzx7kqoz85ao3yaczdr22m3ga7gdd22p3mmg0q1kino9whe',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 't7lsheincpwl8a55qlne',
                scenario: '8gjyl7wr4ecqn52kzrlv49zmlbd89t76imiq1ulu7qa0w9pumbk7582candu',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:15:55',
                executionMonitoringStartAt: '2020-08-04 13:39:40',
                executionMonitoringEndAt: '2020-08-03 20:18:33',
                flowHash: '4uo3qg5l7vbr5zmgy1rk08hqfn90iun82ib3zh4s',
                flowParty: 'xm74u8yc3mbzfot6dz5kamhwz2pc3s8xc7ezfn348rbpqaywgyx4ycy6w99a0ue72pk367apstdntw8j84g7k5qgqulfjnzwif47qzsdyo99xsxuvv63zpk6x14dzn3uoootec7gk5gdgug9or6a1v12nm06ubkz',
                flowComponent: 'id43kfv1i6dnw9twaj61mbyx2qorczjxzx96knf1foouwcfknrzn9d4qgnzjs6trttacyfadmnhe8zhfdxg7uxdilpmsbn5k0dg5j0kqghxztz4fh4drzu7k4p2l6a5qz7mydcpr8hdj6pcnpre1xnk6os9aw37r',
                flowInterfaceName: 'wfdntxxbgfcudy8m8tcu27k1woddk2qyw6g08n48np9g0mpcirs8lwrogfmea8fgh6cshr09ar0k9dz992a4i4uhxan93vs43sp0vil5d6l4a5ic7fh2c7ma7dkjvwb2ye4uqzl8plgcq3sii8k9rgcyz0f7j0e8',
                flowInterfaceNamespace: '8bcofkjaketyplnyt9ozsn53y6vgnn7d3o9xwad2g4m8a9wappa28tcac36fq4m0u5h74786eiwgaae3k8prkunnsd2dnqn10nltomsv02u7ge1d61fwt7os0h42ehkj3i3ejs48qqyc83lbo8i7q1s9tsouva3c',
                status: 'WAITING',
                detail: 'Repellendus unde libero. Neque doloribus voluptas perferendis dolore doloribus placeat dolorum. Culpa nemo quis corporis illum dolor autem voluptas facere veritatis. Laudantium ullam voluptates ipsa iusto numquam non natus non minus. Culpa repudiandae magni.',
                example: 'mmtg8jmcvl1aqj2m4dp7wk10dt2afmacgxffdp52whnw51137agypupurs886pcjhrttyyam8gs7zdaojnbun0qxpvenn6683kn5gotzb25rzdw6ya63cpenkcrepg1236uzp4fne4z803fonjo6qiu1m9lckfxy',
                startTimeAt: '2020-08-04 09:30:44',
                direction: 'OUTBOUND',
                errorCategory: 'nufxawk6c70qx0gthrgu6ly6f41e70bdxr8w3oxfpi0ij7usoeqpvz021ko21v9deiotxnsg4u2lwwb9toocd11z7qieqzavqbmy829n1hlp1qcv6wl8wwdegsfl39aerwdods0hjwp34r7459qe0pfcp1gh41gu',
                errorCode: 'mivd4yo3mncqgqmqg1k11ggnm86lglcozkww1h4guvuwa8kpoo',
                errorLabel: 936380,
                node: 8668486509,
                protocol: '6igwj4i0lvpbdq1yxjvq',
                qualityOfService: '4jqgpieqaann0guiojt3',
                receiverParty: 'xgq3fpq552m7bl8t9d9hw1fb5m4v9badqntis9per0d37z4pwm3oa6q0xefhm06z644v24tlqpk6ej0rejy68d6r2eldm7jzf3lxf8frh34ysm0pgj2xarhes5n66lch0m09b4lrbrwydp7nhwumky4f7ofxsaqsh',
                receiverComponent: 'wawxy11ahpe017v3tmna3rkddcoaihpk68ysx0o0cqd5ue5g0lqfe9xr31enjjg6dy8i9f7oukutpys9vcd5hdzf1rs9c06lz1gpycqrv8tqbyawj5250yc6gjjmqw86nmgau05kzs5gf7jocy4ubup5g5yzl2cm',
                receiverInterface: '0t81tjx9me7havju8zqg0o8od6mcqwxm19rvwbbcb45va30ee7mus1si5k56od0vdm4v7udy6zjo8pczla7ka7oa768el6yy2cmfhux0cxrz7y0p85qcxjcat6fypfak57c12kgtpykl5wscsir193dd25tm838x',
                receiverInterfaceNamespace: '8s95e3zxz4m89og8tr0ddn7wky3l39xjsksiv47pyagbyvdn03dmnpbx6hz6vovwplnc1k8nrxi6mfrj5jherd2lwqxqiuhe6mc9yrr8tgfo1z53t6nv2gq69vfekpmuoswf454ev480p9wlbyuo0obd5ana6b6j',
                retries: 6186212751,
                size: 2046555395,
                timesFailed: 1621663763,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'wvmieyxzly0fah7n3im0vo8flxhcu61np0b784eutp7i7bztyy',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'b14uc7t7uvr23unt0x8f',
                scenario: 'uz2bqen7vrx359kj69x8zuefhdw3e84cbrvlia1ks3xo4ftnrcbv7cv7vje7',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:27:20',
                executionMonitoringStartAt: '2020-08-04 14:24:10',
                executionMonitoringEndAt: '2020-08-03 19:17:35',
                flowHash: 'fb08d8k81lvsya211u0g35j8rue4pcesqgk84jbx',
                flowParty: 'wjj75p27ag0kmvzad8nbbvnjqdlrd6cgiy8oip301lewddyvttitsgq18qtix7bae78k4falgnodxbl5c6muywsq9zdq0wnvka1ou76i7k1fj6zy8xrne7qpsgy5p4yxljb96y1my1mhpzvr996awn5muxzdc8lj',
                flowComponent: 'rxal62fhompu9usjz8uqos3zqtnjgqxleesvtfxevhax83rgsab7npc2iofjui4rayvsb6kzjf0acugcl3le1ehdbkyjvh281rzrjdk5cpsfbet1au3bde4jfo1bws9pwo3azd3urvj8z9xz2apik7l84do73joq',
                flowInterfaceName: 'okw5r4sv2tsiyjk2215eisgl2krdaggvgvl1n8aqpztsvhrzrp0tspv59rszeinw0ar0qkxrfpefdx7bsqqskkoqypan58hlc6rfpb783zexwrze9370555pwiorgp2np015b2ntmh9gmgdltvbjoxhrhd0ke9p5',
                flowInterfaceNamespace: '5qeuwuv39kt8i1u23frjn7p0t5z2rnux7lamywqflcchi69iiuo3n5iw498x505bds9m868unm63qsu0t9kzyplkzhnf5am5p3g4554bba7y8z88u1j6jkh50tjf8lsyx44fe8uo61xo5x1oynf32sz9xny90qfb',
                status: 'SUCCESS',
                detail: 'Quis omnis expedita. Quaerat quas perspiciatis ut et perferendis consectetur. Impedit delectus in quis quia ad sapiente quos quisquam sed. Aut nesciunt dolorem aliquam consequatur provident totam enim voluptate. Asperiores est recusandae rerum quia consequuntur distinctio voluptatum nisi voluptatem.',
                example: '95boxre4xe3gvikxvfl8kkyham76ditcnevexvzfn0zor5ybiurbx0dlnj2115b8aqi9a7nv8rgtc1d4fquc0tbn1p4e47qrto4itmdl8fm83z4zljuc2esoijie2wk3h42bfdtlxeghxtkj5iuj2g4l4ltbx9oc',
                startTimeAt: '2020-08-03 19:42:14',
                direction: 'INBOUND',
                errorCategory: 'kpzmhir4e2rqm22qib7cyee0ejml29zxvxs4nupt65t6e7erixkcwak7ijcq88u6blqs6movdr35laxj6p6pmxsmwkbdkiw3bp0ao9w5clbs95vivwvjlpey547nasrt3nwmoidau6pwhgf4p7fio4zo7ntj6ch8',
                errorCode: '5nupkbnaskg7woajgy3gh4qae2lbcviux1alz2e07pnh09egx1',
                errorLabel: 437207,
                node: 2775492367,
                protocol: 'g57mu3xev77m5rh28nhs',
                qualityOfService: 'j6nif5k4dsqyhfzll9ry',
                receiverParty: '6ghpio1wijw8dld6pmmx8shb9syrofgbpgt6wuj310856xglao2v2nwahzg0hvwsgr4fklp5n21f06bn55ttw67hmbolddsr7ved5ty2jk060bgo44fvsrndwi27iegic1oiojakiodb063obufqcowb19zqmzks',
                receiverComponent: 'at7irhetmxuozwb1a6mn02j714m1um5dqiprcqnaqq8waydtnw28dpqabcz4ulax9cmbypniofxeitzl8gzvqziopzetu8efc6qtymmpcexcestykfmesw0xxzrecogh87woonsqtt7ie5xol95osw2183v4gi71i',
                receiverInterface: 'ekjs5oshnleyfujgeuc4lvnpfytfnujgsx8gqi2t55an84wxjlh2r9e91v3frapputlxassyo7e4n83uizyqecyhqf7isvjjhv9rs3r9jvifbw9jso74wvx4rwsur5b6gxykwc37vklyj9m4fj7bcfvtnd5v5814',
                receiverInterfaceNamespace: 'yyun9az7w0sbdv534q91f8e3peoku39fn9i4o5c28my43pnfp79tdqr745gjolbkhgvb5yzkm2hhrg5v1uhq0neahnylsygtammdnxsqa5rjznq59e23dus42njh9fuqe9q2kuvmieydger3zouw7x82qjxhp93n',
                retries: 7846884271,
                size: 9501463181,
                timesFailed: 9401810384,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '4imsg28mb2ph6afaywrbcl4h8e59ij7d5m17iurc76ea5hmaml',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'qmj02w26vtrf7xrd93v7',
                scenario: '7cxxhqte5aro97zf776xvgtxikeb0tghhqr0powxju7k8srbywwelmy4a9zh',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 04:37:44',
                executionMonitoringStartAt: '2020-08-04 00:34:54',
                executionMonitoringEndAt: '2020-08-03 20:28:21',
                flowHash: '5l6qtduzjo7iolm8ze7tvtgdxhsg22e0kae35ano',
                flowParty: 'yg6hhsbs6vkawcqj435v5j2yqm26c1todhgrlq3qlx71kk62aq2o2dcshbb62ed9g6unlzhcdfuy93gega84h6lsm6vjsxkdg9yow56xlo39xvtm0fu2qej7vpaupc5zxlidkbi2m0iwvokagj85rqywv9unv1w8',
                flowComponent: 'p0krgwn3dhdyr3qyy5o02iyp2k14tt34ilvvl0uitqtb00parpaun7c2ji2i8scoe4z2nhf3tvdqid38kre907j8lubv94puetjqwm4u9djx57qwg3tq0uftzwu9vkkug2yw7zwq77iciwej82fja9727qmvtjgz',
                flowInterfaceName: 'j3fd7943ykyx5p6mdbpghclu3pk26aoxpspvgi07uxpp4pwjginl9ah9xkqh2igzxfscpv6z9k1rhoaktwymyf1mcosbj3l8ee2j63ukfpzdy56yq6kdlbkjypfkrkzks6iojcgah55oxp6bgejgw9qfdctxwvic',
                flowInterfaceNamespace: 'yxru4yn150bde87ou2rnftrlr47q107ktql97tprelozl56pvh9scq9dx5vbgyv07uhf794q1n21739omgy3twitoot7ls7ve5dsxinwdw1tesifl8sgw9kmnety8rlwwpoax2h72urukpbqv40d98g20apfj9g3',
                status: 'CANCELLED',
                detail: 'Beatae vitae nulla ut quis sint eligendi. Quia et voluptatem aperiam consequuntur fugit laboriosam. Mollitia aperiam ab doloremque rerum voluptate hic sed.',
                example: 'so4iouqvyaaa5yb44zew97bogmllv1ggi0zj8kpexcvu9kzrk6d8b9d1u6q29dgejap1kyum2vy0c3lgbfgqrvs1d3hjp8jfhly1ozcmg4ezhfnjhrrkjvhc7pak057f6so4ps0mc1l1d85wjip1rmviinsvpfmr',
                startTimeAt: '2020-08-04 04:01:21',
                direction: 'INBOUND',
                errorCategory: 'i210pl6n2476msycp2e4lmhch433vuwboux22xcc0mh4o1d05htgnxab0ob2cgssmbf3etyaqzuap7u4qcod9d3pubo74jpluxxkah7n0sykuea80c5qxkf3ih3ni5kam0tia86vv7m5s7yev3mzs1gflgm5qed8',
                errorCode: 'uus5hqz0xlz736vfxm8hxmpcgvbktqxwmnp67o5369uqmbe68p',
                errorLabel: 892107,
                node: 6623287683,
                protocol: 'i1s91phqy6rgwb8r4yth',
                qualityOfService: 'grep4hubfw7mhyjzftjs',
                receiverParty: 'ocoafkw4odl7a52h49hovbvcx1u1d24ahaudrklonhymajyybhmqyhox4rew2ebx6cahf9axdy3quh1n0p2x0ifywpszc1k2v80dgwijtuzxfwwps96kl99iorb3066wmzvah01jxbwfqn96m7d9txoakzqyrc8z',
                receiverComponent: 'vl0x36bvd14mvh9v3mpl5gvyppicla2vhdlurfjhez68lpd5r8e8log8g9eztx0uw975mha8xkdglal1uefpwmyp35lv4c16br881wwjwerrreo4nvy8kv1pfwjmpj5e9ku6zqovdv35dm3thatqn8hltdk6952z',
                receiverInterface: 'dpo7agbscydhn02unz6f2ct9t7kakahhk6fqqsf3pofpbocp0yy8p4w32yhtmaxjrfj629jxiha80keglfmbpk53s3y34dm4ctjt4aztlas9rs0es2q5q0gk19uv4d7wijcrmi8c6igbe4trmi445rm0fqplbwhlw',
                receiverInterfaceNamespace: 'e676vlfvz4ougoagfthvb1r4l05hsgq3g6850atlhqcl0m8b89g1eneabp3m5dq5w46p81e74mruf40ufznw5ekvoh3c2c5afxgjv5mi3ycqgf17kzk0znf21yx3w86d6pcr55ogzhc7ik1gbrt8m7t5yya7i9nv',
                retries: 3535801401,
                size: 3957448200,
                timesFailed: 4380830569,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'uhm7ky4dqs5hyuu42xfrl63ipgitldit7gosf8jkuyuqklfl38',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '1tqz9ycgq9cp4ujvg1ou',
                scenario: 'tg58951trq46tm93jjcm9lfgy54bkumpwy1j7vzbok8zx7px27gxek4ta33f',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:58:57',
                executionMonitoringStartAt: '2020-08-04 10:07:26',
                executionMonitoringEndAt: '2020-08-04 01:45:13',
                flowHash: 'kecsmkpegc1c41ukwwm1vo0yd8w284lxim2try7o',
                flowParty: '72y0r4jdixtcc28bhc32inzu0w73o1jjqkig3bjv7kcia4iwlp7sdzze5ij53j4s8c6agom6wl0g91pluz3l6mazn39qrpadg8ap19iv45sgktcj1bci2o17hq3inwxrppsr39cdck7h64lexjdn5h9vzqf3jwca',
                flowComponent: 'xkqc53wkrf274ggwkgl7ur7bux7u7gm1z15ktsbc8d9gonlr1sehcjf8l1w61klx4pcfcmyo2ycdctkkczgxz4vprhcwfobayreqcv2eo4a82r9sdlgvlwfg7r52l92mt6p4ca93kx2pvyakliwqe9nzuh7njbd5',
                flowInterfaceName: 'ogouuzsqnfopb1fa6yhl4mr0lzqallssbtg1m1am8mt4ny6xs2dl1ieurtoxzxduuy7w8offof8osajqbdil4qw5cmzp4jsz0mdsq2rzefsp937b8t3cc8d3g77ua8jome79ck6m0vmj4sfoazz97gntq10bura9',
                flowInterfaceNamespace: '8so6lfa4s9qbo104j0qcfi0n8q4vhus8qwqoy2s2hnpffsol6199z30wid908g46uapdvnt3q00zc86ids0fg97ppj6zdkudb28eabsrlxya3p4fzzxlqbx28rloyyh9aw24tvqfip9ifigwa4sr7h7fikxnshqf',
                status: 'SUCCESS',
                detail: 'Suscipit quo non impedit ipsum quidem quia eos maxime neque. Et ad soluta quibusdam qui consequatur aliquid. Sunt ad et labore ipsum maiores facilis. Quis minima modi et facere provident aut.',
                example: 'yfrglqrbufrweo2jkb3vp99xtaon121wkox0b9m5lel0czj3jwgd8gm9gpuo4c4546glj9qx73d79erdglt9ej17vl5qefbyl2hul6azk3i5v0la9bs6brh8aqmjrhvvx61cgm2gl4jvz7p2hhae0z6g9ql7zi0f',
                startTimeAt: '2020-08-04 01:47:58',
                direction: 'OUTBOUND',
                errorCategory: 'fv047pwdeemp7oljo9rmnfe5x8o0e998yocqtmw8lwbqmd900fe2asx1m3c19mq4xs13qjh97h1eq633bmorugn94tkz7wt8ahy6wig6agulbfmrjb8eypyj2uqizuffcytdt0m0ol56my3k160ru3e08ebw7dpa',
                errorCode: 'afenbitoldu54xjq88f1gxldgzva3fyy0u49vvy2fqsrxj1n4i',
                errorLabel: 735914,
                node: 5304639551,
                protocol: 'nx845vxa8b50l1vtbhqy',
                qualityOfService: 'k503o8p07dg0akvaz6qo',
                receiverParty: 'rdyptdl2uxrak99b2lw7hhqg5b428956t8ezugngq0b9qwpkipw5vfr9m4c6040ioxqxif7xhlhfdfejwl20o39nbqk3byzwadj85y17t6bzo5qn3ow3x6wgumoo4kovjf1xy9im5hs9pr54tiajvczmc853h1io',
                receiverComponent: '41ej61dkd74at3o02x142b1uq896u1lrq80apqpitptxbi1qzch5xqy7xjnexk9ur54umld8rs7a9intnngjhdb3gurxe84wfp96fvtde3vmrpopo9lpolrhanajpgmyohxirzaay27d0kksa1msiikwfj7e91cw',
                receiverInterface: '0rd01bj3jhga1qf1a4gzp0czku9c0zc57f9m8pjb9fcoe994djq4f0swj1k25drgwz1sx29a7e5phf3z7e59n44wvcm7fct9lw87zow4wewgf2xvbiuxb407sk2hcfw3sa4j31yf5ylnvf4qj0k7rh9hey3wfzqs',
                receiverInterfaceNamespace: 'avzahymdazznb66l89uben5w1z5xxnhfjac518251kdqhhobuw41v6x5qp4c7areix4gb4f2p4x9c724arq87hdpc0x9zekrp8du7rwj17ygfjck7bl5a7w8c3pxssf9rqql19p0ls2l48tyozm6xuzodb4buvelw',
                retries: 5788312015,
                size: 8256522550,
                timesFailed: 7673270564,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '5h4chog479dvnobqbe2crwornq35uc3jgszb0y9dawdd3qpa2j',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'vlk3jdr8m9vfm1vnwp12',
                scenario: 'cx2470q61wzhas00tla4r3dnw3xd8lp0nyr6s8tgguwsr5e6i41hxmu3xc2d',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:40:56',
                executionMonitoringStartAt: '2020-08-04 11:53:24',
                executionMonitoringEndAt: '2020-08-03 23:53:41',
                flowHash: 'vicmp5x1upcgw89oeq8eyc94ltoul74obmmda425',
                flowParty: 'gd3jxjh23zuwv7zje117vt76dg0c7w0aoqo7gbrsmadqs026vq545kk7hpwlz43rxd3nvebbxo2wofms92kjpzan2xngi6gdftjtvl1cm69rsh2ziofo1c3qjohkwi6jmaz9iagateajrhrk15xhzjj965gp54dg',
                flowComponent: 'bags0w43poz8z6ccre5w1d6r47xaqxirdb4mqbb8l8gys0ozlhw5hc9ayaug50skpduug1jvpbk13wyjnatwed94u2o1uaztyuimchffcg2gpdk2ssr6m693vy1336d3vj5x8rbno3v6tmybhqrjtboa6lbqyw25',
                flowInterfaceName: 'owo6tw7wbuyu95fqqwmibpje0jbud8ifw6dozbcy6e75kub0qbmpkqdjkqgpr11a4esmp9g6fc7fh0lu37wuqepqhduvj0vqx5tmc23iwyl3902pxyuon179y4qo2yes17td9rgs3ebd4dxut95wfaatf1rc9vwa',
                flowInterfaceNamespace: 'kryxepet6q8gfr25b5sb19511x6gkotrcxwhe87nm45j9odd6cedpz9zee5hcu4vomx381fuswiqcwvfkmvhp2rpupipdet56cxmr7epwps8xulf3n30sv3ehioinzwyevrd8coj5hjzzosp8es8uymuvkh3lbsq',
                status: 'WAITING',
                detail: 'Quis nemo ea. Asperiores nemo nemo quo et voluptatem aut perspiciatis est aspernatur. Autem esse voluptatibus exercitationem voluptatem sed quasi qui eos hic. Commodi aut quaerat eum aliquam voluptatem voluptatibus quod. In minima eum inventore dolorem officia sunt.',
                example: 'uyrfq50gbk2j9elxsvbr3zlyembhtn10fklhk4h9ayj88ria3pvmwpmpvkhvt6dyactxdhl2r0mnjs1phmj87dda8dmls3z2wn6uv96m9hd59bkzsotatajmiljfcuoxqkddgnlpb81izz8pb149wt3l0rvkm8kf',
                startTimeAt: '2020-08-04 06:15:22',
                direction: 'INBOUND',
                errorCategory: 'doolejq6pz7h7sajroka4ly4zhqayd7lzs1xf323lgo7v0nmvkr9eneysujmvrm57afsfgasq11yxgw793lv8mwajs9wdb4srpmjmj2z77tny4xfse9buc0oo2iv425rtvaoeuf3a5il7y3a5s8kaeikbs8rhsej',
                errorCode: 'qkzpkhkwpqhhtqv92p94kzuqh4hbb3m2s5qxqnp6s9ciue5sfl',
                errorLabel: 909331,
                node: 6507160695,
                protocol: '4uo5deou4vav9yc7zmho',
                qualityOfService: 'f5dhy1rz1fmi8ujvy1a9',
                receiverParty: '539v3nd5wcyggatxvlb05lgqatcx3c47iy28cv8a7rs1o8saodiubvgvg1ajignhuvycsx5qzpa49kdzb1wsy5izrijogdmd1uezlv8biiy93td2glm5u0qeeu3v8dub79r4y3f0t63q7s8arqj6j8li5nylrh39',
                receiverComponent: 'tgmvx8ysrgbd9naojdxfy5n3u47gzdhhdhpcbi9ax0hr9gnpe2v2e12jjgvrcwbpazaok0y3lyyosgn8w1zsxfoltba3lxp7njaa5pepg6azblgc2dtfdjwbadkpxi6s2dobmpj272i1qs61hktw2ucj0tz3i1nw',
                receiverInterface: 'fzpnn45sy3z8wjjxsbn42qophg4cca122pva4stqhm17l6h947qqeot9dlmlhsthvtkplroiuo41qyvtr4pxgg9m2ka2atnhb59737aytzw3xzkghxox3l5lit89ffjl9m9e44f0cldcc8j27f9n6t87fhieel7n',
                receiverInterfaceNamespace: 'qeo8qxzfo9s7sde01v3h2zkk712cg2y74aqkpjvo6eerg6o5oy4o358muvw8tucbzfsw0c5ezsu8l1hs48ad51jv1hm0uksv85qsr6h28e0sgwilgb32fruj0ap60v4oaibr29kfog8kupuaimm1gif530sbkvhb',
                retries: 55266375303,
                size: 9716952834,
                timesFailed: 5670524069,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'ow00h3jj4elaz21va7t6nn3d5nrxpkmt05kyturepl93b6lulp',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'yv7fu48vfps4o8tsc36b',
                scenario: 'q63um6kduce5xrg1aqhx0843kds36v3f0e8zl3jqjm4yx271u6rrw3kqsxit',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 00:18:11',
                executionMonitoringStartAt: '2020-08-03 18:04:25',
                executionMonitoringEndAt: '2020-08-03 18:29:40',
                flowHash: '8vtu1g8fzwb7mjif22mjojyju091mrppfujyf91q',
                flowParty: 'eyyt7fa70mx6dfqvwd2nagsp9a39jod9s69fpl802idecue5y135am6cnguabgdge3puj534d4twno03x09shjhvrxin20kp92vi2en42rhd631z4mvnjhdsqx2zxmpbiscr5bvj0vr4tmov7qyo5jysbtcao75q',
                flowComponent: 'v4gmnuxp3eqw5ezzvyzxxysg9sqvgrju0jheh7rdsnl0iiag5yd7gsj2a02goisus673lexey7gxey0ls9lycblg8eiwahvp2q0zvr9he52vtadp20zn02z7d16scnzb8awm1b4imo09gvbnqhi8q0qomqcqnylk',
                flowInterfaceName: '3c5xuwyho3galdkawx684mortqezrfls5576b4kxteb3cl1vz6tq5elq3ydt04balj55p44kr44ocr8id8hkjnit7rd85hgnecd2h457m2jpyl2wgwnngixavzmsqoasqwoejlmzg63ezjx3tq4pih2yk6dsd19h',
                flowInterfaceNamespace: 'qo7oan9wftx19x51fid18pfyo57obhnrb8xnyzfkquyah3qt8m6ivlvyzk0vwc1djbmruqkljz7hgl482vxqkd2johouwu6xdnsngfgx1c9l9vzbg2w7e4pdtal02pjh7uyijp39w0dj6c6c71iketln8wc2yzb5',
                status: 'TO_BE_DELIVERED',
                detail: 'Architecto blanditiis at. Quis qui et consequatur a similique non perspiciatis aut. Qui quaerat tempore eum dolor molestias iure tempora ut amet. Doloribus soluta sed eveniet et animi qui. Labore sunt commodi provident ut. Natus molestias consequatur temporibus veniam corporis non quia sint tempora.',
                example: 'uqhylq1evxczcdpmxvu3wqzvl8e32f0p76vrm6ibznd6png2m5vaj4pcevuk3g2bzh5s7pbhj7d38epj969lttjr9tw24rbxf68fl0rrjkmzp7y406jaum6nnxmogdvj3v0lt82l4g4wacirpzbo6ee7yp3o280m',
                startTimeAt: '2020-08-04 13:38:29',
                direction: 'INBOUND',
                errorCategory: 'hdsmuur6kvclx6ovj3q51sd749e1iu7w7ca5n8qkkfi8hhqnx2chkqa64tg0to3jwgo0uzun1c5wn9175lhyvarzyn0mr8xizqtvedt13yuvvvhiszgp44eowfhv70anlvtdv6tlcz5sjx8700lygss9lps15mmu',
                errorCode: 'vgg8dxza4r4990zg8bz4rlda0yd51wdev75dgnoqnbfajs034h',
                errorLabel: 116298,
                node: 5565438404,
                protocol: 'zpx4v2q1mdjmg0utc84x',
                qualityOfService: 'pvqbb8z8v8s1lu0pyea0',
                receiverParty: 'aehgvkj5oxsy32seb2o7yr99xq1ry1vhlttwvsta5gjzxksq2p8sc48t74a1sryd0fu7xzuqnris6sd8hw1oxvkf7g0awo001hpjvz3zsbb69th9r0mv7zu9sp7lggb4hf00dssk6ib1yphll0yoohq752m5caxu',
                receiverComponent: 'i5t61em1ktqo3bm3o03iadohc5neyug5xu3n0mnjr7ntbw1dgnc0ygqxfw6r1er97oij16as7gse998ee23v7yotsraf4n0sv4p4li4sdt0hzihuxeos8cccbroogsq163cduxo1gsc7tixdexmzw5ej0qsvk34y',
                receiverInterface: 'tcs7y34wwdg7ugq90dqseb7cwvn3vyi0v3ufrdb2hfvw4fb7z495kb5cb2hx57m7oft0r7acg9uwimrgxqmzrbmwu13ey6eumj3imvrk23fdaj1yhu5m8nnf7cjva96697aibzglhg5a8ypv239ag1su26rqhzg2',
                receiverInterfaceNamespace: '72uu5mqszqt7i5uiylub5qt8fp6wvo3tq70lb2i7cji72i7di2yqti66dwlbco4xlq3mgot60efvp4cre3a4evlckxi9cb94zw2uemykivyzmshq3e4pmked3rv6a332h6sg03t02a07shxhchf9t2xdd7iai9u8',
                retries: 6879503155,
                size: 45307743954,
                timesFailed: 3343018480,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'hzq0r6lk62e7q3sczifjwll2qsp90klfinx2kz9c1tfyuz5v6i',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '5xyvlm3m3l252st1lygq',
                scenario: '5g68uhnbh75t9j48iy89b18blj72f6ounwr2ciwybmjmav01b5083e2h1b86',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:44:48',
                executionMonitoringStartAt: '2020-08-04 13:38:24',
                executionMonitoringEndAt: '2020-08-04 06:49:20',
                flowHash: 'qgfuim9ybgsrxkcw95634lpuaivbd12jwbcjzsin',
                flowParty: 'er271njtlrj36cuiwp4g08i62aoymmjrutf6m6y9lvm1wwqhtgtu5rrdi0bv3fvflmyoqwklhdqrq9xwhuz4d308ra8inhnn2fgqt7t7cdskm7i5z8s9o5qdckx0pz2qn7v5d5d4qkyxbjd473xd1fco0axvfimf',
                flowComponent: 'riyz7wcu15xp82df4x5s8e43wgi84xpasfff3797v05lm44cjsk7gm9f26s8u40rxwto6juqsgrze2ftxjrxf6fcgqpv76zhc4zi3smg16aiixc3qaq9odt4rzuohw30frq5gbeh35mpf6d7c4md1hn1bctk1u35',
                flowInterfaceName: 'nv1bzjdwttika7tuczim6wl531xkg565m3jjq4gy7wb5lj1rsaso46a4t4kloo4tdohpw25xpl152cax20idfmi534yl4t700cnekxes4fnoyve6yltp53gr0yr2nvvzhgjdw0ug07tgwpzgixzbuwkem2krzkfj',
                flowInterfaceNamespace: 'yannumwtpvl52x68d006p1ro6upw6l06f7b1ped4wau00ilpvksmtgo4v88kn010qf8h98rkukyv3uw70qzoedzb84whl25p0pfol3d5hmja91riudxewfiuwu5eeprvgxzs9kqccipomju0s6dpkw2yecksghpo',
                status: 'CANCELLED',
                detail: 'Aperiam doloribus officiis tenetur aut dolor dolorem illo necessitatibus odit. Inventore qui dicta ipsa officiis sunt rerum quidem commodi. Officiis placeat saepe sunt et veritatis iusto aliquam voluptatem adipisci.',
                example: '72ilbsvb3tibry638wyxw1x9zmkjmfg6u9j5yry751y2rmqr8d72cmshr83y3ecn49ro5vt6wfvcgotxoj2tyeacu6bif22ub59ou2iomqnqqw9flt4oofhuqsb7k8hh56sv6hgki1mgm8bxfu7i21qdg7reml7q',
                startTimeAt: '2020-08-03 14:51:00',
                direction: 'INBOUND',
                errorCategory: 'pkc4h0nitwk7chd745eaalf3w7zdosfqobvp3c6oeg20ergp66u2ay8tivuglevuoi9xrew4vsf51znqohif8u2qerq4uz386coso62em4fxd557rjsawuboe2ss6ngncbhhgza7v0rtzimpk294fnlkypimyted',
                errorCode: 'e2rajln7nykb2etzhyr8zt7eeog0c4lc1c2df5g5ykwj4op2ec',
                errorLabel: 189683,
                node: 7120788824,
                protocol: 'h25xxljsb5h3itblfixu',
                qualityOfService: 'jn3d0utwx9q79243v6ik',
                receiverParty: 'awy0aetgt1v4zgxa88yt0trb96nnj7tcoz3hegd2whqk1hajzvqfv09ywyrilytz4tri2hiv9o1n95tj9ep724n3tww475rqrxyma6iob10c5km6ojf7uosxdczei8do85asr05tym4h8ax8ulfvap31dpaxms46',
                receiverComponent: '0lnyrhpw7bc6iw7m3luq6l3eas4s1qvdczzw3v5umkw618frf661pst61orj88ufcbm96m2mu8nhblvxmeoj9jwnfu3gzuzwpaots7wds8t0b1jidcpmbu6u7v0snse8v0itdlndwi4s5woke33px2ege3nhex5q',
                receiverInterface: '3e6qjve3d5k49rp8vwuj3jehqsx37btfoxm4mdhrmxf4dp7mv16o8yi3qt4dhikcz9oazbfhjafqirvgibswqbn21tfiyea3g9r5pyppkc5ajeow9xbh6op1vzi567z903qfi4xxi15gcri1yorlt3o2orr1hgkc',
                receiverInterfaceNamespace: 'c3l3n2y1hyltupvk9xykm2lpkvscayiq24w2ngevczbm640fx77mmzigk68mtf4ocxoyb8m6r8dzzhjo6u4i5slk15dv0vyhij0gr9ddhvxh0q24r484l95edf1jds2tssrroocnschst8u2nh5j7mtadzlby2jq',
                retries: 8649523242,
                size: 4995776917,
                timesFailed: 44990422918,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'iw303d1sjc9uaij7bhgjpozzyt2ejuhluddp5zr1jz2bluwff1',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'z9wx53ssqdetcsuofu4x',
                scenario: 'gybt9agtse4yg7afnj1b77degkb7tpvu8jchpc24p8reni399j6enxq464vx',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:03:33',
                executionMonitoringStartAt: '2020-08-03 23:18:38',
                executionMonitoringEndAt: '2020-08-03 17:01:10',
                flowHash: 'sdbe07ffmhcyxfa1dwe8hf24r4aqq9f7r3zet5py',
                flowParty: '2v62o9g0wdjg71166t58i09q5ll05fqyfji0f1sd9edlj6ytiznjdwgw3aqsgshpnuhr6co50d6m152wtxt2dmxgk8uirpbl8xfch8bz1bez8yxznm47s1z3mzx835l806v8n82eam5pt3gisy31dbxju3103dp1',
                flowComponent: 'kcxjeec61xtyc9zap831o1rs1bm66668u2j10py8djuvbxk3ie7xmpiw57gvflrmbv4j9k1rlspwevg4zhoe106l38qm6riu4rptw05fc1t0nlqb0e6mmv9ee9kk4ki9n009yop1uerieohaz8exr8pl4582irnj',
                flowInterfaceName: '937cfygrotd5atflcy6a0whji2efp56ox6q29csp3t924fkdojm9eio1vwt0e66ecmvc3a1lnei9z3audui1cl5kpuobatemz78yy0dhh3o60mn1hv0m4nbcbh2lyy869in55cbi3h2v9rtqxxjj82jc1i0xw879',
                flowInterfaceNamespace: 'xu9rd4pttaq49arq9oixh7hemxme7dadtz9l9zlww7b18sotg70wyagivfvng021ixwb0gdek7u40ro4dcbcxl8vofxvhpeo6g54kipovi9ro96zpp9m3qtrgh151irvlahct1chds47rfpumvm8m9ypyxzcwbpy',
                status: 'TO_BE_DELIVERED',
                detail: 'Adipisci ipsam amet enim id necessitatibus ab ab eum sequi. Labore enim dolores aut numquam sapiente et. Eius dolor delectus et odio non rerum rerum ut consequuntur. Ex distinctio ad aliquam repellendus nihil. Et accusamus occaecati. Labore rerum illo voluptas.',
                example: 'buhh9yfmqx5mfuxlp09yyy7plfpridm90x33rzlfq97iuv4apq6ipf6nzcdrse97qwwidf4vcf3jx4fw0zqr7cgh6yssz9pczp9u0eajnpdo78soqyl1oq3to3xfygui2zulh9bnniuengtcp4bi7fquvp0esllv',
                startTimeAt: '2020-08-04 13:22:14',
                direction: 'INBOUND',
                errorCategory: '812xfr2rhf0n2wnhwcq3vjsgfotdas9nwixsrzatr3ld1cxgr8ajjzdzd95oqj69sh0oyv8xapki0m5ruvobwmml7veg7eig1cvvby0ohp1qnos7532ldrrhhtym0h37riggzl0i8poznfb0fvradjxha0a7gr0m',
                errorCode: 'd8oz2n77vy95ag66p638n2gf1thjz18y1qdety51vn815a8h0v',
                errorLabel: 131250,
                node: -9,
                protocol: 'c83zcew4pjnwxi1a0vse',
                qualityOfService: 'd4is9ourod7q16zq5jd1',
                receiverParty: 'x9lhaexe1b3ou9l1xbqg7i2hmlns2kwi14s0hf2j1ftuyimchhbuobn9sikm4b536xns0lz9ou9g1qz4bwefe52qx6kw7g36jsnxq1aich6l0ua5q1uczxa6ymt1kmwmr8ycrtjyutfx21dtfot5gj22z9k4e8ra',
                receiverComponent: '3fxt2rrzrhc25gkhmkcixfgm2y5kbevhwquwgoj5pvan7biwyrf8sppngrhasiejwxw7hh7ifotlnlpp9qip4x5nzk3dp843jr7jv8mhwj3xmqk8nvplilmslhz6htzdp9al88hbpts025ws6zdo0xypaetu7vhq',
                receiverInterface: '1ncdea6li96ai2d9dysete0cc8m4w775w3of258pcs2ney3f3scqm7h43l75kgph3fxnm1yg07r1d4dc06c7ghmjrlie9loe3ijxpu7wrum6wvmz8yman49g5nrp6mdejfl9m6zftzeoyoxa0l50dail6ls47cch',
                receiverInterfaceNamespace: '7t0zebv6fpgf2tdvzt8aecpae4hwgqjkk9hmqlx6sufqg32r6qja7ki03oyuayencinute5i9jawekggg68v5g6q9oaffu6ursf6nzb6i2naxxxiieoiit3dw9co8980xgdwzlxdnyrz9163zd3jucyaybdob93v',
                retries: 5707971727,
                size: 7542843572,
                timesFailed: 1601219493,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'sjqmzlqtzdzob6yp47e3qz0rv1aog7xpgdb51ktacvklkmxfi8',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'xdjbybboxqan3zcel6v4',
                scenario: 'hhdbcz50l013c1jq89hn7u55efw7uy3tj87v3vfr4wqu2wuwddkjpla4ad98',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 04:10:21',
                executionMonitoringStartAt: '2020-08-04 01:37:13',
                executionMonitoringEndAt: '2020-08-03 22:21:34',
                flowHash: 'gt0qaanfbaj737nk52p4j145hv1d1x8f7920thi1',
                flowParty: 'e18fhi17y3ie0lt3o8fgsmyn081ol2fk6adns5xqj77hot3na53orc3flbop4486tsgtc95xc5zqg2es23ygvsg9p84ug0z8jccv3jdwie1ns1yfntfnb1celum50y96wdcakfuuh0qgui1d7am3jgwb9lyy6hi3',
                flowComponent: '0uqrvv4fu7o2ql8ko0c5kba83s8hdbszawygobteb6h3ke3z2yc0bged5qdwq6ismvqecxcnp6ga9ev4b2psiuu3rs6ky9byngtecnap8r79nlvjo7aod1zzi68i1elmhukuoxtb015m8p51su0dq8905f23f89g',
                flowInterfaceName: 'xl7pl9gk60wa064qq0j64xshn5snlu9e6imqzgkxh0oeusaudx43vkupo1kfwohi871my0lba9zda0v6l2boz4qf2q1vq5x4jrriwrnegulqnwsh315ve04m3ed9fvyxzlw93aodcr18i62lirac5e0jrs1out58',
                flowInterfaceNamespace: 'twlv6e5wqp4qyhwmkgoa8vcpkysho7pk43nzzva8qzvhzwidcapynaujxtoz6z8lvsvlpfhey976f231v70uzfu0un5zur8dxq8f1hpxkzl3rpseys7j6k9u2zwnfwp5izoxs7yr212f6r07h8705qme10mzdtil',
                status: 'ERROR',
                detail: 'Debitis amet tenetur doloremque aut repellat et fuga placeat. Voluptas quae amet. Assumenda possimus qui labore eligendi et. Harum aut adipisci minus tempore eaque perspiciatis officia eum. Ullam nobis occaecati. Consequatur molestiae nihil quo consequatur eveniet ipsam totam cumque.',
                example: '1uivjrjfm2k400zjfue9ky28gg4pdm8o25u2asmn7qmcvf9bwncsfae30o6o2o3hl1jj6pj1a12eslmc2vone9d16s4f2r59wwytvxgugnkfniktrpt6v333randgtkj30h09y4vdqj9xivp2v9466k8v9c9fyv2',
                startTimeAt: '2020-08-04 11:37:10',
                direction: 'OUTBOUND',
                errorCategory: 'is6gzddw3ds1r8o4rxtuszgkac1b54ly04qi8qoicas60k84llbncs9in1v3iewtiq1g0z91j67ofjl1r9u80rosqc50u44k3muyai8x9zb6eyuuea2etu3e1xm3i30ftfx27q5ae5ghxz4sfc3bg7p4gbjso6ik',
                errorCode: 'dtip1ee0w1nbo0ak3d6rrpnt2q7jc9bgukuswhmc1pv9m3pkec',
                errorLabel: 598490,
                node: 1686130872,
                protocol: '1iqxb4h3y8xg22q29k9x',
                qualityOfService: '5mbdt39crs1cloppr7go',
                receiverParty: 'qjxt1dwv6yc45lykr6apazqztq1hcpju2238bp7davgq9ye397tm09m3ks6p0dgli13mhoheewyd4mssy75oop42eh6m1iv1s76kpirihzn2tvsemzraxnxhrxq811cacwzl40anhaxcvf1mysweb3qikhfnm18a',
                receiverComponent: 'fxlhybn6yplvvpfygx1mkry8tqsu9tkxvrwejy4cugkj9kj98wzgrhdde7oha8vzfny4ame2fa0eiuilf63jdnooqn0rxa7uzopqtdtdn3taniktkgyp4x7fi4mxgcjdszancvuihogho8ntd9nk8xk3xr7s15vl',
                receiverInterface: '0pezjet91bxbu93oh5ru9flfhn3gqu1uz4lrjmf49nqfw99piuqevkqrxqnb3x6bdlf1c38jxuaxlyz31ptcs8id48dihuaw6p4srg7wbndng601hpepvf76dm74cm9wmhvlekd3s799p9vx5m3ag0xzme2rtemy',
                receiverInterfaceNamespace: 'rk3i76vydhijow7zlju2oy9zj3tzg0swi3h7ihgidkb1g7saxlykdobs6t6znoyl7hharsj179uk7q3hga57ds6ewcldpnfzbuqijlobkoeu59oo397bfqgv6k7j1avg38tdwvgpu9ytpzipvx6yvtw98o10c698',
                retries: -9,
                size: 5933528737,
                timesFailed: 9164933349,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'aeqjiy77h0lrfnzvrz94xobpq90rum2nvm974ipd9nt4uf8139',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'pp2jdzqerymxz8fjtf2z',
                scenario: 'sxgtjox926dpo867sepv0dkkrbuv2uwrij1y59vu5n50800i6etwwwvms0ej',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:24:12',
                executionMonitoringStartAt: '2020-08-04 03:06:10',
                executionMonitoringEndAt: '2020-08-04 04:54:04',
                flowHash: 'e26k3uqzjtm3capp06kyyuatfkyuugfu2jqlxa16',
                flowParty: '3j0b56sf9mx3xjhmow5cgmg81cl7wymnlo5eweclg2c0k3xka0dfnfi0nvvnsryi1vtg3mvgrb3m0mu35rsjm21ek3izoyoryutqt5d2d0l8djrs8jog4w9okc8jgta9ypf5iyjnkvhl5ffgjiqsfz4xh93lo5ma',
                flowComponent: 'o9hxfgru3vfbm066rzoez7ocvkyg1hmfpupnncwpal4z6idt4eq0eoxhw0ail04cgpi5o4z5j5g2oqjww5pj8n7c649nv44de04fdbgurti3y4dwph16ltwdlo6kt99dngowz3xknrak9wsor35q49x0cu5kuzcq',
                flowInterfaceName: 'kwk1oahocvae8pqlceoyi3miwjj8bcwotd4pth3jnu3z602x8lifcfj7ul0v0rj0me9jkqksathnqw5w9a88he3z8zu9jrdqtkq9ap4b4ry0k2e6y2x25kxmq3xj4ba7u4xy78ufbd43icpheqwlchygdmim4zks',
                flowInterfaceNamespace: 'cqds5xwls119n1hkf3xn2vg7pps1o30mk30mnqurbc1pvnp8e4r2914l50z1tb0ljgyvfk6zw2mxm3xqk7bonoaj7pgxfy9w0s10a3hqqsnv9j1r21ty4xijvp6wqtdrajpvsbvyd7byptpqsbgtnpig46kz9n63',
                status: 'SUCCESS',
                detail: 'Reprehenderit dolor commodi veniam sunt voluptas consequuntur eos aspernatur. Natus quasi omnis non laboriosam corrupti. Voluptatem suscipit molestias veritatis rerum. Repudiandae delectus nesciunt omnis qui aliquid eum sequi dolor. Dolorum ab est aut ratione rerum enim quaerat molestias eos. Iure vel quo.',
                example: 'uag10fk9dzhjsfyh3iwqsdp62f15ufwsadoqm79fmrd88p9ggu8hidv29t6sjis7091a7aanougp3dwf8jz6eq4nm2lt4mp5yxo7rdsjovrgcru99r7e95ctbymhp524zfbiwm905voaqy3nqc9ty9cwhsxgt8lg',
                startTimeAt: '2020-08-03 18:02:36',
                direction: 'INBOUND',
                errorCategory: 'yj2nsrdyu67df41gpi47l8ywj4kj1zg31rg3x01ss9icj6k2wb6f5hligvk26jb0i44p5y8diy3t4ozxzgw5co6k1rmzgc9l9co4m88hs4df642vv4ew3hsxeigwm2s4e55w5h26dc05dl8t1xytvmev0g1niyqm',
                errorCode: 'fb6fhl3njpczqx0mrzvbx4r6qntplpirkgwmhmdymwkgj0ziq0',
                errorLabel: 215267,
                node: 3706499166,
                protocol: '5yalcyxc2m14w4petbf2',
                qualityOfService: 'yolfkhuspz2t6rfk69w0',
                receiverParty: 'qra5jquuici9ka5jpqxz9hvi9sfw0akt7qzbm6todmlktq7og0072hlorl0lcy5620yam9zyz6kq1cxrbl29qrdvnqa3xf0tji7g99kndnlvckf6qxj21wj3xk5pug8ylb1y882c1pxav4uqjkkyidczup2k009h',
                receiverComponent: '27j6v8my0ub76gfcji3owpukc7il98q28od7lkfsb29zf7q15sagyyblzs7vah4mm0s01nikpsj96vhkqp1s05zpf6j2c7ctjkd70d8vp16fosjrsqq9t841loiky5k62bi5r5a41vhz993700qvxl3wj5hwomu6',
                receiverInterface: '8pwdj4bontzinzrf9b7o8sexfdligov4hyxnx9tz9c5zf47rvv5qb9umtz37aicgt3uqxq96lmx1vziyh2wik2ulesaznix1wxtm2p7k0scboi8gosoec6ytx3p07bn6grj00zu1z0iyh93x1loqcqlnyqo4vyn6',
                receiverInterfaceNamespace: '5wcsuq1061wv4w075ddd1rmi5bo1qkfaveimle8k0g67n7cwy816u78z0sh8tnzeksv2xa4x79ofr8z0nm0cagrarsdp1tuopo7pb5piy0dl7zx9z5sj7qd7cyf1m8449whgbd9uf1fu7ehlfh90mc65vnbzv7wh',
                retries: 1349888155,
                size: -9,
                timesFailed: 4643874432,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '5twb8bwd420ydohn9jzsntuxt0zhina1bnynpzih14kxkhkdjq',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '1a0p1fafayagixrxhf0w',
                scenario: 'hchgyz5cpnlhlqvd5371ynckh66tkiwdccbo3jprv0koyqyyiz2qvq15bj1p',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:02:30',
                executionMonitoringStartAt: '2020-08-04 04:50:22',
                executionMonitoringEndAt: '2020-08-04 12:36:23',
                flowHash: 'wn6l98v3o3dk9m1v5x55stqcvdk16oev5guwelju',
                flowParty: 'ig4uuj7d97uiytl8jn8slq91oowdbevis6j80nxdcmq3kl4vhzpd4o5wz2fx970ufoxxamoqoyacs93pbmherkabn66g40broumcpfvugep0zglfolq4s2ep5pzycdkou6917vmhv6hk2hb1h6a42bly0co5slt7',
                flowComponent: 'xaxk09pcrfgsvryvoyhgovtleml3slm6eqo6bwizcv5acpkn0pg3pbf2o33h8sluf3v3k1i9cdk73hlfc8w0ufuxktrxox4wyt75ecfg47dd340g4r3g0v25ucl4c0pczupy78gerbzhyldqy7ywgzat84ty0s1f',
                flowInterfaceName: '6s6iepb10vghmszijpv2oh32l97km3927byh5e8kmjea3pk95i6r9wxytdnxsh37uda3p82dvl5furiy5x6nfoby4rutd2zt394da2r1haibz3rhpmb0lpnjkyo2jyo33be4v82jwygvn5fuie2jdhn9k2mbtldx',
                flowInterfaceNamespace: 'erxfl3bbrl0f4dghhvb7bdy0edy5ea1sg8tscahv5acb8lh932yxbv1k0hpr86tkeh4raome5dnm45brrt246qv9qdwjqt6ib9d9hemscuq727jxqj5zrl7ifkge8jds45itmr92o8auv4hkekhyt13hdnxpnye8',
                status: 'SUCCESS',
                detail: 'Asperiores molestiae omnis vero saepe consequatur rerum voluptas beatae. Voluptatem recusandae et rem voluptatum atque eos qui. Laudantium ipsa reprehenderit dolorem corporis maiores iste. Nihil est eos deserunt cupiditate aut non corrupti quod sint.',
                example: '31jtj5oaownuo4u02w3loab1m20eq6msohok8ik6aoxp7ym5bdqvumixud21qsz8dcoi7jm01im00jcixyjx26jxymu0p7lw9ubgz9xlrraeskwqxpleynh08eno1i0xr98hf0kean856aw8szjm7ytjzfkxvzn2',
                startTimeAt: '2020-08-04 13:01:59',
                direction: 'INBOUND',
                errorCategory: 'fsrivmx928crq1ybnk79h9e5j9zqoarv3elx7ek6jirzsvd0cj70vbebfx7qnum2wsx000lqxzdv4gy4811tm6myqqbdewuth3mxld3mvtusqxyms0ljlyolgiagcqr42b6n5s0hkgzevcjoj3tzetwvvxevvwlo',
                errorCode: 'd5czsmj4tvhum52jupbutojhcprxhxdc78irgtkx64rifmdiej',
                errorLabel: 351312,
                node: 4771112627,
                protocol: 'atblhflc3m4fuxvpvde8',
                qualityOfService: '0gvkoxyg1saegkxvlgvb',
                receiverParty: 'z9qbkwvqea4cgfj2dtc535gea1dcrqamqblxufaxyn6wp63gchehptodjng4b19eng4gl052b5odj3s5gj56wztj51cbx2jewhyue654rzsp0gxqv42bbhgnh12sfwxsk0bk4rnm7skewuwnsf06iz6rsbucmhfc',
                receiverComponent: 'fctnyxllovsl8oxpgav2vhndorwnn3axrvquckddz7jeqyxvf0f3bvjvt54bo8tbfnhc8bmd8d0ezti4u7webg1omyfsxp694spuogbxsamdhh0pf3f3z1d6f37d2n6nz9ci1qvvfzzivyzooxfjis9m583ouucv',
                receiverInterface: 'in49oshq5zy8sjsf3o1e0ci4k3gm7vjmaues8095au8b097fvzdxw2cesvc52uc3q1pt9l4cfbde034nnv34jx3rcruiojl2me72a2jahj0e05s7m4tvqqrij1rw261vjmpwew9zzymwdhmu7712ny209sgmr4xw',
                receiverInterfaceNamespace: '86yw6xjnhkx64hdd03zdvfi3fc7ndqsl817garzc7i84f0v68mk24gvqvp3bemdtfkjyj6cg10h21tbjdh3hd3s1hcgg1rgonvzhlxlc6bqlma5b7thvmw6xyf3002k1ko43jftzaajehvir51lqrxheuhcffnm4',
                retries: 3709172060,
                size: 1347867688,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '0ct8ud1t5lnlt683dhrr0bcn7jgk6qhgtnhxz883mveb92eviy',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'ycjyhcvwmqgedxgwa00z',
                scenario: 'p2t7g60od9ie654rbls7ej5akvqk55x3zoxvnesgix6na5p8j1r583gb8yxc',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-03 18:29:15',
                executionMonitoringStartAt: '2020-08-04 02:22:33',
                executionMonitoringEndAt: '2020-08-04 07:25:44',
                flowHash: 'x63rz7lju8nm6fih7jd6m15v03mq8urce4ga2tkx',
                flowParty: 'v9or01om2jjs6f1m6bpy014agxt2jfi46fm6ke1miaxzw3t0jw6iq717m1ejhrj6lk5y8h4nqa5w50ccuwlsmil7nqwifq13sq8t4ldaesn15zgv4cy25jr93k5u7u287tv5bjn56escu42k2ri55pzeigi8tt8r',
                flowComponent: 'd4ug1yt7m10jcemumvd97gve3z10jioe4bombrp0f5wh17zztyd8iia9h7vx1swhljzqujfkzpwuk13vw736hhnme3nbezz8zcz9b5gu7vcmxo0iddb80ej8yndxj0vyxahjs13q3w74s5zi7r790hhy4ywn8amj',
                flowInterfaceName: '8rbzwm0cqe85mtqvzys2s05apsj6qhw9jadn3ugy0kxe4gsjedh7grwjzztx07k8sw540t1nzlg66xmy6k5fyiwdvujuru5yimtle7cjwxplx5xgmg9tfsuxfti242kripj2oqh6ltdm7taxkdnmurljhkctve5z',
                flowInterfaceNamespace: 'b6i0zzd916fpeiro2o7cwrwmepu41g9vvv4qt9wwu400xrfuzgsqj6obm7qo7x1lhs541ezkbnyorddxhnzmrxt1g3531w9qfuv8gb4arkkuv07mvd9ez0d6ufu7v107m9ei439wik1ml00bfewmgb71pas6xpbo',
                status: 'HOLDING',
                detail: 'Laborum ad voluptatem atque aut aut omnis vel itaque. Voluptas sed quis fugit quis quis id. Consequatur tenetur sit exercitationem. Officia repudiandae reiciendis.',
                example: 'jk0gzm79hbtphrrwb86or3pn1ppaasf29pjz1vualdprzo8kfsvrrz3kun9ii1e6bxcbj1knn9nnghwnkjbcaw4rp431no1kqzg15n1sri0deuqt8sy5u9f3uiy13ol1hivviy8azei1f72wrveylmwlbxe4b1wr',
                startTimeAt: '2020-08-04 10:37:16',
                direction: 'INBOUND',
                errorCategory: '59sjkpo7c3cdctcwhustxggoz2vv4x2div6yzepn1c17sqriz8lm9y2xgzf2ctjz2lrx63hiqp6tw83r930zg5mo2e0guv1sdn9vx4di8d49kcxhx3xnoehot09n90t0tjkskq7158yfxctdve8ytp6ylof0ye1z',
                errorCode: '71o9gdpbootw0u9wemmaawrfgnijjrfyzoglsr48i2j45vyl68',
                errorLabel: 183081,
                node: 5111232815,
                protocol: 'l11dkhu9fawji7jcucf9',
                qualityOfService: 't4alcbqyfqj8t1irvy5y',
                receiverParty: '0m0yrua2d6r0413hdic559ewz1ui21m8wsk87b900uh7i1wzlyfx1h3rdc1zhvjpzmca1ew9ox54h1om4sn2hhvrz6slqixy4qk94x4jxw48ko7quqdorfbq3xhdasyvv6poqpghz12zep5um2soxtjl9meq88j9',
                receiverComponent: 'j736g01ep89renut0pwrhmgknbtb61sbr9lkacldrhg208t7o5nsm6jfrm5jl246hpygov35ijhxbg4d5cmxh0u32jxpasasb0rupmvbt0kr7bt7mtuqwhh0x19rutydy27bigzwsvsj2u7dpujxk42s6y1l6wty',
                receiverInterface: '5acmehsaqiqyd0ukob87wii3okjsrzyjlyeayrmxgjp9bg0v5tjc8g7w4c8opzqdeddi0wxttniv5bkdh5lntg8wf48ven8acq2oepx33e8y294vj0r66hglqf2rjepnijm01n0oqwrexjhyyu63is6i03yyfizg',
                receiverInterfaceNamespace: 'up10n4vz4jesodsv354rnmyoubpjyf7nqw5vkvc58fzsnhsxu4kmmaemtdbrde53k0dq92k8c3jithmqh2ovrvdqjashomturo4pdfxt4b08s24jfhkg9y6q26vbtqmaf07q5m48iipboy4fo27bxhz7m2ipgaxj',
                retries: 3942689266,
                size: 9933962347,
                timesFailed: 1766835380,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '88xup3bzmhhxy3wrk8fwln7o04lrncwow1g6yfeqvjuvw5vhj9',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'g1tvzk62m9wca65y6llp',
                scenario: 'dspee6gb8xlrv1l8aswrw01ca1cu1v5sf5f5y78mwh2f6ulkyoe0xivfltsp',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:13:44',
                executionMonitoringStartAt: '2020-08-04 05:45:54',
                executionMonitoringEndAt: '2020-08-04 11:19:21',
                flowHash: 'p0xsk3esrefotrg41fl4zoalrwfi23h6978lcbwo',
                flowParty: 'txd92popph0dvnt4r80lqnj5iiq9bkspd9b59rjiv0jy7rodbhqwti6r317peo6uj6nlk71ziy77h2mk22lo98fgx38bjvkzdzr5ysxf79cokexf4lm8d48jh2crdkn1tdn3wisxj7tyaj2mkjv8tvclcy8rk9zn',
                flowComponent: 'arm55xi49e80e6d926aqy141s7ft857ur4drkdmqarae9i2kzfib6gkdorjltfre4dd0poocfoigosfcrq4yrtgpg9xmkmgukubqdtivc26h97um2ss8g068yy2iyrf8ax692b862syh70ga70ys2m47sme4ojoe',
                flowInterfaceName: 'tr4x49qkmbytcz5kslzz3y1vw9wksrcgzv0p42t4wodzbvvszzwzjxlcmwwtog28spphhvucj5uwxxwe1axz1vgbgygjq0zc3eervf0rjjtw6qkyc2s7v2qd88m1bdwqiyqyopj9elxcz6d4m8m83mvik2657ynf',
                flowInterfaceNamespace: '3ule91p2jc7aofkz6psyig0urtr9dobx973o3t296c4awunl81ydhgn1f0akic49opqrs4npnhruky00wojvx1ebxi1hs96vfvj7qzh0oeujxmnpkvdxk4df1b04ftbfta0udd51g5fklarubx3bs6gisqbnlo4z',
                status: 'XXXX',
                detail: 'Et et maxime quae non aut laudantium enim soluta iure. Rerum harum quam. Saepe architecto voluptatem velit ullam eaque earum.',
                example: 'wlxl3oqdnky6e2wvapyw2d6bc5qkwauvrd5cj5bp2dve6pma48le53j8rs0egkg0g97n6ij83tit5f4s7gnyesgqjkq8aayomk9o5f20jlb60e7gnnx0s654j7r8kvnsrswc7sxa9iqhjt8aczezm4g70mcytnos',
                startTimeAt: '2020-08-03 16:32:10',
                direction: 'INBOUND',
                errorCategory: 'worq5k9e7nrbfnrjr44nkd6s83j7b03kk9z9dxlb6l67u6q3ny1dtrmmudatabk583pzv39o0xmbyuw6ewuej04okj3oxakbxgvu779lnczphac2n978c56ru14734cjz890ulpyz2gr07zniqnoyk846z1ko5uw',
                errorCode: 'kxs260keghgce5pmlhjo2u4adh5dipjtgekbd7ndtf9iql7cdk',
                errorLabel: 415299,
                node: 1124449578,
                protocol: 'de0tkeg5a6oey5aav3m2',
                qualityOfService: 'xhysfki4eov88gdaqbeh',
                receiverParty: 'u267xri339chuwbvsro7wx9pdc58meug0ze4vahincqfavpbhj5tm35l69earnos5rjuzmkww7ityydpku17w504wzu70nhauff1tvegqg92yuqxetf0fzknal7am2kwavh2csfdo5l2crvv4f0f07ntyh4lk300',
                receiverComponent: 'd3k3m0zb9muivbdr3dly33mmtab7tnjrg0458hu95mpwdfmk1z8j39ck4gs5e0oiibf0yrgwgrrdixeh334lfehctxg5ub2h8ok825cu17vwl12o67o09nehlfx4uoj6o1nzop1zsk0lfj9ablsr9r4gg6kpquew',
                receiverInterface: 'rqq8xwpmfx500k441sn83wnp6jt5zdt1p9d25u6g9v19plcbpor9uhmvytjq8g9k2sysj2pxnlfr5gdlhg36as8vd1nj6kgqe9c1qyrfqtvfjrjt4u3eltutky8g415d75qt7z26in8acocjypsazk8dk355dv83',
                receiverInterfaceNamespace: 'fkw28x0kexayik4wezf5np9393mkkj4r9m6rzvs60i62vle11q8bgqdnmr4d4zjze6ruycvxxdb6i2c4f0tjj2i5e0j6ch98gvz67ccbwr3kemqi5a4g86m7o974cef0qxrxq76328ln5tvjxohttchn2tpc0bvv',
                retries: 5682160477,
                size: 6337489797,
                timesFailed: 4075314932,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'x25ongxzmnd6wdjb9yo35egccer75lsrm6hemy0b9m87oaw25b',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'qidndoazwik2wcvfjo8h',
                scenario: '5d9jfwdbqffcq8gwemnwddo1q0zt1dssu9luyjl1khzxw5x3pzqpa0tnglv6',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 01:53:31',
                executionMonitoringStartAt: '2020-08-03 19:17:13',
                executionMonitoringEndAt: '2020-08-03 22:16:44',
                flowHash: '712t9sd8m0kdn2zzz4mdxq6059bcajmk2gytd635',
                flowParty: 'lcdyptq46kr8ul206wx5ecyg3qupq905vb8l1reyj4ufhyh9h9s7hxm6l6y1gu9fodricexn095obvziakgb9xz2eg9stxrxiopq2znpyh2xeo5jjcfw74381bbouozijpnpogu1psaxbp670zfs2vsqi6kdg23t',
                flowComponent: '5eoezw1eik60fpx1e2gmgmoswwlyb8ww6wwqg0af3n5beubrbwtd6g08pqlcq87md1km8lf67jw9ci0pme0dcgiumjlajna7zbk7tki9xkl1cqiwmorpc1784m4b0wcxnx2jqikcoekcybfivt4ncuo2qyvt8oc7',
                flowInterfaceName: 'a7pouf9ip3fc10li78zrj9vm23oui7ucis5brtplzfst9eb66w0lxvbuul0axxj1l03z3ahklz0pc8o7yahy67v9y05trif3li9e9nk4iv4yk3delmldujsyx0m5a7xw091pwmr6gfs5b5o4ljouo84nmt3r3kyk',
                flowInterfaceNamespace: '3fdugnjc8ri3fe7bhll21imv349anpme948jgczryf0ncaqygmdtrk302nmk33l0btx86290g85m9rk5clfqwfgh0xux5nd81vkv9bhfnmua84i31wek2zq6cnr9ed6xv7kitfgdceq4tvu5pf0lxdohj1v40oas',
                status: 'SUCCESS',
                detail: 'Quis facere id. Voluptatem nemo animi provident quidem aut tenetur. Aliquam amet minus nostrum ex est odio rerum minus. Ut ut rerum dolores voluptate dolores nostrum sunt totam.',
                example: 's9i94hx9m01dm2m7mkbbom9uzfj7bs45ztixqokkivsijygm9a6ztuop9t54n8faazm4uq8wgagamp4o6zo1y93qnzb88zws8degv843rt26tcg72o7cskeemncgrpwfyzyob68i6wl4ay4pad8idn7d3bcejiv8',
                startTimeAt: '2020-08-04 08:19:51',
                direction: 'XXXX',
                errorCategory: 'vq4oeh7w2p9ttbmchufn81f3kut26ppwtj9u45hnpv0cyo7jz0d37d9fkw8dcrbkizi662ak9pv1zg5fxcz1p97tq1ckngvik9img4nle3f51vzs27x9m0102rec90l3bru8t6gv62zzsiessi5cieaz40rmr747',
                errorCode: '8xzimt6nb46wqdlxnapcxj6qwg1uj98h7wmqoyayzxjleaavxo',
                errorLabel: 738212,
                node: 6503274686,
                protocol: 'adb2ibnfs7gz91i3kx4o',
                qualityOfService: '78o2rbzw8m8utp6spl7x',
                receiverParty: 'vxbxhucm6683tse1w8yrfp0m6qj4kmmt9aqxiorc3pi44mj0trml01n7x3errlow4nrn8bcylnxmb53a2p67glqcr1ayg2ivq87jtp09wi6xiqobe7uct3b7yie0fzrdhh3mwurmvtkipipe0qvkge7yo802k4u1',
                receiverComponent: 'g862kgli24nqva9esund9jpfjy7gav64xw8vb5twi0m6mxtnpvg4jbm9bssbu3xivf0dvgg3vqqe9fudj0chxoobxssktqodofieggke01ref5lvt8k59wdf2yife3ynosw3foqj2yblnyyxwcuu6eax0aouqohs',
                receiverInterface: 'yoan3g0v7tp55kj4513pndcutp8lt3ch4dkco4htxhxpghwdqxht2p8f8p70t9uhp9zpsrual2m26rteim3hplzybpxn8c1pjtg5hxqxaq3su20o29xzvy3b49zh6vbx9fu8zetfm8nxd149tlhdkeo9mvavokhg',
                receiverInterfaceNamespace: 'ejcuumnhru0gj1bxq6h836vlrfksudyrk4mky4ayoz4k4reht4ioq4xsps7l31bpps7wlwjutoxb6wotn7e6bfvjdvada69ykpi7zx9rnqqhopn97umfmx2f60w4ziklui24vw9a3kdknzmioxtlgbucwkgfwu02',
                retries: 4076073699,
                size: 7359838899,
                timesFailed: 8960430511,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'xxd7xck00jhn094bmvr7uurbugkmi4x9xm3sf7vum7aw6e09lu',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'oxdfsut603g746rm1oau',
                scenario: 'uw8ovleu5x2hnb8oeosman0wc38uch2tgsqbf8kyavhh8clmy8145xwdvqjx',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 21:15:03',
                executionMonitoringEndAt: '2020-08-04 12:20:10',
                flowHash: 'od7veobg77sh9uiv8xw3dppx5hvdy9r4850sg0zn',
                flowParty: '8nabrt4z7kthobxeh47fdnq1sto94dredxl33a4q2iyfl0qqd9hfghbd9kmukzw3fwbkd3wmbw4y4zl0h0ifkbt6hceggv6ici1mykloyzt4jmn7zoc63d2zaxtfz80bx7k4a8gxg7wt6pqx2keiz6glshfv8z1w',
                flowComponent: 'oy2fm1x52mq4fj6hwxea03h90sji5kna6w10yz5uxfx0nuxvo8s1iz32lgvh17ci7tpa90oibp6rw0h90grnzp518li1ikbfybvwexeflta9vzrvbnb8og47o32f6nc9o1eyqzb1on36kb4sxc54oohm2awg9ev1',
                flowInterfaceName: 'qdfzkdoy7b30mrtth3gav7ml4u02xkzdi2ph3lhl5efnaob03d9px3mo83137zmc5jzc9go52x2i947q4sh5nx6vvefn1qnqm0u3wiszqu3elhoiew66ixce8la802m5q7jlr9tg7mjc8cqk6ll68vs324kaxkq2',
                flowInterfaceNamespace: 'zfm0w367pppteejxdj5bubh5tkip3uwwx2uspswynzkw07lcd7j2s3czrl2n0gmscgogpbmcl92uspn6bogicr60kg39lgzuaue7ziitztvptdtawf9dfl7kcxypijpa94r2etmehhwoluwbceuhucydyjv07n4m',
                status: 'WAITING',
                detail: 'Sed delectus quas ut error perspiciatis nesciunt omnis porro. Possimus sit doloribus possimus sed dolores voluptatibus minima qui consequuntur. Voluptates ea illum.',
                example: 'tgtsieoqg45mu32nmrjdb0lxqb3uiv0c5s9hn0knw6vn1i4bn962pr4qo31t1by58i1ht7tlxtaobrz7ma78rt5bf9qyfu7um0ac062pfids0cqlxju46exqpnqm1rm0ikqswau6v2x0al3mmml4fkfe9ytm6abm',
                startTimeAt: '2020-08-04 03:18:47',
                direction: 'OUTBOUND',
                errorCategory: 'lo44xmeuinzk9tgra4hqcsdcl584ai2vifcxzr5kaxys0nnruhluye2gso0iqry2bcim6mpntey1v86nkm8nqn5j0o1uaqkubluo89e1aty7aopvwhy7q7cf6etbs6qvnaydbdy2ksyfjenvup7e00z380d3fog8',
                errorCode: 'm4vzqj6hlsqeg7ds4xkzg4lb8c9cam2hjp36yg2sxl07fzhn7z',
                errorLabel: 619583,
                node: 9170033426,
                protocol: 'otulvkr93wy9osrt5zc1',
                qualityOfService: 'rjp4ncfpubrx3rkphhbc',
                receiverParty: '5p7q10kw2czoeesx31bwhnb9pkgpsymin2z2z5fjests8dh5x1jbsrg0mj7y9hbgsh6yze25al3pbkq3anv5eedah2ojnjiqzn7bjbp51pla0nc4kr1fnahtjaib9p311tqo3j70ztly01t6o3w8oa21ft15irm5',
                receiverComponent: '5r74a9a8sdknk0y73k8wo464xhseznm9l7gzra29i23yxaw5wuvbnr0fedvlvilwt3ahiuzl4bqtagbgt199ffozavdzn3gtwjpuz1k4v4rpj1c4qg1d3e6zwy5r5cexsjmdpfa64mftkit32oefn86dmmxly93f',
                receiverInterface: 'dc6espbc4fa3w62g4o4lq7fmr4gk2phn91g6tt6udycms0nkdjgu0c33eacs002xltzdlznm4t8r2k5t48hcy7vo5306x1s7u45ai36mdty4danq6kazfz1cw0dfv4fiv1dpl1ldxtjbyvmxgu4u6ej0yodsp2zj',
                receiverInterfaceNamespace: 'ypoiflbblra9k3mohlthejlmfk481o5e1zvb0l3k9fl2lf9g0ra7r6n60kinhk8buwjnqqb8295zm3nyw979god07jeyp1aed5qmlz4hhqtl1krqx0n2oz9mfr3aqez7kpylax6efszgtmuodpgdgomvl5856x4z',
                retries: 6222933579,
                size: 7359887484,
                timesFailed: 6209714334,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: '7rn2ouw0u9mgxwo1evn4wy4rq97igjy7q8a01zjqonbxs7ro7w',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'vcpudb0bgvga89huyhvq',
                scenario: '6shrotkiyq0dhofl62ppou6tv5q13q6g807spga97fjhtrr095bab9yo4462',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:10:18',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 00:55:28',
                flowHash: '4tvft3peyhkukk866ijy6git28htu6eant3y59wg',
                flowParty: '473cf6tb6oa3q3tf6aygzcjdiu6g3r3xo9ltjd8nvwvl158zasrjkw152o4mre3dv1tyanur9v57eyuuj0r75u61sce36nt6w5qnqozpv0elufnzj15259ofnbcfa9j1dfznt9ca6coofkfzl7mmgdfvtck4rjg5',
                flowComponent: 'xsz1ulyi746ogsifuozocfgms2caelqmlingsdy37eyxp9nguj2i9x3rgrnwaj0a22sn98kwyk5j4vc1ap7frfcoemyhumocgs0a7evt9rvo3hvr86llok9rcd622fntnq8400u0u11hb4596wfblwzx4s3789sn',
                flowInterfaceName: '6dbvva8khkc2k8gjhx056w5bunc4lmelic753kgb5z5rdtdf8fvzyd9iqrpp9xcrjyqsoqha30tfhhgfoqdnr6e0avwcaf2ibnx9m6zinuymzto5ngn3rhbuwvztqmyq35beizg78htmypzj55o2sthgb6mvz8ud',
                flowInterfaceNamespace: 'g51ya1cfugkleo7x4efv6j5notid01ydniiluafoowaxfl66v1b9f49pzuyimszaxfmjh8alvb46yv5g5b3e8wsoclb80frec8q2namr53rmqvqg22m8eunt5p2m5o83h0jr6p4z4cfwar3gxg4p57302zylpf73',
                status: 'HOLDING',
                detail: 'Perferendis dolorem excepturi et inventore. Omnis et similique. Exercitationem voluptas ut qui expedita non. Distinctio numquam perspiciatis voluptates totam repellat.',
                example: 'ornxbz3klrwrcl2kz2iktgnp7rqg4ysviueikbc62rvw6dfot5t3unll3j3a5vdpcl95jwm9x6nk8y76180fsmh87waq6eykciwpoxyiudjfvvwtzfage2bnnhe39mdg0o0jld46t3hrzl7y1d6stusqnrv6r0wf',
                startTimeAt: '2020-08-04 05:03:09',
                direction: 'OUTBOUND',
                errorCategory: 'sq9pmzcy4jzszpf97xvx8icmk3l85qtppft7mcfsos4n873v9baeh69uyhtkylm3ur4e3tdfcyp0jd1dg35swq076ufzd594awbp975eir73z5q1jduoumjf7hchggxq0w63aoiml8td2a2vrsrnwf9qqsne659s',
                errorCode: '3ix0ofmr24in2zumy1dwirii7xtg06x32y3nsh5jr2hcn5aawl',
                errorLabel: 617827,
                node: 6904022154,
                protocol: 'qq1p66h9ycqgfwnztt9y',
                qualityOfService: '28tpuwhq8dy96ownol1d',
                receiverParty: '4uv8hymde2k0he0k8urgefd2vb3qv4qpvykfexsltog41n0395lmcitsioxok1oqaopqv5kvwtd40o9q3puu2cze7g674akyc0h764xmanduutn8dcbjcjjq17qbmw1o0fbvmt5nnid2w557g04dlhzky03m9c26',
                receiverComponent: 'jf8f1pi3y7p77gamfnyo2433s87t0tbobcuzjx3ooe4v6s3j8rjiy76v5hg3f6kfn1xg29kje9jqfezh3785kgecsn3oa9mmj7hxrvrydfd87x2990jeq50ytxj9x91nol6la0cyb3fon0lbae662m6fenb6xp6d',
                receiverInterface: 'x12foirxmaxb9k9yyzmfijarskh3oitxxug7jmnqijo3v2mhjq413g37xvsietwzxo9141lw8nj2c9nvx2p853ki3nq240ep5gyg0lc16sc8545r69yxxpmktwudwa2voqgwxuy6zji6tqar1zhcigrkidne1dju',
                receiverInterfaceNamespace: 'z5bbuk6cnry86pba8yqkt57tq5utk6ia00dyyxon84695gfxl1h4oa9ap22if1r7kcvfxyx1hf50ks2az2c1aro8nqvldiour67wc1n3axqamcamonrp32a4vhjqwi90e39l65k7repqil5h4ervjd0m6jv214jm',
                retries: 2289542861,
                size: 5945786423,
                timesFailed: 4874390598,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'vj6fdmxzuubnzlgnsnqgx0xnisw85jajctmy1au72xma37ayvh',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: '4gv5bsdvqo7dxot672m1',
                scenario: 'fq3vl06ndn8ffgaoo0yh47h99o0fpi2rmo7pt8mlk6cgzmmlksmv0dq91w7n',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 03:02:55',
                executionMonitoringStartAt: '2020-08-04 01:11:58',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'n79q6u6hv0ibuv0r11l4mlpzkzjkiud6i0ll3guc',
                flowParty: 'xdp79fdvdk4jd5p5xxdsvi6z2wkg90188ue3stl8cq914138qsem3yp3j8zrq3c76so3gp447nx6dlmswdss0x170musw09xdd6pjgegb6d4s33t1i3lwkfeat1f202yng3cot95nkfw49nuayv66tnlcieece0z',
                flowComponent: 'xmbqvwlycd6kojrezl9705mgprm6v8l61rd9hu4ua96g21y1cg050oevsw201v0s8llxawulejoyiyx295550u0chkm75k005b81ee5nnj05vibcuz88lf5q1pej3kbgoiqrmxucve4gawrrky98ilozi36uq1lm',
                flowInterfaceName: 'tgw3cltdjcedf3wq5es526hcnbbreu7ayt78jujz9nune8rpr1ybxqnw8epr1zunf8u724rhw6gj3hd6vn1i06log4np0hsd24vco1pc588dc30oz8yr7q7a6ahulsduzh5s401lzxs54uoobh8ivgha1sx5spgu',
                flowInterfaceNamespace: 'zr4mlm2zi3fh7bw9scgo4kec83bgfg4a2et3wzrd628zcfv58u58i63iqh3gnprukgn455bqll9wl5pz5z1bojupr9he6agnsdl3duq7h6q865rve6u90te1u9tuj5dagc7zx62k6q8buqwogy8d1va5yqbw1l3o',
                status: 'WAITING',
                detail: 'Accusamus ea autem totam non est sunt. Saepe blanditiis et repellendus incidunt quo qui similique. Placeat quasi tempora omnis laboriosam sed non. Quia recusandae hic numquam cumque sequi at similique ut cupiditate.',
                example: 'cccw15faify0but289bnwnbpr0tky761b99si1xm300anldj29tu85bfaibh9qxakwzzdc9z1by8iq52jjaz0tf2hqob3iq901fex7qdrks42bhkaezrgv1kaengjtv849f7ov9upy5pgthvk3up49tkipyrr6cf',
                startTimeAt: '2020-08-04 13:12:36',
                direction: 'OUTBOUND',
                errorCategory: '9ret99k5wl1lpeyzp4v3505pkg454lgsi0dc2dzhtezx9t3ctxb5otfe1cusml9boxtx4l0439x9wub9m2q5zsky9va44ynq9ccm51lo2foogtvp7ajf7lg7ja0wl8xdhackhxrxe4w5wmz93qbj1t76jrz7j28n',
                errorCode: 'bqjwr2z311ktu1qbi735evir80tx6oc5fcki5d43ggzh9dnvny',
                errorLabel: 971239,
                node: 3715139826,
                protocol: 'phdjnfpdfrrxsyfzg2x9',
                qualityOfService: '2xdesopzw87mgkiakqfs',
                receiverParty: 'd43fqhgf4ntydthniil6ohhkp9q4ji1avz0or458ck1gg5c6idjvy69paq264rg8dqy9xonblgprnei0cc6xvfv3tdnm7xsw0ph64xstsir6dviuog8fhkplw9xyw29wze36zrcemomctr0xikicrfwjsgd834j7',
                receiverComponent: 'yft0e848ajvwy1jxraki145bslbinno0hyciod2ipxgc6vfkbxqg9c0vg1afhingbhdoxrccrzu8tknmup8em05frg2ckrrbq8hp18qsw7lhwpxw5alb6c72l6qc29yh2x1zr3oi7w1jgl2qs69rizyg2ddlqrw7',
                receiverInterface: 'stlm3un9kd4o9qdgjwmgyyh81sriuwu99midwrovxycnfij18oqd7foiqboa1gt41j3erax8qwhwrddvm43958uffjq1vnbfmi1s92jxwsaepzb76ncwwlvw9oaf3w7kbq7wcc3b1tjgeud8utkxd3knic9mx7sj',
                receiverInterfaceNamespace: 's5ygrlmnj8yzzm7i9wqanc7poq8j0hoprhb0wjrwgyatmww4a50xmvzap3wczy81jrp7drvtfak0dr6hfz22updx0a2ues4jrmlavavff5ua1w274rjluem3fqs411xt17fuhe5r7lhup3ryag9nvh7oc1lk5fvh',
                retries: 7114183522,
                size: 2828545389,
                timesFailed: 4495992280,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'd8cj2txmey7ex297lhweoxz9301kcn6hm2kmjhdj5qe9qbwz2q',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'lpjz9k8djjjts78cvl7s',
                scenario: 'xhw45oeesocirvevs5l8o64454xkaurvvqf231c3ihyffemk9fyneh0hwyau',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:01:25',
                executionMonitoringStartAt: '2020-08-03 16:42:48',
                executionMonitoringEndAt: '2020-08-04 08:25:02',
                flowHash: 'csir872jk55uzk2hio6zgw02f6d7wl1528ed4wlb',
                flowParty: '7rkj1z6pybh0755h2fukby5i11l3s0adt54jpu0xc7cbsoij9grgpri7ugn9znquxge4hb0wbt6nox9g93ybmnm1ep5o838urfah2d6cqewbssikawp4m5y5a1kom88cfwjs086y3z1gtm074xc12s02hbqa500x',
                flowComponent: '9wa72xkwdxgadmb763ivf7jpak9c8iivewnllkoupcz9s8fjopjr60wrniwo1uc55p6skr1eposnczeubcjevnlptcrgspfs7wdhpque5vrum14m5imgbn9gqhtoca5o7t7og4sn6zcfpaejnucymrfv4ft9a640',
                flowInterfaceName: '9bvpownv9nsezuppc6qnqzpj5g9dvaz0gwp1gz92ark5rknzgpt3db83woh281206dexacyg0crabkcjdgn4rh63vrf699qpnqrwtcehhr00sgcpgp5kw8vnb4tuuz2sb03arheszw1myswdez3yo3ychlkhh7te',
                flowInterfaceNamespace: 'fmvke34nzfahxrrmow4ae7hpe4yy4vetd7fx5ui0fan448xrscekvm45isglijmvkt50g00qeb9xw8f7bt91i0yoh2duw01rsyx0i6kdtb0tbcz3b9vnncz2mme06a1q16bhmfeqll8ry13iyz4o34tcjswveus1',
                status: 'DELIVERING',
                detail: 'Enim amet maxime est sunt tenetur debitis ut qui id. Corporis et quaerat illo quod unde officia ipsa dolorem. Qui eligendi sed quis culpa accusantium. Voluptas qui quia eos laboriosam cumque facere. Voluptatem autem qui cum est. Omnis nulla eum incidunt laboriosam molestias in vel accusamus sunt.',
                example: 'l7vivo2hkuur0rmxveose05t7yicnghivdeblsffcsclhncipc2rhxp3fzdmd5a92oz58l7mjsm9sz9oap5kz74bfg91xddzxscbnujxojuw75fp0u2c5b21ybzd9isod979k09aj3n1ahtzrbdsx1p0af3rs979',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'vwfq6jlb33yk7pwx19fq05t3ucvy9f0kskur6vuu9qw4h66w0ogpuk9z9k3mc11otfbxpkps7rfpfoj1bslkjvxg8nwsiwm98zbp389sq052jjjv5y2g15cego6ffstxvfaoxfdb24uap7ibn9in2vf6z4qcbb2i',
                errorCode: 'moreooijeyfdsyk6zf496460lypmaa6rx2lxdu7jihrghmkgxy',
                errorLabel: 196313,
                node: 4389563889,
                protocol: 'bt98bwq8cy6d1maremcg',
                qualityOfService: '81ovavb68us3biowhn5o',
                receiverParty: 'wtbh9u0hba0709b7wvyfor18jg4axay9j0ukfki6l5oyepajt1pqo7xkg6tnqjnrfymw3hbqlbjf7m7rlpmxb8pkya79ypgccbyd4b4wacydchgvxg5j57glecf4d8homomjqpb11bwvt793vja704bymmt7ladf',
                receiverComponent: 'sytj9vrkx48n5vgjkgtm3qj9ne08gnma2akqx38nvjwqf89u5djtldr5kbycluuuob2mwmxxpzifbnpup83bxhnu28ny3ze4860nr41vp6iupbciv8azdakxol4ccbel5x3qy7y937da08fzdqy1s0rifr9qkv8q',
                receiverInterface: 'opphadi66v7xsve0rofdfqszm6v3ulw63m48sn6f9lrumtmbunih0gtco3zk7lsu360acmchq55tzbpqv7enyht1qot4v4zt6nm0u3yo2f2k5t3v1bhj9x009xtjqh66tbzc4x0gpz6yse72vgwiix9fkgxo1hte',
                receiverInterfaceNamespace: 'u97ttrvt0o57hkpoa9pw54jwjldal8l0kp2i2becwjpo0bey9w3ezl8z4q3wg0ntmp4oqhouk7dxrwugcx3h016avgw7tlp32pbbxtxds1wq3z1eug70r4lizrf1re481779u0vl7lag7louiw8oi849adsnjamr',
                retries: 8442337862,
                size: 4861631966,
                timesFailed: 5910143243,
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
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'lrg3aq9tl3u41q84u1gzxxlje18z4wv7k4tw3yq2np55alrv46',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'daqhh56femrw65hzqa5r',
                scenario: '2mb2h2pcjagbut98i49y71ynbkp89xumuws5s1piqlqv0cueaf8c6ijj3jx5',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:41:21',
                executionMonitoringStartAt: '2020-08-04 09:21:11',
                executionMonitoringEndAt: '2020-08-04 08:09:06',
                flowHash: 'kt3o3nmp7yawb6s2mkrc42sel5zh2kmru5vmwxe3',
                flowParty: 'tlwce7k0k73jcilpgi41oj7ehkqjyqf1qcg5dnohhc8bq02n5sttdqgtcwz18tsdmui779h1y14ib98sdb7iscltmbo6ljn5htjjajps642ogb57tz6mv8tpsiaexp29ifr22o5uq0z389144fi93hqn8k1mluo6',
                flowComponent: 'mlbdxcg69tev7qk6qgr27xsyi5lrfd91cta0t1lnlbb7oou9hggimofxubyktspuwol90laklj8fvt268mi7s6pm92nq1jcriov6ihzs57ei1rddhyeuhnrzo1opmkh6mvdr63qnb97cgp3kozckv03osyj8liof',
                flowInterfaceName: '67c2cqvb6yqadyy0n9bwjtwydo4pdyqjlcr03mwc8t6dju9lvkt2mq7jw3knb9b7bnt78q72ey0s4loak5nr3etzm9c3jz6sqjf3quurkqqm1638h9zjx3pxcwzsvaq5o98n6n2ed4dma0fracd4bnam8r24a118',
                flowInterfaceNamespace: '5pdj9qilm0rmgv0jxz4fqonpack5an5fp6kgt8d69rqtwh59ez4zfo8vzsd1k6uebqv3bdr37xo5dieowfajot21z9uirm6x9sbyggvp0koq2gvfsjjgpgoqfrjisnpiahw8ixeteylbmkqvha6th5ijiceemuty',
                status: 'HOLDING',
                detail: 'Corporis unde non officiis ea porro magni. Molestiae saepe id saepe aut natus eos et. Illum minima sequi tenetur autem blanditiis aperiam. Saepe ut repellat nihil voluptatum iusto incidunt. Velit aliquid cumque cum animi. Dolor quasi repellendus sed est tempora voluptatem veniam consequatur.',
                example: '105ri1utvzx9ij7njrta7y9ox5dj63hth5dnomv7hnmisxy401lya614uiyy4ykcqzd6pms4wsgf6b0ps09uf71yv7vj1btqtl7wq1hdd02hm634bcfkeueorp47ifp8rcpw0zi8swkdmy1792mo8q93tpgdpgys',
                startTimeAt: '2020-08-03 20:04:40',
                direction: 'INBOUND',
                errorCategory: 'hnlkj5267grvst7xjo6qdwe3hp42wu2nkwojkn0godskf4ev8ib61384mei4sc2iq8667gy9dhjzxaui72euglmab9l6dcov4bhjt27pobtnxun8wjeq411f7twb3in8y9ayf0o7gcnzr63axfupm2imfdm3ga6n',
                errorCode: 'h6blkzfm9tps6k904f4894hr7bcfdc34k3trtxs2yf9q2jskaz',
                errorLabel: 432724,
                node: 2920394355,
                protocol: 'hdyele6zqjuxr8d0n480',
                qualityOfService: '3t65uv3520fgocnbindv',
                receiverParty: '82k1ccpeoz6k7plsfi0qw785km0s68knoiya2b2jb9ry88q9u1318aivvrynq6ax0qof5uwcw52fayijwnzna1h0h6vsde7uksj5jkszl4c3c9q3fih5h287rp0szbbeqkddugpbrnokcr5qe8rw71j2aky0iqvb',
                receiverComponent: '1ey13ecgoo5kyqqc4fbnnoke7g5effhr5twc5fvsump6c6ahyuq0q05xqp5bue4amvng4jl89rir51ki40weyhl3855xd071t0137thyi0ayf9cjjipxljy5c27y22nz7v2e4vq5ul1ihc94ea6wzwigxvtqj3l7',
                receiverInterface: 'm1i67s3uh4pe774mu8mgmswjlat38zvtyn1uphw9tmzzrpd5sqb638qijzuu1u4larrtl3fjlwmw3ti0ykygvyur5ooa8m8s3nbtfo89zbfngwfblujz4hi1d1ipwnexpps9ck6aibrp109iwhs9jfclfshyadaq',
                receiverInterfaceNamespace: '2j6uhdgnn7abqb0y59bteejs60x2tdph5h3vmbywgj9zunf4pkbmlsldplwp10d6rkwn1s79re9g1bwbegnqa9jvke8oc1w1dtxbyn8zj24n3xn7v1h3tn70p70810urxmllhl5op4bvui19yxa0ydnr5ydvunw3',
                retries: 2860707791,
                size: 3628883785,
                timesFailed: 8271692540,
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
                        value   : '506947b8-f175-4c40-8b8c-17d02b80abc0'
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
                        value   : '06285d2d-62df-428b-857d-f52c1510d28d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '06285d2d-62df-428b-857d-f52c1510d28d'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/022fcb62-f065-484a-8f00-a073d6924727')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/06285d2d-62df-428b-857d-f52c1510d28d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '06285d2d-62df-428b-857d-f52c1510d28d'));
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
                
                id: 'a867e69d-8e56-4e74-ace0-507d99da7ff6',
                tenantId: 'fd1eda0f-1c99-424e-a64f-8fb3423852bb',
                tenantCode: 'gdjeat5iv1cbdol4cbfx68lcll5se51g3786b2f3bopiy8smxw',
                systemId: '5758d7a2-52d7-4a07-bdbc-94138f98e9d4',
                systemName: 'fvzbcuade7j4hvnhub22',
                scenario: 'ex5fvczc6k88n70w247m8h3a6k4e62sr80kce1jk8ymhpr4idvq5z0xn16gm',
                executionId: '6cb3079d-5952-4cd0-950d-cc7ca37e20b3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:07:05',
                executionMonitoringStartAt: '2020-08-03 21:47:57',
                executionMonitoringEndAt: '2020-08-04 07:02:42',
                flowHash: 'elzzjg6kxq8pmrfcu65kjgj7k2vesp5wyjfpt1om',
                flowParty: '6zr206b2xa95o5k185hxtrn9b0fr7hpasbk5tklrcukmwxtk76ylxf0a1o0fnekxl44mlgfcpiqd8yekdrj6nhhc7rtcvecg410mnog8z9yixca9ducsgs3wydh80woz9h6k7rdte430y5ha8s7baguljoukmjj0',
                flowComponent: 'iieqqxlyjzznvgm3cthszvfnewbzpq34nhgipup5cj8qyk2svmaeotyrihpznau07zip1r423s4yr7u8tqk013ukzlr6h6jibic5qifnmy6uvqyodran4x98c8qplq2bc75ruhj6w277xcrhg59ljxceeeygu99c',
                flowInterfaceName: 'j548n5klk36akx6eky7vtw92y1r7146whsvco6f4t54xfyolsicg3mstjbmi7kazebkquwqm4j6vxtczeoi9tribt3x78nd9xeryg1ene3flludkx0cxoi9069411ui9ogycya1pxx7f0pvl88ymtgg2lvv76zz5',
                flowInterfaceNamespace: 'lgo0zov40ctm6dct60zn84jq2midlt1yvt13f7btk56b2z9sotfkzjnurb71efvgjqhb4fzcda2452yu9l5mo1sf6dyje2vzdg17avz0cn5byz7tj1xq10sx25kecegglqurvno2qdjwfwhizy2rzzme94a8thxh',
                status: 'WAITING',
                detail: 'Fugiat odit quia tenetur. Reprehenderit quidem molestias cum sit dicta assumenda autem vero. Est et maiores commodi.',
                example: '75hzjaofnqdfp6cjqius89pd4hydjbih44g0r9tp6iwpme9ekqtfczu4egsfvvpekt1vga8bav0i0nw081mrm4a3g4fhk62jvxixxw8cwrbbntfuwemn5omx1li5ddi9052v6jpv7vbkt5heakhay85vt2z32483',
                startTimeAt: '2020-08-03 20:48:41',
                direction: 'INBOUND',
                errorCategory: 'x62yneaqx8e54xplsv2rvdq99hvui0jery1bui38aww1tzkozs06zxmrjd2b8xf88nsiztf0x7nct67jh2gp3rn00xkg2o5r850vj2bbjb5ye3jllwdx1nd5viizsafaez71wd5hk8i723rspkm9is29xh6zmdvr',
                errorCode: 'eazq5116bzr7hjgq0j1viid2hce6jc9bf049dvlemz954lovy9',
                errorLabel: 475884,
                node: 6208139741,
                protocol: 'kts2i8xhpbsh4a59f6wc',
                qualityOfService: '1iq7htujxfzdb2yi3zif',
                receiverParty: 'y3ue83ijlrreehrpvkcmaie7xa6atk0a2k1u2bqbhmuph6qatcmi5awq9gsrqq80yqqo1iec9rsrfrdqr53x3w4dlxegaois57k5zr7hvo3ym2pzcwuc5uw1qqod6bm1hyq2b3kntes1z21yic5pclire6y24tjx',
                receiverComponent: 'b416duyn9ox1w9wpalj5c140fjhv9yprq9gpetv56dprjgfpo5es6s7ah1s9yhtmog4nem1xqynltezrt16h29j0j1n3hx239mv5mjol5nb7l1wriduoiqfla2cy6i5d877bhy7ev9o2koxw280qh8ryoa6vuzhg',
                receiverInterface: 'tvug38wy5gpu0zcj34fu11vhfugmaa189m3jgy376jk1q14yuu8jo39lbcujvmq5muw1pt148e9y9fhf99xx7xys288awnsmvynlq7ujbcb244ha4111qc1ihtc9l6za7j6vxhg0uao5zm93bealvw8xe5lkmv7i',
                receiverInterfaceNamespace: 'gx9es0w217jcj61cx4qhckx9hpfw9x0s3j8whwybbpkhp1eanjnea9jbksej6ysdnjxe78odjukely7ww9btp0so7nmex1654s1hn767xdi4kfvkwaui19pxmxaxgqmuqk6ld58vszgtl2ib22zfwb58k3adhj0v',
                retries: 5961821088,
                size: 4311775267,
                timesFailed: 4936744408,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '06285d2d-62df-428b-857d-f52c1510d28d',
                tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                tenantCode: 'mfccld35oqphhwyntdrv24piyd59j1g6bjj3iapwqtavyi78vx',
                systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                systemName: 'zs5psmquj6satpohw8nv',
                scenario: 'elngtei4infand1l4mchc6sr8qvg7v4b3u4qot7pth7ae9slzzs2pvkzwiaa',
                executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:18:57',
                executionMonitoringStartAt: '2020-08-04 00:36:55',
                executionMonitoringEndAt: '2020-08-04 00:56:28',
                flowHash: '00daick4b936f78tf5akmv07uikrmlqlsuvgwk5v',
                flowParty: 'm701gm3f5rt7zmcfgfqkujil0efeqp087urf0k44nanf9m7sfqny2ocg667mfku4fe0gptv89fbxj1y27qsdokmjoxqen5eztfj524eo7v8jfmz1jp4pfvfemgdtzbfd6acnz5exix31rbtrs4abl1q6fdihxp7e',
                flowComponent: '6azjcmhzra54ve0zy80oe9vpta55atm0tl0d7daexhomzzmdu0hwa0i6shaztg7em8n3fu37br8slgp9hvrzs0kiymbnpdzs9spc62japu3r941tynfzc98hr9c5h2vb4pk9g7iy2vkoc7grmra0jbixgpp6ioaz',
                flowInterfaceName: 'q9fxzpz35hvst80vsu056cpzcu140w51wmfgfeusl11zy4merpct3g4l3mviqp45fo7w9vpmjf8seeq5hts3qd75j14w059nufkrq7mu6dmvemyj4s1j2k1lk3yqnz1r11sexs6h3gc3ybdyd38quvncrid83ad4',
                flowInterfaceNamespace: 'eqggv5t2vnbid1p98wrkcrtlqj92xvzcghnaf49d93cmpqesfp4poylpo2ntgwhcc7uqlc3dxful1rb7kcbxu0azf9vl71mnacmzqjf4mti37dkltro7mgsht0e7oh90do75n9rz8t6chusicd245zai8x5ic5le',
                status: 'HOLDING',
                detail: 'Molestiae exercitationem adipisci molestiae eaque. Et magnam voluptatibus. At aut nemo ex perspiciatis. Iste repellendus magni possimus possimus aut.',
                example: 'e1z7dzv0ccotn86qdi04utcb4p6spyrsrru9731kaxox9mls8vx6y7g8yx8w851p3abqrsnzc3oyimf7bzzaz5k4q9mmfb052lnl3dcy94zathrwjku7kgx4ujrquhkim72w79kruzt0i0z2jsa6yorrk5ksknu4',
                startTimeAt: '2020-08-04 08:35:14',
                direction: 'OUTBOUND',
                errorCategory: 'l6k7ngm1e82cgt47zrf2i1f9i3gn7r541oi34xc3loof8q1x6wyhxqmu7feed378g3nrug2f27s6egqy1q7yib80dbbp9cvj7bwmdco26fmh48j1unxri0uabw3ftr2whes8nwpd3tb2f9fsl6grot9rfeh6ym0o',
                errorCode: 'tykc4y3xr5ahg328uemlcp5l22mn97egw18vv7ei242tf8aotd',
                errorLabel: 257758,
                node: 7637352587,
                protocol: 'rdslsj8avnkvvixhhdnn',
                qualityOfService: 'haazj1ylrgy831a6d6jq',
                receiverParty: 'm6sjj4zv7te9lt0w5q4q3psay7y6mltoqztdnkn7afsdx15dq6odpwhzfa84hdn1ibd05zcgwgf07tkv3dazl05ho1ojemkj4b4t3j94shv8c94fzpwxjc4swmo6tfa9mosvfajpr03z0ab6frzkms03cgs7co7s',
                receiverComponent: '4m1cydwgr9ii4h3pl98n3mlv4fun54vvg7pr4f8k8svgk0cmvlheyuzhtlxrf7k3qd9kbhh5hsv6v3pulyl6l9rrm9de1qiqjvrstqtdgjof02l5zecf0pac5njxa841i6adqm7cte5s46mdlsln7ckdu2kwyxs2',
                receiverInterface: 'pwjx2c14gjcbrhqi1dqjrveq4bta544gmb7npzt915gbpb2xikkcta5616pianklxscoltxa2v2d1y8v8sqzto82babd32yuz0d2sw62w85w9b58nzyxu7loy4xxphy0t9hp79sq56lnvpnoputa442ax8l05kp4',
                receiverInterfaceNamespace: 'abob47e8w83er2lho3b6k6uehjwkbf86cm30tq4bdd0apchhvchirndxwxtiwru3xs1olc34r9g6oiyxzezzckob4br5xx7ulvdyxepctmq1tm08k1yv4hq65fen6fihf86n026occ8htr8mt54qcznc6djsc25z',
                retries: 6645715439,
                size: 1771254222,
                timesFailed: 9798211310,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '06285d2d-62df-428b-857d-f52c1510d28d'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/f5df8381-14a6-4f5b-b20f-8472069ecc1b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/06285d2d-62df-428b-857d-f52c1510d28d')
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
                            flowHash
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
                            flowHash
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
                        id: '2ffdcd64-9a80-445e-b5d3-aefc57794b12',
                        tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                        tenantCode: '0te7szkrj6sj17vplvhl7nsehsxeel4arohpbopb5k1xvkxisy',
                        systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                        systemName: 'bfz61oyqdsraphl0gpn7',
                        scenario: '5glgdch4p44bknsvz8cls8rk24jqhwuzbl0upq9cirj9181uwjv8v3b6ir1c',
                        executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 18:23:12',
                        executionMonitoringStartAt: '2020-08-04 13:08:48',
                        executionMonitoringEndAt: '2020-08-04 14:04:58',
                        flowHash: 'gnfo8wkrxladnttcj3tttni4kxa43uhkk4rsxsap',
                        flowParty: 'ggy5r2sxpld5mpqdak42v678i05hvvlg7ie8ndn1o0ny660xh45gegunxayhqyf3gn52skg7r8uhct09zi0pdbrye1lbnxt5sx3yv47xma2ovjxg8m9dn5fvtwe2yxt2vnfeyuwdzic37p0pyg97kn7i47lqa54v',
                        flowComponent: 'h0908j84lwcsigey8i75gkzj07urbanvwvtx1thmgsk5rfxd4xepfighulp6imfbshdom2oevqmkey5ji6u18lgjngiv2qbhzxw9i7aahfujg12rk77epfx9ft80x6s06wcbw4d9nemeuvin28weoi7bswrr6uja',
                        flowInterfaceName: '82brgnjmzelp7o2lqpa99z8ptsxgfdfmrtf1e629vaxzmecly9zgd3o0yfod33ih1pcbtq87mvc8kjjhjofjqsaxkyyqbppbq9b5r12kgol52tssey9tcc3zm3p8kyb6v8u3oqbk5gxt6rxo40a3ufx6pp5yu10w',
                        flowInterfaceNamespace: '7gi9agujdomj8033gvib0o4rbgm5a23bpge6jfhkwmk9ph6wlj70814r8ap4wq3inulay18zynoegoee1gljlzipdxyrm33hhtlutoj4cthge4is5qizmqdmkk4izw4odl1wz4297jzyc91fbme0hze7xnuoc37n',
                        status: 'CANCELLED',
                        detail: 'Vel amet id aliquid quia maxime. Officiis eius accusantium non. Ut minus voluptatem nisi et dolorem voluptate. Voluptas omnis ea qui minima in fugit et. Laudantium et quo voluptatem delectus impedit nemo facilis cumque dolores.',
                        example: 'kyz0r17qo7dkxaisgfbax4f1e2nww4g1n7qp0tnv5fe5g88p297rit1cs9gpv3vkg5u970cdu2h5oxskxip40qka9arl09en2arp9h1fo47bsoq7eh3knbs6btc8zb0yh9juuogl5j9twe5fx8qxabkjpsnyh0ph',
                        startTimeAt: '2020-08-03 17:28:39',
                        direction: 'INBOUND',
                        errorCategory: '0frln4xtm79f7dpa4zz0rqoi08tltio9ijqv8u8i9u5z84h6b0sh2dkcfgocnse8oou8pxfi1dy8y3u63geoq1y41k081dun4ytpuitvnw5fx53epcrznbesgcp3o1qghp02pod1qmvdl6pq6nsfrh40v237aiok',
                        errorCode: 'vhc6llwe29csnu6hqr29sru7taa9e0betqpqqkfgrzhw1imlyd',
                        errorLabel: 867793,
                        node: 1333318568,
                        protocol: 'q9xgj2h43do6nrus0wzi',
                        qualityOfService: 'v0gn63a8h8z0p68kp1dt',
                        receiverParty: 'k13qrmpjqw0p6p9w2cjkpximgs810jrqqly2n4si5qcchh6yqyo7gz7u84tpfsmndfuhv6w0bmauziv8st4ve3ajl36b3ms8obse57xtftru63qysp04durervxcbsadkmzf7w3w86gtnvpzaqb3szvnyi6v09to',
                        receiverComponent: 'qr18rbd7btwf5ve7bpl9mqh07xtihetwcc766qk7olkd18r3fwkcqzc2t1zn3b1azmmmk3a12pg48nr17d78qlpsi3h0lk0vtz3ut1j0u6tg253n2xky9572e0o6x2k90dh4aijejuo9x5wxifzmpwxth4vwjgys',
                        receiverInterface: '3gc7bpqx84wkyef1b9io2wlq37dgeyy9mq6xj8g814p47y4ifehwltj2evzs4x7bxadeujchpxli5q9tbissfav6jvjus7y65plcnhx2u97usvjinr919nsi6b2ud0jsuvb5pky1586ultbpgnxrftgftdk2vh1v',
                        receiverInterfaceNamespace: 'zwof6bbpj2tgjpu03o1iqrr7mokjgksss3rhp1ldbshxx8b74m3pbkosudffgvy0na596fpxwtvdr1qwhgokeu26vr3dmru9x0yrlcb39p6ued7fc5e35ynipf8l1t3qn9x4o68mdk327s4c3237qgmn3wra5odx',
                        retries: 5152833796,
                        size: 9272888088,
                        timesFailed: 5353266967,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '2ffdcd64-9a80-445e-b5d3-aefc57794b12');
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
                            flowHash
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
                            value   : 'f945a739-3bbc-4daa-8ad2-72f54998ba1c'
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
                            flowHash
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
                            value   : '06285d2d-62df-428b-857d-f52c1510d28d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('06285d2d-62df-428b-857d-f52c1510d28d');
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
                            flowHash
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
                    id: 'f02ad17e-0851-47c5-ab1c-1ee270b6c83d'
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
                            flowHash
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
                    id: '06285d2d-62df-428b-857d-f52c1510d28d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('06285d2d-62df-428b-857d-f52c1510d28d');
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
                            flowHash
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
                            flowHash
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
                        
                        id: '9b7cfbb5-cc2d-45ca-a51c-353eb1489769',
                        tenantId: '1a98e2ff-556a-4012-98a1-73411e793d74',
                        tenantCode: '1o6rfhssjw6yueg02nx0jr1n38bra5tq4793vyc1sutgs8kaaz',
                        systemId: '228f638e-2351-4948-a09a-fd5bfbd78bff',
                        systemName: 'q2by6wj5q2apme6ktdf5',
                        scenario: '0ecj1hv4d4uonttjx30p6l1jcmwuw5v7ue1lm9iotqgmshjpvz0hpnow6whw',
                        executionId: 'dde878c8-7231-4c04-b4f3-bcf64ce4494a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 06:13:53',
                        executionMonitoringStartAt: '2020-08-04 02:39:02',
                        executionMonitoringEndAt: '2020-08-04 10:59:52',
                        flowHash: 'miw3ag40wx0mak9kbzoc5xg6p6s7skvairca045h',
                        flowParty: 'qp68epyahu1li2746d9k26fae3toss3wtstk32s5kkmmf5p2lsai416qvbj0szkxjjb6rk0ud8arzyeoihxibynthv5hqgo2f3tsumypournq0xj26yfe5d4i7fu2czt4czge1c7zyt7xt88ed3afmlf1ydt0d0l',
                        flowComponent: '7sdon2sh797e4agtw5srxx9qq3rezqsrugcrmv4zrh3cb11qvmeqkxjeq7cfl835c4qxw92ozijq8mmpgnqsxs4fheizjxqk37e82rulbsw5rxl1vbqrf23vqtor5upu4olgyqu65oojnteujwk6f1j7gz87spsu',
                        flowInterfaceName: 'ufmfhn7ikzmzbr1n092fb8vesqwup5dbkgolt1yb0vailaeu3k058alfme146kw0lhsm365vzaektawn4bdfjnc0jpdjdzjiwof0wqwe81mwk0wjoc67ybafn6et4t9xf6xph67ngoxs4wynkac29q8p3lt3hy78',
                        flowInterfaceNamespace: 'mskge4tg63k5ab5qhs8m8jgozilkb0b18jtxu0owh2xkar62kzim7wtmwrcdg92dqlop4mf3vzgrvczrffxfm735je63w006rzvgcia5qo1v6kvpzs1b772m7rl0xuk3ropf6j0t339ujkva4j1lavzi4n0tbzlj',
                        status: 'CANCELLED',
                        detail: 'Exercitationem sit perspiciatis officiis exercitationem porro ea aut et maiores. Dolor voluptatem voluptas necessitatibus dolores qui alias totam ut. Voluptatem asperiores labore et quas tenetur magnam. Aliquid velit voluptate nesciunt.',
                        example: 'x1933azps3bp2jpsrede8x1zxk33svpimp1mvdt2e993r2o0c4x0kmrtmu4m60t3cp1saizabgl92nrwlh54z8l72ldz5av471x3k4jpt8ye7qc084hpak3saeithpur7fjh8cmsiavstetwwy0ua5u2169f177c',
                        startTimeAt: '2020-08-04 11:05:26',
                        direction: 'OUTBOUND',
                        errorCategory: 'c5lil2ftsg1ah5z5d5g3ktv3jd51m0zq9gmcx3acfz7mxbz6ox4lbagzhidgqm6oj1gx2enb8482ed2p8d3ov8jy63zubnpzg9y2fu3zluygt89i6iif5fy98lf9yhih7ruvxs6rbdcryf1znu3crfhxk8vcwi69',
                        errorCode: 'vg7fly0p063ztrveq855p7li3gbbmd78n3s69nahjenbmmb245',
                        errorLabel: 525559,
                        node: 4475909993,
                        protocol: '4b3n9glmd4rtfqfn5on2',
                        qualityOfService: 'nikbua5hlwogr2gw6uhq',
                        receiverParty: 'nqru3zhzqwoll58bb5pxj24wnlvr5dx8aphhlwjtlpnst1kl8rpzz4hd1ua6f0tq6az8eyspnpcthog8jxw9uj8ojb5qyjuu58plr55adxaq6zemd0s85g0zq4s52xgqwjb9k5ehuhrt7pi3ckec5bj8xhz2eoat',
                        receiverComponent: 'fd47pybdcredqy734n31xpdbpyel6xgsoj43jif4plz8ho4f71dbj4joo8u6azbxfb2yf4hdo7u7jqldrf1s098m8c0e4pfyjvfrkoxxevid4s6bzw8py81z5cgfet5x5bz8st10lumamontati4yvo95r23hcat',
                        receiverInterface: '5t2ux30m2fwepcg33ap1k0m0pazl3hame9by56785k91aj3catksx4kcg80iicn5kz73kpl8xj2bxno2eat5c7tfskygbv52p17o5rchn3odonyeeos49drxtccmo2xuqacsomqnlp2bzvav010fjzi15qfof8r4',
                        receiverInterfaceNamespace: 'btwlgpfdxja51elt12me5sdiwabr8edz9x29gzx4ymq71nu4oozitw8ntwq6deud7b5rbwdg005epxzmerqfysq0x4z68dmgkruy5iqyl5e9chlc220gaxnqh6j2lylhzc2mgowqeds9gsjf2x80nj8tg13msh5h',
                        retries: 4978910536,
                        size: 1478023418,
                        timesFailed: 8567452197,
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
                            flowHash
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
                        
                        id: '06285d2d-62df-428b-857d-f52c1510d28d',
                        tenantId: '0b9307a6-02de-466b-a2f9-f5b805430e80',
                        tenantCode: 'af579d71kcaqj9hriop4i1ycu6pwse8a6asnsfaajq8ncmcj7c',
                        systemId: '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0',
                        systemName: 'pzp17o3leigbyhz6wwv5',
                        scenario: 'ix2zwjfja05wx50x9eqzq3tmepkrccig0mmrl522mo6bwamnpq4ap8lttvek',
                        executionId: '007725de-94ce-425a-b101-485f94f9dd59',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 03:06:56',
                        executionMonitoringStartAt: '2020-08-03 15:10:08',
                        executionMonitoringEndAt: '2020-08-04 14:43:25',
                        flowHash: '6msso5awy5whnuxf2gofka5numzgs4w3onpy6gwp',
                        flowParty: 'z81tn5e0q4a5srzx73hxrcwewu2f9mmjvpndf56mfjai971z29r2jlz23hqcejwmmrbwg47mxkf8fvw73dg4ykqiaylggihv7mzyf08luky54w1gxih4bvq8b282kdysm4bb1xfqi8sna1epxcf9vy65w6pvpsu6',
                        flowComponent: 'h57r1njmf9mgm4rpx5ajgq62zx0p54fq4vk1zbxq6cca6pckl498xxb9l6w2fyx771va0hhcollnvnz2ethhdjpf18yygmo9zy95ibw63j18oldnkm6p4mv9iyi5k5l8h5fdm90nzvwfiidhfgynifas5ibjj0zw',
                        flowInterfaceName: 'yuvl22ymppg48qzkaeeghcv7h6bfb4wbehw011fqw6kkh3qv9neu06or6mns6qjriswwtq5jyjuipxe9ml1u5s5r0k04wiuvwu51rcqydexauaykc46sodrmcn6erw8932u26c8kl62dmuwqu0geuvbt83lue7b6',
                        flowInterfaceNamespace: 'nnp94wud4txko30bxa7ump21d47tqhbpl5x5ojfuqz1ssai7f0hcruakehpwebtzzt1w4dpmv2aa2p3fzw22dkdcraxgbc78v6kf1gm5rtwrokt6pc4f85j0kdhq0krpcmg7v3zswwp8r3xp4in0t16iu07k8upg',
                        status: 'CANCELLED',
                        detail: 'Enim error sint sapiente labore dignissimos. Doloribus accusantium eveniet. Voluptatum ipsam quaerat ut cumque cumque. Eaque similique quod enim cumque voluptas cum laboriosam. Sed molestiae mollitia aperiam. Voluptatem sint quaerat dolorem earum assumenda voluptas et minima cum.',
                        example: '5cwcy7c4t8flr4e76t9l4yp5ix2ftw06ou549unfymuov9437vjh9o58ab2ij9id9hrh81f1sjv6ze6pp15gr7aidk8777tjwl8bz6iu22n7gxzqa3dg990x2dz98c1tprlvbl5c5xt3a4kc9qeug1xtyejesg82',
                        startTimeAt: '2020-08-04 10:02:50',
                        direction: 'INBOUND',
                        errorCategory: 'ick5qv9bkhvejmjfydxhpv1lq4q5ma4xj5y8prjcu5smgni6yedmh9pblqn11qnwqjvyusxy5tq7e5yezeff41fj4nblbf8lqkt3pgtlh3t5eddsm84whb2sni2zqhqnhb8mpk5pxjnfgf5gj6dy4htv0m45gyl9',
                        errorCode: 'wexwgppcyd7g64yaz2gcs3sambi0c5bk3p8sxaigwbcomiqz7q',
                        errorLabel: 162758,
                        node: 5781169812,
                        protocol: 'hct51s2z5rl8trsvekon',
                        qualityOfService: 'igb9clkl34h5ojrd7vgn',
                        receiverParty: 'jrxpbt4zkd5fk7wmmvba9gbw70uxxq4cizv3qbs2tnjx2awhpj53qe6odnxdc61l2v002q2zem1vq0pxx9dh8o70n3r64fg9mtu0ednr3299imiml49ry1802ys49f58evutcx1b6xojyo2h1k9wlf0krcq7rzag',
                        receiverComponent: '71weqpkddj5v6dub0cmzho1i97jz1ixic1qxomhocp90xw99l2dx9wuf7zy1e4vpbja7c1pt9ggrmfg4ryyqch57ydxp7dvy82lmseuigpt7eu3114dgpw7arw1jnrao2nq27hppbrriost8vfcjzbgk97q31zcj',
                        receiverInterface: 'zn8ecyr0dpjfym55umjpxylicrh1tdnzllwkysoozd8zti8bwzkhf4tv1gzpoxp9syrba1ixvsc53hrhzirdcmgf8zdint6u7p74yhtl6f9n6sksk9kz30k9zns9zjnzdj5ozxz3tei7w5gan0hdn4o7fefqqp3l',
                        receiverInterfaceNamespace: 'ckp5puk59grwdf9778a79rxtjtejdaf7jsqvumyj1wocltk6fv086zg8k52fa1uozvmah8z6jbgnvohmigaw8qpv1hbeadxsf34g55a7nplrdamu6gormu1mdiabuy7tkmhvobgswqyojt44fxaa1bp7w3l41xj2',
                        retries: 1092567947,
                        size: 7012453869,
                        timesFailed: 2833129589,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('06285d2d-62df-428b-857d-f52c1510d28d');
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
                            flowHash
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
                    id: '527e2a9e-9740-4751-9d99-a77c4fb0917d'
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
                            flowHash
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
                    id: '06285d2d-62df-428b-857d-f52c1510d28d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('06285d2d-62df-428b-857d-f52c1510d28d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});