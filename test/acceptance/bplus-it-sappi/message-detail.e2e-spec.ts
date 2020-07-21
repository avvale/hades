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
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'aikizedcnb6mhmxqo3qa',
                scenario: 'c6aegcm1jgbx6h5xg8qg2m4bvx52tbjnh20shznby9wysr1wda55pj2yydvn',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:32:10',
                executionMonitoringStartAt: '2020-07-21 23:13:48',
                executionMonitoringEndAt: '2020-07-21 07:27:36',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'nckls0q4et8w67m6ua30fac4ei22tofkd0ku9a7n15h294tx1mx295q56lqhh5sjhz49u3pwfyaku77gd2s93hmiqaepf8mf8nzw33o1ngrfmvs6ad2szbaonj7spk50dxbaaky6nhersgnkffktyp4fht8m6wbh',
                flowComponent: 'ztgdz3jjr5l78fbj18iif5055t69obm6sz4rsjfif9g81t25kaq6h9xicpwib13uer6dvzguja8y6luo2srfl8w8qi0mzcvvhhcv7ln1llfgmu4mx4n903lvb5y30a0mhmt8aphxqjkvbyq79w68nix3h567iho9',
                flowInterfaceName: '2no757b6rl9phnjfuz99m2qs25mt1eqmsxwfslcrytz5r9qi98x5vtmiv2a36year277y63kmayx02ncsz9wpprc7sdvo2rr13ab4rubegbegc8ws914de7b07w9bnxfv0k2gwcca16oi7htsbwcyugppv078klf',
                flowInterfaceNamespace: 'uh9c5lcp29qlgnrdpfuhdrymgronhufezotjpf6se64hrb3mhjff5044qbf8g7vsuvkysav3oxd7u04wrdd16mvn1yubas8s0mv06cgv4rdbitrqedy2rky9cljxw4il7o1ak0fp2tvq7jytigzg1tm5um7mo6hc',
                status: 'DELIVERING',
                detail: 'Non qui nihil. Voluptas eos aliquid blanditiis et eligendi. Soluta et magni repellat. Reiciendis iste veniam. Id exercitationem voluptas.',
                example: 'zck1f2qyfteon4dwvhf7ncv401d21khzzq90g7gfm9qgv2swqqeeiw50iloo9t5by09ci2hgel4ezalwwr49mea4rq0xcaqx6qtnfdusw6fkz5w98f2cv4ko7xkkqz194zb0rtlpb6c98fx5wddxngaljqnh5v1d',
                startTimeAt: '2020-07-21 15:54:36',
                direction: '9rqw83ebr6glhryrnmm4',
                errorCategory: '7bpve0ver7p7nyls1xj7sbfxac9w6uvndyqo5kz5jta5dqcjf0lh63cvvrirqwk218z5eoety54ta560mkim12ip74v0ixkmesebi3xlq2fgyyu2ffzfv1hfazxmsdjqeplcuuev53codt5kynr5fms3qlr7lbi9',
                errorCode: 'jtm5y5gm7bofwzoqkp06',
                errorLabel: '09v5c2ca7cm9xpv7hkaphit4ksd4if74wdkpzpvfmoj6i6p4rqctrnu4okcmc6a7mc9pg6ruixn91m4c9ek03c1g29d2n3twyq3ysakr57gjim4odvt54fl0x39wsqg74ozkj5r4yer0apxqu4nnbpwhtc30h4vt',
                node: 4039509176,
                protocol: '5q7d99a73cb3yn82zfzf',
                qualityOfService: 'do75h43oplqyzbizuk2a',
                receiverParty: 'qjcqixvk424vi2d0uz61cqvqs1uc7fx2vybuizwkuwexkxcnrts66rq0x96t95ojleo2jalsif0fky14scsght1iz10w69e7zyy89eoitahvmpr9g29fiwl1i2va82v2ntxypfw2ny1peav9wqh64ezps4amipmy',
                receiverComponent: '9odhvqcwadxbfc2e84f4hty7mro1nfx21w4jezh399oizhruq8oagrgavqt5rlz14sb8ep7e1iuh7g0zthv0nwvvu2pj85zfbw85b2d1cn2ldf61efzd9lyt129lo2zxzsmu2zeztg8m0fe3vcvus13xkfhlwiho',
                receiverInterface: 'fisc5qlco6ejdg3edg5oumkmsrp9bdw129euwklv50cm7e7utna086c7h3wvnmjuom72e026ye3pjy69cs1a6nd9agsxml5481qxm3srmt69dsln1lqepr1k40xfazpcru70prrgbfg250mt3en0eby756mqcp4l',
                receiverInterfaceNamespace: 'glj5ayy9ak24b27dgoj1cdz19f7zox3w8qrd9shubpa6i136xmc90w75oe849l7ekb92opx6gvjrh5m8vgrh124ydm1zn8qdshwdhwk8lp6tj90crncprmleufcumv4k6xgudo0mg11u7xonzc3tncaplnhqf66z',
                retries: 8718807169,
                size: 7681267002,
                timesFailed: 4848754324,
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
                
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'ncl71xdtx17llw8ctq8r',
                scenario: '4rauo0hwwv8i69lqkpvs9guoazpykwfuzn04e90o0vyjwnnif8qjapcdnkuk',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:39:55',
                executionMonitoringStartAt: '2020-07-21 20:21:30',
                executionMonitoringEndAt: '2020-07-21 05:17:48',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'bec847rn0lb6unl5g8on3ty4b0hwx0b0kwbwb288ypm8zbdrb1l6mop1n5su0ir1fknqy9xzua4plruk7rfuyq077l5cjc3nk1yfmfxmliv0vwbxibhkx6ffexwhduzcyy8vs13gtuc07qzetsqtsfx3ub557vxs',
                flowComponent: '3vigfualrgkx8eszqoq9ld9r1eam8u9bbz4y2nnwogygkyd3mu5a6nbbauwajeblvvn7ly6tnkyyagqtwmxo4k5nxwqtyxci258bb6m5qkxc84yv3f5r50l0llc7fmgyxtt2ybr457r8yxn87n6apht819s4tm8j',
                flowInterfaceName: 'fxp8fwzljrafw4ufa9ims2zdaz61lqeam7pvud5qopcgbas8j2jwlb0cl5rah5mjkmjv5g42gulo7b918jct0yd2trj51flafe7p3qcbl9q8bbljyc02sslbn9t7y8xug3uliyy2u3v4a0a9zajvp8po1xjbs4jq',
                flowInterfaceNamespace: 'sz50p0nz11i9ppael5jnu29uu39lgy5vfi5dusn8nz0f2wd6svyqkmk5skqzxpk8x5dz2ezl6brfrrho6hgfnci3vi5g8ztafillmiakp3po6dq9sm2n7w8h021s98s9k48lwdic96ilu9fnajtwh7d5ikhjlent',
                status: 'CANCELLED',
                detail: 'Voluptates nesciunt eos sequi praesentium tempora saepe placeat rerum et. Est qui non earum nulla fugit consequuntur cum quia. Velit aperiam illo neque sed quia adipisci harum. Voluptates nihil aperiam saepe. Debitis non rerum voluptatem sed repellat.',
                example: '9b26zpob3dzhi2jd7bedycyiqk40ed4qvy690k7d2k8ts2zf4wwhhsv7okeu6h2vuqn1hczyx1qz0s1vo2gpedmw2fvhxxoiyw1vwttbkew59minlafx039gd4obt18ugrfpvvclligjb426ezqi2yp5y4h9756w',
                startTimeAt: '2020-07-21 04:11:52',
                direction: 'gkundyq4mlxwqmy648xi',
                errorCategory: 'gdyvkn5n98cdykh5d1lro40m9s1a040f3tl72kyarvzrkb3rdwzqm0b0xf2te7254lmw8al8nt8934y5v80p56dn12sd9v3w8ujeyfywfcls2rait9155k4v0bzaftdl2ow96jhqju0a341wk6cefchwumibwg4f',
                errorCode: '8c45dm80i5jon8ql6pem',
                errorLabel: 'iomwtkwj07egfg5sjioxhzf8ddhrt7uarb3u2jcgkd530p1g3696llh690p7xfsb8tos460eu85yq5hk9dbrw86sdrkgw5gnxnjo3tp0s7iunzjoavd6d04qigrrokcafo5zxq4p94gwi7ji3i81qoocg91uul75',
                node: 2935655139,
                protocol: 'lqjgdpfd7xeb4cqpwqdc',
                qualityOfService: 'jjsktoereb5blrqp44lx',
                receiverParty: '7445gh0fubg7yr2n3cphn8qjwn01ikzi4ou0vbacuycj2vvjk8ne73pbxbs6nrjl01cdaqbwtiv97zv5narcb2e2j6erj2u80zd2y0vcsw2rz4e6vqqmu5j0ezzuwi2ohc2bbatvyios93zwh5dnbfov9v0xm5ys',
                receiverComponent: 's7m1jfkd3jx5tkf1fbwj8w4ew97civ0n8rxts26j5qzr0mwcxqqvfzjgo7wltko9zrqs714elhqlovoc5gv8qe8q8ofpuvx41aqhpyrmxb51qbreoqujz2pgvtgk6rl85linutjbjrf10qfdomttl9d242wj8e71',
                receiverInterface: 'e3bd99ojxg4m4kwco485cs0cjkq6fbmr43qir38b49w97748m7n7rnj2w4jy2euzdqk5uo61m00244yvkiylmf8yzae18dznrhgnfme4fskudkgt3329x3u2x5tn60e50s3wvknxgjbn8ig1m6gutsonod4ntj3e',
                receiverInterfaceNamespace: 'm4xq6y35takfnknda6yzoromfvimw9knv700y1wug7so3pvwc1bdw07u7nxkzakuw75slly9i3l88ppxijifm1tineq03xzji9509kkivx086wsee5cgcwao98sikxe1f0fxz5r9a8hcwtp7lhbpb6zec6ds45s1',
                retries: 1202857071,
                size: 2488590701,
                timesFailed: 8736950941,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: null,
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'kz1geoha9kqeprr9n5ub',
                scenario: 'xxopmy5i5jguotzbhmso37sqpncatmrzogh6m7mjwixa44uobdv78z61x0ri',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:13:06',
                executionMonitoringStartAt: '2020-07-21 20:02:10',
                executionMonitoringEndAt: '2020-07-21 19:09:11',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'h9u743wigwa4zwr87s8zw69havns5ppe3niibq8olpdy3kt40ljbcbexvmlwtnr7sibfzh18666dmw93voockifaae9104y2eso2dsj34l8u7fqkq5upixor8xvoryknf208y74xnunf8qqk5dq4fy93af9e5tx6',
                flowComponent: 'c7i7fu4h8cfhuywa57j2lxcarxy9apsdra218s9thug9ihz6n4y575du5yfs21orizdvo4joqi432muqpwpw3wnv16s6811m6sav212ymmzj9bu1yzxsv26j30rnr3vwygwn2hkq9vemv6rqxsjwlo0q9ft5fmu2',
                flowInterfaceName: 'oczqlz6up40xvawfefjib1q0dyg8o6w0jqieeo7638155ynbvavsvqqquoihf5iap7k3ci5s8uijldce4o2task0eh8oppqysxho1ksvxe06fdrly96hfs7mtlpho2a82g1x3nxp4f9l260q2jqmeiopv09qzgv6',
                flowInterfaceNamespace: 'bf4yff7k5ip14lm4tg757rmp3h5z9e98ptef8h04gxc51mofo0eqpa3zp0vhnx9eodld63mstmhwvluz06g1dcjl7vif1aj0ffx0z0vtetk82hlb6mkbn0167kmter6kfgwo1m7gnd2n6rlzobw90eryugsoipsp',
                status: 'ERROR',
                detail: 'Quidem eum est id voluptatibus nulla ad omnis rerum. Id ad libero. Pariatur numquam asperiores accusamus quia non et deserunt quisquam est.',
                example: 'dtuqqeqzy9mv3skkozsnz4wty7mav83z3a9i57wxgta98jnrwac9akpexopmo73qkyn837n8x2j8tqb5alfxle2zkkqwrwrymp6tvpt7bt3mpne0xhxmylrw4z7s6yveobfs3ch3n2y7cmbtkzf7i3i5b0m3i5pl',
                startTimeAt: '2020-07-21 03:38:49',
                direction: 'kb3gib0n7ilw81r30la6',
                errorCategory: 'nmey6pdhl6kmd4ns0tfc8flvz4ins0w3y0h57z41kctludu5h4e3lwugtr9sfvg82y09tncz85gpnmtwbph1f3hqc734vf3g2revkzitrut47gqz85be24bxhby3312g4x1bm3ebvfrulmb2i5dzp2gy0glzwsmr',
                errorCode: '6zgu6fhuu31mufvpcrmo',
                errorLabel: 'l8oayqbzpe8pbfxunwx1dl2jr7sjkngtpb35hcqor57efuh4cvy6dckdv6zhjgihj734hbwihtvdq5hvtj9i0ustzg1gyyf0qihf4ik9ylu956ucigojkwymzwjmha354qj6zr5faxzqly946x59u1c210rb7bzo',
                node: 5632409570,
                protocol: 'cvj5tiljrk4v3mosfoun',
                qualityOfService: 'axc56ctjy14rgdo9qihc',
                receiverParty: '1xj1yb17xr2ln9bkk6r68hpxbu3a7kc2jt8b2k0l2u47z83tb06jigrca91kk2abirequ6m3odxbwbn2vnisu2kh6vk8uqrtjgjsqzhquervtjyts9bgakboarj7e5e9o9bsdqbdhglsvbxnvfjtbet18lnzzqsl',
                receiverComponent: 'kfj0f1l2122uhhbsvrc3dms4v6sam7yjkykcxlxo4zbbw5oy45v0226edkzf3jc1t1crphmf6f70zxnf0rl5toj35a28aizs70cxxsvbetu0xkfdoxrawdujxm35wds5udde17c8ppcj6wz91ets8j0lhnej6yny',
                receiverInterface: 'jgw4awz8d8wxec5nw1bu17taohhphxk13vwv4h5l5u3yuvyoouf6vx8bko7c5es3ozi4rvt2hpkzvk7o3yx5gu41a3u80mm7wu9teiggjg0ws5m5apr0zbdnt7xt1sjwyct9l71ghw67b676q44lgrynk3rid7b4',
                receiverInterfaceNamespace: 'cjc5yrkoec3b7wxs5c5rsmy6kvs21iz8gjh90vxsbu1fwcqyhbhi4u16vvqzz69htapyfe70pilpnh77sw5l1abhvharmmoyoe1wki7is8xm3hc4drbj3ughdgn7e27f5bjrsv91p9pfg1qtj7calgl7dgsh4an2',
                retries: 3503361087,
                size: 1460012566,
                timesFailed: 4144749603,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'vfrn0zt93bry13w92g0s',
                scenario: 'mjw2b25ryzr0uumc7xck9ciufzv2qn94gw1srv9z4u58d91mtsvqsr1xoqpb',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:29:52',
                executionMonitoringStartAt: '2020-07-21 07:35:59',
                executionMonitoringEndAt: '2020-07-21 07:49:06',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '9x6ebzuqps5191r2quza5hfnt971vjl1nkpru4mq2y8v8znltgzj9syl29zcxn5ael5mcmv24nh4ldbc685mhxgue0uvhrt1ade9sgoy2hrmjl87xy7hdy6rddtuabfr355rsm2owutsywbendr5w80jx52jrq7b',
                flowComponent: 'bhdbpv8p8u9h20a7n7yqauk12jp2k9sbcyufj3uanhylgdzx3mp6jf852eg1fjdokb07ewb1y08fuqm0ypp62arftbqkrqwbqaotbf482soawvx9hofgefe0gs5dnvjbrpxzyrngqvcjuarv29fahqgyrl7bvax2',
                flowInterfaceName: 'h1jgb2rbkvcr1cydt9pnr3ex7x5kalosfhjlavq3bpitpt2uvrsvu23eucjsfx3dom4alft41cmprbipdr0c9g5f7ywnb063i44sc43dogwemjjsvq238f0ssao4yj57urrhe91qe91p6v9lswc9ex0g824yup5q',
                flowInterfaceNamespace: 'wb2c8y4dq61qqzkiv0oo082qf92a637oth507x9jql36iatd3njrhbuqjqziznn8974it8lyydcaw4qej6wjgcziet8rvd6fkxwg43dxvo3gjq2xncwciwxoqwbzfc1b03d3kef8d2luqmyr9k301uzk8o713o77',
                status: 'TO_BE_DELIVERED',
                detail: 'Et illum ab. Ut cupiditate magni. Aut minus magnam ea quibusdam laborum necessitatibus aut dolor. Commodi libero voluptas et. Quae ullam qui alias saepe animi esse omnis maiores.',
                example: 'd78hzfoehivp1ibf4ast8ih4n2hpiy4t9o4zomal000djk4xg14pnk5ktq0nd2y4l705fx7o4rljcuvt5nlp0sqa3qkq0r2b26crzx7egoqwwtnq9d25zhvoba4zbtp2ucrztww4384k8zyn2kqbico0w95qs488',
                startTimeAt: '2020-07-21 05:26:09',
                direction: 'ujfdnkwpld1gnl3ifksy',
                errorCategory: 'dbji07ql2xajgiz9cqnmc0ncbujim2svgsw3f5u16e93y2kh8ka0opzfr3tjej4ftrp37obftpo23x3ypsf2f4ygmp9k1v1tlzjo9t0qw9pegh21x4pkk9vq20edtpdn3lw5l02oikhhzyhtvhgzbwuzgun0lmzv',
                errorCode: 'mpwr5ma237nbfrflc1bg',
                errorLabel: 'upxcw84vmfyvayaj6dk4rmj54h4bqejqskiys1no1hg3x6bwvcpyqc73o7q61l9uf7wlpyldm0xzl7np8t54zfnnggsz7g820dklatr5gs57lm29yqwban7ys100as1674yn10p6a9m2txgkhrozkqn0z652gnbg',
                node: 9415711280,
                protocol: 'fb59o9oqfequdy4oytlq',
                qualityOfService: '6qy4evu7n3xysl6bym3k',
                receiverParty: 'fxbhzdlypxtnnc68czbj2qk5jawx0rih2n03aw1yw5636fv58jz33igrxhyyswunhsay2qwz5rgiwssvfmod4ytstc014ifot77f9tj4q3fd8pa6fknw4ii65rcg0mfgddzshlnyu29gcudn9pt2nef6pj9lfpgo',
                receiverComponent: 'hxkhtuxt1jbio75e20z7t2gzip7cvws9pw6sy39fy2tcc0c8vo4uduyzsgce3f01upbxto26ajc83007byjbtcbiw0pny1m2ozl68rlsmvwbu7ijz9ua0v7m05xf4y9fv3a80g9qq1hf81u1kqb07sn5vwdd0ai4',
                receiverInterface: 'ybqtqz73no0yap7kegm0qqz0xnuhrzhaczvpoln8m930l8x3gz9b8xt5573j93i3yx294whsergede8urvm8hsingy00lsb0qefknnfmtya1f2mqpol5inqgsi7y3goelpi7b21hi1qetspnuzkpr2wqalcff15i',
                receiverInterfaceNamespace: 'kab2o1li6q5rzv6om2lzsbv7zsk44bfliwow5fz5tg3f2ymwulnvzjmgkecuxrk5486qzmqg1whhk4qiitgt03jbxtfvummik602wyxr61d3u4clm7i3rinrqjne8k6yqem73ncnh1siby6uyhtwji10o19g19na',
                retries: 4629830061,
                size: 9420131522,
                timesFailed: 8719262710,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: null,
                systemName: 'x59za457kl6m0wyxj3gs',
                scenario: 'qe0n2qmqnmjg71t7enepohzjvtg8x7ab0bvg9zkvam62pms2zmhpefq9v7nu',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:29:29',
                executionMonitoringStartAt: '2020-07-21 09:15:48',
                executionMonitoringEndAt: '2020-07-21 14:08:45',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'q0gdhvesy2pbmtaxk61u7raknteurkpjrfz56677popsxnvkexgvjc84l0pmnp4nktfpfy4xoyu76a31j9ir5csl8j5jwx2vwfa6qs5dsy8shqm6sf8lsj9fxdq5g5ots0w4d07919ctzeq5pv7fg2181svw3ik9',
                flowComponent: '16ebd5sd0xyk7847kr25di44m2emmhht5qs7u2kuex9nkstl09o1fg5m0kqu638l1g5qfe4118v3wd9wjpvv2ukndqgyxg1qcmcqwk0nlwbl21dnid9mqlqki82scn8w9qd2zxo1e6sommnp5otsrjsr7affxm5m',
                flowInterfaceName: 'loctccsrgd7tmk8chpe5u4w9l4786idw2dp9pfso77aj382l0gx93mpwfmvy6cxey9lwaoxkathckmjv825ieiiyvfwzkevwmnsjjthcdfzz8v6gcep6g3a6wtac80swtn5yrqefwlqjsu9j3xcgs4etdkkwggyz',
                flowInterfaceNamespace: '3y5ltnsmucfzm9v6vofg6r9xv6j2nph6o95dxuo4aq96hag5nv0s1o3d9cs6fcverv07ytisklkb061a4r2h10uywq54mrqbzgmdrajy2io0apddbiaybxbxcsrgi7ls3eu80vrpimhyz1dzww0p08pd9uu0xwqp',
                status: 'SUCCESS',
                detail: 'Aut ut dolor. Qui est aliquid aut quibusdam vel laudantium eveniet deserunt. Voluptatem officia possimus adipisci voluptatem. Sed dolorum praesentium repellat dolor nam exercitationem aperiam quisquam. Porro rerum molestiae facere ullam aspernatur quia animi. Voluptates maxime nemo ratione nam autem quaerat.',
                example: '73ghgsrc9dplmrw2m1eckl8pdlej9hkq716o79srvoieqio825oxfael0f0eifxg9evly0mxiuueiw13ncdnwl4tvp0qob0t2lmbex5pbddkv22pl1e3zwc2t9bw2wvy12rdqfbdfiuu8camwgcxsx83ei62e9so',
                startTimeAt: '2020-07-21 21:52:51',
                direction: 'olpf4svnpx87s8bwmu8q',
                errorCategory: 'xr8te6p3tshzgosz1ovdpxhgqmjr4bn4h8067cdtepjq10yl0iiperjmy7becmtyz9rfzysbn6rpri6fy3k11vtkua7wnfmyk79i98ikyq140kly1ilteom846jfsdfolhd0givduabe08vlbpv3l3s73szq9g8p',
                errorCode: '9qhjrmvfo5v7bwyhlo4g',
                errorLabel: 'qns2p8tb2vr5idzzyr3tnfdvye637kt33xuen1yg4pokhmdtl9dlh8pw28uqgnurxibckv48ngq58syrhvjvx55hi10xwq0nwawaewajlcer1iozq07bjz3jjkx3nag68lluhq4livaqiwadawcyxcwrqo1g3w4a',
                node: 9312059532,
                protocol: 'xgt33ob1iuwb8h8mh95q',
                qualityOfService: 'dp582lrc1n1q5wxnhdmg',
                receiverParty: '0lpnwp3z0g7aawva95c7aev25svxigbup1usku3eggbw0tjkcpjnk845tshn3biyijhsv9006tlnfa11hmjqrju2jqjs20q447sel97o3jrtbpo2cvkp7w2w7fa79vh3zdcrb8h6ff54onx19ko9hhlegsflcbea',
                receiverComponent: 'apxv4lcb6wxmhuai2diusn2epqf3pnkqkg86kw4x75uaq6dtps85g58ghhpxseq9p780syuz53j3vloalvkbf33ygpv50uv6cgkmu2gku8m1q2f0aw0twfqvesuekw66bgbim7aejn8aaephmhz3w48cu5vz7psa',
                receiverInterface: '639xb5qpz84lrb0tsjblr5pv2yrtkpoj4r48w088p1tafigd3uy28dj6hve204usfxi7djiaoww1g2iojn2m266j00kwnnovw7n7lpwguopl3z4g1m7wowi06ouvsq97xq8avgmappu7vv686x43eu5fe8uykaqe',
                receiverInterfaceNamespace: 'tlc005dar9suzzl2dfca2f6ik2ar096chmvl81k63i73cwfelyp15g7jh4zjdgp16ckfcsbrbkm5y6mqgqfy3ad3imtkeremi4wmyt0apzha5idthyh3rnuwhzer1924pewu40m5r7own2pkbqhkd19hl1ulxbx1',
                retries: 3456207358,
                size: 5754007534,
                timesFailed: 9079870507,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                
                systemName: 's5x0pki5ed30dirxq2qs',
                scenario: 'nc06utbfnukhad635uwdrmqvmyif5nrgjag9i3f11fg463axiozhz2r8hp53',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:55:30',
                executionMonitoringStartAt: '2020-07-22 00:41:28',
                executionMonitoringEndAt: '2020-07-21 14:08:49',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'b18pzch1jv7s3bpmeswsviduy1218eiul235dq6pahjlnf2ti28ql9o7fkbzgasbmnmyuy9rzaupdgzkgoddz6djfkqvjkm37jdm7pql233by8aq3jav5j3g9oz21amdpbloxhnhi0996fgtwglz0ckvn671ntmg',
                flowComponent: 'lt6tzl4tpa0dv1pkafjwh03y0zw7xlgim0iajwzbjk3pijrao664adsi9m9agp0zgdguxh87fmc3px49db233zpgyt025f8rx2eg10ik40r6sv0wvyc88c7xou0j1u4o2y34y603qt02t3hegqucqxpl8xgir9b4',
                flowInterfaceName: 'cg67b70ceojlzicmgfwneralg3y6f0z3ncp955dkp8hyjvbajof7dgz7nimjkvsnnszvunjmybui2mqezdyzahzuyceyvu4wdmuhxojnjv5dyuawv9dpn94ot85kb42cez6f9v9k355xbznjijxx7kyewx42286g',
                flowInterfaceNamespace: 'qie6163x2k5wxovesevxx8wmz4smsoz9botgvtx78o0qgondh8vd8oe43hrikle2n76mkm3tb1j4qu637mxppenfukhr0rvh9v8llijjownllyddvz7mraqyawa29bb5o6n60cxgbduvnkk3f4bnk2jziifqwoms',
                status: 'WAITING',
                detail: 'A illo ab qui ea omnis labore nobis facere. Laborum ut enim perspiciatis excepturi voluptatum aut animi culpa natus. Et eligendi quo voluptatem excepturi sunt exercitationem aliquid ab. Quos voluptatem voluptatem doloribus deleniti. Aut dolorum saepe quia dolores ducimus magni voluptatibus et aut. Accusantium ratione itaque cumque.',
                example: 'dchfyc4c0xqu5vsonyju0oi84pdl437ypd616e8bldgnezw2dspjebnqhixu7mtnbw9gcx4xyrg3znv18pejbxvduztycxf453nx7uu5ugbykkvqkpr9rfbalpvg6htd0coor6kxbq0h118uvhyd6i6386hvjcde',
                startTimeAt: '2020-07-21 18:10:17',
                direction: 'pen17kxn2l7xu2ml7x6b',
                errorCategory: 'eh8rwqnphwspuurf4jkoqgp6x1ijicgrm29y12vx3fbk89nqxb2fujnejfub66n9xb0k4xm8y7dvvlypjjv9cbtehej926moedm7yqvuth6i0butuckt5qui5r1dqxqcz58gi266pl1adjctzf6i0ypp2o6yof17',
                errorCode: '5oljsr2rbhhduxjx5t4a',
                errorLabel: 'xxp9idmz08fzmyr0pupx9ygazn96908dtt8z8s3asybzt998e23xqanwnzj1norm58yrf4swv8sup2enkfygolq76lx5l4vv6dbghptfc2gwrohh1ybxhlv0aja7bayc4hbdbeikjmqaefmt00wqr1ft2t67qnte',
                node: 4238173554,
                protocol: 'o8k0rjx4iuv3e94vonpd',
                qualityOfService: '2ri2mo56bfz1z4pa7lh8',
                receiverParty: 'p4vijxe9mcjbi4tor0n1vzdaf2eumewzbejdzkwgae270w1p836w3i9nib3opj5a2spifqnwby58ucox9rzhctbmt5ft4yuy21pjgrwcwsms3wkhdfdhsm5li7bw0tk1erzeacm70z4jhlnipdsu8xn3q4tp17ts',
                receiverComponent: 'zu6azn87ccpslkpeuazyx32eh4u0v3b3meflcgq1i7hmdb7krmi00nc62vylh70npuish4mbd1uof7d90wce6tfnfnjevbp2u9j3slsp3wq8ed71224ranihr4gr6jdy6epxpivwz6l8q82wc9e8rkrlhofxiykx',
                receiverInterface: '71hhpqhh6zub6t11wpj9ukbljcapxm5zhes9sotsj1oo12xxzi7mj7gg5lxgvnqrylhby6h9gtjt3isoyl0d3acg3vgzo5udmorfwcsv41fwvx1e7x7hojwrpiapqij30b8y56ix8mit2akg3owpca582d5davcc',
                receiverInterfaceNamespace: '2uq09jp0qlbqjbbwxedu0ir4hkn7zpashq2cmde5h36rwmzs81u7y3cd15vbc13s2ai7s5356wt3t01o7291u97z4gieu413lqrensdh7q8h5g9rzd1ayu9h0j3x5ehqmbox69d1n1mgijo6ld2si24rn27hk96v',
                retries: 3895329032,
                size: 2445305273,
                timesFailed: 6475959169,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: null,
                scenario: 'odwse472rzo7ko29e7pp41f0h6p05jj06q98t9jsfh7cizktrqefk03f8m31',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:49:53',
                executionMonitoringStartAt: '2020-07-21 14:35:55',
                executionMonitoringEndAt: '2020-07-21 23:00:43',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'x52zykh7qqdwlzclfi5jbkmbhm7d9l60ctn6h12s1o1zxig3t3cbt3dxty09kdgolp2ovr3pyt59fq1g4u582jx5h0legxqvdapkeov8bddq378ojs59ufcng5sa337ztgjld7nzj0dua5oa3tr842adbrrgdswa',
                flowComponent: 'xm4yfzrk3etbcfly2ny8geo37e9bl3chves9jz89ybvz2a522skl2g0ov7opqku7pbytx3mf6sf6hduo958nk9ezw8hmx0w33gshsff828tuqdkeuflmmvp7gyvkn1fj7wxkqgtrhae8kddobufbe3uwj6rejehm',
                flowInterfaceName: 'nwohhi6ed1w3vedpu58yj4i61hvnftshl7gn087vrd3k6i7wlccvhw0b0gw02p8ydiuuj494gwfjrs5mz0m4p3jkz2zxqzop9cdo3uwqawer4hbjsyzxh8sianbov2qvikes8mewfcuvagaf1cvpgjpwn5ygpyhu',
                flowInterfaceNamespace: 'e738u037nvx9o7dp6bpk8zwp51jeznelj2xqiv6pv1reu24f8e7tigl93igizbhurdqgq3t7lcpwprfunumay6go6sz36asipiidaq4vxe20ydlgtm86ubj55wz4fdx6ifs4dnijnb1c6nbyhe1mqgev6p3ukikl',
                status: 'ERROR',
                detail: 'Hic iste consectetur qui iusto nam cum repellat. Eos maxime fugit est illo animi repellendus dignissimos. Expedita minima recusandae possimus. Ut molestiae sunt. Sapiente nemo ratione odit debitis laudantium. Quos distinctio qui.',
                example: 'g5z5eww39vjn8nckux35u8x6l78lftii364e5m15gg2fp58hatdotnge0wtwbziq216wd5a3vschs854o8tl0njju7yirqribaru5e7csy44l4tk5dqd4lfsq4aqethybglxg848zxr61q0a95ss5rpec392r2aj',
                startTimeAt: '2020-07-21 00:50:39',
                direction: 'korgkthdld94uo8kpzyz',
                errorCategory: '4xlbk9z1fjsi9nkqf7g4ofqbgm06jswlvqast3whv4lyzcyg1ft8ijz7arlheksl4u4sjuda0zohniqa5ulkslsij8g2p3kqnkwh9fwx5fq0cadcrqtyjve70x1oagba8m7f4qvju1rt1i1sann6bmqa12p5cx6u',
                errorCode: 'mrp43g5ck6vu7yvqje46',
                errorLabel: 's6zmt2khnrbmv1w7l73wp1mryr5y6d4bhoh3kltci0qmy4kyj65ngp1cxebrglg09sp2e6jk2vu3qq00wcosax9pdidfuqk7qk4x3pjgb2ru7uzwsjhb9mt3wj3i5ttn9j95pqawsevs4zf39bz5jecve0be7z42',
                node: 7017744994,
                protocol: 'w3ladris7nv4f8sk5de7',
                qualityOfService: 'n65qe5dlh7iiru64qube',
                receiverParty: 'thykakutut16i8tfhx4n86r5gs8ezhdkav79fhqxim7unwfuhtv49wiwmfz3vncrris1ml8ehvfkosmrk1irx8plonourt89dbsu4il62pkhbch25parnt8gfyxsxs5lyfw84g3m190j1udbug7m0kc8ymbpwiqf',
                receiverComponent: '4q3e10ifu64455jchk9292rwqc4rcti92lgz1j9ostva7c39upigjpsxluxwx8inzmjpuzhfn7xlqxu3hjgnz1738io8r9w44411vlptsgaahmnl67wm0cmnrp99dkcfpx18hq7k05a7b3wnnib3hmot3hagvu1c',
                receiverInterface: 't2ntytfrvrpma3bhu22huseqxseseo7t8u49zu66w61lpf593cb25lck1eehyo7q0wqqfqsafms801kkis6hphvamp9ggpyzsn4h46uc89c1qemsy9k5ylxq2sionryr7b7m6esgaab9guuwgn67yxw0aiwprn3l',
                receiverInterfaceNamespace: '9u5v5m79owodqx8ampactkrk71lxgmtqpyd7c7vvyh7hx136jlse38wimmzm7sgwk822zoxknxfy0fi6o4y8nq56wy04rempu0s18oyst7ar4spxjwsr860w5ee034cy7v9rppc6qeuz20ih9mc4gd1s95sfi2iv',
                retries: 6944118106,
                size: 6099391719,
                timesFailed: 1867328900,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                
                scenario: '89ya2bgbj75cctjxprs2yjlot5tqw53r8s3paurjocgmglyl5bolqc8tvgvy',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:08:27',
                executionMonitoringStartAt: '2020-07-21 11:50:45',
                executionMonitoringEndAt: '2020-07-21 07:23:48',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '6xz6j1e45zl8i48uh1ukw38v32d92r1y152rk6clc2dobmreqlvdxd48bo3vmf7qnuapzk0zflzzqbg75sb738f3illql8vd7a34s6gy5rtkqqxvzwvofbkdcwsf0e9wyjz69o7531othix8if5zve7omiurwi8u',
                flowComponent: 'stbxipqa7xyjfyk23d49j55iogioqk87hicbznw6mt5jkr1h11ogzooa90oepikdhtfgb54mvxpyerupnqqwzlmhg9p21znorwgzq666v7ogk60oknmwucnhz32tdq34tctfydj5kd7xofo32di7qthqn6cx005c',
                flowInterfaceName: 'dvvfknlkjo8a9ewedvfq9artkuqq2oykt2c16y922t424vkkjub92y2f1l6agjfl7fyrc26nfqoylxpcqajwaant5tv2ogqarhgsdutaw1hyhqaoj53dik0oft4piv58qbvmqkpu4vc44ou7i0fn760jumvihqrb',
                flowInterfaceNamespace: '1gienr292i4g9vdhatvbwijgobq6a71ac90qh5cd3qmsumfz58d50dp26gusxqkjvlac49lwotx6fch4d203mp4qtatrkbqoydzhkw3pl44nfy8e2u9zjczs9esw6prb66tyknrdbpay1qgc2oxyl83yikkm52xy',
                status: 'ERROR',
                detail: 'Sit porro veritatis quisquam esse in. Commodi eos temporibus delectus. Aliquid nisi maiores molestias neque omnis laboriosam expedita. Autem ipsa sint voluptatum possimus consectetur.',
                example: 'fk1igq2cko2finaopv8nif90kibc774ibib2avdu2mn2c5fvfak5i2n1qdzdsh507em38ti1hrpwekcbyhxh1nnqpugoodqvxj2j7m0y4pgztscllba5ekknaqokb4986t5oocqjmuayzzgo9g4rdvd2x7oki874',
                startTimeAt: '2020-07-22 00:33:45',
                direction: 'by7e2lwzhmj4t6zuazmz',
                errorCategory: 'ug8g13k1ji2y19mxby34i99fwwc1m0ij4xxzfw43vcqddsg9zz0wf7s2rym802roeobdp8wosejtrch335699u0d8nmgz7lvskhujdyqam8zyp2flxlyesk4mswpi6kyb9a05eat79tonuralgtsvwjq5gwd0uvn',
                errorCode: '51y21bneksdnd1o0iq81',
                errorLabel: 'ku8cf5cqfj1bxxiwwmgtquolmlvgrnofhe3fosp5uei44d44737of25ugv89riuw30nxf34f4vo69f5g5hll607jtgytqryst7ubufekdvo2qwv6d84jwzeo0xlu5ftswtztye11tyiv9lg1jz4smyxosfr7f6rm',
                node: 8384442064,
                protocol: 'qruyrzx27hbg699y70ee',
                qualityOfService: 'sfrnpec7opvgl4sfm1rd',
                receiverParty: 'wjc5b2kn5p775me74bognkw1uzl3mupiqknr0faq3exz4xkgykgqfvhol1be5vxojju3j7qkkr2n0p2gfbs8n8js7dg1ednmh22otoxldrvsq5wn3y1wamk0dxygz9g8llr6kyh4dz4yii0y9oboem2rtezy9ryv',
                receiverComponent: 'i988bcp4gw5x5shx8ksn00szhxd5l0eo6ew8una3j3fxx22zzpv05w2vkp9sdsgcs895s12amxy13xtpegmw782rxe1fkhg8mc293b0p658qwdu4v070y97tnxf9nyu8323u7rt34jq0ob1znb8wj2zyeygef708',
                receiverInterface: 'omrln7g1bxhpuc6dvz8ty83kg5nc4ls883ktwiz6ld83103beetfmasyh2068fzi0si9k42ey9f63i27gpd71qcvh8m4vb7eoniymkjua769l285fbvbt2fn33hajwfy1s3wqjfnk4o5d0uk6sjt19du6scmkn78',
                receiverInterfaceNamespace: 'xjflr8wp4qt2gzyfuxe3bkgz2n2sempa7cf1x84fs7mw30zwcvwftpv2fv7g545072jvcr5b3u4jysp1hhmyd2j5y02jpqnyeuuocdw4uztklo7tc76tvgeg10hi08ccfhf3sc0vvcvqogec0ssftoisbdepzism',
                retries: 6938363328,
                size: 5632093400,
                timesFailed: 8947011717,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'qi728oa8bx2hjzmshsfg',
                scenario: 'bw71jnp0qz9b7wlq9xeoy5nznmxm95gt6hagx2psqu4s7xr5eymgugr6074t',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:47:31',
                executionMonitoringStartAt: '2020-07-21 10:51:46',
                executionMonitoringEndAt: '2020-07-21 09:26:18',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'fs22omkg72gvykdx832phecyvgudfxht56ze5tdt69ea86dtdyojsd514y8ylin58mc7abbbqfip7dms5kmowz6j953y1wr94rx2lta5bzvl04qst8jk9cxy23xkmko0ocrfawnfpn8gosf5xibd3mz350joqquq',
                flowComponent: 'i39ox9t4uof9xabnobo5fxc194raalu1vce2h98inp237mn0ry5e9jc8mrie3jcu7pghhkce1tpx35bn7wj8n2nm546nvfl60lqkigxcstpv1zdrhi1lxpcy6v0ca5gxii2w0qit31bjpfmkmj3kz2zxn3t8ixo8',
                flowInterfaceName: 'yd6oc4yhmpm7j4kpwyk89j9qxu2840qmcr4xz4aemkg4ruw6pbppj0to68j20l11gvqdy19mhqbxrr91h0u6uqz58n8k1lcifa83padlvf8bw97co7ighlzgaaj57hlk4k0tor5q1orfg5zffwtgqml5rvs7spm4',
                flowInterfaceNamespace: '2ev1n3s8myu1vu6yo2iwitweygw82t7l4xmdaowyv1gisahraqftgf69kvf2vgfv8vx3818u0x9w1uf27z9n82ifm1o4dge68gceqyj3o8c2hc6tmk3iwr5da0tx8s7pgiry0md4mug5nxprzoum9fnzry7ylyq6',
                status: 'WAITING',
                detail: 'Facilis id molestiae vel nihil error. Et ea et doloribus ratione dolorem deserunt quam. Nobis perspiciatis sed est exercitationem debitis voluptatem ad ea. Dolorum officiis optio odio quidem.',
                example: 'f7svavb0yi8jfapmevhu1bxbmjnuqsosk1ow4hpgs4ysj79vylu4h6xpfuzg03e209foz9xei3bf6f0m570lqkitpp1ulmyhl7ekduubs11ktvkf9crw88dvgehecvznztwejol8nj4wydj9rw2yvsmkqm33iu8a',
                startTimeAt: '2020-07-21 10:18:19',
                direction: 'by07mdylhes9vmg83gfv',
                errorCategory: 'twyyjvxthuq7bc9ihsum9bzty9vzfzepgdjrfgde882wvibe3hti6pbv1hztm1krw2n84r4nr7udkpodxoqopxzl1zrs1rweaq2vlbmh86saofdm2x1eoyvppq7hhvn4o4ugo1ieefcfhiv17ssrex198iiwzecn',
                errorCode: 'ecr0xa09tv3ou0eyejv7',
                errorLabel: 'il3c7h3w5t0yv9vc4dcm76ek5r5lnn6zy9tdp6amrjkw79r31ejparj5hvjpfzc0cflyp4p6eedqtrthqrhuhhq8t2ciqgz694yibi9ndtinrfc2iekls1km79p1icp1eto7mlh18i7jjolsy1mkyfh57muv1skt',
                node: 3451009506,
                protocol: 'm42bwcw823ng991u6e6e',
                qualityOfService: 'uy1c2zf5n9m5n73yyuu3',
                receiverParty: 'yjjfyhmiy1e21m1el6yndvvoz8s0zcuyk5wp70w6xyrpm31ig3nde5nt3wdha4jggbg75hbf0hhaft0bdk0o62m8rpkorx5vi675w74rjiuspsqult1hvapifgw8890yjqmjyewqklfly83gd27yr3kvvkmyq09y',
                receiverComponent: 'e8ooqgvgcffuq8h91them72rcg6ty8ug54bveae4fz5vuix51evolr5zbg4qezti7ug1d0vdkvdstvogmi0sscshfsz8x3xj1jzy76p6kr1xnrdnwslp8e6u66g12akev004fyxnuegwgb6k2jclk2k4oimqlea1',
                receiverInterface: 'tjz0wl7nt6m996sglzhqwyvu8el2wtl2eop0tck7jbqonjkrwbph5d638yki9f9ucezuxmp7un4xlx2ga6axk7qm6baq93turve5klnt3at5l4lgj094a4v59q2su7dl2ub9qf13oymywycomxtc0hkxwbajfd46',
                receiverInterfaceNamespace: '5hpa93m61ifg7y1re65f4gic2bfil7u6olaaf7u9yo30szhu7mmg29g3a5z75qrevmlrsbdcp55gdzph5jonoprmpl2xattsuer3xlbv5ljj89x4i10tpe8gyd3kl5wncdngaxh4zzsa8qkjoueaoutnpa0vbjkb',
                retries: 1409037604,
                size: 9579399292,
                timesFailed: 1981819275,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '0rf1cy7bxgi1xdqf4ore',
                scenario: 'ivgtclzre1skwpqyrno4y807rhl1lhkoyd41vj6nasdhbrs36domahr2tpzk',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:03:27',
                executionMonitoringStartAt: '2020-07-21 09:42:27',
                executionMonitoringEndAt: '2020-07-21 19:49:05',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '2u1nw6smzl6taef8az259ioqqrxq49xoj53krkkp28or5lu1uewfawulqi7iw7zrgsgzbp3xlonxl4bjsyzpvuof291nqn4vf2whml83rqwkknz37om71ppc1gocv3v3uwdoywq4sbqslf65dxz4ro1hx2my9stw',
                flowComponent: 'pn3tq1mh2jzvboijnvw7wbeomy7gltpojqt7ky0oihy6y72wzk8o0ibke1le1vmhubjgb9l0tvq0l8hpvhi8b1wbxazaxxs1em96uoq71bc2fod0kabtoapgnpjhukj1iebl7t0retwjgf0ci29jjhgs5l5se3uc',
                flowInterfaceName: '9q7zhwbql8gh2ta893xyuqtwgctaskz7xqyz59v9e4iatj7wqokrq9tgkwzl6tsatrggci9g2cycvhy0l23p65fv5pawlp8ohf6rjypfxh4atxjeb6r4d4mxa847yk9icrw3uiei0g5j4uhmb80tiyby8vrvl621',
                flowInterfaceNamespace: '5negd2zrv6ze6m52spzsbgz0ysrh66ckcorppvmccb1008bw2djwmeleuubxp4gpl6szbh3qdn9rv3dhyk80ekcvzsukq2iha22u5v7l14x0a81vm7i8w6b5petae6qjx8cf7hzj97uhvtomlfxhsyp79je0de6o',
                status: 'TO_BE_DELIVERED',
                detail: 'Maxime ut blanditiis a nihil deserunt aut nostrum praesentium. Doloremque quaerat vitae aut aut quam quis provident vero qui. Voluptatem eveniet suscipit. Perspiciatis quod accusantium.',
                example: '8be2lqppd2m6hagl9hoqyd3a98iggchy2st6pb2flkunvt399ggquapdzk1kt2cfh81ks64vty6asa79zhcuopr9yuinoisy1r020bgfvqzf7ezxd58883jbr5nk807whz9lb2njbjcccj5tw60cj9t1asizyblc',
                startTimeAt: '2020-07-21 03:16:06',
                direction: 'o1kymrklqkddah81ha0a',
                errorCategory: 'ta3mfdoh70d3p2kr815uoil0qz8ewlts5jiirg088j1oea97hjcg3kryue4k5mderrnga6kv2rp62lviq3wha0egq4j4qg4p316phaky356u4qd8l8i6xg432cpjmhza7ysn5zsvhl4waptylqabotog0psscn0m',
                errorCode: 'h4xmzablfk8lx55vmziq',
                errorLabel: 'l0vyg7k7akno76czsiuqnjwfm7ck7cjd1ch2rgul2zxfof9vzr10tw3jv937319aih9vvsgy9ddanta3qpr63ze7shm1mtsxvitteivmb1dwjypo84uzjc2ir5liwxf3inj5gpk4wksyg2hve9q7hrfyun7pgdyp',
                node: 2567347066,
                protocol: 'o1hifjibad7i4j3dtycx',
                qualityOfService: 'cp84yehd4mi3kiucsd0s',
                receiverParty: 'g6kevihwttqzj0lb3r8btlofyekyz0qch9845cszjokapo9twkmcmpjpuu0jeyomnkhyzgsov7eeeyp9b0z5smq4u0zjpcso6q39hr5jt4r5uka5rkjnlilihntgb0oo9rmjyubcip9ajcmiej1wnrrz22pdyxab',
                receiverComponent: 'k80f72n0sxdkwqss44i7jfj9gycinjlvx5hewohkm8rqmh7h18m90qsy25821ejxyq6ihrj43uo3yv3risehecs2n8kzxkyq9yv7axvglc92ubwuxcxzp66ft1stjad4nw5gysajh9wqoyaom83uehpjkr2vem7y',
                receiverInterface: 'k14p3w2uwj2uqlrvb67xk9k9siypx5chqubs0ew1kgpyf6yi874xh6acs0k7qizi362vrfr3xd52hd1241qnwyzeqjpqcfyz75yosex5y2uhh53l83wezkdms86pqn3zxyt3gpqaaldc46fmxsu4uhdyygjyuczr',
                receiverInterfaceNamespace: 'rpxsqd0l431bd6qvb3b9nh4niuc0d50iucwualsw049p4tdswglg8ypmgms96v7v9xczmefx9q1zpbgjhruia8w4pe18q6txn8up0lnk9i5e367x6v8qfex3qjrqyceiccvl54bgagys2qurxg8lb2e098jrhqm8',
                retries: 1526087774,
                size: 1891950617,
                timesFailed: 5596570878,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '6dgncx73twsvlc25gx3y',
                scenario: 'x2lq4041lj0nwokxffx4w2u1hajt5ky8dksbnvbuiug157lk424vaf50r48w',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: null,
                executionExecutedAt: '2020-07-21 11:09:56',
                executionMonitoringStartAt: '2020-07-21 19:17:03',
                executionMonitoringEndAt: '2020-07-21 20:53:27',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '36qt9394y4xtl29pbyzs6ye8r95we834ubgbrcnvg4xmvsbs9g9ulz192iknhnjo8w9a5id7b22d10uvu340kgxefzp6zfkzuhi71chrqa4vyees9it68zsachqdnefgk9n86xhamc1f6vk1jggsxym0rljbzupf',
                flowComponent: 'bksm8mbz2ssha3bddb6nhdhr0h5sknhrnyardxtah6tpppwsmm7fsrxpos7iw6gsj3u94fsv21or7hm37l3xqf9bav1o9c3o7s6tam4iglu80bm90c4fj126ub8a9umdjw4qb7tc5w1ufcbycwwke6bnk8glsks5',
                flowInterfaceName: 't1e0ob4b5w4tkte1zuifzjmvgsat784u2hn3yskxxlmbpi8p444qq2unb93carsw0k6z9h5ge4ojut1f0vw2dmaewr5dtdava2nvkuannd628kih8jb7lhlpv3v3ls74f5u0s0bzrwcnl8vvyx6979lx4gf0jby5',
                flowInterfaceNamespace: 'ng0y9daaq76036mvyoi3tivpjvz9qnh8t2fzq22ugik9di3kj3o4ln6k4eaiivafge54nq3yml4qezfh2lgmj24vetbgipc7kzwm8187ytqcjowb2at6jjq3ylb3spjc8y00ru6pd4to6c7f9a8epf5hmi75spk5',
                status: 'HOLDING',
                detail: 'Quibusdam dolores blanditiis quam placeat nisi et. Non voluptatem consequatur nobis animi. Voluptatem et repudiandae cupiditate fugiat sapiente.',
                example: 'zmrt1nrk4qv0mxr5yq26affrl5hzj25eb47olqwxjlhlykns8jvnfma2mbcpk4ef5h6pus9ygazde3bbnlcwsvsn4z6cdgxgbk3kdbxyfb5ujpibxeojmj4kw3o8fhksqlq7m8bkwm5ihfpawpg72a9u9lpttbkz',
                startTimeAt: '2020-07-21 03:30:21',
                direction: '0vqmgv7b7p1b1fazhtpt',
                errorCategory: 'l62opkmlarenmkwhdmyes5qykmfdkfozxwj19xupo3rzw68v220rsm0fdse61wvrkoxnxotw5b3z5uik692tqeco1htnfkphh5ubg1vqpnfwwm1gqa5xqmqrvd88n03ifxd51vf87jk77idend7wkrxfgwryskdx',
                errorCode: '160yn1ud7j8t85l6wqne',
                errorLabel: 'yze5hnf1vuneflhn2lz50y5zvtakv7lkaqv7ialqvkk59plv0ugiqi9n0bslj3rubibxk9f53omm21tta6hrhuje67tpp4il78xy2lwmmy2ts1fctsqjwn1bxng772aoj0paui2ab8wy8ognn4tk2kz2haartjeu',
                node: 5932894359,
                protocol: 'it1sgaukqn694q1qubti',
                qualityOfService: '9mkwgrqkcoo45wt98znt',
                receiverParty: '5qdpgjme6w76asq9dhm62o1rm6cqds4bsavkj84i1iy0fcgd61w8xgo03ub0njzu8t9n77kqdb45gmskirrwckzhxmlzxpk4bf5ggtl797g38epfr105swoqyi6el6ei1mrmw3rw1k3qfldxzeeo0anaxy5e31xw',
                receiverComponent: '3ojji1clkki0a7x27o6q9gnkpcz8b3ktxm8jdmsr2wcxbalr0zg8dbvc4cnuux3odtrhjm0s7265pk76lwxjd3d7hrhq8cz5vhmvfrro96jib5inqq6m8hvirtgetp6swo2gshbemajlqagvus83o8m43ho6chpt',
                receiverInterface: 's5hzcr83o0h1zeolcgmhsck7ik6ppoerikbv16f16jtlw5xedhrtct3077yiod35xba4qvomjoftybu6d62zu8guxugk0m9h02uy9lu226kl38cmov3lg1vx3h1jpkya2bgdxqeffqteuq1pc2mdo7wgj996yhfa',
                receiverInterfaceNamespace: '1makzs5gkklfkt1uwsv78iqmdyk84a0hvnm5esmv10jw9p2xuk8t9bgu6rpht9rq341r8kzsufy0sz4166vekwve1l8bryc1bwuyv0feq85d6wr5u3jmtb70yniycqq1w7p0fyle34qvmdmrtuyauuucl48rgzsb',
                retries: 8303430448,
                size: 7222528522,
                timesFailed: 1413686167,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'iq64lzaifu22tyjgc4wa',
                scenario: 'fztc6nabgv1yfpg0zmx4g3psb57fedye3owpd8zdk6e4uh20ew3w6mw2eby5',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                
                executionExecutedAt: '2020-07-21 13:16:47',
                executionMonitoringStartAt: '2020-07-21 13:45:18',
                executionMonitoringEndAt: '2020-07-21 19:22:35',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'm8xaus38j1n2mm9l9pr2p7rgyotcq9z6ep3ep7gd2nhac8jg4idd82isdpuany27qse1ay50ljc3fzhk8jkma2g37cf03kyi57ewo4jz92tbh2yfamvsjp1tigkocusd4dgo41ilobqo2kqfhzg2zdvkue630qnr',
                flowComponent: 'fxznev3ugm9ps3mjg2bqi2inr6oquyv442j65iclv1vgb4l524f4tjz5oflogcuy6ou19de2jatci7iatm1xkdmixttl4efsrc6j9mjgffecra2hriahpyxl1hpn841kvhi7ztljrksrej7kxsnvd1cplqpmcule',
                flowInterfaceName: 'fzdykrbawbix95or9fz1kyywpv0ofue1to1s78z4id9oqj3xqo87hk6a3tclc54xcy62fo93x7sybsj4zhinj1hoi0eeduzh7phyc0h5tq3q2eeb8krl7ow6x5gg1sc3s96ty1602a3i0b81gwj6z07udzgjhy3a',
                flowInterfaceNamespace: 'j7eeoivldvh4ec909u1yzwzmvpo6oi0rhu3nntb4i0nd6oc0mbrbct7we6qndrm8k6hz45vaysh1w8qd2pvm1zjw6tinjvvouc3m6jiwwafz3f5hce1zcv4xduc27r4ar0iilatrak8zy042xf6p06cmd5chqun8',
                status: 'ERROR',
                detail: 'Eaque animi nisi dolorum autem iusto voluptatem ut a. Et dolor voluptas dolor et. Et sapiente eius fuga aliquam nisi accusamus omnis omnis id.',
                example: '4p551qiyysvzfpl9m1u66wb2i7l42acjxff8o3muizywaca1aswisd49icsx00zd22qap642kzb2e8tcqirq2zxbqps6oxbf7thz2ro5z25tx240bfwqpg70ms1n4ky3jej4qpaffawtrq8uw7zcsigp3u1j2sdp',
                startTimeAt: '2020-07-21 22:33:01',
                direction: 'bu3u77f9nuw1kqpcait4',
                errorCategory: 'jty08d2sc08me1g2ixkawqwv3gjoqjmre0qnwzwh9snkvairketfsj2bygy1b91l0k1y9ogilv2wih7xn3kolcezj3l3z53o9t5e2h5l77e148qsocxqyzxszv0kr795opt57bmr3o6qv9vr7czia0aa86ie7qe6',
                errorCode: '3omfx0e0r5tnnbwfa276',
                errorLabel: 'gob1sdt10n7ao9k2pehmg4lg6ef7otstdzwusdihf3v23rizygnx7mgw07qlqimwyc6odl3utyhjbsotm4lfi1yuhnve6o0nv4ejzx1tk74ib72h613s1edtqztj5cdmc6qb062b3puieq7bhikkj1g6v9k3m1op',
                node: 9223494606,
                protocol: 'tocm9u3mdiujjboodcom',
                qualityOfService: '78k8guu43k8qnvpq8pl8',
                receiverParty: 'ees9927cuuyx52lc6pe8wzfewo0jha4imb18asj0g5dmdigxeukywd3u4s1k9n2rrqwbfudedljm28ga262vuwia4vc4k4dhxojiprmjicnjg43khn2ssa34ziglgrdnoyiih2cfbzw96qoo5bvwr9hriz0snf35',
                receiverComponent: 'm3m9vhiyi6fpd1vzzjpie4m4y4njeqwdsly1bxwsoqv3d356p8lb3mbtsaukb6gxtixo1prnc9cgfeowycphnosv54c8i6klrb562ua6cvij0mmsdnpx7nmbj44o92p28osss9bu322gln0g2cvg0mvv74hk3bfz',
                receiverInterface: 'v3x0aabbdcdui5vztcxcuk0fowkjj4yc9byiaa59pfqodh5o58itvvkx27dn58r9lbg3xs4t82iq6zz6spfykhj12h51p3fzifdkh40vh1souk8siv7nawadel3328oghgbmqciueknbieg1laljee3amhl5ayc0',
                receiverInterfaceNamespace: 'pjc9ase8hrhk2zbfflu4e0rpgtdfz39gg9h3u265hacp7g6zd04zq9hedpxes37g7dh855xl9rztj06qq5t805qcd372tw7e82xzh3g9hl33186g8ftkuonf254f44x6drubuj1xu7a52p8pjjq5c0z444vnvrrz',
                retries: 8333087869,
                size: 9773356292,
                timesFailed: 6941106386,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'erl90r53d5416ornfnm5',
                scenario: 'xwrf5i4dgekitabrboamou1410q2tx6wlyrcw723n4d44zthov5ybyvy2l46',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 13:47:48',
                executionMonitoringEndAt: '2020-07-21 02:08:37',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '6jletubjq68jlknwzd86qqw8th04wct2oxtfdq0vzuhxqhnsczw85ou0mt2528ohnjhx1qzxttqumwzbb6kyy8j05mjwx60drxq1ny7nbevvnb7byr1yb6nsbwvf0wvjrut2ht57ztis27guov47e3s1mi7fbkut',
                flowComponent: 'dcnns3x29vzegw6c73nlwx5g5zdl5hbnxl88bcj7ccame14owwp89jkqbbo8u7a2lsa9mjuhqxf2bbjj72p8k01uq3sqkcxdnl76ntgo0sm1k7uv6tum8uztqhjr6shbp3p1oy7p082k9yf8khk1bv0cf1sx333x',
                flowInterfaceName: 'plyq7wfjvg4nz58oj9smimfbmuskujxtzaryih88uedomdhy2yfembnf8ktxmaxnzd3pd313zu6ux359lyouzgjzkmjvuci1rcolywjk1gj261k8o9hmzmtnxh8qqnjz18sjhdoa0g4wff8wkg3xfvu0b6er771y',
                flowInterfaceNamespace: 'qwog1aypfm6p22tm7azd454lddaud6g9v3jvxc4iijk5tixxjh1urhudgwxznkq1ov819ojfcx37i7t1e5f46281ehfy0bv5v740nw58oco8hp86z949qjbymvhivjerp89nq0unzhofya8cew1unwhtg24flgjj',
                status: 'DELIVERING',
                detail: 'Voluptatem similique sint voluptates. Rerum vel dicta error inventore culpa. Qui nisi id eligendi. Et qui et eligendi ut delectus perferendis. Quis aut deleniti cupiditate quos esse accusamus explicabo.',
                example: '2c21xvyj2z4snctln41hhjexkep2r4sm9o25v63f7gbxyan4kj5nntgbuhwubw2d4n71scjh0awujin6d2rz2h8p5yvdtco7e5011tr6zzty9hbaanskrn59wkafzkjnjldg0oa9ec3wguvlz99g6oqgga84igs1',
                startTimeAt: '2020-07-21 09:29:43',
                direction: '6x59wwyb28k71u1o1bme',
                errorCategory: 'a1j65jv7yiatj94e950an2gpanhlnyun3rlfpkpbiv6ohdxjvniw2plkqq0wicau8e07vsr3ib3v6m0fj1lbpqa4hl4g6ywdnqc7sf2i902ya9zho4029cgmwseud7ie1a4m9wpr61fii5t822bf3z1rh791rpa9',
                errorCode: 'r1dxf8m2cwmyawetlhb7',
                errorLabel: 'zpynlx25lzi8wy81yc9f5cpv5ugghtfjbx5rbcbhespu432fqwq5wafjrb7ur7oov6dnxgdj26f3ncvk2xw1p910dg90j4o6s32qbdd93qq0qh5runh0ux4yk9ikg80jqyya4l5i6ck1g98ou7scof9rnw62f90k',
                node: 9455362668,
                protocol: 'j34849i7ty11y7xmo1vh',
                qualityOfService: 'sg5x2n11ltbeeadujb0c',
                receiverParty: '9mrah0h77a9awmf2rudy6l7a7u53kjkq0f3ylgs2sf0gzho9dmqo9172aajxlkaf2twl4v6nuliq431xssbbme7mpztsf36cagfjf11klmk7m2ybu0pspb290669eqh7bzls6lypxorserhe821i8zsikb0wnc9w',
                receiverComponent: 'f8ujgunqnszl3b9iduqdk3s9om3dc6mnqmtoeibqb55bb2qxcpncyzr8wihet71bfx46nhxy8yt4u3tp6hla8va243c9m1t61zkuhep9mtw8v1dudgdg6j24fbhmhgsjcw5iu3coyjc91f21c3mlxv068h1cnzg9',
                receiverInterface: 'uz4k6ny18t73j3kuue9mi3pglhsb182hyt0o9t7zaya0swvagtmx6r5hsqb4po5ecgy29y4l5dato3lxcjlualo8s7qjn4avvjxxjwi7d331f7z67q85mnzejtr9fdu5b3srl7vgw6ro2zp2ofgnpany1uym0bb8',
                receiverInterfaceNamespace: 'j6buywqdua70y9ludmbrw0o4edgd9qbdman788psgkn86h6q3wbctmon942mn0pscxudgt867lc4d1osuznak14huu2kzjpge1fa8t7g5ypqucnkvqba5ng897rcu9l7ahs1nowq0e5033p0kvy6b2zfx4u8c2iy',
                retries: 1257682209,
                size: 6843443736,
                timesFailed: 8757514407,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'cm6i46exorexqushseie',
                scenario: 'njl0dgymuie4bvt8s44bpcrhqv1a56hjprjrnfda6f0me186y1kmtwz52a0i',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 13:02:58',
                executionMonitoringEndAt: '2020-07-21 18:23:18',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'q9tlvhsstvl2zk7itmiih1qee9gbh420evnxfsfva142cd4k40r64q0i97hhd4renbk7lkvzt8oofxz1zg2qlcavrr4nv7xgprx10irv99ut6fgdmnxzar5bq0wsijwd3tzmjxmz0qwe0wcec8kgqtznv4qlhja0',
                flowComponent: 'h6yad1zufpea0rcrqdfygxzkheo3o6xguy6mn1rpivii74lccd3r7k3qlm1qu2gj0tx2edfem6ykt8wmn3zf2qotkt7z4z8b7i018lf0jy7v7pu6mxm860sch1rmejrc33ed5b1a2sliroknncreez9x1zvi3q7w',
                flowInterfaceName: 'dst5tg28dbue8e24sf0rav3994wzvu72n1l99vpezw1s7dv7d8sidxy1qfen06x0hnv07dniqacddcleuwpr8flulc87vm09lplb8a973pbz08uke2x825ip40ptp0gdugqrjw3260a6rve4yhdidtgqrodiuk7g',
                flowInterfaceNamespace: '7ndjuvy5vc2556dcv2uu7o6kmx15to4oclnkophgtfujjsfdm63gzsks618tlk39plbchljxx3m5ubmrbjdt56vq8o0bnfet3m8xdmdqubwfe4r5umzghiz4lp3qariobkre7mijjior0p0xjhzjdopn8rreuglj',
                status: 'TO_BE_DELIVERED',
                detail: 'Beatae eveniet provident. Ut sit nulla cum optio aliquid in. Soluta odit debitis non repellendus aliquam cupiditate ratione et. Ad magnam quod consequatur. In eius quas modi. Animi qui eius perspiciatis voluptatem veritatis.',
                example: 'tlf03kzbgyf66o8j11us682gouzzyiqad8mwx4g2utrray2ztgmkczl47wyynpk1ijkp38s5ixbnrtc4qok8do5k4jdne4dmao4r0sk6eahvrl7gn39h7tky04o58z50f4yptqan0z7ydslx1gqnsjsb4lfmxven',
                startTimeAt: '2020-07-21 15:53:15',
                direction: 'qd82eiwmv7fy8mlbax3b',
                errorCategory: '6lofeujrqo0r2eodbn1ef21bav1p1y6pkgpt5wtup5iqm9mo7ulha8kshztvdopvq45x34jvczj2yvhzc2ngyusttlz3wc0iyy2he5gyagkc4u6wh469cweh8vv6ohr1129bcfpl7sv9dd7e3yb7slu370dt3zg0',
                errorCode: '5c3ra6ruxf50ye2lkrtq',
                errorLabel: 'jms13o9rejkiikl67escildm2y11oletleppc13bvu28blexii2ejapujxclsh0xrhnhoiylyuvdpz1ubt7papo46s3u9ddao1uq7ua6ovl8e7yx0inzqkkk9pixlpa9ghhqjdgkvhv5owouv168mb73zs62uqxe',
                node: 6032543265,
                protocol: '61y4r1egz7kbkrczddlu',
                qualityOfService: 'ikcxspnijdw52aeudxbh',
                receiverParty: 'pz0klyvk0qsjny9xnyvemb59fqha1g9xq22jyf2vbwgul5mdxolewlso2t8efqtjrh4cxk5kf9pa0fnrfk4wjvol17xhirxkf5bvzlix84mpk09lwn51gq206pyzf9xklbl500fo4nabz593621zlhjqo18dq9fi',
                receiverComponent: 'smpev17eymvexuhbb6iuqgeb9yypq28gla7kns8p4oczvmweh6658nryg3f166jxb8e2ubxm7wui1ziw16k96nxpe8jw36osu44qsdgfivujsub2jf9lgo345siqj3xvqbyblsq2oueoa6toxu4bixtt9z89on8x',
                receiverInterface: 'y9epdopm5qq04l6exq3o45qr9detbusvip4i2utt2h0i718j2hl4u2kqjj0chqd6s2g4qe0wxoy2ghez0vkbsnvfzx77yx6hue49a4fkideauzuz48164egii3jnytnsxrf88tng4didfjn5scf9wi5q4yrvyzjr',
                receiverInterfaceNamespace: '5reqwk4vsacmyuql9p2pajvd21okpck705b85qor4hudnt8meicb28k2efgtzk7f9qof04zcg0ucwx3sg2fdcju3zquafangmferccb2p2qc0ptw53jbxa824l51rj85fpwuvgk41r2o0btf61zz422lxvibxr2m',
                retries: 4052956473,
                size: 1969603280,
                timesFailed: 2336181494,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '0i4ib831fb80914h2we6',
                scenario: 'xgqvqaswhsniy40rly2h1eabfejymlv4oev6tkj7l4xw3p6jrfmiey8gtk2j',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:37:21',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 00:57:45',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'h5utq9yjpshgfmfmuo17js64slqcgbu762wdxjgq33m4kblf3yl9glmxb7t2f5yu39kwtj1wrtzyezuw0pgbhi2wyjxwn9p5vgleri2sdwgelc3oob72k75wqe874qabmo7cdc4ft88ox9492usk7glw3n66b18m',
                flowComponent: 'buwl9mnjneu486j38fbz9oy0fg65w9kwl6o6k8mtgpwaqi0bs18j0ud5ecefzdbsgaptkn79pqc716zzkh34ok40hlqvyqgc0srgxqpm2yxs6lx865pvgx4lkl6p6g6duq8nj5a3woascz8awi9o3aosb7oqtqt1',
                flowInterfaceName: 'ly5sz9zeq4ph1mzjzdiopcy1au1rn9xqcq5vcpap9qp9u3hwhoy7tbccbl42c640pg23c2wuhg4esjexe7jkqsl5z1feklvoqolaa1lwuznjp2mnkxt65sizawg4jailshgsceo0jvmcakxixy6qdr5dyxytoueh',
                flowInterfaceNamespace: 'oq1ph9owmupz4kzlvym5e8ro2kqm6gdp8mrf1tunpyolme26w8jqxls8ov2as6pyncszv8gw10591irfiuvdpx8h46hellx7p8vi3zszo8ehur2zk4s8afc4idfllr19ter4xdbr1rcy5p7i415y7u3igmclegga',
                status: 'ERROR',
                detail: 'Officiis aperiam temporibus rerum quod. Et quis ullam optio consequuntur consequatur laboriosam laboriosam ea error. Et autem nam aperiam at alias eum. Aut rem fugiat eum id qui nostrum laudantium corporis.',
                example: 'os5shkzm5ldquw24scjp4v8o5lbvznz1kpmm9d72qwhc3vh2c6fdjkl53lnrg68y8zmsclasj2ipdotvm3607g1u4s4wtfgmx9ev7hez94utbbujmmh2ebcqjaf71v574ep4bqoomh3d7um0zt06512zhxexlu06',
                startTimeAt: '2020-07-21 02:03:30',
                direction: 'nbtv6amhk7igviptf1jk',
                errorCategory: 'g9moqryu78oem2s7wjgso9b7xlmgf9s25944oonrm5g1iovmrt8h2pooezro6h6mn9l5gdhvedovd5doi3fg8zojsrzq3e3zlk9qyfctqvwu8xvpw8pc9h73wghq2oionedhhh1qnf1txk7o06vm0n07dehhqjhn',
                errorCode: 'xv7yloumiov37ekte2f2',
                errorLabel: 'fjjloriqqj6r97ahy9fbpgy003nmraibg5k4iu11xop23qoripe8gr0na2glm7vbkrey2ucyorfnnt6n0rqxa0mb5cxyvew3kw5677p93uwfzllen8s1yv6b23dsf2zwpytcgkjggak7skmmwl4aeslt82iqmsoz',
                node: 1767870825,
                protocol: '4uc5t9pyb0wouypg7veb',
                qualityOfService: 'bxxdwihxox78nzmjqvxi',
                receiverParty: 'n2x52j5bpzko4c49qjdt6c7fask27v7wddfgouk8k8j3br1ky2fo8ml9k9m3giwt58vkvxgd4n7uhigsvsffiiyh50e3obikwrta2tz5fbzdu4se75smm5felsz8d8liv7vqlz6m7ph9slnhin1y2ngyi65o7xp1',
                receiverComponent: 'tgl1ylvvj718kl14lbgyj46rxi187wzrg26gnbjqif7wt1fyd4hst8kvrlo7rupaieikoc0h2w56jchfi7u0ca9l4qldwcsvbnfu6xe3gpyqr04nkig8y03peu4ig3cngdbjcz8oa34hjxryozgvqeycihqbss2x',
                receiverInterface: 'ew0z9w2th2tlyqw5ukqb88i4svwkl3z6x1jrdbn1yawgre42wuq114fd4ph7zrqm3u8ww29kwitkiwmmpdqp2qp9gc6b75ktbp1q59h42h9do8grxlb75ybunuxcea0enqjvm8oedzwspm95xfmd2184675qp0tl',
                receiverInterfaceNamespace: '8hnwwrkgome978wf709bwj4lms6k2wcrthvlunbb3otisayw3q5rzgztbetec0nw6hcvhqrtxfes5rk5d2sc23pxmfyfjcvc785vb6cx9pppbvrjwfmfqt8zksu7zra7rtj7v28wde8owi4acyvmzpwqebiip2xr',
                retries: 1738767631,
                size: 6973421806,
                timesFailed: 3789864250,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '3bilh9rb1bv5fu0eulr7',
                scenario: 'yug9x67kiww9gkpcp5chp7qq7ztxu4387slmy1rt1xs19ux5yzk66ytxivf7',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:08:49',
                
                executionMonitoringEndAt: '2020-07-21 08:13:08',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '4wo9e3nwtejyi1wrwe5twgc7qy1bkd80fyhmifrxk3wcroln1e1ui5x7sdn98p13a86etndkezmh19vhl7ewntyl5zwz4gr030lyr6l9xgle92ycsmn67dtortqf76dquzmj76b7caaipvm792owitefvfdw2fnc',
                flowComponent: '1qvylp7yvscj1ay4hdug6we9ec4zx7d7lvrrb258a7nd0fn0pjzatkyy9w1m21mgk4z35w7hcgkcfsl7il283xwjdliccjy3j5i0ya0muvyv2ib5wfvsjqyw7ga7gpqi260ew3aqrkuuzamhv4ohz33mvj4y9maj',
                flowInterfaceName: 'ut41djaswt2vxm7xxk7eh39rbhg7s7cdnfb2r5h2nyo9aad5pl8yi1iwifi88mh03kgwjz8brlb6nv7kzhrnxb72sjosixcdfwfqxu1vycadqjshkh6s1gb2oam58ud9e3l8gzkomj7n5xxypfyib79nv8djdbca',
                flowInterfaceNamespace: 'nwkgeuzgjs3flg8l4wqvnw2bqnkooycluj9jdj3dirxmvbcm1pyyy1g98cfw9wjzallnqcvbi1x01w4rijhcrl1tu21p33u5q5v2dlb2bi6i8c54dtgk0hi04nnvly8p26qiix4es64q2hi57p14psctg1emjqrq',
                status: 'HOLDING',
                detail: 'Ut et quidem qui itaque sed accusamus reprehenderit quidem. Ut excepturi delectus iusto laborum consequatur reiciendis. Ut magni fugit corrupti dolorem enim eaque enim architecto. Ipsum sed eum. Repellendus aliquam delectus soluta vel ut id. Explicabo corporis aspernatur.',
                example: '5uhemvm5au4vr1b9fxjvym2smaj9jkyeaiu6yncitlq9nu0lcbvu9mu7wofkckwg0l2lc7x136hck3edfuot3aqgseyn5e1n5l1eebrf1vrjqbvr5ajmxh6j8jez5swurabv6i23vzi7447x28xvcpqruzo7ma9k',
                startTimeAt: '2020-07-21 19:46:22',
                direction: '5ujrd7j4898mzyxtvpyt',
                errorCategory: '9efxql01yzjpx8rgfo21ajgds7s8hzpjbszhug0u1b1b9m885f22po9catbc4zh0fyw7u0l515yk6xya8tvgrl8f3lp0kthcyg3bh566dymi515jowurszwpue1p7ykzvf4fp5vtg2jud2dw8isng576sctj7zib',
                errorCode: 'zfoytdtevqmlec8lq0bp',
                errorLabel: 'amhecpz3ntzhvhpv2dg621ffrkcsu12j1pi310nbo6fimhpb2pkdjn5ds7jnfz1xlctolcrfesxx6vl15rrla248iko2k9kqrpyejvnvbxhcxzglkhs8v904iiv4kswxb9hgq5o1flzqu7ku94gqk2f19my0anud',
                node: 6666237385,
                protocol: 'emx47tzyzbdcocukys1k',
                qualityOfService: 'c3m35nbyvdtfp0vtfyzi',
                receiverParty: '1euuyzpfzmpveb4df202wthjyl4mwuqi6w2xluppd0e9sivvfc9sr9hgkwf1tzdyivizo2qqo1tsgwqmqzqyl90iaeiatwnw80k6p4wplpsfi7i8wjqcbdw0jphks2tqanlh9ym92ze87sxlyo87w2hnqfie3cbk',
                receiverComponent: 'ju37qpx5ezvclwq7vsy910ic0zsxcyqedumxrck5wom0fo9kqgtnq22gb3fjc3afaekcw8di2d0mcrhvg62onz740hdez1437613pnia4g2fwlrymyguw016g6jjmmrtimvs55yitqutqj6xfu5pvnvbnr3ac8rt',
                receiverInterface: 'wz5to46155hzf53nq7kg13bk0d5da5dbv2gp3dyy2jdjzjj3xbim4azcmfatdnhm0wamcj7vwqfrcrlxhupl83dxd24lbhjtymxfjk3hxxw1uketr7e8aaehdw1f5txmvkmfygfjy3y0qvbczidrldkx434lmvet',
                receiverInterfaceNamespace: 'pqg2pbwxnef3z8rmd31olmttcfpbuooqvy0kzleuibmyamr43x0esl26ztxo5kkrx645uvmy9ey4st4d1vbhgarea165b1rglqp47ejy4qrbh9v623lcsgxv3mk9iuh6qe7jurfgm0smqq9gx7ym7wsr9kayw73d',
                retries: 3881223544,
                size: 1044449507,
                timesFailed: 8063414616,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'zokwrqidv3tse6t6o7wu',
                scenario: '9aidtix0i0cbn9z0jkrs0n821ynmwksyznsr2r0rzg9oh5s9htd7jiy44pk4',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:53:56',
                executionMonitoringStartAt: '2020-07-21 04:31:01',
                executionMonitoringEndAt: null,
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'q2azasolazf9tblda38aiu41g5048r3di30hnc9a9bs253tqkxerfi3yvlls6m11efqk5e371ap66nl12uhfwcidsgaviwpx1uv6gr1zcrhlx85k68tczqyj9ailq0q2al2y2vpr3c2gqjh3lwxl7xiftyj6bkww',
                flowComponent: '3tpnoqnvb9bf26sp6j8ko79qtlcgp2z4u2bfwjsz620kmj224vd4xf9p5kievuazz1ynvrnb08hl2q6o87mbqiipyywd52q79x2txs0wy1ncs2ysepjjgsxooqomjt6h0zqms2ycm18ilrbe5rf85j57oek77gti',
                flowInterfaceName: 'g0uh51qy58z4q8e2fpd8xqyzi4onh3kb3v9yaefpo5jr97aonoz6zkdbvinv5zzem1shw6gya5q402ruxvvz662u49s3x4ly5lpqwmmelflhcy5vkvh1sd9m1pn0dolmwyaenc5j0f0k5c2xoukd4woa4lim0kj3',
                flowInterfaceNamespace: 'nwq07yh5sqejz1t7w4we6anaeyqaebgcglrxgoexo1ovchrk45o3ch2p84r71k872jcbh4q4fo5hr7r5iqeaeyqvboqkkmbbb5bs22ut7ulnssk4nlzyow2igvzwyy14uvnm7l7uovpiltx4e8int98k48ejo8b9',
                status: 'TO_BE_DELIVERED',
                detail: 'Aut dolores cum nobis ut dolor harum inventore inventore molestiae. Aut necessitatibus aut ea. Sed eos voluptatem aliquid animi. Suscipit commodi exercitationem voluptatum earum perspiciatis asperiores et quod et.',
                example: 'ul3m3wpn1gmdkjm0tu064wri9xgpsqj40hhiehnb0vh9z9w0svtnpiaxax6vsr4f5s9hjhgqj56pwt6xkwi384ava2bv47fx9aqg4cc6edjhyf0ic7i1u3wbm3519kki29by3tsrqnogbuad11sbzir9aw2akhka',
                startTimeAt: '2020-07-21 20:27:49',
                direction: 'imh5ngcwj7u6ej5c67n0',
                errorCategory: '28t1gbu042k16ftbu12d9z1more5go2ip35dcz8xo260m7d0z0j0d0pjs1st7zzuy1590z2fixr5c994lnbthgjic1cwzikr4agc088ipsnyo8rznmry4esw61q1jl1vrr3b41kcfvohnlv8mf5phowqsc1c4vr2',
                errorCode: 'cpqrbf087yoi85ka13zr',
                errorLabel: '54g228v3jy9gv5igdo1bciyvmjjv4v4q9nzm5oi8fu7x6gzl8nxezr7jub4p99nypujarhynds9reum7om6mmbup9shtcp67au1tbj14dglbqmmqyw6oj6l1m3ey1pkthd438ippja4mpv61dbwnvf1s0rspj97b',
                node: 2938867239,
                protocol: 'itpbcg7kr5yc59993yul',
                qualityOfService: '598jb5lmw8m2ovm6xyr7',
                receiverParty: 'ya3cie08k5fvtb2n2cp2s9ausxxzc10qa22gdmjrituk6p9dmx8vsqtg9m4icxc9567gu72doc4hpkzb8s5dx9mbv6nf109ix50so3z6vy5hnf7fggvcz727f7e93w2cb8ba11ykk9m6g76op2d6pgr4y5dtll32',
                receiverComponent: 'rfbt6j1b8gmiknjd2d4iighjirmxrtizt763k3r7yavd6nvzfokwbx8tjcoiubeg55i6jkf8pedz5ib8t4k5ucc7fjc39u70ul23y3ssr04l17towdozo2zqisbdg8rpf6037a427s4aqx5jxmlqh9nyamkrmgee',
                receiverInterface: 'zvlua0zxgi5vpza2ze4ro3tdw1qdgwujf24x1jc89kpz2bkf4337fxsyros8olpb2x5v50sf2bh99x20r29b9j94y46b3ld6go54vyziwcmilkx6rj8bo33ct5ygp3knazl1kqtae01gubzn55jdws9xna2p06un',
                receiverInterfaceNamespace: '6i726wgh4s9h5mti6usb56jy5stjxi8ywfj6qe5wooa5u07famneyeon75og76nb687g7vsy0bbkdwf8omwozhzisx26i5n3qbmpupw3db1qzm4u5fnw3qvpne6sjtq0b8as5up7ulygfg1huudsmy8b3jr0pryy',
                retries: 5136871442,
                size: 1797484392,
                timesFailed: 6753353091,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'duzb66dgm91cvjc3968l',
                scenario: 'scqo4ykb8n76qfsgieozsf1jnoxae640dj0k9og4u4bwsqhhur9osvl1uxl8',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:39:29',
                executionMonitoringStartAt: '2020-07-21 10:14:42',
                
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ed2qu5qttzu8wr2arrpepl6nsv6zvqcuwd9ka5tvxssf7w3u7yf3hoyp8g30cs8tbmbv7ou8ezcd9xok279xlsl221pq1o4hx4cqnc5u9cmj26lxmx2g747jmuo7gbcpv1307qlcnsfa5mpm5t1rlm822tw7j8ct',
                flowComponent: 'hxn124l2fymqfxqmlzlxxz7qem22exf9nddnclzshy53tfde76o1ww4xz91d4e7vtuwnhzi22p34wg514es3by2akzbsjvtc76ajwa2rtc6j4ubk678b88n3q3ke4zj4vdgb0sf5usvh96zrb0jb16jnycrvx1h5',
                flowInterfaceName: 'cjvb0yssawpxfru85jy693cpugendhf2vvo1htnjl0faovkyeny1mi00ham3014lk07ljpltn68vv20ie0y89ciq2helccgb0a84r3twikzt36l2v4h3pj60ghdni2tjktsg9hkvnv3e1fp58iirvjv6mei131st',
                flowInterfaceNamespace: 'qxjw8ze7g75ctshxmk9ms7rpbu310afdo79xpy9mk6bilkibnd07m1sy1957a0pye5zoseg6feidi05jxsmnd3qik43kaqzlq368vw7qxok9djrip9kk29xaskhj9nm9tw01nx95zvkyeuqdx8qwtvliyhxt6wqj',
                status: 'TO_BE_DELIVERED',
                detail: 'Tempore optio ipsam in dolores est voluptas itaque. Vitae voluptates nesciunt. Inventore ducimus quia voluptatem sapiente voluptas laborum. Nobis nesciunt ullam dolorem non nesciunt iusto laudantium dignissimos et.',
                example: 'j7abnsfhblq1bip8aa9o9kigkhg2kyedpjjxdcz0prpox976xff63ol77j6iuexsuvl1hu1j4z658bk79kbguqzerqusytxvrg70l4qyxc65usn22pbqctd1cbxoc9d5g5ylm2j38diassb9fdfcix3end3yjkhi',
                startTimeAt: '2020-07-21 09:09:46',
                direction: 'w65hpvltd5ro3f2bftpu',
                errorCategory: 'bctsfg4ej2s1q9so07ei65fvvsfggf0q36m9vizbjbrcsm5pnu9p6grgkiugdddis0w6vzl4znay9h3a9jx8qq9xyxntrsflhxc2fygd9nznlukpy09p6o425903rhbkm24ghqpj15z1m1iipaj6aj82lmifrq1g',
                errorCode: 'd9n74k1t7ec4xyvi3r2i',
                errorLabel: 'ccl2o0jmogu6oa1yr01jyz5e02re25icyci1d87gcoskeyz3w8xg43aikzul9je28cryf74tkmbre27n2b881mi5iweg5lebrj8iqaxz6upqxwy344t0s8s25npn52oi09xiieefk0upalmtwvgm35ao68p8sd1d',
                node: 9541857237,
                protocol: 'gzkaawa0nzrmztt7xiyl',
                qualityOfService: 'lhprh0z8iwlbrn9zqcj0',
                receiverParty: '36ylahuh395iuw3zcgtjd5614rtrsz1dfssfocxmkdeuua7e9i6b3z3gohj9hqjk4l7pzqsp2f5hmk4k9ufa8gs0vpo84dvdpkh06hdacdindlxszci07d88z9czxcl1kyh1jcyof8i97p1t7bzyvwm7jd1a3qd3',
                receiverComponent: 'zjqow779x8q36pq7da1wnhhdmlkq3qbpl4942rbdi5vfx9fkw4dmdonjaaush4jn67owkj4y4ahkd69cd022j88p1groivq26m8mqldgb12l0os53fmxids0vipw77dz8yovqy6dx6k3iws8mybi7u5qf2hwwu9u',
                receiverInterface: 'syl6b8ctrfc6wycosuw4091cc151am5k11ohhpaj9jcphqwpux88dyewyy49msx1ctej5zb6herrljw0fpr85e2x5cpggsjh5ngzmtt03a0vvlb4nhp1dnl5mm9ofangv858132scm8u3x2ofrw68vm9c6yo1f9y',
                receiverInterfaceNamespace: 'khdhqep7ggn6olpa09nctyw5ekcskdfk8ij1pr7wvaohdbfy1lpuclb0udnfcvukqhkaw68sa25fsq5vejeqiqflz008jiq60cml16jmqexv5wrqy4kv3dkfvnc4ptlom515anrh8qgiegccjxng9bof73wbm48u',
                retries: 5163737547,
                size: 4266204072,
                timesFailed: 6146183550,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '6r4o03bijd7c2nn2encf',
                scenario: 'k01nl3gb7tju1fthbv342ay3fdtkjhdu88vx5zn85t4830ijbsi1j90jicbf',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:12:41',
                executionMonitoringStartAt: '2020-07-21 23:15:43',
                executionMonitoringEndAt: '2020-07-21 04:54:36',
                flowId: null,
                flowParty: 'wk60vi8nfadk0ij14u5rxbit9k9wslwaainj05x765xk33y5tjdevl5orz8rmb5rjl269z6s5c440kcmcllpyp6awdr6y775u7dn0etd4485yv0im9p2zowoeu9ikowy1om7rvxklju2uun991refy6drg2ur05q',
                flowComponent: '0cptkertnjkdscwu22pzmh2l1e4omkjs5jh4hkmljuruwpug4d2qqm3y9lxow53x4pkf08c5psk6gcc9tqhgw2rgl5u80slj4iemvotzhyxe320lihv64cj0xkja4b4uxh5cg9arwk7kv3lx1vzclxjm16ncbt7o',
                flowInterfaceName: 'ioq27x6yaiwrm7sbinr62306yjsvkjv6e4m3jn2izjvdw6toyiko5xc190qer704zxdzo0lnxlcamwgoaim4u0u3sdvqzqjrqxjwbwsjcjzonb2nvs7ybdvlb6vpjjh6v2vtuwqh344xmkote13v4v5b5rneg6s7',
                flowInterfaceNamespace: 'vn0piflthrjeo8kp7lbm3lkwl2olkvjg7b0vk0rw87n20y8xgdhfhem3zlorualaci8wvwtt217rvsidugnnua1v93821ajybxgfc634vuz17jz9jr1yuverdx3camskj71e1jjz4ak71r07b1lcdgj7vcf0ms2y',
                status: 'WAITING',
                detail: 'Quae iusto sit quos ea dolorum ut. Doloribus rerum ipsum ab aut. Et est voluptatum tenetur voluptates pariatur.',
                example: 'wdcvuabw8gnpiwszbx0b8oas0c082jiwv6rqv36hyug24xhdozgrlhq54ld02hid6qloa6pq01lgjufr7y6mxq35y22vfk4xmzm00x008wpw0mfcexttvvts1hccm05kiv3y52fqvnihtfamb2bz71u5qqk0szkq',
                startTimeAt: '2020-07-21 22:03:39',
                direction: 'd5e626l088ps088ejhoz',
                errorCategory: '1uz3dzpyuqgrerckp8jz1en99b5433xrmwphzamnzs1a8hf1xl9lnll02rqzno0zg34kf67rlvizt9xlb56nx7cxosly6ne530cx7fz0h2bwej1ideuald213407w9fr5yewu6ogz87tj9kg2o6scc1aj4iujl1n',
                errorCode: '5319904s1f5d3na6qler',
                errorLabel: 'nljlqy90sw2uddwruxzw623h56983bunz0jo4jn4gma9r8vcu8krfnrqhhl170r5jjztwzvr2q8fu2vckr9l00q15zkdvye6v3qk96tq0dcs0ch11ss3v9nn8zzyi3tgovk9mfkjkccz7qofo56tuxhnjutp1fvj',
                node: 9185587109,
                protocol: '5qxbxydwm00xt1d4j4gq',
                qualityOfService: 'wq3tdeltrvplaznqkv4u',
                receiverParty: 'l3jvn930tmf99lo8xxlifgpwmnnj2pczs8dawy536auuewl7fvhxfj8elgxh6z7porwznuodajn23odn80rbvmddelv8zc96fw2ktbjlktdufast2habdwj2zkr4na61upg83mc7tl8lamcubukxr0c1zq8rha3q',
                receiverComponent: 'yw5bp35j73aaz9to1oshvsst8p7dej6dgf2915i0t7d717wwcvi9e9rs54pocycuh3npmz3ph5muryuq88i5siw50ave2hmwj73436lmgps3oe3vxuectv7dktil1p3vkqkhv8zeoeazkkxaems8tsviyf9n7sz6',
                receiverInterface: 'yxyhbfceioyj511c4t8f6hk4w3dv2sjspva4cybmwrjdn0b37koeql77lm365y2exnruufaospowjy7lnyqv1jqfcwaju434rz522zfktdhzuin48noo52zmdj3n1k1y48apgz039yna6vnheo2i0r5jwzvhaocs',
                receiverInterfaceNamespace: 'cq65nbabvwqoupz1zbf0hn4h1x1o0xvhdfgwjw89djx10sck9640mparw59my107hnqfh7vn1jse5z1q4b99i8633wchwqmn57qmpa71iuqwqnsmrjhpzgeualeu6wgzdlrbd3st8eme2ippis3yeb97z06y82oq',
                retries: 1677607240,
                size: 6900219707,
                timesFailed: 3106979852,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'jfefwbr9vfsljs4w75t4',
                scenario: 'he8bfa9vf31eom88nv3qq3ssm1u66e9aqa9pycl43tontfkhx7pxrsus9ff0',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:46:21',
                executionMonitoringStartAt: '2020-07-21 08:54:38',
                executionMonitoringEndAt: '2020-07-21 14:23:48',
                
                flowParty: 'icktmgyxl0wuq30mkpjbm1nq4u5c8oqgp7hczmwb4xkktx547vx5s5ylgyzf4x37hb7wgjvezis5cth1r5z87ip7a6f03sbrkl12b5d0r21su8tpvoponrbq5vsnitw7lyhitvvxbpwk2brgkjsl8xzuiwzewfb8',
                flowComponent: '557h3tr5gp1xilwgjefp7jrvtw3x27r95zqluc3bpxseml78v0dc2f3id7aejvroyk824ld8jzkapzagwmvf2fv0g4lnlqhlaachyu4av3tlgo4mxvatjd859i3taej6sjpp1k0dkp40ug7az0hryj4jwwx7q69h',
                flowInterfaceName: 'kbe0dnkcoa12c88exwn02s5rhyxa9i14mhwfvkjn43ebgjm1hybjdsr4mbslzzhtus2wnpsnk7kbbd81z5ubefch1bt386w1d686j6o9b9ewqal3ayr75qz1jw89hs4xwvi8ftd2h9wexqytsqhem537dhq1hu4w',
                flowInterfaceNamespace: 'opli8xpqpyk9e0kclv9iy79ypgxji9jx8ed5l1txakgqxzf44dyjkc634bgyc3zprfkoa5pg3byqi32m10nnyeitcaj769f55gwwdkjttqf85e1c6ejlflb8voxrzdy4crdvg2lxhspw1wchezt6o0bm2wu1v543',
                status: 'HOLDING',
                detail: 'Quibusdam voluptatem quos possimus aut tempore voluptatem. Cupiditate quisquam eum eaque eos corrupti quasi rerum itaque doloribus. Veniam vel ex.',
                example: 'nscirvysfv4kmfzm6ro46853qaxflrqrr7tg7pd809x518178jzofkytfwufcwijfoq1bhm5sldhqvthmz7qwevv4v9oehnq0j0o8s0xohr48aflxgz9ax77huxg437yta6etywq5lnvbx5iv1g3mk3prrwugmwz',
                startTimeAt: '2020-07-21 09:35:16',
                direction: 'p2l53yhgh1azpic6zgmc',
                errorCategory: 'xmss1y1kztitti0p9gnrgggyirietr9kyu4b4tjn6jk6ogcoxbyrmsip3kzl4wkmefelusf1cv7nlozzzskzbhxg1p9lux2o0l7k43z8n2l9krc5pa1sraftqpz1fdogqueu08lv2tub1ibhmo5zwdat9nrrf8o1',
                errorCode: '4srnxbzdlo3h9csu1it1',
                errorLabel: 'ivzsa3dn9txlyylybmp08jzf27j4gk4sdtukd3dz3z1fefjd16tjjusv58pdoxqilmritw1ck4cjkqp26sk40fqlqyyvpy7if5k3hf34uqwdb1njxtthae08r8ouu3hoyry9p1bghvn3cx3wlgw6o0roi95hpqx1',
                node: 9960062766,
                protocol: 'hqpaxqujhgwh23hl50ad',
                qualityOfService: 'pljxqdjczuys8lgpjm6u',
                receiverParty: 'ovvjjhsfve96zxpod537lmhfxsxjbgfpbwnqbill143wq2e9kp6ckoulaeat7l297jh37rcml2pw5yta79m62jhxj6kikaxznpuha5ej74fq70428ph0f9bsh7nfbdbu0sn4etxgi6izga5h2uh3t22vncaufkmw',
                receiverComponent: 'ukkgtjovvzl90g3mg93qui2f9245y2hlifnwdh56rqsuisbq6gprp4npe052cuzdwczsimmdu02rg91v0us9pn3clkkxgmwtm3cjohvq01innegdd7s2fpqag1lw9xkp1b2kplm9gu2dzmyrqvtgfuoe0l2k3ri2',
                receiverInterface: 'yu56693o0jgomrawz97xteku7vk1kye3u3e5yw42l8v68yvpqmq22308d7xi6tm1feqzbur0epof7c0r4c17zmhc7cz6qfp16gqkuosv2flz8qnznrzhcb0y7mr7hw2ursjkwxyii20t0m285u4s0tm0277xon1k',
                receiverInterfaceNamespace: 'e8xyq55jx6om4rwzflxagoo0vd6aok1aq62kv9gsfo1gm5qxe34tejenkwgbkj5upxdai6lmvrbw0jq3pepvihjffh8rg25pmllw2glamy9ext3xj680419wngo0hant84qkivlkg6nmfszdw4fc14rzgiwp0beu',
                retries: 1409148165,
                size: 7946824993,
                timesFailed: 8610438797,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'xc7zqx6ug34dngz0e3bu',
                scenario: '4he4zrdhuja0lhq8dlzorp8rpi0oxapaadsd6s6axpgnr8js6m38nftsvdcd',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:05:31',
                executionMonitoringStartAt: '2020-07-21 17:02:44',
                executionMonitoringEndAt: '2020-07-21 23:49:15',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'e7my5uie5o6ac86qix4nq9we1tk2gtra51a7foc3udlbqneq2ve33sqsyodomn9l35m5m9at0y4f0tds8xzza1pfwds6d8ycykjtpenfofk37ymwbjyqgxaguewrglzzsz0wg9jwf8rwoi7vf2arewbtwxgghm63',
                flowComponent: null,
                flowInterfaceName: '2ojwno4v4lgp3gff5scctt9tlr20233fzh3h4whcxr19ha7t0v44jdkysh74ve0zxn7efpa7huox3esf1tu6hw6cvdyly4pnohnr06y9g5cqbwnc435zugzuyakoz6y9phpjkfddbujqpeqjhukvoj1uvsna4ws9',
                flowInterfaceNamespace: 'cld561nugiu2yea2kcspulywzuuwd0zxhmyzb3l0wuidetic2aymx5to8yeqyguanpp6z0jmr0aeu6ftfntbbfjdilwjm2xpqcjaa8brnvbuqxpg1x6k67hzuiwi7697ho5bpml2dhgh0q515trs0bc7jyj7usa6',
                status: 'ERROR',
                detail: 'Adipisci ratione magnam quo doloremque. Possimus aliquam quod enim autem deleniti doloribus est quos exercitationem. Deleniti minus earum a. Distinctio amet officiis tenetur facilis enim perferendis temporibus qui. Quasi reiciendis dolorem sunt laboriosam repellat sit perspiciatis aut.',
                example: 'sxr1wjyg9bs25dauj6s6qtka0u0liqt13stbtgfm4qnqswtif4uyy4077dclmlst8xf8tnxdwnt77qprmjq0ofv3dpygtoho7svln3iwaruogj6xr25ax8e2cxyul1duu45awq7odtsss8qlaqplgpwunpfim7yv',
                startTimeAt: '2020-07-21 16:51:21',
                direction: '2cjl4ruxw6p00o75pphw',
                errorCategory: 'yxc62wftdvaz8foidwo9gon76nqa900n9b6run9s3sglmr9kl9jgty1v07glo0q7v2nir7agw86fetssf1gm97mc2i9w1vqbhv6cy18kkaflal7714drzuwa12ax6w94x2ijdny6ivkuwnj1de4ua5obzrnxvpbt',
                errorCode: 'c0xzv47funv5312nfz68',
                errorLabel: 'v22ame8lz3849m7edetav9h881pp154xoak9tx1wxho2m2x4a05i9p2qnta3oqnzovngo94f6o2o3xmhfydiy9rry1ca3q1a9xdvonqlswb92t90zlqmqmorqmid71r9z852q5q2pbdvh48tikb3vlfg7do8n5yy',
                node: 2629439971,
                protocol: 'xir7o2cdth793ptobwxz',
                qualityOfService: 'giufbv313909d0hsskeh',
                receiverParty: 'ut9l7528c4cblwo1i30vx9xetbaa5zcxzxn64ksorikibe7key1gm15fzwp8vzl7yq8zv0lcrf16s5mft20jqcrv3ppn81cha2sozm2l8e9qgylph25996v9lmlc6uvcue5x6mbk361xqn30dtfbhjq2wmgicip8',
                receiverComponent: 'fsrbxkynbdlse6irk151kgcwth8azqn9een9pvh3k3yj1bpf4d87x785tjt0jyhorrpbqhovr10wdgg12gcsw1fbv34cg36bq3gl0s0kpccpzmxo24t8w675q1uqhh7d2pprlutcuiafoz3jlcleqz16ztlzjzr9',
                receiverInterface: '7sjfqnb7twy5q2cnsshnwe28vx7h5hbm8f2d5oethxbbplnilqxl0w42ssa07atqsjmlcsa0pjqspiyxxqvkuycttucza5n4ddtr3v6dkywqiai0np735ug8uej4vv0w30rlvcts7erpicnjlca85t6617utwiit',
                receiverInterfaceNamespace: 'mqaa0eizj7dt0qt9hup5iss7v6mdwloeu3ry9r0tls8j6j4e8ec8778zgk95tcz4rlqga8nowrbj3f8jxjbgftdfsrpez53kz9rhkl2zvs7vmhh5s84idm5yx9bhrwo30q0xg4zem8jnedd2urcwlxot66zccvp5',
                retries: 1070385976,
                size: 7289571592,
                timesFailed: 3133109919,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'fc999mzvg2m031dzz6ov',
                scenario: 'fj07i3t69cz3393zgq5g858yzi3xqszeax5v1lt0tfe89ouauz48ldwofsy8',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:35:28',
                executionMonitoringStartAt: '2020-07-21 02:03:56',
                executionMonitoringEndAt: '2020-07-21 10:22:30',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ylzbiorn75eff260i38fqanwy013nl2a97ugmvrtkfcv0ek2do2hc604uy91n0dhwqreazpgashqd5llly9vwovdhp8dxwxr7pqoic8ih95qse38n2wvs08tuednjtkedjlt72r1y9c3yi4gjjionx5ay79ld58d',
                
                flowInterfaceName: 'bp14dtssafg2idzx3ix8pg5hy2bnbtqhcpj6wbt0lwj5q3n3ubjc8dxu06q25b7z0gmuru6mzn5qyzqwhu2wwaoprd6cu25j11cxe1zsona6mtv7ivwva2k8vdvjjx9sqijdfd3rngomhr2cnvisnkr63xofj2gh',
                flowInterfaceNamespace: '19pz5mzhof4lz1y2g5gdcge2c6onf7g588t0u2tolpcq5fd8echgnc1b4lk7z0k1rbkm8anwqy169rvcj871vrt7c5w5c57hrigw8iq1tc9rpptlltv9c9ch5vpa4rtsp0p3qgpncbo2x37lmp6fhkr7vo69h1dl',
                status: 'ERROR',
                detail: 'Accusamus assumenda eveniet. Veritatis similique qui sed non veniam quia sed ipsa omnis. Non deserunt iure enim culpa.',
                example: 'yduz0ok5skejuvl6thwiyhykwh8ld1qrrcimwlqpcxp661cik5in42xa8tnjno4dbtzt7zj0zfxin2hlikik6mc4vkd4ie90eycj270dp8fmehhnylb98dwpf4tu5wi2nn6pwp7ys8xpkn1e9f4wnybyjsg9606n',
                startTimeAt: '2020-07-21 21:03:06',
                direction: 'rcyu2eky2gurrvr4qo7x',
                errorCategory: 't06v56z9nw3uzhekeaacsxow7vgxpkigud8jbqovxpd8ohtw92bwubxf48mzypb3tqw21wlauprs76cxmr2dqfn4l6dm2fs0ja6f0e2dhh4pyya8c02nouiwwp3pbw9i3bqlxgbhoz2alxkuxxi44g5ej9h6yuwv',
                errorCode: 'nroku8sepw10zya8tvg4',
                errorLabel: 'oxos6c9pgciehr6w0wwnno84z1hdo6dvra17lwga2j2m6ytjc4m0bcirv97xlgn5ptuy2l51w5f9ckzqlrl6nqrowhb3b4nhevka73jhnh5yr7emr5kkl2hnc8gc85xauuqvge1nh2s5ui5wyoj7f4cec5my56yi',
                node: 1760456429,
                protocol: 'hw16hhzqjrvwh3hotclo',
                qualityOfService: 'b56zgy6ngaczfy41175h',
                receiverParty: 'dtuk1j2zhaw7vcc7xqflm3efo87plnb309sqjdfc47s492lqdgam4zft4ydf5uxpmtda2ty9yqm9gjdnh8bi0usw2dvx849spu4rzqgmht6dgykdwy7rvtmong6fd6hpf9wxxlits0t7hy7furx7o3t6pymddljt',
                receiverComponent: 'txfz2yb8w885cqnhbwdhwyzqvn6b6mqr36n8t624s4015ex0kiarqqkx4hwjoej26aqwny0f18rb5s0yuq2kn00ayi4sw3yjzsk5vzh084owaziucdwxdo3cqvecvsahrxt3cb5r8btoehjhsnpc75xg4fa41g38',
                receiverInterface: 'efqgu9vc2ch88z96mmbdappcesmuoye4nntzxis6rwy7r1jhsm8id2b4ppgdhd5rwn2cglu5xyptz27knpyx3pe6nwf9ic3t49cm3wk4cfvw5td3zl1wfwrxzyea6c7bqk9h3hci9t1z598hkv9p6vjqq9bv3lou',
                receiverInterfaceNamespace: 'g5is4if9c612u6hg6weetgyo5u0k5yv1r4u4f3pmmmu8yodo60e3939m3xr5ah9zoyo6kufyvxgajv73vgdlgyzcjlmkdel8zppgg3gq2xvnrmleu5nwofjhow7jf8n5vleqwkjvgofaaw9k0iyriktsglc47whs',
                retries: 9309867229,
                size: 2058604496,
                timesFailed: 5527948025,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'j8yya10mu7gv5cb46vjn',
                scenario: '04ejplbytxmvb90tyf501sqyzze32lyzb4s5cj8oot4kmwnrpt92q0klzg12',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:30:37',
                executionMonitoringStartAt: '2020-07-21 09:26:04',
                executionMonitoringEndAt: '2020-07-21 23:52:50',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '2glflli103e4mp5d2vp4twg3bl92evov0dg1okzu3lqrb71vxpe0cwsjde92c8rm9j4r9du6ed8nc0em6oyilvggymdu6ckn9vdujeaotkag3de0isxg3oys2o8qeowcf7wqqv7qrj08o7celxb97ofc5k7c0wbj',
                flowComponent: 'ni5h5y71ohda2g6yria8rgca52zjj88wi8pb5m7tjmpkoveqpacc7ftzfceivdjuxyzoavtgkk0x1clzmxw89uwgsn1h6w8uklcjuxx0r10jjocsteqi6jdlm641398slro7pdpxlk4a6y9v6flykfy4d83um2mq',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'xv0v818tidbqv79dat2rdsagqjanic3mjx9u05m5p6wwg4rs18unn146y0sabij6yrkr3a8e2thxz70urxr2niz64nzqb0gijaarfwe8a6owvdwi76czklerdzukykcd6m4ua7blvs06awxhjezhs36qfdmp0b5i',
                status: 'CANCELLED',
                detail: 'Tenetur voluptas quaerat dolor et fugit et ab ratione. Voluptatem quis debitis sed incidunt maxime architecto sint. Provident quibusdam natus qui sint itaque quibusdam. Perspiciatis aut ducimus at ut nam dignissimos. Aut nemo error officiis optio veniam. Est dolorum perspiciatis alias aut qui ut debitis magni.',
                example: 'bp7gztom7wjk3r5xjje31yqnftgyxfsgk9ogmc1h82jkj6bwl7u4mhoqjvbrxpjv7s9fci951nh0z8o6jpoip6nxefuz8r6msnrvyfsulbxzvy2w42r985sqf9a80ljiiq5cyb37t629nutjopr5e650aun2c1mu',
                startTimeAt: '2020-07-21 03:04:10',
                direction: '4wx01txf3tewifvq7oa4',
                errorCategory: '90vilua8fj55e4rltykiwe8iugd9th5bsosonq85kw4s9ess5jebh8nx95a9cv5dzmrox9v9v3x7zqhnmztiw3w5zpwznpwbavbdjsyfozbfnzd63cd9j0g9xf2y89902fan99xz94m1e3kxilf7ppkmmntqkthu',
                errorCode: 'fx9o4haw4ldaerzdbtxm',
                errorLabel: 'y0bcwkxm8cjnvhcjbh43s2bcj8tuobg1tn46g4q6zowsurb9brkesg1x4pfl63xo4gpz8xi0fjbm3yb2jg1w7vhfk4spygldyqmnjaqednguao4kyitlnsn7rvnbbcjd0ei9knz66t9w216nwx92oi09utyrwcep',
                node: 2021334990,
                protocol: 'lppc8tvnu0cte5soi1ob',
                qualityOfService: '72y2m82ap0kqmuspkgqm',
                receiverParty: 'i7ds9vrkqkr3qhhc7rjhvszsvg0qp4x3rh2n4kce0rsxjzgno8p5qcc96mlnwhh8pnokoxv8cmvw4kgppy3qjfq51dm6ao5zwzuox5qtjhilli6mzi6d529m0r087gbn8scnldvhc49gc1jwwiawfanys16g7h66',
                receiverComponent: 'p316721j53s5cwz96g7rpvdw6e29zqxipfse43lb40way1h8u2j1cagbohhzuh4ne15lvb213kkwu8nz0znksi6rzy73628cmx5jtb9fp0pypfo3jnhtg67pk55umg076e25fi53jnv8wb70pwulzxzvo62wtdlf',
                receiverInterface: 'tbpokt4c6curpcz5mnsbvtvh25jg1g30q00qfxfh9sfooy8yq1zxoq5306to11rb91j7xqiwobp1y2tt1yh49lbpwbil16o90xr6kaz3roq3slv73ywpva0g9hlat3rsf3xwvutelhzi30o6rttqf5lmnm7ynk01',
                receiverInterfaceNamespace: 'to7ftihkeek74hkrf032num4glzn2cfgnaq6esul6lie1kdmmpnn9ss34cejpa2xc2ls5fusl0ltoioqu5yjk53fzwxs91jklnqw51gqa22x94eoh4wi5h27e42thoq9ao0roja67bvpm7ylfwfmf9036ofkbd2v',
                retries: 6782994559,
                size: 8316769445,
                timesFailed: 1057652966,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '1uwemv8j6dyglwbzyqoy',
                scenario: 'i7k11fc8o4q8t8gr9zgf2tfe1sqgk516l8azxyk8idp07t6h4nmaqfkal9mg',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 05:15:27',
                executionMonitoringStartAt: '2020-07-21 15:08:58',
                executionMonitoringEndAt: '2020-07-21 07:34:10',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '49csexrn7wkif93anuj5dodxbv7ttaje76ahb3t0asx67s5x29qtu37jpbztaunuv7iv78h2v644d8rpschlllm2eeouo26x5bptbjbeiglgwwnajqinpln5k9zi25v15ww5jb7bumb3n1xtfww0d2odgxo7eqep',
                flowComponent: 'v5qn7e6r08luszba06x49cly1lq5102k28k2jter5n7pidhvgec5nfiuvbg9bm1tpe7czi89gif8g66i8gmjy236qx11f4o7lh63rfbqa7gyjfasxj4dbde7q0de5b8azq9824ij4xx8pundgjvgyulxnxc97p81',
                
                flowInterfaceNamespace: 'pa7pqcofshtjcs2sfnnu451va5fhr4c52wremt5sbbn0eauhryt4ecx4vin4gbf6lpxll7owpx2em5yvhxpw6ocgh5t6atalckuuxwchuxpmptbzzz9fnmik2erhyisbcanu4xafwbid33xkow1ceuzxlj0e9q81',
                status: 'SUCCESS',
                detail: 'Incidunt deserunt excepturi aspernatur autem. Harum est quaerat pariatur. Dolorem esse eaque quis incidunt. Quia id nulla officia repellat quod sit culpa. Sed aliquam facere nemo vel. Cupiditate totam odit velit rerum velit culpa at.',
                example: 'ogzpme7k8d05bznjwtngouh7vv4pslje7fwdxbvscjwj6k2zkjzyikjqo0gpqbo9xfix908tkujif5amhnm10q36q0vlumhdnnwqo4phkltjfj7ncqcn39csf1ouhcmy3ekb9ns0f4ycme0lnl90l329jg1c6k1b',
                startTimeAt: '2020-07-21 11:52:45',
                direction: 'f1yqnnvjl7u44h3xir8u',
                errorCategory: 'brllv68advfrks8r44rcv6m1fap3u0dqjmobc6z402p7v35rdswqtdgd9weuqm58lsct17ewowb7b0jf11yrayngg48g7s548v5r7upnewy8lxceyk5dbzreqhbrnj52lebwgyr0iu2pbkuvvwijhdspxprc7rjt',
                errorCode: 'g8yc0h1a2t3qg1cxl2zs',
                errorLabel: 'bk6cknbz0h7latrhloo66bk2uqhe1vbpoa3qqhpmthvag8n61rwk1qobo5dssu8o6b49igqwp7nkusmjor3tsdxh0rp1iqumaygeynjs2ci1dr48ohgrwo6v4b2uli288fows8my1w0mr6jatmakpymhb0mjckh7',
                node: 1231694197,
                protocol: 'gk0vbjq9sx7idtvy0itd',
                qualityOfService: '6y5g6tkp2y78d937gt47',
                receiverParty: 'pqvykhbt026gh2xvfegd0qg1wgbak9200ju85te2r0bpd4819ejdexq84m6r4m2xey7bv2qv3tt6iyvcjzayhlwqm7jsayfpuhh46lsqvtx5hunsxl22uw1n6g0olekxi5fx0soxju9g7lokbxvtmokq6jpxlxk3',
                receiverComponent: 't56n9h27mg52jndrg2hwqblfh8hwb81gkzhrdobwsibkwapwj9i9syfbjnu20c96fe1fupcbndtvb5urs2cu5is0uj8gwgontx542g1e3xymd5cf1r0g0dq138x2x0y0o5ovn858uziw8ko6zq4qcnzvb4ofgjiu',
                receiverInterface: 'fg60eprx8mscios6u5lg63b51mo0p1yfet9r0m1o75gzd4nqcdaxe45007ldbhdkq80ojwr55am7t321zfzh8l1stohgmcr71ni27drfshykm3x13k9c7cwgkn1hlpstimnli71x1p0dis5ad21o0zug3xjrxzk2',
                receiverInterfaceNamespace: 'ycvpqm3av6xlo63kiikilb4y5zle574hwngqjc6h26k9g14fzbwxfz10fig71bad6c365j9hwyhfd9lo3zs2du5imyeic9tr9g061qyw8h8z0kwshcn805ltgyvwb5dxvtloprcq06yizz4otkdywmyked9wvjkc',
                retries: 8708825940,
                size: 8030205121,
                timesFailed: 3866714205,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'bdjq1bkjqca9zccnikmq',
                scenario: 'mf0wuappoi9a94tcpc2uaimu6hz33jw1d3dw4grbxkc3apbpm56mi5cutb4t',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:15:24',
                executionMonitoringStartAt: '2020-07-21 23:23:55',
                executionMonitoringEndAt: '2020-07-21 12:10:45',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'd8l75gkqx0kgxxxcxwi8v3hx0ljn3l59drk1vtel743bzmou1gxidp7vy6mz4qm2fbpwk9wxc9k40npgw6v6t4t8wfktq07jcanqaekcfydozx8rqw6iapovwri0xz97mbhqerubwn2d21ewb4ccge2l669911b0',
                flowComponent: 'kj41kw2gba39ig6mkspg1gekf4eeiuc33mdzfbk87th4jmw0hxtybrnajta9np8ij133pqreqefz45ee1akniipmnu15ou1hxui1w3fvjjwl3ghc2r7ttl389zupqp382f11qzl52n3n7jv3cycxb2u6jzc466x5',
                flowInterfaceName: 'u05xwthjaxidnq4ktvjlwxc7bbdra89cjggunc1kqql62vjw6hbhyjqjmn8yzfwb3cqam6f1wna10fm1yfpy9mf9to864g19iakx269biqw7b32xmq2c3i71us660uxh5bgzx5mt36g0sv6v1c9x4moz3v37glb7',
                flowInterfaceNamespace: null,
                status: 'SUCCESS',
                detail: 'Eum ipsa vero eum deleniti quod consequuntur est. Culpa laborum esse quae atque quibusdam. Ut voluptas at asperiores illo.',
                example: 'orx5fu84hp32ux3ca2okvq9mtzelki6hh3ajvxbmlt3ryn2byldtmxhgk3rbn7qioci2m0bj0v7b5u97lluioiwh228x8oww2jnm3kq8juqy3xqyybnahmdx1b0qcsod5in96uzuq7fk6knaqhsbcuyr7szifj5i',
                startTimeAt: '2020-07-21 06:20:46',
                direction: 'qvlsqcn4jglvolrtwevq',
                errorCategory: 'kgvipgqipgi67z2n2mmm8zhpi7lickhnkqs8exri1hmcho67ad8mqkogh3qgiuf2e4szbd11or80sgonlnxlh2uve2z5mcbfz1gldi1tw1v2dezlv3il7da8xqymamrulcg0j3obgfl2kjet9qlolh4bw4xsdtub',
                errorCode: 'pkfpiizbts3pn3hsy2xd',
                errorLabel: 'xn4bbmo0xftverzru6bfxz313zf56ehiq2msxx468bev2nh1ngsjwm9b9f9dassmmmzp0dgy9xfd36pzis8rgvpjpcbml3f0q4o9ak18dyljyjofjhpqv4yrdfjabuj1dvllg00w5havj6e2hk75ny622rix18lw',
                node: 9700566199,
                protocol: '4kc42bi14soz1570bc9e',
                qualityOfService: 'zl7wdy3ca1oy7w93ud6d',
                receiverParty: 'qxuqq65tr86apxl94f69r2r3nouz4xm5eir9tnr9mmtwq26nl0u4q6iqmvfz0r1sohuapnoy0dfv79qk6g6jk06ttxe56hitwy5fx8exe5733zac80gn0wd7zarwxp0sbt83egdgu1b4wipkpezz86vwydp4n6tr',
                receiverComponent: 'gs2blfdcof8uowq2hu09u63wkiq7tak0xdsdlfnteb314b6fb8m00n392nd9brnco9484ln9in8p0l6j22jvikvx7nefpcio321l4tt0x1cam8y9kxb41fo1fdh0plgmejdfl2la3wgbnz341noz04p1jywt3xku',
                receiverInterface: '0ernhshoapojftk1vwgxbzrp6q99pcuwo2jmxmzg33vc1bxn6y6q9k2176r25y8swz9x046l3symels6tyhzlludc7ygmppseslgbl357nc1i2sizvxzctkz9h0kp0x89wo2ow8e5j8cqh0ovfw2zsvszt8ay3un',
                receiverInterfaceNamespace: 'wz4qf6fnitczjp0y8yqulmked1dt6hv7anclq9ir7opgw5b8fdp11pyywcs6g617g9jvtibrhe8r3au0rfuk71kz60wsjq4etu2sf2yzils3z1hjdpre3t5ay9csn645rqoo1cp5r2pzefpngm3x5syk3qgd5c51',
                retries: 1593745618,
                size: 6440620113,
                timesFailed: 8314228793,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '7crh69zufz7q63xaihsd',
                scenario: 'qibm1npm2nckgdgdgj78stihb8n7e6zk2p4hp90qosausimqva6107i4rqy1',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:16:04',
                executionMonitoringStartAt: '2020-07-21 19:20:36',
                executionMonitoringEndAt: '2020-07-21 11:02:29',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'r3uvz372paex5gqkc3rv8k7kg1w8tbvrewjylyjktcgv8va80yc55n2v4lu6riy5l9m2p0guf7yg1iqi2240o5lgol5rpg2ufgk0y0tcwrpdxp3t3e5sdho8t5roexwiytj61n451z8oasv1w9epokszyz2otcrj',
                flowComponent: 'sok0qpgvgen67drrynympbu3bik0t3xlgthutnnbmykaqwsel06ph2gzy8nzd18nkrlnzm2g0y0zozopsickr39k18ptfkpznc5hiq1c0fa7z7lh98acgux244vbsdibgr73sunzpbpb26ssn21imeod4oysciop',
                flowInterfaceName: 'iubyfa8g3cah1vl2mql03g0hir5ee2bxasduk3hs45c2iq6nw6qrgb6ncxff25co0ss3hememk3fxetx4fu9moi7e234cy2xrswe3ykmfaow053xox4gkpqo7wnb0iaf8cc5dypebwerr4y125czioswo6159bhn',
                
                status: 'ERROR',
                detail: 'Consequuntur perspiciatis vero sed ratione sed et quasi nisi adipisci. Sint eligendi odit et autem esse nihil fugit et. Architecto vitae earum.',
                example: '23vaz7ge19b9awddg7105dnvhp8vqio15ruw0et6b25nt8a4pcued2ybif6ri84kypn9px3d9of9vrmzc6kxo9hqp2n5be3va9y44gguby534xx6v8u6tgbfih6oa4pqsh84if0qljrjcpaq9q4qm3ykdz2iladx',
                startTimeAt: '2020-07-21 12:44:14',
                direction: '3v5ef7myfl5t23q2zmsf',
                errorCategory: 'ucli5z5khbrwu5ydi6rytkpgd37c0tpuuile99bv1mfb8esbxcye2p3l21qnz1jvsa5f5q5kf0da2xi6hc6g2v9iiivloaxjh5d97hxoljo95fahwg9ydkf6jvy81e4j7w3vhx7gyokh2thudmakawhw8jmh2tuz',
                errorCode: 'gxiyxbzwqe0qkkbdvgyy',
                errorLabel: '4hwlossxjq64cwpgekzr6k2kqxedkkmpha89a07sf59u9hd3rb0kt3jb042yuszxnu2xrumelbo73f1qk24xyqi97diaoon1e59x5v28eob3lx35cl9nyp98pmjlaymdimc0sk4x199cncv806wnfrtxw1h3xxpt',
                node: 9111575062,
                protocol: 'blwf8s6gksxzztg0d7lk',
                qualityOfService: '8yw3d1lr7i7s0my3lb4q',
                receiverParty: 'gpxv4wfqgqsxmj9u9mzjfdyvi6ozbe4uh5tiq0rz8icz1ugx9fjolgk8a9q5r5cd0dgf6nqhmrxy078p4ct2v76s9ijmyjypxtbzwzzb6btn7u0fcwxq1ykuahrow0v0by0zymv09g7x0vcqg5v8xcsnb375o5j3',
                receiverComponent: 'j4i7aexmixht761pgjb4qcpp3rysuw4nvr9oexuribxqdglnajqnhm5oo4e15dwj0vkjuv4syaji5stn494io8lyi862i2xl4l8an2ato73q9ohl9pjdv8k945ww6cmm64ntr4crxbjz05rkpxv710xt4lizy7dc',
                receiverInterface: 'zz5yin6ie5kte0kjz3cgjtapzy7k6iqqcjxywqtrk9rimno0k83opl8bs1sqsaezjqw930b9shvtl90avnpfcwcpdc06t7c1yaxwru5fyvvsjkoprn2vclle5xhg26jzjq0jv237xl39agrb7spqinc2186o9zfe',
                receiverInterfaceNamespace: 'nukvijqlv3qflndv02l1xqbwz6pgon5uo02o3gl5lkrjkb699914y3engv2f0cq28tintc3irzcgh7iztob6te463i2ghqkaaojgu174vb29njbqmmld5aoz6sdmtn2qgmjumsd17xtuqm8f0sfw8d9cci47tl5g',
                retries: 1006167705,
                size: 6391524969,
                timesFailed: 6399623636,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '5n6y7hllxhxlgdki1bgq',
                scenario: 'zyre4kln8t8kzgm0hgyo831bgyovyvknfzocsj1nz7xapklwccuxf8jg3ztg',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:52:48',
                executionMonitoringStartAt: '2020-07-21 06:47:50',
                executionMonitoringEndAt: '2020-07-21 03:19:50',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '7tc4ta4bmkp26jypmeupc3ruj96ae84tgunj9qnm6428rhs7eqajapil6ljmkzmcsc3w7lfhslv18x57j7bn7d5j6x7bhdl54djy9b1mbmt0jt7juq1lywh5e8zph5jzowlndhinzvb4xqf1wlni0zh5bejzj6uq',
                flowComponent: 'a97pywwzhqxnhzvwf5pr83d5maj7aatcfzdcaefu80pny1d958bbh7iozt0wgxghuobczhqk2byt5nflwo9bcwv7tji62tqvfm81ocumi2051w5gpyc08hh4txka2eb5pz69g5s4234wmb5hj3xc132cdzlzqi7n',
                flowInterfaceName: '3fjpew69k9mbq07f7eafos89wpkld5wl7c8mh9y6dtwq6ts1qsfy2bxhalkolopmwhxzum3xxa6jzgfs6v2t1grp4t8bsmydgm9j1xw3tsxd39ok93szpj7fe6cf7a767d6k9km51xfsqjxpgdh1r0ch01zgozn3',
                flowInterfaceNamespace: '90gc78tbt1l9dypux9o9bfqehxbudili1oivi7lwh2s45ry3t72d8ydq7t6thcbjok9shdb8vpmouahvb287c1xl19py1mmlyk740uq5lpecfox97dksd8pgbr8be4i1puc4l4julkrkv65fbw9likrpoalk2osn',
                status: null,
                detail: 'Corrupti voluptas cupiditate placeat architecto quidem tempore. Molestiae qui vel est. Ut est praesentium. A et aliquid nemo earum voluptatem laborum reiciendis. Ducimus modi provident animi provident porro maiores rem rerum a. Recusandae commodi voluptas.',
                example: 'pnq8rlyoakw325p0yytqqeixj65z8162y5d7952pkeutl3w0xhjl00djtzy5ychw6wv9ebho7g155wbwat54p3enajpcknxxxrfnnmj3eg7vkeos9825loi5upw0anclyg03qfad9dyi8wb3m5g8u600uqaiozab',
                startTimeAt: '2020-07-21 08:32:04',
                direction: '14qlr8cbyj5udondp8k2',
                errorCategory: 'tb1f9flvveq1d2icfw30poipkq6bpxh0f4gc61nkuyr3c3scrazm8lrosr4f0zsxickdneqir4tpea5ebdsncf1rl3jef4otvv6uoat53c9zdbmrfm9ytlj6nrdb9kk4ftso7r24zmrw8f0dkxcea8nsqfpax5ei',
                errorCode: 'c5gzd69bdbpi1oh162xw',
                errorLabel: 'famorof1cosot5yooh5zsn4qp1dlsv64chr41utjx6upw4tn8e9eah4s1p8p4b32dcfpip99v6d4rkob321xlptwn9kwc1us8cttwz0fgwtt4d9b83udb6vvr3nbtxjiejww6z1bh1csshfov3r7wkqtz3ueo0m3',
                node: 5475608734,
                protocol: 'caie4vuf6tyosz7jib4b',
                qualityOfService: 'ayprh4n7p8wp9qrkk9mo',
                receiverParty: 'nmn2foydkyb4577j67s0r5k904n5ck337nhu4mamsl5bk7s2dosv5hn8y0eb6ivulzks4ayvsg7tfw26f12diuec076lxvlsrrbvvvcudugd4210tsl3vob8it6snjn96k01u27i9ee5vxu53ksb3yxsc8w3fai3',
                receiverComponent: 'nbbjvowo4w31pywwd0pvhuq07m5mr9j0oxm6ani17mkbq7a1e6kbmqkvom1ti0s0sbrpptvzdah7gt2vzn0no8p8mlplxsgn6sbo6dj9o9z4o84jzuvwqif3npx6k8omveposimfo6219hppm1o3vgd6kztaj6kk',
                receiverInterface: 'v8z2tj85iqawoesib2rqfjnrdihzi7ncpdc0nezj5w8ovknqs6h8p5ketfu5g599gsv9vcbb15c2dtko1lkmney7xp1cpok4trdqjyavkn31gnm7cmiv118horrpsjauk1pnbba1qfu531rvyo0kao4osv0cwasn',
                receiverInterfaceNamespace: 'y45itc7bpd1cpih7j4rtu1quleo1dje796gdn7in317yif6s0yktx3182u115ez9nsqff9bt4mw6znl26qox0svtrgdyh0mrcuvkopvi14qpqr0irhb13wixcglm527d6ymr6ft9mfvoosx8z42niu864pxcx97m',
                retries: 9363227537,
                size: 4821368924,
                timesFailed: 1425691839,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'hqx5mborsislr3abqq0f',
                scenario: 'v7v55wxu70fhdtye2u9rjydan9gmrdiwlhym0tm7iaot2hoin9m6huidl5u3',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:10:35',
                executionMonitoringStartAt: '2020-07-21 02:44:15',
                executionMonitoringEndAt: '2020-07-21 07:49:39',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '6w8dct4pmyx81tiiw4ygr4ja6wltsym55vhhm7fmupjt7qyltsspknnukxviwsoi7do2qnsdjcw9svq9tc3gya82cg5ummd8j5vqavrd7wlxs2s99bf1o8p83bvz4twoi3u79pamjg6jbz0u4hz8bbih8zqif2in',
                flowComponent: 'yni9qjia4qnvl59hj4ycwh8el853bpt0jvaqvfx0irl7hznwhi6ero76rxwsv3pp7wfw2ubwschak2oj8p0jsmxi4jox0m8xonyasr7zkm23xpgluhrnsbopjzerb3r9or20a653t9a6uivhuyj8foxa3ki363ce',
                flowInterfaceName: '773sp4ovqfclpln5efmi5glkqh19c1f18h7m12ahu9m70mk77drmqupcc14c2opqasn6k1es2oh2dd62g3s1kovnbn2bikmfug8ko6vicnlcvju5fgn68e4pyd09kvfkwn5hvq4m71p6xzgojh7argbj4q81h9qy',
                flowInterfaceNamespace: 'fq4cymenebr2gy72a93uuialkaavbol52v010o788pzshfo1n6q2pngtaez45x0frau06xqmbgy7iwrit2abq1sf2fvw0kz9up0uyd5b8bjrq0s30eu3pb5jv1yo7ghpfcl6a8w0wafcgmiw4zjkjj45pcpvx4p8',
                
                detail: 'Eaque similique animi ratione quibusdam at soluta. Repellendus provident inventore facilis quisquam. Officia nostrum sapiente autem.',
                example: 'ebz35faeuqbws5irycbsryzvih55wtxtoht0bpgj3rhldt0fcmzwtif5l95ewcp000ks2kc6676xoenx5cdjnfv6itqhg2egiv8cricgkipf9r9uja0u1fb0nyxkw5mie3q07w8yv3anj38ks6lb4k0voo5f4o9a',
                startTimeAt: '2020-07-21 20:16:39',
                direction: 'nbg2klezhubnd5bv4z8c',
                errorCategory: 'lhl46qcxudl7r47lrw0xnve451tyx6nlyurjnskhgjx1qyr15ucuhxo0ogyvcuhxfuz415tubwv0ktyxx43mmexdxtuszyrz90auqzipcgufapwsox5yhbaiw4hsvn1hp5eytppgsanvrkiz2o40g44ax11i9l2z',
                errorCode: '6hr0052e0gptmcqhysbb',
                errorLabel: '3zjb279slis5ih3hpt9ugpwu5s4zwhws57trg5fh0w9o5l0580p7j56g179lw7w84knh0fi0i8v4h0uhsiozfb9ofji99h4svtmnsdigyyiujxa8l7iea18xde8ylky5w5xg3tejrvc0h4p9x0c93gi1rjp89bhi',
                node: 8573520891,
                protocol: 'o8t6kvoar8vg8b0tzupx',
                qualityOfService: 'xczskvjqxjvmofco490f',
                receiverParty: 'jmkp2j7bt0s4outrwv2rmltlsal1fgqezzgkhs1b4nci31h2rceai4sby0wi1yyug7fjdgqlimzn7sc7ksy9orq4lgg6i0y10jjtms3etz3lu9rliok61t7lf5dydmbu9505xblxgknj5pm1qlxqnwt24ynnpq8n',
                receiverComponent: '1r2gult7ioklcmouhclxhg4fxy2xpfrf84b3fzuusaftz8twob1zyqgsa5968grvmz2gfomsdkos5plgcz50occ73qgiylnmv1i7hm6n76bads51r5mac76993ftd2kskmn9lhkuzo4whs8fpgw6lwwdfkqq0ski',
                receiverInterface: 'uxx276148tel0008jmpql2xnkhmmjpzdcq2w9fuunhihswa9wwfo0z7bd9nqdx7pc0bigwo156j6okn2oyhpym1827hskcif020vgypxzif3d7j9b9tt7t9pwg09uyg5et7oa7vh4tirokx5369k9y5sawviewwn',
                receiverInterfaceNamespace: 'uv3pw102fidr2dss9kgi2mqnqqqapqn2sglk7jwrhx592d0yho6btouv8e76pz130arucjrtckikpx8htdb053381wt2ty9e4n8qsnie02a45zpuai4vm97h3xfjt3yzbkwliofhid1h8f5wbnuofaodkgsg0bp1',
                retries: 1773957286,
                size: 1546734842,
                timesFailed: 1658524202,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'g4q1xzak8cazcskatm47pcog47rh5h9xptt0a',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'v2pabrcap9xhng45gm40',
                scenario: '484sdpov1cpvzcge57nvm1a16d81euv83bi2wb7vafdrnnzzd9alt797t9dw',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:38:11',
                executionMonitoringStartAt: '2020-07-21 20:13:44',
                executionMonitoringEndAt: '2020-07-21 10:22:36',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'pq0n2i072waazp56y7po4yekscqbuxseppo0arwcxflibmd5xohzppenjh3g1qbus8m9o7fuhdbhu0ozp52bafalv1ncklyr20tiy0x30r4h1xknj155dhoft3c0xzjaltz2bch3s74j5ez2l8e8awnojly6ipkh',
                flowComponent: '8ywys8lyeqfpj87khou2th7smamjdzcnyezyfqeeoxf18ew52l1g0z9zrk6kbvi3drqo6xak3zhvevvgsiyblpfxvpkevyh98hjaxkgvjogepn56wvtq637c4iofdjtv5alokmlxiogdn82izs6k8b7w0kshst4z',
                flowInterfaceName: 'vj0htf6lpp80hcwn72n5d1uzxkiabaxyhvq2xvsum813zu0uh1xksepcbr1ehj4n88v0j625muolvuiykfgku5sb7mre8r6xttth1gtgf2hr44go6vz2rhrdm9n4prmeghtsfecty1zri37x1slgqmzt79cljeok',
                flowInterfaceNamespace: 'x11dlx7h4f2ukajpwinb1ct6luyv404ewi5y2usx5s1k848xutphhoes18p355wictppkdaygbkajlfvgvuyscrnjdemyq0u4u5jqs2fjtb57xau1lxobw2cvbw9h0ottbo0d4ba6szt2y5waivmv9rg8brxx5q9',
                status: 'WAITING',
                detail: 'Cum est illum facilis nesciunt aut enim molestiae sunt quidem. Rem iste consequatur. Omnis labore omnis excepturi qui aut asperiores consequuntur. Suscipit dignissimos sed est sint quisquam maxime animi eius.',
                example: 'bj0kn737r8bmz61ecu228c5kj3udqa93zpigroq2x2pv3a139usdsp3ka4p6ff77yi8pi5o60nrk7463bj0kq86lcaig99hglyw91gzucp3pvy1w5zw1ffmdwvcd10t55bir8ge3keq2o4ch68usih4p6mh7ero6',
                startTimeAt: '2020-07-21 09:08:53',
                direction: 'sj5dqmgwlr9kvwjj5jlk',
                errorCategory: 'lf1qo8aqcjfo5q8odtygth5p54281zcv3rs6a4j6yyatfaqt75ysakb561tgbc5e49xkr84kf7rj2x3bqh7itukhvizke5d44hn9ae8h8f6hkdp00g7kmvefbkmylsyooacgd15813u7ppschaqegordl0fqp0yy',
                errorCode: 'hquerj3xc4pz34g0trrl',
                errorLabel: '4n0n2vek5r1jz1d06j54027pqbzvih3z97vnpecd63n25e44xkmxsqiqml205gdwnd432o6x6nu527s2bqoonkv02izvmt9rbeyp22fr5tr5c3uqcmffk6nzj9co19tbppeirmhxow4j82ojqnba2v8xpt5baow6',
                node: 6765020120,
                protocol: '66d4qlsdnmat6qamplve',
                qualityOfService: 'dowkkwusyf2li92oo3kx',
                receiverParty: 'vcd5hubecmald41jc8apr4mdfdkfid2v5oxex9up0pl8mqkpdm2ruowgh7ri7i8yq7ukywfshf9kscghxups3ghkpli6of6zxlfh09sposqkabngl16zrk6hwzkz35lx1lnxsc47xdg29vqn2fm0elswj2hyrvzu',
                receiverComponent: 'gwc4dkhwx6vcd4bup2xs5fouvjz0l50in90pyye49xubnptqadf8aqwsm9unvk2fbyh0qehao5zltz8dhsmdznher97a9nfv3whqmrdpaxvat79bipk9vomry6ef2pjtw4089dqa7w30nw7b44if0bs0awm53wgj',
                receiverInterface: 'aef7ezelxpzn55tlk0io3o8dc3k64bcoy75myrcq7bky3jwpnv851xehe1q08jsxvzq0ok6abuhb3js6rmy2h8ebjxg9azrwbuwgu45s0iis6b0r1cse3jg7514z1cnrw2inihbawbvdv9rukox7bwlnnpr2tw2z',
                receiverInterfaceNamespace: '3l43yyqh4xe2llsk3j8ip2xm41aq6xilxb9z9budaew9lz47axjsom5657ocfuwadgig6pv0f7w2pmjwwl8340q833h0i7b6sosl9axz1gzn4f4dgark9c7dbncrv1x54u84iu9q2m38b3y6a95yh0zpc6ysltie',
                retries: 6036909544,
                size: 2137355381,
                timesFailed: 7497875670,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: 'bsxde756iykh9p6r7t37azquhb3vi14tj08wa',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '6y2xucg8seykdpmh2pyr',
                scenario: 'jwwe9kvieybyp2cdkja23nubxmuki6lqb4p5vhvlvnivgkfiucriw9f484oo',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:36:41',
                executionMonitoringStartAt: '2020-07-21 22:45:56',
                executionMonitoringEndAt: '2020-07-21 13:52:55',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'e7ovavv9s9u8yn7nu5dunsqiu4njnzdh2mo7rh0fy8pckrjlhyylgtl1f7pxtci9vj9j8yil1o8gtolxnkqyj81l3ku1q29kqt13frw6vrknlq2ilytcyajujz9rlrvigvb3dz93pkzgmhnjtegxc6mo7t47jyqk',
                flowComponent: 'k2veq1a20sfjfffk3pq3j829u11522sl8u8xboylxsdiopvu60bzvv0t4fyf5c2oat3qfkj3bxi58toqn2oe687kekgsl6qhh7al9fa7tekil20c3iuj22an59b4x1yipfmnl25m518s7h590sen1a586plp64f7',
                flowInterfaceName: '3ornssrpfd07ku24io9bjgnt5e4ls9wj22ld553dcj69dwrqll39qbtjqy52fqrcmgo2h7xgunyal1in9gw2bzfkweqfbro87u2fnm44jes2z2wl1m5skt9ciftrxs91l9dv56cxrhqcqedaa5dz36jdpf1p7f15',
                flowInterfaceNamespace: 'pthsbqkqqttnrio8k8arhbe51ukx8xdr8krs9sx6yocge5ii5pbt1jbbljxlc0mbi16qlj0vd8k80zr5hfdt8lqhzv5h24o7wsl5lj369gois6xcoqz2esi4nvgg3l64k4j8ebxrphg442g4aqqcan57cibjae07',
                status: 'CANCELLED',
                detail: 'Rem perspiciatis qui voluptatem ut mollitia ipsa. Sed fuga accusantium accusantium maxime. Ut omnis quam nihil reprehenderit quod voluptatum maxime esse. Quisquam accusamus accusamus sed veritatis distinctio tenetur dolorum. Molestiae pariatur voluptate vel tenetur ut ad et quisquam minima.',
                example: 'p1ckh9aicqdxin1e5m7clpbucjru0iuxrvyrufq6kz2k6zrobf2u9oz7xrz61t0brcrha26fqyrw3k5ik3b4d42mtxu33gbm4rao2gmaxp5m6r18z47bmnhypnvm6ycwrw1bx5hewxouyrsgp8hwjj16ltk0tezb',
                startTimeAt: '2020-07-21 04:30:29',
                direction: 'zg7mznowwo7rguswvv2p',
                errorCategory: 'gv2ccbn7wwrdz104wlzo3e85j46nhk89vmxzygd1xo5fmdzfe6duzsudhlre10kfk7h7ypizikw6e93n1zvib3rdnqkxi0um4lh3te7xa73251djqlxvf9q6shfu87w3mfnfjn09wgrths2pe4twzpzlrt51vcxd',
                errorCode: 'menly9ffdyg6nvrpdrqg',
                errorLabel: 'x54cvc63ciqnb65ued857q325h7qvzckhxca3v0i9svxxsg3a4xqwv24rnrwi6yyoryiayh2eqq1zj73amm4emqteuu67ovild4ygmnecd5a8nk1w20dmdsx49a1x7fiv4lhy7o2l51hm0uo8wcdd76tr94igqk5',
                node: 1343132172,
                protocol: '0v2u7mdcuvx4d4q2rfk5',
                qualityOfService: '3hymk50r1cex0om2u9ci',
                receiverParty: 'q18rq0i3xsklzcc7gwyr5og6zmcmcbax4y37slsxpf39b02wfe6mrc9zcwqxb5exlamzfhop81hkhxymgckkr5cmykfmb0q3i4026to8wn1gmueenjmtv5lbrx8efin7wkbfvoqphi48xm9whadlr8uxv28co8nd',
                receiverComponent: 'wrmg3f0f0yetif6j563f7ku8odpb10w4hhmz8fnzj6d9n97e5yeohz5xmgy3lte2qneh89wnh0g70ag3yywwi8nb04ugqpv9wcg4cbzqm7siuqh2ilfzmoj4njdzni2u6rxunp59pdi70c1qcb9rcxpmun7nefcl',
                receiverInterface: 'gynt1d68w3jpgm0wlab5nnqutloyyhekfh7f0366ad6sx0f4sibi2651pd578764auf23i32s48j4jxppajj0fqq76e83c86kt70c36le12pf260fs1hil93osdgq0cjpga3r4zmykdxzbbr9pckzo4jbgvi9r9c',
                receiverInterfaceNamespace: 'rwuav6v0insa5kmmjvcwll96gwlusey95x23651i53uyg4ksccxvnwn9saapymr1hf05n3us53kld3t7ztnszj7en47mad1rn8l4f61decw2szj66mtpx1jyngi4utp57h42k8nytqtrt6nj3k878ybm44hy8cl3',
                retries: 3411879648,
                size: 8975374361,
                timesFailed: 2263886416,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'akrtu2fgh41qzgi0k5k82zyaxwhkl62suiblb',
                systemName: '354gr2trmjq7hthgzajx',
                scenario: 'wb1n4aplhm0ky35ve2ey3tp3cv0l4oauylfyat01y9dgj2vst8yaw45rebrj',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:02:43',
                executionMonitoringStartAt: '2020-07-21 11:15:14',
                executionMonitoringEndAt: '2020-07-21 02:25:57',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ayg7sjkmfqvns4ix2cdgsjn891emq4mtbszb0kgwnaseiqr3z6d6zqulhpyt7lojbp1kptgj3crayeloeu060w647tw1bwr90anr21asyvhdojg6uvibmji52vjs5nyn3lah62bpx3bzp0n4ggnepdsjgni4n5ty',
                flowComponent: '221nz00rsmm8u79m42hhljlxadouw5yqb5kirdf5vhea22knxy73lr39wpfwxgcg6n9f9eg1urv18ccbzrury9pw7d0jg0mhdkhuc9gvvy6hjpwik8lqt2rxbspej1ew37m4wx2vc6u4fwzh21i48vgnixl4ywd0',
                flowInterfaceName: 'iyrxuby7y3zugy0tzf2aua6s5wuxdut9h1ak9gnurml3o29bvomfstoaefkqidim9g89bbbbuto0tqmogoakl82td95zrvp003hlqrcheq83s703g0qeqifctt6nkpnkx1s8m0x2iptzrf50e97ft85mhtsszyl5',
                flowInterfaceNamespace: 'h59urefwfl2v83urnc3ax4e5ewpu4c0r4edksnwx2ncn123j3su6z90zd2rqkrcox8dhrkqj1dkvxxs0msih925q6gyu4ovwbvhdgjhwevs7f170ax2r4q9anazicxftyelwvmo64nrew113exw6u1is6u726dgc',
                status: 'DELIVERING',
                detail: 'Ut est repellat harum cumque et et ratione. Aut quaerat quaerat corporis molestiae. Omnis incidunt quo est. Officiis fuga nobis quae aut aut labore repudiandae voluptas iste. Facilis ad dolore eaque commodi dolorum odio et velit. Assumenda et ut dolor error rerum quisquam dolorum.',
                example: 'go8wie1614ir3ueh2pa1ykkd6pbuafush7rsc62018o9rl9l99j5fu31ositgx8l6obhf4mmkfban2lc4xs2acizxg6ao3t01f1g8hwpoy2rcf4krp4am2hlkdmgcxskpyex7am2hjtgu1limjpbceppbrdr4jsm',
                startTimeAt: '2020-07-21 05:36:07',
                direction: '6j6hdxsnt29aojcf567z',
                errorCategory: 'j0y0t98sl8xgbci04p84c6c7e4pls7shvfrw98gikdaah3gop23a003e06h6skhu999ch43fyu4a6do5zj9ond8dx1c0u5bid2ow1nub59lnb90jkli58jbtgr2iud0uro3t9ud90bc34k1c5wywh7fb51pte697',
                errorCode: 'ykfqztjzginsqs3sbem1',
                errorLabel: 'q6lfvhnjllkxbrgxpu96pmlzfzkvs7bjela8fg9prysohealcuu371u6rzirdsw7rvlchi8rcu6929u412i2wa8ti7irruz3p3vtqkh3b059z5i1zo83372ocrm7atjcoyl9gdxcbchcd5tn1jk21xqss7gdkrlx',
                node: 7329374323,
                protocol: '6rq2xqptd4sn3b9evfoj',
                qualityOfService: 'gmtbh7kzq946fekp5jnz',
                receiverParty: 'y1xywa3zfvdi7q5fvgelc5mqr8nxy2sia9l98geus4qnrz3jhnj4cjphshqd99cpj6cvpvogblxuxh8okrn282jp3bimq36sh1asbb672ppn48ki1n7hyf5950abbailmo1eoypacti50reovne8wpytnu3t1dzc',
                receiverComponent: 'hywrke2y4n39xxjhrwb23004he30k5zego46sajf7dp0es9ajizjvjc2on5juybskl61jfcqqdo97asuo9go8dwozqvsk0vimrkowdq5c54b13znoug6i26dmb9w9dzqlbmkklxvvcn3krjv2nv2wl1tmv767xnz',
                receiverInterface: 't9eazw4urh0shxnchc8tdbohknymssy26li6w1l9ija0394hnyss5ps4t02gkfkhrohc3lyd5zrp04ov0zxs5g1zuzv2n5y1xwf4rj1a9qbk4lfdb0v1jp1f6h77pfevhjmgmm71nun7d9j35w5ybqpsuyqfuxum',
                receiverInterfaceNamespace: '6wd060nnqlc3zbjcej1spqdarpwn6mmor7206l9fqzc5ec268rg3kci6g2chu3lwauya1fr7qhu5lrlnsnha07xsqti4qbhewv2nhtzb5wbqxfvlm0fvov4wdqxols0d467s7sof0l9x2i1hr2t03mewsefzsfp4',
                retries: 4069897617,
                size: 9228319922,
                timesFailed: 6322233496,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '0lgb8q6cugu4eqo438gr',
                scenario: '75o28iphao4fndqphplp7q701v771qvrzpf5lvx91q56rbp7u3x5gpt0df0c',
                executionId: '882mbhxq2mr37a4h7olfldmbf96jmmelqz0go',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:22:08',
                executionMonitoringStartAt: '2020-07-21 08:31:34',
                executionMonitoringEndAt: '2020-07-21 02:45:14',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'l6txkcslhj4xfbshk9wha2rlrd34bku39ir48s3x5cy75q16quatqk0sw7vzk65mrdh4p2cwblonaoj9c2acelk681144aog018r7j8fedn44bsin8na6jqffa2gajw9xe7rgyydenoiu2lnt6fg9tv9bkuzo892',
                flowComponent: '014x6rk316ns5y4ti8zevjpwa6acy929zlqe3ek9wl4gth08kkciw6f4npf5o52gin4ymb2tx01hi2e4duhtxmyerdry94y3abbn5472168p4pqlgacslhprfwtjt5zwv1434sh3mcse8txk3xp2fi5zpqd99456',
                flowInterfaceName: '639626ybop1qs1vsh6uuucg1gkq4h27rpiwse1hrde3eukxeeo1al4cpry3vqjzk1urd1bpb9zxxqvnm8mpej5irdwmjfy46yq9c4c79u4kiy9vv0xtgevld3v167aq8rap973k2ycnws6qvramrsgfdvzlb4en8',
                flowInterfaceNamespace: '5a5lth8i3ihugpdsb5b43o4llvy021gtc5wu33ghl5sitljn79yar1sf8xo1u3wllpuaclj5mwpvaohld3t52yikp83eydisglxwmljqufmhvy3h3y8jfovzvj556sfy4rqvqxvec33nb017zoj7ouihuyh75dsv',
                status: 'CANCELLED',
                detail: 'Corrupti tempore inventore alias rerum rerum veritatis maiores. Sit sunt esse in alias rem et deleniti modi. Velit velit in non a qui minima incidunt est.',
                example: 'rtjb1prviliowuqdgojkg9akq0yk168olgf6vzggszubv6r5gtuqaxygwk2nf14tmi9qhgl1u8kj1bfgxr0h5nn9yllkb4gimlrzr4udp8heqpbf5bsipp14gkv4v78jerrsqmiaojaalumso613pqlqux2xpgez',
                startTimeAt: '2020-07-21 04:22:41',
                direction: '6qh1kpa6jolzz762eq4w',
                errorCategory: 'n5aucthhwr2e75valrxa3uzw97ke0wngvsadamo1fdr7uk7zqn8c467ej2viuukpi5bdsqo51vk6bj76erh99ngelqnr57x8pvk51vf3z0e01vz2ylxkc2pphtfi6t2s23mjsw4xggtu1ifqj4k5qvz12bg32iza',
                errorCode: 'b8uhakfmh5nkzm9zwz4w',
                errorLabel: '5da208s6tjkzn9uba4m8ughqmeurwtafn8rxe9tcet1d02s24ps1x6z6vlu9sss5gv07i3pj6kpq352ofc8n7ncv9sa8wqhrwa6y9ihidp2j8u794f0qraqy6esust6z0lgllx4rxfg3auv94mfrvdxoljzhyk3i',
                node: 3784874599,
                protocol: 'f02nzcmys5qz096lsqza',
                qualityOfService: '33pvt6oz69stjeyizneo',
                receiverParty: 'mngalmzj0ziz85ntg9pw8bkjmvulcon2qah8wefmtiqc8fzvft6mn46yu2mqol8qxenypoepyfqani6foo9mlg8uuda2ce51rrwi4jfys1a3zjfvhns7crcabdo0m4mscycticouw2gr4udf2xefhtl3sh5ennny',
                receiverComponent: 'yns0aecmkq7okalslz75k3j7w1igx0cayefh8rw0p1ghmuznvfvppkywicsqvkqi1ef9d06xtce31evoyy7ywrunxi0k4ed9rdhol26j4c8vrcu1wx19ke2vy4jl25h3sc6i8o7ao92zgx8svqtl9qag1ymz4fxz',
                receiverInterface: 'l0pl75tkdtu7tq5kbfxhdfgm9pj701iddcfth3q480jrfqvghtc1oogsrwxqmlbb4j9e43iwf56mz16p1a82udp5u7p1p1oo9v6sjhouwofgnozo5d7yv93yy9n2g5ui6cdb45f1o9t22aqlbsvia9yla6x00fgc',
                receiverInterfaceNamespace: '67vgqbjcnf46o2hqu3dvp7ltc462zsw3m5nfndtvjm11hipaqb20sl3z59xaof35u1q4xkqu7j25df4w19a8hewuc8a30ydhy7lqkxnc1iqtzubydx54wov35h51t0jk3swa9p6evr105evtqg1phsgxxue230rf',
                retries: 5719682906,
                size: 1093209762,
                timesFailed: 8759592425,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '9kjfc39zfm45ww2wjqv5',
                scenario: 'rzessz86jrku1qyqv7m94xafzzrb9etfg5rx4wpifkoer1dzt2igj5857aj2',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:36:55',
                executionMonitoringStartAt: '2020-07-21 02:01:52',
                executionMonitoringEndAt: '2020-07-21 18:14:10',
                flowId: 'eo6qgdgzbwsamd9rpucts45517fr4gl9y1mav',
                flowParty: 'ipyfrg13t7xagx7oz6smz6wgtol3dc3y1pv7gb7pyfi0ajpxht6ggp59tk9kq1rwszr66bw7v9j35inpk6t5ozf52qmrz1qg38tajuzlrpwijtp1nvn9s1609gqe9yttivsqmdrulqtf94i2vpf6zt5t3wo39vsn',
                flowComponent: '3ft2kmwv5jmmtrfniupxv7mmwvbmjbvzvsybs58uf9qk8q6v9a1m5h4s39baeesbb4dm0ualssl3wql0pdwubkyyon4llzqxwquhxu6i4k9c5uh8thqk39am7zarsv8c34wth2szrtyv43tuoig126x8c9nrzhr7',
                flowInterfaceName: 'do4dqz3wm55tth06803kppo00g2tgbmwe0qsike04ofiisfkpdqhjdh1g4xxkv78ukrkl4z5pqyj6ac59v4hg8auftuu5wp4l07suco5kwkvtctmf5zlf5f7bjmf9jakl2nyx3ei2vyi74k6m31mnf315u0e91wj',
                flowInterfaceNamespace: 'v83r4aejosk4e3rxbgqve7836tpuf0g19z4lecnp55u7o0a8vh2bya2ckppm9fly5ayz65bcuilb0eexd7tguzdt1pfqny4zolqpxjp1ez8whzp3qhcjx7mlqo90e8ypndgzj0m36yt8eexqu9bhyhilypg63u45',
                status: 'ERROR',
                detail: 'Sit debitis et nam in hic. Qui non eveniet id quae enim quod enim. Id nobis qui quis non aut sit laudantium impedit. Qui exercitationem itaque aut dicta sunt quis. Quia quisquam omnis quia qui eum quam vel ratione. Nihil odio libero consequatur sint et aut.',
                example: 'twnzqes0jmdnd5bfhzmqd4k32wnugh1r02959xpcz08up974fer1abb2lsrig2gj4picl8y1n5rjyb7hs48edfihd1ig40e27fjcr5h9svgf5v9m7yi1bkkgttjea1bs8eghe3lzs5c0gd26pv8kty7utrihvq3t',
                startTimeAt: '2020-07-21 08:49:36',
                direction: 'l3dkcu3kdpyg4644efdk',
                errorCategory: '3wwz3wyjtngma0fdmratm0yukof1r1gscf0bqxahqlrh6liuiqfnnn7qmftt62rcbept2984sv0w4qx9bkvdjr573d7w1pfmtajf0bdu8gk4b5p15l2a27d4qxos90qrc0vkoe9t9osn22xzjxeulkp5aezs1z9r',
                errorCode: 'spwxyooegza2yq0nb3h5',
                errorLabel: 'odblzmi0bnrgwwp0aoln44yegwpx58elxdvq40kxh3so6v70amkaa1xbjlx9g8zo9qqpgwjek275dken1lschjvz8xrmucofg57d5zhmaepbo4jmc81420jmttazi1mn7cdnz4chcyhm1m1ax2gv0ryl6fz42dsa',
                node: 7376202860,
                protocol: 'pvqqxgdu5ybewu2732hw',
                qualityOfService: '1r87mwdwmjny1d2qdaz9',
                receiverParty: '797don4qw6v94arpwicfd945qacqqf56tspmfsbcs3vwdngqyli21jnn7xjc8rbrgc0969pjofozy2an5j5l9h19w9aeadhfzu3vk4j4yb871d9q21cr7av9ujoisiwwuxsedec8e4mw7hxrj887nykmp19hypdk',
                receiverComponent: 'tmqngmkgz133nfoj7ko9mkxpdbuc1fd48bvil1yhs510oh5iagihqbb9iutetgrub2coo4u9dcfe7xxnea1mgiwdz6y4zevernf6fxi14xhko7xeiqkxuuq5ly29b0ezfyx6mpaw5ft0ppn6dlmcu1jirns766gi',
                receiverInterface: 'cddhvn46gxko1prxedpz6tqbdfsx5ge8u2ppr6zgtvzs29xvkbcyzwoj630yly13cnaegqow8wejkll950zj69kw0py2dzuuj4v3cghix3db585i43bfkylaqydq1mfeaxgs3x9xnxpdvudm1pw1e27jygrggczv',
                receiverInterfaceNamespace: 't9v2ey771v30k1w5ebc0ur3o08s6lse7kq1ffrfdricpl4cxr9sttj59kfm3b3mkkogfkz3ol68zlbk0y8tquf0j3ojexd6tos0reqd24yurhpwy3vdfx9gza7b8qk2aoxjh3o6pg2hl21ibadbouf4rm6tctcx1',
                retries: 2900868384,
                size: 6202364395,
                timesFailed: 7251510466,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'f1g2disc1eomxph9ja05g',
                scenario: 'wm4fyllqqgcldzpzdbobp320y5ir8em51btx42jzfy4zcshqhmaslxw0ctgp',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:55:59',
                executionMonitoringStartAt: '2020-07-21 13:08:16',
                executionMonitoringEndAt: '2020-07-21 21:11:54',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'l1i3og1rwsxouwjkrli1mx4vd0wof8b3tic4lpo0i59byi01g4zrx0zv15y0tk3lkzp87fzr0f62rkg93a5nb9fe7arjbii95zwe8br51pr6nxhlxv0uykiyspe047vho7kv505el77uu3st3ag1zmcjajgebbtj',
                flowComponent: 'tvxumqwe0lmouaafcf3j5dh2qsge9baehmgg3bm4ai26t5jta84mf9aj0qxvwlav5i1eyv5e8mmbv0kslql5wp0r3aqmy1otmkvu268hl1tvkvniyq59gs0baj7mjcip8v0of87cf6rs6fjdaxgsvqqxvybl0i6y',
                flowInterfaceName: 'hsqd16yudj58461kjyxff9fi0cvxg0wewr0tcqhzeskq2wmpgb7llw6tyjz6vgvdvpxqh5yxufa3aupflpesjp5or9lyt7bro14b65tmpkr4dyu2i2ttogu9azw42eed04oi0fv16dni1a3cj0avmdqxyf92cz22',
                flowInterfaceNamespace: 'ol64qyzdpdr43wvk80b379899cc87x1g3sxeosfsw9n87fyu8ul051r5ucb99oej3o4rb1ai598lheflptapudo515cj52emav3ml31zt2dm68w6phfnpf5xhfo2d9p0f4xfhd85baw9ttd7zksp6268t5ynkpqf',
                status: 'HOLDING',
                detail: 'Ut eum nihil aliquid quo. Dolor assumenda dolor animi temporibus. Voluptatum recusandae quasi. Aut rerum voluptatum.',
                example: 'p9bhvsuu2g6xbx8krn44b5qxpr0dfvpx4hhagqewh47fekzalq5p02ty0icu7rnw7nxu1eo2c4ev1m70rsfp8pbzc49wlut9664m3ohux376vmjwn5di1e10x7lwhsbz7vh41v4wygsajc1fft2sgvcrqiuoah01',
                startTimeAt: '2020-07-21 20:44:16',
                direction: 'f667s0cgipzu2i35yxmy',
                errorCategory: 'i2x7ej9nq5sfu1062afjpalrqe074k2y3fqwibcwyhqkoc2bwrsf0omtsc0j30e7iakhuxnr95lgdg4r0ekzcmub62qcd504cb0m825r08mrq5n13wluuzvpwwb6g66t8r6yfmxguez409d1d86nzxyhnm1grmpp',
                errorCode: '4q4cdlwbbmoeb9kaeoi8',
                errorLabel: '1piy3e9orz9iocuijhu1yz4dqcyhdgzr4hvgyrwh9paebg25rfqbbcc3wyhkte0otegjdeyp5qw08c1ahrenge2nhzl3ru3yfyzf49ca11y3e64581xmdepoc22j564i41ocrj80tdgx1i1n15jab8h3201jfh66',
                node: 5957370010,
                protocol: '9zjqx85vc3v7f9so3bo7',
                qualityOfService: '379sa0ar09ftfqeoas8b',
                receiverParty: 'vs9cejmekhnsrwtk4yrcemo5umsduis75aeplr0jt5ycgusc82fvr68m5bwraotgoigvbtzhupopoiveaml1h8db7j2ghzurjlbsyki1n07h3wnooedlzncitzhtt64tps2mksjp2dhwoauyveb3l9b0w5gzoyuq',
                receiverComponent: 'wtqpjnorwmttup9ccxapbuvie7vmaj3e48soaesh3nm6jovgumbpmo22388696eiuwznr1spvx0s80ygbvmg6fu9cfjnglcjkj6jlfk6gv0n4mbpcgc413zmx05dx8t6sdjw31myea5i2ao1dy90p9ogjl2e0j3v',
                receiverInterface: 'h9cgqwtvwaqdq0y7gd7r66dpdozf84gla33zhqumusx8fpg7ce4qk9725au6xh45lj6nqizl0n4mwowyoetax5s7ndzap0dx90ckbcagmwitoqv3bbsgphrtq5oqsmib46dehg512wozqq9hh7kqku1k8warx777',
                receiverInterfaceNamespace: 'uey0slefrcmb58unn7wwv4x79lmgsewjwrehh92y68fzu2z1yl6cl5ob9unkqojzfm9y4fdvdqwttsrni40ueuhadh92b83zciu2phr5jw7f8j246sz0egd9nsb59i3hb7a9wv4esfdz5obp7pju88e75oh7b4nv',
                retries: 9208234288,
                size: 6770231695,
                timesFailed: 9220852230,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '1mxyalu8ii03u934ykbx',
                scenario: '49vtq2wufvi52idi1vm3v3oijisdzl50h4axsr031sjnt7cw267zog3ptjo13',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:32:56',
                executionMonitoringStartAt: '2020-07-21 18:42:26',
                executionMonitoringEndAt: '2020-07-21 10:42:50',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '85rb7is9oscf2nfnpr348g3kmw0vdax9gszazhz5afp0n9vi66zlsve5qkd84n6ybwak3j34usc64tkng4d05ddsoxyrrmnqn06hr72dabqq5d54jrnml5b61u0isqtkel6hjc73xj8w0j62rou12daxtnsjs8de',
                flowComponent: 'nkin7aiv6ge8q32n2x4ltw0cmo795f1d6ij9f3w9ezd6lhonon7i23ghmkflc2wiwoabn477conehi155tyow64sikcajfqf9q1deb2n48w6iity2mo3iiv2wjjtausobiawqxis719b5gqtsyuk7qkl2jrw105l',
                flowInterfaceName: 't0mf063gdwo42mwswsg1aof0fm9rfzisgdh2ntmm7msh0j45x7t9r2l6cf5zavczzhwc1s13tp1d04n7tw2p5ec47smdze26jvrkie4b5d8atmjtx5dlvv6bi6csncsn4qh6vznfqp5ec0zua15ztjvyl6yjr3a1',
                flowInterfaceNamespace: 'vnbt2c5a5zc6nymnw32fdtfujc7iku4nse6jphpz5l10c8se1fuar7ke4u43o27ebb25ukj764a340cim44lige3xy6045c7ic6s8xb6ake3nkiyyysq7vb1tbom0yseezmpch0bvs47uiw7oeayiqn6gwn6f4ej',
                status: 'HOLDING',
                detail: 'Rerum qui aliquam eaque quam aut totam nihil necessitatibus qui. Enim beatae sint quibusdam quod autem dolorem qui nemo. Id earum cumque. Et rerum tenetur sunt. Est laudantium cumque quos et molestias ducimus neque.',
                example: 'mx1kvlevynyqfuv9gbz2x9gedyx87qzuzz76n93wy7r9to375oxtcg7jgr35gvftenb95kq1ou2nx1q8tz2drrpzt6w7kzco0blt2uweulzsw5fqfu3b37hiov1jrvl69gru86lya79ze475tl0oi4bq4mon2nnb',
                startTimeAt: '2020-07-21 15:29:09',
                direction: 'hfqtjsvz845f1n95g2s4',
                errorCategory: 'sjkcg32usun52d9tshh1quvf4hmvd0n602lg4onoqqhhdml7ttjnjzqkoe8djkjcm9hvok4rp8js8e9665b0xltowtmbno3aeb2di5ppc15f8blqfc5p75gcxnrdpomungnt39wr65c372lvzoh3ue8w17euya4r',
                errorCode: 'o79j44ln71bnwn8kd09b',
                errorLabel: '55szvti8xjlc09adjq0ad59nd112lebph2lxrg0g79jdxvf4y0p8wtr70ma0nilyremink94bwvdnmhvpm5qt8umbhmkiseycwofuu6d402cja1d04rjjgp9e3ikk9k0bzvj21nvavvbagvv41wvlrdbuze2xr0q',
                node: 6022200590,
                protocol: 'fbig9ntpxlbsga0yn7xd',
                qualityOfService: 'kzsylec2smzzr3yd240d',
                receiverParty: 'uydwzcyqozrbtm3u9ryzz7j694kunxz2y64qhjxcuzop87a2zs816rzg68nf8exm400ezqbk7gwyy4ymc44nvr5y20em5kel91vwkbxfa02k7aop3xayojecwlf8fieiyxdij4608he10edngn4ap64xxir9wbme',
                receiverComponent: 'h23zqryr9tnshe09s0twshyffcb937gnu01ebfmt9tbpp158j52gw5jlluazy36vi5xmtcd0x4zuasd8csxzvbjl0h2t7wu1q6rg0x7sqkpvvek7dl0mnb9rkjj6i28stj9pfnxhmnahq8uptdz2zs4x9xtefm41',
                receiverInterface: 'digfi68uftz1j2xi13ahb5cnh7t2nkx2mkexy8c7614d0w2jj7dg05oqld8eymwixvrkycbezeyx8knzav2h6bbqlnrc0v8hkzk7vtq0dqt12qmcka9x3ml81klcgd0ff11np0v9ujtqyal8zinhjn1gw5arnw3p',
                receiverInterfaceNamespace: 'd6e3k8h66w5ivy53khje294xhoozjm9nmj82s1tgqnzf99l3y486qr2i45eiyjc5xga7usnfhpt27ftav9jhpcska10065o6xyvsbbd53hdf9gqbqb1otg72wq4ieogwmkbi2zzcd8nc8cxqgl3j54cqpsphognb',
                retries: 2046426823,
                size: 2136539614,
                timesFailed: 9927865477,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'lvxr8gn6w7lab1aq2f4l',
                scenario: 'dld90082iddrprfbnwh0ar7gbmzycrqpqbxzcuj3t8gd2do1orrzajgu1d92',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 19:23:12',
                executionMonitoringStartAt: '2020-07-21 15:15:55',
                executionMonitoringEndAt: '2020-07-21 08:12:03',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ditr5sr7a4uk9w2f984vtg54qi91q1tm3etq23ys37jgst4e41ujl7h3nhawoc4kwfuy55bklf5oo8fefat9oxdjgyb08qa4jdhsal3qzn6ug9z0d4skdo4m1e6ch3g5d8nv4jgd7h6m2584qhe2klatkvfognofd',
                flowComponent: 'woxzn0xerzk5w7dzaq9jau63gq8jhgk1zdeesujb68jj623z50p877njfhzeqg943grmx3i0qhdinprd4qrl9e36xo8kb8ffx57xp89stmoabht3rh028qvkpd11zpkhxfgyr706e1mzynkld37t51bj0kzk3h7e',
                flowInterfaceName: 'vq282cfbme3jui8tlquxnivascepn0ao0zeukjv2nfdmwgk7hj3rgl7bbjgv6l571grgr730hv2c1wgumafk22rl2qik3640nsdsuoulfkgy2xut4xu3cnh44zxidgwz4su2e4ljda81y0s5zptxzniv4b2ino6u',
                flowInterfaceNamespace: 'n9tc0kseesltp40vw70ml5upvlnyooin4zy22oljhuly6ikg3cq3st78tuznu014hn0wrrzuqz193tusmhq6i2ec206j0axyiggp9m9slqxtka01x7ck86ggbxdw4btdfz9z3my8r0d2msrem33snw2uy76a3c6j',
                status: 'DELIVERING',
                detail: 'Est laborum est molestiae. Ea doloremque sunt sit eligendi. Sit enim nostrum quibusdam doloribus. Harum unde officia voluptates perferendis autem dolorem eveniet at eligendi. Ea nostrum sed quo doloribus.',
                example: '04ffrj3rz7j84pjkgbv7j9axagrre010k02mtkiujwkji39jsvmbv3dvcxzfzeh9p0bt4wdlybdw56tkhip6ktvgfzo9nq8yhcomcrymk3mql0mwfpeov5aaniijcxr3mwyae5pfu0i9a7gjh7z5ybmvypcfjeu8',
                startTimeAt: '2020-07-21 09:02:55',
                direction: 'y9zsm5ie308zxmrxzo10',
                errorCategory: 'nwl0g2qyhpdy249q1gvmmtv40bjpcz9uwgnkm5tutmsvv37qv1sdxkjp4vanyog9yjez5vqattvpncv8o40oer3ydbmimmfpditramfg2ssdqtdc8bkf3ntsltxoftr2pveqbr2qq6mltplfg76ow0gfukmey15x',
                errorCode: 'usgjuk4389ixejl5dx4f',
                errorLabel: 'vztg43i22b1lvrfag266jro8v4sbm2jh5hgmjrbjejzfkz60qkcf6agacvjyexgb77dn3f6ilfv5kfllnm42jm1q2ux72hlceqgwnf6q5vtfokxg0tg0htxkgrsisgdat4x8zpnywncsg0nyfm6wj2fgsdz4v21e',
                node: 9113931023,
                protocol: '8egzaif7td6tbvrmjief',
                qualityOfService: 'osuhh850v2trycf7cw6r',
                receiverParty: 'sxjmpzvxeaqx6fepjrruh9nl48yvvxcc0chgknwfesz0op8af6go9wz8yxvh31tn3dycoq622lzk0p3ax695xnu1kbcfgge0hmo9dfgyq2kbuofswm4b4e9cho5t8kxvwsn2tubau7by7leccwnjeebjpky2wx8c',
                receiverComponent: 'bxworx92izes21nwbygsfy4nnc3h4fa6xf2mghy40d31pvylxgvrmf8rrh0yc2d19zm22ycg5fkdegbfv0bzofeaauumwl2b15hl73twlz7zuzl0en0dhmlj7opcdzb3raqgywyu1bupy0jv6e45c1s55u0z3xqq',
                receiverInterface: '3a38fc2eqxtydconep02xx9iad3o38ssw0w9le6snms6q22o1ocsaqw2n4roj672hjgr95jjj627yqfqcu3qamb3eh9mfljtbbokroooer8l3keinn7eo63cgt4hrq93kyxccwgovwfmvbd4bxkru9qpwpkodo1q',
                receiverInterfaceNamespace: '7fjab7mc1d2r8heedckzmuypwre3gd1ui7bt83dym9wox45kdpwqpn4oh3aqiwmsya3fltqnbicwlazhqbk8mdd3x2w4gib9s12thg5c3g979da4rxkce812zqwlwpcap4v9joz4rquoh3lg0enu5rqgo1nmuy33',
                retries: 7745946874,
                size: 8256986417,
                timesFailed: 4569120133,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '5i2i5vykjev0nr38dn7i',
                scenario: 'thfwe7k2djnkpffev28ymaaa1m2pkx86xb5tj8guy64meadqd00m5vfgtg5z',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:04:49',
                executionMonitoringStartAt: '2020-07-21 02:01:49',
                executionMonitoringEndAt: '2020-07-21 18:35:27',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'j1w8hqhxxsf5apblhqjx251tuuitpqe15wo2xhbmysh504spagedggy2kgx98o3c55reu7hexokhcn78l0w76ol3qzlxuvrkn3p5f9lob4fxf73dzx3rxntcvmplv73am94u89olra03n7kvtlwtl7k8oc7sjrxb',
                flowComponent: 'ebqmgy4dhis5qx6ou2rcuygsxb9nb4e6kepv77a5q81ojj7usa4vchao0ub0rdtqwlr35o8qgsreb9npvtw0n2rpta3igs6xycrreaymfi1z7564r0xt39g5ejx6dsuz3ev76sa2s1hpe5s8b2sd4uj6zawvlr16a',
                flowInterfaceName: 'jk9buhtn5y4rp2adqiugyt58pkxyw1crzuqcfd8ugt5pda1ilqyfpgze1vnyligvihte3cvzwziosl2331igksjbt377zhrcoad9wrrodx2p9iodptme0l5kgjzdpj0baefkwp0i6fgp34gnrupvquqapynsjphe',
                flowInterfaceNamespace: 'fmdy0uzfva1g95sf1piiaden8k8ajg95orswvkb9zxuej886dkxn8m8e4fmaa7b14i6971ufzl8891t41z5iflt048f5wg7tx5bpyef920efh0nkjjou4jlmestuvwa6yt0ka42djohebaslii4f0r1tz0jdgw6l',
                status: 'DELIVERING',
                detail: 'Autem est praesentium nostrum id iste consequatur voluptatem quis. Aliquid mollitia accusamus animi sapiente. Voluptas voluptatem cupiditate iusto aut sequi veritatis maxime molestiae temporibus. Expedita sint exercitationem eum. Hic quas recusandae reprehenderit.',
                example: 'dm86rlvaonxd82r74b2j8a53ekkbar8c3umykfeowd5rd6c6tbpe456o42v0pg13mkm72deztgzkeruhuqz9hlacwsjvscqx40og2i3m6b9hm4ciaxf99d8v4bniaprh5xvraqy24vbvrqrjdivymkfwoa9gsm4t',
                startTimeAt: '2020-07-21 06:00:58',
                direction: 'safut4x0gwgwr5z1kb63',
                errorCategory: 'o7qx3apeygd78uhcnovx18th36t0q7am6oiwlp4fnjptldj6hiamtdpekuf23pu4f5839hxgzjsiqw8cuc7k03rrqv8j4zimfm1opv5fyi9s2jajw6c9hl51o938m64fwjcti9ukuy1fjff488ccqcqaqmr2absu',
                errorCode: 'tripf1brw9d4lkbaspv3',
                errorLabel: 'ka6ddyxmc5z52rgflxoow674tlc290g8svwm64zzgpyfoiraqp3dczr6khsbww2fbnugdk5q5gprxe0ki25nrcx8l08pxyxjruqpptpms2c5bwfrok926kjp0m8ybowa9w77xq5ye58vb6nkzjuqfht5q5hd1rvv',
                node: 9404137801,
                protocol: 'xbhbk5rhydfax5qs5ly0',
                qualityOfService: 'r9dvkygtn4iez21lkrri',
                receiverParty: 'h3fuiuuebnabyra6lfu9xspam9lijj34ar6utuddevi11zy8blaqv4bz222ov3u2qtnw0fjkqa3que2lbcg5prvz6n0q5egjvzjrvrpvwsloolq4aqcdp5a8ci3rlv9ulqs005vxffsx6b6rlrayn5f6t1j5c23d',
                receiverComponent: '5q17j2x66xgr2y0j797mies2fi04b8x9sdn6vcbxeplhbuttfj715zgsvbjbq0ba6j2hfoc8si17q01xr1ldxtyhlpjbza2ljnbt8k2jl02utx6pd1ubqpfty7h2orxtfirfhfkx29odkv0lh7fq0918f389dat7',
                receiverInterface: '789ebugnonzwxnslmzr2971xyt8mwjijrdnq3ekc1g5tgm5n100hnbqu9lzww3hoa6cbcdfp6j4tdm3e4int2u0cgc6fvc6em9nei66hec8l7il5w16j8i7c406fcbdl3xuyn0v7mn2wbwmvts0f95dli4it84to',
                receiverInterfaceNamespace: '3szkua7nvak5mf5g724b608ilvg9mva0d23ho0vrtv04c8s0kdafbcxv556vy5nugdv5nxn40luamcau82h8dpxuy20plxpiqe89oqghyt0bybakbo6mj5coqyxzm5ai6i9aifa0a8lv0uj0yuwoiojlsyioiduu',
                retries: 7599264184,
                size: 8156083893,
                timesFailed: 9686623066,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'ys2hj1y2hfsxp18bldjw',
                scenario: 'cecf361ne1bkhgavkhytzcydxn48kw46fgikfwcqf70lhmul9wzv0quy4he9',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:03:59',
                executionMonitoringStartAt: '2020-07-21 21:38:53',
                executionMonitoringEndAt: '2020-07-21 05:38:33',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'fjcxotb0keinv4xwc75q4ae5mgo1lcjkespbgu0wjza19tjc503yrjom0ikuoo9rmatpllkky00osxydpqpshisnbnefoqzqyaskbaqzlyqh26p4amh85y7mwf599cfqlt0m2m34grqx6eudpb07p91fb2slxi9o',
                flowComponent: '6dz4q8u8ty205peu4bpzplyp2cbots3xgqdug68xhhegyb0e3xjr74imzob3eifyk6eofka1gabr5sdlygph9ira7qicampns4s7csmncqz2wf40qoofbjsn82wpsz0r5n31m6h7blp62qf5hcta3qy7ij6opqo3',
                flowInterfaceName: '4aou44vl51386wghlmeo9du0hahjrelpm5tw1bm8rc4sjv9pt9di7dj6734q4hordd22etwdv8llst2bimviukanz6dy3j6ll2jrouuz1ducqadw4ettq1zoysbasas24mxyrkwqiu0pfiq5doyivrnau57gpohzs',
                flowInterfaceNamespace: '1n72stet5dqqhnl56p86jfbgum67d0mbxjhowefckb5kuzspaaynvdyq58y42j1fwx8zytk9bq5g810h7fyhnffyoz9ggrczxi85t70j5gqthl9al9abw0e238w8tqheqrsan38ibabnz1nxxh9d26yr0m5otaga',
                status: 'TO_BE_DELIVERED',
                detail: 'Minus quia qui fugiat quos quis rerum aliquam. Corrupti vel repellat est placeat amet. Facilis nulla delectus. Culpa quas libero.',
                example: 'urvnbgf754el4aerruwo508z6y5nww5t3rkzrjl8oayn3qn8hraio4eviviweuqxaob5zqvte9yxxf9z0i10gmp2kdpycjr2v4d1rebp5ruaztbpblpfnd8qeql4x50i0ykg9tnt0lkgodg2ivohg3ml84y49raq',
                startTimeAt: '2020-07-21 11:41:57',
                direction: '4i6dywm8zwngeb7xqdnd',
                errorCategory: 'm8l0zi32z2jc7dxbyvufe2lrb52plund2njung1rsny9lej80cnxy3wpefadklgt3kzuxg68b6p2olhgc0fen8s0822rcaauafdltgbwkhouu8a4my3fr7qfoghlsx0a1egzv7eg5hsh17uw8q9y29t60fetx9sn',
                errorCode: 'xzf5ulzcbxq4z0n0y96f',
                errorLabel: 'oo8l17ajypx8awyqbnf44s5pktyte8i3kzqf60sx44yxs5owpyphqibg9du5uw7btf9cx82iesld1xprezjo7x0ifbxz4unhsj2e5bwa3o7pyzoen5pmooqta9i5jvpk8dv05n8adwr23aiwztp8pkmnori9zsrk',
                node: 9610301744,
                protocol: '33viksen43pg51wn7daj',
                qualityOfService: '5jebx8izyowhg9ovz5v1',
                receiverParty: 's09av0xrdyl0rdbz770e65wkig727iscqbpe73lqvofhqz7s83nhfe6vn1wnx7jt0kl2vxav1agr3ndrvwrcmjjr3eih1sy8xqa81r8akslrekif9ut1m14m58mr6dgzl2yha0vb3y1jv2pvr6yd1cjhe1akevt6',
                receiverComponent: 'nwy35wgol9ln2gakwwxu3e3c0tqw8weo6lshtdupvfzgfbfnjva77kcg0k4u4w0ap80w4yxicduo7b56f29m892dd7moxpla1djbt3d0kvrv77z5rh0fpihq77ctrtdwm0vgvbm6q4mco1ixyh7bq3k96h66ghyu',
                receiverInterface: 'sm4y90kyq9iw27bw5ghfvpi70v93o0an9sgz14l2uccy5un262pyj3r98rpxd1bbj9854g1nww0m9jfyj14i7r04ven1f6yp0utjv5o8r1th7b2bu4l21fpifjcmuthe57zf2nwesynkvkhphf6qooqqlwcwtx52',
                receiverInterfaceNamespace: 'fv0qych339nk54pehvecofaewi0hbojb5xo1fzzuict14o8m7f5sokwgtxs7jovnh3f014v9052ykys39i3werpqydjwvar6qfdb913fpe1exoxo7cdr5ko4fxy7nrur1uumlbiyhwztcri6gbjqjao4krmrj2jb',
                retries: 2841273515,
                size: 2607875863,
                timesFailed: 3330137279,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'k1td1pjm3j32yiy6elwe',
                scenario: 'k6yxi8t3lyy0xtzusnz419nnvwvbb7ov689hwkj4jkws9jzazqsbjjvk0rv3',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:18:55',
                executionMonitoringStartAt: '2020-07-21 08:38:56',
                executionMonitoringEndAt: '2020-07-21 06:40:35',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '1cvmp4pl7qo8p7ox5694wsrcnhy798u1vc65kb7y10l40ogjvnxkevvcexubn83lemrcf61q3cvslksft7p9parz4rp2g10b9aqsjfinn0ac8ofneyj1w6pvh47fzkiu79f9k2wsd8f3t3gyngpgf66bc7fb6rrw',
                flowComponent: 'c650z4hr0u62pmii4fpnv7my2wyizw1ufhtwmdayn0kiefsamldzbfdhm7b0cuy6enw3u91nmni7gg6algat9sf85ownh48urwnuu1fpupgskosfpcqdtvlywsw5mqjvwma7i7yrpftnr3u8wdkh2vzvqfp236xz',
                flowInterfaceName: 'y5nkhag94vklrflkjf1i9nnhjf1ycuq6phx5zz2wuxod0n5ic3aqw5kaqx1flshsen87fy9sdycmnqz0qorxqxymlls0vgco7h6uzhnal1q9zr98a0r50r61u34s3iwtu3elqnzfdct7s07wxd87l4yd6vjmdu31',
                flowInterfaceNamespace: 'rxu89e3uu7egmjqwchu851zre0ze24ely3rmpma36jzy9p4aolgxjaio1k1g6qz4kb7mdljl1zj0ri7ia13ivymc2odiypn3l5irkgjpoeydhnkw9au07d66ybu5shz9on8jyalsrosthk9q6ruilbmnlm8hwpkp0',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut consequatur et odio velit fugit sapiente sint quia. Distinctio voluptatem provident et aut non ipsam voluptatum. Facilis vitae architecto. Nostrum sunt laudantium ex omnis magni omnis sunt delectus. Id fuga fugit omnis.',
                example: 'lhrdct9hpnej9a06sdt0yo8lyropp353tu6mihf3l6l6kpifz4tv3uz8w39p5dm4529g2l4wumsdhd9ady17mhn08tmzr7aziwmt5igjbypvtmcch2ufoeeduzk6ertd2azhigtaumja2pfwb0twe3xiu6uv5o4y',
                startTimeAt: '2020-07-21 20:22:18',
                direction: 'es96rf4txo8kgm1isycz',
                errorCategory: 'afiy6sxtgnwsflk98ees1suhgnl85iw8er8rjr9xrxo3wrc38ri1pq7ex5s1f80akew67i60j5gokgy4m65z1p1bny3rtu3n1uxc0j0e6uzg7utyavzn8h8pi9owvl0jc0xbap77bxe0h7wxcq90ytyyzonj7xw6',
                errorCode: '82l1d0d6e5wufhzmcuq0',
                errorLabel: 'zj1pvacel4xx33d3meh3dfewm7k9n7p8jt0246cvakcty908i9s4jrb8k7snbg15jt3z39o7uokdlfwu0aba0ojl2zf5i87krx3mqxr0tkhoufh93sc27uovk55vxul4aqgft19cvo3g1g2ktmbvw4dzmljd7kqg',
                node: 4635854889,
                protocol: 'ur6p9hhitdrhr5tkjuth',
                qualityOfService: 'l6fkkgsl24v8pocaxc7a',
                receiverParty: '5cwa4nnhixxfta27hpiwm6jt7modm1jii4vk06k01nwcvznhigfuwb7najr9hbess9gjsd36gdgzzy0y9qri9qym3xt7l8xbwi6r6jur8an1tjvomuuuahywkt3qtec97zges6kaj4y1vdiatmicec7xwhvbqbx2',
                receiverComponent: 'i2vxyzjcvcafxczdrmsjmvcfl0ermz2zeepbwlmeaw2a1fvzucix9x7mninq4wtf2z2iiwahg0jw5u05sol2qdz317of3oi5ha56kmb91z29f26rvclv2f1ndrcibpfetk34hdqb46au45yonw7n31xxoyxl9wqc',
                receiverInterface: '14wkl6xjzt3g3gn4ja3yvzpf7nxa688vzmt06jnbgimvmq6qozuiv2rjk0l7ze31n5e5h5f54y59td4z5iuc02gk8m9bd7v00dax41i4h6hq81ao7sbbwbuzowb2b1x14n08altz51h5dwaku3dzicxmzs7unrsb',
                receiverInterfaceNamespace: 'ex6pn42xcqhuswqgv9gxhuqsaybxjos1vopvkho34yfdl0opcu13nc8mz70568oeqdijml2w1ou1h8o2flmndz17mtirceffuc9k47zw62ki65htj2od0z09t7v3d9i1ryuzwm807pfqq3j2a9j3jcaxrsg88xpw',
                retries: 2398322677,
                size: 4844562723,
                timesFailed: 5700958404,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'pw0lzfdcct30d6d2iaba',
                scenario: '9cx9pocumlgqkbrkrogsnnkc38lixgehlp8xb97mmept0gy4sjlv2jx9ozqr',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:36:29',
                executionMonitoringStartAt: '2020-07-21 20:35:46',
                executionMonitoringEndAt: '2020-07-21 23:05:03',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'w6hvj4jxr3xyvxzpjtzm62s6jzaliksa92ii14ec25dmv7g2req3xghrkyl2hiv37ysvlv1oulonddewq7fkcumb08dw6j18s9vd13ovnd6l59h4d5wiz580v5m5aloaep4em1l6g8k77db07dss1jnd1rkhq3cj',
                flowComponent: 'iv01m8axz0lyx7axdkca1v956frnhucaysd60a7exdq86vpyxlqctyo1nqipypxt00b73x3xpmvufr9ae4umlfkmrhuflv682q2zh01bouaunbz2wn28cykw47p7cjhz3g5mikrehjhya1gpxucn97n310njno8l',
                flowInterfaceName: 'e0ccgqr0jr6b5mwocleqigxu5o9lc60kvlhmiso25qzgkzti4qfc5zi6q7qi59dfe3d0pnhdzkb50py6xafh4t1aejbb8s64ocuvh4c4vmp20duh9wkj08vktxi5kl9dwlyb1n9dfp9po1divc8rrrv3kwq9fpeh',
                flowInterfaceNamespace: 'yk4vp8mar67h66ij9zynbswbrsniu4fp4fcrz4d5bgkw0os8yr5nd1wh1mbie87ttmpbblwnamtokk0azy6foldocgc8oii7f6tye4kc7w5hp3d4t1506ipzh3mb0404s4k339fpdl9txbn7aqkoayk18emi5z7f',
                status: 'WAITING',
                detail: 'Fuga recusandae quas culpa. Sed veniam cumque provident ratione doloribus aut ducimus. Voluptas officia minus itaque ex similique sint sint velit cum. Cupiditate ad dolor eum dicta aut nobis.',
                example: 'di3d1en38enbam49e3vdnqpwswpqp3el5pnifmay34mhe6v5he3hdd4bly2xph1rjpziipb56tn706mixtmva165xdpujgd1u8edm6gk8rzbf80igplstpr945nushaezokmlb2mb17rfz1u4p12l3ja4vwhrwfvj',
                startTimeAt: '2020-07-21 15:35:41',
                direction: 'szohpnz9nt0j6r4mn7wp',
                errorCategory: '0eyhf0fmdvl14vtf1q2f5ofakoslnjl87vh3lqsra89tnyl2tias9dhq27pn6gda08ms11o2bj7jecp6quieuiw2is9h6wylj51c4f11w28emct0edwe6g7ptz29d2tpjs78365furjk0wcc4z6s7mmml9zs3i63',
                errorCode: '1kqj2123l3xa2v31c485',
                errorLabel: 'cvykext9dcy4h77kgw2z1ngz45rf6hklue557udawqw5eip2m71jx9eyjhig38seg3g5ac38nqz3gcobo0etnsb6b6cahdlfaywt0oxjhvx47y2oozy5uzbqeccuj16zx0psni7svs1e0t2ayuiul079raiafc3s',
                node: 1737391499,
                protocol: 'o0d2qw1yrdl2wd2upftc',
                qualityOfService: 'en82d8mmyovczsa0bbwn',
                receiverParty: 'n6jbfsc7idtm4cmb87s2qg7x36nivk0md4zq92u6n57ejxadwyx0zttqg9iiqsx01e9jl3s5qjf52w1c76hdxnb7kiic436a1gf36ke8sq45jdyg238q0nmycwge3vkwqupk56xigxcnao3w0dd9cbfub8chbupr',
                receiverComponent: '0qrdjy3xax4a0pj568pjxrjcywu7gjmwrywu5ls6txmsjbgndugmfmij5lriv48x81jdwpkjrv9285t7vvu9fy8j6nsq42vtsvnihz379el4bnw4pc7rnwbabdf0988k88fpm89m9jmmq0zmrjqshooc3xe27t5a',
                receiverInterface: 'c0ftw3hih84xrxgu6grwroqwb7ebube6e6v8h102xpd30575081c5xztwd7j1el54rwxy79x6qflp8qkcb4mj013reyzalo0m3dz2ztnkcorirq4h8row0mbf2v2yiqhteti6wt9aya9selbfvg8gvun3s5c8s3e',
                receiverInterfaceNamespace: 'dm44eis95397ywo8y8esrwga4b3yxq6zzotdwdppef7u6s18aaxqqheovoh5bh1425pjcl2wu4oa4a0utys78y64lznrxa57w73sbl5zeeyu6flo6dfqb9ulvwwq7xaca2z5xl6eo7pddyrq2aitr75inc0dnka7',
                retries: 4456018846,
                size: 1355378196,
                timesFailed: 6561116178,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'nbnfxu7o7oiecfo59bon',
                scenario: 'gqqfwpim9kknnv0kboi6zftrxg4mi2kpfx3cqg8aqxyfqzd1lshef6rrkxfh',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:15:42',
                executionMonitoringStartAt: '2020-07-21 03:57:29',
                executionMonitoringEndAt: '2020-07-21 07:15:53',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'cy12bqz313x5r98rp4n3h0nvr841q7ykcftkrywm60t9c6r00q4l8hehl33xec7qh3lnafa9fixou08w7xvc3ixd15ijmnb9komvf6kh3p9nu8we05s3fzfq8310jo8dn1hf6x6nn84vtqhctkcwh5sxgsr6ioi2',
                flowComponent: '09571i1daf63b91i21ajq4yq7330g4ecfs13p6aat5z3no72kj2e3af41lighs65hncb5ab6hvtu6naq5xzandsu4qg8i35flzjyy1w33y1ym75zyebgioksf3s3g1kpxtbq28f6bkwuptchl4d1136jiwk0o7w0',
                flowInterfaceName: 'ylzaikk86hibc4fze6dcoi00jl03dgfy5k0oxkk5rdi713cygbjfltl41bl1uc9ychxbdkc5bzkmzxcxmi9g3cuoo9ouzee22xkdklk87xkke1mn7lqj8juf5i1p4sx9drvsp5l8iflpo990joddcsnmigpf0al6',
                flowInterfaceNamespace: 'a4sav0j9x9ejlqpqjg1mpuaeuut6rkvbanljln15cz6utp6b1ev7fh8owhc5brbj73j8pwmqj9bopwwdy5a7zojpt6t0mnzr2d9jdutyocz6v4y4r7hoytcsc6723b1no8zdy2bmcaggldwv5499htm97pzuw1no',
                status: 'ERROR',
                detail: 'Sit et molestias recusandae quia consequatur. Aut necessitatibus numquam. Rerum dicta et qui est.',
                example: '239sx0tnqqpatsjc8v9kun85j5xw1rumh9r8pq2fbwoly66yrchwj4mwoi61r2msk93j0a82y95nus0g5euy2pt1z4uccn8o16v3gw4spvkln48a8j47tawzs2v0nir8ndpdjic7r1bz4ijdzojs4alvi42m90ac',
                startTimeAt: '2020-07-21 18:18:19',
                direction: 'qroeh1dl0j25v0yqgfeqr',
                errorCategory: '1ymbe593alcho7qwljqpnfd3izr0ireo85bbcz3hobd4sg6khw4j2w3tnoi62z1mkv19ndckph2rvulq2rhhl1c52py7f0min1udqaarnh5lml43y9z0bomxz3rw886krehix090mekh8460pruq116uuen26sqx',
                errorCode: 'wa11v9mh5elgl90eyci5',
                errorLabel: 'ocp0hiaktlk4twsem6e9z6pabayvz3o7h4x5z42hxvwae8eu31enaqz9jmm6b0e0g8l4zwo8s1a6x9wc4dhrn4o7vqqpgr1odqwgxmmzu0gx5n9m8j8wnyd6tqxl89lgn7raadj6njx9a5u279917i2ky3z6rtao',
                node: 9932758544,
                protocol: 'j6ufz1q9r9760mcakrm5',
                qualityOfService: 'w370syynpmrkeyerl1y4',
                receiverParty: 'ddwav3icbt3uunsb5680mz424ntjg7lpnaqfrwhq0ipjeoog953di5qu81wppntfgjmtd9ktlxtc6mvnh1q5f0sdygz7p0a5tk1yz5rvk3gv5tql0dkoje1c8rx9hod65fyepfvf4vv7sqsnjpwj36e6nm2w665b',
                receiverComponent: '4djhwzqhqgwpfdb1x6t0gvhbatv0ry1lai4vf5ncbp5norb14005ye0t66ji4sm7tneiwoh9esy230zcifcdewif55lj0bc5pzzsgr3b1upuxl0ar45evfe8pbje6e7140tunysxcqr28kf8jmc0556osfxg7l7c',
                receiverInterface: '8mezq3pp8lzp02q3uam27y87himbo9u7kh5axflihho0ngiesyuuvj1498eq2rfrh0bjqiwb6o3r1cxih9owxq3kky1tof37nam0cmclgrpc5a4c8qk4tdra5nqagarmfha0r03ia8jrj9mgdfy4aqqsuxgmdcur',
                receiverInterfaceNamespace: 'uxyqpew6e5oy0l5varsmb3mlpbbvszo7uzpxawhqxsdpalqkegnqyfei0z1xsxd3vgaihzjpxztnxsagmw3l87ubow0llxy68tx4x1naf3hwbitahxlvl6s587d4t7na2qj9g0ctf2w94pt229zwqv39ho0lghb2',
                retries: 4741014518,
                size: 1556638416,
                timesFailed: 6441061613,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'ymsao0rj0pjvkvtdfxle',
                scenario: 'wuq3q9hrqgz81h8my1nrb1eh8z6bze66t3ogbmqd2n0u7kuplrko5dbwcggn',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 00:55:40',
                executionMonitoringStartAt: '2020-07-21 23:22:07',
                executionMonitoringEndAt: '2020-07-21 04:07:37',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'fliknl2tusb8vb415is6emcv67nniugwk5ra1a2s7p7n40whkr2rq2hqx3trmguoxewtqcscrehhygbiavm18eqoq6au67tcydyw4bbdvtjp7ttur7wjl31y4ik05cbqm6xvl35vgwg050k048ocg1qoxa6po6we',
                flowComponent: 'v7dn678kuucn6qs4yk9lmntijbp5sioq46s8fdq8omjhlls4a1dah15fmmo82vpb56eha1nh8tf3ch0dkkgls2lv40simv7hmxnbukfkk4871nd2048qr03vuapoqw1t9tr2o456reb1uu7cb8wfufhzedn2byoh',
                flowInterfaceName: 'rxca8tmmx0sxlpl1pmy73juf28d22xe9lf28m4tj66bqsl44fclx0cme65bzyd8zfkiqiktkfe9sfchdo1o8s0oddft2dtfihlrhsiyj7o06mgp7bkoxr1jw2peyxckosd7ivycnvxzlpsvblh3u9ydgb6lf7mnv',
                flowInterfaceNamespace: '4y58mtjkb3tzd007oi56os3zdfe8q68ya9p7xzo5oa029dkfuomomxa78fkt6uvqgsmajsng0vklxe1dou17rpgtpo65iu20w7e4wqaz1m4rc6aoh1ajz540rykfxgnj9gy1zfe8xgyv6iwndz8o7u69yaoh9byy',
                status: 'CANCELLED',
                detail: 'Dolore consectetur est eius fugit rerum necessitatibus qui enim. Qui nobis excepturi reprehenderit dolorem et voluptatem numquam. Quibusdam rerum vel.',
                example: 'oxv7bprgz4gwq4n6o2j4utq2xci438aqer49k9saxzg4vxkgm1gbpal03qquq3en4viboop1e9gyubf0dihiui7vw70kotgenms6751lrzzbytfgwiigj1046qf6e9cpunkqm8ynwcedzuu87djelomd1q0agkgo',
                startTimeAt: '2020-07-21 18:57:16',
                direction: '3aah5uev47mj2pa49ihn',
                errorCategory: '0vfeum90l6bfiwa69xa17008dpunls9x40qic9d346fky7yin6f9kuuz4s1uflenerzdouxty7ju78svija21nj8f90qk1n79u13dw6q8e189jmt68btdcai7ltx6xnu3ra9xk7n1lycyzezmc7akiathufx1dixy',
                errorCode: 'ewqbvlsj4720icqjsgc3',
                errorLabel: 'm5trpnloyr7z0c10tihsn86dohtkvml7y47wdfkqc4urmf75gqyf21adwrdpbg6z161qmtlrxlkiz6sdw8dx6407bzw0t2fnbapsthu7ec275b3y4an0nmwqhbanly1qch23zhy417vuuhc8wu4yp724c4q9g4jt',
                node: 2147564228,
                protocol: '3dr2hbbyv8z2wtio33s8',
                qualityOfService: 'mzqxo0fhckpswrf8wthx',
                receiverParty: 'npjej2t61roxqer7zboooxks005rmuj9yg1pt8mp3nn4mwafygiioexpiiq7g9phc0fox0m21yf29fqq32l9mo6bc80fu0wf0bozc88fj7qnqj2sv5qmqyrksnmkxzriove9k588vsflsqwz45dsmpdo41rvs5ch',
                receiverComponent: 'qo8cdb34ncc19q2jug3zycei60ohnxnmuuiy329e7w46rqcw5ibfnlocfo6qz7sraknrqdz5pf1m15boemwvj93urvrquawwgdt5d3k817yhrvskc3aznza4zipq5813xxiaylbhttthtit90jdmm2y46sveks3k',
                receiverInterface: 'dy0ul2gsukzjffawoaer5nv9j1slcul6n621j14rve9et2g9j3x86ccxc6lxjbvbp4kn3ewltd103oyw9kw62xtt8ecaau626tqqj7a3m6n6ij86mcy7v42miaj03uf3po6epc7bui9d55jh27927q0z22q2wdse',
                receiverInterfaceNamespace: '0i543mcf4x37fwubwirnskms3afni4jtkfalzwvaia2cty1c5nz7b4gkjmmjlw370ubcp4tb2p3k8jxwme93h41w6qz8jy0pdcyi5p3ku2gghnudy13z7t25712b9zg76trxeqauhv2x59vg0s58asrpp60dv4x1',
                retries: 2515212898,
                size: 2267990908,
                timesFailed: 3147443266,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'auaoummmebjc5a63da5j',
                scenario: 'gnw8min2ya1ls2lupmahkghjn9tsh2xi4j9rahn8n0bakwx1jr2c1yfnjhfl',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:57:37',
                executionMonitoringStartAt: '2020-07-21 00:59:27',
                executionMonitoringEndAt: '2020-07-21 15:32:13',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'saj6qfird66tlppvr7zf2nmbn32z2mvb2bqjpnfrr4s74g6sh09j8ptll74nacns2thl625xrwkj0pdtc5tknie7a1ln5q0gxq3zlijwa0l6bxgcmstk55hcmo617ijfp3zxywkcpeqhg04mtn1y17lefvfuklpf',
                flowComponent: 'zfyx73ygccb3p998sz915j4wu25hnjtknybxub4jxb7yg2ml9baxcyotdycry75jntfkbugry9q1x7ck98rsh829h771i6w1u8etj52fy0hl5spj3yfz71m6604a7fpg3l9icglievh6wtfq8bz26rt37ko1mii1',
                flowInterfaceName: 'y41wnkzotks3xuf9antsf6zmufssc1yj4c7h6c3vjti7q334vz6jprgbrpdo4rsr95j28xpoc3wtiagsw70ax8p8q0m8tj02tv0q80i8jed7jum4gp340ejj8mxfmn523q7tfqbup6x284w9g2n9z8blqlipqg6q',
                flowInterfaceNamespace: 'ecpth2rs73hikgvrv6vzod6ktn5xfhduqt2w0prna601bwlgr7c68ugngc0u7pvpyy1tezrqxqiawa6arxwjs8grctd6sgzgq5704wvk8v9rqgqm0c9p421jfotjis05qb1opnin6k7abz2tb0srrb2d7gnbyvji',
                status: 'WAITING',
                detail: 'Et est molestias qui dolorem et. Necessitatibus sunt quis. Ab odit necessitatibus. Voluptas corporis in repellat quia est. Voluptatem aut omnis.',
                example: '242mxb9o01mcfy7dz4eefukijwwy6u3oe8qxbfahpz246rybstc8njtzug81l2ehfa8p3566ptfzqhx4zkru2052eg89xf4jg2vqqoi8t5hk178patvyp0t2ee8tsz9ijr3vn3erb91e8hxsoxwl8nz8lhx88u3t',
                startTimeAt: '2020-07-21 22:16:53',
                direction: 'yrxzrs05ylekw0dul973',
                errorCategory: 'd1hwynvho1llsh0mvaphhgpi72ghnieoaw9xm39ou5w814wd5mqix1vazzoetw1giovhtrjrwzatgti18tpr3fxhmsbo7dtlde2wb6x6sk4gyw31u4s3s2v0j3y99v78bcafvutr6ryjd8aeltqqfdz6ipfoxqei',
                errorCode: '4dyskws5dwjj9dj4g8hu0',
                errorLabel: '0efpgf0bo1x4fla3p0153c6itm8kfvosl5et1lbpu1ufn4aacb8p77lergoy87zw5wktqfc0gxaujdm0r6585d5x5t4mgi77f5ixo0v98hjee4rvyojgwgpgeat25de8a29hw16ao14hhyu0b9vom5gzk7f5byz1',
                node: 6002590919,
                protocol: 'rjbrwqfavf8wdtacuh76',
                qualityOfService: '22q98id8h3ot1pfuk8z3',
                receiverParty: 'r0u2uu5skkgzgnjrp9j7qijgwj9z7xeayvoce8a1khqzy9egv352amki727zf0p9lypxe5c32jfv7hvb1hunv2xrrl0b4jmll2vlayt6bcccj7vlpvz0qgy07puytcpvdgtwu4qoqrqcpw22ajti6itjfk5r2pr1',
                receiverComponent: 'pzfwqqw7mnflxwxnws4uhm0kc8fmmwquqf9xa9gk4fiizof9qjvbt7zb5uciug0gqsxqazpm28fffpuyjnjpqoyor6yfk2ort4o5i2zs5sq6ae3c6urrkiwbyvr41wpjbpyhb4zlxxrzac0ddn7kobn0xh6ofd2n',
                receiverInterface: 'v5909jqmtjpk0ixzzjw10gdylj7xox9uuedt7djz3f1z1qra17w50f8pgfdm02riyo2vun8y8tooku2d81fmfdxknhc4liq9puny2rrqg0zjjqxwbfgebzc9yf2ixop07prmr8tn56od0lpng5hwrb70ld1a19za',
                receiverInterfaceNamespace: 'ycqhdwefnh50les593b764tj6x9it8sqo5kkk82h1vad9nmpvi7vz6qwsxczj5gklcu3i1fs73ymig0wabf76qhkljufe5j6tdfc2m1kqvi21azw92pcg8lcevctjx0lghf0wlfvkn4x6syv9kp9rvfotvijt4td',
                retries: 9418663562,
                size: 5609748357,
                timesFailed: 6734062706,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'inme76hdhf0c0rmzzbu9',
                scenario: 'qvc1mwsdfjnh7rhc1jtua4w1cz9etnykijmi4v339e3jrrikhiahmsm7okm1',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:50:00',
                executionMonitoringStartAt: '2020-07-21 09:48:08',
                executionMonitoringEndAt: '2020-07-21 23:04:36',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '0r8glzzyiturlpz4labsnh5czt84divpyjis3wlek9ns76e1uo7pinom7dexty6lcvtkoq0oxpqsz9cuceglc2k5wi0nhd98tzj33jtz3p6bl2ci4aa7mczdldqa8s3nx8hc89wa6s7imy9d524dnc59w5d7v1n5',
                flowComponent: 'i79z0s9afmkbyvssmufai8nnl8y1rtmsjbtgs5vusgyzmlwa035ilb22doxd4lvo2d6k5a4nx1f3r5zz46cm8u2l9f4lyoa4d7zeyss7t2oqq7zx16xydfs3r3q58q4peel16c39nnntbrkmxb0c8c9ifsbr8rot',
                flowInterfaceName: 'q6wnekjw508nxnk4440bbnc2krae7wxt86dr6qaoo82yep06607awmjxnmvt0em58b677n0nr1pb1ntm8gbg2eyzq2qknfpx3puminubxjabbcm95tuiggzommbszrggn8xndch7qt37i2ghjtlmakw3226ktszy',
                flowInterfaceNamespace: 'aw9drygufaxyj3x92h4mn2kqiuvuwjx3hna7p3p6jg4qu32h8us6gqy8p69a2ewvddfjfudj2ka2bgu6ptlx802ooccsyhs9enaaoac9q2jwldvlus8yvh3o94zh5v5krlu3igrl4c159yx2ty1g2k7ms9dm9q04',
                status: 'TO_BE_DELIVERED',
                detail: 'Temporibus dolorem incidunt velit. Et dignissimos omnis cupiditate quisquam. Exercitationem similique ratione.',
                example: 'mg5itufypdcet0kq0936dqq9653r5q18kbj8sxzblkqcwgplmeg8w12wcbthlhqz0je6mnfweekay5zx6fbsxnfb4ykl83j9on06ll226njtaf1hx64pks12oq1evsqagzxnn2r3vge73r28ydvkiz33399h1kzl',
                startTimeAt: '2020-07-21 10:45:41',
                direction: 'pl22bapi54jb5ee0aytm',
                errorCategory: 'bpkum9o990ro1au0nzdxr32fbltkwfuzu52g0dkwuft2b7j0dpdk066fej0jd2fqde76egckq4bvglv6lyaugqgw7zv0mka255wfkldt15c4kxzzh2dkfq0pvkkr3juyi6n6j8vpq4owxszk7o0462bmw3se1u2a',
                errorCode: '1o8ov9l1dc4z6t1zxl36',
                errorLabel: 'w47airz9qcxp61662nus2z7ofrx05lwu8brbx3og8hskr1c92lowtmcdsg8tysft8ic3xxwlz50fy7bqcrcw4joiyvzijl5dibjeovj63f7mhekkqvfh3z6pswqj6xh6lsp8cbk2fn6y9ywp4demwjjj3es8s8e9p',
                node: 9362538186,
                protocol: 'au6aoyn6msi5u8nitgb1',
                qualityOfService: '6k3pxdzvvdte0l2occi9',
                receiverParty: 'df2gy7asc0zktf8elc625mf64714o5qkpfuqjg1i29hqy84ls4ndli71c34vtmo65f5pxpzsrdw32pusvec8akllvogqpxk44wge71j1b2amg75qdio5kqihxx6jgodsvj1ts42d8t9kyc1raguy9m8xzf4t1jkr',
                receiverComponent: 'j7t3277adi0v4rxg9mg1qsxmssy2e234ysklgvms7qllswae7uhpnxlbr53sbe5pkaf475sj4dn5zjpar6t5w9j7logc5y4geti5tisvy4fzwqzs8dp2x9nngosrszbp0y0yff5nqp9hmeqhgpgie8u7zigy5bgk',
                receiverInterface: '73iqrlrq55nju1j4xrz5vug4vzd9sea1ysgg0zz1giumw774zvwfbqhnrp00pj9ni0dpl0mfdjt7077iyd344r7x8kfifqe1h51a7yp802r1pggpoc9qc6o77sld6u4n6ul3w8cgkercxelybz2ev9cpgmqs2q3w',
                receiverInterfaceNamespace: '5qwderi1de7xaryxmuka6i0z6ho40q7a6paefiip0i0uknr8vcotepy5vtzu6ejk1bhcm4tf6gvy95fyotqxn8o8tfnuc6gqxw79hd0gc1rllfmkoi1wyis16869m0ux47h5x1otcjeege75qamywikwd6z1x89c',
                retries: 4656958307,
                size: 1085588785,
                timesFailed: 6420351677,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '9eiuge27ihuebiwrqyc9',
                scenario: 'g21k89u1uzr0b7qezifkue7lct6b4qyg06wn1wus5qv7l00yn1mb7ibguemg',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:13:12',
                executionMonitoringStartAt: '2020-07-21 15:30:47',
                executionMonitoringEndAt: '2020-07-21 16:25:27',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '62an76395ahaaow88z1kzbwylooembifl3pqygqs7r7onqe8ql1sgsyhtbzsite1buu56tmp48n4pl7xg4atpm85pcgibm5hhk1pc2ymmzrthfkbxvgoyxq88by5xfttgexjy6v85v7wqzq6dhuw16nlsyfpg4ng',
                flowComponent: 'n3xu13s5fqggqtmb7k6uc4vp7th61xlgcut5n2y6xdb40hpdmcy45wb06x8bzhywl2tkanvgl4zwvd4awux3btoms4w57al4fnw0atsq4lhbai4p9simdfpkmddbkv8wceeihys4kmbgdwnog6nzvmk2p2e98rxb',
                flowInterfaceName: 'xxie1mnpjydgp89ck1r08gj85aete2qm7hoqtlwzq58dbdoly4695lr1fzgsj78mxns822bf95tf0cg29klw81zhlc9gonkxd472zsqmqu21iufpdiqxn0v84ex7fcyn3obo63xlgylatwot2nryrgjfg5den27s',
                flowInterfaceNamespace: 'zvwv79dlodcwvkyx8ad29540gine0ooa88ba0nm7wfa5t7m5hlzh16mh47cx10q9ur0wt1256klkkrxtclkds75ufets9l7hufzvxs58b2otcubjmddlyk36otngddrz0jbd4kpzpduw4lqglvgdwwchuvmfs1ms',
                status: 'SUCCESS',
                detail: 'Qui velit saepe beatae quis ea asperiores. Enim velit est. Harum neque dolor est necessitatibus deserunt ut tempora repellat.',
                example: '5u11mktyjuf1m986dw837o4isst9m0ju6ji8ri93qsgji3y7yqyik2a95vc8fxjsca9olcm97zgthn0lys3pabhh8j1n370wa6l27au7vgh5c49mcbgymgpjb2sqbsqoc6tmmallb1dabtd6qktkd6kzvm6pp7ld',
                startTimeAt: '2020-07-21 04:44:17',
                direction: 'jutnszqbkjpod70d831a',
                errorCategory: 'us3ss2d0yofje1ddquo8j3k6zqo6dj7jtv4sjml4aak4judf30eqvxcurmm611re9ygks9o93qq3weciief1rahxc9gfaautx7q67496rr8s824d1i2ukkt40h6nuxya53kggeqipx0q9nru714h5jbqxh672wsm',
                errorCode: 'w3dlg3jyf03yzr6t5v0t',
                errorLabel: '3t2q38jo9v3uw7o6ahx9h2nfzmmhkhktdwzlt0gfo8v105difzuuijfzns073ijmvc57jd929taxxn6g0g6d0fg4qay57rx1gpkmhkzmejurjvt8nkc7k656gz6khbqd4si017l8y183opw1hxxmnsk6pc0erkev',
                node: 25420893384,
                protocol: 'f57c64a22qtm1rta0t2z',
                qualityOfService: '2f8nji8j6vauonr2a5kd',
                receiverParty: 'bbpl22ek7h6o4dwojen22c9n83gtsh7xkf7k8ke52y4mdjymps0tv2e52i8fpxs2060uqq9e1v48yuud5aycist2i19a7cvb3lasgk0sysjd822whosild56hcl6upu7puydusgjk6j1li603s45huho1ny93298',
                receiverComponent: 'gh9ac34a7vlqknwh2nqau70p2ucnc1n84h5gnjhff4jm4o9p2vguv55oj1fumjm6ud65r6bju4l3qdjz2i1etgzpwikcuq04qdya3v4ix90p6tp48bxr8ng98hfu6s7t8kuxalonjyqy5lhw1hy9a9em8xgs0s2y',
                receiverInterface: 'y4rvlpn5vlb2tin8zpecm4ll75zbq8lnrqqwozypg5hk3b0ib4rnq9mzrf3mo614q2z3ug325z3v9x7v4bybqtrj2tpgkyi7u73qn9mwrq528sl7wwhdcevmpscq6k9bm9h7p9zqcnqcw71wfcev8nfph4v9bddj',
                receiverInterfaceNamespace: 'sv11te6afj2lizs3tfa8e5kolfwbtnhzaz7z3syt5p50c4t178xiua1bc6tfmkx6uil1l6bkg8dqc547iwxmu90xjd53xtvn985xypogfthyhvs5hz746tezl0fslmik6l5evac55tasut4kqsyzrbouxc1ddqs9',
                retries: 6226250228,
                size: 5877822624,
                timesFailed: 7513775334,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'fio7luyiys8ew8hgcotb',
                scenario: 'pg0ls0nrkk4lw1r7izwetdv9ozla0m668e1lprd7novi768vrkamu66xmnil',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:13:07',
                executionMonitoringStartAt: '2020-07-21 23:31:46',
                executionMonitoringEndAt: '2020-07-21 23:55:44',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'veduvmnzard2x9pl1wjqiz9unf1quojer7s48cpej8q6mm3nqbbjfltnxg2nfexwzia8k3ibdtqld0cfjebhazftxolkgieeqm0hf94akew5xeuw0r7otxgx8sthhns45uzqn5jay16bs0098wo2nnwli8ol3pt2',
                flowComponent: 'oveu14fdt71yhp6xbhfo5ucrk13kunw0lgz8wkfag8n4ol3rkja6yvbgfjvogpd7w8q9xwjidayftioaff47wue3tqpv10zirpduy13ttb84340b1jjpdh4u4z4agyl2d03t7t3p99zo5up5ip9ubuzlltw9j1q2',
                flowInterfaceName: 'vg2c94jpx93ukssmd7rzpmdgfppybddx7ixxdf2n5oinybyc77j8ahhykixtc1a3gulhehpo8w97ciddaympz2fo599fw3nfhbxfl1bzl0z7qu1w29a8p7c8uo4tzwdyjawzx9pavuxmq2xo8di180vz00p3njh8',
                flowInterfaceNamespace: 'vefw0jvu3snf5tysthawgg8gosd7crp0mu845cohz9fe9es8xyatk2y41ygrs946lp90qijvaavgb2yh1t314wcuv0p36xygxnq48a1jl4cwv1uxds8ubd89k5lfu5ycx4lt4v73zmsy27p38kngalgm78itj19q',
                status: 'ERROR',
                detail: 'Ratione et iste veritatis sint similique minima. Accusantium qui reiciendis pariatur sequi debitis. Est possimus laboriosam. Vel est qui. Enim deserunt molestiae natus quidem.',
                example: 'h31bxw1qxizusbbl5dn30deg8015h8ff91gwmynfcorpu86x79uxfm8kzslert7y8orwbolr0r563t13anf0z73hnbu85ma5fcsmzuto94fhdqih7o4eg3tfflgpznddtrmv20be6km8d2zetz6w61ksu7xep3av',
                startTimeAt: '2020-07-21 09:13:11',
                direction: 'dnb4zxpycym8hzdfldmf',
                errorCategory: 'rmtum9owbtxz1vnpw90ftyxtu9d5p89i84t19xve1v06klvw3wtj1zmzyz0pvyoh5cu8i76nnc1bzx4v9yob5an7duvimirbey3fl60pafores5buz5lldb125edu5q6aifpg0vhaiyfwcrggcojee0ey9qtnfd4',
                errorCode: 'nk2jc7cjp5a53p74b1mo',
                errorLabel: '72szldsrertdiuaa0wfd0757aut6b5ou8rr8pmxyiywch1ys1er820pyz9n8ylk1tsu76dk50786lkq6lx4yawspq0h267dmw6gx53ncsjo10gxokx9vyhub6dkmbkd5fy6cu61csnwoxupt3gbtcxybee0fkyx1',
                node: 5572850290,
                protocol: '84s3ifzkj188wid1iuf3g',
                qualityOfService: 'koue7z6wclsbjs9g3zrs',
                receiverParty: '6wctd6gvem1fexgfodrhu88r2xg2zer0g0nn6a7a6x82zoxd2g9bxfct2njnhq7lmnz6zmlqzju8eymow5sf89213e6ouga0gp0tlc7kqnil5j61tbmt8i4d6nbpidexotb6l29u6sagrb9pe39mdi27pm1mwkvf',
                receiverComponent: 'ebkxkssz91iqucavjxpet64fwu7shoo2sqdgfnsmg3l178d0aym8dwfkeaiporf3gjkbt49idt2a2idr4m3fzv56th4y3v2124dsia5g1109s6f53pci5oczohad27i63nxiiazhmhntga7tu2ymughzi7sise9n',
                receiverInterface: 'ntv7mfugsyrie5tybd8bo4mkvrub55at6xj79xcm50qume69hdzjes56vpj1jdm98qz3lfbyjz89agphnyihhugpg5mwlek85k3mnnxfqro01hs4zalu625awie72cx2uk8yk0p5ucvec211t2tdemyhan1o21js',
                receiverInterfaceNamespace: 'x1owvc4xy4g6j72rqrc1559wxbnu67qwysvqmitq9c0ng06ya0550nchronj8mjr2yogpd1z3va32g7cqedirh95rnfdc6ejvk2oh0gftopvjbme0tjygj7zm2omzfmay2egm0cogbye96vfla50tbjhigvcy97d',
                retries: 3524235321,
                size: 2760946358,
                timesFailed: 2460637002,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'h6qtnuno18jkza1yc6br',
                scenario: 'cofdyjut73wbulxyvjf4m103e6n60tg2fy01o8ffvk37vkekzfoxeemnfn17',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:32:14',
                executionMonitoringStartAt: '2020-07-21 15:35:33',
                executionMonitoringEndAt: '2020-07-21 23:19:27',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'somacpodn0rayqctyotyqagtipwa1z6jhzytt7tojihtto6q3aqf19yhw2yizcn49la4hq3p2544185txgamow2a0i5qqoyfprjjle13rpuax7x3ky7jvufzepulb5k368zw4w6gb2jx0umnarke9nva9rzvtjvc',
                flowComponent: '514wg9pq2mb2i4rn9fxf3tf37c4zvt6hgjy3bxkttq2kcjq1txnk1mha0x9ncla2dilwr0k61nytbtxu8qhctgew31n6wggm3lcpe02hrupsg6avu8lt4vu1ggnkt4lg3i1em09lgjugzag6dhf9m9rafnfr2mp4',
                flowInterfaceName: 'bgvtif86bf9v9tjk3hbsgr03c6qrviq5fxmsbhinhti9r93id9pdx08v8c7sxeqce5y91k13qxmwwd3rsgvz7ukk2zljiguzyto6krvs8i2r3vlflj404cok90lblelkcbx943itpmclx0o2dajucamwvevhjeri',
                flowInterfaceNamespace: '4a7a7muoxx0znksls0f6wq5scruxuhn37gnhlji8aheybqoy3re4jyt4xnx3mormoqxntbilya2sp0zt816elcdnnc7em12xaegq8xfk4p9zhvp9v9huno0wggjz3ehu5qonjqaz9p8ehmttabkkammg8f68bd6g',
                status: 'CANCELLED',
                detail: 'Veritatis voluptas ipsam quia voluptatem saepe itaque praesentium assumenda. Cum eligendi sed molestias voluptatem et reiciendis dolorem. Vero voluptates exercitationem. Dolores nulla quos voluptas cumque eligendi et est.',
                example: 'ikiiza5wueeaf23tt2v7vj9uj3lmtyl3ahrji56fh3m2hzul1a7tv2jkfvfogje9ysxuesevvu28v81m2xe0e1plia2batim4o97w6qynkg774tbgybyx7zxc73sofifj4zn6752nekjim7kjzvy3avnpe8qr22f',
                startTimeAt: '2020-07-21 01:45:27',
                direction: 'ohyyivrtcyzk40u8ot06',
                errorCategory: 'tocyt6qw8spapy39o9t1eztg0c220tbn4du45h4jfzvb7wp8z6kjn5avif1ihriwqkk9sehgqskxnhnm79shf7kki5estdamtwshu4cvo5vm90sqj2potzk6o2w50lu3sfmy08mdc3da1mgvnqn8wzlvljipar3w',
                errorCode: 'zwftz6b64die612qyfl7',
                errorLabel: 'izyed58bhtjatfxxddm1kt6wnra4mxbaethzkhwr704wyb5hvr604ehrk7wn67c42si9x60slq100funpdcpv15ytz4c0593jad03zi88k35n7ukvz9aftu3ewm0eet288lvr08zu73d4p13qneh5aqpg7dwuuyz',
                node: 4449788435,
                protocol: 'w2fyz75mxa8wta9ddq34',
                qualityOfService: 'a5iq12yieluir5wu4dexn',
                receiverParty: '4cc5rjw0q3cj0q8d7geddge5mq2dzhumenu305vsxelblgufntvx8iitddyyxn829cth1lyt8oop9i1v7knwh98yxkbyekgu0wenx2nso9lcl1z9uiuxrbk2r4nl8gzp19mhvb1yx6mmenjmvazmttvt5vd6mcl4',
                receiverComponent: 'di8sbii093k3p47i2hl02atl4tj22be5wfv60hsxppq8s7yn0xjstmzzgpen9imjf8u2hnyqchnw11hf18mskf7vt41fcs39tqrphee1opbitom1h5yhvtwyxswoqq71e6y4bc3e8tux9nhmcohesfatwyjimt0z',
                receiverInterface: 'i96qyblbtx2p9qqwl9hmrxaexr9dah0eszr6ey6p9llba2vw9i5d9tytbvip83jftds4lr5jihu6r3svykxscn9ssr7htmu1ksab6q700yoqvkrykulo3hdj331m51wgpzp9djdm3lnytebndxl53ucaajb44405',
                receiverInterfaceNamespace: 'ntuylhxxcyibd4ow287o46puoyibnaz7ojw4fsw2ukb78661tn1go58joqhomxzy6cdnbrp2a3rya37pl8xmjn8geyb949qrozvd6e1l96jz97jf8xvben4h9gms9s737ipke1m7n31z7xfd3tjxrd8qlomxvi5h',
                retries: 7675034810,
                size: 9520679784,
                timesFailed: 4375337084,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '5zuzvbtfxgcm5w1o9mj9',
                scenario: 'k39dxzi7fdmm2xgtkknycrp99krsj6vdue2t82avnztvoss7skwwc5p823mg',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:56:47',
                executionMonitoringStartAt: '2020-07-21 04:41:09',
                executionMonitoringEndAt: '2020-07-21 05:52:12',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'rc96joaq6qzs6fvno6c2kn20xt0marz1l5yxhjx228k10wr8y83mo7c3lfqfez9vjlzm7luglvwtdan5mxh6zrvjbaimcjrx2j22vgf7hc2nuch6bf6vvaan9pv0xzx81xb05mpnjqsv9w89eipprx6j3zlnl40x',
                flowComponent: 'tp954k3i2f8ors6fp63fbe0e3j8ky2fo0xrhlzz9s6xl4aus6i9n6ituajvcm58wj8id9ifegt7rrt3jey8kk71hkr14v7gbpz3jdj3sscqatdvhfkg5qhgq4cphmnsl19xs4kmdf6799my2gekz0k0qltt9n8mc',
                flowInterfaceName: 'bwou2he6718udao8gigeydqvofntsqjexif9p04gbjat2bycio6vr5xnzt939wpaxux09tiesiqxviec8pj83aozm8bnj2pmnh1m19hnesrc1ka5y4s8bvl9r11uwo7toxcly8wqv40ktpp6r53xz2w6g4n22hmk',
                flowInterfaceNamespace: 'etk6xq2omzw09whrl4t6jb1t17zs0zauprv6gtz1pzlpu4y5p5t5f9jin5p8nerwx837n3qpw9rm6fyf0s13w2ph4y1t0n7b3ivldnyf4l785e3x9h6xi2f02jgq868vfl7edx62smxl5o6bqro4pda5pk98kjf2',
                status: 'ERROR',
                detail: 'Sed incidunt harum quidem sit et rerum fuga consectetur est. Quo iusto iste aut ab excepturi aliquam at quidem. Placeat doloremque ex quisquam iure sed.',
                example: '0irkkcqt68iixeg34kvv08nigwwijdyia36nzbzx53v99u81ad44fec17fjzvjthsyari9m9nsaxzss8wim3t2ql97yoa8nki25iw5mh6rcc7cjm7ugdepygdcn5p2pxn45s6s5tw2zofd9a3sxiu7t7g32nvbeh',
                startTimeAt: '2020-07-21 10:00:09',
                direction: 'do8fpbem86rm1bwr4nzq',
                errorCategory: 'ejc1irdgn6e129tlzh1h5fofixpy5alhso4aubibtib53bv7qq6uyilx0qf2i4xsmdyz31yqa8ezh8ibjn5oj69kx6t800whd41kssb48lpre7gpi6nvs22t79wfv1fonj02472jqkqmj0hgd10nnhxh7xbif6xb',
                errorCode: 'pb9mbeq2p5bml4vdctb5',
                errorLabel: 'ocqm5f928pzzdrrzgaeywp5i5og4srmqe9sjwk9vwt5pvsmytudx0mcol0hzg422jqikizm04xj19oz9vzngzbr4z1sk1defja8sq9scjq54y8s2s0ke4ors1qggpc4orzpxc4ghl3cigpwgax7z5e731k6pxapk',
                node: 7291999781,
                protocol: 'w0l1w6yqyveuq7n7aiwd',
                qualityOfService: 'o9ekojkdf6juh60d5g7f',
                receiverParty: '2ffku95tkd6lywjroj3z7gsc98xmk7ylyvkvu9txfhvm6bfe3mxyijzibbvkedc7bsn83vhn47wkf0hu203uqrkfqs40d8tp0ug0q5n5yg8icamrvsas2zf9bdg8bdvmmfi7tlak310on89x2ewpog5ksytsh3f8p',
                receiverComponent: 'inje2w37qe87dn42j10eo0avdc9y8jy2api1vei0cr27681ymm667lzfoo9uaob876gu0d8779s9b6640aadxa3g6ubrui0ckh8qm4vp6laa90w3ezt00ea4tt06smnl9f71t89hdo3keqkijm66j9clbjsbxd4v',
                receiverInterface: '263xlbli2yoewdrw63a920tldxi5l24vzq3i13kaeeez5tsh15wtbjxkjk8vbiy0wkqy3w39mp76ksvlybpxz7z108sy9yi5zglqcfwx47t98gp0izzaclppkfwao37m8m2t6f30bbjgla3hxlw91f8ddyccij16',
                receiverInterfaceNamespace: 'n3ztwznluu276lwgp5gosyu2ilaaqzi9yh0pzxltfsqgf0dh4bu770ohrer499kty7ntl2u4l7rjatxj16y0bdmqlkjuokn1izvpl1ym3mmmcjnsw3d8odogbn6m8ydpdbs59kk80iltblzbo95xi70yt9hpe2mw',
                retries: 7804401177,
                size: 4444996077,
                timesFailed: 7973831503,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'tn1ju74p5i03pi9i0kui',
                scenario: 'r7uu301v9gxg1rtkv3oyhp2oflribderzwkaesj4dqkxh7auu8u6bwkbs4yz',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:34:20',
                executionMonitoringStartAt: '2020-07-21 17:48:57',
                executionMonitoringEndAt: '2020-07-22 00:02:41',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '5pzwcp00p24v5hmksi9gl8dmflqsaoaswxplvff89jruvhq85axb7bx3v4qbxwsrv05c8u6hxdg8fkxcttiygxo630e432j9l2flts2rpinz3ta00szao1ewgao9navrwg21cieu74c876z94fk0hfbc6sbbfxqb',
                flowComponent: 'yjhv0v2up78zbtgayg27lv2mrfkscdwtqul9gzb1uy12vhrcwktj6el4c3vlpus0f4gf6jzeykqh1aio69kjs0yvb3vp9emxzixsz61c3vscco589b271317hnj4xrvvkmw0exumpdfxzc7l19lgvt33sk22qht7',
                flowInterfaceName: 'jt6iijs852ssfqhs76d3vystxc4e53sof21exwk4rpwv95s75zsa42d1qi4tl2illegn6kabq2jg9ypi32fnhzkxvx1fecbp39z9xzw5yjmk22reu4foq5nsumk25o6ff7h7ro3zsvtwe9ingdl0qnsc3o3lmgym',
                flowInterfaceNamespace: 'j0rb9m81v0r13gsu9nhm9w2lhgypk47rsmf8i3jbu1mpglswiuf9tjt6ck0ro4a0mkckoqg3mmtgxin73hvqhcxamb4eh08aawz15ox3h8xszvrpwx1hph79kyacz1uo4jr3z2fb1goenbwqu94w105i8as5w726',
                status: 'SUCCESS',
                detail: 'Pariatur laboriosam esse et voluptatem qui. Minima et excepturi qui ut similique vel dolores. Voluptatum nulla sunt suscipit vel dolor autem cumque eum. Sit corporis in iste aut illo architecto culpa porro. Nostrum dolore et ut ut officiis et laboriosam. Voluptates amet incidunt odio et quod ea nam ut neque.',
                example: 'xnrzbjh3unak0g9jceiqnqpbi3rqp85usr343grpz3hkc46kdr7qncswxnuivslkt86zutfrxj2ndjzseqgwaj8pxgbzusulupvil0cyj99s7udye2bs5pbwtstr4mkdo92d1zuvuifu3dph2yvrap0sckm2qjqv',
                startTimeAt: '2020-07-21 16:30:14',
                direction: 'hpk73bad2wdk793f6vtp',
                errorCategory: 'wk9vek45auxrhq9xym8awjhr4k013uj3ault8vzs1ef17lgoxoh9wdv6p1668szd2bbmjzbfo3lc5ocf3i3mmihod0ml55ea1qr9pqiazun7k8tae5bwp5795go0cuacddp2l9eh0t6tc5hv1566q8ds547i50p4',
                errorCode: 'imi3doc57u2yh7z1atlf',
                errorLabel: 'you8jgegwnnt4n59fmgakpja28bbf6np2ox5g0v1v2fxps90ymhvieiglam6zakpvzpwfrdpszqb38y125lr460g1fddxni1ds55js08lne98v0k453aymkjn6oodcls3viiqqivx0xv1bbi4804pa46gn0xl7vk',
                node: 8726923634,
                protocol: 'gf6jtnpwux9zi5ig2li9',
                qualityOfService: 'f4jh2c45ixewuo2v4nvz',
                receiverParty: 'skwifrgoysiij3esr2hqiq1pbnarvkypvuqnd0x05hmh7ehuw72oxpfwswwhj0gnqtdhri5cyatl9y6iex1w5bffd2noi755emhdupth2x07xdzdh3hseac3a0z36mz04yjgpit6gge5t6nb3m4lwyn0kauhwtru',
                receiverComponent: 'rojlkocrwizavylx23gww7ygenm0kd7dkctnef0c4wpqp2q16mlks0pbhyjcstm45murzf5ua3qlmnj8tuhk6u8f8jl1t7owunnlzt2y565b2xugue3xx7oaivusiqs7dltbu9k77bhnkm09rmoyjex1fq1p0seu0',
                receiverInterface: '51sud7n5uvsek79xcq1okcp0cixom6uxuvwujahaoyvfx2ygq13za70xxhzweui65l2n9i3j3f38gjrwypk6lry9s7do06fmwdl6y9sfxzms91j7hgcgo61qcetnnj2zjj5pnf2p7ih25ni3shy2byr1z1rryavh',
                receiverInterfaceNamespace: 'jckgulhajb9cndugq87l88pw375058t2pkt57l5yre7r2tjz2fb57xfber0jexf7nn1qfnq4osgswhtu30bndo7noxn6qofhmjdbrin4czddhroh6ynyg9kthed1ha09vrby4cc4rbckcpt1ot00lciua9irgflk',
                retries: 8380945920,
                size: 4123968114,
                timesFailed: 3500881820,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'bfsc0cip0zqyj2vsuduj',
                scenario: '1uqbqkv96ypl3e83pzzwj6m298t187q72vevo29v2jgrjiqk2nuheftl7kab',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:46:25',
                executionMonitoringStartAt: '2020-07-21 20:33:21',
                executionMonitoringEndAt: '2020-07-21 17:55:48',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ln91ci36i24qkhkfqu9rmlowm1o5maz0lpj3gzyr3egdkuli4nez471eiz8ugtezomztls1sqjhnf332wu1yn63qknl35tlathiusc27jusbz1iwepepdm5ltf39h80u05lm1zyjy3pq5pcylhsb24n78rgn0lho',
                flowComponent: 'fymojla0f3jdieyqd1c77kh9oh62su7s310ptzds3k4h101khjxq044k7yis93k814ai3do4g3ujfw3h42aqq0lzs4p8a9834z579yqp2gdytu17a849dtew1s90jlwsvcrif5p83h3ojkrizzvx9ev81cwleix4',
                flowInterfaceName: 'd01orjr0sgv9uzr6j1rlu9bhzpgbybp37vz1rq4kh2tpmmps84wq4aje2dd861m58bthb5vfiluviq1p2bd42w8c2oe248a4x38sihecv49ajlml0xah9yp18aqozubw1mlcjyp8o6005aqc6lenrxyfnvpyfmsc',
                flowInterfaceNamespace: 'gvxi7s0d0m8brhr3mo084n22ytksgle4fiisuc1roznfgek8ku8ictjew82j2mu6awk6nrgz1g1gbpjfwl4mts47ohjdantbuvjwyu6tfhd7j73lp3qw7hdx3l1okouy3q103zra4593khoazl6b5jdsckgzlqy9',
                status: 'SUCCESS',
                detail: 'Adipisci quia suscipit qui a dolore ipsum sequi ipsum soluta. Tempore quaerat iure odio laudantium ut quia error voluptas. Perspiciatis explicabo commodi placeat quo vitae. Debitis exercitationem sit omnis ea dolor sed aut. Quasi omnis in odit et laudantium aperiam. Sunt placeat culpa voluptatem doloremque rerum voluptatem explicabo.',
                example: 'ctdimb7ibttl2trblub2t94odbc0o7ka9jatp036ruwcnwrbhpc5wxqi8jjwyhrlm6z66ysr5mb60undwg64uytdv5vuoknbiw7plewj7202a2ujpwn00dbglop6yf37j933mep56w0re5102gsx3dmsukqzf05h',
                startTimeAt: '2020-07-21 03:11:17',
                direction: 'wcwrcd7cm3kirrovtw3y',
                errorCategory: 'vmez3kdftpgdrd6s30t77pir1o479m9zzdcguzevyotn02wd9gimpmvudru9775us876dqq9kgzzear3qw6l0yjkrzmjamajcb92i6ibkvorza31092y59rsiy8pn6mlnl6bblkg06zol1pdmyg80ukl677uqobt',
                errorCode: 'a87616vi1l6ncnsfjv4z',
                errorLabel: '47egnm39ed9gvlkszc3ogg6ik9rkzkskl1xie7wx8ggryo9ye0e2r9bncw3tfg1hc9fv9ehusjuy5usk8fftt2dztkj36c0iznbmzsxv8errofy4cdf83iejdpu3zi49yeikjdg5ocrycmytuptyb39tj5rl49kd',
                node: 7557079236,
                protocol: 'mtrlst1e04h7j9nq2edd',
                qualityOfService: '50tyqpdda49jfzulvinl',
                receiverParty: '4q3rjeyq593p16yokgqx3nrpt65w626jecce8ihurpphgbttbww8vand9gn57d5sto8eqjqhj18u04vjog9xtq3liqm4d65lzl9heh18gwzqffypve9ooxc6ns0i6idg3xcbpayt4p07zuyp00m2inuqn3yadz08',
                receiverComponent: 'jclhlrvn1cxo7z0mq53lle88k40fsyjigradgydgdrqjrzvmz8fei8kamfjrfw9me9esd8mx9pfcji3zrg15564xe7pmft9u9z989j8d8zj0dn25e3hoo12olftq6kd9pisbvgiqwrxb2q8gqc4drplcer4u823f',
                receiverInterface: '6cq5v6bk0nvtrrfpb8uxu30v7ix24tdlsw2hqfb6lau05lgoz64xn55mfi3jzv6pwwbq17aold7rjja09rbpogqkh5iei4esk096i9mt24dt0yd3b657wdr7sofjf9soapacq8gh4dirm0uvnc68utw0k8ratb9pl',
                receiverInterfaceNamespace: '1eotr9ypmm6aalzesulwwktwla4zizbwnwwnau69kxan88bvj25jcnvvwmlo8v7vrms1f24ys7ieumliathvexai3t5ygvl3fcb0d48vbtyg0z7kwxbmqsyqasej2hzo3knrm1c8gk2bt7pzygxhdja7aem3wf9f',
                retries: 2231570584,
                size: 5475951208,
                timesFailed: 8829644394,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'm8vnful5qvjhr5zbsp52',
                scenario: 'n21cix90ohw6pk6dee21uyhkj9p8s0kjxx8fiqnrcynr2n9vnoj6oyn0yi8f',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:42:27',
                executionMonitoringStartAt: '2020-07-21 11:20:48',
                executionMonitoringEndAt: '2020-07-21 06:30:19',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '79b0k9jjm1d21c3rm80xrqq8oyqev24xxcmemyc12n77ftsps53ud45r4lj4dnas2xy3efzd1xghossa6alpgk7m9r2flv4i6ln3r305lln6njx0jtc94ewp14aib53t37bzt7tjo5ppkwz0azlcg2vjwvekw21s',
                flowComponent: '3r97fq1nw694e1hh18z52cfw4qdc2eciv5j8zsw6u677do8nfa7e0ezgn47zfgk1r9m5ii4c5c8rn2v61yavapoxeu8nlqf314r447tjrza76p2l7m43y4f7l8l1rmd85iowp7rga0pbnfzpzxxwsa2x4sf2vbtv',
                flowInterfaceName: 't2a0i8dv1267v2dhiwvsoc3wj993a042p90z841qxg7681nj8v0e3d4wimza6mmiqw0uvfdxd7cxfwt6fof4ewvozuhx1wtbgguujb5icae0abm8fqqffom73ob9i8jfh3c17pnhh91oyxkulszrqo3fkl17hvpp',
                flowInterfaceNamespace: 'ln3juhx2bdb97l1xk9zk1tpw92bpde66s64w2n4de9thtqh3umdfa1q8bqi0qidsc1ke11v6plphf20clsxhrqf6ecxnb2z1vj80jwtojnrlxbji1i6z62d0sivztuxoc769q1ob9utgiyqm2bevlb62u5xfiy8f',
                status: 'SUCCESS',
                detail: 'Necessitatibus occaecati dolor quisquam occaecati voluptas magnam. Provident eum dolores animi optio dolores id accusamus et. In quo accusantium officia. Est iusto velit aperiam nulla quis deserunt veniam ut similique. Laudantium facere et.',
                example: 'fuhf8s7eo29nknmimvm2uaoh8zqa3c5ze5wsvqi52c4a1l81g402w7lb3qox9d65co45iybvfv0irh50wm8ne7m939jnr56f87e7cjnlnlakj7jxidxczlzqf7qamjwapma3szxkdrbx3vaspsr43sn9aiy6k15n',
                startTimeAt: '2020-07-21 04:28:08',
                direction: 'ra4v7zi21gbzqgwd40dv',
                errorCategory: 'tls5nnjhdndsirm1h46tknlsl5ye95vb9r11us30mpa8w22qm6humgf9lsui868yf8dd28b8wzcde2x5tlkn1fcvyghlror5pleh8aot7m8fs5abcikshvk5ikfhonnguunhssaaupggk22lftagrh97y7kpow5l',
                errorCode: '9jnlppuz7yyd7y5n9d79',
                errorLabel: '9fv4yucp169flfx9y59lpxjkgubof84l0l9n80x24zkgnqcj4ivqkrgp7ak058t7fohtnbhm6xnsvcxv0uirac9i5nwsv866y1p43kiqd6tccskq56wx8sm5kycjidraprlsldkxll9sh3m1p9q0i99z9bm8709z',
                node: 3610094761,
                protocol: 'qyyaiq0mp32g5y3lnsuy',
                qualityOfService: '4273ueeb1cu2jf308vmb',
                receiverParty: 'ms7gowhhsf1mvjr29t5nqbozwbbfklvpbzio6xjyt8anp1xo6dhezmfb18bx90q1q7cnydgt19nx9f4301i1oir15488orbpukeisyktpr57f434ocjezjf9g13h8u3mn0jqvv12v01h7v0rgq7qdzndt0s7cv24',
                receiverComponent: 'd4vzudottzxki8lzqn8msk1qf84lpgtyz4whwtof6nlect9vwhzygfr264wz4n75zk8kd1f1tgriw8qxzont7uvw3d97jg4e37mog9gev4ce7nqinxnuku2qfyofv0ogsc1ot399qiwo7nspjdfmyv3qt8zgbihz',
                receiverInterface: '44ksrb3pq56e7hiui03g8b15thqvpqjhrcne6uikjs7yso9g5kvv2nv7nnozbdjvvmilqa2nh26drkftqxykgjifzbaglxvt5yzgclh9yqzv736557lupjn5qgc68tou7o0c8x46cgaq98iy9oknjrvmohwcyoxn',
                receiverInterfaceNamespace: 'einfc7jm60wmomt2jwsar3u8mjacppb7r73wgt61eisivp8r956z0kzw40qumrg2u0c7ju6ud7vfhpvb0qmqw1xaupbw7fg5pl8hdyro6tcigjk5j0ykx0dtvjmbsfoate83tirtzdhobga1vlxph05pgjoptbrta',
                retries: 5169213127,
                size: 4587130926,
                timesFailed: 5546604529,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '1i5v0eo5qso8rlin7t48',
                scenario: 'n7s82hhe71p377rhahgyyllhcl38858shqsveix0l2xcv66fh33a4w7biwqd',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:51:30',
                executionMonitoringStartAt: '2020-07-21 15:51:34',
                executionMonitoringEndAt: '2020-07-21 16:09:04',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '82bds37dmn6nujwo8ju0ra7e158n088h3kb4ievmeh5uud0nkgrlvzqvm0izjpqtha2h8gj0aeyg3xafxi80ua9edypq0fv0e4d1v490pdou9j4rkga5i5v2ta61rplw9scqe1swmbjrfhpk0q6j40faswk1dfj1',
                flowComponent: 'u95gd2ynjuz37q4uurp1v53dg5r0xnaer7qhmy0dje5ve8mdkthd7r94jxvhqctfophymj8zi1zn0t2lvrhviz3nglyu1m6mg95w5j429xdug2zvcavutr27228g8uoxszmal7nzuc83wz36iojv8mjvxvm2q8os',
                flowInterfaceName: 'wo7joa3sa97wls8ycto7ys7t24y6s9nn4qyhr9uiuy01f0z8vhwfcnnf6ou2dco0onq8pry0jc8oa3l2maww600e6xusvlvmxomn5h2dsilf4m71a9jpgldp0l8rrv3gzckii3q51whrucy6cimlcv9dk3tgrtt9',
                flowInterfaceNamespace: 'eickighs3lramlk5uzhwd0dlykkfc2dbcf7y0tvxu7nor0esl2q7lwoqmrilhw4ynq4hclbvndjhdlydbyxcmcmqv31cu68llmrroj696z6oxlc0d2aoxnzs1q5v8ji4oaci9fs7b3t208oqjwgw4yuc3uqucx35',
                status: 'SUCCESS',
                detail: 'Velit nisi assumenda nemo sint. Deserunt ut est officia aliquam debitis. Odio dolor eligendi et qui quam enim nisi veniam. Magni velit inventore eum omnis qui et provident possimus. Ducimus id a vel quisquam exercitationem ut.',
                example: 'x8z055o400pgko9bwgptej42hqosf1q2xmrmx9easiv3umyrn1dzkwc5tml6wjuayd1lp05nyq7w6p8woz1pvyw07lwqqrdnhtp0jd7qtpq0q9ycbk9lpe8wp7lxpwpddgc593taggij4fn01a1awvtvbhqn5s0i',
                startTimeAt: '2020-07-21 05:58:25',
                direction: 'i1wj4nb6gminxw7zfsg4',
                errorCategory: 'j7cgd4i5sx82pukaqld9ljgha7y8v0e4xaiya0hl6us9rlv8xqc5kl9ke6033za2yuu926ltwil0be9i6rw95hsavj4jiioagohbhx1rrufjoqevy879sif5o4k3cnbcmgg3fwufd5xapf5wegwbed7j9fvtn8sx',
                errorCode: '2n6178rqaedemfiez2p5',
                errorLabel: 'va371auohnwyrm3yeej7hmolk5lbww29nty9ecevqdoqafni1bkkqrvmrp29ryezjawz3vdxtrm477g9nq3uvixf3bj3le5230ubggdquoata0ptvuqygsey8cn837x69k1e1s10ivkxvgijt1k3yws4asov5miy',
                node: 7743532140,
                protocol: 'gi1fv1lyhd2g3u7vmnzb',
                qualityOfService: 'zfd7acb7sp1plo673f1e',
                receiverParty: 'szflnsvfdkgf481c0khjzng0ujc1lftnh846z535k3cpzug3cs2w00d5m8ibgdskx2fwfk2xsdqztv80rq1ne6kvxrlsgb6w4k2kq104p1vrha000h2q5s5tfln277m3eyark7u12k733koivk45fs2mdiq01103',
                receiverComponent: '9xlwrlzuu7ipr04eh2ife4871iyk1hu6r5jg118wjwbomt0j462sbaobvfi6osy498affm23i7uoycs0ca6sndlr2qykvutrgrj535m8eh9mwfktvybies8rnmlewk0x3835iboh7itrs3xxi4sdr8jwe0e4wsgc',
                receiverInterface: 'ygvxwgsfr93ngegh1r6e0apfhasast3e2h8u14lkyoypwlbnnefx88ga5kmjd99hme9gh3y7072atou0qb0urz0ekknpt4l7avg6xo748dkz2wg10airf0hgtaymzpwuxqqzzysvjk26f1mva6gimysp3a4ckf0e',
                receiverInterfaceNamespace: '6ctjdb5x4tnejwov7szitu71tx3ug4a01fkezpgwixg4dc3w8hnpnkzjkzztot8vld72jl8xxl79o1jgvniib4jn8q38x873hmbvmgyz5gx0r2ky69w37ph3qatht106zbn2qg2yxenyifr85ddekrlwd3a21qs6',
                retries: 14894297460,
                size: 1454236115,
                timesFailed: 4522993988,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '7ft7ksa0i0egacuotbpj',
                scenario: '24dapao0uir0vtzl3ijbs08wht1btq4cb92b309iqzfw1h1ifeclfctel2u1',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:19:31',
                executionMonitoringStartAt: '2020-07-21 21:51:12',
                executionMonitoringEndAt: '2020-07-21 11:04:52',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ezcklxf5xgr0bwfpdo3fgz3nsyxjsc7jtoc2u58x12v576c5ie1luu6sh1uyiwmo5b8if791sra5pvsq7jxskl1qs5phi0m1malkyzu3r83de1jucknmqheoqmr1zvtxgrsxhu3vjdr0cwt8xmxs7iljs7uaszys',
                flowComponent: 'g46zqzuo3sdkad827xed87chw1xoxh52w33fbed8b1j0hzpdh1uqs06ndxsxihnivreiq5wsircccec7dwu7wfy1dcq4bapdqtrlmcp3m5b1e5rchirfarhaqly1nw0o3xtviujlr3vmxpw5ynkeaem0vikpyrky',
                flowInterfaceName: 'co0wa0gkzz3cs5umjii14uy8apnqxunvadt3d48u9tzysi35rd33p4n1h6oe7g9jy1n9lgb5dfb2o5ribm5zl2n63td5zty6826vn1xth0mrmvxhkbgluh0p0ycxwra24j7twc44rym26tqlz4125pb6o8l09d5b',
                flowInterfaceNamespace: '49rm44x51idkzia1s9hkbedu86k2fnlikk2xkxl2ftcdwiy2n2n90tv3wcr8c1xzg20mbdflbrbxbi4tc3rx03q5kh099r8kq8msvdodpe5sr88oymdl8fmv6k6id1sn64erc6b2h2q3rgw6tkwiwc4adkelb4jt',
                status: 'HOLDING',
                detail: 'Eius officiis vero sit sed voluptatum. Quibusdam ullam iste. Voluptas porro non temporibus incidunt perspiciatis. Accusamus sequi suscipit consequuntur et ipsa quo ipsum. Et sed enim laborum temporibus sint.',
                example: '9omkhw4ncq8q4h77ocicr7dvzwo3idrb5di8mgpwpgihyb88w5mq6jvo9oi8h6f5gcm0h7sz3rjmt78msgbx23qjh9lz779oljswn3bnavhk6j3o8365m4jip83x2nfg2dtfjuu0z8s2agtb3thbligf2alq1fnt',
                startTimeAt: '2020-07-21 10:05:02',
                direction: 'qwjlhhy3mtlo27rjhz87',
                errorCategory: '8cezy9c8gu8r8aamcm95a3ksb9g49jpxz7j6numgbthtab5qymarkstcmpjc8tx86mlz7n7tumcpuex6dss67ddb604gvcwn9wjhe3n8a9t1j7wqvr72lf1shxkp77l17s784z6pfucgmdkufgfesl9apktibp0f',
                errorCode: 'n6j2khy86ianyi622xpx',
                errorLabel: 'njjzztd255w3m30axb8xiakmevpys0lewnkvi838kujp9u1a474k6fwwyaseqjuwalxd4fhjdgwssptyyzz3ppz5i0zsi42rmnp5jr5p2q5ls618znp3fisun3jijjvu9q40br19fj0ir0rwjbuuacm351bpvge7',
                node: 2592159439,
                protocol: 'sznkskoj7d8w90a4mzrh',
                qualityOfService: '5osfc4qjkfwadi5b9at0',
                receiverParty: 'auvo0fs1lcqf7j1h56at4nsrkshreonvievxcgkofg5ktki2e92n2yw5aa2zfzd1yyfbfclt0kxpz6889lcd0jjcqxcg53vwpq6gxbztord65lronl5s58crbpd97sc8cglzpklkg3r6cv0xrgmx6cfen4kn7qly',
                receiverComponent: '6oubiylp6c2msx027ld6eztm2l71ed9fpeap2xg6ixowu4c8m8qbdts7g8fpd8g28dd31rd3717u01zuszkzrjl8n17p80gnx0errmv0uvp8mljqw478nb5rnwfgq3p6f9baoku4n0vwmpuoddh6sfqf2gu22iw0',
                receiverInterface: '8w51jgj49hrkrtbn13ef0doc0sjsv0o4c60ut03ekc0fhhut6w4vir80gq8cilpjle81jlfbhw73m4hyknhr2imzp80vw343w04396ixsf8ulhwou3mr8wuk40h0xdzeqgwgkox21jza4uzuvgybq3xmcdudajjg',
                receiverInterfaceNamespace: '6eq7kizqtsvm1v1c2ub2a0tlq5zrmzf83zqrviq6ryupdfw2esl15f6xrip49uri7rldeygx0pi1ofqdlk2w3gndbfb76k8maj3hc076ehpcrxbjpughv4kqxeriwyj21mmh0ij1skx4dea9iry37tr0mb6tuoei',
                retries: 7786431706,
                size: 47139144524,
                timesFailed: 1970175745,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'yrz7jlue59e3s6xto2su',
                scenario: '04ll3lsdw89pnxptl72smfp9a3v70dlwdjfctdmp3eu6gvnnm6bp54wom2qy',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:28:34',
                executionMonitoringStartAt: '2020-07-21 05:20:48',
                executionMonitoringEndAt: '2020-07-21 03:03:38',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'od34wemxznvz5vbdbb60z0ggo8eedelhl995720zuvef0oofreo1472wjm04t0vrp4y5k2yx56kuraa19c7gybn1kdqq8ynuus4b4i3ah7tgug1d4xcc5c98ij4lx549f6x0l4ihkh5z6qkona7us0p0cu7db2ko',
                flowComponent: 'w6cpuydwvxco962aok9c4u72h0ttlroamzgt88nuzq8qo7uy7ft0mps9vbiav1906dxygm0yvgav68mzs3irehsfn9psehhvr55b0i56fgo35mtwyr7acoizgsndvs89dg9kj529kl9euylj3fqmeidj5y4c0nop',
                flowInterfaceName: '571gpdodhnm1qenmctxeiy844anrb80oxntrj87gjylk97gthir7bkjs6elfn64j9k7g9p2kscigz7usyrfade2ageu4op35z5o0ohdxtvocanc5p86pf300omn6iaw8d7edvh4vsetbl0r2nluol78hq4q7jwct',
                flowInterfaceNamespace: 'gwhwt4xzdcz8ldu8ez5ppawub6mjrbf7uxt6y3v2ht5il8zpf7wh2tf3s2i0gkhnp6w0wb6pszeybbac8a4rn6weq65v8ypfe6o1cxws39udc99inf33q1q1o1zcriy7kz30e28tul3idl30k4ajc1e6jr0qikoq',
                status: 'TO_BE_DELIVERED',
                detail: 'Et architecto unde. Voluptas harum perferendis. Voluptatem consequatur deleniti.',
                example: 'jgsg2bbbhs421y3praswxd2k5akzcagloz05xwcjccabp6svf6tx96pj290pilbbgewdkb06f32fm059xwaandwt6bor8x214c4tzc0yg1r14tm13nnmge9cf0y9g3wuw26z67f158ybi7er39m05ahq4whw9ury',
                startTimeAt: '2020-07-21 20:31:37',
                direction: '6hdhi70k1ssp6ixkdssu',
                errorCategory: '4s3m1e7wk4fno6ckzp0lxlc4wqwkzefwec81jz8d6j5tra95b79cpaiceg1rch9uh21iowout12esdxetspdpfgfkc7rmr34jnldy5tnvvupeqcgls798sc9xxai1y1k5cw2e5wfngqdu0319cqkot49vodv2t27',
                errorCode: '2k9copelg9vzucx6zdfr',
                errorLabel: '1h6uncq4ltn929uzfhcdog3ry4robyfm20lqj7yd74dbllzbtfzhue7riwznr1ggwn5u2z9u16px9n5sgeccxuk1nduh1mrqmlrcw4njovgy64juadg5qtu2zomlsmrx9npv8dz6v0yo7yjtsz106ujh0vicq5q0',
                node: 4501528886,
                protocol: '62oom878qq8tyr43frli',
                qualityOfService: 'fe3flkqwt53xp1v16bfx',
                receiverParty: 'at2kat32l51s12qjzxb1ru5g319ghvimqpzks8wpsvd60zdvi19sdggyig0noct00bqkz09oknixucoht8l0jzwacod6a9f5yaf852m7zcin916og5p7vjeqxvdbgj7j4ajcyha3juzzdwa1ruu7u0th1xrpkbwa',
                receiverComponent: '3ksd4tnm8h6g70wo97zr7g9yfxku7ep1dy7sxnfryht2qlyto8c27ubx1imkddzljm9ef722fzq8f2wceag0rajm9vu82i0i5o0p7gxtykd2hj8kejl040ub65i1dgxlarcnft740wd3qnmcp8ywy6189gn57mmo',
                receiverInterface: '1cxjzfrl04u4ure6rnb00xi06jyx4w0jtr9vglsxsshwtvoum5xy36yd3nc16urird9p5s74i2vcglty0mqpmber7f57t8u49ag1gfgihq6kt2gfi6j9qgjnyzyvugoh68ypw5anpd6te4jps24dejp9z16mt3xp',
                receiverInterfaceNamespace: 'zru43ba42d9qod4i4yskq4gfl7ov3ro23l02y1tlnkhyn0m2pyykkn3dmqf9tiphkjnslxoqp03oj3byr5wg7p2wtzk478enxxg0jiybww6ocxle1ug00g6r3x9692fe5q7f5m7z6igs1n1zbn0n1vl8245t4l6m',
                retries: 4673147004,
                size: 5337834114,
                timesFailed: 49364673364,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '7701b6t4vom67kgbj1hj',
                scenario: 'gv05ru9iy7cjh1plf49pv4p94gj3nrmvq1iexqrpg9y540ccisi2qxlcll9e',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:42:06',
                executionMonitoringStartAt: '2020-07-22 00:35:30',
                executionMonitoringEndAt: '2020-07-21 01:02:39',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'c8na176wr22a2f121ulx004vull9g5ciqod63sx9j95k9jm2pkd0rcht7wuca4l68x2ylya2pb8jgavmt8qnbniewq48a2qqid7pof1rd3wcecmzaqk4pwmmj29ib7ycpv8uclidin02bh1xnfimjlr9ex5a93xi',
                flowComponent: '86x42gmdk2thl48trq85ngne7r4gf9aaojwre2c2qvzlz581oh9d94oapk70bbhboqkpd6yf9y9b9tg9mvwkhxidt1vte5f10f5tg34zna86l55iw0fk0bri3q69nh8svehcwlmb0scpyw6q0r51xug46ru2s8uq',
                flowInterfaceName: 'jf0zahof1qfrgs8yty0t5ap7etrefjha63q8zw6b6o5x5m7zydtqdhp2gp8gd6jk8ymrk8e7cx91lr1xyzgs4d02w4wyldsdkhs59l6oepmsl3kcesqhz1ki7wn3k47ldmomr0dndikuh6cc0mg4priymbuianne',
                flowInterfaceNamespace: '4l62n50a7nh60gfopz9y7bmbbm6jr1thq7dxqow97hnns0g7zpa0zrv8i23y7dk9v8vdl5ltxcdapw2xs5c055u92jerkh5qd7h2lsddo9p9m48bzixpvwb56hj3dij4s5yjj732oykda8rk8ewyyda5ysmbik98',
                status: 'ERROR',
                detail: 'Sit dignissimos voluptatem sequi ratione qui et ut assumenda voluptatem. Facilis aut temporibus ullam ipsam fugit a eveniet architecto accusantium. Natus officia ut quia nam non nostrum. Dolores nam sunt sunt. Velit officiis hic ut dolore quisquam quos. Saepe consequatur repellendus fugit et sapiente ex illo eos asperiores.',
                example: 'zw5dvepdgfwotx6w0cq4s7ufnw88ud5f94fh9g7r85h6eh3yw2bzjp1t5ivig933frfuo1at7f9ltijcca7r6qj1qs3yjlus1s469dbgngel5eppbl302dm94gy8ktmiitkb0k9ze6tc0n2ke3000bv548aeu76j',
                startTimeAt: '2020-07-21 05:30:06',
                direction: 'o4bzw18nxqkgwxv1nemz',
                errorCategory: 'nj1pso025xjoodut552lefm2vxfwgzz8nrudwmidfklb1ui15gm2wfyxgxon8hxng9tm2rixj9kdas8htge5iolyv6huxkhstba96a21n8g4c54gjt7wmed2gji343rvkfrfj7xpfqpr080zris4qsx3mi13oppn',
                errorCode: 'xa5c5k3jb6qe8ddj9aed',
                errorLabel: 'vnan51idtrh2tbi9ypqwv8kx1xgdrd403aoquykbrhu7vdlqtm5quzmfr0v6y51zeu4rzexckd1upacqsax8uw7fakp98wxop0061eodactxo9wfcp1oprh15xavu1pvz5n3h3e681no0gexhnfzrqgzrgimmzn1',
                node: -9,
                protocol: 'ddtk4fexnvwph6dmx7uz',
                qualityOfService: 'saa8tuul9er04o7wcu37',
                receiverParty: 'r839xefmulu073ywytgoc8muax9dewrbszizowvesxw2cfmiv1j5w8mmesq6h0vo21bfwp7ptwyv3d6o7bx55ai6zvnh4fis587akmeybwzehsdbtbwgtrdxw4ljjuptb1h6zyp14wu4m1gsvdcorhf7n5ob5qqj',
                receiverComponent: 'xbb1t3nv7izoyananyschp0at9hik7yoeh2z1b75dsruci3k4io57twv1toa6ail3hnr583ys37kwp5ry6b1n1kpokt3fk0pfrj07o4118207u3ows2is74rsf4l3a0zg7gc8ucx2oza0d2x4zhdoqn3qd245xbj',
                receiverInterface: 'rcpazswwfyn2o1pe55wvijffmb7b47adqyeuia23o007fhkkf4qdozapu00iq70h79rkh0igk2jo7b12pw6i54aryehugv56kc08gx86ki865psysfgunnq8qiuts4117ap2mfh95cxy72l12bq1fenbr8hohune',
                receiverInterfaceNamespace: 'fusu4w3rg8gat0q74mir57ri2emln33oglncxr54r94ulh0n8m8xx1ivic4mjgannmygauhhjvriw4nxgw2daxjrek2t0au2m7xy363lv05vjx9mv2j6arqsns0h1rovbwv16juxs397tsaztnwk43mq4i26i7sq',
                retries: 8709107281,
                size: 4329784079,
                timesFailed: 3033654882,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'xh7u47zbbl123hybu002',
                scenario: 'byivov1lbq84aewjfjlheggr25driizxs3dz56yq39atibj8s1fttbx2unu0',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:18:27',
                executionMonitoringStartAt: '2020-07-21 15:10:07',
                executionMonitoringEndAt: '2020-07-21 11:59:37',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'rjnpgacid6nmk8v38wq2o979pom8hsf1wtzbnac68frkslwvhcpva0sugoi59vov75m0jmzspky7g6msd0l1ugmkmzi3ofluup4a22gd19euplzsm6zun0yddwyhvzchujvvklwzud5ubnwlnnzv9y6cc3dn62ql',
                flowComponent: 'vkxbssg69ahwzixcnol6wb7gawpnjk864m3qozp6v97kpmvlelkvcih5e2xfbgjbzg0l9xavgz90309a0fcoagthr7f8k0b4qcfjy1vcp7jvpyfm5uijenl0b6y5g36n57wh1k0fdpg434ar47pyp44idywmvbku',
                flowInterfaceName: 'ugfxtk2l6nezmv78gv6oww8rez6q89xr3k9ack0oyy210gzdiund62jni7r55m60sstq39ohxbhsdbc7dkk7azsxcgc4huw8198k61gohisnvy0ymaw9etsfhqti9f1nqq0zch3x5e5z7oodmvowp0p9cflvo60b',
                flowInterfaceNamespace: '34wmilr6qy9vo71l3q14gtwlmgotkb9xbrndeqnm9stm8j2bk3mtt74affa97lo4z17ulibj644hlk5hg114e9hkuf9wymt9n31aenhc65mrzibg2d0obuqv9pnepvf7uqnwi5xdaugwiqm2f3v6kh6gjtyy8v9s',
                status: 'HOLDING',
                detail: 'Ea quo sit odit exercitationem cumque. Ratione libero neque. Tempore rerum quidem laborum nobis. Tempore officia a facere eveniet tenetur doloremque ducimus. In ut nemo et reprehenderit est explicabo dicta sint dolores.',
                example: 'ftog963fibzzhb6b7sz6lpaqjsniz29egr5om7pfqxfen3d69ey9fqueg8ubd44656flsz9vzr4vmmmsmy9revae3jjkhvec6zehg3lsyvunev86paeg7295xgm5iox6bftzm2umtbkbj9t9ubsujei6qvas8yjj',
                startTimeAt: '2020-07-21 14:21:12',
                direction: 'eqlym5m0htszs12ger7u',
                errorCategory: '0znxjyqgdhshb9vg2vorih4p6rxj8qjr9vlnw312odl7w8mafagg9772da62fc58w86yr5llghbaoetcl97205x5zj36pbr3jkd3j26a5ju7spf4541r22rpjcbwr4vuadco21l8je9tgl1kpm92jsobgkcnghz2',
                errorCode: 'arihgzskjggj9lav57iu',
                errorLabel: 'ype3mqws8murwv0q2dgstjpmgfl92np3exvrhlmo96k0mkluhyo5ax8e0qu54nsqx9bstty9we85wzc52qqratyttkfouw6992372a9uxpwjcuubx87d7xugtmiaup06p62uvozieqourzja6stb08u7o81m5t28',
                node: 2978842106,
                protocol: 'h2dwer3k4z2g85oqvd8l',
                qualityOfService: 'ksisoy5tqhgtmj4n3gql',
                receiverParty: 'gzij3wj8rc1apih5oflgus5b4s6csq3teiqsntb6cqgm4jtuju9698rarucssfiqyi6ml7tdzgsetvo20zkt8tdk2pq5zpydkt768oe4g14jhistil8drb2uswp23cubqpqqb1bre59tyi7gxdgvmi9p2c6tjku1',
                receiverComponent: 'z1em7yznsgti2stcprkay1tfsk9rn9c32a2y1xeeuyjo360kwbi1e0yjwj1mgb1atl36p4rnl1cz3gqr7fwm97v37rn76sablwy9wct07ejcdikwiorpjwrk8z8p6zmta2tx9jeuk1dn3di07n9hm2mnd9w7x15r',
                receiverInterface: 'ufb0oyocbekeiq7r0v8wtg08fbvfw6y5uluaecb822oudbufqdbx2673mykyd9z1w4fosaeddelzc9y7gfq0n60vs4s1cabwm4j5r59qyfrg33is4bvq7lmxlpjax1su0u47zmvdvq106oaglxagff0dbeswucpp',
                receiverInterfaceNamespace: 'fh3x09zk50x4tf9lgbag5q2gj22ov653jfix71wqkkxdwzgqu06kvctjdwn71wvg3u9fwzlntgtxbbw5lrhwrt5qb4s81ttpea2vgmaumfjxtpiji3t8uk8krvotu3qkxdaz3gyrzpu418l4pzt02yy17rf4rqdo',
                retries: -9,
                size: 2050291379,
                timesFailed: 6087227507,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'rx3yfa7nrqz7pdftw0e2',
                scenario: '77533a7kr1ws7cwkr7oa8ew7fm7ibklesp01kqpy39bka29m6bbb25z208ir',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:48:51',
                executionMonitoringStartAt: '2020-07-21 20:39:43',
                executionMonitoringEndAt: '2020-07-22 00:14:59',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'obubpp48a3wkmvup2pbm2t8f68iqgur7zrmtza8ltj8zr5e3m2g8z8k7ucge7neeift5iatbbtlvukfcpq0x9cwzgqkk81m6js9ivmb5sla43ib68j3fre3yfankkjx0pewye2zsw8ofxlvcy31xf3utq9vg0lah',
                flowComponent: '422ctypdbu7jpvuk0l44sf5s2imkg0zcvbxs6i1af6p99ruzdvzmfzv7yfrsvm8w85hxcraoc7clzlo8oppaeflji8n4birzt69gulqbcw8x7pen64l6rqx31dkfuwu4d6w9zqh0vqrtog4gz647vf0bomqwgd6y',
                flowInterfaceName: 'xe1zzf36e5n2mh6kltw1blwce5k7dz4ihb6yvhckjtbhy0tvs9wr3grmdayrarv4xj9gmnmt6m25bih8csiaqsith25t84ebzey77fpz7wshgg747o5icc39v3o54defeiktqac0qscvgqsogr18gl5wm3pb6za2',
                flowInterfaceNamespace: 'jtlme5vacve6figoblbr8ondolnb5xtv8e1zbaunzqt6l7v0cogi4mu7268yn583111r7y2ouigy5a9tdbjev2yzsnnptscr96wjn35nlalew4nwvgxn34qaqqxtuwt3434g3lpzzke9bewt73svonnpjplp4vpf',
                status: 'TO_BE_DELIVERED',
                detail: 'Et ab recusandae fugiat. Non fugit temporibus nobis ut debitis similique sit cum. Et ea ad et consequatur cupiditate beatae.',
                example: 'm23x3rdzggknio1ys6o5z7wd3emyjh8d4ef2pgklz4bbupjlb8shq6drx8590nde4jtw5t8u5nfb5apvkg7exlas8bf5ef3dz3q026j9ew2byw2w2nwwspmpz1awvqwpa5bit3at4w42cpbr2xrxb56qwlb4qr4m',
                startTimeAt: '2020-07-21 15:30:55',
                direction: 'gj6vjtx9zdg3peplifih',
                errorCategory: 'jxdmhnyco18pw1bhychy2tol0kq6cra78uspht1jf7rvrh3dggk2tu9eaexq14p4g7dpfgu39ckmh45809j5n991b7x1esgef9s8apvmm62qexxxulia6colmqcaysall6p9th0k0rnj1ipijb6dobr5oxq3pj4f',
                errorCode: '3t2qonh0slgkr3x0asld',
                errorLabel: 'owknnxgd5dua7dvtavzkq9nzilgrrhfkfzyzpcnisznruz09i52vdceznsw0pymxclqrex5afqkkt9eyqk5a6wyhjwsau2pu51vw6ixvmort5bmuwpejqp8f4sax6copk9p6vuqio5pu55nfk0ow89w7tkhxrvhp',
                node: 8997280723,
                protocol: 't8xebxce4n4i5wtyy29k',
                qualityOfService: '2nh5ylqagg009gtkuwdt',
                receiverParty: 'fiszhbop3q51i0bhz3qmo15840biptpzag327ratsjxcopzd75hbx064kre8ak20vzf5qj5ulpnkv5apsucxs99d16j08q9dkyhdql8tagbjoi913qf2zwa09vt7khwf4xjft6820abnx7hiwbam6sofgzz8aswt',
                receiverComponent: 'c3pdechaockd87rllcd7td0k64m4ft721j8gqi8q9gyqor3emv35n059hex1jvkhndp7qkanje5or3jle54bji4pg1dy6r5rbd81t552u784n5vg7hp2bj1uk8whq49l1x3zv0j0m6fsy7loljqa62gx29mcjbqn',
                receiverInterface: 'w8rb1px8pcko1uwqs8gmsklico1002gg1w4402b0xz8uiu0higq4sg0xo4qp09ws5c13iv376qtwtcwy8xmlmectopyjw698tbepl1kljzig0u0jpdib06jeee5hudcmn0x8fhfleojzwy25g2n5p48uyeqfvi5n',
                receiverInterfaceNamespace: 'ah9c82h684ccz8uctj8tetlslz1p5zsnj3uuxdoqq5qhrlki8vd4vx91ulgyk2nowt5z3klk3rswrk9rph5inqn2gmcnlo0yp3wi7uiisq891xq75tspv1db17tgl5tyv9fmuev6eiiz6yqyn4t7jffinq3hxc7r',
                retries: 7802489321,
                size: -9,
                timesFailed: 9168035401,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'kxgeukvqimbj2pbl97n2',
                scenario: 'tue0diia3cgczd87iku6iit538apekz2nkbsinfwbnnu7q7eqmjuv771kgr0',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:23:22',
                executionMonitoringStartAt: '2020-07-21 15:08:48',
                executionMonitoringEndAt: '2020-07-21 04:31:12',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'ih6th96jb7fvxihsafnliys80xh04vffdnkxqbazjh4ywaewdfixoo4o6gdt7hrro8zg9vjqrmpz1d8zah20i8m5ztnrvqrh3mk6tm0ggu0qsjltzn65hlvj0yr56pm12qifk0v1rkpk9g25vwbflaobk91bpv0u',
                flowComponent: 'gkhcaai0j0n94idc4it4wnti6y1tpcppqf786x2nih8ko67d5afe4rywfn8veyv87l5mohak8obzdbnx0pc1smchdn1n9iinb1j9uekj6u02n55a38nxvqu1ugwpr5qxkx2ja3fvsirv5x6wt004ploensd7myzk',
                flowInterfaceName: '9vqvg4k84w4nei3yeb5jhkbbbuwa0mjfsoxs1pejdbgzsvsth1xqduybuv2d69qejwubqrf915wrx67hm26vfs7ydugm5ns28acartefb50vzjynoi92ix6avf9h1xhw22lw4dgrouzi95wlfxxneehxtfpdxacv',
                flowInterfaceNamespace: '06j1p43iheuduybluonco2lbj5748ca2hb8002w14dy2zo4se1m899qlut5uzv0n28h9tdn52whjbnn9cmicf5qb49okpmuyx3zihp4o9sae7iu4c28f02ecs85pcu3se5zu3jdpl4lw4inwrub1tal1nvdxbws9',
                status: 'DELIVERING',
                detail: 'Sed aliquam quos molestias sint sequi qui porro qui voluptatem. Ab molestiae consequatur voluptas qui. Aut provident dignissimos. Odit aut est temporibus facere qui vel.',
                example: 'cekawblsu2rt55ohlgflll9p7c89gtdhsfsy98ljhcjo2m66aius12l2cjc5avhxlr00545lm49r18smnf9yytvqiplz83jp4jrjioot8fgqtr5fwkg078adsx4muri6plrcu5vsmdqet3oly9hphnq9k8h7nqeg',
                startTimeAt: '2020-07-21 17:59:22',
                direction: 'w8u07xiqkno9p87guue9',
                errorCategory: 'f6kyrwd4z5to7v1n5lh7ehmcrqkz73f00zwr0jeg2badlii375tg4scztiezz594fr4tt4r2gggoiqj8gksp85pdichcq9aqmk3v0ecjp3pobya6e4ozfbqoqgkd0y1qfq13x5kpz1zevk9otjoz40glrrw1hep4',
                errorCode: '6mvtw6gjx6f0xo0i56kv',
                errorLabel: 'qletf3n205hlwtau3cmm83ygeiwikzbj2bgu9nvmy1byy2img8uyoi413tdgj3fdgxxr1wxv4wopu48d1f916uquzr9wrp0rm1mt9w20pt1zdqn84c60d7ubxeixaee8rfnri5ds8z7evwipf3xiqjpwa29q2eyk',
                node: 6880134208,
                protocol: 's6si1ui9p0buvjh7y7a6',
                qualityOfService: 'z5jua7pzxgxr2af63apa',
                receiverParty: '7i7a0hjdns971sxjwm4v0i0eeqitf6487zdk17ouaymr0jwxv5fkubbdd2gkpkq0zdgnugjoz3w0lezbbebnxwazz47wvzyvzsjfb6u7ami5av0g07fs8m3vqfk6f48iuitd2jtfzpikf4t2k1v2f4hyzvfkoqo4',
                receiverComponent: '4oytjx40vf0161gblgraujikxlur8rcyq6cj9o8ifkzafgpcikkmp5ilzlgbpha40lo6vu5lbjjipiqsv2ivu3jg131rl096z23wpyveeqnawh12qghpehsqyn1ymnw8csasdyypgrv7wtqbrv150w8lab93utns',
                receiverInterface: 'gkdexett610g63pfcrmggfgx3o4fg2r0a99m9hhw62n2v5z19801j9tgr9zos1z7pw7c6i84nlzp5q69eedcuaelx3k381nd23b8lvgyz36uujzq4ldihvynj585xoajh6ufgxu6ok7olmf5m89rixt2n70moay7',
                receiverInterfaceNamespace: '80n8bus7t9eoie2j3wpaq940629ngm72b0vc2dmxzdo2l7n0g61mcm2l3ofm4fezp26ef2vikirrd93hufccz8gfc9b18nzjm0itkvrgtcpsh4e87ssu6ffelxlgf9cvoiklz7gvad3n9kp6lyizh3v4ea2on75n',
                retries: 5272999651,
                size: 9198619481,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'v3t9fz7zkcbe43afypd8',
                scenario: 'qvab615jxnxl3j8ihdnx65dqaqid8fob22zq61gvsmnxvm86ka9mjcx12xr3',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 11:55:08',
                executionMonitoringStartAt: '2020-07-21 20:48:46',
                executionMonitoringEndAt: '2020-07-21 01:11:31',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '5sjfm1cgi9adz4e1ils4tj0hzvgjgx7i7ftro8b285cm00da1o2tknu4mvnfzg6o20gvi5m0e0bbirszjwkc62nn5bfs1tojmnoceqjqefbdse5omv5rekfrj97jjukgsisjzh06ugdly332115qnzsztg4kfzgl',
                flowComponent: 'k9ygykuvt9elcocler0d5erp1kprpp5zicv2zlx0jwgxgmmj3a1f2fealwzuo6hjvia76bn5zvc7gspsn5riytwqinqufa195i95b716rb6paym9ehtr4av9on43mi8mouzxxswcwidembvhhym9tzb45bkunt29',
                flowInterfaceName: '971p9lj6gpd71fv1yk39cknqzgl7rmfizuv4k869qrsfewudsijjugipe27xid5n94tskq2t0pa93zyj3jgi5rb2ehw4uje55ubo3drilocwpu242d1ptbsidkeuj8gdf0g82eecah0hv07ms4xl61l8itk5qdq1',
                flowInterfaceNamespace: 'gqrn0pnec6rarrfub0rcd8qe8talrml0357uo6qgfdbc420ksy2yr5oldjdhi8ya26nphimu48nzy721jl8r9zw8pnhvsbjfqfvcq1taokfikr0mdn4usdk7etq7d8ffdpu12oqoypujmlvmm63cwi5l47zewqen',
                status: 'CANCELLED',
                detail: 'Unde non eveniet cupiditate rem cum. Non reiciendis error nobis. Et ut corporis quis cupiditate est exercitationem rerum repudiandae. Dolor deserunt neque.',
                example: '69l78w1tan8r6ijka52cg7hn1h4bomkyay412f5s2hkjcbsjea2sao4m78ca89nmpsa5p9ghu3vqjszwyz8nn0hs4xqasiymxluskpgwyhv2o8kye9ykf4em8ng2bns1qnsbuyta1g1nluc157720trr77dx5fkk',
                startTimeAt: '2020-07-21 08:29:09',
                direction: 'dub6cef5swlcd7qcykgg',
                errorCategory: '1tdba9hw6phows34iw01w6dm2o0rmgly0yzzj2zqy92gjsmrljy4h95184cc8ooqydzjpzkurkp2fq9f77jxmc0dq2ss84gchiri6nknco1u6j045q1opcbv9vgsvqd048xmsr1ezx77t8v41jnmzimptllco2be',
                errorCode: 'g4cy2qaahv22oiim7z0x',
                errorLabel: 'zy7ipwqfpqf1lvcrdrae9qu88ex7e4vxpy282sjidmsofzoy2d5btl9r9c0kuusx8b5smt7r3atisw2znu9x6v0bylrbvlxri67669ls1lvez4kgggus5159ro85bcx5x4dhv6x64iq3vbupvnd241uqsau3f9jb',
                node: 3000119244,
                protocol: 'xkccv2oja9n7odgtydea',
                qualityOfService: '5k7yqqbz3kxnvva9rwxb',
                receiverParty: '3rwjimwqdd0epdkfplu6rkr7pqj7xks5qmq5iv2fujca1zz4cs494cwizz781nqfkw32bjt1ivlanml4r7o0x73erycem6v96ta92nn4yxp7k7845023u7tljsmasrjcq5tmsxaj4r1y4pde86ikf0n1od6i8rf7',
                receiverComponent: '3iqaj8pim8zyx21882o3ltrumjtx2lzgx2v37zdvc4ldix45uyjoldqr5qdj32mu7a016r7cr6idruy6j8czw1qq1kda44e9mi46vgb7kxlszum0ow3y6g8eeieotrk2rj47i69a90yntaz8tjgz92dambkq86nl',
                receiverInterface: 'teo26rd8ybeuhrelfg3s2cz9wzf0hskba3ukuqsaqapzlhvb6lbbxo9vj7sh1uigfj56trknj7t8vdifa7sofk08yztqdr4bjx7b4cln8ji3q8caoeku2bo3bnl14eju03s5ynmpbcebiaklt4nbpadnhudev432',
                receiverInterfaceNamespace: 'o7ow3822jv2vi2ljb9a949cfojvzkow5140qtq2wfqtbjr14kuoz9vgx1bk5nh8r8f7f3xqbqsbn0u9xxqdfjh7w90gbgzsrc2jkrneddrqjt38lej4kmjie8gj3oe95nv45uvwvuqeb39sq9iu8za7oifhh0ge9',
                retries: 9578476862,
                size: 1371425625,
                timesFailed: 5359403442,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 's7c2awlqye0m98bb3tn3',
                scenario: 'myzjfwh8b35hrai6jv2fc9zzenzhiad7awa0q7ss5jibpd2fd6lxz1bpbcp8',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:58:43',
                executionMonitoringStartAt: '2020-07-21 03:10:33',
                executionMonitoringEndAt: '2020-07-21 11:56:00',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'zq3z8f6bo1t060ppanh2i0f0ok3rvwcuyg1mx3h1akh6frodi5dyyjq7eeoj7q2mywu8adx20406bz536esicgo1qzopya0i6z6zlowdqnqk5m9yybrphp6hh3vutw9ot2gvo6u013ceeaeyry7onl1kq3txmw49',
                flowComponent: 'irmogkpqw106qwz9edw316iwimcy4vclt5knsx9uloz2hyb3wxu5lwmb8ff1rzy732h4atatjsv4t5gmhzi2lg68n7oluywcnnbqaeyxne1a10lgo6kkz7nnyhz7c2i252gphp0ugj8chunz3mz46adg4fs8hxsa',
                flowInterfaceName: 'spbccjqffa601g1iuarfe4cqansxv06d7w3py5uge0be6kddxz14v7vswwhtw3hkow50632vkxrss7spp6q23s6aoj1rjx9185nls2mohp02ymq6rye8z0kbfzrosp52s1uywmjsxuxixhzjmqb6acuv1kseghsf',
                flowInterfaceNamespace: 'ty28m1ojh5ifkwficv82w2bqtf1awvrmlrnjkb3yutvrwe2xuk7vizyt2ls0vojrfobnggbi99aui7b4ta8h4f78d3dajxuqugmvnagjjmdagk4aceoc30vhmk6tolr1zl3ljeorgjdtxunjaebwz54f1syu2ygz',
                status: 'XXXX',
                detail: 'Minima et omnis suscipit distinctio voluptas. Quidem in voluptate facere eos atque in sit ipsam totam. Perferendis voluptatibus similique sunt alias ratione mollitia est ad aut.',
                example: 't0ebi54hdhyxqmt3n4flcmytjzv8fjbqc1aiajk34w7cxjqp5wc1h1z6ins3hhzju36iugg7krl5aesyool7ehkwn3d8ksbzk4p7frpudl8zs5dcooerlpvpnvntc2cuoulcawtni5nhydyjyfw13tz8ubyo8kko',
                startTimeAt: '2020-07-21 05:24:07',
                direction: 'k7icxje0ccy73ergw2r6',
                errorCategory: '340ejjoi2meae6dbd4k9nn0d6mny1umcqulbp27roh3q6tviy42v2slx5r6fxva3cc3xx2i29ywk5z3uricyfwzat7n4nwscrmjiy28kk1ps145ou013dp0r4ynxo4siv76or5skz5vd41g3jiubruj808x5ao5t',
                errorCode: 'n1zi6rhegfqdxqvn51z4',
                errorLabel: 'pru2e5jb5f35ma6uv3etd6mwf834il1vw16jru8dahk9v2ysyx8yoztrjrqqncpr4p218susaye2pk8bfvvia6hnj8muur8vfu8v3918ld17wh0ln4zg2hl4gksc8wo8kigi0tlbs35ziwt7rxw2rghyff3rfuo5',
                node: 7671009407,
                protocol: 'hur7wvqsity49q6c0cyl',
                qualityOfService: 'qvig9nam3uo3wrfxz3ou',
                receiverParty: 'fj31msabdi6lfqq090xdmourshpfnid2bb6ik6dzmy9sak3rqcmdvls78snyv2i5kcvh1vxbhenc4uj6h14wyxqin0bnoabl344499hy6kkzdbjkdcrktkcgo8atoiope9w0fqqecvfcctmd5babe40pldwypagn',
                receiverComponent: '7imuyzh5n4jwy37ie5obrs0zr19m3lh4xbk4lgzsuzmk82yxv0v7schjpyg11638ngupsxptd26j1wffn0otmn84rlfmz9qb5exki8awek7bvdiu7ovcg48hlhwqey8cvjb85h8nu6cr0vbpekyxmxs8jm2ujyxk',
                receiverInterface: '0t0jfgzl0x5qolp2mp9z1t1si4vspn6ch53xlnou5ivox95z64juzzn0oam9jja6y9mityvwj8c115yyr7siw5nn48t6kunwma26lgqtiq8y97eb3aez2wpbx5zwvqszqhz1d8cafl2oax73pvxzd4hp2su14pnk',
                receiverInterfaceNamespace: 'gsf8rjgfcldob8qn9muz933yqvlabl1nymw54xbw5u85girx7k5sqb71d1yrs61oie7ryit9omcj6vtkphxb4cl491mmjaktiqy3taamu9pdwuq3fugq81y6p9u9p7i978cji20jhrllrru8n2n8vsh7dwgezfvo',
                retries: 2069665136,
                size: 8154917438,
                timesFailed: 8416132003,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '5nnn57ijc09iqu56mese',
                scenario: 'p1cj7uv2280qiomt2erw04dnwv3sfd1qyzde3k2duuwh7lif59pr2np7hhsu',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 08:59:37',
                executionMonitoringEndAt: '2020-07-21 18:24:38',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'lmf8yz9sdpcc5uc5cd0udqiwc8h7w8s7wyi20ehqg8kdz4fi2o81zawqlu2o4i65te5rub6bgjttsyrjnwsib4gu2s0sngfn6zgsu7rrwicp3ljtwykifsc550z0b33tn6l0ed670ue73feiuamaho7fx7gadodj',
                flowComponent: '55o54f64uui03m4acrgwcgoh6k1a0t26ogv1ri88fgilr06ivd8lepbz7epttovj5gaunohwr59wh7ud11hqw1ffopgh0kv5mfu4v48fq2uw2xt5x5yvqzwfh1hx4sayq33cdzig2r64z30tk4fm3536q0npqfoy',
                flowInterfaceName: 'b2mmu593hop2ubv1g7zxddrj31b69yfb7xus38der36ok4iktly0y3czd6eecu9za2l26y9txmzg1myif2awobre3x3k242i5jbbrkiiqesyvgikdi0kdcuz0jgjjp5afwsxfmusxnbn68wgsm3rnxgvzz2q3k6o',
                flowInterfaceNamespace: '498ayl7jayx4i34xe1ijkrj4z9sjkcyozvimx1uv23x9saq86zqt0uco0ucx35wlztnjssx85zbs01xg1pd7trclz7pih57dbcchdo0c9xm7vs00d3oxnn301vxc4qrqg7sd1urd44orc99hctjtaon241ogubw1',
                status: 'WAITING',
                detail: 'Fuga dolores nobis suscipit quos doloribus. Doloribus delectus delectus esse voluptas. Iste sit veritatis tenetur est alias veniam totam.',
                example: 'rtncxy3agsy0rlywnr8j24ljfnphbgvx0nwfykvb22kv8du0kt7qpiby7oevktlag4y9q8stzamlgyy2okym04gddezx61iespwyam9g50kl2u8bfaeg1amydncmpvgyq70ydmm9oyg3j74gnvro3qj3bpnvjdhs',
                startTimeAt: '2020-07-21 10:37:37',
                direction: 'bfs1q5g5rxim12p1pxp8',
                errorCategory: 'c4ta08nxd515g3kgds70cpwjbakshout2o6qqdgwizycvvcfv49kdbkagb81f9bgmy7ytzxppf41ywmnqe1wd3tjm0fjtvyp1jktqpxwkjxup74ikd2w83nlhxkemuwz5uhdylmglyvl1pom19w6mi5at0ru5w0f',
                errorCode: 'dvkphuuqv6xs2cdqa1l6',
                errorLabel: 'o5fvlsnr04vhy2t4qkt3j4glmzd654bxzlcbg00q88hdg4keccog2afs6rdzowyip9ggqcmaguo8b4s72gmlpsmnebh553412jx4ixyu1bewwdbgrt366y22rni38m5nblzuy1at9f91iew0mvgup04g596zcesg',
                node: 9598966333,
                protocol: 'e4dharac3ea5gvc4lozj',
                qualityOfService: '27ldai462p87ntis7zy6',
                receiverParty: 's8z2aigp884kur4vmmanatg1hrv159fgf088mv17n34w2ds57d9vc8mgtltmrxkmj950anjdf0ta5v5wtssnpm8b21oqo1jbwpf7j3la5j3yin6l9bpbxopxkx7kktoayxidyz0wt4a92akc3fv8qmmtt7l2o5ho',
                receiverComponent: 'wg3qokzw1059qu1hw55r66praqf5gzqsxjuhh2cblyu77xx5ubkunzbqhwgp0deqh11qyye8dg3ljq6nrh4vdd2kyzsmvsf4mqtoas1q9rfkkirwcej00gyhld92wgt0tqgepvpmprwpb81pg3u21r2ge9ugxjdp',
                receiverInterface: 'w3ua6hfl8ibhk1u90cffykkmlii7f3k2ee9dxzn7efvdb6e4p3pmna5xvgjktdkfkuy7qfh3zuwmddapvlk68er1byhblk8k2r4nwdh7z32uiksmaw8c23jwzsqd5xkq3ogs37ye4av545hjw6a3xq0kl17spods',
                receiverInterfaceNamespace: 'xpftnhlcny6wxqh5zg0ctmbfltx5swse0462x4ebxil2l54wa9s0f01uqdf6tkeystterdz3s4zs3ywdez3h3rqosz8qt61kjntb2zfnacsjf5e5rjjl8eeiuxorv3sg6n9emfw2039x44gnodahz8is27161n52',
                retries: 9650459236,
                size: 5730319695,
                timesFailed: 1033347839,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'q0jt0bt2pko10xzxegl8',
                scenario: 'ri9sixpw01s2dklu9fiinrg3pbuyo8ucil1vhui2nslcud2jf6fbwv3nwr69',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:33:49',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 23:59:02',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '988i2qu7z4wcfauzbrqm6f0focvnpn6mwqrspa1hhrmwtgigc0l0brch3ozoe0bm4waxxceqcpt2yjrin54d4fz17wjmql6549abprk7s3zzr4fiawtjpmd641dmkeu0rakz81x2e8e5imykxy8ycbnldkrtmd3c',
                flowComponent: 'x6dlpzjelznx2532xndfdcpftkgy8fvfceul6qc8akrzc0xlghpqm9d3fet834xwf9iwlamjsy7cfnbmj894urs7dnm6z7do8powawr9wn2xww98lavnrp1yjofka8d700mjx266urf4izp7zl2n4wo5mf7fl7kh',
                flowInterfaceName: 'vti10mft346jdba02axhedmmlb7b5qw2k2veea55e1jnooa9b6jdn78tzf0jk7zqwrp7wpgyywmk2dvc3s9zwhh4d2yxw95okie2x5mrjw3fnhg5yidu7f50zlonrgq64ve615kwbppnh8indd72hbreysmgar6r',
                flowInterfaceNamespace: 'bq96ut9b3hctlp02rtl6g3yd3l6qvw1tbtrpd514eqaxo0xq4cex0t122jkdtdbl11ir6sxoppxk82fddn751shupqlxxbjl1vhwmvptcu2c35h04fceqi4q5c43lnn6pk7vh97tdguxihcnf31wjly4vr4cgr8e',
                status: 'WAITING',
                detail: 'Sed cupiditate id voluptatem. Voluptatem adipisci vel officiis expedita et ut asperiores. Esse suscipit culpa nam rerum aliquam fugiat. Exercitationem non ut. Deleniti nobis occaecati quidem nemo itaque.',
                example: 'b1rk8ttog12nc7lw0h9bxzpynmrz6jf7jflt6gngv2bb18c3jdr8i4ikm19d5udhqtt15pzektapc0nmi3uh1agf4suz0k781rg5wqkpaq3dmn76lr84wf94r22hidf1tbgh922pl9zb3a4rdtcbeeqi0cipekep',
                startTimeAt: '2020-07-21 02:25:35',
                direction: 'm8mpncvtz8lf08jnm1g7',
                errorCategory: 'o3bordt5k8354dhbqp03aivpams2bmui1xd7cxy5bepy750hef07bahkzjakeq555elnk84ugavxuqbbyn1gssh0vkfv098y5gze9ss1i54i6m54hg33y3w06eskaxiunwnw99ljtrcpyzq6mbuga7c6mrsah3w0',
                errorCode: 'um418hqf7i9q9i8arwfh',
                errorLabel: '1tood16etf36gmzxhv9hdo8o1n94q72hjgrxz2moqc6grk87futa0lfdsgs5g0pf44wdhvab587zk3sz6xgc1vgapjyw0k7sotikzfcqpq4rtqbnrg9a3ak4oxm715hj9llx0hdxc9vqtre3jj0mdg9hx4a9d5o4',
                node: 2694151094,
                protocol: 'q605ckiyciccmqbeefpr',
                qualityOfService: 'jau7x4w80kod1i6r7lk0',
                receiverParty: 'anzgs400mltmv5qtvrk6jgkcr7p7qn1h6pg9d2tmsta2rtxg7pwdadj01q507zmm0ak0u6l02arzb8t8lfpd96mogyafem089j26vf0pps2y2uvxe8n2z2602jq6yleydln0rr7k9nq6u6plnf9uzz4f3lv2xjal',
                receiverComponent: '2y2bxx25n1hwhi1oslaq0ybnvccesth447qqv5ziuf9p4ri331rccpvvdtdpxf47zn0l7dhth7oy9d0us99i2zuolutuwd4szg5f3iq4q0qb1hqevsdjo8oer0gawkl7p69eum810rermpq3kzr0zurv6443099p',
                receiverInterface: 'xoibbc4c447ncemp8kofqo1nmd6zswvgs1fejofx8rdx0sn1ropi27avk0javw6yi2va0qn729b2risvxyy9idkrkxfesis0u1cfu52vmzskbt11j5giwgo3bv00yqkavy6qcxvou1hovzzimnlqyws45qpsziwh',
                receiverInterfaceNamespace: 'co8ir1r1hknqf1x7c3lfzymq9e9r5u75jgu1bcp87lr5icxquq1gp484rjgora747kaj73oazf05jww0kdu8bpx4nc7gavmvd3gaxwrqyclrqwah1quv8e7vtd9ogyhfuw28xrcdmx8mo69qwuq264se74d6lkq5',
                retries: 1693218899,
                size: 3954696202,
                timesFailed: 9926913803,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '1h6ym0ckops0rnw0xh5a',
                scenario: '7eoqs5b499d8wgkg2zgn09dsr0bxwwlfvqtqnesazv4atqk9x5nvy0texib4',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:34:19',
                executionMonitoringStartAt: '2020-07-21 01:26:45',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'xxsneezvu3b8r3d6j00f9bxembu3jmkt5b5iwdu05y0t2d1rc479gbb51d4lu2u78szloi2rac6l21lplxcku3vktecjninjvwb48ak38g5mrpdzqdbpxdr20o5ilpdm92s7paylhr9rlovyvjo17xieskzb5l3m',
                flowComponent: '4otmc2v8v11dvc2tu4d9edj0t4qqvmrkg5q6bs2tpni0s07nbm6qzhq6fvir2qc5v70b479ga2zwqaju9onmqri0xigkz436h04x9w3y8offvg47jsl46cn3ubvwd4r2fxf68f6m0ht37glhhp2h3kmbidq9em8v',
                flowInterfaceName: 'gldbf2kwjmes2u13d8c8ta0fyr3ew41mo116kz9a2nuy28djleqisx2kyrqochaotq1r2ky4otd9tofiig4d7r918bkald3roiw7q9hgxjjetjhc6xbl7dej73ovaj76go9sdjznwb9upo2prsjb5p817g8y4ik7',
                flowInterfaceNamespace: '7pb6x24rhcsp10xzycf563onnnnu6nhg245flepoda55e2nvi9c66j9lv79fv78rb2bp025ub08jdeopcmfakndge7tv0hfdcim1s0qe80hvrl1njmhcr6knmd6zdwgmyk57ugz16jvvjixeiiv5gkhf29h22fr1',
                status: 'CANCELLED',
                detail: 'Placeat beatae aut et. Ut velit quasi soluta. Soluta repudiandae natus dolorum necessitatibus minus ut. Cumque assumenda fugit voluptatibus.',
                example: '6tashij52ee8rh3gi82on0zemlhqvacgh7nnpxfh4pho5edq8vlfuxb9zfki4buu48gapzl7166r2odork3zmnnhfjy63t8vfi1wt724ur1q0fh8by93pjijyi3je7d28ttjyjlx5pi2wckfzufrpofbpx8ekij3',
                startTimeAt: '2020-07-21 19:35:48',
                direction: 'uvk0aeq6o9xcg81kw8sp',
                errorCategory: 'kxdllkuac03zhzz6razh39bbrkzsx7azuillft64o0pxxxxwin2ek0u1ves70c7rhne32x98v5nfgjjxjjnnaz9nrjkynuecjjy2i8l379tbokt1jz75xh7kmortw0okin98fe7rf88jkjhed1n3wgle5w8o174m',
                errorCode: '9qzp5a2z1b1cge9sm3mp',
                errorLabel: 'lkgjwcnnut3uiyjhzow2hhr2h88di6h9o85oiy9chxi86lrs9u167hl2mbvejceeakgea13544yrosi91y8rxc56pqk3upl1juwro7i4j3ba2ygudwuhig93wkodc1n35jt2idvhvxojj36ruipoa2kpzk8c5e95',
                node: 8579489371,
                protocol: 'laivncyktvb2ojx92bci',
                qualityOfService: 'zv0h1h2oh8ycdbno3bc3',
                receiverParty: '7k0lmzxm0xo7jfw9d06xd87g5h5u5c645kudyubu7fbk0m8q8hvpz7d9gmxfzzpwkw8o8klkthjw1bjjlg8lxw73no3x28qeuoao99nbxkm9dkc559jq69rp6aj0ttrjevi7c1pkjvzxcl01klwnknc6dxmxltlt',
                receiverComponent: 'ovqk6pejmm9dqdhyf2k4oqfg8050x8103rxnn53wdkgc37fao8qxkhyhbdooybwx11v3wqv3hw2fujx47x8q3m94cy5g543z4stibmt6g1nfuzfr8ge3f1xdl41cdnrg0iir454rgroinvgn87fwk8fqbjormey5',
                receiverInterface: 'pgq0vlysfxdq7xhzz6q4omu4yvgwyudtz2xhx0ci5hnzb8l2kc9vsosc42rcgl1k9hl4svn5o3olz0ng2fr0f1xh1j5dyk3172poivcs0q8sfcdadbbwgwqg42cpu4886k5qe2fnaw04c7k7fa5c1t2vdocdut5i',
                receiverInterfaceNamespace: 'chxkldft2p8fffuvvhvhm22tk2y4ea0r5dal6l5c0zp2prt10gv3faaq3j118dgdi3be73yhcb4dkh7c0mm1g8eddg8ccckyk1uwkq1b67i2myzbq4xmrvr6tvlljty8y9pmx2e4taoas4vf8rndv914ctj0k64s',
                retries: 2863539672,
                size: 6585905715,
                timesFailed: 9551262512,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'jp69911pd7pb5d18enf4',
                scenario: 'o60cmh0yjynoax37xzkhawlyiusorzfvh6m00qz4nkrzdgjto2js44pchcsx',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:24:52',
                executionMonitoringStartAt: '2020-07-21 14:35:44',
                executionMonitoringEndAt: '2020-07-21 08:26:47',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: '1cysjmkod7jwnocqx4ewuhuwfqmjd1dpnviaohqhrpfubthlny0vme2toaee1m2wuxx53ollu0wf95lh3bmsozqedapn5u48o2ue26n9czj2j1go31ox6ujp68rr8twlv0m6reor3xnq3wlifqz1xtp3w8rd6dwk',
                flowComponent: 'gx9j0a94bd6dhekz6hejarsp8pnpayl1kuzpvl3ykfipnwtdb3f61vuqn4rym4nf1g77d74ejjc3dcwb8hrty0b8yos892ky8c7ny949obef0z1mltns8m6shv0ouleoo9oebwzx6umastp6tj1x3fry6a3e1mzc',
                flowInterfaceName: '7xhiaswjcjqdlb05705ojpftxoflwslbxlu9c4l1pu6wl8c7uhpszo3qm6h6vtt7bw2jw6odddixtnpxu9ab0qp6pcci50hkpzj86kc3nwsvx2mlm3swoipb6k5uajeewnqckvv2oilre4nexpm1s3b7mg5mih37',
                flowInterfaceNamespace: '0edn9osrpbsaxo96ru01y70ixcfum6satcm22ip4knaeiw6ma95920d2j3wc2totp3sxjixjaem5x2bxepw9a34lt2ve1od7f9ckg2znaee5njo2i5x2i9rd6hhxlniwbnid2d5p7i36yjfq1fixrsmfz615gqi5',
                status: 'TO_BE_DELIVERED',
                detail: 'Cumque ad numquam. Dicta similique unde nulla saepe earum qui qui quia. Aperiam error ut non totam. Corporis quia iure officiis a tenetur. Eos reiciendis quia ea ipsum iusto modi autem suscipit. Libero possimus excepturi aliquid qui.',
                example: '8427zhecoco59k8m8q0uirshdqetmyi5drn9wll3l8xssvot3zq4mluia2som6whigbzcmmyiow4yhmovjvkl3d21uc8xfswrnrhpnbpds2rvrrf01d1h64ijbigop3r9zx7k11ln5mqgkff6ngw9hq4o3cywwqf',
                startTimeAt: 'XXXXXXXX',
                direction: 'qqeaplrvk7q0sonp7b4r',
                errorCategory: '30fpelwp9ezpkjnb0ddhla8nz1ttdnnmhfn72ia5qyvigyapg9rhitwk7iss934v0lciizwkyv8ns6gskx19sp5s1hp0w6ja7zgdmxc1qdq3oii5mwj7kvqazlcvn53r9tukchn4pz3hqtkm9gmh2cjqc7b59kjn',
                errorCode: '7s2om1e0ru945zfmh01x',
                errorLabel: 'gheo6vjepfjdgcz4ly46id3ua2dsc8gzcfvmbhbhf0p0ingvqiuqvstfcb7fpbqh65pycjd7vvnigl7w01di8qx3e2ylfbjhst664oo7jzk71poqi8cey7fz0y2idf9ikhzlm4h2jl7mhzrmo9whzll97v3oph3m',
                node: 6853870705,
                protocol: 'a5sqn7f0s7s7yadyuc2s',
                qualityOfService: 'i3emjcax4rimhazz9xt3',
                receiverParty: 'rydzsmv7h9piuy2zky8kf5r8cvn2669awpbwqdm3za0ylewdu63lq1gjohe8wctvzb445x1r7jhrcnl48rvp7mmhnam9mpkbudu5ml6aogw42tjg6yyimknumk4uftrk1y0o5dbk5xtxqr5k1rr8gh2k5zyrgnmv',
                receiverComponent: 'wy5l1225xdiyi94xratd18k6wkcx2p3y0tctryh16tglav5bd8poewxpdentntclklklrdlbd8v8ao9gg5g0vfofjby8cvpq7te20yt6ewvu3xv2171pr1keos5oo4canw62cld5qgs1yhynocakpqa5esqq0j2m',
                receiverInterface: 'hdwbqhcwsr74n81uixzzz2uqye3wt1d2xey0fwixb8o92eqjbrj7z4cyhmzsxmje2p7aiv8r3lu55z4vj64lcc38x3vcc2nia661lqrvy6hih1wpjcoay9rsnijlmsp1a418y47v89bucyy6p94ksioghvw1x6un',
                receiverInterfaceNamespace: '9912jsjju3ioie6p839xzfnedp2fs4ambu9399y6yxjd26ouie6d2olzl22tmt67ym3zpb9pj5x1fxalm4jegxt4a1sa8gi11jpts6qainzec6wd0tnbiuc5lf9akc4kbznz5d23b02e63rcy8m9jxsigl1aqz25',
                retries: 8414988768,
                size: 9508274403,
                timesFailed: 1561640817,
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
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: 'xo29unhwlh5dmqkthvyo',
                scenario: 'a868rh30d3707axlzl31kck37d3b7lyo2ocoln4do9otn0bo0anhnqrjm6tz',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:54:09',
                executionMonitoringStartAt: '2020-07-21 05:50:07',
                executionMonitoringEndAt: '2020-07-21 06:45:05',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'pdfzeiwtmlx3seitxdr9ykl4ufdeis4nyu9qsjm0yor5yy6ffqib0noqhtinbqvui8c8lv4ef0gdoax0msi8f9mmriuxmvbvv0lla0thx7zom0qwp3lii8ae4fr86k0tpbqo38l1cxt1rdwpmdiu53qjt29hd2ni',
                flowComponent: 'kd3qwgpqnji69v4dpd89x8x2nutlvbqh076635akr8ugunbdo1xavor6eusk9jif1wbtdp5qofvi1pp7jwamuz8zlwltw5vx2v2f081ql5ss4117328txwv8ru09ikzq1n4n0sjob2e5gy91684q1sltkbd7h3k4',
                flowInterfaceName: 'kl1k1vhyf6vr91nnba8moj31booiw462y85nt83wq5g6xshlir8go70px4hz37lmxe7yy9ch14cnpt850muvj7vkl0l9cc956isdl3qq7i6zfhl7iwa00tqpsjq5diy4q2l5on1prxyn6ql89dwj5i986whcaj72',
                flowInterfaceNamespace: 't0u2c0u9mzaa9t0jtee356vm25ynb300ir8cvicwsfmzomlod1mbwy78z07x10z4ma9qgr5mcfq30zq08bytgqzzyb6eeys9j0qwfthoafl6gop8q6ln54byt99j05ohabdfj7c9solmlgggk0bjzpz2s65vyvju',
                status: 'WAITING',
                detail: 'Enim tenetur architecto quis perspiciatis et. Ducimus et consequatur explicabo aut qui aspernatur ullam voluptatum nihil. Sit aut animi id. Nulla et eos aliquid autem aut.',
                example: 'k8nk9421l9ngp9js8ehl8xgelb5n48m3wm20cz33fjas65it4oan1qjfgbehu9c3posizo8am9qy0hi0fgearxy0y2lq2necv3m4o3mxf7a709mm5xm0neus53fbfn3f8gc90h2rps7cwh2muohip40ln7a16jlg',
                startTimeAt: '2020-07-21 00:58:48',
                direction: 'jeqsqn8v6j03sdbid66w',
                errorCategory: 'qssiwag2otr576j7u6hjpvhcnj17l2onc4kz5c4nbcezrb57bxlofichoe7lgwv77eywm2f8dk9pdnp29994zcj9cy73a1dhn5aqfnxfnlbyipjb0mkhdjif2biqax1px6rrtnnfmnd3vbw63bkqqyq9hisjunk4',
                errorCode: '7wkaw24rimhxd071d60n',
                errorLabel: '4hcxsiuycgtr37mhsxy1bfavx7ecztm2pdnrnj8mv86x5q7ta0zpiafc5sa7xvxyz57x6lunxevjt4vze4q14yihkodk4z5we7o661m3lmyji9p8k12nfkk2lkhjimi2iuihs2ft5n9xfkqr9bfw78lmbq5dqv73',
                node: 4447276738,
                protocol: 'cqx66dmfzqcate8uswgk',
                qualityOfService: 'enyhvr6dihad6bfua8gw',
                receiverParty: '6xwpi4trdnwt3974y5ad9l3oxzzfv76211n4mz7h6n9w9frftd8oo0bbhlt902q6jcqpps6i1sq21vmxulgmm76v1jrbx490qg4l2f4mk78we5wu51ohnhj4v2vkxhc0koa3d1wddjab9dk8d17pa4z643x51lg8',
                receiverComponent: 'nkw0zdr78vwrvymbekef7c0n0663eeiyf1xm76inr0es6bznnyqcb8xpqc70h088paokwmose3b61md006mnevrxxy0k5ohvmcxpbfdlw0u9lju215034rwb6rmmyk4fzu6hr5wrwalc0uvw2g88ge3tioj1j1i1',
                receiverInterface: '4z4n9g54v1ynofetgmen4ncjayynn3lk1cxyfxfzipiq9osg9muepd2lskjkkrik2ag3wqa6ikotbxmxqmjp62nnocnfxxtbcodcd7v8vb234xink83f5f3qny8ikgo4osio6xheo3ylnz9wdoofq5jrjkgyvfu1',
                receiverInterfaceNamespace: 'w6kdmex9p1rb1wgyu3c3ilprixg3cqql1kgt5ocs5hw8q87oczgw2smzwcw9bsf4q4apbwmc90aeyf7148aphlxjeze2ncgn35dngxuwxe3iqqpcjxalib73g3ovdmx2zq8tti2jdzlqshae7tk7f82x0ikynwkf',
                retries: 2636125251,
                size: 8965090766,
                timesFailed: 7794176038,
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
                        value   : '45700825-9f4d-403d-9d36-a21fbf331a93'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '45700825-9f4d-403d-9d36-a21fbf331a93'));
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
            .get('/bplus-it-sappi/message-detail/45700825-9f4d-403d-9d36-a21fbf331a93')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45700825-9f4d-403d-9d36-a21fbf331a93'));
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
                
                id: '3e33c79e-d285-497a-96c6-149b12bd468b',
                tenantId: '782bb4c4-fb8f-4241-91b8-12a891251f70',
                systemId: '1d272fd5-3047-4733-81e5-93f89160e0d6',
                systemName: 'ywa98ma2m4474ndoohuh',
                scenario: '2jloda5s6waqx48uu1r49fro6ywqlxctfypsx5i1pkz0wy0a0q447504ejxb',
                executionId: '8ee3f273-9496-4b3f-99e1-1035fcd175f6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:23:09',
                executionMonitoringStartAt: '2020-07-21 14:46:54',
                executionMonitoringEndAt: '2020-07-21 20:47:24',
                flowId: '24f3f521-52d3-42fd-be79-e07d1bb202db',
                flowParty: '21pzyftfyjz6f7nv1zedw4y4tsag8vaifp2w0m2vscxwx04u6fzzn92xhqxu4l02un3nrsosyqacwbi8qwz64ezzc5778kggryqsajxjm0ulit1sv01fo6durhi9s67ile7itkm2ap7rz0me7qzqrp2zn4mhcmcp',
                flowComponent: 'h1qqnsd1qusurq7kvv93wyjr06cyg96k9it56gfmhlr5ewztswd7lk4itywetcgyjpu5k2h9ozcd3p537dnnkjpznngcp3nom7ab7a2zwnug474lh6mizwr6twgrwh0ao2b8vg643as626dudtwsqvsc1g16sv0x',
                flowInterfaceName: 'o927dljw7i0d4x2wm1nhkkovbrbcyxx37pw20m6qcwx9xv10xlff9gz1vie84jnb3dr7g9vq5rx24p1f34lwgq5vyfhz8oqljof95wayqozilpnbkikass3jzwhtt9l4peuv3odpc0tovl0p8oiygzk93qlwng1j',
                flowInterfaceNamespace: '45ajnkzl93nuhf5ba42rtfu17t1ciduynjf40ynxl96lmcgcgmkjwgbmeli6gv56nc03zvmto5h3boe3d5ly76yxisjj9inp1mff58dhn38oqpnza8f73hbnkc4hm0c9g1cczhygv8swb5lwhf2x7xjwxrqiktr0',
                status: 'CANCELLED',
                detail: 'Quod minus fugit tempora. Exercitationem aspernatur excepturi velit possimus officiis error repellendus ut. Molestiae eaque nam ab sint sint. Numquam in rem fugiat voluptatem asperiores. Recusandae nobis in voluptatibus laboriosam error voluptate. Ea quia illum beatae qui aut illo repellat.',
                example: 'f6rqdit4x393ccyuia09k26ru2r9efk12zyjtiouv0z7nkyyj6y7z6jsthttjgm6jxav2qa9mky3hq6jt4g7xrut3m523kg6dtlmtywtka8dkmhkakzy8aqjxunyiddciv14m67lunoia9pyuajucfaachr05rwc',
                startTimeAt: '2020-07-21 23:44:54',
                direction: '0s00ueo74kpb2t3lfxr3',
                errorCategory: 'xta470rodln9v138uk3i7uvghy842x57pl5kenpdyh5bzdxyxyznikh95yr9lonwrnyuzuqpxrwno9e6nhublix2fybc3ap0flsh3rwbzxgjn6dxnmfvmelzabtk4qypwpe0suharvy0ph0d1svo1o0i031p5qtk',
                errorCode: 'xgz0vyua6rjqmfc4xb72',
                errorLabel: '0m30tszc1phejp5ubfkcxv8cvdcpwnkcj5r77fcsxew5s6ypqzsl258t2rv5x5ms4bv294a7qgl16itr17t2w2rsp5b46fqxpqsja174czxbnzs2a8dcesw1qixgoi6a13sw9fpw449kurv409ledtngkcf495s1',
                node: 4551843937,
                protocol: '929zp0qa67vm02qmgnrh',
                qualityOfService: '4696i7612f7qy0ry166p',
                receiverParty: 'earsvbrdik8koq53xqx3hc4cnszbh5wfgsqmgvkj6qm3vkipvjarir67ish7t59cw5rr8mt2w9wcolf51bhsfhzwtljlaigtvx1e18b56zsq2383aiwwj64jim4qncne53d3uxm3hy42s7o6gwi4yk1rbzrb6y0k',
                receiverComponent: '6ycszlq5iwzs1dvrxqmw96e9eqrtg0fl31gw9tyvxork1gb8hg3bf2hbajctpclfv3zc26r2jp62z2lhtwtit2o969xahsgawzks4xoalthxh0whi0jhyzf3zymgmy3pq38q8cfpbp1t3x4tzt8jvhp8pajyw5t7',
                receiverInterface: '7qs00suaiz68f85cmj55rvi7rjufgijsr6zyvtcmtl32wiq257k4cgbb48c4zuiqmlegatxjbz79z1rnq01aecm08ho7q5u3x50ipjg7yoetg3izwa8w5800nngffi6927pc8cj3d80j15i5mgoe6c0l8h3ezlb9',
                receiverInterfaceNamespace: 'slhu6w5qhrfbap1vcpdp16vtdbgfped2t289pikr4qkf41y6ho8d376sa11je42fcabnkq0owno87w1f3omjy14uvhhsofxbn0q24f3rojvkxf9a3062g4dtoy1qu9d8fnjlk3ws7rbjriy2izeb0cla19wbftnr',
                retries: 1447228510,
                size: 5919267768,
                timesFailed: 7534711146,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                systemName: '1y5oha7zkx3eatv7ndb6',
                scenario: 'e45bor9ltsja1f0ze8e5yn82fhujztub3ri103tp5cpku51yx1ugbwv5ykts',
                executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:14:19',
                executionMonitoringStartAt: '2020-07-21 19:08:56',
                executionMonitoringEndAt: '2020-07-21 16:23:39',
                flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                flowParty: 'k55y3ndmfheh45licby1sx1rgl6kkiyipstczg0f70aaaftfe11chcxxc6zsr30pqrtfc35aubcqmbscb4tne32nvl0c1ru32c23j0sqjd6w91q0eo82bvphrsg8au98szwcltroyym7scwwd5ukfzoq01bp4o3s',
                flowComponent: 'o0jkioi5qpl9gyvgrx1d1vam79aiqx7xzv3xta4g2hglx277js71hl0878ww0ytjujsocuaesom822u622r0mhxg76eq0jnjnr9uu6trr454tpk83k4hwhlkjsbd39da5yafahx1pk4kzbddfo6xvl4fddeu4w6s',
                flowInterfaceName: 'xvwwtusrwqbw5ntdsk0sdaz1mvo47fo3uz4x0vaix3ymkti7zqnbjvxbw27n9bn8r3rqad10aikzyvtgbdgqs8f89rt47nsezve22mu41864tvbbqpwtl10vmt5pg239mvle7nqcqr2ibt1kg38lecy66hvfxqtc',
                flowInterfaceNamespace: 'c04rwyl7u53jzrzyi4unrqpu0u94qnrritzoxtyo0v04ppukw0e1m9zc11oy1ztvvexpjj7h7tn7aeakqmf57omjpizjstc8oob9a89j9xf6tq7a98q35ep0y2jwry00pnvmqqbm6hoyg8nerjhi4xi0o3t8f2rk',
                status: 'TO_BE_DELIVERED',
                detail: 'Error dolorem recusandae eveniet ut minima. Unde ratione repellat in. Omnis quis modi rerum magnam aut sit. Quam aspernatur in amet dolores. Voluptas omnis harum explicabo nihil.',
                example: 'tgz295wgk7hl3lv66b49z055db0i295p1za1qlstn2bgn1784ws2l3dv98r6dwa9r5t871qgylkvwax9s9dl0orwxwvwhc2jqg2tv73igyw1xihvu7dfsh9afc63wwpv2povikqjvn6hv2cl5u6sz6z4fl80whzn',
                startTimeAt: '2020-07-21 03:37:20',
                direction: '0zre3s3hmgr111wj0lby',
                errorCategory: '9npb2gkerk64vuhj4e4xkltlq4sxqth9tefklvskbos4i6m94cocrtrdcjud47nadhde4rj39rhe5z4j4ijuu0p8hm7g5np00h2mdpa71q3e8b26nluf5th9qsoavnac9qnqhg326rfmvh1ank7jiebzv1huq5wp',
                errorCode: 'wog2o67w9tamj9rmwo3d',
                errorLabel: 'qnog475z1t28sqaxevcii9jkis0jvj3hms2voqiottl8upbzzwgzy6gw4m32jhk6b44yk2z0wejr84xhtmssg2dde8luotp4gl58s21jebsbqw4xeqw018y6h7dm409ag0q724fab7ehg7o62zmd5os5bz3d5gb5',
                node: 5120542585,
                protocol: 'tg2tm9amg20aci17n8bc',
                qualityOfService: 'bv4eiurf67nhd35anl08',
                receiverParty: 'mleavi2hf6lcfpxft5qa9cj7sut8576mlzrscbcglcccttrfvvm0x3dertcjz4x6kjyfvum96ukevi37q340ohs2lfz6o8qwi1db9t1wnniigk29flag1s0lrwwtt6k73hbvuczl3yddl1wuhn0k16cvxhlkyupd',
                receiverComponent: 's46zx5la3auygh9u6p755edl1c68majvp5gwoio4ixame1r07dbmw8zvkeugkep1k01xmxigxveechmp5i9f530hzjj99tvukywouaajyslmk7m95fhmrpmydctm5jfgpxlvt2tg49yo27eyg8etppwh6vjwkns3',
                receiverInterface: '3hp55n2vvizp1osxmqxom9klatvc6uzrrnwnrtqiaq7a70dgtdaw80rx0fs0wkibrjqbhhpquhsvbl4ccogrgxxto42dy6ou5ry9ku8al40c0duhn0ruh1jptyqs5fj1xdndsqmd33ylfzvuvlhn2pzwpsuh72cc',
                receiverInterfaceNamespace: 'u05v07tt1z6jxeicf6oaqop7ml8nvw7rxc64to18dbehy32olw5kc3olbf06q4o44luyz58gmnidnlxbc9byhgqeeahwb1cccuinxhbxwxl8wixjr5alrnxrjcfwpg1bcpu4jcz35t7gpyqqhhh6gjrdsuheviow',
                retries: 9024722195,
                size: 9156475814,
                timesFailed: 7981892839,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45700825-9f4d-403d-9d36-a21fbf331a93'));
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
            .delete('/bplus-it-sappi/message-detail/45700825-9f4d-403d-9d36-a21fbf331a93')
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
                        id: 'f559b2b4-bc79-41b5-b29d-e66d6cec9f33',
                        tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                        systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                        systemName: 'xq1pfbbtjx0lzf8s6sku',
                        scenario: '5h6p5fm78s09d50pk6yyypuhd2wxrf7crvwbjk77zaqud1cow4rvn3pro0v4',
                        executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-22 00:32:58',
                        executionMonitoringStartAt: '2020-07-21 09:26:53',
                        executionMonitoringEndAt: '2020-07-21 23:19:42',
                        flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                        flowParty: 'nur7mxhqxyqjb6fsrgv11fq7iqlgo75bryi31rsjgasl2g1w0nwgym07sc6tk37m9k48k2gzmthmzs75rrorc9xmnbf0arnignevmibrd3wr3tl3ey0i3r2lq8km5k8a81dsi5g1p20lf5zj4l7doet1fsw09ay4',
                        flowComponent: 'tyt3cw7j79jk8q8vahk5ms12lw8y2545nco5qfhmlyac3zqvj25etc9ijf7q76fqw7gl1vlh1tulbj5rh3chlz98471esfylgojt9mr9ezvogv8q9dcnxpgvd3pusd110a6jcjardyz4v6cq1r5z63bu5x9ei1mq',
                        flowInterfaceName: 'puybsnleiwczrgmasdmpbyihwkwk4wyozujzyfzrnu62nrqvpgd9z042460ntx3rhpatp5cq7m1exvnkrohi9iau1j4hu6070qizq46ytm8m8pk2kdb3vwph22egn13ne1bnuwi7xttfwk54doyn06od7hjvdbiq',
                        flowInterfaceNamespace: '4r7vhqtpca7wndqvwp6fybwnxd30lrzrsqr683lwl30ywv36vfzoxkkciyqchj75k5biijz8shlo7rvppoxyc3a4krbup28zk4wnqx5e9byu4ztzj3zjmuyp6voqbgsrp1718rpgcgi1wfrdkd605gszawlizjhz',
                        status: 'WAITING',
                        detail: 'Vel voluptatem quis quos architecto laudantium facere voluptatem voluptas. Officia tempora voluptatem temporibus. Hic sit vel totam rerum. Rem quia ut enim.',
                        example: '3rqudee6yxfct5tj97sguz8y93w12z2c438yyp5luhy7eptyjuu903ogwx2xjm6xml7qec46bngoosg01vzhmh1rejlz0j76grm1p4um1huu2tqttwwbnu4lxebq3hfe1ys9sutd5r9hzvcq3q0il2rldy4piyyf',
                        startTimeAt: '2020-07-21 13:20:01',
                        direction: '0cy7ukfczrttmwpgq0zv',
                        errorCategory: 'ojm9gcrleyo7gzxy7t5n3ozumbuz8orratk41od98jbnpv2qv2mf5ixg2m6390zxsow4ik2xezrenuw91hf0jspb1mpojaw7synmi7rxd5sjw693y0kc2qjj003k9kjwfrgijfpckau9hmibyj6vghpom6cw63lz',
                        errorCode: 'pievlgfgu10dwik7jwfj',
                        errorLabel: '3m05xtkfjnfjo74q8aj7p0sltd78feuo0gj64cskfui0ejc4lgwzcuyg61sfno44am9mzn1f2hf7qbh5n0x0cty5hpct3si3fpwo2vote0dkifvj58j3hcfhd2zdbhp4ksl3p2hc4fj02kms8kljq300jwp0lc99',
                        node: 2807931716,
                        protocol: '34n3jk8mkud35e885bn4',
                        qualityOfService: '5m3qd2dmdcitkw2xwnpc',
                        receiverParty: 't657yzpb13rjpyn6afir66t42qp1cvxadbd71bqcjmxse1gmhqafg6vjx8azn5m1l9bytbisbn5mtfe0azam4lxehgytzbqfomqn14ca4ybgcorwypf23ezna4usxnpe7otk7s0o3ymwh3sstp04metkr9tlqk0t',
                        receiverComponent: 'wfq4du6i05xss9jpc5a00hxsbmte9kru6p4cmf1bzmoob616skna59q9j6rvjwzsjuwouvi2w6vua9txr3ui01nfaubqzkrph6mofx50vfom194pu6l7xfzlq33b8s5yc6328imtw7nutcaye38o875mckink9ma',
                        receiverInterface: '55zjevcxmxh2x6j4sovaombrh6b8y2wq1pmtwifnbj2xg9ss0aiq1pim7co7sfd2uzopr9sy19ibqd4k9x63fktzkz5l7o3w6d16r7j6t6uvpc9wm0xjcy328m70nemtpwsw35dvsawtm4uncnj3qy9ysueq049q',
                        receiverInterfaceNamespace: 'jsqb3jchnfnnu4y0xp7etqeg3fhha1d99gn1v1n0pyrsdf2fn32yky93pjp3olcl6nfuny8vpq4lstex3bh1nxhd3rur689n4s98iniiz7l3vqbx1txfwlmmq7cz1xjovssm5zcdvlr0d15uvkq4yuaer4my55he',
                        retries: 9822579617,
                        size: 9550234563,
                        timesFailed: 2328281587,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'f559b2b4-bc79-41b5-b29d-e66d6cec9f33');
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
                            value   : '45700825-9f4d-403d-9d36-a21fbf331a93'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('45700825-9f4d-403d-9d36-a21fbf331a93');
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
                    id: '45700825-9f4d-403d-9d36-a21fbf331a93'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('45700825-9f4d-403d-9d36-a21fbf331a93');
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
                        
                        id: '11d1b5a8-4bf9-44e6-8c5a-a14f1406fa76',
                        tenantId: '24ec1001-abde-4b81-8d76-21dbe2a575ba',
                        systemId: 'fa398c25-6ebe-48b3-b543-5736f741201b',
                        systemName: '8fls0rpine3zt4vau1xi',
                        scenario: 'uwhztzpko2oo1s7vn7wjpm7eenvy4wj0utqenx992v24rpzabdy94j6a4jsx',
                        executionId: '6598386c-d6ed-410a-b2c4-7665c8899498',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 03:11:50',
                        executionMonitoringStartAt: '2020-07-21 10:54:52',
                        executionMonitoringEndAt: '2020-07-21 20:21:48',
                        flowId: 'e4c04996-d405-4c33-a201-c07616753c60',
                        flowParty: '3gaufjbsrh1l7413imnazpqspbrriopkdl5dbbcscj83bkpanco3r5ns2u2n1n6wnrr6hzbng4pt0disc6zvg8qll07j68mnn7hjfmtiqh8yekhlxbpvt39tz81o9gzilk4cdn3y1fbay0fqr457gtge235whnun',
                        flowComponent: 'y9i58zc38x8t01sn0mek0m8qhs82unmc5vbldpgdyh6ujcjpbafqws3g691tvu0tu9f1g3drgzpd4hcdi25oanxwl7i4rgptrmarn3egqhzt303edhw5jbh4ts46t6oubdjdmepdetbtmp35f1bgr5r9493eew2x',
                        flowInterfaceName: '38j2dcztyz4eo4ke4zx39ckkzxooxybi4nfv2a43w87vba5mzviyai946pbwr1jnkm1jluxi4o67096x1dcz0x9b71f4i9acbcfyi9ten5ho7gvrb1sy1v54m0s0s99tgjkanxn73rtksgbecalwhjp1zkrd2zth',
                        flowInterfaceNamespace: 'adplr59m0mez1we8mo9a4mfdg7zhlyzlr06zks4o3mqa7y69r305al0da8oirnpcrbwsji2az5s3e51zxmutow5fpqvyj3jshf4mqwd4rq16iojbyvo47a4u44t68b9cpv4b5ygcttsjlz06pvb68j7lvhl6s4h6',
                        status: 'ERROR',
                        detail: 'Sit et fuga minus. Deleniti eius velit sint qui numquam nam dicta adipisci iusto. Consectetur et provident doloribus est commodi expedita expedita. Voluptates quisquam eos quidem. Nesciunt omnis sunt sed molestiae tempore qui dignissimos odio.',
                        example: '1g6eb7vy58mfl8inlizw4rr5w939bq2whk4x8bfjsksk25bmxdlpi33evw9j62djoa99nm4rt5arylbbuz1so0nphu2d9mji4ybh11kxum3g5i57but8494a8f9leq8b3n5y0u9jy1pl7dcd3uu8olpaiylloowd',
                        startTimeAt: '2020-07-21 06:34:15',
                        direction: 'vzsjl4ntvuijc2qzd5wm',
                        errorCategory: '8a6inavpjlr70d4e3yn2dbdl6zyw3frscvvbypl9rbvokol11e60qezwukaq8g9ht95sgpo85bgaku4cdwz4guv1dyn4jqqi4l3ya84hpd7gwxmp2pbpof0wyywvounbu2k4lydwkobky5lem1x4wvvpi1aa3dp9',
                        errorCode: 'u01lra8faf4yiw3orbu3',
                        errorLabel: 'rvn0ie2kby3b8160iq2eag7nmby1p2l00r4xtt7csc7o4f5be2jp3n650bdbt6xgh8tmg7p1odyygx4wgpjrabs7jyaxojxopv9bgmr8h1dg8tzssqp6zvjumb9y2noxiadaq56vjvw3lni2x8gx2u1sgjbm45no',
                        node: 6878050655,
                        protocol: '2qq4h5px9cpsz5k0wh2q',
                        qualityOfService: 'dpg51grharo005qd1xes',
                        receiverParty: 'a30h5wgjgyc7g360wde1jlwdel7eiif7r3bt7opqcyexq7m8erxxlqfup8zk5zixdrbjca4236ahofagb7dm1204s555hg0qiqoz62aiue1slqnamirzzm2klmud00kdt274g6dsdw62rw0ry8l35cpblq29815f',
                        receiverComponent: 'q8fcig6rt1ttnjdkssj32yn0h8wo8be21kmzlusyu9yexlsve8s5dpzvfc2av7021bc6bk9w07myc5cxs8eboyurggj6ic8mo4dfc8cr8g791x3c1idtnb9dgiqhckzhqol1fk0gclcflcphdntsxlsbil29siir',
                        receiverInterface: 'yfa77evu633v94qja948ojjhh3bhugqjov7qhdv2pu3dbcso136pc78z0iwbmi4rvse2mo9zzntuda5zhac7ybfgwm0sfizckz49x6cfr5nub0td5nx9cdgsv6gx92rvae0ti687u3qennm8u9n1wgz5n5icv9ny',
                        receiverInterfaceNamespace: 'ryy3o4xm2nrc8rmr8aypbtxwd3bjdleq8zvnxrbor4tzdu0i8q84arw9bouiaselzh4qgdnvacjm3ut8nh4jmlsihoq3q9v8qp8iz6e2it3c9pftifttr45ici5y5qxbwm7ki5f2fwxfscm64n1qwutxjw4z1sc4',
                        retries: 7318305878,
                        size: 7878473349,
                        timesFailed: 7071836561,
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
                        
                        id: '45700825-9f4d-403d-9d36-a21fbf331a93',
                        tenantId: '136c296a-11a8-436a-aab6-0a9f7e4c22ee',
                        systemId: 'f0aafb29-c406-4ece-9787-2e632eec3833',
                        systemName: '8x6ko8rutpnspft0demw',
                        scenario: 'jlmgnyio09i45ouo16r4cic3xhur8xd2csgb0zuinth6w4dtfij0vo5n4mw4',
                        executionId: '784d23da-a6b7-4fd1-b66d-b546b3825386',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 14:42:24',
                        executionMonitoringStartAt: '2020-07-21 04:06:04',
                        executionMonitoringEndAt: '2020-07-21 15:18:33',
                        flowId: '90a21551-3c36-445a-ac70-43eabce33ab8',
                        flowParty: 'h27agsi7vli5m7ltmqn2ic846obvkhpgyoitxg4940ntqbed7xhmtlc3flh6e9g03bjpgmlh8a8wzey17zymfjr8m3oo3o52ix2go7yj4sp8foou7kk8jlb2wecqs5nucc9nr76iajgh202k9vp1edhaqmzk6whw',
                        flowComponent: '6ln0kgxxowi11rh1cq7xik1er4w294yb33d3ani65epfy592j9wddh59bxuh81hrm28fmgydo7jxpc9mpws5ndl90nci0jbhpro9j5tvkllcxkcgi86e1tlxqnhu1cln0067ju4h02mssv7fxfjyznqiopnjipss',
                        flowInterfaceName: 'fcfi1omxtbaqx9petx75qg7rl05db09rjhv5tn4l5rd74nhntfxr69s4l09en781rn79heeavm70kotfkh5o1kujkwfz1532yvhfrc8xa72h8i0g46yqk4xsy01dbzk6bwc9egbi21ewsb9owhofz00nf0squ2vr',
                        flowInterfaceNamespace: '7f6wcuxs6ocz6x7alkw1xj1d9q39q0c4yzjbe4sx3f8ffsldt69tkm6wfqf5fi34w5g6x6zh0rz3hmwsxckphjhhof898301dgr8i0gigvimnlfvpbf6gr7m34qs6imzker9ylgmdp6dcsu2kk5kt1z47piwolsw',
                        status: 'DELIVERING',
                        detail: 'Optio et dicta. Et qui veritatis et qui sed cum. Atque esse modi qui rerum accusantium sit iure dolorem aut. Culpa dolor soluta et tempora quia inventore illum quidem totam.',
                        example: 'a5pd202knx0kkhshwsvgtsy9t7axcm4r19j6fo2w2tj7o7snmf9ybdrpvie3pldc7hqfrwzmo39xjkajn629efmgnv286rm2rgwi28xmz12wekuuqxvl0pbhevzsikdlxni66vnlm3m81kns63fqr1nd4rdfc8rt',
                        startTimeAt: '2020-07-21 22:18:38',
                        direction: 'noxd6xpgti3ftshiexek',
                        errorCategory: 'a1sw3t08beu3g2n359rq408cifyafs7qqz27qvag9m2k40banfjr6nvyuwviytixu3b71ukuxdv0l7fqb3w6btwkoh18aiwr7hzo06zyab5a0okclul797rxj811rd3nzuzeob251awqpalmn5fth8wfn3cytx1j',
                        errorCode: 'intyx63a38fjkyp9g1y6',
                        errorLabel: 'j1rd1y72s0zj37tg48wesrksipyiwgpp465fl13hfbpo7aevj38qe64ntcny8trwwup0vwhq24obfizhkqs1fbog4tdzahz6qo3tzhjmed0rq9xrcm0cun1jx04nzp5tn3cq2ms60vm9jqhassjpmop6o1fu7ak7',
                        node: 8732321044,
                        protocol: '41w9os5l8q4wbvfai2hx',
                        qualityOfService: '1eyvufpw9wymql9fuvf5',
                        receiverParty: '5dbe65epo8nt47asdkm2drrz6epndctg03ezsnlsuxx0lmgoehwtdvmubgs2mlvko70897lpygn4gh5pmfb1bygzhddhucj9gkt155r4wm4z1m6wrg1ubt7ksnih72cr47x7jujo7k33fxidroc07ggavzxcjpia',
                        receiverComponent: 'egqg6hsualg634d43hcdje6nmy5zlkif8idvece5wmnzd5p8fogdhzlnpa1yc7m1wtj6lniavw309fieqnz0laew3qrl3o69pj636n4txbm0dbomozwsmepo7bdeu6rxqje26z250ji0w61b7quzg2vnip66bzyy',
                        receiverInterface: 'enq72jgv1sm00el36y2ltj75qx5z6r8vnn8r8y244ulwyexu2di0oq1d88vkvig77ma7omllnvzix6gsvyq75kv20gquoxjpsqhf3w3bpmchz1vrhmhlkzt7fh34oidgnzowawix6415498xyngl6r4du1yv4d3b',
                        receiverInterfaceNamespace: 'q1gx52v01qrxrzosauogzgeih2jl2enwabg0lhp0hok1u8knwxj1oc8ma6dgtzvyuo2y6hzg14b2wpmm211maci0otwbjysxdx71jjd0ec7cy05lzaxso35t3c6yyyswfw5evjh3ulv3r270vq61cz8playy46dl',
                        retries: 9101102712,
                        size: 9526044879,
                        timesFailed: 5712220211,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('45700825-9f4d-403d-9d36-a21fbf331a93');
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
                    id: '45700825-9f4d-403d-9d36-a21fbf331a93'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('45700825-9f4d-403d-9d36-a21fbf331a93');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});