import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'gi3kasijuck909ee473y23syclojldb257udykhjqzyictdvah662kwn0m8qhhpsc6jrdu2hjw82hz5tr6lxtlvz37dllzy5kja3fguefcrsx26x0xk1b9hzagibvp9t4ncunidrprld9tx4tgo5w7aawnlmr6x0',
                component: 'tisuu0mlort1vf78xksc1o3bs370jmkiete2ib9lhdkgad3uzarc98cpo5sximx405z5o2r9tx3802b5ytd82p1bc733n6df9m225sys41kf5vupem0es7zgb9teydnluylq0owsjm5kdvp89vkruxnic0rsfzll',
                name: '7100pkqz17rvo9kaj4e0l4maa3b0q5f41tl0b82cy21g8f43x5w9suhsrt2globlj2dl4ak9fx95afgut30kwm0wjz2myxc8blrr3ri7a6hxvdt3szv3krzrifak72rhp88d09vi165rni8ut9gxz20z916vd1hu',
                flowParty: 'an7g4hp9sxo17taby2mu09usinoczugognw51at6ebxsj11fn05u1hc5m9qrgep7fcbgh8j3o7a3gk4k9ikrv7993lv5fvobsu5phz3jwbvj0hdysxoso6uahuu2ouy6q7z9opf06uj8kxbkuqdobuc0g4ilvllu',
                flowComponent: 'qwfjth5i8a5isvxwjpqwmpfzgsf8zgts40qme9rksvmfmdzhf23s3m1wky4qgy9hnh5nvk5z3w4aavivrfhpen8v3aqztqgrbaedqaxvseibqq5n9w02dbl431em389bf6eetxttvj6m5wruvzc9krud39gv9q74',
                flowInterfaceName: 'l0kpbue4q83mwy96m5jzfuromic852azfsn8he5tstv4juk1dcaqzgbbsradv8p9nutqh0dppcqci965cho9iifiwoi3v9cjaupu98kuafg3mi1opuf2bjkapwv2k4ee4p0hwjiqb86jf87uuldz71be2lrmvrvs',
                flowInterfaceNamespace: 'bjd3luvrmyf3zswtvjn3c300fx7bibxrvsvjolwpwu19zoleukq6rdyl5zgpp2zu7uvkapbqux8sb6pl51vjb6rb3gjxifdse8oypdzb22y416558uvqa3732898my07zrn6dfgiml387yw872etxfxoolboska1',
                adapterType: 'qiv9p0y1le7umznyzo68ekzimjduu4bstiaerc9cx5y36jqx62eapeau9rcu',
                direction: 'RECEIVER',
                transportProtocol: 'mrknvh3t4qqoc4k1cw8obm5sguwz12e5jwwuecrw164zrp7c2tfrffjpq28k',
                messageProtocol: '8sefdxuhs7xyobxsa9kaxdcpm3ajxx26dyc81a49gvhzv3flab26sublkk0s',
                adapterEngineName: '2m55yyh28v367gws4301lc39goewsxlrcjotlylzdccg511k09qf4dujnrpvgvqp92r28n4h17c3lr1nwjadbo6yppxmz3kbj8ft5n5ysom66i84dszsio13tg1lqkznctsi40z4oubu7452j63dalm74b82ugkq',
                url: 'flah5npesn9hzj1oguez9lof6nhk21f1pa1vue4v9rx4c75n5wupbifrbpqm5rnzd6lt7t2av5y3ruh86q0n6ej2xbru3wj2sjkm7ms4fh3e15beeikg210w17hfntcnfeughl2zvecy4ipcyw41bsaokwplupu0eg9zrtu5js6m86xz08nxxupe6xjbndq1kjl1nr6t2lmytlcyidii8g0z3mdictq291m0zv8u20r15vs4why70g0qtrm11fy0etlcuxrhp68pgigmylby62aromjz1wjvjbspu2fphzgrdcv8wj1xfpm2synn94or',
                username: 'jy60vpqtax2tsc7h092q08qfg165g2egb1ahys7yf7g3p8vq0hrb4te02wwc',
                remoteHost: '6m2c354fycq1wcevkci4zcl5zmnummj1v4ooyxv7ub44tzmu1j3pvfraywz8y6x4sqpx8wkb6by0lvncjqqcgezjcufnig3pec57xpsb795opk2beeuv7377gapjb5ao6zjb78cjtekw9y46m9z6wtf9qtvbvz4e',
                remotePort: 4814463358,
                directory: 'mszkv76wml5vpacf085i1w3jht7t86ddpyex1z27d3ehqgz3r0kf0zcsyf1596taouy4jx1lq7q8vehp3ncng6zm6alz8sq6bk5484v81nx6iudgo5y6z5xy8amuiqrxefonl44e5nw4rtzqjqs7qd1sp12vp93fucpj721zn6m47x67xa19p2ug46orsvujm9co3t2vjm29r4spiulibgr2kcj17qmcgkq7sczzm80o2imd8nxq0ht4iupgunkj20h431qwwru28xm6jr4rha9ypfz67tl377ieicujx9f0hsil0b0ms5mzbq124ahwtip0z0ocnrbw8e8d9bouner9066jrdj3ixhrq117o0f8c8ovskexvbazd4s7pgkax2owx3f5zwbskqixoeq3e4srg3nhli530sxit94a2bxnw0x0yk8ibz4m8sj6e0cjntj9zs7upszf2y8lw5r55a1474evlwjbflpow2ogu0ujgtxzeh9gu8wsliwp7a7hj8f9xwyag68vtmizea004wzsg9n1q7txeeaaua4soz7o2x3rlq7cm5su3n0wlbik9k5n4oiway6r0gb2ymmfm6myhjfk2ygpapw8gxk30zlutza6ecr41hkfhg9hbb3n48xjq713k0sx7u5ztf6a760v5l9hishsn1z8z5dg18mc3ynjcgnurtbo1eiv61raeini9nqmpncb6oyqqmqvrtkgn4wb4y3g6fo430g14cc8ru9cuzf6dw93fhw4qd31798azv7pfdoxibhvf6a2sortju7hkzodnvd978sqlgwpu7qdmnbo37yuwd2vhwypw9fighhzlaua5cob18ughjmkusfmkd0smvuhqsxo3iudanondoc96csu4ey3h299bjb0u94gf4aq0dni2h4oo59ib2bt50bwfkdus3pou5jgztnz22a13ca3o443gfmme3q290i85g6xh111o20ece4ovjh35jea2q0jyk6teu0nze41u71mxx6zc87icu2y',
                fileSchema: 'vj934pdd8clqi5mllhy0tco9e9n295agkv8ddvmudk7abq9tyb708gb9pu7gp45lw4ntvlbem6kpj0gmxlh8ay7wnj4emnh011pnnp1znqg04cxizssl39ds5okd0yps69rcfa6im94t7wav24ert3fhgtk6mgpe5cfhnhsdnu0frt9vtq0t3y8bby9n2qte4erl9wgfj27dobpghg6wwi9xmvnj8eq57liyy1788k5uxiagyatid9lm12ssddhp6xc3c1blbpeb8rjey63djdhy47m0f0udkvfg0qbmrin7xy652opgelo17npjx698e4jykenfkb270n9ct49k09mvn0vmlyqljkyqi23x7yimvwiagjxl1xmsgnn1f9jwdmcd5fo8pa6hs31fqpq8bfndq7ufwq87tsdf8129h6675e7dk1l7lh128gjz8e506i46zmusi1ig38dyu7msciwqzweesrudeleisvmsdeybflksvg6tycif2oiuq2buxofcjd4pvkq1a89ke8gwzwv6c74gyc3fsj9h4pkmfp0hvas0qfmzc4iofrd0621r276yhsbqhzh2h0auu1n0ke7ojc1w84cirv3324ch8e18uaq64wd7kn3j1tan4jyly7qdqym5b9i5dulazybkkxsvbvg3o6yt3dvpmr6rt9bv1gfthhsq09ve8ja9qoj8uxgtoff0eb199k1sl07iko3524otgrdx640bxoazgbohq8oygh8j49pvmlvgfx7gmmffnobtj34g796rxlp8jltsekxdwxqotyh0lyhgh2sd1a5wgnhf4gx0etilbcmc0191ywrigfgeg9u6jo4hbnrzscwzpqbik50tbd9va5nev5zlk23tntggg04lwd9i09efzhq8rpwie5gugeiij0jtyn854ybslaa0eixec5ki0zdr6shfzok8umdngnb38wzfa8rqyvesrrhfnp8copv130kzsgfc5zvo32kl7qjwzgi9pwg29yh39wf6toel',
                proxyHost: 'xvyuad0vg3pqisrukhqdk587c3cp80k57zyg120dct6godzdfv0z7efjvod3',
                proxyPort: 1559290253,
                destination: 'ryn7v7lz2bxe52kwbgzmp2sgp5lb1z26rrb2zf09cojj1y77r4b3o35fjqbulk37x6kliq076naq6z92wj7jb5vmbyob16sfczysyabjb83zoipw3dvc20o3a6ndc9sc7ecbfnkjcvkv7nz6aobevey6g0u1a9e6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ke4lhqjpkgemvwbkdi2txe1wpel902rxe3ae40ea7femn3e4zfji11q6avagho6qpfn6v43p8y86ed8k92tesg4twzsjkabipfe6ylg7tq8crr93qgii4ama4wpn9ujbubd1qb6ji1gcsv1bkfxk9y04k4cs7nnt',
                responsibleUserAccountName: 'cm8rpeibb4vdwtkevays',
                lastChangeUserAccount: 'ftaqnpkclretmqbxgup8',
                lastChangedAt: '2020-07-21 15:08:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'pfdno79gh003101zo5y8gpycrhc2zegkfftlxtie4vayk1en4j9347gbekxx2rg7s5wv09fawdkakbax8cnd2u6wqp6kvama9eb9vi9jscirlusjpcdv0rjz3oqhl1pwf6vrhxfs08xfuh8b9w4uqpcx2rks7we9',
                component: '1dxldai0b013io9cf2j96g9u4w61v2jx2aq9d7w339krf2o2ww60z41qex8ewhzphzz47u50cke6qyflqmttgssmvfyjzojtjx4gdgkh1kfjt3kh5bp09rpr6y7etm745w0glzt3p7t7tkzwp7en2xjowroa482i',
                name: 'oqqax804p50alnnmjfhuae5sqjngmwgf500ui95hsrdg54zoy7f2v4s3cpnurq0jnmibkyrkrs518rceejnz54ales2exzw2sb24a6it7nw9g8fcfig5mx5c6cdakywsh0b3tdpboouxm79j3dg99v5h0vtvj2rd',
                flowParty: 'gmruhjv225twcoexinb60corbsekvpxj6234m2kj9old1kud16tianrtr26xlsi71s7dmh38dimhj50fv8kk0rx9ho592c8kdxdjwna6qhkkje2o0585ptviyjbgzr8vnxv1ez0l7ono4ju75yh3y4xbcqvjmf5q',
                flowComponent: '4iwr3wsmyjk4y0auszo1mr3gw0rmqagbusesde9nktgbmnsdsajt7tksjohkftagjzwgw4dsz8kf177drqbigvb9dex1alkrb7uf89kejkd7lqb7rkbp4c10u9oidh3a87say9b3modd2rjjp1rmuiwm5ppaauez',
                flowInterfaceName: 'm2d1fmysu4tojap1987onvpsfwbtl2dw8vrbppel9fwmwyg2wlht0dxha9szug0ho89gw14pj07dcqxyio4z2gw8pxd62yzm684tnlv6b2qlw0ehussdpo5mo0r87h5ab0j2ll9hs4bxd08a3rznkzqha27ppces',
                flowInterfaceNamespace: '7lq50d6bo67dmn1ipg2n7x6w0plcqqgsb2nac2i86pl3nu9jexr4qh9dg3u301x0c83wr85a4435w6cfskpm15v7i8sm90p5a4qhupx1cmyldjryhec77kz4acgafljccprkjaa0qy0m7cwe54i1jzfocrkf50qk',
                adapterType: 'g2sp027wcci9bowb0sj6ddbzeyvhagt016b8dauod0sxw5wtvkxew5xo8gow',
                direction: 'RECEIVER',
                transportProtocol: 'ocytawghe3d7foe5jjrl54f9jff34sn9ju87njiwc83tmpb63mymmo180smm',
                messageProtocol: 'g7ao6rvmxekgebgr8ivjmjlind167dciv6ucfjzulnda87q845jf6f0g1fhv',
                adapterEngineName: 'hozhauq9kx2t1heb5gz6recgkooy12bown2z19y7lp0vtoqf6lqd5hzagrbrkp5vg3kz1faqjbawdeld0ne5lz6j5zhyhodemsyci6fr20wzrmazbv5s1q9tv73popob00o4iow1nwbbhsfn44wcfic3cuff5vlp',
                url: '0go07ucir3k3rpkqn0xdx2wcqx3zhn1s509gr54zi14znps0xuod8vdvhk07v6b143dmy96qd2u919p1d1f8vvrvplhea7n2hf8miqeqilmryoglm3um865es81uhx4kn5vwgeary1t91ojv9knbi977xgkzezgntzv652mcq8zi23t4scyggpyquhjwo8nejvd77r736jk1qhqw7bv6l48q9oyqtp1gf8nzlnq6w8e5k2yzclx817wl39mv9r2sikyn6cyyqxu76b22cynrk7c0d95wmcyhhne5q65pn19gch79dbjul4ay7dnniora',
                username: 'u61vudbbyz2crcfa5nmy993f1coxdtd0fqixgxu86uzrrgfcf0zudnn0tbhj',
                remoteHost: 'bzr8q7qtbr5ko4ltac8owl63w71no5r8qpzn9fw4vb5dlgkkad88jcpttzfrjoaue0gdsps6apqhpyn12vqrlpd34ng8xgc82t5xkobcfqct7g9tt57varw3upw8s2bp5kqib4v3buyhqudrpvcybvc0o0uo28b2',
                remotePort: 5578824936,
                directory: 'xo5kdbc8wl3txyiwc3dfpyt0do9b90n3udczzy8i61p4kfsju2udo1cn9pz8rmmtbrh8yd87opr90d8fw9usu8v3j6rb5wscwthq2pzb7jfjr1jpts6c0ipgsspo7tqo5ytg7k01t8h0d23b3nxeqkud6r7133wss4mm0id8z7mzxcohtgac3o3th1jbmlmp2nk1sh6zd01oewpcn4e4biwloyoy568635hb23rhcwz2qtj0aytfkui1a8r9tl69rdsva01e5wju0y3dscr5zkcm0o444x5yybpzit0b96hzbbxxni4ttrn47vnfwpq5cr2ettfnepylu0qby6g7en4z2uxj465kqieglejin0ed8u934whyhhk0gsvo88iz43btimhjqmo2o1na5ihlnqy5vqkie42js4o1sha38lls4zsuq721n1giimg0vbix5rrlgdq80q7sguc2mgdyx8evplcmqwkqqkwnps33pnqnsjwstf9chrudvtbp34i5ey8qifye3hn3glw2u6ycqvyol4y6nj4rm263i3aliqrp2vi4f6uduvpb6d5sdue51rgghx99xupu9qekol4x23pqgatfdoz42explfw5bgh996e6jvva9bei4tpk8v9x0kpreguoxedvr1h7ngrggc6h3ucp2gak3qg8lbuusuihthriwnw7i03l64gdfsv9uwh2naoj7dz7km1jai34m1ss16r2ll113hw992siypr57v5w71ikj9ghnp0ic2t9slocqgw8fggublyku93c671htcnntexrt7bzo93c9qubykums48l271paigwvla5hoif65lnpps13mf89ar3jrb0b35zadhz5e9xlf9rskjmoxjx1debggvx8unrjcigqje6dwzie1rgqektsv0ww10iwthl8a0dtyxu96jcfra0d5kxooq5k601mw7fuzlbd04a9l90ugf9ojjqqd8gxxyqn4vq4t3pucf0wtj0eh97ed36pk8gmvetfawbyti4',
                fileSchema: '9ls7a4sadj0cqn3jgs8gn479r6phtprmdge8hlzaaca96754gkuh5gd3xno4x8c38jqzvxdprek3hby58xtt6uxjh7qmf2k4vasfbk5o32j76j39qky97geyu76kgooik3okd3vqqvdwqktpguiy970ju4qwdtqb93h826n1zb9ckkyqofnhp7sx5vfioy1r8hffpo4d1f7e4z3mvz47ymaplyjqik524fz29qsggwim65ka4y16wo56wbb346h0d2hg5adqy9cuvn7839pq9cuwb4ktkkv9etz47f3oy9g4z5fpbm9vxqwcpj331oqaewvee5k6yjcqbaz9ib7dm9phmrrwz35d8k1ijtj3yln5hni16n37022hx1cbsqsbcex2x39qigxmcb70xtoy0ap04q1duzoe6dnswa43fz4lhz2h3xz0i069a457l4vgkszsbm142mr1ohzu9zuo306cwbi4i2cnqxsydtucpzmotulmy4x18rxnxh0do51wtz78vcr0i35vz6gp9nu7g77sj5hqos1n6ifc9xmhcd0d8wnuhmxlpxa66ayievqvc1voxqhbheaq2lblsrsi8p6k2jyv2pj24epbxohf2ad1g65fkl64j2tu32aesw6nugbh1j9ytykei96d5ihkcki37e7m9oa7pijry9cpz715jerg3k3rgmmvj5mh2ke1455suqjpjvvv50e9cuektkqioe6fhnj2iv0jf1395oa6vin2amxbdvqyx26zvdjct9qu8riijcpoc8p4n99349047nsnh83q3x7ic83tvpijql36wouyrjes0ko6u7ry08jyyndonp0ukvsjtykjlvxm31q4jzf5prbqx4696xbf379hlepwchz6dwrt0k3596a9golpvfdzqf540a0t9uimbbzrwyny9zc469ohywl15n8etw5wprf48v236uty7i3sottibv9otja8kibifpk45w6xx2uxfc6kbwufsyqtaf2u6l6lusuyjxuxagjs',
                proxyHost: 'k4dam5jkmg2it56crkv0tyk8ijgknmk84lto9helqsfwdl5t9fi7qc57z393',
                proxyPort: 9349950859,
                destination: 'rf3tctn563ixn8ej5z1xiafae32nuc1ng4p42dnz5rsb810g0quedezusjhwf44y6ekvnmzelv8hjmgcto84siquzgnjiaqlrho4iq7i7nv0bsmei49r5f30gxe1kwjp6jv2mgt74a3ra0zbnui6j08xpu1q86u3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dlgwxu3twqzkhs86oldtrjgdhjx4mca6ztnbcii7wfwlr2wtkbdchiv8dqsgpo0ha720bo7ry18o0rpuv50fn4zcxiqvz06lp8w40oobyw01v51ic9sk2a8sm5zblr50wfaxd3270djark4vljfmxl17ihzlz3tg',
                responsibleUserAccountName: 'jy4a58nrq7idhch7ctj3',
                lastChangeUserAccount: 'hbqtvlvrj76c1niuj6p6',
                lastChangedAt: '2020-07-21 20:12:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: null,
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'rpvoihlcqqxnguyy9u0mrww38i1tsvxwjcsrxx9x5phk9dnn7p9zjs9ylq041jmq9cczmcpc8olscnad1ev0ptv1xk6daflo3yfpynk5suf3q9bwtox26avpdsj3f8x6jfu7ikt07a7922o2fpzpc5dawoe2l2wd',
                component: '44iv51sd09i1hqmzld6up9biha28gv3wjdn6x46oj14erh46sfv90oxh22xcnob1xwqns04agp02948mesvmsuoh8scpd03qg2lg4ln8ei2wqrwlhmwu636nz1vpkpq7q8hisc62b0kzjmttjnxfj8rtxs2q5qm9',
                name: '686n6i2bexfqpr0sex3lqwwcz57pp0pk10pol2wicsxcg71o86x2mb9f8w5jg8lhwqruromb89us07o0423w69waesy5pybiadc6tdux6n4zai1b0qhusfhl1du18dzqhjmwckvdt404ut5q4iv7uuswasn8lx6x',
                flowParty: 'mhkdiwjss2pgs8owyyhr8yavanffvjxfkmliamvdky7zz4jed70bkd5pyurauxajfqoj78js0za8zdckq77yu7abngf7avyok4i1bx2s3dq7wy1v9h3rcn0t0y7gtse2zvnkq9iqq4vqvx7gqyl2iyvpjxzavy72',
                flowComponent: '1yeonc63oqztrajb1hz5rb2yaon9scoq7gdkg2p8bhd6asdcqwfy6yajrbrlbrsi4fyde8f09i9vph45f6z08h98mu2yzv2nqfjn6mi9itcse77vd7x86kdf2xf3ej25gn4ola1gj42d1kxxq4znebl98c98kodi',
                flowInterfaceName: 's6apr07g2v9tmuq73bi8q13u976pdp8ycso5g9idn74ssj9m0afnq5fn3g1i5yrr83sr1s40178kq4bg0urdd7mdnof0a91wfkkpe70rgo32knmvlijj0lab09fdtmwm32reez7sobk8wrzxq18wlln95r8okkhz',
                flowInterfaceNamespace: 'd7n0m7swynl0q648b581sx0y67r9c6mqrl66fdz5hf3znxugikvwwjjajpb52p2qabz3airov3jzwy3w5mwyd7yo0p51k94sr0pn91255slok4rxhrwaj8bm7lrj81f3my3tgsplsk261fz8gumgoagzc6np6e59',
                adapterType: '3wv5bx2cy1z9ze6vm6t2h90hdtmrvlvfpnd437eq8ml8cbtouwc6224duisn',
                direction: 'SENDER',
                transportProtocol: 'k4c1yv4sohnqnsuq220c0gdu8ypkotclrxywicdpizam56fiu4t4zsdlgnhf',
                messageProtocol: 'z3el6mzuaydq0pfruqrhsjpea4kiupmc1wucthqmsbvox85k8aj6zfebn7rc',
                adapterEngineName: 'jfok762fvidymj88fxexg75nikc6h44w9qh19jbus28n5e5hrakycnwufxt8z5c5ew0z0tid784nup7i7q2o11x6fgduad6hjfgsil0ewdk05lao02j52kek0pjqkrzoy2224lpuyo5bc1arneko338p6edb0z88',
                url: 'kw6ttpkn97wrtfz1zcxez5u8lp8phhs1jsoo4lxtb3oyry0fvi3kshbhjkzioibtcqdm3qyksrvfhr04rpo5kgw3eszgynmg9ldirt3bri0kern12dnkxmhm7hox9h9w7yfksqbhig86jgz5m95pe2q6683tqljkiuzgl66clhvuuhox1fa715y8tgeu15056ciddwtsdrk367u15ytoa4d1y5h1neddov1i4j424kqizblkafym1zuqwng9dw2s6jvoibl4fyzcdt8ruzjq7ra208wsa3agqsgv5v65oco2zg0ner1e0thxkzxlic9g',
                username: 'il0h9momp39drrcw9met2qrnkhb1897ddq52kvib5pvppe087f3w8nt7m7wf',
                remoteHost: '3x0a6ad0sp1y0zz3ca886e4yfm77tzhts2s3uyxh1esgvrl27f2o6fz2x5g0fd7xbpr84rnyp4yxwz881f8jbw4grkgz4dtdt5tfcv6cie3wxjfqn48jrojjve0hzlxdzoemn2gxwiyd4kg90yabh0lmlg52687f',
                remotePort: 1414764559,
                directory: 'fbl5s1z4ni3s556pm1f162vccg3cp3f8vmja9r1uqoclqlxi4tijfc8km5syp5l1q3y6xfv28yly4op3eiq05jp4gwnjy4jowdsr7kcwvgcpl57jqu3c197a9hqrme4kemlxyc65l14i1lq5a1dxyj18n3i515d0td5x5jqr8hd6iv0tnsp9w5x6u8ksbrdysoe6chwyifthq8bhh2vt9tvpj8zfj5oaamt322xlsfxzz5c17zggregsizb82cgnwx5algcl35nu3r70hqcjg8w88ear51k9yz7a05r6lqxlmm0e64jh26zzt6btcbiomzx9ia2cp34lw8msw9dttybcs6li1itc1wsclufixbz6bpuvkdzboee2um5g9wvqud1e3k9mv6dteeey7k8c3u1c1w1jsg5i7yzja24kushkohirhmbvuuybtx5dhfc4c2vh1znb3a8j998ig1sxh02u3o5iytxd4aqtv5t19epbwr6n7swpjdha24ctdoi94tzwraiqzep9alrxp3sysidl7o3yo3983wvpi3cplqpsqirx89o1yze3iq7xyxcq3xhmznum6skj32zb3uzar2ki5oc9tg2oi7ka1bc7wopfbu25qv42vsy8ck1pbmsoapjhjwxbs05spsrowlwb57akph9dgz7ad9mf5m0wnk4u8yld87csee30s91eldcuobfnjwu6cqqsfj7e3pkenv33671crnk2d2o6gnvqg2nl7z6ojga5g9ekrrs44z26yhixqxwup82ta4upqliredjlzw292i773dsnbag48mlana95fczdk4rhcrapiupy88lzgvts1j0y06bdauidu7mcpm8cosu7t9tdwl5cx7e8q9bb5ceei90wsgopr4ca5h5q6mtmz3p2646xnlriqixjguup1ppgwrq1cdw1fy9ly31y1blix8ps54rthwqnhp56oa3nqwzb9ea5b4xglp75tqdqy54bubprp82lvwb5mli3lmcj4peic0g93syn',
                fileSchema: '02r9j3nq126pubw6fwjigorfarabo07a0x63u4cso7ye50sakokpiexp1slc54f197w233cqaamtiqk7rw29lm0raj4o6ha8dfhpdmm8l37x33a0u7fvnisvh73bvmzhkyyyurdbuxu27ma7no83kbdu5q10g73ioufr60kz011tndachy5iow6pogagq747kwemsnxyeo4jy4vhcbbbj9lnbns14rhbfqkkm8o8yh6lyudjvhcuo8ismubdjgswcnd00f5p4h4y7hgrgjgovrzn7cvs1i7jj62x0uxadqepv3lueallow0fbvo4dg1dicltrtvlj51rm3mccozlcdxegv55iln24xi6y4739p32f0enmuhgndhr8tntuxqnwmlrl9u8answmh6e2f9d8jv62jrt3yk6gmrfc2y6l5k177ur9e90rpjys26yawsz7grj7deshdo8uo91elibl80ei4pyoa211p9mx8pc24jfkfrhx4av2jfuukknd3151m5gppd6etor8su1rxtr6dokin4nqxdr94y8lwltjh97fsevxp7mo84sl80lnnoyi9qg1yygye28l0me474eelxyf6gde458b9d0an5ow2vgm2v14z1cip2arjaxwtc1ahdk2gyt9kjavtzrt2reiiuyqmmv7movntgzoclcgx4kve05r3ee3tlwb5yejj8990vni48qq675r3p4jz23165ydtrwbl1q18rx9owz822z5ri0qlnrqmk99hgqvn8y9b5ibpin96pob0r4nafz6t3t0lwue9xymw3c44y4ub0tnw2u2c5asg78tt6raeoem26n12sd6ko2ph8f18qmoymwv9qoq4pm2123ex8pylsrygwyih3auexb6kjql5k7m3rl3nsmv1aaekms9bg51dnx9ftnoiac5iq8t37nvjvunb3tllmvcuqqrz8akm9gijakfrwqgmvzqbpaknj21171n5xl8ldwqpnwzyo9vnyjz75xy1lchqhbjim92l4k',
                proxyHost: '3n91tolxa5tpgp1xyfalxsl4qce0bia27arir98dljr5h1baflwku952yjsp',
                proxyPort: 8676220530,
                destination: 'ncewd7qt26modzx32bnbf5625ru31pr2q4cc1x3vg175pxczdt70z7te0j61b673d374kdyyt5lyvgrhy2tm27obgjgp1fixo33xnjby12dtixsn7ik2ivlcn5k8tk206fuqax1y2xh85qgjxset15p0opgc2vro',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g3zg0lp7ubcxs5eg3qqtt7qsvn5ubirul4onvgm3aq8eeebq4cela93lo4ich5lrbrclibqhi22gn5w1kcscjozgnhm8ny20d65sj6qman3kums41hxw1nlprl3kbhlpv1k3esj3hf4mr4hbo12hdzjply9bkwq3',
                responsibleUserAccountName: 'gb7ifiil1xup2nf8ukxu',
                lastChangeUserAccount: 'pwtsycgb5zcxelknc5fa',
                lastChangedAt: '2020-07-21 18:48:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '7f61tadrl98mmaymgyih4zf9ygog6i3teb5domy6efy3ce6qs5wt5ni9632xz7qqxdmbzkyczmyyc8h57exw73xj6mzs2wcxysktycqnhaxznglqno7l5na5vvjewn090jtt78awy16zz8356wtn8cz2d1163jdp',
                component: '5zl4gk2nypmjbxloj2iupp3pap3gf2q0kjtqmp4mqwwa5pm8x14twyk964ejm69w9peqjmcl8b8bhxua2cz0ijvsnzfqhliixo5v2dthsm04dy3z22xjve7ctg5uds3ackkdff3d8j4bxt8i7jco6mj2mn721x7y',
                name: 'dl16tsb3rr92yxeyqibtobuhs0kmz45q8eji4pqanf69ogj0laj168mjz8oaq26kjf3cn0fj7230vcavj656g9j9zzwrvz5g2yiytk2uzftfosuyk3ryj9ayja1qcd6ui40zml6u8pci5ilsvvtkkinjdevsvpuo',
                flowParty: 'mgee2uw4c7fp3vnj98q28ohn1lhj0w71zqrp354wrpapznldo1g9brux3td0q6810e4qv2cfgqwp2pfo14bowrkaqk41i8rkidd6jt3h7nb3oygcbruy7g1zyuo27a8is3u6db2cxrlkg6owukzhkomgsxmpnf46',
                flowComponent: 'ca2t7gbozx3738wtcfcg7idntfda30jjdy3p1zmknhiqir4qao5cw80agpygcc9qt2vzsrhj69vefhovo6h075v9lkjvoq05n18lpb7itito918lmxdvr81e201qveqzxbk3cezgyjgum8sbl9gjz88xwpf0dih7',
                flowInterfaceName: 'fcf4aa6jks41mr5to4i4ab5o8f6wn2qglp60s2enhlzuwpc4sx8ttau1iqf083w4ci2nqe5l7kpf3rvau6rusdekuz1nfpyjnk865pi3jaqeilrjmpalcl05qu2kj5igid6li70vz031rlf62sfgdw1ifoq5c4a3',
                flowInterfaceNamespace: 'weux2j9flm5mg13jpwao4m0m1bfzvskw70oyouhc19nmx1hmc068bh5ku6vm2ulxpx0z2lzxxh2kua2k5iyjjqco1lvz4e8qkjc3ttxvotzd2yty1kzy8eexf9c21l90iyau240dhifdfohrwedsm9su8b4uxbzt',
                adapterType: '8yi8wdup0wga10k1a7tqcxkuzgkbmv9w97132rkhhxcvejuvirnght15w3lr',
                direction: 'RECEIVER',
                transportProtocol: 'x092iht03vzpnzfpx5d0dd9jxt1id9hra2w5zcrhvml5ezjk3mw6p94c3mzr',
                messageProtocol: 'wcz8txjuovlf2v7u0mak3y84snteuyvztfx7499a99whqseyn4av853j24yl',
                adapterEngineName: 'alqzw2tsg0xuqcc1fnxwr0khc5b4lm9wquq59viimq5b0x9daxytc0oj9fr8gvxhn3t5y7rr9v5rpbth45yj6b5srno2526qli6vb3dtxpt81yleg1ypvole552z9n25ahfjp9fpfear2faay8dqq1x30k06ao2o',
                url: 'jb859sm3qcuriaiuqrub9uv0blanxqybzbyusa13myq2tkob1abo15x5wqh00z9jf8iy2wy52u36o91u0f91pei156s36qmaunw7gaptnejsdmbkk2itw7pgkon821p5e06prv60kyfplrwo3rb9x7pumbjcnozkj79bvwkxxlx8f7gft47sylsbdw4cbaxg3482jxsunpdukjja0jvrny668pk08eviqlkgjikkvhr0js24jp4kq0futu8silpcu4wxl9hw8mp5k2mazhmzs584in0socxakkm1mywg4tcznphq6esoxq3paerprsml',
                username: 'wsx50n0m79ikaum0up4sgt6bv12vng9y6zrwy26gxz5ij9z0hlww4rgpppmk',
                remoteHost: 'h6l4oeiyc5p4kqjpyrnfw8w6g6oo2ng9ie886apizw6ekuceif9mo4a9trlddfz0ulolhh50ao5ymbqeopbu7u9zq2q352g76y6itzrkcvz6trelugrv84laao5l9finxylpp02tfsnkc9damy00b7mzh4z06uoj',
                remotePort: 1406452625,
                directory: '3k657nshmmitrktqjqgau4mgvfgjashhs8rbzw1ebs1luhe8t7ufe6gbovr293hw47sd9av4vd0b0s6uyoza5cprafuut1qq5m2s68he0g4f61sskvp4cvly8bsnvygjx4faob0qd8yqxbici478gwodtvpvd4xtw3ydytcfysbbfi3jzuof3r03xix9my4yr1jt27xq3gs38tsir4unh1w2baiig2i8qbuaivh3hjrm1bwc7ut1mnegqxpwwnr33jitekdbi3crbrm9d5w71dxxuutfxl9gkfax4hvvy2q7d22kt6eu7716fl3ryu5q58si0d1ijhqgxef0q3cfazw307ypq1egqb7glfx2qwzu1s6tlp5jlxi9chle0wwj5hump87vmjhi5fo77w07jm68d7jmuhrmvj1kopmqjyffgyntv2zbv9sskyax4dca24yb6ejwpf2rzm0zajifqo86dk8bho97cgx9le9x0ny12cz0dy1gn4t8jm1b3mpqgeonh0gzkviri0a6k9vz06flm1m7tbxr9bmirsze3860vjque7acoukwucn3buttwhm08kqbkl2op1n42ilt64il9o8nkb0ies2yhjyiczie4xprxbb4t7iorumaxw50c9uye1jipreds6k9fdlupyjdg4gt7t68rctjdqx2qqjzbyoas1rlwrla7cblprnqc6vkj38sxgzsej5q048jrunprhl3nn56j2om2lt6mf8r9oiq2l70xcql0068zwtp43xuhjhbwrcghmmrrcwiiy8lvur5d3o4wg7vnr56k8hhxpcnwk3cnpwei6ja05rg9ucto8i717qg5tyt0dbhyjr4uvylqkum51k1zpsk7j7lhggluxve66hmw51yzo2yz58q4jg7k3xlkcn5cy09adtn6zx98ns5awcu3xsfhopp8zqh9f1qr7sjnewlgxwmwyemtu96i64uly2o97t3u9g54afisjwxm2pp3dg8mesnlk5uwlcjcfpg3phm0pqf',
                fileSchema: 'z81xukvy5ruww6mpk803ccyynkjo43f7h3rmkfua4tdhn2nne4klau1o6vltgvu6frgbq16z6mzs3y1itjrahmvym9klkfegkmi706xzv445mlnoacxojf2e69jxb6ga0dks9jte9fce0x7eqo2nszgc5m7qgfi7j5e7vq16lwdgsvbqk71nojk0qxstoelrnzdlz5glc94gl56mkb4blmvu2t27advfws0bzfn4hca0z06hjk1433luc9bl5ktbg1auaciqm6idcs2hyjyy0344qhljrkeqplhxp4qdjn5bddoa5cohdpjznthxu6kpudbkxwwrr2pegy2s6rw67q1k7bkjv7ab6xa3zgtt19ja7dacr9rtl5ixtz86rpr6kvh2l61rayguhkcqx4rsylri3rprqzbg9k1jqtxdo5t7mpxupspzagesopqye9d0e8xr1jfptsk0x8yo26pdxs5g8ciot7bzy1p7h7e5jtajzubzy2le4dv3dn27hn6jqcscu21zzfufx3lpo3zra7nm9mpfkvkiyhb28d8fyrcwz1yoc7t99ir1vts9w4pihdbarosam8ltg47wsmttuq9kz8c5k08qfoumsw1pvaxjblm5ahhuobhd3f9vzbhmv48bpwc2ih6m47h9it3maefau2u0ni1oma782v3o15adf9iyczd2pbnv9sdsrneudziq7ys6szo4lrl9ut9mr3spvtvcw0llhxv3yebvistrr4cn03s78wv2lislxdz5vd5223p07pekqek4ukuaq7w9j6d7xwjz8w9i35pao4ca77ablcl26mbz2y8ovm6m1zqm2t7p9a7mylyhi6zw8lnjlfrxf8moek3a0izgrptqe5bww7ouwvyak4jkv2wdyxjvwkf9h4y0r8a4nv8pex93fyd7wd8iiij37h8k1c7azg4dwpfousopmh4v6hv2ynhh0j4t4sfjduavkczkncubasei9uidhk3xjl3x5pai9nkdha1z158or0gfv3z0',
                proxyHost: '8qo6v75dpkufogpr4xl8g5c6gizxal9v43e78ujaj3dakm9rxk7b39ygw2ek',
                proxyPort: 7257584112,
                destination: 'gkeqbop3xhdsvxxlw6j4c3ktkktklyg20md996ruay7gjhwaw5khd710napy9echcxlf9j552d0xmeoez5aw0iyal3m3urb89wwig1lh57jk9nnmr0xkkvzw9aocn1zhpua9qvjhmn1dftqrn5tdnxr616o9t8la',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yjmp08t8c71rfpjd3fxmkwcl2hfu5yjaeda8wfn24jzg1gy2qsl9qsfds7v1fsw0dyrvdvxnx8wm3u6wpdcwd9ihql94h8kemie4nv6ra367i3966fhgytrkdbdtfgeumndebx2jj56trp6y9au9zv7hs7pc864d',
                responsibleUserAccountName: 'zpfhbe03m9gd0etkzzh5',
                lastChangeUserAccount: 'nb26qci143d4caknyuaf',
                lastChangedAt: '2020-07-21 08:33:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: null,
                party: 'en5hpmlh1s1o5v50ohtsg3st9yg27br6pctpaudxmrtg01gbie3agkjwxvkz29lkchfgkbymlv62vy996gw4mszpnwphwnl6mhkiknswq6xh0ecx6cjh5151vbigz6r6ikt1u2rkotd4bagyk1alnw6aim9b9l7e',
                component: 'zscogpsp7rgcg4skosyzz6yg7zo9crvwl5yp390aov1khar0lmzvqkke55pacpuq2y5cg9765dnzvayr3rnnu4g60nl9ahl1cl89sdhgp8cc235cmc1cefwnr97kamjznbo4mf02gf6vs33dcr8801al64kxnafh',
                name: 'myh15hz76wdqfttk9i3dv22y3d5u0oud7m4yhfxmdsc9wvf284wbqf29d1zucz2xvdz2i1crv9iwanqlyrgdna6299ka3ebw94lq50uii0zcnttbfggx2mw68pr1uy5qam5nznrp07pj3c7d3qvp5tngi9iggol4',
                flowParty: 'cnrpb2dwopi6l5ywcuoexzms2aaow5r7yq2yiazecqykxaa93v6jnxwfrsnvpa78xrbcbov27o7pwskr0xwabli7i2qctkm3ao1mmgonwr0zuyb8tmzdg4gpkdxql8w8irns17nv5xdj8qas2uzf06au6kga21vv',
                flowComponent: '417hr23dxjgxb7m4m5z9i2g8446oqzzxebkga0ex3y0zoryz0tnltnpq595qsy3j162rg98zgvmqh29rwm8am7sjefjqko53ix9z612ttnjq0ibio6jcxtvgpgn6240jv0zonjzowp2s7k7d6cou772p68t7300g',
                flowInterfaceName: 'p80ueiv7wkxd8kgj1lqtyknoegzg0kp3ryd4wukxex76ro6ecubxm1s5bv8odl8932kzyr1wg5syc5744yqojm3q2zocwnx2fl8n3knelbnri2sid1vm2kr3bn4xxh3luloxhagfspiwi55o4jh0hgy6v5lpw2p5',
                flowInterfaceNamespace: 'n7db9mgw53gqcck8d50jidndxj8d9hjmyvtmvgb27c68pfj5sgoxk3hwifpoou5ladlrwoc72313fjxdrtw7hthb24udg0flm6obus83z4duraxg3qnpm99nspgzwb6to9sgyixlr3xzfmqesetlogrg1uu4chxx',
                adapterType: 'nz2hvqfwk5teiukic2vosmzsj240a38ex4085ft3n9kutnggnotl150q508m',
                direction: 'SENDER',
                transportProtocol: '8m1997yzp4597qaoth2bkk2q4jnsghqizqfvyfrm85upkuj0irq0e9304jj2',
                messageProtocol: 'rdjdo30dfxpz3rxkof1igybbeyavgu00rx5uwaqhglgcy5ln5bpq2uxekgry',
                adapterEngineName: 'dq7v8lohzkshsprpgnpoqt53z9imshckdu5w98jf4gees0fsnil8gymhux9ybykmw0mcf2j46j10fq4f6lvnkaojemm33v4wx5755fuqajvcihtcdyd0qafcsar1d4v07s26v1rtesdli1vqccxl7s1ioid4aof6',
                url: 'xalf69okap86s6tpdwyz6ple9f40t5jh41nt56rh1f3uci11f04o1ulnksgo8fr62nnx2fmzdwvgup9y4hjrsx0w1cqad8i0ascv9nsa8o7pbkaf44ya911huqa0nybqa2ako6cqdb5lqxx2by919g53ysw0wch5dpos9avk8afkelrgx7o0mm9vn5nisployxblixws4advbz03fgmgjee0mrz91nzqrsoclyshgmcpozsc4bpqz0q3snmn1lqm2yf1dzxjuthmrrqxgc1dopt5pve8vif1mv9wrwgwre680xkhpssrjprzupytwlcv',
                username: 'nxkigz05fdpbaccsggp1rtem9neku15l6zkom5ai6kqsr2gs4tiddj8d3jmj',
                remoteHost: '7v58apmlgcd6m0uubhcmcc4dvl6g2fzia7376otq9jwg34kmx5atyo0fst0epwxie29syr6fbuv4wnrkbw4u4k764qse12voxy7peykro1pybzpq4zxlktdf9j0oazdzg0hbm78spqh5eadkww41to0ptkg8sbmp',
                remotePort: 6320593257,
                directory: 'nlmy4g11q1fglaq2b73px3dtryjqcimhto87u33hsnglbmoi80zn87m2espxipmhn1511d4x0ituk0hikuzj01k9v769mejn4ml8hn3esv2ts65c7ogvigq1bnwtdkin4yj96xrhfqyj4g0vpamt3001eeq42qk1uaty0me9kdjvu7f055y861pz1k0hg6vhxn8gkmzkl6litigpoimqhw00w8vcmopy399owonlyx1zj0zxp0fds19wm3w3ejqfm6mh0cy5p0fgmmome9gv1q2op8pydqjuid7alwnzwjy88mroj82f6z5ftpj887s4cn08oslzrxph1247taybk7qkfd7wvqkqi468ly0qv03hyra2kzgrepl4bxisyvvvg08tqsy77lfwwhmyblmnen1t3n77vtpr3dnugf8e3vwvgql0bido8jgyuoqjjp49f26fntbp1d1c74v2yytyus4kws72fmg7gthz29a9bjiw92elwu0pr1wvsocdux057gghxcdpe7kkc7ne8pg8hwhi6r3acf1rm3x01bk8g1ykj3jfuxenuf2trc9vyvnc47gsl9kp4qkhg90k3461g8lckmazzg1x0uthm9765p5ksk5tpot6y2pg4lge2rpwcjxithb48g3sp2x2t95y4kla72ug0oc89vy4y8zk214z3uiwenmkgl0r49aa77qdplj68so8q8ugrwl8d9nwtin7bnu8jm3z1qcqhkd19vlam0hquskpwbsmgld9rv1hmfo0tnr3yikswieo6378fdszwltl2vscwgnlk19uyyqptaoxusv6xeo0zovlt76q1iwzbm832xrxnhs67h6bsvscmzwlnm3bvm14l506jy8szty1ize7yi2t2e3z9ifirw7q5ap3rhu5rmhbz7cvtp7g6yqbx9oxmowxzf2605oyw0sm4l6kwnoxdcn4y1vaelxezo0onlol1y5vziafuyy89zj5tzmixlwc0fyx3dgcpz39alzfngl7bjosvl0a',
                fileSchema: '40u5z07h8ectjqdunscv9lnjkkddj9s93zfv2wpkxidioqgllvjpmc9jrnv1j1ae60qtju4qb5d4d2o8vwpre1jn6v95a0ztsosgsw45vqx4tz46zu0of6yo4hvhk6h10zb1px61celi0yf3s64o9vu9p9i5tmbjen557nul3w2r1vmpkzgep81az82mtqyoczge1da3q38tnbj63hs8ilt8vajakxtaavu605l6p9kfb4te8o7h64sjjd3l5nposu1vxfhfa40sr4aj26vgahp6dsc0mg8zycuvam8sp709d1uy8naf8gdgi5j27tswj31047ubta4lm9igkm6zv4sqfgmvzn1p7jz8xchw5el7rdtp8heaeznrlv0fao589yw6zlewbelr29smuvm22kkcegvytky72yl16rilkidcubypdxo24yilh3pyoh6ket5rq3l1e285xoz45vom6p5e8sq0e7t25a05ztp6qmsdxizm9jbi3usi9jbqw2fg00haxyapmx0v9vsor7s0wout4j02w3iyic8mr0nvlff1e49kxrlbxfc5ufhts20kwtlxi5ltwxvznhl6b42butd6cyiypixh6pupxco4lx14zc9y9p9hzqptdy6ifsti80owez2t6beeesatyhr77d454dhkal3a3iwyth8kwilnksjhp2npbbs5crcyy6yzymad8yntzxwm2ik5s1mhvc44m8u9wlcxrbtfnejvgrphqchnhdr6tpfxtxk577qqi7eej88rgby1si4tfaihkmgpry489eeia0bbr64aoqhsvyodupayiqb1cla8xo387fizvv6dtrp3y7g8rn9ghvm2p7nfnnx6vrw6mw8dp2vj6g7n4qhrbj0vpxdjvus33r1ux8h0dxx8eed2bvz7op5x0a8vtp4jyv6gk5hvdqgd2p6fnurxohvbya2fuq00cwnknjvm1v0a1wsj542qpreuxsgwva4xa0k0a06yj49fkhtlrfsx1jck9jecbech',
                proxyHost: 'dx16n6e283a6frg9l7pxnxerkr6k5y68oxjlklrwcz2kzmwvo1jrvnpkquyc',
                proxyPort: 4524278062,
                destination: 'tvuv3nckov56dql5654k45l91bkeya47sm6px3aeflg76hmwfy8hbdo7c1izl01p1mc2e5wxc4wxmllpaa4bdrf286wsutsahm17rft0rgbt16ddij2jpbrpds0elcuizy3g0rn1890zxe2hwolw3b6tx6bt88d1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ciyufjbpygqrzqo2ru767n6imh273hcjbwiw5hovhwii89o15g2xkhc4upifeatdezq2ppthw5eovww290va3igl3ucobi8iavr3e9wj7jp4xw2i3393eyvdrbdhtzsmglm4qxwx2119r0agy99gswop0bkyh8o4',
                responsibleUserAccountName: 'bhpn5ub23h4mf2kc1pd2',
                lastChangeUserAccount: '69j1xslvia5v88xigdtw',
                lastChangedAt: '2020-07-21 01:36:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                
                party: '3l8h4o9uo2lgzlqqmfmie48vz5kewazdfvtvxpdux64wy6khq3kgbkl6e6uawolfa94iq6q2gu17d1at3itud6br4fn6i8te1hxc79qisvcvp64vgoatx3eubtpshdp0e19qhxswy6zapgafmrd0sot1hrs55tt1',
                component: '56qmu65qtti1h5xstdkk928118jal1n6iphy38mb4kmv2o6m3f04jdbdwrcn5n7eh9xr79kt4fk5wyobzqnlfzwdng4a7l8p79nrchl9vcs0l0zjdpzrc9x62lfzi4syf93ka3aczxwhyq9uzbnjafm3jliwau3u',
                name: 'pxa6x5k64u2d5zfkbtp75akuw4rt2as5z1td13d8jv9qqp7ltb107lg0isfge3msp17cobm8jkqchgp48uf79ttz3bxzynv6tzvdzomdnxj1lp8vmwa9uf5ikikmevsjmv3w29zb8cjd1135vdg9wflec6f26gk9',
                flowParty: 'ihdnioc0xx1qhmo02vgsbx7mjr0w7ml2h13uwixpovtdry6thza2sk2pt9wtgwirp2s1nslnj711vajq15f239joog4hbv2uhyh361daia70q35i19bx8lp2taagm2sq1ldum2x8tb0scx6hztp97ugbtkz9g92y',
                flowComponent: 'ufxipauyegir83lnqdkidvq0cf707fj0a4lct90mgma5nmf19vz7ec4lla2gqx4n0glim6frifish136c4ij1j9lrqrxy4d36qabgjg4krae0nttd01v5utcfnlvh4293z8z3dyv392qd9l3o7zfw4n0491ptrg9',
                flowInterfaceName: 'j7hirk4v572ontxv735j5isynu1n7ll46p4uwq2rhydzabd57wysntxbqvj81lmlow32aovhv6zbb69i2z9v51o5ev9apcogguyenpqieqbh3dwhbjz3cckbr5qlw4prbwuyltgqnx4sgn82p1e0admz9egvk4it',
                flowInterfaceNamespace: 'rerb1lbrj7hweaqh64hns7ksn08i1e873y4mg3jfyt81caytpohda8efjtfo0j8ruyhkuun2c2syt2qshley8u1tivzdgaid0hun75loq2nfvw82f9i7czgwoxqoi7kpuz2xo7vj6kwmud5kc23h6ecs5h6o7nv3',
                adapterType: 'bqehh400af2bublg2pcuiubnk8ljzf7ef95g0gnv2yrnl5s2wjhp4i6op11j',
                direction: 'SENDER',
                transportProtocol: '6y50kndjivuktoenrszjdr3qi99n7fyubdllo93uvsig1xpgaylq1o2qc00o',
                messageProtocol: 't0o3k0pptm29kpd8vatujm4jbh3qz240dxgnbia0nwio48vmaoj7dz5rltyk',
                adapterEngineName: 's8zt7mq8xckcjes1vyugrymycqaamtt9q1xrqld6lscwjpfaryfnadaopjdolvmz403y43lew0op6xigpsqjhixmdb8q92ab191noy8isc4t6c3pqcba1873r3qh2p8s4l27f6xfmf86a417l2xhg2s2ude5r5f8',
                url: '50ymclwvau8hofinciolvy6qpymree9kfjde04icvjgcg0wddzc42ukbuezv0lafeh8m6w7mp2ckic9ez2rd277elmn7o7fuo00lyk4zksa5q9wcooilpdi74613utt0ai3sedz9soqt15dcauirqkjmau16ee9ubjeerlz2l1eerspnx0ii4qs0cc3andj11lsyellr8yv03z6gac89muchoi9lls42smou1w6qoh9wnzgwiwy00dn6rpaehg3ttvffflq2tge7lxj04l4k5wnniqzm8xi090w0ii04ssul4ytid6mhitkneo9zb1wl',
                username: '40swde2g0sypr6ut323hwkdc7fivw6dcxn8ndv68yz75hexb93k7mh8obari',
                remoteHost: 'pzkivqkuetrk7lefffnbomoa8perxjbv2auzxses87m6kcz8crjs49bbgcc8pwqtjhc9pgzzjr3uz470r6679cxse4d3g5ljf0bisrok5mn9gqp9o1yhlgrs4wmyv57hviqr1oq71madstoh2ysg23fqnfis0mh1',
                remotePort: 1280971261,
                directory: '4e91t5tvtx6nys7s5dijxatcnb4jacphowe9mazm0jqr87wc3toovj45km0cyc0wya3qrrr09mykuc66nw4yu58rf0dmvxfycasqs8640fbtlpi1g8qnpj97yfpndiy9jwf31lbh07y9ng6myrm6b4y8nej0x3lp4ckoi7iuqirspnfmfejmxt4kcc062wqc8febf6fjdxoni1tiy8ucx2d3omnakfrybqnr5iu32mi5kh45orvsgrnpfgs2avwggazfkkfbrgusm4vr6nf5f5uk1eicni4p82bj3jjfgzp28bm5ed6123zvaoxg47386dt4mc1n2egebd509glnkky4kk8s16t43vez9a1fuxqezt54xukc2y5hbifiutelim5lzv0l465oe2yidifevpn3f90hn2rvqbjmw6w79h3b18sx1yfop1h3kblfq9dgljr4zznf4v3dy85lt1n582fr4asgle9esfmsm482e6ld225qtvvre3znn4e5lvc7ougrkl3u5rwv0q5n5wfkot3jdkaddrheltc5ewmyzgc47pshigv6arqhb6g3s03j6uvomx2dyrrkys1lfctep7cf7wb287xewyk6hgz6rk0zmrc9r5qdo97ebbbgrj87cff6ka0hxnfkkt24vur1a5t7wnzmau92z32yyhhr6lodzk178espwal9j9pnvdwr61bly8xak0ubj90iv7p6xlb4oaj6g7t84kdddkow45q12lvf6epkjouuvp30hzefd88axjgm8kygtjqnt9okw50xqfio116tpx7vzr3mt5o8uwaizmng2xho0d964a8urdf7hffeigomplyvh5g18bkh6ya2q5hpe795nphbgc7di3zl4hys9l9vzlazt2k1o44r9qb1r7il9w2tbki0d4naucv9tcg71u147jjvlx81rddlu4sxr9r27vopnkb95lii8x04q63hhaeds15gpoje53bi4yy2vnm4na6kuax32mntdexcjue6clv84rvd',
                fileSchema: 'g3ica4n0v8e5k59vrmxmpxmq9env1xjceeyqutwkjlnf6bu66ls5zlqvttas3n9vgi83q3881o1z2x9fow106sdjq41zfycw7jcmaiod5p3q0fehh8qftb2sn953uwys2ppiwj2lrsw27j4twm77u7h70wbzuq3qg30gtj4hydyiv66gi6tcm2nzd1xi80f53234ft8hlknt6e1f88a129k3kfg0vdr7v7o4ruajryi33k3npe32dpyuhr7dptwhthae5tq8ibf64vyqiyvpdlkrbmf4zmo2e69d605xetfsf4a22iz13fprzdf05d7fxltqlsjfdtxzj0vg0rgy6fh39zotbrjnsulqqlic0v40ski9jq2i4045qkj4nzewe91fe3q0tygy15r2g4j15mlgeiezcw6lzmp9f5kcqytopoel5equb66futdbryj2v9v43mzb4lphe9b3yo2ffdf6crz1dlte5htdtlqcjyoigiyhmacniqbdapkydhwsf0fa2i2jf91exn7hh4u9vcxcmbldky11ukzoheaptzk130ut78kwca6oebw34lixkizatoekop7kfobnyo4fc544cv8iz2pdwyldcrzb65h1vucwi0byk76gok1gfbvxb45zal2ll4r4mlvxb8ydhc2wmdmyppkmbncyn5xhekvnj423l83mjkcu3eotlafh0k8beypcicoufmecdzj0rfnjdg5wrrcyy6ot27ue33opl1to909tkpx5ykjxfs64z5wvyub8lffygc15fdzwuhixq1hcz4efjam416pbcdjkq3ptdgj0wp7vqxg8cjnwkwseog4a6w3s7d33bmprge3lfl3r0dq7ywdlytm6ev7d04jxklslanioizk93ignb1j5khxwvwj2c7782i2edjetmmj2h75g9gqik50esx2roh692zvpinnazr0nqov6edbjkq2af48pu8ooefnv5tmpw8gadgzhpxkd0z1rkp2ddctxt4oe6lcyk70ggzae',
                proxyHost: 'fj4ubhy7ypgvpyna514f8iq7lzgupjstrau4t7s88mgaelkbdabq56d1g6s4',
                proxyPort: 4908704364,
                destination: 'klmqshtzpzoxd0dezifoolv1hnqzg5edzm1zis225596gfjae5jfgnh0yznqwdeuxlfa2m99vln17haac19nz9jiux2j93e68p6aroga4hmizwe9482rxtrpq75p9twsu8av8zqgt3c1nfkp6di32tp4zuo23zou',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '72a58nuaor5ywbnxrqx6wkvwi035xfs0qufix0np2lswtet13t3n2t41mkfkpjjt1p7lvdy8635b3y1cxmcqw607jeycn4ci3rz8ls0ucseovj7ihi2kmgvica4i6gp4sasteb5k2eidu85paj2s4kgvugxgte1d',
                responsibleUserAccountName: 'owqflxrpttftlo4fsxj9',
                lastChangeUserAccount: 'n6ga7mbm53mrihoaylxj',
                lastChangedAt: '2020-07-21 17:06:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '9h4fgnuxu0jnr2vsfem2sohhh0oilh5506od2bfal0iirttjln2e0hhpe64glq5scfccc1e5ozomsr19ftr6ep7tl07dknamvyhbzawsnqhxttke5c49j575p0pdx5k4h93rrxpf0km32mdf94kt249dcvfhsnm3',
                component: null,
                name: 'ml8uuqkbprvqnn5nksty64zsptykcwtu48hu8akg33qjl1viwh431b63njvly6h2orwi3g4kmd28agocweoyb2stgo20k72kfr14y9cs6zdnzh0r3ijzhlcq84xty3up49iox7q6bpq2448iyajv5elle85avvf4',
                flowParty: 'gbjwrhjukz2o8r15nfbcqdbzbvyh47phvdvein8ehhobibsyhkobzbzt4qyuqcwvzchfo4wideb5z14fare56vfibfxtdyiiv6xz8uoyflv09h8bqh0hxnwuu8yuxpfznpnbwehxrfx8lbt82w2m893qumjth245',
                flowComponent: 'ulmh2cos7upykq5w768d3ib0avlbyugkru8gorrm2i55qfsj7u0rsqr9br5nv6oy10vvmh5fupi5nwabveirmmaovfqnwv203de9p4ktpmid1lt6xtwx9n08ymogekunbpxej4g6t7b13iqbmlgungixldjzlicr',
                flowInterfaceName: 'hmnemo5b81fsw45aov2jgoxdtqll1o14an3wa8qmmomc4q2vlnjk8medrrt9hknh1v4ktref3s6qdq4l31p9toma0h4ph4x0nua5jevx9g916uj3abfrxgybv9hw6lwtzp4f4ujhhti3b8qti7onay6vau26v3ni',
                flowInterfaceNamespace: 'jdry13t2x1scsl7hf1vm6vige9lfuntim2guvyeqj10flq3nzi7qudji8mmmg3h1dup7v6yd9uoj5ujb59qbymse0r6p1293h5k396tf5vqgntj4zuyqah02mav5fnzwzdmp98kzd75023ltkd6fu3752yqs6dz1',
                adapterType: '73qut7r3wp6he0ufg1ao052juyrg84mb780ll4lqd7fcwqblbpm68jycvie8',
                direction: 'SENDER',
                transportProtocol: 'ze0jhpoed9hk8jpigvh2f7iz22ki4n5idw2erbj5t7sxu40vwv3bf5t9ksi2',
                messageProtocol: 'dtszmcbjwekbzh91gpcsfwedkps6xx2g6i2h9uchpegkllo6jxguuu0opcza',
                adapterEngineName: 'fykfqjes35wusz16k8ucpcfnzkw879wp36pz36m2517yqiwo5rfzzwksx63dll9lczj0x6ogcrhi3z3owgriw3dad1girbqe7ko91h4ugj4q5vyfpemluvb08s5xlfer73t5p8gbudp4w8dxjwt5499w2vfxeioj',
                url: '7nz1atx32sk0zwl49k0cnt7sucuvhcg7m2xdls2z7xb09vu8m4gqa93k0pvsxrbjofstp4tw9641kijg8kkwgy887o19jdfj6h685s72t030tfnk15n1dyefsksgfaxjxkccq47l66hl06exm1byqnukntqwg3v95vimttbty906h9lfs8ntdzmo2t85r4nvgici56al1j5c34gkgl5dioetj0lj5s9n93e5dx7a1g0qayj8tg7jbzkeshg5yz5vf8guizdjriejtt6655h1kx7ri9y4z29uvsylgu3yo1uiojal4wv1jsp95e4q7ukd',
                username: 'lj0u9sllzluuyzkxffooogxn15h5vu897q2x90anv76gjtyu6141w5yeg309',
                remoteHost: 'dgogfyh71i4skkyazj1vwi5spl2ur80rgey0wcyuvzm6xllykbzq7pvsw93f1o1ymq57fiwhayob88xe536bbhnrlxnqx0inw44f6nu0llxxqqjrqzsr6qizq8w3uyjjauw58eioir56zfkr705hnuv6jgro69mv',
                remotePort: 8339173097,
                directory: 'chdr0sa6oihy0hvh74k4ymp960dyaji160s5svdr6agaowy3fpui35nr6g7ifoqy7fbb7hmieumumkd77idv9mbea2j2diu4na53dz8n6m36ewon0f72v9svztvxa9sk9sfj5s17hvs1qyc7r33fphefn2pjzo2md5owcrk2kh4n7skkjruz0v7k46i532vc9vf7w3fkuamavwpo4jaig9xs74hun8wp5kdzi823ah2r2b02khsfy4k29h3i0jog65skw09ckazh4n49z9fwz6upa6jotv4c80y7cg01cgtx7d6u7eic3ssvaf5u2luimgy4bb1atrby5uswcc917iqbthl34yq2xacbg4qo821b4l9aledut7ynsig44h0vybenxub5yaxi5yg89jx228di5yoy8pzzgutn2i7apjldnref9fqr5oxuyugj7uvz6bmgajhbmnu41wugl3oyau600b96ezcqxjes68yymb1fnkoq1mrh3o9hu3vlur4382jlgqf39oc4bdrr062zos4191c87ujsaugz928dpkf8muexf4sayo7uxq8ga1cba82qiwybwkr7wch6t1uxa555goydxs1ndairhfcltmzjw4rpr7jn17b26sv3x2jzvw1mi06lridd1fhsc4ijh2qekllhn8l8qxd50tny8pu9q74gwisl17c2fs0dx4q5rix7qqtimcu9ue7g94iijvfcx6gt4l5g6nv2atk3flsy52imz8vpg419u35hprpmeyt6ykdazvufojkm1bs6jyrgod4hk4tqfu2xrnbpbbubizpggqwkna8z576qjw9m5zxhqlyzftn9rs1ezwpc5wons9wc4t5rpyrqp53v8p3777h0lmwl309nux6awawhclufv7pxcphmfmy1b3p2dsnck6awx9blgrzqunghfcbzyaqokbo69irrst2rufzgvtxfzctvtgje5z3txhn0shsvfz598q4shdv2sy4zzcqzs24fglrlrenr58rgcwj6',
                fileSchema: '8jix93iinr6mn5w9ohhrkbv3d6ppboi5bkmqweutace37vhc23erptnktyfxiy7hni7ob6vjczv3r97labzr5pk5pw4rvfmtew3xfz5zttkapoo3gpjs9u8mmcy8qpbkw0laqry0smuupukycf57h5evjdc3u5fpfbik6x55g2hgnpneqeouxarip0iwhc40dqnte234wx5b6i9nosqnu5n7dh9fiab6qua7jw3fx0xqf77clwt982jyqa9gj0z26yuzlnpsu0idpqmnlipjvdg4m5q1ru1rinjekd56vfw0s2we9q7g90s1z704xogr86l0z8yt3gs0qug8kp0ekj3jxq0sz78n3tgqjtithcgimbdkua7xh5i2txckhuqazcyftv9u9mk4uyyazrm2ntzi9jgro9kx3flo6ufb5kxbn4qpziedgqujar4g9q8c57cb5nmpnb6n25eugs5zv1qn8o4e260wmmz5lo11prj89vwsad9v7mq5diho1g1jyrd0psw8trk0riksfpiefx1x9m6rhwlq0hdl1m51ggu0t1ieqqi11g0jvu9wn4pku2hf8skqjbc8sr51adjddxqjfp7aevzb8xed1qhhmb6ur8qfsg31o8fw974k1pgrmqep9gwu4ksh0t2t9z7bdlazqoubyb9n77aqyywaxyw1kowcw4dmynaqlvv85tpp72j2ogeksz899tfnqx1wdu8ppuugrrxy9uv9zeli1iqqoz3h4swle139rt0fj960dflky7ok2sx1mm70afs6duvjkd4crfj20jlsyhep3s22v7deul7mi12ds5bvd7vcamgcmlrgk027xy8yx4mkff6i73nill1txu21mwm0crfhx1gzj0ibxm2yofnl9w8md5j0eyhczm4rqz5rvr68mizu1tx80edddyy23ue3zlgnst7o2qu10ijmkooxv4zi7us5g5wd799bx0xgmuxzjuadmsgjs2j2gpgwxeqy8teeknshsqha71ia9jy2lsk6',
                proxyHost: 'vt78q7q4v26wzyx8y5hgjegohm0nxdta4keja4atzp5eqzpdiurhgxfp9ncq',
                proxyPort: 2133115470,
                destination: 'ccu7gi1zi6j5o9mzco47irysf4m6r2jdy46o0t7v9qc1x93jzi1mdjce08h6x4x0wrou5sqbjr9vh58c0vnjmykhhsvc93urkhherus395jl2bj5y818mbyor0hq7xuc3pb7usmcg4qtgo6m72krlp38jbbqou46',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd0m3p8hqq30xxg1o3gai5rc11x7xvfxv9yne66kiy8d69vuj34hy1ixq5uwy9seo8x4lh3app9kqhear5u63r7xrlx8vc8a0118swkugq2pg8u56tu39qsgh8aehr6k01o1xn03xe9x2y56581vnt6oma560kdpi',
                responsibleUserAccountName: '1ofeklk2hgxntifrpimb',
                lastChangeUserAccount: 'zg61r1pk8igwwvi2mwas',
                lastChangedAt: '2020-07-21 13:04:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '0gzvj1q1d72fsnfaqyfjerjbwd2xzpfdj00vnm6yfi03kl4jllfr2nno2j0nrm2e60amro2ryi384us2nw8j9o2xk0mg5rk32isliwtr7wayoubflijx7m8kz5xwbxkyzjhaibck3cww28l3rkhrdlrhjl8gntmf',
                
                name: '6ny8f7ohm9fkf7qqb4hwcgtfclc0490384g1wrsujnm249d7gpmbng8fjhxuneyxy1hh7o5ffhovuj3jpgnjnmk42fch5t1ay85nerpbys4udv4s0glybqt4smhpjsmpcgelz0kcx0fqyfcuch3uhgyebb7cpqkz',
                flowParty: 'aqc3kitemc6yyhojrnway3phh8lwackxeb86xo4rc9xsey6abhoqsuukw3q0xu2jq2wk8eav2k35xzcb148ificfhmv5d7de246st4mr5i8epsivmn3kf3m29xpstcg3aoz6x9fli7he62156rtovz9hr47xurcd',
                flowComponent: '2y80qf1y9yjto04k4eirlpb3m2o82torbptp9svnso81p57bl6sgcs4izrz0iemv7pb78i89icrj5j06eyqblx0yo06rwyisufvblgmwtgn9x8yzgz05g5opshp4kjs0ju8wc6u5hk42zyr9j3t0p6uh8lr6nmfd',
                flowInterfaceName: 'xy7wvrhmu0lmo5fzuzlshigzfh4zopcgv6enoa82o2uki1w0yzd182rwkkptwti49xvntlvp4b2n0t6ui4g518fjwphripkirvqvofzt521b5o0z4j3lcg0krxp5yv3t4sllmvkuh8fdjcxeuaqzml0ehs8xq366',
                flowInterfaceNamespace: 'z4hgnsuynjbnv55adztweinoqmdyyxrzhb2vq4i66bljo069u7ad67hk8eg6mv3day3vw0v9so211w55bmwry50rm5bbk8mfholrrm00f8th94z9abztw1k12a095sjldcv35f8c3l6px9uhoy2t159z7o1pz59f',
                adapterType: 'amf2v9wg4c1ffchpgfhw66q61ro7kagctb6rjsutlltl8bk3cwveosbzp7js',
                direction: 'SENDER',
                transportProtocol: 'ujyt9bntimd0814prworue76yph2puyemgfa4ym9cbwg6yg6zp80icvtz2ys',
                messageProtocol: 'mm6y0mhng6zv7ymwlfknogf264gcfw97aat8f7yzii9w45w3y11kigi6egxi',
                adapterEngineName: 'evhnp55lucswszet4nrjed2zcrpylkxosn9pvtena4hmtf6wq0x993lhwavzfnrq73a7bsl8on98cin8u5emwnr5p3lvujojzwdasybu08d6ypmd5sdnfn2sejibz80bpamy3qi785z42zonflx66uss9f6n57s5',
                url: 'w9zjheu6l6flwn6ypx4yltr8jff1zo4w4imgznrkiae9ltjkb3fzalbm1lht2q7twbejuwwbmsuyar6n8tnmbe7px4kfne7kwzmipq8t4wyhxa4m7ex9znmuq3avuxsntmdv0d0kt4e9t1vkcxfcip2g1k5lschtx3wflwi0xsfaai3f4egliy2dfamwq5n0vlguie0vcbl350phuxgoqeviovje2hx6zop1c0oj7rb6y1yxgwnboxwsfa7tjufsjpf7az7v9bsvciukpiyalc70rzqvesrxunena189pm38udxiqci6obgx4avq713g',
                username: 'des7di2232jqilsel3vgp0yybh6ubaszx60ttzisdxyctytcvb2vzy5vtr0z',
                remoteHost: 'b9bcg6cmx9kjocorf10pp9ghpyqsxwpeo1n7v1u13p09qajs9edgkyosgx3shuovr2oo69m25q5iffx7of7bpn7dhgvnwjuuo8nbza5i1zebwuxslie10p3ajey4h61hgszllzwdxoyrwjtywhicrc7f710uw5qu',
                remotePort: 9192278362,
                directory: 'p0w9gyvds12xee291orspjpvvamjrq340dr5atwkszirajar1aeupvh10oq6d7gkxxmcne5yygmlfbtbau98yjg2ozr3s28eenx0he12g1fyhebak6iyj2o5liwvfn0nx1j960bp4ozoh38u701urho0tlkkeuk2drsf4cg51dcnoi691y3v9isc491bycay5uvlt6qzdvl18i40uwsxmb1ji99ew8zv8din14v0jxqdd530jxcb5zubpfsu77zc2q7717imsnp0qbfad49ccu8ns71lsyijiu5479s47hlrehqwcc7fck8xw9ig1xzc8ja8am055vbladt0jzegzi2q7ucyeamut8wbykyspoezhrbxsbbiip88xzpbgqkwey0094e4pyl0twlojn550xxh9gjjbwkfxdo0e5l25mtq6e058fpt4224it72le9fiytbguxboif74r3tbms1d9ypaqz6rs1pltsm8bpans4yb4eavktb9f3fg778pttidl7ttmfv6nypwnqqatckupj6ge0aa36zz8h4vubazxp23opgbgnc1v58qzbra9gysry9b9j71y3g1ecveobwblytgsp78kafnkz6h39gixh1mfz4vnzw8fr34328ltwlppwxratnij5pbo977ouwo6z24mytaj9jkerydbtycinlsm0ttqukri7d7tscwmxtli9gzpziub8xovd5nzkq5ayjfuozcs1v18n5bierz9rbk6yxwxbslt7r9p0d4il9ac3ykfv77h6o49nvffcdlq8b4fcay6w2tnf7bd6u0oh482y3gcrhmdnmcw6e449bxfuxmsxrba2bs5d1wi0ob3izmbs1qwep4x81nrgnjal82ran68deco52v00dfr7k6uoninq0vl49m22frnn6gofqrz49il11k4k8sc9y4igaxy2h3py5gh6ibgxgfcae6hidj264jfeyeymgp4p2xj1432f9scynpuq8g0rx3406ttpmi7mxk1s1k0knd58q',
                fileSchema: '97mszby1mhjs1cujz1ipftdc71mjj0gtq9nxvllurm4nryzeu8eugjy0fg6rpx39af85mlqun9pkgeoy2k41nk16l1uwedytcfnp4zce8gum2rhg3wofeb2bnx4h8oap3jsbxlcv1o2xnnsbtywm9l78am24vxwecih3eqkrsrlf0i1mn3hlxmep2tas6nhhudfo1sl8d7veisefeyj2ibi5q0uyavryl80qlv2yk878523cwnxssb2fq8r6kj4lh7fsjwiwiyfmdekrkjlmi42jgdmr2ir9rkhuqzd1leibczarunhn5rl97z5wer9u6o634bqy6icewuha2ln2rigybh56okzokzl5xdd0gixcrb1quclr4krmazlux28rq5qyvjvlylwulnrxhp7pwo9etf5gr5ul47krsagqjgy1vul7jzk58wqtvjceimmtsbbpy2lbbqoae094d3oitpnrrb4ffpcqlkpp55x18rl9cufpv2lbhte9aauam1zfoatugh5albw46gaf01loaan54r5tg9i8k78p8c44ud5pzkhwein7ktoz4eqskvazbzk7tkz521q6znxd1wkn9ky46wfllb2kea98lt5she0soedxuxkyo3454a7mdqjrdssnoum7dwap2m3wylt2by2hcrba13ini92jfkbewh0chdblo8u81iyxnadl38119wqpvvdaslrfjbeanqyjviqch6089dibmsn2rcfcil5o0ptlmlujisih2ou6rlur6yun8v2mrpvjdythn192lolouzmvn6jjoav7st06spfhh6mjfumvr25phmhfxte8nnrdishc50il318arak4q909a3s2k09iighapk9kwvkjr5m1i1vmi9ck80spw23mpir8z4j5cheseor1ts72ophczh7qwirgktynw7p3fidptnbxd8nktkoq88yomm80ozlnlesskud0u41qtie9n4xr1s3zat1rrk8j6i99nlpc7s19kshybijv2499ht2p',
                proxyHost: 'qsqbouh1vrd06shvdyuq09j5rnb31uv4p0u7ea4rujlevvxnu179u10oaryt',
                proxyPort: 3169204311,
                destination: 'k2m94sla3rj8is31qisp2hik8unhl9bzq2l9zisha9cfhi2mo5mk82tzw98u0dazs1j3jpg1fdztubiccit8ynnit3q1sjxdlaafmyf7oweiqok6uj4r7htvpoy38rn4mryyw2g9jf59psolhdnxfi6v8dih7867',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1pt7c03k0v6osssn84fu3vvf2mtdjdw1svz49x2drdft05v8spipr0o19nw7o9egpqu65ljxf3hhch358k73gefgpe0l6iulogexhf76wnl9haoiw55196eqewemi0kcbihlk1hvugjidw5zfiq0qklzu0cxex8u',
                responsibleUserAccountName: '9sb741303x5660dz7fg5',
                lastChangeUserAccount: 'btk27n7j7xx1ha1u71rt',
                lastChangedAt: '2020-07-21 11:20:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'es959ytgmld6f8teiqeqhtitpgshl5ciln70ov2pgebpawk7i000fjqvp6za30o3mpaw5hgjw7wdhbk8csgnjbvg0wpkwaufyt0w948ywd7cmtupysi1wfhczog1dq9nzca2uekoznk9e2oiymra1d6uw4gki25k',
                component: '4c2yhh9rrfwh1vrxuig4jl0p25jtrzb3wgcxz9sslvjgwchidtg9th9wamjilwvzmb6xd3yxwxhoi8n8dp4qns3tg4wot9n2k3dm5tvm62egrkh66ximfbwjryrekvr58gmjbbjo8utymagnmfxwy5hw75x022c5',
                name: null,
                flowParty: '86g2u5qnn2bbgdp6etqmqrwddyqqj0jcaciegooyjeer0tscqcl19qqk4qseyytodlap7lfqb1xq0kz25hpfzv2sn59v8h3huft8bwcibq88yjovzlen0kjdckxdwinch48n29sv1jdgyoqr1wen5dzm3ae1h0ez',
                flowComponent: 'tq0b1jcs0u06m38vzmutqwrkn0kgplgm3n1qv46fyvf2h0yd613ftabs544kl2qw9qel56drfgldkql23qnc0p3p8ua3rmwbpeckocii5zgf9iv4tmw89j74r6mu5uu52ynbbo2w9ki85jruwsga9h2694rzjj3q',
                flowInterfaceName: 'q1fn1m1qpuj162pohayot479mqqs2brm7gxeka8dwagpqk51sfgnf3ew5g5hntrje7cxg6t00tujfeei4acqboyhgh2sobm4vnvjb0h280tovrrmgu7p015wi7i4n4lcy4yz6j5udr2btim4gvrxjayuyqljqhaz',
                flowInterfaceNamespace: 'sh5h4p5tzpfl5uv9tvzrl55lpzy4fl1r3jwk4ks6vwhi9d0y95h44uuyaf89zjmhjizxa9eb6i1yj9289hlpovsnjumll4bvpivco7kdcv047syh8mrf56g9o390347nfhher66wjkfrvuj399pgqap40pfs4uxs',
                adapterType: '914s3ev431typoj23pdzqszh9w00wv01xmn1tdm1va2p8ooqy8l2qdw9ccwf',
                direction: 'SENDER',
                transportProtocol: 'hq79cq5rkz6gge7bd262j0moi91nf21umgkh918t0rfyzodxw6km6rr4hnnr',
                messageProtocol: 'ybng1eksv42ycinomhim0z6kn4d7avur6azo8h8bcdggusvhai5so7crzms3',
                adapterEngineName: 'mp2aozncrvq3pejf98krbx1prahgb9rpl9gsn0wgtn1tmti48acrr08btr0jkwe9ztbx67hese1lfblkw3a7cvakjzniwfsctfkw4g4jj3fnkya9wzgwskipq4w7ambtm9swomr7s8fxuepdzs8o54bm0injpnad',
                url: '0rc2pqcpupqybsz045vjt6cmo43jeiiaqdunnstg1uezclb0w7nn3ntjtwn02l8wc4ryquz9vpri926nmqck1dxnpjd9k4y8twma88s71ivxiukzqgfjsxudid17arzcfgvg7qor8e3bnl8p07wuxim2fp0el5cu7mqp0wl3nce8yyejvtn6mu1d401oj882fksm9ak2nropwnym2cvpui3tws3t7grfxzhei6pc27xhjjm7ccf03bilkgpvfsmatfvg7qddmuzrx96iajd86ymv56r4t2viqdbgo9bufr4ttx0tkshq56cvxwlwrwbu',
                username: 'jozmehhgsz5kxon63pr9pcssd2jlzdtek147vvr1n5m7vd0vgl9133byvvkd',
                remoteHost: 'hb4jlcjpsv9abp9p2vt621lrmqodwhsdafh2wam2p384bd43l0tm9rfna6h4osanldza6asoeaigsugmzl3rhn5zamn4hh3ch9787k91r33ohhfxfagbps96r5hkk9bprw286i6zij3y85xophqz2xct7kksldlm',
                remotePort: 8015679666,
                directory: 'o2gm2z7w0szfygcsrgxem1dbspw67hbdikb3bw5clgwgaken5x0vcpyexmfbpa99v0k5dtno0t5s75ryftltbuzw7imtl1nw026y5i9l8b9knvwhtm9q2cc1wtsl1u58lyk2fcpsj6rc1udwrlbgoz7ppp1lyhrlr8ntroblyykm94e91zsa6lbo3icm9ijvgijozp0aai4q7mgf967g6rrlh314phdobqiivgoaepys5r0m38mkdsldb8et6rlbf415neibooijr2g9s3gm2q4yiyo9f9136bjasqxaapg4qs3ed39u8ltfsq86p3q3ur4cnf89hxwms3nbi8jzjbei5fi2v3xi26yzd1ghxhrdihgs9yoctfac9i9wi1058j8tdam060czwrx9gwpnj1ij6rs2tf9vpx9bftrwveqo77r86pb1g7cq48y6vl05m31qi39b3s1lbe5hrojev2g1cx9f25dg420gxrrvj0t76xeqa4mb54ncemqpxugkvwnxlia0ar4or8zucdaa2v1numojh63l9qjayju6mjti647rqgf44hx6n1gr6nr88aqswjo0zen8oz9a48ntdscih7bta98eddrvl3tkpoeona0zj3k5h9882p64huohgcoeshgk2ylj16qyuqv6ubsjjh0fmxjr48f998xibj3syq9eappnztl9pnexi94x801c9arfk5hjowpapguqm8n9srpxl93yqan2c29u9jxt5ts86uorso0hfbqnjvrdknjkmvobmmb313ghsfc4jpqjvj63wses5o3bihdsuh3klrjamm7ef8n7kwn3ev7jnr495re7ziehs1w5mcytsd0srvxy2sywqhsmh7nzy3hl4f4xf7fv1d5b0gv02ad4oqj3izo9c9mlsgd6s446gxd3s7mnwzbfqvp4ll13fp1kmc82bese13kc1agh1z4q4s0l5nbwwt9kerecuuzm4vaorgvbypsycpqkh6emfe9atoib6qbvsj6ycp35cbz3',
                fileSchema: 'o0ohljds6xb868qbhby2ggmr6dc6iica54nu8y5il6bqj503dpnrw49ybzmudiv2zlquabb2yr7ffrbf2ounr0u3ndsbfo16hb81pgmttfcgks1gndnydx8yk1j8d6vvxbaqp7ojx1ee7zoymxuyxajz4nkqxvsyffuwdx4zfpryxhe677ijqh1rayns0856dq42xnp7qnhwswove515dr9hkh4neuv4fwnlwrtdg3nj803jz599yxk78w6nju7kvdr2nsimtygdnshi62c8lt40ngbbt66mvda76qlwxp2swzdrq82wztyymmas8mogrftpb64r8op8tom0wyqnbhj6ye7mvhvijauwkrs8lygmnbsoc3y1ohj4g032hp32kicro42jx4jytid7ots6wveki2wfd423pwl7dpnapx3e91dt6iouyws3zs1493ubqvyr2kih2chi9eqpzqppgbb58208t04z549q0psq3komzjwn3qbo3veaccqw1w1un1m08w75qlg34w05chb2r21uvunq08w2u6i75i0khk284450nvwrdhw5vns3aj7aepvr7a2zj8svttiefan54z95aens556zu5up5nvy3z0349gnti19k8xxhqh9lkm4k5l1ssw6ety6ywit8mcwesdu04bvwp863xxgh2kf0muoo5wcavjt3f6puy5kq10p57ndsvapeokum36c53di9babh82qkq4l8ms6pbzgirbylonjk2pr1j26vcsyctuzxnusa2ci6aoy4c5la1bih6tad7r5qs7n4x15ysaf2quqaj5zd3hs4ro4sx25f6is8f0jdh0p2n82vsh1tzahtxcr5r9yc4z4ay8y6dzqhzit91lp4jbfdudol8pw9giwmu94eiat3dda474du0qtb9cdfgejamivwe6ecwd03xr0as7p0npykimwm8r2z9i36podyezknw2g2eko4f7lnvq1tgphul1oa4kq7ehelkdsngxzvel9dw2rz69qbiah',
                proxyHost: '2ud8hifonw9g9obvjm3wi7v93oj718ss96p2u6hkv8ajwsbpfyz8s8uvpxbr',
                proxyPort: 3353424168,
                destination: 'xv763a7sq9sza75dlxqifmeorxni7joz6kj5767qzjx9ku87lmaz86dpuu4t8jn45fi94np9ixmwh9o2zlrk3psizqs7e8igzahv3fe0zljgrq9pphoq3cd0dwng5ga6hg4jpf0scmesgprhrjeqi1eo9haotsb0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '736axvquxvk200jlyob70ynpwtp76pp5h5vy48ob6dkm5gkhpfh4stuv5aujj8j0sgqfbkza67df8bt0qn223gy5328njjtigkdgs9a65rn0gdflt35krkqnwtbquu3ssy4bfeez7tfjjkfcmqw4a2pkq9vwx2qx',
                responsibleUserAccountName: '530anv5qboyvt3rmclgr',
                lastChangeUserAccount: 'ofk85jyu25es4rqsb9j2',
                lastChangedAt: '2020-07-21 09:24:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '44pzhnscey6o60c110la0loef3yb809vkps781zbcbl1hvucyzam43kzn9tk8f6k8v6z5u903hpksebn34upcadlou9nmfnc28nhiwrsao5omiagc8yjuac88tzkl6iemhyapsgvaqkq476q40l0viv99d9ptjpq',
                component: 'hgxqwv88tz2r27jmq1yel9izji50y6o9anrq6pxepqlz7bjcxmg6k9kv461a5d5m542yote6r94wqnrhz648tm8ycdgiqzy72u9cvgopjjcn07nw5mbtwbh9tij1g4s1whrulhg98nucdbtxfw7z8q8vuint396y',
                
                flowParty: 'grsrf5no295vc2oxzgfoyxbkl712in0gwcf2ljksgoqqruqk8ggka65cir3w8fawsdu8tt1spdhzu316i186livhzsjmac1y2dvzqci3ss7lqnk10070z00d00p29djpppv9to79c2g84b9z0c8r03mjnzj01cqi',
                flowComponent: '3n89b2w9dg35xunqmk28j9pvix85x0o747mrbx5lv3i4iyjh8wvsyt26g8cefrg1tz8lxtgpls2in5zlvmxqcfc6ib2rmq37gjiarysexeknpgv0fj4iyxr21lslax8nvo7y6n9wdkupo9lfwb7teuadjrbl401a',
                flowInterfaceName: 'lyief80av0e316pzoqn6vuxc9z0qfsldjiwn3sl01l95rhsv2hi3do9vofrwgvgg9in0btofrn6wprtah5e70taj9wf6f8aq1j3m3ycormqn648l457zdvxd7n2xvz87obdsx3dbqql5xmyteogpzgs62dbt64l6',
                flowInterfaceNamespace: '0pv1ivlaobrokjmyecslq996dmbq6qzc9bn9xsj250zv4dnmdgaby0fm15j218y1s75zd9t2v5hr9h55cm4va54khdxnz36j0m63dg2n5xqq7n6tnysszetgz26f83yd4sj0c5ein284bza6hc7ic89f3lbxhw7z',
                adapterType: 'cx5k9u8rkrzeabax8cqy1js4g6oto677cq7y83tx2aszojplrzen5f3lhuf4',
                direction: 'SENDER',
                transportProtocol: '6kmh9m043nl4ikrm339717i3vpwhbxz9fvzwfit6q8pec6f9ocw5w1of5en4',
                messageProtocol: '32pb4fbophplegypfm0dzzukc59jxu8q549rzobz5ylnib13q21kyi2z00iw',
                adapterEngineName: 'jerwjpntu4qr3dbkugtqq122ziuqz9w7066k82cqpv9d9364v5u2sgi4fuszwdmdpc1bpwcnye4v5rkcs84vjsswhte41x59b6cxbo7rgl52p9isgzpqyhb0r02j1g10kv6p21ww452tev9z1kf8qjkho3jvu262',
                url: 'c5lxuok4t1jdf1n7mrin34bg3c951k0gs3hau2iiczzay0fdl4usl5kie7yyscy8e4nxocr15gfy5pbw1vi8yw512tv7t6woqcexxi5sxbfsm6kk05z2flsy1pqovexkjxewrxngtmpb7e7768gjhpgsthq8p38f4uwlbwwzk2vy4m171litgt43tvy98ebvfo6jn5wtx9tluuvzqxgugbupca7u8isuaba2gcm35kj5zxhzzh6iq71vre67r3wkqhwo8eeym97w2w0it2gfll7nhrmm7elmgeoj7lz2o5aral3vh9i99ne1kv91ha2w',
                username: 'twigmydnq6izlzdj6f9q6d7n5vp9nbbqmefstadheezn66kwjc7we8lyod42',
                remoteHost: 'sebtz451io9rcwth8sfai6862v6i7h4btdcee3d2046fgt794ig5r4t2n84oe14nxj3x9e8fi09h2lt7m0haq1o81cjsx3xjuxvzphrtawhcjrlp84tnly1mncnepzl15vfwtkr6un5pblwzjiy2xxzfeoppopuj',
                remotePort: 5799505899,
                directory: 'qedxyjb93s0qcsfpeh4iegiemfz5nc37uzqwh4mkx4aqd3nn1rs9fy36cw2xx0a07625av3o891jvlpy6evq47rbw9w9oilip3xai1x151q0e1pz2e70jnn9lgtsgm896ikqb5enkul0y7xksdaci5mzkgdjwoqnbn8m83yx7ouq5qjan3098631bh5fxtvh2swrr3ikg9skoswajhj5edxqjvhyy8dst5y8l865wjq9cu9gfa291eclu0owe8powfc802g7y9d4w0mgwiy2zjehbhsqs07a899z2yhgse7kveb52sy4tg9wr7hp1hwa89fjqepwzxvnixuuz2ogyfuthoj3dcx3vg0t6njuh04y42oig1rt2yq9bpdrkk9qct5slbjgj7w8rubfbqtfmdd80l7mqibdr3red4xtxh4j3ke0oigjrpvi2ku12vvc7jw7s22efe5w7k1d8mknjm5bgwzdnxapus7755ksjb8s46q33pulvbf6brg4qr52rk12h190mu32rtrulcb62lx8i95mrveyhbh6peqi3nsrn50p258uwtcoccjxsghms75hvy0ytpwlvl9hlcxgkvekqm6e7d91pmb9vps066df0oi5nfh5ffz4ascx90tmep5j8sd88gekmunx26bfzhabgbgq44h4rdsm04brqefiqf3c043ok4d2zkkpj1c7pfrxq272uw7ud72avejupca05plww8uu810k68ualevh6vnc9sz49c61bvtb3ynza2ol0rmkzlojlwcrn53m56tscnup27u1oa9l2s0oq566cman4w0zy1p7qryoxr17fhurlvpwj4xqwhkl95rfgfzwwwr81vzf5xbg5j9l4zso9maocsw9jfplqck7u2vbekpzunxehmebjvkw36ykjcwqvhykrhoenmji5yhp39vmz4xs2vqnt4xy9jzrjo7902m7h6hs6g5ztbb7z5ubt9obwupnkn4rd2sdax23ll3w5n5cqvjpqwucicpu05r9',
                fileSchema: 'y3u7opk1ifq1k0gy1kzkpt8ytnlrrzwgceeem3ja7hfvpiv6gpjsrn2kmrpxv4oofn4pa5n778iaoh8s5krz616lbo2uy2tp12ewkzpyzkmvqbm8qrdg6qgx3t5bopvgvg9tykkuaps6x6k755gdvou3lw1us5zd0z49txg261tdmtk00bspr7ahknpzmskvq38sh77pgrqrnfgknc9wb9qqnspyni750fmlmi5ku6lv6u4ejbiy7gwk8p7kk1mtx3g0wh7g95t70m8v6z4towg5eux4hkrm22mcx6o1hdwudgk3lgunhd8s3mfiqt5g2tb3t3ucwhtxox9lgegibglfgwc7xvsmg5q2b14b8ftpwgc8ykyhtq993librkp6eb82vdg939p5mu9t1b1bo6e3hakishhiqavszt19qoigckoepqk8oz2jp0mc1zaujw1j3y2ifmtu8t221e8shamvat2fo9zw1pf62elfob3zvoz191iuwkxahag1fuqmok0mcrgnyksi522n2lj3no5inzolw5kicsx9pgpsrdh2y1a5m3yl3kmpv69wd4ezw1vv8ytxhyq4mx8j7msd9rgodmkprg2b9jbvh4s3ig9gj8gjr4sval47zt3wbb20m9so71xd0c2zio6g6hjdzcxdgwybdwx4fqkksu8ppprmk7hd9o5y9eawz2gkbkw8pjc0r6qqk373vh2uk0axl4mvgwbrm5aneoyhtad7adyjs624lcv73t0af7ya0vauoknlehrp11a7aevapsb4rx6i0bm13mrmkgodvlz8yvm50idsaqc1tmn6debfvvijp7z8ulnrc82rwwl34dd8odgkvzt0jgw6zn1pxqohvu5sb376av2o1nisjaps5myjse31djuyyycnxueunkocbluvrfr0hwylaj9ccihv9djlp4irky67oykoyfalqlpg1and18tg2gt1tmz00xxohyhqzkr7yxt3g3nhvkwb66arad8tuf7br3ez1b1mxifk',
                proxyHost: 'dahjy4sz8j07qpom1tjhpd0128hss235vu1yj5c3kelg4j4wtrqqw6ceqwg9',
                proxyPort: 2601511418,
                destination: 'g3aqi2pmlzgem0mlfe8oaeblddb1bedcsz2tguvdwdf8r69lifek0an04im9qoxyhn9c8c0el6cwdynfhj7nwsl0an0fvuh07y9tlx1ca7h9owui6v2g6d1yzhu9xh19vwk675098x0214oxt0sio0tue2ixrqeu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qykpoha3u8ua4c1ozjc6m8stanp1dittdidv0xypfuaxtwl30xsngbhqv2mkzl85lpmpc0q5yi881tjy2ez3fo5wse9w6ria1b31cy8cgxonw08uh9dhpju9xemmo4ydd37yq15u4h9n04w9uu6nrskv1o74fuks',
                responsibleUserAccountName: 'zbhkcsuavvhpsqir89dt',
                lastChangeUserAccount: '4o36pjygorjeez4zdk7t',
                lastChangedAt: '2020-07-21 07:07:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '3s97zdoh2i96bpceq1q0bvvtxlpyntmrqg246yuav57cwf2kv2ugr2yps2iujbr5ywrj1wjlwiqatwu7qsxuduk7woax7uzggzb01xq7v6pnfsto45dwqbontniyk1c5zzwr8uxt9954lxoarx8hoi854yvhz1ls',
                component: 'c4rao29rv39e142s0ec4t7zd5u6ia68byhoo16jphhbox4jb9v61946jqnfasicgd9wtm7ssjyqvolefxfipvbgaw1q3he4xhwsnsygvt8vp0rybjdyphl9769htq7y4plxfz4av1ttf4cwey375o4n77iqzfrn8',
                name: 'ge9fjm79grfg26xnfwi5cmw4ya18givlz947bzm9h919llkeisum0il86bs6k6qcxcs5zuzak7c4bpwyd4vf39q19bf5srt9474oboq1fpo51eo1rcstm90blioztotag51tf9peuh6sf2qi3wwn1vhuzc9t5bws',
                flowParty: null,
                flowComponent: '5rtoiln0drnd57kdosugbn0sxcc6i9ozsh8dmsr8qwp5pcc9vzax8ao57bpfnz25q061v022kbbyvh3pct3lpq9l7ri1vg4keat2yhizigk9x0dcq8dh8oyy7qj8y5nkcg56hgofd6qyng1ar5cjouz7qocywd44',
                flowInterfaceName: 'xfgg2a76qlkowuw7q73aay7796cjxxlvnnz3oxm91eq23y7sj37fi3gcr3tni3tap87i39cxt3jgax3iig78qq9mpqv0neiefhtmb9mvf65munef3irk25gzw4j2qas4eoyrf7k4z24212h1pcpo1rq8l2bu2zdy',
                flowInterfaceNamespace: '7mry4lv4sm3tm0n7i52glgf7r2vvdz72nxueht05tl1fshxrtutsqrblzg1m67ombbc6rte37imw20r1muk3vui22a9zshpll6ebm0oovt68wt4usleurfc3ux3hizvl3fq27st19mhdlo676uqlw6fgwg8zop2i',
                adapterType: 'oozyxchrgkwnjx652byqz314t8iqp6mwgpncp4h5nir5nwad6ijplkjh4p0y',
                direction: 'SENDER',
                transportProtocol: 'dqw5od713facdckpsqn2b1x2jijijm249g8a4wcxp8lkyeq3hpjsdhhjo3uw',
                messageProtocol: 'jg5vnge84l5mdosjcyu5a5ppgrdqmpzusm1zbs6l5razowpehdia39ywd84v',
                adapterEngineName: 'e9vb1wf8lksapn8r1bbepa1tu0srff4g69nbmgw8ac42mp0stoz45of362oqump8o19ltc1nbxv1yg5x9oinx1ydygok7xi77464yk886gdbsd43vzcg4j8n8o6w5iyy41sp2n3gpwx7dlusquzeutgji7avkm6b',
                url: '52ybosvuqz99656unfr72if4xk054fv3tgm0qmtt26iabhjox3aqon1cgca6lcp7mpsc5jopubkn3rweum75qiti47ac84jel3qmqai5q3srb5ek6s04ap583fx33pmw4op0m7619b1jsz2xg0cfsks17c8hxwohbnkli5ce0eh4bqnquor0md8g5hw5qixkc8fnsmm9cks761c9zen54zvctd1i8edeb2rzwlt3quksb35v9dag9aqf3a5nhw4zvq4i43kj6asbxgng8a686fcz2cfjjg1rwo0q4re8sxwm4lk5b5hxq422yprcnedn',
                username: 't1m8hqotfzih9bgeebf7r26tdl1jc237ofuqh3tubxd183xrtt6jbabnl91f',
                remoteHost: '0v4h5jp9bevy4zbmwh10ke10za1mhwy8q4b7r98mle3d4zf4bekqiqoiagzz7s4b9jme48p5oeb0ioox80gt1tjx1xtp9l5pxsn373bjktvkz7jmd665qdexorchqnlyoz9lpmsz971erxizfgz5wcox59ja79va',
                remotePort: 5402585705,
                directory: 'nyzkefc898c4fel1vn0k0735z7l2e6dh7c960gc8iyv07y54zosbuqsbq6sszdx5oiajopr7u2zpg1botun4241r3d9bjg0lmh87nbf0o6ywwca4l7a8gd0vmyopeidnuhbvk2skaqlyqrstrvriqdvalybk4h12fsgosd672q6tpjvwzj7wn2az30k7yphmr1texxcae10lgt4y1k2l4lrkpo4t9m2l47m0ljnszs4v3u046oy5ifxbz9chy19tet2thhjpp4jj29r6s9pbfpxwjs1ki973ipp3srnrmzortqmaq5hbonyn2mi3ddax9dyklnk12myh9sm2elexip6vy54mgp5obdknzou12ld26j79ojh36glg1e905xptyscjv9bhv0fimsumhz4psnehs3e5ioyvibiyv5f9c297eikpfu1dq62rkohgw0ehzgylixjg56m987hherdfo7fbsqrd7dctcpdeu3qot3a4y634nx7dbg8vfzpspgs2ly48ypqpb5o87mvz2s6slfixpwpkkh5a0h2uauahvao2z331bckkj6jhqqw3eydeu44vfpzka01h7psrn4ap1wfne9x053jl2llc1h470tbw3ujgc0ojj32cbszsrl13a1fdfm50gr6wds6m2jy6klebqcd6pnejy3th0lxbfbt9fjfcgdhm905vmc6z1cu945cdzlicq3eyg97k8tzwpodl6isdloe7j0hqa3n0hgam6obsmvah5ftkazofd0k2s1e5yubzjd280rcavo9hqsqvmrj0s0uq5cg5iikgrnqn5fe2k7t9hseqcm7md3jnw69dzz6ktqfqxhseeuxq1wgh0fi6edrlafff7vq2q0ja0bebu9fvyi202dtd160l0t7xjmhcc5r6vzl5zra5ughkzi2kzjpi3iqmbnwqxmnvkdmia6tb5en5maaty3pi3oku06dqidxs8krcoksrhmx5fwa6uby1t7w910cfy6nvmvlqi8xyd7jcw0fz11d4',
                fileSchema: 'o6kyd1845ldnwebely7mcxl1f922ltcrbjouig7loel5e39nrqqgoyvjfc3t9ougu0psvc9feib726v28tszba265c3c4eojnqvba6cee85o335rh926sto5flgqjhhmrzl51l9p6zdw9xm3rawsrfu80lerphgjuxzy2rr7mfcf81ez7ztg05t0i3kiibtg7hyz5d36baoqib6otenx0l0o5c6lsoruig9uuz971kwbf79angjydiesdyxlieflxhv9c56vieh9b9t4j2ayuaw2f05bqj1ad06d7pr1ef95t3efmq4yt6q8tgmcdodhajsenq6ee19sll81ncdzdntrsgk49eqj324w8x4yyloyzn03ceevge9ig5p1rkh2ejx08gqvyqclv88rcpmfb3urq2vwyoqnnmbaq3cyeas2sgatcq4jauh893lfnszn5a01qz7fu08fs972ma94v4a93kp8h0jh7doeu9skeiy43h652p865sfocgzy0atpvq3bx16siotow84otsqoobd6am8r7yh5w97uj6r25w9scm4k920zcbxo1fot2lpfbw5sm74cnlauuo8d5fhvi0buk3dijntkp9a96qua7w5zduqjnj7lj5vsfmuyo0c4f36pnq12d6an5qgmbm1bx8an8tlmkkft09skefk036lk8cd27dzlzlf5di7gtiw2uhk5z8ztpn2gju8r7m1ddpnw3ob9ywvcehjf4ujxko8a7oagv8cbcr22epn05p8uivzc0cct9iuufzo2ialu9n0ee7g08pmjsl15p5ptapk1eqicj1yam5yoobyr6904bwujqyn5jz9etkgm907gxga9pgeotiknzyudoyqsrl0x6nyzrdsis39w632xy59w3nl32k9aem314vcczl3hjgous6a45fg55pojt4x488c91tvzpmotbw7jwyro7qzes1a27wm9u88k5hfyg7re9vpbcr23hbd18gadi7ua9tqq25t609y0ngp40em27o6d',
                proxyHost: '4audy717hx56jzvb2yqnwrrsgok9n56g1ohioeotkxeso1j323ctdy3raxxj',
                proxyPort: 7942121159,
                destination: 'r6hzn64cawjtxi2dja1rsyw81r1tld9hq61ahaiybno5rff5l9giik8m42nzzn9x39jrm48p8irsglg0jqy7plfxajoqq5019l9lc00utaxauqha7n6q4ykynqg3ftmpbyzk8hva4bt8qo1ajk4urftol0g42wpn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1jh2o9wugn49q7gyg8yy0rbuim8zsefd3ealdbbae3daawk6z95o4zj9f23wjx6e2hyfd5k3nsevvp1nx29qgsdmqroxr09t5qvkk9zpomif44937y2v94otm55mg61cklu1osehj8ctlvy17cz5gg8z411c43k9',
                responsibleUserAccountName: '1wt1f3stqwxc6nuowiji',
                lastChangeUserAccount: '8yzpobnnxa0cm95ri88x',
                lastChangedAt: '2020-07-21 09:29:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'g0ox31p8qj0ma255fuuayu3qbn9r5icwdmfjm0shmvc9bvmd9gi6zcjtrzmcqp7b7noo05fyzvvldabdntnfqtwcl3zks7mcyphnvv5z2r4txlgb7fvscfkegnyhcjg2j45d6ul48olrghsvimnkezd10mmi2hf8',
                component: '7g5wk43f2q5r0ncqqm85g4ldoji9ktxm76p7jzegqcw6zdx7wq5xmvpxnqgeqi0fbb5k61u5utirrpctsgnzid51bx660od2ssr3bucq9lx9gujcgk3ybxa7owylap331c29032m9n1njtzk09mo1eqlum5qjosy',
                name: 'mku100ycik0rvc1qw2e6q3jjiuzu8nvan160dggdktjf4n9bu174e66yftf26dn3i2aaqw6jmm8wcf09s9xumjt8vhx7kbdnvi52seq9xajlnn65earp9242a60azcw4llqs2fliu1inpy2m8d00h6puybqim404',
                
                flowComponent: 'reaekmmzmm67xwvuhzockuzqc3rwm3b4puntq6k3g9wvh7ajmxcv83sohr6k6i6yvq7y9fqc2m92xhkpq3l8f2xnphgmyy3i4u0m0vbudgbior6ab1cxueko5rti6qkpmsp1rgvfqyjq0022ctrkcereiya5zdh4',
                flowInterfaceName: 'qlklesfbyg6qt1raaxjxs6bw4wxwx0dfledfsn8vvmn2vzx6ww94mcoo1bpsz2ae4vw4bvl93r705bcz7too9saqdj9cetdadn0izz10puk7zcq32g62lxu1v1sdl6hpu1v6wpf6fscpw6ijskjw6y2z8klxg419',
                flowInterfaceNamespace: 'fand0np4onut1ackyf0p9v7yv8jam01tdhm0rp3hujawkgzhq3tfeaf6f03yv1nnawwu5lpmaem9r3nt87ecq679p24mo86ljv5mp0l528kh6c63q9dmdg7ehd8t64efbpnph39sovfaa1vfdfk84pucowkot3xf',
                adapterType: 'wma3ecutfnf3cvecxbiye6c83efpigbk1hxvgxp2jg0u10ca8ouk9rh5cvzh',
                direction: 'RECEIVER',
                transportProtocol: 'lhoys0sdcb7htqs5l1s3u0b6xl7jougsd51k227frtd11moc1nccp3hqphld',
                messageProtocol: 'u9frdkyazodfrd805fygyq40pxceymht0dzl2e5ci5sz77lr4fiu7v8jxrdt',
                adapterEngineName: 'aklalykq9qnp7j0z8d49b38kn3hw8kld9e6plsptyivujz0n196mz630v4qvxq8k1diq95glk6rt47iagyn5clmsfhirsvs0fhuvkrzj83to6k43r39oapysyap22ggt458qgoogwk5h87csupdv32qswh6e4s8t',
                url: 'sreuemxd98uacqzupx5t3gppaumq5qz5yif8jtx3apcbgngkxlsmyd98mgqvukk3hslbnnh7t0dlqya8gc3zdgi6jnpm2hhd92sy4jxc5z6nbo146uafsgld0iph7wh9jv86z3gv2tmm78la8cs7ugnedymblj4g5gejcomms0k9qebll8pjwdcjeabpcw6rioipt89nceqkr9c2yuf16bmosqskp1jtjk6g1ou6tgf5nmdh5bne6gswdx1scei2nhzmnaaew78stq4fupd6d6thio1dl0rqs9hoz3v9i2d1vpzq408v63qq5cwe98mx',
                username: 'l9n6tzxslnk13l140pbumfu394qggt11lkixd3wvhoq7n41tpf7eiqmqmywo',
                remoteHost: 'q3383xvuarhnivvykdt7ak4khf8lzlmt0j1f3tcz5xk5o2a91h3ihpiu66o9s0gr3pnd3ln2mcxenl3lticmt0lj6qvpxnn4smm6imu4o31w3fllpwtidvlo2hrjhqobhd2o9516ix5wa0pdqqw6snjpcoxlfmx1',
                remotePort: 3014772258,
                directory: '1k20xpsh91tfrd6en5vfzczarsdyzzlrvvzved00f7ey62gor8e716p3vqdlhowdc90ia8cmy7itb2ksqy3vdx8deuo7n6ivfrfacjesbib9ra85rzydxr55nkgvn20hx8r4k2z25zhwzg2rfyra220i9psf8cwner0epkuc37pby7m962eyx9r456e776ldq3xj14h9e4i0ekueslh2lr2ckalz88q6mkxy0hp6gmo9u3ov34l6hdubton6sg1dg6oqld44fmx3syiz7w55vum3ztj1egp3b9ewmkvei4db7s6wow990jl4hi5xwh6m22ijv7dpkecgmo7zu0ensvfn82u2mg9kl07o4op70af2xvq9dtp1tiniw3dznpglkx2dgmph9ae7bkcx0jjbf1wb81b7y5s4q8i3w9ow989u54c27pc68ed7838a95p4ugzwqpd1bo9o3k9iuq1pmvm1qxnapmvsxrea1enuqe824zvo1pi62ofq4008tou6li3jehmdgbfefpgrx4czs2c9lw1jm6y1px893zh6v3lrb56hjaloa4d6minr2jmaitbgsygbuihacy97zurifsuvj4mplj4y8qnqrpjnlpo72nmrk8ibyi90ga5jp1cjv2gwvk3hwla3oh1e04rx9l8hsevidgh02x7o6g60seravk6naxp2e0zi4rpekjkylned0nhxvi7w6wriu8z8lb28jvd7jgarh8tee1l91jq3l02y858mc2c9uu4117ydyaujbuoph5ohl3whpy926u5o0u5wcjz1soaczi6257z48lelqcwdtp832nzofwtpmtzpzwrx6szir1i2pjfrb2vtfhveg06t7m5i7rtwn1uc11w3b0fjqd7krfc57p5ovrqijia2e8wbhks1f4t0ed2uxz4baxjku4dkyb6s8gnkecdbiatmq96jcuglknu1l8tagbysxp7kisv4t0c1l0gh1etooqfusyyicjlifz7if2eerpoit0f0f730i454',
                fileSchema: '4r1h2p1o0ije9f0si38xcn4vj9byq1ubgbex6n9lx12rbdlsmepu3k9tqa4nxyy93fdfffownfpp1br04cu3wh4aatq9wvtwy9q2x0b23n1v7duhgltsbnzh3hnuh1nvb4tfnslefj1fdxk2og525i3b9lfz56ezhpdeg501o1ld5o6kwwmsxyvgils9ogjsidop84mehsal3sdhq203jwy18y5muizypo6uhdvpx1cu4wai6hmyeg2z9du66jtu8df0o5vp2d355l4shbr26zcs4o89tv3wlopobeoziw1hzayjbb5qorwvl8blkt00phonodmmkyq8igbxak95bvtvfjfpvkabj29xsuphj8wwoi3rmdci6g292jt5w6xpj51o2ndnzir6ojia40p48y84nb17kpxiblxink33ao5j80hl67g6xzn4tles6596hpj16b452dtunstq8dkflpg349wphsigyngtjxxundzzki42q4dhm73vvqn2kz1cx9sp6vatsgoe0ath294e2jq63xzcorywbzjet0dmh8unokapil44kr9mvb4nrsy8erpmbql7demxbczrzkev6g82uprxvojqywywckd89wh6cykzhwe9eo9z71dj2natx5485z1wp8w6nx2ac1fmwzn8wq894y1hobl51hjqyqv2eo7d7sa2l97nmhql8fxwt54l0qabbmpztnxudbh55x9o0gqe5zhxxzyfpxwu8gpaqklvv3u6vo8jswjyz7tc9xdy8jucs6ydh8wlt9hrn932efb170itmi8awztn3f7hhziky7jpb3wb3uq1yzwajju79123j6gceuxw891ka3n3hsb7p8oy0vh976aek1ou7bctnzv8p3cqtzempsa7lfev3ogfv8sginub2cwjwt5s9hhcb7qmn3axj5pfa8e2shl7tj35f4smziqmya9k37rvt7tfanjmabbtocxfvl6725nmyy6ri0wfhz1suqpu2yc4x6m1zemyb7ngzwlo',
                proxyHost: 'elfoytfchpl7d6sdi1o3vgdd81rs9blwkmysl8lkuhbgy6vm1vyf6jawsoqv',
                proxyPort: 9453566032,
                destination: '3o1bte6fieqzqejpo59z8qhi439tv5b54ud82gi6za2755vmbkp93x962dgfakw5qw6vkldddtbp4j6gmemebcy5oqts8hzn33jbtbwowtwonk83rr668c5wcfkee137w7czidet649hbuoiddfwlj25v9lx4agc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7yw1f9t3r2egyv8j07f8yxsxfb2bkxjaofhxd855afg8r1rfwmfed9g7dmagy4mer7gh8pez7wngo9vbamrp20utpjtjljqe7q5s6dip1057o8q91glm5rpfwcbjpkay5rvqm3owupw00yrusgr2hh3yv9mp7cpt',
                responsibleUserAccountName: 'nnfs7uq32t906xnuhbry',
                lastChangeUserAccount: 'v58rsmyckkn5y9e2a3gh',
                lastChangedAt: '2020-07-21 18:42:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '86v2svzr3tcerfxdp88csnkf3nuimbh9o4vo5lhz7x7063u2hqkji442m4r6soxtbkvvdcvpmeb6n8buvhik7w5lxo5zupyv9f69fo491o0e5txceral8psgcddak6p8zfksdbyrg8e38yd6hfjft5aleq1x8ip3',
                component: 'vq2tob7pva55qdvwep49ypz0wdosxn3e49h49jjk1j2k0x43c6njjt0d1gbfpqy2jgopjg8eth7bvnnk70zbgkl9m22wpmei50j3y94y9lez1vqpiyxsp7uod5ab29xqhjic7x9fxnqqmq1u827r1rvwd3tw0xus',
                name: 'gfhxmexlr4d6uj2x3plno0d6k297cemtn52bc1ftttdvv094t5eduubbazruh6d527u5w7btxm6vq06sxmm7g4jtmo6a67q4o4ebhc7hns7jr80rfcg03wcft55x3g2kegz9h7mmw83pbhg6wvcr3y2rjdyrxuiv',
                flowParty: '9zfl7oxiiofbtqg75l18q0tee60p203ittlmwj6e3ykjue5bmbf5i2pybm9zfcjktry4nkrx0jmxzel4oc4fpdqxkkzguev9i12j2g7i40vhzdxkbx9bsbhzoslowkdegc0nbv1jwvq904o844brlmw4xfkt3x1b',
                flowComponent: null,
                flowInterfaceName: 'wdguzd7nqw9k3fbglrr9otgj65ppnh5h78jnus70uuw3a7xq8w66kz14jgaji4rv2199lqcmo4bpbffuv1d0g52vfe8ft80a77mqqajp95qogwocvkmt3icvfj13repzs2k3c5k94iv0uowekoi17bvqo07lr4ue',
                flowInterfaceNamespace: 'alkhzgpedspk1nrzm8e09n18dincplzy6w4fkj0g9fxnjkmsfxu6vmzs5wa8alsygax5cwr2k6txbjuujds1jehgia5b992ilc1klq80mc7qz2vtdpjalskc6zx9i0cs2ashurozikw4m0cx0hzmxxenl0fw3vjk',
                adapterType: 'sxc4rdmitpa84qaqsqzrie0tra1rb8liq4mh37fzhlllf7z6xnfh8jb23qp9',
                direction: 'SENDER',
                transportProtocol: '116qmwbzcygjrb89k01sslqgk3o2sgc4g0oohcykpl7gq87xdgvyfp4uof1a',
                messageProtocol: '8f18n96yjhkhkshn3hd0xav3yj67od53oskr7niflwckh46wdt8r4rq083lu',
                adapterEngineName: 'izl4rg10vlvh8iyyqwm53znd41ncmjtz8isuhz5nvvrfrfmlzgjtynuf1xzo5atpjzjleiq2cqbo6rmsjosgd55sebrwnt7puygbxk70ql8eo0jy36z552p9zpxoyolmnzypumlftfjq0tgwdi00w0ze54iiqgy9',
                url: '34oggcxfcc4b22zrohid3h9bnn9lc7d2lvmbmfvaa00cm1vkd52d63fi1q6buby2yl671sunn7gperriplm22ghuywe666dp5e1gx258hcoeik2by87m9fuylv9980488yet5sqs3g4kaole6f4787z62awd792ykmm57wgm8fjhgwdjklatp1wnfcj4azfe3gsw7c3d0avk4kh8pq544l9yj09gisbznmdij6j9bes8o8xnkv47v31fvngjl1g51o7t3urgren1bcx2jbzmw7xtpgv7pq5n2c17tpgpy9om2cpauzfhz8g6xlfrpgiz',
                username: '7vpto1pbrjkuxhbd8pgdwqzn2hyhl59jyh8gfzjqs4akom9atsyb6k08egeo',
                remoteHost: 'e7k24un0oihkl3cffo2ukk8hq99t1mfvml2f755i3kn7wp8v1m8nlrd8kgv9dvp1ly5qgfgobnkx0idix7ruh1t6flg8tvoc6v3zmq6xwpjkxxkv0w1sndl3eah2eqy53a095eqw5b4wwda2uyj5cu6cju945nky',
                remotePort: 9191983408,
                directory: 's6v02bk8qygfyst6qcg3lkgnkg3qfwnqat9yzonacb9qqxb4rqto84qhzo0gfwgdcxtztvy9xiu5fofm95w6sb6nw3zl5g4vi1330ez30rv93t2bd6yay8mpoghyxvorlf72zd6voqey2x6i4mzbhlsfxpdf83uj2x1p513xmsvn1p31az4akvsgt2m58rr2yty6yj3ex2mhrlq52hg8msnlul22i1jisjwnviufjveh3386evlg0omwpe0alkpr1djjuynqo22iwu9yjz5ratykezvgrcjlmly8977vznjxchf78t8h164wjle1x05kquxn9ll2bibauz9wyjdph21ykt4zyereesoz10p14imblrfw4gj9e7mv8gpj5wvbzfvli0irah5zdqezjcp4zvk92w2ulz890pww63cv5utbkg5j2p2jpuj2tpm9le88q9bpfgqqmo6fw2re8uq5xdk73rqsz3a26a5yryfbfl03eeet36eszy1y2z7l1v8jblb1vrudp1q5q1cjynkqs4ybidhh9pevrogi98zg0zrc9v2wbibhsrf8nhk9joa4xh6f37gushlg7xpqevd416dd7q8nlxetldzxso0kmy52d1cfjcwv3g05tldt4s4m6qlzdohgrse5mwtv7qd086l5lxh5i8elurpzvmmuop9zarsoz9h1hzapavbctmxpoy4pwulgt90s8ffjctzkj5pd2kg5fkkogta346co6zc4ayn2nl5y8537rwt4tmjigsl9bqq5wb49r4jgj30g1tex3bq1b399636nvhm6snqftytlgsg00b6wmu2cacuabsg2585sxxk451pzv25bhspt133aeoxghjolk16j4dd4ijsug9kp0eew18sr44nw2trflh1116ks8n7axuk52f1eet0b2lyv7gtlgui3p01b2xq6iscxy7emz9nc4yldvvjyase3ibfs88if2v6at6s88fyhgpvm8h5cy22af8443vado87ugeirf3l7bxfp',
                fileSchema: 'eg0xhl9sqxwcj83k9p2hpoqis1f55qj5csggz0mqmumxbrm6lv93zlgupbba69ql9va96ix37cm0w894hfbsg7x1daformafpiel1i9gwx2ghyi5wacgksq1h80wixi710gdv5uyu9qalnku9vhx8y1btlpn2ho67mcft9sao7vqwozu6njsoaxlh5vrunmn7gfhyl5tn5w73ruualhn3c89e4eeskxoqug8uo2zndb7ltp8yuv9flafy5y7a18eag90reecjzq4jqo9u4knuije0puq8zi8jjdb87fmaf01tv18igyog0fy1j8v441mmqk21y9rnp7vmq0z24fat1pg2jycjvctt9ijk81phkr167opv3vjz0stpdk0h3mzvh9frh03hpjb0aoer9k8fnrbgseicz6nv68xffqaki5gcm5mpck2vn16qn5mptoq7se83gy1vpuqev31bwryjohd1w67yfrzwf494ydvxj53p8f4jfxgq3ljiq3eoi3je5o4e9aajwwcdiy4oczyi00hzqvbneiyhtskji93um8bkfd6c5aj9gfhylahkps2ub4wspoxad3ni0qehlcap9ivyx4rfdxy8kws9lauchd3mn19dtouwrqaq0caeobh6o78frlx3kc25jud1lhxzv2ea7cncj3k7qtyr2pytcn6klnbxzlc8zm21ia51ubq6ay1bfcb9y77juo5e7qej77ajq5kcv58snkl1snpcqd18bkeabrhy6sti28rejozebk72v5ejr4hlcjkjqexm7y3154q7razi6xpicyxt37seihtt0vg0chzn7f0xfuadabbm0esx69ealo7py9xke7bxxhreuwul3c2ykk9h6qi1i999tb2kozljwf9kq0phe14kxicflod0yjdprmgarekmn1g9xjz064a0tpdct27kh374u5g5yhdz02frmrw92aphlw9luth140gcwoxv3u60efmr76oo5w0fhyldk8xcfa86umhxbqrlxtppyr2',
                proxyHost: '2p6i2a8e6kirdd1274ip9zr6f7g6npxc6xcq2l64y9rhip64pj0h86j9uv5a',
                proxyPort: 1946708161,
                destination: 'wk6ndzwws1ni8dmgygnftkko6intfuc9bf7ebfvgc0y634oz14y58kad2qc4ccmpk3gznnvpr9yf1vv36opujbijtax0d8jf8cxcqeam2fllls4zja9dqwiqrbx5vpl09phfyni6obgmg7t3mwij748ip97r6ncx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kcd1zk6anez9k0tt4v3ly1prypnhnziqowlvw1xb9pd40imftbaakvhnqdcr9n2thu5422kb1ur4ohy8oqdin0sf0vjdrijcpt6s2a548xbt8rjzy3g70qht6o71bmbraeuybt93trtio69pol6w1nkc6tmojcpc',
                responsibleUserAccountName: 'symk8axjm1vvr0m134k1',
                lastChangeUserAccount: '4rtspaofq76rser6tga1',
                lastChangedAt: '2020-07-21 09:45:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '71fkij4pcup7lb3ufpong0bjtt1ra3wzacwuwyrqsnly0tgvwtp4pdg5gwo3zs24mehj4ltcxyh0ql5s8af1cmvpyq14pnetlmngv0e8toaog8zcjmah4uznkei8u84i0xv1kcp1noybu2xg1h4pyhqjggp0p52k',
                component: 'xqto8fkogugph3gxxo99ead5e1x811odgkw6kp6v8ca2bjce4ikjtplj78empttx4nk0ujf9mlh5mrhobw5zdv53kvbphqunj5os1a3pom4e0jtjqe5l33lfefo4xpz2ychqfbnj5xcep96zkii90y0wnxa88mes',
                name: 'lm03jima8l47clhvq7ryzug45khzmq5iz48dxqvhuhamv5k86f8av2hl0tysbl8e2fbtfyff6dd16s9wwv3abxxzhzskaapzilrv6mtdtjyrrbentgpvvdnmutub034rgwsnxjgojs68kud4hyqkf9iryyuqoukw',
                flowParty: 'fw8fny6lb9zuvapzsb1goorc8uq0eamoq5763l0pf08fb3rglz26kaeyhlw1zbj50l2xbw55035sv37btr1fqrvpjpnc6k02ff06sh4cxp6jtwv6teu861le28un01dppj3megs7rh8il3f7d962040nsgvf2omk',
                
                flowInterfaceName: 'tb74rf1sqaq4k653xr0zsv436l5vfcbp2736e4x93hqcs2nmk97qeygselbh6ehiblk2iopa8odsproovp4qlxb5q86ao7l9563ejtmk554humjsjxmqo2rqt3qw64ln49yks5m19l9sxm6t91d63spnccza8y1i',
                flowInterfaceNamespace: '515enldslmdi57nqth8wo8z5qpg1evxwyhve1gf6d7wtoyyd4hoxrsrkz22mfx4x8w5g0ufu9x84y483wjkx6qcbep41usagqx1akq9fvlyeg72q1g415exe0wgju5urhr1u0yi54tq5c6s88bvcmufr3gp0t0v2',
                adapterType: 'b47yw8onlov3hsvpj1jgsekwxv3gunqa3lzgayp142zvaldfuln2198vzky6',
                direction: 'RECEIVER',
                transportProtocol: 'twm38bvqrxqn5zapczf2jrachatddo4qgoymbc29bjzujp4ooj37aouqlyvc',
                messageProtocol: 'tg1l3izgwjpupx4csd29ocikhma42imh8pmi424zqqo15c8500dp33zdga6g',
                adapterEngineName: 'yxw4joyteyvqog1umbrtz6z2xm1c8w7xobytd9yneqzza3auum7v44xqgplw3k59u88qakv24zt314jkglx4joixl75duan6r1x9pq8314zt3vhbvc5v3vx96dv9hasfqv8cgpgs3btahesv7m905zr5fqy60ok7',
                url: '45iuj32depiqsayeydwodiruvp2l5yae4z8b239hbo4xfo6msrz51lknc3h1pavwxnpgiaewienpo1erzsg9df7sejnnxvh77rlnw99r2q0sajbj90qpi4nfivd89zootxq7i7jn46myze05q9t8ezyoe49fn3r48a9d6pie2zcx8bifofyi3a0jyahmfhpv764ajnhqlk2d63fiqoy2rzw4gyw0uq695sp8606m4dphjnjzvl8foyv4wp9hfeqjhlx5amt64k1j8brlsvp35ba8d3zzkdts0337kk788s9qzmht8k2s40utp797vl5q',
                username: 'o625o5bsidxpqw8cyvsqp5dodfvb0rbjy39l2qwuu76ftu5p6bzacfy764mg',
                remoteHost: 'uguuv0sp5v0sd2pet4rse48fp7sqnpt8umum3dptrai3gni2qafdkpke2jucad0rt152tm0hmluysrso1jqentce0542g14qrvgvw5s0v65y8swqbvuhfqu6z56746d76b0oodovxcw8haja68hr4ctzowhqmllj',
                remotePort: 6126262772,
                directory: 'erjc148016x12h2370udvwrlekfbdww59oadauwfebgdg170fuwzch9ekr3aib9hfnm6epa8etfiq37xjso0w70ppeiw9ekslegb2d18il3jzg80gr129ycq4lsl1zkubczz95iu4z6hwsqcreqluc9llog418u8o8jow9kj7zp1wpf4atgaf9t410yvnwx0wpazms9yksvbhre8ri4rxhsytgd6l36x00iqvk2j6eqsthpfniljbkedpsfy4ru6phyt05ps7rpbjdcdqfnpoogohii1aukrqot99r2sza41i9l7l1nuo1vlw9zzx4g8mh9lcpwxpl91p2r02tlcv4y5pc7kj4zclgowhu96xb2bw1kok0lvlan321ycatvnt6ggr388tpzx3js70wp0c9qe9qob4sbd0xchs209n47g0whhk63wauw1w7b96ti2lgjidcn6l8pbsh4yl5a5rrmyf6qslm6xbt6bc55edqc7j2e3tbofjgp0el05vgqygs7ftlxq9s31fllwycau549355i0030b3ser92qt36cr5309mgsw37xj44bk177f55f99ofqj2tie4b9brf7t85wamoui2tfi7icucbjjjg1d3u1qlov1y073xss5eelta6q7lb6tqqk1adk7xp3fmw7kp40daoalrl14rp0at6ah6oieozkldaose3294t8ivn3we8qracr5ohjuludgo9pn7ftl71slo6cdeoe9oofhmfeudsk05qycbfzvruzuwdjamx8iapk07gyse66ii6tv92j0qbaixnco0asl25te3x49o3b01063daebg0vk5frrfus1z87zt0r2ixm1jsjoa1upd1ntoo66ni6gblnces469zsb0yvioa2bycix4j181g4fap2d8yb50rv38cx5y2gx0afxaegs6xg315g7nxi2yk5t4k52396gswpon7qmzgqlh5fgohvgnyn1xownq8q9rwhfrq93fj3geklvqzanxpo62y1u2vvycui',
                fileSchema: '5lkst804kauchkgrj0ilidbzh2bqigwgcoftvt2871cq5jrn9mhnow7fn58e83dv90fs97bdqamzq1amlgy5cvtr1kvy7dk6v4qd7ixrmpjkbmju3ldxlfker60fkp15yk1mqcjz3omaadaaxq73g9ximc1gg1jl7vcgvh6uae23rp5uczeywegbvzdneowpcgujc2lhl7lqexdlns0qlt3fist4nxsyc18eborulprgashouz1vomq3izjwurw7khe7s8p28kwhui1fd87191yf3qx7zwdwiffn8iau9cd07seu04t19iao4zm61b8t31tpfaskick7irxse46fxuib9o8kwtmli6h920w3p2tb5srnfltfda5vnr9u0q2hpgml7vaiu8l990d8k83b7vbnsmdjw5n12zc5qfds2m2bggqryctgf93x25hw0ll7mdrwcf4i6wx7860fmkzdp661s3lb0o6md5eadzkov6kclhiiwhwhlga0yqfm3mdpn36zdge7oe7s5atiic58qa2sr8lrfkcrvpbyyme0i3pqust48lt4ayhnardv6hwgao4ffbihobxf50cr4rbp1l831hz2oa2yydju2y9y2vsyh1tk1rcqfuo60d9o6n9bxlrzf7ftnauis226hnwcr2kisuzl55kdcttu607qgth74y02whf43ik2a1ke8wq55hrz60qaf6207gnwf9m9qgd3lvh8zyck68a5se7mx700upm6vhtmksusnm60fulzannimq8yw0950qxhuoz95et4uus0tp8j51y41hrtpki436t7s61sa89c0u99dj7y7ko92qekzfdal0erho25kzpits7temff96okopyvs1cr9jafsk98k2ht62lmzetyez09vrsy5r7eckhc3k687idlt8u3pj63geurkavboonh0d12y0njkef8pvjbco8un0e1ogrq93l52mtbpflr5eou2o343oohf8s0jpwk4fvyajon3wbzritswcexcsf2',
                proxyHost: 'pwhovegw2y2i0f7wjf39uu9usb0xwtbqs19azmbpzpp1dribrwh1yp35sjs5',
                proxyPort: 4805766931,
                destination: 'bld4btgnj90qv7gez05h7137kxkfkcsjv5wmz31wd7crmndgo6de06glnmbkyts42t8pn55aacx5ntk33svv9txd2o12y5p83mon92u1ito817boo15ue5wbtikren5chxx6rsxc7ak1m0yvtvbc4kivfhn4wv64',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f71nl6uciu4y0q1m8el132cd1enilrkjkniq6fluu48khv3ctc6bsrv7uzhv7v58q9cb2elue3n0pjkbegs9wavva13xvu8c5flilgq6rw00gfdr9ot8npxngnnzar3sw8opy1y0i44y7djadn43tjze7jyt6zau',
                responsibleUserAccountName: '7nc2whq3hbef17vk7fsh',
                lastChangeUserAccount: 'xj4q8fer9pbs2oqej4lb',
                lastChangedAt: '2020-07-21 07:35:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'wiud6rn698wgmlu6e0m0v7dncjjwhrogsuxlxx7ga97nemi4qsflv0xvx05gnw4v6pntyyijow0pi6gl10m2cpry41gybj2guz4jpcojym3grtyfkviidjvcrya34zbuqfy7ddky0ubza8y2j1g1w5r39u644r63',
                component: '460i1o2uoc57remcts69qj5lcl4bb8vbv93at9csu2i4elh8b0v3kavrzd5v1vsl4c452v37dcaqleblvksogz0vp0jref5nkmzvcc7vp8k3okh90kvmuotdzdmoor8swx68o637j9rbax1yzzc0q4uiy8bwcsvl',
                name: '5gezia2qdee5vvmbxv5lapvjjzv12icj8e24iyivn7khrwdhf16tvaaa7mfmh9h2dwb19cfi53n1kyyvv109w1oh2kakwuu49u7zcn26sb035qkostzdphccitlw3osgiunu25999vthr6sbcj8wtjhxf3zoeqjy',
                flowParty: 'il1gzpsa9bivrf4fnd6rw563qjki39fr8lv6c25fg4o1q2z9lehybbae2is1pcr0izm0zaagrc12c2jsjgvzlqm853v7aea33ausz2cd1gc80pp4hp3l9wb238dt09qjnbhzb3idz7piwvlv0g3sxbes0figlnb0',
                flowComponent: '2ce7t9npcidgpia46myu53qbmrb0iuzlwxqhd830mzq65qfw3doxih55gulzyd6qfbd8kexb9utxjxegk8n0kb5k5rd21at23h4gb0nwbclv2ol58ftngdcarvuz0a1mb1fb2zltdfi582h6i002y2r4s0dno910',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'z0v0q4vq4yvh976gbplzlz2dahqy9g48ve3txf63g6d88uhq2nt4grdf8qzw205ayczi7ijfw5qtl9ivsgjwasdtds1smvqrkjh6g6vgdtctucwv43rdforvutjifl1aogoyt185vcm9polvif19agp38ryq2zb7',
                adapterType: 'm745gowh87g6du46e7oilcmojh5cc2eranahttocb3o3hgd86slz1sjt81ot',
                direction: 'SENDER',
                transportProtocol: 'kshftoo4ht9y0tm34dc3wqj9ecgqz7pae39qs8z2hby4mi39sfnalkysm4b9',
                messageProtocol: 'w8t0c6gthdo98ygs4dr8a4ft8esxgzxm3810c92x3bv20k4w68mrmt2efng6',
                adapterEngineName: 'f252lytms57hy1s5j2w26ed3gljiwpni7zjor2mla8bv2qrk807i14ce2rw3zhun16wsbxrxcj9i1y3e3hns4ukxbq5vjkksffg9j4a0qblkncczmi879puzv3ypyyrmgb3f2k72wxpdgkx0tsiobme53na0bxdp',
                url: 'l6xafcwp5px2dr54sfog7dm1z6wzvr24x07q7muwu0v2e32s1m1y6brohy2niwczrsunjrbggsv9hgv6i3qcddf3wkelaem51krkmkewuhpsfi86071y7i5pjfmrxtiu85dlkkuc4v0i9hd6nmmfokry8w2nugshpugx2blf1n1dyorvvrmgfy0v4rppylqy9yo85oxghhk8vfdromii7j8yx2h2wcwymkvw2uskfhxemqv3kaowhbn0bdxse6bv5x8stol4sfydg7s60ub9n2og3mocxlznx432txmd5hc3y5pk0ko8vz5a5w37r1sp',
                username: '2lyyqdejquqfuf00r299qxhq4zh1c5u2kclg2z5n8uujxm32k3807xtoai5x',
                remoteHost: '9djsjp487qyo2qd1tthxsuasy01u9wji3wmxvpsve13oxadsr1i12ljf7j4wa6543bw82bken7duk9c7ppqimxix5oiqrois1oh9n4gjnraqy2nnf09toj39p34fr3bh4mmyukueut3fkbnx5tlc06m9y4a19kd6',
                remotePort: 4082732770,
                directory: 'ul6z8stqj2rvt7eqj5lsmdse9ld49oluy4i18e9raiv5n0t0bz3npkzheajibx06n82z8sy1sr8d1ehh2te2rcrqh32lq08s2mrehy5yiyjdjosq4ynpqqd0g5dj49l81zwkur0v5gs15yhwjspa8rmrrzfy4dlxqt4ndihzwekupyqklndijoixn3bc17xksdwombk45jyhin9jq95jvwmoi09m5re8p9awccc2us9y84glyn11yt4reu8cgtmck6qt0fjp9dy1376oztakk173oajudjijmkc4ujewrys2rxryvxvd3yeap6ieyw79vuz1d0t67jrrkjur9gp6r24zmzq853z0tuux9j9fp4puijcblns4r9aiw7akeosi7psn3cnz0bd1cpeijqhizvppnmsraxwz1h49ill529kouxna00ale4cugqhatokv3od2jq7vjza6husuz93tq41un55bb2bf18g2surd9l34ggsl07gq5l3flfpy0p53di488qdmqjfiu14kh5dxe6gb8lj9wd1c3s1l5av696n7b0c2ktxy52427eqwcspjey5khcozlw2juvx7vmi2o18sbalso234myzls876x2nict0f55id0iame4yq6wv1r7gqupiv8hgaoddiylc3ajpbuphnq7xgdfjkn1ttwr8b0u3xi0rcwadee54r3vlu6hlkamd98mlcfxq2xxdm2l4cza6isz9ta6snm6o4mysxko2gr6ct6u5967z0n1xde378zci5vtwaxf58gco2y12uesrudz93y2r3z2e19my1fxsha9utjjqct4xa2qwx2d38m84fkqcgp7hd8i0he04ecj7rli2kmkqknvu2rxusrqj3huf5tgt77j33qvfiu2f8yluv0fznbqi879p24xuzn82k9ckyvvu802hk3k2cs1ik4l13x30umnyxsdnpv7ln0ozvf3mecypxf6xur8yfszhrze9h7frcu011t2w4vc1r5kazca40q9od3zz0',
                fileSchema: 'evgw6yn1r87enc9fi0mbiobakvq5157di1qpm3ft2ta7dguhxibgi2vp42g498hehnu5egis702taxbzl7k4urb8cje4z6snemw6gl96hs3xfm5cbrekfe44vivg1y8t0qhgipkf6nnyx64hft8uc7wzx61wnee5si477cmjbfdzjwfm3h82dsrsjzyk31ic90evo0vaxhr0266cmfuy5whso6lc49iybqfl4r21b17fdtr2jr9kluqq8fipe7n7ohq0sg5oph27ps0pspb1yzdej3pkqkwoils4ay1pzi47xj1cbsyhcdtb5c5r9gzt6v55pcmc1sp66u4tqk9r3y99z4kl68ravbx0xcafqrk9hfetl42y7bvqpqm0watnwatlc4haxh2x36vsbiak7cv1rxw30ia2zmiw64dley2m8eb83f1p4nrcld8wl9x6dh9mpwzmrfy38x2iay3if7907trwnpqe14ek87gx3ed8oclph6c0ox89fi025zorot4g9mezfow11l8e2lkiwvw9apdipzv10589xiq7g98bcr9rpphnrhckinzc3ezkmt3r7ri5u8to4zvh2tacsm7w0czjoaomwajdfuxdjojk7ql8g8u07jo48k4chk98v6i4b044b4plngfg2yagdurg10m90636qygghx34e4rv530u8pa82mynz3h1l05r88nqszfaiqcq0s10hkfs902yl5dnxxxhx1shy2y200zb5bkl0qephshouqyewroo2gv02zn7dt6xeymibim9kzux6m6mpmdcob93t08kc46i3kp6dhmj74wn9ivrte3e0hlg6ysnltu2brg8j6xi6j0w11tyww3jv8rcxm1ts0f0sm64fngzrkgzhmdujjypnpzue6abr7vev5kvr983if7t17ace08x88p4fmztudm5zkj4axdumt5w83xjvp7hexjdmse5roasagcn1h043ysefe1vrd87uupczk1y4sthv22k12cqkarwj8kem5cb',
                proxyHost: 'if16ftjpf4ghv4o8b1apt7afcv3x8n3julgrj0un7jr3e07nt75i8oejjycj',
                proxyPort: 6286079254,
                destination: 'ov1vuu92fs08ki53zaiuczlmfznrka29dvqz3tvve7gd7rw013rufcr3ceuhzugdmeytlo6i5tyc8azomt5b1n14x8j964zrc44ptt7c8lc2ybv37plo82sha1vli0g7qn4w68lw2p0wcgtm7jl19fqq0utsd3oe',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vs8rjoo4i4c0tr06scscz7rtxr7gomks3qedfxc7vm9w38w54erf9nfo8ip87dm7iaylginb9ycjh0n18gqqsuv0kucymn66uq5oztlw1aow9e0oyytyz1hagrhaq5r2smb4k2lz00jvzoeicanuo0b1sqyu9vau',
                responsibleUserAccountName: 'chsu8l1mgt83n10eeydr',
                lastChangeUserAccount: '4nqitoqv7j7e3j94aqoh',
                lastChangedAt: '2020-07-21 22:44:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'qrhmgfpsr199bmwycy5dezu7damqbt2kk83rh0n2tqxmvvhts5d2h23f7hk74qqigvhzsgwocphm4s0j4pg2jvmvjrbw7r9928ph0d1tvzief9e5hyfo7xww5ajawhopgueaaqv00weqj82rblci0cpvlnhp2lxs',
                component: '4ttwh3my39y3yvhraq43r2lvdgs1in5dra5lx1uxsclr342y2lwseo67c9ox7ypklm2fg8tbxvouuq6f8g9vgh7itdm5qox4pvlhq2qqm98vogtat2pib00zlpsniur9jhdmeh01obqifxwdofvrjhmg5sixadji',
                name: 'imk5guui5xy5tmn320ewg7hl5gj8gd6qhkbj2dt1a2fhvy3gsu5t9hoejsfgsmd6h32mbpy6gha7y9c608rxachyai3r3pl0rd8bhvdk57pyhdi36b1dq95elt9qgobk1lovicmjqtyb4ia9kflzt28hxslayv8x',
                flowParty: '18sq3tty4ch8tqgq46c7ccooftmv2isj69k61yo9sv4eg76su2fhj426sgss6yy1bjboi05mk1yrxq8myaofvysbg3liwh98l1c813em4fbp8oil72c25koctlgdp3zn8ugou1h1gj5oqc2jbxb7udj6rxltahqd',
                flowComponent: '2zn0skmo1wfutr8fnsv0q7a8f8gh9z2coq5v3w6rxaudk3sx2ptapo7xqsievza3nyaobvmqr6726w5f31uiz1ckfajlez8k3bpnj2n8osg1jwqnif6n7sgi4mtz7g2xfeymwxonrtpig2w7mvx4mrcx89g3p403',
                
                flowInterfaceNamespace: 'm8dtsgr2hfl9c6z0qu7zoosaix7bb0nhz24g8yw47z4r3w78q0hc2mk7q55kkuvrpb2tqcfl7lvxgllrqxw1t2e5gx5ycpgm231bhwiqihvi13w2jl5ejacbpbjcvtgmzi1y27fblequ0eae2y8m7nytmkm5fw8z',
                adapterType: 'q6wbv3v29g6kjs9lbhkgs7uggko0ojjtzktlrrkft0g9ue4dmid4uv6gfh6b',
                direction: 'SENDER',
                transportProtocol: 'gayafcwzj4bwosr9hmarmodi4fnss1xgmrylec8nai0o4kg4gb8pf7xyhges',
                messageProtocol: '8jgqbufmvnhlmkqojc42iqfm38h4biidltt02kzrhsgnl5rx7t29bforidg5',
                adapterEngineName: 'a4ghy1z9azkeljtgldmll9h8s7muexkug5o991b44ztrpqjwsrxbgbg3w2u6xizrxxa3z34d5tph6py29c2w2zzxg9yuu9pfstt0kuy7x7yfh290prlx1qcwh776yeu4ox4vfkanyzr16mzdbedjleree7uo943l',
                url: 'd0p6cwvwx61c16j6mfzw33agp2sqdm95yv4tdv4d8dmtff9bka9d0gs9040ncbxyxpkl6g9obse6ulrpghzsb42r58ur2xp6dco3kw5wrtp9biuqn5lksy0s7na16k9te1x6i505hekndor6gjm2cl37w2320h4o9zvhsv01cl6yutib7kr1gdfs4kljrgpxz4ipuu3n02h9im1vwttxrd5ogksrfsud2s23bo6mv6o01h3j8751ilugb8bv2y2smytt6xfzee7ybq6cg0cd1ot90kdwqj5uo741yp13bxgeyl1cm2kxh1q8aqr5gabu',
                username: 'z0uf7iquq7k141ck5yil9zv3z3pxnh779qqty9ejrrtp9tjclhn6toli8dtn',
                remoteHost: 'nxhpfhu2yv1o9widwptp07i17zhovax0splvia4l1qlbyrgo70q11vcvh16rri0gpj4tyb9538t9tuc6wit12oo71phz0vpl9wfc7t7x51mq2olyurd3gqt39czgm3gb8pepsrgwsbpzc9yv502xs1qz6g0bojij',
                remotePort: 5158286821,
                directory: 'auiplackjwsek33b8lz7xgaf2yn55cvjr3m4qeacv3051m7tyhtt60d1mqf91f6jkrnnwj1xcf4izrli9ifncsk4mc0crvukogdml22lqiqh8rqukvy264cz1xk0h2sahqa190ekp98c441ewfnpuozr1rxdj9x5pip0ur13jkkv0t2q8cek0fcpflcwdtq34zi671jfi5uc4dcg2tyy1eso6312jj5cic1dvwcshtrl28rtthm32ul84cl21avs5e815jkpar6jhfnjk76ss5hbxxphh16wf109tobe6qfp648ubsvo44e4hzfitw7271hbof3dc3761visgil15nwg3iprz8d5xeausvypufkuq5kafxvore5n340t71464n92qtm0xlwbt9gcit02ojt8czm0nr4vuvgowwcnxqk5dxwzbosd371awxnws8v13jzi16cwp57okegtnxcre7s41lz6olizmn3gbd8tcfdg8r7odjbfv7ftey7nt2rr6bpisofzk08h7z6ik9h2kvbedbqqzogk7hor8ebziajbievd79drsrx43o6wq7pbkbszakzmrg2p4hykc4lserwbcihbvo3lp4n4jxgaxti6dq2t7varmtk12dje36crad72uncvwemakhnmp7441h8dtkedo438pkk7rfgh3ti6ta0fb1ssk9adk4rc6ai2yhp84ks93webgsfu0fhduafowewcoruhkxztu59ya87xlqsd3ohn9xngxvdmiwi07kxfrnuf879rh2kisdbcip445d9nu3r4t3ivts1qtmk30vxiys4rwxdbbj3pa83ax9yvf73a93f12kh4slhg0w2tk67yogeggwdujqu6ln9w7vx6fzx5ti8clsct3sc4clv9a9njyqku351o7t4bfl1t7oi2u0azgt7t38i3p232s6t8hjd0owy96jj9fj63bmygbz75k8nrzyew2ay1jipdrm8pq3b2vag7a3a6cemu8j3zni7bwmx93qrbkrht',
                fileSchema: 'ivx1v2iplrhvghn9gngz2f7td1csg287dpr1vikuoeoyjas6ltvuqh8cnpm3qx1do2f2ezlzhw6v9wzefbu2k9ui9ns9vz72m8cvofbdry6prznfkihi7yuueeix07pk4lh3b9tq2zgpcfwkqaaac14xmkd61i7n8tlgjmj2ejkj6ryhmeqagfzwxf0z3la81f6nbygxm17444833isxyms3mtgc38polqgkhl7u3f7e0h62jhw91lqlv7d7slnjppnche93xnb0gkfzud5swxx0wapn29x7seh0m2rrzppncjhldpyr565aoncwxwlhw1j1aj0vro7o19bxsoq4ubcij7zhx5zm05b3wdhiwtv3dkdald5onu0yi7mdvaowp6atpyw5xt2t6n0t96u3v2y9vv18pe385m6a1yobq7bfwcqwpd9ddegyfm0ub1qusi8jvwr7gldnfpczn5o60n94p05neah8kxj6pw5b4bbuwjgtp21dao6lbnfgdxhbiqmwhkcmenq48xv84h6jhcfkhiy1kwi1khpx476c3b5fy2gdeu40hjd1fasfy63wdahwdlpw59mnyrrfmjok0m8w358a4zn4gwzd8ffeybi1z07qcz4jydxbkso2vwne67rxw34kgxhv98v9xe879ieczgih45wpxz1jymzqraeynybx3juruv43h22s5m8gw6l2tdlzdw4qmoexdw01s031ssj8vucy9vm3li37h3zxctqaxh1bqbay4p93kfgccmta7mfqsh54fiuddiqi5u16pdmmgwmf11rv3rpqmpbo2zqqjwpvunrnk7bs0owz35byc2dfjxi6jxj5ix8ddyywz5gc2oi64hym8deeimwnfdud1k5oa8xibkyfbx4gr4d8r54l7yuh4xbxgxwg4msqxo5a1zp2cuylzcu2dzne12cibved35x4qoahp68u08nqf7yfiybmi2luwhmwev11og3vh68pscw90ja4kdjh0vfflwcjray1l0yhg2jx',
                proxyHost: '1e222jtss7ch1g63eoji4k4xc2htc1rmgxjtzfifz06r5eb2q72mgzsnv3da',
                proxyPort: 5575389973,
                destination: 'ey7ioe5mg6s8ednkshvfhtt7332j5vkeste0qae7x8enwo9zl772cfr6nybm54qtav9lwwuea081kcgz2ubtt9oj5875ak67gfmh6wj813qhnklrl1oe1nsetb987zjqdmhfmv03e1x9feuvhksp5bpndslqpmjj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mwd9gudrwpl58wxa2srgjjj464qkztt4o1l3cggcnzppuy7m9ejsaq8qq0c8hwdgmhqsvf07iy66m41xp73mz5gwwzll4avgra2hnyp15z9irsmzptdw9lsegrihzwy8vaunsyll5gkaegp4rae2x363zu10pflc',
                responsibleUserAccountName: 'dttgt20k4q7qek84l3ya',
                lastChangeUserAccount: '63u5f081jbsmbqhf8xn2',
                lastChangedAt: '2020-07-21 23:00:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'ip1dzl76ouw5w5smyf89apnp44lqv1nzdzwwjyitms1jejbdcvmudg0h25a4vtg3pf9sohqlmd937pvavv0l4bcbdbeh12t06hm75s942wekaef0plevn23jzy4la9o7f69268uhasixj1azw0pz7fvoxmz8wccv',
                component: '16dsp2h0cpcdooly7e6bdouwyu809sbxbwvs9m5sahdb4o9fgtu383k4ubi5oej6v77u6rhihc7750q0rpzo27mvq7vvg5hf7cod4f8zfcw0yj9eezujvcmah885aeu024xa2zk1vwc2dybvp2wbssitrhyie5bp',
                name: 'rt0538v6lw6kxhmrty7we5sgzyn9j0d3lpd0tib6x5xhnoltao5zrwhhteq8qtwh1160ate4pwc5r630db8p26iuutnzvvon3pt0rhkb7033vv29aptsbiejh98smbc56jup94qunxk76u2vomevp0i9rd5qnwbd',
                flowParty: 'eymp57p932igfacfdj287l3oxlaau0z3zit3l4xp9778qx5xr9fccx8s7enb18y1du709wolmj1ufc31sc5of79yhu6al83kiz6fdc9z3luc843f8tp05cf4qn92zmmzsk0w8e4iwriffjv40j3esppszopxe77c',
                flowComponent: '4hc9g62cmai0s1l2sho1hvchcnevz6lw7srcjp6dp3qz4cpv300qimrci8atlijytin4gqaoouthe74g8vw1ifuxx8vwq498poercb7lik63szrs7bos0jyssahozmakdk64dbg03ztfet6rsrr5epjskiezj45h',
                flowInterfaceName: '5xn5bmktt91ipgeays7o7wloymrexv5kwwx377lc6onimnlcrdnc28swmbgkqojjotao558eboa6z9beew7t10hwh6zenk0795xwpt8kvydnezz7re9gr3d6fnsfolb9skdi8sfo7yi7zeg865zcttf46jwhqpod',
                flowInterfaceNamespace: null,
                adapterType: '20i2m9plfzcxdj66whka2c8ag1gupzorr8aqruvqvaysx2o7m1ebhzifke0j',
                direction: 'RECEIVER',
                transportProtocol: 'inx2nqrgi4f529jba0fg66gq3e19mv11uqs3rpmhbawo7ect3nalrjiw62z9',
                messageProtocol: '36dtgijww3r6yn1iojwcx7ezn3sg3qvch2ug2kx70bfvtr0suz5mnbzxtfaa',
                adapterEngineName: 'u65k34v0e9x8snloh5iqsxu32bmzt7pmo4z2gcqfxw32kwan5blw8ej09o7zrhsxleeyljkq9maurgxuy2bnzt35vs8luspe5glpbxq2b3njd72v4dwaza392a113m45x7je5jvdm3t7cyco07lnys3ljns3sloe',
                url: '96d1uz9xgxik54lj4jf2x93eo4y9zzvss7cnq5ob6eyfchuugjxrzz6dt05lpijnyis7k2x2ea8qqqjehv8crv5xyfu2o2odus0xag5nh56vh686b53uxeznege1o3ff1cw36rlf5rxvtjqk60ptqfwpqj5reehxehzoeijoz0kc9i2u21llcij4myjsmf7ptewbpaajdziujcy1h3i8bynhzfc9q5bk96b1unxcxtkenwem2nc6iw4h105exps36n12ugtvj6uhxrwyzmc077gna1kxiu2qml1q1c0logmau5hq0q943kqst0hbmjkk',
                username: 'cu6n7oxh979o9qe5zbpv1dkklivy1269fm9n8a7ceacfyt3egfg8puouv6dk',
                remoteHost: 'cyemwcbicmgdcjgsum856ve5g0pxs3r8pj9lrur6p41u3f8yb8cyc7ebs9yeuh24els9hnyg8knxoixm6tajznlrotm8vn8as310ppojqz9xq3mb4pcmus7uqsolyw8uk6rwo796j47t494emzvs923z7vgmceid',
                remotePort: 6494270483,
                directory: 'oy6h0rxjloaljt4lqjh29n5j3b814fgvzmja0w5gale21tmmz6z7m5cqxqv3xwv17596o3as465mw6iwqh0fo9oep5t4ieaefhoiepnc7lvw3qjam7bkbv1e01plejswvipsr7mt97qun8htsl4xjsemiya0k2ae9r7q6qmh4l9e3koh4wuwnye4zm8954xgxtj2y8n81csb32qsrqvsthmdgoqfca3ynhitbvqfxtiq45pkyksl7kp4r48hrmkbtwmfub8h2pl5ymjo71bgr604ofvb6pznybdqk1vm6yg5xc6o2micpk526gmku71z3sjl4xvroj49uhc3kgycd1mws9xa9w6ir4arihnrav8dlkmjz1h752bcbkb3hiqd6fywvcrmnzy9xsncf729pj3o9p52axi4q1q720x3qizycpyoc7pbq0e61rup0wb5ar3fvbal3j2j0vs8eyklpzx9khid76hjxf7n2i08pf1hnxzkncr681dlt9wkr6ynjad6c2xvbb1xc7m4ptfvp4u2pui4fqu1djip21apq4kn4rabvb6sbx61mcvgebr4ncgieu5yk0s4cnbe6thj0i8tp4527100q3d4xzuv6z69eah51ko1abl49klajmlbe1i3mzrrr1fyeny6g8utik2spllxpxjaw3m9petzr8xd6kjmhhu68zrekrk7oyrdmx2qhn8t715olggwobo9p2fd6g6lfytc97du0t6an2kit2ehban9esg6x80tdxhftxo1idwi41iv9o0p4wjx1hmyppxj1zswwuezjtya0kyud7k56nr21ba8h27kshqmxdt92c7j5ju627e5v1z88idtcb6vy6k0cnlgq9kl00v96zlw29wjsi0rng2wnfzzyji1s8aqzbajpe1hh1q8zlcb02pb6tw2g52djmnfj58m5b8zo26dp7mgue4ctc71dzrliru0i39rj59i6j873pawzag0nbj2m37jy2vnnyj7t2y225nnhpe0fv6qsfrn',
                fileSchema: 'owck4dbmymdjpl3z64x06mcbiqxama3n9wn5lgfz60ylfti5t7lssfs19aeszd4pa22q92s4gkfzdo7s0sul4zlgaqcvllux3hyt6ipaszr2znmg55r7jv0ayuppe3dzg0r3547uxa5bag8fcffnngvvxvqhjrz94f0b9o46zi157hul6iq2z50dng1xexl8n39ktqky1obsvjtkgd2ilc29scyn48deats05848itcspkdll571p2wgs5umfrie78k0qhifbif8lks3os2b3tibcqgx0wudf6sratvratxx3lgovnbg41nigtvm86eqct3nfrm6ygrfc6z0twljlw7e02lx0wxcjy3h92vtjbwye79k42y6xk2uncra6ll72yvm6vdaefby6vpri13ndmnyrzciuil0l66p3ohuf2uuwxljxoetiq1h5om6sxh9ij7kzu4pmo0kz0tmbel8ernv47dz37tuxj44fx1o8k1j3ffkxhmio4b8fosi8uipydkhbhmoey8ao1kw3sc8nuh99gek5vduga6m57ql5e5h6suffev1oh3u7855bppq7ctwu1r0bxrm0vb0p3z7wg6xvdreko4ugr9vfant6vzyvnvzqf3689cgptrz75nm7fkuem6w73cvnjm5i4mgwhy438xmg86bcp95vqoymqqhd4mo3pooz9vmlsi00ffjlv1adkefm7hy4qnftdtlp91zuxmc9nn11dmlqjvdxeihsojpsxo5kjfgxlew5ny7rw8o37l6fjx6nwfuihf40qtkv7r3qkmgpodiowt9dryj506ipfqi4ik94r945kbp9k66ijjo35kk7ln4uukpulrfjduhfhmfjz4jqj4is7m88eutcxd5hvrx81zmklsob9c6o55pd596uzxr0dxlkdd64vbxndja7msq8t2glklbrhb427n2jki5q1zu6h8uovv0jumcucnkf2d140t1gfyvjn36i4ryn3f6sdwgalsko77qtevjs7rq0vs8p1jc',
                proxyHost: 'g0mqleov15mhkujxzln1eni8k80bw7q7l3jp527bsmob9e7asjte5a3v315j',
                proxyPort: 7375539203,
                destination: 'ue70wcewz1iuojtwyrdj08jjqo4hkqz3e3f8w2isjz5cg64b5oepc6w03nbtfjy06b91qpwqx1vvmfhm7tjsvdfu1zh813bxszywrr77o6ggdbfmtyjv4yloumelbek45cpaj77nrfo7runxeyofmonaqb7pdzjw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fcf81sn65hr7mgfoaw9jxy14e5egp60idurt1z4zetshy2p0cbofvfbvaeyw6pga66e7pfiysm7mk63pk6e2m0bl9w7pllen1e3y99lu5sf2vawxsnzrs2nrbrhk8idz9nqjk7v6rmvqy4c53u2zmb7q1vl5ipcx',
                responsibleUserAccountName: 'hd7q8pk2wp2gxxhe4si0',
                lastChangeUserAccount: '9stjbd3pm3md1ai0kf63',
                lastChangedAt: '2020-07-22 00:41:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'jpuyo3gt2conu3y8z29stnmqv0q0h9cs1l2q1wj1j893uvmvlabh9hpq2lguf6r2h3soxpx3891o4cwgreb2zadfptssqsil0qg2xvakzwvbc9vl4vhmtdke5z8pbisyudeat36oiqcg5io7z6gpa5c2s8r0t2xc',
                component: '909ksy9maumm1b38rocgmb4l90g01yiv0z8ts6jevc7rldrcx1ehji65h2rc52ew72zyaejkiud7jim2a77k4km9pg9mogzek9h5ldwcf04wnwmqs28o7uwc0nwhy57ne2mb9kkoyw53d60k8rsceyna9nv9mzrz',
                name: 'm7ddz1hfm9pxmqr4a61n2k72tjx8gu8lgkkvdrlfk7e0awuhpyiv042wesby0npxc4tcaf1onjh531ci259u1qt5m4k3c5odgwdpjl0xvfof2aekag838f14mpwazp8a4pabjk4sqco2e8nd9azouyjlgrtjjzf9',
                flowParty: 'c4kd6dsucbflpakd12228lsdycbn8koolni81dgfk6yinrd9n8kbnqpsorkybljholz9es0sxx5z5jkamu0xsq9pyzv8n2p0vtzq0dpfxk5jnlc0jfi2yu3drwqpl6ugc6oe9vb2jn1kn4gigshkwiwb2uache8i',
                flowComponent: '9lasfy5x9b06qtpw22nrhisxvw7xv0aluua1ytb31vt9d2uy9vwru60bw2fjg84o02l77c3q9pv72dfs09kskb7jfeokhalvl1gk56md7n1mt8rg9f2jv26u876kp738ovt3veme1loace5pl73w5rvvep7c8d8y',
                flowInterfaceName: '7jny4gtfa186r849f5xoilgdvv4r5qjzij8msy2gxdn2ufi611c4h3k8jpppsbxmgaouaof4qgafklle2hb64on1agxhfukxtz13vgd805k13kafkw24ze2e5qvh1eapb3uk0owfqav3lobslf2bjwraksteipk1',
                
                adapterType: '99irryq3uhsybshta2p5dpgz2m6nu3alvytqihvod1v2gyu86n6ien6ybw0i',
                direction: 'RECEIVER',
                transportProtocol: 'hrpz79jko0r8mywrmp5vpyq2z3rwn4u3e7zzu7f5jivcoamw512zt2m9zn7x',
                messageProtocol: '03ywi8wekxqc92n673vsde2bwylcf0f9dlyhp9dj21mdm2ig79kr2hs1dugd',
                adapterEngineName: 's7t6osgbbt7361f9wqzwvte4f87gbojjwdck3ycrbf7uwmtsdpxuqy7aulteq7jphvq4aih2921whl8p1v404h55m2ceelb61f3jpsn2rmqp5mel5t246w75cl4b7iev3knfmlu4ip8gk8ag08ezb23ni0u6ylsl',
                url: 'qaddjwf78qak9jkva7seevtbr68ze000uzczw8ol0ab2dic5ukfdc1pcym9ok8b2ppcxjzicdh4any6it6d6yx1gpjbk3vwx7hgblp7fia8qzpgpc16qtjiqbxu9glknz4b0wczccvjzl1nbk8koahnb9c4ri2tc45cb4zpne7vgowdt8q9l9hsg2sd1v3tdv1e7ehw3ma3ud00og5263z9735j8jr5x0gfnlj4d5hzyz6ee1gl4e0618gu157leeeuhjesb2af7f288lj5fk4b2lly3yfl8fdh6ca2lometlr2ugseh0od07x5rzo94',
                username: 'x2ue0kew8embza3v75v8fngb52fgqz7b8dvrjfp7hkswmn0dartb6udg7xe4',
                remoteHost: 'hitlosf8f3f4znm8eiatc4o5rlomc3aezepq0fumm5nqpurgo2j4b2gipvsac8a8iz15uvkmpnd159706tdvvd8ezmqadic7l6r1ahw9dq5fwjipcrazvbrcgfxzjwry7knskl2tdyl9su34q7ux343mz9g84ygx',
                remotePort: 8206254476,
                directory: 'bfqcyqp8lq7aag0s2ve1cln7j59ywp5igi68ia5mw5tkm0l8qz3en240l2j8ev1s9m5c40wnx9m4iayvu1o6qwn1n5hme38uicnrsvfggu8ozscm5y0l64rzzd1lmlgrqimnuyzd8kl1jrngb4cvp3d9zz4f1p1ziif08fvdaz0tnkafdl4wa7xv01axnnz5rga7t6i6966v4ir1g5kyb03wjhkpvy3p35kin3q86qs1j1pqbw6a1b08yvqz3io3k85jvu2d6ny32z2odvx4kc5ebve4t9ynb5j1ripsqa6ag80cdzjaxhwfhhibx1wbwisala6kbbgtur14k4s88wno1k6zcvyd8fzhvibsh9si5bu1z2luux83yu01ahx9l682fvuvphdv8tjp6vpz21p6mcau01da7mw7eiyft8q0cytppponh3bgp8zi9q5m9prdcianu4dhike08ubdadec1n0eiuffuaowuog0uhbsv8vun7f5dq1hlimxuiqd00g6f05jlzux53crvcncszqh42ly20hoo07a0a25eyfuvhvelpj5sc9hz074b4yut6n5sxgvk8vrgpwin6qoilxz8jsicw495kox4qxwvsroswvdl60gahu1x3awj6bu3q4100q48jrth3701ij01fpekmeosig0zqyp3z1g5h2q8xg2bgt4fn9ybigx60i78ohz0d6ka8hfbxzc64ovfnx9gnp1mavyvy9jeoq2bytsr23o39hlszib43czbp5q3bm1fhbdr6i21w1to90wnaws884uiwwtjiha0p91skdrw8t4wlfeltr5prx8e2mvtoquseja28mbt9hck4a1mq8mip0qd2retv4c0q2azf2a8cxcahem8l6vv0fx87wq8x3wqzql9xtsvyogqvr0wzz3tpw3dlb62gvpulc07vj0eu544eus3ml277yx9xnubexjox255weop33gzzh0lchymybh8fb2qn9w0z4q3xjtmzwj6ubu4g3dhba6xvz6',
                fileSchema: 'zgksmgo8y4h8wk806xmmy1uawppc6skevqe6cqdxer8x8m8frso1orvqrgqgtcmqoldzr1r46tz7xbgapx0eswci4zeigypfn6awm3ahpxu7vz5y55hci7kolk83njgy0e6zfgrxyvnh9xvy4l1evh7iumm62lmnn13rtq0hq71u8ml5f5ldk62h06o22jxqsrqi37scosyaa49ozp3c5ob58l0xqb3zwrymj83irj6pqcc0z45u9vnzkrp6er2npbebh897hd8kkk3xa5wrxz86i5zlmscckuxf3gokmd2vy59kfhusj5xi9k36u2gsm4obdmub8hue2a3frenuax3fy415q2ksy6uqqfmuw25sr1j2nmhcdg79rf88n2l2uri8fl7v83k3lzaps2gk7fq45k0aoo9o92t2onnebm9ko3k9ft28fby2h8aw2mrgucxbl332zfdy20qhjkq7e5bfh4ddtdx0it3h28hpih5m7h9yeasmy8d39u4ygy8vhyvwczxxhhdma679hz0ybnzoola6clg016ytpryovx0m1qqcmuy1c6y090p0l6njhkt4su1md1e7vyi0s7qu83g1kogdbqcnr0x91iz87q3t7ln6l0zkxfu960ac75uj439fyjbsxcr73h2zzidl3yzi0ztazq3xvcgk8s34yzidrb95dl9lnb5kn5fajfuhwzhk0xfru39g26bihq89m6vr6fb0bt81tuc4b6ipeof122ci3cibfj38o2v7w5t0v1hnkxp324usa30fv3fnkb32jldr12rxgrd1weaiiv0rff59nlf3d5138dzwtgfxl2hb6keruomb8vndk0d96erpq87ew8pgl4xy3n3kma2bc6vagbw59dc06ocjnhhenfu2c9ku6n0lmkdfjyoa9v07cwezjm5rtkl16lqrcl0t41i629wbps418q8i68y6s9c5geje2nyriileqxq8s42gvlp8ygu26nihmwz1wuuw7ouu2l0w64iwo9mlmdts',
                proxyHost: 'e0doh6r1u1nkiplmp6aqhy8g0sjzfp5xkhbnylyyi8f2kat8ozbzzuwd2l4q',
                proxyPort: 1391610527,
                destination: 'h6mf50l3b0602qsiu7u521fvplu683rmlgdhgt8us65f6klfac9y3dcs21j95qhbflgm0bpqnif49o7po81k3iu7gck67nher1bth8wavpagyophox56a9p3iqm4eih091atw0r1t98x7forca6hkmuxhesqphan',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'swm3hl72aheeniqabjc75w5t5bs1uzlqvu0ecub1q70qynni4msxtepowdfrx3mdqnpn1sn7wrno3yo5eg7asqbdz5fp1jqv9t391sfljlk8727rqsv83vboo40x7v6ruvxflzw3tcvv5nipirjxl9a7behc40uo',
                responsibleUserAccountName: 'c3g4oq3xwaxpidy5lgrr',
                lastChangeUserAccount: '219eewypaqctca84j4f5',
                lastChangedAt: '2020-07-21 08:00:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'b9t5h081mtaxacyuy7v51035vhr9p3znz0yaiiddz9n4p1tlcw1qu28w4xqejmu5atz7e2u7slrvcz5tqfqalqm8h47rc37raujh0qnv2h4y591m9e7n1gml23gl37qnczun0qthwegtuqrzv0a6p1kw1nler9ok',
                component: 'n8ylnu3cai0ah8ihcdsnmnya2fb82s6rwcm8kxjasqtf8s5lkrspaqgv97iityt92egp6b9g1gx4yte8isu9s6nbfid5esx4265xr8pipxgk8mgdd1bhgnnj4izb1231vmen7jx004udc01crnb2nk9uwg80gmjq',
                name: 'cm82dzt6xwhlixh8r4imy7w3evgh1z2wjggu9ezjp1s3c7yt8xbgpgu1803b0o62nmzqt080fce8610velq0ydhup3jbsge3ogomgiyzvjboxbru9d5regaflcymhdand8s2u82ft5pvjtq39s83x5zb3zfrbzu3',
                flowParty: 'bvxhr71gmczeo796uvxzyqdq25o12m0wyfmuym0zsv9eqn78tyt87zo411wm5c9aunhh0um0mdj8jn3ruvxvgb0zqescj3eo30hgc2zrbc85ikezv8sl39mmwktx86upqvz76vvtpw6aymntkjmfiugpo0xgsod3',
                flowComponent: '9w268mxdns3w5eg0fi5cufd4uyd41kir8ub9bt1py723lpbmt3bvw0fjqk7mbxizdoucns9sgey6glwlmls3hwvnx5c4v27lg11gtfxdlqzh44i86lisw5yf531fb9sxe3fx5979foem6n8kltckgo3fn3j85x3u',
                flowInterfaceName: 'alqp3ksqozo2thzi7l9d0t1dvyr3x07a7lomqtrc2s15e9npwaeqkog7vudmmhf73xgqmely5d05cmzm7kqzywa0nfaebt4kdu9edsm04i547febvh3lwfm861ig31cnwd4rolynfh6bvinzs0zeue5em4slzn1a',
                flowInterfaceNamespace: '3epsnvaey033wm38h2ipd5jks7dal11q76rwdm1aaipstqr85lxpqie0stprsd31q3pck4j8obpht85cusahhcx2n3jqceeg4x41mm5hk5sl9kykartrbzxi6lf0575s1vhox07dg249htvm8uez0s5ttjljdb3z',
                adapterType: 'ngo0ta6qg9ywfpocsait5rafaw06954wdgg45s9uy76cs65c2sb8e4bsjjcv',
                direction: null,
                transportProtocol: 'ccpszga6jquvjshgnd6mbipvxb3y38yeqqcz0es2711jreyud59jl27iprrz',
                messageProtocol: 'mf6z2vxfavc6wdxogh552l4sntk05hw4rop9qnvrnes83riciiu0at2v3yjt',
                adapterEngineName: 'hb8jbpp5zp2omjbo1c20czvmx3wcu2x0lqtyzuyr9l72ol7feecgo142n72xyc1azvwlox3mc3o400qhzn51mgaqvvwnzjedta384fp0jk0ymjy6ygdlnwm07rik89ecgx6r7qabids7mbnghtw75bncqtrlm4j5',
                url: 'ypuzpv5ac1t41hepdtf48ixt1zug44hv53tlt81qqc7ozuwic62tvnrjxziek719w0h2m74624qdoq5h2f3p7oamk69gitn351u8jo3k6sjekmmrald3382n837jbrpprr1d6xdi4d76d2b0b2ortgch3s7nb5z6d6uo4f6lb7xrbz3livpl5g0wthqpernz24nd5wbz8blrd8u4tx1pqrjulkz6rxfq4jy5ow68xagtvpstulin43ijx52p8q1u3fnisdtbnjm9c4xy2kr2u9ku16rd7w8zqzjlazmr9t3qv2zcnw09ubpqoenwsuj3',
                username: '21djwrme10xkiqnd0x22dfynwcd477nu1z0fzoan4knves1s7zmfd7tynas8',
                remoteHost: 'o0pkw4cyvf78y6oao3ddj31f28i93lv5frpg2kjy8rfrbefqdj78h2347c1ogpttm4081r2yj4gwwkuivpgt4deoban1rmy6f267kg2g04aaic571lwwy5ta374b1pfhkp6cj34vcltgd3btf81k049n1ket60zx',
                remotePort: 2995037181,
                directory: 'v6a751shv6nowwtnnphk6l1gbdx2g2hsagxckzhcvo91rkhnrctprfdgzlcxn0vwzoxrhre0ercsrnakens2jplnkqcbky7glruez6wdmlu8738nu36qfyjjn1ns3ridoo1xtzw7arg64mkm3dkd0pd4u5svxk3qpjk8wo4ivwz6b6k8p4tus958gvp74xv86hgallnvp5x4x4rwq84knqlgqru1ck77lhfbgf8c0y9ahfa8hp7rb1nd3grkj6m6jdypyhto5ai047s3kcrocqaprv63yy9ctdo4lvjuk3ma4x3dldw7u6jra0qd4nqdczm1865y28wfgqx7xyebet6hpwky1ngeu9gwbm9doc1khec056sm73jcsanoqwm4zca41soustakyp6boee6iw323g9il7437yu1f4ul5l31f8e3be1ygls8l0i8qa8cdlzmn0j3cuhozjjryax7ww2rxcxka4gxshjoumg9fag7k2yee0r0kwugsvaz7qydygcxkieugr1ieppt521ftlmhrk6r0blfvpthqgvj3iwm61620ibmq1tmi0mm2tw8u0qcxz64j35prjgez36us3shye1rihf9sb19o7b6sc6vnmsrjcfcbx1xhwxnmvrxiedq061w715praza4cralnqmix9flky4lqdh7vmh4ourlmn6f9oezpvsbifdiq29tlzg5edrw0wmx6w0fw68cezteyy1okhbw6sszalxrioeeyhifvih36eiiwel3gl071nf20ijgiyx4975b7fwx2cwsus6pni8460r89qmcbqhn6k9lh0n55y3ia3jh11fgb0edznsgbhwbvd027y47xbs4n4ay47gu8g1ey671vgwu7dc3aeyzus9fmnzx8rue1xvprrc5337a39ucww6dsqomg0qhgg5xshyrekfc7b39md6prnh9twxyh4960ro3khugazpw5xvdpv6jifasskj6czmlal07y7622bsixvk4wvo37sy3xfub57lq5eh',
                fileSchema: 'ij1q14hyfatpvnb6cepsnu5n6acg27vg3m9u44sy30t6gp0hhmv6d8j8t4592fdv4z6pop7bmftkr1zic181vmnu5ncckcfmaiz51g92w73j5dsc48ldbyi120mlipeug03wzqjkmmvr9o4h1kzlz4x377v3bokd4xvgd68tjk3ldla0rzssvd5tjwizq6qjvh4hn69ehy2l0j74xti3v5jw09cm0hfq018ikn3zmofle7t9yuafdzq1hwjvj9opg82f21ysoh4hl8ve1xify67uhlmn6oj1il2rjkq4dj2858sgeg4emihbxwaqnm08xtg4pnbr5235fehshux5mg2fc915znqie7n0lwiz7g74nlfyxm6k86drvlqxpblue8oy4ka5awuh91wgdrhm7uvrxsg3ikase8fde2icn96f1nrnosnza3x94f8tzcnewjqntxipc0fd3ui3l0udxqnqnr238c10ynjozf5sm20wtahpl6ro8ywu6t7jac4z9lfvr6lhl3xuh9uyh5dojo51ltjan5ym2a2x92l3a8ul0b983yi0plx031dvjfv1ue38b3ljxymiwjba12ple8obwrjn17zpblkupjbpq8irwvcertnog2tq3538o22r750s2f9qkhjesshnvhs5cxuedy6ysng9atskzpmhgq9oobcf5xm9t4229bo9bvh2cy81y3khwbkq0sigch1rb08iyjwzkrz5zv5xsviwmmkurw4z2ixrfc15nna15cy5dmcnmo3lme6pbfixac92c4xezpsaj5pi59ezu39v1vzu0iuiym1pr24bgbq79ewhvkhqe0blhzbh1gbxavgvblydmukeuaf4hjc1k5bvk0vd5fmctiy6gz7qrp1m62k3yw9nz292fedpaw31wrq6qn1w53xyjfjdsrvxktro0ls5tracoqszs0jbpjc6yxu044gur79mgdntw5ymy13wq3isb0tz8t9migq2i1spex2qh5dtfmifwh8h6gnf6dli',
                proxyHost: '0tb95yft15vvd639dhhkeqgajvrh45obavflx1c0x5bat1ol48ylhgrfp7es',
                proxyPort: 4190922383,
                destination: 'jjuk6zehasc0catbx33biviickz2ddxdgssf9a26lgdl0dbqzpl65l5c7b6yucm3t48nlhmrn79m01fuexafo7fq6k4qfvjccnp6awap9m5dk4dxe554gsmw9y4ns7ff6do8blctlw3zjfntrmpmnm4ypkvxs7p7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vwlgnriyc1pl21ma726bxbqjpzwlltzalk0hsxvnsghpbb50owut7pw3yahvuz49k8is8i27ehlsuvcse8uq8cfs9uze1enhqs4nfttsg7w8mo1jtzga34ofmm3f6ali1oj7nvdubuij8cxctoj1gvse84lyss32',
                responsibleUserAccountName: '8vmr9r1cyzotpx1y1u7c',
                lastChangeUserAccount: 'q40pwfr2tl8ediim3rsv',
                lastChangedAt: '2020-07-21 16:35:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '0va32e1vc2xntrbx98drwpsa404bk06c28du4rinuwap4eeo3ci384hvcw1djrx9qdfuwj32l6v2k16pw96ack2y5zi0esjourtfa3rkqtlmum4vxy4gto4srcj1qvmcq2ubcdx5ecdewbahw1d7snueapb98ldx',
                component: '0cy1elyqwcyzkxr4lwggqosfyjio0tf9dhl94m2315touzzmy4ezqly3qzniimqgrlzoj9ast2sl169vpczxc8mcy0beacv642xbhjuy2w7wq3j2q0dprxztyu1s5pih4vnixx4n7h13ybqelen0j48qxn2fqwvw',
                name: 'wfm7du4nijb6rl4brj75njwpjriundfmxb6w0i5m7mrkbakgb3ry5k66n89gsjbr0sp1iz6okk8sy8uui9pq8znxtxfucexr7wxzs50mwdz5ji0lvje6ifgr3r8dnfabscnib7zz66tpe9tuy4kgarcf3ute75kc',
                flowParty: '6v533wu0ndaldkb8s2t8u51isqcgx3m32b702amb678s6ld3axgoixlcdi1mot8l1krwnbkwcttf3wavk54vrgi1yqs6qkq74xme3cxkk4hqgsdnssl3b9bm4k4x7zhthr1wn28yg8htz2oxl8rrzzlekdd1lp35',
                flowComponent: '48qfcp22tn1o73oyuzi9asdf5gu8lwm89p9s8slyfshqz45nvs1wkxg0hoa4b81ybwt13qnqt1k4ze020m0r94kn5ebky9t4x2cb33kt2fv3omw16n66z8kckq8jpgilmgkgq4ymux07fre5e0rh45ol2j1g1x8b',
                flowInterfaceName: 'gzetpestoucwv5exv576kdb3afuly3bab1zbi4leqg1o3pc90t44jje56y4l3l3rbrwptsikk6value7ehe4kp2hxyxrlnxscli5lo1b4bojs1syhtmlyr2fgrngngo34hww1389bfk2m1srnd5ve4vn13uz6k3u',
                flowInterfaceNamespace: 'zcmquhjiluljzmlkhn1fifhab69i28au6y814w5li2p86z5drl0dlu0rqewyf20nv1qwxb9bayjzmpy65kha86wzznf81j4e5czjfb4wkl51cwux3zykj7fjo5awu2tn2j75xw7efk7ej4pq71xuw6qdwacyhcwo',
                adapterType: '72gaplxq9okms7vucnf7pzfjcrz9wls20u2ruaztvvax5wb46qhsgfsf2wqw',
                
                transportProtocol: 'utjirsz84ctv9opere9llu79w8ioedcx9q80lm9iadz0d3qg18gs4twuv0sv',
                messageProtocol: '2pwy4367v86us7nfsshjfxdwv62iczk7mg573mpdi9vhxx42ibm2k4e7sjus',
                adapterEngineName: 'z52cekha5cc4giudephd5b004qhq14slzkx8bfyvs91v9m5gj51uhbx33uir1zjihkggmxuahldrldswcsu8p5nunumecmltolfrfygtzss1o90ezutvlkycagmplufhpey7rkjp124cg6eql5p6sxowkslibdhb',
                url: 'duz672u6wcjthyyt8rlyxjx8rba42mu84t4jpv501chktuq0fa5ellhhsp9qw4d561b2hd06aqhwjjxctj7kofonpdgm54ozco6if956r1cj0j4l5do8eozlaci6okf6hthozlfw0gsykbuehd7gk055039d0ud73pc42gri69ts7683417mmbhnjse7vtkp3qsyik5lyb601mz68a6ov4dpn6uu24oo1z87kzitomvkj7v0mxqmdghz9ckr8z9c1ugedrp097m6py352gvdq30lfiqy25igp1684lwz4kyxwbsba8hk9c5srgnrfnvz',
                username: 'cng60tobge7unjvc6srna796zg4f5w2kx442fyb8e7g9te7j8too6rp2vm1x',
                remoteHost: 'pqgoi7uroizn1058bk30ytxas0cc1qx00g78btl0fw6jfsjxquo53cuq48f2yu6qowro6k70x0ellitfc4c5dgz7tgmn61kfxd8jkjtxa82ol0pudgvstg9r3bxmn45d2f6gif452i5wk7rdxshtz3ji1lk8mi7c',
                remotePort: 9193924194,
                directory: 'jbde2pr4faprzmr7exc3uwch57597bdwof85vifzpbz8lla71ya0g6cig1antbh17zg84kymwpp4x9ks3ybsnddwmvje63tyux2omm52em26e19lw9rzndx87d85dssngy7yf6r9lp1n5599qv0ybrh7sb25tjh40cq3eqgygdhh62a5c7dvf7k1w96a2qh3s9iffa7k8prd51gdq33w5u83hec0gu0hrarappl5bwxx2upon2m6x7jphjs4bpaclqwrc6e4etvgnseep3h7mp1hjqvwof3x7gttrkshl3s31xtf9r4mg8x51b148ihhusnvfiq1tc4m7dtxh6c4awqbx5x8qnynodf9v5pcwiids2yae0hca2bty1ep48b8zymblsqeiy59gvgjxhuzv13d0p9hh2euvnencpuwlj6um1kiam8oeiucaczipcrol7933lo9qhid9s7837ubahqwazu6qabwfb4s3phs3aavv0jx50go1annjl07if2e4tayir8zyhtsawppygtzfxy067cl7xp6on7yb0domh7qwoy84zusjhpg5jj7lyu16mqokntr4c2kz34z63inv5kpoucuofg9oo2ga7k2m5u9ssom94oa2h4e66i5k6zmew1zfzq6nk7m2yf0528yhk50gpc0ir4ir8jmvmqf76983puqmifyovdnjt9upsxuaq62dkck5equ221xvhlwkgnsc6nstn0ky3rmbo80asctdj2jhvg6cv5mfdxus29wf2n09ne47iakgguvzqp1oc32jg8rn1og16xj5gpeb3o5j1tfahg1gp8t5jg0r7arjqo9ldto7nm62eofj22lnqik1s6az1h72q7i8ddw7cem8vmhcrrpgmk1vpglt8l3cug2zcxuclvhe58k8cpv1heqcvkzrp8nequqg7s1udatazwi3k5jipxuz70cea71k3nntyfu8ijsx9uy4jre0dahmjao0u2g8aluafmaz4jsg7brc9x842n088fwgath',
                fileSchema: 'ww1gppobeidynkdj5zkt1pfnmxtf3ioro40oam2ni6drd3vdq22i88rq69y83n47o90skygtqjn5vm8dqcsazhvshqsgo8gft288ey34qlmalj2so39pdhillbcz141w0grhzom2mnbxklbnnlpcztxsf8ra1abz30stiapd86r03o89rlw03lr39yfeewdgzdqrw7ytrxs0g30i53b06pac1fey3hpcdhe7gh4mc01wq5zztp8qtilwcnao4gokvnytict0rowu1f984dedvx3wf5452pyf410tx9vb3icwobu1f62jyg6g6w29jnyppjih3kqb24hfibp8w07em4z7lhgemdisgvju6h3jf0g290macvk9v1z9i7tq4warhggd2xg76bmxif6ao51kinmnnvb5bwc02t4vm2ylr71t823daybyecprioh03qd1xstoyh0eynkulr0qybzznz1jalnk2eh1gep485bkrsl6hevmblw9xi8e3a4iav6jdf5tkj5zd2cvyd5x09y55tiawkjb5l28koy62ubes8ibmxsm2x0q9c2adouarx173rd00xemriog2ngebkwwt8gwtmzzfx6d0bd3dbsb9qo2lwd87whcbfbtlpy49f16p1r1xr997w20ec3s5qymxbqrkiefqwz3s22xncfo6hv774l8p94ej3zn5wjfkt2qentg5kgopk2usoi0blnowr2nhi0s4htdn6ucxmvke5jz9ch0ef7nbmp5dojusacef12kuvvg28c1fx51z2jpl9w3rq6fbgfe2jhix8z5l64g81zeiexe3glf2hooo8cuinhikz3xhp5zbab1q6dbaulewwt76mr5pxw9afhxlgkhfewhx0c9rx5yok22gl3feysqidec56ml9z3g2amr5e7eukogcmv36menhvqyhlz2qyvpkyy3zgqkd05ylx7tc9a09bv3ft7qn3aismyle7yj30cqdxg2sayv71az8cedh9ultwbt963ustv068sw',
                proxyHost: 'xmu68gwurotyo8dnzgduzqv42wd8hu78sx3ctcidtd4982p8csyb9lyx3btf',
                proxyPort: 1003420727,
                destination: 'dx4rxg8ce21dmbixmelw8kbw4fxsj1to82or6meklxepa4d5n7fmojc3lq0hfvg2jp55u2p0v0qagibcg1rzn40la6b66sbkno9mtxy148jla9jrun2te7zf98vd81g744q33rdmomxmtxudzryigrcckgatfvav',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ibw95ef69d284u0fstdqvw08tqr8m5rtgrvxnq8cecqmjodoy3q4avp5pcrta9x3hzfg0vramywaih88q8nt7vnj9l3e3lwvsfqdc3cik8ysos40fkbhxje32wvyazg79vbfod65vpjipz0ik64qblb3h5vbos8e',
                responsibleUserAccountName: 'lnicwur0hnm2goiwulsb',
                lastChangeUserAccount: '5stjgbsj9p7rwubmnib1',
                lastChangedAt: '2020-07-21 01:52:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '0lz4ut2wvs2s3cja6y67140pti9m9yjzfjvvt7lfj7ry7ry6oflh0fykmsi7cjd4kkf9hh06x6h6kcjpz7n3w34cvymtyxufw7q7y8vhefz9cuqr57g1slim7qxgtxtm6rmvrofr6zfezsju2tbv3j124uulclxm',
                component: 'dcaas5aca1vlqs0z6xqe1f3l7iih2lrlbxrf2xlj9ywuz75ikuh54wcduqwne6tm9bd1mgipkjhisbf7edjlu9tgo5ozm51kinx9t7juhixcbxgma0zbm093buu8zjw4vphdmntnsv6pbktn83eb59lgz8dn52nf',
                name: 'm1ooquw61qamrt9g0ibfmft4iy8p3jnv0q38t3agu06da477nqy7x5jqxedwuefoptyhetto1cue6jkrok708mqmc1ftogt59wvccdw0x4juetls37zj2dmetp2mosvfv73cxxgj1dkwdi2gcxqh97tzqfnwehby',
                flowParty: '7tub3rb8zw1cu8ezf8wgqv7xey7le01381ocr8pze33070la54cmxoiyzm1x8rxi8tqpab4cdf026ejsv9rrhhtn573t6b66ge9fbrt35c43asijggm6u984db46l1e69v7tgdkstpdv1ogde1m5xyvle7401aaf',
                flowComponent: 'owil8062ojkuf8kk6dmw53ianontm063wh77tkq0e40vj66picix47j1u3a9wkx4i6jeukiu469qy7d8vam8w2w88yopqoug15a6f1n7ypoazcqj3y6mq3bpmtwfjwuzn0ye3wg5ec7hor6o1j4u2mrsomzey24u',
                flowInterfaceName: '4rl9jwqt1qvhnysq2zrbo93hvn416txme9a1m1j0jo3xcu7sjv7wq66a4qtd5tlu74mljwaqowzui4ftlad5kx1qie9g8eopvk2uwp64zdt5y7qkzvi05kkkjd2wtp8o9haav3w3tlm3hm0pb0d52cujcnxgiesi',
                flowInterfaceNamespace: 'mocewzrd50tvgzq4w35hqcubki3yhh49recqoir5w54ix0c80sk3z0w02srovjuq83n7rynvjb47s9walqcr1nte0tklmgvvrmfukcjizjkcqwnofg4r0smraofedzvnwdgceldbb58vci5ng9nx4y5owhsv9tj3',
                adapterType: 'ahxf9dhn50so7d7ouzr665w78eaavegb3gkwwpn0qj72ab3loy6whq83xi70',
                direction: 'RECEIVER',
                transportProtocol: 't4uv081covc10pfbkcryn5inf5b1f0efxrdgp9wpqeaho9ndw6m0fjknckah',
                messageProtocol: 'vpkv2c4ra96x81vrhtl8ipsrgydto2gvc4v0qh0lm42doezzzhm1451watdd',
                adapterEngineName: 'absprnwwvb0iq0lq3orf0l5hwxd7kgpjspyx4ds620b4b49mlvs5n3yf2bhw5nm4alquv5spdsafmpzrbdxpi3z2c8xn36qa6mcwhrdg0j4rdxr4kmvw93mje4tkmx1m8uic9rsqf46ph6xb4erz323whin9e6u9',
                url: 'cxo8zdsdfx1ioyvawl6p6iuhup367crk2fly8pnmrlw1irty5lojybp082e6x23s9ewv6dwj8xde00yr7a243wlb81857vzx4lwi0tj15tcvfwu5ud4lxtnrf4rs4i3avlkgfd9ogwppnz4f5wh6tu0cejrmg53kshi6ieo039zvuudk274hwvfxe7jbdxqkd17eqb6d2sgovm4h32a9xbh5xev7eu7wlnlr667et835nfwkj5ocd80pbgen8puc0w8jxy7aqcbxrnewx2htyd6gebyooias69axclb2gkmizbo54z03bo39wpweyf5f',
                username: 'd0zzjnxsubvhir13rwn5ddzil94j5g5hrd0u3v21e1p9l0e04xthvtsyg01x',
                remoteHost: 'ratymhffnmycckq8tw8he3zgdj80pd6b0svj79x8rdzdbqryzelanjchg1710errsqm94s0a8hhf4sfl218o4q8vqiezowkwy8t63hm40i0oc67dqhr7jceoqebxtedtxe6z4q42spxriwg097tgwshd9t9jq7wm',
                remotePort: 9083136886,
                directory: 'viwqdeyii8wykispb2eocq2hdzzt3ffv1lfkwpjsv138hduoomy4na1o27qdcqnl7bfmfwl96i9fv6bgfb44b7ypi0gi8vyatdhkqc36d9996eyclic1zkibupq7jbkk668mn0jmwwz6dkmb2jf1zsx6ici20x3obxlz3y3siupjeh3ino1unitvoqfgys367kt06z3nq1efx8oglmyan82iqpdd7svdhfieh13jfymd04v9is16etgigfzortxfpnqxe5p5o0b7ehheefdirporoa20iybqiop2bemd4jfxv0uexs35awwku6k6v14w7vyaw9w5q9fw6w6t2to67xfinr7a6nkf5j4ia3f35nlxceqb9s6itmxob9xo0h4waf33aba6xhut2mlanh47o94nlusw800l1icoxy1ibqv064a24zzja4jsy40rxe54dnbrc20hwwzzhgofiurw05bewgs53xlafboczzsq7q0o0q1ay0a0khcgjiz9v512zz73orqnf6qlcqmda7klfz2zj7eh249kr51bfmi6w4h8xagtllkxh8tkkwi8bqqupx3jkxm2btgx3oallbbohnv1v4ymhkd79rlhmmm4hy4gin0iiwetml5zkq6f6n9aosqe8wj1pwlotqojyxd8aux4lbqvv47jp5rrztkwgfiyetnnafbfgic89mkiqlwrz2niwabtr7q3j1mgfycdlke4s2yvgpar4ghgxbcx8unnmv3bwq5wsj8kus04se279zh7zn7y50it5vlkfge1udv9hn09w7qo8vypy1ck35jgbeoxmps101j07mqb5vh8n8dr0lvld3p26kbfvltg7chb47902kimhwqwev71o2fgfvcpc32fst0rw61xois35mdc41l5kuxcqufhx15t01bo6cd5f5831jq8hrveuffhz36ci0gfuonp1uyyc4ve2xzv1hmmtmyn066kuhv8vbmpavipa5ims5x1fx2bylz296ye0s40rgyvy7ezlazc',
                fileSchema: 'frdq98wl3qaj47xivhv693cbqb5mcib6s55xs6ty9lb9styt83bbdj9nax04gjda413yc18qsc5zhms5wixi5x9wxj1oo3jli0lfqfo5w5d1m9h5nffa9e5sb64bfagw6gixpgmud7ocktmnnbtftdvvwxbq1oz3609yswg1xizoassujxnltrbucrnrqnfsm1vzvgkmdsbj9srqpqnxcw3ectrst7jrsp176qpscvoyzyfajhl87pw36tfrbu52wc9bo0y795cx1fjwufq1vnvpluq9vcj9rq1gp1qgainzs3h3w2iaz3dv14lmtf23snfmtistasc85od8wm56vefat10oxhfiyblqp9y70andk8ppzqeyahau32c8mb1vjuj109qnsagekuq5eyytxbjy1299q2nj3f0urxekqb55d8bfkek6me9vxfe9h6h9qdlkukg3uw8krtl30jexw69lie7ake2yh8i94du8d62o7lngywvdxtqvgvrcugjr66i0rru5jt0evtvy2f4936hws1rhkhbvqy44c4r35oqrgsl53kofoj8unns4ja9ey5p3pbwvqy73vl955zfhvguqxujty093o2jvxqfrlh9cdvh7vpz41l27v7ek6k5vi19f314egdpkyktuofyboy9rf0w6axu8hs7x0d7mxjsrybknwqyjgwokrz3xr7ia9n4ew7x1mgc3ffdemb1nw5oa2nd2yvhqdxkoqgn6w3nht3v7qf82deunadfyjrph01szugnx9i44yb7euios2hh9xbnktte12d0f1l1hzou0af83x6jrecxakt3haab699prr5qe9ct0xyfsaql8x4f8u99noztkhnwyzs40fage0dnnabpsd4gfq4k4zhodg8a243q9b8vbu9ndngtmnbdaniapzfudyjzht7fafzbdi34ucke3lekq63tsxunzj2clqct3kfuczeisdop69745u3q0ztbnxkw4ne1omhe4v4cjg194fp7b28srbd6m',
                proxyHost: '8lz6laalodn1xhbr966tfxz6n61lqo1xsbnjo6vk22vx1s98tpng1pc5jzi9',
                proxyPort: 2358030435,
                destination: 'jvvjion1lr6tixdg817ey7izx7l5n42a608jysv1goybf4yu3eom43j0gdlmu9nktdb97jf5jhwozeurwr6i2fpt7kk0kkso2j24icfbcgxhbuvoj100dhgqeblancw86tyt61hrypes6y591o3sn4f5fo46meb5',
                adapterStatus: null,
                softwareComponentName: 'zcs4wo42ti9j0ee3jkdwp4yok008t530h4lxiesqbtc98nb4xxgcjhylc0wxo6sr17j5rs3sg1hyg4rqwuzsn46oi0tq09hs9xxp3ctak75rfw7ytgl15vcigu9jvcesonizlnto557sgs5y6f2vu5k96qkoexom',
                responsibleUserAccountName: 'm5sd1h8td81n82ow5onq',
                lastChangeUserAccount: '0ikzltepss0p6onawar3',
                lastChangedAt: '2020-07-21 20:25:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'eevrp01evky4kyy64gp08to93fbp3w39v1zfveqt5kh0w0s2vjcsvoeqv5zborz660gjrpepe49jl4jwp55v08ikppwdl63gv0addgobd9nwwyn49atz6p5qulohfka275vyo7mm1dj7gt8zy270wb3xdczgipji',
                component: 'mpvf1axvrt5mhon0fawly933wri5thclfzuetc6hfow4fyntwyvj2w3w8z1t1aa360pbxung19gymkex4yhsp2o1uhplbjzo30krm8trlxsmvei2klyjt89togfkqqhzeshb35ju9sg7b12y0kcm8q0mne5d87dd',
                name: 'npx68ml9qrtex0qivrybj1ff219132zwir1tnp25dibr0su6e8dq20k4565kk47goh6n8z9ckgimzoaqbra84i6sdthmkc3ge3iveowwt7wwwp3okjgdra2lg219mboznta85pn6dslzxsgcij7ntibvoux3ovm8',
                flowParty: '4xdn3rlb22wis8ukxcerf5m8xmxyw3aq1didf5rv8otkvh4gb30f60omfz0v5ty716s1utg45sl95me0tctxskki90iv0lkwhhnnod6uqeioe0zdsffkr99rkhzgq3yzkfh21vg00n2llycmay0gno4upudo96hh',
                flowComponent: 'pv4bh1f0g8d2efej9ybswrvra4l0m2gdxjc0nc0fjvkuaf25x62hbp4s23uq8joxvib0jwzfcsfsmg9o0ziz7k6xqjbtqmfqe21xxlv5pav3axn82fdg7l9ovalnih5nmp34o0il04xme2z1xhgvzlrcr54b05kk',
                flowInterfaceName: 'k83ewq8t8zo44wsoyy2cnue97g56fbxblfrxm9n5l82ber07226psst7m004gq7x1epkvcl5s7ge4iqz7a91dij1ijmb9axyijpn3bk9blvm0xwgge1doxommm5y0k9h0s6fumtbzrmeoxli283vdhha7ftyb1nc',
                flowInterfaceNamespace: '8buas1cuw83u5tws8dnqvist3xfped03rjwzmoxysu32o8npo7xp0p7mv9zvs1rwliw789uf0kww56jafyz71szn26to7p82b8attkb6qybqben9fkxad0u4tt0x4hxuvxi4pudiptsbo8tqy0d51a1esr1j4397',
                adapterType: 'en8mb91muxe6f6t85sq4u4ksa3bnxfetaz3uchl1dv6x0sw5iqbxp9i2b6im',
                direction: 'RECEIVER',
                transportProtocol: 'f55ccsibkus7b8pty8c4snada71x2vgnzab5ppnhg8ucemxn36dy2nycpca6',
                messageProtocol: 'mxnlyggdt90h1x9jvgmmw504ynu46d9usgl9lqyko1ix5uy1acem19ubc8nb',
                adapterEngineName: 'a4s08opqxy1c80zdexq9e2a5smqty5uwgtye9pnojpdrmhppf26sw7tmab4t333ce7az3mrq12use5y6jpd4702nyexiuj1fna16s9y7p2ktioidlo69snkqx167ex3bhme2nnwe4na1yg1a8g1hziom6r2t322k',
                url: '99c558xe0qtfgvwdfy55qznknzcztb7ggdq44fufm5z5f2ptqxje7fqujezrxeg2gsf7lanzn7r2fogep34a87uocs00xegr37xvvwqu3i7e39yuq6x9q3s9gp2tf7tu7elu3pmkhg3b12ljpkhl5sk7k5rd99roq010oiw0gnya6jl29lflbx5ytxx1zfpp4isg3dzclcvsbsyru9qb3tdvwnhmxixpnn8nl3xpx4yfujlufr2cdgkkln1i69g6by1h9rxe503mr3qgwwc048d3w08y5renapfhzdfh2he183u0vbm1gmk2faxtoxhe',
                username: '4jbzby0mtf0azrmimepbar377cbd5umkwgfefdeq53gv06fqr9u56eay13nx',
                remoteHost: 'vmg1375zxx0k6i89j69egv661nphasa7bi4exel6ur1ex7mrpcbnbva0y42glgdqln49errrhpp0b9uxg8yggb8vzoeglq1njgkmz14ihiofp4gwkq3ccp0baignvxhenqvy1ovdt1c2av4cv3fzwingsga7xgws',
                remotePort: 8863851321,
                directory: '685quiweai88o15du5mubwvkglyqyzcmuhe0sxyerqhek0wral5cxpnzgeh9izthnchmde58kqjecfcez4ga9td8b3sy2c9hrqqpq56km6rsars1ulgqlswy3bkkumxil8yi0tim851udt95uhk3438uibrf4kcttl8n3h6nsfbtwesee3kjtr0j3zmku1u0pfxtwwoeipyxhz8bo93kvjsa9ijmfdwhp2akgu7khmccw9swz1ihzhogjosmkbqt8o8k9hpp5uucdw221d54hz422f5ebrfj35ak72vtfwgs1amx89fhal1q1kh5j8vzkkm79osc57hcvidtz0xe4uv18uk6g9btnsjsh7lwgjsjvtxdzdydton0gww5upnzlpvliycg6rb8eulylhczl19pc1iho6ct3urnm30xdi6kihl3qm7e2rrdt9q0l6iob7kpogn6jzllhgt9jtcug9k66tc33620nv1gihbp0a2a06am6jstrndyr6lj29cl0fxsvb4wemhexw4ysauwaikygmjaq8469302eplfmwj2c0gusetaz8w8ixbujef577xi4e8ufkbkr77pozc634whojs3o7uhgalp296xndrhe328sxl99lh9dud13srgp67z1bnevbordjeoot2gkfltskzrlgeig6jy4lw45e0j6qvmt3ie7ocl6v4c3wzy7rm95ktnz7ceo73rklg8t7g958agk7gwwxcg6q94kmsynrgkjsafsl78e79s5wz1v87cv4duwmqm3fcussx4n68ed5ughcj4j9t5eqtc9078x6lfovczffm3fv64z7lw8tas2vq1tz3dbkhknereap0ldr4vsv745gppqo3s14qfp16dv26uc809j9qoslz7niom4tcacuap2ikycdoka208uo8ehalkxkp7vx5bhl3n3zsnj9f079vzciwvpvviy6m0zszt6ka6rqf8ekeq10zxtorm6es98u4q0vbom81schkx4gsrgcgin4unnidk',
                fileSchema: 'y9mwf4yhanue5p2slgyjprdyyelf5fhq4w7tflju0frdvc01pa0l18015qfrcrc5p07o8v0pj36t0ckis82dct1my9bs0uwygdbhllt21526lzulehy5503mr9k9x4suf1a6uks51avsu3ei78q3kgl75682ahobstygdn98ii4q2gb7lafhqgrdryccq2a9jepnmoplvjhthkzdvty1wj3uh92vpohmqacv1bueaxjz9gyzhh2hbjh0ffiwcvj8dxujqp0a0tbwc8pj98bxavurc5ovs0zbf7kzs01gid8zsce6fmcnkeggb636g5gzb0qq8vshbzc3oj4znhl69k55qlvg7spaqx5zzabg1liuwtx34j7x61uo3lm6s0iv9eihjqtrllaz4fyspajktl4mh0he0xodrwy8kvg4e2kuqs34wbde547lp887wc0bdcq98q8h9kunq24p7n6rgs80w8zp0zb5n145vdlahmpe0vj6qrc5ce69vonorsbj6ixsl5law9m3k5jo4jrp5s20l8pjsfgiuqzcefrspgvsxiomzsbfu5viq682x37u5x744o3n7oyr2r7ajzeqob60v3ukjeq6ycl65q9xuu2jjlsitw4bisjuqqzq7y2w12anhigxux9kx9kymuru70rm91tcva13trdxpjmj3w4vdsgm8n42dh03uvywqd98o2jnn6smiv20zmxcb4ld06y8xuzmv2u3ga87qfxo40la1rt340j73zzsojavvvljpe2zmwxvji1d8o8nprhzn4rvavvplntoesamr9gn8epsm6tu1u2xh742mrtphy5kkaahysx5xn85k3lmcx7cs7kjqj1x216uvd49n3f925lq70ji2dk2sw46sj2q3qh8c9050x0stc4mim1i40uib2ed3idcbb4i729h6rqkp9fqe8u0oh1dw2wm2nlf9b92e6ce3hdtxug1yyi11z2x3dcwdtjnxyr3l9xoxf350w33m1mwxderfsktgp4b5uwa',
                proxyHost: 'cwdeq1m1opra5y2hd6joow4j6fdon4dzr0esj79eu8vs1o4mouw6on0pntqc',
                proxyPort: 5627501380,
                destination: '4yzrljqscnz57y9vq2cpwxpha7p7lq5k020cdagq8hstq43q757j96ew2h9zljtkb3hhp0ge2owbxglxvhrlpngwvztd1iv4qi2ta5muh91j8273pvbigdigfn69aet6gjar5llzd4dcr5wqa6mw8a9vur02pp5i',
                
                softwareComponentName: 'r90u3kdormtiht3ng7458bf7uhsabep3g2z9cgdihfq59xvmbxrhsx5ip2jdoyzptcwqukfi5gao9yx2bsjn7hwrvw7vor3zdg188o25a0xgsfh9jzco5pj2ct1c6j77k6hecwkvm3lgdrhh5s1aeliuzke64pzb',
                responsibleUserAccountName: '4qizim56klwlrvn5fj44',
                lastChangeUserAccount: '06j3qjn864qbsxg3t8as',
                lastChangedAt: '2020-07-21 06:59:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'vcci3kbzpefka22a7iwa784ogk89wpp88fvjf',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '53ialuy5ylbf20st4uzfbb8j4se1gd999b327qfgf25kydf7enfrivb3yymrxaofi5prg44ai3li45mhzu3b6zkqbn7ypmbw3irysjhv57e5g519o5b6gf5nas71yokq61b2zs70y5sp5xoi9ct90atp5ljfmnij',
                component: '7gamvjuz7w5ea5gkfbjvzv0dcuue8ypveo47tyhkld20crjjdgidmcntsfiknn6wx2qy1727xjnetxauxsudwyywyg1gmqx9d5mlv8szrijxgn643ezxp907quc32bseyxn8ey2npzz8gkb1ihaclza70302aq1e',
                name: 'xrts22i17dkeqao42852ko6kpzapjc9mt5ikr1rw5w6kkwmxrkr8z8legh4oky62l88g71ydowgvt4ctln2crero0pzf4modhmmza1z8w9a82ixfz1ju1dw8xtczm7zsjov3ydvvzxol5mqo1t4y95c4845vvm5j',
                flowParty: 'n0lhj61udrmh1rkg06yn19oso89l9d5ifptzalci396w9iy6xkbificnhzc649fzetr0ncr4z7anlwm2tvyxg8kw8706nw8ua3z1g1ilhsjpjoaeb8vs9lggt21j7xw0mumc76hqtaararglnw463flkoiwvampm',
                flowComponent: '5p0yfm8n4xaglz0f683x1aysu53bp6j7hjxikbub7srazrw2cfjwecr2vyoho51q5ey3as5uawu15mzkasbrxfcgg1vlv8htztye1vrgtjlpfksc44qbgsdgvv619t0qd9u8dbzq7lwgh2s48hd2zyq8eo2dnsdr',
                flowInterfaceName: 'hcdv1b0w941c4kn5vj7fh90ksfj0rdlnyeynyytzzfxbv213htr7qrykf3nfpqcmuhp6wuub77ijs85vh26kmn2zdboj3786d4ca12iirqv8h5eq91m3bfepsv5q3iwis93fgwkkrroe91et36oz4lchdk11o6ru',
                flowInterfaceNamespace: 'ab5ap1o8fjm5w1xvmblmjyb61cwp11ky2d9ns999tyjsxkt3jdh28hcbvpjk9wdgvplne63v7c9aiqlrmlb4nnufh9kxw9v09zxaxfc7do7q54xevcd72045dicu3y6y7ydw2930plvz354zffx7ltru19kyi6xf',
                adapterType: '1cp4fw5y8jcvnhltqakbm782l2vrn3uf8sesafyw441pd6w77q9lh3oal4jd',
                direction: 'RECEIVER',
                transportProtocol: 'pv2jbgs0vbdb1cfob56xivlix0lmnyd4x01vc01ccs82nrvyywxlxnoh9zvy',
                messageProtocol: 'xheqqj2lcjmb3lmcaonz2kiec1mir6l2qjjw36v6opg9185ehujvpca4wttl',
                adapterEngineName: 'r65jla051c7k535f39i5u4wx4knc21lo99i2o5zja1adgckh8jtws1hratd75gs45ffm8uy7bh3l025iioh8q45frw5xaihe7pzinh9bluk71k8f4wwtrc6mcazrdgnf1okm2aa729k1ey7ppgw8t7erj49gwqbz',
                url: '4ulp0s1353z5612yru6br84ut20wam3uyl0kuahhoscd1ixbw661aucnjag0iniax0sudl7w0zmrtw4v1k3cd2ff9fckwf7jfu9u6i24tml6wva7rmdn7nsuh3p3rmzqc6ohnb9d49fpxip0jru3hc5b26kmak0q820edezy21ttejof6sevi4su2qe795sb0c7b9lbsmxo6e7oujtw665k88fgiu5x0t8ynz8c51cnxxjl3e0xidiipw6j8rj0ycpc8pvz1czbu30r3ihl9deg4u1szcwl4d7b9xdh0g8c78tzwawue0vodcaadvd4b',
                username: '2sl0rkvmvxi0dovu7qba27mk1lkt4cmvf1bbrjzdgbny4bap16vqacijy1gi',
                remoteHost: '9ksernx2d2azb7f5dthtkjm0hnebgp9nv17r1x2ih0weh9o24ttnrcssl6u2afdl1ma9rp956n16ngc463489axhk24xppq2ayt961wwo93wi7elb10b0ahwsqjk39fy8m63bad3p09iabez3axt2de2o1exztcy',
                remotePort: 4486170125,
                directory: '1h6lz8ugvvtvgm18fgx7ug2110jeddknbfwjr2b0brc6mhmva75p3b8ct4kgvecoiroqodyxmwfw6et22xbp4et0axlulaijymhhrtjnrv77r7rgbkm9u2gcdeflem5qbcpi2vsfr84cze7yxtc5n1e3id3fjmsz5s452xguk8fuaqbk9mt9xje404cxgbbm3v5fjquo52ag6bbgkz8pg2oidk86mi89vhudpo09x2w3snqlq99oox1b7polos26iejo9ovc4g9vmlbbqroqx1139k3idu47nnyp85ns1fgka6rcx9esd9akyyv6gcygykkw5wieyirz6ul2afd6gkek3sl2laa0ak911adyflqvm3xd25uddezsbweu0nuxiseezu1y5dk77b8uaxcknxkvdmhjahk8rl9ji5ks1tkhefecb4zhfbyptbiqx14ijjtl1cjvusvvrr44lf1jqcqidge82vkvxlekvoat8pytb1yv0tfmc48xz0qx0nao1zddairjg14isx5x0brmjb6c5fasierpr6qvd6qb1lks5d6sh8gqsmngcayu25cr65k8jt1iki3v3d8f3t6id633i7v79ph3gx3ykvfxtq89k4ebyxyjeuie67benp65b5ntg12r4yev4k3dg1ujyqlc4xcvvfu7s8b2uw16by9okfpa4ze69mayrm3swhleyj94me42lxifx7qjrbkge6e8ld74kym0lajpvbra4u8s2f9cobxb578cp3rsjpoc0ok6kq7xxqi57ylv0zu240frs5k5ylzumkozjc5plh4y9d5s2m91v2zqq7w06x23wscns1t45s689f4rbnrcyaks8h8b3xpq5endlkklhf7ad9z93yax5z823yny96sodb0miwd9w5mky4bt2l0g9ulnenob0yasvrmbsgjcgu5i33qmgxs6z13g7h3k26070hcgp4bob0np3ielf2oaxamonc93hkc3zy8zp4u1tgcua11jwlawmd849h0xxmhm',
                fileSchema: '0xfth7nvwrxtuhf2rzhh8lchoqg7zpm66otmnmgh9ew732f01kj4vxl52zq90aen63e04x3iv2skt3g999iskf7jtb3qyvyjentlvj4dptu8ijwgrehzy1mlje97eo7ovsud5g864x1lpromxbxs7tkkjjdkpqm11h62ipdp036naqbsz3yz10jojrramk2dgps57rybwasa0gjchxgr4e7hwisdisz52wof1gf17j6ac5hshxekyx75ncqmydfwrjat11172frylqh1ws209v66yevytnvy0yesboblf5g1gp7r2esn8ir89ap9fhnhokp4da8z5hjpr7mx10hl1bg9momjrpq7h3680mgmef32cs68dq6nhhy0342um1yq5xtmipy04ex6ef0pwdescg52ds9vmrpawaha8wtxds1d6t94iwcetogq3r2kdph3bgtd9u6n9fd0s10wc1flbb0wr9x1i3vj71tp4hi19r10el2c53e45t8enh979ylj5tkvcnqv87xiigj0pcttsbkvpg3hvvor9hyj11haxyu8nn3azso7iug9mkzhp56hev5afbi3eovie3iv5ing79x775kh34e1junq3hpv5kg8gdqwz7075fw0wtfsugo5p0zx2lsiqypk9uqy6jz069226tost5zksfrwcaa66j2wd4qaxeogqcy0sgg0uvaztwydohcxgfmr2lep1umvtwekgtef95p9qz6u2w14vhbfrjv4qmyjeqylmng325e5ptc3wbtsknkzv4mr75euqxkmf854by4y2qlv605kbwufzg0jzbkkffb0n5zulqtf6mizc8kl57jcmtfapth54a2yhxwmuuhhua4rcboij805rgun8k5oadseoswbo04pe4djqo94bbz65lp316kj2dhvlz3hsxam1zhkynxjnww3xnt79yyq786vpaafz1solatsbjglvrxbszjcp0c9oj61r3fyrfgenl25pdiub7ua40pahvlik6t9agxuc7ke',
                proxyHost: 'yu4rxw2ykzkf4frj8nncouymrnwiascyc1fj4hest4wckacvpq83qiy60o76',
                proxyPort: 9670325437,
                destination: 'dzj2ljmjrhsvq46hn52hgzrt8kt3iuqg08i7pwydz5c1vhe9y1ftn9pflhy4wbyk1ylollybwutgs1fl4bnzxs6p1jls2npzk6tg1s1sg2kl3buz8h23xm2f0n502n31s5cjijqcbayz45ekws8ndeqswr5hrcfu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4zy7udjg05xx9ovh6ucznfitaorqookqyrnfym5i9pjrsn17lvpiwk5t7llgdseo0t6wv7l5f47g0xemlk0noosq0dr80ff5w2ttb8tbrf0884mvn4wuupdb7wfhv1n3fwjtehgrfek8u1f0mjl76vldqstdbz5j',
                responsibleUserAccountName: '81qjxaj5xnz5mw3nqh53',
                lastChangeUserAccount: 'cw41u52t0rcbwln33pp1',
                lastChangedAt: '2020-07-21 10:16:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'ecy6pt68f1jpkh73zya1qj6msv48f9nkglo9o',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'jgtwuv2k3y0tsfcf4cfdmie7ybfeslge8876zqqc9xei4hzh0pdkayk322w3o4k0ddljij44eggn5u4c3oembvxns2onrvtzyqszzrknrv8vz7lixgpdjg378rmfv5fy8lglfgsikuhgh7y9112dnxkhs2nj0k9w',
                component: '9j2z7wryr7a9wedxwez486mumf5ljrfitke2fvqzfups6u8hinfb3fx847p7350q9n5ku9axl6100xmor1owuqd6j0xtsou1zj6lx7pq8oobka7u9na3vpclbec24w1g90nv149b4qufdarke1xnt2mlt0ua4why',
                name: '78ytgn9s5dx91ska2a6hn2t8txm2grhmr3mnkvoi48gp6t9q1wzw08n5v74oucjxur4d9b9wqlzuk2jgvqyifpidlraklw4ffcdfgnnh2ogoruq12xa3qomo505vgla91clan1pmltujijf0077rhnctptldw6dr',
                flowParty: 'm49iqb48y7u9ezz8hzyjdzswem9azavhj68zww586b2cs58e2yem5es9ub0vzyjs1hn9462padp04ojossd7nevfgwyn11db64ypno83s3yqxemuh6r86mr7egy90zyuizu8xrg8td5v5u7a14f1zpt9wtokh8c5',
                flowComponent: 'fdf4h90x3s8c8p86km5m5blrokcxk0tg671n2qxxgnimyhcgsg6m8tr4eqe6t8pipfes1krwbcnbcru9c4n3257weiuvqhycacqio6xyjaq5aopvmcq3u0z1mtkht1a2mu07vawx1nm9z02jfyxnjdlrv0t5px4m',
                flowInterfaceName: 'qowi7awy8k1aajbylcudrgu0xjbtlbx1kl8a79sn7rw6qmwrqrs66y963d09jnpcuvkb2lsum8dfdjgdelxrefbtzeezif6iamsazxdxrywuv69occfm9cm2m2x8me5avxycfoqtkjfvdarjkjqmfw6xsqt3q7in',
                flowInterfaceNamespace: 'c1rvupfiw5skfmb10zxmdxfe06iszzwv22ehqu9xndp0vpjkk7nhzm0zlmgjmlm5247gmp8zcyjik7hizrbgfinfa2uxzyq72ud9o70prmxx96kzttk4xfy6zlc70122tz2q3st9jy6yn5ypwyaq4u5g5e8za7x0',
                adapterType: 'ua838ydgevy9vjvrjnsyicurph45p9ac1paxx6cup0y13p4sktaub7k4lq27',
                direction: 'SENDER',
                transportProtocol: 'qloo809ndi3r3r7a55d8bun4egw8ap6nkunhh7qzkdayfype74jq7102v2yf',
                messageProtocol: 'w88amwh4o9pqr216sljll51uhbfsbmu036pntvy77ktxwim065a6zla97nzt',
                adapterEngineName: 'jv238xod51m0nnbwk7b0h4abw64vve6axggeuk6pv1fnmoneidokjgphaopzhrfbfe24epyko7dhscsrqc8mnxtznarl35f3ebkcdnpfknyh4v1kp1aaszx3b9squnevub0fv2hw7tn80afsu2xpl3bvp43ir5gq',
                url: 'g60bfmhl41il42jh5c1z7naloz54b2jw9gzrhsb7yxcq03ejd3qkq8knbl56hih1ov3kme3ywm3xfrs8s1p9d4dxs96pywj7dd1vnc37qk4vcxc174hypkkg48iu5idw7oyb92m45finamb7mj4u7r289xd9ateq52x7aghvub9vitti1pi1bk8h5c8lus18avzeer9afyn2724gqci510x4w1m3ie40e3v8x142hypfh1jq7ea6p09v6rt9vlon51158dshe8nn9tngyvx2e7rlq7kucakdxhrs0lfmby3teflh1rpntu4mlcx3dzwr',
                username: 'gamng5cdm1y600pxbi2lazisooxaq6o7aho3779n3pdbcsrjgshi6prcfalg',
                remoteHost: 'cib13dot2arbb1r4vq27j5qd66nhax65gdvp88ooeij7bh9ke4iu6dewur2t2ruovsrc9lvyhxwmyajlyu72ax01my241s839g69wr25eettzquvi4pyrmjw29744an3atslctdd7v9faizncoc8i8raz6zszbvx',
                remotePort: 1216526558,
                directory: '5qg7m6nme31eeejuj1pk2lnma7mewm86txg0gc2xdgrhesx0bz5rz3x6h19js31178bak98m8hupvv48te0gts7o20oempjllnf0r4r69tniygx0i4e7ov5vlvqzlc9ibno2e84zn4gwkit8qnbnp0u5kgx3xwqpdhtizmdr6tfvsz65879g4khnuez7cefxwz1cbwmp91m62gf5woq36vktrdqd54q0wugr1bs4xu78z8jkt82dnq5e467z1spkkd9ehekac09ceujcjw6pd57yd291k3vc01nyjo2q0bm7nrc515x9vm2xoj82850v2taei3ng7nlwmyiycezrctphzmvu7xwreatl4hxrikbv6jy6k50mi9c3ltv8w3oo7iyscuve8nivmkeos8tu9ve81qscmnohgygtsfq9lgjxkjf1fbcb38x31d3qwvcpsuomgipq9jbmpltwrgrmzgvjqxqz5u1z3s41g26r8fj720wyqi7o38eai06hx7whwhpb7i7rt72xo8okz1wsw63yezpv6koxtbzslnw89pexztnkwh6l0hoiutixdot9adpcfif92s1qivopazlt0r076dhxwbgkgweriaai674dj8lqpalu7y8uuwijg99vpjp7cavnffr47hbppecok23nlds54trvqrccoxyo817uvhb8ksyi4z01qxtiwx1lr9vt9aa9abbs6u9ob7r71fmi94fjmi9l2yzrdk04fevr8bul2usjpzi7eza6lghh7rrmxvrziytdfll9px59c9fefcik03j7h1anxw6oi898obxigsf3zize43oemt8pk0nja9pz3nagyuv0ajjr3mqeua969yw03o42ly8olx6cwobew7vwqkbb4m5buad4vww2ob6g8cvhx0t3zx2eb7cp192drc2vf4f8upymqedxl9xr6lbp1yxk6iuewsj1fj2tod1jri6j1sceckolqyrkkvue4scyfq0wb4vnrykdutbygf1hofecnk49gbsx',
                fileSchema: 'oj2k5ku4cuitsj2vz5cjp99wk9elkjd0rc3o99albl2pfqe4im5m5ef1bcl579xkwhkv3bhewjsjs3u41nqegb3l475e4u4626xlx7ovx4qjffbs54ounbxt1jhlh605fnneozirbzk7uc11vs1bdcy5r8ckqp5c14btebu3v8aefdo7fi8dfw4xc9tshkpn6263lz1d4r80q99azo076dp1an3pe2lu3b9cbrglgeo7tmjxfhhoge6k117o8l8bw31o970nmwpod0v48i77ywla72lpetizcubmie21j9yzfql5npn3hl7d4frqd3nouj7a7e63bpqhdhlsnhosbln9hlj4thcvdieg6vq3un1njgr75amh2dsrc0x4wtezthf73kzumun3qbosmfuvqc7jq57bxh7yx5nhey6ug1q7z99nt08rtsrfl08waitkrkqw0u7x4774ao5tjyx617owihcsnertxc7i3e7c48bhltvw0nvkwpdfl2rdj3tu60f8x7gqzlg60lcrlg2h03gs3vviyj5m3cb9kzfoynckdbmjb44svr7sf04vcvq90z93dt6ksf3ka8z7kiqru1c2pner5qjzsuws59vdlqiaz0pnypjoll82oy63wds6yqln4v8avcb0uzv94u37hwtwpu9igr79k2czwi9ap35jq96bybnlpuj11psc0dx9xqnm3xn0azhjql2svh8hvk6c7tzlnlu38t1w59e2fggwwwksvpd4ukl09fs06arayko5mwrm44h9anabkevy7drsgtfgkkbh2lwfhcfr6hhtqayf6odvvafs1o7c38m91w24z26e6e9xh4j1fsf9qtbp8b4bc8mb4ddidl72l6reycr26jms0fbhr1kv6mu1hl2wggfthrj64mw8gtus7vjjw6pcbvti2ei2oceeqa20o9knx3wymihr2avjwjf54qlnb6dwfabdve241rbxwbxumvf70u68t3ccsqrm8nso4w3kqwr96wrfhdpf5tll',
                proxyHost: 'rje9956akwb5uxswmu4sbpc807plwdmeh7qb7skpowq6oul9uboo2xxkxgp1',
                proxyPort: 6334053901,
                destination: 'a5itg19b3g50jjzd5lhimcail33rrppjn7yi7uxz0ojh5nlxu5qn5cnndbclisbr1cnqb6hthw7xo01l1n4h7m010bu9kejhmati7b9185kt81ig64467fbs05avtxxw8v1eu9wl6qgu77srb85p022x88hz417q',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm7igkwxfngi35y9l4hxy0g35xgt5zl3x7pd0rr5se667wybip3duv1kygrmf408y6qhusqzuu65rhiogsebtlpa46wkze9hddyza8ambftq8ha6ukufq6e5cw9i5vptb29b0sr87bvuksokzs6qpfzdrww7n41l8',
                responsibleUserAccountName: 'kpq5kuff8rz95m2k3rco',
                lastChangeUserAccount: 'tqf6itsm1i3vprf8ckwg',
                lastChangedAt: '2020-07-21 14:13:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '18sraf6uc1kilu9fjoa3qzw5840mwcixnnyux',
                party: 'v447x689ersnzki0incraeyfp0dwv5vk4ovmm95uz7i3auloll308cnv7c4jqvepglf7vnzahf6t3usforghk8ul03j3z6zgje9tb4zfxdu9bdl95ev0jnypzeoqpai7iscv3ofbufopquc5p6jzwury90e5ri9n',
                component: 'asmp2r9hdr4oe23wnb515tnyx152adekvkpk8k08hrj7h76kugu4osg6t2ds8oqx68re7952q1glp3feyylsjc6mtyt0t1vdt1ikd1e29c1hqlczfus8u2ivg6kgowr6fb8lyrscjmrpn822hb8b913ox5601jwp',
                name: 'o5okz6r8b6v2dtyzmypf5i7ejnp0uf6humn2ot4duu1zrm28xij9z7aiau26n316xfxtrltwo430v1n7duvt6v6is0xw4v49yzgcxvjfitwg8voc24bnl3hmlgmi5myhqx3ixvnh5arx418mo81v9if22pezcteh',
                flowParty: 'nknrl0kmbteihvhmzotnbkzmvy6cetckldqt3muswkrpfkmz8dc6yvyjar9htkwm9yp2omh8kjsjpyfldjp9o1s8e3p09s1e5a2kx1lv13ry18acuo82qbr5mximlewhhw5io4utyy0osegqsc8829q31dn7mzme',
                flowComponent: '8nvqani1kj1cfbhjxwhoycj8tp11ulbkf323a3nsdgj9pymtxvlaucvkhpof9ifqgi705xmdnbhig8j8xp3tfnj8avi41905vkp9n0wukmtwy4qzydqwnwzdd5zewg3fylvv9o2df8nvqyraaztabz90reo9i6rp',
                flowInterfaceName: 'zryz6j96nf3gnq2utp5yq76419j95hapxdb031zcouvr55tx0t3kacvc38hkmnuv17oe4fnfox1mgi2j8f1431f0fto8uj4qcf85bnvh085hohz6yhw6px7ayac1is0vv34c2v3v3yzmf9728c13q7g52n7w9g8d',
                flowInterfaceNamespace: '07z83gfmo52iom09iqlynezybge83xwctkimg9mrqmxqpytw85nbe5i9vwgpbfb6r2jo77bs4m92qkbaxhad3sycisjutlpt380ru7x9lg33wkdiyvhq9892q64kd9mopej3vzhy7tbdmsngi0f0kpxi22nlky0o',
                adapterType: 'h4o79yeyzgvc0usfbbd4zsqzn76qvg3wg6298eixlwj3zsgsk93e5ea35ome',
                direction: 'SENDER',
                transportProtocol: 's0k5h51xgknnyols8wov0mas9obcrii6ny4hnfb0hp0e0moxx4kytgkwols5',
                messageProtocol: '5vgu9sjq89oiv104l3iyf42i0tv0pjxh7yoyjnjfnif8x42cwiccdqn7mluq',
                adapterEngineName: 'ev16ahzia2z9b483l3twh50749kllbodfcfv9qlq7r5bglyxosyldt07qvk1uxefyi9gdbw8pbt1ccd81d7fmeecrzcidl62ux1b5eylnjwwyq19ns6y7osqy3y6ctf22996tn9mopkfwnnuegg0uq72qkg87626',
                url: '2h0ebtycbi5djbhp9x45v6snxpulh9j1qqd2277w65f9hr7dzf4e7azlmx8ppflr8bgy7kls363ehs2i97uv74m0x4d3z4zj8acc08xb4ne7qfgwu24gbh8fr6unxxoh4p844nyosf6m3owm83095ax8hmkgfpp1kluxy9b2lvf1kwvw1sjbwm86z3o8l4ygliyxt5n8nxjqzus2zimzsmu7hs4uqnr8398jkce84xg1t1b0fi8dt3zyd0evnhjs899x1o732gxatnddwadyja04yliybe4zjpvt018ll7myeu2e8v059tgdsye1uymg',
                username: 'wqz08uuojy0nmw33o4obvdm7c74uxz0c8ikh3xr0kers84aqsenu89ur5945',
                remoteHost: 'qhj5ck7nmfqz7jtmhx7zucoof8xqgiscwlxtqgslvz4yelzrtxd401moor1htm11bx3i0prop274cqai7nj1dqb64grd1028lijncdndf6wcpouydd1uwn5r0xo935a7kedhcw4fipwyh0uper3nh8ssv3z18cnq',
                remotePort: 3612039038,
                directory: 'aejz8dnzb73tn8khmipjjblp58z6ufkrytealux8muwpcgwxq38gr8ae00bnfdxrcv5bd4nfs9jyelc2cypfoh27hxngpowmwt96673srp1qpr6846t0zj2dontdygiwtxw3eu711asm77tn4nedyqtx823zxxtkxgaom4oi29d7mkustbbaol3sm0mg0k5lxm59xeulpejwmhud6qipqifw5i7g1cfqh91j1o42ka4pf490f6mpvjm29ld4q6h267g5b0owpze1w1zxryjrudhqwi5s32u10ns2kryvwwo5p2wj7a05yluenoaxzjg2i2z6fkyzf011anrq9nfdiyv0yb1ad7a3247i5yj9qqh5zom1cq5gxfi8gyb6qzy4kmhxk37zqw3tx7weqvh0l6dwu7oz0i2owbn6b3n79782dtwy1oxvnsskddid36g8ii706682xp817m2kj6uqmhwvp47dhhoszjevs0xo3987vin4n302e6ucqnauf18uvp824ohxbbpy4fyeskol4i3wu3fsoncskny6dzxd024fzinubdcdge5xzlghtkfq5l00b3rzoo7exhtbebbw3odtqncyqs34f55rzpr3bfyq0s8qe9tyjqh8dmfxhd3is6ofsoctqodzvwfp9pgwrcait0hq4frubvab7s1dtjiyjm4pem4df2i333rz9ezf8uf3ruwvbtyn9it8p67nnrupeejbr6lpiecdzpblt607dpi20ww8o2y77ic77rr6vfmpv54gypmco5bu84fijwedotm4ud78pkqcvffbatj0u040a5giavmcp97dxkek3xtxs3euoosrrl9vxb5466dbl7tlxhgz5rk1dvsgtavbl802ppwswbn96uff46ygbdq3ckbuayhalyy2us28jefxx24siw3fro7m9dzxu3h4zjjxp2ez469nrzk8rea3d66bay30ipu9rctqimyrui0g23mkt111v6ados5e479bf3lorl1rmu9l9ozika5t',
                fileSchema: 'u6pfevedfhf2weempqj4yd46hk5khqyl41agwjj3l0e2iy20yaytwzyufbdpaacgin3m6gjb7buaz4uqmgxpm8a893lodnulumhalbih1klp6ha8gcybrxfbfavxgmpjmi46l1cc8qspfczmk36fxgaf0jjc1migx6mel19x0qgl3guh15krx42cmwt4ypqwoic5xvmq33b5ta3x8boxmho8bgi9co86r28m22i4t9kyp10bmxgankdxlh6i0bwwzrje7txeluamjfdylagdle3beu8td01h1q815sowg6wdp9ho395e5wwreqs9vryeq32wrq2z1vt8l47d108sme439ed9w90xkbql6omxdfmr2pw6n52i0ipawyz9956m7djqw5vy7c75gdy3yg804ofcoliledmnvpi8f9kuvqn870dzvvvqe6w3zibct3xitmi2mwtgej2zy502im8bmbrg9c5ldljg0yjwzlomqf3wko8og8vjd0smlsqk6y1gqcd7zc3qimt02rzl5lrtxbw2huulmg5qzsp0h5h05dlf66v27xugfj0xaimh06000n2rzwx35subziamvhin6var502scbu5v6bdbcr64y2p1gx5f75ewo75bklgrdkg5byo4eq6ojib8wd9lribl78040u4wr5lcso74wjp48tm9avgj2ejc1q7tkmlsdm5ivvapf6054wvvb12d7dg3rkegumx4cw7gy7ldyp18vst41cetb6zvm2b3dm1z0udxskrlm1xh4k6b5dhqfnuwhrzpjzmdzf64vbtzi7enitlu8bkuhexfmrowpnu4sjpj4qc93jxqpist4uhp6tweoq1fsn0lygfm69xkwytswo1ntftz9om7t30wd0dyec7eazphgorxmrly36cr5b3loxq0yjlg88o3i0gblbpu4rk7k4xs2yvyq5rti5m1tpeopas9zkztdwdbhjte85m6imgwffxei0q4e40at2jhlc2gfkp0vyi0k420ysv9gwd',
                proxyHost: 'qk288eezx1pgf6ep0r4xxlcsrrlxky46zfq8s8iz6zrrdmbpy2bygny2hc9l',
                proxyPort: 7433681759,
                destination: '90v4u2lmtxrcahpmzwqmjg1dq7i89aqzb4j0vor3nravj3wtb87fxdlul05nvnqv823zuxrztppkgnaeeba5d9ygfsynqh5vhtwf9tstbhr0qnmpfw1a0ifi0jooreghqrj1k9wfbpqo104f7fb28uyel1fp1onp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ajzw9ak1iqqdqcqyzs7958vwwb4hkp3gcsqo8rfwd9ydc2b9mdwes18infrg5gfmjrm9353di960iw4qm9rdbq523au8v39ggq4i5p4tkttr3a3ixrrec55ldrvp7yctlrhmwjd0az51t3j146o9b4vkn3g9asr5',
                responsibleUserAccountName: 'vf7l65t9a9gnu0iubh6o',
                lastChangeUserAccount: 'yi3dtz88z93952gp3lqv',
                lastChangedAt: '2020-07-21 08:36:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'c1xsik2ga3ltik2z0vdi09cl6vz9rvd0q4c018aio0wthk47yybk5tzuxjk6oafusfj0gpz4cswnyzsds4tdw6ph49hh1h7nbwy6ly9q2oro31oe8t3oisy6zqt6w9rl6zpa9mtp6von1b3q9wic10n9fla63gkax',
                component: 'qz452e8ti1srpdhaafwhyt51ws2klxp43izzh5fc66kna2jkp1e3ewpy5xv5jn23d5ha6swp56197a3c73t9q1kd0pogq0ylivdxxqyvfrahxmmju5s13bfrmkwtuuf9vletur3hyijoa3fzxt8g4e1wlg1f3kat',
                name: '7q6uibff68ho64ebjwla571oytpvjlv0ehslllpv17fnbyurwxojhlgiy18fy5g7sv27hmggzrnb0cyuxnlrwa3yune50cufzrq8gf80lz691ur1pbl29fy7f7c8j6704tcawne0kuqtehx4rgecqqtsk55cma6b',
                flowParty: '81ygj6cl15jyzsps3wrwvkyzs0e8ycquq7g16nwqqciobljwmo7wkfo247eyl9q47cm3uw21fr25illgeqjh876vljdfm6ul3pis2hj5a0fdnp1kunq55lx58rk7klzu1e0vxaz0uos7mge9enrw2y3ab91j2mdj',
                flowComponent: 'ggbi6fe0pipyv0cujmq7skh6lk7324aahyw16h2frwc9vkzstgbd29pmypfvavnt0jeu18fvb9ze5eppjm5y86ldogyj5m7ynajnkdl5buu9xhplfxloxzk725ryzkmyibmh5o91t9b03lioklguw846oiccun7u',
                flowInterfaceName: 'nau3e2us9u5zmiraj6aku279al260az48vih9uvdyp0soc1ho2yml7znfc60ht6dcbije1chbs87iuzatwjr6hpa4wnt6gmiwr4h2z604g9wo3ciuutjzbhcvnfvmhx5dpi471886biydflyh0x0ekdqcov13m2e',
                flowInterfaceNamespace: 'l9a6yc7v8l9lxx7gb8xqaxw9mixsqgaa5e5p5uiiegchld7ax0pb15jwwax1ed7habgguxbg1xi6amylqstbvlb8o9ffbw2kmzagwc9cpc414krnejnx7m8993cxq3xefpy154ivaq305r3320x3bq91ceayrjcs',
                adapterType: 'cj6eac835ca614z6z8ekmh7zo7976v1mjxdtx3m9gyh8qz2wru8od17sc2np',
                direction: 'SENDER',
                transportProtocol: 'al9qqrcibrm00miu4jp00m68n085sr4o8yufs2yyk8ym3yluzftuv2kehk69',
                messageProtocol: 'mgzsi3nvzsjorn04zod46pa6wo34nq3l3itybkkaeokfaplkvd1j0jmj3pbm',
                adapterEngineName: 'w1zexvetctqcdrqj9itcic65wvww3byzl237zqxbnwg4ycl6nrmmuobjkcas0vxj9h8vs0stjuf4a83jfwxfn1slrxturv0f2586gdr1y7har7g8bgwpeogrtqq7zugd3jgdejxx6fx8bbyh7xry7medp2ipa33y',
                url: 'blnjkvaj4gh8c1kshlxkygtljlkthkcpr3n005b6ioo48pw3lyh6xigcocexdh26wp60wjuh5hok88xkbevlfg9n93yt24nwzs0sm6dsmv0b1fzre517tajoewlmgs2sll0fl81t1x6wzmlif2pluj9uu9up0j4vtqwhg0puhuh6ktith0hqwny5ecrn16129pq36a3uyprzc9xdmmbdp3hqm55hukmdvl26dnbj2bi5hoxnutzgo0acvoe8lpbkexx42c2lgqlsiamjaw26t5rq9idftipu1y19x4x6exmlr8aw9mb5e5wnmud1d43g',
                username: '3p501jbyohyplm7qswgftrihdykyfioydosmzun45u96dxqrq04as099d4vq',
                remoteHost: '4jv242g3hx21fkrqmbg32ejf5up980s2eo84y7thd74a58h8zxraqq7u9ol09fnqjjxu46cid2rwr2ajaqnbxqdmekprlpyaeyrg26fpyr78nqqx05d8at0g2xux4eveobjdgfgt0h09ff2g0v14byotpcizbr0f',
                remotePort: 6464980207,
                directory: 'ejdnp3n489y2zxt6x8g5cn6xjlsoy7yxmld5jg94m0xbcbqqdyb3h60tdvj36whbfyq83zpq9cztmxzjg55qqbg9kwqvpvdywardg1ofnz363rcmxiuuzvd29wuteegatemouj03rhx7ow4d03170wod20okp6r7c2dp2sn2g915mqjd63s9zmkc7xwhshlck3384ex8xcqkko685rxug88yadejufaliv0yymqw24i86k85cr923yu9desa24py9po094wbibasfz2nova6wk0r0krmjmsxauwfpshe9y6jxwcfsddgmdd1b0f0ql7aflmviwn41lon2r36a2iaogpkvfcuytde4v5tkddrcmlqh2x1dmmprqdqexs4a39almouhgon1ce094imupyagy05trnh5f69n9b10t4wumaubtkz5pq325xgczl3b0zdcobug4453dnvx94bklj51sof3q00phgrxloe08cyf4i7if1q0a7ldtkk7bjciafqjnkzcmgbp23v57lttd3lvccwvps8l7em5ijxuxz1ab72ckznc4159yuibbces76uy35h4cncibzfyglb0glptiducoo95433vsbe2bs2i5l6f7zj6iwpf3zmzoun5oa13onig0wi8ts036uxn88z1tphf898fsz73wlf4iqzm7210a7aok20j62w5xv0i8q30gpvjbzdfjovokw60mit7o7somqi5ulv162e10mgar6ms3x5zifrbf7xf577lstmak8ihngbdbl9pydqwu3c7cv52pswhomwa841wcis849xal0bskayt6rv1me4g2lso33q4yd8cwhg26l3ahjc78jhnzfq60meql807qsxg5ejwp3mpnyjkev71vuu7zwetwgrbtk4qcwc8lbzhoqlyx4a7aook645l8xu26mmj036zixyj970r5zund3zh8wt7qva9bf9fr7j1917vkvmr0wbtsuzob3b3nkow0zhal82fln16tofqbcciec8v12f',
                fileSchema: '6989v1wwrut4jhcbomnxevvt4scxxtcghe7b8hua6vez7ra9tuzkwb2rq5r6bptd1buq703npc0k17sd0ggas0u2yhuqmkruuaqg0oc55zc18n43g41xtmcx9bs19jao27czg6kcad805vnlwkt0mbkaj4wm0mwxa6l6zf3u8u5r0n3m8d3lj92wg75kgba32uffwngqt5rzd697j3bpl9vzr5wm1t991kb341zw13ctm2dytxs48fnm2tyyq4fv06fv0yhgupfvpmjg0ikepix83h5c0b1w7qlgdbzdcfbcqmabrnp2heivcjt75imdqlecit047ih29eolk5rnw9kbe9xciiba74kw1zjzjn9psejyih5i8bea666pfmui4pn7vy8ti01jm8mwf4ctwqrhzadayiflhn37z523nc9p2ns0wiwt3z73zmoybyj2jy8tv9m04g20yfat9wkh2py9bjlsfbtxiunf3qq1myl1bkld3p9mjg1has4msp0af53hkrhcg6rp5n1uqa7n01njl1m67pxosjdjln5py6bjad3jxwl92gazhgc300df1aiz42xtj9sgd55axskaxxheuhtgvpka9ew0e8mzaq9azlzdh05lgrlfuv7z8y25awranpkapu50ki10h1k8puros96qygl1g7hzl2ensefr94zdt8zf4a4akugj1o44ozig7szm2zxf09t811pdbumfmk8ha4504bituxqaerhcrb374q3zn8f9vpwopjkfj2bs9zmscykn3cok59wqc0lxkvcpd9z0jq97fnt23jktqduxxadtkiq86jayze7wijnprgw8y50at9mrr7kyeiir4x6g0kzedt8ci2uxjktdetn20n2zjcbkq9kogbulkzk5ty8h55jrx829cz6yknhpakfe0btfwczdxynmtsd7mhfsvz25vpx7trgqe8bvr4n4kjzr8sohrzp4b0ntp3qyeehtr0yvcdnhzrkt2knzbulpjm9k3nwga0brl6aa',
                proxyHost: '64woqocr0929dq8bprr2n35vxwjreag1l4l2iyhdtnzv1cuzjz1j2khb5rqc',
                proxyPort: 6478230009,
                destination: 'tqa407p8fd9d7mlow95ndlabjm4g9mdcxog2wru69s6i7t4qgq5e750txg6q2r1j7bkrtbtuwvdkbiqwj8poqzs4zow5rzz2w6lr2bl548469pust2pakihq0b2labnbwqx57y0h644wrh6htpodde926gq4w2v5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0l7dzrfjfftdgs3fm7p8vyxpz0u0te4sdn3u22piwtjz8ocqwa6zsl4wrrboc1gca650lc2upwlmrk7d622w580h4h7b0st4hqq7ldfcb1801hrkmjwjx097k5y4xcszp0k67cj99gn1qs56ybkur1jydymgpavq',
                responsibleUserAccountName: 'zkm1cc7g374ckqbe3d9j',
                lastChangeUserAccount: 'fs6m52wdhhrnsl7bvma0',
                lastChangedAt: '2020-07-21 04:44:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '0mz4pt5ooh7oyplxpecn625z5wtgu11xey18mdmlfuua286kkhj5woi8pd1zobiugnnq0ry1nyr4wjk26w4eef85bj4pj05uxfxb96fmhilkf72duelrc0byd06s2b1vr75026j5tfxa41a3arltfeq5ij0t8ygf',
                component: 'oj2t84mj5y59t1c0lce4yjfhyskx2p35ymsaf1m0d6qr1dbuksj43utjrpxdxmh9ffxnm449zli7ey0m6dmdunfx2ihj1xwa9yyuyffkknnsx7j2aiipzkx79b8jln757rlngbqibcb2vegxm9o5l3p10x4p8vmvg',
                name: 'v9kdglr34prm93t1hig02x1b710orl4eo7vhxvk571uegg814ag594gsa2e9mv6734woayitdqkgtwq6miux88d6nnrfa0xbkpd2s03xqimppqbsj9c6e0ulndq6a2vuh9ikcqpn3quy5o18ddgt9wtp4hkeh12r',
                flowParty: 'pr4qfskv5lr2o7hrwfrn9hrtbh4vhagrpcwwnljhio449xnv27qabqajgnfbfnr9t7auw9nuqiex790itzaxg1gwgqy7ow747ygqlf4jjlutv4z1whap18n00f88tedbx5m1tf82h3qh8lc4lnbj3udhykbkocxe',
                flowComponent: '2qctjkhrftfvb87vh68ra4javwlz41fkaefcal0dqw6isfx4qtc76fykngx9y2k84hz7x42hpwwtvu5g5ywqcbbcmykuafcixhofc93l6p5qmyom8jy98s6wqzpb8dcpm2583ta85jatxu7hfbnwaj9molzx2usi',
                flowInterfaceName: '4rq0iy5zuahmywk6aq91erfsxa3wijuv44v79s3f471x3czcuqt58youvu5mvgds05m5kmicdla7fvgo53ltim6lthvfwduk57cadbn59gftey0pxwxp59s51q6n4c8vpjbc3q1coi1n0yyc807m8vuuyo93uehl',
                flowInterfaceNamespace: '7imfwh12e8j6t1ge22ii9yamxzp26w1e31u035eo3cytwhl259xyw84idbwgz7jyhc7cix6tqr6g3rowxelfxkke1aioi416giq0762mz47klwvjzmqu9huemjvqib6n67nfmug147276t3pna8xz2gj0ngbcjrb',
                adapterType: 'zbqg0fvt9lntb7awbxshdvlocbvs6llbq5gtmri5gs8ecvbasvcbmjwcmkaq',
                direction: 'SENDER',
                transportProtocol: '7s0j0rcosn2wduf4h1s9u7ddhw7251ashz96qywe1rymh96fac7pmwfbf3n2',
                messageProtocol: 'c7co0o16oxyhasl6wfvecx0qgqxmk2uyjkyl4ipyjv9dmilkhvmvg5fhvb8t',
                adapterEngineName: '1osh46pns6f6n8i3ydt4cr3x53vqy9e9egv37erl7enytewtb6bj6auoxjr7btle9pok8v363tt1bl0stwziof32w6e2k7dcx4tw1086iypadnnjs2r34q186gdknkldfum0mcv0sg3ak1wfn78r126oz78mo4ww',
                url: '9a9ya67s7r1tfqtmgbdo23ku40qtk5qcn6aovaiz5zx1wj34mxql7npo91wpove441qayi3vaimsdvie3gv9ayud9apyzuk8s7tfydqcfurhrg43ddgg150dxamss07qjor7cnjraltzpjio38xj8nkr40vumgqwf7cjgvwv1szygjexuzpfva1708iozxuft5f9ehu6y78g5cnbm4thz40bu1c7cw92fvhj2talg0uccz63jnd5sbrjzhv6nmuuv6u46wqxgoav1ehjq3hg2pr2vn3u2py2hqsrpk9rlwq382te89b1py7gcmdm2beh',
                username: 'wznla8552f764ga72r48wm6vxge082iglovclh7k6haly4j0vk1fbd69p5o4',
                remoteHost: 'b5f14se6exkti5tazuv1wtlc2k424ct0ioo8y5n3n46wxe8atr3gbr5zqu89uc2tvfvhaf5j5rvqpwjmevkcljx6ibymd8t78jdz49f5iju1ji6vfu7lbsbillt2qkgjiynl5shrf9o0vwfpl9j175ye3jko8rx6',
                remotePort: 7330295480,
                directory: 'xcmu21zxtr6bjdx0hvzkqyor23yc5jq3g00bd2i9lr9rfcplz75jp1l4idu82lmtntjlsyda0qsif48l5qigy5qgrd9gba5zpv5i39jjzo9bn34b523g9y8imzm23puvt08hqqhsoxn6l1w4gdyrbk1o9qv02ljp2bx8uwu3ygjcimxqzqadvl8l0ayrj9wl7ozfejayjmrt9gnq4bcmfitewwhk063byd5es8ov83pi63m63jjpkqk95lcxwiakfpvzvzxujm29n5oxqdx4lmkaa5izww0cohmknyshszapzl6gvmsrlxd63w7ymilisj23bjx58bpjic4ph8jcrbxsap5foec8lz1i5i92htp565ci9hfg5aybipj3bcpsfr4349n2ziauw8xmwziafpbufo1cqsq3xawja0dczwnhozdtghdl419bahyrfp8twm6r4bmhjuz4piieb5s7qrcuwnl4fr60ve7j81cmhh3wa8cl0arzda5c6ixix4oxzegvy75axbm4zfd9i19xxk16tk8ifv3j2zg0r5mqsfithjc8icv9bsqhnei6shixj2man58bvgjntybzqckm8be0u78m5f8q9ds7m6tcha7jiod6pgh17u2jg8q5vywalamcd0n5p1i92i05pvusgg4ysuqhe4gfw45kvuftkxxaers84xqoeoczr3dofu661bt8rssugc07ezhiy813s79eehgbkhjexglczq1m0c11eqw7bwrhjrqe12kz1jdmdq0sdm31gmlqnesq9f0cz1hggupbv161bnnbqtpp3kb05hkiwmqhgf58gwse305fmij1hfdf0ds096dwlrpcgdsiwh6k9d8lu2s0h96ncyu0i7xuf0zhlaipqisnbim52ff4dvlnpjw1no6g52phq3yyv6bcgvuvpoiihmp32xol3nms98wzsrl9ja9mqanzzs56zzfhysjcvv9brmn431dbz10hllg1nvuzkd57jny7q5y5smcazkq27ygb33z4',
                fileSchema: 'mep2umu8pf5zfgg984lec6nolw17z8h189pryd3bvajsojk0aen8kqsr3hxs15fjpdfsq5h26tf4apw6wea6jn2ai9f2qporf7kcqt952m7q4us3uw5hbz7cfrvle7fbcstzhu6tlb9i9tleg496kydh0hpzv7bfo0qlhwckn73kz5vkyb0c4pff7hpfvaxh0rwdl3bu58rkcjzda3r39z0mvn3h7s7rc3yxo2z403nabawlguidvrqlwnkpjbv809w0pgmgfbc404gve34gsdyn14vm8bi2n62vdwt7uimyulp272dtrzihoym7wklt0wlqh07cjucb71usdlolvdjmd99s1dqf3u8nhuw7i354jh89kha278z0tn8bn525rk24zu912alrozxaxwmb04uygi8g0336g8wlbzjzjmcyesqw7171o8jdpyyqy8tuynsnvgdoji6aylfhv0osno8jlh0jc1xi1afw3rzxl0pnyrieuzei7c9b6qu3rvkffzwhghaenk82cixznwifvpsnuv1ij68bxat44cycdqryxt2n55nssunhcgzvpb5heu0dv8d6txq23cvoy8eyw1ap1hugjoqutl6qimbivpht89w57wds9ynuzj969k71cqg3uqmfh135iimrqabrgpxpg55e79uz5hykid8dhon3oy6v1y7wqtdzktci7gt5lppxeqr0o7k4euf7omvyrblvx8n16o1ftq6h0dt52jb2lzo66o452s72rcwqvodewl49wffh0dicky3cby1x76mci745ubldxt85owh8qf2pz73jralvd4fg0sqgfo308xmqmbwibn1536fsuhr7j775c6q3lftecjb18t77mm3g8amb0vviagfrt5e2v9nkt0m5icx8kkufelb8ksqj7f1ma2kcn0pvnnitj29i93foed882oi0ralfhg8m833kaud2uzamx0gcvx594jy7a7n1zf3rmjz5zgsx65mwezrhic2tzllqxfje536pf4zm',
                proxyHost: 'xin99diy36jnubd7xonou0maekw98n99tpqsu3gzzis6nuvul7qt6cve2ztd',
                proxyPort: 7015269849,
                destination: 'yujn47lsshfussonhfcx7qq9cbc97dqikdg9iedvv5yjvzljfp3gtinh3r99rvfhc6vcd0x2g2wjy3i55rqfp690dfud0zaadjbhdpqzl4m2xvddwnzlqij8sweule262bzmireqh7ujbbhisvytb29z8syq7n88',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8ormeo38hznqiyov4o5ouj0ndxxthvsfs5h1uzqvsh89i7864ozv78tqkudb4qoe8xxo4qbwehokibhq9751q80tf4xmgb8764nb88w89yxn8dgnb1c9q7aacvtwjgebqnk6v6v3b7qgtkqsylpo5x9z1lbj96me',
                responsibleUserAccountName: 'kpelgqq9izo8dv7zz60e',
                lastChangeUserAccount: '2iwquc15memubvxxq5uq',
                lastChangedAt: '2020-07-21 15:06:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'hqotno0ttl0zbhankh9hb88jcyzumftfoj4shb5ns88zm234rmdwbvgd1qqvlysxsjrfmjtiblcjn5wu6v3ols38krlw8i68p7dmrztw2espyk2pp1h2eom0h9jqt6g76kompy5bbavykv6dhvtavwekdx78uhr9',
                component: 'ywrcoph4q5x36i1l5swoa9w7e3v0xc05xhquiy8qfvkzukrpsizxb67e5oi3dzvz7bvuqjops12ix10wy9fuda8oexedvxh9y94eh0vg6yt1qtrueafpv8wm5mj8r3yvz3hwikcy37v3mfbffo6k5yafusbc262v',
                name: 'oh61goaq4rt1079e37xrwyyamfq7q4y8ccgci82317mvgpx9swhu5y6zj8a1y3t1qg708ro83up7ivatywx57dm7jftsnk5bgl56c9hqjafopxho8f4kysw8i52ngc9w66w1d7sc2twmm41x3zeynzic3ctsfqwkj',
                flowParty: 'rwkmt7d0js1iqk1uo9nz0dq3yjw0u0v0ramdupozbvxywo8ptrpmqtumvovfzwlkc2pu99qhbdxmhwfmpu8c082eo912kldjsfia0kxgga8i2fzfjppaueuir8nq4dor7s9h16i6zbnpbl6l9e669xn4j2ay2i42',
                flowComponent: 'iyt5m0em0ak4xtujeali0k5o88al3p3to8nllg6aasccbfwh0sn02ot68h3f5xyjwrfd79n03ngmzes4n1kpx72ruyh9kci5wuk00ffw2rprnw43ba2qzl7kqo303s7amymychl8m6ff7zvoav8qws8wmtnk2uv6',
                flowInterfaceName: 'sqcnvwvwxguc9tq4ikylit91h41tphfio797uah5twqgktu0ccxdm7hn3dok1n9o6sp689lhsmvmrqnz1t1lgom7nm445t1ok6mf0awuny39vpjjkybpkj95c7f64ae17ilopa4vjr2m5dmyn9zqj9f2evduurze',
                flowInterfaceNamespace: 'bwu2ljh43zhv2p0cmkpa0h1a3o5cmm47qsqdt0fnomfv5jp438uothoap5c2ypooo8a9upiq9hfbnlst1gh9qtf47pgg4mac7kj1d0wzouigwcfsibzw3i55wo67qsu3tz81fu0fdv4xte7labslmlgpyx20wz3d',
                adapterType: 'ryuruj5h8cc5djgw77ok2vhae9t8gpjl7m5xr2wsr275ewzm5ey977bha9al',
                direction: 'RECEIVER',
                transportProtocol: 'lgnt7un9ymbktr88zims9kcwk1ljega5pswh7vs5hsbzz0uqmp7j5tiiprd8',
                messageProtocol: '4yew8dsv0f7qymz3e63eo0byvjoli52afep4x9r1fz44lpdulfq9gsnkr7qe',
                adapterEngineName: 'wg4bmkji2s66bw31pdtma03hir6x28jgb1hl94mfgy18y7c87ge1rkqrmgnpcfggvna8lewk6kzcja7849bd4tdzykvbg872s2fw0dhariizbg3xxh63gsg8k396wizpsp5r8y8joegk8d0ocigyu88yz6qswjgu',
                url: 'acw5neufvxqj5ecoolo2wapa9t0z8ib8c94f819rongp0mehv5lzk4tkhak08h1u5l243xcmwrxhue0rp6l26axbhhdpjc7rb4xbtdmealvbb1r6yenfcw2wsqyrdxgtjwngigqvp3wsj764q9c7hko2g62j8pet9zhfju718sztiadof7ri9aoew2oimzouxb8t2wccocsbar63k7oue05ppqya3m88wlsn8mub0n92ci7qpq2jt8a0jd0hjfg2306j613qac143bfcyl6hqvn19a4e65ok9708u35xo91h3tcbov0lskm0c0z4nd1o',
                username: 'e6t5f23qxhhhup3xveapoc2xhjr7tsgidmsb9impl7s0f0rvxol3f82hs1e6',
                remoteHost: 'g0cx31azv33wwxpg32sg8h8t32sauzpyd4t97ssgzjt09li3akj6s7suscmxiokzmq3g0e0v1fomfys744irs7z7i5fhitzashhmsnqcko5yvz8vxdami87yzz3jl1g6y0rf0oxmlrns0ckdoha0s5d2ivpkl168',
                remotePort: 1010788228,
                directory: 'fovys3m16jakn3ze5rz1yotuavw01ldyml6a2i6323fkqa543u2y9cs2vm7419max8jcpk2mvlpwnd6kysnznhp5hpsvb45r5s0i1o9b1wu24bci57va0v05wtucyi37512cea8n28nk3og27kb6cchtt37ehjvmuv3c7qh394600r5sqqu4hri8tb3n2rns6o4ijakir9gttaz4xnfetpywaqy9ay8414l3t8fdy19t0u31ahp13p6jkskb5d9z28x6orh8qhszn7aoninag5fhhoyjmjumvp9wp05edaeyjsi05ktsrms18fr3dp9zu6wpl9riud4xtfzs1ac4w2vb7cbg43qak89e1mzsqy2e20oiukp9cdys6h3f8fq5ayxplqt9aqt6iogu5zc278hpn1dg3azd0br7rs0cwyr46y603nbxuwl1oihjlg11boyw98gf6qku0fxreptt6dgf72gqi6588gtr8sovws282y3dedfwn8sail5krqvg92vx6ky5mnlu50aaj8mkeeapbiue1vll0jp7050m55fkv6ynt6n0dgu7pvei15j17glhp6wdr01g2ba3m3hegeaggjlw35a44np6wqcacg3suditir5oe72y955crpb6kxyf7k9dt2p0dwv5kvp4skipg5ae1kmeqa07a6a3gpctv4ykk0coa5mye0wuptqwmffjml5399fe3rtpvz4l4xenfhtdooxatp8vk0z307s6fmqkbkf35njrhv8aqla4t8gafv4otlyy5v6tipe4dttympiv36uf6yhtz15778pw24s001xwjbryuq5mj9hff5wzsbr8db48qvplmflmaepwmo4k18mkv4nmlk99y6ab34u76cqulhxiezh91h399h6xzymil12x6kzf34wkjk2lhmhbybtx7lhzn93jxf67hv6m1kir6wmzah88llcabfy7yozw9fgpbrlf1isgjtk13q291gkbe3qfb2cgh44dl649sztam4yw070ezmx0',
                fileSchema: 's0ueojfciijzd9z8cxrlxju9i8295m48uhdd87a37ls9d4yttvh0m0279qbljx71360aybbmkgyzkxtafk6amj0rrdp70fr27mrmdxqirvj7xua24uvrd74p4f4ftai3gnzb2mezkpuj5y6l669y04o49vvhu70oesufnfn0ss3lm9su019qv3bkhmwlddy9sn2pgfqwd9sx7xksmtgmkpf45geumicba8t7pay69a9l1fy2g3lxvbn0ncpead7tymsrzv62cv3ptv9tu6mi7fauc0lzy4vuw48a8llefvfwzv5wtmlo4w50faaghnp9vp973sp1fuofz876neb2ljz7yn4xackldmt23kzhfytznprsbvjrjqianee2i5opwvx0pyrt6ffpkurddaagfj6dn8eqpgr5e7x4bsunb6l9o6nr083ixw2uwmudc67iogezld05xhe2azf7vlq6x7ong54kfv13kkopsuyf61qjb0mltd00aom9jeky4ysuk9h0x7a41ehx8ha7kymw93hyg56xn9lc18ezserot5wjocxgcwwuyckri9easf6pajcqd4y2txb2xsjuggt2vbalxxynkbvd2e241yzqqojipucuohdg4oi2mb4mz9bqy6az61mfykkzj38etfzlkfvbj6ho8nevdztvwykqvm3d3b9zlqwywars37cjx9qrjmt6yzsrahfdb7jcbi8kkclg4m3lt08wzpaywg2s9ae3xeajxcfei1maejs4rjsyju6nm07z7or1tkc12b1ilb9mggutxycu18xce0v3v3vqbgqnagpezpnkq2veuxtcg91pyk7ofpf116gqbntwrs5gqufzd88e53wjv8oppq4t1ix3wf7nataucfx8sdgka1if1wkeqvvdye88bwvdom1gkyo3ogelhfo4t3z5g4mp3m943clts9kvprfj102lmd5msc62z6jfpgb5psoz1s3zqr0rp7rz0rbsdwn32rs1pycpy1genv0yc9fwmgbd',
                proxyHost: 'w2ugu79a5oym9hou5iq5aek6hg22w3zzeukxmer1mel84tnbhhgsfcu32isj',
                proxyPort: 7733339482,
                destination: 'ho2drimf5akih2nhenutkug3cy0hy15pcond8c4c3sts8ljipq4w0evk0vzvbv2xaxvahx70hig5klzu7n466av7txwm4341b116o3rwtmtu8mmws35cqbt0ajlyj96gjb9djkdla4hnmx3llbjbegjkc24i3o22',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ohqhisrz13r9icbap09wwsvgy9o8dn7fht7i5jyqfbn3422prl2i3k7ylrg2iyu9hirmj9ytj7rww5ijlrmrq5qgxnvl83f40q7bdswusre39v4hr225kezhnvtazlni58me4j185i7stheu3cojj2wg76ecj8eu',
                responsibleUserAccountName: 'learkvm1bxc3888yubk0',
                lastChangeUserAccount: 'p2hg90iih1ysfaz7qw2v',
                lastChangedAt: '2020-07-21 22:22:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'zpmal6ey7jhjtxqfyt0g7vpd6aipxfmhh273i0jn5xcf5438j9mjrs1sp5bm1velqia8kdps29zg524bfg001hdyscjknlfexdrcy7vngc5ao4n1eis1droa9nqjmfukqnf64lffa1f0dhq1hv7dp9t9ukhexxxi',
                component: 'uid9k1ep7clctj9vhl3pjnbn2hhv8ria0vptjymfe0a66z57foldbedrq2vup2h0kntjresl6gsbdvix7clhm2bq4es4y8cob02lzk7359egzn1invame73jmjl3gemn2bfyenmlzx9gtiss0rx4jar6eo1myale',
                name: 'l2w7ohxvntg8uv2cxadqs3axyov6d2lfjmyquh6puxn04sc4ylnr8ykz9atcwgg6t4tpuuurnamf8cjaopeepkem2uvstth1al9vku8u61vdosm5js58xyl7v1l53ehgz77y69f5p77zyj0xfg8q0oyvzoi44el7',
                flowParty: 'ii32wlu6u31c3fb7lyo93ao8vi84xhybk001js5rr8grh84vwp2ilko7s9dcinehreh55e9ioeeq9cdkcuso8vyasikpiwao187njanx3956j3m5yy05bibhkfnagegfzp0iwpmc78hsvv90dap7ay6g854exz15d',
                flowComponent: '2gakv7b8f7tlsfrv5cpcqqw5mu00y95h0a04nlbqm1d1pebljr4901hkmau6tg6gxya4h2ol70zsdwseur4ff4whngnwklmh8c3n5n4zl2wbfde7n5bwvg95d7dw25mhvvw6yfyen7nxzidm3o500h17zrubi2qs',
                flowInterfaceName: 'jfh4aot7cnsi7w6lq619ddgzdz9szpnohufd7m4z5hicu3w11gwda7qjp81ajsxv0lsdhagl5fxk0xivu4bw2zzpnux1lvkfcimba1to5g3yb8tvk0k5vtvp544a6y2wpndni3oxqqq9vpltihegyjtcf0ls8oar',
                flowInterfaceNamespace: 'npas0gclvms7x8pohwoiggemejufjeqmushv3nvf266xk4hlyv7dp3fkz02fqf49mnm6upi8pn669jf89a6h0lhjvwj2shbe4ncchbrxxn1nzmb90ykvvdsi7y2ik7xa2t7srgdrwysbcvwmucs7vgb146cuvdxt',
                adapterType: 'qeoppztysi0a31hs2tcvvwzpgzg9ukqzshbgfldsmqk5cijagwulfq92ueo9',
                direction: 'SENDER',
                transportProtocol: 'aj0325t27ze66247pcvd6kgyifvnwno8u7cm2le3s174wnn9h5lmqhsk4nho',
                messageProtocol: 'u5oh9noeisatn6u8hclmzfabo522ebyde6934zg6465b0xszh250y61ch5po',
                adapterEngineName: '4mepvba5b55wo142d0tamhpv0fgd8tu5yhdlp0lf2riap6inyyf12xctlwcnrspy8vazw1om2u7uun4oiopufq4swd7nelieen24ejhdryxc7q5pjajdjvfdqpo6xw4xoo11d4n8ea3xpa7ogjocmjyvg44vt7s8',
                url: 'fohbj1w87n0o0a9zfbrixphbojtu57jq66n9otfexxm0bouk4iwljp8n0qzg9jzj3314eevseykwf5bb30dsqtor23hryp4vo3msh2saku0ss90pfmh2e5elkxtm96e0947ohjdi0e9echrpoccrgxtl4k91c7abu7i48l775b81f0dk90mee1m69xdg5uowmw9lhh3y73m91lzz7qtwar32eqkdkzxzig0gyzgbmko7v2gpi42gfdjfaqpzu41jsd56i3ydul1p8yq85duey79mz3yfwb031rf24m6hjkeqdzhq10aorpn3bust6yvm',
                username: '1mtuqsyjk3y0gcv1kehh51xcgph40l8amlzas62sq1oo0p40bekz7p5263pm',
                remoteHost: 'ce6egj3l7m2hvno4iohkbhef80fuxj8us8ut1511krpiisc8gc7htdwobyi4j4hsoqab81vptmaljqe9h6fwomssdiymo2qhaij1i3a86var6oyg5wpw8z9tmq3iti9i6igogt92549j8e1s95addddpwdodh1gk',
                remotePort: 5833175875,
                directory: 'tfids8wm0d8ie7yz47gwr0eelnkld82uhveqfkgyhgla3vsqcs11qtgyj04nxo64of5azhpw8nm99xi3tlnubv51rxe79fr7dje5zuvcazcal191qkilqyqw8wmilknsr5lzj4g9c4ci9z6cfzn4mmuq06r5561qx3jxqst74v18hehph9p4688be8kvqlunouhnpmdpo12ve9wtkpv0ekniqsq69ew3oftc1b0avqaw7odhpa315euuazgmk0evmsudsup7qjar2r4w5d4vtcz30g7z4rn5wfmkfwpg7kkxfjazz1qfqhrjxel15gkg4n7u42gizzkmao3ssrfcz3vwf4ctgnq95vos7ahj8y34ezkofl4tqmqifebg1vwy793as2tz4gqz9ngb6i2jxhc5wi12gxobuecosuse64q603yq9vfr9dp5ecqa50l2iwj4daj9s6gxov6y6diioxhsek999tugvwsh2klc9kafxffhmsgug1n9egcua6vw504rbqgen3fpen6wq3lqwgozb2q2yu11txv2srk89lp1rwbv97antyoeu4u737n871scg98m47h49uythgnt4p9oucg4owrs52myymuy3vrrr199cu37h82d8oxmsb1fp1x7bwj2osc72ywyi1v9trf1w2vau6bp4ic0issxjuvp9qt02z1xfsdxupvhah9j4hsdzm2wa02t2tuf9lfn4yfctef4ffel03sjhxizbri607phfpvsircdc8ld1ymaqdr78yrxu0ms0w7c1oc59euilgxjci3toa8t983v2okclyc6s4rurqv8oejgjf1hg5lz44ehyleww1bkwoptgmj39f06wnwf8zrv2o447ntrx4qagk9minpjut7oc7glkr4859u1za5iugic8z17wmbq99y0rn68qo2znxlh7s8wwcg4wu23hkjlo4a7raehjui6pkfj8wejtwdjs098gnp4w1hkel5h1e810xu5g59rv4y1au04m485mxyhl850',
                fileSchema: '6locbcn8cwxdcrrkc91woul8tba1fkktb2dp04t5vbu1nzw6nh5e34udff4ghb00j1l9jnt7dbjkki4j3std7m6s4ekwzyfuhoc3v8v182kk28wrreq5meog1a4po1tamvjblpai0mbun0aj5k7p9yry7dxw60qhuue0nnlqww8vhbwo34z5amzt0xzn6u4zwn77klv7245i59v5dm6ttmn16n3hfjzjy4lre15p2u5dv7oyr74fu5pn6ndzbilqse719flj7ann7i6wikoko7t3ayksgaorq88iq2913hajcbowejz0f9t2i7d817f9n9dotmpi9pa9xelwisj0mv9nj6sr03zc3wrimpalm1kkm63qmohobs738ns8ur66oq3xqi7edwbk79eahoaevkl92m6g58vkl5kypdm9vu0r2xlckakgep43gia8p76pepdevpm1scxdxy7r1pwpxdxmevk5lbyb31in3kcvkocamftdhwmtvmoojodjaeklz5jphdt2vnzn69lxmon2hai9b4ew54ikee859dl75l5n72t32p7mk30q954pu4p9omizasu1kdtiqsb2swsljh8hy1n4mrisgy9va4spgghqm6yn1m5x5rv46igewqpjzlz259u02p7r1g5icay9dgsqc7cs84p3psfhrftv4v924ez0scju8f62hyfq8nhf0d7w4x4x93vj2477aq63uvm3lsj84m3a3mnt38yimvmn8nbmdqrcgrjamvx8cva5nk9n3xqv0xjlpgkh2njgkl6zsgjim2is6wm6nf9xit6gd554pfxpto2uthp9xwfvvcf356ye2vcjx2bqwojk9gyqavqb18r5gcxzix3bj9bdfjh4c3xavswotix3lxm6ugd5uj5jtq45g1epp5daq3kdnn52drwca317olmq3vznkg4m0rln4ntzmdik0t4d2zm96nt65lh1jvgxcmenkyzvsk8lugnwm1v3ehgt15kdrik16gtq5sgwf676mixb',
                proxyHost: 'hk86z210r3cyz1j4g1yvs9olzgnbm948wkdbsieh5qdlqo1c89gb893k9g97',
                proxyPort: 1801560082,
                destination: 'ufugg0pwswb8xyhlke4dvofbohum9jkjhib1bcquou0s5id8nfpfkefn5v9ck3cywgt1ymagk1nh5kccploit3vrj6sn2al1tztt71sugom96ltvf9bk0n43q4080ts1lps08yn1pvkf70p6o7rjjy2a0mk0lodw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2y5rmclnpfmdzs3c86k1o6v81i3v32wu40p6xaz2v4gzi90uyaqlc1kd31bsztnst3yx3aox75hzdb9l57owrv5xzbvki4tjguo4yjh5hi4cv88n1egt21vz60h3nnbi0eo7koag74c211h46s42ilz062e241ou',
                responsibleUserAccountName: 'f1yf69wypvav1s68poaf',
                lastChangeUserAccount: 'zgdc6nwmh9z9aklom520',
                lastChangedAt: '2020-07-21 06:11:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'htm94jyh4rf5g0b898jlronvrflmzcn8pii8mnsx1l1nsm499thq9vxgsflvj0g8dua3337we16y7x3274wsfk33whi2to8jz7qa3cbbrc86q17jd45qj1zwgos4hyfhqmthssuypi1tq9st89qr6dwkcgh1zx7z',
                component: '6il89utjpb0s35h6ht36cb7zwk0l72qm0db4q0fumt7xvjyc1m1kcrggwgzujc31zx2uq6g71ddh2hiyzfv3nms1goeeygssfj7lhp7n1533q383clbneml91wm7n9dk3ye7ldre6p833ikkg6f0sypie7osx581',
                name: '4fu2mr017497okubblbbr0kykic2piqft03aaag8nho08rx7cxdd9u9vgwwgf2glnmkfobkzjfndxdi0346nx251ekozojra7n1ia3rhgpuntprho8x97io3135998toyhz2eu3mpfwo629tzs3jvr0gkkwfeg5t',
                flowParty: 'pudpxo1fxewosd15mdzu4w3ylxv7ms22sab5vv4wn5k7cgosxl0t02plye9f0h1dxqv7id5v4d48r6v65a8ior0pjku0c84jz8q840huaoe3547tope8koq6x6kaukl9y3q3uayxfpjdkv6eo20x9pxz4jbg0aqr',
                flowComponent: '5a02b5ohcm52ebm8waxffp0rlzwsjwp109amm1y53hjws5vr9wfdmcp6ln1edbhkseuk2pam8v7lhjx1b9yvlsvguaqyie6n7u774euz7aakehe6e50ppcxx0q911trcih84udi9b2h8x4mgz0bup16yb5pd7b4yl',
                flowInterfaceName: 'tqegin7cnn71qlgahh56m982v4vqpffamy55offlw5ngjupzsadgso1ufzgfdw37der60fstka4cz3tijbtx8opx8n9t7ki2ko55wv260tylbdy80z7yapji59s59mqygzy08m3b81x3u57vt7vrs137bptgqnsx',
                flowInterfaceNamespace: 'rx2wm4sr1lqobtv21yekmgvbnng7l19jg102cm623gnmn003foypdz1n470u2ha5ki2sx3dr8dns0fqfbrk5kj37gxjvoz9y4btqub5n5wezltf97834kizgay0lk3as5pfefxeqeaeh3jg3oqgexyj0ao8t4jhs',
                adapterType: 'q2l6q4p99k7pwbl4atk7vt25g8enmlfu0s8n5iea8ec6n4v4v4q8kicor8sh',
                direction: 'SENDER',
                transportProtocol: 'golxl57dp6kjso8emu9ujekn2c79i22sm44mkhn40rnt647se7vof204h0b8',
                messageProtocol: 'ykaf8onwz99wgoxwqyjrzdcs905ha58kxigm6s3rvq2xumf2nwgt277aqz97',
                adapterEngineName: '9ajjkgc7pvkrq6leyko16mnq09ot8jsaacf8ymercx2f2ar2yfdw7mw4587l65p38gvywakmp73y5bo02fzag3094vklz2b9euo6da4rhyf6qavx3wge77gvovsg8l9zi7tlq9h9awftw2m8lmudboiuwx2dmbga',
                url: 'p89b4kqlf5cxiz7bp4r06qi098ogk5j6szk3ce94z2xhi44ba71somorbqrf33gjjq5vaaam1cscrbay6hd3aek849mxv4rgn8ul86br1ptyywphrbxgpac464flryli2zvtyi2pyv3c8re4u3nikl6w4pg2ok2fi1wkd1olmmbsnpe17nrxrmd7zrfvtimm2eos7nm06m75iwrgiq4plnwfyy8uobsf4g72gpj7c7giwutr9n3h1razrg9rk8zsvwe97ctkagykker7l3elsp51xqpwkp32iwaw4arj82fc4npy813f6nsnuz85hxq3',
                username: '6ftxuyrcylutjlyntvwftejqmzwjx9se851wn7q8nm6b1p7dlvgczy0voyin',
                remoteHost: 'lk316e14kjgs4d3laxl35b6sz4tq6nlxof1wn3se3cq85x8ctb2ghbkaj9216yxlpzvpun6ulv2id2nf0xknwf185pwqrwpkkha051ms59bhb5oh7p39gfy8mmfg25lb9beau76dwwi1ar9ls5ls6wev0j8rwzz8',
                remotePort: 1927483448,
                directory: 'saapsqruir71lwidohn0kke1m601jyt2op8x699ec9lvoyh2r1rsjdpqs0jh30d54lruk2ny0mp7xsdfd09cqvf48qhfjqbcsgbhrvgj6npoj5epujyf4c3035h5vyumcn27t6uufg8hso8rz2b9w0vqcuhdjbfkdxfve8n3n98mkkb3dwr7f4s4on8kfzwii38jvymqxj9n4z1ytsfh2h4k5pg25c5h0dqn2pro9qt59ljzlpvnkm3ry5sh32a95x2nmsp7wqf1qge341e1gxv1macvj8s3soo34lo03fr0quah5nblrqem3japclkfs1m6utovvix044cioppzy9o9mgysmpsnoq2zg79ikr9i3xn9wwagqwuq6u9utdkdp8saug38z06nlxjs1kjxjfdulc485osp3n6bc5yh3ibh01b6ozkyf8yph4a1bow8l3jf1w2jhzzak7bm19i96glp1kqap7flxm8jpct5rhzkzr5w3bhr8q1mo328n3nj2b5blarkjybqpdmpoo2uutscnmx7i11qeiy40e1vkwwjy8z5xjze7xbh8k2fzg3qm663wl5ev4aky3v04p9f3zqp405ckvrkdoymt8hikpr59cmye98wuyclhbcs3uq25skdljpecu53waiss2n0e86ojgilvknyop4ihagtlkk5m34xabu8oef3rz7zvp57o53gtvcorbrsmlkyvgufpsoiavfgb1s8f9k5omrlstyp52jlrh9yu1cfyy0hwg815vfbfkv3u1lu1z174vj2m3lsobeoxak50duvvjq9hm46sm73leb93a7w8go9n30cmggyrlaltqarpwsxsof5pdxrtg38nl83xzwgnxi000wyhzn8h60777swgx6den79i49zom391sfpg15djjk1bunsw507n2f3dr4afkyu80itnb2ob3jdclud8s4p8wa8ywvw7udj7o970morfhp8sxs481ivilgpq87gsz4krwceloz9o8sqdajpvi632hmw',
                fileSchema: 'tashx9trny7y8cieh6s872hp1lsgsgzqh15jelihpax02jlmdy13k8izazrlxz60boi1u8xoyy8yop375ldimrwruo7i06c4qkmsren50yg9dw0pic7p2jv6o5ydk1d9y586n3p4lie2t12ejg1379lvddoabb09c8c9vxvfz3efxmyrigbin03pz7wo2yljib0js2vamktnksvzpg95nf962eryt4ak81qhxloy51uxmll6ng8ieu6aha3h4ep1962ifitt0292cm4nzu2uisqvwqjwjp2j984yw73fglw6xwxxdtnk79yvxvicrqas6pj4arzee9z6vyi58mro28ichkk5jt22ix1q1s87y57jcb7ir9sjj840s9a1vl098bls7x2euwijqb21mmbqpuvrwnp0qnripahkfz6c09c238hcqvoholx2rgpl92pkblzz8t8pb0olvnjo5putuvpgq59gxio79feleyvnti96kwa5d3tg6oudaboyuywvp27impaikv4uf0gdyofvyxg270t6wfz7i2i88wvml2lg1c1xegg5vjzo1nd02l7cdgngevqsodwsct0oodh0imlf3rlk3yndd8z4h1anmhnd9mfxrn6qw9mb0ooge0had1lfwfz5pzmbllbpu6f4bq026tu1jfyqsl7qlby8fca6myukcpa2f0cfk1y1im8hsok19slivd233d6218ya70n29itggmtyxx880rin0khfeof3lq8bo6bilnro07hhla8y1mn4ta87cbexsrmqk141u4qqqmhngi06cpb0q9883ubbotbfn08jwgyx3bd95pedgowim8jvbdv9vcjm6osnbmadvgwdm95bacly2q036dcjbnwv0oiiuxig2m1zv5lbpawtismwk18bubzuvqy5lqnylq3l5vml1zfj3w2t6nl4gewuov3hdjqcb20nqg0ibmsqkt1on7pbhr1k1gx84iule58vivfipi02lbl5npz5lyxgw0ed0wbkjpk4',
                proxyHost: '7072cw7fgoecp5mdfyd5mpl3w73ps8dh89w057ttbuscfynzfe4vad02nnls',
                proxyPort: 7553386362,
                destination: 'ic57atd1k8z3hxvg9bcxn4ugleqnwju1sd6k7ylu87srkow16uizy11cpmlk5iaonl33zwpaj8jitt56cup27ekr7pq1pvml64pnai2c17gjf8h8vh1ffsfgpuji35lh15rzbitbl0ndq4a9jr7tpch89k9vmfoq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5cl6186n0i9c029cva40hk0d5k7f0bkldnd6qmfaz20m0ml51vcgirwr609q9tqrgr8vq7eebj2jcqbjyrvrwyz66nsg18ybkip812hc4o7iro9aosfsu3xszgubwrffewern5grnmxdflhqn0s9atiwaavz8328',
                responsibleUserAccountName: 'r4uelvz9lkcn0bsvmn13',
                lastChangeUserAccount: 'oi08pkqahj3opu1tlut5',
                lastChangedAt: '2020-07-21 12:31:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'iq5kulpl6usl8mgwlecx2n7sas7upqflgbvd62z2sp5vrgumkng8z2bh00dn41gvthhfon6oho70bft37u2habo0ruispyazbwb016h9tsp3x5tors4jg7dcaiqburnk8m0bij2azidrt76a7r2pwwzi6y1ib3sb',
                component: '3ditkp7jgq12o0gvv09qmyr0y0p123kaj36swmuss9t0eg4xavgpqeachwtyunju3lzu1emetygpl8qw1ao042wjth1wibtphtuytjuxh3awa38kt0ihlk3kuk23p1t9d78mefjf06nf4n5w5742drw1h01brbnt',
                name: '5dugf4swvl0o5zm2ecxtcwl85bku085eteq3s2h5gu84zv200wnxz1tlan22tpkbv6wgg3ie595mh03brno0m1xj1a1dw1nv5abh762gqjtiaor64thonbyiph7qfbiajqgn1lblqb9urhvws3zjf4bgy6uplm5r',
                flowParty: '5yrayqwq2o3lq9m5ybz995iifnrgfcgfuy441lr4h7uf9gc004hn4kuyx00bjfpdaoc5r28p6s6ofz7o6is4b9j7ql0ds1thajqf6pb9qadcofygr32ykhb69u5j1u77on1xzgpcsjicpw4vxjsf5t1gvfkpitlj',
                flowComponent: 'xwniex6lsyo6apeocnvwi268xesgp06mfbtqkdrfmzaxq8t5bbqob31w7fz4550vbac4udia4jjo9cx5088ezar7zba1ynvi9q66twv2cid621zk2px4ikgab90rhh53u6daoyeg7aopnjahb2lj937orrr1i9qt',
                flowInterfaceName: 'gusvzc8rrn0mpc3oqh1clorbolpj96lkwedkoiqkdh5n5r6y330b1p444tbaud6u8mvai8n232ouz85egu2ocdytjy7bvpf545m6n27ggxakg58zqcqgmwt52c8uajydr2443lp2phays2ggrfii1kzoikbclzjzv',
                flowInterfaceNamespace: 'mdvaf8uxf6hsre3y0d3l4jez8d4voj047bn4o5u9gk2y8wbvwecmrnfvtpwcn2gqt4vx7v3jatef6k5gocuuww800s3muui59sog8640dthiy4ws16hrcbfhvpapvulivrml7d9bigt2slow88mnqemlz5zi6nm2',
                adapterType: 'jh2o74uxltxz90u2gxn8iird3ubtn2bq4o73meq4cjbx30f21rekx5swjyc2',
                direction: 'SENDER',
                transportProtocol: 'yhzjsf95aj1evnj6hkr7uhr4jy7b2xf7d38xqaio9qfqrcn8a0py1r1e3gpu',
                messageProtocol: 'tj6clxtmtu26sbg9vhwwjiokberp1bt8em2dkobjd16mlfqqobjkamnqiu0t',
                adapterEngineName: 'pley66ev72w4ofr5xj4gx2z9kxxvdpjgoqdca5rchvu9rhycx6z8q403gxmr8ekkhxvoavkr3mq5lo1ghbclykmk5ihaakclz69fhyf93foqyravt69l27k0z3i8wm4gsthdb0olbddsz0qqvm2msgssp8sgazyf',
                url: 'u78xz6nrjaq43mm6hams6weyg6mfq8gp1vceaipn1g4qrc3qx8pgsm9l3tx677ne2203pnbzpk4ukrb6chh26ui18ga12pbfn6hq7i357fxrijw3ppg54gp7pufcgpn0mjrlwgtco9ox5douto4kqknoncgwgl584kxea55jeehbkehi8ipl7br2amz5pqrpbv09ms06btbpl3ggko2lg4hrsk666g6ur175hfe1udkxn57eod64t9dcnrhgx2cp4v59caqcp0qepyuquovyna7xfwp6jtvvr5ae6j9nsytt80lks77ed3ut5fqqzvum',
                username: '3xt7uylht0cwc5ostz3c29d3gl2skobtd0ov1qnz94m72pmbmpecphots37l',
                remoteHost: 'beangvs7l2t1jhp1emrcrzjhppydqlmgbbwhur9djmw3s1wqe5v5kixku13jqkeejr1uc9g5s5igjubynv1jevfy7yqaddtkevkhh3v0t7982zalr5ltgylgmfaunn6j5e9ctjsf45x9h58esgehrkap8do69bf7',
                remotePort: 6823135483,
                directory: 'agnbmgrycy29slw7pyd97pd8uz9nutbo07dt91oivudatvllkxmxehaizzon6pdjw2id6zgoxmbl8gkbj4ot1ccavd7gnuivgnj8d8lspymxgdn20kwpdalmyap8otjifn93mp9nqdho91uhmem6i4u2we0qniaqbavegkboy7s0ipqpstrmmvno3uknhuzzos256knj0qkeqveerpi3p0fc5o3rp6ca8qobfrn1ldh6n2y7f216dww900xv616i6iuso9wnsms9s93flkdw6j1eiuajtpdf3qn74z661blnp3kdllf97s0ambac34mnriirv11e9jwtov78k8391oxnsdgky14vifrax8cb48yajunhnh4c5o526blet0b92i9on4prwc6j4ccdmcotswyrxitae7po9npnhhy2a9fkqj0nnjhmnuw83o13fvogijjr68kwgcjqhjde2vme6eea354h0hffk5xck3n3jdki8z1oeo97ngfxyekbd6ktt66r152u9rsc5cgv7xfoqjypw05d3j19gxf6veqaeoia8fkjgashwbmoas96udkxn268s3ilbqxfzp9782fc15r8vkrjok9w84kxl5d6oqkav585t6kitdrqudrq0ned9qgv7skw63wtoee83fmu2ajgtyihm805w2f3k4dao6cw4m5bqo9sy9ce1cd52gotzwijv8zue1yi4i0gog1s8s6ge5eorbchjquswjmmzm7xqzei3a6lrl4yr5ytjub0315fg6o88olivd08lqmjar34dzbsqbsvvbjizx5kw0m1mm4fzxlzkb6xwlpw673pvk9ug66stw3wz9drxr38fubz0ifd6y6z8tcq0c9yxg6qctk0mhielbjit6cwfacv7mx0a554ptaxshih2ezjfia8esxqubbamcne5gj06y2860hxyjbksrp5ns6yxfj5ie09n0h859jv3adw2zelubi6srkhl6y09zapezp5cl3dhk3u2tw8hqzkglkqrr94',
                fileSchema: 'mnulwhj9ztfmfiu4pvtvhhhud9gxfq2o6eiam35kfm0gvwowbkljhrvdzu1po6qtpe5cz6yr17mb2ci9r8x6gqawh7xcsybp0y0bjrcvihydn62aueguma5wqlhux8krphetufgr68uc8wr9vxu0x2hcvnndrnp3xp0jjr77l9nww2v0t69jut659ia68fpzt9c3eqgrlq35r398llpf5l95jbdfupdsrlpgpsdkm8mzvqrxd8ydmvot80aerh8y02cqa2r72f3fwr7ns97wavq5lujmghj8vi0d389j6ansgby5zkeaw59g8t5ru53n1t0erxahnu1m1yt26b9n3gvzbaw6l8u5s1dv9x1crolt0w4bj9xvih37tj8purqza113dhe8trg8cd1cp60yhgw69bw0qkrvhp2jhftob16fsc6cru5skjhk8dgjvp9gy0k3u8vug72gvf9pk5xhi9g9e121bfxtuc9ex0hh4vr427i0c6x1w426nb1ecihueaizp0dtdgucxh54p5cc6ypysxmilnyvoqqwgl6k1bk6xslxk7gbuwykdtpkc130vu3ib5zv2t5d5wwv5pabsop1lj9p3z5afej1ljlupce2o7ckzbie6er7s1ih0w1wdkm4oh6ynfhh5epl1wgls02w5cgo9wqlkt4cl1rz86d9cz2gh7z86rvchd0tw7d52foceh80qp9w4cdrfvud1mwavao3lgybubdep7yqyng6cuxtmr0j95m88k9j5kugdmbhle4lmz61v2ekq0x9hmzrro4gpb3jph51dt9v1vw0bdfg3osqfo4d16z213brqeu5i34uu1j8b1eu78z7j9ofrmwepnjkyr6gy1nr1dn7uxq6jxnm0f01az05ij50jbtbcmntt0cpgcbunwwgcgam1z5yt9bvqpbp4edl5s79ihgj3fdd3x74hbhxhapfrsyx347bou70u13ajazrvplxso4r08m87f64w0luu8odyf9n6m4myi46adkgw6ka',
                proxyHost: '374xh3ai6gdqtxkryzpceq78r832mmif0y455saxkblstxvwuojo4lhslcmp',
                proxyPort: 8060510159,
                destination: 'x2p7icv3rsdqo5z10dvnqwuaim6ofw9zlp9fzucyubekzbdm2l0c4me51wewqz6pn4icykvlrvzo7qftvwj69onaawk5zad6kfiuxmq6ogmx19wa1j6vq55hj01k5o9l3eg39l774n0p915umbwp9kv4hsbtrapm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gdji1row0qux4o0e0ojyfsze21yxq7w34951o63o1561yxj8ou2pornj4s7l5fa6cwak4141sx90t30g4nnwrznodk0jcdsdc5gq0531ur9uie6pgeiiq1zolgqbwqgvo65oeztcmadcyugtl5164zpanhkzzt92',
                responsibleUserAccountName: 'wy0p6d3oz2sgao10rpgs',
                lastChangeUserAccount: '0xydu68pep4hmi68ynt9',
                lastChangedAt: '2020-07-22 00:29:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'des06072xgj1lz5tmtgu8qi7vq9vtgzj8pelo9wzduf555thot6dnik9mlrepew1omn58la2l62dzf2s2zngsukwuhvoknxhnzt2u7kn1t3f8w3iq27c76ps9bju3x8pv501c0tg26i0lyuxstcwvetitjkoy6rq',
                component: 'dz2q76txkc4pr8okqtz0xjzq4tkez8ng8rj4vfjbp4ylsfxuow4zllobkivnd30mhqkcsyw63a1l0jowjs7oakl100005qannmie7vc37xpdrqpbk05uv7nlxo5h66imfphpxbb8g1jwbp4i0b5nb6axb831ztmv',
                name: 'pyny7t1zyt58r0cppfe3lu83rpjqud1kfo601p1o406iensca6w0sell2c9zyqdjrgnd96ghyi82ro065jept0km0zozggd666k5f51moebkp46ml1c428mnqa79esbjkikr91hscgoidocym3tfpsfc1dchs00x',
                flowParty: 'kl7g59q56no6beze9ev9rvxe8e5d1txuien7rm5ebzhrmomdchrbokhty67c02e089bnm7z5kgnuibdgpy4w4u2t33lous05r3v569jg4bvidi53yiq0wq5rl5g1v0muj7fh0q4rysv5eiewxbh75lyizkl9dhdq',
                flowComponent: 'zb671rqhq4y05cvlyqs92c556aue5sjhubig922kzyr98vox81zjhweiotf81o245r7h2qffqk86o9t6bphkc9gzvp73hbfkgb77udrnchq5hivy45x7lb8i4uc0kl0tqhbpb8j2wi9n71qp9x7c2ga6h0m0ocon',
                flowInterfaceName: '86h1byb8pad37icb51g8yrv6d8vrpnnllpc9qiznqxipfru4u342j5mq2vaq63jjgzuue0umkn7chr0k1dtaitzxncuxgjnbd6vz7vwkbaz2s494f37k0tssruspjrux7ad638z3urk47o688htu129kxbbskei8',
                flowInterfaceNamespace: '9dg1zzm7dkrhfnyg8vka9fbfi71gnd6inuywe5ywn7ljiytnl872ros7tetzvcj953rzxbwl8oos7018fzeobmya1nwblv24sqlnhlsgyjx2s51hzqsyifv5ijpoj7k5h905vwgbvxwa81v87flgcy920au72r3wq',
                adapterType: '05t5dn1fm82h3o5pw83su9q6t03rifs79e1qzj368bitzkbzryr5407p7n72',
                direction: 'RECEIVER',
                transportProtocol: '49sj3aauq1uxyknsfmv869rpwcuqwrrtb72mb5sdfaflh5zd15aoti45bwub',
                messageProtocol: 'r8m8ctf1zpan3ebr5onsw5ew0dyu33daha0rtq11ss8xslvhd05qfibvn8ef',
                adapterEngineName: 'i2y2vnhoo9tbp32sekuayt97rzs2djn6r96s2xgjoiz2imv4523mrntfh7gz09cf3q4t0y809wd1zybe5j40c2ruyun8gn2t85nuv68uqci8sssjnxedrpmz31mgd8y3djkyydm7tjhovf4mh6akm2ty7syalsur',
                url: 'odoaspyb03z6anclqo1ks8rnnbvfucuuskzkadkfthluah139q4lzpv0o6tn3m80msog9recvj44zuy03cc0di1w5i35vbc7k1isp76gm07rb5yj2mnhz0345uhn9bn5liyh6avdl8ehwbssbitcajou8j5wwzr6cbhqqgutw5ot3nfrupfrnd03t98kghl97goe589ho37796a0nm25fgifb5nwkm9ok8fbwb1heiifzojb5qsimzshv511nvk4ut9gndscmhfs6e5vw8h63irtjqtynlvhsisgop3is73ai67sg5tsqj5sqs23lraw',
                username: 'nya5uo07lpzy9jrlt6zyreubsdb87r4u402qna7qp34910c2de2mk5sk7h2g',
                remoteHost: 'y6s7knbyyqn4natmbdi9v288ho6m5fdk17fcogr29nzp7h68c85do6cy7gcy9k1jqcv59yp3606xdpzul9mepehioq9uarqc2sks0sr4ey73njm60ny0pgy7gswaamnqq2g8w8adx98sv7ejv4s20fzt7j84znch',
                remotePort: 4839024584,
                directory: 'yximoexw1at4v2ym4ufkztbu08qt1s7vd7z8iok328xpdgsgsy1zl5aer2tr5h8d4krqnvse4h4xhfl5x12jhifw7b8hsv80nm4vbzk9sggih5yp0t8ugipr93wwn7n3276zlzhk3z6b4x6tzj5503tjgtdlvhwxwrukn9resuapj9bak9bebkb30c12e09ytl669itheef09w41o147z2vgoz60gspxq8yul2iu5ibjeu5nilkl75lxgk6wehloouhnlwxigftews9fnrcx16dqt4un70inbgbj0ha5eza03mjjyicknf1ln3v2wvot2la0jbbgr9bkz6kk6qcshk0s9gujqexs4mfb0jz5jnflfm0y6em7qq8h4otiguyrzly5xo58gonngtm1ozn38q22p2k72rypuzpn6mphxj2ixeuwkt1xq8bfrf8kfqs7ip1sa27ndwsriyoe54cdjh8tflt59nvqnryym0e8ficdjmllcnly3v352e1u2fuetraqopp7slbn3833tamwl9edxctylo35h7yc8zk03pnap39g9qijl6nc13omx5fmq6v798msn9f5flbltn7o41plz8dxt7s88oqi9r24owuda0il32krmzn97hkz8o84p9ye1ebd7as25i7o6mbyl2hhhve5lzw99wqpsn4rtjl4ha07clja1xtqwn653xq39ab4gq9nulgy290eo5eh7tuei4unur4mn533yyy23sgc9ka2i1io45gjdignmg8cq6vlcretn9ekc3f4sass0h1g1sfiv95wh274qkoc3uljbknse5qbez2j6xforsx0ze8itglcmd20ejwdhi1djkokca3irf575tl26rwxb14mzygzzz3fb6xbgpqrhxqtd2jz90u8d9iqibygz0jryevjerckditj1zai6d40ey44rp1zh32v3nkxp1dl5p65h2oqznagjsvud6yv7175pszuxq4kqhtruun15vjwsljnotq2z0jjjo87sxallnqa',
                fileSchema: 'q82932g08rwwgn1vlmk5px0epkfbetg5j44a60kizjzgp2c9uz30ramkfizajqesdpk000gev43hoxetd2u66tnm21hdddz56hox7x4as1584rlne91lzyhp1klbqpks0raitpg5en1j89g9ds01dvo8vyx1unx49uyz8z1nnx2ggipd45rqs30pb4rx6jp1f6wu8xn9uwgkwh1zhlp4g5wo3tdl6akm34pchxo58wghyh63491hjseqvi2atoh7l53q2o1g69wyl2lunrf7jum1b21usjn5fcv6x2o21juh6620ru1b2cw8od0xhm9w3b0ng7knsd40bwfuz0m399uu0zazv4wv0znqnrxbl5tfbf992z0ckh0uxo8qtk3ize4mnosa1ibwbqvrzhho7o067weejbz5lndby9lw9k352ipnr2k5pwg7s01r91m26kkdlfwd72i43unde1yft8wuzyt5a5fwncucux69gcdtf8ya6t17km76eblh1hvcsgb2gl0hwv3qq7v6mjip936vblfrspekh1yiebf1ka2venm3viq3aa84em83rc57o896c5wqik31sgfsn9tqutyguhmd6fpyq4m5zkjh7jyg6gh7n9d3ittqbnwl9dul4l4kqhkcnymreblpen223c7m5jsk2kf6meux0w6xidvzlkzqzi05vzujao9k4l3yak11i2a02hwbmus4lj9jnsr9peq7x2lqfob3k59x3bsyom53kstb3nnrthd9tz803fue60i8kyl3tb0xzel4unhdf2irpqqsxinwfygnvnamwpd6bx8ahuf7p5igz4zn8at5inh5wp8964w9cqrfob2ch9kr7p2hudbdakp9wdhdiiq11dfrioyuo70e6waty7lz5jteq1h87asa86djisze95kk6agd01v7qznnqgqe4g3kvcl6whnm3kbn1kmiu30gbzg45s958fg6mflve1bzz5ya99hwz4qzwgewurauvrmn6mzaqch4gw5s99w1',
                proxyHost: 'jkg3zydyugerow8lqha8e2f94nt7osofizopvx5xerv971x3282rig9ciims',
                proxyPort: 3034678399,
                destination: 'kzcwpalww5o6v9mxoucver2t11j7azuz6q4wd3eralzvwf0wch4t8p5h55hngd07cjvw967nv2evh488gxule586apj6ztxw89ri289ojlcusbbwc4fgqgshp6p7fxmgdken46tmh3tay9g85drywjh4q3j9y9bo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zmzixiu6pj0heokgr464xjpq7g9b5wjql2hhqod14weryk1mgav7y8217zyi7dbm5mn6b2tk71mietw1iok3u86w6n4wkvwgl2bf74g1prffruya4xqc831m5gzoynfqqs6n5174xyalwuar37pam5m0vdtyqkl8',
                responsibleUserAccountName: 'p5w35arp6fiminv7yojl',
                lastChangeUserAccount: 't0dx6gte1gavtc42u05r',
                lastChangedAt: '2020-07-21 03:10:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '7sav9229d7x0izv5ohgbbcw8hp6vnjck4fzv0a6bspl16yhz7e30u4amobrpbixhuzatfrwysapbevyfft6s1xhmmtoaey18oqcisezsh396u55a6j530tyo2bw7qhimd9juopxj2pslrm57rt5k26jx98u1oxy2',
                component: 'mtssjttvl7q2p6zzmnzydk73gdjg6t1dlzfunatjd7g68g58hiw0sl2c5dzk8poq9ofrwhgrtak44rx4ii3wtczgzko6nlopred7hc63qhgjlqzbdsx75ikeloplhhpsult8tu50pp2e9a9zld10knjqwvsp6bei',
                name: '4ywft42sw5g6g2r3aqc2spygxfrf48vjbep65tt7ou8eykyfxosmf7nww0wc1d2do3l81z8ekz2c1tei4xgyfzuf355t4ztmu1c10do9kftcw78fqm7z31a215hmd59w3diupc3iuvty35jutypqtil59p8vrbny',
                flowParty: 'v5pyp6gfg92arnppf2siryptsmd5kzjde3xajzj4klxwdhbucocnv7lch5mg6gtjieh1j5tommzygqpm13b5ud6vk89o2vdq3ufcyum9ntwhrs1x7rfxh0ottqlkscojdtzxhfgjttd191vju8rti4s2w7row08e',
                flowComponent: 'ezlhh6922eampje8j8eesihzf62x464ev9xo8wp40ksy62tj73f5mzuxp25ohxqmipgf6hzn6fmhexl7axfim6n1g4lmso8jengx0d4bfptwrb0vvb8ak686lhysz40kcjl78x2bmf55m5x329t8cl99gsg69t2e',
                flowInterfaceName: 'qreo27bbf19itcb7w5c9x6rq47ijmu8uz636bmshqt47c3fovh6pwxus5y8me22ixx6eqdiw6ju2i61sh4ieduzdo1f5yohvj1oy7m5j5o628uyyk04x86ghkmr24fn0wfr2inpuml78p7v8gio7ri7ont27viix',
                flowInterfaceNamespace: '64igk5a56ox1zqd7ysy8upy8lmtps3pboq55doix2bo0c2whpfggdsk92wzpc4r8fyr5wv4afmbk2sbvpa46inxje4xdu4htu36b6gpvc7mv5kkv8ev0bti58iq4wdp66c6jha7o82pwclnxev65en5l2wu9hhn4',
                adapterType: 'm4ra70y4tyqw4256rjda7kdnrog3ur2dgziedpe9jdj7t6ywa0wp0r5na2z0g',
                direction: 'RECEIVER',
                transportProtocol: '0ea3s8mdn8ewhx8nnmfhw7m638223vpo4daeek9ld66sntomg3csjtx5tes9',
                messageProtocol: 'huuorl71ws0tf8b9o7nzyd36vaxw6lpsxyiglhbrnwmg2fm9yw4dsnr70bgp',
                adapterEngineName: 'mxmkdyj5f6p4qbxng4d4cbz9zuc0djsut8tqh84gt25ofy6z095vii7fhpmkzvaa5w32shoicckwzw3ffpb15y86ft69qyy7fr1xjy859bd1g33gqvtzsp5xc68niwawxsx9m1jfm2z35sbqi27nxry4zs8j9lyl',
                url: '3fwkwrr45qi652430ddhwlltytntw13o8zu58otdblqt2im0gvw38fw2y1x92piwj3dqv1c7f6ombr6xwt32hdqjvigvzguepr3x8zaefv9ehgvx19ur1tj8fq6nj7r7ocg9mk2nijvq1xtrsp5k7zp20ckzrzzpz301exc2aqjr0ou5dw1cd6fi02rczogo118isl2aaoowdb6p1wawqiy4dyetgyyey8w2fylnhaur8yimmnk6i9ongaikpw5hletu9wf5t4i5rrvx45qllf1u3em3ij17uxhsakoxl433aif9bp5tz8bavei6i9rm',
                username: 'nvs7yowopli894yzevdgcvvmphg6get1mjsv7c8per2peycxh2domdqp8p13',
                remoteHost: 'lmev21a4y0l2jxf4d074263ykbckuoagzs6hg4j63q5ouy38z2gccb26oj0tbsqsjy0ct4l4p5uv3g45ukc6byj95tlube5bliq0s1i3n8g4jb567tqz4yajz5ma4xh7tstnktfstg35tupbg2ggguwf6rdzd4ss',
                remotePort: 2383735323,
                directory: '8gcd8ly3894apqdw6bs0a7lav6cmkz79oeh38f4x1jvzk4jf6abt3os4h57bdr21lsnc4ufjte8hbhitzft70vd4prmepmk3wttmhkewij9r2j0n7g6t4ydavtz9qdqf41hdocxclp7wkkq14dfwoipffl6mjbhk4x58bl1lcj1eggyt5mnqtn73wprbqw5miif11cgoxr01orms2ubrsyexknqxd92odoywb0w14n2fmzulkdknt18ztqr66vs3n1fi37p0on4orknvw620359qave4fpx84hfunr0cbzrjh93bndwg18qhg3zdowiogg79g2g3418xf0to22disvs9c6g9lb88if8z0bjeslc6b2floimh555xglcbpkthlbk07cervbgkutmz62lalum7akeupj36u27ub6rd617fahuownm1lvi7q1szfluxqc2p6ywz6uy0svdq1h4awkxjovoippsu3lzwrgke5ltgmq25n5vy2w1jevbtdhx8y5cl10rda9kyqsbd68yl5of2tnj54nd6nq11xdtr55izwhxbc6x6fc7dh7i2u5mbjwqzexyfdzzcyv93fc3ojomv3yowmhsvlepyxwrwa2nopt36l2ll5c544z70nlt9o2lxyfy30m32c2jjyz7tnydz08etps3g6j5lglr8aw0q8j783jsggt0brplbu441o9sug3twkzlxyk2dsoqehrdzfolmmh02cckrct4w2wedhxdm513of9jyk9151avbbajdu3rflbhgoqtdk8sem0vceusdh1ygrdiwapatfaocridntty6f8z7wkk7p1iaiof3rnnxm4rpx34qx93oo87jrngyztnh89izuk22wojjb2b2u1zyh87d4nfv16hqd225bsm020b9u9zuzf3e1uu9cpq8w1mut5enw6fxggci57p3lk8x8a85emjtpx124xpp6u8slma6qu6eu8mbeh26dw21cldy7mhl1atesv52f8pz0e3h01napzcy4u2s',
                fileSchema: '4t1posb030j09eygyot71084i4sowhpn0pduf12gx0bnvud36qxydndd43db4n0bix3dkl8mli7hg5q5ensfgadliu5awt4lrn2k6ed2fexzfzrmhdodhe5kkcxu595z824xtoahcb9d8w00a1571ze6pyqyvqleau61z4aeo6gzyan80dhtp9rfp7edn3c4v1tu70lfh1yqhrbrlsvuzmbxc4seutmpzgc5ndwno4spskp1i0lhqqbwxzishytewypnccstcdngtsxpp1t1ouyja0lhfbcus3rsfiyoj1ctx8iezm9ie2baade0p3erk5xkyjybg2oohfgd1vuqer5qbpy6y2i4va7fjgb1v637a7x5znqliubpldhkz8395yp9o0binwbeptuxn3kdf7iobccnad9fwkrquzukhhvunwqlap4sey5olzlzxdpez0tp02x1kicdrsiliezl7v5e2s1pow4uoyp6y3kqtov9onllqz6j7x2ceoggqo8y0s6r7yjoth5z201jpvmm9ocicxo7dlzo32woyfslxcofjbgj67lpmytauu7emkl4s0v9vc0n0o4mr165m6ro3bx4agqd9nznztckdvx32h34aapiw3wc3oxwfnuqgzhqvitgoufb287mt70d2s6fbt3evxepily3uyjh7npf5ofirq42a7iddcy7uqnv1wx0powwupzwlb7jl4xfhoobevazlz3x45kezbkg54i7z3giftcrdy4dv97xq19oz1rwwilcxk44862h3l58k91at0c549jcn31r59p0k40ae9ig70fx7qjb9rp6emsnadp3diig4zw4re29kn7e6ycmgvbs4dcf59dxuwdpfsq72m6uez9x5m3zm3m4njp30fmv7nkxfxsh8t6xv9r1xkue1hzudhneyxesyl7lx62u4qc8uieh3p89fn1k1707xwv4echygl7wv46s3d9a2bmrsrabh119rpds3f2xf19xbeuadt6tzgnma1dplzc5xeya',
                proxyHost: 'mv78tdbyxivbghp38mwoc7nw5so8t14744crm0n0az17ocdv9qmjufhvy5ki',
                proxyPort: 3937576120,
                destination: 'z64hho9h5pv3s4ompcn9hqxr2zyyl3qhnkizf8112bopowd9cf84r6wym6s9h0at9sm9t4bz178387oyit58l67vnl99w38opmsei4bu3bfm4mc0a7vtp3lxtnbkxxtvcxwamgaomb8j0rusg3jlrmmclod3tura',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jv44xiza2we8yibpdw9kbw3dxzikgpwkdtro8jvcz2crq7qit0fm0c2041p6o4vpn797sqeihy9c4aemxkykbfnxs3jyi2apff7ottfkd286rl32vq7b12nzsmpnbjuu91eka4wpe8xjxzp0nb4qeirbcjr3wmhw',
                responsibleUserAccountName: 'j7a132ialbuhklo9fyis',
                lastChangeUserAccount: 'yvcxxowsbrrw35t1sau8',
                lastChangedAt: '2020-07-21 15:32:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '7ulco3fbw58coupdgbe902lcer393jby5j7vn5useuy6j5ivxgrjugwq86mryleqtqdoi6p4mu71r4678vkcq7kliz5yl4g5ergltt1hrbue3tmmxfj7o01iwuf6d8vfotaimntn6q1ccabg2usfpj2x3zs6np8j',
                component: 'pibs7u9a6k2n0bd0oq54r241yh2t9stw4cgveh4ds08a2o30m6uvgkrpf5usmaowr8b5j0v322h24a8sovkd31mlwntkbk6z4qa3asdjxysqq8cf20rx8rfzs7wkgko4p3svxkuo9xeuv8dvn6ecsj36asu0hk10',
                name: 'v5p7o27du3lz6umvfgpea9gmzkfocdy8lg39b5mnt6gn0fr44w3siokxlcx7643ays9cogysecgbp7x2cgypio8ei7jw7utmwnglzq6dhosnfs5nu5vqi37pxi0m6g4twhltdp801vxoo4xzcptf594dz4t0hshb',
                flowParty: 'l0x1ckrfo3pdpu0v97g4f6qfse8yhnvktsxzbpra8225uzf80ugv059lgf7yc28bugk5gwb90pg3jt11jtae9v7q448esb2953zkvxqfyzkrwmvyzvelsaoseqhysqvmtlivep9clykuyfgp7iulvn5v7lmo9t5e',
                flowComponent: '0jdp1dzblo4fasdf53dra4ad9ggkaxmyxa04z8x7xdrte2gc1llih1azhota6567gtxz491jrrgb7xl3pggw9wb28ljwwa1czuxq7drhtvnderrk814di6zuwbz1yrk2v756owvjzli673eavf4vnwdiptwd8asz',
                flowInterfaceName: 'iu4kbx30gl691cagjmr3g6aqq661q470dtnz8z3qp7vlyo7k0ml3jnrbefw5ool2pb65w0ym0qro5yt5loolcqwmxx0at0i2c8vfj6c5djfnm67uoq56bnb3vmp4mi6khi3ou824sn627phwap5pyzkocp5l49ui',
                flowInterfaceNamespace: 'zir9euqrv5r1svuguabsz543zt106ipihcrdfhzi5nkre7vkq3awve93upko8a8dv6yx36xde63przhd7bkaurzgsp1xu9stwyepeznpez6fmrhp412drkb7yzr7qmk2jnqwddgm41r1eaflneblo2l8gbgzg7r1',
                adapterType: 'cicn39e6iyctfip7kyry0rmj1w5iqfv1e709umaxlapco1ki58q562ox6jdk',
                direction: 'RECEIVER',
                transportProtocol: 'e6g0zihyqdww2vdq5gyx6gfqi7bes9tk7fspqcc2tcw9wq3z711is2ii8j7nh',
                messageProtocol: 'o7uziwgje75kuq6z06c7j14kcq8lyhplw67ns1nmf7kxjf3qf1y3c19eumsu',
                adapterEngineName: 'nm8kdgpmc5r3kviwhfnmidgesyre17zf8ohy32euxfdhq49d2hsiwov5lhagb0jsjgmszcuoxt7zx38kj4g7eqrz0i8ols1h2bheejptfmateu8qj60jlmp72qhdf3dpl8o3h6lh5i9w9msjie47e7sqi4d9u5cg',
                url: '34qej1xi2fqsnf6jrfxq7u6x1mu2uto3o7ahncw6n85wghclqjpmszmsrzxlr0s1qbq5494ylj5doq1bcr3t6cr1y09wujulwtt2nmhdnjkk6tr41uw9lzcv82ahyyyhlosxwe4jhr6spo7oe6macohhc6x5jtrdsfufy14ie3meze36s8bvhhc3bg0rhu8ygol3w11hoh8k22nrp3h09ucxfgl64qcvbot6y3nuvk1jiwbxv7qdaf715h0a3htul6zqztchqoz71bi1119wcfi7azr6l750kp9wlngg7xwokxsglxz36ybx1l81yabq',
                username: 'i93d3lt54qyzmn1jn0thoo6t7lnweauil3i8gpayk9up8v1yrgh2jcje8562',
                remoteHost: 'bfqthdmtm73y7a3hwy04vfu36lzbjdnilynqdyrija0m4t7r4gb6vdkmaevucc05lw7cymwnna6wvec8t8vmaz08enkfvhq6zep1ewitxmvp0nr1jot4dl8n75i9g6qiz0hlr6g70275wtgrehy0c00t7ckqkdjf',
                remotePort: 1949692823,
                directory: '84oteta7m0imgl766jw6qufjsu638a2e5k0yl5m0mdld8e795q3hxm5msbi5ftidbhnz35wgmut9uuwpv8hmcj4e83zcohvss2ynbl8avdpiq3nfp10fo9prjadql8myk5jbpbie7gfulbxga4kny0qjs0lvi5zjx23q5ow57i9odie76ae61nm0hny4xulveut0c6px4o2rk693h684ragcydw3d81sr0ot6febu3cq4beieje5xmqfof9bfp6hl83kiox21xdx7dtsdciuyyn6partsc8yinfiiho7xco38w9xgcyyokpwp0qhi76uugh277mp7605oy6veg9qexoqb6g4r6rldvhphrfvabh50s34kdurphdaown2bjhz265ulwane1fhpxi2bkjbyukw3qw5kdkucmlinxxamhsypwbs44inje09gdj7khhzu158vazt96pqlqlva1hk1o1vnqqy86tjkhkfg9chys7cif33c007x7x6fgsu7431srsmyt3xbj91tt3ohlhsrxlm888l2mm68qoqztl6uzuimamtuzifpt393wmhvcnblv5gz30zxnpcdsyg9p90y4fp4gtek083ke750zrorzjz6753mv18nvst51hqzskt8yeixvaqvgn69156ztf4yfjkhhc2epvb40qq6vvilsnoo688ge11m1sdnjr7b09i2zc1za3ayqbjoqmj7hnaqbomnuksac1vwmodkcydvjajy3hnxookx9lwchogjbdi2siy25y3s5ktm2elh4qc8337bi2fkv2oiaisuvgjz724oj7gqrdq8wpj0xfipdczp9lcnicwh07qgecok5fcb6ss4s4qeu3lslmhqrjj4415ded0rrccx71orjgb4bwt38mdbgla12n4lwdsgu873l0zrbdpoboahlgv2v73wfjpjulrtwxs7ca2mvpbqokdjw7ymqcy8i7w0ai4lrfanue5yz3x7prb9b3wnlxftigsb4h56asirehq09o85lmm',
                fileSchema: '6zrpt5trdpyad6r7gdr3m7uak02mghwnbv9m8nmwo47nqs9q0mynr0gw1f5ud90p1uydwdgg3vx0wk5lr03zrkyevfptzeyn3vdz6n37hv74pubvtex5n25k90wm4eev21hks1d0ywfpjngo8v9ixa12ozzw17asnrq96faleyjn30ucc42x6q6v6zn6x60s5amqgyilyurconsrf4tc954m24z2pqn9l0hqjgvx8n9dr79k9uq7oovgi73vedv1xwzuhroam0wgtsw2yil3loq11szp3tdpatala6spwr9zwsfmljeu77x139hzx4x0aou1v7yglc2mn4s8pvd5tbtv1fz5jfraq0c56625ptssn3oywbqq7vclgvgg2294dpai8t22ah8tfq5su19fxc0jc66ly16skfo7ek9lscw0akrpfiiaesfub61pr1cnugcw3s7yjlnjub7hft1hq8c44x7lbnas0ecfttc169g9xxip3xh185i8x4j91f6p2dacfmjthagpab5c1vswh6t6rwb66p6fg6sjtktin99jxhuztiwlhfe3xpv864lo306nlhy88l3zbwkqnsxfsvqvu7dzsky7pqmvymrbuyvm8ishpl1q487wqd3wd0jxayzcmanysjeji404vaekwm8307yhsokbdeyaiwyug3xajy84r3kz6ntbbd98h09woyjy1t9myxiwj7oslq8mqfqemkbqjjywpalymctbcvmeplkxgz4t11gdfxz5n12dupqrutqdreci0fre7s1xxfckg23hxdv6rtfd29w3v3xl2edvdge9620vnibjru3fczngmu3ls5fgnygr39zlk46v6rgqz5edc3g3j5enmgbx8eg6frrklikb56f1xgxa2aytlib2wtshfzqy1lpkucvmesei29eblz9l1yxm9ahe42vr5shmzbb5zwqk6ocf3m6e0aua6lfl1kwfmy5hzpwcsvwlw9tm9kpqfriqvanu8ym31ngolo91btoxcbdw',
                proxyHost: 'gaxgdl1cd1tlrnbm376p8lrl1bwrip5od3rf5s7mtpffe6b7b5xsw7r5gnb4',
                proxyPort: 8539583217,
                destination: 'j239xp71vtd8vru2nomlrt00ml9xo4at2jn0e19ej2nhat2bqeyvm4svh8keztgtqq143nmowummfqbv2p1gucnqhfg8qr5k0vkavwsypekgyvvzrhfb88ns8j838uju70g3qz8r7muv29klf1p719w91i15h1k8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wkcc301ralu2ciae41cefu1licfpuo9qof4fci0neuwgbm9mz7u87tjl2ds48u4ii3ccbexmm5oqrs1eqsuwz8qj76d4nh647dr0oxfv0kav4nvgqf66tujn76e5u9xafpmf6pzqlhk3ykz8h4r54dars8cn4vy2',
                responsibleUserAccountName: 'j8oaujffgozma18tentu',
                lastChangeUserAccount: '0lqu3qg28tzlqjtuhabt',
                lastChangedAt: '2020-07-21 15:12:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'mhf3vwu6s36pp89esr82v8370m7xlwhnntjkplmzrza7z2jhhu6lsajs7ja6f8ql6cezc34c1prp0x1p1s2toihvvthykaf6j7zoa9b2m4g2i0o0jsz2ik2oy1vzzt58ya7smla5y6ocj8iz9nhvjwo6ulbxdlpm',
                component: '57ev61v8so8kn1wvdbmz3uyp1e2igebmumxw26rgewkxspgynjsn8yurjshmmemuy1oyrif9oobgragly2gpfqgknab1ydak8vbliwi26l96clbb5zpild0avcu4834qpmadsegwg8iv01t6vc90cbzbujnqb4ua',
                name: 'q38b2odi0ouyvten5kxmlrfdnz5moi4cwvywmxdohjxfx40jp9jp4vg4cqqgvdzy7m1znkhngeuhgbjok4x5g0kj3bx1n8bw8jcckvuzbqwiq6k9ox05kh0z2m55z46cagzusxknphyzicm0sjfu3aa7gktxtv1v',
                flowParty: 'r9styplxv5mykz4gxgt2g5tg6ct1u8a7m141i3nbpgyju277uoz1en81zu4yous6hc29qj8cxjb5siwklv7fdqa3jkurqac88q6b5rflbxu11w16xj3cbi28cjwkv66tuufu6gaqeoriqnv7if2wm4f18o9esohd',
                flowComponent: 'oqtv7ccxfffonrrizpeeuksgyxlmihh8mkn99akcfxtkip429po2se4rbe9agcp4mwdo6q6cjzk047oxf2jh9kudiiir8mnquqzyy4xno1sotcken7hsqynoe4opqu3xtwun11te0kbunrhwu4cy3v66j0n4ot32',
                flowInterfaceName: 'gc5rkuxwkou3j7v88yphu8sbyo3905ixgbzh29zvawhb028e2mjv2kie9kbr1skjnf5vsu67owgwd8y9q0bm3b4bic2oy51yx0g158pbc9k5937locznws58ocoh4axsk5ybmvtwz8egbda9a8rxth7ohiloshgl',
                flowInterfaceNamespace: 'exuilf5ngn4r8ln7fdyn1kxt691oy43o2kxlu8bcijew8x7zutdk56i53pijx8p3pjes02j9egiiznjw89l2fi4d6znxvzalst6535oxdqd55dcjfd3g43dwdi3ylqhq60tvco2b6co35hpj6oup3pyda1xrn5f6',
                adapterType: '732wdry02nhy47m3squ3yyk74y94cv0gbpnw1okscsrc2y4gdornvd8jlc8o',
                direction: 'SENDER',
                transportProtocol: '6mb0lbm5nw1kr2b05a3p4sejtot2lseo0sqkx7h5kn7umvno4qkcny0tesar',
                messageProtocol: 'oi2exe2iponh4x5ni2fgeiip9iuou3ifco1e4ul6mkd4edk1svy47how014ue',
                adapterEngineName: '1hwqbnv28g2j125of20055k705oebs2c746gyvr6up8o1fz7ehwfenex7utwiv8751y8oh9zkzvmskxvvddky5s3bw9zpy73osq5a395f73uy4w2uhks1v5yjcmw27g8ct6347f01wh05roaxcpvix10qq49imji',
                url: '7vkdw5x7emx165vwemn0c0tlrw807tulxa12uzpusepc6sjabx9iypa631wb9evuq063irps8dogvitwlqwbgdckpqcw8alijd1d5xp5bv12czw7h8asmjagf8cs5kadklsswvbh6oncq9w1enul3nkikk5hz5wdsixlp0sey96qv9ascwgutrervv8rquqnglugaxyozl6rwbxtvjxdhzgh1aymtviv3fqcw00monajjd0j8f4dzp24exy13gnun4zbqcdlic41wvb1upb2fu8pvb01qpy1i42e8x2rlfd3bn0qj677dytqkfgk9lrh',
                username: '3f7xdfv93cyaaskinjp76b7w7loqlu9xoq2rmyb3w880qoi4pyfgktuxgrdu',
                remoteHost: 'uhttqybkdd16eay6k00l1w01p31ka4pz4dlnx000p6xi3wxtbmq3gkdrb3s4cc0h4vmv5sby40c6kfitre9euro5o5k97r8l9w2zbwrj5cizh91hai6p245grhs2cz406txjsdpo4esanfk9kud6lon2ccpac2pr',
                remotePort: 2889238191,
                directory: 'sln6r3qhphilsqosjpyqbq3xcxb714xr9w3sd9xo50pay3arckjlpi0ba6n3hf9nyc8bbe7i9jvo2d03bcav2373ha79oyscpt1ez4hdb9dq46ex6upeay495i04171vx9nspahavbxg0q2u3a9h4u3w5bwt8rqdkn66p9un8gka85awosjkvs9wf4ej44070k6vjrjdiu3hmahfajyaqa4egg4ouw1lrp38ma7yjpmp6ak4ruslv6fu4kwkgox196it3oayylwk1x7papzxloaxw15p9keny98dtzs5raf13meoc1qi1sjkkpdkjkt794cvw07czfx61fjflpp1zfivmwxerr791lfy5242uplsfmlectir2ort8tszgm4l7zl6nulkpfz9v0fy6ed0lszlsef2518njyl5ue1rc1ktb8t2y95w5lk0khng92vyamr3t2dxekxd97fjjeacnxeylxhpabbzxpit83po9zr93aft8iigklhde25czxs597uxt48h7l908z6vnwlivl3man49q8afqm113yxxc3lkunsaqqmnionj7x9q4qy25820fkuw2djxvztbwri8kvrd7jw8vqq8z0xriibu3w6y4nz4w9hsotre01opbs6z23u3bs72wss2obdoehdjsq02zvb0vvb5tszkt0s3v6ogbacrvj38u2oi44xnns7xfg1susolzxef12oxslstoxq230q9yqpwgiesmreaiuub6eyu0n8bducz6zf95rk0hfb7gavslw7jdan6dt17jirmuplt9rbf1nymeah6a417fwxe0k7nkhvzjsmakjvdqyyaxw892hg79hkdufvi4xc7v5j42hmw9nt62j1rzp4vbrfhvqxrr3hsxjwxcp8inc18spareuhit0b3i0syl8gu5um3d1jm2bdc070b3ehznfnp3ddujcvraqc21i7imm2ijnngeovb1xvkprcgnkvkeyf1a4oupmvmnr1hfj29yqxrw51il5k5hy8w3y6h',
                fileSchema: '9ta6bbo6ulybd9wg9jtl2h5liss83cp6g0ueiqotseca1nffbbh3ncywob4d0rn4tfsvwlm0cei6xpibwflwdypeemy55o1b53s5e2vnfxhqxu7lzz8rv7fvgiqr7lts0n2imjyf70bjgj630l4uyffbzbjhkdvfxermrkhv9lewaccz00fqhj2iogv8gixiy10orotsm0cxavzz11bzl2sko8kixhl3uufps5vpfxms7n846mguaoze147u68krxstu2qrxixtm9omepjgqw6yk8eg3bipqufygu513qdzql77ir4w1000zz17iufltqzz81jff6rmlvhms1cqd7gh2p9u5ram64o695yu0f3ynquezzvcsorgrj2jox81jopmst3zmrmubdfjgzcci1550vtokfucolbc80hszywrne9og4b8nxg9f6tz5os1tc6ln25fhkna1j01q8nyjsae8z56a3h11rjrx2t5ivyma7aoko7w6ohz4dvdzuzr45i37yj2oro2nftyfigcr15fbnft2l3s5ozxvkbpz2f19ecm0icvzetsgnff6kg3zrbyqcr20t2n7dgtnkjzix3d9kg7ljildtx6b0x8ur5v10n8h0rcl47meh7pvao2gj4mkgt4n2d8zzs5nlq9jfp1ipmzn8hfcg8appq5kuyqdzjedex0mrxepuwwsb03qp5xl6k9aglfirq50h807orijs7snomdncewvl83ex3t0kighuivc4qbrvhn2s2w9v1pv7nwdpximquimsq37korda3jxmj3ds0kcz0mbmgz6ljvxnbtpn3dto2ieeonnj40dxuw4sy49rii60qmho8pzldek3g7yt3jkwziltpiq8qix7c7pxm0u8aj4ga2ln39v1ybwvij2n7yd3zh2sfk4fyeuenvr58x2mwo2xlnlojrtvd7xxza4ry8yymjw39k2jg33wm8i49pzbxrt36j76t7aak1vn02h69yl64rdtl4v9pgtqsz3eyxd87i1',
                proxyHost: 'u9siqp2j0fsetnqpl8p2w49jyhjmm6i9ale1f133igwzejnl52b1af8v0qrm',
                proxyPort: 4007141338,
                destination: 'sum6q27874vgzcaitjh2yywo9pplh3fneizwomm3q378dyqepl05uqg5uvhudlc3p6j21amj2egpevtyvsu9d4hft5n42hr6c5y18rt3lrf3k2acp50ysujml2dhpqrh12djw9ymiucotf6gjcv7zoioau7nz6bt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lz0oeznkjpxtfk59e7wkz99k8b4h0qxgrux3yfg1t473902lkiodvs0bpw61ykx4mkqx4htos4b0r6ve5tz6xc7wanfu89d5wwy7ipz5s6e4c5dtm3mciviqohlth730z137whe7oxzw75kw42zelkbzgh3sozjn',
                responsibleUserAccountName: '2cklvq7c9luwjkd0alz9',
                lastChangeUserAccount: 'ee8ek19ocm5ya7vgcq2p',
                lastChangedAt: '2020-07-21 10:03:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'btsj1w1j9dshvxkmf9qjne5y3tuaanbshr878umpatn4ijujwrvbmtwlfdqccrxyq61tn1cry87smz34rxh10q366dkajtjiv9z7bx5jatu984vabktnnrfl72ukoa4zucgijq8tl4ut19g9sp72imt5hcl74hqq',
                component: '3286iqe3kdebnl86cx9678ubijeuplpn7mz9eoc80oxhqhb5q082m625acu4jj32f9ugxj2b5hp75olb1ypgrghhouclfhmyglbpc3knrufk5563js4f8lvyyog6ej72dz12568yeros9bj9bsjunhyeur2rnxk7',
                name: 'mxdmwnjt2ekddbsavabcus292vcctp5lb4ycj1iny4dm9n8vd5mgmcwvn24pxag3h2kdoc0zop3595sxg71lgau1bswx1jfvgplbynd21lnv4nr7vx829j0gxssf5bgmh1r3lv75egjse248rm722z6vpbucx4w7',
                flowParty: 'aqsbb33gufuqf5ellntgaisbjqeez4zs60u2zw1uxadp4jbk3dw0tklt31e1dgntu30l1png6qs6gteus688mircjvzsuhiat1kbm1oglj6itj2oc465w4mmnt7h7bs5shlnr8ez1wrqy66u2r1duolc1e6zyliv',
                flowComponent: 'qse0afs3633aabm6luk66dyqonrws4ulj1iqysmvruds4ewg13rkpkohdkgjf2ursp2bzytx49cf9vp6knwqs8owmeduu8ay7hwolwuokmzse1sz10491byw28s83vfxfoysf7w1mhfujfuhtm3fzge4kwn5hwch',
                flowInterfaceName: 'gdhgildz87cow92hn950yogmmexsfkgtffwupc7lz5swekqfa9frkhnb73enxxudnfve0vn39fsi21svkc064cvnombgcedpfi17xwa7m3zk95ffamt41gft5y3r9tmoth494nrzgoyr7uaz7mxk8hzf5b1w1uzv',
                flowInterfaceNamespace: 'emkkto86ms3dogain9j3q492j72ltok326y4brbt3ia3i4rt20ol7385llm0s71ojucmx84bgv8uz08pkw193nxofo3nabl9rbqmyba52j91wz39ap2ik1liseyuy7cfpifbzr976h4l6dfc75pipmajxr7qz78b',
                adapterType: '7qd09c1wb0uuf41g76jk73twluetqoa9y3z7wbjqaisqgoig6aqdidypzamr',
                direction: 'RECEIVER',
                transportProtocol: 'vnhj74qm9x96az4u79orxmhnpno9ydh67zy9lm1l3zmc37bgk4aazm1slyvy',
                messageProtocol: 'bp6cspr5o8z9hgbybydmyxtud7ptxumn9tf92rfijhl44szecx9lb5h4nr2w',
                adapterEngineName: 'iqe5u1xd2zz0ymsur5if2xzjv1voeto5l6fkwhsw07t1xh740swslzt1k5d0wh0kmmc5powfi4z0z9539wvwsr4tb6130dn6pzxowb3tr1e9ki0s5i7sjik86lt72e1yrzh55mh62xs759jj9jk2ayk5negc96n1d',
                url: 'zrrgk72mr41p0vtta6b3nmqpe3kh3hxhhod3tyip2chwhgb9jxml0rsvt67lz4lwe11pahe7vrgyt1qms57xb5pjbt42jvssnj7liqjz3a3os8b69f4g2764ed5frtwaicnxyxjw3svrvxbvu5aoe334h1cknpwd9hvl8pf8j9we3uy7uou9kd2xqx1gfrymjxvm39l0nec8vme021704groomay7kfzorthubsftavqtfyflc0o3rdllfj5id1sp39tiehcte7ck3ssxw3nfp8qorv4r23b3q7v364bhz6cvnuq7o6y93v3kibqnw8s',
                username: '6axfoftwfucmp9twr3xj0xnodb6lzqtot8frev5x8lvv41sehnrxye9sjnt4',
                remoteHost: 'd8m234zoda1a53f87dtuyfcfnvb4zpwrrftmj5dgv6vku1ip0u95aaxv5xc1ugmoofe8lz6cgwg5bf3pe03dc9xi6m8obyzxgtuze8gx2tg7xvv7f8bh2sh2o0lfk0bq4ht3emv4rth2r1f8uelbhi4y7r4n2dep',
                remotePort: 7370526531,
                directory: 'tvmrwmj2my6ycswyih6g5p7t90951aun31f7j1dc5yrxz8ey8erkm38kol6ewxsglrvstqyc06m7dm6xvdli0sa0p8z6716uzuwzvfqa5z0nuc4el23uniqrmlqvs54k4h8wwcwk398w6p9zmfudc25igoagyq4gvysdii499fj98x3h0rbfdgxg6wfqzi64thnd5vcvxjwv9n6zxbvbgojttrzn0nhv5cy3bqmy2prpikmrs6j0creuwce1i3bsxfkudxhie7674y34mslprh9xv5qrr9rqnfajz9z42hu3nx8yqguz9pa2ku1rjc8e0qazv5l5fqzotfd5n7ybj4u61fk4pos4nuf7r6fzga01e097qblbf2pw5hejpxwmzlblmft292an4likqa692imijzmfebhlk1dsvka9eb3bj8tu3sofdhw2i5oarx1mw59i1mtbyoisigb1qobglmax0h0j3nyv9bl6tnvvt57s4qjadtpc3u8y9kusljdhg3a79e6zx01u2qrebc1mfwsvabs043pz4kju5cxeklfg0dhuiw7b9ijcbexgf06cu6qb1zgy0kljfv7qxtq0pafn0nsjzr3rwjpi025c31sdmgqs5nktwrprk57i2tr4rj570e14fnxa1zs8ecckjoodj10fjgwdy6ytq8f3xtn7w3odxuxbjrmgcigvhh25paphov4ik4xed9amvv9ihsa4lkovnq7vfie9a95x1t5b1o247usk2oniqjw6c0exzvpxvq4zqysk16ml6wwcst79306fypdbyq9ted2uw6ovp5p8vmo6k6bfxn0812103w3h6dygmb8jsnfjq20kj2oq9jqdr2cdcal8shuw3m86d8vqk284zib9upgravreveae7ge79u6ozqp3uxeikucvro8am4dhzlze0uv6hhineglttpw0ksk2elh87ehrahhzip1629hnjhwf67tu3luoo7irssw9mfvc9z8ltbkqy3l6rd5kqtbywgfadx1k',
                fileSchema: 'd4s6zaa4u1p17kglyd1s2fna9bno5dhur7qlzqybhsfrw9jon3da8amzn5957mu4ujiyjcetml2e1cutg40r0870vbnjmuyc66ci9e5mvzj2dq8lng3hbthl99p285l866cg3zpefsy4s4cmxbpygaoelmrhiu31h56093hqvu89qxji2yl46np8qd7ty9n2tvzbt4db429zvtyf4e7hsaxtc2jbqw0dvxkzt34ave4a9afgxymzg171itnx6k9m8vocv3unh8up0vrpqdoxds7hmx4s8i41zr1drk0kdcjm004rwn7ex66zf0qiib9exg74ro2x5z9hwivkp6z413vu5vs2eas4n5vojzrl7wr6qi8ywkdxcr8x5zolpuy3ubgkm7oncuf2k3d4oe24dybb4fitmn7sitfdylt77jyy38nzz5dfuhnzed4xpwxfvr68hov3raaqgd0xi6nk6gwe898sgw40y4skd7y4c0dec9oq5rcjat1y2bt2ern8fgswv66sxe68nd5v0fwvsv40kxf8im0mvqwvdiont0tvaxbpx0zml74qsygbq5gbpd0kbvqbyynftrqmthgfzcmsifv0xwexuu0prk8qq0zf468y04l66ex3ndqbmije06lddk9pmo4cf431upb6wp4bhjbpctnc59c203g8bpe452geyo4bc7c0yg0k1evhf259ff9qutkkzijcwphdlu7yy0gu0fy5v5gerggtda0u61uttbp6k7ufo7c64ue2z9igm0omyu728pep0kvf94xp83fiq7ctq3nf5wwbb1oz0ew470s2lr95dojbi1xn0y1z8k7cv51lnig1la1d0v1u4mn6z2k9ckzs8huso306hpqm69bs9188eaixh23hwhb1womthdg7gnekr8qcd2e2qspuy8wl0euv9t865jd0s23xddm8i0o497z43qu9x0tymlhlhk890k3esc83fcw8huk3y65qp9ftw0vvdxzq9pcatr11xqa313awo76f',
                proxyHost: 'nqz80iq2e7ix5t4ejtiq7v2fkhsmmfgvvx7d543p1wh352zfz5xzk7asxqcv',
                proxyPort: 9621963290,
                destination: 'taamo1s8zwb992xgudx2za1znpdtfgfrdnucpn9271puqo7zbbe9nvzr1lh9qeu351ci1p99qhkbmqbz1ko8vhv7s8hr0nl0lpoj4zz88x7mtyoz8so3u29d22iu0lltirff764mm6cfamzg0qekyayov46a4fg2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5d6m4w2kns3xeljd32xihdrm9d4am148dc2zg82op0qf30qw0igp4atbfdk6j70osfxk5nk337pcnupnnnu52fz0ikmbkcsq8irv8oaf47ftlkn4u9y730d67f6ay5ysiriahj72f0vc4thqsmy465as6gzxmvhf',
                responsibleUserAccountName: 'cryvv03p01xk2133wow3',
                lastChangeUserAccount: '1gwoilomxswx1d5ge7n6',
                lastChangedAt: '2020-07-21 16:11:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'y9eocxy9bry7flfp2mfzuofc45mj71y625clwfmmedy2k6mks4zayihf3a4bymr01t72ckyp87as6th3cyqnywfrnhdbjvd9aa1bswxet9l6a63pfek6ysy9xm0n8iag048k22dlnledbhou8e71fsmk31nzlygb',
                component: 'c5l1uzwzab7pgbuc6aujtjziybgebpm4q8cfvargpllerwiphld6ckyhavio0vpow1w3y930xrq4v590ot4m80gtpumhnbibb3gs3pyy259566190kndqkmz4ebvg0x127ygbsid454116fzumynyg7lixrvy9qt',
                name: '5437bfqaoun9ulsd8vsqm1letq2re0mwh09rgo3f0101jiw6wenuvhfrtekia67w4rxazhek9vst8oegb576mqfd4aky7nz822j7mvcidmz5h5fudufk2uxwixhrqt2hjaon8zo03hwp5xl6lvm9r62b5h5t58sl',
                flowParty: 'bid4rhskngjron7bbtdxmc2gzm7b4vvcxv9ieok8kdshec4kfrajw6f8isqoyy0y9qg3k51hwq78nbxzfy2gurxm6n08p47j9f26wjtust9wnpszmje424x3k2af6m4c1gjw8p903v74ipbpayye9gof9zd37uyp',
                flowComponent: 'hkoki1sdf34h0nyx23ia0rw5n19z6ahve5scwvob5foc4et2e707x76pe4jssp2agngaa9o9i2shjf7769by8szl7q5315llsftcz3tbhf2b8hbvxwlm8q16327sfaeqwl16h0ckmc3kobs24eqt6w9j0qq7eneb',
                flowInterfaceName: 'ywc7ps4hin4ltwan0mn7uw6i2is8lfgu4rks7sx5ishfqiz3cyzd72gcih1uacmaf7nhzcp8cqhnl3aw09j0fiycyw4h44a5chrs26tz2ljg7sntshhrvhh6orx2mk83re4wa50p1rf0pc034xsu3bgx9xd1oxs8',
                flowInterfaceNamespace: '2dspef6fk94vhmryagmt698eixgv2ewikd5xfw8k99mtg4yy483ql7irb98u82a6ngv4yomothed7zrlw1zbnfz7crqb3lodr0xqz3b31g0sgz3shj64yvlivo6bziwniqgai5i202jypr6beydp8ztt0yoc6gzw',
                adapterType: '3ipbb7nimthtq3tbki2gyqfhakofqmfgppwhcvynu34e224lxqxmbishwas7',
                direction: 'SENDER',
                transportProtocol: '9o6qw5h1lrs1mk6l1l6bcxy7mjj5d976qyg08rz1hdzn0j5xc0ykoogua3ec',
                messageProtocol: '111fr2zipvoapqi4nmmwdsw08p2ehbsuhnre69d63w6if7gtb11meebwupjt',
                adapterEngineName: 'ts0yg8jiz6vaiwz2zslg7w3zwobthj0krrf3lygdnbjt7ng99rogn9y1i7757wjzr80fz0at0hxv4ic3pi4an6qhjyu25pbern6aj76n9b7wfv6w87vchq6bxya43px9zow9cdtd61o0beg3nnh6qg1dic33ulrz',
                url: '52t2ia6wp4soihftis3omplkgoimzgmugyj4k2wv24dkooe9l7juijp69803fbgk4js7kx1gw6jky225oae5erdj5m4cg0s72qrdmrbkhs53v59jb9pqokr6bwsw8szwkxzxzsor9myqc4m5taa5f8n7let7hzlc28jfxy7006qxkh3u9etc28tv1v7eb29g1qge9qpv4mnt4b498khjwma3xvh8bpz35vsowugu15fakupwks33gsc39px2tpz6d4l6icl7w8sdo6ezmp8fc4bdlk81yuwipi9w7bc9tokzoqskkludk1tdxthq76svo',
                username: 'lczu0rn8eovww74revc7cwkg5xmjo5r1qdohhe4h9qblyv9vrl5u5aluh2rx',
                remoteHost: 'ov1bnsjxliloajiq32c2okt5xutgn9ev6r2jquxegugh3n09px5ktry4axu952at1usa6pps84b4fte5uwfpoqlfn5xuwt9it1pvjonm8qjymbcui7tanxj0whxdydxiis4ai4fqohsaz24kjc3n5h01lsrlelsn',
                remotePort: 9576989986,
                directory: 'libgin58qahb55vdxuuq916bnqg32e189ib5g0w8ycjmgd5k3ki5kw8hqvtvwd8yc8cyt8bs9bwozbamfexbm4wrnafel699o6s09wopltfwf1ofwwmzpamlxnt21agq6vozpbm2mgawuv21bab4fl1rhhtw1xjtvphlsudfpcn8z8b5ecijx85cfo7tltiyny9ut7pji670fwoqsymxzh4diar89q1g6lu5r4uapuvs46u3fcrns4omyl6km2e0s2rtobz691s9srkk1avm7v9hv1prnyemkx8pisvpwcd8lpwyov1s9orr7h2q2dkmbewmyasuuv05e8spml2pieuw1iy15xrl8zuy4083u3hx75qr5ujp9n0gsisugumcj38nl2hpsl6w2t68xes9zoz6mmcw3378oz8wiv9msczznnhtadhnhx8k178zjqsjmkh9hr3i5jjcpaeafb6hogahqrh5ghwi1599c09h1wj61xmme2pdtlk55vtgbsxv3bu4qiny5n6qsfbe9z2pjzryo8r7plrbcuv8u4p8yezgqpokwr7j2gwczc8qu1q4c5nclol6ofcdd3sn5r1vjmov107wowtr9ouzhh6qzak1ah3z85w1hwinia6t7eu5ol8cwqgw45oviokkzcuivb64eruzt3rxule2nkh1f7wpgqxrz5ypdsdoylka9xdizswwn2uhg8cvtqn751cwotuq8jmquz7sv0wcekqhncgi63oj3qabxuzld5p5ec1h7l93wvksc50fc2dhvs6ogl375g91i8u3tooeu3pzu4463t7z6am4h1uscchb8jx6h452zvb37a5lv22n847ndksx3nmlcz2on2fi0pfpdmpfdr02wtmtb66rg8801y6eltfu3fiafrrxlsogzj9zl6fcflkinme2j47rhahpk1wrdiiyl93xrkpw1ad1m99mrrxq3xrszud0dpha6fscugzqsm6t6cwgpowczn0b12w4fv2ip708canibmgo40z8',
                fileSchema: 'j8fr4579cmh84cboe0pv8xduyp441mcdtvjstfe73pn37yap95r03prcixvtfdjanoo6gpph88hg44a5df8yslj5r2o9kuyypjm6qqi6oryhhb9mjlfvdq1vijic4668b9uogmozyj0vbl2cexsqzeg01tzzvg994unqxnkd1lsdy9kijdfqs57w4y40wjsdjrccz4mgmuy9eb846z4f7g8tykidtg160sjysff5emwa9m0am6n5tx0urbo6gzp71lb7038tsr7ulf4wkg0jztu4ec1st49ddgzh5fynxd5n9i090vjwcnghuxdnvw5smwy7unumigcv0xc0nc6g93uwl19rfqa1lf71ttp7uy7a7rc6m19kav7epvdqydnlrg9wcpwgxrm0xyvhrn6wmxaryeu32fyik2jkhgczfcb4jwprgu7s5xh9wm959mgzqlrhzw88gm5tdy96h5jqemp0vsb2e3ycgplfnpv24xbq1cnlzayfh27mu7eqzz0vclj7wq3tegrxlda29vkszrqoki89jakh1fyuloyz9yutcy0w6dqf4n7ai7ai6eqence3uejqzbn6kcvivvs3umfq0d25dgp8eoefmjj0r7eabdwokm2gm3so7svbqcdx0yeo3tf1wv3jo5uq6s9pkjkqdw4dehoxcs0mcexrz6v6hezkogjb73c3p6ley62r0rk40v679cnlhkib76v6zhw023y0p7lc622mi4tqn27tau5mqfw5eioohnn3wyo0lxs8lj7pobmxem1wicuir560791ugjer3qxydz3nv7wx8d17u9vb7s0v8x0txxiyydk9mv6qsg9epma3ijbtsvs6eh7mlwwbgxk3tc5xldcu8vspcrkpnr5p8w53oyklw684irhyse6lyiv8jx0jebcoz3z9gfjajjhz77kvcnqegqtvjrfhssapgeazsm5fq4awjesit0jomkiegsktafxim0knuukcyeezj7xhgewjtir5mciqn8puh9k3t8ri',
                proxyHost: 'yymxzhxz4juhggm1uype57ki26u0dzfot173ggx6t7i9zul1e3tr0cswwwle',
                proxyPort: 2315460519,
                destination: 'rs3u4kakayjls8nb75sww6lfavz2mpf82a0z0dqay61cvqun0ygaoyahnaeh2wbw6ladc7r6kbk73cprc5q4ve4ygnv6tzkeeb7gx4jjiwayd3syfh9981d1m220653kz6xxj23a2er7ihxccyo5q8118ko8sgg2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4u0ytykhda6lfgpeiu4xpfr0ofvtke83xzydvyechca3d4t2xadgxxscva3fmz73vx1k8h1bx28app3k2rz7sp5ckhabmhmd19hkpyllk0drnew7qh5jtvp0rz1q5uf72zs77mkrcarbi6fsu6czcyoero9vy944',
                responsibleUserAccountName: '1jp52j69djpd4498t5r9',
                lastChangeUserAccount: '7ezgdfkn15mq8dnsubdk',
                lastChangedAt: '2020-07-21 08:26:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'oitdauup7gamewx1fvzs2hnzldyfqfsceyqcuezvc3hazusdtnu4l0qjj8w07fu48ht8cq1o0c6rx7tlzgwxry1cqdiev1ul504adg4fxemesydctyupohbt2u5bb4wq6auzigffc3nkn8dkzvk2cixdn009raji',
                component: 'rnaza68ec7o06st2l1bp3eburkxpmcq61s0mctn2ruhiccyls0dw4a5n6absl5h3s7zu8l70ajogd9dwpdy3vxzbgp4y1ek4isedbu2i5ipp0npr30bfv9s7snbmcwx5qqmoc5ko3fizqykln94xsfjzrav5h118',
                name: 'a9tanprp35k637yvndcfba0llbu9jk0gtixxn3u2ecp4q5o9t4atj2mcjoqpt5s47v3xo6d1upt0v2i1eegp4k2pmv1uiqkz7sy27tafl9i5hx9eta7qht2kocu4gt8h00uxzzmtlf73iab4esh6751xj5tnw1fe',
                flowParty: 'ienibxgee7m5xabv7wua95dp30k2ldeupiat9j95q1p4idcs05wy8vuz5abx4n664uv3p9jrxh43qf7ln9uufos2klo1klmzrvplyujh9qgtc85suz0t2cr6p827jpgvohllvbr4c1u0x63de68b4ya0zcu4tz7o',
                flowComponent: 'pdy1rp8hk0bl7csjo5uxnv746dyrreaiah00yr0p0933tl48nou7c4mr9z812pn0bf1h0xbzqgpyxkmbw469webeut7b72efsbgas5c7k1hcngf1u72aqhh80kvtmyzc5kl4r1qkots674oev9vjbbbraj9ef3fb',
                flowInterfaceName: 'ds265jfq6zuaolulrd4flxxqejkgrqwtbwno5j6c9afaof0gtarq1nsbynveevq5bc8jcyxs9cnwnxw1b6z4gc7k2d8y4xodszxvmw1s78mhpecy1nmzljsta8n87oldjdol0chxch68btovdy3faouzgf1qqx71',
                flowInterfaceNamespace: '3r2mgrssk0mms91lu3vz2pbxhyca4qu95zhg9o72a4q3htuzmc1p7fv44i1eaa4xi9ygncldq75007ual9pc0dtwu9hugluimh92w68hi2tizoohormmar8abqk5rhm1cmvs5vzzmhq2v3wok9f2v5oyhju2qqia',
                adapterType: '3uau0pxe2lwuw9dvucajmujf7z0ck8nckksm6ug4w7p32bg7sxzvipeui27z',
                direction: 'RECEIVER',
                transportProtocol: 'twi9bdww20ov5zzrpderygbvo2tgo2ac2y9b0zw6rdarag1w7k70dypycoe7',
                messageProtocol: 'ancsplholkp235ea7fdy6i0jjajrvj0j0u297dc70q94k5hw3oly1qjwsyg4',
                adapterEngineName: 'fs26eje9j0ung7lomdzg0on4qdi99k7aec2cpe0n3wlezh0fxicpf163gzl65eu6rcd0dc2s6kiyfe355u5pjgc624hxq6bnannntjife308dcl0gmidd738n9w94zk43tpma601sz3kw6p70yojfx53hvmrumub',
                url: 'xhsv87095vinpeulks0c4pzbpnm3iztb0adukw892m5k0q9u0f5lfeeng45wklfmq0rlb6l7jcnq7jehbxs4gpigpm7x12zs0m0af15lx533b5yl0prkb4w9hydrd75l7alryc8sm51k643f53x2lu6qsftklf163bb3g43ywjnmse8n6jg5ewsj6yprfopbszjaji543yu0uymycxhqnka6u00i96phsjex5lwmrsad5zgi9na7q69tuqrlv2890z1oh15gpisjh3by7twkcaocegtvwwnz1n4w1usgh6ba0b82ua0q95mr1zqfv9n3',
                username: 'ddxkutspu56udhbsfgfmx556l0bwvda7e1v7yg8c8yi2obuml20px0dzh3ojf',
                remoteHost: 'l9rq5fe02hig6yni2t0r0gm1fbxoiyd3w0m42sz6rwgexvcd572pdahftlz869o4bkau9unxt0yn6ote025eulh1aoo35hd8a93xz99uyvsrw24t3hmyqe0z6bso4dtjhitsd1vg5e6520dzdj2ztvv0wlibrtc3',
                remotePort: 8930286080,
                directory: 'asyua6sp4id111s9b1o3qx0f67ble9zalecvds5ycc2d92v7d1y2734n9w97snyfaqc6aoz4glrs1q73n0juhws8ot8382c5q3dxjbzqk7m7eb5ywlenh06qdumixk5o4fomtskm1el5zk7j7qbwomz8h4m4yohwjhgmyjsvq5gg472latqutbwl0v0w8in71cy7cjgoxatm0nnqj8pev5ek3cer853t28a1s79yu3dke30ksidcoj1r2eh2h1xp8m217s1fdp9o8u1sht7aferllx4sbd5ox39wr0e8d1e55gu53nfugu4mc1d5ycqckliaxz66iss2aowmzxzrqucpkvcf7yom0wwm7xszhspk6syxusw448dfx3wdfo8d7iwyyse8401s5d29jm1bkrunlcbhw6ys6guzczo2tbks1ka3i8hij0fs2zoybxnh8iqmiklg21dvj8hdhx3cpiqk4802yhr7lw803ryb7vbcgdr9ryt6mtrdohvk2ych3ydw1mmzmhm1p7tdbffj2tu24c4f74j6mko4iy433moy5bzzqhqcqndzyt4ih63ricoddze3dx3mpvjf30pkwhn909dx8e7hx1078ph538wia1qazgcqd6arshu192gdlhwke4tjd2iivb3czjgkannx9j3oamr5ykpkcu8jgw8a4g9j848ndkyxm7css1lhs66bo0p3uzwxexrunnbp0m3o8adz6hfvj047o8bltomxe51jlqcgwvsniayd44tjhr3jsxdm99laqnflen1oxuup1qw75bto3xe9i7xekn0p4pl95pynf770ljevypnvay5i3mdyqydbazt55zog36ry6z9z30awmiaqmc4a1hspja6whosakx4v3tzhxgzroe0nux0a7dz6sfobrx1uak8oqxcat75aeuq267018ap0sk4qmtcyt2eowv9fjp6x1anklpnxgdcpu6ozo39w893wovkf4337t2fa5w7xatwqll2xic1u8lmb69g99sij',
                fileSchema: 'xoiy768blecqq3npeqh7olgwdhul9tgpvkvyn82qqoun2tkl4yrc4o2jgozeuz4akslp3ms6lr7w1h4ki4z6h7ohfvq6u7n4rbviwk2ab28z23z60btst622t3ehbxgunanenql2rpzdxp3vysuc7v187udggkggbemqof3fgtn9xp4a5r4199n1ruy73gr0imb71u9iwj5w5dr1tepf1yv6s9eydi4pu5nzyu0as1s3lnygddzq7w6zmrt9te31akisi4txcv65zfp9axxym7f2hor16umk2btsdow616rdomvyvr8q0yx5thfekiyrgttbgo676umlb758roltbu7b13jvuagtirc2bgcenvrthvk5cux3xk88jx0a5qvuxatbin1sa085q5nhk7mrhf5s7rf3tf30qwpev5oe7rbw4qh631cvwl008qtqfsvlef1bn1nvk25has48l5t6464wbq5ebn33fhy7p0grtd2opnh27c3zwcn6ta0xjmrhd97robkjdxqxtq13qigw0h8di5m676o445p0dniubhrsi45uhnimhkpicm3chaiubgqownvf5o808enh7ieba54t082ih70mv245lyrvh2l5cvl5tpj6inn7ksv47j2cihzpiyakvmwoo4v3qitgn7jjxinahao1825xp6s93kbakfbkqc47xahrdai4bz7yts1l0ttzm7nce2e35zl21h5ncqyyymfa9kysrvqkhqs6nxrfh8gc6bwozo3828wslwccv8yojthibl78p2cp4of7w0pgpgfif9kxa9hgd5pajveudxoytnuqmk7nwk2398qtdp6giindp8q1ao8tbebth9p9jyntc2rbcf4y4apeuy0xxx3lkx57q1k7lfual5zarw2b55h0b6t9ap6wvdxbrongqemg5w4dfms468krxd17uri42h207axi7f229a675ijbodqin0rh3x2ps1a07e0u8fle03axc1dbpd7wmmj1xj70mdj6eolki7v7',
                proxyHost: 'bowxdl01uwu8ysyq1vk75gkcywfdyp98oxukm7ne9h4nu6y89cpqymvwigp0',
                proxyPort: 9118986771,
                destination: '5e1cnfoa0u4xmxl2se2clxt1hwfj7bkastd90fyb1nso2m3wpz20550ncgspm7m3zavc5v8zttoznz3dkk5n5rlgsoy6qsw1abwksrc4yfujgobbrj36vp5chxqahyf6qfwzu06euv882c3r4lustr2ye49h44eb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z5sldjdk5wher14wnsv205gd9hq98j06vyp9w3u37v9mezmu6plcywx4id2m88tlbp0ps4nyo5xrmu7l9gs9vayjdpx6am4zmn07aly2vroa7szwg0u73ody0drww47prwdqoyucj50ipujyxp3p7vxf5cssklyw',
                responsibleUserAccountName: 'gbl4f73zmlh9pz28s7o9',
                lastChangeUserAccount: 'sec0h1mtvhatq1o8qztu',
                lastChangedAt: '2020-07-21 19:45:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'xzfagxajtjb1pjlw1itk2xigow8j6t6dlf6cd2mc09ddrjhd9pthiow6gkvjqpwp8q247wu3mhjw05t3wcx64qgyesr8ce400xtinwb2382569uq22pksthd7oge26jdssn9gv0lqn9ltqzsj4l89w4uvpc7dyh3',
                component: 'mpsz744697h07nuiy59zyr0odhp7fzjvqgcuqniurw467q0gjnxelsyvc0apekael4u9tyvqk4ga0kxum9cx6niyesfnvd72jo8xsngtittf42orusr2zrlly1aj31l3u44sq4usapxs60v9mqk0l64rh9ihc4fd',
                name: 'cvafja6yltpbtcr9fg90xgz96c04q0ro5udq260hi1aj21n19klvk6fr4seaoqtusi3ep43o9i3jqveayq1fbw6u0we6fexjrnf74g4ge1k5xxml4nvb6jpp6uk21fz62hbi4yu7z8hkuzojqf25q51zvc3xe52w',
                flowParty: 'w7t29nol5ymdxjdxu2f3u8m4e7wdh4h9vo75tozdao6tfa8xqjdutqibh1oqre5oqk2r1zn1b3iu1tfwl8rgooznbbxxw0ptfuuop02emeo9l7yviii3q6njkmzh9awueou3s6gdrjehjapi4bk832nkhpdex85g',
                flowComponent: '9y8qcjauvyg53d99lqltfb1n7rjqhjnzfha76gynh005td6qdt6lwo5hkdtdhoehiwwn1vl5ezgeqz9j9ndyjynv9ynmll2636wh6q0o6o5blmskb5hd71znedmzijcz8b2f372d4ed3un1949wcun8c3wwa3x7c',
                flowInterfaceName: 'znxcx3yi3m6o6s00n9szrq42vgmbgn789rdyuopekx6kmqrrmc422eor7q9ghsta1n5gdzzxifxs5usld6pu7et0elkrxyde8vf7nklzdt7mlegxdig8bkdvbhisuhw5z7fy0l7hdhu0k9ai8fxiajfzhgq3yduv',
                flowInterfaceNamespace: '7cqgcno9qxlhgds0edyhz72qeuqv7qs12kwlvzjpp5ocqj55jq4x7a7qhzoy79hqcebyotlejnijop00ln8frjd015x2yx3z3xxf6cf85lg2s3qo8t8adlir0jf7b525jabjke34h2134vjw9d4j8agf5cu6js6g',
                adapterType: 'pkcx0ckph9at8oagbik2vazn4o7n4b7fcone3yfeiyxj7z4yftyy45txg661',
                direction: 'SENDER',
                transportProtocol: 'akb5civyemi2xx5r91a4yu7wvwrx0tz9a0gire73fd428qjnsznpwzap8szu',
                messageProtocol: '5y9wmrvct9goeaagtv1ypfikrkj4655w80rqt6uzljdw847yj3fcy7y1rix8',
                adapterEngineName: 'zrxs2vdbs6eu12tg1vedk931kopc6sjndkqg047u7elvvsfpq8nfaxs7e02u3rym4wvudmdd8447f6mcsby3txfamseq9g8vanlz11d0dqkvccbmilc1vdl3ox2zsdlmvxm765vsv6dwh2g0dnvydggvlvfe1jq7',
                url: 'qg3dfkt3kjdj2237iqv5ptofy3atmwfi5wj08hxncrdsnx90wbc0v5hny1qccbv5fjgvqaiy864kz825xdrvgul190yjiy3in5623pmv46zjf3qg521d70tghv0yh4p7o48tujfqwpagwvo1dg5uhjqyloem6w73ymi6oh0kbwknp6iynw4yykjyj37o7s9ukjikj45rvlullbqiywzq2if8tur8y0tik6wodbpcr5psymtsipc19iokkly7gvyfajwxh0slw19k706vpbi69wjzpqke70jie8z63bmhqcxnex9fdqth9upjhj19n4et',
                username: 'xtnkdaqjq5382kjy8g3o02fmktxaqnsb8au6edpqeaoeh765ozwghtxaaomb',
                remoteHost: '01pvh9fkvuc818e17q99ztl8xo8c2lzjuqkk8aux4pxsnpfnqhwvv73oju42go374cr90pa7y391mmnxtt9e3kl2m8p89qc6k2yi5c5yjbh685om8w68qx0d4gfoiskr6j0fujgcthcv3wv5e8nrk1o478twnngyf',
                remotePort: 8641190826,
                directory: '5a1bj6th6sp2crcptkq16lpnwskxb0a1psta1nwv6khujwv0a2p06gh9ww302v7m08k40xtr8pi56j04e0j83vmuzjgp7x0pyw325n2vjitw29sysxo6qwuyuyzemp18cy34ql4vetebfuw2ex0tqfvhr5nrn4jdmjjgdtjvwxc8fsqwqefla2r49btpuuyn2irftl3onhurjlmrdh3lrs5oc1zlx0ydt6cpts00oquhu8ger4tcnfgki093nqoqnatyuecz12pew8xzhioavsjwx1bs9k6f80fymx0gfx7kgftsm058y45nfxs7w1nuozotp3w0omy72eaw6eg1ai2ge7g5dvb3mcfydmo9cbdk4v53j8w802yjo1tg8qj131mdbzqu2gia2s038n13seqt43qftohbb1es80yxc00ax7cjmui153b2pwliqvt1ysfc8nlq6ormel1e6kfs4vilgbccdop2rc8sf4rk6ppdvmd25ehh5b5nymcxrl7w3g7gxp4npeto5zpir6hjzh1q2fufj0m86cst9f7ndhvht7np02zsvkmsedcoaulh67bejm82efc4grp2wlu5ef779a9e36492ufhib2qrfw6odqdkgftsr2sels2jdp9ha4oy9en2vaumiy82qro3ldcxd11dkjcdf1nqd677n55cwy8upg75kvysvgf4qy70up80wdho5uebujlacuvfc00dxpr75wleys56a7t9esp91xpfm3p9o87s47up2aplswk0g7f5xt3u2ssd13kpsxw905ll19ywpi6yw6mfg43ajywdt0uf0b1fgakv4kkt653a2kj7spqy0wwv5jrzpejwqpplmipnmzesn26co2zumnc3xjylitx9b2ve7ea1kxll0994wccf7jdvzdaron7p53jmofa7a0968miaepgsg77rihbdzjhrot0ufvq8hf4slbkw2rq38j08t1vgcyxt04qj70932klnlvfsj0ljrdunpahazfxzqg49djy',
                fileSchema: 'vch9v1gbg5xgo978fwb1a12qvg5ahmr8czx0pspxgy4yuy5ufn62iwiv1rq3chtdiullxwd407vca3djrvh7vslpukmwby19lrtgxlix1k7ierkt5t9q2ycjbcc00hllks0qclcoviwzezbsuyo72zarhcgh5ru39m3kcxlekfginnexg6fy3zfxcm5n2lejnbdh1mqclu2qdk0l2nfnab9y06i27aecpku0fssudahnrn9tc2iexbnwwt4fn47fk67xweaegowqr4wuzsaj6z1h7f3dktkks0gd12mzzpx85678ljuwdm8rbftqseyuhztpn3114cv6tah04mavqu0t7js0a1mnu2bnir8gjnjy463uis4ch4pqdw5n2oe631kdce6l9qmx30mrafia9i2hpy2kmm1wkz6bvkynjqtoofltcy1flbm8ftnt4ef04u73fuqzmwxmsg4yimst8rg8tk5auicdgoo2g8150zg5a2sn2iwlg2gc1dj535glykvy865rr49eh2t8ozt70fs60pf8f979f1c1y6en3k07kx6i6yuxx190z56h7zsbvkfu6c4yl443tr81dlr2aa4phoapa7l2lyj3021i8xg3l27mml0vhvijx8cwlv2dgdh420tw3zffkmscg0415u52tljydtxyloe9v6kd5m6bcczmur8s373ieza3kiebh36t4wqfmbt82jo65gxxve93nexmk0qx2wlcx5eyqhlolodl44gxyf8joxfktemexl0ay4yp0mknggc33f08qepvneh9nql71ziop38cypug8uizin350zuvbsaey3ilgkwpypsfed6u358hlzuzgo0zhwe0qr048sysqlwqpvbymww2yqduc4t40dcirzjxk4nb30n03urp4sdsl0vxd6r9fz6x2v6ohw6xudm06rxvcnigg5sqzudl4tbviwwea31gucre64g99n2t077cs5b219en4ybvl804tzuvxl6z1by0x1d272ntzd0cppai',
                proxyHost: 'uoajvdp3iame2gqrc523h2bt6l7w1oqtyqt8d01da570qf4m32gb6tu0nx74',
                proxyPort: 2157190960,
                destination: 'jqwjnvfkqig3yz326wdj2me9ja0jum3327ydtgiayv3q3fzhcwoysua5yyedm2934casq529a365m2gcptcsq05hibgnjnqx04opy89qtarkecr1svqn57ge5x04skd20mpljmgj2uqaayrxrq8gln3532c76ela',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kj8qi2duvhtirz9r01tvf7millmvx5yp5i7hrgxeban3gla9iufbh7n8gqb6ggw8iu7wrnu6ounyz4zuyalvnek25l25td2bokpgvcbn1o621w4s8a0pvggamrsk5zfxfsoqez3ii9m3b24cpxpprbs9rj9gykdg',
                responsibleUserAccountName: 'cfo8e6c0124to7fr4gc0',
                lastChangeUserAccount: 'k0e0ryyn7unr3mm3ug3q',
                lastChangedAt: '2020-07-21 04:21:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '4cg30hzfmsof7w7beujrcchd2slsc3jnf5rzlpiywi4e4u1z2vlflfjkrsd2073am1mce0aejmwo0g0hla4supf6dl88sxi47qaj5bblg689201ka33g8pf4tig9bem5evmoe995ea34g7pglf5ss5ncvr6s7ykk',
                component: 'tluivfyv5lulbt2k2ok5bvu2lp7iheesm627sj6qkdpvs0ooiskena7fzamosrt48woz7n2584gc0lqv660c9yfidzy9iyzru2xpdm7752r6bfa2b6plep4t1e64p464p3xlxhol6i8sly2948msladvhujwplez',
                name: '7vl4llu963l1jj2n3iwf9c641re1hnhveeotkrfrj147j8zhofxv9evhsgrp90ua1ftq1mjrdltdv8iv5mdazh4fp19bqth9b1u2cy899u0tz00rkh093lcfmwjcmoco3lmo5k18axnea8lhruqn2cij286cy5pz',
                flowParty: 'ir6tkcr9t7sgjr74yc96d4f1ilzyi8ewav5xs4bqtmuz0zfd6nrn3hjfkvdpjunhgazwq11txnzy8gio3qnkaw9yhsnx4uormvcokt97x8nr6fd4qwqt961k44acax34l38y3bter8lvbpx2h5d345wzxlg8rmcx',
                flowComponent: 'zrxzzffy2oc4efst9g65n8dipkvoudg4t5konjhv3gt0ff585huwhsxwm0oifjqgpzopgycxnpicsz42p8xpta750q5brgpereytn5xgw04y4zwtaeh95ycg3dex301d5un7cb0zruorio97w3fsoctwwp951jr8',
                flowInterfaceName: '6d1inlns4no30xop9vs4hdugyxsns71wxpk0q1eqrjv31aif2wijz3dwl619auev6adeina42mzu1tk12fby38fmjf7dda3u612ddfdzjvv11lqu4ec477izxerj21tdans14q5uu9c88bh5pnzwdrivxvxxnzmx',
                flowInterfaceNamespace: 'n5eew0c3zafq4po3kint7xcm3ml2qq1azpxif7yoqbixel9e4g8mpmnn5gu4b6u9rn04pi53cngynu0x9ombb3bjhx5hcjyrl0m44jjwsgw9zt53tmr720kzqi4xn7hfs4jo53utszxxnfmsyblydahpwn3otn18',
                adapterType: 'i79z3hvv105pj7sd5vzgr240jwa0rh4j3an013slleookqy70ak83xps5wbt',
                direction: 'RECEIVER',
                transportProtocol: 'y3hgw8k0jyqc8uomqdkblbs1ozw99etsol938l6rwwqrvthh132zvo0ou7e1',
                messageProtocol: 'wf4fr7v05ec9p7ou6uzgralecwn9gpnah2pc704u1wg0s4foiq61bno36io1',
                adapterEngineName: '667ziqauosgtk55ezonw1kaqg21ki5wj5g08jts3q6asi0y14avcgjy6z59jhvefwvjtbortj5io7igpog67qe4k6avnliyz164oiz7na32ggkgev4l61k28e5my90phrjgz026uw1lhla5ptccrqys3jhvspm03',
                url: '1z58ulumnmygx95ry21lov2b31rh5yn3l67xeta25qzjg1aqbiiokcflnbobx7o26onfsr2v2d3yluxh53bv8jgj8of6y0xzf0b3z9fyboru3weslm7shwph7zfnksms38snddjok7ef53ojlo8epkywxljzxckc3t39bvlh1d5kxrsauce3a751ohd69ks15lyb89pzbq8diwycnrcqoez4krga441jy6a3nbodyz87iccweqx3qtkro4y6klgcxmufc5zc5j359f8v7zry9ysxwt7u9f4gkx74blzb4ycxzraeubxfetyg59dyj7dz',
                username: 'wdep2hyz9mtlmqqihulyga5s9poytm8jnhq2z3n1cmjsz0vudhgzupb5cluu',
                remoteHost: 'itopxo5dbvgtdlh0hpl1el4hekkzgjncjpcwcyz137rpl28k5ca4xc7934rhx17lm1n9st9vaup1fg5gq7ysdbel6h9od0nfycsvcls8hrhz9t7lupen3s5toac5m1p7ob0r89ng1ew0layhtiynndw1g0lnqobd',
                remotePort: 70883929672,
                directory: '1di94xvrdloq70fw7694d5ipq47j0fu8acn1md53ohgm70nhyof0gpi7anxqv2b2l2yzg0031kthjbcd3dae3adypjenkx5qmdnlamkil0glxog7xi8sg06akpb70q9zd98uxoze978mwoeubkwj8h3s8scx0zmxvbwb9rz8mfk77acg7gu39bltpqmks8gpqxklhwamayvgo6f3felldb92spo7c0jseccdu3xpnw9pxp0ww4u43yadwh3up5aqjm9h6q1ookud4q3kxblkq1m4v4cfldxfxjlje9j2t0kvkov3s7n9vl9emkfz195oic54d4iocqh4ag3ougxvltmqby76jboqe8nr84b2p43b0t7mbz0aulj5putu3565gnhfsgp47g8te5g8dtsmxyda5qry7c8ix3umloc8g09xcv25cjpyv4nqh4ihyccvylb4u131cnj5skw00j6xl7pp2zi6z9ckedtnhu7lg0two2t415s245q347fe96z69ai5z17fd1s4mmzkihja4rwq6hiu426ubcg6zstnyz063ln9z5a5ha02h947raufep7pftput0ru9go3d5q7lbq64xlipno5oik4mibwxs9fiw27s556ga6v3z185rsncf5mnfbmnl15awzgrsel73hpomkdtq1rcrj042aa0cb13eufncshrpmklj82y1q65qi35455wjpsb13p3wv9azedu4jptlsnt43ett3cgqczt946oa1hvh5ydilwky6yqxxrtzkqxnkznac3j4to17zg1yex8mmothp4pdd9mdhi6ifhmt48c79c5mswnwvhkx7y3gfl1waz6gbdant17tk5d0tedlwkipp5uj3ja8surpb2y5djuw30j7gsz8ir5b1db2j94lqgzkazvxxjehbb3cxusbr0k71jnaea2otyrcssi2fi668b86iw63zus7cp30ll6kp14fqghwb1qjzmlio3pgf4f0j5unrusly8g3ed4sox6xjd6xinigzv',
                fileSchema: '67hjdoq6xth3rsi9z8xtcndpis6kx9rpjzxufl4rdp24bqduw6ueh8vbeyu4y73789pgz1kv6ctao0f9vog7m28o1ojjujstld0bpo863ak2dcnvebfxy4eq7zfyea0w4ieg7ng4ahctls5ypbf4iuhmb8qwc3gxwbd4qvufm7qxl8qxf4tngqbxuison106ng6ixkzy9ky6sbikvhf3g7063xixt8r9i4czn5d50fh1nbc9lg2pk26yg6ceagdm58nmdvw2xx4dnci8k8n67v5a2c7epm2umil79x8vri4w5mizqiu5c1hvx8ujovpy00e1hrv0las6d6s077c75gvjr0j0gomdcouua4psv36s5yvl5t2nkhhfy3s14s5rma3ixw90x0eqw4igqag8smgr380sdheyenur57ac5gstjw8p00nj8h7d36gk1fxq75l6glww9fgmgpv3e0eqppy4mqoyayiijlxinkcaqp9rvj0ps1c3l40wxaw9m000rezfqxxbo9n0hxbq9l3hc1omp7knm5foxzvdkyzwnc7fspic0v6smpqte0jap7f7xzxy3hmw72r0hg1tss7ddb52c8ha1cygez22nbs7cuim715sruzzxpnkr42ft2hibt3g77r8ebxr4wiwhnyhpuxfdhzeedd1wqgncnvdiynw0alb4ktjh1mzb2v09safactxyian2s3nho2eqsotvqayslr21zs9gc0pjjko15uewy9xn4csjxzv25h3s7k8i74fn4ufukfyj3dalzwffpbule53ad7fkbhuq4wmvw5cxedg26v15mcq8k3q8mh0emi6thhxf67zgmgx4avncto4y7cqn4cx9pq4bb5fsjzi4n5uglw7sjdtfqzc72g1ghmiuvz3oxt2k07zzxrxa6ahpl0vx4i3589o8ul9zi20078kyvakeqmwqluigd2kwmv5pc5gfk2v0qkqd382rw99z1unruo209590vuf0so0417sjzc4dn2ukfo78y88',
                proxyHost: '9foxioz8a92rskhyt01gh889pmcse8tkn8xxncx2zsh5gwlxgy1fi6orqmp2',
                proxyPort: 6382975439,
                destination: '2i6b2rwxbgee1ec5j5cw82tmhkuyv6ghbyab5hsr667losjg5h46s0fpp05jj86ys5cz9jxj5i7iag2qd8uha5mwi52nrh8hazw5hay1e6m91qbwct442skh4y6o801c8q3bpvvy4dqwxsiiv1uqcbm2jfzxdl1i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ilqqan2x4bkml7nbpt2a1rgctt5x769fuxss4i9tka9wfriciibdbmsi3c7878ujaufc6kyace4hparb3ptqh7a7npc5nw7q80d3xgcamelenwqrsnjiuv4h976jmsqobqr8f637y7jjww4rbd0ktmgizkhojkay',
                responsibleUserAccountName: 'ifwxbb2tluoh841o1ek9',
                lastChangeUserAccount: '82b064gnz4ahwpluinjo',
                lastChangedAt: '2020-07-22 00:31:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'uwa4fhjdltlbgcqmwshzr3qaz8jt2zkef77zo8c04wsxkv1v122jomw0ew8u32627n953k3hotfjw62bjajjpesjgsj62tr63jdarm2hurx3fa3rg2e0kbhlegmtx6mhozne640iaukxkyjgex073te4b2yrzzj4',
                component: 'il6jxkvv7sn0y9n1sqi84c23szb60czx6ejxx39rtw3rh02a17fuyul5xg9j3kop9ruxxf1ipnwskuz7ajqwboo1166eije0q1s8y3a34289zax06l2rnspp0vizmwob6cy44vsutquojkoz76dfl1ph70w1p58t',
                name: 'jvade94z1q1892micel524hy3li7b0d4yrvhry93ngm4y1i1ucpz89gflmwssxwtzdpc7ua0jo11s220lbdlyia169ord9sg6lq7xqr31v9aus7hm15n0ymfgicxyaf50qty1ixfgu22auxsp2k0losoz1hlvzk3',
                flowParty: '1prgqw4f3ipkwez5eqjodjuzobvo3914fub4kz8fjks8di6a17weueyhnsxx6f2o9l7j7hol4gcjf5xx4buj15n007qpzh6fg0o06uccydsevythxcejdg50ds8kitaw5d114y6ogjzsfkg9nfkjjz8qdf6ci8rg',
                flowComponent: 'fkikppc4qfabbeszxy0v1dssy8l1wwrkrj42kfsq58k5b34wq1obhdlabriuy4zos55du9ysle2w8wlyzgesccf6zy8prmfvpb16f5pbn5dmmbiqc4h75t5aqfr66yr86dhlypsm17gu6lb3c28nydm1mytipmnv',
                flowInterfaceName: 'egzq0qvhfdqsyml1ygej6cihz6jwo6t5sehaer6nydqfktdoshjr813s0v4qu44xqnruc5o1ub7ye93pairmynw0plsyp9e8t4i2peke0pg5sl5ijk6wythj2rpczfq3ocn4prvtywrwnkshyytivlyhlkr20v96',
                flowInterfaceNamespace: 'ri74wtw8b2evaozkotnzxlnac77xpsuce1uai6uvvpelljdhwuzaae6zmzyxzkmkkazqmjyqb2961zvj4yetsnpoa4sc6ylpymp4df4ejrcmytedvu22st8c3bz3p8yda1wf9tfavu2d43i3q58ukv7if3nz706b',
                adapterType: 'yqga6r7rl6qjpb8s9xp1rmnekhpt26k89f2ofjj06vlnj6d7s6pwmxlanne8',
                direction: 'SENDER',
                transportProtocol: 'qcno1kh74pfw0qszw9fuhzktkqa7v9e7ou256mc3fwbpsr38xxgfh9x1b1wx',
                messageProtocol: 'j8znp2xr9b9z2q4vtp8np86kq5hn8v1nljjtpyd9f6wsqzb06pf8ovk9t4pk',
                adapterEngineName: 'ukhmde6hlafdf64c0tf1v57i6tnd5gr4t2ztz0hsaj3gtw20aaqgl3rcs7w9a27qhwr1xu6tcun1nq5liei3w3y2z2r1o70prdru9h91h7hichd6dpi3enoq7r1y45t9m7cucbxd5e2kbf13s31a6q6kt80apmjz',
                url: 'etao0s5n2gtyiukywdl12tsd5regrf4dwzwysmfoadqvkfbayqzdlthj10ai313eruo55fiazgu0xtxok56pi8p36fz0v37jwi7ka0kt4y82n2nhei24sqahtmme1jxl8i6cjybva7gscm0c8wcvd1rr2qwmym6w6nciyl4eu4viic9c1o7l47c8r1rg9ldgtekdjmpj6gbutz9xfqzq2q4z2p8mwih8b44rd8fek0yrqoaekiupi9hv5r827mluxdxkux6581yd9i4exth14jda5fmv6kg5w90j8ek6nluf7hiza7pzwj5suo0jnrjq',
                username: 'tqpaa35q3mtkibl76s9u3e8bc4lz1dpf4qxioi4m3w34guwlu9f5wkr4frz7',
                remoteHost: '2hf0sc1du4fwqs5sdah3tyjiakgo7llqey0cqydsacnuasa1j8mu3t1griuvnc3263rjgy2aa9icnj0bl5gnpr7k56po3igzp16md9nxdylp4vj2kaddqduhbz2aepqqhg3o7yhxwvet8qd14dz0v3i8gdgtnobg',
                remotePort: 4464834733,
                directory: '90qxc46vpm3m9ey2qkb0810kc0rklwdeas8xnz8kw7v4qamyrvatmyfl2rqw3n1dkzt7of28w43r8dift8dbjpdiva5rea2r11oh951j6r90r1v77favys6xxmv10d9qr2ogbib8h5wv2ek9hzuzb7i4w76bc0svwjpvcz2xnk4knfvsh3qp76jisr5r9hzw5jglezeiipj0m14wictk8fnj3f1qd939007zys694v576vxj5klykd6eieuxajl3s3lb3kdcdreoxw6cox0bo71ifz7ymko827rsxyalkoq1vt4a2ezvb6crzteaxjpxheqaw8svcx43e4soyhhv9y9r0muu24phf4xfumo22mvifptqndre6zefj3rkz8100ivm3fkpsikxxmk4o38aau2fpic6jclkrz1yyqg767n9ptdqgl73icks69ebpf3cg246k1afwyxwscm7or88pkxjeteobvekp6tkkqjue5fw68p5xapvjqbfu9ys9c1aswv9lr2j96ws9wibbqi0ru6dan2u38nvfo5elsnlf9mt05myzmqu21e0nbqv2fifhp9mld1ubsty34o1ct5neiivyfd0x3jxlj1znftk3xxeso2ji15wejd25hb1nbhwkgmjivt2g3o0bv5z7ul78fvbux1rx1p9waduhsgrn28184sspplyolj012at9iror3h4htltumep3uhka4hw1rwr5s9i0eixy081f5mwi8grqof00aljoudr784smbx85iyqmpqdfo8ny2yd7x36wlgwtx2jq60rm890gc6kb1gln710ihdpu9uoqem1kx9gxna85bujtilpzphnz1yu6k8aeh8d8ppk17nhzpajlr60c9yzhm9hnfxo418m6qdcj41meqqajxbvpvhxnzpwrzyetagusjhqtdc3s2klmuiu4wvge7b6exh9fy5i38lrvrwgqiww02b9jhf41wjm0xp1cv0108qp4lwclzcxmebhfxhvcq4cpvifti3zrzuiq',
                fileSchema: '2xnjnt2lw56qu0jazv6rtufqonbqotojek75dpnc0t6av662duab4zaai2a1ul552npccemcwpq6sflxadno6mg9vso71rlacw19wgw261oqm0hk0s946q68f8rxehdqik363b8cvs72vixadst9jwod159f0plp6g4j4en8ya5c1rinsuks9zeqetjlkwjf25tfjwx8x8w9ltormys3pxr6v0by27ijkap5ypcyzhczflitn4027v71xq43ob0nkazvvgm7l1ql1nl57yot1lj9lkwsmeu8hah9e7b2rj4qu9in55ymny9bb15087aor46iglsmtesm1m0o2q2iw58kkmb27ndk28xcs5idcupexctz4xulsr2b4f64m22mf6fuh58f0a9blucywv6bk47wcszbid07vnluyb8jdc9uxdod54qfx0gaoozgubw8hp1olimz6o1ihzxveehj68ww46far0194u7fkc91ur5tb14w4be0svxh5dq6nyucypmave1tximkku0fxs0ekr1bbyyyw30h2j2utfeslftacxanu2jaf7khyvisn7rzb8qqp3nn7le2g73b7bi56kliphxjp9ap97on2p6wl85u6z7zaciamzlgtiyq4dnfclv0ru2t0gley72xek8ifn2a3z0tu6z85jdrsy1w8c1onmzt8ldau1magtavld46nydpbtmt4lsju7jo85llf63v9m3wyi2bq7j3xzy7vmz79r5yxxk4j613lgdi51orujk6dkxzvu59kyclla35azauz354read7ubigi02ygqlcz2tw92wjk0wb8f41364afbf1pp9m5b57newj5jz6ui3g2vha7fxoyp5c8z1t7bqyxzwkrisshmh9mzljiex8o181fm53kssnqmrljff0ogcmm43ffkev0x9hs7tsv7e3adrevvod4c86pnkzzu2hzbk5j4hhq3h0u5p6javj6soukwp69yas3v8bjakm60s3g20v8ejcl0iau7hhoy5',
                proxyHost: 'f40k18jhh394qq94gpcptn1gjbz7rl3jsrolht54uoozjk43a3738mztcvny',
                proxyPort: 9832865723,
                destination: 'cx4bi5skpvktmbdhzvsnigy5o54qu2p9mtz9evo8gi5gxow2frck8qnvs5e46x5612am16rqncdubaecxfn56qkxq60a5mh9pwnym8xc085b2q27yv2myut54cv36uiy0sw3utq27iwy7idcgs90793b5kuism71',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'i7x9wulkk237y7clu61r0p9s5dridqzaz7ct9cohs88g29vs7wnuv9h2zf0gnrv4a8janwy58u6naz53oyqbv7pzptoxdspghkp5ts4e3nhke762uzeicw842v6kcv0xsalpxvs2of11ql07e4c46o824i63ryn6',
                responsibleUserAccountName: 'jqk8ordvu18v0a8mxk3h',
                lastChangeUserAccount: 'vzvkhxowpejd9xxdyobo',
                lastChangedAt: '2020-07-21 13:36:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'i7d344v3y1xpnvz1wi2x60wk820enyujfzaxmypltnze95eq6o48sqp2nx7b8h60wofca98oq69fhsc6gz2565hh7b4s7c989xzp9co28e8qzh5cgs0ax0vnxf225xkco2hj0n7zb31ad4t7lcx5amdt37eojzy9',
                component: '09ugb2bjabicr5ausxmed7bfwsjaugdmkqgbbfacecovt5okc1isph3ejqlgtkssdl7x31yziqhonilk30u7pv9em8jo6go6nz4aqlqz965bmma7w0jcz8fk1i90qpp2jjjwz13yt5skewtvbldmufd80t1aonb7',
                name: '2dxt0ze5ex3wnrpghqtzxcjanawzasbnwgiev4v14yqe8aj0lbs6fcp7or5j89yzpaly3hyfpkf5en47hv2pxneqbjhsxuh0q8swg86j902b9rdq78qbr21kjoi0wip8hs9x41mfa1iycqdoxdsd8lmh7re5zj5l',
                flowParty: '0j33itt0h2lzdq68lz6nw6r0htitm4k5wi8scmc3uxvfqe8pae13947re80bkux5b6hz17fhzri0di1s4t9lhmbd6pnaue0jc9l8z8wv7bvdaxktb416h2eh0vl1a7mb2lo4vtvf695v8lxulp4mhfc5wi7r17hh',
                flowComponent: 'e0mn4lkbdsd8suyun3z2kkqe5lydvfg9j2a6j636hctc3xtfbmvpec47u5gy55ttayxhes77ny188mnyzyfthqyg4rjyrf2nwj3ktq4yngwu1k5nkfanpl46e3qvyup6t43ac2rmo7n94hseeny1fl6oq7cmfocn',
                flowInterfaceName: 'jz2givqpc33uwo6f066uj5l8prdk8ium17by5ip6klxgvdabtwv9ive1ylz9n9erd5hooca0g1428l2psfwywgornu8c1bxe9naxethgdny7rrmhc8chxpyxrv2w0n9rtbduygikmwpnui4g5n0a86xjc3tixcfu',
                flowInterfaceNamespace: 'p8la65j4jdnj8jq7x9sfoh6rts3ksngv1xmxebermfwh1k6bq0f5vs5itoohspdt5ue2ihupfilrzuguy0c8pv1ov1fxs10znvb2ggh5ky0j70qh3bn35ywenmbtgwcue9mphuttzwmsr5h9j1tjpmqr2zcvba54',
                adapterType: 'xdcadl8j4y1m7mlk83s7uyxrhps2xztv2bxz5zh2rr2wib1mse4lrqvsli21',
                direction: 'SENDER',
                transportProtocol: 'zzr8ae0srya4rppakjrlixj64i92lpzh6fbucbr8h1tvvfg7z7naisrk58eo',
                messageProtocol: 'ynks9thyx7rs1xvyaxnlm9gzkob63jkrhnnqcmtxamz0w60gg4v2e7oko7x0',
                adapterEngineName: 'ku2zuays47dgf19ejey5bhgx5wo02rdgoc1y7s9brrhgk185tmq3d584zcfxfj0atdalg0gypi9hfao3rjrh6n7r2p5q22gw1cbsu9uufdz8fqgoplv5k02kvfve8qpfrpexipazmlyg38nt2uy4bruv24hg4989',
                url: 'wzyyswm66b5a57wadm7fgl08i0kahe7zx479iqw2qrkdt0gz6eoa09avb28m4x4j35beamvhzg31rbdic1mumprhm1zaycun6olvqyzsjo5v9z3aeelocttectdjrhufhfqhdrste9lwovpa1q77x0rh9ec95o5qw206sw6x0gnnvd2g3pht9zaxpmml6u7a747f7um7d72264ec5if13ae0jbs2k7vwk8phj99wysqc1xlgrsqhnltujj4tgodn9nojsnmwpne4tefq1vyqtbjzyndnh8pbiji2h33oh8yeg2wqhzjw1w4kfjkobevs',
                username: 'zd73gih6ujhe5d31nr0g5ypf87iieiw92xoaoqxcrpbr6ktfj1kop5el4xpl',
                remoteHost: 'pukkqstdw2v2ld77cs11k7uecnk9bajmjpjcptz942n0geqqgft6sryix5ty9mc8i1av880yh2ilgylydgikm4ngrfuktr5d6dompua6ncnrlr8qjsmzencc7xy9g4z3n56dlf18oeffi5lx7kp1bhyph6pqasxn',
                remotePort: 5549733038,
                directory: 'xmtn1644gcgpq6o2li0iioqec0yyxldzdocxb1560yjzgjfx068328iuq4v51nshiu0402h1zva67bal36g4cpclgugya6n402kg358eku20gdglnv7tbaykcumki0mcmje797nxx7cv6q4h7w2g7qgkdqdmhusabk28d4egj7zmc3dyzuszaihx3sz7q7jzs9iyz2utbnjubwk5ibrmu6ziol0wcx3xhbqesps4zaj2ct802iw62g75hngfooag76oe0fuywbo39pj76kdlfiiq2qu7jn4tnkuv5fy60c9fl6g5iig9em7k1ar9z225twp15v2c4wtiznt4azeugnwwzxisoge571m8upgqydh9tcanfs1up6uo8tz1s2spgz198dbxnh4jncvztpxbi3t01hx812xowo5jxiy64wvkqtqi6dlmv2wmf3mnxaotke5ho3ogbghuhxhhskkl1z9sot0oigy51cyvsigbfbcg2se9sf8siidqy8rkt6cc8zlhpq4vsa2w3rwmpwl7elesnervspqfkfvc4ez8hkd0oj7q8of47nlgrdgbgiv71lds66vivs5rfs8hz3nz10o3637uvbtkr0dq4j4bfvwlwmkxz6is4fquioie0xe3n61mujds1qu0p16emkg5uytd0tuiwh99mqbjoyl5r51hmptlofc6jwfk560q6224uz1xziqhjm7u52m70uvxax0tadn35v1g8sqy7cskxxdzmul44kkjk8j8m3ujbdwejsb8c0lld29zogxhagj67g7pk6gfdm96sgzz3ltvx3da6fzw6g17zlitfwjunpriaq2cliqr6z0nu9nb72jkwopjn0gm5ej8yvv0h561lbekhn2ug59ss5nzn95jxh9ugsjhbg4gwd9wdseu9sgxhliwxdvsgax0ciw877uc87j3j2k8sg207ene14p26dfc9pl42p3pha7nmojgy818cux9o8448r495lwh8enhckgsa9d3xqosfg5wsv9ud5u9',
                fileSchema: '7ot8ficytsu17ege32opzryrk3t9it276foqigv2hkfctflpuwnuou5v59u3v9j72wd56l68n0y5dxamzdp4laxyqu9soq6knyoef9df7katajh7hl4nl4u7gft3ueuzip1bnsulbz7t2wkpy35ynofzrl8tzbzgs46df6wqzdsjhqwvgpe3kblykr2j19wxqfhmzrtu6q4rni21sdmt25o3fd69hum6nhldd2i4kt2jdr5lfx776gl3avz2ad73rwmw6944ryvp00zceemyoks1orx14lp28xeq1mbcx4m6xtlnxw7nkj5pnlgvfat6ua06wzsej1rk9ijw7lk7irbjaeo26cswkw60tllpg2glngsoa8i0iqvdf6pjpmlnh4lkdjznsvzlcm2hhhj4m8grrapaxu19oyc6l57hmvj4daonlc9sz6a986yo7vpfmnk5awf7589vz4y74f9263rjyu2qwhmsci29sx4sx6zw2ot7xgewbteu9z9x2erece8bovcgoyv0j4wjaxzve3hun4rg57upjhb04c4gbmscwd8h72094qor9o0clw43ognrubt5ap66c570whuhtjt49xlq6seapon8hkhlj743m6l1u5acuz7t8wm9gn74lnm586p6ymolygvyokusbho3wibcx4gp8fea5d7zu32cniv1h3pktjtry4fya444ch2mhgll89u0yhz5cp2w6d5wnxzzcdrluo590cosk2hvypjwp5y6mp7g5oeqd99dzjtnnvr5j5yvqw7225si2vcylwb5f7monqjiwboe17lplg8mcqcdqqpor6mra3xkle3386a03ilt5nn5qsfycuvcbjlkf0rzralfk04p7783nkdwgn5xbdrf8u0uzcnuiq79gsd2i65ygt3tikod3q4lpa6icuqvmu8ik00bdziytswk8hjttbdy5uoyguxikoeh6ke2rooe7aedsiqbp51qnjetcks6u2rv1n1gl380m2w4y5scvm04dftzxpppv',
                proxyHost: '49p7lkol5fljs157p0vt9yfoawf2m4k7z9mqh5c70rrqyzvq96d6ov8d1xkc',
                proxyPort: 2519782192,
                destination: 'c04vj3i5lec2v7wg9wdqcwh8mx06q56llonf7hdo51qcn3zu6qgupf7bbro3qlnujj94ehjan07dr04pazyl8xk8khnfxx768jn67z80cy3v07fnc9rmhw1as1e23qub1o0psgi1c1261xkodrp3siqmz9pzfjrc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3elr8lq7n3f6n4ilz3m0jvsyoyz04xolrt5vxvvpok9zojclbvnpg914rd9xch7spbtrewdnpxnhna9mxkmvceovvauujai6xb991fvqwndast0s8q4hju1zsl9lu3aacfv7lf8jq2471a9lwmj44rnhw54zvazs',
                responsibleUserAccountName: 'qlncl5ipdgieuxsej9xq',
                lastChangeUserAccount: 'n15zgidmwegjbwsr1rdq',
                lastChangedAt: '2020-07-21 13:58:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'qe8h9biwofwm765i3qgc9mt2056gae9mym3l9fst0fui9uylj71uvqi23l2fw6iv236jz3yslh1wx4tu326kkxvs5xqsyq6islligsc3w3w30ym4jkz16mq46ejqb3b7z3srmt0z1oqaxt272kuiufmtmjhymgtz',
                component: 'of35gi3my8tggozi7nonx75ciwenfzny57lkgbhudpko7gkwrk9w891mw6phzijs9edmqc55bw1eh2b13nrt7ohnhmt0u5rkzylaavlfsbu6l7ag6vrf3nrokm0e5izj71gz1mwglah8i6xd782i22zlkt7ff3rk',
                name: '9orl1gdxinnk0z7yqyg2ptfw3ewvtv7pt7iomb76gdq1cllcmn8dau8biu20ay5ey1mhkbrrz7ey80i8ekrbxhir1aj9b9u6owrqb9bb8c5f8l06s56r0v9pnujrzs1b6uicu8cxo0hozivzarq96ik6qwp708qy',
                flowParty: '1tf8w6lni3a02r1lq8ubjft11nsub9s3yl00v9bu3fb1vfmpkgoo868iy5nku4esrxwwly0d3qbc5pivq5t91cpr7ydzhjer249t8qxg6h5caa25g6mwubmp4q83lpwl9w94uptdxr5vch6yxmc8vh7ls4tbrz1d',
                flowComponent: 'rx35usoo5x3gblrfh94s3kn2uhlc4zae16vordaap3gadbsqeixf7paqrgdn4xunxn8o8adgkemjharmmw0ab30q9un25h2se0cs6vkjygw40vakamwh5zmuvsf6mf4t3grdq8sf5kcmoi8mxg2kc2x60qp0cx2e',
                flowInterfaceName: '0wm2hihomhgxa5rom6pvaaisxphnmxc243o35rc4j49a0hb6l7aehutsjc8miwxi9f42sruydp4u21ebukoqbz3oswe7udb2yj38ftae48wtqdaoflxy8u40995jvqax3xx5erl410fhfqpllktctchvn2504ujx',
                flowInterfaceNamespace: 'nfjp98gircpgomki6evmsg18w5cbuim8x8ww1rw9k6jfqhyjw64iiuhk6y90l1noti65my0z6mlrin9yo4s9bba2uocr7tg49ausp02yja55yie8y52ggw4rqwkgowxh8nuo46idjrx1tf5btj5d815vclkucwe0',
                adapterType: 'j9en66a2d9fga0dk7qkr97io6j67mzd1tn0km36yq0yzyljc0hn5nnk01h6a',
                direction: 'SENDER',
                transportProtocol: 'qddxhw04qmlaweslad7apcjuhchu5almx4oyl4vehhzk0i5nv5if6eil9kxm',
                messageProtocol: 'wfh3wv6z6dfi3eyuvgk6c2xhr2blopf89jjf1j5p7c26z7u7e5j56q9gz3z6',
                adapterEngineName: 'xtm2pnc5m4du1177crmr7l8k3sl3fwrxyjukh7vw3nj1xijn73m7czecze9tlcz9uyyirn81cgxlylacthybn7548ihahgakgtkz9w3iwimpdo0983s7b7xp0269ek8phgg7hk1jw25r0n80w7d7r3whvcqavud4',
                url: 'oed11vh014qot288vy35m3hj48txhbiqve2aeg17dl51w4vgpyqzdgksblt1q76sl32e7iwbtjvzidpbqdcozyzjlpmc2sozdxx420qfkre9y9w8hxcmzw0gvs0zwwug1s815ihp1137tw4jni9uifxrm8au7j8d6a54pw62r7oicp57l33cnhu73vruomhuvz5v8cncgb7j7ij33t4r6ec0k56g6t6m8z23qi9mavgq4pb4llbzbrxt9ihmdw1y3aq0a14xq8dh9yv9e4jjkzndjwfpw7lneqyx1uq2mwsjw77ckpgasg1u872s0t1p',
                username: 'gce7rmzbq05qdm4ygahkh33j5h6npg30q2ofei2pv2a4y9zgsccfj7dypbay',
                remoteHost: '2nbeahs76qbr0sc37e3sukjp2z3b66k8w80rui9pujr280sf1fq0jqeg3woek121cpc95ir4mwuf4g55mkvyin805hnpq7041qbdgp5byfc5mfm3qspmpnnqfdthj5c4i8gjqyjo19b04tj29ljhh0vdeupzd8xb',
                remotePort: 3366691588,
                directory: 'mwuj26zlb7nqm8ypx5q76b8ijhfrl4m9denhrhonn2dk7r1rlfyzwxnv1mlnrp9o9dkulf6dhbbp8no6cdsmtvbfvtq9odo7v5wgmcrq01dvwp1rzhh6dfnbliajcj6mqud34suztzaqbvv6ijuzwpvzxk627irdp66hqs4qlyqhiw98rexq4y9xa1x81mmfrb6u179bcavg3c5ynqa2t2fydhwu1tcowjo4s24y7grbzy32lw7toyz7w9hbf3lc2i5tjz74t7nidtpuli40474bw5yipib9hyyntiqah6rv1ps3o1i3sykekdee7s9dmwdbnpayczhfl5gegu5sslbg4vprcw64ixigcr003rd8dqfw85tugi4o4h4uq9gfnngok9vsk9j0f0iu2lbp771e29cdrv7z9ub42ii1j9eietyihjh1e92ch61qhn7x9lc2s9hupfljp6s9zsqbtd3z0db5n0hxmah1v6b34a6w2bp3z3opm53oj4os28uzn8kl25wbsa1jrrgjup3fntvb18flasz9bhi5q9egnopdfw76xca75ndolfwqbcba81ipvrzlbwkdxeqar5hw1zanuxpjz9xojmnalyfg96crd465aqv3hwlcags8vpprut78t74i1cuyhqlzq6pxhenvauelku9ytcelrccapek91t9dh819jngphrzonpn64d0mefftmlssyobmij7bdxylylx0yall015m1pmo6hg8k6wyx0j9gl7p86pcu8fvb7swc6wqseogmqd96cjrftuffolt84d6xwn0wxg6hhmbb83nwz8m2etwc1gncbh98wut2hix8cejwojnjwf29xjmdu9eo1wew4nhf5okgi45sk8378tqy4hfbeaehypghv52h36hxh2xnuptuokkr3m5z7oafo0w4qla3fk6jc95ivht6xpes4gwd5r38dacgvd6s549t1hvkum630x3kizmtvkkem0th02v2lj6zg5to6wiv2pdwlxci8bcqidm',
                fileSchema: '6ygweh73p79r4oupf84pqbknutlwvcu9h8fu0m0qspmkkulluybdpavuiq8b4yu12nj88bbbykb3g8gynldt8ide8ro80tai7df2b8vu6t3kpd1s1lrqduk6kdw5yavvj8d4e0i5ogc6gdse9gv43vo4f2lp18ym11bwb6tojh1kbadwjwuvv1v7q1hbz6ahcd1z9bbqajhldb6mrqo4n1x34rtjdr0i7mtu2m7cqn8a8gqg2vmvwm8dqz0jo6jealu1ml5rg2avu2u8es2471dq16qv2qfoxwidtd7ulbw6vjn129s8fp2iaht4fjd5wv2xk4onwwcyk2cxs0enupk6671zmt2h59qc4vt5k91ym4bebjf9mff2tsx66aogqsmx3bcw3tsjpqkou7yc3u0nyek32jo833ahq3vmysd66v5m9nc2r2yonwxrx5y54j9thtp281v2io1cdlxflt1w20o8uhsb9xajoz0muziyhpv3w8g209vjkupmj5yz8bzgo3tier1on76b4bt59da6jj21srwhmu184391yvr5fq43o2b8qawt97uv3vo2essz0p9pis9nlo9o7nw7hry70vfgle4qc9v2jv0z8psszhxs7r0okhduc4nf1dkfv84v7xdx1nwhu6r8bocagwecg5q3jfdy109i77wcyv3wxnvcj3v0y744v7zp2qxntmij8c7l06vggv7b86pgxuhl5atczsthx46xqbxg66314pbos5gl7ph5qu74nimfbcngkt5k0qqeglhe276ket5mtp4437kfn4ennys3hf5qkf4wk5lvoqq4igidnk3ka2z8q7tnm7ix5anrsq9gyfmuk8bxz1xvr6nkd0waipr3fq8ih1wcnjhg7gn2mj4qewggbxz9usbsbtouxt4e8b374by0a6yscoohydv34gf3wc1lki9bz3rc36nbnfwgbbeaudy212bf3rcq1sjb3cayczw78rulm24sy6yj6cmq6py355o2a1him4veqdn6',
                proxyHost: 'yy643fpjsoqr4wct6h91kqrmmb68v1sjqwz5bod33yl3owijn0mp8ngqstmz1',
                proxyPort: 4322189697,
                destination: '2cu4sfqvuuhm09vwnem15bh5u04xk9vms1gsxpe8tx950flakfwnl0nxm29n5ll184jgo9bd0toltxn6p0cgu5u5cr36smt3sqj13fhkcv0vrhif9835spy38w6z4mduoma48d7u45w7h6vp5gu9512oz15km80h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1kl4wt1n122h47vhxux8nnh36sxi1eg7rdz94wir28jgog1zcqsbq5sr21406qljhzd9fvj445w752wh2gu5uyy6i78n1r7rhiu2eqzw0qbgv2uqo5656rjb1fnefp4rdauj3fscpgzsgq598fbmz9mc8b5gcw1u',
                responsibleUserAccountName: 'felo89kjxi0c3et9fr4c',
                lastChangeUserAccount: '2lmbh9ayt4qhetzzqx86',
                lastChangedAt: '2020-07-21 12:03:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'gf8t135g2hrblltbetpbc6y4u0vyaj1hmfjxg89pyw41adyh4nnvxexr9eh5gh0rqth4s129ibwqx0yz0ardmeqtoqevjze2erla51mrnul0b2fxyqqxaznbwe86omg22qmehw33potrwyjc9nptlvglzxp4mixm',
                component: 'k3hoc6bf9awbgj2xwhdsz7064zdo8muw3a0a5focxgzk3q4k28wmuf4p6klvl0buhprpchn58w89keg9o6eothar83z3uzqurww4odhkrq45f9a3dsjjbo8q67u29g7a65bnkt3b5iylelnaoylcuq0o6nsjw26c',
                name: 'rssp834amcqnprvw8uzskwhb81jdql1ctwab7g867qezzx7pi93auujcvzhya5kseg2v3n3z3z4vca3b89fc6gv9ktb2wu2ucz1tavzp2thuu0zsean0fqs5fddsfoqbt9dyirb9bs6r2vxice9ugbpmhphjbseg',
                flowParty: 'idlvv9sxnpvfngvhi80mfoz80je0khm0wg4gdsfte9ldfq3gbe5ry7lx3drhetj69j89lcaijnezlmv3zymd8yzphjg0aftqcxi43g6noys5r93pdew63jghwxqzxha9gdlgb4krgayc1wx7gg54sg682og80ooz',
                flowComponent: 'fn28zesaev1fg3yj9vmbucqvuo5vcwrsn7d03fhiyhzip22k4oi0fmw6lt0hogqq7ku8mdiiqd0bc37nps09scd0bbsf44lawavzwp2ksnb68v9skvsmo2jmamp0578h6e06jzzfb4q7gmn9x2r8mwwiv5ngz6t7',
                flowInterfaceName: 'kr9d7vyd142vfdrzo25xe5czt7lkcjzwh8qddx287kuzj88phvclu2d2m1whoaq4k0332oi195lp0zo1adt3x8ond8qnzbbne9zdg6l8zsd9neymzys6rgsyr4aqseh08r1l8zb9vgkis55l3vn0mh055r83hbv7',
                flowInterfaceNamespace: '04sc9yjnhowe0ajq1wrn67z5agz8nsb616knjvr9h47dwhhmqy3fc1pqegeb4vpi4vm0onxt8wtu82op4z8lk1nz83qpc9jummfgqnb0nae8jw4gzeq4m8e0fxj5lybz5uqwtp1vbhvek2xf9bi29jctux81hhhy',
                adapterType: 'ynn6hu3ap1j5aqcp6ss5vpy1sel2mh6srbwctgm7w1087kz1y3s3ie6cdi6i',
                direction: 'SENDER',
                transportProtocol: 't75iiha0i70skzft5e92d0xa3t84z54riaihborp0gc3l9z11iph888ezxdr',
                messageProtocol: 'w1s2qy4najledexhhcj57jjzkks3rgoi13mbo9wuk0oxjomgiv7z97a6z04g',
                adapterEngineName: 'k8o2p4qzoxuh3wt855jtg1j5mqwccbzxywild3baz4pjzdtnuh055r2t11klejyqi7mafkqlazctkcdovd8k9vzgpsski5c3cln8pv58217kdii25kvbvupoql76ghkz0lpe7g5d97p1g8vunehk6dds0grk27b9',
                url: 'nontqhk8m0nffbya22r416i72v1t50oal87u91ya3f2s0ro7e82m6raqj30jdfvmuzanp41qe4i2sgi7u16nmub55n30y3q4a1muztwv3c3nzpap3asnf7q6kgkijq1dri9iz3w6b42mbkgvvhq906glk18fv7dfl9yykwc8kst81d33r16zmtqv52y8gzclpyhsk5bg3qx72bqknsxh9dxpy060j37h9xj3vuyfmexi6r9r80obw6jbr4pcsi9hphaw1130k7hpx023x5b99ltwogsqbr7w2mh2frjqkhvx92vrroq48sef9cnhki3u',
                username: '5dru2n70o8k0i6dfppm3g1clq8iqqhegvj1rla7tbd1n9lp8xhnha6corqah',
                remoteHost: 'h0kvst78rqvvikbriyiftrtrqv7bz4cjzcg2qlsrurz1k8pj1jda0g7vqykam3vpg5fd5isdk7hd0ytsn2tjwprq9yfrjf85u23digva5834al8ug45tv4n92o90xp2vfnk9suu93mcfz3631rd6w4gzru5vi6v3',
                remotePort: 6450944418,
                directory: '9nycl0y693l0hyouogs9wpl85uady31fmm1rcjbjgiyo5mxwjwnnselp6b1kuyhp2chw7o6xazx57xn1w6vjxalft32ptee2i244ly3mop5d8wq1k0s2rkm4kdwjupxjfy0h2wcvq3hvyf72k8qnwxmjgszs19e6ictqyjhk43cclix58s9ukrne0jnyryjhn1p6aohn9h84kkwih8jiewvrcftjcvrx87wl86saqdeb2ivdxw5z0p22cz16ar46ur4n77gvbwa3rrvxqptt3p0qzhvqsx4opvwsfazaw2lojlnexkbtylmgie53q9kln1smnueh80ey4byenz640ctfggstbtjidku5z3ylpbmu3r0t4fh2bf2cv4wwasbxlfjlsodfosy8cuze9dyvgp0o8kauxvv22cmgkxqa595d76ub8vooeu1l80fznu4y6sm9x63aooel28rfl6ftfjflowcw0g6yag612i5f5gxhijedghhu0kl8haz5nczw3o9vj5nmkqxltqjen0ynox7av8xpiqlw2jw0gtifn5fgt1yghgj7cadyvc0tok2gvbufxzhofussi8doqb8fyfb47hrzxiibhx8hyj9m5kr6no1kru7zwg0i6twiw4i83qdgd2scfsqosuanc2qsyflkxm4zj7yvkgoxg6s0qp49jexqlywzburgjplai8b5uo4vf0ua3kb5wy54fsva2y1a25v6ipom5hjhl8rsaqix51mmitvsj7z98em67pgplhu6rm0lss5xt8tgv0n216g7avfd7s208kz32kvgz7aza3755a55e8cwn16g7gl9amg941bs4abdx5taccc99bkhme4mf7klg5hmib15t8t7kgiqeh93rcmyoc2rhizlw6s9x6ftqv003t455nkdumfxhjjyy55fcvfmzars9mkoggjt1hndwr251iownq5ew8k29xcoq7x7th35txxq4shc6vu2x87rhw7jdxzzzspnik52yck21y6g4trkr6bf',
                fileSchema: '4dvv2qviov3qr7orebsrlerlmbvj396q03jyibn5s4qz2e452pgsx578m0n9miq4na974cji1stq72mpw3cwxfkyp2if03d9nugh3ppa0w3qp4s0bev8cco0k4te6fcsitcjh3v5nqvfc4jg7k7oz2rjlq0okfrtuc8d47r8a6mh2mrjd0qpzcw5ywzo9bg7xfrpoh9cecdqwrqij3as33ebp986r7oz669m0uytr2lkgh6njya3avy55e6f20k3esb9ipciuskm419hf3tn3ryuluffimolggwr95ow0wch7dbi6i392vv39grng9yj7k02d19jzg2m9b1s7t4j4oc7altnlpcs8pxlbd7cp6bh4o8xh82a2h33v3gpjqd8v3su6y1kxae1003hushtiogu0w10wpeqtb6h3mjz2t1jgjc1r6ib3p9t4wylnic0jv849dmsgcils5y3sg3sh9qlvv7xwx8ow99t6yd5rzy9s7q908ll58fsorm0yyh18e827cdx0s5tw3q7khj0vo3zejsxx2ixxiblovw3uk105aht5p7rd9gp8hroz8ftop1jjpvkyvdumqm405i4viy3lkcph0uary3cu3qu4zr7y2yckvobmiikx8o55mni5kvp9px19wd755z4d8mvl8k89zg661bnj8ccnwd7i4atfh4tu5nxjjwzqu0lcb6yohlpw55k0i8x3fpmrrhurn4k31167h87ika4nxo3rw83snh95z0ym4vigyw3f4yku7fbcxvlp3ehkpmfrik42qvmng5qdjtwo4fdkk1c0uqukjj000k6ditiro9m7ocaw5gp1my9zxw7nd21v00g2edbm79ww6fef38wp0mh5oild1fgq4lmxybje2mn0pstlzcpe6b6a6i31axriejl0etjs66nf5q6qkkgol7vilrolevy3h6zo1ermx1tr7brtnsj0cal69517iqak8i70n3m9v8gm24cl9dy20dyy61s5p1zibqqcyxrhqn7g4qf',
                proxyHost: '3cwso44btkwreembvd36zpv585l2ifrx65hsi8e7ig0nggkhep73e9xulmt1',
                proxyPort: 70666481673,
                destination: 'cj0vb8h65zmlak49l68vk8jjei7k25bflmco1ofzg3x8pmn93cmqtoxfucuiktdo7uam7d7ly6yzoksew5825p3qnvdmae8rut3kttg6fz4h94q8cf3dvxxwvlhbpbsdiyz5c0i3lja4q9grr6z5flmr6m8kcg2i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wg1n4q780igsq7j2ap6ibg3tkzvtyyywkix8d9f86elbcif0x9qwmnjy899vuf0804bgkrdcc5bfwbl508b7wtlw45wrd6jt0k25t83g0an0b8f9xyx02hp9zt0jqn1ago05ho794mqrglgwcdx3p1kl919okela',
                responsibleUserAccountName: 'zgnjmytqxm3ks8ylrk07',
                lastChangeUserAccount: 'cpr32d11gwiztrd3j4d2',
                lastChangedAt: '2020-07-21 04:30:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'h7qor04qrfnj7pujiwn7plr5jqo8olrapjlpy7qmzm86t18z0j473nufsjmj20iubsnajd6da6cvnch3tsy58ics85p0ret6yharyipifkq0cpap4jpay6b9m9cdlrsk4l3foxwe1a9snu6ikzjjazb2pjw7b1ra',
                component: '9bqnklk31hgfht07jh2q3inaywv1zabjcbcw8prwny5fz8a5snjtlsmn3sq1azpsom6cdeli72y2c2kjb1qd3yfsxgbcgb28bthdkeqpcuvytdbpyfnsjgo194fmysbfabk75f7db3316dulnjwyrd6dxgunp15r',
                name: 'oh6hd6o2s5z86abnmx8sthatby5nopocaqdnscmnrqfarcg8lqyk3jst9oxmhpi7vvn00yhvqbbrfwp9m7c7f2jnjxia3qir81rw90y38vps7u10ph0g45bfrb9sudjonga093al38themb86r2v7ori34anx2wv',
                flowParty: '1i0x6bw80nh25u1z4gj2340cg9c82sc400sczptx46xfmb9nengn2iq6go1rdct7yhepzjzui6ianrhxcunz69ebs1btvm606tvgim3tq1dz4qr6hjh2e7qjtd4z2soyxwehza9wjzm794abjyi6az4gvpacxxbv',
                flowComponent: 'fdbjnbqp2qco78va88zwnm9wkttpjhetk9kigj2oogeh7bv56cmjlhoieieohl688plfffljrnd9u2nwm8lv1d8s29f21q1jjb4pqqbjf13uvsvhrn1e66jquzq73xcyi1n8hn0dp62re8q2dpy58av93mj7spck',
                flowInterfaceName: 'vatje1v4pi450aclg4gdrzraooopzz9dg0mhz8yw0wxspjnxbkconz2wlkgcp8kqw990gg1016sbh4mi5im2spzulv911nqolzkkeu4sm3s3ioj67gcjw7gl9kftntmj8llg9opwn73bfcfo858wptfxsipoymu5',
                flowInterfaceNamespace: 'g7stzk79nqq3l6dloclcv4oh14s1nnjmqy6lt4x32wskjaaezbq5kdhpdni9e4m2bquwtkqxmb922ckzewl9ausbze9svf4cce3hbqbnpb5a4lsttbes0d1sc7boxmirs1ps0rwdhu7merp4kepj17pei8vcsekz',
                adapterType: 'ieyzdjee7ps8uso3p8g0h38tqmuwpyeejidp0etgckdbe3hto5ade3mo9lfh',
                direction: 'RECEIVER',
                transportProtocol: 'bfifpwrs0eqh7wsgo5hd2ko1dscgj7m9idk050rwm7kfwqguka7fxu72uion',
                messageProtocol: '50vogtcnt827fv4uru0o55dhwp3zwf9gx4ql0cw18ab6os0o6flhs8xlqts7',
                adapterEngineName: '0928h2ff6x7s4n9gy9s556o67hyuooc67112v7kuezx91q6nk5ee5s87h6ftl5ibx5hwp3n2ek71oxdo2wvd5mezl9l6ll4sovv5xj0y9phghz5qcdh07y8abjhgyfbcms7wabw4sjkm6dhhxb7eh94q8v4ntz60',
                url: 'k45hp9lq71pd3qo8qvwz4wyuwsj4ybsxi2ufk66y6dhsprubzxlyp17lt6j6240gh5asnxy6e9fbaebnl40m0tby3nsdu570sgtn0ndofd06gy6iscrbo95tcfqlfwe7arwbhejeb1mtazdo37cns15we909nedaoclsdglnojiafeopoh1a1k8z0qetk70tvwna5v3bdnqf2jkuzizq2qu9lbawufgsrsvu3pdy4uwb8wcu6tszoip5iqf7vyppnc986ojnbqetguwdj42fiexrc8lajlv9xfnc1l3wjr38w9iyujoz6w959nbt6wq4',
                username: 'rt6azfq76nauuqvhai34tf3fv51o0yuhl3hhkhnu0dk8vrif1on0sts0twx0',
                remoteHost: '0c26o71v37z4y046w9miltj305jyzk4hr627sbrk0fcw9ewo1fzhtvhdn5r48eob8g9nmmhsgvprpio5nam35ojkhffzymd00djxsh3bx5l45j23929jpi5rfea3vts8hxtu55br3hwynr7w7sq5fldpadscat25',
                remotePort: 5495646426,
                directory: 'b3huev3dj823z7gap87vo3gxjpxpfat7e4oj19v33xzxb2p47ci1sdc3f7uxd0bbybh58pw8zlmye43268gddugcz3kbpw65h14lhp6j8e2nc7bdri8jmpq0kp0g0f3pyscvae22r6xe6z3rmzfmo7m3hvj26t1lzgvb0qjewl4rjowgbmb5k6hrxgxn2qcwswu2ndv1uu8w5q07br4qkm5285y3u9615wklgaz00kb4u9f9togl01e1hxn99p6rkj5tm0eb7kxqkohlfx3ca18egacsqaclbp8jzk08tb67lz6z4a6h3ppdbsmx68pc34in8rr33h2pqal7wz1m5a3o3w43yrb9ct6l43mjbpzi6gu5luckxuiufiq14l52vhyo919fxshr4gxih542glnm675a47zgm11ryarf1hvlh9vh1ern7rakf1lnuys6xd8yaokjvfmg0kfx1rr8fw9ol5bm0vv9vmz3arxa5um4u6cbhftoxcneeufe4ru7aj5z0zwelpa820r1f77ovctdpmy44fu0flc6zdvffl3qgk53ynxwmr7vld95ioh8jj0vbde70c3j9vnht8aduafm1jtzj7c7jzwwqq51kk1tv2nplow5twy01ns7tsh6ze5bylxqlyhfdtyrh29gicc4x0xizrgcuwxx50ia9fr0gs0rq1zub32ipte8u9i5yxokph2jsvp1jb5g3yacnujkaz2ykniw5cfxk50c0frfsqbs243krpxp9qzel53zzcdqkhpaxb02th3ppkr0qbysvie9673ipwmcy03ntit3zbyy514fwgo7r3slrlboga2de7jfoy38yqwfinvxoowukw6hzaw80t2lkkeydvykfcqe6tyohli51aja8ugxpemed9n1v7e24ao2jwpbiitjkosfi6t5qcs1kj1yfblzalcs9p6uwqkdmqq96to8puvxdtaxrq8yaxa9b1xh12rd3ubn2xlvewl8jta0rx03mqhmppxne0l61de8f3tn',
                fileSchema: '1hkok64bx5r3yg7une06tovsqm7f1bub7enmybh4joc4c5190gmqc4nsdvf5lddbn4u3z7cvk0jff7pjm6h2hs5aveuhf1yqkil9xtd4ovck6m20z6mvp80hm0nmil6vk7b3xm2mdw2c6atv6rbd0niv5xhona0vhazqq1v7wi6my0sprlmt0b3effr4r22tudwnn4vqv09hozqa8b81ynqhl81vo8nokg1rcg9rhfd3a5kyszk7dtucer8umofmxisjv3zpnr7qba4eikc1ibcyugcs1gi4vm6f4ryxri9kzh171nb9kzpznl47q2y6qnqffu1g3gtkpu45ecxjgdt8hsliy4ma97cru5jt83zlkayv9u33f67nx07u0083f3spnas4tixk17nlr08onp0b4xlu2hcwbvihh7t2zgubzs11ygru2rsgayfn4zcr3o2g0c78jopa6wvrfnsf2pr58a1o87zptu7ogwz60lz1pyut6lshdk4ula44zn85tv44o0fssvbcvwm0ef67eoay304d7hjosxtrzrf2aecy3gqz9sk0dyfbdo2sw8gkystq5eueyryqil7tuf1s8wgjnwfkhz0h5iv5amva55ietalymjyo010z3b2ckojzqddtyiw1nwaixcllbnwrbs4syk552h4gvn36i9l5481z54qamcg4wkb0o82or2g7hlxa6wxkc39a0ei0va966gt2ehavwu8z2iey2e0kv69u1odgfv5kg5h9kcp3g0vki04xw120vu2mb4vmdtrlid6e4g8u90swxmrefwni39tuu0rnekhakj08ddqub5gxofjg1hswp8welhrsud1f0r87d9bysnf16s7a8vgia80l237lfh9mguq1k7nfqfkv6gj60jgtfzoibodz65dghl9q9bvbwilq9vpltbx7j5w22vl71tit7rvb34z48tbd7syx85fo8btparu1swe5zp85hc7a2rkf7wa1ejzms4tc5cekbvwg2eoq0t8s996c',
                proxyHost: 'qfdn008x8pfm4n2vw3u1de5pzdf1mi7u5bvlizqjdsvyxtfhao4qau15taha',
                proxyPort: 8486366629,
                destination: 'c6u3qxib1kqhljr73jp8cqlu5xamp625x87uzq09r08gfmaxn8c5mzcywoewbdd9wq8tmx4afher8zw9v2279rgmj9i4wp2t92dht3buzlrz0268bqx51lad0segdeaf15q2dcvy9philfamw1ti6j5h8l4ldvk0t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l5pyl8pk88xig5w54qbjnqu5dwkxuxurj4d7zqhuolrew3azmnm141dts3azmag1gp2sm6bif2a8sh7qgkfw64zb3xesgcdiw4fue9cn1fdinjuc1fagcd4a0hc87w3xnqmp1rnvs9ip76359ova4h9gsorqbroo',
                responsibleUserAccountName: 'wteedxpbl5l89710cyb8',
                lastChangeUserAccount: 'hhdk8ya3cysk8urn9kwa',
                lastChangedAt: '2020-07-21 12:01:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'z4cxy7qsj9h0run72luwocg82jaq7bm6tnye48xqayygqvw7q54fsmtzmqdvg24jtqv9dc26oarrks3lfmpg6yab9jro4ky6gauabcmndpfaq29cfggr0dk2fvgmej1hfcv0x4aojyzfs1tvbto6vdxjnlxfe9h8',
                component: 'lr1uqrpbl0bhbisrbdgds1r1r8rx8j94xuhvi1q8fb9dj77a8kngkvcid68ixa3bicywsfufuj8t6vhf8j4saeyzbzxdut2our0moqufbr0ai79r5hg8adpgjtrvcbecs1djvyi6f9bjzwer9udm11l1px28mdet',
                name: '9kfvgmwinka48oe8zrb8n7po7tv39qn2sbrt744i2uhqnf3t8obb7nwycrj5eahd671zd06cse702uyb2kqrg0chox3exp6a9vpgukuh7ldfq3059h24u5c56yn3r2sq7pb8yqr3coissvqb5uwbpy8zcc78isu8',
                flowParty: '7tdx85dexmgmrrqn00qjzt4r3hx83he7mgshuzkcspzbccpbrtzthhoj69e5r3ht44ms8rp87rwhipcdmluzpyv6kc0966iczjoe52mwuptnwy25ih15wtirycy4qztn81nms9x71eg24ntkyxkst5p2gs3q4q88',
                flowComponent: 'vvs8gcm69vfmejb3bz0tfzx7brom50j8q8fzpjrbfqlyalkoqdc51jz06ssnxdfm0une7b37hshhngl6dzaexv1gzdkuei6r3o5o4tn484x4uyhkkyieioby5ge1xrh9qyn2o7gwdpslvwz9an4b5u8lawslh8xb',
                flowInterfaceName: '3o2qibxuprsgjlfun65ucc0oln4tofisezca0hbh0k6jsx5ibbag9hrrumyj02d5yg7lm68rq38w0qeu1e64n9biael43tk01lu0gbt8tfg3xj5uxh8h372lq8znglp6nz3s8ubqfajzehh2ibsemezbgn7rbbkl',
                flowInterfaceNamespace: 'vyrbk8tvrbwb4a3vun0zhwboi104lc88mucbgme4aoickq5z5ngi3yhpei36cso7xljggt3y39f51mv2fh2rnbksa0pb3h3vcgb3iz5mpiynh9lntyyqqsgsf5cbo36b98ksujw7w5e9s2ivwilavs9fxxan6tje',
                adapterType: '3cxt68wxs14dwin8vn325p9jknyppldm7wb1ykluhkz47qglih9s5jptf3tf',
                direction: 'RECEIVER',
                transportProtocol: '3pdxgk3ftx1c13wguugqkgja9hs6kk58jx7mw37s03xrtwhuube5tj40fupk',
                messageProtocol: 'nd5b06f501bsperigas8xcv4pk16zth7bom1l7tq0ogyt4w21xkxewpvqrcv',
                adapterEngineName: 'muj2u7zs6mujsoiy699urg6u4e1fppc0fs7x9ugxki9xdf6l31ydwr1fs8h9asshttjrangsogi1vjh7k6x7y13qypmairc1y9zciopnzabzucy7rte0mrei9oru2td6v1ojdvmna55110ltsgcmllizgh0okbko',
                url: 'ydunvh7xzrrt1onwvahvii1eb6k53nqnz5bw419w9ei3f6xkx7d5fqo74kwjr46dpeuwip4gb6osf3724owo7m398n340j7aah50ldh2x99f3zyrqflc5wd9dba86f9ylwjr8z51g2af68mp0hst7obw8pa0nmxhdx51hcvwqt2d74b7htjw4iih7i13o3iionqgsyama7g3ucvyv54nu2w1f2izc5k8mssi86gpy2ksv8rxz5fqqzjahjxurxzjnv72qcan2pkkr9yludkynnie6ovy5alejde38qvwabiosh7s25pbj7mzw4fv1jih',
                username: 'tn2l66yuezzxclap312j75wxcsl529c37ukm22hba5kke3nuczpz9oryzpwr',
                remoteHost: 'pcx5kesb1cfss4jbalo88iepr0ktddf3nxy5ox5unoj6fvbkcbaafqkaeu64ioh8d9weq19exh0en53eelm4nzp8duj10w2bga6gtbon5zkayasa7syt67ipb3uo870rmvo7zcjqnlx0id5zlnntysz02g4v5jwg',
                remotePort: 7245487876,
                directory: 'tgxtm5cwhdsr9s6s7vsm6rg4qztx48k7yt5f84pxbwjv702c4gusgw2qc6wm2oicezxtj77onhy8wng6rlxjig8wfrb7bjnp1laehfmakbwkqs6iphkybmztkad74x8djqhh0tsr9ce3wxvxmhof1hnziqgbo41eo2h9pvfu904yvsitrscsei70pbt6zqkksi6sv8xsk5dtz5rj7kc5bnnvn61ty1k58y9hqj11eeip1tmzhaodoo4m73x6cnu7z75nesh8564ufbj8mbkc6azsj0nzcciu6ua1vdyvu24xrlpzfn00xlrt66oepisdd9okz1t98xie72e90celd61moktpll0fberna4jpyx81wb6wrouc4g969ivcfpupyc8r0pmvi6fhmqfyof0ryo2qdnw9sdhhdzei4acl0a1rxgs0515pzaew2rol822mlnrgqn2japcrk7xvcocvcbj73jx09meaoehtvxqbb9gwy6od0zv6i713egelu87z0ncjxfvottwjdh9k6swni0cabj40h5ud1rtzr99ldjvzqe2chfv8fm7fd4ma0v76nqvmhjxdkbybty9sy2cvx08w6zz42k3gnjm8la1f1dbnsv4d2rvr4r0u64c0tnnucfe8dmkyxso1t69ekmqk4ipd4tmyss82eqyefdlk0xlse4krfxoimqevyhcha529kli8zzaxxpefjn6y76niuj2klcu9ys02mems4prgpfk057clw88lc3iv94j80u22dyw6mogci7i10f5nchioazqkxub2dwalclltvhe5bqzl6pfo1acsv3ttotj6okyuheovmt44vc2lyvt027a8d1fx0skrjpkqnf30icpakqw7gf0utrb3ibmgcca1ww4wxbve6lceb23fmaroacsa9mysyrf1vq0leey1z1iqx76zcbj8n8g35rrpaefc73pe09swurdp04m43qgdldxq52d2op4m29ogugsdcjcskvjxmc7890iz0ibc74paapbo',
                fileSchema: 'gr4v7lv4dwj19norygaapx5rajj2euvajd3t7x9926fn6gcl9ueztbflg48zbpmld90gj9l07vgq0a7o1k6nqeeq64eox57n7sjjk8imixqwm63v4zvx0q1yctjwmsme1iet0c3c47srstthdjh2qosvpvpej9apu5kbhcptls5fe54gmevlsksx79todaxp2khm7ox3oxwdv58ufdfytfr38r6mehxio2zxszugcs2z6f61r1fgw2lj68uovay5z3ulpb8txdovi7vlgnt6cl24d3gjnvzjqng2ainrgso68ji8g2y9xluerta821ua9voen1ju43csv2aj7fztnb6r8mdz8vxr3rsspxdk9e9icnmzp7c9ziq1ipa4u5qew2ndc67rlyhv9t9ysexl22isti8qcik0tiz736p9dhfispftd2rxgz9gpvn8by1pbyq8me9syio8a72iy21yegyxpukcyvmm6b6ssbtplkbljhnac9wielcjhxudrtfs0u6gnbnlrv61j3ljsz51bftbhil9db58jsxp9trfg8iihb4wfzae66immt2tmhaj8w444axp3sa3rm1f22d9vnerpzxoikpmtjbxbnk6pedzgedk9gki1fqpuim6pqp8ge5kssl4sryla0b6yl8n47xpfv7c4m24xdpnpuoza9rhv6m7fhc8ljcw5ysb6zaw0csaol3d3f29toz1h8kwvla3vkryidm000agti98y7ut0lzgg8756no0re99ae2w2codbaz0wv5qfdlios76zqgqzhpxvej1a71kbmfi5zdop6psh12ct8h6wepht2q9r5cp1ofouawodqyh5qnmuuubihnx9we7a0ztq4xtbxf0z714l0hcu8wxgyhqjuwpmyqq7uwdxrv5klj2mbttswlb6da0cvvtnls67jz9gnbqa03aj2dta7fx75vc0ic16t3law94wcrt46y27fef11k3szjol2llmzq6vv09uoe0ohsahdc1kh7axxbouy97',
                proxyHost: '1iwn0291f9gq5ym9v3q4ek1sgbqx47dy2f0a7t0j3u6v905kgwem9oac6my7',
                proxyPort: 8558691095,
                destination: 'dhayb3j2mk1dq6vjkqbnzuznoxf6uviexdh5uiocgx46lwplfdszrrl0998s87qj261nbohnnuiopwa8ltu4eego9d6cpo3yd5lygqh3b7akpljrmd6xsvagxv16xvcs9n4tnltomivtxnntvs8iqixtkpls1xwg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j11j5kod638la0q1i7bni6ss78cnzgehbc96bv1lif9fhuz4kw66s0gp5wc1sbih3l1ehgukhfmj3m7drws4iae6edeafnedudgp4zf9mxbtban09bnfjdtfnpxxceymnujy7dybluca7nmhiscdffrresatmb2kk',
                responsibleUserAccountName: 'owc93ohdpqqwayznojnb',
                lastChangeUserAccount: 'vq9apo3usxxbdrua4qs1',
                lastChangedAt: '2020-07-21 09:12:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '9kmcsc391bgnve9s53gx3hr4n17yj8ygjghi4jibgvoseskjlh5qnyb0x9h13fgh4qv0ptq0ur93k534t6rpz82gpcka87lxtrw3t9wepygpnzk491tmbc8m2rb75lkvb5v9q996vkg25vh12s168on6bz4zg9m0',
                component: 'lnszb42x0ubmmybx1g8vpsbf1hbevp9eyt03s48hcwryoj3uzype5khmcgwd1u85cvyxkzwefhw7g4yjor7ci2cn1cw2j0wx02slna8i8w16zoy95in254zjmagdihxxs8ykndmus9g27gcr754snzb3exldyx5u',
                name: 'escg8y23pfliln04oyc5wmibbvyr6pdhagd6vi7mb5k70lbwvm8hwl0lcw6my1zqctkq9w5gxfy2z2y2cjgr048eurhioioy596qdn243731wkc90tgcsj7i6c8p5bvk8fx8onkbp8abeat4wkvr136mfqninjpu',
                flowParty: '6m7mh3xw274wg4rphl8um0byecd4ci447fc61igmbvfowju936s9uy1bc22yxrxmw0i6x7z032er0zy8n3s4o1l9uv7hen3p7q0hqx33vt1was4wl7sd9uit5kosh6hy4z66x7cyubssbet0x9lim7q01y6miahv',
                flowComponent: 'yfaub4tf2c533zttarqafo43hdvi7ifsvbh8ypueluf71l5iyrzuq3ozi6f126khgylm8b5vc6ad6mtkk0v4j3qkfdb2usznfs38epu23yn3b22wg3hf8u178r070qn3smvefg3g7yfbvh413wslrx9xaae9jubv',
                flowInterfaceName: 'hs9r8k60t68zoi39h84qnh82sg05xdjcfcrdkspza1d7gd9q8pn6fbxxqjtiwjfdyiq1dfe0iwb1n39zw4pti97h3it3mjvcemid0chyjkiulx17aqyjexhza0whhy65jpxdom11h96ft58872lxjddd53t8m3ud',
                flowInterfaceNamespace: 'wtq40wpjzh9b711i3iaddba396uucpikxdk9heh7akssiiwupob93d5ei5t7chzbvy9es0xzaoi0kt4sbclp63zjpu0x7g84g6yybufjhnc74y7l56jzqpspvvzt8gxykemkp3py3qa3tztos4tpl9939ieuqr42',
                adapterType: 'lyfikq0iibop9z2zky9a6do5qudf36269k42qzjerj083djga6oxp1rr01i3',
                direction: 'SENDER',
                transportProtocol: 't1o3io80b6mbgefpmlovzw2worrfapi2hhthltfaqykhbllg12p290lcssdv',
                messageProtocol: 'f0wrmhki12orh4t7ro3asnuh8vdwwlgh07e0nw7kcr6lzddkc36me4r9v8vk',
                adapterEngineName: 'gntltqm2z857zohy6yqkcaywtreo7dtrz6arkgdl9lrb6m97wmb02cri2tqewk5m7330snnfzstmosufq3f3z76muhfc5zijtz4780xgb7n8ias4cvsgwcwra8w2tjeruo05hkpb7a787hcan2pb08949rn0z1az',
                url: 'co2wzkvjl5m95xm1lbbxpr0xflylo5y7ixj2nclp37ygkmfcg251jmt076k84l5uyzp75cxlxtc8e86ezfelnoyof8aesz8c4v9jfd2my0dofrsizo9do7ywybf61xm49k4o8jtfyzqsxdd55oc3nxvmtb3rolhmg9r796tifdxjbq0ad3z06wuaeasngex86e756axbqok856yiie94jlijwsxweteu0ppvw4wbavuh4p4cnui19gjmjqu9csz0w9klnjirc8zjp4cjk7ng2prbc3i8yy95erta3dku01tyzpx9opxwzoum0puy7qz5',
                username: 'snvowttj0uz0f5pjcwd48oltqe7lxk8h0wky1gz0qrgwtr0zw7bv4vqua0x1',
                remoteHost: 'mpi2yo4pl85ernt8tt8wnw3k028t9kdm7rmqi52xwv6s7nsy2ygsh0598oo6stobanl8zv32tph38ebqf30jj29i9ai866wc9on0kxwwf4uanwictzzll2obuj8o78irm8clh3uo87htdt07qusxrsalw33bezjm',
                remotePort: 9868720539,
                directory: 'a1xdlwkx6aplk4bgwax4bluoxol9gpeo4epicd1rv0fnnxm43w1c5cp33j0z99ssqqi8mlcvnz0b8je4w1cfjxjbxqi4mt2p6hty94docv13bergj6ypz8hpnwqrws96cldz8vjlgwggi0bqua626hym37ytcoib1m25u32u2vc7pmxigcp7og84so8a9e0bfqz19hmtqf2m4dnqmrvcotfkfx4p7s35za14bldiuaoj3jrok0r87twpfpezwtj9butqfmwdt8bks2rqgcf6tbz7bw9efwl7xesn95j529x2oq5xrufqs87fejd93tqnrrxpevd50f6vob9m1er9inddskhsgc1x5na6hppwjvc7oc9ai5hspc8p6itlg6c55zjqf2jn2zite7igvocvaq9oyi46cny9c4uicg2ok4xzxu8kpad47qw9u7csd8tboo0vcyejontkl5grt21z7s8djj35ddxuz01rj6wnp0xfbph2lk10w6uslhllhws0wdtg5n2ec2ytwt8sdwc1vgku5iy3dgousjtnh90nvudjlyiicakm74zjftzq9f2zir1gj2blkl8cq8z1sqzktd83bl0ba4t8h8momcw5qn40trba5qwar13mq7k58jgnq54t19tlf562kfuciea4s7adowrk0qviai81aemlkrytqg9ybbhrwl15dwvfef5alisil3mp2l2u7tlyjdlpnuhc54oziszo1xa1mr5lg1nzc7qsnie3qettyxmc6231mk8scen8q7ekm9n9cg7midvwsh365c5kjd7xrxe2uyjhrqn6b91naxo6fcde9gn9q357giebymidhl7a80p1jniuy07lwm4omnemzyfp9dvgnw2o6c2rd2a1z6ck0qudcxl1io6g0a5e45ta38ewsth8ytxruol5o4emohsg8ajis7vtx28nrk4tn6mno8ngm2qabgdjr48hur43vfqnm2zupbvkmgqj3leay6jfx2jjhlf7tjonvj1wxyopt2cl',
                fileSchema: 'foyga4vb6h2cdoq6bkilyqda2fwh4xup9rn8ayqa00k4a6ukslszxhgkhsogo30n2g3rrbrfm5y0g0jjyf3n0lx5cg1rr4c7tncztit6b99ax9fv087ykgo0sjqizeyvb9yd86s2pb8lgbs44hz98mekjqpnbn2myfs6sau77zlgrjoaztt6gk50vi4l1tbywrmjexmdfpcsh46eob4qvjua8qihkcr9al9c2f4y0a08b0u0b5pig9gdw6gkvgsewe5nw5seigba28m4xfvsf3v0lminuijpzl4z6t3tbr3kuw7n96vd317mkydqu8bl0qd6ekwu6c6aj0b1h883zbhwch3qn2eu63vq996psnao7y01c0pvhhjvlgxtnp16v1v0epl4fydc9vxpwj4a7q82wa9tygc7ey2ql4zvh3pj847u42xwcg36gr4t411xfx32id3wo7jlftx44bi9ixa98bluuzv0oqg6esldtq98jrvzsgee243l3xsp4mjms33wleul3rv8526gb5050rw559wbgwhssgekrgn6l64rvyduve2x5ofjclsqf1a90zt4gi1wmo30bo5wgjo0saoc3pinbs5vrscwgy400nqm4kwnfzo2azfds87t6afmad9tuml6oo0ywgjz6mrq95qvz5xenuz76ib14wlfd81ozdsrq6sm7drl1jv63zp4p76b3sj0vke3mut026asyu126d6zs1f3zxm5hkioh5h7ohj9f9gtgb658svcacnaprjw2vlr5yko04w4zwhcwff8rtv95oup8j2te7n1fab6rhk874prqjgu9rf27jwxmyxwlb0ab1yiemhhjt5xd54aaonfe1gnvvxvxspp93nkr1wd1pz9m3aa0b402lzkjfkmfqzqbywyjv8qz5a5vlmtpswyr1xzgh9v0gmxrlbziqeihrvioy5f1xl3uxehcn001fckj0lqg3od99i8a7lnwlhf8je2ovpmdqdewkf52ek74q9ojnerbqapvvzu',
                proxyHost: 'kw07949slq44kkg4pm8izxegooqoswff7d4wbbzqu6zvf0szjlmi9lyfpfm4',
                proxyPort: 6249765823,
                destination: '9q1zzxph958xpmi6eywnsfxp3wfp08qdgz3uneel1c6xibw84jbjr7keoszcniicbaw8hmh0h3fjturc1q7rvkx1f8sfpeqr4ux74sewulhge5g5o0tt8uhohyawhnlqzfjkk2gqu510wdpewpbdkwhmmqnp8gh9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rdtio0m0uy8ot5tz28gnb2zqhihghdlwxznesxtcar0nbjtvcz30cl6hp8rzzg8h6ee8gsdpo89gip2elwv7je54o10uquhkp0n3krf5vmepwtytqnmgq6rl4c2s4njh786pol515d47ftv1f3omv8rgoo00xzd9',
                responsibleUserAccountName: '5w31jcewck8zsiv3fti0i',
                lastChangeUserAccount: '6iwgkyt7zgvh9i1lnfi0',
                lastChangedAt: '2020-07-22 00:40:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '5ixsc35v98fdh9yu1shyjakpqi8zcoyi46eg9ga4z3kdur62kop5usntll4zxsgwq4yh2l3bqljs4e70l05ejg1spnb6uarikj8w88f0j4hap6svub7t7faa8nzwyfludf7njbll4b3w3h3ymymqeabz15b8na6r',
                component: 'hpgqx5ltd90t5s2l3vrones3tqnymuzy02xvbblkggh3ajfo9ef0ng7rvhn1ad9lx6ty5ildomw1vezu6gsfbkacun661p95h4a838w4go7rt76gwwj9aej8kqyp07t72t74cma0awc16lm81ebgv3olz8pifw2r',
                name: '3qhsg2kzlw1nd08iclt2fw54g1q13v5ba4cgtlgdpwchpfmrbk6qg3rl2rtd7fv4iqsoz12h1ux2vb79pfks4pr63rsx5nvi79l5meovaxz5owetuz93zz0f49lt1t6mki7mcrsbtm8uueuxo35alaaurr1dekzl',
                flowParty: 'lo9dyvwe3u59ahy89y9v91sc6rjxbk37mzlh3kwt45l8ebhmvqifatep1xq29e1u4k2r85k4vb0zj3p5m1f1t2cfuy92ss0zdyk85pclftc93ipa9mmceb16bog4wxuhl0g1n2j0khppwbj55x71yy4ko2wxjevu',
                flowComponent: 'bmj6phrp06z72xmh7mftb2ffjbebmcfwrl8y65hwvf5588qvmei9pm7x1xyl8uetf788rsulxfy0kuq0318anc5u7wiro15ztvollqfkf0raw1ts66t41721etcazcehocdh3x3nub9a14tezmb612se3yh2r7pq',
                flowInterfaceName: '125r2axo2a8f2ozt7d443loyhqw7dpdij13gqqrltbv28t60we5u0pt69744ie2gnelndjxqqxfpmire4dglp556ykbcrc8j13vkvo8pjef8r7m9h7p9h4djfy8iz2rcafborx0w53ira8gqdkmh1ubmmphom01h',
                flowInterfaceNamespace: 'd45c2vylo2am28wnsqf0vexk8afqzqe49so3ak43ab7iozo18ze0ohwli77d55yq9kwovr542ydlvoii2i1s3yi0sti95knafpg8uv51uyiv0umifhdfry77x8gsj0jytxck00jeajnth4sc1jrdiko8j5ggkyfm',
                adapterType: 'gqd32ruot9nxybhq1ms4w40e5jo8aj2fnfx8uebb0k4dwg0fgrzx1g337gjy',
                direction: 'RECEIVER',
                transportProtocol: 'xv0gqbktl9w6u14qqs29mfnzx43iok2axk7nccqzg3yay8dsp99uc8cp1n0r',
                messageProtocol: 'dwns95w6d3nrbrzw22xuhnuistko38ktqthujf41epcoyk6lq182xnubtfs9',
                adapterEngineName: '8vk3qa43m7wotppgtnjel2qpdm17x2t6v7xssrwrc7hucaj5p1ihobxlnu71r1uazfkmjazy0cnoygek1hob39dgjuu6ia8wr2t2aa9w4tywm2k1zu9y1yfaqmezzdkl5m6s1ixklu0wbdryp82khy22i7086pi9',
                url: 'psoosjxij5rjdd5kv6xvn8vg3bfnw96ykznns9sdb0nw8e49by1tktsxh8w3d5dhf9i8eopvxp27vhd6ywucuyydpbp667dqm8dt1a9r5p4uv9a18ls0mt8axr845fakaogypeis5rwuotoloac69jc75gyjystxut4uhqc4a30u1tgmlqpfb4zmgsrym98b1qbci5n0xqhubmxhwjca7gz9ykun6bxqij4pzh9k4j0gduaifyqzkfrnhssscmlodgadfvuyucemii9c9nrvvu1ahufxzq6lcyvuyhfro5ddgugiutqma03bgk51zq3d',
                username: 'hdixxoi6eprg0mz7w3ymx674x54gi5s54b1htki22xu1y9q6ah3y1e3g2tx1',
                remoteHost: 'opbhdunlj9e0spad3y4b84j5ruaz1uhdq6a2qx7oz1e39tq5fy3mitlzx6tmwj07t40wtpn53bhnffmy2xdnpvg7n6u4sru4gicmz59s523u1rwyymuu81e2jj5nk5ebji8fyvdavpc6dmwfl0tny9t9s73ajo5w',
                remotePort: 1956829281,
                directory: 'ulsg82mgpslwkbwq387wfjtyzvtnpx0r98uibaots6ofev4xhs3bgycu2i8dy2q6ahs3tipduwy2c0gitz2epcakqm1vylxojg3y48ly7uz9354h6tvqe33fp00fj75zb78030842ael2cf7chu0hez3rug3fihfm2ugf6nm35mlfmb4ldsh6m09gh9g454r4odepn4f9qdciklmmisrx9ombpqj7fsavvg9skvf1ax7v4vz4wez3wgg8qll16h9irbnxsjv3fbdobqhbxv5yuquortuai6j02u6x33rrft71n2exjijwxb2t1kcm43chd49jtcw724974klnqe9tuma4vz8mqbpa55ksm5yl2mienwm0rm2tv33z1ux1mta7zoe8z3sg14t0mwg3qdofbgg7wqdt039ib6t5kwnpyjhl9fsyqansodfemo8r3um0ruszk5ix8tn90rwtu9fp1ztkevoxpeu1ewp9abylfscyefxrqbeyjzkj5cba2r5zk37czssvkzfcujtpw8bd91mfnzfllgt32z0tppq41bjxjvf3l05lpgcpn2rnzdb1vi0lvp7wimfbrksr2u2df2ffx9marts5g56la72tsufoq6i1s0s48eikzgld34s356rnbenutxik3qyhihfk931c045sij377ogn49eu1p3o8rh3x8a3cjgi3ga6n75lthqelrlhjsvrynpd2euske8lx25474h76x9v0deeazpgls2av64uo0bqaw1pj3ud629gzkkc8pxp5ray1fedzdmu5az2hgpa4p8clys0r2ieaezkz168kjgt9sx5abxom68frgsr7rm7wifuggz31eed5lwelxvolqa6n550mbzct6g80in79fyj5krvjorgw5r1toqni711zi4teznuy13mrsvq6o0xt16ddlu4834x3b43wah9xfvjwcogj5hnmpmwh6b8ry8bgceyy9xdcfrlkqx4axmxk3e87pzj4niap1scfjzz10bfjyr3met',
                fileSchema: 'c2lgbb2sawbps09932e6o6u5ybp0gb9dps36bnrmokg19h3aj9qj1357q1kanw6egkktuetwlc1cs044z0khl14f77n4afuih3cxcfxwzfsl2w8yp2yh4mmtowwd934m8mp9q7sfub4iwccccmtkwgxzs8r15p91jlifcwzy3csq2joz05z4do5kc249l1eaixzdhjhp856mgi7a0n9gd0nid6qyol8j5j5iqqi29l1m3p87uaoj78xnlakwk9lbqeh1ubt9ql6btollc0y0psioinhjrba8hokmcqtdwc6eug50pohei7ikg33di39o8v5mifb893nho33d901dt1dkl8ru6y9nfmmvyndpkl49owxbd0o7nxq9i0dz4g964e2tx0wz18xgpftiyq3889pqe1k6hunmjypbi188yzl07zpj4f5m63iafegowpfaust499ut8v8ojhz9ptowkppennafamxb95mw3ws04nww8sz5v8j4onaxcw97jtm4o018ah4qb6quoj46m708sdf6vjmsxlvb41mremzelo5hcqgp5gomdbdfjp5eboplk48i5l7epdt2hrt6yj8ot4eqh11m51wa8bjucccbx9v040dgv4ygs1ct9ci5pjpfem28n8pqi5vtnrbio8bw5bndb94khhpxshwdnwyctgsly99hsefdjjecvu37xzly050i39wiwv6li87bpg17km8v0ri6m8iqhivdl1ew09zelptle5zf99xek3q0aea5mnt1rjnvmrv1d9xn0v4zyrfyphy7u5zlhun481l8bgoa4eyfbu8eyzn08h8k9gk14cp9g3arzdx14u6isqeil17zm2k2vobj1ykg9pxeejfaybzkbckfd6qq3aggw2852mh51f1m71q0hmm3bflwe19cbddwh5lytdgfka62v5bav1tzlsuagy1qr8zdk8n6joatyuqm7kqdgtkvlqq9mz179q8izpcpwvxx4q7y3ak43p68b2gfycusvoeelqfq',
                proxyHost: 'qpy1gsutcaaw48bc56uknxfv4p3qpvt6vzwuklwyafwe492wyu5nkad4h3k6',
                proxyPort: 2192587612,
                destination: 'wrropv6efofabuu225jy2arjzf6sbxbwqoufu3etz4vy3r7vk2o8b8nsrp0bh8lxc30ns90evzoxo9osfq9r9n8p2du8mnogms47xz3uwiavbty7oel6n8patjrtz8fptbm09qryk8vxm0xpw065b0yien2fwbrb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6av6mekotkqpmqgk9ex0oisxwvy1h70n4pej2euwz7u2fl45u4wvuwujdjbf87a62vi73hhzfez9rwj8pnl6pyj6izcoqzmpdpkcgmtwpefscjm2kp3mcqjoy2ibsnp9en82q00g9d5972ropc0uf39l6algyehq',
                responsibleUserAccountName: '4oxrjxo73homjpqxislo',
                lastChangeUserAccount: 'x3zjg8u66g0p597n78slb',
                lastChangedAt: '2020-07-21 16:52:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '8hm4za38mwsmbedrr84c7be1ylrrtgf8vau9aid8u58w3njyof2l9w7xdhgua16adj2vibhschygogc58vjj5y6t90tdi3loyfdo351d17ozhrkpxofhk45yas15jdxuat0t36unbk7w1vy58ijhykerznvl9zby',
                component: 'v1lu7fht613s1h4yzcdcfrzaxcx8il8s9806qtnmbo01rvjh2alehgmojhpzpgegpi2s3iekgrw5krqaqhvtbbwhe9qgwmjm7ta3m5w79x8kd9qrjygrmw0zjtgzfx3tehocm9b2s6jywnkbdpwjjptuewluyj33',
                name: 'jj1kxj80fz64s7o56ak27uww765spuww5yhiet5oepr65mke3puizcqisgo3my8z6fym1m3jmcvftomcvff7htb0hq9edx228a3wdo5ac6jvm518mod1i3qpe2l6uloqt869ss24j0rk4bxcs8raf7haxiohdztd',
                flowParty: 'j9n5fnhgxvhcwi8y3lsiucqtaoggqew0jk9mhii3tu5nfmll3swe1s4nivus7ry4n3pp4yloxqjrugvjsd9ssabgvpm8m78rzxi4r8w1woe14sgfug1i4gm6d2c5h9st33oz79u3t4atyiw0318920a6q2hmfh8q',
                flowComponent: '2waldp6x9m47a4p4rrizupv69iwklwu29snk5mn4za8pdm8oiin7vs4jdaqqqralafi83pnzbsftjscgfp8l3ehyz95i3frqhwp3yx0u2fpd6sf9d3rwvykbicc16na2uh9cvtssklg29pf7ktajs4cijvke6vdv',
                flowInterfaceName: 'hi1x5uo2w4rphch2bc9taf81mwn9j60yfukn53022w50t5i881k0m58jst7stjw190yllvtpshsrcy1nw0ihtx78ppgdmxm0hgyhhbyxcz837kx3bxudzbocmb6vfyuzbq05kn0d69i5kd23o3k7xb71l67wg6ue',
                flowInterfaceNamespace: 'uxlyjl4pvm71bkxod3vt90mgayfmtsrvkcjaql7xkim4u8b68pslehtn3closxdd27wkzlv16y5znjsqzjvjjn17apokyceyu36x5nb6txa5xuejsfmkcdueug9a3n92naiis3vz1ykgt9oeey3uf1w63vfiesua',
                adapterType: '07wsp95b2kamgk094o47z3iytyf5j55i51pv7bebkh2j662ddj2zvxndkp0k',
                direction: 'RECEIVER',
                transportProtocol: '08hc2atsjqbqywzy1hoizhf7j1iknfz4pgu4rxhkc5ti6fkpwslcwe3cn5q4',
                messageProtocol: '4kx75cw2bsqd75mt4r8tr0fj0dsh5ph5iod0x61ys08vs81yc7m67ao93x3p',
                adapterEngineName: 'xpyl2g7cv8s754py5cbf37jrj9u65le6g816jnllgvelgtf03h0eu7otf4orblinh8h68c809fbkboyodeo5rlem2tbd2ni9s6e4a2osydgssl351fvvpnthstklefb4w4plodbxyljn3z37woq7rdq4abpxk5kf',
                url: 'yoycdl1abh0odiuvi8yhfu0in6wfh4ilwr47l5cfz3qd8xcw2tgvy5ki2jigjxto6q8tosske9y64n84yyc9bsqsdq5g0cnlc43978akf8fs9gpdbl7rqyso68jnxzzzzo8nathinol1x1hgpbyga24j1hlikel55fmubq3kc7sh5jm6mgws4vq59p99z2n9o7abj2i0g8cg1tvu0ms1o9b46289x8datu7oaieqix3w2pvbtpbj0p139jkvdodqc8s1l9xc8z6jro47umfcrbrlppm9m79a1td8bro96lmpcztjazdz4mot7rtk9egh',
                username: 'navtjo0yee34d6bnta0if83adzdba3ajz19vjnjg98q8baxgiejhc2mcglpx',
                remoteHost: 'je88yxwkcv0cmm8j3yrojzb178c8p02i2h02u6qhycmhkxek9uzzuqbdm9my0and9w27svgihz5d8h7ytr0a32uv8qgd74ua21qqu1dter89jdg4sivu24objzs7k76fbfn9msloc50s5c96hheq4jg07dil7yzt',
                remotePort: -9,
                directory: 'cqgf6pnnp2cv4e2bbn6psci6p5or3ooirlztlwqrszce36gxa6cyy0kqhgs6emmj5xkpmk19j8y0vv6lclp6fj2he2ecnulgvcyvb4mx3k89ryrsuvfky1nuvww7qse3a30nuyukx13rlnahpz0ckjllt9xfu7rhr1bbvi8m234t2go1f66xn11zppt10cfdxga3rnavkjzm2wq7yke3y2ssagpuhy4tnvtgs6zj2kp8l0izepypdminb7bhsw2ib2ryxtk2u2nmk2yl9k7cczwxhh5n7guokvmzwv0azc85flmks1w14zcd7l67tc9yy72bkrdlda5c7rqrnid8gmhwgjxb907zd00pus9mckxqo1fq9u26z62iupf6fdk5pw2a5nq61g4sjobco4gxeidsgnygu367qff8cj7qtg3s9j4uavqfrg5s4wq7zf0hp0jspuobcm08566z9q4tr8xgej2thblujx2ftss991hlz9e016akcl4qu82qa7y14q3nwuirem07v01hqyzi18buajl2h6957higdilu1gb76gxv1uqoo5qe3dl23xp6ovg6q68wzamj4mevqd66ukhwdihqwlbvpl66mer20knj6jzrvxcrf1j6g3nvzne6nm3g45dyorw6ik9zq2vyunnnxwgxnu3g170vyw8w4tqn6halpshfjuryoytxda13c5f81a2a6dnsqs2n1iyhmqyqypflwd0ukcb9xzgczyabd0aprkfsdq11osofcke19olnbplxhgtv98k02uoy5yse1lv59bjzxoy7lo4vvdzhvu0zsvm6hv4zbed0euujow55l3pl3s2n7ctnxh2wd58bev7pl9as9ohmntbaj1r01fw6cxexi1q8vc7m58s9tkjcd5qws4l5w4bqc2ddwiu6t2hduyzs3i5zx4o5tdje3rgcawkacjzy12km6m6myzkr9de113hupobj92321n7u5u80sqi1leljeopcvnw5go4e3hjc000ci9o1mftx',
                fileSchema: '2j7987ldsqmx1vjlm702csvpj82ct9ed7tc1po727jjflv75hdk3j7l70s4a7byoiz78evflbras2vvrq9s1ckytl196ye6lqoizsac0370gddfrexgautufq0e7ui70z5gj4uxclue6rly1glui1fmywejyezysdo0ohxn3vg4iurn8gcrgrbn75g0tcwvb3dsgcyebdazuaf6tsiams3f5uhbjg69mwwt923pctf5y51udmvqayrt12mvfdeb26j1p2hy65d56tz2lll48c2atv0hhk4f332gauuz0a24ct2ufh40j4s3l1ieyogogbci96rtgnfc3owfzs4xl8v58u8q9chv9ykltul30n7wq0l36ckxpaa31u0l9tdahcr1vf0nlzs98msbrckaldb4peblhtmp20cuk0d66b6ulstit7b3nggib4vq9s2or9upy9fza7ghz8f8ogdh5zylm47hxnbcqf8dzhnjzztx03d4dfkvsdl3x5rsrkv3lfa98qxx90f8k9dc673tnzecsed0qret5u6kqliooejhg44saxfydgu9eeaj91gl7aw6oakfxw1xqqvivc2r1qmw8j3dq4y3rsanozsad05mhu2senmerd19asc5v32xts2u67tcmizn5klducovnk8kypvk854m9sm01ymj0ojry5r8csb2ondy93d414cp5fapqjyb7lg9hm6o3jglovtjuj9314z8w1w7tdsbbph86zbixvj4fl9kwzhy8l9do4hzx72ba9ae8o2yl7of2qjv5kyzkxtpbrlii8v80f8yxpola76b546iapzza8ks89ilrtkf536p0achqf3h8gjpi5yqumxosydsykb2da0vii4p1wc23iauc7o1uj97hoavg58k1mi5t7rc2f7p1nb35ej6u9hhgdkzduoqshkvm9tpai64cnpiji476c6xvnsyaw1j1srjqakmjy7ed3jdf3d30xdwc1gmr6syfnvqq85zaiz34x9e4f6goo6i8',
                proxyHost: 'nt6moo2kit9ag8iaqcftb124tp6qodfokp21jhfa9bhvzpp7ezo26nacxe4s',
                proxyPort: 5511683811,
                destination: '9mbvjkv8l08fsqprl808favmnih3pselux6a1flev9947qds2stn2zulihdr01sios4qy4pv34mu4sx0ureabjhf5o2s9g5osaopn45dz9dbp2irr2guzp6btq5ih75vmwxxt95j95dsjzjocomocsuyo3t7zz0s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gqtlnkc0gr03dvw6cxa3m03atixc8fof4flnzjpa0hka512k376y7u1dex8xjaj9bsotx08qoku6nmnzuvc63coae0rjzf03qifqkuyz7xqp8ywyo055nrw32cto6yq46086ufq8031nu3iyyrmsmdoxhlwjs45m',
                responsibleUserAccountName: 'kw666v8wcfmi1iw8ik2b',
                lastChangeUserAccount: 'sr0t6q5jcaud2tcv8uqo',
                lastChangedAt: '2020-07-21 23:08:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'qsneomtomjxfgt1y8f967ci1j4h4kezv6lujmekh0lzqlym9qhybp2bjlmavszddnjskj5yarppw84x14l1mimlyqlcekq38vezmu9cdwozg4s2bie6ovdvgjz6ci4rlcman753l8mrabeu1y5trzqd1xqkdnkrs',
                component: '3gcdn2r439rmhv6jcgpa8a0y975hqzh5xditqtaue3nmbxzly8m80nyhobw0sk77jchr6680qkjn7smqdzyvsnh13ytk28j7wq28ppsk0tx0d9wqou99of3rpd0hp8lcs47uah9bv3cwtcqqxgoxw9p8akalgpri',
                name: 'fi218ey53f4jud5mjsyvji39zy8hhqi6rv50a7zwxmj874vdr9efkye9ll726swx2imfiq6jxerzkypwip0w5hjfx9vjjvhkqxzniy9umujgonqv8drvhdv2j39vqgheig0b5c2io5x09j1tby0bxf6b2zjjzmj1',
                flowParty: 'j28hw87fji39ixttwyywq14y200nqvj21yn24wvdkre0hvefzw4q0idwh2vmgh1g2tr4x7pr3slb0ycn4nxztfkgh9u9jjur5bbr8ybwb1xw3nyfxrmxkyyr4qgz2am2luw6c046ck80wjj9euucae3hbm3qkkja',
                flowComponent: '3ljil7dn5szvpxxkac33jb9dpnislzoh3ouapumrn5y2aqc9ehfnc5b0fdzilijbztyj59t6fnhyso89wjatynfk4rhghimgycpj2yv8c0ph1mu8ns2f0b5u1spys81ufgt69dbn4koh5e0cujuu79xw3as6gmls',
                flowInterfaceName: '9eixyedno3g8czoarixwb5ybxfbapb7scyr6vsvmudpydr1lx8a7poliusw9wsxzt5b6jakcsazl4qgdqo7lzh9s67ijrvbnc9py77y13z9hqxbi6yk94ojpuvvmf5w9qpng4und7jo5gyc9l1y4v5wo3sasan92',
                flowInterfaceNamespace: 'lf9cbgpgh1qap55ssr98xu3r399mkfrx27phcpexok53h0r52mcrxaiy6wfz45arwkfiohej2xd4fwq6mgetigmenj7quef42q5b7cuvp6d236h4m32sds27260ci1hhjftanyk0b3q80fd8f8vm5jvsf4riw817',
                adapterType: 'd54ajubov5l0tgei8sg04klf9rt45yr7oerlqdi4sicuncf6cqczc27nd4lw',
                direction: 'SENDER',
                transportProtocol: '5tm8xitufsh1ye1j8ky3azty7e68kzzt3juyzur3tg2ge0b7m5nqsvmpwsym',
                messageProtocol: 'gby6lm5ieuf2xwsrz21z1lmc11ekyk9gbihjh8mejh3wrlnye6ksg2mzghoc',
                adapterEngineName: '59xdlmkp6zym11taiu1twamu47drzqirtf3hhxisfalhd13j7366da489gg405gbyasut109d5kkjz7cnh4n6y9sgsvd84wxns04mt6d4vrxhowifdjl2f0zgqhr1o2ldpwn5t1xjgdr6qgnks44s8e840cf96e3',
                url: '004k1gz1sbl8zouj1mlayk016k8ccdqdtqt7s01ec4klvf2d8362f448n3ekqlol2nx8otnjkzowsq8kxdehffkwouksiibt7jzn8tjj103xq2xgaclttw413nf6k8z9gbirwinqgkgziuryef50onqmcetrxxdw7zl1l865rg6idvgq2lqwsrsbxjyfkn3g6y1tp5ie8n6rtnsc8bvs8sqami41vvavfpzy92dqme3p1oopsme1lscrexhndobih56wf3hjvgkdspfzh42yz19dct8gtht9xvlh1mgik9k58xezekyb25oic4158nr0',
                username: 'jgqnpy81xhrpgjpn24714e5rk9qvxjprf6m6gve9t2us7zd2m4riwn7ge8c9',
                remoteHost: 't3wfxszq7f2myi0i396zlm31kwvx0u5680ehpjlbf72x11qf2yf8pf0jfjxpgdtn3r5ubczw84pluwvoh6kukwr8g8uzexcnqqt9x40bpjypmgwmqlzeq9m1rg3vrujs9uq39pyh38pcqrn3t0lezzz25g6hvib5',
                remotePort: 5830385674,
                directory: 'jgnea380zd80ikjzulgc1kc9lszv080815p8u8oll5ltmomtp3vd1bwjdds0qzvczsui5svwhrdl84a2azkw5ao9qs9977vbkonkn026dfpx7gsfsn0c7bgkz7fbyfi1z3ruyhoa2sssu6nq55zbm2mx58drbup5012nalzilzjmljcex5g08syivdomhvpljb49y57k89vhabbzzk35amcwhngd3prax1ykjv20hckk6l43t6law8ourt0qmu6piyt85hvi69py833k5nogoiy3kl128qti4vueqi9jto2fh5uo6zwe08gsdy2r8p6xuk4v01hufuxrq1otesicx2bk4mqlk5oownf4x19pxstc0pub55gmnq1p6s2rhjxuzgc7nn7rvzh1cbakr8dnr3e4py4mu95kndep8kvmsz0p9v186b0hs1nddykl08a4l8e7g6mo45takfnyhxv1qk1pfx4gua3ej6jcezkzbsamjjxkknc6t69ybvg6b38dzkji6z10g2tvky8wun6z8l4i6ai39aanxcwx0l8808dvan1u47xfjtoetk4sydu87rpj8nl37fb61kk48hqyoi1qtqujzu9ekzmiao8t60tj5r98jz6t46h3mdr4al0ontew6i4hui4424w8argbygm6duh67u8g2osw7b2mjv6hhqn9u72pecegwb3u8bohvzwe3nepdcjcga5e3kxl9flmssclo4m8ftxdkagkbn060wp1mwfqdm2ugmtcuyov5575311gi7i27xrdoylro324649rnve739t96eg8vvq66nctv8m4rvrhs3h0q7ri6rsf82sloz8h4ykxskqr4sr8r0nt02vfhjsnwwrfvy5zbkd7th6ld061zhxq7v473zlavbqyr657al11nyclug488bmc4e2amyagyalesosieoz3q1pkm4b7bxqhent9r2090mdh7jrdx1s3nljmwwit2ykvfclkp7pfzkouzg3yfuwd1fddy7fbelj6dn3r',
                fileSchema: 'i18roln4bm50zom1gm5wr54n1yxyayrjce5jxjijszm0pnxcoy6eky8wnzluucvz0j7se5mxcfuaq4tj06zt2mdsp2sv1jmunsfedjoxfqdnp8ql9s8809q57juyhrayzb9lhakti3w2id08zx52cyu03x2e6cmthpph683rnvaja7yr89wgzm4llqlejxhjf04l6rg969j60gvpjavo8sqyp0bagwc0nux4u74f095cf4a7h2lvwq41802tmqec2qq6fc60pbc7b0uoonqzcqa9b21g9z18ohm1hr690z8a08thogpkyx0y5wa4svnsel9xuudctg1kyq1ou34i9y3cn08q05xogi52evyh13sq31epgkc5fx5dfgv9fszoupoprzcxivpxtxicfjhwsgn7fryrt8ihwpnyxcem20n3jon5fr0qamwr747zgpbxa0yknkz2htwhoxqenzbh6srwb6xz36eddfa8xcqhu7p84jrf9tb8ig9sjhmpsrh3nslogxtfkftgm37py6s0zreibzvlmizihgtchmqt6mkpd7lrktkk0vhgrj0nubcsdqyao6s8qu69j0ars6py1w67acqjl1lmp9fnzr7oy5e39ae0vestpd7beav1kf3so28o00388wok08d42k0cs3e90d9nyl27rqavw2y3cgios5r1mny2bopfcyqt4mhg7qah1hao96vtkijjupkp5hrqrsqngmbx1x4zym115vzemtq775lghkhirjisziafauso867ayksrza07obibt0ib6tz5erchmfy68jut89grpjjcyjwy4y12vlybfusqiz3w1wk575zmw4jeuattyokvf192kclothc24oqv36l3gtxij4i38ajf9kp3189xltbamqqpe6etjuhbm46yq99yt4j9rda10ipdq8tjm98cjx15inpejyevfwdbdm6p8c9th325ph2j2artxr3w2ndwomab8mrmd6t1ljz9rroz9tdv0kmrh8yid2ru3dms',
                proxyHost: 'wz7x35rb6emuigxd3thtrlaz6c0lil3l28r1zt5lx97nw39okqm43zr0g411',
                proxyPort: -9,
                destination: '58nd4xe02iukmxd0gqmavz2avtye1ezshe9p11271uhuvae75ku0wj79gdfltrporteqq5nltm2c8bu5vfszjzu75rlslelnu56rfmnwj7yd8e47w4pt88pfew64fj1x73mwaiijoopulk7eu6b97x1ut865imja',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a18xwawhopuh9o64lmefw8gcwfl1dwauwot5tx16h7uaxvtkguwjpjm9lnaxxc519a4xdpvuaqz0yzdro6uei92801shottanxcjlqwadqf9imxsb2sulcdo7il1jh11dy0vlyq9rosjwxi3x60gd7glik0oljql',
                responsibleUserAccountName: 'boha3da8kq9449lrg840',
                lastChangeUserAccount: 'l5j9ry7znf5iqs4wo21q',
                lastChangedAt: '2020-07-21 14:02:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'tdp185x2o4pivtq5k2z5kcvv8epsfwaa87nre9d5lngihlxxfupg95m0wyiaom0xfj9xzhl3j5lrwtc6u8vipib42jmfpmozw5a880sh6697frow18q0purbkuweens6zfdua8kf56lnd587q8z8j9r04jmgefzk',
                component: 'sydyr7b0znwylpw2evbvn2t2t2o5q1ivw5rbeg65hmg0th9lw7b1r193j3z9kpsi7kpnirllxqj573wxph5nulx8sjngclta5pyv0k9isp9thgew98u0r3g2wsqxtfhx9mvoqs5a09metpvmdthjx5edkdgmnamd',
                name: 'giczn5vyh99936axpx4tqt6d98faphklzeijf12g9ahkcs34cejfpodopu7qp40nthc3ocmi14opig8vxxr3ej61uggwlvj1erkb8hzr2x3d852j0jzofr1re7hibrdalre4s2cahcg9smgbqhfxjh7n28hgxbfl',
                flowParty: 'r3n0ypet3pj049e80v317249in3dyod8ck3h3yx04drpwhbtenq31l2q95rrut51n67si8mylfb2tfwkrnu011e1q5kr3ftibgyh1dixzvvb1594egtjpss14fgsp7jn84fbbclr1o48lo5lar3rtf1ggv2llvt7',
                flowComponent: 'lpdfs77hg5pcxqcmi1ayiesn24t7d5tpsio33kfozye6qw3s1fn6tspzik6drzewowxft58zbb4ojxcevtrckokfrmf565ph4yvnttx92dhno96whtbx92n6xxj83y0a75wlcerrc7zgpbm2y5drbo3pogdffusn',
                flowInterfaceName: 'tcs18jcupes8m8e4f81d6mwy9vpkokcihnjkz08o2xj7pxfw10tjk9o7s0qtq5luz95lbeg1xf9agzm3vad6l97ltw2r6842izml6bseis1l604qb4dh4ss0nl0vtdcdlawvtq66foa3ondbl0ur5p38ndyn6vrt',
                flowInterfaceNamespace: '7kveev4velmbhubcoyl6adybk6svbc0d0ekfqvggo1qixuka7i3pigxp6uz1cfjhur4jl6ljwuzf8cakjrw5ntgamxvvdsei8zh5qxik6dign2ecmbygshyvh41ritll4vmhpxbi4rgkg1cfqfpm15fw1c2r6w3p',
                adapterType: 'ca4707l48usyf3v68om6botisfphj13jlf40tyisyp1i1iruiv4h1l706sbw',
                direction: 'XXXX',
                transportProtocol: 'cmu8nep6hsxyl2hd7lj5rr76shd0aw1qalh482xvkj6evz537fpr3qe4u1ao',
                messageProtocol: '0s1tx51y955i03fg2eqs0djtew4dookhpo14b7kr0skahzy8dkmkxu0wy50l',
                adapterEngineName: 'ojhk7qpsia0w20zdsbbb45m8ukwwyuhq1o2cizmlzuz6jlr8tiz4caeae9ux2vucwyor3pmij3gd7k5bvf5oj2hairmhzeenqugkdoow9gb7x9c8f31x3eij1d4fs47tpohzgr4itmfira474t557hq23hjkqhd3',
                url: 'qtqbs9xay80s15p9cfps09ixd59q6thz5uwi5gq2t8n7qbcfpvi830jyrqha7cyx211hie7tl017hzbhnelto5iduw5zhwv4gf30u2fmtlw0961rhwk2woezdpkyu0bfw8n922apjlwu6vnb6qqrcf7fu15owqhppyz8k7mpx5w1800vb4h4dfijn08n19blt15gg4fbpawoiemv2pdqbbkf9zyns6oamtyoo1rwnn5zf1n9it25r7f1o37whue3xfywjwgojx40arzzydfcjbahq83pnpxxi5c88f27uldtscbnrih9itnu6dlmv3rd',
                username: '6sjaykeu96qzhsbkqusaqa0rvuyzfrjfikhovpyh5oehkizxxyg5tuzur1bo',
                remoteHost: '8674q8qdik5vkctw5qpqyja8bu6dqlp0hvvmmrdqkb5vt9ggwuvussi7cjzavbr8oeyzmgf8aky71jlvc95qdph8ew4ku3hjf9mcxzmcyd21m6ll41y88ycbgcx57uzmhg6uxsxp3g17easius073un9eu9q9j9g',
                remotePort: 1731631388,
                directory: '6xp1e3fw1ei7lz1bwckyvm0sbd9xz0qss769s4w82js0v3ca5bl3hw2514x6lq5eqrcvckbqw2frf8f5j9vurxj82x661jovtk3999t59azbbdfvuyxn1x483gzxuu57r59k1qxp98bos70e832jmmuske4akjx3zz047kfj3z76g0qihonmpkc84hkdx154zir55lrrd0u81kx8pug0uzqd36hp9jkolwwaulu4u6v0fhgc20llz331brchi2rxpqmagneb7wgs8qdt38r36qsagc2luan3dgtn9ucifecoimrmyeyno7dy3x0vikjhmdl3dlxqi0bkz3u2o636hlklr0uviaic7ofrkreyrd54jtcnteresp8cr5mj0t6uqclg9e3owsp49tgqo9w4trhjkvccayekpgjrnjsh36jre84awxcg9r9v325kg0ysbvutuiyuozrjws3u9gh0sucsbny0ujr9beeo7bhywzwp62vf4ul7taz8fxcuol2oaiaqr841afjngy1pb56zddsmu1v01vqj4xk9xtbogt54uisqig6q2vn85s63u5u1be09oarltfrytfbw743ffluymlztp7nfu0o3xd36c6yt8nwdn06c04kpxwfdprp58qht62eu8ttvpa9i5g9k5c35i3iheflnyqmlq7p7y5yzvp4pdo2vu77hbigbxt102pd8qe1y78tv18bhw4i45t69kr7te3vn65vec0wtvc953zh99ioxce0me1br39t8hkt5hfqds8uz8ungwqsd7rgzsc2spw165q36uoko1t1lr8ilyx8prt93ms52xbt9m77tsi66jriq5szwxe7zyhtfs2x6b4ruiqu4f76kh8f6lmnxyl30nghzttfzm1lv5acehb1jcgmkctbs4o8ii60qgdhcr7u7l9z6kjylk8ne4vx0wo4raab804a06rr91e6br414jgmntmg5cd1frwc6aymvnjbborprznuu3li33x6tflp6mgiebze593nx',
                fileSchema: 'g25tad66dyp8v2os0nq613ttpw36y1yy0pdk2az7nujkpa6m64ruez5q7av5msxtycl1vy4sutxzuvtgtpi874ehghjh80klzxpk02qikgtkrkxu0ge93yta3wg8fdi9o5qnfj5zaxl50imiwc4fb7npfe5cre6fq13rj2u5pk54ahzy7heuksduvuwr18xbjnn6nhkp9d6e88duig1axhvna5g8laow2pw6mlfxokjjc6x1nct20m7ra1z6wlu42a8fs2enz3klbcsrjmh73pdp443cczuvifurugilnnci2ihk1eo9fqxvhix2tnwhz08uhu6hc7m8ah0audjh8jd5k4cvq4pfwaae4ybsvv0b4g95z02las9mtilvi03ev8fdji4dfy4qc5hvxdohdoa5w7k7n9366s3lw7ugzzutikx4jt47uz3eubdvzzbgibta89wa7xh6gdmktzkedb0jwo305z4crr78n4l0f0qav8991whlml077qlrv2aj86si5q7q9qe96w8doe51y8byhmy8hr4imi5xfwuprvkmwys76zqi6xvbokrruf9082hc2caaxdzy3utvg8lrk5i9qqoa70ly5a4euagmesl2mc0w7fx0bfvhn35ia0ha11zs6gbslrezi6ri0jawwkq8ovbv2o6xunczb8ra6p7hillth2b63tw7lrlh64bbr4wt7hme1aeu7x0mop1u84stziqvx08uk02c08ekw3axh5genl0odmfxwz44cgnhkw7rel3pu3epo6ljvcqtr7h69r7som2952khpd6m2fjtbyisoe3ge9v7a2sw4e9ff6t0uv71tshzng3h24czkay0kjenbnvre2l862bo3yi2pbmugmqhc5lfv8widekoo5h74a323sy3qacnytqrw6ar0ae1k9mqrmpkwccguqo6a4csuictqac29ptmk82vs6jrg98wuztg9i7p86iimwn5s8nxrmgedq7bdn04njiinj9nhrwskiaojq5gsyhv',
                proxyHost: 'l9lnr0dxn04rp4y942st6iw1ih6fr9tjoeaigr69ngen5qrjhl931d532zrk',
                proxyPort: 8425594178,
                destination: 'klaq0lmckqwe4ow8emgdaw72u1dal9y6e51fvyzkvfibk42aeapcwi8wtxlatw6owb3efhd9kx1fcsikd7opqf90qzqm0spub9eesf3ix0wnip6ayy02ssbnya1vz8bztppzzfhixk0a1s3nd8rf0ariwh3e43mw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fsgqsudkw0fyurhye301nuhglnrtzpoas0qv7tumya0drt9v8n9svashh3jx6ajpjlkwq8r3e21nxd46eu4oe4st2q20xvk90gmvwt0iumoq5enu8x341llf0v6w3r4lpf4d58yj8yvzc481q6e37pkvkmbzabq3',
                responsibleUserAccountName: '11yenqii5dfhllxgvfif',
                lastChangeUserAccount: 'eq1pjg3q80smmt60xcb9',
                lastChangedAt: '2020-07-21 14:46:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'u9qob81wbtflzu1l189crpr5itu6aymav3pw0aumnmh65f55ku7xgvkm03i6nqwnr0vmwy00dtq9bzqeby07wbccwmwspo0azwg4e5cqe9ael2oxp860o8h4rjzlr4gz0cqg5igowx2yp0q0kyy3mwvmlyy1uba4',
                component: 'dclq1mj8jln5uhh12hwu79ywxl2uuvhpd8ekwfrn1eyztct5x1zdy4i28lauf4iptxfowver2oaw3bxxuen9ms64poqppsa3bf4kx243i7ectrljoq2jx5janr21jn2wkifj69yqj868bcj3awzdu0g23kiqgzou',
                name: 'e642ttra9izryjgu57dyy83yuzf7l6qs8dixaf0sd0xbauy0x7191vdzwa3y9mllbig27r3cj7fc6aj8q9tgjo4bnmwvmjexdahuvnpas9jvi7u8rn06291s4ww5wmcrw5v3vamqg7bmv8de3a9iw2z2th67rvtz',
                flowParty: 'wljof3yxxb01jdfnsv3cxfwuz440xg8o00zyko7ca39qkmk1v0ua8fsoor9dyjb8mpqvwoo7tilk2dokb3agc1jtpws8r6fhppuuwupnuq5fappiivsm95xhh0a3i503l6idr0j5bnuemnywqzpzd5bj9d05r82x',
                flowComponent: 'my16gczz3v39v4fu5fc9h4w0kdcxzakjduxdcwk0hglwa3wpyrdf4svw8zy8ugl65xn34dydn4e1ds2s13zm3roy6bidmmrwwzxtoppzilo1iqprji4cg68f7c1q88tvjqvo1e8pfcgt79p5hgra31t4if03bbv3',
                flowInterfaceName: 'zkig04yyoee179bmwm2w6g8qttpdkiqz94u95jrd2vut2hud54g206e9rfuapnsx18j8ibv2hmluvdbsl314vhl9ffque7ly85mnfwcludt52o16vnrfz0pdyk2wwo48pnk6trphsptykdcp3mecfi0is34vwj7i',
                flowInterfaceNamespace: 'e1w0lypuhhjehndvxfwcw6wsl9ji31vbrap34a2fnr5dezh016p3h2bslrn4v7ysbmwu4c79x274x30o0q3d54ujf4114sfuc8x0x9zfrlfl26yc6wym5ywha3kdvnhh9anmet5g0l21rc1x97f4udm5beuokbsa',
                adapterType: 'xf4224dbv46cdg2xg8wk1v7qnbjq227xma3xkmvb8gf23sosqbw89u3e1gwa',
                direction: 'RECEIVER',
                transportProtocol: 'hvccicee1kb2zgtc8hanr868p1jo8wl47r4l1mmvekbjh0qujs0e3gqua3dj',
                messageProtocol: '5oga3afom41i8ceshsk9gcmusyec699agocseiatlheb5cpn5xuzjmvt005c',
                adapterEngineName: 'pvz4tcczvwvzhm5kq5nvt48bwncloabwo0g4om3cwr1cysaqdss33ay5sf0evjvojg0w1upm9pmx6osal8pp1jo8x1gkjkuhk0evaejnaa7klhij28166s4gsylr1tu4be8gxqgo85h9750seh2w2dnyl2oyjz8q',
                url: 'erlg3gtq620gofaayoa006gnd3kaowspbi0i6jxzf71kl01zgchl6ckjw9zgviwxwq0ruglfscy048d4n83khcx0wputlhlb2i2jq9ybirl9w8ifjdwtw98bl6et1a31fwjyi05ig4fw7r9szgcgcabarxg8rdet5c2qaqfwpu6cfmxkmje8wd59p4nq188dmwg1g1dox4memmkwo0a2ngc07jcrtc8emw24b8lrmgie8wxim4a2ftof66g2rk24pjddgf3ypew1sbwa03uebm7u5h1m3yrivbq752oapb53mzbial1jl6i0athbd3um',
                username: '2dlqt4osgjnv43aa2iwulaop4dzkmvc68taotmxmai9ui1bf5xlytledvtgd',
                remoteHost: 'vw3pfvvyzbsd66r9eblgdvy4kd0s1hhgr249u1surosbk1ev2vo8la12e7vfrpjnyk6of6ufeyaxh8mp356vjglg7k5vigss1osx0jtt683jq0x4q6ohtz09sh7e4put66e776uhy40yuy7k2ljp5idl14owe7sm',
                remotePort: 2535521911,
                directory: 'k21p3ac7mud1hxcwh5f87e5ycu6zt1jkngzc3p5c2y4gac3qw1r1m6rgd4d1a85oomtwqfxqyaa5nsnyujgmocwc2zfc0p2ddf9f469pf2940tohb41y6pgmvl1ouyvdo81v5p99ykaai01zqgvcatjwzygosojm518ks7qjmsohcyckinv654g7el5q8ay7oarnc7cde66wsd4d7j42kck4rq5xqub10dvc5tt5wwunmastwvrc43u3ljbemfbkqxu07tsl0kcscg3mj5s13u58ta8570nu1v9c58ewbw445sl1ri0kovu3edvnxk8sw1yc8fuoy4oclyq45qfv8rvpfi07rxq0ari3saqq7kzzmvj57o1qdl5znpzswowrl4us1gz1gxjunmedhf2ay2vtw6xcmpnlkpfmtoqs86ob4nx6qxkkbux66mxy58r2t82mn2xwrhdk997cz44oak2f0srza2at23a21ywo6f09kr8j18cmn1cophpvqzlh20dc0hcoqvomubp9qnz6g9aqno519zuewmp9uh4g51eyrnnnakrt9rf983qr7tqodp3txbbrqenawj5t8uvymio6rkijb9rynih2plk49h5xnxgr1t0sl0c7706oy488kbg4tgo3loxw72mx1dg2cuaozpjs77907qniss0a3fhzl1vxm3zkqtxiwwcjp84ds9s9clhn8um95uto9lvp73h9g2rz5jf7hvc1glpfz6ksu50ganu99ts3n1rhb22sb9dpkd7lca7h37jwlzbbhyvx6zpx21a7t13tprki4woi79f13ryx7ehduleib4mao37ktjufvux21htut63dj85xalgy9bv2qaysrgv635b8ynq7zm3vvitvc3fnxyzo0cjg5lrzaz4mlbai6gy8te991jc223ronfp84d65s6u3bt8nanii5wd6rjtoz02bo5alx0tjzak6603djip3p6d36mwopusahfc2cfvkokbj6i9aeg5nf2xc515aw9wz',
                fileSchema: 'y9mxwg78zlujakznsoc4bhocjk4twejbi3djcrheia82bukthsnke6qsb21holkxwnk239zeo6urn72r0wtohvxxnkzav4goblp96v7j8dh34r9nkfm6txxu4ldo1x09xvky4shudmrco9u8zkgv6nspa4xr6z4bmzocg5pbnjbevzkyjewi4zivpwezc83ftcba4vv555c3l2bwuaqmqwt1du27eemqg5vv2mv552k9exzl59x09a81nkxvt9o6me0jcb4ecbwc78mspiuz4fcenw70kvfvq6nq2wjso24z05mju50voejhw9hgspe4n87yezv155migyrq4u9b8eokcnbsc9o5fs5mbfh4xf1408k4fimgxp6rki9yhtxpanh0drg9xkyvifa75ogpdlncxc5ghv1agsjeg9rb5ltqu2c7uffznnthfaitkacabjo88526ts85nui1o2le2ltm8ldhvtpa2e0k6eml052d1ovyeyui4sdhipxo9hrdc5pmb4am4uokottxav9vbtw029g87v3yyzlul2qknm6l3lo1z7m6b2hr9wuy0in6d99g4rvwhcmmzzicm1dqixo5benpgilwp7o5rbfpwcdoipopsapkolykonrf6ek4wwqmr26apdqqo5f72i4zkh6hibgl0s7ogtqozmfpe64j8b2urxep7h794ed9c3rczroutohpoxwsw3uf6qtlp0vji3b25qvyw9ca6klwya2ch36fwr50p3l03254k0jd35emv6y7mk1wl29b8nyskasznru0oswv5pdw4ocumziri1d8fom7iwevrvot52u7mhcamuzjcwjcm48nsisfe5neyn45dmycsdj4gks83h898bb93oowya5m0elcewv6h9c28vasagoa78ka46fw11r1fh85g97lpix8th6m6phobxcqfc9282tlzzra4ww0d5de4ufqgtfj9ddswxaw9c8jyqsvn2gwq3nk2s1jqxtca4qgajqmdfhj4bpqx25v',
                proxyHost: '360gisakwbeuzc4un25bd2g4jt3m74kpdphq0z87a0wr1rhhq01xemr7wo6w',
                proxyPort: 6918712010,
                destination: 'fojnf5k4bq22uq07sgafdg3y0jxcmxerm9lfa4c85of2g8lt6t2qtlkym70qwnmxa08eli4omymlklx22031kur29ux8xt3w785lw2uewfu3q44ci7hdl05fmipkcqamfe7firlpxrga22lgknab6het88ev2uqm',
                adapterStatus: 'XXXX',
                softwareComponentName: 'tvxixay6prueruij8ekeb3utovanepihdjwrwpno956q51u916ah8p41pnyhyehx2j0ivthooej0267p59nfm4k6pfvjhea7rc7d57tp09hrf4jq8k5qtozk2z4nme0s0bumbi3vg3x2f6yfjr1x3bf44idu5fzi',
                responsibleUserAccountName: 'xutoce4vl8trc9lc8hz7',
                lastChangeUserAccount: 'w9woo9yzwcl04d3s7e6c',
                lastChangedAt: '2020-07-21 13:25:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'dugor3v2uznz7kiz8hcy1s8ehsce712fqrkz5wk6fuc3se4ciq6ipsfhn2mkeadn4nqno9cixa7tn81gnkfhdqzhc995um3xz0suc1y5nhqd6xrx8oqkt9qxz7phrycf892xvagp0rcxpbdqz7mxt0modk9sykav',
                component: 'pd7h6g3zgh3st4g60ks6972tejal2a7u8mtmm4u528zm57t21057rrsjjilzdiv47sqps9zxa45e0gksb0o0sj82wv4vj33pvjxuhacpvprl4mj0m4syz103s0v8n7shlg2trs7nibnz0jw8jv9hho9nkxppj681',
                name: 'zukz948d5xlx8mjt8w8emgq4b4ltlew5m3a9v0oxovukwgxftba6grtxqmziyb67hu3055l6k9go2xdzifs8o4phenrohh7dvg007onypqq4fnf401teoc7cjow1auutgujjvlo6fpqaosqdrmvru87zdydm0gvf',
                flowParty: 'c5u0liwrbl9clqg8blcvigo843wu28qsy56qg71845voji1yo52a6htybynou1jcp2lg378jqgdzenh3x3yce3hc1hdui5x3lrdg2y69rvxlygcdpgnhhtncreuyhrf1el5pcbxtdzzilgh9nbg5yumepmi8j34w',
                flowComponent: '1a9dm37wwi7s4xfa3civd9i3psr3afckdognqin94d27vlcg0euyurwi1cehti0c7yhs1wdfyl91y56yzy38jxfya3nw7xevijh078x7f371zsjky6b0xhq498bpoynbm2mg0ohk3x4whheu07u8ntt805t9tqcu',
                flowInterfaceName: 'alxerke0rb2dj39dyjj2a0jb84r0ulfj6y34skl4plvqhw3n8j90ye79l4tsk2xpg6ijg4j8bev3v1ahweo7se4xz26mm9cn2k32m0zuf65nep7r1gsu984v90vrl7m5xqr2zknlgu5xj9z4ric1zs29lgvbztx1',
                flowInterfaceNamespace: '6hj7sq39cukh6d7bzqv44mcpz8e7xailh5h8zeom7hbjz6ktzt0fox5cu2fl70p9ovzceb7yqq2wej5orot20h4oq180bhyc7w206u880fbhklv3hsqm95f6e4xdehvv0rkn1ymoo35uglj9x8qk6rvbsif48mk7',
                adapterType: 'bxkhevdu6mx7j0j7fwdake6jcxxcyff8ezld6w6dpkmxl05eehel5jhn2y4i',
                direction: 'SENDER',
                transportProtocol: 'l7ulp9zijjkfftn87fcrkcr9zqkvhilwqijnvh3oka2fyf2wwfa1fxczy6we',
                messageProtocol: '7rz79va9akkjivs0uftuuwlypl20j9bzp9vamdrlvxoqycfmo3zr76sxnh87',
                adapterEngineName: 'lorz51wxez9t18k3ix1u4jfjg0m1bnfjr46qx5a6p4v6i1yichr3uf49hsvopzwslclpgc8q19vl5rtnw18mtj86phv710001afje116x3x87kx2irxl1r5ubusd4a79wklflfs3kjf7hpxha0k6hraau11lg82s',
                url: 'uv7sk30glpiy598bm51zfqby682oiqniq80qkcc1fbiardr5937tjw4rgq34iqgvjo7vyrm5i9i3yjvt9tbma3l7vs6a1mi9hnwvej7tfeb7h4mm9ov407zkpqhsys9o69qlmp28yomm9an6ne77t0372l53duqghuji0g1fmj53qh65j3rhmnu8ipznjuxkzr5y4fl6mfp2ymy45vjh9jo54443qtuf0uzyz03ftkfmcpg03ain3qklib9jdpooymjz7fpiax8byrqtu9qv1ydnr7oy5736b3b3tyaa0pcwuei71434co8mbng837kv',
                username: 'xgku9c0v7dh8ty812yqpegiqoh73bv0xhg4tkpkzadcckn5ma1eute534635',
                remoteHost: '4apvjbvtnhecl3jhulmp56lla5vrlwxdtl2zvxcq4bxzaus60531ph62c64h4cvtg76hoocxgtc5pqhvam1pg7ek4ddi94xvu6llrwtyo80fhgt85zsc8vt89jz2xxxkcjcd8dr87lnqrqmpmzvpgfvdhcqfausc',
                remotePort: 8431270059,
                directory: 'rvlcx1k84f0epytt6tdmw6tmlttvdkr6y03n0ktjhrsdiq41rmc45oob78vxj805hgne9js3fkc2ajesyht44nvc5ku9q8y0rxz6ucmimcut8m5ojy6ry3yvmiytfupnajg5bn2awx54pszh1h04pux22g17em7lmxbdsikm27lpjb1b61buj0zfsn59km0jxbpyuxzac5f4ls4g4y2yawzsa43nxs7zfoql1tfowjet3ou4zfhpee4085lp7ylnoynkx6lgxphpoiih3ru5886omux5y5x5awro3ln86im6qpp4dm7bjsp5y3irnolhpxzmrs96mh464j7sd4lp9u751wyss7rydveuu2bo2ru0070g7n3qa00qemvz5kft0lghj8ciufq0s0pwzaf38ihd9jf5promdafccsloyf3624ibkpb37cf8cteenakoa99jmxb1g15ybj6h7uxx221rorw36t2h13wyiqsaivmc4w870gpj68qjjtkp1jel4qsofgjj335huilxqk3hutwjuygqr4512sww4tow4b8okhbctmhuljq1e2umm0nezvuz57hgdgl87gm4mrbf8evwq2o9vc7gw7diqrihmn35h8q4vmm9bos0fgfkagekqpdwfym6fwd3va9dj4uy5djv0hwamymle667du1mpw7fnhfhr0oxqmcnt5w2xep3fnm3z76d93p26e4w1u5wos1hy1trle6pj1d9y6zquuxe2dyakjidk9oaeq3tqsx58wye41pc6vvhtka6du3sjdk6j2na0rqihh24744ypr10bdo8ewgwsoxus95vkubthi7s52px9yye2ndpb3i3zsnuf4x7t62vvdxa4i4sy42gealnt1de6sm272kp2b6vdwy72xb657fdiea4hkr29a2xy98glcfb95ocgk5q3cwtgbojiao2ef5228jizhpfdx6tqjpheiaqqq0v5vrq47mw0lhw4eppixywijsgj7o6pzp2j7yxsti1zke2sovd',
                fileSchema: 'tkvkdxnr6s63e96dzokdrne6i1c89j2btbd46q8ayml9yow0eytv9h0s6o5mao8hk6pp5vxof3noljmqa8rrh5a480rxng1h3n81h4ea24u8e1e55a1s11yfpi2cr0y8e0khm5hw8bwepurmb1pqnver4ltf8efxvf2cyuixi2lwkan2m1e4eamqkhljr4ebkobr0bi2g18l8pxuzw8todnxt0dqfw6kubvzix25fuomsfm1qub3xbscr1cs2itkl1lkoiqmscq0dkch79gypjvrn98q957ztxt8zpoewajlce0wxapk892ioop9kgd0duiei5zidli4u01e4dg8gpahmsmpf4haf3tgaif2ynlpp2rpchipv9hay7e8us6q6ofe304dlm092q048xp7x04c3yhsr4vpi94oth84t6h8f9gthxx1ongcbb9vntgoh3m7afrn4f5h9suoy9lglwflhnxr3ah8at2q8nh6qn95j7dviw8jf2xi5wu2bn1ipdoj6legkr17efmoqns17chabjkvhmox0ccv4ls0uq23dlz37jvboz4ynj6pw8p6fvbwmrx3qcvi5b1ytm1yymufn7qlh88dlumcr8fh9g7li6k87or2v1d2g2r5zrxwpatkj5xymn1lkr23kdv9nxotgigqgs5zte9b90qwea9nvyerynhro2d0ge9t1sfk3mjxsrp6ntttj4r094a073ikfl3ciyqkfkr0xqywi6tqrmp7doo4x5gmskc0kt0x6g3wkilakx0779i8isc8ck67qt48oufndifm7zsl7qxkdv055odkrfwg6ywa60qwe6dale0q1mz70n4s1m2ko84ev303v31vngn1e96ipru8y9mwfczpbh6kctyd5l6mnbl4cvrkrf8wxydznjvjbrmmyuy9tc2vxbne9ltopho2bty0z7stc0sw7f5lpvm632d50bxppmdv1yovjw50rs0fzp7gyefkupcdaj2ds504g2kdydiueyjubdtcidx8',
                proxyHost: 'g34x6gst500458kg3e3eo7d2daajhe12qr7c4pv0cy8m56rijt5et9ue3hfr',
                proxyPort: 5762138070,
                destination: 'vjvjn2fflfx86qjek4v8pm05fn4pl9v11cspyv7edyzdvxmc4l8bh8lljllilm06hnme6iesjrjjfv8sanulig0u3rrf1ve2nfbb7tf1qkrftb4ksyyapbbj49ce3ll7ra9bcvtxsiz2fithjysr7gmpj2q5rnnu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'await5qp0lcnx0lyzlvgyhg8vxvdc79ftsu5sxfautxht8htjxgt7ypsqxlmhmgujpnfvr9lq8uri70fit1yn2pwt05grwketbh5x67blqitq2g9mg539pa4v506hzolnl6639yg4n7jqvm5hw6u1ja9pkxtr4wz',
                responsibleUserAccountName: '2doai6ufsixvp95jlpe1',
                lastChangeUserAccount: 'u2x2jdgk0hbenz00a8l3',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: '8l5raivwywfr8s6v25iytq4uofz508s0yppnww6wt0i95d1sz0b4gfqqcrk5nkc57ceahi3gdd4cf1299wrz6c6rj4oufybwjx3wcfbz8jqbs8l1e8y3upl4ve4762buv8zr0v5ctiy3iyxngb49in7qzq6tbyj2',
                component: '02d0aezfr2jnel7ruic3nlu9wzlj3kl29lfai92i9pj8shvbyugcynxg351x0hr5nvdtk6grggiq9igtd74tobap52b67tzv0e3wpiea7fbqevcvhsj2hanltps13quiojxo9c6rffbinpod0k1orot2gkrxr74i',
                name: 'p460mnr1rj4zj53dz2gty5lgpmf6i2ceyovk6dlus3iwhk0jyf0yb0dj0coiepdltf8b1oavd8xwfum43at62oglyj7d9m33vmd6j9jd7gd7khpm9ya2ccpfkx0wqskijnq0imk82z09560s8fw23qnvsoypxjgz',
                flowParty: 'to7y730ea63nhjq61c8dcnc391i29zpih3hers0og6snl86j4cxcenvfw5g3p6xrbwgzevp3x3wde2f1ggt8g5so3yx9jb0cvsdmad8l80bbeu2phwihzkz425uznk6af3la1d43pag0woze5v4zwxp4hfieagwx',
                flowComponent: 'q7eajgwl3n82xf1871x1grtkyzf41o5vhbix1yzm24rjmf4jqz2bkuk065kvhtptmjgxp3kckkiyqi4mdl23v4e93xbubpscfh65t5va5zh02p0u4wdqppaczlgqnbyj0li0b1ktdp6nqgxayq8zp1x451a534on',
                flowInterfaceName: 'kust7w3nlpin5jcpp6e4t1x7c62q3sd52007vyv3bv97cyz7qjkvw0xzggd2f7xo291x5b8diet3qu3437e7em74tpc9dprt7kbic8330tp8h2v2h7b7svns9xhfn762sk9lkmm4t2060nnkiq9iqnjbjerd8hi9',
                flowInterfaceNamespace: 'ch0icdce2g3y3ztn7shm33emtc454i8wyavkpmffeaxfl9rd1lcokdmpp9jaa86fcq0n8qj0awgcwf3xq3rxeyq5xugu3zyncdu56sgg1lvehsu3zrkpf4hp5s78dlo0b48e2dijk7wzatwa1gmgkjyx311dmes4',
                adapterType: 'rvxg2hv54vehgiy4vqfcuaf4eectcghaef9uuth6yhk8ap5d81kmcex2chg1',
                direction: 'RECEIVER',
                transportProtocol: 'ox68xbfofqw31v56g9ucvibrja1wh8k6g72wyn557scz7mrqk54ev3ho76te',
                messageProtocol: 'pbcs8uhphcqhs9pdanp35n7ppz2x1q340rvw56dbioyhb62m34pg9o3jsun6',
                adapterEngineName: '5f9hsvfx8lyim2mk9izafkhv0z0z42qp4j74jw6mw6243j0wi6h8j6m2x6qzrgb2w9h2r4smh61tv2czs47bjwkz84hda2n770s4dsjpk2jrw82novcs21uhsh8r97s9cmjaeb6nb4tdwx286jv8s5lgerk7ljes',
                url: 'qbyojavkv89vzkc60kdwtiyzn10epdj82qztmojkx5v0j7mq9gio8icncvbo48m8cwibjfy3sbmuyfug7j3xdme5s0mi0ozp8uupmlvq2vnzm4kkwuj3tczudt9sctzg7fqwp8jgef6mpl06dzh0zy6y88t24mzpsrvb2dwvkua36t7bdi5znuk36a7008mpim3c418aqlpuo2rba0wx7rymnyjdue8cmp3fqr16pb09jph3cw5tb5dxz9bi4v2oy9y509r1qls4t9wncz3vg5xgt13x9e5fsdtb3o7fqcj3zkcmwkwhzk1p9p48ba9r',
                username: 'fy3lo2c0le4xiqddiboxzzen73nj910a8c2sosd1xvhp6fsexhcrtpdrd62n',
                remoteHost: '9o5kaqwqkc1vgps3imvf7f899a09f7lxsxawie931ojk8kw8dwdqetowg648aqena0967a0wk8o22odfzloizw1yr4fn8wndpzdt0lai9tnd73vw9pjmx64c55gaqgtf5nre3gwgwdwmk5lhdaadz2ln4398ecws',
                remotePort: 6099524826,
                directory: '1yqzq09gq4zdbctxvdfmnzrw6kooa7yfq9r00s0gfxxme242juchn71apjl77v4o0xa0tb2jycxiunb9guynwg2ia910v2bsqbk413a53qkciq9bmtluegofpp8qspoxqkzua6nt2nc1lo8e5fdaygcd6xuk8094zbn0d78en3tdr60hmuepene2fn0moo72idaok8k063lgka3rlk3h130r35k9im2inpbhmlp5gfvluqqvfvkuad9yvxf68xjc32lunq2vgkgxxomssw5ieo4lgpyybisi4cnzp64jj0ccridtok63cagbjao2vi1l6ne4g9tb89cb40b5xot7fd7pqscvfimcxq5y4fs0m93hict32mggjzzl3i8i1gg4n8mls266esnqgqlz0tk22k232fdmvqbsyvm3ssxpkzue949j2w6u37ope6usq14z2aqcipi6u4nu3hpeyevgc18a7h2fyh9fmmgnlc9ldjont6y6c7490uwvgljutjfhmigwo3rimry799u20z7pfvhnww1djwz459s55f5hxn8u57v34554pb90strs4pd2ydd6fhfnft2w55mpbyl7u6vhyfzabf5zpijf92ajvfx3sj34ty84yu6xu8b8ykm26set0j37kmwc9fmqrn6o10rq5ju74ssczulu2rcr9d7yf4uf8ytu31m248be3ss4ml1f21klj6z8j1ek7nfhxd73ye1sm3cki4razhev715jw9uxoiglgaxk2u3bbtqjmdkgve9scns2dcv71n26rv0t7i7fbsfwkgen1jchk0ehr6ip4i3off7yjbudgnzvvj6agmth7mquslw94gwoux4yh3iboo18l1apn2594qsc3rbd696op1it67x7ede66l2nf17lndev5wsljmbdyo3ypwfkj2e7kdqfr5f688g4rqvuvsaa3zy666ico7b3zgmx2h7juz7qqyr26ibdiai6yhv32pfctgnfa5qm1sjzyfruvfpwsorw0claxymy',
                fileSchema: 'osc92bcu2ul9f0y5he57998zz6qhb3k8tvx25chvbkxmfs5gn5lnaylq3fzacnh7xosoj2fvoimg5iu7rgh528blshcp3sx5etzma0fx2sgmt9b3g6ibjaisfj7fbf83lp3l9givtledzn9jn4u41qd05eb98w41mzgzp7v93xsswsginza9rd3tyc8kpju49mxc1up8j4e0dtwvyffk6wk68164tagvenq4rvdz60qelux93lkfrmcw873t1txo3hoxrx7kuu8mqppmxe4kb2wyavlxx86tj5uf6tqjljawx2s7wlyd1pfxofqfmw282qlxlircd71m6d8lb3q4qsbyo7925rhthgezxaq7kuq8yrksds113zvnmbkufeixdphyw3x3f9orzf8cwhbcp0o5abnzomgqtnsm4rc7zaaakgbr3na8inn4x0hzs721xo3jcw28u6wkkvn7ubbiaswdiuajlg876nrqiydp8t8heuxrd9nhq0rzh4fghmjfuxibb1ehb3ubg9eblw9g81yl1gxvc3gam3qdk8kxtlitx80n1qwid37s0ie12h4s2gmnd95iwoxoxi3q6cdl5hry3iswd0w60phn5q8end0a95t0aemtjb4nxsmchckqhnz4wu68xowem2eyy97w4pl8wwccgc8ihp5dpgf8f6i719kq5ywze17wqwfcale9vyf1gzlbptcjwe6pceh0orfeedvdhncl8rgyh1klxvn51686bymd0n410g01l3tfwglj4f8oen33umjxoyw8b4bsurfinx4h9tb4odqc9xrk0tlqha2dj6y6i6v9h8p387r66nko8o1ey7dzncmx8ro93gw5qn8jmac4yxv4c1jmtu8jbkqjmjze1n4760v94iew5wid7htjlzo015wio0pozckdqwgqowl140klg42z7jo5six0bzkdazhhanwbxfqo06jksugko9j95k4vjb53sy37x6co5dhe6vcwfxm5i4i22ju7ttjcdswdhxjk',
                proxyHost: 'pr2y52edqr1sw5wssruk2kkogyuj8hubo7gvibxo0m1tkve712w5u3ttrt8b',
                proxyPort: 9051929038,
                destination: 'l7arzkw6h9jyn36t88qdq2napfj99iwh04bjxliit5ohch7qetvr1dy44r69ro6o231lo3c2cbzvmatbzvq63y5dyxoi17h84eavjbvf1nulo92awwy4zmgewrcn1veaup02kdjz871qg5ss6f8wfp3oqqaxznus',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3ur8q0fzw9m6uemp5kjpuklzcawkays6nu4pqmruddn99va75hnrxtsohn06392yazr2tss0bcyyxmobop78ldu87q3xs491dbr82qxefofkn7swdk2rj3pmqjt6o873yb0owcgjkb8s2qaqt8ptz87itcf3th6z',
                responsibleUserAccountName: '9ak8fdt3tpalo08btgrx',
                lastChangeUserAccount: 'h9u6vokeu7gqw1c5tizs',
                lastChangedAt: '2020-07-21 11:14:13',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
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

    test(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '86104897-a469-49b0-bb4e-ef815dabf689'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '86104897-a469-49b0-bb4e-ef815dabf689'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/86104897-a469-49b0-bb4e-ef815dabf689')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86104897-a469-49b0-bb4e-ef815dabf689'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '2a24e6f8-ce32-4415-8788-c1fc649c08e9',
                tenantId: '5a8ef63e-e78c-4af0-8a3a-fdbe9ccf2e9b',
                systemId: '5439e42d-38bb-4d3d-af91-03efa4a76460',
                party: 'vnzzj2h5ywxkoxsh735mnqmtmtxfw83rvhwgba7fy4qjh08ty1webrmyg7dj3y9u5eboshez46vyjnb84cn057r0qxxi5dc258w9k3g4v44hm9fcffwacrx7u1o2jdxu6j5mc2fei1untamqrptal0mn2xmo6tn7',
                component: 'voclto0s58k53fkq064m91yrd6onlek6mb9ur77mutll3d35v8ybv81hcqmgk4qlh9uehkmhab8ioyr1uz398h1nbg8r8mkqv4vl4fcp1l29azstathe4vzrjs5gui2n037no57b5jkm1xmu7hfvyo74og2620zu',
                name: 'sy11tm5h3ipfoa9ry6ats518oa2j2sxi6mapg1d55pbes7d7mxxphxxp6k8by55xienhs0uliix3i2j4uovsz69mcppjenjcz5ynfrp7aagqlknjw6sksu9rn9nsc1kafoi08irylxl3vhbfukiv54aytb7nb14t',
                flowParty: 'ncp4bj8cn3vzbrzv649570s78xkljsykgp4hzhmn3fuxa2v77wu1msd1jgqski54s37wqdew030k4kcdzu76eub2svda04tyvicx2paw1dif1az317tlzehqsk8vpfyhwrwbba90bvo881frl1o7a8xqyvbwhhac',
                flowComponent: '98r2ouwa940eevf0f23ny14avuvn2osu3r72oug900eb9yzqe29s3ytnuzoflw8x3iqbfvg7zzt32f1yhdys1ybnmngjyirvuqsqykclj7kbhoyvqbu3r0xck1z2ndeqrb116rbdu4xaylrwbaio7ua18yhc2p2m',
                flowInterfaceName: '90g0j1s761mj2b2n9lmybq541gw42oefqh6mmun17lteq2erqnw0trymas1ghhdg1mu671cccs8zoc3ggjd0luc0b8zv5s1vntzdfcs5b44hx7n7xta8n4lyirihcab4iepry82u55u7c6lmis90hx80gj3jiztn',
                flowInterfaceNamespace: '2h4ijnnxgsk96vl3rwmtqj7w8pz46tszya8fcb4pmkkk8x37bxwc7n44o16lxnibejn27dgjvh31bwqjnk0psygqt2uhaf7tjtbivfg8ib91cdbrcrzwcgo3x7csmslvcucbt8wej99fv3km4y9tmbnw3rejn1d7',
                adapterType: 'jpt5t5l6tt0m03nbzqn66ak19hip3u6ew18ajrnsj3n7mg42lk4am9q9k65n',
                direction: 'RECEIVER',
                transportProtocol: 'ddhifj9tc6dabqij1rwgcxmnwcg7j7ho97l10rcjc84q1lctj1a6p9ej0fku',
                messageProtocol: 'p17hvz7htbc5m27ot4h243c9i4wj5d6p08slggqrce0ot74oe0jpq3ot97r1',
                adapterEngineName: '6ixbrwpk8xxw13oyc5e3t8isqh21se0npjecbcs9wd70ryypehq2loee3sspvlk64mcisobmu5ot1pyjuvi9tmz8e4pcziqh9ksn7qv8j9quk2ycdllyb6ytwwdl6vd9ow0m7mpp0vpei7fp5gacfsawuubihx0k',
                url: 'w1le22jphct94o8my0g4vcn4qs5p5974gp5w91fkuxte974bnt5p95j4ll1cz3wapcwybpuftq6tceqsnzhmz3lw4dm31w2u7itchpv161e2m7274aqwphefrufyts07q1sj740g9lgyrfhccih8sti5o4ab9ila831923je5uk3oy8e13o74dlerxnmfmrrcee6v1e3fflb4occ6pe7vctmqgz7hnt7x4qfz4t9yoozhl6g8vwqejycpuss53sikna1tymrms1y40dfaj24ml9gy9wzg55qahk3rwio7uy32wohub7pffkt1alrnsr7',
                username: 'oqwnf45o4geqsfajhvcofd5al70zmwhy6vtcw4nbkbgcf7wewjbe8gk9tl6n',
                remoteHost: '0psjgjo33t0u5kbiqct0u684ds3v4i9ciix84ts7botw03baie6wpmc3o86q20g0s0k6m1s5tkn6s39uycs8nwvx5uj7vqpq3n7z42t6tg0ad37v7p152n3m4ha4d3tvc7jfy7pgz6t406wdakw9nza9j5r8vxuz',
                remotePort: 2222607410,
                directory: '8l326rlhzxwwlrhxe240rryqzt3y9q83c0isa3ofrnnd5oqsffge0ttbdj9vfh1w68v5l0r1stfzq6ru93dnuraoqgikx84ua0jj2go5721mosf5fz1v9rfla86wkpxm84xfw009h77vjboz2080zd2jd76pnmsbfbc25gby2h58ts9zh95aeuoqomznp0bectb8jjp2kkileq104tmiyivbqidpq8ho3e56na5yf4cyzcus67a1s49rlt15q32ya6pf5ok8aqhf750z445ok7s506saen5e9fkfy0xil6yrxrljv02aphqqcvnvyowio3clb59bye8bf0wvr9u8zpphvc0nzzsi0tax0eusr4bv9jtmyfhyglvi5ppnynsjrb7fe0xu9klhl9qtplhcqdbcptqfa930256de70pwp3ghru123u8mlxk0gm1ym08akbf8cyk35qfc0w0svs1ett8qha09u5yk29mr2bvfr6b5e03i6cj8034kfq47hcqiv6yl8jvfe24daz5ytbgoh7661k2dd4a8ccso0dss3ip89csmc7yq99ait67kj7o07hwhjiunvojp9zgzegs2v2tak16qwzu7a1nsd8ysxuwdz6juehuomifz4hq2ifgfhgby2g9znvcrrhmjfh6vflbukkoln910k6wp7zex79k9uamj02enm72auppj1ym9bqzuy70t7dmvispt7yvap6gwd0sx0fmp8pvhtkvbonig4rruvudwk56c9lwjo3g8bamoss1swe07nqtt8gp349duqsofizjma8o0t5eypbnjborylyd5gffiay9trmwo4hiym19x5eluqagnriv9m9if6n7z3twpkyzyzxpxx3ewiqjuto005wxeavva00qhjk1iafw6xq1391297u0lp7n008a8yxe341j4yd4nb4swryaevv5233ddelu41fabaoszu2el5cthoj8gkd151drb6ptm2ysrjchzfyihfvh3r0tt35q77010wyfty0v',
                fileSchema: 'm4ex6u7ba7uq4fcrdrvlnk1oxxtl91kcc5e8insizjdpmzwt1utd7hm0fbvn0d2gdz3h4ttzuca6o9z00wvc3duobr4mxmwugyuc7utpxkfrpjl82588msh9cbocxdfvp4dm086iwthfy3febfjoq66wzyzo3isd1947ghrwaj6pai9rhrvq9iw94czirjkzbi2ar28glihpz03t1flewe62yf87mf2y1zdd0ghtk5zjb9hfj2t7kj5q6xcws6xubhovzsss3d88tc9aldhhky1llcwy5pe4azugrjmvoqv8su0wpieuikdymyhgnrh82f413nvhivrafzoe7ovxeuftt6za87pthcyzerqlz96qjdr2uu7slmpxglr10k9rrcmda63fvsshaxi9qov64hg4qvijincsvn9bty5s1n34yudtzd605t01fudqmjvo9voc3uref1swldagdlfq7faq67ks5yg3uf2njri7ttvm72e87k0hieypnujeyidx886ptp6sdsjxfwqnmuvoivozdhy7ofabn9f556yrhzrc0nqhg21x2uvu4a8voahh5mcty36yifyma28ph4uidd0oj1iys239vfrea7vo60n0bfsb4jm7hqxxz55u6pue9mzq1ok9rkjtksoky5a5yt5kxvw3rtnyvsvzox5zyzhcu9odlkhvu4cqopamh20h55xqahy34veti6pgh8vrof1z6pkg9o9kninsvnfgut5jmjt7u7fdocznk40kwopsidp8cz8sewajmjh2q0lyrsqyk858fmq7wlci6v6gfq1ams9xv2tik7fc73kj4g3w0ol2umlf6dy9t14vkozj12dcsx6tzbx6qlll3hyugx3pc56jraiyd6id5dejlox6e45j65s9al0zlgnecu49gjad4ssk6u5zi72dndhaf66jll9s4por9awdkgahtuzkdz3xm2kya81mcwhk9ztbj1uzsknjo90srgryvmg719upvegzaoeif754b7zlz7tn',
                proxyHost: '4ahur8099x7uoa3d2mi4hc09pk48ofu0tc0ev37ht3vcltjv152jurpjm14z',
                proxyPort: 1951251978,
                destination: '4vfqtn2z66un3pclywlzp5xoyll4h6tkz14i7co2veh5tb68cmji0a9jlchz3048uopivddh79iorxnv25na9ay50cy4xcyxnnvm5by7w0k65ix0k7o2xwmn08q748u9agzt0hs7l5fm4oj35rivt5rdddaq37fo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kgcba8874op3d4p9t24txtw1xy0ewalu17jxw8cdpt60zupni4ofbnxhxtnqols1kr3j497m19fynkg0ca0zfppdht8sanp8agtrayeewhwjfrlmhm6mn7fr1kv2u7atrldcsc9h9s6wngjfximohyanegy78jff',
                responsibleUserAccountName: 'mojpcof1u5ct5ptkf1ww',
                lastChangeUserAccount: 'v5pqny890lcns8f5z2zo',
                lastChangedAt: '2020-07-21 05:08:45',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '86104897-a469-49b0-bb4e-ef815dabf689',
                tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                party: 'ypkras4oi86z895ga4bb0y6wxgh30czvt8h6166tdrccc14z77vcq1qj9vujo0gev1n0793dzuwledjz26auuurllliupsmmm7vf8ccicln0a4dyap8hs0baartm7co67a1bifznfw4zlt7m8sr5n91qk5qsybyk',
                component: '4dr8gl9gsp8mnde718crrt4631ppas6nhg6d2ci1sano1rk9qpemlx8n7owhl7yiv0ltz6ssrqpnuzjmjw7acevh7y80z8rjjei9keq0u0mq5fczj6p4fs0ow64193i9e901zkvto8kkzcroyyo7wbswbofhcfnx',
                name: '6lhme4b5uq9rrsj6d8l7w561yt974dmeqwvri7phc2pckxznl9ebztigmy4riqiyvea5xw0alur9c0p6rab28b6kaddktpeeuolypq3pbuj34f7xn1xp5soizqujaucih3f8d07fsi3zatvfu9ggvta9x23o0la2',
                flowParty: '1nl5entynh2q6sp3seljbmj112dp5203ckbemt399bmc01vw9cm4mjlenlwt7ue1pe9rt076517mio8iht4o0g9lf2k0o63hfvcmtww3wvho09uq368pql5qqabz8r8qis6i5n23r4bcwj1et2df168phicsbcbx',
                flowComponent: 'rgq8rf6d7yilcdgfiu62qb9kjmsqmcz2k0clveknfngvacm1gccqr9hqagix6hu75f31xpuapv3bs251aqfvicv69yeyij5ij0igo1ggptfzkmm9zyfla9oxutv12k2hxc7yw82q0xbzasralimwltvjgc5qfzub',
                flowInterfaceName: 'tclzruwoq5owprm5pfjasbt7i7eipnn3jbucrsexfmgods7d8lr7uubwx1smquxc9tsmg3tpj6m50m3jaia7dfllrd4hxeb0xqvwrfc3eolcpt2dsu2qcktccnuv94xg6zyjrj4oecfh7kk3wa8tso6qg608fdb6',
                flowInterfaceNamespace: 'n3r03ql7lozvy8zbwb3ywwqicgzfai72iumbhse3gcrptkvlbzg6onllq7z5hq8jg6f0cdszqjyk1vgnh2si89g3kmf9lbmcnolrhb5bwd80xc6p8w94e41xyg6j1k1sa8p1zq0xvwmpk1sa27g0pj3esvvuxc2o',
                adapterType: 'aauf8db3tfc1hl8g1b2uqaiohbk3mfdxw0iqt64m2svwyghaiq2pm19b92lc',
                direction: 'RECEIVER',
                transportProtocol: 'ncehjxf4xvrmfz2g2pwnxv1urzc7mxpk5ep4oojab75c4cmr9s0kyx4qnfoc',
                messageProtocol: 'ctmdi6jyzn8bo9ccvi9fqbdpqpnz67eltrb17ho2z47ncr306smc36r9v0mq',
                adapterEngineName: 'vlkkaqfife4h8583tayh6oyx4d6d0u50r3qln6zra7y2o1bray7nxme1crz99fv69yav33ks1ny5xjrm6zhqblwxr4lz1ql3w1gtxpsml0hr6ialkgz4e9bz547iiwh759xh80iolynw471rhb5k5pkoa1l9mtjj',
                url: 'xf68n5qhxds25xtorxv4n4eip8tmgvonqe4q1mafcfc73e99of417dwbklwu3je2ibcev9ajypl2pexo64xy2871f5c5xtf9j611ne1cfjze5brtnino5rg1nmh5uhxdaikjpt1gipa3utpjbpkixcfh7jdnsg8taw8bnyvcwa4lc4tig2zh8a3odc299g1cxkr3x87cn8d11ngirlnn9k00by7zy1hstpyoy2q4h6spqv7ux9klfq08rma1xl497tj843m5h4c05ef6nxf9wc7cza7xhet269icxrhc1p1o1m7ih95ltrwdq9a31b66',
                username: 'fy6ysapqfyaloau3t9u5hkg9uctl539r9yhk931hefaicjjo7us33i635bl1',
                remoteHost: 'v4989kvhzu52wvxjf0a37fevelqbq8v3b20phb11o53r986jwycwk4z9imof9m1xuomohh7waxu9r7efek96ccbjh3h15sj5bhp3t167nckk61n862ln3xd3nu0g16jd8kmkg6lf40x505jbyzd3pw63umpbjkmm',
                remotePort: 6192430267,
                directory: 'qu56u1l7tf9y86kum9cxswqkrr5s72jiune3x4u2d6bwhpj9z131q3x9q6jz7mqopc7vohgnp8daeqbywcw3cc2o9sx1jp8xh67d9lq5psz1hihj88wgk346owmx22n9w7m9fljdpmcnqucrx86wnef6qb1lbnspba74lzg15uwpn7bcl6zwnc7eb2c6pe0w6h5nddo8hau7jx5dgaugpizyl54qp539wc9nusfcomdevkz966xr03i9fuc679ergzx27hpwj7awl2ah8a7zu2v8vluuitrj55gnymz47m5732ggng9cnbqqinao0pquympbgrbap7uwc4b9t8ofz5mk34my36nk869shrkmuhiozxbf4z215jsqiwmuy537oflsurk903e1vr7d7lu1xmx5a6w70nwumgcg57pd8fevv0l40ta4c6477ornpfctp0dbttxcz9v2p7y8ztl2qt0ig3geebeik2awu501weomlbzd0c92losef477blsrad8hy8i36w2wd161n9sgwu2zx6kal7zemcev317nnpfdcuig84fe8h2qacj94w58zeo1oc5jfvqhqqvk19qct0a2w97g1otrtgnv82a9e2efyaskisspvsq9v0ppve1mgs9h4ieuq4cbz1sys3k8h376czjmvp39jz2be0e9uxoqfixlmayoeyb8spvbum4kbime4ptivsuc58x3pdn8qdh8bgba6tf5x595qumbbjj982oiujfdehbahx7d2mr3w0reqfei7lufx7wo84oq5ux5jhcx7sebfm69lmdfx9hov6i6jwq7nvludm02pgq0spr8lehvwrwbn6qz2ux22s0adghwc73qs650b24bkn5n6wm3v5n8nzuswuxqgkgp3e783j606mheftyjq3gc9b0hdl9cilrgbdo7cwv8d2oei59crzs94q1au4mk52smejmz2g027n2bxb6qdt460ky86wai7iej89yoh0rfq8ogxrqhz17y1ezpvayvf291',
                fileSchema: '9ambrq4zrcdqw0kq2f2zxpefo20kqcs3b4lkccdkvdrpy7lyp88whtacux4mbn0chf97sgvpx7ogvsptawgilnz9kp7ckmwpjkefmnvnb75yyemapxhmj7upcgru3bdyzirocfltbjchmj1bkncavacrmoi0h57ymn2frlh53npazeq7jyqzsnx7ly10r0kerc8k47slu42usu5i2x72o6cezqiq0e3hc4i1n8714sf3ell7e6pd9oqf76c5888ym1al086g7noonvvey3359mkdtw3ih2w9fs6y5ebz2feh637oyrpia9fsdgyefwjxhcgo8yks3kkc1ijvhmq28ppoxi2hihbtkjwtdh0ywb2o4rtnirqwzhbt2w5iuecme10ohigx41wj2og5suky6whar8gaeui219b9wxe6yvru4o00n53a8nghii4odxoga22gfbrcruofxwicwohb1qoxyicn4mmjxk9g52z2vhr1nyy87c2moz8cvqkig2i9an6ioaqd13ltkmg1owexp5txg7cbeuhih03z187uhkt3ur9znohg9v4eufjy2q5aorf3wot0s9k5tq8yw6axoekxnf1xp8gxiqjbulna7srl7se8xiyt4jaq4g6ww5gaobdetn00ftu36syseecdia14ei4gg6ltggx2pjedt03zpxrpttgrae48mnihc3bxcttfhz27iamuzt6fa4rtg4lcf9h5fjt65oxwd871jbugy2f42181gnprl3px18h4aylu09hugr4pcde9q1etz6dv2izu612w20w68gixkbcw2otz0ze9usauopw8i5oywa3c1kc87q49b2asicfpg6zqe6bcws2m7on35ukzl7xr3attxqf4b2vqrojfx2i6dwy763se6ipaag16vt6snn70dz1r7se1494wznu2n5h7coy5xe542jmqhpxmj7jvvdcz9k2y02behk2rx6nbtygad63mvn3zetuur1uxv37or1rqiyrbxaxfxgugv6su',
                proxyHost: 'fxuf99db92ea9pmlzzgimfv64zf56z70lfqr4p0s09mmlzzy77kgkq0wkpwn',
                proxyPort: 6358276507,
                destination: 'caac9trzg0y3g3nwyd5rqmv3qq4za17g0k98sachjwj3kab5hypdd60fu8ykvxzlifyqtg3ehcv6784g01777kbygxqyragafu2468cebmguk3y1pizn4arwo12kpde40e5nxghdegw7qeeen1aj944h56a4vfag',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b7egjhsbbt8f84vpwssdmzqsyppsl5c5zvluw9tsfu0qfwcs2u2f052a4950x6vd6d8f2u1vm7l23nw0knv2g9c04iikm7gr7s8deuwir6x6fl7wgi2o7o5dbrkl20obarb30f3gi6yvpsejrm1z2uvwtxk04j78',
                responsibleUserAccountName: '4sbbioyvofbg5eiw7x31',
                lastChangeUserAccount: 'j2me8hmu8tuntcd4m5gb',
                lastChangedAt: '2020-07-21 23:22:45',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86104897-a469-49b0-bb4e-ef815dabf689'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/86104897-a469-49b0-bb4e-ef815dabf689')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '14d20f18-ea16-43fc-a35f-c079ab1b012a',
                        tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                        systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                        party: 'pnoyyqnkv1na0oo7mcrurfg0e0ex10fr86goe8jnbk4erc7pcnv5u0hn0edboam2agi5h8c9w0i6pt1nsa9rca5n8x8jieusipb07e6d3b7tv0pivcdh1pofer2a7hqc25093khfndmxoc02owxl6q4boyobz3n6',
                        component: '3arypcgstzef2pc4y22tv2gdnr5i332x66pb5gjkr31m33ig5rgmsde8zqbffmm0awe35hevgy87d14ylt376yt77kzesmac5rvvshuoehg3hly82zj26crpuaibgzk8ndjq4251xla19ux5cyo43jywltxkl7v5',
                        name: 'aaj9gvggmrj4rpdixo1f81k560qpel539pz3kqw9qly2vzrnb2odgfxci6leubp16t660p59hcqbcthxt2i7yyaqnmjrbuk5b459443mulz7hm6htzwihjkrw8a0rsgf9a11i1ruoq1gpjnsbg5zyifmkcpz2037',
                        flowParty: 'f23vdiw51tdiixbjdbcaxy5md5uzqiwh16hd3x39a51juvii0ydy83wut0ch4xjgfm26b4fhfl4ijkfvamv0asnbxxnuiw9lrkn4480s7oxb038nz1ge9v71tfuodcdxuqh5l90rxzyjzsfrz3i6o14jz6op0qgz',
                        flowComponent: 'e5ws41ytzryep6zg5184nb7ss34tdbk590pmwbwrfngw341mnxs21qfrwn63ba06lou73pc6xantp6wddq8h348j7sqtguyyjeagqaatvu1iaiy9vlihasihn00nswhb8j3erh9et5wjyq8ssvbept4col37pa2m',
                        flowInterfaceName: '3wlikdkwwimbff3f6vq6ru4cc64mu6zuygj004mbnpb150591hi5zck4fb1go75ccxla5gqqiq9cmfgl2lvltd5megorh22r34afvjnhle4sx2fmpoapqurf2p7zqzxkp3qbmayp9yahogrpecphpdfgtry5vzh0',
                        flowInterfaceNamespace: 'yp4hrjsea61aj1bbt0fjw45zoh1bck91ribl9vaum3cjdv9s78ch67nwue0z5e7gnhnw54v4lx9afpef3lelqiiwriae5x5wkehh569q1lg1pbg4x47xbtxxlg1bz5l3kpufbuu4q2v2tv3tpogh3rgvow7y35zd',
                        adapterType: 'bdocwmdc7vw9t3pm53y3t8cwlrcj56copxp3z12a9anod295gjqbv1n3s9mj',
                        direction: 'SENDER',
                        transportProtocol: 'x0vru7u2is5wczl021wyxmfqwig4tq7oyiy3hqqqvu6ej8370eghb0qmuyed',
                        messageProtocol: '9gk80mf80ximvimmoarytbg96sw9l02e4mjwrv51xq8jw39wh1flr5jqzhvu',
                        adapterEngineName: 'el8obxod83er4n1h30b6tmwb8a12kpjh1gvql6ivdj3vx242e3chuh9ki7mki74twp07h64k5ll0a8kq83u8azu36gppp581jfyl2xcuu5639dq2z3b64eyy7n80b2mdz9f5pem15e5zya92jfgj2jz60zgekgb2',
                        url: 'iqebzymwmzvqe2qrozs7uitcv46f1bcj7vkg2phnzif1gupccaw82idx00vlwxv7gvfb2q508859yaw445ykp34kjr8m425mtew4ille9s0p8ytrhztje12p94syh3o2jjvvw8q8esea5ex755l4hmczh4agt0z25scm3sjqbr5ro5bhzh95dxzm4hy8v95gulcxjm5kwto75eo6yxablep1i4rku9v8su7zi99kkjo2ev454un91p7hnglxq7ty3eywl8r9r3mme7yfffa7bldftvuen3utucso0uwbcx5stki3wkpx2jnxo76fq4uo',
                        username: '8tiylxc4r1cu0xpgyqef6wuvbo8zthrk1ujzk1vblwhmjxlwuj97i8sji3s0',
                        remoteHost: 'w9m8povh5tskeq09qqzy4pxh579mqy1ffi52jhvqvlq9gyg1r7980duse45zkliuvl0kxh0nu947piriagp0g9yqf2q63895hwyq6jhxrbbwfktmidf2xkne6ice5kmfq41e825l319uw813v5fama3wrdii3mw8',
                        remotePort: 9166403428,
                        directory: 'l87gxwwjizahd8det12ofch8v0z9lrulkpky6o4gc9klte2sf7msxd8i77n8t91qtuvfw0j56t3822nn0phlq60nluqswdqloukx62cyw1k3d7b8dd8ga3ndoq36xwtugfmy76vecx1dilqeulp3q1ikyv1tu7qcqn3xoyej3ml7ch5psx21f6dtvt04qpcr9sh4f4556eewnzcao5yqgzqqnxu7917zzzlt6lnf0ekw2jgbyg27jhugdjgovrn0yzn1cvpuhait3tj63r5zp1rpj76ey0296ybwcbha8k23rqhtbny40yhlmwglw7my21lvt4pjlfr6olmfmsojx597qtoiwm6lne4bwm2irfh4il203z7p5mv0arywgz79us5droerjewj7gqe569jljfagl7hx2fzxe51nipzk3fo88npv7ff3n7056nslux927gybmw821kqa4jvd5q80bwlokvdr1nvz53zll1blofe7fzjmtd3mid6ymhusmz8czy2foiez3o08o83o7r7yf8r4vobkhv0mzeagu5leg8hduc2uxapgngyldt2jlihl5rmcqqwezf3ppcaulklzb84qozvv497kw7oec6stg0oopdq59ndfdlk0isjptce9j8pjpoebspg78dm53zye9h2loj0o764is0alwac1apxdps0db56ph4024xu2zosdzsf419q3h4hh6hb6vl8u87gh5ak7g977yfbfedj3vcdulq5jiezubt1xw72imlptil05kv6mv5rgi8zti2lteqk19s63zi1jpmnlha8bj6tal7qdozbfvcme0gpyzl8wc7ivq1jq3c79hxmczx1uu6fw0bts8ilrq6nielirrd6ty8nr0cji6fzaqrrcitz58ecfrqhe66kuhv3fnsawmt5s2tusonoum22hdmfjeysvsyg3o80akzmf4mbuu53ul0edd0s3spm5dsvfuhb1fxosijrtbxxgci7fxuhjdk3ehzxxtxr1cepwo268sc2',
                        fileSchema: '6kz1jjlcsefkjqn0vqu2dz0ize7zwp4wjeqn4loilzdk4av9n2sqk5y1polmr7erfmh9agkx1az6mt4s2ah6xsyle75b5arnj300l44na8ku0b27psiosx7v1nl3ijny5wmzjtu2yi9dp2quaqrnesl5jpdzuk4auaf8hswfq5hs47df4blbbhulc04hp7u530obiq7o1py269de11vsv71md9ntwowz2qkpz3ftofip29huwhzhcwlcuypoga60m99sz1twzzyllcd1yysuitl4fyaoyjj5hd0ci054rlqz7c0gh50n63qsah9gxrpq9pp49dvk3qwcmgbcmrjf6iph9az9z3cx0avd09dynfh3ahp3mqxoli9mmimsim2lm4v56s6f15bbifdgw74m8qqkojv8335ltrpy50a3wwy4syxvlbcuj571hkniz4olli6n9fdag72zi00tmsfz1lzjrztuxpjdi893r0qtq0hthgw7cptyh3lndzc7pckkedw7ohkvhblj5xorcmt74ir31yob3ban7kkwzn6z0jfx927i8ns0d7h0136fro8sewg404nlrrcrl4p978isfz4m01r85y7iy1m3f3ge47yqe2ysfc3dp8uj1h7u3y0ctuh1i6rxndjpdaakvixrul2qzncxkb1f4k4lxfe3rczwog1jvx2nstphrivf29j64zh6dvs5ln8xr38r4y329auffmv5sfrwud2jh39gbml5vcv8k733rwda06vx7bl3cqcp2fpblgyn50h0ddgrlnd5yhv8igrrr3qjfwy9i2s6nn6gp6yvlz9yz65672k245ulg5yv4lm0c6hsh1a3siojd8etek34i7c2hnxz9w3vtbwcet2q1zb1hudjeojondnvzyfb5zvt5vwr4wzyyw0uffcdjr1p9nzlwz6tv6npf5ys7w3i7qu7r5ygp37a1bi8baheu3cl2k989ak9l5tdu3fvxpqy1b2e0m1tondmwvql37r9alk09b0218t1',
                        proxyHost: 'ks6tjmw5dx8du47azcjoltvgsutuefjlj6t0obn4o1xbh8b1z17f5ee873s3',
                        proxyPort: 1624924624,
                        destination: 'kyan6qba6lkt6ki4p1ru8riedzldusd8k76gcntcob3yxu30nm8a3rxy1c3v9tozzu3lrs3fz450ucrf9wqrf4nxi5kjwke3b9xzv7j5yeuw5mk8z7ceoylqn4c79z0gkml88v9x251d1jtq3uwto8p8gehkqpqy',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'k2fwljcu3c50sc7bvptrm06e7tbcwcli06h5ph4p2ryc7aj5mt5wzjrtfncbxw9talpgrrew697yesvqsvsh0wuq5mtnkj0zeg8zw4j0e0zzzmtijwwh1yeui1aslk88s2d8rjtn3iw04x51uaawxcxvo17qvwql',
                        responsibleUserAccountName: 'woley511b7ojwg2gcm0l',
                        lastChangeUserAccount: 'n75dm2qjwtj86w7y3zlb',
                        lastChangedAt: '2020-07-21 13:09:10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '14d20f18-ea16-43fc-a35f-c079ab1b012a');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : '86104897-a469-49b0-bb4e-ef815dabf689'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('86104897-a469-49b0-bb4e-ef815dabf689');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86104897-a469-49b0-bb4e-ef815dabf689'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('86104897-a469-49b0-bb4e-ef815dabf689');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd5260b8d-e467-4699-9a07-1e8fba3ebc5f',
                        tenantId: 'd614f17d-04d8-43fa-8297-bf17d36ec490',
                        systemId: '7f84a9b6-2d3c-4ce9-83f4-7fcaca26006e',
                        party: 'h3p6mhwqcfethrt3lidpd9qxd2joguldikkov5y3n608ax0znn1i6yx7f7dxrckbaw7ddcsauj83y19nposccym3ufxemzmrswnwl78la1d7w01ivl3gldjts5j8dm3k9e7d7p3limbfcl4nwe5g59c3with93b6',
                        component: '793crj2xm0p2b5a2pkvu4dv3ekfnj6eqmsl3n1xjy0fipjkd92z34tmwwbq5g350ybknd28jlrnethd9ztln5hayi8uzzbrsj21izabca2grkjnsnc0u48nm90ufv60v3o7kcifjso5l1mfeokwvi3t7focgr8c5',
                        name: 'sa730pn986vnsrq4o4auj7nyfbckobtlcoh61mmb6uamrwis5nfysolhgfjqqdunuqjg9a663zcvir2xquikiwtxqatknyev8c7jhgqbwr2fhahr67hn8w536itkx4vmd4tugl5sid869hnlbfr9iut8em2xmda2',
                        flowParty: '69b41k2z3yund614mp4lc4jrab7rqko6v0ywckgxbnwmahwd5dny7643c3eis31p19vwcpcdzm4v7fmqwq8wcxe5aibiz6fqkj1ps358mj33pibdixcmhtu5jf4bhcp3iafp7y2a8lmojyxlukqnm8ikd9ajqdn2',
                        flowComponent: 'w8mo562ictc9qstvmzci9kzk89xdrbkslnsuaxgmzmajkk2bz9z8rm347zpzio9fv50m27kkinz8ceh5h78augps2hl8lpvkwoyf6lrjwdfchohnw79j7zxyk4tpbo6js8sflfyzkmqag1bmrrdfcqfi01k2yq62',
                        flowInterfaceName: '97sgsbvl67zwy2glland1nm4qkqmx8bqldugkks3cnjnmk6lrpfaxyctmtlqzsfkxr013htqyy8l3bsfbjgs13v7r0cyoj4feegjy1palosbm1luh2fhwjgm94e0fbjm42u1vtir8w7k2kaidyw93sttpotwi3oj',
                        flowInterfaceNamespace: '5jl3bgx5i3ebh4e8npv7ltnyykyey2d36x1kdlemifgxfwey7mrxqiv4kw9cis9tgi8l8cohzesox6p8gzwijrwn3f8x92sub84yjoet2s9ukct93sqbvqtj75ll4wylm8xd3n8mtb8l9sbqgwdn36uupnv9myg9',
                        adapterType: 'szrfl9prxko70ak7mlylx3j7nm7okn7tu4be2e68c2qrewly6nf1f50pmnd7',
                        direction: 'SENDER',
                        transportProtocol: 'jd286btg3hc91umv5ojh4bcf7vx8g5o1eb6wiiwgkoxhtjblro9hotlveifr',
                        messageProtocol: 'gqfkcpassb6fqfgv3fxscvzhojs5go6q84y2ose4tosnx4mnynswtr79kkgf',
                        adapterEngineName: 'prjh6j2qhrnqwkp9nzkzypr6979tfprtqdjag1l6kcxfwdg9vqnrqnzrqse7rc22bqz0a1sluuf1wm7inqybnoy486dxzlyem1rdj56gvs0ecl6oejsg1wy3hashx4fnjb3qmuud7hi0bpt2lyu9kwb8cuu38v3j',
                        url: 'bf140xtxkc3pi622mbisahiwippysfx9wwczjeuzd6i6lh0gqdo053cxf7nt1jhh4ipsx1am88cnkt5qohi1r0yb94mtpu4h6vfe4svtnaq16wr9gb213g0sxenpzu31ju6b54fnwqj940c0r48jjy1wxi7srdmgbkoinc2rw8t74w4nvkgbvspmugu0dm0ue7kjsgs33q2h1jhbmrwbmnamia9r02smzfi1i0srhse7sg1t9pesfxusrwbbbrqa5gig9oetcelswx36ghqj3fbaydeqiooxbz78fj5j362b91wwdn55ay1trtof7rda',
                        username: 'rfvmgnwoi7ejtg7op7xipi05h2uc5o35m545zl7ph0jfo5phn4jpk44psnpq',
                        remoteHost: 'qsoh4apbzd7sd45viqxi2w0kffv3357bgym94qshunz0mcqai107zhc85z8m1np3df5isn87t7nrnzx6rqeeghc30b9b7yet6vt1h53br02t1g97chzpyxy606bh3lklrd9tieyvr6kdghe32agdm2z07uxg7fyh',
                        remotePort: 1261622870,
                        directory: 'ca7rbyxu2uuwaf9xylrjh20ck1rubr9luwvrctgacr51sbjgv63ereubvjme6zi1ooq0vibzxoownfzdldvm7bwlqbgxwdldf2kjlv3zdm76osci8azti3jv9dhin0wwapa5hasi43h4vowxqaa8se3rljlskbm3z4wp407ax2pwwpqoev108s410zsndgqzzgdcsyalertfwux7v4g3lzvbi6ylxb449eo5tfeibemggb5kutolol62q33dbxlp56oi9kisxo0e6utfjgoivav8eidnf6bfcsd78mlaocaekqip65pn5t9zsto0ks194w245q85jtbsd3docvqz8y0a1ke5vcc9dtbb9q4kk7d3gxo8qyierbbtvzlvryzblz6raohdj442onugqf6bt5szkt0d6ledsl8sdf537xib43b22cwkftbx4v99ssrm8hn4r0fhqytuuo9zthhs2p7999tfc6q8dfmd1zahgof65wkzlf7jtzbgwdp5j2c8hauazj2o4n8mexijrmeo9j5e2p2v0xnvr7jmwv3yikfga1wvexw2xajyzq5m1n4b48q409vsnvv5a51uqy185jhfs81mflj27tpn11rym1xd32l3fi7tv3g5470utta40ffluhu2i0puvn5mrdo1bv5pymsfvdut8e5cfer6qf9ugtbw23ic1leh2wukjg0w0r49fhowna6x6n9lnk9mhaetx0xmy39wvk3y8o8oy6otivpw6li4karf7a2mgk2kc5y94h010061tb4tfvrmby9t4kp0lebc897ax5qm5muwi1v5mco0snayczoo4ow3oc84ijxvjl2aqlh9zbfms9dfsepv4fma461n3zplh099mgt1orw22m57391qypj08xegp49qm2of1d2xqbsx38nvsinmlavfa0gkcud444f5cqqzslgx86e11332bap02005vz7yztdrq1obnf9f2s8pvvq8zlk9lzoxfd3gfsas27k88q57im032s9muxat',
                        fileSchema: 'unr2ndlygut0hjvo2cynuihnctt78z26kqo6ncckau7bedv4gqw82uzgq4wz2611e7ao8x7q3c008ymbik3q27wd0tnawvpxpg8kkb30ebrxbd4erq9yy270fhne6xie7uhkuiyau9fst7sh44pi1arhouctf3eh92y34gkm9e8wuzbbifh5irk09hetleufxacxuzsowynax6p1c5tansa97d13p7opzrvq6bsvt08f4mol5ntbyv3zqhiv81a0q6gx54vvjnipzivbazhb4ynt0dholst4s48gzjyvgal62cih4ytqrif3mr15mhoiorf87z1vn6zbwrdubasoeqvqglca7z0wyk8n2hu3sxwcm9fa41kck1d9d00oaw3law6t1bnrlfcbpghuu3s3m6srp1zag3hb0noerj8rilgrly2k06xsao7ev9vsapfszbh632bdlcecso8xllrh33djerrmhjun92zwdwbi95i9abch069he3hpaleydw7tnktf3q515qrfrpmpuqw5d7k49fygbblplp2z617pahmg8m28aomhaaywc1qwcohc8no8v5x68o252tspxrfljfuhic9co1njjwul8jjftw1jq22hlmsl8wczu3t6kl1k3ryiq9pf8cwgvn5x71pb9hnuauygyinwdni4sjjhrc7rhlc1flo5adec6d0q9kmpxtz7t903y8f67yr6ees1wpeuhcka196j2onalvrtp8vbi8a3wqnt0oy0jdfqns3s9ps4owut381sn7ttr7l9m678srx6gk5mf6t2m044f1dm4lb58u5cic55jsb92jslugng7d4k838rufq04vth39mf34qkg9o6egyo6edirqqi0fvlcavnqqf4qdudh7fz47n28fvd037aay4qqn170iqtvonpzy3bxqbb7od6ukzfnsba098wiepxzns1n4vihf3h6lc7jn62rn4uviiwhg00b0tajr0wwxb4g5zhxn7a431jx2ojalxodurj88dq',
                        proxyHost: '4szdclw7xcu8jaubhh9p9rs62b8eyy7jqjnffke1bmpqyr9d5rr1f72ovy82',
                        proxyPort: 4279278827,
                        destination: 'vjupqgqks9jgaq4wm1ijzwwwtj0bhj7qll6a9po6rxcz7zsisq7y001qquydnuo0a4wiq2k8cusnjeze189o7fntrt1jy9h545go78bfyghs0nj0fl6ilsqlx0y3vnw95ifup874kdx779se1yyl8pl59ckvzybc',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'f9e2q8r5ccqte9ylnj17kke37o2seelia8pd24k0n33mcg2ghuocr0vyeszucf3lrb9cz9ns40guumes4ypr11gajq42rfyp29b1gea321ktcusiguchofich6oh7t4otbmsjfnjltqf4gfyrik7hkpl30y1ht6x',
                        responsibleUserAccountName: 'daxorp1mhooouk2ri7v7',
                        lastChangeUserAccount: 'vzkjlm8hceoh3cnpxha7',
                        lastChangedAt: '2020-07-21 18:28:00',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '86104897-a469-49b0-bb4e-ef815dabf689',
                        tenantId: 'c06d84b1-8c3d-4989-908a-8f1ef53f1521',
                        systemId: '74c4b385-c908-49c4-8490-79460d8816ca',
                        party: '583yx0go9c9mp1a7ow2rmfhw4tb0jbaslh15l3lmvo333igr3ftgvwowd0qt1x8xk8kdt2nudganrndb1bp5646vc3hpneipsl2jqsg6jqm0hvjolrakzocd26wj1eo6pffkyfqf3pagmks27i9xm8h0fstez716',
                        component: 'ydmtfk2tfbr3l1c5dyl613jpwsic1az5d7xf36nkit9ymmtba88zbds7j5tgsjgl30mv3d68r3gix059g2illq14aldvkxprgygl57im26v5ltliyzu3d3wwdcjruolkhqtsvgb4nd9ckoinb9ep0budu3uucn6d',
                        name: '5uqm1blegm5q58u1sulpjvgvjmvmhm1197mdce211fwme4mzd0y5wyne9jmk31p68p8t7l5uj0y3bp31n0m7m9ji5bdrq9n0nc53iy79ex4orh32qn424383mr22jrl93tq699gf0r85tnluz013uz4awgu9o68k',
                        flowParty: 'nsg5vqn4qcfm5tcj62ct8efkml82pwnyum5j0o5ajl9rct25rvssctwravw96ft0fse0nuxmo0bwvxtgs87xno848ljh5oas6q1s4720qq2o0c6q2s8wnskca2jy3ok6k69bep62gfu1m48o1uicqebhrz70mxiq',
                        flowComponent: 'gj50cgyhwjla2vzkyqoekwtytgmp5p4u0ah1nd2ywy5rq2z3b8pbgmbivglvby9wt7zg0qtm2jbf646f6wkkvjcxp1zpscd2xn6srlv8rjbur4c016a9mqorurmoqijvpcy3vksowgb9jd3ivvj02jg30z0hojmc',
                        flowInterfaceName: 'udyiz07rp4wnpfg01u3193y14a5nmkmnqb5r6gmr59lj2zgb7p2btegkzdnixvn04qlpcpgyxbrh9i75xm3zfpf4l0vwgc7w1ofcfln3qqzordkmbsp4mw7arnpdh8e49fn3fvnac3pc9ghm90nnc7krp9ksnjab',
                        flowInterfaceNamespace: 'gcdhutuagbwvxvltjdhrw8prege3f3pwqv5ooqiep9xyde7gt7lkcyckmc58zz6djbgbl8gvugh4zol3u5bynb17hp4a8yix72gkgehj1gmb4a64dmbs9vmlbonfh1vq76x22ar8dhtsewi5eb8dj6nos9abkhxt',
                        adapterType: 'k6gj1e2r5st8dat4k9zkzic23q6dznrie9q04cpzsukqfmfux064gos8j124',
                        direction: 'SENDER',
                        transportProtocol: 'mz5gg2rk1kniwsp4kx5asel6xaishhp2ol60c82us5dxxwtxi4c4zdikcxji',
                        messageProtocol: 'cuy685fosvpfmkbanp76bqwfk1w3abu1nr7n7wc5kqougl6uw4agdn7bvsfw',
                        adapterEngineName: 'jaqlbq71d7wsyshwr91nkt73dcvcov254jq2qxt1d89ie9qenj54q2cn64fihwvnzcjql6cslnnt0lkcm71peqgkk2t0ksyedzusos5z8bmm4f1phbp0t9pyel1bofzbyfqyjj3btyi61x5ho2x7rgt8mcu0463z',
                        url: 'tcp3i6sjg5ghpi16hu9n0wossc4csojl6o0gi9qlf59svltnjj7vejgvtv6jde9fq11mib8nfodcnez3zz92jg0u2keq4zn6hfsr0jc303dr4b4dpiyiel5sfaxr747w2b4jmk9m7bt9zgev1bagx2cgdxt6ux15cduqif4h1mbnfky6qp7khxt5av3csnwiq2acp6vnnpr4tud5werrd8691qg963gh7xh8cd0ze2x3nh27x1wajx93s2683hk6354v39p4t4w2itrsfc7xldwlm9u0bln8vsu2t4pt5xj121u9u86tm5usqsr2sm2y',
                        username: 'jfmwa7smfqacgtqb7rwk3ve3lv5a45i0o8yja2jqst5e2qhkbgvkfcvegzsv',
                        remoteHost: 't5jy122elnjoh91p2nm6sajhildwaag8uwgtczl3qd3x1bcp2qnnojhkshyjjxp5zz4q2m3yssk4p8rd0mwl3y3ffzte062488w1lnwa1i2ltnvf6sm9a5i5f68wa98fb5ra9k7jixw44xu4dipqyv5r9pp0nm4e',
                        remotePort: 4291090802,
                        directory: 'gybt2sx286zgcqmhhsau3h8nua0eg0ev00bzt4q6xel2988b5zwhnhoz18fk3k35hue0vxerxeistvmoml0coejzyhrua1cj2rnev3jrve9xi0hgnde7ykftdn9v7aphdgvbaj61ic67kqvvaxbqhmgr7cwcvds60r0sbkq1ax28i1a821qgsjgwm19i4ybggrfhayccuuajc9wbri0q1shd8q01ezeincd88ket34ejl0iwep9tg9f0a9nx0ivgj9raa1h7s4w6i9o14o7hv468md7pqg32n77yuqqk6t39yyt0g5byyrdj3qt536d99t8u81lxbsl8wkxqlgmjf3jyo0zhbn51kd2emkg2t5xbpluos0dd2p4lv6ysp8cltbd0rvj9omspc998wi2575o4hbxtkwo8sb8ve7ka8mlxsm2nopbu66g9np39s6y7y337vsqgff69k5ujybco8s11r0xe3l61izzxck5h1id28g5nn904w7bjpb233q78llhuch1624tl5mnrj2hdjgjzoxhnho0l3o5bg2x5n7f458ecpwfcomeus2kqsfqeyu858fgwfw883w6ycdiykaf1hx9p7jtezz19yeo9msh3kncx2pwe3pqjtgb60xlfc3e7w4aojt0r1jojmlfuqaixwwrskzuqdhbek95md54it2eo12ejnm064rlzhtsyws20uuz34dszwfko3f7e2w0fg0ihtmlwsj7c3d36wvt18g8pktcde30j1l1qk3qwu6rzi4s886ehjlnem4komrory1w8a3ldnz5lyobms75ioto5vhtnm8pok4d6pazp1m9sbs7thjgwnoyuvz8kqweip2aqjguunjdgg5gaazudw31fpox03ckp9s877pbshfvh9ytal7srtdiu2zaoi7dagwc86nfe2dpfoyrfbnhuf5tvyaf78s8rjum6cxglklhafjowgn59v9rxpmdvs03vsxxxsi3qx8qeebi8zwus9ajuvjm4gebmehdzqjcp',
                        fileSchema: 'jh6jafmky0f7dynj7tsgwi5vwuvx521jgqp4ch92b74oor2ccv5u6miggmtsmfob6b77elbktjzzmae66m7fpm57o68pep7hkiizcs3erkgzq4sgeo5y9wnchg25qufw5ymg0ghvflou3gy74twfaabh2qpca4xi2ksx8lpl9d97d0m9om8h4nls2thnysw3526xq6y828iqz5xcqhhl8pqx0je0i0gsz5p4a74bvuewa2c3ls8n6bbtf485hpifzbvhdgbqklr6uz1v1uz8zt13jkt3lzmoesc6o2o42d6s7t10nu3680nlwlnws6kmlj3nsphz5lok3rdq0x5da0tqxvrr8dfv1j6lfg7ljdmwp8qi1lvljnxg7uqgc8gxsa4nncw3rzzdgdmwhn2ja6g2pwnbi01ta3objwuzcskg1fskhkzn3x1znzjbcusxbgxex85ts3sokp38ia25uwnd1tuu3o89totl3vzqw25h36tnm40vq3fil0jertnzmx37mn80xr9aiegt3kvdafzdsww0g34aw2olq5r8d5lymts74afuxxe48ns9j36m6usgolwh4yfgika9yzwahz4v6321h1h31ovgi2mfalct2vzm9xscbt9vs5g66hll7qr5popb25cqf2mvcp7p8fewyfsvyvv0rlntexfebxdduj27dybflzqsiu042htsggozwxivuzebaglfk8qscg8f4qtegc8iqoufl9aghdq375lituawxjmym7tx5ojpboi3cujjwg6zzepr67dvq6vmwkti2q17mfrdors7yzvajwdaqerw3gbp4b0byqd856dget8d4u6151gw16piirhv25oai1i5rtfymfquhfg4lbi5v4tdrl9b6rnfof83hpu6egnvkzoqa4py4jx9y51oozv3diggxfrpb1i48xt6adqobjo99wqnkr84htdze0lvx89z685dzozu7gsl6kcjktevume252fkisf6crk0fiq1w3110l4at9hxbobo',
                        proxyHost: 'i0oo594za9tb81d373mjgg0qvlsflfemsw9zikp799tpgag84dp1jx14o4i9',
                        proxyPort: 2951166036,
                        destination: 'u56z07vgczcm25x8sjvbbtcvi5lvbwugl1yu6c4jmqqynp7r5sp23xmu7q9fyjd7nfo6ixxcm95ksnzn7bmzt8pwhnux3rpat3nk8ztat9y5vi7lbsq2ohnrw9j36w2oseskzj8ynexitqdpaurntm730wd3n3i8',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '9ys45w8bvuzspglnp3zgan9wbhp35coc2ex52rhxc4h6lk0u9y3u0x0vk3wl39xw4kli4rr9e4mu1fabaftjlp1xd19zd46wqh2d5r7guhnko1abyftseo9rj84xhxdexe08u8g20i1zs1r2lewip8i1lai3h77d',
                        responsibleUserAccountName: 'ki3dpakm6kjb7ak1gdzg',
                        lastChangeUserAccount: 'jgbupjvoez1nqnz9izqy',
                        lastChangedAt: '2020-07-21 21:07:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('86104897-a469-49b0-bb4e-ef815dabf689');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86104897-a469-49b0-bb4e-ef815dabf689'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('86104897-a469-49b0-bb4e-ef815dabf689');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});