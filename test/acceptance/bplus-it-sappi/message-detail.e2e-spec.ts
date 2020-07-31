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
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 't0kwx53tus7ifp5vosyllul6ndfs6fkcsgqkgl6qm9c7wihcvx',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '3hv6t41husl4shaxeys6',
                scenario: '5n5sjit75eyz099c4n2fdn43l4igasotgpeq2dg5excphwyowci50nedcj7v',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:51:30',
                executionMonitoringStartAt: '2020-07-31 07:33:10',
                executionMonitoringEndAt: '2020-07-31 00:53:01',
                flowHash: 'ed6s7k0fc41jepc2hofk9lsgjb3ynhbpmwer7jow',
                flowParty: 'nx5eyhf9cbm628hlryqkhx2vi2q8lwk2mkep2aabm49nalt85u0qtd7scq5k1uyka4az8ufnm3zh2c26pchjuh1vyge3zeimd0o3kritr6ezyekydy7u24rb3det1qnvcxcwks7fjg6tzrgyuatj92mureburx1z',
                flowComponent: 'evsqhrg2phaoefp56hrsfmkne7t726a5lmkzxmsa9hdmf9q3oq3dvailmlrz9n6zwrvkgvrm6kvegvbotdogor0c7v9biw1p3ka2lr2vbkrw8qo4mnfovjhod9pbfi61r95a22ejonc22r1ok9n70orx1h5jxawi',
                flowInterfaceName: 'g080kfw6gheg0v1iuqk25sg6e0qv2jwshxbcw1qat82e5867vnkggo7ltnnne6tmtrp2preu44nzz2v6w87fd3lsvw51pzv2s5hiq3giimfpw64ra437hyfq7lmlrevzo64a8e6fdmsq11mvnl8tjs4crfpujtpt',
                flowInterfaceNamespace: 'z0sig9fzgw2jcr6opvxkos7l3xlekv769vz8ij1afklmdux0cm6q4avaifdgcvbko3hifjec87acfp96skcagw41v4kywa3alaifsm5ufi525z0vxvvk9kauh4mf4neoxch1bljzt6of9n6s8ybnd1xl61ujjajx',
                status: 'DELIVERING',
                detail: 'Nobis ea nemo consequuntur sit omnis. At magnam accusantium voluptatum fugiat fugiat corrupti perspiciatis et. Ratione amet laborum blanditiis et in est ut. Eum laborum nam magnam. Voluptates sunt consequatur ea illo ut dicta enim. Et dolorum est repellendus omnis dignissimos placeat.',
                example: 'baf1utu50d4umq0gewou1xmpskyxb1skv58li80hm177k9rt431xsbd3igageec9mk712r9p4iyp00lzemroym09woet5jatrgr33lvd1v4ul7qldk1m9mcs2dbol1wr0jodgzhp9qqneolu47fkr11o5q27adqx',
                startTimeAt: '2020-07-31 02:40:48',
                direction: 'INBOUND',
                errorCategory: '60sspogu12zo1zbkqrbl3l4tzky3x7iupy5z3163uvf6kbb5k4j5lh468ti801gsd1jw19etxvtc97o1z8lqvezlxnu01gufah7oftfi3jenk6oodma6t41a2hicxxua3s2l85k77vjaxi575mtiw9v95cklb7o1',
                errorCode: '6jv1isny7rv0c79n2m07o0jjvq0is35cllptib8rvvpsfb92uf',
                errorLabel: 526927,
                node: 3801620882,
                protocol: 'd9m5wbk51or3zv8j29fq',
                qualityOfService: 'uwim711st2lppl5qxmpx',
                receiverParty: '1dlq4rpaa1v97oijrepe553a2o1ni3rybq9ei14jpyv8dme6w0kbwsgtsbj97daopo9w8eq3mf7nofteuvcqpkfpvdy281nyj7phnhliclnyu4y0vhywkfteiumom0eqpulucju94cvjjyfswdyfprrc58c1r77l',
                receiverComponent: 'q0ys72s61lryox82xdqniexvqfhkokd67uqsj3s83epsmvsoddkas0kpvns71zctxjvwfxu8aao7y12nn4xv139fikvkrb0hw1xspxfcrtim15jamxxo8nvgywev107de3jta85ipgkikctqpxfzm84f2ep6ml0q',
                receiverInterface: 'zkqlc5j38581kaf942rr81cmpmo3qid1h9vj4wnnyeduvnzfq1qqwzo6qkjbe0smi3x9f1sfn553gdbp4pxenhv3yye7n8m34wqc0mm6tzn8lk1yuzlfgre72wlmkdegz6e13x7tg84ykisjdb4z1fcidyxpl4ur',
                receiverInterfaceNamespace: 'xxmgv0242zknk5uo93o18y13mrb0woz88o7ac8h1clm0wiqggnlffxxvgbw065iafvw2lp21ecn80f1u2pfa707s92orblm7z51rm1pe51y53ng8mxc23oaqh7anofpz1fulw67dk17rs1rkcgkmw52t3ybl5y0w',
                retries: 2927536249,
                size: 9980263795,
                timesFailed: 4802192904,
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
                
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'lzjxih48rr3rd3dhuiasis7uzwlhwbj1uerblejopq3z4zjdxg',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'd9r96px3k44x71sru5zn',
                scenario: 'sr53gx3il2mmwuuy73o7tzwsxh5fyazvxug2zp9l0bb9zy4xhxvg9gj1gf9i',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:49:08',
                executionMonitoringStartAt: '2020-07-31 11:26:38',
                executionMonitoringEndAt: '2020-07-31 04:18:28',
                flowHash: 'tpkkxwcitwzdzjy04eecsj25upf79mvr1r73eq34',
                flowParty: 'n1yzzjsqi8skbbpt0537jqnvjy1l70a4o07hxv7msa3no514f3lfjg8c63uj75rtm146p7cwitka3grekknb7p9rqocdqe3vhbymcgd7hszzntw6up24r3iixz9sk83pxmu1wrualzsncjztd2dnfe1nnn5fnbae',
                flowComponent: 'jguqjbxcee0l7v8e22fc9atbaur4fpgtpxuh7vaie9oznr4gabhchgynlyggzvdhm65s2s95wsninl7vtneeu4osrklx0giswgeptfbzz13g40bhhnjf6uzb64kwonky1jvlbdzcikqw4s7d9mvwefs3zkc7ic1o',
                flowInterfaceName: '5tb38mifa5m493w6mzubzt37azchfcy2vpc8bvanmr2x3q07pzf26udwvhuwh9w5yce3ntz3m1w2yz5flak1hiflw6v6csfo9o248tf0gfr1lmqmvpb3nqw8nbc4cenqjd3yj53iu02onve4qc760rsi4crcvn5e',
                flowInterfaceNamespace: '4r3fpv9bl53vie29e2w9qk2oxth0mb00fsszckzmfhz7zmrz8k3r3yq5dvtmr8hfrogz5ub37f2fijbxbfxatbilwtj9714vl73n8w84dekcox4pq1kgk9n2084cdoyv0blz9xbs9gffv6sdhyufnkh4w9tkbdp4',
                status: 'HOLDING',
                detail: 'Veniam eius sit consectetur explicabo facilis nemo. Voluptatem totam laboriosam dolorum. Illum eos tempore. Omnis sequi libero consectetur enim repellendus et consequatur et.',
                example: 'bq7oahahefqgwh6w9cde1do3u19r8e4xmrh9dsz7a18dtq82d04w8gg8hel6veoyyk521p9pa52ggwa7e4w9nl3itq7bvxrhy7viktxkgzsxwql5gcpm73a0u33kjf2stgfl5bozxdfpeo43hghczgzatqr9flb3',
                startTimeAt: '2020-07-30 22:38:49',
                direction: 'INBOUND',
                errorCategory: 'j2mhqpczygiiqdielp0fhok20hvrefaiovly00yasnrhf1dpqpq9yp9j9h4rlo6tr7eirtbddwo5cfaeble2tihjvgaqgh5frz0n1zwx0i1b9jtul0tf33mdbx8hudm8c63zryqng7innoj9vg0uennlb01otkzu',
                errorCode: 'wuly0g1yo8g6mxtlr1ejsd6201hooa48hepjgq9o584m0uzbit',
                errorLabel: 514806,
                node: 2495417221,
                protocol: 'p0rnrounzn5crotf6f04',
                qualityOfService: 'vrte0jblz9ryzpq99bmk',
                receiverParty: '38gys7kt6tuu6rby9u3hfwbsxe9iu4xahnzjsi0hcb9z5x1luf0m387ul3cr8x24ycp069y5x68c23lr8ep2ym2581uvg85osj5qvh8o3rtexjbga8kps8a0vn4prr6pdoac4w5wl875wr3q4hy00pxyhfpn8u7d',
                receiverComponent: '5nbhmin1813jpm7qcz6xt4ycuawr4yuch3k8pzl7m1dur63poss296ae0l02ll4rn6puqro8h2y7q06y5mfd2eaz61nermhhg1btpkspgpnthf2l1mti74zf2gk9rhia5te4x3c9vt5fn6qxtobhi1wmy6bj5h8a',
                receiverInterface: 'l4lcqcq0kru89xlcvjdf3129b8szurfmk7y12jhd3fluh8gwbrk3ic2jpydgwo7lk93znpu6mw2ink2114h0cneronxb5aifd095wl93to438nr5z64pkt2z9lf4lnlydqsdxwa6qvng5h68obxik4ttu85w9dxp',
                receiverInterfaceNamespace: 'pb91efhghd4lcxackimd7z9bh2y8cw7kvct67bjaktzzbkdoe59cj3i8u7ttc5i3il7a81nllitp41t6h4ieqcs5wc8tf6mnobmtek16tiw4zeih6lksmhqnnbugsttstsujkg3z4vspnphk74db497lorlsmbr0',
                retries: 1605551928,
                size: 2212078560,
                timesFailed: 8606565507,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: null,
                tenantCode: 'fu4c64hwwkrxi7lzb0rcq33ogzfd18qjih72e6za8tp6vxwjxx',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'tj67zbrpfu4o8tlng9hn',
                scenario: '7ndt6bd09260ho65demrqts87vt3yk5c8g9zmtao4s4hdx1c098681pwo3xg',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:22:25',
                executionMonitoringStartAt: '2020-07-30 19:19:33',
                executionMonitoringEndAt: '2020-07-30 15:27:34',
                flowHash: 'in4gnpnictt6c6do99pfm2k9uwyvy7vy7eeihkec',
                flowParty: '97pwiyni1qult3ms376ckn2ka3hvsylzhf2ahzeqngis56fb0w868jze492mhqjhapyu6vahp386o3cjkjr3p265wyy6c298ahqnqs1airlqltigs9ybdxa3orr0r40ygbqgwhreoh0bt45zwzj74skhehidwgzu',
                flowComponent: 't8qhm0x92tpe7jkswqyjg1er64zssos5821u7adc0ztuospa2v5wgfn86t0yhnj0ju5gglzkltihbosavajpx833uesofdm7iqfc7e0ahyrikxwjd6gmvh8er4g40t2c2ivhx42xud6at15s1jeia1lmt7p8972x',
                flowInterfaceName: 'ygysv3s4ct6v7xtdkk7825fx7lyv66qr6c55aesm73n08vzy6ihouktzkq3z3y96ugvwbnzivyh6xagx43v4bat4rt9rosrraxcrk0u7ds5xp34cgy4y0v5qnqnzo9rio8o0m6mxiijmhbb3h0kei1cepfax2vk3',
                flowInterfaceNamespace: 'zeg15pkgzw21p2jlx3qq1ktdjwxztgnwn0c7555pej62aibvoxno6m9splpiaqyabhy7jevynbo3lyb9zfkg40gl77w40u16cutci80hd4dffzzi4znbvznpfreal0kif9luany89lz6y6p3llthmu4jy279lszz',
                status: 'CANCELLED',
                detail: 'Aspernatur sunt voluptas quidem qui commodi blanditiis ipsum aut dolorum. Qui nemo occaecati consequuntur necessitatibus natus aut impedit et beatae. Similique omnis sequi maiores.',
                example: 'wp37uui73kl2cpv1zoikf6xlauecfilj0mhbxye24a2rdyoo4gs336cc8rxc7g2pwav9sbdrxvws5523lh8dm9w7oj4pqzvv222bm3yk1n3l535lqdhxvr7vbtdb4j2ubzrznswyg53jvw5y0ylqpw8uvdiprd5j',
                startTimeAt: '2020-07-31 06:46:48',
                direction: 'OUTBOUND',
                errorCategory: '6n0e6k5k1sauud1fk9d2albywvpy8l5w5vucofpzu72j2hopy4glznvyudz8gj4e47cpnb0w72vom21bg5hz8g196tzlmorq5vo5gsrwhxmwya3shc15tmidk7wlpkre6otdu581nftr1jsonvlp4oksv6etxd7x',
                errorCode: 'um01wm78t6ok3odhi5o1j3arans5bozsl84sk7vjfbs3jbeblp',
                errorLabel: 729742,
                node: 1311797289,
                protocol: 'opk9hds2xkaqfn6n4x1v',
                qualityOfService: 'xybjfuquw36ogb2r1dks',
                receiverParty: '37tvmjwyuscxo0cp5soqy46qacb356sppp7glbvsfss9w5hkei9t5tjaf4iwoiqzzc6phyvbzbcq94fet9boa76hnm5r6uttwzcdlnsqzutz23aylpp9ne2wkznvfhxio251nom0xt1z77azvuow0mug3p56yptw',
                receiverComponent: '260gywx7pb194epf8a8g3m7nwbl43syel7tnujwhnkyysnwihzi51ebhazhc9t13bgvd1ywjhn4hn5tnvbsp0n89eqobae8w0mh1qb73y9b0kltedzlrwglp2brn5ccucrve4p6um54f6fa3sfgqgkcmlastvnor',
                receiverInterface: '6pqqidvkfb96vppwj9y648jzckwt86y3tytdk2zzs283gu29x727hdli90ol9d2xefr2wwyroly8mhfxw2pgeafs7t69z028uv50zot4afl5d2ysjtqmagvi0z2tn43brv7dhq6zt97kbv56qcko7mgmf24femjp',
                receiverInterfaceNamespace: 'spd7g7rw5p3ekc636qdgecnqn6j1s5hqx2h1fn1px22yesynkwkeuj3fv077vzkzrf6fpjtl8z0qogvx695s5vmszscttheorhdbiw2yqeywav8edw731o1c704y2097914o9iuajhw0mjsultmg4x317iod5idd',
                retries: 7618500980,
                size: 4910723891,
                timesFailed: 8845240406,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                
                tenantCode: 'mhjiff7d5k36x6th5zlbrzyk2orfu4ccpun4tm2hfxi1gcyy66',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'b4oz08sfcislnuobgqzu',
                scenario: 'fppxt9s8slbqlm91skgeeaxvqgh5hjbuk5uqv1a7wqbs3jmneiyctvhr7y5w',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:12:37',
                executionMonitoringStartAt: '2020-07-30 20:23:26',
                executionMonitoringEndAt: '2020-07-30 18:48:40',
                flowHash: '3bcfyv1ttrjp3w5exc8qqw99x2ghe9mnjeqp90ml',
                flowParty: '9gh91f6lqe9e7gmudxzcvclkaw85opk7wqz3jb35jny3zl5pm38vzarsp7xc7xhsqr979shpdym2refrc6l22xlkl31do39lzy4x98dixgpru4ahuuarllfpmdlkrrgpwr1tfsg5oupcuao31azzxxmyv8sfmnz1',
                flowComponent: '4by842sxz2sm0r85sgrbdwfyl6u8bnax7cun3pfm468qcpazytmqv196kwui2ic5hvepazozqea1whh4caqz8vicu8ews17wpfmh9hzohh9hg8ysrxvgjbmati69ko8p0hydzpjiozg79bm95fu0c54aem08ia8j',
                flowInterfaceName: 'ouxuxm863hcxla72aeugazrpv8bxhuy6s4n5b91kkw8awupt9hgi621o6rqmcgztl9lrrysij8ah8z94r8d4zpoyzl3cr3rmp4l072xk5rsx7ghz0r22kzmuoufmlwgh1wchamkbs97pksf7hdegj94rwtqenfzn',
                flowInterfaceNamespace: '1ou5sd62am9fipf5i3od5wlf7v3ziej46v5xonl0lqtiiu11dd9rqjb6bvm6ataf51gb1mmpjbd5ffrjvc5e3nlvm4zp6f1yzue6y2zb9pec3ro448hi5yka722ejjoudtsdkbemkqsnmd7gob52zwyccy6rnsf5',
                status: 'DELIVERING',
                detail: 'Quas voluptatibus est error. Eveniet sapiente esse quidem aliquid et libero. Sapiente quis iusto odit et et pariatur non. Ex architecto ut ratione non sint voluptas ullam pariatur. Et accusamus id.',
                example: 'd3o68pfspfrg2ov4sogihmjopcs3xozsbfccb9qxpjx3hs7zeeszdjs07ur655zhf1xb14rp0z5aiztavl2d1ygqs6ig5zmqh2he56u4rjwar2fzrbda5ae6pnt1lwf7obwhvnxtreugha26iz2uj3slt98kc9tm',
                startTimeAt: '2020-07-30 21:53:35',
                direction: 'OUTBOUND',
                errorCategory: '3yp0ddgosuu0ntiojsw5z0b9ief9m0rafh99w0unum8mitx1me0eq1z9gp0bo0ico2l4vxbaoue9s0zs5ju0puy8ilz340dwvq961i8je3dxnfrkyvrq2pr3y2qyodyrajb46lf5vc8far6rsofxkknza5s4cc27',
                errorCode: 'po2cfcpweclwysyx8o4uxanxzr3lm1tnee7s7ne4n89fm22ipv',
                errorLabel: 939308,
                node: 9207555271,
                protocol: 'tt9labpefqkmx5dqzexx',
                qualityOfService: '9bvrn7oqh63kwh7n6785',
                receiverParty: 'm49vk9fao86cs93b42lgwmuraglpphxudlcvq0rb2v82m9oeqxuynjbvwsx6ca1finfo4t60dmwg1dtleoxv4fmxg4ob52mv2xmg66ecoid280n67fn8mslov0vhqz4udolb0qnv9yjc8oe0h8ugsz9wjktu6t30',
                receiverComponent: 'z5006ceaeb1yo5wbbft1ureebq5ddyeotmkphaml4d2u1m76xquojzg82n7u93y0p1wrg6ibb9o997o53hhrkhfrd5oyyspijl7e4el9gkzorbsiphdoobolio9b8o5gcgvehaghkdauitvpn52nuv2qawhxjlkc',
                receiverInterface: 'tda2u8zyorznrc8thbo3splspa97ingj9zztu1dayk6fmjx7oyvvs1njdjhz37ee29vvh7jh2bire3tt4l0t250qzkqmqkfs1o0r26rv94v21h9cifqvwz6a90cpytih4djrq7n5utfce1c0v61mo8wqxk4n57pf',
                receiverInterfaceNamespace: 'j4sm88w3prvdfitx83i8e68spcg29lr62d1fm4en80s5x9qm6hxxlnw55g5rvuzllyxsnxvunxauzrj04uflo1otq0rgy3a30bk7zm9exnh1sbg8a5b9eyfzlkrpt7r80qu6lgd6tvbslhewvd506eflpqym1wr4',
                retries: 6081553973,
                size: 2719751187,
                timesFailed: 9108042417,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: null,
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '9y0h7ok5ehi0smtpxxw1',
                scenario: 'ty6m1wiuubsfeyd11f592dl2u7igzrdyrnqip113z7la700j43dwhsblgesx',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 17:16:25',
                executionMonitoringStartAt: '2020-07-31 02:11:55',
                executionMonitoringEndAt: '2020-07-31 04:36:16',
                flowHash: '2bct3ybdlhr8zu7zwu40l26z1ikh1gmiav2o67n0',
                flowParty: 'a2fppnqdwhg77lioh8nloezzo7j7p866ycvxgjb86dg0uv5x19ndfiu8vp1nqcifcveq0wisnxerziwo718rd7syxyage5mkskjb7amfqiz0nwwmruc363yds20wts02abm7xaso5wuv2eyc0ieqd75sfgniy4jx',
                flowComponent: 'y0kphhf4802zr8j05b7r441bg141gt5gwr452wobmleztlr9ksg39uzfzu04g7c3ihazh4lzzqilhvl03v5ychwjkfxva6mt54jqjqx6l7atbuus3x03fxzcndlbnsjvz21jpqtlufgxic23ed153nmdkdclbq6x',
                flowInterfaceName: 'y4g6vdm6jv99hs98r604z70rhqap4xcuduxc0y5ud9m0uamcg7ykcvp9oek4cx7qmob0gyhd3md0dxcouwncnttrgwurfj6s365g7ayacj1fe2k59ngv1vjjhapc59e0vu0859dyx0jujhy9q6gf2e24tc010qus',
                flowInterfaceNamespace: 'dku5c7d9lst0jqac93edl2uc2yfe1soetxym1ztswqyhhaykg2lnj1j1ynhkxop34uzae6w6i72f908if0qg9faoumheb6q01k8vcfu0cd475bu7m1lxx1kaw940dzugjn7m4nqn0dj734wu8dkbn45atafdmbnu',
                status: 'DELIVERING',
                detail: 'Labore aliquid sed sed beatae numquam et aliquam. Consequuntur accusamus ea praesentium modi reprehenderit et necessitatibus unde. Enim ipsa molestias. Ipsum dolor corporis ipsum neque rem.',
                example: 'daaqxtnqmu9rouvhqbfk2oqx8u06clu5jlsirgyolqr8zowuzyimzk9sb9p47rtepirkpj53sbtldo0ksm50w5i432n08aztvckseozh39qzxhim263usds39xsf6xvmjystt4ayl3fn1hqz9d0x9rzhiypmr3mj',
                startTimeAt: '2020-07-31 09:31:00',
                direction: 'OUTBOUND',
                errorCategory: 'xb36dw4nxzoopbz0m7vzd5r6m5wqvsdeyeyzv99hczs9euy1ogkujd131rjgxf68hk6lxfhck0arzynt5fwqt7xr43a1edb1b2fbw744eqzdkhquimntdzqst4o2fipjb4n064r2ab7x3vsbsu7624ksl13zxc7e',
                errorCode: 'dh2v7q0xw0mhn0m8v3cdn5r4axefr4jcb2ximblh4t7m357w1n',
                errorLabel: 191408,
                node: 5588842583,
                protocol: 'ewsvchonc5pe5zog7sef',
                qualityOfService: '667ef3rrtxo8chvpxv97',
                receiverParty: 'garsbglul6wvno4bfuz7bu1l28idldmkp6fe61x3xmyjksrme98rxtury43nc0yl0ax3273y20vkew2bdjx6q1ki883hijm2r308o9a48lu0zaosyrxuohud4etkbsg5uuwj5gj2xum9t7ga4pp9ctuwrydth75m',
                receiverComponent: 's75zomit6gc6a56xn4wod6f80f9oulp328hamxl46bmaveosooctnjnb768k40uj5iunrng3ceddej5ytpznz7b7r2cp4kpd97s75drii0qksx9v2kv0crm28453i0h15sq9sw9k4wt67xsr0ncqgddns60r5v97',
                receiverInterface: '3ikmisdbs3l4e9tvcdgouqlic07qms0tek2k540kdve9b7hixrrcafyq4xoplce7x7re68a1qiki060adnf5azl4x32knehbtpwychrgv9os2vvtcf6q2ieimjext9ua6vmi5zcweylirvkyt754eo65jwqtwa2m',
                receiverInterfaceNamespace: 'x69a9glzk2wklxsdxuz6paomimjv3hpzt3m3z39mm98wtcy2as4plfg3f7tpecevgakla8v6kazyybs2esm4v5bpym25yef16pmilt2g8ug2j6ireoivjtrqwrrvswbwzr0q1d5cdhwnoaqhqrf12m8cuspkoz44',
                retries: 7979482687,
                size: 7941317147,
                timesFailed: 5489870353,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'ec9huz9tkoqzw8wiq0mp',
                scenario: 'kpvvrpy02e7bnm5cvwpts249crxyhqxd0yl1jhppjfmyefrqeho09ceck0a0',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:06:30',
                executionMonitoringStartAt: '2020-07-31 03:54:31',
                executionMonitoringEndAt: '2020-07-31 10:54:26',
                flowHash: 'mnp8fcl4dj3jo4g57xkdsrg0ui7dpfi1raq56hd1',
                flowParty: 'y5nzwdahvt8x9s1b987vkmybcqi0fhgj4cmebnxyxe85ts7vq5wf0zs27ve6q05zvu2xsgutefsov1f9fydzwk63ab7ddn93a8sdb3adxlkzaq12brg7agf6ge5lnygh91isfmn26mn954jos4mjo5016pyowcvw',
                flowComponent: 'mgz69bmdv8nlx25rn1t28ipwbik4wt8snk9qcu34go7eyuezw4erraw96th4fvfvlnggh9smwp50zwpjwobfak4pqtd1qvm2qnswdc8ezebefu6k0i3ngnidqj6jk3150rd8fc7khhe07rxzr51h1vpsbivddmiu',
                flowInterfaceName: 'aq4thj72w46fgoav2s9v7l3nry72b1cj10y2jj0z1n0p6omaotuhq069604or4mg42hvzffr1w2gdt5biny7zym78y6fyfcr1mb2u7uc969h7x7n3qtjawq02i6vcap90ggu23uk7m5j1ddz1oslt041bbfdy5b5',
                flowInterfaceNamespace: 'wsazcamezowv1qovbe9o2ufkrnm2q5vxwi1hg6n9m8akfl7rlw1oq2qmlgxid7wts095o0y1ax7wzg5rm5y8m0nst2c7nt3kv9lzuv7b814opmcyjudqiraqpsjejalqdfzxmptdnzdfwv3yqui55nd26t0292mj',
                status: 'ERROR',
                detail: 'Eaque distinctio culpa. Qui quis earum ut. Voluptas blanditiis qui sequi eius saepe blanditiis vitae eius. Dolores architecto sequi dicta eligendi et beatae quis modi iure. Possimus aut consequatur porro corrupti perferendis nostrum et.',
                example: 'i097hucqj5icf98kb623pp45lz4dxdxus3vuv1wrh745v5vux8pq4v29hn69qjspqdfs0qtz5qbxgj8d32zx4jw8xkb4zufyht5ok39yid88y19gx1fj1j3ehdwetntrfp1qspp7odcukhbj2exkrx9v5l700qe1',
                startTimeAt: '2020-07-31 08:27:29',
                direction: 'INBOUND',
                errorCategory: 'jbzk8t3uwhgzn83eyk046m2lbu8wber0dx9p7roomkeastq6d3yc1unuij0pmz8ld8s4z5hmf1f4b9q1mq1ka302urh9gcezn5v6sy7qwwpasq0egysznyhhvlsk0tuzsnb92sky1wp93p54enpg3wwipe1zbtmc',
                errorCode: 'red1h7zs9p52c0993v9w29upa4xoh0e8gd31q72nqu87spyyas',
                errorLabel: 829186,
                node: 9512702437,
                protocol: 'iy5bf83m8k1rb0kd69rm',
                qualityOfService: '9x5vmkhgsf3kxa0arat7',
                receiverParty: '6kssm9zk8gltvrcmojke1nj7bzdfamx7ad91el3ujrlhl4tr1g9fin076tvy76nhqiv3c644p8ib36dg3h1gmbn3tgp9vsr113l5bir9ptrbehqqmuwrbwa0nx9th7dvvx1x5nuhii63yqixe58m6u40d28cv4gz',
                receiverComponent: 'trhybqdsx4thjlnjmkzpsws4seiap7iyxwo7csh2gwtogrh91fu128abwmkv4f8gx5w0tfb0ga4wwqely2vtbqdefs9oqnr1v22s6a0lm9h786jirza8vnhtug3q23khcelzidpy80ysgpotlmrfkd1p4f2it8k3',
                receiverInterface: 'knzpysibc8gbjfqqpmm3f7m4sb1n0ccydxsuyhdg5xu9e11b7c9vvpbgybo0msnnbhszejnq5d1ljc2fs943mbzmmxgghmoq5sukkunhte36uusu25l3yalhcti8lmiag5pbxi5iz5nx4yn0c1wsmv14a05a1bib',
                receiverInterfaceNamespace: 'ku88ybs9uga4ld0q6f8mfqbn9253yi6ieb12j1eey8kaq8e3h65613y40xud37s5th640rcwhaiwz0zyzfv8odh9tdwpwtb53z39gzsqpq055xu5gukjp1i0jmwuaanyvewceia21686rdto9t41j09t44nxvm3f',
                retries: 9775199522,
                size: 8962474252,
                timesFailed: 9833021628,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '2c7jf4lpo5vnhvf3ak2a3lbe1w2mcc4ar1jkdnoaydhh529wy6',
                systemId: null,
                systemName: 'wlq4w23gqn1ewaclnjx8',
                scenario: 'saacxdgpm3o1dwkm80ye26od3gsk5pgibeawbphrey2qr4ewulawqurvxz1w',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:44:39',
                executionMonitoringStartAt: '2020-07-31 08:49:22',
                executionMonitoringEndAt: '2020-07-31 06:04:41',
                flowHash: '9nuhiy8hol119puavvqbg7olauke7a99x5a9x1eq',
                flowParty: 'm46r4n43d5i8mj8lc6k3g7wbf1gv4nufomf59c36yqxb6smapg6bh3afsu6u1gjtqdcjnq4af9gi1op7dsmcehm2j5yokbkt9te4r71h45ocpfkzk5auynwqfjlwb5e2rrs6hht5qe8lvf62z7gcp2cmx2068lcv',
                flowComponent: '3cyf8nuu48prpba7hsbsgdtrgl8ueqhfu62y26ifp5umoi6f3cjogtyw3vr8x5if1psuys3jkjrp28o983t02dm1dqj46raded5813qs29rd094thlndlw58ibmqz3r5tf9u0exsengd88o638flm84xsykms4vn',
                flowInterfaceName: 'rhx9akx56wbav1kx0af6mtxki5c6glp9fqiuppdt9w78lzf9m4cv22zvx3192y40mivi5znofjrbweoxjc12ieqqiykzsly0w6d625c8nv5i72k39zmmdpu1kd7z4d7zlwii32rry1oiuxpzo24se0pjegbhf9fl',
                flowInterfaceNamespace: '28odyyvp7mfdcyub127l23kv3wv8opuu2077w31929s8hpbksmc2855yjy6248x9za7tdgqlvso2n204m97hhug0snnlo97hern0hvig61jteosirjhrc9zb7b82e32xkseq1xt7gxk302eenvsyj90ts68x0sxg',
                status: 'HOLDING',
                detail: 'Soluta neque aut veniam alias sed. Similique impedit saepe voluptatem. Quo nam asperiores eum. Commodi totam blanditiis veniam eos.',
                example: 'qqa3ap8nzjshz4c4ytajmjio00xlc53ntbqhu18ezp41j76e3r048fu54mnhifbeitukz94p1isn49eoaa4an99vlyk6pn2i9t5it255aurabpnepzjrw9pv6dahfp35smqigicanqe3jh8b78kjsgliq2i2zy62',
                startTimeAt: '2020-07-31 03:24:04',
                direction: 'INBOUND',
                errorCategory: '3x1txz2tn5xzornpi948qyusyagyimxreijwnyxdqxy8gfmke4vsj9n4lzr0f3qm3qj0zo78w6ofbzvp5f8jtiis99pkzrs02ue5g6a34e43udx9jbh6gua88de8lmv9u8i5dmna84blkfqq99m08tewhcyw4ix3',
                errorCode: '74lyn2qg3b5sz6pqn1trptpj4ys702ax4adtkaiowlpvefho8o',
                errorLabel: 293648,
                node: 2730504934,
                protocol: '7laf4z0kewis1peeb6q3',
                qualityOfService: 'b4jyfzc5o6i9we62kyi6',
                receiverParty: 'bozcq7tmcvhnm4tmpwc3h6ya0rc1601vy6r7po6sq8ulz8q77r2ir5tyal8fxv4scpp4z6u3x8hpmq7u78qleui5084jns5p1voubjgudlwguz5yxoeg1ld3o4s7f8pg9cobhfsaqp7h89h9cat9qgiudvzlb7m5',
                receiverComponent: 'e03m5o4f22yohg0l9knnov1v6jhc7l293al86390lajwb5rbo7nt5ls61bkngdqt2twlix8me45asc1uj0romfclu4c7jvrbhdiualk2gb2fvc26r3vvrszc3ok00j47j5cu0o49mmrk0c89fbdjn74nbcm75ifm',
                receiverInterface: 'nd50dg1h44h9imlu7nkkgwy9u7recl59xni0xdu3jg21tnr8noft3abhu4lj9lqqkm49t79yl2juflm3c3bpiizcehnsjeqxjkw959ru15ppm6l30suddc783mf6rymh6b4j277gqefkknbx24gyemlcv8djw6dl',
                receiverInterfaceNamespace: 'zqaz12uw0e11dyvqb8qqopn3vyepfejqxm7kueixv69eb4xfh0js6nxlpn4tzyabu89dkewa6nnx8bx1w9pb3ihpvqm3ysuhotqbyb8vmjf5u2o15o1c7vhtt7sj4q5ei1eomywy9h22ncutvovn3pv5f2rxho8l',
                retries: 9809085713,
                size: 1323411922,
                timesFailed: 9557701590,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '8ogqr7l39udz2x6yy70a4vmqotqgbp6x8a0juyw5k9ddyaflfr',
                
                systemName: 'uckmbm3tbm4rt27xgd6x',
                scenario: 'mmtyyb9pxq50jjdk700t99a2twn7mgn80dpsre6i0cy6ede0y073qsr98l8r',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:22:32',
                executionMonitoringStartAt: '2020-07-31 10:36:28',
                executionMonitoringEndAt: '2020-07-31 08:13:37',
                flowHash: 'bkvl5hibndmi01ko359z8gk9xxf8o6n1ml1au9wi',
                flowParty: '5op3asygurn4c0qy1tfy7writkp108w2eet4basu3kvtai38celamc1fr9ajellih3slwjflpypm45qau47qhh3t29xo0xxol5v0vck9l7tfdgyik0fu79x10jly8p7o25hxpjfg3jm0v9uacgazrjdhhzky11s4',
                flowComponent: 'y457bdb1e6iviych642l6fjsdf9w5kdo29hey8yrsfww1eur4l4zxd4hn5o10gh321092u42bihe581ga1dulv2r0coqr4k0k6snvruudfgprutd0poplmxsx20ip3192j0qln3ji7lueh3lsvukjhha1k3jf8tv',
                flowInterfaceName: 'fgmxryayy1gplkbmilti6duzudxq7cw0lr9qn8i1u66iv9khv1598a0qoeuk8mdsn670n6oxtkdlvxkosumxxlmi2yjtk2thlz15ryrepxos131s8udrm0vca73wpdm2vocjw7kfw99wu6mt22zgjdj9ygttghqw',
                flowInterfaceNamespace: 'xk5ee3mp2a0ht0gnl0p2uv1mo45yieqgeusk1tedpwo6s4keqxhe4tc3md831e2kslrw4h33di4c7mawxka39p6kdvj53jxaw2gredw32rxjo7vug9z5xnbcizkum7fc1uuxutd4nrlqte5fvdss0312pthweqll',
                status: 'SUCCESS',
                detail: 'Esse quia optio saepe. Blanditiis accusantium qui rem est excepturi atque. Illum soluta consequatur. Magni minima possimus. Tenetur ut totam voluptatem odio doloremque numquam.',
                example: 'tnb2xtupq9gx2dz5rxls71qkhrrf3wkenol8e9rk433238nrl2kfhrxme0ln9gqzcbw4ad6xxc4gc3a40kdge4yki5ucz9ch21nz8bbb8s6ql155u7piaz8qpisx16uncr176fv1t9lj6ucmiftdlfhk09k0d052',
                startTimeAt: '2020-07-31 03:26:33',
                direction: 'INBOUND',
                errorCategory: 'ng8c5ikq6hjsjp9obztb0u7fnt9wl482ebi9htgqd3paaeutdtyetd8swnps10a78cqnv0y3l5l3wdv2y8g1gixlleoaitjsjifeqmbgjug7p4epvlrn6izn2na5yvuyjtxjvlgsqoe56esmdpv4mwq06o48syb4',
                errorCode: '66e7e0ksgziytv5jjnylsoeyzwhbxe8vwm7cv7d5z6yw0j61ad',
                errorLabel: 185314,
                node: 8844277473,
                protocol: 'n90qy7aph8jl7szmgny7',
                qualityOfService: '4lbwb2ysmkbtxkfxqn8r',
                receiverParty: '8f3htsm2ikqcmhxpu39v33ckw19a99apg02j93gi5duwzaj1y3p8wyhmhzzt6mkqe4xe8jqf78korg6oai30envng3n2caz1uq3raaxcznf7m6gap5a3tk5dkkosp41pwargdkozjisf5686u9txi2fa0palsymx',
                receiverComponent: 'cnsj7xj5wrmgm8qvqyazw8zzfwn0rcnd8uacw5o6e027zjwoyzjcri9ial93ulntawrcdulazlrrtb8v9a3c6bk7c107e7nup50wlp0wxkb44f0lb2ophzvzp6h0w2sgpgfq1avm4reteyuj539tmk0fno72b9cc',
                receiverInterface: 'c6789a6gu5t6qosaa3qieips7u7yx4oewgka375jc5gahx6czzm2h0t2wmbifdefnn086tz0ynrw3tkdafzbmcv77xyp3zpo21fauw8bf6f3uzionumpkfio5qyzuj4uk3ccqgorgdqud4xkb860s16wx2vg4orn',
                receiverInterfaceNamespace: 'nfd0mgq1ph6tyzroy3zm4ew6qxnze9dtuahgwuyil98b0tnicezsiy7nfiq9oha7x1hlueyzrntj8g8pk7e8swdf0n87j8zgjfz2g4xf5gg4ab18dmdfa0mg271uz2axmrev0073nx9vf4iohudio2b5iwclfkx6',
                retries: 4418207865,
                size: 3490167110,
                timesFailed: 2053850894,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'p4964lm02p7kp3x68xumnvcqpif0h84y0vh8bcd993z1qyxklm',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: null,
                scenario: 'tvkd0npv9j3r66gnt98uy6pvow2t9vkhld91ees48fxicxuufo3g9wnk3jf8',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 05:05:13',
                executionMonitoringStartAt: '2020-07-31 11:31:34',
                executionMonitoringEndAt: '2020-07-31 05:54:31',
                flowHash: '374qz2ayzec07sfst6x3ts76x28nzruz7ck6nk1m',
                flowParty: 'bo003c48ytgy89kveei3wgj9x8oezgkmb3eo2k6q21h56hz51pqiawc88k603mq9hbzlblcnfer9hfatptmzjmiildua5g0h5m2fr0i6jwv0umsca37l7wlzyazs3by6p9ro04elo1jxs98pi2dkujgp4t5vtwh0',
                flowComponent: 'f0b8w1xb9ega1ijz1vm1up4swxiewb2512m823duuj9hkzd8dq7bcyc7m8wsum22dke8sqzkstvaaz75qbovw7vcuvddo9coqboph9p3obs0u8afm9c95h5yniqpmiplqx6any1x3j9pnrqodwoz7j6ucc5n7hvq',
                flowInterfaceName: 'cah5btd480g97e9wt8cmdufwtkqx5o4j7vg1y1vm3t9s0iksj7ak3j4qqggt6l4t9cfx1vup8pdzyl5hbhujmlptf0g71nz507o2jy0tleg59wo83cmwlpd9iqjnntlop22gf2e5pes9rjwd6rxadveztm7292ik',
                flowInterfaceNamespace: 'cje2k714pizh02y8lua71s4g5vziohi3f2zzwx2n66zefg4m90ovht8y7cxtiidyvtyof5bfkdwlwxwkt1jbhgchheuqjejxfs8e8721vgt5zg37yw8o1h2ljg13a6wok7o08wqk1yo8ore5boqcqb58dgp1104c',
                status: 'WAITING',
                detail: 'Veniam amet hic odit autem voluptatem minus tenetur ex. Consequatur ad quos enim dolorem est. Et assumenda ut beatae ut voluptas. Vel dolorem est sint expedita hic ut sed incidunt esse. Quidem iure temporibus deserunt doloremque.',
                example: 'ng27ibh0ezy53bxru5il7yfud6ibxj7b48266se9fht45ddbla61smyqj7re9wmipmbll612t9p8i868obryrmjcrxmo8gu5hasf1xe5etd14xyoz2yoy2s4yzph7oswh6pqwj4ibju72h6g0xdvxzdcryz3mimv',
                startTimeAt: '2020-07-31 09:07:41',
                direction: 'INBOUND',
                errorCategory: 'dfitxnjt4r7jtjhay0h4gy76i4sd64ogv0em3212wemv94a96iwdecpmeeihj24mswx43uen5u0nx4hzq3wpxydefurkd2tgcr9um4nz1rn07dg35o73mhb90ixgyg66tvbchvknzrgyoyy7jnodm1m1jims0xw1',
                errorCode: 'xy16pfzstj4yvp5gog67k8meocten7u54ygg70y8ixxb9h2b10',
                errorLabel: 919105,
                node: 9033520924,
                protocol: 'h5h8zcs3ttbjl1xcfrop',
                qualityOfService: 'dd4e2yqd2e5abgtofujd',
                receiverParty: 'dvh0yof2sv5rxtchs0wxu9z02v14azmnjhm71k113kchi4oxkd84s18tqocvmin9tkoxz35yrm16vk8bsslhhj6vva1n78m5m2ktkvkon3d0jf52vx3nsz9ssd9lg29ozpccapn93uc1ryrg5579yp3hx5jxhs5k',
                receiverComponent: 'pnxl5ezqxajregurk69fyur8ezmtpcreoi1gh3so14azmsuysrvnguoxphje8kowec9slb3nyx5inhswz2cii0vta02ehxkyom6wkaky19tchlz8b46nw0na99kbpep21slao9vq5qj6nf37qybyy0wg3rifpluv',
                receiverInterface: 'hwzv05iz8ljejgwpluolxifk6huxqz6qozl5ukjxcngdqblvxh6rxbtrd2o929ek3xaon37u3dy6l32nmllk4q8zwgye87qm6v8yns8xol1a9fsdwjv3tpfzech4jfy2f7lt3b8169kbj8le81bkkfdcftlx4b61',
                receiverInterfaceNamespace: 'mn1ncdulo162npfpj6o6hophq6v3dy1v6qkfgwckanltc4jwrkxkfpuaie5xzamhqn0esmurghed86gn7wfzbjryicz0tcr03hbus3qh5drrpgbopvtmlsoln3n6aqollhe70nrqhlkq6jq6ml0f8id0swsp4ya2',
                retries: 1102462591,
                size: 3808779950,
                timesFailed: 9060678233,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '0nzquioozke94e1yvtu5gnb20d8m2zdsdciza9vwgmiqmizvw9',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                
                scenario: 'h149ldgn3pqu724bolc8iyvdtvr4da44c1itrx18cjjbqmp36wojoa9n3df2',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 15:11:59',
                executionMonitoringStartAt: '2020-07-30 21:45:49',
                executionMonitoringEndAt: '2020-07-31 07:19:27',
                flowHash: 'fubg1tdfa7gvk6yjeweq344tt8myq196tzdjkf8a',
                flowParty: '11yyhrq2ioeggshj0i933u10lo0micyikddqdf4thgd9kh6aj30xrfie6vjujvp1g8q8bplg5hhi7o8gjmz6nw80crumuncpugu7q1fg6d5t7e8s8taqpv7suf03wmj6w7axvloq2iyrrrjufexxupchzokjmrsr',
                flowComponent: 'ebwryxwpkxumco8x12q2286dp39fmrmxx92gnikfvkb2o4wjjhu1djjgiqmo0ox7lprfglk1mv2hzjdq93rs7rykgg4no0ydoxz3p0r4qc5kzq6irr5zhx8rb0851dd84bfplxk5jxjhv6caanojj80s0oex4yht',
                flowInterfaceName: 'oegzv1kj6cirf9fjjcpauysxoh3fxbirwr3kvd36f8u69y0ii0mxbv87tfgudp08gcdyrxeah17zgeih7hctjvrx9kk2p9fa0wum5augykjl8gooaiv2jmrsk6v5xxzhzpa0xkgyv58ykryfz8i5vtakeh3exiwf',
                flowInterfaceNamespace: 'qxizugp9ast6p2kfryvcgq6nedz0n9ckovroo1ac235ocvqg0rgwvcovltc4cdfffde2jjqj76oyrnwzuns4alhezzozjog3c3bxynx5q9ifoz3kmrhzbe1oudvim2fraaww6ik4wtk56t04z2kujx9kadrfyko0',
                status: 'DELIVERING',
                detail: 'Illo officiis eius sed voluptas ut. Voluptates autem perferendis deserunt in perferendis. Alias dolorum et. Quia quis aut est est ratione cumque delectus.',
                example: 'k9vonru6zlg3scx7y184193f84hklp6w2uw8tcrt4e9nrzyrn8m1za4yoq2tf7ipbd3bktguvsgejcf6lpflxfqnru0ivzzjmd0tyaya3z4vpzsbi4mjnoz1wpca4ckg8d8qg60ostfi0gioarvlsas7bta6p2tf',
                startTimeAt: '2020-07-31 07:10:00',
                direction: 'INBOUND',
                errorCategory: 'ivcmyqpjka5ba5hrrmfn0g69cvqd94aa2wtq9meaerb1913svvy7ixn4nzxq64moixs4347pub10d085zv82zxfcd3b1web7n15drjiykfq6bnpqal4jezsiqyw9avtz1u733c54lxxew9vctsvjvx7o6t4omhiv',
                errorCode: 'pt11odnoppe3lolnvmk64klo13vqiomfv95mlz9nf6ihjtlm0e',
                errorLabel: 941853,
                node: 6381581774,
                protocol: '2rtidypcl1hi90bpviwg',
                qualityOfService: 'n4lfi3n49eiko3p624fq',
                receiverParty: 'gp4r8xg6afxv6na08wwxik3jr8fipus5mvhmgg32zthzqeu6ue9t9j0myils4l6ty20djkr2z57t3dr19tf8ifz6oxkjdlma9et74geoivs6j15gg0xlhgcjycos4a2jsj7y0gzn6czr65rlkq9vaeoju27tty3i',
                receiverComponent: 'uw73l2so9duldovzr23tu7e8vif1ns3b6yrgv3h4dlrlu316hnh055icwcr6oyc9lab31nvgwsy0rbv61xfyqc0y8324m0ivou8gifp0aafiuqj3fgvfa8pk1n21a8ulo8csyw35b1ljibsasa2210uea5dhv4z9',
                receiverInterface: 'ozjvb8jli07mirm2eauhaxevic9mvp7p7o7jq895ilnbriiurq41p980caxcbbavr7wl0vdamde63hoxxq0u4zsenjbr2kkrntmmlie5zvdb5mb7uk1jk7lkqqerbedmyz5qp17ih75ebzvhmndoaz7kb3rpavn7',
                receiverInterfaceNamespace: 'ocfdgn4kt5llpy9sk24ehw4rv6hx41clo7fi2bi5zhdsdx0ufcm7s96cahw8tlt1qehk7b57vb1svllpjkblelrj5qy4dlwwowfdb9ocgkdmqqkgzc27exax47ci5mvxd8wj4jeann2ba6ql3at9iax39tru0wqw',
                retries: 4160977086,
                size: 9163762501,
                timesFailed: 5101650946,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'fqlc82zofjvk2mquxjr0at0vm4qqe4zxprnlno7w38q93ez1pc',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'xc32o7a8taoy4dbwtegg',
                scenario: 'w6l21ikr2tq3oduykv3g1i0ubau3mcquv5t8fejpfhdwcizi8igjnza3wnu1',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:31:17',
                executionMonitoringStartAt: '2020-07-31 05:54:40',
                executionMonitoringEndAt: '2020-07-30 18:05:06',
                flowHash: 'ceiobgfq7x1qhabzvgvtx21ssokjvp67xh98b9ir',
                flowParty: 'oeb2ld7emwkd4hyqsxdy8cwq8e96h5p3wbggf6errw0h96348z8nz77kvh1dzsb0vg0t8987t8w22o74jpyjl5na1msaj5l8r9ck77apb873fpt12un2o4c7czpri9fy44t09rg18dowam1zy3gn4ygt8ez5l5qs',
                flowComponent: 'cidql9e3m3s0q2g51aq33btznq9ylt1g4gq6sc98uq9fqo2ziv2xkycfi8vw2e98busdrzbwjdgc5vrbew2k82uts36ekw2dfwpxmcywaavr267cbwxuh0cehbgl5brlvud7p76witcm9voxxokfzh5o3eyj8e8e',
                flowInterfaceName: 'mukb86bg3jxgbghocrtdhida6fcxpva0gij286vqr042fgq1avkx57xenpp52jtpezggs0z2xqvsrliaxuu6xv3qi12gzjd9kmg8wdvgkvxzpzwftmwjt0avbwci45hnadjwzcrquzzuqco1o4ln64tzvhqzuv98',
                flowInterfaceNamespace: 'vzcv7h8ir9zchianh6vgpc977ziuksmek2igptfmt30xeo1df4hrdhowxuskr92hv4g03nvilofuua33pwivd19c14ksofnzb96f9egu7vcxiqrei3bq0esmyd5pc4vyj5zue1gczwjeqbvx9421cienkzni9482',
                status: 'ERROR',
                detail: 'Quidem molestiae odio nobis velit omnis numquam. Tenetur sequi deserunt accusantium necessitatibus possimus. Molestiae itaque id dolorem minus saepe laboriosam accusamus dolorem. Fugit recusandae velit excepturi rerum quas dolore quibusdam assumenda illo. Consequuntur est quaerat.',
                example: '46s120ehe7jc9akgjdu15a6pssfgg6gap3d8hj57b4h45d9hjo867c7hn226by4jrr47xqifbb6l1ozxoza8p5w2bxf6pbbmshx2z80uecjifdjj303tmkn9t6zuqqd82qlek6vtmfele55aurhi7ojsmooumbsu',
                startTimeAt: '2020-07-31 08:34:37',
                direction: 'INBOUND',
                errorCategory: 'ao9q7f6tuh4tiprkn850xgxwysfmxq3tk8zkmyhil02f1q28k7867mqh2wv7b5oamh6jveexo4em0at7bzg8e6kpxv9caar8r2ikgemkid08yc53xg8ll6ltmcet5j6q3t9uy5rhcf2a0swwv0lxkftfj67vfuc0',
                errorCode: '7n5gnk7ajp381uk5t15aa9spzvn126mfmeb1gsxeu2gqirhmd6',
                errorLabel: 837612,
                node: 4099049464,
                protocol: 'omqx5asmzlwpku24uddn',
                qualityOfService: 'gfpsrmcxd7a38s449v6r',
                receiverParty: 'y9r403v1bh2tczsqhkqbeqktgwz5fxdxe88t38uhw1xyfrklm4whyx8v6sjaum9pekx1p5nkk109vumab52x2znzjzbk9bh4l1qqov4gfd1f80lpil4e62qsnx1ujbn3hvx66u1xy9js0ko1r827tofjpfw1r59g',
                receiverComponent: '5yiw923t4yi93lesiy8o2md5gcl19n1eaz0l3if3odkpd2tu9qcdtxprom4c6as1y307at9w5iae2bir0lqc9gbz5764sdmgizklrectonh3ulvynwvyxatq7uoywauowiohbxfodyjrbd4sq8x0ud53i0azh7km',
                receiverInterface: '5c7vkzxak4k9xxmdx926xbmcw90cxt8qmfbx755li8en1ssdn0424rih1k4usvkhqsdbynnkeqtk0y2gia6wob2wp42p42z7c5avk75dny3k2i5u70wf1btt55i1nnqa7hjlfkdc3plpggsy9h6kuw1wcldjaghd',
                receiverInterfaceNamespace: 'io5ub861w2ygw6136nm9umwq0ace96veynwdtojz0cz6d3dknfkhokwmtv2ldn5ov3fjam2j0mi05em1zcvzlsneninth9xpudqopqknzrd8qrqdcx4q4hwdlelbwe8y7h37m3uvus8bciaj3o08159zozrf1eya',
                retries: 3614879950,
                size: 2248569577,
                timesFailed: 2990643604,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '8yz4gi21eeqdurrp9bri2762n45r5lygbkw7tp8zuet1yyyfgp',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '4w3ref7r8v63abosupcu',
                scenario: 'k1yccxafx6a7jb82xd5omh57r2ned48d7hvlbrxonwidicw72tt8a8bf0qyt',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 20:19:03',
                executionMonitoringStartAt: '2020-07-31 10:55:32',
                executionMonitoringEndAt: '2020-07-31 13:00:09',
                flowHash: 'f5h05ar1afslra2koaitw70eidvbmrc0jjqeain3',
                flowParty: '8nfa5te9tau1f1rx6r239r9en4jg1jektosq4fo4xtjg7ipxu59zilj3ot53l41kqlejk8ju9fw41slzhmqi064tsbg33jxgtkkgoq6w8pnmhngck81v46vo6zfhas08cjljc0f2g5a6uyjj4on7sj1e6h6n1z3c',
                flowComponent: 'so3gooim7zaoz5zqtwvza9edwuc4o6p5meke94hkfnsrfn7fm1z75vq8ebki196ct93wsrb9s2136uuv04r2kamaf56iinw1k81asi1c889jg6zh33cy5vr7qi8lcy66u5khc72arpl76z34wupgmsi6sxbyd26f',
                flowInterfaceName: 'yjbq5gg9mvd4b681lx6mvn5mgr6ieb49ns7y322v0sohy4gblmmw434bdlhc4qb9u83zpoyfhgyg9tbgb6tda1na1c3jd2vgsnmtk1ur80byect0ufbfwikxtypixfpa4mxsip74f0b8gg4clcrjajklmhkh5ony',
                flowInterfaceNamespace: 'qfwxbxw10yt5l3qz0ml9g17fvon2lwqx7fw44wjaa61qu4o15um2ua7zje1v83nu3zmzkja3bb19h0375t3gvabqxw4xhs6bjsfei8ubudvrmu531j2q918mkrf6r8cjmvix6vpl43pnz99bl8r5no55z9qaxnfp',
                status: 'WAITING',
                detail: 'Animi occaecati atque omnis consequatur tempora quis at porro et. Dicta quia voluptatum voluptatem quas distinctio ab eaque soluta. Voluptas vero reprehenderit et ratione ut non deserunt excepturi.',
                example: '1v6onjw2offsoa6ekuvoaiq2dfd35gpxya09ojfn8uq17kk2jefxaj4za4vraoptn9s3jvwj5zb28snev914miu9quh03jb696879v910ufuiaaty3izrfu4emm4sig8tzhic0toc5dwrm1m96rgewt38idbq0ho',
                startTimeAt: '2020-07-31 08:59:30',
                direction: 'INBOUND',
                errorCategory: '5qkeddzz0nezxcshs1zimppo5808qhab0im90v9rvt3bo28f63b62tiw48y1ana91adc4p8zct9p072dxtjdsbkiniqhiof2wgjug1wyis15a3siqodn34ady3dub2a76q34fm9j9lg36tyc5x8ku7a1b73ywfti',
                errorCode: 'a0to3glisc740oewpbaif7ag6d1am2gxi3ykl0bcpnwj9ns0ug',
                errorLabel: 758101,
                node: 6924672613,
                protocol: 'f4pqsz0bdfxvp09c6pgl',
                qualityOfService: 'kxq4tclwt1e0v6oteedd',
                receiverParty: 'vdttzohhx1hogaxpvue98nfvz5v9qahslniktvl5xx2e4y7gw42c1u5idglrdmqo8vls1j0858pt027qamjctrz5mw54amv43y5orzgia0c4epkoxasvzrfkpb68uhl487t6xdaqiifa3hpwmr244o201b2hpe2e',
                receiverComponent: 'tru75ixexhct535wxi0vxegbaniyybmu00jc5rzlcjebxz1p44vjzvikp5hgh8dayq48k4ezgczsigho1fbgue5cxl0ssk6flpvjptupte12ctwtcf0o16a8xlvfs3bncm3235djtphev8z52tm7407oeggmlacn',
                receiverInterface: '36t3te5aust6l9udextskshe9p57p1485d5r2rsuj57vow20k1aq9mknh7tbh3l43lm62osch5w5l7s3rgfaw5w9irdjvjqww8jqpsgm2ndm1bda5v0glkg8aumdpz69l156sv9g9j4d4ld4qjv3zbrv7i37riab',
                receiverInterfaceNamespace: 'tfh69aulyy9kss7771t3x3ty4yrszmkrrxr93ie9oa5wtzg8t9npk6593so7y8m6if65jlg964wrdpmd9e9g2ieitxxvsdclg3xsq2q8m8uxa22eqz95yy1xowwedwqxp35xidspojzreod2nyn9l6x7ej7hvlyu',
                retries: 9255862923,
                size: 7737875333,
                timesFailed: 8880973503,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '34nksmt10nl3jjn26af4abdkpr16ayvq34h7unbnamguwksbcn',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '4ma3ni96qlx5m2s2vovv',
                scenario: 'mumbpkf68oswo6h4virgf5elstz7rrn44u5re8ee7qdhdklnz3gf0tgoufk0',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: null,
                executionExecutedAt: '2020-07-30 15:25:11',
                executionMonitoringStartAt: '2020-07-31 10:19:23',
                executionMonitoringEndAt: '2020-07-31 06:30:19',
                flowHash: 'ljev1klkxp2qos1wi7j8zbercam197cbvpcqqu34',
                flowParty: 'zqemr9agdhyxpd9gn3apoqb002xo56ieae87iytlfe30wmnbh9tftz3oa4ai2e60nizhsbuazra4bbmae72yfuk1tlhxt8imqairlzbo29sbnl0v6ckukdlkw593cv76rk9nzbfyumrdodh858e69ckpcsl9humz',
                flowComponent: 'x3wc7gpr8witj98fsjkt7gti82437jkvbk2132wsw9e0gaju6bi5cvg5oycpjia7xrfpv5q1zdt1rtyw1pftdpwa5u1bflmuir93xy1cyfgeikani7oq3affkv1lytf16kvlhdg26dva39gob8135etwzt8psku9',
                flowInterfaceName: '29b8gm98oh7vz4kl2k1km2d779mb94to8vs5o9jhwdxiwnl36tohlun4xrlfe0tzdscj7dbebxv3di1hugwjz3jfwjrjdyoesnzw7pqmpi7hbixiutnvpcu2kfrk9sl71bd2qoo1nnjo3mgxu7z85aihks9z7611',
                flowInterfaceNamespace: 'b1hfngbtdmep0xrqt8cbwqnzdwuu86miw1l8rnyvh2i3cuvc8fuydpzcee0nry65d3yvlk2hd3edz43bfcclyyi0s5n1aloc47uh1xa7eirf0w2gsu5c9dt6e1jtc9xu4d0c1h1vpimzqowtubf7twpn4ad1l9ds',
                status: 'HOLDING',
                detail: 'Et aut quia quia ullam iste vero sunt sunt. Magnam soluta earum aliquam saepe molestias ad necessitatibus et. Provident accusantium illo.',
                example: 'd41ba46hxwfvgunb6zlfc4go4yj5s0muj4vosu2r5sjnnb8mouzltngndyxokaktu4n9nypqw633x15bvn65yl02y826bp5v98ft0ylsg7vnwhdoff6vdzttgzwr4ad79violx4588kt72jp1vb284abx6h8ge8z',
                startTimeAt: '2020-07-31 01:47:58',
                direction: 'INBOUND',
                errorCategory: 'g8jkworcb3ujpuqul8c229a9mlsz7nd8x16a3osk09aq2rxrq48xsymd4vqtqmdnvnwdo1219yxh60uvre7fujtzl1a0lib0rrfkdxuj04ixnm76nl927nk7st62tlbxml421ri7lf187xg0l16k67wanlnie267',
                errorCode: 'sc1p2r8zoxn9ljfcl96mvo54vqbm52pqmc07kgbk3pl8mvfrpe',
                errorLabel: 676475,
                node: 8403430385,
                protocol: 'j9igoh21kx9wu9uyrbyd',
                qualityOfService: 'wgpzf8u9b7yup3a4948d',
                receiverParty: 'gpazr5uq287jttke18kucp3xf9etoyhbos40ww6tx5gbgvnvte5twgp4d2op3pyrtrhj8zknb5dz699yz6vqsf0xxzjrf05o8jwupfe35uj38pyofcma0vytkm1tcr7wqwcjsj1dl20t66ltssifc77vzbjrm1zy',
                receiverComponent: 'jwx2xrmoq07jh7f65s9is8tkg374gcfrvxjuevs4h4guiqz5pzwvngqwuvrjuy6zg2svwa03r6ngjjdmbfifm4pv4f98fw3euwfj9wk6fgtojz3xokktqazg4aascbduo5wgr6mcbx7jzoz0zdf0c6nlh8z1c22e',
                receiverInterface: 'qi1a53wit1y7sdk4ppermgxqaaj7ao6zlndc58menrjzt1s8w4c1mofhcz22btsslp1leoyag9tt299ar2ac4kk9lkan1e8z70tmuqk0uv8w210zgm2u121ydb3gxzw66vzs1ao8pfr6rrder4pr0gdzqlbb0ylf',
                receiverInterfaceNamespace: 'j6g16sc17za0iut59rx2c7c9ca4qkk5mn2k80vvzb2toxovgfv46o5r70k8zwbhytvak2i2c6asixk3cm7uh7lmjuribm9ayuf1t7o9yp5mo0wvf4ywiaibbc8vdu83l3d1aphdcmsbmbe3opmzke5ja53qvwj6l',
                retries: 9951795673,
                size: 5272619020,
                timesFailed: 8009045871,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '13fxbimi4mm1i8n5hio91npuwz3ok9ljvftrpgfo8526uc4xkw',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '5n1rlrfkayipfa8km1ak',
                scenario: 'vyudt11ogly9uk9exbcl08emt309tv6s8mushscf2yqfnbrpdppddax3v1f4',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                
                executionExecutedAt: '2020-07-31 05:00:36',
                executionMonitoringStartAt: '2020-07-30 16:00:09',
                executionMonitoringEndAt: '2020-07-31 06:25:35',
                flowHash: 'cjfk47zbuj65ymno04kgrjsuiymdeekedjtdsxj2',
                flowParty: 'sx783n90pqwc7ygto57230xf41migaijjfm7j65ju5ny0i13g5tkr1o0on7uc4g1r32by9cy2ddvoqvunnms45dpg4flgyxjoly120n2x1g0q4x5601qrjxjwy8xh1myvl4wfcgh2f509to3gwyetk2344npbulh',
                flowComponent: '5nfzrbolihd5jo45se09e64otii4c1r7bg1e4k1geqn0b1k0mz2o2h8438ucq6zxgzj4tgey79sj9agsavlyr6so3o2rh0b29a9w9sicujyy6vb7lnkok8b6smvyqt3b9l1r3sliiw3of7rwiaq8dp39u7xakkzl',
                flowInterfaceName: '8ggm9voq6htunod7dycb9l2dn9gn2g5y5exs20dmmgi8bmci3o52scm4noq7fhnwtrtll88hnaadkg6rssvys91swmn36czgzkfbyilmgl31twjsgn5jxzv77qt9mq78zr7jbwxh5o5it0xb79e801vxv45vhqe1',
                flowInterfaceNamespace: 'p646bd4k0avznjhye4vhx20y6h37y57aspotsel8r135hri76csfr0w8mjsf8l6x21aqhq3z903k84cjo72uri2y4ybnq6ldcd3rnh95ibnbrh3x36mkqpyvz04toqkiqi8dfvb2h3htcwgie98i9a4jk92v3i1r',
                status: 'CANCELLED',
                detail: 'Totam eius quasi reiciendis corporis aliquam. Excepturi eos eos. Aperiam aspernatur consequatur.',
                example: '4o300qwxw52b3to31vvibcr9k8js016gonwwcqev95g1exliw8xy5dgtw3t657frfnzlzn8lw3jkefy8dznfpnru78q24v9z75e03gvxs1qvunj5m7pseqc37k4ggbflh5c385q6oikc58t6aodsjlen0kc3c6ov',
                startTimeAt: '2020-07-31 05:09:25',
                direction: 'OUTBOUND',
                errorCategory: 'eeg9q91kv2xxung9zjjqi02f3o4lwn6fjg79o9cif21xj5w8sqdbrbkadu3mol8i1fssqtpj540rgmr9rg05opq8aqgb302p2zqxe4xxodvav5acgpl6do7owybipfzrr6xkau2j97lurou6qq6s52b8tuc7eyf1',
                errorCode: 'fq3b6nmj421nioevxpcurxyzbm8p94sf442xg2xkxlwpzlct1k',
                errorLabel: 988212,
                node: 9694874570,
                protocol: 'b853y6sryffgfc9ijhcs',
                qualityOfService: '78szvb1iw2wqibdiswq1',
                receiverParty: '4ug7ok4dw7g43xiltej1jr5bic1zabc6ek5qac384xbvomqoufaoq47jf08kdircby467mlrfzreq0j5525ny18twin5tkmiysswjqq6beyjmu9n99bjuee04cf1f14nrslzmqik28ldw7adkus8v47yr3st31gh',
                receiverComponent: 'oq9925029f15k2c8h2fxt1hbpc4v1t0ht8aylna53g0xbvmodf1tz821btqrroz4cfl7kcb8gscgiuls34ggsq9rjesss2eqj4gt5vzw9d301a92h0n9si2bernajrhgpauga0pmik4nh7y65k53n3smakzr07ms',
                receiverInterface: 'uze5i1mfon2qbw9rt133bwho0i40ipxhkcxe91ggrwzykhlb8q09o257buudbx4s2dmg82idpt5hzewhwv8shpxp6cd1fksnijy28r3e56uyu4cef12ou5yuz6ax8bnp3dvd09l4xv1fl8g4k5p7bk4v931h7yjz',
                receiverInterfaceNamespace: 'pmmzo1bibolnmziitdt68wd56ospji0awsm4yinkn6ywzrf8nxj5cexphu78bqzjv23b1z0rgneoubtppehs694v10pbrifj8frle2vv65yn1npgabz8f6luv2l2gzxoklfbyrupua4k56wke14pg13o57pj453u',
                retries: 3231648546,
                size: 9524540072,
                timesFailed: 7515472422,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'uuur81fcxw2givuy4yapl7kv0yuwcfeqf5hjq18kkgaop5atos',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'gam0t079orvmybg8kzc0',
                scenario: '19ot241wbdvjkoiyixldy7bw7ayr5y42l6rhask386o8u9o7yr2pijmtcibq',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-30 18:54:09',
                executionMonitoringEndAt: '2020-07-30 16:24:28',
                flowHash: 'w4uvc2fn269f64mlod1oihpjj43fu9iohuwiwzap',
                flowParty: 'z502cf17h24drohiz7siqynyrfrpax7jcqse3xhi98w96ese1qibjccwc2qkbt9801xdng4h8e2qnxb720dhb86pb4ibfhq90ww8srudnqq8kx9pisuu2ktqqddkn042d2oag96sgjpf7iib1adugkk6emtwuqzq',
                flowComponent: 'usyv9pgdqas6ufysfblteh2cvpizfbopvfleiy8h95ddywlfudn3n467mqz80kzkz7vu17kl9wzcp81qn2tybjcdp03nkn9sq09sl2vkyyevvs5lket1rw2wb8xwerw7ddxn90a0vbpwceg6o1hm0mwhypwqym7w',
                flowInterfaceName: 'nny2mpphwj28sfg9o6v0ext73zh9his6iuxq36lq8nm7yf3cs992fwbqswx75v8am4v1sxx2qxl0hvkrvx8gt89a6n9o73yuslda5xoufrtbx8kdvb17isfq1o388xdb1zyiqsoh5yr9fgcer8gje0f5eclkjj3o',
                flowInterfaceNamespace: 'h4cysd6wgnfi8v5z5qy6xs22rh0deqxa0r3r9tcejsshnci8g4p2ntcj81ghvrij2tne139o8wfpa62esk9vz1tarz0ofa32h8tqwmb3vnqxl27fql711ik5vj7zk40u2ghd9knyi6zyctpauekplqmb075iz6mj',
                status: 'WAITING',
                detail: 'Explicabo culpa quas illum ducimus quasi quibusdam. Ratione nihil earum aut. Aperiam distinctio qui quo ut rerum consequatur aliquid eveniet quibusdam.',
                example: '5r57brkyev1ywp2yr4ouvpteg948i19a4v2s7qpjkq553lqj82zl5kp15fdurdnprkhcf5gyf7pin8c4lhxjq7tmn7dszh8k6vn8akya8063uke9swy12z6nih0yg2ibdyn4g9alzbu5ax33mdb1bii7qwj7l4wz',
                startTimeAt: '2020-07-31 05:33:02',
                direction: 'OUTBOUND',
                errorCategory: 'bynnuz58azyu3mxmsxy0fmiv5ywnttq76rj5b2m0pcqyi6qj7qvrzfjvbk5svf2t3bhanrrles3pnq4kbmsjrg27uiq77v0ijuo8lchn0eu5ofgxremtjyw936uj9aupr4y3fj7xc7pbzypqc1tkhki7k2jaq3tr',
                errorCode: '5ps2o9ic9v7k6fwd1wp0bzfuf8t35qczq80jii8jfzcc2280on',
                errorLabel: 471923,
                node: 7881339506,
                protocol: '08g8np7xeli6sbfhkcsh',
                qualityOfService: 'etad53u3scqc7ebyausi',
                receiverParty: 'oiq8q7jaf0tr99qo7pk84sei0vvzj8cu6ue31uet8rk3yjfa56r8strkev4u0h7zifm6kv8hk4hfv4wz6zmg0og45xpn792mn11je9ne7ikv6o1tshgh4p4r8pcsm3q60tkena8opnx2eu4yv2kfc28zj1b4r93a',
                receiverComponent: '2hsh1oq9t0lptb7s64bmge0dwo7jhnmlfsy1v4unpva69ci4ickaz7gfq8jg8741vphwjsa5yd5ch9zfk84128ey29bnffone1itgmjonpdbk21b7cpsgweotyb6wuh2c3npaur7e6r7twwjvcc1mbtmpfjefm3h',
                receiverInterface: 'fnnphpjjuksjy5u1fm8nrwgo4cus07kgrhbp31h9hc8i4lfy3nxrynybbufpy1ot4t1i6aa2ps2a3e8241f5hkr4yr40qsm2khqww5yootrwu9pn31yvupo3nk9rl3n7dcbhj2sgttyaeitb5xs7cuili0dgpai7',
                receiverInterfaceNamespace: 'e0cfkeszvvmv0y7f2cxdmpyval3v9ksl6dyik8ylh0t1olaz1kx2vgd5qyk2n9t1uc39bjpjtluijrnecrrkf56blaxgctkgf2fqrikgg6bhbb3f2l5ff7i93jsn6vxecslx1qcj5ci67s3ikfkl96uq8ncgoxqm',
                retries: 7743022056,
                size: 7587378502,
                timesFailed: 7545619691,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'o952x7ltst2rpldp5tvyok10o1cwe1ns7k5qk1cqd18xhyndsb',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'enydfgc0t7oh1yru5sm1',
                scenario: '4m5hxmfm7lceu6eghx4haieh9u69qyv7fn2v9vzddqi2x8e4fus6ujxbvl8m',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-31 06:03:43',
                executionMonitoringEndAt: '2020-07-30 18:03:02',
                flowHash: 'thmiduyaioiq2osjqczgmx1v5uvifu6zrbtczy4e',
                flowParty: 'utsyuzpac8r57gof0hycm2h5ussyqr6gn940iz826ixe7r6yqxu4nugr80p7f5ma9dfbzphkh753p7oqczqpqnm83fwbm0tbyc45m4dzl6qsjny9dn9e3qn9llwtwux3wx6lvrwjt3cpjk628sbe8v3wvlrkh6d4',
                flowComponent: '5fumh04rdo0mteqxhk1wam8ghtt4bl02b335txgco4u5z9ts16avjd9tckcu4dcj4oyxsyd8ovbn2u78qawv209qrwwhk1ee1v031vw136afw4a15ylywfqa4rdquudb3nrj9kj63oaqa7dm4tc8qyo6oqv81gg1',
                flowInterfaceName: '57ckwq7vfmaz0hmabadu4iib10zhr4wufihidnfczhxpfcsqgbjzl0nqvoq5h19grrvxn9fz2o8iv4cjzst34yjq8jzn1qbgpl6yhmc1nu59lja2ng0v4faffwhhixwea6pkohttg64wgoejnjp51x3si1ozh3jm',
                flowInterfaceNamespace: 'mjhncs6sxkphtgl1q1frncw01mi825mgmnx10o1hkkihpr9u7crhmnl0n8gj4j7rrcwcfv3ncr7brqq4zwn7wsm7qybxwrthsiks8gnkk824o5wl8l2g7wbl295p25r8659191h7qoa36npv4zcy4n3y1c00iiix',
                status: 'DELIVERING',
                detail: 'Cupiditate aut voluptate dolor eum voluptatem ipsa labore eos vero. Aut quaerat voluptatem aliquam. Adipisci ab nostrum ut blanditiis modi doloremque. Qui et vero exercitationem eveniet voluptatem voluptatem aut itaque consequatur. Aliquid eos quos cupiditate accusamus. Sunt quaerat debitis dolor odit quod mollitia quia.',
                example: 'ty5re048pmcujx23i3aiy7ww7dwv7bo692zyo2umdnpvfrgm5bvsglnbuh70u6w7c8uzqvfp0p1ca9f0dzh3vjonmymxd00pz2u7sh6xddng5pdi1bu8zhxuw1tekejp94ww1p9xzl6c7uwkja5b1b5gmq1em46u',
                startTimeAt: '2020-07-31 05:00:32',
                direction: 'OUTBOUND',
                errorCategory: 'la2lhhltszd399r2oje84ke9phd05p6z2ns5tu13w2g5u8hrndafst7ml923h1gp6p7cg388z32grqihgp7c3noha7a4f2jjd9p03hu4kbswzddiqp88kt56vxmahu3ufpfnxdncokdhx3hcmvne933ulpi95cw0',
                errorCode: '7u09ltr1r7c3j5wwle954270sf505d8qzsnaq5dpm59kxib9zx',
                errorLabel: 363817,
                node: 9479825205,
                protocol: '997tq0tm4856jqj4r6vz',
                qualityOfService: 's2s8i0ij124b2p7ijgnu',
                receiverParty: '24j1v8nslsl4civ9k1fhb8ijai14wlryvscxhyd6kfm4clxfxdu19av42z004u8u5hqden4i5szq5fmoo3l0ktw3a6is8jsykk6wvcjnhcp43j6g9fprz8z2ypahu3ccen8vyc1nyjd6i1tnfy6r3yimfbrdqi5g',
                receiverComponent: 'ivg9qsdkdnafbqp29gh2d8ozx963quu03kv8zknrmwnuak92v81g40urark5avrt3wvyyi84pjzjd3cffzynvgq2kczzpjgccvo2q29sieoijiakdgnd5wbhetqbzn3cqxe214yqejihwemxndalqqrmi1b8bu2n',
                receiverInterface: 'tztku0jehsogd4qqwj47m43zfd4jl5otjaaqu5gunzmgxlenkybjndg3n75q54wo7pod9ewh2mdgohgni2lmk88315iwqbl5aiiqjnt60dve9y9qh2yubjca7vkpgein1s59vmym6kyrf3mekllv4n0tk7loa67k',
                receiverInterfaceNamespace: 'yjsfj5x2r2s36muk6fcgbciqfqnnqys3ebvk1e3qgn3jbp0oaom2wehmgvhx5gn7iengqvkt40pgfyd2qm6u3vtltxpdbjwiqtvsyow2zvuiw8pjbn1nnew6tuueax1oi99b8sxcijorq06tvqudy3npzs8e7f7y',
                retries: 8623867330,
                size: 2823875417,
                timesFailed: 6029872956,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'zfkjxse69uq74fqee8beifwzqht0ir4jp1hy7svbnoqpethk7n',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'n14x6whoyjwnv07mt6kd',
                scenario: '6y9fpz48bk0k4uxi3dz38g0zry0ollflu55o3xi24gogkjfk3qukl3vodksv',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 05:59:06',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-30 14:29:08',
                flowHash: 'exrp85upjlr5mxd4pr7t3k31xyzaclnbgzojymij',
                flowParty: '3e2dltv3bh09wf5faou0o3uc68vgnla6iq9rhsgjf3ygrsqhoh4qox6fsy4kvjvftw54wriwjbb3ytlmqamervktocakv3fli86ibhqfwz36fjv3zqmeg3ecyccjjqnjlx0doobge7bghfu91fzcpy9aubpb7al7',
                flowComponent: 'pplhpek6tc4o1oxaypx4564s798ygh2n7xco605hf7107lm4g2izlmjpkt3f3evu3wtfs0svjdnsqyui4oz7ghjh0rowsvkevwjntpm0mqpv501h65a78wr6w09c4fb79n81vts1maw2ahev6rbfg4s9bxryiqt6',
                flowInterfaceName: '49dqk42lt2yhnpilld60mkj40avio1x46rge4rntb5gmugcx97gduah8sfowd506bmdum47kk8buvi6vt3hxnt8ofw7rylqunt4bngm8axk1h6bjl3ok77cimzx6vl2l963a54ko6hgzmv62fg3tfvqg956tklpy',
                flowInterfaceNamespace: 'syyyrtxsxyhi84umt7nogh75req3lm6xwll2nfx89zmcszaol7pt48qdklfzzc4inhhybgabh4ps71uza0r6pzgu7qabb9tooo0qpapfhw1easc6lknuabsl2vi80s9c04a6bbrykk95zqwzmx543diit6ga1gku',
                status: 'WAITING',
                detail: 'Nihil magnam id. Aut blanditiis reprehenderit saepe distinctio hic est. Reiciendis fugiat earum voluptatem similique.',
                example: '55r6yxrhe6qfbnyot0v374sx3vutnr0nyq053cfflsqh8t9632gq8vkqfc34oqyh1fhhuenkdzzk48wgkte3fsvxz06ora78wek6ti7v6kz3cocfvq3zxe2sie3pcw752ib6i8ry3fewjw3znrio95guusydbfvp',
                startTimeAt: '2020-07-30 16:51:39',
                direction: 'INBOUND',
                errorCategory: 'bbxz0e9r0f366bwrn5kfs46qy4triin8tqspu7eofq82lsvg4gdsrtjf4j9i04ko0ekfylidbf9ndrtcfhv35zpl01oiur1sbvin1tocudrc5j538iob3l4yemg9184bvpumtvnk27wzvdtft8u3wiouxh69fh4u',
                errorCode: 's8f7omrq3zx9w79jib79ju5klj9y06ygch0q28drx08d1zn93y',
                errorLabel: 652794,
                node: 6237101331,
                protocol: 'j9h1lmm387hkfisxur2b',
                qualityOfService: 'rgsjdfj3hiilvbxj2sod',
                receiverParty: 'pv247028seyu0i1v6jzg7bc2xmxay3vtuureglggdbtz0inlemh70yvnchv0r2isef9ow61spllllzqfz8lhe38t8efulvaxvbh19ghsur9m55n85xnryh9e40wsv0g727f8rk2bsdf16bmjepl6owso8rk9cj9k',
                receiverComponent: '8so2g6p4tbwjso0bj4thl2j5m5om8uvr0azbz3i6pnmkiw6txw8uyjvl39s5cst67650lihmcze7x9n9lp12j1vfd6y1x3obll4p6w48j6b29zd9p0u3ydh95l1c67u5qgabb851hno2c5zifolv76sc7w3tg4n6',
                receiverInterface: '9miuk67uoipjnnj4t7b7388yfxpgyd1p4cwqgj9xa5iw432k93qnujo5mjkpjsyxmqfm036a6c9yrxkvu43c2df73k5iei28md3ehu2y6aivzij9xmd1pm185rftb9ko0kazup3rktamrv5pk2cpntm01zlpvw4r',
                receiverInterfaceNamespace: 'dzi86qnjcchvsjifna3ugzp0m2yspd3ad0bqkco3qybfz5j405fs21os4zujs86wir6jrt9gpy4b7k3g9jmy898bftevjqxldpk3n4tbjfdyibxle5chglvxxia40hymbgz9vcac0o9x3d8dt50wj8djvefz133k',
                retries: 4576686479,
                size: 3021685845,
                timesFailed: 9160452526,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'uz03lcbkalqpqxqque4bola86ku6jzm6ni3ky5rksrqqmokbvy',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'l94jrgbwfrzvdj2u9de4',
                scenario: 'yf3ky77nrp8a2fpx0d03e6a6uah0vm692amy7wd5x9ly482ebqyghb123dl8',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 13:40:26',
                
                executionMonitoringEndAt: '2020-07-30 14:27:19',
                flowHash: 'p630lvrpx15l62nz8n0kl0k0td6piihdxdp6k7bf',
                flowParty: 'qeubp8sl0iibfpdfz0rvaimpjel7a3dclw0192o806sp1bupg3h7wlbz7gfm5ldmeeerydeovfvx2znf711u777a01sjq50lgz8y9cnzgin2glq82lmgcixiumle0rbgpa43s7ouiwp3xpc4h6siv0dyw9n82qpz',
                flowComponent: 'wjowaosy98wme7hv45gmlfhxa777zu8hd1jntptw8exl47cmdm5wv4s38m9pvwijhxrr6dlto0o4h3cx01dr9v0zyk7nmmcetntorpjkwa1398m1pwmknrmxr5eqxrlq82m13cnw98gxl4c06p3rwvvhmwmru1s3',
                flowInterfaceName: '4agtism2y1ywpmgil5w9hphyn20hesv4e4uq5ozpai9qsptdaq0xcmfbeopwwaug43xki8rkuwl4i2ue7fylunxyj4lvdy23tvkc3nu09wc1up6odcq4g1py72moq5k43pl93jwweem62okayr8s3oqv47smbwks',
                flowInterfaceNamespace: 'e373i3pjki0bnzy32p2yty41k857c63gygy9zvmwm4p0acq8eq6a8yqc6pmdodxylu9llr7ywvjvj5xk9c5shj74zluoztdmhj1ypgyw9ls499376bqjtvqbgvc3yn04xvkwqud3r1siykskorqa9oln071ns7a4',
                status: 'SUCCESS',
                detail: 'Quidem rem nihil alias alias ea illum voluptatibus molestiae enim. Fugiat minima pariatur tempore culpa quia officiis sapiente. Vel iste eos iusto veniam harum. Enim adipisci praesentium itaque et. Nihil ipsa voluptatem aut et necessitatibus.',
                example: 'l81u9uc4nkriotq0hgn6y1332tza3zd9vw5wu94o3h14cmj8zzdcpc0hxfpvgqaxu5vauw9ln7typc30ibibfhf9wulgnjsg78v3p91voc2j4qtaw8if642on4q1wwuc7ur7twh7labhyd6n2vvrftwmkmtyvb0t',
                startTimeAt: '2020-07-31 04:12:58',
                direction: 'OUTBOUND',
                errorCategory: 'lzyuvl6l631jf4uscv042boh0mssonvbpab5ompak30jqadfpxva21knu8y5ejd47ddzyg4pqox6t4hjyjogt1a10592oxki5gpiquhvp5jvldpez4rxhrl4eugz0dtg11nwlsegodn2fvejb2x50g7331300owk',
                errorCode: '4v6ckfad48imagxo5zg2tciqjbkxgx4qvc2nfwgr89rktkmejk',
                errorLabel: 546819,
                node: 4035460549,
                protocol: 'd42whuilygvcbbaaw919',
                qualityOfService: 'u5wyxc60pd7cr49g7xtv',
                receiverParty: 'stznztknpaxarvo9s5xar2o21m5s8k57wwls7xnwgpmf9i6pzbhivzecje99fj4obmo2m8x9rqh58mvn8sgdkhvs6sk6fwdy7r8loiz63frnwzgg2jukathfu2nrs007sf2m1mnyqzc86asw7bcj3gebzn6o7scz',
                receiverComponent: 'frgai740rdm0xtqq5p52s5a6ykth9f1bba4o7gdgumqzjm5wy9q4sf28bj7ai08sxwnks25ajkzyn12lxszfiwg76xngo1dh3idsje13xhbjyy1c8vtlq5fuku6hz82lci7pjil6j3d12cp3ywtefcmg4p562rvz',
                receiverInterface: 'rljf9epp8rwxpb1xqfz7inq4mudxcpy2i5rsepbv8dkyfu1bx37oqivyp4l5v1dvhiu5oo1sekyxwaai6x6afu7hjehdhb1838m68xnkx9slmpctdejibrs7oykwkbq1xxyc6o2r0emilws282ajn4ugh5cxsr14',
                receiverInterfaceNamespace: 'yj8398bvrjnfscf76r4temmqfhsme506tsqw5z8wmjen2itn555avo8mvdr2lm74oajbr68lkcpu02390sq743l42l0jacnaqgkm6bd7ve5qw1e46d04crwifan23x1efi3nyxa2u5xzdgqffdq1dy3r3qpbsbn3',
                retries: 2393249931,
                size: 9491436543,
                timesFailed: 3905153710,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '5h6df8ao2pxtkovjnc2aauaekz0i9yotbqt8m8uacnr888oodn',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'nw63vg264bd2zxcyod6m',
                scenario: '8ccwqk46ovb0sluwmv075to9qm4zr8ec5k94n07rm00gz25rg6js3gtbzxfy',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:18:29',
                executionMonitoringStartAt: '2020-07-30 16:36:05',
                executionMonitoringEndAt: null,
                flowHash: 'q5uiqnwqa1qkecceikzl4kwwj24w28azah8l6z7m',
                flowParty: 'qv0g0b1hyiqbbhzaxm6jtqkpiwqh2mfir2arnllwi0rsvd5qzjmhl3lw4q0490bchemakoj0xgj5epti6ob9xhy2wax1ophjsujwvp0pe66rosk7t7plsq6kymjcurodakt2ybvgzdzw2ou6qnsjk0ocimdts7tp',
                flowComponent: 'fmmnyckxcjjsyxgqqte4r3mqr8e7ldapr7cf4afstv90g3avmgwrol7hq9tz1a2joa85gda4yxhnf6ykv3nvqxxfs0ax7fa9pvqa4hpjjz3y2u4wrvbp93v5ibfea7y6tf7a1rq4y7gsz57s5gt7nf3ux7zy16wx',
                flowInterfaceName: 'solc4fkuji9u4dpoijec6qbi3gxdx1wtbdfq1blneequer9pn1lx31t7fgkxbbz0dv3zynjpo8km8o05qzvgm3l7lit2glj4tkxf2rhxsgyum2apan1cykagsh7tm99rsbdfks1ss3z9n5gggmezvp1ajfthdhz8',
                flowInterfaceNamespace: 'a974a7n5858d9map0lg86b47mkgk6u92j8jt29jaz6e9hycmthbk0gphly99677bn59evsun0civimtb3mpd8r60m5j021rl71keot77q4yqw7zrtvq2lpo6z33pymv8hwww6s9s3e8n1dlqlpwbexpmoxz5u986',
                status: 'TO_BE_DELIVERED',
                detail: 'Accusamus enim beatae necessitatibus autem tempora consequatur. Doloremque consectetur doloribus mollitia. Facere quas facilis. Occaecati et aut quia mollitia esse consequatur magni. Aut eos est.',
                example: 'mjpe4eaqb5d7qv71k1i8br6zazix6k561c9m4dwtzz0lkv77guieulkq5cx8bqc4ymgwoq51ww7vrzp8g9cdlca3364zedyg2uzpmgc0v3yu43nt674dqgoypez70j0bukm4j3y1n99cjoknwt539dwei8uv62ax',
                startTimeAt: '2020-07-31 03:28:32',
                direction: 'INBOUND',
                errorCategory: 'ijbtqlele3b3owr2e28u3mmyyla80lynutlk7n1wqpqfwa79h85cw6lnhx3dcpvi4mpd1bg8gh4y2fnyp6kdtrb3345ztgx37nz9wtc2ds7ko0piroemojwxxikg1ijf9sqwdz8mt90umxyf4ajhdqkiu8a8ggmy',
                errorCode: 'qxp8bpklodevjs8rxac1u8wkniwzufky7ckoa5mcr2vq8slvw4',
                errorLabel: 373589,
                node: 3691726094,
                protocol: '25w5jrr1e3x6fc7fkd1x',
                qualityOfService: 'cukob0ecn1vmae7yha58',
                receiverParty: 'micdsrvz6i6plwou7mm1z6csjw36wulb697imw2ny1zpqxnjmdui41ra18li3h1fot2j7nri77gasr7qi3zpoccdl8z4ihrh5by1p1s777riv98rxy7dgbslo527298ue9u4bnz1pqe7cz33asj42q9ouykq82il',
                receiverComponent: 'onohbgsbwg9wrsxixp0ti7n4rxk2n3pafg4b1wbz23p3fzuqztjdfhfjxwlxeenk244vsyegtirofu0to1e51ra3c3h8ap36ncqipaaq0xvemxwnohgg7dvn41vwr4yp8vz64c3ov3ui787dv517tj8847fiiyve',
                receiverInterface: '5tis6h9p0f1oqkzuh6ghhk1tasy2s7le2yhtx9f41h400es1rcqkk5icqujv0bjqkoq17mww7u8vv5rnjb80dg26k1qmeu3r424vwnzwf7op2y1v8zmfto0hidcvqeh0sss8u203juusucyb33dqegwh56rw73kn',
                receiverInterfaceNamespace: 'sjfxnyab3ia9l5pbs37jmhrukxaha25galxzuar1kprrmjl1zwkeqhfmwau9dvh5xiwgnnyacos16cudxgx8o17kib3j2anulmghatbs0kyrvw4o9ykgh97is46z8fyxlj2kho0bh6b3z6l35qtxpgu7q7bicfkc',
                retries: 9103939312,
                size: 7234983797,
                timesFailed: 2483557155,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '2eeykjg7p9b3qt36owjiox9xtxgqxf9f4e83z3dexmke9qe6zu',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'nfn08zx5yooyfon9gj40',
                scenario: 'ejlltw4g6ta8ixxmrz41qh78s9hmdzjs33t6kssbfq1213nrv5csnrxqg5vf',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:17:44',
                executionMonitoringStartAt: '2020-07-30 16:37:02',
                
                flowHash: 'vbxwc3olr8sbkvm4jw4rglo6f0zyrl404ycdn4jn',
                flowParty: 'njiln6ccxd6fp9sonwax0y8dq5aku1b0whnoic5n77doauj2p1r6bx49silyszgys08au984fnuynzc0bheuurf7lu8qseil2g3y9d3ihejf6hkmnq1d0kzhlhdrnyunss2embkkslrit6t86467qv75ud0o708w',
                flowComponent: 'uwp5dcoyfs3g8pricq60z7ku1thlgcwzwdcw7vjszxflgxcamoc9jasisyiytrqbbbxu47teh33f6pfvoh0i9cc9fxxmgmx5urc7ezy4vf2tnyghrhcfwc2sj8quylqkghbzcjms0zhl03h6x7anlaxmndx4l5ml',
                flowInterfaceName: '5ysqv51x2l3q2cwsr62hv4ktz92ou3gzmgk6omwll68kd3ltvqofe2to0as0lr9u1pykm3081u9bznpgei3xx8ldbusujfrl7kj47yystcburpkc0dou3o70rihleqix0aefxdf82ep448me3yicmn4r5y3k71n8',
                flowInterfaceNamespace: 'e1ibfe51iw379qdrel22jjp5mtp4fu8hfirvap5fu64jnyq4ade8gh3ny89t8scsr2glhkj5gt65pz4r0xbpzu6qh8c1c3nxmx3605v9yy0ae9kw32rj9azkts4hfd03xz6mcts0gznhmwq9jgjqhjx2zylx6ubr',
                status: 'ERROR',
                detail: 'Dolor unde nemo rerum et voluptatum consequatur fugiat vitae sed. Esse voluptatem qui velit sed. Voluptate nihil maiores et distinctio eum id neque. Numquam sit illum sunt ratione et. Aliquid enim ab. Nulla eos voluptates earum enim ullam dolorum quas.',
                example: '8ru64k9d6nnqihi65t2navvsh3jokcpffebawcnahcfwanlu6mwl0z012jf0dpzrwe6oe13xtlpk7wum6su6vztx8od1htgwybsk3s6xw8nxxvrq3kwmv9390lxrb0y7d92h9zmue8i8cetrys4abmrucu02ti9g',
                startTimeAt: '2020-07-30 18:07:31',
                direction: 'OUTBOUND',
                errorCategory: '0cfzzp76rm7msb2zmy7rdqkx1aczacnrqmegp2vokmzqjs8hhda1qao02em2jbqn351q9wcyee6eyl7iuldhejabpcpsvkwoarv3ned8tcq6we72b5szdv5hgxo4vae0ivu715v5u5h49ogmmvsa3xig21u3bkqm',
                errorCode: 'dfemtg88mhcavd48oj6jjyn7hhy8enbcub5kstm4jb4x2ngmgq',
                errorLabel: 960116,
                node: 2661982112,
                protocol: 'i5kovs4ybizpn5p5q1fv',
                qualityOfService: 'zqf41oj7npe6xlvryxk5',
                receiverParty: '28eaykh5iqmh75q4jghbkv6ufmkheg2dk5i45u4kir5iybqg2n4321gh3i8b2velpgpb4wosprld71qajg2jeaslo38grp1sq3x3kgio05hmocd6ntos3lquwnyj28clluuz5g39qy94x1ynnmnocb1d91iuzya6',
                receiverComponent: 'w00pwdqegf5eiftxt9nls718phhy1lkumgj3orzoy7obcbwo4m7pbh12ncoqfnkuuf58d4nxsn7c78qehiy8zqxe1wp7xroagmwl5t4yv2a9sy2ozqdpqsuia1urodrju1ioelliyp8r0qf4c8mjvzptl4p0hk81',
                receiverInterface: 'aezkhw1jdcaadxkb8zn2qvjwhuxiwqf49ha4sllur2kfhjn33869hziwv9vt1reykfjiv9g0yfdvh0valjotfacmuv1pbzoxj15w4qcchvbnbfa7o138xs2l0kqosuipuzbxrb10h65onflbff2mrgve4ccxoq2y',
                receiverInterfaceNamespace: 'shepj71bgmum6deu23df7lz2ic0xqn2qn3fcewxkiuywf01x9m26616278dbywescxcpg137799s20hqgfhv8g9y94clxtdio5pa4qysca26ukmz2skuzogo5x6ud4qzthojzrgn6x7odxw2vd6xycx2ti8cbw7p',
                retries: 9972448503,
                size: 2688868867,
                timesFailed: 5876893573,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'g5l20i2vc7o8e4s7ucq5mzai87eaukolyc0eex6jg5fcu2iri2',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'kwo9p1vj2ve6pd7vdx7m',
                scenario: 'pklvec1bnvvl7um3cfkcbcnsck8yhqzt7djj1oytuyk2gbhh7cscpc7h5dhe',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:52:04',
                executionMonitoringStartAt: '2020-07-31 08:02:32',
                executionMonitoringEndAt: '2020-07-31 10:19:12',
                flowHash: null,
                flowParty: 'f299w7qov6eetknf9ujnizuqdhw2qivtmp0jaxn4hl330gv1k2btrbu1m0jenccoud0ljoybyjz5wumyik7f1fbk06o4lfbq9wmr9t3whipt6ee0srydfuc8jtmph0iprw71u2p17unhjr4j0xzcuhhrspdkf8i5',
                flowComponent: '4qxvimyt9l2yleku8z9dv1zsw35p34e1f4p2m7y7cqlbkm2jjk1bpbavokknu4pphcgvkn1p30ctqs3odzhgt2c1iwsfhc0d13vv5nh80lnum0g6ut85moxlpjuzjsao8skuws6zx98hegydsozua7f6f7pizcl6',
                flowInterfaceName: 'xlfl6mjppyc2lcc194irequtbfze709i8u9hmg9l15b7qsrb3zv1fuzqv12bwihrkxym1en44vs04vpqstkq0ln6srvilattwutq95d079ur5uvvf63dluanffjwfvhgtzh9v11o8q5acv4jlmqn9j3ahax48qhu',
                flowInterfaceNamespace: '9z0p9stlrnats2k2u5ij9f1bbrnuquqm30xkb1umtem1z83mgdct0o0hzsgyyklftoo34626d9zwk0uxlebpdu5riedgbterso5u6pkdn8nty7048hy5s79xrrw6xl49aggffo05tnjg4b2z025mf8jj7wbo2u2m',
                status: 'CANCELLED',
                detail: 'Quidem tempore consectetur quo nostrum vel harum qui ut mollitia. Et quae consectetur soluta nihil quia ullam cupiditate. Vel velit culpa molestias odit ea commodi ducimus at aut. Expedita dolor vero ut iusto.',
                example: '1m8bb95xnkg1657d7iz31ycdhzagag5c2p03b36v3j3u3y7q0mhk32r9ywrus6sm0b0bn6vh8373atihqy2km3eetjoupyyyhchuditqovuo8wehc5o4fc0j45stl98db8236d3npok3phx56b9ajt5gaka1ulfh',
                startTimeAt: '2020-07-31 13:07:06',
                direction: 'INBOUND',
                errorCategory: 'h9rmtknshtmg6s5f98ilkuu8dmhkvdeayudzatp4i27geav62486duugsymwe8lmu0afj6qqfbwdwoof8hlmtld8fzdlohhwwo4l6vunsc8s2fj8y115rfb7s3bixd1mbitz91uxb05martyd3gcqfawjvukgpk0',
                errorCode: 'eelwsq9yep4fpszehw403oqa82r7680nuxjy7sm0u7uu23keh4',
                errorLabel: 229849,
                node: 9422189356,
                protocol: '6ucbcdwr9kzr2jeaxazh',
                qualityOfService: '8qjdtxuymmm368ledrlu',
                receiverParty: 'ytje88dkj0yew5qo1c6x7kh2zcy1bukdvnjbnr9w4taxvgv0wmr6e8efa9mykd0226dyvwqpaaxr81kmcsav0ivb9f7vnkqhq7axb0vjh6crd8y1zphltppjzu00n122yvyyql1qzbqv04dwp58e38n9iif8s5wc',
                receiverComponent: 'xk25zwkrcd5pfcdtu2nzoamcn94xrvww5tpzsdw8hsoj1km7sk49cr6rcpm4o0ykq0z3ey2qlxy8zif9bo0u4gnjk9culc4ubmak1lmdwk3otgoaw8azply88o1etvlcnw47cu6rbtq060g9qkpw7xyd957j4a76',
                receiverInterface: 'su2i6xmo04juf53ytnul51h83ksc23wmen5dtsaclc9619sr0w4bfyvdjiq0t7r5z8mq4oggh9bibaanm9atqyyxjddhxqm9ejve3sc2ibk73p8ivg5f0vs8n67uwbhnvs9vyut0v2c0o5rqik7twpwelli2fabo',
                receiverInterfaceNamespace: '39asulxexaency7cjsr7fx8hn4v1enug2r7o4gniwmor5ac38sp5bghcqsy6vc7r8yuivrrf90g736yagy2lc8qzwoh7cb9x7sj5c80aho7oax2bstr7i9heq6uas2lj15e6gct3du8x0inuogxw5ri8fydv8nlt',
                retries: 6879817820,
                size: 1781129398,
                timesFailed: 5794483181,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'kci2uhdw6tj54oald0eqpiiicxiqon625xk48q2nkqqegf3fqo',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'xay6v1ddbgi3mtc146t8',
                scenario: 'ky48r1c4huwa95en2htaw837n5h1sjxml9bzo1xh8hkpwas9j7jx7agnoslj',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:32:12',
                executionMonitoringStartAt: '2020-07-30 20:13:53',
                executionMonitoringEndAt: '2020-07-31 05:38:22',
                
                flowParty: 'i71965vgoultnv394ekae4j5cf44ytumuq80ayeb14uhcsawsn78icn0utgl785z815fb83vlepfga1atpkf1rhwgti56w3nofs4bd3mizo22strsteylampqhfg738hyzfgkkmj2vesc839b6u9xls33lh60zlk',
                flowComponent: '4j4pvcqv6nov21qspx0z3o6naqyyz9wq6y61wpa6g7y5lbazpb3kuwvclme321du3oqnrf9kk0o3k86fv2x9s92odawsblop9lqlzym2my1n9cdj5y3dpbrdalt3dxlef9a29qgp5yyiy8mudp7c9etygum454zu',
                flowInterfaceName: 's44x77ztof459ap531ccl84utedqu7p3wtiw0k2h57r1vq4eagoya26z2zastvfktbeffvajitcew11409au8cp5zm3cxclg141kog5v98tgq7144mdd8kycr4dh3ho6josg2j6tgqdxgb2kdjcimfak6i6rqgbs',
                flowInterfaceNamespace: 'smcoqomefmw9g0ize2blepgizpepehjtj2s6xi0iglpuqtuxb8biyy8uyse5yvjm85s79m64vs36mk5sx2ieagtsmdgqwpb36nacu0y6tpsg1lmog8hhb5jzf589lhtlun4d3vpsv40c6wp4oi0ilaz31tuko6j8',
                status: 'TO_BE_DELIVERED',
                detail: 'Eligendi porro est. Reprehenderit consequatur corrupti at reiciendis nesciunt sunt excepturi. Similique laudantium tempore numquam molestiae atque minus vero. Exercitationem deserunt et. Atque ea est voluptatem. Aut dolorem id porro dolor sed.',
                example: 'cr3rcfwd9g3bshadb4i6gtgd5cn5z4csnf6nmj66pgcm52l52er13ecs051jo4xdpkp1i1cvlucygshp8jor0l8ph10lv7zytxkhhsdbm7eh47be24zcgjoauy4bvzlqzccpa4kpre95f539we9qk3gm5f6cauy6',
                startTimeAt: '2020-07-30 19:21:51',
                direction: 'OUTBOUND',
                errorCategory: 'pwd900iyuc8b87kgpr570kjnwslvypn1iamwudt5kl42ueilfoklokygsaheawuv4ysq6664rrgk5gxrfs130n37dadi690k76zdinvqdyewjmyul2tbfmc133oorhc1zmkgftqxus0pwjr1lklpjwpw30tcrned',
                errorCode: 'szuow2hw1zft5l49992r9lyv8cq71ugzyy65y9mjd66dvi7get',
                errorLabel: 484672,
                node: 2093334670,
                protocol: 'smc73k0c9bp4dhmarsl9',
                qualityOfService: '9meqk7q57msiff6npfwr',
                receiverParty: 'sjx7iqm24h43cymr9oknbm166s9vshry98izhyf5tyh6mrw4vpmluoabiny56s61t57rmp67gp77tr4h8srv4j6v11hrf00vkef8uaqs3etssv6j8dghll76iajvzga69rhvt30jlag6coj041pw878y0055pq3f',
                receiverComponent: 'xvbc2v7844xsvlon1bc8e2nl6pg1ovrq0wl75v1tdvsvjcao4rlrc9gvdyqd8sanr98ztnwpkc3eb6nhqajomc9o6l1wi1wrdzj6ehqy1900orls3fp9fx3pl8ksnrwu6xnoi84t3lsnxu6el1hgsgdewtc6qys1',
                receiverInterface: 'soml4b46mjhixsg5knehxycoda8lk63fyxvz9i4f0cnzr1gyu3bn35so4q5g6svgul70nfutky49qrc1mef3x484xo7p74bd7md2hghwtrr1t9lst3nbun9ppujh8fmy9v1jcxpoiqcvgrj13pnnjl0rcgd3oehf',
                receiverInterfaceNamespace: '4xvgiludxutk4m5e0oowsqma7vcb7835ng3n3ucdmtqcycp1mh94tbj9yb6bukipspv5h0vjjmy37bzh56k6v2qapwekxc5vyg4enh0xn2iflxg9a7axol27ti3idaykf806rg29v6sbooxvxm3c6t5mztcxxqns',
                retries: 2277328375,
                size: 3694788004,
                timesFailed: 8391776152,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'aqrm4l7qrvynalcvtnr7whcpyk983er97dqkrl7at97y1q60sj',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'bcp4vapnj6gjc7i07v72',
                scenario: 'prx1obuvs03p4n1wk3fbo9akyklsyb445tlr0w5zmg1cuc4nxyujfcrdzps1',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:22:41',
                executionMonitoringStartAt: '2020-07-30 23:13:06',
                executionMonitoringEndAt: '2020-07-31 08:19:23',
                flowHash: 'yrvflav7vdz9txmvt2gd652q0u11uxqg8g3yent1',
                flowParty: 'w1xb61j0iyy000iljfqr2b5xfm87uufp9f7c5d47j41yziljoudtx486nmoodyqkktpew5l8swlcefrld2d4dq01g3cpvr6pd26l0r4yydsh3gea8y2ndxeecpvfb3c814nu6p8d6pang16ilmd00o1ulcuck8uo',
                flowComponent: null,
                flowInterfaceName: 'zztwuk2jxii4tmclk9plktbxk19yhtpane4mzre9qgn8migbcqlehxthpx2xl13k9ffi63712js2uuik06xr0i4vdsabszdg3sqj1xhe9z3lmols2g6z9pb6hjpg1yfhvo8k86lxify5cn9dw7qu27m7w9okyi9h',
                flowInterfaceNamespace: 'c7umwaqwgok3t6tzj3fb3gl2kdt211glv80gooa9wyggd26y2scrfkw6l5bvft2h85enalf867p831hp8u0evru7150p3o701vlu8vwb1qcz2hfctzhfstzniux1xwr0jokk21e3i2yz1c3n7q4hjamyf9dtlgqo',
                status: 'SUCCESS',
                detail: 'Sapiente est ut quo. Eveniet adipisci facilis cum perferendis. Doloremque quo aut esse quia sunt rerum vitae. Ea velit quo itaque iste similique omnis ipsum.',
                example: 'n8w94q67orfz4def4s3umlljusrf128rpdartsfgwhvo029mr1m79k4vfej279zryic2v06tp0qu2qd493zbmuyfxekux7tni596d1nldkde6p3emr0gn42ri6tyqps4eskm0kg0z3o0rky6hba7mdy3v3o4bzad',
                startTimeAt: '2020-07-30 15:40:58',
                direction: 'OUTBOUND',
                errorCategory: 'oxvpuhc6pvc7mxmxor9yqg4941al2evkxb9avfw9prd5f3bciayox9y2gsl2q4y3m93nuz06osx2ebp8xqs63btolmli6wzoudtxnrihtmdf380ewiagoekslhib3k3a7cp4iqkndp7nox3h7c6ncgqccs2bbyjw',
                errorCode: 'c4jl81eztjwvbor12qm7kcmdbqpdhknd7ulm59q8hse9exoibi',
                errorLabel: 821574,
                node: 2495849497,
                protocol: 't3xu6cmemjfuuz3ekui8',
                qualityOfService: 'q989l6kj1a5pamcudrz4',
                receiverParty: '8mdhrmosx1nn7ljxnacenhmha310o8ypqov82fkzc0jnsow89n7pcbj1uvq9w9dbqpoxx8rgl446sjyl2f0qtrq8yultv1orxa52tghx9jclu1pckvogujqzobb6ahp7mtsgdedjo178fw4hoggol98tnnp42b3o',
                receiverComponent: '0ow3reveorhpgx8tz9z40kpwj4bfrmd1i6yvcomoerncgpy7mxixs7w6umqr6jufipo92s1dx26mmz0wn5wvzzixx1n7td58152hucn3885mlco7jth0i2uraw4f9tbtedr1znt8eo8z1sinf5cbgm850l9n9a4l',
                receiverInterface: 'x1bd6825qz39e8sd027efkdhl8d255pj6rljnv6m6hgd4tjlbqunlc3epgny5kcvrtql1boxtmmgvry8a0ip7ayb2tzygmlyf1o1h23pg3r6l4tc8ubeh66m9417mqw6x2al9t3iadnma2gpl48eb3ib379m2per',
                receiverInterfaceNamespace: '0o7dinrd6ictgdsktrw5mkwlxbyzxxrf2twbne6pk10cdk46wfdki6t1gk5u5evsxo41ialc20pa4hipe484ai0w2v1f29le6qp9w4mv5l4cficxpqah6qmn862aidmhee5otm9vjyzc94i8qkgc8o3tjqiebb6l',
                retries: 5333450498,
                size: 3306895086,
                timesFailed: 6844913900,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'eki9qdp0xf5hc8i9cmhicc97mpikej570dx6j846d8b2qcpil3',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '2lf8tjlb4gcrtwvvjl6w',
                scenario: '7uygnko1f1yjlg4bz2cdhodnywlqu3slm9su0tbp0ca1t5x8vd7h8d6614wy',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 14:08:27',
                executionMonitoringStartAt: '2020-07-31 01:02:20',
                executionMonitoringEndAt: '2020-07-31 13:15:52',
                flowHash: 'wiwyhwrx8ik6s1ozzuta459p12mvijobz7dkz5hl',
                flowParty: 'i3e3ysq0ezf92q727agype4q2nqhc0j29wwlzguv4lzjx42neooijxjdfa4p6wrndmxt9mbjizttyxshcu1whg9vqr9syv4gvxu1l7c11rmnkai18y15w43uakwjd1v7m64ujbi04tug9yh1ez41oxs83hsi7mnr',
                
                flowInterfaceName: 'cn6ohxcsdmth245ns678ol2qhdu3mfig2ki6kygossbbyre8zg0tyeyrw1yf4bmf5tvqej6llsy22e5nibtte64r18npz56vvndlx0ztf4ea6g1wuyqh52q6paovmsg6hzy6g9r8cidzbk8j9nrwhrl8u0gm6j91',
                flowInterfaceNamespace: 'ixlnw9g3f27hgdu5yt2733ezkq68cmgr411zq9lxeiiw5hw1fywv1dv7xssoi897rsf94abdbk7duwk5slr8d0i33ruwvmgf1sgdr270he48n6ha5bvc3otyv3xl83mv8tdchhqqszffgtt159o6lsiy6akjibje',
                status: 'DELIVERING',
                detail: 'Quidem quis earum atque voluptatibus delectus ea veniam optio unde. Mollitia consequatur et dolore. Ea dolore aut quo reprehenderit sit distinctio enim. Enim veritatis ut ratione neque. Architecto deleniti ea praesentium qui harum veniam.',
                example: '2b5fa48735deqq36z073kfzi8xlxhfotimgf5brp3cyn3lep6crnm6xppxi9blrl1k1kqquzdcqrhghd00xvsw172o320gtpfgisvfqlkatvljo4ni0l1bib5z2y5q7fnus3ltyfxx9ge3h8wtq03yzmljm98aib',
                startTimeAt: '2020-07-31 07:56:47',
                direction: 'INBOUND',
                errorCategory: 'i3ovdrd9sh2dfn3554vq8y8evn9esv28jxeedlwivsqzgvkxdlcubrzbqrkpd5v32ednykf1w9i2kf4nikaqaqypqmadryqqrfv0axaasjip4b6mqi4da3nsl4pg9e9t62gqut92nb2itaveysmo3gnjxuwuvlio',
                errorCode: 'vfxa1xki3plsmx83o3ffi7czvys9a6uqngmzr35kmeays3i09h',
                errorLabel: 668812,
                node: 9306494317,
                protocol: 'xdh81tdr1iu14zic79zu',
                qualityOfService: '763cbhcdza1i6w2oqgf4',
                receiverParty: 'pz8t5g1bg827x6jkotoodinu9yf1f8tnffkk7ym1ihf13gj1oq631bh7301it48fycm0hsz4d3olb6i6bwh57jjlt62wqfclbo6gklkq5uku4rf23ddrpjykrpqxoft8d0qqvzbwabykfdxbavljllce7ir1ef5z',
                receiverComponent: '6tpsiw4urm660erkbdlkabbrdl32xq47s1j9c5oa7a527d7jkw395vvdrmpmolxu89tdel1dc341n21dvjlzgw8zqjs578rwkgy61jwqbtqp73edpsif1hrj0uol00zq12tw8wm0nectimffjdne1ytbrxwzv53s',
                receiverInterface: '4g43l77uw6gwjcn3h5ir7w81yej19o408ico8or1ce0aoc2531b9e775w8w1lz3pjjrt2upgjpjazjcgw10zkddjf8d0zjui7gq7u2icyfiza8oma15x9lm1wof5vlw6wxc3q0e6t2f1j1wx1b66wwg7jpyc3pxw',
                receiverInterfaceNamespace: 'soyjjen2qlgoi6cv1j0fhd0td3wp3xilmcvyqpy5sip6egh3dka25f6a3htnjh5yt93c7wq41fgu9iey0epwyn2pxjcjrsrud9omwqlg7kpz49sdcxv5stjtg4rzzn5ql1m05h15wvkg7bba4zijf5ztfyrhgtb3',
                retries: 1660151046,
                size: 9535288027,
                timesFailed: 9134788067,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'd11hvgz6kghm22u3aqo1tl4asjbz9s0tlix6w4la4n8hzf4219',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'i09yq3vwcjebz19fav3w',
                scenario: '8zkbqv4zr4onftlxfecr52ctrqg8zbua26zvzeh1hs4kpe1ggj1qelbztieh',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:51:06',
                executionMonitoringStartAt: '2020-07-31 02:28:39',
                executionMonitoringEndAt: '2020-07-30 19:09:57',
                flowHash: 'ecj7fr7u9jyz7oa8whaul8dvmxzcjdhytgocl2ur',
                flowParty: 'atf7ugn9s0mvclavifiyc6ixvj83ag9vo03468ahukbqrysdbjbw14xysms2jl4y3qxg9lxozhty1ljpxa7i8n50hecg4z6uziq0qsai6vcwb89cyqdwz2g2evbq88boe9bclio88o6d7kr4jigctslb2c9hpumx',
                flowComponent: '9lbfqsjt81giph6xt4x93cknrmb5lnvszxznch0rls6hqtrzpvqhu52yd4yrsurm5qe5vqe2nympspp5e2dj0u6vcr0v6itvrlottkbeso1zikojbb95zatsh49gy51gead5xjue5sjzxg8brexmosg4gfli7w4b',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'yibeal27yfvxxrgqn269dbnmt0vbqcsf53jp1vt6ecbivptnogumj36vbj9wd3pzkxkpvlxc0e4rlwaan1aesj5g68comwzq5k555etad2dmpf2a1v1r2tqgtk263jufigp4qp8i6sn6iz45iyu41p6h8gh9f151',
                status: 'ERROR',
                detail: 'Laudantium aperiam sed beatae. Accusamus minima quasi accusantium et a dolores animi. Dignissimos esse commodi natus quis laboriosam expedita. Deserunt quaerat quod et et non officia et debitis sed. Autem ipsam ut.',
                example: 'qeg5a4luh3zwyl7ptjca05uh1uaemn3ndowrl59e2l4qb5a6vtil71u91kutt942p6lb0ndm1ormepv2j3hqr64oa2rqsus8lt9woabvbjpljele30v5jljv1pr262451v15hu1p1a1716o6bdpw2xtdwgqyw3k0',
                startTimeAt: '2020-07-31 01:30:16',
                direction: 'OUTBOUND',
                errorCategory: 'ww0ko5st5mre6wkf4ka3efh15ckippzzddnb0qc1scphoy6amlenqh45pq558cskxcla55likzvfm3rdaeuwl1l0ecs0ks6pxvdf5n3ssms3vyy6ohf99ceb7891ixmaxgqt6mhrtb8cq8katshqkg91cy6m4igh',
                errorCode: 'tfuxvviqtzv1o8ckdb4ydpk6fvvih9nvne62oh0ytj9t1m2pya',
                errorLabel: 687038,
                node: 3715274647,
                protocol: 't1zi65r7irb1j1c45mok',
                qualityOfService: 'xrc11qvk9pyz748prnxj',
                receiverParty: 'eewdbcdqqf923t96ggw4nbq2lvjj6q0elleat8mitvwxw6w0scfhnfaxnlcfc2b63csx21lauhievvdjdcy5fwjvfulivthzcat2dncueexn2jri0t0t02emxpv2gfcautbj7acrsndsaohe76iowy2sdhfwvqx4',
                receiverComponent: 'n3a7dm2h7ygp3338eaho7ie259lh90l7h8when85s0ytequrr2aflkc2h7svv6szbogjqfh4rf7l7l196kzwos9htidunpn2hcosdgranq73rtyhlm1nhk0r7a4d77cxklywkf1tc6u2pw739yzogp18mtrg0pty',
                receiverInterface: 'mx5rtquf9s3kvxaffceyyheeockzmojxs4bzm1o0lbf8fr8rvoitl5h54k0dvr2vvjptt0q24jjga6qg2lyuf5j49soefwfxbtvwxpdpsblv62b2ohwt0fbzbqabki67hy77ggm993qyoxs3au3byoqrayzp9nm5',
                receiverInterfaceNamespace: '6gt4sjnlh2sjwbtbnpit98ewfvwoe8zov24jt0ymlc6apqwoimt58kdf22f3f0zh6qxr5fd550wyitgtobh8mk3y6rjo805joyzfs7ux4hw40dm0bdbtm2hmtdz3fo9366n5ixn1rit4i0vujqj456bt4hiuzn3r',
                retries: 7859560899,
                size: 2226056704,
                timesFailed: 3222098701,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'fk0swl52vt7662gjh4ip1iuyig2buinxmy2c46e095s6fkyb85',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '3miu4bhk7wb7bjxo5k4n',
                scenario: '0lz2klj6vk1imlf2svgsf1tg766viyj9rn93h2y9zkxshjbu7f0kiolemw90',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 16:38:55',
                executionMonitoringStartAt: '2020-07-30 21:59:05',
                executionMonitoringEndAt: '2020-07-31 10:58:17',
                flowHash: 'on084n8ykrsdu329w3an0bnya92c8ch2w68eyz3u',
                flowParty: '3n8igpe19nxk4my4xc6fay6tsg1ato6xlspwz648u7rhh9ud3dh275iwjh6voe7mqn2jkyzm2dv9o9k3wgb6jjcca8dv2a6itzv6r482avwfogt1otqc0lakpfgyz8wq4rxv6qbkqsceev5zlpnyf2gt9wcqxy95',
                flowComponent: 'mn5bgnbqhbao4de5sa0uhrnvec88yaly4uzbsahzla73q8lpkb3hqzn1dhfx3o8wipflunwznmoxsmou6qw8unv6oj27e1ymjm50cpp49ph2f1gyzz9rixvgmqnyih46t7ciun9elykotg89zmu0w4rayhqbspdj',
                
                flowInterfaceNamespace: 'nlu43s1euy3e21pc58fb3dsxp2woutbmxj4f8k4xrntg7so2pu5hy9zsb7hgei6cxd69bjxoqsvti3ofh8qde3judm1vpr9ho9e10ememwqjaou0wqxb8lo799s0pzcppnjmmm0o9yitzhtr1faq1zss1g17uw61',
                status: 'ERROR',
                detail: 'Ex voluptatibus maiores nostrum et saepe vitae dignissimos mollitia. Sapiente est adipisci dolorem incidunt. Odio consequuntur dolor eius autem occaecati delectus.',
                example: '10p5p3tk73b7ft45n1q3mus53b5m0ns7yv5x10vbbvkr1r66n6eyk75x2zmh46pip9dk3xaa14yacwm4ff5heq7bjg1arhi5zigk9fzjdd7pk2whl9vn9w9epql5hwh4ulwt9vccfiavtd9mb36tqb14zxx4n4qa',
                startTimeAt: '2020-07-31 06:02:20',
                direction: 'OUTBOUND',
                errorCategory: 'fho4r5k2s3j2si58xsmpl2eep5iz4bc7hska1riykf41zcgpcn593q49gdl0jmltowqlsauif3d8sd4x5oxl18nztmjvoesm0zgqew7iwgwzd196xtw3kc3qv0ycpw6epjjv6218qpqeave0hunc3uyyg1sazm9f',
                errorCode: 'tbby3v52n2bss5j9x55ngichlholbmoo9el4u33t3pxu47ctd8',
                errorLabel: 490852,
                node: 2531727748,
                protocol: 'gsbnpmh80weugpml3yes',
                qualityOfService: '3401panmcd38k9n2u6bm',
                receiverParty: 'eks55ep3epudokfcaxk5esyeyr91hxo1ko5qxvdxn341rzgte8iq4gtwubgk4h9lnflfko9bv3y4stletpevrmes3fhv43uqvcpyxnhnxegzmekndw817glehiea04f1ehgpp7ers1d4zr7vnuy0eptnj3n8uz9k',
                receiverComponent: 'smh936lz8sgg89809m4lgen7dvaaa5j2zehb2c55zma8f0dh208aunbn8pzjpecje5mvcr29g77eb12bdzmoehzp70d8hn5prsc1fah3u3cnusta8r7n4livgtojjiwnpmdtzr9r2rtimh7tcb5gt3dnc45rfoec',
                receiverInterface: 'ykrbz26dr6f6n47x4xi06ko61dws31ak0tfgcns0868hf4epsyp638ljz3pk0irrcc9g1l95a7ygfxg2xwsjka8t95vu3fgh5pced5hi71q9dlcpkl92lv5ypmufi2r6xn3fohudnjhvp2r4hzuqb1j61bh0d6sr',
                receiverInterfaceNamespace: '7eu3v55thjwr2lkhm43q3cy0o3h3t1lumxn71yttmaw1y52kiz6y7n628pe35zc29i8y6l3jnamm1l68xt28kew0shqi0tc2k1ueamx0eufaaszwi5xrm8l1rc89una0vk5cgqwntls9amrpsa1sm7g6hhqh0qzi',
                retries: 5534709680,
                size: 1414326864,
                timesFailed: 8774473312,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '8l8hvu6qoce2e608ktyq1l2pvsitfpi840li2mfm6cqo1mhyoy',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'iovne5nssbfswecv644p',
                scenario: 'grfq1xwjnjct6bfupzo33ho9xzg2shx9nhnkgs0o4q5dt5rtsuvo2pxhuw7q',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:19:34',
                executionMonitoringStartAt: '2020-07-30 21:15:18',
                executionMonitoringEndAt: '2020-07-30 23:39:35',
                flowHash: '62h9p1qkjfvxj1zk21pilgz7vckd81g5tncwzbkl',
                flowParty: 'r62uves9bptz1asl5ieizl1bfy3m43dmhl63seehzhuext3yg7jggoz3dngrjx28313ybcr64sbv7s4ekt1jgc7iq7l33d9hjv3azxwuzgsjbqxdk13i5ujnecxcc5r5tb9gv7el40pbnzm87wjxe5wchyj3saz8',
                flowComponent: 'sjku3wz4plzgq2q9cj1zd7fiwp6ithhu7bpiq6pxyhyqt2lcr5ly612oia3qpo4ek9v4ea6ptlezwduuwxym5iiggxu9p5z1s934soylmyd990vaxyr1n6bn0anmghanelbwlximvz4w19ojc2qkxft49tn0flqf',
                flowInterfaceName: 'dk7pqrzvhhi5imu2s7j3hj5v9h6lrh6rtf5iyaybw15e3stwsghukc4eue5drc0jsqd41ikkjmvvjf0ah7otw2w1kid13gqcs84tbflezdkeqrlw80pnsdaumx9f7itpt0k9ylamfqiqhptn0uod8kog0c8rkb82',
                flowInterfaceNamespace: null,
                status: 'CANCELLED',
                detail: 'Voluptates sed quis dolores. Sequi sit eos laborum nihil. Nemo eos sed officia molestias laudantium sit. Ut perferendis et voluptatibus.',
                example: '9nesu8l3cs9mwz6b69fgdb44ihz76k7gbb3zs2d3m1m377lw46n29ow4ktagl1xshoyubmc7nzam13j0g4pcednj1l5twysuvyuunuvakzzkz81w74qkxrsbmglpqs7h9b5mc4f4qgxbuawqoq3jbp3dk4wqzzb4',
                startTimeAt: '2020-07-30 19:50:09',
                direction: 'INBOUND',
                errorCategory: 'rl54tqckevn037f3f811f1a3kuj2grxmx2jfbqqy49feicqjgudxue47vudb9uhr241y3l9g08e442xqap6z6kagwzscz6yextp6869k1fxhki6fpsalojhlniipdr8110zvhq27lq1ducmrvlcgoni2j3ulednd',
                errorCode: 'dyd2wip2ysofzn9g4em6bfdz1vvvbvkiuwp974f2y44rik3p4l',
                errorLabel: 512193,
                node: 8802322146,
                protocol: 'hf2p2m6rrdgfh4yl5b4h',
                qualityOfService: '90i3105mgx8zzgcq23wr',
                receiverParty: 'q8ucgsfwnhhqftj11itw8h8vs5g2xcz8veg46uiecxwb7an6q0oorzwp7zxbjz7ldgqs5uxizuyncp826guhh6h650kevysltce3n1cddupbrd9x24va45mtg6rvt4ypnjz5ko1zp4g67vcvvn9ag586z1kcivkd',
                receiverComponent: 'lwck4e7lv5prvi6hoh4iyxulxvv4wfu8jcttgqgz4lwenwvn5llxhladaxvorlbw1b88egystih2yam4cbaoyg31f8nkf929if5ztedyvutqev5i751wup26ff2x9zx8ixf8iqjg45b1e7m6i9e32ef6tnyog4uq',
                receiverInterface: '8oco7drx5aznw5kgafwn3fz07ju9z25p09kxjzqwhipyec43vfko93ndwqep8enjgl3uqoest8dokpnpn4k5wxkdp8r7vyweg2k0pf64rov0qymqlbstq436vq6tzoum5hkfl7nswec03ihie5feu0niv7qu65ad',
                receiverInterfaceNamespace: 'wuelkiskr0gu12tft20ak0gh6udxexuszhsi4t5vqejcsfu2fpbyuo0ydnjol0s7x7gpfvpm8gbtkd3ju128s3qlsw0cs4szf9cp1k32usduoev1abdgkgzn62ew8hub165jytc19j4qncaph1y0s5sdy73hmd10',
                retries: 4460827246,
                size: 7928354538,
                timesFailed: 2973250341,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'rffdp7lit2v90do9gu0pef3s2clvk956955facrvhioujv9dly',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'p26ldmjoc8wdbx2zp3py',
                scenario: 'dhjmu2850ix3e3zif65z9pmn22txy0tvux46gaddxyqtct56888y7f9yl98b',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:30:37',
                executionMonitoringStartAt: '2020-07-31 07:51:47',
                executionMonitoringEndAt: '2020-07-30 14:31:18',
                flowHash: 'ezv6uzpf3h4pos7crrlb06uhn9envz8ryqljywzm',
                flowParty: '6yxe70xwxgqisevwu6anpbi73kwfi5ax6sjoxjziyxv75494cor0nv065o8l7e3u9fezz085buam3nwvg4ylnuy2kz93opeziwi7pxcv14feo7vtvk3sza4jk7ei4vpupy24z2zszwe5jl7d1br2lsvp4kktvkcu',
                flowComponent: 'z0xg7vvtj3nytbp0ef8g0jr03b0ycvgssfpdbm0vo6hfrtzuwlstc0z5hu70ihxl9kemaupxnpts2yeou51pjexd4oby6o68jpt64k2v33tlnu3ing5rxtw3tra5be7xrghb0isc0cyiitq99fcgvj1fhss2lbtd',
                flowInterfaceName: 'wrmb3xz7dje064hhzxqc93kalnyzqtz4tazawil4kdv53m2y2qd2317jh4xhqwrj4gajjsftx32iu1amhae7pbrafyaq45duu99ywzzs3end7cdli1i8v5sk3zjoj8629h93ch554hmawscnglzvcy3kcw5ki02s',
                
                status: 'SUCCESS',
                detail: 'Ipsa animi quis ducimus. Quisquam non magnam. Cum voluptatem beatae impedit aliquam a enim. Assumenda sed voluptas. Quis non commodi dolorem maxime dolore omnis.',
                example: '6sx1vgjw7xq9nfylb6ppqjf59dz3j77d0xq3h7vln4v5wu0a86n03uydk1oqgc4vgoffd23v08sv2fghqld7ea6lluabzmqrubyejaym02o5j31g153s56u4svin6cqkv94dgj18zzruronm549nvwfvsvn8qo7j',
                startTimeAt: '2020-07-30 20:22:07',
                direction: 'OUTBOUND',
                errorCategory: 'hbz42409iqlh72d9r7gq2dasb242u61i39wghvkdrgm40793eb35idr3pagrzd6kpbvxouprroxan967pz4mdo1k5pfi0kepmlkcb0h10rc8ta794cvo5vq4fc6z6qrze49k60168u19tjdpgjinq5he9idor8kb',
                errorCode: 'qd4hmnlpjvsp1ih5ogeqaehbtscs0wzd3vprf10ld5oqpj2mxq',
                errorLabel: 759593,
                node: 5589799312,
                protocol: 'lp1ykdqgvv7yoc5bgibl',
                qualityOfService: 'hqlvc10ssoftixh60qqk',
                receiverParty: 'uzqoagigf3f0vsmhm8t5qcgoqgmvi36iz0yy5vc6ie9jf9gunl3rs9hke77spkydcamppspbsu6pmd4p5wlw4c2noohl2grr6sdn12upx4wx3vs4xksmltkgvj6op8uv176ykl1xk887xpara4noousxnvxvi2rp',
                receiverComponent: '2yhdi9rk9id9hv4c9ag9lytcdc3yznmh0vl4yfyxevqhyia2kz0adeyqpyk5l7zv43y2eymbd53zqmswfep7ia0m1ootzfn7sssb2ee29pymiscrkjt6glifcykrvyluopzpbw7heohcfy2egi37zi27zui8xtw3',
                receiverInterface: 'vhxa31rgrf8rvb5591mgkmhrzfy2uspa3g4gbh83ro4gddsmr20pgruzfupr5di5b0oi23a788r3pxxbk1o92e9pmzpllz7705gsud6stgmlrddcbzjytngjdiob0e1qcx362opufsncrblcuji3fg7o9d1j6nn9',
                receiverInterfaceNamespace: '2qoammhs1oays87cx6wxidtb8hj8870pd9hb6i1yiv9m58odlisrvyte0gcer8fr6u7to4pc429rksr4m155ic90uxssa296b38fukcpd3h0p96iw7nwfjm5h45u3gnqw09lg3hqxy3xjj8c1apmt4mrq9k52inw',
                retries: 1972328808,
                size: 6999252058,
                timesFailed: 7769654630,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'qljvqmf3af2tgtikkzs59xwpkmmffsgycih6ogsmt64vk2m8ve',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '35e77pp4a3imwis7hoze',
                scenario: 'p7ai0rbptghizulm7pel3ba1qkb0aqebv8s3vvreblwzj7s03s8ozf2lghd7',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:31:51',
                executionMonitoringStartAt: '2020-07-30 18:34:26',
                executionMonitoringEndAt: '2020-07-31 11:31:38',
                flowHash: 'cn8adrasfldz6ep12jyluloksn0d25g5gkvlqx9b',
                flowParty: 'ysi87hlogce4xq2q3celaqi8jpi4vyyab0orzmmtbt372sne9yn9aiyx4a0r0it8cn5od5zdw86mppkeexzfh78jgihedba8n870asrpgh9ex3sbuxexiuqf04t30yaz2hwuaa9tz9b8qmp4yt3hgx3aordfosks',
                flowComponent: 'mom6nq2b9zzrv2kbda7msk88aenupgm0ppm56s3plkfdvv69su4fybn5uutrgb8bpyot1ur8fr7egjt4l1j7ejbzglt8ktbivejpfofzi45egpscjb7xlpbg5j52d8fljta2n0n8pi1hy0gtbynk6uowcatr2ckp',
                flowInterfaceName: 'm8r032pbof7nkg3kbf0tdye8af8ns1wdhpp0g3iauaut8qcfh1lu1fnd5tj55wpkgttnju5omjr49voqkeu9jsdktb561pmer7vo7fkhptvqawe2pw048oif6ckckv8gne1baw8zyneldt73lxwsut8va3ipz00v',
                flowInterfaceNamespace: '5aalvmxourpsbz3arr5y19m5gx9tykno0g1mx9dl0xxitxndr2lqtu0ff5f38ip2tf7csq9had00xi6gxh1sn5s4xfni6x59hkia6eizvqxikp5fk1o7h96exc6druria6ctf9eebiubs5bgwz33w370xj79op44',
                status: null,
                detail: 'Quos ut aut. Amet vero harum sit sequi quis esse nihil accusamus sapiente. Quia qui id incidunt nisi ipsa sit eius. Ipsam aut itaque ea consequuntur autem provident itaque ad.',
                example: 'chzqul9ckylqyt7cz5esln0rpnpa34sseden0fk146sfv06bej48spamqn79jam71m71fi5264f3l6bo1pqkkfogqcdf24uzgxrcljgkovj3wscmmrf8o30b70ok4js72746a9e0i5r4n19l14a78sfdggd38xrd',
                startTimeAt: '2020-07-30 15:30:25',
                direction: 'INBOUND',
                errorCategory: '3pfs81odh2cnewcczpq98m9vlklklbuxx76hhz3yptq2l567t6k7g6zf8k53tlfvugl1ndpc0a8px8qsphwjtbfdvatzj2hrmvh7gfl4x4gvssjwbo4w93ico6e6r2k6o4oz50s30xg8ih1k1c65jnaboccww3sl',
                errorCode: 'i51gnleuof0h7xd2znia5k4yiwwd336lhxpk3ba62rwoat14of',
                errorLabel: 375698,
                node: 5668093249,
                protocol: '1966sde9okfsm038vyk1',
                qualityOfService: 'gxz513y9dpkwqbdtr1rz',
                receiverParty: '4yppm708pc78egj5lzzed594ivazdu3nyy2exf7prujjfji27dqf16qac5qle1b138ja9ysss9c03umesrj9zzzl3k5eh3sy16r39u2t6f9h1zh90epjr2sjo5cjty1zb179z90mlakqb9jyorb71oizss8geo48',
                receiverComponent: 'q96eq74yo4slo3jydxict3iaaookg4mwpwzjppb16xbdhy448wfm8y9kgn1fbl3njkoolicvqff07js2p3e86nhroqp8uhom3xx7r05wk3b4pxmxhbwbuwb8r8t3bklsp9mczb2vm01asjfxfhowxod5i3r2ui4r',
                receiverInterface: 'uy88paicq737e8xlnd4n3lsuofela9gep7wi6ddc2b4c59dk42r14ogsjbv5xn1035icrda0fp73fdpzx57pzldpp5rycgykihcp84ysl7sqll2z5yux33d3n4biqxrru4kcxs4pgfmfbeb99ks2w3tekr36eo1i',
                receiverInterfaceNamespace: 'm29u3e57r4rq02mj4onu2vtsm7mdbg2lwpbyf2uwgr27f1fzazum5ku8irur5ppyckwkx186wn67k23cdjrhzroujw3hn915rq3zsy0hy6blo54gop5czupub1on68amj2q2je2wrdnh9e15zg719ubd4bj78il4',
                retries: 8325105422,
                size: 1119042169,
                timesFailed: 9739308778,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'sihmmzm2fxzgl1l2sq8dlc40xcb9jl36nzayl8jm9e3fw63c8m',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'koj10l6815c9ywfgxktw',
                scenario: '862l2moggtvkf7zwfkwey67226ti0bfgx4palenj1f4b3y7xb6bcb4lnxdhv',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:51:30',
                executionMonitoringStartAt: '2020-07-31 13:27:31',
                executionMonitoringEndAt: '2020-07-30 20:33:26',
                flowHash: 'ob78faab2x7gxnhjjp9dd048bnzjhx6ilj5ug5my',
                flowParty: 'gsgpqcak6f3rfrnr1ygpobcnauzkz77c4bilgtoyuml9g1m1wcqaaz9kbrsm4p6i48dsur7tydmir0o98nnsoc9wljjg2vb40e8pgemtvv67t1cq0a4bgo5klx5fojqjsjngvf0d7r0q6jdi87yt00u1f0yomdmn',
                flowComponent: 'hzan358ngplawkxsq45jzrq731dre9857bussnenvjae9uncjzbqrc72z17bb5ky4bmvwv7bku9vrr6n41d80gcmccbdec7n3qvh39my18fgxjkjj808b6ggbntjk4ue2go6zr4t1zt8b41z21sq1h67uiv4tw2v',
                flowInterfaceName: 'y4dhod2qz4k96jcxa2x0ol54z3tmpxdngkqrtou9fm9gzvlt127z2hq50i88kgws647gb8nrvfiouer89leie6njpkl9rwls4k86ekkgnx6mgr13bbxjqzsl40u1hjl03xph8dlavwas5beqb8gk778krn8ypn2n',
                flowInterfaceNamespace: 'ans3z4b9qxn76li10mmy8mowkuxrw929pdkha6vs8yyweozf872q64k7dgv8mth4zloi442q2ahy0t5sg0n25xvtulvlbt0r8a9q722gwk4f5h5s52hsqif63kvbcobhg168ovnoviwzic113itmpqkuydsvlid4',
                
                detail: 'Incidunt animi quae omnis aspernatur voluptas. Aut suscipit quibusdam. Itaque consequatur pariatur optio minima non accusantium voluptas consequatur amet.',
                example: '446s3kp87wmtdm5rz5zgezha9ywregd9kv0ypnc8vikofeb4cqh376k66ck5zamdtl2ywecl3xub9dw1pryp0hixorjdke1yqnemycbdywjfh46ei1ayx2r6fgmt6gd621t4e5c52n1rylcsicboq2ul0squyg3m',
                startTimeAt: '2020-07-31 03:21:47',
                direction: 'OUTBOUND',
                errorCategory: 'z375nragou6y114jj2v6dn2zysyrnpbes0gz6ehyi6acubsz1gl4mf45eu3d7l396uqlhil79d623xcemt4hme8vrcptyh7bcqfi30k2q2v31t4nry3tffr1tsq77zvz2jn38o8agk3kvwhpq7q7gp7g5ynnxa2f',
                errorCode: 'sjii5omr5vywqstlnnavhk390az3gyp53zz9ctbkypne9yj34z',
                errorLabel: 147869,
                node: 7677617733,
                protocol: 'ravyarc5ouiek41iazne',
                qualityOfService: 'm703cpmqp9hqitdypi5n',
                receiverParty: 'mvahkl1nqx3144uy6jxak2vxe8e9seo4s1ws642eq7kt5h97lwoub2ai6b0jrst8mme4z8fji1yszr78paclh6zlx4lcrbsvyfiuybd8zugidudeb7zw8jis9ds7sv5nkw03c76grbnmp5yu0ehf08tk8xgjvwv8',
                receiverComponent: '4sxubrxl25rkm360dpn520t6m61znvn2bmrp55ax46qab0k3i48tg8qos9q05mupn9wxkv2u6eazg9n0mq872wze5i2rgewvnhm24wvqkz0rkizpwpd0uq11y8egtcac3kst73p1fvrf4o3674j65k89t4drvgsk',
                receiverInterface: 'hq564owxxslvsk0s0rhkr9h2dzbzsbnufatykmm9qvvs701n8psc9iide8dzc26h6ynyew7qla98m24ra5wxca3a4qsl34i3n7sok95f8o46nd51x5kk8idheew58oj46dkjevlpnprq8nos7jn1hd7s0cs4qsid',
                receiverInterfaceNamespace: 'v6wwc26zbjm1r62gi1l7l61rnbjbf0fd8fenjppah7g0g3njfshnkr3n13ana2uyu5wiknhrvuhp0rv524nem57ruzzh3x1bmyx3z4cdzlbjolhqlc7kjhqatew63apovbptm5i7t52ojoaqgnehydrar5dlum73',
                retries: 2201742690,
                size: 7931784897,
                timesFailed: 4457932315,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'tz6iz5hli8mcderqw8tj5cwhlnxjw9j61ep4un51rm91adynpk',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '67hzrkyy68lgqvdpikgc',
                scenario: 'tj8e2xq6fa1ol4jjhhpcsm77k3b50cfja4a1n76d23bylruu8aqty8pzdbn1',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:59:12',
                executionMonitoringStartAt: '2020-07-31 00:04:56',
                executionMonitoringEndAt: '2020-07-31 00:30:05',
                flowHash: 'xuwtcrlp7mv7tue1v2goqlzts4qlg33agfm9890l',
                flowParty: 'pmttlclqz78uct9poobarsya70fcvi7e6wacwemxr9giht23fso1ozg3ew2i0ptmxxssy47hbr2hneli75lx30nvc595h0ngr0bhm78q009u5ltxhm6hvqo8elh0nyvajarxlflbnxg4cjftpq3trs4t7bq64fe1',
                flowComponent: 'i3ord0fu7eke08vbb2v864l1ter1lk8hyhiv4b3bs9ok6aqh3zxh7s3ipkcnspt6y2mboy9cf726f6vefwgos5ukngwpiwqwu0r6dlw0l6mrh8a02xhr4tvdhpjvyugcufby71upfjd7chkuvk1gg9r3us9j4yvm',
                flowInterfaceName: 'k4cdk7yagph2ngsxayykcnprlibi7pd6h5iiepfsmb7hypju5cmp0vk9aro47nom7x754qqypkz4h7s911mgjt6n4tba71sa4rj7cyu5vgtrt0f84kzmnwwqccfju2wgxbtgyq7yahd4kxwd14j2v3p97dmntxs6',
                flowInterfaceNamespace: 'qaxi5ars7txmghekvqp73tmfeegi6u1ecqhxzzfgx3us5wr3j05g3tfi8f83apt1g5nofvzm07brchy2od62z49bpqlrn2jzfwj6w4q6kxc1giaszrp5hi4mnlhaxa45bndtly29nq2fdbl35ptyor6dt61jzy1q',
                status: 'DELIVERING',
                detail: 'Explicabo aut sint vel incidunt ipsa ipsam. Ea illo delectus modi et. Sed culpa quidem minima tenetur repellat id et.',
                example: 'jyyoq58r3r791id7bevrcl7ojwd9ih2jlrzvyfhr42vwjd0ti77pe9yfrvfnfypjxni6enuwk8el3q922kttv9rzewlrm96ubw0sok7hjnhko1tu1rwd44od37y53uoa920rrwroggvhv1dvken1jmg1vigujul5',
                startTimeAt: '2020-07-30 23:33:30',
                direction: null,
                errorCategory: '9kfqoi7gaw4a4qjufaqinbbise0gbh4t4mxtffam0gzq4xjnp97mh00948xze4tnxv33blaqaa5agow35irj9nm2uh1x1p2bgmtqyib65qc0shws799ppjhz6v4lo0oxgdap2i6veblwg6ask44o2a2cndz3mhih',
                errorCode: '4s1k1iwvwxinz91hse91gz5sx4vh1mrblbmh8nn9wpc1htstww',
                errorLabel: 486117,
                node: 6717925394,
                protocol: '77c6cy2nqc0vy6u8jbec',
                qualityOfService: 'e4q9jqqixzy7r8a5povd',
                receiverParty: 'xmkkvsy92av629lx953ojv8xwepy2oja2ug0zymti4ye6sgc31xoif2m4j1shrkhexx0cigo2kc2t6a4vg6e89ho4vm571b30iudre98j8m0eqlm0fjytch2jq02nkykjqj8yyha2j0e3qgl3843qevzydsan4p2',
                receiverComponent: 'qk75uleayepjlgg1p6578vws62ip6pqw3q4tw8wjj6rlzrjinimhbn4dpjugicznd3kxu9l33kglf294epdfg9zzyiu5zfhqtpqu7bzgutjyd8tnmkgj3440hq5tqacsd7u4tw3tblysosbxs05jup5fztt4wlll',
                receiverInterface: '38djp6eb25nfu763mx5hqnj1ixc61jlox4jrmhw89pm4c6o2q0atzibs5b5ps4mhblzlunb2ybuwt8l6kekdxab5du4suez92vbn0kwf1ywl6gqz5cp9pqwmx74vfhql3czesa8nnp0uflnozwhqkedpi7u8fyjq',
                receiverInterfaceNamespace: 'c603r8ilaer9ds8vprscukk61y1pp0mu8qd0n6sr9jylzdnnp6pmoqhbppq10np2slxerrzn1ywaj11hjt30qcxy2ecoty6mik4mmaowsvvbqmamin7qoo7xejnfjexl4m537vur6op6i99njyj0ac4vibndlsgi',
                retries: 6253246208,
                size: 2755265500,
                timesFailed: 4381243933,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'zfpoh1vjxovutx8hcynz5lj21l7fhqypz1mnfhoj56v8x7lop9',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'nlrxglolswmbpc6hpsde',
                scenario: 'tr3pgbbt5wip3qtr970xx95gj0n6qe3yyvoc3phtpzpj39pmoqh6ufr6rfbt',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:56:09',
                executionMonitoringStartAt: '2020-07-31 00:38:14',
                executionMonitoringEndAt: '2020-07-30 15:22:09',
                flowHash: 'vazr9fm0hdqj5zykpn4nurddvud9da0meyk33gme',
                flowParty: '5modo3d2ww4k57mt5dx69s7npu0jzf7a1q5u7loqttvurb6626ytnof8lw7e2j0qnw6luh0ex3u79tptnbbrww58vfu5w1it9fod8ba2g3kfrgfrzguyserxo7u162agbf8z6d601pr1jq5s0slf67m5lplkko8z',
                flowComponent: '6ayi0zqf2x3b6r2c25d55w5p1sxw9w3n9uwv4dtotrg8p7cxac3plw49uzely8lvwxoxchbc2aef6daxtdviy0jjvfpxmslvuji1becvzxu6st42jhb6m3jhgx73ia9rt1wuht3y0yxwsbv581qvkbd0smstu59b',
                flowInterfaceName: 'a5ja2jxxacenkrw5nbl4e5tgmsvab1uzcwl3n1j3xakc0d895yuhnno7pz5lcx2wqoo4jweq38p0tn6jz87e2oe7jk1lobyhk8brsissh0uiclpcyq17q92hfmrbwmw398e5kyligskeguvcs3ywua6bfmk2bg5h',
                flowInterfaceNamespace: 'bpku9izo8f7lou301sy9uzss3qdjtmm8di4z3f0ncjj813s5mfb7j19fs0v54hxmdy8meib15of3kklrm9dcqn3olu494ilepldzg0nn3vvjmfdg8puvq8q6uttgs0z2cgo466xpnb1vyblkhtfclw8p0gkksd0x',
                status: 'ERROR',
                detail: 'Unde et est veniam nemo aut quae magnam. Corrupti quisquam deleniti accusantium vel est quis mollitia et omnis. Ut tempore rerum vero hic est reprehenderit nesciunt culpa ratione. Esse voluptates possimus eos. Deleniti iure aut reiciendis quis sit.',
                example: 'ucc1q81hzmhtlxx5cttuxk5utau1e9i8zq15bti52180mwfhg9wx7exk4z8v3kvjoyw304lbmzc6ygkob0rsha7up0rs9me5nvk3a19d0lq8e0arv7b0jhr1ai7bbjwr1lo9kt45s6t2dzvpbj6mere9ogomb26v',
                startTimeAt: '2020-07-31 04:36:29',
                
                errorCategory: '0ct1d11vyhvaizht47spjbh9msqctamsslry6t1pc4j4jrr4o8f5wq1opz8co2jmgyxpi52wvqulr0rhtsf7p6x49k9ziqfi9vx6djkitapuskmpig135gopzdclchtp9t623k88yqrbk4fj3np9h3zmkcitqxl6',
                errorCode: 'fq3zomp5mcbta4xzl4ep79xfg4hwaettbrk3x7hx5aqvhvheij',
                errorLabel: 526684,
                node: 9595507977,
                protocol: 'ko3hlsqo1wsbf1zx07c7',
                qualityOfService: 'rowrztn4ypczewzkizpz',
                receiverParty: 'iv9oxmip91brco5ieu8lakb0b584cn0pf8b8atvj5tzzphbms37vs92x2elrwxjlhek1bf68gkb8z2s6ee2rrge0ioi62o469smgkzne664geywt65ndt1q7tlitj5nphtgzlox0j2cpdr11lqgz1o88ky679xbc',
                receiverComponent: 'tq2vu1vo1obq54mzx3ylrolzwgabvp5qoy351www21g66k938901d9m8a4xy0fi2h9m5eec8yvj105bhs06mt2kz9ydi0foa65bksjglk7m4kkw646gspjji5irsnd8vmkuj5bn07fqnt4ygmwulbv0cqzf96vm4',
                receiverInterface: 'gerpu5ghyovok54y8pwn0k4ya8ag1bjyuaa23jrfsp10akimm5afx4sqyaq3upschdojn4m88kwqbj6mriwnwcg90kh1bynk7h42dmlif4ctf6f5c7mhwxw1jtm9nzejvk888ojtt47skhg7uyv50zixjgjj50nm',
                receiverInterfaceNamespace: 'j73mgz0wv2fcs0fi608likjnrxltsn3wyletbaf375xk8bq8lneoeyfzsw3c11vt053rpse96u01io2nyfrxlyhnrj1kiq1e06yj8fx8mugzrpq7c6t7ifqru14l23dexxn04rmvillz9rscm2pdxnipbc23mjwu',
                retries: 9408939176,
                size: 5272572692,
                timesFailed: 3496246978,
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
                id: 'huiczgc9w5bprgbbojzy4mv8nqg7pw135j1ow',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'qngqghzb6cawbnbxw0aj0mkossztw4yr1547mmth7yxj3by9z2',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'xb4ngzxkvg9upkr8caw2',
                scenario: 'vrewxlgoyao00who7t05mqon3h8r2xy8qr3fc6djzypaq4k5xvtg21iwxnj5',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 20:56:08',
                executionMonitoringStartAt: '2020-07-30 15:22:18',
                executionMonitoringEndAt: '2020-07-31 00:36:29',
                flowHash: 'l59dngupyxoz1cmde797elofcgrjp5613z9780np',
                flowParty: 've8atpsfwibkbypt3psw6k69i7qg1hooq0abkp64swgnb7fmcxnasgmhlukq662s2xve6hgh21f49rn31xbiyljok7f9atd2s6jsvqomedrutrg0wlh0ern4v2l4u1zcshewnoorlh1eog4gwxewfdlqq2jci7pj',
                flowComponent: 'smghc2suk4uzug3jw9xzb733suhluv0rotxxp3c5ox4e6j96jmeawbbra5j2iwjxb6zyrwvf5r2vpym5u4x7jd7t9p8uwkoznu7vn8v678y97z09y22guhh2ohx1lwowh4z1c64d4c3b2j57ytmpqplwthtxuq2l',
                flowInterfaceName: '8bq148gi7no2ne0bcira87mr4t5709y77gt0hzjog4nfc37rulzrf22vaiamnsjxnv5sc1k71f5kkbrlap1kieupbgy8fox551qwsdgedhvtcp7tkyw3kdaqyixllzfge86b6dup72gqk5rv49vlbdbfsx7tyyo1',
                flowInterfaceNamespace: 'ypky2wo1lh7omwnf69ydzm8r642tdv8hwmnsfnoo4t2au97lyrnymuufsknecdn3f2ay0f6tx49r8z8hphk9cfnfae8lxk23e9iopq7oo06j4wq8kabfrb2564wwqixmyuqcnhqqn5r3eiqrjzffh02uoa2snlsm',
                status: 'SUCCESS',
                detail: 'Iste excepturi laboriosam facilis et iure nulla aut. Dolorem iure soluta quis ea. Et perferendis ut voluptatibus. Aut incidunt sequi ut dolor nobis omnis.',
                example: 'ctiw0kmfb24knhnvu8xakycfb5an6i0v1mhvnspou3carew94g4g6x6u4o43vstgp8rjsqb951uonvotuj5p70lwo2sayvk7wt7wtz5k4w58t1jgg2etodz3c3wc8jj1x9ea88vh7u41tj9iwgubp824otmcugdm',
                startTimeAt: '2020-07-30 19:52:34',
                direction: 'INBOUND',
                errorCategory: 'xxxc0qjc50sy994mlm82op53iolwknbtdj2e6m2k65jfab0rl2ck07l477x19eqjkyqzq0cds96710a0i7wrtcvuair53ona9yihqulo3o7fmagyajntkx5z64kxxc4a1qw68lexa4ahu40jwf8wq92b4mobw35z',
                errorCode: '4nrw37f90k6o05j5hxicvi7u4fv8uyvt62mz7mo4bp14rl7u80',
                errorLabel: 727786,
                node: 8308784542,
                protocol: 'mwmnbzbmln2u6ldspjnr',
                qualityOfService: 'tgksucum09xt2gr4corm',
                receiverParty: 'y0821pr5vs9vjkt5b466wztdne9bj5ssuhaje45u7ad2k2lc9858ud5ec81ycrz2v1x1n14992oq5cb1ydfbaqnpecp107s0axtmpkj3cj16ri9zdrlrjjcxljgm6rrnhwj5izkl2yau7quf5scjgvwgfxmz1c70',
                receiverComponent: '2ay4sksi1mrxutijols8oa8ib9sevob6f76rmsg7a8ff0py1m8vzoidkjqx4fep85l1iocxmmsmcon1qoqxiwrn5l0ocbpys3i6csgequdvntxv5c91k7ibyw4rn6kyprc3i3cz5wu6maxarn0qn4demyhowldgh',
                receiverInterface: '3imqcs9bmbeesxcygbxfsu0dheh0w6djlsee5b9lhxe9sw5smpbkt2ucmpbcfch1k2qvb8q9sc59gar21flgnxo4fl3o9a1crbrzqcpoyazm3q6m54d9aj9a77kmvf59k0ti2avthnw19sj6i986ajvq2vm2kh8a',
                receiverInterfaceNamespace: 'iiwl4121snwqbbjyy2z1pvzu6koetr0et1mh6a02la8nj1tpf1gv4vyp9q5zdoxn97cvs5rv9khy5yqq7adz3dd36997dxrx1i3khs3fece3wrqhwj4i3lvz9cwplt044i1awtefp46c89s70rvcbbfgcblp5zv6',
                retries: 4537472237,
                size: 6726476590,
                timesFailed: 6898323945,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: 'uuh2c7ay1fh3dq0g4smp5vabeerlf1efgyn6m',
                tenantCode: '5qmyv69wg1vf1qwfwzpe5mdzni3ivm48dxnllm14gluf18wzir',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'm2awd8sfj98qf55cii43',
                scenario: '85nnsk9mosy3ir6v5yf76wpipt5jn505k7xzzciofx4o5xj92hyyijbtjn7k',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:46:38',
                executionMonitoringStartAt: '2020-07-30 23:53:30',
                executionMonitoringEndAt: '2020-07-30 22:42:57',
                flowHash: 'cc3tpuyut278ms1ylwddj5zc5ixazuqe7b4pcfnj',
                flowParty: 'jzgti7yz5xl40gk88ui014ddygstpobqmg7c2zixxaf9if295mh6tzcifhjpy5v8vmes9sfy4fqtgwkf3g3gkn6rmdz4ng6otdlap84xf1nb72jzbrjnwmkhccfnsey3o8y0cxhbjzghxbx0uq4z0padkcyh481f',
                flowComponent: 'teqs37wzwgelaphy2d02b8ipfnb3uscneuiqy2uq61y4awyvfiwhqiqmdvzdup8yh09lsqva0n9tcdfz0i032z6mdlcie1r60sw1zzzxkovqn458269gepzw5d5nmidjxczjh471pyuf9xidr88zkago4ldgepbj',
                flowInterfaceName: '3qqirtswc6a2okdlc0dyuow7861wrfkog4lkotsy8mikizjpdtl87tco57m6odzzsocqdgas8k8vwfh4dqouth5vra9gk854yzmq56qy30crzfnio7fhxb81gxyrwsygamo4obj8rv5f25u448d42r32onipm44j',
                flowInterfaceNamespace: 'xnfd62g34n2ktytlfh7gwy32kvcp9y6ou5w71vuor0xqyn4zqad709ad6x5mrues9yaa5dnb20ccxolvvlt281doumux7p9t9biv60dg48zf2m54xptcmk85y5qou52d59s0yg89q00vblnukslpxb0nyjnedzpr',
                status: 'ERROR',
                detail: 'Optio expedita aliquid ad necessitatibus dignissimos. Occaecati corporis eaque. Sunt sequi ex quaerat omnis quis ab ratione voluptatem est. Deserunt occaecati ut reiciendis dolores consequatur culpa. Itaque et sit occaecati nulla consequatur.',
                example: 'wf81dg47da7ce1047pg2q9aytgdumh7wtf7lfgx3x81jegkvotnatoanh2sfskx9woesjx4733jt1hbl5gkhk3udgq74oxhyq1xlqpiuye3j9nopmlb9va3hvqsbg6iy2ktb470mnz5nivcbqdc6esp5my2y2z7h',
                startTimeAt: '2020-07-31 06:44:37',
                direction: 'OUTBOUND',
                errorCategory: 'tmn4mibcqzxncejlvl7e8bukiv8u5iquzmt2oedpifqz33fdzrt7s5oke304bdk8hs1iht73nqvr2nvfow9ewqk1kx6x9ipq9l30mz0w1oih2bdn0ibr8wmlafqr2m6xrbe6h4szk08tpssmw43nak7tgcf9cubd',
                errorCode: 'occmpwxbfwdm8d9c9p4wwm8wa2a0spj1rps30hzzmh0e3hzjsk',
                errorLabel: 249354,
                node: 8027040065,
                protocol: 'xj78ndtdjfp6sl7kklix',
                qualityOfService: 'osbrfcfftzrvctcwi0n2',
                receiverParty: 'rmawojn80arnzcqxa4m4gmoacjq3gte11lt6v6cyz7mqisoygej8emmfttg7os2tmmzvqw1fc955etcz2jcn7d6kthx52o1lua9rr4be2bny2zn6rhu7cuntf31ko0vjryk8y52xb1e8z9fweuzxrg6423g5t999',
                receiverComponent: 'gfb2s1tjhbculwdvywuhqxheewxr4rfh1qlzfimcedagmxrc2f3nka13k1hm5mla4m064wnq3setzzhzz1ovv8sfrg496327phhy4bns6ct36sc0a9yk0ezge3k64mq3s5v94o8iy3obt8ntk5ii2d6qvb36cu58',
                receiverInterface: 'rrhapffgromc5milp4kglectykvlddpappv9xm79gykwieuv0unbj56sf50d8osydi71vm6wcklk13ftmu1elpk0dhf2e45tna7nfz598u30j1hg1kuptsd1n9bn9ogj3qlkckw58copufp4clxzcdkqkaovz405',
                receiverInterfaceNamespace: 'dxyy1bsn0pxuzf1dqkxf5itsum0hdotcbdu1kcikisqxm63j65q86qyzlye8fmbbrzhqf7zrzfpqv1v5vpb2w8ex2bi75jc5rbomwtp1eg5l2rws4sbb1yn5y7z2hnrtg6d3hm6q2no49l3k4gwhxcpfx4e0v3ql',
                retries: 3617391455,
                size: 1555776784,
                timesFailed: 5876896295,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'jktjriogv13otpomo4ec78qsdcwkn91xe3903re06mru3fxkhh',
                systemId: '0rhfpa1fviefxebh6r1uxa6bzsuy9oxd0l8lt',
                systemName: 'rkobxaipybwb7ntx1vas',
                scenario: 'w06fvmao7gm2bel9xd3qgiuzlamkz9uhyph1nn4llzyrv3fvc1u8qui6pbql',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:48:47',
                executionMonitoringStartAt: '2020-07-30 23:14:44',
                executionMonitoringEndAt: '2020-07-30 20:09:58',
                flowHash: '9urwi6mllowoguzvqrzgz18yatph1fibwo4i9ym4',
                flowParty: 'ac2kgmemajth29w57gp7ogx675cqg5tae9nw380a1oytr0j9nc0s9xpru3hliyjl0rsd4has8df077qjfxnjza32k3xahzru2ptudhtzctfq3pemfad6d7il3k3l7nm4zeuth7pgiqnwk7efxhql6kp4rtcwg7jm',
                flowComponent: 'raabdcwzfvvixivy3a63zmzv39lnjfbpd32v6mspoapianhmnwg1c00dq6p82yni3h54yfdt9chrh2mpq985ikhh90chotu9f5dlsap9aqcpg4rnhie22j1cwcuv5w8k00w0iuhg8e0ixucnazz5llmihbd96t9x',
                flowInterfaceName: 'yf1n157ecc7mnk17icfer8mh2c0u04qbjayntn2qt0m1uehpo3uyr3ynhd6l1yc18h1a8vjvyl3dy2ldpkv2wllljyitxiws04rotap8u0cbg6osgi98mzkli9pa9524p8amwwdxazmou7tf27vql7gxxv82ykzr',
                flowInterfaceNamespace: 't173d9lcr7pin8y4s9ysb0lkml5gsfjwp7r9et7gdkazjz0k66f7kum4oqfyphtd177jrkbtf9nbgpexi5ne9iv6tdnq33g4fv30czivhjm0dnecqgg9g63bj2c4369cuyrlis2a7bfwnjwoie3skx2ky7qpjz9i',
                status: 'SUCCESS',
                detail: 'Dolores est rem sit molestias consequuntur est consequatur. Ut quis ipsam voluptas dolorum expedita dolorem veritatis. Et maxime omnis repellat. Corrupti placeat ut aliquam qui vel.',
                example: 'ls67gk6awtav9xqsy32wwc09at59ga8q05ytv7oz2r7odg9fqgse3vq15t1ynnnk4ii4wr6s315gble76wvb3lyni9tltpr34buk6rn2qty4hcaamo4tdy0mco1akqb9eu7u0bzeu8f6tpvtz1stkqikrtivijim',
                startTimeAt: '2020-07-31 01:07:06',
                direction: 'OUTBOUND',
                errorCategory: 'qeixryoyk23x2guubourjsrgzo9tfmwy8tq0wkk3ckazirgtc4n0a1wkfqqcybvbg89nzeco2ggzlmhzcbo7cdgp0bv0e44jg0grcnsjlq0en9kx0ymfwi8i2dahesjlj6d2macf44l7e5z7wr7zr2jnehsx6xp2',
                errorCode: 'jb7sgcx1cvanbqgtil6ohsij4drygbpx3op80guo8c3jg3ic73',
                errorLabel: 977232,
                node: 5102761710,
                protocol: 'qz88ygw1r3jupjz1ah0c',
                qualityOfService: 'djd8kt4mz9oojvfslpkr',
                receiverParty: 'lbeyzjp4w8shkwp2plwslfaizu8qteti7ev5uacdd38aviodc7ble1v6c3j95bmqf6uni0k7hwlmk7gjf8u8a7nqlk0i9ug549zerkexv94k4sds8vu5egdw7g3b1tftxdi8937cor22jlbiinn4aea984hmyg3c',
                receiverComponent: 'yaaeiiuzs2co96y0e5j97qx6f3pu8ec35cjil1h04qwhqaxbn11kxndghzanp2xfi7estnt6zz8k1rkil9n26fgr5dqzh3j5id27pbolo7u11rp07zgm2g52ep4sdp653fgjgsm0qjul4b5cc41f5h9lnx9ts5by',
                receiverInterface: 'txbdth89or707bw5eah3kr8o76qmys1vrcihl2cscjtunepcpojrxasz6s5e56zskspdvsfegsrziay6qyim2e4ahx0nafucqvzesrhp6atop7a5a9eq6elzrswxt0dz9ayh7ex8gnmgv1a5qepgngilj7z7lxjk',
                receiverInterfaceNamespace: 'k4eut3gll3jxggx40eij981c3k41toiiau1msw1cw5geewpypggc5fcvwgta2ulr81t19e4q66npfj0oo1kxr3tm0psamg5vq1fpkr70ch0fkv6xol899zazc1tjc2awqb5inxe7z285p0j4w3ewh1dcpuis5wft',
                retries: 7528697591,
                size: 6516805396,
                timesFailed: 6422438231,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '1gn6xwyz6vqzxle7tr9s9i5nrlmtf70qvujvu1p4zdlx6yuxa7',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'ym839m823pvrreaecn5d',
                scenario: '2spch1ro03w6u5911b648tw67d8hbw0rlav9a4229yuyzqlffjboeqjyuh6r',
                executionId: 'ojfhxqtvtsw2uvs8vsh5ujd0bwkcp98i4k04i',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 14:07:01',
                executionMonitoringStartAt: '2020-07-30 14:42:24',
                executionMonitoringEndAt: '2020-07-31 05:41:30',
                flowHash: 'fu4162y5maouvnxmrd97vkynisnq5ymuslxojejr',
                flowParty: 'scbnh0bp9dxxottfweb712usap3trc80jmm9ohr7f76uvjmzabahpp2h26pbvcmva1kutqkfn16ce7ccf5h68pgf3k3fpaa6oonui16qr5ykwhm9h6jiuy89abv5yajj977goq6xsxmkoj30tcugcluaqo2wxios',
                flowComponent: 'zn0m4gpqt6opcvpa60a5cagvect146znjxtgckglqxh7h7s2wemag8tbwq9owkih6pompg6q49o88fk2s8b09xeue8uo5vgwqrgderj5ssrcz1bsaxvzxu8igybuxouhzg4d7bdtr4wuz2gfsfhtj2jy810q4nac',
                flowInterfaceName: '4kcv8brvnsalck2pehoz4ghuiab2e3ibyzmwtmlw5uvh9bm5655nb4csn7hls8ixhsbxsjsj2abisli6j0uih8c1vfi9behgw3syo3rcer9ohsrm261dqkjrpa1zkz433gg8n2q0orfdhq2vo0nsq02ibhaf2bjv',
                flowInterfaceNamespace: 'mfeqxg6tsnqk59v1iau4mqc353gsa0v0frqk8gcxrbbz3v33wisftv272asiyx13o5luqqnv15s4h8nqrouj0eac3n0k3ygn6egb35c4krbmg6qrb490i3msyyhhzwjzxmfpk3mn6icnkt6at9gcl1yrvym4l7go',
                status: 'HOLDING',
                detail: 'Velit alias omnis reiciendis voluptas hic. Eius cupiditate culpa blanditiis. Aut a quis qui non ut cumque id sunt et. Eius omnis doloribus in perspiciatis non aut occaecati voluptates. Quidem et quis id dolores totam tempore mollitia hic.',
                example: 'sk33ea3m4zhd0lvpsv790nrttd0d9lfw6ajbodkp4ufubn48gwym7pfpoxwm4i7zly87mknykm54o0gxul7bb8w7xfv6tke7sjcgwcnkvz5ph91z9e6el4iqyv8wpf7wmjl0blddaqf01jyecyskgf82okh6g608',
                startTimeAt: '2020-07-30 15:03:44',
                direction: 'INBOUND',
                errorCategory: 'u73n5kijofrbxphat93vyawlx4kl0pilknmv0ky5zwtc6laetp8g3vot0b7qvctnxoovx5z6yx2kimrjopflbfarhlldudk21bi58i6xgc5oc4gups6mpxee0luffifplt2xy7ka2gci4pzdkq8qdau4nuq1bq8x',
                errorCode: '2p074z03derovo8tfwiit3wnn2791rfmhnckred60jol8fq08e',
                errorLabel: 945510,
                node: 3362450326,
                protocol: 'e21tzw9aar6te7bjtpoj',
                qualityOfService: '2z6ujmjcludcfwo0h8un',
                receiverParty: '0upwgj2s50swxashgrk7elqzg71jz766fdaljfq0b5rmycx26cx0awycco5o8klh822ets550kv14t2lfevwg49hj8b5zm9z7srybbhnf73ptdoraqi329ayb57skfh8te4kpyqn7svrodiw9cvllrhfz0zf4krd',
                receiverComponent: 'qwdko657tjqq9ojtq1q5c3okeoea7wawkko0ps7deqskbyzalxpztljhl5nngtnxhyaai1hrisp1brp7x4jim678ahhe9um5kbx146h9umt0fbnqoc9mgfqdqf8i6hazub3evavd1x11iqhto0jrkfqwhwwuvctr',
                receiverInterface: 'lglafbcm1htsjd4b7im3qqk7pfudm6ws5k3gmkobhu7we50efeien7dltmyzfiadkxfcvhwhxa88d80wdr2p6kwuw7bec9b2xnttqeizsoka25z1xq6et0odi49m5g5n3j7aztklp5t01wrqczdo3vixmtodcqzh',
                receiverInterfaceNamespace: 'xkorjn25rvn1qkm9wya39x5g5lnc208jkqnih68nrml6e7qhzunmbnsqymlfe3m0bjubsf2dt3e1j55jkwkx7yrwywnd6tjroqb1sjxtir6r55chx09im3tsl1vnmwsqy7xn4vnrd882dql6b7q5myscqpm4ua7a',
                retries: 9011128881,
                size: 8873328980,
                timesFailed: 4302197746,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'hlvq0dd9mij9c35qya5sazfslapar9g5rgh8svaxsloh9oaosf',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'x10v28k3tgzej0nf2sy4',
                scenario: 'myeuyi25m0jrs9gou7184h40h0lunkhc20qhs7mfw5344japgg402ewelis0',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:48:47',
                executionMonitoringStartAt: '2020-07-31 05:26:06',
                executionMonitoringEndAt: '2020-07-30 20:44:35',
                flowHash: 'jnfnc96d3x1seuvsoh9gshi7zjpae3fl5gjezrp5x',
                flowParty: 'rf4mbb3p6jr98w8s6ctlo8o0owee24a5zzrca5rcdwunrvypqbx8totuphh9rb34lcnuvuj10euv876y34n5t5nfewblds6bw5kq7a7gob3g9afz8ex8e2g7un5y26wav6slem10bkgy0uo3kg6ovlmsbbkh6f05',
                flowComponent: 'd95hx6ocjkzyz3ikorw24695gf451r6k2dyuq2yzosdxxjyk9a3p59m77l03dk552r0wxeg6rr2hplicxvaexk0cze09360mu2ok09asrg2wam15dwqxspro8d0bd2xyvtm1l3s8dvxbwu19ushz4kj25s8cpwj8',
                flowInterfaceName: '33ofzgqw4fqnhlrbjfopu4z79p7hlb6mlo8p3rlz96k7p6w6qeeszlf8hgxvmmjy4jermnz20ciyza01m2vff74qsg55dp7nre3m3d95ryt2x50st96rmvja8f0znky46nth26zsw8zorj8keg71g18y1frme3u0',
                flowInterfaceNamespace: 'h5vsfwufma9qsl769jdttjlgxw0d01mupchxtwzvmmlcfuvg685ldorexqrhiqwpcbehe62cksr7ckwdt6k5q489c5ykumv0sr4gdvcxwgenadtgpy9l3hpy0o5j096tcrnkotywbmcunvxjtnva02d56iuy1iom',
                status: 'WAITING',
                detail: 'Dignissimos fugit dolorum officiis eos et. Vel nulla ut cupiditate voluptatum adipisci. Ut nam sequi in ullam totam est. Sit impedit mollitia iusto. Ea beatae iusto voluptas dolores consectetur illo.',
                example: '6rur8bxmdaq2ay2i8347iw2em97rtz12a4zbu3g94666urwgl0aentvwlijwoujxwwb2cpe6nj1ynm76d0qeyfw0obqskvpai8blsotcttlrqg8vy7q252e95b487f32wbuzdgi0l5zdjciutqf6kchdvo90p4hq',
                startTimeAt: '2020-07-31 05:32:23',
                direction: 'INBOUND',
                errorCategory: 'n4d2ym4tpo8teu7izu3x44eolb7ilmhaslwbojl9z3hnywl3jgy59hda08hx1ixwzfpn9pbx9el5xv7dn4m0vunb2eyqwnxj63ct0zd1oxqcoxbx8tg97cvu343sidrqpaf7r3hvewwtm21dnlsel5emhsl6woj4',
                errorCode: 'zizgiprsttyvc579ffgpytb9esu7csol0vr1fxxbro8seiz7es',
                errorLabel: 554480,
                node: 2758857551,
                protocol: 'e4i07nh6u8nmjrufmged',
                qualityOfService: '4kfi3lu9ifnz4k70gben',
                receiverParty: 'iu4ivhijaetukmw3il26i7cj5irn0y7ipn0zp13de68euph4ut8kizb0kd8mipsvzinnku502xbfwveodu9kr1kknpububcq7cany0g4nrc8xcr9pt98wauvyc7jku8gjx81tok1rajc85nxnz7z909ibkxv2qt7',
                receiverComponent: 'nbwu5wl2xrf1roynqqr28gzktze4gczc2an10baqebp1oz067z8gllmhulrjnt1gg5jzub6zq9dmx4mfq6i1abe4t8mb6lrw7224kl7wsfyjqgwaafls5ncckuuaiz0agr6l7zd0bbr1wbrsqfz0fg4jvygcf3oe',
                receiverInterface: 'draqjtc04t34rqq0e1gn6f9v9h6cfsn0iwqmitlx9w3ju6zt6jrr058v0xxxfyivcf0a58th8b66s7lpy5arypxd88utm6lyqx5plj49qq0zvhyzblk4hqxjcawwkm263lo5btja0xtqu8tir6zxqyzhd3wvtrbj',
                receiverInterfaceNamespace: '0doqt4561g6twjeazx2n0dmpcq85u8zab462zg3yv7ch18uslraoo7x2p2aszree6zi7i0bw5lg1dc2lpeha5cmiab2d3gt7lg0m9ybw0pk4xakziixaqhgsylaxzh9eshqixoqh97xnhiex357jlrwtq6qd03xx',
                retries: 7182052016,
                size: 4414423094,
                timesFailed: 5522808761,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'xsn8tbitg7l800bigxg7wf7e1hh9tmo36tu72y6svgdenxg249h',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '5inzbroi0mm4et86csiw',
                scenario: 'telam0u53zudid34mryspkioxmlyj4yru0p4a4plllw4khm7apbpx9mzst4q',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 01:30:17',
                executionMonitoringStartAt: '2020-07-30 17:52:40',
                executionMonitoringEndAt: '2020-07-30 14:29:47',
                flowHash: 'x6308mlxr4wsnuvfm05t7xhwb4dwbky6ptawxmgx',
                flowParty: 'xaf1bfdwcmg1j1gar3unbzftayhc3cbgtq956swe6ev0r9y8jmn8nb9t8bf3v4h4awu9fhvtm7cp5wkb9u7yldhgrrknzwbduhsn7hl1583anuvh8aopve9y33643iw7k27417ly2mw8ftkzng49cr2pp0d3u7dd',
                flowComponent: 'dnpq4yv8sad8yx4ou2d3c1wsfsdtatgb5p3kfkp437axils7qck9rt6xsmdl3hvh4p61ga3kqmzazx31lgj01pdklm34s5m4v621q682snnu9m9t5dloauuca2qegdmvs4zd2fcmv2lommhrcxukwjas2ut97r74',
                flowInterfaceName: 'k1t0srictw3ssgzu6op0jw5sbp8trhn9st6hsnxodyfbjqkg38ang4nbbvvwyjk9pxpp2t868bmmvn2miaqkwzu3fw6meepe3xxwze6zcrewfys2hp27xuuu6xrthhwmbu64gp18a3dzxq810zhmnemkbfjz0tbx',
                flowInterfaceNamespace: 'md0zag5ysz5ogjpyqjkqj1nfo37dr47zszhyt71a238oxk3w262f33jk0sfopt2jlop6oz3egfn8a9assnc9g6styrc47po360b24b985piszr28zv6dfl15ufd1c1m7p8l7ktb01aj9q96l113fekcov4t3d21n',
                status: 'HOLDING',
                detail: 'Corporis quis hic. Libero et ut nemo sed nobis aut non assumenda. Ex cupiditate qui sunt tempora molestiae voluptate.',
                example: 'mtz2iu63kocjitt0xz0lj04pj2hqhl8wg61r5giwwj8mx9o12n7s3psyqfsrxvxuffw6mik3g0ou51q37o0v8qu7s8npm1t76xdr0ar65ts7rxkboveqnz1gkh2sxq3qxpykzxuaf25yg7grzkqdsjgduak9fx7n',
                startTimeAt: '2020-07-31 02:12:36',
                direction: 'INBOUND',
                errorCategory: 'ebqfiu073w3ch1v49md22sy678hijtp8zef67fxjroal13wscxogu3y8wn7zbocpmvuby5wvfe3hw0qhs3emq8v81u51yls80wtx348u0zz32h8kamm0fez9lnpeee6kr3r3yvqbcyawmoxk6m9h6a5p6lkv2fnj',
                errorCode: '4dwamf1zbjtxg4kk5danglvbwg6eerowt26nqgz6qs3fb7ppt3',
                errorLabel: 515018,
                node: 5448643597,
                protocol: 'skxdu303x7l3pdlfa3vz',
                qualityOfService: 'gjitfvk0s8f8tbs1tlpw',
                receiverParty: '6plx1gmz3xtekzcldc1jly3rg51o3unhmuiv87q44xe8zrd0swhw2ar6t7695cpfh3bgd8u4wwhjj7wvycxqd8huv4oegn58jjq706rapsmyv9h2srukj84wjfy6rqygm92jg5m846jwkrihnvql43hsvg8hc9xb',
                receiverComponent: 'np8yagpafqq2n1l7lm27w0533gici9ufvag7houtt7wej9bvrk2km6m5tsjpiok8mi465vitrpoy6xz3p7ib436sb038tk2hpl2xd93ykymnir0wts8wqytsvvd36xuszgqqgqkbhqwwxfk8jjbmoioxw311ngpj',
                receiverInterface: 'b8v4njpp2bf8mfsvkxops588zyn854rxfl1s1f0j7ea58xt4dgk3vvmdwlz740x9nh4l21i5gfu8dve0qamn6vs1um3muqyd9aiwyarq2zrc5obpvzkspn9eoh42gcfusg1y0uqxul1l3z8c0glp5q20sga5rfnf',
                receiverInterfaceNamespace: '1skb2sqdtbt6fxr9qf027ffk8ntrh323qo51lyjont19969a57mn63e4kvw4tiov6qzilxha9y6bh4fvxr69ymc2yntj092332hxp7yiozvojw6bd4ng9hz6s19nlaxyg4joru3l2bmf9992atu6z842gyc8ncst',
                retries: 8900027056,
                size: 5174959086,
                timesFailed: 3961492160,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'glentimhgkiz9c0273evj09qh2v2bod2r2qnzouprlxwahsba2',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'iqq2tm8m1lrfygvoayl4n',
                scenario: 'ni3rwhua4loz4v1rh24iqi68iijlkn6fe03ozg04oftd99ruijpkc9pxg3ml',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 14:59:39',
                executionMonitoringStartAt: '2020-07-31 13:26:03',
                executionMonitoringEndAt: '2020-07-31 10:38:30',
                flowHash: 'ytdj3y52yw686m4ucdamj69w8z239gbe8r5ourou',
                flowParty: 'y39pru0z2ca8qhkizabqu590u67mrf2inpxtcbimi06vtyss3609qus1ckz99qc7euc094jl9kzk54kzmbl3xsn5dc37otm3beinlcewbwftfpvlypq95gcwq8rgvffbdwi7ysjl0keoi4tvqzu09bsqdmkxmaxu',
                flowComponent: 'z2te9ul25gbehg1b625tyvi2n4gjv8jnrwmcg4kxmh5g1frevyd64mgor62arwwrjohz67hr5r6qo7mo2zqcd25h1npu1xzl2ta6dbr2ofxu85v9bm6x73n7ri0khm68mmd1ltheue1a4r94lw7zpkq35zq4uuvx',
                flowInterfaceName: 'lv7ogxgb00p8gy51qjeiwn5dkko1rpf1ts9hld247iqxp79kmp3efteoagmb7awo3jby2ru1ka5ggp0c3rldnmgkvoel5g1zy22kucsqdqzcqh732urhj9jwyhp6yrbta2frl4rrgu9w1ono1u0c9zdh6lginz5v',
                flowInterfaceNamespace: 'td5mi6pwv4hp3mm6tne9d33txphscl6133ehuvo06lrbsgeculbga25zvzpczjb2ksko30ga12jokgtd6qmgonusfk3n87jl11m5ih04f9ti81mcvnzwuj91xjug8vrjuxqb47ckirr9f6z4aekytn8hjvkd7jmp',
                status: 'SUCCESS',
                detail: 'Esse veritatis eum doloremque. Sint necessitatibus ducimus expedita eveniet quia sint enim. Sed blanditiis consequuntur blanditiis dolore delectus nihil. Nihil sit omnis quasi sint ex velit est suscipit voluptatibus.',
                example: '2vs9xbrht6r2byapk3kzbrsihads2sdgey0n2jaks1x403gm2sl04hz0wenwhzycjhh253rt10h2kxyptov90vc7knmcm7mi3hl6vr372xazk3tk8fzqvdba6vs4zzd0flboqx52rbro9hkpa6f3awkq89igqt94',
                startTimeAt: '2020-07-30 21:08:29',
                direction: 'OUTBOUND',
                errorCategory: 'ap8zzr5mwh8dpkvl57309txw2h721pkwdrx1akron6adfd6cqy5px0imlv1t9u1ocrymf20qntngpg1h3g328frkkermwmx2svyrxz81xxaat1l0wzxse99uqpib3qd3a30sm66fbxqtk0pcon5mbymdfj176zru',
                errorCode: '8ejz2edklzpatvn28iwc5vzjwpqpwubzbpaqiy9n476275enhw',
                errorLabel: 896679,
                node: 8651415638,
                protocol: 'txbg04m2jvgcdc6ftvya',
                qualityOfService: 'paz50slqh8jyoh3zphvd',
                receiverParty: 'x8bkv6gzqwl6lepes9rx5dv62ihjnap16vririk8hs3yjjprjs1n5joni9ny0cuvc46isy1aldqajgbwx8os4mt8h6t5jke6y20vlmkb9s62gqr1lyyvcljyj4vl856n6jqirr7kqq6hue97mlrr57r3jatmzz8d',
                receiverComponent: 'j0s602jz3zxi77zotwuxdhe1ybqltmtgyhbm7on6u206wr5wm282krgqswg2mdaxtmkddcgnv8aeqtz3uvh7x1snv5tfjqn6omur44c2l2su14pmgbucqdb2q5gzn0lemibv5oq4m4uz4hhhp6slzf6a9xqfmv0j',
                receiverInterface: 'y3954yziowj0nluwzru71m3za2f4xa54fzhpptyczczz6qc1fcr5z04v1k829w0v0m1aprn9hsglmf6s73kfvx9nv6au8yai4vs6ejri004swcqt2vjh137t1t9ehisub1sg0hx7e1nk7no6dictvcq2y4vjt4nv',
                receiverInterfaceNamespace: 'qrfhcafh8wm0pcxabahm5wsx4j7nrrgwav00wnp4f40kfeon851fz7z5don5wfyk47fspyr4c5ap8ka2d3ughjlylfv5hklouqpj1mnac6r005uyfqxo13jxtqyflkw9pwkprj8278w0q93ikqp0roapy7ee1dm5',
                retries: 8447088860,
                size: 4270665654,
                timesFailed: 2058901320,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'iodgj6ls50r6ikajvw2qidpxjqfbjr7jwbv5qgg5em4215zke1',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'xyngjicah7yaaxjr9v0a',
                scenario: 'h2btnej6dbf09r3yslxd1715pujl3pdac4jfiajdra3nej94tblo5thmprzwi',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 11:42:20',
                executionMonitoringStartAt: '2020-07-31 04:13:46',
                executionMonitoringEndAt: '2020-07-31 07:45:36',
                flowHash: 'txm9knnc8uzvnz06t69ukpdcybcirnaj0lv0atkr',
                flowParty: 'svqx7rgl2qbv73l8mdf8ecip3298gqnxxbvtmo5t1jy5kwq5m02aozmdkq6vqogei1kdk2h43j4aowea6ibkwuzfaleot4pyh9uile83flrdyssa85fedu82ci5psuatjxgw97wr5oebx1w97hft0yhsv11pw7mi',
                flowComponent: '9fia2sedic3dymawn0e37c0gew3tqfg3hkc2gpvgrffk79nlxye7xza9pbeov4j0c62c5d6zgff0mxey640c7n31wcowrsqmivzvyubjmkwzoy58r3dg5pmxg82vmsc5fjc2ge1tgo78yozrdyw9u953ltfv5hy9',
                flowInterfaceName: 'm9kqyhtsjctxzg92pdfoau4o8ovss93pja2710d5bdprc227pxg65ec04t4nr652559o1psjqt9ubd4fsj8p29j36ob14hgalwxdl8gogkknc199vwl5wfzkqcemkh2kdykoa2wc0l62weky42z981x7decuv2hd',
                flowInterfaceNamespace: 'xa3ladosn58k7x78mepigl7ietdc322jspii3sizdua7smllgv8op7t1dquivubc3csaip8bgx62l3c6n7npnko5j36zmc9w71q4ezallb23pafbppx4g5g62lqpbnorp57fdgef3zfq4sp5uzsy8uyam449unap',
                status: 'TO_BE_DELIVERED',
                detail: 'Et cumque occaecati impedit tempore. Non nam molestiae distinctio omnis aspernatur. Rerum explicabo et sapiente nobis et aspernatur. Explicabo explicabo quibusdam non commodi voluptatem maiores.',
                example: 'gd8isjw69mal9fmlhq1iuiktnp299barorwq9d6wga48tuirfwhjb0n00f5ju9rdy0wew02krorywwrllp8tp3sb7pljw80delwpbx24x74e3jz5nssm75gnywpyxt50d6age7mo940n279puiy226iwi871af0w',
                startTimeAt: '2020-07-31 08:50:37',
                direction: 'OUTBOUND',
                errorCategory: 'c1a8ns8zs33hgj9ebm22cmyk0o78fx9x3scv5mvwefrv1w86ez6mi67fq2dzx33kt76eg8v95qal99x7sm6lk51aznupu6y1t62ekn51f0rocpse0eaimayce5w90uap8mlwmy8lwnpev60lyf7ho3fto2jdtnp7',
                errorCode: 'h0pzx52f935fdjimqo6c9uze1clvgztelgyj9v6tligi3p6098',
                errorLabel: 983966,
                node: 4782644586,
                protocol: 'fykp1ciwn1jsam3nbrr3',
                qualityOfService: 'uee97ou0jubei8rqzhyg',
                receiverParty: 'pu2w1974i2h7tlxw1ynfyhe4sh1dahw5gwzjtmkonn6eb3922w7oqrkamqeuw6mxh2afmvclje1fop25hdjmzcdclauf1dm6osrxlb7ue7ue28hyqidhnf14ibrj6gr35bx309tyupz0q5smayz98t2gkjtwxhjv',
                receiverComponent: 'l67pkdi1xv5wgmop88q21vicq2j8mb5eddq4yle0m8tgms2eg0w7qqgmj63wjgr7ik8ftbia8q4t4x811p04s9pz540dw89n7d8rplwc3dprxa97tey7p4fudtwcb7y4mi91b3x6v6q51s4i2rc7p7bfc0eiw3ji',
                receiverInterface: '4zlmobaxhv3ice655asur8r1jqjebm0s2v54obe5r512wj2or426cr5fs38f1q36olroz5aquut9k3v9rvblwfr0wwb9i3eoacsl8vmr5iiog0s7uryw9wqd6iu9whgw1nebmow557eeg5jya0oompfchmybxnip',
                receiverInterfaceNamespace: '21nc8m2g49bsx5z6igcyhup38u2ntxal1wpg1mriisssl2m1ytriof7oamcig51aq1267scjasudfpu8z74c2xny4baz16nbhv24g0rn4vms69aqllm5qe6q0t2n135mwbq952hqjojr8srlyos2trbtjfk89pud',
                retries: 5078462844,
                size: 9348214571,
                timesFailed: 9171677467,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'ucrnigecbxed0q4uain5zb2rjn4t84tfejp2i96n88had19qv5',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'xv5j0p4qxeinrsnl05yv',
                scenario: 'bwbkik8im69m6jw8gn2mv47a5r88cie8s769vynqm8b4j8dy0nsg79gd52ys',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:33:33',
                executionMonitoringStartAt: '2020-07-30 22:40:49',
                executionMonitoringEndAt: '2020-07-31 09:46:42',
                flowHash: 'zpqdwgm0h0idi6qowhfx9ihov3xlhaep8lqxd6wg',
                flowParty: 'v6r7lak56i52ot8d0tpviirizvq1zy141q8gsdex3332f2ti5mdwkquoj5cjtlx2aox17tue0kb6y610iaj3cnooxyby7jqqwry6i7umfyfqku56gm7zfomi5ney4lmdwqizdb5bfgecmm1jxzp6zke9smudhuzzv',
                flowComponent: '212rspk2hvf24dvenxvgiv11pl9voq1e2ww9a6hrmzdvti4v8tmgxoeihkcbwyh877zo9cvkv2hp8g710qqidaeycx3keyn7fiwdh6drs23o4xukcbqcd4v5n9gfbdehqi89vbvlca6bf5eovg5cyjl3c09wd04h',
                flowInterfaceName: 'a4lrc0cpzh9g7okxtyvs2stqrn7241jgfrng1khjxnfatb8yxgw9stw1id1ikj2gr3yl7cf5aej5y4ek5nwax2q3pdbc0orr9ax0qqd3gjjtemsbvb7i3o4jvgndq0r46ktktcmyqocudq8ax3oeg2lkxmgxrh50',
                flowInterfaceNamespace: 'l7p4mh581fi56fjmhafgq22y28vfolux44d6q3vrpbhrqtjlaida3ni32srzqhaqvhql8aqtp7v6bimit90kux66m2laf18gsf2i4fc4s12wblp03outiuxmcvq1957qvsenfxrjxjnmd7ciww2z2jgsxvbt2olq',
                status: 'CANCELLED',
                detail: 'Sequi magnam nisi nihil amet. Laboriosam rerum ut veniam consequuntur dolore dolorem doloribus. Voluptatum quia quisquam et. Corporis voluptatibus voluptatum consequatur quia ut vel. Laborum itaque numquam nam officiis eius temporibus excepturi hic iste.',
                example: 'vyo4emxsbtrnnbsh7014bcu5oixb9mktjoq8fzyft2kwu4sa1j34w0ln1sukjul9itpbsm8lpul239ovxehexqp0ie33rlx9bp6zbkddmrrv7vgrxrld6inbu1s0x8vff0huw9z14izx9aisrddq9om1lqlqn4aa',
                startTimeAt: '2020-07-30 22:17:16',
                direction: 'INBOUND',
                errorCategory: '6y7ohe8tvkxkeh35v1va9w8e6jtnhus0gyni7hq00moc92unmswefys24xa2udnw9quoesd7fwxkgklpp409vt59h2hu45zj33852o6ppsy7ou1g2j18mmcse9xyep3rl5l6a88grb38jrnpqsvzz007ktr9hxct',
                errorCode: 'aobm5nifhbqijvo3968hego3ko2h0fia3konguey9lynvjphpd',
                errorLabel: 451788,
                node: 7002760428,
                protocol: '17lasw4lfffi0hhqmxps',
                qualityOfService: 'yr0ywrrbhchgtbxzfgoy',
                receiverParty: '33933et27qqhdm7getbcuphlc547stj0csmcd1rnz5cy0mwxea1b03xsrdm27hbcmqqdcq0m3bs0ahkfv5wiksrdhdoeeq99441pv5qlzw4k6ahspucsgtndf9n60cei8kdm4xsqla4jvk089x4p60t3bwxp9yi7',
                receiverComponent: 's3pvlfdkvkbdgys5flaa8nyhahyyeizg6a99e1k9xsgwq5ufm2xj1mai269rwnqv8u36q3u9texy3nferfc452twifg20y37gq749nlrpqlp1b48d5rr6zkc9z4x0i3ujdnlg2gjzga20172jfjj7ysyhd1mspjo',
                receiverInterface: 'uqwprk6w44vevhrslhi0qv92k5n1bq6uj8xb04y7w0pwsmq96h9epqwxtvhww68lwpdzqfz9zcv2d60ikxc956dfsbn4pqk103k7unxwbdm0xypa9i9ba4efcce1bixxd4aw1p1b1obxz03vwurjjsnogpyr0ph1',
                receiverInterfaceNamespace: '5fgnhcnvn7lsrk2xfrgiyhdlp5wb7x6sad8wemln4brkxcfuazkbzfpnhncnj6hn63vjywyrf3byhgbmzz9xintnv9yn7vu823tq3cvhsh2s50fp0ukhg9lqmy5lr0hq0rh94h5ss771xkv8ji4jkvfmy6rtq5vc',
                retries: 9582644231,
                size: 9737339477,
                timesFailed: 8052280414,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 's8hiqptktsh0bmhcyhu3816r75sexgu1f9sugzu3m9y1u73nyg',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'qt2fh6r9ah5zyu9tzm7m',
                scenario: 'hl2p6lplvjul3m2wlf1qs62hnzm0p64pqsrrbdj6a4563o4iwhw7iow5dqmd',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:50:32',
                executionMonitoringStartAt: '2020-07-31 10:37:24',
                executionMonitoringEndAt: '2020-07-30 14:02:04',
                flowHash: 'badkqdpbp69o3aex1un1yjeiu6l007jf3lewf8sd',
                flowParty: 'xzltlnw7fhj1rc190p1vfrom5g9y2lfi1ka0aejb9co37edng2nwf55ywzeic90a7wydm7avj10etxfz2j6joo13i8u7jqgbgnoaevrzhiyxi7zas0calem1jb7m2rk595vaxgz3ng000yjdw6tg42z0w6n7bawx',
                flowComponent: 'c9r846n5w9ctzl9ht564im6tkdlpkk9nc9h8048qlspqi646uidel3g2ojb8t484emwp2f266t787zqi5eacnsfxh61lt0hwgn1q5rn3epfhiv4cn633dwzb932013redzj01iaghg1q86fzhimej589f92748ndv',
                flowInterfaceName: 'wvbwdkqmq1epe6zvxw4elx0m2cmkepyib5z25owv3wasa1iibxedtko6esbyts7ttsxsb6kv5eyce1p627zgrqfc74zfc5c4co09oboeqauzsyebxtuhipfiswtpd5rdfbdp2wzcz2mky8szxvyaf70qq189imvb',
                flowInterfaceNamespace: 'o2kski3t1i9ztwe9wp94ryi5b37qy8mqmvjh8guh6bqex6lnz27x3n0hd9bmjfrj824sf4x8gaxpkym3uck1dfup4awmoqqvweq7z2neyuw4hp1pmz082w6n2d5madja14w5j932uqh3sntv3npjcyzmg6vzdrs6',
                status: 'SUCCESS',
                detail: 'Adipisci modi dolores aliquam illo ut eum tenetur. Eius odit fugiat aut nam quam vel. Culpa aut praesentium doloribus a id ut natus. Quos consectetur omnis est minus. Doloribus id quia voluptatem eligendi. Alias magnam iusto quo aut.',
                example: 'rpmg080snxi0qmczqw6zp0madoqcw16onp4frhs8q8fnh976fal6df3dp50b3b694e54r2tftip7jn4vp7i3yux0y2xdxdwgsitelysy7l9rcbfhdlbz55xcsbvq30lxgdvo2y2no2xu3ovmpt98lnkv77xv88y8',
                startTimeAt: '2020-07-30 14:59:00',
                direction: 'INBOUND',
                errorCategory: 'g3bbwmlowb8z5dufvjhmk7adn4z853pmhkoqqfc8uubkl1wnzkly93drjh21ezylk8hntt3qxohivilz4z0ivitq7c9y4rhgainh8m3y8fs7jxtafsvnhi23hesk4hxwpsce92kafdoaut66u02jkwpi54n8de2i',
                errorCode: 'ej1rj1n0pil11zfqppb668tbwf378nfbfazpkn6z9w6gq1j1zq',
                errorLabel: 169173,
                node: 6745169586,
                protocol: 'mcshvyoyuhj2ceblt8kq',
                qualityOfService: 'naytizr62lqnz49cqa3g',
                receiverParty: 'kfw3zt4ffnog00yfl7tq7i211303rce4xbyuvpjkjh3w03e3u6s8d78a9i7q3y0n0auc7nflx04wvho3bwwksdjbhgnj6n0oohzpl10jbideeng6242o4x7zi7tdk886mzd2fi794y8cbokfjo7ga1v9e6h38zbz',
                receiverComponent: 'hokdw5kahn5l4jni693ou26cyes0g92v7vq4mubpby8t5el5jgmpgji5dwqoelskzgsvoul4hjsv0rl9pqo4qvaj3l6od8bah4gm1wy33zr4j5icmwb9rm9cd1z2tjrda266ykg1i5w2ald1wkemmpflzmt1f060',
                receiverInterface: '4wae55zun1hw6oml8b4v8rpk58wf2w9h1mbbolt3ysmycc0vqtaqv3q0r7fjrk1lmx80toa7ithk4kjb9ah2ln0r248rznznfd1cc4ek2id3bwfybbhigk5ew80gcgwtgof9phj7wj3o47minm3leugvpe0h6a6p',
                receiverInterfaceNamespace: 'law6ik05qvkayqoj8qf5195g4bzlm8wz9lh2je2k99dvp8tcjjw20fwvc13aqymg3lsrtlkrm67ajqqlv08qbnpfe9oxzjcdl01makcjyfkimi7qc7ew44q5xcb7uv4ua03h0k1bgnfnn6h6czq6qj01srrchtfy',
                retries: 4344499997,
                size: 6665522132,
                timesFailed: 9313804107,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'paroxwoy0edq85gugl89swh53k4uyqemgx4lg8zgtylnrv0zo1',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'vbedgex3imwozqaboq5c',
                scenario: 'flsxg5bub7iymlmfb42n8g5y7ul9cckx4sygzrdyxsfivvd3sj328ba463k3',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 16:53:49',
                executionMonitoringStartAt: '2020-07-31 03:38:25',
                executionMonitoringEndAt: '2020-07-30 21:52:42',
                flowHash: '756tnqx94nun83ftc6ld99e5uyu1konodkmg6znq',
                flowParty: 'i8sgztoa9t5wcgb6jjtxgs5xmo1pwwtajnpfaefn9hnch1svwfqdqu9wa5rdle93jjp25l033i3l13ztkifl4h04rvyn5w8du9be7p731infvy2yoal0ps5okzqp3b003lxz5idhea84cddvz2rurgu3j3zo6gnf',
                flowComponent: 's9xhrl7jkbzakjxx3bkjennfh72usavnldub9f5nbuor09uoi8pi20mznll1zfqfxk61tfgmdu004uuzlsrrr6ea8zdb80yja6db7qo5hghkc0ss33pq4r8fb3s4j7pl56eb2byfkb63uhohzm3s0qsnamimyvp5',
                flowInterfaceName: 'uvjl53w17r2qnllvhm9xxxwv4pe2759vh2kgl9bpck2t4chye18ahjc27lceae0bhlauqe6413q1ox6otb78sg3btutggexzv6sd2yuep2uipfzz7kroy2c8g08atpno6mtyjsr6c80bsgui303ttom4awnn3q420',
                flowInterfaceNamespace: '5foxqhgkz43djtw9xi408x08tms5abafvuuz2dz7znyrt4xnfj0uiarcbsgc0r5eafznrypsxaw3x0mj1hyv6jlym1t7hvhyvy9cfjpbdayf6wt45vg945mcyeif2ejgqnyjqcwzdbzqi15japw1mpumgoe5ektn',
                status: 'TO_BE_DELIVERED',
                detail: 'Nostrum alias saepe voluptatem quia nihil eum suscipit temporibus. Laudantium cupiditate quia in ut rerum odit rerum corporis rerum. Praesentium est facere cumque iste quasi voluptatibus. Rerum temporibus fugiat quo voluptas minima placeat cum dolore culpa. Architecto ut pariatur odit vero repudiandae reprehenderit eveniet corrupti. Ab tempore voluptate.',
                example: 'nfzxdt6hf9n9kuxhdo2zda5ejuqvgdmirvslsfdqrno0ws50jp7aa5gdss3bzlb5wncarkhw8h1r38m14dvuedkm51h52lx5tja3bf20jkyzq939ag2wx9e5jxcp7fvgj6cgbs0e0wp0vt0g7y8glofknk62k9f6',
                startTimeAt: '2020-07-31 09:05:49',
                direction: 'INBOUND',
                errorCategory: 'm7dm25qpunnmil0rspy5qdobvxamzl69h9ri2fi3s8zzlzynz4svfeaub4dxemwzpwzdhh2pbgjxe37n3i801c1eis78846sy2fkqx85qoyccd8kbxugoyjc9t7wb9rj8qrz5z2drmwyh57jc8ttn0iyoapaq0nh',
                errorCode: 'fitwg6ibz7it9euete4kkxe5bddb5x8gdw60blyjq0ztumuvj8',
                errorLabel: 288273,
                node: 7556711787,
                protocol: '1ar6fi7i7mvq4gwo4g6z',
                qualityOfService: '0pgtbnje5s4zubz4lrtl',
                receiverParty: '07f0r7ph3hizieg9f7kuhwg25ylaql2j8hggnjhy6kj8ciia4avhckg4gibt4nqw2axl9xt3lv78vmuhp5ihyatb6o2oey8y33v342obq9nx9iy35zpeed0qu73gm8be55l5abwvajhrflxnlppr5hjg46wdwfi1',
                receiverComponent: 'lqgonhskn1k9cgsuz9ur032g9narvll5vzj7e6nkxadmr1aqyg0hoxx05ynyf7yjqw7zy0m3ya1prf7bvhk3ciu00pq2x4uakntu5j7nhyl4731msni2jtjenv6muapcwt0gkn2dcoj40bgmyhuprittfk7vbbhl',
                receiverInterface: '36he382v9tls410dwzmz31o5zgsk5ed8s605xrvpni7icgjokbau3ixk213z2zvmd0d5cokqnjza3f712qiq4fnhjryt2fh0g1xkgseyvfojv95syqhzrms9thjkdjknfeypn8a25yls586pz8l8pnx3e42upgm5',
                receiverInterfaceNamespace: 'md4hx4mvl3ppswjfjmyxj51wz9pj2g28skn1ao660qipysywfllu3jc2cpwvub7cm89f29bx7v8knl837n01ltwgophgq2hjgetwbjywa643z7knqnebx0mtzjytsrwj49tb0aqeb839fp8fve1c8gyvz2en7n73',
                retries: 6380511376,
                size: 8108780767,
                timesFailed: 8286631286,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 's65oe65fl05zhiaw1vo5w8ueiaallqky1y1azezm07jbf080b0',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'dlnz0enfd1fu21p28fec',
                scenario: 'l7goo7xkklti0959i4zevt4to5jvfb3t1x9y0bqlybr5t0abs765ejtg966a',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:50:20',
                executionMonitoringStartAt: '2020-07-31 04:32:16',
                executionMonitoringEndAt: '2020-07-31 10:14:39',
                flowHash: 'deppr6fbhcdlfh066lb2lpvyaagawm0khs6b1ac1',
                flowParty: '8qu5100yfvdijx2420k4q3lwklud1i39cj21spl7rq9fnv9bz3xvfo7koev9jk3szf4pny9t92rj1rmabai4tqyx7w5gdnururoe33rzx17fculwmt0wopoadye4v3jy5hwlgfbwwmlevhpvr2pkqsdkjtm02fk9',
                flowComponent: 'rl8wfh4yyq69lop9za3ilzw6vfkr4uanc2fg9j4lg1c702h6lj4g8nxsosovbcyld9hajii97szj5bfuqudyprqvgw8vvpf43z9khyzhqh0nmdjfeelz4gc69ch8j556x6nrbjsp1c0u7hwr64rwzmq3nghoo840',
                flowInterfaceName: 'x0xopv063f3donckipo8i22w5f87qnpwrp47ac7exnrhnxz6pld0onbq6t0lokxwvofy15v6colkugb41tbw39e6cdrhi29h88s31uqeazfbz1s7vqo5h2esy8qit59sw6opnturgs7nvxce0olqhzxquy8v2up5',
                flowInterfaceNamespace: 'ckruz7gz6v7pefmskv8oo4stih6xgdvice2u77p0uf3s324e0s70dna9q46coeh6ofe51pl5z4866b4qpk1ffm52hgu5d79naz6ueytnq90vhtprzf6wbnn9qvl22aijbodlf0gdty8kudc3dv69rgiigs75frqc7',
                status: 'WAITING',
                detail: 'Odit non quo. Unde aspernatur praesentium. Saepe aut modi distinctio. Distinctio cumque sed perspiciatis repudiandae et. Ut voluptatum fuga ratione a ab ullam aut nam. Debitis libero qui omnis voluptate molestiae alias quaerat id sint.',
                example: 'azvg2x959p624jkj51lcypvshljbs9fmz1ht2ikzkyxcocipgyjt1iiy6fx1tqr7q00wejpcdp5tcykibkcfzrpncxaqzr0klgrs8weigcjccrkvmzaynycan6hzu1xjuf9r4kysn9ulrziwv58awcoisqmbi7rx',
                startTimeAt: '2020-07-30 16:22:32',
                direction: 'OUTBOUND',
                errorCategory: '50l7zkwymh5yqvmnq7oh13u2j6eav676ukhmk18jz8v3ae2f0ybqejv4ltj5a412kv7ulwaqsc72ulgegeqoqe9bl3ws32m6wnrxvs8wnol2hilw5ho956xyacmfdtip4d3fl0uxmqcjsmqwua5afew7y0houewj',
                errorCode: '88sxou688ibp5cd7kq3b1tud5qopzuyc2bxpsq5s9qi8lelmv0',
                errorLabel: 803132,
                node: 3768324405,
                protocol: '67y0ajf0d891doydodnt',
                qualityOfService: 'a61an3l57hj45p8r9o8x',
                receiverParty: 'mumo8xqr1wknh9fs85xlc8ms8iab0e22nquxn4juaqg54ts43kz53gjkzuj9h3k22wfep3zamawsr2wna4gzoif7zukp4qq7ohod8yz42a1iznu9ih4d9dggisbz05d0qtk3z63bkbz2jfat123xkwm2kzeimnd6',
                receiverComponent: 'r23lvsbgob4ppjf7a3ux9bssyrut4xvzr3jws2ukkwu8vdr3yaimnucullfbwe77jv9mace02ulmqhkyqjszibo2cpygze1kxiyflr188vl327gq07n5cndlbb9bq153kgxd5drid32mfxjub6reeybatej7cr6f',
                receiverInterface: '1nmcrt315gao7kslz3xx9klgfw8r3q4tcx1b0w5roakkx217xa8cwxmbhwy59nn1qg8s3essh0pyzxje6lcplkxj5315kgsempoufzs48voom10yauc637qh29wgfp3xnipbox7nrjsjijodbpv4rzctcj57mih0',
                receiverInterfaceNamespace: '6n98n3a3d9r6gen24klu12bbczlx1d5ueva2mskudlq0ogt2bkka4lk4vh4yg9i8dlrjd6hlbid7nuhliez4m5ekjf3r8ax21gkczd543xzdv8n7hbt5rws3gzwkflgec3ar74rxijeg9tiqjuzf3wx3s1s6o4vh',
                retries: 4346277671,
                size: 6937418045,
                timesFailed: 1647915372,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'o16w9ptfyzaxyksj953lkcc2afkimdizk1efu1a6cvrvrk9p8z',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'u2muz4ukjtculw7eo1ee',
                scenario: 'c62bfk3n2t3go13r46h3ccx4m1yxjyfb5ox8bqczmp8edwu2kkam5ntdi24x',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 15:39:46',
                executionMonitoringStartAt: '2020-07-30 17:43:52',
                executionMonitoringEndAt: '2020-07-30 21:28:40',
                flowHash: 'yx7vkdsmbn4jdcfy84jccv7fcapec3rooevigfci',
                flowParty: 'e1a3uddfadh53uu48orelvuxxzi4x9n6nuvc9cmmyyjizdp36euspr8i91j7oo23vbhijb4l0nfayiqr4q6cea0azcmifvenbe4854cjwkq0wkk84i66e7u2v1qcyo4txbw9em7nri8sqavtj6htyfby506oazc0',
                flowComponent: 'qz52jwyj381n4wbsb8wh3q01t4v6z77nwewhht7uqdapjqz38s8hkwrm2zhdurpihxw705zxar9oofard49h0skz08x6wsghoej13xzq51sz8x086pgtoo2y807dq933dqrxjfa3gttr07pyb9k86fj7a98lgunh',
                flowInterfaceName: 'mybkbzdyd9fw07kr291xgr5w8dszx8pzlvbtsgi1ruqbdzylip5upedz1ut2x2tabxw1uxjyq665f9qquqdutjqwxvpy8dt9w61kuiqovmjbz0f2e95rifqh4fmotdbul2luntc44zhjs6mr8kpf4412lgo5lj8f',
                flowInterfaceNamespace: 'trs1u2xgjqo405glj9ni5yibv7qifdt4mkmc72zisydqmlax9zvyyrp604kvy8hcq4q96c0x465036w0w87luwy7diay540v8lac2ixd5u7sgehf92ws8xlf4g05xpg1re916joeonvhw5x39wdk23ogchfxqyp2',
                status: 'HOLDING',
                detail: 'Praesentium ut quasi dolorem aperiam dolore exercitationem. Laborum consequuntur quia sit amet consequuntur doloribus et et. Deleniti eum voluptatem cum numquam accusamus soluta perferendis.',
                example: '7d09jz7c6le0ht09doebo0yuwsztlj46yxh6ayhkbhzw6sylo3r7ep1uy3jg5lhjuye9rmrlhsulelhpxd1wd6u86y315nfkwt14crql97gbb2xdnyrcasr2pq5t0cehkdxgodsw9ui1dzyn6ekzbjaegb8aeh8ak',
                startTimeAt: '2020-07-30 21:26:29',
                direction: 'OUTBOUND',
                errorCategory: 'pah6ufi1sy9a52pg2cps14robm7k0ncim2rhyyz2y764qp9ylaodvxekjzmdmlcemqth3of93hm1g21ee26vcyzu8bdvcogn1q7x22s4ikw0zrnofz0cse2drp5sbx6zlp0xzol220ewrx3egqlem9v2apfsrzmm',
                errorCode: 'onxufzeepiz7cw0ld3lechmcc7fv6shvlqmh42c694hqbw2tdq',
                errorLabel: 166604,
                node: 2799487399,
                protocol: 'konsq0irzm97pvwcfynu',
                qualityOfService: 'reeidyp4dnrzsv2324yv',
                receiverParty: 'mrnttlp6mtarm0csqzmx14yllcweusygm8gnv55jes374ynsnrglm5pl6g5c1ii9koq9sxwuvag94tugababmbsmpi3wwigb863q43shtejkgsnt99zif50saasx1gvjci20ht53s3zhruogzfkgphprqsw7tntl',
                receiverComponent: 'uoo22lrzut76nj8k0k73f78l18bpq3kv7qtge7o83tplq2vnp7yvxen8aptm3y73th4pe2domr8to28o7vg9ekwfo6bdkb4kkiddrgzp9p7ajvg19vaax4wnhyn8rp8kr7jscbpmdnhmscpzfw4rxusf5xrz378k',
                receiverInterface: 'zsqzl7effia58s78ibi3ec0d746l4pzd69wyfsfrqz235j1uyrt2xk7flonl67gbrmk0bhy1wz6i5nvbqgoblir1122551jwqd1236o3p35a44w007pwd393qib7eeoz23pfyyp177tpd2wrlpzmmvkkwad2lv3o',
                receiverInterfaceNamespace: 'aw6ic0ycfu9u1n63dee1755ki3tt9hshd2ge9kn1jnhr73pyertg2p4y05ev2n6m7zcy5uqb4ewp0c1qba42wuticefl1c5fekhfivhcjmm6jrs5cnsa6swzirb77arsenhylfoqeoi8zgdoqpoxzl20h1dcpha7',
                retries: 4068868180,
                size: 7949044190,
                timesFailed: 8143197197,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'caai2ex1wi8yu2b2703qd6r4xioo0cv6lwavsp9fy5tz1iygxt',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'mvwj7o0pbve31titoojc',
                scenario: '4k9912m79dy642p3klqnrrpyix4ijy2rna1eahc68tdtreo9y5lrjqrfjkav',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:26:46',
                executionMonitoringStartAt: '2020-07-30 17:41:45',
                executionMonitoringEndAt: '2020-07-31 02:44:15',
                flowHash: '4o2xa1w4jw9hvp8alk3g0zgyr3vb7q76dwawoxpq',
                flowParty: 'pwjk7yolmib5lwiz7lyq7e9mdvlnvylo3958s9aq9je6bplx4n6jr7gcefotl5arfu6rrpyuwj9p29p6l0kh702pgq20i2399xc12rb0jpn9t1a63rm1gq3agi8i7vqa2ll8tjy557u8pghdns5b0tjfph47idbl',
                flowComponent: '9599pxwk1hiqmalka8azkf998k7whzg953rwbewf3zaoz04mu58rhr3rkwus33xb75rfmyosrsph5y68fsyi5iktcz6hpf3qrwhztriv9zbxvzogq9j30hzzpfimk3242oaz2bwmfmahj974lv873zx5eypfelez',
                flowInterfaceName: '4pdk5nt2ffp71rvluzyhji3oq79afnk46p2k5a6xln5z7ov4lg4nnuqp8jb92lmzaj963zci0quyhox6dj1atyxromtnjvuak0pcq7mk69tkyxut450hsw0yiuxfr5ythkzzdsmx9y6zlnvagk45ko3l1m6yyucp',
                flowInterfaceNamespace: 'elwdj49bozy3j814bfzgv5wqm29rc3vx7rokfi8fgjrk5ngynfrz0ol6ebkms97j9yuau9vsr9nida0d7o9g78vjxgxdz5yuk0dyseuza3akzxwisrjqk8pvo1n36byo2z3tuvaa62db4memlv0doz7nrnkwe5gt',
                status: 'WAITING',
                detail: 'Nihil autem consequatur. Ut harum vitae quam. Quo aut et ut quod. Et velit sequi est aut sit ut sunt. Ut est autem tempore vero amet sit quis. Voluptate vero fugiat fugiat non.',
                example: 'qqts08c4k4qd4tl69280y74r6fa2am354rimhl77xvxxdzr4pob5kvn832ly8bw2f3y529w06ou0wnzzont2go1fjrw2rtcd50gg2z7q87bz7jpn5qf745tzd32rok0vsymqtuvj0urbyy3hxene6cqlydfb2neg',
                startTimeAt: '2020-07-31 02:20:20',
                direction: 'OUTBOUND',
                errorCategory: 'xrr9jkvos0r29degwn8qomf6para4zps4cizbc91xqrcl8gtht6meox84v5irvp755geml1vke7zs9l0mmbvpdjtenoh0rouyb3wekwq84hevgxmy42t2ea0w2kii7x0ybal3p1npr68ws8g39crvpqnihuh967i9',
                errorCode: 'iqcfkepm1ne03pahod3e4836ksxmaperiau6p5xmgi5rtoxiex',
                errorLabel: 143495,
                node: 2623580130,
                protocol: 'u4n1nux0ky3iuoqfehtq',
                qualityOfService: 'xxci8f8ifdsij9fq26tl',
                receiverParty: 'owe4uzl3tw4p8my9oedocrkajf2gzoqfzrxzzojuu9pj252zr0hxzqch2wuwa613gn7ehc96ussmp4g2u1yowzjh8s19nbbzgzk2a3yclm5m61p0unqgyszdch442ol8m6fkf08biwt8anik0j71lh8wg07rg9a5',
                receiverComponent: 'j7grlskx66aouib0s7avlzwgo8gcdxstx1683wnrteu9k2unylyphmk5b1wevjouzz7m80wezq25pfu0kxbroxe439lzy3qo6aqanlrhj8o8968z20fn9r487yojqn40unxux4ledbnfcj2ige7fh2auage4uiu7',
                receiverInterface: '52qee7g0npurmdsxy7xeit5vh3m6ny6t1x93g272d3dxlu6h2q0jewbpvdksdkkdz2rjroq9klgswaytbxx4i0i8rrnn82xt3v3c1zkkdhnija14k4iiu1ukniva3cc2nycrpsa92cbjgsnl4j71q8dwutqrqrt2',
                receiverInterfaceNamespace: 'n3a4kiyl9v8p7z4ulkbzbh747zu3id7i67k51xcqmu88uf7rn5gg62kb6otzfdissg5hz8ztqlahnqa8rw7f0j9njaixjwh2fej6vpk8o8nh19j1u4vttg5bu6j50pmi4xh0gyqnwjka6a17py1b4y9m2gvkmore',
                retries: 3278420027,
                size: 1467469752,
                timesFailed: 6820214290,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'tlpra25f004x0ohubsjtyjmh4rszmnpiifajcwz6ogswvr0cdl',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '98hu9nyiosjzb9wd0j6i',
                scenario: 'c7knm36mk0h9iefwesl6wteicz83yn4a8tyoba1rfg9g46zi5t8s4d3ppybk',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 19:06:24',
                executionMonitoringStartAt: '2020-07-30 16:35:51',
                executionMonitoringEndAt: '2020-07-31 02:40:43',
                flowHash: 'c7vn32zl20xx7gmwmpv0nhfnx01ek5hwmtdro603',
                flowParty: 'jehr3wlodpf73ddo5xxlctdnhvieacwu8a0maesfbfvpuoh60knsfummqpmpew32fws457ov15h50b4oon20yhpom7tl7ezi8vs4xgxwbves80j9uij84t7r6g0e6zwpo8hvmzlvxo4uf5c5nsx3pc3gx2nfzqof',
                flowComponent: '6imu07l5q6y499tbpvxnzr1h8hmnmf3uxuqwfq6untp7l10sbts5q1asye0bt4ddx9tm9c968jtwdpqbp7kd1f533musrd8dfxynzaavwlex4aolijy5awm3fxm5tx0qy1sckes3wx1h9kkm5zbcxn2xztgpygvi',
                flowInterfaceName: 'rrr335kitehx00124lywihfec5n7ufpq9fy6ullxwtpzt9vt2urb2dh4sbjv9ue0lrr8vht3puv36n3bjpfndb7st1ydtsdeymwn7rl3q1p60d05pkm6nqgi2r06yyqgy4micnagsrwlmx3a1f8wero339fpiwe6',
                flowInterfaceNamespace: 'mtltqrq4qk91heksctdp8hf46avwm3ekhks2nr0ao6z9gbw9z79rovmfazcaayezr45xgfpghkuv8wl65apaipm012a3klm70cmzidhu1pk7afbpzqvrpbrmp1i9kq6hr0o05blrk3v9byc0efq41nhonagzxi0z',
                status: 'TO_BE_DELIVERED',
                detail: 'A repellendus velit iusto explicabo et dolorem praesentium ipsum voluptate. Illum pariatur ratione blanditiis fuga enim et. Optio pariatur rerum blanditiis voluptatem animi vitae est. Voluptatem corrupti dolore.',
                example: 'pwwegjr02z2dayltabvve5ol8onevnb2tt73pk6ickzdmhuxf90p0vaxvpinjvsl0d3pzbk8148k69elqnwj722ep1od834lmputlb1kmag6wkq2t3syk0iuaa4obppox0oj15dih1bt452c317yrtly8h07kof0',
                startTimeAt: '2020-07-30 16:22:53',
                direction: 'INBOUND',
                errorCategory: 'wl2mc22dgja18ezyb7x7rq35nmy7qkx53i7jiz8uv2fc340c2cctaob7w47rnp6ibyhp0x5pbp1suw51wn0mw3dzzo5ggcdrh23a9ermwexjfzc3hql0ex38f6d4gs13r1a29iejob0128sw8aumo8hi9kf580x2',
                errorCode: 'zjbqwq0jm1cf10vqn5jh7ysca3sivwu72eqfyorqxffvrjdvtmr',
                errorLabel: 192746,
                node: 9187521185,
                protocol: '8ty26azz64shd2ar125n',
                qualityOfService: 'oj2is1fr8dmkwygt09nz',
                receiverParty: 'augrte6qnob7a7m2nvooukjlg5g5ly6lj2elt9o1ah4g20z8g733w4o54wify7octc8hwetqluxi3zpd5ene77gzt0g1zm6mu9ihtff605rzns6vy4nr4gwh1odc6i8fmgav79colpbwqlvwyad6k6n4cld38czr',
                receiverComponent: 'f5q1tm5h74ir3g3gl7sjp8qwzgv6t982qaze0cg0ck24oyqcak4rz87f2hrmi6khqpver7rf1y5hr8g007bstyypwgxunf27c9ob7v0obs17whvxnz4y0dkq0g5y8bfu9i7913letlmdvt0v50kz67h0nqttof98',
                receiverInterface: 'c54yrg7t70x0vs61l5ehvjy6zcexf0wmsi5cgv1riu4xdp9dgx3pqo5ao26i7s90mahgcvsnheh8seijh59j4375i8uz93fk8il0yzp4lgny0jqn5wa01kkrp2ks9eexfcyxi8eroi3qr88deqj7gdee0go296ph',
                receiverInterfaceNamespace: 'uvgkild28d0b3vlou9ux4ss2a322sgf1vlogju8w207fbnkctt9a1y8ecwvdv4z30d0su9j5qhpxrs6bbmn54rq269azpn6iaqq56luy4tn65g7c6qnfv5z4muv45fe8ql1p3hp8xavpteqdywgrd6asu7sclhhd',
                retries: 1236974190,
                size: 5558682910,
                timesFailed: 3327044598,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'enzymzo184lxubg4fiijgout27qjy1kc45iqe81rvemc0pa4r5',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'n7sy3h0n9jmw5ybsl7wu',
                scenario: '6ltu4gucvorlmut2a60qp45bu2sdovxthtuec1ig8ia758qll7gmm7y55pho',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:19:28',
                executionMonitoringStartAt: '2020-07-30 16:53:52',
                executionMonitoringEndAt: '2020-07-30 23:27:10',
                flowHash: 'gcwrfui2e5n3nkpf7hsdssyngzkv5t95z9i7cjzb',
                flowParty: '86b7ez2enkxxwk90ran5qf5wsdeouegawprg8l8a2mzdc4c7fm6jj5ut1gslfa0i5k1p54tvf40z3gizv3rllqz5h2dqchnilj8nyusxijal6tv2o008rt4hz83xjy3runt3tcw4pvzmh3bdfqweyax2a1jra1s3',
                flowComponent: 'pf7xxxnhz0v7nx93gr2am27plwzepidrwsellwbzs5aw5kj22t33esdgksvul92maqxbw8q1iprsmvx5se5adhv2gw143x7ikrq0d7t9tcafvjnrmhnrm6vlss2fxu509onovyhbe9sbbom05fqdi96mihm8br3r',
                flowInterfaceName: 'uhsdsiu8geq3h5z55fcp1a78sz3jmajnsz67x8wrwpmd18b8gjjypgxhumbr048r9gnlain05104g6snwd86jz53bvgxaach5fdu7kcw1ugyid1g1aycfcr6mmkx8ls9g1fzou7j3vgetsn0pg4lt8yztabfyyui',
                flowInterfaceNamespace: 'md9rlp0v9g8ek3ewpdn9ypxxhigoo97vsl40lrho9h5etf0lpl0htj64wnt4zhbbx54di1qv9l0525zjdlhsk5j62bcpsu4ayl8fydeer5yy9qrpqevns4vhacc1bq07vevdlm8j1oejg48esfu3xr03sng2zq9c',
                status: 'WAITING',
                detail: 'Ut quam et aut ex illum nobis rerum impedit. Voluptatem assumenda molestias minima corrupti modi nisi quod quidem. Nihil odit est. Doloremque alias rerum voluptatem quo ullam numquam saepe praesentium ducimus. Eius sunt laborum qui consequatur non optio.',
                example: '9a17wgtbjczwm2u9fganzkf3tg0lsmt06w6vcpkw1xb768yle3vpyqtmc5pc7pvecjpmnbeb1ztoku2j4b607a7tk8y7p2d0a144gkq5z49fywc81p5a6qt4dqldszt6tk94ze5xdbo7n2i5p9hv2li61xgi38z1',
                startTimeAt: '2020-07-30 22:47:25',
                direction: 'INBOUND',
                errorCategory: '9q7e2punpc0hfauhoh79fof2vytqinsfbopx5z6gmfb76no3f1n5rfml8i957vj21n1jdllmbfmu0sv1r6uqkhs749j6m2qp8ro9egzxlgjodjjbcfgh2clpluvcz3hbole0zx6a2cwaex75yiiog3t0jqdegm3g',
                errorCode: 'biqmbvgmjusvmjic69lf6tu2wg35tnpn6ywjtd0k2jiu71l20b',
                errorLabel: 4324476,
                node: 5110253636,
                protocol: 'otzyov1n8mvk4f91nd8d',
                qualityOfService: '44x7r7du9622ls07ezl5',
                receiverParty: 'rr16ph8meghgyq3tbp1ws6j57ppjt47240ak86gsle987l9fibmi93m2vxs4scv5iut960278trw3otzhvqbdx766va7lsl8434vraotbdth55wxb6ohxwnfndmidljuca5trn9oiw1u0rn7mm6fhupwlt5lr29f',
                receiverComponent: 'r7g9sm9k2lkxmmpg0twf0jfzhp9r0b4py77dxn2fiqfm999759g3mfd6fj7101vqkc3f85ttwrk2vq72fxk87ax1o3oa33l9t1v4bnyuv3c4uzl7id0363py1xsi99mdxx5mfmk10ybtxz1o8jawu9ah47lig6nw',
                receiverInterface: 'zrvq3v4moz0a1k2jofgas5akjquki0uo7sshup7aicewuadrb38vx4934k0iwula7j52jnj50s2cxgxsrflcv388qqowfvalhw87yjf5nambsvyg5ovdqc9g1tymxidep3gajrcwpa22ggovy4uxkfk85b7z96oa',
                receiverInterfaceNamespace: '9oe7amx5q3jigwjwdeb2jdjdhj8cok4q064yxxg64g7ix8ns3ulufm6tmuaxqwebdllxa14clv03iejnwcjna5ajqxhnhg0l9he49ad88v60jct6nbzpn5mma2sfmprbk42ovo2wygqhosz9obs6tzl1lp13o7jf',
                retries: 8320072388,
                size: 7606956851,
                timesFailed: 8772762468,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '6hrchbdj79hoaquwxkhxfhyqz99ry3ufpoztk8ep5bkhlnwpt2',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'wlh2mzl073sustvpq4ao',
                scenario: 'irbm06ear1y46qd3q9x584qlqocngh5x44b06ttn3kigtf6ro6qx0c5di2kx',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:43:05',
                executionMonitoringStartAt: '2020-07-30 16:28:46',
                executionMonitoringEndAt: '2020-07-31 02:40:34',
                flowHash: '6efylg6hmesa19jqz0o958cr4rkf5nxdxl1w519x',
                flowParty: 'nr5ov5oawh7mrxbvhldl6ey9g4s9ssa2c3azc4yanng9tt8badi69jjuqirjem083xhg4k8tr98ym9izwov27bgbjnipdmengrjmjb7u30ur2pmasmvvsc6jwhlnlzwdjqu7wwr8zql1d1hg44r1w4iwa2swrugl',
                flowComponent: 'usv4nbulo4yijjtq3so189h1t3xlfnyztq6byi7mix9qjcj1bk3muzilt3kwrftm5rusvf6p2x9kzp7pootmv9qqvwzcmv7tcm89nnkoyod4w9yjjcvq26gsysgzvtporj5a2adsnvhfv65pnq9vkrgfbmy00pve',
                flowInterfaceName: 'hyk5bxbdnwtvo28jqsg8cq0yhhgf4so2hsczv9vj7rcw8ikdzj71ayxagcza9qk54iebgs0vrvyzrfxrmpss0qr94tkr7xkfsdjx2ibc21ybfwrtxpx52d0hg3wimtd035vyahb19fc5rdzschesv94t8kq0h1i7',
                flowInterfaceNamespace: 'vbtkgfeaas0dlthxsa372q6cekkbwwdda2svssh9dnxz5lrttsrdgob9g41yefpdrj3h94iqmjl5o5m6no7gir21owm6jp1o3xagxo0xp8np0pfuq0jswylfuxqt69tx4lom9wh4b636o0ahtged21drot9mjihk',
                status: 'ERROR',
                detail: 'Nihil corrupti repellendus porro fuga aut. Aut numquam veritatis a dolor incidunt illo sequi. Et dolores est qui iusto aut deserunt consectetur. Et omnis porro sapiente sapiente qui nihil quae qui. Corrupti voluptatibus dolor et suscipit.',
                example: 'p51fzdggn94tfksvojwohuo2as093fpq91k2ritqgh16hzyanyidk2t6uwxmyou71knm2nv10fazfwt9twjqgskcgkx6qm9ab65z71u6oyt2duezqh05xkptjcq2a7942u9gcizmupwnb3cy02pqr9om1hjt8pej',
                startTimeAt: '2020-07-30 22:27:36',
                direction: 'INBOUND',
                errorCategory: 'fh1zqn334l0zt2cqyovmvzmwhzcykrvlyfcyc7gt34vjbr49jqgvclmgud3x8q409u4bm78falq6o98fl483wr7098uvt0b3ezzjtou5iy6mngzh7ojew5amjvb5ymcjevebgwb0pzodndqj3kwojpiss27j3d3y',
                errorCode: 'ylllc94jbbpemkt76on7li1cqjjwhwkwe8akdvk0rmpdvffeg0',
                errorLabel: 883186,
                node: 50868834142,
                protocol: '5019dikkn14smvv1bj0i',
                qualityOfService: 'gziqjhph3vvle6yj8z7y',
                receiverParty: '4g2h7o7avoeqsypieit8v6jiz9hvh48hr8rck046iwfj02g7sdmjd3h9djrbocvzxnn7l54umvphm478qoaft25busa58breym9gbjdglmanec8rybpz0fotmwk6byt84rgg917gw5u6q6s6uf2yf0rwv1blzhs8',
                receiverComponent: 'ox71djpr8jt0d988dk40dvi4ufxr0bdlwg6tltj1ak6pltiqzr6ajsvdr8jn0jf82j95a1oppdg7wepnc5l19psqis3mvopol8lwogl4df6uq6j8t1irxqzn8uyyll02w4462gibbyb1ad0j02w43kml25xoa1e5',
                receiverInterface: '0ll39dwlvesrj4ctvw7xd049n8l5vu1d9grgkrrmohe08h0p5vvamevc99qxqm2k2mwgghruey3iyo8ymdtpvq42zm7a3ylip3wl2s5o5ijd2ikl26g2rwq8tzaqou30d63gz85ci93k5uy16fbs3pq7ov1xyekw',
                receiverInterfaceNamespace: 'e1z8srpplygz5bx0nja16ql853sm3bmzdtelad6e5ws3fu9sknl1x1i55w96riyfnh5g2veu4tss4cl3kaqvjwnalgyx30pt7f0iebvwuemeklktp1ai21vdlwcee1aevuq72ynlkoflqs59m5t5alzbjxse14tu',
                retries: 5015853598,
                size: 6651073916,
                timesFailed: 7024151835,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '2k26oy2xehk7opvwyydvsz61f17k9bdw6a3gm7ine0lwvd1e92',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'bgvd8jt6x2kett1h1utz',
                scenario: '46flu3gdfe087dcytijk0ij5p677ptdps8c3oci76seltv1l4jgsvkltfxrc',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:11:53',
                executionMonitoringStartAt: '2020-07-30 19:12:20',
                executionMonitoringEndAt: '2020-07-31 06:40:16',
                flowHash: 'ghdbdbgtibqn5cm8vz1j3lq5irlsn7c9uixnlhuy',
                flowParty: 'bi1l5ooj1vvaytysphzukb75f8wk56mu82qd1xniwevph2rtbzktmxdwkjdu3z5h9q9h9e1j3xc7ro4u0td8r16e1cprkgkxaakzdudyss70yy6w9wt8ij938iqzfpumb2yv33do32nx9h7yagfqmh8i3dxvny3b',
                flowComponent: 'mstzx7zwpprwh6bly9mpwg2ymfhjjmdmoncyhgyxbci5yj6bum8z8685pdfe4mk7x5o38iq4frd71a6g3mjudduz3xshyyb9nxf6dgmlo8gcd9lqkjmfmbbkzikrhwl6bw317pstj3siwswipqy7dten6fb5fylm',
                flowInterfaceName: 'hnkts5ckn05wcyv5l13qs6x9smzuw9qkxxwzrmdj283kk4yys9iggb3mm4z3xmphzyrclcqqgajj3u8pruu0nt6g4t6rzbgld4d2uatvw67hf53tifjg1akqx6rdkh3vn9iubt4504zc6lia6f4j3rkntiyjguhg',
                flowInterfaceNamespace: 'wnnevlby2xwlzuqgkjcz5y0ua2c70ysclz3amelm5j02odzxap04jcxvdaglnozyn84kquma3pgnsgk4efcjye1ifn70d8aj25odp6p4vhf2sx0p83d1rcj7973y2wdtn07udbmobax0k4ls13xlqlvmqv033m5c',
                status: 'HOLDING',
                detail: 'Placeat doloribus ut vero consequuntur minus praesentium molestias sit. Non et est quaerat ducimus. Ducimus sed molestiae et iure suscipit qui. Aliquid culpa cupiditate. Expedita dolore qui soluta cupiditate delectus. Perferendis quia eos quasi eum quo blanditiis placeat.',
                example: 'vd19pmfoh0wq8j50i30dtoxf2w7pyitm0n8ckdlsjx9x5p5t772y27nldxjz6nkhttvgqudc2kr2a9luevc5htwp8n0rdwr1otomebatvnibicm0bpndx7irdv3i4ff4zwsswdydqeqmuonn1lj0cz22oqon68d3',
                startTimeAt: '2020-07-30 14:54:25',
                direction: 'OUTBOUND',
                errorCategory: 'oglob38dbo7jp9dhn814h2zbifwsn6oklprahnp75dr8nuwk70zolqhvbgc9wrsqhb4g8x33419dhdsb6d4b5qskqgrjkzmr71yr4lji72zwgy6bixb3j7ujw462y0zjcg4xs0jf46ky1vwmp4d140lrw39uqau7',
                errorCode: '0qkx5dljgm26ayhcrenmepehdkldhb0kndpjdvi7lxlhae4nj4',
                errorLabel: 895575,
                node: 3039736135,
                protocol: '8hnvwn7o7z7sv3myiespa',
                qualityOfService: '7lklysun491usz1kubdt',
                receiverParty: 'bkmn6s6se4iz8vjd5ehjgbme7ucvh1fkptyrncqxzbug2ccnu05bak3lup72vjkkir873y1wiy10ozmxub773kujzry5nac3cvnqrdeb4kbu7w3vmrpjb1ybg1se0hk9d6ruq3n1wea3w2pcqeejx71wwpuzhqjk',
                receiverComponent: '79q13173mc3ayql7lssnxqe6s8litrs1e1me0cv0wl7mhek4somxx7p6qt99og3176ywf8avyty1u157x1awkajcsj2m4d28zn2zw9iretg5wuk4syh2k7p9n52dzyoeej1dpv81wx79r02mbcy33587jkugdvhf',
                receiverInterface: 'h8chhj9sga1mnukua2mhzpncn48l139o540wcof2i7qwtvof49t2pnvxytvnfe4wvv4920zzwd52749dy2wbnl3ysi1iw6udr2nenckif4y1k8owrfcacful8caxalm9bedf0h82mgtz77awsz3wgxusber2geio',
                receiverInterfaceNamespace: 'gv3p811bvarniuyehitb03zlsxz5ofg33gup5ajk81zdkhirudp58u6yzsd4j1verjhnza6tnt7s3ne4j4ryhlf322su3hd9ksu4sj1cd75q5xk9a8yjvx214ry6s5h0bdwbq9hoiwmxreehuo0mmsjp43gisarn',
                retries: 7700497581,
                size: 4670926968,
                timesFailed: 6327614104,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'hubrz7j5000h6o0j1x0vby1ykqdhvrvgwbcc0zaz1wmbvcfgv0',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'n95bqyod6ok98zagyt6i',
                scenario: 'dv75vf0l88oi89nca7amrr4yz9wb5f9b222yv1nucjlozthlridd1txygv0o',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:53:35',
                executionMonitoringStartAt: '2020-07-30 17:40:15',
                executionMonitoringEndAt: '2020-07-31 02:39:52',
                flowHash: '2ghkjwznoo50i1n1rt3luryloyq9j9dutartvs7r',
                flowParty: 'lqa9sy3emz3tnlu7lfb5vq98bi2xcok1ku0pot49vvcipqzleu119wxnexh4qfl9ovigu3au70ugdpne9t4cj4kt4na6w8qoh55k0a2ak5f85vuj10c1f6080inin7swklarj6j22pylcqqccmxkmiijs2k2jlax',
                flowComponent: 'w6wcydrmnlm9adwfwm6fmg17rzl911cmcx7245vxc795nx6cq6oq1z6sp4qphjmj3exhsn7kvlvhcgr1gmj5p3il091n6ihc349csoz8lmlybe1jcz18hhceeg19slod3ow7t1ypxr25m3c5a16tgu9640flwwsc',
                flowInterfaceName: 'qb0gfkqpe9amyvzivpk2lwir9qgc7ng7cko6yegwbmp786z0zbns0ump4wz461ym2fwd30qjafg6ncdjisa2jc5qwkssysalb7yh132ej3pgndf2vxw1nutudp4t3va61xp2gzpg18gcudc7m56gsss3vtol8fgf',
                flowInterfaceNamespace: '0fcpech1ugd6ukl4ljoulngsp83bdxggjtx7ggmni3tu2056ugylshzeb1qyyjplxl75t2nonsunvt6e78eq3j266sjfdaf76nwelkuxp39s4jtzqlt9efq1ikkhmo1arcw4lyyn3h3llsnplvuuhojt0d3hpmx0',
                status: 'HOLDING',
                detail: 'Nisi eum doloremque ut illo et ut nam. Molestias corrupti placeat sed saepe autem dolores labore qui. Velit exercitationem aut.',
                example: '0pzfrs2k9fm787yice8onlsq4cro9a9cskc9uzp2zw5kj2vqihbv914gmaw8fbz1xghdsb6dzoyutwzm1tqkjppff446kx6ckq1ngs1nul0eejqb4f38cdook9jculd5lbpvkqkfy23gu6a4mjr1spbehrn5l123',
                startTimeAt: '2020-07-31 01:01:03',
                direction: 'INBOUND',
                errorCategory: 'neddnie9ull15m1u9w3f3ngqcavifcffx8hbfd7vn9vmlk8x7e76qd524q217hvabn8x6gaajso7nt73vcy1i6uq16eh61snyxq6wlrmk7d3h8xzodfi263g4e3n71d4lc8y1z50btpz8ey2gd887v2gkh862zju',
                errorCode: 'ns18zny7bb7u9mo0buhwv97l29zcx6qduawmc6j9p9ohpm94z4',
                errorLabel: 948381,
                node: 9609549438,
                protocol: '6ptnx9bd2mznng7tri7r',
                qualityOfService: 'i7d54yv5tktnmhxtgo2m8',
                receiverParty: '2gwlyccxmovsz87iv63pfyjgj2kcw4ozn1q4m3vv80zyh6d7fc0b87k1b017ypyhuoml8w4aq411rqmr1g1sin5jk0vwjwze3d819lpxogcb00llq67i5vag92fxw4xea899oiwzzn17y1fek3t5q7j1jyr5knbw',
                receiverComponent: 'fqmoa5yrwfp1juoiiplrq27sroawfgw5696xyeohlmgzwmj0f9g532bb21hs7uufg9z4jrkwkk3lmtqam3d32z5nll17q06ixfo7do9sksb75yw7qwumb6wujfw2c5mfntg1ftxddkauexdd47bcfc42zc85nufn',
                receiverInterface: '1f0kvhc4v4y94jdoct4wzm0r0yvj0yutrvkfssa4udrefblsngmx9fw04ofsovb0lpislmylw7hf88gj049i75xlsd8c9l2mfbaxfz1bfqhynjsrhnzkdeu6zeer2izg7nzo22aodagjmvw66g23pbtwivx875op',
                receiverInterfaceNamespace: 'q4krxu3xvye3zj59743d7zverrid5ungi46dta2f6ve718x39irfqdtlv8muvre3162tbq1q1np7fe5weejrvwp99vu9xuvcxjin4lpuhy7sxncerqjnzncn6aw2b2r72erxfmdzucsli9cwbaw9f66sl4gsznc5',
                retries: 7195929334,
                size: 6671540507,
                timesFailed: 1252565477,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'eiku83veesdbr515qeeguxtkpczxuyt0mq0hniro44e5cgrji4',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '28wp99p24kkei2yv9tby',
                scenario: 'acddoz9chk9alk3id5bt9md66beubyw5hl6wiji2rv7epdcgj9gnt3ftuwz6',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:33:06',
                executionMonitoringStartAt: '2020-07-31 01:10:20',
                executionMonitoringEndAt: '2020-07-30 16:10:22',
                flowHash: 'bmxoiuh9bg8m82oogbdmzn01fhqhxp0tsugd7zjw',
                flowParty: '2ydtroa3lwtkq3sp9iji5tau1v7bhdlnx3ta4txx5i0qtafz8d4l6c8ov1dgs3yryy65ydnuot8npl4wd89glq0h7tul6aqa5oa482xx4f8ni9n22ad2tpfabwb29dottac34f2ij986fn4mzw5ljh9t180xlgl9',
                flowComponent: 't8e4zrh714jdild4wi1df471a7pddq7zvfszc30f3zpw3h85tkhixv83atgo2cc7qbczxpvvbjrgs9pqbqoa3jha42xzwaj8pk24pncmkhl7jppwxzsdex0jkl9k8y87ovacb6sxnrinw6ujx08ghe0q2hewxjcf',
                flowInterfaceName: 'ii8hg377wn3kq4r4vyd35hj0ej6p6zsqdtok6752gbhd8zg9xlpujmkqoiqnuv1i6kt7cu8lwy1ua0guclic2lzek18rx02705sq82w5uucdm9wlvdj14bmb84y3fachvzsne3spoo2twf88r0f3cd08hdwiioef',
                flowInterfaceNamespace: 'l308le1xbhwye5r0gxf5tsutrx0s463o823ckjaai21oz16691nl7549mql1q7mqato72sn1z14wd9l8ampbgdu67z0yl11uewnz6bqtygnbvhzpozsskw2gs2hsd6jshfgqseuimf8jdooem8d3eci07upg30gk',
                status: 'TO_BE_DELIVERED',
                detail: 'Sequi cupiditate qui aliquid culpa corporis omnis numquam laudantium omnis. Nam necessitatibus numquam dolorem officia omnis. Consequatur sed fugiat. Quis voluptatum et laborum fugiat. Natus iure quis quo saepe natus libero. Itaque at quia quidem quisquam saepe dolores sit.',
                example: 'rxtjk94n3dmwdoxvqmyhzt2f9jhxqkd17yffg5w992rx1pdqnlcsb9ixw5h56xjo846of7zjg5rlv03izeqd8r9zm19hyh5b9qmagkgddg6u2yhy0zdvo5k9i48z6q8zr9rt7el1svy6ublu2yc5bl1xw42flrdl',
                startTimeAt: '2020-07-31 09:21:49',
                direction: 'OUTBOUND',
                errorCategory: 'sv4fi352hp9dqyz7rj5p8o31pqbkmeiarz4i5409xzirgoeyzu4fejf8z0wcjp25ntx54irjbnkhlr9dodad0j941cmcjxjb236qycmdnyme19tgmz6zz45xb5tbjinchw0h6v1tau8jvvhj9enbel7snovhthre',
                errorCode: 'w7livzx2ezy58x16ykei9c9bs1uekfjgpp0vwwvnanm5avm75m',
                errorLabel: 994057,
                node: 6584037492,
                protocol: '108ceya3q6be82g9l6vi',
                qualityOfService: '4hcor4zwigtnswwfyi8u',
                receiverParty: 'ldpxews5v19f9th7x6v8p55trxilpth22n7zev4rkolp6t5vvw8fbszgocwmi3744fcjhs0hsk1fj2vdcg3odjtoro0rcqu0zaxjowcnf7nea953le2nzjxpym3tu8lpelhi4vpuhmi81x3smhqyijfgvap5l58tq',
                receiverComponent: 'wa0ia8j0s7li202t310pj7mnd15ty6kk3as3jcn2x1zvdqpt2qlm4zseae12cas5exyys2psrfst0pen48wx8ym9c70keiyvqbe3smpfrgnc2kvnbprbvyl9ei452x6n8lnj2hirjiw2a7eimn2dasdpp1pjkp06',
                receiverInterface: '7aq0jpbo6q3wri9536iprafdyh3bttsvzq7y1nyc6xopanioyz5hpqy59hwpy2i3z84pzzhnt7mr7xgrdqyl8ofr3hqmuwiciy0pa947zx4ow029jloenzg2tp3lvml5eputqi89l98f186lk5w5bzb9rrlzywch',
                receiverInterfaceNamespace: 'm1n7atuhjnsfz9ps3a7zy6obcytp7p1gagszoywrf8len0azgpgta2kygzngg8gf503v4xcca07brb6hxzyd9ffy7vvylu3slt6qihju50r31oenxgih7uqf85rxulzc2cweyh26acsrktq7mgib7qewfyd5j9ng',
                retries: 6216387940,
                size: 5448676954,
                timesFailed: 2908259601,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'mvu9lhlnktq9q4gy06flb25mxd4jetid5b6oohxgsybxi40pqs',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '2n2h8nbwhmfuboet3i7m',
                scenario: '7slzzm6ghn2su7fa38sxc9lagpi13mlcdq703jzw8n7veg5y0kav9gceen69',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 18:20:15',
                executionMonitoringStartAt: '2020-07-31 05:12:41',
                executionMonitoringEndAt: '2020-07-31 01:17:18',
                flowHash: 'tfex4q4w7z6pzy9ub0u5iejpt404ajdvq7bzf3ys',
                flowParty: 'myq84r10ag4s0pgrjy4kqcmx3n7amysvsrqlhch7ap87g2bdc0thtv9h92u5h21vxhb1dcbdr22hmojici5d2xswa6dvrmtztltqgke76b72oiffb7u8uj3482x20pt4bsskqvcbtihqkeoba0jwo0jfcef6g1xa',
                flowComponent: 'yr4j8fmweik15iucjnhl4o9q4ykhrs74whzj0c0m1lzzvgprflhvhku94lb5eecqowgzdqw3vrcfwuayj5p9lk5khqwefu3285mo5ou1dl8hxddia2ugyclzmkfyjsx6qrw0vlh7r8g45pixczolvr5ym772dqus',
                flowInterfaceName: 'bc7quvd1i2v8lgatmt7ihw1efmsxtr5rxpmhe4t6nf55izl3mk7zjeqcoxd700h2cl11qy8153bfpyxg4uhlplvpc05i297jkig6inxr0x5qe9blnkglpoevlu3eiloqsnjqv9gvamurm16jbdym4pncr6fws1n5',
                flowInterfaceNamespace: 'p8rxbza808xbduwhnuo2saa8fcrij5rxjdv5a1zs3tw80ez9e4hq87peoez88wqextyv2m2yubtp4qfohyucsx8l02jdv5g0syov4vdvkj9lv7islb8gf6jhxt4kg7y0fyzxyy6rfliykm15jmow2qe4a9xdbrg1',
                status: 'DELIVERING',
                detail: 'Quia vitae facere. Ut sit cum sed. Ipsum quam ea qui est et odio repellendus excepturi omnis. Et qui sit.',
                example: 'jizaccwg7g58tvrcrfn5rwhvg8iwtjkpp1urcmafp6ar7rnlo5vlpcm1w9hdhaabqmp369yv4crcy3m94frqg7ip0rwlr8nkargluhz00t32jedmr6kuudmth3tw8cnq7mxv2e04g8xurmj36rcqqp4o7wtbp7md',
                startTimeAt: '2020-07-30 16:24:44',
                direction: 'INBOUND',
                errorCategory: '7dc4eab41n1s9kof679bwhnil36sp9lgids2skk790kvfdpq26yrwy8s8oybie6yydwpahrvp6hzv155628nvt7qslvqr0f9ok5j4rg7lqo6cbenjln9km3qkcela3p01mv6cvn0d793m76t0m7154oe6594rkub',
                errorCode: 'kqbj20llqxvgu8qmorf5loapuxi1weynz849p9xsmk3xkcdnn5',
                errorLabel: 831562,
                node: 5809737569,
                protocol: 'q3xn2qckt5yhtsrn3lb2',
                qualityOfService: '3hq2dfbkv1x7paml8zhc',
                receiverParty: '1pf3i11za7chkpbtswpylk3zkf4bn17q2oyp6g3yegp7t4kf9b89r11xuad8l2g1huusqxpkaejhsgfs9vae3ubn8i5rf8iccj058w8pd6nneju32bgtyo937c2qotig5pp43pqgs9kk3b843gi6ut61vo7r7wpu',
                receiverComponent: 'tb1afgtml0ofqgtbrfseczmrwtj1mckfg1d4xwappyre1gae1sswcyazkyl7gr1wybgbylhir4yrn1n5id2vbghicb1pxmray6o1gsfylxmogm4qz2xt031pws8w6t3f11alwbzi49e1jqm3npkfjfjomwhjyy1uz',
                receiverInterface: 'yok0chg4aer4lmm44un452crqn5jx6q523vx2mfx0zipvv2dwcgh7k4l5wqyh3gdznwuq1haphlt4du0pwc6lpjcpcb5196pa0fm6am50watrmhv80kvbadtiiafszm97llqf74yngigaydjqqy7iolv2g8s3ot1',
                receiverInterfaceNamespace: 'agsk9wmke3gqq2rfv3z4eitmn0im6vvbpn9dmk50dst73cusc3i2dtahzstugret9cdrn8elpjnn2dtdzgkjgdm9u62eh9h3ipcmfxm83o5c3zan5khjqrieeeaar1cvv2zgu6h33u6068k9z6fmpf5xjiu3cp0i',
                retries: 2702606640,
                size: 2464327943,
                timesFailed: 9816511032,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'fg777u5qft4drsfys8e6g7g52o1p1lvx26c0jgw4z5e0hhg3hw',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'f4in459am4jg46bw9ozv',
                scenario: 'gikoctotb4e8reedl5rp0vwu9ucxmhtd66acob5qq9qs6ncjnjnclgrclhfb',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:14:16',
                executionMonitoringStartAt: '2020-07-30 22:06:25',
                executionMonitoringEndAt: '2020-07-30 15:26:04',
                flowHash: 'n5dkga9ztycshm96e7s4lvrdtzojkjdiue38z2bw',
                flowParty: 'w94v5rl24ktoz9w92t6e0thtjmmh8pg03w6vk6uedgvy99giz3aqmpi9cg34yseye4pz2dhcxfnpijpy21vl9arqs616pdcd5awppqof2aq54t2ph9fmg82jl1kdup6jst6jt3e69p7dd1l01tj9si4jy2gypiav',
                flowComponent: '6zf1tdzkk294dn5zen3qv7xosagx33wne9rom5ejynkddlr0lw9n8hmgbwue4ktmptq9j790ea75hwjv48xiwn2ra67p3p7lxa6tubohxiiuyvzan81d7kc492inonndgf6e6o5dtl589be1topq9vt67ez8voa3',
                flowInterfaceName: 'i75np6ynysn4f7rv66lfvkk6kqy8hchg9uvkw43rx2jn4486mnaoi8a8lze5ndviegski1tij0qxqs42e59djg6u2sxoer03iu9eq3tcphgtdjbmnb41vuf6ysxgpgxnw999uaznssfyzzdoc4q934sth4kphr1x',
                flowInterfaceNamespace: 'mr0g8bjp3ierk6wtitend6vr19japr8n4ot2ljvr0f1cqk406px10p77d4w0r7wbyfcpk3dpfes9obwd6x72ttohmbchyix1ojh1bymq86zyfmnw2vcpji38inu4va6inas6zcofyrxp19p7jfk939h4nplznyu4',
                status: 'WAITING',
                detail: 'Eius sint repudiandae ad officia deserunt velit cupiditate. Quidem adipisci odio rem incidunt optio nihil. Autem officiis sint distinctio molestias eius reprehenderit et sit ut.',
                example: 'w5n49q8pq0pdq0c3c7xycfjo0erhhqfkn75b1bxqa57ivm81h8ese50avyspfja5nxk4xh8ubohn1w9bh9ubjgrs8ty8xnqqyo5lefeh13u6ijqftj46owzoaydpzwbytskbxzgp5lbkl81ivuuiv3pjuf3j7wvx',
                startTimeAt: '2020-07-31 13:35:07',
                direction: 'INBOUND',
                errorCategory: 'l6ebsqks32g3x5zeqq3gfydlt1r09ykeejce3apfcnvf9pf70fevi92etzjwzij1pjif6atkzzk0q1kttddhs5guui72ql5uayjhw46jerar8tm0z6ep5xe7knc5whu1d5lzgoiwfgr03h7b727u0zee732ceidn',
                errorCode: 'et9x4a6xhdhnj0uqc39hy1tsijbiuxplwwe1whdbstfe1uk42u',
                errorLabel: 333502,
                node: 6368419537,
                protocol: '1a68uhrd4h0rqnphcs2c',
                qualityOfService: 'nrkwyjbi50lp82ay1hdt',
                receiverParty: 'zy8x6lv3ctafld4v8uct0qrhlhaq92v48zi0yqltfs8dawp7vmyx38yw812j9qe7d38vlb7qzexpxb0nwjhwdmnrrs4r1aymoqt0c4aiqgqciwyfn3mpiicnglevrarwx24vyy6itw065hv98iqrnrgrg35c0e8y',
                receiverComponent: 'a6lmkrtr9tg3qiy4n77dq8emam7v0m7e72nhl2pk77se7a5x9vivsj6ixrq1ue7lz05lqk84gpi6euwl8al21cccqpegsz0qjkd1yis9zshc1qmxhcyomolpxkk6bbtwbr9r6yw7ie77bvkgvqzk5xtjk59s3lz1',
                receiverInterface: 'ag76unzojo8t4vzrrsv7sqt3mist4h1uexedxt0563zu9pogdnn8a9bza4tkgqzmvbk9avxxlkxegih0he4njamtomhw0pf4p5qj8gte2mdm6eftimg54bcj89oer92ho34pkneu4sdpgt8m95id1gbzx3baergen',
                receiverInterfaceNamespace: 'k2fpg7k4nhx0lkmpcpo4wu4q1tigj69cgno6s4he6o25ox0wc1vh6mlepptyt0xzg1wziuhc6204szsj4obs3r8ck2q0jq0e55uxcqz87ute370wg3vdpy9yq0vytes49ya84k7w8csyqvoql2z1c2bgtl7c2vlm',
                retries: 4004602557,
                size: 9331748147,
                timesFailed: 5875011658,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'grny0nbsgenire6trjhsmhd0xkbp02eq50supffueprrlwfccs',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '0h4ppuzd06bjouwiwfqh',
                scenario: 'simff2mbim7lcttpsnzi7iyibdvi2715uklp61y444ijqyac07tfixr1nx7p',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:30:08',
                executionMonitoringStartAt: '2020-07-31 02:29:14',
                executionMonitoringEndAt: '2020-07-30 16:24:41',
                flowHash: 'zzsv7kdswo12vujuk0xiqkcpauoamto13721kt2r',
                flowParty: 'p08v8c22zpzoi19y7ro1wjtiy7lk22kgt9zzgaz7ds2u5pkumru5qsi410am587513nbgh9kx9ni4054liglrn8jnq8ot6ge452c7tjoqclw9jpcgzxka0rcz5gip8kr8h5yipz7kuiuleq73f714xfb88slpf2d',
                flowComponent: '6eli82q0drfb4wk2v78m07q9s99wj8lnzes249t7cuepwzobfaj9kzchbncucmfu6ftn3b8pe1nzotxop4xup6w14cusdecs163emihpbj6mv06mtq6q65pn8f1le8wdwf0jg419cq7s2594oqexxk0da16uirdn',
                flowInterfaceName: 'qok39tt602v6rfh46l2tniw63lj0ukkfcdhxunqh56fxpzpb72n0lehphf36onr8weei18avyxa3nyvt7fgo4cjss2mx67fg5tqfphxeqppm7dmz88lh42u2zv0tgs5f8qg11lc90sudpo7nsio4lgx4jl14avp8',
                flowInterfaceNamespace: 'hu2rsgsoidyn6130mjb2fv2hfxfd49x7qborbwfji0wfucpflxubwqa3hs8w6zftwcmj9xbgopz93epquwgvfs6p9hxuboruuy41gsq26ubnml8h4s3eylpveijhv9ka7z0ub0mdyl1b07lhiwe4fn871laym9zg',
                status: 'HOLDING',
                detail: 'Et animi nam voluptate aut nesciunt qui odio. Atque eveniet quia. Et eveniet doloremque dicta consequuntur sint. Est occaecati vero maiores. Ut aliquid porro eius est expedita itaque deserunt ut. Laudantium corrupti dolores.',
                example: 'f2iaisjzimeqlyar3z8rxvcp6vk5ehp6wi4ncibdncg5p2gyaq5gye3rchw9qregsvpbez0dar84yscg0hjfirf7p2k09rlzurlxw89gyogijep9tpygwnhk4rth20nvfwytbld6721tawo8qbevkrhd4mjjwql2',
                startTimeAt: '2020-07-31 07:42:01',
                direction: 'OUTBOUND',
                errorCategory: 'rrru7sl8k8n7hbk2050jgfnaoh2dkj5fcufs0t4l6hdgkg3smjnnu7u6m8amqkoh378uh5ffg49c47cn35sh0nf3nglbz7i8ta1ldxwfk00o4v2yfntvttcdivdltn21oxmcjz5ek9721b9krbxhj7q28kri2yma',
                errorCode: '8me1hj6lojmim0vyz1xzfp6iflzgpelqyei6tr0a6eagvb0p4t',
                errorLabel: 398056,
                node: 8080768949,
                protocol: '5kkviqlh02t4vavwkscf',
                qualityOfService: 'gcifv2u5hk4n4ekwoyng',
                receiverParty: 'd0j5zhsbcumel5fzuwk5u1av5q9jg481tc7s5aqi3i6skgb9xp83w9uqum7mtltyxte9os9xjmxuwvx20j1sd551eebm1lwppgag9el0sn81vsv4zci0cyt2ewmxbzbtqeg5y4kofoyxdw9k7ktrr7wd0svo2kj1',
                receiverComponent: '62ouzj6i17z2lvz99gm49bo9n7ugaa6878o29qqj1ndg8ynlofg81qs17oxzmzihehaw9maj5izfrer3s3mjzgqcb86y86ubgkgax5hzhjnwthe3m2kovq337dm3kype725g2yx23uwqp5r9t0twxzhojfgl29kg',
                receiverInterface: '9dl2vn77r6e6dfrudj1cdocusdxkkecb7ba45jav86yig2sjatn3759szgnq0xedtmyk99a1s38d9cy6g32zk9sj788r69demznhoag84czd6k0y6c3k4vofpij67uo1n45i2y5dul7an0eltcrppmbmf9zswja1',
                receiverInterfaceNamespace: 'nn6jfmoii774w27u231wkppjjzznolm8o55k5fscro5sklmlnwbfnr2haq0nmx32radftrge54xkhoi8jagz0s1ews497aui3k1sdwk5a20sxs3vjejydmavhpi5234h75al0rdox88gfj3zhgdgtvjnvqcyx5kjr',
                retries: 3312053292,
                size: 5951314944,
                timesFailed: 4379898439,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'gr060dd66e981hbje2mrpl7gftwndqrlf67bsiyy2u04omeazt',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '6jwnf6z6p2i245gg5hfm',
                scenario: 'tl9klnstmjououzk0pcma1cyefyta3gt2d2dz1ls2m3mhr9znhlcrk9as9ug',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 03:19:20',
                executionMonitoringStartAt: '2020-07-31 00:18:24',
                executionMonitoringEndAt: '2020-07-30 14:57:30',
                flowHash: 'jjvtrqxthpyiombh1nc31rgymr1z5jqh35jw0zkp',
                flowParty: 'vybf7uur4a8b4gaa6sklxbdkln266w5m9qd7nmfa2gsvfw3cd1nh3keqgg7xqh3vnc79ev5mgkql9tvkg7rwllbubgrtbbuk1y6qyaguk3v55jl5n89c1ozvlftc642vuhp2qkon804abic5pg0ogks037h3ppua',
                flowComponent: 'vclfc5aupke9ualw6pk9wmcu1w8p5j88himi2u1y9v5dctv6454eekn4oynspa3g9x610tyjix26jwx37f5tyhtl9c0qgeoaowiau0q9ymx3a8sr0bvhnffu6e2gc6751uihy4bjg35dqmleq3r0s4kf753rpfyj',
                flowInterfaceName: 'c8b6y58oxfdq8tcnmpev1wo5go99rq5nmi493izppf8m7dndjnx7amunkljx00hyigztyjg3ixxdmioxyp51ougqaghdvkpk3215p58m8sei3gbbwhzxvdku2i4lu7xl5fibn4j2gy9i9pnlkdzcfb10avtf16y4',
                flowInterfaceNamespace: 'sr3j7pdyhrc7mucqg26lippszsweqo4ykyde5mtsm4fszsi5xqk9136doeqnfi4nm3m213hprq2gj38uf33swo3sat0ci407xwrcce439kkeljwwfkgpxrrzmesoimdnl7ncup4ogy4k1gmjo95uz50oc23rjz2n',
                status: 'ERROR',
                detail: 'Ut cumque est quaerat velit iste laudantium. Odit expedita ipsum minus qui vero cumque omnis et. Voluptatem sint repudiandae dolores commodi non suscipit optio aut. Saepe est molestiae. Reprehenderit sint saepe.',
                example: 'nxnf0bycwaxasx3xehs5g22v0yfqnnbk7apq2fn2zdtfkg9yiip26piv3vqvhbx6m6vcx9xt6tf8j9bw5ppgopkhsxo4t86yier8t74osoetwdnubv7sj5dyxx09grd5ohh8d3qiwgpblddzkg2q4uu3p7kmi1fc',
                startTimeAt: '2020-07-30 23:29:40',
                direction: 'OUTBOUND',
                errorCategory: '9poxt7t60pw50puj45ho6kt60jrnpt1qqcmroiyatfire31m66dx9dragno7h18sxgez92ayhvjs3a6j8hk6kxwwotecwxim0qal0a2e7eqn0mv2slig5eulx1ogzws734mmt1gxryruhdra8v2kytxw3xww2595',
                errorCode: 'xh5aiovznj41kva48k819y1zkdwkse5eal23vnespm3cl7cgch',
                errorLabel: 983787,
                node: 7339385553,
                protocol: 'blae3dm2wmjoy56kbkdy',
                qualityOfService: 'gdqjgibxfmz2fab7putg',
                receiverParty: '0hw77lzxzvqmnhcmyqe8ml6ai80xet2qhw39o9z8ru81q2boumu2vyp6r8d9lz20sqht29riostzi3fapobc3qkc87gjsdccybl0jpxyz0fne5kck8bmsukrju331mzmymdfe7dnu8rnrwyterzt3lwgdcrayory',
                receiverComponent: '8pp9fdrs3oyyfutyrbx09sxpqkimgkgvckhx6nms6ftogm16ivy7b8kqijwylettmlhqari9sgy8vxana87h8cygxwqnor1sn3q73foo23h6dxqrgmlvquffqhp1psbbcea2dav28714yjywn3vqti91opa8ninl',
                receiverInterface: '1233eoisib5rdt17br8bwrc0nlnck1432133wsuzrv6tio1zdvxm5vka6wp9enqfyuvziky2hkajvp77hhhxwqsw7h41xjastkjfgivm811oho3int1n99toncegjsn0idiz7x1267z5tvx4378zl18lxcd5qvds',
                receiverInterfaceNamespace: 'id4pta4mgzzcbxqeq7lz818b4siwoqmy8mvxvbhxucs0ocsujxr7bw96j9xhmeleqh84mv0v9q7gh0eaufqpqato33qnw2f25qhj4ts2706lfqys2bqd8eutfymx71y63qgbspa0kstefi7hq57nevlsta97x7ch',
                retries: 17745086117,
                size: 7625400788,
                timesFailed: 8389768508,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'n9zaq15lrewdy3bg0mfo8n9luiu3n9dpg0iqa39biud8qhv0dm',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'gnnhjgykvc6xxskkx383',
                scenario: 'c73f0bl7vqhqvvc3j94h58cybeoxdeu64ftg0z7h9cn4a54uaajgb556i0al',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 11:39:58',
                executionMonitoringStartAt: '2020-07-31 00:39:08',
                executionMonitoringEndAt: '2020-07-31 07:02:28',
                flowHash: '943m3n3i988icfntsz43gm39w60p9sfot7yow3g3',
                flowParty: 'u1ler6poyrgplqkxhcczz6f9gwj2iogml0iz0nv242b0su296tt5h69nc9sq1809dsgzx50724nt6r1gsyvb748azkfw6kg2fstcei2lc1d5f0f8zc5wyg7cvfgvbb6hvuvbevmmdx0ftk3fx474li4npxpf2mkj',
                flowComponent: 'sw8e5p1vvmk5jvoemutplvnr0xqcvkbievklosxmmzch1fq8ag2yb7to6puenv59hku9jzis6tn2rzaoci3txuu4set3xdbtv0zr9nitad1mdkaqlotv5gzeo4uw2umjxbwutcptjuxrb2yy3l80zwevty3iy3xf',
                flowInterfaceName: 'rw5him4np9zex3jf0kmeayu8upsrim96drvjijo7b17uzmk1alq4jiaciu7ovbejhwg2k4nq486a9cen8qa742yryo45nwq28of49vxmgctrmi7ar2y5po9npy7ccp2kpi3oph1j1gah7932xfdtyg6bchhc6942',
                flowInterfaceNamespace: 'y8zemtromep67uukj19yusp1l4tsqjweczaqm68lzilvkerdnlt9m99k62i6pabgcbft383ipgo9awkv55h7j93fkbp133uwez57vvj2gfuyf06elp44kwzifauza7zu0ynnkpfcif84mf91741b35kw7t3abaes',
                status: 'WAITING',
                detail: 'Est eum assumenda velit et vero perspiciatis. Quod dolores iste dolores hic aut. Quidem quia sequi velit maxime.',
                example: 'r4ouhl7sazthjpqmjmg6j00tsl4ebckkemg8e5etsfymxweje5kjoe3dw9gyem4uyyhps2ssjo9w1bxx8zk2p255sfq9zv0xprgz513ke2hocv99olt31b4ucbhfboainurm64yplzrdrchtell7l3waip1jj7ow',
                startTimeAt: '2020-07-31 12:00:05',
                direction: 'OUTBOUND',
                errorCategory: 'i0x3okjxpy9a96nv3qbnxt69ykeve0qzuz0st9udnqzskufbx9ca32aivkgcps4bfbc9wcjp8yf3yr1unajm0gmv9z2wzv3czkj3yoymld5bzq7h7nlaj60s7hfrgngzmw8kiakv7dh6h86le3bvnf6dvb3ugp1l',
                errorCode: 'nxnlolyvbkjcr4ctbrao73zbt810x1wyf1skkoin77cn167x2v',
                errorLabel: 651562,
                node: 4333225124,
                protocol: 'gtqd02d9rlb25hsgaqy2',
                qualityOfService: 'y89lussgv3mbxm96f0jy',
                receiverParty: 'x8ffa0uod8lkq9lz3fu78yufsv3k70u1agdc0qoo17485m8lk0hgjrxs7csvy1ifxoeon5t1lo9ve0da04rk30i0mz2imfs6jb78xp58tfesj8k435kafie48c9rm5shtxcwum69944ynedh0xjwb70vggt7cme6',
                receiverComponent: 'mhhzinhbqvqwwv0pw6y8ov04gs9z2kdfy2vlq5td4c6hakilzttk7kx8lcmah2eed222zj0d46c5k2len91gz1t6chsabdelt5n5vbehbblqv9uwd8l5dsvbwa8fcf9gbcjfuq09uah5nyor2eka5g31hw1fdevq',
                receiverInterface: 'fgtq6x4kub2xnpspvnays0u4j7xq5bdgso8oxlwao4dz6ima1jlqp2njl95swwax9cpxc0k7kegm3b4fk40cnb7gp582vnq4xxfsjv0xvtl68qsnq12hdsl294p8ihe9pim50u2965nizeuz7vdx39om9i9689d0',
                receiverInterfaceNamespace: 'jxwbnzex3zqxbtl03rddu1bgo7vt8tdxu1bghg54qxgg7hrgyg03do1b2hffxdhjkwbhou82slpmomemgfonluxon9z4zo2d3nrwjzx1k6kxk5zbzqkfh1bojepc85bfhv4lm33f2g4eoq90zaw4u1czb3jq4d42',
                retries: 2358036641,
                size: 46643439023,
                timesFailed: 3280850828,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'ozygobdq01r6a8y0erdi1xa01kaumzadmwam43q04kv23k3t7q',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'b47fk0p379ar5cswigcf',
                scenario: '1mz4l5v1pli9hipfh7y91suewywypejhb7ujcp532jfdh8fhp7uywoxspmik',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:35:33',
                executionMonitoringStartAt: '2020-07-31 06:59:52',
                executionMonitoringEndAt: '2020-07-31 10:25:40',
                flowHash: '86cnz821s3zjete1dndq1n4xr2v54c2evky4gp8y',
                flowParty: 'x02006fysmwuw2vrn2k1csrkyvk2fs87ccazc2w7hga8f8htulep66d2j8z73k9qr4ijbg5mbyxu28y8vglbtk9q1q72al869makxk1ingwuxtp5qvc14wbh358q9lpluazw3i6v6npq7puig5ze8gfz3cn1unlw',
                flowComponent: 'ptnbpmed5ylu626cr8elisruplkpymu66wf7l233omrc65agam75gzam1z63grugs55l36kskkwg7ggm529px8kc8nn1fpnb9bempkj6v1u2s9r2p6atex65m2mcew0kx2prj2mnz57ultlxmooj6j6jm2v4xf17',
                flowInterfaceName: '5313bxtcdx10cibprfek1qz9jnzfgb7bjvp8ocmdvqsjcnehoko57sw2jc8d47z0scy7pwx9s07eclh6j1jrd1lat6lla5crkx28i8crogl9g6u2l2ent05508e7h31t35kwbkvhgdk1f2mo4npmwlel6xp9qq53',
                flowInterfaceNamespace: 'uzx62q3hjjmrka3ryashfi9z8oexoi82n00uwkekoiipsfbgwcx871gl06gtepo8xvy3tokr64581a26hnxkzh5c85yyj1u1rppkmgf6n6lqgo9qlykn773scws34jime7fe0jinr3uu4xupsnuddipfhmzxol9h',
                status: 'WAITING',
                detail: 'Id qui aliquid aliquam vitae illum nemo expedita reprehenderit qui. Qui maiores iste quia qui blanditiis perferendis. Laborum eligendi quia placeat nesciunt.',
                example: '9ynb05bg2noppplpnmb1xtppwkn3dtw1ilq31923beztuxu2rzdwz8ihekr3wtupk5xip8wk0yfneu9ptbhy1rg80vgi7dpsoou2p1hdoe32ybmwssppuamd9rpfyetwo7hljnivqth1qb7ypuv6q6ukvbtiixqz',
                startTimeAt: '2020-07-30 16:27:33',
                direction: 'INBOUND',
                errorCategory: '6pk0tydg8hci4msgmg8tfyoe89o9ke2dgcxqoeocj1ku4tk80ibhw79p3rjeeji312nno2ib1vrjyhoq0ukq4w8scuo070otks55qt367x3066g6cb5j2jo2hznj6foh66br8egliasgibtw24kd5f1w6inw66hb',
                errorCode: 'grwped8wbroplx5z01o67wq2dn05zrsd1a7kacpfpyc7tetm2v',
                errorLabel: 121969,
                node: 7768989755,
                protocol: 'ckzdxtym6v4unzuvilzd',
                qualityOfService: '9dwusoyrbs1of8dncaex',
                receiverParty: '4duw9iucbseq10krmzlxkuxjtpstgbnhnwa3px4hthxo9na6db0fysry549ofwyxvf314nhy39c535m7279jiyocj25dc1d8c1ixbp72tj3hak7y78q3kmkw5wihwwvloprk9719dnenowpzbha6apwyl72y2pgq',
                receiverComponent: 'jj3fpdjfspga36gfh4ppccdr2srvmroa1043e36c0joh45gxbab1cqs9110i2cvqbijc20fx21xv8u3cehcale0xyig5thnqi5oqoaydbesqs66250ypzqrydffndyu8p2uxnsasgv7buzuaqjfaiqkqrkixldmd',
                receiverInterface: '0wcw3tuoj4qn5cb22yeqn3cupe3n6vjco78o9ewjaiwdmulsjtpmcv3ayxvdx301o89x030noy5us7z0yc7g1brvna2oksdfdfnvu4v0air3ce7n5d256dx678j48qm9x6fyoe89o83rcy07y7m2jzw6eyksy0n9',
                receiverInterfaceNamespace: 'gw3owj7i471pqlwycssbtirzseppzebwlv2jsdp87q7341o9yskpvnf10tfpj1i39rxb5phx6djcnazrxvjj3spzqmq3n3pjnfj3vvahn7j654qno4v5lt7zw6rtjkpef6mygzxd1wa2t687a09k4m5ntfp57bk6',
                retries: 7530140932,
                size: 6285661866,
                timesFailed: 97920996572,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '73rccexn5l6f4gz64p51ghgtuk7kvr4kzxg6kawd67emfnyeqb',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '6yjyv3liln2d40pmnvsx',
                scenario: 'b8g2ihsz3kmqm9l78yo3eyq6t7zzl6s71gztvfupdutjrvx59uxgfear052n',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 16:29:50',
                executionMonitoringStartAt: '2020-07-30 21:53:46',
                executionMonitoringEndAt: '2020-07-31 10:43:20',
                flowHash: '3wnwf3fn1jvnm96fruf7ex1t3pbvgmfearu0vkkh',
                flowParty: 'lw8pyfw5ovo5bxb5gkevjd69y2tucc0hpheq20ziaz1cpj9pvbctmjg7shj9a0ebzld1tk2su37x9icmncy7kzhkd1848biyklxzjvh2w1jdbxranfozkk7dfeg3o89s8n12u1qsok7pof46elmab1gcvt3t142m',
                flowComponent: 'j75dwkjzgzwtbomdcma8c8bj6d5bix4eu72vqqcb6m72nh3fbhp3f18r0aazm46odz5nocw1sgdh9j3h1n4eajgt5vk5vu5f4a82802td3wvzwo9a6g297gc3wp0f7rrbp1cxl47qmis7hiczaib5qz0ty30x7p3',
                flowInterfaceName: '77i3wuky7i0ne9bnt2zaezmex5gwugkhui7woqx22cbed4f0lsmjkg8tmv2kayddvr8rrkxyf5i2s6xl87bdj0ac36znxhiszkl1e1qvzwsqkkrxgc5u3d2ejo0ne14qm0oig49zbuza3p4elb962z8vyjfppi0u',
                flowInterfaceNamespace: '2j25n4jyzx7y6okkhgwd1mkcfweoe8oyozluhf1cojpixi381quvg61k2uzgrrd9tntrgo2mh41g6t6pw4urntwlo7hqiij5ukdh6yrr9ha8kwjiyfmj6q26ziiyan1wt06xen4chds4g26l7l1lyk21gfd1uas7',
                status: 'WAITING',
                detail: 'Aut et laboriosam et animi nihil dicta ratione. Et repellendus placeat ex incidunt qui praesentium culpa. Nisi quam inventore ipsa nam. Rerum voluptate nulla autem labore eius distinctio.',
                example: 'vlayzp8a85nevyrkvku6mrj4td27hj8qgsshxrnai5v0zn7lmua789lqjn30jsdbdoji3guung12g6ywvii4xheaj85yj23vggcl0f6xj7c0le4v4drn3rnqhcwwz69tjbdyu2j438lsx58l91l956iqapmdiimo',
                startTimeAt: '2020-07-31 10:55:57',
                direction: 'OUTBOUND',
                errorCategory: 'kxkpzn0p4uc12fxpgn7xsfs9l4dfhh17eylozqbki59pprwtl9gwhs1ufmlkglgxoiz7m05ohly7t7vzgdou0ryihod6cemzjxcr643lvpofvvtssxi6kqn7430b29jyruf9vj22qh0u28olgoxegbb4clbsy5o6',
                errorCode: 'odqkeqpg853egs50oy1t82cvn0ewahsfgcgc4j3fr9sqa97tez',
                errorLabel: 991899,
                node: -9,
                protocol: 'nh2xvm1xvkc7h4kp7d19',
                qualityOfService: 'kffwovimu45z7qmf19tg',
                receiverParty: '30bwrqkbgj4vpr02tiy8sipv1yjycvtq85j8qm82pycqtmfvk23fx72y6npvny118a3lzf6bflcdjcmucjzlo0odj4s1a6y3elu0prvv9tknixfkn5cuuc95kkvzh4mf9xirsdh531ehnsa127q4ekjk8jdzkfj1',
                receiverComponent: 'h0ylsu7xly9vspe3hwplvuc806nsud1bdcvbhyyy18a5ifq2iol3xde6e5pm42rt68xs8impgmg2jfk4uvemtyvjnslq0cclx9gjq5wwgvhj04yzdfupmcq3bh8bc9a33i7ipzxkxjh30qp0xr6ska8t09td4a3e',
                receiverInterface: 'tsgu5ne1d1s6liy3yhmyj2chwd92pu6n4ihpyqrub33g0uu7y5blkxvq3j4wpb7nubgge0sh370j320hk23vn88v2hh533fdx8svwrilsrdgk6nmf96hmuv89evw33yawfyr9366yiczw8f4aztyzu2r1oi5e0ho',
                receiverInterfaceNamespace: 'yk4ce3ym5mu6swa8qi9ihtekyl2yi3xr0c7kbjd341pxlqrct88vex8asis0eczdcalxwhna9a84p5w1c90xl7qmntbqpqldbswifvh7saq960o7xxt84jkye5jtvyj5cu21h83mml0ln96imsi95wiy7ljsuwp4',
                retries: 4318563700,
                size: 2443262920,
                timesFailed: 4737158420,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'wqm9ql0f3rqaolor3eqe0pnnb11152wmc3o1t9m1rqab7laa06',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'jiqn93li8aqjfcpkk2qo',
                scenario: '6dhrwyldwjd6s5vufss7nbc0swghl8df5bj3q632kiagcbtyeep4vjmgsto8',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:46:18',
                executionMonitoringStartAt: '2020-07-31 01:41:35',
                executionMonitoringEndAt: '2020-07-31 11:39:27',
                flowHash: '4ss7iqsyg2ts8giursfastt31uu6wi2yvvmsozfw',
                flowParty: 'xx549ct5mxhoa00e3c9k1o46plsabtbb1wvk08dunpvrs7qkurq7pohqjz65e5gh9niuamh87ut6elu4mndtshvkwomxpyi67ui5lgbbsreo0e7968gznxis593bxz0qwhyxuorleeeamtuvhu1oik8zuagbzu3z',
                flowComponent: 'pnhim7c1z2slvqfvpmnj29sixt3ryjm9lschclnwrr1shxdthy084mnkxn6fqlux97twuq1i5skqfk41qi8krhkam019heg81masvlaj4zwd4isabhitildgb2tcbjlybbijjg62pe8knl0faylo7g4b80s1tjj5',
                flowInterfaceName: 'pc4e6n0jgt3587rfximvanswglxkvkfkoa4w4p0pd9169zmuivxtpymbf3f2o37d0ljv7d5ndqjoueq7x2m26nxf6fobff9150bnu36ocfy6nyrod34bvqrkthu11zlgct9opc2mxe0vuixbj3tmqw7hypr5a3mu',
                flowInterfaceNamespace: 'br4hhc7ajzijuqzsm0aktruc0r7m3vtr2y8zy4spyhd3lufpv7mplb66ambrxppul6b4xkikguvoox1o6eltqzqlf9n36v5qrbuw7hw06ug6hptrwipmfdyr45vrihw0qdw6hyrj5x9hbxhc8zdup4r93cwgkabk',
                status: 'TO_BE_DELIVERED',
                detail: 'Quia ducimus quis aut quam inventore voluptas ut tenetur alias. Accusamus et eveniet nesciunt similique qui delectus sint ut quis. Voluptas dolores sunt et delectus beatae quidem sint.',
                example: 'oncw8b9cpn3ftyljej7cd2epg96zxmcei2eo7fhppq3mpy9dld94o27alqpcff6qzkqgx3jtglaorqsq5ftc0dt8n97ytlvs4d8gscx8uz26bv48jo8am1tf3a9stdxbmenugpgbvp8mia5l5161bqbcrfqs79l8',
                startTimeAt: '2020-07-31 00:21:16',
                direction: 'INBOUND',
                errorCategory: '3ydocsrt3ft5vnyn55wogk3qgnxvazfa7yqnnqg4g1hneyp98g51ykts9ieggr8m1ow7mscrvivfchpmz8nebys4c4m18ynj0hyr22bvs9127qa0rfywzev9u8hq7uqsnacdmftkhsalfry63o75wue6tmhgq4w7',
                errorCode: 'mygzh4jcdax6yi2ysxg8rmhk607ni4oven8vm6mu4hn8biqqb7',
                errorLabel: 967028,
                node: 1770986028,
                protocol: 'bs1l4h99h3kxb8rwgvtk',
                qualityOfService: 'do7czuhab1edctx80kta',
                receiverParty: '1vx49ad8ingx42ppwcsxajmy36e9ynwcuja9yn64hfy55dvfgppt70wcb03auiv36isrdjofv1zgfozrr3arbawgj52clbkeogfct8geeuumyjallfm05zgit2s8256ljy31foiqhnfkl6bx6qe6jzuzkrxbp66p',
                receiverComponent: 'uhw3g90bfijv1qvdt6ntmtcat1by1rxvihm0vzsn8sxp5x5fkv5v9cmm9cjtcgizf1nyh1qioqoysz2jzh9cgv39vmr8180f3xu9291905qtpo2yepjlnv0wjddevx4c5xiqzzs0bc8tl9qzvz5mbs6kh292yk18',
                receiverInterface: 'pde0zxqx2k3ns3k6iwi8ky67qak4qi3w66x3mjdm3r14p7mrfqqg1sgbfpsc3pqc0utb9360dztma9sohimvj7yh9fuswulp0xzmtyapcc22ma40qexoif94lbqwynssfildl64aqkt2om010as5mphbfrau4ka1',
                receiverInterfaceNamespace: '88h8bcsthrf1bb6d1thg7e4dc3b3qpm69xbhli1clohpoxgjqux5xz090vfsp8c8dga0ll4kz2dsm69b4tnnbh1aqy1ei33i5y0c0vsetf8jvvprvj8uj4fj6l62f0a09pz2u3nya6bdeokcw2w6ivqe15ztpn7j',
                retries: -9,
                size: 4584904876,
                timesFailed: 1785206388,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'oeq6ebkk10wdmrg1146mui01z12uou9qajhyx2htzk9f0biwut',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'm8zdj43fedvqbn9feo6u',
                scenario: 'jutl2zlnukx5k7vlt3g7vdczes8aa6opauqlgtrkodzjjw3hd4ghsyblrvlk',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:15:28',
                executionMonitoringStartAt: '2020-07-31 06:32:39',
                executionMonitoringEndAt: '2020-07-30 20:47:25',
                flowHash: 'x2x3g53rv9st12lcwacnvqysh83t16s69ia5tihk',
                flowParty: 'rhjmd01qce490lhcawt21bmw25pyx5q8mar8pxifcamrshcl5umvvnatzbdev7ypy3ne4n1za42b3ngx7kfwu32343l6au1azk6i7rrvyzg5tv30t0a2e5pnqjbxoqeqtz98a50fjd88zd94i44iqf1rcd6ced3n',
                flowComponent: 'ia38p8xt4dxstyrx53f57129wt9vc69wmih8ubmmij7bq4phfn1smzhurxlaxnnhi34yhf4oefebjfqq9984fd4mnnrdtjgh7fib611bpqmia7n33fwnj81da0u1xi8sg1tvxu8qlikvbrxtqrozbrqc12othazs',
                flowInterfaceName: '8rabofwxqz1e4zx3gk763154sf13fzfvaf77khy2gpzxbcdhcwpx653i0kfbw02776rvy5jp6taaq04jqthdjc7p10nerma6m2rkyg4flf6xkvxtlsrziuutavge4lf225cps7s3pnar1n4se7s4cyl1t2c8kfdr',
                flowInterfaceNamespace: 'xo2jezoauesq74muk59dx9bibng91qbijb3ymigdgv26y2ne016qonnzc8x9wggt0td24htz3ccb7fz7b3cgq6wf0hu56gn6q6rntq0rydfmv3wq5grllq2uklaxci3fcwe11gbthtcyrezqt9cvt81f01tsnmor',
                status: 'WAITING',
                detail: 'Qui eaque est quis ullam nemo voluptate id sit. Consequatur commodi ut non. Ab in omnis.',
                example: 'q5n680ra5i7o6hveb6weeyom1mb6qwismmtg1afqe3c07hav3x1pstanko0ap3ahp21fdibok352dpq4wsh2soq1ik0am04dbmomd0kcajubb5ff0r0xra97c2rwj6s7wo2g6g8yxyq5ba2wuv3uuck8l2jtohqw',
                startTimeAt: '2020-07-31 07:49:20',
                direction: 'INBOUND',
                errorCategory: 'uwl627kbjlfopejme64dvp1g0gi255633rqi5mwuyqfuqzeh8jeqit4g68cv555r2rx5s2tjdgrpz18iu4a3eve82n33jicfy2uff8i574j1z9gqws65c68r2m88qkdjmc4jhcqzyjq1ol408ei6q6ssgg3jbs5g',
                errorCode: '1l0rb9qod7pwrj709kp9ikghr728bvu0wurkh8l3bcsr4cl1tv',
                errorLabel: 164225,
                node: 8324877104,
                protocol: '70t2vgmniyi5q9ayju1y',
                qualityOfService: 'nl06def4lqv13zswpu07',
                receiverParty: 'u8ktd12rvfge6w49jym1ide5keqa3cfhdnbgd8zyc1tn67v2tjl6dtx7bs1jp8eehla3d41ugor19j2eyqy41wokygsjhl1sjv36ikflef0weqa9w1ymymey7bgahvf1zuhqkb0s7pd4rlmlhz4ds6sz2z88lq0s',
                receiverComponent: 'd3xr4s10gzfq5ah9k83o38udvvfav5mbufyvewp0nj78yjg5s1s9inm28qapza0g60wcosaji2939amb03gjlp42uyx0815zsvnwpbezlgqqre6ia4sq79hi7wgl8jranrrtxtg9ekdp6dipy567cyzahf3p2sq2',
                receiverInterface: 'wod7l7hejtxoy9oje7scumu8smxaxlk852okb6tc462k1ayreygg79cot0z2262zqsvzlv0vufx0addv86hi5iqub8xx4yy9r32gvtyv5oest1ndwdhbywhrstsh3dlij0gdgv7qdikzafdh6aox77s476op3mcg',
                receiverInterfaceNamespace: '10rh4nkh4s6o76utjms5rd25rakyrdecqnsrh80qtjnhuth7doo51406r5fek0l50bkxl28pzirvgiihf53661hq53g0gd1kf4j7luxpdj94pay9i0xtivksl9y4l39xhdrusysqzgcs3aikjugk2ccdawpus0ta',
                retries: 4481109936,
                size: -9,
                timesFailed: 4389223030,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'csyap5yxh2v8gvkto9g5wvad9m1wu3kzqvmcn5fpo9dnfp309c',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '0vn15cubqsokfp78xdhs',
                scenario: 'mh2yhyzese49c192530x9dilel6nx6qb3pupfa7wb7ugz0kzv879ejhl074q',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:14:04',
                executionMonitoringStartAt: '2020-07-31 08:22:02',
                executionMonitoringEndAt: '2020-07-31 10:21:06',
                flowHash: 'ulcdalpghexwp09v2a3apw646sicjyphuqf4yj0y',
                flowParty: 'xcpbfgwahbsd5apckeiiox38iw5u0n6spyekkortf81u6p0sed9ws7quo4kfpeplb5561znbtxmy58q5g3t6sz7km22xp79oz6pfokho9ejaq9axa3h35wpf9g12b7xi4cqnexsj0cxq52cl0u4hgl3ml97jafqs',
                flowComponent: '9b917hi6dmdhw3b030hwh8rsw242da37k9enm4w3t4ymaznwf8ofbqch6uww0hckyuuir50wk3if3suzr4xq3lifmlsxeri07z8wwesdlca6nv5fdu7j120j2wdq3kxhe7d8xshzlsypl66nq8z5ein8r8o4fush',
                flowInterfaceName: '7v8lnu33ltf3c9alasymddqtntlnz7i870qr6cslwxp35czt5olqw3ul9pwa5sma1kmifw1hsomz95m9e0seavgu4yrin0iz9bn06w1hkhjmolxzuxheqw51q86hhy83w8pmqa2usbyurv8t6jobgm0h385tw1re',
                flowInterfaceNamespace: '1s1azuu50vxddvxuoycyj5q8blbelvy4qp5pffzxq163sevc99lf7v56esjo1cqm358z5yyme68kdgtnv3rmqd328zq21aot2da374j8ly65a9udso3ryk9ppsix1ehzq00jghe2smb0fm05g5lcxk2o0x4ax95p',
                status: 'CANCELLED',
                detail: 'Enim perferendis consequatur excepturi magnam. Nihil eveniet earum. Deserunt corporis enim consequatur eaque quia reiciendis excepturi reiciendis. Aut quia rerum quam facilis vero asperiores.',
                example: 'dyiw9vadsa33jmsuzr1r9b4vl1eqnlj0x9uf032pvqrztxn3cbwxsgr97htokgx6sgaosetfigo2tppw6bscayeabld51z8pccqa77zy0ixkndfe1l7zd7j7rsmmsgo7h9ef9vdw16nq39qhl7izdbkzcvkhouat',
                startTimeAt: '2020-07-30 21:48:54',
                direction: 'OUTBOUND',
                errorCategory: 'ci97tdggynwjsgvparju35eot2dswlz2uzvy6xnvveelaik7oexel7e38m1tfxvdo866khcrcwceuacjbpqxtx2xiglcbi11p13vip5mtfteo9tad78wyjupgm9pc0edup8nk0ecvru4cnzfe3gw8ou49mcg6o6x',
                errorCode: '5c505l2qaevg205n57q7iqclr45muigbay9l5k5dxtgqr8ojsw',
                errorLabel: 375595,
                node: 5041413590,
                protocol: 'sac1edsfkzad2uzu1w77',
                qualityOfService: '59rsw7q5hfdngu32ekg6',
                receiverParty: 'vayyx2jqnpe1afao3j80dn9nqnseg4n6t0bcg8zn7vuizzsatarjndvrgab2gtf4k3yilqkajg3fd9lsew1a4831t1s7kc5prh7fliiyqvopfd250vo9ngjosipxsicsijfagb1f90i7kot29t8a3cs9ohjicxpq',
                receiverComponent: 'm0557qrqss0zbmmdj6iwgt21pgwcjitvcxivw1wy1asjci3km2dt3hui8kxhhl1ix6g1r64uqdwtew0bvx97t1t4mnbhewdvv5hlsouao8by8gh2xsoi7rrwt144kb9bjsl07d6ji6cli2b1ym3mvxirv8zc9ofz',
                receiverInterface: 'gdhm7wwv75e3a14luxleucw5l1g25dn963w2t2xi2c6vz09lchi290vmhi5vf80pnwqaexyz4jyn4x3ugcpc6mafbh0igszg1rmnz3hhj6mqpvg3vce6iqw2ykli2zo0jjjcuoqs3xcymzlae9nswqkjeergm3rp',
                receiverInterfaceNamespace: 'djhyng5glvvudcvx12up4vsliapsxezinrv2ldol256ft4xhnnle2y9dfxgqdjir84vqz2h72lk573geueiqv7winf6vw0rl2v371gaakhkvknqrq8m85cqcbo13cr8t0qpnztneb4irq3hkcgzvinrt8ggl9rr4',
                retries: 5148655607,
                size: 8467490712,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'k95havk8x0lfb0uv6fwrap0s7j1asbk6hjq5debid9momqasxq',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'e8ie12wtepootc1udg93',
                scenario: 'lccc41q5kyromip802u1cgpk4p8y9i989gvg11oy21lrw99rrf4gktehsxj7',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 07:13:09',
                executionMonitoringStartAt: '2020-07-31 09:04:29',
                executionMonitoringEndAt: '2020-07-31 02:11:51',
                flowHash: '7jma15g4es0j7o4hkzn85gh7fra088niiso4zu8y',
                flowParty: 'ehecc3xpbi1noyfg455zz8gu3ehb84u0hk0mx9tzzzt4w1dixkqxidm6pccb00bnkcp744xw3jcxvqjvruk5igj5s6yqpw6ikloj2q15q78o4baj8kvx2upfr3q7lx3hy2vb027jdhvyuxz1iqdrxk3nkmh8cmpu',
                flowComponent: 'submkn0fq64glnyydkn6zcpsku9shxx5re5csa6nn3a1ye5juen2pzdpq7l8n425mi8ixdht0f30p9ozd3eok1eeh5mtnyfo13thtys8q146m507u09g51r4367sxt1t7o6a9scjo9eo4vy719bazx9l0v0gql0m',
                flowInterfaceName: 'smtqmi50nqth3vsl1hyn2x9vfebvfk6tawdtrkcqj0wi62w6gpfbxviwjprvp163gk4plastics8olq73xyj5kk3goxhl1zboshplunwrlemds5mfft0kza1yiaa7i6iimajnk134ogaee9nzl6lmqn1ovxvwo7b',
                flowInterfaceNamespace: 'x9fwqr890o08utc8xxzmqmzg9cvspv0iykkhltqgmje15pveddtbhhs14ytado5pwq4n3sw1ovngxlvf89f8x6yme8z4ehge9mz1d1l2sypjx2nrpd68hptpaj2hbf158ssvspl5olwyzkwh0t20rxkb3lrghl59',
                status: 'HOLDING',
                detail: 'Architecto quo est aperiam ratione. Et consequatur dolorum quod. Placeat vero temporibus dolor rem autem aut dolore. Numquam quibusdam a rem iusto impedit similique nihil numquam quisquam. Inventore omnis est.',
                example: 'rgt1wm4jtq0kpoxscu78uf5r507xc4e2pevf1qwnus22rrs24s88i5bi2n01jusshesubf1ds57qtiebk8eqx65c5kxsrbue2ztlecb2bmqbirl5eibpjbk2ukrncnl221ryxn64j7r7ghlafqq5l83x6yd4d4iy',
                startTimeAt: '2020-07-30 18:03:08',
                direction: 'OUTBOUND',
                errorCategory: '1ko3lh3yii9ryese3x24rbl722mv93ya781ros7dhekzmxyfbo3dihg1qiwt1z2jv27m5iuozs2scmwe0o3u88ylgytam4h8jkvvgsvom2ls5s5n0rh4pzjjxwvy78t8484l90wk5qlem5i7wjlto48yqjv34r8e',
                errorCode: '36812e8avxfd8ox7567sg2j9ix11aec3vgr6y4havs8tp0crne',
                errorLabel: 443083,
                node: 8757288648,
                protocol: 'ik1yjpf2lyemfxzr0tf1',
                qualityOfService: 'rxgpb16faxi1wycf8cux',
                receiverParty: 'ey6ns082dxzx0ehvichwl92d4w6s5ch784ddt9dicrlh2l4t81w0ws2fmse1abc1z9fsz5ai4hr2pqv35vedvlbjz049g9fvuxy8lg624ci2jrk64anc98goh1au6jk4ss1i2sosr3l38miinhpdqagvl2xhbw22',
                receiverComponent: 'xwi5wz891o60z7mf99z305e6e5t70k3t2kvz2fci8qecx6za7krn882sd0mbo3rm6e6jwai6b80ufpbmkwjlfkkm9drlrxiiw3ecex8nupvyu5xpl6qrd1swlzor0gllsen6a0m93yksegc6p0b1o8lxp1gd03ne',
                receiverInterface: 'hmwjlr3wiy2pch6x3ehcg44wb1ax62l75xcqlay4aqltdun2nybw7rvlszizff1gytgqv6tdglz7ht6xfwd01y6kv05t1w689d43sdrvc0rzbmwi0fewi5mugzyrjhztknta76tyy82vgdwuft7vga164ki96drz',
                receiverInterfaceNamespace: '83m51zndzoyv2yyxaug0oytenp3ymg2razpj1p4clgke7syt93hvjt067m1yeygkyxtsmr15c6z7ag0pdmmoou57app10r7i8fdu6bhm5hzkkwwkpzbb3cezr64kp4fx1g5dcsxudqqbhlmvvxxn079e0dtmt0i0',
                retries: 5362201784,
                size: 9032846143,
                timesFailed: 7707895917,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '7ir0ngudg6dnfqib93c91c7jqx60965arhnri05z3ebnqtdm5z',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: '2j0b6bzq3d4lcyiiyu9d',
                scenario: 'ud5ofux2pfevuol3gu0hrvn0q7g9tosqkvn30wwthy85mxr73hvk49mfsogd',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 04:14:01',
                executionMonitoringStartAt: '2020-07-31 06:07:37',
                executionMonitoringEndAt: '2020-07-31 07:39:06',
                flowHash: 'k7lk6dlmf8gmibyclssxawuekuski16ywknwmjto',
                flowParty: 'c16jmatll65ebsubpoyabltez9sigetgshq4qnc9ig1bclrsmsndav3i54gc4goccrfini81rad1uwf2ukxf7whwr7fjvmfdlq791lscd0w1y624vmubkg2wo884t9o2es6fw2veovbnmu0dt9yoj1v5b2xqzaqw',
                flowComponent: 'hhu165xk69z45qvor3uunxqaj32q6xorv7bctwgxpiv01ng103lom5ukbxudt45gv9mawu5bdgnr5whfvnbly9twprz1ahtc5r34c3v2cpj241y776zbhgchup74ejfwzc0jz73m7gyv3z9cgv0y9045rdyg7w89',
                flowInterfaceName: 'tcyu4ehhnjb0wwd4399o5mgridrt4b95dvolmf2xm3i4gpl413zmbfnkvlwtjip8ru3cu6z4t8ux9v3t2r92q0cwmkmvos63femta7kr2nfyzvi6en2knf52fkjw2vd61o6529vi0ccich3zajmkhxfyy5vwt50r',
                flowInterfaceNamespace: 'xafamxl8o708t34a6dadplaniak4i62h5j3hxeqb7b57q1os1dv76nd8vykgevvz0gjmrejz6jznachq5aap4fzv9jt84n16bbdubt4k7f35ckwnpk4666jparau32k7d9v1g8pwfbiwmhkinw8qxnxq08bf49ig',
                status: 'XXXX',
                detail: 'Labore minus laboriosam consequuntur. Sapiente sit aut ab. Labore repudiandae aperiam. In perspiciatis itaque nostrum ut ut ut.',
                example: 'peevz8xnx8qdhst2vse1317t0n1onz1odrcwq9c9t4ajful635gb04xi5xdct8h387p9g7dab56qm3clxi60u94c3utr47bft5z33hxhdhza67khfso3ouzlq9n853o3owsrarxa18qoig03om0pweyjgxr8aehk',
                startTimeAt: '2020-07-30 17:41:43',
                direction: 'INBOUND',
                errorCategory: '9663470s6f0m2pcfuttzdraism0cnxwjylvbhtz2ruc5x099c9apjd9vb7g7fqz2es5pu64gqc35ryqz0a93se4ytx6wl7fjwuuy7lsp4i7m4oya5c00hs76llt7bww2b866wkm9j6s35iabbduosf4xshmm6713',
                errorCode: '1rj1gpt96vx7ayfv0s7rlynfdf1upb6e2ii1fuilodr2rcjnpf',
                errorLabel: 549320,
                node: 1538258367,
                protocol: 'lmqv0n7tqaxn3s20haae',
                qualityOfService: '5d228o7m7dkeromtq2cu',
                receiverParty: 'f2hc8gvjkg3snnse7ww80xpwhhfjw0grnprwikuz8snt40nhzkl2dk0qn6josf052enmn1towttxserknulpdmb8ixk22lizzovexzoscle2f3sjai33ggumyuirj5psr77hn7hwgmxisr03clkpsaxefga3wlli',
                receiverComponent: '3twxkgq7cc8uv4n3lt7ia7dazu4i1yd6bvs5zyaleqatbbf1wpvbwhcag39oi5fdxlp2sjmj5i7cg6bmfyeg89kdscf33rha8qzmr9q5cvk4cymwtfcm0133z63ossex5zxf5qm2pyt2cwcq8vymxfc9n35edzf0',
                receiverInterface: 'e6l26rx7jgorgcxdth7gq2e43okhnynh2cqg60lyacufygs6edjhnj93l5hiiyf1j8xqko1zptl4xa4zmefl2fu75cbjrpbwoyi9arm8k90art73rfdippv2txy3mawvmqr6t03ixllufuhsvgtvnudqgg1eu83n',
                receiverInterfaceNamespace: '1c05pw7d20p58v3fqdz0us1y448awla0uvgv0hi58t01vmxgqdmd3fnde7jrf4q9g9b2z9qwhfbslxbo10sip8baetx0o0rixkm0zg5o510m5l9xuh8ug5uqd0krj6ngzixac74l5lgxkud38v0pcnyhwtdcm3d3',
                retries: 2387939464,
                size: 3530191532,
                timesFailed: 7468296000,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'osv69pmkan2hc8tl3gyjebf13qhkr5bfoh9dcra82sify0wfm9',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'x50mv4ctnom2poh1e4c5',
                scenario: '6z36ylvg87fbtn7ezys3oeytqjug3rtf4xemjulncv386dtlh4rig8rutf8m',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:50:49',
                executionMonitoringStartAt: '2020-07-31 03:03:42',
                executionMonitoringEndAt: '2020-07-31 11:00:22',
                flowHash: '7h555bmhgak2zk32xb4wrkv4y4iiylpa7vnaonf4',
                flowParty: 's5nscofb3hupstus6chfk1dw62bu6lyq1o8tt2fxeprqj8abmztjygrehi4c2ireef79snujozih2z2zf19qppnl0osbd720nn0qdcxrd9024kxm4el6t9augea5nhatuoawtgjoy93fpyix9zev85a4qwve7jog',
                flowComponent: 'elhp5xr6gjtqo3qdk9docgda9c7aqjwbkikrcavev8wgydq8kq8d7p01ll54hwyi6qej0bzo2ukyljh7u1l95dua3vp7ni6fsckcg9tywh5h3pc38zta22ltwspc66cfranduhzhegfq97j02brxjpthvtsrbt7k',
                flowInterfaceName: 'e3dudmxdogwie4y0cyhd3k33bfv5odxkvawtg1x30q21nsqmcw2lrck5s1h8ef4t5xyhpjneczmu7wnb9o63rvv5culx832dwf9g457u5dbaeukpspwplzi65usmwylfn49idmhliekffkooxe714ga63q8gx4go',
                flowInterfaceNamespace: 'nubkth4u2b2lm1qst665nbu0x5luak2mm3yhyu2bqaqnhhpgrw3ey5ousf1q5jrcs8uypbua6gq7j7ddkdjnmvkutz3h65punkic0op5aejlsqxri8nzcfxuc64ualdzra9zdthan2qgl485ha0rht6g97j3ag32',
                status: 'ERROR',
                detail: 'Voluptas molestiae nam consequatur corporis in quidem ipsa. Itaque qui est fugit nihil totam id doloremque modi delectus. Dicta quis qui.',
                example: 't2r2iauz1j8ggl5on94gncsupx1m240nqjxa3ulhu4pd9ndp5j3s3a51anob9l3qqezwwx34upqcnx7q84p6izpfv8ejtti7sgkd1xu9h5af9a7l6xvlp1gcwyc5rk009uhtdutwzfk1uo7176t7nbmb5joh482y',
                startTimeAt: '2020-07-31 08:38:51',
                direction: 'XXXX',
                errorCategory: '8qpjnbm1dh36jdihnyol8c1suyp2vi8n8z51e4lxnk0g73sula8772xg5qavuf1n1m59cfeitwf0bju07oencanab06wozfprruoae1xrv7zv0d85eavsxl43o7s3lnmnpi3jzzd6juykgdvljyqdw9l1oyfvtka',
                errorCode: '0ghfvsdl6d34cukcs63tasahcogrxg5xi9bclu109ibfa0irb7',
                errorLabel: 595770,
                node: 9479489562,
                protocol: 'ln28os1lo8gp1d743cd8',
                qualityOfService: 'vm5pjoqi13x0srimxnrs',
                receiverParty: 'fjrpww15578kkuru1b0skgsr8mqd9sgcocx0sc8r8otg34fkr8xmw6vfqu1d5528m8ar5md1riykcaeae4y5r2f8um1kijm13bqkt0nvzbvw5c5ykvichk5zcu660iriru6v5pwpdpm5wttuimjsoupxmtjgxm3t',
                receiverComponent: '20p0kk6svef1nh585enizmh4j4vyipg3tvge7ryfnra6d7efy69dzl848q0hwmze755ahh3nzlssvhe54bxzic4yrxl3hwr3sdfzu32y190nepqz4u3pak56s6qcjya7re4kjxyqzqiazqog9v4ycw88vnj8tmfh',
                receiverInterface: '48vx9ufke1t3igej7y812381imilcg5nofs68ztt0seupwry7zfnklr0mi8i3gcefad9wlugnjo6t7z606jjnt91642tvbpr1ewvy71i0k4uh29pwkkzmais5ezd5pwnriw4w7logrihw23p67e7gixjdfc07apw',
                receiverInterfaceNamespace: 'vh6c0jh8bepw6k322ydnnfx34p002vuchlcivmvyap3vp53dz9b0bopwzjm5p1ezf0x3txl28gpxe3d4omibwiwt5j6vyzu86otj2jx7ndla7x2takmh2gb7oate4l3ufqbdy7x22f8x1qzvme0tm0vaka1j67jw',
                retries: 6552139275,
                size: 5930171478,
                timesFailed: 8496064772,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'cddre3fpsy3bnhzicyoc4z78gcmm24g44jhanxrufike041ztr',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'wrwyd3oovixkd4k1si21',
                scenario: 'lzpsbd6x7ga421l0yanqa3bkmhg9q7nh79vsou2obfwbjd2d9105k2jmxknn',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-31 12:26:26',
                executionMonitoringEndAt: '2020-07-30 16:40:00',
                flowHash: 'dl46nd7fxxdo4ge6vnrwb4a0wk39i6m3c6foe1ak',
                flowParty: '0weraolq9r090u1lnbyb070a8f32n09to90np7cr1ytx9olz6neqm39aui50faja7nwuhk1h9xiqjfyc56on5g1pyr3xfmzgsyo90nb16oaud0izenp7gwulqvrv8ey9t97t92au67kh4lknrc5rbp2etz6mx594',
                flowComponent: 'xw3o1cu65ive0nm3zx9d5otlgs4wha9g7id7yvimjop5hf7z7to31g6hv0fjmloauvdsqsr4qoy8l13d6l03wpf2s8tzcjs4wngk7qv7et51brbm7f37x971r0ren4yc58nh3kcd6ed4efftj72i7u3lplgfhyl9',
                flowInterfaceName: 'dtkojnxtby45i1vpjp2nw6fkbchsus57tjwtzp3vq5sxfwdc0d17jcvz4w2mu3w0bge680onah8ajg14pwus2yh1m3uv5bwnmyqpg02ew7qng15cfjqjedy1hwojfzzulwldnjozn6124319ud0w9c2qvkujh57r',
                flowInterfaceNamespace: '3ncto0hatkxmgts49xnhztauyk896i0bu9guk0a0y6jnqsijouhd653gbk4nx0zspy83otfh0uenqwmt1ofcvqv6vz6h4ah0f3cgkq7qa9hoqraj1mp3lgoept1d9iyyfk4xh3vp3r7m3zltyg1jfzqepkui9oz2',
                status: 'CANCELLED',
                detail: 'Earum repudiandae ut quia quaerat rerum autem quae. Fugit veniam voluptas occaecati sit. Suscipit id velit est consequuntur non odit aut quidem eum. Delectus at culpa est nihil esse. Placeat ratione error est temporibus officia veniam.',
                example: '5linznit700yuls2iq23fcfjk7d5kmhl89tazr1o26mf71u6emxtjyhe2i1nefp77r7hxwkl0uzgdgdb0dlt2ux38g3z68ghj413yox7pc4bnw5ijdtm721myxkzbhg7sbiekryohcyynda2vxcjd42qquw1o7rs',
                startTimeAt: '2020-07-31 12:28:00',
                direction: 'INBOUND',
                errorCategory: 'spsxklppq3srsalxf73j7q1aibabqpcw1265mbwrdpsc392kpk8e5rau96bs5l37j6d2nlxzud0rtvlk6zg82eqdf8jq48u5ht7u6tqvu9nthlecrecgsi8rfwb3o72sc9rk2l7peiwawcqxe99sui0u9ia48n9m',
                errorCode: 'uwf6svc6o9x1iu58r441rmkrqry97ed2yk6y6pbtzydj25xbtq',
                errorLabel: 764707,
                node: 6355149566,
                protocol: 'sf50mn368wxaerl9qqr3',
                qualityOfService: 'lxq99sj8w8fp3wgpn8bj',
                receiverParty: '8aqqvck7ltw3hwh3vs5ny5apn1dxmpxlq5uss2j6y067rx2jgbv6t0aqimssa0aj2rzizxbn70edps4vfs4xwav2gxc6a4zgd8998z62ftseye4czyovdbi4dy2kf0099hy0enekztbshlob14j5n8oow7bcr9am',
                receiverComponent: 'migvsexxbsd0ko0yywjbgzdcenpwlz1cheqr2b0ehpvggd2c9s1rw7xg3kl72p9c452utact2kd5vb8lqv8gcw3krt8y2es9oydp2ikx1g4bq8n0zzzakjblfyaxrnu9j2dpp9mcg0oxnvpdo0g98qd5e9vwcrho',
                receiverInterface: 's4hhzuea05jzkpbyz389wvzcepm01sbvcdjspelry266r1xwufmxc9e4ex608gxnrnwat9qq4lawxtxah59p38wowyan1xjr8ucefpy10iqboxwvqsysa0z5yzt9vsprq7f3p3a8jzufi8pbr3ll152k46156pom',
                receiverInterfaceNamespace: '02bu38ntk1vawuwb49ip9qpz3p9htsybd0zkqebx1t3umgy8esxc1rzcxcsq3jhzagvetnu2ylgft9u7jtz5i67p5ah73a0eycql64t8yjjuz36oshejav4cbyq2fs0whqj0u6n6jpl73i9xtfk3a9qhdyg7gb29',
                retries: 8689246296,
                size: 2823907968,
                timesFailed: 5615723816,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '9y3rloga473hqnln89ikleuymf5e9qqdegw74gh8txabx0pvd8',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'ipit3m4yuukan9sxgyaw',
                scenario: 'ube9olte98oevf3axdvjiuoycmtxkbvgy3a2lxv2mbkjta3irq9zx0u91e7u',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:35:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-31 07:31:39',
                flowHash: 'yvnss4atr4ge6ycdsbzryabc8kvckhl159zrsxi3',
                flowParty: '6doqesawg94hcvnxjb2rny2srxuotfifbteyytq71k39qwn0cfuyh3crhwdi1fa1qimdxkgogt8x8x5b1gua1akrjy13bjwld4g8r7k7qng6m10yjv5qjr1n11wzw3xczd2irg8rcn4if85bx8ibnatinmsfjwrz',
                flowComponent: 'z9zv0nxx6ygpnhhszxkkv3guic991nx7c0xv2vi2sjng1gjer5cz8k191ylzjyct801tb6vaxq0i4ptau18mewu9oveyf6jf50rjfivevuw263yb6gw98og13ayvljl1w5xx66o6bu0hhspyn9rlouibp2jkugdd',
                flowInterfaceName: 'fg6fj4xv8y5yn3lcik6a8z37h0zbxsw9jlacpx5mwm11h6v82ixwwz42iur72mtxg8qlsa1467ukv657fqra45sbl3lqxscjgagb9hwrk35tjdv9t8r03dwkgbil9jracprosp0qtq7fv4xmh8us1xsnc2roz5ae',
                flowInterfaceNamespace: 'jwdd9cpg5xw1i6nmyb99zs5ux6xcl2ps34tjmtyhzsaznffcvm5rd9m6e2crjzdvhqk4ofagkuy6xpd325p5sgm1qyd02rkkb5rl3gq2qlslzs0u8aifdkjrfuonijpo3hg539rlofoscy76gimhv35ngs28odc1',
                status: 'CANCELLED',
                detail: 'Cupiditate vitae velit placeat qui natus. Soluta et accusantium dolor doloremque reiciendis et ad. Omnis quasi pariatur eum ut iste ut. Corporis exercitationem consequatur. Ea natus similique rerum labore voluptatibus molestiae. Et modi non sequi.',
                example: 'gx3wgchuxp1ktf7ejjiszfizju6fy6phubjj85s92abm9b0wagdbbv989cfl7dl0o33k5jw4bajakrf0mcwnsctqgscgmd59b9znjisj1c525cx3jo0srghqjcm9wnkcfs3thv52pe7e8hb6vezhx24hdg931fr9',
                startTimeAt: '2020-07-30 20:51:06',
                direction: 'INBOUND',
                errorCategory: 'znrz7wf49plg6maq1kk4u33k9ry1ju8ndtwkg6zqex1nz9btv4a8ufn4ro7pgtfgr59slakiuqkrfuj2lchr60str675dzk85g6w1z3zawlqrzj2vbemxktkp93mhe0hng05cab7nv0lsnt1h3gpmugp49hyd8iw',
                errorCode: 'qbkojy0pr78lckw4fcbrsj6qbl7bgp845y5q7kk23r5r26ihh4',
                errorLabel: 946669,
                node: 4005520934,
                protocol: 'z50pslw2qvay7v7u3f0q',
                qualityOfService: 'vzi82ciny4rii9m7i7nr',
                receiverParty: 'v0cqbvx7znxb9q48ztopq69ctpmezwt1nnmuw37q3be8816w6nwi3dnk4g06enrdw1c4ar0xyqos8k9nz16f2748umkxkzxw4zkkru6c673w19gbhmwlxwchb3qg5c8tan7lquqgjm4xtyqag5cbegwjhvvs7b8k',
                receiverComponent: '9i3a01fe35yv86gix1dffsxkfqxomwmvnznmghwxeg3mald3m9gyxaqd0amelaeiay8ynk3hdtk9ck44mlddmglf8gz7hac1dbzunprikcvds7kmly79dj24gcaizimr0ia302sihx470bo7px2iu44b8m5g6w0t',
                receiverInterface: 'qazulw7wacsh8528221rys5dqgtrbezakzcucrlkuvz5s14qtcfrwo6jwkd37oadsn8nf7dqi2u026tq7n8r3gjqp05wqc5w5nomlcr2nazwo3hghtje3yudxyxw5xgmb34lrw6rdifeh0dbmjptrrgx9clobsce',
                receiverInterfaceNamespace: 'w2vnu14zploz132479p9lxsz2j4b4ocs4w2t2nncrz2d6d15wywcqkdgpse44qzo6ohsfh6nvpzyo6frrmrjng17brqzhmqgf7tut8xb8cdw7o7pqvwtadh1rxz6m617ja458xwgoiynphu4ouq6zagiby5tj8kx',
                retries: 1844248612,
                size: 1392713245,
                timesFailed: 6150312846,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'p9v9hfu04gusiq2jqcvqkqkdll1ovbvc3k6z0psn73kvezhjnw',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'kegiv2gnpm1wz17z9oba',
                scenario: '1amraolfx6hoawg3bx8ua863pudbaa5nb796d7scx2ebvkbhdcfcww9asko2',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 06:36:14',
                executionMonitoringStartAt: '2020-07-31 03:44:57',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: '4f259o7z7p53xsazr8jhhngzwak4ehfvssvk4rb8',
                flowParty: 'w4p4ucg6r0rqtarcm9fkeuz5i0bqc7ijiub9wggkied7zd861wmlhkge3mj9zir0fo8ssejpg3s6v9hthcmapsu57lgfq9lzv5ccs4j1l5burcde7sy9hfbvibm9oo63w9o4krpr498vkdi5pcq1vtrq7csby8df',
                flowComponent: 'u3xvzeg3yggi217uy6etbtqmjg8w1jl6ehdlympq758zxa6jqfwuor66wtd305r1za9lnnx4f9fsbjoarbyspwsktig5rnkpn4ymuj5qujzmi0xyaav3g3tskz8eigmwtrs60wpk21nxqvdlv0fd4552c947sglx',
                flowInterfaceName: 'qcplm71b2q8cre2ggflx26u12ehiej5eo6fmqyk7lrdys5dqla11o4rqb7vq6xt571vgb6wmhxum5l3exq0a2zcmjbzw3lujkipigxjyrm93urt0la9j55j8zum9q6eidlfj82mg978sf2t5zfyd9gb791tqa0j5',
                flowInterfaceNamespace: '2zs5ordn738it39k2wcsg2nk9b8a1lcd7gisauqcktvyhvsa2owin08vn44atw27iike7s7k3u8h1qp7izrklq2wf1hvbm1n47ycffehh1h42xv9041nvbuocv826cn3svr85q58czp9q7a9npa83hh2rnsdbmkk',
                status: 'WAITING',
                detail: 'Dolor qui expedita sit et labore dicta vel. Recusandae dolor delectus est natus dolor ipsam repellat eos. Error architecto blanditiis sed quo quis consectetur maiores.',
                example: 'cu4q0cv0tfzs142rnj6oevppm0dv9lqxgjnrneswbsn8etscj2anr445u26w1eoyirc287iau88iuyq84zessfm7mk8w9z5kpi8vtoy5n3k0kmimptc35hpreiin491o85k7h3wmov7zwmu9vktksghrxrkz8xj7',
                startTimeAt: '2020-07-31 00:31:24',
                direction: 'INBOUND',
                errorCategory: 'qeti6ldz5j2spput4jgzio861lbkgk6wgh1dqk6rjsjkd54p44edql4f7rqlkzd3lzjqkg8f04hpwr8q8oc4e69wyqovctvj6ku95l1hzetw6x8a1fup27sdkiminbke77gzm7t17gdclsdhd5xb6j6i5s49gp6l',
                errorCode: 'ycl8qvx5q54drd9nrybxykk8vh92n7bm9vau8b7cj85a780tek',
                errorLabel: 635723,
                node: 6684032544,
                protocol: 'o0s8yhumwqpcmntogwzj',
                qualityOfService: '6obw4f39oz2kne3pq6m1',
                receiverParty: 'xylnvxrlfeudk8kjpm3nx59jp1s31slmlqtaj5j3aiqaclrki78ng39mwf535uelmvyrymnozfa2kuz2c9863256j7ajs3k9ddtwl45jgkvude10jq3ushtg060yffpspt4rzrnv7v9mj9em6fq4iok7mgk5an48',
                receiverComponent: '8az6bqpbehwl5yedck8k5z179n26ykn2r112ohzndikw3ovlega93zp3gi2n55t510ime105ou9w7ufgtacyxz9j75aaxo137wrp9a22mwjwtwbe470yoqgrtac3hwb4r05ri6f5j7eskqwxvmpeyq8338ac2hav',
                receiverInterface: 'irmir5446yyjbaukuyz8ifg550q6ov2xanpn0iojz8p0yv5ezrn46l1yibva9hktvltbomuxyxnvrgw597iv39hdx8l8nrcpksdfqkmshet2m6ypu801l3vqn650scby8ms11d2qxhvoyc969eoyom2a0jkd62zq',
                receiverInterfaceNamespace: 'mexnzx54lj5pnb3mjmc651mhtukev87uh52nmqx44v2wscj4zofruutjmjyu79dnrk7nmu23d3y1lmitg1gobrpnhktg05rdei30dvyjnfy3866zommrk9rx3n4d1e78bv4zfukgteebpmbhxchiqhivuqvnv842',
                retries: 6553218337,
                size: 7934911460,
                timesFailed: 5809184471,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: '76uo6ta6qn5o39rgs7budwguj1lgd6ykpbulkbenyiftzrpt0f',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'fh6xpcltlvmqpu0qxbvl',
                scenario: 'ptrdpuvlkbg8lhvm12ph6z8fw13cpa9724u0iv4lw9h1ez7j2b0ftgb9nykw',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 01:43:01',
                executionMonitoringStartAt: '2020-07-31 06:09:48',
                executionMonitoringEndAt: '2020-07-30 16:39:30',
                flowHash: '6juuyvu8wn56t830m5go3g4aiytyzimayeosi5ws',
                flowParty: 'qoo6wcozn6uygehfyzl371gms6ad8s3wd88e6v1768rlvs44dwpjebdegtda67t0dgz7zzlgrm4y8wmbog4eovompqen9eze8cij1oh98u0yq8woggz73xr9fp8lsaj8pm8qi04b9dkk3hb2364n1a86kpv75745',
                flowComponent: 'aplqdqo9ccfuz9ozjz0yjomn1cftzw0vq2210kndjt8pz4b8jiyz516p5lcfj4p73ndnvf7jwaf9gfh1xu87lvxo4py5tmf2txs3ojmu54usgmgeplhx4qvnfj5vt2a29ltw88pif36k5orsw2uwyly7sow9qkj0',
                flowInterfaceName: 'na2byjt21qlvl11836uzkki34sd7msx1csdfskjjdggas4f10z1ptxjpaokz6osy5bs55vbcgitk8h649mzs4mcs35cclnpxd9fj496cxy234qwhqwqyiolfrzty7pr78a8qkqg18vrpu5fkvqzhyeokis3fxatx',
                flowInterfaceNamespace: 'qslzsn8fyhhy7wtetqjokhe0z91p7ilqrypieod13fxr7hp1g0ir9b6n03ftxsknfghvfwjyuoycy0x207ud7ag3b1062to5jkl7vcg1qzxcimd0djhijw8puilmnzahfr4p9r6ua8v7l1avo50ao7j5v37nri4j',
                status: 'SUCCESS',
                detail: 'Culpa veniam nihil quo nobis repudiandae est. Beatae deserunt officia. Aut ut labore voluptatibus aliquid.',
                example: 'ikv63wxf5zj20zvpdg163kqe2l9ab2u2wvs1vx00gfr1pcs9wjrm6zyexskyuq3lcqy28n7bdco3db755sk57rqj7lp40ukpb8lmytp8dmuq1zs75eix7metyw7jlk7jo5azxgfn9h6mu2jschgdrft3jq7sutoy',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'm5nevx0enx9wxn767fcjo3wfyl6v72tw33bhz4z452w3p9wq1sy56itvikrztay0wyd34gpagn8pidfcm7af0uoqbqybispfgrwu74j5gosfihppcnv6tuj7wgiit5uyjz97badkyw1qw5c5b6n6upbktim88g8o',
                errorCode: '724ra4wyrgn7ntskj3jbjufadu2yua6s41gnnbc01it6ed3lrn',
                errorLabel: 951688,
                node: 1283202417,
                protocol: 's3tzvk4uhomxzmfexsay',
                qualityOfService: 'nvzxmh6rn14j1l4c2gwm',
                receiverParty: 'fdoc3fah1guqmrx9vju97uks88d9o8t9d30kg4cwr9gtszia5hlj3u96tt4vx05zen2o8ab6zggip73gf7jtko1jej5fcf9e2mu7yzrp0dvtavcgvan6y56p8l05xj5zf6frycf3q4uv7kdhxlmcwdcm2d50k6pn',
                receiverComponent: 'emk7d726rj5ef0jcsdv6s3wwz3nzizfaivq0z5y89lwwdx5au86532dbr82i3qureov2i4e3skncd7fcdvvv7blofvn6xcnamio2teb4a4gfyvqvsvnzurz8g54l8rqovz2n0qa08hmt8y2d23cadkx3gq8cjukz',
                receiverInterface: '8r9wjuq8cdhcut09zmn1abukc96089ekq9jn3og87esoed8803m2c9g6tza08r9ln0mufq0vtc5oenp74utbd1s53yf9369wdddf37jq4d968bxkhprqdvreqxirwbrjn6pq1en6ip624xqiqsgbpsbebzn4l4rf',
                receiverInterfaceNamespace: '0nsgrx67l35ewno3s45kymuw20x1h1m8y6i0jvp1ss46rqm9n306ewddopsnt0fm8347vfffxl4q0bd2vdsi976xv0j8hp8rpmphkfu6m7pjkprek3mb0x6be6pqh4dokfi5j2wrlum7rtq8u5k86832oaihy79w',
                retries: 7423516476,
                size: 3404131510,
                timesFailed: 2556467512,
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
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'hck1pdebgoc4vngkkznqn4og3nhjwxxx3g43gl8l25gyvcu6ek',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'ftl2q648rkjnkog8tbsw',
                scenario: 'up71k6j6eio2p2cvn11tul8y3azvc2nx6g24lsu3zqtyhmfpnabkxtlhpinz',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:19:51',
                executionMonitoringStartAt: '2020-07-30 20:59:51',
                executionMonitoringEndAt: '2020-07-30 15:05:04',
                flowHash: 'eyp65kfxntbvynea7ftheav8t3qmkwvvp3lye147',
                flowParty: 'z1czhiief2zof5ene9k8crisq8fz4mzdkzrw6hql5l9vt4e3dhabpognm582dhl7cv8sby1o6dnpbotbd1t2oi53rithzm6n31w3r07m48m0yy56h5vrdchgp7lo6tcd3gf65rqug0pxf0f4ktxciqbce79l6gfr',
                flowComponent: '4pich5arfv2sylokrd56dqr7iuab6d2gn2288195zyqiq5mk21pp24up6z743ce8ss1msdxg3rlyayc846elgiokip5obuufaft0s0bd1juwxciy550o44niyro3rxrs18vu8huglzske6v6h7y9fdyizadf749z',
                flowInterfaceName: 'lyw937jsf4c1ordp0p132e0emqg1r8of6ytfmsdu5lo7usx1oe9v3bozv97klww51yn3eph29r11qo6akb8f0ftch33y3i0vovcky5m8pzjctohjq5etwk2xm1gfrnsg2kz1sneqipi25nzimheoeuj94w4mwbdv',
                flowInterfaceNamespace: 'u94fdy19ss9v2834b3luctizbpyew1ce1zkmfe5b2qzosvnbl51ut1x915zkiyxr7bx88fjn28v4pgytlqfehfo8qb01tli19rhcctspg8h45k9znqd7w5xjy1hfjclfe225xddl9suu4c23j7blbzt25x09n2yf',
                status: 'CANCELLED',
                detail: 'Quo quibusdam omnis qui alias aut similique. Autem nulla eligendi et aut incidunt ad ducimus. Animi aspernatur sit dolorum eaque impedit ea est laboriosam velit. Porro odit est voluptatem cupiditate blanditiis hic similique commodi.',
                example: 'pq6p5iel7mayjdrsieh5tvtvfh8w20h87ks0rsthlu3fm2nk3j0g63d0zyll57gi7wm8ibm0h1ybewrex2k0g1i8gntjbv7e3e4gtik7q14emb5k1xy59asot8rthaq6r6f48izogy39ywyqq6cjtvfd0xyzea5h',
                startTimeAt: '2020-07-30 22:11:59',
                direction: 'INBOUND',
                errorCategory: '1p4utd6p00d74x1ism4vuch6dy9kbbvx3ig55x7j4m47a2j6tr7keapct5c1wwof4i8o0xtfw5e6nptqx67s2ijmtvwwvsse6d6064znbzftqo0bg9pb0o6nbhau6fnz7rjpnj9w3bu4lsa7z6pvgwdlmm2d6jjn',
                errorCode: 'aqlc37my4kkzezhs47n1t5rzrcil00j594muy7c9rm1ltcta7e',
                errorLabel: 905192,
                node: 6351781203,
                protocol: 'u03u9s1jwh1t5slgk94j',
                qualityOfService: '87mzzw9ndfqwv3ut7qh9',
                receiverParty: 'n4jylmxobb18clqd8i4ei0aqe7y9me6xc6lroj4x3xf62c2g4fl8ghkpt7w3wgyiqrq7qtzcmrsuvs98bwchqq9kup9zch6ursh2yi440zpbvnxp9rs3yby2gxgmnu1mzpqjno0axuzwyondu1ytemt80l880vbi',
                receiverComponent: 'rj5ey2m3wum7wlmnlxhg7jw74c3btjyfqkhsrz1gxfkh3dta8jhsjf1c8ebnshv86cn3g1biyt6a2lm8l3fnrq6066uo14ohx8qe7bmtymdkfuodzjhzua8ttj5g0ccu9yyzewba4u1nlhabsmw3az2q03a5tjxa',
                receiverInterface: '5gqysi5r7eqtig64jyj5i56k1d1phsbhwyfgj7fpamajhbkadz92y93783jtn8hct7unhc2vn4g78uzyyfbx6dynpu7oza9yjcvnqqbch4fhcdg4tk4n5iqh0l730o7kch4ff6zyeptlngdwombbwu3g1ivxa8av',
                receiverInterfaceNamespace: '6fxzohayxzz5qkbjr9vry91b5dx9yp9h6undochhqvb4jc1qpmwjusob1fije6o51kwy98unpyvx05xheydl73rlb234c8klsklt2jidudc5cf8d8653fufnzkjo127d99a73xu4g6oxnr5c9dazzxuot1dt8gfb',
                retries: 9741572939,
                size: 8905866326,
                timesFailed: 5556197215,
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
                        value   : '3d23e868-8514-43a9-9490-10d3cf99a45d'
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
                        value   : '5ccae1b9-af59-412e-bfac-deb9d5c66536'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5ccae1b9-af59-412e-bfac-deb9d5c66536'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/2c17d9e0-c7b2-459d-823e-e46afad0b88e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/5ccae1b9-af59-412e-bfac-deb9d5c66536')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ccae1b9-af59-412e-bfac-deb9d5c66536'));
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
                
                id: '6999a94c-2cf9-4394-9827-3026fe3706aa',
                tenantId: 'c9f55423-6e8f-4274-a29c-44d399b83b35',
                tenantCode: 'sawyw7zidkbswgm744k3w65tprj9d2acfjt6nwrb47g3a64gjp',
                systemId: 'f676e7e6-6be3-4848-84be-0e38dd6721c8',
                systemName: 'dxyeoed73nx9x611cwah',
                scenario: '7ugxw6gri9lia2wgvtq9okdsous0qcla3fwzljoe83595tpbsi7rcbbxvq4r',
                executionId: '1104adbe-2734-4f75-80d8-cede0f794f3c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 15:33:32',
                executionMonitoringStartAt: '2020-07-30 14:13:51',
                executionMonitoringEndAt: '2020-07-30 15:43:51',
                flowHash: 'bakec0ybpxl0gr4ac1ikoxbg869ujh658sskuzvd',
                flowParty: '513o4somwdniw98qvlfh3il2x7g5pperjb5yj0iuioqg0gr7vaeb7223550rzw490vjmhroo6e9ictpnfh1t6v0kgc7gu8ov1wufsoum4a7pvrwckdp8yds2uldemq4y4qtxgatr97qxti1nwo09qape9frxx2pw',
                flowComponent: 'dgiqlpfuckc9yy0agg4rbfemu2rvhkvnaw6ahk64hyhnds3ptjvifxq1ofplgkwz2xeqcvt3bcytx3jo9dtmwjwzn1t26mcpwmhokkyu4mfrhhqe37rllvwj59h0ed44westdsax5lwfckrrarnzi48peruzf277',
                flowInterfaceName: 'wz0xqqstze7e4h43nlcglz9w506j1nvg7y9goww8npcb1v73beh9u3f3i0or9cnffy5jlj65ovq5z89oyxrxjmabvzeomyxvwzb9jup3q2wqcl13eaoogcgdp46lr4i6wa9g4yuxdod647v27r5g596n5kzjlqtt',
                flowInterfaceNamespace: '3kak5uja06vegby831owumsk1oc7grp1nko8my43apyz8wpose4mnxxcrtecc9kp6rt5htnyz0eho41e7sb334kjmpy3xbs7551d7hcvc8ot1vrunzh4myblqn05o1j2qvhtpcq5vp6ituy4tiqih7rrlvs68j5k',
                status: 'TO_BE_DELIVERED',
                detail: 'Vel voluptatem voluptatem amet eaque accusamus totam aliquid. Voluptatem veniam soluta. Est voluptatem sint velit nostrum vero earum. Ex exercitationem deserunt vero ea id ipsa ut. Mollitia dicta nam quos esse.',
                example: 'o800678pzuw00exvpomklaa8rd8j1p6u0opqpp3br9r9pszd11bpr3yjz9m3jl9e4f3ybwpfmudtkl97kkz4f6jsjkzoe4kdp1lhqs7jes7s23uu13c95pq790dxtscjrgls7bgl6dezvbmqvozhpuufindknmor',
                startTimeAt: '2020-07-30 18:56:50',
                direction: 'INBOUND',
                errorCategory: '4pmaknldwiwy56j0tnxovudc5nc24llhlco4pwl2qhajgtig3lk4vezownw0gw95l0bxsw5xxgyh6zf8xbguajeu6fzv04niltku5el6h770529giu4sc56eht2an7egl3cmyoerfvl12etxcvwyj5xznfe7x3ra',
                errorCode: 'ra85titupn4574b5fc6u3svlo3p378cx9vf6ka118u7so8cag7',
                errorLabel: 508836,
                node: 5016702280,
                protocol: 'zffxxhkif96x9t5v0pmd',
                qualityOfService: 'v0og6f1e0pdrs0zagrgd',
                receiverParty: 'jq77ujkyh8zgnx4bc1blju4rf72wirciu9kgvf8qgo72u1c7qvyorz359svw0xcu3xxepo6f6sn4rpj41lu1lopi5xv8piu9ll64zdyaqrovn0oj5oa3rwihx77onvcaj1pewa9zesro1cvuty8jjbkhzudi358y',
                receiverComponent: 'ciitab88ertlhhb6mkj70e6c1g7k6178b69w4s3m5xu28boz2qhj2iubhk6br9c1useocl3snhywy44m7zmj4jfczagliv450j0dvicm335bb73rro1n6lsumn6mynsrpvov3sqg7edkp6rz5x0o41c5ww5yvayd',
                receiverInterface: '894uc06bn2wqhguy28nnxhugvy0z5dojehqvko3n72wte9pw969mtjm74oxb4whfykdhcg38362rgqeb3909vb7wbrdarj5lskzgzo1i8olfzctnno6a1fqr83bgb3h0fbupr9imjmycnl4i8num4cldtyk7ou9t',
                receiverInterfaceNamespace: 'm1ucus0hy2obdbbaf9ub74tje5wz2g58v1ophamc9k9vhzpn9ourvhlltjktrka1v3yochn0i9r7ae2jjj9ovxgcmqqvsbgqy3tw0643np0c9v72elqsgm2wxoc4aa9zrvv1mt9t1xukmudbpa38ihqam60rmiq9',
                retries: 9607032720,
                size: 5582484384,
                timesFailed: 7087075796,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                tenantCode: 'wr3isfgfh85nnfgzv5xkxy4r8m22frbyjke6sf545z2rno7apd',
                systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                systemName: 'o865h7w74kg9808jwvm2',
                scenario: 'j7bczhh0udrpoj3q6ranxw1jthwi6sky9lanbpzetoe6f3ceddner02pkq4c',
                executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:57:59',
                executionMonitoringStartAt: '2020-07-31 07:58:36',
                executionMonitoringEndAt: '2020-07-31 05:36:49',
                flowHash: '0g00tbdlx61h6ywyo11q8ixglbkecgvmh2itz2zr',
                flowParty: 'earbii7psibhocghhajwhj114vfs72542hourmx4vadupoqfy8p99ktbow6almklqrx99x1g97ec4z5hqhr39nq3ze8kn1oaquj3yeahpfbxod65lp08dcufn5l2hzrli8505hf5ad4ag8rim5emyb1nnxw5xaep',
                flowComponent: 'd2uhj061tr49ufqxbyodd165nr6chlx6fkhv80x31npbkq5tdfeejezl8fi8wiiotvz1bx4tge5iutxkk3yr12k16kzsvkgl0jdnrtt98kd10apujo8jqszq1p4t485o6f1iht95jhe6j34z3zyz455427p31wtp',
                flowInterfaceName: '1pkfdma1dpu9wlb532848mqx055xkge8vqrptfn0d8o4s3po200i9oi22oosquq2ujs0ggcxt31qs9hi6ixbvjdz9gxesed6k8vdxw1fbyes497gv9nyqpaqj7n495p2z4psxb4xdlx2qme0hp92jksax1yaofwd',
                flowInterfaceNamespace: 'yai71i987fc8ug2augghtyy4tqsqh8vgeyx2englug31mur5nv86b5530dto5tqjsi6u8qb16imt3vhkd7uuag22nxul07qrnprah9anu9l0sryfhin2jae0pxf6xhz8fsjlqyfhzx1fnykq2gh18n7lph9f9zkp',
                status: 'TO_BE_DELIVERED',
                detail: 'Consequatur explicabo incidunt voluptatem. Necessitatibus eveniet et sunt voluptates id esse quisquam. Ad est temporibus animi quibusdam quam repudiandae incidunt asperiores ipsum.',
                example: '6hn3paf9c4lko9bzx9dyziaww40x2bqizo34u78f8xri8scye572fpz0sxtaeh1zfj4e4maimfbzgjckfgcrhzfdtyk0db464xlp204tr293lyzj0c3b0ecui6ysycv33ps7zce53w928dr751zho9a2cqrhppyx',
                startTimeAt: '2020-07-30 22:45:22',
                direction: 'INBOUND',
                errorCategory: 'hxzagfldl78tccbp9vx9umufnpruiljkwxc0l2wm9yn0fnny4w0xi5i8i41bh5e02fhkhfnwa7v4k7jm3fhwaub2io3gi4hv0e6s8716sgxcsjgpl25tz2agbnjby4oem2n3om46iwwf3sxoe3iuls5raemnklp5',
                errorCode: 'jzxffi57rrurfrm0hdfdbpgt7s4duui1e4udbnj4v3cu7rkld5',
                errorLabel: 901928,
                node: 9853170843,
                protocol: 'ivo6dt2m0c8ik1o4d4u9',
                qualityOfService: 'uwvjfbk75tmg92otj9fl',
                receiverParty: 'kst56nlqjoz8sw9bp3j06czqw0x29fec47nf8w7k8d6tajiimbn2x8p1hczt76985jjucjamm2lsoydiuqe16tli49i4mu3xz0izph93npuwdnkhidxgvs14n1lq9zuf66pqdgx6t0llx9btq0jzakdxz5x3jyfm',
                receiverComponent: 'hlgmc54pq6l9ioo9mgls5n1oana2v7awdttfzz9kt9sz88wbd86rm7l5rgin44lbsioawjrn0d0xh6zl2t5y7q87srx1jdkuapliqq3mwqtqqo0yi4orycxrk469u22tnc846oy485p59qbeghae8ukiv5vnwqcv',
                receiverInterface: 'xs3vg7wxi7aeigm17hvmalsc4wxwvrgwpnxz49dq58d1p3g6uqzjgfgax48s7mtg8bg012moelmk1x5xc4i5r9um5e6wyf4zmevbybksyq3ey7qj4qn4q264daneit5h2gmkpec2qfz3zoryqusqc34xlmfh3kk3',
                receiverInterfaceNamespace: 'jifhcmh3ct15rwo9wseseo387waq9s8aety3klbxjxd55bm6tj66a9al6xflwl0k206ay6f0ux492q4s03nan63cbn04udvd84i4fovwz26k99thsziutl90c68ccibj8og9pm7ses87gka9lyfvwtn2wcy7jaa4',
                retries: 4687926315,
                size: 4009397504,
                timesFailed: 6984576501,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ccae1b9-af59-412e-bfac-deb9d5c66536'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/d1159b7f-c5de-442b-84ae-6334a48b7ed5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/5ccae1b9-af59-412e-bfac-deb9d5c66536')
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
                        id: '9e23cd7c-cc9c-4885-b64c-cf5893286e2b',
                        tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                        tenantCode: 'qorpdcmkmud76vh7jj0tz02ygtiw4ey5qb16ajtqoc4e0flhry',
                        systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                        systemName: '888hea9wtwpcqjhtusr7',
                        scenario: 'i383ssu9r6xkf19ptxxo11jdtarijbj5lhjikwlec8lgz4rkhrt9xl43se1e',
                        executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 08:31:35',
                        executionMonitoringStartAt: '2020-07-31 13:38:52',
                        executionMonitoringEndAt: '2020-07-30 23:02:27',
                        flowHash: 'gpevg7xhwtqgfasz78n8a7utgn7rjxer08lksl2l',
                        flowParty: 'wxlgeriz6zsdd94g5gjraoa7cy346j2y5xi8ztuvejyxuuwj5tp9m3kta3y5aneojkmrjyqpk4dnkob7jyi1g5c7rrjuz63yi8824qamv07xweb6xo2tpsb4p7g4jryjq6ye0as4yg8xi7giaqu0y5lvih2phdzm',
                        flowComponent: 'z32dyxqb9a1qrki57ofaqoav5idvzgt3k41uj0ai0blnz49yexqsdku5j5oloj3scfmv8zt53eud1zgerloj6li1wwxnpyevun4tpgs0daez0e5itg795b6hy2brzw083ucqblyqt172cdp3zjnv9ci8kpcjltnq',
                        flowInterfaceName: 'ijgph2o8wa88rwsmybb9xinf729g5yq5vjz27ucx2hohgdggwt0azqmon49atu9f6su75usx5ookai0s83v8ftqngbk08o5luepx1nazrkfdvxxwkevv5smu2b39dls5dzx2b1q9ddywv25sjpo5dbhkgtc8axxd',
                        flowInterfaceNamespace: 'pfu0vlfxh4xkp7tv1im2gb7qz3j0v3g848saqsa7kj307i5vq176yql1t2xq3y4nxs91yuenxuhsql1pcwlep778p98rquabg2to5ixzu4fjm4xuqzf53jq0n7dyn6pof86rlmmvceh32ywixiw9mqe29bzfmyhe',
                        status: 'HOLDING',
                        detail: 'Est et commodi nihil rerum. Vitae amet et deserunt est velit dolor. Magni consequuntur sunt eos. Repudiandae ratione corrupti et perferendis deleniti at quam aut quis. Et omnis qui possimus asperiores sit et.',
                        example: 'q0yx49fv2jl8s2zjrjdqk6380xc06xtyqlcsepmhn6yiqo7uhrijfu387tdy4rqvk1a4b4vqx8uutac900n730kieglou6831u8g0qsbuhruk9e12k5yalne1m9vmabc4fpmw8s3aj1rq04knydwybqc20afbcca',
                        startTimeAt: '2020-07-31 10:30:40',
                        direction: 'INBOUND',
                        errorCategory: '08smh2owg8zhzpef1f8oggsgga2ma357lv4qsrsu8but29semuevqhcym6xmx4c3klsuggttroxmhbqccrh6n3qdz3d1ak6v5psmaxlr8a66h6ngqumsf2qpsieivcljrvvssjmidinkbobzpam67krrvoxxythk',
                        errorCode: '3xwqo14yeuho3iue82418a3l0lqkq55coozq821i2z4l4dg1ak',
                        errorLabel: 202251,
                        node: 3985366877,
                        protocol: 'drisfslosf9oiuva7vap',
                        qualityOfService: 'suu1me6xh64e0kpzirlm',
                        receiverParty: 'wrzbhgx9b9lqcls8utim57qdrbisezw1571uays94rkp15zzo97vzc7woixyr0sacymmourjszm34df71zbvrivb4ze7inyclz0sg7nvt4874ghefuviof89k9vhl3eqmkjq2k4qk3z3ylnfu39as7glz4nw59cv',
                        receiverComponent: 'ya1gylhupnsgih0gyqij21pkn09sod931bn5uuo2rnbgppk6004px32kxjp5g6wen0s88lyxcpb5gipgvlvif41hiuonarsn6ujny335j86vu42819qqx0dw5r6834cu6cqjgp8mje83aiwk8lndmd7noso9orx8',
                        receiverInterface: 'bf11z4iegsavs9lfgjkcffqnhzx54dafp9sw69wb2cl7ld5ci9yw4a4fyr20pxhu5e10x33ta37cvbb9kcolv35bahm3i6sn55zggznihwtkunp26ghksllwyz2cveynczpyym50wxr58whl7qytvl01xs8rtt7y',
                        receiverInterfaceNamespace: 'l2q10kpfmrla404nao9eycy8af0ddwl4us2zy0f3wp9i36aeem4v9af1hqtuxblev9xmo2ztpyr6wr6famp3aqyo7qdoupro78rq2lbcyaykcfxcohg5je2pfkpljktbwubzh7s1oifpjzw9917dbq2tw19ahvu7',
                        retries: 3867093784,
                        size: 1980462321,
                        timesFailed: 5814141134,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '9e23cd7c-cc9c-4885-b64c-cf5893286e2b');
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
                            value   : 'de472f3f-698a-4f87-b788-d077aee8884e'
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
                            value   : '5ccae1b9-af59-412e-bfac-deb9d5c66536'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('5ccae1b9-af59-412e-bfac-deb9d5c66536');
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
                    id: '2245ece5-22b8-4574-9cc6-2ce7788cce1d'
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
                    id: '5ccae1b9-af59-412e-bfac-deb9d5c66536'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('5ccae1b9-af59-412e-bfac-deb9d5c66536');
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
                        
                        id: '338defd2-2230-4edb-81dd-097e673041f4',
                        tenantId: 'c17af84c-b533-40e9-a702-033ca88b831a',
                        tenantCode: '9s7jgm1ddtqxpy496jvpayz30yg11e6789m5npdyrmi4nvbl4m',
                        systemId: 'd8c2516e-c333-4132-a73b-46944dd0a31e',
                        systemName: '9nopx9f7cu538fov1i8k',
                        scenario: 'kgcfs1drd818eabf91a7veoxbl9sqsbfc2v1ews7r7j1x5p7atei57nmrqt1',
                        executionId: 'a0f0ca84-b25d-4c92-b12a-d61d556e35dd',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 01:21:19',
                        executionMonitoringStartAt: '2020-07-31 03:33:51',
                        executionMonitoringEndAt: '2020-07-30 20:46:31',
                        flowHash: 'khngltwk9clnhc6zdput9i9wnfjclv6e2plcfmkd',
                        flowParty: 'qaoa0kyqmfudwa5wtvb56eq9vznge38j1vhl9snp33pgwuk72g0zsvdzmoqorcl8bgncjw4a47ptrswqr4ou0kh5uewvs4ra1b2iyux6vfud9k6iv6k1o6f0elbo51avs4q8fbwxzak3o6l9vcu7rccb0pkl85m3',
                        flowComponent: 'u9rv9hd4515tul9url3bf40f4gg19evmiw77l9vpbvpj8pwkwc984xymnq3bta852ko90qbb8v1pnmk299zjy4env1f6m3yv09y6skimt98o010qzgzwgcdo4qtfqq2knruxlnfx8xfxg5kpnh09hadbbit12ihb',
                        flowInterfaceName: 'o3hnum8bqrbtssos62qzbwfiw5g52ic31ixb70ycl40r683xpae8vxabsctnts82emn8nt68fsh1f1j4i9aw3dya3x89uh1jpa08pzar9cz2logn26m32ha3r03vgolcolgn852yk0gafopy9g96xsl4g0twlb3e',
                        flowInterfaceNamespace: 'sbz8q0fbpsz4r33za2r3mi7ti5cceksvtsx6t9j4y5cac1cn5v8ekipdx3bj6vkjitkqtgfswrazgm4gbmb3qk1o8rj4gs2r4gm03d7456iojs9bvm707nv8ae9sjlg664p6dxxz7vrhpmefdab6nqwmcipeyol8',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Ullam soluta minima nesciunt. Libero repellat qui aliquid et omnis minus rem. Libero magni et repellendus itaque deleniti dolores sunt asperiores cupiditate. Officia dolores aspernatur culpa. Et accusantium recusandae ducimus nihil consequatur illo.',
                        example: 'xcldmaslvm9azvyb30q80x645qx9wfsgl27awjlq0b5911dp98hvz4zpzeo0picwxehm5k0ctfkmnes04f6mer4jqykiy4kxm35aa97u3al208x4u6e26s0slx8gr9rcpkuxp90rra0ao2rlu1ldjz52hs9y7hxj',
                        startTimeAt: '2020-07-30 21:30:02',
                        direction: 'OUTBOUND',
                        errorCategory: 'w87hm5tk4kcz55mamctt7psgpwky1jbnp95z32am8l0mjcodocdiu8wihskm4wsm0hxc7vg49ap2u5df6scofu8jlesxyakqny9y24zz28aws86tkhvc53h3r5xg52z61bv4tlyh2xdpb8yeh7zwb04tlpov8aee',
                        errorCode: 'vw5sucbi4a87c54sa91f44n5zk2qyy9d7a46zyc8wp3dmzgj2h',
                        errorLabel: 506185,
                        node: 7483887771,
                        protocol: 'yc1jd976lanw3b812f7l',
                        qualityOfService: 'mts8d41x4blws3x4q9cx',
                        receiverParty: 'tdi34n9e2hwbep7bsp0oi61s5p07uh8xybtjgig457wc1l6jauyrdszjaow2q2bp3y1fjyjhhfphhus59u1ga2pw3afjw1oe281u04qjo7w1k0v1iu4yn75n2gat2kc6zau9gy4zufx1ulc2j6u838feuc5pz9da',
                        receiverComponent: 'uwwa7o3ljo8w3gxh3kpxipaf4b8734ua9vy7hy7vuu320fpn74bz9zquujbgzrv3wwvrh60p500etvksxgt0cs16c34luphcqmmyrzav7i5xk7h87byd1t0eoyqshz9ke9apccupztfvtrnjotlxv984meekrirl',
                        receiverInterface: '1rpjmdr1cr73jsfvrua04y6q4jbzrxaipfyt2b7x62fxd34yc6kk1mt58810klj65juqpz56sy1sa7tmeuyfs8yza9853nrvh7blysvquzevsczteq2uhwmtgugysa57xi7izjxm0ial6oovqmr3q5y07a6ziy6i',
                        receiverInterfaceNamespace: 'ooyac1i5gza40wd9k5gxmegt52ben881oa2qskyl15x369ejnj8mw3g2cmxlvddphkdzwle3k1p8o6mw40394j378y29up7w9qjpp8mfqi5vd90uxb05qx3v7iu11e9ji0watkq7ezzw8eu69od2rdrk4huu3icg',
                        retries: 4127641936,
                        size: 8768845930,
                        timesFailed: 4556533922,
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
                        
                        id: '5ccae1b9-af59-412e-bfac-deb9d5c66536',
                        tenantId: '4b3424f4-bfc0-4855-b611-92ce0ca257c8',
                        tenantCode: 'don3hp5ohhmck6ppjnb647c5wqw4c5raou51rf6ce1j44jf5us',
                        systemId: '63f20a59-070c-42ca-a5b9-596d3dae92c8',
                        systemName: '90babas208kgrlkaw0di',
                        scenario: 'iaapw9hb5x2t1dtn5os6ra8t0mucbonsnp4yj51h4lbomzkcxorclyttuint',
                        executionId: '0c5378da-c2e6-448d-9500-30bc48c60bbc',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 12:45:47',
                        executionMonitoringStartAt: '2020-07-30 17:55:24',
                        executionMonitoringEndAt: '2020-07-31 01:18:00',
                        flowHash: 'ou7we72vaykp8xmw0qsri46kr2fdjpfb3pjmxvag',
                        flowParty: '4pk5qmn2jdp88yhy00yxuehccy7gv5hhfhvy2d4uveywql9xzvumm1s93iqppatsx8cwofdl3r9w7klv3ilc1bwex172f1oyoiw6iw3p0nh9yjhdv9dqxzkwk92jvagsqk0h27zfot7uc73to6eb14nbxfs35mpi',
                        flowComponent: '1zqan3m5g9akfzfw19yobiz60038w8gamdpxistfqe2dhjun2to14xs6gxuczbe9o1v0n3ndommjz1pa74srbjgf5p8dyd049zomo3dj3rrc5qcwrvjn9hubt87wspenleozmm0gge0jki6tk2dcta07lwtsfu5b',
                        flowInterfaceName: 'gq4vrbz6pc9kao6gbea8un6eepfkcb5rzpumbeh83btdkywnc1hppuilkt81fxt3w0bb6xt0k8qzqo6bbliuwrxdrgyq6g2z1suxc1f1sf1s7wbpxfaghonz4w7dwhj4ckkz6s2xamztbi3julaaxcbv0u97y95a',
                        flowInterfaceNamespace: 'impeblqy1l1qqiwpaeugkdovqd9dunbqvjv7kwqy0l4mtg8n4k78n0rp61udupiibmhbeafdl84jlsjgsltu9b1unt0d3uiq02kxx6i0mjm9kja5eivz4qof1h6pffkw3evad4ralp9kp8g6lnrvan7xb9zxth91',
                        status: 'WAITING',
                        detail: 'Quia ea et debitis quis sunt iusto. Autem labore fugiat placeat blanditiis ut veniam ratione velit. Officia beatae numquam et.',
                        example: '8e6au2ljbit5heugnz13k3a0umy6245n8gadcv07jnk60yg1ccoqhrji0qo9g07hmtdufj5m9cvr2dgiad1vpt9aezejvrwfl5dwo6z0ygo3tf61ebrgo4owozq3mjobxp2lhi0gy8darj2z3dsowc3fid2i898j',
                        startTimeAt: '2020-07-30 22:27:20',
                        direction: 'INBOUND',
                        errorCategory: 'xilhma5o90k8ncb89h8w53uqcyc8l2fd45osqt53o8my706e6doxxmq074eywvs6608mhrzp0azq1lxzramx3e99vtk1mn597yiqpsrh6kkjytuq33j15vjy26lt5rc213fl9wxheaa6a4lr9iq3cosuiti2pw6r',
                        errorCode: 'beuimq0l911fsvdx7mvjg215oifhnbzkl30g594cp94gb5pek3',
                        errorLabel: 113364,
                        node: 9656074311,
                        protocol: 'x58jsgcvnxzmblxlmuki',
                        qualityOfService: 'd2p3phdr88ajyo22v8hj',
                        receiverParty: 'jc0ki3ybp71cz40y3qxco6ny14jeb9onjnher23izoj5a4dqlmz8d7ti58erbymxwdjfnazy2b59q9v70e60kob69vvqs5x5jhhk06nyfmcqtu5k9c7li76vdxktpekeog4e4k76env56edrwx472pmnwdmptmza',
                        receiverComponent: 'ah4lsgzktu8gmiat13qr44gau894ppl0162uyvtpg1oyixdds5edzn2tl7we5hn7so20pl57x1daex17z39yjw12ni6e2kudlvs2m6267e8huit0fpvtiiunzs6qso7y8ux9n6yhvre2dwohxq6f0ittqro6daws',
                        receiverInterface: '8lafhrit45qgz4w0wqx53jdl90226vjbmjbicthgu5t80cff7e1httceaj22scixufswjtv822snroavwuc16kauetyjreewcrs4r72f49tuiu5po4h7lffqfb3ih0mu0o4ljzdunv0k44xxhh2h3wwdy9kmqbnv',
                        receiverInterfaceNamespace: 'i5j6jxpzairprrnegr35ozrxykg69myfmz6gwzc9sdbdm9nlqhkfon28yu4lddya6bb6g4h8b47e763udgv2o33cuw0e2mkurovld63u10t9t7gpmekxis2huwbgot8d9tar19mq9zcld8ji8pmktiiywv0caews',
                        retries: 5778678776,
                        size: 2542004485,
                        timesFailed: 7290009866,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('5ccae1b9-af59-412e-bfac-deb9d5c66536');
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
                    id: '07ffcc43-7c0f-4b4d-86b7-db237ab353ea'
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
                    id: '5ccae1b9-af59-412e-bfac-deb9d5c66536'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('5ccae1b9-af59-412e-bfac-deb9d5c66536');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});