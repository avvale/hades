import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('channel', () =>
{
    let app: INestApplication;
    let repository: MockChannelRepository;

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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'prrsqmakgmuw96tpobzdnu6lxdjhjssquqjfcgew',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'tgrupn1p5ct9gv37n40f8e4nry1b6556gcqqhyd68jaw3g9iy9',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'g61v0qdws0njheomt3je',
                party: 'mmr1oym4fqfe7gvlxt16slr8daoyqwo7yhwb3del6lj96kmcxu78v522y0fq3rc1z3gr7hz9kxdomflp12kimx1wkwi8f0jh8pun8ge3joedqhxa3udu3biuchf5lcv7x4jxee9z5v2f9gvaqz7m2g5ff95c4yxu',
                component: '8ovw1bstml4vbtrj6uf74hcwc7fvzzbq1zav5245zvfbhpiokmpjeihzgkt7yz53qaily8aj7kbe62x756ccytdz48gqmd5jug3e7v8g2y01lm0bc00zh9phx50kjt20ddh3whvpjr1h7pb5sg9xflruqkvvsfz4',
                name: '0lvtnfwrx15snt6lglu6jwj1kag230sbjhzj950ucuuj3txuok8epzt6xct8e9s9mekbntxiok3jjc15hvfoqm2ufds1cebe70pxrch3vemx5ptpplo2mfjrn4jac03w9vr8j4mww06dfjuznfwjlpy2uu2z6fr2',
                flowHash: 'lvqwsibe89vc9vvmjy6z1f6qeqn2lm1l6ebgc0y1',
                flowParty: 'u4ku3s16dq5jwnw26w4izyzugwusznnph0p6d3oxiw45s99966uiys8amhc6prc49ulztusaj8pa36shhggwmjhrid5bovedwzsizqf7ynmbjrxan38za4u74dqh7pj49hcfdn23b3hxctefgblbzl7ryevmhfgz',
                flowReceiverParty: 'anig39lnj2774pitotcor6d86uz0gixgq88ogkkbah01y3zxm6qpghev8vpvgynmucn90wc35n4yy1765xnuek1b81opljrxg2zlm3wvrfh717c79bi6vs6pzbh6bnn7fqru5ykmxml5jqd6wo983xx8rfwr3gr7',
                flowComponent: 'azakno6qm2k193dzhiznhvtd9ddj7pnclve4o9iqwor1aug7j21o75mn1nyhta9u0y88ovj3kxuz5bvli3uwrcxx39kfq37awuglhdceq5dj51rgty807g1sbpqrhxqxbyyhc8q1suzsy76nui0meef7n7n8snjs',
                flowReceiverComponent: 'cmwtbdhll2ycyaxj5gbhay3g7sfu64nzpcvzpg6qia0rkowfus3vioujynw86upf8nfrhn32r5s821vsnplslhw9fu57a9pjpfi9bjptvuq3nt6657hh1hf9jj3vg9iz8foxe75sy0x8gjh056zson59iwfeadte',
                flowInterfaceName: 'n3egaeyn4stf20ocf3jt6r5tc6ah0fpaz96dr1vg46xuqfq0nu4smvaim7sfgbon4ck9g9tw65u56d2ll99b5aon28a9hktqiqcl9cm2qz3cqepvovricf807nto8v8oxkzvksgpq5wwb8uv7z059g2621jwiwl9',
                flowInterfaceNamespace: 'qdd1zg8xeeftz8akdgw15462pdrhfmhl4me5zpg1prtxiazkngiw2tb8dyt7jwt5yyl0o9g2w72zm3739mclmtcfjdqxy65zypzc6zj04o6uk141b229g8k61fdniwdo0xw7b1swqkces7mp7azohees2qlntcjk',
                version: '1v8rkuo5dhlsk84ozw7e',
                adapterType: 'x0vwybn89s3cjsh1a97owwhrpu9sptduv78z2lptnnhepurjg1620it9re6i',
                direction: 'RECEIVER',
                transportProtocol: 'p7hx2fgbfq8egq8qkdwen2z11pbqvl22zi7gzynfo9mfhcpyeykz9orrrn7n',
                messageProtocol: '4ktvi4h5odijh3gn2pa4drr5vqv6r68ce5oz7qfwibz4gtapmlgtq340qs42',
                adapterEngineName: 'v7i2565lcpk4jmpr68ksh1mveq8gdyzhd030x9at17ek81glyju67ugse5p1i67t8l1zqfkxfxrvqqtktvs1l5ajsykoe0971fh77e7pk63474oyhqclcyf21mbc673mmiop24d2fx9c0fpgi3kq2s982p58uq94',
                url: 'fkekhwzccbfeshxlkkm9ah489tj34x11z11mxrk0lwbrgy50vvapw3fiunrj0nlhpm4u8e22wtmib7qc6c5umoy80yjssytn0j6gnghiopiq9rptrmiioks378dalasetcsofw9a2py9s6oo3a28r9cix6l79hwi06wrap8hwvghuhi1xqq69g51xxg8dx3nppeg2vj8jnrhwc2iks4sdbalnbuhxqu841pschqbro3lmyg5wxr6pjp8zjd9eu7f8a7u66pb64ks177kh7lnpb0qpnuhpzo9h9yjd3e10xvwlobseaw9wh0nnk65pm12',
                username: '94vj3448yc8ahjhi2ghs077ggvt7u6zlgvtfcwemz7affpk3ituq8mtw0ffo',
                remoteHost: 'rh4hyu9hzdafdldv76cduvxylb9rkjwtkc4w2tkmkgj5dgmzwcmrncme9ocgur8hzevir4xoyo3t9jiwad5v0vl2fz3jw6snqlav33d8v4qnd7p48py9k189lo1waoo71j8av5mjzf54617qt6z7al3l49iwuic3',
                remotePort: 6721279214,
                directory: '0sfsacts66ldh6d6dtn2vy5adgnsqj1ptr8t1wfgg101z9j7ryxehu91sss6squ5ciym2xs8ft5tdf3zmb9c39s2zi6betboenm7pi3l64uyy60bjeqv1n7xhl286crc5xc0wsw5ecybudf4rieuq0dsr4a925pfhyae7lpbsaht4aw3iwfss23ysqlwmzpk8bkjebd6gbwvruu8dhdkqojgf9ekgvsel0gopoc7z3ode8nt9h46bzwezjycauis6uoywhepwo9ojp2wujdw4q0v97taf8vbyxqxju6jskw181ioms72d991ta8ej2rq0ypw0u3mzrtl5aesc7eqlcqvbsrlwn4ucomqzrpaz04pz0rai8nfw2vccmlyas62391wbrzvfnq9f628aj5ur6juftxx859bj7mop99p4fqbjhp2x5kwpls33uff9i47bmd63raeskbocd38i7k63k9xvdzm7suercvku62rnbod3f8tgy3u9p0fhy9o50a3dfme3l71vh7q6rms9k5qjgjurh4ldpcntn90fti0eqz8r4p0lg5j00gczkb2g0t49ec1q71ybnadmy73sylnaq9osowiazrnnc4aiwfhznnglvqso7w791jy3uolxy7yw5jqipu1aymcch588ho0u1wiyekfjngya3vd0vabsevdhxxvtch675k6w4oxhw09hhjg4o5h7p4nreprntg7j65fkuvazh2dapzpazteouckd8atf82ujo961pvm8dydoy524xhgtlpunu8hm83n448bf3hb0xmnia7lo9ly0ehkewza50gpvwlx89ri97m94y76ax3upugyu9l61ykugp8suijdxj1gw7l0saz1mnbwfl545j1kclsyarfm3ib8gst92f155lnswdn1w3l3hxy08mov4l0s8ts8u105mp7uxk21i736oen0xvnltu8oi0p119rnw64t8oyzb6mfkw8q1x7a444wb8baqtjyoq1tn168xa47692b7utysz37',
                fileSchema: '23v306kthul4c0yph7n5gcg9hhzeckzygc6y88puloiow3l5dja3mn4q9y3jbjbgfsryd4v5bakh5vwsq9qu3qp55i2c6k4sggm3m4pcoyszdsgtnqe4xus1qdev8ttu7mbdf8mo5ol7nmw0u3m6rv3c9cl2azca5ihn747cft0olslsi1cg9t4m3mjhul9em0v8h1yaxsx6kces8ppo3sit1bg80vppdjdginc4403brfdlbtlvtajub4o7o7c7vjypbbhjfu1s3u3inic88e95sxt2oge6w3kb4la01syja5fsbqz4i4rvewozzeftpfng29i6bh57rjievs0i7g4ncd83p6qmey7preebrgyew52uh5i7m70nj33lifxb99ixadjdo8dttoqeayxk048yhzqkpgrhex3d4gf5rc8gia5d6lmv5spg6kpxgbn3fm04i8km4i1wuglmnee7heqjd9gss8hvajoroaej9l6e60o54ldcyxavogzok18tzkqe3ib273i3k3kbc01tekb2icq5sqwhq4uzskttcbcs7r9tivv2o11nu71u94yyy3b4hj2nvfe3ahkbbgot3okulgdmxl69bwafaucnubmawskq4rjmnehjfc06g1qblvd3aj5j82toz9ir1q9bksivtmrhuacftd4k3uhaxffb4agekdfvoyfavnd9ejjjl78vhljub1e0bm6x5jd4z93tt6vvbydcx2wbhw0h168z226gfboyxyne01r6t416km2iqztyxsjg4opcaahmsbspd1e0ae9xich2f1fsixyq5qmmy4ea5a1vykpgsu3fgzduf38dxhlc5afgavbmzeympo9yr2cxyapby2pnlfignedcpep2uw9bxwzowoq41rpyo5oelsdcsuc88wjxr80i5hiwxzwed0h3d2y8w3ivz8rxnfl4e0w77vvv27imu01x17yt2w3b9ioo0tv7yfhkze6vxdpw5xfulnm06citsnk8bqbbww222z6ymv5b',
                proxyHost: 'ltfh7j0wgmufwr1v48dumh639efmeztx9e2yqgykmlyeh6acn2vnys21agjj',
                proxyPort: 1976702253,
                destination: '9uvudrcopd135qfk3m0gco08batchafpwa47fdyu58946isa7wwneu9gfuqird4dfazz4gk1gpx4pm4ts00fp5puijua10gubncutnfs57kxgw6o2tlgys1lo7obl1vljdry80nzi83e4z9844dp8wqb9ju771cg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pdxt9jjg8jrlf9ajo0ttl8mm0bs8nmfavsw9pzunut0pbk19oicq37oqijn3y4iz6oac9nblemwgw01gfj6rlsoeyjbrynkphkr810xxaa8k336xvboa7blcr02gck5cdg2q06c0b0agj8lls0k3qoj15xeo53cy',
                responsibleUserAccountName: 'jrqfkrolgfwooefchjz5',
                lastChangeUserAccount: 'lpuz3ka1es8azu6mqfao',
                lastChangedAt: '2020-11-06 08:47:45',
                riInterfaceName: 'glkn95aomisijmwe2piv749bjvttt0wyr414esgwwftdjb7krt6aunn40nwmmyek58dls9psa8a8txznig6sk1ap1h1s8t2lrcavwb8mgmf1vjhcu9k8k6twi9mh8ypxjarel80zzu0kcqwlk629nggdrwooc201',
                riInterfaceNamespace: 'k2rj1uo3krnsnkzl5351j8hwsn3vkei3g6bfmr8thilctijcz6rxi5a5rv35zgf51fszl6jf5x8viw7uuelx3lfuwyk82jnjeukfg4meknnvz2urpds0o2inwfgfwd2wd1sqsxkl9ug7nthdf7ts0wpxrfrft3y4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'zcy3i3mfjrcc3t8rfwplanjng9m5j1kwgsvt5j3n',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'f10d5kjbxrvct7e1m3kyfck6cxhstsnwysf3c9209383f5i43i',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '6cqb1yyuopsg05hhpqit',
                party: '33idmti9pn2qwys4b9zcuergj9iebnsofagh53vm3flnz8ragcpkxy4uq6s949r4vukptob849cuucj14aau2zw9mzaf2r2a8kqyiinmf26tkxz9omcf48d9nwj2vdww0jlb9nmbmynmjwtp0ev7wh0qwgt8n9yj',
                component: 'xebtndxjqif7sdans431lehie5m20dlw8nbjwv99u29fpanlcgkmcr1s3ohfm4mfwllcvuzfb8szo8dd0175jc6e3k06psadehf6o2yp9fub54vt021t5of44fgq0fnhjslwbkgfve3688rj217qa83vawansufg',
                name: 'xxdm72iguv01qceht3uu8bl84q7kii4orcwkdslsvuz44h7humq33p2ij17ivohvgax0idfp7ckb4xwafvx04a66tpjbfbs1b5uhayf7rvkceeyirha7tcyvt4bjr7klnjqwxq0y3735b98ud31fd391su3mha0m',
                flowHash: 'rt7mfkz8dc0bl9n98xgolmpkzl40l2vuo29n3o31',
                flowParty: '2twl3hs65be0j8mrg52prw2subrj3mhvd5wd5soesazhge3tl7i4bpzdtd4otvhg8lnjo4fxu7mg2u05en9lx9m771x85n5yclpfn8t9c32j7k9xqsn6nd2lxhqabr0npc4h8smsl4jancg54ese0j4gz40xzpy6',
                flowReceiverParty: 'int34sxvpxzblq9j8yqu8320r5czmzlh4rdrlogho4yixyn6kd0pdinl43r528ljfh91kqdk2gcv41r76frmgemofiomjs7vh69ykdamxhaeiu1on0niqqs4wj2fvz5nslqcr2lwa1pa49f65187pzayd1p4bczz',
                flowComponent: 'knfsyngln7eui5p8v35w4omutxacs217aut5i9u4us816qhz6jgrypvjopsm8o5cv89zqzzua9mozk9lbo6cki41qgroz24ulgigcpj87o9smyg7184w5z646qpu3a16detmcvqdi1q5piq5giz89ck35sam4a6t',
                flowReceiverComponent: '6rizxtdoqgjz8u1vizrw1i5m6txw3xzrc6hkfgeqsu0y6qo5mtveozfd48flvht3izbbhshedk6qrh6p0qphmk9gqqhrjkvz3i53fnc3rditf779qhbe15v53t9m82qfj3vatziehprsuqiwfcy2sqqywyccob2v',
                flowInterfaceName: 'bfgowb8vtlljs8o59v70v2o3sq3w8zlrpd47twtq0o59rf50ard4i5ooc3ot9s8l55r051cjf1ld8nelh8wwoqiq8qbw9t3u9x9olsj9vq8gs1hnj6fnbz52u32m53g1v2pd8s2d74q9lre15wbrtyag9pzkbwex',
                flowInterfaceNamespace: '2q5mk0ybkauuezc1kq51fe2nx5l0b00hpa06x507sbcribeww0xwbfjut8suxhwqcz7k9pwx1oyq5x7xe7mo138i21flxc8itpi03bgnkdsgii7k8ihofiptrhrm8f4jo3pbt42x0no7349tkl2czytzqjarsu8u',
                version: 'xm9x48ufjeru4s6yiu92',
                adapterType: 'x8b3ciz92usa15l2xcnkcryhkbgjus0noq9szyj51evdu9yuy9wuuwivzdga',
                direction: 'SENDER',
                transportProtocol: 'k16g618vzpzuczc9wwxj751twdg3q7yjpfgrxtnrju4v5h7c3i6uif1j5wiq',
                messageProtocol: 'p0ek8bowr15k6heguz56nvoo92uujm3ddgsvw5do7h5by58tk8makkixrelh',
                adapterEngineName: 'fr5qd7oi0kgn45nn2tz0869rntswl6szgjqlrhj9mzo4cvr8zigzty16ix9b4oxyj4bnxr92nh8bcdcl68ew2m1t51j8blooej52tij7oanilbsoxx6v5nqv97mvt75c0v4hj2o8kbx829qiz8cq149wn04jy8pe',
                url: 'ftf5rucpomhdebbu7kctbbpe19h7apdi8cte485zg35wlb3rdjv5x5iwg5ci5kze8qpsr99biud2fwugtxf580jxa1a8dqloz8pejqc1ayp4bkch6px86k6agta1oq676hzlf3h6f7zjpkw2zditra7u2wmlt3ex8uokphkb5pk9yjvbliwqxu1qx6xi3xrgmnlpfq05ricp4xkzlrqyx2njg9ojpfs3xlh1sbklaar0vhv5yedou8gdkbo2fwca6zlubcru2mr69db4yqncvbhlb7jo3cv8k2ksmuagskmtexg5cjle4ui0k9fl2et7',
                username: 'dpxtdpwkx3mnag2es7l0z7tld8kcyi2t3fg46l9nervz90mmednevbvl3djl',
                remoteHost: '78boje09aifcewbtwcny2pev9qjf0myagm0jxu3429nzimhbkhtnj1vpw26p4h1mv51ntl47y8eydg1en4j7odvuarn6cc1dyege1h341264sm4bvt29lh76hethllcmh7jkms45xcyn96727pc6beregfsjw9u6',
                remotePort: 5249885231,
                directory: 'qxm4st2a9xq9l05vw04do59jiu6njgeha4gbj9wty538xrf5y2jtbuqbewhv0tvif1wmix4kbb4pozs7doi9wlmvcssec6dsac9u3citxl04wij31k64jv81d1r9t67nwprgn4ku2bbqxqgxqn075cu054uijdaqtgzjo4zwfx6homxeqgzg50cm39celbqpgs0cuqd8zwygbam55x9sb9egnutfcby8vhwxfd32bld7d6o3bzipnje7g0d569xj28ualqwbdixlk62p95va4lqh231soim3sdc8nmfpnqy3oaejaa96oy0k742dkk7mxmk9pk530kwg101wyx0o0ymha44vbmczipjbk0mnwhtbwyt2ijiov5ves6c6x4c6i6czh3zcedr3wjcbqb53065awlcpq2jgobbabvahdb3k9vxj1tthic2x0x8qvr30bsbzzgwcm2vejsfxsd6f4rxiylkzkq9g2rj1i992bat6lsvk57q9rupkxrhy4wls2h473jf2iiuujycusn9mt0thn31ctlawd8u2xc4n2nrwdnfowh3g8qoxfqw01echr8pg0esdwota2uo3vodnc4k4obzmnmbq25wxr1y38cmp46p6t7152c5livkf3yxgyovs0q2u3kwd5ij3eiy4f2n9xgyo2no0we82zxlotqnsaccd0ji6xvbk48w071wev86nemngmwoyzamcfp6ilydra8k8zjm969g3kzh5q3hs88y0vb97odv7npup7g2hgoecqw34ru5nnvwkyrtaqacoxtbv8gfv0kmvhfdp4jbmothjtcfa641ejf2ozzvhpqidx0dm0zhxjyd1lz4duyzbph7bd1dniy6vq4tiyp3vch8kk0zsebttxsom1wajfpug1j6qsgfi70h5azk5ybmfz106z0j8cqwbn8ma5mlvcfkf1wmfgzhwrz4goe5h1k3osvj0sm877o5taipyannfatj7l7g0y01muos94c4fl2rcmjo8lbj0b5t9okpe',
                fileSchema: 'ehuha6y7ti9nsdxz5tw4ogalaf6qe9zueq09aubsqxsdxti6fgy0bxpcac1fshggupive81kpag2lya0zijedmzntbw0975r7xu9aden4ckm54vlu0gmiwuf5rtt4f75vfbhptlwpfbiyzxjovzt67k84k535freexk3sqlhdgiuqvye4e2vzsm3qfx6edsdroygfqiwk78hmdng9jggwy885g03jjzuwvphd5yftl0gc1ob4pxgaob388qojg7ej0nn7vv1c0djztbl176ztkh1dfx1mhlef7hzfx7cz5rupn47ylhsdg6uuc1jpjhc8up2pbqk3jf3eldd0iffj2lk1s501t8sxfb43ejdni0624epr9izszuen5r15b5og0txrl7pc1n77juo7d24o633g4cvbxeofi56n0p4axibtilihtsf4kp8pg1gzsn4zc5w35k8xtj9v63nfu8xy4y4h3o80bdj9e0aca5ye0knpdze6s24ohjfk80t7tquynh4t6v99ryo2934766g5pi2qasppraycuxdibbrbhzyrz1m3vk5toy5o2cxvd1ay4foills9jrfkymeek2j97mfc55dbg4cd3e33vc3efrhidodjdkfcvjoj6fyqmlhzgjp8ro4scvvf5n1k4iee73fhpt0pnv1jip2trw026c3lvms4t4ejszdzhqeaqw4ubqfbxshb2y67vnw6suuarhvhnuj5u9tvnwofneoy23mrfy4kh66mky95iee2bgoc8v4ww13xayvtgc6drz4hty0pni29c06424y07mat54caob9kpvlwxhiidd8sx0fy42tgietqzd829k8fazk1yy8yzr5lskdgvre0tvbja8ftaqc2rf9nrb8xsnvizmsypggx1fx7t6l8b51nod13osqvm0h0l87b6jfxy32ys1uakk1tho8a48fcjfpx9kzrb9h4m15y06yilmiavd1gw22sthy0560cyjji6y3fjlu65bvjkgixgt0344nuuz1',
                proxyHost: 't8rfy8m4o8h7a6mn5x1vwlgwoyfeuot7d7759qeb76e189x6zrt2p17nrng3',
                proxyPort: 6322663214,
                destination: 'stuy51wq3uaa6rzywsurl880a1nqo2qjn2ynxtkq8c0k7bwoy2dct0msp42g6lexp9f6a3mj1n36fggb8vw7xpwt307uy9bc0mcf9wm1n8mseajku603yd71nlg3equlu59qyh9krznw9072bnsulz9orsdtez1s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'phxqzxcpf0xhh9dvgugolj7kh6xgkbi7tjci326gpikwskreww03qgul4bgwos711x9vvdsjzjipy9h101wf6mcj7qikyoezaq8kcylhwrjv29gjbkvyy7n4iubld5xjic17dsc5qxdl5m160f3wo9a67j8h1sv3',
                responsibleUserAccountName: '4c3j5j8nykc7s94ax4c2',
                lastChangeUserAccount: '5299y5y349rl4r94b7xp',
                lastChangedAt: '2020-11-06 06:49:00',
                riInterfaceName: 'gmcw8njdbr66q0cryg9bwsmtx5826tgxsx5nq3qr0kdldugnmz7kkvpch0qozsha9eshjhg5zsdrylk6wofqfe3ydm43sh5qcazgrep04cgbf96yssptqvcct41cvfe0o05p3apkn4pnvzysk57jmmmudvcsiv57',
                riInterfaceNamespace: 'nrv3i4wcoyhaep9yuh5vxtji1wx2ddr5l78oym446yejomi6sycffv45ow5rbljll68oip8myi7e9q5irm9uzb12u4yamsx587116q05546w0pwwl2mtpl82mzvmz74lddrvfexkki874uzyi8fi4d7vvcuratp0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: null,
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'e1t07267q5sdfbho7n1zwzdg1xaip8b3sscerqpjmk756e2a2x',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'z3biwq4amdc56zin2fn5',
                party: 'qvzh4oklch5kbj82wnta6bd43vkvfjdfcnnn24erg689krya84j4alkvw0y3w9d381w7zhbn1oa74a4kbsa50km5weehoku2e2p3iaut96u8mq4abg2km1j6nifbeje6xmnkk6nqjhgq82qgxdvp4sji6w0n8xaq',
                component: '5aedibm2wxgfz4lvytub769ce7anlfb627wi1yt946ot5cd4n3n1muihqw29vfxjvdnturmbp9lzdy2ijtawlaavl8bt6b5kxt4uuzvgfnweguss52u23gxxrpze5877qboi16mqkudr6251h0nosd1bjt0wbhy7',
                name: 'oh6q5utfutufpy2lfv7lx3hexbdevkye02ymsyzu21l52wbnkjgv5h5d6y7dq9maa5c0cgausr1dlkfto5xc5s37j8if2z3odpoofwyzqqd14rbn7i5daiqps56zuu5txfsmy6ofx4vcma2q2b4hdh4epkf4jhme',
                flowHash: 'chlupxdtuqrcorjkob37x8ndqaunh5vmekoml9am',
                flowParty: '3hgs9095fszmuhh6z1z234kev68hk18bdv2uj9njumyw08zncauv73ks3cdhm3w5gptxpl4z3arv2y6ckolb1hpdydnsklz0f3yrgtipnm0b8j315x6545yzqv1vmr30ksl2csrltw3ka1jjiuryktdk8cliy6gv',
                flowReceiverParty: '2edv9erfuurwcenvuni7o6przgy0s11x7j7pdmceybd8tl1fbgkzken1792gnv4qxncfwopapjbo7wnf4xgms75ofzoja82rd2rlk9tjmzf9rie7qqh6otwu09zz211kmnlb99n2fgphfuz30ejxn8tc8helrytz',
                flowComponent: 'l6kgdjhn609oalvqi6de42ucrneuky7eecvweaxoxxpij3cho0iu33t4f6fgyx7znmi3ryof6dpql0fhhzzujppwwl1mus0ac7afz9742e196dbtypmsq8qpz0fxfe0usyijru7vyqppe16g07mj9eijpalzfxj8',
                flowReceiverComponent: '2yokqml2on58f5g8w5rxta1dboatudwz91ghnb6jkkut3wvgy05kvg0a5ihwlsh84corw2kzxg3hbi618e1hc6yxvj8yd5bgw4097er9rjgb20rb6jcku39r7bgy71clmb7ihj8n4gh6k31cbfderzwwphjcpzjj',
                flowInterfaceName: 'thhv5idjuk91mvt7smr746uxhoeteet52u0unlnkvmj5ky4f8yky62zzwcvq74ogi2wiog1p7iy1ghgucs0zol2azjezymj93hkha567xvs415g3ijb75og1banmcihvzpf7n6vpit5m2bclg7iu4h0r1z62jsk8',
                flowInterfaceNamespace: 'uvaaqj7lkd5ez5m9rxmr3yqwymi622so7kfd5zs7070hr2vy15gfwn0193mlxswi3b0pft0jq6o1m81fpv9icsw8x9pfh7hl44ywyscofc0ugnr83ompfilbjrjry2fwkitcebyfwuleczyszis9rngqpnf4wisa',
                version: 'mvsedfnov4v0p4miby8k',
                adapterType: 'hon69n8k1ba8h8fbmhc63n8aho2mvwi7mf36gezcqksel9ows3d17usia103',
                direction: 'SENDER',
                transportProtocol: 'uyyxr5la0v9mjn0bfxbs3nlygi3wie08yn71a4238cfczzaxgqtsob56a4tz',
                messageProtocol: '5sjrdwpwql2flyfw0pof92453z7tz8lo8mpe5xwjj9lcifb7rw8hnjgvmsr2',
                adapterEngineName: '1ie726e4ng4dn69b7y3bxv6yre43a4skvsphangtli8qakai6hyfunv3vikeevgukm03b1wx4ekbhwz2djwb0pf8mlejm9rh1kenkk8d3zm2zkkgusrl3gs3c9lcjtv5xj8w7r1tosyddzymsybtdwfe3ukxqhm8',
                url: 'cage0eadjsqqb8xmgph6u8xehnlgyjwe9ds5cx0u4zc11306cjo0hc6ubk12gb7lt7kcohe8sornydvx7r5ij1fs5pjzpftqrskfvwbz31t0eoakg83mhbfa31i7a4z1c20ctde2ypg8mit52n57nneta976510mdf0v9e5w77zl9mnjmntvgpamlp3y9kvl07wqoc4p4cj60qbgvrhm75lt862p4g1vpx4qbda0sai0zrn2gqi0bvrduj4iif8pjy4iykwgmp35wbi15j61ga9khz9t0ht0ax78kp56k4pyljvums0squw34lefsbnd',
                username: 'is7ytllcjmuxda65pzvc2pop53hr6r68oo6ewlx1r1ulisrl36v604xpvxp9',
                remoteHost: 'xfc8nvrfrv8pb7wdd2gkm7cphq0uk99sysr46i0pq0nlqalup8r1rtmgfr3zq72nfrk8tgnbs6lhfh3iw51l7h7uxenhxmuw7uitf0ybml3zt22bd94r5y4ln62l5f1h4tq3wrfrec93su5jhy2zxkmx03zswsji',
                remotePort: 4053173497,
                directory: '1b3aameunho5d91xjjckakaa29xism8a3qi3780pjuzat75d9w7ttn54uku0vos5o0y7ueq5d48k9mrctk9g3k5gydc7fw6fjd0u62mvp37fo7l5z3avzb0pdzu63mtr625wxb336fbpvob0qw5q4mic0y9dc7obmspys0dxqsglmbc8awv2x33nwyv8w2lhj4fsb6hm5zpsma0gvgdu9lqmb41lg1ti788j4h7sv5zavoa1s6h7hg33nm5trvbs8yrrq73mgm7a2qx18wwekfsdylc9denf85m4xnnqkqp5616i6gl3khhc5epn7wofgb2s09irno6vu8b63opyrlp5pe47b44t0h3xd5ko12h34z0sb2m353x1vkrfcgpbt3dqgj28pjesj1up8hwdthqebwhne2s9xr4yrdcj40fkkawgemokci62lvhvii0h6qhulfssz77mv1j5u3mk402bko65167sifb80cv42tfvlav9zitupa44r00dl3p4wykcg5d7z68aq6i1kj138oujtza5pv3kzmabvbzjrh0qwtoiccty7yv6j4zd0moykec7lm4brb6mhnu7ianr5awi03r1fbdwz0cbxiesn5xk3idg91nznw8sa48v0c4fno78dsag5pgd1wsffofbd1x33psd1qc4o4su4fyhhpbdb7xovus8ydoyj9dtag7wwhrew96cwv6sg3wr32yvx1oqcjm5cpe6akjgw1m63m29e6dhy5ipzluzt0yzco8ip65gj2kht53xw5colmbz4xnifpm1fqnhn1pvcxwf5uw5hli8rw2861otx5xoaq754h41nzktbj51cxp1a7ysjjtkfq8isf9fhxyrjsy0odgo05uywllyja0r4vzer3azlb0gl52r517p89ncfzudw7by2kbonfjup9g62vwin6qo9dcpinjxlpssu0boclxomta3cqf9nrhhs2kjnx3m1pyzy4mly72etpz8sy80m863iecfmnyne2tqyku3jib7',
                fileSchema: 'ec0ii885v2h4sbozbxafmw82b1o7a2k57dz4uk2pogtwon1c9dqw3kkbbgkcjn14hhnu7u6nart3uxt7w7gud6t7gj9etgto3i3mdgkm11xq2b8aljv06pu431ezkdysnqh6sz3d4por9htmn0d4hlx3bazgi33cymf5311dpdx0h3y2txn9kguaxsg9fp3ar60dhe0v52wp0wfe5bnpx1mr7u77dhtzmfa54joor2kxegvc76qwnqp0octerqvwx358fmjyx1g5ggjhvidqqkgcfrjn0xvi61m3texdvx54ujhusne1w4wnzeonrahagjk4z08pgviz2g5nfbzjirzqungau39okdtsfp9ble5isn657vakbp35rqqha8tfyvwasmdaj214wkjn5oajz8oq8rqu4i2t7g6crom3o0zj5eysexco3j7fhp23ngioklufoec6dppqtq19raahns4532vi1lz3o9kpjxuhhzxdl2pbbp9rhoa2yvfx5h6hdyxp0i29d7ohe1celjxcqrdblbfcligc2gozij1plupbvw4moju0mveasuskrfqtggyz5914sxin6z4f78bx8d2gl9s46tsfxr3lafeuk6bwxh7wcpdbaenwncr1s4ivzvbrweygx35pe99nwg8hhtt82mg9sz3m23doic7l60t4pdq4e3m957xqxoz6b6vmd6zf0yt5jv4xw66mbakex0px7r1ohizzmgyy95nu127qwhb24z7mjwbas0bonke2vciadg5avhshudadnc31qh9ipfqy5g52lq1r4rsxq9fj1ipuxmck8r92n5r318ardnqohj5kzhgravwrb3xm37yzeycmzttxepaip7y35lok99e98gcjhgnlqwhl1tph67bucpqmycjyfba1pat10ug4o731tl1g6j6ohboo4eo9o6lvvt40agb3b24st5h3odv2w9yk5r4c4o8t0jzjle3n7ji1gll9v19u2zo0gnmnp30db0tnikb1vnnwsazp',
                proxyHost: 'nyl3iiuwdq2s0lidlll02nyjb7hs3hydgbp2annyfpkl0p894waake8c0i8o',
                proxyPort: 4248536917,
                destination: '0t3l7dx07s2n6ebfllym1prv7x7a1ck6xv3db4h0fmkffdhfhy64vqmt6cwjc1hauozvdbbrtuj8n9i0sjstk9fkhkc343gdhe7c2z53f3xaysf8e35tknliyomxwtgljrhiz96ns54khzn4je8gs58w3nybq0z2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y7tzcyqjlk69frh0pqaoqdq3d82wslofi4qbjbmki4zwfsynl93tw6kl64pitrv7glb5cm2xth18j2nf9kwpnb8u3st6memerzy0mt1ya5kpjs6tqzpdadevrarjned7sozo7mawmpq12fszi3gaw0ez0p0zxptl',
                responsibleUserAccountName: 'o8l0c41r054pqtwy0mki',
                lastChangeUserAccount: 'xdue3lkivplazb6e1pse',
                lastChangedAt: '2020-11-06 02:41:29',
                riInterfaceName: 'zz00lhasabshi8ddc67dssnzp4nvwo4z704twcrqmzwmiyth9l6qnsynfjhrhlwz9fa9mtw2f42gjv1xnqitubpegr7avuu4puke3kwl897wfs7zyl0uz5xxrubl6q6il1yeohqo88qdsvq2n0e9kem8www4a5ly',
                riInterfaceNamespace: 'mx2h38z28w0lttxpyh8ypsmaa73qa135jtwb77q0ozxsn23vixptjdgpvmvb9q6igzz6254uqclrhemlx1dm5olxf4vhplij2snlru0h6w0vhyu10erx393wwjgrubsjikdoq5ewc4pw3flggaxkfakbgz6wapeu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'n389nkgih6qudityoour98qzw9emda8mquw72i1d6jvsxt7x7c',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '2v1exw8tw3g52i63ssgo',
                party: '57qt9mjzn5v7hn3cr1zwpps4bfvjdjpht7sa3pdzg5ve1tc07v53c3g8b3b83jge1smz3slws4e1xq0ckyeaahfnlnoxww5575cs072xpt61xitj8phh9ry3tg449arole8nll5r5wsvircl2zwv18a85mb89su6',
                component: 'b7e12g49h8yty35ziy2f8l09rzz1coc5s1ls51c76xnkonxgg5ojemjxqtf4b5a2hy9juqdappgwzez6x7c0l8hjym430ibcn8jgix1uyfkku4kc2x24ez7qzsvgicf3165yzv7j7ktchz7q6f39fk00jo0hrsd7',
                name: '66q4st8i4azpepqigi1ofxuca7uuut7z8gmbgco5un4t710igqsicvbosvf5hxy2t1dzwcs3930mad3qqk8u2osppfl5rlrzw4zwup096ra1pzl2kr3kknblkablx5wv5u5i2oiii9pvl7zw82ogohuhrm4jwwsc',
                flowHash: '4gqou02rwc6g3kutcnf1iglxukn8881udzrwk43s',
                flowParty: 'cq13xjucd14dc2344grja6p11kuqfwobmrf1g8kxn792ostibxltvwz07egz0sxtz8h81jjrgjs8098lqzz0fwu6a16pseunncarxoz3l5tlrbzymtvr1kmcjtw9rrz27gfq5kf5f5979rn6a4jw5a0u7dk3rp8c',
                flowReceiverParty: '5u1e1bbfec7u1h5xnh2imf6hx7ws4svnjjgcqh2m7xpqsca53gkqvbnjlw0lcnwatpdsv1jd2ckjz8myiih8kna2onlxqgprpvw31oipxxftov4vb51x6ysz67frm8g0jdn32x3zsic0a9srp1tlxdi392j3fzt5',
                flowComponent: '1y1xs6on03dsoi1wlxepa7zfkftzozfw2yx5kj5dvzk2r4e87ghu6e6pmjkph78gihyrx4hlwwep7b2ptaklisppdd63zwrih55juo3fbyvg2budo9g5g5on3iar1cmt1cqu5hlzzc5ra90zym1ouo2lfbhea7k8',
                flowReceiverComponent: 'mytvtzgkkosdqjlqflfdacjkvtyf0q4yvpf2008vrc3uccs635m4zz9z8fa7lfxb8iehgg8xqadsmdgrb0u27v5j7bxo29op3q71acy4ffq2w8h9hhgqc37epwil2kxzx32w0b30455edt2he55v5nvrp74od5wi',
                flowInterfaceName: 'ipfd9gz8z48a2rxermtt08uoxox5g9k6qz7kah55nhh1d9nwisq1s52g1i4992zyjy649cowrflxu131f5t2plfzr9an2epsc5vxkjwk2kaa8zhg6gu98x04dh1uyjpvbp6pxrbfwn0puxmv8qlohocigbvv2hkv',
                flowInterfaceNamespace: 'z7or9k2iucc7ha7fbifrnr427nc21dhmfsmds9daoti4e4c0ds1384oslzdhgb9rvxuv9k3n2lf0n55q5th8jwewbcwmxsou7jagpnu7kkfr5w06nbrcbhgb24auphpu4h7nknxyy7edhr38eaxi99s4m9z7kina',
                version: 'sjdxe1h3pwincnlx1frc',
                adapterType: 'q92o6plfm6nq3h6sexxrxc8ve1d2kivfii2zxgymv0bplwkrozb64leysp8x',
                direction: 'RECEIVER',
                transportProtocol: '5ezrbl4zicb113rhrt8t210px3ujcalnpj3i3nyrgahgz22hkqw2ep1umkkp',
                messageProtocol: 's13qfj7h2dz9veobj5ixqgx9cdqtdy9r1k15qsrbdpmusexrq01io6ar24s4',
                adapterEngineName: 'jsyim7mdw6o7zdle50h3oak8g5jrwou81dt0ujezof3wevnjrznyw1b6767912iil5re89tg014exydeoqgqrs30vh95hhxfiamxd522wttzvdg47xh5x79w37kmwc2b0o5d2sdrj30fdm6d187vu5ufesx6uld6',
                url: '5ype33mqavoocpv3591uiaky7j0jwsdixs2nvime4gfrj1hqxxoygmrdb9wvbfu43worpje46koquyv5z4mdl31tjau66mjy2iaiihxvi5a13knwrykydll9y527xxrmxqd1hgdv9iqy0rakre1iahm2jodthh5in3qg0halji71ovu5oi22bydycj1c8l67hv9k6fog7cizt0xuczpa4rr3n5e9brny45ta49sbc4nh2mshn0jmf3pqkejete66xwvodao0d79v67dc0b3uau8un616gyxhkv08htdfudcn6op1pkn9r977vmf0kqdz',
                username: 'cvsslaveohepe2wk8ljd3w9nuvn3m2s8q534xlivaxsdnuyq6hdnsi8fj294',
                remoteHost: '14oib4xtomnfscztrgafzk6p4xsz4zb5ddg0r0e6bgsb4vejhfn7goqbls8g6tjyix9yyaaju1m61eoxqtx58xzfrftc9vj4za023rtb17wwiuy0ufvo0kqs56ms6g134fv5hqf7hegns1vscfhbs7pzzzzbrggx',
                remotePort: 4452890136,
                directory: 'i851sk1qtatpihaa6senmtpa6uoqydp9n8xr1ugdmd0l3t1pr8elue35csw29z6lvvfjug5ax6fj476rr0q7lys5om4bn5u90dbshkozxc1hjofqos0ct9becjj33t6jxg5as3i7xr3g4f2nl8qechks86jl3dp865axzp0ifd9bvsj4avdaa473f49l2evxv1fwu2pbiai8junh0oiztonf4ffl4ltdmsgi8cywnqr5ljzdo1cukvregbtfo7b9k6l4vt2rk2umq61dxa0mhy8flwgcxfx2cbusjs7lfttyi2f0kbi8awxsrr0u3n2qjrx1z7y3m0gq03k2vcl94uap9yy953g3b7acx28kj3s6zpfb5fde2gegal5mh6qnjohwog4lxa9t9kmwyva0fsqn6av9simo6ixlx0ee5omy9rvlz5vs8fejalcstftxpzbamj8elrcklhv0cwcctr4qcxjy0go82ocarrm0yy6xf9zlihv2kf6imljd0tsoc3obzc2mgqb7a65yk50z4rztqrsj4ofd42jzgfjzs9b5qrrpiyra9w8lezq5ai9at1ftojfd6sqxd1935ywc3uafywq885w0ffz1nbe5sjs5l03hfo6obh86gq8efkel7azu72s2rflojxric2b52hxxuowixoedd0mzcd4f0i67nrzw7v7es6hn5zmap551syf1nals8zquo8yzlvi5qrspv2912dw7jnibb6isiqwb9ek30kbblb7ekgoo5nolsm2j2bgng5eimjuq00ok6nacnrfwaz803b3atxa6cy6hovnkoe2ds6wcnriyctes2t7p1tikwny5vcjfanu9xfms26y5euxijubicg3qsdokgffyhmtemv5yfibdx66qvropv7r3qvakyza3qoia3ch8ty35poik67a34lznv3xddesm4motfmjano0vmfnu6ueeai6a6e7hzhrts7rbpit7aktjdwif6appb74cbwch0ti94fqdvydbz27cc3uo',
                fileSchema: 'idxgm3dxmumm33vn7kyf2sl6ja3gpw657ikencpywpzf6eiyynvduxl9g9ll973nvv02h8wfzfau9dcjig1f89ba4u8aty9fcyxcaezt4rlvcg3qghkne9v6c4bzxp2jmtttwu8nphcuy9lo396wx9y1z0c5mx7m3kt0lwsiw8q59cc6zqidnuds80xdqwjprrz7hh3v9ghaiqifjoiwipvad1z9mw9bh4ivyc6zjf9trriou255iox56ne5ougbeqclr0816mpwvfkhc210nfvu3setuvic2sltrmm0mea1mtz45siv7nkexc0o2mcu2sbojbrmonpvmkb5enb0gr2thikzph1uwaweykauwdydf4jlwgc9ccs5zj4djumcjhnzv4cx7v6d9rg3awrcyjtckfdyucx8bc3ekh8bjwc9lqt7pa3thunsdhtyo4yondawzdr2qmko2i29xl5vesnchf4q3rvr6ya3thkdrsmussojv175h5bj5lrc3128efy8my6wlo1ll8aqbnhvi0t060esgz7x5rypfqyq5t9p2j0lyih0jgrmnkkmir6b3t3oc23n9jbn32x0flgtprw7bo58ls9b44y4vgg6ts9wen7vh1b9uziqncgsv6af4542cgzwytk7lek02qqvghkkfqtknqqf3rzk3qiyos6wjjnyf5q0buvlenf83di300wx6s66obqf1koc7aplz8pign9lkgzq550qy0gikiha6sdp1j27rk66jo4cig73s7m1uvgp6hhdq5khob3j3f69e16fcvzm71bphe1qpxnfjukgldjgip3f2jxxhh6jlnsw5yyzlls5ho5p1h6aj8yz9odrgxheeq9yi2vz7dw8sw8r0wxx6tinz7udf9c2r9itg1ezcjr30op24j1m7r7hvjozaw0lu9fycyosu9zdymh788ebmk4bwovez22bjcy1sozc68ulb8vjyr9bat9h7xt0rhpwcpjlwph93jxfvw68aint66uiul2ufe70',
                proxyHost: 'peaxtvlwqc5fxl8ph589pctgb4lcmyrve6zqn3810obkypk9w8s4kmteyzw9',
                proxyPort: 5211701379,
                destination: 'qgw6nyt92hd7ahj9xts7xxvqw7v8dywgpdr9qnex8gktkhpawj2bf9281h0iexyhnphkxn9iw4jf6q2sp4efen2rjf02zzakibek4ez7is6r6i38uvpl9xpmttqq4wa2hzswxnjyy6lkpdpljygrnrzo2gbb4ojm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pxv4wj8272jel4k730ajhqj8li7wkqgzb8gujxpnsv1qdpw03js5ef3hnc1gsjehd5urw0cgz995i09z2ife5o2pfs0z1wbc7cjf0enkxycpbaa8itcem177vtevccsx802gx8fpu9lg8hshmcphvypjz8kpzq5m',
                responsibleUserAccountName: 'tyl38wvtpcquypyt7pod',
                lastChangeUserAccount: 'qh5an96wddrbsfq0dokr',
                lastChangedAt: '2020-11-06 05:15:33',
                riInterfaceName: 'mwh3pyc70sun296fpm9qcu7eih2t0dm3mzfxpd3eokv6wlt1rnz0gvp2r3s5o1qpw52e9dgcecxu1g3akhjj1mpvr6b76yxz11jx1v9bnu5zm631mtwinsj672ohnnhvjh8smeioj9pzzagqc6svnxqu5nbqb2ho',
                riInterfaceNamespace: '71isgoquxc3dikm0ok2bbv40mri31zh3xen9ecay7t28htwwny0e6g0ve45acq34u72noymie1pipvwroykt0aywea9tmn9o4lxwj25xi8yixpu45sto1m6na4w8to86ckzd5k8tnty31j5fdg79gjr3vxbtkhog',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'irgt7m13z1hpapoy0b2gnye2sj7t8iesq265n72i',
                tenantId: null,
                tenantCode: 'h2rilbgvqi9oud3gxmhnf322l8hq5z9e0a155kbqp8gme2hotg',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'lgha4n8dshh0th7rxjm6',
                party: '0k44dbetershidfeyy0jh43w8vn4lk6i1410uh6qdlo8jhy9yaaj0ovs243dzm3sv6zc41eugfy1azx3hkzw8tm3rfbgu9l3arnez2wkl811ga4ku84zsjsxfi6rqrryujf1ii61q054fjrlwz9cftb4odogwfhe',
                component: '48qz4gb4n8amnjzg6dfwqc4vvm6mao9ohll3vi0paoqezy6rt4m04dehuo022v5z1t28nxblac3q01ek2z4xycuks53v2khyf2hwki0l41e9c4acxo5gld0qrmhmdage1u0jbwbmdl5lac7301v6wst5yh9mdnvr',
                name: 'gjv0oqshwrvneu59ramqwdsfgrdjsdshgxr0qr3wlr3tmzx0xv4wic6q0140y0htnrxg7igc8nkq7114702u5v8z373xks54no43xd15a67a0exqr8z52irsoxpgi2ya2js8ob72wk6pijomnpgng4mpjwiyeo4n',
                flowHash: 'ujm5u1vldrgb1uj0jdn1lxo6q8i3aum6i6hzz75t',
                flowParty: '1rvpa1dgqmczl1abs6ilvxp2xwx5zsqemcgn1n4y3t7h5da95daw0kaol5ag4pj34fy2r18l21263pobl69imae7oiqty7uq9zgh4f3yu54aewaseko0n1ppfmsifrzj8g4gw39pkek4cjs3xhvmlb5h8gkbx52x',
                flowReceiverParty: 'iv8xl6lvpy6jizu9x0exn6u87pjl06jx4xcc8bcoa83rk03pqff33gi7d3qnq1r41xgl0m1abzvck2h8vroc6g3bn0tlzg3pw7yr368266ikvj8x6l56soc8ihn0ofw8c6rt63q7m37cevju58p64r9kju7viiqm',
                flowComponent: 'bdx4j7mue60u4wztgsk97rxa10fg3ma95zur1shqwb26cxliv24q9fw1l50sdzjrexqngyujxkykdvj87tjy7zacqxllt06gyx0e5xkddwxa0jaxn6emigjak09q39cyg74o7t9v9un1lej9q0qh9prasdb7l5of',
                flowReceiverComponent: 'ltj164r9gbdaxoomai24big1ptydjy6sl5zdnades3zkayqbqb8up977m3i72r7z5he1cmmmj83nwkuykhsv5jjf5yqnldjp1wm2ul2tjtwo4mmnlj0s01h688jc7fi483e0d4n5jaypvi3rel1uivn9wg64f8b2',
                flowInterfaceName: '9qmj44jv12pnko1lcd0x67tbg53gg8at4cehm7n9nv460aaoybg38aev8wmnlrtpf7hbtteaqr4gs5ydzyxj1i7ruaxf1i9o914qohu02sj3ed5yhfzyocqmxsb24i2e7vft03g7qo43raqwvvdbhmdz40sq5ghd',
                flowInterfaceNamespace: '18lupq5jv4l2ipbeb9fhjxxfil03ew5heikfkxfdupcpv804e8oqxrrudovbcxu69q7k6wyf7jhi6dycf7jobobkky8as87r4cx2qsnri8q2edf1aqjg9g3zp2ppherhlg75t4fkkm7e61srm3o64i9d0o8ahmoo',
                version: 'qtxeqi308kwd19h9vas3',
                adapterType: 'lr05xtadkwp8kls4ige46osca8c0txmiet6aq3f5epohrokv9ructl4i455j',
                direction: 'SENDER',
                transportProtocol: 'to337yihpj5oift29c6vw3bb8tz1eh0uumw0ydzbr38mfdv0g9k7nx4gfsgi',
                messageProtocol: 'roumbtts4f9bir22do3m58ivrdq3fs3qceb99k9gh9xzlw38tt3k5ftx21kv',
                adapterEngineName: '4o7vh0hk6jetr5upt2dcjezzyyxkbyql8wlqannhlu3okfhlbiagg1nrlooa74oumougbuvbr6agg2ueqv89wr0n1n7pj9jzzuz8rjb37l0qhkwk06e3279m3dpyihzp8iy37vdo55o49xv57wt9ol3bfkedgszx',
                url: 'moat6o8hcs501apshhh6ukvba0t7hd48bejyddvnz5fvlmwno6frep2c06yczp2v6ossa8am4oc0hee03kscaozyit948vldp3476thrhhec9ne6pdsy0zhrpnzfbenjgw3oxdp6t0gkpvwzgfsfqj5afd10ykqgsavobl1sj1i55bhz3a73vtwmyg7fdy7tsd5gvmsa9wy1bij9kj1sbhn4ti5m3uw9pff5aiodov5s1d4y303aawogeldd5l25wi7rsyyvkofe3y89wb8n5491jfw02fhqoq4omt9q7eaw8xhbv8w1m0syeadqrfy4',
                username: 'ay8a8jetjsf2ekpd8et9wd1qfegr2jy32n6occz3auj1xprcc9pcvxxj3lwg',
                remoteHost: 'kt2i4aah0cbtskjo1te85wx76l2xrjges9e9l6cidrww157d5sf7ysfeqeczx0n91qp51e54auv7nyw421uoub342430gjlljzyf10pvri94gu187uypmpn16fdfhr6x6eifsxbvl8yc9u2hkpx29euwlb0fk8ie',
                remotePort: 3006081734,
                directory: 'idd5fzme2sdn8mjs8sx7xtpuez9jod18ok1qsin27xg2std29z6tw28vuetoqj2rl6z7bhxknjgkzdntm2vq0lxc4pbnfykkzanozf8jwj4l4aql7eyiqvamo15p78ruyx8rvzt1hr9l9t6o9q6xqfqycayndz0d4ntdqbrrei55z842wmhsftbwcxmm86wheiepvmx4n4sy0idxq81itylxrq1pqbl9vcdp7emsgzoi7447ha2nll1m7bz62w87el0bmzu4nfrovwn8kj7o5dmj2hx5ickqosiv2g0f02lj1jcyj7lha4vmq43qjt0jzf90m9cyve593n6fsj86e6ejp0mj8e6k80g7xsmv3ssig5bg098zgbiwhfxsmcq4g1e0ve2pt3av4ynju1j8bz6tgwp4imkn2gj6x7krqj737uildg5po75f3k4clnfrudqm9l8a872yf5nsh19vvxn4w5qd9tuhh5u1cznrrmm9yldfgujb1j5ik1fd03xfkymu4upiwq7t8bdzckbcjm4np8a3sisr44anphpl481aw4tfna5avxbpveapk7v9aiq0vewf10ycl2pzh716u5bvkbx30ebpqt8cg68landva16h2xlcg2vc3gxgvkmpx76mbqar9fp0jjd01dil0r5114ton9f18q6ntepm7hkq3o122sxsky4fwwov5u2ksz9wwv0c6lj54bg3p0sydxbhujhhh3mmritmriw0ao4oti08b7pjrvepbdqjsdc9xqi0ycsunozdjdha8a64ihnla5ohoe3zhgjxew9kyfn63y4y983ggo3849xk0mqlp5d0os8g8gpac1n6jo8nccehcge4g2qjbjztfnm20vayp7lgfcp23hpq7pao6rmscodokfovmix94i6qtjwsej690af57urvjhm6z8dha2j5zl8tewkwkviqfjsrg0nirmhhxy48189e1w58hlxnj9qjh5g9p1e0hv9agfd8ovbyu49j2pk6stuuwt0ukozu',
                fileSchema: 'x4fvf8t4woht7xcd1d25gy1ba444d56vst46syndwxov3sfbhqjiv1o4mdamxbbasbjlk49c7t48or6z3bj2jqs3k52ckaxa12h9lx0bowruswppfyh7m6ytv0eovi7xx55vjvms8ohso11d7bjtjepr6o9hkfdwecsq5xyivxfzozweway1017ahl80ub5ilpjd4cmm6yvar1ze5got99i0zoacap5w82v436ao48736f5h78r1c0sk64c644dvoti0gsjm5toit4ewoaj1cdnn6puvafpea4cae5n073ecgtb3v7yzzdj2fqmjigvpnl2y8u4vn5m07qs6yvjks4b6bmn7f6glrj3blo2v13891fwjl5ow4ag97hm6c5hdbyrx4876ob9vc2sexk1kqyoe4u03eurxqq9tfwqiwmfmbw64ois70kxyzx1d0ggf4srm3gjgxvxntpv7xushv61mih986atzvau7t890brsoc4vay6sq9qmc5icxwvovmhgt4nfkny6lxkb95ecg42vaof4csh63lz9f0y38m3p8towqvsfoi6frelx9rv5rvd2cr4a8etia53cjb8p9q9wrmb166g2dbchoenb68g94ixpz70d1zd3518c4rqboyyjvkp2fueml505q1moyxfgul8qfr4v5dmewd9mg0f5zhpwmnbbrz7lg093bsjd2mmmboyk3xt2bksvqw26i3akvu869onux6d754m9ao0jniybv3zdd35kwsrwmk62ixgx3pep9k70ewmivaqi7y1l8px6y1ge34coudq4r4t2wdc5tcvmdwwu9rj55iu0hkrtkz03oragcjvk98g0c7fh7npr5zk5rvhjyklcr7u4qdybb2ufakgfo0fw5wfoff7ut1x05kxpcd1ia0woagx7dsnmfi4aeoalunca4q5hvytcb0aroti0c5us710nnihjv5c3zm9v2kgfu83r0994kabvivpesd7j72vdblp6bu8l4mt6dkuxy1pned6a9',
                proxyHost: 'h0730z5k9lhtiwg0pfq7rrmlmaqfi7lgnxg0wd7r92uhxa8fzsv0xolmozok',
                proxyPort: 6361133573,
                destination: 'm8495cncvwx3c63km4s1gtlekt9vj5bcqya5859l69v2ver8eb43s6pu301p18sln2gluph7ya61c8n2c18s4evzzrophdmz1668lgd6cd44chikkiwj529rkvbgmv42kpp92yhn5742fr21vrxck91hinrv1wsk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lt80slbug9qxvhdmqal7craf5b5tbhstb5a76ptjzsa72knuju7gixv7lmuli45q4g9e13gcqvmoqautseesspptybazqe1syyartlzpu1t0g7rppykxd3h7nmp7a61ttes0u73u27fdt8wwbn2m3jcltda0mkw7',
                responsibleUserAccountName: 'furgeonj868sp883hyoc',
                lastChangeUserAccount: 'siy2jqnik1q1effux440',
                lastChangedAt: '2020-11-06 09:22:39',
                riInterfaceName: '4i1ml51nj1snca1jj6rjgeykw4xqm13xw3vr6sf10x3kfzjypkr0ztfzjpvftxi9fqkx7y7ydflb105vr7xvzorsz2eq60mgcdempg4j1li3g9z4tcz5qo5vdrtiw4p7kbgfqrs38xh87qsnf9va6a4frd26wxxs',
                riInterfaceNamespace: 'y861qf3aq3b7cv7z6iy8jgo3pm0thbp1v89klkyp4vrbjdkg90w6k7h8fb6cqzd9slqi7v8kjw79ac21wxa7tiw63utknnvf7k2cgehfx3ylrd7hweypu0o8j27gwv34n68975a1u2dbrytjnxp9fv5tigc517ow',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'xl50x5v2vub70u3vr1smtc6rhpbgysgvgi7u8qny',
                
                tenantCode: '1mw88smawdc4x7fbdm916ljqioqduw3xara4if98w5r02xhzfx',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'l2wz4mlda2rpi1sdgp1w',
                party: 'xbm7xrtmpwpl4drv707d6lvy8fmzavpadfyu0xh6no0r7fyf7p602p5g387ncmehjnsyx5yjw77gte35exgue8cld0gltx4r37qxezda7hqa9sphl8dsyl71jrpsifxcxjwwaq72852eb8emn4pj0vu3xocf0ufe',
                component: 'hb2b3d6f6gjzkpzle2hdsj6llgzmvxmsgste5npyx7pxs3gzdnfbwzbpklbutswiih12yhq0ntlbu4p46nu0ozlttxnvwzeiy833motv3bk99wm0qmjd4xu8gmss9l7x0c4ya7tjvmgk8ng0gtadk1g9v123vtfs',
                name: 'i9hbe7iws8ul7tmiqk7c6h8aov8tq042ujxyfncghattcu73orkh1451nlv9ob6sd1pb5tsxi0ecd3zuemapcdfz1odf6asvwytnwb1p5z7pd2irp6zw3tpxiysvonnnsoz9amgg5biuuuhjs05bbzysl191qdkh',
                flowHash: 'mulqhq7o64e5x6bbtfh4rzmebxuun5d8kxwhg0k4',
                flowParty: 'ido5ptcn3mi2f1wlj03kk0z0nv9tns4km1goto7nzu84a5c4k136nwqi5l3jnd50sa2dgrlwrifoluloticoojnicte8ec9cbled2b155x0qusk4of0xiwijh34z5mcidse6ae7nitm431heuxc9e9prmrrgw301',
                flowReceiverParty: 'bu21gc5dglh35vujwapw8a22mf7ehhad97d6h3spmlil4pjqq7np53j6aehmyjc6el2i97al26wkgkj8fizquyuv4z4gg6z813agolsccfowv3cd3pcldorwbkaxjnsan9nmvdzlqyhtoyip1h0ef8965xds5z1a',
                flowComponent: 'nxnt9h7h84cggkg0eqvoyjc0ulea0w49vjdeoxvfi4l34u8zcquuj2c5d0cnavu8fnpoqgscte6ihenc9219fcuz1vdlt53tpreu4vxhgho9lbw62qi8l2cm9qv5zat0wajlntyl5prrixv9vogmcnbi40b5go76',
                flowReceiverComponent: 'qsf4ugjmr668ov60gssrd1r2lmp09kts9qyke719qtediq1o0omg5cod3341t1ft33albhw1hziw2c10ueev65xt3zwcj7lmrirdcsuzbhd44fg8yphcmrz3eiunzk6jlmmy3wculoo94ksm9ey1ugubesaxraop',
                flowInterfaceName: 'rrq6vfat5u1ufjtgzzpg4idg9ye4u5rm7577mk95mn4hoxvv8thjs02itzw6pibxy6lb36myfw9jr6rz42gqhmqq3xkzl6wobsv3d5w3kqc00vsv0qkyzp1t8z6515ks9taa8pmsjnnxm1dt7m3gf4prd8e2ve2c',
                flowInterfaceNamespace: '7bgky82wq9hjlruhgjynylk8maeydnx3el3lx11tirpsyavuxzd89fjeec44dbl4s5efppk5mynp71362lm2w92f53ocoj4ms8oq1vgspfm90f9vrmb5dayvfer16fz4xhqsdv5fmsg8de4e7tvrbe3shjfkdyb7',
                version: '7gwxek3izw8srcyrnhll',
                adapterType: '8qtglc46rtjvdf8i4us0q2fxym8kecrntf9upxhry95z8kqb7p2none8yjmj',
                direction: 'RECEIVER',
                transportProtocol: 'p14wlhqrklpyx494zuncqqefikmhcufh4qhy1bfpldd1rnsxhiwd7s1h1mxt',
                messageProtocol: '35ddv2m5q4rh50dl2brit6xt2m11c9ma2pna33urrel9tb4twxsw094i4b6r',
                adapterEngineName: '1biasm7m0gpt4ojogturmakbw2g91jg3z3pgztuvj2yg1so4va4razbnlinum64tptau75bm1d07k8rkaerk86lov3p46pc744f4g5y06xgw0447lqmtphldtszuulza5nh6f0705bz94o9dwz8d7a5o6qwxizou',
                url: 'o2me8l6cwk63rn3vgmqoyohymd85y60un1hb439zl57r3hxdmbsbx5bkp6zv9eb9ss9rmh6vz67zy13ub2sgjg5x7vdeeq7rdr8k33du1s1ddlu17pha4c7a5t27a7fox0mz7n22ruhgmdx663ziav56hj9mz41x7f5rqfyc1v5e09ffsm9lfrp1ldpm1uifq9li2c8gcxwclt9uciudacimd56f723h8akg1cqfy6ihuxkznls383ggls0rv6wumgdwbjli7b9ewkgqql5lghu4aupcaz4cbzqprqokv0orjhtb5v3fwiapcs1ilehf',
                username: '29pcclttyy6y43khajm0hwduep0kbch2zaaou08peibwko7f3k0i5pv92ean',
                remoteHost: '2mvg4jpg3gk5z7bkhqzam98th20aytxldgs7w40vkq35blks3fzjav8lwvjezox36hr7pkiysrog471jhqeuylw6uuxigkh241i5axlff00o42ox6xssiyr089wu6kiidk45wn4zri3iph9qxd5isz3vtdzhhft7',
                remotePort: 1475996475,
                directory: '6km31qkgfl3ccjlgv7q4jhe46stnlhd10pgnijm3r8iczcrth99po0cth2saagvcvf9brm2hu5pi3dsna424upzpk77kcmmjxk65aok1rb1wgdjtke6u7cie63r4fpknqzhgj5qhejfquj15pceml5eedsl98thso271ls4o35n7boi0bvratcebf0zg4g6e3tk141ojyw9tlbppfkdaari081agq1n1pxurzoa7966o6s2bkrft4j5kfzjefv8srv8hrvylzmqsopq0cf9fayv9a52n0esq9jzwolzznu5l5n6vb3ryormlhuvegk8ijrx0nrdp4ampkympyubur8ao9jch0jlfd1uhn1k3aah83qe46yiw9vsr4z7cf202h8dqigogb7ebvxwzwmkaozpu1l281knltv3ykysc96l3g5715ll3b50wjlvpei4uyv1k8g1lonl9rxbdvp1i46qhj3d39ejmtidni9x6bouxjm5lavwkj3ho80joe7ae3n6twnzbxxoyfz1hu97064s2n3lfsqdkef269ds09tgc8t9onx2nn538hpaluopi7ezjp5yv4y9cppoxa7thak9u2agbqzc5nfpkzcpy91bepjoe32pxi91hfi7dc31he2e7ywur6i8fowtjn84tl6zvoa65dfxgirorbc7t8v81em2lg9c36w9yhn48ue1b153wqke4u9iwzkmqxq5tvnnxmxtyvwwogunmohbzyebqxpcrvt2ghd7e8e655zqt32ln5q42dco4mikx8jf40497svvjvdcwpl4ba58vgqv9shmhjgedr43cj9vyiadcn5ljr2rgdupdnigyenloj6g8mkwigkvj8b4bmd5y55ckxeypwe6wd2hpx20a2fzj8lhcbsjiqlxlthhato4j26d498a53vpfukbdubfyo472ws3i61jkoefmg6b8qy5jefyemak1s6drs1dd2lbagvp8uhq1s2v4ty28blj0w6pt93mmqmxbjoavrwawwr3m',
                fileSchema: 'jh86yxvc0ir6nlho2wdi2mky14kxzmzqx4znucadbk7evq8jse2cj7yseu2h40r7f15i95tz64ef8rmh11wjw5ys29gtmjzxab11h665sjxs77irhl5ezjlpf8t5hveuanhhsnfqqog62g872xgk6ffdk3go15vv2xxrgmol6bw92pguz0yi4d38ub6zs42dw2mvexwghbvbbqf3fituhpba71piywe38bwsf2w4whja9xutz3l079crl2p27u6q3pudmxk3vjbx5w9tkhdxxpy8sded28ugxn1cos972ubb2eb1dl8rw7e522eu7eu7sjub4kdggp77wd27sgx4dttumhn0746gshlg0zoahcg3xi4unte43g4p19rhh2kb2hzao5iv2ojm42b0dgj4lq6wsnetrj97r7hxiq3w2g05ik92tavezcnioxpjtdrqyl3ktsbbkvil29382obd7o3pm2ianoiopcwl29rzrca8aqp2i4xf0e62o76ez5yw3ugxaw92fginqjdbocwql8vb60zhhksg6qarsspso60u0w0510tgxfwvycvjywy8rm4hqtp8eom7vrqhlx8pwe7etht81r3uk28bx5bqoi9mu1nx3n0ljzkdso979q233u60tgrwmveydv1liabwl99o7e5dqdfndugf5ft7qv3t9hozyvoilz7d12tkxmczm0nxo1337akvtrk9a6afw6twglypg6v2skprrgq2st2srx8ufkzkl6f7wpmeebkwwfg7oectgalfqs9qu76ztuess5kcs65ervlcuwyijhd3jlaqw0mh6rklm8u0zcarfqasvrc6n600d69x163njrb4kxy6imqus3t0gyjvtdhh9whxn0j067q56lp1nakul4kga8141v9lbhbqgaoco8xj9rrxo5me1usl81nzat5rhmskdleiunrnrefgznwpqsxxg72md9oz6cljg7lm03o6gcq8ehrmfelw83m4okimgla2hjfbbgce7j4kir33',
                proxyHost: '44874fa4y1xhk7omq32ujsq2khgildy27yst5b23tbed2fjwacplkpc6sd1x',
                proxyPort: 6370179284,
                destination: 'ys3xj2dj17p4jfr5egiudsphezq4dv9ghob292wlur2q8xdu341r7e4k33mq61o9nhb6n3vx2ymzlky07myf3e4e8nxuum5kq4b4p4ysgy9sp1llgu74cyv71oq9exei01d0fwrb0s19punogzku0r9rmzeot7tw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sgm2y6741fcorvr5y9gtw0767c6vhsmoah6isavfcc5b63f65vvt6eo8g55asf9i9y5vrjixjf392vzmto8tlv9cmzag1pejb6h0jp9r68rd1ht8luhm5rogkze06cstihs34dbdewjpgqut5a6b6up513ssi2pw',
                responsibleUserAccountName: 'sxx3q0ygxqrku4h9u41j',
                lastChangeUserAccount: '07nvgaq7zhsq66nxp2eb',
                lastChangedAt: '2020-11-05 17:57:15',
                riInterfaceName: '0fdjlzt7xbdrojq6m7ocekecfkui3nma9haj5abi3j7od3f024ng6sg1f9zx2lp6mbhcktjzvob71bmrepnuxcsw7672mfwdw4ttxf4th22xvkkcx4hswi13xnu2bhtzw1go0wrnmhi75ub790ksr3t26nr2oku6',
                riInterfaceNamespace: 'dvge9gkti0slwdbay3o0gg41or5j3k1wx0uz1knyjuph2fq8cxj1eil1sa8iqtf11wwg95z8ntb6nai2hf58hedfuzkf0x6vdf4n5z0haxzk041nd42q2jq5nanrfbce9q26mk6rp7kfrf867lvm1mkh60lo0x7b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'f0h7bonjtjnh3w8zimyau72pjqugivj4td5c7296',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: null,
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'jqp3ns8a3ps6g5sedtvs',
                party: 'arni9ig2lp5l19wakw948qshxcmuc4bob6xnkgsxvqq7nf426mmbmr83hcib846ezn6thtlhrgqakpnc9wubmyxs3vkflmgkelzvjzpml945j3ylpdu56729aoq2haa3a57bsycx213lerltvev9nrdmb5mvawys',
                component: 'zpfr72wnxhoyir8u8dhspnljk310cfl2w6g6vqkn89dav0kfdvj2wbdqmfw4ua86kqb2j4sk79kzs1tk6qimf09an9msoef15l4f8lgbv1uqfumeioup35ebxxyeofcpitlc4x5aty6mwjz0cv9aw4as30rqr22r',
                name: 'ccflzog3ku4kt3f9dqkm3iu3obb9qd1122784b9s4ym3d4kv05l0l3qax7a2w7ce81exb0jerwt3qg4xeqy6l9px7czipqj1g541fpu6rcxwv7udgyx6y8l54b3g4fnplm62jabiab5v3lo6tqpxuc788eyaedhk',
                flowHash: 'm6znq1fsh0wztbiazk5llkkhxxleue50qkg9o1z9',
                flowParty: '6rk2z03ptpsd2s7qwyn7ju13ea3zfwj92muibfsog45ww31kvg9ziqhd35kwouje3l6n88qf34cnleylgnrmp3l4gdpmqb5sb3dezij7lag2o9ro2072my6txewnyolctcoovg307x5fhwp38kfprpujmzvmxchi',
                flowReceiverParty: 'u52fkhkong230y4u7lwgq2iu3n4x319h7ohvnpxxf5j90rxodf9peij38rt79py2j3cqo8tqtzjab0brdgn7cao2wz0esistd5x97rjwnwwlol8v9rsda2j0aezqkvgoylkl2z4o4afsb8y5d8h6uxy3iphwn5z4',
                flowComponent: 'e3uia7i1oet4a9hbmljljxkp7v98oo9v62o8zyk0kplh6u6b8eyxc4ygz8dj5yptigrb52ez0g4iyif22g6pmv5q3dnz6gkbtzfajgaduxntqkrxvepg0h2d3oupfbg9ewjbfvx3itp9pxssira71tl1n0umst0j',
                flowReceiverComponent: '33ksc1eolacx6hy4ggmmn9k3k1z4176vgw96bepgur9p709zqwaj2w04jqch5r7lbje9pkqnxp2vjk30w9xar3agu7y0s7gmb48304k6vzvvjatr6fbz49bjx505wkme3n69yf40kf9fhl501nv0f0863paq69ij',
                flowInterfaceName: 'gaiahatbztj2aqjyajm2samfufxqwz6kedzopvyb256zid24iicqidqvv7b99id9ynajl1026e0oou6vrxz1j90sqnq68vdv9d7clgiq1ugi9atvhifjx31z3edifkqs4raw13dergwm06fdack3inyczjidoqio',
                flowInterfaceNamespace: 'r5kaurim3xlooitd3qkk6rznwfgmuesg5qbn6010kju95vbwj0d9ogjkx2o644kji5q9hhra4ob66ecmnho4n7rfgchraq5aza27twqg6siurjxzpllafiugcufkdyha72zekz9qdufid7xy1sbvvpsg2c7nz6a1',
                version: 'fht0aamxi5tt4b0ja01j',
                adapterType: '1sn7itx6mgxmrm0di09m406270ehvire8m2jx5e5njh43pbiihaa957nd2k5',
                direction: 'RECEIVER',
                transportProtocol: '3o05fxgpp5c8vygtcbo010ncjxe1of6bmyblmv1t1w2z09i65fq6b589z03i',
                messageProtocol: 'l0gzx7dnlom4wsr0d09co3y1jtu4nnngq0rk5wk51efmmpolx8ui4nwb0wrk',
                adapterEngineName: 'deod16cfx39javgwvyd3oftnn8jbb3d9zqdlxbfpunf66b54z6so03tke10sb4isjn9fkqvbxvj8hfvufza6vxlf7h0g9nzrpb3x5bjaxfviw7gvkzw4qwcsnzexqm0xupsk23jkgso482b5je5m0qo4b71ye2zv',
                url: '96o1299drbp5izylhk1nwi6zthqzri5xe15274idi1lrgv1b7nnadzf7nphiko65v0m9omr7en0voaczy2tehagwnx1pgvv8a64olsoumq9kcwby9zqkpzs989i8uimaqlk0gb26novtdo9nbibkuoajcrq6rwzye00eizcvwixtzvu8yl2f7iizw439z62x43o1zlvsiqb9r5x5uaz0ee0ot9v2wojw8xczkwxfmng3c3x7f9wgaa7amqot5don1otgu31gqxcx6n4uilw4nwevhljtqckaqt497k1w0bj9dkdrvr2mmydqtjswnpeo',
                username: 'usy0062oztgsuht2vqa9xedkablftrv5s240ktfessfcw8jcl0dl6r3v742e',
                remoteHost: 'anlktysa2pl1rfg3wi7usun534829da9rcqbplgjl0fklw89d1kixh2u1h011yepit18wug5kmcszqq154szmelrmeoi3d6kesv0twg3etzau21ucxy2gqwccbjr21sy6wjjb3teqfa9mep16w03b17hr378vsoc',
                remotePort: 8116118727,
                directory: 'j3toh6qpcw5s5dkdxovbyzooyjnq72r7i9soojvck24pgnwoska1y50jtwjdxld1fqovp46zifk7rz6ixcjmbow8g9xffrze4uf8ub9yhpc4pjhgu0tf5pnqno5gmyv1tzlerj3hsdkkf7au5kr45pm1byc4a2zfugcvcoym1pi8uqg0xe7mj0uildhmsn2e7rxxoh2vb401arybl1l8xpuhk8or0i2nbudman01pvdxdyw77sy0m1r6g6mnjokd9mpkjq6if7cqcz1q8nyp60spwc47rttf6l3cyz8wq7nsa1eih846gc2iyfesifatjrp21v0dp82s345gya1c2wd8d48dljinyzkcbix6lwfr5j37kg05lbqnygmvoexggvii2u4mosqu5sy4a4mtz02bwkyt2nyowp4cm2leoojfxszaq7r26vd7bkojnn3kl7qahbbqzwlt1hjck1nc0izhjctkecjsd6p0quiu4nis0yx09dclthz3t6u4q3cp0mh4dm2qj7ltueh397yyblbzekry823mhgu0dymi0w5dccf8l1nqjonrmn2e37x563869245mj6f01ua0q6p8zuicrdhliz7ybqcetxgjhg4tp8l560w7qzqgm16nw7kbfvnmj34gs3oy5j02om0c9fsd24c0rpom8dlpfup2i8ptozaih27agyc3db9jglv20df6lnd1cixxy1dvj8m2x0n2xyqmryv6uhknturllntv1yjydcvzygckfbbqaev3eg904gp3gi7ojqu3ej95i4rg7vujczd6vu3g1id2ar3w9m481cobxe4ny1as1sovshfkqq63sh1dl62dys5ilu94fh0era63x5p38nhfank3ivpry0mg8la2x84y4mphygptwpqza22g7k48mdx1sqs9zdx7b3n1f2jy53p5qopqagfy3fakzyc8r63qykhcpekd4x6d4cjsg5a6cr07q4n1l9g951f2azllw1aewtgj3mx68eab2wzzbif62hv',
                fileSchema: 'wopo2ho2d6pqw5kg75nt3k9zrdhynp019iwbd4guxfunwwakyyqcjh55jxe7ime92mhjartyo0d9u463pjxz27sbi4xl6tyvl7l7doopjb1g5hgu3yfa2es57kh26x7c06af4zjfmskp0ujzdo66vgm2imcju28tl4gt5s2252ys6eqk9j81r51287vjcvkn4sjmv7ttbnjqiann7ng1b4jaox9zl373nslbfxmdcxhqnrt9zuqzydqdewii1rz2xq2dm8sp5o72r7ut52th1lwseuix9aaknhs097b38bixwkqfqabhw7s4dd3g16voed6jgcrndzz2t9l27whkiqee84oy7g3gsjq1nm8c37gj8y7mj43nnret2lv47wqvodypr6mi2wu6jv9gy9ftvx9mpvbs58epbcg0v2rs9p00w6tr3b8fx306w2l2zdl1jxbgpub95uu6u8no2wkyig21v9pku89t3il4fiopzv3q4e2lqq2fdgsnhtm90x1osrelvxw9m1yjjw5u12onyclwu9tnpjpn6gk5bks7dti7s3q6pama1nar2xzswvwzm3brj1ed0h7pakwbiqfqt65scgtv6wvbhb9p50t9x8rsk7q4z9w3ooxr6785gtgn6d491iqx2h4reblvolzweeyhtq4s41g178bz5l0jcorhqir0gl9grp7m6abd1uy4s7ftd8cljh49uhbzhakpn5imw5w1mbtpv0ru11tfwbvz2fl3lm4vnsryq0uwdolcd1oag0b6fte6zsu5bclue48vc2y80wh7fsmoo69yxpdtp62flwbc9p1qlfcidhk5xf8u9jn2yf8lji0dzwoz2ue2qty0xzakq4neysvn20kqdfxvbwzn4p9rg3ov352un0qdpfqazul8tcq20ivjhh1l4djh1wpoqeh5a1uox56itkfdl29tx6by9qxc7bcsceombyyi5zwkw46krqrccd0wi0tvaor2f2qh7zl4sos09d8dm8s94ufu171k9hsf',
                proxyHost: 'w7l3tdi2tddgubf5b9dfazf3qso4qz8a3xlrqm7zvs4gph1xn2zgzetb7ze0',
                proxyPort: 1411562302,
                destination: 'pedd1wwtxlxphqe3sbz3akwcq46gpwq78hx1ct1vn2umd3o9xr20d71ckkqpjkq8sr8rcdrhtyu97ofo9zwwjxn3z7dxz2snxiks9uk6g04tca7zy8hjv8rudwdqctswyzyxjy5koig4tug5rxlf95ukfo9guawd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bsvspnwf9fykoh501anshakm7wvs1sboa4hn17v9vicb8h1hxzqjpf3hrsxdg3k1lr94ze7mw04a9yti75io0qz02wdt3w5ur9pyplimaxwtce1edu5vxgs7n3j36vkkyksxybzyke2xfh76ghhr8zuasglnfg62',
                responsibleUserAccountName: 'bmpz5lca8drfm3nfo77v',
                lastChangeUserAccount: 'ilx4hhgygtb6hr8xvv5m',
                lastChangedAt: '2020-11-05 22:53:13',
                riInterfaceName: 'gbrjx0cc3acnww9gyxwflr2xwyz1vdsy18u8fqqw7dbju9uvt91n0chxy6qytfbeg2rmvgmwoh9lytoro3vdfp0qagrc132tgqr9j3u3786jvl0ax08qb30yaqqcsmmkwlchd9utskqlcljfb2emcq4afamaivz4',
                riInterfaceNamespace: 'dmldtlux620bmq3z4jdvyg7qscq2rpyo891kx5s11aeyornsuieazgsifi7e907wkx06yigl83u3bshvbjzd9stgsare9uxyhf9ajkwc35ghnr1qlgk2ktgfhlpmtl52araf3ec875k3n049gg82px25wepuohzw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '9yoox3h6kxywcccuqnlo56ed0b6tla3584212324',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'su8frfme4oxf40lh14ap',
                party: 'r1u8m70bmbszfmp31s6ymog9qzvqqdtusviyiklo0v1vmqanowdkgrro7vpvz8875dlrfgb4wvuty9k6d4s3aaluwjhic50r25giyli2b7msx9ycsvnx4jcgij2mbxgtcghqnhf968gmx6b0zq2gfeyogv3qdki2',
                component: 'r91lqj1rnut32re72cila6yllrw07muaa5lk7qjyg7el83asn3gnqjj3bphltnq0hmti5sjv1itib2dq2rpvxrnr7eqhj1qaycikxgbu39y2xeeudl4wkqla2vtd6ocu6bzzn8lc3pgxer9acgkyv2s01wvju68r',
                name: 'tyy9cta4pmladu4axhz4j5xajc7u4is40f0lu93ke7plj0utcur1i0hftahic0su5l6rgcf07hy2cuqc2fp64x9ro9lqh4gvpul7qcnd3av2j82apha6b1nzntomj35qjz64gphos264l2wwyfe37r59qmak37o2',
                flowHash: 'lb5tgo5kjckndyblshx42jgm4cqoc58ygk75rxss',
                flowParty: 'k6mtusagltitfv5q493r32p2bc50sxelv5w0km6dgw9tqqoi2bvxuoa5tmq9qdgbx7mm4l09ggwcwmbmri2houfr6fvndtbtrq12ah2gvpxl6ecmnb1ft1hc89u2zpa6hzfp1uqndh57adtsy1y9w1kr5reiksk6',
                flowReceiverParty: 'h29c8erpannv13p2i2uoc5ee2lu2e5qizfx03pzagu03oryc854tsp13qxlqtzjquu7gvrot9qej77rh07c7nu2fkkn47o8vrolg0fsbndwdk7i2k2fgq8lz23r6q5c2txi9mppn6pazhtpw21y4s1kxyvd9zm04',
                flowComponent: 'm47dbio5hfh6oac65vtl7zwi6yjzj6fg284sg228awjt2ur1ed3iqo0ajg6w2xb60u97t16leu67vvxybynr0vhahgur4nwiunaabz0qfuwhox6g8yvu5w9g6x1nhlvlxmuojtsr7nqqihhc38b58z98zecpspgd',
                flowReceiverComponent: 'c0i9lv4gfvp9uv9i346kisys4yem6n728t75jkn2atl5bvzdapf3o4rw9oqphzoeom3c5f00nldmhro1golkvuf3d2w1htmvw7f3s5fqhcaqw6wxcoyuiu4h2p1belk3zwojmnejjrbphip0nbxihjstbi4l79ia',
                flowInterfaceName: 'pdhulh6nr080gls5g7n886e2qaqr3xclz51tha5zxlynguosau14xt2tawu4ce7gcbi1lfbp865d5v8undd0pc3wd2ww5dmqrh9ec9dtxf2klu0efn2fttu0yu1ztchbx8ir32anilcm3kot4coawvjrsklf6xyg',
                flowInterfaceNamespace: '9xda5mw660mqd2cemzlc4j0bsp2t0lienwaflnm1qp3pywoxjj7j1wd8lj1y7m53eh6tx61cbqwxjgo8q5dc9ih96zas7qddwatfhvtk6wsg1kjgxyoqr5xokzykqcme4lmsux4td81wbwg9psp5cqf1f5qtmd9z',
                version: '2ylonqt8k31jqu2xiqnk',
                adapterType: 'hrh05jlzko3ytvwtba8s3ze0gkpwku1bnqrc1l9l9047vfxw7fme510xmrfp',
                direction: 'SENDER',
                transportProtocol: 'k0r9locpo13mbzjinl3xntayetzps7xkywbmmgct27zxiz99cs7k70jaflus',
                messageProtocol: 'riwd717vh9pt2rf7mixxpfmwvwh8vjoa2upwcuhwxlbkgd27a8vuegpciokc',
                adapterEngineName: 'ai0j5xlm74v64xaq0by6gsqihent7m23m05p44zw0uo1bjos2upg8t2k1uxefvtxsmbcrhf6r7ez5gfhp0q04rxsysdnfuqdq5a2mhhjespqg12hf72csdmb1vnh15esmpywu87p63qdvi3rjvgihvmldaplnjcm',
                url: 'mz2k068que6pizckl8dlat1wvi8whcgjt6p8il825ztoyjut3uu142gfj6tudjsi53mrum7pr8psuaoejfjbwn4a1l5we4m36vpbcgfjf20xjfkt3nzwlnpmn4jqq1f1q8nno804lozwv65qsjnmm0qif6y457kt9fgdeimf1hlbftqy316camhnxpq8bo4p4mzklpglr8wko8sl0aiax2w0kv3359qd4ln9571ci08ecgwfyn4y4pxgn8dnw7ulivmr0wk2xyol1zjbyaf3y62tgqfcij0mi2ckwifk8tj10e98odpi0agzju3032wl',
                username: '4f90yz7y7ffkz06ipizdfonrl5ph96woi5fvr5eydkznxp47387allhw4lxw',
                remoteHost: 'qsrgcn4ilpx3um5tvxrjtqkzpioy7o3qa605b7b326lghb1sc4ko0fgis60ubltukap0enik6fpgx8rrsfn5yqnhdbf7i1mee69ugddyufkrjyeuh19a0kbjssinhjafpd7l1sxp07xr9vu0lp8muiok5rjearuh',
                remotePort: 6883719835,
                directory: 'ujmcca9swtde6m6tkdc0u9pmnhbi08tcec3dhej9xwrxrs9lcufa4qszex8cfolinpo7s87dw4l4qmxuh9w1otb8xerni5gophk7aomfpjb7cjooqaosdersjwbnshaf3uv8f4038kiz5rzv7lapfi8jg3sm0do260eo86eevfqhqnaefyjnisb0i5im1zuqkj2imt8oogxzulxifsxcnmwepc8jyrj8rz2zmqlpwn9j1q554ycxwtrzbwifwwrtkmqr0exgq1qfcmhv5vfqxiylljlia0xg04vbwb0jfwr6zdze8ejahq1a9hodd15stzjq4vcvenboz3bq3xok8jsg0h48m2uqrbscs9bxmmbjpe6543plmra2pde37k0n852fg0yf9ap2a5ltwicy166xrhqzqbdaoddyb6y7k9vs9qwk50997zrnb2bskom29fzk1sc4mrx1wpociw8i1n71aiicevcz57bbkm5o93i73nruqnzh3rabhx432acqp1byv3ndhbynsw8uqzoukhllxgtx2iiouds73tlw3j9zexa9zcfdierfbnwu68nj3xqw1swwlw6fz71xy1n0upo20s4lje27b4fjm82zs5vxvhegjmdgnwmpv89etsvwvopdtf4hmaa8wie4tsm77w4mb9178hy400cxqb4ho19ad2ttmxz030jc8la87rsbrpfjdfn7nrk8b4ywjt3lj1x48dp6xxy0pln17h1dcw643ak77zhqchz4xn0rct5hxzn8vp0d82e3szjtmvndefcttbtwnw3ciehnqyhk3dklqcap8nu21jt4yqovdlxrwc24hml3i2dcsfj49xvx8lh8ao3x08t1hwc127vf0fnqbio2ir61k3kb91ocx50e4b8p5rt5oeo51te23rmai1a7pkskvn4h1766np5js3q3ih1o75wf0opn9mso54m7j38cyva9sw83sclsjffxtzmbnykktglymfvg1hcadsc1d8lbrpfie76ucuk06yxg',
                fileSchema: 'vtfcffk51ggrwra9flteznqfsvzzwwtas89jutnh0lyhhces132b5qy9pr34c1oeu235bxn3iuhj1cva4w6svfsu64iilhaj8xknkw1bi4m7fcl9slrym8savp24txta4nyapgl5aq2t26ledglt775nbm6jdtnygtnmdawoy3f83nce1sjvwvuvf4smlpi8kj5q12d9s84pfeyagub45khm6g5rrv28hg07zxlx9hqqg9m5xsuif7uw4f4fvbp3j68q2acd1ou3in3owx50aga2jxxfp6imn7p6ur79fqaha5znre40bjioflm2nhicpe7axb0qrfjkefao81bzt6up9dzlgftk0ezvymjpqbjo4pkxzy86gu3splurqm5g5z97fbq05vtx6ozfxa6wcnvqocq7emh0j3ilyt7dg5hbqnf1z8or3kht004d2vevtpt36bvkx79ctaqwxeonnb40a44zrd9j2gt2d4n7123spkf8txyeiy6gkk4sblgmgogsj44fckhkymqpl868uux035jmc040a9wum8qk1ktoy9xyr4f7868ls20292zzxs5qww822inn2rqi3cwp69dfbhyteh7bj46l1vjnmif1f93e5jnyvl3gvoxna3ti4jnkjz4gryeee4hq4q9bd1wwsoh3k9kx6gk5excmo6skjfwx3y6f07y0b6t26prnat3c8pqse9odczbbiwn4d93rt0p0hzns6urtk27nzfdbwdfznw87gasad607bkmw5p9m3whihi4a7wbgmrwqrf78uzq3qx9zaa9g1m1qut10pluu39v6v5maj151sqesljj0yxtizsrpwfy9ssy1ggv3fh9538618gc2ccd8n9a9qwrjdsw6crnt7d9h52x3km6ayrnlrkouncsacf7z4k2ns8hk66peaqrjy2xrn9eq4gnlk3cv31sk5680nfscq20gejwosq68gnaz931kz5ndunzn8oyj16fdlvq73bbdn1jpnm9xnkgrst2x39q6',
                proxyHost: '455pmgjhryb0u6iba0tsk0h8bipbost922a3lz82sdvmf4r96h025qr7we0j',
                proxyPort: 2855957767,
                destination: 'uadzhm41z47e8zf5yfzi6e5gxzkn2ys98kcqs8mwljqki54dh20zih7vkkwlun5gf0fswwu189069d559dehoiwwtwi0gsqt1z3hsnn3q1hmfg3hjduczlwvlfve6gfg3w2w7efkh0e68hxeyntkxpa037btv75s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bicztggmorl6adc13a97vfd1841dcs1vyh9tu4m71lwy2pspxh2pz7ntbvmq5xx3oad6ksr9hwba4nvlb8qj8nbgyrlhfb1pl6xuek0ftdszytgudclrzmxzd4rtc6kn30kxgim4kittpa37v895752q3kl5yvle',
                responsibleUserAccountName: 'swguuw45w14tahm4lggl',
                lastChangeUserAccount: '2vl9ckp0skm9y6b83m14',
                lastChangedAt: '2020-11-06 00:18:47',
                riInterfaceName: 'ipny777mf37p7ek4tzplkm7nyhsoc16u8oas36rzkk2w1grfmmdqn74i7tb3s30krjqktg9ajrdy6unf9ge2xqvw7yfzged49gbkuu8plgw9a5pm17llugm7r5runozfaxvbtlqnfa7bpycuerdwm3etg2dsoexc',
                riInterfaceNamespace: '12wh80g4dc9a55xn7ri5rp5fwdvct6xqn6of7s4hqoxuhfilneo2wo6ah87dz7nq6ut8uvmcb1veq8iqw552cafi7d2t8qaa2ysdh4r3846asglqbx5n40unsldz0mrfrrs9o3erj0lag7u51u1rbo15gzvwawdw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'q1nczp6xnh6xmd5706413riaq25ig0y18p56z0rn',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'm3i831aoiwj5eijfl6litejgo65oaq01pz327wlwlvcvkp5etc',
                systemId: null,
                systemName: 'qa77kf067jsnp9i9tr6m',
                party: '6i46dgxt9ekw2sov9r8tp08cboxi142xwkfukxw2m518j3cg64sqwi9pwv2vid3nl3jjrj9mvm4pq516k7iqp432zodrc5lyb364z2prqc4o573tht69tk091e9c1wcj5dncue71i76ykwoghrzfq452rxwlvget',
                component: 'n47gu9pfbuigu009pyhv4at7xnqwc13juf8r0d5940en37hpne0nul9jxz72ehz90xwzwe7zmjsacxjyqhj1v5ta8oc8y2h3mqyzzvo3b9yq9rv6fs85jk89il9z8io6ruhnqnc274dxfiwqouxt01k3mtby6bmc',
                name: 'cid66csmypx9kl38q8qofdvzsvpq2f0yfzxynsqbgh27ra7q15hgo5eobh2gfg1j1ba2vd8t7dsrwf2mf3s97c31ndvxrwyb08s0cvwn3czbeqh4alfmc9jk5hkt23a7h7eoud1qsg2uthj71d9ke6u522h85yas',
                flowHash: '4dr0qiv60tqd2unbp9pe2wdqn43uvj6jfdksiq2h',
                flowParty: '1h9an2u706nx84s3sul4ojfejh0c8bneqe3o5vlwvh86jeks90ednsxx92dx89wqr8nf0aspc8dwhuctdunqufskt1ntaevhzlalt1de49jprw25sesxhmpbgqh9tmpbuvmxbpxjxgcyi8msyrblrzvc7u2pl9qf',
                flowReceiverParty: 'povr62nv6bbcdi48fa192gsomv1gpgmb60yde3523fdzcns5037bp6ae8l87qlumuehszucw14gpwe1y3ov9fmnq67y0wkocq221y65sewue4gbkvjoolk4tue6et4jidul5isjym7k38d6eg2efwolxhctc3j9c',
                flowComponent: 'ouy2xm6ohm4z4gr7aq2j3tpep9f07qcv9g698l2hso7qak3n8c62m39qfrwy7ssbkn50wnk1e6pg8dfowfbjhdwoi9gsxcwuht72kt3brf9geq6i348sdqg7xctzlqwdfde32p7phsba8lj3349evmgii4a66ixg',
                flowReceiverComponent: 'ybkhxxtmcdx9ccoinaqko52uj9w83vuq273eo45flpehldrs5ksvikdqiwclncr45z5jx1ocupkul2cmrtz7s30ll9yc19pf99pymqiolqvn0zzd38x78amcxhrgv126sfz9j7wb8fq3n4mafwh3dp1jhdnef4um',
                flowInterfaceName: 'dn4n50ipj9ceuu2kpvmzkeenn48919xqoeyj6wmi4cxnwu19g3e11xkrlo5imt0ny6qpekool130mpkh9wqsbejfczxnncc7w6l2edx0uva94l4s47q6jp882ewc6jsmemtc004vosubazv13kn1l96ug2wr40jh',
                flowInterfaceNamespace: 'e0oxr06eywyq60qbik2ozbok3sqxqednzv9b94ons3npnqovx82xyed24b9agal6ebgaegfu0vkr3tcw1rl13zzb1uxtaau63w3wt6ld3oonpxnmi422zh50h6z7kqd5ndkdy6x0dmwk92g0zg9vi4hruq0ru236',
                version: '0ctcvjrjhj5kbb63vi7e',
                adapterType: '8yo3vsc256nowobpw3lajztpeu41ju4a7lyztsm7xnvlfawyn6x2lxgi3gjg',
                direction: 'SENDER',
                transportProtocol: 'kb2nt55mxhn1j3dv5u5l16exodqlgej0wb2ecy3a0i6pqoel3h8unvsoln29',
                messageProtocol: '6kobmqvjq2qjt9pkmkxhx0jaqude580eck0yuncj6yanxkkswd6jwdvyacjm',
                adapterEngineName: '5lqxj906tywpug3x7whenp19e7km8txu0a8muxq2zuo8ukrpw76irmhrhnas3gsdlrzqgfm7uve38u8hkq5orljk3w3vqext0571tacx8w6u7tmg8rqqgo6klu1m9okd6d87dj4c7g2sy5zyw6kupft9i1bxo446',
                url: 'gwxxg4zi3tfv04p558hzawip57jacfunjr1kt5c8h4rp68wtgw719flm0dmxnftvs1qjqynq8zd64evo9nbcktnw7yl4cox9z6sagzu8c2nkmpktdtu31zy4vj9w3x8e8fjcdhmh4858f72q9ilpph3ah9mv2lrn6ftviegmid8ivavkv9r07vp2etjiutr1zzb1bbmdb1wuzipnw02zib4llmlfwbtipref9lnwsbd46hp028rakwrkb437ampkdwexdmruqbx0ddrfsgofe6frq65zihkjsh9hewqeb4leqwni08xfzdpy8rrjltqw',
                username: 'e1il1v9ixs78zfpzv8wujkg0qoylmh8m6jbtpx6tmq9t4ko6q0sjpoqvx8eb',
                remoteHost: 'akmdwv0f6s42dy9zph9kiml38x8eg026rk96u3coi3lpdv2ad5su8kpwgva8sunq1fswc0umqd2eqc6kk6qg02kuv3c0jcn3fv7h1uupbrl40b1lhuvmibtr70klcn4dql78hbdalabpypr5051t3dhyj2v4f32c',
                remotePort: 1791036873,
                directory: '600evxwngosnlmvoqgsht3a276d2mi5ag8f9z4j5a24ux3rbfcmce4q0jzuoa3u28e7038x8tbf8el0r4lwp6gp1m9zldkv14ozmg0xyvm1fnm1ksfeodz1fnvg5x9zn26ej53dx8o5vjrtaqstmti0z5wpy0ql9kxezgr30tesumqibfu1i97wtdazyi9zirjx6d9idwrs1629rrw5v4na2epxgo5u0um6kglavqfj1vptwowwvxs1ytk6roycae3k2qfl5o20ex030ax9p854a44tne729u9xwqzsborq8mevy0szja8vb4vk4obxdyn5xs6zugcahrbxton8657o3q3co2u3ol2shqxd0lx4vfus0bukdawwi6ahsfcv86fc3r8tw1ehsq9egfb6ftalgzai64fkeil2b34xch4dmkvao25agzupuy9wdzsgr8kx1dqb11ri5cx62n312jobsoj1blnsc14vju8edivig83nzq0cvvrafk2a8zu1qv6vo6aozxpsvmdkwr9q6fne1uyukoixq3bmfplplhb6rghbtprs5f1qak7bmc69r714iwx6et4tqxqd1ylacihbd8klmgxfpt5hl5dxrt6erw0nadn63w72dzx81lj6awofuvnrewtetlv3c4xf8zdrfp1v9gy4k9r7c38uuq9z8652ery4m3aya5sg8ewqf3m8sl5irgr6vmcjn6nhthxe0l2q4f0werdkl67wrg8k953kx4jbsn2hsjqgorsqtd8u572wx1uavez8t1sboue0boavu4st5crsh288mj7el1eigkyi3evvin849ifl53909101qkoi860icji98e5a7gonew70ncqqrf50diow0icx7eg678ubshtf09zrc3bqtbgoqda84ipvaqgr0bjpd2zzccg6r4g8hvu7yxf986n6o826aq4dytsvgl0k12uthh1g805e3tkyx7sytv1suudtjtpwso4dggikfa5dtgqmxeapu1wxnmdgiayxj',
                fileSchema: '29f551ab7a3jilxtwjny9bpnbxfo453pqm1n953b0kmsy527nl3487no7fkzla2bot2tsw9m497fyayga2bgndad1c6g0exu2e7dovymrhrtg6nzdui9th8rhqof2m6uz9hhx20ubsvsvaoul812ipke08rrlq9zm8twiu4gy1f9owao2ohyb6hem3i04s1frdtpyk88e4aenshrowmdc6eh22cf8hcbciy82rpozgss7lo3yxqxtlyfqs2rrqpetqxkqadrc9sw0bhg8iaewfh0d7xs3u00ffl27x7pig4h6tsp0hvl1e4r2bp860ikz2uudm7vwfplu9o8w0lsrgjikpivtp4my9e54d3yyk5i6z8vb3bz9pnvq16kwqmdyy2nbj95xgsetx8pgs21jhhw4gzifjw7i2vir1b7mhpxyrmcu9324vztgpujn13iagrs4s4b9en90u0igh5vg21oupnhz9oobcg6rvsc477nz3lga0a5848ge7svmqjo8xb7ilpohpkbnf6ykhty3bpv9rqn2ckujvn9nknqjw1j8miqwbxus7hbonvypdt29df2qslz3nqiwoklh69179dhp0w6k8q42vhfcuqtj8l88sznm9sx3bi945k61vc558jnui7j9uule6i2ry3qpiq47x9otl0ey2karbg46484p9zgiljvplo4uwmoufbqcz3uev6l9pdst9nkdpcugonqhak4iqdh1tfjdn94pl1j6ymkdomv46agybllwi0q71yanw0s14poldzfwcj55yh1d2wsf7yocgaadl6ggrfpgz1wsv90h3euifjlx4bx9esai1vlsccid3jams989fubj8x44p1e2b5dp3cq6ba7bt213rspt8hcuvm2rxg0hlf3kxss74j3uqhxgc0we2dixlk4y3abii5fuzrtp2v374jpail4wi23rt2k73wewr6cls7tyvz94hp00xrw1qeya5pbgdvgij0fvs10vdelhrvfnlnvik2xqn9u7xyj',
                proxyHost: 'k10zqd68wesmlkawv3kf4trr1h3v18m3koyxogf908hsf0iog2svjbuv7y8b',
                proxyPort: 4728968908,
                destination: 'jjkn7rnpyrhwdn5llaj7cc3yvn0htxf4n1vrqmpv4711tjpm8mec40k0uo2a21tzet22tpz52pdj2x5kbkd8vtnm6p7uk5do7e18clzk09vnp1owcsqelwoovjmcmlks7ulcyra56z28ucn5kymil5o63pq8hbzu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ib023ob5c780jclpolu2mfipvdbk18xhspukceoycm1x04bczrhwyxecei3g4ebjz8zjq3caf8urd3q4f2btnl776tddeg3k2a5x0oh39wbju3luoutz9tos7uknl35ux1tgx85t23h330qv2n50ih1ke2mt80vg',
                responsibleUserAccountName: 'moher4ricg9udvyw7pjz',
                lastChangeUserAccount: 'uieyuof9lfsu6y2vzyi8',
                lastChangedAt: '2020-11-05 18:24:07',
                riInterfaceName: 'rm0m6fa5w7blk0j8xohwwufc2c28dxarsqqwmw76nfmhh8k3i5riekcqlz1ya83e9ntstze7x4708wmxh4bzu5gvzj1xwnup5gvinhlb4z63ck6df7nmh50hmglqtudv3v9tk8qp8vzld92qm4vohvy2fvw1n480',
                riInterfaceNamespace: 'n0ktpfqr7q1bpobfdyp7at311qeek551qj330u8x5h4909gfjy5s3u8h2ma5cthq1fm7rsbfh2wj2pby2or4gj9ki62gjnrlc9rmwfwdr9gyk4s2x4i9ed9t41dsmdce0c1p9h35if89qf8mf35c4f5tj1m0ncg1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'obeuw3u9t94fmqutki0qy3aacpmqy2s4gijwjo4n',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'ln2irhc8i0wp2jr9u84ydqzxqmrwgulpw1jirndjnlib751pqo',
                
                systemName: '0expd7mh3c9e0y7wlnf4',
                party: 'tgs8vp9bzvs7ssd2f0t14eruk6ipvkz0fm8dmxb295ojtl8m9xp56evkd2ehul6ry5ngyi0p3owefhh6qk9r0pyo8antjyfnjehjynvvkqm0itpoz9u0artkf3gb528e4ion2c7ftuifeim0an82ldggm537ef8x',
                component: '1xhokzdhev2dnfqgn8snrspukgbtmav0od2z0bgu7krh58n0pjfoo2siuaho2rnobk9u0c7xjqak0fwnvmh5mdv4he1ap7sc4ure06rikl70b91trcqcov0kbf0moleh7xy4ahbzmpsnfl6eet81qg4gt4klpjjc',
                name: '9tgwem72esg5y2p0yxbxc7jcanvk9wmtglt15l5v7kng0twzzk8bman0znsqwc7f8o04ezlll4nxl0836q1awsenthc0cr5dpe03n4ryn90emtyzsj50vnfq2di5w23yyefnldg42p8k25l2l164wlsxnuiqz0b7',
                flowHash: '4543kl1jsgjc1dnle871rn0vebac670jf6e1ip63',
                flowParty: '5mrc75oi1sbfvamedpzavx6rihc6apizcp62xvfy7hh67wbwca8lvfs5ot6gtsofimte36jp3fydg5lnudnv07bv9j037bvw87zv8ihry89gnlrh383xqe313tdf8gmqiq93yeic1x7h18pwwiiiv8lf31sxqgol',
                flowReceiverParty: 'ol8o076nvqrwfy8lg3i03jqn2chrezz352kfcajztf0knuncux8pu0m6gl0px9m07ke3s9yflxs3s964ymxmso8b048j3od9i912sqxn3dr0apjd0p2pjqd1n71592i1xttqiqh8buqx9le096pvneq3a8y7mexm',
                flowComponent: 'oblmkzh6t1i9ruict9a6ikqnc2a7ysrjf0ntvj83gdqr9voctrtcd060c3q1ejirkgo0a03yyunswmoz2easrxw3404j725gnatft6bht4ogu0rihpkd93oehlyaq65do7vlbrvrghng4x88abebmokt1onlewc5',
                flowReceiverComponent: 'mcyfsc9zp73zygbe4nl0gi0suxqyt1jvrprbsayd4cv8zqogy1z5hb9uhho6sktvbt3m6mi45s27o0ug6h1j55inw7ovza4ocl7m3jezc99jpmh5qzv39aqmk3y47079c7h0r8jj3cib16x7f6r1yh7z2wilk7h8',
                flowInterfaceName: 'x3djk9k27024bu7c46s2y9mjjvjfjac64ef1nzr9g4yxtu14aq3bmer7lqo2wmmcpgmojjvwkjdetz15jhtbok0zgc71vwr0b2riuii3fxpmgzb66ng0qisbswcliyd2cx32c51gkabg9ca8hy9ow1y2s33y3653',
                flowInterfaceNamespace: 'peorpctbyrxcrmr49i4n39tyfq3uk550akthh2m8bwq71rf9afdlax6x5kr6hv97y7y9hm29lt7xcihpuzpzk1xtcm88kyrgzgcknfqxll277tgty3mcuk0zzswv64fucte7506okejk8777th21likl72g4eat1',
                version: 'c8nxwfyzii07huii76d9',
                adapterType: 'w9p4p8rqilm0u87b2oqw1hyq3fm3b8tboo0l8g5ovth8n34xm59hgnuw0t0q',
                direction: 'SENDER',
                transportProtocol: 'z5dibmrgjbu5hsss0zaelns6vuw8gspqg3dxpy5wqq64we5s95nv7cqnyiiw',
                messageProtocol: 'nf386tjjzlgn036o308u808k4k0kal5n4cjo3qpucypfc8xh7ntz1n9rdfil',
                adapterEngineName: 'wnf7gl9gee5uxz9wdpnuhwu0y42hzn7mhrvs46iwpxf8zwy2bu1ckb3sb3hq6y8xwpnry16j7t0p8szso1jmbjwhyl6zwycsgpbr8sckrfgb2266khjoulvcnr8y8z140irswi8m6kvftxyk7bae54cx3odmcwum',
                url: 'wriyn4bj4md6pb34fccnkke5vylnals0upl8qb4vv4csh1r7sx0wbhogil44mjamex4q5kfqzyvbeqyb1kfmmataz8w30gxfixidhmrm2ylezue0ig54bbrcj2rfmmovd66zuy6kunf43owadn6amp3o7llwm1e55jpbm9harqjcngredi4xmxccd86ngzyaumzzktsy077r6w4vr89c0mr2cfrsqz5gqjo28b1tvz69uxzmoxo04fuatal26tyi5roq8z96b61yl1zuqrhaynt2lcgodw5q3ec5cj05mlfqu7jrej14c2o6djlqubgd',
                username: 'qlh497fon78bdoojjoz18ob1tjm8lcs8ct6abrvqhb8lgvn0j74e1o714mdx',
                remoteHost: '4cnihmk5a8qirx18n410p9nhcslgohtrjwybf5jmzj9gg5vs7fzx7ubvwabdeifmde4pb9cwsa2gfvove56sk9xdg21cmikq4e7kmhltgfmxz4b3ms5d07lw4t14mfnsvhcqtmf4rvxtbiknkl2i2m2opi1fznno',
                remotePort: 1545747174,
                directory: 'vtipqrcks85dcg4vs3e08yd439tswbkqi2ocopqlxph3viwrk63i6hspidx99qpenmyjy2c20c3isrz3cwdb3xqldu5t19xy3upy31n0h271fdb9ama4wsvmgmrncrsrbfds56ms1291vk9ahdzvhnxifrifgsmmg42ss4kl311ga8gw3qnla86wnduf3v3ax5cxsaelyq2ly248bq4xd66kkq98d3j923hygq7m2n8tbp5kcoh4hjodegyur2bdoilvsgsu8jydfa8ukinykrtff4d10gzp7tvbgoo2cgjpozk27irz5i6h88cdqf8yx552c9nd9aogywytssf5vg65dqupicywsa5t8hl9d8evfq3vjnkodsh8xvt5dklt5qi8vpu4e5napbhs3qcfj9ymb6qoq3epv9cpfpofnjr9uv785szh79fdkgzutyg1nchnyhrepi7n1gtwtkafc74tn9pncpb5ci08yhwcd94hmwlzdfb5l05l14nul3qwfb233yhusp6llrs2sqwtuh3tn0kvcnlvz7njn247yb12iq4n18o9lq12dvdxui0m15xcv65wuw41sv8bwce084tj7v5przqfto3jv2uy3jgrkxlzl683027opb0rbam663w5covid838g37off5tadeh6vxab6ivlstxkcdtvll4z76cynuboexbaq0yjh5te9njpbwa0b00lcs70rvugwurd0d39n98i27fpg5r3bdgs93nu355wqr6wdxgqks00kougby0arh9cjfwxx31cwde7jzr9n464dtm018qa9l1enad360skwr4woptg3zsb5q3igmpzh62s38zbissi9cambllsjrrrkmt7vu5nkfludt2xx3t90mbmylxltwdw6mu0a4nitwyn2jnifdssbtn0xwt4qtzdza4unrag9y4y0vowdhvx4ipcr2mq0dyx3yl18mdapf8i838o0aq9hqyowrck9suuv0c7ksx6owxzvglm5k8kpkikrj57fr9',
                fileSchema: 'd6l4r8w1005gu24u4t4vr0t7pvf9brsnmcb98uzrwneeynm011273cbmoqqkhbf4i3q9xdorsdvxva94p0rlhnhd7bqclcxn1knvg3ujtb6yyj5bx3kauxiwvwq7dh7rj2qztqzciafrzxoobg1wxruq1jvwy28rh4rmnykfu2v07ft8b5skrvr30gy7th5riuozbajmv3dy389lfxcjz8afr5926slpzzzmjze4dnosz52gca9m4jv73pitgxfazhbizzrla2vcl76gn8qol3nc7m7mx274kk8w0y07gfkdcz5xsp0bdt0csb7wro91b9ig7y7qb73nxscolu08hvudwsmkrwlypjq6lpazfluyjkc8s6m1jnhvw3rijnphl5ijzjbd2xptnk0kvtjdl40zmvr4kbvqftb7siau5qy3eb6fqi5b74msxqtwhiuxzf0xo8l6r4i7dp96d3f7jq9bne6y6bwq3y8jq4d07793l4kruzkqq87mxkbvmuqhpes73bfwdisak1mhhnostdafjnk7ltbmx0mdl9x9obwlad42arbjhkkq3nzx3hbmuqlc6zaf5dvh274t56knnl1j3nk3gcwe8t8cxnm3khqigzwp9bu42eyq9cefdbh245xhycwlc5hibjv2bef3uv2qs0rqgdb5xu8t8lecqo9gcnxfa6treiyccejwg2kxiwsz0x7h0qy99la1vzg8987ctldk9g5wo0b0x1out90fyga5yqe7hd1kiyloix1uxkt5w5wvuf2bkmteeax1a2k7ic971gehjryneddkbjryo1qaqg47vlo0i56ikr7vlebp6tn0dv6ovxu0gyennwsj5raiab9lqyuqjxzyblu3fz3rxyd9gxcx6h8f58qrcuee6dxasqnu47t2s4zuc05mmoyaivhlelra74m817wmah31td8snzvfh2hiu5yobdqgtzc5jgwiquxtqr33dvigwak97wonykm863repo7tj5wrbi5umpx3ni18vdcc',
                proxyHost: 'aaywh6enfd8g7wvvts0e0hokgcpa77jqnsvlkbuau8gdew4mszkodx3pm9pz',
                proxyPort: 5241349665,
                destination: 'uog85ifwoa6xxl90g082sedwletgkqv69y3o5prn11p05gj67se31k3b7vdqd7tps4tyfgxy73zt2t507xsrveat3i1lqr0v3mtsla9iraduhb73wxtzs4xl1aljgd57334gtkjcq42k5xetoe0jo3teb6enuawb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c3okh95m3xw1u5c3bv7rpwodyxpykpx3vrsnjwj3gcoclmcwmlvrovsnmiy6aokos1x99hf4smkf1cgj4rizs6wqx8wdinb4o23ubdozv4bgzjwokecfgs4ffk83d7hg5ehbeu8oxkdbzr77e3iyie8n3jj6kn6a',
                responsibleUserAccountName: 'qt2dsxtjsnlrr6x7fjsd',
                lastChangeUserAccount: 'y8pak6qkofp7ed64ah94',
                lastChangedAt: '2020-11-05 17:10:12',
                riInterfaceName: 'l7ey6jk2rqsjcdmr10bux8qhn24y5rir0l049nlj90li33dcz0yk953ltmvy7dnetsircdyc5rzlcud68ctqs3tbwgur6sm86g66igz9pwxte9kyrpt3oqa1jp1tn0pt1h2m6fz861y8zj0pcq0m6sp6cfizlnma',
                riInterfaceNamespace: 'iq0xalla3rzw0sue22nx8f9ambcz2j62li6i1meei0c01azbtolni4hx0y1p50btftovny4i4tnp1puhwksaifp9hyt3sq9er8dce71kjkxwyntwabl6t71ukaq36pgz26a1ksazcd0hhy0345pcp86m7xo8ewub',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'sg3di05869eb0oxd882e5v5uiska5f5s78t0xobw',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'ih2z6mnjnfaez9civ2c655yk1c95caekfurdz0cq3iylxbqgpa',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: null,
                party: 'pwqqjw6a1j8h6jd9a9j3k1uxhykyu0bf9co3u99dyrrzkpam9091tz052tevgoks0uauoumgp7lo5pngkoioye4gkdh2zzyntq3qafvwryz7g2b1qy4azcb53jkrrtr7znsasqk53yzc5i02km0ngud7kqk2khvo',
                component: 'b9p2elhcwne3gcrovyq1dg9n8pcdqahgfbq663axedz42x0gi93znxgd6cscmifmac7uwjdbmuwhbv2cnqwqo5ilk4omvnivmfz7tb7hvovhvmfphebj9qikiqazlp1bmv8boaa9zod3moir27yq62v3c2d9mz44',
                name: 'vms3kvkazbtzrjhznlqpv7gv55djzzuloaq0rg489cvuduse93bs6t6uu5643nwcfdk02rr8bnvmbhy5vsxib39q6rkk9irzc9nv2jw2rkhtisk5uj2waapcvutsho6ab6bck1xq0wqs7hrjn73s9ahc88mkil77',
                flowHash: '0u7ua5o7me7d7wg3cf4i9ywgu3t3rqhfs3a4uuz8',
                flowParty: 'u2ocailexcehusb6tn73imy2y8utss28hh5wwfxn4jrlqseq4qd3jpzyo1trs2z3t7xcohjhhv096l77mm7booi062ciu3h7putpn0o9q6g4vbbmttujyqas159w9xgitvrpo4u4402y396ewrhe3ahh7cnif4i6',
                flowReceiverParty: 'y5rb7kf8wvts1ooixloskyc67jvy7reqpl1stqlaxbh2yaxkulao0vpdoi6tyrii5xebkzwjzogna991i9x7z265sseq8pmh2b8n4jiy8hmr2otvx7nracldc9a0ujuh7nhz0h68wiv96ylln2g1by7qz3nsj0k8',
                flowComponent: 'cl3dbl623iunpfsig9ll40yw4twieb92vurebebtuh572716hwspilsu1sgn8y3i8luox5jk9g77o39m1ucbrnwz3mlf0k3o7rlpbsofa3y5at19fj37n4pu3y19vtnslzzd1vhlgvy2vmdf2rfo50fafl61l3ou',
                flowReceiverComponent: '8a4eudoyqp5uhujnioouftm464mtl3mx794y55c2nl6tojnlkxcdgm6btznekvcjot3tn6xkingb2kbjf8hbr6biezghv4zagdtdjbagz2z2mxwvyg2zu8sqp62xi6mf9kieqt1bq379su9rg150csfygqllphod',
                flowInterfaceName: '4l3zxcw2g1993mvy1zx01nxmg4o0u5nut6x5g5915k4if4ybuqir3u4oe14rh4yvdclsrusysrhndztd43x7fwpqg65877jqcjthzek2nlqmfoheslw08udjnjdmi79d0k0jdpz38bao8tg4y76g55lqgi68vwqc',
                flowInterfaceNamespace: 'iyr8t4um9vt8vda1dzh65jfjrj8euz1jg81ps5bhfxwe203vvwu11swp61gkwgbkocacbjay3ev87gi0menxqrb40uqg3k6qx4351kfu5xl1aetrmzbmha5rfoytwrjlb7fppmsgbj3f16c4z4pp2pwf07aipt4a',
                version: 'fc7pss88npr8oroo1a7p',
                adapterType: 'mu0qpyqa8n9vi2yf66ujcxscel4w1v2bvc9el8bm0m5gxise79jzxqnjld80',
                direction: 'SENDER',
                transportProtocol: 'x9vcvxne9xam22vygtuu7dirscggi0ttklfoofb488ifbaergw4do6aw3ofl',
                messageProtocol: '6d61zxqzx23urwi4sktp7d58g1r9kix8kdcvo67bzqua6f2kp362kw3kzax9',
                adapterEngineName: '4tiur09g6j3e3wehruytbqwgtf07cabq9gannxr5aiu2sr11lsh0zeluab6c8wh6qejgw2rnfp76wzu62bnc44ircy0fzkffv2hjhrf7546dpiute2uzq7gectw4crbk2ez34vh9s2sn3hnex2ri5rb1yhoi9ys7',
                url: '9ljujs7a8k7len7cn4u2p17zbnovee34jw7srb3k5wjnsbi79t7xvcfg8bqw21w8kq0wmudaj38qaof6q69p8aaa4tri2kjqmdqg2qpvgtbq8uhuw5e64b8m6betk0kmc2mxx3fgq3snuof72ljo5lzdgom3thdlloee9h1p5d4wf0dzgcvmpwvb2r79xiwhynpdz834haoc8bn98fy4jyivi7lf0da05htpg7ma27yckgigq4242rfxci72m5n1islto351fsalcag1778l31i63qnxvqbv6ze5an18mbespp8pywvyyg6ulpydl365',
                username: 'qdntyiz3nhnp0vs7j2i8hur14qi22f5uhvahbvx0kyk93cjxzu0c52scj0ri',
                remoteHost: 'thluybtiimrgke3fk57f65ygv8vt7r6pnfpb2hvu5yl2h2s9txytqhmzzq2zmok82qyfk0462a4u58yulan5yo8jntvpbvlqm8mvtlqbfen6etc51n8dr14akrqk9hdgq02rwmy3d2ugb42rowaqb62c7osfkb83',
                remotePort: 5880776728,
                directory: 'pemegl2hb8b4x8p8dwnxfgfx17wiqdkmmi7fwww288laj10ap14seo01jorxo69qkoudjctxtb3scst9j01mfb8idcs62390y883c3cf5u0da0anxj3bglfs04izfkd7eh25sr9xb25i41m0kpqtgfvgken6f1bxnzxzkp6n1e0592gxfnfvtzgzvyx4y3vo9n35qt2id77h2iysat6e3d4n1mj1jtdplczlxjprm8huq8gsdqzzj2u5bxvmhcl1vr6i7kxgsbsf75wo0xf5r8df74975qsgjw970hxlzigqpd0n0sjhfg686oxjrjxetkatamfd6rglgk1whi02xtats7mdt32bvf0s9cwx0r4fdd977wbk4kl8ehvverbbczqto5iaxq3dpm1r5tk99k4o8nu81dvsl348ie3rncmxlmzs3d3fzyy87gxjx7p6gl8qynpd474u02v56wu9srdd7p2t6m3l0kctlypsrtxo5irm5iwtyme322an2k49hlrr478xgpft784u7d6zwi06xuxut2bmzc1c19o42jde97s1qnjp4pm93eo0068ozn825kyjpr297dmgh96jpb51e6saadn53iei944btct50jwuf5nsaqz8y4ukr3wqmc4c3zlf9qhtxv068y4aeyf64f8dwmxy5wadyjtm1qt7yxfw1c44hml9nbnvjzlybtscd9tp1mzjv80zwxorww5gpxkkgx8jbancen98d2zzev46kbip6vrcykuci9qemd416b3vegqpju2hrlkf5om00suoo3nhdbqfud4ghe5d9m953d4ynuvgesnp897ldxbrpxw8z56cagaamiayecv3b519mf5b2bksegzlnilefb1ctit3yjvj8bd1wtmib4v7gycz4agqls491d1wmewg5wd2d1xc19qbus9js2lwcdg00nekqyw8a79luuxly8dx922dkcr3y1zfh5exe2yyifehh32n8o832o9fmzekbsx4lhfz3ui1cwr3gjg7',
                fileSchema: 'jvm2q6o51b3bbxbvbtpa4d6o0a8m8r7caj3yvk1d94mq4xrhe7qbmpajqc91xcsa1cf8h36q7a134cpl88sfm6jcpppzuoqdldk8wphvn9bbzcmusp2x7g8va6v6heg4yw3li9y3cewya5jw9avsczpbmv1zof27sguvsl8geb1jl0ysmpsvgcpf496do7ivdequmyf9bcr42cruuf3u8j89ew81z341l17eymecdboeu905bd6q7crq3ck8s36jsn7dpa5stv174uf7adfxjhdqxkbwcf7mid4ggjbnn3wzg7iaexmw45d2y3bcairuj9xfq7ifablckbh5p431n5c7rxq0kztk2vbgdmrjjes6a6zwzfmydfo48jxi5ovsk0sxkuydz7xvd0og68f3yut7b6l7opknhfgu1dm4swyveqwe6tcdq92fq3cey3z7tyw4hao9dcp5a7nixw07rbcttgvt3e9gcjyn1ve0gn64m68ftkmr4h673ct1r2qfzww4cfrv6fc9hpxalxlo1r9w5pojvzgsbur0fzlq49oc00iyysszfhrcvbgicb6y5evl1uh5viiah88uoonp51l243jxmrcb3k7gbgu36029wdpxlfojfxwbqpf4b2kmrykieh5h1084l2vuzhuabzf0pe0e6rz9ms9lg3qpelyj9h2ck7bqpc7uvjxl5hkugq4ubkdtjwod5rvoelmuk5xmt3hzqt053qoxn1y5zoiuqahlnkimon4k17pr409kp3y0fresermz7voiy0s3aama9bei2etrgf0vfhz613q850okw5g4jd555l84g5du97k8fx2zi3rogmju7wsvukw4id3c2csydh8z7yf01070m1i1529qcm7u4cl6mo88eel6zxs0atx4g36f10d42fdjhvcv448zg7sd6nmpshtb50nh6jdk0tb6fpqwu72z2qyp4rygyeu8pzl0mw8bcd6vcl9yuheb4j2geldtyr2cc4oerdg3pytghbuh9umm',
                proxyHost: 'n3fn3z30z7aebrva3w9ed7da4rybs6ocxfco0gg43oz8ie05kqxk5jyvd1bf',
                proxyPort: 2765704391,
                destination: '6tosxiq94ahknemh2kst71tsumns2d0bhsnk8v1tig4sn9jxt8oogqub2xgp25uys7ig0cuyq51wst19tugz1xysoo53ms8st8z0dk4c4ycpxu8t5daowas9m7c22pgga6zo3b4uww0okoein5qm30qrj0vhbc8d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5ckc5btynjsny35d9fijj33u3m2pk2s3s0xieqyqm6ffklmzncxqtuif6y93f62oem09n02pdlij1wl4eyf9l27cfw1x1z835m2uwmxq3nji50xh4tcv07dm5knv81kpujpg546xb9bao3hbbq13bdg8096eitqh',
                responsibleUserAccountName: 'shviclmg49xqvwq3izwn',
                lastChangeUserAccount: 'r5lxxpgbd7hp3zghupcm',
                lastChangedAt: '2020-11-06 06:56:35',
                riInterfaceName: 'wueg7whpcu8d39gj5a9jm7vk4ro3tn5iv4ej0xb0f68jk8tu1vkjwuhkzhy69wj3oorvpbawvovf6q8lx2g7gtfefrerhqd0r8ph1krkfq576f5c4ofq3zzfoqz56obctx9jb98e5280hjpgpsvbi1lzxzqp8u5x',
                riInterfaceNamespace: 'ns2nsrgo12l50hv8fp5uu1vjqvri05cs0a4t2xp0oi1ynysq0an387r76mfy3su9vk5ot5a0s81yl24pymyxxucw129wp46dfqocnfsmk8yqe5th1j4zu8jnx02ll4m0xa41w2ck71l4kiq16bhzup3sknudthmw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'f1f1ea40k38btdb9a946guqhdyvgj1l850jg95lv',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'woa92lmeakh30fylnxt8qhr6t0h2zccqu8ztt1h8axe69q2vzf',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                
                party: 'vn2hnytcyxs0fxve9d5j7ydq262ok9zxs4ag0h9643opjzkof38jqdlbspwk39hmtimo0fcu94e0us901z9y809cer77ygdgyc2jtcag1lmcfoskyn0q4gwzcn1nbid9dm7zlrnpfrsqfvf32v97ywhsmdrdad7l',
                component: 'f40ycbr5f3kzsopsx9xm879tvz4lfqf4hn4vczf6az5m9mggnpovh1n5djo3e0qjz9ytlsmdno33e5vx84rz4gcyyx2uscc5j3dbkxlf1a5kh6cnajmojskjrroigc678cxoiefozxvpzsna435b0gipqxcdelg3',
                name: 'jps00idmq53waucdbjhsyhpviq1mohjeba6aywzigauzqz5b4agi847e68qrm8cbe0clfxtfv29bc8cdc4r3qud0bfd2jzagpzvubrkvu34x2mk14oaamrrqbj5datki8alz82wr2ir3ivl0fcxp1ymzuf9sgjav',
                flowHash: '3tygz5k2zc13r2dq89llfaybiy5ff5c7lak5mww2',
                flowParty: '65jatgegokexdfg9sul9963kyek18szdfw8kbblcbq5m20cxd0iczu9ltccwupmrxy7whgxu1bg5bocthtgeoxp2nhba5qiid78eujj94pffpm8n5qn05pfn4mtf0yoxg33vyqmm4319ug6b1yzmevrgi4c71512',
                flowReceiverParty: '659wo93t4xkffi517d4odzck7o9m80kcqrozl7v99t76jka69lun8jfjl1g7eibbt6l8s45ckclyvzdrmz9ruze7rv2t74wwyb6622fkdiywkx81rvkqu1ivb96ndl8iiukrxy92cu3jx58jfukzmn4elv1wnrfa',
                flowComponent: 'ymjrp98ntlw6tnsmk1umtuoaajdkjccs00l4qy6kjpdx9blc98jx4a47b2v8fleh9p79iruqum5v51mr8epbstewc28b4e0w47xqiobt3g5j6t0bkh3fe5uckax1l9y9ko8qsvjs08lv4ac6uo6e005hy9xxz2ez',
                flowReceiverComponent: 'a1qpccpfok7s90ty9w1motp482bntn39lu8key9eprjtke18t9qu59sg7eh3rm72porr42gg7kwxgl74hqjt34ubnido0phopgapo3fxye3nx4wmsh2ic0u1cmoik7n3b4pnos312y57knn7j9lptrgfptwzo2y0',
                flowInterfaceName: 'vp8ea7qh7thgnqq65zyxappsltc78i4lir6vx8ouii935npa7hf00iyz77dpcvles3zed5inltnjl5wzpd57k2bv6gdiqeu79mb5zu6ozxfe20kp9en3kwqlb7rtooc1gfydh8ej7w2kcmxnd19zay6r380x8k7w',
                flowInterfaceNamespace: 'k3ea1196uo5zn1oldw257m6qa60e2vlxpf78gmqmg1wo0o2j5eb7x6otsalwklv6hgo2n9ndvucrpxczavxuoxewl5q9lknlff8ei40w4c5fc8mieaa0noyib3f3xdmykwy2dm4vk4jq2dbjm0b7l089f8dluddz',
                version: 'ur0pznhgnok2oh4jv0jz',
                adapterType: 'kvt81lxrxrz7vfotm82hjb2knl38pa3n8znkaa1y9y4x2di6x2rqamhxus6b',
                direction: 'SENDER',
                transportProtocol: 'ucpwi8egtu39lkda1x024yrw99ex54ykn52mpxkgp965j4s80yypglx9gu0p',
                messageProtocol: 'i2zeiwwvnjg0l3b98mu548xvf90rd56zxb6j255ktzrf8iegglx5hhvllvg8',
                adapterEngineName: 'q40v3dv7bj64bgp0noyjqxeyhco42lrzakt2rc5i9981a4kl8bp0kgqnlqk5wocgtcuzym88t4vzh90ykwjpcgu5vfixsphgkjwh9mcndt8f9s88ka97rxm35imwegavs5omnjvz1ywn4ur56eeosawx8tx9txio',
                url: 'oht9b824kj2l46sn9besm6rqbc9wlzbgb83pu2c2i2a0ug29d8ohc7kcyhyft0a2bvq60fktrybd55ssxqlk5f364k3polqzhwlg1vg7rnd00znx14vclbdj8jytb5thjlcs37xf9cnzp2pkyi4z3qtg84j05gqwsda7db6ur8b97enpflo06m8uf3zp5o408mvxjo0eppue2sdqh2pnsxb44wdzvg3nbxg7lc84skdano1ui58ci50w5nzmeyx0hdlk7e88pv8daufeki646p0hlyr9i3u2i346dysjuiy46ika3rizeajzu24ll8x3',
                username: '8echzrsq6iz49yon8ea63sp5zvbsge49c26j7rwvcdczf5i8deimmny5tzkh',
                remoteHost: 'j73lg04ftbkjobqnw040wofy2w6gjrnhe3ppycyziyhy7x8z73gxq4w35tf8p4l0qc0u6t8wvtglhdd674p49llayih5et29ncts8kgqyf2f8qh4hwnb4dr05p7wie6lcmy8adur5qx15cvz1fptkk6qq4tgalzh',
                remotePort: 4758100812,
                directory: 'u9hhulcz7550otoc70mzuofo6bacrwz9vaotyg2zsups5xpfna0o2a5j36g1k6k67lga9ss95crgx4360ejwwyuez8m00h7o6pt2eq86m8db97en7udyd83o3s1lhe2i18heyztep5bt6cq5ptgz9tif7qz1xda7z33ml40x9jfuu7xf9xgl4c98hiadf99jhgiksr8a4j4eei4q3z65galha8132ow6mvyr37yu17ncuaocjz919zufz2rppbwzbvmi8j0wdfg4mtegoacp6n1ghfk8pexpoplgmo9pri86223gups2gqgh6gu1ai56spqddu2unpgw0sh20ggnhmozbvk2x7otbvmt7z3y3qzxn5xizangog4pvwra5hn6ogr1rwru94ob3v89v4tn9kxat7qfyvj4ogytuyhx9hbob3rnzvrsqxee8jcfy9znh8ji6arszijr8nev6ncj3yf2d6kl07jovilh72ktapd3v5t2a1bgoqrb5ypalrma0zqnbyunf78vxbnw4fm24pw19b1he0p9qxc8vih53sbrhxbfu4fkh83r5sa54ojvczdzwqbu7ejrkrew0s4t5l752p100ijldy4w88fg527nsq6aos1qq08e5k4gfyh72vadp81dkazdzg38tl6nxdncu3qiqwizp5kh3gebnb46x4guw6mob0fiv77w9dwtp680xlyi0ibj8rqvdfruhixe8cn0hcfcrtb5q4n6tm1lq0bgqhr6b095skza1vvpx3dhld01h42dysiphh6kuzwjsu2mapxz9az230q50cg94worcaajv1sbef6b1w6dik2x2w0cc4m6cdcv9nty0obriyh7iot4ykgc1h360y59g07q1p3x2l6y85643qj840xrbetrn2e8uy2jd5w7rvqf98ry5yt4i6r1tv27uv3rr4sh3bt5fvpl393d2p96kyw17tatv66400xzocwypszujrd0nibp1we0nhg3eejcyk35pfs7e18p2sigutgs',
                fileSchema: 'zhripqfe7nk3lgevsteiyv68r88binqxn7lipa9uq1orroyphmtpd3hr7b00dgbj072bc6l3ud9q4urttv6y31vtjj4awkac9czbqk1xkf3nrdzouefbcxsd4gk2mjao762ke3hcyv1fkybycpdi5eux6js9jnh7fvlrh7kaldzso8srz7uku830f9ch1u07su8xrzkaq5f4zlkjskvjoa6pmahvj8mawexmfp3vhxw1kkvm8dpxc0he8n59e9cq0jap4fj4w01smojjmoij9s9zdespa4t256vx41lb8d1c7irafxlpuvnurjeu5wtdjjxm3m0rk95mr1sbbruuedpml6yvv1ku8egisqiygs1njge3laaaculsllxmprjzof9mnk0cuf4sz0fr48x8fuprdidph5o8lrhogjeefvx2esa0gq7vxe6fqaxojgaae593kzyiihdx5nakdytbzkudcnivybi6us4whabjkyc22t8q2xccpu6rlz6fjo6wmhyvu4y4nydkot109hz3lsmlfe50vsyhiur5j346ezqrig1zk6g7wu2ds788vm0fixku7g2pl6jnv7c8aogvr9xvrue4ulimldi18mt3s6wyy2wcwmicjl56zoe7pf4q0ffrmgi1lfc8bvd4c9bjpxikwgnqrp5zol97haujswa6znwvf8bby77x8r7axdqftn2f0akwyujfj2h7rroppxkfmt9wbhi2y8qvl391yjxmbsmddi6bmyj5uwtjvthtj2z2lzi52d0j86bf9rr5g5sghx3ww5urfje0w21hejohem4u0evrevx1rvnm9zhkf1870s634xyx7ndz0wgnslxht7zzlathugu11lzxl8ccqrv1tpirv24jr3tr9g6flt9uq878knv86b2izl3i2myywmx8j7u0llk048lyyjkwslfegq74jjlj1t7lg65tcbjvau12cxmanhnrbgz93awunyy9m6g97zcdut507kwuy1q1sri1wz7j7mmo09g5',
                proxyHost: 'rc1ko0s5hxhuk4hrnuwrx4w2mdife2worqm74ro540hf0kf933shonx48vq8',
                proxyPort: 8274247900,
                destination: '3brjkie4p9idgn6186grt0xqptk1d62cz4e5bpt4b3h5szfe1tcgz7alpy73h8pys7aqx7noz8tadyzphm716uhjh2p6bsdlw7h603pukxllt4f8ifin91973zksqddbkvg6fjadgamwh5od9ys4kmyzy3e7mhhs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j7falm14ch05s4l1km8605uilwwpo3m3a0c9klwvo2v5e7cwvs5wc5d0hlmbxa67ulnrymwt6vmt7lyxlg32k9sugq2necr73terwc9xs6x2x6gl4r0f9gnasv7zq7li3pp5j6odvvzledy37x76awll2xn95xew',
                responsibleUserAccountName: 'r7xbcvj0pzx9zvxlki47',
                lastChangeUserAccount: '9tu1ruladrrimpaeoxon',
                lastChangedAt: '2020-11-06 11:37:19',
                riInterfaceName: 'v2ux1stb1dprz5g603bqwork2skfsza4ze0fiwnyw63y1jbg5nuzecotnn4if75pjyw4znyufj48fdavmnsxnbmv7z62vz1vhzuobpmuwq3l20bz2cjiguq8z7lbv8fqfcxctb30dyfo7usk8jw6m1sg6i7jmfwd',
                riInterfaceNamespace: 'netbmrakd4114dkz2sronpjf2gf4dg80yyhviott3brac0lyw1ot6eilww4p1i0d86zf1qdfk8m341bo3lqy714utir3psw9s2i2kbsksbfi6ibrff5qosto42aiubk23ti87r14v8dzkx1wnx1kiuxebqt0eej3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '1oqbzeablv8y6i3j9cmcsezxteqhf2gcm6g95f1y',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'dzi0pcd8ntrxn4dyu6h6kik0cgqlz298asllpciem6xhs70rrx',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'b4fy7lnlfjzxzgvztpxg',
                party: '4pqal75qhhrn4sn8ffhx6n15fea1ncj87urfxny6fgnycmcxjxfkoc82ndkr8xpzlgzvvrmybzsnnhcdr00epc45b0tycvm4owys0vrp3m08g6wefldh3hp5gwsrxtjai1ptow1c668kszijpzuat9h217gvhjrn',
                component: null,
                name: 'uozp76zaxz57fc1qhmaqnsx2xs95o5b6m0tnh6ukj9kxs1vntm2fhs1qthukxnp0mpufuupey9znc5irzmmz4zwzeeltcisf4eafgoog14tkksyxpz9ov5k1ub7coujqz2rulsq3hnqlxucn4ui9o45d1rmhk8f7',
                flowHash: 'gqou6rnm903e8nkjou6oz6qkwtvfcic8kgb6262w',
                flowParty: '6d48vpbrvbwwzuww68o6ojyvkjsh8520ah7llkee28v1pwv0scgrdqnf9knbd9qqame6fmmoowrsfpf0x45r7udmsfe80om2k32ldm2kg6azvzb8zg24fwmxv5dz6vasdbqif5j6vc415fanyuegq6ot0kjn7ijw',
                flowReceiverParty: 't7bh1gymmlkbnrdutdm5ppxkt9l8ujhxu4jauta78aky2jo2k65qmhu205yelji7sk3rvl19uixy7yvxxkpcyd1pqb56q9qjnpsax8fz1cc64v7epgziuj4r3hjdyesqc96f1su5n6zd1bysc3xal7eby41v8lce',
                flowComponent: 'n5eh9lfjwyosc1jdm6jmrc4i3hwa75obegxnnt9qloqbp7n13aqdgyule4ep81q75eicivmlpvosl91hh7hjmtv1f8odkqgfb0dzqgdqw7iqsc41zyykhrkqktxopthwnp3bxoty43zm43tcec4obd7wvyycv47g',
                flowReceiverComponent: 'itolcp5go8fk2sxnhlaj4ssatzl8ok3j0wusw9wz79yajudup7fp9ltvxx3zp4tc2evdyjd631zh4nyoe7rt7unx15fe2u57p6soi7qt2x0n1p47g7jr6j094cpkj5ym1ld654ycfpddbh8mv5vfh7qloumptapw',
                flowInterfaceName: 'ytl53dx7xhc7ijip2896ncj2xe7i6iotp6k7kzk3pqiud2k4ubc7df8cupfdou7snf9vmclgeraqd2obut6dtetvzmei08u55wyapld9zyrqrath3z145mcxvaif70u4c4omqvommclxmcqib6zr3cdih15yox1z',
                flowInterfaceNamespace: 'hv58idyinnvlg6mq75ov2o6c11ki26b4efaz38ewradcn7sjrml4bub0xwt36r369119w5r7u4ei3czj3vo566hkk5f58mob5jrjfbw91o5sd76dk4o16n66ktld1tvawnr0fd1pn59wr57p7rs63piqgjyoaima',
                version: 'wl8zszpxml3129b54j73',
                adapterType: 'wyc4u0awhso20z9h1fdyg1l0iddzk1xi7gbf712rppjdsrbw2wrnvxkn6dkx',
                direction: 'RECEIVER',
                transportProtocol: 'kg7zaextm385z24jtxgh8wzujl3x4ra369z25rxcvv9bqe9pt8gl5x5a20ta',
                messageProtocol: 'mkcvix0wcnrph820q1up5sbea7odh8hg1fabxa50n5leua0o3hcqm74g79vs',
                adapterEngineName: 'q1xwjkb528lg0mnbjf7uhlnimwj4x6anpn8e95fo0adchl5p9w26m1ahmg9zer6u5q95sv3bxnb8qxw55aisjgwtow7ne52efmdgay43qspsbrxhr5fbscxfl39s9m7fjvzyrbrrgy6wbtsbam5zco6r25xe2y2e',
                url: 'jznp7eugmyim9h8c9ddl7o1h1r5hwbaphxxhwgo7plkx628ih94fg6mscga6vsb619i9a9mlfu8qc0gdyznfhh75i5ertsqiapeyqinf3sefwqwe7b3bzb98ety4dk316dbwrht3lizamlve8akneaeq7za37pldxq6yt24fio56nzqeqsympeag2w34itzsps9fpt13nk1gvr5dqpjn8ruhxx0svz6xsnyyk93mmdt3ij27ysd2phi32sc10vyco5pdr3e2h337oftd78u7fgpiaquqvpzqohj3z3wo42yjon28e4qa8ruh620gm7mc',
                username: '71c6ynedo7wvq9vge8sus6xa0tpnz99xkkt9zsuibrfxpecc5fbwqye6eer6',
                remoteHost: 'ymyr706969f5s21b5zxolzg4yoa2p44m7gl6sew9eqas7mxvove8k1ultmg9feidwhnhu2nzpzqkdtbg8jxxjwe0h5ykfhwwe59fdqt166ls79wpl8t7o8nfre4ywyh8xaoz17851zfn7elqkheelkk08kf5jl9p',
                remotePort: 2394286199,
                directory: '0kjlgi38uxsbvym375k1r22839wflm8lw9phacznu5gusdga3p3ilh9x79yufjde56fwig39xzuav7f0oci3vvpvpo5wkq812h92d70852stfp3pf5h21zz01hmcmn8hjpnmoo4qsbfw3hvbzurjk0wai8kq0flj2btsyy7th9sesf9c1dsnp3rbnpoy40uujkntxu7ckjp4t2n7i06miekoize0olspwa2jjtmv7dqo56xqvhvqqam36zyyqcxciw0hi6kneoqkrjtjlx287hga9ajk0msbox4ztiah6x2k50hyq52pluex5tg0ar0d41jwz7fef7ik2gjcjwau0o2q75qqe66k3ysfblefs8mqy8168nl4nvtobvyfg919kpqgfi5prlglgzpbqym2e84gempbsqna7mz76xtly7aaupn6stqvsbrfprxqa2omowpdbzbarqij7rec8mnuh2ppmelluiwuzmw1gdrsqkv7ofoi5kqwb66a1ubalkdbk71gr66pg5cz3f213pa19k2m0zbpyd2xwikq9cmkvghb8ic4debdfg54frvdkcid9wpfugl5lzhm5lebqnah5b1trtvapq2yu4nat0y1kk6i3qztuff7o4f6r8zk476jz581tlvja9hmpr0mxdxfojr233n6j597lcvl94jlkh011pa9wogv6zy5ni0bfip0h24ws985q7251j8stuose0cqenw6obb5xng8hilzjl2u21o4dvobb0y1j1r0epnfhgolv7ouohjuaav6sdvgi6uoeh4stjg4c8leetie2z90b74awkc9wibyglajtse416j56yi9leq94t7n374oth8ybxu8y9fl0s1miy5gbl5doq4h73x5hzk6dnnmzrywk6lqh2kgnrgbsi04vafudmvghg82fc6y6p9r885f8exspypjivo2woxujvvt2xa3qqanwvpcuqqxzu9pjf0k9xv8uzdk6scua8asibig55hrdyqyk5wkfzp2sm350or7',
                fileSchema: '4osdwsnis2kaa7aqhvkn7ptqobhg8c120p3ivfxoope54ugmvbl7z7t161cwekrgjgt0ln3lj701n0uo9ebmu8fle2ypdvlepvr3od7xo1go779m7ttrlxitzmbfq0tzp8225sm24cksqgz8senhis6dgvmqybtovg58gamb7zlm8r1mypjrhwu1ie04dcuy131v9atkvtcvh21yhuzf49ng6h9an58cubq3ol8t57jz4emb9la599vcwi7ggzhu5ve3rpzeum6ykuflwruj1l1zjogjnlt0ft4e5ox2um8g8ypjaz71sz4sluwrj40bqc47rgcvjza8yanliv2oj9cuffr4nuq6m0fhqm7i6m27phm5cpfd3n1uedl8ekmxicoav1zqjp3930gr3mlgwxzdjpyoc4gvntmrz0gycwij7mddxjus3mx4u2g9mozpzykljbqhm0go5jq8c4xftfsywa5r134pxzzd7rv6t9xnft1zdj39c8yemm7c7gstk02swbppohs1gfju9s60lk2n7blu71zz84hrx255d4oa0fd2qm8vkpj10x9alpw6n7oq5bthwv2xron3rlgh1g86lt5yvif0h1fq7cuz9wlq3e90rdbap623dnz9o04w9uiwhsve13xzm36qfowsvvcau1ea8kvovecukzmxtblu3cscpfma2mumw242p7ot9sevrt3jj1hpknibkc4bkv8s53qli25b7f0efzqgk2jemkhagg6n98d7qo57mzv2cmqx8b80wf2vzag7343fj181n0gr4pvvps444p5mdsqxtj7ntucgmj32mo04cenxn2b0zj4pfsbs674me6m6ggrfktuym6pr9j70i4cvd75bvf0i8p5popap4yagw2njx0kb9poods39qj3atb7k45vwczhltktwbxaaez0th396sh5ljh1n2975pmladj83v3s02m79nh8kwvbtkk3vil4ji6lyakw4jpj3zr9qm5do2tyiiq359vkqpbairywx',
                proxyHost: '5o9t5koxzasykux1bx3k71vp1sh2m8cwhb85q1gc9ocecuw91w768rrh3d0v',
                proxyPort: 1240489375,
                destination: 'md1d5ylgeptw1pvhd6qb3cphszxf4ciez9fazy4xdvkbvo7l54uwk6a063xfz5d1t214g9zyuacyoo64avth7p8igmxjtae07h8mbyzlt22d14n35ojqgizf707uka82vmyqw3xr4i8qa8z2ps78palur3vyb45b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'poac9g623myemswv342vytthpzbru21z3gmlcurxnwfdc22mll2ujxavy8z98h3bic5uso8l5n8mgb275z2ft4wkk8kz1jdsmroossbtpglc3adria9sp44o4zw9u2yv5h4v47454amwbg46z2u9r442j7uxi1uy',
                responsibleUserAccountName: 'pzmqbcz0iob9cpegytnl',
                lastChangeUserAccount: '0568hit8yf9oaw5b1jly',
                lastChangedAt: '2020-11-06 09:29:17',
                riInterfaceName: 'j1aveinw9h8d553twifb5da040ym00obctn4g2mmh71ymaxdroyanmnoi1wjvy846pqwrhqt1x5gacv78967pkr5ukymbnk217dv9y3joyytxm2ysjn6vnyx2jyinus8dcmgthucpyp6lvt7o02gm7wa5c302tq6',
                riInterfaceNamespace: 'kjqv2cszgdv2x1040uetsitt5t6gq549cihbs2u3nqd8t12y20186te3bh5w27j84v0p0jshsaqbic3lcswftwwnh87ao7neje9wfi6tnvq1yruvdhr833l59rp2x88rn2lpsk7jyz3nm3ce891tpryedj1awlz2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'czwa64wyxnmeu8djkid1innub9ulijyqhltjqxok',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'n78i8iyo7zrlt4d9v7mjzq750p0p4qzh0zp9ps3somcpsx61ys',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '5xafco9h4j54z85odp5e',
                party: '5lohxo0ggpa5spqnrpz8kufaied9e3iwy6lupdpkjwqtktehnphhngzqovrw7zxyid185y0vhopzm4poxlvc6gtgd58292t3aux4nvxyronp949ny6evj2ag6ksyyrg0wf1crytojejs2e5pl0l7oyibr95h3i4w',
                
                name: 'tme0nhmodgndwgtzx2l7uv3bs4zljrfh5wujzuvp5kzz1om0gltgm1c662oqisycon8mhnf4sjsnd66fi7n5z72jw9uhrl14i2z8whc64uy9d3zmoh1t9u2oatln2cbi9msgva17lhfuqs2n2y4ljbgijuyv58kj',
                flowHash: '2vtpd7azo7uyq1du3derm40rn825yywkfsx0pqpv',
                flowParty: 'xwkl1dxxmfl35zb9vdt8yq2drsdbsch6cjwf3ibp472qqs4vg4ezoge3dvuir3kvo82hafrq52ihbke5qum1v1y2ha35f3e3oeg4ss51fmljicix6ibvzolyvalwg7tsix4yt8kxtvaxw7ra42vvtrs5nzkz3c4o',
                flowReceiverParty: 'f9r4oau5b8fz0zk0oh6wpkrh1632qayivjocpiq994c7bd7t20au6nx6atn1lrc2hhwsoqnuher2ipd8iew3ws0b0mzy2ebwjg883c6lk0ce984dzsrl79w15hlro0ctozn5vb93lki23e7ifwjn3xw7ldskg45d',
                flowComponent: 'dbydljuv32e3zdmyuxnwvezzwm9ln8c7936i7sinbk2ihh74soyexz18v85yb9gb9zig986wngkcgchkq3vq80yscqbjup3ewuiv0uovoymdp0pyeyzk0eq575bti2ffdq8fdgzbw3q70ftv5gmgzkqqg5gh65ol',
                flowReceiverComponent: 'veapevqkvzymsvd1aplo1wc0jid3wm11twr8l1he9hw5qkctwrcr8oopqxctcwvkv5axt7h6pm3mid6oi3e70h4m5vo2hbsuth261g81e05cg6m6yzc848l52uabi7o6j96ffyakmhle4gtwfg3ehpc98honyrna',
                flowInterfaceName: 'olm51mfjcqk4rjohte2rvr5a67vm9k8gfhtyjf5r9dqi5wp22wqfg73kvabktq2nq4s77z6206c90525n445xwae7f7cbgnt24wonbxzw7ptm89rl8dmuc2eiazgajfgj1x4294efwg41rhfnethbam4xikhxyck',
                flowInterfaceNamespace: 'kzgn05inayd0n4a75eje5q9fftc84k4z9zkxjakvo8kosjwf256b08h2d5lja6jjjqs4mzry0h08jd9lztz6kac856ezjo0ehue70o0gjo6v6x16mlc231qyknlg1votht2ilq47jarpektn2wnqdfcrbc802dkp',
                version: 'htz3vo8ib0tofg9ma98t',
                adapterType: 'kvggpzbikspqjczagn9zekw9c3wgo4kgcu8z2wkxbmi913t60dcimzst4mv0',
                direction: 'SENDER',
                transportProtocol: '3op9n54rp1y9i9phy8tnsaxi2lg0w59jeo3wm4kjy8m80707qjecbr6uwrfl',
                messageProtocol: 'moyfyfmchxohdkfs8ddy9hf7aanxyu12daw0hox8gz9lqhow5cekivhgni3p',
                adapterEngineName: 'bwceyjtkhupkis7u4pbbiemw7dw0jx6z5cdgrrn2rbr6dkkbreiy45oz11cn2wy7s6o9uxuekh5begsyc6ve4f8d1wc0vr9eejskalp8yyxow73a05kcsuk6nsgr9x1v6zj2xnqmgl33ecf62qpirw4wxdi094ro',
                url: 'o4x9nculdtd8q1smdrrh8yaz5nyqnlms6p13qilt66ouq6vm6bsokd7lv57sm7tx27kn2bnw5i1n114sf53btsecrwo5mmsaf7zrsi9jwia0qb7eka96fw134gfutlr705nnauehg5t9s35dr1w0hr7hqz7krlkr2weakp08dycgak23u400p6w7oslokwxwpmuqyoonyckabqrc03c9ofn189r7yrymkx27qokbp0jg7qpgpuatdff0kbvyq67zjil1gvjt1l2c9tmneygyk6ekrp5x150y356h0v98h3qte5t7opcqttdmtzj2gorp',
                username: 'm88v14tdjmunfo8i8jdjrln84kv39cdsuz5ors3o7yq6q0jtjzxlflww8y9w',
                remoteHost: 'napus2omijkuzc8paa3igjqz05mkc44d9b0e3pser4vbz2bpow5s4eakbfpwp5phw0eu7ocujk35uehp4xdsxijkvg44qaa7yyyes0dgp03arkjxwv670miofsek74ztitp5yj7py6l691guyky37yyf7y0jkbig',
                remotePort: 1188040679,
                directory: 'clwacl3sauhionoo6wvc9bemf1m85n94u28i4gk96jzgf2kbs81a4br4iv9j6f24o8xdh27iog8lmm4j979ogmtxn8aaooqkdxt4tzfd7prsehvwrnfojsafnq7098hxyf5hpnxgjxavjd9p76e4fwlg5u2f2cxe72wkbn83kq9p76um9h95rmibifz3z0ya31ogsta4w5wagbyuf69sdir5lyjl10n8orfl7na3vlgjcotvtrc4x488b0wu0khdfuu7x7c8gy2bbu6xnuyvpjubh70sur6xudtc2kzk74gy8uc1p3kcojua6ie5mamnvvg27s5fuuacbjg1qylaw16ua1s2so1b2t5egg70tjdq4w2dgx7q77nv76243ly1tq0maqwhqn56vaviorlvjdcunbkqorpngujpz1mb8pp5a27yr3zvpjkc8yr8hi50d3t70z0wqr0ukproqcnied5tgktjzaa4yi37z0w3equhzjom0dkpci0etef6dwcenbjfhr83678mq07klpqb77n6aysoxv2mp9yay1do6o0rck9vcn5yv2knge26z8xlhqmt4cyfl320pw1t3y6q8gfh9n6l3c0vok8d6gjv7gey5jyso2nzyufqvz99z2il8bbxxa57qwrzf63kql0x2rgrkif0ntrpchfepffv1u6d1oedjk52rf4avlu3avwzu36vn8mm3ejyuqbts8lbq8ge4opsrxh2crsv0txopxe50hjshkp8w8yz0vq9j7eisydw79f96xblj4ohf1csfruw5zce2jp3apfmh0y7epsju78g9spf6sl2h5ur9lhk3ntawrxg9s70eh8jmovd58qrlssnmaftneb3br4o71pyhxsuo5j30ftehaao8ssku1rhtu47s3429pu0rgdnl7mse47x8xsybz5936omie1p9ba6tq86c8d2zxg0ig1lmjzl5mhvw8xfo813tny5q7us5l5rzgwhkmfbbouxe9lwxhkin71smjvzrrln02ov',
                fileSchema: '4kzk356ujnn4ad2hfd764zak0wsaq28rnt6jztrhapgjm5p3j8pfekpg7fpi6pd9zvpwticj9hqlqwmcpvr5gkcg0o335uj8a5pv7j6acbpkljm7swvq6eq6moiog4bb5mlsfu4jw496lo27iz58n4wxbx5zm7zp5z43bhyyl5rti8xdr56czetvlbnu5mmk8itvfsnx2vul63qaacsfl40pr8ppkgvmr2dc93isjlkh2mq4uhglbmb4gpdlauuc94bq0vtaxvosqchkadc5ifpf09bslayg4r2ih8kxhrudm1dfscz4n3se30wxkucqlzl1txdbc8gq4sadjcqjiicywiz53rwh6qqt2xuev7qais5cm5pnw0rs6n7yqn7tgqgxsgjbo905fpc41ki4i9ukjh227n3s7ue2hltnr6xtk59t0h6sgm7mrrvl8020g5nzb0cosyjb5m8p7qf3lh17hudgkpijpwabn8zkv0jickxtpoigln3gkh5fboa4m6wg8sicv2ks7aqjj7f87mv643wyl3q9h66xj5hhmc0h3stvo2bj5rhajnrn910v5488sr1cfm40wtu0a4ubo8qdj1igwlxz66jyyhegg91f57v9v46vdrobm98uousb32qph0tmghnav119yi4x9ohnyse4f9l4c1yrrizbbo0zao88iitcsvz5h4ghuteozunecu3pokww6m0au3gyyvmmet7nd1qafjslznto758aafci0uceqx720rh3ycw68kumg29mdfo3r09rc5g59gj3we0xuopx17k7s7zg35b6q1utoo2oi0hre5usbdb7a4tivh83vo068893feaybjb568p9vxnbxuotig57lxpeiym6x2urg6yzx3m3ih6wva5g1mp521gu19lxb8vdu4yac6rq7n07kkhyoflsbauvdcmcuyeyzw8gbujs96rcfw0gzfhxumr1jm9pzifdxwqazksi36ufdqx7i3wv6h6kd5hng1xt54kb8dcd9k9w',
                proxyHost: 'hy6riu6ocskans70r2kg5vq6tya8o83kanv42sujf2ex3b72i69bdsf283o0',
                proxyPort: 4500038108,
                destination: 'obkrmo1phdk9vgd1cxh6wznz0frq6xuflsu1wmxoxnb3enlpjd0n0pk3dtsm6ojv5a41a8aodns9a8wbr21ydqqdlzf882u0htqtom4rf2gzji7n3urfkrab8ocaestcraxzvfodjzgcvt0r7kes2ozrwu69s22b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c6tk9ebe8lj7ple6x69tu9wt0s8nnrjt8l4f367kptg5uoucvsou0pg46lti1k6e6bbwkoei32edrojhrntfqz8obb0dqhzd1x3qaw6culvp3k9f7jm1cxaq8oezpwlzdw4ldyp19mu2n1df7genso4om17uftgw',
                responsibleUserAccountName: 'bu8irf9v9rjugsviiqbg',
                lastChangeUserAccount: '2w0a2roagafxqvvt5795',
                lastChangedAt: '2020-11-06 05:03:10',
                riInterfaceName: 'qjrywnc88pj43r4v7j0xvtozfoj625xzsy9c866cs0wst9fnw3761xcfoz6ivgc7k2d9fkzwbht5vxjh1b2qo823rr21r4633kw1hf4ozvfv3v2fu3i9sih48aztgbkrkea3c6ac35k1q8xxeynyzdxfhu5dq9pz',
                riInterfaceNamespace: 'ypcjuuga1auaphhhfaegjbukqdf1p0t1rm96jkh17t6lpnbln94ar19pr2rl0kjqw6elis5f5i455i53upa8910nw28f1gapjqxfr9a5d4jwkseih004geohrfyzwrbvnugor3xvctow38w5uz2zjponqdczb67m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'zlzsovdve28wzlt5a3gq9t3tfhwh35nuild4rt8d',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'mwshpxuu9fpgtt4djp70am6dwinoic8fdjt6rg2s0iv7ll2ik1',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'zqj7apjdji69aexx16gm',
                party: 'rpf1y6t3jt98ko5w8z0reakbf6gt4drllqadqb6qzdinfk2jak50oiyb4o4y2c1c07lthdm4k188u8udoiofi28cuaf8rumt5w0i1188fheyva7ppixvfed302q39kty9gut50x0tqsg5u0onb6jau1u6luc8g5m',
                component: 'prx44a7vf7pxkyzybk9hurgoiq1hrgmnc9tw49am5glk5z21ydvs2a7duhe8ae8pppwtp8tt3480xzs5bg3vwklm1dg67b4n82afudtwgvxxkmcz0necivwjekuumfni59xlpek1n7yh9huth4qckmtfzbg493zu',
                name: null,
                flowHash: 'xqkdeedsw0cvbh9unaggkcbp3pl7klfi5z7q1rwr',
                flowParty: '8lyg2g4nxlovpiaynaon07uszmizr4tyg8iu7jr1qlmefbnvwjbvy0rut3vyrk8jc0w8fid05zjnrci3ebd5fgubvxw78ja34tzlb0x97gi2xvf1ynw0mtj2d7q2suc50wv92bds5stflsf8v7hw7ft4a99s9izc',
                flowReceiverParty: 'b9uibwmjgi5zx4v5ly5jq8uh3g8zdfbys04o72w63k4x298163zkj62jmb92gqwimkhakzla2lbjyb7h2nglnwslnyj4pfujdk3h4akcbsww2uo3vb9z8qsnzel02dnk17k5u42vmh2c4vpj25a106ihpevoit33',
                flowComponent: '16ac5spv4j1kzq5xbdwu9noxcnegjb6z7o4c5bm7594nk84vtx9g0gme5p5jplh5zg2ai94l0nsq42p8o6nstiu73cr22w11hztfbuw75eov0ofwsc13zvz3q2yzgto1bqi9w00r0n5na3in8k9vdcvd1qkyg5h2',
                flowReceiverComponent: 'spx42kesl08zpq0vnfjo22c2rf42h8uhknd7xeb2zp603c38pnqpmw8y23sfl1ui7bnvyeuynlp9xttgi0hf9mi9zl772swstj20icmw1p25wzj3j6sb6retr8l6yb0k31yjstl1sl7bpbxj7vjbgtvn10pn4bxc',
                flowInterfaceName: '9u5xenx8uexica4z7c0xjmrcj3n5tpdqjupilf3phxyf5a1iu0yo4kpbp2epr7rjjv0mjt8bgp3f71lqu7g6r9zr5a3hof7xd27dconj70q6qsormjcp0694hhuf6fyf13ufoezdj4p07zyzua9mszrx1oxaamj5',
                flowInterfaceNamespace: 'pi692wa5jh1ypcb42g1gb3nk4ct6to3lb1s0w0dkjstpapceu3ontjz1cyjbqui3kha0amfqkln0tatq3wsqy5qkjtqodt9v6vtvdofccq3jbrkekufkyu4aunipu399yngqq3idi2le17omeofxbm8ujbfq0960',
                version: 'c0v53uik55k529u7u0qc',
                adapterType: '9ecdlr6z4ghh292q60mk8mu5cc7jte22c3scv2ndsyxsl024jmwt1dj8fhi2',
                direction: 'SENDER',
                transportProtocol: 'ud2ijtc2s3gtxw1elwla9jmxwzwv2r4sfd7f9ygcxfnds04ypwyjbg79onbo',
                messageProtocol: 'l1wa6ctmffslcequzripaqwy5gbp8gnlrke8vlaf8xoe3jlnk9b5xksrq6j1',
                adapterEngineName: 'ng3or06p3nu8nhz9hxb33fimj59tbz2cfmr2av9lhq19krbibkzfby33gluxka6ph7hyrdpzrsfk15z8kfe06gqkzghw4rhrkzce1lwqw93zxe6sv517gwblpeav8k5qv1zgz4y7nzvtyqyfk76qzd6cu6gjhxtb',
                url: 'pz1bo5c1mp5qbnnwskt9m5oq4ytj1pk8hnpf0q44iixkx66be0tnfec4j5mjy2lcwnqpa0p86etdwl9eeoyh4rqwevxwyu10p0crmqrgbfrcwxlv2tcejox7htlxvdfeorfsfvk31trp9kxjjwelsenn1s25oompxkkdjhip4g21dr2iznsrjpyh6yuttezi0ldo52zyc8qhgpv6ms9jt1gh0be8fbbf4uamqr906x2nnmzwf6cnelnt5eaw841umtq5t0kjmt5tvjgzbnsrq4qh3tioh1tryuautxoceidg8l42r2zojqlje92yrvem',
                username: 'ssrsnlvku05ihg5d9zmpc1ku8co63w5wsmb0b2dw3mx4ji9j0cjak7sznx1j',
                remoteHost: 'b6407kk8lqsiwdaf4ipieqcm8gg6sjdms7hv8zqvkqd45ya6o4m38aons65e4ifx1x5r6ugtjgbs4n1asaxeim4a1nqtjbnawxwsks8phtipph8wf78ltne58qs4vmfw8a98t2iu1w0hh1v1wgq4h8e4itc1ed4s',
                remotePort: 4563579964,
                directory: 'oyo0j16zxqlgxkuberj3al75ue3rxs9bemh4ba6nlfgp9w3senblute491emnro68qcpbfdafq8o65cmqbwqs73g0eytjq6i6ufqf4q2xxxaod6audw1muc4vk9wbs51mim89w6abiqf06mahshu6a9hgu9wsreurqrl6olx4k7fadx5iw3hhjvmt3d4jow0m5u3omz9nbq06vwbx6pj5wa57o560470dds7n39ntla6yvrn4xqio8akyahm0psot57mx5rgfde3hvrix9l5kmt4o0s5t46tmzodyvku3hg5ps08ny3jlrro3079mnfpuwl0oekozm0eqfxmedmh93t9vvo3wolnp5km0idw2nxbugmm643gfivcedv5y7wxgo1mj0duvu4lwkceugq1ovv4ickzfyshnv4ixfjjbrfel6lzzw6319oc2re0gkkfaknswpgvssf69npwon72ih33vfkzemjewssf570lzsyczsjqdwf5eowrd1pmf45571v6attmaekhtrq0er8r48w9antasi2jeemeqnqyi77uiepi3atkpgoo1rx2jq89p5x9qhmt4jka3kelwds6erwvv1sq3tz2mwc4kc5kamtmhg9h3t3haqmpmwsdn5147rqt0inns7zb2emwpkvnmijewe7vdqus98b7ld66vwyy3ij4e4rvn6vd4hmtkbmu6erhilufoxpysmykc579e5g46ztiwayy05zicvbooyayq46u409l9b09gyfh6pgs8de4szlljgeo34m6gkwegpa47pghvltqeu94pegsgdnouzg01xxbuyyl81ol5owblu29fhfbsvmphnykuqtp42ttnpqlpyct42r7lz2nh89wgnawv82j2djcpvx50adxs1z5s626b2286kxe1pneh5dx07iumb8sl3uri5iqegq9s18rb7y5q0huu9v4tyq52ktyvlcgkhgtd7d4v9l1snjarn2uxyce2ufkn3s7yke3ofxzzccjab46h8inj1a4',
                fileSchema: '2m4n9so58ez75hbknddvqdbk8rcxjzhvbv0kjvx1ehg0vkuojn9fn5t112picf5q8t790pxt4jv4s7a67phubzabrp2nnosf91hh6ate2xaci51ekaly4kqa3iktbjjucnaw1ft5chbyab1quuwd1bz21irb9wtpud1fbz5ue7n8ms1pdqe4437z59i7sk4tm1lxm3h50h1dn13gerwl189xxvmf7fy2rzw9l0fbpw6qx9amx51k4tcanmyhwlf199wszsdfgb2sx5j0y34cjvcacyhk7ujn4likmklxtlmd8752b0mxwysysb7ehjsw4c0jb1w3a466iccq4aozkvnnb82bqz0vody2nyihvdmauj94qnr66au6p71qdzrbzfqyiujizenjt9dm3pl8q3479dxie39zcqi2e4x9m2r75ng6cvnqj3135yhnvkpm98pmkoxp766qn60ioud3yjq3phexladfhkwf6dkoy1uc6m1ro30rqdx9xsi71oogn8gh2jh9xf4x9u5xwjkd628n0qkmqqspphn6bqxdlnwiyjhcsop9yfe7t3xf1codoh0325kt5kgl7fegjyaafg7b2bp9zx82yon9mic27jhk6dtw0lisyjuofy134vdo0v0rgwemld9fehttnfuhrubq888hxo6t4pvpoj56fwvqyykn9aiyzlnlshmo01dxe8f8oj6ha3k69wmvjy4u0lv1ukpr5lwrgr6exjrm2ekhfryel0a5vdw0lnlu0ec0gd345fngnwm3u67lphr94vdor0jgi7y79wv4rg9zjtewog9fqypq5lgy18eb77zxp2f9se0e50366dk31s548t0h0cdxquou7c34v434xag6v6s8dwfccije1fwbog0ksagxow1cvzoj9p4w0msmm2ctt8klo5gfx3w3kvag6qj0pp3bulkymbrhy3nu2njimfskhr9vac3qpw5a9v6iqmmscou7qmemwm3tydczgcboiy0q1broyk4t6ledpwqt',
                proxyHost: 'zh1uojl09e5lefllxa199e8fnobe898win5a883ygdc18py24oez9lj8bpzs',
                proxyPort: 4633437638,
                destination: 'u076m7hx4ogqj3ni7qburo0oidy63pao951ccop9reyny0jyysn14fuonh95f2ftqx3wd3l2up3dkavtj9h78m17ctpwwi7jo95hgcvunt1b272jiu5c02w7fgux3qu1wfm79czmrk8rt74zrbzr7z2cvnajs6zo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0bdabuvljyfjso982m2yne322dlnagpwrvkpeo2twqf7lufxtijv62qc6ysupt4icw03d0p0jzobvwcbu20bh0hb434l5f6sbnrhm3n980fbbgrs0tyrrf9h66qlrcenvmcy5mybmsdm3przhybqqo3zr0a4ux2d',
                responsibleUserAccountName: 'h9hwk20dedko69qb3iks',
                lastChangeUserAccount: 'cwaoh5qd2k7dau4fx3vn',
                lastChangedAt: '2020-11-06 11:59:24',
                riInterfaceName: 'qed77ld0xrp66vaawxgv7g0ownwwbc0yqj5ehfb7gm29fgxidveqi64gtk6jgm1g4a2t6i93e5vqdgpoz9pj45zhcnw2hiuw2sbvpbcmss197undk0yrt4m1mkxarsfts2z9199kjldm33zf70fz9l4nwuovcz70',
                riInterfaceNamespace: 'fwf5tyr0nsv5hbz0ukuavkbrx8x0kjzn8nboicz41xbrq0scs8kfr4jf9eqa58014skxpj9wh47au1lzcli6n40ad9tw633eet535lje1itluxnhirjzgmawp3d8853ahynqiwk6c5jgd1llnfrcg52u5xvu5bu8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'slc1ta1iv5hhut67ahbnm1tat60e2hjli7ttyzew',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'kz95xzqe8gdmk9az76uyl6m8l2jnf4jpo6r1nudgj5kgm61d5i',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'it05cweczjpkmdmsodxa',
                party: 'cbxknzqen8toccshjlyxrv8bj4ze3kjrupg22wnr1aqv3f4zgju2s32wl5dnlshzqzarcmgvvejgee01gsjmx97mufmlqnhar0ptjxb3ioen48rqfiwf986p0lgfht67v3mj9d7fxzpnubo2z71k2hgkifzo558c',
                component: 'eo102ybqvsjbd1tjmtsghx5r5g1r9ah8muzioxahansurzzkp0afj7oc8po8gga97wl4hdesbweqrrwc97f65zfba4ig8wd4ss6eufvlzvkkvgnbublcf161mo4yv2p5lqjd6o55l4oqn1xiiw5dtualf4sfge9i',
                
                flowHash: 'nbfotpfdyj96je87q8p7qm009z1x2mhkvm4elr3a',
                flowParty: '3daklibpbvpjr5wt7x49yiwzp6k7uk7axbggtanfl3w2dqvxq5s8r45qwsp4htaqxghf19whafq9wzncgr8crpqkxa3v0kk5ecbq6yh260z6oxga9qmvue4g3ro0sf7ys8gz43f2dr3kjcplp53n8ly6i5l3pqnt',
                flowReceiverParty: 'ai09setqbr1um3shq5bwp9v124ndddcbo3u05ki6gd1yf0hvwe301cqtmhnfomwtj44h02nhc3m1gs1vctkrte7natp3qxpt3yhk9ogmfa4b3wxvrlnfzvx90dmgm4j330vu29q6ke5k1kq985x1bwkpu5jtj5vj',
                flowComponent: '5a78y6pi9se66t6g9q5bviwb2r36sczgnee7fprlwq8ny9u8mpyqt09uu745kczrfhba00wg4yplg8306uycw8buuwf1oe7q3k5ywf05iyaryvt6fa860ky1wtlju4pqudm2yini8uyqsfwgj89dxwn1ehjl38u9',
                flowReceiverComponent: 'xxe1so4etjzikuri2kal3ywube129oyljpo8gsn03hbdd5919bi7vjke6v70ta519uxr6sokkgi44efruhjzcltl6t2sz36nik4eeacpzr9cvljdofli57da5zlwud66kej4l9531x8zd0l4ohe683jrv5gte8nh',
                flowInterfaceName: 'hf5u14ho4smhqre6fzict011myf4nfuscvahh7i1yh6bgkhwk0f5i43s0j2ded3c9rgrwknml5nm7h7tnef91lmtevbufg8hg3tsv13ca03g4u9bwznv91vw1p9uy1kq5p3yw06oocxwukn5cdg8vyjatg37xou4',
                flowInterfaceNamespace: 'diso72zm3ov6pzdu88u8oxfrllmt3xxds1zlprfe5s03s690x6c5u1q83i0gqrs2gkq1ar1my1j3wiu9pqo1b4u4f6d0y8ao61q9ty8rthhnevnn8huhboeeqyalfw9sihyk5pnchknsj82tvihpv9txomb3rivg',
                version: '7154c7s9jowqvs1ad27d',
                adapterType: '4m9sijv7tvqz9426a0xtmj9z3ilytl54xq01p88yw6sx68hhenp0xhy04qal',
                direction: 'SENDER',
                transportProtocol: 'pp2u6ofnl20jfbt77281ur39g9hsew7vjaq9zcbhu9k0mq9obc2716jrwcxi',
                messageProtocol: 'dudcgwica0g7j8ic8vbi30tjbec9cv5zrlxcd9nh0lk7wjo1eg3ld2enkt2s',
                adapterEngineName: 'qhvbqu5yi1y4u3vteiem9ydokdch2ie5317jc4wvxjpbqwtb01l09qriopbw07fjjooravih7xd6eg8qoiuaq5kvs5jlgj8vmcjont675papwj0xki1a27ly0pdm2bv8k0ug08tpj3ux3c4jn0zux5mejxlqckbr',
                url: 'gcvtxndz38sp2seq3x1o9m0znxys5wsnu4p3ud9bxlvxb5zbpu9v2f6m9gpcqyhn6o7zdhy8xxg729djiaj2f9hcoubir0aks30drbehvdf3xoquuiw2nasnr66lsezvq9o99o07psc0ol4djmnd6clhnp50pl2po6cgjce8ad8wz05gj9l0q32v1g1cg28w70lzhjcw71psvxgp3pyk8f6oy3iffq1fwjvnrewk5kbtvhnrtsk6r5eeqg5emwq109k8yhjqibqammjyfxxzflzuv6au18ja87mjq9hi4mx5qbyri51fodjm106c1533',
                username: '5o7mc29uyj099qttuptmy1ucn6nq3jetoejbe8mynte0vcmh1kmg5skh6hd4',
                remoteHost: '2hc6bejfh8dh07qqmkf7wx3nnih69idukok6e7eqobfrkrizjon628m1ef75m9irrw4gh0g3bghugcegopz3nir6gs8vlwtrxdtchuon7l6ktw5chbpfwx2r7yxdqmti3fm74dpdbq0jmw7xlrzc0hehci2dgo6s',
                remotePort: 5270970906,
                directory: '842bqnw8aat6o67nlspnzn9zwph0tivoxeo9tm3mos4x6c85fhco3303ay15fkruko3dmgs7foxzasbvlquasvw5o1j94zktm5idducsqsgaqfzauxt2jvx8gyd1uht295kbcqqrmzbksh36yhcmqn63z9p3cswc8nejh8hhhxryirwybgkqeo0l0p7fxtjy6qxrsfm0c4j5q7gyum227olehiyk7ojxqubxj2m6cguuba66wb8nqb4vp0sr5vxo0wqrwco9l9xze0a0qbbrjuzdjh8ovebhrlj8565s8exgqy9kiqr7yj898vm5qj5lbiv1vjvub48eqqe2fhl5mpsqg3w7eo7l6pvvp3sy00ubusa995xgvvsfeenjhys7yfj7abcr4giym1vnty5laceiznb15mcm3qb99b3g5ddyr2gmwdet29dcbmd0oru5m1xgbj6q41tfayvl7npju1w78jpubfwsgz9hpqpomtw96j3ignkpv19pht90q06jf3nwdddmkhr9n4u7sp766nsd6q0b8h8a6c2wa1h1zv3hgjk9vfmy666itxh0pur52pq00yjihyrnre2jpoknn46g7pummczbp1j625fky3c8q5uwe0cvaw54l8d09khnjlosf8vq76jse8sa3hdoamts7e8ijlp6pk4ezyi6ctef0qea43rqq2qzasi5imbzhsh9438swx3czh6v0086ylk76l0gayx3o0mlxr0g6oe2qkstnhyms4ixv6utmlzlvxext4pq2jfz613sur6d11y1asredfc5e18fjobwckipqkf5pvjkk7s50yawab598lcfvutq97ys7ed2p87ta9dmija34akisebhv1wvk89occx0tpti803og153m36de47ojtmkor813r0d7jkydw27zskmx0b6n2dmff2bgz2tuoenx2gx9o1tu4bx8mc7xu7bqxx1gl4hp7uuqtywp10y4v1wbq5kud2a7m221a37pcajyv9iomts42y92ht1',
                fileSchema: 'fcfqxohr6ezgimhjnpmxxfwfv8w4rpeo9gapopaiv1mtlxzw794okpbexthupolfhbxp5b9c44no4auw4iiokil37e956m1u2b3jnbuvj3qp5qv2avcsisr6xjfthjw5szrzrwpe7oxuj1jrmaxzamzjtjba4x9zzhby8u88d6dbtzm1e16q9mx66ui7fmapkmdxqobw3wlc61nf0kk8s2zhqnfmzj95ft2zyv2hy82rvrce6ij425qxg1hixbuyi5n5yqyb99exn6f445m3uhwrejbg5b7shxsqujuwyvtsj1ua4saxsgy5hlh9r2m1lf1tt4203sqeacy4ut2tptgifzvjm9gv1u6uv4d2jtgay7sxfhi18m7ms0fslvmz5urmg22n5i34k5cqpafog63iqq72xysw9gklwzv9lup07vdxqrugb5tgsh97yhdlc2stsxaue02a5c92l6a6y0kupqmqhulj36zv1490flgozol22v9z7k51k3emxi8x22qx8ok04gk3zwq1ovmstnw2gtguz12az2z95fb6a5odimgwlrjl1lz168afjs6kqssayupte7ru9jhusubk4d0o1kmw904az4i4i4j6sx2gxonltnqikfeephwqnlixb3lkpz0g86to74lmoygh0emppb2shsk9as09zblx2phf2o2kr6v9xhf6mjvu61l3zj5vdltdp41szq4tytb1mqtzhlisav19pboe8828kdkltfrvhvsd0ti54ji0i2hfszuu83f6j4lhbhbtcxp7qzryokaoc0vkifm6e3pfhz5gwylqfruxp9n04cg7vv7e6bum75durx6cldcv44b8p55ndufju22d9za8rue8w11m9a6bd2os7hc82zp5aus9w3x40ovizjys3tmz4k4tnf1q2btd19lesovizg45r839f039yszetj5m2c1e2i3zgbwqrpnrt243826wpqta126en9g1pbhsxdc91tviprzvl6uvd1pw1q51wplyhwka',
                proxyHost: '5a716xzboyjlhioc3il7j7ocr5b20mumxu8hxpqolqbbkypm4w9lg32zrufg',
                proxyPort: 1542659511,
                destination: 'p5ev0cbrki4ekhsxl8r19lm3yxcqbjec1a6qdwc5h47pb72lygphgbrqaazme8ep390axscd6en2ydp6esxot0rl7wn58ny91064wg7fap5jygyh258kjog1dszu6uocueykgoih46d4zuejkpvrxo3eu2961h2b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nkyxlxy3mr6i3kwpnawfevxkqypy0b9zip8nnjr5d7o4mfq6jelz0bjnk0mffwyo3740manlndarnbj8m938cg0x0p4gjlodp3cdwyaguo5i13z2sndtpwrswjhfpl0mnmiiqo3iizqbk9vtu3vqcqqpt1djti3b',
                responsibleUserAccountName: 'fh12lxr1x5mb4aenhiu9',
                lastChangeUserAccount: 'lua1qbsuzz6a9hvvgqmf',
                lastChangedAt: '2020-11-06 11:34:16',
                riInterfaceName: '155t67fuhvrgertrmm3na3ogyrs2199xk7ozuks524q7skcpf3ze2vigh88kekyau0feh85hllii1l1pc6cwrt36qlvfllyf8q9tc5l1k2vrlp73gp5vqxy4aidgwq361rn74c9dzzwm9ln646uz3dhle4la294p',
                riInterfaceNamespace: 'f5mj11t0tjge8rp12mvbe0mqp6u3p80srbnvrdi811lf73exerm54g8qih5c8nixcbih0avlzil5xqwqiw7esz18t7ci8xrhtlgnup8kb68n5ml5k01im21l1qiw6g7sf0a64n5gr205j4wm3tr7ttogebw9xlkf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '6dljdedcm2253chkv9il3o9u9wsgugy992g0v',
                hash: 'v2ylldv9ilks2e5hqbugiehnalelbngrx43qxiv4',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'i851hngzud2jju4717uopio44so9284kggxcl2yevtgw9yt25a',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'rao3fpxmev65shr3n31x',
                party: 'odtrwt7fvhafdurtf6t3w38uc6id8iqh6p7be0dvqthaeshl19z56v5caz0hyfkuh7b7w1nf69w7efk5xf0hwl5iyoxvprbyeozc3gsozbqjgd9sbj1te0xcg2kk89copsws8obf66eav8rozhgy3r6uwls0u58g',
                component: 'yx556c4ud6ebgfv776vscbn5wxefq3hbwpjpeb28q0tceoat1rdm4ifbkphjr626jrqtsqlryrezep23a4syi7fr2gatynr96ur1q8n13h6k05gvw1o7ce7haiac8gtka85q2hkpggn0gulw6zn4p6912lnq2yf7',
                name: '8ii6ym5c9lu8071fnnt083fqfwt694gr1jr58zqxmy0anq3b6y9gvw701xqmm90gfu8hlcxh78g0hsmlvdrtmdwbpdsnskwyshlxxgg0x1f49svzvqk3tfd8bnsqnfvfwqccr2pchwy6hw1ibsacr93hm9ojngx9',
                flowHash: 'tu44wgkl6tl5t22a7knlupu2ltmc7fdkuvc81wkv',
                flowParty: 'ko8cpg26jzoyi9zh2idp3qbg9mcszq5mf4awqxb0ypknldyh6k3e85daog3nhrivx1inohwsx76ec4qukzy82ar1asf4s5jnfjib3895wstaflcoio6akfnx3kn7gbq0g762cec75bpwxt4g2e7yavyqbdsaamai',
                flowReceiverParty: 'aoq6rh9dt0vw9x3l7qtx7xjbd41ahhwlpqjkjxkh8sqjx6og87hegs6dfu6qxg2ut6npwn6x4vw0g7zikee3sah1g8iojl24gry96emb2qnwyzacs4phfnky5r62liyeucs80b3ichsodjol9ahjq4kyli9c1gz3',
                flowComponent: 'msm48r69ejfngbssiadtym8mmozqcrm4mdnzyk6cpu11ul0r8lfwvbjk4nzicm92765pni6ue2huv7ko4l7su16g9yve4wz0kdliob4xyggwc1cs92hsu8s8yptgq9nwytj8j5u1fzt0musdp3xqhtijn9cbnt5k',
                flowReceiverComponent: '0dgvf8rqmzjrhuo8s6kqxga5zd4jdheluuwppfb0itdlto12wvnzqwerfcstap5dfuj567re7lqosgaif4g23mxhuqr06umhgko2k4ixb6o8nyy3i96bnpu8px91q4ptguc4cuxc3a6qhcvemzn6h4o6i3lkjdja',
                flowInterfaceName: 'drnmtcxseewwfk9ycpwc1ycglw3bbdpg3bv1zra5iwp4xsttpd0jdcdqon8zw6rjluo5bhjriigq1z8qqlz0tn4olcgds3ugcxttenomgxduvhe03ayeq92x2hs3xqu9qksvotcvypwkouqkv8savi5sayud69kx',
                flowInterfaceNamespace: 'g1hhjz5e788lj13xhlsh01l1a5zmv38ubz2nxacnkbazanuqs09acn1f52q7xtu3vznwwnbsmq5hbru37d23btwqtgc16dd9ceq0wo1sflzcq1vn3i32vdv2p0br9oj5myitgawqhow7xbbw29sea869yxxlr9kp',
                version: 'n1lze1f54xwfbdwqkwdz',
                adapterType: 't9kl52qztpnov1zp19l5qodd8ttzbyiebyy2coek65hvzqcya8fq63skqg5w',
                direction: 'RECEIVER',
                transportProtocol: 'z1nkff12i8hmahlv1upzupbcx53jq3b519bxg59meo6y2cv6udso1y1hn8zy',
                messageProtocol: 'wno9ur5wvuqob2xqt5oxoksdy8x7jgzn479rr3d0ojmacp4oy277dpvzkqvo',
                adapterEngineName: '48cct1sjzwuehaw1808ewyicrdnh225q89al3uhipu9o9oom5geyzlc58v0r1e72wmq0rlztgturb2npwbpdrxa5d2m6j61jzk7i83jvh1tw70kqzo8ec9e11at0b6sz53dceow6adzh3r272d64dzi5nwdao6pb',
                url: 'jlr160w1usua3985xq0rylh9mwa9idew2iqndcxawntgnd3k7p0z6uj5fnbewjbohz9cncncne6wchvwcqv6al5t3ehr1fs2b8c4ej3jr3pu88p546jr5wmn7fewxc6d5psgsogdmktf5bgusnj1l9ou3tcugq72eonu2770jldiz0boj7o2xsjfx4g2w5p1mzln42r9p6zjvum3qgscfeex9xekohabr6407zq1rksc5nz6eb8nvhg9p5h8maxagxwssqoetwic1i02xl9tgcl22w0tguruwa2rp0tlw97815xr1muz14atr6zq79g2',
                username: 'bww4waevsry77r50uvsnp5vu42gbdcr5qpoyroye3czij4jx1o4qe4n65c6x',
                remoteHost: 'sr1pxe0xcfpr3wjc8q7qpl5ib1y75sn24a1cmpwfdnp060t9pfv7n1j8crjfozdu2qa8ronjuylvtch4txx7dwon0ar1kfygdbvgmbg2rq4a8p6hbr6hrurzjfw15dtx955qf8srxxyr1axsrm56h3u527ohad1s',
                remotePort: 3489693933,
                directory: 'q162ui3ihheajgiakydcnr4d408o8rtwfuch0rjuyu77jzpwzdipolp7ort1fyp6tlexpir1vhdb67bjwh7ow8xuzmbd5ym9ahf3kip3k728ykgxz9ra8vz5p13tllxz7lkfrb6dfdva3xraha2qpeedesqtlce6oc7erc1rzz0e47bxj55dhspjyrvhhnrjbatybihcxf4abu76qgv09nn7qc44lyujadk6yp1de94cigxtou2nn2q0gwofuwuee5ddpcj85g8nqt66lsgw7gbbr0h96rkl5rtz5fnkey8w9fxe5xhejr4itm0vn2pfcrlmdazynkxbiguwpuxv6ukgly2o4gycx0s8lnlaj17hlxy6re0ejhljhrklmm8op0nvzevrl23aip7ahy6wppy2b7ejhcjcse9oupkyap4ztjq16bhr9dnslpvwl0jr2r4zngwpad9obzvy2ssopi5i6uijar7luzsnl2zm51kgsziqm63g1c343sn2vz8zwqoqy8lpzer26jtwa20mk1e59d8c7e2d91fxkvf4voqbqwzv75eekxhyh72j2s2vg380ph5p42hjxndex5u72mfbgk71qiu1swwr4jil24dq37g4q6hdpt81v3qm8gq43qi47uuerhkixnw23y8ftn4vym9wbr2qkdg2szh01whc5socysjoz5w7k9szjq0vz26efbwvfe60fh083d52cz88qxxcjpve7ezecwk0jqzm778jy0y2vczbn70erdtj791w80va7pd0yka24tobztus3g02w6u2e3vvp0bqfcn47v7tsc3sve7hrd4mgzt62r2ljs3qm0b2c1fak12tiwrg705cjz1eid3q6uhm6d61yj218s5jq9p2ojx4qz8avws8rajdjvnndin6ts7rkjipv01beyxvs7antqjd8mc5nqok5auw40jjujwdexg28kpltiup52vva8a8e4h1eouwgdkr1b4pkin7s1u2c2i762qyldql1johaq5ik7c5',
                fileSchema: '5qv13eib4c692uf3rrpd3xgwfbnd3ab227rxju8q5qu5d701t70fdw8rsrsk4ur1pmeag308oae1fjugj4cwgver64ary2gajjl4vsbak4g6dvrtuk95oi2xvt1eutyxkiblljy69rxstcsjvdqu8jmo61nk5o03s8bt59tnub4b5vzve6tzqzvtsxeo08d0kqdqc1g763ja76q1k8i9vani72jeqa18kzhjg067r5qt9ttx76kkt0kke0d9ejirikld9k5x3s8up61xantng87vosjekpfrseeyxijjiud9og74z1y6fgfzepllaadw6h4qvzjgkyvxsjmu8semrq66l0nb3akrvlnd7pg7c0vldeu10d7rvynwnq1np1ol0f8g7oka3slkwmylngxlu7ckn0a2ei201o4afxvukp2jph8j7hddy4b29dfhjyyu4ndgdsww7525whcy1v364udh7mb1vac1owfhtaxwgsokwi7pdyj73wa1vqg6pxcuhunqai0sep2mnpe0f8imuwvu4od9rrup8wkssu2pxg743l0u0nmac5go99u9yfelzeccayyrqd9ko6x2x9ukstd19h0wda2y1hbac0vx5b2vn72zqesw5apchbx0vfojtaa5qq86c4dsdpav4naowy85u0z71wafmirgoqq3q0gvm68yl9docezsy7a6968avo9eek05fhcgwgqovaxdswrov9vizpeqwn5vn454jz1xr2bthhdzd6alzigtb3a2kforsua1634uzuac1byfyk1afjac4w3warn2j13nr90hjur2nywp01ptj50ykhuyd4wz7mzfp2wzoj08j90ivimvy27yfjvx1u4kdb3xbdcabpxnk8dtjwarra3r00ocps02ij61a9n8p1c1fbjnyoz6fyfzurcncvxwxetlhqs7jzl11avk172mk4rlq8tiaxze2y9f042oxgezxs2kpv88ppr165hzpmexey2nusoda1wkbqnzds3j05fm3xip',
                proxyHost: 'irleucbapcjlrxouz6a6y2mt37nzabs3pc7m1mwotmc74lelay5017ng965e',
                proxyPort: 1642022623,
                destination: 'kdmnuyzo0il80u757h6lkxezn9f7cnsav2yi0190zg0bd47rvq1e7vwyxyk4ae75ywlsl0e4mowh97jsi5q8fh6rdwgul54djvqe7vpg9hvh8ahmplh20nbt2nz7ok38jortx0ohge7veu64vttdzrxxqh3yn6i1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm0cywjgn8vahb2gy4kztsiwsywzhz40gpvra95blpdcywm1jcxrhaq29dm50jxl9a4x720ty7tottiyx0wxv9g44arkfv8n6sbzjnqnchm0399oqh7nzhsftml06nfgum1wyzwfw9pulkv0exkdn0i1pi46afl38',
                responsibleUserAccountName: 'a4mf78g7uvh53tz81mww',
                lastChangeUserAccount: 'v3gc74ssz99kitylvgd3',
                lastChangedAt: '2020-11-06 04:54:38',
                riInterfaceName: 'i0udgl6bvl5zolm61rtokgb4jiv18gjd7gc6ws2ygoa724vrqk3kkxqbc3zxzg2gtyaaawcaguxjlnzb8yqtmnvde4ghmlvvau4jhwxde4efberaqxmgts16k9s2cyq5nomtfmp5rhypiigbpre9n9b1js3zm94d',
                riInterfaceNamespace: 'zn81ky44bq8nnye00sh80ge4xcwwhlkek2eiu07kispnkm57ubadte3megy3sjhe3nvnvdkn7qem7s32bskj3hferxvvcco4gvca820ma21qeoimtwj5vv7umq5ubz4ug9yrkspncu3u67wnspzh3jsbxg6bz3ld',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '31ao7d1ofs0ow01dout2v2zpxmattta2fw1dkfv48',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'tqfifcn9p2o8t8fioy32kvdi7qj5qdijb1wqn1trvvxd7ud55e',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'ux04dqb5s7n2kmwl0dmo',
                party: '14bjc8eglbs9rqjedm8kgq18smdfqi1vne0k12qzv4hlcu6o3xwcmjmcr3jlxtjacdbvjj7z2ztsnzmqmmeeyhypjp9virdd6ma9c1dojmewxcu2x05hwcaikscndzgz1yx1o9t0p47jew00nibjec1lgzgbiarn',
                component: '2clyzgqrlhz28nmly9bsjcwzkt8mtpwzokf10z3fy9izq469li8wgdr2sfqtu3r37x9pufz80x95b7wpe6027li1xat4x5qgttgpmnighf354oi6d70mdcivq52a1fm2b6k6tvy0pnbkr0f7sx7qrj9wlou8uisn',
                name: 'idp53fizs00r3jiy9m75c191gx81z08gi66nzi6gq7xhjaez7atmii9bzzxqoi97aetg2sup6tf6mw84wkc75ngvtjfp7qx7x4pk17n7kj0vgm35yzo4i6qjg8wkjcy63c1g81s0913kmqga9cbiz0bvupm0z8vc',
                flowHash: 'g2hov4gb5431jxthznflj0zdftupuhjqzwfqlnmd',
                flowParty: '0499ztaea584m36h0gh1f46zwuypvn69i90xl52mbhdmtcybib5ifcdbchnrnld57okb1gnqb7thylp74camcmzp0fuwe3h84e179wb071o3z4a9f8342i9h7cywdeiiww8rejlibpyel9pv8u95c3wo7qmoyfwv',
                flowReceiverParty: 'xhag6j8ouai71u1tz85zssssvcitid3zfhrqi3sg4djlrvz6gq8wgdfc089l0asyjmff8ncty2mv11uzi9n8gywdt6j70qik4ynxn96giw2mmmbz2a57bjlcfw03i92l7jtyo5vziqh3yyaa4vknhjb1ec4mtzt6',
                flowComponent: '3n09odpalmkacc3zb0monyagnbvd24it4ddk69alo1jb0ogvakylejfyb08ov9pwfv6g2ryt5pi4nvbkmrae23wko28cmd3bfrmexi0khu4jxpvaww86cux94pn1r1587c95db6238qa759r2dt258mx4lm8lrfy',
                flowReceiverComponent: '6onyrijbaa4ug090z0qq1oyd2z5bwpqupmbwhi6p4sqk10v3mbuyl3elumrp250pa2of5ij8dmhf4k36f8uqkpw8cjkfkgdml8zzm29c84vmckjhlqbxou20cgcqpef05xplkiqciqicqr3oq6cwrv6wsl58kr6m',
                flowInterfaceName: 'narfgu9bfkurlqbo5ai7e3t8svjw8hte3knibd9lh9jwlpqbryuctbxnb737j1ow57otizhos5u4z839od3ppux0n2pu00a2v171fd9fxy2t0dpcumotyohbeuonpwc7axeswgyaomjrtdkex06f16gesqrqx87e',
                flowInterfaceNamespace: '4fby31cqatp7z278lgp30qwpc3n7ol1xb2jncky52hkj1yjdms4lee0dlmffd1qo6fdkcvhmjip9sre8vi6fg71vq60vr8d5ttk57w6ptp814m9nlihen8olioxi3cp2t1lbt2hctv6hxqxlk2udae1z4dok06it',
                version: '305qoxxyswhhpb3l9113',
                adapterType: 'nkr5ghibizkf2b8dl7fk8d9c0zedy2914p4ai1f3h9bgxb4reuv5b6r8ks5f',
                direction: 'RECEIVER',
                transportProtocol: 'tnko1qgttj6v1mrhvl9zlc0laim3rtyvwbmrwzkscuq3kenc0ehgqtd5yes8',
                messageProtocol: 'o5sjrt5gmv1ugujvdj6dwkozdfg096rpj65eg7k2klhcadfkid1o746ep87t',
                adapterEngineName: '2redoitqil2129qiq4c4fikhqy4ouzqz59wmnlp3cmtvsdwlawbyv40palykn4v2ngk9um3996sf3krlavn30vwbgkgp7estvrw6ziaocl6ytqwsi164zrgkz23k50lkjusnkj75ux40r045gw7x45d7j45kgw8w',
                url: 'mg9370n6upedb53bi1a8fzq5qhz47q3p00gijznrfc4n1sudgtjnmq1v6dj2ktmm3hanrq80dqfj69abmh1plszdrkg52t6vnpl40nza5xvuu4nby9fgjcpeybw8ucnii0u1xp940qcs705mvca2w47i7gyup0maj3uiwuvewsxa99tgh0k3li7vnx15bja6hu2pt5rdey6awnlezj04hrb34z8l63eg7ycrq8pb7203e364rp0e39u7nbp8rpcoiz6smug2kem3yceb57pazvc4ljpsfmgkprtdm7vii8be6i993mrcfj88r40hdxm9',
                username: 'dyvowwki70qjoxttytig1htyfbo3of0mfjoxt3c5vxm1fomwb24x9255x6s4',
                remoteHost: 'ade8h1xzxsxenkm9n9m8qmvmik785kqszkpsn6b2pvljrmr861l7yqd11mxhn5yr1n2uhelu5pxzmiwh8c7zg3o399gjl1khh5hxys909vj7gq7f6vsdpfekimxpse76m7xizumwi35g3pfn2c4otpbkyge43bzd',
                remotePort: 4449071728,
                directory: 'z504g4j2glrdypr7y2oycsfayppd2a5c9vtycmru02vj487vawpld24b77zzo65k42bhd0cqa8u66rpxnyxf7kfbgtybfhpx183qzxfwvk36fwmqkd89e2wn29hrbcio4ygp0tb05dxryjt8w8c8tgypyz3uh028rginiy121ks03zpke8mj3lc5ux7d01l6ocsaq72cgfmin3t22rqm6af2m4trcc201fb9fka5palqhdq0xblybtamqjju4ofo5lzd4jyc6wj93s2qstlyerci6mc6bpw01g5h4cmlr0izqvnrme3aj7sa4sg0kyb9wv9wl0mps7g822h03tuvotgnre0bx8fd5kdlp2ulw1evoc2zkkuun83gf9kd91wja15h7kguqskasy93jzv5d41qoa7sii8zb28g1yxd1xom4sw69827099q1twwjxcqd15sc0axqejkvywux0ccgnqufbfr05ucowmrudglc8l76hx7ujqfpppg7oddd69f0ushlw7s5bwlmpq8568vkcdzj2jh0xxormwqdpw1dp9bzqcia0zvbr537wg281syzaqp6l2xlwo9ky29amckv7yta9k6zztireduqcrpgnskm7ghxb2rwwab4qxlpv75mhbfg5y1i7k6mnfbpgbpycp9wjtph0s6fxbk5ufw08jqa3joucp1ox5l2cbtt0400vqgpoj7lvmyacz26y15ubibqd0r8u4bqv29th1run5m7vn5cmzdc40dhi6w44yxzsihrmjyrrsa4ov8lj9448ovzeqm31funm7h88uq67dyn1qdb03abfe1kf8oj40z8dae1xutrwlj69bgfx7nsd3g6tfzeumplonxvhukh899bl0ylk2w0nmhm8k6uthjjknmngkznl6ajseuoh1hs183rjk24ujux1u8vkz20amwfruo3zwgw6o7jix51f4tk6jtdwhsg7cw2dxpl1icte8nkpiqa476l7l4n54d0dudcao6lgqnf3yog16uexgn',
                fileSchema: 'ajxr9kn3ez1dvib1hx3qrx16xx49wz2ne0yiihse24xekinj653tyeootjr095snfldg545j1ncorlacxere64etl9gv32attv3hrnifg4ub75xm0esqz6by1afbcsksxk95cea9dyir1r80m36xgbdzh1k57fz03tj0e68mbbzm4gcaadm9s435blm6te18x1wc6253j7u9qajqaumy4hfu9x9lz02f2vmtngyftpuhntt79mha0y8uionddr3c7rywvbrtmgph0um7g2ov0u1pqwmvkzew09oxh8xxgnjzjk9h3z91v9dil2f4ex7d216vtltm7czdf5ilp4segnwzpkritn9800vcv0n80rkearhzgsrocysxsdwywc1r0czqkzus1dne0o1v9pqmnhv08y424x8nhlz69e4uwbwryim3iwslrh86nkw7idac7eoy96gzz4bd14rh9c37cja1vhe7vsedheep72kslxwz7gzsc9u5mhykmxdbvcuyrnrpswsovy8jkjgtqh5cjea0z0te2agxl3bwbo7gu8ewehs73v0ga994mipujq0q0isiqepko0w18weosac8lw20xqzpxztxqfnfn8ppqr2856pcr56p8gzhw28ydlbahwhzwxyrgckgiddgidsbnyb76zik99sc5sfbyn0chuje0z5bvtw5uad40la46154jats6w2ux7fmo3k958w5ock3v1sblh06zyhjx4chnw13hqfzqn6kg7mja36yq9y9hckumjojh0l4pzxrvgta787hso2jkqss214uko59cqc1qq61ukefqxbbg1lpztroruui8avkm0s4joh8qe6t4xxhygfcxmh1u02r0mfrchl2rj6nkcxj8a3gdusdcu1gre04unhhxl3ecvn4dmw50wzlsrsw81t74o65vsm41l3c6qt6bfc8eft8cr5s6q1zl2az8opeqhzrquty7lzye4om06cg629o5l7li0ttu9g4drpt1bjdy8f9hfuwvizd',
                proxyHost: 'abfs22wn6vs4l5i2anz8ozh9vn5lxyh6vzww69rs8fcqoqy4kt1kxpbd11yx',
                proxyPort: 9372370546,
                destination: '8fkzwoqc7ng1z3jrvcp55vy3k5p1mj6lhxdeukqx35rn8dzz478b46tozluch5jkp8af1x4ipx8udq0y9vp1tp1l86s3fts29tjch0f0yn7yg9x1rwwo2a93eqk7h682v0408c2fl0e8bkt30cnuxz7up0iqvrst',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '684xwzr3olxy9ao742ewlnz8jjilni0kz4pn0j8olm44oi1zop3q9htjhmmenz99sxqmbzzpyzwkjel5kt8sqll1731nw038vvwutd5okrgf2nuc2kqss4zkns3idsddvfuof74my4hn0kmifyw1nncpo40vnatb',
                responsibleUserAccountName: '974kdkbylvvjabu46ipl',
                lastChangeUserAccount: 'per0603xzpqm020sindg',
                lastChangedAt: '2020-11-05 22:28:13',
                riInterfaceName: '8j5uqm9lqbnjopy6omhvt91u1st20phf0cllw9zri7ne9iba564mtw1i8leql43e40dvpg6wzb887bro1k9w5lnhlyzx5wve21zk6mndgdh5vtofc5z01fckra0v93n59yqjxs6u0gpnydc58mr2bbgvluwwqlzf',
                riInterfaceNamespace: 'dfalwufjaskyv0s1kjshsnw8494qk200ootcd13jzkve4ec27r9npvp51lr3zabdm8d6yf1nvgloxann65l44vge8qodnr6omnylsi7k5xa20jzep1ttx6r0aio3shuqbe5cawforzlqtele8yb93v1i8uqfuylo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'sn1vozfzq69xtlfp4lu98wpzasefdlzujacp5va1',
                tenantId: 'rsz0ertq35r7pbk7127qbco38aw4yf3b6f0id',
                tenantCode: 'tarl41w57pdykuhpd3yj31tf4arbosqb7n105x9r5hjwbtfuty',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '7es57ntfxjywq3b14pxu',
                party: '1qf5965i2ub0pe96ckgqfs9ue5l359hn3lsgrp8hf0kew56ci68o6cve01qp5vqcu9ny2eypeho892uig5nb811pmcq8tdmvpujlealugauml3s1ky8f05gtmw4f7igc453ccyxps6rnl0oqb8ugroiswt7bx557',
                component: 'rzgbu0l4kzl5d5a93qqmgslo9fk6lgv8cftleoxzf5nzm5hysossc11s2a5z8dvxtuyo0ytf93ngeghccl4hmssxp5btxyfjra3bkrkc9f0pb4ssxpu20l0hlioh6qqaj603vthr9itw9x2k1dksoef51duk8r0z',
                name: 'csdlo1flp4juk60wc9roiohptw0uidbc5crjiae77r0yb80hnpxda15vp56qxozgdnjnzk18myg5niawxajvgvjm20y62o9a9i7ch52ipelgwiz2zpvifyjs8cdts38dpadgt5cf57j5kcah82s76xdfjvh87uk5',
                flowHash: 'ctunm10t9fq2ajpabkbzq7ozkveoa7tysrpxnmjg',
                flowParty: '852ssxuxf45u4bs0jvd5owabhp7w0mozv8vnobemxwleln97fci1o6xdceqw6wab05hs3vfx68vf1p0clieqwsmwj2s7revl3u1u17eak4e1f124pvd6w1jyy4f0a5ekv6g5f2g163ttunecwsd31mh1mnlykffa',
                flowReceiverParty: 'ddv304839y8tgtkll7u8t5totilo81zyswof7kf89f8asey4xgf1am905rera26y0or2hs5l3xe0yj3mmrp12x9ru6oub60wl8nox3vb9vihoca1ar9k94wvdlb7abwojth6m223clfpyg6eckrfpes0ve7ddjk9',
                flowComponent: 'z34y5o1b2r5btifbrq04lccmplz4yfr0scetuhy1kzx2l9khdcv394uolt1zf9qjlr9ifnb534f0f5dypmk5wqpr0fa1rw5xji1rsqdewqwk8gtp5jaleyynvkcusaypzptxd66bdoyu0uadyqjxuq4hobroegqv',
                flowReceiverComponent: 'bro98k3br6jmct3t7j5r4vvhet046n6a8ld918fe3bzvcvwyegt9za7akrv3h6o7q4f6agloriab7uj52vxij2voa8qvseofjh8h66niqwzqwmonry2lzbj8qda1kgh7tutovuy8ge4geli8aij9opu78kyr0voe',
                flowInterfaceName: 'yei124o968piy5hh52rbdsv8qolvcma53yj2ym6trewift7f7p4skf3q0ng5cw70mba5cugprm146owcj42qpb6wsls2spvuw7wfbdmu7ojklq6lqyuwry71fgtsgm6z3ke0sokoemxx6timybnj2itc5b14wf1m',
                flowInterfaceNamespace: 'ix5bsklgmur5tss39c4ghl1cv2mnfswbw73jva72t5omeih83nvx11f179rtjkyiocpejrzu68pfgu4eds3zgw9wb8jwnzswoajmo5hy4xzv68vla6esgpxga47hdoy26d5ki7h7m2cle63snl9ye2p0pf3l62cm',
                version: 'tw4p7kwba0lpkc42ydm1',
                adapterType: 'klj0dxfrbgf6l157106keqa253rrryt4aa7jfoovvxdixpscyq9jvfa444fu',
                direction: 'SENDER',
                transportProtocol: '3c4idrutxm85kb2u1592ru4hhioeu2y3559tfyzixs75b79hkis404pn5wdi',
                messageProtocol: '52p7knnenglqikroox4t7lkuomrtc4sdfptgby42ko783800lnmq7egph9uy',
                adapterEngineName: 'xgpt8kri0waz4tpc2icqyo51si5ed45cxmwamis46l1b79x60gyg3p0iswso3f6m5a2eo7kedcxhoeqaoahuflalhcsigvl4oer8f1no53haiepsza48t6nw7jg9qi9syvbfc3sd4qw0h3fseyx63kqar8ennhig',
                url: 'ft6jxytt0kau60yq6fujme0afx5f03x8s8w3fslcwrswhuvo76onw73di96vq5mja0dk6q4h16r96fa00o84s706iwwtutmva29vo957slkik9yc0ublh2jdu300amxazn3a55yltgp9ntaml8fzhrmmh24p7qpluf8rsihsrdhcu4hqgwf7jx9eqfe06hjca8b25yvp1pa32l44s8tkjprla2o58e701kquzx377gn8me6luhr6k7ct2g98j2babwub4v1nxgjys526kifsk0rmhe2qjsf2xb7ftezdy2m4fqg50vu6w0n5amqmzynj',
                username: '5y0yhx5kdlk52254pcqeuzblk12setffy12i4yi18ch26hc0psrgkuua5kse',
                remoteHost: '9meir6wlx9djsfinajac8qfulu4jj66lp2v6t2hgtqmvsylbq6iiymlbk54vuailsra0vstnn9qatbvip62zuawjk1g3nz5tli78zyawt1rlau51hdtzvk1isatyu6io6q8oo5ewftgh8jn6foveuczxiyozvzmj',
                remotePort: 3643221068,
                directory: '1wzf6j3zx0mac4fpf8150smw6vvvglzqu5frrwykmkqbgku8i1ga0z7d6uekk5i06hjg564y8jtqk1vwzzrl8druffque8wb1j1nqt5zc3syvjgdask174w5nugp9z7051lc48cf98a4ifsyo7uobxj7bvw7qf09w940g67tvm4l7f0ctqo9emaw6ra44t208aunjpopadla340mmp29s9xql79eyi42cr44ir4h6h5mrgsupbq1dzxdyo4394ktvqz5wlka6oqrej1nd9l97kr9ghmwoqwi0cxxzrff56pdc8nl5kyq1z0yrh0sc7h6c3m91e7vw2yhbm9ry9rcrcej2avx9kxb01q6qj8ij0h502nozf10nywujaq5gkvkj475ejay85pf8ul8c6akts1oycnw8vkhkkotmy3abkuvs3nbd9220bl7ms5slv3qg3m1mjjl9yblzxugg8oeabkxqzqpjcdkx8lbaijjzvd18p7jkft7adu9gktgws8zo7f5cqhz4qnapogvqpxevrzihaj2xz2kcmeer7dejxenqw52w0gkcac3kh53e5lqdvj9xb63fvva5qvyto5rg801hz2btc0fusvekbk9jcf04nfoxqf3f6bmasvf8jicibkni32929thwhl76nrr9vc5323rm8nq13egk0r0591zg6dr47ymnbtai3lbcagf6k5d97y7b76xo0jip9ah27i6xgzksdkndkxctv2acnzp3tb6cc7j7knkagl31i8gdx73vop8l5gpkm9031whoke1mu2zoogbaqmef0lai60xonf28to25xhd1fsdq1iw668u7a27ktcbv74s8553abzolw84g969jb2019s7yrgmnujzkr2nza8nx7aq0y70jh7pmkcsv6b8b8gbnc5zi9qvdbpb42fjws5e1qxgyry87aecdbm1yol63u2vxdo7uettqf2cn53iai1z7df0gl8gspzwx1ktqgj5d1mthlhz8kleaztgx3ppmak5zgrr',
                fileSchema: 'mmg7ls2wvdvvis42h1yry4irywakdz1mpuht1b9rflw3dryr4f69vxmzq2qp2cmnk117lrvu1291aba55sfvpxg1jdwnejko8tpc13iwxazzq6shljlwxiyoj460h5iohic088m75427lvjake1gwe7bufe95srl4hjq5foofbpyy20qot2opo3oj5znox7beccdkifvxikwcaw2yblgrz1vyxuy4265qtw2f5y8yqz5nfg7x1z20fva896qgqy0cv4xzvuebx3v8sjr46ai3qi4xk2idhe6imagvsj1n10ao9zp5311ma99jl8588f6al0yabhya66xq91aj7rs1qektjzebcfnojqm6fv1ucpspuhzv9fxj6u6lpzqk02pfpwi9mm2avi959p3ic958xsy60lls3psrb16krdq3y9dfcesq19aiuhg2lh60ob8m6fshhhanr35zfyced79kq9w1w4wpmuk7ko6f0ujpvxzy8aocbwcjfrq9gdorsjgog68a0t5qqh0m0zm3ka2lb3qgd968py8ay39a033idjn1a7qh0ei0rxupfklzxp0etm8uehedlsawlnitqu0v0me7sg14odmn18s7ak2fh5awfhk231lxq9jpdasarrburwha35ggdbvcypqaab3s9540j7vr50offcrymkbtm7y33q0w2iehyefjiqtl42qwcnwtdializd2dwo36yi3ynhxz4icfy5t34teputwauzn1z4b08j0e4ysl0i9nfsv6m1j9p8zkr6c72svccn54ahzhbwksmeelsarz9h4kvyeazi5t7y3md2du2hp1hbsthksvqug0cd2dlkwypbdzvuhy2su0rlq0u7j72oibau2g55x9zcs1kz2f2wbss6bl9umpbtp5ep7ipd6orbmyu79hbk36f4t4hn26k9nxi7vksuxrubw12yecofqwfyqc7m60sv19pwslhdkl9qmu8m2wvjm5hgmlordf44rz3mrb4nwy94upyz2hjpg191',
                proxyHost: 'w4o0betrnk9oq3jjowrhijmdkqpq9lgurz5c2hp9g8w6nmrwsslufhff5736',
                proxyPort: 4639663906,
                destination: 'roorjmqsbvapq6r5qr56fzqrkj9ha1wbvn7bdp2lt1e9qhm2612h1tck8y2hxxqg0m7qnu6ttux5c1cjv9jw06km1ntovcora3x6dvr6sk4pv4vzo5zhq720n9tld4fhcshekuya0puut66b13psze1jeixtemz6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ilouh7ijgknsxkf0lt2i9b0wxhlktnio8tep13amr8mbd2ewa9fm33vsacb997kzprzbky8a1a4k3vameveziuvi64ewhrb82pdou3ugb5dl5be333bfx8yfqfg1ecm0spjl4m7v5wyie5jn524q46m9e6zznlqs',
                responsibleUserAccountName: 'jb1rcxg6o1vrn75di7eg',
                lastChangeUserAccount: '4q9gnya2y8hvxrxd1gyn',
                lastChangedAt: '2020-11-06 01:31:11',
                riInterfaceName: 'x160zvpkelg5bpfztzs9lyw3g8hncru6r3phh72lajwfacduvmbsjnovkdu1a1asob8jp63nxs3h6txrlbadqndh9y2kcttutynfbrz6omcvqr9lz6muyhluf977bzwq25a7mj1lyqlsmq6bu1ttg2icc57w8bxd',
                riInterfaceNamespace: '4lndi9vwesrgeiqodytozul6yfwouubzza1ouf9smvv0mjil18buvd7jrmofdxhb35uv7z4lw5xpvefa7wy2t4nnhlpssnk37ca65zykp3owjefvfk50rvrl1gcwxkdvi1qkii02qkzha7huq0nt6sn9x9fms49w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'a0lm3agkpq8rnfbt9efdbtc39ebs5btaglgxn04t',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'e1gemg6f6rxo15trovuu0a2wt7npixkwnrhicvkd1tfefgs7ac',
                systemId: 'arpxxrpkzvt5pukmhiu3ucvo6ejjdhejeaa5c',
                systemName: 'vej4xtgkoezh1gkjp2zd',
                party: 'yt5txavfpfvh3dcwexz455ga37a2gqzphm1lpitciq8sl5wqrma00dfntpzk78q5lnjyc3n1qtwylxmc7es40synmpwaoctqvzqfcxshjcduwymn96di3nj750d5wp5kurz1lztthak6snzwcp1jof0vfk9sah4o',
                component: 'azszh7f2qk2a9lzy3xnd34hf8cf7smmpmar7ltm6ijxekvabg81qxh57zx3q5486os46ychkrjomw852kearpaw3xy0m4qs2xfi1ncuga9h7sihoalxdowl0yml5g6vt9sq8le7rzdee3volkjw3bccq45c85ukz',
                name: 'vzigbqpaui8apk916iadgzjruxx3b0n94qfd9h3mv3x6d44f3uosfrjrsas554plvabi4sy4mqufnmw12jkxsxw3kwk3q9scfvqh7ibhrkhbtrtrz183ek9ni8xc75ecn19jlgnvf7zz8o0sliwflghcgu6z7a76',
                flowHash: '62gu2a9z97c8tkiblqsmv9jyxhdiqsqi9thdv046',
                flowParty: 'd9n9xj6fplzpbsvthoeipwhtor80b3p4bjt8a6hgot6ob1j5om72avmbxkgxkk27yvr7l3o1j0umcri6pamo6ngthq9y0ydp2buymz4sizbc2nlq5wsa0mxtsryjr6dkcoz567cc504i0fb3faw4o9eupn96i8r9',
                flowReceiverParty: '76blkulrggeg6v43vrgrwv5vfv8kjmy0or9kb8zawxmx5yqs2ipq1wr1l39k7l0s5c2pmoglr0oa951k1edgdz7gccd4h24s403p01alii7j2tulea7h5v5206azuk9rkjctss7d3bkbw0pm9kb0mmm7j4meayx9',
                flowComponent: '0ke4cyvzs8ax5hbfyrlvrmnq82fmuftb5gfqp66mx48u8zj3voxylefp7hltoe08sqaty0wbsxzrzh0r15zewnr4rnvgvfh4v2yyakqs9flu50ffifal69neq64iaepc6yznmr21mt0u9r0vkfvypsc5d2089c0w',
                flowReceiverComponent: 'tx04tce51zt6j6rlbgm879bld7fei3xzkz5guwsr2nvjf5n0dv72y2x8x7q7c1chhswsybi12iw4fndlofx78oqfvwx8iswhmyobare4pr895vuwuvvo8nkg5jvcgv4sd58caihgid4f98x6upgbz04z887samj5',
                flowInterfaceName: 'hnw7axl2dpca4agl9je0ff49qmi6z3jvzdpry47ab1fnb5qutybavtt1fn53hh169o2ayjx5d9t9zov2eok7143gretyw32fxpbqxtc83flon8ancmhqyx35ellazq535tnusyv7ry2fihot6ghrpsj14gz8s5le',
                flowInterfaceNamespace: 'ij39dk0e60rwk9hxbuuy6rt1epse3sbz7f9djktrz5crqttx3su0xzrtpjtyxod3w27easqqj7lqv6xb3bli98kgmt61xkncmz8i4tzobnoqcdyjh1v9i521ccz3e06ef8clxk1ujxd4eagpofpzckvqo4ei2pr6',
                version: 'rd7kie0uao180s1i0nt9',
                adapterType: 'fyn0465y0x3v254rvibe48hsqr2d8n9hq7j6zrvv1nfm4kb3b8npp2k1thyh',
                direction: 'RECEIVER',
                transportProtocol: 'oeqitiprakgmn4qn3njsuqet8ek7g8qoayhdyc9vxyki8oooqp6d80knxnod',
                messageProtocol: 'u4ugdvomn70ly92lp3hnw21y65nuzevurp5ov03w9aujr767tsazqo7le5gx',
                adapterEngineName: '16ncp61rjl31q17u5otzcba2i814h1ovdojytmpueqxj7chnkn1beutqfk8okyvo85kube7j3a0nyxcbp7eshrhgah1zwmh23ru7ejtuomq1o8rwww8w01tgcfatfw2efdipqnpcvw8n1ohuj2cg27mmkr68zyny',
                url: 'u2vx5m2g8yhmgohlhw8gu21vy9nlca1vre9gqa73hnr1dvsy2458o92n60fpyo3miji0wbutf61ow6q063lc99kq1b3hz766kokw8wm6486s0vypc3ukgz0h25qw6i930n4bzuf5cuiqwy19azfp4d703kgd3xzqd57yt2u6eza7s9q3avv4zk6kuknmiq1rcscmuzwlrbv4egaxv66ov9u9sdmams47275mhv1hbnzrvvrl4m6k7oryzjh1hq632exrswfa9ahq16tpjzqnwxduazuu3bu4zlbex6jhlmen0ntw4upgatv42g8voju9',
                username: 't3ryctdnyi3v56kg117vkwk7qz6a2gp9zsl8ag7fue3rf34n7m36ad33iwx2',
                remoteHost: 'k3ryzeo8a591nfsgt8durcta3asqn36xbe806ppmrtoepvol892jpns1q88on9yfbka0abwdz5z67sfb5bnkunny9ncchnf9o8r1jwggt2vzwwzqo05dcsss0srcdjsac126o6pe9yjnzg755cvooch8qtr7e9i3',
                remotePort: 9001418782,
                directory: 'fh90ed738a7r00e5oyrz9cm4cy14lmf2nlkovzmxrb9iaqhmr76t1gaz2i8ihy5jy8x922t1rcnekukk8ahl6p37tk3qe6yy9jdj4xvjfh9imnnwya5gvuoep7ungg9caiv5q46e0ihfn9f3tehbn84lb8ftxqsb7xxruarvmobwxw6psg9blnr6gqa2ig413op4txfuq39pae8wytwe5eo225wpmugw2at6bohzjvqudse44sx4i4ed9ui0ri8aatg8k48fkz93co83b1lfkmfgv4uil5wwoqggmorlx2j1dv7t9irwjj45bmrl5xc4r6o7p6kga18f5ff1tjomtssc4xd6mx2jt17uqa8ada6gmtc2tvxoaslvl5flp7zy9aua4gptd6z7zgm58ektlau9s45l3cwm6g5x4fz0g4psfro6tocyxxvpp2wqek1a1orz9c5vdzqwncuxa2t4hn4oo6rteyqrc4htq089kg2l3btatq7j64awuktdslnvcsmr3zlxkz3g05oa8ghokt65fl22ngv6vek02yfbaho6mtaon2u42unilp1v8oi81uxqlpty2pg9i863hglrdqyq0jrfwe240rguhr3xpmbxx61abrvff7he6ey0fpzp7f6kwwv3upupzaxobjf8r49m3n63xydoc9ytsmjhjac962nrcydft2o6rmd3rag1fn9higx38sezbtpyckjkrt8yn4paz4e1117fbyui1jlx9hz9zfphhwp7m8imh406wl7mqvfyxfavg3vpedbilcciv69ufq9bpfxlfa4bmwddy098wz0uz8o5b4y99k657drsku85i1s6wkkwpucols3e17ngfoeyony1zzpzvoflyezhbouk5pa7gzt1gf0nnw34i754vm4ao4cv80f3zyxv4820kcvfm8icnpi6fsz9n9fmln6gm26xzcq18q71otwi7o26xp7gw9bjaa1jhcg9kcktm6vf3k9h3ghc8knnvjidcnoepqj3blja7rwo',
                fileSchema: 'ehl85d6er1rrhuuezbg2pnc2v5potmha9yjgpg22g7x2bkjuycolvvdov8ih51j8wrzo6x7dv1xreqdgjd064r0g7wq3z8w235x63wgimzc24d7ykcn94nbf3a27rtbydb8tf8byhmh0yeknt5nvbu3mfwivndbnn571ukh7kc3nnuqyu9qepib0ws6ldqae4frtyteu9hhxu1r7oykg9jq2n3ogind308i86vthqarykvood58tio22opccob5vprg3kw7t67xj2vzxe6ui5pcztu6gdnw9ja52ev3lsbe5yw0wkynl2u0y4fnzhgh18bk2lgk7x6h37u5reiamofgxitnfo8kjjjx02tdowwj0h1r4ger2puih9boxknd80fl5sjpxt6sv3rvqh2kcabd0gfg079g9ut6nat3qj0bzun5nspejoqpmx0nign0hlsrmf565kchykp5jjdknhc8flm6wgugudvomun5ln6t77yjd60il2y9as3ucf0m6nbb9vjwyhu9izkkgk86zedqlviuiwhpps2giv0d3owaczfsvtgvurxjlstbs588u2yzsxn0p278k5orpr3q5t9q5xfih8l1rjktzxugbomfczburzf1jdb6fcvo9rl5mtnjw4fnknhxs1kaegxfyuha9uugb8jbswhwmq6jku43mevajez3f2ck4yvou9jnfxiaftcb7xxpd32j1e516145fmrp8w53c7gvbxope1fpp3k2z81pk14n2o6nxn9cpbq6dyhzqe0hmra1j2rvqnpt93q3rajtfr3x00bb95zdo74cvdjp3tfebgpmxjx47ugmlt76u6zkp8gug5xndrut2gvtso64ubup7n1vvz8xlvug6xftuy7oqksq71g583euperr20sidksekv4rwsm4zly3l4kyt9b1xamqu5uad5n3cyf1l56ebuzoq8e4b2togvrkm4pm6h0y6pfu5z9xqc8cqhki90lu7cdzx4epd4xa1hz5eb2crv1j9sdg2',
                proxyHost: 'mcwjhlriwbp4ccmoskkzvfw9xo674ciu7e0aevbvky2cad4a7k8ics57jpbi',
                proxyPort: 2886175816,
                destination: 'gkmzuh5bfciuktlhyv9p4tqfbkkfbjhpnucs5ngtp0p6589kfnfvfttk7yd80kxyvziuaplhwpsz8lgymbfipx3cl2epo1r1rtmenf62qh3vi404ukxgfkfl197bn9yzeitx0o3i4clgjghtkvo55cx4eg42w63v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6e17qg813vf0oizrvxtnfpz4jyqw86xhjjtygvd6e7vwryemswq1iizh6f7tf58c2lz8rcmq7fztqi66ckk1aif5wy4opkpuymyp42n83fc0z6ib0ws17e52l76pq4zpjz9eltv8q8n4n65n0lp8gc4iwnal95ph',
                responsibleUserAccountName: 'rjwcl5hu3j991n0k21fs',
                lastChangeUserAccount: '3fnbclsanwmb6ouhzm7m',
                lastChangedAt: '2020-11-06 03:05:36',
                riInterfaceName: '2ny596yvujbw8ej1i1kgj7hp05pgbd7rqvudxkafc11qjtkr0n62i5p1182qabg7ol5z4gu2gaqyu4va07a9tnpugk51u2vdf6fxm6d3az7vcnlyg67thfk0pflfqwbdefbor70ju6hmq4rfbfx2n7b6haexkza4',
                riInterfaceNamespace: 'gmbe86u850xxipzmohjblyukiofnpvajhppmkad5vh2is9xhupsvqmkdba4gvh4ee9al4beqm869x95ozerpdlbu1xgcu0nz4dmr4r33tmn9oxakj10wqln6dvuhme6nldlv8xta0q196xdy8egzf7fmf2ihpsx0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'pod3jhv31j2hujaj0mcoqzhaccrduivexccd32u0',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'gw5ll81i321tn95rypc6uzz9fxdannb7m8voodv7wqxob05swy',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '1tqovbih42l4mfwzdnqb',
                party: 'dc8jffcpaugn59uky5yhsbtj7b42sqa5guawo0b7cyz7w651hxuyzicqf1miq3t232camgco514ur4ts0l2ztw7u8sujj2iwr7xaqmhqw2qpd9oc7f21tpjyn02qylws5er50uqbcmv27oqibhjfi14p7zb2wd0x',
                component: 'vbaw9numzy7i6www0a7rbihfdlq2u48au3t6dyv399dncd8ilj8bv8pq0z0wmz9xc3d7o6hv3uzj6qtpf50d99c2srbukp42kg13qjtkhgiiyos659kxztke73z3ko4cnihfkfpvm1aw033dzdi9d699d1l05l80',
                name: 'hwj1sdkn1t4ebgqvbsxexpw9wj9ile18wx2g9h4eobljqn0y662mi6diqln51eit3ro9vosv271o5bjudzpulquv3kxu2zcz3sba2bapfgoym4o6uupknvdv30rczygmpfaxwrm2sbkx8dk2654n5pi0rb7ns21k',
                flowHash: 'uvrt4s6oatgvyeh90lrdg1m8i1fkq8nkkc37v45j7',
                flowParty: 'y33naimf2p0xkc6u5rujssgij2fx43muxoazqsnihbnqdax0zdiceotn6xp0wbq9ki8kj8pcpp9put51uje7m2a6qeq5v6nqphyqbl97ooei1qrdd1b73b6xb0d6so2buiuai8bscqbnle6kpbat55jfujl84rcj',
                flowReceiverParty: 'esptimylnhvp1tvrzwd79oog68orf1yeibx47otqn3xlhfq5lhcqlbc1y4glm1pfcd0lhetl20ftaj1uwjhc7084ncmdgwlnxgjto9ubhv4el2oog920l3bwz770efqov9fa590lbhong6j948zx2oh8q35xq6r7',
                flowComponent: 'ud9jexozduty0qshscu7xox61resg6rdigpfa83e6vlzxovux4jjdp0ut1h6zv46fp0txyqghh8chu3m5oe67qjryucjinj6cq8z0s7h6182swiq20gwqtorq4poe1lc82y4lsskts5red1jcswht8nv34wcm3q6',
                flowReceiverComponent: 'cetht1opc7wu7uag8fibfh05lkj6g99akziffrnz61tql1448lrqmnqse6t2fnfnl44br5emr59faa3mv6dlf9ns9l8juwrhfdoydrm2suk6sfzbg24whsehpyt9fdptwmjzgx5lpue4v6cvz0ttyjz3wuijlotu',
                flowInterfaceName: '3xgvynkng7k3yd03yucj8s5dq6x3xl92g8695888jg6sraggmobe31tv28t0z6s5fng0vwntuzyjqte3ncnyb1x72m7a1kon6dshrsiq203zp4ql2rryec3hxxjvdwhco3y7nk09cmreb2o4s6u9qxrn6dk7j2ws',
                flowInterfaceNamespace: 'rckotfvekdkjziaqxot5a8x15bxposm0dgxtfqxnx3nm4yu5o3fq69dppdqme5qph3xci9jwkd8bdev2jp1jroitimdrkiec3g06qydv4l16go5d85gwqwqmw77rnyz503tbty5fnzjpq488spqaon3ism07wo8w',
                version: 'm6c6e9vif6layo5ueqdu',
                adapterType: 'n03o5qpys6mpq4b0wewdjbq4np4ec88orb64qy92j9xe9q4a4wkyol67mrnc',
                direction: 'SENDER',
                transportProtocol: 'w1xy6hjw1ls7q46jljbula3fecekya73kzqzvwasr4g7xho88u23s112udkb',
                messageProtocol: 'f9lsy5ji7zi0cve49641phlnmi5ckglkqxthrle7nyf4mknu87chqjy0adn4',
                adapterEngineName: 'zb1xhm9f9hkrf6xucrms45l6wz5a4sh5qzhi1n2sgfzrg7xl6uk6udu66pthwf7ms5qs1h3o922ft1wbfxjjc679oysolstag9utcf51afgk70gvtf0c7g6bukt699ohoqax76x18e8t4tu3yc4uh4yqwclsm4f1',
                url: 'p6rhlorbqxhgxet6e8hna77r2nkkpi67rnfgwuww958dn9ld24r2eyrjx95n2ui8nna7ksum0oqiujylb8ivc3hnl3aqv87ahefdwfk6czfom8i7wnjlhnn597ffw9gmutxd0vobfze01dnmfdqvex2amimp4bepzpgmpqns321y4ygxnujr7g101bixp5izr31gybcr3nwqbgu3r7xssrnnwtpltxjb9jyiaxz57kpbr5dc2w320qlu58c66sooggfq1ni8a1bnffiwds2q7shajugpj82evj25z3u8ptpij0jkjw7ktpu17ijkalsz',
                username: 'psvhgbl7018e4np4ymh6yo1m6ygcje410l9v6kikl4uk688cw56ny1wthhqt',
                remoteHost: 'jm6u1rrup5onng4mzl46s0ao1jsmd8yo79x06bu8imjicw7polhv4wtv3xyhdhioq3e43v0kac4nheqzbjyjbic68rbsxlatsn0f5sdujg1r5hww7zu1rtosgaw3vqmt07uq0s5ji6krydnqq4tb8lettpu3vcan',
                remotePort: 2565387430,
                directory: 'qg2d4d64ajgm42gliujhhxhlht1ryyegiqjwlyh90e46h8akn7ntshmjh5gubih7vc8bvwvenwys9n9z2iuoe7wuw2el74x02w881bxvst1cq4aepx6vz6jixieh3021zw7a1blqbmg81lp0o2xe2az860ssc6usit9twjajvk4vbqomhqngtafdevp6noojzxhcdbkx4gskcevwlmvclg62i0fxr9jmzwy69clna5cftgwuxhalx6737xurdwev34qgdorv3kq8or9w606nd8lggrofmcgm51b7ov7wr9qozhhejzsguxpo4mxvcwwyxwy9ovv0mhmdrz7xox07adyho23c6hmac2g1995v9lo5a9tl0155yvwkaf0g1rma4w0munvt4k3smlatf85zn7fthumdw7vmmtl6lh117lje9hgyl67sr5efnkstg2xcb5r3gjq0hmzjmazk6jxsnhagf2qe34goatgxbzgsxb2w78atfeqlk5c0744hcij2k138leckc0l5gt969auqpffhg9xcmesjmu24mrmc1497j66z1pwq5qm0bz2vv0p0qyawjn1htw73mizo7f93x7djh2g1344uk3e50i7nl5pf307j9n5883z5vcmvqir9a6j0iqj3q450efv5r6m0eqcye2o0x5tdind7diqf5f418izo50sb7gosyrlkf41in760xyagtpz5f3z591hkqqwy072k0vvf3rul06l37t1z9k69cgw8wmciz0rb5w3n6qxr5ch0rl10153r982v2q12r6q97h6d9m10ow4vxugiud3h0ta6t5mpvtlrmnc7oeyxcop9z4993gcbbvd71xw96yr1zrgcyuin1yktxchsqokoh50areb4dhx2bnvea1xq24y8gf7d5akt8mvgikwce0wrwv77lvkuq69r8axo86u2z83170d3pgkkj2dgwhl4ui4d7qk105ztzwwqp6wppqil8jjow036n36wt18i2oyc76qdavco4iumo6wp',
                fileSchema: '9zfb62w75b90syiqipxi8y3eoyghzkqybw0svjgng183shdax7cdgys2brk916kvtkjxuqhjcblh61vcwdj40m19jr291q44ln29saq8n12sfdkpjbzf7zfj0f88szt8e4fpzq1prh8ccf97n2xa6151guju4ve0prjso395aljzvg9kohmu17agof86ok3f8u8whaf3xdf56u1j7xygc1zzbeomeg17om6pwqs4uny4jbi3m0ju7kx5p3u13vm0l9r5kbxwkrbtid9luos5p35xmau0m119tnxatnyzlvm0ax5bqgvz0f4uuhtoy79w43bj1coqr3bi3pzobg2c0r6ty7dqmo4sizrkwi3342e0qkjbym1lrjghjh32dftqqzl2a06c2ejbtiqb17i9j00jau9m1qq6nzxbngjonhjuj7yiroq08hz2pafbry4prkzrxngg4ytd8qi8bl904t46mtlblu0zbgjo9o3pzswxtif6aqfz1h3fzexr6ffzuprr2t1im0eukbxyy46i0jxkvfmrqkha08m0u8xlqmmutmw0vk4y7dxlry0h1dvee4y1nm5irfb322ymmlw6gq8d2nygnl56syjhxg92ixcft2qw3ts5eqgtxwp1755sq8pggiy4oidx9f9nlvf8ee80t9khe625jzhsg7by4ibep52ks7az4g6g3lszmcogsp0iho7cr5h1z4kk02c6u7r819xr233ohrebfjfk0zj6j2u09vkhpm00x9gk2oi1jmrym2r0fcn4820c5m18vq58f4r9kz893joz45v4fquifcq9f0cbr8akqm8xfaus34tmd10kav8bbmkftj94e00smfd5uy1kjm553zqba5wof1ye42d3xsxrxne4yx30iyamp7qq6fy3r4of7g3rt3d4xtuvhco66q7vh3o7jufvkbowxe9yim3p8pxaczyb50tfntrjjcqx7arbpujutc5is229ohbkkbus511kmvfaxcs01213jmjwdmg0dgpe',
                proxyHost: 'l5qv18o472h5m6ji1qq5j6ky769fmulb7ose7iy7ztsksl489qk9pnn20hxf',
                proxyPort: 3166680890,
                destination: 'w2b92vjit66682z2cqo10af2bk6l8ur6bo7xi45i1a3qdykre25p6h7txwlb5pgpi99ycf764dbekgt0i90cg3ubdjjbscro967xwdvt9p39nvke0a01p2m5ch1s47intygv66n577bvbt3l3vx3ghl4cpfkqkot',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p5is8qj773qxvgmapxo6r81k8azaocm0ja1zuj46tjg1sjnvf9r1t61nw8is6h84ot5rw4bp0fpjjo3izxiowf0uk0l661fnfieuhv1scpejc22rllgy7wrsoxuz0vuks0pqa84rjgzt60cxgmqy2pqo8n5uvfod',
                responsibleUserAccountName: 'tbw9hfqcb6fcq1psea6m',
                lastChangeUserAccount: '9afha3e1e1s1w97l4294',
                lastChangedAt: '2020-11-06 08:53:47',
                riInterfaceName: '9wv8e3rdg838j882ktg05n610mobw9wkstmcb1ufjord6y4grevwcgq1rxg25qri13lg7z2rbtpfn4xr8qs0owfv3kppqjpl8timep8bs93fefqgvojn7us8c0dia99fhypazt09nzvoyz8yaxwio6ulwyjg7qvh',
                riInterfaceNamespace: '7267y1ep7ds4s3hvlpdtojuiuqf2qnurbg5tmaxnt4fixfbdwh4vn7xisy6kfvf2b0gnugw5h01y5z453ofds5e5ae1gze5p3mhpolmbz29n826iqadzwq8neuxlbd97zxj1v6i4v3n7jmyg2jkeu1w2g4u1mlq1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'jnxax7kfgbru2brag2cc6y33dj8jemwr6oex79gy',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'q5a2847itys6fvhp5bmezwo5tcv4xmutic761b1ujeym6ykx0y0',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'x9oi251y57zppanzdxct',
                party: '8ajab0bbdl553k8m65myhqwqorn4f65mg9c2us90xgix5pcxn25r3tju192oew0dvs7n7wpg1g2mx0ju5ul97b5eevzrkyzphq1f3xblurpzv9o93lprknbvt3upe8xc3l5n9sztmowx13b8m01ms004qx0ueepk',
                component: 'xqtlfp8lgdr34efu7xgkxftsqmq9st05nqifet68uyhd0wt9i8hto1c47n3k6te53a08wu2hrlp5ero8h833ddjzgdvap3a7dzk9xskm5yfhkcgneoz458o6zhixh15g8j93hetpxkczackakotafa1jy8tz9ca5',
                name: 'b9lj95ulqcwibn4i5e5zglixkftxysx1a3z4xkiv5kta0xczbt9vm9eqj5e09dkjampybm9fv5l7alvqash35tyupo4eav4us35rb0rzysbvtcm6v0ng22om68lb716oe5sweuf719ubokleqg5jwhnwnpnt89bn',
                flowHash: 'vok0f63p27sxweggxfc7pirpu6cwzxgenxomyj0s',
                flowParty: '7itzb4bq5mogz2jlqgrapshvub67c5lvtjdn9eetadparn6vnub7bo3yyzpho2yntaqyyl70v2vlbpvm1zo5790ly0x5kvxfyah7f4qboa6co6niuc5c0r65b1kh53oo4wfbgswz74fkfkix7av5e7qbn78t5hds',
                flowReceiverParty: '7phsnwt63nrzhti8i3np3y3put8hwiuz7cr1iktdh62h5i5bdn8b1xjf1brnix0a0nat1n6wm0wwho4uxj50w36ac46opgu9icqg39bvlotz4h67guej36qsb3ftjz8iazanorwpcay9r6qf3tu4aduzr9q6j881',
                flowComponent: 'm6brynozizd94ici23i8w5zgcx64fel78mpcsb687xuxzwp1sa3dl4370mjdapyp2jlpw066flbn4stnc7v13uzc56tz6wxm99uhh6pjedxom1tlklmsk7koepvwnhq9q9c7hf0tp41vbjbq17toj0gpy010q70k',
                flowReceiverComponent: 'sm232fgjbu3n7p0omerp9j2qtrrwmollifdiy5hj037bkxb5d508segpkrdns5a9z0ok3m3vhkffi2g6yj27gg76h9obxv7f4eu4pp8kdfockopnj2p2xuvvnenzkvpmty7u7seba37kkp1c7lf171x85161iiye',
                flowInterfaceName: 'dlgtj5qa4r9oi6aextvdpvzwprhbzto7rzj8p8ty9pn3sg1iqnty2jpv7aes9fx8bo0ki2vn3tk9bpinlilv2faa4vclgvppcvrzi0ka7jvkj5q6pdm6wzbmva2rvtfdovrybuwqjb90abh6dzcomi9160mm27f2',
                flowInterfaceNamespace: '0z31f24m27925we8v9jucas8b2vg7n4okoiar2cl02semu87mxwgxbn7f2jtms92sn36q4cpkgf3ckpg2znni1ph5jmjsw6er1r3536xwu94n4i4cnegpjy98ag02mr2rmkofs65b731y2drz3kue2sm9nsuu54s',
                version: 'pgosut50npxdneotakad',
                adapterType: 'y3i1nnjnh4k4w7sy4mawbc5umlbux3qhyvesvygzi43mdbz5cbbvw1jlfebd',
                direction: 'SENDER',
                transportProtocol: '659u1bklxhji02usd3q20dll5p4dherrn667cj1wsz69wktfqv5dm43gcog1',
                messageProtocol: 'sklftxa7xxy0hf2n8nuu83kms4wymua6q7n4iwmblcssb7m0g1wk1m0l2kdc',
                adapterEngineName: '3g8dp6bz8fughaqx2boiikqy61cughp9fa18ymgifmzex7h7xgi0rr3kwj31gddk4qa6c3zm6ike0rem254l6n4d1nozdulc2kxsalz470egp4tctbqhfsf9iykag4rcn1d2xvtoo0mawatrvkcr7d5dbx35z93e',
                url: 'vqilcfq7kiwumd0h3n2r5z2gesei2fn5s7p0tqlzipvlsau1ettfe5uddk7bb5j6k4azamcvdtyk4h7tepi6zvsxmn87ltd6dq0if65hfknz2pyx7r76lwsuzjhr1rumbjd5a6rgu23uhiex39gehgshis1dh9ztya13d3o5otpswpgmqjue2rzb9manypnyy0ovga9hnhk8av636hqjxez1qm11fylzly2x81qgnvk271tq0nxvhcjf3ca8vdqjmly9i3ulid5yleev812zho7eyv7rbe3txzspyvxulbm5clcj3ydg11i2ixafd6qj',
                username: 'n9mgbxsy26h30ect2k59uve8k2yf65k5s9uoduwkp3fcw69738k1kb02rm4j',
                remoteHost: 'qwn3kd9lioo8z04b560q809whxaiq3nwayk1unbtx34z49g2ksjtgcu85lv44esyzr5cin7xp5heefag8gjnib8v794sice60xurgdconsz2xi0seq9lcabvqxgshw3ru0f1zu8576wt6nhed0nibxvf2pboxftd',
                remotePort: 2986103374,
                directory: '2yvqvwxp6d6aiscak3yi1p8wa6n1pys13sluumy0b8rb980hww7pip8domnqoa5kshxhaj8eshsv7g3md9akwr9mzi8kmpns6fe8ddjaqimk1l4tra58kxd80vez5abuv37u1xp0uys8ekxkiw03ckrg4u76demnzy6ca9gkj1ojo0wrn6zdiiffaadsxz0evyp062lzql5bqw78jfzvblo3kmvmyvihjc0forw10n524e9vrn0wfh5ybbzxvc8wtjgfbquh07e8mj1iv35iqvj6rm5u5tg01wdlzmv7j178ufdwqg7ursn95adwnf35yf2v89rwg8zflqtapm0zbprwdzjtplvvx3hmt7q2djtcv6udl8rzbfanx4j6e572gsa2pr49ha2fsua5su76t5qeayeea2llse2jsg31dpg53ayonng02i74ckatwzoxqsejkoie3m0hikkva5l6vpbbcivw5b7wx5ioe40pmm3iwr857wn9ln9el7o34q2lwip1o68td56wjr5wcbauze7s1nblhnri6numtrov3pmoq72eixdercs72f6v587sznrbw7z15ny6lssztcnjcwme0pkmviu0hh7r0va7sbozivqcgvh0ivogmmk1plxlapq6czsdtfqrgeucyuqloq8rfw1388yv94c7134c83wl6dcrb3vn9kdkezm3uh4ifhrt0yhdrepq7a9fa3f5yohleqjsak4v16nn440uaj2hcy1i3gbs3lwcj0wcs20lna924q8222guh2npj08o71w0w2aopa8bm0g8c0q58bfyswmolfd1zknqa3p2pqzh4h25215iuw12oiq47eevv6eg4143lp60ieser9v75v6r5533fmx9pbf83jo0qxkj9qu58d5b63t3zmaoved60posa1jbup4lbc6x17xo18qqgclxecszch2j6s7y93lyeceahx65uwlc5uc87zsnqym7xap0iklswn0gkefel1sxfaho0a5aqhtdaa9h49qr',
                fileSchema: 'at8xhi74cxtqsk7srtsfi0uhd5yttb4isncwj3bc4aw94xm8zp32k7ts33n6rv6rbry0zyz18isj79org9q00bcuurow7ba2o558hlsrjicbdizcbi5ax52cxbeo1gfw7jhhapuzbfcqik6gsdybh3ohz2uympn5vtg0ondd37wilm5tokr4vjiw3euwduwaosouspjav84wf95di9gi5ei8g10ib5vc42el3ukwjz88omuezhct5j1ezxpvg76ye9jdlewn6jl7i9n7o8pktqwro36gcuiikqy39jm5dk07j8uk16vf7zs0s64umn5owswtpqwkjj3lft0nkawun6vf73x3kiaviklw91w7din4iaysvtfo8wdlrki1w7pn80l3zt9b0vvb5w8t54ba6koz0jfbtka7r2ib3g6ap01c8ssm02tr7t8i4dijhm6wrz1fuqzmqbi2p2pqktw78zvava1n0zmsn95aqv0tajw8to4agfxqwe0jb1z51x0enzhsz1k2lk8s1jo8e6tuu8dp2u4jx2rlqotcr2wpop5cwyojw1h4lpfiayqufko1hxatlqzg2cmscywnyk1ew06ke1a77vsbjnbritnwqd9n8yba07odylbn7vp78oydpe1d96sdigrf83cdjftau7uv9nxea6fgjge92q2a2e5yvddxxt4s041jhnvwdufqukq185ddqqc5nbx4buci8xpv4cerpwld6uqvrlug259vbgpg0u0cn0qaotukqp4xmp88d2jqr847die1yicsprcfigjoa5xkxqi8he79k140tic28rodjvvhsutzdnpx8w9s8lj82zdpddxg999nisdoqq8qbc9z1oyh7oj0vrmegwtrmt0ig5o7za2lm0nmw2p5nppwcqwjv81ev8pbs5byk42o4opmce93su5f2veb6htbh3rfnkjgkvlaa77vs7fs7o5hp24kv24jrka6d9dw5b6dzrnqyepvntw8ldhe9px1te6pvgm112hlf6l5',
                proxyHost: 'pt1n3pu0tweaq9fzk7sp9h4ubhenflzr1tvsgoz0vun8zzn6xvrwnwqx2i31',
                proxyPort: 5380443062,
                destination: 'be4l98fj32uq6qx5pz9q475td5kpod2bpmcg1tjt3lmvoa5s9qiwzl9z71ur8op46xqdagvhs8qaoo4fpn87h4krwv9s6je7acvc46q65ku44tlz9pgvkzujxm9tfkeikkf5vau2yucfhmdeadm3097smsssnexx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i4ugjuji7dm69vmga4ooesfsccdfoisrossig6b048qptaupj5tyewrptvwdvncza6zwhq4y8zmxt88pk3cp51txfbwf5x6d6smr1x3s9hczooypyr0xdtmcg01qr8kn37xlz1s3lwb2qs67aohm2ero2oy1ojoa',
                responsibleUserAccountName: 'yiiz2gq3kejftdm9oo0c',
                lastChangeUserAccount: 'xfzqc9z9enebgv2df9s4',
                lastChangedAt: '2020-11-05 14:11:20',
                riInterfaceName: 'd4nhi7ckg1ey026shwc4jepif0jcgfxeb42ia7xcgklj16cnvdh9f5x6zxk219tc2b6nt957fpohirx4cnxa485fyaf0ggf90jv6m9yktbcjtsttdt9a6gtiyc22lhvm4o36bj5i7ocrbxo90oitc9956smrt4r6',
                riInterfaceNamespace: '053ktjwiqiofgz1uvd4x2cxf4apva4ndxg8l24mtaal8scga4dcmmf2q5ryqe903lpjm0qda9c08vo50hvucqzac4m9l83me12z9tvygpcsdpwqb07dxs8opkfn0izj3dvtsm7s6dwv5fe677y9xtahmpjlqq8bx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'qdoaqf8r9meic1qt7qxspjowbj3lk8402wccyl4v',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'jl7et4xihxoi5uzjvmf3r5ve93ozkpefpmlxz12ikuc7hvx6ky',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '97tlgl1mus9j3b1v03eb5',
                party: 'lpfyinxk06soygv5pmtni46kysucefajmyvieo01ued7sa9hw37n1w49v8znfi2v17g51wyo385ye1zzwj3lc5ltvaelo3msarritf87aazz7askfti2lwswyyj12i204yx34tt3ysyp23k65vy8ni9fgbe9r29e',
                component: 'cetm8kbbwifstgwmsnf65hkapp9areo58msa2ubaaray0tgsuo68d7y2tnd5dizuc28o9w0y7fdvzejyazw0yrgqxy9lrtglhh8etgd15e0smtlfkeekkh59v4evitsubdpn3ng8v6s2dnow6q8542v3vqa9t87y',
                name: '0vvrcr7mg5pgyflqmncth5qjuhpkiyb6z8zd9l5yw5apz9ytejx9jzvy1o3arpd36pmyeiryzevow8u0r3cvmbqc2k8466ctscvor2klkqi4ian2yufjw5x88k6hqwtz98nfegqixahyee6m7jctkh8jokrenhah',
                flowHash: 'xocz3ls4tr20y291sdna0jx8zmze643iomozfku0',
                flowParty: 'm8ic2zr9trkfp3bneoiql56kvomt4c4a19iq25xv2o541rizz63v9176iuxrh3ly3f8hui8aals43wi0qp8uv42kgvgwatu3b3l3726pwxf973m4lekgf08csdz4ejhr7mika5abk4wdyh7xxrrw5vdjn7uu0715',
                flowReceiverParty: '4zwrwof5916fji6btf03vnk6kwpqme00i0inksbrajks1o93idc0wenk6ylfgigevxkcpvb8yk6yjxeef9oey6l8iu4sk8xsh2sgj37e5unxd5j7l0whomfiwrbhbic7yay0siwxwtt0f3vkj9phbt38baqgwfcd',
                flowComponent: '1yhu9o1spegcu2g2q0ox97hhbft3a7jlscf037jkonc9m3a3fgs49osjag6n7ermjbw1gpe5tzounmtvmvmkqjsjvfuvup79svu27eo5z97ane00k7iyx7fgqwwtxzku2rwkcvtshrzlxqnk0wmcp4x87fs1i67o',
                flowReceiverComponent: 'vw1wqbo6pmxxnjodps868cf9a8yw3wtxdoz9x5c33j5sz9z5zgu6b94mpettcs1sgoqzbuf3nq1070v2c7hjetcx1ugl31hvfxdw7ktd3ddz9lb8n3527qex0x1dbmjokkcv41ydsdz8ii31ttym6x68pl05jxn6',
                flowInterfaceName: '62ylhllgl3m9t8dbcy9fkgmn7brjhsciun2guzdcidd044b54bkvy4fts1q0kdrxgnruuv3p7560zfqn8fxf5u2psmfw15iqcer9ai7iuzdzjmvfrfzqxdp97silq9wy1v01itl32c427d1mi0jfm3nrn3a7ec9n',
                flowInterfaceNamespace: 'ck4y5x4iwjmj9dm5strmviwwab8wmw70fwuym33h4oc8liu9syjzwsa8n09az9nqyc6csx15yalola9hfh79azhny28gw7htgesfx7strab6wf0qmjcc7volhiw1t6zxaiow8164wzkn0067imc53d5vabl365ur',
                version: '68k5dx7ns69z94fe4svl',
                adapterType: 'v5yhqqu3emm4h2dncnx9bb4cmyyqhz7zlmsfibcpa2t6jztc95avn0ulo8s3',
                direction: 'RECEIVER',
                transportProtocol: '302b4sj6bf7ofnvoxmpx0iid0tczwc1c1qr9wryt4i68gt62etzt98sshb18',
                messageProtocol: 'qnpm0yh5jzkcpk4v234kvdzz8jbua3nrklcfazq2ks151cadscs0739lexv1',
                adapterEngineName: 'qbcd09c5j9t80qf29iohmsy0s7qjpmll2ug952xb0n1u4kexhtm3a8a463n57fv15fv7oag8ln08uz3284iv7c90mhp9tqtwjfdgtf2phitr4s4z36baw1wjv79dv3e22qnp2w9fnhulnn1rpf6mgqs2qqbc10sd',
                url: 'g2xsdtcr41amoziuuxxpcl6xx2vw14icr6w51w9nvmily8k8q56af1yddqdsrexo27jjp2y6usy84h145m60efozctqskg0o1nf5c7oh8p38kc6c3nl66ijp0lweff8zgvibi7btgqggmuj28brqgztlrwvy7qjboanwwfjn31003ce23il2jzy80aholo7w2veplw18e5lbzkxen3c3eta3p5g7onm6ntdu6nk0lcnrom67o9n3o2ffan6ozsltqiiqpnbutbocwyes2kovjxqwatcptgibdgowhnupejb9jifehyleo7ngzs565dhb',
                username: '8fmp9h4c0m46ryqyll2pccupe43q9l11p51zj8ko4w7mb38oxytjimj3hwbx',
                remoteHost: 'f5a9zd7ct5z661mmhxaytb4wisuxt52gf86e2e8dtuktt92fa59f6dm5iwi7iw12s1o6uu97nmhb46qcxlhzwuoiv0683v7jk89e53z7o0upc2vvuqdjjfdlqz8t3it68qx2q98psspe776fcm1164e33cheiq26',
                remotePort: 5301936121,
                directory: 'iosdr8o682hzsh3lti7ibbxtunxxyjsugbdeba2bqakwpdhbv2c521i07hxnjh0ape429k5pjze6hqvyi5alymyk810t7q7dl1ce01k5qeisokb7de5e37dsktxrmijxsvv4wo80cu09hzmypl1j70oiaofjgi32678oumm89t98ism4u509iy59izjdmg7isy4idgfyiw8u529bgvo0x9h7uzpe1wqw6cpxg6pf3ahayrf6syircg8qeazd087kpnn1jctk54u89f93jrjuwqzy9fdpncqoovnahypo7z41rqlge6q7qhch7rj3rq6xoa6c5k25chdg5uledo9m8zxeunpqxq6pn9q8tkkpm1hsc5uu7sdmr56ca73hfi1xi22u2614f1alah1uzhklt1jpnrhmwt5eihb4o342rq65tqu9ynq5wx4545q1m4nx6b5ryvauv83i7ex2bwi08vcimiho64ve5md2k3shhets1ulwezzbt6h5nxeaur1o1cth7imhbnhjrsgliarx4hevlu8bpg0ulrgxyurqocmt18cn82umenzeh5lzuirkf7jyljii9kvdcme52ka6kd95poy1ct7tmyf8a8p4pnhyzyrmt8p69fhqmmhcn9a8nnlnmgi07qr6th75bylsh1x3wg6s1yxk6eexvfnw6xdi731oe0mkrtvqhrp4tzodeuhyu1jhsac5g8n47eelmukwytkw4rxc5sgfx7b8zxt404fyc665anvdzrvmsbztwk7sc279wl88ppguhwmnfud04x7jycjhxgqzwmpvhcy8jws2c2pzd9vp1n7gqjtqw1fp39bw17e41d94qf07qptrdpe3xf3o3jvq7qu2e8k5xhqvlfpyg86k97u6zg3tu0r257073xgonl0iia38rnmjfa65wevfgjisubpc7tyhla1hi3gtle2pfcqfqrjrq7jnivx4l67lau1a2ou3xk2uqz42thj3yjwx8j8mepri1f412w9mbov1pk7d6dwg',
                fileSchema: '61jdk1vqco1t6wgvqsox8gq1zld1k92cxb5j4n8max3wxt87p8tnsjjaqat793lbjl4rxk5583igkavxwqrh07esusuq2o5sj3mh86tl73ucwaplt8bwd9bnhrrexyhge2s0qhlrjj8cb8h8c9l1fn2cwbl7nbaugixbsn6u1an47eswlqxhc0ac7b0t7nasmv4ctoe3grivfnereq2i1ze4tybk97myxicn528e5ql2twymi7agx2n0d4k09rtg0g2ovo3ksgyqxsuuayetj0cjk91b98n6kwbqa6gqrusvb5590grk79z72tznkrsrdanan3b1q10qi8zwsd5pmces31uh510ucxvcox10r4vplasks0mmi02p1jds7zkkpcdy2wjxzdc99r1b7pwwvfq12wxgp8buh3tmhld7ub3pckl605xapo7m9vqjfpycgtenhkd47xhmjlg9cq0darz93mjb87kkyggxccbpa6bufdhcypooiq39q0goy9xpgpk63iq1svqyn7r4szhi0pixvt3xb3mc00jtr67lq94xlkzorf3kvimwxzu9oatwul36wqjndivqbw66x4qcg0wrwmu3jkej068msov4yfwcp0ibtmjpz5uh57gfsa64u5el6w8m5fona13tw5zjowxp5pq9qcj02basq6dg6pavve339prdoudhquuucx8lznt9z2l0u2vhdtewugn60za3cyl4baadizsmjnq4u9cvnauto9g4uobcguod15ivr306t2ssezc8kf6rlljsjmtpfwot7q0v8mansgfdxnp1d67ro6j4adnprcwnv5cr1y865ssslj9h2c76m4gbhiephm5oiq8ojz6r6l00g9wh2wy991vgkmb6gu46yi75bbxio8ctuu25lqfky36smhbyfr2rad7vwmqw8h2idwmotro8gobe81nosbeyc4purqv5k1ekhrdc3qrjsib5743ruv0o2rrncb4yatssni5929d3815pbx6m8q7jz530',
                proxyHost: 'io21gxbwf3fu8vwl6n2ejetiq039rpahp5420w7qe9yj90x2v8lo6mjz1czu',
                proxyPort: 1165995004,
                destination: 'chwfpv8miz5rnkwwahxw7x42ewr7nu6dsxguqov5m6xyaa50w6cf0d77c1h4lbeho9uru0qytr6pzb7noni89aye3d0m34e3ztg4qphro8p9ufge0l8qqdkn908e8rtam3vfex7k9bdqh9bc09e3xyhijac0obyz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yf1bv7frwt2ecuxe00h5ugizp2bz8kam9ffqnf2ee4yfi2qg6k4snhlfb4v5vkn6avmfqtoddlr8e0ro4z8jn4i6aex668c9qby067739whnb3d7dn9cqb3h86bpnvc3ed77eaote0o4kd7z6p2oc7zlqu7y4i5p',
                responsibleUserAccountName: 'vxrq8m0l1wmhi6bor177',
                lastChangeUserAccount: 'bkqgibh4mfz7on0as7et',
                lastChangedAt: '2020-11-05 23:56:15',
                riInterfaceName: 'e03pxqcrmoxlyiokdemf7a2mk0mfdfo9ix68eysxycxn6lvqpx40ss4wvq99guk06g17oksl3zkhlzqgfupp33d8wklhi9t6efef18jdegb5fsseu9ft8ctph26wagm4go7vshhm5vbntp1a74b694lkok6kwtsy',
                riInterfaceNamespace: '6zpytqxegwfltq4k2hyr03o9pryvfr31axbcpg63dk2dr0dh2kspsf0oom97w6vni3xyfpe7uaje7sj6tobazpa7qxb6zm64i3ta42nqbhkrx3jfyeguw2j1jqub3ij93nt0fhmgz5q9tuy95vb8w1qb6jy3242n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'm608693rqmvfygtdyetlltoep9ybuo1hio1lw0ju',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'zl1wa24cemvzq75r4nhu7n1hkhni7upf93pgajn6pqimayjjcs',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'e8umqg4fusrwb1vw9qj8',
                party: 'v52luyuoqwnagvdtr5ajjmk0q0uhh3rwk7c3cm1uacuq8mircizkutpldmdp2qexvg6b60um0km51arg5mwjtg5t1w2fe6uzwafkeugpuj4n21nqcln2s14kfkdguzi3oxlxnhg5byry3szgzcfkpzujl30hud36p',
                component: 's9ak60o962cyev9105tef1n1p8gf06evn9r1mdd7hhg2vt8hlqq4ijt3y7wbai3m21sq26b7r5go3edne6xddnra6l2i4vh9pifkkhjfwj6g4bsaxibdvvmqpg7f3vctnvhc5zznm3xclqj0b4d3icaswmo67wft',
                name: '0mgluy7xj79fuxcyjq1uj2rs08zdkjyhnx63ztxna6hl7p52s5yq8f5ts3a6n7a64nyht0wrx2ucu7gtguvkgogmo1ffxiwahdui6f1zpyxodkop0ct7154rukcoy7b8i2sfm0l65ii2et3w7sndy9revhw2isiq',
                flowHash: '59nql36d4e9oatpr48zry7sfqbhmle2ctbamjry5',
                flowParty: 'shkcw9eo0hh812qyxshwdnzhou38vcee3biiwi4gsgc7kabu1f4hhm5nlcw4c4e28aybk8dr2on150d9d79g0nsbca94ar8dat4fakcdoqqj9zk8k1qi8o5c3e6bgxl2b0cxbq0rk5594nmrxbogmg7qhb9njhqj',
                flowReceiverParty: 'zy9fslx9riaat13u6gdhx5e9ii3qblf8ue7s0eb3f807cifocrt0oo4rrguk8nr7lrdy8dbcz7msz2sx8ov36bwxk6hdbak9re35nozx755zro68wt05kb0xrv7krh0fgghrurdlen3t19wh9ul2mz05xs5wwno4',
                flowComponent: 'mdd5acw560n3wbulbpvptelcs3l83eae1hzev9t6cm2jy25alil5kksm4pc7gbixzct5bu0c27p9w6rxrnfjcdkq6ze1rgv9uzs7x5mmmsbopmq5xyq6raqx5aohbbakjk3d9kuc32o1gy8guk0w55j9htzkgqxw',
                flowReceiverComponent: 'x7yxcozornh0wo9e8kwlc4b0tc127pvruseo3vvon99wdxusc2wzpns2pkf4oxg5nyfdl2zh66ih5xs1oi3g0nbk0dohu7ph3gkr7267iyq6e42vqve327mzz2b7dablh3vhyfmv6oes6zcfcumww5onvbl8257a',
                flowInterfaceName: 'kbsn7fo5c78bt2kovfgdbpnpwx7goeoz46qdqs3zw1plp24y21dh8pzdnw9whdgh466yd4yw1bs0sorb7hyuijnit09ptvq1kvh25ekqe9mw3imskgk0rccqx6tg0nd76zx4znr05ak14sr9yiu71i4xuo6qt7mf',
                flowInterfaceNamespace: 'l9ufiurwd05gd2x72xfjvl8hc97tnavv6s4vitdvz2ts5sf0qn5qtzzl4j4wh14cozeay6dc2x04a3mko8l00qlz3071z5jsonprtlxg7rlaoccl3hmnyg2g88at6heh7lrxx7pt9tj8th33nliffzi20j3n9ipm',
                version: 'nx1n2sfzkw3g78feqmzm',
                adapterType: '3ykv9d5eow47vrkpegnt78d5dbbfvceoqn5f4qmoppyoqg47il1jg96hs43k',
                direction: 'SENDER',
                transportProtocol: 'paz8eys7sp6lyek9pr0hnx825xpy67yfn3ss82wscqxatkllohjwietvf3nh',
                messageProtocol: 'sf03e074z9va4ojg170m5aficus7524rom90gnbfywvqr6mbdxk536waqqq3',
                adapterEngineName: 'nls4ybr4ageszc0k2b7jf40gv71f8t90abbc9jdmt3663om2i1xx3cyplqwp3p6ijmozz82zsw0z7ec6s3nubj7lzal5t1bh7chdd43972651fskygx9f0vv1v5b2h3zg48e4w9ffwco2h2ayd1ekv1cuo3hpmbc',
                url: 'i4l58awmtwpvjiv12uz08n9apzkczdrc5tehveik3zedyu9hbq5oexi00h62okfk52yfunzfobvs7vr5vaxwj6w5qrbtpsmob7mmnlgmccj6sdhfvnaytcxkys34fa05zmaanarn04pazn59cxcy0lvgl2v25hc3ov18h663zt7jjvf4jvvksf1i5bffluwh0eqnzaac25h6ysxh7pc9l8swrxwl1lovafxf1mh03r53w5dkdubju0a0yrpwqe6fkgj4ayi87snt225518buubhechu7mrh8g1flzn2d2aklw3e5oy6vcobc0nneejqc',
                username: 'akio319rbadll47d67382egiq24ek3wn747wezyrbnv6hb95eqdgel52d0of',
                remoteHost: '53jnb4esdgdabk3i59ji614hjj8gyoz84whqonl08c2n0n23f6yypq1g3dr8hl8q738x61wsw260x7sn0cunpncjzvmxt4awtwzh3zwqnnra53oc28h0rlkd3fb9tuj4l2itaad7yawktks0j15atu4ds473ljnx',
                remotePort: 6000220109,
                directory: 'bdkaogle4s79eo0x3vymkek2zlbw2gpak8gvf2gqxefy2rc81vq2w1wi71ttnc3rtom1bkvaa4uaomizg4xhp80kgxclmkuww3oonbmgda1b0ihvnfvzj1nz8tohz9dkviju72yykgai9gwvpe6hexck9x76is7huqy7fjd8o47k58zi1bix7tjtcn42ap47hoxirffw2qhwg6dx0u6p0zc8h18a8i8z5e712yxopxlxp2pmgnou1gj265yglek7eazedcgy7ey5ghid9isjsnp2oqxhp39pb2d764pydxh6rhbhw08ijjvw179g4nnk0d6b8mrax7gbbghhynqxj2s5uy59harl45isehvc384uvx3nmfxy54f52kfr51d6kxac08x41bgagyufat70zk1ej10hjuf3c50ysbh1kibd2xwp1l46xfa2i4d9dfbjxk5znrj2fpkgih6jjeqjmfqg5x8cr67ovfm2wntvzc0z6nnsibu4gdmyfq01fwkcco7lzbciq2rp8c4djyz7ke5mkt805l4tb6kmybhte0ksvqg4363584i0cqigrt81ahl8o7r9k16n8jz21c3ggfdp61xgv8p4pliw0i8l1odrbskby8t563la2dr85es337jnjpuavjktqhmnnj5mncvte0biuz334lhywmgx8e1y52opkuz9nhtmp58pvsmr0okdyptcbijxso7mu1eef38lh1df86a5trzvbl5k62km66suiyscm6m9d5gaz66c66i591d3ay1680th750n3epqutb5bt5pgeh284yhgw0h0ysfw8xkeoff5dyuk0iv2pcpx5z8pp6dv21vr1air7esq57alsbhb2vb3l1rsazjp2tvtsvn5jnbtbdt6ij5tohd1nn22u4i5va6pht70hx5yovst2rv0h3zn4f8mare3oyyhcecpr0qp1vjqq6l1ys35726k6trzegfq4ma7y5ivu9xvkxh86pgmz8axo1r6b5oack73z3r9r4jm7eu',
                fileSchema: 'vubo9awc3y8cx1uy1i3kgproknpz399i621fv5hed21x0ph0sam7arhdb9lfcv6i1xyjghi30x1dk22fdy095nkdzo62i5y4qvv5of3380r72xhsk8fz3s1fmmtq4fu3btia092t65p52q54r1s9i43bk0q99it3os500z1g7zu6kc55uv7ghdvsw654h9ror8qhz81tt3nslx7m7uk02p938xwejy0d82n7aywspvfvohkj0yl7hr1y4cacj9yru2n8uslshcmwgjv1s2iqahpeq2dil9upniht0d9oe25cxpeb9w1eq48sucqbkvcyidyjvtd8c7pd4p15rl8bsx638h0wip27i70ziw6uwwnxsthhnhapdy60x3jpgzbp5mo1zft9d4i17hiy0iwh2p9y04exrijm597xb26xtmcariloikq98qwpi6l96qjsneihrxkndbzsdcufixa70b8681jg042rcbn0mwmij877k4rn38g4lk00dddx1vieu7y1kz4shczti7r9xl5y3xow2gw78xdrzi63cykqj7velk7sbwyulo0uxfo90z7muntn6uzzxjywxnlkr3fsx5xp6c0p44r5o8n32v26jis4icf4skxpob4x3wz5wy5wgohyf0jvlt75255ahxh7uv6wpfap33wx52yjx66kc2yr8ususz7mufwm4xzxdompu3y2x4po9p44xyq5tskq37kyy2hzr0bq3rsphjpgc0smniec0chzoep20t3tv8ec4dg25rkeg70mcvq2ppb2ojx845s472ftg3ajijxzz6pd64v6igsparv51zx8hqnhqqc79rqvdi5lf8etsamg8mhn3px18kv3wxvarygc7i06ak3e0neaofa5awzdi8l3dhpwwe0su01w3z4ygdylg7lvjm2x2ykwrmc2mx4s6mpusafuf7se4gwe1zmv0z4fmrmfvxjpdbfujp0xyheail595jy2n3rhks5nu29pnrkn4c6042lgrxfn2ncsmsuv',
                proxyHost: 'ae0dxmeuhfqfs4k4jdlj5oliz28mwrtblym69f92jgdqeihjr6ditx6udw6j',
                proxyPort: 4979836610,
                destination: 'p3dd9lfdtdr7917vxxb8nzbhcblbnqm0ztyx0g2w2p2qn0ac4occnjf21ms1pqtih3zxg35qkk8rr1teodojk6d3renh2vwcci3tf7oyx600b3vnf9sdkfxqjxahfrf21n80g61tghe8cmrlgjwmu5cjqzqr70ve',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uttv3lftvmeiuny7i70r3bmm8o9za41gv8pszmvk3gi8jesobtaxiwn5evk6mbnc4lb86dre1fqtyotef02jf0vhw45bn5sz14yd1o5qnygg6xq0e6qv5ovue9dob2i7k4gy1wokxviueotm61lxy5yrbzmj8tnv',
                responsibleUserAccountName: 'mippicdofqtphr5ngkti',
                lastChangeUserAccount: '90odggj63fcx3qihe9nz',
                lastChangedAt: '2020-11-06 08:27:17',
                riInterfaceName: 'yavs40sxi6vg19fetyv7g2tpnxz6i9xx9mgh6ln33ls4ruph638gn33ysiz1srozxqxr8fclzz1hgu0teku39hsu0offcfiimcjeemjlwju0c0hblln4tzzjnfofkm826ea0ix1v5zb2bnn1fdmwxkoy65i3fs0e',
                riInterfaceNamespace: '4ewprt1ljvoea8l4wbnjsxifd0d2b1ainvryq235ibf7fw36i2nf0gby381j8auh0iuu9cptahle58lomrk2ynjyhha1fidbd7hjrnmlylemj9eo5pzunwkmu2j2gaqtggs7gcudfk4nf62mbvtf1kd227vgz5wd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '2fx8zgplxkhtd6o9v6lfycuzqf0lbyoq6ejhqx1s',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'wjk03vtn3kap0ofiqrm84m9dckeb2k11x8jd1xmmpm0sw4gptn',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '9g3yo977i4rvy4n6w352',
                party: 'g0kvyr32vf9f9obzcwe3eqhwvxynh1el8nwgp2c0zjba2e2yf0dgmvkheh9tqp6onz6p2ausigtv0qmp8yl86kykb3qitcjl9nkbtrj6dn4fz1w9uitoeo44rp4ee7lad4vhbnzsvb61bjjg53kbtjz84062keh4',
                component: 's05n8igp9ydtzge2q3hw8dv9voq14umcjlgpvfcvn9l1dakvuc5s8oastpjoo7jfbbhx33ar8ntind552jlymbq6e2fhl22i9udsst8bdumnlehloq6ocjlxsax5z3o3gaszzcv0xn4mbdd165nbc57v75h0gkjl5',
                name: 'km04dkn9p7d5hfd8hs6rd0j4ukqjddiqjz8t97gbdq0mqdfyuo62t5admvm0rtq2s2nwgfjhjuxzfftzuthen2s0icfefdyo29bn81jo32k3z1ed95078sgg8odn75f0swzzmoxhl0eomj2hkcwgbbe1jqlzo4ug',
                flowHash: 'hektpjfkzt8fnhiur4k45lq4zp8yhawpiq38za07',
                flowParty: '9wdagez54sqv6dp3ezx72qp9oocgfeihwipof0jxmwyv1pxk2c255mxwrmc1frccqy5r8ddlx0ox5it85eb6u380xyrwsxggii5ahnrmccknt69focje0yb3gydl7gu0mmfxvcgkzxla4hcgnkejetczj77ju8al',
                flowReceiverParty: 'tvf9f2i3kihj4h4v2ah56przp09q2x26b2qx49l4mxneuu5epbgpx70zcxb4bkez2i1lq5t7mksxh4imk609wh6yzcuifkmj7yypmh561in1po78gdlc0mibi1616njytr8vz6dxhwrzxyqr5a778p2hgojqe1i6',
                flowComponent: '0t0y7l944oez5epqpibmfsphchy9amtdgimvnhj9hrat23z7yk353aroem20k9c37ambece5v1vr1oyhie8xd43jrj2fvuo11fjc3jxm5sfom3jxi1r8qjs7kvz0tznl70luej9r75tmlntl685ul6n4e916u659',
                flowReceiverComponent: 'ejecoop9pt5h24oypoh67jeq9ksv65ry36chlnkes1lz7v5ep0byw6yfebbiylml6wz3xt8eef7avccqspkmx1f3d0b87knnct26hi3ez0asp3hkr1707qzknt6135xhwpcs45rpkeibatxoec0lxu3ffg3jq82n',
                flowInterfaceName: 'qv5jxb3h68rw4g6f8hqdhmcpzueax651sx2d2p3khs23j7l8ercsj8ihkvwmtuqhndayzs6ugwravl1a6i24qyfsa111vryw5bsnso4e8ktrevhx16qbjc7u48bwrgog1t3jod7uygz0c3st0uo2trexo84eg3sm',
                flowInterfaceNamespace: '1rwjdwvo54c6zrsqf4zejtovrkyx49nmon1rf4bt3o5bh8eojb5eh0eckrgskpq4ubb5fv6jicnp9r63dldf2zdbwkmsq5ldhib3sffnzk4l0vgoq9q4dhb8o3v40j1dscspu050dfpqs1rrbssrr5dyvvsgohis',
                version: 'wbfekv6vpc5qqam5anqv',
                adapterType: 'okoomb7zyg3593f5x34maco4cqeyxae5pfrgdhzpj0isdup66fl1n91kuayc',
                direction: 'RECEIVER',
                transportProtocol: 'amtpzi8pllvt6ypyrx2er0qu2sc6whdjl9u64r6dbasvpadfafdtu9f9f6jz',
                messageProtocol: '2rjrimhp9x8crkcnv21vw0k2ost5q820bf7wsdk6sq56oaf4xah6qpkchzp9',
                adapterEngineName: 'vm7bf5gxacujjow53ofiumxjb311j6sbhbaefkiv7yl6h3f8xo4fqhtkkukn5l7lrjmja2gzcrn5wfuld4q0xwv32m0ulyn4412adekg1uu7va5h2k8t7bfzbvlxhp1n1rimwuh97o9q7rsz9lsqdx12wpzh1j3i',
                url: 'fxrn29d7z0bud5v8lbqn2lig7mf811h6zk512jiyzhrwni7wqcbsqq3svb5say4gboqbukkobcumv8epvhiypcl3jlw0i3ibyf1xkaaro0tdikinxasa7wr3bigjcm3auujasptq63erdentewkojva141at1ipj50dr7avrphzjtd96xoe9xsghq9gl0nom23cur7p8l5khptte164r1ujy98b29okp49y9ere237pab5dbwi4brfwzxmszeyzxcv496dcab2douezwze4eabc00s507rdrt112crl633kp4h12fo6aqmsgjh0qlu1t',
                username: 'di044d8kyl94uouz78q6z7784e6xi2lp04v5pnu8w5fv460p0w6u7lnbiop7',
                remoteHost: 'k4rzlw5i1ivloyu8zz1yezzz06m6ovvr3bv9dj8xrpyhyro2ncxaqrd9z7xvt70lvsksbcvu2lmz0cahh0ntda1g5vha6cm76s8ytmmli5hmzvtmg5s002lyl4qtkq2tg1tlkmf6qz353gq00p33rts88uvl7v0h',
                remotePort: 2081875427,
                directory: 'g4r6exljodk9s4gn3r8ehwqgg76zbsgitlg9lmntsepf2o93f6c1aj5mrbsxlruxzbmnuuzktb9bvqy6mlxtilhlq3pxhusgsh103edwwovvuh2ysyqs66ehqs10xkfot16j09q4s7rq8ic2dpn0kdfinxiyriy2i174tp4g2w92xardrgp6bdsanxq2h5z1fmshlvu7bmlxm1qj24ps10bqs076zckw7ojb9e6rpx5wn7hous353zdd3v6jheoi3bv7eub67l9a7qt5v5o9qdfd3qfw6rnqq9fq3z2w8ed05uvch2w73r7skemo48isdjsj3plmrwdemvpummriyl6eb26ancpz8mpfyb9zqkajmue1ihkxp53ds0v5lpqck7fwolmkn8nh0lq98cj9e9utraygr6xsrlxb7c78a2vkglgsecfj1sbidx8mlhjpqf2kcy1qu8frgd5emrls1hrska3x4vrvxyg3wamht9hpdjcv4jukg39gcuyi5czqog2pvgmpiwt25uy6q78vq5rfbp1qsif4rao82r8z7fu3d60m3kby6ajp0e3afk0nryikvz0w8lxkjd5nrk6x0yvznl8oyef661i05j6m6nvc5v00x7j8dg6075h2shv82au9fziyxx1uunhp3lujo1p6trzdhw4a5ygfajkoxbw7tsbu687ep4oa5skrlb9zrqpccocjtwedzakpafdhq1w8g3dc6o8dghmc23tvd0ygpoa837y3ikpaqpw8qmosm82xqjfbfvcdgrdtuy2hpyjxambxo4yveg6cdn16z0rkzfalbhefdfw6p3n6g66fuimoivm8tvwz1chlztdpk7ij4k0m1ym970juow3wp24zc30grtsgj6ydwg7r0jt2yj7ligfe46mtml33cue5xn0ovkvxax7ytgt5x1t8evd25oo4maprn26fluz6ji7u1wdy06x2eumji23loafne3modqjemrshh60jv21wh55172ufog85oku7tfamwawe',
                fileSchema: '21nl2qr9nh5xxvqc4qrhn51pw9e5yss99ip72gw8pky0ss5t1awjmwr56l1x2csf2hympyjc8tszkj9mru7wt7h8f1kplxbi2wrmwxqif7shz4f607x7szio6x2xj1157d0bhrb9tgh3r6xnc4n94dt48jepq6vg09d887qjpraqkbruic7r6vvqntmg43veizymrog62x5q20gzmdaudl7rap5o547f4ssdln9sgie2jrqimstbtm2t806ow7jl92vh9hvr2oh703altxst3ritjj8sqd3erpeczwxzn0t2u1ptzyl9knlty9e3hf0jemty5c8b7k039vp5qhwoajf7038oey49bgsiczjcutom31bcxfh3mbl2h2wmeoiij0vtioeydtrz32l4ygw4td119qe6p4x9votl1465xzxli8sf9n4256rf86u91r3h8hpe4zhg4tjktak7nyzz40xzts9jyeba315xueak7sscnpmk8xbg7mkq24y6bl9v13anm4mgw08fprrjrrmliwbt469pbtku2tog5i6xu99xi41m3qmjstheidsyrwfxr7otkzn5kn4qjnr56ugz8lr0vfx0j01dxsbo7pxns8wfufcniocczbqfs5azfe2f901xtplp3v2h6hlu7vlsl7djzo45h0cke49wqa9mecm2nxgd4ufozpggvput5yltdb5uig2bbzk3f110lm79i5t1n0m767z2nlsgj4ht04vhvj42rxs4uove9onrm5uurrknafk8qq3g01j91xvxmg0ywizvdec9vq30vpux2r67hc815qtej7h0kviybizbegmqnge90rsecui31r7ivnhzpyjn8uw4q6pd42hkzxyw71tp9hl43zkr9vooh4ujyq1jou26hkeulwg22teyy5l9qo7dgds53fjaxmgxzujamou6eu1twkunv30ptmjoxumrefbsfvt4pas5tvgqekb0mxpj8juqn0dfarx67sxhydzez1hn95v97iu53o6b',
                proxyHost: 'ndutm28tfyr4baim20d5nl7q12t9gmvegmt6ns61tbs6eua7mkvvdwdi2gin',
                proxyPort: 4865803637,
                destination: 'twox8q7iio080g1kf8egbry259qzaa8229u0cy1rv149jibyv8z88vfqwq37756q42bm6yemt098vze06osguo1g2aiqsjc75xfec4dccntvj7lbilfl9a4mjzbnk6hymxg98b4e2yz32kqmafz1k51ct0jg714w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7c4v73hsxzztxtywryzj6ejhsms5txziaaefrshdpzg33neaqmm2m7eq1r5mdvvrmy5n6kgrxr9j9mpxc2pmlukdtrp8qa22pmw0c1ltskzeovdynfu3x2j1079ow6t57u3cfyx0790so0lz2nivn1tzwj5p1ynx',
                responsibleUserAccountName: 'trexmima4kcmuacs6k0r',
                lastChangeUserAccount: '47frzc20ojuuan7gicv3',
                lastChangedAt: '2020-11-06 09:11:51',
                riInterfaceName: 'b6t7u9pvuzmnoytkeym1v5bmyb10msukrnppp9kb8kn1gxu39sis55otmgp5935o0wlulcqs5jg0zz8i9g61ehxk0a5kp3amsycxrdyvgqvxjx9sg931ehnxg2aljpkx5qbmx9lu14lcp883cabos72qk21qiqyt',
                riInterfaceNamespace: '2admp5d1chksmi1sidal78x8cndlsko16ebs5ot6wco82enp000yfaysizl3m5jls09c18ksesrox46m8olqypzc6jp0m6l93j7wj4gfw03iwqdfx8zq6k3o8idf274y0mgtz0tiucld3u5qv4fbtr70jlmukji6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '1pfunbjk6tq4ufn37wyhtjztavdn2kjkftabm2db',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'k9yne8zs2wofyncduoszbxxjakshhahuabzbtern517z9ab897',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '2qo700gudwg39huhgmix',
                party: 'r61505mznt5lusnuplps0yxl2qhsnzelsgha3foiaunppwda5j1hqc75hso61qzxcssqgs1g7mb3gru7r9j2jy297tlqxgj8av685yjbuj27wy9qe59ubwx1uob5q3neopf5g4zwmr8dldgboaa5nmux9vezs87i',
                component: 'du5wxssxwpkfm1vgnnekfx6t1qks4ke0zzjry8fyykqc8md824omindjstnc073jymmijwc0dgeh3fwoefzpn2osfq9pou8djgt9th8zjw781qkcsfxvcup8o63bwho737b7qrtoth8u4mhrbxoca92p6bal24n4',
                name: '9ch8o0g1a3wvlb0ubduqz5c1yobai0wcqcqpzwvppozapj3n1mbq8hl072akks52nudj216vpw8ra69zyh76zaezfchu5yykvkljyi9v1fxn3r2zff83kr8vjz4pdwumhqqm0z7r7bv4g98nxe60yx9o178cqfk0s',
                flowHash: '7wahbumljz60lgkuj9r8pdxaf5h3b1ahld9n1lxu',
                flowParty: '54jtl3uztyrdyhz7asfa0upu9xkthrbckfz5m35dkcizihhn6rb76znn4dedkhlgh5kdts36kn1nwukrfcpn9600qsw2fc20hj87oym5h19bc7ib586eeoahf2bjord2cii782nybvibxleimmrpqlkho6onsy31',
                flowReceiverParty: 'mv876l8rqi3a9f6is5v55udcg5fjt7eykddiw9b4d5qs78qst6bvuh2wvtvpuiujx7ogy0gt733uv2e46k413lszy7pndts9ekchtmsailoci3xwcqde62oqixfi6h8z60okj1kgdsn606l81k79igwhafjl8bri',
                flowComponent: 'qtvqk09mhys3fuage1714u063weyyrg38xi7uw1460u22d8s931vwbwrkw6uxc9hoxl4uevjuhv36akukuj0l8h7x9ian98tllrpbe6x5d9jvv1gruzbzjijc997aaoqn5quhq7yl7gizl1b0dtxhjxwpoplnvd2',
                flowReceiverComponent: 'ryvt1j5rc3znhtsng9k5az8ok8rpoy7cjdg1ol00tmefkmeyar11apttv3994h223abtwaqy6nb1qofxmrh3olzvpqmr8so047vv39z2a6x9yorv996ufm0yp0e3z4ct3fohzycxrsy8akhdp0g86c0l3ar97jhh',
                flowInterfaceName: 'lizis8e0yug2kk9ts7ionr3up8pm32gbk2pw4s2ovbucm6gd7sceff7ksurszf7qruemh5mkjcd7ozkuhlfy6ey2ghrerfbiak5e6cpkcfxb6dz06vbpjri1q0iwnsfjbh0x1htcxg6pe0plvula0g2ycuf4z7rh',
                flowInterfaceNamespace: 'em5r3l652r18xf11ta82jhvkaamttrm39b8s5wvjvh79sos755zdu6iguzfb6vpmnfm8vs96qlsec3dmajmrwctzedf0ugng9jdc3pq4al8vojuzzqr83rsutfdt7gxgxba9fj4h065r25ornh38p84l9y6v0r5l',
                version: 'l00jnu7393r0quskw6fs',
                adapterType: '34khkv7m62p54t0sasdj5cqkrd6ixe77qzs5vp0kt1ggw1j476gigyhf0uy1',
                direction: 'RECEIVER',
                transportProtocol: 'irws3759g98hbnlo3mxuf3csri2k4jq8qvox9pvs9lerd1rbpebw4efumgli',
                messageProtocol: 'h63aoqlohy4mubrtxbomj2h8ysyxeomden0mwjjt3wcn9f73zqr0fzd287ld',
                adapterEngineName: '9jiggvkxo43ximqb3tqu2o9go7r4tzrl8lf5hphu18bdcqx5g9grt280wvo2psom77t2zcpsyxj5x5nzy12hscv0he1ndgm0m6k1p3h34cuzaory1isy6hiourhrbl3lbu7djah6px3gs2movdg5nu6jmrwkx28f',
                url: 'otw3x6ne398foutxrfzz7u8b05opqjh1jy4cb29911ry42hb0kf0hatj6c220avrahs7ltx5fco71hc3pn6q117b7j78pv2l3scnyzavwh1eo8mbp9r2itdlmi34crsew4t5oxoy63ayngvpxgyw1vj878elfw6futdbrocm79hl61pl6kku1rgok9ui4vww7ei7l6ygjyhtw63vtpj6irzlpcgx7ny9r5w0xuidynhy3zacroshw6kkfl4f26joltoj68g0ag5z2if4lstq79rouo9m8sxyk149m4c6n2qi197rkz27h3clm4nxk3qq',
                username: 'htwtn9dpdmadg3vqrujvrbj1q0almuppac6rdz5ee71044uwr0tfiml36xwv',
                remoteHost: 'pbgd2e1xj68opapchwt4bgwe0irl0zlkzz888hhh9ldfnmif5ildg6oawpta2yfjc9tg5m8ghadx13zejhktwo5njao4q44m7bw53vshh46so6dm85t8ettfr4snw7p3zi383u5oas0qngbtjqqdq1c0zukisw8x',
                remotePort: 5532233380,
                directory: 'wbtfkwuytoohprmn4fn2mo1tru2hfr8xb41cbh86bznzbtjp5nma2p01zv6vfam2ueoxguvx4zgv1nlsw7fsaq0ewpavlwl5mpghn9sfr874za6dkzo0v812zm0f6twsticod0n335l26066w5nitwnmp63nheninkttw481mps0470zqlw4ngrtpecy93ro5pfus9xohkl7rxppf9va3m8x3esqaf2ulzdi062p4ac546qxcpcm21wdmzse6ttv82a0qhae9di8ao0xuhb1b2jv6c90rm9l1cey2noh3pjntqfjxrlcvbbx8wy1rx8lb3ymfwdpjgivb37ytjxdj59sa0g2euz63l7ssil8dyxj4004dm1p5yin2mu8g1ystwq3a7rm3s7jj9z0ojai7oi6npn8c2subyvchv28hq5qmhmms2v4d4rr7ap6hskw341v6hzsrph71yuj9uh0oefgilhq1ciqona9nf8nhpss9ifjqkrjofrelanbxksgesd29r29r98ex90ducar9epuhl7gk2y5lg5jaatnomkz1vv1z0rsnw1bpl4qvezbs6t4j10snkq6tf3ym93pcncajytwvo472fa75teznwcuy6jbbliltphheo12i2en2zsx96pzm9ssv00bpjrhmiyhzb8qmr12xtfsyv6r7idfeejxnfodmk1jz7f8k0ar3brex62ttlhaoyoptmq20z79s11vwd03l58mlya8m8n1fu5s6vxee0wkinuubt90lsld5v4ghv4zkzh59hh36bc4x4n1di2nxvehju4ai1ln54asu1b8ojyge2124drwm7bdih3dx8r15o8vw0qsczcqsv62c14voe40eyi67c97rsqnkuirvqao7tkmuk940tl8br74ccbhhwsysi86bmv0n5jc5o4bm4fwmly3bchamz4kpr6d08b6zwwk08q3e9skx012jpkkyt1mw4bisw20yuf8s9ynsu1c1kzpaheg6jw1mfml5qwniwsj7bo6',
                fileSchema: '2b0vssmfgni4aa1xpbc711kjixf7an7l6diycr8ymy09xfh5h00ko8aoowl0ksfb1awr2k6cni8i2nhvmy1qp7upzf75h9mlzx0hw83uf7vmyhn960axd1mzayzq3ppfkof539bzobwn33r6mplpr2t5248wqn9i3py0uryc4ws5e8gnzb8ci9jlrp0lmj6h2yjab6uk6x04cfnh1wz45gxm9nuhc0s6w2rtmlkhd8yh9q46xys4t6g66nucvrmzxsy1a46gi01qi4fs1w2xu6a0vc8hgr8mparrxecyzgpq2khu8ghckdtecfc8bt57gdrjhdjd8govk2xmmg0a1bko02w5dxi4dpy07r9g0hggda3rth2ko72g106igeuxpv3wemmm6knzujpbi0qmd2j6z4bcqx51qz9ujh4ls7of2n82vgs9qzn96sw08df7ukbllrjj060fzorme99gxpx1u2g5rzdyag8l0clkl2fzorlxignw3dsedit8704029dsd6i9ytl8jl7yf8wbs8oue8mate4ldteatga312ldghp5bey7q7x1jcl9x5yrnr341ijrrq0y4nyfs433ptpfzbivmwug35p11pghyonvyucmwjn5fuqg522veb6oor3jbmncdijbs88o4ok99jlxx9l28oa3fd5a56v0jb5nxdhjc3908895ql2h1h164ss41ppm3g4yhfb5ry7frw6ioxdzt8zy4ms0bm8btt98x76d3jsczcjlwzqe63ta9egg38ifpam5ipim6hxdchupgujno1tid73hs4diksdwqe0325kusof2ktw2i9y2iilr5ojxbn5g33gfsxxqo50gkdu7wl24nolxm1o5k38dtxh47frnmpwedv867z8lcav2zr38v2sxeqlsjulqyococ7ecs4ycmer6q7poztmmer56g4r09s1ftxh5r7zsxnwsboi7h4mn5kbjq0c730nt74m6yv12vl51b0rd4yaoqie2i2t0lhkv9v3ecxik',
                proxyHost: 'jofhth13c2wea0vh1hrye7ixknkl78nbkq2k93mdbrltzyjimzcn826ry8jq',
                proxyPort: 1988313272,
                destination: '68o61p5rgvj7k0uy43lwdt2x7je3yox5ik08hlmmef1wmqmz11bif4469p7dhwiuf9v9u6frffw6ae1s3dxrwsg2swwe4386gmvizbbcchr3ropd7h6cjhwhcohu08keusrl76gzit1szc5mt7c7yf4mwgg8i2op',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xpyybwrktyptzhlq3732wmack9tcofrr3fvnqfd6duqct6cnrb9ljxhf0hto0zvnyfvlgfasogxos2jwneha2jgarx81f2zktvrbyok4kixaft2ilhnnyuiqoxzancrwwpcp71sourvdcjvvos1x9xq4qzhqyvkd',
                responsibleUserAccountName: 'ipu5fjuf4f8sw24o5xpq',
                lastChangeUserAccount: '2rjwxhfj7femyl92msgm',
                lastChangedAt: '2020-11-05 17:16:01',
                riInterfaceName: '5p7v1mujjbnq2durggi8t9c5pfjdksy0atam1ml68f4emkdnr7u2wlsktlw68ed0wolsma10whgfm1f2dzin8qrj7cwnmsoewmb85e2ce6rf8u6bmpa7l7d68qdr4vop61i7hgs8i71wa3syk4x44d8wmd4hpmc3',
                riInterfaceNamespace: 'pvvnpsxtgupd2b8pfmg8jsav2c43x8241ruuoj09wd7v3umyigwcm2oyku6916dgotewivfxc1mssza4q3gv47s34zld9g9miqtv1onb7h8gp69yt2s1e332lejy0cesvs1rx0hm4uhaw2targk2pdz2xlaldp6x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'wo0iu99bvilg6hmwrp0vm20uqz8mqtm4atutrauz',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'gwua1foge3y2pq6p8lbhmt3qdmfiegpdw4cip1n94mikqzvjqq',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'gmo1nglf1a8j5d7ewibw',
                party: 'ha2ou4tkvgmyrt5o2cj703qa9v6uysx3keur6jpxdocv1iidk0ak9uklfmjkfen38t7wswq21x0467o3jlbz89bc33doczbm1odawi2pyvk79n10ll8p3tija4ry1xs3rsyr2x8w3dq4cpd15abn181q7euhb7bf',
                component: '5ws0wi9daqs5a11wnspqwapyzimrv4ff57ifrmsoqdvxsr9dbu63z4d39naenf24msiobq8l04k8e0co0da5u12e0qns3pts2dpuah2upjlpkqglow7q0gje9u00ymk6wj0xs60lsq2pa1y3ol2ls9jxj78czkza',
                name: 'al0x2mjov69q11fich0zvvqnsqfj7rl4v6pkaw45fboz7rm6fnsol43m06kxruaw505gk82iv9k03saq6lg99vb9o9l8cinehglr0nkhz3slk2mq656vup874jkhfalz42eicacnc2bhnstiwgedzdhxfxj5o567',
                flowHash: 'xgrs3n77b5dpvnlr5wmf6ugp6z7s8a7bmaiug4ei',
                flowParty: 'fxxu97950v41bgalhhzr6adzxxzpz1rgkcue8u1xb4o1a83g8wwupb7a0g1tb417zcktvivlh8l080gb7gzp8ytd60hibtftw2gcito57fh3detqyalm4z9dycvjut4ept0tfwxfpoucag6ar5xphbwrgt42afgh3',
                flowReceiverParty: '4l1dmli3d59tg95ejrlhhibjq6wqd8mqdn5welzysrcs936lra3ap613fz1msxx0x1ald302707ju8ek0p3vt2j9yravhswkjl1plh2fk5dpw3pclhr19xx1y1dp4es9mnkpwybv6gke6gv8chzbxqhwyrx0dwcq',
                flowComponent: 'y1vu9sjjjnnkh6oxc1yl9bmivnc01jo00ug6wbx2a5r17u23bhaan85d9rjxuqrv27n8mzmjtb6v04taf7y0n080m4x6iiexgrhm6fbuhecs777g3ybdn1pzasba6dyhdmckzj4s7lyvsldrt0y4xgy21d6hfh6w',
                flowReceiverComponent: '66asisktiik42kq49c2ywni0gm36mlnibf0i1mej36d6s5j2z3ml9r4penf8qjhmmfsb010ofjj63es747k5j54un678t9yg798daiescdsy10qblm8ax9ynzhfvb2dnriudj3v6wtr8536b87gt77udwgigog6s',
                flowInterfaceName: 'inuog7y1kl1qwuatwgcebot7p19nm3db04zrkrr53nt6oyp500dje5eovr3ldobyeir54h2jux1a5a7989h9niohnlxxiwppz8t5787x2joope4fttwjtkgjrqht7y8jfzl9jaxndde5am13cshzgi358tzmcnfo',
                flowInterfaceNamespace: 'rlend9v20hkn2ti95tqxl1n0qkci4ey8yjikcpex718fxz6rhzdm4z53p1xpkcywiiikt98q6ngpr8i8o9brahfy99s4ze716jdtr0r5ljwaihzp4ato7s6fj1oei91e0jzd3hg6fl7zuxb3a0kbn04iv9knoqlv',
                version: 'i5wpzyl9he1ln7hc2tvh',
                adapterType: 'u07ael6nda9k1d2qfsu1he6gu588dpgfcgqbj3flfep5t6dnfrhshzc0wt4s',
                direction: 'SENDER',
                transportProtocol: 'rrx9bqawgtnnwtbx7dyv8gsi3g42d6y7an7qepq13rtlhjr1vv1g8wty5bdi',
                messageProtocol: 'zcx04dkbvk7gbt7xaos5g30m7emohq9i0h4aaqlxn7evoy7zsp1gg1xwi55b',
                adapterEngineName: 'gzjga26d0ajllqmetkbspq1do6ojk1dqv0429kypro2iegunyu9e5iit0m7v9ydsmdffeaoejo0ksneak7dia2bbzrg2j3ko3vljzka98g2shz837fwdo42vz38it3dmsi7t6fkisiawk689j0toctopjjkc9eei',
                url: 'w2zxhqhopdbd12frlvnw7okao93mdf87yevd57n3xr93vj26kmxx5t2n85f0skzvdr9louzp0xc01atzidsgznah8fpsprkifl6eih16u73snavihnlzbflrsdenfbgk4iq4sb9ag50wkcpa58ahzxstc64m41j5he6kvwp530zbvitnxicegaz7sii0fkvqinq2r1sdxfve1lijornfnf3af14fwemio1tril3nts4wy3j2n2dqd946hlm442uvdhxrnph50si5fzb6jclenn1byr2hmzqm9i1b1knw3t0skipigxv46p6ed4gpnrym',
                username: 'nbbywd3dzf5sosi0w1dbh5toe6ovpu39lk711apv32tljj68lax76fipf667',
                remoteHost: 'jms5gjqcdef94g8u0tincgkiwuxuo7vq2zfx3e08kog3xh30wq2f2ogxei8e8z77m996c8f6dw3af1u3nw5pa7y8o59z1bqf8wtbw02y6mhiwb841lde7d7aazdzb7fzvjur1mlk5smmghsyxqj4ikmyk0sbz047',
                remotePort: 6142449386,
                directory: '4yaw1txe6iilptwwnir4z56dk974jz3tyb5hmhzxf91b5lg5rtouylkf4c490oboxcjoxklus3o3tfho4uy7s0hive4v53wlyewk88a0rc1sqsoqqnc1fvczn2o7ggw1j52zol8p0pxsyw5pckbb4oem9humspph6mhykmh2o7xj1umnfxg5333qhgtkats6h9eht8niyk4y2qqb1bbgnetffjzfczv9mzfyj6x5jcn8xroy8nda22x7l4cehohi4mijsa1z0xyxateb1f96jo0f4i2x6yyd94y4c7mk6onnmccugagouuggiqb59zyq1igcot879hts5k6q7jdc2ggy3wjq0oq3dbznv4hv454ww0ldk9pu6nj2buof3utrjqfjnxcyiwfwzlaaw0hmkiqlp4s92q7g7hzp23dc3cra24pk3iyit89g9rhf70h29k6wkhiubg1umz6f2hl0jjg5vhe7n3z8sj3rymccovvljagulawil123logmjjtyezpzlhxvcuomxaiefwfquw9kx04lcm0i9vasdupwl1vbespvix7rgzuy7lg5eoyhcfhi2zrsubfqe6tkgqaecatpzvj2vko02o53yjwzt9e0hphy37joof0ik8thj161m6rmyrycmgj3lh84dg25ijhqpxt4ihkqgk6zcg79146vcghfjdkqu07agj4kcwgqn71vguyxq1o9u73x3fuuw9rrr2m9gkxu81mlllksuainrloianpchej77sjnzr3qnkn0834zdsxdjx9lhy061l8cxom75ux5r7680pcaaenk7hiolksgia2tdhnhqu260x9y8b8ergbthqb05lfysomup5hd83pd480jcmrn234bmn2lqmeahdsaxhctbh98a8mx20lx6nrrrovx9b0dtl50o1fs4svxm31d9rdqfoy2ohsek1do5wov8bhl30i7myt5rt4r4j11klvpfhbwk6tjbc1e2ie1ilbnbyjksr35vaer9gsjlgkiedjn8vqb',
                fileSchema: 'i3u0hvvgk2wz113eqclumeevo5zn62wshimk0ssduzye55ozxuycbkljay0al0hfrv4qt0hympg4rc05mv7quke2du5a5ip99a1hqouf8ote3phxli3fipvf24pou718rx93ftlt4yy4dkxm38pzcbgaqr0zs5ycj5qjfnfsnikq7qrpe6gz7qrfltkfu38eqbihqqn6vhgb1ywlv14vheof9yf91i7xykom2klrg02vff0boaylqy6delsduhskns0i6ia4l2bdkj9ib34zijvp6f84baezq4bod8l8z1qxqqtw4hxgrqg25t28iaov1pddbzvylqixjbrh6gbf0a197y659hbxvesug2vf2l2jxaf1xxowvqg3xylcufvj2cqfpe3o2zrb3gxuxuuznf91x45xw37js3d4w175q8vzt2w75mdviz6y0qninxa5wy9pkl6ian0liy48m7hvobvw2ir0xbyw6h35fovdvpjz314s72p8dstv9hun2v2w79ti986eeuly82y2oulih0vypfh7kb6gun6xdmmowq51abo2m4lmwlnx2b37obtaz84sthw17jz6wc10ywoo1cncfslt1ogx27sbracnsywevjgmzyok01iboecpuy8qxttc7l9i2dpu95gamttzoro43flyi4y64amstm2f34rlv0crxm0zfp8n9jzw39d3zrlsx52mkudkwbrptpsdr5um3dz3scbmpmipjny808k432ddun35tgltfu7inikixfkcwzc6wj3ube5oy6oq8t0eb6lx7dcj97gwvnxyybsqfgx0sm2oftl5q9ou1vomic34uvmsceawwu5oegfxokjnwvk71fmzkq8uykd5fkgliltzxock6utdsah857gbwpkqsaub5hibczggas1ol8hpsf8tccnublnqhwgo6axcqymvtpnd0cfzggy5068sdkax61cnpsgyo5cidrtz35s6yk35f41wdv77ledq66oniyzvhty4n3oswizoab3x',
                proxyHost: 'w3hm4bml1wkubths0mn9h0dpdfrv1zkqg5pjxpg7gix12sg7yz0d7hfusl5m',
                proxyPort: 8855891577,
                destination: '5aur182jpx86cnwzk5jw40kb17z9sbdgt4bqwxyf2wjmx0m9dax7luuh9zhbj5o22nyvgoq9pbp2r80z1ib6ek2wr6t8r79ogr4uc9i11i6ewl7g6oxs85emd4lwrghqcsknvtl4x8w37m0az15yx6z65pe99aku',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ucrdbi9etezxw18y7exd678ug9lpckcn9qvyf2iakgwqzqbhnupojdnykzcgl5wfthon1gef6fkayvxtz5tij0dly2gf5kx3yexrc9ravv2ytceh273rp76mhyyvd44aehfxtfr57ca8z2f40ac1dsewxm91qas0',
                responsibleUserAccountName: '9rf2h4b0rcw3ln0qwj4p',
                lastChangeUserAccount: '92r4tn47nf1qcjri33lx',
                lastChangedAt: '2020-11-06 08:59:36',
                riInterfaceName: '3ffof9946swte7bnsxaler013sh9upcu3a3pahenz2ga8acr3imvkz422watf885008abvx0nmavmumkepwmgd1by5pklp863iwyu99qr2mlro3rxwpnf5rc238e2ut8txa518uue13g1je5liod6m7lbrusn35r',
                riInterfaceNamespace: 't7q5fqdlf9l95jaerc4ofz31006l73nr6x3jrjnd5l2d77gbmcu7mmp77l12wslwqgwp3ebsrfxayzfa3nhlulokgez88yrm5u40avv0yw4e4evk1506v0j4g1db2zthqc9v6jddzo80byks00w7rlj68rx9wqpk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'wqkmek650w0wz994hn80c781ns9ue2sbjs04t2yx',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '1jx40ir3pgzlsm19aie259y1qa7bgcxyl56e96fih6s21znp07',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'uq93ig6lekp9t0tq9bn3',
                party: '0p83eialqb48ufyckf6jcspnh6nx4hc3rko7op3uzix09hzflehfk9bbqe9paptblpbf30c8ea1lt0aaokmoxoor8qu9wnaxb8gpgebbz6xyqlzcfnfrqj9s47ij1sg2dtc2v6r58y4qbm7t4f8vvqnldnez3n8y',
                component: 'a1vhrx5mrrwknncvo1vee3ptzl2rdyuw3km7gisbna74jwbg4268xj2ep0stuepznlrpepb6owjb9eb4n7iczx5x4k8rzsxh0n6g98jswlcvrp168scx0mnb3qekvf9omn24298nhrcjrrhqc9bjmv26y5dim8xo',
                name: '6e42gz6w7m6c35e36ie0c6so4wu6whuezz1r1wgylgark0c6oafivx8d8gwsjsklbn04q813o1svrp9fe6hgk6pltlxt5iaqqfb5nmej9ifwy6mgo8z14gt9bjw1ysgu6g9obafx5zi101x1sdtiv0rmibnlxrl6',
                flowHash: 'sgrheg5ka23pqtb1zwqblxzit5s3uwp7hmpfo2bu',
                flowParty: '5u2bkvg9rwyvrmu06yw4ydd800ijx5ygo1op4ngha06v4kxhqa1tk5n5s1jusyvejgerurike2nxrt17jfcudqcbc93as1buulrr68aseztb22ltfig69mnz1jyl6bbqjx43394zwlw243qb0knwtxtqapybgw03',
                flowReceiverParty: 'ht1a1x0haausjfq33xku5lr6uaiw88y2yr0hqdl7me15jmr6pc9fl9jp92ugc9c0n69w0xpucsnokn1ym5x16qntqw9mh47xy9frf365excdjo2aswjs1s639er4xl4s67gj0ghwhgz3melfcg2jbm75r892sr429',
                flowComponent: 'zrxvt0sebjgm0du0du0y493jdkahuse56utak7vf2zrso0z8541jruf9883jnizsojx2o9zvisaew183i8bqrc33iik5eu3cuz5bgdng9y9dsl6antavr0cu2phdqso6e6jpmqo1jlmuhfhc2qowlm720q2vb2ud',
                flowReceiverComponent: '554oxsd2ywgjkwkwambgmf3xqkk86czltoxd4xprwkyxqsi0h6ftz9ad9csp68ttxe4bp3dvl2ut9wy8mmr6h9381ydxpp4bybumkemk3in4efau3yx99lbhznr2dnbpisigcmte6sv5vcdgehq784viiityoylq',
                flowInterfaceName: 'exw9ec0dr6eqi9fov6s856luktqzenij3el42i34lauuhl5zz02xvm1l14ii3msq9nhw6vsizxp36jsetolbyzh0u0a2epa4vmd7uub3lg4pf14cnza0jsx13q0wx2e5jmordnp0kyl5ha43f7ic8uaww9s7cly9',
                flowInterfaceNamespace: 'xa0em40amvohggev0tiqs9nr9mhzj2qeh8klu8qf20d5dkwx7bvg2jlbb0hwv5tdrzp4ryqp6teugx7tjae8v63re26zvce74md3liv2g87yo7ze0hhev5wti9ge9c9paifulfsyl65fm3krnku9gl7gnuo0vip6',
                version: 'kefdyq8t6wf41tx402bc',
                adapterType: 'nerr11axta5kh9fffvrwdt5ntjp6x28wog9dx7mvqbagzyaf8hqu6kkpzknk',
                direction: 'SENDER',
                transportProtocol: 'z1bd6wkajf3uowa5at9vtx95oun5e3edhkmd22mih5i2ixw4t4sgap9ewjyz',
                messageProtocol: '6ff4wfxhg0ag2c28ghdo381i9gb94qpwtz9i7h073pezk0o0xqnc80vlx4wl',
                adapterEngineName: '7pbv8yw41zfiqsy7zv9y24dq0evoqjrvvgtmemtriu799zoieuq601xfrodyj7fayc1om2wa0wiskyeek8kmo64wrhopy8kl984hs3t5gh7leuf4y13q7md1cm4wo520ohoeis67rcwu15b8a5puhwweycxjf28s',
                url: 's7uzselt83o8otc9x99lh0qqucq2v46m1aq8kfumgjiu2asgq87i20g8e3thpqfsq62ios6kmwjbrk7j59syr734d1bq87dpc5jl751adjfthx97r5nuaxgrk8nmqfpprlbrj2vp7brusbulrr17y2hhwm6uiuxg48yi9taeaonjch8mgg87aufw6xkkcmhv0bu9yj6pdcjkhpg8ffsur4yjlwphkxj14d5aza4si3l7zr9fyo66rydjdmvextijntjsaqmb1ydazazlda27ez7zswopvlti2ji283pn5qgd86bdhwgzej8u8sla47l1',
                username: '2pf3wxm3hfk3yucyluylo1wsue8df3suj2emkhv4m3h484lfq31bmovwqvfy',
                remoteHost: 'r8q7xe6cekgobepnqlwvosn3chfenosoigw1p4d4n9xavf6v2ltbrrykf10sef5rg900wa6m5h9dcc8bhxr4xt62y778hgo8wb5o0ru7dfri1sm8ih4bikjtojrryl3fkwp3yurqktkc6z36wccg2mf6qqhkmi41',
                remotePort: 9415338364,
                directory: 'ts1k9kssz097eperr81nob31y3dbeerfowoiw6ol3onvastz5yak6f2ftnlucrlbv5ywqu9zbpj4syoigmfy1wegfffvbus82usv1f8ygdiqqshl050bbbc4gf3lxmxhu6al1l312ocj03pg2suu3jp9me8w699rbg8cxoajpf2qj9qj9htfaotq533ljlsr2u7ap8auuiz5l4xgeh1twmxi2lrrul42xvc9fdvqneypq0ip062ge6hqr2ju661sd8o6gesxz9gofj9gq5kki4vttyd8dc21mdqyxwvm8i16hqkuk679thhy0zibsg0tefp5salqfpj87v66oha407jxjbub627niuqqrw8h8vlnf2qo2i71oz7zqfxau72xsltmp9r3k8817tztx0unzoo0nlq7d349kbjxucn138rjlor1ewq8kfa7ou8yaqr0368u4lf07e28i4bfzvler4pxwtb3unadotjrokk5rsaylwwd1sditeabo5da2nalkzl0l01tpns64eqn5qp5k9uzmo8rks9c9o577y98ko2gzzh4mqhcyftchr9kzmh5j6phxk98xote335ge812a13jla1vqi956d45yscbrcoku1h27qqxc63o1mj185h48aqa0xkgndqbrcgpljqw87xdixd2kqrhy7j97w8shmwtpp6w4pfcqihzc49597x0txc3dyhki1q61q6is3nztty4u8qz35zurmem3kskzgvxlu909ojro9sqlypmzncssp2os52x4az0sqwqivnvervt62h7g1dixsi2ce4mgnmauvnj1v783kzwie0xxan88um5v95035835m6f3zxdob477zvrb80gtl9wb62xsmcnwwggzhbosqmmlllqbflzod9ghcprvu9rjbpjnzhwlup24y1624xdaq5m7giopynuhwlzai7b7yoauc9d97fxjk5es2wjiw4quqcf7tu2phzvhpargo3guf9l4ayuj1l4iueo892q1aqp7861er7b',
                fileSchema: '11fx0ozd7qqatjzkffp2ymjd9ewedkphk9l1ppzkw7elpuizcazbs67kh98y2s4bu3b6ts6g6sk2x1hnvcidpc47cng01nwrke4b7j20x3eqfzdo6w4n7168iz1xsgqy1svwfp0kjtg6e76n879rki8zv0najsfh00tbpebk9agycjzzwzqyaby4mjo3fazqff3a25g2x4k1m5mec22mfwka99memyat4eynoy5q56cqjkvnxghpfv71c0uk7ot0m9k71qg9d1mhhp6ymtgmonyoyciuctclfiuovld37oz9j6gwjqkmyh6k2ovjurwf5w56ii0zm4pc61fq2fua466jmo5zfjakvwc4swjc3afzagok2xysik7at69p2v4xu0yyva9hmrl3gum9izzzphjy8xjtkgwjxxkge4n334ybu1h9xqwil6kdo7i2qsvb0qnflfk30ifs9n87x66y215b6631yqgxvpygo39uw39cgqb8wlew99fqg4182scvwqglswnc0f8s22xuq3ck7bscj0611zn0i56xl50zs5ant2r5cpmknurivk3bdi390ha6eklnoyfrfgn879d13eqnh3zv2dfid2y2vgv8rzjphqwn43m0haq5lamj4ah8o2lqmulh3jf7fi6cdl87k89k9fbq9rfjmw5aiuo5cs7dnm6zr06k57itatf8a7az2trnggjhli43ttt2v12oegokdzbsh5vykbj31kr5ybfipdan3ch0rbpvmp8ezrtbl5psjfq8ld1uv8dt9mjcf9p1dhjgpl784h1hcxdsa70qouxx0va8cv0jiyow6cusvd6gcu34bo2n0pdhkxg90qe00k2dss0wet6upzbczt9x1xatx0hiwrpzpssfjfdqxpemz4z8n0xjkad7ipjp53xf5dbx0puzcpooyytshlx2xq6fmadh0uqpac6ou3odwvrhmmh9vgp8z211dlmjy9a3b4j2yz6lg4x74seg5p1p5vchi3wq1vg7y9rz3uu7',
                proxyHost: 'b33b6he9rsg5zyu4blj2g8irs0uh8cubpy4x3go9pgo5f7xe31sapk7y4h8f',
                proxyPort: 8033455067,
                destination: '42g583edozavq7gnt33ev3pyu6b7ss31ofkcmmf0wifu3do5hrpcebbxutgvs73ex78hmo5x54h9wfw3ojv6v7jbc85t6ye405uia3v3sezh4xtqru7p7twayb7oh9bb6m61bseepql2lbsq065qt08jhra9oohm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3gi96p427wnze92dfidem8eh5py17wqxrra2nocz8m2r0k8dcrle443phjbqnied3vj1wshcqaq1lda8o4vi2tec0o4umvl744u9upml5rsvh3t83dagx892jh19qyuj75pk2liu4a1hwnsg9k9aerdm1krycnn8',
                responsibleUserAccountName: 'fuerzua28bnvegqiqktb',
                lastChangeUserAccount: 'g5lfgq414srezmm7hvw1',
                lastChangedAt: '2020-11-06 09:43:20',
                riInterfaceName: 'emrfpovoz8k1k1lxm1yzj6ypmsoavdz69vy06b23399f8oadcmzlgdq19upufcra4dcxvk81328f5hhs6l1rssiml409lk3xziw1vw29owgo61hwgzme0jch54bw3au9n4u5cwctuqw7rb11evj28uw6bh7hdinf',
                riInterfaceNamespace: 'bfwoq9vnp6qdp65bnv52gyti5ld1syafi9iyk8mmt65nren5luqf67xro3yti7ivi56819ef6du6rnfktkq04csmwx2bntxyoo7afwyiq7nxdenl8fr0ot5bjce5gjp6h8ztk563hp1ptyiy0xwu7c4hfd0h5ud2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'h9rlxt5oyakx8dlhri8vevzu8fq4c93l0paqzi8d',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'rwn299rvajrivatuf48gyms3xg1mng9ytbs3dwjuvf12hzists',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'lkfw4n6q4wo6r41o03l4',
                party: 'iky6xey8ulr9wjr9on4ctw31qenrl9qw42lxwot09nps7999yd9njbfkxsenywnsmmqkxy3qik8xen3j6ti3ynzjhxve7j5kaww7a10iognukn4pi90b7ndbmqw2awl319xzaantnctnxjw2w0d6a1i1a7j8xltl',
                component: 've06h2mvlqw0kjndb9d873dasxs04oqs578m99h4g92fx78z3gq9oot6l7cc177tqsyf796tceemoccxrzd6wgel7mmrl66bmenu3y76ofmg31b3cozvmtpbwm0c7llga58jfnw7vzo24tb24h8gij6qdciqux4s',
                name: 'wiu9tnikr7tkgt69dfy0wux81hfaobhjipsfebnwr8utl12cvskftc447y43wp4w4bapeowg9bnzlf2562zqw16r4wzhvnbzpyj9jju81wwqjhfxbxl3a1vnjxdd9xlon2nydevw7pvrpab4ygrjrr32v3nh23ab',
                flowHash: 'ujkvlxio06gfeovkc7ed7k00ju15d4spe96wq37d',
                flowParty: '2rlg3mc6y5feakniqilrrraosx9zf8sgrl8l6avxjocxwmuozt6lm65lanqfo5g0h3bgkn115fti4lcw8vyr7rllmb0dclfvx90nct6oetf51f1pka5cqboqdesva19slfl6mql4vggzcbk104q0m4gghcha18d7',
                flowReceiverParty: 'xwo8jne303p5es3x0gr5g9d0wtxt5k7q6la3wv4d5xfoh33e4mxg0bhz2ddex8pded98f4f9zm2prfhn4dpftfbbt45cjaaqu71znqhfluuuugjfel7lyzunemtyi7u2h04wv65q0ilyze32bq0h139glzsw2572',
                flowComponent: 'xvwspzhyyzy09hidx6htp12dapzbraqf6cig4qy1ppapt2ced2pxu1qalb6a2xe7elrtomxrfc5gk6vogny8mloitg7bx78d0nu29ocnydjs3spynps0hul1ykfj2hxg5m3u1t0v22voq61844ruruznhmyyh4uy7',
                flowReceiverComponent: 'y0k7npn87outlpt0kel01sjbq5pvtms91u3c4hmpbuam7jmkrqk5lgkmn2nl8m4t2kqwol315x2cvlwb4lhnsff1zziwc17r410i7wjjbkpr0zams88uiyn8kn410scgyfxwudmy4deub0q8t8kzove6wum2rpts',
                flowInterfaceName: '1mf15dpxvqvq6y5s8bic13u0q9bsy8pyhovu6houob0h18e3tbax3jy69dyrzol9bfqq8tr8422cdsawf6dzuhhgqznkucv6c8ah4714qj66pnb92dwehwcb58odkuyl6uxh1wst29pwsc96km0ilkf1qxqfts84',
                flowInterfaceNamespace: '4qwi0uk9pas9lxdzdm4iirk7wrb2y09t4sto1jmf15wctvkouq0hf3kvvnqxyr65msa2l2o2xlc8a1ztugqtcobjwuq6y7cd5k44qke7vuleg1euug9wuwam74wz7mwrq16doklk5grehngtvovivnpi9yfr97ey',
                version: 'lij69ru7ooziao5jmi33',
                adapterType: '0y6985g4m689fuah6ub6rjb6gaslbel8tfh0s9ruayt7bmihim444zevljp0',
                direction: 'SENDER',
                transportProtocol: 'jr1pc0th9dvyso30r63eyuur5ju82ci632x25wechd5oe8dsy43ldlx8c6rc',
                messageProtocol: 'pfjbb1plknknxy4e0qfa177ryc8ahtezxtq27pjcbr4q8lw5rebyar92tj1h',
                adapterEngineName: 'z3u27esxa9qvl1e1j5sb6stmmvlclobvisqcen1b8pzbvssp7rve1mrm0uzruj9mc1pxpqy5vkmr38ci6rfjd9n2b47g45pu5yo2v2zql1wc67sc3n8aw3n5votp2yadk6dks5pk16y1jpciwjxufnoftw4sx5dt',
                url: 'ckxgjskr9jmxmuu3pmvludc1qm7v8g45bsfy1t955rsa1clhw1r4p5tobisyilgcrfc1h2illz8dsgluwhbu93si20wo9b4rou6yki4626wd1gltm6u332ij4qt9qfq93fc66z9ef3pz1ky75cf189sjycf5ozfbd0zty795ki0ij20rcbl7rhlhhfepbbd9yetiurtgr7nstk8g6g0gaxksovdjigcbzt85f07hqnt4hj0o6x0d3q9dqita1j3akw1219tmj5hk2nfxt7pzx61d9nvxrccbcuwa75nqodm3akmkkl3dii88bom74741',
                username: '96bm265jcty5ls88azjhmbrx4cy4ndupivi50q8ycg0vc9l83t746fw96g1i',
                remoteHost: 'v85rwfnrucz8wxr4651v8p1at2m0urvqnhsl8sj1y9kqyu6hfk6jd0mjlme99uc0zrxkkn39123ba0trvxbcwd2j5ccarzfijuh4iyjf1crrj0dkubhub27y866nsgzbwpzq93lrnz51mgb3j4v8hqycbeijg4ih',
                remotePort: 8518999814,
                directory: 'cz6ej4xc6f7qx8av1qmaocrydgux0dlicflw9qfnm78pax36exnzckptazpfw1jirdpoufhb5qwwm62ia53orduhnylh4xes1onopz2u1248xi7p3r5mhfr8pncwojyazcl4rqpwwn59qvytog8bao3rkrpq7en2nt1zt9z7lo9rd90hipa5t8qh12vc8fuanqwbye1h41usgzaimbf5f25z54mwk02i5x5v8ctuuf31623lm32vp4si2u6xzwkaevgkcyqya5gf9yciq45241hf9lgjf9i9xtmdxc8i4y7tnzvbrvtqvor5v22hzomzs2q2ocfnzyfmafeablqiwgluh56ur78la2kvmyqow4h6aboqgrdqtjl5lj8jczggc38mc0i6n1y8110r3oevb4xrf867ebc56om9ev5o7xnma8ahvr7btcegwruc3e68xd6s16aj56jv694lvryh08ldrxg7r79w1v1yk44r8wjihrirj4h2dyq4cyu5b6hqzu7ncl164u19aqiaa34fzseosbgeipn3e1neg966fp712o6pnq59fbbqs9262gyi1woieuwgnz9um22amtd5gc9usna291qprt29fz0vgb10fyule7e8oupzkmyriq7dkf65xy72mnqsnp5rxqvg0dqpm5y0n5c65v001m0esp7tex8z8vzt60928nkhb9s5rnrjazv865etk4vqa55fhm02gcu3bob9tc8y5kv31tv96zppnrwzy73tzepqwhl4nvwat9rar2y6i2i1xdkwyicrf2zrjnin1wir2tllv210b6o25u637ih24f8fduozcqvu9orgwomog7s1stalerpe4mdaniyuqb6bcxh5sscvxby204u1vdjzp58aam0xdj155h2pb12zsfva04ntncrj7e3qdkubt29bzou7fnz52f2l6i17a8vb7g31z5t9o1rp7741vgvfthri4098fijmsyxcmos20dmljpqso3440fuqb7p97gslzeqcy9cp',
                fileSchema: '0ynxr98bh6gou2max9xfw8zx9yt9zshqt97e3of2be10vq91vmayzpye0qjo5at1oro6r1jxmuasku9saot6o5t0vs2efg8e68ipm8n753wp6u5ltcro2urkl5lwsr72apf9zvofxoarpup2596tq3rxxdczdtjguafaytl5emeoz3fjy8z8m2vco6r9ctdf5n83obnh19rlz5m8dxc34mb5gvdr6l8yf9pct5jw0xws6jmc5qckfa7idk98bx4f7991yga7i0sowgawht79d8lf68tkyam8dnav97wjey5obc02t5vandt47cdb2eqmwubzmg35l7f4u1u3ghatu73uenoqnotew7ak56jh03zduu0amfqr3vj46nrjp89vtakpf2skm5in8ei7g6l6wcwu7vngy4n61gt7c3q6etlu10tubxej2igt5qzqhia33qv95sbxaiwey2kub3wje7co4ggph1vht2pe6civct0uc5r7nmughspamphkpiouie2jdssqpit74w53zwp0v4uug6h2k9kjvwkrmfm3cmw9wfqxb4m8cf6kfl32p4rl8wfp14lf784a8fnki6i3nngsqneiyfcv5zj7dcxrp2g5dz7mm5p2t3zqn1byylsrma75xw1mr44fzesvgpdwgrcv47cf26un13onckper270i00zm4ii6b03mex30a5q27n5c8d10d0m24eq8a5k3a2jbdm20dnkw81nf5wm2t3yehgos2lwfjrscn4ut5fntr9me5qf1nvxepxg989kwrcmmw750m5iiymb4noxtahnb25mqermfcod1kvvvq0i7p8kg4lqf5cwz2itqgesciu2u8blmbtl4clvzpyl5zfggrcw4j4uiz1biq1dnoyrgp47jgrpi4n8ylkvg70skk8iyo6phhjhp4h8lfy7lvq0vufqa1y1xapi70qwchk5b34imvxhjdx8f2d634t628e9do7cr36pcn6rqihzwlnht1jixeijqkk6y7w9vft2',
                proxyHost: 'xwvscj3p3n87y78oh1xxnghu4rrqghljvwt0a02zr0hog95lb6dzitbgs19u',
                proxyPort: 7907979249,
                destination: 'emovufeg5c3ngtdedi6y6vh1ydnp7sn9fyidd8rl63b1unqw1cwyf8w73zxa1cz1ofvbn7lmhht24sefbmzzw2iq3m2nigxqk3k5f4rrdghyotm533bwvsfnysuwnt2lmb12ho8vu01o48q1v72ka1969bo7cdmt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'f11l1c4o63wwhrlsrscyh1a86iishd6w009tc06ssw8t6bzp4occbmntpnfo0kes2xkewbi3i475tjmohxa4zvs04m9n1382bb9n2gh3bckwudkq9nrwr60bmp3hzka5cvv9p4q6cvws6uss9f7fldln3z7sfrmo',
                responsibleUserAccountName: 'mykue0xlpb6x3fzlowef',
                lastChangeUserAccount: 'n0be6vn72uklsvtfa3kb',
                lastChangedAt: '2020-11-05 20:07:13',
                riInterfaceName: 'fiwo23ha84dkpkxv1y4mocsjxehiy688w970gkrte573lowfd2bgix5inckkhehzdtpdo3o50fz67tikxgnr3tz7h9v6bdpm6zv8c6cygbr8cky9k09yj2uo5mt0ngq71kufi39h9p48su0rfmkxtrcd17dpatkt',
                riInterfaceNamespace: 'bdsx6242vh7bp4dzogdq4hs37bslxby1xpg32is59o1y7xrftouwkmqrs3a2r1no51ctqkcl53jmx54duet1yblydzfoumpsjcq7b0fhbazsb3jl2osv70i7sxqmwff95zyg58xaj7rx1gp2c6wj1kk6nelgdfqc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'bnrzuhdocxxmfjmb887yjgckblus1r0q24faeiam',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'ddy0zfti3m2oej93jae4tdrsv26ytfyin1i3pnabit4em50byp',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '5xgh0jfm8a6odes5f5f1',
                party: '6y3p7m0pnjm20vi9hxkcapyduae37fc50wwz5ymdo0hyayibafp3mfllut4w7x66jdym2pqmn2poh2yfuaeiwoagl53ryew43jhurto5v24z9vj8773zxjou047arv2subhi54cko2crpjggw3h1cg63ggl6114x',
                component: 'q5eb8bg678a3k3jkrq94bg42d02alfhc57uvbwmf1fpc8hb85oo0gdavjgxlnusfvr863bsofcfc3oob9tcwwf0nbm7z3f09npekqbhq5e7pdnc0fu4j7wvoq5k8swrbwzo815cuc2z25ym6xte6qak7u36menzo',
                name: 'pe71untaey9evr17uuwjjnmdgsqho34gk850yrvq9ahexw2jw1ziwwoeduyyp4epvn8y11d3wcsli29a5ees5ru5e5gqlrpl7x1to9oq6869digb8hr661o1qdmjpel0kebx03o1uyoq3z5u1df502yqh8bb1ig3',
                flowHash: 'mespwsarouj6wow5sc0wb6yn3opgq0mu3f0vo453',
                flowParty: '9s0442rsoiibvy0sphtrb6i6or8di24qqurk6qh4vf70zfsiywy2mmrejtew55gpidt8lpgo4vxhbhcbx973dseph344y1t29gion1l0hhkrp0q53zje58havqx899ifq0c6ktwu7jasas6uazoywopvh2ach6vc',
                flowReceiverParty: 'f17ktue1xj4zr9wxst13tprh0u7g5zkepvre07kwjtr5sips4grketmvz15ffsu8ha5l679l1lxtjtlmsvkdp1mf26povzmkugmgfspihd80l0dbfi50ek01cqs2psdsocdkwji6kwttc564d4ew45jdlxvb0dg9',
                flowComponent: '01trfhumeoummhm9hso8d0vhldi8di3u8s6vl45f6a4xm2u0sxagb9bwztstmw5eru12vjhwcw9rae2afbvnn4rwvevsx73cpxm3fakyhigodam8bjd7rl7zrneza4no0w6rl1abvzlonw52rvthtst65494mngo',
                flowReceiverComponent: 'evlp2fd4s0jvfruqrosdntwkifjbh1y1exgj8050gk06i5nqjt6o57ggoykn69l39jg73xmsg7nwhmgj8deoyrox4u1jceb4iyfmcf9xx6ne78o5kywxunolobsr8yaq1fwf7st2lobhlex6pq0iv27v68e1rlgr0',
                flowInterfaceName: '1hps9l371g6rh9eeo468w6y5vzyti0t91c8fs3wcto3xmt5ui5aereucgsfa25fwgusoo2v062wssiqvrukble20vixyg00l10t9a7s0xu3x3hlhlt55wh2xtzh5wx2g9h3yes11qjseegtos1p1ugmthc6bjina',
                flowInterfaceNamespace: '5o0fregglqzm4kufk1xilwl8t52yd3o3d8y9u5qlhz44ns8xzns3c3xakb8enwo6koqc4sw04aanlhks8miedbcyu0atgwlf3tuxnir54o90izmc2qrpjvfjaqm9ln2n92i20ly8g28v3i5iesllysn614nmr3p0',
                version: 'eqvej3pj7oztm2bztrso',
                adapterType: 'cz581s0bfhips4nsydh5qbuoa7hxzuddwukakddd99pwcrg6eq9x8vlblwu9',
                direction: 'RECEIVER',
                transportProtocol: 'di7asct1ikwh8k2efa6t1tz3i54r9z6tk3li50yiele2tslvurgu1of1jfb4',
                messageProtocol: '5d96crsnwgbufwobvrqr8ehyngv17kzvxom6zely28bzvoixobuvj0jhftax',
                adapterEngineName: '891zzobjy6b03gn41umyakgputnhk2rmygnzlacy55te7zi17k3hch55v008l4dytkk42sb0lx5bpvhzfrles1usrs7j6rxz8d6jfo84hprft342p70sm4zri3c4jz4bq0jeq7da9uoi5sylba8647jomhtvnmoi',
                url: 'rygng5r3mokd08xm1l25zkfu9ep72klx01ulxj5sl9cadf07wx2dwow6kef9dplmkfii0fq8xohf9m55ag6kgd4ebuqbda929awvjj7ocwviz2m7x1avqaog6zv65mbouaa3livuaj7kc6edhsbmesu3mlsuskwurr214mz4wrpa4inodoh4d4qwvvn8rpcdvl96jrndr0xk4nluhak44ail3kdhuqn2gtwfe9h4gzsk2176hmtrv8nootoks8hokhiswdjegtsg7hu67fwkv72zkbfzx1yazp147xocbdqyoq7mhlvcve2fvycg3yd7',
                username: 'lxgx6pv0e0dxhtfnv6z2qz3ruu5kgmwludj5tgive8b65bgm94810d9uyxkq',
                remoteHost: '7kc3aywa8rjcz36e1xdnnfof18fpkx8b6lrv0fywhb5hnv8dcl6u4m8m93rdffsbyc0zf3cor03bzniefi6cqtob6mw46254k9nsjouvsgp55o7cocrntlcfe9152n28l7n8zej9vhdf2b38t01tz6h2nunbdp5y',
                remotePort: 3409342810,
                directory: 'eea8ii59m4gp5jihp6zxbghw53xpjylium57km1fgxidk3wc5p5war7zxgc21rgurjhsdnm7lobm9ctlonlkakjxh1utlvlcs1ishb8zvam0b537cypyq68mtuyjpcnofd6e5crlf2ljvrecqug53jzh91wh4jqas4r5c4mw4cksbqqpijuayr050s3rsl6kqn6rcap70dva0mdsjab4xww1dam1nz3dke1bbhlz0hpa2r4pqy1q6yz5hkpjv7p85xnd0bk7veyq0vs7g395ceqxtgsrlcj3j3frxfulnfq8kcf5f6wnfoqky94icb986lkjj1uvz4qbf23167oirjc392zgptrqtt8s4aokphzfg1h5yd8ziup8cqiya6pk14iyqwq5bve0p8o5tn8r0q74ony3wsf3zwr9j1p42xzyzeyoe80whfoghfyk21105xlkxhnwzt59e9ltco01tnjh63xps9osz4dhcznorykkkbsx7k42y6gvzkc6i5m8z3wyups8sputcfusi6a8wsd96ma2h04k47d5sanbztom6ipv3xlt60wya2pr7ie5842vv6l939a9jwl3579iqd13nwzwp9oagvjiu1tqcu3ye4kx1i1afsdzb0e9fr1ebfai22uqma817jyx4s7odi4ynk81e0nroln2d8tt9cplbx7nzevedvvnulfgnzyyt9axt9xr37eq68c1oax78yz8rd2sih3ic11lqxkb3x8p9dil94nny3nru79kjzt5z6o2kmcdfmil1k72fi7voy7fg1apm1nao1uuod174iuz22q77447ty300safoqwhn6euwln5wi5xyhkidwy6vt9re52g4wg0lszlqd5w6nnq3ydlj8l5xhj6z0ppsihsbgei434g7tqucne0esvrdf9ls5axh1r6zhq8p9wca8h49etc1f40f3do4dwiz4lxiglv0l0k6lsnie5hj715fkdamhu4ar6l44y1cu6at380j2n25j2su2artwxr5pz0',
                fileSchema: 'lrrzqvpndyzc7dgyt9dnazexj4dpjowt6cbpvc8xarva2zfzroyma7ux9kjunobp8f1qwfst5uhmlpuilno2tlek0u2l1yjgvr668y7t9mcw35k2b1t4kjmlh2sc26fmlchrw8ryhpao7es4fghfzgoxvyhgd0fwev7jrmuwfmwo5crv7u5tcdp17eke56c1w4lk23wmy641u3nofh538u79qejmpd2c5hsxd32igxjwvb4hqlirtk1vsci404mj067665r5buf4lwuf1u1o28t6dsved9q4howy2jbe5ef9xyphbofcl0mbxvei4e2weaakkdrkg01dz5kpl7t72nnbtuzhf98f4fewrxridctazh513rdv1fsg2qnm2h1vmq502gtkhrqi42p81wf9jkes6tj81gn51el1su46xsuvedyn3r01jbc1eov4tr2umuwno753uvho9rrvvn0a9c554hwqrh9xqbygeim049ecimebnfxrt5vnf1e22j6bbxb2vcy45ajj9hat1y6e2capmt9uyt2bxqlzzq2bcft76vsi33eabm0msb1hqgdhmfr47zj9iw9r44swvgwug5vgyafc4bdgg7wo4a6u3rwol4zsujuhzjbskzgu1gtl7aple7plh1jl2uovyvzeatmsy3msndx93b1f6v0sjza3bw2ah5f8cwun3i4i6m2pr9laes7y02s0khsh785zx2fm0ro9angmpyoozkmscije7l2krzkeky1pyrwnf7om92ed80psun3ee65s68ntyzvk62cpzda67qwmy1h8vraggrlbkk6msn0kqa68nvvjxwk5vyp5v2ubzoyxf5fo3d0v2vvkndmti98puhw7wrswzfg91934xwt4vh9o9iuw0knm2fnb4kwfkstj2ihpjyfg4n3fq2l6uzqla3syq7an5nkvpt4a4b2onlxyzttpuubmo2bpmwsmeaek28mlami6oe0sbg2ny2tsqccx21s17d81pqims3eh5vxuwjss',
                proxyHost: 'yhtfs55odjn1zakfwjtadpwpztlkjdhtb6sou38hvpyjakv2f3k1hxy5ugmp',
                proxyPort: 6739487822,
                destination: '6pulonjs1yods0chyonm4ubrusqurjssoq3i3a97a61kg1qavlyrobgyp348maal1u97k0z2qkmky876zdl5g9gw3ff4wqvtjkjtt9lbcl3x6hrwgjfg2012lel5pjjjry1hxxfuvnntrtgwy3qmh0lo4m5o1sl2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'outkwidhedxvgd5y7ya6x2bjmrqj6ym1he2nv1bknkyq6obj1s2qlt0eflraohqn3arwlkhftsptavs0doa3nyjbbygyqg6nb024rej2uefw3kd5inyspy6kes85piqs5t6o0cl06r7ckpcy98027tmherse2gzt',
                responsibleUserAccountName: 'swuv45cfht5smryvnm76',
                lastChangeUserAccount: 'epyhusxn2qjstzk9gmed',
                lastChangedAt: '2020-11-05 15:35:01',
                riInterfaceName: 'k6ovl1jhksj2yz06hrx7o874q2vjwfnbce9a3soipoc81haqpmr8702nigskjxu9cbl157v73dfwha2n7vq5nhi7qj75uz5n5xrzc84ns84w9sxe9row4zcecf2swuy1q1pwqu6dgw385yqajj9rvuqh8orccyc7',
                riInterfaceNamespace: 'ggj6miwj5dpqlwsc9r7bti1tyc00bz6ryh5svk3l48mem1ax5s1g56oxmz0e73k5s63bkedhvam0csqystasmbczefvs2y6f490nbwii2itms23of56jq5c3r1j3d88tpatnatobxlf08ahzb5xcxllpixjs4p85',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'ox4wziya52x9vchsvbe5ehcugvx6kei30gtnrugo',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '7scka9g9hpvfv5lihzn8yzwa1d548ia9g4h4css0iprhrd3p6i',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '42kcva91e54id3ojnhid',
                party: 'srvq708fzqvpnat5isbbs0wxy5jzaq08xnshk4j6p1btntv4rn8f5y7nl2y555b9a9ibo9hjfjqkj5uh0mwb96ygu9wdjo6kcyjtfqxa9ipp146ld90ic62wpz5un9j55b0rxcs8mhcpof8l18yz30yahbi0g4ui',
                component: 'gkttweubl1stnr6g1lpgrbg63prktzaga0es4lzxrmhzr0s6r7utmhmy9bj8ap6qg0a6y61dpcu6keiriaih1souurwg71z2z17h1cd92824spr1lza9334l4f0oc5yd10o8vumxq93g2mc3aha1h3nsxuipml0d',
                name: 'phjlj7l0i0617xp31gqb0fsjhld2gu6urhnu1at86fxb6sl1r86vupk6ytw2v94dewshnrssmggjtl7u8362u4qauip4v4adwv0dwukrmm7ot52qothd170zwe485dm4zce5omn0y2icu4n0x9erw3dl0vejrdk4',
                flowHash: '3jfgmmvc6738eyc4ccgqraocx4kbe0ifmy9piueh',
                flowParty: 'vgj3f9466ywaqhbqzejcb0ckh53msbjo7a4esny5fyykzavh06odpc3k6tfbtj98j2h85fg5o4yd2xvl29o8o6swr0cqsqghkx5x128w73vudq4xttm5dea20ubexmpvaenav4wboikhfzhb3kcsrp2hcixi68uw',
                flowReceiverParty: '7qjqfkpjdikvg5wlfmxgyyeivqwdeh2gl185pullgmrw4ccwze2ndokrhg0lusglebszqqzrpnih0ez4s84b8jq5p0iak8gd9cebia39dnt82nfyly7ad8xf464p9t50de02akeeakx0afkbl1w8h4s2x94yx8oi',
                flowComponent: '1caeqe8vyh8lws15u68kworp2eakh148853fxtcq0bv97pocgff2hc6u8qrueqtzm7t7w6lygc57vu1w2lahgne63a8l7ccg3xqdssvto9ljn91wr1ige88aqw86ieghi96ewvpt7xkx0v5hld7f45c4oepbsien',
                flowReceiverComponent: '9oy23gegsb72lcqie3bwn1keco38z5nfrvx9lv3brdtz9i5l74z7fimqw671xzm0ognhb6rtsohgvpt25m8n69tpuro42kolbmkpzsjo03vpd54vyov3yb3pyki7f9vjjck70v688m0952ejaz0705pekp0bnl4e',
                flowInterfaceName: 'dg85ie1ks5hvs7u7lo332rjqmr3tdcpysr5rfkpcccaxe1whamwynqhfub340gj2mna1jl0iqzmh1w1lsqqnlz5plaqylrul37385amzqopywqp087wa7xp7ocmu44ai9ier02bmkkbqalyowj1xsuczxss14ux8n',
                flowInterfaceNamespace: 'l45cgqr8caspm872u2l3agn00yodo9mcive7goa83eir51h3u8ppe7d8hwdl3imwf7wyl6blmkuskjlhq2nrstsdkpoesrlh9zk8ebls94n76sku5nujf5me56ukj3xlrx0vp0qiy3ogwf3r8d4t8ritirm3f63c',
                version: 'ym613p68uu3fcplatwxi',
                adapterType: 'z189x19bhmxasbq7n0hrrd37e1kbsb4d17i2cz661i6hnai05dkqbf41rg6g',
                direction: 'RECEIVER',
                transportProtocol: '69isf6lfsvr9xn8mwlvuumgorcw5tv3q36bqs5e8n6d3r8pengus6rs3vxqd',
                messageProtocol: '4khiued503x3oo551thjuviln8qagzzdhztjp4gqfhkzbxs8ndcu5t9b5l6a',
                adapterEngineName: 'y1cb3r9l0jwnhfyplaaijql78o2vcyfedjd5wxls11xhygu6533ibb3tiwmv3sb25qw8ifbkg1d1l3rchj0rvuqjx9w6vhmrhucblvmguncbk9j6neszezydvkhh9niwm47wvk2bhxv575cnl0ucgiir1371fv7p',
                url: 'hv91ekbbji085h8o239pcsekqvwigneeyk8hyzowjjf7xuer6pa05dmoh74e7h7ob0tnf6u1928klyob82lopqiciffsnfs3otub8obgcem5e737a74etfmvqnl9de2od96c6kdcuji5nxcafaj3me3egp0kjs36do8t4a276b2ve1dxlaok68reynnyesr0v5dkmhgr0lt6acw3uk4wyky7ejk7m5ei5w5lchvycbdvom9glix145eozg1cjomusxfemde794ahtugxlv68c9n51a5rodya2ansj1u0o2dcmbbse2jbm1xm8hzgxvvd',
                username: '9o7279xcd41kgdp0ita4c456cxezh27i4sdrhxy0itkt51h3kbukmy82ea6t',
                remoteHost: 'm4qtm1svf4y1uouq0dhb4vhq17fcxak0b4rvyfkmtmi29kjk16rlru8uos3u5i05wenspym7mg94sh1ign2ecuow2y6o41kvaiujjoh8vdo1nebsfty4zz45fb3hv6ji87w8ega0ruyon1hy74dnd71c88gdvak5',
                remotePort: 6222279965,
                directory: '4bwobh0v45fr7b5tan89zbgpneijmst6by2omcf1xvu73qzqmtbn4b3dh761qy4zn8mtc88ebj4wb4mpvntk920mab47072ghes5dc7mwmcck1xzoox4arprfu3un92ijkrgcjrn6dz1p7azetnci18fmw203utiu5xxlg2as0jqhln6bgny0eopgsy84d9e9mvkme74wsowpe19tjemfsk58ewoviyfk4z8cbhfdb0etlxcwfjrugsv9km0bo6osy2dsuvjlp33fc5cuzarmzn2zhpt72m6ea7dwv1cgy5gnxoa1f5di9sibvs3zsjj0t79v1h8azhvktrl5slpk6g2zef6uhzs4c5flah1vjnny6eyzwcsgdgv2lcz93wbagyunids353pk4at3nsfhy7zbvzhaaeqqg8gi3zehh1khdra6ruytf0okjlv9k34po1yp8lfvwsfwtyos1dvv0tj8sq1tscxnoj5v1j22u1xvm280xsjynrd8s5q4xzb4bl2bggxi8lrbczwflv9u8j81aqpqfzt466awytfdsqfgbhpjyghqj3wydtgnbvbmyht9y2ala9vt9lzj4on7kdia5g7139sodl95frdomxt2nomd2r9x4h9yz6vh98awod8wy9pyhrxw6ox6qeg79m6v9d6np4gs9wnyo1i6qjwctdcjght6ziz2ip4a5t8y8z4kijplns2gmwxlie9ci8g7hgz079bae8nbjlpyjo3gw7p5w2hn8xng74ke6usnc9vnrtgjxhs0e62ofqpdt43pz5dni3wzcj390rpl0ruj7ydg5a3g35bum2rk9v0s66nshaeeya29b07o9y1w3erklkia7jdnlayjw4sbb5mjt0d34sciyg5vd4eaonbn70475qolzz25efpu4b4tca8ixtpvtgn8bb13tvk0p645z7kqth974itph1ad4autx6ke6q50bzke8di9si2js4q3vofmle9r4t4c37jvy4kk1s760crbivjm5twgoxh',
                fileSchema: 'x3bx4eh2ykurqjpkbz5nlmkptinsoxo6fohhxfzt22pn7jftmcb7avwejc0qjblokfq1wo47erkpu1bdociw3f2oif48dbagb4kumy1img5jx9sngk19wejml0uw8pwwd5f5xprnjm4gekk5jy1g5zpxp47ktfyondupl9afnq8qnyhin2s36zpfi675cgkatshwzd1x3uiu711b5tpz6azcsgfh40j253ftt9btar86gzblwkgxcp00x9jj6pji5zqjqx0b50zw2bf9tretrbfns4zy4a8w3covjxm1t27ytzb4ei7uq2ifbbqplwqo22w7fjpon26eomphevos5oq4wy8k6n7u3mcdx94m54z0prrsf80zew2gwc3i1gem7m2bvqx6mramgz9ic2r42c8unfcd5errx9taj390niubjqap0g4mvc1zxrvu7mbserkgkhzdstcvoijhrcrjionb99iipxbd2jrz74e1esbpuid6mf5cjuxso81pbpi97jkfpx19bmb8rd2xh161x9pyqgxelubeam8k9zkg269npajat2y7m69xjj3v1b17ih4yoez4v4aa3u8wfrkhcuumhn90ae9c47wa15ozyapnc6tsvrc1blhx95xoi628ejo6ngn164ss9hrfxjtbcua5a6b45o773tnleubpr03y9153m643oakxmrkxgr9tm3ru622altsw19tarp8x8tx7xjy6o7zywq9chdc3o8yrt6rxqc0u1kucov6ajg9ooeh0yrshck2ogsor99711dt5f1sef8k1488xoz6ydlmmmtkllmj8829g1nvkpw4wc5e3pzf953p56qm061iv8e9e2x9ggizuze6dq2eboh1rwk3aoitl3s7542g7ip7pd0odvgppk4yh9vz9xokphmjroyhahsdsv1g7sh3ejkm10jl01stk5bey2z6r7tozaixh6g46eontqe96sn2rz6t6spzsf1xpm55wi16cbeww25i4i3x5mgbwral0g1ju',
                proxyHost: 'orw5d01il93911594d3dhecd5x7xb09qpugee3tewmoxv4d3k7lymqvs6hl8',
                proxyPort: 9266047323,
                destination: 'laied43l8fbgb5mq39dckti9hmpning7rq1v4io0v9cza1mhfy10yz96zafs8qfvohun4brg4iak1gl0in1rycav760hvh2elko6fmodaboqh03hly0jvb3npy2m20rdph27dleo4wx7x18jz4vvmkw2l40reh1d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fwfcoi4ihw54d9ihz5j1gwdlbowx7t6o4xaw1txopxfn9obk6u37f95466dqsfm0lbu13vo10mg4i4yuccpecsig48ou5s51vzsmkakkpchx91btem59upjqo811guzkzs675sffygthno10ntbhr9al74g1v4qh',
                responsibleUserAccountName: '0e5pst4aiz9ijw88ygbp',
                lastChangeUserAccount: '1dzmc7ilc1dmfpq9fput',
                lastChangedAt: '2020-11-05 16:18:25',
                riInterfaceName: 'e5fu5bmgtwig5nj63zujzjolwefvb7r2cjjl6ieerj5v1z7my7sv81ssqh6hjmxw6ts6q7la1vndqa2wc9z3hu37vdgevec9uq6rlyxhjrq2e8znntkens9g8xcymmrbsvm48m22wzaiy5gb0pug56zhcvhj5qq3',
                riInterfaceNamespace: 'c8v151z3k3ogg187k27gwm63skrbu2ix044yl1djzdtltpin9j0gf7zyzn4ccrcr5j3a6xpofnfay97w8pfpv6s1xlxoo5s4htll442d04kgs95jm3a691ltfw7qo2uhf4jd3jwxzc99h420byc6pxn4s7atf8n2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'o9wkwnq3bbi20ume4a6kux02g1sz9ulmwb9f70eq',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '44y633lmqj9fp9eq9u2jq255deapxn5y2faac6ncxgl3xp0zlw',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '8upo13jym91dgd6p76sx',
                party: 'j77vrz5e5x9k895jsj0de4kf16s03t5c4a61rocbheml0mgkihononqxt74pppfss1dg3kh8zbbvty19nz8xa0vigehcg33h0fysecytfandt1omhmcdk8vg6xew4ng709yft9kp331zguw58fbsonmbckxaujsb',
                component: '7hb725tuoi070qwgbrkzpsakh8j8l4mbslnap2z607ba01wa78ha0bxaip9j6zie7u5yx2srauoq5gi81hgx2ekdt8zh2zf84yw2wf74fkqvrkqvv6xj9iyx0fh08kmohg1gxr385uspgv7pfq4j2adcusd36x20',
                name: '24my1l8zn81w9h00hvniel75lx384ktjtq70ygp90wk8bph9uw9gahro531z65i2a5ixdo87kp8vk8i397w3cl88f9f5ak57cq5rf4d0escezjlob99iruws7juamcsge1vijzygit4563cb5islplpb8s0iwup0',
                flowHash: '70ldf383jxfkryowqxdoj0nv061724eml3arhi1r',
                flowParty: 'xkw8ur4te4bqbxv35uwttazwcaer8fyiqt9dri9d9j2lrkxg8gkfcbvd3m8q8qcy614nrvmqfens47s8wo04unjydujjlf29ye6z1veutxgqbaznhe0wj3dcqshzq9exh7nr8k2l4eci0o1m596gpq1tsqbafx3c',
                flowReceiverParty: 'n5h5il5x9a64gbgz2047cnkuoap9ljzu8zx26ueuzacsasiotrotv0vovezf3vpkit87ad90bqt21kd5xuyyhz86b6gi4d4i6yq9aftnyszenu84r5a8p92ezq7jtql1lcaag0xms57tp22kaqhdqgaefun7ea8h',
                flowComponent: '0qk6ro98gbi0mphwmuzwro2t4hn1uhgj7omopyrd6veyx4x4jh9apsxo4tw7gi7nnacq049a8xpzusnhppubkxl99vgv4kdzkzopqbymkmq5x8ln0200gv5smc2pfrsjbq8gockv3uwe7pjxv3kknw7po938i9at',
                flowReceiverComponent: 'lidwik9lbz53s078qzc6fib75xzmpvwidle0ciss1x17qsh4t89czysw3zgmon0xoqz62oaqe2x1ozvhe6jcz3gpzoyv8gy8jnsrkb2pat34hbvobl5j3hi4keye37p34jth6r22phehwku37ung0584mz38jcb9',
                flowInterfaceName: 'i5y5804iczpfudj4djaccxo583gsy1v7ml77zclbeoo1ohtfhwg0n1y00oiq95o3fuwxttonxlefupjksg4jttmac6o4xplfa31wik31yz7rtgomy191j2fgtyw4z9ngarh6q3ti8dui0jo3tpooo0tdmiyn70z4',
                flowInterfaceNamespace: 'iewfyn1uuwcpupchpdc9txdpegr6mi56abeukps0egvqhupy8hv2ru7sgw17ydnbfuu97i8requja0112wqka90bz784jmpzg3z59xg2zupqbvfy030srfqa2rhfm6zmtfc5nrkngydsa48734ydykhr42w9g9rmu',
                version: 'yl3e42ahgbs9ld4vj1hz',
                adapterType: 'bw8uoa17jqg0gbz5r5e9aocw9742pqx17apixw87nrsztrthm0o4eqcwuw0c',
                direction: 'SENDER',
                transportProtocol: 'ff93lykb68m97tayilixt2eygrfz1leogrpsx1t44otrnaqda0prvg0mcorz',
                messageProtocol: 'nvurf6sdmuhf25gh9n4f158tj3v2w3s3fj9de7hq50g9f9v4062jpv3aw5w0',
                adapterEngineName: 'cmiw3olx1jkk4ormetiouyqwgr3j49igx5do2mhi1xqzf6nd1tss9njfbo4g5bftrfygvh8xk7ahlvebd5t5ql0gjwaw0u4hm1eyy28lca7ljfeji0xokoyqkqn4t44x3qf7cmcb3h1p0rvgfz3a5hgv4hphnscu',
                url: 'yvdjk16w2tatvsp3hgcdb0evdcv7gq49dghg5qet06lkrmsq909y5ubd8hq3uohek9ao0tmefa9nanb3eie6bc1k8xnt5mgsjgyqg98kaufoq7op66o88alict7ykc1v8uhrsce5lq1qc748493pu7f0h4ahpdhb8h2qiyl1z4ze0flm00mhvz7mdbze56g1j20z7i7trqz8f3vfg81co6ulkfq1yhky6a1wrg4savmm1dktkp3z38xf0d8g11q4b3l3k43dx66evk0z2suz7lh6cy4s3de2oabewuk7gempw5hdahi4q9fzwpngieoc',
                username: '20vh32ai6a3g7olru1jjwi8dc9bt1k72brhpn6j480pmxobz9cfy8kbj3dme',
                remoteHost: 'jp7rz7vgenuy88t5vzzo2whaxzk3wqtt4z547s09vrezpt8l5spdcez73ryvudciqd5jmr9osxqhtvkpkgp1jutuc3nk6z8g7t8ywmd888x030p33o92d5lmqwpp393m4xvxjm8a3bs4t2swoxrips0q00yiy5qi',
                remotePort: 6271678377,
                directory: 'mgi0htpwmxqanfpu6bmn9dh39q8h0ms1iyqrioil1u8iegjjxfoiwemjcnlre592fn55gy7xcummf6tad5tw7p17taa7u7apojf1wzvintblm4tbfptb2dpi3p258d7lc04zxlxkl4ueng7skqfl6eo9qusc0xyg3xqoz8upq6mo7wpbwx531ugdbe27gvrnux22r27em2knpyk8hk9dhyttargvu6nq2y40fzw0rd7yzziukeg3g112v9rhx1ti0211hyij1wsulcjqdh5yvz92had3gpfzoniiydnze2i6qx47fxc3vjqvvuhs8zbtar2ewvyw8ue367bjeqjpflgngtehccv02jjn2v65ll9fk7nojee4g0rxlnf0lx07w31r3a67s41usc08evtvlkwmzi2b7u22xzta38eil5vi0y77uge6psdrrzkh85l1rlpzg0at5vrkjs0zq9p0b1ven5etiyo81dsafbkn6zguceoo8z46fs8lfoc7rx4wi17mwrgcq2sjra3syau61lrvhzcma7j5me6qafdi6yrt73522ju7toh2y0lzl3gbykznasdgntv3vhnz6auf0po9uq9lpzuwocrhqyhxs8jy4wm58b86skv38mfdzmimhmpu2svio2kawl4cp3iqhpqzvtpw7fqo4gkrdamkgmfphh1qdgf9nk8n6pn8zyrjcckn4gkv3avrm2rhrmbtd4yjfv6fbh1s5069402d5k3p7um3ml4xvv1hz65eevcho6fz694aoz4j6lwsmure8bcs91yt74mg46sdpz7st2ch01ve9e8mhtlwm2t7ciu9fh58x7p1crieh0u2vm5wlulpaik498bux0iaj5nz1tz9o28qx1xp2zwfku7w0ujl99jcawubl1kf3azxngna62nqatr1bbz3ll0kqnx8bocwchk45fr1i376cjemxeeci9t4gzfd4nxtg18s9u1fd12j5tsahorinda7tb8y9o8od7k7mgmidglqu6yfwfmh',
                fileSchema: '7l75jzxfmusv71ras1al8h7cwxe9h38ldyba4p1k75rbh4lhxa6ea88q9lscz8774e6ckrqj7cf0kzop6mnuoar509lgurhyxtujafi7hyx7o4o9a2gvl5zfjh4rro1eekcpvo1b8d56lv28ugsupw0c86jemhq2s6jvjw8bcjepgmqfdv6154n9impmjgaqek1trpu4or6eiyitabnil6mq5q0ki5bve0ap9g2u28udnb26ouk849llkuwbowsl34nyy6tya96c3t0ll5txl7g370158t9thoy2xwuuxvrne04blvsht612ubns54jzkz3nzv8w3qijtkzy55l1sgu7cp83hltwwlo4yo7y3hw6hq1klcscdvbgwmftdfhka0nlyh76vz0pmnt9d83osckn8phg7wj15asawpwcwum55dkszc0dnw13vox2mkqwpogbyaqovj6g9f6pg3p6dk1tm8qjl6ww5v7y16f91ypwwcivxrvpspcjk59tlcsoqkztsoz4ryv19xa8u8jxyq5o83cunrvbhofa3hh2q3sa3zrwooqrlz4d3kbbhsmeaax8qphwmwlqtq4prfpvf4mkwa55vlm0qyobwq4fgfbvnto74piqpkkli4rof6l85azl0tmug6c6ub7vpp10tanwbi1r7il0o1riuks29abedtin7wbb9ugugsy6ntaag64wdk7cwylke0dffhnjw7ktf68yk3uu3ghxj0g6hh785tol4xolqluj4ntcp9lojod4t9mrek03dhp8pqwa7kif69o1n88fpjo9enkcr9fn9ijdaczu1f9ljann3f5f6rsdbxmww13514oyq1u04u8g6fq99a5gr83i0227fda2gmbddwot3zyb76tv7paandcxh14hfipsx0i1qhpulzqkrqltzn88qw0hprlv6mvssu24lhgtzrnlvgd50nl8lo51uuhrgn9a4xm5ez40d15ky494xicrw79i0gsazhabe8qvg1ef5pf4hqghunvt',
                proxyHost: 'hmojh6ho1gjfhyqpu7dfplckz9zwl7mpzfww2zugmsbch7fbm4epj0i5wme2',
                proxyPort: 4225212032,
                destination: 'ayxavwzebjqqqtdn3vj7dlf5vvmifr6x9f8se96pdf62qwpxfp2jxmo9xcps50am17oplxc03m7tlvr62a1h5ocgrrahy7myhc04l5kv3vgmm55jey8niovol8chvyxs6v7m6vfkce4um5m3hdbrihsjkyyje0g1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5przzp852qbbe1skncchnigwufry7dhj8lkx3mqrpheveya86bgt3etajwbx730k1rhjcz973voru38c3vjx2pmg8te7859xhxtmas2hao7z3wn9086z80kjqfhrb2uv7itg6oekuqe4hoe4kht36177g965eqjc',
                responsibleUserAccountName: 'tbl57qhs2u2z49uf5wo3',
                lastChangeUserAccount: '68y31yiwacuqj65lprmu',
                lastChangedAt: '2020-11-05 14:09:23',
                riInterfaceName: 'dogabnelvpsj1zs2gpp5e8misa0ozsner3a7att6qk6h03wpz7pxf5gof94bacq5dot7ocwardnqb92mcbl7bsxb15kmmmlr294emf0u9rndvlhm5cpzwb3o0j0w742vlufqsllfzo3fcel9smr6pfzqsuom0yeu',
                riInterfaceNamespace: 'gd54kqbdflvgo83tzcansi67i8ui54ie52m7lmfxmumoq2p7kqvaqd8kbrwn4sl0rhvbkko86uo4rr7y3jp28iaf2u088hjmr0h20h7gi1aouhqkcm0duir8hmpy3376ws4elh4xnofco7iv6ehq9x0yomlx7xm3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'y5pe3onn1hyt6grjo5tdnms1zjniagce4bgdyhxg',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'wua9hhir2ys6k4kfn7xu2sgk5jjsxc88sd2fp5ksfpngd1vyla',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'sf2bccuk2xf7gm44gja9',
                party: 'pl8umblvc56r99f2lueea7hxjr5nwv9gmvemeukm5kmhjkjyjvzbkfb8juj0ccmbtjtfs1ys2iabn6byl5xewhs0l3wgcgkeet14h86uti3wvoh0uj5tzeguxz93oeo3w0mc2oeb7j6jbqm632ndjg6yd12nawod',
                component: '7cjwzu9wjhgbcfnpgd3dbf0axjr6912on1pzvigrvbs5gbt13rtcvw76r0mzsf6w0k227movn5xfpetyyp0bl5zj3ptwr7wj1divfm4mn4dwar2dzr7xm2iclnkw3km5w24s9m4vjq1kh58cezbg8cub7qt3ihze',
                name: 'r8wsm0dovy16n4ihw60dx073w5wvqdaqs8flc30w61gn6igul77vmybaa7dtugwz4bx81ts1q0w2c452e4gmmhp8d21vzkabcuguv3am72y6smms2j6lzz9083a5zvwqun1f3hk2wpc8dcd29klsz1vle2nglb48',
                flowHash: 'epsg1ktrr7cxufkm17wmglo0u1jsod3zerjfgqso',
                flowParty: 'zjfixdfy26n1fgds3h12zmm5ptawgbzwggifslpdu5w8ltdy3kwhfytb9apo1tkbggmm01sm2a5080ach9ubk7492i0xyaek3bogotaorizjcu7kk6wdwabblww4m31n3xsyv7vtc5zc09bmzrtboszy3z38dl3n',
                flowReceiverParty: 'nrqil4oik7mp330xfq9vf1avzr8lzfbbgdhddvq5fg9jmflp17j090i42ded43xfsqtrwpow981tjj5ttzqimq6xklzoqeaz75k60wufybgbtfvwcone660ni919uwr99v6npfco0k12txi9oth3d322kf238yos',
                flowComponent: '5nqtaagy8d6np51k3pz6ooe46k3ax9scjk352kvvtymrvlvvzmfthxj67g29hs9u38rn62hu45e864u623qhk0uqv924ywucj34voqqamtr0lxmvvnpehcx4dzee0ktn7bjlag97alxqy2qevfbwfymlc4ldd5g3',
                flowReceiverComponent: 'kks0cjnqyi4ynimvoyj9ug1oeqe6zcvnbqpcciga4vuo3enuwbbbh5g10958j18e4t2e04qslh7w3gjbdgel5798uu9td2gyet3s3och7wfw1qui513x6715jcf6pthjd3dscwdtqrwsuxgkowp24jnvg4p37u48',
                flowInterfaceName: 'vcnn1x5pdc92uxf4j07anv5bohhm53c5uns7gxpotie9hzrvqcljva5hctpd9ynsvfmzh62fehbxsb10xvn1jsxvp78sxupibhixixesofq31b0b3bj15c51d2jmxfqy2p0hc5p1srq001ttolfez34owig2teh3',
                flowInterfaceNamespace: 'lmrzzq0dzxxhsvboh0jypbtj2jpbguosbb03iyk6oromktar0hkfoy7zojpkh5j3aewzrqljfekhbbsm539yxpodtkk9u7v0be5t4krar9cy7gsu7lxwktyc4hpit73tkvi9mhrq0vhz4gpzcqrho5ciisuhnp9d',
                version: '0gdg88z0k09raexrf2rra',
                adapterType: 'axqwz8y1tc7wj4cnre5vlw790t5ac1w2izbitedzdiez9fiz6mudtucrecyr',
                direction: 'RECEIVER',
                transportProtocol: 'pwpi9ss5uvjndmpdebk34um3xsnjg7i6yif2jeilvdmkzu2k87mylnnn9kt0',
                messageProtocol: '9ohd2mgfp2iv0rr5clakxixep56tbyhxwt3vlzu7lv9ge6a3n7vavcd7a0wz',
                adapterEngineName: 'hr2ee6b76qrrey7nahk5xytukjmo25pkf5k5j2oalerrs7tnm5uk6os2djjzffil3lkl8flsyhmyshl81jq9rew90uwb16rbaetob7hmtnr09i4ycp4almvasc3snktc3cmlai3s5uyx9o1qp0hiz841ladvj5gc',
                url: 'ud7g2rcc0tocuxp7754bp9x8c3p69bgi1ow94sdf4jg4xwhwihid57y42io8cq27lj8k5fjdg1g3yc49oczjlnpo2y8qvc8znfsybbu5njoe6dxh3d1mxl140nal6i9k8u1l64mv78w1u24x058uhu1m88hrh6etcogwsbhnwrg8qodbbxvgvq2dmq6av3nd4udz8v9fzfg3qkyb6ercktg4ptaprzudaugxw034zqjcu5i660d8oy0wjzuoc5fqb2c7wqqbv8ovq59l4m1fo7hp05aanmhtmbp8lakzp0rd7pgzclxxsh4h2neph6m1',
                username: 't5dutcvfickn5i8usqfyncrd8jggpvcr2p0d3pnz3plku9x26t32qu6khhzg',
                remoteHost: 'tlwbfbi071dz12jyp633sukbc9a74jg9t9utmxy0pb61goz8e0jqegt5g2s0vquot1wvqu9e4kvyahg0yi7etlwre3kk432nimktxfmxikckuua6zt1q37bxw0v76vnptym201ks5v01dxej8bbqcg8i0ox9s3q9',
                remotePort: 2355415994,
                directory: '7r009vze6ql8pveodku30u0k7xua99y09she3uyzhj1rfzyfeos172tzrtbv61jnb83dri218ynmdunulvo8r2yexi6b1ufph2zjv90wke8jv4fl56rplr935lycw9v8c22dagruwhdo5dup22s73zqcpa1s3im5ctsecdxyjfkx2ey38al813dmhz2z767tcwtc6tmbp5ve9vber787qa76ar3ieg4069o5otgeclt77ncs29c5xxb7cur1rn1ttd97gox1kumsjoz1malprj8hdtpfns40iy1ebjbmqrsdgo3xytl60z3ea23vc51bwuuhq0i1w9vgyo5br84pwa7fgwpmd2ks10glb70chgick6gbb0f9lupz3etannp5o2tztl3dnk2imcot2j8wjpqx2a42bquc6eot9ivqn9ih6la4r9fqtzdndddgxgpoawjdkh63qygs2kktyebxzpx1u2iqlte3pi7oewin7q76n6hispfa52nffopdi2g4ryotq96wshngf2av0qld30a882b4im9301fbkiculoupdtz31n5zir15cdeepisva2m5obbobki0gpwcjo9ffg68alwbt4o02yo0yp2zjsnd3um8fjzjd6mcdlfxrrptu4g834tcxeuiginy283duw6un4p3aylwubm8s7ark92rvcsq7e4x3zhe2hi9zh5qz9b5uj8laci47upfn59zekgnn2de1jd57v3vxxd3yoc5jzguemy0k0q80fwm03u0iu8ujlejcxg5yhfxlr7d7uv2fc9py0lqmmo12x6tkzsplhbk269bwdpgp7f4gqfmnrl73pipl7g3ks4f8qdj4nmger1jk85omgwvchsr0wo7d4bjnflj40phgt6piy6m8ckwof7sivobn22xvgeb8xl977mca6cgowkil1tqqju50w7h2yxem8pis8nu8bza8wta64enzqynbp6z6ri1rjogb3m7l9yewm7z8yhi2ybxg73hnbziza4jg7j5920h',
                fileSchema: 'adpoysd8sw9y0p06l81zcu6yc45vfeumf533c4d402vdiqwvd3j97l46h4l5c7ku2q0dlqs4kci7gakyrb5rd72wmojttl4obdviitqy55f8bq0g3h5gor3h98l4gy3zkov4nm36hmvj28rg8qw7zkhvw2ul4zq8e4vz9zmmkyjd2hkuqfv02bhia9flk4eunn6rs8dqqit6ldu4yayfvy6zi9k4670kzr2531kvwoq458s1gd85ewtb1sqydku87lo0nj2q638b3pwadrt5ee8rm0sze1j65wu6hzih6tgxjlii9w2s9f7tyavj2mv7bopoobybqxd56qax5xm0rqh45w19qfzqkrxom0hz2yrm3t6rp7qrpbrw8wl522e67a07us05e51y8b6umtsg4gttnz0a888z3doohawlbw4ru3krclf5mp5omagfxh4r5iya91j224n0kb12npd454zjkepbf4yb5mk4iya4kn2ec4qclk6oegmkpkhx1lp7c1a8t13gchkwks0r75v10b0y5z03r1e07484q9793beyvqgfjlrr0baouovjulkcag5y3j3vqtc976yqmnomh9n5nc1p91gtvpir7vs8hyz1v54b00xhivcazslqhfuhnexcnxd6hosimq5154qf7o30l8kcg7kcrad7llls81f5sy6qobd8d6yay5yrr2moyw9jmh9q4ow0btt5bgh427age6kc02bgzqbz5g3pawudoxpkzwu11dlsc6ueeun9jz8anrgi3xkoxi9tkd5rsugia7pbbvyflfwfhb4wsxojl0wfunc78iglign8pxttacft8jc6zsuecbpihlr4ez66hcp011870ar53dqs4zgst944574v2qh23nw5xvkskdni9gzshwwr4yp5fcy7el5h9s04yp1gdaf7jcva76e6ykrwhartaishhgl2thos0rh57kxhemjbjejqyyqis98ddf261l5rxaxnpor7u4vbd9e53zdncxgj4qkrfycy',
                proxyHost: '5v8rpuw5dnhq3o8pfali8ie39ciph7xtpqh3oix30c85daflox4zdukkyewq',
                proxyPort: 2250122724,
                destination: 'ztg1bs91lq9r1e3jxlimkkqphzbmkqdv5xheujbizodgx7ocx4ylbm4bn6q3gecitmlqkcs8y2h2owmvmtdfeo8zilg1g03rrbcqndgpkfm0x9x49gm6lx3uxe4fy9m9ze9084i9hgh490vuxrpumvcfsfs7vsh1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's8m945g7xgv7zy4mkm04ijawq6f836njgmjlzv41v7ihg3cimlk8hlbzbi5gxnl1clmkn9nkg4h6ah9x5lx9v5gu98v3h0w78y5u8m356bvgp90n6nqy917n4qmkph3k2n5kb2oi2o20jjvb5we85831j09d8ncz',
                responsibleUserAccountName: 'p55kej7ityje9o8w1gza',
                lastChangeUserAccount: '31lwvndoy5s7ud0id8d1',
                lastChangedAt: '2020-11-05 15:28:13',
                riInterfaceName: 'dbhb2fvkxkylita8x6jniu8xlffemfa8wx07z97cj6w9g4fbdn9ymrewmenifz43j0paeois0ga06prydq77t1r6b0mfdos0vw7jlf1w3hnom6l2mdufxx7uk2gzaujgghjzjsshlm6s7zktwvzpstz4yjczq7pu',
                riInterfaceNamespace: 'r1uezc3bvlvq345afy5c7yrauibl6d09u39mo4h9t457uml3c5u1t2op0tu6jaiisre9yhqawlzfv0xbam4lzv5wmup63l8qgxqexpl81f8erarp0khfzoljond7ysnac2b4h4hzzp4n4ujpc6ps9ijda2fxvbzo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '75ayljayrgeaqomt35bnhc8mflmlz63o4qhgj8c8',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'b5ce10aktapy7uyrvf9rpil7jaxiktm7l6dpczmbcl572oiys8',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'mrny3wi64oepys2hl6va',
                party: 'ge0nzpvdjx6gi067bmoxttzxmnbg7uif9mlr8wbk84e3l7nplxeqazf8ajdprfus8kux8hz3v4zjum4ao9l3ybme2zxa80vfel4vj58l0j4481gl7g686tcp7n0psp7wih1y48hw7owbuuex5opbutk3v85iltcu',
                component: 'p7cn2a9cstwc8egj9ldkc38n5q64uh8ndhozyfvuyjonc71szx5uun2gvr3sywi0vnjpm0hkx0kx84cl9dswsx4locsz0etfiyw01jpj1v1jckuf0cgdxfmgtsml1j3pg363prukrrvwo3fa33knprqypxaesy87',
                name: '2ivc4kb5zc5myltgpgd45wxh78q0udzubnqjrwfcjwcl6h0xiglblpa1tw0x5cjhgk4rphruw0v31mgojrw516isjetl5u90jtrr5tj0004ltzqvhidh5dv1u5rw2e94xm67yxgx8dbv2glh30qxcx8r01tjq40d',
                flowHash: 'uyfzsihj6mlcx1t49r1ey3e7qg9iaefr1ww1j2o6',
                flowParty: 'y1nvo59c5gsu5y9uuou2ju0bycbmj3wc6licaoja7cr86pnd1ojsp383hi2a7en8pxpp4qvu6qif8a732idiw31qoljilwmakd4zqb5szjedeqx0pxvm8xhvyafvyq4fn1ujbjki94u2630evtufwioe1ivoz5v9',
                flowReceiverParty: '6y76bgc7u6696g8igmvf75wb0tew5cvkpcdhilevxrjlk6804kcts0d42fyc0nq71oid1ivn2rx60b7u3jvf67lj11tbytqcunr9nke51nfonpqbe8n1oniaywanq9gvxy8ck6jml1tczrkn7qvz8j163h9z81zr',
                flowComponent: 'ysygerhu6sc7e86lzlj3qqdsywpqo5lvxg81tnb18nmh1upu6hh6kq8826oww6wsg4u5eicwyzjskfkasyr9eqyxqp13snks4c9598swbng6dw5qjlw6lj51p52ckqkhah6wge544noyfkrp7ik1s3tsyhtkkqbv',
                flowReceiverComponent: 'csrvzbt4nz8nbnet6ug4c9jbvptmkcn5sru3k40ju9q8w3cmhefl0ndth7vr6mrjfxj7heeqn9flr5jnegkyw22c4jvpy8l6h1vovir7d0ifq0p5t5ga0si4fxt8efbzpf9daz74iadujbch8ouyrolx9299rgat',
                flowInterfaceName: 'ce61bfjlm836bmuzbs9799iae2xyt306l92xizjmz7agwbj6tjgw2ifsmcoz20gph5ms40b5i9vgo8jclez4c0igf6oyo5n1ot355u93j8qmekhledw8klzn0cvyblv2ujfx83rsh1snjtirgzwhjrvrepe7wd4s',
                flowInterfaceNamespace: 'edgxp5lp8xb2j7xin2514v4qxwhcd1skrlx0oxkx4qd59t6aomqnctkrp1oahgs27nvvoxxdeo3g3nw0szh3wlf7xmv79esdrx23raz8vocw0orwx2cwso08q0l6176923ofnjkild9ncbzbbwvh4kvsb8y38ywb',
                version: 'gcqrzo8x5cvbicfff3qv',
                adapterType: 't6cs69gt3to42bsyrd7kmhvbwwv5axdohkd9nr93a7sk0zzx4uzt824ingo67',
                direction: 'RECEIVER',
                transportProtocol: 'bb1gd6ck7io4zuf9hwa8cgc7r0a13c0obko7k1gnrzkkofwyw98veli8bvmc',
                messageProtocol: 'q6sl2vs8mqcwrfdxyk2gwk5m3ge9bhwzd6zu39ikpdl01u6nmfhnmlkteba4',
                adapterEngineName: 'wm56gr0d2hxdvc2rox5stpbiqgbs6gti52pu2v7jbk8szf76t1dx70k27kpjnrhua66uoet92mrcmpd6a0xcc7unb0nvkuecrbigrcebwj73vu6mczmeikd9jf2ut4smft3d5j47pqojy1dxnnxe4wdv2upvix8l',
                url: 'oeowozojqot9i34bx19wgxq2jq8aw9i498r1yfkdqb5fy33fzl5ok4p3ll1sz18f16lmizagzjo88p5wtlo6ues7s6oxn3iww2n97m21v382nophhb84kdnqpb8f3mio02az3q31388pj178dzscinp71szktsg2jst8vt1vfwfvtj8faml31pztrjbj6ii1ftarpzakr1hjixif0n5wyqsclp7mnuhyce3iar4el0sshiibv2tykmmpnuxewvbiv8zh4ix88tz74ktppk69mkegabj42mvwiiplawpyegzokisprrm10vdj5jg8wtm2',
                username: 'gvtxs5jqb6yox6j3cmor3wlga2g3stxurk0r4ysz0xwfzsvmlrf6qdmoxeco',
                remoteHost: 'jwugws7anpm5tc433djo1c2cpczz1ft58yqpfv2xcwegpevtk7h4a2xpio3gkj9kb1k3vwz9rsbzozq8usflc3dmitnumgvkmooy8qow4jslne4jmy1kub5zwpfuy19mkv3reu5brsbomk6vx6p7wqzmgdsum5n3',
                remotePort: 3128879733,
                directory: '3tbwjki4tm2lpq6npwyke1vl0ss8ne3c14xodxfgfb4xyk5g96v3g7xakwbrkkujwjiiw9alyin9md1yicmx3mn7ybsqbgq4jsu9f99f2ahgpr6pc1qy7c4tgm1frqma05ftd6l5kxz2tlf81afoych76dalgla84uv6xh52kdl0m020wl2ufs6o1fxdew53chdpuja95d7ili8bxe309s6ufrx2lvr75gu17tryj1farmkgp6fv4xk7mlts3l248uefhzcndjyn7vwcqi3l51agagbqpci6av4yzjf1gn1czk0v2tv4fpxjjkj32d0h2q440d04watj6ubjqgu8qf9ai0j4tv22iytx944am3th66hqg1rvke2uechuockedit7g7bi60wy62rtfm98z8aio55nk45c8f08jclbecchntw3lftdtmpred0vxzdupkkfylmmex9ogdt1mor0h6rb8vfhucemp73qh7xm44vw4fxnr2738t84tb300fbuchhhxepif9ki73vg6lqepa94h06usidls1iihm4ibv8ipcf2ogri5orts2svotfhx1xf7unwx83m68uykyk4mopuj8582tbdjzinv7ysyulfgnyq3s8z84551qobha90quzjp3hqflqy075gc5g0vetcuxgj37hdp1mtcmuazsytpbvttcubbpfdiqz9u9a1ue3yloegme0drxkr8pd4h38nlxkd94urhm5odcrlmuwriz1dbjjyoy1punnwjio01plrz7ds92tf73cpsadim6u8drg8b77pvcyl9x44i774461px7l9n9xt6vxh6vkh8pc6ta05wdkmasbi5exzf4ysi5dzko6xokoqde4otcm3mgkawh0htqnbno9hxpfxb1ucw5lbtahdla3t5waz5r48in4rlnojlyu34s9ctpkvfzec5g9boheq9adu802wcoqavn6tebdnv2ekqbbgzaalv6ar72hkkl2m2zennuf9vr0d3f6xsn1qj6sbwnlx',
                fileSchema: 'jkyi1bblyrgy8nziyt6ifmvz7ivcqixqyu25nnamn8klegdz2fix1w7unjaqt9ufho1wpcwly3wc3klo1xmm3i7zri0fbt893e75nhl28z31mz50ac6e5i48eqk7mprx8p6ua8c3oeuywvyxci4yvcugq2ed6kn6cgd9w9y5pmbk42z9cu5mk7livwun3d7zj0y8nls94b71rbc7lcm66rh3x9iiwkgrnte64hrmbdtwr8bfruhux7s47rniy42megj93jfodg1ywlz7lk120tmat6ensg0uq1r8m136rug63bmvewns4bdi7iabnhw35wk55q8ulhqzs76yl5fmv6kf73ykgcfs06cl5do1ctlciipinuua5sd0pd1rx54b47yzz2rv265yekido2z4v7qvvhupyow9cxrpxp3xpsjgjn07i32kbcv0bgpgof4k1ej9kqew64szbn7urx5d2gzo0044af5wpjmcb4iy03bsx0uac793unb40ab1hhpvw8xastfkl0c3d0dcb24unz1zin788n5adp9k03fhmqm8xy0aqfhk3ju6co46n92c2fietg0mnl9x0l600kgddlcvr71buddhmu6jg966icqndsup91ieq4gwouahkj0zm4ldy6vxyr43m047qb3v8rjucc7utpucc0gsqu6gq8foxi0k0zlq3qcceqpl583xcg28nxr1gfruabe2478ftf71olqxxf7nbamiqsah92yd0xsj7m8c3u67rqmpd25z6repufee9u7o7ptbou713eipeh6az5jl371id9ral61kblvmz0zgxomwlo4pqbdpqte0vdvovn3y2tap8msbdgnw9oyba4igh5j6hffu0m7a7gmsyzwo6b8nrhm067ff64om13kx745fn4xd69oo4w7847tqtlqv4mjva6ap0882ebeyhrn84034d7bbnnf3pkw1f8vw776lx036weceaxzm1ccyrjqk52s3wesqfwdhe2tu809lnuccss38rxf6',
                proxyHost: 'ol06r2y5wjbdp5vv949t6vplnv3d67o2lxog3uen6yukz7o8fu4d85ih0pwe',
                proxyPort: 8661753595,
                destination: 'andz2j5q7ho3kl7o4faadcc96nb4kbz9jfuw5q7rlxxpkhn752buikhnejklujs4tvmsi6xt6d62gtmv4jmehktwkr4vr6midxexwz9lc487hxrrzc4ykkry09cm0o5pi6iidm6k77j3nxfro7mutq7ht72jj6w2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pdxonihde3bbkv0uq68eh2v94cdt3ogss560fddncnbbvhv6l4hwfq18r5lhkymw0oc47b2ms29t3w7ubu3b1z9zbzkuxwxm0yg8yzc4swtzk227ndaam2uh22jvsuh2dyry60hkr46pbvht9rf2wr4hzxvbn0zj',
                responsibleUserAccountName: 'itdlcyrt7i2bcye10f30',
                lastChangeUserAccount: 'mfu1vgp3f2vmvci2qsg5',
                lastChangedAt: '2020-11-05 12:44:45',
                riInterfaceName: 'n7l2piclgfxi75pnibuscm6bup1xbvzns35btposs26wvyhpd0iedp1vlg9ybrijwtan0i4l6f9b47158dmnruqsxhbarpcvbmm0dc2h26sux3voijs0q7algssnhzngp8fakx4jtz5n8gr04b8bomd6z6kz7kkf',
                riInterfaceNamespace: 'lltutl9nm8hbp4i51qd95g4ct7575rdykc1b7y4kv3u8h5i8o0h2bmbfxnao1c4m8tlo8hzkx7un6d9h1jic98jx4pnit7fgcltnmh1jkjpamsxmd1zhkcworqrua1bqvspzemmndjz0kpepmyl9dcssui0soxin',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '4npy9o4qcb6jd7c11pwcrta974ks0j298g1f0qrp',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '5mgz68okhma5ih0lteciwnq0h4au9ibd1pypvmk8dlh6kvarmo',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'okt44mxh4ds9dbs26kk7',
                party: 'if9cypftpjzgcasbtodzd0axt6jwr7n12b6ethfrwghfeyweqpf0qvk2v0b5emmnvyq5ojjzmec6qwd7mrma5hosksauie7gk3q2lqhyuq7kr7rb0q4y4p5y0016lpc3mo04btewib6b7ev6uhzd3tkbdob93dtj',
                component: 'lyh92fuftv79cjdtk6h4ikcy1qp4el78c6yozrq3fo94a88cevxyvi5q7cuhf9n08vijrlhpjm9x2ez7z3j43f7s200t8873axzeu7uvjyz425c5vv20ykqxvzx91gvd9d4qfkigh2rhjg11lu3etue7glehmpnq',
                name: '6aanbndrq8ghxn5dy55j26ixorgwlg1ldccrl6qk6nk8icqsyeku1nh94rnmc6lrvcro1v1glvj6y8vcrszlh6hgtx7y4iw73ackw7na3xfies9pkikirzposj17aoz62hw0ybunvexvjhqfoisirqxcqyu08n3p',
                flowHash: '88qrlc873wfj73v1w3nh7ypiojjw25atrsqgsvbh',
                flowParty: 'dwpx0wohfddd5ixmd4tehfai1p93jzrbdj9dkp4vfi2kcnyy1jxb040yak6l6glq9f0hsdjn0rv5mentj0qx99o0qkq4o5jktfvf4busmxdh3pcu4wmjl1o8u5vnr2030tfbu23l47u5vg2vw04chjx75zm3oefr',
                flowReceiverParty: '9o0wehef1fth10imgkkl3104v5p29utgnx66n6acgs4h3vuay9jtef0w9oe9wrlysssq1rksgk3e21db26pmsb23gi6j10vf19kllq4kem68tucz4vwkm699lsyb01v1lb7hlrseobh5vp28ozl6t01ul5h21ieq',
                flowComponent: 'frr6t5o3vinnfr9elhavhmtwys6jow8ncpjssx9u28mb081tc50w7sgo886vyjh5ddi9a183gj6xvpk8l8slk18manj86rno9izo6zke0ww8vonr7m5nhid9gfrjf1yfcisohhpj2liaft52hq0vzacpz39w3oj3',
                flowReceiverComponent: 'b9f9bn20y3xx1cw7jlnz7q9c6medguni271tlr59zx97tugm0l98yg2zxf7caejkk4ry7a23l1nxeozm6r16hcfel4vnkjjxg2v56bisj9zfnhbjrmtvc0fyf6sfxzg5rvtohnzmhnf69nxoqm8bq17uiz41i3i5',
                flowInterfaceName: 'qhc9q9xd1v70eyulne758g6fxqaj5v3ve2x4qqnypq2wymak24yj9hgq942zk5846womva1kgebqvgec3jvd9l80de09it545plnkpdws8hpu6nsvlivcpdo56ahe5mz4kvgpa37njb7e4zn73wf346xcc9o0q6v',
                flowInterfaceNamespace: 'znmrv12q6hnxukkjlotnwt0d33kn9w8pwwfrzth8f3yacrxmoc3x9wu3ztdcfklmz7qnogkhj01l2jqz20h7cgx197htq93i3zy5wppbeh6exi1bl5vtu70h0b43y47vj6z93nc2quilszpr9up9j4vur7jj4znt',
                version: 'p7k18fpkc9e1fucy5tco',
                adapterType: '0kxe237pq6e2zv0ux6e91h03sz3su2oetlnhw3pts37zygg4cxjrhnmcrzan',
                direction: 'RECEIVER',
                transportProtocol: 'yyj1300t6326ve3nqc1fke17mjrua9ulcs27349s0htufwiytfob9fm3bkc49',
                messageProtocol: 'ruq9o8nkru6cb8sq2ajygupbwfwal1w81vrypon8r3zpf0gno5vpeo65ufqm',
                adapterEngineName: 'zqa70eew8sqpgvsugt4i7k7zerk71o4vomhbjmbi5wehrwoj4v1ucyhqxfvtcexle0titq8xkj1i8hyyztswcuqvh2ongggqacdfl39f3sh04op5a7qtivoniy5bz7iqsnvj7d6sc77qyq871s3dwulwnrk5vi6n',
                url: 'jffk3u1u1gmz7vzxo504yl7seo2bbohxpnwqnhfuy0xfju5m4olde19gco6d31ydymcynr99s48co5wrnig98fmnr6aw5zhhqscb4ca3gn0mzfpdp2xgk42zoe9186dexzvmr7bg6pmuj1ombiehu57iuy70t10enwtlnznummgctjw68iysxxq6p3rhbxmbpg2xhdfogamy7ih2jt251v2b8gopri8qtoihpj86cuqix8ck5errjvnt2tfdqp6qb0jel8naxd4dpv7boyfnelmhlffc2mhxggourm0xtn4pwzse9kogknmccoxo69i3',
                username: '2b7k1vcqq1pnkems6cekn2ex5xpcms3bn80aj2gv7zpqh0q1tavmcsphkalv',
                remoteHost: 'r5s2gfhxpuweybfd78b9bfyfpe1d3cbg2x01vh6ra0xwy52yi62w09qcaog60jnlr57bqzsic2cml4qjz95v0ue33eu6hrit6vmim4kmz5fdsq8ru2sqbmox1lcvm0ahdzm9f3qmcd5ruas7dbhxl324r572tz8e',
                remotePort: 5609369525,
                directory: 'eihpfg5kqxrkm9xpmhnac7hx837e510kupcp3wyg40l377unljyto5zlc1ycxv1iq1m66oz4rclbqpgt8nfkxiil5u2oyy9losm9t3y7owyqrdgd59fvj8ga7jocyz7e9zywue7tfeewkmh6kwkmooc90jjo3c3d0sssf1p3nu8bpiks36ccsyo19rn9o8j2vi0zdhbnjtknlqpmliw5cvfc1nn0hoa3yrbnfnkc5pwzdbd6h5kuvm97je5la1d2z5yjvqp7nyqlch1a0m129pwiez5e1p0tbyf4zkczs1z666fvgsiaz1mlupi9nsp7wqpbqwcnaw6skv01wjwkn3uieo1t0wrcur10gbrxgnqhwwhpyh7xj9jjsywhir1x5f47cocru6tl3ai2pvcwupilltx0ygttfmdr2zmfnd0n1tndhrk88ce1quhxxsaxdat9o0mjhahuczxy2vinejvvtwtu05wy2xbteayw1y7qspdv4zh7mb82w75dugpj4z1p05hnharp2g9zeqs12k7i492z403g12otmtdm19mvwgwcs8g2cph6xjrcyhj3b3zx4vm3ahr26ojalezqmzms8dugbgxcucxszzw5slo8uxee5druy8z7hu9t2o0gu4yv6t93am75ta7oqg788kovwvmlaj56eucvf050wd0vtl700jor15j5dx1ybjywpwv5cvae4v4sefjyj2t6z6r5mjk6ne8yltmiwt34wxr20x0i2btsunj4ysl86rx8c8p3f9irbfaymzsrn1y82b04ycqctpibr6jbnvouldmj3judiv77req0d80vma5a3x0ji4h38mntwacx82fp9r9jzcrz2okotxbohnj9kxdq8b8gv4e0zsbsh3xq4mu597bgwb6d8u4gibdxk1lejuxx1iwxapen5tr400k2602x2gghyva498z8lft706fco0qv6ej79jiegj5r3obriqfxkcd1lathy3u4kn2oxuwl9gxhz462hi2q6k252oxs',
                fileSchema: '8magnketeyr34fytpevjxz8ztgbeb7an3b6l6eqj8249dgnjqtqus7u5s8h3d1onlbcep1ezv0wt6f4uscfov3ij0opz62sniothpfszin9uwoew059koxrmal7dnd30eo3x7771nwbm7t27qvp2obt8gxf2z8njq24mhjtupjm3ahquvghakmiiqad1g0hlfhi72lggd2fjzxp0gcrlar7tnsje280qe746tg0xte332g354q70yb16oa368o5g42cwfz3h5bfzskxns6ezxej0khdqavolq0gju0nzwvf32conzu8szzwzq6dmjvfk9kcxyenjtwv2ar0rt7z78l70dk0fbbck6rdyc4e0x8w20mc470yhoxigdwv9r51ex9w9jc2cspbp9hi14ducearihhm4p7bni1hbc22hzdaojlgt6qfxk3erel02o6lcs4nl5cqgi18dwjoz7wu2faxxqng64ispyyo62fo2l4yhyajg2x58xd37i3fpeedyn2zs4n7hfpakosfdak5dykyna2dcx00nu29wasziua0k9xw8zauk9zuvqcd24r59tqry6nt3gkl42u53s8aw60u99unxeneynipyw6vk8g9qbqh8cwnol47hdmcezgcguk0ie5vbiddgtokhfm8p4ajyabl9ssrnh41s00ivi3qgzh8yfwwur7fojyg5stoiiq6qrna4ivjge60s43g67de8xsrg08svm2fxftwx1mj72oucr6qoye6te1frpv8bqfwoswwua5x8njlfwfssjf1eo8u9svxuz6epxjnb22ficcsa9hae5vqgkt3qe5bk0vbuu9wlo8eiaz0txgcgxf8m8xe1ft56d96jlhg6qfr75mda0uzr9wm3wgvwflr41crobmul780pa1t56kibzzds5mm5tqo3vaw0m2o5pcfopq4ttx9vmg0ugdz5wekx0s9oxfauflhlqgy5fcpo25dbid5ykukp998v65zed6hkgwnmjx02eocwwuy9l3p5',
                proxyHost: 'q6rzp7x9cckn5ucseg6rpq8gr1vc2j3fdg167nhsq6q9lgivv6v43o46948i',
                proxyPort: 8568536836,
                destination: 'xawxmj8vtt0x7p5glhorljp5mhp2bdfan93wsb57abxhfjo92p5d22kop4wtj2k68765f6h5s9sm1wlgp3mxochcn8j4pmmtjfycgu0czbiaokp7jskifxqqbl002ba7yvbeo169kera1dqsclv3y2ddew0vem6b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rlu3y1q5gzfa7n3jzhzkcrrpvkzjcr2fu5c60ekktqgozigog7l2azaixnkeg1bcc5ao0wzr7ph4ik0g9qhcvnaawrgv2uhhsf5sm7iyaplh62sfi32i8bl8o4lh0glsjf8g9sssz36x4x99n7g0y38ffk59i5v8',
                responsibleUserAccountName: '9yjgmqlh9r74kk0ykrm6',
                lastChangeUserAccount: 'lagulrxa89umwz2lge44',
                lastChangedAt: '2020-11-05 20:18:03',
                riInterfaceName: 'yofk2sb5t0yuaerf98gh8pr8fxgnuyodatc5u1dbff68wxzyr52373dkhmyprzv0ad4cm5kkswc5rwyux6pudeljk1pf2vnwqpkrmqqs5yvtqfm6r5a1cqbvg0zhbpl8pmkl1d40vyfkjoea25tqdd471ar29n8n',
                riInterfaceNamespace: '13e7jcb4e6pw9j1lgchz0r48h1d0wsyr7afobh2pn29cyaysgzuoizp2picgn4emlj4xkhap830cu7oaemuhkfska4ezmk4skuz5bme2n9zoasn1ch9s59yc5cg2vg1l2ofoxj24mefnecc10cifhrnot840w8dy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'mg07a8zq8uncl17fnlljl9cq9ji1fjvu5cihwia1',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'gp4k3jl8m6ulxxf46lswdb5y20ojythmfue63rtgnfby9tdai3',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'i3umuf5d4bqrc11g00er',
                party: '6ol5p1simugdvx81wr4y3tidrnjwhlt1gmdmojyxeqjes1zesywlsiza8hg65qihvfetch4tj9x89udpm8i8ao7bmu2ruf4notj4dz4lr7ven4br6ixhzay1dz9cfuqpt74hoz7eoog6zxg42b50iyx4o9jsl3vg',
                component: 'd57jgo06dqldugt67nqdgebcv827i3aibq8e659dis5u4usgi8m0pc9yuq4dr43o6p0xc6d7rr560bg19vpbulaqj0qsmp8wmcott11ay8qy35vi0rzw77kigyon5iowqs7y6k0yz4qgcfssbmfw0mlpck2k1j11',
                name: '7g1rcb3mj438slyrkc1b5jo8gf3j8qsuo3nx4a9510rq0w4qvmdsb7hgcg3x0elryxxe3ekp3tkssxcw61raofyii44idzhfzngfxjudc21dsi4or9yeckgny910oobxk1ogifqncykgg8i144r9c923eispznvl',
                flowHash: 's1ngkdlmsx1mwahhbtsu5s9ns8xr2sskrf5uth3f',
                flowParty: 'mg1uy1qzq6v70mfzbuvsomnp9a3j3x9meoj9939jtb26w8lehmpcccf0vgtqfwg8z1625cjex6p1kn2s9b8djhd2dpo9c7d23rufqmcrua0fxksd368rm75xuypnjh7ww7uchubz3aeglelsk53yqb3881cyd81n',
                flowReceiverParty: 'csuf1gu4j18rusg5fzzafvwglrbayx91auj2w3aepgdry9auasf5p2rm4n92k6ada47x5oq7kb5jb2vcflg0mzl967phrifpv5pv5363lhqf4i3a7y19vr0j3zdqc7wb8y5fqvquyxep3zjrkz4vtfogxkqkf43y',
                flowComponent: '3ng9le81ncn2falthyemfz5pcg33v1rmjhws0m74y2b769venzv6tnr0ymylrp6i2xif1itq3rcbqw5zsq7fjcre13r8njw54vtniaznsyw7axwsztjfq56kzeerodcnmalszagu7e44kbbuuf30oliw1oc5qn9c',
                flowReceiverComponent: 'r2ih64uruzqfl18duu12jxocvcetwbyrlcabmcf4zrnx4prayzmbc0h4xyikpbap5evymji9zb3id8a5ye70ihs6k6gezuy4bezki09z7oycrcdxaw4xmpeykdsjez1v0nh1d6d6i9xvrjtwdnyzdf6you62s5pu',
                flowInterfaceName: '6ue3t372cexmu0scfza8noqyd9vy1x7ai1uddp8159t7lwftiflhd05c6t4a4a2d33su6wkj9m7613tpg4nfha5s3vxibamzsj1v43009ro48vzvmfenxd4fhech73sb8630ih9yphl4hc44x72kts7werq7d517',
                flowInterfaceNamespace: 'jm5li0srlok4y1vy6kwqn745n1oa014t6n3gabadb8gar10gov569sqohcwr5awu2xttttz016rnu7mu5cy8f82rdydbntz5cwc95ob10u17iiickgalgunugzmwvpd48gicw0ysgq4kowy6fspqcmxzp9iyieuu',
                version: 'rh9obbmz7d897hzns3jl',
                adapterType: 'qnwy94tr1adz51ufju09penyaiiv3xgzcv1afwy8vai6lvmrxlha0tffu304',
                direction: 'SENDER',
                transportProtocol: 'hpa1rwgvz9ciplhs6y1p6ip72ysuk0v8qfw1zv6fe7eprfm9ubmmpr7xwvp2',
                messageProtocol: 'l42tsq3l5pz5hsrmktpks8m93qbp7cxej404ysuaswtm593d9rkw73hadx8ur',
                adapterEngineName: 'd46cwzdfh17tcykphyouansbe49ictgcbckvstpgjxms8homp3omme63nlrzjqlyglunsxx8it9auiw97w2i1sglfqcksrlr80jd2nr1f1mzgfghbdltglmg4y3ykt948ixhhqm8t35mbt7at5z2cmoym13qvtzx',
                url: 'adsdc7mv8xvueecw1wdeghss3avhb48b0g5lpbmf4hmubg5mqty8ekfyshhru979tw85uqvzjti17ivjnxxchcjlepmsgyuqg634ec4phwiek3r7ajj0f3qy2uyv5bhheqp6usekoyeitb8xqdu002stwcusjbhc4jr4sp20n5wg0v6abaxe2g5cgkz4x0p7pf0l1iolrnzsog1hook7trps5ogzgdcsh9nhu3vuhz9semr3mktp6rv5xre5bylkpjhcutviqz59iwpaze48livwvxn8kvive4yah05a9eldan2u7i95cfkxwpur0swg',
                username: 'shfryowj4o0qdaggapuni5ggebel4x8q32lhi5gh0ran9e0e3r7i6yigyp7t',
                remoteHost: '2ofioley3pxj19y3fwg2zux2v5keb3w4qto0jv4m88o4hk9yw48s6iviinc52aqglq4dzkeuu8ha59gjyb5jtywbucjph4gsjzhzmn571qfzp8yes3cuf1lk9a8dvdea9c8sjaydfugzdzisat4jt7xhtrl1h6ca',
                remotePort: 5737928643,
                directory: 'jrh8rrsewj9ts2leo7dt93fazp86ap1v68mr0v7gxbzh8qxbduysb78qfvs9b7ow791vhkvmohw6nqs7vgl9jjacj27ow5rzraxxckgywfqd23q3oyu1684kurrtl077rqhla9x6pp6hpymc64mrz9nxwkptp3f9ku3yybln64uibscbl2oycmvuyyuws9184arx8q6fkms2jt15aas5rikev14ab9u1x133hvo2t5qql575ygq3i0qxjww5i12rfuso2qbjedc8a2py1hmbme1im3c20r38sftvvpsv79h6cd9p9skqtslmngtrwi4b08qy2z4tka20ojb9hcz6iribc1r5bt0xp1fqk0dgcwyieihkppehgn1rivpl7r9g9vr1a1xsk022wmzrtl5cxcrpsg67tm5u1tou08r8w1o7jg1xqvp7d30ekpt8ke8rtd0k7ararq40lslgx33dpr0zjs121xx6s1n8txwpa2a9spqh3xyy623sv4eq43vxyl9e883qahawpl93e1hivsxxxsfhxu1vwk73ztyj0qc5xjmxtebnrr8o8e7ynt2bp9fbs5aq4n9cmd56qjnv4e3klei1x63tbhq3808dm313f34d8gcbwavoujd25bsnflfjspuvp9ka2o8k7ompv3s6uiua5965qvimzlh1eagaxg76vwfwv2iayelse4xc8plezew8ag1n9kk2ipur15o3n501jd6udd23iv5ku2arla2jg9ginrj4ja9vp2zhrt7epidhd0ydc70omz0jpozkenqbt1r3uiizkhbwavimy5dqcnqcnldzx9q2u3l1p5t7k6ohhnq2m1qaxb1pngz7ind2hft4ha72eoaxvwegha3bnclxed6bts3l8oh7vzrkvncoh3t9jma8qw6lgt2h7l8ucu1sm1pu3kpjveqmyb2u7a7l2b447ytfqw0uu3zi09pk7bj5i973zv6hckr6k284hxsh4cpqu6p0ubpzj4jgdxnzfq9kv5xrf7gx',
                fileSchema: '9nfecy6k1x73wk6xpb453dla0j5f3y69ovo8zwf1481f2xmvfrfekr7l4h8kw4lgj1cs46px9b1jaz3f2pkhvp5cnyw90dje8px7texzs8x81iv4bw5ddhwlss8nxbyulxkspkqkfqpy4rmk9d0sjuhba58ydonuyvi3m6hpnksdqj1adm9qnv1g1t59kea603v1tmmevj8ztiewgbi4ccygopikkethun0usm808u0jyhb8mxpvo1k9qlr9fqxbe9wprkhnrmorqzcaobt570ze4othkojxets2qqzvvzfsjvlqt0fteusxywe0fuibsnc1euoaubzn11ttwgrfcq1241c6otmawluboyjpp6g385u678gbhlpvwl5pnt0db1cqiyewygihu69mgju8kg81crxjlg61x6jbuoiqjgglr6pqxh4jegmfqtuxpeg6exyhf7tmzgun2lq5odzabbcm42utfunijxhkuviz5zlinwj1b0j9n4ql0ulzwlseixawmd5j6e7m1k4l880hi0j31j4o8hsspamjhe84waabj6uor8xxkgbfhdjv0tb7nnhk4skcymf69wk0k76hrk6h3k6x2bx8z2tbyjyzjkf44xcpukkf1f9di6j7tzii0dalfmjv21opcw34m35t4qgr43106z3k9x1mk2hgpqxy40802t16xq1langxxel62szdr85y5xl7euw5o9pyk3nnkxtmlbnk3psoo4epq4eupria4g8mms4r2gg81rtgnb01fqld2q6mp9f99nox93enodqsk2cibhi1l81mqfdipo14a610x2z6izsee9se0k4btzauqm32r557bk27dsvizt02abv2ainqi0lumphqihey0m7aih9kbvfvcjyr4se2f7k51bidyjq7kk0yb75gtprzidpdz5h0ybq2fododzj1hsxg3cj50idsi7u2gn0zu07uqaqsb8tzyh0m4ef59q7z9fhkv6a945oxeckltmwe947n6viwor8oa99i',
                proxyHost: '497qzkw8phqwupwq1bu9m325ccbg2x6irhu6hwi8zk6e7y7iraw7pqij9sie',
                proxyPort: 9948194171,
                destination: 'fdrul00l586q7nj89j51lu7k8bxga70xidm60789mrm49mbzhobren1lo73icdw87sz3rbrd3crttnlhjh7tqkyb505pusxyzp5hgntrajrhaxsb9m6vu9oquz47muwrv3e3wrkyjgrkmowezvbycurblrhsq4pe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qo5rr2atqen7a1gffhkt0f53dfvcy906u30d723f1hkwacrbc1a3jac1edus4lispxc7yqfweekshepk3pemsumna1kgx74xhcmzppqt4c283w973xaofblf78vm3iw86w38vwtksb5zqrngtxhoszkucg9lgpiy',
                responsibleUserAccountName: 'e9v4xyucu0isdlfzj8vs',
                lastChangeUserAccount: 's0zd9mlatup0uhkurusu',
                lastChangedAt: '2020-11-06 03:40:35',
                riInterfaceName: 'xd3sdvwojuxbc5au1tw7s1wnb7sjfiji19hj7yzjah6rtlznt53bbnbwdega2cenaq7bni6e433f9pmnsxz53uic48gl8nepdm8nmvdpdhy918fjvebvuevfiuhfgz8d0dabjt63nzqxt3kwt00m1s4wyxu4d1uw',
                riInterfaceNamespace: 'g2lnxhijwkffe19gbl1nzywzf4ul0soh7052h1ulru2721lc7hleeshw1i4bw2c1yav6trwadf6yvrclmjackju5g3f5uzazdu4ht25y8heak9ovqd20zasokmkygng4jsb42lzicp0ienpaez2iue5o3ys3l1jv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'y7hbnyymgwrrr770osbqsn61yii21286vazuav2b',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '5wobm2j16f2n81hax6kxrsn2aa932m2lw0flkahae98uu7xwhz',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '7vhlvmeirh4dee6swx85',
                party: '2cophucwp69jjwa5hwni2ep9wl18qj8orvl38w5li29h14cu4mt6pkml67y2xvq7fkacs2gkxjsyvp58jb7hbk8tndhc3h4ez9y7m5jw9784fnupu5ziyhnhrwcrlgbtqckczriia5vhqdmk3kfaslph4davctfi',
                component: 'q7feg243fxbomh6290b3rcqoiugxg5kmqntweh8hl6yihkakynibr4w2628vjx7468hkrj6go6i4efkwpia4k9q6ogihvfqbatuta6gbegr8ib2rq485stl5r2pby8ojiunua2b2q3jgmpnj4a07ydkfnykfz1x7',
                name: 'nwlwwy2omtdivoolue6qw4xbsfst5qy7d9ohteo20zuaysvwfzwfhiw0hx8p9h9js0dk16xyxtwquhpunqyuq1wbbn7fjvr7pozjl99h71abf7cvuj9u0xceiaxdmkkm4vc9ci8xwxuaf9qfuu055qcirtp6iu1c',
                flowHash: 'xfmwui3olu1xmje4t504pr8mqi44zke5duuly7yw',
                flowParty: 'akrbni9r6iop3580i8x3mug7kdhj6heef4qq7b2zng34j9senyyo2a0d5jxc5opr4ef1egpi7sk0c79bq85va21ox0xmhjfeytmc1tfcloh2zqo6ib6ami8ggyhi2fj6c5a255sjuybez7p06mein9m8uvoep93e',
                flowReceiverParty: '4oqe0oibe3box2izs1fspho1lhsi7328fri9oxp7mn1001vxzu88a5pw2dw8nyh4qg4l9sw49u6g9zavtqp70oz2r7fp738a9fp35ov5ln0q5f7b8njolpyx540kws1iskpgum2uky9rctpu5ev0ctxbm2q0pz4y',
                flowComponent: '0exzdrisdi1a273t7xknrsdq8qdlkorgt9rco8qn0ewxfffjdf9qy5va5396dt2qzh1goxmxsdf3ozs2ylot9tajpzcyahosjazii5dgbraatuudpfdda4mv2hqpcj3eiq59ru2sgqfbf7g9il2c8i6l4jhql2gy',
                flowReceiverComponent: '6twuqx9va4c6iowpnktpf7qwnki4bhpkfw979bdeji92g5o8nbusd7ge09pi9ym2sf9tui5wzhif1ec3xu1y9tbg2i9795345l67dvefklwe5u4jvduzvtwdk5098r2ifm5zqr0ooety6yxw0fkvzkk033khfbna',
                flowInterfaceName: 'scp36sv5zof6ac1ewwr4k9h2wbr1tomg1o6sjp35lhe3m2m74l46lm1vc3hggu0ycyfo5sbnnlgyfgdh7jhb5rrvzox78ddtynfc9ubfcu3xhp2j5c4feod4h2h1wa51qkrpleg86fxp71x79gvjj526b344hfv2',
                flowInterfaceNamespace: '9hkjl5yhrhohtb7312qykdfunfdqp7e2suiyzjkv2hvkpi699gaapmnfqrpiyvne89rpwzc3q541oyyrudfvvxla9odvspe50p1exf2h5eemssefsn2b1zqkltq9p3zfgsgug8g1uh3xsaqo0k0i07v4xsdvd8px',
                version: '9rfldk9h88tvtm3iyuhp',
                adapterType: 'cnc2qju26aa0ax3mwf1xeei8lv0gc74trynrdvq6gswjpzdr3ghv3853qgf8',
                direction: 'RECEIVER',
                transportProtocol: 'mejed8kesl23180a6jrsyvyd595p3cb8rl8ukxjcfubxcomz1pvjli7xicai',
                messageProtocol: '2pfok86vhrdpd6uzkjlomv2qs17dhtboofa1wttopwbbvhlnrhukgddp7v0m',
                adapterEngineName: 'h2u2r0eftczdfyuot3zaoqak4tivjvtbm1q9bidhp2i3u2mqcqyty9gq08dpcmqqcnba679tub8ika1dog72gj314dgf2q5p1h4i9zyqzgg18effk2rwztq27ypcvwq5kkhbh7lf64v5hahioddcekmu9utrr8n8m',
                url: 'aznp3tnzlz2r90zbh4dqzt0nqoc7c0jp0zmou9ylr1f67tw3pfx7205iwqzlm2zf6exlbkxeupbbkgscezxutepkxi908zvwocf3tm31tj53yjj25nhydehari4ip2lgfyie6f33tmezn3howrx4rqwaga9ruj3mn37n7kuithicavefodgerd8tgn6vd57hjwkrv6kym0ibmferwh3x8ee0inopi75pfb3mvfbrh5ehvq43molcwip1om9qx8znnm8e9pk77uwz2lain5oq6v106leegjst76oqf5qom6nk5qh8e1al93cnw5ewn6xx',
                username: 'ratz4ae54a9t2ds18l1aovieogc8end8o5vy1nbwcm7p492hxqnirwp8urbp',
                remoteHost: 'oad1kla6t1rt12n05srtc2q8azuvm8tq1pvl68uegxayxur295e3t4jfbtmphn8t53fjbzkgezucw5ksdh110oy1pnvlbtza04zdfdrpaosvjh68j9gx6e2oon4boeqfvtevq48xtfeoyv43e0iumobgiy1s5u8z',
                remotePort: 9697107165,
                directory: '4zyte7tds7gbiuidh9bbspzez8dz2azr865odq4jcmvmbhd6pt2w6ityevq00nk84r76k572739vna7d5qaycxw6sfx72r656wrixklcbdnndaqzpfbxjyb1n1j1m3z4cki5ddeshha70d1tbii1f4szdbyv76y3rlr29xxumk7x4b74n65ojqr6df8g1j1ae01wzb53rkwd2s8b037oo1wgo8mtdhu9im6lzxc3pwwiqdx5ef7jisc9na7pjuyl504gu9kb7o1igsls4kfx5lbng2y6rre49w3h18tyouve9m59fejll8m0kh353ra6f15f734fzvjlgrk3h4z88o1gkrnoiefa7qxslchfkh5vnmcw4skle13zhj1yurk8zvp0tnkpzkq2l61rg06v62jj52017eg94ureim5trxkai6uzwm1d5p4k8n8c8gr3x3bm8unizj97tjk9f4r1a11qum7pjr36uu1nel5kh2p2iq96lvhzq52iv8fgjad52xp5dyj940q4bdxlkuuzcf19cosz6pvhsg1hm3rwsmomhvtdl7e3sh721ty28yung0or6kdt9zn2j81lf626c5vnvpvh2qp1dxhco7vd6h0gnaj2kwyp2ik1s1m5zqflfsydptun1cxg4admkcvdckmlhz37j83txbdx4e7qufqekavwm7ecflwz2d0i0hraxiktltvmm000syd73b65d0s03qogtablq612cbort57fbkaddcc7dqoccsfewzk8dyd0krg81szl86okhrraflrxdpnoeof80ws4elc5vmvcuw4r9xfaoya9hw7r7c4gqgubvfcumlxrcobgmvmiu0j5ie8ug0yoqmzmdjffehq0wd6domh17rk9g66nigx5qi7lywouj3c0jglhgu5q5kjde9b28s4f23m620fhalxftfh74z7hds7dpkyj4r2hjyno7ewlwwa85zd9y24c629ex4ry08o2jjbpnwn07n30xnq146jm33y7gkox47g1',
                fileSchema: 'lltmu1e1xgfqwk07itn60u0c295vtxnt65pa5pjrzkosq6gwjt1aag0ujwq775hxhdxmh6c3m6axl6y2ckayn30lzevpvfsbsblzm34oqaohmsxhsz09r6upt9y75tfoe7v1ve3didrrfcju96vngjvs96u5yaoqupl9xkcqftjmvtvsp93de5etifkiupghbc5hztxpbi08rx8kg5it6rbqkjck3e2ld7hxgfm5lzy5f7mzq42yv0a4tnpqkrtqfl6zgy7hgdu0f96am3y7y4e6eqkzi1r71y40unastu8relnm4xf3c28gmn69tvvc9jnki7tothc8wzu87hxrpbpb1a3x1gi3cuwq70k4zn900wn7bpp2zhenm8f5utep1itv3yu6v8pws2sr540nparvg9h51ok1x66g5wyr2kdp4xjrxx0dvxv8jo82cih7gsjnmcpozo6n7178exdefswbxnjonzianly51vubeybuhl7ipby3zcjnfjoc7slu76ar4tjeb1s75v2p3gsa49mvdqqnf7hei2b260oq6nq1hknma9clv6b578kx81a796bxop503u7pwqq641cbuw8iexchluq9gp9l69ck8ube88qukjx6xfyucidhwjdd8ycjehobvm4asremktzlioed40gbk0974qmlu0my260xn0ie7ne9cfbguf7by89r8i1tms537ogxfhhpkq2zolhq859366cv657mopss2gsrj0orr57gkp10i8ebv9nuidisvguny1ab8bz3233nicxdart6zgdav24ychsmeym47p6qijqwo7u95h4g4tr12g73bwculg9k3chfyv9opvafzgr0hy4bh0krenti0vjim6h68y2oegu07z7pcfp3k25a16zmb4mte7zp9phfdcaiy1ivnvc4vowepawb318r9qweiy365hu9ci74qzwkusk6f6csbzxzj9ht8odd3f0w805vpcfc2wo63yd2hs4cd7owi1rhvbm9tkauu0ks',
                proxyHost: 'a6z8getw53iwwnw66l2epr32xfo1vpwcro18kw4tptwxl3aaqvdoxgoshgk2',
                proxyPort: 3281494139,
                destination: 'gga6ntbdghpnfd72jcd2dpvhgxjiahhw3p33ytamfn0zas7a8j2qnswr5l84h9w16wokkq2wnnv8foirl7vqv13c0pu7epyxflkpckr41feovqrle4abjch3of6rm5q88v6q4j1tng9v32iv9jkk4g3fsyuhu1wu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lp66rpkklai8e5g1h1lgzebdi41utdmd1ql4vruel5kycr22g8zr6mcqynb7hjaj3pkck9nio6cow4q7txca98uwbm4pqa8jdul0lngyx27ay3dl3w9cubppxb30ywymdp2lbuy69f8c7utpt4lwqfgqsy7uio8h',
                responsibleUserAccountName: 'qj6gwjs9k5mfcw7cuqlt',
                lastChangeUserAccount: 'yj5xjfhi8kupgy2m3nqw',
                lastChangedAt: '2020-11-06 07:19:18',
                riInterfaceName: '9cfdo9m61kl30xa0d62fy036q58wik0lvdrumwztp8co9d0t21upo3cs5i3qiypifcm4q5kz310a6rz6gc5gptqg3p4ehbz16hcjjcwxpakk7k4pdvqmyykr2d7hi029c6tohn0rab6np94wfp8qlmexr581mkfv',
                riInterfaceNamespace: 'laguhvhln9wpe6r1er3j4o4rynt9ngmonh4u2v0xgi0mtl3mafi4cvhz5bmxy5phljyc1d9vr4xhjf1lb9ab1xb4tkvw7zs889yrlb0vf2wfszct2miq6xlqoi6g76qw7lqjnarog9iwd2o8afpc9us8v1s68xz2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'q3ngafuvrpii27b0gvaz3i4tbxeipemu6zhmgb3c',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'fvyqsf6v2e48t1gfdaexyyhmgfax4hev7fytl6n7iqxlbizle5',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '2ztilte416e3qz556cz1',
                party: '9im8b455tr0kcqd89ok9fmlunq5jqmb0a3sdnsebulfcuampqaycqgogccnye853viyo7l1wymscna81jyy896fzlytpj5r1m14kz17fucisftth25w6wb65oyuxo2pm7l4lovfn2lmjr6uqpx5lhiwwkhf89yvh',
                component: 'shs7dyql1yus9jo8s09og32cyf2i45capqnx9apjz29s08lqkkl958mf2si1d8c32zl747blshvk94c9ppzvr94pusdf632qo8jhjdv7ida0jec8hqs1hc43s54amd8b2l4vg5ge4qhge4xjvm4w70uf1ps7gzq7',
                name: '826b1gcr79v7nfqp8lgfgdiq4gteqrejzrpgad4rrenj6th34lptmrb7rhbn1mojisdkplh93276lhwhh5a2s0zaaksng6zr7uk0c0liahgvny6vx73fibm973yo43jr46zv9x4csxs41m70kocehankuzark066',
                flowHash: 'u00mjxaukhlxep2d4b69sk9sxtsxwma18mjkdjr0',
                flowParty: 'pbht89p1oykh3hja7ut4uqvzdnzi42253vko5fq0usukib9oqwp5wef06iqfpuzk0x1p3p9poklupny4stviutozv0fcxmlks5cmvvflgnprat4ldoj72vpb3htdzqkdguncnwnpdhoovi2023o3z45w99q49y33',
                flowReceiverParty: '8h1nbqp749l8hzwklayhv3pih4qyk2rfzqw0tqbnv97uolhprgcb1i76jyd9bld589efo9ft6qelecm3qmi7lo8d3s2s0jmfjdv3m9tp6s0meo4wa01xhfph5mpp66a27r4x45xm46bdi5xlvq77xd3a2rjstnhe',
                flowComponent: 'p8x1e27uj1lr5zvrb6vppsqb5y9vjl3jx2dwu20lbjs1c2mkdtnc2j4dmu94i15bgt58kn2rms45te6yiwmdcwqs5tt57xjjyguominurzeifms86dv2l5elvixrvn6t07icxkexihmqawmhngtl7y7cyyl2fvyf',
                flowReceiverComponent: 'zktyms8ocw36pek9jskcdn0ci5bc7mz2sq6mrb8hkt3yxltz9yjv8xszljde005yqwk6287af54h9drk66tzgxmzpr39qfnndoma4nawkdci13zituzerwlgf4go237caawdvbatu8zzaaslslrwtgqua6p3puo0',
                flowInterfaceName: 'nwyc01ub7fqku3zithjorsaji3wl8ttwbdwf8dr6qrtp30gkk20oqkxjhmvmj06dajspq8m3fo1cgr9xdo6loo56zzh7112ljvohmiogdbrie4nrrqysnzaa52nrijhsrb4lcw8064vevxvcw5i14qgytw7xh194',
                flowInterfaceNamespace: 'plqvy6ch1psrfz42j5tm9a195esxnjy71wqf2yr9x8ged09i7g4n21shrjs06girfkuq7n7inry21kp80gbo9jfzfcjxl0zfdxzfybkubof9w280onuou9862hni2hegghjzeky5riromj0vxxcz3ymypz74k6uo',
                version: 'sm1s4wk9txe15btxnyhm',
                adapterType: 'ata3g4vo6cljnwc3ur26r5d9j6ungn137c42ikmcksrsze8l62jvb4ytk843',
                direction: 'SENDER',
                transportProtocol: 'ts4d949nflhsf6egd2983ym2lr1ohmulrobicbwvctmpr5na49a3eeigu3vu',
                messageProtocol: 'bqgp2z7ugzqpjj013mhcg8bsrccvz5a58a1h1ncagsevberp1iqspvtqlv5k',
                adapterEngineName: '9h3ommsf65k9jmt89fb9xdstenxi9nrswjcug9yizn9b4b46h89reypar91j2m6yi85oigyxhs51zdo4i8iwyo3t32k4kdq3ymfvdnnbl0sg9i1ab3abs7sbbywl95aev7vs6uxb7i349g6653rtk1nak9144xsy',
                url: 'pa83ownnoplydhjbusp0valtynm13f1n2c9z6w4hzxnnb232b2h6qczwn0jbfhrpxbm8wizisjo9tv7jhtka1q8nk23bj8ehthyuhup2wph633296rz90dsjtw0gmrz1ecu8v9s8k6gz3v5ek9l8hs8ylj3bu8h7egknz1wnld76nlg73uh7kcfulvqrxr84dk6fkelkgc9ewpv9eb3q0f418iz5mtjr9185yshehyngtdsgwbp44ptjjmn74zygcd7kt3lvejhhwe47ycrv3ll24fgb2t4b67q8e39t92i5ajg7jbv138gofx646cmyy',
                username: 'a8oeu110sp9bhzs65we4efeqzhukityox68f5hi5b02k86w1fgqtj13jg5mf',
                remoteHost: 'kyc0d2nlvtx1c8vdh1n91b6bu9ejc7n37y0i87nllz2rdfvxb4txn9k3kh0z146yaxkunghdggpl15du5z64ztok52sc0zisygu0vk0sb7saqjci5cmc4hvla86aoerepsnpt3hf3ev1ss92w5oau84q50lg6t4e',
                remotePort: 7607878754,
                directory: 'ip1hmhfw20rvwt3x9mhx9546levju4t8xsmo0t4s8zc236bftfonjd3rpdurszw4ljgvcvcky0ltmv6x5roivrn76q59y4avyhc4l1snxjkgkdtpnxmaxw3k29ukqj0szszmw22jrmqasqlms47h1ko37hmek09lg42m86zbil9qcuef5xpcv1hbc9nickdqn8nqnw1aorsl4y7efp532mhfit8w4jd30i0zs1kokbaiqg2nw5wmqqe4rjtrhwi254r7oahuybbelmwdze3e40n06i7ihbe0az7etgrzfurkiqj5p18jtgqduz1w2mynrtta0as4azu3hfpfyidj937l759pzrs34i68ydyvxwm0q1chbafzuwu200m0ir9bf84o8vw76fcepd66ne0i9em8l2f2bjgeb3psrdeglig6xy7ab7qlyb2k0oenfsmtkewjc5lnk1cj9og8lcpn5k660h0rf04khx1ujjblc9l1i3w738en1jqigbfudgmam0y30u6n1y5i8mnp7c4kolp6kpswlurvcsnaml5n6rypcvqlnt98yxmnsujech8okl5tqn63v52bxpsfndcg8m6tq3ek4mvrw6z875e0yfthrimmxj33v3v5861ru5l96wuud9mq9jjwblqr9uu98ysrnl1ll4a6fw9ajb9je2z18gzmag4021h0p86jnkrfpcpeohihfabuabms6hymu17ltmayzb9z5b72f9yzedbdte13dub3iu7zuuvl4h4cdo2ffku8m4eyuzlw54yvxiqhjm22qzrc4fsw8hibgx5vcg8nzm3gfpkdx18t2vuz6t07lggds8yg6w1jnqr54nde5t8ljfokvh8n3m6o5mk25rdwebtscvgddbvxohghpye2s5eeuxd30n0wim2pnebtk2d2kp6ws51zbrqbmsp7rx0a5nzn36a77939c6yxndtx5ku29u8nf8tf6e2nav988ucwfp1cbxjuprt2s9uduvuhan16qis3iwkz1l83',
                fileSchema: 'sqlj8qv9tu4jca4wvge75w4jcn9ehg7e8w8bo14scfhgg654fwh120emjcw8t5dtubqcpnyfasieojprpcmvag5uk9ldiu53i2rdo0gulguxpszqcn7fbv3d0zx2boxoigg07gsmjira0hahqv35r1k31w5zjbzs6cns59joi7ry0i3p6exinzgewq6470mtffuo34ep7bvs0wighwvj5fsxgvqb10dzkjq8pky7f0r6r691evr6yj5n6dqly87tbxqpe7t7jx2fz61nfalndl1ahcl589zzyc54lnzex18sz0wp2oxm7q95zhm9za0afp4k7kuqqlt2vv49gp929at7fz95322cmb1gmdl70c732oqiejw6ipsttu1z8fk6ze11psdx4chh4ro8oc8anah2quaj0d6awbzn34bzisp6dik99b4hlb8zs1py7kszzg8ixtek1stbicyttnpj070l1qd71jiegqn7710bvgxt3q0h2io3nr3i3wni3gwuf0c7wjp2c8kyc1s57lrec63rzzigvg78lrlysqmrwtf776i9mrgcbcs0nnxxeh67nptl8awxof7q3xuvm7vycsx5si8fp07ka5tz7gpuatcuzf4jpq1ybiftvlj0szuf93v4d7kx7eedu94s10acxhql4zpdxqch2rrkkvj8hqbyju4ic2ba8xqcy2d48abrzip408sbzx556g9e0r0tpe6bm90ykqdxcqn29mz93ta4xfn174zewv7iw7ba6645pdmnqpex9gpk74rojlwdi7fkjgm0gazbb424x8qm78yho6ttprm62cnj0kyxdnfkt5u2965q8cr5cpcudi6fq8q88t75cgy4b4k75qralzk3dfc6rifgkahxamf28le3aifla7f92ozd8sgnd54fjmi2czbbl9gog0gled1tv9nhuf3qtj3zi9k4v2a3rhii1pthsron4k0e355i2hz2oivvhhhhidblhlr68hgsqsqzdzg0glkknql498su1ew6',
                proxyHost: '8zdb6okxm9uaktofpq9daabhxbol5h33dqbogghyf2e268k92kgqnbqf1nil',
                proxyPort: 2064448889,
                destination: '5yqbkw8ytnqrrahdd3wb3j2bt90y4gtkwt9o909bu2jgosw7assrzi6k9twilz3r9xyl13ng8kpf70musyx5fhobiofylbotcigv5mm37pvyclo1m9lr5rpzuf7zhpk4m7pqpf1fiid8bd0qt0varyqn53h9ntrp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pnjafjr3hpbtsb307kxfnwavqqrmozquuuuc1fnbvd4izirsp1e7ymblou1u4q5it163bhgxaka2k7g5x3g4stneml4ib8656aqr7u8ooook9v4c5pis1i1q4i365ftv2hrmx98cek194wy3efmdz8gztrpy3o1r',
                responsibleUserAccountName: '2wh3nnvinoj3ojw433aw',
                lastChangeUserAccount: 'm4ous1lksrve5bppjoi9',
                lastChangedAt: '2020-11-05 15:35:43',
                riInterfaceName: 'drjluh8kwfb1eud2pfs5m95g20kx67iomd421oan6wnet4n6ffg319qcqu41rxijhdtfro0v5jqjgsekal46iujwuib2bgrx5acfsx5e6eg3cjyb7p8u37wog4o546tu5lijfuiczhtkgfq8snejrsl6w5q79ols',
                riInterfaceNamespace: 'm8st4eq7d7kbytsymcgp579rm8mlmvagpeqfdgnv9hbaoahgxu38i2d8z2ddjl4moj3e3w2qtck85u7n9655o7codsvy5wz7nuszdnhne96q04zsceyspitmdsw6v7pj8vjglb8hca5p7gi8tdpn9ddzvs3p2d84',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'onk79ln6jpsk266zhf1erlumclwkr8ny0qdum7ys',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '5ak5g9yfj5ig1lxoffsg8fp82t5f9gl9ps7qz3rssonrzsyk5t',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '3e78pufo9ik47wpas41c',
                party: 'fwb9wzwn5thcvap39auyyggfa46benp9b6jzo2zlwzjrhpsarabs0axiov1n8x72zhkcf0z10px7bt00c9sehu3bhy9bfrivey3jeah9t9kkt8jj062uspagpkmw5tfdftzypi2ck78w290z3wgk2ysrx83dkvm8',
                component: 'kbjcolygado1gvbotav8yeqt0q4gqntctfgm6n98w56gyinyuwicjb3jew1xwam2ms1oae8ykzwpgrn2ftakaqudd11fv16q8v7vbz8khmwr3tihlptsie2oy9s8yecyvcmrhwt76a2l48ur60c02gtvh3jmutix',
                name: '6but59aaaecrcd81fvntf7crt16x6tx4pj46ah0y68ot6ehqaom8gzzy4hwky1a1gkz2bf3tj5tj09y9uolhz9ec8orz6akr6p6y0sawhl6p0yxmlau5yzgqxffqnx7ijf4slmiwoeyjx5hlbsjt4x4m0bsj9luh',
                flowHash: '9kgad8hbbe8pd23kwrpjlq7lpvc8ku55fcwsscpb',
                flowParty: 'esabc7xwabpge9h1v67jc8ztbnop2omhdzpx02hr0txn09axrtckbecebl5pbhs0ly41fkvphxhyza3gollxatk6h1z71rby1tsqii4pn48mag6ancbzowkhp0z471kd2yxkea5c1v0dxcgn3kri6f0rw6hgh0uq',
                flowReceiverParty: '4e3h27y6bhu7d0sb8q4wxhyufb8fmosf66y7mehtp7niwoooihal28pus3ffnneabvxv7ucsg2lkasujezewsvf52lqozj17yhdwormsbu35k14m963h66pxhvx9pq8sdoyinz83plzl26umwkcovnjukyrthje1',
                flowComponent: '290285gy5octbicbhihyobkp2fi9vq27gjk4i5pja5153tf4z3hwwbu5e7d6tl917oaw43qjbs3phtx9ydpncfux5rbwmhxhfplfzobt3mtekgyl75u3bwckqrpkdd9webam8ilzhj1gxljz0o8cr3a3f7l1hcg8',
                flowReceiverComponent: '3ba2jdnfggqad0dsicyrf5x7zymq70e26wjb5lip1ith6df6p61hautp7v7jryc2yg3euv2n564mggv2fq96negsvpmccg2gkj73fmfag84j1rujnn409l66o6fi8wxk5opin7xsfq9cd8z7sbpp6zy54fcdigij',
                flowInterfaceName: 'bovdw50gpbubr1g85ifu1sn6buwhvu9da786sstlz82tsytwwn0uh8eiytsfns6sxqu2f0e8ri4zd14pegs30w5ngpxjp5fxevgjvrduch1tgcash1pooadxob3v9tyg8w9h9k0tytnoo1fvnsir8ca3awxlvo2x',
                flowInterfaceNamespace: '953eiaynjec8exln5q80a1s6pnbthwiquympm0ac7s67idsbz0al82u80w8bx79awu02ai84t272d7i35qpedp9dzzcrz3o9odbxd47fch182n43j3qjsrejdtn9tdwqlvrlp0kkcppomhd9m21de4bul6ct8pg3',
                version: 'ub6wivzni4kew521coio',
                adapterType: '2a0c7kb3gu24yc1fgell4g2vqg8fd364lfeeg5f4sp8c41j6t6w4cxg8g3m0',
                direction: 'SENDER',
                transportProtocol: 'lw8hj2x42mgx0p52eskqqu54yojftzj4m9tcifsyqama9tmmz2cazh70cr8k',
                messageProtocol: '1dop0peg4owj74j17r7tlx8lbf7biypw57ieo285nb2vmzcecu3c4sspp6ve',
                adapterEngineName: 'fgls7lapgm5mbe8aiwnultnhqpu4jhxrh79f6dkzmufea8ed0gkk0w2rktpzo3reszn32nh6fntoz6haudtdacwqafe6qsgvorgc3lk1i6r020d51is6zdb7zlt32sdgpckvd8d9yj72ooknlsvuld1o624rivl2',
                url: '2j0jb26n69r1tmflrek9oscouof5udmdczwn6pkn4ftc2y20sbkonwchwpqf9193v90qlnsxvhamggx7d3ar2rvpzlmwsmxv82i9cl41xxs2fpjibl4bc7y4ybfxwr28fge78ir9fybtpuyromfrkem2lrymjpy5lt37dhrngjqdtyxopln0x4m155i3czlwglugrvv1zwk3kdvy5h34k9e2166af4qw6uodhzm11gxsmbr9nxedoppi7mwzfkou8ytmu6xixgt8v4oejelg3udv8b7odel4mnb1jswxtzxn9qbtkz481bu86zsnwiou',
                username: '2lzdwjdtw1s9www9laxp5trsm80ll17wubiybbe0dmrfttspo2x0zm2xmds0g',
                remoteHost: 'gpcwpg0jme026n8rhkb17ebpcvrpt3nomzdog0225nczmshxtoh6xyrphljjiopsis0uzpknzy4x6800uicarxxwn2nvzum2zbnaajq8fzke4ovadbny57324tifdvf733jd1ae9lcq30r6jti1zs0s5vylabj5i',
                remotePort: 3418476291,
                directory: 'nop4pt7vwc1264arh2plr5yvaaueglvlb3tn1xxrzyp062zwkfbk9j0gg75vmpxwkdecq69p0g4cpldl1q6y5z5783ej8f90hrsqzdvlnra4oi3trp029zpuyhl9ufof0j3xppzbkddsqqgf54x0f09xkk0grft2do7vtpj6djtqxbctva0ejf1cyif8v934uayx9y84bz0hgc9mmn0j9fedkzxddzk8xidnpy3t7o2j4gzd8o7j8ugb05gqbm7wfj75u1avrk9dksdy1ahe97kz91vgp7bh4fozw57ajnwzhx1j57y34cp65jm0sxmfyd7bo0se88jj5n6a47vycaj3x82tw934i1wz6z4guyai8umtjmlrblvnbr1hxxetecuagmy5ea4rlu12mt3eilvgi5jv9g36lyjntlo5bib2e8ei7am4voefkm0i96ymys9p3knsmizd4h37popsmhpat5vn9s9g42uv3g7fktf564b5kmpaqpz5onu1s7qv0tjetwo0dh385ffow3h30hf8wgr1cq6thicrlj0od7433uqxzb8oc28qjg0wmhkogakajcv3adheqc14jnjdfe2rh1dd2maavu053bpmomxyjy2q9n912269xh3bllg84ktqy5y4oqkayatx3ols7slwnya2y6k39hryo6uoexf3j09m6ky4goyajhhoviagkk27jppdor9m18cur1qwucgmk41bahi05t646axv5df04qjjhmc2yjuxvcl08zba5pn0nb2mhjiywmhsn7e1tb2oh2e9ac505yfc4o3bbrcijo5idpmiqd8s04ceglg8jhrz1f44gb7updm1esezh1g1njnpxkmzg34x4su15ckmyu3w433x52mdcavm8mtw1p0xj1dq934e815sfcqf4sxbcu8exmv9vjccgirpnoy916748bulvtum8aeotvwav3oiwi3kvp9asndzmm0zsbcflmtljnp9w34kw4r5g4pq2xwpssr6myn77i87ci31',
                fileSchema: 'ytafnt1pfao8wqn62q1jxroz10sv5o7bhbs3fjj1liyqei0bhckhjcwje9bi65iez3cdvnh7txn7c71pah4tl7wbqghbm47bqshgvt7of49btsl3tn0zp1j7w1fwp8bvinhv8gdthcryupa24lxe6jrq47dy1c1lx4femxawwcdg79y0ihvi8i31bvkasllo3wl0xr4cgnx1qh84rda0fdgxr1zobnn79mzsikcalqy21nu396rb312nl1pghtv5t2iefewg2sadtt8voq36emjseom6b0lw9vnhxhx0o8rfnu5w9mty03ycaqpnimoqed7dqv0h01ogvlfvsinib9xe2s3c89pnpi19zjqbnu03fg3c7xltaioa4joy7wy452smnepziplcpaok5czenuejubd9rqj6omyxt1mziyfl1xveda9fif3vg44hlx70uj3249nkeej34ih4i1l6k3oou6ceor50aqses63md8nxxvm4i8eec1x4470o65tnr0stact8atmamirdclh2su816hltxa4gee1z5kkuvsjlcw859wqt4vrqsooybajd3j5prvkn51fwbr9p2nr75vtfxolfbj5ztsef8arnkg8d4cen9jo5jdvmcvo8jmx3mu8rhlq9gohd1hzrdncmbz5qcy743z36rdjnf2bu5yb5hp7h31f2izjpcjvs55ho5cpnxap27d98ew3obfoqqtj1rejtap2tplpsypiplqqn6182nn2a6surjgfws8lnn6p6ysd1uqskav83rbqwijlbz75tw6hw2mpa6zpnvssms5hrfnfymb7827cwg36lshsgyd0kegyvm6lt10pq4ybgun14lqv3qskfhi67myzodwcvn4h06rfja104vh7zfwozaejvx82vvln568o4y9cjx3k68xlo5txapvxkxll9x0463p32akkrwab0bp094ofv3h1p4jhm35nup3sxl2ih8y1vaj0i42o0ysnibw63qogogezhfrt6gn4nb4en',
                proxyHost: 'm6gfpy69a1sucmcv2p2ktv7sq4rf28uxo5je6gdny9jg6pmegx98eowim0nn',
                proxyPort: 8971809421,
                destination: 'nnxvlydla6dtr59qlev5jbga1k2o95dnfiq1slkz84khbayik473hjo12ekeoopebs8ii8y3yenyyrtjumwz5xy6a45dssyggi5jws3uqk842zypqg5a4vwrxrylzs0h0n6oedimign4lfo7pfscl7371gxf5vnu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2wc46zq8qa54osw99vqsgh4c3jdttf2wmv8gco4l0soljf9tpaj4qlmzsfa1nc1pstarziwt1arcvawn3sm05ofvq0vtdgwcu1sy7o9vb79oozudbs147ag48hwf98k6tdb2z1ixfkha38j46le1ixte1rpfdck1',
                responsibleUserAccountName: 'paubqushyevxr1sm1vh7',
                lastChangeUserAccount: 'a3y3j2aobxdwpqdoj6cb',
                lastChangedAt: '2020-11-06 07:11:04',
                riInterfaceName: 'liufsnx72l3rsk578k8lrvr51fbz7uwh6gtx5fzamy324d9lr9nt1ed6je73a2scvgg39wp3maj300ya9mhw5ro7wl3xjoljz8mvoz8dngos1rzvq6o94av0ry63vp0f005hqpjnxp7g8fadrafklqdzkud74cpt',
                riInterfaceNamespace: 'qp2jyzcswqohqwsumbzce22zh2waiocthmgtc2d00epvu2kaa7w06jikern0lftt970lk0hqbpm41cx2csh07asr7qrypwtejt50tpxskyzez3iq33sbhpzp5ve9u54yeqzvpl6td2mian2ei6nlur60vp1lvxdl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'pvnl0jnkqot697u2divonhnkhtrq3ln6jblfh6fy',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'jtkicd0s8ok85lg6uarjy0sfvpe53oki8cod5i2ggdwhvzepu4',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'omvgk68tzv67z0a5d1fk',
                party: 't1v16yy7zmrew02dh2qkjzv8pvf4qxv8tgk6yunxa3ap1m1rz88c94w2eovhz8fiywwg35hkm4d06r69b27oy6273y7n97kqvciqut6z8b4bm5au5orq97dc0azkgwbwuueeqpmcqowtuiiviwimqjtj1fatdkcb',
                component: '52tq3taem4tuaqg4zqjklojdoo9fgpy4bnn0ap412bneytatcq1hjlxwm8a46af8hzouab52cduddky7dmc4zy08b9mzk6pq64gbfd1ppjb172rlz1o1zs391eg73v2fg005zbsrfgy6q3yawk5qidsfyeg92p5z',
                name: 'kygwh5fh020jxrh86r1hvsbglevql9w39tlt0cbvzprhvnruzqmf7l8bfxph3vnzdierj456sbxj8s2ui0wilnin521pzl6cl2krm0t6fkivblqvcgoh431ty2q6yxaflz9jxwi8cu9sqdqcsx01n4tmqvmonqcy',
                flowHash: 'cipghaahy6ep42iuw3gw4t5si1uknk88z5c069uf',
                flowParty: 'u2wopggarbs6beqgv54srtzux9wyvkdy06kzu2fazo982g7f2oqcv6kll5nl0lpceyt9m3uvq905jo2bzkob4p9ctu8t0r58msmrud2whv7ugj8gow6d3s6jo6qxidm1dw15zfewv8ug8mwz6cdid7mxdq8pbnse',
                flowReceiverParty: 'ld32tqeom4714yenyzxqhl7ziq7ejr3kchtc5rqiaigi3obs1bdpjwr2n2tl2i7g2l5azaok5rfwhplomci60644s5sqbex2a2cu4dk8ykuigk6hw4630f1td90odlwsvk97b2bgp6q9gpznqbjc9jp2w16p6ma8',
                flowComponent: 'rvidymllmpms9ya5iiwh5kcrowb6wept0nhi0x1rez168fk6irmzhqfqrx2yjzwd3uip0kad7aos8pos5yk4ax12bxmwnjwgvi1qgji4w6tj9fhqj446z7zzo8v0pa9y3b1329yq5oejtppq41j7cio6rd93x8pz',
                flowReceiverComponent: '6wvgdn7qdsdxajjj1ubmb86diu1pw5onwhgcygaig6ppbb8dmerklvop7ke5cql5ej0fzkvfi0d9uhv7lx2claultbqm6p1pqewam4y4lq0nyl1mo7x5m07b0jxzyhpht5bvy9bfhotfziic71gal7d7k3f9jf1w',
                flowInterfaceName: 'jh4d572914x6mxxza6i3vzo2znf2mfotbdvrvnt3xwets3qjtqfv0eztutl7urzv64cf18yjkwbn3g0qv51lr54vttihglz70xqyts824dkujt0z0nwms5p5k617uqs6mtf1pq1s62u2q3htws5u40x4k3eieugc',
                flowInterfaceNamespace: '4rp0rzyhh9uv3emw4gixu9o0u640vym0j3985owlqtlay2smid789kikvavrfgw11gnqyvfer37n3ugj6xapbjra094671cvv26zs9axrq15279vvcmlspyvngl2zrel9wccifxuepgfw0hy5vmgmj7bsj303qke',
                version: 'cbs8jnsyd0o12159aqxk',
                adapterType: 'mx1y9i3j0norii470v1t2p2wq4uhazvhlclbhxreu341msm1f93ayatwp7ph',
                direction: 'SENDER',
                transportProtocol: 'lrxmobcy9psbx9ruu0ntvhlzqagx3lcb80quuaaklr1hd8mqc2lnflp37cp7',
                messageProtocol: 'zir4y2orlp5hffbgn6embrf219bj9s4ynkyh20verblwjgk5i4z0mfh07ur0',
                adapterEngineName: 'xqdfgitpzzhsoep6rssfg4b514f3hk83vh4izpuowd2kzwc0fqcyplg8koid1c5inaihx8kqfz22qdwv1i8f2wcc7kuc6oresq7q9yo4famht1mi6jb2e8qmydew2t5jevmt9dec6ik9se541l1utaah03ufatwa',
                url: 'n7g0otkonfr4f224eonr1vss2y4caulr0bk3yhnj71bya4t34aiugk59ocevfhjgg86innr2xd00b5e32b277qm5hg5w54axtyvc5xmikaumb2daidpnw1yoqdzv0kie5175p83onjrncno2d3wymxstv4cgw0pnj0tergiw7m6ofd8dyfz4afznvw5x5490wvtb9l601am8u9dgbjy414thg2ibjnynmcdu0wrubirt0etfrtwtwzr802hiukpqh2nlt74qm8sj7mx6tmm2i5tjcyayrkgkn4gtfkcwlw1v94ykjwhnwjss3lokwbsp',
                username: '0rdslx5rxektxps6a8279l07v86dqoh34sm7idz6w5ojavlhu1tg0e8ef82c',
                remoteHost: '6x9qvp1brx9bmfxi81zw22jjks4s40sb3vrzbtfnvtn91ou2ky5u4y3vqdmh7ww5goqj7b67xwt3k3gvdl4qirv9l9vl3w1l0ikvzyx8422kwec3oq3aeeb0n17c7h8vbflifoy4x7zxlt959ke4mgfopqj0460v0',
                remotePort: 9524892053,
                directory: 'uy5vxmgidri5uxgt6wr63ta6lk3vm7tydmr8zc4gqx891slwltmqcbgssbac0zi24wg39h6id1vr4llbz4io8a78691fqlmsvkbg630tnwtnnbn4s25nod2tsyw45fdb8tymdc60y98eunn7mhybzzmv0zy9u1g7auhe646dw23ub0bkanotujyh784szl1m3gk7tv3sx1035wypbzxvldbpo5vje98u6rhgf3ivj1nlcddhl0uy9os3m16js6gd6flvkzen3zwazyu0bia0vksbtalayn9uog5h2z5sz67shr9s0p6pr5745l8r0lvrw4tmo1w1sd8cm6gyfbre34m0pkpmhizbf0vlnm1uzu70xozr15mpeudxjhafsrxcx80fjw7fvbnzxyuiks5bzvmpo2vpqvdhk0fcr47nj78nm6hldf312boempbkqxoy2vz817cl2dkd31cmlzl0fzc2j2qgmyixslekglmr89xh7cnuy1a14fj11wa8trdawx2rjdi3isakdysfu7arwz6dv86elgum2io4kurg9dh5p3ibdasduc31jmiu7u5oqvd6hy9lbrjoxbizw650smaqo4b2z0a0uglrbtojtqaog6konv6a43jbxxmk5jfp21n6hpp1iz235nb43l9gy83iczs41snv68eip6ylpnr0bkj8m3vq22pr3d6bhk7cmd3gt9doenjc1xxbz54r140lhqt9iqn0tqjxxz2qb7xh7fz9knkjw9tew04xhdyo1hjgpdg6rpptmt7jj4l68955l0n5w5lllxtqdhuhk4omifvuvsawpor9wyi43824zzjh1wt9e5x2rr91uinpu6a64ouybvs95p1ja69ntzmt0kiqja591pruop08ldr32cdein8t1hm0b5e0694m3ou9rco4gt2rgmm0sdxxijhvd556wg4kxzkdys9mnp3lqn5ijl7n54d676fno8kcmiol2koidiyag8tk2vletxhna36drqynq275xymq3lu8',
                fileSchema: '5wnztcn3u32xhdqpvpoj7i9ok1u0jk5ykxc2z6chotkrmg3ynanrpszbcrngfqqw721q2dm9o381l0i2k7dyjk7pw526qiswz48l788nrzaxp25yrtts8wme3m7l1i8uv40ue8sshmkhyxznmalm2geamhda0ynty9t5rng7j04sg1z0kxp8kcxqyp1ea6di5bt3iti9pxuw0g7703rs8tn62sgstu58n4ii4konw3a36kekddthiffxhp74ejymyuxqgpbhklrs29la0kcxh2swkloiajzmzizjiejehoxxdneclyp9b4ouphr2yco0ol7byokem70ljglnil1omysa98gj2mplmbjr3h10vvpfc1d9bd39hu09q2663r6m9kqd5w3tgd6fl10xtd9s5xyprnze3ye55631oaxvn252vfxaa8n0xyzkii3b1qc6y8hr1nf52sh1nqo8j7s1fns3s2g9029xti5xiryo8ltam1yiiv58d5ejapq2mei493cacrqjy10q6rgteru870pas4aa0f4kpl0w3f4eksf5smqqxzkrwh8sueh5gdzvn3lcyq10xw6uqycwdvpj3g8y13ebhsjk922x4g1ox22wlzg1e8ok8xwus0rtbdj8zy7kgoa6es43spqtxh5ocm5ta43iv4cbb68f290diht19j2u6yhrsrl7v26ml5flaujn8wvdihshyooo3mmjumtrpw8myfcb61kvzdhuedv55onauf8m0xf49dxqka2vwxlmkq5ojp5ry612ss5r8vsf3iuj0eekisvfec2szrb4et0nbjvo4cg0hpkuv7lucbdkg907u01jy47lilpsnabsyzcbbuopks7c8zfk98nws5z4fvn5l06g8uswyt7e0oxdmcd2661xelecb4rh62wxcjx0lonzrmlsz5mee89b4yico4fpnzvchypft4gdx2ae14nqwe1cxy000k1gyck5afb8tdfv8k7o9n2x9k58xtcvdicv6cludbiy2hsc',
                proxyHost: 'q9u6ilp542zm8le6357suthfr6ol80lztlbw0xavtuk8u95f3cbu788f4msl',
                proxyPort: 1479136053,
                destination: 'u679fqi1xuitn2pqs0uu5i92raq9ot1ud3df77vk6jxf0dllycwqrx5ln4nz2soqfmc0myu7sv2ckqo2pjglv7jbujuzdvd8j2s1kyn45npb819h5mqzkbtoqh00nohvy0ej3ix8djfi97phj54me374wedch28a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vz566l9ruuzvkjukylx9gb3prhd71hskc2i8x5a3zwvmmxlixoefz7evznwvkm0qbef9vlitvlyol2ufbmfjd3q1lrwovnsllpp3q3qwlmrxwoudbzkp2hdcj4vr5bcs66yrtwit7ozwe0xojoeejil9pdy2mfc7',
                responsibleUserAccountName: 'amloecvx4epvf2v3dwsz',
                lastChangeUserAccount: 'w1lkuobcix20pcrs7ao4',
                lastChangedAt: '2020-11-05 13:37:40',
                riInterfaceName: 'mgilrecxtyj0edbwf7fsp69mojlse4ppcjij986teowbfkkzrhuccgyybt79qo3q4caahr4gfkfi2i6p41nthbvh08pt7rws7xppwadj8g5z24c7ftif3fhmu2g2xzimgfg5bx005mabr9zkftp3n84qjerniqs2',
                riInterfaceNamespace: 'kvwlgjnrksburymoo1ce9cy7be99jxzuasqlnddw16a3jhvdbk2m0zrfif48ikwrkwxrr1irc7qqykq3qeulputys0j3q7rdpgjqmb3ed06f4mq2exy9m1vvg7p7y5pg3mtdk7eom48za33sv9q8e4pgdb5v46wv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'vr2vuzjxh34ovd5nysad23s4kleuwj9yed3cnk8o',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'z0kbfuwal7a9n1z59cnbmlz8zxw7j28tpupl9stdfvau72lu74',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '0jwx36u325hr2o16n12w',
                party: 'x49u8gqn9nuoz4meyuonvo8mhmgsf1xjpxgjwr4he79k4eiodea7m1jgv7v4da5fk2ks8jktl4kfpcnrdmvu3ox052owxq5glir060buefabd87d7rm48gbh0gps4wntz1xrca0go5hf9lajmtut3dwuoox7l6cw',
                component: '41vud6697ka5u6l7gkojy51hvh7ha4l5dni58j4fiyt5jnrdkzdtjy1brwa8bettcs5601tsrr9qqsucw3j75xbtp5a9kl8rojjo4l4za1geweohte5vhcphprh0u8krnd8tl7a9dxtmybkis5icowlupplc6fxl',
                name: 'tu0qzwxx999q9oac5ymnza32p9uaj9662ctcikx0ptfi2tthok3hq3w7kc608kldc2fvbg4hhmow3am8lagacal8qkuad26nn1yogrd1vln2174kuenl3udi7cjdy7wih50lwj0n1w9nt61oj4nm9ti95kv0jkj7',
                flowHash: 'cmgcg2twmrppga1nhbjxld5zvd5m9xf2z2q82xy8',
                flowParty: '0gsie1i1grw1dxzb6hiwthp1mdgsahyqqq5dfz3bh3gs686p1ahhcwqni2wyxl3ocrtpemv9lj943gap1uraj18wv5bephbk90ezyr137wld7s5cvna28sebmqlz89b8eyhb6eykt2ixx7gq57pe3zihp8kjvr7n',
                flowReceiverParty: 'oaq2xqxbj2ku1w9h5vmij5lm5g5r2g5scv6r8xrnrgtxm4li416pncpgzq0u7jhcxwm9x1olthwbl4hv5ek7fixr9uqvtc3s2o58bfipp24zqji2qmaija1u5qej8qqtgu3pj8c4mff3xadjrfqfm5xbcrprbrs2',
                flowComponent: 'q4wj05p2p93dvdi1ucd3lii9mbcmcbdinu05kgr37ja5irxjboiuvjcsscpptnqm8isdll6c6f29ik0877lzf0gzr76ajx3znyvpwtlbavre6hbk7m4ro361zozqvr0vaoaxf9d98z5q7md3f8ouz3hg5e394ocg',
                flowReceiverComponent: 'i0bgrbwraqcf4zmv5o5sfm0ep0zfvvyz3e8eod71s4mno7qju9bcu0j4v1a9uaso01hlm4no97hnemeg6j78xebyq7924ce6qx6b1jggowlxffq5bfp8eb18yv82erjrglc2svg6alurlgm80z3dbqfisil0ks1m',
                flowInterfaceName: 'tpqz8bvbbcez1ob6x6jz9kdnbkcm4g7ftew04bmrbqaq1ers019jhpcj3pydg378bg9rsk4y8zbhac4fdt7fiacxb9o23pi6dngb0b70ktxcjwfhwkddspsxc90trp8rqdcsmmcvr28m4hwzuzcbobzqjrz2iqge',
                flowInterfaceNamespace: '6ex7xtqlgkbonlcjmuxx3p7eie1delc2c4nb42pfr7lh29j92wie5zxic730ddj2oq07r805gdvtn9te0p58z2s4lw8npse4k5zq42lxfadk8o11w6thvo87rbbphfkfjihxz7musraco5sbo0vq4rlc8j9f2r0r',
                version: 'da9bm1dt2uhljdi3zk1i',
                adapterType: 'ldqi0nsk3xm60jadqst47zzbqk9m58sqlbklfdnlsyicgv9c70fp73q0yl4d',
                direction: 'SENDER',
                transportProtocol: '11t3fnyboy1y5id06dk1zmizhhl8gv7p5dazumva5lbio9up6atfwzgcse3k',
                messageProtocol: '0g2qyj342ktyb4ck5ddgr41vujym5of4jg90coc4iy4x3b0u1ruv65elm1sy',
                adapterEngineName: '6j5jhod8s8xhtvzli8pf4dg0ko4bdo60w411fz9rvq17ulcd98oktkz8yh13f3dj27ut9849f3hsa1yfpqhyb9hukmaxvsf9ggg13m392znb8jb5ejl1v4mvjdpp39t8q43zymvva49h956cocruiewfx4wurfbs',
                url: 'sj8dc0e325wm4vcbr5qehcozn1bk2662g5ramtxa1tepesnf9j49aw3furllfsireyma1m0rct60cjovatda7p3lg5mo9cwk4i4zw191dkhjk2eyhb5dcez4kzrtoi6b7yyjk0ew7lspg47a9mkvsuc7sb5noygmjggklnmazreltvos46z50cw3dskqyuaukh4oyp8fk3rpdploujn6tuqnixu56tirvn0rc5gjerwvnwebe8lxjt131c1j7j41z6fzzdjlx012oc478ujm2o8p39f1k5dbqbnivc2ymqvjb40s8gh455sxemep981r',
                username: '9pweycyws7aws3qnxdyitj11l3mx89yi6pm6c9j9pxvih1ox87itknv20bgy',
                remoteHost: 'l7pnxnmvww7z0me8u4maataie2upbt50yj9t4hts41a28b57c2ktma113n5cdwzhydo8enb5bz53zaqh3x59x2cv4qowkcdlve6cml8h7305j4qymbrq6x4htf6oy6xlhnzalhiqdd25yg7dd35sdfprh8bqzsl3',
                remotePort: 99323305395,
                directory: 'gchzu5pj2tog5p6c444nk8n4yd4d57594zqcggpjwam0nvv4z88vkcww7635o5f4pumbccmuq2hvb5uw8ajj3lomov4thwxu1j9sy9s48fsoj9ww3lvfaa2ghepjvfycp28eo4cp0n3u7qhhpeal2ofzunq77twcsem7rokl0j9vxd0kjkmxpkcgmx91epb3bb78ymxgm8y9m12n135y9886b40x5h5955nph7n41fjigfimpxhrqil5p5s4z9dq9bjsdenfh3l1wf5k9qkeyeuogkdc31d9un28b0bho3ke3apzd65nh08dmed8wcbphb831dfun6fecxgtpj66v06yyu190o3mx64osblfpvaplhatlekwlqfsri0a9o6ihv77aejaaah5v2p9bd7o7nw7lncu3uad995zescy4gz7xmp1ldxmpz890o28p3un1f32afa0zjacm1anhhinxafvh44ynif9svrqlc33ahzk60qmtblqj4ffs180sbctvl5olhgjbhz1997wu6fw0gpeyt8kf7cr8uj8u104g9g6o90grf0cjbp3kl9awxtb1rddgyh6tez4lwtvjry6oaxttaybyox9mld7qlx1gnirlz8e22dccxko0fgctrw239c9g92vh5b2153r48xei3gs602wftvrgu09zcoyzobi6s4ee2s52dowz0dmd0h5s6hjpqmiai6r2ui3a138wl343hsbpaah7bec1856gg96xb78zey60iec6p7nhm9r61qrfy1mq6vx9fmi497qbv12az4tn9swhesjkhyueetlvssvwzprdkn37e0uq0toc8w8no5j23e5nc3wn8pubnayteyb19xgeuop6ypyhbdkszr2rk0tnbzyzqwcntsojjotfy4yrz76yhhng7wr2k7rlb76lniqivm5mjymb1cfm36tcyfeq4ayihl6eqe4haf8izi7mjw0sm6f3vmlk0xetqxwjndhg1w5q62g0wnyhmxodcts4rvupbyesigg',
                fileSchema: '8abmfv0j2cpc0marq6kko79re8v4pzlv9zx25ll2tpwoa5rja5cyvzg3h49eo9zg6oxlr6eruemneg6aktr42c2wfi05q7xivp6invev7t4bcv4rhwqy8fnmz56npr3ol6kej8rfhgeu6dfhrr0rw0mrztbqlcvxtocf7lrddxtk4sat1kzpg26derbyuipfxxx9p9eomov5l475gueqeromc6ev9na8q7hzjga643pen91r2sr2ppt6iarzbb8qn54lipkpc4ebr47g505sryjzbgau2cajhqr4ybaqcve47phjn5ca36pinu8itlypte9ymv54ddi1prsjgb81ll15exebelhckunpjcef45z9l4ztrqugy5tgpbi3roffupnj2tbjs28rjkbt5l2qvpj2oqe7k6cuc1tut7hcfnr7qts4lyp0ne4ef741q19irxo7tbuuyhzqoipw3vqculkkqv1fpwe0g66prgle6cj8aei8mblsrk8s2hdc26jm3tdkv7v6uobrkboyry2x0prhm3ueconq3eg9s00g2vli2n6t6op8fuved0a617tb6kc4yi1rxi8ac33j40z25atccbuo40wk5vx3l7bg0mrg5gwyoo3o3clau7nz49vcyokwk4bmsnmmy2zgl99bx9pgns4739vy6jo4cpmfexzao8trh7ijnfqjzsap5pkmym0ydpu64cmxqtg3drzfg4z0jumpn6omk5pxud5ay2wl8saicauhz3mpqt444gnwbuunqeeoupf7s6dxzqoxj2sijnru4hs80yfke9zkry8uxzvg0pmnfyu4eyaeok91d9x12lkwv4iyrv5dlbvaauy2ujwxrw9ojbfqv07o5v4mtmg1xoo7ky5ijz3vvtz4y1dnf6tckmp3x00iovbasdkvb4begmwqhluvl6yla38aa001yuzoock9jccpnu13hx4ddd3tx24bbnybk53x4wg548k4zfpkuqjcmja784vfjscllehnkg92qs42s1ht',
                proxyHost: 'dvxwfth3oztzute8dkfvmirzi4u5brqmxjjnmd6thp41f07a3tuwgewhybwg',
                proxyPort: 3526927779,
                destination: 'sveyo6a5q0cm3wvta4do60al2x71s97qvf6g74dn9qpi75md81ums70wsotahkh0la11gipgpjy6nolyeqbdz27533ju26ophdzvg97pb7161mgle9yhxd43mudhnrhip2h7hwtagu6e3lmhd9x623jthdfqqgo8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i0us3y8dg4c49xnrw06gvi4p54v4ol0gv1ex7wl0zoiyvigj5aile7alwdjrtbqusz78gibr49s4ms0gx65w9iibrkievck434itdxt1l9ucq55ua3lgsgu7c3g4iv46brfby2zm41geh51zsiai9jhwsfyb5it4',
                responsibleUserAccountName: 'clraa94b58b6dtoc2hmj',
                lastChangeUserAccount: 'zm0in8nz4li3x1b07z28',
                lastChangedAt: '2020-11-05 21:37:23',
                riInterfaceName: '4jmba3zafhu79z224ljkybre5md2o4088ryi5elgckwglknf06vhffx61tk5po60q1oeecn75282h1g05f81f66dbzji2akiunqucsurvb7fya7ym9mxd27syobaska8s9617utbrfyph8oeq2lv4cw2tkndp10y',
                riInterfaceNamespace: 'yxv30xpkw0h9ilc81pil5ju0u2oirffi9ezycorqwzvkwpwwi4vixgaedu2vmsws6vdq494e28cb0sep6unzn3ny1zwi625ampi0hjcyvzah2ou3oq4u0eryp4n2xzwnkogkjl9igkdpaod1df2kqfypfa5t3b4e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'mwr3ou96joisy6umcfo0tkkf24x209z9xug10lnk',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'gzlw325en523fise13gve9cntlyead5glrpe5xbm052p80xt2g',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'k2punfr46uubte7hjiiv',
                party: '3460syn7m9enmg7i46obw9dlphso6e519ht4zptr1gjulfg69nssiw2xwfvueo179nhwaf1jq27dxmizutgidpsqsvs5xfpgyq2nyc7heam1vwzrpzhj3ksznsgik3a45k90ejyw80qliletxo1qcrelnus63gdm',
                component: 'pds14xf6y1unhbckdb2kgitt0gw01wnu8ugq9lc3ijsqe2107nnjoc75fo8t138995gwg60apqxpm4hbx5ruhbbal0wu1f7f72q0ujoununinxe290xbn344umo4o9xmymm83hdn8lol9opph1iyr6yrbtqjrcl9',
                name: '46m3vpr50000d63gp1yrlvowq2vdeu7bk5j53rc9tx1ga0y8q7df4xtpwh9tfkhvopkra28sv0qsucbte82lxdhaj7ccpatc7yy8ccd52xh7yfowhq7pguff7t8g4c0xuy3fwazaf63bshbvbe5qfnq1mrbxfmnn',
                flowHash: 'c55m6ln2rkqeiypoql3u6ck4wj45iact18run5z4',
                flowParty: 'xh2wfaacne5at9iueo5uxrve3n6zlwv4fblohjcgauk7qxvfajodifzuhh2vidrjc8hem65rrws8p05z4sil33i8qgpr5apvhum5mgpyer38dngfva9mw4r07wl5uuqibyw434q9076vcxuhxon7ldxi05jdvxn5',
                flowReceiverParty: 'a1oads0d0u70jhucy4p8r74yiobcm68px2vuf0veh4xv8vsghf9snh3l9iqzsszfzo7a7b1ou1d20i8s08hld4e1zh1u62ftsz2dcvog1pzlhcvwbdmdx490nrrezplmft58yachxvpb2d34gvv304myyhachkp9',
                flowComponent: 'wmt6m1scn3kofhx1znhfu81gunffncpqr2fumz2bbttehelk7p4cf7tt6u6w7k929adgnl2d3vb4n985lbdo9eazguvzirn6q7ddxzzwbafi6rs1j60zen52p3uwspfxbg4ehyc90h7ctmk7xnyhnmj6n0n6nth2',
                flowReceiverComponent: 'm89ssxk4hhryup06biknjfmxocvs1xo8fw1ua2x64hz3xypqddllpesizogez35jbhrhsmg5v24p2dbc4f7quug9cluus415i9esg7er22pi3cghioztsugu3fovtuyqnyf7m2oj0ayieeyyehkcg4540ddyjh42',
                flowInterfaceName: 'ua1g8akfbmsoktgpw4oh242nok2vczk7c6jwo2rjf4k9lqqo0uydzp4qua98kqbwcw87xlyfdy78dbeprfnle7kpejcf93e2ri2shb44adjwiadasksg2qr542lec6fd1t8oudncp64ve4oevljnhky9k7796qgb',
                flowInterfaceNamespace: 'j5y2e72bv5y7mr7sco1t65wryv7sb6wq64y200nc4b0s47h279e8eilzt4uaxscor13v72edemapsa822i1oae5tku4zqcglj8uywo1qa2onex770o0zo331h12cjazx2p9av1zpjr4hgbw2jc6baztnle5o3mlw',
                version: 'h3fvvydc054oylhnz79d',
                adapterType: 's85uraqbeyb7que29od5v5eh88lckejh1qkt6b2cpuinzng95udyjggcrh2r',
                direction: 'SENDER',
                transportProtocol: '42ewlzzpuw63huu0x6uho8r2gah3ce9eklxxoq49o1yj2yk7njb2cl9tql6s',
                messageProtocol: 'oqem6i6cu8bu8d7uxgaui480wr6e6kydxle2lpnwjbt48r2rfnkb4bovgpqu',
                adapterEngineName: 'cyr180fl7a3n0nfu7thtzp004xmy35ch275ezy8a95pbw86dxsb4dep09jxp7kkjyjvuur6o6fyifz1mryfc9g091o2da88hmh5a5rpuoyrb8uo61mi9npep57ooge5hq5nc1dqbldgvgm6vqj844rm0bnscmpwl',
                url: '7fymqsl4rucytj7qn83ish2922a9wpybdzw61d20stut63no60p2gllyyb8zg3h6bxd9hufx3q1yx3hl2pp12dcm4nsouzvjo7fskeg76eku4euhh77s6khbknj2q99tyexhwi8pyz47lkno1cmbskl0aw7c0llhurfpliu6alh69yciurqf07fxczowyp3ev3m8nfvzumegz30m0f82at0bwqhlqpwq6sg5h9xddtkui61vh483lvyrgmocduhtmwe0l5xoww3z928y0f6ot7vo6yya56rkepqqt3norlypdld4k4sx6pirybjgivpr',
                username: 'np6vbi32mtv2t29q4rt7gn5x1e46n4kxa1e8bbwb5w421z44nr42blsd8jg2',
                remoteHost: 'zkenncle2lws56evg8ug0qefqirjglsx4ae81txz2nn9v9dy8shyrjpwymgcuw5vlz28uobxgr3zoivf7b6ycj60hb2nyay7c2yg3u4wdcf7tfybs7gqgi35biliwnprzq6a2mqn2ptfntamxy36pa1ffbxlyuf5',
                remotePort: 4191938678,
                directory: 't6d73n7ep7keilj72ntxglk4z166q43kfvmvs60bvvpe2st6ytebf7be08nb7htco0q76ajx9rlesruasdf2p1qzungypz0n6jhyw43suqzuibvwf8w8g9rpxvfbxtkjhglndcg9ufqll9usue79v1nk54wm9o8x5k5m4k217mi5uy0e7h9vicv8ph2qphgwo4acowvgprt638c7z4x724tsofpp9u7rlrje7j6a8gymrar7rom8g5nir17o5r7wqjal6xrhq979214fzrqp5jxvlsazggzol1ur916m3h1ypl4nfbq7fs3meds5z016nrz9cfk9pcoy4bblb4kxsu0k70altowl30ju0qjmapvoxd74s13d1d8u4uj6jya6btzhv8zsgu36cj6b3etlbov06rikywkokfb3wc7v1baghl2rpx0b63zfai3hgpklp3ympbwmsbvvr90c6vo0kbzz4es7dwwtqfjf5h3otnaeyod0uxfiw5sknkyecun06ghog54tdkad3mc9qc7uab7fr4jtde904c7r7evguzobari58xib12i49uwcqyx5fe0czirdzorp94mejiq98p8rhda3ys3rrntqbno8gop9bobzcu0x0axsn3yry3ty6m1vasb0xi1tkolwd4cp5udkuayif6e0pxrrgxrk990f9ilaeu52y4itdykc4gifd754k9c33swz5lnuboxonqcx01ycb3s2cy21zm0w9d7nsp5c547w0fh5b4qalpr4xvahwk79gxkbpjvd059w72foxasx8keqekot5r1tvsnqz0274fkyrzf9mnnflb5zprlb13gq10w056rpvofpfijel08qyljn6d0966bp4y9ap3sfmkznhahbl9bsmwn8z13szl20v7e7n90r0o27lpg1kmfkt5skgv7eo4xegvwa2iivw2ilpxg36r2hczgkjegsix5qjirqa0dnkuooz14g5ocu9hnvmfeipmhuydb3qmrlbte1f50m1drhznrrr',
                fileSchema: 'gtvoc2h60kcmafky1856cher13ngsxk9tv615inugmn3kjp2xljrkppkd8p46e7bnpyyidngj0jefg9k6kogl0gmd99xw6cazg6skq90wz42dx7dynrf60mys9vjmedyae99xc3u30vk19ioi3f2ilxhgxe5e24itm0yk9sdtnnks6jszt2j4egeqlb2nt6qvb5qv47wejg8s879ci0d2597h6wqa7i8tw9m2rerrgj7uogtm40gpkdic24uzmd4ap742qgxrmbkcck66lfjtyqztnxc48t5qnis3yi2h354mo405imd3j706r9emii1d1q1meb2v9f3mu6kbk3d1qw0ltqtqmptiaoxhjoytkridzfly0dt15mpr2g7un6fdplwahbhvw08kn85uhdn85kf6wifotqzt68xf3hhqry0k0lamq5c8j5g1kwscqzh11ec05juuipat9uhk6hhsasf2p1dbjho3htgmyitecczj65x0krc0rv94wv1jongao49vhaya3ot5pqacx08hsa7xzkrvyxgdyew1tw1qrqu4qhb85136w2pvgjmwp516kdyhea0ent0xenikshsoo6uy0g7pj0wq6camp43y6g8t4zq9ez2ahup8bcdipejsfdqtekc2rwa12frj6a3n9topamyev57pd8iakfcee8q49nuxrrarqushaueyseiqvsivc09l7lcw50vulipl2wjnc57gtz95pd6dv27bwlq2g1d8fdbilfr6vwemun03vpk9pairohu8r9xke3p3k3y92oegrmsv2pbu8zt919ig0yghvtxgakjnm9lcan2crgwd1d9bvslmdtjb89kgvn18r2jkiof525sfmfqn7ne8jypz78rkvzil40k7aaq7ifyfgs3aclv1wmq3nmi3og8n1zw7uf3h5vracwnzdm90evqnb8ibqmwuxhofzesipgodjjijzjkgq08b9qc9noqnf44d3qwmctwz9i2yqign3n35ibrde9vjgpto18u',
                proxyHost: 'zx6zqppcqrse7tkux1f5s04mx71chqs8nqofvf5illly0g8vleyui7tdkpjn',
                proxyPort: 8302981278,
                destination: '4mh4o5us76dm2jesqje6rfz47kaez9smmrf8x3069m9hpxbgi5jtjvjtmhsjm7wy3t5lw2icf34r0ncr878aq0s2hnd7c814u74dpz29i908uitnp7uekqkna9w5e679vww8irz7jh6ayg6mieu003givazb74cx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z9da9cuu2dcudkuz0hojbqwk7q7dzwoqwn9gfa4ijl0rxbcd9tuh7ucghffsbalck485hml7k9ms44g3d3goikq8pof97cv7fzyj95xrx2zycrq7vxajdd8ti2e0odqapulchbgocpao81nzf5hqilq84qg0t9dr',
                responsibleUserAccountName: 'mp6w4742qtlzcnu330e6',
                lastChangeUserAccount: 'inpybq019vtd1kjr61cq',
                lastChangedAt: '2020-11-05 23:21:07',
                riInterfaceName: 'x6ill1w1plg5hm9mkg23ellfre7wbjwe5o0bpncnnsg6rdgjkz7tuszdt7ruswnpcm1n3d91eoifk3s4puoqgctzmu1zikrpn33ii6cb21ba1xwmdapsqb9zpckuqzhrcaarpzj3n2ikeah6hdcb3nyrgxnvhdv0',
                riInterfaceNamespace: 'k4wh9bvxogvl98zb9igc54rxg6yvtlzqxwrxbsz125eqd0ycbf02wsynpnuzl9qqlmsd6m6ywb46fwoniuap3ut6dtmhmlyl043y1eaamlailendj5rvksb856ctsj9wns5193gerdp2w8sbl67e7drmlbwzdmkg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'ocgmvzwkmi5mt9u9wtzf39mt3d2yz64kir1w7320',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'x3m03xt6u2m517oaj2tbdtiur0pqq8cklouyxkdfenkd1p4yto',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '00l0jh40ivxyu94jxptf',
                party: '0e241i9835ugmte6hqh32tbtd9w0jylkr84iu1s5np05ntkuut8u6hjxn8qswh2a261ubfng106gml99t97htpk6nccgcl6zya8l3ma62mbyxx9c3kpx1feno042ryshuv3n3ngkkjb2hg621x7gnuk4y4en6axt',
                component: 'i1108xqqgayj0330irrd6ixetbjr7rgt7m1ff1afk85ic4z66oafdng9cqzzdz6mj8zwbrn27si0eoobwbmgcjvud4sju217dq8joxvojuprigjak4qk2hjgbn6ux0ytzpufmu4b2sx5k4wi1kkw3hze304ad9ni',
                name: 'fmenau6ai7709dchfvimicv1psdotkbuerrs8bl2lmact3eeffqkykg9pziofotq4wnncrb7ycpu3syu8mv5w4t6y4o3m8vt4m442lt4ik2va411b0zsw3rc8hdtlx4kyr8tf5eze5lrv55814et79hn0yhkwfro',
                flowHash: '2zcf1lhs4q2d0hswiz4wtraszcyqo1aga2flptif',
                flowParty: 'mpi1n9mn6slec1lmblt3hhn1ji25qfi9ptm2gvd2bgeuwtuwjlcg5wwmxeijqzti4n8s7su9xebwjaxu6eda330t8jujeigonjfadry3wbqilaygq8rt0fb8m8zuu01wilgeabgezf5jd3s58u9gwcvciqh6f8dq',
                flowReceiverParty: 'fxnss6b6tox842w79twavyizibxiz7hn2h0h4bcimtr4nh5z29pc7kmo13b6mkxxrezyx4v0da7x8tq9et49gf3eigih3l0v3xgmjhdbyorkn0aibhneueodsm7gn5c8easf07tdq7cqdiwv7vp387torgfqdda1',
                flowComponent: 'smkfajx6hbsa6gjt0ml3b6c5vstp83wnrhm0fh51z966plonwerwf5h1yy68qv6ogm64wsbjnqw1sdrlynpri4894qf1ucrdup42si9mk47egq52i9s06epow9g8g340l1gumkcy4z8k66pnkquaviteilnkyurx',
                flowReceiverComponent: '73ifdunqnc1t4mmwnxq6b0rokr76ho6g27r8mre20xoja5ar4grapdrpnko1nu6zzdja0z0qg4pm693c1gjjzsarrfllqhwb3knp1nmeaunyfuejnosflcoxs6sbqau7d6sthwjwcswusoctx5zva0wg0l7bkig1',
                flowInterfaceName: '2j7otcj3w7ijbuex1cabx4rwph321zm6bc4ns85zhf3x917klu48z7b66no58ks4mi3c9uhei8kccljyv9972zy6wa0040f73j9n2gk4bule3hh7arph61ggctg0a2btrignbns03y3k4m4d51jrrfjgr7juuvor',
                flowInterfaceNamespace: '98s6jnaty0gth6ihnzgxyrzfy9nuf0f8qavec70742ldqg4qsdpt4c0nxeqwwid7llkw0d6oz2hptgq9gt5v8paaylw2si07kw3cc8oygmvu2xeq0buqir0ytb9g6riox5wmccfngdvqjdd18m3eqidk3hc2dfhn',
                version: '3itz2rb08i0qi0oi2kb8',
                adapterType: 'm2z1jflnlp32viqhhlf90kg1e0bxloyhdkodvrqq9gn62sdxttahejb68n5o',
                direction: 'RECEIVER',
                transportProtocol: 'bidlee2xi08ftdw7ipwqx3yq209kwlcdapxjrb5hsuypnu6awpfn6fip1z1l',
                messageProtocol: 'rpgztx8omp230x50rawrftewmssoe2ur8qu8jxre46ozbcar4w7jt0ent50d',
                adapterEngineName: 'au552ike3s0u5rwymotp8kple2ixi8hwdj8ohtper3hm35p0g5tefoga0erxo6ogazym3o2q645fexitls76hg21ef7mzietwcbjpt5e5kgy7b3cvn76b5x1wqjm0dcztu92ij56o83j4kwl1c83enovorxueuco',
                url: '167xqrhsmxur7f1r2rwyds48gfpfocusllbpvz67b0kex8ov3674z5hjgjh00wgcv2vg3lne66mww7qslfgbvvkqx9i5yfuf6ebbetk0kz8zv6eiocx1w5vbx8pukf9qrgca7ov88arrkxv0o58kfyr8zi8j8ik8dbwkkvul9h87yyhrvb2bs7eqwdhrv5nmlyq3a7cjovx2t8xrknqk9on9mrb51w488wjq23upmlam4fnql3wri7b1u20nlymrx7qq6qwkfcu1qwecyvsnlk2kc6uj2721deutlcpgr7y2qo8avf4b82ro3onkse98',
                username: '8g6mi75az7clt3lj8dr6f2gktzjuqua7sfb6fqctszyvzuf0lz0i68vit89w',
                remoteHost: '9gcxzvigcjcekzjcvegi7o292ez8dkihtoy2ool4bzlk3pr2e8615bhyylek8jwk7pcdmqsvcx3hpxy5x9mewp1538wn49rub1ls4ahx8o74o00hy6y5hcx42gjiz53yjnrtayrml3eevt2wz9aufa5uyekp3ywi',
                remotePort: 1241067831,
                directory: 'qi8s4p59fqu9kupe3l2jzrucq05rkzsgbs2hys5dg6ufl4twstys223t4e1m78639nlm3loa6yqhrhn779sr3auzfu925v6chfiggbvczka69eampg642gi0lgki8gn83zx4wn3m26tpjgtxtq474mzfomtgrh0vuy4mwolsusc8py5uzp295xrtxgxas0mcq8kepfqfg452ef2s9uf7e60llar4wozpp1b5vunw7y2wasfulrb97vvqxpi4l6xaf6d0z2982ddh31p8zuwpxj5lk9ydlr02y7mrg4xvzthxygtn661wkth7iih5221419vnh4iypdz8kfxlrzhizcxz8703fpd58jrreknedttfq8qmipzc9pntelf1a9rwoiq8fsct7kaq2ebg8jvp8lpt7q9fkcms4s8h4ev82n82ee7frciipasvnciz35fv2038gbqydwkvk6k4elete5shlxchr4lq5usyoeuozqajzgpm0z82eqsqpzwwjo6ywou1lses5msa6l8juip66zqyfy88detknbn0envm3avxz5p8hf94v573wklqryephq28xxm9k6nr4pxb5wroaucu68w0pq8n60nt4z7h407664mrao2k9kdgm7is4ajs7qz1hsrl961gg7ka9mlrls8jwk8unrvnlyqc739654an8tg6em1ybqxy8keyqe6yds4e7z8v07u9a3dakl3m3iedakaf8wtke8knw8ap4mk0paw9jmf2w363386wuna4f6872ou1h7ypm4r90btxum7ddnjhpmfo8z3q09ft2kzlj0for2j8qx2q4cxni6gdskzpn2tynbqlwmevi4nk7aang9bxhlifilpsk7g390q8pov5vgxx6416vahpcrsbp333q66m5ezsfs6s0fw0h2j43xlh49j37afs4yed98efb95dkhzfx5di6spt6lypo77zf5xojovjdtp8g9r4dlwmrflz0psbgu6eksxfalm7inein8bt7k5nd3v5gucn',
                fileSchema: '9cwiw8xfw2t2qjndfseejbper7yvq52nkww1xgdfypuixpvhe4mlnhef12wve8ln09gd1qfct03s2vbt7a2t2a2b169w97667uxr719aiel1zb5pj45tthquneh1d4eqsw3poheafkjbzpxwvacw3jr1mo5rzqvuxylkibw2uw7549281zl4zgicu2gc4d74iaidq2lbshcxy7f9idtdhz620716kc70n73ay3ge7ufjiv9ccfaxajx19kwj8i0wiatxv8ze83jj49bmsrohw4e2lkei9wh3qo6qjon5ev4rou81y63hm5rrvgumbthj5jkowf4qb8yocvg9ngo49hg7jydadu5bm5oomcdoerjsx2abp2oq125d7rlpag5uppet7hao7sn4gxu2bqblchlmdezwmtcao1rgpkvc7x0yufq26zk39hlujwgdbgnqry1n7uwofnntlx1rjv42zu43ho6e6mkcb8hc7vepvmmg05vo1td3n1091g3gbp5536gvs4iapnf2hznh68edvabtfji7t2c205xna55yanmgfryog369jktltt0y3s6357zbwd05lbc1yxiy41qdv2az8dnc7xs91r8f7iif4iw57utlbt5gxgbyqn03cadgeyola3ldw3n6bh5bwukl149ak53gmgnrl34brot9nk6drunik9e3d8c342jo2h3nz58ifwu8166y8r5dmj8uxeye91dfb5xz0w51zo78ufdqxx546tkqo2l186vja0tpgnmzud3vhnk301gkubdb426kfoggfcknzrvvz1tqd1056a97os7uw532vomx59r0fs4xnvb2ihhukhh5ifjsjdjpsx0ck9ky8mjd5bg9wzvzexrv6w4as5i0ef7642t99zn04dn9acdrrzdakero7ri0kkof9n2tlxuqmf0ypr5ynuc91deezw5plinqrjeuxfwxdb38m480tcsmdgg466v9lz1dmv0z33fwiv3zh5it7uawsj78digqsukpv9dq9',
                proxyHost: '4rue3ov9r8yevoscptvm1uylvpcvz7h32e73bidrzyvah7hwpm51qubb36pm',
                proxyPort: 7542472762,
                destination: 'd0rpwtn48g9dr8cpm4fs1zj6p4bttts4lgjfwg6ukwwfmubwo62q7iklr67s3uxxdclma26edzp32w58c4hpnfe32wjcx2e9p8fwq1xy9nvf81r7kra57rx65utfgaq5h7wergm84jglkhobny7svg9nqs4gri9s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ffg4j0k8vhcjaw6opj3u7s1xuy6vv8l04ms8zj2qut8okpoc5wm7t4mhe9yj0v2otbi814hfubthupe8q65ew8ekebcxqzfb4bclki0iofbbwgq9xtd5g72x4sxwfaxagl6qs7mxrwzcucqht1lnbvmyzn2m5o87',
                responsibleUserAccountName: 'xbx04gegcwo1567mb961',
                lastChangeUserAccount: 'bo0extf72niofey0xrct',
                lastChangedAt: '2020-11-05 19:37:57',
                riInterfaceName: '5mxcyxascsrplwg7b6kvy9uhyenoqyhhmh5s3cyq78kj8g1wstyahzj0gzeyluxgp1bo3vd6lw7ablbm8rt9kbkifbvuuq0gj53llydtaz5solve0icms3235xvudzaf0zvs4z37mibs79rx2kun13ktsm8t9c3d',
                riInterfaceNamespace: '4q5wpauggdooe8gboutxkm0deyurre1yyjmt1vsd5h407hzx5awg3ksw64yf0spldk06c36k5uzn2po7um21pxa9jhsi0iiaffehq0os07z4gt16040m4xqir8sumgeenq7z3g6q5n49q935a95pvdytbgmt6yhz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '5udr9ncevo1mmiu9zkaacgcmzlp3zbn7ebr18llv',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'a9auzps5gh4a2tf43vcf61ixp1g6f6gd1b243y00yxby498cg5',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'rj4z0huq1lqlfdzfvczw',
                party: 'yovrzz2xrr9l32gjv90sgeapj9sw40p67hdcyoil69vxi6pcl10cssn5epi33yczqqqmtceenwu6hg468w3k1kyznmnhs1cavwbz5smgz4awt4lak1xvv9qrfkinxxgcewgse61ro9jkm1e92jp9wxj8kv6sm3jy',
                component: 'xzvmrvg2ggem0p4ivrvmr27pq94i0brqq0w3j1e8e5bzjl29czkmvjtbubmfycj2292xb3efhvufeshibnvbimysy57l0jjya6mohv6up6hypmaokefghrtd4a8tseu7sukoakz2w4gbw00cepix18ezzsvgxt45',
                name: 'ur57s3o162uv8lvyossbluexflcbh0tzx226ofrjxdzq06nutyblzrbhj72b7j0qtsr5dhyhljxnm4lxcpdcslgkbakhiewnzydy0uxhhro5x5msbxmluq4elu1o8pbxrxz7fn1hp7871bdu77c5ek2b0wcx6bez',
                flowHash: 'srhz9awrdgz07109wqx6dcs6dzx5o72jeb9xglsu',
                flowParty: '16ukflomi5aaoviz7z5yyfuv9m99qatxjxs5ltsdxi5g376fh75i7jpmrxsun3b0g846ykrjynjsbh4vi5xoqve4368wdwx30eib4n9s30n9l1ay3t3hmwv4tcinr5bhwzvynxj0ueoqe8db9f5dqx09mf544x8k',
                flowReceiverParty: 'tg6az2wipe2b6uzytybpymt1ubotgw826j1guikkivykn8s1q1tdk671fezgq6y1eh229ybnya8v8zj9mlih21fl4f27mc3xoz0sg8ww0ofn9iz5kzxflvyrwau3yibt1c8guj24r6po5qiu2v5qc3ycscv5mxuh',
                flowComponent: 'a6to9m4p1onob4mg6loyn18kt3iyjju1t2rp1ajbxivjgsp3cperpgdcp9tbzf7l65koyhxgqaed6fiuz2w0uqddp0cajwid7rrt6n70n3uz9eq0tioxfr1bjocbqtijsbuvt2yz1zmn5at5se021ufx9ln9uaxg',
                flowReceiverComponent: 'z0dz8glv6bb915qh1zioewmxf1vp41yv4ykmldi98on3784z490j000a034rz90yopnto7phg3qcy8to36b80wijyyhgse6wexjgnok63bpspyer2e2v3k0mov1rkmt91fwqn20h5g76dh11ezhpdtsnhjuvg9g2',
                flowInterfaceName: 'ytp1zg6tjc9o43wdeoiifcv70irj4wilvcryapxpvlh5i8gi8xnwrrimkkq4x39dly7nveesa75xllcny1sfhgao1y3c59y9bh4mfi4vkk3exsecmftahhl17gbo0qlz9hbsjhwjlpi01ry0j0ss7srl11fhcyjt',
                flowInterfaceNamespace: 'ee2c4d775tjx77lb7ydbarq2queoue9r49d7qq1eoig6meske6aaezrkw91x73j83gulkurzr6veubcub92k47hpp84phbcwh8mqhh9n5u9zu5hq8p2s5kkkyndzmfajatee9xpmvipu1g7u9p8zwi3w1vb0x39z',
                version: 'q41jd1r7b0oi4b9ntbq0',
                adapterType: 'wev3046ezp0ho1oqwypra48781p9bofk3k1fljbrgjhartjfem0nps4lxqsp',
                direction: 'RECEIVER',
                transportProtocol: 'fbtg2c4umff3l4g58yf7ym63vyjy83qudrdyv6fdrvt3i83abkw00m302w64',
                messageProtocol: '0ahcrciwqkwlf424tbf6g7ftevjpulqm7j2pdvipq2iuexogs4ajb2q8fp93',
                adapterEngineName: 'bmovuwz2y73ll477r7jf8al2qcvhhy4w7qughs1cdfvxo5fjctxb9pkxp02vt9wpi474i2zktc1h10xw4grlpp1yryyiswaqg7qd51j290zyb03jgb0nevj06xytt8sngbkf0cid61dhfj6hk6bdmnc6bw5nji9r',
                url: 'a3obicqiilz168lh332pro6p2oz7zmxxadk4jydsnlxsqsd18oy44crtg5zoi1fge8g9j5i81gereg9k5wcac33okd30xd7eo63cji24odt462c3z862sykgkjfjuowopg5gs6imy3ih9sbyywmvrw7zrg7ns8iktr3nil7jooybxqxd4o906fcsxf8gjanrwrijgojtq14pfl5fia5r789aubmv5hknskh5z9u3orfmfv0ek4e2578nccxgnip839gk1h11tys2k7repebfe7jyxtno4yhgfr5p6gowqyoati7ftzxo0x2a34znkebs',
                username: 'zm1mg4n7tfh3l720yjga095v7vn995ne2gqxzy8il82ghjaag11iza5heysg',
                remoteHost: 't1xxa93y44nqmx455zzwxrnc1jkv8ksonznowagq33b0g85c8oc5l8bqeiluagt1m5u6fu4xt127wegw3sydrrrv4keas6g9ti904cai3tuudvw8wqf0g7b56ln5phkvz6t900mqgdduu21wdqoyl7r0fo7j6uc1',
                remotePort: 6493369300,
                directory: 'x7c46pnwjh0w6fiasium9if8h3dhy7p7710ab2bt3yi36625i15cdmmkemaxki5a718jxmdrrldph2tsj1es0h8wru204jqi104f2855n21xh6v3zfonevvgsbknb74aid7rawx31iwlor6ckkvule33djurodk5xfrm1g2olhqlflllhdukd2f9d828b244jp1fdj3wxuyc4pkknb3o6fsm22300ubqd80vxzdsg3jjmkrsr6xrjh3tjplp9aolc57gp41yeswj8jk1p9baizerr4ptobptenuwwtr0oxtp0yns9pdoqlgchq1f2bj597b37ikhen01jr6015hye6p5wb3cp20c77y858vmfc0lbrlnv5759zd0b2pqjl3phjemkej6ip34b0x5ynv4d4dcv3idw399l6z9b3f5quuq7si8v4hyd76vkaekp8a76vcrg2ce56d29hs9ucntexsrhcdgxashzbxq5ihb26qo2f04j3w5vbi9vxsz8rxqeuv1gi4ff1en9ebd28z5o4sf64l0hktb51hd0mygoupgjv9pltnb8k39v5g9kenf6cgp50ev5whb2wrum9m6iolw6mlstcko4wieac6u82no34w3ku77h3ai8o9ceofkx3aufh3flrr9a7hmqqw5rouwum4bisbkcwvvlvdwul19su798aks8bf6da9aoa42x8kqr2acewpwulmx08ftcg85s2ilvtm4nyc65f79wdmwj3gfex6eiw2qpffenpxz687bwo1eefl33qoaiiwkimpmbpmhb0hi6u30tlzjfl7tu9tdg1hh6eempshg9wpzog8f4s8kdxkzohga5zy6yqt5m17ee153lkgr9wi7oqv8djbqrzccp5zezhajlh3xoeflv620rmmbbw22xffv2zoee4gb3lqsqvwer2uswx015i8ylfy7nkimsikuly7cq5cdfndtp1v4nbif3pjpln5lc6mox2pe81ywohzdt5xbp7dl17j70lyfgpsmqbqr',
                fileSchema: 'du47bpv7fwdxt9k7ebzzivy6egylb2piu7h3a68izb7ynb2p31p3a5s73l80khd1mk6yh2ty0oc6tdx7rf47p9qb30e41kv2ey2ggsypd7p9xcomjlubu7wa1epv01s1ry5lz17vinhu2gu6llz674fjw04a25z4tbbwdya1fb04meq1zq248xoutmrbgy7gb85u23x902ogj8d4w5u7prksjwctsiz1rg1rgrzkdams6s731yn3l9w6719i9l8p6amxe90g1ewmju8n114cgplrt4fo4unfd24jvl4ladsly5dhhwekyqwj6ggukef5k8u4rqk0dxh60kltzd9dq6s5ngvqzgkj5cqqg60ksc8irmdw3asotfjxkmclhv0hgr8e25umwmadbic1aot4ustrjmga26x91xnmg91y85pi59ccgx2ts700m25or42cn0ogck4rr07hyxnpbj3m0dhfkcnh1pnqzv5nirmnygw8vhmrbbb2mc1smy8rmju3aznw3mucvizuw9cjehmj7dlb1d8v5ec9egykuunx7g8g7kvc95p17egaatuxtucvq9esxohgzgrdajxgnqkvuagdu5gp3mra2ox1ai0h8wbsmwmx8ngqr0u4oaeuwzcmpe63919afa22fobxrh6mji4sqoycmxru6r14msoowtfihuvhsjoxc81pcsi5tyg82eulobib925g9n6fs8c6eo85ksgg4uow8dp160t8vtujw5n6xvrlt8qx27wu0pzon3g00gh8dpda9xzydckgylazkeneernbqan8e9pbyrikdz7rhpvhutcjojcxtk9xag5awrq2640jugoyb3j2iuxxwtbnuungc2ii0muq33hz4hgqhq0nq2r21tkgm1t7iv7vltq5wxbdhez41u30zzayr46sxbjtjr145kxerqc2emah1gj1n59yyua4r97rf17tw9tb4vumakimumwxw3gsosagfnmh6dy63yc6fmtkcqldxlqymzns2f38wie0',
                proxyHost: 'zek44aau938fo7yi6tcq9iuc4jtkuvmxzwp1ksgujtctr8qbdmt6w4qjl9ca0',
                proxyPort: 5011049297,
                destination: '2yvcdeyfj45rg0cdlncqpk35uuna6r3hxzy43c3hmk4n4c2ztqa4nqbh2bbmp04neasby8huf8t1fbkk9jd3jb6mekohpyospkfbnkscjbyzh6g4yzlg4ik0x846c8rgvamb54riw41c5hts11n0oz0rf3lu7acw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'omvzo84a3inye410j27mjq6vc3tp6rzos5bzqk67jkkrv3hfyzxmqbons2cgtokiuhusiktymz60vcnnx8yb559y3zgsu43t1no2q2f5vvdik7lgypbp5qotxmk65stiehxg8hwbf6bkd1yokbhjnq03hmmbrpbz',
                responsibleUserAccountName: '4f7oqwwc3sx0hv0f9io1',
                lastChangeUserAccount: 'vx5xaqxnxg4a5ma97f4y',
                lastChangedAt: '2020-11-05 16:43:43',
                riInterfaceName: 'zesiv47sodu5r2eqblfksggn6qxw6yd3lsk4d277xjzoeuuyd7kpgxet04iqwttygeakjr36jay24fp2cz402q9tyjxjxtpnkjcrmxbkjlvqe0s952bj17boxambbyjw01w467mmly6v6wt80hb227o3m252qxix',
                riInterfaceNamespace: '4ddjm8554bqpktj9ia7t198bj6c61nfn15vu7k42ekqrzx1qn3wdplf14lvzlweu0nhfre2cnr8t078yypor4m5o1vl6ve3qdp1ua7k08q0why4zy4zwlwll5mcs7p55c3jntt33l69znhd4vobyehlehvxa8ekw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'vnf78pqdzn5s54f3bmplnge7j8iar84a9o8uvdh3',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'x8cjxvpig8bd35wkofx5zsrwk30vqnzbpoqgjla1plrdbvq7xb',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'imf9rfolhz00z1e9tdlm',
                party: 'ail1zfu05jrgx5iroa02ax2jlw9m1xh8cds27tjy29y1a37xspiujotvnb0a4p0768wj13sgazlljdtuu3180flkr232ev9ska4mw4u86dplsyeoppaxzqixbv8tbqsg1gvy6g55l7scdvyn1tv3ydy1rjzbj9et',
                component: 'w1tm71ds4n9m7y7fourbp3q9k163hm2w7qn9nai6bsyfyh7lgi14vg17pt2kvd72o7rtzn5g44z4q8nzbo20ud69q61u5v1utadhvxm2qza2p1sxwra78q5ixxxs12wt4tn41k9z2hi5rct6bv7mls5p26u4vypg',
                name: 'mh4pwmjwf7md4o1osgytwsmtyewxqfngi8t1gua6szx8znl8bkdo2gxjtaeaaqyit0gxvfpppw9u9kv9zxrgi2yfj5gs783zj6h3kxn701lrnwtn3ilo91q86g6f13zv845qj1k4jiycb7258cv0c4tp97d21zbl',
                flowHash: 'cyctbu3dao26537fsd1k96rhn9r7mdga8qlrvzn8',
                flowParty: '8v8jwik9dd9pfyrxcti2c2avzmtlydocn8jk5gb6a5b0z15qsss4lhs6qe3li1j4llrdn9vcmky534zqd6zgn1ksktia8ypxr850fluupa2fi5q9udheqcmzp38qn6k136v5hkbvu8nma8505074mvv0o5b0fpvj',
                flowReceiverParty: 'uv55h3wortque0ao58abzbnnci0xin1xk9rhbxzhjeu1qodwiiq2ccy6ihhb9wk25jep1tgd2fo3owoxvd94e873czpuma94vn9mb06az9l7580057vaaqgn8qqlqoio26k67uzfsx7avg2zbhcaf9e21s10bf8k',
                flowComponent: 'qffinx8lbggscyz0wem6k05iw796mf9c6j06zczu237k3324y2uhsxgsi32qx94w4kmwitb5ecaqhcpr5nx64c8v1516kzrtzug6oqz03p3t9ngywn0u570j721hltlfyfdsnhea9rd32vh4jh5csuvbrngxnrjr',
                flowReceiverComponent: 'lznbo2vwafwcz1tbm7yqbb123xjl2vln0ra7yc16907lymu7dc574g0fd07wvo1elcy118rfmfbb3bdqwlaxeauuia82ay53j09ooyelirwmhh2h33675ae1w9hbwqa0euoaquv0v395ed3xqddtvr1i8kwulc7x',
                flowInterfaceName: '1hffb58dhjekni1rxm592vyi0nhoddie692gvt6qeng8pwlf1gx6apxe6ms72hnq1uq46v3gwwaxjpnds1mdic9sqmut07493k1b1qfazl21abrqv9f33gg300jnm61piq3vz23d0eus6mtk8ojnofkjhm4gse7k',
                flowInterfaceNamespace: '7u0nv8brkom0276peie7slq9odaai9eb82jzwjtbip6jahbyj4gv9vla4i5g98xt9cjv3ugljgowvhtfe1jub62302bra8ytao6unbashei607vdi8uduywwwgc760qaa2z0z327aa9pinnto8ubrtjw7zw8ct3e',
                version: 'c8yi1e3l0j1rp7r8fhry',
                adapterType: 'otm2rofz0wufosevuoabsorrs0h2z1bth2uqlghbrr2p76bmz1mpv7gl0bq7',
                direction: 'SENDER',
                transportProtocol: '94vgpr3cli5rxwttkjttmnn6frkf8hefqqdg8xdixqz765ur490lkb2bu3uq',
                messageProtocol: 's88k6ks8iaj6ts44u8k164k90xdsom7nazj3q32rp52076yq3b7413u0e62p',
                adapterEngineName: 'b8gghj8efcbin2n6jkfielew2glgkrnxqiquqcatmf5ag4aljd1nfkbdczvt60yd2tngondwj7t4fks62ba0gdx62nkkjdngk7sy4hfkeov25tv33dbxjxqqroxxlre6bqyvz5br5sy9zrs5bk45nmsz8g27sejm',
                url: 'o08nv18xb671bdiklb6pj9vcbcr9zch9o8dva3apuwx9pzuoj0ks0b3itmew1iedcjbsw2l61lnxiju8reelrupcaqhyve2divueui68gnyobpk0ewmpjoh3oqtjeyxy6zedlf47jh84079ccviqvv9e6312jy8u741mm6qjqej63pu78rz9su5mdxuc9sgsu2vvlebg4o93ysrs8yubpqwc9tn6dst33t1omvtollnk443k5anfl9crml9lxzvat1vg4881ht8bb03yssifbh8rp1y9ie8fjd95gkgaxv4g1c9qu64reip1pokzsrlp',
                username: 'awbanhvj0rtjhtprflvmvezq9yd4168h6raagylhui8jmno1n6gg16pzd24n',
                remoteHost: 'z0cts2l1t3fak96wgrlfgn642i3vohl3vna83mn6qwb9beh3v5hsd8qm7hqj384vucqfm6k14q47yxnyalgnk1zfllbk4s8v1uek0iejkikag4xitscgaj4t8a7ojkhhb8pv5x07a11wki60ajzcwkmx819gzh5y',
                remotePort: 1818224651,
                directory: 'nts8jc3gofvwewehyj8ql5lyzxi0ti0lxvmuwrsc7z0b4aogxw5h98g7vjwvlvt1hl6ms0s1adsu2i3i358vizpi4o8ez93jzfnakio92et8s35386q4hur7ngh5rxoghpuc47xmr846ioa8fvoglw4h9wvdjs2bq623j7ygv1met7g6n1z8k4901tl51ewy86z9o8ngz7xk5u3s9kzjx61x8cbh8uc8gvduddzbubxd7xtwn11rrlm03citprddbg2cekaw0954cs1huh4wy8rlwv3jyov3obai0jolgihlqbp6uq9pbdoksv2q7qeyhrxv4b8rl3ky2im9whxlzzmad4b5x7kmq113lr6gy7znwbtxa95uyin6wdqfrtd1wokhs5ltlg6cucieav3glz2uzuzrferxpr0rxaqa5mbchcjkjc68c4qb41sermd9f86nvehjkwyobevprardi6heq41p6o26ehshb1dwplunuv7kfrklum2is29p7z33z5mhs47rbijzp7s7pif90h3b2qet8wesjek7ec7euz8mzsruobhf4pagkwc58e3yixe0dv3f3ki3wf5654t3tjewpnjxshjwai29243436vr4e8iihyltb5yokliyr3slxiiqq2bx29cmej8gvv2il8exdsyie1dxwpgiojeoqghfjxiwtmez3zusis1fkvhbpddbybjomv73sa4vbfe5ny0ukx2p7b2pm4qg6k0i1a0yekle0qxt8jzcce706lm4h8zsxg6srmg9dhmo0zoyoyvozt672w44jv3jja6bxf9ojzocp08hlwrumoywhp5u0pua2o7aztj2t89nmyr84by3k90xc4zz38ajo17ehu67tzyelpwymnkeov5fb7vddmk6nv2aem1i89ow7hrhwwdcacp82odk5dd3wdl7f5ilix341wx0i7pzqaw8cp0tchtcs82233lm4p3m2pttm8a3o6i689yds4aw52w6f7ulppz2rw1909zz3s8ulhv',
                fileSchema: '8533nyxhfkwy0pd19fsjz45uzqzsa3q85hnu1fk23rt0q6p90ysrgkhv7mp5e2qv6v4kdb6xu6bv5u9kdajjfuth8kitievhoq67sdejzilkf670mytaaurzyaljyxzfxbja7vuuhn20nh3q0wfeoh9fzbjn6yp7uyfh2yrdhkx0un83p1qi8a2f0nymt8qhp2c4xpw8jhddzpcbsr85catzsbxcxevqwolw98dwfjh34yzov1pr46w227fjrpryw7yflyveydsjqnylr2e8lv2pq3tbeir8478jdkxslvgofskj6o23id2mz1g59airlxesudeeq11ivbf3j7htljurfgoid1fyin8rpevjgvjhng3d3g009jlxamncr496ggj0nehogxsaf3v0044mwgo1zohegurdc8s1st6lmi63ihmt15irc50lbz33zg4bfhypb4bh31jf36fj9gaqyqtr1nh2nwfvgfnav61si0uuqe4sy53m3fuvnkgt69fbbf46ymnzwnf0exafdwl8wzew3a1ghijy9b50da6bmo8vn3dtr9fc9ru3pd155r3y3npa026k2lbegx8eq0aqkpuz6t9vgp5waeyid56xl8flxgcz5wvr0yzfyux1xmj5qoykv6nodlfz231pn2jh8xi3xkoq6hyi8y35dfk2vbyi5s6zept4alzamrblku5qsxe5d3ushfpe4kflxkkrpczpdnjrivrgm6wnl23002w9sok0j7gylawemd96pfnd7sorhoy5iepr7fede6y2dq667jlccxpoxdnhowg0txcb74kaw3era0erx0913xkeri3sanwfzh0b5ju1awqrnikwmihkmcdg6r99tnikf8d1kepsilhtjatmtc1ng57ppjxfu0035zkmpjzvulgx2ste0ues29db203kpt3eyp3bdxo00ihyo5vmm9hfjofq0nhk4d0pghkvlurp0b9qepbv2kmi9w8gpulfarf3uobp720tts1we2gp8nhtkg8z',
                proxyHost: '8iik59uc9ukddjljscdjz5ygwujphskgor4gbnc5onrjzbx1fl7ecwodjzqs',
                proxyPort: 35071957570,
                destination: 'dkzlfptl2jsjhymzxds02mep4cjf4obre8k0tvh23hoez0ch0gqiiigl0gzdlcittqb15o57hv3l6hh31laqk37d4eprn2mvtm4d5smjwrezafgyx5lqyfjfydd7fhxvtnonbco0ao523w4by5oyfownipe3arsc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'js6129wg7wlr2i4t49if0qnoi46p6w7lyc4mlyh32qflzvd011rnd4zdoznzuz5vioposbqqfe75jl12i7e786c1rwyolbfdnr2q0l069lncdof78u514hrygcanlfjclqmss1kn5hqhgm0zd0qle7t41v8q25rz',
                responsibleUserAccountName: 'cj5goq54mbtgp14nfjt2',
                lastChangeUserAccount: 's5h3a74qpabv4ngnjb37',
                lastChangedAt: '2020-11-05 13:49:17',
                riInterfaceName: 'xjnxw8mt2lhvcxxd8a2fgmsvaug26kc34dacba3u7t6yunajdoqpv23uqr1jz2sgoqrror9f3n9okqu3y3evnitmql3g6lx2sz7m1xhebldlyxnyc4ff9ywlnf9gq5v7g2tw6bmgfiw5shb90315g4klcypng13b',
                riInterfaceNamespace: 'ti2d6vjxkrpg5hjk8hkxkujs2mebwoq2p235w1jjht3igfn50kj8n3nqt1rocworf5ex6ej8hc8edd3cqvb574g1hidaqwb6ae9hv36pb5zoriwcsd2h8n0j2l9nhwjxlc07r1lr5nw4awwzjalxmtbv6xudiegl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'ux7wha0c7piwfwj7f7sy8q6t2ikngwgfkdpumlyh',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'ozb9jtiugqq9hj0ix8ln8tvcnz1gibx90peqfyazbe6t2v552v',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'r9xlgwrrthosj04wprq0',
                party: 'fefomz68rx4hmzl7tmjds1i8e69grrwljqg4srs4g42t7fe31wjdoapz1p9l6sasqnfsjo1zqsx2ghge50kura0jjy9s40moncfc8ozdulm0rg4rlaxcd1z1gzsgt9udre8ypz9xjk1bunhoau80urs4qx9nh24e',
                component: 'ssdcvofd87lu16im1mw0j24qopxdo29hmawjvovudz7iu22oja7mj2kvi8leqznvuislv9312p27m0b90ztau0vs4emns69uvfwhd5cszhdq0v1lf54ymuqm2s2uzp2s8tq7s49j7dcuabmnpto8xkr0208g25y1',
                name: 'zuemta1sjrxwjx8zs9rp94ejd3okap6e35rnosxvjfe2va6ghb1pbsvv9dxidd3lolyb0r8hbnteiplpim8aehoz5hbkfi9qu6kc73ukmms6t3v2rk210vwttxkightoyzf3cn7nncjokyf0uwrac74run157ryt',
                flowHash: 'b0av4mwds2hp6sdj61xh6vt5te490v0oozuhs09p',
                flowParty: 'vblhvmlvngox3ydjslf2fz151dfcd0vzypge18lx9rjh1h4hqtm26n4k9gr4y5k39rf7r48a6hidyl43gs641d1bbmwje62jj0s1u4zqwq8oubrechwnzih0637osfxljwforujfjmw44wdag1vjb55146lq4c5f',
                flowReceiverParty: 'pjhbhhbb1kkva6ts1j19d7j8tv8z6phlp04wx8p6vo9qhy8djou2ykpssuq11rz3ea08962tv4ddvnn5gn8d5a47dlrw6ap4gsw9n0v2y67bfvm178uiifqzv9vv6td6q7dmji4efinal57xeao3nkckuulqvjjd',
                flowComponent: 'pf9lvo4l8wto0u0uh3dxx1pxmlwek9ufu9mbobd1lvd3e5wwowmgftphn90porjbgd9x9v6w5ytfehk03yodryxf7b2nwwwg3koqaqtaiswldx7yoicwt86bc3v3hrhl5oinsbneelhs54a8nesujo0zywzknrrm',
                flowReceiverComponent: 'r4k24cat8206ztonn3qts73kq7qz8a4pdcigut5h0hap7uypl8w1gawc7iv9webvp3k4dr68u13d1ud36gpi06xz1f7r3153uwq1b76qq74z3k3n1a9mbfo2orctbwsayk37vkbyu5wj45iov3qqyipm7o76gjg2',
                flowInterfaceName: '8j1cdxy6znz5sy89ijrb5gn589yn147udcp1p84zv5pt92z706k63y2aqohkxnmqha55se9evbdb9l47m6r18rpb9z14th0iv2lemji78enbdoyetmeabxzkfxdif53xnzv1vl94dkwltgs822jb3gtnnr7ub8nn',
                flowInterfaceNamespace: 'ddab8gt7w7keg7ndn1higizctbhwxk4yzsxd6r5fjp8310ug92bcbesm7mdpyitj5dbdkllylk3ystox80v5j17oqduy1s7nuwfiifn121mysxldet49lafa1t88c4rcgkd9jqglx0557cggnu3cp20c5tw0qx2t',
                version: 'v8dttbzb3pcpxxs2yexb',
                adapterType: 'da64rxzth8folg6f8khm357443mn5vv0fa748nmtcx3dyrznpcw1w1tdms81',
                direction: 'RECEIVER',
                transportProtocol: 'qqfwedc0t165eu6yi3vr5cs8kul0orydtllpnh4s9lh778pvkylq8zcveutn',
                messageProtocol: 'u01no5ad8cw3cdfsi8bch27bnl1p1jc50sn2ktcf83e08at62yo8tiypzk2g',
                adapterEngineName: '21dghzrnronz642b3ntzqwcaqasutzgjcapar8fzhppj7zcsguyude34i00na0mag7br3b52sdxebg1s1ug0q2w6jjqaakvjqs85dc65iigzjyh7deydcioc96ov5akl0v7c6s80h8xjv0xpaamvwj70ej5dd0ck',
                url: 'w9xprlb4bkowtdhyurcqxy1kcz0d9qe0hql3mw1j60yts15ja39myofr4lylvndncupe3ziazgnh27ie1dkbjivso1lcvyojxiox2yi67c859mcfvyl4tfsynohfv4muzedji4b8wseiqui8nq1wgi17enjljldwv9a5ohfcbokfwwc9aakdolz5w74dqco880gbre4cf0jni4f539nuz0zvh56ywc2x6mdbakxzrwmqyzdm5oic6p38dr5h986qntsi9pofkadx3zsjljt23a045tq1dr8h7beq1dl9p3sbu5htv2dlwdyg8dr8x1xl',
                username: 'iyv1vntpeu9fm6i62kjutmel1txsurg775izxtbn0q9inve8tav8eavz9mo2',
                remoteHost: '4cwxwt9vby48c8ivlp2pj5srppacpwhdmfhtdjslhsxsvk874nwpvssm8mjp4zmhdjd9e0bxjdk2kz65pilyexm8gtqy85yo4uj60swm8k84k8gkg3a5jwvzpqku3t0ar2iog83xg7tt79lu5s2kx34avhw5po3m',
                remotePort: 1271475776,
                directory: 'sm8laapy8o0ynsli9ft35h95h2883db2u0tyebf93oslgtnz3xf5x7jk04rw4ftxqoqkcplro5f700s6q49x437gktttaw4vg1bgvio55iwozebarfze35jo7uiqujn0mbld6eqsapcba957f4bhcdw07vrnhgzy8qstd3dm45tz7owfoj0q4op8p3r5s9twct7exci85ur1punnrh142a615gkoa6vexwv9x2g7tx0b4rquzz49ldleaw6wl0a47qzlmo777n8w0z4atcx89oipq15tmwkqj4msazmpdhbv3ihre7afgyin6e2c15rdp1m81olsr128og2tepirphaxmtu9xnmsq7lotosgioptiht09lnm7wngpt9wj5m2ofqp33liyod1x5nemwb6jkxe6dtc84h3sfd1qvcb8g9xsnx2dk5k7tkbf0f8q6u3hgscs9osk1bc0hgouy9mt9eovq21nkbkiwdvlhm8ayjxslf3qoe8s06w7nwbbqg2iy8ne14nrwe3qgqga8fig3wivgjyhjcgikwdey7l1ftv1oijozqqqzz3dmj54m10ul8wul3t0i0tjinw9dmb3dx2gmxv46sri3mq1p4o9m1afon2h0ltur063tun1ffgz9bl30r22vkfq37510l3j6jr7uovz8b9bie39iqhxwnln5f37v9szpyl78gr3h78q0x1ys5o8ia6bnzh4m792i2v7ywvpol2ge0b42g7cta4byn4azaq4e5g1xsrl9av5grthm5suq25oawecgym4cylizzt5xb0gcj98jdxd5fiqg6h90no9zay0d07y56h97k6kgcd56s7560jbd2wga3uasuram7g6tjubzjsirsiufoy1pgih6uijpg8t0afj9gd0zpsx6252k1l521crpso7jm53ypys1q1o251w7ooykmj2jy5gr4mlxs6e5ptajtpilaouv39u6hg94fzdcq3dynjtnti0timdxjvmcdw281pvw4oc2yzofjt58bo',
                fileSchema: 'ec6fikg8eu1hr21zro22hp5ely5n5oghp7z7nxnba27h671pz8uhx1h7vcg12g4165leh7cku9wnv6ff74muudunpm41ufnysk7s6zlzpickntubblnyjvwhnxcyzuwassr8ktu7c5ruz2zv3966616ueduxs2l5hj9t71n0qy7bd9z6s57hwfibvx0etsckjerrc46xgxtilavzkegxdbqyhqfffphj8fa9mcn5u59649mygdlx5ymv5zao3sprlq739i8ce0v8qrx3k0hpq3jwnmneh4h4658dew4jt639y1qv0my2vcxl6c5r3k009ppk3cj29xeah33pd75l3v9u1wbw7siiaip9bxxxep09cth9g4enmclvx8bd5wzju0nwqa9rng9rlp0pgjdenjwpxsb8io2f7prxcr0robfeaets5kwdd4h86pjj327707wisd8np9xp78gicei5pneozj18r1wtdv4kt2ecs7nexlw2jw8sm42738ugvh8ae96w2hwpip0h8391q7rbs37kkwyd6x8xuw92i282hnw6dm4osncyvj7r2avuxndypoe3rrhds4v60rdatl1iivgfha443od9qiidl7c0vrmcot931ch1bpq0q4gxzoiyju55litpo6f5melqe581pwkd8hz5veqay19s8s7cmdnipxybg4iyi33wn2oo1m8l03jy2qnell4zykspj86r4g535qk44ew0qc2mnuy7j2xori3sb13sfthf1ad2rbynxdxk5cpgnvhpvt4z8tkfk7yjbb0yad0nks4tb570qpgoux9tm481owd4nnebjwu2qc80yyd0xdvw3l5wdfj4dsmusx8yazeyodqhhgfg6igtcjvup9rzgxs4lkeqn8veteko4poifjs0n69h3q7krqjt3ug6cmg22hts7sfjjnvi3wlj3d3zswufil2t5nzi70wwvslv5miw4b14c8nsh5ffkfp0duw44icu22cqrp3v5onwckpxwy2e2vv8wszi',
                proxyHost: 'vb0vlbou4xyg005zffjrk1sk174kwlqukfeqw9qj0i729qa9ep0hnal4f66s',
                proxyPort: 8023482991,
                destination: 'btmt6n8l5vq52q8vcbwobblqgwt1hmtes8kdpctdcomwxhln8gtvcnylo8mrd57d6aefum8ri5b9v4n5wskq2zqtdkc188zhcmve3x1qcnfa04wl4b4p6pzrwpv5a1i6u9j0yy87nnlfv6bw0rb3v2c1dycy3636l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '06gfwmpq4b5zel42n863a361wuiejmmn9r4fqwh9jm90e7oa1phfqnlfinmd7916bd7zh0trd6pxisr4oovdtap0xjefg6seegavqu56jt6yxyewzd8de5hy5xbdqr7g6tovx53pscoavupuz3pi6fqxsyy3gnzo',
                responsibleUserAccountName: '6ssdnomkop997wio7lhz',
                lastChangeUserAccount: '3cnc9tcrnax0w6908l7p',
                lastChangedAt: '2020-11-05 16:54:15',
                riInterfaceName: 'oeci1378jw7spvt7zm8fpcvkp3jp4ql1e1gua6ojanvkmhog5t4pk26b1umw23rvjj7oqv43w9yvuljwzit80ezvfis8jsl05zf0dhwr4ln8e7z2595sugwux5j42mbm8d81buvit5c52cedhxds7hx1gfh6z68u',
                riInterfaceNamespace: 'uep0uzedceiulzz0px6gd04g13c5m6mdgev9jjbyolm8mqu908zkyk0zol6wff69bknnke28vvzvyror0ho8gky73s7fdemij938qnhhqb7dc00grz7taq6rwp5fd26cv4mt2tm5ht9bey4goigcwv28lznt5p8g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '71bgl0nhtvqqvnjzw46y65vd2teydniw9eamdbq3',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '4lgevdux3pah95g3wwazjls3n1utcrvpxj9ovmba60ei3tyhyt',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '9z8dfaagrktpuko1g2s0',
                party: 'r6nmv1f5cvvwdi00g7n95e7ce8iadz3t3eo12mpipsp95n3apexscjxx3vca39bjx5qo1awarsekzjzc52ok2x7ib136h8msm9yjfbg0bfoa3g5dwmm0sszoy9tfhj7230vmod2uyk86d4fz1dmw8zlgfh19p9ph',
                component: 'n3ms1i40001xsg1moqinjxp5hc77vdfvadxbpi4c09sglchkyu5ofsrjrtt0h9l0o5cgr8tr5hd1xn7bqejgf4t23opsribv7xa21735s2jyqoudmc0y7wjfwx3fvdgznoypicoedxzmenvr8x1wxd2sfkwveqah',
                name: 'mfskkmpepk5exd9ythf817ydnifoyk2asi9wyee7ekpz7bs7qvoj0qtfzqco4y4z16ftz9rf65mi1p3lyegpmeyco0qx3qpqqp6gfnb409b0hn5rk56fxvrjmxxvnc1699d97631jbws06c237hrnk1yoovnch7a',
                flowHash: '7ux1feyxdva5mtd62x6dih3bs41sswav1esojwex',
                flowParty: 'f5slxf8runw3pli0lj83g7gu8jvb2becqxvqbjp8hej3d5ulr7piupecda27o0vl3pebv6c9wpknqrey2fzjzca0sxc9lvxbbwnzmb3w8a8xf0gk908og6vtpq9q4hvb1iy28gcy5xyb1sc9s20ajpn8r5iooeaw',
                flowReceiverParty: 'tiorg5kvhrap0veke61a14vo3rki81d699ljkn7k71v2ij7tfg8dty5hqj9rkk6h88lbzjwyuvemocdu17g2wygswzzmpspt0gu2ddqrzxsmruw9j6tlfc1lpggvhzfn93ncv97yv8ogt4tl8n4uvkqucegcgi28',
                flowComponent: 'tnkpjged9irx8km2sqm7gs717teav6blle6a12xoj9i35j3mx9ylbfw2tf67jz8o56lxkk86zfccbcjrskt9jmqwylty2ykau69brq521zvf40obbddw4d2ynr7buu82o9eco9u5qjdpqmox1qwgjh5cqp0aajtw',
                flowReceiverComponent: 'lhbsb3rnq8vqtq9m1tacy0j65in5cecuc3x0uoh18qd445osu9zgcm70djmw1skjp6kdkwuv4631gco11xm84w9w2n31a1e874udf44jhfnkrh7ffzidl2meybnipd2fq0s0dntv89mci1bi088yyyo62m8zf3so',
                flowInterfaceName: 'l4qlsr1se9yohalyvvdy35qkcma372u1k5er7w22g83pgreo3xq3mbqg3z86rfmkw1zpzvw1lib51yvpffptsv798k1f7jywigcukep5barr1r6rrbctw7lvnni9bv7r23m48l2bf30z74u0h45e8ftl5jyrtxge',
                flowInterfaceNamespace: '3e2smcffyrppmdo71km20pgxzncrgrncod8kbykgtxocmazd9ivryrh4r9oepmmmezljnnnko4yzkt1s45jpp76yja8czb1j6meblw761mx2ibi9lce4sbpewzfou44md9svi599ybnuz0lmto82rkq7uofz2e33',
                version: 'vimpmgm4lsz94mvt6adg',
                adapterType: 'riq2eetck82jw8qq8qhlpdlmepyh7qjv5allrnt04tqthmnvlswx1tpft54o',
                direction: 'RECEIVER',
                transportProtocol: '2ox2d9lf1pra3yipeu46r30zvpat59nrgd9az5vea1gmz1qho5d3ryebuxir',
                messageProtocol: 'sblslakj77g5pdpahe4q3o8z7jyjnf3bt0trai4dq4cugez17cbmhtjvb368',
                adapterEngineName: 'roaugr4j6nfsgnkf29njjsokvdzvv20dg4eypnf0mec70qfnjwx4jqo9sul86walt994jmtv9ea4dkz3qwk5uu82qnd1zkfwnhwrxph0i7i4ugk9h0yoy03m1jj482dnob9atrymo39qdcldcnvcjhpebh5uu6s0',
                url: 'o5x4ok6umy52xo7vz4oncle5fsjhkqf855eh3tvz60zci36xl66opxzquftz0m200e9488qkg30pdnm5eivkldu328srcfw7308mm48acdmgfoclwufqhfc0k8ez2ck3ikcwlwgbzr6jwa33rd08wkewo9rjp97q5oujb5j091ifmxmi57ed9s6y2bqbqa7xp6oa5j2nzkjqyko4a4hq5tts2o091q6f9ej0jel9llvr0kzlzps6shob5uysp77l9bm8dbp1ld4536s0q5fdwu4n2lvjuoyfxwp3320rdhb130v8sk7iswfohurn08tj',
                username: 'fd1z79weathahkvnzg4xcufsmykfvfs02pcmtuib15jqg2zmbxuqot3nrrnx',
                remoteHost: 'ogtafc028p9lxhvwwbynadr8wt5qit4ghelk68u992e1lxc8lhtoa25tmobltafgct3ud284q6hh141h5fakax654xibvrs1f21upt3lq1qb1hwbcdo5vn62q3fzq1phn7eikofwfrp4guoiewwxtqo6xvqa541y',
                remotePort: 4875912619,
                directory: 'oyqbhzc0u6fstwt4n0mr7gmogjuqar9jjwr65i3cxikboinla0vdyybanoz4uazjzswnax9p18r8cfp1x750ymgt3hyprjp1j0ub9agospamhlvs126wsuj3hursnd7j10xu5w8oxpfk2fvqa02vzxlqld65hxo43gey45awwvx053wjsr6pemswxi0a6tjv0dwlg3227iu2wecu7uduqr1lgbmonvvqvzge9ii106zwbprxqxogcejkkjhdrrmgmkdh7fil4fnedrczdbsetizs6z6qbilyf3xm42hewo0fifl6kehv4ixnbph8p4hmmjqdjqavdme4us690h26gek06e79cqr0itjm317r571sfetsgbxgf6bip8lteqmqzwsp95fwkdcxd31zfgq6psmgy5j93x2wln7dk0ta0c3gwzw8s2580r21of7ewbcfs0v6s8v5c3e350otsr1a69kvwu931m4lhyx09n94hf60whevl7r8ynqi13ogb5xacqut2ms7xtxmaj9osfqdowlrsb44cw569t1uixwrbyeynopqdkyfzbsuqw8ps502ngl6g1tflxy3t7q06rgofp42g7z0xtyzgr9p9iwxsg8rxudf8i6dtpqm3vovyr85glqrxn2tat28cn9phxthj26pmbwng7kb0cragfp4oljud33mzzwi1zc2efqbvd4bkf70ham9b4amudzxcd3gbbw0kx2m4fvmy4wtokj1wf2tf65q2nmsh6hbzt0bhgmcomdbcugkyirgkwb90stfci62eycld8glvytuk6xt5jf7jzm9eiuuyjzcytt429p2frn04s98h757jlr7cn60x7cmpw7hweeov46s23dkh5d7im1rtzvet8h9ti7uwq2x508jmqbem0sdt8v3zlagyb0ztghttg848gj43g4q33yiojw1gulzf0ckz41wworhaq5ktr7frjcw146wmivx031aacltgwun4hzleqwyixaa0zba4wnm6kykz1yv5jah',
                fileSchema: 'e7a2kkgbhytnp11owxh7jkx2p8p1vymtqv4ethfb85v8yjtfqgycylzwd9en6d1uswe2udh3zuy0smqford6u2ud69xd1yxtnvz7ak4vuyucxr8azzxyts8dxc7fubpp8kchneen0idn02suz9kjfstt7qdd13zrx85ot8bbc12c2w9rkigdxafrzl9yqryhzjxug37w09j7vcleik268xbzxzlgz86ddyeh93extpqzj4mdix0n8zu3a4i2qnt1xct1y3z8dwfdt8i7aul9hz7pq5l6oypafgzrzo6tdvi7dacj47534skfiw0bui0flowbakdlfjcwao0104ymbdh1j3fborzmaaaxkh3pigaa4xr1h7d1b93uxlcx8a0hpgxknt08v29n439a50jd5smcf46ake5eooyxclh85vlpc77bmycv3uw2md7qdl8zq1orb9aqg16hyitdmkzv217dl7oi2p50zl2efg7waifmgwtl8q1vlqa135s1wibz7awvukv64ityd0s3gibvguvr0tkw4j0gsnhl0t19pht6942g6j3djwg9ceyb3ubr5oxbn8k35vyrmcekf8gi1tpfq5zzye3fz0is7obnhq4472wvq67jiw05bbi2awnd9fwt3xmevnksro4lsmaksd2vz3pkb8ppbnar8ryk2e13402f6fnqp1gsv1nm82ju4txpn2y8nrqblvzmyf7il1pn3yzve5prp9egeuih42i67fvv3ahahid1lo31klzbo71vf0nikbtpej6jkbmzco8pzzsp46xyrgrak4v35462vea73a2r10p5v9womp762f9soo9900xwym3xpc40iy9rt5gn68vwmzumky4uxp5dea5brd7mu83y9wc46qlkdjp5xznet1dg36ncrp7vtfrf44wsrtn1684h6tsbkl84iib7g3199tbsi148l8dccgb3qnpham57iivv982wqoai67w6rvxzrsddx7g1308cpo7hvkzymkpry1ywgr8o',
                proxyHost: 'f82t44xm95ysa7qa63rtyazvuzinwrwhbqjku6rtrivnqoc24mwjzgr8dmok',
                proxyPort: 4404656465,
                destination: '2wyzegx37zkvpbzes1bx045tz592cpc1xriny9yexbl3l5xqi1853y6hnyz7vxnaff05e7jte6wc1qqtuvxc2xuyszdsvdvalnh1mtif0stzer6r2d3lj6xlbvb0i8a4nyp1b12b3ia2fzy4soorrzx8s9fuu68i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7wvi0djpg4cds7lminkhfcsddk0jim9bwg2i5qgoseolqu2punzeab47e3a44s44ibut32h4embrrzcnjv3zzboi69e494u9w4kfx75yyu9dxmt3q5ijqzkxj78q4ocqgrmr07wnnjngy1svh6u44b1u8midz5yys',
                responsibleUserAccountName: 'l2ry1k7jeighndaqjsen',
                lastChangeUserAccount: '5mccpujwddt6su658be3',
                lastChangedAt: '2020-11-05 21:26:30',
                riInterfaceName: '614lfer8nibp4ccremeu0s48pq25pggr21jh3f1ixu2ah4pszr00gk582qgqks8i9hsf0muiz3wle4g7yfemgrgg4g0mpvtw8tyksuf6dfooetqwumxnrs5cmge6pd8iy69m2qno75kafl0ni025g5wmfqieedsi',
                riInterfaceNamespace: 'zz9z2pxq73b81v96iye2ovyqndp0c1xodfo2ekvayx23y0q2j00unguu5buzy5gxr226ev7cfmj75k18k3ks1wxc2x32s1lsjz0j83pi0is5slg6xeyrbtw433ynwg9oti1fpgbzutei5dmdcgtnkhjhhg2amvhw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '3djv862jjvpf7zkvps5trob1wzt7t9f3gupcwcz1',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'oludb5evur110lnq0wbbl8mwgbiiddboecj0zabtaaejffuqi4',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'jkyd133he7q6bnqp7jwj',
                party: 'sqrl4td76gui0pzvdnb9jhi09ojiqwjb2aos029jyd0d9g0k8vl73q773h6ncutbfloex0mbnley98rwo3i8iqfpbeczm0cxkaizxcntiobbm1ga2tu2pqjlned34fb4s7txk8u0i441rlezhsjkicv9tctt92ks',
                component: 'g9ywgpku4cuhiw7mjnarwmy9qzvvjf2mdhknq66kg0n5wkdocxvp7bj2x5x64hozrgmgk00k1j0cdf10ca5owniwnwizdy6h6t3nj7tbwxo9weqs94ejx5oqhy9mecjg9g3n41v3hcn8s0zmyubp03auvc5m7qxz',
                name: 'njcoxgcl9zht2x4jxuqyl9wsthqx3njm8b7e2exhk17l8dot6lv5lbb5q4idufuky50ycaau92lmwea5zt47v6pjb0ibgaaixfkvd88tq4cn6fxac7hwbjlsm0n48s8reu29beow1ovbjdfnw56f6bej1q3d78xd',
                flowHash: 'p7or0lgtt2zw59ragkh090w6uqo9i7baak4ey7rv',
                flowParty: 'ihuxiidkf0woo9v3s1wz0cz8nysrqhqlqnl3vlunbpzkea4a0t2eye9k16pxu3g37yrmhuonnds1v7kkiyluxs1lpkzbeqnzjc7whlkkw6uewlbi0d875mgd27kxv4rb9egxoncsb1d64k6gmmudwpganpuu5koi',
                flowReceiverParty: 'qstsokf8bxco071uqy9nc629dyj4q5hjjef6kxg3uu0tg9nshakjntcjpr29q8f5xyvxhy8l1bk6ovjuv3s5mbmt13f03hhmwlr1ib49507f6tn6wv1berddf5kk3kbuts4bjr9d4g7wz1rfyfuqdyby57w0o5yu',
                flowComponent: 'cm1kuuf2749w2dp1qo396kwgwr8rg6u3nyfjdxohhjts7ef2xjgg8bz89l7bvh83vawp2zmi0h6bzqvbixpn7okw0g95xocqgm6opebe3erk7ql6iw4t670zbbllr84jc7gagf548d5jsd7196tthrlkcsapvnuc',
                flowReceiverComponent: 'ex2io6yp51xbf18hzusgezqqz6xi0fjruq5stzg9sje9j33az9xnjawtz23luh4lfrhbk5cg0m9rtzfq15fwkg7wmavc5c5pm0f5ecqm7jpsd9qispu3wm9cxytr8by8e3x396turra1myx0stcdenfsza0hv1gs',
                flowInterfaceName: 'bb46ece913in1fa9dj7abeuo5zw4d3vq5legl0m0esatutoiqpx9679xqzix73z3qrbb90m5dif3d7mk502ex468xc4fojb9s4o2136ojjrz0k5whf3sadfr2enmoo3txseqsejwx5lsi9tdez12c1e3d2tuh63g',
                flowInterfaceNamespace: 'yiequgg3t1ltj30e9wgxr7jufm47tncr28c8cnb495iufv8bg2mf5x6gsrhebbrxs8hgmlaf6qxn8s16cyg3tg20kdwwe7p9wrxzgaxbtg5zicdxehfr1q455yxsiq2uy3m7b56q6jut9wpb0nn1kxfeirbxwrju',
                version: 'bx1curlyc7sc9gmxcxbi',
                adapterType: 'vkg29xk2ydkl3233rgirquwtcp7bknnpvoj57jknfm60l99i08x2jih9d5k6',
                direction: 'RECEIVER',
                transportProtocol: '34z8lt4q98bazcbcgxgfk3hgcthvwtts72hsm881rze6sg3ynfly86jd7be2',
                messageProtocol: 'wulgg28eux3ta62wpnnqxwk900r1c3emeqbudu4viccjeaep8qdcsexwszjl',
                adapterEngineName: '7kyfei1rxd8dkkrn1s7u7w90fu6h7vggjtt9jrpqcqgt4gehs8ncyvowq4ui9a9gxx80kpznm4uu9iao3mmulrd8ojcbpovxr1fye8nggttmyzrf7vkz4re7d8x0zus27i89wy66ef1d7e18oe63oznpldtbh4cx',
                url: 'nahkpumpkutc5wdqa3vjpgevmb79e6ojn6hxkhsb9ko6mf9d4n1f4oozqbq6zqx4rtkijuva7jt699asy8568jcr7xkuej3f7wxt481o6lie11fb3g08dhegqa7t8o0le62vb5rl4sz1boru1rrc1pplkb29dha9lew56xfe457dhid19zoyzq3ssop0p697oaua8no8cjenzc6wii8gerfr960tfvb6xcu94fx8bhoq7uv1ldme6m72gyn4bei8rp7u287vpubyxmcw6luwrymocm2txpgc58aq2c41sx1edr1ne3n7xqtx9v8zscv5',
                username: '4q5thsajctzq4spqtwfxku4amrsct3fdxs2e168bnyrrfz8jolua26gzpdqf',
                remoteHost: 'x64lj91d7cot97mktkeaf7809jfyo1b28d1vxcrcxhippk2spq2a9k671v0l9htotg38xcj8otvdtyejhtfx56clvqkfyhrap20z71vj8handa3az53kmjogq2k3h7doxgx4yy4vgmmj7kj00p0vg8z49gzuvtue',
                remotePort: 8920433780,
                directory: 'sro59swzpmmsq9uk332pu28kdahsfsef7cvl0fs150i3ra777k3983h96zgjbidewbo56hhwppawzsailemue1y1ifan6huivguoy1a6iyie9xw0j1ez2f60gevxix7isudgwmh6shrzbphysleivz295o1f4u96zq0kibzhfsqdc9yeq6197m0os6g2yt3tm1euvd3n0tb059wfwt1j2in1memhyiqkszdhyaup1dw6glp23fc53pxwhle4f3mb7x7bnmhi9vkhq15cw6mv9qx2xrr2a040xh32qp39ao2v8gdgco3wouy0zyw8yu1r5buzay2qxu7zxabou6hv21bb7k7tmd35hury5n7ul9xb7n7gb6f6ksdinnt0ldp2t4ymwodnwprn376q2g4nvwx9yves8ee2vr3io4xnxvwaxbogl9rd7sdtt4fuew4wn8cciwl0anag21o0hlwm2gomrt5a05bk97f0iiku77jpsnyoa1ji9ou4tqhnix5p6t7i3xmjqp3kxw4dqsoy40pt1j6tgsszb7awzgx1gobclkpegxux6pceozre5pv20mo4d2q0yzc2bsq9w1hzsfpp0in33jj5s8h7z1yqwutonxk7mp57bf2tkov5gtprd556kk2lxowkb03vefbxmrf3il13f4vxjp1pblngynu73z96s7f9vm6p089a9bgmdr53zym7rf0i361b78vk63o7iwlggx77aq2optddhbsxnlg6dzuj365nnlwpvpbo21f7ealqxyrx8nnvvydnn3olmzcacg2fql7w8jm3yr316bnfl9pvnv9mqhuuz0rxqj9ua7xei5hxzb28huajplmr8sbtkj5inasja05hmxbwmxwryz2nvkosgrnwrr5jk4nz9b39b9tipr1c64794z65lcdluy6kvc436uai8ag6f7lo72m3bsjego5dwsd6osda6m02ilgwppa99g1iteaka6mgqkov7dgtbx1uqo40yphui2oitsmnylmcfb0v',
                fileSchema: 'o7b380jrsae59z4hcxieo0tdoe1jfv9w2r04uujuubigrsdplt4kxdlarrd5trh6vim8icglwg85s8zn5tz5mfzmzap0b48m67p2w3crdqpjo6skvsl67h282s0ufuhmhhkb8n0q1r6a3p5tjk1bvlfc4hro96krnhkplnioaadcdq1grehmjogs9ukgnq9l83e6vtio5e6gtow8986eimxkokt12jnixrianz6g3bugg61yo2m8pvhpf45msi7z8bihrdzxwqv6nttcmgcn7li9ms7ze3c54gwxo1l3tug26fm9281dl9mzc1pstahro0gp8bwdf9ajynux509t2zp8eklgpgxz1yq9ewe53n5lj0uheziisycb3hdl16yc10c5uzt6gpo4j2zmh95vgip4xgjqma78j6002gxfruf6hkawydniyi5x0tyfa3vqcrlnajd7bwqfnfr414b1a995oy92ngun2u3snsop7ef99yj2p97lnx3j5pdq109h0bel48wmk10orlskkxa4kdur30rm4vch32gh9gx4bfihy868b8uubi52d0x2ovmjivry0nz6jnw5eik0wmo58z1h23gup0p81s2918690kjpoo55yebagn8kd52chyst5ysaj59os6iwwl88l3jglgsw2yqzo3vwhfwq65d3egtgghwpjp4qbm51bf1ilw1ghdv06438wvlohezp639q342lvk7kjg3y21m6e8abvxm5x9n43vksijguuwrxi2p5h7w2lf7d8mbadlppf28p9fpq083ox8v4in9pnkzdwekuzikpvucofvkfo4gj0z4p6itnw8n0hw3kqheg1gkxp6tgyy96phu3uu8siwg4rvl6u996ptqr2on2uvxcctbilm6d975xwm74a5zez5p5xbygv8z3hr9yumbwu0cd0f39y9xy9hl7etyofv2e5anu5li9z8v36zbowomhdh20yoxcyuoimjehtgnppdu5ilo2om6wg8xfbvn1pe9rhzov',
                proxyHost: 'nej7xelrbrk6pduz3pulbbc0fviqn6bcycuzea8vegfesqi4g6e33by5ol4k',
                proxyPort: 8266990537,
                destination: 'ssc8v1l318vyj4d9692637o31ekx75332k5tw916hrmm4xqro9qlk5g3r4neqxr14n8bcyepxuublt8cnb5yvatqtj8o89r1h592a12esxre5cuh94akb1eno46esmkb06naifoj8auyigz26cw1l0gz79wgtqg2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pbqzkvmdj3ej8vfshmswabud10r6af331od27df8d4qks50rhj2v0pdbd51mux5src54ww16xjh5w79xj7f37alzrf4cy8e76qsmhxvtaz8v7l4u4qbwdrj3eya8x90wlc9c1cbiu5bhlcv6kqdoz88y2zxc2lp5',
                responsibleUserAccountName: 'tf5a7trxjtcpulb1er3xs',
                lastChangeUserAccount: 'e2ryawlmvby2jjnm36vk',
                lastChangedAt: '2020-11-05 15:14:44',
                riInterfaceName: 'dvmkoxezin30l0kqec0v0lb9fbyrfsqwlgpev6zs1ouw6b0s4163av2lcemoytp97qx43lcqiki0n304q74nohquizui52v07sqxwbm89971v60uqirorwdqdkbbx5zwznyf395piywhdh1seg911r034fpvae0w',
                riInterfaceNamespace: '9bz8wx05daogdphop0dgxcozcmo6clz03nqsbn1rc021zcw2ip3trtyrzgbmjs77gb6zk0ymbqss9v4yt34crdr8cuajh98qfo1f8y3f0xi41q59dfsswaqla8jfcjnph4hiqyq0dkpsatt36115qt5dawszyf36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '73v38z93ky3m8xfwe68r0re9zbhgxzry7gj0h3rs',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'wenvy00v3th4fdi5i7ve4nswnlp2fgezwqtip3hvz5dg8ueg2u',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '3uanru1oeci0gxvng3d0',
                party: 'doq489ombbca0ay31ylcx64z94b8kuodl6qd3dr5fg8w600j62jf8yms419zvvq4min618puftu3tj1l9m04j0tuuxkq02si6ce45a9z6ash6tpqo1mfjbnm86js45b94cp2wdzad8lcrhem5xpga796wzkgibc7',
                component: 'ad60au4jbdlnm9p0n6no174b1zrl7l1bkc0br19gy53dteaqrsv3tdpjtwhp18kyvaurgr3gh6c52cbpzm0guuipn2b3itj391y8w71235wnr3wj7jzm9p04mj2pog3clc6ke7z3vjxt7dzdt8awpqi022s5cl84',
                name: 'uo152r8306kd0jbxt9n3f4ezcdl71ep36g8sckrvuns0gwpal2g37o19c3unyfuk4zlfigo68q8520nffpilj7j99krr7c2xx29bsq8vsv0umcxi6ink69s0ts3ain8e0hcrz3zo5pkgx1d585fo1o2xiipcnj5x',
                flowHash: 'eaac8b0ks9yrl52v9dtgxtejipfu2oia9msr5lh5',
                flowParty: '453cj6wzj6vajadj3urhr8pk8itwcd94akos2hq8vst8kj15idbqq0xpkrrs5npvircjsuvzvmbby83l2h2psaem5h7yhqr18697gx0gckd5yybqk09k3c60a0ee1setky0e2fd9e5ekau3e8snnrqwh2nrplgbi',
                flowReceiverParty: '6b4bgf7v89b3shvn6ke4u3j4p9gy309op7wjax3d7uwhv1mn3mnc0o7482haj3vr09n84dn475j42frpv43vu572peejd1be8c2x2nm3596x2j2yonitwk28qjnw153zpfi2fryjmifyd9524nyn87p0s3iw04o9',
                flowComponent: 'bb8lhcmrlphzk8vl799o8htj2yw6zsk7akhu3ozk9s2j59o8a67dthlcj8ecn6amxllkjkiust3960by3wubgqnpvm43jp7t40k1pxodjp3fxqt4m4ws2gq9hz9yb2iz3a2b92qyvib561xmaurqatp87vd6htq0',
                flowReceiverComponent: 'wexvbqbh8htwnyq5py7j7qxr1ux2emkpr7tvfhzxibzaji5dn1zluykiypmgu1cwpzq61ey8qy90u7iycuoikumsgbkosw9cnvhbeu7h6m16htmkqghwbeapj5lbbuy53gjczou3ncjx3ffq4t62q2vx9uh2njb6',
                flowInterfaceName: 'qsrb8anctss9x05houq56hs25i29ed4xxjlu7fko8xssh2ze3mu7pluu6iti7o8d3tj43qogijxey5bthsb3gbymjqk1znn18o26dhtp2e5ui2aajrgvh06pp3try2u8jxeelxqow840mq1yvqfnh9bzueoenf2p',
                flowInterfaceNamespace: '5fcespkmhozpdwysbykk3a1tracemte9g0dd61we5ejbd3nmgdk4gsbc8irq41c3rbntqxz43d62f2a63woaul5hoq4kzxb9wcwebdq5k85eb27g7b7i3km9kh88qfqz3mfcevdjxpv7agc9gxmott3e88w5dbca',
                version: 'syvn09hpl54hzax94i33',
                adapterType: 'rkxdz4rvrfj8c2a8fpjzgrahnmq7e6tcpcl71kiuzjp180h4ct3e1kaazf8k',
                direction: 'RECEIVER',
                transportProtocol: '5n49f666y7e5mvusc59jpdrd6y54s23g2lnsxoi7og4hkrlv6jt6rg76ayiy',
                messageProtocol: '5jk2tgb1gzwjmatphs73iv9ju8wwrtqwjzvkzr1mmygd6jg9mgoj2eua1vx3',
                adapterEngineName: 'iqdho3qfhn222kz4njeb3bcmgzr4epngcwldtya5ttzyg18oro5rrtdcgk4wbwevfactkz7h2dccp8h2o74htw4adx4rc6qgajqm224wpjxf5ert9a3rfk6d18t9w77v0m3bparh69frm71i96s4tc1jrqonp8xj',
                url: 'jlbnbi51gzmvpydy8aq59pe1u6auuvlm54wo84f9a8sghg8ylr3pmsq446066l9az8nexvwipie2jewhifichbnwnv4p9085w7gqrst3gda82bn16ho6fp2xu0hx4d4065p0cfsamnogdvaucr2xadmykvtu3vfbweiudgts880i3yevobsluwzk5ba66kolwwlbb29gts1q4s7qsspuqglt8nupbknm57mspquj9j8235e9vpf8137pnxsl9zew8y2p9eoduh1j5nyhrswm555xn4225l5stl7et4disp0ejmv8xhca27ferdt2yfjt',
                username: '0nfpih7n43vvgsdjl1udjqw4oriqxh0uvxhd2pr8ehd8g8s1pqxtj75dh125',
                remoteHost: 'rtwtcligkjjjpnvlpxxelql2qq9e0hweoesrhheztmcwnou3ucqop6wxv9vqgt2hoe67x69zqpvg8n7rcxtpg2mfhwyk9910z2llgzd8iyuq6uvfzj5477qck59iqsm7m9zk4x0lvfjcjx6c2w1w6golcin3o8ci',
                remotePort: 9049559441,
                directory: '4hz7710j0qalyr21hg9t4gsm8t4vp34nbxnmoql6nabmq51t3b69a48ue45rfkwca5k2wb3pmvj2c3p64nzllseqx17lbcx6hqnt6rqg06g12tj0y5oi0mpf75ljehwalgjqwghid5i3f0cym99ox3hglwqd7lxpplc8nrzi7prvir6832yaz9w57x2c81n79asqsj44zpm8w5m68xcnkw8vjdp3d7s7wr37by0z3dj18wf7ba98lf9uws26myanyyfzlzezhk8416f09dy0f416cwlhdev37fup3f4aernobdpnw2ji3ewotsai6bqg04njzmj119x6gkg23b6233d67y4ovoutgx3m07ry35ii4go4cy5b6r32glaydobakahi3hn960plmarpscmo9eq4o5n7b51i3sa7yrs85uysu2a8uvo276yrrpb6141rp5om9t0fi1lu1ohldlsygrfn980kz31eo3ijh3y8h7d96ywbncq7ykejjiqomqgcn8a1ajc1vz3okpnjpjnwa8x6udi7n65470tfqyxf00ar97j74snwtcvrz8x655fmj8nu4cy0ibsuw081t67429ugurthyz3cel1qg3cw3lgotgo5t7wp000t4fcox00pev1jay4mb8dn0al106slwyru46rfxtn0qfjcmn1l4ekfr9rr9y8s0m6xc0d5sae63cxqqfkve6mmrg5bjqf70np1whs4ez6uq8fnvdb6jlt1dgbtgiiv7moyklkn83w08r4zld6n341wwgmpk3gimkau0ozva38ymchynqg0vgg6b1tdo1svmvkkp4y27pxizwb73498mhf0ownzbllknw2op948v3tn786sph7wlnqqxb8vfzcjaclzh3k1imwo2po5y3yc7e03heqd7x8xr2r1x7sbd3jnggilf3920h4zcb08o2shg9sibvsrlbrrae18rxgo15fcx394ruypt9ser8d5dnf9xt75tjdktvqsfz2jjzi56kw3pnq9yyao',
                fileSchema: 'ts9p1avihoasmyve1eyj7rsj1ssea8e67s5tcpdxlzbwml7j1rapohl4vxhq8jqvostar7gqzs2zfwc3zerui8lbii87uees85hvmvx28lu0kjdee72pzeyiwcpkweausc86ipbkvwbjhjjtxpgs65dgyus9qkw14haxuk8cn2kez2k0y2zyi0fxxaosnnnx4zmco245wjcrso175m0bj32b0nk0vpt0z4zlh4hnce688giwkw4yf0jo09h58s9om7vkdxx2nlo11oudtzkmcufxwkuvk10xt0nkarench9hubmw9245gurntp4n71vns6d4kis1iowl8993qfgya81t5h9kfossfyu13ba63od0ct6x37ezulfgrgazs8as677sn8hxb5xuwtegddb1ap6o0l76biyl1rycer8spshoy0auaf9dt9yzcjr29gochkabnorhcs74mogr6i8ej4b618mwvq1164lfmst2xi3whyp2e8p7h9ttew2unrydlb8mji2kkwz1kdnp3mumjv6m24ugzcvd1232dtydvnjegsz26q70swaoruvi0v917xnb14nr6qq4oj6mebybpj9lfak6s77yl4wb20s217nyk8u4b9r6aoqvhayely0ov6x9nzr9ve2am0vdh6fr7h3oqu60br4mvu2teh9d6a7f9e6s0eewtxbyrper655jvkvgnhdfiod11viylsqyodgrjy5ra1zighgqu57dpe71gxspu3cjy9yfzwnq403gk576vxn4wqlhp638huij9osa63nob08txftdez8lc6020seo0a8onia47qnrk4oaxf1ar0x56hg3rsruc3gsq2j06l39oz4cwze6fvfitus4k0aoq5pfea04o54zhipixlao4809fuzqo7m9cs2akamxqf784i76hmhh2etkh7awl9ayfi4mswe10qz97x3rohewql96p8473x6tzmg1lf36nmek78cgry6adrtm5m3o5n9t3c85p00859xo32ov',
                proxyHost: 'ozmafu2tj1cm41nidgl5don4r8uni3q1iyabs3ktb4zcbfp31cahf174j3lu',
                proxyPort: 9225337332,
                destination: 'ut751phxp1zv611p6fblquii79d5y6rvk59bhhj92g8e47gsiggw3cdcgyn9yhv0zpth63wrowev2iyzle3sapywkzgtgculkze94xb27ke4sppj0fic3cya4m7nzign644ta910pnuj6jc4knm31wd1vzzagw2i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qtlqqns3ojsqaqm8cdy02pb9dwt783q70jvpjns1mfxus1i6hf376d30j7ws8kisxb2yagb0jltmnk02z3xhzfysqcxqezqeco7rx1xml7t65y7gwaxjnahre60yt445awe6cuyk2h2mug2ww8fga9diorp35qi3',
                responsibleUserAccountName: 'izy7fycfs7p065230dnm',
                lastChangeUserAccount: 'lomg2cgvsqah0qtvonxcs',
                lastChangedAt: '2020-11-06 11:30:57',
                riInterfaceName: 'rxvu117sk53if19il4pdlc0n9szchxnhd5m5xd21msgt5l5kfv2lb50oemq7dha85992a2letkpo7bmft2zkwhqb0zr274pmf29pizqcqy5jx759twe2a01pcs6z2u57xc5usafcopc6hr0taefr5afz6m9laba2',
                riInterfaceNamespace: 'nmhh24on1kn1cpw1cdz2ajefdx8extapu0o18bewb5qqj72qylwr2d268g307zite77bnhpmucci6ansh2t7q161h9p8vm7apfmy3tn4dlb5vczstmam12j54ivl0mejuvwg7yz4arkgcmho31obld03yfooypri',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'ln0cc4vone6dwatgacbq34smd4004r0qgifd4de9',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'l7yl0k6jzbfpxjdzcndj0dx2b8ljo3mu9belsc0citjchop9ez',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'od697jxrt6hmp16av6p3',
                party: 'l547c9yt0rmo0d7yjz40ktxnho4od4mgnxver8ur7w5w1dwdv38too84kdmv4d8vmuk0w62l036fwv4ifdcoqirfjcqrng9a47lf8buow1e8al28n8ltid1n3608wgx5ug8v5h43o89yhdi6154ef5ftrd9pcw60',
                component: 'guzye0r8jgmmas54noahk1vpgms2hjrpo8eovucvjbmkecsk9fm8u19o0ivdepp6fer3j5me8jxy7mky0rs8g6pybezf6hw0e908kn0u4u85p21m5g69v9pcjpdrmhq1p90flq4r3stvlnki700mw82dm12yj6lu',
                name: 'm60gh7t0pcqyz48tfqowsl6m9esu4xwl98zn0rkhb8x3leknfxr7rly5a260nhqf4jwbvvxm9wdrupk6mp2zd599wajemmwfqbqe0ilsy1mprcas1cfwto7xbu1ofm7emidl6yqafm7igehsmg1kpk7pme2mclvg',
                flowHash: 'qz6d8rp3el6prnf0hnam0nnypzj6pihulqekhgpe',
                flowParty: 'o8axkn6imnbxs0riqocrqqfggif1yzp47eijiuq5l2rcad5a41b3zoiztzqk0eo8d6fsbos4x7vnj5bu8kg0je712ofe4231ihf8brousvu5kqg30wwrej9d4mzv6vaxava0rmxqau7s2vy9bndyhgd8yq2ajhcw',
                flowReceiverParty: 'ead9hb1dcecua2f172sp8k1wu912x35zr7yfnoh4fybanoq2dmax1bi0pv0qy3i7iy9d1fv9qt364ln4h5pep72qwgmrgxceb80x1o5bx1f6ci1vacul9zjkxtbjug6wfde9igz8z618v6ip4nmu9wtfhddgp146',
                flowComponent: 'o7ts3rhso1ri6g28pfxrwq5nofp5dxyzoec96v42rfve445awkbc82lgbpnxj1eq9jekzlpp71oewq1tnqrp25o4w4018hf62y9dyua5yhp49ho4pharfjm1l92vlu3sb59ua7jbhqzzm6oe0x5ti0yt4pugm03o',
                flowReceiverComponent: 'wyihovazz8fekj85oe9qht20kadd8pozu3msuogzt0y44n8d087t6xu5doc1z1fjcgrs48bljiaotjmf8e444bltw03tfpaiap4kp4b1eko4qnflr3y9v720yxuyy4p47tjaftyz1k72sk78xfekfwnnltvwqzd1',
                flowInterfaceName: 'naqtb70mnoeqnxfzzs6fz90hzev2yd1sbprkx8llw2ibemiikw5ukxiuekj7cp7raghjlvx4icdglctgv1xamh1styff1h7pp51m3hm7qda99moibutn41yfwju51jzvfk5yyvvpqo5zyefdbsg5fpt6qvj2gtad',
                flowInterfaceNamespace: '0l9qe7wq71qqrnsp3r843jw93hs02s3gtrt5rz7q7e1yxi6dafpe15a1ytczchg1mk66fdb9e8yhznnpx4rsz2isdoy3nv0ptej70ejrzlh7ruyku4zr70wxdklgbw3ns9mc5ub8j71hjovnasiov1mlhxw39xak',
                version: 'jo467ivhqlffxvg9vg9c',
                adapterType: 'fhz9am9rng4h0xbyk9pbt8cfgali03hgzwri3ajdc94d9ag1wllelr9xhnij',
                direction: 'RECEIVER',
                transportProtocol: 'qds9lqmc8n55pisbmwl327yv1mk12uuvkpbha31plc9eu3uzfn8adgcoliu1',
                messageProtocol: '4xx5zkfeae841h9s25y4lssij4gsh31bc0w29w4m30pvy3j4aersz5fmzhq6',
                adapterEngineName: 'wnisn03n98b0ys5hw3hj95uwxhc7st0ribo1kqaooih6ha25f7z7w90okuc5365pcjyuatsmf6g9yipfouuinynlhojv1dexxjiw5ocen1dkb7162s3349x14f4memni4na6waadko5jg1ofvsarfvflryxdbkkt',
                url: 'u1tea8ktic4liq0gvznwjfqrczsl63djx9q0njly2rshmhzzqr6uxv79akdrxsj2ehy8mq5hoj6r0tnmoxt9e8dhwyyy7p3jegig5gnp0ob98u38oyfa3b2c1avy84jy32mexbur1xa5yvlcdmvd3yk2f56sha36dy3v7voiaoukez60s9iwbmyxncb4a4mgorigammygn83db1u6nq122h21gf4pqwfkv4thsddkhuyez9zakxma7qka5mikc7v6pochkn9vocn6jrav6c67468qhdnv02866s308jp370lp8x6uv2t2j8v0sfn76k3',
                username: 'cq84gnn32jwx9oi1xsajvfkz3m1x7vosu1y7uoz0w97ja17t3lugkj2uxk1o',
                remoteHost: 'doo5hyh59r8a5qn5he4pygtk0kbx8394a8xq90lvkyzgcnf20uzfzxt8388qfdl1vs91kkcrwtrovjh6mpv5m715ls2jrd9jlnq5t7qlpqhcb937vruv1nyewoojn750dt20h693rati26zu5gy8f6r2ymtz7ved',
                remotePort: 1799350116,
                directory: '83a7laj3it3c8lvq5gxgt9chnf9lgxk4kap1hm4b93e6ynw5a45tb5b836i90n99y5asxa5ef5bw9k0y0ypftus6360g6h7hs7l2lgx7p60myrwlubyvx4956ll2zsx9rhheas6f8vtboc3xh1sdlus28yexqyrnhxljzlsq83bpf61b7p01z49365gdwc23k6gzo82em7z02elm9nrouy3nrstdkta9o1y85ho8k54k4hd8n59gzw3uf44qdwssryivx9fljty8qx407a1rh8a49hrv40q3smlwnhcr5gasvot0yaon8gldoio975orrc0gqmaibsdpgr4ela14dmhjii4ctpsqjin1rnuigagom7uv48f7pumd2f4d8r8lcrzlmhgsy85hiyxepgkjbi737digsp8m1ahajn9wxtwvwb8xizds9o9bye7ordtrkpgcpgfu08oh0q362msjq5c8p00f2rfj3055v59xtxrjjlutpixv8uzt22hqfucmljm2zd6038vfnj40098cg8uehczxyav331rqagr8nbt0cxt3h256g6n6xo5418w2hwdsgdyjs2n6ik2hye94isbsrls6kvbc7pzd8fuws5fnyvxzrm3i5jbrgv7ofaljhk3nepzherwiadyq1wha9v1fiknnecfrooqudjimmkcel1dbcqlfsaq720vbaizmxcjg5cy9in3th72ryxy2f5ghscggmrsvaxare9d32rad4jab8dgt9113x9f40bmz25u1xwezrkrbtbp0ggrpw4x5sjh8gi5v3jnb07kkpiosbni4q4xttm35dglmaqhh2b2sllq6chsequk9deenf4yh1rqwhb5f9y0jf75nrirlvbnf05zdn4y9nhwl24kxa20z0k61sal5rgpkd8dhd1pcz7b3flwhpw9i5y4x0p413whv69ak87s8z14gng8t1g0intmkpu37ld7ioxv5x1qp7pwy2chntmqihe13rvzlobjimron49mjcfo364oc',
                fileSchema: 'clsn3aqlxxcrvd30g90tcg1dybbbf3vvbaqk8e9246xdwt15q2v92n9unpbilj4renm36y6yfmyzo4qx55bx8y9ngrxw6yfq2kv3f1a95kvawm8qa0j8ufomcuklftxztxzbmix4rwgqvjq1u789kgnavel3sddescjc9p33t5swifa5kn8y61y1xk4w3v9e17whog6ij05cfucfkkr4654thd3fdf913ukdee6yd5iu6eco28hin1ox5fyouclrup08b7xfr45ap0fe276ware9dvkc6shmmdwse4tie7nf25ku32zkxq8nhlbzi4b8qwb5ag9inb627v50pml2thwv2fh8b70nu7f0uagzlo6hxgph436vvqkzut9izanj790uucnheqow4gexsrs08qo0wm4m5wh5liswohaf6w59gxpny9e9xu3p3hkefhicu0j2o7l321h0s3o8zzraa14hmnofd7n1a3wb6xk0a3ol002sgzyiwb3swavacaynthgu1rkcl10ztukmge3424ml7gzg0nozane5sy2koxcjqmt0st01u2ep45222aa0d4fdw48n0213224h1olblhgmfh8dmvtvcksz1vzwa8iz1lai2vflb3dmmw2828kbhtpgggltnkfiwc94vmjvugwg92985yoc4i5fzkv0eaqxdtybh9x0amu2p8wezfeyflbdivmolt70va9eph2de8pz90uii248su6e1g15h9mjpt46ssf018w1104ma1n8u3j5eqv0nu5pkq54n7796pjpd3rdqalzsuaz2597w3olb0d1wp41oljoxjmhp5z2jhs6vxwlbc5dstg6mmmhep95wm1wvlknus8m0qhhvjf185rzzah1tdbn2rkz8dnpm64o9iiokcit6n7pt2kdbg86c8uk6ldy0yjq433qy3ufs0vuuzzkw49grdejczibotwdr92uf1c03xsloapnyh6gxzozy4zz5hrdpepvemu3k6bnqohguleyzjhg1cxx',
                proxyHost: '5ywlnpdljd99r1njx5sj8vxu3rg6b2o72877k39ob9c7h9jflpjq0zsd1ydo',
                proxyPort: 2440150564,
                destination: 'tuhi8tzkd2sz6wtjn2fepg157onprmddbqr9aiuyupuwccmr285drbqqhiyhfvj3w74w5984i51kuu75dgib54qp68n8nilcipd92l28p8alvxtqmkm7ab8g90tizyyliyebz4j81of9j3t3qz6kdg22p7qzpyoq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0y5cxfrwb2s2eoyxs1vbyfstkwradptol3pddbhxavjr4r0kwdotecrfimsoou7ldy4tyolpmorrf2qg39vlu5ckbrelg3eyr7n9keu2hjyjetmwhy9zhjontmekdnpsau69rkiwbof3z05ikhfhafnbbv3evb10',
                responsibleUserAccountName: '5s1d0bqqsyzdkhrq22pu',
                lastChangeUserAccount: 'vrkonz17s1ggfbwv55xg',
                lastChangedAt: '2020-11-06 05:04:40',
                riInterfaceName: '8xduamribilv1myeeperqh9z1b1ypvo6e71x8tkdhmtqd3fu28yv4vmn68atpnuacqyljr10mt54lxjo4hulnm2w65vsynmtmy5fjdjwtxf1mnmxse21szoa6f2rb6iu9mvv7on3qu8xif2er1cinil3g1w0ha3ui',
                riInterfaceNamespace: 'e6iuiwswrrz6v9zep2oiu5ajp88kamm2oh6x3wj325ywn3wkyc7jb7s4ded9y9rn4ku39amvp6rt05iv6ytwsekrkcl98jpmtwfceiaxfh718zcnydn8v3an56o46wzgd67m5sn4ncqewjep433ku8pt8r3qdj5w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'lzdltq8w5lhv8zza1q54mglquc27x9fnm9akntd2',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'c5xvx5r7huboceqbjl0tdd0yu0z7ph8t32mk9qdkniim816385',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'fdbdut1i4slg0lzmrt6r',
                party: '8hi6cb6xj6uikrttjgnhaepnowltsf4ahfli8bja5s14z3yisone5yw204hlq1yllni0yjeq8fbsfe44f5l52u9ipuwa2k3gk3xw1d7k1volltgy29l5wknsuj28u3k1ubg9rjx7746zydmol3692qfsq5jyweg2',
                component: 'vo63cm9f6ww21a32klal6yotl8o83pihlc8reb162q18z9mginay3pxep4k9dxdkug5hlsfllf9y6913bj4cpp05mig1et3xiljttttspx4j86m9ygg0mhrwsyu23bmd16lvair8z4yqxagdrcoywttwki0sxw7o',
                name: '5et7kkb3xwfvtsaq4oaq6y3hq51r08ygm5vd2gprm7exjex49eagx9i9dnxafr44qca0ytndxzm0cbq4wlhkg123ux9hxei8mhsn3k7ibtmto042fqbpw0r8mxjc6gmb93vdg00izuen1vx51o6grpkz932u55bt',
                flowHash: 'lzls5xrliyf3bj2rkwhfim8bjxf6r3j0aq19e96k',
                flowParty: 's0sbjvocda11z8zllavlnypshj74miwrfe7a7ys4o7v1wbkdvxis2q5sd8c1d4j8ohwc1tgolag3ebl1c2upxmcvjcervt830v9sc7bi1dgkcurbclm1v9dumive7ryuvwlmvmo96wykbc5cjkpfd5xw314om4yo',
                flowReceiverParty: 'f44md5iu135b1vgp91wcw9pcdjnvfy1fgrxm9hwr0ddaqakwi9hsu33budqladtu7nneteqoilmbzfy0a8cdg0u4e3j3uiwtep2zwzsevpzwgrdqnz8rp0yg125anqhgzvrvkmuk8abewscyx290wgutoao7jgac',
                flowComponent: 'nto96qg4h4d14x1n1w8a86miypuazk1yo43zctstdgbq0m2gwn5cfr23q4ukhlo2tilsmjvlfs2jgoq6328ggauds2pfg8qlfhqp2sb2jgc4n5sxuy9mvqgn3pknftxh3qhfe249q54r2sp3b0unfyqlh3y33sc9',
                flowReceiverComponent: 'x4463u2m42vq48e64aaqm9gpb7sfo4gk88tr3l4jsg34gz3f70hq7os2lkyx3l9p0u37424mldd3m3ck27r12skutufc02ni7bon2r09dtyykxigrb0g505sptx7ctie0n34t2xzpozdyypnngoej5nv7q632v0v',
                flowInterfaceName: 'nseug2ls3t7h021ksfo3qptbm5wjx3xyhy3lyq5xou58rtzorf7e0i6ulc1io2ditailgtwbnjj75int2d5jjv30yfk0sexyna5p4njcnog2zv2yz5mfm55dyufwqx0fgnsjwd2on9jy6le685qg2fe6fbuognum',
                flowInterfaceNamespace: 'lg0wpbftrnzrn3n5cr7rpngxzr89z2vipkbaz3n53i2bxqln1lsvugivm1f2lhxpd4a8ff4aojlytacmlf7ermr6bsa77y9jftt1teypspfrh95bt9g44sdbjhwxdq92yi5dzd2z3sn1bfnaya2yxbl5vrhq5msx',
                version: 'l3puqqq8a511jzrnz3gt',
                adapterType: 's7hf1gafmc4b5gky4vsoxvji7w6g8vnid4bpi2u7k39w20gvq5ginh2jcow7',
                direction: 'RECEIVER',
                transportProtocol: 'pp11ozc13nz06vci0u3tz6whln8mwg0lvkqbchz993tm6cpmraez5ap96u95',
                messageProtocol: 'y1zieffcramal6az1094laeg2jiqpq1l2eixe7q0ag192886zg5y09vx8ho5',
                adapterEngineName: 'ojc4u70vpny27ufht748ialg5636xzi0zur0vhzjhui3g9nf77efbwlldomfoi7mx29wk9p8e0cti4egbuss3wzva9frh2z33ncya8r76eqjtvx2a6od1npf8s69ei8p74mm28ljog2aadd5w63ozqoizhxi354z',
                url: '1a8qoe5faeug58famdlr8cde6pbw7h3szo5et9yxng2xcw5uwo3xoqbicyyxf3phhllry5wp3kh7txc6wxdzs6snuhph045fhg7nqlw3cadiqyxwh0b3f9ivdebrzu7p4ab6vyfmivsroo1qt6tf5wucsoxkc24f7ueulcf4jejanwy8156w9hzdseg5vsa6uiiuetr3kvaw5koqj453l1bttz0jlcvrbao6bvk2143jrudnj37q2w9p76at6v1ihmqspluohrdd88n45bp4zrbv91csetf0mt2g3jweea65iizvstlipwdcjcstxhj4',
                username: 'np6ks8ypbynn5b2y9c4d9ljghr45u8tq6ot7j4cql4fch7o4dnw6jy20w77f',
                remoteHost: 'jc6zptr0br44yhhhlqa945ljc3ol9qt6146oj0zpa2qs5zryml0gd7vks0haczhee99cqhb6dlqqk90q1wmk93oxi2auellgepcqny97ui2tu7xguwftdrozoh6tkptzvj4eqjdsiexv82ckel4oysigko3wi3sh',
                remotePort: 2219321502,
                directory: '2xkk8og5m8v723loansideukig7ef7bsjtw1yxbxzy5jsx323u9yslsex3f97shud6n2gezzdqhv9a01peu35rqtp40jt06mybiqpim2zcqrnesld6nkyies4bth6xn7vo1siz9ireclsh9mx0k67d6qnd80yytqmsfa6lm0q16ujkm1v1fevpwplcs6po0kgrlnmt88c7gmcjris5wfvpof2ge9t55lb1xtnm2821m6hz8qkssugddmbsxts6qzz1ezx05v8uet98svgo5yqu6a619nffi4gfurbj0vi1smgzkyufud8u7v8saelvo7g5zn6juuxv9ajgh1mgxa8sz4x5xm5ktko8x0i2ll5xh3gv6r0jzjbn7sybzg5l4oc59aflz172gukzdismc42xrrd2lzn0uoz45rh59o5l81hpi0flsxhdxnrmrctunqb62kjqppclh3q73ja68dupit93xf6289e82eo0s6g5c9gxa25nkalx3satobrnefxc61i732fgoo0i3p0cg669221dwfq3byej3i2zi7ialuota29fk91r0dj441sylztoppuuq6emd899rp70b7qfiqc5wrvg7t9y6tp7dx3hv39q7dopwx6uof1z8zsbff0mrfqo8rtkms7ik1nhdos6zer450jehyumxdr73a84hgv4ib8yhusqc0xqdaedtdlw19a9f4dihl34a8bv6we0ss8z7f77m1kukuxuhgtfa6lcsbc6rybeqe7f6p5upsznpiw1yrlsh95utjjsr2gr7js49u9z3hdrt4dp62rqmrucnkqcn6jmk6jhj3j8aw27r69mlgvjw72up9hrfonhqsxe2d2fc05k35swuu93qeju66v0r7fw1w4xzpwa9j9hvmr71k500xdscxq0i46qba2yhukvbu206uhmo8etun7rjlyug4k8v1q2i8s73admmvdbxyci5v8z2mc97uxyrqjdni92ydsxiek6m09c61sz90g7lehiy2pik1rrn5',
                fileSchema: 'l2wym6o2i3u0es2npsapl98sluv4ac04xetf1kj4q1ks05jmieso7f6l6nfg094fm7ecim8ph0vkc206s4gjihmmtoulgobxnppu108njl653aee3ukfcrb0g7jb9s1lwy9df7x4jbe5xuyqdrbm6c0tqx31i94h1bgupoxaxzmvufa3m1jaf6pww7etw3tqmbb30vuey88q4qygnz2cq5dlvyvbfojuuzrh4gnaqxrae8lfxb1c4n7pvp31r7y88jlz8jqbfz93wqdlgxzbhhbcm7tij9ev8jx3pdtf1iafrs1d9m7dpmkzukkuam1okg67ea8dwq73trwm6bh1xmeow387rtvc9nhdyhummcpt4lgc7ipq3qr1bmhprlji358tzub6wbq7sukf259jkhcrrc1bccfsbdc9hw5c5qjhyc5edkuofsxuwtwlxnxtwq9glkktcrvoc1tpyya1hw6ut4jv0k5fzptbwupnzn1i0qxxt4q63e0w04ln8surp2s8s90vixr4mg47wqrng1wugk46x351bsmo32f5o11g2djfn7ibf0nbdx04co5azbcjcobfzbdmwk7oyrh06l5cc8mpuv2swnhw93slk4jeofvev5omm7dadekdig34lcfjvhjxo9ufvi5errocplpmwgssbr7axqvrf9tas546s0us8vjtpmjk3ojy5m9w6ltwqzhhxilp23n03r4b7pocktbrs4i0oeu1pfd4e0plm5g204hawtfkkre7pn7okzpergd05lw4jw0hqjnph4ele2gevmu86eq1fg8w1a3zvtukm56h8ndpcy10wvnbkc1jgpbp5e06wb9n2nn5m52fd5nx8cev8s5ha1nrnuau9komo4bwf2yzsiycp4iij51fzhu1nd9yuu7hmdw0dbsdevnz6332yygfk65es7g5akiu3qkvyupqyr8onegdcxlqxcgso2oeq9m7kh3ip5qxs5m2dyrc33gzf85uiovlizq3qtdjy4tgnb6xnx21',
                proxyHost: 'koafboivqjsguccs1pvwf3zwakalrmwxkk1wj2ycfrp4ix4mtckot6k932yg',
                proxyPort: 7253130805,
                destination: 'ioas8dpftbkbdj50x7i5a2dpcspxkp158peyoihk2h222e94n2sniuzs23c3mc5r87i4q9w44q4bmxcon2au3ww5qffwxxkqzkzfcl5ac6axfhobmoo6mtua6s8b3jsc872w9mxt9428wu3ipljhcr4b1av60ehe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y1qyz7gllfdilq5e9i6qsrvhat4e04vixzwd3nyjbj7m0cf9ryvofk45vvye27xucmhps1mxc3kfbim0e4o3upeppmet38j1wnzdp7ciofzd33f3ilmrfztox1ubo45vok8zxc3i8vjlrics18krpmpr96xxgwva',
                responsibleUserAccountName: 'yziet77w2ylqm0u2ybtj',
                lastChangeUserAccount: 'h90gt5s0nv7hyhpknd6u',
                lastChangedAt: '2020-11-05 21:41:18',
                riInterfaceName: 'ubyn6mvxbj114sipe9hcpmjiazloavjfcpc0cwnjsnnxerneamk3dwdth4tfrkc1pljyiflbm43gwmhr162l9ui530awvi3gysuzwv9yjhdi18r6rrlaq0am0gmcrbmrpyrfvna9jl4q9hjktddnoox5k23dd0yn',
                riInterfaceNamespace: 'zi2sacaq9oa0413a81fzfz0egs7bjbc96pr6lk8jc06gqgfw9u553bc5lhd8x1t9brhyiksqjs76pa2der3c77vsdzo4msz5z0m82dk5vnpj99zr3nls6axcrd3qj5m4ior04fte4cmn85q6p0tbq6ifgp3x7v72u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    

    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'f3mng46004s8re2c2dv2tgs50by2tr47mop4y2cf',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'id3194s2s83ou1be019z17y0k1d5wz8fw3rqgvnpkyq0kia2hi',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'ca8c2isp6vf1b3z06d15',
                party: '26qo19cbdqwmgww0ufy9hehjwkiv6q5ehd65ea985nriboflu3hqyff4p1vhsqul6jogm7zsck77izmr4haf1x99ncszqoxy5ypk0z1nbmizsamiwuco1mtaee1z536rhqgh8rdctbshsgegfyj8xy1hdn2iosw4',
                component: 'krhalxmktschp191hhbzcw3dqefoasr58zp98j4x58546j8w5yu55afsdj4r0tbjeq8dp0dfrzg9z2nipjdvcut6lpayt4o9iqqrudao4ztmaugotha5xjlxhp0rqr30nj645xf0u5qv63kh6m17ipy37pv8zzlm',
                name: 'u58m5k1hw0yhfu1u3o2ex0ito2gfvzg4z6mrf5l8cyv25k9yz9hw0dnwebqhfa6m26dixvk5hgmr06vylufqcwzazks1pme7xikgy3mv0ka3kjp63rnqijqtl0xbna1mno6bkuknpxtn5jc7k7jeys449j052ir3',
                flowHash: 'x8lofjyltgcdw2xu7jftzgs046x3zwcu5y2stsjp',
                flowParty: '7tw1aszwjpwjb6ihheflmj8hi6n80uh6i8ihzm33trjhj45wb18innp693zjuedso1myrqfwjs7bjp2zgqw99vhqafr7xgq53q5coqtheia6n8ptfw8nc4pbstxmpy3nj9lx2p7i9csnhi4v4vijo4lyfeskag63',
                flowReceiverParty: 'wyrpqe86qj7w32xz8mq8u7jp6rq3lf2ilpqon15qa5kxflbfafzvk9jl0uzu7fcs5s5s396pk6uniwp550jb1vkuvyhfqxb95lfwc8b2lssi0recw3edr6x8w0o9dtt2cgkywklzrctt3avfaxz8tdq08ywdr38p',
                flowComponent: 'x9ig5tcwf950yyulb9rw0uk1pah3cxn6hecdc4zx4chsbutatw8nkd2a8s2ufw6n4a7dwp0nyx6ffghjuoirv3olq2v5kmpp0bzcq2arz0egdl9imzmq1d43l0h21h8o5cj5cpsuqilsbpar2ds7t2ezmfo42iw6',
                flowReceiverComponent: 'n8ipoy6cwdjlyaljl3bvdw5f9hqezp635ocyj42dw59ix6a99oa3iucgfql5cckq8p93w6g8vjc4mvxw1q2nb0lg3m5o5mlc66jw5qnn7kqt5unfwwfujmfezv54rrg3ojb095q4qwbd2ttk9ylxu13wnujqut08',
                flowInterfaceName: 'jdyuj02b9d8r8xlud4l5b79m40enqi8y6kfce1qpyoqgx3wp4uz2vin0v2912sueskrzlio14rt393xoyfok6jcct0lxbf16t7tgeb0xgjefr35td2xwhpek0govt3zbdxobcrrwgbphyta2qwxlte6pvfu8cnpl',
                flowInterfaceNamespace: 'y60r8xs4mm3awkp3ub7v52qh0ye73p38vrtau93zgb2ohjignvj4d4ct40mbcy3fxc5thmjohkw05wwkavwqkziu31zbkgx9szriikiud6bmv67djemagavsy29fxxoykucttv9kprbxlevfxc24xwt9gzai3per',
                version: 'a0316idhkoskrn7ytz3i',
                adapterType: '7ff6ro09qjlfao9qstmdxszt7z964vvskkk2ur8ehi8k6175orztjh54eyyb',
                direction: 'SENDER',
                transportProtocol: '5sqmqs6dtzi750z8nvl6ihe14z0hxs1ga8rt9wbxailx1mdefuxvg4qs31is',
                messageProtocol: 'mrrzfeuydf5wd1oyrrcdi34shg39ca0baehwnjynkrzpkbjh0ri9m7atrde9',
                adapterEngineName: 'w0j4njcokgspljvefle92inlvt4znfcsoyh8969flw38gxwj91r77x6qyhj3xvf8s37os8ale66jvrr2iyoqalojwrm6ds9r01m41aercwxqvxd8eml0pfthrnjdb2mjqiu04y0uno3qid8rnl6v649xkc3wi5j3',
                url: 'o6bi3dyxlcq9uyh38prp6wx7gqxebmnbhr0qqbtcbvyd94037wj1eqz9iqlr679if43adgk1skinqcmxr173vo819xvh8n18c12033nne2uf7p06s6fkoe4qr3i3o5o0q5cdxcujr4i5flqy7xm68e99zu2cscxiwe6c60p3nfzju76mazntrins2szpmdinl9d42k1ru0jcw4sjwboj3e2z5p8vgyiajlu8qzs7e8bnimmqpjee8ndjk2dcwdx0ey9cng93pzav02dz09jna1qvd7nvrak2kowes2n6zhjo0frl3dkn2zguzo9z3v07',
                username: 'd40c8bte3va8mvxvtt1zryeqqr6aj84p6aixiqjzqe42gwnxu15ldabq47q9',
                remoteHost: 'qvnz01fvar5qjnbbohnhcvu6f3o59eglcpg177c1pvp7jsqjswvm83x20ug3lcpp926bd3cvc67lg76b9dw4mmqdz291p5ihbwx56549ho2kl6oac1blq1tzs63vzo4p1kqk142xqv9j9p7bk78glc5shp3oc8ey',
                remotePort: -9,
                directory: '2wc4x2oai2q4z530n1fly6t66kiqbfoeoi432w1hqioogngviwd6x8rdmarw7ojx4mynsula5cr3plgw8bc7nwhhol3nanaq2pud20cjfpsmjiy4sbfhr764y32tw9suzdko4evly4jt6sg5eqcrj7pczecmxt35waus9oghkc4pnpoxp37ibl4mmledu2dcx8jnuvo7uc6r5ygp30xusnpbf6h213eedqflcmurb2oy2z1352sexgzrv8432tdkptsjxcbucx4umjpage2xt0md67uehkl9wwgln1pjs47sk7ykxs1jvxr3rq94kn2rjogz8rr1yzou7c2nltcgc797w9x2gbqeb6kh76u7vyzklkey4sfwy0an4afaz4pz0hqcz8a7h3slaf166u8iuw3x4zwwaddtkhb6i42vmffyt48svpfwe758m9eym02s95x08zyuipww36cxy5ocf0w0fef62mlt8i0dbdffaceo1zkv1iifbac3zvykq5l5mq7lkwbyktmswcq4my53kwykk8hq192wb4i2l44t4mlo5gjg69ubvfscv2xlhvpb1mftmn1eehnm6j104oawqpyciu5glzk9fsfp4eh495n9n8ys75ijnvuo2uhre3thpyzndkdz1040p0rnenxtq9w3yxgmul57mp5cjx5tqoa93zqspmkjgalg2nti03eo1ntzeh8c2aptf7xqf0682xnfvfp4t1k4vk9fo0nkc0a2r27qlgo9qdwo8i6rh3zveeyf9r6e1lwr6p0zge86ujdt81bq8vxdtptudx3wupxc9uwpswuuhpgiaovsm7umrrhry94frn1wujvjjp3wfcj3ikifilneiaomnn3fjiikx7mpm66vr4jo9vr29nf2v492bdlny07uka69kzw82aafm30hkg5xjxqzdclrwjggdk3g5zy7blzsy8vhcpezik24hj5lou1sn2onjs4usc18rdpe0vajx7c8a4i86sqyrb0eqwyg6siqpr80v42e',
                fileSchema: 'jxn6j4e02wcy99d04jwraaswiegbknh45tegiysfq3w8gtjowxgge5v2gszc1ei58ng06r53fjcht434pd2qeofv0ag2l6yjra3l9m313lfdr96bt259pw7cfsswmoubytopjmh5ebabdw7ki9x3yxc4cmtjnqeqd32wkngkatcn66umid5dmm637yro8f4cb0e0f73kuxsoutsviooozwm04s4qgfi37zagm53wm5jlpy6mx2h9v78vka1mz451q9jlsjxg97axoqvril6f1o3nihjpg2pzrmyev21etyy5ai4x9pwz16bynin1lpejkqgr79z3aa6s0t0w0rzh4cxcctr2chiry30aos0q2hf766rvwfwxnjclty2jar61jubbogcybv2eqzkph08n2tud0hoz9t3guvwjezpls1pnowj9xhccgosfhdgn7qermrmqfrtfwy0ck0e6ejtzajt4n5fgnswkdz5qy3g6jhtns22hi0zd6f3dybx4h24f9am75nzpwv9z06hlhb8sr4rxwt6gi0zuaj5bwsi6q0ueej7pocattjop6jcmsv5ls419y4f81go60sdixz7wo9g2riatbrs79r2v53w0y0arcf79cd7btcp28xdecdbtc96feyxxpn6vvnu41vmnprsomqat3822cw9elbkovgwod9asqnly5ixyb1x6wohk7qhsmhp95081i5o532bqq7feg836uh2hn00h5za5nfxjgxidfop4yht5xw6bz6b80x29b6u6m6djsna6fnlrtahv87mduntdbgn4x9z1fbtiq3po1i7jy6zqjdl2wtk13b15jmei8flmcw1jymtmoijojobyiognoq7hd10zt3a9lf88zn8yqbayqkgo747cxkxfkogqnxzue51xsiw7c0nfk9umtatcogxzhjivq8f8m3gxqofjn59zpyq28psxlkz18lvyidje23qqij01b17fdww93zhsuuggi2qsknvca6i2twdhgj3gx6qoil65',
                proxyHost: '22a0gh6rifi0bs6llba93pdnckx2ndk2b2ucruolgq38512qzbmen3s74zrt',
                proxyPort: 3500550025,
                destination: 'k1sg8pnf7t1kyyg19zqxgltc7ju7sd7adxuy60ybj91pq4ym78v1rlhh1b3whlkjrtfujnum0g58ut4gvz041fq8182p0k4exxwdz7h3phnu998jbc9k5d6g87qejjd3aq637vmyttovgtdpcsb0yyqn64g8jxxv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '72wlb87khkw758vrvcfe6jo6z82rfvfhalnpds2szq8hk1cm5t1f7cxy5hl15i1y2tkacmko5pb2si5ba8px7nmqortbpg6ffvffzxliujkb7ccjkbhl8kbw9mbwipuhpbv3phvjvhz6bgbpda1k24tgiad7dewj',
                responsibleUserAccountName: 'posr1mv0zgd2wdyy5al5',
                lastChangeUserAccount: '6xx2ikj9dnxaggbbbo5l',
                lastChangedAt: '2020-11-05 20:21:59',
                riInterfaceName: '93qk7u6qwrkpudshuuryqrko9oz4bbunwj8zcthzx5cq1ai9j9e4bjy50crufue13j7m5xianrvky4ptil8un7eao8gkb0rxv86mvvtgc7wpuprm5raul52nhjtrw8o7qy73dpkehkjz4vova4hqkr3k3nnt43un',
                riInterfaceNamespace: 'hvusm54aao6ejrjzkx0igy53p1ai10itz0imkqnsylioob2cjv54mlghuynaod5f82l52axn52sc9bxg0jnf7fc0cm9d6kj83slatsbzqttdafjxs9akpleowzqa6uvl7uhrnjevaedu8soma4efuwp0loui33ki',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'he7o507fpvjb192k2wkfall9b8k60h4u3dx9i2zr',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 's8h6hpb4dnq1q8m3x2rv9hgpbpv4vyxg0t2rffj3yr2rm39z6b',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '8haw0rc4xgh1yxszr4nj',
                party: '7gv62403ohpymbbzdv21z9tpv7pzmuge6ibqsd9wjfvo13mktob1i4q0gmnnkypmbxiv4b2auwvfqngqk95kl2jiid9qoxaz4kvmhh1wwx6zy3iwwiss63ve2nm00t64b65ensuejgkkdsud7jo3p7mnrepamlzv',
                component: '2v78lgsp5kmic06d1qtkxllvmy9472evl5d3kd8tjywusw9vd9x81n5hgaskqy8zxggbd7t43qns08lr6804bncoi08pzqzanc378mxf74m7td7iu6mnc23arkyq2ycb62y66w1dmobfpbvbc99neeokyzfow88b',
                name: 'vu9ygffvcg372dvow5ya2b5tf9f91nf6wttlxhpkoyvcd0v71qiipg0oz512s420twctbb2zwuvcnialokvcxw0q9fc0kn85wlsh4cy82u0705lltev6hgtsq8y1to6x1nqn449y01l8tc9fkcenv053dxwkw251',
                flowHash: 'wlgbk59vr812xio9e9swaok9doo8t1fi1jhhp1og',
                flowParty: 't5la71ygrh4zhgfu9bzji1a88vix8ext85y8avfv1v7154b0i7jchlg55vr1ztzi2l2r2z2jzr00d0y3t2b0coeh9bghm4wd0hb06sx26wgyq156mgeoxkzx61jtu2ye4a6xr6xwdp4ziinnd7brptiqggthsuhq',
                flowReceiverParty: '43w5x4z2xruteomszv30pm9xuf7n4yecnpecs6f0gropwnss1s7e70fx04be4jb7c2gbn3e3lmwtq3ln7q0h433qdlzt5kax827opcytk1p5fp4aea5xuyaq7rp6pxhdr00t4fm2yba2hs6y5jon5jo2kqrpis0h',
                flowComponent: '6o1jh7wui55h7gfs8vi23j7xloveon1sk7kpiyz7y6sv4n3qa5n6xunxx0j4y21d4v26uyix6rxsz9mgc9okehd8j2g8t2ltlk6td30k41nheexvsng7moe6xxu61g3gf2pg6jkekl64jvsorg1r5i30k6zkqwql',
                flowReceiverComponent: 'k2zn5bsjpdzej5cjrv3qko0x7vbwkn5y8e322a7z2myzpr296h6kpjsavv6hvabcg6ewr1ql5x1qqhnj39z35nw62u44cm0jo4w5k3vhx5kltuns7qfiizd7wrw5130toi9abks1cl0p2yjmkl60lfcdn9wlcn9c',
                flowInterfaceName: '1ewkx46ki3i7h82qug67yulekiz091tcgkxcz15s4wl9nzldan9gjlf69ef13fsa57tj61e3lruqv8wiz5qu25gtec4qq5eyf60u9ua6sebfc7hwd5zccz0rediiwf2xhkcm2c5todw5my9w4276an57eybgdiu0',
                flowInterfaceNamespace: '0exv03qlnajlcvnlek9i9ubbgd5p791g2tst2zet9lbn23ajqx6rdjvmm3da8ke3xtnlij2lovpkw6n8q4lv59ykwtm8oajh6culnzzr6x5h839gdwfzxztwvenpg0xgthuezt49531gb0x8ntcnweyjxvjxmar5',
                version: 'gp527qyuv878t8ma9o1l',
                adapterType: 'mi1aabbbldlumgoqpyia72blleoniirfd9q594xi4f49l9xmf83468v011ei',
                direction: 'RECEIVER',
                transportProtocol: 'svqhbwi8giyozq7qjeyl5ox9f7brmkd20sqwn71sxikfy90njlunpw1suqov',
                messageProtocol: 'csxw13afzf0cuw064o3j09abvzbxidnkpvrle539e5w95ml7q18skjo7g7bb',
                adapterEngineName: 'b4vs32u9vfbfd1aq2wpkz6476ahjnonhtd45wsyzt9w2ujn1e1u55impinyjcy8s2osv5xs3tgxjk3epf4d9pgta8aze1nown6qcuck8kgsked0pikl3onlgqb5cxcxa9b74jer9p3en0mjebnzr9jhh1kh8kton',
                url: 'g0n2bq2c1507l5rq6vscdl6e1hib1xhbyp6n7gj0y83ojz6jztns172uylm2o783ja0okk8r8fm82h9wkx60o1tdzvr9ohoxp6rj3tw2ky9wdlornexnuqf3vhda0rh2fu00lfowdrd6bylesz0k76n8rm5yka9wlad48s0kxltqucyjo3jl9c8n17aoqye8uofvi2ktdj1246v8no5yi9bszjx9hepywiy3nale1m5772v28vkcz8icrmu3j928km1hv4qmhrsoz0wrhl2upd6b1xbew19rh9mqbe1n2ybbc0rw42q8xe8avk9o46wy',
                username: 'x8jvt8ptiuyvgdtgeaekcqtsgk8anz02ukcgd2ae7so3u6nj98qqbuuasgm7',
                remoteHost: 'zvoqaj8dxcmh33j2cb1386wrh7egkwannub6i5s10rrehfn7u65pti4jq9vqtfz5uc8p6ks30w78wyhkshlnmor68ojq17ea82vpd4ed7vgpgq9ykmhacpq42jaflh9lhr4mf8uah5bbb2cnkopz13els0f2au8l',
                remotePort: 3641830188,
                directory: 'nykup7bekxcs5wv25g25sqnnqxl9t4m8wp2izim4yaw1oa9x6lvy5a2lo8efobpq793ir4vvo190gf3a50p7o9c5o93tzx4y1tatw0accgldswq66jsud9sj3cklzgrul9b9s6qhwii70sb6w9j3vxkovtc1xdkelzy74f2w925lgtuj6fkt5lrz608tch8vnf6es59n3hklqwtjb14lowpi8jf5l9bjs38pcniyxz59i8qbnnicgh2ocroq5rlfr7sd5rr9g2l57maab6bd1kzx3cazxiou52slvgw7u6r538o3oppq6m8m7c2h59s3omg52ftz5pig9362ukm51j7tv76oedblbrade3rhupfacgtdpyiw2tnzwm4qj0t7u1avqel7sjd0vhlexjb3zzcmdr58ox8ymx48wzdtjzp9mp2pdvub6wqarkmbw7e7kx317bz0dpe93m9o36bf6ydvf6z1hlkyjsv8cw275cozspb8u0m5lq699d7t6zl0renr69bayeigmw9l447g6xb1pdlz4518go56so3pp5p9xpds7bzya25h7iulw460fmr5x1o2ewhapvw6p4502wcc8nu90dqpkaafco6267ir6gcm1botpnpwa3ahhovmu6f5p8o083llwllalieaech8m7g8zb6crd6a98xoibwtsl08s0as2b8zne25otev2x04x5nw3arm4kyq9a7pt963y4so5cteqsm7zhblolumaxdvdbayeozxqo7xehdaxe17vr5j6wg60qi9nt5ukbr3ue37yhd2b4whzc9quxg7508vdjpk6gzowvztek7azkr5inz1emgj0ee7c74iu3vmhhpn28zz91vx8dcvgx18haqz7rwok81vz50083jugdyxys7xykxw4qxil4hilr7qasu3xj7tpcmy199ci8pxse3536jl1xl345o86nz1gm8vdthpuz83ib4wrq8sntmrhufjjl4giv8phlqwawj6160y9p2y4l5guzpoae5x',
                fileSchema: 'ivxwyn1odxwih6kdl03z9icez7joqh9po5hhmqi92q6as2zdzmwx4lkfm0zzxhb06f1610iy660d2p23q1z8hlsupvgm5zakfus5if8zcjgq6r935b2yjl1zehzheqs6f3dgs7fcv5g3epg6tcjg64gebrw449j475h53lz1zd447pn7ymb1ccw1at6zb80ybjk7jgpul6wet4cpc43032fx7eg9wjb4osgjbdpgnt0s4p7z8ow1yq99hpi2fpizxorc6f6ugnzlfngrdm1jenjo3ukb5442h7zzczb1vozkgx7qfxrbub6k2aqiqn0vfuxzobwrjssaf8wlnxs8uldbtii733npxwvb6z8o2az710oqsf3qf8m4uelx16tiu7dbbxlo1ncrwf4qcwehpfqgttr90gsesf5a9lvjyqj5gf9go3d610uqd86reomhat6teqmnrqgjmi48wkmwlsqkhv8i72b9zlmin4ria92ymawbx8dzbnzuy2vbclikj9rzprati5t5zm82pplhcj2urohk0zxzcvy7yf60iyi6c8v50ma3f53ugvywymr05wb0hz5e6f7lj5nbrmv0q7vqcxnx4tj7pymo8dzix34vretajohh3jdvtpi2ue4hly1cudfe8pmb0wkij5lgogmv0xu8h9wvoxte9sujnwgosdbydb6xzkdfrsk4lwu9k3b62yksextu84sh77p2kglmbdtyd66idcfapvwqty8oigwqgnbci37ycf4arh56q0eyqxnu7v4yafznme6xsv4x10kb2jxcieyme7iyzjp2igv8ufq6udylxakffwevjr9iy2rtmdf71qzr4jqgveq60rtifdvahuvafl8uuvvmp7glabw2vtoyu80g6hl06uta1x8s9b3my7wmkvjc9abvu6mlj3933e7wm3ff9ectub8xffy7ehlaoc8rgb4k3sq04ysv4nx6c6jroo77img0cf2fmdypjxlhhg8izws3ug4b1i3g0bmmmzypxjwe',
                proxyHost: 'pfmfivf0t1k7fv8hezn1671gcd4ez4iwyueg5257j2b8sf6uvtro9sx5d99b',
                proxyPort: -9,
                destination: 'ij8153awzfkj2fi96qztnafazu4jarmmr1swnpstst9xqsy8xzrnv66dr77i7oo2fu5no2krxo1vp61gmebtls0cz6qrggwjfdjadg877z8s0cqg0yj4mb2pdfdvilkie695hi7375hedw23u5zlogha11g1jm1c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '18vu947jjgggim2a8dgec4wzd36rgr0l8m9rnibqw8ecca1gkzvxw0qt71bwcycwff2k07pglj7u8n6k682dx9h32ck8yhq27e0xr0gcw6nvv7xc8v8nt0z33sh5beut0u8thq4i36rf2zra6ksfee7aa7o3118e',
                responsibleUserAccountName: 'ke2gy2c2zmtxjlzs1rv2',
                lastChangeUserAccount: 'eh5mwv5yk0v2z0r4biuh',
                lastChangedAt: '2020-11-05 21:02:20',
                riInterfaceName: 'yk00mzoit8wneul6o2otd7r98dpc3p8zl35v6lty0douispy7mxtquzhvzkok1wdgetesf40w6cxpcaoc61mm379zy91w1sgqa48sdxmo7kxi7s9po6z07hshyk2ic4iv7j2phr0c7795f6prh7l09kxf5p9rkpc',
                riInterfaceNamespace: 'tbv7r77h0d4e5ljnfm8xztimaxf7u7dho3jsrf4mdrsvu5rw5gn1awkel2kyxk0mx45suw43o8fpstkxzpw7g5satvcgra6ekadeo8s20whc8ek81ttr1wmkafkw7479bnynrha9vfsax28i8dudwgbtloodw6fh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'oxgewn6dp1meit7my8o2vfw9qg0j6lpb1idtos54',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'cx4nzwo4qijelqnx09ffknheps5vejkrjy4ln8r3r5ciegv90a',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'zlncyuko6ecg2d0llruy',
                party: '455sg7esyp29w4vzwq7ejl6modek1q8nml6l24slex4jw5f7rovvkf6kzq1usss4kl3ujqfyk5r7702s519qwvn36liypadlj7tl75nqlr3eam9m49mfcapahya5pu0798dfmqy0fbyc3o5pr3zpyogxi1mkz0vi',
                component: 'w07chs6i3uo1qv8g7qmxkcwr24h54vkl0vwmz0hagcbd91xwx02ewk5p4duylryd183jv5wfk10bzxtud7aj3c9ns2c6u2dhl2f1uoo9ymf8prn4881hjfx390f58acejo2r6vio85scrnxthoro5uey11zfwmcr',
                name: 'beblqrw0x5sigcd9clesun9ccvl0fuo8p90ordh06gumjt47wkq6m12icd7zp72p81e7b1oxq0a4jmc7v810cokzjlo1ha57ts70nfy2424gsqir70h23e6640vu38kpu469vo70ku3aafmlrmri2hjfev78tkqd',
                flowHash: 'j115y0oojw27riyqbvyg7ng757mq7gd2cylbzyit',
                flowParty: 'jgi1rihhzqs9e3hpfcv1l14uuelqszovofndf8e49cn888v6ff1ul8c5wslhqixdhvfgfwsbemz1ae2hlntcb5uymm32pro76pnpbg6x2nocc4lf9fg1vg33nfapwy0ju3jz6iix6u7lsvz18btrybljl85gpj16',
                flowReceiverParty: 'x29wj18etdyphaxlryu6daqyc4dma4h3svfjcznbzq9c68p2xwmxlcxn8tc9cdxecng9drd25g41khqehbn1jwgtt9vfr2x75qe38ol2vpjw8z0p6cryuhaho3mn4k16rkllzhtsyk8jiyz4pzp1bt331ctiyxfo',
                flowComponent: 'sj5uu3ubiehlfvff6emb2bx39cfbirgafuhi1684kpsjjl1uus4qrn50y52tov0wvz9rp1y1aafgontnglqjj2932excx1s4r6t26t78nfe1bfdj03qahxdk3rh9o0p7iii1m2kexsztomagzdlqbh811i6fpzs6',
                flowReceiverComponent: '2bmfka37j5twsnkv2qi0ss9jassb49upuzeavgjxpairv2h3zhllqok7ewpwmdnft3cpy8qzsu4b2uko84p5ox7gkozo2v3tlxk7ydjimge83xmh7rbnds4tcj2brse1dfuzft7zoraqdgapezulbw8yvwfrct0f',
                flowInterfaceName: '90n17ft9mziravzvweblsvj4hzkexeflfgfh9u5k9kflfj2czzjglqe1dxolmfzgixpk0sbbhgstx8j7xqs7y0e75rb2a3bgu3cgssj71d6bys5ikq5290ujq487e6bpwn2kno69dxguyj9f8xj3dtcpbl79eedh',
                flowInterfaceNamespace: '585sho7x9j351ohfrqq7h6pew5se8dabha3xjwkl586z67n009nw2ud5za9ee3hyrbcrmhu6fbt2dqsr60kf3ldja2ao9aij6jpymvfxto0ht0uim1v6fm0qwtohgs2v1j0iyc1a58f72bs53kzfm4mjihvgrawh',
                version: 'tn3xb01m31aw6gxm3r1s',
                adapterType: 'anc9bqqmdmg96zyseg4agm7e91tav2o1hfvlnhm5oog0ccekj2mtfeoape84',
                direction: 'XXXX',
                transportProtocol: 'dj3puvh78ngkbqo4spfxzn2vu4655q8k9jgxkc3hy40p9umlt6vo9ibfcztq',
                messageProtocol: '3omidnh57ulmmhtqf34q543kv9hg4b4l5shfog0k3dyuom4e06giik21btjq',
                adapterEngineName: '71oyonrxugi7vmgiy4osfpc5jx1lmw1wes2vjqv2b9udnuuiwxljehm3jlzc01vv2d5f4vbb7gmw257i62q7vu0gcgwmyobmuq32urxj3tpa7fknnxjj8uoh29l0musp56no8h4bmjfzq6b8dgdurivwgm74hl59',
                url: 'jl2byonc1fsx5l92qko61wkgl21j9i2wj6cvbc85ov7bjjhupsimg2e2qxbxhp837b2cc9iq20nh6xgb5jy5rfcpode2w0g2wh2iogdaujmsyzz1lxgw6h8j5pghk9ve6bu0bjcygpxotiyrd0lnqkniyyo2cwoh0dlfny9jxpajbyaqvu1wmqxacy6zu2fpazc6fcbthdddyjq9jz2hxo94e2rfnurhzmkgthqttk3x4kc9kern180uck50m333wcsnkasr5ghyojrdbo2b6httxoxshebn0vczsdqcv4qouyaifgdiha2fgew5d871',
                username: 'mv5ekg36iza2sbkifky582sv2gimnyh0mzf975ozl5rrkj99d36pvbsckjf1',
                remoteHost: 'a1u75b9p7wh36tin4p22bkl2em7ytap369r1bymagty71wavl6kkmkz6ictweua4ltet671h2f9wh89oi9wmfh8kyrz3irpxkj2yi7sbgzhw7j3ofci45ogxfw3o7skn0exrokcbrwo22g9odoh26vwi26ua57k8',
                remotePort: 9855865050,
                directory: 'vjmriv5m2ph23l4g9tgz4ratn1iup62w7hatt14nbbxfrpzgj0rrp6k6f8bno5gj4qgtswapsf3jd4zyfwdbxvo065c4s7e19awacjhn12i8yohmc3apaidwn4mh3ibmsaebz0k4njuz368go3ou2ovijpb9h8z7l6wg7j34yqqcf1epvwrzq7r6ct8fgpa1rg9zf1mi92iv36znazyxz7gwovy19mxeubv1em0q329edb6abtjxezmbyzuthrxmyzcpigit308by77stvm4ik1d3fwdxns7ufwmkegg5aowysw1uvb6tsi7eehzr74qem9iyxnz2wsywms3nx9v1zbswk487ryx6qmzecjgwwu4ls2rlixgh0uco177gr32i0qwmcfodb2radys8r18y1ozb2gi3xtft9e5xb3l3v7bhxea35kdhke7lp63vdy57ytmliwky2jk0c93lhyfdivw4bj1lx6zxtb3b28dhhr35aa9gr1i9jh7mj82bygap4z1qenqahbiba57zjgfk79rafpjy9dsfw2qykhyw37umel3rpvdxnjuz591odrb8ilnlm9v7verujvx9ykjot629864nowd580rx89g1gb9w67gnk68fjedikh0z6fkfma60i4lznleadvg4rjkfe67pudn39eun94pd0iz20ifo0l8p4lofix27bnverdtkha3wws061ud7xjkap4qgz9ztl1hoj6pjbaxos7k0594uud7s5o3imgh13euel50ucv7wqs7r04qimnya1s9678xdzejwyghkz4y80yq7zb63feb06375n5uhemu8u75bgv1qgfuz0dyab25hi9vty5g4777aj5xs6om7yyf8ilq8q9mu13ldbwlk9guy1zpd82lduxvmha6qcr8q7qdo3xlhqy8tvzxhtjbe1s3h7aqvrjzvbfizettgazmw7djwcut17c4xkizbzjec7lv9bmne0zf1lijke09yee5sy10o3nwu17xxc9rhab99rpq',
                fileSchema: '6elfn2ed8iqfn3lei9ijn1so9qkgdkle84hb9xro3hvktx8dnhyww18ab8s13tcbs643n1kr3om96igqbs8x84y1pg7cl23hbhpygo36zpmqqbvqq2b0xz11e9094kdpzx5qncrntubwmqb8y7pp3n64nf6dh9oqankqxjquarv9tk9p1y20grykxe50c635yslt48bx7nirza0ak7nkwhc22nlgpx9fi1ezcjywo8236jmntougtwqmtedmpzh6n3sgtmmt6u5hdshwkaibq9cmupsprq9kbni0f6v3eet4bk3u41uaz7wy7v9f7kcuofqijou44pgq6oui6tbyhvotkfracs1rgltseyp8rprdfmtccyk319qvkkr0dzl6qshg43c1vwnikfu68cq2l35dro729lyiemvgehayyp4rluerkgcel3v19rwropnr08bgpig6gaz27u424dkjgbpss8547ybs22ast9t7eo9xxf9v041gkxcv3reeawyotk0ruhhlym5xuf4rue292khozeu1zrenvo6hi3n2pu5sb8zocezbxle0l3sioq98kiuclnbxtidwa9ug3uvxglja8ddajnpan3ag4fx6ycoa3gupdqla2v0owu7ssuhbw4rtkvbbzssb6pbvbanrz4fb5to822m4vrdhlj2c4d4pnbejwqdbz0k7q6k6gw3alj2voy8i91tplherpo7e3ryzaliyyv2n46h38pifow8bzgzbg1ukea95aova6eqpjg8t04qnr63hvhbf3xaagtgzhsj858qcxqsdi9211943fpe91el77oinv6bufo5ivys0pm7gri3pdcjd5qlbny670zm4jz1mchlgnij9luc7yjl64dy9ooi3cmojssyageutvn7gb5dc0ox79z2wp04cl4vmuj1g18hu4p54mlz0cshuuofboveulw2p0dtel254r1m112fdbhdun9rdtnvh3fa93rsbymjylce4i48hnck71fbcln4imapsivfy',
                proxyHost: 'i4phlkuvcg0t7ce4rjbecrletqulflt09gykmqet44rwz9xxp46i68e90srg',
                proxyPort: 3910678905,
                destination: '6xavbz0h2mml1yule79vs35u6lff6pb83hk6rxdbinha13nx8zb2ifbwj4j4phqf7r4rtev3on4lvcv4furub7gy0dbh9ht3z1elkkx2bpu8kcte04bejcaja6ptbqcc0kjh7o6ndpx9lcso9hwiklavesljkvdw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q0y152a8fenafl5bf4ut4md0ssg9mtg8zpv9ow86s9ecum9vnzynllzj2bbazjt52ztyexu1o7qtl6fns3iibwa8m1gqd0j8e982ncl35p28c831chjp4dldps5tfrw91a69le9pvy1ub4ra2p45dxxl5w4wmtwx',
                responsibleUserAccountName: 'irhlc04p5wuxw41r3ur9',
                lastChangeUserAccount: '3qpkn7wdxrttopmkhkyj',
                lastChangedAt: '2020-11-05 15:09:14',
                riInterfaceName: 'ph8a3o9roemxwk2nzxvp3f4yrvazmisvlfe3pfim66p1njyg47o3t8zxkkezzcgbu5wktx51wunzv0ekd2qqbz8fsphdksgq7jfu50cguprzz6ir2hfryb2u1o3qwn0upmxt69rmv9nq6x2do2e6zd488fo99n3m',
                riInterfaceNamespace: 'm1j5wmhqfdq9tvx3v47q20bi9yjpml0csgxyquv6avrm6q15ggbmx20s26l0re5bvabixm9qgu4hgxyuya10swvdbt2jc0qpqbtq9e5u05a7xnjhxp22tnaiqvsy6t1zfc83z6ga8ltf5qgdoitlzbx68pumkx3p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'w4d74p7xoqmasdiscwaydy45ew24f277hh1xo4y8',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '5z16xhbtzag5q6mywy93pmmogpnsak4tcoziwudz5jhjg5mohy',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '7r8rk3wtjbtxie05vuof',
                party: 'aauda316odzc5xju2hwgdyfpy0zodbphnakcnuz7mq5jx9qm8k1yo3rg7aprdlutngiqyhhsb16he6fziries6ypqn4bxxawdax6bj92geq00lh764e32r8u3yfwzg6bgr7iuskzvlcmj2seuyte5s3yyr8zqj7b',
                component: '6zfyvntx213awygus4d7eah62zjrkog0jrq06hsuk1a7dmqo4sypismq270yc16ll2kngehavh6ei3b06pi2q6lwbp33kqoj409yzihl95p1gir126gkdcouyibmcem6f80u5lxiefflh0z5czbis3cskki7x4nu',
                name: '9rl2shmtebjqnezt15x7voam72vdg3uwtuezui69znru9wg1rexcwb6j1gtndd1o21zhf716mzlr8x3i213vrx12njswctz473hhenokooltt9b8ivh0ge28wh4git6045lg5as2tb700k42vrl3c5yx5tgw87ku',
                flowHash: 'fw7nrgnx99v7dhexxeux2zu6p37ul08nttccxknn',
                flowParty: '8ru9mv5ftqow3xeno3rucn9fvbq6wbq0y3xpmxs5canbruf5ynvcheysg5dgm5odualfi7tnxco5a3ixwrdbtwg1jdv11juiyorl8iebn8pmoeu5tskmf3zv98u1x4pjh76iw0sfu2l7uvjwrr02a8qn3s350f64',
                flowReceiverParty: 'k17fvpn9kdk3gzp7eitjdlhngqzu4062nyo55uos8gy6urvmf58rirh5z6xd007t4c4n1cqm5ccoybpn7lzo67hbnm3c5q301xytva4ckv3lsosx6w6egkh93cwy2c0hwzqx6pwowp5vsqzavee637aqhfrxoz9k',
                flowComponent: 'kdqye2tyi32natmxi0asviavaqrjb5btkaode7dd3d5vomsbmw0qy2o0otmf1i8a5sivv5z5au4n2eokmbvyfd4bsb9ve6e9ww7d4pinwv5enzjanmu1kvevyefha7ygvbj456in5ds2qp9bh6oignh2iut709tt',
                flowReceiverComponent: 'j1h9img02h77ge9fy5olhut03i6v8vqhmxhi3j03hqt183rhf751rmjgx8znnf11v3nfb4ve601fbe9pi8ndwjl2qof6bncms427hpvdjchofw61g3bhfpdvlpyk86ypxl7an9d9zhktsqgunzbhcewufvyqlosu',
                flowInterfaceName: 'x3w7l22w4av1inqfafvvy24o5n4ibfvx6upi3swuxxzj1w2frvufjdz1905r0or48u3ym9fgxq57sqdgggtbipzylmxfgvtjbc6rop18usqpeljtq9oghyaby8tczew4y4rbr07dghqfx0xffl5j0cm8ipf9cnb9',
                flowInterfaceNamespace: '00b1ispfj51s7fr3otte1dfmekc238plzxvih7uwj65tkjy9qyxy9im0o374zq026p7rfwdjqt2uewch2y7h8eu71yjdd2j87f7f4o7x0im1nrzuz0jdrlfnixia7nwgua8m10vn9zfbpllviu0jkvsbxsqdrski',
                version: 'csy59h38e1gfhj58qr5x',
                adapterType: 'm06m4vtxfqte447oa2jhzps0icdovka3drzqps074ij2u7aqsog95bmmtrkg',
                direction: 'RECEIVER',
                transportProtocol: 'p7rq11b2j9ommllslo6zoy0fw8d2rcs9ii6pdi4qf68ljnt23q7r8edsk2cd',
                messageProtocol: 'srgmx1eslxjcrvr7oyb1w3m9nvaucsnfik3l56w261pi63a6x96a77s8cry1',
                adapterEngineName: 'gy4649m1jzyutryb1xaxko9e4u9ht1fs7ts7jynk4c28iq8ts80db61fsod0x36iwh5iev3kfw9u3hzypnywg6hfxxhzds8aqcltfdzocxbttoh9lk6an4ji8zw00ye2f8k9vlk4zbuw1q6l9xhgge60efsquml8',
                url: 'b1yogbxg7wzox599ln1qihwq4v90rke2qmi8t1y3mz7elcu06g1dxf5mnwmqt91kowtwsyzzvu6s7ptzpr1lps6jwr8nz87xj9s1eha4xue41phhj1ornol06dm50fbluikurvpc6uv8o2rmb1yussah5kfg3shvad7gkgb9wjoxx0nef3w55rcq26ptmjj8vmtwfpnqhi62mdml25ru7nyn9hwyhfvsvwgujbvumzs2o8knxv2zwwtf7kmsd671oy5gmvo6dl1igxvb4ql4pkhiwtn92r8zq0eng9if28t2pokgpm9owp8s19fpfqfu',
                username: '5zaxp0w2v5y4e0edp9mzq6xf0h7fg8piwl4udgbqaevtmi8sqjnoxvl3jgfj',
                remoteHost: '8ufksqq10f8lco020ob2pkxafucmk7q2suuf6xae1hd0busqi7btr8hje8od7kr4uc9nwbu77mwzq10wgvqxiygj5mekjafaydtc0mvll0umbbh3o100tww16bs3hcc0d6vzgqglt9wfynuotlgsppzox3r9cly8',
                remotePort: 2167503410,
                directory: 'xn216bm4k4shg3keqw1ydeuzrq6q4kpg26bt9d0893k6456e2kuncv5xb45yczkhqphmd146vyqdqlw161f7kv15fz7zpplfz0kgh1v9gwaav1mvysviutbxmfosui1acguz6tfx172ullxmvgoe35dft3hjplul72n0a2jumbokdcs4zf4sfqiy6mqpysextbyqt6h11rrn3fb2mfhvoylbndoav61sfekxj28gpukiivgo5qvlhsh3v5llemvtxyhsoczf3y3bka95gf7c2l6io9idug20wqasa3lvnsyzo3htrfurorvriort8d9pj7br94a74r7lfw9dcv1aky1j2iwodgfp2z2is42qqrc3fcc8gntdqn4b7x4leazjjqa51q5g626tix0hpwixtmlcvertir45o4fdntyv6cfr1m3yv2qt2wfj9gef2viozx7nbroe0gcbtfeironeqgfo1gk4jyq7tup3rnyq5h12x4xo9cmkp1erhhwn41r6rijcqug9otyebnkqqzp8fnirthnuxtr22qyncefpsnf9avzgpapcw1ag183sbxcq32050d79wjihczen6yrjwxekprhjb4jw57a4f7jtvfoomum4vxjstdjs29060nynql4tht85wg8nxzjbu70qb194kia3csehqa13or1njuxf5fqlpa9gw56q84enay08s0myzg5stpf1ufqyqaqh4sulqo0hkihsqrg4z2ok3ml32197k2oc3m6fx0newqd7511hnat5vqol1piz4nit4h1sqjg8vjou6nksjbkmkc5jytyo3w8flt6kg1jqkcsnx5y16pc6qm3dgknrhrj1z04okellimigc766cc6zupchux1ins1nsmze9kmvs5cp7cc5vnoy7x6m68x4k011k1ctpxy4fgtge8j95oxjng5ntnzks9bpu6bn9gktih9rfvphwsyq9rgq7j6h2ta6yuhxuxqzd3os40hf858qwersvx2xpas8fy23y2b7exm0',
                fileSchema: 'vnb43imzq0ffe1tnlpyxv740k3j8a7hvwdd848davmbmm347wko9ubie20m7hnckz4fh3qvhfqy8ych4eu7o3zhvyako3i6faxv0voktlfqf2qcdvefu4nc2qcbr2bqumgq9m2fstxn18wyuhu84scgheq5dxultbboupqp97spueh79ny4eb9g7jv26r03ie6wonky6lah86t9228y7wpy86ddaouktb3zifvxflwflwl2cufck4ui4rv4wupunq3kwc21d8489ze54yy7z5kt981weuwbwf1m4i1fju2q0d5g30cj4ek4ejyhg8vexlv1ou9pe76t4psjw01htnzk49lfbib6krt1dleafns7sgr8ug0k8oqx4sdtengvay35s644xiccbjtvuvd4s5wfywu70sbt745w29ka3dl4fxmri1oer2mikgiyipexi27804xb358h5trlw7g3ogqw6btxssm5sgydpvb70h7giys790bp08c1i5916yx593gzac0fv3w6nlao9qk9x9fsl0ui1sooiwnjvk7gjn7lhymffosmlh95es93cupde4d6er81i8rvrhcfm0e5rj9t0i2kagclafy6d2ml4br0awb5pridnwheizz614rkm57iasj91cq9gd8xsec4vrczqh0lz4yj7eq44yioan8bna4lta16qt4ojk235fz3tadwx5xu3z3h1qn2fj1f011llqdmjnlxomdcapky893qdr4lg0tz1wygh5u3g3s226264m1n1gl4ere0a2zqfplka9yrysvtyog2gpedanj07uat3ktjfjip64t6vzcnjqkgwlcn8bjykxrlm1aroktfrpfpkwrewitwxhul0x70vjm45vgr11l0irfzuv2xrdcmgyohnzmxwndidibkveaco8012t2d8vig3xfdvk2nt5f7t1bcng7uyt80s2y3eszi4z9fmcmtz40nsks2e4td1fxpo4njygcz6mn93zftqgpuskphiwwmyrdy3psrt',
                proxyHost: 'vjhc0ddt2lk6khgvq1ofo2s3ec901fn2gm2gxr58g6zbs1dq28u3ivkmtzz6',
                proxyPort: 8181731944,
                destination: 'l08w6l6yrbg5hk1ic5bzuxusup31typvb3acnc8zpfoj6j08q78izriezoeghg63lcmvyylg6h9e3ox1yegu4w4iccurbzm09ylm9s3fuyn89jzk8bv5z9etf7igggnj1d9tihm2biciikxuhp870ql6qrzqbvbm',
                adapterStatus: 'XXXX',
                softwareComponentName: '2qdi4829lb2yr1rajhidorfb2w16lw0o0329dfrkxh1jy7i3efv7t6ud48h55f0ooj7arnsjq31dvatr0moqa1rx76qls19obc6tht0boi716325zyj6ypb8jwibk4ybprx3typz6lc0yxk0e3kc9r4ifcx2bbvo',
                responsibleUserAccountName: '4dz4b96x0r5lcqd89p7t',
                lastChangeUserAccount: 'u937sb4409znorpj64mi',
                lastChangedAt: '2020-11-05 19:00:53',
                riInterfaceName: '1hox05kxfcyzk91urlqgn344by1z64dshj0l436jvrnl0ian59u525ufnhc5dwte4a0zt6j2wve8gg78l05vdvj8rfkhjk617lygq6i85bo1mpa6a61qsm9zd7di1jpiizwdf1lu93aohk7lp4r8oh9gw0l24539',
                riInterfaceNamespace: 'd8jewgbang9jazhdce1zxn7xvas606oxxx4wvn9v3xbg122i0ngjtoutnpshicrbjz2licldzp7zf9b9c9c43jtiii3twojpm647cnqtj0vgscvlark0as7ofqjem52gjcqaz02buiwn1sjtg2yurysfk640np7f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: '6pchbbt8napt1ifitd3b30lgfijr0kj1bzvbxhx4',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'bmngbklot1x7gkhpbsx9wihy6aqqxl1urqtr46ffppiv7poycy',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: '6dn0cb0xk2l8wl1cw24a',
                party: '9oz8h7x9grvhxi6u6md4djxenaqae8tqyslot8qmp2kpfed5wz9nw4g1dazafcuhvdlaxcpbx0kivs9w5um4kp1euchxcdnabpsjmp0nreuz8kpr47gstw836blv27wz7vq6mr4kre8ie5izz4db7d58npfbh2go',
                component: 'ed6a1vdenefakpgxa8s25jz4o48dj9d3wdvzd0u17pbsnd2tzjks8h5rbhgxpr2l4gkim6j05jcaeshdpncjbj6uw539aduknksp8433jn8pxjlbfi1a5qwnnow78u9hn97f58i0dsv5oxxf0w3ms2r1r45vpq1n',
                name: 'nw5h3zglex0eepox27vvuw7tbzyecy6pe2zmc9qk1p5ujk8vo1hmvr9hnba31hw0pgnsfsp6tgap12nkug3a42gin10yx6v9smkk1l5uuae03nc0x2y74souk5hw5z69s34tur50n3bzhp5f4namxmldhyrcime0',
                flowHash: 'z1xqnbuikl4nve89kbvl2shtaqsifxixlaf8l1xc',
                flowParty: '99csy887cj9dvpz7sh6ipryxxx7ur0qbnuxi6ihjspygsk081l3jsqxgtdctjjfyabtiha0nfk31m3a7hwlo76kikd6g9fqatv5bhlpe1vjoem2n3oraw9eojc7ersjfqvh03e3m1fnitrqjcun6wf2zvw62s10y',
                flowReceiverParty: 'm047zgh3o6lm5hux6beoubl9buzcekcv3vl9qiw1jtvtb0931qrtnzvq0t7duggo422ktti2q8zh3njg2adx8qoufwbv60lybs2r0h2wfxxi9qj2vm5r0c1jvnpblixqhj6efocqr8zg8j7jn2s92wco9z00ws6o',
                flowComponent: 'v9bnxjq1r9oupzphag5xbejdw2y0l1nq1mo95pp66w579i4xrzdb8c57x8w2p8u12b91qsxczhm1bqf9gs23fshuckcamnimbepxmjf3i28b9oili6icatu5akm78vjojg9qadqjt4fctwd84jvzqso3uvbb4wls',
                flowReceiverComponent: 'izeim63ptyrt5g48jbaliubb01hr5unfqjjngurtos8b8hhds0vji0rt7rt2p21t515ypi9xao59hsmoby8fcvbprwiimjk0o0rfwl8rkvhpipp8y0khp3443egjmc6is7jmf6ymzragai9onlme60g2fnvorens',
                flowInterfaceName: 'vxqx8vge32qiui6f87devrgnv4xcqultpvzif7gzb1rugt1etwlzevft6xnsnmqngssfghv0lyyckjaie9axmgj3cd3m0j8pxuhykwhw5i7hf1hutf1zqsel0cr5br1ywiv0k8r7uv1o1dm9himoyh3b2yjcr3yo',
                flowInterfaceNamespace: 'w3bu5g6hbzozicoh8na9pl966pq8j5zemwdgie03yo7cgrd6cbtts89z52zam9d3q8q2c12aj360t2zc99ilitw1gwz3zjssulhz1rmnzraw8ivjj3sh7fs0f0x8cdcwaxa9d2nv72hd4uia79t0ogient7ufbnp',
                version: 'phfxoa02vanv32bn6iyh',
                adapterType: 'yb3ja1wri5q9edyys5cprxwtrmkuctcx2ul733xivlwlt5qbcq7i6zmdv089',
                direction: 'SENDER',
                transportProtocol: 'uxjxw06k17d6inc6v8e83ny5b4klh8oq6sjutehhsgfrm8ftxxgnub0593p2',
                messageProtocol: '2r4w2bfkp3ckwx2f003t0c8elts5y6dpcw1yvub2c8qg7iebt4dulgxz1w8u',
                adapterEngineName: 'pnsv5w8pwc4yijqk57eboagsibqow7pv4g4iu563kc844wkvowtmjqp4i00a7q7lca6evd4cbamafmacvhqx8xf1u91neg2lit7ns9l9c6qmgb8rx2vm5its17meevvy7b5bwkeb7zoenh751j11bpvn3jk4lr41',
                url: '1rd697f74ouoxoogzoh02e1xqlr01mcu3wo3qnkfqwyocjtgkoonee97lkmh0w3kheqboic75g0d71jp38is870wkj8rt5vxfj6dt8ti71ewb1ay5kcgd6xyv7wt8023l6eggwmwf9qv6g9uq114mfz8izj3e7yeqi50hh83klprlgivisvdnt6mlc6dek5ld614eg41mrj31cabritx0vb5lt0wruve3jeemlq7phsah348x5mxjyijrk9dwn6sbm1sclmauh3yktukmtfzqj3cmvrxms6u1h40moa9rihvpdi1jqh55mikrz0uq8rr',
                username: '0w8tffn7yi57med2z7dhu8a2lwrlr655on0rlkwd35bet9yaun1vw3p4qwg0',
                remoteHost: 'hbqbz9a1wpwoqq348me57llxzauhi3aiaabdkpu1sx8wnkpnosuk0dn1ujuzzojehaop61ct8rwy4gxtwjnrcfx88y33xc070kormlmvjmtpleejxc5ygonntmqs5okk010ieyu1ey4vfzlb70c5a2scb8er8lr7',
                remotePort: 6272025724,
                directory: 'klogk4wla17c4nnh7g8tweol3pwi7c4a0ikj98gti6zf3rhhxdf2csipjfa2x278ve3s5laphpgzear4u9xyehzdb0r2367tdv1pe3125lev7cnevlykr6hfjrbwfo86rhyvwx88xnzquz3oe952kry0h1bjqplr14dlfqpgvl2wmzjes511n0146vf7gmh7gismdy1quf9j8gho00thz9uocxi6hilf90emqg3q7feimbmzbpzfexp0qv60gtllbu3yr7axkflbctym20aogn9vphb8z289sltgxtg5anfi474ujkgvml6dyem2p47vxzxukg2rotjivq087qvs6fdvm9dxa4jmi4s0dx01qg0hrk6cs42lwa28tur0apb4x8qcw1isg0qo3q1iwfszwaek07c9h9wldevao4mprpk08dji88a0hu6cyrnijzglgtrgs68bugaq6pqa95139swmu1w5dqck61hrx2lkcw6eaqt5iercyjbhf1jzt3qhi6t2ajw1bhjtbrl2qa525dd2keqkan9imgdycw2lpgz4714wx3na01jaf8r42lqcnwml3gvaz2nbfsczawb01imhohb7q2ll8kotmj8cw7lgn97tue2ygdwi2o3gq0k3sa7cy6zalexq5z5dk61dxtnfktj3fu0rm7ccvwcw6eyytulz14uxzdj59kwnjsscvby8ephjdrvdxrpm1h22jdfp232ey6s14j9d2mb6rpkcq8rp2ohskex1d735l97x1f3iz64yo5n8dxhbovvovmlatmb33l8xlmzhtio2ezqg1t5thjofwa0tvqab5z8sg3f0zlkrzxg6cmy1k9idgkdsl5p4oe8se203aaxq17d4k51hzbrw1v7ssfs7hpxgusvedmc1r6lxigi52ak271catneggou9nn22sehaia8gulhwvc7j5grsjuyhebpjms20hl65xeta1kcprufrqlab53jiqx612oanff1riwefzljhzozi0bj8cdsmlj7w',
                fileSchema: 'ihkb3a4oxuihbgnh3j81h6nr6qaw8btkr6wqdc2h8ylsm6mpfz9v18kggtl2a6ak9qf8na2pnhwlrkyg9053cdjdcvx7lu2j7i85e9yumpkj2njpzfu0vus77ob3un0vlhq2586bqlz1e1lz6p4mebpnm9t7zzyt8xlp5uyzemb51jf34rxjn7vwjf8gugvro19trplksnzq9rd7sejsftwrrowjye59m1sik7dk3pjutd60zy0cjiheycguq82r4hqyf8y9qbcdo3o0exmdzbkxjsxuf70jlduv066g7xlibww4ya1h1532zhe4l6874d0d4aljrgyzv5htjn79idsk2fzhooclj37p8lo718dufavvr9bci7wjvyf1ggynu3wb5ibsmr1ambpdx5rbd9vewgi3negk05c6mjaspa1jw3rln9xwnuw6cnstr26z8hx981jjz78rboid4ygcf6yi07opefhbrofatdgeq8det7sb22fohipu5vcpk95o4ein7y5h7ym22iydnsrakybmfa33taeehi667lbhwa1tzkfecwbstak14naluxg7ioyxlrvbdosspmq3gqnhmpqtoxxb97ydw5zyot8bbzk86edz1lzqo916f7lp48b7acktc0s9whqrdzm1u3utvjc7un9gq7y4a37ac3hz6rqt9ke0z8fgcneeikburau3twx85gjtjfgam1cqfuofbnqk2y84ckmht8uaiexig5u1nxzbavqr7pz8axg9g33llogr8bxbolt20gi8js8nis0p8kdx4j8joyq9k0mu3huv7myb0a3dzwn4xllx0he4co445hldz8r1ok7xi50swzgewkr5mf9orznvcc7cw0zx4jxry7ipvnligw6cyqh4umi4e0qraj59wunoc26zjt8t60e8gco8kv4jxslktc8uy1ppv7dhgyxrvzr0y3o09ats87m51ng9iq9bdix5my7gylc1rewdci12guy42rvbyqwiijiakq2nhz7s7hk8',
                proxyHost: 'ff3r0a72kx2skzweydrxr67zpegmrobazblftnpfki3m8ur17b6mlb61raiy',
                proxyPort: 6101606458,
                destination: 'ouyzyivvhke5f74t41x01kwoqnbi25gfwohq7gf3coebfgywdqbivgmfyglf56hpe0tblsc0nzhmvm4jmr273mhilb2air4fvdu8567gfpy68nd0wfczl9tqxeu9rccpe5kq4jpaodaht5o85ulvdlyepypsa9d1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0nd7i67aia2eoel5pw4e7w8t8rv6i5219wqobw39dkam5pgs0ic7t14rbzofv3v1gn62l0rw4pjih4s688xfofnvim7xdp941s65lryxpn1yhjlc1lptusa9w4mzuqd3oaj34mdsqh9mql109uvrr2uzin2f9gm8',
                responsibleUserAccountName: '0cppst9mg0glat96aoe7',
                lastChangeUserAccount: 'jqcgd53kpkn2ndf5cu72',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: 'eab646mcxzk4har26e4wykbvi5ff3cte1dtphaz5nceczlc58uyapuv7gka0ztcd7qawvas2dev4w0yfzxv7gxtyaytggs53clj0vy8feqkqipsr2740zt4lrb6ec7y41tmg0fk0hnnunkvb476s7w89f2vkxh46',
                riInterfaceNamespace: 'dt1pgrdsdm68o6kbb46jik7geg7538yt92n2favm4r4xua7mo4e9s5b6x7d5d2kccyw4uba5xtl5bkbanx8tp1ppuxaxd7y0gty02d0db4lef8i63xsvuf1hi8bsldq46gikopti3f07n7gd721wj4g9jriwwpzm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'b0tu8ftslojreezadpeub5si42pwxjgmj3hl66w5',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: 'tjd76c3ku64y3imilyaei6wc9h74hi4iydb056j29meh75m6uq',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'bieto1gc47fxyldld2xc',
                party: 'odxwfzb3sba97flvu1anzb5lvrel3c47h1awzlsx6vnbijkq8ykexmtdan33nzmcags1czovpbscoo5vyhlaojwq108n7md7ym0ywzmgfl9elg2w3qvz2z6s1z3olakys9928nnm8rzvbdqtrwnaq7dwm9pelbun',
                component: 'jkheee4iblgcxy117xvw7uq4cqt1tpd62u00b9uz89j3fdq09npyp1i5t7yj46g003w1rz05iq4xomlxdghtybtbov393dkhhwetmcf1et2zpu8mry5dhdcgvg5x567vkrj6h70x29yq5cm7kji0c4hz51wl7nax',
                name: 'x0rmpd1l1o7oytgfm1nchb9u6dzhchdaj3x678l6fs66lx1t5jovfoi90371t5vbj468ezzsgou7q5z0hzbal1594bd8esyz54qsyuse11liavk31yg6aix1i74pdt7ml1ta2mwkwvmc5gvp2xlcqxk8igbupe8f',
                flowHash: '93o0m0m9jyehz8i51jlenrgp9n2jzsqko1zyx5n5',
                flowParty: 'jqxmov8k8rnie0aw1xulph34oeal5ug3ib2p5o8e33zhm70nyygbo7yefvkxlgqhqi9tfcy6rlccv292kqnldte37q156r17k7hq4ahihxuso0k1owcacf8yjbcq6ibn1mfe4vq8se212fevi4oodz6o7xrhp376',
                flowReceiverParty: 'bbk6rarqdz2obmn00r79rfge99fsq1w3hej2qnitng48rrc25d2w6jllmunbp0txl5vtdy77jygu8z9on7dgyc1ltf4uyvij4539muiiyvfx1o2e2avag3vs6dh1eaquzuhgpusva9kk01eyogd2k0dey6mdp8yw',
                flowComponent: 'ljgeuzytk6xcijlkqmb2rbsd1umzm2meldc2srtu2ftcg2jfmmtzh14nzli5h2ixkldbouw3ywsyxea61l7mfi5sy481zuasln9i573z5g5oj8rgwutoet3nydsx2t26536pi2ed9ycbds01z0cyj374vq5u00h2',
                flowReceiverComponent: 't406gmv1qbg9laa56jkwwl643j5xzs80lkl0edpanwzesp7py7qoyupdrag20zlv98rxiaowhui7l6sms65lnnzjybggali455dt73cenzp4e5i2th9fmv5egygi73dxuwo15n81e2bfp49fqsnsjm4x32q20zhx',
                flowInterfaceName: '754pzegnl2xxhkrazgoip6a564nvy90cupxoau3xworwd7q1kwb5ym8b2t75vumuhgmbkld14vuvwrma9ts71k48akbbdvsfej0zmb1j3goud2i4534cpiryensw9dhl8bbg6uh6fpaxcuk1vf5here4qsiamlzf',
                flowInterfaceNamespace: 'byv7lf7682eqpxxr6zny20tg8z2szv05eg42bznro3t504u2punig9xc175rgibof0q14bco65iefntnzwp0fqrjcru8oxhg0wudkxy6u9dtwdokw9wt7ude2wsg4hnzf5ys2mfl9rm5mtkewzhiklxmdfc613ns',
                version: 'emjkdmuq5sg2haw0o83o',
                adapterType: '64ipefmh470tz92tmny6enesqug5vlgca4yddvf7qqni0erx6u6ragwcibet',
                direction: 'RECEIVER',
                transportProtocol: '0h2yhfopdwbccn1x2mdt2wmu7w8mx7mpne4dzmxej6n7zjxkujuby4nbjt81',
                messageProtocol: 'wosr8l84lhgo2zu5n8hrxhdjtn7wap79daew6cw7fhk1noh7nszefrvs6hx0',
                adapterEngineName: 'la6jjzafw90myh8kamgquqcp2b3lr04wjcupk4gxv1ni6jesyh8yp9pqaedk8pggalbcpihyz5d9cgka1cp8tzvnpjikjp18glr9s3zwhlkn4pszwv98cm5v7y2l934rv9p66r5uixwd1z8cy6qv81cqn5kqo6jn',
                url: 'jbowa3ck1slw5w9te8axq0sj2qa5q586qxenz5x9wp3km64rdi87nu7nhzylam2uc77w9856dufgb14p5o2th4tah8y7opzbw4cdsrkzisux8lp48h0fm0u7ovegga3jc37grwzf1faesa3e0e6tgjhzz00qsos7vrxxculd9wcjey84p7qv6pmn5rcf2fuzgr7kebcz203oe35oxftq4j7sd9yfzsrzvt3lvgb6bl5w2blj39qrp4gfkfd5yi63vblu8g3n3n9xowpo0vjc7gqdph94t0a1ajbwrvmfqx4beq4qkv9qpc37zw60w09d',
                username: 'n3xtn2uvcpxgfr7av49h0uf4ke25vkkm5egcein8w1ineoht5ogmsyh30h6m',
                remoteHost: 'c7m4vgu1ch18nz6kdu2v7x2fivivtvrzoqwxb9cxxql62k3c7aohbjl3m8s6jpjyphq251gun828wzr96mgdea39sx7l69d2286uspz392tq6jz54890m4z00yud36ulu41fei76dwx0tlguj65f2a9c8hf32sfn',
                remotePort: 3613789214,
                directory: '5w3firryx7c8mafq2sajd8yhufj9qj5mjm3vaxv16gyvjkorjlepv677lisc9ms61uchp5rifzux66vrvjlu5o6rkw0891vmyyizqh06cgd29g7v6qgqmebkjds6rq9nokbyijhgc1i1mxwxjime0p4eykeg3jv33f3pxe4sx2w28z8j7haifxgy0it3o3gw90fos16orn3w9x6l9x9mftv045sdd9iy9z09p6tpfca4xt27kldwmp6gr3r262nzkj10gvn7ybt782gimpiqltk13t3nz55vzdhf67siy8bzvvjbwvab8l4poiammq1m31758ghzzdx0bo3eayhu6kl0z23qw0yvkm9ft61j832hiqvicucunik5ni74ixkrrd0sra4lx0bxqvnqui657bymshsrrnzbdi2w1d5c7relng265svm832umlanqgzioi36tlxs2h50qhr5yudr0p2mmkabcykgoocc52afdnv3o1jcjsjuo1nqbw6re767cil3f6yhujgk84ykqfzau9ma7bvrn7s8d03q6w81rp0fdhst3lp1j7msqlalxsc5c8zu3exiproydw6b87nicox3nvacjv6wyhl01rtxqfw54ijartqlxgwbaql20vjptumu0u0r1d4iom4e7vik8o3heai47cydtk323kngt26pcz2quw26mxzewj0f580k3q94pxdmdek83vioczsiull2ewk8dadzbjggxytugwis7yd461eqt8m4bdpk8q65c5h1f3j3k9g9hxuwyb6z5as4ac9itpvds4lm72tucqqj48n77y2ofl401qjh0nbogzd79j6i3vdyfq8eax2k3yiq291tfi7lrvl5jo6a2uhwpztb87k6typzse2ytv2md3fz6zklii7leb4hq94mfmo1zfqlfzu0rl68cpemomwlbndye9mf9hkranqudxei8dww0zwz5zfma9rij66bkn4eunehckl8cpc1h2hx7sg068aui3kv7yys64xmozft',
                fileSchema: '63y15xorgp70b8c4j8swh2c579qge256wixgfkujui2ma79ngufnb5gfkxtu6un56ghuv1hnqfmdyhehj1fazvtxpq5nqk13tmr61gcebwxikplnacum2mwyt5j5u2ndobbbghqn099p0olv6rxckt5vel0jvrg7gmbh2nd3hoe6odkb87i9v2h25fj0e94b6wwd7ec3k3nnbq36ee5yniqyk4xegvf2vulse4gmne22zw69gbfb8b50z6y3mm5kvtp179uc6rohlqp0fi8dhipsvspjkwb9tg6ticzhgt7spf771hjaff775gqm30eti16dd9vvb3m9214drrqpknyr6f4l6m7ks53bcfq3f5pvvf7fddjtw4fc34fue1uutskqzopkmnizvtce3e2ioz401d5k1npa24qeq1bhpj9pme7bvri0k5aifs8upsl6aiu5dd0vu45k9e2cfq4bdkrxj5bq1rqjf06trkowqkdk5p6llbsb6135k5uwgbqaeur7kvyjdvy03p3k3e3f4s3tpscpacf0oxfsowzbouepd2baoe120mkz7jmnx6kscotkmxgiu2o3nvs5aym0c522jp96i44qdh5zok56dl1dirvyajy7sr79ja7ygwe2f5ybpd5u3jxfz9wko47mvsyy6op1xjss0fe9g1uxtyxmxd9wehmu2ei1xu5f9wd0hn22mic81hdgqrmznudsavc788632awcqljyirv38wekannp2snzo6ek9h6xdep9jc8hqrn9ti1u5hmd45xzzwtdb5r4tt9s1gdr4ombdq3wp4zjizjhdmepvbl2mltl13go0yw8u7go7rfqak5gulzwy3ag5h7vav83uqtqe05ojrmt2oh32gd39jeigmtno7rvq8q2wenx3lt4g9jrfd9awywxrsy3ilb1pby19h3k1aartjfbziits0kqpcg4ao79ytgx1cnf0exd85bsb67ks6pitnr2quwnkfzld2l0s363jf3aia0bjjiq7tv5',
                proxyHost: 'eadh5xvzznvbfafxxtos95i8dlgqhqm4j1j5zkhcbveqxilevalimczfcytf',
                proxyPort: 5746369482,
                destination: 'bdvhb2qqegj7ei1qzr2fsp2kqw5d15uj09oe5dzfnsb12zt7kehab2ul2jbqzms34njg4sepbl4gf39kw7pchynewfacooiyqgpqdd3mvns3nivnzz5r9iu0ixdu4rmpengfuzy4l8ggky3sh1d32d672yxrbf7a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qb7sria30y071nu663bvn3u872hlarm3yy8teqtchwwucw9au3hddjcuxu2sfizkgyr8npzzehixoovklw6pduod203he4ul2cs4v7ei4176tjsnnsleodspr6b08x3nve4y4gh13rb6bvrdr3nw6xyfzaddfjct',
                responsibleUserAccountName: 'oeqynqgwtsyex3itibrz',
                lastChangeUserAccount: '4biiwvlj9obk4i81d8pl',
                lastChangedAt: '2020-11-06 01:13:12',
                riInterfaceName: 'pmcom7u8egqtalbob0baktljxtzdsgwm9u7j5vkd9btz1boogkr960oduqnkaw2l5t04qh1yg0janni63ybbqjlc16i39h4nvg8i0z2ojt1x8a5ys87iw441n2dom88jy3f7i1zcfj9y8u72bbbu0iai7g7y3f6e',
                riInterfaceNamespace: 'kxgzqt3pgmd16r5b2ou7cdvqvhgkc1gucl4f855gb4u8q41k57ztmbvjftc5srk0mh9ax6y7m6f91fqypvy4f78nb10iukwfbxnszfqpnj365yv6f84w26su70yg7vwoj8xkz4toh1wvf7q9bh8512rgzgdgb0rd',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
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

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '222a6996-0c2c-41c8-9c24-c887e4cdccf7'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '594fd1d2-4836-4f2c-a615-cb57de277431'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '594fd1d2-4836-4f2c-a615-cb57de277431'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/3f8b5b77-374f-4b5e-8243-39a8d198c0c1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/594fd1d2-4836-4f2c-a615-cb57de277431')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '594fd1d2-4836-4f2c-a615-cb57de277431'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '7be6c82f-c120-498b-800f-7e55037e674b',
                hash: 'sk8m4rxttygebbc9sakuctmiay7e0kwc9wtmrtl9',
                tenantId: '52996faa-f079-4c73-bcab-583b377edb6e',
                tenantCode: 'q78f5wm4a1mx2mjzcncwi183htzh29ovsdfjn4sjssqwcjo6db',
                systemId: 'e0d227fa-d684-423a-9dbf-c09d894be919',
                systemName: '3l7q2d1l87wju41op7pv',
                party: '4ntku9vaornq2wqgy8gel9f4qo4k1h6l9an4xmmcjtb7ziasmhj00j6qyhgc794848ncltzt25e6e5vn7rcp5hp6a9sk5ep5opor8lmg239795cnapwcanld2kaufd3vi6bw5tgyj5n0cpdp95phn0csvxgxqir8',
                component: 'fzwwwh59oobz23n5skvua5pnz99jgk4e02zal882smwgtrk7deh89b671imlrst4eqlwsrkkejh793eso8yhk61fd5k13b8h6urni4k9tipxnh05psac06kbh2dugsx25lqlgvlcj08dbokv9wg2w65btut5v7hr',
                name: 'oo9ynivplxo3ab8fdarvxobrmrcis1e0mdjznnzk14ke4z1e15uhr37fo7kgf510c59os7r0zpc1x6in5iafdfithzbq8ulhnotbf8fvoo6f9zzemfhccakbu4sqm3ulviqx1v6xd9y4o4umuk741o646imchf5y',
                flowHash: '7004z6fqsrii5ietcbsetzsukuind5knac0tf606',
                flowParty: '5criu94p533gymtc9n1641aodp1bsvuwuw3sbr9bnye3btx41pb4a7c8magj5oi6f05zt321wetmjcvw2v3jcsc9v6u8d7ojgc9e38geur0bz74gojet041xpd168tzexxsyyp42jj95dhgxp4bl61wyaz5u1u9k',
                flowReceiverParty: 'peqwk7z8qg7l4cyegiwqpebhtzfhtgoqiot3f7kl0mr1t4q5vnznkauw1o09bi0yhepy2pyy276hd8to2sawkkfyfs3lilmxsqzgnrmnrkz3kb1hqw2aon9hi8mohpgyzykgf6wd1qomdcwoiu2dh0impu9979y9',
                flowComponent: 'zi1ibayq5b09fb6cwyyo4t7r0ei8mffzmcb4ynw9exjjgnf5lnieikzskl8e2g34h5gy1nvlowss5gap5g3m6le4k6hk19xwas9wrblzcf425doum101ya9v3u1t8ux6y5i3ip1dtg0eghdlbjxx6c9544fuebqc',
                flowReceiverComponent: '51i7wgh7aw2xvmjaqw7ha2wb3xe83b3zb6j6ll9yj3vkxnegehp9q7l04kp2frye4s6t7y4c24c2o7rbvf6qf9cmjax18ehbcjrjhz1cxsddnu96l4np6yflg9ganua6wfonh8xssdmg7p4u09ftm3mie2k8mzcz',
                flowInterfaceName: 'd24cf7tfj2t9k8uu2f3cipdlcj2a8x95184w42jge77g196rnuktx1s9je4c25xzoghqsfhths4hqgi45w7g1ova1z19vrffncdnilmd243igl4esurwuapdcq682xpd5peuq56uj7d3498cjwl7wod0vskvjwiv',
                flowInterfaceNamespace: '9sr3rr39gbms0sc2dxt2jczdsz8vypvheydd7ar6zrhz2d8tfc37drm45xkcdwzcx5gpho9gpdt70nqgcswim7wwrk31e0kzqma08jhkys5jr3q74zsn3qwxvvw980oyo52iq8oxjqn7nz4d0vkp0t9x3exlkp0n',
                version: 'pcd0msytl4pg5jdw57jp',
                adapterType: '3kmuwsg2gkbyleymih1bfsu7fjt84exwajm7s250z27s0lapr5zzv2ypiyiv',
                direction: 'SENDER',
                transportProtocol: 'zmmafq3mydiciqque99z2xacnb4rfmrkzipnthtmwud1fnaijkuomt7gzahx',
                messageProtocol: 'rqcv0zr4n7vmfdb5feiy66lb108a7tizhknko4512vxgkgk3okf2xunzlo59',
                adapterEngineName: 'tp76ley052xb6qo1g0vomdcqo410cmf71sg5yukbz40hnojyyzn0qxithlf7srca6okjzyokfgkcj4s6zo30acio9azypp7cz4sb71vdxl978hmj9gdf3i95oh5ndrcd734rqhlqosky0gevfq0m16feozg7utu6',
                url: 'zf9hhirmi6y8qcwslsms5f8t3aukkz0g6yxsz8j9vdgth0tay26il0dnq0cimj7num9g12spcg40o8ge8hgmkntrjvdp1qzb35a13tl9ovtgtjn4oduzjwtq44ruj927t8ipc2vvqujwl0d8r8v0m4l4mteqjq616rdwswuxidgunze5hqt20apwyp5aoijjsw8rzuzbkqnrik1ecwn4qzwu8f7h8bvib09qw7okhig3gy0gy4mc8dorbk28oym5edmckzq8d0z17isku7i1yyaumf2f81ld8gtagqos1c6zgo0qe63bvd12rksl7jn8',
                username: 'x1funsplgw8dyjq7m5eoee9n706bov4qmuh1d42ainbmzkbbgeuu36beml9p',
                remoteHost: 'corn0hwsus90pfg9wzdr3h2i36jgvysckcf2ctxlg1j91zvl6ki9uzoieww3a30lpcsqnneykw8ylhbj8i5qycfafzkb3rme6rtkfjl7gjcmlxlgohw0k9bc941n4unwuqlx84ka8tef5c3x34p8cf0150q10tg2',
                remotePort: 6291800952,
                directory: 'tsd4s9t4se3xyl939on3kctpqpttxbvm1mjcbdh4777ef9z2f70s1cioel10zdckt746vxpivxpezx3fc496pe14w49iapmwgpjxmnc8joirk7oocc7l8vt8ph957ppg5cei7kjmsuy3ufdfmcl9bxoqdu8nm337369he64dpirs7mix4da3lxtm9vvcgdtgd6vute84z7plsgq0y6q5zg3fqdadykjeusdjqktpj4t8b4s65xzsuf45vogdqmewkn7iel76sulbgseauif0rwleik7r6os61ojiavxmqc66pxb76i7xzqmwzt81e439kgqdtphnhk6qnyidp0uxpnqjqmxbb8pgs40fxexzo1b8osdopox8499fja6v1wvgdgoyqpalt26zub4b0957m71n1odf087eyjs4s1zmkitzafq5cohv0jv93w5bd85biu8em7tw1839xniwf9q0ny2290fokisuuc8h9xhsd2rcxcw937y6f3pmg9g8lyqko7rbw1ocl5xsg10qpqbvkatvb8jdk7331wb6x9qyz2fc0vbv7feirkbyej37epc0r3innhiz883rm4vhyi7q9ssayocyklpl1wz4p6f6tevh0nlhl0kp0p66qersibrtgplqd7ldiqdd0y0y3cjajqwja8qx3kak29n4zfo1zl399puuqcdko9jhsohepyasj2ht0vx54ac69lrlj818dzx69m8n5elh1u96m6bh7yx06t92aka9gact35xf6oqxgoffatewh885kryvdphljpbukzmiqnr4hel1yquime7otgbi0qxtmi04cknmnvvjyjprb5gucpk732kuk1qi61zt3eurx71s6e0kraa75acqd2dzqe1guv8xpgktwp77zv438wf4kwawgtly8jdow37z5ay8mhy13rid69hbhxf34ahk7bzex2kdri62q1lup4fofawhra5qmlsm5sr8a2tnvm1estdcr6qn9qxrhv5phc0zkw8ckifqx5vmrpwb',
                fileSchema: 'gshoo9pbjcz19p6dqz8sctknlpheapba66l0087oa7rb8x8d8p0w2hngi2dq1rtng6dborqd633jxwvdk6yzkmrhmm7mja3ayys4w9of0x1shds7m400543i8j5e14eeer9tc2ndkh4b6ddy6kaah1pf0xxrimonaunl6asd89bia7l5wdmsxecpnybix50r7pandckz8lzm6ljca7npjd24fpxby5jdq1sq142rxintu3xsoypecccm711gun4il623yq8mnvvzn2j0fr44vqzeznm26emh19p403pvy1l5bl7bi73zl7kcbw2skiuctyjay4tfh6d95dn7i6rjvncczzy4atpui7sfla17cculsk6rpoz5nomsui7s4eucpjhtj84oadwjugqn91y4a5l3uhgvaxh8mivoxxntcdmxksvloq56kkuqfnllfs3fixzdk1kaqayvl3y85wsvo5lnhk8eh8z9igh2x7dd14rxmqk9elltxtqrl3a6godoj85xhk5prrmy8wl1lekw477q3g13b3ap6zk595kqmxzhvvwpbfmu1w5boe763g9u5n7oz1p62xixlodm5qw93a2eax54y18o50bgglaqivcryj5zx46w8fpa75ptxy8rker53lu3aig893xzzr6na0v4w2x7n59o445wkjesxqmyyufn9vtc40mgnyfpftvcad2ttb0u7iy3c4qs80wxrwmz7my9g8puixskumaefywt9nw7jyh28axiby0mfp3eu0c1621iuefn520x2zxi595pj2egdf8o8int862rxzwkjq30mye1rm9c5tp2f37tqs1ri0yzul6tzm01ml8otuwc93ev1t2yq0rsv3t3gvaap399chcty9uduue2fxl7r2r91s5rxcu2i3pwo6udm3cpxm02cfj4joci2e79g1jb02xc1oft4v01g6mkx5t7kgvbx32ugkly55n3auyv6yyzy1cuctl5k92f7pafw6o7gzuku1l4zey0i6g6xp9i',
                proxyHost: 'f3jd0fh17foasblv38ka25xzkkeeb6ox68r3x4vudu66hfqx6pnapmcx4359',
                proxyPort: 8741824102,
                destination: 'bbbstlkusfnvhbxh1wx1k6v53wfl2o8e0nmdcutlim3od5rv2putyv08jhv48hs4d9nb9o1iy31khd03by3ko465l0n75bizr34lyksifi5giyiwdbjm14kl3z19vf0g0dazimke2kweessa7wsedzjq1pzrm6l6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xq9fuona4gew4rnbnejlav56ci8rgbklww4spqaabvrfhsb2gsloeu5bbnr0nahg8asrfdhsacvm1c2ixa9plynevn57w0mlvow1pvu5r0mb6289zt7h3s0fqacj44s6obaxr8jhsdk3lomgt25f7g6dlf2g5pth',
                responsibleUserAccountName: 'kqn44btsbgs71gtqeziu',
                lastChangeUserAccount: 'fqokq951ygk50kx6ax9u',
                lastChangedAt: '2020-11-05 14:32:04',
                riInterfaceName: 'dgcqayvmnl6tix3u5oet67y2lpfhm0ck5xon14q7hysetpxqwu6nymdvxw1msup3air6vc0kuzbc19nlafg2v294iq85sgl3305w37296uvuh8guft496shuj7vpskoqzdel9v50269dbbjartnvi2d9onzxvgal',
                riInterfaceNamespace: 'lz6cbvlkg5ipn9q7syy4jwqedwbqdhm35inw8hf44dxfmbc3kni5g71dqts7xzobd2ufcq5a5i8yfie41g83catg8j1qt31kdjoe2213yezkc6y1xdhy2fa0rp2niin5qi7tt6vzmc8euubhnem8kbxialc89fjw',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                hash: 'xjtc6z7y4ehnq3ja8752q81bqgkxx32h8n8kw4e5',
                tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                tenantCode: '911vmi8xx0lvttt9ngj0npxlqnf5vkpbn1xh0knpmggpn68owr',
                systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                systemName: 'igdw8b05zgbad75c3xxz',
                party: 'hf1v29a24dmeidc62phzldzx3jbsn68ls4haoqmyi9xbnxvst48vkku0j8mle9zx2kmq6llchjtwzab5crovlk0wsrvfy6u7wga3o845k6cucwowc1n8r0gyu3674xm6qh8qvqlgw35i2zvfazr65e41joickzmt',
                component: 'hirke4ag84fxzrgw9hmed1t4dgy8mwjzki41ton6nhaicdu9almjz1bjfurmemwm5dufhg15q4ch0kidhn7tiawfdbu4t46nuies42akdguxes3vntg6w0sbr3vg8hlv6ho1bjzkhgemw3d14aj1dhtwmlh0a31l',
                name: 'znipbc554bosz6zzmxxqrbcozxvhgcnzworkm5lllmnp6m6wadhmtutl1xr8rvpniffvnawzjos4xcyd7e28gmvp3psxxoaclzr4cxiv05nsw3o6wqg6g3qfw5dyyjlirl3r7kq9qlwx1w8i9tyihf0azg0ngkai',
                flowHash: 'jvzui30fc5350sl7rbizfgef47mt5myqiitcq89y',
                flowParty: 'fjmdg0rndjz9t55e7uufcmytaah5toiwubm1lbmllgmmj3km3urs8tldlw3a1xmay5tl2lmldckdifu8hf6wheh72ji164ee53vyuvft2h3w7ovqd2p677sy4cazr4bt1osccs6timu8m4xdhqr0jt0nt0eejsxo',
                flowReceiverParty: '9jp0m4nz22mtg83fgpl2yga85rdw9itd03stekkccv6okqtqf1q1grymoowydfxkm0hljynn7rk13g3lnqi3p2m3xc1debb4ih7ted82op4kdp5zdxxjqzha813t49g5x096ca98y7k1qmtdjt4y853bk19z9cyc',
                flowComponent: 'kti6sbdtewsbtsyrkhgqonh56bc7ph8gi74rwqix8uwjn1rhk2ullt62y16f9jtoz01pht18nmr9hjp4b8pcdrvr2z772c6e8zpydynmkeybz28fdl9ljiw8ukwm2f5axc64b1oibqmbbdudw59q41l3nyhmwvye',
                flowReceiverComponent: 'qh5q6hsrct21x5l3p9vjj9agy7lw307y1v4wyjzy4pyurhhglfha24de1h6xeio4w97j04paylpfhlt9c13e9mnta0m5f6gfkk2lkwht0fxebe7hdxwto9n2om35lezn7fi6ys7q7yir3k2hduozplnowp73qfri',
                flowInterfaceName: '8ze12oplzrw1qv6lqylzt86gca840elj3cmr7g4eqwhq668k6s13bzk39gsc2nu4vx57j0b1uhyeeyq8mzr0huc16mflja8mtqahitn2qebzhje21pokfh2qn88hd0rvpe3vj53nd5zdlqkkp8md4bct5gd5at7f',
                flowInterfaceNamespace: 'jiu5m0ghyrt5ck8lcv2n11eztmy11uv4vxyj1vcpzd75gr9np6jlgr2l6m80tvums0f0ba0nn2q0fyg8zcvuxsx8x43xi7lvxtki8g01zbb7a9ujsz2nii9tkvqxg2uy4sywe5jebxqbjzxlnwo1q8lfvdt1jt0s',
                version: 'bgoenrun6ds7d670sjmv',
                adapterType: '9gdvo1uzg8adms0gw6z6hqji1ztbzk9r8dl8tz4a389oncke2k2z02w5mdzp',
                direction: 'RECEIVER',
                transportProtocol: '5s8u6lmku8zfe29j2xahjrphexlo488gzp8k8yuqol7piw2ymxhmjgjntxbe',
                messageProtocol: 'a6nrfb380o1vq1g5p69dyy1v5fi59hvmkxf9b1jtyzew9fbj6pkpy8getkly',
                adapterEngineName: 'o6u0stcw5a07rhccpt1w0u9awmkldqbrkx12a405w1eely3zp9vs0wylx4k29y9r5us0lyx0e2cle6gf909tqhnnihie7gbvybxf2pxdf1vtn0mivpvqks94pgpm8wgom22hucaj8xm4ywrinrqlnomjhgx9a0sy',
                url: '34ud1b04ssikdijmmh0flnn44q02jrmxigyu0bwwoikj5brifq3xaj1zu4o131yp4l0xts6xdsa9oem00g678ob4n4u6l3uq3stvep6gwy9jqe2v8t8132x6dkasyupgb6rbvinuflbo2bm4018aecro5tg8vyidoq2znus5facv4wn19u1ey3wtanwn2sqrjzspbxm3hqati1tjr0dkl3g3epw8kbffpdc1wb440dniicjf2a9m19oi0ml7e7ytmiov0aq5aajga7thw8v8d6ud9te0hvitcepx3i2mdvehoj0zuurcu6i8m98i3tt9',
                username: 'l51v0na5snkdlppq8n3y6a8rojkoh68d4s3o99p8l9ildwvr2ba1i6v3j8gi',
                remoteHost: '31dp6fnywa1lbcvyzukq229571qugurmis8f554jafftx2mey3j6svvuj564v7vbi6emzk7gr2bskdv8lqqez9ixcf1pm1qkfkqs57qky9jlrp7f9v8d2fjy9dxk8uf0yy20xrdzhbr0y8b0x9hxh9rilnt7yfwt',
                remotePort: 5530867513,
                directory: 'yi3u944aig69h91esjjmuxzgk5b4goscc65dp79d8ubfwo6j1o6ittnkrisa4yfqfj2r4drvkec099sfecm4obn7twk0iasm1v4meejvccohmlw805z1bonc4iyp835d4piceje7vkd9oog41xpc1te7pvqrmsaizwghr79omx6ibp9i19ho0ms5s5yde6ob0h5l0yqzh9w5ifrn6dedcp5kk0td2id0p3yiv9ftwqnedx2dc6n242wz3p6alhd8vc62hvaj08yos2ny7zp8pcek2g89gjv2b5649xqmzuj89mwck37ov9o1b5fdcno08d7kag9r3midxtlicyeg2yo3rb69szw3e8079e3e0j71fnw2e9d6383g27b2e9fssl8p6ygalmf9lgr85uvln6nvsh1vu5dblgklxmk567nigh80atsdgzp2tsudx7w5tnhli59wp2k7rznchlcobefvndncog6fg6vgdsr7wa6x60h27zfj9ybehgpuubrddqxvjic2c7myjyrqwckffeipkx7e1j9mgd50deslpxp69s24mz52d45h4ax8uqgceaewla6gcpi45aqt54wc81dszjnxchbf9pdfsdm2uj9hq0lqa67d8hziebqo95imyrvzfl7tplpwveqh83qeupj4vmrtx6bj0t5hn9eo6qbzop85x5fxzex33ohdinkvj1ejlru0t88kur6gemlmwaa4wn1ocr6a8l8gmj4t6gd5q4g1jq1qpvf4k54vopz89gi5uqv1l4hzbl1368afebzxe02z1pfgai07eizclghdk7pydfuesvr729q5h53f1qw6xhyq5m3r6iuyomu7ca9niw96fsxmpc7dfprhae8dypsl1xvxyjy80k95b2xr1cxkma07qa5ny0f357799yg7s2lmx26j7r4hfsv568o8tbphxhbz0gvrsnikv94pfjuw14n8cksku1cgny1h4ogc0ej4we0urkmqhc8srah25v07cvcc3dsqt7afzb91',
                fileSchema: 'ze9mcqvq6t7gtp5ckue7goo0zwszldkw3y96qq7c3m0d59x1iyokrnxburb2wsrm99nmqg0cqpb8tlhr8ls6k33ns5ugue2abl61xb5tetetk32ycygwnq8st0s115myso2mbw6h2gzls1q7ffyy2ikmgz0mpirlzl2ojh6z1t8fi9p46z104eb61l50gl73v3v5gxnoprer8s7ru3emjdo2awuv0mv98p98dj0x56r48v1pvk5l0wzbxwx60rncq4f9o4cb63n5bz8chhvv85hepv9s8uko45ap40hf9j84xe4sy51oc8q2dk2jwt831wm3lallbk529cldkyu7xwmj7yp064ogj7d9zcevyc94gm4jp3ulu1v7loqz9z8cyy92b0m1izf7ria8jyje8pviecmrqlbtf77ps9ytyvnu3ynuo6dodm9ssxmh5hybsp62tl412vovl1ioznrd75zevu2155lbntsyup0rnjcgf4ll3265nqh73q0q6qtbogl8cmr6g752ghvex1sag4hk4q0utyw6sn4emm05gj3tieqt2ak1cfytfisehj04op5duxhblpv6wpv3q4b29qxegh7rglycvz813gb8v9s7660gdg8ur3t5u1dnlohlwtx0uy3cn0ijuqny92rickx6rcbl1a7tkycnzqp9xgm0fygjcbusr636lu57tfzpse0a7lyo03xea8tr6u4zkfala0hc48nmt3nr8elhcd1fthq2uibx630d64b59jkhe5i8h4tzkxvvmdwkn7430z6b0mibl98fqrufkse2b42zn7j7ig49couflfsulyzm65poillaffts464cncl8thv08i6u69dpdigs5b4qkiwo5w6r6n1y6bnhlqzl6yevkrajc3d0nrg7b1gevut3toghyde855ykrre2c6at296uohp4hffom36cxpx7yvkaz5e4g36bu4yq53tzk9bbjww3vbx959sa4re20tmj5no1ox84nnhl7dra6ouneln8',
                proxyHost: '2vbm5hy7xqg2xghzvnyqrjltheal3sqbys2z4e0ry6qx22rfvd0kbdrcylql',
                proxyPort: 2264446378,
                destination: 'ezrrrrfmi2whc9xeozlynynx3dmcbvhe6mvebxixsm29juq07nl8nnqoe20py4m6h0k88uaq1jh4imvuin04q2g7vj7th7bs4gowy2mvjanqz30r866pmgvijrchph8tdrmwm4n5mdlivzt1qx0nvxolxm9gppip',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rbhkt3yzfxsrims4n7jq5s0udw2t85b7cy22abkvutlrgs2gj0hyyt37ze3xjy1n2c2aaiwok0wyw8jqibl0itgg3fn6lt29byexdlh1m6icrmhj94c0n6mpp6d6ps26hj3lg196d7ao8kduwrwps297pg1xdis6',
                responsibleUserAccountName: 'qor8jkd52e993cuan1rp',
                lastChangeUserAccount: '9x2ug8mepvc98ohi068h',
                lastChangedAt: '2020-11-06 03:09:24',
                riInterfaceName: 'uethmtgc3fqv68s1jm4j3b6iqh94vk2havt36d9tawktipkcicz20i10h1e858e5k07hcvsos5cgmtlpc0aii3vsuhm1icpl0d738ynhyf740i8v0aw1cs240jyb1qgt0ioh81lbwsaj2of3bet3qdizas8tphn8',
                riInterfaceNamespace: 'dx5fx4yjmtenqgmfxox5fk50qdkzmqv4rhqg6qdkldzgppdeb3wyfy0exhe8159pu0tr4zfr328ax1sv5lvrgt13ded0bei2ha15xzhwg3fw507vqgmp4karlsl9agj09qv0of6xb8lzhuldd131koxo20dbh5rh',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '594fd1d2-4836-4f2c-a615-cb57de277431'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/9ad9f765-18c0-4f8c-806f-5765e295aba4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/594fd1d2-4836-4f2c-a615-cb57de277431')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '37f20fa7-269a-4b56-abcc-217e0306dc64',
                        hash: 'hf0i4ozv41n0nvv7jsig7xnhw4ymthxyjmskz461',
                        tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                        tenantCode: '8y1v7pxuvk0ps79a6hxpp4qgoac0737ngc5rz280xf5ioggxw0',
                        systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                        systemName: 'zkjdz2zhkl82creomjex',
                        party: 'c143juy3uhk3oxotnnvawugou2n2kzu9c6teqwx2imsbclbo19wl98nlvivfy6ifom5c5n6rvtrx4efhc1pggxoepn6g1a4sj9opav5vzf2gfsy7179b607bqb6y03fts645vd1t4aiiffx7zv7bncnxybzkcr6w',
                        component: 'mo8thk02ov2thizdp28r73fyksoojt3tkrnmn2uy6y441a92itni960601iorekon813k5cxl066m2wh3sq4mulb1aezbzp7em0x5dbv0s1fggihcozr05aiaz8wgi64htglf18e8mmryxbyih0hfzy1sxmad3f1',
                        name: 'p0mdz5p5m2htsfmbcbdd91bc1i1xl0mfv67y27wqfzmc3d3jssvq0pluek0ksufg96h19gm71kop1k9vbum90oapwc6mkvmjd33duw8sd6646oj3ww09p2b650o2em48frdd4vtlxlten6swxikfc2gtobammvgd',
                        flowHash: 'gt384ifdwtdniszat5rltmihl25rc84mt6lp3nbs',
                        flowParty: 'tguf8i4l3g8r4b86pz39pwynz4s3055welsdhgdr0mg0ummt70isl0uz7s52uq9wpxhhd0zp8w5ud0abs795nf4apg2u4dzxl2imfc6odyss3yepkcx7umidlxjvhblh6yyd8gdynqn0zexp2264d59qm5mxccwk',
                        flowReceiverParty: 'tg64qrf4i4g2p9ygh6fv6nu4s6rj0m2t5zew7op1msemd0nit0vpbmvnk03dbondia4oubdrw5hs5sggpgbpozkql3ey94q7kv63w6nuadujjq58ju1eew3olxevxqjq12r34qdgc9k5y61l300zs6ztg4hr8r2l',
                        flowComponent: 'k6nawgbl7i5vdjwu9y90egmt9eibdty2tvfkmeykrrra7nx0vw35dmq2xcvgspjvkzcebav28zvze5xme11031d6ro85a0xqy343xrbasx5p3nx3f9asv99kfch9em63xon3f4dvem5x30zs16utr767dze6489a',
                        flowReceiverComponent: 'jzqthmbnr92zdm3u48mtqodifvuyo9mauqvdwywpu25rhpc8d70hhifg9da61pnf1thn1f9j2frxthpe48sxegdqv7av1zm0yidqfyyjab7j5nmxfehmwgdxya8bnbh0dgdzppb0x00yfo3h7iw8c7h0n2cq39mp',
                        flowInterfaceName: '4poopvlsvk18mjest6k03jmpt71usl7a7kzmcc386lth85txfja968w7oovbby36dby7laloq05rf9wch8vhqsjvk2kcw5nidkpzy13uaapbgn425n2pd2u7sjdkn51aoumdbkxass2wdnsqxl8ai6jgaz056pux',
                        flowInterfaceNamespace: 'ivncdmatksuuhaf9m150p4f4xe99zsfuee28cz6m66lefdupvtetea4n85sipvk8jl1hxzj3j7e3kunqhrm6ehfthudvczjjsbfa3n68ug2soolvb85v4nxjaey22t49km5zumuylw90y3xz34qphtnzz0u49jz3',
                        version: 't86w133pozu2oynj2l89',
                        adapterType: '6pmv33hklv8u9tatfytfzxiue5ahxaoxb4fltx3c3xjhslz719kkzpuzwc15',
                        direction: 'SENDER',
                        transportProtocol: 'n1rzy4gfbd53j2yql29ep224slv8a42mkgblc4szvdkxisifamzf9hphhcw2',
                        messageProtocol: 'rb1o8iqn0c2pstyf1kduk5s8euvrfuh2n93qe5i8gqco8qsa77hsddeb49i5',
                        adapterEngineName: '81eb6qlo8tbzei22pskbti3f71zowxo631gezzz0vt2478om8qj3pvxe7n6xf50h4k9x4890mcr5ywbye9ntl3b3p8b41kmyjnfzs68pjm0iw0stnxu9rpdxfxxo7sas1rbbwhl2t5ene7p5qlhnv5y37qu70tvh',
                        url: '1ce69yc4a35y84paklwqzpa21qvnq7ldwb749leeysdcmtgvps5ua6n4iu7lh4u1hjaahqjhjplwqa21s2ui46am4d1whq53m106bttbhkf63y47laai473t9jaozd44yjgpyqpv2xf3670z1d08027m6ddsfz8uq3k10uwhpjg83v7v4aytw9jt86qki2urt97xibksb21bl95dmefwhmd0h8qkr1svdmkc2s6ew26tjjcstqiol9nppjbhhv747zrp3r3il8czjtz9rg3353mnbkrf5bd17vvapedhtg9jlbq8mywy9474lpely5rt',
                        username: 'x1tfntk73800mtlycjto9ioi4mjjyfqmp4h5632z4zqu874e7e3tg1yx9ee7',
                        remoteHost: 'kc5jnfzjtw0sa9sf6i8knlbi77l5lf2uhpu07h71g598eqiik5ef5skth1j7wuiqe8nnf1e0ob04oajht00bein8804qkeis0bcpiuu6occ013k85jpmfdesa64z5nojmbz5rq55b9u36dk99bjwmdgin4ybolpw',
                        remotePort: 3766483361,
                        directory: '43f54yh2up35sh2tvrv3djfnjkfdvytspvn3p6z4s8bz4796h7g8ekeh0exxs3d3jusjor0dnq5m3fhubb28eq1k667f6rhrcd6ldyggogc6rxcon4klrwtd4r87m5t7z7jr6s642dfmlzt9nfnuqmy6jeqkdr91ity3werbxradv3n1x0icryhq0xqx1wwctfk5xj6wka1503v1q3pswkavhvl70hfkui6qo2wabmpdmn0wd56xm1jlj27ertujxiooo6mnqb3ndgty5whres0pful8t53rujv49tg8ir6tcvfn551g0l2fs4huae4frkkqh9v3n31k7k24npe76n2b1cw3i5znisdzwcbbgjv2k3l3vix5zoqrw9wq5jdeu81k5yym3woyxpquxe08aeqo72rb6ho8vmxohd3h09osbt5rtrmvwyo0gtcyoljxi9eaj79f04ra7e8wms9v1mn2dgdvmkrw5gbmac65mcqq4lqsq202p596oh9t4yn5uri24ttm5407gjh6anyh7h7pmbfsyoiwlcctovmebokneoqc0596bsnfslgweg4zifinil8js7jagdavocs7gl37n9wpbrlgax3l3ybt4z7lmwz4pmx63lz2jlxi5rjvebg2xnoeo69t8dq0cz17c8gqrnwwuqhhtcs8stqgamomchv2ql3wiz225j4berd65no6r9ojzcitcb7d5ikee6zzt5o1ukdbcsqnj487k881r461zfgt9bgbqzi1b9edxz3hzhdt743polnkavjf8geiq6dprh467u5r3qidgugvu39ux7rcsamzjhn4tgnc70xv7fb5xfxxzrwhrovg9jzmaovkf70lnixie9om0h20vygui0pk3izofkvhjiw79yrehokml0oye4o8m74614tpgoyxy4445yfgf57hdbsegokj6s11825z9a3zuaqxb9po6sdgxfwdv80coij6ajff4u9zq8ol9nw5zavf4gnqf682x76i6uai5qmlvkk1',
                        fileSchema: '34v0210gbcdw0zfjterga1pn5nub2vfm0mc3wygazzkgab95t6aa61pwzwkdbfwly7sz5sduee66iamica65dq2uskd1o252mvn9prg4sbzob4ux7ebva474me6xdvk776zkqpq0tyvdl3dha1jw1j3gp2ow3vqwlk75v5iv3ac28ude6jembmpo90pjs6zvhh6wurjrfpi8cc5dsupw5gvc0gt6dszcavbnr99r4pwr9toxe30tk187lmk7j0j9x40bxnsq626j9xgn0q65xgwnw03wuguloib7fxeok7zy07rw0cb1p64j28qpwgnpz63qilomakc18pzv4wwfsnr4kdvrtjdevbde0kyphmtauu5ilpqcj9lb44q0lulqlq8gipye367txg1uhp42r6pjd2ngqfayzxn4zjf5aj9hk68x2ennyahux6dkdjn6h5vbuc2od4ye9xfphb40aii90pd30falr9qmqzpirkzxe6c8cjo1jdbttquxtotw4lrilh1fzu5nt7h0a6aedoam3f60ayvevmkqd3w27agnz1up7qcy20ds2ue1w86l1txqs95bvpv3rw8uqn0o0i02l4w0212wy98hmxneyqpzlsqqxkho1ryxxosvkgxii04ekrsjvprhzjvao11dab1swrv2k7fei7zk2gkpuupd1hy161f80wg7vcbeej0sizlc4i0z0ke9zz7k7uzip5s80o0di5phiw1q56d6un1kohp3bp56y232wh7xw8mnmlqrnfd011ks3j7u5lapsi1uqg5nm1ne51ipp9cxuuu79dvq0pfx7c39okngekjxzlexx038eequndywiarj0i6wt9sq61gf5utrv1vp4pla93uu4ez7ypz4gm1eo9vn6tik75w1irxnkwvoh38zonvddbx4myhm8e4flsbmlrjmxttp5wk5qmsy888qoejzj76f7n6t3jpsh5xps57ftcjqaqw3nqnc42xgk8w5m6zwn7sni00t71ttyh67cdzs',
                        proxyHost: '63kn6egdv6prpfkkfwvseucye4ti2jtzdw0tlp2yjs0u34zb1qji452chxoa',
                        proxyPort: 3223990499,
                        destination: 'td0qrmve174zw56iaz3769qjt9x8157x4hcytf3wlfxvttr7um64lebuk5ggke9q8xv35y6q2jl9dtm0v4xxvs3gawgidxwkji0tq2zc9x5fnr8cg37v8jqp5m3jkejhnx9bjse8x357c6yvt0d24n1s3utzwvvv',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'c7pn9vp4vt60zh1jbqlfbs70iyucgx3h25gu0u5yxfl09stb61t791il36njxy0ex36oxfxg5h03xgmwzz02isf9kv7x26bz6y84n1noumuf4gi1j8g375rbzzcghhm0lqi4mg96v56n74vq1xz9ads1s4khda0b',
                        responsibleUserAccountName: 'a5s28rbmdo06ofabn266',
                        lastChangeUserAccount: '2n2dc3veov4b7oeqyetd',
                        lastChangedAt: '2020-11-06 06:39:29',
                        riInterfaceName: 'renqi6hqag5woec6zieg978piz2amnc0siduxhlsdfzu1hj4fngjycgz6p2hz4pr6rydbnpekzv09ux1t9vcfx3p88ohqg4uupkqfv2xntx8r5quss1aqykxy3m80e1ga7japrki0h0rgi4wzlnulnx85l4fsufw',
                        riInterfaceNamespace: 'kt6h317sp32nohomuce2s4i710ep6ay6ymhavgcexhzexec9w8s3ptbhx79uy3ano2z2t7yyjl6br7cfj75qoe1hy05a06cetl0c0m6yc7l0adyuc58b0m5wshd0doso6649qy6z76dqdgag5xh2gka1iqqgpuvk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '37f20fa7-269a-4b56-abcc-217e0306dc64');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: '65bb3ec2-05c5-4e56-abff-4082fbf53fe5'
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

    test(`/GraphQL cciFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: '594fd1d2-4836-4f2c-a615-cb57de277431'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('594fd1d2-4836-4f2c-a615-cb57de277431');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8be3856e-8b7a-43f2-bba0-596ca37ea1a6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '594fd1d2-4836-4f2c-a615-cb57de277431'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('594fd1d2-4836-4f2c-a615-cb57de277431');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '24cdc9fa-7cf2-4695-af69-a28e80f610e4',
                        hash: '4i3kdushvjk894n2p7sr1hl4lgz2nfv2ajv385vb',
                        tenantId: '70a9bc51-76b5-4298-9334-105a8759008f',
                        tenantCode: '55dg4nngu0r32tbuwytuqjtzpq4rw8inzhozh0d3lx9luwuofy',
                        systemId: '1380a4a8-e0c8-4a81-9b4d-d78b2f78dec0',
                        systemName: 'bbd8cph3ibxqdgztd3y6',
                        party: 'xqrf9e2jsasow0amxgrcsf199vwkbloexxco1frqru0u181ps05nel95bogffz8x98c7jxy5u8wa1n8bxl7fyyw0bbph3qm3pv0t8be8attnsm0vwt4g7t5o6gs14omvod7oamfq4vnvcdvqtbd2zbe06cbpzhlb',
                        component: 'roqumfxyr722uczvusw0d5j9wmrzdcb7c0lzlnqalpgse9osuyoinr7y3okbu65qg6f0d5x4ocx4gbs6bmao6fpve3ufmxgytqdo7dte7wcc29vb2o9wzsdj9kgk0ha78r4anq0d978xf8j3hdr7n4v93tjg4udr',
                        name: 'gyb2szezkj5qt1qpw7qes397c1ioagxrwedqks8rjypvnx7l8z0oyf3u9ojopfkvfx6a2iqzjfgf2iwp6er8is6gadv3i9mq7geagh5en8a3yhuwz43w4c2pfr14ouacz54rkxn6topkq7g80mkcgypfaanz0zqv',
                        flowHash: 'qwwh5aj8oujdckty5f5c3wy5e2spde80t86hmh1c',
                        flowParty: 'nglqz64v7pcbt6lovbhiq9jlv2c8q5pff0uch9pm9b3bh157vgvqcdzmki6t03ua8k8nz4pgh206mv8bzqkrxfuze7bkxcfzx9ygq6yd9k7k3npjiligu2biorv3xo2p7vux447c9vzq0uzhgb44cbqi8jv03alq',
                        flowReceiverParty: 'pxk0klwjd3im970w007sbhrk4z6wq4xmugnhmo18h79k0qq73l0ldlhtcwsgklpd6yjpgn970op4wbph9cyvtnqsxfalmniejocxy3rg3c9ax2cllvpgohc6yppk8njpjkch0d59z6z6ym5ct2k2trrbh8aq29pm',
                        flowComponent: '6atzu2k2mm663cwb8hmrkpbuvfepbawzqqdqof59cx1p7eucwqi6w8yibtvtv9g36spqlzjbr2cl9pbszicngqnajkd11esb70z9t6flvr3dq3fpxb3ydhm1ef1hjwsckbj4547u7ql6fe7i1cfnp3ssyx05r41s',
                        flowReceiverComponent: '1dqmw8syn1hzbj0mx904wc4vh4lxealdz8xhuk1wvqc10zdn4th2x9r3384bdkravcte7ws1nv6cjfery1uz1saska5d169g47b9h7krcnx6g2b2v6t2f5gcoxacjfhifzfi7fq3gdh1b8ugy587063zfzgclvve',
                        flowInterfaceName: 'ncka8aomu9mpvxxv1jppfftc474v602vk3a0mtz8theiy3lyxhaaizdtmvtc3t6ewxhi1qswj5yg4czn4j6voq6k2fuvxbd4x5glwawcl6p19x5448ite3qbag0jo6iz4pj9xvj7pxejxblpmnf4czi0wr8icvc4',
                        flowInterfaceNamespace: 'pukomwb364unpwy3va7iv57qjon7ofmcid1ryx171y91ql9t1jxwq5rqetmctdii16g8hto62eeqrb8e31ziql13x765tnr5hzz1yp0ysvatymgaqo55ja9tdhcqjlvwhn24bibusi8ohi6wpnp96b5gw5ai6v4q',
                        version: 't5x1dq4ubyg541frk6u9',
                        adapterType: '42sdwf7jznsdv2tgvc2m5h05co5iaq8nbc9n54gfb2gm1dnbjz9v8zk1cdub',
                        direction: 'SENDER',
                        transportProtocol: 'uj3n4142gxii2ejfbb1sopsgwpbhr64dzrf8muie6ob3tsp5j8dgiyxnqlxn',
                        messageProtocol: 'cocwtfe67lvmec4uufwkc5ohs3socs7pw4a2zn9b5d629obwuidxsqlb23ba',
                        adapterEngineName: '1n1d0w42i62rd7ulge757zwjvxi12oame3tynkohuivdcllh10nyk45u32yev1352og057pq3p2dsx4lppcmwcisvb583uu4j0bcm5n5pr6rgxtfgimuon3hw47xhka9695opndie1yr133mq2of3u8vtij0pp3h',
                        url: '6k0vlv7w0rlheleo8houliqfoqlag530w2xtb4eygiwqv5wvgdt26vu8c1mfidsutdu29uymjodxmdz64jrdrpw9y8rnqljc0jtnvvgn4dh2cyl2khnk1txjxpajyl2ivuh9z8wkjvjywzgqtd1kzr2sr9xlaufpkxzoolf33z1qjv5uzo24myln5vrvag7rwjsfo4b639fardqm7gj9vi3l2f2h3xm3u9nftnuj356xki3p410eyb153cryj98280rwxfga11tvm709pva1xojwlnlt0p58klkudm8svpb30p2ntpgcbbh69hcjz966',
                        username: 'acqv1w28v28i5t6ohygma8vtabj297k2l40mc6xb3h1zyy1crtgcs0ai5m2p',
                        remoteHost: 'bzwr21ztvpewwqisz7klnezw2iyjmw3f5nim6qo8gvh4hcy2cgeurdmg81ev7763m6f8fqnj8s4zghbfxwf8830wd33drll9j8pr5yj472kfy4tjgnlt1f79xl70pu2jsfcacofn9vl2t82wm3axpakz956lird1',
                        remotePort: 2776723350,
                        directory: 'u3r79xifx5qhnhmdn7zu4f6c0wo1mz0ka2y6k18tf7pa8wczhvhmxoi2am056ukb1n78ofx28wnklhjfhv7zf2j1c2ttda60il7h8lrcsa5n9be6fm5qen1dopd9k0ethj68sg45vwarid2tynlfpicy3bmefxkf8j41d2hrv1jgaf09p5i4yldn42xyk1rtvi3xvsy5gexzogt3m18siavzdcu8k62a26pwyt2whsdktotoflgyrl7j497ihmz6azetrcswegpfkjjz6abhc13k3c4iwho1082uleiu520qez4apfazohnz1nmuh2ak6wzeg63n6idqdosazfx9izj7os0413p2hmjrqqyq4d6ckeq0stvi6ahjjns6kvwrjhimainbiburg04533h3lzl9ulrzzz7qvr4ldqrvgkmaoset7ff6bkphsjc1io8tep5tor1n7knh0z6gf97nwwryvf0vwh3u4wv7oojsvyrvi70z421u1xwcj8ahbt4lvalz7b1o5ooy2sr1y6rx2lpn24mp25ayphhsx74i1ckii2awu1oiumk5cb89siek1mog1bzqutn3k68my290bt0xyrkg6gz0udj6dj391cxoxygwnm1wlfwxncwhe395kiqs3xjf6zywtkd5zoovyu74vzl3ztqkc5wt30d9l969idt0druvbpe8pgozr479zkkogqx2imo161ciwr63rmw63q9snjvunb24vplwfe9erys9qcgfvgt59a0yovxrj2e6uk6eyjq2fav9sgblrds958gbgvhg9rfjw61wtrzujsds7p0rxcyculi6q5qq85lat7s2bybpg6c8jnct5xgf781nnkunhnfrx7i1cvh5cwujv54h561lpoviq40rlhw0fjhxcs0pbn5agotje74wygcecckj5d7onyimddew8t7vjdikgh6x61y92hmq8zldxgon422ikgvtybfq9vm7memnw1p09ysaa3po99octhzgm2p0arsaxfioebtv',
                        fileSchema: 'k9dvyct3puspatkud7atd9p19bsfqad3s3nfelpj35423e8drglkfddn06zzjovfu6ah95q7p2dx1mqmti7055yobk5e9phtp2b0fi07c7oea4x534wp8a6cmkgnpjusaurm1pdv4sayerv6scwgd3i3xd747qka0b0wl8c67cqm36du9477pcnqrcmcoqb58ech3uqjwx11mk05e3vl7cuf3ezzslhis5fw35aacsiiglxdy1jentbrvywfz9s5m41ijppkpiqc33a4fuqec7lkduz9dp2jeanuv1dcuxrf00n4dg52gccuedb4xnk3esmgy3pm399v5dz00h6u7ojc6v82nmzzd20zsypbgq39xe7rqeianbifhisg0s6yqyfoktzius871035dhw9620c3mglc4krl79j7ropt2rw2i5fm2vq0xk08woa2ryokfr3zzdxog9tjo9zvymptxvm02ezqojcwi01ne84r2qf25rqk1txm5csx8pakm13dbsm4mdhok612seow8z1i5qn958y884tyx5cs9lksk49ht9e7va882myhrgm31agym7xd6ndzon2mf8acyegw8zk8sy9e13nzlogmujqn90x87ipoacsk7d4se6sh9iq2op8k04s9s3ogm29wan805o1a2aguvz6tbps3j5gm04xc07c8prrf6ir9q42i6285irrjuqok4ljpi5y9xktl87zqwqrh7g8q5q3rgnmtsrem7nz0vp3w1xrv6cmvfj5p363qbcmdpoj64f7i1rulvgyfl761f3dt9vom54koi9z0qsz5vxt46bvht4pqh468rj0xs6ru48tlhj2yfaes3sl2h46wqe3wjc8jkyl4taavtwgnmatjqnx65l72i3slv69hqzr3cvbfedexxp8mi00ofzh7hs93xg3m54gfeva3hpda5j1tzp6hbox6df6tel1jupntab8d9z5g5fps0bg2k3miv7b22xv8dmjclvvshi2v6peifzdkw2w7bjg',
                        proxyHost: 'u2bamk97bxmdecpurhdc3o0va7pevny69rg7yjhoi253cbzwl9gjc6t91tby',
                        proxyPort: 1285645794,
                        destination: 'tmplh1bfn9h5het1l67bmhgfr5sc6ye02anc2tcnluu6sdvyssalnfj9wrq5tlzw3eepxv7wlllgazlc4bis9ot9lr4e9lcg97e55zajt767qfts8lpo5uh0ednfucvkusdk8og24m6jmlmrxiylt0m7ctso45yq',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '80vemyd2uh3hdoc9pn2rrejk4e8eyfbf3d0qpnytg4d1dup84r5coj9eul58sqelzb82rwgqg1wieytd0z568ikuckgk5rqi1dfrs8wsnba2lpqv8hxxe5nohxerimqm71mjr7ibbzy1nwyvqghji86ts1ku2d4o',
                        responsibleUserAccountName: 'ltdb1zjq3foswnzz1ufu',
                        lastChangeUserAccount: 'bipur54bi6fiidbsbofx',
                        lastChangedAt: '2020-11-06 08:32:08',
                        riInterfaceName: '0nu0c6n057psf9i3euk1k9ocve7o9y3q8jlof2i91rhsj1qonw6efaqev9xczcphvxlfya8alw3s5p3irmp547917061d6bv1r7yrbqxablzpaxngv4nrvqrs0409cx90s5md6atz6sszvwc0cmerx23x7rtnw5z',
                        riInterfaceNamespace: 'mzh5ug56027h0nf193bkcrhqw6kc6340jdwerj96jw9a71tzyecpsnd7lrqxnego4n1vcr6j2zbwdp8sfxvw8xdu9d696zkllmjyhuptldb97up30cxi1j6p13ehnwd7rtfps0qvadozw6gh8jnfc40ciplnsabk',
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

    test(`/GraphQL cciUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '594fd1d2-4836-4f2c-a615-cb57de277431',
                        hash: 'ezz2qhljkm00r69bpqthlmtayszlbhvz1y66psav',
                        tenantId: '7606537a-9e02-4da2-a4d3-96f3c54e4d1b',
                        tenantCode: '4rf9hgi9ijk1ua3vpc89y1ug7q4vxxxf199fn8yfugxeiiwvmv',
                        systemId: 'df403267-e916-4fd4-90b6-12a09c7a6c8e',
                        systemName: '6l0jd4ldmstdun59srbf',
                        party: '3zgnftxhorjafxduhf3t7wnif0ycjtz51a49cjmg1lxnoq8rdwrvxtkka4wi3y9k2oiiea3k39uzplnbqc8hwdl14pk8e4jeumvsarutqfdt0q7resw0c62ofoxr3grxdskcly2gf3ibpyqnu6lvwe2vmnmaumkw',
                        component: '6y9aszeapqomlt3pa6b9c2vub7zciotp52v67gelbnzrhiez87lvlp8nb26ijnz1wsqoe1fm6z9vuezev2m3693umbmxv3qtodqoa7791dm6kojrmeide1gbxy6raym74fqiide5a4khm66nzcjfrxq6jmzzht6f',
                        name: 'j17latp46xcgc9wmvrot0uin0gplo1rz1wecqtzto761tzrtcamuhvt6ztekwsr3bkframmv3f3yr7g7tbddij88wvfqcq6l2y8amja4406oeqli7h5z1nmr399c5vo5cdnjqupfn2eho9fkk511kzjk5wry49cc',
                        flowHash: 'a41u0a9oqqv13nr013azg6k406l9h8oswp1bn7bi',
                        flowParty: 'bsjj8zdmtks4sfwsovd9i1hfi1q0a2ifi9qc7nwv3u3r8zpkl0a22lvm8tmwghhedsza09is9h2g5dliuaji003jts6l9wxee3znwwqjqkwxuquqij9zm4wb8t1djabiogal17p270i6ssu3zw5vsnnijykg79k4',
                        flowReceiverParty: 'iruvi7j42u7ohb9ug0qrh1fzt47cl5zazpdcf91hm6x6ynl7cih1ss53ihfdkozbsmyet1kkwe8c36d7iobgfz7hrry00aqe71zb4x02rr21tf7gtynhpsiio7b3rdlfe0ulzm37gmery08yb6anog5s8c73blyy',
                        flowComponent: 'b16iqr27d6n2i8v2nse0bkuii6w41wseb29115fg4fgn7rivw9g9sempy4k6pqp23xmnex3btkrzfoy1kkys0wdx9hsu0jv94ou78mf4sri1xfpctzpsz2r5grd03jtnrba0zyrvosgpz2dd5bd5zj64atybqijc',
                        flowReceiverComponent: 'm54um6whifa3bxsd1m86xw7149ksw242p48vd2xa7oz8yj9dhdzfc3g7ko09nj6x70x0t0lz498eg13zfnqktx30p81n9e7amseb7jmhjdkyaxyo3fbco7y1xy7r47jb79ylf6x35z26q1pmmldb4qrbpqufoibf',
                        flowInterfaceName: 'c43swnboxt5h15wicy14ciujogodab0d2oe61q3un0k42qd6dxx3217v6huouzqmqqxlvhnwnunnril300gng4f6erkkv0qxfodpsmlctf8vwmbz1jqrqjwbaa0t0myskfayop3z7wycifhdbdwnnuxm4jhgn1rk',
                        flowInterfaceNamespace: '1lytcrkk63h2jk7tlb05hfbjopqog0x9r100wcek6j55qshsr3r91xudh36ml1eo7oe5cuwkd8mo4c6b2fryspuiilrgryg85ds2q70a8vizrjaiebzqyarvrkldp1talnol05u9qgiqay4w1n0aa14bxoykr98l',
                        version: '5o01d8t3ywm87nvx0w7t',
                        adapterType: 'woau0rgthg0ldkl2ndy9pru8hwywtgnewog1smc1pnswf18kkq4qhbzglfek',
                        direction: 'RECEIVER',
                        transportProtocol: 'qr4iii1x9s7w4q2fduozzq7y8ei3m743tg1rgnanu949sw6htgvqaosal080',
                        messageProtocol: '58ao0sueujrwcydbzpmfkv7lvdafqr6e8n8gewierdjbb6ev1dmhii4i3vbh',
                        adapterEngineName: 'bm66g4by1hn8f9nhcgcacm8i1p7zxj9yos80g17upqb6fj9pn4l2qarxm916if90paq3gjmqmdcu89xc4ko7sl98463zn23d48e41qz9neea4ov3j5w2wfu59azemfir3awgmq0yxla34y2cfbju0pvkxwysez5t',
                        url: 'drovys2oagiq976sc37cj3n3c2hy054zq256rgy9jjb9u260ie1naaml86or3k0vuiuwim6y5o4wsp81ptwqn5chtwlen5uhqzlndl62zim85ccz6awz6hs4bto4vvmkwfsmx9jmo8qwgtc5bm6y5k60q6iyw4r685lbb0sow7lxzjq39h6o4uuozzlerpstsqpzzsg7w8iy2nqurzz4i4bfm857bg0tn77woalgglhjmov4ma73g0idewef0vwgf2pl4k3u09w2qc87tcn3gd9q51wohpp649nzbehxgqzy9qkljdisjdufx8bty22f',
                        username: '6d8k7ph1rgc2zh2664p302joqvb1uj9f36qq3n8x3vwvva07ecqou2v6f2vd',
                        remoteHost: 'hkvqiiaac7dghcv49wv1lir47hha5xcau18ytvr52c3zbu6fpksjrycefjxcpih2lgi50fhfvzn59jdurqrpggydbc24oqdi5ao4wqw78hbwhycctdvdw803ekpngltni0lx85w98q33inio9i2rze4ga7rv15h9',
                        remotePort: 9346931971,
                        directory: 'o4klc2tolzt35unf4e87oizryl7dytpfzd0tqjyek7dhutdm9gj2600y97tkbvnjdfay4d7olp8gb8zuj5srxqe0erquzecgycpwleejhkgf9hi34o0oti3vgc91ct4aum4dlrl6j6gyf7hc3yfigjmrgcqdwqtzovvlgzf0h4gv8be844a340kpjogfftlyh7txbng6n1r62i1la0osipd2ltvvyvb5jwmrefru6a5jrpiy7g7zue9xq2doaoanb5xjn5w3vrpgqpr7dc8mv65wpo2nnpenwlmenajvgg3e06kib7280z75gtgase3j9ln64lebayxgwual8tltbv5cma1svuflz6lb2wdpnrd9zntkwyk9uxroo9k2tzl2mourfobofw3ql43g4g8bi3yidrr4qgoikxwjnm9jlaa3bstpoe4t9jr16e9vvqzsoty6mivx56e9sku6xh26p7b5783o0l1opwoakiy97uvjnkk45ppe88uzwlfhrqilphuuynw3ms2nbo1ncqctj9jqo2ah0gau1ogjue0ucb7zcjjw7545ft3nh43yilffsfwb00rndvnkmw4e4nlod1jcn14ukeztvr7idoko81cv5r32c88hff25euw2s4kz5hji2stagam5cs4qoerdctz53xtzpzwh6xa6oj0vt185t9vt0d5sr55o97z7z3otncl6zf53ovjj70v259hghhx558js9eq6xszs41o9kjyha5v6rx1jnh9e70te1247giclzpl2suvurt1w3i6tgra3sgksf5ad0azlbdmyjavv4y202zlwehqd0gj66ukdgy0ed9ja12helq5ja35mpxmaxyy9tfqb1yym0w5obifwovpyyx27li9bi9axxh9a0cpmpyucs6dlzykl0vzmjasy1xwmlyizcyllt5w0w0qdaoxpzagpv8nvzwjm5nei49moxj6mkftqlsufu5v55ljssk313j7rrqk7t5ne61ufulji5wz283fbygo9pa40',
                        fileSchema: '47sqoa2xgrwulc30y7ouov8swbsyyvt28nr8wa83hvknxydkxahezvifzm7xqfeaeocw27k7aplpxto1gtmqhq1e5rc1bjx0fekug5vxguqiw636d4yj1mgohl36m5heyp0jivkb0zp1bj8zcxrecqs3ychqa2wx1s30lsaybnhgpg2wh1twlwhkj7zsd7tdgsyjrr8r0uhdruec8kisawrt3c055yxf0k5ryq2dtrqzsytm0bkuydnxmxwtp324qv3wyjgod73k2m24rmftgbk4gkt2lr1lf6qujw10hyylfieq2hqc9eqhldhgofu110nf1ctb21l8mkot1ogjfutj5y08auzbl9noys4m4uk1r1fqpkf2gonk5gg0u8awqvdhn3xiq9f95jd059mjxlx9lfgouvkzeugfriyvhzaq0h1l0u0gyl3jlh0xtt5ipw2bh403bhppiqprx37v6nj1a96xd9r1do8mh57ymmhbuf7ui6lmtb7ktwj8wc7zwyf5eo6dflf4hb74ow7tyi1jnhv5smwx84d56u5lluemc14dx2j8ub6pls5d34efk0q6lpyczsz2za8q3ek3douk8bhhy69q5kd3yl10wls2y3ztt82crjwyshydu0tynkpxidi3kjc377myx5qe43qa33faaelivk54vwv1v4ik9u5f6hp0kw1exjoyxvde8ga4xi9xw4kr98krb2uhild116x029lrc3dcguwkf6wlrgwg1pg0433uxmrvn31coq5w8nz41td4nrzjtvhg7uk6bcj1b8xwiebr393mkx7iwwlk7kjajh7qov2ys9fcx4bq7kk7luysw7az8oans0i5ytj8ktanrmjcbbmp2azxewdwo6mq3i4y74q9fvrwd542105dvgs54i42vswlw131t660rn9ykpmpms4yt5be8b44qxqwg2stgz9mvcktei44k8h0st2lwl3fifxnq5i15bkhntt2es02fy7ych29beawr97jgj75w8sygyqz',
                        proxyHost: 'w2g1wp9wj6pqj1ccnpeiq05vajkrnk22w1jjafuj62tf7mozol9kd7rk3dc8',
                        proxyPort: 9209660614,
                        destination: 'izqm9znoewvgkw6zdjcdhbeib1fpopfuirwnfvv20r4m0zchcd5ln4iwksw6ca7qmkfojh5u5stu1mw4dhbkyqk458rzdetpsev0tlqt60byixsmrwik2xvzchwi1jismltacp9vjsag7zfyvvwj6jsu81fvwork',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'tz7qrvizshtprkuzly6hvmqdcqas4y2t9qu20mu19qo7uz0hij7wstupekb27f636cralugaunufawoha6kw1hif46v0zjbdfqcfk7rlr6cab9ggie0pylefenht3z207brk7s8084sxsnjrm7woyzfn78y853jm',
                        responsibleUserAccountName: 'bp01dy7rlozh91bf8i00',
                        lastChangeUserAccount: 'l60sco75grjmck47koti',
                        lastChangedAt: '2020-11-05 23:28:26',
                        riInterfaceName: 'nnwog3jj5ww9os2mr7sjbz4zfqirzn2tmik4m5x8pxw7w80b8yt0eu82mxs947y8akblgdvfezb3y60jcedbrva5qdryb7482dnmxeclqa0szhsosdl35z4a825eu4wxb801fketmgdx7wwz42a0eg72iwhi25g0',
                        riInterfaceNamespace: '7124b5bmz3ryehl0e2bwduqh94lkrd8bwvle98bdjiepxwb1bfzxki17a76xdxjquewc0l0z30zcdxwuy33o0ozsfzg4cnvh77pxvljvdi0yo9hupmjudob434mcrc7ds7dymk27w31wjbpout0tgr3i52mqzkmw',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('594fd1d2-4836-4f2c-a615-cb57de277431');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0b1929ed-1c32-4caa-9c63-aec9e0702c45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '594fd1d2-4836-4f2c-a615-cb57de277431'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('594fd1d2-4836-4f2c-a615-cb57de277431');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});