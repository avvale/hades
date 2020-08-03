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
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ciyv61p1i7q29ydw7jdpn8zubcu5az7habqzr7zmd4pqfyqzuw',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'f5r3nu3f5u1in4ocplfu',
                scenario: 'f602xjzk5qzxki2lj9z5mn93ezus0lsh59e78pb8nbfmi0deguhdoj7qi11q',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:59:09',
                executionMonitoringStartAt: '2020-08-03 12:25:52',
                executionMonitoringEndAt: '2020-08-03 16:45:41',
                flowHash: 'm6o5r66hx57k563a7rff7jwel56uieiy8orumi6h',
                flowParty: 'vka5o8nki3wzur9vfnufualmr9tg1av3g6bo9bw5affoyv86s0aav76k8yf4kzmdxrcy6o7l04uf8rn67m00btsqmaian80z5m12czxtikmi7zv8ylnyykdh6jrf7xo4akx4bah2o7z5acqs4dnwa15dluxb0x4r',
                flowComponent: 'j8c1lixr0pgux6uqseqp225yjfdqz9iy0rx8wanwgtv3sxmqznlqks91hzoyj9mx25ofsv7cdhjwj8es4wucye2h60wdhysh62xh7umrditehyxltckzihn39xjqiy2xf4kek9nvfqfxac9366yxgeeq1zsay9zz',
                flowInterfaceName: '6mu91v0ekqdmbgi4ons5nkpln1ynyrsglx3mrtipjsuayh5iuzmk2v92ysb6z980phuj7dywhtr1i3dnq0b78ile9xw6ingabnkjevomh6enj74gxe9r71dsoc57r0x9upw49cnnt5rnnyu9r4c9fjrlwv6cy36r',
                flowInterfaceNamespace: 'pa12f087xsk2w0meppuw698xbiao75qs4my9ougiklvyp7se98odzbvppi2hrxepsyx4g561n6kvgvvhko0euwgo8v6i69ei2obte4blnlk9o9mpjlv5d1rvxpo8lh0iatw0y477wbwmelug0r7jig4pwlbbxzky',
                status: 'HOLDING',
                detail: 'Nihil repudiandae velit dolor consequatur fugiat. Itaque est dignissimos possimus. Vel sint dolorum totam. Nesciunt cupiditate non. Saepe tenetur quos officia voluptates quaerat aperiam.',
                example: 'qjjdhvnm68rpc7v1zec8bo13iwmlf7zu6obkot25tund6ipqaaxi7z6lnu1d463gyqxzejfht3chu7c6hwbhxcj1bedzlo3l5xh2mclnmrrf73okiqcl5quy4m1rvfppz8d5svbkesciww3or6zwjsy439s8mb4h',
                startTimeAt: '2020-08-03 17:40:06',
                direction: 'INBOUND',
                errorCategory: 'tv81f4o4opqu5d14jjtvyfsjdi9dyagkpe3c8camwwnejps4h2gzpgrs2aaifb28xdi5tfpmr2c9the8abzpksusbao0ko3svr7a9oox7ntqqd6ufpqf2pyr2b0aecso15qdr6n4rfxdssql3kja7gmbay7y5f53',
                errorCode: '2kmq5uj3wcncgaona2tom9izfwxh8ge5goqfx8i0j6o43huyiz',
                errorLabel: 820966,
                node: 5868735461,
                protocol: 't26hypk61tu66z5eodqu',
                qualityOfService: 'whnj3fnnninw1nmpkva1',
                receiverParty: '71uviu263fkiijxipx2fy0wetl3k689sng9q2tjw8j07beqv24hzaxkq9sd8k79ea1hpwxrzat0vufwohnrtuzqsmlzlvvn2ps6bu2slrohmf07c1hrx2mt7y0btq2sh8az1zwvwtj23f760n1ecymwx17bh0fwl',
                receiverComponent: 'dkpt6zkvheycc4bdqjrg6wd5g00gqc8hm4jid60xwcf8azf254j1ttpo96cwtktqit9u3bkyx2rlthtaz92ie6kjqvjzzv810883dwhyzz8io0csyhkh6dxr34gq2p0bj7ct5mydlfp7zjahm8u8exzgc4uu31xg',
                receiverInterface: 'se58lwxnaj5484d6lvqh7mxak5m82gachi87mb7ew6phiz5ckfqno71x1geipglgd5dsjadl84v6pszu1sd29risb3wbc7l59nirlgjkyxwu0wjqusitl48atckmg87lcaof2rz907mxxrdjzkju315xyx3uns3e',
                receiverInterfaceNamespace: 'e01d2s5gckjlnniv9p8f1t8gdyatnsxgrqcii1b3f7dyhk3okrltqf6zxmkfkjz82c3ryjjnv4yo6f1k93bcorr6ywzxzl1yh4zmwfgycztsyivwuh8kdbg2742o5w9inly5a5o5vtubkodleplpbv9x3tteqr36',
                retries: 3019367031,
                size: 6259274525,
                timesFailed: 9962946162,
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
                
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'feue41bbxgjkvhpgyuj5i2rl82x8ozavywp2r86nwsgj10bho2',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'yfof97bdfv9f2ybnwta0',
                scenario: 'pcfbq186yf3k0ncngi1nbyllusgm2jl3m2y0ofa4xntmrgcoyd9rrss1uhwl',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:58:33',
                executionMonitoringStartAt: '2020-08-03 10:53:24',
                executionMonitoringEndAt: '2020-08-03 10:55:20',
                flowHash: 'dg55ylr3pazvbz2zt4388y08655v5a9ori5ylijm',
                flowParty: 'qe7z85cvvspx7abk1gy33i7gq2u07ywgejskjlu8wszv1punuqjx275v1k2p2iplzbgmow3e2mhgdziwyxlhnk63q3hpfqoz8xqc457v92ckqlwm74bzu1lqx03npgdk9483n9542yiik3fva2rfnkv2wsmh0shn',
                flowComponent: 'bcfcfvc2gncu70m1m6wxfptwj7tkm6qgkcv9tjy5cbnhbgnnsg06c85sepbqqs8msn1hodaf2uzd1a7wcl7t1p4onxnw623ce7wa3p2o4h97ur3hs792ne9khtv9bjoighn3chpcxagwh3z84zwo67prabqqaa8u',
                flowInterfaceName: 'ol2n86ih8qcc8fvprqkdpwxv0pe8jnhd91u7g9oxhuin5h3ho5x5hc0ijwq12y69grrt459rqwe7n2p3of1suu7ta8capmrh052c3kr33leipijqx4lxclpst66cy43teulil925hqpifyxn922dnzozzqczqn74',
                flowInterfaceNamespace: 'va51945lv3rcn6918fon94msiy0rsv6rili2u09b4986psx131ijol5i0906tt8azf1jn16or4y7jdvlcvn9hf09538evbpz0jc8lv6jyjqiia84f1ihptf9d5wdb29846vt7zed9owmge1nzjbbcj6gz4t1afnd',
                status: 'WAITING',
                detail: 'Nihil et quia voluptatibus similique. Qui sed et repellendus. Asperiores ab quis delectus aperiam sunt tempora voluptatibus odit provident. Fugiat dolores ut aspernatur eligendi accusantium esse rerum ut. Eum voluptas ut deleniti quos et.',
                example: 'ou1czk1mcjtaxlr2k2colx554wxff54c6d2xn2jj57mgm17r73frbur10waabotnqec20v32x0em99545t82bnlu370ll9j0syva6tq1giycctn1jgn4t7vx46ygwr05wwls4lrn5eb34s0xv5to7l8jq44f295j',
                startTimeAt: '2020-08-02 19:07:32',
                direction: 'OUTBOUND',
                errorCategory: 'kjmjiad4hum1kegg91p3rxv072kuiszh5zuv8u696dsqgy99p7b0s0jw0vzatrigy8r0jba9e23qvuwq83rxdst7g74qxdbw8ileybnnehobzeh5868t7bo9f2nnlo8g523quu6pv3x1v8cy4a1l9495n48r9nrv',
                errorCode: 'mkor4dlmog6ol5jlawgj7tlddoxcf0odv8h7b2389w0t34fpj9',
                errorLabel: 164811,
                node: 2633573907,
                protocol: 'q2snbgualgphvzzvmimn',
                qualityOfService: 'kukolk8x2zvs5gg310fx',
                receiverParty: 'ndknswwic19sbip766c1dnhesoyv3s4s9vlf5yysd8nqk6m5s2zk5nu79mmprzjwohbimw36o1eljixl6i7ao3y73fuvx4k6jojqucax8676rvpxj7e47m3yqgqahav4d8ynwie9ihw70tgbt668lgu51r8vm1gc',
                receiverComponent: '7el18vqs8ogj7ng7w2xheo01dykohp8rucr6ua72oidq9jc65gg4iq5hq0m0xoewatsj3dfei1rl4qkx2e8hcgemziivzrkzotw9eyu9ekl7nsp9x7l12u2mvojwcvodwn48oa8kys9eszp90xiz0n91tajpyben',
                receiverInterface: 'dby0awwkhaxjr989pivfej2g0957fmrrri7nfcmhcmftdsqnosu90no3ym8hafqtlfcof5ozvh6kbe6kqlgnqxskr9fj41vdswhd0b57uks41g9xnme2m85h7yphvud0hajvjchogja8h9x7pre6x5lu85zxi66s',
                receiverInterfaceNamespace: 'g7l158m0s92n4i2gvskuy9zz52c968wpgg15uojnx4a0t25do5b3g3kddbh2o17mkldam2mdpxiyxirrkcgc5fh39dh7m7sz43c4g4dn5gwoowtx9emepkmi4n24w5ir1iiwscyjl3r2v9zl7rndntifbdkw2n7h',
                retries: 9706857938,
                size: 9293329496,
                timesFailed: 8845301477,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: null,
                tenantCode: '6s279n5ohk4f9io8tbb1osk2wzar9qgeti9gg9zqj5zjptn266',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'n1dtmrcodvydkeobi6tw',
                scenario: 'w73pgvnkaieoqpshbiuofhctgq5m3ku8vjsfqk3rm5zomnckwel3oq58k9l7',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:45:25',
                executionMonitoringStartAt: '2020-08-02 20:22:44',
                executionMonitoringEndAt: '2020-08-02 19:54:32',
                flowHash: 'w9j4je01xxfi6y10yfx0521syprcpbfrg16kjqzz',
                flowParty: 'rkzerx6e8kzvogd2v9ieaem87jo9o63w0f7yiv1zg9b9x62cgq6euof0i925fijzehqzwmkmk3j8gq5oub2k385p5poal1qd96gakuciwv3ar2v217b8cedt1o7beoc7oe26egqvx5i6mtiuu4v1zqvcq0fscvq2',
                flowComponent: 'faitpocmvhayeuqpxymqg7ro32wkuevmejc9qkkb7trnrf4qcxbqwwu73i7ic69in2vpfiujdve91upqfowz1hydd7mytol7np4jpaibpmsai8njgidd7e26bz58ttu5mqawbie8v0di7on6pvuh6vu2nlgom2z7',
                flowInterfaceName: '5gnecvnwdyh4dwjb6u71ws0kixs4z0saq2cifyxeepvqezqiwv1yt6x1mhrm0x2wos17rad5g7w8srbvwwey9faf42s4qc537xk2qd1ld2uy835hfeg8k3xzoo61ukg4dnnv36k67cxuuax6ky3us0xp7st5sbvp',
                flowInterfaceNamespace: '114sg4bq51xzlbgq6dlv58gybmwxl7u902ewh702ilmm83rf7k3x4t3eybjfvdl33e30a91jmhm10i45ceq2u98020p0rsqzoyr4ucz4acqm0hm18obnol7q6qlk1u7dy24yjqfd0tnlhsqhy481w3ob64vdi6jo',
                status: 'SUCCESS',
                detail: 'Atque vel minima doloribus quis ratione ut velit inventore. Odio doloremque optio ipsam ullam distinctio. Cupiditate officiis vel reprehenderit cupiditate nihil molestias aperiam laboriosam. Fugit eaque accusantium. Repudiandae provident maxime ullam. Repudiandae est recusandae.',
                example: 'dbjxj6hfja8w3t7b3pwtg4tmhh5hu3p5xtoz8ktdo40g57vkiv7sh52iwlw0q6x79jehopwxynnl61l4wt2mhl90s4h3i8bbm0nmkj88o4h00qa8fa7y188zwuqajgkdg1y12kf1azdr55cu3nxipriqt96y1hql',
                startTimeAt: '2020-08-03 18:11:15',
                direction: 'OUTBOUND',
                errorCategory: 'y7k78ox516n4zh9xvm2xie10zxlrahuk41o436g4wu0mw9471l2edf3lnnlrgnrouktvov3pwbzcsjbzddu2hxzz7nn86csub4jdaa23o0jpqntgspq4vzzn97jvjdmuid731hhhvo8fmp18s8tzd9jftk7vy6b6',
                errorCode: 'krxj47jdi7t42203pmrx77i7b0h3v2z7ye78h21phvycsj5gje',
                errorLabel: 517549,
                node: 6970577181,
                protocol: '7vr1r3duy4ng56ht8464',
                qualityOfService: '552889l0qh7lohqpxiao',
                receiverParty: 'y9omkv09lap4vov5j4xmshodkjg9ixoadd1rsmva9tvplaziqf1r6e43fse0fuf6g13x5qd2sbrxm8hwbjtbf5mtcyx7s8tiby9jniqpz50kxaimtzme4z49w9a1yd92zrf0hqbx5i8fkvanbsn9uwatja73uqpt',
                receiverComponent: '6cqqrn84f3m62pc4xgg04hq4aa0vh4aujeol84easqbe88tz93dhjozds7of8mgc44ylt6r1nffpdzh36mljy4php87tqb5kqyr42gkrk3glb46uyqidbd1jfvf0pz338haodzbjfdcvslv311752ncyhvkif8my',
                receiverInterface: '8wjig88a2xmb6vjfbsbqap4mzzli9ay1wv95km8iivkox4d2ljpkkkzd09ujpx4jwuvzv40qgtlrfvbrme5xxbiyslol6qdh9pv276sfu05bx7uq1l1u9nvr7o4szn1garbb2hdzm2w14eftq84vbz2m3f8nu517',
                receiverInterfaceNamespace: 'qyb2zle8sbd4cbyvq8srthtqsufod1i7g92lcm1gh024q0m5e38jtng892hdkz9qecrl6hzxqsg7btd3bc67dyg8c8s0df6ktasyydr8amum6sh354znkok0u31f96bsthy3auqlmj89y5kw6af081rr4ak0gi45',
                retries: 4037384490,
                size: 6589106013,
                timesFailed: 5015167899,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                
                tenantCode: '3on6n9bjxgrg0p9re4dty9zdwi4g0tw1uby35yjpack15gyxtz',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '7xn4o2su26s6d5p2v2kx',
                scenario: 'v9dm0iz9skxzfayn06sot0j7oamgbqwoa1eq4kz4ijq2ueq0dwju6njwjyda',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 19:41:30',
                executionMonitoringStartAt: '2020-08-03 09:34:31',
                executionMonitoringEndAt: '2020-08-03 03:37:20',
                flowHash: 'k0mtckeev5ep82kpbwgzcick012meq455fmewkw0',
                flowParty: '3p427ybtjau1chc3r5selj2vg53j5apw2wuxzzmrh7ct8wb78dvcgie8bwksmqot2hn81gci66leptzrlqfxdxgz3x8pc7ajqu2k0ocjwr4w0kv0rxjue3ztlgvr79umtlovzmcb0uetdpkj8rxphdmsnisc3zz1',
                flowComponent: 'saqm3m57jsc50zs03saytxew61rg1v0c9orwfgdegxaq3lisasdrwif8o84cuvrnfhgv5u5d6ywr0ptls5vzlvd66u3vuy8ns7j08o9291c9yx38zu5858xdvakarpgjjjmhp2q4kf3l4no4bxqx6jxrf8nffijl',
                flowInterfaceName: 'keg93i7lmfrgt1oubyutsyuszl9he0s33a9r440td73tvgzze00n6jx1aev4mx3lhd32mhb23r9ieihbmr1uyodbdhvi7v9xwrs21v35xrfhmcjx2mlw3q9ztlwvcb4cl0ggfzzqtdrg0uywywebmh3j0b9gxiyd',
                flowInterfaceNamespace: 'ixrqkkglcp5xuca432fj7cjl5ah0uwwwcgzekywhkn83c1h1vy8pbcqrycjzc9f0mm2kbf643jroafigt31gwlsjehh4yrllxllv5j53fa6i41hga0y50jz7zu2uraplgffo3fnmap0oj7wrhksegfeci77wr2oj',
                status: 'ERROR',
                detail: 'Dolor alias itaque tempora iure. Error a sunt occaecati tempora reprehenderit sit error. Qui pariatur in nobis et consequatur enim eum harum saepe. Qui aut minus tenetur ipsam ut illum perferendis. Porro quasi sit soluta itaque.',
                example: 'n74vsopsaetnp11vekiicev1pdernukxzilw6s0j1rlgvor3ho5zptbvnfigguwpigvu8e8airye19e0n8werk6q4vppfka39t276aboq2u8wl43buxw56c4oiokxlkkots1px8zuvm78lux2x1gbze5peiwnnjv',
                startTimeAt: '2020-08-02 22:11:09',
                direction: 'INBOUND',
                errorCategory: 'feuoiy0ndto2zik3bkj6mig3mv7vfrldi7ltbg361fu4rby40cg5uz6yijzmj08c4rg7wt13s20fdhlae3sh9nq1vutp00s9yg68k4aziqs69r78ql1hu0ehe1qysngi5k1xlngl8g3nptthj8rwiytx3hchel7g',
                errorCode: 'muo60cvqrokqmz2t0bkkp53tofxwxj4at74yhf849i3j09yayi',
                errorLabel: 265854,
                node: 4827086425,
                protocol: '7a7k9cpfiqgz04s3ilqk',
                qualityOfService: 'gcsye0ctc3zn80ozrmxc',
                receiverParty: 'm9nqokurf6n433u5cnaka1zvanqbyzx9dwmy3dc50r3qzacy0ralfxvz8vqu3nkx0gkbmyfdt8di2i1x37p0clwf1plqvdvn3e0ltt5zgv6exkcfqfys64vt50f5fowuqpxbr5ib72azvm4hgau6tuho0s82a3v1',
                receiverComponent: '3t7exipidgd05yh5tx06vn79l9gb794isoio2h6cy2evcxtl11wtt8e94ptzq5cg3jlioyvs9f7bta0zz16jh9dtqok996uuij08f5q7bp55s6z76iqkozynhsauskkxxuqzo8wlmaveaquvjkyncoubu529oq9a',
                receiverInterface: 'ovw3mxjesnjl3t0o98py4e2b6a01pzkyed1xpmflfez8kirf5kbrkeeffmnry46o7ufodfj6t46vfyx1w7k3u09hd9nq7m25wgd65zozfe61d6l9ch4ae2qdueg0n81qybimktc58qfid74rbghlyo27bivp23ar',
                receiverInterfaceNamespace: '8islsauuliplg9ammkzzxtb3enk1et188zcqkhr4uvcxbk1oh56mnnjzmf5bvaaambz9iaeclnu22qk1qspt3c9iacjd156ldteiw55qhks7x6ajddmch0ru3nw55ld2gda4cpaa34rqqkobsttw3mfthy0brysj',
                retries: 8964625081,
                size: 1475535825,
                timesFailed: 1934049205,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: null,
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'o97prp2l4xj1dgjetb3h',
                scenario: '6hyxntrk8oo8gsxnn5xnhb7p1js8rue7pjqktwq1ff4o8y5v86jnul2bjpse',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:33:14',
                executionMonitoringStartAt: '2020-08-03 15:13:36',
                executionMonitoringEndAt: '2020-08-03 01:06:08',
                flowHash: '6wsjx76067uxc7n3ta9js2aicbpjm0p40y4s9qca',
                flowParty: '1b3uh9esn16a5c6hqhbhnfukyv1od7wvlkny67og1xmgrjch65qltok7wuz4mvqm2un9cxflasef3e0h9ck2xart0zfprn9v2kl9om5x5wff7t92vdnzuve02bdc3b01h40tlespn5recz5138xyxgn7daldi1wy',
                flowComponent: '9ezq9sfrctbhbr5ogr6b20uwyhjem1sh2t4vb1giu50c0aqtadiveh04x8ngasryq716htsaqw6tp7tl447m41h80e43bnwshbz5hklhpbknehczm8o17mgb5ns1pt4jiutj9blmi35f8uecgq71oh0wq87v29lj',
                flowInterfaceName: 'lrl3s3kf3i0n27ze8ktbhoq32oqpya7pob1jxxmgmiivub2cto2sroeqbph08bvho4fh1g1fvkn7grqfehc0dmqv1qbpmlu5dmvg5jn717drqs8ie9py6har5f80ecjw4hpgvd9ay689n6fauuo6lt9m372dxvgl',
                flowInterfaceNamespace: '3f9cp6mcfeqcg4cdxtrb90y34mi54v2mbhvdmen6nmyypzwdp3xpy2w7ffkd1cxfuj920ekytn4zhzjsrbaepo0kc0lfv8saw8el7p37ypmw067uavqvdxe5jnpcr7ha07tdetepwwud6exq2lgo8bm81qpgrc84',
                status: 'ERROR',
                detail: 'Omnis accusantium autem reiciendis accusantium ad. Aut est eveniet sequi rerum. Officiis saepe doloremque aut occaecati eius numquam voluptas natus.',
                example: 'o3nyx10j8p8mnquhqsng9hhqmfwrdccvcnfnmzroosayoy6hh7vznkz6yvsow509s6221942b3n11lhwpr6gv5ajuf65vfk3ox4417hdb1pntprv4d1ba55d4twjxzz3qp829ugni16pssw9nybka0u7us2690nq',
                startTimeAt: '2020-08-03 02:31:21',
                direction: 'INBOUND',
                errorCategory: 'tszd57zqgqb31x7z4m7pc2syu4r67fscrmap3sjiy7msfhkdzsyonmo3agpaa9y37aavxgqsbpm4m777z55q6cnulke8pvqaagk0l4kbeb85179kr8mrhksuwz3q3h5o4itot41fj11okc5l5tuyzdj46h4z5z7n',
                errorCode: '6j7jyzmco3tdu1aphg43cg011bsaaf9zm4hqbl8f4b4pdjhpiy',
                errorLabel: 449463,
                node: 5473139304,
                protocol: '70u465lptchw92yv8vvs',
                qualityOfService: '0mq4mx98f53w3n2e2km9',
                receiverParty: '26yb8sklpephqj70jwdw2aqcrqkoshnoisn8wvbqg7qlfxkj9wrxif3weka60o8z2dok9zndw919s6519lc1waogmo5t9hyinvzz5hslf7obdt5l45xdvlziz503t9jg7xchiy6510t3qyr91va20scyureh195r',
                receiverComponent: '6idd3x03cupbbedbydrkim5pw970lgit5nel7xyfqz3r11q8dgjev0owube3sx9zhp91ydfpehh0b3pj1jlkj8fktdwn4kkzx0448i4k9g4wdniuakxxz36679j9uxwp0xza27corlkq8l3rxe8e187crv6pxg4f',
                receiverInterface: '04rkm7ogmr2bghn6k73rkzsz4prh03zncvr7tl1fgghs0mzodvhgtmjulj1z8z8vj7mfirf7sipfcltk5yp41q48asti0dt83sgeuatbcnvgcndwn7a1xg0tetrmizb8v5vgz6bw5qoi5zphr0incgtljvbkpott',
                receiverInterfaceNamespace: 'iry9xgcvd5bpz0zmbd16n4nt7ysn74ycr8n81fa7ng2le72zn3b88z7tm75zeonrsm89am1qxhbyl1muk2mmrq39c94qif7ueb9sw12k4q1yho3ory9a5sn2yau930ljlja4bqmb6uqu808xqlc25vhpbdnjl566',
                retries: 3568903207,
                size: 7213044849,
                timesFailed: 5681888625,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '2rlmb7tg2sdszruaqeni',
                scenario: 'y2mawrqhgahaxl2nk5b8ay543xetdjywayvip8o5ms7u77inyvot0ds2h3f6',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:40:13',
                executionMonitoringStartAt: '2020-08-03 15:20:51',
                executionMonitoringEndAt: '2020-08-02 21:02:21',
                flowHash: 'htyrgpcd8hd6xcvde4bmnfaezlh3jbyfri6fy23t',
                flowParty: 'rzrcwf70bzv7n0yuoe0ehxbbfgfsqczs5j4gar9m8wa9xov1f8lfpjbltu6tkl43xqbr3lkhq8u786oabxity7t8oawleantlogeun784augy1ginz83nvtpho83fvlolose86sv1u151qdg2pbby3j7qdb8m2ke',
                flowComponent: 't1eirjruzx58fkamnbb8f715vxdlbwljzipijghphe6tgxo0ri081b6rby9z0zx9liibxbvohku4hsl6dj92pu2vuqxhjt91lnby6n8hf9b3noz06xnwqtci7z3jpwouft0wykcvw7v8y8wxpoj1xa843lrug4x3',
                flowInterfaceName: '5q72fs9eg6f6g3zd5g8qjag9bzhk746ve03sbchtyfhlr51476kp33p475uh4993d7n7gp3dy5iqvb6iteror5qg4e7s1iww45bmk7dyn8q0k3v80tuj98gihads7y9xigz976com3fekhooofbqjmittzwwt73l',
                flowInterfaceNamespace: 'ysqf1xrk2nqiksdnb74uoagjotshwo96nujaze28uhnc71xwgcqribuykz9ixyoyqdqizsxsnhpj5jxzp3lypkh91a5h1ka7nhj5clooh591l1eh8p13ntqcy0fqb6ma0ixeo8c1q7n0g9e7m4fqq4zz13tflkkr',
                status: 'TO_BE_DELIVERED',
                detail: 'Tempora delectus corrupti voluptatibus iste. Consequatur est quod et fuga atque maxime harum labore. Necessitatibus dicta optio veniam corrupti illo eum.',
                example: 'ibl0604dv6639lwzoceaj44sekkk7uzd3ibvzth1cvcsvlzesm9007hfo6xiolxbmqxsabylkzyhjmphngnv3e7d030yzahwq8y6y608dcxo0dk7460ftobw110dvf5efybinplsej4o0i8mrg7zcy5293zwagbp',
                startTimeAt: '2020-08-03 04:16:33',
                direction: 'OUTBOUND',
                errorCategory: '5g4bjndu7zxq3c87qv5bt2mso13tf7spzvwz7kcau8iulaz5g8s0zs4iw5g6ogs87ryezxv0tvdwxgk3drj6uerd2gq6cjdgk4atoa4r8icb18cnhvd4tprgkhxqmg9oh8jxkbsaejuqfynyqhzgfnojdm68fd3c',
                errorCode: 'x0hrchri4y4czozc7l1v9rb7502bst47a21dh8rdm0febgetnz',
                errorLabel: 990785,
                node: 8889773642,
                protocol: '6mnoma2o64owrz0l7l5b',
                qualityOfService: '1725xyd34jtt2bhveagd',
                receiverParty: '7q7bvb91b2uwa2gq9fs78gtc54hyr5gtsy60uj0tgf1zb21s2imxujn2wmynlax6oaw8zpnrveq0he26fk6qfuslil6f763bukwsjxz3o72a7rcecjp05mxtj9hvlj8dp1uacv0lmoog04ptcqjdas5eckqgried',
                receiverComponent: 'dq5goepm6uezp64lg0wyvct7bk0g33w9wjm5ildc96l6rligdoeb1s48jylj4y2hd9i6ecrgde4rxereuqay2eex3y29thylu9791da0o31xxi336c84fz5cvre9vsycocie1bd8s2w31xtpgszhiqiylrw81da3',
                receiverInterface: '8sylmxoxdhndwtjgf1160jhi521qvssf6w1bpv9hrkfz4dxw2d3vhf4abirgz5x7c7ycmuli5wz5sqpqgjdykd92x7a0whwn2atet1iceu83wl9flbuoapjmhdzx3h6nmidqh2e842ybwnx0mgwym2p7ujpzxuv4',
                receiverInterfaceNamespace: 'ihocotsszwko1qd52i1vempyww5aewse0e7ln21fqexr60wi71izw74q6cgeseak3rvsb2qm7u8ulwk1fga4jvndxp98tnxsbm677wgfn0hbm9xsjcpaxenikrx7rzmc9gt1otrqkoaw396diehsdtipi9ucls11',
                retries: 7804393977,
                size: 4194044276,
                timesFailed: 3453938339,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'euesed5p86h8tovor5533wcji30qss305j7ipz9xll6z60gm0t',
                systemId: null,
                systemName: 'jh173k77pg7ieyk3716p',
                scenario: '3jdzzy3vh1ikqaeusto4h4a73je4rnkjaw77y7mpcrgg46i7o64s6ksl7u4c',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:46:13',
                executionMonitoringStartAt: '2020-08-03 04:37:56',
                executionMonitoringEndAt: '2020-08-02 22:18:02',
                flowHash: 'gsd0zgquazf0d4rwt9k2mmrtmwvcy0cm43rpsjdi',
                flowParty: '10rs3qfdvgicy12v03ajizot64h5pxnus9e30zpse0uraidca03fouw982wk58wrfy3xypcrbs232naqq90nt6tq9sdfezjjjtxh0cbnmmai7rfd2x56j0pc9gi0b29j58dux5xq2bkpzcbzs8bbuoz79gibrq7l',
                flowComponent: 'tlx71pog0qvky5bwqey93ly36k9yg34uhiz200v5j90cgqfrkby4xc72f5y6izm84pd75sfgzcof5gv8zchesfafa4xxt1rv65bwxgjvum0mx5g8djpwg51woip5ppbgj9uzy2bbjeha22ngvpyywyy2x79s365r',
                flowInterfaceName: '6o4wkv2w29p4qzlh6l1k11sjklcjdilsvwu7pp89f4bl8evj3xqft994xns60iwva6zoqt4peuh72w83nkkv0m8rwnnqs8w17jcgyx5qyohmb4bv0th8vyidauh140nznr0wmfbf9g3tpav0yz0s3go2v6uvv75z',
                flowInterfaceNamespace: 'ov2vg47l408gjyjualzupkcmmldbqs6ymd5pjq8j1wxgehy1j7hvvj5w21k0napijvs9ct4yoj8kzkgtdz4hwsismwl36k4uyp4xq5umu9gmxyf793bx2cg8ox9a9bdpkcttjq4u8o1wyaduj0evz5vidj28vbnn',
                status: 'TO_BE_DELIVERED',
                detail: 'Minus harum officiis consequatur sit esse maxime qui eius hic. Nemo asperiores illum quos mollitia voluptas laudantium dolor itaque. Natus non praesentium qui aperiam doloremque labore cumque adipisci. Aut amet qui adipisci. Accusantium molestiae nihil quod debitis.',
                example: 'r0rcg34yktn6id3giu8habyk35by7su1x4nr78w58nzcs3hvdy4a5xv7sluxgwuy0866smcng7eceqkz0cll59ea28x90yj86fwl1uf9qvfw41ea7b9nm12i6rs1a3v74iq4c3vyhpqx8oa9ssrh2e3406t58cfz',
                startTimeAt: '2020-08-02 21:55:22',
                direction: 'OUTBOUND',
                errorCategory: 'obgl7b5qcfrqboqs6ta83g4e5bbw0shp5evnzbukl63bpxwnk6tod9n5iqa5xlz701ch3hxvbjnz793zbckskmv8rt6dzh3rgrcapjza3shcp6ym6dkzy1kxqsz2gpbekjzsdewyauft4qnmvvmogqjlufbenhk8',
                errorCode: '05nbovy1poxfx4ama0arf1xycby53qcwyl4y8e79ntw0fs9qd1',
                errorLabel: 790787,
                node: 6758587639,
                protocol: 'sne44yspy5l7cozkqlp8',
                qualityOfService: 'jo4hg32qvitsyjjm0dxv',
                receiverParty: 'cwmz195ey6rby4d9t3hw2x0stppz69xwirqil2i1e2u9hl4x5ahqhglxjq6w3xaulf9d29jhzhesho44bbbrksgqhcwgi289xv55veg0l04j5vh8wkq87zbw0aimys3v58jrq07135udcz3rok4hmeqcgphpeu6w',
                receiverComponent: '3d15f8nqstv63rqmx211n47ekrp6semkb1m5k12e2tw41x7icadthgq8jchmr411st9uberdwqtun482gsx4ujwwd40lc6e6d9lcy1viz1l2iwsm1fs2t0fsjmuhuticnkuupz1876ls7u1hh58wa270chd42n9t',
                receiverInterface: 'u7rawj4ieudula5ixl4336u7qnf90t58t82xqxrcl6vgc02q9jn4cx4x37uw94pri7uxbcec94ed1equues9pt4tleqiezc5avfgsfia0s227u92pi2r9rnlpl7jkgcourdcags2oyrd56xdm1bks8affagpfkh5',
                receiverInterfaceNamespace: 'gkw0wzkg0172ojpt65a675q3dzwoi508fkzfwycan0a8and5ov35bg74b4w2mks1yp2354taxzwmnx9wwzasqcz97ux681y1zgjenjn1rzzycecq8utvflzs91lrpq4erbolhda5pjw5c04oigspm24ryb5qjh1j',
                retries: 2377311381,
                size: 8091781344,
                timesFailed: 4523127183,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'qgy2sa2kzltzr3frorfhrwaua05jkci2v6oj7vhwoimnayjbj7',
                
                systemName: '0zy7m0ylu93uldsq8krp',
                scenario: 'eqb64xdt9p34r5zawshazk6yt9eqlxismo17uwznf3trxg15txubwr7dx2le',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:38:08',
                executionMonitoringStartAt: '2020-08-03 13:48:50',
                executionMonitoringEndAt: '2020-08-03 01:35:33',
                flowHash: 'p1j8qlscvcjscxoe9hjdtn5gqxzrdh0f3rxk9elq',
                flowParty: '9micscd9cul7l0c24m388oi9ma0ybu6nrz7r0nyu18ektprdtijbjlj6pmangxwdarhrcplerievwkpl0vd3bkl7d0wgfjq4b96ogjch1kvl6ve2c44th5achbahepqmjlzjyv6rk3w5of45jlf5qlp35cktsxdq',
                flowComponent: 'a1m555yecxqfvo2au6d9bnfabctrxy30mayf209hqasdqemd4872pjosv2vcsdyvvwoacckz3972qdvmqhpp7ufvrzin19xt2mzi7rkutw0qqvc5unft4qcugvo867i4j134kuk0o3p84aty9yotuwkzkdf05dxr',
                flowInterfaceName: 'xnwhitd7jqwmklpkm6me441ckfl08gag0gze1glj19wzqt9h0g0pfuokdb9ilgisn2d1l7l4ytxdtbbwgeas313k6gokd9i2loyqfnwcso3shrndthqxdr9tqnisjgki79261o6kl9gdiryj68v0gvmgqptxv1u9',
                flowInterfaceNamespace: 'laqfy05s2uikq806nsf2nb0stsh4lldcpl8mhfvclhnjzlr8znfxzs6t3lib899ljnpiqvbz0iz9p2k8f5qctud4on1yawwjei1oa7ko05steqllp2cmbb5v0f78wi744veegramfx7zqu8u8gmqud4v75tz4h5y',
                status: 'HOLDING',
                detail: 'Accusamus impedit provident dolor asperiores. Sit eaque itaque corrupti hic ab tenetur. Et iure tenetur modi. Qui ad dolorem non ut et dolores qui at et. Quidem aspernatur eum beatae. A a consequatur.',
                example: '7fcpf0d3p36ulmjkxf287zgru368ytpsptag4vqkrwr4xpiahgloosus9ippcq5xehkkr6d7jj3rv9uvvd0mxbypvtag48zvv9vkznrwc38stspiptamf8h6y5h6rudkcj6h47yabt8bvctkvy5kgr0q46m0x25i',
                startTimeAt: '2020-08-03 05:01:40',
                direction: 'INBOUND',
                errorCategory: 'mpyanjbz826b4n0fv46z77qxojy9xo6li6esbi9odiwtzudu4x231ojz6apw534v7bn1zsuu63y960tac6ep7ce40ut4yyuhskw73mqu61yi7csvk51pst2g5vtjwkfg2kr85gn1bo2o2oqpen930hizx5dk2dv8',
                errorCode: '0uv5qp448owq2zutokhjumwvdf4zuwpnmr15u98um72bz3w6ee',
                errorLabel: 513063,
                node: 7303079923,
                protocol: 'ur7qtrw0520s87kgnh9q',
                qualityOfService: '556u5bz6ie9y8c9572o3',
                receiverParty: 'f7dbo0wjfarlbz1g5pczd61ihp0wskau1jxz8otzlcf2bxamhdv9ezpnzyb6mx1l1ja7ctpqlzh7cs4vbzzfnshbs09wjnrlg7e8ldpy1z2rg8ocecc0nad4nrn4yazw7ywogcjiynpzdhhbd46qw9sd54k0yttx',
                receiverComponent: '90jqiypxrkeskts4jv37myw0mbz2v64jn4605ina9vb0nfd1rzf7mx1x50m4ttl277znxlm1k9q7bdfmu88fg8mum7m16z3jet588oz043qis5q6g6fkmwmsz3p99n9qq6hgrp31lv9cvvmvt4r5lasna81446dl',
                receiverInterface: '03wa0mlbi04a26q7aaxgt080fmzahc4j7xzhw6ry8p3xd4hzqssdfk29ctamtik6owv099ze8y1gj2gbdp9xlusomqawu5ujk66mk8bzqlf8kpwkyzq6wqgmmumzcf755j3gqvht0ctzpj0pi66n6dndly9ub5cu',
                receiverInterfaceNamespace: 'hs9seuxjs4f3g88c9oxwxyu04gzx4z0ghlq4opg6l7zbpghvqzdjj372d7xuq6lhzm7tnrviqrxx8g3q79gliq5ybsmn7rfhpzin55lufomiqnzcl95nyu6p6slhloiwrlamyosog04sd9yff7z0c5j43swdny62',
                retries: 2105359630,
                size: 1764751140,
                timesFailed: 4155534497,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'tc8ceajkrgawyhzuuvxj71gb3ldk1l8qxh64sefw4s9t54ep5t',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: null,
                scenario: 'h31xjeo7777rjnlkbhm16bi1d7hamv6n9nj6fue9cxupbobo7yfrrsetrlbo',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 04:02:34',
                executionMonitoringStartAt: '2020-08-03 15:10:32',
                executionMonitoringEndAt: '2020-08-03 16:50:48',
                flowHash: 'rf637698a6gq5p3gns0rwbe0l8ken48hluhlgfl9',
                flowParty: 'un08l8296eo1e0hr4we6w6kfukx6u5cahtun1ye77f5ntyk4f7af44p5dffe5funeddxic666o2h0g8t7h3itej9srhxbhqahw79x2wuxk0uam3y22cx5lwf5g79yeer3dht56jy6ec5w27ikujyf1uub1j5w5zq',
                flowComponent: 'kq593m1hdj1jf1g75to6ovl1epc49f70v8iji56el18md2kalp2aczn2ti42ra1xrdo8sqlkkg0k666pw6nepz6byrr0lzjhd46e8igmb49hsewdx2m4ootg5a8qncltcqb766hwu1ezab9o3f2e9imgoemdxray',
                flowInterfaceName: 'u4zqemf2danv3mgz8d7jhoa7heiksvvmotp8w72tgrglnpm5p6itf87atce54rc8vb3sn0fc1znpthntipqgl4zn56u5hmdq67fch04aia6d13bmixeabk4xq4veqawxbhf635u84ba8159iiyqteivb45w0bac7',
                flowInterfaceNamespace: '3vcn5j6q1xf24i9dbvmp5qtocvn1imwhgyiwnaksigbezlz1ntthpi8i5zh6npordo80j0tiuoibfadh14hf92skem1jniv4p9krtbgskocppyegv5j7tgbhuacb31xl18ewv3w7fgnhsig57539qrfydlk476u3',
                status: 'HOLDING',
                detail: 'Illum sed quod. Eligendi quo velit et pariatur nemo. Qui repellat atque non alias repudiandae. Qui et expedita quia amet natus aliquid et pariatur id.',
                example: 'kz2gzemt70a9ybsyoj8xgy1g1s0wrywz6gzriyai3622e3o22nme7bcevvsz5oer2ql26qban6hx871eme6eal3iage4zi5j143yf8lbc8bldq2kv2yrbtfsauug9yga3zxhnxd0lznquatcitxe49wc4fa0f17n',
                startTimeAt: '2020-08-03 02:43:27',
                direction: 'OUTBOUND',
                errorCategory: '14lpv2gsjo6ruzh510hgqkd3zel2cu1iv0wqzrjgcv7p5pxvjhmou70jyxjmn48hf4fkoimbpe2oxzkb6ou16iiuqnmdgi0x7z6gz94439n2fkkcrjpxi2s3ov4787xqswdrkutzcjwwy8u55vdmw9hmd64hy97i',
                errorCode: 'mzuq0d0n2lxllbjsd57poi734ij96dvb46f9jx6fdg4195nd36',
                errorLabel: 254381,
                node: 9527790769,
                protocol: 'bfjszmi6vmhdi5rrq6pt',
                qualityOfService: 'wxvreo29twrs2agjgo02',
                receiverParty: 'xiy3b65yck8pklwa7m5lx9rmmm7myxnyi8ykd9aolu43y863vyhk6ran0iqo1bl392qlvkzvcfoznaka1bdvt4kl7btuixkzja1t8gi0bltfa5x0wj5k6fobhg9z243canbfi7jpdda6qtb06kzydqpg67tt2vlc',
                receiverComponent: 'e3rmx3ldzeemkxbj6qi9n9ayznaadbegccvonbjwjr6ra63qar1j1f1u392315lfsi27hw47lt7chqwe79wjyljpg7ztrjdxv8e9a20txazmv9kkwjeimjnndmztnihvoaqy8ec3m7ln7y4zb2yaninn0xvgsnft',
                receiverInterface: '56zujbmwbc0mz6adnlotj6cw2g92i0ds2xqwd7yhj47tism8ncx5pakghhrhyvmz1emnejp19mnjvidg0cdzudh3w2xjtq9ir0njllsyfp3j8015wbe0i1y24ajbqu1i9n57rkyrit0vg3wveennartn74hl4dn1',
                receiverInterfaceNamespace: '6dfe4wcy00qfhn7yc1wxabce76ewk6mpgs621w4u5paokj35r3l0dvwsfwx9h81sqypsylkqrv4qnqg82ixcr9incdyzoh6vzqsr7f3h24yxq94e8dojm0kc0rnxe4i1hmyg6oyx2rfml9mxlshxx689fik7d9zd',
                retries: 8256713367,
                size: 3770251395,
                timesFailed: 1732709314,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'fnui8t86g4x7m2ckxawgnhppsfzmp8khe2vme6nq6gkk44nwi8',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                
                scenario: 'jpt50s1sxf9wbf1xyhxhn7xs0gi9bw7rnz07xhukk13sfofnmaha2bo59655',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:54:57',
                executionMonitoringStartAt: '2020-08-03 00:35:01',
                executionMonitoringEndAt: '2020-08-03 03:33:18',
                flowHash: 'ui1j2jlyc2grih00pbozhete1k322fsrieffs5xv',
                flowParty: '1fek3bhk4up1dmjdr7kl6qkeqljoetpu2bqetk3k0boggbl66elcoeru8gdyq5s7to5hv23c0nl5k2qhoi9ne9kj1dqm5fv9bn8veilsi907iuqf4iuas4rrimfg9a6gpqx3idtk2z8fmcz12rqj5i4z6j6b2x3h',
                flowComponent: 'vsohitn3zp18l185bykok7n4mud5u6eqmj9p6iwl6lqdf8ecf2ws7pem16zj97433dxx0k51o34j19zrt5d1ctvgk6f77brybpuwbzkcp855rg1j136ixd4qinx8e38d9diucxztu70dda4yjngc059vf45kmprv',
                flowInterfaceName: 'prflrnxhc80e1clgxtrm67mkn6o4ianmwp7ts1hpx96ctanaroivdn3ksj35op74f7shme1bj4s2ixpsjpxma62sbks8ca12cef0moxtxlajqqv9qsx71ntukf4snyamswij4ymxj11t2m2a0dskhctmlfwa36gv',
                flowInterfaceNamespace: '2a6jfge31aria4geujjq0e1z1tuwfy6x0zsn7hiz874yo23ucu6fyev7l537ucjjmlhp1dny9k2vc4aksuawag5w6vsfhq11dvo9ccc0nheozad76of5a6jwq3v17cx119629udvxpy5ywxn5xryx5cmt9pysofq',
                status: 'TO_BE_DELIVERED',
                detail: 'Minima eligendi sint ut earum consequatur. Nisi ut dolor iste minus aut. Ipsam nobis ut similique at quia voluptatem.',
                example: 'ix9v10o1rp2eidjab83j48rqj0ovil6xe8bih3y7tngjdoehbu5gi3wn37dcn5rlzyli2jvyfhkpuvqmnsk8t2ts9pnhzmxs8f7b8upyyrnjetmnodfb3uwinbdiuzowkxkravroayc1kqop6whv879exb3z77yv',
                startTimeAt: '2020-08-03 03:06:23',
                direction: 'INBOUND',
                errorCategory: 'k4gwe73abp2ly77doqsoaegtm3dlqla8jm35ho6n9g420m9c0nc9u2b1y6gm9ccksnq2e1rlzno262t8civti6ydeqh6p93vtkj056lymzb5pjwvi06w7mqqntuqkaa8vsxdu7h5t8rnjfx3ohtfgvl0lcz211v8',
                errorCode: 'm34hlgt2tz0wg3o7d93f05astdpmdk0xxuuh5k40174yr9wazy',
                errorLabel: 389848,
                node: 5444652099,
                protocol: '8tirqmjg6hz8hsz83jip',
                qualityOfService: 'jwntoq0cab1zztmvrr9k',
                receiverParty: 'dabwquccgy2817gi7spd0ulhprj1286k6otmx4wipwrddwgmxsdfz4hqm75tlv5fjys6knwoa51kdbtye6ud2lh9soearz70q9f8t4djxqwjpv8mquk7vru2enizcwyr712fxk9xqv7c31xwksbl7faf8s8y223x',
                receiverComponent: '0f5mw44wcikoi1gncsfbgcv39cd572litkdehd1vvyx7bq3xjd13p85mz3kjvrm9fgbiflt88thquer7xez62gtvxnh57mwkfw5bzvw8q7rlxvowtjztnhslh3coafmkzvqvz34dxqhkot7h2w1qq4ectcv1qacd',
                receiverInterface: '9hip5j37tkmf6fpkqqfy8i49d4rv4af68ra71fqt6w4g53h4w5q4n021e0blkb0wpivjo5l0s3kw3wr17q9qdawo5qcsi8256exv1eimmpgmgjv9g0h294ubdydhqmr9c5atod1txg3gi75y2bsj86urztfcfcki',
                receiverInterfaceNamespace: 'dnz6ki97r5immtj6cowy084gyubjnwwzh39vqu0m36rfr5dg5gja8djo7t3emskket8byzh8qfkrsf45k1ladraq7d26oqdilwtfvagp0kx6yoqv4rlqcj5hptkyj44z9y8mhdt8zncfighqbp1kcjfare29zdn5',
                retries: 8184078918,
                size: 3008502945,
                timesFailed: 6297087401,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'qx62pcw1tiai8cdpgsb6q2mtvhnk54l7lsees1sp6dhldggi9g',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '8pp38mgprmb7dut7suw7',
                scenario: 'uubcp4ia6yy0n8z17toqnos3nvggezrt0t65tt5bber4ieol7xiqqwepf2or',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:22:07',
                executionMonitoringStartAt: '2020-08-03 13:42:33',
                executionMonitoringEndAt: '2020-08-03 01:32:42',
                flowHash: '3x0dj0dcfkejexv2usiv0v166nsc25gc30dw20ui',
                flowParty: 'qk3ofaymr2jax603vivwlhd4yc35gvlt8toyz0o2hvypy6di3abbkwyymwfgplbmal4zkmo5yggt96eit9xboinmsbhy9lqjwi8rrze1iampvzdg1gg0a78hwm7j46bw00co0vwbtyj27fb6g5rn8lrrex88nbcs',
                flowComponent: '9x1te8cbrvkjh7p6857zq2oq9tksg9po02bbyvvw6w0dity1v65pps8gbkj6rp8h15qo3jbo2lvhqn3ct1cvh03pe5anbyqlyamzg154x7k8om26oajpfo2728x99hknkadajzmiaikppfe5xmplezxbjeepovnw',
                flowInterfaceName: 'lndjijn7fjgl9yr4bivihij5wpzjm6cvlsy6gry5ly6zik0a60t9zn8c8mhc3z4dvoejt37oyaqi74fcmfr6hkka3ozabba555087frb26gm3p2mi8syc0t3ibqil0hxjkd4ktyvu2s3dh92o9zareyuvpgii62u',
                flowInterfaceNamespace: 'r3c661p0amqxl89jn5qc2cbi9q95xao919mpvltpd5hg95z7ttz20h9ukyxhcozysus3x1mprdgo6rlrdsnu2efzzmxx0h94gnu97hwjf75zc8a4oujscl6yb9osl0czl7tfbibpzk5115gepcnexcg7gxqqtl83',
                status: 'ERROR',
                detail: 'Quisquam dolorem quidem dolorem repellat. Explicabo omnis nam. Distinctio asperiores dolorem commodi quis ipsam quae est.',
                example: '66f3zosdo01hdqz5uze2g6q11y9m7kloyvi3buro427483beu2igxj4xvnjfan6rqwv7vvqtz3hruismaco7qx9z2t9g7tkaifun56glxxv51fjdx4pedq2jeu3q3qkd353owbspxoxbb781dg99a4wvti6bsypn',
                startTimeAt: '2020-08-03 12:10:14',
                direction: 'INBOUND',
                errorCategory: 'iu9y9wz1sybxdqgj9fzujstbcupy9xftwtpld0ih6ewby0obed5j5nhcw98ew72wpeg1v3lqcam5g81zppondv9izlsc70pz9sg86r4n3vw55g64e7w3qke12701azn9sxcwxjk29uib7hpgehqmk2y2fjocl8gv',
                errorCode: 'w51pll9r2ovd2uos21m4zxh7fts8t7xwiwp3cra6venbwptxx4',
                errorLabel: 114862,
                node: 2864975226,
                protocol: '0n0jrgzngvff6495ove4',
                qualityOfService: 'hphkdckwa1o8rchkfrja',
                receiverParty: '5s2of8u6oqh2hropri3rnnvd9z6x7r9q9i6br94lbppulrz18qre4uz6z9swfie1jtl3niwodm65ad0l9h3swnh41lvxffrazh1m9me1ac1hc7s8cwa0zouvaigarbiskr318d6jsyahsc7m38ssibkykdx6m8i4',
                receiverComponent: 'cl346bgdqn1snh5e3jndt6v6h1lyxx71o2ig226ioy7mxmdpacy0hc7gzu378rmvtv4jyjnaiydpuo6b69hqrlbbtjefbrezyyrlb39rapzu17pomvdifa9lr6tkmqgc94gdybl5i7a0100op42uajh3fro4xm8l',
                receiverInterface: 'yqb16reqbo8azq0bptrj5xb3fd96o8y1wu5rgbknwh0luggyeqvi8wcw2y1p0tzbrzy061uq6van22slu95vmx7cp5mrkh1njege84eed3l3s4pn5mpbte6vu310bjrepup6fciq8l2wevxn50dybc92vwraicma',
                receiverInterfaceNamespace: 'nr036brmq83h1x0tz5qi346k01e8kqeeuzjdighwdf8vbwgsmlnvkvyt9tubhnvd21fv56199mvf2gtod8mg45o536wgcvui9a385coxrs6r3wggjdxe59njidwfzf9j4o02nnmei4c5fbe7vhhg82yz3obrorvc',
                retries: 3340972431,
                size: 9824974649,
                timesFailed: 7036028222,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'qh7l3z034d0i8tkooidvctpskziob3qb5louvqnilkat7rbddz',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'w3qs5bg6ii3tz0dihafd',
                scenario: 'xn4f51a6v0h673iz185zkeq532dzpq6ipbbtam47keb9yr3t1694rb4uo5z2',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:52:07',
                executionMonitoringStartAt: '2020-08-03 08:42:02',
                executionMonitoringEndAt: '2020-08-03 18:14:46',
                flowHash: 'h62nx997vzao2plaonh230fj2e3zicftu303ovo3',
                flowParty: '1p3wmidtnhddx9kbr8nlqxlk57ptsyphr5me7xawwca1b0p2ltliksi2nc3jygejh6o6fk96cv5zs0h4siw7asyga4zuyr8xo8rrgibfw7egqoicqk62qxlclyzwbg943oa3railzonj7w3lsjue54nxshubqn6m',
                flowComponent: 'gndejfw8lz3rjgkiy5r6v3odrzfga6o3bkn4fpu2lh8kpu61w9h12umfu1s9pwbrys14h1i414tggccogkqlnlyuu9vkn7tid0rn7zlz6ilb540rvlgtlpx090gg6p48gr4t85wtdc9apuis7fh9cr1igxzlxc55',
                flowInterfaceName: 'wzm4rb3k9gm029fu9o8s9ruxo0pnhr6fu3pkxkijrvh14cn2r2yyfwqclok6rnkk6w0zj9cxx2f2a3iub8f1pylxeebrnjcqboj735vkdg3hhlomlhticafbhcd8x41u4z6cagqutctqqi7jjai2jabd7hfgb870',
                flowInterfaceNamespace: 'rsdyhqtvrxhc9d3j3iun718wd3p4dtpx8lkbn5m8rqqf2m0mq62xrf41vnaitr5rg1u6wcm5dd5no05425tsmy8tphdb97qnkkcxp4wfuinutczrm372vvigt5ofxnk47r5ek43bj4vrji3u9hsl34zmhkciqpfv',
                status: 'SUCCESS',
                detail: 'Porro et accusamus eligendi eaque non iusto voluptatem. Tempore repellendus atque tempora molestias tempora distinctio. Vel molestiae esse aliquid iusto esse dolorum magnam. Omnis ratione fugit nihil omnis magnam. Dignissimos itaque consectetur sunt atque ut.',
                example: 'viqm47mah46uc2qlpajn886otilcu0w8t6ihm6hfarg1fvltuklxu2f7pyhqraiv6mbru1s479s0lfahkilsj9kc8trvqdsxo7e04saf2jy8mnj9crfi636a9wlag6cc0xpsmw2nhbmpb0rk9pnl2ony5oklxw7x',
                startTimeAt: '2020-08-03 17:26:15',
                direction: 'INBOUND',
                errorCategory: 'hsds6jiw4t66ic4eci7peu2yds6dbzplod4ssb99od1ccjx5rk9l0g4tiwaarz3ann6lwob1n5xska1frav89t2f1ghzerb0x8gd3yd6tx0mmx6vvzbt3glxtc1t5b5e8d7t91t0l1zepqavx3jp5y54qjb3iy5c',
                errorCode: 'lpzoz4w5u7o7zl3a2rg4abpm3begygx8m3mlun2mjxbpaj1adx',
                errorLabel: 904745,
                node: 5947956428,
                protocol: 'x47zv9sonu6n3a5r9opn',
                qualityOfService: '5y88bmd8nj2uzrtg08e2',
                receiverParty: 'kwx0gpj7r11ilq76meftmajb2zzqswpuhuzi39utdksnnjcrdz92neotrtb8ffvhqdkws8ut60z61y347telr583t45m71bex9y820sdm97ymng5luz375zzirdxrh5obvcmughwdg8jzbmikxkiy8t8o4qoy7kp',
                receiverComponent: '1ism7sfk4zy18uqjmo7hlptr3kb9kvt065d81dotj5od1f0ud8nj33c42ro0r9sxwxxhgnxy9gdzgx030ido8ykf2zygk35kpc3g3r2z2jct0fb00ibs4adm6w4sb3cpopic4yxr9sei2wyb7yu86mdjztfthsvc',
                receiverInterface: '1yz80bfh6i02gwot3ec3lq6jfmef82gl3x089ktl58r32cay577dq5qx48k3bk5q11dp184io4opvev33f89c6puhsonwmxe4r6cl2kmqa4ro30lqbz6gbrugykaa2iq4sll3soqrpguh4kee1tkt7r7iqp55axh',
                receiverInterfaceNamespace: '8nok2hcg90itk4z4vdd6wnpydj84gz9p6c8t8rkaw64z0ip1k5vetsawgsfnm92ozh0pct5ztvl9q1u1yf1j6mobev6x4w1tq7nsei9oth6hbcquerssb3exmc5biqhmpf5498wlk4q9jfjnzmbf7fhp71va47de',
                retries: 9327089030,
                size: 4951848812,
                timesFailed: 1555441043,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'f1xa21fhsj68pt3cnc3lxrdc36qg6l00pcsn1rafq260zwjqsa',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'klzkl0oj4bg0dxndos3k',
                scenario: 'awf70abpsdbuvjheae92ljm83qn4sqb4eg46qrlw6c2h297yk94gdtoyh9lb',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: null,
                executionExecutedAt: '2020-08-02 20:34:02',
                executionMonitoringStartAt: '2020-08-03 01:38:18',
                executionMonitoringEndAt: '2020-08-03 04:09:24',
                flowHash: 'y54swl3nmlgv8hga7npby3ap01z8bol0fny7474g',
                flowParty: 'jmx7rvl78rsic6ntr3xvj5scs3juvvee5le8imh0hil2ymchm6lg521wv8vzzvwn8k2ei05m9061jupppjaau42exem1vmiveeqv3fa39zvlc3c9bng508hp4shrzp2jxqvtj3nf4toyuu8tkqf7msmr9gcr3e06',
                flowComponent: '2ininffwmzbifrhk9sxyot5ux2gtzti8xb837ou003fp6pjdxt418k2mvhw1dzdzzfzl5n1b6mjtag4ci47w2mwm8qz6t42jjnjgx7eno2xobls8ssdcc3idfwrjb2cj0787pwhi0kwtwiogldaxbm7hwm7c0hhd',
                flowInterfaceName: 'i2imsed6g8v58zfw9ym40lv3crgdkrpfbwvkvyxs8fiycnrcex8mglj6t2vqbgmrv750fmgmkxobshkp99xln1xc2ghohiywdvz1zrp0u8ux338kew2fovygpp1ao15jaf6zqlk6ygce2kh8j27jc2bt93njvj76',
                flowInterfaceNamespace: 'siy2g66jab0ybj1rnjl6rke2k1k6yh2ez61o1vra0blnss6dpk9buxka30rwhs58ko87tilinqmfvz0egqcrtf8518o1fen4hslbouyr7pyxp9srhye8zgrgunu27wdhhpbm8coqvyb5v4bcgax8sc681r4vx13s',
                status: 'ERROR',
                detail: 'Deserunt rem consequatur. Impedit unde itaque. Suscipit laudantium officia autem omnis et illo quo. Qui aut enim veniam enim.',
                example: '977qtpp4c0tovht8ekpoyxb6h451ycwk3xvhekp2ixnyrvy660028z73538j6x8y3m0y77ry9by1uqndh7vzshrzjtqpnl8th0myj6n924w3vz15o06fhkgc4xjc0mj45uqktle14s11fo6sr721cni964k4pa9j',
                startTimeAt: '2020-08-03 11:24:47',
                direction: 'OUTBOUND',
                errorCategory: 'tphq808dch4m2rhj8sly61fzm8kbqukh9e5h5qo3nt5lb6kaowmzxpeejae5si2r24g6vmwptrkmg56nmn9xapiv8ytjoass6wpkxpmpe80w1lfylojggexu05el16yb7zhrns3ce7at4gm2yo9hasrjue5vujb7',
                errorCode: '2jrcigs6bes5dp7ysoftvoeads6wpz8mabva2uveqgn7bf209d',
                errorLabel: 506166,
                node: 4998669090,
                protocol: 'aqn66ie0npon7ey9d1lk',
                qualityOfService: '1w95wdwrpyngeju8td1k',
                receiverParty: '489jq8shsgun67zyw0ouux3qv2ketmqjurcsi66otxrqlnhyhc2z12rxfgs99ri6c38gm8anuzz58cgejuvv38b4tdp9sdkm4zroinz94fbohgh33eqb8vdo17djvuqwt8qvbf9k9euqlmovqt44e2727szl10gz',
                receiverComponent: 'xurbqn58yrx7m1g5n3ht26q5u083qw47cdskme8vsqeij685s7rsar5vg7weo1c5hocv7f1epwr1ayv53i92ochhsx4gz4y1ry5eo78d0rgjpsn0lzfvdbzxxrjitglwfa20rl8ko14i545hyntutyfxmrklx73y',
                receiverInterface: '3fhedsz87een1exe99g6dhegw1n4yv66r7088608o07ggpqh8zm6c0ir05qzeubvk1psxpfcdm21jp3plt5l0eaewap1kn8fev0xzi9zn2yzpeprvvspivr8e9efkq014klk1plpujknoh0kh3omnkaxg6h8dbuq',
                receiverInterfaceNamespace: 'zjzwx9qpbui2grhk61rxonubarhe4t6a44cph6ebbcpzyyuhk2vc55shkitwzlwcbyz6iitzxdr3wzfwfsnduxjc493ew2q3dzpyoeqzc84kc8w36vet9vt69fiywwyc1lyf7clx4ggemb0g7zfu3bc4o57zspci',
                retries: 7528242181,
                size: 5905712291,
                timesFailed: 8663837109,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'l1mfatjqhj4ouycbfdbp7h8vxwkn1i2wqejtxy7ln9fe0ygdef',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'sbl2dpdeux17wu4pqvm7',
                scenario: 'pc8quyny5v1ezo7c9ykgb1v52d1kg3q3b307ol95srom3sertzmyhj5u6vdc',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                
                executionExecutedAt: '2020-08-03 00:03:08',
                executionMonitoringStartAt: '2020-08-03 01:41:07',
                executionMonitoringEndAt: '2020-08-03 02:25:30',
                flowHash: '6tuvexsqi3ocpfjt25f06jezfhmou7yruax1ih2n',
                flowParty: '0ufd76hbm9spt9buzv9zi1xh7xu2d1dm1665n1f91lze6pxbd99mshku582cmqbu34r045mz5v6q0evyy924yol2gnpsu1y09apkgvizdqo7nzq30q3bw3wchsvja364h1qjnh7fpg9x7tus1xzht5n3do1ktmny',
                flowComponent: 'a7izk8vdgse6qh669wx8u19jbflwrygcgtn99q12m6ruqhdfjqahz27xbgzxdzunzozc3xv5vjqq0hdrg5p4grb1oo9r3rzbjd9tihwd0cvtl67w5mvj3skv9uwlv9pwtp0tmfuv3wxlkbt6i1fyakx6cbbcs3mx',
                flowInterfaceName: 'nw3zpdbcalc0rguhsnrw6561jsj3ajro0wiy0ha5ssh5t53vhl4cmnzxy0hvevhy9pd7jo4lgkmw5oi6plwua6hi3hqxhi6wy6cueuzovccmmrpnqpkw12s0m6h8m36f188nc4ma4s4pur0mz3j3u8egy4vgcaxx',
                flowInterfaceNamespace: 'l2c1t8ko80uy3x5pdq137vksgbylp0kzw2gs17kcn4plr03cir5t411e2zwolqpt72dq3kzo828i3piihl9ttr7cgq2wj9tma6mmi4ckw5abq3j2y1rd98v7o6yrc1i6q6y4t12v1enyslwd6ybf9noso57pd1gu',
                status: 'ERROR',
                detail: 'Vitae facilis quis aut ducimus suscipit sequi vitae. Id velit maiores eos. Hic et consequatur possimus ipsam et nam et. Voluptatem ipsum occaecati recusandae. Nobis suscipit ipsum ut. Veniam modi quo natus omnis ut.',
                example: 'i97n5d30tazkpo9o0i4p3mvt6ji4n48tzelwvgcvfs6fbhyfqzfzh1pmboiqawoqcj854ko7wguuaeyoel1o6wt1vqu8b6dqinwqf8om56m7l99sw587qm0fcpk7pa4othhnwlbaqz4xz61o5o14pqajaopig6oo',
                startTimeAt: '2020-08-03 07:35:01',
                direction: 'OUTBOUND',
                errorCategory: 'geuk4xsusotdmimtw5de9dz36vssqbz0m0icnferomjzm2hs6s7muzzdqzzptw3ddi07cs1r7y8onoiuu5l6ys7qobqv7sw54tzlwu4v8fhkmcsucy1hq1gqtygmxtk9n42slfaeo10cbihkorqs8i8qv707vqs6',
                errorCode: 'p85o7pgd3oxo1oidn86r4v6rgh25ucfzt7207fakhs6i1u95lx',
                errorLabel: 581356,
                node: 1152081224,
                protocol: 'ihahoebhkbt1fzi80x0j',
                qualityOfService: '7n4mu2bnswmdgn6jty7h',
                receiverParty: '4s12pwsrw0su93igfzbj8nt1ztia3kxidu7y012698borpb54btngbyuh7gfy31vyr4j2wknmgxsb43oeq96chsqo1pj6z04a1ckn6jal7ehaskemp17myk6v9pcq6qu3hneru1xoynisa39py5wxucpscfu3a0t',
                receiverComponent: 'l2txx6s7wn4zso43ggqcpiuzi9882vpio7izbjka9l73l6dbq57ubdlj4e43zq92gylsbammq7iw3kaqej593abv788b803qz91rv2q3r7v5mx0fex2xlcy67sd7e2w2lw83zo81ktbxg1e3w3xulsp5kor6bymn',
                receiverInterface: '3ijnnk5et69be6vewqvpfu4eu1uoxusppm9pyixlo8v95g9mgob0o770yj491qx0x8j0u79kve1om0yurftjp8cz79ake5ze4ztkdj7vt50nj5zn4bx37okphix9spbigv0wwps9w3w7smawswck2oa1q5yvbuyk',
                receiverInterfaceNamespace: 'r4i2e1f2avnz1tuh0b2n1nct9qhj2q9t5vlg2l8644z3vlof7pj455pyps2eg3os4oj8bi0wb2dq5r20snflzyrjsq09qomjjjrhn8g4jg1w3iks23l7lhboqklw47pnd2tp0ds86bu99pekggu3z4drrs1j6kyb',
                retries: 7396508695,
                size: 2636373471,
                timesFailed: 3443346358,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'rqd0zel8mn7na9looajd48819kjv0zqrmkj7a2f4z9h28bqid1',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '0gv4my4b35ybjrvr6yn4',
                scenario: 'vpgw7gttw9sga8uaff8jnfb1k88zfdvdccm3ze11s9ohdlp7gopz37grma7c',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-02 19:56:39',
                executionMonitoringEndAt: '2020-08-02 20:21:10',
                flowHash: 's7oawv1m1nyipheiez2g4n8okt44nezxc06ez3nl',
                flowParty: 'seekwqudytvlveqfyis4224bu0dioq1ttdycjqw22zulmafua6pdzu6d7me3z7nok41q4s4agxlhinr50wym6y2k6mqpxzpui380tfzblab2t4p7shmaok7no8r0tdimbfyei9g7tva2zogs160r1gan9kf1owaz',
                flowComponent: '2rxhbqc0p1tfp4o0guia14osgwi6kzshzvu2scbhuzk8sn0rsk1kuc0hkinq8aclyln6qvtwzyjla16don7n1cn8q9cnas4qt64ru0n9jnfayaizm35jub67iwsozh0phzyhlpnzjiwkof1utg3mnm9occl679d9',
                flowInterfaceName: '6oxnjrwu2a8wsuvfusbo0hns1rx4ad2emmmnd0151c9tvrtjlokf6abjx8p90vp8wsiacq2e6a82p2mmbrrvg3lf0rivmluzr1gqcct47xq809f2lzuvusxzi7subbfn938n4cxwj9i29oi45teal3kjv9y18aoj',
                flowInterfaceNamespace: 'd1hikpifanu6df1cjavu8n7a10reaby0bs1x28v5r5gcqbfbtveifwzydwxznwd71ny1zpkxli0khinwerndhkipb5tx2v6b3h3fu2lkns88n3bacpiapple2xg6infzhm0iyckv7saj41kkuko9hktxff7bp4n3',
                status: 'HOLDING',
                detail: 'Veritatis eligendi vel sed soluta cumque rem dolore eligendi. Doloremque autem aspernatur incidunt. Reiciendis eligendi modi neque dolores sint voluptatem vel. Cum maiores dolorum voluptatem et itaque iste doloremque dignissimos corrupti. Cupiditate quia cum.',
                example: 'i4f3rzaaw36fyljwrb9hf9alpk9vrpdswf66fhcen2bjhc9vwm8x4m39a14zk37rn7xhrjc8zuzbsjl3mpmxbd324maoi1cupxztotplgvdvk57seziss3km6ie8i8wdndpq9qyydnecqkvd2z8dsm47h9wx5dc9',
                startTimeAt: '2020-08-03 09:10:07',
                direction: 'INBOUND',
                errorCategory: '3fl0jdt1r5hn6xqwnr7q7aette0qhyeflmarg56wl0knjlqjeaumi2pbb4hrktk17p8gi82iaf15ttg23o3rih1h2a16xv20k01bs55txf2z0i5mv9v978qtn82yihmbe76fl0smf14p1wxziv5p60yvn8i6gdwa',
                errorCode: 'oslmpunb6m324aqhwbi792btx8q5f42mpdlj561omp1gyo3woi',
                errorLabel: 321334,
                node: 1268765578,
                protocol: 'tgzpza4f50aw4bgujk51',
                qualityOfService: 'le6otrc66s82pokblf13',
                receiverParty: 'k07qa1x5blyzomj3bj1qc6x228rjd7jxh1gdevqvxpdfvms3r7w5v4bf8skqc122l91gedeiprgl5l4oxo3bgsexuz6iwyaj8ijng995uiyuecajd0gxdn0ao9rov8f2td6zs0cdwxahtwxxnp6po7iv23mfktu3',
                receiverComponent: 'o6buocrlglptv7hlizib59blnesnogll9u0mbt3jaz8qevg81lm8nid6lkawepj222h4ny44k84tcdmg3sr2hpz20lfk8aw16c5de4xukmclqwf8p7miek2z5jc2iw0zt5k70z8wa427mkbexrlsfbfx79mbg71e',
                receiverInterface: 'rr8pvxcadoxajyoqs5rv7kazl8kb9ngvctizq5jmld7396uny041rmd8uld50kmhgsa46a6xmx2e5k9c75jn4b8nbvdctb5jz6vvn79sm521c7o49xklqbixsdjdgglkhc95pyolbfx645lojhlszpx421xs3fml',
                receiverInterfaceNamespace: 'uvrr5n5gfvmmg7p8rdcwmzf88wlf2cbu3dt1hw1eiwc62uk8f4u4pg3a4fu7ouyhebuc5lhdvtr7r94tzrj1pu7s1uy29j6lcs6vggw1rtsh4w2u3m2105e2cv59ctxf766e3h0ktl9xt1zpjv04fpe3ffstujj5',
                retries: 9126957991,
                size: 2363099452,
                timesFailed: 8284371199,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'lsyflkau2l29tjmv46xs83jv84ddnuop4wkhkh754glcd0bsx0',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'qxuj5quw8z6fwubyu3bb',
                scenario: 'zjlqwpudza6op27wn6e93zx1q8yk29rza498hr2b1upy4dm42pnydtvlazyd',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-02 21:03:00',
                executionMonitoringEndAt: '2020-08-03 15:23:21',
                flowHash: 'exun5fl0x6v6p8g53mlr8jaqeeylkmd1q9imfan6',
                flowParty: '4nt2r2f063abui3qukqs6llmrjlihf1a50vsknw3r0bw1hf0yzgq108q7ydxs1dd8futy19jj8stip0q26tvwylilun52rlri8o4hf3nnwjrgfmufimyrwziba4gh4xy0a8ljae0c4j8el8gtl69mwmes2lxzo87',
                flowComponent: 'n40rpfmsq4st2bt0808shpv2ujxerkcn5701vr0vctw3nixjvh49vhy1pr5xuif2uu9g3p3zyc733zb45uy4z4qdhbcsi8btd50p2sqa1rwydayoklhwjve2r85f1qciy49ps8r3qe71o0crodxydswznsi1hx41',
                flowInterfaceName: '1rzztrbzypn3u9n8p5xoljszmk0qbgfb1n7ykw8fwsjzuxt1zfi2ssxvs1d3vq0ac0pcbv2hq1adj6cf1z08e95re411ot9ra69ofxyfttybwk1vqm10s8wctjfjftht00cv0zi9rw9rnh8029kqhyh0smu7m7f1',
                flowInterfaceNamespace: 'z0iggkzia06zitlcv9t0ocuptzdf3qgmnigyz82nebj7locj44kn68m16jnyw7uyzq2h3qa9vy8pv14kuzapa16lsxy0h9pvpsor11vl5i65dxdb7jn0a2n5fxd8nc7b2fajasuke4sht139x4k36rvat67vvkqw',
                status: 'TO_BE_DELIVERED',
                detail: 'Repellendus ea nemo ipsa ut. Necessitatibus quia voluptates et eaque autem aut. Pariatur accusamus omnis repudiandae. Quia quia aut.',
                example: 'jl5cavktyea42aunbsr4n6qoh8jrv05pmor288xy1wgua61gwqp4xryek6xmetzsrakcdsh2led8zcr8rohrqhpfonklbo3l06g9vx8kdqt16k985ijaat3fvqkpb6wd3a70er1ebf63rytnz52qno9ytw4y8vp3',
                startTimeAt: '2020-08-03 13:54:47',
                direction: 'OUTBOUND',
                errorCategory: 'm5iivy4iqg2agxklxl8hupdf2s3ywzqgs0yvry5hw7wo63r2821uengj0z0ayzha6lnvrpfxoqmt1g12qsgrpg0uy148mtp9jspwmjgvxsh46nemztp181grqzsbac4adoi3ytnjrin8jp9b4qia1j01uhamjmo8',
                errorCode: '4ihb00me4jwdxt291716dgq3cvaiijaqz5ag15qqjizjwo5na0',
                errorLabel: 170307,
                node: 6894062010,
                protocol: '0f7wfgz77ldwpcl5ovyo',
                qualityOfService: 'f3blk74idooxncy229s0',
                receiverParty: '3k73tyhb9mtz6e7k1wgz2z2kb69d8q6aqc5b5xv64x9gzuzy9aqc66oj8jl16uat0vqfd54o177ocoig5aj1g21r7vd2d7mlgmnnfw151ehe9nwbvlvr84neociui9wbnrm8mlm2j3t9jfpoya9g2y0t2gj401o3',
                receiverComponent: '1tq4bstdb2t726ab3eg3u6acorugd8p05ls0pmot1jl3r3n5vd0rppf37mjubmqlw89vxi8kqftri90whxommnbjiw1t9pqc3olv3m9zxwbofp8336rk5hher51gjxeqydrr9vq0eys010wytg592qwf2tabvqu1',
                receiverInterface: '6m2mb8h08hk9xz7es4gvafyl6cewokdp8u8oiko1ncek869mc8zw6c7a89d98grub77jz5k9ql01wmyplax4ytqm1a7jr07ps42lcyh6n8nnu3125hwu7byso3pvpbsvjkmkots9juqduilbf4c22qgermhvlr4j',
                receiverInterfaceNamespace: '360hw5yl876xtas2sambtbzkwl3xinuzlb0erx5dohxrzslu8u6vn64v4ha1tztet4wb0gjr12bfr5m85gufv2fo7v14gc37ag9ma0p9xr9g2z6egk27lhc1pf47cmtesgejjr7rwpqeaoh1vfr80t0o2plgeupw',
                retries: 7170088288,
                size: 3971440584,
                timesFailed: 3202909821,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'jgfl0o8urbbk6kmdhykbo1espdme6e1utpo5sitfkauhf5wulp',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'p8q7syzi6fg5pn0lkgft',
                scenario: '6p90u2racmyurcndrm1rjrfu78aawvxq6vgd24uoj6q31as0wi85co7u2fju',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:22:09',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 21:29:09',
                flowHash: 'v2xq4qha14pe61w8tax4bwe2t5q8xsej0zl9q4q3',
                flowParty: 'ifxtg3uqqbhpkssv309u875yoev60cj8z5vfn8v25l845q4gjfh9dzxov7msxrqv7y6y65hog14uz4r8me7es1en8kvjbl32pnqwsgp4vc9ebdyn3gurgsfkj11i9xdcmp34j6how14znp10jr29fbanvrmb04dt',
                flowComponent: '90rycyr0v8xqj65vsnu3d9zdr61duyr3wzgje6zckqb0pxoc2i91mxqcv8zqepp9u4u8jt5eaberyoiwpj8mlvqvyanevbew6vaf4guzsrd5qm2cfq4jolqv9ktr9dpubwl3422pqi7ixtyfczrvf9f7uwg7j1rq',
                flowInterfaceName: 'uaezzpiytvzemkuf1wevrs4t2wlg1593hqd7kvdzmk3tnv1lbg34v9o93rtuvqoxdwntuasomlkkjq0lr1ecomkooo0v9ks3q4x1r0pvf2ri3cvswr7al3tnx86g0jx8axiyxdh9q9ldtya61db05rcm7c9g0q0c',
                flowInterfaceNamespace: '6btn2iqzrp7vkft7je4cwsrswdh2g2t4lxp5wffgg7ypz84ux13ghz9wkcu84hmj308vgs80f5z7rmf2zza03rnfk4wufpxl38myil2cirb24kfpdvmdqgjrgexk4wd3mdmhig5d7exhyicd936cg5ubaxvehsvc',
                status: 'DELIVERING',
                detail: 'Qui voluptas ullam iusto dolores eum. Exercitationem deleniti sequi voluptate rerum rerum hic mollitia rerum. Cumque a tempore cumque sapiente sed.',
                example: 'i0dovuh6sdk9wefqzagdg7z1b172zzgn6t8p5zpqzzprv5jyb9r8y062kbd6ukx557xekd13nd1dxrdflezn7pc0avf7zwr68tav7gop271fz7qpyyrpi1op04f5555nryetskoa323dcntt6ffyoaxzm1yzefuv',
                startTimeAt: '2020-08-03 06:07:38',
                direction: 'INBOUND',
                errorCategory: 'e0mym75cqxeh5n8refm3t4s9mncr03dbuxsqlja8nzrmy2oiqlbjspdelbpflxpjhxsr1pmb0mskia8n0zjgbd7qff4kbmu5qegjya6o4i87rv60ph0p7c6vmpy31c9z3f8zep6sv21pfe7b6jubzvn5sa766q6t',
                errorCode: '568od6yjw0ve3rvvh56y3pmba7t8kje080tw5kn8qzk93fzfn2',
                errorLabel: 103441,
                node: 6439829458,
                protocol: 'hofpcys1322eyr0ctqwa',
                qualityOfService: 'mrg2t5t6bdr6jvw7xo0p',
                receiverParty: 'rqic9iasuhnj8z98j8qwcncfky1jsfky9h3kyct8ey6vp7dunxr05dn4t8jsfkn2kqon3fpe7qu8b7hbqywuyp949csz5rd64wg7z5fncdetynjeqd48vk1hqi1f1jkbfnmyguyc92edapgdyni2sli2uupew4wk',
                receiverComponent: 'tgojxrqpcyk25rcrb6dwsmwbrdohauc9rw0qf8e1cljdzpsit46fikz35npw5aormhdorpbqenobl79wsw39j54rskoj68x6d7gr5mp0hlk4nwfvxik0zek54237kjzfkg51rhba13roqur12jdouuv4eurnyk1g',
                receiverInterface: 'hssbt0p959y06ateytcg6dd7cywf4b381ycn7oytdbinbyzz4brl329wytbfq2fj9akqizcsl3batpdzdju4z92qof0a29vr79ehu8smmazk9mczg7ymhajwmk85we5mrt7h1796z0ti3chkmfygry1rgkmjxako',
                receiverInterfaceNamespace: 'oq0fasuabf999a0q33cytk05y7db3jnlfhqtkh70dp9vgw64a7vgm8xik4kfw81otzdj0g64i9ecn4rp8i0t2ondo4nwnuc2kfuskxbxtd3nbdm4ioa7lvuc8fq8eyouh0r1cg1hjnnokgy8w096nd9c8wot60pe',
                retries: 9704639895,
                size: 1901102554,
                timesFailed: 8780114389,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'fcp262epvhpn8sy3wsm93ovel7nmzjqjmvm7n2dqo37kzommet',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '6cb5prg6o4o7ofgud85p',
                scenario: 'buvqto5xatf70kfotuohsjfu11g00h2vx0d4nvedkedg0z6arbesrsnl6gw4',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:34:48',
                
                executionMonitoringEndAt: '2020-08-02 20:01:58',
                flowHash: 'swi554cvhk43snylubccrumkm1ayugmj3v1rp5dc',
                flowParty: 'ytje41jg80ayebd9906s09r8o2k2n9nxbmraj6wm9wepzcpxil6jrflzzgydtcqv7hzqcy58r9dt0exk69z80n9reqddttlbuzd6mkkk7i6mrnmmdkmfil4o0qufktyfpt9q833fjtzgtun9emhd8zgpq9llip5o',
                flowComponent: 'sh159sb12v0fl019k80ay6xq1m595woin23mzv0xzhpyqdg49nqdc6agpxskak3zym64j8p0ezalktuo3k5z4jwekfvbeiz62z1kwvnhf8lbv61gsdghspt6muegti8h1hyl086swnl1nssev86tpjnv2oxs75ae',
                flowInterfaceName: '8goo9np4rnxfdc832eplb11j04yxfm3jn1stydjo0pb8gnjsd3nj4xw4clygg5hd47k5p71mxc6si8muuyfae5kpp8wrrimxkrknqglkh0y8ajd3n0zzx68eacrh3gpjlsppx3iilish99ryt5yif59mbi61zbyc',
                flowInterfaceNamespace: '18awnm7oz604qpx65nzwx81hyhdqiwtf6kzdnr5e6vc4k3unvbablnejhaln2qoxnlh9j69m9jg1l6fdssbav0uilacyjdaungbkkx9rqe7vrn5kn5nych6hr2ccd4ts1kbz712fdleaw48cn4gt7ealyoqev7t6',
                status: 'SUCCESS',
                detail: 'Consequatur quae ex. Quibusdam aut explicabo ea quis enim non amet sed. Commodi molestiae optio unde nostrum. Modi dolorem consequatur. Sit eaque eum suscipit ad at ipsa vero.',
                example: 'tfw2858jx677on56g1kwjajn8yrss3o1nylygrwxt8rwrfaa2fgc9bu4c3h1gg0y13kvspkod4au99pfafehhtgu3l501lhjqe5dqlq1rj1iuiy6on9a4dgi66znwlj089lm1h95idjyw0h87ulsw87pa2jdp0uc',
                startTimeAt: '2020-08-02 19:00:07',
                direction: 'INBOUND',
                errorCategory: 'i8klxycg1h7f0ut4hhzfljsug7xyfa08t20qludrtmmrhurevzkhjdwpf2t2x3303dy2gbydq0avaaqz564m3a4stihk8gh4oetsaw03twke8eawfq9v4ilmb162omwicvcinuzr62gyrkby4gkb1jde71uxxo15',
                errorCode: '5y2bttsj0a54wbrgxt7r4v8fcb6ubnfpthkm3gp9fhmckxth30',
                errorLabel: 252775,
                node: 2746742094,
                protocol: 'iy7kg9zjpqtfs5q3xnds',
                qualityOfService: 'rajx5drclv7jgk5izawm',
                receiverParty: 'd8tfxmj2j82nne3ns1bv3bxnc6izlnbghuq7x5s8kxiwol03bidzmuhpkqkcj4p2f9fxa7rdzeo01f7422j0jp6cuinyrgl8s8fu1o8wxuhh3eywvzsctztclihco94zszylzrmnjyfcxa45ulba0xdjz7tct5wh',
                receiverComponent: '4l8avt5b08peyv3iz5fqmucmckny28w9gf4xzkno0akiwsnzklfcyftr773zd4vdaiypksowk4uicwbwnsnq6ayzo7nfgvye2ni8w4yeckqabvogul2j5gzfazberegwu0wi3odtypqq3ir9wg6uv8sts8719qzn',
                receiverInterface: 'p2vpwwq62eixrrinhwt6geq22fi6la0a96pqbmvv23oqm4so6d8jhjhp5q6gs20lz1t03n62uzwp4i4naxi0psr0pkkhu22pqzfyq00pzopz8u54bpgxnigayrdlh9rm6c6q46j0ciyyteng3v0eee2mrlic4c1x',
                receiverInterfaceNamespace: 'sek40kdexl9t7qsg2l5klhgupzin5t31jk9pakna7jo51z7bufevj8l9bqpr3nyb9r19qi2r72rp90mf6fdvx4en1blo377le2bczf4ws0r2exlj5i9sg4dv18owyhbxhpd9by0ec34uepcs39gzcnj3jitf4h8m',
                retries: 6255645400,
                size: 7049989617,
                timesFailed: 2716136377,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '7cjely3xyy1etnt689f5ofkmzs0yu9d3bpb24pcdbuy634cyce',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'jlywdgd2wgc2txgxvuzo',
                scenario: 'ke2c1tam3139bzj9580q757lhshquyggrgkv4d1qg3u9d3wkxnvbp01sd0dw',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:07:35',
                executionMonitoringStartAt: '2020-08-03 01:38:04',
                executionMonitoringEndAt: null,
                flowHash: 'e9fqlcssvpvocj6zez6trip3hax1r6144i1adecx',
                flowParty: 'hu8lr3q75qqji0u34cfv5sbob0qdxzwxaiii1gt0zzxub16j8wcuejrzdnqrghhryjax3zna6wi68oabo1i150wq69irgdiwcnh13n0i3t1l6vc245wbf9o7adrqyfdz1op1r8t7rngei2l4wve11yrn668ns5zs',
                flowComponent: 't5pec04bklns5a1c80e0jrdl0vnrrn4d8e2u4p1zvmf150o8fpln1g13j0yl7wcbsyckhxo7iyacrw0v9jl0bbmy6exm33afwkeoe6jx186je6l3e7rirvbgr3a9tc4jjm8gdmwbesu13sx0oqk9vv6pohiku4mz',
                flowInterfaceName: '9hymzrnt624tbpm6e7oh98djig9xpfvavvncxnx78ipw403y30e9o3tlrc7xnqp4uvh9dbzetwm1u1iiywn076shhyz5aa50e6zf51ot78qlmmjm7dt0pcs1jsajmq2ojernd9c9tn2z8n75b8pf32lxltb1tfwa',
                flowInterfaceNamespace: 'lsa5c5gi8znidrl85xwy2kf6d0my7ilnbz7vhidq6vqnxx1mttiir918633eqba1zy5m876ynobdvev6pic0qefb3b7fbhcwpl55jrmdycsjwjqb8k6wlkpjqlzpc6fc6kla1imuscxjichvmgp8xvauchss1k03',
                status: 'HOLDING',
                detail: 'Dolore voluptatem molestiae. Officia aut qui voluptates sed quibusdam dignissimos veritatis. Harum adipisci vel vero est velit consectetur. Beatae dolor porro fugit eos nulla enim est ea.',
                example: 'qiee8io2pdm77oakkdp1oeppp3vw8yrn8itrl367wmnrbovfgi8l1rrh4a921dro56qe0gx5deb4c19iqtps2njsaw8p2iy6zz64svqqu10l26tenn1b1fe5hxx9b0euoonu6bzsbqvux37gaafsnh39xfu8eb3v',
                startTimeAt: '2020-08-03 06:30:33',
                direction: 'INBOUND',
                errorCategory: 'rexufxy9doqlp2knhzc7qd3j1gj8cz18zsxsac901oidpsx3atvaotwviqmk7lakafwyfh81remem8a0gvcr4fs5m3ay83ak3kjgu8wwv49z0zonswk13llafz8syfj8al21g8n6vjr98hna5kg99in2x0ljxfuy',
                errorCode: 'kbe0ov9qqnjsgqbqmmby842mshq22u7ohccn6zdc72jiliudsj',
                errorLabel: 584606,
                node: 8923451387,
                protocol: 'jdewmhhxhbm2mc4l25a4',
                qualityOfService: 'op6a4mcknexhsbindpo2',
                receiverParty: 'i3zgmxjlraw0zcetfh9w1is5zc82rgu8ke5hpwfwv5w8li83mruwuzsbrfu7xo4nt1k0l16ktbf20rla7wg6ktjqveaxqnlcv1n783fhr6r8qz3mlgvx56tkiyg56hpl19h29ox26mv22mvkhfcwf9goe2jvb74x',
                receiverComponent: 'shjdkapx9jwgu4ug743cwvedjuu3b20zqdynzxvf7v2fetdlt1k7m75r1zk4srds6593o47b6d2hu71igigshmw21adprabu24lfe9wpfbrj2aq79rqfqd99c01vv3orfxgvjgzrn4ucw9l4pumi3cw2ldaruuqk',
                receiverInterface: 't14krowlpt8nihqk3qu214c9bfvhhze2xp8xs3dfehtxpex1po9it8awriesynl4ld6wm8keqmj9cbdhug72jk3ht2thorjfartpfdyl3fowddbdojvypc25m3i8e0cfbetd6lk5q1ftxogc3z7l87o3c67mncin',
                receiverInterfaceNamespace: 'jk6feovy6gr1i8qg06rx7mn3ratbu9lm3y7ygmppytzl8i71y7bka0nwcdx22j9qwgl7u084xzhnx2mevqdx7uy3mazg3h6q7bmvfbjc0c24ebeofs9tvsfa88jzd5x3kpg7hdsho64g8y5hq5vevzsm22ndg987',
                retries: 9390556539,
                size: 4817056356,
                timesFailed: 8890800768,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '3nv2nwoxio5uwgfjfvun4tid08m5o951cd367o2mxx6tcr7s40',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'okynov5tgq5al5p8ulmb',
                scenario: '1u8vxxleyv867gt70qtznynohvzprrwj27paxtffe3sgf8bnx0myfr781vj1',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:11:37',
                executionMonitoringStartAt: '2020-08-02 20:13:34',
                
                flowHash: 'ifexujyr3zp25625qa61hlpkh10drhdcjgnn26y7',
                flowParty: 's4agdggqp464ftm1cp7m6rrsp87ing2du6ietsxyy7ysguc15418hf984zpikegz736creraupchd0bo4zsdiq8u34fwtwvs5nougtr98e8jjjc9dhvy93lv0k8tmyeggy8g3m6cj1a9lxt2pqqb4g4b7wajzae7',
                flowComponent: 'lqu7mnagbt96lftbmhtrzbhjpz772ur4vrjf38b6w8888edn8h53kome9kxrgcnhrb5eh6vvjwjfbk50evcr4zwc9vn6znf7e7f2f0gamlzy4m9wff4t2rr6eyougdnm134ec4dtmiei340dantr76iokexpmnp5',
                flowInterfaceName: 'rgxl7fvr0aqnbe9bl2k9lpx5vefgt087dp6f7wkdvg55siu5yibbp81sg7jls2c3yzt16gby4ez7r2lfdxy1v3etnboptwqcrhr1k8kjmig2qavzc1eqrzks10r79boo39v7xbj5n2rvtebfkr0suz2ag460ik1j',
                flowInterfaceNamespace: 'tennbhcuv3qqczyxkyhepe9022gr32uzz3cx6e1k07ekmeoq737eupj083iohgyeiewrta6ecq5ru2menrg7zwywn33aoe91bvxgpds78m6bty968gggeaqomkzk55tht3zry8nwh7s09lur79anyrat8cfr7wdk',
                status: 'ERROR',
                detail: 'Aliquam eius aut tempora earum. Tempore quo possimus fuga. Molestiae et quae vero. Quidem sint excepturi dolore nulla amet.',
                example: 'miv2dh1zlk5z528o6xwqk19oxowj41jkg2uodkl5loczqy3mzmc77gb3abdk0dkn1y4mrmxzbcntzmpgvxk4ekpqqcdyfr0ugp9i0bnm0pgzvvsjpyct6skv1y2d6m8lzx971npbqrlkhj6baybggccjl6br0az2',
                startTimeAt: '2020-08-03 04:58:49',
                direction: 'OUTBOUND',
                errorCategory: 'u8j026h31es9aby5ketmkn448kvct22bdsacdow2x7nxrnu5vg7jed6vcld0t2hwsw58agd8shunsme52yttybsnypt2nm2ov5nfxaiiftxlkjdpfxt8q82lgtfi5c4wnqkpm85yl33o5uiugrnrzj842oqha8hk',
                errorCode: '8263vmjbffxrdrjukzzseuxgi6ixdoyat2uoun9d1h148benwl',
                errorLabel: 483382,
                node: 8759313014,
                protocol: 'zjuach5mj7d5wmuoa0qh',
                qualityOfService: 'tf5sdi1ni4uzkrsse9zi',
                receiverParty: 'z22xtq67w94ln1ycg13ue5uxzhrdefmy1f3maj0zdhkadanh6zd0ktc3ukbdyrrhut4gtlzifu4i9o3tpd2pck3e1mxlr1e4zpm0c706gen1w1dk7y6qi6cg02biumm6ikjy4jdd9oovd4pf5fxre1om8p123iis',
                receiverComponent: 'vwmylxr2rfjxshjw80yzm58sdwcgbuna1khon66u39t6tdmmu8x0wai9enotqhca5g5b30nghanuyr4qko0ivjh7ykqn0o4gh8n3s0s78xcf6h5yn8mldgfrd1na5ycaocjpo47w1q48swzymxzer2becq51pise',
                receiverInterface: 'ghpkwr9940xmiufcmgsug028q0wp1l0hufadnfpr9a0ewe68l0rfjhdart2toud8wgbxtp0lz5opzvwlieuaxc99ej14pdgm2tg3lm8y6ldvjc66du888yhn4mloa7gsgowxwu1b6lbp66fafwxq3j6gforuda03',
                receiverInterfaceNamespace: 'i3a5edu4e6zx436zun4f1pua2apqf1pk8c9taf1kq1hxxvajlqc6ntmx8frr99wjxhr85mxqs2wnqofdir16m7as1pal5n7te9iz34nhnj2o7jx0higv96usrjfsbv2ldlu7tcftvcqqzoq6md2dcb8g4kb138w8',
                retries: 1458641366,
                size: 4889381971,
                timesFailed: 4034344660,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ikzzy4z15agkhweh5p2f6rokfmctpj76vnb3psqw5ilgj967m7',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'w6qiuxjv8mv92kfuz7b5',
                scenario: '8pdu8jvjasdo90641xfn69k0t9525du3kavlsnb758zy7vzazsehy0m8kecg',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:20:18',
                executionMonitoringStartAt: '2020-08-03 05:32:42',
                executionMonitoringEndAt: '2020-08-02 21:13:15',
                flowHash: null,
                flowParty: 'fnkxxb24i059fgx1vl0k54ypk33vr8daiwn09dyla3y6oeflycj4toibiivmfyvqw4jtteuyeo046rhcahokxg1qhcf17af83hoctnugifajzb6bg3wha9bcrs4lcy0n0ge09c1s8ydmyudnxrsk7t7jmpsxmwlt',
                flowComponent: 'fu507o2ezu4igjb47oblca0bduck4u41j4y4tun15qiq7fz4jxhesf7c7rx3fyjah9qus8y0a0fzm87oxoehrw7pqr3nvduxutw9dlga6wa3qeez06gugbpevh4unpe7wmrpvpmnvdcdjw0dtwfslardmne3l825',
                flowInterfaceName: 'nf541y9hxy5v7373uxakzwvsbqovxiywqohkwyv5gjhbqqtvcz1uz19zmidzuzilch5t6uhgdedusj8szhjf40pa2yt4fm6v8dtwdfyd8yrucgrd58wxpclrhrgc5ljfaosq1xfwas6iz12wbr4dqb7uy9tejygs',
                flowInterfaceNamespace: 'vjdg725os1f6hz1ujh3af27f97sspd6apjoof5cb36tecgchw9tcjwqcaxhhgohasga7sq3g0m8f7q72xvj1xtnde0pynhuznc3z84h1rhg82hh32c2mzxenzlofzc62eb4u7m0cc26vdqjqttafho6114f0bbt1',
                status: 'ERROR',
                detail: 'Molestiae et quia et expedita ut architecto ratione maxime. Aut sed blanditiis sed ipsa delectus velit numquam suscipit inventore. Repudiandae est nemo.',
                example: '2dfubgn07v7p3z9lpkodwrvb76zedjb7am266vrtfl1e26ykn7wqfwdx3mf4j17zvbogmho4c0fct6y8lm36nwi8d9yaludd5uvdkhps6467bpwusi7kc37l9ei4r1yaa98an7x4y9dwgn3isu1h02yawda0s73g',
                startTimeAt: '2020-08-03 16:41:01',
                direction: 'INBOUND',
                errorCategory: 'tmyghu839fy9tmdgeuebyvyt9edu8lxhyvjt9r4hp5kqf2kqbsisind3t0trjmisyw8x4dbu5fi3ntbjafttu3bokv3be2hwc1yz4mpmb32sded82730wf8s7bjamswfhb0ak1yiljs8cto83r111ffeyy3tdryi',
                errorCode: 'hqo7kwh0vvdq6r1nqjffqduj9re5f5fpjdtdp702rave4y1y8l',
                errorLabel: 157588,
                node: 6958115048,
                protocol: 'rq6j7wr82oug8vub286e',
                qualityOfService: 'r7a362fhlyibxkgpz7sx',
                receiverParty: '3rlvbxeoeted0qpqjpvezw5iovj1ycyfaggwdea0wwck538gv79zvs1gwe37don448bobpawa9jh3xtedeehtxpk8w5qowgtalo2fdozlhjyfp96bzbc2yp9m1nuyhbhkl20e893m6whga26k2s2dlio43c8qb7l',
                receiverComponent: 't1kscpgrlvi2rz0s5pxl847plno5aipece8pw37k8rw9tf4x2cojbmaqlqbns44sqip1hx3qnsyyfahzcaqlaia2kjed3d1dcj2a5y1x4vhj1osxemnbxws95t7e9gnn4c7jkwslpvx6dmxpva0gxwwzrvfgyt1h',
                receiverInterface: '79xy9umfg4b660lwsnm0jsuo5v605afr2qi6cazrpp2ighqguspj23bv02o7ukx7oufs3qkr3fapg6s1mjvkjamie8qbejowfdvz7s6bl0a3uelg1jmrp7th3rjfr86m2qp8fiy153rrx1irvy26idgi34epjemo',
                receiverInterfaceNamespace: '8ja9zdc8wpec96we9adnse65t5rnw90opawxiuncrf7q956djcntl6mdxtvmbnvgc4wiudkh1adez0obfdoq87ah6viu30bhslfv50ltqrx30a7oc3no0yn8zue0szjxvc25cljbwnyosw39ti6gll20wi0itgaq',
                retries: 1690430283,
                size: 7730176353,
                timesFailed: 4344145962,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'omgxpl2zho9zdll4jw9jpezrfzak5tcd5wgga5bph1e3kvn907',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'rja3mtk2fryq1sz1u9zp',
                scenario: '1obs6xvo4y8hsqyvkqkpbclspu8rhhfn8vor7b33mrxtc5omg8wuohdxipyq',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:17:39',
                executionMonitoringStartAt: '2020-08-03 05:38:58',
                executionMonitoringEndAt: '2020-08-03 08:29:26',
                
                flowParty: 'jlmox8cpdu7ydf1m39kdwz71n6k0yhk8g0pw85l8b19ox2ca1mnku7s7khilx6ohvyjlipc4ikj1yhm7ofb8pk01a8lghu6y90c4i2c7i58p4txiz0msumebox6f5uvcqg2gu7ei6bul82oaibk4nzfhczq1bohl',
                flowComponent: 'jw44lijgoftmbf2rq21swmbo8d0k5x46h06geunxh0cwupr4y2nnv82lk0tbh3dmwrvhb6tf2ggzqra44w3bioje8w3a4lsczn7s3hvqf5ay1cjrri4v8s24iccq2ntz0h69waxz7h1jfjjl1pw7zcs74dlizum2',
                flowInterfaceName: 'csnbhrzo3l85578pda2eat7heeinr1xo1c99uwfjc5895yhgfnpeb9t39x9kqazpg8dau3z8vu8qur41k9kxhwg8sowat14s3n6s0sq986bnmshktzp1fkbntvi8jch5pbv6cehtl314osijjlyvt1zs7ubbo6o0',
                flowInterfaceNamespace: 'qx5busvpy8shpwwojh35ebebf5423ov7f9cc65pvnqn9m2nt9vsnbtz2p54qio29c6fu5xz8gy8tn8wd2600hswe2lqgal4pq3xpwc1gcbo6xnl4wl6m0xaxcoku70dujnqbw0wbe42h6p9dgttc50yedwcli4j5',
                status: 'WAITING',
                detail: 'Quas in quisquam aut incidunt quod sint fuga non non. Placeat labore et ut aperiam voluptas aut. Omnis odit porro. Expedita aut temporibus molestias fugit. Quia placeat quis ratione aut nostrum odio vel saepe perferendis. Velit voluptatem quos nobis hic.',
                example: 'dvvyv3qiv9gzr1tn99lzramg49ssvtsqqyvuqrvwcziud2gijn0h813659y4zez957jr4tirdeoxm4sh0kg3mccqdrlimoos5fuxdf0vihw9uz1y1db8h7egz88egqzvbjy28i2par88a7hzd1gll6wv0i4d3rv2',
                startTimeAt: '2020-08-03 05:10:28',
                direction: 'INBOUND',
                errorCategory: 'n9j65pncgd38ckngrw4octtun4pu12n2wybdvkgqm5ix4ni7n8g8ng6ouk3xmaoliex0q9rdt0dug9s35bukube23v0jpi4tcpdzrzxkvf3x3fpdnf48xs0iwrnjzq6z96cajgzzndykiplfpp35lt4wd26xfjpn',
                errorCode: '8fmu31d2dd3z9kuf5yn34ouhzscylnp3ktji2eefls3bta8q0n',
                errorLabel: 540105,
                node: 2797740294,
                protocol: 'y7fl27k3jkumvsno0fnb',
                qualityOfService: 'o9okofazsywkcv3ccuib',
                receiverParty: '98u96wixsiwfhsy4l0qo16ase6ze7innb37decvrz9j8kf1ad3mj5a3ryeovwz0a98pixrw31exkxc532qx1o4aszs6ousgoywufyhashxcmtizw62riuocqtpwvn5bohhfum9gyyxkkihck95yo9xc8x4gfynaf',
                receiverComponent: 'j0w2e1vfduwrun4y28fbw888mz0lvcfjo47c6vkh4vfnbwo9rs0m3x6jvnpo3vdxi4ayg2gy7nl3q5b4uvh4tfuzpvyu4qaqa3n0ulmlemcz1j5uymb9w8x637evcu4kknv7bft0uyah1gb9pr80be08wcwa27s5',
                receiverInterface: '8tc07mf3hei2lwe3ufyf5dz1pspnjtx4nqo09lreitv8m4ht2uqoncm1vlcujjvxbkkaov2o022z3qsbhmaeeosdzqpgtmo055qhxjsi3k5tonc73i1gbauu7wkfyq469pvcgl6aushp5xib7sr6blkoxio8rqc9',
                receiverInterfaceNamespace: 'e7shw8q4qg7lnfaoo4mmej2zn4o3kzwyvpqqgst81abfb2zqp8itu5nqiref1ojd8oes5xjjd2u31x1t6b1rruiu36s3pzn8j6qimisgj61jll4k2p7ocfmci3jky6icfxxwu1cr53yzq6l9qdz2pol813evw5hw',
                retries: 5809339998,
                size: 7713258049,
                timesFailed: 5752212074,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ucnr2lccdh6d45lhug7j5lun83mzn33lblrbob3akuh6u2qe0m',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'uxt4nk7k8dsxglccq40j',
                scenario: '9wm1bl8doew8gq8oimfxwhswiykq1gg5wgaahj5rc5jcgifsm0s8bf9hfh6c',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:32:32',
                executionMonitoringStartAt: '2020-08-02 20:54:58',
                executionMonitoringEndAt: '2020-08-03 05:14:07',
                flowHash: 'tioijgzxjkxsbv5jlwdglvzxq4036bxdeaf6yvah',
                flowParty: 'psuokijuqcnbe3xxqw9b1jqb6qsgsq7xmy8jc62hv70r8vwao1m0nt66v9tdbft2wfkudgikdev597uwe4fm6tgu5onxs76q2789y95lhtblcjin4k200vgwoxmx3t91mcil96w3s8g78gz5ktt3qtprqhu592zk',
                flowComponent: null,
                flowInterfaceName: 'uwfn43ni15rshsndq5vigdh8tkbt6i9yt8e5h2m0vxkj5pfejhysvizsxx0duhmzdzpuvpoc82pddf6totnt0kxt3jhbflbzz11ux1fxhwqf4j3pc3yvfwi30nwywtva43nia2mpf03a1201h5uq4c86kpzdlb9z',
                flowInterfaceNamespace: '5dd16y0lyx4d1y85f5bstf7x34l06p9z3mx8kjfr816388oiol3dpki38nucuiujmmshj2uvnj985n0rirtndtblz1yhtn62s2wyk38d5b65nz1hkbl6oyvprddmwwwzg9dyksa694z5l1mlipsj8xdhp6za0kdy',
                status: 'SUCCESS',
                detail: 'Nobis rerum dolorum animi in facere rerum. Eius in labore praesentium sint quia. Consequatur alias voluptate quis. Molestiae et nemo.',
                example: '6ofzoeql9jwd30ikpbf552s3hnooe9qu5gme8nyjh46gkq54f6toudxkumelrt9qlv285qkb5gohnsb8zqnb6rvqs4i2xs5jtmzbwjn3um8p34yxai6xehudabk957q3a9p9y92kulb0l2924gj689d0nivco642',
                startTimeAt: '2020-08-03 11:05:06',
                direction: 'INBOUND',
                errorCategory: '85bv1qnxs34ocpjwx5atw3zj6nfcp34djchs25hm3p97tmserc0qxn4vsdy1ftw4x95oiqsnl7l5cuowee6pcyf8zlntgxvyq2eatu3rpk0fwsqrkmxv52v0uetiaeey62sw53ez4gtp536th4b1blc4znr8knfq',
                errorCode: 'oz4rmbxch3zcsverk9msx2oix148owmwf1irwlb378qbx4ns0g',
                errorLabel: 186113,
                node: 1538434189,
                protocol: 'jxss3i5o6q7ob810kwxp',
                qualityOfService: 'js7xl94d4biuj9opuugh',
                receiverParty: 'ml3bxistf7qlugks4j3tpq728799bldsx6xp7ixjaaj5dbon5xyursk9tjsx8tru22vbtda27l4dfmc2iirro3c2t856itap16wykcm6r53n09e7lg41xe7vh4oikxulhu0he7mue8xdwlwod2zr2nmwmb220cl1',
                receiverComponent: 'baixxqq9ub554nbsqelrklkmx7vd7nd1u7jq7m4cwl672nr8o4gbb8q5y4mvaf8msolxgzavguu1v3teud8xmg4ezjxi850u222ipc5odk8nkp2frrdvqd92hl7g9wypjm5pk9y8s698xp53sxpjg1c3gv68dhl6',
                receiverInterface: 'j3ahbpdjoitxhcolbw0iv70mz2asnek6ueboskbngro7zrsz4tjk7wpfy13nazzxb9ixwnzctw6nhkf00vfvpn4lb4lll14thkczpz2zrsfjxz5bpe6ndrbqack17mglf8lk3s884gynz6q6ko30q84ljjkrcdrg',
                receiverInterfaceNamespace: 'udmwamoual9b2a7ilmwimwrgrtam7odx4849ogc6ktdov499l9r0eivzkrsy4h5p7t3huaafe52ggkfhmz52zbtsob2rk96ticio6wvqwj7iau6cvwk93li7euox6vx1hb8uh9rmtenx31ft2jh4x1sdhdzok3sa',
                retries: 7283233025,
                size: 3448850361,
                timesFailed: 1795909993,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'y7xe6zta7ocrzdxr3gp3c2t4qng7tvabodovqenq8jsyx21gwu',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'hdwwek538rgl92gzn301',
                scenario: 'vx27t9x72q0bd7yy47ui4tvoxdjqpp6j6d9t5a06ozxvrqfbnzece87534cw',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:49:34',
                executionMonitoringStartAt: '2020-08-03 03:50:35',
                executionMonitoringEndAt: '2020-08-03 02:06:18',
                flowHash: 'ugprqjkybvirtt5x2oynypb360lj2slcokz8n6sm',
                flowParty: 'h4oa8gqx1rfbynqmcy4l8tab5y858ys634zq053waxq1qzh824fe8udeakly6pe9msm8qskacdcq9cs9092d4drercyznylh3gtj9omjncjgovq414yizdqxn8kto1v7u5nmjrtjk42q7as6fvdy83kripn0h1ju',
                
                flowInterfaceName: 'kmjiw0tw5ukf7j8vik5ueudh7aovb2oalavp9edcrg1et6qiiikphdnbvrmi3x99ljuadmw830ris523guctjk41vt061q0l33e6b9ommdmdbwxhx3wrxujkv716s0tk0zaye4pdcgntf9wxsec68x0g4xzxdkuc',
                flowInterfaceNamespace: 'z3y6kbjz3kj5423akd0ie3a2xa15j77w2a1j89be1g5oi4t3j79i7899qh43zhdg3di24i56icwtefaxp20wq5uk0esdd5q79mxa2y2lrrclcqvtrt7r8imkn9hwb69napdg48hitk791tdg22ewheuh4vmg0y8y',
                status: 'SUCCESS',
                detail: 'Velit odio aliquid. Et reiciendis dolorem. Quod tempore velit ut rerum laboriosam ipsum. Mollitia adipisci ratione.',
                example: 'xo6e0mss4va03gp6s3v27uld22bmifoacs11wpsup2d94m4wpxvbquixjlpwuektkzqoglr111ctp7oxfitgagfq076g9vrjdor8kq61bqg41nsdpvmj5b0i28qcl4c82hrgw4qj33sorhmx5hjz6rgssoqvnxmf',
                startTimeAt: '2020-08-02 20:58:35',
                direction: 'INBOUND',
                errorCategory: 'istyxhphfgfz9dd58unqeblxzrpu1r757ggd3pcjg6s5xyah3boyu0y1s001q0m6pj1rqetlx4rx7rkwdiumpzje1o6523hbe9icevjpszfurw5y8rhul7y75ohnktapfvifosac149cg9tff8vdavq7ljumxxi9',
                errorCode: '4goxrgh9t0xebzy2xssm3j6o9enhwz00yrp4m19us69ekurqkv',
                errorLabel: 725661,
                node: 3840319512,
                protocol: '9hw0nugw23ah24qltbhg',
                qualityOfService: 'sgrpma9zy221hvbkuerz',
                receiverParty: '10l37od008blcntef906we1afniqqxwujdt5in4ncd39nwt5t0tsgo42actpat1p0ukz3hoitvqt3sdw11wff1s3zz391s3qau5tmnkg9aab1e7h35mtakigu8c0d3wbx50gk1cj2fzgchurxltbjh53tic2r4q1',
                receiverComponent: 'x1xsog7v3lyfvrrsksa2ar6yxzb1a6mjb53zz3vpq9fk2rbwr0ylozb8zauc2ao1uhlky04rybpq3yk8pt3bppijizfe1iv9t795kkycfvz4cik5hu1hkqb7kjvwdj2sm512zijgoljs6mg3g0u0anh9g3bssn6u',
                receiverInterface: 'evrxknecqcf63fhguxibx3fizkopduqhfwzvscxvg6d9lezs3dbw8utv949po9o8qtxf8qzx4yy6z8vb0e74frmovf29ixut7co20trjsrxxd6pken4dx2d2yk8eehcs48mje7ulfkvjot7706njag3trv8alg2t',
                receiverInterfaceNamespace: 'tv71rfxewnvykd69dwsle8ixwyobmtz7ejbpnrfre4xnecz04b7ogpfmxb90vsfaq2ssaox6zv1aj9hq7ajhs6hj8r7anlc09e11hgmbadrpmioiiqlhy85mlx4rn3ygk1k9p8u3r2xr0bk9f5en4sjzgiwf4tgf',
                retries: 9885912901,
                size: 3561273460,
                timesFailed: 3420072372,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'hodog75a3sjc06hkr75ni6hgey6b0bztkzg95ua6nxh6so2dur',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '0ufh5bfmre9quafy3jqc',
                scenario: 'xgkr1arzq3vgosllxx3tttdedpec7itzmdfu7sol5ggnqi9fosp0r5yus5br',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:48:15',
                executionMonitoringStartAt: '2020-08-03 08:14:25',
                executionMonitoringEndAt: '2020-08-03 14:21:03',
                flowHash: '35igpymvc1squ4kcd1t9j7l5q21rzx4lq40w7hge',
                flowParty: 'k5s0icswwuhop1f48v26w91n8wjmpbo1ycce046kdshcj29tci7lbqr16ylo1w5wp7ql419qv205n9jrvquxulupt8rfuj61gat4zios5xq6l3h19yuxk24uzqzvqzbamn4t2zfryxvf0g8ubgakpc7lxna66oek',
                flowComponent: 'ov2q903n3zrbry9wof6fpwsp06khsb7m8t4imrla6mr91wlmifvf6cd8xi6hli81osrdta0t8iqdrfc0fu6qya72oviou2yajm6dlivgfhgmu5ezkulblipl0fyvq2s7163fjzzjhex4hx60qor29ed0cxdh4hag',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'mgyvemmhipoa8w71hzuue4mq9psspz26ufhj22vz057dq7crte7hai7oy72riupmb9kodswsu99zjpny2uz5e0pybh2gfpm65469tj53rud0u5cl1wj1glf5cy3eq8e97qnt8w8j4x65vioc5as7498dbwbk9ptn',
                status: 'HOLDING',
                detail: 'Excepturi sunt et aliquam. Distinctio ipsum porro. Molestiae distinctio cum esse sapiente quia quod qui. Quas quis eligendi excepturi aut reprehenderit autem.',
                example: 'abp0xd7lpcph49jvkj5tmhk7f8kgj5tztwdk6m7jwyt6qb6ieljqp3pu61d61ywikfly3nfhh66q8d5sikuoolx0lxnkckassd8g263p944y72unhfpx4uvbfof0pch0y7q1wicxy3z00125cdm2zg4ep926scu3',
                startTimeAt: '2020-08-03 07:45:55',
                direction: 'OUTBOUND',
                errorCategory: '801gkklah3b9ai562vjl5ehwq4z0hei6hdx2513ao2ripsob5a5vpavr76b89wnnes7v96zlcnww4w4jic0nax3zwmv3sw4isqlg9pdbban37nwl3w5yipo28c7waszygbfnpbrkjg5kt9vafjq2a9ura19nxhus',
                errorCode: '8u1fc4ts967cc828rdtvs1desv8vpgg3pzgtu4okttqkg9j169',
                errorLabel: 352841,
                node: 7371812303,
                protocol: 'e6a33hqa8fu048y6wbk3',
                qualityOfService: 'z5as2062vqoycig6qdj3',
                receiverParty: 'bq4qgnjc2rys37qdpnhw3ee1lml8zwl9mz9h49nk6hpdcb05ck1ewkybseb2twjwhm074vvxvwm3tu99ytfym7pn41qbj8wlgpidi9tp26wc2e5lfsjtcgqohawjumtntr6zok02g50p1uaxk6oo57isvhxo0sq8',
                receiverComponent: 'qxd370r3170dsipppjmyoiusmto1o8i9r4j8d75fs66o8o74fu26om2xpi56zxzb7r2yl1rram5z70091kh3m84rozbj1k92f3z1cb23p5z8lgbja53dh2vfey70vyynqsudrpuuqsm86k41hxted6wh9goz8652',
                receiverInterface: 'daycwol2kbstvrm79bwcw59w1cxmhzo44y7wvfw89grl905jdq6bq8if3k1jqspytsdpx3zm23598z0buq07vckcu57niqnc8epj8axel6u8z5vr4cmumxwp03p1098djv9g38d0rtb95ii3v1rlatqj0bcvkfiv',
                receiverInterfaceNamespace: 'w37hunu7boms1b3gqid2rmp1x9z9acsjcb7u9uoqvic9ron0rhu1zqq58zoxnms48442nkz2tjnniemqif0x13wk7fww0wweswt92a5onwxfd6j4ed0xr6k97jbwekd7lo97jpii7lt8rfuygpstuob10dzpmszk',
                retries: 6778577213,
                size: 3687718662,
                timesFailed: 4776157094,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'wej4jzodvy7xld3hbrx0w2wpb3mzs4nzunxtxp6uma41fgkhuo',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'c6cj6ki0qamnrw9feaaz',
                scenario: 'ow0vmptpqzgz3zy7h33nmh8h5ismv2avtzt3twcdhqxwox4cd92olh5eyx43',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:28:12',
                executionMonitoringStartAt: '2020-08-02 21:50:17',
                executionMonitoringEndAt: '2020-08-03 07:36:28',
                flowHash: 'bldtslfdn2zf81a7jzam2w7welap2p9q8ou5dpa3',
                flowParty: 'qrs3yh9z2wcut7behflawvxnkk17xd5w11k2g6g0qkpjwnofjac2jv377l2brrd9qynwqdshoko5egk3y8ctbq4bzmynttauxk7n59zgj9ftk9re6l7pl8chbi5tu2fherp9753hjzf2nc8of5rnbd4zburim1w0',
                flowComponent: 'z3etypquzesey32nsy4carf8uq3law8yfyek5ug95uuk1qta9p7x8avujmc38dq2emgz4na92stc163r1m8oo5gg4vu2pgwpgiyoorso5rdwbcbunfmj2admhulrq003ci5yiklt95hk9kpr4dkadri2mipooevz',
                
                flowInterfaceNamespace: 'bc8jtsd1v3hk56u3rnbt2nyhw9jk2grag5y7e331e1huh1to0re5qjox3nlmn2si78a6ey3u05pc14e140zwlxjyv6c7f75hx5gp2lkr2qpmgn2926gy0zboxfae2pcv9scrmup4bk1anmrox88bzb2b8tpv5oqa',
                status: 'TO_BE_DELIVERED',
                detail: 'Et dolores sunt. Tenetur voluptates ut nihil quo et nostrum est. Ipsa quia aut et officiis est aliquam odio molestias ut. Molestiae et dolores. Voluptas autem ducimus eum qui est eos dolores. Esse saepe eaque et ea ut.',
                example: 'gtsitexm4jkmdupk6jc0pnksfd2xjp3ed09oenbezx2qidnhxvj0aile7qffho3p2dubuq8zhy6f9wat9poqk9pm0n1p3m51ajqtf3ft2bh14hjauif71fsb5u15njrh188go9ta7pzt2bfng22he8lqi4pq66nt',
                startTimeAt: '2020-08-03 05:03:51',
                direction: 'OUTBOUND',
                errorCategory: '66zvmztayecr0lftjt5eyf3cgqlxxq76poena7qkiuxh17wsfhnn2yb4uttp3hwot6tnlnpg5lpzul3mq6ibj8kx2x5eg5dt53i91zchl2ff3w4hb5mgdxge3mdi138vdx70cbyr2klzlcwlfi70prgc4p00tsxn',
                errorCode: 'mura7yhwnl2lme8hh75q380angqvluafy15a6sagyjt3u9oapl',
                errorLabel: 700253,
                node: 8088368191,
                protocol: 'z90k0aoaskh95aqueckt',
                qualityOfService: 'b354fydlf55itnaegtyi',
                receiverParty: 'ddx27qptngl5zp2udsj63jqkgynegesd3o112mctgwkasgl6r4p9hzm330tf73z4ajp098moe3m2gq4fu03qm99m0321fesoz2q3pnyas6qqk7s2njll7yx5s5cz1jpaydvthueyw81di9v856xbdj1e4b6aib5w',
                receiverComponent: 'ucf3e5kjfhlmwrfvij6e0hji4joax6hwgrl0wlc3lilp9irgrmefhagmljtb43hdkprgirqhzvchrl3k8jl17td3oz32eopll7aiz057v48d12ji0sw0s46hfwuqrob91ql38nfveuxooqi9bm0hjuav95idel05',
                receiverInterface: 'iqzbxbcs4rey2nb9wz9kaqux3alek1scyufqisadg8ymvrhezs3hj6op5tjuvrskklmxflxv2idy7x4ss4kxtfnduqs3hmcipiu2rklf3lmpre080q9rwqrt96wpqzvaxlkqkuxeta0nvo24hoxho4aryr48o9ph',
                receiverInterfaceNamespace: 'ibi6suhgbg2uhdrq4faxki8zsjjfo1uc3grgcobnzjbu6egfc3tmmfp928lhmzixlhx87mn4s8p6998vy9w3fe42i2oqbr888hnvlavq7fksqa2v44hxrgypgt9wkqm5gkv4039vnw8hyf36e1llu2a7ysawnz4u',
                retries: 9932662192,
                size: 2686304910,
                timesFailed: 6817583095,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'x9wge5ns5hg5bupzz29f6r59b5qw3ehlzro17bg3op4pu9boqa',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'ehq837fwk9pndbch5cb3',
                scenario: 'ouvm3edic55jrvhml7zk45huh4echcvlyhekvnv1wwn1oro8c3nw475oqb12',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:52:55',
                executionMonitoringStartAt: '2020-08-03 03:25:08',
                executionMonitoringEndAt: '2020-08-03 05:54:49',
                flowHash: 'f5f847mhe93v81qj62sgm882qttdvlwjsq6j9kla',
                flowParty: 'r2udts33ra5hpqcu929h681qlzs397qxmixt6u6t23rm7dyao7zcjsgp3z0prsiw6517j4ff9mj7w3kkykaek27xmk2vqcpwwlw86bdx1xzta6f8hidkxqi2p9g3y52ap0afr5lu2575p38g2pde7y7wx9zom8k8',
                flowComponent: '5jywojqavomhju5g97rvt0uh3ue2axu51sv10rajqn44u8r6mfvfi1kyfai6qomli1csjh2a6ug2zk4sb7gejsd9y0s21y5g4mwkveqfrs1jx9e5wbrma520qrp1d3291hlnka7e0a6ic5uk09u3kmq23sdqxmdh',
                flowInterfaceName: 'a0eag7rnf0b8exsjfquohrivaeqduch9km6pmh436teutuf248480wel90fnne91vyslj7qg4cj7adfu3a5tfm6dsrfsuapk9yiypsq4zgq8z3u9yog73vpkjt28ys8wszem8ddp8qqg04d3lf95lk0d4xyghth3',
                flowInterfaceNamespace: null,
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptatem quae eos magni eaque. Possimus et voluptatem rem. Molestiae corrupti consectetur et vel voluptatem at impedit deleniti. Dolor optio quas voluptatum porro necessitatibus animi.',
                example: '0g9nee9b5liyaqh2nh881wc3ebtcuf36kaww3g878ro1703mcq5yruzrffxkus4i2yheg3gd2hr0lyzpkzp6y5l9npd8jd5g8woee2usxrokpszznfxntjy8urzlwr9zdrmznhprw94sg4s6wafmd9qmw553ju4m',
                startTimeAt: '2020-08-02 22:45:13',
                direction: 'OUTBOUND',
                errorCategory: 'ue0yg42c6v3885ai7md7fhe42i4h4oxefsm8hhex9smdfdpfk9fu5yb9xwmepdckvb2nd7cdje82nzxczys91iprl55qx0v25bexylarud28hxgt36g4uoba921mxg3l66egxbhfim1bbbhxm87o325moo4yyfqr',
                errorCode: '8vl4nrkytxlv6r93ic291tpyn8umjw79nvwf8si1423fopm4qw',
                errorLabel: 942284,
                node: 6621439750,
                protocol: 'pnpyt6opbj28dvsdlcww',
                qualityOfService: 'acw94oyvm35wzugtkf6g',
                receiverParty: 'yfwywla9zwnq5nl0ljlod6qrsjegrn94p6nbz7wyl6nxlz2a81fvp2spvx6yit7fie76gyxjefspjw7idwvzkhfa3qx7b1n7ukojvvc650ijuyxc0x2rgt7r7e41xpsngtxkesdh4u4plai2psgv9bn0qpcrkft0',
                receiverComponent: 'swyjd8t3uqxnz40jzu9xia1aepqr7cfylwihrq596qe6nwysx0nyzjxawr0yybk4d7ngi4u7csnu3g4xw6xjdpxx8pads8r17234gqigim2x1y2ikay0i4z0m18rdb2uh0mz80gfutnd59y0aoh8xuea10kgvq3c',
                receiverInterface: '5xt095jdu2nm6wy7pbh0nttswpff30ol6hynlujhp3m8yy5ogtf1ngisff2nbkj285rf18njnsfpij03nxvc5pzumjrpxb8wun0drefraxectz9ge59ymwsyklvhwyi68osw7wr56is9ca15bdgov5l1tn4cn7jd',
                receiverInterfaceNamespace: 'ezuif5yv9plqk3yg2gg59nzxvn8zs2oncbzncpndb35mvckvo8mrn70njm6f5204ba4h3l5nkjntqon5v6fidv10itbcpxbcu8w7yaxvai0rt5kty34xk7h3ba1j37khnwykx9ruxvzsoc3onvdzkf4lg5rr0rcy',
                retries: 9372482844,
                size: 2904581132,
                timesFailed: 2612012939,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '67ljbl3tttikku6zo2jjo4dwdm181f9pl8l18djajj9uyeoikc',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '0g919ec83yg30dsgowix',
                scenario: 'ysjcz28nhdgxxj1mexn3ydb295sqxavzr1auvycpx00rqzq5bs8308yk11em',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:34:02',
                executionMonitoringStartAt: '2020-08-03 04:15:01',
                executionMonitoringEndAt: '2020-08-02 22:23:14',
                flowHash: 'tktb67a1xk7wmi8tn3h5q68vtioeyd729a7w989z',
                flowParty: 'vqm2prii1hqwdph4u72uwjtbuhgbhpk0jrqgf2zj87gb5xzyi9p3t3w8fxjy01nawudkvi86ni48l5xqif6bm3m5jcg7o6xf9796104hjn7lcj17kczrfsdsbczh3p0dogiio2la116d39qnikagxrqs0ymayb3q',
                flowComponent: '3dvvdjq5b3u8veyxh8fg5x2kx6mkmrf15fjkfe9y3j0xx9dt2wwpf2r5zphuq6e93bgj9qx1a30ikelr8su9nh3vnhhxk5gbjp886o8etpx03728c76un6vriaaqckn0lkzn7xxfz3jnqlw3ufar1hykgnt401y2',
                flowInterfaceName: '6int9aryjtnxqt1cnwotmytkr96vh31hjiwpe48yz56vqh2jpyubrykg6kg2ustwsmiti7gefdlxhndhtodbx76z41otjlapwljpmkeq41ubi9vbktivicrqyxq3vowbijcpeko1rxfgkq6rqz6hqn3pqnv3fwwc',
                
                status: 'DELIVERING',
                detail: 'At id culpa maiores deleniti. A eum alias perferendis id aut. Praesentium et fugit et omnis magni reiciendis placeat.',
                example: 'zk9zt9jrdkhkxguoq4zv76za2g392ajet1ngul6bbvpugv1fyyxzabk8jvm6bgo2b893p7unkr9uzawwpt9hbnhkw8rcn16ukkw2athuotksqlsuvfqn73bmh9atd0v9kvvpazh8vx60s9ytlzw099imvi5e9noa',
                startTimeAt: '2020-08-03 04:57:52',
                direction: 'INBOUND',
                errorCategory: 'u75qw9tmt494677ynak1t7m2g3ds22inzqe7o9uoeruxb284uj4mczooo5sucnnl3488u9dpeqat0l17x395gooin0imz9bf1h4u1vk6xmzb4nrb8gadhq89jsyiyl7cr55c3bu1euj3494240tm1balv4wa593s',
                errorCode: 'b2i0rl20ybivu2aejbnbh4qu7lu6tfk8qiel4cwg4wabx7eiuw',
                errorLabel: 740986,
                node: 2892466444,
                protocol: 'jizq02oas1vyh3j84xtq',
                qualityOfService: 'ij9bz17uucitxwoyerii',
                receiverParty: 'qo9w0jwdntbkpldkqanl5pib8jiqokn4df9mwjvh0nb16a9yxgvpjdit7q5rlr5yxx55d3u3itq7ktax00hb5v3z2xix6yuqv7at5yjftx3ihdjpid1nlyxu62uztg4duroz0ibti24z1moteuv81ewhm0km4o7c',
                receiverComponent: 'pxr07xexqvntutf30l44r5x1qr0qeskivm7cehny1vrd75keqyqgfyw5argyhv5zfu0dmoes4l1pdoryj6hupcn4sthik5e5emyzjiejmxtotjqbzkb9kpfnukcvexqb35r082mln6nmrf400vopqfonty3zph95',
                receiverInterface: '3p7hidqhj18oh5hh0brtlvvbwqs42eqeqs8gezn9yoao3qabsedohj41odu97cygduoah23lcx75yvg3o62iwrn4gc6hlbjg9dsk1jcjv830bjjrfhyjmjqfnda9d6nlnqmin6n3yu5u1h6un2zphxnbazs081w1',
                receiverInterfaceNamespace: 'dipoorrd45yrnkot2mu7xl67q3353tsajxflqyk6hxw004w7nqmg7zle02awmjjenliyjwqpg3hcoyf1b1ms80eeq8406x9l06ao72ep41hoerdssa5s0bgdf4ebp9hx4793c46egr0grdo9h3qx5dnu6s8r2smk',
                retries: 1296436180,
                size: 5335181772,
                timesFailed: 6891926822,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'bx8xyukbvwhavevyg1vsf246i7s7inqchcc0m1wht61x3m17sz',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'f0dvnf17au48ufelah8i',
                scenario: 'ufxkyjz8fe3a414jdw0aen8fhin6bynvlxc7kgh6jhiz3ri8vzyrgqy8sgzx',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 00:45:29',
                executionMonitoringStartAt: '2020-08-03 08:42:58',
                executionMonitoringEndAt: '2020-08-03 01:40:31',
                flowHash: 'qw7hhwm55i6hh2u2v9an5yq3huxx31u4sqdfjvwv',
                flowParty: 'suz8tzqylk8hmsa8cx39nqy1u5f4spxij86v4zms3wmz5cyk8q8xrujstr8fkf6eomysje9rpita7ic5auefw2f8olr3n2n4c504aylvttxf0x6pgcuqq9ry8ia591guj2lpwo55tixn45s7yz7jk7cclzwg5pj7',
                flowComponent: 'kq6463guhfv5buhrvyxf9fduzeu7pxuj4kf6orr6g9cbfpyn37efes3jksslwui4c53g82s5t2n5mej9j2ov7wm25yqhjwj1zajixtterpns2woje6v0z44ozu0fgcdkqru8nxka48rdpvmp7fllzb936k9mg9ja',
                flowInterfaceName: 'zu3lcqykx9pm2sw76am246ct08yjkdvnqvjm0yh10xncqsb8bi4dupbgylfvrpg1fai7m47z1vc2kynoznh3d0y8uhukrefm035d7x6ux2z2mm3y4iyrnwpr2ozgmgytn4ldaeki6thgzk2iktk3ki882vyuwb0o',
                flowInterfaceNamespace: 'uj2my45k3wogke4vbnyfzu83dfw1h45845ve9jlfidp5wvm1v6sbzrhk4vgvhd50if2doo5ozwdmzlb398k71m82yiawnsusondsluikgembph0254iqrsxc4tfoqb74tikewkw06o2tpv3ur1sc19uxpz5cagi7',
                status: null,
                detail: 'Qui maiores nihil voluptatem molestiae illo repellendus sit. Expedita consectetur mollitia ullam dolorum enim consequatur voluptatem ipsam. Id culpa nobis perspiciatis laudantium facere. Est distinctio dolor eum. Saepe sint consectetur ratione iusto molestias non voluptatem. Atque dolorem aperiam quam repellendus et et debitis.',
                example: 'zy955ebt9xga1mg0z3xwmy6kxx4zxsj212sb3pgdibwp2bxvw55jd1doixl2jcszft4c3v23hmdb7kp6alaon5t24g1lds5pydahslmjey87zgpvoxb6drr401p2u4wpj8olh6znkh3hh5bck87dl2xzp9ws943k',
                startTimeAt: '2020-08-03 05:56:10',
                direction: 'INBOUND',
                errorCategory: 'rmo5aybhvhuaoj2r4rkzdg8i9saaxd2rjqzoi7zllk03isscubyjdoxwiiqotx8jtfngpzarckljabdu70rsvh27cvj46ycsashg42qtz0if6n99x6yh5lkbyppg77t7xdz8t0cg7ssqc4n4aipqmld86qsbpc99',
                errorCode: 'iuvxeexw8mn36vq92zdw01004jb0zrerqthldm9ldwonj13k6u',
                errorLabel: 716030,
                node: 4865163866,
                protocol: 'kx0pw22yuzpltk49evtd',
                qualityOfService: '7xeanpwkl9uhqgh9vsz4',
                receiverParty: '64xmbq14g7sntvmljd3ffc5dyy6iw3njmzywri0pu1brdj0832vwtv6sdnf02i9euz91459ts9yfun7rwhl75zm3ji8rn6dk0ei4ebhgn6y238t2q92sr4cbu92v4251fbh5d8nws7v7kxu7u5wimjzisfn5usqa',
                receiverComponent: 'zt06ftu8t4ujjy6ktvvwk2oqrs3770ssdp1wqnmcx5lhpofobjx4votu91sp7z0rxza7e55rpjikzm6mywx7yz7t56v8nuk6p20rdfqwsf9p9gf6szmkjhz5w9l0h6u8054cu0m7q68wjj7aakdoz6543uwo08sm',
                receiverInterface: '10dij4y9wm1ff6wvfg5n2fhbgyqxem5owhu9amhoo8ucl0gf3mtjbrw9bxn47kzdmo4f2bi9572mxmu1we5bjjh0ynqy153yy11uxg94fqo94iwjts5yiy3ftbmni17jezybk0y05hr7zn8g7bbfe1l39vkukkwn',
                receiverInterfaceNamespace: 'txrow883bynxiofh85utkou9at3vqfy1e6png2b3umjmzozx5oozdcxft3iz8p98mbg59g5ijblbqmz3cf9m4oc6z7ezhww55au0u7qne4njbmstu9jxe0ux1i12xolgjy6ya6o6wji890l7y65gdut4d3p4lpws',
                retries: 7772509108,
                size: 3388346122,
                timesFailed: 8854765801,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'lgszuokajtit28b8l2tpu94kvdrhr0arlzvapegbhygna7pb8s',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'vmhp8aawn3syk6evmo84',
                scenario: 'dou0sol8ceyd62a9lx5oomelidh2frggqhlvw8upqwf15otl4qzan0r5tfqg',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:36:34',
                executionMonitoringStartAt: '2020-08-03 00:12:52',
                executionMonitoringEndAt: '2020-08-03 00:26:38',
                flowHash: '2xsiz0j4pg52jxigk9xnx0zgc1bb0sc6c37tzu7w',
                flowParty: 'ogzlwak4dcerj6rmui22tkq2obcnh6ejvwv29xkxtlfmb1i130cwr0zy7svgqizq5aklw86bk10mu645jy0s0bfe2q6g5yuv80b16w8gn00euhfdlhysaux682brh5vnfv4g048jq8zl5cjg0vmjn4mcagcc9zod',
                flowComponent: 'f4o87thjobekqx61227gy50exzse1pd3uv59f5rzh008eo8di9hrvc90kkah0h6nl5dz1e0oa9d96fu2n8sbcm0rx9cksnrxbbeu4r8nlgjeokmhrf352pzpv0x91btqzux4660jfvnt7afa0skugm279gb3h4jd',
                flowInterfaceName: '5caod0hbii9qffi8yh4r0kig54bqot5yf3014gxohztohutkk4l63fip6c4gyotjixutthkarunnvhhldtr7koyhqigip1jyj1dcmm9wiq1el0bzfya292o3hawk0o7jqfgcfqgkbctmxnw9adg2n503al4hn3hk',
                flowInterfaceNamespace: 'wivqdlhnq9dihs6g18kswso31ogqg4zjjhusuxfh6c196gk6vb8oi2ieykg9pc18kv981rtmvs1dsntf2fqe13dp5xzu98pjn5ieg5ytsdk9ienoo9ms5e3gs32kfmx86hjm316krqi095g3a5x0agm9pwq1z22c',
                
                detail: 'Sint ex rem fuga qui. Sequi molestias nihil quia. Est aspernatur ullam quod consequatur aliquam numquam ea at quia. Eius dolorem aut in animi ullam et. Cum vitae quo officia. Velit aut alias.',
                example: '5q100pkcvvohzhwc6y5d33w4lq8mg29zagwx2u6gd9msza0rrslz9j4adj7g5cdsfolffow9xgs3o1uhj9sf0ia9xe1b2y8gg5bzzz3u1norfu9j12iq8j4et7sq39qsrxv1ckglx16f17dxjxwvlrh2v5gk28nr',
                startTimeAt: '2020-08-03 08:56:36',
                direction: 'OUTBOUND',
                errorCategory: 'l50g9wefovsp3k4651ffrzpp985hxy4p0a0aea9cqxguyks3ceivytgsen1hj2u68no3mle1jo8osz8d42dhq2gkotq1oezadz09ps8xtrnmcckpo6ebbsymb3lbgv7zypx7pr41cgoycgpv62tmnw5wt3g895yd',
                errorCode: 'suvs4d5ep6sb3pv5kdij13x2tebky45h5eqlm8540eyo8a8mpd',
                errorLabel: 283687,
                node: 4820760827,
                protocol: 'ieamu6assnp4tvy1jtw7',
                qualityOfService: 'u03aws4f15qmfcsnql28',
                receiverParty: 'l74web4slka15e00c87mky28oza6px2anffeg2hla5bu8f0me0uw9cbtwzbrx69zxfvnde8c1zi0v7c07ypuovazas2fw80vnewzdafh8qp9opwgv79lnbjfalyru5o8mvp6j7e862ys1ferzx3qyjpkbvi5w1d6',
                receiverComponent: '40q0of2543iro35jmbe9i7yy3rnvbvbg1vpugsn8af9j84f2nls1ckd5a6egq0wvmbrmmnjislr2ou4ket998a0ksuhelwe66bl2qlnjw55epa14lb7o2o0j9yfcoklrjxpuevixv9b8i6839gip0f1fbzxprz3i',
                receiverInterface: 'rx05kp9k0xpij2sqd4vn6scuukysp4874ug9wzbcoehqtpvgzbu6lym8tejl936ospq1j1k9q63ghc0v2lf5oigqlq2m1xzaa0at2l2s79hexnjct5zk6vcxknrrdqityhzunu49uujig96w7jjtm6n5o6vh9das',
                receiverInterfaceNamespace: 'xn6st0om5lifjr8nma2h5gqhlmis1m35gamak62pcti8vjdr4cayr7mmx2ts4l06gpx058q2q40s7hljnglhlhutmiez1pg9j3nelu3wdf5befhdeqti1fc1sq98w1vkrljj49pp0s8oxl34hw211a409flk0yya',
                retries: 3438884502,
                size: 5085108792,
                timesFailed: 1321542379,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '6cg9w5q55ewfx0c6r7045h6oxoc4edg6h2d0qhnvl8b9echglx',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'zx74lf034yx1v42lthmj',
                scenario: 'b5afuin563f1sfxsxq8llwnnm7go25mhll2kxduuhalak9kxuqwqm2d9j0rq',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:18:56',
                executionMonitoringStartAt: '2020-08-03 10:30:55',
                executionMonitoringEndAt: '2020-08-03 08:15:19',
                flowHash: 'pl3zyhbl3wwyd4est30tm70psza6822op37hqelq',
                flowParty: 'rjq08p50fb1e0qpr6wu4h7z661mr6nx8o9rvi1uio54u0omt9v10l5azccjtb2uk87a95nxsijyzrbuun1yn8u1r9mmtscr7j1utmu2tjxotcslax7yk91vaz0ba3520d9ar1o0msheky1o65t96i65qdsuu5co6',
                flowComponent: 'jihmt2kqyq8is2uc2yb797xrjsjudyw70t9amo67vrp49ajrf3mkxxdkhzbwcljt1t0ydjaoqlpog3yncothrn5prkmrusy3e4ftpwrushqwr1d6coe69bh8vz9s2p6rzv3kdodftce5iap85k8xgo94yg19857h',
                flowInterfaceName: 'owy43jqsjpelor3rx5ftxhybybppnpame9nmvtomiuoe63z76ixavt9m2ij78lvmoo12ezmrhx0ft4h06e6l5ske1homqjw59617ormugpwdauthpi2d1rra4zk0s1uz8yf3l3cy1uye1qu1zkfwdn2mh0u9ikvn',
                flowInterfaceNamespace: '1eca31kz2smwjvwu62fkaisizr82ju6sgx1wt7jyzxrdu7rf078g1hcv7u7hva6ii7gf3mnfybi7qqm6ipvsnw3w9jr1qv7si32wzw0ll5gymc8hps30hlpjzds0k534nyo5pf6oegnjlyp6p8dhjjgs3mfqfmx6',
                status: 'TO_BE_DELIVERED',
                detail: 'Non quas nulla recusandae et. Ut harum aperiam porro voluptatibus at aperiam. Consequatur placeat minus reiciendis ratione ea harum repellat est dolores. Soluta consequuntur accusantium fuga eaque voluptate.',
                example: 'ahyfuvev89cd7bga92b61inqyd1fsl7ttkoq1zu6cujmr97v3balgd85itqml54cqef1ho04qmmho0d7q6fnluulcaqs91lk20mu10shkrz7uw1mb0ie4eyupxk1pcfjvmllwgr7y2we5jaf19xhn4jlvzlhibxx',
                startTimeAt: '2020-08-03 07:27:24',
                direction: null,
                errorCategory: 'br7iujchd5yr52pwxt37uotppsdh7t5gcfwn8rnldq472d4s8mvojp6nqoemxe5bzjmc6grl4y17x9mz2n229ldjuorzg2jm8jzkd51trelsrxgamx6rklqcroc8up2kcfljut4qpxhbud69m37hckuujrxan74r',
                errorCode: '843swyinyx01ewkcxndfoltewjuv62clzwx45dyizoc4hjo95d',
                errorLabel: 809714,
                node: 7590576857,
                protocol: 'yh47cg5cwg9ejhkpl5hh',
                qualityOfService: '9hghpd6qacl54xgdhtm6',
                receiverParty: 'jrbslnmfr712chvu999atvc2w9yf71hntq67gehh5y1ph8imuutbmf9b6pag36g46dsk9dgqdwsgmqm0zy31c8mr28y3qab154hj0opkt5uf7vpfwlzmad4rcxyqdvw0hi7qpv07sn27ub4mm345j21t96no6lcq',
                receiverComponent: 'sgvc7p8nga7b20wzsytb1mh4uip1m28bzxk5ghn7oayy1u1mrk1ivzvn6rysgjbsw422okarupmg2w8hazm6g1zwlyvp2clalj23r8uq538om1omqv81j74ad8540c9rz4uhwse2vi3a94uqe3xkbzf93wusv1de',
                receiverInterface: 'wvhs7qtjiquzdrpo3filmfq7vltoyv7ksjg1sjle61480gy53m22qlwm42e9pykarsdgg5ia5igefqdvzrndbbzbybjxbvnl7sj86fhhqwbktqvtped0tpy48w7c39d622wws8k8tahuj417tw43qjwvm8253w1a',
                receiverInterfaceNamespace: 'uujy2w1rjxsqtiurvo5agcu0ilxsjwmxae4g253s0viiyev24kp3jiadips24be7fyhfp4zt6j72zzvc98sqmtwcajsc57ozytzj9sr9lbqq0fcqbviiykg4pi6nrwwamb1raosax4uvcjd45dl36iwcyduzztbv',
                retries: 4135502521,
                size: 9783436413,
                timesFailed: 3658331904,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '02vb1t8e5aue6q2lzrjdl0l150mvl2yqnzv4xa315jcby1dos2',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'rrtb9o6l4hkn7o9gox2x',
                scenario: 'u4lkdk4cv0c242bhqt5qc7fcje578x60zwozrcf58gve9p8xalesq5dlhw5r',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:02:01',
                executionMonitoringStartAt: '2020-08-03 05:19:39',
                executionMonitoringEndAt: '2020-08-03 08:26:36',
                flowHash: 'l7tbeuwri8ruwooi7qnn0x45gk1fdd40iorza8hg',
                flowParty: 'qjs81akps08euw83umgpkyzy2lgawsphh07y5o1k364mx5jfcistyrdg3rhjaxztjda2aluv794ztq6rub8hbemqz57a7hdpc63c9ze7b5mj93oqx0ghgsjtqh7v3zwptbu4ndet68aohm8w4p5w8rvbk3alga1z',
                flowComponent: '23ycd1um6amgpwe3ma6gvor3oifnq7nd66lcxo8djom7opklen1qlhr14eyalrvdzas4gf2yja9fqu7zeg7yb4wq465ul5j5lt75855jtk6dimtmcglqrtdvch6lvub8q9b84eryaa1s8pp8ixi9zt708vjldkjd',
                flowInterfaceName: 'bwvfycfxeu890kswin1n0c823hfdyou5kat0p8rpjysm6zjolylqbl1mx0vdqrzjcx8hbwp8ckvyimxoablgldsqanx7muo7qf70w2287h8fvq9uc7dpm7j49llu2mnuibxgmbdo645jzl4fcoyx737wxwe0ca2f',
                flowInterfaceNamespace: '5qjo8w4brkjchbjcf1emg0i93zc6zo5w1hc2kncb8523z7ai0ud9nssrw6n8yujiia5454lwclcwg8ezicp3i6kymjdwuu5s8o98zu0fsc3z5063srbnr2pn7fdedwyjos8bgx85hupibu9w0s0x7lznvygk1x6q',
                status: 'HOLDING',
                detail: 'Similique vero consequatur eum sunt natus sapiente fugiat. Ea sint totam qui. In architecto nesciunt magni quae quisquam. Quas et sit. Deserunt deleniti possimus sed ut quisquam libero culpa.',
                example: 'f3yd6lh2gfhfqjvfnpr7px7fnp613nn4gh742v4rimzg3lp6xnqm2vwm6r5ziyabli9slo7k41u2vi4q26uwajxja7l03m3he214vrjodfqkak004o9bztbuva5rvnt63hz6v5dvvmaatrgfviuk61uzqtjndud2',
                startTimeAt: '2020-08-03 13:44:12',
                
                errorCategory: 'wea4awaph5zh8n7czmfsqzecuj1ywsz88ovpm9wye0btqx2nr9eu15serb273zozggiy1rri8rwx10ussttlhtqqiu9l1wm41nzs184x6s0uooqq6bsy2cuz75vzgxsi9c0fcj7wkwv4njyxluv95u2m1kpao0g3',
                errorCode: 'a62paljzqmr83dmv1l5emrt6ngi7yagbydtojnf5mhbrhvlw9g',
                errorLabel: 149012,
                node: 3989954907,
                protocol: '725s6jsh0ey2uo8fahs4',
                qualityOfService: '8zjzfknqcc8lbxkmo5fw',
                receiverParty: '7isl01l2bd79p8o038jo9f6w0jh3724zk6vbaqoqr55j3c6fzyiovkznn5q9hmpbfc3whsr0r43hxsbv0o96i3f2wwa1u1tr77881wsmomj5yo8kf2xlbgatzwb6ysqj0d68t4wlg8tf2mnzxtjxxj8eah2zaej6',
                receiverComponent: 'v9u1jbigb9ju8vh6rc1kixogbeowkbodzl7djylzms9cazwn8hqhescyk1c4xymilkpjwocbgf1bwk5zq64wxbs8asleehlh8sef8x1vtwk25wvu52s80eise1c7ffoh9jvw9nzealtzbh3iuj9zyfm1oxyoa7yl',
                receiverInterface: 'vpw8pbnrtbaoflg0zc2s9meowcg028ztnr0k6ojnly9jew6ci9djkws9uevi6z5e6t0in9e51ed97d7uznakp84yyveep0ax2jfxyvtnual7rc5rrq5hlkiymbzb8asy8yip5ec46fkxlehc8rcqbustid7wc8hq',
                receiverInterfaceNamespace: '3en3qdh4lq55hkmh96ggh3tt5ztgp2xpfbwvzjj2vu5k1df00ae5eir814wko306ydk8ozyooin571k8ggxk7ru8ddxhco8q57yurya0pavs2lru0s60u1muk673jp2rg3b16a2q4ltz7ysf57j58fs6wgihe7of',
                retries: 3067954594,
                size: 4454515752,
                timesFailed: 6765750513,
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
                id: 'q0r913np7n682t5lr0yl2o0ewv83bqsct2c54',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'baw86g9p4y6h2atfkcua0awxzzuogg07rup1avp0n9srv4udw3',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '10x5khkmhi8ckf4u26oc',
                scenario: 'blexdvnybmkbqchx9fe28dmwfr1x88sr1kwlz2dvy5tq9nm0mibphech523y',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:09:55',
                executionMonitoringStartAt: '2020-08-02 23:49:11',
                executionMonitoringEndAt: '2020-08-03 09:58:21',
                flowHash: 'yxxhw6z3o3liwau5hvihl2zaht52cp0vbqayrcfj',
                flowParty: '891d8douy7d79i5qom0mmn7n2hkgd27ht650bbci1hvmm20hsdt3u7pr1kmkbhq9vnvd4nan6bntxsr0tbhmy1b98wfzpixfx22n0lt2zibcomc2o7sfctrk5ujo1whb81f57pms3isgor8s0ljyhnw80gz3l0y4',
                flowComponent: 'cxyxvzhlulrw495g6cqkf9zha7zfos67of979a23jqb242t10yjtfcfst0rxrqu2yrlejuqwhdlj89ismim1yw96k1yxmpuhn4khof48djc5rky7n65mcs0dslgu42qr9uqayxxckvayvfb40fkosh7rmmht4ilr',
                flowInterfaceName: 'eq0k90oef1lfcxah1u3l2e3m1tqumstqe68qhzdn1plzsee9w607dyx1p0u5n0cs6h08znwyccecxqmzx2u1s93ox9crxage7b21cfiknfl2w4xnjf3liefn6sozdyweqazrhszktlk04vdert7f1z2qkucosnop',
                flowInterfaceNamespace: '4hycf4s9yvbhkzmupghweyysc3igdhuoa98ml7meberolgc4j51akyjqep3xn9qjo4upwxsm2nldq0svxtydhreipcp89ca1cv8nspv61kefw3imgtd66kchuq0chqtbr626yodbkxyea5e9i2xo1wl5h6fx5z2r',
                status: 'WAITING',
                detail: 'Qui culpa odit. Laborum eius aut vero pariatur ratione perspiciatis. Cum et illum eaque autem dolores repellat excepturi est quia.',
                example: '9i4g7s76rby2ad1ne7gj71fh55chut8foj3piwjkcw2rhy1uvep6sfiqsmm9ly0xyu3vqxjv03bhg6npgadxpoqvrfsnkgzmmqd2jgf95m4rz0cfjay4h9eve5hh4pv67nxe1cr1oxqwcdqhv4oqnh3nkuy1dyre',
                startTimeAt: '2020-08-02 20:25:59',
                direction: 'INBOUND',
                errorCategory: 's4p8tlrnvtcf0d7ymcfjg2820y5bpg9yvgv1mcjssc1mqkjingd1lro2fndb21k3jjxhwjiw7r57o1vi58b7uikd1wcp64kdp089n82zz6acm1vr4nv1jn5mprssttkj87bfu19mpo0bhbc92zic7rntx4g7iv8i',
                errorCode: '0gi1t13hz24tfwd48wajhmon2itq518aqlspj3t85mzrsu6gzv',
                errorLabel: 384084,
                node: 7588821149,
                protocol: '2c3puc4plfzd85z5e32p',
                qualityOfService: 'dmfynddftfb9rpy9rqp2',
                receiverParty: '8z0hnbjyfkjsyo6rcrwvn3k7z1kzqgqvivlmmrdgho18p3oe1jlrrmzea4hxzpy1ijbat8j4kscvtqxq6zmzvyrdtwfld0fvdvedu6ft154d8vhaga3gqflviihi73ejym8brnebpveg3zc24jdsaw1dimqvjxrz',
                receiverComponent: '35q5klv2j6rnoqu6379jr0i9ntwz7sp8ya64uh3foxgw59beu6ncq8b4ubzwm0sge7q3ryrreql11ybl3oalekwwdefgh1ap1wnqisxc2n4yw0kpuhbbdqdzw2cnhd9fhqhtkgdiv3wae5ajs8zk1pi307zrhj7d',
                receiverInterface: 'tyjpj6m90bci8qnoldsepbajuu60xj0tg5vxtja2z8mhdef4n2prwtakzxpwjn1mt9ptfk8dcz4yg9lpyw0o91c84emr2708alhmqgk9ey14sezh123jsiwgs7fxtuwh7t4p4gi7247eqxgncquc4gmex22wutbd',
                receiverInterfaceNamespace: 'fire0n3vhql0wbqe3c070yu9cyhs6tjo5aw8wsk6q8pwndm5ignod3jz1i16w8tvt9eq048rjkrtwabvsht87fxnflgkdyap4c65vxet6iqz4sl1mybpujwg1xuzgw244zv6bhbgs6ipkn5imk8dbtjx44304f6e',
                retries: 8367037063,
                size: 7991154915,
                timesFailed: 3519006591,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: 'rvgjok6nfcgsosub5k2awyohgzhmxw0e6zeym',
                tenantCode: 'erm4akzm3v3qqgb60h1lnka5mz4n5r4q60mxfh2r0fv3zv3y57',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'xyzxx5s6pw5qw1dmrjjr',
                scenario: 'yyc51aefzoqh3kidp5a93nijlieky6pyqazwkag1zes04mq1vz2ckdhysqic',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 03:50:55',
                executionMonitoringStartAt: '2020-08-02 19:40:32',
                executionMonitoringEndAt: '2020-08-03 12:42:36',
                flowHash: 'h10zinxpqde09jij5xacc9iyfeq5eq5bgheivdjw',
                flowParty: 'n89cmbuhkx8az6imsy747zhaj7vuis5fboneysp2wgkzwyzhtecexq82zm6e97gln56drnl7pj4w45raqmrrtfi29e62njodpi4kt0ggww40v7avue5kk7joxyvzyntc3h5fccxgtagzlb406xrzgetw4rg5s9ph',
                flowComponent: 'keq1u83cj79sz5eatqqu1kepgpyl9aekt5jzz9u7fscw9sltcq3e79z0ahcwss2ejzxr5z293u9h0srdjlwa806imsscgsle6manjol6bs2c9t8w784v5smn8300rkp4r2tj2wgoh9fq6ygsdmhnlfgbzzv7aerj',
                flowInterfaceName: 'wd1t4kg1bqszmwpkmji11zrxowbmoqbwo63fi0bl3ffslfpabzr88il2140lbp31yft80zsolliq3t2828t84msno7hlxfpzh8769h72qtoynjx413vs3kshkgkoes7kstp8ukx4vr866uq1lxhdd0zpkizxdwa4',
                flowInterfaceNamespace: 'neikn1sh63cbjgqik9drywarajg5mmb74o1da46whasarzxw062x0lxfpqb3qga0dd1zvvmvyf3tff53lkb2gl18bsd27fx4a81d2hm89b5emfc8lwrh4px8p4o67ea122rcstusfwvralci6ygqqpkidmzxo0za',
                status: 'WAITING',
                detail: 'Qui rerum ducimus fugit voluptas ipsam omnis quae nam voluptas. Nulla cum necessitatibus animi repellat incidunt numquam. Omnis quia error ut consectetur quia laudantium molestiae reiciendis ipsa. Porro doloremque unde ut.',
                example: 'klgllcpe645m4l0f0t4udy5zt91tp02svp07pn9yez1tz2u5qtl6snjm0ya262549lisxkfc091l99nhwq9ljjxztc2483fxnwsbg9g6h7pf2v15tj474icn15yjzsg6w0k6jf9kankpmxpdv8m99atehm1oe7vl',
                startTimeAt: '2020-08-03 06:02:13',
                direction: 'INBOUND',
                errorCategory: 'v9v2smyfmvgfeoch8prfffr4s02f3lx9yl7jro7cjyp562ijdb1k377mvkz5wfdgd29aegpdt7gvpy2xra4wz9kdpmm81v4h054taz9r3xkbjbgczn0qt65rpxocapkcqjc9o63sykvixtr12i5k5oe7hhunr29x',
                errorCode: 'gw823gxw1l5xmu8ekkizg2vysluna8l6qtwvuete50am7tt98j',
                errorLabel: 199154,
                node: 9169534603,
                protocol: 'q9esw8jgiiv3qcwpzjaf',
                qualityOfService: 'kdf25pkhs6x2mioh01ig',
                receiverParty: '7bwawvv4brqb7vuw5dswhq02ckzlbz1twlexfsxe215rrjj0yacetp5aq0jf9h1b6vyftiy6xgs580gp4hog2yj03odxch0ok5rlqjkdczm1pb8gsngfix9okeht4hy9pxhkg4ft4x5jkt75bdyu6q8q847zwkyo',
                receiverComponent: 'zt7ath0uu62jf3pqqbdh1rjp87xx0080s7452om84jy9e1snrnyln2msud8t3o1uudiofkm7bfzru7cuz63hx86jo15d2pm60tgdycrtxqmqywn6gxdhkv136fvwsdq1hqq5fzu3k9bkxoru8yx3j3qptxomp1uw',
                receiverInterface: 'nswjmgom228mjj9sa4gttfdezi1ziyuqaiyynys7y9ui9sp52ojsszvcgxofetrgdf7sk2x646lb8wbagjm04puvqtri6ett3iyxo2uyhovcajzx5xd310ff8s6zn0he00gjeybm96n3tr3lsuozewrt24h9gc41',
                receiverInterfaceNamespace: '4ib78z3dsh2w8g1mlmtzp4b2zmc66ucw51tfjmnkb7hen9bsjvwfxp1kqisenfknjcvnlwjcb9dezozynh7j8m2te5jit3gjtaxow9vbfy6whr8pc2r8epfk6fklywlpcbpzbchmz30u9a81gxhq6iipwosv7tfw',
                retries: 6813231331,
                size: 6005781753,
                timesFailed: 7084797706,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '1vhp9h55csnsc1ej6wywu4bvy0dph66v68jbxjkjz1xvzzq3u0',
                systemId: 'njhudmdnnjwig4hfmxn1fo7lavzgaxj7jx337',
                systemName: 'do8e0257ct2d0tdjdhn2',
                scenario: 'x9bxincri1tag5kd8q0msun3e9r4v5w9a3d8nwdv3gusqdy7phs7whh46gy2',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:36:07',
                executionMonitoringStartAt: '2020-08-03 05:45:51',
                executionMonitoringEndAt: '2020-08-03 15:06:51',
                flowHash: '8g6i693elokljf4kpsebqfj532i804uzd3lcz16l',
                flowParty: 'gwziqaxrhe8ljwbxox5op5rk91lyroijwtddgusxisyraek5slk7kx7tlctbeqzuc6gjfz9mjlq2can8kj25tasuzoh525735hr06pcrdngbblonxswfrwau9hi5855s8adg7c5azbfasyqllmogwslbej6r4a1f',
                flowComponent: 'y7rr9zv4pt6mtqcgnhf088uj2fp13rtb81w2izwxdc405pwbi9me6wazlv37uz3nylswcioq9cjf9pgnk6bhyou5jlsro4wupl5a1h7liui84hnmncz0nctuteprf1bi9dmqp28i8crmcq7bcpsrgx5u6t5bfkcv',
                flowInterfaceName: 'rqh29mliyl4i6i2iv0v7bozyo3zw07b30taq93rl68uw94i2h19fh3mhmsx5ea7wmwjse7htrgm1x43zsqukl65ltjtp4hxkfnaaj6q4ff5ic3uyhzmm1y94fczl0h1j3lp4zhf64xv41qgrbw6ohdujo1dsnvh1',
                flowInterfaceNamespace: 'ck5vkfecchuiied8kgswelnlfjlpmqstvutnmeapty3iidc6bx1e6agirtn488okrodubnb50moojg775qkbj83wg8bopksvh7b4x4ayj3dn32org63eok4rm8lqoxskxzkz1s0ugh497e36tdrjtpeda8fljfn7',
                status: 'HOLDING',
                detail: 'Error ad vitae. Quisquam dolores similique voluptates eius est omnis culpa aut. Modi ipsum maiores dicta at provident. Ut et et qui corporis praesentium temporibus. Dicta sunt aut.',
                example: 'phhk2h016v4xksstngvt743pxh693fqyf9ktkhkjp62iekn4lx718cccwnw6mc65osxzfn97pjrkep6c1g8g6tbydo57hlak31vb0gylrbjl8ys0m8u4fk9zikx5nsozq5koyv2w4llyyza1oz5eyblagz4clmzd',
                startTimeAt: '2020-08-03 03:41:28',
                direction: 'INBOUND',
                errorCategory: '83d9i1zawt7g4klf3yug4w7160th4am0fcdsmrp8iyhjnsfkvk1iftrlds1a42hgc7s1tiexrzcfwd6j9069sgxz6s8n8ad25u14pdic092hfahzbll2l4el3vfxty1jf6wds2hbo5527i4o4lyexcnqtj2fo15j',
                errorCode: 'xk4vcw0654im96a4hzlooiu9ag0hb1aj4s8xw3nuod9m7hsrhc',
                errorLabel: 929455,
                node: 9598792472,
                protocol: 'vbso7n4h64j3fc9isevi',
                qualityOfService: 'l1spsa5qvuc4n2q7m3i2',
                receiverParty: 'uj2qbbkauqjudqn00fvq3j30l0tnl2ua9avv8uv7ooce7y8yflhv9b7byg0hoj9ydpw0lusvfeyj8e5gpq0sl5f2ohmfju9u3dyfsc1dg29wtug6fln4t6ro1a43lxfvjiowebn37vafbkxf32r9gl8y3ryfw6vo',
                receiverComponent: 'z6vcrqw3nb4ap9nihnvj0nn57okkm2ya59ngpjrx0bjcg7a2utcbmvxsnd1fts2ju74qxl13c2hvn6w7wn7bv47t63apcv224opcylqvburkgs007js3fwyrk7m5c3czermnrg9ns5pa1cgjb6f6p8ll5xv1gp5v',
                receiverInterface: 'tj8u6mpeyky885gvnkboue7yhbjchw78swxjkku071dffivzx8qiq4lk020upyjznjuz4gpy3qklow3zvb01f1a9fps3j6tp9xetm3xuihsv3ptdhqz6ake5gva2cjrlwhmo09wr5kfr3j8cp1xdeuo3gfyu0z9t',
                receiverInterfaceNamespace: '9tt18e2ffoay74bgh9vjzsl0hjeb3cfji8n64lcijzizeld3fdjjjv5vap9dq9utnrekc54sajvhedx5lvreoq40wu0swzyqkd69doz5r5wqslvk2o60p63q34ndsytnt9308b50u6yqnlub0xcnvdmrvmidunhb',
                retries: 5012134533,
                size: 1406520481,
                timesFailed: 1053570654,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'm2t8se1iuyrmst3631ajo8s42bvzhbe6phayjl2zwpi1hu81xa',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'ag0jddl3qz76j9smuio7',
                scenario: 'zevdsb8yf14orxocj0xvbavc4h79pjykz53wmgxpn0apadkcdq8sld0q42kn',
                executionId: 'ss4tn0x1lu8rfvp4qlunpz7wgwdi48tqdlry7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:03:48',
                executionMonitoringStartAt: '2020-08-03 13:24:15',
                executionMonitoringEndAt: '2020-08-03 12:42:46',
                flowHash: 'ib2khup7uwitpqj91jihkaffu2nntxcexpjjkge1',
                flowParty: '4hmj9gukvlvx6v3flsn7cylfps31tg905jisy05rx62qjutgf6td2qarcuwbob04thl9hiq8fmk9235tmamzq2yp6z5o70ovnu1es2t8uo87grsoq7y6qbbs6g470sedbynug5gvt0im78uq59e39hz7qw6oqgit',
                flowComponent: 'lo8ews80gltl076b8cj7dnlkj19dibnfkownqyt5zf07aeov9ziohxeq8i94kj4nyzbe9xp27wha9pgbp1a73wnbngd5svu7uxlrd09chw1ihky721kz551qlux5h9d9j2r9qrdj88vmnrpuly3jumitsy5nbtks',
                flowInterfaceName: 'djzs0cgwslsb5pmtumqeazavk4mgyw9opw00skym34mud4h7wfrrkj58x62zavlauhj739b2r97cgo78s5lq0q713su92z0u9crg3tbr0m6mqqrm3p2fn6nf81pr5v3elsoghr81i7lkxx3j9mkx820u6y35eces',
                flowInterfaceNamespace: 'ndjvlym3cfvc23bz27ega8lkgz37m0vdqarssd9xd08b4rnfskcaw4vvlx2w6xs7o8f91atn9ur6y9eb3ac5l6qrf4j5op4us4183zzpig3dv9o2x6zrtnb4ao99fdyarb8femh59wq92rv44m2vq05gj82fy6rg',
                status: 'TO_BE_DELIVERED',
                detail: 'Dicta ratione laboriosam culpa. Et cumque voluptatem ut ut id perspiciatis. Laudantium voluptatibus ea sit. Dolorem ea consequatur qui et rem occaecati. Porro modi consequuntur tempore fuga.',
                example: 'kshfo2jltof1r2w2ivdqlcxvehv6aow009v2yqxgq08nl5ow4r06ecztz7fmowkzjc7orr0cjvcsliv9773ipuhp13hhljb0tg6r2ai8moyv5bl8w61tg2sdnzb3i2o6dxwg3imet9nt9n35v02vdf1ev2ximpw2',
                startTimeAt: '2020-08-03 03:16:43',
                direction: 'INBOUND',
                errorCategory: 'u8fuz5ko5w89fora7htt234pt3ixiltrvd6igf5tj244w39j5jktbsifjx6auq233kwqrujja6jp5d58l92wpceam4i08j5pf0sdi01y408ziuzhg5etnv6oet7p7e7ff0bvufnnbclzprg8v1t1k82fztw9e7sh',
                errorCode: 'i5kdfl2a059mhxto0fbamacpvaw5sfdaj4pxnfhgk50vqruu97',
                errorLabel: 844152,
                node: 2031344123,
                protocol: 'duhlrcdcsn4vjguau4np',
                qualityOfService: 'pp2af6gz546t9vcec8oe',
                receiverParty: 'guvmix42mhrz2v5rmfpo0es22qezbqycu6gghs23r1fsdttvjtrsjcva76mrdebxihu2fdp8xi6vffvuljmehrlarg7e5c17pp03kfm7svj8y1quarneyp51nzn29ws6bgy3y4u185zun6x106ens4tm1kqy432j',
                receiverComponent: '97ig8lr80lec0bmm1s298650u4m8qabj6damwb2md9i59y3yk5ww2x5ompncgp4ef1wpixnyy0erdvu4o5gc5vxgf7oehunkzlltzjecpgm0aklvg54uk8cejv5lapp3vb2ibc6v8fb79pl82hrh8ylq4rjquizr',
                receiverInterface: '9kecyxp5uspgag39ra5338fjcrbl2p7j58vj4ao2tc5su1sfmk9h7cex735dl2j39eo0izbhmbagdjynq0k64u0x4nilpej1exnmuiwj4a5b13wu3flf6chj9dmqobkbhezl0y29k7xw6k8xjv0spq44en0cgbqp',
                receiverInterfaceNamespace: 'nr8yoeea5jnrtk0sjti4pdad0bkjzejdwn2bcpu2k68gxw6gtxktm7oc3cqd608o272lgpp6x7hyzx72krl51m85xsinhvfrtn3fkilcc8iek9gt6r7oqt19akbm9nzbhpboggvazuo4v2abqh57wbrwtx6rvhio',
                retries: 5641765789,
                size: 7160384167,
                timesFailed: 7138892495,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'c8x7ht43sh72z61nlfan30u4ndrv0ioq78rnogdyupnh3on9ud',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '6xdn220fb7r18oe7i8ml',
                scenario: 'p68rp4m4w2exx5x7f3q18ds9jr3pamvm7mdd7ly8gxlay30zq671or7zomml',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 11:34:39',
                executionMonitoringStartAt: '2020-08-03 04:31:51',
                executionMonitoringEndAt: '2020-08-03 10:43:28',
                flowHash: 'egm3h5y44zp1hidq0ll5z0j8t0kbxe9liuyibsuox',
                flowParty: 'afwzn0xsgzncljw04368ehx05fw26e8t8gv78z8ws0vx6lsog3mr4nsykafkq3tz78jwyefv0univw1tao7xwtu0ctnqpndeqtg325lvqjdt9p6oonnv0f6ctz3hf2dv7cjtek4gc39ww8f3ero79m5ogty90qj9',
                flowComponent: 'lukfotl3nlmcx7s6jz4ww97g6ixagr77quqb7lcyi0itxltqyeogc29rxtzatr67tw2cfk6f2sf4swp32i9vclkehxeh8ibqbw1kdlsxvety8ji7031pn4omjmot3ljo96q7v98999ltutv3omfjxxasz4oigz78',
                flowInterfaceName: 'w335xhd6a38vym2ybdoy106f31uq532k09elimnklmtruxu6rqsb5ornh1m4bwd5v6t8ey16ur7tsf3qbni8bsqa0lby2ldot4zb7ye9zigpdq1m8metjmzojxcr95gw38qd44ei3pw4gpd8v6errzkbotvb6rg8',
                flowInterfaceNamespace: 'wlb7qhhp2emc5zwe2a30afgxg5va6aeqvr7gkbckwylj6usrjt6qz7gipey85oqd8viti43e9i1yhd02ao7nlkg3wkisl7ukim9525k7he70hraiocmn1jm1cek0kr2js9y501sa6bs6twl50p8iv1tgfnt2slfu',
                status: 'SUCCESS',
                detail: 'Dolores omnis et minima corporis nulla illo quibusdam est. Nesciunt voluptatem quo soluta rem hic ipsam ullam. Non id tempora facilis enim consectetur facilis quibusdam exercitationem blanditiis. Qui quas mollitia vitae ut nisi autem voluptatum maxime ad. Et voluptatem eaque et ut sed.',
                example: '3ydliz85vfve58lbzyxwx6am4lr10o3ntie3qroanj8yhw7p4bdm6ksovqe7uguoawg4spvx7krmep617dgi46bqv3g6e3q1ju5cxsfsus4gff387bv35hervzrg9lpitqgnnd1cgbszzsxjuq50f4tdcccz6280',
                startTimeAt: '2020-08-03 09:22:43',
                direction: 'INBOUND',
                errorCategory: '9h813km4787cto34u5eujlj3inwx307z4f4ghkifn2rya77ompfw9n1dv9f6t1teue2p0c5krf14ddbvrmyu8qa686lycyx9wuna98janon2njunxpe7rgbhlj16wigvziq1vbv9eyrmec15ejaksof01scp1abd',
                errorCode: '8laoen9whlq0hy9lanupw0eg00t4td1fcb3pv7ckptvwgrotvo',
                errorLabel: 871116,
                node: 1570586987,
                protocol: 'zy5pwftgebo2asyoztxt',
                qualityOfService: '1h1i5plj4w0ni5apx50l',
                receiverParty: 'mt9t4r9ye7e077k8zhmu9pkrwcz3ykt5xqipu2nf1i332ytmlli16zgoeaq19lumucsm27ypzr25srnzy6bnckoeahv1j71gkjfc0t5dh3hmq8f8ucvlbzy11pv67gq3i4sura78fx05i491dx9ma8v1t5nshb4u',
                receiverComponent: 'gpuk4ahtpq0p0bhvus9pxeuje821e15ejdxzwj3kbugbpwsb0n6llmjl48s116509afh7haaud3ndo6f0i52wzx1sx9eixtbgdp43usrulkf47p7b2vkmdt2vbi6vlfyxn7j3ldf0lwmp3rfspt42e1jhropert7',
                receiverInterface: 'nugkxaongqabgnmedhxirc3e9xokzuvc2uphrl9qxmxxgkyle7uxk1z1yjkr91dk3i5lfde6mn2pnk1plfq00sos1rfr93w69uu7pbddxs628t3gespg2pbozyyd7auqz3k8q2s5ax882kki96ymc9o9pg0m8fji',
                receiverInterfaceNamespace: 'ic16g5jqzpgn5gawma1ihadkzp2w53ul6hnytzqzw8creswx37e0qtz3a9yjvq7sfutkzx29emp8fsax1xdz8enow47pq5cnpvkn2coagmtke99ppks35qy12lkat5gk9dauc7oqdif6qldd07hvfyb6retvnadk',
                retries: 2276525426,
                size: 1352403902,
                timesFailed: 8369480847,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'w3kpgfkmry3ig5u8ib2za1h9s1je0bksi5j7l05w1icckfu1f0c',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '058jf4xoeg3fap5pkllr',
                scenario: 'lvzlrut2us23fle1v1k9vaq4t22fjs9ps4oq13afx28cq2v08239d98v3qro',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:52:20',
                executionMonitoringStartAt: '2020-08-02 22:52:18',
                executionMonitoringEndAt: '2020-08-03 16:24:23',
                flowHash: 'e4f0imqvdlofxqehfhl8sg25kpgpb8yzg0cmawx8',
                flowParty: 'qmza9cg4yhofnb8as80gt12xworozxi28flinl83tsnklwn6l01jw9o0svvwl5a6e4pusri3t22ashoe1246vdtmo24gaa08f5olfsn7qxjblahkzeked9z0fso36u3ic72wnc92iqisqz7w1gfne9yxqi4cg822',
                flowComponent: '9ysz2iu900a190ei2hrjogprckfw7el9n281tdmm6hlskqce44gt1wh9e6ytwb28rnbz7e91zhvpk0i91kv0fvj2oooi3m497fhzjii7gxe9xrjzqeyqjx5k1kokgrvd8g2htznvyk4btwmgfl1fndz9ro2x72sf',
                flowInterfaceName: '4b0gcjw60rtquf2fxu2wbtttt2y8mpy5f78c7w70e2flfh3yty2p363nu9angogp1nau11dl1h8krogvs5bknhfr7m9ydahl855n4mx6k552dcsueiopkslug2cxu2ubf04b0usrcytmezwus9y5xsndlg29d7zl',
                flowInterfaceNamespace: 'qrdia3ijmtdzjw6hqrahqf27v0zs1rqgro14ewzra4uj7bvocxnenuh57b4d62ilp7zk0of5oukvn2pn5cxf3212exgjeyvm9l0xsx3tz4qr8tkeshxnp5e512xdg1fcju3126j6lwt91860r9iyair6k3ab0evm',
                status: 'CANCELLED',
                detail: 'Suscipit occaecati quasi. Error ipsum sint dicta voluptates error totam dicta distinctio sunt. Molestiae id et a et possimus. Velit officia nihil et consequuntur. Enim et expedita voluptatem necessitatibus quaerat.',
                example: 'puaunjxvoyugmyyo9xbv3hhx9fpga2ojlk2bysqn6kr6dg0ovmoh3qbc86mvo5bnsshf5dx33auqjoznzyw8bzks7zkqzftvwus63sofnu443xf5i77vkout32ararkbamm8cskfs2gyeezov4xa18ja5udgcle6',
                startTimeAt: '2020-08-02 20:32:00',
                direction: 'OUTBOUND',
                errorCategory: 'cv635v13v5srb78rtfwtr1g1bzv8k4tum7mqg4jjudb51ct9h4ywnumqwbvq8xv1zuf9ab9r0egrm7nv2ocjd9gjozxp1wx6qeecrtkqbtc8p94avk0ys0ouuuxel82spaor9u2bdqipbdhl1zkhkjgllajiu77t',
                errorCode: 's2l10fqykt3habvv0yb8k5x9czky3zfdgnieos8j32ij919q2c',
                errorLabel: 823850,
                node: 5242262161,
                protocol: 'kpvj4u74w2et7ijmeuwn',
                qualityOfService: 'vortc3o05b3w1r36mcs0',
                receiverParty: 's3azgaza4b5cxm1g5hsuq8zhkhdvnmzx2pqp0um9l05vdg9412l9wa690qrch6ve1mfq7j6kevvi5to7b7tcp6gg3xwcxgm82x3gwebpoelaha597n9c0r8k5ofqcusl4mp05sbakw7rku4858rz8azydnz6nmbv',
                receiverComponent: '9kk0opsjozdf2gq0x3l1yk8wvnt5q8fja8qbqnvpage61w4vbp4we6y2tdzqt4id1x0mdqhfcer8yk8u70ftczoq981cbzyqdjibt70bsmkd8wnuvoadk4mvnpwsz8qaqlzolpfxl81mnswf9o37407vqauv6ggo',
                receiverInterface: '4zkg4f03jffvjj0mqe96ze75dx3mroetf0zxkpq3y9068fcwty332srpyysba94v1y1puoxo3ys2hz8xrq5zrk0xs9j767h92wgqnix9cpws1f2wxo9ujva8hwyf1pa5e245414qt1opjwexdnx0opg0wbli784j',
                receiverInterfaceNamespace: 'zyl1iptsgwqk4ny8jq2wpa3yyjaledg6z9gdt0wy946orxuqt4l63an140bpzctnptohkia77gg21r43gqjo1kw167ej923q80pl8nqegqo12sjni00rg4xcmq68a70hbs2ir36ow0tc7xcwjlwvf86rmperqfq8',
                retries: 6001295456,
                size: 3216482889,
                timesFailed: 3605226377,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'dsstjw44cx10lzy9ucwahlhbrqd7pqtn342fbs2e9mzl39ezxw',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'mh3ypbkvbh8krnbv7e5g3',
                scenario: 'jmdjy475xxpbsbnr4dy22wl7kseke5luj3q3bipyfo7bj95h1hjil8a70a3q',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:29:33',
                executionMonitoringStartAt: '2020-08-02 22:25:59',
                executionMonitoringEndAt: '2020-08-03 13:34:14',
                flowHash: 'swpxfkyfy3ek8dk98xtd704xt5pueg7um4h6ag90',
                flowParty: 'ganf4oezul5hgpuf9rjd4r6pwfi6wtxnuegbhwrg39l7zummpc4ppxfg0fej2z56u7ca2hxfapukqea0xuk9rfvrmjkhlv8mystag55pl6hd10xs2gtdoujffy7cvv0s6y2xmj3r91nn1ep8n4hlhrejpz4f98uc',
                flowComponent: 'ag0m6z8c1k2a2aug419kv2s7yktpigq7zgkibh302kztx6t32f0p7iifrdrpqqjvqq30pygovtgvb75i9ggxijpuiq2plcvbuudmirb1ot97d0qnn57ss9mh9ec8gbglzwapufpbegm7bprfhcjwmn1kj8cr77jf',
                flowInterfaceName: 'aaapag6iwczmjsxgw03av5elc1pdvedg2rr55zmll6fvut07ecsmghnntbv2l5cq2xyzdu4m4lzg8pgscghc8ddqaqkhq49pqo753rrrjinu09wpv160mp50ngvhcjkhoqz6k4ufzaucv5v7iv3w0swxu2gcgw2r',
                flowInterfaceNamespace: 'tuskno0ku6vxa48i595th6foh9xlmlcgjm9cip1fri15lbr9hmto9wc6qhqoxzbzw1v5099686jbq3pd9nxsrv199dp00p1sckgjyg6pqdydxdrqjd9wsu6m1gmxfm1zhkfpzfed7oze0ok6w7j43ctlcb01gkhc',
                status: 'WAITING',
                detail: 'Illum numquam deserunt reprehenderit reprehenderit ut est est est consequatur. Deserunt nemo ut. Illum eius quia incidunt inventore. Culpa aut aut ea earum illum corrupti sunt distinctio. Nobis animi consequuntur similique qui dolores quia quasi.',
                example: 'i7oxyquvc0u1nyix8wid69fgvzp0zxa1t5lcxm0bsyquzgcp4osa3yieul1zth32jzkz9k15wviytkaiijaq92rfdnnj6ma5afb8mxakik8blm2bmqkekni3s4zizsqed2r5g6srm14cfe9oaz3dv51qyv894gym',
                startTimeAt: '2020-08-03 09:53:40',
                direction: 'INBOUND',
                errorCategory: 'gkbwye4pmfats23ism1zlpbw0o58l7oedgvjjlhuxbzdljvk49unxf1900j92pyp22a8u5164y562476e2gu0oolh3g210mnxp5j3s7x5st67g9pkqkroi13rawoaqpc1yzh4qnyzj1w6hhn51173kkedffh1fht',
                errorCode: 'mu03u9r68wrks3qcumwmpli6qrcqlj60t7fb33m9fuj0sgcs9u',
                errorLabel: 716189,
                node: 6901896188,
                protocol: 'sgeyvcd9lch1llpb367y',
                qualityOfService: '5x1ym5hsm8oni72hfp9n',
                receiverParty: 'ax3eo10n4xcx1jxgafc7ks7apcr7jdxv0s6vl8f57lti6mot5yyq4cmyycxoc59laf46avyfen5qw6mearf2ylc80m2yz80fwf7htyluclj84e9uhjb0ncyftllasy3n4ylwd9fs6o1hyo0hc835pdycwkqmme82',
                receiverComponent: 'evz60kd5wtbvpqexiimq0gi4lhilnr7sa5cu4o4jn3mt4cfbcx8muy5h6up0dp3th97d0hr3xucs2nw8wjqaoii4hyjkf65wndndt0g6xesro4w79rt0y2lhr8procjwfu8jnqct2jp5p63ze6hvhnm3kz16amus',
                receiverInterface: 'w0ouexqv6l2wbexiqjlm7fkfu5i364g6cd97nq6j17uj7ym1jvvka5nl4864jppn4nzha64i4ptad3fqyany54cmjnveee26ucqa3cd48spkrmli0xoime7w5pn1q3ckey67u5uw42uj2hvnwqrrsnxzjdineojz',
                receiverInterfaceNamespace: 'dhzz3h6j94tw43b4q7ibj2vdkcl1wqjclbm4qhnyanxk3rfnai51qy1f503l78q0u44uu79txc0gdaep1sqwc2qc5j6sdpi735wnx0dgqs613ojvbg24pt0xoykebkmldn3ehp6sp2ulled0mgjmg1d6nbm6btjn',
                retries: 8857610531,
                size: 4009879662,
                timesFailed: 1137210589,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '6vk2le8yfqug7mn2mz1nyz2wqv9k91r4mfdyroat4rocnr9c8s',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'ih0h0xp3kq0awi2phd3s',
                scenario: '1eknr3r06m3tufj0h0hbwgl95me6in0ehf7tsbzdx6y953fwuqo4bivoctn6n',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:10:33',
                executionMonitoringStartAt: '2020-08-02 23:22:32',
                executionMonitoringEndAt: '2020-08-03 07:49:12',
                flowHash: 'shfqrql3ir11bc3fboade9rndgndepuxaoc2dr2s',
                flowParty: 'dscwxwx8l47dadvbpftix7doa0ggksf4mbgyh3664dkw2fjmv2vajspsy1aqyexaqckeh42cuixfg5zxl9zn9vxg89y9xw02ifxd95oczcdsz2913rwqpm8ic66t1qtq7fc9t71xkhykwc61uflsajfkoa9idrd5',
                flowComponent: 'rxig489lpdwn75ajcu4iuwmixhokgy8qq9pgkjn8oefowk1tzepz0cpz5j8v4qouqf4z8t3ylclsidkcd46f8v6p247ycahzhhvd8dwntqay7w45xdvxbv7ejfijxdzqzxiadoel2x4ef201gw0x8w36kciu6580',
                flowInterfaceName: 'e13vedkxl6ew8x77kfflog8xr3mzt9zbiiulgfxrmrfyimjntqtipxcriev4mxbfv3xwy8xei7a53ck006vkigbzelw0aq41jg9b7ltq1fmsrclk0ufqvhxrj2fcchwoqr3w1m6w630c0slz779ihu5zmuoc2ao3',
                flowInterfaceNamespace: 'udwsj2xalos7xonq430v8xim4ocb6bdcxo6o7sbgcxvifsu3b33e9h8yqvorug8h11xe40nm6okqe6u4j7e0f1fwzy7t3qgb1duv068qmiezlxudtl412qxsv8rpdxkonssxzs23nyr9uzw286jwgmbkj5l2l574',
                status: 'SUCCESS',
                detail: 'Quo perspiciatis ipsam adipisci laborum mollitia odio magni. Sed ut incidunt exercitationem nulla velit voluptas provident. Quidem natus quis dolores aliquid. Doloremque nihil et qui cupiditate vitae. Unde modi ab nihil natus maiores eligendi ratione. Impedit dolor quo quos exercitationem perspiciatis qui magni.',
                example: 'zfrj3bvoafs6zsbqh7p5wusspudwldbgni7wqplwhsxf3s2rzm0y7gal83hw79gwemtx3uryjsyvs398rswpidm0pp6h2pcedaxip7pg8tvjrvum89hdykvwgyhwdezb5vs7lijzl0jhyrhh8zr61beagqeq7hl7',
                startTimeAt: '2020-08-03 12:33:20',
                direction: 'OUTBOUND',
                errorCategory: 'ho834acgumborww5ill67rkrs15w8yewjxer5qc8u064ug1mak9cjjbnolebj6k083o6q62tnl0tconoy2xijmlys72zgi44ckhrvkuecptoezxkkdhsm0rtht1y1l5weudhhbu8a3kgmnd29ktaywh204z7slpr',
                errorCode: '2jr9nbpzd4sk97p7aopvl4sti99h5s9i7dxz8cm0dnuxhkpi7h',
                errorLabel: 881033,
                node: 8450120369,
                protocol: '9dy7w1wff65ath0dp619',
                qualityOfService: '4b3239co3rmyczto0chb',
                receiverParty: 'dxvyuwicf79tser80nbng3m2u6krg1lytdftnlf86io3dhrm9veujulqf0fh7f6uz2bfaaz2mlmo2m3febd3be2q8ijst4agzg6juwaytdbmthqq2f8ff3u8ck9d9t3nrtg6oqfded4y2eawihy4odxgmf9gd8dv',
                receiverComponent: 'cu5ikv7jzoit9fq9blh48tmkv8dqmovif5bhim9e671tmfdm1q0krii3vapiws5734v24woec0dqxtclg04pmno8ko0pnn1pq8we2lsjb0uhf60xeewbdurzzemup2sn1wi6xi151d6yaudbi6w33157cjp4ejuz',
                receiverInterface: '9lhvru60o87rax484frcz2qkq9ss5ilqocqd316yzoi2ll28kz3e68u1q4fee1qwd6cq36yz4mcjhh0gy2ek580dln89ndn0ler9uxvgp5ohdcyizgkc0dazyd5xkhs3tsji0d7432qbuldpf7ypnkxf65eqctlg',
                receiverInterfaceNamespace: 'fs0mr63qldx404gf2te7767eruslea5ohm7q7xc638be9wcpd99lsh3g8r32ed4asy8c5wq1inn562oxba1utu6ro4w3arbhvs8gw81wy7lc0pj2857cebl96uw82vvoamv67x3ifxjzsyk3l4bajvtsok8xq6np',
                retries: 1708313573,
                size: 4690676350,
                timesFailed: 2518604885,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'pnxq1a8ydhb8cy0bmmjhuyam6h1aexl1ttbgxt6c9zy5m14bti',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '1lvf878itjor5ltmnilw',
                scenario: 'e7587ucnwn3ersh8frczqwrvtxg2fk0zn4bgzna1x17732gstxtj57e9ec8w',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:59:15',
                executionMonitoringStartAt: '2020-08-03 05:10:40',
                executionMonitoringEndAt: '2020-08-02 20:51:03',
                flowHash: '3a2ltnf46ky0cmcn1jtq726eiw38syu3j0fyrdbp',
                flowParty: 'plsx3hti79g34ovyrumd43ih7kq3qfp5m3za97qdjziowz5mw8v86841t8m7dvpfhrkuoy6eff27pcb0dxerqsbfvzamozlxx8fpeoc42t8lqn94iuoooe445ory5k6ehyurlzicfp1nrld9i0enq8rozvnacive0',
                flowComponent: 'brkad9pa878dlnr4bd9hwjgj96eii3boejfejbep5nzr782j02g4d1npxb67q0jcae1dpl0yywg30jmzkuh0ef8hpi8ez8cu991gix4y6y2xbo1rqn4r1u2e9mzn67yy4zkahbe7dejmttftnqtpmqkjntamovrp',
                flowInterfaceName: 'kzm7g40g3acpehyowtfqw3s1wdky7a1ae3k0mi64vfapnr6brz2otmocfvuna928d1hxrnt8e3efusbro2wri4q2au4ho3nvrnbbuhmgyi1y56u0rwn61cy1to5pc7fu4iyxqs2a2udc77vx83nzg3hjgzqsvrhd',
                flowInterfaceNamespace: 'drkbfnufkpspm6vujbo5mn7dyq7umlgd95a5w2wb7lozd4eg7dbxdngirzjs5x43grfsignabj9t4mzjew9pznuk2hgp38c20jgp69xc4lk3ksw0fssgi0se3iblgndeczeunny38i6ioi888exewgn3jl71nad6',
                status: 'DELIVERING',
                detail: 'Consequatur vero rem unde vel similique at voluptatem aspernatur sed. Omnis non quia eos velit consequatur exercitationem veniam eligendi. Nulla beatae sed. Ratione odit ex aperiam vel consequuntur aut saepe beatae sequi. In ullam facere.',
                example: 'c2s1w8icjvfnqwkp9yzhomdcdwgieq7madbbl1q6li8tafbi7adzuijly3n7h8n8v35k8qdas08fl145k6zwr554jf8eudq4vb1quanvbnbho1tuef222oti23u3pqvv0632e2f3r8l73qye20b6zibzgbpw4x9v',
                startTimeAt: '2020-08-03 11:57:11',
                direction: 'INBOUND',
                errorCategory: 'n006suuavse06p1nnaqui0t5vnklkrs549dgdtx8nt6pxsckd27wj2s4ufbe6hn3x8e05polx568yqsxp257lqbfy2rth29t3ysxcv8px3cyjc764hpssmsum3tzd59mbq5z2b1az42xnm3dbomfmnk5d9lsytx9',
                errorCode: 'fymsw7s6vxaxn03ydnm17rmq4fi11qvn19uqec7mo87121igkx',
                errorLabel: 866336,
                node: 9049677585,
                protocol: 'wdc28zxij7xsy67kvvm4',
                qualityOfService: 'mqx980fgd1mr4j14hazo',
                receiverParty: 'j5nnte7qnx064hitiwut43o68i123av1s016y8gqrkoyf62xnl0fw5z8dpr81gh4d0wr83jaa3amu5deltwjbibisw80m1friwl7rwqxl0uwturqip24qggsmqejf10gpw7194xvfij81xeyv70vu1ig94pswvp3',
                receiverComponent: 'dof6btxyentc0xchxepr0nb79w1nsjbooodddkdso1s9wke6kuw37vivtinsukcdwbqrd1a46iusuaenbdzeqllhwz4jod3madwsi4u4x7nt6f1e075lox83tsz7x414pyuqqxlp03ok656r2qo8hhvhsj5owlrd',
                receiverInterface: 'tyik6wcitzhl95yqn4bepp5gl947i33s929g3kyudnw7o38dz5h4bw4gpsjky2seudjcsp396upjjvv37pgz4b1p1w3yb76ocm7nn42kulcpuwmngzqbwd9vq1cibx7lo7idf643bs908m39xn79hengy9y13fr9',
                receiverInterfaceNamespace: '638f8fvuio8j5rkedioperfbyyu74gnelst1qf1a74wsjf96pi871d6j7f1r366fo04bvsszs40y3dv3kd0cud3c6kst37lsex3g7m9bt1hsjfng71di4ezkng65kdh6xwjhldbu5r07bx7xw897mqkuqurc6hjx',
                retries: 3755290037,
                size: 1088064064,
                timesFailed: 4543912817,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'l5j0jpb1rid7bjn17lvz8oxhdglrg96ctv5knel1s2rtuw7wvs',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'advicljzx61wpqc34bb5',
                scenario: '1yyguwtx9wvdsfqe737yqd00gls9e9jhn1zm03swujxu61s4n5t435h8d5pu',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:47:15',
                executionMonitoringStartAt: '2020-08-03 04:43:44',
                executionMonitoringEndAt: '2020-08-03 04:16:30',
                flowHash: 'phw2c2m0x22bbh63ux37c3614qtuxx3h2cqzm9rx',
                flowParty: 'z30h6b31k0n12mmm7oeu0gs4xmgdst2het1r6ytaz69nz96t6mjpfon0xh2sxn103po8sxc16gthk3slckhk5vujsfumqfpa9zogkioy5phur2ygo1vuhbevpsdvc9suijcjk6w9he39ap2mp4bple1u1hnka1oh',
                flowComponent: '5sis7mpr81rzfhfs0j3plwyks9y0z27qr1kcgh4dewl5qw6qm0mep65tvb70lofq134f0eqxfh60fr0z09kuknuw3c8ab8s9qz3bvszftge0e7wxaesuginkaxljyptanb2t9j4fhv1io6s6m5l5jimawldekfkvu',
                flowInterfaceName: 'zg82oepsw0ocixyre8xv8o9gqahke9uhayyythoz5hxzwxumv8b2ae1i56vt8ekbjcjgdqfnhuo4l4pk6yuc1d5ii41fusa410r68ezctu58uduwuibav3aeon84ft15peowpzoo60pyj299sg1akr00xz5x3rec',
                flowInterfaceNamespace: 'rf3dpc4ta6e24ls9lj0zdihfkyvmn32611x7txeh39n7laeleaegmdyxa5uo7a90l2o8jzoea372nfkayk4xii9bln4o9351ysj979vbifw34f5t6bdttzvbqmszrg5t8eixugpyg5fpa9bp8qt4pxjpbxl370ih',
                status: 'HOLDING',
                detail: 'Ducimus tempora veniam ratione. Eaque qui aut. Reiciendis aperiam qui dolor molestiae non et beatae esse ut.',
                example: 'wykfxmmg1onftb6ardff7sllckye8f6us46j3pq52o1eg5j9g68fzidl7ijponipodpyw5l14wix4zjh09y6l5htfj46tfzvcsu0phz1rb3wjzyt5e3pardsq0sbguhv1m2gfi81ynpoyw3h58jamqsnvoir5syz',
                startTimeAt: '2020-08-02 23:21:19',
                direction: 'OUTBOUND',
                errorCategory: 'v0e4b3fk3d0elorgw53g8a5n4npnxvwlalykszww2jupvhein16mfnbdxvv0e63kwusrgjhaftnbh10kcsj442rqd6vyqjm7ls4hu25o1bzebkjro1fq23tun1knd6446frrgwxqug8x6tkuqi7ijcfhsvv6wdit',
                errorCode: 'umrppqb716r2m10yigrr6wq1h2wgr2ukqy9jxa3q6a41d39nww',
                errorLabel: 930937,
                node: 5007091181,
                protocol: 'ux0pealx3ypbgjq97txz',
                qualityOfService: '8jlc9pkexvs7zlsp56f6',
                receiverParty: 'jae6x7vupzni6jjh0yploy5fqalv8rv11uggqczqqhhqsxao3q69gckeb6aa6z02lfvwj4hkx81b4keefiej4s4kyond11b664c8k2fuwuy2x5vk5bo0r747xyvgp0jm24z8ajc0vjha8um7sdpwe7ymi9inrj1r',
                receiverComponent: '0xvac4530ji71eg2ioe8j5v7g20la13k2ljd8bclnl1bcm025szm8qvqq1p446fe3bmy3acy06le55utnj8ncnqjhq0i7bzkaelxddqvrb0i9lb5me5moaar9n0ay7nzhjqpkms1pb9hhovpwx50igrxi39wm9j1',
                receiverInterface: 'zcgc59wei0odc02yn10s5n26xaikcey7fro31ld6k2unsl6rf32zls7n2tuwyl7bjsljsqo64p7uxno3wcctgi62tii25k0sl1p4m9kxb0mgo7j44ar17u85ftfq8rclwmzlnkki525xcpww824jwawnmibaerp0',
                receiverInterfaceNamespace: 'vi1s8dob9sra2czpebgdbyeaqe1jbroms6c0epeu9i4n3pjpgjna45pkqqbenpkyuqdok61owev0iongcr0orwv8zi8illyeqqbtwebx0bspbacl4e1tmiea4gue5hx3yh1r2oj9vo33rsjb3tktehxsi989lne1',
                retries: 4022361164,
                size: 7696315697,
                timesFailed: 9430285948,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ad8iios33hmzvjp2ufxrlgewzwa3xxqbk2fzch41xyf4jmmxim',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'bmncqu7if8fepqtcktep',
                scenario: 'pfhwq3df09hgsucywygb8d0azzoa536jlw1y9mmy5w023zcp30m1dokctqdy',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:08:11',
                executionMonitoringStartAt: '2020-08-03 04:10:30',
                executionMonitoringEndAt: '2020-08-02 23:27:42',
                flowHash: '2zxsoygk2niy7y7e1yo3c60bjtodc4tm3gopht6e',
                flowParty: 'x6kmpssv2jkkcq41gq0q4zlnhff2gqo312ojwn709003op920q2ljinngyzuoan43fbjuimljzj7c5a797umj4b3fbwcy77f4qq839z6xz93m2b8d37qg293c88dlktjveoxtd0z5mksx1dtqoshs1sr4fi38pm0',
                flowComponent: 'totubx9b2qf5smssgyf3blo8o3n3gw124b6ib8ylsupltwcys34rz6usld4t3zkypbcffo0ifwvblo1ovbw1e8mmqigcxg5rkxd4xyrgnkrag62s1z2gh7wh2v4tuqp9au8et9e3oggptmpcbtqecaftxfmolrio',
                flowInterfaceName: '4c64f1z362xyhmkblyqloaxa9g40ah6muc2apx2yjqurtfacy9nr9r1pijahxxpqid35lzdmd01jbmj2liwdmy2uyfa46dt10y8m8lbj9cwe4ommf86nbqiv4k3g326t0mix8v0hr5icr76gdpdskdwhcj5fwnrkm',
                flowInterfaceNamespace: 'nhajg951vmhpm8brkmb1aksbtxrjvtummdken96cjjeo65w6og7fp4rtyvkqawqq6y0qsxx7fphekin5au2b05vn926m0o2naylha44oz2d90kh8bmax6uzopkfrxyncvrsx4eiub2rylrkm7bq22ktef6q7b9ew',
                status: 'TO_BE_DELIVERED',
                detail: 'Exercitationem vitae ratione enim. Voluptatem reprehenderit magni. Aut ratione quod architecto est neque inventore deleniti sunt. Velit dolores fugiat nesciunt sequi et. Voluptatum quaerat cupiditate minus. Optio iure cum doloremque et sit rerum recusandae amet.',
                example: 'b95npqsd3mflcwqsp2yu68mori8abzg6j0u6i5pdi2pyyinx3zkxkvn1medhay52ro4t9y36kzbmwmkbogse663pv96z7zjz6mtciydq8kemalgo2hsop2w8ruq95u5cbc05bwnvr1engme9jlmsuj6hdk9yszkr',
                startTimeAt: '2020-08-03 09:03:06',
                direction: 'OUTBOUND',
                errorCategory: 'iok6lb2z0ss3ixehqc24uxgqmp4qhgqiryzie827xs9sx9csp9w2rsz33sz4lxbpd35yk6xciodxmspl8j6x1xoyhofy7nt6cf3tydysb6k1x6u60lmcntn4rtdbor9scb6jtdu3q9f9prz8ai71vwgvs5a1gsr4',
                errorCode: 'w2uazfbe029xv7lidpwkr28837osmgqhv2fm56nk270674rb2i',
                errorLabel: 294284,
                node: 6777565515,
                protocol: '02b2vyll5rhf5qotj4s0',
                qualityOfService: '4twzcp01ojl6i2y4ewoa',
                receiverParty: 'ffx1txjhmxy0kxqh6edeapbryi5vmba8idlvdbyszeqohs3d7kanu8rdnv9io3e4rtodmqanckq8awhctizs4d7ewmw1h6k8ig8vuzsbusdgaaihkgd4k64uz5aqfz65tbbfwc7pckzes9e2zw0cj6j1kzrj2hr7',
                receiverComponent: 'nkn8fl5vxtq4u07737gykuj1qap2qykvjcd3ca5tb4313klsw6xc9wdtkiz60bjb145fspir4jmcuxxwizbder8reyb8bddfg3llxczx5lilhco39flyc2runtrfq762yzbv5rb05dehc3vuoxrh5m2yekulxlto',
                receiverInterface: '914fv48mu6fcqv9kscrj7o07w69beeb4g1z4lo7cav0j9a6zs9a6sj3fu3eoejhg2otp65gqhah94hi1ghv6gw9a1vy8dzn10x8l24mt3nd4o87ul0p9iftqnppmy8ivgq5zh9jxwziv5qeca37pkyagr6ppheva',
                receiverInterfaceNamespace: '2red02h0jflvbnbua6g99srctsydq4qtaum8axo7qx1pjvdnasm5ujnxtqk2ljvpcf0y4i1o3fy6x26pe1sl68h60e899f1yazq40ycgcu2paltg35x12a65i7twqu9kjcq23m2c5yhumqkzcdnlgwvhqv8dyw95',
                retries: 7193509368,
                size: 8643902803,
                timesFailed: 6303325889,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 's3v2nszcnspr41jbcisq8x9q67eyh4lv49kt7ew4lyjosfbyp0',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'ovek378gtimhebg7f3xk',
                scenario: 'p603r5hx2ilzj596igbcf4qzz8ah6adlvfjyavait8ujftqh3m51cymdii0l',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 11:53:11',
                executionMonitoringStartAt: '2020-08-02 23:55:46',
                executionMonitoringEndAt: '2020-08-03 17:46:58',
                flowHash: 'njmthvabzkuqv1bd68xkp0jnkfobmjwolog0r36d',
                flowParty: '22qudvplufv9tj84f8w74n1k29zl3mrx8co5m8ab0o98d8xxpm5oahwtwil83flk7slow0wr8w1s955i5lynk7jw7e4jmnskqt2sxnxdxxkrv4bm8l4lu4w6nak14vvmwckl8fcu9wnh2bpa0x91r9i5xmm94iyu',
                flowComponent: 'mo7v6x3xbguhso6lphb97iso01po7vmiuc1hk6b77pc1u4yfjkrav5io8pwtny61sg549ify2ro9e2s1mf8a5ze66f9m0mpd2gggduabfa5qdw3e2ji0a959n71wzki0vvyo9u2x0h8f4two1t96ngac27657n1w',
                flowInterfaceName: 'g9zvsapw0znmuqb6gd70999qxynunv7eo89da9u117zqc97hnhclebt8j0oinyymhakxcamba70ccs9e3xhh0y3wf4hahe71dqyqzxabieft14qzcadcnp1ld8me8w2bjlcf5itnxlfbfy2058e9wvnavl2lqu71',
                flowInterfaceNamespace: '8s5fjfmesb1iuzj5cysnsc6larziapdia62mmc29ut96usp524yu4enehxe35zospc7on6tfn7gachlwy4rtxzp7qlhh61m1et64p4ctpzdxkrzgn5fwofsjs2s6s4rlmbsm9l38hltjj0fcr1ohqhkpqwbsa35ix',
                status: 'DELIVERING',
                detail: 'Rerum id laborum illum non nostrum consequatur dolorem id omnis. Id laboriosam molestiae. Facilis reprehenderit voluptatem et et error deleniti. Unde deleniti dolor architecto veritatis aut rem facilis. Modi aperiam fugiat eum aut. Earum facilis velit repudiandae temporibus et et ducimus vitae est.',
                example: 'pd4qprk28pbeh7cnezeajtnnj4an4csbspaq0h7ghtp8moyhux1gna0gu4iyloc763q5vnllbxucgngcrf1nenwlwf4o975vle5hjlh15q6n00v3qjbczg0ak71rqblfa9pmpyc41wrssqur78gf9gr5ctsmggec',
                startTimeAt: '2020-08-03 14:16:22',
                direction: 'OUTBOUND',
                errorCategory: 't56sntnwt0cdj2xjfcissnaqv7kiuxh7tcfmjgmt6dxcp1e8p7xto7yzgnqbk1xuiej4zysjj5bo9brv2604czvo2j88iazhja28dt2istd476q6187jvz7s5a1ys2iigr9a0i3a0pun8goa7s0jksqhszw6nhaw',
                errorCode: '9qd7vl1irlbzlnms1q5nqg7j8j85ibu4bx56s62ajasi3f3uym',
                errorLabel: 636197,
                node: 5071200131,
                protocol: '7gx5ej0urjj26oxix9qi',
                qualityOfService: 'qsver8lg8cneag1n42s9',
                receiverParty: 'ozbfurhs1cvzoop8nv1des9q1rvl65e2a7751sd9ya61isjwtqjw7nsfj5hcn7m4t6mvqvltyzvxs10xl2l2c2vcqz2c5bqmvocayksk9l9v43p2ktn15ggcwzj0v19muu2lowfud3ky0pa8hiwlxcmnola3h5n9',
                receiverComponent: 'v03uetrldya2v17e54jy4853fql26syxum0bgqaoe75bjyzhd8j6gpaq2lu7jmzi7ds86mgd2dp4sxzqwtk3sb59j2jk3kpjakd4qsjfbmkl6eagzefybojvj8rr6cmfzb2yjk3m6hep9lpxdihor54vhiqhkiwb',
                receiverInterface: '8indo5oak10lmfo7itkwwk747s3plpqbxnbxnv6t832gx5bl081wgrd86acv6bpd43f1hv8pvy8ew15o5uklaqagpymmk38grcqw14rh0eds1u70n8zh9eypakue93b7lik2n1k3pzexe30eokeif6plkudxx3ky',
                receiverInterfaceNamespace: '61uocbqr0pxverth4jpw0mzspd52qct7tmxugkgy4bjwyxsx4n3zr15aioli02pvhqxbwmtni4rko7moerxzykkmjgx70zwl0fh9ljfukpw59dw6edumbaecqrg754lcn37egtwjohn035fxzv66xpepshp46sad',
                retries: 5381685178,
                size: 1587053074,
                timesFailed: 5531050244,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ud5xf18s7kwspxicmpr262w785db60m3nvmdhq1d80rie7t10a',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'rwdyoh19k4ggcy794pio',
                scenario: 'kf4urmtkvn84y6zdhowzdeg27yfo2j4bij7rsodle0bz0kybb4nik6m31g00',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:12:40',
                executionMonitoringStartAt: '2020-08-03 05:41:41',
                executionMonitoringEndAt: '2020-08-02 18:41:09',
                flowHash: '62eexogc55zk12n98xb91pog6d10vlvp9x7ikbts',
                flowParty: 'm2ymf0c1x85ybpzj5t8cg9d1gsrye687ziku7r5sak06hwzbtyidlpd76dbz93o3qcdoccec8hxae33rwweio59uq8jkj5eelqmotgzd5q2n0u4prx10qr11e75ckpvu9ql7vdh0nxtzuk50wkqdngtj9lqmqe54',
                flowComponent: 'rhoz92gug2v91bxk4w4te4usu7egqdyj4ld0uszzmlk7p1x02t0v0p8e2p8uivbbf9mibeuwhbkzgj07ld31dt8ju360xg8tqbtrlz15h0odp3a4m6iimgdnh1del5uidv8uvv93r8flfbhhmfc9en8n54pkl7ed',
                flowInterfaceName: 'r2xgbyc595y0m6kd8gqrjy52afchi21fz9050q0ue050jaugns0tafekvym4u4pp62sc9nu83m3mgf0jf3gvhp5gv6vb8zn856xji3lz2f5ugbhwpcrw7wgor5kk1gi43hbl1si8mkvztxarvrsh1qy16s4owa2a',
                flowInterfaceNamespace: 's3tddw37aco5063rr61ct5219axy9al5t33sir3iyx88y6oe2htxjag68wnw7zo1suz4ar3504xwh1se3cv3aq3vbsi4nqodgdqicu1bmy33unjwfly9l44p6586okyg0l88z2bylzthz9blci7of6ka92raeai3',
                status: 'WAITING',
                detail: 'Repudiandae ducimus labore ducimus vitae eius doloribus nobis reprehenderit omnis. Aperiam aut eum eum quisquam quis ut quos velit. Natus et omnis dolor. Et nobis placeat qui accusamus. In quaerat eveniet.',
                example: 's2qr6h6s9f446ax5ug5mxj6xuijq22satplw4858d428ytlj83mlxz441l06821rh4u6l7c14amx2q03v65ev3430csd0dwd88c80j4vh16owvc0z461fkwpge3h7t46wdqfm5j3mkffctpgkeketm81ipxvcgq30',
                startTimeAt: '2020-08-03 02:46:24',
                direction: 'INBOUND',
                errorCategory: 'q9jq0ze3dbdtpz63v2j80vpn0q4s4yyuxiuu14ix204dex7kwzgc8lrr8w7r4wtqqw31qcshhpwkiv82lsgeln4mi62teyea74zybu630gsfvigdoy1cgi3vgcm39rdon5usd2qfl82u4pdfpoyja785pd9du5h1',
                errorCode: '2xk9tdbctj1p2jk6eto69o79bkl9zvu0c25iut659yh9m778b7',
                errorLabel: 195678,
                node: 6704846380,
                protocol: '0gnydwof0m6d2m80rnvd',
                qualityOfService: 'qoa4l31hu0ps82hqje85',
                receiverParty: 'q7r19abcx9nkhpf7xbtr0tfs5pmdn7em9c3awhs2du13exsjvfyimzqotczjdnceeje8bcxlk3dxapjcu6og3szr2tjx2gdy8zv2vbjpljh5mk8p1vr0ft6yoh1gtwwtw7tbinoketep1oc37jepajlrt73wg65l',
                receiverComponent: 'bfp9fyssxac3ro36bo21unbjtpx7bwn6ieyk64n0j21iw1bopk0g6nz0zuelijrt8j8e9hwacokulf91rnvkhb2yata0s5okmh3uso38x9textog78ujnqzfx286qc8xezc9n0czw3aky93sgto7g0rtaet9d6q2',
                receiverInterface: '9xuz92601vvp8d6hr0zm030eaxbekm42t7kr3cjxkw0ogmci6iybb0xc99uxn6s27svqeb6c4o8uviemfn2ey7tqqcefl331i08lyj75m0ph7swqo167t7seumodsnm6b1edyi4fhkjgkl0vs4jno6ql0u5nun9v',
                receiverInterfaceNamespace: 'ancr8tfgw1jhf9uxc0sdi2uwqaxnbni247qn6m68gvlqxy5rgpobb8r3lc7wzunavjhpuoeipgj4l860pve03hnbbwo85gz1s049phjf1ao01t78y7u8y9l845xvzkxbj92p87r25m8tm6e00n9f7biq71drg93t',
                retries: 2543205279,
                size: 1441805444,
                timesFailed: 1577374689,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'ywkc0iv5rkusvfgg62sg101orxfywf2956gln6u7x1ps6fb5al',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'd8o6e3cgn69ud62uhtst',
                scenario: '5ktuua3p62mvxls6d8ur9zuhwpj0fg8rqscmn2vd5szikqzdoqfmjj9izwjp',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:51:14',
                executionMonitoringStartAt: '2020-08-03 14:29:45',
                executionMonitoringEndAt: '2020-08-03 15:20:06',
                flowHash: 'ltwhovgrmupvhdclkrmd6soyeb6vrt3yxjpfmy27',
                flowParty: 'nk34zlqsqmvfhjyb72p1vnbnzn7j21fvgqzekpqeejxm6vfjyexo153bfyxhnbq02njp5wu0tmi8mk981u8u56n63zl58dzktp4qy0gnvk1ptxxm430bfdckd1lqb53rco45yzbmplvt0jmsrvwuwlriam8haf65',
                flowComponent: '9504snj2artevlvp1q9ms150xvhxmfpqsv5j4z7vxmryg4aze0ej33wjqawui9p4p2557og8z8on3g3hnh5f6zmdnu6kyu164em6yerwmre5a2odjgpoup6zb5uutcf1nsi9vlcs0s3gf1b3qeby69jgbzppuyfa',
                flowInterfaceName: 'jpw57j70bw0pddleufq8h8n4d2k3i5k29rp4u7vs3s63gi1wgawx0hrh5kq3mpf5p0t9f2urj7ks6snobak0w9sl4v7q5ji82s4dc25y6rik82whevejsnjgxgw7gsnikoh33oygpz29h0avvn3zb3zb48ocmus3',
                flowInterfaceNamespace: 'puo93aya86ywulfnsikr5vicn8msjp8x63eru9l8save7m2vmys3jgtd6zatx03d012em2xl6wmu1jfdihb42331uskzzjl617y9fyfdswfo8kd3m7nxek6boxxd86f257i1869x74o55djjb04t7nhmi1grmxi6',
                status: 'WAITING',
                detail: 'Excepturi et est aut quibusdam atque dolorum reprehenderit voluptates sed. Dolore aliquam exercitationem perspiciatis. Sint recusandae doloremque pariatur mollitia. Quae sint ab deserunt.',
                example: 'qr5uje6gkfzv6vr1zraox7hpbo3kn3hpekf80u4x0bxp3q3z9avcqjo437popmpqma16jmq1lh4cdf7qfgnb517wbofqfghlelv1454fmjb5aam5jalvlcpxii8vi0msxxhxloimy6brampc5l30r4h9hp3o9z6o',
                startTimeAt: '2020-08-03 09:35:12',
                direction: 'OUTBOUND',
                errorCategory: 'tzw6lr8a8qhnp0dyqrkktj7gtu74dyv1fh01uh1urvzvl2d2xgmds670aact0mr663hk5ml6kxx5649u7fko4bw7ul710145thdx8pf7d6qwpnveohlzrh9hedg1ofmnmaoxp9psv0jbseoes5cg1lpe38ymi4h79',
                errorCode: 'nk5daligpclv1q7sk4yw6rhfcpn01brxh69im4io3m39a26gy7',
                errorLabel: 957130,
                node: 5067302220,
                protocol: 'polqk86fsyxrqh7vi24d',
                qualityOfService: 'ara3xpga53pl7128db5d',
                receiverParty: '9udc7qzva0edm6d8kcf3n9r6n4fb17su9t7uqqrp2uj2xwegud74lkktjpsgqgasa5ach7fiqd3cm4rbpqt3yb9kyghn5ykpnwk71lqdlxrt4hngtrit0k54r5heipdu23p38kxm7nvc5p6ilouelxalxeajru8r',
                receiverComponent: '8v0b0wueuyx00fxikvaftl0qud7qzabju1wbokbtelxueqqmluhmaah5mfn8gz6s078tljr2ztn49sdtacxb5qy7v8gpv7yv438cd01cbc41y0nnsicjat08aakl9y02g663sj1j0rnib9resl6wa7kcjbijz08h',
                receiverInterface: 'sqv23na6iucdxwaie6iddaiqfvpiul86sk7p9smmg81fvxy90n8xdhvb1yi3r6o0nrn1hy694l44p9gspwp5w5gdqm541mvpxxz9h8yde4fpkj5no783rdexzllp2jmi320w121nfky4eevexlivpyhkj5tlkgox',
                receiverInterfaceNamespace: 'wsx4tknmjro3vd88ovs8ac08fcfrfza3cps9jyd2xtcaq6z70g2sx4v0rabntaj8xujhw4fbvgu45mo8h2n3ssix82txnay09aaq4u2wulb927nsb5s56wce2iji6a3btd2n8d6fodxod9zr92ykjcoekvl694u2',
                retries: 2456517451,
                size: 5431954657,
                timesFailed: 4136133253,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'sdbq2j5xolonud2rcf33ymn1m8e09izaljwelzerkgoias73ow',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'mfekhqssldcc87ewkkhc',
                scenario: '9qsf8jaua8w7y84oha1k9lsoj0zoylrnt3h3henkwf0zfaxj5kx0vzip8796',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 07:18:09',
                executionMonitoringStartAt: '2020-08-03 07:15:11',
                executionMonitoringEndAt: '2020-08-02 20:23:02',
                flowHash: 'o0nii9y7stek27werckovu1rs15o5xrotp9l1qrf',
                flowParty: '60174hk0y03hxa39x71b7tusgxxcd6aqdmooczd4hpgx79a3awh8clt14y28k5xffsjw770p9qld8o7y50oudvl6pxrrbzcagpawvzok4mtgv5rkiu1ey3wbimhemy0uhj5nknkvdc1zm2cm12epg8p2jb4qxb34',
                flowComponent: 'vj8c8rwee7t2garbouex7i68sdvjzjgl6rica24fi8ibu26kj2wq4iuagt8k2srvb763865hb6hrptvr5dmgfry5zfzd1hevhs7rejtjiqoow8e1kq97s1nowrs6wn42p9dshnr5sb5np2jj6zapizdckqlzxc1t',
                flowInterfaceName: '1iyyezc5mic5fct3fq10mtbznjchxffrjb9klxmwbvs0396vsql6vx8xg0zi4hdv0dxkdbjrhvbju813xrsc0r93hwh55srqfn7l75rfltmzubrzo0n6pk4bo1ykttbhavt3lfqmls8c8aez7gwaqnwa9r0iutvr',
                flowInterfaceNamespace: 'ge27we59sv4uzu39zp43dld5p31vou45earredynt0d9mobeatozl09w0gb0ikswf1n3n5qdtjkazk55l5dwpvf870zh79xgid08ixjduxo92pgqxpcx5a19dt3cskp7qkw525gf4uqdmlcdntvogc5kk63djkst',
                status: 'ERROR',
                detail: 'Similique error ad. Sit excepturi ipsam perspiciatis voluptatem deleniti culpa eum. Et voluptates perspiciatis dolorem expedita deserunt blanditiis debitis.',
                example: 'zdnm16em4vj448zb0e5s4wfly1d02uvec94lpdsyi4kfl8ucx996wwznwu7rxb3jn2oqx6j5jyrrtb0b58lj89r84u3re2btx86p6kgs0p5mpuvw7y87irewrsyig4swuzwnzl6yjdf04s5et1qqf9ezq0d53fb3',
                startTimeAt: '2020-08-02 22:24:33',
                direction: 'OUTBOUND',
                errorCategory: 'u6bs7k4sb65zdhepy94sarmyz2ujilkoyb67p82j2yxh31mchiku8htb9rqc89bpeej1rzwhf8fwqzj5oprn9sg3tsnkhc0av4udiougyw56x2clz4f3h96f7n1fujazzwuv342l85a9znx0ewldo1jfqscjby44',
                errorCode: 'hv50fxe8btc3g1dhoj8fosqi7mf3muii8o2n4x5373w5pduzpap',
                errorLabel: 457350,
                node: 6714289090,
                protocol: 'jh9esti1zvc73gg4wlqc',
                qualityOfService: 'iuc9fhx09b01h2ahju3d',
                receiverParty: 'qyvnmc53ix9kp1x0ezw10dg12ajh7fnvck0pg49pnv24vpgno18ip3l7tkhrxoujqvsyijcq39mbff4jag3tcbs8su6m5s08rbnxhjeyi2hkvstdgl3afncgtwtxaxvu1toz0d3ptvilh1j3o2monh0k7olqeva2',
                receiverComponent: '6faecc4gp1ej0z0tp04da3rvqjuc1l9dl1zwn28xx87jmrd4sv3h6o3no6zgyzoohlmun9qwktnznds25e8sxm8mu3o9ksiqt6vir19o5xmcryfy04dlkoqla16xiszdp6ezivxq2cectpmkudenljsl3il2j4ez',
                receiverInterface: 'ykxh8usc7l1ty5g8wwjfsr8pa5ffbnjbdq0kqmanuytpxm5pxh9h486a6h8p1iamf72gy0zsrek3xuv30t5rmege5a8vsv4ay1mcxkmpre8nfp0pwk169yui0pli6dh3yyi6xn2va4ojnsqs4xsax4jid3fv6qz5',
                receiverInterfaceNamespace: 'jf2ag0lio9tvc84x3h94tkaz93z0mypgmp79hto0v7mphi2utc5pi959hrmmem2ek8xrnixrx6yoe2xc9u4sjv0o5wvs0fj8xtsy8pzpso56quw7thzt2q53ew23mnwoa0ux1b0bpzdr7vw8gdi70iy4pfmbdeca',
                retries: 3741485343,
                size: 1114709413,
                timesFailed: 6581932107,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'qiwlbqwiv0c8ydaw63idanemuhp7gzgu48v8ro1fkueu1xhvxr',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '6t2sj4rqkfvrr8mnarrf',
                scenario: 'u0tivymm4ir6kk75ylnpqfqb2vmku2219lvoktfsusfxzovx2i0okr53z1qd',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:29:31',
                executionMonitoringStartAt: '2020-08-02 20:09:09',
                executionMonitoringEndAt: '2020-08-03 12:39:04',
                flowHash: 'kfc53u23sioe9jka5nezy29winu05gdhcc6vuuc6',
                flowParty: 'je7ijqqkz6gwfwtfe902tbgmdc6cxsv3kwa4132gyn470xjmppsaem7v4qh2rfgx95s9778osbhgy3ivuui64fb7fez7pqg5bwwv18kl2g8wz8n35q66y512zhlvtmkh149mvvojb1qffn6cmuytqitaaoi09mbc',
                flowComponent: 'ap039lvs9mordrnob1zywvz0g05mnu9ish1o2z1jfk4g8u5s03m7a0rwsqojzrdjlyjaecyz31hock1ljp60az6k3i5xrrdsilrqhu0onl84ryc2ufd7ac6c6f2yhkpboe235rl8ertinu1hzlqmeu8qwnh3jy7m',
                flowInterfaceName: 'zxifan6u1juy9bs6hkcomu7kmbi8hk6q7twiz4tjrml83wu5xecvevxuye2nivvq3tt3xd00mjfar48vcaj4wipwnah84ucmwpy325lja6ghosvlrunpuxvkbh35b411jtmjo6l1codorbjc93k28rj54gg5fsfl',
                flowInterfaceNamespace: 'o9rmklemddemelm22ahj8i9i51zngfys92dds9ay6chlhp3f9p8khasxc3m37o00vg9t8hgndkblpo4m6jigu4gtwgq5xb45o9vxc6pja5q1dmqhye5vo8xsqull3loow4nzrxa11nb9u03p6prqzf0ic3h2t3r1',
                status: 'HOLDING',
                detail: 'Sequi vitae sed corrupti omnis veritatis. Vel accusamus et. Natus quibusdam pariatur et autem illo eum. Aut praesentium reprehenderit. Reiciendis facere enim est cumque. Quis quia est et voluptates tenetur est praesentium quisquam.',
                example: 'uzhxs0tlvow595p9wvo8o1z1dbslmh7hyymsodm6bji5ibt6k7e48s5etai4jjyu4pztkuvy1fw62qsefy6fk9aghevb7czptukrw953y778c8cwf5htzmsx8l34dpugeva5xogbhkc6hy6ngby2p4188ge7ffij',
                startTimeAt: '2020-08-03 10:48:27',
                direction: 'INBOUND',
                errorCategory: 'p3x9kp7dc75vsx17enui628dutvq7zgm4bz1nwrfx1d2uu5zmjs6q3ze6858qchimeee4bl587axd7gh6gxxa4npvgji2ez81cphhayvouss62hrdq28s1pjv8xrful41gg41hdylw3hjv5v1a3bhlhms3o68my5',
                errorCode: 'po28c1rzfxbedvujv11mbmxcjotatk0mca5ve0046igcclobny',
                errorLabel: 6783581,
                node: 5294924256,
                protocol: 'yj1j6gnimkufogaqegmz',
                qualityOfService: 'k7gxtoxj2chz97zyd702',
                receiverParty: 'gwoqxn0pfmea8boqnemfc3nfbd43wu3g4ebovhwqq8j3ywno0061ky4ik2r378bbwngyyzudy6ny7sfzbxi68e9aw38cekc3u2shopyn11div2gc56im6x266nwlhmhvha9vtiajzbs4iuylnxjwrhbtnxe9vboo',
                receiverComponent: '1on7p7tqpb50ooaxr18m7h1n5kt9jklgspglm81y9gssb8y3iwyfk99ksam8oojpzp7io18bv2kgjaxyy4m06v9jpqp3dh9c7z4vw89gnrj88nnxezjy11bb155rqzypyhtbi2q2yh1diispmnpnyakl9nhw1b6g',
                receiverInterface: 'hspathnohvfka4hmp6m4bbmpyya7ex83zfckxehp84swum3148lsdeu8yy11ta5xl4ryxdzchy7vrn4uoiq34cuyk2hbewnx830hap2e5o0jz5j08j8w80qtsbygpgqkqvnzqyqzxvysbnk0x4qbk26333nsudqe',
                receiverInterfaceNamespace: '8cx4g9xyoob0z7cko4z026ejnksua6kju9owkvktwrx8944fvrblxka6apwdmbmdoa293w0sir3q0zga9mg7jysi8e9eakdb4hko40su5efat34xxr3ypupr2zpb1s1xamkyddh5yzre84hnrd1qlvvdpaxm62cp',
                retries: 4021946775,
                size: 6737975234,
                timesFailed: 2379318282,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '5ivdjfh7737dlf9wzx79w81eyah7gdgzksf9ivhqbpyth1fqhh',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 't7ezlwyy6t83lyy1oljo',
                scenario: 'nnlqygdfo7uzma6hvrh817jwaclk6p47yvg1xsqjoz27k2mcmjy31j9ka73u',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:53:27',
                executionMonitoringStartAt: '2020-08-03 00:32:25',
                executionMonitoringEndAt: '2020-08-03 04:49:57',
                flowHash: 'qrt1ifs8b4qm1qgpk13y5t3r66yus5p3sbp6am6l',
                flowParty: 'jpu0z6mh1x8xqb2260b307g9q6v892fbr0dik6vo3k5t1wjz2wb7uepk4dd94ddh68flsz0y9k8y7t9sw794jhmdch67g3nanbs8t6e9az4jhuzz799hp9svri6mjegdbcv5vbkavn4sc4kf5dq9o71l8y1vrbfl',
                flowComponent: 'lm56ivumrd4j8yeac4vmhfun9yarjdhc7nu4ttkkvo4jl1n4axd591uzdu847hi8ko11sjot0z1qpxw6vsy8ietgo2god5cmwco2tt1x0owgsk1j977wjxer2mpfbzg5qjjl8g2jnozmrb9kbfkgk7jnfut0tdmb',
                flowInterfaceName: '5jrpwgvk3nksixcqurqz07ze1g34a9qj9h6sfoh7glfxdarf5ydudyf6jeji5mlvbchdwqj56bthqzrfzx48slg46e6nv34btsaxm96gxp64p6a394uwjje4ql38ev5h8fqwbd70m76awnf4e5hqa3lzw2qn7tpe',
                flowInterfaceNamespace: '9gh5t6qcb0e6n0i43hgr18da7di10a50qggnh63qbi4jdlpo2h19q2e88ni0oxig4v38nffupouccfistn5dpfrlwbl71u1ockmaxjt0h0137l23h8ddd5jnsrglu48z3cmqm52ij64z7msdkzpg5fhiho1r3ajj',
                status: 'ERROR',
                detail: 'Corporis enim quibusdam exercitationem sint explicabo voluptatum rerum. Dicta quas inventore facilis ea dolorem amet pariatur alias repudiandae. Aut aut eos est voluptatem reprehenderit et quia velit non. Natus ducimus perferendis similique in qui.',
                example: 'ti7h6yex6pw3bs8vs0yusaidc7a7axih40r515i61t82syh09slahtyxr8kwqijf6p3br4f62dnrf0kma4a1xjobq679kyi6xg8weafmcitay8cc2smqc593kkul87h95fzdhzyne3d014my643h4mq6ld8ev2m3',
                startTimeAt: '2020-08-03 17:05:32',
                direction: 'OUTBOUND',
                errorCategory: '56lsw90sfxdhqmv96520wncapuacu0hqcdcel4ah5vs6ix8olos0yvgyuogos25t1h2jkudx6w4rlvpafatco8qjqtre2xktvqcoakxwbypwi6oll6jwleq0kehnnfhybprx86frichoduh4th7q9ptubrsbfcz9',
                errorCode: 'h8i6k7lfkvjf3j9hxchzq6l8ddljclkyqs8hrlrajs6wdo3akq',
                errorLabel: 518003,
                node: 75956114259,
                protocol: 'o9ab5yjymkstc9mj4vw3',
                qualityOfService: 'lzc57tvkdyjzcssid5gg',
                receiverParty: 'fpcrj8yisyudd6xv1wans9w6nd78or0wj275benmb1xqpkwmo37nct7xbt9lb7ocx0mavdtynipe88gd8w0672hunqdj7re7ynjq4ljpze35tmythsluvn4zdlsgcmg2ytaz3phzdt7zt50884fct95y1vzj2ozz',
                receiverComponent: '90x1kasxvq2d85712ulld23jh3digl8ue0miq9sdepkw0j8pfm5ukbf3aizfpahq564676aeswesvzzpi4yadnxbkj4yfdagvzv3cycvko35iteyv6ln6i03ms2ifb8sztmir6becq0mm25ezeb7oh7apanejj4p',
                receiverInterface: '37ltipe9b1sa36mstau6vyygukc56ytmhd2jksgbu1flcy7lwdsedkw0p5sxpvrohnvnw5tnocclen4yyj2cvvkweeiz5c928xanir9bqry2h1ka8c1jkqr7sn9rct8rjsj4f7v3vacaoaa7nkwhjew3jc60rccv',
                receiverInterfaceNamespace: '8vt7cfw8gnj5lhmsr9zi7tnsbrrc1sftrh665xoydmc92f6dqaxu4kfyk9uj7o0me8in5pfhfvskaaqbt8jkz4sfoy40iwh9rqao1popm6m0tyn2jmajmh8pu0tdyllvqpus6mkrmrq02wb6irslv9sevkrln26v',
                retries: 6420739420,
                size: 5795734640,
                timesFailed: 1458154690,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'lfc78wsivinjp6haq5zt9yaz5dc08edo42czqfhlkkwohvrnvb',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'r3u7xol0m1s69w1ec2jw',
                scenario: 'dwwr6lwwxfizge25hnnbl6w0c6dd3ojebzivxi4bvvfm9ng33msb3p2tpcyj',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:05:04',
                executionMonitoringStartAt: '2020-08-03 15:49:51',
                executionMonitoringEndAt: '2020-08-03 02:40:26',
                flowHash: 'bbude4qld8dx6wc6zjwpqa7olg53v67pmd0aa1cx',
                flowParty: '6wdaqx1usiyacj41uf5a1eq58tt41ydj1zgpphifyo6qzsgfqc1f8zae3dj3b65ewyikr60dmnl7fnqdxmuy59gohud404x4nic7pu817qewwzlb1fwkb0bq0vaqn8su1j8mhun3k9jbvknwbk44swsqyvy28o2e',
                flowComponent: 'oihud6z798xinltwmqekyyjsk7l6c813wafz3dnxv1b0fmb1lby46fws9d62s555mup2y0g1mml0l4bm9ll6qylu733b4zckowjdwb5tzntx7h83lemu5q3ftgil4ls409fhx25b4dn7xfa5wu2ycgjkjhjo4ndr',
                flowInterfaceName: 'gymj8rgrxrtpucrt2tgik7obbnozyvuf85qf31g6xh6zhvl9yj3kpqnjwjguku36izpfdg88qom1fsg05z7n4dam5sdw7k52bdgs0t0h3zya4wwixamk0hbbrb89u3yxmbcb6toyse5acm6fe7g5f219nr7cyzp6',
                flowInterfaceNamespace: 'ba0xi27u36dvxgx2073jvpt0ed22ry8i1qmnej13ukh74oijg7l7g2jwoyc1v8rzcyjtofgd305o9zeeus1c3jmf1v8n57lj3b4hecveh24am6pfgjaml95tioket6gbxhuv614aeftsacf08lizi49vfd2jg6r7',
                status: 'HOLDING',
                detail: 'Temporibus est iusto ratione corporis nam officiis. Odio rem eum autem fugit earum. Ipsum veritatis similique sed.',
                example: '195w2wo7gnmtieaojkluiczmb6tg4zs6uuspo3fo1s4tgicocwggdbhqdn683m6j8cbd9i8yy98hunxeegetoma0w4jitefv8j8uhgsjmvxkj7e0tsn7jnv7pk3jd884if0tj0h17fl90wha567k46r8u8b0yrlq',
                startTimeAt: '2020-08-02 21:22:55',
                direction: 'INBOUND',
                errorCategory: '7g5lehk7r1cc5zxucqcl9mqhfx5pr4m0e6kii0owbqma4o2bdufvbcsij6zbjbuw99e86r4xdlb5a68c2xa85y6ua9sevmwgm8o3f3okv09t7gpad127l78113kh0d2iqbunm1iglpu7fzc144laa26g9vkmi0b3',
                errorCode: 'b327inhyvbc36imtmd6m9wqgroe7jtyyn3rmw2qe5rrjh6tsvp',
                errorLabel: 642524,
                node: 5091414704,
                protocol: '29o2je646nv7iib5mwnvv',
                qualityOfService: 'jascci8os9yl5817brig',
                receiverParty: 'ep7ejrmm97p1oi8d264s7l2j7xjhnvq33ipxel4of2a4fs7lpauutgoxczqr7ktqu4zh1cj114xuswagb14qibytdgevdfxjohm1z6oh1fd3vdgep4qht68ig45b7g5h4vhe4p9yerywt6yz3wn53no92lier2vw',
                receiverComponent: 'nbw6czg85xz4nsvbugh9xm2shnmhst28vw9z9u3lfvvov71e2q9vq4qg3ji9eeuxw1ttep6r92udhwd2dk697oq54duqztlvygtn2wrl94s6mkrjnubm65wtiv6bpwslbu3mkjv6celwdhfvrw70blv5e1cp8o41',
                receiverInterface: 'dpl3m69sdjvqp1p4dm5ogya1b0vx2sh4nmqixep9z414y5bm1aibizsmbfzlbevyb2nynu2no037zgh36gumwlaf4q41qnvgi5ookf5olbrkam1umk32qcw9l0y4gc5nk6oshrghns308t2hz52z10cdvk8jwy9j',
                receiverInterfaceNamespace: 'ftx49sbadv7ah3hj5f22phbajss6f5j4i8rvq9y5j4y5kl5kdy7xxskm7nx34ztb0kbyy5bu7jof78la036ta3oh1m8xi8cil9bsg5zp0zieun79oh99ts8fhc3hak1hzy5l9plb6lzjzp76nz4ht15lv01oyo39',
                retries: 7860745380,
                size: 6608167699,
                timesFailed: 8630105221,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'zos1un0zwevn0jz4o8nslx1yqykh8rlvfq99iqpx2dviqsar24',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'iupi7p0jgb01qm6q9xxf',
                scenario: 'u3tv34ludfpq5ypzeb27a8udpz8ot1g8hmo2ee64nro5oke39lnk4g7j14g8',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:18:35',
                executionMonitoringStartAt: '2020-08-02 20:04:41',
                executionMonitoringEndAt: '2020-08-03 17:40:35',
                flowHash: 'rvhitdh0omsxptmdr2rknz4ntzmnpjv62nfab64j',
                flowParty: '4zhxi76dr2jp4zglfce7gvejl3fx6pbr2g69710cn9f8kzquz7n6yh14sjr6orwuq8q6241pan0qq9cih34cnvj28mbpvxvrjc54a4tcwdh8d60k725h3oizeojrclvjh2bxiiy7lvlfq5m0f9jnjh43lw31iv1t',
                flowComponent: '0tsm6gttxjfja5xh4kevm45r89gokmawntigoapcr8w3wdz1ajnlgp0kifffm7r6wla0xfz7vha5ibfsk9zgld7oeit88torxmml6v1q5zu3tfbs6aitbpdtklksa5vgismj990qog00l7jw4ssms0dhdqwpri0b',
                flowInterfaceName: 't9chvl4fcgh94xdvj0v6dpn0fw61twl3zazzv6qkfm6qlfee0tk2gksb7zrwuxs01en9m8y4bhp0ah5daei7k6q77ukml8akez6jdmwusg0x0k93ed18uaz6n9l2i0pz9dazw692g2utkcqun190lw5dchgnqyy3',
                flowInterfaceNamespace: 'wbqg2g7k2s17ljohy69dzeabmfr33g787r6dja5ecedibue0l7nbopyjbeq0aaggzq6nd6q8vj4i8mit8yg4ayllpi5athfyr0275ujodwdz9mmoeibuk2iml8h3z66ridiws625y3map3i2s6ko72lrxcym8goz',
                status: 'DELIVERING',
                detail: 'Totam voluptas voluptates adipisci perferendis eaque deleniti atque. Assumenda sed corporis odit. Beatae iste aut facilis laboriosam voluptatibus eius. Perferendis vitae dolor distinctio a nihil et in laboriosam placeat. Doloremque reiciendis et.',
                example: '6920qffpqec85kun9y6kvo5bhftvmaczp86w65f5s1736rf1wecpcsouk2ppr3sv2zk1381tjj6bv4x1okintu78ba1krt5mzgmf4urnc3o7cyyfmic0s77vefmvj1oncl0chou4g2lpruzbgjultqb6d0ij8x4p',
                startTimeAt: '2020-08-03 09:49:21',
                direction: 'INBOUND',
                errorCategory: '77vjnghdehod21x6pey4ksuy0wq7lvs9bg2mlnuz9upcksln1sxkchypw9dhn3dfsq4m7omjnnpaqz5mema5fcxokyluxyx53ls4hspw4j8354uklm5zxm8jysiq5fshd3d3db3y2hnupyo1o6pbtpnc9ytkmsng',
                errorCode: 'us76eq6v4yntxowxgc61vlz0zc7aoxa7iyt59jgtu1gz4i1rog',
                errorLabel: 730445,
                node: 5432916969,
                protocol: 'thn6gdomrlcjyj448q2p',
                qualityOfService: 'ah4gqd8iwvpufsujt3p7z',
                receiverParty: 'vremq8zfpyhf28uxdt4myl32rj0qmlz1r0iq7zdop0ll9u15s8xy25wgm1y6hmxlk2nxn1qi0bejy752bz5lc8hjk47aohhx6qxje7vkj3l77onh2bjyh6dj2higz43ynhajc44nj2lyzgvvo38v1cqaqve5x0r6',
                receiverComponent: '29d30ou5nuswc0o0csygkk12rdrkjsm459ee9bctrnzm3fpturdisfvr6ojib0gmcnisxgpf58ihnx5010374bu6ix0bq3n5pjm4mvvqqr7g58a6cwlj6ky9s8ya74pqa9g7boqmxmh6g55w96axvljlsotuvkbp',
                receiverInterface: 'kon148m85zybit9nuzzhyts4nrisiq5bndq9i88bv1kvq9jq7v799qnh3ef78iu4g8rk95t0f7b07csbzbcy9sgx352jvdqff4utjeuonchkcjyelbedy274e4uqfptxhh1wyn93l21xjzozm3i1l0sfue9qt4d7',
                receiverInterfaceNamespace: 'y95we6dsv00amf9h0mdi0ewcxguxcxyo4ulwk2piumts66t91h0qbtjzbjab9088jzgiaybile3sqwrqdpo3whvtjcphn63e63eqr5ukdm1iqfsajaeejl99e6vvfeba5afo3di23ic3a8cnzwnod8dnluglp7h1',
                retries: 8653533308,
                size: 1412503010,
                timesFailed: 3857166840,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'z0c5ph4izl1r6fjcppmqewkmvoxm2vvijp1slkiqysfg2k0k36',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'ss4g4m29qkpj228pe1s3',
                scenario: 'i9kt234uyc7sewg376aki0vtg81tmgab7lji2wf0vck9hd2pbyr48f44opda',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 00:35:52',
                executionMonitoringStartAt: '2020-08-03 17:58:45',
                executionMonitoringEndAt: '2020-08-03 12:19:30',
                flowHash: 'tzgc8095gmsgpu4ej4ua624nibspy31luw6tg43p',
                flowParty: 'zg3zudc8bo2mt5vzgff6720lyjdl1ui9w9akqmhztfvpficmshrqiksi9hew1fonyahha4fb4bahuavjlaf66x8tid9g9q9sjpaazspjj8qthy9t3bbeg72zz79afcecze0crwdimmc3g95kfavyfroedgrjfn8f',
                flowComponent: '1l61nrrqp1gwd7xm38459pt45g0tyiz9k2pq923y601rugzxkvbrm53n3ixsru6ggjh968dk05dmgt09ozfekf6iacgsgaxhk8ghmgut76vbkae4sutxr0uvjmu6duupyx4lijh46amsy4t0hevanj87t3lldpet',
                flowInterfaceName: 'llf9wp4nce1cwscshpm54nnxfevjaucdcj0cvmobpbg1y8q8aw3qpfzsrp6wxoo52cdfb4w8lck9bp1224t0pi4mmwc4dhlbyrayyy9aj8rsxjsddsfsziqddoofcz973o9u1k3r2e99g6hlsdy2liqevqyftr2s',
                flowInterfaceNamespace: 'zyv5g21aawwq44tpm5vpn3p35irfmp4vhn5r9f0d1vinwrd1cas7qoi1haklwairi86q46r2k8un7zp365v7m0ge1vuo8s1jt3vav7e9lsr9cwtewgozxc9h280jeikzrf6j8tvplo97wnuakdahih366e27pazg',
                status: 'CANCELLED',
                detail: 'Omnis est nisi. Sit architecto vel sit est. Deleniti labore quae reprehenderit aut et et temporibus. Vel cum aut quod architecto architecto veritatis fugiat.',
                example: 'mhhn40f0kyb7f9w7uobyz9z20iga1lw12nt4l0hmtp2dmubqxdl1by362v7czk9g8deip4upceu70u1jdf3qa51z1lokna3py7vezyb8d4jy46qdvkrfwrxe3ovbgrw7bwu13hcigdydrg3cllsdhu61ybkj41pz',
                startTimeAt: '2020-08-03 11:16:30',
                direction: 'INBOUND',
                errorCategory: '1hg3j2ylfw88dmpr8dru457xtn9qvoes5q8pcjhix40w6sdgzsxi6aidehx9hyg2d73xtpezx8syoht1jcwswfis0o6eez6ht1k45agw9i65ou2l3xh8ifgzn13uio5d7h0yahm406f5d1lgm7wf9k82p8fe5f4m',
                errorCode: '2nwg6pkn9fqp40phuorhtu6y0pbbxhg628ylmaw11slkulea76',
                errorLabel: 960819,
                node: 1941165629,
                protocol: 'hdyss7yliwfk3qq5ok6u',
                qualityOfService: '54nwo91qp1cwcg7rmmu1',
                receiverParty: 'is5etax59orceakwvv2l87brt0bffrf6cyoz062hdtwbj90z5de9labk1fi3ryt20uhrisi9skgdxy7yz1dvmwv3uo34l0zad15pijvfa1j0mu5s5fi5iox3frdq97gpzq2luib087w0t5ppl3e0t61z6cli0x9nf',
                receiverComponent: 'gpjo2ji45hgiifgp7d4qvl7y5cs0h7wms3r13m3ei8pb6o1zg79syzpab5b7td3xsv7oe0fhmk85xme7dpd3a6idhy8rmn62r8r58q71zvqnl5kkslwx7yh1ub84k1gr7ajte6ba70o4owj7nbkr7nfo6wqdfo3e',
                receiverInterface: 'rk8yv58i8s5axx22k89p4krn4bwry6r1w8bhupoeu8vrsq6oswyrvq6140edtxjfi6sbunhitb36c90e3upq5zm732tmnkrtw2ikq77j6j5yiypwotylc52sein6cbau21a64f8enagwte7a01i20k839aw36t6o',
                receiverInterfaceNamespace: 'dvq865t8cjcwuof039gamzqo1rc0n3s8crplsbkwn2xrhd0tdao754y760f10ez77mbdfwuw1ffu771d81r12fmvda08178gtq8bssrrp0i138thqi22kls1o9m72tqyzznkyq14tkjw6amyzmvll4uoiss7zyph',
                retries: 3084135234,
                size: 1709769593,
                timesFailed: 2435594471,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'pmzrgz39e36a80dydxc2nzbafd61n67pca8s645udobnl5ys3j',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '5cjxamwwcxn7d2bytw5x',
                scenario: 'c45h274pbrjwoiom9ha5dwkjlcorzxmw529xgkei5if5kex43l9enlu5kss6',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:52:14',
                executionMonitoringStartAt: '2020-08-03 06:12:46',
                executionMonitoringEndAt: '2020-08-02 20:52:53',
                flowHash: '8cbq2bu3le8t0vv4kgmfetjj3dznkrcc18vrz5e1',
                flowParty: 'fn3kkzol57yifvgoykx2x1qmw8fguftxpfo6xj212rpsrzmp3cbm91qavzblj4c0ty0261jd9kbsqz1xj5hz5alksirojuproi4xwwgglmj5bzktnwy13bg1lz7letq9lhwfmkq4ekx3gj7h8577tjyimsu0o3p8',
                flowComponent: '0pmow4t0hmcq0cneet400orgewjsxtzjmqw4wvy15puilpmu1z9gxgu11cdjizg3wms8neqczdanbdn4fdi23xhrheox45j7tkavc0oeifgc262ber5o0s6nteg8ftmadnkvuswocri4ack5qqwtdgbn0582ql0q',
                flowInterfaceName: '8sre9ibcv2qktl9h3flvder1satot6gbygou1zku82uspan1m6cfnyywtcf8xjuvx6tvwyrc88f6t3u8pxq7c34nd3kpujdk860igburmfgukhk1fmkv0tpt0kxxnaw7zsf64gwd3k03opg9yfk78p5yor4y4ch4',
                flowInterfaceNamespace: '4zv3vdhj88h7fwqef54ib8st379kymoxstvwmzpr3sgx74x8gnffnfzlgnbafo8l31r0acyjkqsmwsoddwkb9yeoo6celnz7dgl5pftmvj4vm4gd64wzdg6jv9qvhvqsnz4puxtshooerndrhswyz081xlzslmc8',
                status: 'DELIVERING',
                detail: 'Nisi error delectus et commodi et necessitatibus et. Pariatur officia incidunt enim molestiae. Sint inventore iure aut consequatur minima. Sequi totam sed. Accusamus sit qui fugiat qui. Debitis reprehenderit iste cupiditate aliquid qui vel dolorem assumenda.',
                example: '2gpjq4kie9h8i4mocb70eo3tcjuwyuslm8hrw15uvi1khjihwdtk0y75068oclmxxnm8h3cg9eboixxtlgfbziga4ru116ujpg4dlpyl0nkznxdyfmafnv9z2m4nzxvi64wvs76rqedtsoggtl6xgayg7lolod6z',
                startTimeAt: '2020-08-03 09:31:21',
                direction: 'INBOUND',
                errorCategory: 'd39anwg1ij6xw28mukm2dgn4tg7ndwxih8icf9x4zkdcg249td6l5cw68ckxnehljdsrfqv46r6d92xny1t0oliowuxiks5s23amyby88kuxrp49y9e0u5lk6q0jrb557v5vd74agozomg0libtq4t3gxm1800oh',
                errorCode: 'e87aaql2z4caurfcnu23iinzhk0kgnsurbtixikjm04cigj9zr',
                errorLabel: 950815,
                node: 4022202863,
                protocol: '8zpd69bx1ink21bf2ypb',
                qualityOfService: 'nmx7cc7w91eizeioapz3',
                receiverParty: '01n5dn5989ic769jvs0eu3p5sayp6wdqc96hkigzc3vzw1nbd45547acvfexkrnxhktktuq2ztfg0f0nzzz9dthwlacbhve813d5bdg5i8nhwxcp8qatjh75e6cppja2qpswrn7zrp614552ckeu9ez02l97p8nc',
                receiverComponent: '0ztdtu1myk53boqw48t7mjp27tfe2fu33nut804lam5mdclzuad87w7ca6mswnyumj7h0kovisckrgp0ucl7vn57tgvlgjfiv36blmalz0x5gt4z96ythtjgac6dnw9rv7mab64fh1epd1w979hm8pj2y12uvtxrk',
                receiverInterface: 'q9p5soepslbd7y0f3gvjaoec8kvmrpglq6yxqpjidiwi3vpmd7lt9u5ev6d4mkvuuvpgbp98hm9t1mc4qzidgj8xkbro2gd3o5fb0n3t9u6f59s2mwudpdn1sndkolj7d2wika6j8dpnymz5pbgqsdoye37vs9n1',
                receiverInterfaceNamespace: '5d41i1u3gziwbqwx0t9emeh6676ac6u2wvzm83l92076yjq7srkro75qs9e1c71znem95i2ndc8oyqg21qs0e71nwli3zyhza5my7fd37c7o7pol96qapnl3lulk1tit3x93mcrwg5wg0fxgip53d0ebd9x29018',
                retries: 7045782854,
                size: 8272659744,
                timesFailed: 3399576207,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'oqlw1khre24yhxemtpmvyllyd28h9yp5yhjo9c0jckpyirxbom',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'u9yue76xy1ichaz1gi3o',
                scenario: 'nhj8c1e9ruef6tbhm14md97aggaca8pl8ui7to2gfwbczbmm6wxibdkwi5c5',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 00:48:38',
                executionMonitoringStartAt: '2020-08-03 02:54:14',
                executionMonitoringEndAt: '2020-08-03 12:57:50',
                flowHash: 'juacsekhkcih312cpnrmzzv83jjl3e3b4wqojsz4',
                flowParty: 'vogdvru839b4412qgx7fuddmz7o76lf83uc56lmf2ym3g4zlwe1aedg99de408q935ae888txym0te1uedzrqzleja1j2ngfg30o4h6kq7929w3btlccw9c04augfgfm73l7519cqkal71surur3cxvn0kqe4146',
                flowComponent: 'y2netl8nuoezss9bcbh99ve7jallsd55w9vdxz5du69i4rm9fh89gct4g68owzliz2mn9qaeh7ka5eq1l94qysr4gd94s8mld27b8ek4otsztt1ty6jzxtq2soo9l81k4p7pzii9622nspon9m4x25jnqnlq6xi5',
                flowInterfaceName: 'y4c2bfnbh96iwpwjkc191kyagz8bbnj26ft6ob5u8s30h5nn9a1q4osbr1eeosmq2gpaz9q22um92t6od60ws3k1rnw6u0kxzurxzpfyuhqensk35na8s8rz1gyw4msq0eh5uxdbyl4cj7eyt9qr6nvuoineui5x',
                flowInterfaceNamespace: 'et61b2yuw5bgwq4xij3uloaiqodlp48rlk106kibddvbf83h90j8hd8l74oa1twxbnjcgsguscr0x3zoxydhmxq2pqb5tvaf7ofxnirbpjanc41j0y87ha7a4liq3al57zn48eq168hrzo1i4kzyuzs3nmaudbmb',
                status: 'TO_BE_DELIVERED',
                detail: 'Magni qui pariatur. Officia dignissimos beatae culpa iusto culpa et possimus odio. Sunt dolor eligendi rerum excepturi. Numquam non quidem a. Voluptate aut sequi ut alias quo.',
                example: 'erfte7x0vt52wtmvt12fleeiyxlo3baosk81l7cypscz7y9wkxtcl2ihu3z9uhjv02rfd5udfyorz1ngg3gjqr5kfxibqnxisnqy23v9soqet0tblrilwk8x2x2rmwttezvmahn8kr4abulhomru6l0rpqd4ztmq',
                startTimeAt: '2020-08-03 11:38:50',
                direction: 'INBOUND',
                errorCategory: 'q7rhrkcjqvxzuzexmq5gnb0w7reo3j90lhxkscjqts1pi67tukmhm7anf4jnmrxcctm85v10y7iacgblkoo0x3p0vx9g0fk61e5v9348mbwuvv450g8576qi8py2fe65ivexng68pghmumfwqhucpnrkr3mqfpfo',
                errorCode: 'm14uulvxved8se68e3u62se1yemawxcxcxwuseji1jjljx9csr',
                errorLabel: 852676,
                node: 8503192882,
                protocol: '8lc6ltbkct5ptd3sv2ig',
                qualityOfService: 'pqf0n440283m9g1sc8pp',
                receiverParty: 'hyhycitbfidirpig9dndpmoeb00bgem25nw3oqt24nr7iijvghdvaf18rzzf8f8sw62dkjw9uqtmqlvjex32fn7x85t7941bvaiv7z0v89vi6lk1hj06q68sennmq3q0pzr6n6nprqgzs5rj7it3oegwhl2zbq1q',
                receiverComponent: '7pyyz4mj29rj2ilc0rr7usce2iml6tl1t56zsoq2b9hi1h39olxglljis70hd23lm4ecwavh2trovx798d226evr8crc3kpcxg7tvgnan3z259m4j4tvbwm5e85onemrsw04bzi2vcn3r5loqa2a9m4da3pipk7h',
                receiverInterface: 'ow5sqof3a5968dmjdkvmtsziwvaqt1gt4orluk2fecps2dedp8zpveuxg421w44gkcb0zsm2bk5behzspslygv73v72k5kgaj4olk37c331ms98q9vod3a54vlszmi46yz81g0fmzqhbgkytv574fq5mfya5vvjtg',
                receiverInterfaceNamespace: 'tbl4kkjahvqztexb74gsuia23puscncfnkyeof29c0tlh2sy7jvl5a1fblct6nh4jomtyze9qugeyl4lbqagp55wcnpwze4homewfuxfmjegi4n5qdgtmpvpugs43annxzhfoq2e4ijfh0scrusd85sgkrh5xynu',
                retries: 2512360503,
                size: 7752482914,
                timesFailed: 8453639175,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '8q8b8vch84u2asnias8h1b35qb2u1iv5da682hsstkvg3ilvw1',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'labawrw0982akykb1uqk',
                scenario: 'tx5nlcqkxtqdqmv9g88phdxguao9653z6eff1waawtbh4fhliaiey89g312e',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:58:20',
                executionMonitoringStartAt: '2020-08-03 08:29:38',
                executionMonitoringEndAt: '2020-08-03 13:34:58',
                flowHash: 'nbsj98xbfn6tgu28hy3l8ktx1olx89cyuxkeujhb',
                flowParty: 'xwzp2aortx1lbnpvra47188w3xapw3mq99l482rzfb7modzbkko6n6v8rqy1l6hezut02xrpkiuth3mc8z6o5bn5txapocu9g9l8ul9ymsk8r8zgvszvodatosrtjxtt2dvvnu8ri57nuz27nathvtnp6pguh4nr',
                flowComponent: 'ymfkhob0zm1s791lzfb6tnf4f7hkrxzhernz1uwmsf77zl2lk4vky680a5nn2e8ijrdxuijygwgwxk7zamm7akguzqmlxu87mwmrrcpcmz2fxf05wgjxu1ovzvyjba9ctitdch8ck796hwdot5i9uja4iu12d20s',
                flowInterfaceName: 'iox5hhvxirqijiuum14i4qywkyb5is4cmqrct7xt9bsft9umpnn8y5m895gthh600kclx8lcmkwtfu9zqomxk1sxe2wtomyyqk7wqz5wuq3tzy023ocefk1jl6c7siazt1lynjgzgr1zty1bgokg56no1529jrjv',
                flowInterfaceNamespace: 's88q1opqkx3moi1oc4qymm0df3v0eb0hoif4hsb90cwlm8r9f59a260dd6zjggmwh911xbnxxdo9yh22sokowdb75htar7bubr8ekw46r2waop8gd7tp3ky9710n6qpcko672xa063wcbtrxgo8gm5xi8zehkddu',
                status: 'WAITING',
                detail: 'Corporis in nihil minus similique. Sunt rerum quia voluptas vero molestiae dolore officiis quo temporibus. Rerum et est. Iusto non velit. Consequatur in et.',
                example: '96ls3dvw9p3kud29xnqjrd8x57hctb2b9j6aiq2pc2y9k2bqzi687waj1udorvgkdquj3n3g7c3wff6hdas73ktv6qs3kv3jbq0d52amod0k9gwvnordf6n8wgc9qgoiw07do4ijwuzjw2oc64pr43hmiw32tuwi',
                startTimeAt: '2020-08-03 13:28:21',
                direction: 'OUTBOUND',
                errorCategory: '50xea4vvnmdufe67rxrjjje6pcnpw8mkexb7wlyuttyj83wdvri1nt0afa55hejbf9uy2iypwxd3gygyouh30xsu41teeprju2to49vm8lllriaxfai3nrdp2rd0caj2vc281nkbtpodtq54hezlxfwq2unwkem9',
                errorCode: '17h4it5a3yqb6pvc4fqlrqmzhonecd19wwxgb9i37h52r516xj',
                errorLabel: 991255,
                node: 2406057292,
                protocol: 'w1a3x38jclhin54h15ep',
                qualityOfService: 'b2x83ryz7vbn6eurwok6',
                receiverParty: 'b6xa0xt50dnpqy847cuz639494immc5bsemcyf5k95kyojsnlqv6psmg13xroaxiqo6ghj4e2l5xl51jjmtj8hdtnj8f8kzdm93ydn6hvdm76mkbjvorwt84rzmqdtws8756ulduknuy571lznl9jd9hbj1435p4',
                receiverComponent: 'pxw9m7sydf029ntuyzm9kdbms8ofe9uc0gbgc84r2zm0lxbfna00zlzq74ww3v8gibu7kis3y4uu14bpgvopolikhcw3n45v21lumlbocwo9cr40m8qtdaqjjuvcqumw74gb524rr5cpjn11besk74nrj0hdrpdi',
                receiverInterface: 'tj277fl9n02i981j4a8uhow1to3fhp198668uqs2a8xfewuri4ptqrdew7lerzwnkofzvhjaqzsf2sjgp9wi6377b8ky6f4r7z03w7izcff64cfy7cgox3odcmm3takmt8jgccbebsw4t8qz44ejv9da97pozfea',
                receiverInterfaceNamespace: '09b3sh01gnlem14l0spypyg50lst1nvlpiue6unffqrgta8ia6sknkvr8nwm3k3socp683xp3m6mely3xmnz6068kaey3k2u698voibrrhpvrng18ctn4orzs65b482fafa2c2dmz9i1c0d63b7u8a834l6r0hs28',
                retries: 1208535177,
                size: 5709010231,
                timesFailed: 4643446105,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '46c09v6fmv3kchirj1ktdiw2o2y6e8uppygkyiraqbniu604mo',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'jjbiemfth2n1k90cnpao',
                scenario: 's3tzw2eetkeemz0djy1185u2kfcso7llcytw10l6vomhyp6odym1a5k6nbg5',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:04:20',
                executionMonitoringStartAt: '2020-08-03 12:47:36',
                executionMonitoringEndAt: '2020-08-03 15:50:16',
                flowHash: 'zvwq88jb83cy5uy3d8dhelik09zydnahh1ebva1g',
                flowParty: 'dyvgj1q9juhcvcmbmng8zg21vi1u8a3lxbxgcm7ahkhoussq1mh6334rzyntmlmgvyyd8n8st42qqj9o4b4c19h5e3ohxg5k7pp2ctywf0h46eezz9nusay2ob0dtgs5ru9geda44hscdfism0gi390gw3j3j59i',
                flowComponent: 'xdhqylcb2hiost1pw80wezsj9vg933b4jks4aemhbmnmxuj43acrafbedwssegf1zq5btixk4fs61tsccemuep4qjoxt9mx9ty4mpzy7zp72rua3eg6xgm0ndb4uxx1mzys9b7qn01f5ssg8q0uku093yyybf7ra',
                flowInterfaceName: 'g4qwajg1z4mkzlt2mcc58rct9q3cdm3ko0uuiz82xbbym04n77wkbwz4k05lno4x4nrpccmdsjtpj50ssgbmsybucvmoikfogjrp6ldijvlnyqcf1o7cdl9xmymasn03r7cqsv7be10sqguqyulsvbgm2ulkc5mv',
                flowInterfaceNamespace: 'pj825sf80sczuv18evfekf5zy168oq5j2uny460787rjyxuwp885nl9eerooy7u2xwo7b63d6jklubn1nhfe3b4p1hrnmdza0s8lu8gl4h6ke9wmq4bua009rnuttd0vea782ka7f2wjsl6vluasc5kcgiagxepj',
                status: 'CANCELLED',
                detail: 'Fugiat necessitatibus reprehenderit animi quia. Doloremque placeat blanditiis et ut sunt impedit. Sequi eaque numquam enim quo eos. Eum et eos quas dolor repellendus. Asperiores sunt veritatis et quis ducimus.',
                example: 'iqaz8k0ddmrdn0fc5rwkviho87tenwuxtajz2zghu3vj2nntmgp87kyt3ky9u49d0eioo0g4qxuzk2mb9tjsjt22khpocu8li45tmul3o9cwg8146ymus4sdib6ezfbjrgooqm73maqyqq7t51ctq840vq4nsab5',
                startTimeAt: '2020-08-03 04:09:46',
                direction: 'INBOUND',
                errorCategory: '4s3r6lsh7st67079873o3mtuf7u81l5ip0tq1eq9a9uup01zg8d06ukomhnahzouiou1j1nkelhu35kjprtxrycax5yz6pu71v8td798leb47jjibp2uk1royd08njtey4uj9559pampn6di5saj6lmd0xfpuipv',
                errorCode: 'xkgppdf39g7k3s3vr8rme8ubrlnf2887zcw262fkqacd128ula',
                errorLabel: 901648,
                node: 1920810444,
                protocol: 'hxjermk78ef3q6f9j9xr',
                qualityOfService: '1g4dzsxag0jqzxphf4i5',
                receiverParty: 'fbsj376to3fp1hr6kvaccci12czjb4sf8h2gq1uwipj2djnw4xgtboaqm30c6m4mi0pphjt8ntfy67cdle4t55a9iyiencg6ltvhvezl6a7kqq8wztk7tn6xtabz9638ew2pzxzfo2a91g7jn63c5omgkfbv7afi',
                receiverComponent: 'qz992v3mmyk3thpg1q01l3bv152ku9yooh02hz77te4ks68m2ev3sutpdu58x3k8wpm8djy8j5e9gtsvp4csmzaz1m7225namhzned2b06fmka4ysaskgndwqlaa4thpalgrypz7weky2j9ez46h0r8pvd8g5mu1',
                receiverInterface: 'ug2fbq7z7q9mexxf3n09g4giunozorjhz6mownnil3dp733f34faoqyvnu6ip7eoc6rag4ut7x1hxo2mq2b1rriepxwp0q23ksp4yfpkdnln5lx4usiekmt9eym9odad83ljcrxzta6oyrgo2pgruupkk541ticu',
                receiverInterfaceNamespace: '3nzd7x84bw4ak343k4c5u5v450cy4krt7m2mj0gramrsfbx2dq76opuzegcqwqb7pb82tf5egg9jsmk0wf35g0e2e2zm4etnjgbsh9iurfmelmwiho0w9406c4ospp1ra5wyj9nlo6a3r514sb64sraw5a96z2y1',
                retries: 79215918860,
                size: 1731738579,
                timesFailed: 3355922123,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '5hqcgmvqf5uzbtdvv6nn6cizclz4fz1spg9vv3mmrk76u19o51',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '6uv6jhaepl6n002v7htu',
                scenario: 'uj2c69ni0ex7x65l7whv1dfdvntpuiqehn2w9pocd877dq5b1qwvavkl63ti',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:09:12',
                executionMonitoringStartAt: '2020-08-03 00:11:03',
                executionMonitoringEndAt: '2020-08-02 19:17:38',
                flowHash: '9y8pceupo4t6wqxflyvr2fxx9tayxlewe278ecgd',
                flowParty: 'hpqy8mqrndgldigtv5rv8zi34qfmedjm0q6k519p2pidentk671854c81z70zzoo3avuqudn3bnvy0p473rugi3twg6412fmope6lxex812kj2mi6o4blcx2jksmfhc6ewniaun9jv3auskdk4tvh8grcxrjazsx',
                flowComponent: 'aykle55524d6vn6vatsvqzywy1mj1opy705nsfigs729zn8ex1wc5eqsbmhnbf39ayrfmdjxiq8ggbftendkic4n3x9jxc3i19mhy1vuobhl1aa65f3vf4pmn5oqaxl8oaj90z8whpyfnf38wmhzu9wo187zwv0x',
                flowInterfaceName: '4c1i8mlm8wg45vkjye42p60brnk0ykzbf2mfj1jlo9joy7khngx54xwye703kd1mgwz4nsfnikyv5cwznzju3fo0c61wy3v80hj9q2d3qanuunhpuse55zchgwspku2dh6ul80c4qfey1ncobjixhoc4koazkf0p',
                flowInterfaceNamespace: 'z100le2rxvshe1dn73ryyze3mrhcyswfaopd6jf0pxs3wewwadv6f16gmw575l0n59ie5c1s1fj96sk6idtgzhsegb776vt6fav24cvcd0l7cmce1u2bcinuhg7q1x0qu51gkcl1o69leukvhzmusp9gs6cwwyi5',
                status: 'SUCCESS',
                detail: 'Commodi porro et ipsa natus rerum non omnis ullam. Quo in facere aut placeat. Nemo qui dolor.',
                example: 'pcmoh9kkig7jo1qw5jbpk23dthgjjmvcb6chbfksuwm9hnq6cno87yxxnlg3p3s3ghfqtgwmp8nlxrhogcalc3366sebws7mxxny1t3uyv8zwgxsasce56s4pknzte6ce01wmc4m9hoh4xzzn69gcicjxhikl9o9',
                startTimeAt: '2020-08-02 19:32:13',
                direction: 'OUTBOUND',
                errorCategory: '1i8kwxwwpa7qpvx09wfjy1d3zb9qu7zq7wfrn9c3woqqiyze1kt18hdpej9w4nen5e7dcmxtmwaovsa9d3gfqz6riwn2cxizvx7lkrzqhdx53s2fk8zjkg4l6ruv8dsnxbsx3q0kj6jcs7pvlyca7l2aqqxlw9q7',
                errorCode: 'hnqpm6tdwfsc22i2ob08ctksr7ux6vtk0sso152r1uqbskc2dg',
                errorLabel: 887848,
                node: 9529162415,
                protocol: 'smh5me5ugwz1y1b5tbtj',
                qualityOfService: '0mxm53vsezab91vywa0v',
                receiverParty: 'q4x691drcfvz1qyokcdeqezhasf4jiejm6c53ui1ucnp2asszzsbwp22wf97ovs45iwh9sgrkvdsmwxsnwvdvo6iicz3vtjjbv3tqf49cmqmds3qlexs6bftrqdioiydkddod4o5q468tigjff6sbibteixdlsjc',
                receiverComponent: 'vfde1ns36q1jjmmt92sdmp71s40s24mf4bhhiorczmirucwosf9l99llivajv2y8kodvd8houkmo70r10tgiu693k4qopg5vd64uxr5a356pv6cqpgj1qt102h2tbb0ii1xzjxqr36uxrkfxa90mos67mgf4xn6i',
                receiverInterface: 'gk18tl16ngbgtjbkjgshqtm3a673uz2dddly45168idiwe3xxlnu5u0f3fc37w932do3ohkwi2zpf3jag0uh1w38zdllegbpqv3yl1a726ghws5n8rle2k64n6ruk634trw4oze4nb4n1rzwbuhxhox44t4ktolb',
                receiverInterfaceNamespace: 'mb10g4o69bl737sfr3oe3bszkm279h3w5tqh5qe3f9lcda1uf8y9tarfthvndorpw3h81h933o8s5nnuwu2z13evv8ea1dplomnwlbouzr0y98el1mljq4cmuw0hhgnolq75845fodaseqth09lm6r1jlq6brbg0',
                retries: 5518484250,
                size: 36598171030,
                timesFailed: 2720782977,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '6mwnbka0lsyqlkn0zyiluj6rra7axt0jjsmjb5jdya1hlzgusw',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '1i73c5c9ydjek9athuyo',
                scenario: 'ngefx1bwdy2yohhu1qhite49tgjw0j09gwgmv5ipghohqrpz6bscmq36j67r',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:02:58',
                executionMonitoringStartAt: '2020-08-03 11:07:19',
                executionMonitoringEndAt: '2020-08-02 22:46:44',
                flowHash: 'keog53hg83z1vck796jk57xja0xeu4w30bssom7h',
                flowParty: '7f9acksbniweuhec98s5zub1l32moj8woefynzs9te62x7o1xorqsjx2m8iver6vlx4nudy69849fory2gthzwoeoh5dnmpbokl0abm6pfematj56tj29e1cj1iabzqqdstslmi4nv91ei0960ecbryi9lhajjg7',
                flowComponent: 'zxndmdpzf85565qfczcm3pmywvdkfracfj451cecmht5mrn6uv71nuzfbhytlg854pvo2ec6jaz0jwvkzxo3rq8raufda2jw7tg9jyw42tneotzncdlynw8oxt83u57w1wekrk8v095q04d48dsdgm47v2ey1ren',
                flowInterfaceName: '048nnuqx0oqzplf3xq2v4p675s99x9clk3zdtj6sxkr7mz0qiqa8wnpts7frmw7d48yfhu7mx7r2zqs60uknzsrla73pbsij7nvjzwo6vbq5dlrp88lrbz7yoknh3z0yankr5eps27hvmagf3vchhzmdzlkq08vs',
                flowInterfaceNamespace: '4ymszaaluv11foykyjsp98r14f57f4icrzctcn5f1jeaxvt6y9gdbt9evnlonsh77jftlikcj3tgkjmeichqcu2izq0rozh8wsqo6bgiguwn4g2x3061kp3sjz44zf1yjk4k4ivgzw1sh2an9puh7639enpv3jyy',
                status: 'DELIVERING',
                detail: 'Enim temporibus sunt fugit. Tenetur perferendis laudantium consequatur consequatur et tenetur ea. Aut est corporis repudiandae nihil. Ducimus quis omnis. Dolor libero ab velit sed explicabo non non.',
                example: 'biuw5zkiosr1imwg3nsou7lbi9eink1l6e2fnc6j1wiihgvnq73dcvezjiwz7ahs25b7e638u5x88axfbrrbt32azuewvl6inysama42ax984850l7wbrz1hwfgnv9j5jtaxvpodcannq1h436g9sq9wfu1cehbh',
                startTimeAt: '2020-08-03 11:56:36',
                direction: 'OUTBOUND',
                errorCategory: 'bjos5ii48651t7irmzucedcufngyet28nggdx925reqyjv0208p4z394okkhkah2n2y7cvd7denvc134mnsw07s9segc5i8xv6nzf2q3s73ifdtxtgxswn5fzc2iurfajth4c95z2dfcezmlp0s1svkxynrtjobo',
                errorCode: 'o8wh21tfcyp1j4awz8fhwuq1geoelnukh8kxvjz9zcu48jrtjg',
                errorLabel: 166849,
                node: 1684807505,
                protocol: 'q5gqor1irn2qfd6tuunt',
                qualityOfService: 'cuxy0soww3q9efygu3wd',
                receiverParty: 'wkv3bn3c5nbne7krxbnxq08j75nxgqqple5x6se3lqukyiauo1aj200t7j7nh5s3fuy7cd9fpdprvvx2z9zesvq5p094gi72r9o8ibqx7kzg04orjcwq4d3xkqfcm6c2cuzrhj93zmgjgbv8yof8vxqndmqv3t9v',
                receiverComponent: '6uedjsbimdtzi926azdft8rdqh44a5dyct59kwtjufmu02fvatcytf0sk2bvvven4c8pq94cg2310akf7vg385m7bvrwrjibeqbgt6nm5tg53mdbsdpdea7eyxd7713t3z5myeqjz6426mbqz2xbrtpzgmsyq9p0',
                receiverInterface: 'ujq6k3r4c1qpd041f4rp6jnyhlg1hc9wmfxgktecneqwugvapsvfur2kohvufk3t9or4315qq6vdttetl1wxb195bcj9hhehse7xg960wv6i8i3ctnei95zc36gy9qg5n5w4v0eyppx0w1jrmdcm5cdojdq1b76n',
                receiverInterfaceNamespace: 't9rwt8y949cftsjutfz0nej8xk0qsrmyeazbeer3pcju7kjhb3yl20lmv6g9bibr4wxy5fhx7e3jiyg1cawcpt8a59gor45wlb4tf9civoa9huofvtcmvy72efs9it2ml0tp6egjj6bzw2qbo89kdxsrc1qt3y89',
                retries: 1965068572,
                size: 2631474178,
                timesFailed: 54202893439,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'pw497it8ob65m79fu9e4ojh5zo9rfx7prg2ub8owxtbqlsu34k',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '2d4uf94iw18z0f1hhavj',
                scenario: 'c4p2fr4ivktu2j5qa6k45h2i1luqocqrhug1tk776gq0x1o2fytg5ct3ul42',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 01:14:35',
                executionMonitoringStartAt: '2020-08-03 01:24:34',
                executionMonitoringEndAt: '2020-08-03 00:44:03',
                flowHash: '61wsga52rukuskccoiwj8n4vodgsxxbujm41c6ob',
                flowParty: 'wrgdtfjvmu9ks17pkpxwozrzcsgn9ijv6xdhc06l3pexgirdpnoa7fdgyje4l1ix9kcczaz56ey7vdqex7cl8knmi3vgv5dw879nujagu9h25zwfz95mpyx61c0ynty2baxfbd8hf65mp2ritmt48y3hdu2ftqyv',
                flowComponent: 'w5q3e2zm2er0malj3l8in72cmekjswaaujuxh66qgdr1tcs0ojz3p9h0c0t1znl1ha4ewev71ncqu3x3qio46xx9cnmoocgca1radrikshe1mvrcx5ta0iwmyc9vwi2zb9mhzd99hg40cnwhveanbvnzji0y9s9d',
                flowInterfaceName: 'zuocyf9prmal0yu66535ws33wsyi4gzsl005361skxycwn5nziogv7vxt7ygyxg0iruss00ik1jsylgx71838cr17ct8y002a2shkb5dladobro2sdbz54gcbw2xqys8ecgdb4dxx44v80o4q2n7nw56p7i4b3n8',
                flowInterfaceNamespace: 'ib4ircta0tobrxgpwtuglkbomik6aywd29fwb67amwiztpzldojwlxznjvwfui6yentoxk3x8gboxi4rh50cwtrww02uh56q7i222ynbr66dnsot8ssirurr3frh5v7cuacozp7o1vyxzlocrf6o9mat5eethdg7',
                status: 'HOLDING',
                detail: 'Quo dolorem tempora assumenda tempora dolores asperiores et vero. Delectus id hic quia in. Et et accusantium aspernatur. Dolore perferendis autem dolores dolor voluptatem iste ad architecto. Inventore ullam qui iure. Adipisci eum deserunt vitae ut fugit.',
                example: 'fq9muv0gav267p0ktiauckar2tnvjd1jfsy7w4wwvftfllxadxx7fgi01x8m3ey2yaagtr9smtvvzsrlejp1gpxjz4rhbyyz6484r5uyp9l0fu6pwmkvhhs3qyz2ktipej61r8f60vf29arwcice6f8ily46luog',
                startTimeAt: '2020-08-03 02:51:00',
                direction: 'OUTBOUND',
                errorCategory: 'r0gkgqbrosanjv887fkvyws7w998ea86p6qrc2irel8ilg0fyahzrhbvi4amijy44ggyqi6xxgsx8yzay5eeeev431uaktecmbz2po6kkr1tto750izmfq0l5t362nys35emgz936asuycp0irjptqjfdt88ci6i',
                errorCode: 'p5ivdrzq52co8v448yfwb3lycr5w2s0oojm4syc7ppzmhqsdya',
                errorLabel: 847250,
                node: -9,
                protocol: 'bc9nc2sugesdnphhftqb',
                qualityOfService: 'lao15ug7acse8hly4aqn',
                receiverParty: 'ywglsf0zhwaim6rdatbbit4ce6x0opa5bo6z4k4t71q0t965ishfod63bghottvpf8psim0b5v3pyehvkd5uvw2ik4tk9r40ew2i07uzlh11xzyvktyzlbu3f42ht5tog1a1b3c8ox22ar0t8mbmg5jbj4zhpb9n',
                receiverComponent: 'k17kiyswmwop2gvm3emdqymzbagkgqeek8i4dvelzcgqs1exexqu86shidbdahgcksdmc8ntczf5p8m1nnpp2v7a4wde429e919zivi3qz5bn4ihorpa6q8nnl4wmjfmb0zpra9sql4ygtjrh1llf33ravwdi62p',
                receiverInterface: 'o05yl0zkrukjz42w211hetrxt9g7wvxv4trn6vzle7ezxaax6e9nz0xcd52swg147xn17fl5eo3o17bsga6d89jd9nkyloeyy0qw8d62eg2j1dx1640ufyqm8pjcmxbqfvyit8jkglid6ve6phanjcdwogr1l6g0',
                receiverInterfaceNamespace: '321hr5so3mk8y960zohyhj3h00gh2ruccgyvfrap801pxazzc4upttg1jo8xovul3wfhb6cwfjy8s0n9q1kpq8qqxmtjgmhfcqwxm8qhtmmxswqpcg42puyhqcjk7vt0gyjgfsowaa4rqeadzzu7a5bk57jxvj0f',
                retries: 4422243909,
                size: 3591936573,
                timesFailed: 4428971717,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'cg733tct2radgq7tkc2b3kcc7uadktgqfytvbsw5o2tdlppmnt',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'pwihz9iro5x11kct7kdl',
                scenario: '51ym6xefp4ba4wxr9r66bvorrv2ndm7uv9z4vubpvofm4nudgj4uovfmw252',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:11:56',
                executionMonitoringStartAt: '2020-08-03 08:29:06',
                executionMonitoringEndAt: '2020-08-03 07:29:44',
                flowHash: 'celeb822oto5o6u6knz9zmzlbh35f8sgolrox4mb',
                flowParty: 'zd2qutzhk4env5ftd8op7ip67y4x367b73r2uqrgvczmq1yby4o2v2lb4iulycp9ye7ru104m5qvafp0pzqdy5drky6xzg15s8dfnjw6eosckjo8yusuotwe564upxsibancv5ujur2bun3q9vaplhe3ik31cskw',
                flowComponent: 'ih2sai1uq7xgpgest1ji8wl2jpa2vmoyjfhqainiecoikn9wp51sus6lx9qo2kg1kw0rfka0u9648qmxt4ta5n6talfrm3fn4yyi964w6y9wuedg43jvh2d9jn614pwpmgca8rqlelz5gjyucsjzsyh0jep63bv1',
                flowInterfaceName: 'pdhfd29f3eejj6nh8chg4jqidkctbt1706wfm9r1zkol8imkbfsyr2fifc058g92tqr519614t7nsso4vlhm7pyoldslu8ouq56w2njganglwudsgl296bda77mvzp6sju0s56cq9gy484lq4ahvr8fizfb4txs2',
                flowInterfaceNamespace: 'b2b3rxf11ygdnts82ndnda60g7bon40nrsb6retvnipltthuz49so4ztupz2j9c66yzw37yqn0101pfarib7i25kz3lu3ah5597zulzyvs6gl5fi9jwap5fvx5p9t1o6x5hukqr5g394cudnlrpafxb80acwho2k',
                status: 'CANCELLED',
                detail: 'Aliquam doloremque culpa blanditiis ut modi temporibus aperiam. Amet qui quo quidem. Incidunt earum cum qui. Et id dolor fugit architecto aut dolor velit. Est quidem illo.',
                example: 'tc9yl0lmqex8upr1p4rz1yij31hritt5gut96ifp7llqrn4o73ecy1vd8uc6ykfjyghrfmkmcog1snstsd3cu8042assbhut4zvgrfppmm86pwreffnokub5txs581v2x1fti4yq0rc1y0dyqo7vq46wnltu7cfw',
                startTimeAt: '2020-08-02 18:38:48',
                direction: 'INBOUND',
                errorCategory: 'unx64u03142yx5p43ee9v6fonl9ljojt9o72vxcpwzv7lbpcpabwcbbfrmusf2yvkr6h8je7tm7hrygce8u0nnad6acmom96buzsnj0mf61x7v5eaknulnfym32epfqa4ic9pqn18us8nfxufukv6f6gmiyvli79',
                errorCode: '2ctvmxe0riza9dfplnffhsvw12xebhokd1y5jpkx67a2ak0r5b',
                errorLabel: 866990,
                node: 1103783169,
                protocol: 'f2po266c9yyx3ig5howb',
                qualityOfService: 'o8npzgaxmflftl80v7d9',
                receiverParty: '88hnrnzawk65cqhm8rwtu3yprukn6um9yswxlu936se47hmbnlief3hbl6en9e205mycxdezwa8neuxgx7g6ymqi5ar3q38ch2o1at3t54xnmncrm757d4mpcelojmkardmm0tu99qgzoenh51rygze25vgg6aks',
                receiverComponent: 'zc7zsywshpkj8tyo2uj0y852j87mpvm1l4r395elwpf9cdrxbxrsa5vkhivnq04ktqldsefazfpopocynaeai4e3mlsezkivl23ojul3kyg6opuv4hkc7lvzzw6mugca99jkwpaxix10l8scf9lyhz2z85bpkls3',
                receiverInterface: '1kk8mbdzrbrtrl1vdlod0y78hxvglygxpek31zng6z3fedpy25smhxrsoeej1qcymegmoydadjrqfc5biwncjiku1b8bxcnzght1z9dzwknv6tensnmg563g280fpv2f8jjzco9a6d8be0n4n7rdtkt8wlt10i6l',
                receiverInterfaceNamespace: '1radpqrzjh6yr0ib56k1ax5ulyq5xrggjoxwuhhggnnmtjptn48dusrfn5hya6sqvg20js2pqp0f0uvrtjoogxaqmhpmvpu5j85jk2q0qzf0z6tj9hwcu3n8e2x7s9nw0sdu5xwf085bxi22xtmsiwi80d358398',
                retries: -9,
                size: 5962724330,
                timesFailed: 9974220151,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'mu6y4or9g4077izxk3hivkiu4i7h3979bvtwt6h6ctt4h558i5',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'm7t6x5koeg9hct8cn05s',
                scenario: '5ej1plrjjac4v1laaczuy16jyx9d41n0b642kzalt8bio7zx3tvmsgdb3ihm',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:42:29',
                executionMonitoringStartAt: '2020-08-03 03:12:02',
                executionMonitoringEndAt: '2020-08-02 21:55:53',
                flowHash: 'vroe7fvy6q642854f8tar9kdjoopt4jlg23ssk41',
                flowParty: 'kc5w6f5ocnqdiax4a0jphj26kghtvu0eeww6hyeffjxn1zcau5o8toldgckcz7zann18on27k8kh3no61hlqtlk9td8c292y57nkjo3m5bknxgw388v44j3m159i3g8ao1l3klei9g8lg7bpi2kx2h0wlxliaorb',
                flowComponent: '121u9e99291bado2pnxzs0b3u286p2hoo4y6geh10qppvj6gnpti2tu30cr7eo42wivylo79jnwimbmom3f0steil6ekbxo3ngaao8u9ahkxb1p0e7tkldcz1pan2tpszykxdsuimtv990q6ziefu4slfdet6vta',
                flowInterfaceName: 'vb96p5cs3rxee8c14nvkax02l5d3bfbizggv063ou0predvgvrhprao1czi3l9niw5e6akw702gw2jhcqp5ij6q074mxnlbje1ca51hqwqi8rx6auvuxx18dfz95x8e80cp5n0camcxjsykh7mmw7pj1y9ktm1xa',
                flowInterfaceNamespace: 'wzz4jxn935iawnst3ne6vu6vouh11zvf3jsq2p18osuipsbsnkrchy6emmh2yhw780u44s217bcg5vdzivn1ax6a98qd4qcotj8x43czj6mdoz8r3159usv68v56jcrlo1iv8t723wwsb80x90kss2ncye96ew7h',
                status: 'HOLDING',
                detail: 'Sed aliquid dolore. Harum id quia quibusdam accusamus ut quo esse et libero. Modi magnam accusantium quod itaque a dolor consectetur nostrum. Ut in quisquam qui dolores recusandae repellat. Et incidunt voluptates quis est esse voluptatem ducimus distinctio laborum.',
                example: 'oafbj357vldppn80u3doelcwc7ml9sbcf1hxxda3wm8a5mzjdyakxnofc9om9n9hvq2x6flmkpzxr9c5nmi7ka7exc9u2bcbocv9bdygyjynnexocu5qzscqilt2zj92t0vxy2jr41pxbbubfyeemm9zu8eg0z2l',
                startTimeAt: '2020-08-02 21:06:31',
                direction: 'INBOUND',
                errorCategory: 'f9kdtfndxb7ccdcskcdfqgbtt76uqvx29r121pqr6f2mm9xdep88lheo8bgfnefaih89y8cqws33izdlnv31a4urktl4huwcqp8hjyqmeov6e8ucbxzfueotdtthjlnlc0a5tvcm0hfa068fjbysz8awt3wkkjdw',
                errorCode: 'h69yphx5ru2o65z1vjg0uy0o7x6x0h4zyeqw7zzm428pdwvp5w',
                errorLabel: 795154,
                node: 7416143655,
                protocol: 'nl5o8tm94ilz6wqlo4w9',
                qualityOfService: 'xy3wnowchhq02y31c0ap',
                receiverParty: 'qbp03foqqze1r27t6m1dqix3xfjdkai29b6u9izujpcdzqhrkazkndp58ywt5a7u7xj6phpaypy4bm3od1b8ibndps3o2481oc5wfxklnqdikwpe2tqjakexzwcfv4wbdgg600wd1cj0fm8al6wqjaf83yhoe7wv',
                receiverComponent: 'qx407nvbtqqwec0j9085791mntyjqev39tokr5cd3gemcuf0iypooajalz4qjp863chigoazmnxymf107dz3g6l759s9o9cy569ieum8rx3jefgd06e3cs3sezg3x9v9bavaki98gtjjpvmipj2as8n8sbuiupzd',
                receiverInterface: 'zztp2q73b3fl7g2s6g0qfihyhstiox3zngmpyfbn10w8pxevv64010jr2lecr22bm4v201lo9jdnn3elb47zav88du14wyaa3b6fpskbozp81sbq2vrodt9scoak8jvlnmxltcwiva8zt7ejyp1vv8x8vhe7za90',
                receiverInterfaceNamespace: 'mbpzd9hl39unxnas243q7yc37zmdd85j6d1uwbz5gczh27yh0nx2j1hwiodgj4gjmxtg06xr4usp1d407kprl0pq65o5i4mvepul3bi6hcy0zv0itas1v7eegl5kgxp6ky15e4o79jz7agihruxhqk2ruxpxv39x',
                retries: 3077318613,
                size: -9,
                timesFailed: 8264913602,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: '6qpe1fxamm5njv8eqt93rpir9vv4n3ncrv81i05h44agfrxk71',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: '5ndbdetzkczjgtqoizif',
                scenario: 'wzh6i1xskyfq1teth41eyw424vhn1q2pq4p7sqgozyrc2saqp4wwv6l279rp',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 03:52:51',
                executionMonitoringStartAt: '2020-08-03 00:29:50',
                executionMonitoringEndAt: '2020-08-03 15:00:58',
                flowHash: '3nokl0dwzhiie5xlzilmq8r98limn5p7gsalvp8e',
                flowParty: 'q6rved9hbh0qvbbhaiyeds2hh1xshh7ib3tf43ugfv5lane1cjktzwfr776elngor7xrn7y4l458vuh81w21z8xxav3sqcnly3e4gvyy9lggl7568k5a0rkp52wo2298e24dddbcfs2no6xn5qukauwje873ix89',
                flowComponent: 's02xj7ildqicvmva0x1ghu3kq2jeev4zfh5ao9jm3scgxp3i0um0la8k8ekfijxheup11k5k88ivedpkdeniy99jwfffbjl1vlj1i25wfy0yh6olaf0sm7axhpjjg9bsqoiepth9mml2db9wgk1oub65orblugbc',
                flowInterfaceName: 't4btoy9bkloas3of5qk3tlvkctav3qz8vqykdft41i82vsjuhph6p0jah5trexl0ugi55pl1emzyy2uvyvdwjrekm7kd4iqk24h42bi1snzu08jbm2ljnb89779n0yrbtk6a86af5zyfu0vxk5bmdah2qqdfy1q5',
                flowInterfaceNamespace: 'bmo2wff3h2g730eldafodnuuildm0ghuu0vwhy400jivppdxrl7l76p5jwajla7r9pr55nbc0jp59biyki9ipj73l3p616o9519345mc73cg6uc5o0aa376v46e2mozs5gora1webr1kzszqpempwo8qydfuevt0',
                status: 'SUCCESS',
                detail: 'Error asperiores magni. Quo perspiciatis hic voluptates distinctio. Doloribus fugit sunt ea minus animi fugiat. Expedita porro ut cum cumque.',
                example: 'viicxfw0e7usdair6bol9eh85p9is24x2feqz8tcovy9zaj085125g4ondg5w4k9mejfek2bzebd5q9d4axbsydl0izk8ucjwq9rmz3me1b38ta32fpqqngmb6ngbxa69or0gka2hffod0jbxkg41ynr305u6lo6',
                startTimeAt: '2020-08-02 19:08:23',
                direction: 'INBOUND',
                errorCategory: 'jg1ptx0zgtkgsqugpaesks6j75izywlyg799ntg4ck0yunpbsfdzfad0dm4f3cvoobmxn9feus3zr4pjbzdn0bxakil6wxkgd7ah8o92f8mga8e2vk3b97nv4wjjvnoxx6kafptoll6qgcv4bca0ptfgofh5cf27',
                errorCode: '6z2mfjkz9nv2vvv55hrbzyqntj8qpxjd34g2cee6zo7pfm5p6t',
                errorLabel: 486664,
                node: 8044440416,
                protocol: 'kb5x1cp6rvbomh3mklfl',
                qualityOfService: '2ccgkdbifuki7lq4g16e',
                receiverParty: 'x00vm2589lss80847g4uc14ugqvh1xvg0xohtm7fq7vad0bvhjl9cs2nycrutof2m5l4xqxkj355rv7ue632h7l8cgencdbk9phdt4298f83g9k6nb92vhxnsttds6rt9ind0dth4p2aqqxj8dhtkvmjfp7bmfa0',
                receiverComponent: '92ln6dyr3got57vqvf5l4g69dmd8j08xdg0zl4679e0gms6krf957nbn9kbsezyf4k85c7khfd8bb57v2a6100v007d7ymqh93o3w15fbimtsvqs30bbq8behqislj43xlupy8ha04pdas8ys4gfpsvodjn9gb9o',
                receiverInterface: 'bv9sfymbwwivnksmpy191wp1k0l0wm170k5zsh5wj1a66jx3e1ybgcnrnxucpzu6t148r4qme31eqzfyraccfjr9rfbyxq03cpm1z5uvy0od8r5kb4yp5n0mdmkfgocxqr1ilwr5m44eclprugj9t6rue5qogdyz',
                receiverInterfaceNamespace: 'hnc44jbo4hch3ur5ahenbx4edq1w5n4o8uz5kbkoql9e214ajj4lvmpb0wofxby45yj3ce9jll9fm2778d9atscuxh52penwbwi8iftlnfu94mz67j2bk5z29q6yiez55z7ch7tzorbnci1fzmizofl28xpze010',
                retries: 6141994472,
                size: 2750846719,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'k9jr91lu9h46t5244ufn1d3oqpb08cwtm703pvw3907faptuf2',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'p6d6cwh4hkt1y344gtaf',
                scenario: '68w0ckq0dbg1lutirfxscjtmrq7y6uqivdd5s84o6ccxfs8vnoz3ety2lndj',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-03 01:55:51',
                executionMonitoringStartAt: '2020-08-03 11:58:09',
                executionMonitoringEndAt: '2020-08-03 15:28:49',
                flowHash: 'hxe0c0pdixhk5xw2jc647t01gg84qnuqwcodcmsk',
                flowParty: 'ynmksjv7itaz0wshqbmfgp2rtm636ihcq5n8l9qn0tb498faynqf8xiklhax6ske10yeif7ae4ludwwnoflo6m57sgn4aolqovt0y33gnyftatjwhwrzj9slkcffyx6b3j3yzh1veek2gp5pmuz5nxbdy8qhyqi7',
                flowComponent: 'r7pb2n1lc81tq8bl4cznuzf2koyoj9zhuw2u1sifpei7okc0q4nz3vkaxe2rtxehwcu5go2ztwccppk1fn4yq85ea6echawn0lhn4o2ipbt8m2eynsny7ou0ox5sn686go30ejy9f3pbcmc1663x4xhr67qof58v',
                flowInterfaceName: 'dj8cw21is3fr32bpx84xry9ptragqsifrjsf56if220lagli46fgoeoly437urj64fb0m89rol2fzymguhu1x9svdrpmuji9wnduhviwau8z089brfj5xg6bejossumnrzvf09tdr2zd8jxvozz35rnu3uf76u04',
                flowInterfaceNamespace: 'kqvbetr4nvb5lizyfyeer8oke3yfqzf4ig1nypo313xn33hhi5le7997oszob01bbgsor5yf2pf9uwrgvqqicvnu9801dy6ntyo8sq9ne3kqu72cpovtew1gyl6yqqsgy7ys6k3y0tf5s44pyx9ytvaxr7svgk6g',
                status: 'SUCCESS',
                detail: 'Consectetur officiis aperiam molestiae qui delectus deserunt esse perferendis. Est a sed soluta deserunt. Quia odit dolor odit porro. Occaecati reprehenderit doloribus molestias doloribus. Quam fugit ex voluptatem.',
                example: 't7gltqxbeabdsd42azl8ikydow4trwu3y3oxwankkiye5r82t35bjymxzj95jf0liz9uxj95t0qfsaayxgexm1tzn48sxmj41v4df0a6jxns6e3a1vzfyii35nvfrzhfb1qb89fjablt181v7zeta5cm0ckxypou',
                startTimeAt: '2020-08-03 05:59:37',
                direction: 'OUTBOUND',
                errorCategory: 'j2m0k2eeo0ivgrkb452cpfvhbsdad0qn0jg76fkor5yshh555f6wf29zrbcosh8g226ynrzawlh0qbjlfsnbjg3nzd0rb6khhx2sfy6ibekitzu1dkd51f5xhpacmha3hj5f8qhy8cpdgxleh642l0si8onjpx7n',
                errorCode: '9xpx0rv355n5hnipybxojxlnzlqtw4v90z9vrn7ws7ahby61b3',
                errorLabel: 970810,
                node: 9990975639,
                protocol: 'kvya715oasyh4danmh56',
                qualityOfService: '5gg8usjc578dg6y9ry5f',
                receiverParty: 'suzfb9ak1m8ds1kddlelmooq97jujipan0nkzqffthtzrbtsc5adjofr4aq42s63zk1ikrrdweewy0rexq9gdueraj4zhpgwcqfd2lc6z1r9ijtpfdh1lx90juzyv4qfu6smdzzq8hu3xg6qym5t0bkn09x8k0w2',
                receiverComponent: '28w6l21hx3y63tdaqdvuzi4xrutf4ys47i9rf8ggxw6xxnq6z99k80rmi3txcvg4c37e831lfhyspgcomw71ewvgy9z6e1v8br64ovco0bsn1smw7eid9ej0hfy6jtaohrzmwdinydpefstxs8fttdfmyrqujckm',
                receiverInterface: 'kv4ojwyov8jhfu2rqkz2t0hzf0snrvytnz6eh35g8usw6sq3z9g4sbh5qwskgjcaslkd80xppol1xf6fdpdhlc6avt0we9pt9y392qk8rzwn9fq07ih31tgt9tblxz11i5hhcmf1ct6b8b9567goahzr00tc2s7d',
                receiverInterfaceNamespace: '42mebujh3wxorzo1xmhdiffwqkdmsaih8ou04vjggn2i8t9idc6jsjp6y9leihgfdmbxgrrvh7h5zkkp8guuqfq4mwwnq1l156ye31tbqy1z63jysiohtcx42ssnxxul7nbl7zhzfa9ao7mehgs6jny0itd77cv1',
                retries: 9331531172,
                size: 1585392133,
                timesFailed: 9058090912,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'rm2kkp3uvlwdgjtznptn0flnhqcfivb7j6zvu1u282fm65yj9x',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'qkwp6okjxi2vevsxv4d5',
                scenario: 'e0r8f62bwz5c6axiolfukd9dg3sgnttd627bv9isqkzilbw5erbx508zfsxm',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:13:47',
                executionMonitoringStartAt: '2020-08-03 09:29:43',
                executionMonitoringEndAt: '2020-08-02 20:58:30',
                flowHash: 'xdpvuismk29w1aabfgqal7i13iggmsn4sucdnwu2',
                flowParty: 'zlf9evcrkt0cvlidahdkbip84dlzhp89q23dvh3ivki84p9v0rw3qdyycd5vo88d5t8ga4apr6e2vac453500bou7cksz11r0vqz5973mo15brta3li6yb46lmpwuj3lp8lg8mb9ay1x98i1vza4l3gyfy22i1v4',
                flowComponent: 'jcorevqwbmnesg4suwu9ed4fwg5x1h1ay1ara9wdgcmdbw6v1dfm8ihb1lk9klv7o1y66lvy3swqhi4ur5pc2fgj5q9axiuwj6iwcsjkop2g38doc71jmi490oj4se5uhmxl5fxfif3uhxjgtr6lqq459er3k52u',
                flowInterfaceName: '73p09ckhjhm7ujc5kbirp9bvse3hzd5b611b26kviynabhwzjboebq3i3cri8x6nkbgkf9qu5156jtcxvamy3w9xidua9brr38lmnnc0il23dw90ud2cc8p0fs95w48c8qovtrtk81x9ojvh4dpi2907p4pgegn2',
                flowInterfaceNamespace: 'df6fh2vrn6ffxbcrnb6f5pm0wk6d5psdiephhb00161vaofx9azmm1pw8290x3myhvmfb87m3cz5kc9gvu82x1vcexkpdgcszf854k5atsge5ybsy9w4ukk0mr46y2s5ze2lgw7n3oqmoxw1n5v05i7gk49he4sr',
                status: 'XXXX',
                detail: 'Est expedita et et et saepe velit qui. Facere nemo est deleniti. Natus ullam est qui quis est a. Rem vel fugiat ipsam consectetur rem delectus eaque qui. Dolorem eveniet quod accusamus et tenetur ut tempore voluptas placeat.',
                example: 'f2nvr718w1wl70txtnonjnm97cgyjp1p1kfnicxtvp4w7x53xv81oo64qmo3br93iq6slehfvvesubxlk63g2pdgd5bboe3l26m2sh4wge1hl49m7g6ts67f0tb2zznjggrkkh7kli9b1af7umtjp4dfwkncpppp',
                startTimeAt: '2020-08-02 19:04:22',
                direction: 'INBOUND',
                errorCategory: '0k2utg0wb2ecegyt5r7yjtmz633ltgolxa6t3i27tfo9f50mi10ubpituze8kgnu1aaez9inmtepojqwnc2g99t4tjx927wvb05lwbrexnj9423gl4jrtqxg9jc40hrrd9o8ym8b5jzagkrmi3tdcqyj0l7g849q',
                errorCode: 'bey84hswdp8j0sxvhvymxapf7mooqm5spy1fffusva5zq7kl1w',
                errorLabel: 670275,
                node: 1317052412,
                protocol: 'nawbnz3aej4fsvfg0dnn',
                qualityOfService: 'k6wg3lid9ks97baq3ph6',
                receiverParty: 'gfhdith9iu94bcd3lwbgsoo89lq9fke0aasts8gr2l6nrlx5hsx5393xnafcubup89jlstq10mps7musgymdceq9v089nm9on7bhn8ga6f5e5mc9ts7jlcvfsyjen6azy569un3gs1uyy1z07cxaszmtab68briy',
                receiverComponent: 'gkkki3m98zzcff3yb12into777ojcmgzos6a67r2d3opnbskdz0o8405yyfd1foyu7qym7ve438zh2amdxivlx50ye2ewduq2dy1i81pdki3v7vtwj9lis1s0pgswkieezk2otb1wecp2v5d24opne45ulc1o7et',
                receiverInterface: 'hf7fmfidy0axg5ztigi9c0g2w3jom6c2s77z5udqtlf5zj1ltffmzsq6cwfc1moh0n2h6ewri606ssxvct1tedctef0k5yzrek27oy5utmgmy4tq97qdrih896xbp96rzo1b4p2lrfxgb7jc8cog36s6ku3s3kq4',
                receiverInterfaceNamespace: 'w8ah20xayu69m96gvt1axew6yrwkcla7jbr98oudh62y6afjjto35rz1q56tpw6lmwhij65qzl2pf1pu0n1oap6iua0yiklv6st0bnpudjt5oe3fypvvm2c6c6c7zo9jia7o5in0xoqr642klh4ntb5av4wnhrec',
                retries: 8595428472,
                size: 3799143263,
                timesFailed: 2908932052,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'qrmyndyxklxc0ppb026boi8chpreo80p0pqcchsl9pg571xfbc',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'cbyx3qzt8xyda48sy0rg',
                scenario: 'nriwmwnqahu9fp31ef7nbia7koz4xan0vav051a0454km0a28bbleusxbvfl',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:48:11',
                executionMonitoringStartAt: '2020-08-03 16:26:38',
                executionMonitoringEndAt: '2020-08-03 14:12:02',
                flowHash: 'kwlym505w2lgwzc761qe3hb7rbig80vwu2cd6tot',
                flowParty: '75f9o9svwtoiq1qdo5wwnz2htwq2h3ihrb2i24wbfy2wmtz1ishzuene2682f1bf314995zre9plifkidh91m5wb792aiu44539ii55a9rls9cnnb2z27g566mlprgawd18q3j9xumtifeqyz8vy7bbz45bdut9y',
                flowComponent: 'wdjgn9c898fe9hkpgsdest766zdfv7mru36203etvj0qnnvvqkq4nv9h7t9k9zjand4nskwlebfjtyz5wx9j85ae1cpbmlrs2p1a1hbln47yc5yqck8mj0acf2ty2ykknz9yz023o5re4dga8cnxqrgartjq5767',
                flowInterfaceName: 's0thl7c7o3059gmhodi90zuamqon5fuqo1ybyznogjrxwgvi3oc213r0a23pn3h6bzw15ea3l4fyajfsfsx6etwl4xxkabywge0k6dmwihjwe08xac197wb2i9r2kz16oveo155mfslelqmhswep9dd1lno1i6lo',
                flowInterfaceNamespace: 'ldbtugf6j082fws8s5kyh3k3pwqobhihkvp4zpy3lea5n3bpiogk0cgxia55jcf5pcusfkn2jngyhvn4sytfwg9drdcxgfhz3wp4pjqez531lqv5484olfim25616biizjtmduz3bit8fvxs2l3jy9l2ulg34aed',
                status: 'WAITING',
                detail: 'Quis ut optio quia quasi maiores sequi ut voluptas. Eos eveniet blanditiis soluta maiores sequi rerum et. Magnam recusandae sequi sapiente nisi.',
                example: 'acxucgmwevu7p40n0pctbcilqvlaflzu9zfrhl0swa11tk0ij0zvds3puc8mzf0il26euwwivzdwo41brmpuvrno4rj3lddzcy1aogf18ry6mayhkbnm4koaf9fv9twnpqq0d2d3mj2h5y93kmbe7q5a0j6cskt0',
                startTimeAt: '2020-08-03 12:50:42',
                direction: 'XXXX',
                errorCategory: 'jph09ne8q8546yx5cbq8hogenlrc8y7p2utfuww1adt6e8grb24yzwictfztb90vtskic921b4jxc00459zzxfcnoa0j6jjc6g8mch3bp079fsr3ktv56x5j719jogo4sq4cxucopxe3z0ceu8k1284sb5w9h7n5',
                errorCode: 'opse5z4g1p91f0wfjpsr2ignreev16bw6qcf3nb0wmw06y08n8',
                errorLabel: 704824,
                node: 3577468943,
                protocol: 'zjl1gzzrl0ii5pxyegqr',
                qualityOfService: 'wsfsml179jif2bevuhbd',
                receiverParty: 'j4u5ycwal778s3uwbokp7i07wr7zaei5ni6pg5pkffeuxmwpf6ouq36bzxuemws9hfzeppz48z0cnc37z5srtmyo22qjsq27qpqvse66011om6rn1erzu08mpemtcfi12ar074o9y0jmcbkqa2ahc5mvvfgou170',
                receiverComponent: '8j3cd0b38z7hg7eqyn14yu8epztv5a6vlas5qhqefce3gb1zmba4k8m0gj2kwnuq5ni8m666rbjhkteuq970tagr84gb75xxjlw2l77x2erel81h9ivcjviipxati38yndxkq0zt171qpsee9gsocuu0264dgxju',
                receiverInterface: 'bi7fjuazee1ygmd3mav3pff9svv64umqmgrgkltbb5zrtmd4jnu6yw3kwji1taxolcpej90vhqq2gqy5bguf1dvett03yekap1oz5zal0c0dhjczeamu1n2dz43jdxqz72221jrn0p4igwc2fdezmgw2aketbpbn',
                receiverInterfaceNamespace: 'glhfs94xyz6bwt8sovatlyuldiy6sme1mc3mi2h55upgoilrn3o4t52blacef95n95xvtvo8k4230o8upu9rsn38fohgb341uqel3vt4xmh345nqn5ciklmsbdn14epfgroks6d62i78u7kf5le2y92e2avm4tva',
                retries: 7172481015,
                size: 6159381875,
                timesFailed: 8747499455,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'mo9ldk6uatjlzxri03l68xknlojzifc2e6gh01ptec5syxb9du',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'tsmdduo7vs376eon5o7g',
                scenario: 'lanlqrol2pyftdb5i4iw71yaa26lexoau39zwqcsujqy8oivpx17qla6vrnd',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-02 22:26:39',
                executionMonitoringEndAt: '2020-08-03 18:05:11',
                flowHash: 'obcbfui5vy3oru0pta3b5oe6j0j5q905hkzw9dw9',
                flowParty: '90rean41u468amf7p2kh6t4r04rv3z88la9vzqp1utug07wwvvwi20714tl04ytikbpt51c5wiicebsya9fon98x28rat6zukbqgzily0ly21vej9dpvlchuhotb7xyr7hpb7hs52uvfy1zx6x2k0ic90svtoec2',
                flowComponent: 'icvyjs6oowpcjuhoh8wregjy79pd8dlke2ndpqzswa5lmy2f8cqg7tcblc2e4joutqce3ea5k9lcwgr8je3qtlemt8uw1it16xww2seod0cwmpf6wty9xonyw42hsvyoo5twqv0ehoxkwimtlt2rg2vqvrhxp9hh',
                flowInterfaceName: 'jsm6vztnqara4yxov75fv2qaddpo4lsjc1pck9fkvoju8vslmub18trltlx4p069ipttxsrxhtkspzoejgq95aq4ikv4de9p0qeg161grwh0dvma4bmeo0u8nh601l931g9m14opx2nda6uj6xusb9cw2dli162t',
                flowInterfaceNamespace: 'z43lmg2tqgcvlfbhwk7ofca03g94bf3tehaqkgb6xefeos60slztgzky8fw67mikz7p8vgzoxd1osgwkaap54lgvcnczsyu4fhqypxtv9duvpqwrm2ce7nvj0q3ghzr1g45887zdkoazpktc65m8og2jin3wnprw',
                status: 'ERROR',
                detail: 'Sint dolores vel delectus velit. Est voluptas aut libero doloremque ducimus. Nisi enim aut porro asperiores voluptates. Velit molestiae aut vitae consequatur alias aperiam.',
                example: '13q2cmwh9btnpc4hv19q0f4vvjsayprt34za8lty9yhnmgs9p8zid3gxef0k8dbsalu996uq3phvyc89rvw9srwasnmpdg3l5fvmiuiqod5ep2vw1f7sz9ovf1s6kqo6wi1qgs1fnrapwh7ne9yeulh1di3dybp1',
                startTimeAt: '2020-08-03 17:52:51',
                direction: 'OUTBOUND',
                errorCategory: 'pjw7keivfp0hkixlrkb4b0254fea6a7um1ub9wc0u6spfoi4wugrrafjagq2tkbtvzq2ln6qrw0l5gtegsqzfsbdc08ips5i0apdr17z36n8zcey3tdlcfwcsygiwob9zzmaaaze00phc1cpr1d6sttg2s0nekj1',
                errorCode: 'xw0si3oc5fo9lp7x028l8uz4tk6l3u8rmladmaxypg3twhlo0a',
                errorLabel: 306283,
                node: 9387933263,
                protocol: 'dz2ofvimtt87cnehqmh8',
                qualityOfService: 'g1jigb4xyttsemq3oqse',
                receiverParty: '3qrs97zwfejgw5pua8nb7jm5uh8kgqk1zdur3vasu1odu7jr36yyjfpp4mvrld8qgdlw0yxpykuwjc9rs8j7zsyyh9zstp952i6ke80umnqe0syf2jyizfhffg07c3d9lmofsdf9m30543awikvife88544beru0',
                receiverComponent: '1wy8jkvxmlp1mzy9cci2mpqnekony1b1wo6x49pwmf02hlan471ihot2pm6bfnqg9qkdr378ruut6pntsfvdcpd75iw9mit0pd7bjps0jm9lhgk5azrabp56bq7tfut4j91hoch0uzvz5ap9761s7r0txtlw6b87',
                receiverInterface: 'wwkalu62h6c8lluhnuspc5sycaingeio1yvaoo2mrh7udax52imbcdlvpd4fnp787ay8i74xegnqzqtz40xf7ui4jecu8cy2u574nj34vw44dneabgku86b93d3zp06p4a1ehjpymnwcdfn7adpj08b00vepqguw',
                receiverInterfaceNamespace: 'pkyw4h3cvwa595y7ftlt6moht5ab2o7szwogdr3ul3e2uacjbf5ygtdy4p6j3625nd9nvtuwtrv3tn24dax200vlpjojk9me03692t6kl0u1yw6kkuyoxrfmi1zs3z2dgqutwgw2x8uro82qe9h9k7gayiwn4jy4',
                retries: 5597099549,
                size: 2420529293,
                timesFailed: 2971492905,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'x3bhmnzans4mp1gfpaynu26tzwbbcxc95veyb68dq1ba2lhcjd',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'o2685bpp0776mmcbd02x',
                scenario: 'erb988rlh2oaucg2vi8v3s4r6sn5zm2whchc3dim1y69fvsupc2335chsf6i',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:18:01',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 00:38:31',
                flowHash: 's32hso37avmxa96ik53ufsbccjla24b71bxnrxq4',
                flowParty: 'sv7qcslubhlm4sb8f05buwm8pnfixyizjlgg95l8794fgxn48b5f58r0veowhg6ealq1cxzz6o62i2j62uwxqxexvi3vzcjfabw5yj0w67c9qd5uho6hvipgslpwzayh3cj8v15tx6d1r1xqpcuu6ppz49174jee',
                flowComponent: 'xk8hso55tzele34o376fdtnlzcnmeb4t0x1bv7ku00g0fz10uu8ml28p6r31rsyco2ruq5up2jmndnl5c86vk5l9dmocy9w01emjojbms0s1359jqup3pudw3uletejqmym423lryb63t5yhsezboyyevqdvrufh',
                flowInterfaceName: 'bjy5ggtapp2fkyk931wbn1w397p64eqwpf97y2pw8s93wyt1w9yggd75c1ecu9pcmdlwyv5c1kanl2hldndrhoex2b0ijgx61fd3velavxmd8ysxkkvopnw3f6g1z61tizzlcqp3ra4gxppplye5ijh3seoqp5n0',
                flowInterfaceNamespace: 'whqgve0vyliwe47iuhxof7l0492mis29i60ik5bj0zr02dvjv1dgba2ndm98peh56q18cfp2gj3zatottrxz0oi1fgyypylkur85roke0m81l6560y0z3i2agw284jp7983kppl5ky67aodkyhmapmg79joenycd',
                status: 'ERROR',
                detail: 'Deserunt animi et ut. Voluptatibus asperiores nulla minima voluptatem voluptatum ipsa nobis sequi rerum. Consequatur voluptas officia aut.',
                example: '02tm8r0q9oglt11hs5evmp5tqzpqh2yatxj2ns78meg3bl8zask9kr6p8f2s0ds4wpo321grlraped8ol0kewzp8ucv628yd8tixlxqbyis3h5fou2il03fxr8yjzpayc4307gbqezbs2uh1pwv7s3245gdddapt',
                startTimeAt: '2020-08-03 17:26:08',
                direction: 'OUTBOUND',
                errorCategory: 'll6xht79e24zaecj6w22qq9jys5oj1flemuvfmx47m16ndf8otcxpfyktorc2xner8h8p9eos3aec4c79l7cs913e4sdfsrtvjqthb8cxk25zryd2s01q37plftpj5juabrf22wmxwnccuxyf4a0v89pa0yhvgia',
                errorCode: 'ugs80n8lrxc0pmmjz5c5zvplisj55nndv3zh71ph729m68dx9d',
                errorLabel: 125954,
                node: 3530923568,
                protocol: 'hx41itm3sbe0p4jeui2h',
                qualityOfService: 'wtke7ldvrr82bzdq3cn9',
                receiverParty: 'nz2ybh2z7icaddnunmm1x6c8nsxsyhc2rrceenrefh0oko4tbki7yzekbw2cwqugy9yv8s86l4iiiya7c5v5piy4tob6hb2sktzwjew41erx6tvtf80poik7rruwhfevhtk6rr658l8l8a9rqad9cxyk2gww3ubf',
                receiverComponent: 'ef7432o4n598ozccy46a5mx3ooc8xbir7pq6jndry5qg68jwanw9l3uhib1vav8ofrlhzepcyurfwhj48q1fwdetvtdsqarrlbf6elvfuvlz2i2clppelb3ja79lnei2didlt8jv2757cdhnmvbu84uu0u1fvn27',
                receiverInterface: 'mw3sgrwczp2eoh6itovosqv0qdrlqe3ifjah6kxsv97vwzegsiqxxlagz7mdn0czyavvxzcgunzxd3k2zjzrxg3uz07pahn8w1j3xrhyuu10dxo7zbh0lt4xg3pn5k6h553zrfvgmpctj61u5nktb4b0nki4qoyf',
                receiverInterfaceNamespace: '1r60ivefr30gh39stnnfgnd6vrsnj191fwpd2qqbjhwxfbksn5bdrq6dwnqecjpy7dvl07ihx1qye6la5kh0ukacosg58ok9va3zh7oxskhc4zrg7f72ovo2nwv7pxq7wmed5cqt29j2j2ymowii6sdmckqyp077',
                retries: 5519546598,
                size: 9955812458,
                timesFailed: 8667830082,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'r2lptdtnrkylpifpyy1qgdq11tsyxhbkwsgwx5dpongbwi2lyz',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'viiadk57nj0inf0o7hht',
                scenario: 'ubpvnsfhoxzwprppliemirsn2ioclhz0p8lqnxq8p76wmba59ujr0wdr3287',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 18:55:56',
                executionMonitoringStartAt: '2020-08-03 09:46:40',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'nhdwm7w2slswem6bnfpcg7hc7nu8wje0tip5hcf2',
                flowParty: 'e6ani4zdfdbw03q421lhvsxq6u96jrxngmqrsk0v8cg8joaia1c1yjgremy0950uvbuaoscu9a8jxeuynd699fqgzjyhrygl9h4vpmdqf4erkbikolu21tq4gp23c0lix2ys2qhhn2nu2dh4fvtbctyn1w2q72kq',
                flowComponent: 's3gy016f9ohwue3twq18pg9huq99v0xz3emrh5ezpxj38cvlkaxhreprgnyilu3lpf4092u9sf3qwdu42tvg61prv3bm3yisalhgwf945ywenb439hj56tguojq9nzxauyap0p4zwucf1pc638e6m89807f1xryz',
                flowInterfaceName: 'e3wzxyu09b0l88637kg5lhhmy0tmev267q7bwory7ilh9a53cok8dqmomd704f58gy8bqyu532cxckj99bh9jup9to80bbgidfce6s0oi0zy1a11xba6zsc641pun0ofhlk0kmras0rpy0eqgseyb8me88w573tt',
                flowInterfaceNamespace: '47cq2d7049xpkha6qwirjfquqxgrg8ilc0cynrtbfvokis8j2nwqgm104afaa7kkrutryxwoapnywbg88xdw5x9xue2edb9r9gpddjl7evhrvr645e4ro5aiyg2zy5ugkglwjungljo89fu7izv4wtp7b9mggadr',
                status: 'WAITING',
                detail: 'Est ut commodi cum labore vero quae in repudiandae id. Delectus suscipit et doloremque veritatis. Harum consequatur magnam deleniti id autem ut. Nobis magnam qui et voluptatum eum. Pariatur libero qui repellat eum totam sequi.',
                example: 'wll3k4poitjuak9mao3ux7zjwrc4psrcts40ysaqhx2l4kq4v2gc4dqmzj9mtdh29nj0e3n9cdkznvges0gdsu4d0cnnzk3u6zu7zsqyc1g1r4w910x5d2qsmptio5c21coeimjg5bc95b0pv30410myj1vq8kmk',
                startTimeAt: '2020-08-03 10:58:55',
                direction: 'INBOUND',
                errorCategory: 'cuwrhzm6dfn93lg6h6m1xhawgcskb5aup2fp2yz0nug8s8caogjf8c07pahyldsm5rfcjptg71sh04h9zguj6flwoagxzuazq3jf0d7nm60jq9l7i8cb9bsdc5ud6n3g7dksw6ntvaqcnva6w6jjaj9h9t7tr5sr',
                errorCode: 'grmbaonxv1062shi4086nzejkcq6o5aycrc0fk39mod83k7fgy',
                errorLabel: 440240,
                node: 1214975951,
                protocol: 'v95yni6l3saoh8dn8grc',
                qualityOfService: 'nl7pu8gepc0id6ec3dxy',
                receiverParty: '6y1oz07dpshisx7oc7zrl3tlvbmjrsscx2eoidy57dxq0914yvlll3ithr0yulqbmgmbb3wkeds8foloyhp7xzr81uqe5aqlouvkthlndlrrl8pcncm46u0s3soi8zkkplzcq4qfpdwwekozwo8ematlh7xu3w2u',
                receiverComponent: '0lyrgky8u900y7tuq2kmwogn4co76aauc1s6k4j38ubo2ls94u7h7afxyoahy1r30a7h13fw9qtrxkv8ezxi2x85so3sqgfeuyubthquyvsngm0tp10t03cb5e102v78ixx8ksr8jmy4lt9x3ar1a13f8qkulu89',
                receiverInterface: '1vg42xvuw1cjeub0tudahstccdjz3di2dnp1g3aypqtjt294tat5bdj09moxm8wpcmcve0pchqjddo0u73f9dw6e66eynz6lhyj1r7mq361ego62g95tlkkngrvmyfg1tfv81pl11ihggflfl2tb9mgmoyxqpjqv',
                receiverInterfaceNamespace: 'w4hhg98kntr0wx508j87gxpfhxqh3a361aunuumuokwihq4zgp0f9k50ubz5so7gnd3e5mnouq7elf6x6g5vvzqkpv2l18fs575raq92kn40ugt4f6nsivkjyhfx7m9wf739oocwv2nna6dprd3sr3ojrj5ijzz6',
                retries: 1786875839,
                size: 8266891578,
                timesFailed: 6823117066,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'wts97ifd8fk3eujfk4s07wdvvwkl6sh93m5fm9gfobkco8u9k3',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'zj1rd2hphy70qc33vs93',
                scenario: '8nrug3ne3uumwegzyja4c17g0of8fddjo51x48rsyelhfmbpa1j7bwgt120l',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:27:12',
                executionMonitoringStartAt: '2020-08-02 22:35:56',
                executionMonitoringEndAt: '2020-08-03 02:30:31',
                flowHash: '850b558dvnrk3arcii0xlkvtml3xl1mk3ldpgesq',
                flowParty: '5vzehdtox5s9jujapkzgs08jmce2yi68gd8jj73aq0nbjd23esycrv885yyvuc1kmr119spthdzzedl5qoyt4guv81q48211uf9dbst70zon3cl1696wv4z3oxiunm513yltg9cva7lc13az82f7ib6bftuoancm',
                flowComponent: 'quq4jx44jvi3qpks65alz88yjbgstlisbpbdnucykk18cirvt0twvh8fzw0wyivujie0evh9ktmp67c8yhs5wk4ohxis14dwjomoxig1iftblam3uaexh16q9bd67hgf2432n195ac0b5kp6lxypug3yro14lj4z',
                flowInterfaceName: '71bz2kbfcsx2k3zu7vp89l0zwa4xcm5h7qmtf37h540lru2hfn9ltkgg6r6gt0sr5yhr2ulyes7l1wphx1yp48da4qfkjt7jtlh1dysyvcvpob8zuny13y3ghrby931y72o5gc1fehusho0z1tb0yqtxaw6rkbby',
                flowInterfaceNamespace: '5mw8c09t1rliwx3993az9pbh8ovcq715iyhdx986oy3g4ehusyjt8ojuye3mrs3u63ijj84skaqa2x3pye9lwyhjnu1zoazw4hc9ta2li616nz7cqc4r7ulup8lawhfodrh2q2emlgnzct0677q2me4i8rwdz4bv',
                status: 'SUCCESS',
                detail: 'Nesciunt facere id ducimus unde. Et voluptatem excepturi voluptas sit numquam velit deleniti impedit. Temporibus repellat quis. Cum nam quae sint optio ducimus ut non. Sequi modi debitis expedita deleniti voluptas adipisci et reprehenderit occaecati.',
                example: 'wwensgitwk9kt1nshs1rkjsppq5dqoadmt7scn2hk7fjputyjnhk48tnrumy1e3pjm2eelj5wuknx03yrdiw80p694kxa1jjyzkj6mqc5vtmfq5lsqhnqthwdvj52780ibrxgnrw3ui0fqro3zte781cc5g0jc8b',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'ltly72oe7gdc78zl0jvy2sqvv4vho36ztbgo63rmnomgmvxsva8klvgn39dr9dg1npyr01arzk53onyg5tff7n66tpy9qqwhzncrnt1nbj03sii8trupaux93mglasf9k01ac5j2dkeh8ji7wab8ygdbq3nb5meh',
                errorCode: 'tj18u2qh3x8lcaublfqda7zgfej175hudcx1ixtl0g8330fb8p',
                errorLabel: 923114,
                node: 2985346979,
                protocol: 'xtbf9ueig4m14ykugzsd',
                qualityOfService: 'qt2jgwefct5oekosshdl',
                receiverParty: 'g6ahecon6sfbd3irpj73pd1ea4zkq7av3mor6bwne8ath08rrpjmwfzbu1rfypak9cdkbphshesg9siulp6fks2e9la0z4eestoho8fnf2urju00tmmltf80wxn1tbc4uwtq8ibiyn833a8sethhxfg6h06hmknh',
                receiverComponent: '7g24crgxji28ihixi2yj7zavl8l69sw8z1m8kssmespf69k71da56s33p2lm0b1hf3cr631ijvzdplequ81mv7pmmydhsziu8xc2dt460ttu4mm83kjqlyppsmdieympi8hbckl8iefla62yggol9lvjhwwyttxb',
                receiverInterface: '1uv4t5zlo7wf51za9fqvve4m48bot86ltvpz0ptcd4cdiiuolaoocmm79ogz2fst5ig7ji5xoklip47ysjlzgrakpc52n324p9frruvink9ngtno2jh6139gem2bzpg9q6x2rcujyqq5jbbnq74enb1wrs7mrm0h',
                receiverInterfaceNamespace: 'h7b33bm12g9gewm7ne5innwlyvyl6t8027igmpcmwvda1e7k0rus8rfspgo1mwchuplgkmtmka56q8n0l01qellzhktl7us2g66hz4ifvjc4pjr1cy3kqexzsqxmr5r5aoah0npdae4lzc5u44a88snqzx4qh6r8',
                retries: 9124871596,
                size: 3799269807,
                timesFailed: 3883634305,
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
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'a2jtcun4jta2rm3ccfv7n1rs2kj71fmbwyuvlyax5iyhzorq90',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'hl3y1snuy4gms3w13g15',
                scenario: 'd7etzo35tyr1248g3zcifupikl42i4bt71wa562uuvq3hh04c80r1fjqbh28',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:43:50',
                executionMonitoringStartAt: '2020-08-03 04:01:32',
                executionMonitoringEndAt: '2020-08-03 05:03:01',
                flowHash: '9od5adt7bo4flez89303zaba5vwbsvnyosy8ul1x',
                flowParty: 'hpeb66pgpir936sf3n54w8ts05qcu5fvpwk1r5jzaw0y6rr23e9uae47vtid8tgi8vmhyb67hr0xbd9aihw229cbgf7zlnnod4x4u5a7aadcv6pt0qpmjh1f9iuebkczxz05rm527uc0ccqdah7yxw4j8nvjk94a',
                flowComponent: 'f1p0e148kfmvgb313gsnutxxpjxzkrr1a3g1t9c52knpcyd43hlpb1617n768gpr24tsib0xhpnw0a48421ast5832j461likc61du8i7g2dpzv70hvljtg33lw6mzjz8xeyj5mcsrqhxl6zfqkjtk8m1r2xu3mb',
                flowInterfaceName: '70oyimv5g2q8o4u92qb33fhgegpw2jilh36s1fdzxdfundbjxlnvmlhf73qqi6f8abi79ctezpd74mppxq11s0g8pt9zqbsv23ohszowqedntsakgxh1opmune44cqqjfr39nihxliib42bdx0rv0l520fj6jq3f',
                flowInterfaceNamespace: 'vg0r0b0ysmxq7o64jxo51eoqra2gcsdg79969e7wtttsm2rkb3lbg6lgb5jp413tz6lw1jdhqpjnnbsciej786re83zjb792cn286xjjabvlr46qig7wtfkmew1kjqzvxzvqx7ol89f1y8w6ywh7drg3cxzdbfbc',
                status: 'SUCCESS',
                detail: 'Illo repudiandae rem cumque dolorem ducimus perspiciatis impedit nihil rerum. Cupiditate aperiam nesciunt quis ab exercitationem explicabo. Sapiente sequi temporibus vel officia vitae molestiae ut quam.',
                example: '1ytdgbjtbv4lw5sfy0aispxfxth7lk0api8l27fqrjqcat2uhe5l0d5q445um2rq7qoemd2l8s12rro8stb2l7v7mi8amxejnmj1lcdmuho35v5zve7veel15dh3js08z37x1y5kpobc9waiph4girjobylvfjvh',
                startTimeAt: '2020-08-03 04:36:53',
                direction: 'INBOUND',
                errorCategory: 'jbqz0r2sptgjl7tlncmesr9ky0d80lwiegl1h72yv6izzpaxwgxnqbpl4diaiju3wgv2eb7mt7ede2b0biw2edcc2lwhai3dzg65od4ierd6ks9bwbbnko5qvnig6rf49v02vjj61spr4gaitnj2h9kaz3a2cmr9',
                errorCode: '2tj3or09rtpj5j7p6oommftv36oizv5v9om6p53eu97bp3zyab',
                errorLabel: 770566,
                node: 7903463561,
                protocol: 'fqda7u5vv07bsg930qcv',
                qualityOfService: 'zkph3woyms62758m9fqm',
                receiverParty: 'w71tublnvlchje2n7n98wnfg8xyspspsuiffwma5egnhfobrfa09v9u5r57qvg5uwxyk8ba39pbdzn3gvd20x76etxuafua32llpiiwohtycrj7att635n6hynpuprs1gm21mub3qvh33z3641k83swl45fy4p5a',
                receiverComponent: 'vgxv9agyzf1scn9u7ubujrbr0flpd4yi1v72bsnx49jbjackm7ecgl9qtm62aa312l7ctzctrrjs4cvjqshjbbcuifcmt2hy06y6vuvc2omdr624dixmunyth9bqqpfjaqp6bxso4fjbioo6ad6y2vylft6tpqxh',
                receiverInterface: '5n3x5suhlpyuso61hywggumus4gt411k6oojny5klx5k8qtrfsa608l54dpu74as8edyqg3wda8inery6dvcgied14tjhg1na4zqd140a7i53zcpjsmralbh9l32f98h1haphu93hc0y9bowc0xixwywwmadkw4m',
                receiverInterfaceNamespace: 'x3evgdeheorb0zetox6hwbpr04htwpm479bdj49iyiab69yaas5yl652cxrdok8qritjqlw5zmpj2fztvjq3ttmvvdfi5taqj5q7amrxummkwa28ef8fs52at6rv1h10uxqp2lqzzvcuv70tkvhmz27m3myzrcfq',
                retries: 1640996895,
                size: 3467200526,
                timesFailed: 4158296881,
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
                        value   : 'eebb67f6-f609-49fe-a917-35407f7281d9'
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
                        value   : '744cd95d-2717-4c7a-b502-d6716e3180d6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '744cd95d-2717-4c7a-b502-d6716e3180d6'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/081d7b8c-60d2-4372-8e28-026ab3e59750')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/744cd95d-2717-4c7a-b502-d6716e3180d6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '744cd95d-2717-4c7a-b502-d6716e3180d6'));
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
                
                id: '391849a5-0c4f-449b-a409-23dee2effd64',
                tenantId: '45a1d2d2-ca6e-485e-b648-5b1ffa58b756',
                tenantCode: 'ut762gtgagc18o49e058v0xakvt55qz0c66y0g7wqejnzbj06s',
                systemId: '57339d6b-38fd-4c94-9a77-c7558fe794e7',
                systemName: 'pz8v3ts9jad6drlcm289',
                scenario: '079fb8mz79hxxta9cwvinu0y918lco3hg5bmb1bagvix4238j1npzs1klkb0',
                executionId: 'efc4d932-f633-4639-b7d9-fba4955baac7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:29:06',
                executionMonitoringStartAt: '2020-08-02 22:11:44',
                executionMonitoringEndAt: '2020-08-03 04:21:13',
                flowHash: '33y6671u5qizkosahs24xlrzj8dq0yvrtf2oa44j',
                flowParty: 'cqvfjgxegn417coy15u53yf7v2ugdscm0y4xrd9abpnw8l4zvjgkih3d4g7tono5o277pznnie1x5knm371u6e7017d7uwhtttqk77rp6c7pilpee52xxu6yhki8ocmx51t9hfjgnm4wv5iraoqizzy43ruy1an0',
                flowComponent: 'shnqcwbwpd0xers4yu22rg8qjxkui2atyk48k3lgymb1do7fqyfxg3avj2wwk2wmuq2doodnq032efcp5rcgtatz1hlezahapo18vcekzsewu83t35yzrfsk5btxdfp66r30horv3y3tdlqz5pu5moh4pnplbbqd',
                flowInterfaceName: 'wxv7boygv1ei35u1lxgfpe43tdwb105mv6he1wurfd4jw1wtig9xc9xtqkl7pvdu2awi0pwitkz2tlaizhgyy9sf77gy85fd94iq50hwrwzy368q6xzeanj6ohj20vea8r3ye14zsgugm8oj8a4nmn13ra0mmyhe',
                flowInterfaceNamespace: '0d1den56f07q2qeft6af5ownqhgglmdcthoq2987n3ovclcos7tpvpirfnhjpfoq2yvyol9rr7fqgmxkxod6t19ux9s8qb8i3q04q9j44ht01b1q5ztcp0ki4n768fqnpkgsyvxype908nrh8frojfnxu1v9joms',
                status: 'HOLDING',
                detail: 'Qui fuga quod sed. Ut dolor quos quia sed qui necessitatibus explicabo ut. Laborum quia recusandae commodi perspiciatis. Libero quos ea molestiae hic.',
                example: 'z7phfj3ej95dncsx5s5jvm5qcpvebaeq42vud21mdinl8ba8r3fls6cq2mqwhu1lw5e69k2hzww46b7gcbm98yi7t21mtpyfync56fydbofivcn6zy2jx1xe9bqp7q5s4rjxseqaeqra65ydip210qxsqertflhs',
                startTimeAt: '2020-08-02 18:31:49',
                direction: 'OUTBOUND',
                errorCategory: 'ak0axkxsir6pkfx3i6qyxf30yi1welv1fw4l1oax7f4mpexufh0dx37cgyn7gnyhctcneb27w5fdwp22e2jvb7qyanqxjvn72suc804s8g1prd6tc9ro9vc26tc0dxlqluibrrozmgwznogrb4wh7y3ou84juewm',
                errorCode: 'o5qcfb5oyboejfna689st5z759b5mjk29ty71tw04o5sccf76x',
                errorLabel: 708671,
                node: 5502087330,
                protocol: '9tmaewnsak98arveg5r6',
                qualityOfService: 'q4gea555uog838ew04yx',
                receiverParty: 'tym3q0jtk36us6q83gbxs7x5y3u5t8agiw903g068xnaugg5ktbcwim1ynksvmg5z9hq96hk7mf17789lm5wv6d7fducj8nubc0niyprpezt7f7nb7jhov71tdl662gg1kabftci02mjzaimgk0ws6g0db4ssv8i',
                receiverComponent: '56ccwa3m1ojm5eyyhncrs08we4sdxcwu258qomxuzmumzrzmdyj6afj0t2j8bkq7iq4blxt5wgymhpqii73dfr7q77v04y9o642d98zeff0j0rp13etpuopugzjiypajlpno1mbfkt79e3t1j7m0ke1opld2jl5k',
                receiverInterface: 'cjo8y8jnmfq7s8fep0hgiczh9jhs7g867gunpun5pulcexg9ypo0oswdvebbrk1poym63bnynxfl19x930iwsbmh3hlx1hn08l1i4kvw14tyhpxg1yl8t0nbcatd67n1m638irm7oujweyq1qquln0eu5cov7l96',
                receiverInterfaceNamespace: '500aizub9zvvbp06z5f1g29oxikuagdd1hhqi5ccelex940g4c2c21k9jiue5ruzfrgkgsb5uaok128mogbnt8lx630vbt3v3l2lr41zu4fb747jlsw0kprth1mh5pbza24zfgrtbs9wcgaw1351otktpx9rapfr',
                retries: 3132290794,
                size: 9203010919,
                timesFailed: 5351906314,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                tenantCode: 'yaga9x167vdse0bftwqo1zwjqxfbstgvisbr9nsf94t9rzk60h',
                systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                systemName: 'm3s2o9fccf2ik9qsueam',
                scenario: 'lk4podgslqkyvet2nnmv9kz5vxhpivdl28wpa69p6hjwwsnxqqbkxktta4he',
                executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:53:52',
                executionMonitoringStartAt: '2020-08-03 09:14:38',
                executionMonitoringEndAt: '2020-08-03 17:02:46',
                flowHash: 'kdcvumtsn3a2qro0tfvrb9x21veia5hne9j61ppj',
                flowParty: 'mmg57ge34swm46kv9rers61yf0ddy779wo29uaq11dymkp5r7ahka8fbudx2dcv7ykvfq8b7h6vnh1rfin0haktkhgod1v0ewpip0spw9z9bc5yeb0vroriv3gp7bzuj3qnh57v7vz5gcakfc7ne0wgdz6stw5jn',
                flowComponent: 'mda1lyvlq3hjl5rl1m2lytw04brwdwalkpnztpmi1p0gmnx9ukry2irvo8gystmtx3quw49iqsf4ctulz6ag2h75a2z3ycie3waaa3huv5czrazoww9ph5z0ihtjeg83tkfhr3gvxf8siuo67ap9caaazgn2yk2r',
                flowInterfaceName: '9kjaay2wepd2flggnf2wpob1xsk7u9e7lgr8y48ug4ymvq2b307nz2iqogc4l9886nyx4bu6o88ralmgqwy9ykye14hziw50mjn0xee621nejd0xpdqo7h4mwz0b87ig2adfkvn6ldzmcmn4urnkt3t37uknwku5',
                flowInterfaceNamespace: '730abbjhbftab07116kpy1yx7pvti28xn3tf6rftbjw59l5cyzayhppfljjcjypgiw18xw0dnuxswv3sojq93aykyfdy071ddg4ffbombtmlmnerkbazd6aw3sbt6jvcu63lvbok27rm80egm14dkstuxtkou2yk',
                status: 'ERROR',
                detail: 'Nihil quam aut. Quibusdam pariatur beatae necessitatibus. Tempore minus rerum consequuntur et et esse libero explicabo. Sit molestias facere.',
                example: 'lhrpw9w57mflhjw4bd6yhi80ocjz5utjvdv3gqrl4a4uj7ikhn58nc2ws7hzz6xw5tb6svrwtempbn0ezuow5nivb73q619vzf4p8fb1xs51avl76rvyx1dxbyqbrmpeyfhldpl6cl052jmm79pbahimgz1wrlpm',
                startTimeAt: '2020-08-03 10:03:08',
                direction: 'OUTBOUND',
                errorCategory: 'covpjyfydp8raao1qonyjpxyt8gs0ew6pj8m6ayd5wie9s6gchkr1c9psj6ajdy4yvj3w6rbgo95aq6u266hckm5on0t5x5izobokxnq5qzbav6scwrwqle3btjujw3asolqcr5hmfwu24hv05zvhanhpm25bki7',
                errorCode: 's7aoqpvs5whyiejm1tq6gqsteucwv7ui1v7x4jjyzemija1q02',
                errorLabel: 834047,
                node: 7073072312,
                protocol: 'zw7n7shna1to7bt1aazp',
                qualityOfService: 'u6ozmf64t7phpt1ftkbp',
                receiverParty: 'pmjc67je23xtijl8wy8nkxejmjrepu2wdh62zyowqfcavnu23w2mmapg3iysf7lv44r9feefs63goei5kv24r5qtlr53umg592lbss6tg0lie6gmgirkviydc9ct8vev9zvg52uv4qmnfimfmpgh07fc419nazyf',
                receiverComponent: 'yvbctl15e1fntxs24ds0kkiu6gv0x4erb61sakbx2d6tnp89cmnjceqvlrub8hkhyqs1rr9fz280hw466mruxbq6r3zvsei5bbd7tnl28ncuksvjigmt5l03svwdhhm5986uzd7sbrnyjziyvintmdwg0tvj4wvb',
                receiverInterface: 'terogckhrlxu87bslqcxz8wxgx6vg8k4cyufvqjtu78a29yj5jvzl4piqe1q94vzalfxif1x6nelkx56eqegtgsftvp9so80o74vs58zmwvbg70nak58r8pco74546ujs3eb9umn97kg7v5sqs40plhzo5enm4of',
                receiverInterfaceNamespace: '6sw3yg32cy3hd5xbfyeqfi3a2bjs8i98m7wcq34qbxjmbjsvevi2ssgu5dnb23zaxcb9dbr9myp5g1vgtwc9xocuw2dfyqzxfo5lp8sfc3lox5a73hfuwohacc8wwvppdamrfesdjw6jzs1bh6ik39xg0aw6jo3i',
                retries: 8208738951,
                size: 1038010525,
                timesFailed: 7797385032,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '744cd95d-2717-4c7a-b502-d6716e3180d6'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/0a1121a0-d723-4940-828a-d7d39a86d443')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/744cd95d-2717-4c7a-b502-d6716e3180d6')
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
                        id: '1fb1584c-954d-4d05-95c8-84bee058ede4',
                        tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                        tenantCode: '9awvuhtyri673hh9bt09oufwckdqn8dfj88s2s9rkj0ui42f0d',
                        systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                        systemName: 'e74eq1azlcuem2s3jqgk',
                        scenario: 'szq8bmtfy310zrwuxcin8vlwru1w9i8ncf949y9db0e1llbvb28hllsq8tod',
                        executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-02 21:23:09',
                        executionMonitoringStartAt: '2020-08-03 04:27:57',
                        executionMonitoringEndAt: '2020-08-03 05:07:31',
                        flowHash: 'tdcskwrwr5pzfkx6cxn1c74gt4e62h630hfnpgp3',
                        flowParty: 'jw2xlcwmi92l89bo24w7dp9hrkihax5ipy52kom489187gtcc5xnnru13mz66s7t3324sxhwqrpe13yr8cx2snd9cjcysvk2vp9v70hb3yv4fm9tgdsyrpjdj3v3hjb7h6alkyh7xcxvcyj2gr3lmoo88tmttb0l',
                        flowComponent: '5gtxkh7md9dmgu8kriwdi23n81zqyboda4to3hfo142r9a5g4mvtd94h79mkicbcqdrak0mnxstp8jmn3aickdmfnw632wazz321uaj763lp31lfkiudyzm99xxxk5wtbz5gac4rstmaj7okin5y2au7k9p9mxs7',
                        flowInterfaceName: 'pn9eo1cibbfsm04zqqdu3guec3gl1ifgoizkompl6xswx07bdkahdmijedeh5nvb0en4hfauz9abw94825lg1v2dkv7vmam5ntdcvn0qd2bh8lygpjklyu7gi3w39sihvwldyi9cbfy4dieqi9t4qsr9jv52qbn5',
                        flowInterfaceNamespace: '6cdssfcb8sd7eg8otohfiofq3yjz4tywzfckzmysy5ie0broi7hnvyzyj3gnh4587dq6gu4xizbpcgwgp92bv8w2bho77p15hhin5wfxdfyuqjji2htriyiew7btralpw7vbfzbvb12jkayckrgqcytv1h3blgrp',
                        status: 'HOLDING',
                        detail: 'Sequi similique ab distinctio velit deleniti. Dolores laudantium veritatis. Iure et repellat at sit eaque totam neque impedit dolores. Magnam et perspiciatis itaque aut doloribus ut distinctio possimus nostrum.',
                        example: 'm61d8tvgn0kmowppf5k7mxd7y6ds5ijgxgw24orz6kz1ngl1tmlmlvbmeg6lmptpzfy2p94nu6wqxcnk41zfz177o28uj3jui2kdhbzghpoqxp6kjil6zp7m9svz22qz1gu0w176m71vhalzo2lut8rgv24swqmk',
                        startTimeAt: '2020-08-03 15:07:24',
                        direction: 'OUTBOUND',
                        errorCategory: '7j7sqj3xn81zi2b6yqvi7jgznxk3gwyzvg5msud7094jkp0d6bvvic8pq2t8oj8hf8ar0tnhq86q9g9xxdubfuml123d8giycnk028iawjcls6ebfykt8gy2yemt8asm21bbzeat588ijs9kub0j8csfrztk0990',
                        errorCode: 'vuxub1b9hnj41dsts7u06mq69q8a75iyyk8g8oruzoijuwh90r',
                        errorLabel: 654158,
                        node: 2994841738,
                        protocol: '57e32hn3aa682qgiyip6',
                        qualityOfService: 'mp4dcozbwmoy7erjvmfy',
                        receiverParty: 'c9oxdl4wzn6vsxb6yt1d759mz0mbp5xvq5afxr5tt6kqxhj01k38ad86pujp2fssyx6ddt6qa7zwlapj1ct1q02ppp0owkmbuj7xbrzmln09tkpty25bgilhgskhz0bnv67cx0qfqz88tsrt3rwdkv2144o2fqnf',
                        receiverComponent: '0pctkp8ep4n0ggq91z9jd54778b0y8ols391pg2tyxdzwmnfyvnsbj2aimeoxihym254k07d66j1sdj0gj2jc8u001j68jb8pyf4nodzl64dzbae5i9c5la5f09fx5hmqg1d8d9h0delqgw7qo8ff6gb7ru1mfvl',
                        receiverInterface: 'akaz1fey4q6ep60a1jn0yof0df40ubb7di39vxynh88a5rc90fsa33pka3w6tev6jj5o2z2m8zt1xunevuxwfz98p2iin3keewboxxj2qbruq76bk3klu69d3tuxv5d93z6cq65cjfo62iv87neu83yzuzdyldll',
                        receiverInterfaceNamespace: 'v5s1is7tcb9cwyov4l3fbcjel05yb4e20txd1nbne0hwhxcemhl2dmkmzun2aznxukgulkh0zwkdaqgfnnw4198w7gcho2z2p00wsbch2hzf0g6vhue60ln1t2moxjsk8sv9v2jrbyckmrpgf24jumqmaaz7f37i',
                        retries: 2161775784,
                        size: 7507360535,
                        timesFailed: 4883862216,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '1fb1584c-954d-4d05-95c8-84bee058ede4');
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
                            value   : 'e59140b2-e249-4603-b553-ad30f8c5f772'
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
                            value   : '744cd95d-2717-4c7a-b502-d6716e3180d6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('744cd95d-2717-4c7a-b502-d6716e3180d6');
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
                    id: 'b2018b4f-eba2-46da-88c9-ed5fa4162e7c'
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
                    id: '744cd95d-2717-4c7a-b502-d6716e3180d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('744cd95d-2717-4c7a-b502-d6716e3180d6');
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
                        
                        id: '31328285-ab9a-4c41-8be1-90ecb3bbf75e',
                        tenantId: 'b5e2eb39-b8c8-4193-aeae-d2d34f076ccd',
                        tenantCode: 'bf6u3ipcmox747ap8bmkbnv0ptwaicdo31eh029xdksh489ox8',
                        systemId: '53793059-1cea-4b65-8488-da71e430f269',
                        systemName: '2saap63apw7l3iiv5169',
                        scenario: 'manu8ejxw5kitrz2ehrrp003uw9flh567kziseuieohb91e1n1gvu6qervht',
                        executionId: '58b5d4bb-25c6-431e-b2ef-b4293affa8c7',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 17:14:09',
                        executionMonitoringStartAt: '2020-08-03 13:07:22',
                        executionMonitoringEndAt: '2020-08-03 02:46:01',
                        flowHash: 'x17q9ziupv5smlirzj36oe872u6ar66schw6ypwr',
                        flowParty: 'bmpeagfqo9neha7i1lfo67sejquyia5r9m6xkvsn88cetojz5k9yofxpk1s458n8tfk2ei19w0ks3z0q17boxsfnyu4tibsu9s2bg0z4xlsvwp9z4zpieka2ecyn2nfdm7n126qc9wq9x3kx4nuxrfvsflnfhjku',
                        flowComponent: 'msva5rez4rvvi8vysvs73z9un8zhp2h3nd9ddu7pgevev5b4409klhqpnscdg2i4drq36clwaryomxb2qud8pmxaobxttcoz5hbo9xkt8e5sxxjt9jh7ea90xqwqasiyl1qkzb0xe71sh88rc2s2lo835so42am5',
                        flowInterfaceName: '6jqxz4d8sz6yum58tqukqzhz13d6n39359uu3xps87upeowviui5ssauv3xgjt9erbldqqvczavkh0n3mdq4yqdro0uhigu9qdcwm8owd51ojlenihstrrfc5ye0snj66l1iqiaxqmqup1p42z1q4n25surjb7tr',
                        flowInterfaceNamespace: 'l9m6edepqsum0vs0uqweq79qldefp1eqxrhc9ne4wi71s9nr8177scq4j5gfc7x7k9nxpey5asgiruxyizq16h3195jrwcn9odmd2p7pyw4riby62llnvkxanvkctfthfn15jxij9tmc6qxe456glha1ix9lal2g',
                        status: 'SUCCESS',
                        detail: 'Quas minus id nihil repellat optio. Voluptatibus fuga velit et dolor commodi dolor quisquam. Veniam quam pariatur voluptatem vel provident amet non.',
                        example: 'f67ugg6vtk8m0l87ci4z3hclktymx9hdhk97vkimi5npfrfr2dreh43ehlcl2yk4n96ap7q24jb97jhe2kp90dbhxsywaw5fse37fv786vv3f6ilglgdoyct04edzf08xvpj9w21z0sauua2v1ek8c9g1wq9aicz',
                        startTimeAt: '2020-08-02 23:15:45',
                        direction: 'INBOUND',
                        errorCategory: '769emqkuzo0dqmaz10odvjt8mdgfsy5r2evb09xhdb58dfqq1ewth1i0qdd2j8naah8txa98g8ekkb3x1z9xyiu0c4796dqwh8wh8gfuvpxjsck7mev8pa2yvfifrwtmf3pogwscvo03pdepbnyndjfh3kcntpf4',
                        errorCode: '7klkjyoz5y6usysrs9uu1hqv3789er3z3fum5vjfuo7mvmpeak',
                        errorLabel: 393230,
                        node: 1336115834,
                        protocol: '3w766lusre18n0olg86m',
                        qualityOfService: 'kzzt4yns1vh2omfrqd28',
                        receiverParty: '05h0pnbkpxbyh8a0upknu4yce4yxdolwb35dc80kii8x71bdt4lsrxvbjgxwuivvn7oehzvy3qyd5c1za2mc2rcvmh5qaoam71qfxn3p9onpmg1c4uhclgsxttitv1r2ndy6bormjffhfsntcxqwofwyyp3ap5dl',
                        receiverComponent: 'w6pz4x9k4hdyzfab5wsblvm71cr75di04buwxxf1vm11zoh0l1vytk8ym0pejpvxy7t4we4i43s37pbbhh9emu2high1jjjp8yh4w2nxneotd7bbcekvh08g5fgnjc7e5nm05d4ea336cz0hnevpkiff7lnetuf4',
                        receiverInterface: 'a8eka4r46gmy8hjkwzu03eqq2td16irzg40296564dpt97vzi5zt6jf0ntoy7v98kkbl7csj0g4y9umpzdal3ef3znxm9ikzm287z23fiuvhqyswwol3s7vbpzsotgr5p6rzhuupp1smok052tgwl7ai7066q1jo',
                        receiverInterfaceNamespace: '6e9r90w5oxk51dhxo7exwze21sqpmptbgdnp929p9s86a3zc9d0drvjrxzdx9e039xe27w9xz6yo8lkhvkr8c5zjxds9qkbolxr7f3ky8r9835wyid43xj0lsmqudgfo0kz6ytbiec0xtmcv0kvntxqoylr3s00y',
                        retries: 2576318640,
                        size: 9651297620,
                        timesFailed: 5872028091,
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
                        
                        id: '744cd95d-2717-4c7a-b502-d6716e3180d6',
                        tenantId: '392a71aa-3c08-405b-8595-17f6e43eff96',
                        tenantCode: 'yqxt3z1rg3nrlzu461avi7djehj2yrlvuv7gauibwjo8v3g3v8',
                        systemId: '1010a45e-2eb2-432b-9245-4efa085cf125',
                        systemName: 'f6ki3y9tg7ltj1d3sx6s',
                        scenario: '4xrshy8spupt6l2mnx2ztvca72y36mpryxa3fi9wwfr1cnja99tqoohr6esb',
                        executionId: '4a889ed0-086c-48bb-a605-a24f36815e81',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 14:06:50',
                        executionMonitoringStartAt: '2020-08-02 20:48:40',
                        executionMonitoringEndAt: '2020-08-02 22:03:53',
                        flowHash: 'lfxz8yrsjd46l4u5h929a1jkbpiekklk2sc7hr2a',
                        flowParty: 'hke66e0zuuj47yok09pvo37ft04x389yb4yfsl64juoitpzj8b1x2c26jhu6sbuv2dteumxloqrs65fibdatefmgetdpdgcl9bhduljcl1kg9q17z6ibhpk8kjz006zkz591nk23s8xmp5o27vdaq4pv1v8iz9ng',
                        flowComponent: 'iu1djuwly3p36s71nri6v2ds2rt2eovu82gq2rx9pwel7egv6nyjxp1ivo94sdy205nbtqf67ec6ktb0myiyrqmza2u5oqehetyinplscvee4u2439dbdo81zu39ztodndvr2g1dnos3gpyvfi9jgvsxio868hps',
                        flowInterfaceName: 'rb0za6he0ca8izp7locexg52ouifjbc2t873t11y14v2cyk0wj3wwiicn8wsuw3o4gub2bb1dqtmwdx4codazlqap04tirhu3s138y1rz7gnf3qvh769g1io7qrmmu0ogzunv1e9xm1gqnk0eniak0f6zycpa2id',
                        flowInterfaceNamespace: 'p863nvgiz4t103gt52a4phg1muoyetr5lif1lees23yym52fzwf276guhhdnp6dwetgbdlq62fwmv3kxu6so7uxztiaqn7hxdh32k1fm5v9ahwbyltu7n5e82hhy7g10n27swqiikz6bta6kcj82a58pqgzxmwis',
                        status: 'WAITING',
                        detail: 'Nam sed corporis laboriosam architecto enim cum voluptas adipisci. Quos et aliquid enim error nobis aut dolorem mollitia voluptas. Dolorem voluptatem hic minus aut et enim consequatur rerum quae. Pariatur voluptatem occaecati.',
                        example: 'f3xv1xvoepl82ivhyk5c8nuy8wfvhs8jnhyo9av0oi022f4kkry2tqcfz5pg3g4uxkj5jwgx3lnq6d04is6ekwdme84mydort6ga608y7kxwpb99rkus4s961w080vya2832qr94y87rjqwknzqnahucme8vvw18',
                        startTimeAt: '2020-08-02 22:25:43',
                        direction: 'INBOUND',
                        errorCategory: '97lb0rc2ivs3rr79ro7lb76tfd9u5l563gufqa0ryq5osz6fqq125fldkst825t4uogqiie50qni8s4gf2oxbr9u1fy9yavu1palrq4zg1dztmfibgotuf5fxcronh1u7u348dyvqug154f7wbgedbka26xi8irh',
                        errorCode: 'e6enxwis4af8qby7extr2731lfdo7vh6ps3ycjohrft0w8qs9v',
                        errorLabel: 767121,
                        node: 3478060193,
                        protocol: 'tt0zqegi2j33zyztouep',
                        qualityOfService: 'pprgy0tqrbg5ty0xyjo6',
                        receiverParty: 'b0tnxa9obdb79fssfjxoi9fvkrehmi6orvyomusru9jyyku1zrq4nrxyanu6h2ichno6roc98mncnb3v9ef3jt9bgevpwzolcsvziu6h42udkqc6ky0hxw8ot7uoes3vt44ltn4yrtzeoklr10hc27c5wahvqtlv',
                        receiverComponent: 'crjfezy3aj0fsjhjeup6jh1ja0mzsntvu986ndr7yb0r10qvsyk15t6bohoy4x9jrw3g2ub93xedi3ynsveq601lpleybm657aljx1d847sov3pg2dtjz7rwur1qr4em3z5bqwhdbo0i29nti7bu60s99xm4ritc',
                        receiverInterface: '4zp82ei48qd91l5jg2cs6wssegh5dmdx8mdjc1vfjum3jlfd842cb26lxhuecp3flo989y5yfivh44rpakm665tchi86tq7d8zlxyu389n7k2xudk9debm2xo8mljb807tjbfyk2rg8bwsyjrdvodkfn28knimy0',
                        receiverInterfaceNamespace: 'kc11dhr3ofdh5b2e60ckn0vt6bjwj3vvipvttpj26afvkl74s1j2963d391uscz0nsgjkld1kt08dkbvipuptubpu0ooifaae2z7z1q0jxeaxhg5xezyycybd8p6bpa9gf44iomwxju0e3czvzx0hdz2zpckbxq1',
                        retries: 3860865236,
                        size: 5350971558,
                        timesFailed: 5408086429,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('744cd95d-2717-4c7a-b502-d6716e3180d6');
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
                    id: '05a417c4-1f7a-4cc1-8b16-3fbb861c2dc0'
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
                    id: '744cd95d-2717-4c7a-b502-d6716e3180d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('744cd95d-2717-4c7a-b502-d6716e3180d6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});