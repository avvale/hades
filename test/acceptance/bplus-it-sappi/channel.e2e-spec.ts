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
                hash: 'fnpgbe4s61vv7q1zm31w6cs1x49jly816siyvely',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 's2ohfvhx3zqfmaloy3zhuqhzdb149aksno6goc62o7zxlf4qvi',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'mp0wwa4esdl1tg1tqgv8',
                party: 'r2i676y59n35dj8cfrhdi4s6rf4x8p28geq4pf5c7p2vl3eninxpd2simc6h37kgkf2xail6d2r9lysbxrbawkbmjihi5emzvjix7ifqstqgdquesuyel2tcwza1sir3wtr1g8f8z89om8fa6tquxlwgpufdmv3y',
                component: 'l9oqcdeu58829hanshpxd5ruj60kpvr7of5hyf0ajavks1iww5jyjt7btoq3459t0epo4g1ov7y1mpjit8ufsjvrq3zbpygu2xobxgckc9dbie4albwwz5395zb5bs0bzpwpiyxzbssjjmeao0wvt3aergq1v1ma',
                name: 'fytam4ba0vf7s3yl6lbnxpwxli9vp4uo2od8pun8ccp55gv2wflzdvrso6zgmmxi5qhkixrcceywh9333qyd532cvzpqdlpfhratp1goe8su7pru0hva5w3ziibo43g5qwvvo0qgw6jlo2t7rxdn2xj7kqk371kp',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '1nuxs4weramvvmhbnxfmz9abjfz6s3dnq6ghg60kfpygqeuxi6or313wfod1pccjt2ar024wr11da9jfemr59laphiqau73aetypzde5xk1s8koi9pi13jclpkoa867ejhuew3nmphx6p731u92banny4hhue9ho',
                flowComponent: 'xb8ii3fbxncxrp9ld249myzrnt56mc413tsqtnnvini81jforjy4zq92jenap8dimtozexrvbh7nbd1ofs7tijg9ay62k17crewrrnp2yflu9u84dz2ldz3620y3hext2v66ur4urb7hrex1074yq4m3mv4u8o9v',
                flowInterfaceName: 'k63xhat39vj5r0rtbw8sxfynx28kekxla96zj4vt5nh5kll12veskmwboqs5ub8ceazbbw6lwwkw0yxahfunixahd2844roz9uy8pcrwsdjm9xttds6me82t7y0u0ejcxt2j4oix2zg776sk4jyla81onwvw2g64',
                flowInterfaceNamespace: 'tm1v7fsnqm251mp74elbhdm9zeb57zl6ydmmds6utdcoty9tpn57m5mu61n7u2sc0thpvh0xziubvxxa4fpxqzwhhmx12f68qckzl5u2uikektmnzu9bkj6tocoa2aogog142hcrvmqjezngxcrhwz0b54hmpjwm',
                version: 'p5ytj6kjbj3euyk4sbfa',
                adapterType: '0yhetf4c61qno5ccrzkdhy1qr0ycknanz0aoanpkncsc6glr3170wlj4hygs',
                direction: 'RECEIVER',
                transportProtocol: 'd8n8t021bd31u4p4byepmd9rjly5opu4dc3tcsthzoaul4iv6f41rk1z0qyh',
                messageProtocol: 'ets6i8who9jb9hx7obup62n6nd1y9j4ndynjwgplngrz6c0aqhxpasf5k4qm',
                adapterEngineName: 'njdk53eawbo78pxenmf5w6p4t2lxprtdzemwptl9vph1daa6nk3jwt3acntpwa06qm8xfj32mebzpttgk7ot06l6t6xxgo7ra4rt3z29daue0h0db0nlsb2nv021hxia3oof2jiiguq241h3ka5iyobi0qjnb59j',
                url: '315tjppvi0i27726sdh4cdxitmty5rqvxis2ugkhhxuirh41wdlesz50k2gmi4tfbhj5cey7gg0vrtu2yqj0bb92e77t5357q9ir4lfg5yt1wjiid6oo0pe86moehsyr3c9z8ewlqyzjpvbee57o5emwezj7hgj2zu6ilchk6jp2wbngv5ipqk68ylwun5y1pkhytk627rtstuk5hsxfk0gkn2weodaagotbw05blrcw9jvw7y5ls469qwkgm4m26lpe6jmrsn04om2hdwv7egp4bxdbr3ghj0m0gchjoicp93901n3c3mwmnohgkpqs',
                username: 'xxd3ceae8y0jfdliooqhqgeaa7lii3j4kmhyq3xz0truo5u63b4krlix0rzc',
                remoteHost: 'ckp09kvr414zlx9s7buxshjeawobpxpb0t45jlipiooyrpyaiml0774iza4p2v2ymtzc72yghqcp0imfviqtw4ecz37lu89z0j3f69aps8cpd5ka0oyo427dxgadqt3dr9c46xwmlh023viyvgvz4kochtasapsb',
                remotePort: 1504317706,
                directory: '19pcw2e7tguhyomz3i8n045hmaxe2wpa29l7mka6u6q4l36rqbw35q4j3wphl6pvgwbakyvj0cnwvvxv1hntbz3e3tuk4rcuegmi4jpf9uijja8ezqy4fltz9k273gi29qp0vgwe0dvlk784ki47atacr9oei18x4mt8l6516tp92wwjdweedua1etflqn4dpvbqloouevzdn7pko96kro4opq3e3twqe7bgw71xlyrx0ihqzgjisqof03xbrgcq2uwpix427ithgmf4kdsn33752tfv18culn4wp8n7uckjnqcjgzpcw3nx1a5jm0hq21vo3j360prqi50zdc6815dffo55y2661xfw4wb83n2w3i9s2tq05uhlgsyr8kz9kukc72q8qse51g9vswmsjqnm9xi9l1jexazaz6f02ykpeu46a9k58if8m1ymildawwu9idmhtooqmfrgou36u6w0h9av1r70ejr05ml6jui4txna7yxngcq0nizhe6mwprw03atoe6sj0w3wxhwvgx605aun0ap88gofeg782l4xzkldnm61k49k2k7dda5a9b8o27w0thtr00v5hinm9adhxzn0vazhqezbsc645z2k1okdunx3def00fb6hiebi8wlh8nvthknm0102mrbcjci5elmn0q8wrrfw18wg1a5tao77i5w982bz7aycy2mlxnixp9gh0158mq8ojpmw5owrk8flq47pnk8872ldycx8k5stmcl3lbze8pq6fgsk2gmue8664gxgxx3k21hjqeygmehpa1ohf8j28x3u59r08668vgiasmkn634nyqv5jacptxkbnsrkdjsig0a8vf88jkao6uqwxbmz3133eewmhvqdfsaqw1dt527dphz53s1ivd09wd47wp6mdegc41j1th930cn1ucc3y5l0l7t6cu8uk3joa3wjpkm10dkky3k2zugpptiwvsqrjnkgxytgbokqlw56k5wtjzznvwm3iy7g6kqw6p5olcwydlc',
                fileSchema: 'tl6k28ih7bnt44edp8r4464ksxhtcqu3dqc8x1r7y4jaz8oabrwlxyigfyk36uh1za1mgkkwu5ir43597gdjoodqxwfucyiykxo1n8dom8cm6ythecru6mtotetu6kboxwtg0iv5a4z3lxgabekyanv38ech9zmg2ub69xw488yhw5xkq17lmnefykga0qaa1wl2ycuc2009gc2e5f0p9zosixkwr92sbwbyvwibdjn30nuvnrfhk63uweqn0ukl51ahj3wo5t1o7npex1hw2scc0g1izrmme4wyncc9mo4ug1g4osax09kvtski6bz3zhtg8yytvm04oxyijm4o79d8oghqyvt91wf2gvu79zrkrahokmaurpzyf81szlxqexa0n9bf2u5d7ge3hirtw08s864u8yooi8lq7ou2cldgjwqqdmdwc2ddlyljaelryeiq14ywgp4qsxm33igj8faqzhobl0u978f56qpv9axou26jjpn93zkfa6d6vs66hmgay3otc2hm1lbp4cctq3j0uoei4xmfvfg4pm2kij8jcg5qjv2diotdai2pc31ux2bt3ni71w5q924db5m5na8jkix71d25rzd76df2t672pgj6asvy6e81iu15km85rk90fp9tt8oy69msmgwz4j3ziourxuyffdjnhxhugm3k9oteefcid0kwxkgat4o3uzfrzfuibbaqv4a0wnnf5j3o3a7lojlukvvbxoojthtqqptp7d9b4sdulcdt90is1d6zqj13w51dftmufoel0vu41xt7obb2fzymwf2altcjgwyy7askl3x3ws30udcv30wca089y0i9oju9yhmz1if18hnyckerbr6tyc1ibnz058hofpywltypjqjs8wenrl5az1vy3c89ajcd78rsioocndcx08nhkq3bq5pxyio2jli0z4xx7cknwskrnhdxor7tjneox7eulmq026tsf730uzx1gj9nhpq9z4i1au7idluiscqn2tobspehl67b',
                proxyHost: 'sgb4182cndq036wqdjddnuuqiwyvcjn3ewyhdkm8zwclll1k0xcu8xuvr6or',
                proxyPort: 5813991676,
                destination: '4rumbof0wf4m07n8cddmwd3li06ldk7plksftmei042ppm20ewqrd99ozaso83djbkswq86jwezr74zp09vwzx1d246zq5lubymnljiu1j5d1w5a9x27fiz0mkjhjnhgn3lutbkhf8bu29npphmecwsak1yn8ejy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tsm7khzkkiruy9pwx7f0nzxab7kw39d4shcm7yysmze1qfhizuhjfdjtc5v608o26aiu2d2z3yh9kp03yn0u9t9a81ogmmkyq2sc04ctm5xrdfyq5ynooikemk4s6cgcksdi2qc5dn53771erokk62jcsfkj8iwa',
                responsibleUserAccountName: '1gmh3g37ja65zsw9yksv',
                lastChangeUserAccount: 'zjftwe12q06nyxda7ner',
                lastChangedAt: '2020-07-29 18:47:39',
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
                
                hash: 'ffwc4152lh2znvxiqemsev3t04296z99wf1vwsmh',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '2mvdm7572hutuhz8oh49jffn4djf8uk6o53pgs6olhvh0w92vx',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '0fg3urvsiicvalrc5k2o',
                party: 'nzsy2mkp2ismvif0qumw8jz5kb9ghn2aoa53t4gjbklhip7xm8g2sghwleihkjjf6cu66og5rt74kfpq3jg9alq5r3dczc9wm8m5qyyw0v0ozut26sgoy6gn614xhweaz9b70f0ibakqkoqyf6xaxp8l8yitunp4',
                component: 'dfl534kt29u2xo9n9di2rk2xc1y789dwtxsy8i0hojio4wm0j5oujvst751umjahrl7idi4m4rxez6muyqcttyndlmsaj1bfiiftr8xptcocwo0qjvr439pnbssjp4gyhsv4xqayottf7t0yql68cbarjtk35dfb',
                name: 'ink19rlx0rhsdmxl2zcp1cnr19rmrexn11dkn3vw6cpwd2hzqggju9l2904ahx4v4xc1xr2do3r2jvtzrkffe402bvqj8osxre3k1ioqsdu99tvcgdpzn53xpp2lum8db2qjv3s09s1xhimzin5vwx72wsh3u2z8',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'qf7wiq7z7znf540pdy43tr2sg9opbi4vnrbxzqdlqscgusmbhakevieit6nzxe70312dfdhpch257lhbzfo1l0dqzwp40fbupogpmorwcl3piw6gccikoe046311ltfimlf0c4ma5hos9bz5tnoddvhvgz1d2etg',
                flowComponent: 'ptl84p7phd0zdy1i0bv4yiett6057f2ubbs2f2b8tqztj9o0prdmzjv3ownavvck4z111t20j3zl1wek2vj9v6ftoojvylo5s0qakix08p86887nr90518zk8p2a6o1ylhglo1ljdy6sajhpdwvij5o3ps6mhsfq',
                flowInterfaceName: '8vgfhlli6hh6zmoy07qeplo0zavzgjiewbcgw6mns8sm3cp63knj6xc4s4w5vurv5862cdznccx5t89v2nzdh951gnyxa7elflxb0lbcxzi7auj8ywhaf2tcwqbgtvi068453tadfwcmkkzownivw2mgpd0qqvga',
                flowInterfaceNamespace: 't1cormb4lab7tfdbpyfupn8r0pup8lf9v22dbk30p8qhevz7oegu9gzqgpcst66sx9pxkspyg18we7k0owjj93936v4ooq0yzqjkcp1yogt5giqoo2gc59otvetzv9twld2lh9n82r4j28htl22bw3t5ur4lnar7',
                version: 'nm7ca91x3e3cg4ql4mlx',
                adapterType: 'alw9zsnthpvo4vtw3cjti3cajscfonq25pc619ds1iiwzx7ixv921lhhss8l',
                direction: 'SENDER',
                transportProtocol: '6urqtj1rao97epcngg2z7w8252ofl1i5szef8bwgqdsi11hne3b8ntu1svcr',
                messageProtocol: 'e6lf6mjo377ktp8ux3co1xo5ubyrk5s5r1zcyh6ijjgzufdqu41w633v0utc',
                adapterEngineName: '8s00swo0x7417f5lxkgp4i1qf7vvum928fvyelcao8idek0h27fqa0dxamlnlyxeutf8qh5u8gzs4m83h1kves3tvicn2ahvcmbuux3omehv0gpzfyj37sdffjxxcyxxgp79yn86dqvaldv7kd7kn2noe5qas1gb',
                url: 'u60ppurfe13b7o2sz93aoqy8ldf15axexias2luf6an4f73c4maiopqk8robb558zj9wkd0le9di5p4okaipheacw2s7ecbfticthmi5u7rikxdgia8hkjx6a0jdegn0ndnx4rnvurb96g3m6l8ex9j9pvwqdsma5buat5oxusp3mqtrdnqkzn33it8x7nf77c7adqau1gwv91fdsx0e2g4jclevy4x4h5db53y60h5kz6iruaoxk0kzu8dd86ma0flmr6pfzg95rkvb1dck07l1ckiuhbu1p3g9twb6uoks5mo6b4xe2bm2j5vwefyu',
                username: '558hocr86eup43gk6p11bvlip5baq7fwbldp9e1ksk7f9ph63o9yjqxvfjmb',
                remoteHost: 'oo7bswajqqhn4nxvnpben4vj3gq1hzgw9aomtmm9aquqm28d32obcdw1qdkgnj5uyy3q2oi8xin0zyh0azysphwf908tfnk7d7l3terilpqpoma2bcar10c9vyy35inb7t3y1i0cq7qzttla8ktucrywqg5d63gt',
                remotePort: 8239357722,
                directory: 'vgjbcg02rn1uyjxtdk0pggq6n2vg2frstr8e6bttxw2chfwu2sh2xpkvd7sq15bjcd7he4zf6y44d9ku9vcjnm4vluc4a3qy9hq2a1jx8etz186ggoofbpkj8yjay918euldgvv5xd7fnc2rwc8wn2hamjw5jk1spqspe74vnhugtobhxe73usw3p25414pn9ssvrmux0ffyvg1ta5disixp7fclo140jhjimo8jhpwzibrt35n6cdnkeq1sy9xmo7kodxm31t1o0n5jwdxt14dq49uwxza9vcdnt9gpujxaoitrqzgfsvki4jgo5atq9a7xuua2nvdjhemxahdvppxk1lu3uwy2hx8bhgiddgzwplkmdfz58heuggv4xljs0aw8im96ny27kbsy0c42kh9zgfbhd331vkhxz1lv8577a219jxcbe59k7l3slfsc5nacj6lob04ns536insimo13aegm02rs7qw0y3618vkrods70gtx1xj2jrmuvv9j7oi2yc7j38mrdoxt85lj07htebhyqopqehzsn66tgkc6zyq491ij367np08l5xp61an72r2k49ya6nya562ltqcayy1jbvizeqigmlm8o972m5b25o3w3jlvry95tiduyfoan5g27m0voehiqs6ky0hstnsuw3d6nij5ju6c4vipg2qajegahn8eahegfevq09qylrwqp6fytihouckj94853obuo3i6laz6ahlh36s4zn3zkhzuj0uc3tq0fxmm91fl35tvensf82lf08tkxyddkizc15pyv69msuxvoksd40t8hrxwfcdty3fxnz231ws7zy67693s201d9w40zlua4mmgsq4b7kvt42n5siyzhq61vcavbvwci7y9m3bwzccruur1szi0sphjh0j9h07aonoo7obezplxi43iou2dfpbofb9pt16qwjoruzm8otnuqkvoyujjonpzqtldhkgsrpzkn9ou9cre2a7bx1teck2dfjrsuyo9aio1tlnw',
                fileSchema: 'lrsj8z5v4urruikb9yohrxy73nlq1ar3fpn7vsi051y5aadmt7tpadorbyz0fwyre0tto5o73ed4sh235lance1kv8dcjpr3hj1385t3g1202qmei9c8kcdyzvvy15s8cvz7wvax90ir5e21thcjzv7artpehp6eymowspuc23ftwa1y7pkp2c4fyuva7332kg713w39xh9n7gmrsdfxvxz1r48guj61tgc4rsrezoqs0qwwz6qcqqiyrfzg2g3fif2dttqa6rw4l03fdo16r14sr2flzu8n9mtjfb82q2o5dbh51ay00c8s52eubu056ic4xh2361euqn484y86yxshqc4nh21dlpgxp6c4v13fx71516reece51xsb66qojlwejenb1f5omrh3n2qdq2a18urnyvpkfk2w6kqrvatui9veeh4be2suxakjpkq3s5uu9ux37mjl0j1569ycey5744kg3kyiot65yex1rbzfk60kvirdgxc84lltqgq0ae5lmbem4iniwar7brfu7v30pgl0r4ij7d3vgcyvuwwp5lqp54uibzwicienowkctdlryfj1zxft9kjdnbmoic4h9yu003k2u2pc3i3dpq4qx1seso8egih1wipredvhn5qb0568r6yqgr2f9m6zzivl0x16vydbnxtn3epad6gzqizwc5syx2hhaqf37x1c9i7344ay3uya52pgjeo0p1candzqd39mvcsj93y35w4usv81bns3z140ixtg5wddyddje6rm8v8nbomtmd37igjc1zssfhil35nxuh28rkbfwglpmdzwoawgiq5su6amjungp5mhxkthch837l5dgxevk2yhsyy99p6tz0viuj24ui2mw94qj26m07p3hj35larugwc5zn2mhbw9ck5zsfwso8ltv8aakkvk4k37jym1fvlqxg42zhbmg785qre74agjc5phnl74bqf32qzmycpb9hp56hidrq5lkmpgycu45634bgxh0l03gy3c9vpa',
                proxyHost: '5b7l74i6q7ad7u2fdidj288t5vk0v1bhcc9zodq6nsn6gc1rgx1nmoxvttx1',
                proxyPort: 1456489520,
                destination: '39z5ucp77mux88818ke3pgi1k6wcs9ofkt5so0e6detbfqdoq7e9fusfeszpmyxo67pewcxqlwysux1z5ekr75436o15w2pmwjhujemdw4m5fj0lnncay8ugid3fyy3e4l5b3e2m0pq0gt6kjsjd6u4k2sfmxvjw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'szb8sr9jg35cdbo5raryv6qzg59w04c5g2qd8t1vr39qi0uzkfki1rge9459c20iz7h0uxioku46c75jihipxngzud0vl5iuzbrs19u1y0wd370bu29da49b7kz9paitcaubln853l4cj6f9f7tuhwe57t7kkf02',
                responsibleUserAccountName: 'h1p8x9p1pc0gew5tlkw4',
                lastChangeUserAccount: '1v4lf0633t2wtxv50n69',
                lastChangedAt: '2020-07-29 10:53:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: null,
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'z0znwn6iwtvgvc929ev0hvvazsfi1y58voi3545zam3uvbd4gl',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '1k22neps8kbk0tha2sff',
                party: 'ff2tasz471iv6b17q0kq0fec4aoq56srpp8mibubv31y810y3pbvzv3rw7dzycufp5ifml4tpzeyd0t57qgdd2fixiwd7mcatngy1ggjy9njlfw81wayrn7q2ymwemdrmf9dg4p66s3wzrlpe84f9xahow1tcfdz',
                component: 'h4zvbq391cvcok0wmxlp14je6g8k0i7ax6rqjyqvuf1xgitkewskegcn3bljcyxm7xznq91jen740n38q47z3sb4sbj4drpj4lll0zfzyrp4gjv7g3th4zux624igs2u9jo70xa4v0jm8ijywdijn0is9teagxo3',
                name: 'yv565loznna4ytkb5m3ooc2ckf9kigkgjfv9k24iehpy21kw7ispm3blve1mj2jdycwzutlsqo03bsadqpfu8ynpdhx7quizr2rbw1he1r6ev6ihamj0ffn6vxgha9un3pwgki9cmfg4nep6uun9rs4ayoarodza',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'p0cjsknvcub3y6ggjbalwyv6mbs39e2pd7gdkou5zkvfiozc5tzyzvjp754my2mpfnw97di2qx2f8ga0ty5z0ldz85hgzl0ucz84kwldp4dcgs2lxlfshhbcu8n8bj37jv8nqp7gvzr6fdbvdwciramlpdr9xvgj',
                flowComponent: 'v98emvkogdcurpmx5b6u4lm4x6x3mfvtels41l0ou6pos90m18ca9pcop7jl2ddo8xxhp3j82v44ouc4xbu6lhbbi71bsv9dksjjzw7f717gba5yowjjmk23ebs8a55j1w93ne0an1ldivy6hcp45if2npiyb7cy',
                flowInterfaceName: '4cbziilbdtoisjzzaaec9w0cxxu6t4orezfw0igmhp52f5n5fvl7t6wfxg8e1vvgznuirfmchhxpqlqo9ld0cwgx2qcyllv5x6jzv4t4tritho2mk6geafd48ifgagme0p0m4c1tsdunz9nl5rvrtq0vomnq678j',
                flowInterfaceNamespace: 'snn7113quq5jaq01p9v9c1i20ifs2p9keta9zaj6386aqq8niusahfyilhwgvvwqpv7tmuvs8w5zxuwc99v5hbjo42zq634ivwpnqzjk9l9gkozx68pphf4oe8351c14u98ojajbm7ci8mziaz8r9ws3g38ukmca',
                version: 'a1lxpxvm69a0xyjaog76',
                adapterType: 'oklu267h2m3kxmpd6qav4mt5i95bmcacfkxpam1ja8qavnpwsjm6qcigpfss',
                direction: 'RECEIVER',
                transportProtocol: 'ux9shr00bjvdtozfso794k8j3j3qun7cwrqqhg2lymta26jleasafwq13nyj',
                messageProtocol: 'gq5zwsf9bdvjf57rgzr6ipnkcgmz2civwo578oadzrpps959w6cfaw1hrqrl',
                adapterEngineName: '626ca0xw85vthturv5eg313l4u937kiy7tdcmzjzeyupfabo2uqxs5ysjrtf10i7w4ddasxduaryllk0oq0eipkr33r2j71u95n6upqxxbfkmzqxgrlltrkmlriz13t2825zwbtic1cprwr5pk9xlg8i3vg9hs89',
                url: 'r1pn1pqgujedfq337qqy7ve6vjz6jp88jdmyvsr2vkbi4dmv5vyquiuwy6ipond0a23q9qpuba9hjyatr1uncifeajw0rmu72ee49f2t74igsiazw6aiokqdbrfpuoqbov4f148jwcczty9bkgvvs1lwkzwo50gujl8wn8sofmh1wua88j89jldqrjlmajrru6c4rzddr32amw5eve812pztfcp53n5ne6jphzpp2hl39ef2sen5u993ec15uleindg5stf9h3xdh0aikm96l4adq8hnu76ve5q6ydy1l5t4yp3enpwb1nnccinqx246',
                username: 'vt54wax9heceetxdyfmslk1m5n402l4mndj5h6qx6b7cx3ooksay4yb0w05a',
                remoteHost: 'dupnv4i8xh5jtzjx8ngzn1w7d9lzq9r64w8g1wqt4ygga1bwychfgjwt7wbcjz3y9i6vcixstmf4dl27da4fnfm39ufnaeh8iuicr4dbxwqcmtzjwk7xok3bbhpokxlq79xddql816nnb1507sxdquadn82m9kfl',
                remotePort: 8504055693,
                directory: 'bv7opdpsk5limdn5qh2zy9q6633cpmo6i4lx0hv9rzyok1r3byqifmkgyqy32259ordpk9wgznnkrpz2dkzkngvuonaioi12w6qfvht2b7i4yoqytuk4i3667glslmljmcpfe4fzfogdm0b721zkgjtvoelouotagi23f1o40o7c9epauwsgtnvvmvvrbecx6ifbxmk0smhh6q3fycpqvkc7ox4np80amz33o5tgauy28p84m1xdlg8zgk8q40nsq9yi9wu782vdb6fxwgtfz5ahqxztkttm99muo8uozpjdpokcw9itl47ffn0zmrmsxbwinm3ehfgenn4bzpolx3xowzivtsh2xwxn2bf50vr5xm00p5mqelmj3p7sth6pv33f0dcrl94yj4pu22ei5c6k3bwqm14glc9s38zth8iipn8zy7nuonen6x744lx8wgkf6rcij3ct1hmht4o2i85zjbua0xpc1rmi0grsjmr7fg3eyd5ih83fp0z1wg78coxkv4u5aiew0cnuuogj57fk6db4ghclufxi9t6tp6tzcw5pnrvrjfa4un9d4muarc4wfvbbnvlldw1hmzgjyg03vdu0aixjj77iufy2dg56nu5q8ipkvm2ovuxk0ivglwvm7dki64yxjtlai7g6787jq3dqgefvb2tiaybpn3f8pqaj1loowby64eq8umfi4vrp98muu1blepqut1c30tgr73xq3079ybgtcbvw34v7g3r9r4cp41myqddlfhe87dsp5ipuwemizdt4098uy2upcsal1o57awppasohj5cg1gwrxxecqn03jfxs0j5dgtjc1l7e5ikm2o94limu3kqpzm72bc57woriacs2uegm467n8qbemby2tz2ftpq84nndgwffcwvum2qp4i85e6i992is8qt1buweevzoovlv5ol4d1stz2ci5rql6ns317c0gzrun7rqgc26nenzimd9sot75o42r2a6z9utkqrrth1pc5n7x3kdzeyvovny',
                fileSchema: '5nmaucugckzuj5np6q9xhkrdyqsqwkaykgrlb688xf33b9h0a2wje88slr03tuhvh8xwdz63u65h8h42yl9ry6u6px653xxyngkxmg8540l4htu7xhim8r5ku0scen6pnocofh6a6skassli6pc4lvoqye7tk2ype0perf1h12d2uqnzcx7ulkzsahd6scbb1zmpushi8adp5dzqmgm0axdmb3ouhmmd5j6rscrlu2v0skwus9yh3zkupfj9ajxzje0bph3ztsve6zn8rd1itts8enm03iby4hjt0ytyqnyk9t9km5l7ahy8jzgvu5o4015qj4j64ln5ozdse4cy1qono613b0ddkltqtpepvpqwvh6wdyvs2raj90q74j3t16x2x6tn2pmu6d2nrrbaqyo4lhseunnuxz905k8b7shsvragwcr3t9x60ymdinics3uaeca2e7udt1jy3vhw6dacusk1g1sj4xd9h0x7c0rq3zpj6kfma3ufjmlodduyk7i0804huv64epuqf8o28vpjtobito72mxi2z36v6jpuq2f4u0fwtw3d9bk3tkhiq3flkpd6s06xkbuhge2p7gv5eg1lh3xsreuzvtp80lg643qwltbkpxjpb26tiqfzzzruazst3pxat41260ua20l3ddzwzrw8rto810cxqtfiwtzuk3oo6faktyzttd15m4tfr0g8j1iqa72mb9v8bwhpve8gzylmz3y7ewpvlhoww8a5h8olc9moa900u316sx9nr3ejvttcqsaxcy4ue6mocffojeijkxmrlxbaya2ouc09fcjokd8jwxhcv5d06k5a9t1fkp8mgy0xveka5m0xohotgn75dizrk2oicdxcnbe6k499bmuvj7l5i56o4qv9ko366g6qay3vp9wuslqr1n700cu9ks86o22ne8euayczkw2spwrqiccd5htr8ckpf2ioon4nn2rl60rf5bo3e9nml50j3itu4pqxc1noevelzqz04y1epq5jimfe',
                proxyHost: 'fjtwqlw44ehfwze8p3oxcfhm2wwmpepmvopb7xvotfs9eetlchiod5c5ln8u',
                proxyPort: 7983925826,
                destination: '4f0c24bcwh5q0pjpfrimc9iafinua175jrvmsvygveb1oupkcev5474my9bqgrgvrkfsc9zw09aitq8op6yp3ycp58infv3xgt8gifyr1zfe67cdnuvndx13mt8kcnnierg1cpjfmawlwimzq6nkbxosnoeh25wa',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h6fr7v6zxntgkr951g7liv5jiuq15f4nbd6wrivt4nipytrkjqz1kro77p5szsidjfrcddb3v4zfla38sdckhi467yis2g9y8iy0o21na7ofsfn2ojk2vm2qwu2qnjsaudxcdviq0yvfo6fnul88nigcutniu9yd',
                responsibleUserAccountName: 'gyg3cj7uoa5v72vba1ma',
                lastChangeUserAccount: 'y2qcl5x8toq0gsrptd5t',
                lastChangedAt: '2020-07-29 21:49:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'hg70ej4fwg69si7bti2kq7esqd8s6tevdlwwoqxh07cdmp8e1p',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'm22wqvq0mfxl6t0pgi21',
                party: '11dyj7yckyyfwcpekoj7k5uriv1wffmm95bs5xq9seff9g38lqfrtcxiov6pmwzwkrem5cpbs0tqlsstws0d1nemdvpe1fgqdv1zdv033ym9u49ci59jsjchaelfpw0pdtdoli2yji7hg2v3osvcpp6bd2z98cn6',
                component: '2o0oa5dz4o5xwpcdtatdx4cd5jc9owglaq2befnlxzwcv1hhixw5rc2f4ywadpphfctft7749ohl0wo0hz1p4svv9ao4hi4en37vdukjpigackryqgifj6qxh4ympioc2owppdcxscfmyucmmzuz0gm15qkjic8o',
                name: 'ksbxh48fn5z5djgw17s5l9pty67afj7sdhhcgcszlqdch1kf6lxjgsa38zfyrz23cj2kpyb3gke5j2vfjie2lc66vv6qkxqqrtovok1hov7sawy9zb1yyig6yfkx4opnbytcnp86onywskr388irkciyer3eltp0',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '53o069whuowxc72jmr5988xt6qo3y6l4k5j2k2lx20yov3paa2rx97bnxpfmonnylv1c14h61bu58gsmq7gukc5nm1lvgswjk20ie3lhv6o7ndy4eqg9eoyzx905m9od8fm3h3nc1xftf53qsfj56inmqij6jmrm',
                flowComponent: 'swgdwtz0karbxnf5zkurezms6yxc5lw5q01qtikquot2qnj4qivvmx7m16b5vfog9m88hk4z5914wbqiov8ovb8vnqiwj7709smtt9fgn24trwy5xhjodyorge6tvwqnizjn7f8b9brvneraukpp5ikii0hsscik',
                flowInterfaceName: 'j4ag0udlr8g6w9htdd1ggwdz3qu9zzg09s0hcqqo8rxh70uq7dggojctclq4954ejee6kacjbvs9zm5edpo17qvo134zv6tnjjxtslraz3fbwgp5h5w69dq3ulbiiigsyq0aum0iybmpobbc4vjhvxoge3x3y291',
                flowInterfaceNamespace: '5y7ljvs67clifm9n2paykiwaicsgdkztjiu1lzl998o41o8h6mns0s5z0ste06401598iloogh25dkuqlrr1zsxak04yb0bg9hpbxrrkl5d296hu8gvima90u7ud5z7fe93z9eljkugwkih03h22a7hlil4wxfvu',
                version: 'yp6s9km5pztx9ofnr6rn',
                adapterType: 'duj4o8rcv8mutmn6ydmnsfazoe8tla357tgx3u3yk354axstpib0j8rc37ah',
                direction: 'SENDER',
                transportProtocol: '9m17ehrfo2p05azkd55mdshtii3advans4hi3p3bd603xcd6817yoras98f4',
                messageProtocol: '0rj3tut70u5e99btbceaw1f1tnupkmmmifrraq6y6fgfq2zcfkxrtu62dy22',
                adapterEngineName: 's2emxya48hg1j0nj36epevpxi6gknwmevla2gyz2y64p4hnp2tqgr6ya4amt1oh5jjqvekfhzx12qxustoufi8116getvqqwn1iya0tlxn8ra3gzh5xssc0xyzs789rv7kgqpxio6s761d14grv25auv57109txb',
                url: '7306nttmixrokzz48dst8t9cl4vza5j6p2iw0bzsoyr91yzbx7pbnenv1xi9h35br3q882of7d0hqpoekmfup45xjhvd4kchwc1js4xsfodigqq2z6kih7975qwgzoxpca3mmxfry22havf2pg9v1kg0tgai00qqflqkllyczieedkkj49p6fg5191y26hv00p2ddhri602goxa8n8rgrayiyscu6kgahf319b7wll440k4pf2t34h8wyaps34p89pwo4lrgvs3mh0dfwpmrr8rwuagvqcq04p7oe1ezf6mxym48jd6l0l1hi06bcz62',
                username: 'oszovffvw2bb6975kfwx8xgjt1clwj9d2qpa6vya0hni00o7djoik85hbvfq',
                remoteHost: '32ebe8sc3al5x3utti1tqwoxhr9ugqj2bbb8ntd05p0wzsyld33i2pzux9v3tjruh4yb9k6w5ivra3f39i1ekmrb86uqmzs1rirhiaqk2jrz60dog6ck3tnl3ddpnibcnnytrc19085yxladrkggq9r9o80o1n5p',
                remotePort: 7963158451,
                directory: 'zurntbkgdw9dv7mktt3fzqfa0llbqnv46dbba9zfp32r3rzwryc3nt7jb736w4afgf2u7y4o9nztat9j0bg4rm9opw9hnkii0srwiyy1dh51p3vt8hk89q1y665i2iysbjjurjsj6rbp8mrglutom8g2gidbu7em5axrc39cpa9pwt14p29ynhibhqgp54y6sl5q99dudyrgpsga4jncv06lw2dq9r282jdv85dr4d8ym8agovrzvfsh06xcttknkhj7yar4wzngdy83dulnw8rfelhspkxgfs3mjpw8nhy7e9s1ws0r3olw0awuctjfpzcmsvka4g0ulffi3892y8ydt29kumfci5t9w7nyw3indwl5m27mdizzvu2pvhyclnm0e4oj6aydtmgi9txy6anla3vreiy71n5zbd77vucewkxu38w2l3gvhhjbckq23q40kxkaz1gdq87y3a5yeua071o1xw0q50ftotyiv3sxfzf31a5o0w2w79ybiepojllxno8hpkeov3m1t4w5lvdtp9wik8gmrwwkurbzldkt155mxqxnq2gfa6liudv7q4npvvqdnkb42utgbljq2c8qeqp4rleaqoxs8yfkghxoc9ozx3537654y5vk8wmyz0u9e4vxcearxyj1wijexvw69lsrrg8ottm8l4ziiefey78xes4oyl3wjd5qgjtqm1uqk17elycw4c6fut2lu417jp0pv97ok28e9iwaqikqm6ft31dgt58zq7sunh969p91volgf95p24flj3nlrw6znwn2h36p3vvns91cotubs40abohk8odh3pozbztr0y2c1wmdjvn2aawjypjk1pc9q8yqtvu4y8qqz2jb284sn3ddgcwtzt3m1dtn0r44opnlcirjniosll52idgy7l618ntis4s6u7rqi9x3bo9oab9x9fgykfgu2er9mbmrvamssi2u00udny40divwps08k2az28atmrvtylwhwzikhqm6z0p0fcoav1u3dxel',
                fileSchema: 'daf388ts3gjo345iy2hin0cdshtvyx7g20cfpqpietarnfj3idkg4g6mxpfjkr741075gtpzhyhdjshw1l1rh3a66d2ajuht3dnzd8wk9ao49wvxi7wsb910ol899m54iptm5cx9zhkodmcwxsc14408kt6ymne57pxbxswbf9h15tyflj050uiekn1e3uvem76a2nye0q1k7w93at61nk8ct5v4mcqvcrrurmu1d7gt2kqcm7njiinvpi3084e6dobp2kt2zegypsuw512330ujdidugh3m3rjw977kxwyh8emy9seeepnc17th3jg5o5jtsw9p4hi5unrc504vc9922eypuh99ef360fx5sz4sn14bu8zwfluksmzgiwfvtlasksn2niw431xlri4ljzqhv6dhyuek3rs8xd7hup48m2mso0zzaado9wa5zk5isrxfb0vezr79zf91hl4jxea7blvlk4xnkke0dob7aq1eqt4qzn3gp4j0mnc9p8e6w5hoz5qjkw710efto7s68wugt2brql2ew6oxnmz5tc5lmoasbad4uzqrbpp3ljlpqdxbuatsxrdcxk4aq3hs0e691hlfrsglo0ber2e3fpb5kwokuz2u2dfuu1ketyoc7s4mw9vr5oiyz3l9dq4kwatxlt0uzm6xirumyr5tqiqjy7l0rq3ueozku8fhaa3qtsv1tkf1ucs1rvs476j5obe5op9zlneylujtcdvibkyasoyj1p6hf0a2620hb9di2nnshzqxv34d1i6d7cgwwqw5km2saggz24w9tlojpz9ffd0nahf44amjkzpkhciazrtosekem15txqt25r1spykhjvo2dwpi02n5k33rngmjm4h1ozkrrh3j19mpl5sqjpke6vkmv8sji7jnfw8bnqjbo3hk19cg88ud811ieqchzcqkaswqmzyvju6w2tmmmmjk974lal4wheodkx8qc2515xflcunueaus21i4ntgbsbg6t443iewbdddku94s',
                proxyHost: 'y4pasm08s9hi2e9m1agdi95uw821zjw9hbig0bfj0bfhube3lrg6kh0ow0o5',
                proxyPort: 3708762215,
                destination: 'tj10ksudhsey6ohe948y3md450d0u5zi1qvu9eqdgvesdzfakz8hxtd01geq5z1pw2v38a3fdz3f2e0uj159w3ixxuj2kz894smvs48bw6sjcb1ftc3bai213xiv6u1gbwyr5dsnr9b3rk3r6y0ok600ll74l7fv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ugcfiq6sihihyxmcee016d4rksnckn9jezsvgcqgvzd39edpqv26pwvir4j0hgebsiqjqbm2h31wdn098upshf6dtd5hvflfi4bukpnj7f3klhg6b34fvl67auf1iswk79hpkbwkcdf9m5nzkd3suslz9m2uofjb',
                responsibleUserAccountName: 'dpduzfdfh15xzgq2ddef',
                lastChangeUserAccount: 'wujr0tsbdi0ow5jw76p7',
                lastChangedAt: '2020-07-29 11:08:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '8mtnes8l0xcv9ll70lahhul3menbj0wxl2gk69me',
                tenantId: null,
                tenantCode: '1zvfnrgwsscrpcawch4kg8u8v8fx4e80tqn48dofr8aeoka1h5',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '0uvr1wi9jqeyqabgsnhs',
                party: 'ss5g3xrxjach48icgnsoflmns56cax93a4g4i5qemw50e2krq4i9ch2h615pe6o3z2olg6ri0jkeeoro50hsxjc3g8iuumyit8ozsbscu2oad46354z4rsa2rcal6febnufj2fenc1wmjlldjoj317baj6x1v8pm',
                component: 'yx522dxayjx00imyqgr2cjtxd4ot4gvqer7tvtb1zqi31q85yjmex4bo5grvgwgpsu7da9012glvi1mmd9onnocs2bg5tiiviyv96ojrsisqz5ho4y23wiwdvk48op6ezrf1aj49k7vzuqnd5xd8smr5bz9xa4db',
                name: '76x4c16wlp4xbvdakkjmm1nnmkfma5kohgh1pk2q6wirlnd02ufav6vc816xgts71iq4pvb4ctjg9i3suet3nc95w40pea5zjvwuej1ep3dbp2ikqpjh1t2wt133z17a68orqa3mt56jy9kz9usih6sc553qkmy6',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'qdn0pnuyvju3jqjpb170wxytnyhsnup86uozbec0brzw7wlbo9596arw0mlg7e8limw64f28qrd7ktte7m7blqeok9t0ja3rfst3fipprq8n7hvruqtddf1aux0otukx8jvzqoo3ucy0ak80moko567bqpxr96kx',
                flowComponent: 'omboctvds3cyyc8dmruc9etg1qpjf3z8vllxolgknqyewncc7z3gjlmp5cghdckeses3yoq0i9oq2agx6mev5z9ajmgpn0bxgkti9yheh3bpout7ng48tmbxx7wn288vwtg89w226xv9mtt4cpngg075vkog4gxk',
                flowInterfaceName: '5wb9sn5cxty4h1z6awrwuqy1686wr036gok92ysswlv3qsjkmpb1x0u9lr2k9aqzabk9v551a9oepxjdhaa9h5epraji5mcfo8gg96oofjx7fxkg3g0rpq8a2r9wxuyd3x3cjg8g41rprpfe2xrvkgz69chd6d7b',
                flowInterfaceNamespace: 'xyhmvc0sxx98q7yvt1967gvqf7bt2yirq6k1ah7g06p7vxc9pow8plo0l0a2gdxivjnfubiywvxo1agt2lnd51zxvarmze83h6v6e6bmzj2n5tbxsk0xz1j7mtkwske9gnzc77kubuvcds58m7r55fyi2z3kh7f1',
                version: 'uke5nbpg095eqaptsr5x',
                adapterType: 'yzksxxwkheinhsbh0x81ykh2su1sa5q6fn9ugm9ubl892zy3cotq9588fx96',
                direction: 'RECEIVER',
                transportProtocol: 'z82kdijj4ihxbx7myi4efyp55bjb8ec59vkvgt9vuefixvy1ktifgybd45jm',
                messageProtocol: 'vjf1a0thzk7i9qmecz077y863ejcqtlsyucbei479xcm19yg2iuil5ejq4n1',
                adapterEngineName: 'ib04ppr5cnt64zywglz872jr95y1uaf81o8pa1qs2pjujqan4s5orsw7bp0pz4yu4825i4tmd1a7fsaaxj7jwrvuy0h2n9lnyqeksix29cp3hmzg9ky2li9b1kvhlg1zemcesbqjduaso3vgyw27bgq8ak4q3bs4',
                url: 'dt57mex8p0hdpzwduk2fftwoy3subm12mr41s6srcakdrmlrlkl35wvl365iieyxpbpxf0k7mehrshsan9cn260zaan73zfqaynonv28wg4652avr9lu6lowfuat9zco7uhwzw0tigoxp0i95ep5jexwbk7n6smtfjra8w3fb3tc09q1o0u2mv4e61o6l2hxldm3w085lmpzdotaanwa9bndxyd0v03n86qhg3lvi20jgcyijfb7xgocjz1rctts5l3p34l4s1tdp1oeqwm07mta3qzziekzynjkeam6pcp7zsgai4mdwxfzmvziwro6',
                username: 'rxqq9aeon3wc5zmcvtnlmdvp0rwmqsb0hgv39ilhmuj3ajpt5kom1eosvcxl',
                remoteHost: 'sxr0qsjnfcu2fp2lhyfifuuxsdkoohrm6xnxjw78baso3r4p0sj3y2gym6zu4fi0da3hsukhj2scjacslhxgns8nd6ycffos5umi2mjytq26cifg5h4x1tss9bogpmc345lvlz8vv44cgwpe19aw931focqdkkfc',
                remotePort: 2653900462,
                directory: 'gjonefmj4c2zwtobj8yeuhf4marwhq80qpuaf1ar88d839vggsq249v49mybrxqqdd0vzyxhc438g0i3rwvh8lahq3dr134mggzwl98l6yof4cpyiajwo6bewtipks5mzl5eiha1efhs9cr725fkllzk3qj7nrugah959yrp5f539rntx4r0634ngm01pjj9zx2ge10drw0f2e9rjvolf6mh2ohx92epqkvs9sdaap89v0rzecpmh3d8cstu4bgkhpuijgd20878bpfj3oukwb5ap1ooufjkbap9rtsu9nw66tv7d3ex30facexfg8yk36fw7b3agrgkt4yq6pe31onrqtqvjk29vdffjkxbkymgdtm6of8p2p43mtva0xreo2w6o8l0cwf9fguiedvu445bthc1102jtwlmtoym3fxvn05ouc3uh3d7k0mvn5wp1fir5g5g5vujb1p1jotraa579opo427o73onzidd2xnkgancdm69g9cwyaqrhtmordr1zliaogl8cynodlotxsic2guuk4wz0fop0gaybyofk5ffnupxrnp70t6fps3ituild5itm2en2ivgnsakmbivatajvqx33abz2fyycsshokd1zg1ue5khjsorh7vgdscxmc79qerbpbz5yo6wgsqy794c526oqlnwltgymqp0c9hhyy20dbmeu2jm7as5hi0s7pq7k9uei1mebqrzkh03vguw0takmd7slpka7e7f8ao3wjgpaso0pkswxvarg5g1xcgrgy7vqkqi3cqiaoolyuu4olncomte4bupvkfqqbia7jimhqm3o5luixc2m0ezxj10eawe8r0mussp7k8ogwhz3pbrr1frjzxvvppjk14yj03qep3zk66sy997vf3g389u5isljqghtya8piairlxonc5wtvb377fvo1v8wbim6mz22vjs610zp2q50ncojr1nl801j84f1du0a25yrmvt92103yzbo5sp401fs0urc39g67a05hkb76mi',
                fileSchema: '7h8e3lya7rllbws7k2idhaq3lz2bz5wy7cjacgzus15bz2bp0cs5oautssug3x1hsq69is7vwgalnknwbnxktsrw7fswrqx4tlvzaulz3vfmjp91uvpnrbf67w6roxwo17o7nxgj98r36sntgtm6kzv6vf4av7rinb4gjxdbq19wwtl6pltjsg4sv1nt0ylquapjtmclo1d4qpjfdtn1n409v25oq81xqkzxbg6hbaa7xvshwq7sntdzrt1hwtchkxcoxgygg2tihc229zlezi1ycw7s3pnscfoj404mmg7ry5df1s91c57lsxrqru980kq3ui8ip7v0du707tilrmzaat4n1paen6d2gyknh8bh5o96lx935veddlq87c0hqn834cv6zd22lfbpwp9iddvriu0p0ikhru9p6isf0kti1vfzlawss5oh2e9mlirct8giltglcme8iuf2rbntu3c5kyl04epyrt1stb615gmmn08hj9ciffyqip3t18egyi0zks6vso2tsjzepualr7x1pw3e42tj9t36aej0tygrcseji7iqgzgmrqpykndkzeq8obp3ifm7h2plfdd9tby0sjgeoz1gykk2r1yfjmzug547wom1pkkte6qnvp1ri6qppcq0o3wbrta87k1i4h007famtlhgblfvc2d9z06t8lhetd47m2w1lvthqo8ulvzq4igyeszqzgecyqhtbzxvgdoimof39dmglls81indcpicum4dydnp6zga330wm55f4upchgeiyluhui62ufjo54f2p13eeiiry2tawhca5p4bkubk84lexso8saaqpvqrq9z32y5nwlr7oarm48pz4kdgfnctfoz3st1ed9fdq3rvtogdfxojokq39rqcsflgmt4i7tpmaxecdbtrf1xh0o4k27ln35qwi57h5lhqclw8rhrermzmfdklsjqjxnjqstbql4cvxfp8auoz4w7bjad9tomqszmp49do8qa26ho0biperfrg6n6zeesn',
                proxyHost: 'm57gsqvtvofi1piu9u0r5tk17mzdyvuwwgoa73755w6x0v89u5xno79vyrhq',
                proxyPort: 8304370518,
                destination: 'uq9utf4ili92vz0s1c8j3vwwzl4nhr2m7mzhm80yfouwffzmcbhgl4wqi82cyv4ozosgr4m00uh92qltpzmcfhbvza4kne0eeg10p4yk7meh7uq5ky7gugorkcu2wl1aaw0sqzvrrd8d5xcspfu62mjjjla6dtue',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c6e06pun7wwztwlittu81wofnivf88evrvymy2eenao0ckjef5j1cl4s926xcey1g6glhgc0acg56vik35w6wt7fcz1vz5k506bvuzypxkvuyvdb150mcgnj8ics05mpmc0b4hbkg9fuqsn21zagof2ymo6hdutu',
                responsibleUserAccountName: 'put3klgcav09ywpzfft6',
                lastChangeUserAccount: 'w35ykwjg5pft4udyk2x6',
                lastChangedAt: '2020-07-29 17:38:33',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'gdb4hn16jaze4lwzxht57zafzg9bmbk6yvqf275b',
                
                tenantCode: 'q9gc3msspbspwaflhjcct0y6b07odi8x1dyya615a5wqfqkntk',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'coxqndftfbdmgopdghoc',
                party: 'ez7w4zh2nmqlpp4v3k2bxa54aalmfpbhjpfatwnar38wmtzomju70vx2cmcjfw6y5yigwiqn64d0e4f70bbhxbtn8lsezgzwsrsx3wpv3ulwbvi8ugeuiu6aqfb73aq6y6y7hyp97kw1god55fayoh8yepkk0g25',
                component: '7ajp2vcoijy2blr5oojuzcb9qus938n5er1542ru5us2zkbgg47j1mtbzinwhg7hp9gfpvn1r7lia1ozin7tyioeqm4vu3qif89v010ufljd8sda7jko7702gadqigoxwl07odi907uh7uskr9uyk7fyosr26i9k',
                name: 'f1rwdcsmtbxjbacnh2ns8qsvr9am92j85pignl7a8mnorif70b4wk2a02ko3b9hleu0c2sxlxk8c9r96zhrzrgybl357qtj0s3z7ysc8uc401lwb2x6qavyw9eekh3yoek3llv8sya6j4t5l8scmcgevsqgyicfn',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '25qoh8yvg80veg861hozn4pw6vt3jg51n2znzuphcu9zb0khi1qwkaqzpcowy5b865ksucclgsqx4b3s5adld41giorijrmdqqyb01d9qwekuds5c29uo2w2xijpjbf0mu1t1x6xocc9qv6n8wmleyjcc9ulmkx2',
                flowComponent: 'p8xiuoprtajt73hxvr849pil2rfrwbpp0q3khkv88ndl0j8nxh564yxo9h2ktqlqzdz0naz8uze5kv61ardj4wl2sm7lj6x5842s36oc1qvc6ane0kvsk5y9ze0phdw4bu8tudtw8ykjeczwo9y4hll2zdn9xdcj',
                flowInterfaceName: 'jibweow63dnojq081szhwimitm7ck5vnd82nyggid3ygotf4chbmq3apl3pe8iyxwzyw1dk9hdugezc659d22cxgs19gwbkymbip30bq44mzrhx085dn3ew78xmwmj11344j9zuq4xa77cncq7euh9t9avr44k7p',
                flowInterfaceNamespace: '95p5n4jtjcb8ggx6q11oqzg4gq0c829fie48mbgelt0a5cckzv85z3cyudxhki0quo6bcb502i2sum0ljpqsg06xmfp47eeil1nkfmusuk2oaz9rcl5vnt5r0cwgqdra5ejm2eszx6v8qyum3ipgoautjuohoiuk',
                version: '7dedxbo63957mq64clti',
                adapterType: 'v5qeaqzpebqm45oj4j8qowywxm7dypvstjt9y6hq41bbgxt0iiaul002el01',
                direction: 'SENDER',
                transportProtocol: 'oz54inoex140kpwpffuiwmwzj33y6w505x9p0i42pl179et10x8r7mcnbulq',
                messageProtocol: 'uw2l9tdkg27ybqqrnbx5baee7hqb6yddvw4pitx4ewtlseefmqjr52fyzjeh',
                adapterEngineName: 'o0xda5qnis54bq53q0s1uel76i4t7g0wui9gozhr2uy5zab6meaphwu1ar1212ljlm1mrzih1iwynyobnfdfncihtuqwne07549zan6myrhj20nryfw1ufusvw6sitxasambhecu9rih1yqyojrkqdp1x74g32sb',
                url: 'xe0m9d7j16o1i500qg5jeqeu2rdcmzo42e4h2wbkhkwj1ne7ay8iop9oovhgs2c3t7ohbogva4uqgor394gb1hhbu7ysa9hs06af3dleiac2rmz8lk36dza8qwik83qbqpl2xamoq1bjz2kgsys3sbsi6oulid685d22kbpypm1fi44zn5cpc19iff6uaafjl05rsq34n5uyxl4qudknykqlq2ebkw105ftfxdeunhjdnrydbrva3l2z3890crxeuxhvggs5s1tucwlcf47l7f5yxbb6de1euq58vlkoqf4rkd641y6atzmoel7efpqb',
                username: 'yrua6ynu9fcmcu6v8w7g72u3k27z574ikughmcyzge56u1heip83lxnq5n5w',
                remoteHost: '92vws7qu07ypdl6lxw9f4obmcxd6cf2x304ovji36w2959n56dhcusmpdku6kini3g6w953cmtvljp97vyde0ge08q671hht8bq8avuwu7p81wf2y3bvd3ov2pf0p3176jvqil2kp8x3fvmt4riaf26idwf5ltcg',
                remotePort: 9250236250,
                directory: 'ixe1jse663in8nrmlao0t2tge32yhhr46dx7xlv9kl9026h8dboocmv88rafbq0ev5cqxv6404vswtstrohfpnr65c79ion9rczemhrsmx9vmnneffl0g6lmiivkqesqh99b9lpksz45wy2aafc3a367pl8bkr2rc19bszy0f2yagfeokl5pvbu4m94zko8iegd7s43coyg4a0sxkqioq22sl8ok84lo9mql9r31xhlytk4cs4jj6ptfbeezzj7gljddy0awya6w1vou5gct9q1bkw96ducnzcwtwa44j9c9if684f2x1tfjsufim7zxsfw68ybuqeu49xg7s0z2n309cdpg950x6oyd9a9ylzx2jjhs8lwh3mnkn202fvgofwyw3ivy5dffu07n4qomuqlvco9hlkmtpt60lngfgtnomcniynxhnfkt3c8p7kvxnvpylqj83pxjhnx946j132llxk0vge0i64aii7b5lmre3wbrfy5di0u8js4kfrp6tflhvsf54bprrllvssfcq4odj20s9msn4elh56vyrk7gejlxoi85z1cpqzx0b877dgxf2u0ff13lpzquwsfcku79r3wm4janpp6wtpqkoqbaaksvfcuju0wqebb8jusiza91zukc71ceubzjnfs887oh04z6k90c62nm8q4330bpd68238pd8ey3mq8qhm6d2qdcl87v2cdag618kb4cutev64rxh7thp7688qr4g852g0jx3bf0d7e6vg52doy92bkwtka2coc05pp3mmzrz2k8hkmtmzqi6qdnletfw4oijtcdwympb2ys6motjibamuthllc14wv9f1ig95xmcxcxfpoabagii9bafckn9mgvon7t8ao9ld0yqz7b2l8ywycd7ses78zk91opnzqtf1ea6p3wp5v9erp2rglpxebg5cxt0mahgjn95tia8pzzh6vi3tr7kfb7hpnkz8b2xj3dfsqfmvfmd7ntr0q5e5wugs5z58p2r1tjwqpb16vn',
                fileSchema: 'w7qaff0fu4b4yu7h9tpyz0zcaseg1o0yw0nb6qga6ulc2edlg05r7s6xu4rwwk5mlnoayjmc4xeub3gq0o53zay3bs9ps1cvib2h1fht6fnq9oe36buv8z3ed0ujkgmo3amzfouaubvd4izc5uepod7pght3vcv87zj7wn76x3oksoncl6w7sd6j0wzpz1xn1o39m2v3e4xf0zae1owi8hcb7zyq5xe1f458dj2o3g8xrl1xo239iqm1llde08dvjhh4m9m1wq66x8ihjpnrao4keouafq5hb8q7qzdwxkzuetxl5ud00s4q5l2fete6a826sz09au6nr4x0bm4abgf6wdi4u3ym4ucb4f8aku7tqr4gvm3wdhtdsrdfp1wcsdm00linadwo9bjk8gaz1m6xel340q9fc1ieidf3b8bpq2weelirn6uut37hoa8w85q0gh59ucm3w49tpu7aav9pstspbpzt5k799d07c4xz33pvf1l0kd2eb9ds65s4no4xlb57l2n6qwxlag1cn0lw7kv8nuadh3lotpsikhiwww3szo998vre56virp3roqgdnls24d26282hotiz247wl6w3fl3s564k2oflffdfc7u41pdoy9nifdofxiks4feztukitz5tavoggx01sc811y61zwq31ibvteqjbj1yow181yjni61k2n21qz856fbvtemzn4irnjhrh6fz8hgdchgm3x7vtymk7e0dl5emjksfa9mbenwiadtdmenqswojama90yfx8r322t3fwv3u8x1v5wn9f9fitc1eluufkao9tg8wrhpeh28yv5vwdlam8ua0eaw8a3p4vw6j39kujktjk2vmse7qrmk9izmgjicraqvg27q87fsjr5an2zol40l8qh2rin2cavxgp71q38yo4vzn65hwpsnw47i0wzkj1duoe091ieydommskapelfk73cwn1xuohsaz84qzwxilh29shgqdyloufgh3cwx34qsyyecynr8x2mi0',
                proxyHost: 'gw6uw5vy6aqfbg7srfeq01qs9gsv7tu1spdprap3ujekh1xwewy7w6ywsn68',
                proxyPort: 5505471712,
                destination: 'c6aas41up1ggaqhz9xmilo83l1ju82miz1rvnly19edd01baajzbtyklzxanyjtvymkjvpran7b9n7lydqovdn75rds1a6dei7xwa0atktxy5cbafy01bhvwxd1ga0092b0gd3kof0p1bpx5alawunnd6fmndqa9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vf4nye7ldu7pukgarstc6739xfr0pkm9rcqb9xw2lh6dkvbzp49ac3h0i105yfuw7qeogc8jcdakttgvmtxxq0ns6o37l88yzjp40bpxzmoefni87pwdi80frsazrf8poq5fhudgdzp7a4gt9rv6t1v9va6bm2iw',
                responsibleUserAccountName: 'weafn2lbki4zfq3zbptd',
                lastChangeUserAccount: '9ls6qwni81dpaexqc4p2',
                lastChangedAt: '2020-07-29 04:31:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '3vnbeegpsc1oylinf057jvf43qwq4utvvqj5wsy1',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: null,
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'irhwshj62vck7cgevs24',
                party: 'lam7cxovn5nuq8o6vkqe619o2gtrbof2hy0y8ihn7gtcbvo92q7p1bb7notwjr1xyz36dc3j0a0mcqry3xps6sr63pha4bss0nc11axamd9rfc2u1o2q7i9jepnwutvokbwokmwz0q2hizagfsqe9e0iyswjrhdp',
                component: 'rpci36muawf258n0i276nf3t63lde4hebmwlf03n5nupoorbbzsstf0mo623wey269ewbazcsl4xpmzkomyt6opq577a7gg8njtudmavx2ukkoqhp6w0efrmznxqa9gmuymdmyvbvnep4ftz1l1r28mvs5jx4eiu',
                name: 'opaoxuahk4far9rs3gmxy8i3yagq1iz6y90t1y9vm889qz0jdsulake3ajysh4vy3od39hpfki3yjnhdrwfj3gj9gq5hl6tekr2ig85ggzvnsod4yt21vp4qh3ca7y63v7wcbwa71xlwjwqy945l3buy6yrm1sjw',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'x7urh0g4ham15xvlh70x6dcca6m3p497vumpuxpfdmo2o9oy6rustqfaadlfy6wfxtp0afsopo5oc5z49g9iajo1xyb1qd025hguneht8bnl38eq6vt6rbhgaqhkk31ymceb86ohvtzpmnz8uwgulj6d7mr39syu',
                flowComponent: 'gi6gao5eu539yvxggm9rxmv285fvfud7aad2j1fk1ad13zj9a5r0798h6q2htk61ry7fw9jxlfyauegky86ma6jbm96mdo64ou0zqz0g5sxw4nl6oq9ignqk3lx8tjyxaze0cgz7w6lpxjn2oys4fupf1nikbomc',
                flowInterfaceName: '1j2w6lmprp372wyw25ju14fej5yhu2x28pfq3dnvmjif17h2hfae4p41hr2xthw6skuz1jhjspx8mmxafhsurils1z3q7c56vw0trhsmjemmxk9ua7oamcj7x439sflq02hirrk1wxv5i3h5gptv8rj2vp47wu5i',
                flowInterfaceNamespace: '6gxquqr1tsl78hmojvgpu1iqm5ldbmreurm9sq2gwdy41gshtf5u0qeypamo32dk04hhrju58us2cxos7s61sy3ef5ci8reh8zsn9n7volax3eprbbivhbh9a7cm417g4kdb559znmdmdds7ol3pwppui1js9i6q',
                version: 'tqxmm4ejrcte44dia2l9',
                adapterType: 'pd8aqgk225fxexrm7ihhaby4dc07fyy2epnl1eby9ch39is33g6m3t7nh253',
                direction: 'RECEIVER',
                transportProtocol: 'x1xr2te3ta44qums10vpngs74zg9u64oeih4oon7ukl3g6a6tf46hbr05tmt',
                messageProtocol: 'k5eaohtlrzkxsaseo7kteysyyvl94djaeeooc6iadthznbcja1zofw0q8nys',
                adapterEngineName: 'wffr6x6wbtior3cn1ero2tichl18uox3zkpcqxvj5ayqw348m9fjorf5361l2h6sbvzwwsztc0bm5kd12005swoa0oxcr8i0kq1qdfzczepxoa4jnf6kly3dwps5bj1y3lukzrtk4ttxq8q9wldljtktche3om12',
                url: '868zlp5x8tch1olwt44rs0x9ithx0hcg000o82wtagkljtzzatxy2aybdxwclkk9ii3fu39m2tb0mtas146k7fh4ie9zp6wzfz102k5odg5u183b1f60zaqwuamcjaigei0znf2j3zy0dlb50s2xeciywrjp23yxaaoolu62x6cm2588rc9m0wvjkm41ufdqng6q77d3fjmsvypulu2oqbezwutowofoz1oau8g3oafs48mofmhwvxp8fux6osetvgtnfwf48bp7mi5ee42u90l9odztrda87kbg6l8boskf8ps1l44ufntei7kb9j5r',
                username: 'tjwotyzd590bypj7ayljxbgg1wujauozt2a8xd4rbdxw247dejk7ervgs22q',
                remoteHost: 'i8a9q28vrj8vaambcmplnetbywq1x68gsntj7hwhuv0mr8q39c2ngkkers8l328upopqi82r9hp7hiv3ry5mc3p3ukgdezramddig5j5sc90sj89kyp96njzy2xap2q8qkkbzzi4f6wasdrwb8pe5mwbvltgymkd',
                remotePort: 2073463859,
                directory: '8zxg2422gpckqqmv7dplizjn1km56limu2urzbklbvcp2yvabvj4h8ltep1ia5tmnsq0q09vobuumg0w37cwmil79kmv7x6orc9v3ofacfgjahdzyjcuqt7ge8hl6jahuxnbc2cbqx8vxlhq5xj34fb63kbfqqbrsc73id9ddcjwtmck7thzhtyfn13tqyickvrn7t4icjyeajq1jpkj418vdeounfs3vqlraqj5o6h7wbcwvnbwt9s1m233lqmuklgnewkuepnixrn6ruyturwkzhw5g0fqy7v7mjk5btcil9hhnjsncam6892ub03c3qkdhfu3sf249d3phnarmuvkbd7oxawyk98cmkk65zzvkdq550o811latp06lullmjs980opmcnwww9a16vteuvvob0jso2eqconsywtqsf22tyeulgqu78h7eo7i2q4ms2cdob784c4ji9s2pjm1biyj8gc6ltnr3w4s1rh1w1wwon5ofstm9kgprb8sx6lr7n8ipe619x6ycdx86e4dswveg5ydxjd79bad36iemf6w1383p5cejoyg35i2rmaapxn2ghewguqtfn4zzr4x0t16bvq6oqds2m0iagbrzdv6xlxlnmvt0g7lu7tlyf0ywbndqf80w5ii3idkwiu07x084tjdgmt7xgihnjcclj88fv5czi6qv4atv6ztroctna7kw499ej55ugm5e98dbg0yikmw79zszh13kr2d61zno8kyq6a78ou3l52vkeor0obe4mrooiiow3us4akn5b53bj36p3172tdgusr27dl72pe2yme95z3p99sv36n9d1xut6ioys7ppaxo2icr4n8ssur2ztsdhx617l5qvth9011t3h3neduu4bfxaqjdu8n76d5as50ipoyrvrbbrnsfawt6013sgd1yfri6spr5kcfv3d7u4beafxymv5tjjxsw8phijjapeb674q48s6gib2qlntqalkrbliide75dse1t53hlv5dadmggt37',
                fileSchema: 'h7s6tpry322v9xffaaoco8hxl1odcshylv92igyh05r1m7dlksfzbri5ptttptbc5b07k8vol6mwm5n02ucf7kwyu7j349rgyb91n2lcw3b25bveaf0extc21mnyde1de9fw4u34woz12lnxtptmr5ojkc7q1pbs1uflgs5j200k8yv7trcdm8epnxlch89j8nj2xvllatngmjgag87etfi55lo3qb5j1vi5g2p1wfal52wnqypefhtvv43odf9uvpl95d5nuaejojlptft71cj1i071beafc9c06iom36vsgfbtjo3hakjdqk002mu0g209401390uq3ppa85v9ysp0ynrk1bzarz69t2ft09tf6s66fje3u6ihrahgfub70vk5t12btvq9sme0psjbxlc08uc53hh3k52249czwcfq45apiajlpe0a7ji5w9akhimb6yind7rlah8hissv0dr7hoyhgkp1tuv0h88xa0l4s80t8kbxeyjkov09u8dso5pp49vn37a9lvt610qn6ikxm2w9yekfzgmcp6t4puf2qcjt0qydfj8xt5rz4mybevf6n4dlksev1a3m8v4uf3d0essrflbtdbkfirpx7q1ayga6g1sd7gzql3wcilwo1uzpn07nppzcca10tgwx8dfq4lf2hexep9zzzyvf84rv27otvb2v3cdkgts5pbllzyc4onmqtrs5yc59llvahcq17cl1nhgxqabywpj1rkx2v5zgobhdnrn33euwi2reln0qyi798renh70ubyspew8w2pj1tczwcg8nnlgvuw21olx7b5i36uyffu64dea8xg02nfr79r0620vbw4t1r454acs1p0hw0skgwb1zbbwg7jm9jova2ek5muwrdz78md9k5e9j0lbuejmq9ipodpkpa069g4hnt8c4wdc2lcwis2paypu9fpw8urpi4icxmuuj0yrcumcmdd8xzqsciaw40ozvoaraqhk3zslxz2epmy1hlcfw7i1ylid6ph3o',
                proxyHost: '67dpoxnfh4em8rp8l21maqyfrmapt5611e6l29zibwbt069c9jpemld8onht',
                proxyPort: 1006775528,
                destination: '03ukup1m7c6pdynhlv0kc1kxppsask37iroztkdyiz349123xh3okm8zf1qvei22yrh9orslanxfeqbmu4chmvhae1jfj3s83wfjm7cvy6ce18x0gsrotvs55vi4dlct39xhtnfnf6ud3sy9bu6m27qcjoubj8cw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vu4c3ygmmgstgqkoj8koeli57l51pdpbjhakgzswhnx8b7mgmyigeq7ns6f2dizjgrsb8w8uwxx4f5orjzmjgu9d8ym63lp42twwno43qlvfp8629zvhlijlzqqacwbmm1n3ogshkacjq6ndm6zugbiaofi2trwh',
                responsibleUserAccountName: 'd9wtfxdrbvl250r15wdw',
                lastChangeUserAccount: 'b89dd7um6wog50j58ra6',
                lastChangedAt: '2020-07-29 20:07:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'eatydhk1ktm64e7lfxfqq8unq349bca2rbpxgvnn',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '1nbjuswwv9we4gilc9ud',
                party: 'a75tlkyte5ouhe5x3xm1lor9dp0my6cge8n6tb5i7f51v82vgu89kbw863b8t4nl3r00xgvpuqtxmylfg8z8qdmbj65u9ekn9vvevdcb0oqcpz1ip4u5yx6mj39wlqowxc2zjddes9vra7thahliz90bx7ayt80q',
                component: '239gl1hlmc8wa4y3uxip5fclfypyplobfgdfcn6wqh0qsvvsrmul5hcyx0jnibbhp3xsgn22fnde4lq4ct988fka1ehik845iao4lwaejzr4xq29yays346a2otfum0qou4uh85kbp404d6sfmtjtngtft2gf2bf',
                name: 'zjufig4371xghr8evmhjzd63qgi493hd0er3a1yeyb15dai9li22uxh1v15h0w21x4vvxvcxun6ywg1zom2ns7ratf56syyfahk1vpvni1lrcddk5zkvu7ogu0xc2hfugumxx8c3boszgw3vo18xhzv0hffk47cw',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'n3g1uqpw2gql1b4erta16dhdjk70fkuo0oawvnd6p9wqybaldrbqhea1qh78qzuopja2d6gksf0mmug0uebi883j6ca8fy2fg39jxb0cb3yaamglyd36d3uoqnkw41hvy9gg6fod6nn42hbzuz9h0g1xo1qdelbq',
                flowComponent: 'pphv0vpqrcwzdd9w2cqfvau0ylz1vz20v7bzhjl50uu8ehmqe6fuszddmnb6a54n0ureke1k89o6eiyxmsjecjmyqes72ynwm5arrzbmc0z9pxijk0r4j3nr5tm82rjuq3a5fdv4zb2rr5zriw6t1mqd50x6rufu',
                flowInterfaceName: 'rqhpmkqbf518e0bdeb4ukxuvagcf0k5etivjuvhz5v7it5pn7eh3vq0jwiwlnhfmb9gk23a3kvhkbqxzl8vktad49s4h9qcy792om35apqhww097kiqtg427c0vmr5rdq9iz59u454sk5nz9ehc679xx6h1z3p6i',
                flowInterfaceNamespace: '8r6bsp0rwz8mbr9rva5pbih18cn6yauk2vc3u36uwis0kuwi98cf6bvnb0xn1fqgwgib8e7dgkdscaqw4pngzabpwmll8ah5yfnkux4hlr6tcsr8g9dy8t4vg1dh533x6z5dssrd714nrvpl8oul64n0bjm4co43',
                version: 'msoupen5e9oo1oh9yaol',
                adapterType: 'a990mncqw9xana62zx7iggb1whjde9goh3293mr44p3optmyocs954f3ftm4',
                direction: 'SENDER',
                transportProtocol: '6otk8she7afqj9i7dy9b4v9l4k3sme9b5su9p52u3donbzqymsypt1undufo',
                messageProtocol: 'td3ap65p3j5n1ijpu59wbjz1rsbst66o5dna1oids775wnk406e7y2uhruym',
                adapterEngineName: 'n39hemsf9fq5vqj41yqcs4liq8jdwttl0t4xwie8ysd625p7k32cu912w9gautq4td8biubcroxj3u274s0s44vth7a1ki32sbfenxkg5ixp60kmhur80l5juhym1irn318gam9b1vlacm20x14br9m1c5kr96b6',
                url: 'k8lp4kivz8gs676yxvb4b0clctrzfc8fhcdds4wfy93xi2ocopgrnucqzhyxzwpcheeqner8m4ke3s3qnmap1963ienun7bj2hv3pqyih8jv6oycbsabpginoqjetq8qlbcpdrtdo7ju91dztmgz4iub5oy9dgpa98x3mriplezzujmfsiofzcs4nd81e3ohdid5qnp1dhbgs7fla2dvphetdo70kaatxmnwdtq36tlpxtluu832zr5e0y3shsgehc8hcucd06kxdb1q9yue4yh1bfr6kn5h0ttho3ee5posx1142vs77wxwkclkytfm',
                username: 'my6xd121i1bvw7pxptdda7bh7gnemam6dqnh208zkulspwj71kku8ge2i21j',
                remoteHost: 'rtehgxw0gzfowx99p2wh5k5olej0z70levyqoz245b62yvfaev8zeijk9gbfn6vjf162zar1brks22f1evtbnfksx4gz982rjdoty56xzzfuty6mbfpi6seqjxg9n45ydj603ayy7a1s6aji55y3f1926un7jaz6',
                remotePort: 3181933293,
                directory: '2ihkovtu3qfknjugk3z27eojrt61hffmrotkxdh83fvykoa3a8hdnjit8vl8ofhuoc83y4e8lxyweurrs9gllene74h8q0y0d8h5cknhxfmhkxmxs8g47bwtcfedjw69w1msno4azcl5juoexegn78sko7irhbqq0l9ljz5j0nbpp0x57z6k924to2nrwrwuef7dgvygtpvnxtxdn5os06t9pkd1gpzyr7cl43xyg7ie5mwgqsxknwvv17sth4i0hgt60pyhd4739yugjamkzfv1lylmctzqp8pq1llwifin3ufzy14ha10wl7n5qqke03zyrfwu9tmupu1pjyzelv2rnq9367iso1ii4o0yydbfrsjdb62thser7p9anl979tz9cty1ok24jikabcxd4cbrp3euu6n015f20f1fz5h84f8sll32z1rdzvw4ux4snsbx9beoxepf1aefsmxgzbx88sr10ny51k0527byunchoxxetl5c2ib093xzgx39yg1b9t3na14shzzd8gh7lelxzk6wrl0x616g50s5q54um1wdlmcoikq3p35vriia462fb74ymz5lw8pr78obl1qmwrzbdwjrlvgf0091673uv0c729hs7ae6jv8kv5ug7hn64wqo3x0s958ojwd8l3phyh9p4d7v1lbtcakcfx1x1k1rqf146kssqxodv4283z2mqyeaobi22ayh1td94s9c9afvobi6q767zp421pdw6dm6rlldp3yaj1iirwghodp9g3f402m3x5c31b0adts9thhbxv1pkky4jiid36njv0pdvcszide81f245oladio7he8w1tov2tvfwxe3oz3csqszr8nd80hugmibebh35kov0g9nxe1wqrdfy92g3ej52s09te53elh710bbl7rxnhjk5tbhcpfmkp2ft4gogybo7zjqeg8pa27wm4z0lln5im1gdm78asm69qqc9ds1ufs2c7rrxre195pnfni42dbz8ul4wlmi0x34vzpb',
                fileSchema: 'hmjrczb0f9ns3om383wguq1129hz7q300nb5ggird08i8bdiqp05ztg0hyz9ojm8k4rtplmrmo5vc0jojccfz3cl830j4leonip3sbvemf2g4zvcfymsv7rt0lkamsug18zgbr0lc9eezyms8vq77w1t6z94wjhswe2avvlsx8mrh7ttyculn8hzeh1vjgtfhece8zowiu4y5xssy834zghs70eexoh2kgzi9x1yrbx9cr209ibmdi4ntnob2phal2y4uufia9v7o6svr1li94hi3foupo88tyn89sdw4fgwlmxyo250olh8dmdb2uyn4xlwunvjt1h3ogk8kkdocopggor1rpro7k22vna4qtqm7vt7v47tz9ys04v6pf6caos4dhwwzfpg8rnx5c6zigico13xuyun5yws62its990b55vs2632v8zlhxgie5xy8xl3w7afiwrolnhj8mlc17y23ruj0sjevnanflazfe7r7wu0nddepqfvkos74jg8erbt1fmgfyvcxqp4u1ah1qthf2w4n8xvclntq0indovfv0agk7wvlnjr065ctys06jyemz2ldoajwhofpyhw9e2swyrfyplyih5hzn9kaf8d3595uz0zc7go7o9iot8v9nd1ch74k5eht9au9xlqoaapzqhk7kzz7kgph0pmjrn2wbs0frbmrxu4spqqu55xj3mggd53u70uoebn3zh8w4x80uldbkd93howcgmf3f0fgkpt0lvy401fk58wie7408qe11b6gp1yb5rwys2bhwywh9hsmfg2228op04wn5zdts6u06q663j45n403o63saa4p7a5wxjryinuyuwdshuodyndao7lpofxot1gbheltqu2mrkoaez06qh0iao0n760y95lle9p35atuh2sugx3cnigipks2lo4blybv30miztk8vdfvpb8wuwz4zazv7kitc3wruchmlbm5evnxlmbprrip1u2am24vq9wz8jvxba1zpxr2a2iliti8p8',
                proxyHost: 'vy0ten5xsouzxfcvxzqdyhazg98d680wfcj8blc1kh7rbo9wlkbvmji8t4ze',
                proxyPort: 1741173845,
                destination: 'nyrn08qvo4f35h4rvnng6tla0i764m0avu2kci7fm0i1kirjzc48ffmkcxqwt3j4pkshdjg4qewst13bma8vcqok8a3p4jzie4amiihkapcr0q02seaf0283xomulooobuarzrn18aet7cohl3nqb7uov08z70bb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wi8qifl4akr22fwaz0q47i9din174k38kcc0l1bujyapw9ynnekhaob52crm5sczh4tqi5t1mmh89hweasrmdgc5fjxjh8kz5ig8ucxqxogsaxqzys1yp3kdorgfne5vltyi7bo1lgdjgzttqd7lhx9l4pt2ixwd',
                responsibleUserAccountName: 'oosu58sajccempw82kgi',
                lastChangeUserAccount: 'j727fsihzcesftc560kb',
                lastChangedAt: '2020-07-29 18:01:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'acnuzgjmzbrrhtvb2anzepl5tlfv5vzz82u2son9',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '4syfj88k2h7m0m7nqcsvln77x4kdoibgudk7e1sp1ytav9k2xf',
                systemId: null,
                systemName: 'hlcscwtnupdn2wvh69s5',
                party: 'z5z6g0ykpcneo7vnpitcdygg6c88ry24ygr6hoobqf3ejh0dfaffs7ayvate9zkuj0o8on49lu08jayuq0omlkviuvj5gqcfiu6gte5sys0024ifcfz8z0lobp31tgvq7u2n7izsrurq03y9vazcc5kcxwt16i4j',
                component: 'uk0rvb2hygim094bnepljue8h6ogq6t3jdd10s5bftcyjlfzshclo9yseycq2zl7aezktscbcbbx7lnoivglw623l48aiati2xgqeudtye6ronselzaq0ynfacrs8daajof4j1y7fas1mssculu1ujzvj4z157dz',
                name: 'w83a5qnpkwtknj8stjecviewjwq2iw1zty83stg9dkrokixfdhvt3v5ze79ygu9lh8pu034juptajykf4khmrhdp1pk52aof8rs1x41xpppg64zq7oohix82v9kkuj6dzxef1qci4l275k5g5vg6j3d5tq3up11c',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '03v69549yzw4k9m919sxohwi4onvfv50fi0bx5lifxpt23ld1qdzunw7zjgr6hq9iee4bq8cg06k7047ie7yz85sezu9hpmni764zgrzixqqa2n9vd5uwesrvmtdi99d0qbk0cobs3jj06rh93iqvtijwb9n8251',
                flowComponent: '4yrx05u0qa9modezb73y3ic4n40sx9wqvfgnw119hfa5ytvqc1ipu6wc16m6obrzxld8sznn5so9mun7burefax2pp7yhzwkbkwbuk7j20hcpeigirfn8dnjw91qe2uxfcw8xida5ym7zk8gm3k6ppqmw54xdf7i',
                flowInterfaceName: 'sbgrfu8u6472wooq2ksigojbwyvdcdjz0cywrr50lfa8wmnpoqcbq3ssq1u4gha23z3kyz0p9lt9r77g6u1y59o86dlowog40c2m6m1sstsvxazjwvzhbmezac9wtj6kqk4374wrddixfrsqurdjl7uym9fdwgq4',
                flowInterfaceNamespace: 'qtsoa04tkxmw9gvwdx2gvuff70g8zejngzz41epogh8zi2pnys4cx3c3w2tz1iygdt21lhnitk6ktcrm95v6vwyst3i9qcj1boqtbfozfsvv2gbqp7utmo4gy9thkv2wwv4n2mj5ffzpub97hc2gdmfdt676408m',
                version: 'o1nrkwojv6jeb5n26iqt',
                adapterType: 'mecqttz96rydwhpunq5wfaxhig80tzqkc5axpq67zl10acentv1vujmdan0r',
                direction: 'RECEIVER',
                transportProtocol: 'rwrfeal7tqulrlsvgk739hue3p4bry6m61dlg1ulvkpbddxqxkxrs1fbflld',
                messageProtocol: 'q64fzptzyxcqvoe1o9ax7ordxvxh051jsr9z2chxqsd37zsb8sy2g2ctjczu',
                adapterEngineName: '7pd9kmkwpx1a7eaoqk9xdu79e80rvu3rd8ks4oo0owvlxd2rorh3dsp29x9mudrhaelnsifrbvvn5ppkkdc2chgjluj0mtezmv8l0imlhppjhcoknr7xbyzv0j8zvinkzqyiz48s12pzxv86fhfns3nacr03yyhy',
                url: 'llakn0zyij9qcb0xcxt9ov8vdsv3ey5nufa3bauq1yajyl1k8mp9717ssslakjuj6frshqlnfxo0mo25qyren8gokv2vlqnz6tinwcuf47ey3zxsuojdlw1vmw50tqaaq4kffubl2rfjdwazl2mnxq6yxt8awfkb8uttpvt4x914npa346yr6nu1gmv36yfydm2ydx8vxcdwd8p0xf6qk1roibd1rj2ho51l404mhygd68wa4c96a6r5qpctsgs1ptdmexcmbp33q1cki6icq4nndg6xp67hrrp8ax0xdrt3zht6m7nlxw0oj4proaxn',
                username: 'l9dad5nigohje18irytakye37a0mktlj53ndds9ezugx11r79tj39cmeont4',
                remoteHost: '71m5yk9lh1wg9sokefbqgwfsmxbxle97myhxne1egr6kzqf4ytrtybdh5qftgmwn0itcoadskuj2zw6y7dnuy0d9xq5k690mqmldkqzb83so1vheqmm56x9qnaaw2tvwyhl1526rpj9rw1bx2ff1f3i2ig2qivzt',
                remotePort: 2112775815,
                directory: '49ika1raj0ixh15h2v2xjbvzrvhakcemiw9wiipztxd1v70zauoeakt358qpw34qhvd1w5dmqqsns43fang984l5eqfrkx774hhmn4hc28mwvg7s1od26aabsylz60c8uf67x77e1j1n71k9ea5k0hay62wehdyrlkfa6wyl9lw8u8eqk1lzxcjfdriqmslwzu235xf1wlc17d45k20ikr2un5bqdspe712tvipv3im0otwvm2grtxgwyhvhwp2jeiaa55336gshvww490hj0nrzjqlp9vh9vap2jh5lhfp3eo4twlg0l3znhed08mimxc11l9ajrib1mhnitvm5al60zzoz945vwyzjc2as2okmzas9iwa54aw1q5pisc7qoukl3l66uftsxbf7kvglzmfj8mhqyjxqs2b3im0or5r4nq15fkhefywdh6je6qyrncdgt0c75cdnccn9gvugevtnayz6jw4aigvzfvpdfat751o8c1knwp4fggnnedzczhfkoalags6ih1yeraq90jjirs9h413svydc64qe9ntutu613m0is22ufdwp7rjbdatz4giu7qy89ckumh34lubirznq4qgrs9xkgt7q11um43hzo0hcz0k96r6h7u87x7m51lwxb65233i6895nvzzs22cefrmfufcqs0uhbkmxmgzybtgxvrtge9rbrk25iraapjndat9z5psn9k6y3pgjwumb7ab4py537iq7x92wbpawmfqlnbyefwa159qhkwtxobun46gc10moqvazao1yh9pm3eqhh2olkjfpn9syibv87c2cri5c9dr2ao3sf2uh48fgobtfe6m5h037pbh78j8jqdrbx43ig8vpgoles0k2n1g3plmq20ixj9tidjfcwe0l8uqbbpaj6qe9hw7nbiunfqbh9w6t786msq3a553nyd8hepzt7v3649h60xsb69940jp581vw8wcy88js1lio0ehb0j45nvu6qbrv3wv2b6axioev73comudy',
                fileSchema: 'i0xlzjzw2psxteimpv4sx2wtiouja37p45dpe43jbb0nxjgy1fiiau13eiphx8mv9dwewthknbmgq83l720rg5id1ikzd2flet6epzci8s5v4mc48lxecadshrzubpsrykavxv6sg6ia9kv89307yarh882ku2i2bxgcnpmm8ywsv6tj0alpmky9b0dyq1vipn9bmvt7eqdvrtp2vv23zp4rhfdq3ye6803myuycv0tdp0womkxj4jzw44sc9srm61x90113kpf71mbnjay7rpu0fvrzq15ksjg9tn9qnk7ztlrljonyu03anq81e3saa786araqc3l5lj4ktqij2j92wg8hzkldsxmhfiq6rvk158us6c806gsxm7pqi0c0qb0s0fcvrebkabtazcmh5p4qs0hpc49eb4eu20n0bmjyk42kdese2j9m6ag0f3ybv0ts02k50k2wiwt73oiwjgxtn1mys2c6t6uhi7l4dah5kftyukee0jwydsdyv0jgualfax4nnonaeisvmb09zpo1ca77jxxlj1asqqluy7b6lnin1m2fw4iw6hn52a1sxpqi0opvug7mdpqfwxkoee7pb2gylv3scw3kg9tq4vrgt492lyekk5l68m7pwl7shiwbxpbx4o0m4kfgkq8lhkreyesn3uzsxkgwcqsa57x07fwo550au2s4xijr2ebcqdq1c6yw41weuuj9nbusr5c4yi4fl02qcjqk3pr9hbnxwzrq9aihnjf0jl1qnd2c613egp2a2a95lonvd75jlf1rzg3hex9l28yjsmm6xou8aj7ymzi3q4zgq8w5rw3dynxltgb4xvpfsyr1jab63qql29t3j8hwdebk230kafy1daa5bs5d6n9afl4clc3c3bbf6ilf9m2kn5p6we5ctmbewbnae9vhac38vg03wlkkn4ok9yp5ljloy4wc8637e2gs77a3em3cxsfjqvgxsrrb3ffnijftwyjftz06jtaodpdfoevwip0653y774yo',
                proxyHost: 'sqd4fxjatd0bzurua8chbmuq7u6fyf47ygnb0b3ufkbqcd49yjdhzsyykp8n',
                proxyPort: 2173150832,
                destination: 'r1uuuyo2l97pcxoy91570ps487cs9favzcq98yfyysru5fxfcxduxfnmd04o8uygro4cxkhi6zur6wqcebu94pdghsafh5gmiayln0xxpwos4yayqwtjkgj5ugenj9jjezhplpppcv2fx6ygqf7c0ocfg61tr96i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ie9jai1k4ezfyoe5cpffohkqc9sqihnvezdmvqgsgzghlytif8bfmjct72al2ocb6escvb0m57bp2je1gilh5uoo7hrl4q02siuyu2peahrnyy3dcbc8eib4gi7xpd8jaudntwq6i1uakee7w0vlnprxeizug5f8',
                responsibleUserAccountName: 'ot7s16700t5fzbo3kcf7',
                lastChangeUserAccount: 'ac7el7ul7z7nczt9lrss',
                lastChangedAt: '2020-07-29 05:11:34',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ux15nzuf85km99x1cpqq39nqcdxns10x3yxdt2t5',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'slbblwyv3r1ud1d36tm3fon83e9xiqvg09uhpfj03qrsyr90sy',
                
                systemName: 'fgauci05pjhh1fqpd6c9',
                party: 'nh50eqvh3nxu1imbrg2p0010kxzttihztkegqud3zv7rqo1zzvrwty1aql6xpfac2e7iqoxsvqmmdzynqg47p3dft85dazr7hcut8bqklifkpdpv1qs6vxclmmcspe6yaqnsviiplnez2l08a0mv07lxuxbf53rj',
                component: 'zmiczaveso47ggm556gjnbpvpkj49vz80zkfb4cdj5mze8ouu65wbjnvpqzgy3zszn2mds00wktbsoewuztf5v39kslobnsmuvkrndy9ke6xrvvngmp6om29xf917cn44nynzog36zifiv1cr297dx7hqla0c83m',
                name: 'llvnnqixwmlnrmpuczqcwxi2mmiz8adel99gubxzykv5aw5jxmcsv0jeqk9lzx8qr10k2hcdd3yb5cljr64xn1osekl7admiytdgq4vd9c84pyg3a08r9asxvktb3zbkyysyi7qjgwi8imxt4u12zz4ktuyzprfo',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'sbuc4ectdzbgxh224r4r07jpay2l8b4xewbsorw4cc5wqyzb7a5tbct5veh3ctkebrwkot69q6vfg9ebvqp5epedacgwpld65f706h2afpiwwa1deuo3c6qafl9m6i2yamdtarq4mkucfsc4kkysducydekuty6f',
                flowComponent: 'q2pjggeadqrp34j979f3q4h87cgyd4x5b24ixhpth4nwsebnr0m6f56oisa6ob0zddsn1ucz2aa5rbx1w0m7mqllf5yqowq6wmg71xiru753ydd7muc26e53fjpm4cos7slveenyxt9u7v5olfnw8p40zjvs59kc',
                flowInterfaceName: '6dllmoj3p1ks1knbs6yghw5pe4muv5224l27hb1vq9pkkhn6dkp90ijneariybh8wk49omkrm05m20h15a9stdn5w1m2ag0k3uee28knfqzs5irt66i7c1dy8dq5uitg0mulj41fwfyzfqjgzwnfz83uvxkv4g4a',
                flowInterfaceNamespace: '7ehksiirpn2917ja49jiqoppwcm9hwov4pdzpblxg623s0kvp62ulmwoird4vj9obxyswzwhu67qdbzdgcq7jelm6uazufinib5bhmlxa4ttf8cq9as692ors9741x0h9aerksseedmswmjskgzq0ovemksnkrwd',
                version: 'm9zoq4ets3gz7msnaxcg',
                adapterType: 'u44bdn32tak3yws6s0oay1aeuj0bmggc7ctp5r69xbgagm68805qjx0y1czs',
                direction: 'SENDER',
                transportProtocol: 'p6bymuw55r9g250eijz9hhkng4szqb0pdcgy277doxg1h655a1tk2bhk0ffp',
                messageProtocol: '84komcro4tgvwohi5dh3d2c9in4u5jmjvs1rqxk6d98ve5opiksv2p3v0swo',
                adapterEngineName: 'opt7t93netzsr8kdewycteq3kb48h6t44nxpemo3d92vcx3trke8dq04xvuendwqd8kqz2h6wpokge8fskben45ozhk2kc8wnids07f5809ye7ox4e5a0pqxjojgd3qszcd19bf6zvh04p8x649ua9qp0dwhzggo',
                url: 'y31yhxnddcx9qo18oxl7g379380dfi3ym0a1r4kw28c4qp9qeegdfh1s4yrtt4xq7wc243b74ol90i4a0xxj04su5zauio7ldrjnysgtcprl59b4zdwc5axb8vgyox5ykhyedr0q8nl1kxycoxppl9a1a7p6ckf1i34i1rh7o1z3pjsr9hggbry1k6tdsveqnu21h03qatvxj1c09ymgttwyx4gyqc9s0zltk1891g3k2kgli1cnisoxj1qqdnz82j5nqis953dgh3zip5spd45x1vrpv0d05bngxxntbiyz3zg01n9xxa6yooktm5v2',
                username: 'mbl8mqn5lz2heigb4a9i67a7dtqnnyc4ltep17095cma2btd3h9sbo7hjj93',
                remoteHost: 'fuhnw5sfdwk0gyjpokhnxomc8uhx53w46adkp54ebalazv757ms7mue2t5rgdggxngswl92xrbv8lui0car91uzm4ssn38vw1a8a3dltrpibsz1s57u9f3w1k5qohbsn0oasmttjv0pbopujqa49cc6qhf5deo6j',
                remotePort: 3888459248,
                directory: 'w5qikzljxia61wt6xigxv4cddyoagq0hz8c3urv2m4clddujgxpcevugukjbmr1gnk0tmyasodntbkn2i1kz1k7q8d5s8dp0stj5i9sgybvjw2p7h2mhyera8mz5bqgng9k2q9e74851t2v8yt8jk81og2hyanksvdpymnqsjh3bo28drekc464fckvq1xs894es6qp7tk4qad3b0vx8y8zhngwbg5k25yown6rxqlnn534wkvuqr27l22pu4fkyap2dl540p93am2frihqlovha8nbjg07ygo99wwj3vnh0budbmejnet8xuvrw1zhyu11gucgfoub93qwl6txoa20zjtfd26y9252l2avh1osuxcb1d7h73mgmtdh0in4d64h5xkdv3t56vgj9dqt5iu273ky1p1jzywqy99x2so5r0ydsej9se0vsmi5fa2x4bqarstt8ep92a32hr48el3bep78wqj10kcf5ww5r9yahctot2fh8ffidjswt4wo9f09awgdylgn7mufd8mpbdwyp3sqvrnc4m7k5ecw4r20yuuod1ehybrthabxtbutfy3b4gribzzcz6a67zcvgd8c2vh67evhk2uxpoobbaikg8un86t1m36h6smadrmdpecikqvczzikulc7rv8qsgrv2gtvq0556g18ldrdo2f8oy4vaxghtyxdvnyaqjdcc27sema7uqek8gc75m62zreni27lwyrqh2tsa9rxdbzjzsjx8opzd67c01msyynbxyiyhk9yhuafhbqcgsfga4x6ggoyg4wx1vdacvvl6g9gb2qfbzcsvofnjqgq2cjw4e7p2in5d14rxpciy6gyxar9cco79a51675qj1m3i57zdnykz6ieudakyb1mwl97qqp0xnbc53v59kocricldu0h850cx8xcllnrm65m8hj3gby9wapm70a3j17t9bk19au6dmwdy0taf7nzcgjtoazpqevphqj5aaegg4xzkqtdmn3c6zeu0m14f1xtghohm',
                fileSchema: '9ybckp0y53601lekl93kback0i7br3amgq7pyd0mruk494gzh4ovuzqitou200n1zyswnwva9ipuagkgxjj3ai3rf00ri4k33h2bv60nxrrx08cv5d34msp8cazp9tm14zbidj8d3dsmsuh10hn3eazzv96x8lubzwmclprd249kub7roxikp4rp1ztnfo8dxcu0ah3fgq3n30aepgyps60dw7f5tqy98olfoovmpstos2w11qmtk62z4xw1dtcckspilfbrbbgc4ns289zlzw9xfireptj7f7ygt2on64n3n7ax3jvf5ljwz1l5d073t71xko60y0ye3uc8tjxo5jro9fisl2w0h2fvos11syshq0xwdilh256ssiwirg3ndts7s5m1z1bvx4dx1gdmx7q0421dmpqrp8j4q3seb9i7ng9likc9hae4iju3sj0u9kuvyyn6jlsodzdanczuubyvf9hqyreoams1g7y6c0p9paffibuiho3tqx9ojw3iue8w2imn7z40x2bbe9r0cd5lqxwgejl2xacitboe16h2h53na9ji8bs0lfouoe7afahbos4k2jpmv7ge6tflvpsbqnx2nrza27jdzuwone5o7sjwvmlbr87lqb4a4c89r714zw294jsxa96ttr86ibu82ymhexya74eligy0vaszx4opxvkbnhzi32ty614jyu8pa3xc0nk4w13rf6pr164vysmb8pmse4dftjsgzev84zu0haecm35blltfj6ehzg0o9c2ppe856i3ev3vv5s9f7ddarlk3y1qnp25f9lp8hu3im1l5stc561dxtjd7oiy7r8gqenoo40266osik84j672cr9183oc7k3hd7r4vnmuij80ayduxdifqhyt45r7h7yrh53yxpjml61dmcus3sanvw60tvgqawlve34wpw9punb93hvfn4px14fryoueaaddl93sx8773e5esvq4ld419nroonmm38a51ur0o77uhs4a6nf81jhc2pm41',
                proxyHost: 'd2z4m1tv3rbpdbi09zk7u68oh2gbuoryim1sdezzk88us5scfeal0to53w3l',
                proxyPort: 8101434322,
                destination: '18t3pwvn8eopncq3ua2xj55z0d3v0myuvrmhsv693e4bm3uueq0ducf6sc5qmks3w4q59syeqfw875ezru0j4fhw6uk0fzqqol7k3g3g3d92uzaben2wkmlnvullgk0y2ljkpdlzgcn3e7gwdsxychi9tacats3h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sld50jtrxnvj8hdyd1mbienyap5tz5vy5nrzzqsq09k2cjgmftmdjvux15pdqs5wh4hi1tygtthdu510o0n5371hhuzasb0ftiiwg5sljzd3j72ncnchqoxt19tqnvom7n5nk1t1ssp0tch6cju7p37wm5vpmpsc',
                responsibleUserAccountName: 'nlj278qoud525ptytafe',
                lastChangeUserAccount: '7m7p43t2ecx4bw3j79uw',
                lastChangedAt: '2020-07-29 04:21:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'mzcj31f2fyur3siha7cwkmopq4upa3roc467007n',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'o1x19crba2qja55mikwwkpgdnyzqjqakf3kcduwzadd0ivs028',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: null,
                party: 'zlq1lr5cq64s0jthslxqxuj6k3m1x9qqrm1er656ujagm4ld5hqbbqng3jzci647ufhi7zg8bh6csxvgmy1ur2k1s5u2jug6e11usw7ixvtl93nkztpdd55j0hw73n8an4tru36r3cx945tmu31brmcp19hki0nh',
                component: '3ik1ho0ufofp25rag3ob6495tosxwtkxf3g18ptx35w3sm8r9civ8ve0hgv8hkdtsdpl6jkfcuge563zhx02pk8poxuixe8fpcwzj24b0csup2ut9j3io82tkfmix3q0v4gs1o3p0pfh4lquh4w8evz8vbz8rgc3',
                name: 'igu7fo2hc2aqkqt5p8si7k0x5lrx0sjivp3fohni8yx0jadk0javehe2r1ht690u14vnw7dpwo7j9enhgos4lmpqpjkuz4mwd0k3eapbvrhbhkencxwpqqjxblqebfsif2zeqt82ats8hr36w6xh8t1be4aulfpb',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '9xsi0tyyk929ws1xy0g9bxd7ljhvc3iulqaoyuxth0kmc322ulzoki67pmhn5ewlnxceqlj811b9at4br3k23okok8ztdlpv4i5d9xysq7hgkmh2ah9o85wc3qwbecfz4dokamsdqn0tlej2ip9sz55gvcq4sbwz',
                flowComponent: 'h3kwvojnfwn9ybbjjvay6r4rlwhpy4a3wifieh1bbbdx42xvocb2ov3264vn4a7qxg9gddt8er2ckpsi31os9uqlvtx8jul7teb571b6f6kc01pbcp20bgy0imsmhmbjsmf281nt5q8nghcv9jyfl98ub0efupga',
                flowInterfaceName: 'dxmtflo4jo4ojdxjtozf1k8oygzuwzs3fd09bq5l046t21v6lvhpwr3tizd0460lgmtzy5695ze65x5zn45bowp416q3ue679e0glv707lu17rr5wogyyuyaqujmaq5iutn8kiwxf9nd6ubmxsec3pjschk9scf5',
                flowInterfaceNamespace: 'we2wi60njj41v7qa1k945xxyrb2omnbgirouwlldq7he36im66f9g7gg9xm4rtqx8vl6qqois21idbp2uq67fp3fn2dhznnxa3bkionkyih63e5ejpawqzsb0tmbnk6klh2bnzd202w7rrxy6lam5r6y9a37u3k8',
                version: 'p01zwzfelw9uwip45kko',
                adapterType: 'mvnzx0qlu5y3w1uwt9tofc3lnh4de20yd9463cq9zn12403yhlhy7gb71smp',
                direction: 'SENDER',
                transportProtocol: 'bmcq1be8eyxt9kl8tquii8g8triyi6jzg25bqkx7d9wfe9ka12hpks7pa0wu',
                messageProtocol: '2ct7kfqj7qz01kyhsfaukbuzivxtrbzbuq5kfro885e8pfdou9z81a4kak6h',
                adapterEngineName: '3nrs8oysf4ozum8gtkpo8xflyuvlusujmy8y2b7qve332t1d19lbl3hce5s9jo85na7tdtte1cfivx1v6ujxtw49r53vr061fx4ddxzhlcs1w8zuj4soe26ixi3gbmpdsvlqjjl48v1e6e5hhw9ziajd88mtojbc',
                url: 's3a7grylcj4dvsnzaudcbc10pxrznpwm6jmbfadt98tgtrp5ja688puuzpwc745ai917ntm0rll1haccguavp1ki159qd1l9jpp59yvs5jz4zpvgs8q0tbk03sni4pvgysl7yjmb48tnlpvmy5k4eyfqeuz9s28472bouza9lch3bgy4a0ckfrv3hzlumt9ya7if9nd0l8ugq50rhkt9gby8o0l47ribbr3gqd1yvpnq2pq23rmcboqa2txnp6rzkzz667zucj4cc7c6iaqe9g2p15zalj272v2pvzhu8jn5xnkuzjxi5lcnmbhyyt4p',
                username: '0xcjo9jsdo69h04ktucl0nawx0xox2a4obwgg8j446ourq8zsyhiibz2hg17',
                remoteHost: '0k292r4zxtv4fxzyz0gqgnw40ojvobw927d8menj12x7xu6luagsqvml1qgfj803ajsw9ydcp1v1g2kcniwfyr9itmnr5qjx3hmfk4mynot65loqun5de53dd43o6y1v50dkkvaho1it07pkw8hffxt6l9lkg224',
                remotePort: 9734143489,
                directory: 'qiq55531074owmz0qz0zd2n6dkn33vuenxd0nwy5w52e286guqg07rdih0ck652uc3zy2v24ae71yj366bw3regx2thdfxksz3k2qmmffsrbx76hxmievypzcvryo31ufcnj8h11ozullu6mw7u68oeqlk53mpdinlbhkejmy0ypvuwx56nb4tjb2p5ckjgf4wctbdjiou97zh3534bpa180kj9ryydwk37e6al8bth0demg3333jig5q41yc2mtbdekxp8qbizh9ylzcoi93a7fm6o9i8lm0uyzcjkeiqpbmavfrpkpoowywageh6oqw0omwo1mtfdgjoc6nh5hsno97nlw8twtgmw3r8qv5e62glkwlmsoqhusw3abk813h4wx3zjp5n6z0dk3jvbxf0syckurhkw10bjmqcey1uph08nqveie8ymk74in7frmleqri8ssta5chmr6vpq1u0pg8a84cubzcq18r40w0h148cgfsd6a8quidb0tp7gb76mlyh0sfts83d51mdv47fq5jo39nd9hd5yji88j4urj1y0ii0zd8rv5olqvjg6uv4c2loq44mt8dpqrskq54l0hewc35iluebexb58iq1wes9qz8dk5aua6g70m8ex8npspbt8q88wiswjq0p5thizel8yfj264gsdgdyqcwyb33q8dd0ca1g64h38chk45sbjv9hc0ruwbhjwdqsvh1ddvcybcc7p6vgv6deprtb03rxsgdg0x15kdd7hbzgxt6vbdhb4vonsdfj6b3c5ch1glf49m0loqej8vixstvgkl9qa4fql5pfkuxs4zdemprhzpncpr3qrtw9o2o9bdcryr8ksonbh3fob9bkwrs22tibx22tkgt6e55issxs1ykej3so69l7e1oky500kctden906w1yzv0bttvtqenbvvxcbwxls61x7tyescjdynw3ofrkud84prd70rydr802wwsl3prz91jcw0nemhm86pvshfdbsdj87tkk4e2slp',
                fileSchema: 'jo1pz100dwvnhiry7cuuppixc8rpi05yhw7fk2zzorsf99sil0hca7byqqglj2va23qex595clztqwvyfnh6uor0vlur9hhr5rvy1dwswi4m7bvzpm89keftjt6v7phv61030mv9f1516kd4xokpm4o0cegszij0d17dm9dhncpzyu70yrbrgj7l165hzzc9jgcsrpv796ir7g9tb43d2e50l59f5me5efql55b3l1lz58xxiujc15vxsocwrcmsgkodap34500r3uwi4htl0l7ge1kmjuuxdm9vtmlzblxtwlytcjstng163yy0pr1qw38n5abgyp68w4snu1lfq4ohfo5prd6w9b1lpjz00fzuj3dbd2ugfskrh0csax6hd1ckaszms58jzw14xufhlp6xktlpx8z1tmjkmc3ed4cqw36tu5fq8amk5kzqel7sgbtylpsoa77796o75zmjray08admez6afw6w0kovjlyfhr9dr21t046pl398mas81k814ws4pwn67khvnzsnmrc9vnz0v9ivkloaqovuvzf1kiwssh34of973qum8e4e6bdlnlu03memp5bumei95iskizvc7hm97lar59kdzjlbp7bv1qe5xk0tmdyod6nno3fr8kn9j8zq8ruvg9md6gwrgt23z8kwzqqc6ac30n2asjfrw3udt8cu7ohjedof7wgfcfkf2nm2qdwi1loeotjjc2jveq3439838ggfbiz4kvpjedsodiwszmjdu7p33qnyy1y7m7h47w08x75xjrjk6z9ygt9ypfh302jk53cxmn7hmhtjo1457odnjm6gwiv47lxzilxt5sxudt8miycl4dv1z06y49argq2tk704og4ro57gfyg53jaa9sll1kdpqvh0svpsw6bf0ju8qc60p6lnxaamqgmm664u1fvm8nklth3cn3fkiada01z1bb05nnquf9wxg6iqx8xlyguexir9hd81y25fuvvzzcoyorb9n66yafa7kvyxpl5m',
                proxyHost: 'e0ao2ppnimfm5pjk9un0fb2grub58j37f71ym7vpfcbbuzf0ypvjdpaawb0h',
                proxyPort: 6584192896,
                destination: 'beyd2teduf8e505m5dqtqeusati8zyvl8tht0u9x9ljsh0l6fwxcnq32ufd63c35hasjtyyc6c4k8plfn2rqha4jgpnmvmyszkhjvd75le2w0xwmqfmuah4dn6uq21h31xxznq8mdrjzbbdq6yrs266hpfh6q4fk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oprlxoom3f7mqea7qlgv3jh76kr4nidb03r0xgrw4toz168qp7k74zvw4t347cjdgj9nhvtjwf2neidgjxdyflsfl51pa78biwzfz3ydcwuj8qxhl57qnoqa0a50b4kftt59tc1ivy6ql3xp93230ytvr3c2d0jk',
                responsibleUserAccountName: '47ai7b9x7eb18e6arol1',
                lastChangeUserAccount: 'bioc8pu7iw5cbn8i34f5',
                lastChangedAt: '2020-07-29 19:21:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 's5hju3kzqp39knmips8zxlb0hvk9w5rdl0c58msg',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'fkpc5shoo7p9rb91zqrht67qizx9g8fe2699yu7j6zc4ps8q0i',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                
                party: 'dq3rhxcpfird4an4t5w2pxqgxghphxwjko5w5ga6n0k7bxyclq94r35ri9x9egqwy1ueveriijvdly4yd1rowtd7nqpl728dxdkhbvtd9yewqtnitmmpunt7bjgb6fsuqhg3kixpz44zd75lt6f64wcoltzcyie5',
                component: '4d6slde3fr1bt8fm4cimhvclw3d8ho2rnl1rsqna324z340fbsicgeed10gqrv77pqfieyc9wwlun48ighdil149ev7pby1nzycu8m7vljg45pff2tfdtryhngz0jhu908p23dq4oytxax5wyji5x12dhgv9wm4i',
                name: '6lrqocd9xxob0k6qpbc7sqdbj3zlautagu1g599tktjks9umaqojj1lnc1zllv1tmj9x1hl0b8cel8sbwukg4qak6o3ykzgd19cd5t6pqpwny62myks8uxomnr7eovrlt191xy6zpowtk44v3ye9dslbpw60um28',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '8dgnba3d54nhc2l2zabufjc8fmckh5h0mgv4ozdyqobxljzq04gtfb2ywz76ao92n1k6ulawvwyjjyefeao6ymmzyoyp5ocy2f1r40idcznrfl1lv2x6swod72t72tgqtu5qqngyo825u76c7mn8d0lew1qs91sp',
                flowComponent: 'ronnz2gs98far5yy45ukchw1bs1njp0dg0d9j0wvb3jc4pmeuc18nwfpzrw178v06hf5i4qskrl20wl8tuv4ya1469as344mhdoh5ha6qy18kj6hqjqqnqz9e042kpko4v0o5pd8f3ya08hl27jrj3t3ryo270bu',
                flowInterfaceName: 'd9nwdhewj2o4r7jffubrbkfjoy7aaj1qi2915dn8bmf5l5ysgww3fj7txum30r0oki6v2bfuik0leq1lszxu1g86jst9chzr28hlpjayjz2yd2dk4zdgzrej1ftikjmtwlvcnu3wpjax9mwwfdzj9e2dz83evyau',
                flowInterfaceNamespace: 'ta5u65of4ryw04y2ad6aszr9auypohpi28wfg943omez23jnv89opph6kswcjlrszv16npipl5mx75es8gcue0gv729ypci5tevrbaldmco7n8a0p2upmqlo8cy6junlirsy6g0py8c1mye194undg87vukwlldc',
                version: '823j44im1x8gnoldw5wp',
                adapterType: 'u5d1a5esxwje3v4lf63dgd3qhnf83a220m87dv5kq9mtoqwzbi2pgkd31i9i',
                direction: 'SENDER',
                transportProtocol: '3oamm7om9gyv45up7duyzpz4gxqcnqxa7t729702l3khd32w3kx01ljme0ql',
                messageProtocol: 'm9afpt62oepd501pgo92zef85sfp3kydjnse74y4dskiioa8bjkszq7es0s2',
                adapterEngineName: '9vha3wl2et2n11lain5rbjzxkzfpq3jk92qqpywzb1lfjp49zajk28tjstl6r5mnsnpuun9994z0kokh5irfz6uadvq80czspmt4nivvjv4vbixzdjajtqbbpvomnmqwx33mjybe5xmkxci654gvx1q02whjbyi7',
                url: '2ol2p9ivu7m1k00y77eb0tqy5h17ihvzc7un76pio3qgbjm3tbskeg8jbz73txz3lv1fd0zxnftefwpn0080dt64j468gb7ufncwv3p9s9bcitsflgm3dya1cnzbmpqttdt19knhq0s4lzttem4mvvbom7o36g7zgohxjby7dahjhf544qgqprsgzmb0qui57xzy4jwsy5adsoiu7z9flcjhoy0yjwskyzs3zx4f42gqjyh0ru66menjhsetdgbnoavje382eaxgrzm52ka6adveszs9tqgcecua3nwz9l5umt3zqqn2fkod2zq4dvkm',
                username: '1xiql83pb6i0cktrj623qee4s9724alep6e1sbjivjj3yfmghxo77hqx4wrc',
                remoteHost: 'wj0ng51drv2e8rhykuqu6i1x8nackmz7uvpw79u7m4jbbrey4kuoyau95jd5jq3deybstqfda32hmh617lf2pg1o7hg3mpr70t79s63cbitjv2lp9s3t0ksuhmo48hxjx52qqd4q79vffq4k216qpaazxa12nlbq',
                remotePort: 5352523527,
                directory: 'bhyzj2sxdesj184umaltabb3atdrkzelkvph6m7otisr7wi1b9qp8d26xzcmqlwrelqli50u8y9afs72u9mdm9x4sqbzcdnmx3ut0wssocz5pk5obriei41pzs8nngdozgj4uainvwmdgzdevlhhyvhd8mov054ij0sgqbeo944xugdqaewz2y3e8z53lss2oo0g5whj832l6j9bj4d4gq2nj456mfg0mwfdvlrw814voalmlibulp8sl510r6kouqjouda9f2qfervdx1ue3kcw1e51ip8e4dzvjxfinxu8f8vwn6on79mg6ery3l0mirymx28x3ze28q7hj94us13modku5qzzz1j48vn1wyyb3mm0dxrd5gvkeqfscy8kegb1jqd2imc86huwgqd621teljdi7opwglbnv2xr47qx9u2witwrii2lw9h03iowt6w7l4x8wlx22dt6lqdenzync8kgxnwi3bvovhe580zcxefkgk1swag8a7l9c01cna2y7r8ug2ywel81fwaisidlcuaoqalqkljexkxfjfd210pybpxhejze8f5emzuxfjo3z1hjzrgu4h3ibc4j5k2e1wq2c7ax7s52t9oq4z9l9987z3uqzs5jovwbx33z2n6ngtbh20rnibrfvptk590xe3l1jt0l1az02x28kcnod42fsgsxuqqm3fcbm158pfls4jo6oxk78c0owtavdcgowh1q57jcemcwl19eqz1f4nix73u6qn0o4pmmr2eh47np46vzw94wczi4vzljlk0zfds9nhvq9udny9car6rw9j9udkegry9m4r8odtf5oxwbhsrd35jmb2hom5fcp7581zgshoiu7payn4r4n8ba7e5pauevesu45z9xmeoedahodt7u40npy0ci7ara9bjyq6xszx5m64fqy1bse9elbq9yenufxsdnixx9uqixl4vu70k2rt6ch74tkvmmkdpot0jaik85dnq5bu82oibhwnsi8sjgt2whkwkbly5i',
                fileSchema: 'b55po1xh5g6jwsao24dv8418h8empr25bow02ouk36wd2je4tlx9uz8y3hp7gb56znct0g95rs4zdoun2ejptcim1k5uq2oabvopjnac48ij9nqnuk2gfe9fnu00pqwxj5iu6j0lrgau0egdcw7nu2hcmzp1tyvoccv4pkdp050q5p8hm0ksfbpzor71ofrj3fzn4mt626okp0pypu8lnj83sgw4xxj76iwec06ejj8me7a0w5ccite019wp1iwlai3xy7f1iwlzxessxc20l1xpas9v6es8hqnqay9qwnrbhpj4s0zags4bv3c99id3vydd0cxoyj7yoynu1f05osmijx68q0qawh1geng7pphefpl36eopy71256678nhoozjwp17mt7b0ihi3iqhlbm8ekkl93gd1aef548o9onk86im129nlcte0bplsbh1lykombnr7982srtpybwuyuz39g9i5gwn9a4g9bcd5u3ecazwtmwwhcu36ihmuskvlqbwd4ijcqnmjau3r6xz81u47143w4ttedeep6rb5rz5yna9wkm4fdvdjv7tmmlbirh8hof5sjk5g33do21sctne58ab7skg2fv46w7savfq0nl2w8wuwf9u274p8rk7if2o3vdepg9ln6dyajq8sb1juccf08kypzqtgxl7gtmszcx1qmyrrr3pvd3v9b6a3cyc14kjiazcev1oy6lj5w0sa0arparc9v7zx5egfjlgd93rnzujfi6i635ggh1y2rnw9zh717v9j7iixgo90qr8e9iinwmgi9qgme334q4hsrazu31q1v61xzfo8lkev02vdbvvpeji629xeco5zxo97znjdoomtjj3rlr8sxhw7fu23qedytcqxrq6jibwe3rkqyabrurvl75ia3p3nrq1mm1yscjdhj7eng9d65y2nm47ui5s9au960u6mdnhknl3h27bfnyxq6428w1lhxrr53152ycsmwnbypi1u6nuvyh43t1arwis9mp4ouh7z',
                proxyHost: 'v8ocs7klwu578kbbf03imqje8wny6ls2eop4bvah1zi6r0rmuww86ke32qhe',
                proxyPort: 7277944409,
                destination: '4lep7r6kdk6sz5v9cq1v6ml3qrvs7y2wa2n8ila1xljubgwb24ahx9lq9fmrzaysfz9ccfej5q7ywqmq9klsjl35bk7lxvwivjbw29hfxtwlaydobgh7ndlbpybf8xcm84uqjbcscj8ilrv4aeb56wll3bat0x84',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uhtmcwkqrqbelscx1gcrwyib21u6iuuneuvjz6obaz3s8gkpa2nz9lfxu1clc7nxrndm5i65ndx2ws16ecmwxq0xyv3zhrgw9jzu6wfva40fgaj03b0umbgl2j6h5w1b0jydir34b5nc8n9ns3xbnr2d3s3ulw7o',
                responsibleUserAccountName: 'lo8f8n7p1pmuvl0s0hml',
                lastChangeUserAccount: 'whfgjw94nuix3zakzp7i',
                lastChangedAt: '2020-07-29 08:33:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ud5wma6akmnzyq57iv9wijli1p3jaykq2xkbphrz',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'xn7qgk98cjw2sv8zhcgkx4ompm6kjv0z2foo5kiv5g7wxto6ne',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'yatvb5inf62yjn2fd1bd',
                party: 'lr54enrrb9k3v6cj3qym8n9m4biutm99sdikux5v7y35gv5a672dzvb7vppbevs6uf149ff26vf0d57w1r0eviyx4t1b4p77tchvgrocpf901hwo6pg8a6ola8aghz9v7166z3y8v4m87jjyvglaaci18qtomkb1',
                component: null,
                name: 'pln5wtb43fg2sxgngpygv3ki9zxy7oouggv6fapnivhc8yelet59ptvhvi98ia7mbri7vzbirhwomfd4ww2qmpwzgrdipwa8bw4ye5qgdxiwt7lzhz54dtmhb7vwg0tfb5aq4yhishk2jzgbozav5eaztmwsctpi',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'h741dchml2zp8l58loqe9qf2lnayopaxdvmiedof32wr9kqshy3mxnaohmv7l26voufxieqllmtktq64gjnybv03ng6myzvmo1fendunyeukzfo9ijft71d05krmqn68rf3ha9gd5yerno2f40ytgds7ypyoixt9',
                flowComponent: 'u99z3o8f5od1o6qjtcsq89q7z70riy0m4dkft3z2vihm2b4fsyypbaejo5nhxpqsn8secq3nqi9yaty0e932ddzb8f3sglda7oa8bug5mms4cn75aykq3w13eu9hidyc422fyefo8zbid6lgr4nb8iv2lid5s5ty',
                flowInterfaceName: 'tc98skv9pj3xiz2ef5zo908rkzzuj3ry4e0x0ms6xon8pzudh19kqio7k6r0rkb1czv94u9nev2lu36nbug8qxxx3jkq893vorugxlwfqtuqgg2q5s682uxmsui55neo0asmejzs92kzgl5p6tdmwjwl1fs8101n',
                flowInterfaceNamespace: 'pivxpn9gqm8aarx5lmczwvvgyh6p7pb9kvk82htqgm1l3mbi9e5e7dbkfau0y832i4pnlad59knp11niiwpmql9elgfzhedq20vptphzybp8q9dzamu2pzpss5o1be54s1jy8nvafbe99ymyc1hth67zwh3wrh0u',
                version: 'eqos8uyfptbxdrhxhq3e',
                adapterType: 'h18vj520wno11d7lxney1kii9k6vsj4v7u00sakqsbkap1l9yqo46e4yan3u',
                direction: 'SENDER',
                transportProtocol: '9c0yjy06dlam50stumxofri77plcs3l9g2yq7s5g66yaypeurc5p7glygn2w',
                messageProtocol: 'jjde2w6tzqbqbdvysskecjqwadjnbj1cl64ogjdtfhxt127iaayciqnres6p',
                adapterEngineName: 'pthih4qtzgy32ze1yfc1yhdotsvspo54w3so6ynm0wfiirs6aqbxdxnmslajy55u0q9hgx1nzexaphipxp46vpfwom0q2klvw18nffyjad1meus2dsww8wu0ubgljcis33vshf6j59qfh5knp1lcj0yun08s2tpr',
                url: 'qwk09o18fzrfasp5ege8e8bipz1hvwzvmtrbshdynyi3fd2ldccqvdo4fa3bb8nzeeksy5gapxxm5hzkhlfgjptclhvxniyd0s3ef4jcwc023u053al87nat74kwlbqay3d0cygwrg6fft5kljiipumhg4wz1yjsdv1yubanrjnjpkzzvxn14qfvsa2vlwh1993nvk8a7ej9wjvje5tqn90jnssl7dumx9htlfk1bttzippfng842ttahumslojztqs2ipol98yzsdh4iqqvrzoje4i07gr2jqxohmb6u1xy31bk6mptg850gtaghbp2',
                username: 'ae4k873vcwifneols5u9bf49s94usd5qu946dykeezumjxpbo58cb4zcc7zm',
                remoteHost: 'xy0i373mlwqzr6zx1fuz0t8wa9xyamv05s6804fhfxjb0w4ocnfvp42f6r7wu2cmfmni3vk098wlt4j5z8whm9k9aiucyw2ob0n4bu14fi5pq25xwtbkb44rhhjnrp62dy7wc24vvficzy6cdx7cxsrbgfw9bzj9',
                remotePort: 5315877843,
                directory: '8aycb7p4ol0h3yguaqua3l1u8xubtnc9k9tgqihsr01rv3qeftc44n8w735p7c50dxr25x0cnsgf7uvbleztw9qe2k2ikn50a75if4bw65jo73g9e3b5hf7lml6d5ofcn4ws6p2rhtxzb3zzneqtrca1sfhd4j8cmpzk6ek5mqjd6gwrbz38uulwy8snlpp8hps2zhfolrgqy4h4e7in3y5njzl32bl36rw37swffqcyos7ia36esi3n3xtpzg5d30ptogkha8fulev8bt8w21o5ub7invca9iafvvn7xqf033yta08lfkfwi3linx5ptk3sg7giyjipi6in1ymo87h57m6652zqnfxbpezwwz9nk6fnejtqwf2uyyuls0s74arafd00fda8z74vjzhr3aimsxcgs7kbbfnkh6xaog9qfarv55vuxq29lrtb3mrmurznxddfhji25ngvew5wb4lxa4dax6xp7dpwhwzmw14lxv3ks546jz6ysvokdkc84qbj3wndhd85fh1te4wjlloli2vux9b0uokh50r3e702m881omvqezam1ph9fz0ht53l1ab549c6ugste3ifg0c0v3a4zjyu8gpty6qf2xjckie8x1j21op2qrjmy41gk0vepnve9ti5tk4jr25bnhwuj1fon4vsw8aeszivbkbcrc2sl9764ce61urvylel8a1j6rb5dediridh1hv4e76rbc9g5oec0zzqrphl8cy5tcrm6tyo1son5d0t4cnccs4cuscgumuutaqd45bx4jnwcurek1mvz4lai6ubnftl1mx581pob5pfnhkwm4ewwoxnwf92qtkhq1zf09mvpdmlp5fvfkxd3bezaucxjp8ubinkz2zienpc0kbtzw7xgy2amvycouzk3odyost4ksym70ys9ae4spkr99n3mkf2m7uihfq9zclg4hivvgw0gpuid2jeo9suyqckl0zt00tui50rccqo93rk63kpv1fjr045j799w62q2jgctxpx',
                fileSchema: '855ammxbcd794qesrg2mjf7fy6dmidy77emkecfqtts5tl6y5uqzvnd1qmur0861ey5n80pw2c9nybsvkfhwsqwut3a1ne9b83vxsao77zgpeu8g298oyuqok0q2rxnl7kjyo500hu7thbp2ammeqaqjcy44x9sz33axq93wxhe7q4pyty1zvswaaqbgvpcjeyv554sirplcy5nrveqt6nmjiei6n7ivvxqdmtbdii7u1o1bqaqf3dm54841s0iljkpo4a8udmibzicrssjkzv2mr4qw72l3xuk6j9nar34h2bw1aqx3i7rw21fo1fszkhsj7eqrqk0s7ams96e4bhloovurol2qs52gscnip5f4u8uyv9u0twewg3slvhcweizgfyf4iulo80f9u4t7lx4ir1ok07ifqy2tu8b1590fmzmxtsmikddeo1pz8vov3q8qo9yavl0beewhi4wsbkl464zxpen5hs2h4qo1max5f6rkgivs6jch19xzydobp7yr15cqi9hcxdyvym9afia3uxu7usrp4oid151aj44waas81tcidmzw3lma2gp3uhhqr7jn3561pl9n2st5cpm1s5nm3046bp9dib6r7lh4tyfbrkm1wdsvr858o4j1z5wcc32se4wkhaiew38xz42bhmgscysxw265fioj13rd0afbva5dhaaypr4mvr5vzcwpwaojmlbjr7diesqwipnk3ubth1h9jcsb68mpq3su6he9rgrx4y73bi2tt0jwg2ohszeks3hn0m08g1ti4633v3extfw99jgyqv74fnw7hqwpyw3fubxwc5tz01ifqugb9sp4s4ncohfkb2b2rkzi9uz34hsf3qpxgde01f9gtq4rdvybu6j7jlaepgbtx9kbdlup3lyc51xt7ozlrn349u4kxy145tc7bbrdzhbo4qe1kah7o1lllavoy5rgw6px2bmxqme07pwcokwtrzq513j96ei3o7wtm3ddm71ro2gbme6hg32x9otm54p2',
                proxyHost: 'hly3iinyi8570kl4ccu0r0fnvw8742bz31rxgn7o0jhgserpl5f9g6fjmvpx',
                proxyPort: 5342630419,
                destination: '18f51npgqnbztilwqfgoz49pgg3o4fbi3mnjq36ikqh9rzej0xgwdzrl6lcar1ihne8scgvww90rfo8a1obtnlvpff9mc5mchmmk8jem57ko6f6kh2aqzasfcf2qc29hepypgnjexlkspyxbsuwus4sdn7q3qtjq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'upaabe18nanu2tk6q97556gg0lilix7gavrehha8g814ve3z8telvbfxc4tblz9hzwx7lnsyhlz0putdyadrygrgeppysec6hmwfdc96lu5yzc0e35hmpduqcj7yn7gfb2f70wsv0vkniffmg4fzmoeourww2seg',
                responsibleUserAccountName: 'ekxjqqk44gde49jnvu4x',
                lastChangeUserAccount: '0x7x2zrkkovu7d0hwxe2',
                lastChangedAt: '2020-07-29 20:54:33',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'u3jr2xujfx8oo43ntfswwbsalzcbcngh1kk9ro7l',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'e4pxu9zkl7kkjf5377bhc4xqh8gd5kqdl04jscgx9m6ifcr7pq',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '54jrw89vfl05m6xlyic9',
                party: '985zht20dve7oiu1omr3iowe342d8fq9qu8gf9e80at8cqsc9pz8sf0v971w41wvrpjfr5t9je605tfhf8dkw0gdm9lmut6pk0gbexkll7fs0wvpkhve1sahtkjfyalzc3yke61xye2uz43kped803woim79j1p0',
                
                name: 'n3wzt7svez7vyypr32fzvj9lmzaws86eb8pmmkqqwy2zvnlud3ywdtsvux2swxry7rh0z0muw3gaie9ccd7cgg460bn0fibibbqt6nx0ugwcso67eyzu4kutml70klcbu1yvb9hs9798gmv5u4taurc5njx6y2v4',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '1kca1lm0jh1u1x2muxvgl64qtl98bjx6ey9522hsk7l6r5z2zwldlrdcd22jmev0gbuu3bzkink9saus60lfidhlsk57q1mr2elfrdg6ixj6afide4uqa2heszuxe2nhflaaqg3o8uqyeach0sya9f5u4ch1w8np',
                flowComponent: 'd4itu6y28nqjvcxjfcsg6y1a6all0v60jvhhze340h15r5qkbhdshixtryarjb6swdqdh5jvbp0rdkvni2capi3ypgp8pz23vps55uuj2wlgt3mfp3jbogh6tamktf6b11upr1i384ihxm9w13ylwx2pjgyz8ndn',
                flowInterfaceName: 'mgsfyg9tz7pgl3wwnch3fstwgn7786g7oe9qxs571g7msck6hphydr9is4jjp6gjp040p4dqolzlh0301rsmn8dgu46nzp80seo26k91sjgb3ylh11d6p7p2qk35ag19l1barpqstdgomd852itkd3h10xbspu1m',
                flowInterfaceNamespace: 'sw15nbdznxc2yhsifk451i24nfvt92zmvkspt127yybz603e7lizn040pbvvm1jbzh48qwnqglv9iz88tk71tjj6ny1kkluhirupgce6e3odbb255aqln1cix0ta9a1lgl3pzufr4tszj91bmqnyrsxrsjt7q3i6',
                version: 'i17uu82605mm01e9c03x',
                adapterType: 'qa0y5tbcb02mnfvjxjstwewn4w44pqnkq91cr87t46chigufed9ykko2a7sy',
                direction: 'SENDER',
                transportProtocol: 'd9dllhozznrxfv54hnqljdlfpzvk1jfdha35zginz6iixvdgkjfhk7bnwsdd',
                messageProtocol: 'ahkqu0w6gph262ipqglzfscahqsu8cwpag7xokb9sxzuedkrwpbct2wkt2iz',
                adapterEngineName: '6jnzw0caasvfj19gbdni39rlz9k6nsyqa53f0f7uymvx2he4x53u71ojis3xatjt42yx6a11r1kdjud8bw0785gmgv6qr4mz614shgvg7b0lxwhdwut5cdx9fd07do8z7sdndey8tp120pumnq4c58ariklhcsas',
                url: 'adtagtkyq1stue33ci4945zl6kgizwkmjhlmlbxaphvwy5p58eho5trx50sabt0hamyqri0xm2fu77xelz1re15pmkjfppivddv0q59yk91hxfhncvvjj3lni0v189df7xgphiyffo936r2absxrlk8253ylyqsby6tbngbfjpvhkgjgbogcsejh4ckpifw2l3at7964wxyqbg21cechm5r4qg2f0w516a1xlu2rk1ikggmtiuwuuunuqp882q12ifqeqgfic1duqxufogrixyeaybd0malzroe9insjtpgx6bw960uwjc7i0f67a0mz',
                username: '57gmw3lgtbfhv8tglb01l2cpz6tjqy28a0a4sj7v2c0wsh4own21bzlykj17',
                remoteHost: '4o9y2myghmoczjfvt74up4j3vseodsz3jzqc9xqrt5mchj59rlkj9732rkwqdq2j0wev2ua71qh5j93419sea44xd6s5wb7b7rb4mjc90rlo9ha1y6hpxloe185n6kuaptxz53mhofpa5b3a4ilkpzz8txhuad2x',
                remotePort: 4919898492,
                directory: 'jxqr2jxr4fiizllm1zjl0z6webuemjpvasr4lcnqzvgz7lcxhw69llqg1nvbx9foh61hrshynxenxhk4h4b4ho6oo2gck50e8nuhwf5xelo8ulzrukz4ojlp01e49zecpts4a826denfga5pval25edqota8tdvloeyh6c0zo4ng5z8ty9evjlhab2nqqsbkl9pm8y8pzvwh7cwb1w0d5r20e8crcnfp4qofnn4ptwcin00zpe5hvhn5jgktkrd20vc4s2zodns9gqzxwhrhjvtd54dcl5dzzkszo321f1ph2k6f2dqrh2uo8fvoeo9g2bptz6ur92odyxjndg5idrfkswdus8gy2mhdxa7rzjmdmbz4v1hd1eco0udp4f75ds74022jn37pvdmo2w07ahtbg2wptoqb6n9qoaffic81q10d5s52nhtv0fuy191a09577isxe8kr8hs5q2zfz657qcj2lp9ucmysv0tstueg8cg3574ymtmo1vi3vkzwffcjelno1awp1jn05eay4u9frijfy18iyxogofq9hfnetpcevh7ss5bn5wu3likhiyo0z9e5zp8geve855dlz14e2qygprfinax1h43trivm2w54kfptosxhtl8xfc3qn505t81bxvl05cr42gupcq2couund5vmoykphz1mvbmyhjvr6ik9y6w2t5kfzoz2chmctbjf0gyz2vt0a728j4g1iissblpjvv2c14uj642wk3q4z6p4o07dwewoddi5xxrzeim7jvnk3v7vfun6ci6p0sp2kifj40zjtedcvxlvx9gv29isppd0lqsv8rn2mm8t1xf5bswhxojabrrw56vsdwrco49rhmn1pq83f5qjzfcxmhbwzxjao0xnoxyyuwanl1a15qt01ybhn4dgihzzmzk2rj81prx5y8sg1u8r792stlpx3v2uade73pptqdsrjrc8363j5ezgqerjz8ejepy6v77azq2b6853yx6hxo1jqw7knnphnevi87gy',
                fileSchema: '4x3tmasds9kg87ze5raj31sj31hygxchyxpt6s52ocs9r2ub25hs1l0gr5bsixlg0t7ri4amlw1gj5ml809s7em7bl97g4pv7in2wa8f6a2yhbhgajajaj16kiu1mltqfr0r81h878cd6878h40et4xrm85yjfw18hj2prhavpx5axpps2hzye4c0ogvsx9e73cinw7522dc6k61lz8l2x98nifz5tnc8n1ap06ygaueb94sh7agfav136hh7ab4x1kbi0b3yymdr4eigtwlymokog9j5acw2lbkjfzn54qvmp608pz52wq5zee74cxyjjg09nfg0slwas62fydq03mninl71pwc4dtcljxpwolimkarg1hu4aguxyn4plypoq2rxswo94t08ume20is322auqy3cirhzykp8e9k152r3lkhftp4434ef98gspl7hv4ntkkcrkusc3f06yrfaa3rgi6ixuhbxsqv08ksw4d7a606dz50d62i5u0l6bp5guftjw47t6ytb3ccqphpmro3vlj8ev6h89xqtrtz34h62lvlivdg58eqlf1f7v2ej0kn5ddn1vxhv0v3hidwdfb2gw6ibhlg8lzsbw5du9f6pqlr1tws4ik2tutsizsf8cfxlxrkwx25ljehqyd7maxlx0n648nzji8ehptj7vfsc77to6hih7dx6511j0uruj7kw1urljpyu46bbp7nm1q7idyldm9zcq76osp3ul3hidu1cu2d9a3styitksmxvuyacocfe1k8xkd5ua3wf5zmtgqrpiv42g07idxq10087oxihj4keu4e7hna9x1erjhrv6mmb8hq8axll9oik11v9d4c6ye9zf7w6lgy67wjiunzh0bt3a9ntpc8t12f4ds1zqyjfrjaz7lzlup2tbu7fpjkn1c2u5pnvtrh8f1vnhdacmqfhpijssw4lkitij2i62g1bxs1jzw2b09llr1hui5ugrp8zelgg4fg9ww9zemscearis9lcoss5gqo',
                proxyHost: 'b56d66qq009y625wssh7qblkqn9a7pwhfsho48z6h9xom2aq53ovfb4one8i',
                proxyPort: 2718575296,
                destination: '1vj2ua7bi9v3hgdbe0qq4jiq752a74xnialuysyuahuvcxh68fwdv0tlfjnzqd1k06zyuerpxhmumr6bwq80h9j8aivsb0bhati9qeujlavsrwkebo4ohuk3hgyb1nurdlz33t3qyii3do89mdurtq3m7pz9kgvz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o49dy8yxvd9kjkur2zoq6kdoq6e6yo96wdkgrlyl8bkcgwojlsbpjntu4e6nldfgw6dp0hv1684hs2uhqrae81ajmyr5mlsz6l04s1vsnwfqvewa4xbsv1a443n2om98gpo5wn4poc9ch1py3deaud02zsinno1x',
                responsibleUserAccountName: 'fcmiledejea4lknebbpg',
                lastChangeUserAccount: 'ytwbqdtxj74jntsih64c',
                lastChangedAt: '2020-07-29 01:30:57',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'g14c39j9hybbhj3asyeuhqto6tq00gwzuxnbbovi',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'gxzbuisgahjoahzqubmp3hkgdwdhwvz182eki9t2g51fqk5g1f',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'hzmklsl5eiqckrvuthrk',
                party: 't3tink5d6arcvqhxp3qfty4u21pm45fzrnr3499zqmpuubc40p8slxi98ic3rd4m4nkvhbsdiuyrmc6fi2okw21ul6o8o37r7tn9op9z9stcl8n9fp5udk8edssrzdv2dam68n8dph7ar0yr32xs5zvwfltct0yl',
                component: 'zf4h96k13dv4ldc1lthxow3kbt9vqlqx9gnriz2o5nfnbr3kzls5dyqymb3eyekpjl7tabxyke4csbidgugeixk6lqyfih4cecv45zcez6m76wf5ag5dwk88r4a3tv6c6e3rdm5qncih9d9hgg8w4tb2p07jvty3',
                name: null,
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '65bmwkpaxik77n9ml5248ly2uh69frwki2ix1icpc7min8fjz37cpyg8ruwok4511miff1beav6i9jec587r5szy1uncowgjfqo4c7ju8pvxegg3aqr0mja6pcqst4ytjwe7uf6ylrzwjoen408tvtrqlc0zh6ao',
                flowComponent: 'ibn5em3xd65nois8ea46tfh586y1m5a0q8qgwz0l0g7qhh10inhd3wif9365mmsc33vmzumxmnx0lg7v5br8sglwbzd0ip7yjw4zp6h3abztl75qbzxqy2y8gn73hv8g8oeg2ddd1r4qt2cocwyv9b3liccxmpnr',
                flowInterfaceName: 'yehke09kh29wlgws5jygohvn6q9mnx306td4jojdu13cmov4z2rm06a3lzuabyde076mit4ap2lq9lf3un3qvmlk5r2w0hy67eawdhs4m97cjinpqspcnzleullen2g3k9ez6eyrup79mymujtw4j4n7w7b4j2bu',
                flowInterfaceNamespace: 'i6p1m4omrs4x5tizwps30yw5h7ntbj3njhnt16bl8nb439bqv49qfsn24ck6xyzprburjm74z12o8ultby8nxtinj8cngqiothr24hku5lulf1mi7v0bke3dpchst7zc3mji8ci06br0hfnsnwbsxzpc5i0x125d',
                version: 'p6a06l7kjfcer1pz4nsb',
                adapterType: '4292gsa66u2qesi2x0z5ssadkuecw1jflmiy2yx71gr8rds5bmclqblttzgt',
                direction: 'RECEIVER',
                transportProtocol: 'ciku7068wxvhj8vojkgsa5aq0kn0nv38s4oo6oimb10k8ggonne9mdikszf1',
                messageProtocol: 'o4sxitesajaxttagjbz3us0rmjixrpb0do70rc9dhdlya057y22fin0qdbtu',
                adapterEngineName: '7ew6sbl6aynvr5zcnk1zn0ogo5v3tw36zsm6xjzto6mmawniqseqq3bygc3qwshx6l5vz8ptvmajbss5aivlwjvux6usi191aqmx3jvh27f29s9mrziuiarbgqwcimnusfe93s6kii7eskouor9ldg955qc10y8g',
                url: '65ndvtyq3dzsp42hz1bz9wfqp9wko379285ai15vteotibgbz1g7vgdleyuqt0q3fj26n5q89a60mo3cm420h2b8hhnzyqia8aayysm00foa9aua8ezrwuw83oe7090mf81xvg3c8z88knmik9wx1qrum6ksw0whp11kx58u1xilzwbvhshesh4qz7agm9e8y1456uyffhw74fgf6j6ai4hmxgkwtqoyen99vazbozwyfpr2lj7f52gf0qlwroye8l5ozlhgkuq831hmbl6x88surjtb7xtq7pu38kogyb41hn0t25fi6cfmtkj5tih4',
                username: 'u5f98hs0u5wrc805g6h2k1ybe1jco3ef0j1zu595d0tyw68qr67jicychnwj',
                remoteHost: '4k2ggt8fhl8d6xdjkvvada0vxay3gsniooyvkxxzu5xp1d5x64l8zggmv6d3otunxodw65gdy3jhdun579ma7j72qw7w4x6kj1r9zpjr8fjk7zm7g1r3sjn1639kaomianl90kcn8yn4lmwipxsuhx06okwvct9p',
                remotePort: 4674875971,
                directory: 'lpaqwue13njdriwx2o4bgsjsx659bd85vuc0j95wmrhoo73cncxub6h0iqih46a0w3ug60e3hkvd3lfyllqyyumdxuqk9qvcuawipbe48zipp61zrjpq4ysjhg7u85tg3nb0flhv0f667n2qwz041fzun6tjs05lahq8ebaz9tenmqaps1ftugflun13nek7gjak2v9wpbtunxp9j4st3u7fml59z646gi8moxwjko5v1iggjvxqrbj1ce9ved8cytbb2iz6x1tr12znezh7g6uqn7u9riv485b3du09fkxayg5xljupctvb8kyj4ela41ynd32q2tmhye4e6yuqgk6lcw2t5jaa3yfttdpmvuymrigc8og46eoi9lps8y14o5xhv5hgk8uvu6cpntxez634hi1iu0kvdtciesy15h8rcpm9myen0jqyg9st0cvh99xumryl7vob4r6fehjfxoi9zgem42g3fhbw65yua31lph128zng1qnlipnb1hv2q836ij0tz1ey8mfu1xqlfcftvrgqlrj50lvybn7pws5pzddz8nv42iedjpf8bklogeoa9h2waful9xqfq92vzhunnyu4o9oj3uxg2zo0541n4y6gd09dxst5xwjpo2o1lspmznyvrtryu040h8lfbss861fziw3uo26385sfs3fem2dg3sdvuxyaufj01q689arv9n7sppjskp70sui2lxxm1gmvsixz8xbbhj834cnqw79g3pzo11ow67nfevzsm8vzzap5wt0ompv8akuj1kyfke8q9s0ovytwwnqqxzhyd14ju1ducbgw2d2bws01pfqnzls5cbapu6jorikf7qamscpha4n04dpfm3r5holryc0tq6qkx0zz8czxbau4g6zlc1mscn6u06saulpzkxphdjx673cz28kpodaujxdxko765vs0exg9fazgfdpzbmmhgl6agjmdgekdnb5ltnljebc0cz6yxxyjgxufh87j38z4olwzuyuplkhs2fv0',
                fileSchema: '4fp77290yy95c3oa6hdytq3wd9hsl0a4am03x7duxnayt03oauw350nfbw5cs0789gbvxh2o8395lnlu4mhlvk1y1d8xxcmspodxzxo2ekr5dfkrr9uj5fxq7j3t4f3zmxfd0nifyn33n76i217uw8yzi8eelzv69g1a4wkvkxgfspoxzvu28jvapknw822cj9f3amj1u1n5lb7xy74p25bfo1fuxs6p0ji0nykwsihnrz2h4bsqkvgzcprzjhekrbufp5voum76i0w3q1u4cd7zugn6zss1n5ec002vmvd2g708ia0ygptrfomxzlb6r0bxxyz4nl44etgy993hwcwhjacrwoo0r3l7ttwkje53rrndfcko42o1xacxtw70xpglzebbs3g4f16auff4fs2ot6hsna55vtakfd3fgy1k8ed7j2ygyvbkewr1x116ggsrbsb9nzfiwdm0xb1j5n7rvs6lvucpzkliknl6qyskxxho5rx74z9i7rtn3p8wydbmwwuptvjrxyn1p56fkb62os5s7nau85bf40x15nrkf1ml1zgu3bua90ptsvbozsqbxj02udfvb5loer0g18efw0topbez2q5yfib5aj9tvdp07wch6i3gzqjrpp6egdwch4sfj1rf252iqgnsbcvd99pfy2kvn10jnivpdcjgaz216ajec7or34f3wny1il4q73cjbgz8gvjutr6r02x5ambfrsffbggfu3nm663uhir155vcq44j3xu7mb2owo7y6qqiiw2ggif77hf3c0piz1biyny8t23uq78h4zaxspp3htnuoyxmgnnfhfkks1aav5sijeg4tp4j1m2f6ecleb6kbthrcafeg9nspw7onbpp76qhv0ae44crn9c7i7e5z84iyhuedd4nl1uloumh0ntpz6b1kzsh4coowoiftlzp14hrn4g5sj7v8vbokr5064q7lbih4b7t2fpas9koz2ck2qbwp29xbue8wvm12r85xrdwuo3u30s22xum',
                proxyHost: 'ceziag63y0f9asldm17jm9ejhtwuqytctewsnq3rg0qxkgz9ql933rzt1wjc',
                proxyPort: 2658736163,
                destination: '5kguhk1o7yeaygh3tbb8varga68u5ozzc0l21k5l5zev6lauvlgzh535rk3t0b6iyk2hwouohlg4wjwy1kk0739ukhtz80hoyphvgj4zu44j8n6gid4hsqa6wpkrags44ch58alwdbpm4uymuzgj6r7chmiy7cuq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o6wtth99vy68oo8b4tvur3d1phq3v2pja1gsipbgvxd5hp3792pbxqqaqug8f7qetxenquia2ht574a5ahsqobz51d3bfd35k9zjqte711qar5n7k2zhuqhifn683y886k0cmqzzil9p52inguatb3futbaba6y6',
                responsibleUserAccountName: 'chm0n3vjbxyr7r5z88sg',
                lastChangeUserAccount: 'ekje1w1pol565xy9n3lo',
                lastChangedAt: '2020-07-29 03:27:28',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'rkya1nam1djder8gshm7ddcmttq1ywqxfoxs6k1p',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'tnwfu8penwuyy245cj9xry14wxwe8y0bvcvj0l1pgabzidgclp',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'jjgd3r83tf7496wvcc7c',
                party: '3xo1wrfgpmxxlpj856poq1ng2kqe7bfhl7ceacn4klcbi51vd82jzvt30c790thi0yrifn4agsghrxp8ctsp75htdqk4ramhvuohixjjew7c79fqgu1cd7hbz6rxzir9pl9uevlsvjpp4vz8z60u8boz75ncqa4j',
                component: '6e35qco0e3r2m39x5068wcge5ekwinj6gdsmu7qa4wbu3x7pyg0xbkv0rdaxvif0r3qmrdwqlqia9n6knj9f5p1mc6w74l00jg25lkrnvd53ln7rfowmlzrjoo639q643p8vulrqojfz8n8y2921ca97oxahr8si',
                
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'xlwtiwszxlp7b91f1at4cof4jddp6u6n93mefw4z88hs9w0sdoftyqvmacz2pmm6rle6bx0y5qyou2z1af5uuogpvjytx1y1eva4iz90d5tn44y1d6x4oeahq6vp9lqo8dyz3ym2wxf6s4so0zr874zzg4qcyha2',
                flowComponent: 'u14o7lcqonkdska76pmjqa4zs5n437jmuelnoggitop1vycl94rramt1hjd2i7ugs3rb97sqoeqpg2ul9y59fy7cx44x1rcgmtcrtas9nrd8mnuow81hd7zb741hnc9rxbrwkl974ig1t4kijlfascbl6j1w12hd',
                flowInterfaceName: 'r4zyifuytaldv73kczhj6s5mwm434rlp4i999ewqin2qwuaszxpwz6wjmow757x2f3264kf1ehk5nzxhamxy9yha5gaj4hnltgr696tudm7gap4uf3b3fv0a0soug22i5agckpiocuz34xb749v77ixr2fs9a2pc',
                flowInterfaceNamespace: 'ey3l20qe4x4b1npyb13yl1gqja8juxapmp78od3dhabgj3sjy72s9oysfzc6rpiqvb7d6lkdiptw5qskbzpymd8867150gi3xjyk02mzqjcb2lxkbb0741l2q1x58examepb7vpfkghmubwiffuub608wkdzq6n8',
                version: '0ln0s573jgrvsd1vj3cy',
                adapterType: 'c24o0g4vd8sjnd11dbjnuuirujjc1ouug66x2guicomgmqi7u1tchjrzi149',
                direction: 'RECEIVER',
                transportProtocol: 'u8kemliezdv95m8p1entqq7x01by7r2cfuai3kizyw2f39qc2sul1q0eyde7',
                messageProtocol: 'bjs8ymyqj3tj3ukp5skh2i7ayvtarlpnvc5c81e5qg3ypwjujyi7mtt1ahsl',
                adapterEngineName: 'k075pyj4z6qtttn2kyspzbt417hrdspry4rk9yl9xh2xznot2rqo0ba2q5finkv385wvyn3o8gkcba42pbvbmk30estkpsciytcdwww6obhxb013e1n2qoijwktrnx223crm7oni6z3t41w0oydhxyt2r4pg564q',
                url: 'nq812zymxweg6j826lyj11874tmz9fq7q9ql9c8guvyexpwzo4jo2mof5km0bs2poqrivmdbz202r5c66sx8etafdzw4r8ye5jokij4x75xttowq75gs2i1mrt5ubii439dvrtq7papoof25mb2p3fh14xghic4lhzykkybs120laxtcphxw4nxe2ktq7v3jixf9ywnipjxhhkoz6f97bs0m6j8mq0d15nh31rimoxd50bk38g02mxoj6cccdnpatjqjraxeojjmqfo9xbitzc1ncj5z1069y53mz52gz2amulsqhwh1nxszxnzhrfsg',
                username: '4f5yy0mm45puejctol8co4eyn2oemgf9yqk364dkc2b9zif9mo6fhtdf8xvr',
                remoteHost: 'xrnp8m2gdo1hznoeoh03nvn0jylgrautab6to2ggvxhm0ox9hj0xdahyrsn5n3s0cgvll60t5hgdmh5fvf7tdwzfporct9enikoaxmtkkz3p1dw9mpiaupf4uj79tncu98dv8d3hswszkcl4ux5bx1tchax9o3tv',
                remotePort: 9929954273,
                directory: '44dhx0ko0qp46dgrkdukeeiiez0jq6a6qt3m75n8eryvd5qrlxp41zakajhuscn9wngjxmtpd2rayjkwetblhu1ylny2zxk65mkoii5zajqzgox2bj3y9o6p3ip4siojzp5n4atvday11scdwl0gdrquaahfo01s0z98vbbiixfiqoo6xbuc0cwmtfd40k8zenph7moicfn4zup24z4gmos6vggwm3macmwo72q0cy18fq7l2a2vq85jcq6ttstkbgrhtasc7bivgn71agjh6fpsmoxgztot0q3vc34ipec5j5t8lbmonstf34vm8pb3qfokk9zf1sh311fculo65oflxr567hez0fim7kv5a1hr3nhy6mkeybp0igbu8cjoki732xiwn9x3nqahlu7tc7ptukd11r7i4w34n52mw7cwntpveld5hrh68s3y3w9vyg1030x48hlnpb29jz4716mk5nia6njojwl53cmv0fh1fjl1nwfewqu1v7ptnfgrm3yg6i8c47kan6j9t8wmag7cvhvg3ryhh2mahaxrcwx31er45oabg1uz7bpmqbnq16h6eyymuo6kx34pu64es0n2o9x17wf4z01lj7tq0uom5l7kbhsfqacqj37o3wi4yuo907ju6v0yrqgxa53lx43cfkx3gsvpj31zb9azuljxmjgg99naito1dts1r2rvfp8pqyn38ftnwo7llavcp0xyzuuzaio5sfwo7ohj656yeev4yzva3jev3z5yvchs8m3sixswo04tdp7n3ygf50tm5rigzmyxydk5z99ciq37v5one8wcpmni8l8w6gv8pv9svcd5pv1dz20xq2qh3gimhxjg0ygwme2s5sq8ysd175ufjc660lx3sni6rqx3d3u514dtpwo7aqonn5mcnpklizizpe8ibl0m74ecrcseg13udv2onsw3g4pwjbag1mziwbkj984ng1u9q4zenp4ya8qvuv3d0h1etsk71iamhjuu4eadplhxiw9tc542',
                fileSchema: 'atdjnfw89jfblck9h8b82exugiyvnh61x4bsf65zfez9jadxipkpcf1t0c6aemsmgwrck6ury802fdlhlgg4vh8qr2agh7ro8owo47ce7mcmbmxtmwkoa32oh2b0dxoo6sccdo1pjs9fifgt1kpuqrl93r8f802om51y8pcrc16j4tlejnpedors3ey9tou4nts9il9naw787xyhx2h6m4uh5wouxi8kidcgw334ma9l22j02h7ejfq4g5g3eisg41ibt2kdr5xkevscmr5tbmd2o6bwnqyvgazwd4qrmdqbjh3c01n2ihml0r6khm33l7a4pt99xq7eiihrlfevucjqexsxitqucpb41k2qvhsq5i52v65n9a71r4vjr5rfmnpeddznr7q6vejmvp3yt554ivo7w5n5vysbvew02armaoawleqp8ntx4j69j6uxc5udxinghw9qlpt3ncex0hqsw0ea1c2zs6z5ktjeql60n9mxr30ax031y2jl6x2ewcvabe09ks1cy11mkuyitgnx5ytn92f4w0ej3g3lr7ae5u4008xxgxwszr2ka5y0mf953yqd69e9av6o3lkdj4qxxegwa3feyz7wcspnpbha0sqc0sicqe0z30123dcu7vmm6iokq39r6pv61mdzx8w0y2kmebxr15v2wan3rmg9qgxl501thtgxjobwrgv3gdl9zqpfxvpnd3g6byht7eoi7gv33y6qktid0mgw60kxveov8h7wfmp1aqh4014x0s49o1xsoptzma4n63vifjgujy8n7adc1wiq9x626bqfsxeo7ddbsara9pjy5kb6n135rkqw0nyoznmdg1o0w1qynxxubul3r0xt0ccm1f1vbk6lerwiccl0cktt6qdojh2sgt4oi5yb3nrrnlr9iqig6yprdyqbb1amcp2z6245odakvpuuhezb7f88yclgxfl0h7gzwdc4ktbeiae6wheviv0e9jq256vkr5i3c0fnmbh406ie6afexeilyvor',
                proxyHost: 'ku5w7ug055y953308ulhrht9j91ysixwg28l3t5idseaq2qauxcv301r2edu',
                proxyPort: 2916796787,
                destination: 'mb114uto3iqkvm04wwegs5znaue3wqylti1zorpj0l081xzlz3pjpgymqwjtr4zl25yobj7u52rahyxyjzs9f5dz67n019l0j3xhttqi8uhuptrugu558ym28pcskzglj82wip2er444mn3tv5zju91q75qbgxqo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ixl1wv8demz8qgo9kz8ramlvmmv82gfxjzz70zjnvm0ya1pyj7cha62bzjntcsnyvnjb095k4l32c0s1kdw7n6yo6eccfnv7vxjgakv4lgkepl2qw92lsmsysax5hlmai60uk82zvo7p7t5nfe5cq78wiufscxbj',
                responsibleUserAccountName: 'sihe9qdo87ybcyhszscb',
                lastChangeUserAccount: 'johh0tnbfxsgk2o6xsk3',
                lastChangedAt: '2020-07-29 01:58:01',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'yu4kismnfa3kp6wwk6oe0hd16bgtvusn6shki6mt',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'rapovwpobvz6kwv3ahuu70h4wrttlgd9dgumhog1y6ln5bhhke',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'apjfn65lhwx3e8gnuyqx',
                party: '6dat0932cndqa7dh0d3zm9r3eo3m7w8yr25j4qp76ymu9j5xqrxf50ntfg3p74gqbsuaox5471hhi29xxjershc26bo8xbo2mfv8b9g2tw575mdneaon3pske0n17j122209gc1db7kodwsj6mzgbcoa2bddvdjw',
                component: 'hot9ddakj6qmful9ggg74yb559dxsf1ddq67iiry4dy7lk8y0xlb3rf3za8o8ms5x0fl39it5mi929sabifbvmushzyfrmkeiy77zjo1w1j8rvgq5pwwj57xqyz2qai0kjp8eiho7v2jkcm2fq94p0yz4n5cbdtb',
                name: 'm9z6mckoc7f8lh1tjo94ejhbko2ivqggfdn828eiw5dc3u548vxykt5jx3xinl4mq3w1vcqzlj9k3f69eng2q6ex3jhwlx4eddotrwza3nirsfwbakmgdr8ad073zw5qwvtrro95r84o01yi7an6jbt20nsmxvy8',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: null,
                flowComponent: '2l7wtwvp87hq0xti8sy09acm1v6ruravdnafymg9u801ypgq7v3zatbn0ahofscoqvlw65dnq2xq6o2chklfc2kqp3wgcpdrhibrclaa9u3ywo16pyscmybj1n3n5boo6qph0m7sbzxxhbgumxhsevzn3oywoyb5',
                flowInterfaceName: 'spbybhazowkle9bneh2m42vu9vxorpdm9swrmzsy1tcmsf17vyhhjefa886wy6vas3j6t1xizbdim5coyklg4y4366fkh6cl4bylvlwk1gu1wn1r4bpow1b2hmfx6z5ilunrzpfbvsqfg2jzy0brk1o1houe4sbe',
                flowInterfaceNamespace: 'f57ttb7x164twljnehdsdstfftfjebwqd90umu30g2p7eb2jlsvvqrbhd6dptbmgf7gcmjxavxe45hdgd6o8ehzfvvfjekey1v6wcssfbqzsxytxp8v004mncjvx902gvs8rsvuxo7welf2tuprar68hqohdvhya',
                version: 'bk03a6g49m9dns478ox7',
                adapterType: 'g888eb2rpuh8dzkml89h4q8glcuw6jldu7fu7fusheujogxenncrazkfknss',
                direction: 'SENDER',
                transportProtocol: 'v4uiywtl6rbqc0figpm3p3cgn2rztc20msye713kjkgr3ct16vwe2nvqoea6',
                messageProtocol: 'un5pv0a4c9qrttnqk3z0trd3absva8kc8qi29dfmusmddqdqrl8q8c3ec61a',
                adapterEngineName: '1zxbu7asxv9o4fedqzfb7suxsbwbz6gh1naikp64qolhsg9a9uzqzs6j4qbczm04rdi1kzcuhcofydp68wkx7oy8xgnvz5qgefzsk8eweeg9q5xznxx64b2buieqigusbhu5vqxcp1dtgnakvz3fp5hy608c9ryk',
                url: '9izcbva1epcci68dp6he89lrwe8nmt9yjerbvd3lb4n6vxwzsrhtesh9zqyjjmwqz0gimy7ti2nuf5fxren1pme47grdxvni77pou9kmm5q26fvsoc493msyo5eq5rsmu4rc6wrnk2dzxv33cpwrqcwms5yuutudr62ddezrnoh4nzyja4xv0pizim50uh4jmohn0h87w1ycf89wet2wm1olb1z573c6uhcnci4tttxcvyh3awliamsmfa13n6qs754cze3h53jjidwb72s528avk5vpt5rkd9kcykj5aldxyyu2le79c3r1kirz7alt',
                username: '4by9zjoeagzlp3aligtkx9gbu1bg9yqxo2qn23kqobectdtbbu4oafgtse14',
                remoteHost: 'exgnlyn09l934vho6tu9589pff7g9mcf4zojpw2nvj26v5paore6sx7ysihntq6wkimmq3mjileaonvt3gzndt32rql78x2higuef4y08lssvy0jhf2j56unfn70jplipht7xfxqu6e84w6b7vg9yxuhlzph1puc',
                remotePort: 7343227769,
                directory: '3jnzmqh7y0erf58qogxvkp5eirrv7s7nt3w8ueflc1vhhvrxt4d4ijxoir3phe35uon0c7z6gx2up29ls94u0n5crbgeim37yeavzpemnn4j5qqt2n8zr0h31epquwm47k4nn0u9i3egbbosu2nnnl4lwj19rtfk9t87dtjoa97orsvdjfyqq1urqys6k8887l3jlj3y9vcrtkhb0okh5mdwjx30rifiz3ju4lcx82swl4sujc21mpdrz9rnekbbkmxdwlovtimf4oabxjz63mwa8debij9h37i53e7d39ie16ufgj1qxe0p6v7erqpmsmlclrbmmtapf3cuhja6ndawdr8jy06usgwxz5zhra641zj99w3p5sn175ixvrqg3eyfusj2s4z38coylfub55pdwb4hkpc44882tkv479kv1iqssh1lr3am177qzt02q9ttusqx1axhirzo4iyu4j3ba1z0znuc6xq2mm6so9o4d4lkfjiahlyas5g5jeb7noupnwql1c9sliji43z1bk7agwcqlax2jslzd0w7hgoz8d861p3xs6evg1ot00e00eikt44wizffma1s0bq1bzqhe0lgxr2pn3bvpnww5pvqh8r94hn8iw5r14jo33dkvf41g29ghhbbtcomomjyes49iqjai1rnc1vd43bi36lmlmo8b9rjq87ov36t935iyci3g4zu79wq7y9xgzgkeycplbzka9aenkibvmluulo9jqgb4lynns36m9rd8x6cne6i3bu8pm7ashgkt3wkyk1hh2nc5udcnzxderayj8tj9wlimtqrp65mvv18nig6s8wk19pgdmn3wwrvcq9vvvd42s8opg24jf31308y8yipzn8t0nkp8ctj2xbwinrnf0bgdabjn2xoqi4oemgf2f8rvui4egbtejpezkhds1tycckglh9xmj2ayk7ylo0h3zoos8fzydde9zxxiyj2zoc19dsx9vf7qix4ftyao3ifcmzw3kknan9xdtpvyby4',
                fileSchema: 'a8ii2c1bu51jsr0fylosbmcy8urkeh2fv83yewfn1md1axfqxxfp3fqojz7qkdxzmx0qfbgek2ramfpqqajk1zsmxspah6u09wm5hf8mbre4wtncdtpgm9nf0ax5grokvcn3csp2qbr1qpfd3yt962tlj5yilbu1268ka5u5i0xqpgbc4da11a4r3jrrmjfuqa7bjfkwpscrqrn9wa8gz4verpgcg5rc00f2dil7wifs93juolgnpq122iac608on8sa34z7j0pfnc28k2pj0msyo9yhq7y1xdj3qux397ndaegqzu3amkvsx6fcslqexqavp89pmedobnfj24gwzk13mrjigwqrcdx5s86oe0tulzt3mwle8f6p4ttw622q8rp5n3vaiiagahihpzklnsyc2aoflqc63anma3fhhled3exkl0hou3f3i7pszay3ad4d1ol1z6y5loik9fndhrwdhr0atihln2fgeui1lbt64x9obvb1z11x5z4zoppovhfi6hximr8t1svrwsjgcdny8pxhao22qpy1k707jkr5mxmc47u2bbyor3ibus65brl0gw7i50t0g3z9hr1znge0h65dhieb7w17an5kbttcxvot8h1vvc6fk6gwey9qaxxvx84nckan5coykrn3ivpexn86xc26z7r9hmwqj13o50wa55xzruw41eqgwnlamsamxawva32hoj4q1e5zi8ce1k3ddrd93t8uclc1r3r1fcpv048qws97jzpobccdxd02bm96ovvhcl22j75432d78xe6xdipgjxy8cf2evcr1q7klm8bmv4b25l8nryxulbds94wpdro8g4rmr950ihv6avr14x8hhyuacu88lzyljyxpc38lunmk6eit3j6gchq7bar6ryartrp72nsa6thap2soad5e1fowipv7spdl3ssxuxpkr3fh6c1x51uw55xr7r1g6a5shs99bgqhv4b8oh572r71damd3qwzc85fhohq42p9gi8dlkrhd0o',
                proxyHost: '7u6f2swpbfs7181tp246f5qru091fatx7d1miucg4pz5mewz1gpx6m8rwpdt',
                proxyPort: 2960226595,
                destination: 'pd7jykpvz4crg3n0vcvz1x84vvxouhen79gc6w4wkt1gqs63p38xawhshbkc5z0szod73l08sr2tkxuxsd3cah1wgy2f441qr79kw3ecmwv7shl5cghxbqy2uecf6w6odgg7ue2e469rir8ge0xy7dlbkkhgvxgg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'b0d2bfqw1b1ixks9tiny36zs5kwwe7tlxtdq6u5gqemb8au8ub9ical7mg6zh27f7dc6gbhhph7duktg3v0zytaq6vtby2ra37qkghcbchd9lety22hg47mx1q60aylzjuo0g8z3nhr7kgmf77b20czuldskqjye',
                responsibleUserAccountName: 'r2adlcpn8z4m9q2epkr9',
                lastChangeUserAccount: 'h5mo8j7j7form9vevzjo',
                lastChangedAt: '2020-07-29 15:37:01',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ytea242uikl5554l3c5prrykc2clqyl47hi1ctpg',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'owhpvwti6j1d6jzs4drpphypvihbr8rhd7bbi5gwec4ahkg03a',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'njgoy6k6jzirq78aee0y',
                party: 'pekeuxgf2v114gvf3sp00dozlc5cuvy3luq68fxprekoh24x5bd33janj4n57ymw1oj95jidmafksrw2phvlpfu2el1td51c66jn2865szy24az3un517wt0e6ctoyc3m7tmi8itkbbrkity032mruqkqnym48i9',
                component: 'wffx1jo0wz9ioj6h3msw130uaerirhx3c53rr67lkaa0hg5ksk6k7ek0zbtc1iz2zp7vu9xi8r5hhmyh1mdevy7vt8n7zo20hox6cagsaj5qpkkjot32399iwv4bwye8awezdz0r48vqm9ijkck9dxwn6airu0wj',
                name: '9gp31rqfzuyu43p2zea329450zsc5zz5mkkgwlezkeb641cz55zopd3g6zgo439fg79yk8lon3jk6z4jo2cmrq0ndxzgkr5o9sv9b67qkznhwbp7aapjq2hh6ggj5exo5pcmt1gsvtd35ltp7vahqnm6fbgz05kg',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                
                flowComponent: '7s3gt19eaenqrxhf65vo80qdpy0a6km45teiixtfv9dcvo4c1l0o4d14nisx5rmcrcm5vk9y3hdg8wia9xgs68dbfm9vzwpgyqwrffagbp0fu8k2lmjlp8gnp9nne02bhw4qkw6zzm2jmp1t3ee2w4wa2cfckbxo',
                flowInterfaceName: 'f4h4fmlea90sysgprkv5bm4oxri8hv8khuzztnt9zaaviwlsluaqf54w290dz8fqnghw7hkdij2zbpr4k2q5n1lzd6qsu3sbd3g1ht7ehs70iclwlf1q5pc9f9zgf22chnebn749qbo5p36fowne0e016ftza7ix',
                flowInterfaceNamespace: 'uowerowwjmegl1kx33p2hrh2ojxheoqc3jm8ulavf33tku2g1knnu30ig8ozpnc0kr0nstmhro7kjnubzm429mj1j7takb47spuo73sadeche27d6q8x4q39g0jbnh8tf1xefzr2vfplypi04bl7btyvxoqywill',
                version: 'ia1pzweim16kkc6akadi',
                adapterType: 'jjf8xa48cr2pmrm8wuckzebk56nxc71oxgwsqsxgotjolaeyrldn92ofx089',
                direction: 'SENDER',
                transportProtocol: 'g35m3kmddnueocnmeetm1wl6r3vvm8hgnl7yf933c8c0jp2n2eqx99sj8ufw',
                messageProtocol: 'yzynr6hzvqoinafqn4idq8eq5fum8pb1p19dwxge4zoqm0myp6hxu13fyri5',
                adapterEngineName: '3dgfj6lkbd651baihpjtotzfdzaxdw0dxzjaye9gpr5qr521xjjjgxtsgbc5lrx85ikmcn6zvzb1q06kyp9im43hjgdlvtnl7o6806zokrou8zcve6m46vz881i1wluoehrkq3cplulbvdcziyaqcioviebmbr2u',
                url: '9cy2mws7dltb24ul9hmibevv97w0ribwp11zdjt0nq6dcrfv1krvfh5vtasifzr814oboirnju1elocy4vm0relk97ci4eyax57tak6eh0rlknnsa3iac1kxko6cmlf50yku7gyguzgs9jokjba008lblpn0o9hftgkazu041oo9cl64zb38ir5ctlvl8qi0mfx1z8q5qzgecfuhgkabk4x31zi8xkj59eeycsz38fxjqmf10c5pdq2s8c8wue0gsfnujeqv61ye6vlcsjng97zjc6mlizvi600jyb4u7rrobx5t3rycalk0hy13b8yy',
                username: '0crsqawa5omoubgm7lhzlvor3icsuw1fauqk58upddjkv3cn3yluag14phcu',
                remoteHost: 'tygwypuzhj5u4aq6cqlgy9i4f4e0f8slta919ewlhubews7u4fmk7ygs7l1v7otfvn2k3csriywr5t4dta53rwnvblh0l4wcc3jwnylahy65qjlhe5y1zl58njbtn5zly463ubiaf0ed00gvgaxz3mmwcqxeqgab',
                remotePort: 6318596131,
                directory: '8msxs76bz5wvpdjph4yy2ovi5my291t4w5hoqwl5ro95cwjisnsfwsz2gzv73qwd10bpxc68goye6en71cm2iid0e49u3nl3bzxsyw7101c1flatr6o3n29o5dk8lyu0ys8utrt9oi4uoo49wlvi0fv47xddr503er1z5lonsa6eyonlv5liofxtekb1vv696pxgaxzzr03scxowatxog17jm8d2obcn2rzpvk5g7rr86ap2xwktskvmojht899cq93p2o72qdlj8xdjqfy2bt9y48gpxmdt2gw8cqvv37ofnk6oolbvkybxvaqellrzrzm47emr9ykjw5rbuk17coan1kaod6keusr67t7ixxvqw17msqfhk4gexpxw2g4v1zjdcawmtfvpnv2oq4uo1hibrcw8974bva5ejlrs25utx9f2bnpd59yoi3y7fj5jymjf3qy9blreagdqj0dgnfo97g3qzwmzkfnchopy9a2kzvls95svwz3opbb5znp4emggr062mx7llkhse2y3tgf3a8bucghxgqy4mqqs86dpl9yv6aa60556s80radktgevztaoih5nl31djd9j64omlxr28k11tnof8c5wkxe55wff7qkwpsfno57o17gdyrkz9pt1qgg36exrlvgugdwgb0vnyzalu1swexbeql8v7duq845q7gf5s0i8e61d2cftdzgnzdscb6ufgxdvrdjugyp72v96e8elxjjhc8cczryyrhh5ugub6ycacro98rju3dt9t7k0i9kq17il4aalmmg1qafvuf6mrdubcgnc4my9az3ums8ruht2ev9x143vkixin0yck0wcwr95hzq267bh88vmfynvr5a5ud6p3pdsc5nwu5i6j08x9qeytgr6vn3kue0rm4fomdbs98xjlnycbdbjv67w12j38311tfn70kr0wssmzbz4geslymtvp2hl2g1d5xmzy260pmkmu8sc4k9ihm527wp3qupmgu0ma9sb9yl5mm0h512mr',
                fileSchema: 'a54ahwog7orscs2x65f7vywlk07lchj2xaz9irjwcklus3nkq3vdsp0bqtznmy6gnhk0somyj3l4cfl92tw9er3tx64alidtss6smkwp5m7efxw3dmfcoi67ucywigr545lqmex0jjs47mermytawqbxdjzvz913r34q4x424lrmpqh4qjrh62m1c1nha6gjkh6796jv71ji4bwh48tyzc1uwgx5vinv7j05dhqeu7d5a0oxaj78p4juqe49vkje6gvxj1ld0ydic76tmqi9tf7c6jsvh3biwh67gfp7fyrbky18nabcgb9040yck90tntys8n7btgmrtb8s51t5e915nrcajbfex0nvv1l5xlm0nxnrwq7zop6fzeg5tfw4078avg64el4ydmwadbhlo45g01f1gt50iajx8ga01blm3vov0uartby86qtl28e14hlrng0flcviijexyh9e1rg6cu0gpu9q2oykv4tfjhlpu87lhh9xu72kjqfl47wytxoniqtikh5vk87fjumslgr8wmzuf5ke31m77laqhe2ijznfiy65hzquef8991o1pybl6puxotb0mghnfacbxstfaigav4uebg19do096cllzz1s321ezxqtuldfihhjxk5fvydkkxgo1ny7e9uvj8ov16705i5c3h27he8r90gjtlfmriv7wwn72kal6g9hw4y9ktuhaesbwu4gjdb4xux9c1taq4ptcb1hc868b3u4vaic8swxl3x8wd6k67op9o2idyfyg2d0ixxnqojho4s8ab0fkydy0vj0rj6hbmb4z2jofqt5qebfmzbh7mjwbh0f7w826k7j5chvjoogu23a1lvhq5x3m9ai16gh75ghpznbsafu8gzsj6pxcx64bg02bpb3w6wcsrmiy8uopmttj5gr2ox770pni4i5zzt6mchdq0e8c9kjkdmv2ej9bupmip7bp0sz4yqwu0pbmrt6s7eioehegzz8rib7m2unb5varrab71kpkcyjthix',
                proxyHost: 'u6ft18vwts9svvcf58ltyr3ywxhumgwvg4ybfu7n099m44iq3821uv9vc3zf',
                proxyPort: 3250830008,
                destination: '2j4jav28lmxmxr9nzq27xf1m1oxbspudnng3emu7zkxlty37qj4xynls8ebw9qpg0q3yuip2mnjj1vy8f2i0gw67jsub6mhkd3vxkdazns751k93sg5cpg1l3wxb6fi9gu1ngvjsp7nlj442wxz429fq4tubnre4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9u1qzw9yt28h40v92mjf5qir2tflu8u53upkcf3dy79h24bwpnt99zsokdm0x69mzhckmb2gsqtsv03nkhvjpr1vrqd4o2uij0o911tp9v3ijog37lejg02797x53jder7prsqg7k78rmo5bgww6syye9cigog34',
                responsibleUserAccountName: 'vxjokldr4qfii1gkvpkq',
                lastChangeUserAccount: 'tz3krpgsu00lp6jvg8yi',
                lastChangedAt: '2020-07-29 20:36:39',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'peg3bvjiseiv7gzaq700hfmz0b2ppgfdup40v7n5',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'tvy6qrxq9sgvnbjxk6hymkgcjwfof84hnewuwn8h7jfhbaz7zb',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'uyvhz7po19v1i7mdbhm6',
                party: 'a6nufmpcyzrjzk34570bqsmavu3csh99cb3oyykj1lk8vwfc5mkn6f8iej49hftycftud79idio2nzbgvuoeqrbqv8ppf61kx3uew8li8xsod7q5e4gniaiymfp0smxmglm2zo6b2o3qytw735cdqbqvq94ee7f2',
                component: 'eq1uvj69nvz6odsgw60jer1w5rnow8mare2y144mlj6f0cllpn8odeuo6wckj2ssg565p9avrxty6coecu8ik4cm808zsxt5t70pm105s4nyy4sf8heyuzrjvb75xrpwgikqim2dd45c57g8hdhr6g0w62elxsg0',
                name: 'b28xc8azjvpxkihqmfkgql2jlkzuo62g51nw1y1hjh1w0na7zy9rmnxfqr07cn5u4m5yqbodw1odnmpcp2la22ylwzq2hgwveeydfzax0lkcfol6ogtaik68hlzjsqhmy0f6u33zxa88zlostt4rggn0bps9qgrj',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'c3eio9ia4efixapfclbl35yo1gdlxo9ykotbl6dp87d6gezmhtx25imtgc01n7bn985rqy5hb0xtinbf082fpdsq5wg9jubsj421v13rqi32yafqannoykjcurz4p28jjfze7yy0xiw54mesg04uxducb9vxr3p8',
                flowComponent: null,
                flowInterfaceName: '4alh2zz2o6nzwjq4kqtbcf2xe3muaaufnd0weewbdgytx8192ptrk9x2zbkstne7exp788g1d4rorsc1szhzjpll83133xds8vziknsc91ersk78x1fewr3dex19knh4cywiwb78gekdegcbuhcu565je57nyeh9',
                flowInterfaceNamespace: 'p8g1l0qq4o0hw2cykeik2e6ohxpsxqrrcv114gnbtvith7ujgc6cqs8fmx7cabzfxlfzlsl4r4c92s8kk1l9eyrjifind3tv46mmqwyvx964zlyr8zs5bdu2sdfgx2xl5iypw28bo1vr4xlncr3kqpe8ikrjdm64',
                version: 'l8x0973bladcwxas6hsp',
                adapterType: 'wymvulwd8hdz1xttwbz5tzwfo857tcno3z8opaqz1j6k6ko4vrxea7yzdws0',
                direction: 'SENDER',
                transportProtocol: 'qf7v2t5g4cplegzgdbm4vpfqxftqxp5ct2xm5sy3g2ixubll0ppxhwdvoxlk',
                messageProtocol: 'zm8xefa4dhohsq0upeawbbr50v7dqetg3vwc9qip0anrrimh20ln22y9k4hk',
                adapterEngineName: '5h8sv3tq4t49v72nv7u660owtrmlp55jkwomicr46dwjimr1g37atvgil2w550vcm1cooyge7scz6ysvm094jufcadb6fizl962svsq687wz41ptpjrho25q96fn5gz3g3xai8igtpa3ozm8n075ca0wnwxaw3i8',
                url: '448emc1ogv3zhmvxni5tsboh7lfmegk2t2ejzn7pmidpjazrq9ntvs5zabqu8aasvzjvqm03uv225xg8uukzvzyqnqp43nd7640ag2uiwdcxzgx52ifq203r0080esorq9sg1ankn6s55rgtiby7s1y56mg6zn9i0edk69xpv2rp4shm7zbft7m1tkamvl0h9dc5vqlo7mawd9gp5u83jbhcyft9xbaer0arqcrk1ci2qqoqijyrt3gflzc98x5sgeywdby2w02qxgw36flk3ymdcpagydq9y49ie9091ge91ksk7urszsd9it7jiobx',
                username: '2z489wjwjskq44h3xg9r1habtabn0jtsz42vae71mti7tlsuy6xoiw7nobdk',
                remoteHost: 'cc25esol4bfupaifv18ki62hh08ajhzilvvjwp7idqpdricm3rchgp85osdeh5u0eoiqnbjrchfdu21gtdwkf8hxqtayot1ewcbjer2euguyfcdhjxgtezq4tzflq5y03u2j71jr9ikavon85wcjqb0kzeregcw6',
                remotePort: 7840688373,
                directory: 'ngjmyebwhvodtsy17ih231tx1qnflcbit7mssosgp5q2sj0cnxrzog2rf59mp233xyu8ra8z4ftje4pe7jff7opjynmop0p4ijngs6cprr3hntcq9nf5mpmdm2gs1antiei94lynujxge3jr2zskxh8h2j5m1nq57z6cy2rggr1nqs0gwdlgf8e8j22t6ru0tnzaclutimtv0ge0ijcmsw5x003tru97ejg1gtj5nojzeep478aq1r59tqiy5ael9l7hd3x1im2nzt4w44ybmeudjstnvatflhekvb84crv93vqj6ilw85o4l342jmb2rffytjgbw05eiesuvnkaupjfzdmv9b2wo9id5we7hsgkujlskyrpjwurft113t6q8dmf3y7jfw6p3nazv5juxysj7l1i1i3ifggz4hj0x5zdm9ch1x6r3jbfxewoie2hcuievgwvwi94r4c7ch8019jmcjd9o16k1yh4lt2w158b5vi73ekjqasasrttcgl3lp3hik3ws4r9mj2rpwr81qhvbewak7n0aoomjwnmszt0y49xnc1b20xqxc4vbhbj12ujrhub9hpbcbgifof9oe1hgbmycnbn9vgnxv6n9zsw3l2dksokrw7lrulf7d07t9uww1ris1lm77jc65a7ogrodekap1fpqtgtxlmdnl5vcikao9vlvdt135vc80sx2qle7ge6dbfa4nf6gf2iwpekduelqfxsmf2u9ni22qb1nazfua0jsnemt4xvai5rp03qkddfzz7bdybljzmxfdz7e7g5q1d3iw8esvf9b2clwjz82voect4kardimcx7wwiktt12iuwyfv6t8awjay3xxcz0echpikpy6exiv2ail2u0boo9bmfb4dzs3vjmtjiy5djq0l0gfnosw1vzsf484qq58x9d63y6nqnwadlfbinkw8jg10x2vie1z3k2g3tpr1wfgfjynfn2psp2d28kiksxt69pd3w1jj9ozav93n1vkxpa98dcluvias53',
                fileSchema: 'br5qdvxvvty2abjsmc678uzywbyp7kwv1xr4d1z8oth43sr7v66m1bs2nz40w6cxfk3iujaq8upg6b8dd543qosykkua8ffz35a086lxrzn1yh24zrfpm8yxstv3tpf9joopfa26w4m9uqd0ydxo3o0x11bhq625kela7vxevcabtg826cifxwa8524bfwnta9cqsl6s9dgo0hbtsouz1g946ctu171wq95ulyqls5h136hzjh6ebvt8chr63bub604rul3qli40retmpl0auh2zoxkesn8ay2wrzq84q76taqntwvnp7otexb5ixr10h45ibckih471ywg6v839riie86esku89xjyo3gd5b3p6iqn0mf4jljlid7iv4vnejseo9r2evh24tdxwoaztxy2luytu73ivp0868dtkxyxotq4eysenov9elsd33fs28xywntez1cbq8kcjui3ly4cguvivf6wmrim6r58uc0egotkmi8pr988ksifbqxg4xw5vprl33ar7ueb41v1i5ndbzglen8p8cqu5ufp0ylax370yf8l6pnwobbwm4t3hjmcwm823dz487ow2w7bfz7ved6sgov8zyxr64re3di272ot478noqzrsh2kqnzq8m5pnwmstrndw1nla02s3cdd3tp760stnghwfcm1y3vcq1di2a5qvb17vtps7ok35sy3bw68yfhmzp0sv80y3ropb29eiv44m6g679sud6ctxjjzseeozd19xp0uksm0bsv4mnmv5840n0w5ryq1fhu4dt4lmii4amldrysg35j8whbq14e5wwkwhsv1mvaduor9kwstgi28in0jcoh7luo2itjpai5mfyu5hu3bq109snvsopwy6dvfg623b172zhaafaj9ldd4uuikugxs5xhgo8k6p3qw9htirt6gqdvy56mo191xe7ulnyajokrkcy70x6sh8ig7g898i7lijgs0akfu1dga62l9b7j2t2jznxw10i5o16mqnxy5f1wus',
                proxyHost: 'zp6vrzcqwu1gcp55wewgiouok6rceu2sa34mrx904dxohfop4st8ppk3depd',
                proxyPort: 1403782202,
                destination: '3cngmneh1ct7bgi3y32rremnw8cn9qkh54q0g9t6pcrmghshyzet3nwjo3ka8ccm1musj315broj5cmt1guztge4bxqtgrzmekuem8nx7jebaoc39gny8jdwuiklwg20h5zqmpvc4n1tliq78s99w0e6ymht4u3v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '66gyqoupfp3hij0z6dmshlydol2kktgkjirub058ry7ntpnrikpi5222b019u3ysj68l2kezwk3w74wh24vvrpsbeqgl9v2amw7auuq6y9gnxipnun7j1wfbxvmpsek9ju2lghx3xj98kbkutuvm1xwehudp5lgs',
                responsibleUserAccountName: 'dlbk9pprve6sd6ks6148',
                lastChangeUserAccount: 'b7s8tncpsenwvn1yjw28',
                lastChangedAt: '2020-07-29 13:57:31',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'fbl4s0zeaga42ijj76pwkwyie6jazymg52rwh59x',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'v4kvh9l5xv9uqjvz4yjzg6xyz1pbzpjh0n72xl9snayoizyrmn',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'ju7cu00uuzgrj22w430x',
                party: '57h0w0gi9bxfged5d4fxmo4x2bu7fxyc7xsulme0ci0cx6xk9ckqn1pu6rokiqh8kq0potwqpasqhdn2qah91tfmylcspkdevlq14xhc5gjev95pe4e143erpzc3oxftmq4id7n1hxduexlah32gk0ctktwdi5e4',
                component: 'zv8hwwm6nnriyl1uengu6inisgnakdyvh44tu9urgi5s0i5eqls65e28sf33iq8d3h7c4fanv803u7tt1p2ykcg50kqy3l1lw6q45aegbjlc9h317q2wrchiaxkn9z6krnfgekh9ed4oqrptgwpdjz7cq1imssmf',
                name: 'qelce75en099xw72wj6yztx282362b8v1igxybfken9b9mr9svfelivqs5285joliv4hgjd6t7mlv2emr5lvq9uo9jjbu58h6lm1cpbwluzw1unap9h4k569jspcizpg4omf37ic0vgvvchzmn0dzyg7du0pq7ud',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'la2tqa30b1t5y959xv90m9es77ktyqp4wn5707qvrs6vf49be0npc2dhs5hxwkaaclzcelzviio38mysi5sud0va35zlflfnt7arjrsc0bxxdzcze8cys85oqu4mj7kgk9ovl2lgzybdmv18mrgdyjbbx3z4s4hq',
                
                flowInterfaceName: 'h27prbjj1awzyxibyl08g829j6zyngxg92b4gnu6xynhd2k8cc9ecy7lhpxsuqgivcl86kp5twpviffpslzj9nplru5i68kgg8du1e4kxv9xynfab7n8hzqqk7xczn1kturv2tja0742u5ndm8gmuo55906fqpr0',
                flowInterfaceNamespace: 'ku0s58eq92m768i6n6zryizd4iz0nil4tk6x9zi86xbmu48m1ss8y59z9tbe4xhhfw0hc8wzn97bjybglj2x1q6wh1d1ok70bvtuyxr3pus5f1wvjz5btu6wpncfogk7n8o2j9ejn47ld2p0m1zaoiqi8esnm8xv',
                version: 'lpcb77ynuqf9rotv2c31',
                adapterType: '1y9dwwfddfz1nwsqryx663i2ha9n3fmaetbpm31wq0e5atsdqay7ebyv42po',
                direction: 'SENDER',
                transportProtocol: '5uoidnq7vj3i66symy04zt81ydcayide9r5c3zi5lncw4gvdcpwy3a86wfgs',
                messageProtocol: '5x7ie9p3tt01dol9u9gwopkou2i6or3vmqixn5mm609qvnb303sezuhh886g',
                adapterEngineName: 'lrretclmk2dhqpr88nrz5rrv11xzzv2hjugnw475ep4vig1uzbzl58uqvkmxsp40vmw6pcldxeru4zh6tmivmlj8szk9qafgvxz002q4jr64jhrahptjeuz2pvol9tvg69xu0lygzbu8w577vpo4ipwk8wo1q82g',
                url: 'k7nj4l09d9i46sqh9v0tbare2xv7ni2domjtdys3uy3oys2pqe7avwop10lapssltbwsa2mhzf0psime0mrq0452qs7eogkgo3v39sgbwsnn8wvs6jani737jcqdnobw18jaeowlr8bj0pjphypv18cdso1w45adumbp5e869xqugd1kp4f60pil7ny1v7qsmwyj0on5aey7cnrhijt4cag6vhwziottbhvwgszt2y4vljdyzlvg9wcpicq2ldpnooucbgl5is3ylnyrdh1vb5hhxxgpr8nr3196a5mfb2yikbdsuwyq9d7j8o9t6k8y',
                username: 'm15sxc8876ltdpud8dbkowglh514x2ebgl1aoic7612insg5i7ianyokxv83',
                remoteHost: 'g5yzbkq9v4pvdbenv1cu3t7zwft11su1snml0be2sbs12bdswieloj4y0oofv1dkn2sttwxpx7pjynb1yfvxvh6whf9h6j7vl57cb6d4mliab2mf5eleah4kdc1vbalvi3qecoz7areeokpobqhqtxpoas4y1dsp',
                remotePort: 8506795918,
                directory: '1l1nd9qfatmr23lx72w5a3mc6lqpwm0bcv33td0kwc54fhemb4guapd8qojkmmdfuiluemed94n5onbhzak23oga1zzkhp42jenswai1jstd9fe3bm7larcey9e0cjax4qkj4b6i54zfav0p4u3qgqur8e5mi4yutklu43f9a72vb2sbk38m354dipnuapo70ad1xk9y34mu28q2mnjbn8t9c0furruglagcfkenyz6xenxf7wlwd1f932ja21rqraq3d8xl34opdmwhzw6pml78m33pl5596fj5bblrrvcmmm9sts5zo2zeus2vcd01oej21fta7apwqnyzz8nhqqtruq15ge8i7aqbkwgz4v8ncv5kf8elumlmf3ki64yjajkdogjq77c31bkbf10i9dgt50i47e6fuveu7agxb2d19e73liicpppmeoqlaewuis4w6r7qcxqtxkzapwiy3xh4k2dseo5x2kexdsjwftx06vkfet9aypw2ai1luarvx2fgxzi8v9r6wh2nx8u9tk79yqsn0kdmnejghmyaexhg430keggrghxopd9ui9518o56w2mi2pginakvpesl0bvkzq8vbt6qg5xddukmro6wf8b8a996k6oxohg65xatwy5hhdwnrd6jf36mz0k4gj1p6njhq3z5tgd43632ptuewfhlo314gvu6j3jf6hmhiq7ylkxhj27k8hh0y9d10xgk0h5t9m9jfubi0ffs5d4ndql30ghnv9ktiwgehletu6ohcuqs5lktu4i5p0hnk70x6be6f8zfjkpg5ipcc7sydbpv09t90ma0884u717l67p6ylo3c16feg6gin0b73yglah7trwobwdsef72i6n6ww476wmwkhwyxa8zvqnf68hgbz56tt0kn7ixi0mfst9udgbf4244ingww6meu44976k6u3tvsxifbampx54ic98e7kxwqunch9bhaofmw99q89f0bz8gqclqn2aqrr9dzucuuvzmtz0a3wg4f14r',
                fileSchema: 'nahdxvtsdbi77hdpfbyxbzrwnnkewtfkurmmmvrrtc5nafebjgrw669bdvyxaoifsaxb4uqr5ui7hewcro42p4ajlenesuseboaltvgml93gbhvlubifgs715pdw0b0op45fqui4h93zvbu4xn0a7933txr3b366pz6u2egmevx9d5csaykj54kk0kp1hw4v03wgzwmd8pn9uuhpofhx09ad2634a1h1nelrlmk2spn8up5e5feyo21apz06wye101uewaj7evvvlcwfqf49mzucoz6pfee4iy8i5yne0rlv45usphyc2emhy5anje4trgsuh8w4nh872fygbe739fa4fzcgdbwkc0jqkrrdxxuah1dcqpv5alyhvqw74vbdgbck1hcbbs1awdhwnwbr3gawmiv6jf27u73yyrv3vxcp62s5nrep6923g0v8ojm54tfsfk92rauux19b0qej8awwe1cuop52jnrsn75436uonirsdmg8zwyuga1l40wu6npi6kylhkwcwu08amkys1ma2iwlhwapd7oziwjc4ylw232txf1wyoogvvyzip95x68ipwwn2suyq7wyovqn3lmt9ji8ejk1taaunu8a86bv2y6fe6syu0zejwv14hics10hexnq9vc0xp708kimrrbt1mb9jvzukepee6zyeujy8h1vnmyrjvtu11umivhg762znpyj1uou5dwdcnb0p7b5iy4tav4w1bo1i3ns9n78lz9yioh9v8b6r8ze2bfspj9rkt1gi6d2ridma9bswk8zlqvuejqy4rsd3nfr4oqjopaqqkj1qrcdj4wy4lle273trk0fs0mrdbruxo8sbvxb93nkwd9ctr5g1b4dkyzcb2glsuuw90ket27tph8t7hffpt6ey734r3v09ytpeaftzncisvlufh0l09ssp7prpzifuqcpc3zihjhztnrvazrcnj5dx6miyrbb3ya6jnj0m5ole5h8pm2p3v4u6y2ih9v8mpvkj927omrgj5v9',
                proxyHost: 'boz65ytebu9dnxmwtaa8fzn43koooh1s2jcoxo877eu1ymxn8m60efwpoh8f',
                proxyPort: 8528055594,
                destination: 'n5g03s0jigjwr414o3u7ibgske1xrsaed28ndx6lqs1wfz3e1n3gyhzidrjhw6lrmhechx68xqecbyhyyb5pq9bqpihse9w6vjwalfcrkzo0kjkm7hifoy2nv5wm5734y39t2n5yymhhv0ajh9sisjwnf0bwu1sz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd9f6w1uiff74f5uvhly8o7pu3v5begtgkieu0dir01wqi85igdr2xlmja8sj0vvb2fv8he29sn5shmkpmon7goy5t7f65cjt7ednckyav4rbuf0dtyqhjztyoq4s8g4ph1er5n9qv2jlssj8vzwn9g5j22rhka5z',
                responsibleUserAccountName: 'ucfx6mr65zd5j2yke1s8',
                lastChangeUserAccount: 'oic0870xl74fnqrj0kjf',
                lastChangedAt: '2020-07-29 09:38:54',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'uu631dcny6cyvmax5a48vpg28tujvl7sqa7o3tuu',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'gb13gon926d9ldbn21zf5fl7vg94w7urjqv7u3rx612bgi2c8k',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'i565t1r5m0dxyoyk52v5',
                party: 'lrt0qvr99ogx541vd8pbhminyc1hjg6veyft1szvbgcdzw658wr6mu1ro6jgsczgrz6gs929mcgsq3j35cqtcod95wzoqj9hqtcb88f24oveejio95bykxeockunmjhfxu3sd8qxa2zdrh6eb263co3kfkax50vx',
                component: 'aqvarcfcuzi11h1m4g9q456y40y2m4h5lexcgyvht45q9pwqnabuvra4l3qc5pqozrxzcnns5jolqui89qzn3hny5d4iz8y8xvry3hr3ri503566fibcvzfu5i1vta56x6zonyw26dg9kfwafnnxhsu6lxosq14z',
                name: 'c16z4nc03b6kbwmp3pwg7fc91wmwpypawvpjfr6cwhc9vx0nch2cfk8b68cekvea5vhyie0lt1cc9ka157db1q0e5hcd1h68yf4yprfvz4481c8xz5r4lg2xiijfuvsy8pdl3mut33ykdxhkogy74xvclce6iq5b',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'ou2cnbpd2zkvp09twhi0pe672a1scggc6iw561jpakm26c1euo9wqg8unjrf7q660brukr77ulywuoqib8qrmdfeducniv10pvgncl1l5wh7f9roeanuqz3y6okbbcl4giaq1t17zy9rj108k656xhkh5ym3hxgp',
                flowComponent: 'r56llb83uptq8uxhrz5mksofvur7jm0l6se9gg49amfe9u3n580a9ah869in23njp345vxe9u6w4x1vyq83dcp1x35lw0ohiejdjs1qgaw9ptxnfpp068h9b85h8ks9p14u44wc1zju8vmq7s8pt1ts9sni5vi2o',
                flowInterfaceName: null,
                flowInterfaceNamespace: '1w3qznx570xxm46b6esn1tmags4pjy5cbr273fpines3a8z8dsz9mbo7gc409fgxt5bukapu998yyrzrharssuoblf1cpat50thp67wm179xphukd6za461fdfi93rv61rujvwwv630wzwwawhou2twvaix0w516',
                version: 'ybvs7m1y0q2rb96hz0yw',
                adapterType: 'gab18gx84cks9frqhw2wi93soiznp3nspgxy0fo14uskmcpftqlksy85vvpk',
                direction: 'RECEIVER',
                transportProtocol: '8rcifo0gb54u4lo7t4s31fjni6mb5y56ns9y9ml8qu76szvbdviwlsctm4wp',
                messageProtocol: 'zc8u0tla56b7ktpsb0o0nk6w9or6uoy09e9krknkren689hbf3f5zohgaub6',
                adapterEngineName: 'cttq4br7gzq80o1rpd77rn362fiejisuaspv1fcbx0kwsf0btz1qwshitgoajb23eucof4oc7s9tgtz8sw7mk97weqocjau022m14lfnjf4xu4elnp7tuynumb1auyaufjst6kat8553gfqmup8lfecqoktk10wv',
                url: 'd6uwifk5bzn3wxvlz10bccx7vyfkciqho1t46qbl9g6kum24qy0jhar8c5vyukxpjgecy1okz3bm6oghcekavpo35v79j59uef0y1iyb8p43biaoxnseoqsb9oystwftrg95lzvqm7fqa8apnppu0l05drfspezdum30egsio3rofqho298vu244c3i9u8io4tie214tz0hqjltyvlisau8cqv26vk8qp7cq9di1z493gxyuzadrd3wxs7qg82gykg2i4orvj84i52qy57sb2n2qq3kx2b61ky5gnr8568sjwn0mr1ksf84zlfpdh0fc',
                username: 'zi5cnnvcjq2f6vbci7fe14tlytolfxvy4ejnil2maqgc0hl87ew4hbnzlxv0',
                remoteHost: '98iw6tm7o2fz8esfna2gxxveda4y29rgs2q5i79mtqh2s9kjlew43lwdr8e4aa7ge3z2jvbry0pzvdb3qfdiso9jjm638bbhlnpny4l5offi3bjz7ft15y02m00gsevurryx1zg5ibi1sjdpg8wm3m6q491qufo2',
                remotePort: 1418912117,
                directory: 'r2jubg3kzvn6nawpbwfr1yx9kubrcl9l5zr3fpij7ir2smaesla7ga1tvq785wxcbb680frw4p3v7pmashlkcpru4rbne4smt0whtoa0p69ajr7r7xqz5278ytwpvxmib05zxh7sw07l9aizooxdgdmjsuoqc72kqukwq4qoxbmepfynfyyjc5xuhjlo8ijbj8trrfmpb1bbtfzxmuxx4ud1ff0gw8r06l2ioy781bncb2i7hhzxdzf09nm5dij347jand9y7bsbxucnk4y2by74cs3nzayjjjswk742hvkd3y6s38fj6cd7jpy1pazdaw3pw99u9svjnzex06ktowgkb9gcy653qchge9zy9z88xb61jow12xwn6ft1g18zwolehw1pb1jzbksxelj3xpblb97be6kb2ukfh6emat92wjatkmbqvjup29fofxa6lb1jyqcsroquunl1ccgqte2lnfz1mx6ekhcn1l7pli6x89uldzk4b6um2tqcs01iaawyvwrkjcyji23u7zucii157zi4b06tgekw3z9ulpggturhsfsyimdz9dmfxl55vqt5m2e1ymkwzdi8gne5gorlzxn0pplrdeorja6h2rli1zp38hnr1jpbb5hqjltctw3du286evbkc382f4ejnuva4qwl06zgkt1hcecpxzfsrgzo7ysjxipyw15mb17qhog800kjgmpmv0ou188i8ew9y4lbokfqonxzqosh7fl5yty49dwezbqfxwpi9yb4ijma7ssdnw06gbl8rff57gdjhaoqzv48r31ajtk4nmfquorzabwsqx1tjsa75g9ay3o06d1ufdrnoeujnehebxqluwi5tr68wzcp6ocgi9hnvemc9l9u69kzf0by49vq1smy9mqe195n2p9uqtx8j6lce0odd9u66bpq1mmr4bv6cch9bmowmjvy6wjbemb3f1ujgntpeunemalrvbzd7u3bwfusqxqjv1364160rg48s3r13vcu2bn51urw6ofa',
                fileSchema: 'si3kbdshw3k99ax25fb51htt4aiu696ljydbcd42wc58bwtfjuka31mz2vz0pdj55vsc75qlc8igk049bwonz8llfb4ci5arx2v1z3w8epjs0otnvqlwerln9xwozomrpzu6kqumqhv3q4krt23ybu3bz90m6fnlp57ftgwt6xvvil1bcvb1nlhl8l046u5pxy6ypm8qz1gng0ytio3vpvrnj5nzcszomdb98l93wki1rpx53x7j4v0j8eqx0ehcs95lc2evlao4jlzmzx9vbm52q7bz7eet6lo2r2kxzd32dbickoghryutpxsiehmpagqhcptrg1z0qjpyktufl5bth3if1dwzrcs53my2dinhy4nt6crcqhr8q623uwrxat767yk0ntvif2dz67czmkplb9ywpecj5i0f1qhi91569vxizz46tmrjbwfsxh75n1v42bu6pyr9hzvj58coyqs4p4tz1h8eopongrsv2qkmz5mtrsyogjnx9nyf8j3zc0sh9b0n1znd0y5vu30dv6zzawu0lhvwelqc04x9fx7lo614tyyuodj94xspo0b0cwvazvztd4fosjtkgkhr8poqfnxmbtlvz81gunz60g331kz5b04e899iar5qfzg4ok7qmtdwrs1fipjeldgep8ipuo7u7balmndnzqbhbgc2d1kmnzlozj87p2ich72du5vrngfi7i6yfknewedxi5iujhxyyawnfkpffb65vc1lxg6b0iphw81da445deqlhx7uz1fkmpe1c2qea6smisggglzpf7nrdl6x5n40cvuryin74ue54gwqinx3rzm4o65c39yfl8q6xd9t8ldqobjft9lw5lyw5jebyokd4e2tj1uyzz6bmjx80g5ivnlpdvi0aqh8ns47nn957x6lmjaampyptruw04th9cntlkif93ob8wpuvdm56hkl7ib7j27hgv4xu8zzc4e3u2huygum60pwsidmh6x4ud8cdpjccsav1sh9yyup6fcv7el8',
                proxyHost: '3khr1axqs5wixn8ztjqol8u07mp0v570bse9f5ch65eb6g27ryl66k8io58q',
                proxyPort: 9413957002,
                destination: 'dxj5yapxf6jf5c84e1x8g0h5c6m3kpbcb2qekqa9v8hpqek74tvmvzyjfyfb5ssepa72r87mcigxmddj7o44ew7wu83uscwifa34ylstkkmafd63tkbgqjodxri94bcdc7q352qjr1f0f85o4wvmkvczdaj7z3c0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qamya24zbulzj8yfnlf27q75nig4qtm73op14coiqqol8rt77vk7us61z4zy1odo8z8d1ah83ylfqua51ex9nzznlovnv98rv295lgcrsh1mglsucvo7az71fmjjaayhfohxquhbhnanw5vi4le4g01egvnzwswn',
                responsibleUserAccountName: 'niibympl118vfarzo1te',
                lastChangeUserAccount: 'ltlxwdu38pv7ptp09w3w',
                lastChangedAt: '2020-07-29 17:40:13',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '8hnw566smom88k4f9qrjvawfr4b98kbjl3q7t85o',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'q01w7zkv3od1vozqjr3dr4bj4jzxxx7dcqsp8cuwq3lk99ymwx',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '8rpkb3dw7al6is9za3im',
                party: 'h96oxcddprtbvj3m9zm9tkwo89kjxq3k8uwkfc0xp5pflrhiv8pn7bbhflf9ozx6wkjxyprjvwzqrwld5thd0czwojc0uwuoq5qrnb108eymtgzpzqw7mqiyfanaig67ky8e84b5o7y2flef96r1nnf1n8d81t9f',
                component: 'fatwg3fs4809lgnu0r19w7cb5z70fsnklw69mbjeru7m89m6pdpxec0c4fgbi3ltv7g0oxn505ssz55rgbd5jawnau6rtovpu5z5mhc79km0vkyri2dx6o7xu6td7ofg9u2gp1bvsst05oahk720qgmdfnhjq6gv',
                name: 'czp08y63qanhzs32ozkb5xo8bl6owr19citxbpyrfdalkrzb5btishs5dsh2wi3k04s4vknplfgfertqxqpaf1cnyexf11w0jub6nxduz2n4hh7r89ysxoqej3xm1h6gp4imz0otc75e2sn75q2uu6b6r61esl17',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'cklh8jrzdcwk7zqv2sv7t99gyntm53g6fx41eblv28yrr5e9ybn3awhvc6tk5ptxn04ojr9tbqu3y04avtimjgq4j4idul3kw72uodi4adqv0goajypz15igcdpz6v6j7v9rgt834b11szosc83n5tjymw2hibsa',
                flowComponent: '4p9gjdsur74sz0jnzh93cv4s95mp30emgddwv1vx6t4xxda6lzz3wp2n27gp2duacjoxuga4g8xrkjjdre5g3dhiwwwafoca5mcli9haqitmo47xaz5oif2v328ma77ghjx4fa9lvs97nz188h13vclyihqxu72w',
                
                flowInterfaceNamespace: 'x2gkd0ew7p6epckohlgxgmz31pmrhnpyv8c6bph4mvn1ddgct2m5jdaya0dw2qgzwxem91m258ktvr9uv56lq3c5vle4jqvhmjvrgd4lodz2m0o17b12w5u84nmktobyapx92ozhr0xmm47af2sn4tslb0j4th9n',
                version: '63t2dfqqnfxorxoefkhv',
                adapterType: 'o6ncjg7ck4rq1p2tfxf3kjfp8k0bizbb9cxirei8qgyr31imxywr6n4cr56v',
                direction: 'RECEIVER',
                transportProtocol: '2nnvm98xwjlm6dpiuoiy52tw86nq4ndbsusxvn1nmgh7okfw1yg2v83243ug',
                messageProtocol: 'yamuyooyjnzjuarhm9xdpvcd8wi2k9xzz8aq06zunttwgbfrch0r0ddpxjnt',
                adapterEngineName: 'hazfpu7rnnd9dve5tyo5v4dpzqxvgxh5d2w80ujijwqv0hc8rirgj71tlq246wrj5wc3f09m1qv38lpbte55hac7py8xfpenj18ktxuvvbqo4wcrwjlnem0jmlofl7zg1kbmc5m4cjofuu53txlhgxe1ayzlfg4p',
                url: 'sfuez6lvbyu77rmcoyqz1mcfjbyk82yx3gywanxy5oqfb3spo5ucgum32n9n5wxpqiwnhw9wuc42jervwxfy0jkhqstwo9d62x9bbk9021s03wtb08u03fjr5gkg3odd0r976aeb3hvei164lsmrpms0m6gwb5fcjjri0oa3g7yzjop706xk5q8b3q9vxfkglz49w6f8qgzqf1cazf4evesiebazwfv5pl55snqq80pid1twa98evniljzk0mus9edowx2gov8vlwdcb2kxo46i0olib5b9ps4s80xnzqnbz4s2hkane6acpm0tlmdos',
                username: '1fio4kh89xmh3obzgi36sqiuiufltg1vt7l1eech1bgsa841ig21b9si0lsb',
                remoteHost: 'tvwlcvix2ic8yujqgtihfg6hes4bduvtynk85bw2bujmtk7dm0enar6497e45j44ocrroovq3wr0yxe66ukue1yzp9bxavtmmgeo7dhrrkt6kqz3rnyhofbbwp17zoh4g1g685umde0cmmcbxenuay6s4x9lacid',
                remotePort: 6674512745,
                directory: 'rdey3z3p11n7ago8clabopa4jmsgh333uvwgei24n96r9odta3i7y7n9xv3rihqcqgtubkfil3hbyjnsf6abr4vgdxqj4d27smnnjhs6jg4c2405sa6ris1v4q496ooibdi6uwjif35l3cn54a6fj5e999wye30fv9b8sipb52mmy1ou1ach9ssfj9hb7wnuzsdwt90ph9junhpugbhvcw6rqfrd0yd5u6h9c940nmi5yfzmvlpx70rv9z7e94az7nxrh457ij7yao3s6hq6fq2u1fs1kken3q44v3xs1ejse7momgg04dj8rk9a7531ex14cueqqr5n6jyreyd099xhbt1u4uy9uwu7nqby67p2s2nntxjlmk8efko02id48nktm5aev6ikgq82la9yhjgkf3xjt23n0t2v30bb0r0g2i4zqz696o7qbuh1dfc1ii8lccjc0p8twnjkzq7rot6hd8wbwy3lc9zd43eri1felv2aiyzm65dxsxnumivqo1zglod3mk790zeuyt0iohnn3hp3sxqe86an20nd0q7zjjhy94omb8hkhzoyied48mzf3y95opcpjs7armjb2wupuielij5bpg8kmm1q0a12uoiq4us44uu7gyhf4aa6mzs2ko669axtlaj92m2z4udctg2zhjy6xv42r7j84pxqenm97069chra87cf2v7ve3drqrlw9x82x0hmh8uvw24465z45ojbjkoh5gxz75j4cbx68dywsd84xioncn4zi94ldv1w55q8ce9kagzqn0jyef3ox2gzpk81qoduqff4629s5w9sp2zj59b153dspsit5jx788v517dqym7i8h7vjzq5ps5y9y68h3h57uv6fmk8aiyjuj6a8bku38wbqmimtok42hcox8b7yf1h1wnwkrox7anfnkoqjmu98lsl53ee333pssqvn610di3inkmfniwr09j9o9v6mzbe1eq0oheu6qknexax3uqpchpt25e1yyeypzl8c227hkqw',
                fileSchema: 'yki2044jdjilu469181jgfj41eabxsuxglzxq6c0vr8n03d4rjml2hvjdwnbzy7ycto44praxlokuwwegducjerlo89kot9sjdrj66w35m6fdo4nlwt5m7asnjw5n69pm6z40ezh2qzu0n1hzqu1owt9zqbb5wbj3pojxot4l435nyivosx6pjjrogqc5rk3qdnlugavyq53hhcaz16bknxswljsxn5gxd2mz4nqrfoewlso09hz6zqlt30qow5biq9om8khbfj0e1oqt6ppag6r3ltzpltrbb3noyi5pcqx4ajn1wv8kgy9twltc7tomicyod1lakdq3ealvf4tnwer86zim365makjszzmfx09s9qk3mvjunawlc2lxo4yvb6pxb1he2kgm3mh9xupuy6akzp5f7qov91bxlqgiek81z2jm6fuj2iglsamw47n1wzimv0vfkcokg118fzot6s3t6size3tjc7xby11jmy6b9uq6iakeg4mfuwyti159h95fqew2nkm8zmn2etl5baxopwfdamgtj1y5fou4c6u911ojvxt15efkjh4mvoga2yy8axsc24fpm4x4d6c5vgpqaohnwqq0gkk693to3jozxcy1hsqdn5ylr86sse459pnl66knb2mrmvofykgq3qzz7c2nb6z4r3pnz0fof7qn5ooqesdgyna5juz2zbcsb6cv5migf67hbjpfycgbjb9y29cr4fz6xbhtejb276zzlc6fkgrkky8b424duo8qsonud5o2ag25e8x5nlycwq4y5atoeamj8qgbh0jc34v5n1x7tcftp65ks6i0zkovil25ebw9t67mp2w7n29ue10ukfzkesq7iauwfv0hzu5meobkt42u3gk96uap0oymd0n3hlhsb95sk9nmfy7ag7vv6jatup8j4aniii2ojry9abcj5avw99kpvxttcjacnax95ncps03i7c9047dohlzag9qa9p2iymvdq6j9zkysk6hmcjmlyqzzsg3y1v7',
                proxyHost: '76gnusb53oqkbyijx1k41zeyc3zlcvxji284q0awm18etwbfni0cntzl5c59',
                proxyPort: 2350293430,
                destination: 'c9ho16ayu7qb9y6ys63ffg94rjymngbamo6ggiziyjwwonl585l6ib5zup6qxdqntq4hz57xsdgj2tcb9y6pylkh3lc3n0056ts5qb6rf76mlguz2lgr0j3sd0fz10hqccdi1f0n54vhi0drm9n9or56inn901pu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ao13bpmrbc0rsnog4fqeric1uqwi4a3dgvpqiy4gci0bw1vfncx3grpz8fbaoddovpvc6jla0vx9mxd3fzapdwwvos997bpbl77wg75zqzocvcujlg5p6cakrrpurv8a19pcz9qxgwxhx5a0s0ap4p6jv04v7e5u',
                responsibleUserAccountName: 'mpt8orfuvws04h359x1c',
                lastChangeUserAccount: 'amukz7yni47vlhe8sqco',
                lastChangedAt: '2020-07-29 03:47:30',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '9uv1jbhzkwxzyb9awy0vqgiwo5bt4ohyje7r7c7r',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'snkpwauwutsyesyj9kdqsk5juvgdtyqpv0596ccf5256xc5efm',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'p6sf11ihd7f6o4pn1fik',
                party: 'u8r9za5jajobmk6pg56q2w8u64y8ao9yha2dq0uc65arsuxcjjqa7ik9bsu2s0bxikbg3mtj7kbnuhb8dbepy22l5td3ck7gey8bwg6uqtz34j75i6gfs1otzdqdahb9l0ayzvla9bm77knkctj933w8wrl220p8',
                component: '10xp2p7n3xs3bbs60lb93d6iij0iinl57fz1bxrj07tct8sdza49hcew7erzruq0pteoctmzco287fkues39lgwqbuxx5icsmvazx7iv0vv2sdr9e8qtb33g8rrfar3z89x7g2bv2nsdgeht3ycyifjl3d1yr0cf',
                name: '43u47cluxeo1anqfoz06km5rupru1ucme1zghgg7zg7m3lvjblk7yi0mw1cmgu9zgwxewmhw0l4whd9jcgu5994pucwafi5t7r7mlnmasq6v6jbjjim56wymsc9cp4bmnuslbpx35izvkoj5x9rbllmhgf4ttlod',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'g2x17u2i8efmqzzl6eqdh1zy1l44kr6mxbok5wdjreel6llzkerellkpra08w2w7fpfe3oy0m30otqk3uspgyenaqn4ctqdr7tdcum9r4ue1mfg6gjv522075d9gatfv0b2c6i2lcumwp93rd5z5ufy763rgfis2',
                flowComponent: 'xvkqzz8byydvsibk4g0uzv5nu37fx9ubk9n9w0xb80y56zomqyiz8mgx5brnlw08t8mmkvuy7acwj5l7hp0jocrvmjcuscavouzq7n5f9da5cdqx7g5aamwz9mhs19nrldz7jv5pspj2ynlwcw98ravhj21mxirw',
                flowInterfaceName: 'is5x3xog5uk30okerdm4clmmssn467ix56otd4d1xucmwbp4lscon6jqb5yvy6xgog2skzb0e5zoympxjctojws7rjtosal0zc0a907n8tssain9j3vr940sldxhl3nvjosfw308mji3xgx7zabua9cklmuxj64z',
                flowInterfaceNamespace: null,
                version: 'rgbtn8x78jsfwg9aqtj9',
                adapterType: 'u4hrmt2gez3c5l7v0hqmlysetb6m84axcdjq7dnp0z9sdczn4ccx381yqljn',
                direction: 'RECEIVER',
                transportProtocol: 'lr2w4kmmh7vzx1vq1ex40or18yysviphrpeshbic2mxb9pflhvtxbc8z5hkt',
                messageProtocol: 'zcf3u1vsrd8s1117wwelvxdljvdub2tdc757sjow1xs8ufi5f1mszgfnbqjk',
                adapterEngineName: 'wr3urvnpsl0xe1fw71pnae930d9fs0rhq3cl8xkfodxshclgyypuicnvkwywd2ih73hkjcstgls1w11vcgr65tv2uxccmmitbt2vyu8qcjchj2zqdaooqdbhxwx5p5w0szq4u021tdheluzc54gq5w2kjq9tog9c',
                url: '0y2rp23fbsbv9pa59qg5gv7xmwerdpybqywg5ry3kzezr1wi4ids4u3ndtl14bzeh95m221wfaqrtgetlijgrkabk15lece2i26qodfffotrytkzx076vrsd20qgtgbzox43skhdwp0mj9qpyldmhsc7lchex420wuydla31ded8v5lid1dw1k5ysvra6ey6wus7dy94q2pd09kaxybue5aec5cilsu7d506873emc75bbc77iohi4hs5v93nio5vo12n8yx65hc6od9atef5crslg380v3c97dea5j9ngc4v25nq82jge198ef7n5n4',
                username: '6arl2xah8zlwg5qwfbuyoso5muxby1wt7459ws84insd818957f34qbygtdn',
                remoteHost: '0ovf0jky45g1gtxkd32ddurul9fivhb20g9wwszjjq1wa8u5i764qhf5m61za7zezxrrftshbup7cfrib332kjxl5ikpbebqzgzo14eifwxa7w4c09srm5aw0ue3zkmyautq0t068d9r6bv7v0fa172klp6m1rcv',
                remotePort: 3099634785,
                directory: '3t7b0rlidilrtjduyupndldy3rcj9gd8mtnh7faxqlvd7wniru45wtfht0m44l0x17qi4djxohuy0gqwr8jpne9hsvz8q22dwuv2dibe7mebs52pwjt9o4rbqlc42xmvp3paf413ezp2en1m8j2w0gywidigj0hs10gez2v58wskunu54xx1934wpso5su9h5c2nxiiemzqb6bfvsnjxeihfwqf6jpkoqhy7u802j9a7pozetbmgvwh34dwvy6esq18tz34sc89b678881flfsg913md8ectht9l5k1uw15hzltsdrq7g02l9ioljm1ka8z848kngimcby5q3r2sli2oqtmicwfithugdnl90d2ym7q3t9repbd3dlxmhztr2s3r3xkpl96sre30xf4h0bzcmvxz52zrkl4gfyyohga3lfei5sx0m37ethajsbkazv6wtp2kfq7iwp31o0wa6brfnwuujn83swfibxt7h1clvdaakbxjat0j95bijjcuyh7o84ae2xxw6rzpbdo9zqrkfrkslptmyjwf6dpvywpadnkvcayqzy2j7hswtbe95adpkbunbqmxkuesq8v5i8yzrty0bwe0v8h082wxrsjt8yc4kr9ffbmsguh5r2wtwhcbg8q1jbetjvup6vc6f611cmqnwxap4vd6vent48i017erjfyjctg1ssexc5ppp4fgvssprlflt8xo10bjavb4bh947x1bwia1ocdhgeyf0ieabal8qt8w580de0mczpk8j496s18gyzn1sq19hkye92rok9fiy3zugc4cbowvkfw3kbzioa7e9twd9fkryhk6rmqxwo5yfmy93q0v4nhxipb6s8tbajpeekwk4sv5kyzz121wd0zn5qx7q9asoe10we2qq16l6iopofwb0695ozmuidctyvzebw3sh6u35ox6emp0h7y03zb1nzgzvdulpspcfyixkps2j2or1ostuqz8pqrn3vgjuxgjltslwqppz3fpsqgcemss01cq',
                fileSchema: '2tela3e2cdf1eej4e7bj9eg4ijq7hll1ahn4cfbhv0isp3b1b2au7m009bk09dul37swpsup16w30c0riqfuqr6xvdrgcxr1yzr4y03f8zh7fdyjzmnborvvw5zlqk9ssitbrpa5f8yspqq9s0qm97ck0t90muz7cehuwhywqsa7so6v8spx5v0hdy8cqm1ghzvwroq8ozsh6h3bov8mf4fbkc0k0qsreelk6z5huhjglyu23kcnwx1sv36ljnnsux2bkbs0133z595t25p14d0krpqlkkaxfpg5r4vkwddskxfmg8a0rwk720peoxax9mkw04t2nnthuoqtg0vrfy9cb9e819nyzyjha4nauayb6dtsro2h1ge1341kpk5s4dvqivdkwb5ldrq4sicag11rdcjnhzfclblt7o8z8x2hk993ze30jtex0r1oy0evthzyiq1k6h6kk5d9fz6p4i2hodpuyuy8i4isbcytmj4b8yuvc5nyah08sqzbah9vfdxpkvtkt8b3d7so71nqimdlrzvl95jyosieajthbvwetlpw23sjpngdbwmi1vjc4sxos7qnb7e2ht0b2w8qwkop1zah68rivqldekgl9ttu228mostu4cirfpp3holk5yh020uztcqn0buxw6puwx9fyjn679tiggh29ubtamsqx9cy1ezpounnb240fuw5hh2x6yydmq1iay3hffl77rde5a1rtf60ejzyx2brthsuk8h7uohdbyf3e1z2jyue549jn8h1t3wzonc221jpt4qint6jy7kafj3kxapnpmwqk67ae6wekl01rl0u9fm8gbjscimf82yqkmppovqye1dpcc5qfckv225ueewh4oz3it18re5h7e0i25kbaxnu3g3pjplj8nbvlt0gm5dcorxmymxoo7ldondbbkxjvephjqqydqnre0jbq0b31kk8n1032fa0bmm0xjip22ydkv5plcfilibdsgtdlmapl04v2zeljrneixxodngblp2x',
                proxyHost: 's9my3ovjo07nm4tna224ztgl45387itpnaf23b2olv4yvqsr7rk9a2dmppj4',
                proxyPort: 8032506658,
                destination: 'v81kl191hy4xilkod0lslqn0d91s026a86goqopx83vr8t8equln0kgulwcfp1yql108agej2f2papyb53a3klwbdlcqcdhelzcixw0mfu54e3l1iq79gu0y77ra9lu3syocmw41mqi7a6ja5qnmijvxo8b8tot9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8h8rktylvda51lklnzyhz3f1iz7qfcq787syc8tsw5u1cebfvub8j5jn5z7ubscpibrt60cncicdblv8pdcso9pizviosox8ov35d8xvpz1uf0gcptr49xf1kw50gxf22wrx10ql9c4vk5vh1eqlc7of54npw93i',
                responsibleUserAccountName: 'kw4enjnilrodbazgwiua',
                lastChangeUserAccount: 'px4tltlmkm41dmpuah24',
                lastChangedAt: '2020-07-29 08:07:00',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'jp3m6mlj9afuz96hk94i2corj18xeuzlwc3c2wjy',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'e7awr5z7x6f1b5cj4hbeqiulev95npytwy8idoxxcrt3iyuhkz',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '72jj2jn0jfkakqrkek2p',
                party: 'l5s0lfp3wfzq24u1pzfrcgojjqoexzjve598lnvoxfzokakb2kya900etfm0dhb8ie5q756yxbu4urzgk5ojb11vdcay6rcvzecyhvawhw9a5f32kgoqu483zwlho4hnkymj60u1tkt7fs4v14u14cu2e4g7vywa',
                component: 'ifwpwyqajws68x0xig5dh5ed7nkopg17v8vf24q4n4nndntwa7ros7ns8otgtnl8xn8q6ygfypg405j6kvhpy4kzsk7wycfqlti1ykl0p73id4pi95lvxdcwlw5wjwx087xyucbdaua9x2p7qllwf3n6si81yylc',
                name: 'upytha5ykgykxk4fharfirsj04q1bnn02n1heprlapw6rvxwc597uuzey0ym79ea9vm1iu32dqboj9p7njd5j4yov2oetjtxbg5plsfq5o1rn2iq54qx48jnez89kevb91skh5g0qjcac0i4ldhliobznm8ys3ly',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '7mg1sck3vfjx0n7kh11pva8m472vm85bclj3jq892i6bxvvwlxqw6a7hik6e9285dweisd18yyyd3hwbku54p1pdcz9litm39myer2nxmgt5e0tlca572hl2d7504xfj0v4xo07oby22thi302glcugd4r4x5wh0',
                flowComponent: 'x7fkcsc5erksepogi5hzfagr5bil4l3lpqb6vp2e3ahcu2992qbnlvx0zuezeuzdkfk68hb6uuyyp62wzfy66wgfcpg2e5nnomowv0y45tpbvl4k68ld803bxp4dnb35lixwdwqu2ju6u93z09opnor1h17deoyv',
                flowInterfaceName: 'b8f4i60ereibtdxrh8tvr8iphvw9z42tl28vnwbxdqwnd2b7pg4uf79dfkmii6ufybe4cjchxoed5o961054zemk9sy8xtdddnzoma8ir6grf2lh7qr9bohgkk3kvgceb2wy3a03lsj04aalbc391o8lf71637uw',
                
                version: 'd10ne35sp5o0eqrfll89',
                adapterType: 'dm62ggj8q3ow0gmob407lhhigstf79yrotzm3025uplb3i7hfkj9hepfuieu',
                direction: 'RECEIVER',
                transportProtocol: 'ftjucv14gu1qcbmcvtjj74flvi6s68fbhtifwbmmix2xdtic4ecyhmjv4gfg',
                messageProtocol: 'htaorno0mcm5odnp5mpl1f6isitke5ch6ctlbuqrq6n13en9q3b02kw9bch0',
                adapterEngineName: 'qoem6o9d3gpscvjxi8int9nq6w5gb8bkva6nobpf6wifbkw3bdmjtf5loor0s1qst0ugbtznna6lrt1f26mgvbwehuo0prxgmuxq50f1v7fsvbgfcjiplj9dayj49hh4n0mz2sdt14fkrdzrtilmzjq8wj0akx5o',
                url: 'feq1mtfrsctrmgrsad5aiyw4tl9dpcv9sphs7ozlzd8nyd7bldbizx6hkr2km14elyh0srx5kh5624ya89rjp1wzaf9myyapftmick4yq7c7wzgxsr640nu5e57xmip2m91mb8kr7xn6zt1ur1uf1p5rk6s6iuc8li07h83jto0t8rg38x8lff048rso78f0d649tppr8foltz1kp34c5z8quwacwn6lsqk0cisfffl8effxwjewo4redknu0ifh8xeuioqvbnjg840trv6j0609wh6pkym2c89nhsrxn0tmrih3rn7r116g7yruzd20',
                username: 'lwcsqfvvtte1k9mfuzxnvuluthtymdiapt36pvlhw9y7frvjcw9tgl9f9q0j',
                remoteHost: 'cjipaz302dq85hpaozec9s1hqfrfsxhu5ide4nup8uwy9826nm7na5inqeceb4bcqvnndeyfz4s3lb5f02172247noiv0d4yn3ij7zuz2kz850fft19kh0xl0n4okl0ejmqdiv3dajc2immq70dhpkzqvhh2toj8',
                remotePort: 8121474101,
                directory: 'eg57na2xfjhgkip7exxx12wbk07do4mtngexgj5m9c247yuuedrexrd97e1ppt4pwscf5d9nqzv8clffjfsefu3ddc752hn6ojnt7a2ifqukckmzukc2fhglwrqyl0km00ekimktleskiz475qj5l0nnbsrza7awn9bd0509mkbi4dpyp3s92jw6520qpkcm6kqtzonb80pooz8asafswf40hexi0ou6wbsyabljszf40az9qyqqh3uuzcxezf0y68mejspmucbvuer3kgqgon85ud2ijlvfea48ckcxo2pw8ro8uh7bezg6h1is7567uqa0wlo279zztz80jahnj4y8f8dz62fhthqdhpeget5lc2lqe575mw0s09hum1pk9xb5u2bk2jy7eawdca5zq0xz8pbtz2rt6a1dgwx2e76kuyt99pocxzup3kuor3xwmd5pj0y9q8l81hct1dapu5rz4alz562v5rgp76d57w6ma6b3307b0bzszgfvcnqfoqo3vqcevqwmfpol9kcasto7k78gipcm93cxl6t2zpow8cessgux9l5lvdss20zu027nl6tz7yh6tbjacsftalyndggfuj7kkfia1empaoid5phxog08jvk51e8ade5i70qmqe2jiisia0ljuz7i802toa76ju2iyy615jhf84p1k0n60dxg2timxakddrlui0y37kytd7y2zk065rm03hvbn0mzbk2tkiv4k8uqrhfomt9zpn6vbs7igsk9udbl1e7bzk63xp2ad2sjvxsdqx2e8wnxsljs1tkaibfqinkkqjwp8ilr64myv7yp7pvdttiru02xr6lem0rf3ft2amqvcg9u7x6aejqlrqowpbjwel1naoay1b88pqy79rhbcg11i6n67p9x6yeler1sh49k75164parueb37wvws5sjnohj3aisls1xbx4fo888k6gaqeqsv2ssbasigkuazm6bvzvblbq283mdjlaep12ieyi4ihiyxaear3uwpj8d',
                fileSchema: 'ms9xe8v21pvqh78xo3gdoku7efyaz9k41i3kwio0wxv3dasv8nmysfy8ch3px1zplnvqfq40q02ndqoc1pa02rb6o0eppftk4s1kw8rahpppkig8t3t67chjq8w3h7rp6dsedldmexudanvukjsgzvaslg2lb3zcg1kfd7e13zd8naqe3slw97g25m0brypnyu7vr06pp8zrjfajumsfoqi6ed8acaaylfitqropt95w5q7bolqo2c3w0b241nqlo8w01ywmu2ne56gox6f3aeo5623hs49n87gpsd0nf93uqk9834l089utiroltydau3ipbksfi1pldblqshoh25u96jt1sf2sv9rsnjrrbbdpag6fhg30mffhoqdqjb7sareskwoopd302jwstgz6tvbagkt55qyy1y4qsoo66gtdnzr7llif0mmnmr7k9zd5klfjh7tu9n1xuz9denyui0ajr4xn2ebwkeoze2x5joj72e651d4cssuef6sf2c02jygtgx7b6gw1gpjaf9kox5oo5ynli7x31ulmco8k09x8unvocnj1k07k7rnbuxnkfurowoz8qcxr44q0plpltg0nz5ib2inqhllgyjpyjgjnuv3u6rh1bu66hlcs0kk0pimfa6t072uhu3ytbtv0m3r19due58a62nsu484m5l41ecq60b4vx75c8bjzh6kkwu9hpeflin1iwkr4ougeiemdwg4v2hzmlap6b41z11s5znr0ux3cvj8pwzjkgn0tcl90uv4u6oa1jq5y3xk1yal8h7g4sd0ioe0hdlx3b7ohw90m7kub088x840cnvtxt3v15bcxki0n3bjl3taw9fnzerq8jv49kv47nc73p9zijuesol7a3n1ywoug4aoynjne0pqc6n01lhzeoe0zrz5k9hw9bgivwcbzsyivl3hs7gg4bjqlrx4429tircqz3sfrze3wr4aty2egu4vkdb7k28csr025czdcwd8kp3w2lbq9nh01kcf4p5zw00n2',
                proxyHost: 'lkcvda8j66zc6j5nf48yvqo53bvirvt6h72xkrtpep3cm6a9g2f0iz4e4pwz',
                proxyPort: 9938892662,
                destination: 'q8v8v9ra2991965tldbeebhihtdjp5nl8l10agnk406vo61onzpadrxt71zmpyci4wdskh01rja32276v332k6n2xaisky714bq9flxs22tftzd8m0xecmhr5tb0z3hg9n0se4bcxpsljtsiphe3lmz0rkwjv8xh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g1x2ifg53gpvbs7r0tot8396m1n5f6ga4wz6c9pa36lubwk0uvre5jsv5cu3xopgc89y09w2bfpkm63o1cuaq3kd7ubuduwg8yi4tyy6jgiji0khqim8ty7u3kifywy2w5ok2ionlr3i3wv6ef93q9211ucxjms6',
                responsibleUserAccountName: 'xq3w9p78bfmw75kvoppo',
                lastChangeUserAccount: '433zvlfonks2ziv9zags',
                lastChangedAt: '2020-07-29 16:08:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'b9dfkzeufosk9rywtgge2trpoc2a29z95arezho3',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'avmyfzbcbszh0no1n2dn9kaxnmdpssbnkebnlddn0y99rdphy7',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'od8n52jb757jqttki73j',
                party: 'zztrdntsr4ot2r2l143uswcjn9440j5r4j3zy8ybqjneweu11r9ry144i31188c3bnimlnwne0mqsn4fkunlzsbug7adprzkk1fvonnzhkr5g2u6pwcybnvaynenet1kviyaf0l8kjk46anuozkvw6qm97qyqgs4',
                component: 'vl2coilfwrvd6dls5s5qbjzkfycdla8r145rekoq1pf2zc19ya5q4sk4694yyel902ftkyc6tnylsjbzdyx6e7lvbyewmfmisntw7or3pnph4ngg12pyatlrnk69cyy1egr4lw65ckh2oa8lakakfchyomhtgmxi',
                name: 'nq89r6o73w89p2o5r2e93rtpm5nv07fved93vvsjo828fgpom5b8rdpmt7jugxj8dnmcpo6ed7oq2jmhk4h1fsmp66wjgutx9237ag1okg7rny12ctsha68mqvuas80e760wwjpkxq8wo2lgw2khjqe7rt6tift0',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'l1b5g3hx8baemuohdah5ahlmxx0a96yz7yihcfztit199vvfpm7pxb4t4pd1t9mv4io56bxqmsyeuo3igj5xl19p25xrmc690501hy8z2cv0ogrndl4aanh2fboj9rujvlgn99u1sceq5ytsnjrad1gx6yhaamw4',
                flowComponent: '0190t4qairtx6939grejb8drrhzs3p9xfdicqft7pxq4uogn6x963y8s7z6n2la0o9aau531b315carmee3iebbvuzpajqp4kyy6k9r5684defrq1hspt0rol1ysmeycvm41p2bcdymux011dm30xxwlh2uxt4jn',
                flowInterfaceName: 'ywq6ow146wb373hwkz1xwjfasp4uekg9p3momkgduujk9dfok34kck47pl3lg0tkzxaew9a5eu6rhwp61itdrcxcsvqzz24cfibdhhkd4igfb9lixs8y7mjq5ccjp9ofmeurhw1whew84ow2y6zsotyt9ee686ey',
                flowInterfaceNamespace: '8nz5gto70ks5cnphiox5gbcqa9cfafxp5ci7vcovjp7b1koxl78vw4hosxny4hvu878tynqkjm97b7u1zlsb4b3ffkmtgwc7ho8k64dtggdokbyyfie2ff7tks8ne2hos6ko77oh74abgk2uxncf5nixal29qq42',
                version: null,
                adapterType: '75d7do2p9mfn5hu7nwfi4emv05g5vva7diagezxveasf9bu0euhp4nq4upye',
                direction: 'RECEIVER',
                transportProtocol: '50xcs019q82xg1jyxjewtwq6mrnl4ro7qzc1n6a52a9gp3v75ho3kifbxh1h',
                messageProtocol: 'nye770xh37vpndh14hi3idpdsjq5ghg5c2qxmk5pek61czhez95cnppe5ze0',
                adapterEngineName: 'yo204tg2u28fx25eybpuhwc04wipjyny5r5c0ub8tx4bzgi34v0095p9zitho4y3wqs04tzicx152hb89mw6vwkipho5wx7zf9mq9gm8di69h8j5jzlva4sgj2p02j79sq52261si0a7y26xozfd7uv1aqzgah76',
                url: '93tdll7uymymhsg2j2onx0h7qftqh1n39kk4t0pt6p3v9atk9y7l73f8j36rqp0rrk69tvka8bmi8o4dw6vuv9wex6qaxx5jpz0t0j5akgxjyzh25m15dy5tqj0jrin7kzzo3ng2u211vu87dzio6mg84nvsn0p8fd8rfy6vkmy6qg9ru086zl6kh8dd1r3h8j79p1hlx80np5tmz8udawcplg7jfb2iljxofogjtf1cc52jbhuptyctqgpdmgfoo43m9fbvinzgfraju0h60015470z7jmzx8cadr7spt6zkrh51wn6x440jabzm3ix',
                username: 'zj0gl4tcji6uv2kmbnl1y2i3a6lay92ellg2k2f7fu523do7lmh9qdilipd4',
                remoteHost: 'njzlyjrhrhjolisyruwrbytvik8ckj54imi5mn5ol5xxiusun0h3v1ytyq72oisudmdmtfmy45bxqhakagp80zpa29rr7og55gbpyv6rzy5csptdt9wiiik8fqv3n2ngb9uekls2pegn9kttf8ucr4opzs13ll0r',
                remotePort: 4374826459,
                directory: 'm86zvwu7ajm0ni2itf2p67tdya8aqst6zsau8d5w0smsq6dmh4x70t2ln8e54rvqk21epq3sago41rx1oql00zhsht9g613sjyt7gpbb0ro7izz2fjeuqdbm9jy0okpf5xxk1s4uwmqcb79pba55ytatsd455gpl7d3c19ww0msk16p7shfpm2y6qflzpp408o3shp09xt612sc9481jhneqr7cjiv5t8dah8d6qh9e751geqm6rxmimztl3zl4s80h07p0pr39fb8r47phtc6142j34rx35jpg1ly4uqzxtncm95vacvh6nle2liv7aj0j8bhhohyt0pobbz4suvbq81jpzjhyjkh23tbtoov3puubzs94z98td3mcieyendmtto25y2fl5yl6ocdybgm3jmklwfa5tfcryhpdoprvnvnxpt13ozlugybljkqdx5f87fsn5ayb41wipfcu8ollogtb2arbodi4guedq8ab3tysafa9gjp22z947jv4w95qlu7wlwwnaf8s7guz354undukcs2e1goacwvvy6u51cqo131swv437mod521lk67ljsxlj9blexlrbg27pkvs27fu8abyozoic6j77eiiy7111hg2trlsh44dofxjg0kpt72jzwjrl2o30yvpddh8brz9zx9y7bnzep2qj5ds8s5sg40s9qk21mwftbn9bknpezy3loh87vpoxscq3wif85y8tf03o5xn43sla12egc6riby3v20ie22so40ug0bynm0o4qbyp4gpmod769scrv2okqcurijqmfni1b1tf35xpx5zsbsqb1ouuj9v5h87rqxxdw8acqronuasoeaco681gvio97if8n6gwic8c28wnithgr99ia3kf122w51f5morqrmknkbebohs1a04txsfua8osczkhobehgduqn5162aip4cocc6aq7nvmsw4w43jxe3zu2wve0lxta26xsn46x7n92mx6ihte3m9s6fu2ak8fn0cj8y90x9x4',
                fileSchema: 'ocbdfoio1a8dpi37rnxcr546akzrirl5bfq8oexne3v4lxwvoiafwn30ndaktwhxno9emq84ee9vx4x480x1g213s3ic4vonkegpmv53u980tfaqjm61qvw1ekq0by5dyzppcyfo421coesqpnpgfjrm5pqkays2gmjnkfgooz9qy9p9ophmlbbghsuzs4qkpk5betfl0e09usiyicjdri2twz8h5lczy3qq30wmnzd4thp613r9s730o93dfpiaiaxn1znnqzm0rv46amrjvtcubgaeu465oftitslniwl2jy1z2we70i73nihovf7qpklihdnolmalt99ww20c0vuusumaje8kuvjbxvyz14fkctsynf8ghmrrg46xos37purwfiu9e49jyngwlw360va1q08qr5xg45eztiazgugylo2pver9fy1xm9f8yf8zd3q47g425jgyb79mrbucauopmg8c77iee6aisnf6bc6sced4x0eqdl4iyyfcaot5rth4nbr6xh5p22xee5m1cy7eswl2h1h4lpkeyoiyqu68xhmhqnh9dvy95avzfztzv9agwqa85yd3n9wtvymtqabrqpi3aqtio245k7t7zgdhp8fr5ky31ouzsxxl3sgk78gdwleaxzrmahloy7fy47oy1m9s2n57uj9dwjix2i08ooj6j9zfpjvmxfzeakb4hna6jl0b3t04f8h4xewip3zi5qgbv0vnk68hwovyxxpb65v000020d1ecibyqvfbrp1rgyqkkybrygmcc4r9oea2lmtmv1jl2rikzu05k3i49dbgzwxv2l12nl6e78rh4m5mtumf6brvd90q8lbh0x1ayqk87zfdjfirxzqm98q5prio3b12iyjzipwfgacqtv4th5w77aviamnxl46jp1vx58djrj4cbqc9nsysditxoj3fb5so9zwj4smb8e0fgjhe61tb5mi2knpk780b4l62l3qxhqfpevzm50o4ttgcgr01zo1hsqumv989idfs',
                proxyHost: '1itp6x3zkddzy7l4qtcwzljtp6jbg4pegyit9yosuxekf5w841ksc549c5td',
                proxyPort: 8295148412,
                destination: 'asseto7ijcoxv5897sl4eh35hlmjh8j6yxal547926axkct6ve27izk1ur7mmoyply5kyj8uzt7nh9f8sjn5133bpy0y276in19phhmlmgrq63lp5twpjs3sp9im507h2lefb5wzrj22fp5w6g9gsb9gf1jwnpaw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qxibb0xsysvrpkffztwxpgp56utj9nn42xc3wk406w33n68rhpvrlh8eqgh8aeugorwxz7ovjkheq28glbvs0c1lxi2jityn1w4f1lsh04fmkp3u5faz1kvoke3wrbfrlc5rt1yswnh6mtovvb096djbdk5mkzaf',
                responsibleUserAccountName: 'p3pbmj6d52q82fd2bb22',
                lastChangeUserAccount: 'zeq8hjjpk3i3dbrsmweg',
                lastChangedAt: '2020-07-29 08:30:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'e0hg73thsdysi6hiumgcc0yuguluo2oy2pcvd8ja',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'pk5ss6514axfg3w3o14oo28hvb46rf2trxu1cwg857ksrizwfg',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '3s0dkhd3fs9wcmh3q7xc',
                party: 'dl2po3vht55qevowbcu70irgmckvle6xkxbtuo0bbumnp58wdivhx6gkv6hxrjp15vp75klrsxd4asema8vc1rxg8mar3u1u80lju6c0is4494lk11ge0l2newvhme1fmcptnyrzqt5hpbef5v3ii3lll4vm2y63',
                component: 'jsbqiz0vkizequvll0aceqgosx5sy2jofozmq9bf00819y45a2p60w9uc56gc0qycs98p8n8v1vtm3c0kcexq7gcydi069049hlvz8uhte0fyygyph37z0g5byadw3ea899tsupn4bs480n65hk2axtkpvixy59c',
                name: 'si9iqrl0qjrv3asb0h3qhq73e1txe2gi1ovh2beauleop0omdhqelhkxv3w2ietegs4wf6ju4v4pfpalmzws8lj8yaw8rjg8c1ylwkgldgfdlad2i6jgc9jz9ipheyhbw8hgpjpubu8rw7htf2es5lrcz2ob1mhe',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'bid8wg84lirja67g3e99m2u7jdkks2oamqsc19l353gxi4l0tsuadcmw6budhobzcrrjscmk3o3of7elohllmpuju3j9nxnpxhl1x1me53r3yxodmxtplpozv778yq05p0x66x8sx34itt6qsuiioozmfwytwbfz',
                flowComponent: 'kudt4lwy60t5v8rhnrdrorksjpsmzga5bhovw08vfl3ep44kyyyaulzxsl9xaumm7sezlg7as7mhvkddsfmuuu95pbtxqzqynqv0bgkvhgbizvur239d4xkb33yryqoqzi0xdz9t2jvdglljdcj8zd94m0duh24n',
                flowInterfaceName: '0p37mbt1i5x1z4ev6vmyw3jrtil92bfvq62q0plk5wy25izkdueyzvxtw1q3a7itql1jga44lp42mcjeu8xqzakzhmaw96fbht87piqzzf6v9iggyqccico76apgmn2ctwy74obls77efcy2svfnmg2waztetjr9',
                flowInterfaceNamespace: 'g7v60rbzdeqgcpb6ztcvjj828zggu9hlpq54qfnmgb6xvgc7kjcggjibr8pazakfk08rv5exppgzopqeoiclpjbszp1651hschr7ddb0qdje60sgxzyyrq7bn7lg65t44mym06lugmpdsy4r18adnuz46cx3fh0x',
                
                adapterType: 'xcaoovbay4rctx7gx1k66kfsb7rzp2byoueto7hsf5h2l8mne4xgmdlys9am',
                direction: 'RECEIVER',
                transportProtocol: '0g00rhi3zr78q01g3uokbw0tm5h49xbpwom8sv1o7ncmfa53i0fyudae3pmc',
                messageProtocol: 'jcvtefaub58rvuk1b9exseoxjcmhnkhd3wlber6bfkjlhhikng7gehh8w64w',
                adapterEngineName: 'yi3sxtqjobgw1kffd27ro4yyc40e8sbteyna7hi93x73kwt7sp3ix66m3j8ad6riexng9zj8h9bmd89ls7og0txxsx5m3u857a5jf5e2haluq927pcmkhk4849txke8gwesdh521gefp5ocldkzkljzd1samegg5',
                url: 'hn8cobfcicfyt188ezegj5410w9fma7c5ww6vbzcq4bpbmoyekbj5cy23clxd99nqusnyivj2a5e4i16u8uss31pahz88he93p7om2pomjycwdea1xbvjb46wytqomyqu72aty12zcfj8vgyoh9dgdqdkzee561xbi1dbprx52artz23qvooe6v1z4af0pn3q32xfgnsl6oh1xqqjn6slyzsre7iq9dfrz7y5cyp1urqec38dbk9h64jilsx4q5650sgdygkv35xxn7c6ijeotqzineppbt4ch1f460pv9ownybpsff2ryrkkk6cwedn',
                username: 'ncykzb9nnw2d2o3hv8zw3zntlj1d0rj72e4np7ftolq476cc5vbmq4im7tai',
                remoteHost: 'so875fw84i9s3met5lwp6c2w6tpwk88e103bkk2n00kl3y170496xvnvyiods9s13q6bd24b3s6br6z4dc2t7wzamixztqnmj8q8qzo65q4stfbusahy0u56cw1mllicbr6v9p5gzyc7qkcnwhcrfpo14g2n21vb',
                remotePort: 4052739435,
                directory: '2mnmh1g8hja8m6tuolr8pzkoyj24am0gdiwi7w70van0b66jmb5f8g9o2njbne0fprey6p4kebdrwpsvola5he9nh2ih49g19nwus9evb07sbtvf4pvz9vxmk4vjwfa6090723c4nzetbev1xjkxoqwb0i05dhq3wov365mnnam6rbmiuv5chgqerg6umxsmuq53t76ex4b5fu9qhwh644a2nglv0ilet9uapf8hzt9uedm0z2pjaelh9g5nxxt0z19yw9ejjw0ggfgnzy1x713gbmg1wg44zhpj5mh02r3pkudszub5rvn3tildoj3iuql6y80bx8gd99b9daxut93v1u01wzgzjl6kswg6qeubabzgs417dn5f0xgviloj1eaixoukd63v91e9jjqcxe98ybutttzescy2v5727x7snlvhpmc5zhkik9c4awr0kwhhpz3wgq2j69cngiap35vjgnoz8grwbnlmj1f16qw3ob6nkmgd6qgdnfl3icxj7jz7bwu0vccdzp0g6lisaskv4jl2up4b99q7pqetdrfcgzx1kuz0lwlelq632le9tab9gx0lfeusve36vjxfrwp8las0cvxkqlmbyw84lmz6fusi63f6xxuwotfd7uiadkaoavxbvskv6z71vhs5kqsu6p9souvtlx5dvwo27393up7bpb30gcq78x96wrna1d9ukiviuuc69yzx2weww8c0yz6ymyghq2k270swb6h8z70rcd67vv79l9xhaljl5imkst717f70ud8d1q04c1dutsd9z8z3ozrt68hzk7zlv6q2mgttq6vgt1upkpfijdnh4udqed650kj03tveryhtvln88gr4hzw0o6ezqqu4h6y69j2hh2od03ir3dps9ppjmr30gr3rdl95fobp5ws6f65qgc62jcvya96q2ptb7ht8bz3d7s61df7n4p7a40jjiyojut46j5y9j7qbi221zm0byfnujmpz3wujofzj0kaenfw02zz2hvfqiquy',
                fileSchema: '5dujnxql0md00etny6xz8ljt8zb3wl4rsxb3li136b0qqw961scty3mm901w38f8234rr69acfyj2o4kc31mklps20nfcdyzf6zuruzk6935xmhm1tdoo993016ce5eg3lnt1h793lr971xivirzx2cyq8bq3hai6nvok44rbso600fw4a7xgsnedsdmzu6g5ksskzd05qul5xle39x8nz5erslaxieotvi9no2nnwrx91nt4oek42gapy4wtnbo8t93lpp1t5io99cgjpadle4jse2965qhreik237r716r679awnwy3r4ubrasi10oofzp88iyst6jhzas7no0ojashrsgec0fpcpa6optin2ghhg6nxj5zve6zs1q9n6vmbd0jhawg9qfk879pdk7mtnnmixeq2b7cg83vbhpfzneg4hn4xvj6e4neq9bpiquxsqbulpgs6kd27ehkshbox2yy2kpnrevo95d0sgwxgkldgdfr9phk4ef5ddeu0rtgqan4jsj38aelsb7cit7shm2oixdkl942dk7ntcxqdwcoj9pp7el6pdiy84irwagx9ltxmebwcfgaimtudkixnirjl55m2iksqehpz85jeqr9xdmpmy9dzpzodybthnkcoi2i8glz7re9r055aqpoaamxa4vhxmbj34zayblv8pct0rqtcckp8fhtesecylt2ckw73jwc02c7igh1lc0ns9bh95pwvwg7bj34pmgfeowiktm22vrq3grw71co5rjltbqhgfzhybcaac798nhmsg924tfa424gwli4i2eui4d7cyugjqot3y5l7o331zvr2ogsw78q98dcr86629kwzcrkd0t8tz55lwe7ccofgffstzc5osua31a0upvl3vn0970ofl9n4522oc67yuevpfnhmsnxut54s7tjkg722o4bdzl2twlbmhop6tbg6tyh1aiorot7cwmdfaak9opr1tcqyw89p9tyn7rjr55emu8rq8el19oi0g0z57q5gy0',
                proxyHost: 'ec54oi1kal24w34dfafvta6qxj0hkh9jf8pfx21wpckbkrx9umnotplwll81',
                proxyPort: 1452184918,
                destination: 'rhp0h6cug47rh993wf41kzxht4fnt1f9r67ie0hlsd57kbjbxq2jdt1odx02wowigk46l0as9ritlioz9beu9usu0p0hhnxdvkew8kwhzkoa29l173crm7yxtay01rlgu4bfekoygh5v2ogkafd2eznfrsogigh2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nw0l0kf6bu67zlyncgk1no3cmdmklrz0yaoshrtpoz84yubibv4fwfmjzybii7jld3ozx9ka9fs4ogq63kd9o7mqwvlzfwmyc240eu9ce1sbklwad52xx3pl3fp90p378nxxqhavuo0ufb3krz8awsrhkcq98m06',
                responsibleUserAccountName: 'wwls99xhvhb5ohdoh075',
                lastChangeUserAccount: 'p41318enf55qahopcoz0',
                lastChangedAt: '2020-07-29 08:15:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ck2nlyd29mhwbwg12o4agnhucnpsn93o41k8ewae',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '7udtd8h0x6nlrnvijkwtpipoir9kr4wvr14slels460w7p0o97',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '7m6ojsmqe046qaf88ezo',
                party: '30pdhs5s6rjgpfy35uhotc4zr33mumb8ixqhbinb4zzh8ulp80iuguu8h15tyce30z71f8qoovytalqqivd6bp2m3pfi0by8a2vav3sa7oxowu1376dx5tzuzd65aacqvs7a9xxx6e757s86xh0hji787xl08rf5',
                component: '6du7wvqg3vak13tzzn2wlqkm15e71be9qvoblq66gpokquocdcs1wsgq3ldlz6t22u54fiw9tbnr9iuwm2m39ay7okxh16i6k00bm8jbz0ophr96il2mfay10clssvoydqfdcbopee3pyan1sgjy9f2302gbccnd',
                name: 'o4ho1ejvq2msdc4t6ramwcrsgk807f6ma03hdj7obve7jj1p3f5xxny29w18h6gfnqj9jqk2cusq4ospo8eknnfq6i12f9oafic3qu53wy0fl3k4hehe54tlayrm6dw16ehj1ay6t9l7b6gh9br0od3ui3tbgprr',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'ivnbybl1tso4nlmt1iq1uuy7vcwpuqhlzdqc71vyajwrg2gg6ciwsyjrj87toshk480h86dqxje9gjzdebh5orvt0aruosuzjpyqiw6ihxkx2bay73e2d5ga2xrznm9xsn58fa3gt0d99roaz5x9mhmnkl3g7yra',
                flowComponent: 'sliko2r717x90zj7qcgwplhyc5rax4qta0rv89nojm2ve1k6v3x7d2lwy0xd753u8kwz65u6jpvvdxt1z4y3x7oa4wgw32sxlk2tadud5hzf6w20b2sn1c8zzgqgoudl8v1v1qt89o928g9w2jyurtk3giiwmagk',
                flowInterfaceName: 'x6e4vboiho8jpnt7lymop7vx3rw9v2aykzf39vzkw6stojoeke6sa4nclzcmakl7urwrbafkrg48igqv2urj5jxpbcxz8csovfpvnl5pfwntsatvo4dzu8133q61di1ygci8r5mdmhby6ydc2rtlsauukt2nqt62',
                flowInterfaceNamespace: 't18v0ln8ap23w1xpkfaqk91jaik5tt9fatz79h2ppj37g0hgqs1ozb33oy5r74b97a63mjix4hl4ylpbkt5j2yout0rrnru3o4dbp53ymutda2r1p1323b6ue7oeygkfbt14vadmgkhg9vei7ch99vnszah3w0c3',
                version: 'uyssb7d9bdrh3xsafmdx',
                adapterType: 'web6f5lu9saop8qsyreqbmsdizsikpj2opim2rjdrszv3tzd9f6x9060jafe',
                direction: null,
                transportProtocol: '7vycy16fpo8bilacdcaaxc0u3bm89xjl4ybbvte0n8yfluxccdd34j2kuzfi',
                messageProtocol: 'xztf00vt3ftvfhzvf90jdsg0tgc8gxv3e8rqhfy7fa9x82xwzoutceu9tgfw',
                adapterEngineName: 'b3mcmsvlf10o01kg6687xte5fnpb76od78o31n8gy8n81302qxzd65i9n1rbbdpqi1m7dyrdfkufjkyggunn0ioiqpglbs926foxtyltcl9qo6mkfagan678d4ywf9psi0kqnpkppdt78rxphto4qv5qca9zu9ar',
                url: 'p3g1kvrsqwhr6qsd4ryiwmufgfnhct7j02pd83fko6rxrcd3k0lsirtbqrvl6ivjb95jbb87ki1gwd61hulonztdde3so348fchehodl5xs4dv479vdcam29lrto274oaahtvbkuzwvufr0ukd8w4txx8jz48cgg181b6xpjpgy2r17a54g5ltq4o9vgsygp6dykdg120lywdbtx0xxve58o4t8p7eie69t14p09buvyt0auwgy0u9l0o3jdjmr5mblgap879ut1l29eqcdac2aa35zz21jnp2gcf0e4wgc3pk1ykm0hemkp0aywzzza',
                username: '0b96qy2l2g7b8sgn441efmtvbp9bcjytrs03vx3qpl5njv0frizzgwxqez7v',
                remoteHost: '6cklh91z96zlfhk2r74yyb4f2ysppw56vm6aa09m2wwh0woy7pqghmic3mo5joyxru8bx80kab5cd8jiujbu0pedjrf96pxkm8s9ae8my6xzk2dn1u1ju0y51rf91dyin8wma302kg5v9wtvavkc966u9renlylk',
                remotePort: 1727093388,
                directory: 'q6q92hnmhb955e5fu30opro9i3x7wkjru6hv0kvdvwndlzld8auwvifxivnl3r1y7hgylbv68vu8uhyq7imaxbvluhx2oaostcpjcd0xuvbvbbxln17g91g8wo3yt5ugz7uuh0zp8g52tv5n4b5ygmoesq4oxlltexkaueajzj4aph58jppui7xutpfchudl8zylp6f6khqcex5s7hozvtnuylkexxo8r4yije0qugsb2op9fkrc46ared3uripspt8gt7vjbqfcc9jhfo5xomr855ptwe0hz8tkxmjocio4pydyarde57jbc0n5ecyn6nbgirj1qfzhaqsdix2na1j4j9mkykcik5biuf9rxirt6w2e5xs0hgi09swbaapk7ta8678lyhk2r19z50l6o6g8kwsaj7uz1c04mcdnslki2vzsdgh3fihi301anhqd36aq6o8solf6s3du4mwcbfmpmyn70a5w1655g3pr006m05tjq8750zackc7tt0c3qw3dsgtist2ovbwgng5h9j6qdl1ni3fgfwcmz80zl5slhvuqk70wzz1bkef108ibx0sqhfsvqgmz8clq1gjtbny1sl37y6dvittssykbj7zejdd1bec8gok58rrxc45we27f519qwj21nyqaz3mnn5sni29wrqx2qc9yovq4wf0umyx7t7kk0ellkzpf876srq2s052gbs9a8q237mgj25d0db66utosrzzsv3w2run4ib8fno0do1vic3818bgpymbtwtvry659raw2z93lmztc3l2kv18hz1p68bmcaife2j1v36ua40edq4n5rkymje17ly277yk9wwxyirie1eouw95cu5i6uulo5jmztzqqqxuw6v3hrd24dile543vdn3a3m67r95sssawi3pdk7vms9oncmceiou9hx5tnnct3r2up9ofxs00a80a7lr2vzewknfjme4p0ly1d3tf0y0eothoncrbcdoirsivpk2wd444cc2g0gotobcy5qow',
                fileSchema: 'xby6fyorza2czt87tfu4zls14l9oa3k576v0c2svmvejtzxq1bvk1bukebcphtz3h77s4nag34cvecfwuluhzt88m99h1by7hia5pdeoqlofds88rqwctf5hrr2ejodsgc1hn0w5nsztkab4748lvlyh23jbsty829vklzh6d3542r62pe86zxva5z1spkx6k9sjyhs5xfep7z2zwecv0g2gp2ibwkn92g82qpvyj4760t9iibe50sxbj6fzh53g44jlqcbui66ic79tuxti0trunv2hvzyuucopbulr5c467hvhjuslvxec19g6bj90l1sjtxh7s2wmy3wvm8oq7vhwqwnpbipq7pca4rpff0a60kmrt575gqui6gsi7c5rtefb3slr053eb4cpv5ua5hurf6rzqm7odfkvuq8c2h2mr9xbh67ldyarogufecwmu5rgheakr4dwiee92w5ljy1ms15yr5xz4nimzqaljcnevu9rh3wmaxxboh1dp4eczez0jnf0qz9cy6fte16cntcf6d8v0fuabs5l0a1c2hksgb2jb3hpnrszwek1xeyei9x9evv0793u4jvqcten0l6zmnm2cpumrv0nxoa1jiv8t4sn42vrt64ipzxdn1t54d3fi6yz2svz9tby6v057rn2313bx0gy4s5o26a36clih9bygf2jiv2gr2j99uxbyfcdxf4a10qsub0yzu8iak2vjouqxb4iqpujdarde2arytpprv3nbkqwqxs38yr6aepc98zkll0ffecr9jt7rdej09lkmbta0z5whhkai4smstumesxcqypw3kg2p6plnczncvp48gkcqqnwcwahn8x2cpvkzaaunhritz3sn3iczi1esgyi89bjecmr60enafoirnwnxo6rr3od6azwqtvdas4orw55xdk1qdkko720fj0ls8iqinmdya50txh7mujl2k82vpgpwtyin0ai2budwr2hfsd5b7ln5f2n6512w9ne9eb9j5na2icl6v5g',
                proxyHost: 'b6tichg06zbdp2t52sjv9kbye6x3jvhfzp8sazsr1a6owalnhiqpocsg8jy9',
                proxyPort: 8167103928,
                destination: 'pgzri3jvvnw021xk4141ao43q315waulcn3zc8qmm6qe4fqilg59muzsl9p0uqc7zvbq4ccxlv3r229gbuw3aif31y0w5lft39h23s211lmdwf4yeznxzuaoijmw31xppn12ppp2p49z5dxd8vwrgqqs2nv9pivr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ctj1vv0txch7g9zk22xojro1uvhg1ji1nbu058es9x6usl1kb4fcw6rpesnylcsc20b42hjw93j3f1etqvj0pzhpriu8iiq69vs5coq8tmcvjarg6yjicm8dykbgtrogjfwug57hzmoy021nf6qaughq38ikqcn1',
                responsibleUserAccountName: 'gwbnaiad6htxih4etbth',
                lastChangeUserAccount: 'q5034p88rqqcbiw2rlfm',
                lastChangedAt: '2020-07-29 03:17:17',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ff866l06gr2amdq8j0abmtqw98xmnpv3jee1kybj',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'fjzrf0731v2xtcr9z0a3nst4drejcbyv651o7rzn1io2olf08x',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '6fffdc921rl2px77tm52',
                party: 'lwyz95q275eihlmf9ujks0gt28bv6zb8ow0e8tkv0ho5y6ogffbf7btcd6dpqre7l2j5dcuvwjcdwo3s0e3km694qh3p445jqgrddm9bxhis5r1gqsg2m7lcrh6d4tr8h475fug90ehbzeiod3uamw2qsks41k25',
                component: 'juxzohg2g5s7m8nft9gmw5tjksv6ij1ujfxs5gutvbt9ofxp32rdr4xnupu5x9hl14ic1u94kgoq2ycrjyj2yqtb9bu0vh3fmvup7xogqs4wbz7l7zjhxwynq14e576st06xyctqnx08ba9tpi0bqucf2eljxvxd',
                name: 'bsadbk00yu4bcukh2qgoyb90qwjir7rnb5ovmy1w7dcall0uz9nxf6yaz0cxn8nt3ry10aikdkutelr8sl6cepwxfzwniaj0fq4uneyvzdmomtl7uy66bdp4g2v52ec7wgd8qoqdwhpj1vaua347903abk2ja7go',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'mnecxu17fo6116pdvz8g7fhgq3xr0hax4vovh679dzgttmjirj07z2jaqs9hf35iyxhiy3nk1k4p0c4il8sksmapnyl836fflqja1kz1ydmkokqnkb7mzjeykkj75fqos1ac9pdm19hh7q3lhqd4lhrv256d69ha',
                flowComponent: '56ynayzmzdl9drupzaf3nwtgazzm0rjc1b286435c3wygm5adq8h5lx2ktxayzledft9wcn6ujkwpk05busbse36k6f6q4thbwwdqofqz8p82mvdbabow4o9gm6505kd0ayrzy5sg17ztu3tso8mti4g2c7sdnc6',
                flowInterfaceName: '39aapa3kwd0wrslxd20gnzt99haqg0sxsmaiwol76lg3egn4zoxtuxso28ymv92x6u8ixalcgikynj7cb57dq5995mrh25s1xsm5vmn79c4rxvwywdz05qdee6133vjmee0yuhg2kxvqizmk84six03g9xuyc0az',
                flowInterfaceNamespace: '1040yhecga8pcatt4enh38ey7gfjczv5dwzgs1ok7y9ye9tda163djmep8wg5aqhzmjkaqvlbaw1f4ry68dlx8i4i4ugesxmftsyhp3vooswb8on0pa3l9sconrfsla36rtykc5bp8zvkbjx7djgk6406gsoqcbf',
                version: '4tw15uhkqlxpsrascbvh',
                adapterType: '7cr9zdbqml5zw7jvpyudddmx3h7yi42bah5sawnl02ws6653a07d5bao3im8',
                
                transportProtocol: 'mnnvn1nccjg35gp6au3dcrnsr9ligkh7cy3pcat1qiow8535reikpluicm0s',
                messageProtocol: 'jg89b21w7xrpp0dvjfdwv71y6br7k0ge5013se4x34npa4ffro5g873j28pr',
                adapterEngineName: 'n59x7w4xby2m97bkkfq5a9ggrlcbxur7ptmlb34lb0l2u976f8kt1pfk1wu14s2rnne8f152yrvq2kfvj95qsqhyrv5bi5ual003a8iy21zqmj5seghcsrw7ywkm8sad71y3uco6rwzds8b2p9zoesvc0235agiu',
                url: '1aqssqlsz1ju39i2qhqxjq6x0lsmglopa7hhm1xwoef98i7ownbuewq1rzlqkj91t5m2eo7dmgu3tgf4ckve0zfdrhhv37uoune3irdhgjm7d9cnlw1tmsvhha7mzh127frzscsyp4rh6jcne1exl996tbii68gil0qej0dl9elox1rokmvkv3h15t9bsw9r1lqaeldi9765ki7cd14xq42zehe0n11yrxemypjpqhmhjslbowkm28zhufjmki4tzo9ry2k9j98x6dp9oebw48cpnhabt6484nq0a4skivwr3sqd9z7v4dhjqeuxlqz8',
                username: '1yqibsj3idb3pbtyjn0ajo1uwuk5qlvrbfnknk0k2j1bqcyouldb6v6qp40q',
                remoteHost: '5fzn9b18fj4xmg41cvybf8lftgj9kcn80m2ym6lhqnjo0f7ajt578hpm100ei6m5pc0jaud2ychs64xp542emknb6k55gptln04iixuahglp0hwn0hjcey6snbdyyne5dgmu0aefldd2qk1gu7alno5ootokna6s',
                remotePort: 8606946141,
                directory: 'pl97gdllydyys498tag9fad60dzp7v6z46gu5mh3i26bl2sovyn79h01781qgalh9g5tfk9aq52dd7i3v2jf86prwqd2hehws8qvsweposfqclqn6u567sl6n70gtrhazh0k49ix26x0jmyqk8md7v2i3t7cjb3obezxluunjpuwwivw617dph2zu543jyyjmw5rfbnurvufmd2deauh3psgmfg2fhbc5bc19ecws4jkqoythmmshfyjlvlcecobonqjpjcj4jf7w2isbpdxw070ycvjbr9kieuyxai9apqozyaocgq6whmh18n2w7kv2tbo4xtafaabv9x2y8jmepj7hb2qkqaahvwr3sdj96vedju0op6ctyzssa1m6p8twb1jcynfychi3sejqekckfrxy747vvgml7p8mgerh1ja51o67rcrd682yg9l297a256axzb7gc7c0vhhlj5bes4a2c82uclp1apuqfhpt8lumtnusgsqurv1fac2pv0ngnxpf3hd75tmizotp4yzrhkzexa5l8gwgmpj88kqj2cm1ntf6ylcidaz24wfqr2qxwnp5ns4qbbtxblm12nionujosg3yksabfqt30zcdtl1s9diwrl95p1i918mzpc7rjtei1b8r07n0n478dd6udgc5x8f1otpqqczmh7p46n8wwj139enmd1aa1biv5rxiwfg8dg9ordyz0ofc5yge7ojb70y13wjxulgc1ods6f8cr6ovn34r3vdp2dlpf41m0z85y139fic26vj5o6c3oo6axpz3d7vjcikzrhh7cn15xbmswp1tv5w65dx8gikkgu5hks5ql7ecwlwu2tzr8iqiwha9ml1f56v3t0z8bindcthn25je1c6b54xjiuj7a2i9gncdyw06svegfj5izyy6fiq5p30nzdhgab8a5muidfqmtp0pcpfajl2dyazk4alr67xp1dgod6ia8lpwh5xtn8n4zclwlij7d9vw34eeu7vnfktfb2pg0263wly',
                fileSchema: '3c9imcdas5ltjbakssvnzy1241xzkrpdqyzp8ci9m47ijwq4vkjbmizb7xk1r3d5sdmug2vyglqjd3pfk0nrpesad221bhsm48b0og1wukzqkccr97emq3hueuemolizbuj9j2tdlgs6y491do77yqgkw7mdswp5tyhwrecmwccl1xkjzl43en0gt2bvd3jhq4p10miz81p4l6rcep8elw9xzg0rm0wihyl6zsih6k737qno5mi22zsoj6rra048a31y3t63pp4rys0b89exwkz8xvt3yqaf5oujxwfc3ep4o1tpmj1jisf3pdm5nvupwrj8o3dwat21nmrv8bfdcizhm13324rig30outxmg80vcbdjnqavu40nnxjfbley7yfwh3npevjyzyz2rxlnhiv2kjs4lqeeiwq6ey8dqcufg6jpfi7cu43bx0x9nhzrgrgf71ha1lrmtiq7tn51eklmfubvssr1f5hwvy0yie1omw87rlvefhe4pijs1yl17nuleh79f5wahb71evpq93drd7nxgg8srgwkmo3f3cet3bs084whgktnp7vp1y61scmlddl4az7jsnzoiwd0gs1b1nmozop03hcflto8tvz9irm95ws2hfq6ly6pel9qzbghi61jj6linjlx5dr43zse9seekw7db9zj9r0s4r5zz5wtbh66khusptrkit6ipxnjgtcaglh8d9be6h779xkezc93scjuqqxefo6791ghrisrjcwyl38spr8ejq4v03q6tepdzja03jdhbajlqnidlzl2v7nwxu6pfr65ho838squieqvr12b0bfth9ul307gp06uzc6b7s17je6z01x6yup43zmbdychftmealtci82m6vufoks4k5m83ew39g11d58m712ogohzptcpjthehcpiu9xxqzqkdz73e1ugiiz9qisfzju5sei3k0wrobeoppgdrvjf1270j8ugeud4w5cy6orno6dz0tsn406rjomypjgw9h89z9q84ud8',
                proxyHost: 'm7ej5w5xfj1cjkt9fx0i4fukifrug4pjpjx4n853xjeguzky73emlln776np',
                proxyPort: 3155483835,
                destination: 'tnr88bhh7r99sl63jjpcxd2hlzv36d25yx3epwz5jv8ew6ggesl646bfrnpmwut3qbfijxl32iwn297b1kmbn33s91pbj9lng9gp05l046dz3d0icakau5yyarrxjev0mg79unl5uwr6xsrfzne4bt9c6fii15cu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r1la5s1bmgwgxpz2k8velilzscw3pvfn3v4330pdvm7ovh4movfp8640v5jpvfopg2p9c1x17lvzx7mczg1spwzoguo3wvvwz3hzxvhujr14g5unzp6h6y7algd1k3statj9d0zz0eoqbvdyedgfqt601r4606ql',
                responsibleUserAccountName: 'vsh7m6602ghnsklkit6k',
                lastChangeUserAccount: 'osca4c5s034twif9gdd5',
                lastChangedAt: '2020-07-29 02:06:58',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'x1k0i14zya6k12eayxxta819xlgz0xfcu2cgomvb',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'fnwifnaqgqunc3n8fhubw9kecdhtehwj8d4lttfvj8zivit0uf',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '5y4jl4j918lgae2oon2z',
                party: 'x4o2e0phgrelnvazagl0diappplum1qrjwb0x4p5g5zzpok7tx3nt0xdws4w6zukxl5w0jh662h73pylt0oa852vjgmlo1pg52hcmrkhqg3echzenld91c50q850hx32yd0uqllkoamspel2n0n0n1v4ue21q9bt',
                component: 'erwtt3q7uqj3y7j6jg83xzvigfofuqd0veg0u8fqsx2gdft4yq9tcnt2n736uwroyr753zrw1zjm8m9mscg1iwq0rix8t8vfun07d7hnzfetx9o5x91vgp97ps1rpdbwuyefyov9gr75e7aoqcpahb2vjyifiv29',
                name: 'zvj64yiwlv6xy479h4hx81pw8abvgakhpgdwjlquhwz0z6a22d2akuqday3irbrsy75pficgkcd12ecd8sao2cantsniujw7823cohmkkv05s7osrxh7og50wahcx2i6bsj9aoo5r6ejl3tigq8kqinsa4t77v5v',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'q9iltnbwnor0x4iga3bccx62vcr4du3jki2aykm8p55g5suqvwagsofy4j8q08jyicvw18smh5ut4tqmd2bf9pearu545esew0f1ik80o6hni2furyjszikwxvgnsouho346z63bml04l6bkx7gwserl3slypwiw',
                flowComponent: 'bzrv0awyi2tdigaefs7o6hm82ee9fbv830y29bvzxg5h9rze37yfi3pbqkv9udeegcupukbh2j54e61vu7eqn4gg1tu6vcwnt4a0dfr0upo007pxlqjv7ugmtydvsca1613hf813rbo3sq6q1324n2v68z64id97',
                flowInterfaceName: 'n1opn2w8d9t3kypcjpzpoocpyfhr16n4t97qnm67bzjyksf8xakuc2ucju27gku7r1dg1fg6kot9utu684us05p5wpvq2w40byw47pjghovkb916baii5qskg3s8y9gjvz0pvmp5ojwkdkqbskfvv58gowu2gsf4',
                flowInterfaceNamespace: 'xv29yvky3zp4uzlx5z15trlwsz4pve0k9gbwprqgc1dypuhmeg16rk17xeo5z4tkdeiycogtq927z2zgzop72eod1nzibb4hvzpwg7sjisaq3so756b406bj4ro2k2b5u77xg7cfp4xd3j5fklxjzgztd1p0dack',
                version: 'ybpyt7y2526sa1glc9k9',
                adapterType: 'vwtcyc008o5fpzltcl3ozwykhxn11361fdbti8da17gxzr9d1c2rzmrsf7gc',
                direction: 'RECEIVER',
                transportProtocol: 'hf76imkc18gkj5rgib3gsioq05h6vvl35gaeiqowbp4i4w7ninfvp0zk3gk0',
                messageProtocol: 's5j2kbminklbrhf6lvkdinima7a1li4czi3foxkfgx28dhvhp41m82oz9y2x',
                adapterEngineName: 'r3vbmxyujsx8lsh976s66089rjdj7m67pdi4571axqvpnb1xyfx3ni3380k94seiu1il3p3c262q795192erbr0a5d690c3dieggozvzepbt81g5tlkl4jn93h3izdxsg06ob25mc9tpw1cy9a6rtqb59ehu1n5b',
                url: 'lvcw9uvck5j7ytmueusij0w4niqjivxpu46xw6b0y36jc50is07rgz8mduz42o9tzqjw4kll6s9ba5f5rs9q620q6wm9kl8q92nlu8mpe047nvxjjndc6g070uv1a928p9m9ygw79xc3bz1fl6jnqr2crel3c7qnww1e6i4fm3srynsr3rmlpsyu48y3bx2kdbnthccufgb6nyw4o2x1yzw0sk5rjl5rqk1zn3vn83vnu1gmj3d4jwcb658kgw0f3d4ge9e9mkpjge811a2l7il4fo5gzu0a6ozzl85f8dutkhus3bh2xfiayrit84ox',
                username: 'kgik2sjgraaosrzw80uvb0qd28o1kmvh6vgg1psl8ph7zleh6bt7kv16hd8k',
                remoteHost: 'le6jgnnq70cyo2vqlkqjceq60g2yr80i19ned5uc9umofi98rzvkclouind6rqei4c7n26hfa9cyrelummpj795i76bcjtopqpsaiy97le9yyir3oow43pj09qmtxxna75lyapwq4vjibmt0bnpbobuny80vf3az',
                remotePort: 5625151198,
                directory: 'nltbex19xti5qeyvsxom7jwooi4gyv0ed4g5x6oxgdq32fn3wmmrl3m7xz7ako8jhdnnkx2p5rnjo7wwda6gqze0p1r2lt4k5hcarjixcgpj3c905lryftigmy3lq3h27vawhmh3161uheb5uuwupkddu0oacfyeg47hxn8494yrmuyhui5nriywsf548ygmxa23vmb1gocxscjj4gspxsd9gmxkedae2fqvh0mc7hltycmmax3r2kmy1sg5te6kxyzdg52so55cy2tcu3x13f0lhi1if2y75226lol39mp7katvx3v6jjjdhp2cz0bnpa5awa3a7f4glu7418f7ukccqius6oe5f2xr3fh96nio5u1177et3uppyjwdi4982ezeeow1fdnuq1czpir56o08qazr5kkxfpoxhrtid53b9ygx64tj0i0uu2lf22uavo28kipv7uqq0ge5xi7h1xmvcjtg60rimwpwknwv3v2mop4ig1kl7axibz59smk6xjrm1x4f0fanxz71u8zzi65v4vph6005tkjru3j1wjkoqq5xyc3ufbkt2acmc5cttcsk1hd69mk7d32scgxz64y32dqtb7zxy1u3klcmvru9bnisb7bd86u5jf58bbpqeij3v9c6fjpfliatuowov8e6ujhj4fe2l0ckltcg342bn0wwftbikk2o7ikfd4pbt3dpq5e1c8zdu9mwpr5gsh67w4gdnnac8nozykkszhbrxg9hhnvmhll7swr5iv7w0perqka88kg7lxblr43nffuvokrv307tpzd5s8iinbfcat4lqgnyqz7hy7lr1y9tsa5b0davc32u8ra35t8ux164f4wch1s1haw804nqdg6picpquy7x9h1fhznyer3jdx7vss6rw3zh3e9pc6ptp0psowqs3adbseim24bydd4fb5sfviilmhhd0cilun9dwvqoq0k6jo6fybihl3nhob87plni5o7fejibj43dg4mhpmakf7z6sj22llytr10a',
                fileSchema: 'opy6yseai27vthz9wia7boxjolf17pve5gz1pnwy5ieal5uvh42z0qdzhh5holtv5y0e354d6cwvzi9svdect0u5d1v8sd7tskovg13enyumm6r5az4h4ym1ox9aecvwgr95s45nk6t5797ikbb26jewgcd7dgsqxx9a9wv363p5f0e6thbvae54oc8kbhw4xf6cv8ccnokmga6cqi21r5433qkj9q7xyvh2jvcqwpo5q57qeeipd891yzgppnrj95jk9f1qy7yxuml6acvbnb6t3b65u5wd5cbvnuwv7gyg4qt6jo1c10mhkczvvqaih82uh2fcdcuahzlbndjm6h2aeh19mavwyoe7fxozpocc1p08fuyy5gbr9khzjr4bp8avl5931gam8yoiju6qgfo11bv4dt3fg59bi104vmdympmv5sqn5u8ciabpj8r1b86k3i7o80q8hjlxrvmbd3ovh3g2njb5903l3cje9oair87m3s1fz9za58wu53enu68a56wfj9hqvq9pqlqcd0si2ev6z22omjqlh09ac1qt44qa70kl1yyacxqg3x5ftphqom5h3oecptw24su1jpgnjo0bi7pavit91kgo85c7z9v711my7edopejniu7qxae735crjvzdojotbiy75ikciwpc0tjz7j887vv7eq7dr5x1d9jpzoifxbzejkmc8w7b4oy92ed10p9hiup2fh8a3lev6gxflvbo77rbwjsmnv3yn0xe8lnhngurhusnn32n4u47lemo2v6pv1d2zn5ipcq0bfpqaeoeeajthi1d99252g2wz8ocn8bbl7rmmo582knomgutwz46cj3fvzodntfmu5l1cirr57u2nmy00zt6luzre4w92ruqhz7g7eob8qhghf04tctphlrc30wp4awh76dcimxo2zb8l1tf74112cv68ikv6epefln5duhlzutza50xpsipig89b2w270joqojebtdv2a4dfhqq3qbu0myp3zn9lwulra6r',
                proxyHost: 's69gghvr16f1ic185sm59ctfjvkb8gxzmq5jl3hovz6mpi1dkz798evf9ouk',
                proxyPort: 1129818753,
                destination: 'u0jal1n3r220rqd7wcpjm4vbkbpxm86s6n1ssmg4s62nlv7h8atqgzvaxuq831gyswrk7bmupmwhokpii2rjuvel91uwjmnw0qiutoik35s1ydpi7yfeb7tk9skkdq5ce81gikipvgimvlf6y6icqyr1ur4geeay',
                adapterStatus: null,
                softwareComponentName: '28wmg09g3l60mdgl0h6udib8dsaxrao4mbnvg0h11psach8meotcqnbelc3b4ygxjmaoiqo2ctdj893vph0avtzz3ntz4j8gtcqayqp3wyimkcghimrko0l9snd5zarvpgn8y0nshxkjf62296zkksuz5u6db91b',
                responsibleUserAccountName: 'v8j0v1jwvpnvveebofqn',
                lastChangeUserAccount: '4p28mu7hylvjz0wxmpvg',
                lastChangedAt: '2020-07-29 06:09:49',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '4yu832rsqcj4wiil3vxroyjsid4kgjkmpl0q033r',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'q8nvhlsp16st8uribczq4bfsqn7d1mu8bkd0jnop4p6zklawya',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'gcfdxphdc9obt918qhbf',
                party: 'ffhxib165bxkciuqm02bvgnfns9613eaiv8cak5oagigg6fns91a7350j6vo17nmuh0gi6832nlyze0xtdfbonq2ngc0121l0pu1yab8yyawilkpd7li9wp4aal8ue3kyw0h1o9mxx859tfrfeg7jooa07kmwj55',
                component: 'yxiycswtq21z8hs0tgdeavausu9zzf43y2rz3kyj9vh1653rub3yuyb53av6d2ypm0389gm3r3y48j7y1xinmej1nuxv9bvfuc6gamx3hxsnrqa68hya88r0nloovre48ineecrthm9qdu6i5kkmfkl5lpmncjx4',
                name: '2csi2rhddv1sn7qbjxuda613c3b6euta033kz2xu3avee9e6uvcxuwttm4bv1n2t6ynefhgnvhk7v1a4q4oivrwarjlkg71slpzkl0se4chxj9nk2krlv0nob6v5nh1qs4b2jy45evyo221i6xqiqoo224119nio',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'v5emb0ywgbn1p9cz0pa740okp0x2lmzccbjsubjflfpvb8oio3gcw4speqi96u2oh3hzq9uy5fuc8c56c0loudsydbepwtlfzhzecx3melxvk62zts4vhbdhm5axa3uejnuiunfdfabp2blateqizuuu59is1sht',
                flowComponent: 'wpj04gb7vn6dtlov6fxsdxa4u7z2ktktli3hibwyljnxjrxyja92j4r2cgjpe6qylnfnpfkl3bemczxh7tlu5xqhqrkc0pzwiqw88zim3h8kz0kc3swsgr6peiud7koj80hetmhdmmipepp1qawdhftrj48r6o31',
                flowInterfaceName: 'f2pgb0cpao77ugnj5xnmsbv8emybe88ni1ci7drdxgslzm1fww68felhs2vhkiz8n7gsphzqo5ywniinxi4ppvtaxdc2j1w0ybh6lmot187k4x03rgfhuu6ng4wjpiftpfqs886urf7qyzqjactuhrrfl394sbh7',
                flowInterfaceNamespace: 'mfayt3n3pdbr5klyx78v3jk647wqlw5cr2nblznqpt1a72914e3ohm5rnxy54bjvb2hdepxetc3aw6u7uzzqkzbcm07e4tnrvpqyu1zifrlolxkjob1wayae9bmah66yunl3ysd89sz7u7ug3sz1y5sn141v90po',
                version: 'qgkmrze6tnkhhi6762iw',
                adapterType: '4atu5fc1c9ygs1hsucz8cqvj1sqpfx1h61qyc56o9u7p0p2myetl2musvo2k',
                direction: 'RECEIVER',
                transportProtocol: 'zhhxge3atwcndcvtw3ctr51mb58iygot85psgwuzumf8t6y9d42602vcvq2b',
                messageProtocol: 'g3amolnxtu52bo2ga9pmp4pqf2v6v99npntg4c5vzyzsrt8yjgfgve1zhona',
                adapterEngineName: 'gxv913nfjvfhzz2clgmq159hbq2mbivyg7b6589fm3cfoyfvddvdxqpsm8of4l2bqy0r28bsn1fd7ty6cifp3p5e3goivyshye3ro8ld55pzylwigem6bc1mt90fblvmj2furxbmm2nxo3vie16h6jeqeypxb2gi',
                url: 'zncyb1ol7nej7yi740xzhkonl5wasug6ywn80xws3d42kmgmo3qfe20wvzjz5zu5br0gnmiwjx3jyi0ve4wknjoh6twiohj51sx6gu3rep14ok2lrjdvn1sxyu4gafgi0m7xgiitrvt0of829hu81hjuimfgbw4ob4kdp6xge61tdi1x5nuzft7669atpqg5ywxdux8vlz4vfl8brwe3owawp1i5abh5p4537xgdai8avrm1epf9cqu4zjrd6ldyuafrtxuihcep1s2s19urlgzibixn2x3r992k20xpv3a38gi6gpvwb074e36nesqo',
                username: 'yukmtkn158l0gwvb6yzicphndoyy8vda10q353pnpkxgtdp32lgq2jhwle2w',
                remoteHost: 'upd17iqgnjv05oq1b11agsws71616e635k2gloilk9cxvnz7rpz833ob76wt6xq9ynwqjnm4xnarygb7b3r5r7wdc6mhbg1rtkuyoqyzh0fw4a2qrly2m12hkixrtm74jj17rk6tizay9twndr19prd0ahk671p6',
                remotePort: 1258192545,
                directory: 'w9n9i4s0hqhv5su2bg1sditw5c9ce6v1wgb00b868re9gqg88qvm7p6xrfddtkdehy5ot17w2z2ux4q897l7kat8iogcotuzxuan8eeob3g583dod5arkivqerqoet9e085l1xup3ejhqxfpcmhlpwilvhg3jsbgw6k4av6xj4x8np74zcpwg87p2syn1neofyci41pu6wymcfq0tce4lfqx1xg2b67otp70c015re8vpr0i866ez8shfiyjndaytkqplb46675j2x50x8uc1yv22t58avcqzo9fo5jx5octsq9z8da69c25ub5qlkxhcn6p9p28uiy1g5vj27km5wdzvxbeweb5xzzhkjopm0bv5c7scu0mfaxr5ekxwxpm9yb9qu7x8kgyjxd0n7gzkwwes7gkb34xe5vdo9syqusl8a99ymo2bcc90tqdvx2f7yk57du9tnupnxn5eebyjj5joku7snal9o888rhxt37stpamh5a67aff0za8j9hdeflq16ckk4m80qhrs976ldrg48dnqdcfpmasmlw7zrk3mz3azo0py4on7nmzm5bajejrhc3bjd2wenzz2vt3jhzdr9rp2x3juo1l1v0rvw1e3c6cfy4eop6duacr3q3etptafk489oedyanpcrmr4y3uy9tcsawn25cw6vjmhpzwhixlql0fla8khgb2dpvzscpch0lxzk06d56ihhc3dde4tdq6f6liw1ws83ckegur9sk4a6y8njjje74cc8jsx860kibnmtnlh1g42ep6m86ijnug8eyiak0gmo2hqg3yatakedoc1f83l7gefs2pcbu09k97qowwj8q0rms3a7ym2wylqg93mtbo1j4lgfz76c9op5gzravmgwpyuiyzddup7tzx0srv3znn0f443vj7lixvhl0tp3r4p21r0i22262oy4abhhjozoizjt9qswpd5p7e5crobypqh5zqvu14l6muc5niwrc79lrbgrc68t59mss3ntz6r42ng9sc',
                fileSchema: 'dg0icms8wk9slrdj4u2w2ynu17xfsjjthi88sgw0opkhzq6hpjpwiwazhk21xas0f0nm0edh1uenil12iz70d74cvmuawx98456z016f4oxvvdxyf7b9sydib13ji60oqysvfetyofnmn4rrdkmfsf0aebq7vfp3h96bkg98b406z0nc7m6yl7gl8jsuoqkfat23sm6ruq0304lu8fmtl8t1cnd6d3xmdbbewlaf1usc38v6depd3ngrk3nuffrs0kueg65ousvdcih8o6uv9k525fkw43cy0fzk4e39y4ug5ybhcyve5wkvkigohiyk1damw3j4rwys1w4lbqkho4nr68o53osx6r8zg7up4g00fvsuqcyuivlmva1tnly6yjweq7nvlnpbcaezxvuem5bzp9pq2g999qceb2dymnka268r9ox74crxtl66c3pyz936gqus8m7kmv90p3mw0620s1kh6gmxtwegt62l04mva5jsgecnaqrecjog5iqs7h63ewcx3ol05otxq4wtkgt1zkgmakvgo5xsul1zsf1vm37361o5olffwso003dt4ey00b4x1ux36zwiyn5n0u3uffw5l258m2qboo0da4pxv3yrf1ju48jphwtr41293bz9parhki0rjv3k4bd6a2xw9mvlxjjn66ax539ynumghzu9z66e0i6dabafskfvgrbox43y8z0l0wnyea8v5j3fg9atzyrhj36y0r5cfu0rufdkjwopuvhnctz0w6jumavl6pytc7kt9ykpqdup6jfi4uogxd633uigevq1pdokl4vlfvvo0z82tbb1arovidfala4dapucx8hucax5m91w42ico1cdyailll4puxib2p9j8qtrnrib20203zylww0gpccykuugh5glxjjg9sqvld58we2l56t9f87w7m2vw8boo128yt15kogoub09pfujfcumhhldy1ntl35y53irxvhh8okvwcxix9zktm3mtl3oo6lgnlrgucbg7khw',
                proxyHost: 'axsmgzodjqrd8901ndkaf6d395am3cnwkgpzsycdae4s4wu3ot69hb4hoxmb',
                proxyPort: 8607945874,
                destination: '591o2xbe4d6pe6s52i08pvyz3lp5zqgulcyslxgxgom6vf8tqoconxnmyex8w3c1nnxgq2kz9kw91k4zrx7hyh5qm95sxqk4josut19zh1k5uy31ue6jddkr5crrp6krhgkx6k83fwejrg9q0w8pw6oshh7n8ain',
                
                softwareComponentName: 'r93qbhzw2guur22bwxii7m5oxmzjfuzi1smdnt50p5zg02wc2lv9ib31dmrm54e7en03kud4cc4a26jfveq2armzkc3n2h35jey0wquyg3z8okzk2yf4agcszpb9jeexll1qs1ktkwsim9739riwizghxk6o1ka0',
                responsibleUserAccountName: 'wqy7e33493f78n1zc01c',
                lastChangeUserAccount: 'w2291kqq03x1l5fi6y42',
                lastChangedAt: '2020-07-29 22:22:46',
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
                id: 'tcm3iavr19t2pr6v5xdmc07e4d632bqnmrteq',
                hash: '3fzgr1k74c0rgsvimmg2q2y99q2666lbm8y6z28y',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'eh7nbgftughpqmoqgc75ds9slq83a7m78lc03tgxhvnkppuwlr',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'o9vgdvdjpurjy1hnjzo8',
                party: 'uabsdv27taw87d0r7qoxuvg7d5cxcx5371wtlvyb23x6spej76lo8x75u4loewgyx368v11zk2cdadsipsd21uodtpi0bdgtx2bmqff3rcy3jx3w3py63kh2im3spegwaulsxdvg615v24ca07fxnco149zi2v7z',
                component: 'qt8lsgbtdan46bykrxrgjw22othfli6gqj7pok1l60w8xyy3ctd8mk8n5cbie1d2cjswvbufn92acy29z135dzzbtpd7zp2i008f6q5gvirvfznbpsjibvrhoateyjti2udlfcxv49xqcf0v0dtq5x7gh4jfsugs',
                name: '2uhcopecrl2hs0e3cnz0f4z1rwt0oexmpb16xgqueivnpmfenwcy15wjr4d6q8uzqi9q7pu09tpl0x8bbym6l0eptltco6fvc5uvbzii85qrk2xted6vq4lf5uloxnit2j6do9yasvlmn2d7k5uudccbvuvb0lkj',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '1n07wcsl8y2zk2xvl826prxqgtzei9g0mc2cnov86ft6sm14o28jbpbjnevw87vqsze1auv2ys2tsuy30moqr4ss0k96coo6vtmy8qlrpkpiqywpyms8wks6p82pcb7nzu49pwpmzkksniw7gyg6toeaydm6siqs',
                flowComponent: 'i6zexll5do9osc8xsgxf1wsz2xh27ljjuqy9qmzrb5x0e7d689v1qdi536m7j2ikero80y6omci25u91wm0ncbwvmwfhmp4usqtjkt9or6uqactqs384lb9wod30a21jglsbfy1q49v6zac18mavkbb1qzf4nkif',
                flowInterfaceName: 'sjkwovq3ehxl7np5y0sjnbu0emknjr8kv4fh823mb0aql2zqp7kuiqo4kyj0d82rnuosi1s0skhg0ktdkd7ei3f6hre5my6y1h6301cbxuu880uug1i523pfhkkshn4kf5fgkgd7mxqqz3k2jn4fdvydxoykp78s',
                flowInterfaceNamespace: 'mbudoodku6p3thukf553em89560298gcggntsqau7l3jc1g7p6eiiv9rrucd57m1tz0iu5hiobi8ohmi2i8yobiu81ik7688xafb2kqa9ye7ivth4uie5phd3kvm2ups9g3fftnhu7bk05r4m1m6hfj6379vbqfy',
                version: 'gsi2z8s74xgrecxmrbpf',
                adapterType: 'x1zok9f9o05qwq4sy63uyj61q42may706brmeaecso3m2iiq20in4ouc4ytj',
                direction: 'RECEIVER',
                transportProtocol: 'jdcv99k9jggkgrjg7cte8kw3n6ilg0bf9axuj2xpjo0oy48zpkluonhcjncz',
                messageProtocol: 'lpmlo5y5zks7h4v3xa4kwtcort7pn22z47rntctxl6zohk4ev74ito10wrja',
                adapterEngineName: 'eq6uvrhvy4mz2r868i6p9j5lbfuvfy3lc86x18p6z4glo7t3xc56ji3u5qmnmg7dplbf4vboickno0jmpxzbqjgczz47hn2of6xrq2je9ar0ga1c1zn33i1hk92e47rmme4j396p084t6amau36clrb4gva06eki',
                url: '7r4egorh3opywk244q3h0y3dg545yualurba8y8y915c1ofon0u9ncqx6q2rwi4s3ndmi846gs64qwneiqtluy6h3s0smtsrz52w6230manvto291aa1itms0w3frwrv8qeug6xl0drebjq4nijex9nyhssstlx8kjdrrumoyhh831k43nenubvmswf8fggjcynexhjjbkj54ixpc839y63iqhyh7vqe5pk9inw75t3uqeav5es5hip3b8omstfcqceotd22aj0t4euvxgneit0bb5hw6wiu2ss01rh5xt1jl4v7m77qzy3lfx4pl849',
                username: '9ylsn9zsfa1lbif1em4ddb0xsyvzksxmwuszn3cgd24w73wr4jnc7i9p3nrn',
                remoteHost: 'lu2h5xr6176gkgkptktty9ftqm0u5z1hp265iuysudri4dy2bh4rnqp4ndhu3zm6w88ifv15vta5t6h0folb3sy874g3rttg1lax0gvhu1vyup8z3h6c01ybcw758mh8gg5u4cbxdla0znn1ubj8z84ucnggyb06',
                remotePort: 1896840088,
                directory: 'pla31yux949gp0whmobax1x577j65ltcthg29uq3mm1kqhkqas26vm1xg6m4q86u9tklgvc2m8cht9tjfx4lp5wvd1vdql2kfydd0zew3zwseg9o3nb90d9h1rpaf93145f3xk0wr42obixxga087jyfrdvkpqf03jcgffa487qhu3aw7dt5hekub86v7qr9tlqy3vzurxag3y4qe3qgdpwtnqvrw6gu1xs3iabj5bm342k228t5w6i8zxls8ay09lo2j41m9m75zndj7mkuhfyxf3nos26yquyw2zzpympkjjmed2ymir18mygcg5pktah33ob0e8xue0nahe5drecayto1q6otr21qqwgwsuds8gg14fok0cna47lujlvfvx61c0dlva10tvke94mog6n82ymyvsmioprk2sq2bbkd7obr7jerg0srr1jp8ujgg8xxvjxfsrx066t9694idzr35lho03xq734az0qlihibeinquc28t2xhvha4o2gdfyg7lg58gxwnkvdkw9h5emb0e7id5hjquhqvnyor0ji3ba1wje5cgrmibbd4ikq2rnmzrnycosvil2h3i7uucqq9doql16qxixg8rjrlvunsg3xi9auyc3yt59o18ibw8pv07ndnh2otg6erot98fwv03odmhriirbg562g3jopo0r3ewzxwmrk4pzuplvy2yzeadmgtvquq4nhpzzt55eavei6k4bn8c30verfzz4mvcxwh5r9kcxmczj06bcoia33ny2pcraken0sudvydpab6a8xby1hthkmw1t06fjl1bzb97ahhks27qyx9f243qtxhxho9u9qmwi9vgbaxkhvzyo3jiwahoeim5p0ua1w5nmkyoxz749rom0fatynup1zqztxbko52nem4qu22jy1ly44qp0i1esb4cedh5g938labvzpqrkd72bwiu5jro32py1i3d1utuhkrrg5n15bq53dwxj82xvagic0joqsqb340qg4t1hm5v3onfqa1',
                fileSchema: '3z1po1xdxq8wlepmc2cp6bg16357gfzqs2jy6rqty5nt7sjo7j8l8f3xwipxnbd7cwimaahx93gbqgn2njgl54odc6vvsu6eq7znx5o9zk7mzhcpsgmngn00lv7q2fzyssa6zhfm3qvhyxu4on3fuymjfuzs29zuvn9pgb58jcrq8fb00casqhhjxagzn0jocngyifknd2jlbkvzwyw1i3vtx93f63zz1gwirp8a8viuzsw21ompbue7k0933cvszned7f7k1jnnt7i0rtj3lzbu9ds4xyvhgb0edu4xl5mhletjvy89k1g1j7e5qcj3s1d359u1g9dqaq9i32a3123ua1nrob79jhuu1vk0l7xqyx0yythgqcsvlrqt7b9btlur50negoyk2uixcy6i99tfdsus245soy7opg4un1q56w3vl8wh28eot4zu3andcxyrm5lb8e79p4pganxkdax3qgguh5av3mgc92rxp3znf46dq1ejvq1d53dpge75w6u3k2a2lo1zmb5ywqamje6byr9siyuega05whyj5w7479w5du21oy2awm4d3309fxf1h3fu5x1hn81u176e7ijw0fblpiexapvppyewh5e13a23uyenyzhvz8lfgkvm01ifahhla0cj8dl717hqi4vov2aaty3p2erboltu5f2f3u56ahz18593h7juzd2nw5aoudc3y0iuspnjf57lh7u641fiwrcp1zdxy577dsc9y9gctndoxjxent349kditq4o3gcignc4522a11wpt34yp9xct6o93jvz3pu66zh2gigltzr7pjpkqkgazzphh559b5m2m59ymnqkebkdi4jph3721vzoini9k4gh5gug198jzdqvt4n3geojnympozey0ywgzqgjkk1rneuc3tvi7feu0343n37abzle3s8pwfbmgv1pa92xfrwn517b2ttzy26sbypjkgopkb4gu0lqjq3g49klcurfx1nujz1npaigywqhm6damxzoib4v',
                proxyHost: '1s54dn11n5vhl8qv9ecefdswxjuia54d9s70tadlr3m1qh2sg1djraxmvh5d',
                proxyPort: 8334001699,
                destination: 'rv7sxmmgm5jjnsht1qkimg3b2b0l8c6q8olzu6gfjux7t8924tu9ssqpro3w2g8clqm1l1vuv6hzhto6npy3hvgwfwwfosqwkupuqnclbjfd2raswimuxt0vzvsvi8sgcbnc5yvo871oa4fdxxl3ct5m4cb1gjyq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm8dtl82whlabasw3m4dj9vk0uc4t6rely8of6d8pcpse26s2v7usaei868qjkbvwnl6lutfl8ayuyyz32zfqsrf7y6nxpl06q1xk9ktvxkdao01zgr0gh0rn0ksh3b18cxenf7w1k28bghncet19tr54a9rikywc',
                responsibleUserAccountName: '1qjgyz7gjrlujalqr2tw',
                lastChangeUserAccount: '7lw2dwrs3vemxib1fjmg',
                lastChangedAt: '2020-07-30 00:55:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '2gxsv0j0g4vig7c72qcnhid1s7ezm4yjd2qerbsd8',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'f20pp82ut5wps3lpic1tx0yclecknivg4qb0jkdsdc0lenglua',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'k06mtbmpfv0ykspnwffj',
                party: 'flduw2gaofqp1jjjcczmddn7gdlxkzs5f78figrst8b5j2byb093gt84ew2f276z6oeyeb30ofknr1dbiqha6vylhvwek0k22qoak4andkfotr2b4cdvh5mryqo2lemnaqz8854ttm52dvu34ps6y90tl58a4qnf',
                component: 'zuvock2udqx6dv989rzvrgmmehibqpngvbjxyu6c385mo0a1n1jcwydq9optzjvv8nv1522sni5secpnv1ug55r0jh8f8z3vv06gs7ek5h7x15crlm02i0lz0co04uq4izkihg80ztz3yqv248usweuovnd88cdj',
                name: '4l64shmi7tsmshyh1xwr9qaqizg405fpfl6mm8d90wcfs1diknyw5w815hi2jf9myscbx6z9qeyk7hjsulu7awo3np7i9281gd3sxmr8m8y4tra6m2cukts9jxxouces25psmvltan4q1lwpf3fp2klet2zikuna',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'uevszhpwh3dshtv69vhxnrjf6qdxwqrej9fpuh90qqitfixmqbn75idrzg7y4yz7qxek6o0pzdz9mnye44q8eo7vxu6suswriiz8zti7qtoo4e18i5x7luyrurypf82ur9loeaquhron1tzidicni0vk2weuf1aq',
                flowComponent: 'hyrfr90phr1drr04k57nw9uu4n3of9oglepg07m643mcv2zhnpxyixwxrp0jgo9lhzlabqxyqltycaglodmfa3zmzwrm4s10kamkzcoyniuj5v8vz0bfmvg4v3xm16sdzkue5f0hhruh8ajtawkob1mbrjdpqt0z',
                flowInterfaceName: 'bw0hula9qbrmhihbh8vv0mez9p0d9xl37cbqwkjrbcoj236wvlowl5qkxfw09k34xhmbvmsgznd73hqkerrd0i7f2j9iw2d05jzh03f6kqbsbsjxij08mzltejo8n91vuq0lvfw46id4wlzjonlhen45q59gjm2y',
                flowInterfaceNamespace: 'esa92r6zldyyjuhvi5cg7bfwwfd1h7buy6sxw1hbvc68fljn4zh9q22mhx536o216eoga4e6lqxgfhxxrvi7vue1e1vyd24el8nllyyygttg4smoudehintlfafr5a2enydrmvg0poaofs7j4t87z78ncjt4fctj',
                version: 'gth3uprrnrgrnj4rdt3n',
                adapterType: 'c4sfi2ujtz70c41gahf7qrtlwt42la5jofzdeetg2fxwki9913vbwnxh0f2y',
                direction: 'RECEIVER',
                transportProtocol: 'kw041l5m5jatte69bbr3uriwa6fs8jkq13mox1uhph2emju5iljf189ph4sj',
                messageProtocol: 'mc1xoxybp1zygj08t3vq21cex7g363163mbpdtxlc5e2e6n0q7uaxlunqzxj',
                adapterEngineName: 'wcocaax45jgl3kuz4uba9oqec0wl5f4sphoupojhy9syccja5jg3ztnu9z0coeqp5tjm6pnjjj04n8kshq00ububjnexnkt907s5kpigwy2vs4116xz0dkfsu0m349yqt7o4g55py8t173af5agqeurpulo6b4wu',
                url: 'znjltmexb2c70hx8e3alfp2ecgsv7nydw9lmaabscyb3l7ooqthafwkmd4620qeolvls0nwpi8go8cnax1ygf15ib9yqb52f280ndt7u3lhls49kjbe0ok803683n37m02mkw5l9d7fzc8xfkjb27jpr31mmb2zr6prr2t44afjczja16pvkkbff1luokxjdk97wcm71xe0gquzr8g5ozkalhopxl3fi3jxfh7s5a6b1msmxzne3yzb8968a4afi2fhx15cg17znsle7iwdnia9wpwohmajlwvsqbh1n6nkr9eqglp1tyih3xo2ey2z2',
                username: 'fm6cis5fhg2u0r78i8qpt47pxn4rl9nn7ai6mr0ayey2xr3le3nuncjvx8ye',
                remoteHost: 'x2bw23iu2zq601jurk31ed0w6een5al8aj1ye41ic4wlbfsvct2knzqxrhyegismlnqrg0mmubsx6dx43fs7tqmtwty24dpty82813qzhhp18f9mps5ilvss7qrv6tzhjykifeib7pgmcri8s9qy19mheroz451i',
                remotePort: 8120309278,
                directory: 'y9gxopn3bf9nf3zldobjnu5thm1acz3c0hlrg5l2pwz0uvjkxxeq3zfq9dc9kojmn69tkvbfw69zojxcmpno30qbm4gqqk1vu2b277ia8aioqmvtuz703muzx9m9y0wg2rgl1c529fbn302fstyflqabfryscr641p0in3fgexep4uyyouwvazt92ilyjble2mch6j26el5hxg87pl5zxm80dvzeqiz0vdqrfbdfyu43i0ym4wuajkxp6tvpffk30mbol70g1t926phs4c6b4w2p4l97yy8x1nfr9rlpx5o8ohzcjcs818of6ze14ziohuwbf0tkj8l59opoo59gf0bsmai9hv2uun6gwoaygr1b3vbenkfm18rycf2bojfcpk6vq1p8ijfkbula4mjrziocazxy86h4rrkkm67wzjjselet1ui1lhwhbsggzq41ytnlq356phdtbh2oegtztet9na8vycwlvzwdrmcwovmppbnh0dar7g92dirtxiqpxufpmvt9pursr0b6a0co9ttgne4s7jfzclsmi1q0qx6w54gqgz943b79uc1n3e8lqbia0rc9y5975bcztzlf96qcy4zr6g8k0qb3lme7z4ndevubatl0tr0w00zu290fhb64ukfo5nr35y4l81qqgfdz6glz5cuz8abo02pf2oxt90ccr707etms6pc12bti6y7fh1y88nhy7cwru43jizf7e20aj96eoh5k0ucfx648waphjf6v7fxiw1hli82rmc8z0zdyfoirjbbt465po30c1n6umn113w13yqtnmnjnv60npm2bud8me5275pqb5mj9zs44ik42mojny0r99ts9uw3sqaxzzfnkus6x6b38qs2k6jzo9qs0be87juif4ymncob4xn747be44bs1qtoew6x7u1t82ttc02jhw5a5031ogpaj1ddwbriveyl620pufmjlvn6v9xohm4jwrnsd0i58lv9f0fahcfr6m64qtj75ej8d10450b4brusn',
                fileSchema: 'z8eig2hzbgmptjnhsp6aazh0c134lfmctj73t2hkl1b57hjyptjumv3gvge28y86tgls5i3g6o62n8j5gerw6rhqvnis997wuip488qjp2gcyb9r0fkcpq9wr5ta42pf2uqp8x26oldyv74o3hiktanmpm8z353z5wv0qqd5ts2uncmmvv0ee6loz03sqmpad29m0siyvibpjqikqa1mhkt07qdf2eyishgxuuxmi0wak2cv6jzgy8037mjtq1pf2m96ufxwowak3juqatkf66q41ihk5ibvelolbpy56p7tonpav2fx5h08zn3vorardmkmxqq19qjkfru7l69n1mcrkcqz56pfwfl04fwfc8la1dzyp991vkqzemonavidptrbiw1avkc8or4akkqchpek8bd89j908z7nv8jwp6p4qr3v3xcpcu86io9566b1j56w0zkbz53dpl7jtmdoyw8mhowsf7m356r74x3itgie3cek0bmcxxtwu7p11z6llin83s58mxhpr6qpvff6wmmqxa84hyn8gh8080r7fehu05l1w6w389qslrr566cvxq80wsxlkrbbccwl8upsjv4vm6228r6szsqh9obodc5nkrl8dcc2h1byhisflflgeqiy0zuhg1z04qqryjeyey8b7ilbaltbbel7j4bd4nv40v4gwa05xody39lyqdhrro905dz416zw2pif9mvzkxyqwl7fkdgticeq6816s1wm3yhncfcz56mkf59ko3azlsy0tyd0x4ioxeuh049f9ws0is257zd4m8pepxiwh72kd60m7zkf3c3b1s5vg6fq7rtt58n8hqueaaxwjnxhwwki3u2e6j81qmdb1s5kfnatrb5q2ono1em7f1uqduswurkyn5269v2pdmlwrt19tlskvm9gxwk0gc8h903ws4brpnbumtqxjqkbitkkl1h1bafmclo5w9vu1rhmluqhvjq8tpn8ee551pd0rhhisjbgmtjbcench7ni8a5ixtmp',
                proxyHost: 'ggommy87x5c6ptxsq04j3vq7p3seoqbcgofmrqkh8szmnh305220o9ifcdig',
                proxyPort: 4130015239,
                destination: '3qkv2hw9t4o8ru3ujlb43jnyfm6xvdphw0kg9cyvu1cy3c2w7c61mtzoy2ja1lqcd0dagj0o59ft1tzge5v97lmhw01xglben1j0vmlhyfcmgphp5hokzebmy7v315p4xou9uh226sbya73d9hk22dr90exb4km0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '322a6jwz955lmteuzpg6zthfvth50baqimbqjyhyiwx2s5qf2zlp6jie53n68yk7mg1zxvt5vhy703t4zc98l225ldbn3mutcczig65eaxkf8tc8o9ppts26fteb3sn14jfphrcx7cgzmic4hd5f13wmp9s8f7qz',
                responsibleUserAccountName: '49zg2di0atkj5cf5x3f9',
                lastChangeUserAccount: 'wjrpkk95kkq9mikbhv3e',
                lastChangedAt: '2020-07-29 20:01:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '0gxkvduat9u85hbpbk65nvammk88jwignn0pum9i',
                tenantId: 'y9keibvw2wanydvb4des8x35n9e5cx7ixtq1s',
                tenantCode: 'fekrngn10ktq1e1u9u13285pgidg5pwsjhqj8dvr969clwu1s2',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '5cd94mut2d9afg654ahz',
                party: 'xy7s227qouvf5hdvkw8fhfjiape712fqefu7yanie05evtozmhq4833bwbx9yfa346cudnjrr9a8xwkuronoeptx2jym0varoj7bbv3v5oi9yi5g04sek5yaev4q6afelp8vi8wjl4h23raee6u3y5hee0uqc8p4',
                component: '2w8vnkh3bhfsazdd8g5qz4n8vew5j8xdybzpufroovt190odnmu23i9y6z27gjpie0qar2hbm8udnmxleg02064drirckg1x8afs7x714kk4e1bnmdqfnpt00v47oi8xz9e7j075wdqer62ixx0d3cwv849i3ez6',
                name: 'g6vd0it64htse0rtjxt99qtojgwzzn7c0vv0t1rdlpjwsiouoca2pqjlzictgs7u7508zcdohds8a8k2zti12b0q5b0xjsaw500x1826pr0g7lpfelhacib1c4915byqlgjin4ygwbvgqts08mf9y0rjn87yuach',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'z2ikkjysfpwqifcrnqb1r7dj9zjlbf0uz8e0jcrt6kttxfy17kv5zxfgs1rl34rzl471udeg1pzmpbn3ni09a5x65uam2wz6sr4psi98te6nu0569pcjm2jlcyhtaocyz9x4ef3pbk4yppdcv8c8eqw2z8sf7ryy',
                flowComponent: 'n0y975tsz9xlntn6iczrafx6potvmxecm4bjk11ymu8t926vzaefc9fi406bmdunltm9uizeuks0e8d2zb5v6d5f6x8xj1fz85a2icz2ykxz3sklv2c1zc51e1csyqba2abyxeohtxu6lt9w5o2acn94lct9bj7j',
                flowInterfaceName: 'cutm1mk1me1j0r11gpqc63yc6zbosp7h98bewzxett4hk7p0ag750nnzvsm8vyy9iogsvuyupuksc3kiid6yce7jsn1jowk8zfgyzbd5j65bjxieh7yt5ymqrbokbo4s2qlcydb7ttyccywlat61wseki8hoybad',
                flowInterfaceNamespace: 'jkt41vqs9p9rqkmnbvh1wf3fou046imw8jaqpdtvj4ykwkeduk825lhpa49pb9mnw9h6udyh7srttgdmo2mtqrwgf31ia9fy1mtng2nq97umubqozfaaht17h6bgweact3dxa1wt04hseomtxu0ndffhre7hgien',
                version: '7n6mvhuasgvrfii0pbsx',
                adapterType: 'z7qkioayabznd3jjvhgtjdtt4q7b2mbvnnk80nob60ma18stocfsgl2z9cex',
                direction: 'SENDER',
                transportProtocol: '0i5ryk2hdr74hn5xbgt4n1y60ne8cwlriina33gdw8fef8h05gr7pxspwhu3',
                messageProtocol: 'a8ur7srwh4ks82zipb5eikadwxn8vys18z9qcwcfu29j0tvytbmysl4q7rvs',
                adapterEngineName: '09kv58b6xgyre90privuemsmr371eq940u5kz4ipebi6mwiga7e9lvoifvawynbr72024ro7yldu3o6qybsrhe0vupxlqiuj16k7x46uq1aawqjykydlgrcvg7nvk8wt65n7nuib3208psdjcsw5u7wwqbk4nce0',
                url: '0giu1gq1hismmzx7cnjzypjtjopdnb7imcswo50z8cd0lubqk36pui72n5jublqbqn7z37n0kuphskod9w3eopgwyq5q8zuhyysv9eji5gliqxubrmq3liat3mytz78qnkrmph5y23hiy1et2s5ggbiwerfuq08pprmie0ywjateqfp8m5srskzvklq6z571h4j4xs33u07e6qdht3r1s3wluf4faw2nsoo3mthj6cprzvpzlg9dicrpj23e9pc7163a5cvpdzgxxdwovf6yk6jc863cidsabdh44l4aulpo6knjad8310b9lrd5bn3c',
                username: 'wej33wr688gn1qyhi090sqzibuk7646zsuv8m1peiqhwsqbvmwg4ytl8eeq2',
                remoteHost: 'rkvord06qh1wmwb6ioc6g32jon0ly3i2lf4ql91sg8nc45xtppndeqvfsxqihj34td3j7kb1b643bsvhmnevjrrdsslk9ax4qnmzoify1633ggjho3pqpu6gn9qbi2f1gj85t38wq244qbsqiy9gvb06jitjtipm',
                remotePort: 1022595960,
                directory: '3yp7de7pvqtb0u9dq5bzt0injk4j8eb2huglvzi679a402yojyyh5xdi7io2k8mlknb5tgxnb97mx5uiij04m80n44zffms4jpdkpvl1e090566186md45vm57iis639urwtinmugfm2x8aisv4di5kh5w7h931j5g6zh7palrek0vo5mdj7xiu5fei6sq4lv628jnkr2cgaxdtqbaesppt4q6gqu7s96ttl8yvkewrrxsvp7y8gd8qyohsw44u4xc8kety57jocngt6y2hisfqao5ttiy03ihwruq4jwz25ydhryw5artmj2raft1ealgf8wo1k908spbizhnd43zmtpnorq43i20n6d74tzb5c7ojzft6r9y1q3ghzl0wcqoa76ufftopu8zleh44fazfi0gi9w8sz1p9zag4q8srvvc1vjpx2ag2h19qvq0ah9xfyfbfx0dd9jy3e4qd8cpj3xztws9d3nntqz7rxhrs6yo6tsy0j5bg3447cwcekey8wf8llb3kamn9iwo0pg0jigxlfynr9nigf1v0o835fkwojxtcfvqsoa78vware09uyiz2htowupwfk3kyrxafmsd9s5fs7t9dqcysnp4piw88dqbry4i9zol9ea5a9rne947dws80a3yglxogcrdn8tz3jhk8zmfafbvs4i64u5ab0gni65fk1vl17ljnxj4yjpmneb5gn4lt3otp334wgvaty48501gcwpj4tdy2ho8x5ut0dg37zatk9nzerrqwb7wvht5llndpb9ev7e4frt7b3cegvzrru7sx4btenbex6xypkzbvs0lvdqebraa6v2n5w731shy90v57fhdmz7grpiepyxx69oeqddavjoityvwpr0wu9wk6pmp13gd0k2c3m3xdvy4ax2o36a6veecgi4q37qea9xqeabi2sd6os11uj0wgoz2o5hk6sgxgeulvh7engyqxc3itg5twxdt3tycxx998rn40q9wm2f872f9y5qirw0lan8fid',
                fileSchema: 'j5zsivdm9o16yfd7kdgqupz0ao2scgof6zau7h699tllvjeanzbatpqyzm693xavgjs6vl4x0tm9gdmfnupsp8n4oq0fthh5zhrtl8058n3g3flm0h2j7la3j2mw57minoga68qfi8n85dzi75so0nis8h66hpv3t8vi9wofu5ico8p3tlw31qy0348pxrx05r2pn97p891fu1qbfllynb784h6g1bkaurrbyedx98uyszrat22b8a6rgcvdurj6yhf9xv9anq11wowpykxg3dt1ig5n7o3hi42qs17ux87xy2vrm4jsd0q5usgeeuzr8swcm7o9cv58stm0ghdh9c2op0a6hkpcdmw6zn5pucih1zj8le6keczcnj1rvsuu6k1dk7lqbdawqeb3squkjq1dep33vvwxolkcr3iifi523fygjqoqb4a365y1mx808zitjm9ztkoswdbqo335fg7a9socsil1y91scw8pp4x3nr52ks8ork73cund2h29wewtrpcsu7q0kbshxlobgpiwpesi7iv4rmc1wriybwmpjba6m9jahfhlh8nu334xyxrs5ibf5r6mvl11l438i3op1yirru8fq4odxslquuewbxrskha7i13e98jdidwczr1rut1ed6ykszr0z48tkjab296ufh6idh8j5jzqifwoz0izjre6igp0q3o54ubz9b2ejdkpkbqbgapo0y2m4yprlrvai1y39fzs1klvwgd9imkpzd00sc6bmbkoupkjjgjmrmrm2h2vsmkvbq0htztbj2qhopb185v71a509okf410rkejjg17y85td4t5yj9pwke4uqwirrcgfk4fg6v1t5rrd3lnsj0a47m4zo19afhn94upz4msqi8wzma4naf3m7y5o4ah0eavwkfhyuzli19khlyajr5c1vhzv9mdd1af5sg832b3ragqtkpbn3knv2ktw9edfo2chmhdg8cony4osg0kwz1s0s28251smmkq26onlgrk0253ud6ku',
                proxyHost: 'mg7lut8ylzzbdizl973jprdf2wk6hqx5t58gcg4ur593gvplwsxfc66ebk5a',
                proxyPort: 6847769723,
                destination: 'gdneawg4h32t1eprce8vs8pqxdg6rotmp46kcx3gzhtm8gnhsujyutnzqdqs55ok073kq5ctvnpmyg8c858bt4rk2oeis7n8evjvza8bod1jm3ki4jm1ox53gcp4jbdsa00q1sd3lfxh78bwws69nuxguyehoriq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yz5l5af06ahaa0jfibekcpt9orm0mn9ei2y6vz5w4ik3i6tfpfj294ipht87po24avzj03ggyzbnbeak166uvaqj0f7v6dlst814ziet4rjcgvhjdmmmh3jpc4r952nve0dlzywrewi3862umur8xnlr8gobw85j',
                responsibleUserAccountName: 'yfobn4gtrf8go5p2z0lg',
                lastChangeUserAccount: '4e6eoueq3gw8afjq8cfq',
                lastChangedAt: '2020-07-29 17:46:20',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '6w8yijw0fvj8c8u6gqzkvd2yqd50or0i57druaol',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'w49gt8nw11ea1w7zfafy0fzwwkuybivbxr66394bbuzkl89dwr',
                systemId: 'ggclp5tw6w05u6lh81gejuyql1aep258lyyyu',
                systemName: '730lz6yku7x4ibaxx5o0',
                party: 'lseydqd526geobeai1pnp9a1i1wrjqpa0a0vezvdy0dqyxrgaty0oxk0g7b3dd50xnbjhf8gwd12t5cmz4o1cvogjedfxmjpeide68wd9p3k1cedgtqixaodbhkh0k9ytyuwr7qmjfykczlqndzod0mkkbjru9z4',
                component: 'isi2z3wjzjzgx7fnckc97pqonmmmvv3a1t40i8a3xvsu67zf78efecw0m0hb6ibt00qcbawlabon9vos3m5e4dusqlubo1b6glsx3qkgduvvm6id95uo2mwfwadj070t0ryayfv5byqew6r3dv83p8c6r2hokpwx',
                name: 'vgtxupyytj2hzv3v6204bf25ejb315bsl38qolxf8pux8a4yrny6onc5r8vmly9lvwiliwz4u80t2gz7p8bv2jvf1xrtoyj21rr6dkf4ob4y57v3m4rrwpbbanvu3u7gcwq3p7n4d01t7d5l83lvxfbp8vffyfl4',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'q4a45r4yiczqsrg0bw1ewxmy8l361944cn9q1k0tzvnm5aemt6ucxiejwawfalfpl0h0skgz50y59qruc6x1s54jb5o35mnwujyd9huavqry94uc7pnhj1c8fdbb76m738nkj7na37drug4xsxmk3pu4de072r3e',
                flowComponent: '701t7icwc6ddpwqn5213mcdhqvml5kk56wjxfwphed4jbi77doxy9xfdmvvq4jrvp2259438wj4bl4j2dw1y3hrxudujfa6vjvxyggv4o1lilo1nn74qced2t227pqpn91jj4shu1dywwdypnho6jg05vu891oj9',
                flowInterfaceName: 'l2onv395e18zn5qfiwspqq20zi0nbsq6aka6s82da8n33401kesf8x0jg3zmr9g0lcirjh7hh3ng8z6h4y1guewmeevtvp5d9h6hw2vg9av8x1903fm5daoa66mlauvfr0a6jjs79pfcn4q0j804i3u1wlrqr6nx',
                flowInterfaceNamespace: 'pwsmkcs96lu88kpkchkyoyz3j2g2r0v3kf9oxvarvjbayfi61q0hi1mwcu2t10zmnerwsb3m5xfluq14e4f40yaznu5911rn7ge2pfkmioygg9iqtn5wb6xmdh243drbxe5545anqokjepeq3wv90yloc2x3ynya',
                version: '049u0ec5fw18mjb7kgj5',
                adapterType: '75s6nvnmdvu3ayqtyd3yce6e2fm9qhsc8umlhu16jhmtql8m8annqz4zq0wb',
                direction: 'RECEIVER',
                transportProtocol: '43584jcfw02djemw33c68t06kbdupwn8vljx9z3detw7an13b6xhfjq6wn59',
                messageProtocol: '3fsk18bh8f5mjy4ncrhy79qan7tohjpsr5qzwvuh1gwcb4epd3dnfxx2sg21',
                adapterEngineName: 'dzzpfdksy1pgvshzic1r5h1tu16j23z2zmqkx2gd4a6z0sc6o1u1f0ht71bsj4tevv6sidd8grf2cz0iqoapuv4d6keueojhc338pmsm72ox7bgg1olur7vzah80xz2ibxc9ic8lzcuy11ujqtjf8t5psyctv87k',
                url: '5h3bijkhb80nbf7f6gk0nl9g457hymcemc4y5d5skfoy4ck8iz77unm21t768zkn00l5vgiys1xbs3whxak043dzeg99tnu51p16h3nfgyymbq5suim2xuezgw918sjf02pgkvwhvulbghntvhbdliw428pd9bpu0vvpm5ylotn5p9xu7jwvownwybqrftqg2zeut607zkekyvtq6q6tr7prxxwbuycg503c3a2qyior9wk5b5188tlszgs5ohe9dqxk3uy4wg0y3lsvl28q8zte7n67i0hazvm696etyzc3ueis9dpja0rrb7hock9f',
                username: '0vfsl9z1k59qt7mcoer84gxayjc9z6iljcdysoyx5sb28ug7jk1pw3utrlv4',
                remoteHost: '2okv7wneoz8g79bew7izolus4qn2ixxxv7tt5yudz7kxxjlvpxe1zy5kgawag84piwe80moi9oq231oqnv4wrxq68dz94hb0fbpojjwdufoszlcsqvf9nmrns1xq26sx3qvuh3jhycglaim7izgudfb4mo7d9jwv',
                remotePort: 5918102332,
                directory: 'typeukdyfi2hz4y2aavgywzsgzsl718sy4g5xhoe9ii37o8a0ntt4yltlq1exlpjghxo0uzyhzyblq71aoi1820j5t5laeq7mv4i425rithjrnni4ulu5diwykce4xqra9muv49lk71tq9da7v3sls3hvznkl8z984sw33qz86jjfl0s4mbwk8q61waa2lhprhjqepe8rcn78luxukpo0e0i3cor83lt2qcu4qety3zlr211mjeewz05wvkyrnn42fkkbj6ufm2vk6tze2hnpy09ui7i8aj4it1bmqf3cwrtssqv04hur1y8oo8kv0x1sgck468irslbltkx13inqzektcxrrzr1pj9f5ygs1hkvo8nqznu06ej6ibw0hyxhmnfxelrsr2jkyz13e5ojlq8wx16un3y9f2lz6jn83tdshylc51dmnnipcrlpaustk3zcuxkmha1slnpafx25jtwtqiizczuag5uuayysvygx3ianjsq4mp5r8e28l6mk8f7fudssitoygubi21v2hetuy6u62ujken5sq5hwjn0mf473f6p9eiflzcc4flag98pqeluvirsddmggpsxvjh6vrb86dsd49m1ib998p86f8jwo7rlsuvz3cdbmtkyg7hgd3zgbuzy771gsj8q8fq5oea8gk9mwh4pd6mo57auakg6vrdfw1f75wxgx8i4bq92ebivpkllq4ve3oshlgkw5l5p5kkmgq3t0cqkagbjfn89elpbvg0aj8mw0a660rqo13h5f0rildqkf6qvmau0xrw8j6n374ykmgwe1swhitxdn61ueevwz9rqrvglr4xpoz2ppflhxudrzy28he6rw4xywqp07g6vc7h82nmi53zqkxekfy87lbmyj4ewg8apnl9gxi1ie2pn07z0jaoyrfom17yvzydp7lgz8mh3q6b5qcmd5iox51a9vsuxbsrnix0y6k5bkdhww6pwborkd01jrvdnubzgmxvdm51c7a3616ycx6rc9rqjnoxwa',
                fileSchema: 'aeczhtdebaz9wn83ukynf2v5jea5r2xn6avf5eb4gfdbq7rcti7ejri3c2qc3zo6tzs4lbd0k10lh7ck2lddnuu9lxzjw5dor6ab8cx14xz89cuao1zek70ds6uywgfwaspauh7od1a9ftp5b08e557svtzqxo52tkna76eeiegk5g9h4zqgq05c3irq23k6kg5px3rr8lfqolkz8yafk6d9o6s6bf795b9i76xgvwwdoru9x4mo8hbrjd9fg8no1p9au6fn8wdyos8csczqm97o4tnf1plawmmevcrjgv6q0isqape9zbm5bmmmssenzpf31v5ir20dq1dnkdd0apxqhzguj1jc2k79g7cs9qlhc551gq1jpcen99dr30gihlyv6p6f1hypwyvktfgtyzo8s9enfmaak5rx0lbfcdv43a19soetfm4e6fser0doh0m704p8d3baeboyfvujj67f44dce88nqp7wbuaz09hojbgq09cts0b8f847lykg7upuaqk56gj8lei1tb5rpgo375c5f02x7uwb482p9kgh69sqe6hflui4t9q4g6mmskldgt3fqv5rxcr6bud8vzu6e04uk4lfuxu27meszety287soq0sr8u914ralxopkbcfqw03b788j1tz40zdk704n2mmebaw0ez6zzb4dcuzkss58dlarc6unt6kzj3wo73tn1ae3kkblkgbh1hnq92pc2gu11ykenbo9yeyvwg8c067b8c9isgw1mb6pqfvyd95gs12rpkrx01h1jij1cszq7sjo0x9l46sqhulbrlz8jn3njdn171srvhlkfsfoid0ep04w1ok95npra9pw6yuytkdnhv1yi5e6aa9p1chqbp84wctziiom0q900gi7u29myek0m9hwdj7xy8xzdunnx3ckz7vi93vwpgc1h29q0aqxwu3m4wwxy766gdd2g4ap9kz9khykj2qvmyy21vo3bff8in336uq5gw6wxgrg8iir6ab0mshb1yheztb',
                proxyHost: '8l7hardqrex18t9pq45zu0dvt9e0bnqnunbgdfaa7vobnu6mdvzy2966s1ij',
                proxyPort: 3681474579,
                destination: '9logxvtio6aib8ijmj0inueksm5q5g1se508rr47dnv5nw5s65s8d325owwn28wcfg5nlka4v2qmi0k4ko1lr2m9f01tvic3zzqsle1vl51ge5pjjhtweymxho7w3jf1mimhm148svlnybx455sx0fu3o2229r0j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ko12szzhagnz8d7mci5ohnyxd0rlfnnczgifkx5hljghmb5mh7t053pmtbhl0ymequjoi7hcwyqli1w5n03sumh0ia8jqndib4412bzzaxhd8eqbs7lbqknyi62m5fqy8kxsie01duymfcahin5evyslqcikcpap',
                responsibleUserAccountName: '9eov9nix5qsaw7x60e79',
                lastChangeUserAccount: '9eppf6ouyd76yisog8wy',
                lastChangedAt: '2020-07-29 21:57:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'tbozg0h3akukn188lv4bv9dzx21gt4vvzbnc1mg9',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '9kfdeqffvyfvztfqwk4sz73wizsv8r9g77dwszfh97woq86nh4',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'nbhdx01ufjw41xqkfumm',
                party: '6rtha4mghrtczx87z32jnu6alt1vze1hi5q0u6x6bhm3fi8xlipwigogoeush2a3as6x7acy4q19uxb2692sdvk2pm2l3rf124jl8u1kro94qyosznf3s3vipb73auvk366qtpj803sexr6i0emg5b4xrwlvi0wk',
                component: 'fwlzjb2fgbzz6y82sos0bz32dgrdjp4cx9yucskihrykddeacg6u1dksr95nymj75pe9lvn3q08bvd9zrw3z0l9v8ty1nsc6hsfeolfakjytjfpzzyan1fpx78l3jx92auco2oikgxq20e1af8ewqot3m6q2vplv',
                name: 'm521lu6dwq0k2scwfr3mr92ubhxhsbl17at1l4gt0bh4xr5djcic2gkzt6nppjomg4l336eph668fldi453iozooahih1qgl9pi75vsrtaw406moi77c5fiq6mvg2atir6hxbkqw8vqeekpn0y7kmmrd876p4zae',
                flowId: 'v0ai4ho66e80frluc8rg2z08hx2r8a6a9ipzk',
                flowParty: '6d9lboz0hnfhza6iwmegpk5fk8lmtyu1hgxa2elml8eng8jpcpz8hu3nqu67nwgrcdefu4t0fwkx7peyr6tgmw25w0956hpzhdab610249kyoycplzn45wqch6u8hhjv9l9vet0t2yswdxte9hov6skfak0t5otg',
                flowComponent: 'wvj19ae6gvnol421uixi9jffnar17u3kogpqaliwa3ebsvogvhiath91dz78tf1kb4clbpb7z3i461ffdl54y7nz8j8s4u41nfexm7iy7tvj9cqiv1q965u84hz0dmzy4ludrqzvd2xjwaijs5svdkyu1uesd07k',
                flowInterfaceName: 'nipaivapf3dzvy3unrqteepdk7p48xem2p6fm2kxoksbmohwb6rminohp728yt6v6oq72356n799cr285jugf5ki6mep3kd6wd1d1sc9rfmnroultpgborb1nonxk1w9djaesb908kbi5zd6j506135kuoeg19qo',
                flowInterfaceNamespace: 'ud078av7hiwaz4giq0dy5xf1allxk7f4x74lwkipnaf3imoxc61kdgcw7onys3ur8v3knj7k0zgjv68g5a0hz30d0zstaagdqb36t3v214u3jx3eiuo5fuawszhoij5fnyjk07ba0o2py5t26xnbeaip9980uc0o',
                version: '4on8w7mdny2q0idstx6c',
                adapterType: '1f8lpp3uefazj2oa10tjdnpewuiv3xctp0ofe7amwqn1af8u8r2pi3fe6sma',
                direction: 'RECEIVER',
                transportProtocol: 'y0myptop01cgr4fg4xvf81e8dzvve3qcl2toc7rby1yyn5uazobr30f4zohz',
                messageProtocol: 'pivl2vs5bbkagqxhld4uqtl9mpitrlk45rd8x4aqd9ubtighswl534odlasn',
                adapterEngineName: '8amexrt8teusc7ejq9dhw3i1rkfbaobv6k0hdcrx0qhmy6h8hciygkkiflbvthalqkfvo05qyc8zbrxo9z2zd44us86bvnyt238he28opkt8bbx32o3m4315gaipo6t1cky4xbxocv126k6t3jv76lg2miaqpeie',
                url: '52aczp8721ij5uc92z03zkqvmwthavsdr3yupegddbk4bs2tmzxs3b7j4w3h1nky5tm5tuisv53x7239ypkoom6aqm2ia11bxfjv8cfa0nacjyuk9ekp8lpi6y3deem0o6hle7x59d8m0s3nbhsu5yk5rw8g96e9xnhapvarbjdin9yfc0ru770tjc1eda1ap86kijbz0pc9dkn3cm77t86cpzlm2tr6eay979vyf7nj9kc7jl1u8m2uoj2fabmyw4ftq9eoi32yzgvqaguhz45q4lm2hj5xrm71zo2jkmdl06jb7zyn35aojo7eoafg',
                username: 'ianorwq49ho42f21hzpwt5xjegdj7fdv77ikbqyb7r7zo1pbn89tpljvh0ts',
                remoteHost: 's46na8ulsypj0njymqivb4xba88kri7yk7ki7dw0w6cdlsbn34v0dey7hqb6u831965wv7w33508bof52xr7zobo54jqxk4sw0p6fn5gfrgwlin5cl3onqthldnkeylkyd4m5z8kuw5rgs2156xx1h1hli01pkdq',
                remotePort: 2523614744,
                directory: '0wh6pbp64njqy80hqlab09t93km8q0x783iutqwf85thkmgtvfhdb9at4ktr0xxh975wq2b5uh1sxcebigz9l44mf56t6lr1tnafhckyho9sdhaatavciori9qzkpjlrhj04omete187n2kzgis0ei7b76rhb91vvbx3qoya198jv17te0wjtj303y980ere909aju96x7ehp31joexc0pjs6lagm4rptwslcq73u81n234gwsve9lxw0qi0z9ylu4ulrzxrm2hndh5jb7twirebl1znekqqmrwrpykbi7d3if0unzzejslnnvom5alc7tu2w95my840696e0iehx70fjnv9rels1znp3q6qcgsh2ild88g8xolxizuy5wrfnzwn4wczqq4idrl88xhrgytcbia1c9q6wl5jgebo9yw1il3gy82wjdyc64p41pus6yo0tcikobp8wrx7md1kdzdguylsgioebgkxnxl7dr9gs4eb0qnr2fiktm13ccl8dup8jyigmw8ekbci926dbvmjyybgwvk8pjpd990ah0zzwsq895wp0bpl1uhih0axddisib6pn92u57wr1c7ufs7eiwczvo9gk3brwg1eerynaxht0xtr5tebwno6gcvq735co4kk0a1jeg6xv4b3mdokfxp4gsbzrdneb91t1fvwy1q5lgbeqwxvpxnvetr6m6eonyilaizowqm1v6r8jyv648yzs0y41kdrjf26cgvbv59q3l3a4dhmrb3ijr8280vpmso1kztiopa7f1n6rb3brgz3nm3g1dfytuyutcu7yhlli3xj30mfpqbvrzvqu9wzdpzx3b19s83bktb7skjwpga2i4uuqh6cu2l38n5glv2g0g567sn6y1h1f1ul3hrpraob5ypyghr3c3cz7p3offdx8payhoxpv8r24jnx71w6k1kvtoacrxxc4eox7cq7trqad3dw9bscy761yfujnm6xtqxwa80od48g4yb6o79jldr816duadqidy8q',
                fileSchema: 'tbg4s5ftfgcvi5y7airaa97zds6dkkenopq87sp7wpw7nfyl2fhnu9xa4r35onfyg9qozhbro2gv2t1gncanzgcov8ksxntngj4cdkjo2y6xh04088w90313xxjitp3azm0peasom5xkgsuix1iz1ehowoztfp8hye86bcfwullmoejiuvj5f0nqweqah2yxiz2xx03ahwyab9q4ghfube3oxfl7nsgjky5by6hickd39szaiiwk33q9khcljkw9cdmmg9a8nszi37rn1re3ve4ah5r582dr5b112c12thdnj7nw5jo7ou4o5357pnapt635ylolhyh5nhx0l5xwdrca1igw3zd1pqaod7uavlwu189xi8mwr2az3dl7m51pthl86u30s7vnvmmzop2o9q50ocdkfuhgf1xvdzmv276bifotbcrtsjfrkpnp15i325128mc3ykaikgqljvhbw13xiymzman4vx6iik120g9ioihitji40mc4ebvcnzdolvtis066kd1mdpck33wx2x0swifs1ryk901mon116fz2kemgd6wmf4j23tr23fw4mdum51x096207toqh2g5vfylcwzdv28opxhb3ryd7096wz7wz37gaxikohm5usdz1vulcukcs1tw9q716v6jgt2nkenwq2bfd6u9w7845w45u5zzaapxkz22rh6joecvbb9bt8uktsbzf2vqsnbvnj79u6253x6da5w5bpu4ytbdon1b5tug2kcnwbbkeidxsnl8kuktjq07jpgtvhuai0568sseewnh4lklapa2qkpy40sqctd9pukcntmzqz9jbg32dz4t2fxy6xopbcj7o2hzp40l2pm24f7jndlovlx4c42nvqa2s4j49anfxwm7wh5mm7bw80cu6rpmgggrty1xe33hvdsnv8ec25ve1puau1ooupfyiozy8unvbgo5kfcf6cejncy6ny892h96kqszkcdlg76p4n64nmkebluuz41u1ecoyb8b8o0puxay',
                proxyHost: 'rcmwx787xe6a80c2s8bjvyi2kymuzntgvksq8270v0gn64doyzxwtxkyr1s6',
                proxyPort: 5885300060,
                destination: '0e0ob347wn85qs8zomsigf7e2xjb5upuzfvuca460wdsrzeiz1l60797ykymytz93zc3v2yvf6hp0qdn4699b404fr4y9nllcj3fkaalygvqwiqh6b51ifnq3m862d4y8qx19s9ncxqz7nuceqwkierfd9chxlxi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gagbrre7g9wx64yz2a2yq7j20lt2xz1rnh2hlkgfzqfrcbimf2hb3dqghozns3y53egpqg92p3crd2lbqqea1mm14mkclub5gpk9a2shj4k0o5zdk4oty4jrpa1s8nyc433dhkx1gz1cv8kj42ncdil86tn9ero5',
                responsibleUserAccountName: 'htsta24dx3nug8ru8bz5',
                lastChangeUserAccount: 'ddb6deksddpjqfrbrk3d',
                lastChangedAt: '2020-07-29 09:43:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '3qb6nfan19h4h898xdhcar2yktjc6p318adde2cd',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'mzdgup49c5rr4axwpn63x0ijc7wvsu33drhb5ds5msha8fh4yn9',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'tqkusuwqsauug8o810wd',
                party: '9lumgbltrccetzxd2bl8bja68lnw1bzt7n04m2ibtp824g20izbyujkbd9ufx7du4940jjwisk43pomjicja5y38f7y70q1sulwgtbixl9i0dmlt1hxzkr6la96ts2q5iouywlyuxftjwhne364ba891a2yrwgd1',
                component: '2nvmwqn1p728nn54jv3zlo7du23396ezk1x13gsrll5rf73tbrzqq47rit8nmxw394w5yn7d0vkk9t6xcqjmkjsebk9cz9l0ho19vleh08oh1n56itaokhzlg0us2ry95h3jvebia0i1nkzliytlz431wutetw9d',
                name: 'bmjh0b5umrmwa2yc6lzhvlhswy64xk429g7iak64zohmu9us9o2509a87yfjkyuqpvpswqg1siop7o4w3m90tvy07vmlbkfce4cs9neksyyexbwwb3xylzlusbkktk11pera0m9b6hyp84xj6t6r4qkuvpqdadup',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'zrgmyilnlexmeyazptdmvhf2plxoowlr14awgbvfwrysildeonj1ck1dugz3bb13i5ok5sm2bkmeh0pa5rptz6fesj6ivkpb2nflzr260l92ep6l11q72ew6zvyqbhwdhj0y7753b4eui7j3vutduo1k547dxnb6',
                flowComponent: 'h720sdifmobt6xekyh36bq1ivd4xymucbwgh8wolp466h0nspboy49i71wzhutbihcihns6p2ctbe5dabo7s8o0xz4mp21ms6lgyuvp6wrxwt89j20dkrrxdyub05b37h66ybf29jkx5kyeivlsevzjo1etiegof',
                flowInterfaceName: '3latyqim5fan516skeax66qvff2ss8c0vd3xbzesi2bsnovfnjf5jzfvx1ateucu3px0677ie6nosfv4v62v6zg2qm0d52av1lthij0spc6lyy6u8oxrvjtrqfl4myagmly15vqlzvwao7820lq4tqijxbqvclel',
                flowInterfaceNamespace: 'cyksexjtwwi7f09jchu9chzk1ibazjqya76ua8j2rndz9tun9nj5jxra9jqqs3kdcbnvbflltlrnzzrq0f42ch4my03rdxqrykbzudz59ikrbur2hojvrxvezs0k6a5f3oowsx5ar5utzqkgq9o6ky4fefg1cz4v',
                version: 'pe2ennbl43i121nmt2ki',
                adapterType: 'ozswwp8kz1pfh6jwzgqanmitz3bll5rlnzodeud2bxfx977w13tf097bghr1',
                direction: 'RECEIVER',
                transportProtocol: 'r1vzpujyzgrdmer86cpx7fqxivxrq10mg5waxmvij5ja9z4968l6o7ixfdij',
                messageProtocol: '973l1ln37iogq7r0zgyru3q9srytw09hoia2g014f7efphbkecvmgfuom464',
                adapterEngineName: 'gjhjfak8j9qtahukrym3xvu60s6nqjwthamvlla1ajc57cphmophqp7obqug37pjesm2b5e6evidq05jltcxqbjeret6doy4g2xcqzxt4pho7lqfr52h5pnuajasivrik0nyzkrz4514pm6c3b4or8kiiezwuvif',
                url: '9o07twhkydecy6hkhsdbcrmj0doduw2lzekekzn9u9x8zn09acvf33675x94f9mhpsm27o5t2c2ja7t4rkrsj8ooe7xwhhlpm0074kkrht1vknrwhjm1ccdajt2rrvjwrxqesf3mgd0eldl1e6l91kpavgv0eyqbo29qmyxh8reyphz1hq78n3g0mr8q21zn1vebwhv7j4nht3maa9yyk25elddyogtvblbr2ziothckuugldnj4mwe5ri8i1d2salspgiqzgs13ngsnux2kwbbfmgsik4wyv3kpsb5astf6e2phbqdzy2cyurffahf2',
                username: 'yogc5jdtntqp9js46wxbw28txukuk4itvlinlenfd5hlstutixsy2c7o9y3e',
                remoteHost: 'pshbq1bgesyojqyxcpw1mz68g03qgmrfv1489le50zke7w40a7fe4ujnu80ycmsuo1ijcdne4goldfy10ul7nor78tng4mbihgmdwx0av8nbxyeq9598ktonoswde4ww85cz7dcknrylwjz0heilx5r9l2ut8r55',
                remotePort: 5040559010,
                directory: 'q1xas678kyyyc0mw9ce3gojhdl1782eedjtrm2zkthmqyjyvq0ek56wc34iakg20snf3qr2ykh2p2d3z2v1a9d0ap1yf9q9f4c0i2cuamlz74f8al9618i6jmrn5zs2cc8b8xa3to97unqf5ztgqjk30aup1ynwzwqfux3ba5fdxxzwlf3u74di85wwpwrxyazakydd3yx9h1lmw819idk3v4xibw35dhcwhxkikaakfydjke1a8c63ez2fisxzeimjz24efav20j7oevag35cbn8sqcjlh904ocrlu64b4tnhdr2ut8t3a3naaddvx40jw18vk07wsdcxdb49zj2h86raegp66a85ntoxjxueka0gux0lzyy6uipl4c9vh2rxej9c8jk47slnxhjscuttw7bctxg923r2l2kl32i4tvbblzz97hcrxxp2b497ji1hhn8a6yzqd8si8f1b03pygojv66lm4tj8epfin4y9t5epdrp88jtpv2b2mu1oh8oo9vagsei3scbxt0nzmxr3ucl6rgo4n9m1s8hsn7ynxxr9guenzk0y7g7eyuvrb24cl0j856fdqn97e25vshtznsabcsrfvjm7yqpa1ohr07zzf7ld8ej5oyk1a85uhxp7rgxpapjdfqvtucvkq24uafhk45vp54uaiuq7z6dbzhjiccf0ydehbcmwobutns1myp3v9x42fq39kvr9213baurzcn460gz6fnokhu4n5h17mdab38qgkddyaeoipskjek4gs400bcdo3axbtovgbbzt589d1pglwaw5y4131ajj0smxvlr4f0dji84nzgjwrst6xzblnz2iww5mskqp7w0k5cl5w8wt7p2ri6uosry4s4rbpwla701rq87gy7amlfdhxgddq97us531xjxzoqwnx6uoa6a5w27s0ucfggpqz57a26fuyrrsgezjlh5gnhkz0254pf5h9z051a3v7vb1y11dbh2efk0tg90hpj79t6srk5gnvltt37uhj8',
                fileSchema: 'xli6bo841idxuryuvaqulcqflzsujmkq8ek35r1ulmidfo2w6ofrz098c1cdos3j75evuw1d60zi3tms7itlpm7rgq2tcwb47952i3rt79g5yfqspdx4b2ymm21a1ly7mfxke7d6u30ppguiio7awk1ddwp12vxk5mtqhfn5kn9lof5kjiy302apgj1k6x3tei3zkll3hzce4te4zqmhv2pzddp9xhmyqkdbx1zqlnttfdhrdwa5gt1gldkq7n3q48wb63ahfcy6v0656oyf6lqc9wi36nkmjvo4vwz8op0psfi6k727hm77l6d6l4lhawxn1i9uskae5gsxkau1mfc3d4cqyg2qcalm7uqk31tvb3xh7geffwr2ebwv6e04yxo6zhmbtm59v1b63y0y1vgf6156lxihyasgqyiewgn2zam9mw3jfc7n7ftcssu3e5hjvx6ijgbrkkatvd5tlrfqp3dzau3kklert74gys9vc1ijs045k1qa5fffwlp3qhv2o44ckp157fqjtythvcibcui2phc0tkl337h0kvqibzoktud7qljqtqoykk9scq77qjnh4mc4u3azjtevshc2bmkdq7ha2ksvn63xvsb46ly8lwt27tco89y9klgaokrcbhh4n17tfjvlx6lt5zqpxoh9jhdiwat6yvj0mt0rgbjeo1m6qb5cd55jymytwj2vsp5u5zgn2nrcv39xeya5w319v76st7dv5ja8ao7r31zd59ljd6hsytww4nrklttxtljspfk8rjmvvx2r3nbe6mn24hzj4b62es6ol5x4jtb64499jj45xn2892jf6y4qd8zqeqtpz9voy97hqyt75bcfpek8u1iw685ruqbkm2uugjpypifovlaw1kmynsq3bid1d4dn3pmokyfugarp7skxfb77oki3otpaminiic8d27ua24btc5lsl69qjmz6z7cxl3yaclzl8h4djoztmc7es3xyshzsug2ljxashf9wks5h49xjf21bmwcl',
                proxyHost: 'mxhw7pnmce85vdein75eddyt5bv5mniz2sld68pcmdaks3xhex24sjkby74j',
                proxyPort: 6406029426,
                destination: 'cyynwj3u9f2csgmioy2niihro9gj1gqbc9xhmn1ojxkzlmf424rp20amx0lex22tdl0n1jgsopshzjbpf4nssrwn93v0xccbpdml98na5srfb79b7aeqmv0af1223aoaf2n723spmefgggcwvsckz68vihflyi2s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c2xrm4rb3fp4sbrrellto3g4ncemklt0zsvv5aw06odjo93gzahptnj4v96oya8l6oyg0yd4ykvif39m8kizlhb3wzmx6ftb5u82gslolf23ten6mgcl8fa6kh336rvg7kgdxr7e4cdxlrwdz5dq6q8qtt44zedw',
                responsibleUserAccountName: 'vdoc6rchuy7mvz6qkucb',
                lastChangeUserAccount: 'zo8874sjmjslijbs7fkp',
                lastChangedAt: '2020-07-29 10:52:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'wh6wuo17s7in53h44ms4ilx3d4ckeuqy8rbh8rja',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '1771zfw1tvri7z4iov0swfuksuoxx52qrck0mlhm0kvrc5oqk5',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 't5d14d1287h3e38ddie5u',
                party: 'ga1t5eqpxiwhm5iprtmbo9fhfbzzjpg2w26qqo7xrz86t4y1k2rwqneeuloq0evj0ikqmttz6s7ln1ohao25iinjil0fou1v2v97h6yh8bel7ofdzq54kae3rpnox0uuh3asdfzhc6npi0f6l1o0fbbq22ygqh5y',
                component: '1ynqwzfj8iha0jhxhtg2x2fk4f3b1o0uug98r0j37edfav3ir9j1pzjek4mr69be9f5fidjpqo52ahj50cd6zfut5okckh4kl3z1rznn7src6nqbxlhblcf4eahgikmm1jsk4c693ppk9vtadmzqqmj6ktxqffcn',
                name: '93evw6okz45e3in67ww6zmlpjy8t20hjx3sp1b8xj77t5z1ssaatlzce1vvr57kiasavgtwy5jl7v4t5h7o8bf6mw0nc0rvxmbqk63nrl8e724n14a8z771zktj0r6rwx8nl3d0aha5bx7bluaowses5tr5oxgmw',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'm7wq093nl60yjrxfzlcfd3hsrjiru5hukkoglukt7900altaz39kg84u2vtauxrcu1iqbv7miodsafebk8u17oxgtgmcrgjhusafcndi6s7vwvuis3z9rr47vf45mfdwh8zgehkgp30nkzfkbnpr8edmepbh71dn',
                flowComponent: '6ahl9gm2gwdrm5b18zlgx94ug03fexjuca7gl2icgvlqeynvpekshom9it4g3vh0uql56qghq3e5naunscuuttg2wjhzvhhncuzl2wdh1y6z0dl4m8owrqi8ne2695xb2erm8dijv4w4jgkegrnobmozvvdiqkfc',
                flowInterfaceName: 'e5hq4y0whm0jha08f14zxdphfmgkbdlu6gxuzv90zbu4e688i6j9vdz0r2n9s3otgkjc4j679jx25v48vqhixhncrjyuiw6ljzta2c2u2cwi9zy2z7robyjcatpwc2arev6n3a375gu0zc3q84l7qzvnvlp7ff64',
                flowInterfaceNamespace: 'rdgwi4qb1fk0suku597ghjw1wadb324yhgfjoavbhcpfzlcgq4op00qy4t0gg2qsw7gh6kg7kzh7d3xy3332kg1o7foa54o681i1rg6jhvfu42j9c8znaamx6rhz4qj2a534bdvcj5rwozwgona04jgvfays115t',
                version: 'w87hnj3oxgtu2akueiha',
                adapterType: 'n40efutot0p0mqaywdxuon35mphxi83tlt9hrqgxqy2ny2q7h0a3nolag71c',
                direction: 'RECEIVER',
                transportProtocol: 'jztl586euz2rf9b8umy4es4acrn65gs5anpek8cozw89yivevj9zqmn5hlbm',
                messageProtocol: 'ezav7tco68z0wge96t7c9bmyiz6pbccifhlyme95qblrwehja0bpx56y8v0g',
                adapterEngineName: 'ol1p9b8z534724sytmvld46u89rtpil0502h7016mg4ynt1o1xw1u2nl6d4ocfp5usndu6ovepyso76kbybh3en86gzi50oe4xw14mltfoadgf1bkblk763ugg5ieg1nabjdi4uij5bflwpya1ebw8m2y7s4fjoq',
                url: 'km3imfn6lw2m8iywo72rc5s3i2qpkehmyvl7pzq7rksmly3eyouwzp8azwxwvsppfefhx9xbvrelv9s0mw3k21m2adtghtrt37carumi7uunur2ydzj8kw7uag3emugblv12wd5j8vizpf8v10284bliv42mqf8ue56gz647j3e8nea94xytl1u4c7ucq5b4q9l0omrqpgymdtdkao7hi5ejd9m56gqzyfn7l1dn2vpysmewwhpkt5ljy1c2q1h7c5ptof2fllcmry1957oekecytfkrur55p4km94o39hf7qyctz88otyayk640gnhy',
                username: 'pgehtb9ojzx5tpled100d211gunc10y6d73xsxiaoiftm8cl3w8uawe3x9y1',
                remoteHost: 'p5kr2mu3w01q3ordbqokof208ybhoayf29atgd55lncdgpiwpqkuktcbtjzw5zo9gfa0hg0dt07f02ku55nslkgrb0b8puzsbp6art2tymiij06o08p7echbb1fukezrayqj4rgxnh1t6zvajq05ldx9c5kf4bh1',
                remotePort: 3337001242,
                directory: 'gseryktprlo9xuhwwrdfrzhtgpq14uddlzv5kyajaawlyhe5zu9lwyxjdt2rww0q15psubxl971ey9ffmnqo7o8x3xwjjxxacnfi3ntclfy917bqtj9mqxk84s7vm4e9kkg6en9fixircovp23via2w5foe5lsq4gmtdnv6z1xumqm9pa7xorfxv1h208f7pktxywmsfq79assot7k3jnkyc57bpd3jqsj29mlpdvvq0ydhs0gk8jcet23tcnue9cclmuljlzcoolicidhuce5tmpgeq9wyf5lj6omn2fpd90wnzknhcfbcpziwgw1th0chzckrf2e1wavmeyro2cyweazzrq2q2hssf55xaah1bkdt1ofwrrc18g1l4td34e5e7oh75lm5eytzxig3x4mn5k778fred68zg4xixe0ceg4bj6c1lrvskgi644vddqjdb1546ys09mksveh82l4y88f6f4iapuqud614pcd5iigwmc29hdc12khcoohdbk6612b9epkytpgtqcpyjeixknf99drc7nys1c7vyr3v793gpupbpwnd5eg96okm9185x5cadfdzni2u94y95zo52icgrmkbc506f77vxwttold98o6a58j5uvrnb9kassdfeynym80chkjtb8ppwma1v3vlcff8dicg13tz5lwqo45mw4w4kb58x85knacula4si8j3z502kyo0mw2xwyzst4d1ru2ik6fb25h1rd4knaukfyp638ywqmll9adndw8wjfgmh76t2ivcnn0b1bvwe6phypc1s47ciqes1m3guyjpwx0o32qe7qerssqyzb5yuq28pmum4tedf90b85ux7a3ui37nc7ztpcyklr1jpjf6ujcqbpv00oe25al7f1c55ray7ph7s91twvvzuibc7jwlk3w86l3rxv9ti99zz0omkzrn4bkysnj1mjqfdldoc5uifwb9mcaq3wvgc9t2711w0er6puafiexyo8dsxtve7u55nb1oyoh5l7x8r',
                fileSchema: '4djwczg7o02ylwhy16f9bvau4fm85psk0852skhzvdga7yrhb54bzeek35rtu60ok8m1ziaqthuv6p1il7zx2c9oszhzh23lnnjpvyx6n0l43h3qbdfe19xrvsihmjs8nk18uacshqh9scaegehjfqsccf0apgrsfh7qrm9hbfri3ajbgfvg8ss21yix6i9daybn55mbgj3esteunn2m3wnhc8afb5hzvs21dg6jlctvgm0benuv1qq9blvrey2vqoyiis4w4l8rquoia9ts9u9rdvgjg34jur50vu8t00iu0tc4gkwjyaipsus12mw81e1qr6ysww3h210pwsjt9jfj7f6omy82zo668dpyh6tl51bncckukn16ye0mr1216u9ph9729e4h8mtya8v61allk309vbg56c8r99ipefexo6oyoxotthsvrsz5m6qf4yn0t3gqirs867fz1mz34ksznnnqvmb4iniq606wd6zoencbqtcz70aev77584kqv0xwr00w6exzv6ll6e1phvipr2tnd6t33njvg8ge2xwgdkj69fugb0su7l9ehkqc902bf9fzu0jspwsisoorvwa64f4qzwsnl6wuhwkik21emt1mv9wtnoykb4mew5k77nnhmtvdqxhz7nha7xa8bmx85nc60i747ypg9suklnihdaq12nkxoawzpnpvqcxnc0xx2k6079a02qv7yx21xui17k3juvuy948tx2cjoew1ofnxr22d6qq61z52ph0ssfsstjwo05o5zahxaxz78yiq5bdd5731opmyyv8kz7b4r738x75bfo01cpy3xifh5vkm5g73q35i6ocqpku1pce4unoa2ztzi32ymi7fkwhzxplun9oelmyt0nq2kog72ur524yzzw8ippaml6jdujl6njmddxcweb5f9i2corkleojqxh8vio63q4arjzuyv65lm24nkf42sd8ojum2zlalu75wvip03wmc2jgb2kwi91sra201yeangd6xug12',
                proxyHost: 'up45m6u9me578caxl0u68yo5qak5qik2xe5w1srnviad6gqqv4kohsqhquys',
                proxyPort: 3716151526,
                destination: '3v012uc8akquqtzid344fvlea8v8yw8dxel905oyvf8qo5sy64dmymmzhawjdbtapoomj2yjqlmq3duicts93o6o0cmxbymi6401un0lkmar7vc9rf9lgypqahrs6h8ab06o0i7o2633gwb0ew09aw1dvj6q8stu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pks1tib1vh49mjxnehrsnzhem4bk58j4az644ju8c0a8jblcrdtzg812h1nby9eyarkiqq85iuxsnd8d0wym30hse9vb85we6wdtqvh4m09hq3anap85zkp572wuqed2rnebud8ujii6z6h948w9ug4snwxky4bm',
                responsibleUserAccountName: 'iawotgdlvm7wj7rp1ab7',
                lastChangeUserAccount: 'fdxgs3trngcn2s28fe68',
                lastChangedAt: '2020-07-29 23:58:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'az6yjtjso0bsrsun74gqwgm327rruv9ons2yc8d6',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'k0ytn0pgymwke0uu7zdswgh5h3eosk0qz87kpg6r09e76q8x1d',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'dc1am1nneu4zlmc0bidj',
                party: '4ik711ujw09p87axpg7ff90kc2vjczfqe8v9eykz8xqjzdwcfga9t34hojcn9gey84x6yj2yjfs5rretc1l7fj7mo3drgc00xefl6n0poxakcds6049o2aezke127qlmgcg6e6tfphcdnpfsyx6le3uoi4kwq581x',
                component: 'amu8javsx1n1pmto9crcmfowxweylr3qskxwt3s6m2ah60jbqxk4i410veercgoqp4ygfzy7vl6ae1825z3aijeydsd4v0al39abyjthpe48afuzzbq0yqmk06ctcfotwefo7ndihljjid9fgpj1582s56dpqnfq',
                name: 'uwq1ykn15lpsxpevcdntwbjwbqbwrir7g6hjyfj428gkakunbky1zrcnvs5w6wqavpjcyvud6j3ed04qffjn92c8i643sg2cq3kixs6pr4b1373ptgsfbmblpcu1w1enp9knuuvor6y7qmq2yutqj853er7m062c',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'rw5xw7fyqzwvfiq5ne5x0zmj8aqa5o4vs4q0pljuyot2gm6nxryhpc60s3jhoqd4vhl8ehd727ecc5zeudo2rfe4jkor1ugkot2q4xx1ny20g6nl2bs3nyq9is38iiorbb1k1doepbgf9kx2nrug1jfeeln9kabo',
                flowComponent: 'n9c3p868t4ehi3sggm4mns5h06tu29suyyxtzxmg1u5a9qr2uhxkqpze4uvsjgggqd1j2f73gw7liq4y7nqwrhka7u82zclrcuvve9q7jezkeam0k988j56uv1vw7gglrzsjmyopc7cjv63il0ar23zjo4mqx7sx',
                flowInterfaceName: 'csw6o0k7ttch0trm71cxaq1k713nxq3l2kqfk5rr3kne6zifqvujge2xfgzq28zym1oavcoqgul6uuqfu278o6jd4miskkv6qk2ne5p3om748tn8mqwo4pjcjb5l0hoq4kqcxqvnf5ko5g50eig1kf1z9yhum089',
                flowInterfaceNamespace: 'dpirf95aezl1ftgszy4hlf7gib4h0ty3h7x7jsv96709rk3cq0zahlyt8wfi3uktma07skcjwa5lcz5wq4thzr4jd2kmxlpfnrzei2iy8bh4dkyl1sp5ta9lktuju6kta61h440j0wjsu8ach1eu3seyw38ttk0t',
                version: '1x1wfng4lbv3czpadq76',
                adapterType: '899eerzvg9x8r3cgb1htct98j7vv8w215234xix7yrngpmxg1fqokp9gzhka',
                direction: 'SENDER',
                transportProtocol: 'upd17kf3i8sujlbx9w5w6ku6dfhkxykncvgcodhbc9vjqprz79zjumu4cvcm',
                messageProtocol: 'q6fw9apm4kdcrd32qba4ca9rwn3xe1yb2qk3w1gpr82cxjuzlos2cu48y0kw',
                adapterEngineName: '09tg0bbpl66fz9rmztal8jiylokkydr2kuvkt3alnbvkzs61s0vnm5370brkyg4uqcant4uaadgyjh7nzbtxr0hnv2am9h6szbikl2r3mq10pk25cf58llnt55yzhuh6z9p82y24a1f7bv7a2e1uti3kyk59sqll',
                url: 'zk9zr9l7umyo4917j5bsy8xa00kq7d45h2h6qnvuhdphgppdjsqsz1p07nknk9fh5ef9antve58mx6ul6swv2u8w0fgmpygiobxvyr1du1liscgr7n19107kn90leg1sdtdwq47d9dckf2itvahfomut04e989mccnq99phfzolcsahd6itf8e47y5zz79jfqfjv8y4w5lnx6vvz50g1lkhvdrzpgs65cv9elsd62jhe4t6buue83l99z2wrpq3wa5oabalzm99reulf2y4iwwumdwunr1ur24dhe9qacq8dl3ojabqmpcziqmkb5fam',
                username: '32pligeb8u9izbs8601xr8l807pvuk49fc13fkqvgpl1zb9oshghbfi7dn08',
                remoteHost: '4vthhdm7p3ytd8q7cuz7lj4u9ugbcubtonrrac0gte0rhrufeawzipq13bfhs7am7kue22lbrspkcd373nh89jy9pwv7cvj1afh85tz0fygl5fi29goju5lv26mqjukfn9xb13hx1xmqah98o4noqz260mhb0s9f',
                remotePort: 4822338163,
                directory: 'vogtoke2z1s0q3od6cz0li6b8trabhjb211hil5046oi3hqj3vky7grljwp0b1b9z7euaqc9el929yuzzfyhqu0ro4gl18t8qk114ph1z6t98z5kwmzkey9fvumjbwa4e503po4cy3fzlvqwnn1kppa2ruv5ful2brx16gq0zvyj3sqwipxu12csdzdq2mlizm2x7r5x0iw4l6b0pzmwosbpuctt6rr0xhqvcvur28u31x51ftfkcjkghoxcwjb4imfdou1y6311dv6xl6a2ykjhmw05psnh6vrdiibb2yaty8u47q7gwbjmzhyeuxrjg7ffvjtrkqqs0fat3zmjgwh1espipmtks47ka83puctmet4if8d8vq760glbrl6fip9efuv1mjf1tz35j01c1j8i60ib8dlrz899pxwfgesd3rn1ajtq9kcg34hgg1mgbyfr78kf8urwq9c25f5y55l5xqzn58wdsnwxqqsthbq4enimtli3l86f5sqe5jgpcvup89plkkhhfz8xjoq6l1ycz4gvsigsp7ea46bi5qtikm8hf6zw0diak36qi49s1omlb73k7hjrzfj1kvv6ovxh1ccc192wamncom8t45wxm04b71xb9a98ojca57tcyzuwco3o5bg1zvwjhaqbttzm4fsaa0tapmssoknuf3sezzpmttyz959inq0xngjnftzvhcis632h5wuw3faed8f80za9gk3xqcw9ihqp88tgclmghtkwowtc9c7aaxb2kvmgvtmnlmtpyt4zb456x6a61ghsmd7ztbfblsl7s56nyhslivsgh9zxauwc5m1emn2clgkmhkpwh76xniiaivurlzfx0vqfa0zzfgqyampyif3hbov2hx9wr1hshbw7qkmwv7e3o5fbyqr4fflzvbdabgukcs1hcdm2kecbdzdse0ke4bxc3w2tp8bwqpo1hkxbg0w2wyxffr71tpwqcoas4laivl6o2xyf9dy8ra3o94te2o4exowncyxu0sls',
                fileSchema: 'iw8er6ocxqmhnwocwvsikc9lqv7sffhgqe5ya32tw5xfvqfc2kt0psnj6vg74upbxjm31d4sx93zvnaewfkm9vhi6sfsxhhau4q70etdyfd9cyj8zsqn765mggmkd0y5trkh66zek6yfpy2ksm2poh6yj0a7egv6tu74ew2io3y0js3cumbf6oxw497ubhxb0cszdhozhz21zaa4sqbhvta6bppq6l1gbortwx7usv4l3p7x9zvh91pw3ie6pl7nv3zdc2sz0w5vl5ewcopfucuut8sww67a6ihtrh0x73aszr01gv2ef4tot86ks18kv7mp2h36qsh25vun61xuy69blpo5ed7b9uqfvfg4hetns4gnrp3610nhnwth0cs59qsns0mjw2sk63sp3y6e1mgj7npsx12f9mjler419846010jia26jdej9t2avjewxk6nm0sm9unk6pyaove0ba5ddnql23j34u4g7c87sok1ez62j2gr8x1m7i8olgwraw1aic5rhhua6kfyr110hyhil6quyx1nlfq060i33b0u4rlejfvuu3fqxbuspd1niyezujv3zqxd8rkzb8pb9ouqxtsovbaxcwa4hqwarp0m1ukqj9gyhzsilon53adv0puwneekkm3gzs9qszm3cppmdgo2efc9xhnmrjposw4deoyjab2mf0rdhebdrvdrabz3jux96g8d71emakcy5obzh6somzb61e2dhfe363i86qmug7urm4j2suz7t6yrxytco9xum8w0twwvnvwkikk5x72d8fcr3m02rf2j2ez7ejl4im5g3onr6wu69crfwdewdd8vuj7mcme0761ipz69f32u8mwtt3b1ln632w0c7q0re70kfcpjgkdk9lcr0njlzl4cx695nvamjsme7ty6ravscvzu5p4yzlcbgnk87gwwjv0j0d52opi8w040iomqenhsy7d9ndozbbdc5gr9xfwubw7sphrutz9oiuixg4f1u3wogmdkqvlrnoqu',
                proxyHost: 'mug2vsd9e1uvc4z15lnxgwosm2mw5ui9fohomuooqxlxj6qym7rtm0cpr327',
                proxyPort: 4143389372,
                destination: 'u79s7657v473hiishsi5qgu8mf16vse63uccdkjqbqir2hnecylq9v43v81mqh3alb4f14gi8e6502of1c63cbxj1yhtmpx0xtcwbpcue6u5qtm5g7vesoqdbe2zxt24i3418x9daeolrryman5tl367d6ua4gfq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7l3j50nfam0f4e1gxszad9faphb6rhf1kjiny2b44phm945qvkrdsbm6kx52eob0sdxvsjw7v3h0xjt7gp01ywzddezyg4ujare98ohpl8vs2y72e0dkpw7jimutj8nlgvj851093m7n8jffa3yx97yftkmskk7i',
                responsibleUserAccountName: 'yvpyu3q7juvg2oj0p8bi',
                lastChangeUserAccount: 'xcjyx180ux7ge0pxwvc3',
                lastChangedAt: '2020-07-29 02:34:05',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'wf236yw2m49acgxsv78fcrwiwayng3aolcj7xout',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'hfyfy7pp7ickig8ti8kz4frmlk1eict7a58n7ym1k5o9gpltkq',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'h53vet72zrnngidged0v',
                party: 'x5cdk6nvozb0tohufn773jf5or7zzlcu6omf0mkh43dabo3jnxkd1ikmdjfswoqnojo85tsiyw2atuaqfgtfxl9czzj8wgrpvqvjo5px6c7vb98wi6smq5ptg8l0if52peckydmzy3denq41rzuiknh2udicivvv',
                component: 'lqj0fh2041zbnx2gaps3qowwz1dipx0en6ctbqvvrkraksjecjqodkyt8pq3gyuuxw573i8l21phn2cdjql2a9rahwxmxj1d0inmjxsvbn25f3vh0umf8afz2c9ipg7l5qtoug18nxb6er8sb0ztngedgn6263yzl',
                name: 'th9dcmhwnd8f26ogwfhev7am8dxcxr6l0ytxp1fcacmedrm59oepxbyvnjwhiiboxwv93a1up14wgyqcv91db3msh0iq8fzhky9fh4086npm1rczj537f7o6ylb9viqszkgv8gqjtbkpabvw3mtujtf6y6b8ibyz',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'jj3ev811ek1wcl66b88zwlxr2br2qsebew91n7vyblwl5rlggprtk6ftga2g38tfzrwig4othmdlpiny65nj72e544asfoc7gazgdlpbx9u1r95zoylqgkzpnvxpmwdgh5hjd3rckep2oqs0g3p41e12rmn4uw00',
                flowComponent: 'hfs9dq7f7s6rlqvwe07ycoro8sw5nvfz2fvf33wvjcn6jxomcvkpjo624nepfmkbej7ti1phw7ps8u8vv1f5eyq7li1w0buh30ligf8k7xt9ralfpxlbmilou2akkke6pvpiyhtv1opbq7do0zeag9clyf9ylxpg',
                flowInterfaceName: 'ih1xawtkrsnf2tj06ujlt67f7msnjkfr15j513lhd42896462av85f69vufyh4dkr5dsmviaxwfe2n2p1ghkjw4idvufq1fp98eo320f17otvhbzvmzzipmn29wxwezyexebay38jkq8brg1gx4ghy3yxbv8a6gk',
                flowInterfaceNamespace: 'vgdt3xozolpnmtd5abvje3lej64gm0yu7kiaqy4mhha8ry1hmds7u6ugth6thg72etqyts2p0tnpw52rx3bhi6ioyr7cjwdoul1dv8m99qpxem8ljb4you7rnog1krxovmlhzcgmzga475ad61o7poyw9i7ac2gn',
                version: 'ojvscg199a34mykqhpl7',
                adapterType: '0jk8nyjt1dmj7cbpj6c0xqrcnlgsgig7iv28pqc6omeblvblspm7v26o1hp9',
                direction: 'SENDER',
                transportProtocol: 'fwo1dx74q0b22kigw54dmk10tv8kdz6r4i7n0hd4m0pcvhgqu3u6q2z8kbpl',
                messageProtocol: '2c0edwrw4hnguuaqedugwlfomq5fomrmyi63o4g0e8urj3hz49x6vkkmmway',
                adapterEngineName: 'ucs1w8ifl31litsqpmjmxw1sztlxkqt0m0lv5w3efsxkddf3lqhf33m2uc6hlz37gjxr3obggch56orh553yuxnzz0kdh8n4j4ddo9ojm0ojop83dyksuaeqqlusi63oi5joyv0ftqq1cp71ealrjypxttyzitkq',
                url: 'aqmtaxk7zm2fp3ulb9v0qicfrxu50ouddk7fkyh44bexw5i18d5mepyxmyvdlp9cepc8elazwz0f0o3z53p75g3t43kjvkks8r13bkirndbua7g9lmzr84mrxha5teiiuhrz06d99rqxv9vkx0wjd0848qpnpsqaujlydyr2yjb341mpd5haa5c698j5ird7jggmzm0wz5ze1xbo2izpmvmgb0umq49brkjpy3oj0togaxmt7it19xz8hv8hv5vedgyksrnyp5pxuuvrltk0rb12ze9tyamxwq85eu31fw3ujruyyizo4g2an8kmk298',
                username: 'x03nxn6fa8y3rg16t0n3e232e65gox7uc0tuf30ylk96a3xt7hlcdlrqh2fh',
                remoteHost: 'a9dzh2i23k42itp3hgop7t7cntxe5ns87tye8meuigeffs0j1akzh7dk24yuf5qcjrc1hr5i8272kzeynosrfjx77jaqs8qwaya901skunorlxg9gfqdzt1gpy1fqbh1zqulwsh61c16oh1por3pjbjn83y9d8zg',
                remotePort: 3824027951,
                directory: 'ilv5ec0lc42zw8imjs6tu0r4niuuwxpatnbyus1yfaifxn5ljctkffuu8e3402pjno2em2hvve5kazjaksn6ut58p5omuyj2yn5mu3stsagukmqngu31je5hfmumf6dwiaejlei8jhwtua9gl8l710dmgljf3z2me4pbajv37nahcdmbb7vm00bsks3w3fpjbqvgazu74qocqk524mufbz3lh3x6yf5uzw58aek019ck0fcbw5a83863mxhuz0g72qoz7o9armdk5ot6dlebsn7lh1vqvwfb74geinejic2vk3dl7a1aegemt803ianj7n2ptax3a7n1jkz6iomb7snjqmdm52k1muepbky9tftxst7xo0ijzfqmpxzlcvivz9016xku924ahubowmuloosoxtpldgi3mzf1jk1otzanrqugmq15x9lutdthdfvxltwevytfsoyq62mdny1rbqoy242tv8fiek2rbmfqk3ezvxcdm3a7hmyu1rzv7zpr0avayoplhga38ox7g0f17ghwbnph3690mq1yg72qc2m9etuqwxwdpdcmrg7ynp5oihgyf553l31h79135ewgk1f5q8lb5x618zk97wb92n13x9e1bsr9ysisciehqrwk35on4pjxqbxeg8q2d1ekyp36sznfp51apcaabkr489jmoywi6g1gprjt76aquzluwad0hxj5z5qg385hewti4xcdt0uitgnt2g2q9vwdvjrxinmbw02wnh7h663t0uecuc865yth2idf428r46nvmdttbw4b6kvvw1t3tjrg1zh8jftgbf5ei063izjytrrnww126qp9jai3d0xd2vyrah6uk1ckl6ktfpk1qw62k6y828wyzhqgrlza3cj8ua6xwsaktu6xbs5k8hu4325a8kgr0ded0pqe4n5bevksdjla1ooett60xxi2lefctzojswa4onimjcgfw0wi5egwd9hravuq07i5xkabzgt5almg2k99jtzo6dhpqiejm1hm',
                fileSchema: 'sx03eindszm4xub4p9v6pxu0syde8y9niiih8exajcksf27fb6xnvq4glp56n53sd4jpbbf5v26vonp0egdsk5t2b8zt7sjv4lbvto5bx3w1qs77coetwbdw7kdikaxe3okyr53eh90js81j4k22h92wmslr1j84zuvmp4k3r9475oatx2y1zepslp98qg77c05p16szegebqifscp1dffkzxso6oaei0d57gw19ezjzc0mseheke8fd5xw9r7ejoaovnvt2gv4y1x5epyah34ic5h1w0ghg7pnzqp49aeg1t4z3qdkrdxcx05in6235bnh1641fi99imeq9osvz59okcy3ix8fhyviz8txwx03bp237uaqanqgtigncfbagimc54mo3iecx1omvtq2tgiigl2jbyahvt62o2q8bpbl8gfb1z2jb51tac0xhps5gqsnxusqr4vfrdlvuzal3qz46tkgbrs2a5qos6yoic2nw9mhssa4k3qa02gmfeys154dwk6zol7d6ndzdgzl20f0n5g6hczp9aez5y4sklj2zo7m1l9qly15fa0pp5i1gak4zis857m71bqdwx997i1vqhrtg55n1kbxt4rb41p2hxb4wtwfpbx6hkjh9l007rm0yhx9wldfqkge0l1rdgo34bss2hlo6e5hhx13xck28a2hpmv0ep69k05qes8kzo05dvlkx66cguv03mh2ydowi9fvb7i9zt85wgne8kdjivl9nnqcjblw3syz9hg96bx4ts2t3vlgoxrbnixkblxput7ds5skvoods462mi07x14go7ubt62poziyy1bth0xyk2vw453c6cfuxunjevjjj39dh3ga3sd4508clki1rc08ajtvrggur2q5b1v72vz9sta5om3cfe4t10r31sk7ivpnv4ko0quwak1grnaq6igw7dnxiezhzmii0kv7w5tusv1ivxm00fofe8515ejp4yjn24edn3blmp3v6s1b43nmt4r79jadsjvelovis',
                proxyHost: '58ec9stq5xz5so7kskjlfmqrxim58knzmt44d1rrmp7i7eb4qe541ba2sra4',
                proxyPort: 4399388338,
                destination: 'zh1hn96enovuklpnifb2a6ltyvgx8l2k4vhr52nrdifas6lvn87ppzmiko9plson9jm7gs0bdsgic73ajjdco3xv03ix84heuff7lpftvsowz5jwuduuj9rnh5h6qgarn9mgm59evaddx1b8k9654mxssm0we4hx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yv4l7psm6obtd5mf8kg34r8za4wbnmebcao6lv0apa5k9xe3rprj5g9kam83v1ek0y401yg6o7zysq79tj2cr292gtaaa0qcpnhz7dhek7aix7se09xidxq5om4sfrv27ejovmzm97lyebvkp1kviyplmpy6phrf',
                responsibleUserAccountName: 'x6okn0qqxxnl9dyxdn8h',
                lastChangeUserAccount: 'lpdjy621tvaonc3ccesz',
                lastChangedAt: '2020-07-29 02:02:32',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'l6y6lkgr3jtv4jer1bm6rofro8ji557wgtqfcx4t',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'howmnd9vzukos5sn1yxwgf95agpuqjmvach8pemvpzi21suhlg',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '0xx2ggd5z2k8gtbvtte1',
                party: '3oc6kiuy32iqtvg29w8yk9mn3sk9oakdf4h5e2g92gqjolahb5vu6w4iu56i9u5y3u35f93jablxq6rot68luqsp3le8tn7j64jii9l1tvhnung1yj13jm9tp1t00rrogjveatrwv7fkdc5n3g6n5ubi8lvwxesp',
                component: 'v98qv2nuom613v1o6oaplt2d7xj8f7k056empi9obw8hnqe5qj199ughfggbwl64reehoqqn2u0gvctsvmur34347ta8nk28bql654njqjm38cwef4deqrovqt1ef7gg050j2p9ys78b08c66yghz8frs9sho95w',
                name: 'yhhkqbcwh45gt6tkt72wq3lzfgqajtlmubkngxnm4um4dvky9beezw8qvq5qkosn4lo13bizd3df8ez0qkg0jgdql57lhntzqi07adxz5zlit8j9mg7t4y5m9z02yslikfdsk8j9pms1fr941w885tjwa2rrppq96',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '6zeqonb7hywasfibyzzhalgz148rozr962u7b7x64ct45dw12jhsuw05qzux70fzzx85w5euqms4757jpaz2gh4ruo4pq4gj5epp0l086cgjcifv1legu9yvy3t2etebskpktue5cz6cngdyw92nn3f5sj4ts4ms',
                flowComponent: 'rx4x5qd6t0p79rlcdxl4rgoer3mbuitaatrcqw77lhnqaslput6jxdo769uxk2fhz6ii4tpfxj13w8g4wm1xrmsxrekjkfxu5c67vmdi4aqs1l43mq9qv5gt87g6xbpbp30km34uad1rouve7izzfcxhrfzym9kf',
                flowInterfaceName: '184tc8yheg2ryopa9606rvyyjf8tbw9ljwb0y161xqjz71jc4ter8fsv1m15k8s0akbro46it9yla9h7k4pcf63sxzco741qdny0kj2xkmzyzgp0zuvwnisl400lpktjfl1ihy9org6kem2d6lfv12t30z7n525y',
                flowInterfaceNamespace: 'uin3miocr2fs57kcaofzojeg7x77dftp6paa2kgj5kr4qwxnii2c0pcm43z1bkn9hm0h396v5vny1vdgm4yej71e9owtn59hvjkf9r5q915rs4bj3sysaz0iowspjzvrrpr84g5s0x7uiukb2c1xesvpqr6wfha9',
                version: 'mosb5vs169c666cjkz9y',
                adapterType: 'st9hnuc9264af8mh6z4eseae445dy93ckofij4c90xpjwq1m5qn37b50gffk',
                direction: 'SENDER',
                transportProtocol: '1hs3l65j2aozr2j5scn5g15yh5qp7z067j35ylubf7oqkn7b33dlprkz3phv',
                messageProtocol: 'n0dm30l0yfa1s8q6vob4jr8v9j9b03ebsg3lgbk3v1zoaym9l2c03tqij5co',
                adapterEngineName: '5y3bggrrks5bklffij4fs46a09s2xjvan3vorqfbdlzbbub7hje8w78yqwwue0geyvccugo3kj5a7h15mmcmclpef9oohxbg25xcgf5xvrci4fl25he6r14ajffdvnger34lql0d58b681scrk32icwapcwlswxn',
                url: 'hprfpz1eu3oib30g28y9xjptm6i34k9gdptmcqdujraymw50wwna5gn2co4ln0i2q9gov4bycx1ou4nk9saj8i85kf3qkagpk1ic8l7qzu12tjep9xn1m1d8i5290r3ukfxwzkg85utzsgmecdbkpfmwpceoz8zhyd6puu5n6yu8uohyzs97w7n5gz3lg5jku96agnvrwkz30s372etgevv11cew5avdwwcfbj4l8fvpr6ux5mmyeh68mw7ojjr9laqkelow3qzadwvlrn2o9k3y1wv9b1rsq8wigq50hm16a83puls1tei3swmiieu5',
                username: 'v08753m5uc6gwz87f86lb56ze8mfu4pz2l5b515eduhahu6e3haeiuoyy31h',
                remoteHost: '323jf9weo5b5wd30vmsk0qth3dv135lzghok5564jbs6jmem2mq2th38jas3yea5yfktey9l5ujgd2fb0i54l60v26kphml1y8kq85mz0gkrdjik96h2hk6lowuyazg00kww29f85pig8htdz62lwn5fqqizwqso',
                remotePort: 5747181450,
                directory: '3p2brkup0s2rvp4j774se12w8uwtjkqlni4wr7zeyeog2hqlbshkmpgcirxckcudr51y6ixw5vpopzv7j8uv7d78ysjzcdc1ljonwu212n4vumog7i7g7a4y4jx4jtdl2s02daxi9t5fexnqwv03iyjow2wymdxtexff7bo0dd1ay02pn5mf81w4uy5yju1ofzdqtbc21ikcrxghi5zy7l8ldllzxx1gu5k1uj3btfv4devfqbcvy1pdqvgrlmrl79265d6zajkgj99bkipbwozb48fmohyh3i04pjtk67m7rxz35v78quuulfj7m6u9f3yw9agjjokb7tujdn1xdn9r2zrk4fukyanai6cmj3offh8u5b4ek5elihla7qeupvexrq58amhl4tlnz14l9f4740rqg7qni16ja2tli7wnd9buol4hl9e7v6zd2ax9rci1p8eoyr88w3ujywamcrdep4qu1cc5gxl4ljkdaxlipxaqgqrbi0mwbstmpheywepw5pep85p1de9ejq55d57q9pghd7tqjnoxt2aqykecwu32volu3kcjpoi3mosgmdd64zrs7fshj7zulx7imtv8509fl2u7b4mrip13ps19dvdj3jon1oa6dn00sfljlbh23wqczmlyvs351ip5meee0tpqwu6b37knt5mnpoojpm63cxpcyjf5qij4xzys9xft18ejfait5m8jxu6if7xom8mmpuen3oco9gjbaz0g3t88tc4pcjw2tv8w65mt07eb08yzxh9l1js9pat6vhvaqg80acf89elo3ot87adlh71r17dh31c6zfepcpkdwxz7i99cegjgn99d8edlvrvk2henh4tmb4vaq7b5tnwha7ywc33hvs6o5s73rho6sua62j1ftk2sizq5qa0r2hq4zazg32d0dc4gk4qd4hcrv5d1b9jyjj5tt8sd0v6lla7oom2ay08qrirtj8z46ojd46uzq1lhayfzhnm5wrweassjbz1rcqiubu0i9x80',
                fileSchema: 'zosq0xe95kxhiwmyipkdd9ia75cu0s4wh51ia08j87r5hut8gx7a6lrze0lc9jwtsjxb2ez6g9og028cmyflai9o51jpssm91d8x8ohcw8h09tpkh0zasm04xw52o5gk4aa6slcj8d0qenuas7l2qfqns1vobl58nu6zy2ycgokrtf1anfxq9fsmxr9djnqvuwq84z8tq5yujxhiodrwsw5fobw5auzzb2g1g3al6xzuav7z7b2bxjudng7hol3sqv9lqwkmpywnkox1kgb2czkv6k14h8sehydb2d809cx39yr3s8dgfbts0yn2prxvppfvrelvkgg102yacoxlt60woybdhagrtbnjbwtzxgfzbrlckon4d0yc87gmitbs8guhdj1o5fl69o1oljgmx1a6a0kkzrfp3808zeom6wg8o4zdbr5o0hqknuzxsvygsusbmzd4uueuhvocdvk64z0gb10o696giw5zc0owuxd7wnuih2x821kz9n6r6z3myiz2944nn2o1wld35uve4m7eu524t7gjn61mpq1njfh544df0ba3u3wjfh36hlzrb6w1mmpdyu6kcca8tn8f3dm60z7eocijgsauwx1fb7zlkmxej7uoa4mfcbcnmlz933bbo8p18xi2mmxhu2i0k2ivprgbs7azm2p7or3p8wo7vnb71snyx4taskwntr50g3v9vsx4catwzbbxn7naoxzf0p5jhkyhmgfyb0fr9l08j2x46s0g9ayaj2gl9e981pecgteyym7mimlw4sayihweo48dg1abe81qs7wrc4an4eegzu48kzx32qkxtyzbep3ay460r0cwuomuzh6q2kxh0yh2vihuklf89jdf0v1wxp78wosfqhi6u7h757qv0zoym55sou9hnzuc1affwssuydc70dm55vajevmx096zconm7r4yg17gwhruvijz8k9r9hjj5nipz7xt22x81047eowveu35ldf0mos0zbg4gq19s62d8abkmbpskofh',
                proxyHost: '3q5go4dgtq4x60u19frf2jrlepbpfzm5vc4t2zwjzzy5qroan23hn85aoclo',
                proxyPort: 7411680322,
                destination: 'alh7u8oauzdjtpijf6003mz4qokzpmo1a0hefi7bf68e0grghg30lo7nyrt2xq8k2rbagygp75mbdg7gzy4fiv8zgfojerdzemy6f8fqtzr3126gf59x1x3wzkmr1r72hj5i4dq3o047cb9wzh2drha8rn42svef',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aucwa7xow0orjj0gg7tiehj8f9sld4aiuik8rf90jg24xvzl8a1kopab5v7bvk135harear6bppnycueh7mfoz89qyretqab25pxr7yy8g79geyt4dhj13bxp1d0b2d61jgmxjtfh7g99kx1dg37dlihys7zd4zp',
                responsibleUserAccountName: 'hga0lxo35yfun5x9hob9',
                lastChangeUserAccount: 'gvxrrjp4v40l0beq84c9',
                lastChangedAt: '2020-07-29 13:58:27',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '44nd8v2uogkq1bwnf13jnz1yyc1asnx9y152f4hz',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'z5xinrk0jywzrmilu6bazsv0pba5ag05722qbtmki8edbrbda3',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'jqpvjmh6g6jee7jb197y',
                party: '0kr2me5qhoi0avndi1wngbh6epbuqazjeob18zhwcmri0p04a8tc1mesqbv3otx5chcdj8blk0tu588y1x3uvbzsq5zf1a1m122901nhbvilsyaop7uoabwxwxgkgfnf86lwvbo7a1al4zp0dz6ddzwi6didguee',
                component: 'bm6uuyjayyontxxo48531ob8llhft3ma7djdojdwk3lbykzfi91f4rew09gqjd4zceqxvn5crde7q8payvnh6dk035idzvlqddcdn69ldg5zi6fuvwko1spx0sl0js45ybbaiitfngpwu9oqr0ivmpl31xn0e2sy',
                name: '4riqd075ms9hnwiblpad58lvj9vyzo07bsm3geagcigplkwee8e5vpsdtiymokfvtug4p96ghm215td36o0xa6s5pg3qmu8se6pak4vuxkcp9mp7i1buzl3s4r139ide977qobntt3e7d0n2f4q82o9n3hx7yhlf',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 's3cezx9seifuvjbggun5q7nbd23nyhlx1j7q4jolq2zqpifchmnwm80tdaw4scr3eitecijn69f0ipuj9f70y4zqnv1cqdzljwnbh7pfhc0iszly3r0fi9xi4z4gyo2x4u35i996a8gn6kzij4bc5rao90iyusjcp',
                flowComponent: '94vuawd1emcy0tc8dq2jsqpucgxfniyv97y6o0bup9wztj22jobga3wbj6j59usceddoln6qzzxjcc5gos5mjtlayhro4qp0c844hm71y0wmln15rqdacy3tnxpdgv143xp3se46qmmahg6qjwbe4mk56fj09dml',
                flowInterfaceName: 'quwhrhdgr5uteao0jzgpa4oo36u0vbtyer2uzhk4giez4ygxmis6mgzxwrehuitpwpqlye6vewt87toxyr400ynkfh0u492bcvbilkag5yh5un1kxdmujnrnprqgy1c73dlf6u9tig6uva59qigzm3hafy2x1884',
                flowInterfaceNamespace: 'agrbtsbudfhgn1ix754bp84bw187fzwiveu91yrzca4jvdorqibwiwhesptrjkeewq21ugkljspf90es2w0ppx1gdndqo2vfcyp99tb9nrj3el85e9zsbfh4en1k9u22dtgo6jgeppz8lz6o0bm4lowd3sx2f5ll',
                version: 'nuwp83aka1dga2rpigv4',
                adapterType: '99ggj2ywcbsnsa44u5obgw52u3zxcc9w0ivf3ahfn0sh8mcn4em20ky5ik82',
                direction: 'RECEIVER',
                transportProtocol: 'c5atiqp2crmvm3bmm3h0ix7bondicwx3a3zya66vg2luelwg9dfe4y47hyup',
                messageProtocol: 'xwafj4n2u0oeukrm7rxmvf851z1omcckv2ksv8bbeyhrbeyo6u8sy6vb6pgi',
                adapterEngineName: 'z8alanlrog2lvyy400rebctgp73sw45jcckemodjih9949rryl2e48cj2q4no1a5tt4fdbwyt8o964glisqcn7g2vo46asntca1afzeup8bepi19dq4y5viouiihh1wkztpo6m7dx1jdqscpfqbhhn6xsuupwu7k',
                url: 'jc4rjt3a4re7sxxnv6341s0bntb7ud4ta2lix7sck3xg3xcvjjen1h60l7n1qain5ilnkzqdzgxgkop235czmwg73t9n5qmetbkpzk8wa47tkjafg6qbeoiu7znvptmwotjl1ttw8ubmuvgrzwf1reso1doszq06mr08bjf5s9yc61p7xc116pojns3lq1509v3wotf13s3vuhafok68r9lbt00gesvh8wgf9ldu8ozag6w45jwhtqhkaerej6q9rq5abfw4s2ng0c1v0x970e9fzlzaxtgedksez82jglf7nrg0dnlhml8fma4w1ees',
                username: '1gy1u3i7os9hvhbevpeymemqaqiup1uabwibr8kcbb56vqobvlgop5g9zstd',
                remoteHost: 'z2yhwul99gq9hwa8hqnrd5sqnf7oe3ersnb544hm7yphr1hnqp8rspl1n0noerthmkpmt5mvv1fnfc1p031qyg3ujkgxzbwgon3qgp9zc4lgvv9gipowm22gb4df2d1kzcuyjs7qhy3ki4x4fc1lulkx8hvpd4ar',
                remotePort: 8470182307,
                directory: 'klf5phiisue29usy7pwx13dlxp200xhs9jj7hhxpwvsiaw5vvcr1r4b1smyal55yu1cymeisno7v72v237189ci96pfjeap7lm2p3tmszygaa7q1m1fv8fp9ieotjwpfreudhnw41u4053e4wxyw2vsrq58bx29zjqnzkdebo579u522m83otxmn5gxh7aymur41yjhudv3hsm4upedmi60pif26uiiyk79igd69eskrc1rkm697jyr1469siovhqjluhom89cw27luhez6igl70we8g0mievzwbjwa74xldlmloxrb4j28pl882cvbfm7qogbw2uxv9qcthvekfv6soni4db54ez0ku8x9cpz7wjww1lp92jym940xsdh5p91bvyt4lys35xchkzorq1gn4m7oc3sp3fhfrzdplz92r1wpezio2f1bf0miruonl1bi45hzj8yvghh3i8km7yuab5r1abca3x8u6dspz76q3gm4nuszm42ey0hb1avjumbrls0jqkitan3r2iaqeouyre9xviswn4fj4giklh1j4cetwqk25pa5vogvroaln192bxqwbz5fz1bi15ymamislipvfh6yuw7mhxat9v07us35bjh3cmf6lts6bkugtddwp44cyyna8rozqxyqsa8i210kx85x5t1tq8au0l0yq6z0uufpt1a34sq3adi3ld21muzuwqg44v7btmheqw6xbaydmd89yqp509h3rkwad8jvp5zmzitidcvf9udi3tbelahuii3nmmf5lif723a0ibfrjb0r7cajz4oqr5kp9f56b7iqaljr75ffc7sbk7vumu9qrfcwm1hnx0voqo04x2s1bdi1sxzy99tuo77izl4m0mtknfxkbkztqz49po6uwd4wrynujrzyzm94zyy4fo098tudo8ea4vb2sofnqpek1cvsv2r4szbxbw4haujgurodwap3y4qng3dhm4r3aaxx9feeub392ilk4ip2udxfd5qr9uz67nsvpbqbx',
                fileSchema: '0ewwwz1pxo5gr94aursje97d2csvn5qcxc664zdfk1qsqlpyhxzu1jkdn45mz18fdi6lx7wydku6m5h2cufh65mm4np1c1w87t7lb3sgl9ig89cik3jxkrumpwv5ng64mbhriq65fyenf1zz1ndfsujydowamceor739b0g63xlmgawfn9h23i64lelxxvpv2dhk92ouw9pjwa1gc9rdezf9psfiw57f8gr30vvbjayod1uejc1uvcjrod5b11ks48qexjysv8ub68u93c5q847ewdkopvrtocyb6cm7lx9yho8idse3xz1w6ibdk0lekb25px9p34ijm2w8tqn3jk9kn5dvlk5qwmqj4gklppy9hq6dmjgw4r0hxy8mfdwtpgl9vezoq67ybqgpw5el305och9zpmfp8np8ej54sm4ee1zqyjw607isoaksilpdrl15163t1u0224ge56478244wqochwhgm1w4mvyv6m1lyovuae5zcx4fgnu4ozlu4z4pmwdfw4x2rj7542nypx08fe194mvik8wcpvcme3s72edoxbu0xb2u55c33h7tg4896su12hrp4op358c5osnoiml9wpfpdxdklsxl2rcyyj3ym08kre4ea9ww5xuk017c1eh4hdf6ygni29jnicyccwuk1kw95svb0luxca2wmlgwnwgoil2xmjef7burzfcs6k7hmt49i81163lubq3q25viixomcbygxx89ekjaqenz7m3bci1r0i1bvza8y8wjbwwdbhbx1ga4n3kaezptq08mrirzrnuf4602fl25uuz7ixs87cf68z0sz65vzu8t7lc3avziq09k0x6iejbro9vyc90zg44kdemy4001t18qjdzv95olhe1ek5foi934gsoto6i82p3un3u83mzzvx87kukrkm9h5h0nmbf22pbi6rrgs4oi423o2lcxaubyrg2qqkqje6j38yyrhxekuha4hcyfn7056pv9yan4q6web9tz3yu3gh17n7ie',
                proxyHost: '669739ewsjqc930w8a8d13vz8sz4mgcqmag49zu116yke77wqyjyoam07io4',
                proxyPort: 1798571121,
                destination: 'fakd8t4k1qswj70db2k305mtwss29z1t5qm5zni1xrig2mxj2fubvz1e92lhpztx9ye5kqqirkun77g8ews7yna2xu30y0ojnp2849kjmboujqu0wg73vewm5z94dowydlz19amr4mddoany3k21f45hbvc3o5cx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9lcbg0i8vmu12hjb72f135v1mg4rth45s1bsyfnfkr0x0fwma4bs7dgvlu3jrjc4j67qns8r80uidub02nc5l411jo4n90aq0dj9x9mar8mydwpoayr5e5jha2xcjthyoz7v52drtjt6cz503pqvbs2ncpe7b78p',
                responsibleUserAccountName: '7141a91uc8homasxtdaj',
                lastChangeUserAccount: 'o84ql9x5vuam8bduykmu',
                lastChangedAt: '2020-07-29 23:07:07',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'dw7ny4z7esg34uz6bfnykbhozgbf46c6xg6hrnaz',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'zgupknb9pftbcp1dicfrc8s7qf4tyc1vt3c1qn44j8qzl39gei',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'ykufmy4jqiyifihmf5o9',
                party: '1oln0ogqwon9je7v2cvt9kwiu9zqulix6n197k7smlc7fhd7s5d8wb4t36qtzoz08kt386plztvw82gmuhcolant3ymztr7xrefejjbabboevehodwhzs1n6klbu9v99h5rk17wm9cv5wxm3sxbtfmjfwfanre7n',
                component: '5w1tb53ebmn9xpp5mmxfsab3v4b56jbtp2dvzraoo6jcu5mls8kxg2tnmvk5rtimtq1382hjw1gaambq3vsogveysptl0lf4vhlvddhlbh9i5ylvsbzre7t425yb655hbjkui1irqxfttnwntiv3417lfbudca5c',
                name: '3naia88flj7wh0hp71l03plgbojm9ht0oevxjtqw3exbh1hu1mniqlautkbykc6hte6abe3ym43rhfsqd4vxb6b24u4krcica75ljnqd3syztt3qsi6d9sow236rpw17gsynx7fpcyjrfr1xvs35law6k8xrtj97',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'ems4buflisifbbzv0ubekzxkwen4auodpaat7le23o2cnnvwbdodytev60euqw5pq5yg86txto9c4juowa7fhd2h00ztzpstr1233gehe0gz2rzvdgov4enqi1pnu3botqfow7fbv52exmcap29mv100j4fg716j',
                flowComponent: 'y9e3mlpqwumr62cp74ucyxnm99e5g1ghnlmld243370h7ds1qm1iax60e91zzcouxe5eve8puhutfmh5j0506gju2ttm14h8ss3vog153m6qkrul5mnivsr75rdbzvt0n47v8l4zqko694ldd6n9bd2n26ne1sxov',
                flowInterfaceName: 'iqmg2c1hybb0a0jg8r365lnfxcxi0vqr1yk0o4fhk8a46fg61d56q32yo1pmorv4xzxi130omnyzynvi34uykn3y5nf8todvfhb5crwxpxca8jwsvki66f5j9igwyck4g8fw28qahjbmm9v1txnu68dhd6fp1tae',
                flowInterfaceNamespace: 'vldh6cww3al5f53tuymbwhu34n56x9sd141iky6nceahc3xi0sznktf1ldf8fqn9q5x3k01h0kkpu6lk3u8vkkzeiy4l4hqguz2f72pyg03uthllvjlsr1ugxrsoffjddieph5yx6z1fbss5sxqmh6oc5vgynf7k',
                version: '03nuue1mxmiiidqwbuc8',
                adapterType: 'iafmg9e3u6biwtt414u0zxpf9muadlcd5a56rh96ax2ozohj4nv7nuwdiqd0',
                direction: 'SENDER',
                transportProtocol: '3x487fljrgdpstv8qr5zesdehgc732m4892chv3zhbat5jqny2xcvbv5klba',
                messageProtocol: 'hvenvzbdnc2401d4510sj3xry2kvmivtdinl8nu6x28blrjdeaxsnmdzczfm',
                adapterEngineName: 'yc29asgr3yvyh138uvzvdtu6svwy02gqknhz8mj4frroh2ee22oodp13jfjexj72qnxeenv4qkur75ccgzru4019aybtn01l3jo7xryzwr64e077wlxryznntvqvz9sc53iv2nfstwg1lv41yfe1tk0lzu3e2upz',
                url: '7f6udjn6uusc7arr0gs7y1274np59s91yc08xx0p88wks9gjhzn5skvbbc43p54q6h80oarisj395kt8xd5qv7rnwpmgg3adimec1m9eucotjz5qywahyfwt6j91m2mrdn7870anpdtj0pck6tyspxm1n7z9bgz11gl9jv8u8dhtwwui0o7wytx93rezj5jt6zfqumfn0o8s1u8jpp6rq37ghydv79mvfvvw23i75f7ilexgmyjmldyt8lc1rz72zdz0dkl9dcf6r9uvkv7iplokcnzr685u75ndlrttyhu5x31x9voi29hky62dn4au',
                username: 'jv8i89pfdjkoa0ivjff9pkq2v4qr9bzfgn1o415si6bxc8jf0lvg4velnpnf',
                remoteHost: '8rawj5nhoxqbcfugkbgf8mcmineygrswrpvmnepkgk4pszdhv80bc33lj1ql5x5rnno0ze32oi1vtpod164h0puiglw0ege3m0z7ph3kw24ovck0djqbi9pcz7jdqg4ucz28y9puzsgaxccfznt5y1taqr9cg67v',
                remotePort: 9479516672,
                directory: 'o4hgo4t28irucpxvtwc6cvdwgcfgvcjstm1fg6kexrw935e218mbu7r886rev7wyzgyk2i0h8xwmnyzu2zmrm7dzgk58h8mqa0858a1nbnp3uagdp8ns7rugne08bbk1qnrrbstt2fu3cm31sbtvvp0uhsgn9rt30rq0eh230kkmb90mbfuhrh2uotzkrfq7d1m270rz0ywyrvykesi26424csy8xi1iuxq1q49o7v6xrxtsd0ifrzva5y1blzlnf4dfy8kr9mmbfsnnyrfpwa8wucfwpz1tvwgi11w0b15eqq6myvtmly0o8vvy27bg2dmeu3lctkqd5lljcblgg6gsted0js3nmsg214bob10sizklxvo6joq9r3g8hbhtr7s3q2nqasaoav2kf2d21jnpa5k4qa49ug9cxot28vpuj4d7zb65ax41uf09veuqt11n261vpgskw4cbxb7uflqcwlpkodsq030ebpyc6koy6qhb593cpphqaqc8bod389x3y7g2e4cuoero8r1p5r3dle2qzzyee0jw1fllb6n4ihdn5x7yncr23zn61hhvyc4ddeppa1lozulo3pkwq0amzkl2uqrgtphl2cdg84kctmy6wuuhh445jl2culqjbkae6ddltc9um52jd4iq9bk3eznnr322g2tuk977byxy9yuusni0xm394f9htavp8h9f9v7uti4an1p91ammfh86i01j2wvlnb1v9leu4e91y5hw2agbeuy6xq1ewagaa76hir7aw49adt7p49bou4jc54bkd72d88i9d1jnt6wqejgvhd3hxy02z1zsruxhbbuq0si3y5w0doxorbe29nrpqzdq5kwvnc3xyxmi9wrfotrofhejpbcurq90hcndpp7bwn9l5rvulnfpxbmu07c8f7pxnumb3atpgmtym3h2gcr12i79qmj9hervqhj6o7ij7oyzchqppfhxh6ibuekgovyuyewsov6uun4pqgrm09664n1g08icinbb8xl2',
                fileSchema: 'ceb4ck3zbsbi1dig82zs49f3w28lvycrvbco34k1cy1lv8p06c8ab8vwc9pk9u5ljnzidonisg9ol4hs3ynrw2si05wtquuptd3koj0s475k9w4absq78ms2te1w2skol456w5tw8rt3o7b1el3la9uh1llxnji8u3fmm377m4yiikq7ka20d3z9d4t8jbrua1p09rod5iqulni8eiy62k1g3xf899fj7alv1ukesqf37qca5am70y6rp0rjt6nryo06tnk8r9340rpwzbhbtus91jwmonr8p5rg3wmrr9yquderq9fslqecr2fcypm4wlwol0c3s2r7kt796m9qn566752uukvnrm6amx0lctj744r70dzf578oh49kuy1wdryaqxwlwn8q5s4q1p4ipzykx3iu72pcxrdxvktktkx7yo5xkirjngdfekkai6m59wg8d6iby31fpp44d0vsmw2jhrqd9zghdrglorkxbidtxh4rmj7kbcvq03sd7y08o369itksq6zm4tusxid9rbql39u4ixi2ji7d064sx0oscmb1ekmfsmpmwqi3b6qmpv01e7dkwhcoe8fn8c2hp01a9yy0h2cefbzz8rybm47o7ietcq88t220dawwuv32or862r4hiycm9c11zp6oy3gc47om7jgiqw0fz5poh0nfpg52cpigyzv2ve8lwue8n3tw6ny2spqpy0722v5qyo95qkhqz0i619fgt3oofzyxw8bnvqwrmbm33mhr200caux5laa179mbrbbhgikan9pcxptmmrslbbkw8ursbsgogzl2ntolatx0hsc8b37awsougsp32aklu1sycm9msmf746bey76k0n2ah1y53jbxxk548cl1fys92yo24e2xgm1sozwdn81kggta4zgo5shur2dqzncu54wx6dza3xv46vh4yolelffv12tmdcv3lwlj8li2hks3l3vliclje2u79no6p44yfe3pjmh2x1z74oftw2n61qha8rct9bqp',
                proxyHost: 'qygjspq8n45sfw71sqh6fa355ki9xtgz775ixekg8m958zqisqvshswsq15s',
                proxyPort: 5303379124,
                destination: 'ferga1bo1p1jmxmv47jzx6qqf1xvzet1zo4kgwjmpd20cfpm1moyqav6jl5fwryf739pbk8zdkm2oxqy4jvc2z6e5ki0o8ta6tft6ts2dt0u6tyfoj5f6luncg8au7wa4rvh6fo692q1w75bp5r5iaqfeyb0d0l4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i3a7xhuyz91jevp3mx4suapwa0tezsy32874621spolfysqvhvvi2d0yy3qp0wjtvp6tkcbaq1lah4tdz4x55siaexmxdirjzogd74uuf17pwpw9ilm8yhm8lvxar4ipqhk6f1oq98qgbsgqimfjnu9lgj49834d',
                responsibleUserAccountName: 'eh5t4x6cje90c6hw35mh',
                lastChangeUserAccount: '7kvmk2oikqvg1gduvfmu',
                lastChangedAt: '2020-07-29 03:06:43',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ghwwpm9mqrx08gmnuhajgnvbrf6rbtig98dqn5yx',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'iojwpzfvexf17badaao539n8asrhs5z6rok47rra2689yj7yg1',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '8fc1w9s7ejeeb03mhfk0',
                party: 'idwp6o02qbn9evqpwi49hdzee7muz3exa8kz9l5g4y5wa7srve1r63iez1rari0izcdhzwl7ehnsi5cdviofq14owg2s2nruhy2673v0u74h4o1gu1bwm6crjryhx28huz3s62uprcti0nxos6qk847odda0h88h',
                component: '4dkwffhb3n3q3pa9guh1v9ui1zlh76w9en8e8xhqcii82fe5y38soskcdinci7mhgmikm67o0as1qhup3xikygvvzq4ptocbvz78mihfd0ioro9dvxy2fl49wxokk8aggvq03ut978wh008j5mp2z9r9v8ur3vbf',
                name: 'atn5h3454m7h5mede65sfd5yi3yiiqq5lieaj46rcipifcvmd40gedi8lx7kgs2qhi5xgavv1pvb0z5x5a7g9gu3n6x4kpumjpbc6tk49jk7ldjh0dyqeq75i7kp57wog8tzxfw01iieqi5522o9jwjwavoc0xs2',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'vsy1pp69j37dfjau31o66ez1hzjy0x39pns663do5j1mviz6j9gmk5dc0lwvm92s44hoae6cc5g2sqaegts9du6zchamomswtorws3y1f637s903bw079ut23oar9reee66in22cui7grqdbtqu8wvhmu3t1soxj',
                flowComponent: 'lflog0ujjc743amw3l5t84uy0m4bni86logq9gwyu3dufis3d93f83ovxbhdvwpj3adu90vnxouny9ubspi3wdrfhqh1liaxrrryrwe9q8bu0lwhti297vci8s8fm3bepu2i89fywrm0d018rhl9za5ewg0vvwxq',
                flowInterfaceName: 't5egv9pdm5j4r02e11fqx5liz7bs1ydz0si4xuko890xpom5i6kjva2bzu2th6jo67zu7yswvblj94ip4i31j9a37pwzughla3p4z7rdv7xjes1fy9yyvtzfgqj352321wq1l7acswl1gd5ranyjcp2a8ldwuqmag',
                flowInterfaceNamespace: 'fw1zmv1q9n7h8tcyp7i7v616b6ee2wsbltolo62sbju1u3j3wydvhswry67q4k37i62w462thqrb6pnjk9z5qz3wr5xrjznd5m3wxxk8lwr1zu84p0yfejmooly82l6w4crvhitiq3fyvp3mdu8g8sl1a5l4hb45',
                version: 'zzzdewb41q46gpkhtms0',
                adapterType: 'nzwz3s696mtlf8o3vxqxf6ye2vn35h62a8yh98yivoxqh1o0vqbuvp79zq1i',
                direction: 'RECEIVER',
                transportProtocol: 'p9ty52j21t7dw1dnglwke6d3iokxdtngvi3h8hqkvuf7hpxsrfbffn1v57xz',
                messageProtocol: 'cjtjnajt3kt2mgi6az1sln5fzilqh2txbgyxjolu126xuoy59nnqj65c7eod',
                adapterEngineName: '4wzlqs1gsrj6adkejkza9fcx8gzjrzix3d7oy0lotctxsv2y4ewhswjuegemzvcgg72n3ejp6njbxm4rgcae3hknetlqxvzllu3dqm9xrzyr769puq7mxq01u8bk18li3bwrz2ftq0kp4bp4nkmwabv7cl4cw1g2',
                url: 'i8mxc4yhv2c2h5npeicry1sccg7h8roulwknxbzfytujeqw1722p6n0dc831lp2p37aficr2ew33igra96odk6o8nwqs4h5z1iaaj2xqxeh36r0x9d0z7tg299kxfeq7ypegid2qb47a29y64r4zqamwgyqng7ql3rjtx520skrmwolbl0x4kznm345zj0t9br5lfnhc0fl0stechsgce3u5bjhvj80l8ww5vzsk0qcwdnnlzj0na01lo1lu0wduc6e7afaxfz8hez8butllphm9xa08hcp48r5fsh0ksdtm9asdd1mh4w13wkypltty',
                username: 'zzkptb7y3p45rfjdwghn57nc2h0plhvm0t3vp5qhzt5f9olu1colbcz46t1d',
                remoteHost: '5bk3alcgnzixkmytm3kqemyz0aya9ppfr9mff3vnm3myv6p1chwdz1smt5nuo1vu2i6e99s2omr775d6b9p97qndlvva43rp6r1iw9q32bmd1eiewlw3akw60lgr429k6gjm7lq692dbu35lrelmexpo5yudzthu',
                remotePort: 3475735569,
                directory: 'h7l6ts8sqjg2uwvdygtf34ey88v4z0geze5juclihwwh5tkqpcgvmjwg3mq7zovhv8n7nmj9zy6ab1tkq8agyb1t0au5flp40uj8tt85zubt3izn4lcwhdn49wch93xgnqun7t3uc2cil81ffob0506h82aho0j8k2zqjcxtptslwz40sxg8kn90kjcyit6qmsuorfskrmkoap1dym5bqx7vxx2xzdwnzup48p0vn4t3wiw7eugqqwodp9dqwh97y685m92266azqwpzt4bubm3as2j8k22oipzlqoue93r682rvaqq6vpn92ma04dsq0fj4lkmtwgqwxquu5c5komtwe4k2rhr1cv0llgxljwgs973vtqlj26p1x52zs94h15l6e315frvifc4qo146qsq6m5x4x4lqjdafbek2hr0v5qrfaci8qjnz4jljbk52eozqp3lrncovw36u88m4ms149dhsubw2bwtw0bj49yk698z2djefauau9ta1fvgns6rs0o1tkiaddrxpzutzucsef7fcswjahmmjfv934vjkibpgjvvogyxytvi7dlryk4jbkf9u79ntwmywldgnxwojlkttmns7x225wpq28fthplt15yo3nsazho7l7sjz3sbxpggsxolxort1vt9ajkfqodpbkrkvlv03533eohjz49vixuug8obgghqsomgafieelbfpvnsf9pwkmkmzzb234vtpi5y7mymz7ep0f4ljiuyw40hy4flj1dzc2zv6up4mu48xfcyim8ilth1uo35kzhp5n2agn2hecaqbc9glx0x9o6k45t04wzhrfy6nbsf0jgb45vdzakznrmo8v3jf5c001z52g47ysip53te3e435fbjvnaou7u6wj8zol9ywg61yib8r9nsq5wnwcu99dhfw81xv8tigumd0200sa2oup5cm5wvrg97054eunv2s8sdl5hmkt4j212k91mssryxnwkagc1mk7ma5p857opizkrcnt84wpdng3lud',
                fileSchema: 'pk9bk29ymp3m9rp8rp52xer9b8mzixoc733mr126wtco5q6hhwdmjfv44c3c35fr62uovb3kfn4x4yggy3jqsp50rf92jbde0aono4hvoynnl3m2og7d9cg2gtedjmwuxcbm1zl52axslhpctyzcloz5ucjtdywxr80wyzja2eykwyw4lhlget29m2f863pwparl1ljdjupxusmutgu40zhv3lyplbzr8eu6iquy8056j3nkyhtqxg0sp3bg149bsdsgawsywacr7jv20utx38nw7nu2d8nmv1jt28mvn3d1x8ekiixc6m6cajyjc9i28aboaq71sb28qa7c7cenm87sdvk9qfs1c3932pxuwak9w9t8gv6shduznlq0olbld9aiz7c3u2llzjky6wll5ocbp0k19rwnt55f2yyn4g0rf3v4oyx3w13po1mftfsadwgtc6og0nmafj6djjpt02zq90g1xk4evaa4v0abz98rfq59nabhf7b58u9xxs1fo5s8bwrw4l7roqeh61e3faclw35xd3qf3ry3ov1laippfaop1mzx11x8wnza8ezic6k5s56ljr3wutyyefe0h7nzq9g46oa7auxgajh5m9wlyzdepwpofriup2mdf26x48wffzw28eozndsxxpedfoevnohqoowi0krgcb4m4iz923tfb3v0sy11dwjxc8cy0gqpod721pz86jjj3vqblqrlx6lyhx1qb31p6m4kfxxr1wk8sagwzcj1shnodmkle2satxfxipeda3stzd9cm0u0v14mhuz1t53x1mt2uqcf8g97m03fhbqi3kotzjd5bcac3nhstnj6v17u07gjowsdy3t9hiasrmcy9bm0tvxjf5knhgpz8rv229x8lat0npfm3qjov252zrajcil7korz1p3b39w5qfno6vyqd480gjqc87szhbzgva42ljfg0ya33n8lkywn48ih2qvxign2pvk1pdicunn51pq0l77nfouy8jpk9adh8ua4qveu',
                proxyHost: 'qoqfxw1mlxuzw4ss9o14ssmzy5du6um34l5tr8jrb2i2mmy5coywxmewim94',
                proxyPort: 4881111711,
                destination: '3in2pqn8tx3a6xxrkt2i3wa00bv18aqri0s94pqv3ukligi0j2z72gbfxamoxg2scfaitmd5bxehqi5jeh0bgxopf65823pna3mcfzib6o5q8q3ejk7oi6hjhf9iw75o7ksgu03u9ymo3s0pody6jq5cy17skn32',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qslw7zmwgch1am2a0f8rsu0duw8egk242lkvzn37w5bydrles6kfn0duqqsfh6d5kba4891awtj4bmszkdph4a5lcuj9r9sb7yv06gqjod0bkkr73dxhluu1993dzoxgaw6aeyjasiw4575troj30qbox8pckvo1',
                responsibleUserAccountName: 'cci1va90a5u7x5ggvief',
                lastChangeUserAccount: '9eks5wgaz0swdujpkn8b',
                lastChangedAt: '2020-07-29 13:47:12',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '6zlmrkuizeofty2vfd451yna0alxg7xy99y7ronh',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'v259jeifsrurl6tptnqscdouno8x3a8j47emqkwxtxtglfq0vl',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'a99k8nw46tn685mg2cfe',
                party: '8l34wwksqp900ztekhw4ekzbmjn061janoc0pltczbhfsygtj9yldng12luflikiv90mcuxeraxaif7dwgcts63zbuuei6agtbr3dne1sbkovel15wyxtow35f224yc4dw1isyq65e8tufv3m7aip304bbg4gh6z',
                component: 'b2c3hhbp7y4405thrlhc2ktcccb623i2libo5t3stzd799g42rqnjs2rwccd0lqadjal86rprf6u7zui262q0z6wfk6r5t6y0dldjm2a562f8uin4fvci67nc5it1ugaz6sc42d1pbjxljmsjm7pth4n8u4zjugp',
                name: '1j6xjliz07oo71r33jid8o1jotqvxt0hlusmfdph4e4bwk8i7gxggo8b6gzhy227q3kbm5a570w2tr5373n83u0xq6kjpnqzs5nsbfcapczx7mh8dc5v9jamb9k3suxpf09pjn4h45rve097juju94r5ijz1htiv',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'cjkuoe8no44ylhfx46drc1vup8udi0m4zry0ndki9ntpj3tnzfih42y91ij9yecwfegmvo5k0hylk19srn4pn2u6o5t5ai4zz99l1fe8jvkp3x16550b0e1ybqd8o159kn1fku24mcajijs1l2ax1wf100erufhw',
                flowComponent: '18qpotokbhceig4rfjc7k6htyteezjdxj9paxltr7pzrwska45gvdke3q3ytg4b5idqd9ec5sd9ykefnq51g3lh69ctipthdooxgoryfp1tk4io2znz9y3ue9irgbsc686hyf0aed64hec4knzbxv2d4mpnzmwhz',
                flowInterfaceName: 'y660lpmk9roiluq62f324qr31006foit5kwl6hlgkr8xm7cdaq8kajghugyhhluj0y056brj4asza0gdf9w9flb7dgrt1xi8sxiey8m4itt8lq49e148f2ozmssrzzmpkxxpqwh34cgypv2233eprzgg7rv4dtqw',
                flowInterfaceNamespace: '5616dy76uuc7gw2hzii8o640l0qoibrogcaq52r2jy2cvpttzggonj6hindic9tbgkj1j75wu8uwwbjry40fjehx6iuzhjeqqpsgku2q0uiq006yabq1408qfe7nfr3mmodftdgcxhc71swmdaj274qwcxiufklcj',
                version: 'slxh752kpf68w7vb1aor',
                adapterType: 'zs1wyxnqf91a2dex2bzog8i7eno0uew28nlyvyw9orzjvq1wpobcb0g429r0',
                direction: 'RECEIVER',
                transportProtocol: 'cun3sn1pe5n5x77y1lg7sa3aspvu10b0f1pbz658kdw8e8xghlgpztyrhfxn',
                messageProtocol: 'yskf03nv9nk6vrd0uhu3jx0rrvvbtypyjrxfrc5pxd0mgydlsxyf8bwfax6g',
                adapterEngineName: 'suibbhe3xgzdtz9sefycq5qrzt0bdgmjsqblh7wldl3z6ky07jorjyfxvjitqho3tj031xfecweb7q0p2vybe83fz184sf9fz6zhvchp8zje56jaxcposubvu68a5c1o4w44dkjjrmp0ure2921xi68v6c51kl6n',
                url: 'gew2nrlviye1d87hymhn8shaow1kg2ec6e01yxs0f6g58q48fvzl86kagw26ebzxqjy226g4x4h0xfmwg7emjhdg7r1ron5zdctple16z1tw45iyop5nb1hy6q41dytkr2hcnsio1tdua7le2dyf22qmq89hlx35cw7afcsdz0vd6hb0l2wxeomy3v6jlqmwe70pjhneyeyx3v0y18lag9z8ffyh9r36sbstessj52mj7zbs0gq6i3vag8jwnlcd0zmlq81gajwne0zyzk738g22sn0p3nyusjbx6oeq8gcqapzzb6x6vy474u2yl17d',
                username: 'afxooxd11nh76a89g399bzz3gbabgxpytrufsl566ovzwe0v8w479xf6iuye',
                remoteHost: 'frxvsxk8oexeocvschq9vyqllhnjqowee7rfv4rt7xpngjhzfg0cgeajwff7egmkhll3huueruw4lyq7ot69ma0yxidgmp0yssbzo2jps024gthjrgtxtzrws1fwy72fnggyst6fm1nm6a4jq93ao0gdp1ojwvqm',
                remotePort: 3078815462,
                directory: 'o6im2wja4q9suu3afbi5zu1nq7mn62xff7lv8dda2kn3iqqkv4ir4pzkyp197rlz76ilyxhl9n65cczys09wxwyfv69ufyafoldnkr7tlv3pgpdst4cpzam32wafai4i2ouoaswwxm4r5hkm8ko8bb333gopr1h1dkt4a27ikjvim39swerjpwxw93efu0lplcnwkl0lby9040h7r0izowjq8e6dpzo0iomaab6b6lj302ewty2kff139s8zpni0ylmko59j46il2o8czbcp4z4oxxrpgfhys8h5yp9v80r9yhwb7wl2qkuqlvoo59erryyp0vfwio7yeajeh7tsdrkcpaxkss2pqy1xz383tqegolbru73aeajp7twoim5x5snoa1qcig23if5f9pulkros4oj1wpg4tyxgqbo5b2ik8vl8etis4lobc523fln35vftzj1cn9a89v95ibavzr8wc6hitih4qtrd6nq3x2uwlu6v437zeo9bnqh16gdrvhe6wd2m8afh5rehqgaulmg5woaqx0n7xy9p046la2boaa6n2m547nukyf2rm7y4pswp3n7o2t4x4v41fn69h803cwz0mro9xtnp9qyoj0a62jtzs4uxj1sax87xpvlb67kphgo57yuieooi42knrc88d3o8afv3nwdgi5cjij8gmnq9mnd9wp6yy9jv8ux0qmjj8142n44wi17v2biibr498lbhfevbybp37q4mndqhadkt4m2i1o6jhfl3pmt0y0m3pu12n127owu4z6inowub6i1499m7brrvxstxadvv9ysas7li4ac58z2g2ka8ryfug248106jaiwdkyukq4q98dru1tgxgfewc39une1k909ahd20o240ztxkrcyi7vajj6ov1xu6jsmmd7jkwryea69r7fyhcw5buvl0zuywzflmymu16gjv2b3v7evdqj7mk88obkqqe2pg71tc0icf8ungy91qxqgcquhcekdof71thno16lvipcessopw',
                fileSchema: '8ix1oi1jkfgw2hi2ucj3nr1fnsa0h3ccivnufqofrfxnbkk6op9702tm014hgzlvvcfvaeh7mkogny7sxx0vor1219noiqkymffmvrfnn2f5cqaqioymq6phngjigp72rqkr8vu2sh7tq9e42eamnzf3txdsq9i12829b9b2ehy0wymwicz5cxexm3o1hwl6w0pn78hbce7gu47dmamn5z6pnjpk378a0mji0dapbujzrrxi10dofqxjr0wzapaxa43kosttw6igtboqln8r7ekc4d16wmuvoh8f7bsrg9hyaly3xkai0awk72cp58od11kqtkvzmc81okyo0oqsmxre8zdwrvg0y62nzucorukajfj7h06qi2324hma4el5kt4bi4q24ws55clpcu4heflmlgqas3oi1kui7i6du9nzzo6keqoq7dgihu434pcop8dzpx8qzwub28j8xk6vlcl2ilnmydsxht1g4um3ewkqp77bd5bw9d449myhqm2m1j6gorouuxvkxmlbtcdml3wxdzf1dw9lwl29oopx37lhkt9c0kf0jr2fcsupi5ors68i57q84v30td5mrv0eeoos6oe72krtwt10n5os4rqfh3eqteae11xlsnvpwpktlj1odl3v4z818k8drgz8816owzenyabet5se5l87rcs3qgzu5eou018jmionp9gyqvs142agx6481eesp0yh0nf5lij5g9mftk43oe0fpnr2x1awi96wqg2xf5jdeyv05e19betvwz0msju5ridx3ly6uf92u12wgqcjjesbamx63b18kxyx1udo0bz70hndtaue8zo8h23bmqwg6i3929q837ythdcrvq093d6ni84h6gf5xpn54wic9yzvjsc4nzge45rx2uzus961iw4j3ayqlogtz7m6j7lrm2ur42tmequzfdbrtqk4n8q3k95wul1svrxcnmwu67l59n6pdl5435t2ybya0a7qv472fz076jq000w5tmo7s73uzfgt',
                proxyHost: '0najpj0d4mk1u2oeecixmrem255lue5dk8iru1jyd1m01r3hxybjm6kmav9z',
                proxyPort: 1805935969,
                destination: '0mrb7i7pj761yi88whf63ghk7y80pwlfaf54qu6kwzq8d9ckqx0010boehkq9x9bj2l8eitiv2c9nx7vqtv2cfjvhwdr9y2pbxbayn4n2x353gm806nnqks2o81oa12p3umror58poczfrcfr9825ey02m63gu1y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lgwpoeu7pgsswreuc800uhmlhcdowc71isn209162cpca4g215eayv1vocveh8jm6wxbubtbmzehm2wjc544jwwckjhicz2fab7swkhpkj2ivcsmzlv6ro8o6ragm607u7szmuhsciwzwafsjow2oxedpl4uqkvu',
                responsibleUserAccountName: 'r8tou3e7wmkqtb223xlm',
                lastChangeUserAccount: 'uuwjy2coy1k6n478hro9',
                lastChangedAt: '2020-07-29 06:01:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'mmpnx28tp6d2qh2bdowyh934rkoxg0z1vlgq8fpd',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'ngz6oeg3g7aj27q2pvgstwogequdk26ezrnx1gn6sbg1uuk2f4',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'uao0s7aeon75mh6hr6xf',
                party: 'sm7urfqc8ndw7wko1x9mn9yd4faykxrtxcr7p2eog3ee9bbzr81xsndg1yqlktrxss9q49b1g5gklhm9s7ms8od9sbs4wxtt9wrpycubes1c8xqr2b562ok8pjbmnv48fmj2oar92uyh5jozs0ywi1birx8ikti4',
                component: 'tvsbncoji11o0uo7alydc0dhgcix3k8q10oqsd2jiep0osbs37taso99hu2kvt2w2ew68shhsqwp3ss7k4s8pggs86wlmdawryhxjrmyxuyji9o16wqwuo17ufafd5pagfrqwzqdtq4u54dp2pbe5diyy8m2awkk',
                name: 'lq7zftyedj9su6c6qzpzuusscjdas0feh7y0cpmnartr2grpvcuhe9pkhrr9akbeln690hwhfh6wtmqnz4tnjen9vli8g3bu0riu7twiah44a7u6zpcv6ubswt61g71gjitxb1mcolmmxqdv3sv3nai3m7pa3f1e',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'grsh8pl6oqem92e1gmru5pirqb087jhoag2qbaqb15opr9b9r4sgh1tt88z39kn67bt71cnzckeaz3f83ypdoyo2jseayskonc2uqswtxky8ra04spwnfj1qh1sq0y3hw59rv8mn9qxl4te5g7fji8w1ixydlxnk',
                flowComponent: '84n43w0bnw1icrcarv03sueidlwbt2cfsqbz0ehn4w1cztdacm7sfnbtw54ra7y9l3ullfgx2nlr4avm5sd25r4nq0j2zily49570ajcypirs5q10pvahdvv99lft8jclpj4nldtp1zlfnhel7ejtcwvgew35s42',
                flowInterfaceName: 'b36mo7v8ei6mzs8txhw6nv9esnvzghi6koho7lfex2eye8waoxxo9ns0mjvl5fzxv2qz2cva9z3tz9bbkm8vvzincug4w5nuio7304n85329bah1h08zntb9mghr4lft56nbcwegunz8st5dux49780p4612fg1h',
                flowInterfaceNamespace: 'b9mrhvx3t36ko2lhckcehbki1nbw843cysnhxhrn5586toqc40sp539s27z0ookjf9f7vvjajgh4ae9dnlyxg4o8x8e7tf5bt4c9gho3agoufcag5vsiukzccaslaa7pwav9sfbvnacmntqxwdveefgaap6ue50p',
                version: 'yjr640r7ltb8lrjn5tb0b',
                adapterType: '71q5l5t4abbjknkw6ka1vjoie5fotq1dkly8gjt4q07jhmb0d4s2283wvmw0',
                direction: 'SENDER',
                transportProtocol: 'huu7hu12aznpff80yomemmli8e4kr8gf058jk8nzryyh4q43n0u1kx5ir9ci',
                messageProtocol: 'vgh7fes0ih560u2lmag7u4o073zret1sehwnvyxi0r3t8f6ha1nyp2rexipy',
                adapterEngineName: 'y1g2pugnmkc649ykyfz7xnnfayp5pqxcpp1n2n1mxl25erclb1ydot6kemue4rqxnqmd248d8orw1jv3671syw4dzj5xr42j6l1313iogsupbgbw5lwfvkt2p6a1ecbvb05lcamahmt8qsxvg1hyk9u3hvt9m38v',
                url: '6g4wih5vp91tg1w3lhanfjutnf0yw78ipu9npkpxs6yy2v12bajq8bg2mtrg0znv7rflwv5ji8zmrnpn8nco95m9t3vb05bryp9i6hfxv0t7iyp7qcnncvbgzajq7pa7i37wmd94jzpu63tlwbj5bqs0xz86llfnvt5akwyztstecjtpm9yyvs320lz5jwrtay1k8z71xbg4g3t20qubqs096hlsrdxkmqe86wzklh7h1jpuhe0hmxpz0wxnc0a531b1duy4m6fptpxemlu4s0jt3smhusr7lrtuh3egu9mo8fu35ymkczxk9jq1xy5d',
                username: 'wookroot5ja09irjm3nfdz8b8h8k3sng22pn86vyioypa42zk52lrf6r5djw',
                remoteHost: 'z4n6ckl1bb7kxy277mtd3qq7sra0b8adic0opin1vbbfqz0tpxbio22q5ii04u65i32epegexoelp5hn9rvxnxi0h4d3smnvxrvms1jxukkp8y2sh59thp40jknwblmt8t5sj7pz1qx0vj5hgo5ujxxy9c291m2e',
                remotePort: 4497577262,
                directory: '7g4qqqdfl4yr0ktk8uvo3awey8c3sbuq9l5avvqeifsoaq4ezj87lup2zhd8klxzgw7gdxefcjogb3l0fz3bm6gybx81l1v9b2kweb2um9b3ndug0q677bkihbl3s13x9g8i4pas16zw7eb8ejs630rdnlskh2fl5l3f9uzffxkdfm6vom6nmosk7r3e6z2mxedlj6z1tmgp9oo1qcno2hoo1r041qi7f37r7u2inikdwch736xhlme50lwpjc406yi5pjkq2hun3ggk45xgwz1irlr6jybzlzytnfgveh3010noxs71h4om9d7p71p17vgkp2p5v1mwoca22v8ngq040jw4imbr6ts9p5efruhztxq2fxp4adst0at751lcr65pfuy7sh06pnqiex2yj4rbyyr3ufhh1qxnmsyhx2o8m6ndx1z9jmv5r1hkrhmhzbj1dzsxqh63vu1oausxynf7vuere3fkap04x18aql2kjubpyh0yc35z5axjb8fwaxaui8ixg6tt9plqofyghsfxp8uqlgpeodibmz5tadahhi6kjs9sihnvei5gwdllz6gzsm8x7ovv4447utyrh1fn3f8d5qfr10pvin51zxhrorxfrv476hi4jqjrra1vxnoyee4s8hihlyymlxxyviff43uyqxyixg7vpt3ah6q77cgiyamy5frq2ieicnheeit50g4kyzhdsyg36lpfyei12gne47rsu365alx98ncpqo0pjw0hvxncedojgyk4yze6zlxxbimpy7r600sykt0kkjc60tig0ka3jr78xb7keuuavnyzk06y6ciszrhbowpg80ielkmd5rf04toyn4s9tda8o0nf1yglaoqacifjw1cs3bb4dopcdewwj0xk4exkjpyl7gl1j9xrufmvk3jwrte49osljmp6ckedinnx6g5dzximyiznhp3vk1f9hvipir2vh7znv61w3vh68n1ol62lfho10smqw3n9dnz6ucd7p5g19z5us4ajh4g4',
                fileSchema: 'bfr5jl6gdhdp87gmnzzk8lmiheamfmax815qbixwh3syngjeuj5glqpfcdinzn0igcirtlwzg18dh0br13vohbeoaq65j3iupwzjroi5j8sxvtouaug5qfjbh77o0z5mbuvwbz88jj3bg16uvzdduesszefvz4h46u52su6wsse94rw9buo55q4ougotn6egi1vpn94mfy47ngwl0iohlj9so3ij7m7ervbjz96vid5790je45qzsq8m1hmy1b0dvtkmivbj53d1cqxvqkrp5jai8x87a575st60qmfd831mhlws92arin3cyk2k1ccowfypomi9ourpv25zgoiowqtezej85o76uv8m8z4bhp5pi7xezaf6u1xax8qxj5hliqtknoqc2s9dlotdrese1oh2hnsz9mbsji7caidt2ck40edrxw3y536t7f4ft080baoh72xag4ad6np8kxsikkse32rekq8j0f5n7acf00lv7bju2aowck2m3s6f3kha1rpqvzasau017oeal8eariq3frudgthy5tv5lh6n63qhiy63dm05ssk90s0hixfc6gmmcfr8e2vpjm6q4ifnlyak4r0lh5i6ut3na7v3os8ms1ixhz2aibqkui7gf8nryz6f531x3wj6qevpi36x4r9oyvw7il1olmjbeyhawrkv2fle5ppmzqo2b60ftvy73u4u0740tph0w5hs6gz615dtsx1jeacsc45ete0pbl6a764xqgywq28u9n2gsylt8xg0f5y5cij7hoedswtzp7mv9ln61ijt7gbme7i9yeq50m43tjrb8mv6kicn812pjpf24yyovawu6c6siahmz38htn5e4wwyhksnrzsxn2jtkdl5048sb9gl8tfbfu57alc4e4uc6aor97ac5fbxlwbkjt764zrcrqv889e5djsza862pb269ibn2ylkjs9wdfsigqo2clnzz06605dxyb06ss42vs67fxx50ivugutgjl8wmj50ppgsmb9cicp9',
                proxyHost: '6lg49siit64w8inm1v4k39m9niy0djlgw5gurclt4wey7yhjoohg6u6wa7e1',
                proxyPort: 9693554181,
                destination: 'febpjiq6mdqebacw9mrogd7cvrgv5syqlu5j5udj9dk39554qkf1carzft5sobzyfcwkcpfzwnoygvj248bakdoh2f52k7f9ejjpveioi1fzcw6hdblfvriylxj7aakqgavlktxg1c6pisiraof754za5typ74sf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v230crnjbs7qcgwjjobh5hdh4hzrogu8ckkj1f3hvnwlcjssqps0opn22vnvbgzgw5ezhvn4mhm8ncaixjwr6jwefks3vh6vq1c7qbyu5mg6z4m69bsii1491nw22el8p9m9ggvq6ta152uey12078d44gtq753o',
                responsibleUserAccountName: 'fsdvokztw6tjqfshwt2z',
                lastChangeUserAccount: 'gk6459au0jk311gmsday',
                lastChangedAt: '2020-07-29 07:53:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'c3x777yyrkjjkbzffgmapmzfsj8i9cepwblefjif',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'zgqxtaj2gvgy48hdnuhgeq5w1adsl9c7p9hkwhgmxchscfzabq',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'qvs2xubw4gbamduizhrk',
                party: 'wsfzwb98bptrpaber5c0ro2nn1o04bhimujvlab1mg9gbrlvlyqv7j3pd45db1v3w1ea4w7vig778kii0ihdkymtn2u1qlfsvwbgez9e3x0gp573fpna3f4yp2navahc4hm8sldmxg7ge4il3aywaw63vsftu48e',
                component: 'mos8lsphgmnfwhjtujpzl2w4graio4fum66uopgh5hcvz64daqpgnmgxmi2m62ozs8bm237gsbjc1nizrbrwcysx58sbck9248t240nyb6h1egzna4n1smwpf1fztnyd19zb9g69mei89rbx91obkiog1f4ipnss',
                name: '464q2nf2mpauk1ugb1bkhu3udky23cm9ndeawip6qlimsx0ublvk1r6ke90l2cpj4bkvcnxfusofjvq1kkpg4t2btun05hpo950a1ay1up0504f6eri7spikrvto21wh7oll5qgnocwilxzaeqeieyd9je8p2zk1',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '59cxmtffp1vlph0xjgy37vxo2jbxhc8yiox7gq7r5mel6q96rd6i0niwk5qog0fvz7y9xqkycbhdqsbwc7eq7owpnhi7884oyvfiasi8e407p2qz9gzkqzz19nk85mrvg0arfonqf3quz1le8zsbp74a8fc9etap',
                flowComponent: 'uog0yabqzu6e7agrbfxsq9wzg2tmrp8t3x2d7ziboyhl08cfsrhbqbhxp2gxw3az4tdxfj9olyyr9juqojmlk889ie7lstw7lyhsml0oru0l1lhcqe24cckvyjg771tvyrov4wgelsf1onmkg0j74jqoecf2i10n',
                flowInterfaceName: 'u27uat7env7f6xughvwfk455xazvqsx4kht57zx9qb01h5tvft35del4u3i2q1a01yju140dbhye3d9r0uykucd9y4zrn7ii1860tzgmghuu1s6y2dhrwbtzu5a8mfw8n24sr8niklfqyvnexjupzjl1i0bc6de0',
                flowInterfaceNamespace: '8umtzus2xhqt4lt3qee4diudyy3k2h4l8igsvkx09dqppseqwowarai1evf2ppu00wb8lut88trqxn3v2he87u5khq9fl803s6qcz83y5s2l4imgtpgi1shhuavat8zd0g1f2sdhn3w04fz8qp4etb1r99nvbmxn',
                version: 't8ctro8yabg5lj6j5jex',
                adapterType: 'salrgbf9r0m6p8fab0lqu8zjcwadcwd68d3pyp6jlsapyna1h5vu81sx6in9k',
                direction: 'SENDER',
                transportProtocol: 's90oh6syo5zocdqatmehzm95wuvxzwv9mvnxh47ii7o8vd0kxz14k6x6d1br',
                messageProtocol: 'r74q71szb4x4q97e9pwigtxs5ry6835r5egfltiyi916broh7xec5ranhjew',
                adapterEngineName: 'htiyszwkuwgo1j6k70k4pdtw8awjb8bm40excc5g4w6zte4k0r7517ro33cqyrm4lgpqs9p6645dryfj52hv074fdfc3m2zmu9viut3v1gf9rh1ks7pbg0y81pdht3mys9zw2uhqs6r0hk481340efzt1xi5ma4o',
                url: 'desio1uw7eanql7uk7e7r3dmjslv5cb75aygo79foi37l7cw2pdqcwbpa4ql7ulhgu857phr45py7tr8nijwuxxdteg5n0upipk1ucyfdja8ch3pjf0c1v6mf8bdss36brhithft434p8gahozsjl16nrzwe083wne24f2ymfobs34grsrc45wkd5hwkj1gdujui71rksw4vyj1y5n1zxslpw416eewzoqwdjc78er0b3yo80q5jg5sg59xcvja1h1easoub1jby3utz64geeacl1xoy3hnxri7innikbix5i34a6yzz5n9r79fxl2xz',
                username: '5ay5196fo66rcfyol05vs4x7sgkqdgjaifvnbj7jufkh2ffhgjsjxg3llr7x',
                remoteHost: '38dqfyiehqzggghpj9e9pjltiua7v9nxml3suu8huntid2fz4u3cbuwlzmwzt54p57i3erizhya7j3zvuypezky9i1e7o2gip51axvwyvdo173e1swwmnefumpkzxw6fdjb0xizg8usemgdho3a7mi99zdfb6lmm',
                remotePort: 3903880325,
                directory: 'al1wouid1jsufrqeo6w2tpozdcpdv7r9eus3dt5qm5cwg4ymcheqnez7pi1gi468f1dbqfp9rfjqgg35tg42ov88ltago135ul2jna91puh71ldq2jocu090pmk4vv1v0k6b5hf6txrvofwn7c1ycp5sfo7uzjw93sg4k1y86ny9846twbpowz2ge62w3f19lk36kx3odevuflk1q0um9xxm6qylua0futg5e5cg1y6ufhtmjp46q0x5r8bkqdhypo2d22ft5ln46gx0lst8ep3pps2jfv5gyupzponszzkbfy1fuj6a9i8ms37t5wxo5uxj4epo850msda5avdc5hd7fzjnl55sbjpl0az4bgxuy5lkm8d748p9fzz14yndmu9fqv2fh903e7qhjn6fx7xgqxix5spdirsasdfmpyew4o5ls7psdph0j6ux78s0nmjv5cu34v3xqy0roucmziab8py6h3htyqo1w0hldrowxei8hbbhp1zo69ncp50d4431oia922t0q5dca5zwwz05itkm9enmuhhw6xwhesrmw35ka9edtis6gdpvvq55o3co9iocdfvs521gvvt0x5ij23g85ix34a0a6fni032ttvprram4r56r9c36jd3v9w8pvgaladutx0eqesagqu2w72p4ydh2tdk95s1trupxjgb68dgtklffmxq7yd1jy0cxndlsufaqmuud86cksg76aynn21ffrn0d1i4dhr5il0d0ke8njcm8ajnzwpvmqc89rmf08l89qra3ttn56tzgap04j3c8i4b538sfgobhp4gndvh99umymnxd3ze9inm1ih6ykyrgpvaa91hqiw5786dozuv771gddfhkjzqu6t75m8r0z76kvc5qogehb75nwvdwcjjcnzl3ufzokmz224d4u64ng736gfzqiwa73to24yqsdx50p9poiweulx8bgw795l5h69wkbbrnl4yy3hv1rxin2txc597l776kaxgnukaa6aqfjx6mbl9v',
                fileSchema: '4qnozb56k9a9vc9iet389woa2s25vip66fbuzia9byefs7kewavqcnxw4usnsbo04m2zl55w0ec9cxau4q7df1l0ja6f0qup50uj89bufpzinpkixk0d7g6o373m04ump5t4xatfv4gcaic4tojcugdfiojio44b3sjxkvy21txos5gyhil8oz8s2zrumnszv3hs5dlpd051fryld37679rm3ghwkny4nj5b0qu856nfcdlds4tyvgxja5dmtv6kod804hsxkpwu0aq6pa4yu60jg0y1444j32uh7aqvf23n1vhvw2talelp0wmw5gnq2fkuxa0fs1v4el0lmvlfapcjkyzkfmmcylbzw619kq6z4sy8ribyqc2iij3hldyrnkpnpaxciikk4fc711o7km3pb62fdu8ztofos1ppy4s0meuzj91iif02swbnbbpnqwwlugg65olqa6okwwd8286n1go2n7r36nqoj7svgyu3g0f9a7vsb180fuks099kppsfsxzaa9n8riij56qkyz8drkap8j61y77sbausdir254w5rsmclfzlovlkk9g82q3v9gwpn4sayb9b33wv74m9lb955ityp8xcj01lb4hotrffj4gzp30adqv0xrdwf2ne6sjrr0e6mqmvd65iwahtny5eaav1qtar88nm2n61crbt1q8dp4irajwboe6oxgwaawbv89wjngz8z7460jy1wlzdar2295o6bzx2zliljaqc9owmo3kp7i1co41rxfibgjb5lwudd1739l9qfisnodwii8fatt9uruicxw3hlgnpf4poz10e0wy312ydv8ej1zcxsdswj0ymsnp2mplj1xotvttx886hfki43tmnfy1auigrfxddlvqgz9yt4jx950xbu4uuxper3mty0fctve9omh92qk3dm1ddjtfoa2u5aqkoo366dx4c8wyq0vxc2rhtamj4cyz4o7bj58difgk1m152uef6m3l0pxiwqd4btl908fdowvlf5zre',
                proxyHost: 'cpfp60b7a0r59h0spldts57gafueuc2eoagq5d05zihij0kx72s5oilrikhy',
                proxyPort: 4362467241,
                destination: 'mxciiyjrverbqxninyn8bmmaeu6z8rodejh0c58zqr5i1cee4eqwj1g6z1y0cjs0xkk2rxwy1i4iivk5v5copzh80f229y37lopgnkk850go8dhebru6u9ayh9d6dgyqg9xhu17aqdnna4l8j7we3szdlq5ohzly',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qz4w4fkzpc12j0yr783sc12v6pzob78pt5u1jg6elesvqrs2xaqb843bxmc8l9qz0jly9dd6yufz92ud21gcgzv2wiz1knoxtq6xvcrew5ptl998d0mhv8dssyotq5xb4h2za5uaj601uehtjhcfw9ucksacfgrc',
                responsibleUserAccountName: '295xvcwhrrpn1isdo7hc',
                lastChangeUserAccount: 'b9igevbkm23ix0ikxlyz',
                lastChangedAt: '2020-07-29 17:41:18',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ravuzd0xtw6ovoraq480qp0vgk07oev2vmzgpqy9',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'zhq9v18lhfu49q049edwoj13jvpm08r8bvyd4ufs0c50x8bd3j',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'm4i9jiksu4fgsixjvcva',
                party: 'm2eioxgfucrxqzrxgwbn1gcatgfmd7cqvyx4qgx5aa0vna7p1opb4vwivt74zhl512k7gknmigdu2z55vm2j453s4ia75hi7i11xo9d3kmcoi1vtqqg96zv5g1x5qagxglax6qosohb7clrxmqcv6kq8ys1497qp',
                component: 'rf3g0clyb8gx3zjkaf3qy1jv3knbm0l3omzao99n1g1zt44zytx75yyvdz6b8yqhs09xfu3cdxvowopu5b7mo5hiuqo96ly6s24tdt5vsbhq2299v5pkma5bvwy54qwsyf6wqoa7eldu5tveqfs22n4k67637ae2',
                name: '7ljkrpgzllu6l3oa6cdfacftaanliyxu21mz2v3wc67yew8qo9mrl7aiqy0q2bsm1uiudkgz2tfjkzv7dtz70i2bk2k008wl89z5x0gxsqlexssv2al05iis3fecqvyxvz5d6qam94jehyg8chckr87mda1zpq9n',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'o13h59tag2lij7nikub2oz6o8aabuaj7gwsnt7r48a4l99a2av8dv9tq415tsi5988qf1uvwe1njj6aqryhh5mmq9xdsu1w8bippbycugp4biz04q8yk1sv6tz4gvtqo4txzhk3q6zs6l06lrbkxwvmz2vgw5q8c',
                flowComponent: '8ri0fqeotjh7dvbp447s922w73wbddwahvkgakovz16bkdfk5t3ckevpldxpmyk2704bp6puyg6s2za13vghkc5hjdk4nnsjkt6xw0gsr0y7hn9jllmdg4gddrj2q3ih92wxv1w6lbrp7w2aoaoubsb19o43i1i3',
                flowInterfaceName: 'yjdd39r0jozjew71x41ige535zaxseitaoo0ecjqsu3585weqe1529sq8riot91hwbwz5a2cyv6fig9klc45cnn5fjeq1mrym8z741t4kaeqa5t0v622emfbygkju7cth56f3mzjja62hcnkq8hojsivikj20fnw',
                flowInterfaceNamespace: 'bwjxv7c3bkatgmusxkmqq23kgfucs2rd7k22mwor35owqfmsg0ewvf8ko0xjwgpu194qiw9v49dnt9h103s3puw7jplciycl6exs1f6sd1o745yhot75ans42eaooc4e8gp2hvisvl4i5d6asmxvdizqmqw8p6c0',
                version: 'pe0hxzykts4dl272m2er',
                adapterType: '3gp3bhes3j6ywubhi6fk92grsh8x9wdlpqpctaol5boihly6h8w1jwnojulf',
                direction: 'RECEIVER',
                transportProtocol: 'y88kd6oq2i6a6yhryru9gsc2mif5lo9rj9qdfn4oq6d35a8nk3el6ilj3fbb9',
                messageProtocol: 'ctgadpzxmdl33dmloyyf9arsjj3yk6o2y1w7shrh2qt6e7jer7kkdlc90r1d',
                adapterEngineName: '0pvrhc3g1nii57ipt1r99xibqanreqnoywmbrl5yrhr12k6pc4672q5w5hcdy6nyi4u09qiwidaxinp7jhpxg3s3sm746ikpbpvafspl43wc6zlzp1uhyykpx65xenx82es4bm67ksrdfrkyzog241fmt3jmfsad',
                url: 'maluygy5ur0zbe35xu3k4hjjk47hotjg0nbdunj9qgsgyc4tq1ire66snofbs39eo09l3mpsgcll2fk6dvo7awq2c8b9w6qomimnrmzvijodez7r97dgf6snnu02mwoc86djsbab4bom8308t4njfzohfte13apddcrj2lxku7j3mjaeljs9rxdpr81w4ph4h42b5uhlqmwpdv1q1zx12rv5iu5p2igxq3y8nq2k46cbzpwt9b24vjl9vm0ucqzrtrdu37fn2weknayyyq6yvkezsmjq1mfmexafs310phdwr51s1bgcal7suhs0cd85',
                username: 'tag4u3aj0x1dzs5w2wi33unca5j0pyhyi4prus4glxjg1cr5ad8glfi6isiq',
                remoteHost: 'zr8nj69ka3p72r693msklcxwq1v10ihilp7m4vp41r62cx85cdspfbrw4u8av948nxsh1ckp9drtxd6sdtbm8zuui6ta1ahmrekokhxlidhsvu4n0ez78f6umn75jtpr46t4b2x9p62lyw6vm0ecqrfsvgboiwj5',
                remotePort: 2563625372,
                directory: 'x16248s4so21gs92ch7hc68xbal1k12qzs9lg283nxlkky57jchl5xezh6xlu5ywwkcc0zyshp7wlo7pxk4mivcfz9svwqf9ppkbnz08flj7cdwkol4dbrlhi11r6kckuw0ps0gp8gn0ufxqgf604gedji6ym9bnfr6l6c109hay00spo83mw9c90tuwyey9yikabpwmwhjwtel0dlj22kb0btmuznc1wex6f372wdgs133bcro7ps2h7s6j6ddtv9kd20qn8axcyhtpldwe6m2d1vfmxgpuclp8ktr3voqbpyyrsr9xkl1oe5cmnr9dg9pcmqliormr29xhixdq0bh6mkzkx305tx1cq8g6wblq3l6jejnhd13k0d1ax698i09ils98bq0jb1xvzvnshej0d5e592zhuq91m6xmek97pzyssidw9dwqvqdurz5etyfeukmk2vrcxtuloj3kiqakgz2com9rpfx20k0xwsfr2yet08pn23g7rerr5zz30xj9n8m43pgke5hxmxn4ztsv6d6xku638exf0mn1p1wnvy798c0cp44ln4fbn8q0hhn5vn9oqhweojc9tmf0myusliblzxxeabxy30dqu4c8dzeynmoukfc2lz9tfas7wcdqnbhsuc3pytmmg0k4y97vir1rwjxx90f75drk8h5d6wui98qazdkxrnnk5yss31y7unvlg3n3kgr7oxxf3nzn3tfq1bnb94ka9r78t9jrwg23ht0eqrph8axppmawef6wkf4lty73izo2dhwz6521m4wqwobvva9rcv24jv4qj5c976oaiy1psytwrsm5hd93gttc7lvywbup6mv3j0qtnbp9t8142ujkgwdbzdhqbj473fkqg8el908kpp5n5gzjcbic9o058y7dzzsrk9dzfjmr8jn3w5y4la29rbtc1mvrc6jvsnqn7dj9ce9tw2xwt6idudavzx6bcalfny7wg9jfqkvvdk5gpacfi9bje4wp1z5ysvhbsrgfars9',
                fileSchema: '68b3geof3ts7idzxzneyoksw369xujud7ac4wb71gqto0jp7wdiqzsmct2bvnkr2stw7tv22065ywdx1jqidqprf2nsfratmwd8iszq8ey3it9xwgckwk67wlvqdgydbwfxwhq5amf4iu2z0u4v8tpsfaeyfxpilpt0a6m5gf2qo3bw3h0ut9sa5q845qkdq5yoqkdj4jtjr7hrjv67n445ah8wezizgv6amsckamznifl2tso9nuyji15gwwh3fp4mor0au73ic8j1y7t51hjw53hxk3v65k9i020nj46csfo6a05bww3gxcw9jevt7q5p7vdbeztgkkmc0aoaogfzwt4glkc9zjhz3j94cclap37ytm59j6jq0a00o3rxeu5zgfhshle0xymzoimae6h05z0ecfo7agde9xzeobp26981wix2bzjt42a6cwdzxnaqf6v0efjiff3c1wjpj5mq2ikrdloajfiza5g59kpcvoou7d21dm0brag3sfmku7vqbo7lxz2cm6yd46ve56yqtzpc8fukmd0vtz3egvrhvjfimd7dl35gyzfl5cocqyzd7xgef6aebc9u5fyk92ddte4crqt1ih9u9p9g7m224ghuox9fy7pol0k7j5xwlic102hlg1sv50keuns2x0cfpst017vbobavk1rv9kiupajzh9wb7wvzihxgiu2cm5wt3j7krtvmbuf4ozixiczz0ux7ikqt114ij4yb0k6gie4ag7twiqm0tjez4qijelyc2h3xei0il90qin8ir9cbffmcwh408pg5uu4xg9zsgjaf6tv9bpkxc92sxfy68bx8b2wb6hiq24x3alsrd2vqxb2azb39omzb8olh2ngyyv9bcu54934ycjsl7ps1tadn77xhrijf3aqa2whjdyv8w0zhxx1zfvy0oby0eu19uxd4j7dau7dboe4ae9jqh2emf0x740rew5ftn3mf7aeuagc6txv27xmhop6lvygpl9hyld4jvzfbj6mzjq2oy',
                proxyHost: '1r0pyw64qg7yefiyp3y60e2m8cbfhwlzpvifqeya7t5v643r4g8bosf6pwmz',
                proxyPort: 3137224603,
                destination: 'uelojfyjdxcrtd7jnhxicku6q9pt3yctnr3pmx8qg2z6mqdzs7fgw5k9spsrt8hxzwvt6trm2tiippvg2sdz2tfpwoie11ykb3e33ln3913ky1zvczud630rs2hiypjeol7gxl5368uls0v4tgnzxg3c4jnkckll',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5yjt8b1wh9743gsj7w3yosnw32q7wd81pwhhryvgfo85p9vi8lawy4h6yq6e755vygkxj3cp1bifuztqt0ckd2b1nxka0nf3ognmxdep4o058oqiy6lrl27j8krdn60m5g54azf04qqas091ocngzyill9qhk2ss',
                responsibleUserAccountName: 'fwkioyew2a5ufi7c6edw',
                lastChangeUserAccount: '5ognzciugqxs18wou6mn',
                lastChangedAt: '2020-07-29 08:21:24',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'fnbgp024lmzefg0w9599zy4n6bvund86phlkkfv9',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'cl51kugmxiymtuqg0jxim1ls5a3qc23biya98xyb9go002r1ts',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'iu8bu39f6n76exdutn4a',
                party: 'mpj1jum5tzqe0mm7k60o8zldgckapnl44oq2tfckadwd3mgya3lvzs0lssean6764c5aznpfmjxcjsvd6h97j7up1y258xd4kxa1fvoystf395jk7z56aqyv3ldqww5y4fahfohnxxpgk9romett89bmrlua0o5l',
                component: '12rt3vajwp09gtwc6ngxp92shezc78m61ra9mm4o4yk6skjfldou95k8ngi0ou624r7urqxf3u1fbzosaw2izzss1kj00gxwkkjz2jy1zx1y0aypfusr61d5g52g1xh568hqgjmt0arpyuczlp3as7px6si1ftat',
                name: 'tq1x4gtt02hxwzih9n7ui93j6izml86h4xz4u7lygy2r4hdp31h1np4xtj1s8jr1wnm8hnxphzoriey0rroik6rhr5geezx92tgg6rfchzfsmr0rph1hklk3fzcxk5niiirq16omumykv7rwdn4n3ejwff7fyiop',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'ysu3xqdhjofkj4j5ncj1xhxpbsitwcawj48uqr3ihop07ks8qtsm0fbz0npo7p5e6m12982j1165ped8oeityp7vsyu3k1f6z6en1i274dtkx4ce20hwis40leofrudjw7v11izki7s5kkscx8oa9wrx1p162htg',
                flowComponent: 'kewm3bapsb3zi1luoonrqm0fqk05xeiyorj9j1dk2s76pa33lz0z0iy16q74gjgkvryj3axjkqfhgrtew1zak2rtud46xltkowi7meqorpiwputg8ee2yzw45u34cp970ej51eq4tu9gjz4lxrd20egraqd84plu',
                flowInterfaceName: '3baj8hopkwr6ot3y9ed16ls8dzgru5g2v8wrxhk81w08b3zyw33mxxvdxmtf6xoktn3z0hfjuv76qp2h2sjsxd2zcw2zb9lz0v8swxcovmsdmw0cdniixelq3j3v1684641ggteitczsumhc9owoq452kur48gel',
                flowInterfaceNamespace: 'vwxkt9a0ggutnoe9ie8qpqlhfhetpnyhe1ic9p49yu45tpv6sszd5o42z13h24w1h1b5ciewws6ek0esy6p6u4qmtcnsvu4xjp0g2z5y4msdwrn601rmt19e4l4d28jbnhge3kb5b0w5f4wd2rpavulsvzrgjpee',
                version: 'hvuy6kl7zwihbbd34hso',
                adapterType: '9tue1u6b5fsjtxd5j3wvhjif2vkd03c583lbxd3bg0qo5dtuujzolu9wy1gr',
                direction: 'RECEIVER',
                transportProtocol: 'u38h4c23q8e4wjipxwzpvrelqs2okg7ur9isyly6l4ad0lzmd5amx38z6ft7',
                messageProtocol: 's70z7gh03xuerx1k35zkqzz62qw3batnx0152uoqq25lgbww1x20g7tlpwzu0',
                adapterEngineName: '8zx7kisx3vkfa4cfelg6h4328rmio0grrl3jnhkfie3rmalze16ekjedqixizq662urdy8jiod1ei23jzwul0w9h8io1nquyyp2bsoonawof1tpm80tfxig3id5yecl22qhmv31ukb4ly9ciyxsrq7oaey6w2bau',
                url: '3gye2xlmlszd59vmh8hwgponp9rfvh883djw04iircbpo29q88uzpck2zt8kvgh373ubz7be4trnmohtp209qemasmwrmyvyetvgyr86tq033n1leq5eidpkm5opbcyrxgg8wywbd3tl72bqgwycsv4wuxll3hs7lnrxabzhqcn5chn281rkjxxk94zrlokoi593ktdiya03dhfl6qbiei57wk7wy57xhselxvz4suu7upgbyl8v0rjvtedonlt3v924r13j0bp175ckxxuuxmikben36ofue6xjhcdy2b18joxqsxvnm95p1f444obd',
                username: 'lrxwsmb2g05iptzrths93tc2f1xvfrnvrp8ee22mjsd9cif75edgsqhyy5li',
                remoteHost: 'a3zju2jubzulvo9l28xb2swty6lmt0ni5uze8gpqze7ldx7x366ms92p04qd4q41rfb71jrx0a00ulvs7cj7qpiekmhme6z2uvz62fhsxfjcpph5499sv3ekm7ustm971pij6ottx1u8zirm1fcx2gu8ud4zf39a',
                remotePort: 2434610883,
                directory: 'hsn0m8jnqhk0h3ahoxvoo38m19cgmekevm4yykr5401r1htbacd9oneutn5ivou0sqtze5cdb7ij4wj7gemmv698pqp2mamix0iqhsue29b39xq47h3u6mf3y3blr87p1ez7zbnozrj4a0g3rdcltrlnhcgqgxrxnsfvia1wf9ne1m71h70omvjg52qq58f355w7anfco718646ikyki9vwx60wdn18yjlfuv1s488k7bcjc0xpp1ol9n3ezeghfanyusepg67agccohqjl7de7uic04fju6djl9727sj4sqko7px1oo45w3fvn2cgfrkbgiwvbzcgbsncaubfrzva6ut2zkhjcljiq7twxsukpme981ef4cyy2y6mu78nxld5i4l6v1hez60bghagfag5v0obpik6q7seqq9xy9t7hzp1e1b3fikmm8c553zu8xuwyg5pc954suggcdgtru5ywoses5v9qp7qps57h13x5bplj4xo4l9p6c8yq8hie142kxxpvhzzqfgvncmdpmd83xagrw3oafygb15ul7yve7k1yaxpi1hfabv15tysubzl6e4dyi9qhn4g4s45vr7cdbkua1458nerudjy7i6qvo4enfpjjv45o0wav12p1z5j3sxou8vjcdhldzi3eil5n6zwy7wvqy9795gsiaayv7e1tyxoplnw1bmko7sx3ygbafp7o5hvjkv5ehev5zor41o83xld6ow29uo2kxmh7izcis746f42gyq1xe47gdfnly8g3nxi0fmu78nn32l1uin4ra1dgj32huaf6jle3y0tuh7oyivu4ydzq2puhud93q4dxqlx6d1qai9tmzllbhfvvjksdpend2q8xi0urnxfxuky5g0biomtvfvodlgncfgfkxlc9pbnxyxlmrm6tph63skzkjrydguw3ygd3uvvnfjmnf64ze8hzyu04itjcqa228e26eaw3s2tnnetw23oshn3y50n3j4j9ea87vee5w1wogrm5b4ezbrh5i',
                fileSchema: '640f5x2ufqb6h0vv8p4fbythpu5mzxbm7mhioj6r95d61i2bggelevgnqudvivdyhmtvv4iirdyc9smk1cciyua5pwk1mkuo07dx10arbngdf18tsmpe525w7mojqr9sjrhcm53oow0sixtj85rj9u029z84n33j2cna3bnswwjg1whty93ljk7z8yq62g16i3pqiljntm03lzgg5zq11kyltczk3jwps97lowylzo9t2u2837vrs063ko1q9lkm79q5q0zguwezlxcxks6iicobogrh5y7t3ymmpfogces5femf27rfh2zyhm703uxt5guvqaojy3a6xww0ikg6qszy97z2ygxcanjxj90f324cksa4p6cj1b8vjwbz4jbxw3hh2liu35o0aebw7o589dc24yn3pnrkfhcco05p6wc81gdbzgeib7xqmpz2nv563bkkcgsh5q3menj3iuhzfcygf8ujm9nn5zdimkbdtpdkh2npfwp6htb9szv88z9gfsuvbr5of3ik50nef2zyuwhlbang4y1w6b5ekc77mw0o2sfgio8lhw4o682y4x6bed7xe5si3tvod4mvsi1yrwrooh64yhm1fu4wseib9jnvyhu8fgvp87embor458mk1b0hsrduic6v13wg1fvso039b9iml4n62wztykbpoqcxuzgfm477n776gqi61ik3a41znojyvnoliw75vje253so7jth9a05s2ed3neglyixaq538mccpw4ey05c0ewj2tvitujbt1qxp6d1fm9kpaesbshc3ko46pbbf29vzo2ixbx2z1265w4jtxf9fy79w4w640t3n7fo7e068iioixln5gbyeaczaa6ee5g9484ofhe321nf6su0u3xihpf42tvnekpitjvldqepo22k8y8exklogul3z9pylbauvkrp3p6eccbks7vm0glkcggquh5i7bgbj2tk8wg3p4rnj6lei1nuw9v4jfo2cglcapc1g0ub236tmmqse2ft7b75',
                proxyHost: '50a9rszx2iusqyw6e8l2nzbg0ax8t6vzpi03ykxq1nycb5lzkr22o0sjvba6',
                proxyPort: 6279786864,
                destination: 'nsfqzx6izw135ps692lo94fnrcdpyyk5ahcsubqlryf957va8zqyqmlyo9uagz6qg6f7gof146nddle9ehtu73bbzagy6sgm801gddh08s8xe77sx4rhru8f6ytsdkikftbnfrj59agml2emnxdwbc15wzyeae6x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's7dg2jbqvmn7cnpd2fsvrtfqgrtm0y1epnochn6oincaeoz7ome6wzii3enm1ynco0x2uqay6d4pghb0wjjlelubz6ona14p7z5frks4nwfiqy1iotf81phlfe90mc5gnvh79zy0b528tmyplji5ffm0ti8yjcgk',
                responsibleUserAccountName: 'u8nczfecrmalvd565cfu',
                lastChangeUserAccount: 'fpbbg9s1io57ytv0tg9t',
                lastChangedAt: '2020-07-29 19:28:32',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'eim2lnr0dozgz47lfh4aladcmdholeechc08mqcu',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'j6avel3ebifaqadu15nit9ppo3l1k3lvrqkn1v5ztmhr43wqul',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'ivy7svnlsxaigvf8v5pb',
                party: 'fae6g05xowjyr1s09quonf1iw3xr474ms1sn6c3084hvw95xvpwaqoyybiemx014wfk0m43ubk1fb0okzx88xcraoak5daxoap5vde8cds91g5d2vldnc46y5vbfoim53lxc8zk16f33xa1ex1jy7zldxadosqco',
                component: 'prbh4n5y9alilspj1c7nsbp0ttlvpyfwj82aek372y4rp42cqdus2xwgs6z0h2u07imepejy4ofrhahk3inni0hzhqycreilaqlu01zgz1etbefifo0s9rxg8gros0d19frlwaat0ed5o23zkpgb6b7tjcuxiydz',
                name: '0rggsz56sobr7alwr0wadhrvbhhfea73zjoz79mddy431483x7quaqy5e6akcd7ruol13wy9mtkk7huvkipkyj73wiese1o8f1oyhrax589nynponizprfaehd57fmwiyn9xjtd3l1g9livjvobmhv8rkfaamlm2',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'nxq80ydjpp4fapl12vcl7a4dhd9widooypcw8ou4z9q9rh7pg4n3g9yk6izrsszqnif005n08o5bqrjrx2gzt717wxs4plb52z9cb7e8glhh5lheg7i2l5iz63isoe6dalrepyp3s5wp7s9455vrcff6z911vka5',
                flowComponent: 'qk1oe17e86v980gzv47bbn224twxl61lmhos4xn1rmce4cwv2fg4pypnp6dk6899bc20qnsnd34rlrg7vb0ite9xymwy80b3z5xvtclrafhldwn499nmmxfkk5yiixuxn64hbe99s2eo47x57jqo3avgw7ihht2r',
                flowInterfaceName: 'p7f4y6r2n1ubzokaun3nld0lv97gv1huwpv8i6bualh9oqdozbr5e8gjtbw7oyrt5scujm8a40no7q0lymym09lln5ehesnwz4kgavlewy1te0jvhiyf0c9bi6i6xz62hx520xzefrcb9wkswmj3bsd9ybln04ym',
                flowInterfaceNamespace: 'lou1c8gqvpjprgkowah5rz4fp9lx6l6iz0tvu5vl901e69zodffan7e6pnb80d19i6rn7py6ihnbq6mp0l6khgrtoyhnckwrn2umpove1jt921xgai341n66cv4eku8ssx9btj3zduzplnlfr7w5a0prcbdixm4d',
                version: 'ye149jznsm4syjl8glfw',
                adapterType: 'uvyiw5splglzf85hpeoxjly48krnfl1wdvfjspjm6yu96znteygqa58ahn4b',
                direction: 'RECEIVER',
                transportProtocol: 'aww0vyfrlz47cfwcxn45s711q4uhyqq0lq50il06bgjt7sugx5s4vegt32f8',
                messageProtocol: 'axxtydazteckzrm7iwtqhb4opxo1sh66ta4hgvrhjhc1qy561q9nrowjkzsq',
                adapterEngineName: 'l2jwsfyeip1dv6kgtgkjcrcl80rmgnc96zagi2mysvsh0ibi1pc6qh3b2qqp6mapmvvdlby317wpvoo8nq3kjrvqfue5htvtbe4fret6vkti2t4k0aura6n27vtun4wivk1zdhonxio0qn0i396lvb7bfxasbcv0r',
                url: '4rla5s38g2j4nvgbi252lieci3jnl0zpzfc8vp0w1hlo1yvzqvacyshtxy6cqwej5s1f89854vi375axd0s4y4oevbdavangmc44haon6es369ynkphrzhjxev9m83w7urq3yzycxysk7psot7rmn7j5gwejna16gj0ko9f244mlijflim8a65a6bbxpe92x14c0ub7yfkuz8wg6rdg1r2flurmhq3r3ykuk0qqq3up8ne758h374q0c5iongrxvv2s184i1zxfro47ayxjbc6q8rmhc0mb97sxkimp8e4wdi6thisr70t97d6n9o2rl',
                username: '73wa28sf7i6eht4a18er7p4a0eer20w66t5r4faerzrkzgdrmidc4kptrtd5',
                remoteHost: '72vmqce9njdlbgo32ftaa9yxo46l1hv5ocxx496l52pgla76i6cxdpcw7h9zvmzme7wq1xkl94x71dfz3sumlj8aajfygg9lvg0tcu3fw8rnrg2zw8crua3caavcum05i331r89ftky3ouf6g977t3fau3cih2ts',
                remotePort: 2709376871,
                directory: '1n0htjoyjys9prq71jybt10x1f50iq1zpsw66v9z6dh53wdb9etxia42jpi8awru6h1t3j0jbgjy5c70c9ak9n1g7e4h674175ryphmahfqynfesyz2ir85oeb78v6f4xpvvnp38rxhm6y5lukuyg51ws2wb7x2gvnzmige93ihvutnfxq1gwew8mpqbzr65cg2zy0yv2bnsp43h61iwvycgjyaqwoirduv2cejno0n5bd2wrxzjwsmh4qga6w7f32e6ws152p02udmt4q4am1ttnw522gmn57pbag5llnk1xvf8dhnru4pt8hxsydm9outpuiisl599u5hdg5janxdwkze8b1onvlzxexcd0gfsu2j1189jbhw6bnww6g53nemjpg94p60cuhsu282n2abkwrtcil6100am532he8lqk14fudbcqdcpuhnfm2786r66aiztblq4yocnflri3a3yas6cu7vs6fqae7m2ch2vagapocoa8noidy90sjmqvutuweddgmtl9tkvfhibqk6jk8gpjx8dbb871qk6ueu0cq027n6js0gqq09k9jmr6vk5logk0vjjtr6j4hepibkl82yuisxllvbt275msfapw9jzjwr2b05kig4rzx1dc06a7x6zcg18pu7493mrb56y9227krlecfelqedda8ecuxbhpwk2875mdzt4h9n34n9ppx9lumfrgh9qbrhdo6t9t35a96n2yy6f8fe3m7jq8ph6c2i1o3wd6j5jm2sq7enkrb2w5c4e8bioqxi5szmdtp5989470lgdp975vmul1xss1s1qg8uhpr92jfpxcosoimt0dx593k5lbahkd9w23rne4zm6noi1tfgrq9mdjo972gh0taxdoihudur5ri7tiprwlcl6j9kq3uvprzn1trx9cyxuq0m3fa0fswstbzs17tc2i15mqpcrp7eopfi42wp53ce7owwlhmaf21nye08iqdhd28gyv91xwnli7xceqahxhyo6as63e0hf',
                fileSchema: 'mauooe3pyfpwpfw216i0slaepog9jz76zh8h53y1piwzpawz31scup6bo53u3yxz61bgqjf20aj1h0yt21thgbgvfmrk6wr6eta2ujvok07f0udq9jwvbthcatzz52fer2qtimvcmcbkz86q9om3qpvujeugsz0quy4q2jgkuvvo4zzau6lrdz4re6fwgl2xd3zsw6ce8hrtu8ulbqrfl22f6xiki1v8flhjkvijvelcbg378vkgnv036etu88zqoo5ucijib5j6o7vyr9gtgt2vocmu0zkmhimwu5mi59yf72ij537t3foxi4w5wdyhsblkx2ha273kglf4xf2hdref2etqcrgbpq74zrflcv8k4nex08h9d4ronba0epvxaufzttopzbqk05minlb6fwvv8h5oqd7vv0q60ou1rqe8st6d8whux0qimxd9zkuvcxuv91mgjcusledintqm0iyjyv00nu9dlqd3lkpdc8zwc91t7zzay1m4r4w3c5xw0hfyokz3enam2xhk7wjiqbji1vehnrzzajd6opnx613gqxn3wr62sqftkbh6fsijz2od650qqvb78fcn3jdk8seoy18ea7kdn305o6reewatl0yx6zw4rqvqskjezdpd1ha54yj6lzuxrkcf02ze2h8187u3vgffhc26eagy1yemryosf32aqnqy14ipdv5uzf61xsblfvijzc4uponjvmadi07shom65zdlzgs4avtxoa1mua18ec32efpbvbzovnfkgfhifrugbarqx47pokdylvm8pzvxoxt3dzdcs9qhzv9x44np7rnu0rmkn7ux9b3zjzuewmo9td2d872jyqes3co6tlcnysz4r2lei3rqxd4c1dwrdheywf0c8y3gti5dolkp7nmac7bcy3xqnq0hd3cysi7mmhf2au4c2cpd2mxx6en3katrneh4crlcom7hbf6x11fny7z7xvdz45f833knb4ye6w8mts36uyd5aazn2i4415u7ln14qqpx',
                proxyHost: '7a86ws8dehz1y1ik6u50euhinbpenyhwnnaxclzly6ln64eqpjtz9b8d6dg6',
                proxyPort: 5920240830,
                destination: '46ui3i7uq99dl3r2yc5lmljpn3unkv42srbcse52jlm7mq4prgggncfjlxfkjmne9905melo2e4r98ybjce120rs2xy36w45nl9wt2l826d791114z2n3m59nnhf6z5klwie7q3zblnhls8op41zb568xb9c1n2c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dwod2xyaafr1sz2ud6hfkgy9gmkdw3cb2rle1jyikts5k9ufxs4uwz1ogvoaksoqe9tp5obecee7csu1euw9311rvjgc3x6skbkszbfqhjimmx8daknv2gw8hhoorrfnm3zeydcbq9cmhce8ol1qilu32eetqkkv',
                responsibleUserAccountName: 'sblgbmezp9v1b65lbvlg',
                lastChangeUserAccount: 'fo5rj0k3hhgdztdc7fp1',
                lastChangedAt: '2020-07-29 09:28:16',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'lu8jfzt39054rxg6au59yl6wj64tmwvqpxd9ubzs',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'b3216kzg4fajbt7mgkp03p81cxcgxw3r2huvnif09pnlkhscdz',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '73xgcoienljeh8hzs909',
                party: 'h0fhcmwg4053xyialxwyzyt8u0la6mf1z6xubmklhza6lh47okpr54x8ektniinqtxfhb3iofqggu1ym1dtirr06y40o7km44agmc1012gmxtigrilk53qrrtgv2r1bjk41a2c143ioztsak37nzxo4xq3feu5q7',
                component: '2nwbc992thozko3lbweyzhd8rjdy6rmqe3cgzhc6bjraxontikobypgitpgim1kackeflechs1wpg51jvfxkyu2mf2zmvzspo1tu1guabtwzy3j2hbccuidjd59p895knynkwsbi2mrlcodqrspsjbl5qzwvkdj8',
                name: 'ly0df6i2xngap8et4423dx6zgh9ll930jov880w6fu1ibkbs0rfduq2k771c7n16y3m0k0sokx2jh5ngvf6s7ffo8tsuv83kh9uqmbkog9dxe4h25q6buenb35a9ve5dfftlw8fq11gk10rv4vrukztynbe3fi4a',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'eedffi1xx7nu78j8vh6t3zcd47exq4k0fdtb217kdaavb3gcg2sqpqqgiys2surrd6se5f6crnl0dau7r7jzf2hnhl7geofbviz1d80tkboc2dqg85o46qualr7obs2jf6g7a2kijaxnfgy5kj5ouvbttpfo70x5',
                flowComponent: 'm3x4n2suv8mt9f0rb99ezqsxovrqs7bd3eaelr70k4uat6typ9u3xdp4k5qgrrg95yz4m42a8zrqvan55wum6ceahi2i7tg5nxhxdzw9jz2cbjm3bumwx50ip7s6qi36moo4k9bemcemsnb9basifcws2w58k9pk',
                flowInterfaceName: 'b24j474yb8aauo62jh1yq51u8n6310gdu29prnkbv4ll4f30xcrqybz9a8aadnjcqqrx4t8cimbq34m5x7feeitfrwrlyqva3ml4mipuuoc8nntrd39haubw5a22ldwhezpqiko6cfk0li6k30mmq5nlirsv1em5',
                flowInterfaceNamespace: 'uqjf2lppe53f7xlr3pg6ls8tipd9li7mse5jkowylwd2zt7dnraqirdkfnnqk3qyjcvrj79vi3zoskpctdef2j6796btrcn8b9rbnbyykqz2iwkf3prttxull0k7nchmhr8ehfpjt1yam0qhc52g48upa2jmwtg2',
                version: 'xgxsct0ajetxzry3h9et',
                adapterType: 'r4jdth5gb2kcmbnzfk3spi0bopqowuqq2rps31prl7ddh4w502k1drlqexc6',
                direction: 'RECEIVER',
                transportProtocol: 'e7g1qpzyqgb1yd1xiakzo549n8pbdp3s50mdx89ali92nlrtr2y08k8r5626',
                messageProtocol: 'a9rgrch38z94019cfhs1hli8e3iz7payyjbmf3tdfyqrcbwqtrnzxnttnren',
                adapterEngineName: 'rn4ayawcgjngywrtzkodiv6m66nf0xwtjiu5jg1e5rge45zwgc21vv24wrsuel31egeoxq26gd63grvvh66oeakb2haoep9mtnunr7bdsx8ijiwlr5v6y3geogo8vwd8og04s4wwgtq33l4zvusumxkbirw8xs4z',
                url: 'xmsvofzwf3qg3xef9rplj4b23dtw65j8nos5hnaqspbtvmdy2m4bxd29op5p8tr9l9jvrene92ipdxpi02xnvfgedmt9q5y6qs0e8ej9dno565j10aurms4vgkcfh3cwuk8z9z1qzvap50k07aa09ohd9vh5msfqa2enzyz0bujnlh63cop7vj22vyp4mvh5m559cz8js9t5eintlwncklq95udxtc9kau13gyuwy7nbf5ajyivslptrhzk7vi9nv80ho3lxln6n7x6mqd9x4rloqin4kbms8gtjassd5a68q2cnyxy1nqqxjjdajvawt',
                username: '3fn7dai58dh7nbvblm6tfkylrxardkyw55zqoy2yd2wdf4irr76c7ojmqsn5',
                remoteHost: 'kd17xb7fcxmflngua2nxts1rmze464niay3ht7whvj8offak0h6r7cv0lnjrafvbce8dxdlkdwnho1y2vrgf0htu8hgkgrrfct1s75ougp4jwmc2vvm1micg4jin169bkup5lufqqkyissu20j74szjp2np2mvma',
                remotePort: 8390934349,
                directory: 'u68aaru1uszft5y41sd0iku6fmi448q04hw9zf9lpivtvw0knt1ou72mtkuuzpx5omnmnklqm8wegorxby53btazl3huajso7hvylbg15oel5dkqfettqi8b9oenobmy7wp1jsigxzzcarxzatfy96bra1o1px6g0v4fo74n7v1cz9wm3m2awejy4esf7kxatz1s6fh72c9zdlvtw6uov6hdgxlftc9qd80wi1mufcm5q55sx6lo0qwj739dtd5lsdfvl1ly4z9kgzabbzl5rzyh1ozfypigxjo32ne65od3urkdqe6rhbu3lsrmldsar0hklbhniojv244pz9ibjrqq420ofmq2fh8h93uef3uckvygv40qwpbqfwk7yr98mdozinnnsrr8k6s4fuac53es243w6o7l2g5lehqpyqjxf6l88ecths3ddwxxzjs7f5k3ycclrlizc2frifynoxxkpr1hi4a0ld630n36hi25b6oypbhai4fankb0fzdug1wjzni47eaaabh341tjto4ysczxcja6sc1kowc1mikebse7s950k1e6vxd3wuyds6oqedw5075410uz1gtn8ms5vr0mw25ditjkrl7mzaz7ebvuqhbfa4dwlg7joj1k0zdaujvtteennqnkhwx3e59qfmxyvimbwa5nchczjc2q12irnwbzdyulskdy8x77yjpcad4vkit06k3c9fmzfyowvus6ivbqbx45u5pkmgjzxbtgnmciw8piaxukrftmmswn09s24j3o615zbsbebfqnfyh7xfld6l2yp1g9u0fcmc30wusdmt4lvqtuyg3e9ni8ek5jn1fdaqeiawuy0gcozagdb7pmtwmzw3htb0qm9vtwu2jc52op574wr7gqvx1prism3s779n7yur3b8chcl3e586hycnkg817g2p6jecdys77gwelri1mbl5ocnt8bpzb21j8osbql2c8048b39vg09gjf4doeby1iv2j7wzui47puc5notwnsfbr9',
                fileSchema: 'nbqgyozdmm1kiynwtz49wyjujkxaov2gpeynf2l2oboij80ftd7ltywkttvvf9wy0a6zugmqij24933htyrzluyy6lvx310n1fvkp6xhazd3dmox0kjczjv8miper9ih2305getsr3uakmxgohsau5bvrb92ihoagwy9f6txkmtdp21qbhsxdh071ryyvy43qzpw51pjmpqukecgzkii8edouwafqlohz9t6ogpismaehybg92qgon8lum2u2bohu8vww2xq9ilijoff7asf5aevhq2ym5fwvrl085j5jn7vcyaztn14jwr9qkr6c1v04he7huyfye401djhe5v4adnut3dz9oin2i34ml2l7621yc6r1bca0uow99jisguf97swf86bxli7hrwsmnm65zjrzo9kwnx3s1xzvqcrjutup1xjbibqtaw3074i12gjyfql62kcjhthtww3g7q47sy2u7uewv3fc89ikyo3ka794p02hl0j5b0fybn5w81nxunnkpb7zdr0qn3ev9hqlv4fm0mphe3camm61epa66ig71vf98u7flh6q12n36st9mkcvk12v2wvnbd5z102fpfcd26d14la7ja33u79sd9ck6dt1sd2sgk4sm08vgsqisrid7pte67a3zv896348p29gogkn3r44rdr8zvw7cbo690tr0f4vksru8e1oiif1c4vfq3hsarg4409vyoldcfeg6j6ddmlf7eexuqrsi4zrjna8rj7zussnwsqy2p6sin8ids1fynubk5pyzazxzttrm90786sk217td3g9xy00pq3hg5kxk10by48e9er5k6mxoa9a7ey23islhvbqufdzimro5ps6dhhfua77mlnlxxszdg49ei44yy3z397htftcv6otk8j0e2ff9ub875ta97ufwj5l5xnzm26y641fg2hj118tny2i8909ppk1mgvop5mish2qdm0zixzv3sf6oqwurbefn348vrq3arhfjv46k9i6afiicgz0ubf',
                proxyHost: 'h2fmdjtu2173lyeo8x00be640r3qbr6g17dd5vhgd6sd2eagqz946frs0u3z',
                proxyPort: 6536297702,
                destination: '926o60q2zkc5m8y03y4nc4rmohigpywmz22blv5a8dnua4pw5y2jtvb79qg44l6jvc3c1gu47sgsaedvakzuv3683u2a9b61musyoqzt3rf6csqywvax0c36eo9idag6fojf54yovgf4n4agv29fa5ewlai97anl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u2ev2diiufhu5nrpsk8m0um4rp78dxmeurgfplz6846oce4bafx9vnux13zm5fp0vvgxv6l6fmzoczur1qbdcudoyki6wdz4z9hmgnxv44tu4rjz05pbvmg1sjhv57ywi91omxf4csykq9be597qofe5ujln4v88',
                responsibleUserAccountName: 'y5kgo3foggvh3hnn3gxb',
                lastChangeUserAccount: 'j4jy7nh8sd55pojsvugo',
                lastChangedAt: '2020-07-29 17:02:04',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'w43n2w4elz6xie8pea6qpwgl6dazfmx8u7ekmycv',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'vzk7ps4uj7z7o1tggmxs2w780mw9kvreh1wmq431jgdk46e2jn',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'xblzidb31bxe7g33l56r',
                party: 'tdvii5y9i674nahwrrgtcg49ojhbhzzlyclaz77gmdn4u29eywoem8eycwrgrez794eq6lwrxwu4jcgz8uqdp88u1bowrn1qfjixvti81xjcsolgny7nqjunxagm0v9081civd0zpu8cofdxrf6ssi6q8mkrpu5l',
                component: '4rqyokohwei7iba5dim2oc1pg81fptvf8m3afrxnu6x4cet1tasx6h1iu2gywu2hrra8ho67jhddl4njfpu0wglgey1zpwmf560j7nyw8zipg71im564gzjwxerltd3rb4a1rq7s55qrqkwr0kvhkw4j4oo9hsb7',
                name: '2m6zxt8hrfk35ghivj11mgig7tim7lexue2nbwv9aufftia46ig7t9hoq9m3yvqb40si92z5o9zt027bg5hm8sixwnt4nzwif050musxgn7w1ccp6qwybftsfunyjpj7hp5ai6v889h1onng5e8ar1vwyrol4tsl',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'fo2nvncr9nnq3f1vekajogmgdnu3xhtfpee2uznn8i7pa7ek20ptx09fwalhyqfrsljo94n33hbo6j7l073nqsi3lqkv22vrllkzhva347bdp0gxuifgwey2c39894cs75zsylm5krl1xpih6n928l0qunzo1965',
                flowComponent: '2r2yq50ersqdgwcji2cmdaxsuyuw728wwtu2u3fbyjcrm6nkylat5kmxkfg48hb8orfup09s8k5mxp9w4frr6c8lfjygagfzunhhozl5hoxuey5qemh72tqdeg5tpn4zitbyzoo7vkll1qb1jao1mbyl9zkcewmm',
                flowInterfaceName: 'cnp97i1gtnmhzzkvg2srmfod92jna57rv51kubv0hw83cu4iom7e5g0hann63re3mnbpcch4t8l7yuo351n115geclc0gzw8rr7zs4at2jmow9iqisj384sk42r6nzksvbt725jfv5wjtmrr5guhqxkitqmng7mk',
                flowInterfaceNamespace: 'vx0180ovuysltlg6d1hi3pmdt00074dtw2wbpj7sajpdjzmbs0u2kuy687fobqnvta3zhdp6td65x0i4vuw3gi2i5w0izipogko943ua52npt724od4gs3mgbvgmvld793ixg9tyxw1yluh85p0j0huun5nsgq5x',
                version: 'x9g0okp94tnmmuer52ce',
                adapterType: '94owj8e7a1epnsruz8xocgjkzr3a751064t9y54dmc19zebjdrlq5dbkexjt',
                direction: 'RECEIVER',
                transportProtocol: '24erjhyhgi3l0jo5388trx3058mpyb2chk105ts8klfdaxw33o82i8kmeo18',
                messageProtocol: 'piyosamm2gb8c3i36nh3avxty4s4ykzrby4e0ygsn3jkvmkl4kw9tz13uiwh',
                adapterEngineName: 'w087gp4vbp0nik58dm4gbt4em0ffn9q4ebzj1ctxt7dsf58xl8bwtxck4d0ah2rfkqxssofrgl75k3ksyhrgm5rpm695e7mx43ol591y7s1hjobctgmciytylacpdsb2nxr45c9vvzfq5slozs2bwaifvr2823tp',
                url: 'qmunkgw2l98zpoy2z9shad0y7h3sfeoo5hsq934pq3cbfc63dw3armpiey3e4sztn3i4gb7o5phfzpz6f2j44twl3p9ix0h624cso62xxjyj0yt9xz8qx3gjx1jl9wnzbx7wx5wye5bt5q1vpf1gu0c9uncb58nzdy7xmtzqr73u926fkkfj2vfij3zqg7n66zjeb4ma4dayfhcam8rny83inlz1wrli4l1m1z5f41nfcogizc8kfn8ikrjk2uwsdckg6uwi2no2u1d9fr3d5g6jx8tcbh1os1ug2t7j2zuctgtezjlbj4tmwzunry6r',
                username: 'racf8wjoscfd0n1yt25wg5ai9ij0wkmkn879tzd8fg3fleo08wdqe37ihhju9',
                remoteHost: 'r1h6kclemyhhjvssa24ixpwqdo0e9tqxogjrue3i0fhlds1i2mi75mq8j40uus46ilnpvw3jgbnfu3trgknzus4q6ffo2jl8pboxvqsivmk1youtqdwu92j0qo55mm08kyvmon2efk6rc0xzgioly4tj3m6t5c8x',
                remotePort: 2624308672,
                directory: '77muoqq0cmd1i6stk3nozgi2pg22h5kx9dc4y08q587on66o138it1eslk4djau3u4vw7mayb5cyjv49nravo61hcs7klmcqw43fj7cibcgvkqpft4my2bki1du3wdwqk45s38t0psuol270cg4p26isd3bckbod99c7t6wl4jmg93o1ui3c55g23x4af3dyv2owwp812eekyzmv6036boyvapeai1e46mosxesmxkvgzd7si7p6m5kr73emvxmcxocnvke79fbq8115h2okzg08z1mobj475gl5zv02yjqjvlw4reg596mdoishuwwch4fyme368pmex66usas5igb9guyetn81ntgmy4fjwmshkmtnid0w2z4jy6n5jo8xt1lo7cnjtu0j6l7hmj79odw1jmcvauoeo16nm5smbi83ft7sgdfz8k54v59edodxyofe7poo96j41trv6ui55bdbwasbyrve83iyv0cveg1h6yj1guw4pfmh415hnrr7edn2ol5qzwqq871p079rrlhaikrhd8ztsmjg09zmsba3lupa0yaoichzq1zj5jhfnuv5jdn1zpzaa008n2rkqmxn0q1bnviig1ywf5rd38r56riqv1nqydocmz3ib07ajp3jj7gatopyipq31pbijzvyjmnag8w6yqa81ior1i9gdhbchfaq7xj7hkmbb2igw83wg5h3kvcp1fy92c3oltu6jxvh99hoaku379r08kibot229ce8j2kplzgjyclx3yfqgfqp2n1v17yy31o02svjr2q2gqswl1sz2mgq9uxhd1kdcgxlqu6o24pggxzy2htvu3q9a2751o0k98ufsnzvhaomc73k3a671g69o5willhptxui2ds3bg7pg5g4v5idfglvf9597ppq0vacs3ljzu7fj0t3jr0s2m2k7nrt7uqbku0nbfsa5l9e4nu8d5f1fjx653y38chexf7oxes4jx1gfrh39hbgsownpgjifxa6mqcj6miieldcy9db',
                fileSchema: 'qze90htisfyubjzl6bxj480iu2y9d6m16iy5y9kqhpw30qkac66n1smp6wbnt4ah8dq8m8bm2oehrybb23emk1cgyjxwz0pddf7g81bvo171w881uidvtzyxv9v2ijdu1exy64efjoyp6lkdktazmy834n7bai2pv28qxj88fhd40e4jravimpm2u9hiiee9da5tuf4wtkm1781t3c4teq1rnv20uvksnkgf1osb4u49pnlfadpyrp3j1ruvevudl3aynalciwj5o2s8rxplm362fkux9vso83acbd42jztx1u3xzo9yj8np9trcriom7dd2v0o76hqw5hghl1lrxopgwp0ie0lz1kbmmkwf1nd978dtqfumen3pze0tw2u7hqf7vzre98ehqt0m0er8hy6h23j9rd62jmr5l9io4y9nym438o9ok2rkdayv99991q16ympwzvx34zqt0xxka4o8ethmatekvxnx8ah9mpjao06n3ajq7m5j8mw6x9volclu509fzlyaqffgua2oohzgjizbqkmulq9g5i2z4mw2mqsg1yh1r40ppelvxslr4y2mnnxlfpol0mcmvol4306pelypis7b0vf4kl6celvf8n5l17j1u2xs8jbavgxv88e2sj7slwrpjprconbxvwv3g1xpkljvoie88pify60zq2wiwf06dy25oa9o7gwan5ys7wqx2zpbue0dv7iou47kd8fkfxg094iq4638hew3v3ifh824uq5dbpydvjukxja841nyawf1pgxopzj89yxjfpjpxc2poxnjaph84yo99gorskdz6aqo2btrybd8wezn0bnuxsnw1679ges78x3a9dz5m7abyp28ep4ossgbob8sz01ve2ctlx19ynoylsuszeb0bhsrifyf9vkwrq91c8qwdth8h3x9iqd6rsjw7q0rq25w7udg7wgfd2oa19ovuxw09x9fnzbq5f3vz9dzb5w2dy21t7qiailjn5hz0xautml62nxtryt5d561',
                proxyHost: 'yqqadkebiu0uj2dr8b5eediq4f26p9a3ihrq0sfqzsrtag5wcacmwoes2dfs',
                proxyPort: 2616572639,
                destination: 'hs938xt5qf0p8d2sn7f8wlgdt5i612cbd165pus7f7kl98jwsapms7ew1un7er7fovedxbalny0ouw7z2zwx3uan576r8miym7lj8yelxrlk20uk5bvsjbflsm1qkxiwpncb7o2ffsfuwr5oa2ojqwxg2koo5e0s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yt831bh82uz2sz7q6rb4aurpmsauvc9kx140d2qdzhip27ijarl5go6d3q81rrd3dttdnlxiecxidhll4lfo31o0v107hfox8jun8ul6d36opbeij546jwrnwftza0iphk76dkd5flq1r1swqotvgkfzrjla790a',
                responsibleUserAccountName: '9c690sx6uro5umaekmcz',
                lastChangeUserAccount: 'znbfwq4vxsy4nd5xvt01',
                lastChangedAt: '2020-07-29 03:59:37',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'twvw9z3syqhoovzf83rcso6r0lqx773dmq06y698',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'tt1z2ynhbm3onqvto06u9aefnmrcy7o6m7yl7l6fl2dbi5ss9j',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '1qfrdoowud66bzqifx3b',
                party: 'sa2pnwnrcbr9thgtdgf8qsnfe6b5eggsa7eq7sbgjua8vz63hkvtmnn5f0n3cws3hetw3szf5s0jqfu4b8x7as3wel83mtdzuwaahuyyy3d6h42puaargiu0nfiuo0k0dm9zu86v8awxvq9g40u7vvylojyuy81j',
                component: '0km8ck6u3k1klxhjusokwdpnw55k9cql3vzd3w2dtnoikd7jdhlgeoigwqgux86bzahqvsv8zrhbg76mkxrny9jnno5siaaww8pgal4z7v1g9d8osxnp92w4x7sh5ndj7cuqw0cfbyczkgiel58ia53n3myykgg4',
                name: 'rveee9a6mptbso9xysx6wok5phpu9a75fy3lx151aj7sf5v9pa2dg4z8pw8xlidvfshizohbjo0w0khalbgjn98cf1hpqurrlo25lue8drfj3cfh8l6p0i8vyokrmcx70qf436l8lsvmdsb5s8huh41rn6vc63tk',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'dle1oj3ygs08n1zalxyz5e7ksngg9b2eim7ct04wrcw74nyph6ji28eh5mb3de2u38383bfbwsrqjquncg7kdmpk5wgqtzcfdma45983z2lgc0p83ze82hpi6b9m4qront92l46wa4yb480o2hkwch8ph4kc0840',
                flowComponent: 'l9vski5gn14njo6hwoxensglysf46xdgfs8pkf7ot6uwqkror7mf9tclqwi71p8xw8v3som23tgmh5wqz1o6lp0ukdgqpo1yrz97ucv7j6gf8z5n8nhdso2emzzxizob75uszcnlbybz34re27zswcja9l6uddtv',
                flowInterfaceName: 'cyy6ykeo9qw3qyx3heilu3w10p0s0ympmq0yv74hjtkq28ype169yf4mv9zn9tw8sxk7je68fm0bl2n1kzytsrglv8flkcfrbcb8a9m6ub5ju59gtvn1rxuzrkdktdrumik575bxl4jqhax6o4ybuig88nur58kg',
                flowInterfaceNamespace: 'wcvb8omu58jxm1t9cxcez6j0ok9xukxlx71w6wlzz5740f1my444qg1djha3k5gj44tawnqky9efd3vnt641qb46l3dh7eh8psdvcqqhtsx3hw4wddx11c0qnrpdo6t0035ocp5snc1bp5zc3ameq19xv51y34i3',
                version: 'znl3tufybz01zrqq1mb0',
                adapterType: '23l0w35tqu58gqeqg51anid2ic0o003lvejl89xydxy668ojycmvjhi0kpqo',
                direction: 'SENDER',
                transportProtocol: 'p0wzdhwqejvs7aiiwuuh9gv4ixetkzi704rbzkij5isgpxjgcc01zo1ik1ia',
                messageProtocol: 'lvejek8cg35yk9knkp8k7d8rdjin6vbrshjp03z72ki9ag826b4wmlw5a7b0',
                adapterEngineName: 'jfbh3w6em2s0y6t26lc80bfq0i44j3sqxaprqcr2okn1fggph7p8dj17e9mz91ub6dy7rnk2litfpseasd0lap4tjkav1zlwqthciojgs33l2hmlsgeoa3gktag6yghmv07k5zbwqnvjm4ov3si3qnr9475irwu3',
                url: 'x83vf5rdwsmt7k8syqwveyi8lbjkqanc6oiaw6mbhwc6t76e9aupid6h35xcrhar8pff6jh6bad6rtu9dtmu7zdp1llrm6bcxnd4w0axcwpxa0levztr4m4nc1rkq5frdj0swxesglwaezzbchutagb3krqfxqpxv8jl8b7eldocdpih3junzwx62fsg7ph3bihzt2ewazft992nul2zpdcnhkr6l2ydskao24lur5arrm4wskelpi5acx9zbtkxjxy23x1zvguhn6ywrt3vw7ovtjzc8hzaet4am08wj05wo14qmv2j5mb1pala43rl',
                username: 'ayorypla7r76zcdppdd1f6bkyie37btthi9s9ixosx0mjgt4q7xufzbqbsdx',
                remoteHost: 'het43718qcraihxbsf4p4rzkbj5lgmf66a2obdhc8cgrsoeacarji3on86rratn9xufmzfv7hcxq03q2p9mknkjjrn3j55kbhqir3gytse7rwu3nf2xuhe5wj5fzr3i5so6v0e12qk9j2048r27czjqgkze5f018n',
                remotePort: 3999169878,
                directory: '704m21o3rz3h5nge9ui23yqls3usr2xeu1wub6chx02tsmyfz3i8xmwpt2sgl8ojrpvkxnhtg5ls9c7bb9r1l213fr0lm1parw742rfzic46izaq890fg9umit3dpg4rngpilnt0txrcd4sqcq8jy4765g82192cfit1n89inegq2c4cyxi90j46b4191js4g4vg7enxxpl6x74b2wcy8hsl2c3qorxyd90nl2yk32lxltxaq6oi8oiis8bnms6joo86vqnkb30togxylsgcpv1er0bhyt3vpfcpey06kmiccddfcqe7wm78x4f8eksgvg040gy3az9lwzzh58y23lv4xm2wevs9vubtywed675fx4a9rggwc4wbyxdukcylpe44ezm05b0dizpjt4us1ept8ufrjuv6qgq9sbq1vdg75j2nwe2con2lcrkf6gud8z9w2c7nd0w5vm58q3dn75vtnisx9npf4ykob46g9bwuri7mwtglf2tw0jgccyl4mn7zyx89gkgtbaj0jh80y26tq2588r5muiypel5w3jnm7sziisrqbcwlx7yo22gv3hxv47yep24zwuflegnpyneh2jsq9ulypa2kknadkrz3wmro35h35dnbv35z1h31impbio4ecgd71vh3i4pypvek7f10muy34yyw7l7o1jxt939tbvgjbqjodc4ngbjofr06ek1mld07bpwk31vu5zf8thgsjet29h4yqimml5ozq69p5g5tmki4actudfm1afzwrnpdbfz5cret94v0zb7ka2akvbdjxizs9crb2ceso8ttlaxpyz95ukcn3uyl8ok4k3uoyn3u034xwciif2k4mj53923joa84k2tgu36v263ybt34t9nbylxu6k92dcetc57kbpm9mx218l3dsvv0gzn38pmgrnor3jmm2gk6qdgf4lg6pmago88elk2kel12j8ii9d6ki0a4dgcdz9fzrkiexz6wmy472bjfsnerdu4ubnuifujnor86ijkr',
                fileSchema: 'zslt8ucvpz61hqk0lhp4sgwn0sn3jj8883u9xg0t4t1fxibb9ec2ur1owoe6m3ynoan7248ttfsp32zs55nmkny0g7ac96w3aex8zrdqocxw1cluzqob5kv0r56lygurl203byy4h8xnben1zqhlr0xg4tipr6bcvwns7bjtlwzj464971d5ebat0tsaot0zcikj9sfxwv4rq0guhv1gugviqassfsyrmfjyv38unq6ef8micdbmjdon1sixuaf2zd04up5mmjon9gascusbznk32rn4sb1y9bqu1u4xs9jmc4cjhdss4kmpd6o98nr1hqj5yam2326feoctnd2xulglfuauo2azpj8pve6o2uw1q2yl1baxhlz6pqgxckqtr96a3u6zka4ijbx5d55rn89wl9dpweq8eah9913vsg5ufqad1cdpwpso4tdcldhsk1pcpaimm1rvzaqkxu47aauvm3h8zye6r5pacnhsctm5syjx5kn6lwehcw6fsod68nslv4805cla5peey8oelj2plbk3w24w78eilrw7rd1051xsn89surhr70ow0p6wpk4od9xfce4kb8twdouomymtli4629e5s4utqfoofmpkk0atl26y21n481efr6t37jszomfu8u66e4zjlynz7fxafn7yzlwotf953n6vzzybvt0pyaovyo23igyak8mf791epj2wgjg0nij1mayzk3azlkbf3pkn69ba396cnfgvj03zgwbs6tv2q0ftvwoglbulfo9z4yoapvdd3honq7k8yce8zuu32zdsnv2rcv7493nq8vjdtnp2b288ko6imdue2l6z5lge7wvghk2i5m6h76z5ti2goqizuvgzfjsr6izwj9x4zj4nhmufh1wps21ivdpbn0i53u63vgcn35450p0xuisj9js9zvroksfnw3enk3qs99proi12k3wwzy0rntpk99dyy3fpv7g775krlg407kt5q0x6zyhv8r8aqq8uyc9qh23ewly3lzr4',
                proxyHost: 'w1r23qxx5vwbaneruxmr9h3ogjcw3vr2s2dw6vukg3pzylnis8d89y1ysm9j',
                proxyPort: 9672318527,
                destination: '1ffzd9ily9fqtuky59oauc4mmtvo75dvt893j6v2bj04w0ix89sghnewlmxv068b07u4jhxtu4e1zey0g7q3nv208o9vxm87x77m123069nx4aevpol0ccxvqabspcoiiclh97jffiue6ju21jszjiy9delz5xvj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5bxbmjksfybfmm31gh7h15ubqau6r35qiuz049qyq9e604mmh9k6w7fogpafx5zfcb9nfihsolsa4zy8cq1osj4w19cg7j6k1r189ygyesykzbl987rqzku6udmmbzib7evp219adt5tlm5rgwnciq99sam91ijf',
                responsibleUserAccountName: '9es1k8h1zxjhvzslxjc4',
                lastChangeUserAccount: 'swgfxhnij5en4cd36zm4',
                lastChangedAt: '2020-07-29 23:45:27',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'osms3j9e8j7qb6vnndo519r79pqlxm0nmdj8zy83',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'opc3ev36rqv7040pbsdj4zc43p03t49bqzjaetd59sutu67v7h',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '4i0699aomxy97m0nbbve',
                party: 'ed4r6il26gj8csspslbfme9zqlq95jc0byn2bedh1ogk27u1aawqls2k49fvta2j8amxdbd60yarpsyp330clj6jb8o3d92evgv4boay2u25nip20ry3kldqtg01e1n0js7yfj0o42igtlwwg6jyy51a4nel7taf',
                component: 'ibldap5ey3bq7pw3saar8u3m38prg13fsbn4id2rom4r09dap3h88qsrqisj26x57gjkk1dbzkiacrb3006nhd6hkuafg8b0rbm53ist3s4357zluq94f9u2wa79icb2k3db7t2le9ne579oznecc2o5vb35dp3h',
                name: 'e5ypeynlk2ikddfmruog802zn8rpgb2t55au7t5354olbkbddrc3nn8f8vcpu40lkdqac59nhoe1671h5m614wyuyx4euc9gkfnk81oyszlnarprhpq3dfbp48sh8db4s10jrgovjv7oq9jetjyntvs6tx7840gb',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '8m8xlfwqp4odhk2gbgmoxbv18ei93dxgxql3yvg8nib7b4htec14t63r6sirkyu9q4eutmbkjugrzwaxp5w698jumnp2wayftvqaaapjgpl7tm7t0fyvm8vgtt6u70fcazignbqp820wxib4jvummeljd7eewrb8',
                flowComponent: 'u1myr60zs4wwpbutb2qv6n1ug0f6h36dn0hcex6xc3nsd4pugnx6nnkcjbsu08j9056uo2qaxv2fwfxsmsvmzjvmme09qkko2qkfctu8ep20spk1o1n560drma15c0yqqr3e1hwernxfnvj26rorkyj4vvco4tgb',
                flowInterfaceName: 'ncw85z7pu2flyc82ao6beka86a2oe8yr37gb2jjaus5bj70dp97kdvynawybv76agq0rq5inibbp1ez856pasi4wukwswbn1m6nfxfs8glxicgzhl7xxmmz6vx0ecrdsi0jjvouah33atfgqnpqyyur728p6w513',
                flowInterfaceNamespace: '8slxydrt3ugt52sjxqg9vyph34ifpmnyrim4wp6ay0ekpup3rmrsm2musnz83jrohgi58smyfis48gsvfm51edlm5iz0qq3igmuwzlhs2al6ox3gjhwptxsoqwuir7c6g4eo3s9ndf1yc4k50q42q985ca643dot',
                version: 'smu6m5yxmqa3n89givxx',
                adapterType: 'tvgskthuqdf0y0njaz8bwcr205bkclup2bgm2xj1kgex0hmr3qh3oiix3bl5',
                direction: 'RECEIVER',
                transportProtocol: 's39jbti1k6tgxls4tni12dw75p5yrcgq3f7t8d139gecfj86ibo72ask6v1t',
                messageProtocol: 'tjejpjxeugismimg4p1josn1ff56kifs9fooqmts8gnk237aoww1d04vahbz',
                adapterEngineName: '6lgr4xsfvrvwdqxdm21k3wfhch0gsm2ce9fixb9ceodvge21uc2e6hcyr0q9o6onsjbcw43swc3o2srfpdhoky3o0dunbspo2gbhj4ek468p4sytml1hz0cjpuokvc07c2fv8rba4ydkl2ush26yr13dhyky705s',
                url: 'a0qg4kwjdjey840n3kgx6xxfbv304s1qsjzr7xqttct5gi5v6mcneyfq408pd8fnks3kvujtg9e2t3gtchybuky8q2o1dpd3h9aswu2g7pxeg0a3fwlyytmblsojji8dffgauf5mxmmnzkdkvseqa3s8wnbbo3z2gdbuikf51v7nc6mitop4r7we9ha9zlmhrh2s0qplwr9uws19jyy6itdefhgrgpj0h3lb5znk76rxx2e3my8ta8m30haeas1i11wfacws8gn3zubmcen4v6veraddiqjeww1v2dp02u393fiuchybwxsd0p6feiat',
                username: 'tt0wlosuvvvjcz4vhv697aeag453p1dxqr4wiwql4dew2a69ag92b7iazz7f',
                remoteHost: '4has6df5qiu7o36mbzqcbnqizczlinbz715mb8gr35kfoojknqpy683oxzhl6aask91owrwi6w8e1sp59uxxqmj3jtgc56xntrs0ksiyzofq5x99a97lqclmxocsd8ckclen4dyyrb5q5t5hain5lo9xolbsh4nv',
                remotePort: 88842513648,
                directory: 'yc0yfquvh7n4intv48ed2t1vpz9vcrzxms7q1d3pkqtjvm8lwp04cir52tzr41v8bdg5gpkrioq5x9f5oqyvp8w22nudsg7w1qo3j4iutksr101ov4hcunec3djg126164ofihrpod5vlwtsqqdz2t5ub9m4n9s8pbv1umnp2tzkr0jrhtaz2es66rho0ilqoxi72j1d52e1c6p50xm4xjnue7kfjidxz5nvnymp09qinfdx04j2emngkw9nbff7y9ek8e270jnkf9a99moe98v8dz2yk48zt27gmxnpdadhmi29gygu57u3aakj6yu0tsgnnqhl9ltbrxq7vilhy3cvknelcj2jyoe4s0avpo8y651n3fgap3ii363jldqr0n014w8p8pkol7hmm1ieakspjgnvf25kljihlk2staulb3dmdcj4c4g8i51qmtf9vlusvdzmdxean1vevn9x46xxak7iexg0lix57r92pnzye9e4riph08iha9uhdul1jcuyzzg5xd7debt55i1o04x750e3l4mt2yhcnikmj0e8pctm3bu8dgep3ue1x4bkh867sd8f3zxsj7m15d6qd0eh182mrqdnm9icbmvauzh9996n7vl8shrpalcej97p9rjtnrj9fonlvanmzhcsa0aobxphuvx9ydhf5vm6tmx3vn4ll9paa6mrdweptvob88wc2dbxra8t6oyl7i3s8pw99e54fedb02qb22chqpy1kgfcyyuykokzx4s9mi5bgwcr78w5jih2gi6tt67yqxu1rejbkygsro3gwr8uebpt883w6h1ted1jgt9ct5qx0nzejwlc9ctvxo30hwqe9uyxlflh062zsou6o4d2f8ekypzutethbaxrrh7nr35p431akck8p67ky4wzxhfkpaigwfy5dfer2xixfzfskjvbmhc9p88e09dsn46ns0a21ushqxy5f3diefbh0b2c97a7a7szoyjwv0a15psv4bhvcgfco00qqszxzltauwv5',
                fileSchema: 'g352n2euttnptbm34yeceqa7roz5e0bdt3ef7868enorqbtjyezf085vv4uioceapr0ac2i94k9aqmyfs1k13e34zb6y6e01cjbp4xz3sssmn56aavuc9asc9o1rtz4kdnm7h5251x0h6obguu5amr0tx5yv6egdr05891hzcls2lu6ccfk4h6z0f238ntiut4h5wrywa1rold9ozytma302j5g53ji6wsq6uef8zofjm9te2ofhx2mqexblfjrjzmogj6a0f2qh5qdc7eq1fkaaxfmgdtw7snp5zf1pffgktp6e0ae4dhugbdy8k05deo6svdb1kb3m7jpqeqhfirzt4vi9146dt82eylcsd4axa4plxmr0k1u76p0tadv2mbunfuiou7r6hktuena1av0h5ldvwknqiopm2spqv0nfcsx6hfepz2wlfvxs807907rl2ml2li3gtso0j59shvhv5cu0l3q9gs5pmskz8ve7ciz63uuvfn7n94zobcgiml9yniezaw7x75fpyac3tz4tzxa4ldrm68868vh1f7y9srcnaesy7k6w5ipqel0b3e84r2nmvpa93m6a4eyaflxdl1t8hiu6vsqgy4sk4j1g4ushpyylww7m8nn3knstgpz1la9au6bgbl5egoxzpild2hnvw2j9x2ef38ec4veeur4mzhe5b0qay3q4395ckimt1z110pfc0gz36oo80jmfx7c6h3h2rfso37hgn7mphchgats27gfuzc7bjguu75i366jxy9za6j3jf823i93cvazl205u2c7ue4yot5kzj9whgwuijw02923dmuq1uvobbuh30orzynp3v3iv9e3eecv0v9qlmelhjljcnjuitp7mawz7n5dhwzh7heiqck3fmm7ch9rklrugdv6w6w7r2nguvqsduz5o22nrn6ikxovc70hsi1ntxxvdyqokkdaklql60fymt1qctrvnfrizk21286z75pa4q200iogy0mb9wocj68djc9199bxu',
                proxyHost: '1qky3weyjoquctp3kyjaiu9frhb0qbvlxdy29ezdq85c2ypx5sfseba3tkmn',
                proxyPort: 1069961998,
                destination: '1dddpg67c07sw7gjdr0uvxuzzy5kc31q9worer1rbwrxgq8o04hm2f0x9fbdgnbam5h0vrgbstrf0vw9vcr48ezi8gfgtg2zd3212b8v5w87j7282d610kq5gk5fwfpybam53xkeqrm3usivli1g41qet6eaxas8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9j1zathesdge04zlygbh14ixh14by84thnzmttpj7t87yrswwgyoo4smi5d1qkl5a289ltmao1jer62rnywp047wazrmzf90kkl2jmo1wgw0nvxdqq2h4db1583rbuf4bcg3n40647s4fo1qnhm1ozsgkmcj1bks',
                responsibleUserAccountName: 'vki5f957s025ysc6cn1r',
                lastChangeUserAccount: '59shg04av7443qmg8hq9',
                lastChangedAt: '2020-07-29 01:54:04',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '0cmj60a1k9bg4hsxy249k5ykxmjkz3m8mx31zayx',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '4e6k2b8zu48q2vekkn6qh2t1io1fargkhfqmv7dhrk5lxpe73f',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'nfh6uwutechjrhijdd1z',
                party: 'edex2z6q6xfy61x50o6avir25m1c18148lwyo05qogg9sdaene9x1jb7tcml5b5jnag9mbj1gduh6yn7yln1hnivtntrvbiae232z5xscc48dsouczl84y2zbln6u082278evfh1qzab4525xdvxl6pxotr0rm09',
                component: 'wkmxwzu39sxjy73r0uw0eoph9bp2xr4ys4ue706d5dyfx89q95xr91daotiwoa6rx3mnvrn4o9upzh4rzb59nsdw2gly7pjpj7z89j2q8armo3bvv4v5nwxo0yv48yzy50g6r7zdw1c439rc587q3kvr5bmp7eyp',
                name: 'db3b4j34ebod0b5j9rlx7uqd1cq74gr5j9rgjtcmf8ufkipi2dh7nalfvpp5mbcxilud9or26e1sdelfs9hcsedmm06bqwrgisi4fo9pzs5szdcmj4td6v4ptdtox64fa4xa3gi18swbhye8n8kjtappxxavewtv',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'p7k15oihihrz90ggdmh3hgz6aydzko5qt7bv0r1r8gsuoweoftng767hoo4crwphl9avpip5bgmqelhe1f8xrk8i8y3dee4vtjvysfx95lzw2ym6bx0uiu03421xjumkpi0uk0k8sj1lf3d8czt9zwzfaiqomlwb',
                flowComponent: 'k68c55pmwlw9a7rmo8416lp3mib2m8cctwqopr5sa5rygle8zen7dbgn7zr0a03q18qhlvwa5b056bhlfz6i61szfz8vok7z8y64499e2yaheplbf2mix58eribryr256bdjpo8fg21g8nlvv1mattfuvljcuwpp',
                flowInterfaceName: 'phdwuja1r10zr6afer5wkvav9mfvmwl32i2c2ocekuidky6ffwqulv1e05cw5wrli2d7ubr79ky7n9eu411humytuqgvtsut0g9i5v9x85fzvz57r931wr2q8x86agfvjhgah15kn7g4lorvzrvgsbkwrtugjm0q',
                flowInterfaceNamespace: 'tm9rik7wc13gupydaacc8h64p1duqqb0h9zpubnksk72ygqw31gpm2tew6uxt7osakv17s4tezshtmfccqdai6053wevry03nbvrt8q2mj6pve8atkqz3asodyjmsy6ynhqaczlqzzkdfg3ykpbl2vsbkyclr89j',
                version: 'xvvch86yf4iv2yp2tlff',
                adapterType: 'y6t8ic9uruss8xi7wojls1grrchhjd3q31gxy5lgbwrinelorygbr1678tqj',
                direction: 'RECEIVER',
                transportProtocol: 'luh7yofmedxn6d89loshlup059u46ifs7g0jr9i5o58yzptlsgthxjas1bf2',
                messageProtocol: 'z074wbndrghz2592dj1eqe319r8wi3dcdw3rpa8pf6ojda6d28t8l8i6bwvu',
                adapterEngineName: 'so3lvssglfbal6mkhkc4eqxvvu0f9y8drwodlp4wv54mzjxidxuct5pqufsrjara92rqmqpsyhfq3mgut0wx23atbanlxfpfk3kcfublcpvlihlf6fumcvs91r2j7n70q9izntp9sggtqc5ff27agjkfmks4245o',
                url: 'zmnc667oqlnjdfuwn0s4ktgblwo57s7pebjr8tsp4qpvd2x4zysax11e3mocu36vgs2t5uf2tzbbsupm836lhdf8yctexzvl5bu8ba5del7sxpjm6enjxyardpahcoij8xf53kc30vlwy4hx22apk814rcsowz0as03abkcn2y60pdkkp0hatmome6mse2sr5d5fugr8ta7anbfqwtclmbkcv96qqcbeqxjb260jh9xlwbb3pq4zz1fhbiuh46bzue4dhimo9t2ku51vvslmh2yi84ia7hkpudwnkrfmo3wfk7rzike0qsiq9skh4jma',
                username: 'qq8ktehjdt6usz9xobdw8gsnpi48r4a2pbirkvfm2142eshh3c313ux7kpsq',
                remoteHost: 'msm3wuf6wtt4mvej0ttno8q7uss56opxanznnabytc5g5qysg4p625h9igcnwpv8lqna0e438xmuje3skpi71f1ior8vffw8vzd7gqiob2mulm6pe6yode2nitvlje6acpiu9no55h7u8r5y2la5wth2mgxr50es',
                remotePort: 9548724303,
                directory: '7ycnjjo5bstuevzujm0eijxfannw6sk8z4fy288vrfyjl0jdwsxfwnblypwufyvhwzlgwr7m7ljnhng6pg3ezq4hw6rtjist8if32jehqwyp9oa1ka3j7rxh3me5wys4v73mtgqj3r55umqlt4fqzhbq3plochf2tfnedzmy7enjwevb6obdp78j0dz6g5bmj7sm2p5ekt81jhl0de7i7a9xuo507ue7ypqqlfuv3a8zyp2du4d5fe6qewj77qlzr990kh54086oxuzcoj0s6q175u0hho6f70gfs4vi565nmcug9p6kymbfhnxxghfjmdvbs85dm0yeruo93qxxn5temr88lshrmhalmr5lqy3ahvhv2xj71hz6c8t9xs9z5wlm9e7va7gsb6l3g5zdnnivu628irnrr3fuopcllah4qxc2ho83i717fldngo2t7yo46afo8es7uyk7yvi7ezvl1p42riryk6i2yhlq81i875de8p41rxplmg8fuqwqz5zm92fpzzl0sq9z7881vsattadpg4s76g0ypj1fqoxo4ijn4qwtkzawvzaefi9sgilhncry7ij8o233wgzgq6v25t4tj3lgr29bbrsnlh7cskn4qb50fvoa8h6zta65i2659xjjfjdwb26raoee39lxdqgqvzskelqat1jhojinf8hx4yhbmiabhdty3cgc6mm4ql2hfd89gjjgmpvk3451uozfwh5qu1v2yc2h2cu7ifskevp64g436t42xj4o2wqc2mb28tr8l9p6clksteexh0zfcnpco3x6xz7mvnimbgkmlg6h6p2526peys5vdz83a2qog5sicisnj6mw6t4fbtptbmnwpf3jjluuxstqxc85ytd1ffk100vhva33k1ckvsoo2616laqkjooa4dqeiwtjcq4a4ld1k80udvakm94tpisz23looy8l032s2foprp5s59yhfstjamdfr3hrteruswmjno7didfifogewx840ursf1244p9nuvsp1',
                fileSchema: 'uundl13shkhjizmv4ckhjoc68f4jpzghyn2w7rvucpk68vcg05csz27ecjex2vchrphzvv8ppyuf76qsrexihey64kvpblecf8fq9klfq55ktphd1pw0kjzdnm87vksrl3w2my811os942vxqslpbbqeyb9hoaj8libvfas2iyd7lwrgd6bil94uvu68tmmig5rh120p5fvoog8x3bw33np98on5o0vykh9pg66ts3wlts6m1vqvrrmay2j9i84r95mzagbwow08acsm0siei0xt0asyb0qnrjkaowwhe7apwa4j9ahwkr2smc0xox1vmvilzretn2oa7dq1ds6xrs11tp6m4m4nyt7qecvylsqe7iuwphqdr7ukpsoanjeae4k3x19f3x6409kw66zyk16o4x7vcib9c82wxwbt375cxbfc64jp8uizlfhiywon8sh0k1m329vv5zgd8a7llkvzof1kfa8387k7l61g9s44bcvkkdaf97abjbsxzj60ez1h40vox7tcj5y96slir1jgw4wo35xpytyyj0cn6v6238xut59bexa6h8kl99wl96khvu24l8p1d1olfciylncmzkqmblvg4tmvv2whkc0g6lvmsp093hpposso66vmjxpwtq3zq3ncp7rdbqikd66efdl84gwpb5wo6bhqz56l6czgh3t97o3qtz9jtd3x6ix8zjmc3idkvztjvfy7ruljp023e3cnrwwdju60jfayanc13cr3xuv7l9190pz47zibchx3t1e1qbdr21sb95g50q21ui6491k9auzzcfa4wpuawf5yjttdp5xxd8kvqvjgektwubxbp14r1xftt581q865qh8r7y93j1nvif48vjdton3ssbxx7go12knmleeu8jx87rnt7ls4faj3lfookpfzubx98fgq7rgiuk0l0ts3ohc1t5tm7v0wcyyi7n80jjvqgf5qk7axmz7dc9jftgbk0pfywobdoyyvbdqqxxrb65p4inbku6cw7sev',
                proxyHost: 'upzp3pbwplodhvhgal1vj80f55pkgzq10am10p7rcaingqzczm4fqr93273w',
                proxyPort: 4317243596,
                destination: 'ti0ce51361ifl4xczf2eo3xs9ds1lwxgqyot0kds42mri57mw07fo5amlm3e4g7fo42kxxzlzoo80370kjj41k9mpq137t0fjb4uwul26rygfxpez1l0vvtgwni4qmvj2mjnguxw9lqzi8kskrn2e7evwym75k2s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8dh3lv5nrbc8jv8n1ho03etnxe1lk8dnu12fab3abiemiwfwvpkkhbwhslgfme9xvnz3lnht3v3ai03171y80ntaa8j88qv27b9jtvhi3flj6fu48ujj8k6s6grqu2bnfszn1m12x6z8uezkknukv5m4firqegda',
                responsibleUserAccountName: '9n0o84x0wgaolxsindqa',
                lastChangeUserAccount: 'axxzsfwbjea30mb4zosv',
                lastChangedAt: '2020-07-29 18:08:04',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'm6nz3ll7jgcvs2p8bl7x2jx3esue26idzp3p619u',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'hdeioelcld93jsgzq80xkluvbbbpt1d6im1b0t3co8k83z3snd',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'k1z9seonnf6xhfmq5y78',
                party: '9rqicgjpoqyhbl27phm2c3463rsw4nfnlq69yt85c7cz3pnuk8r3ab33tiwn0y77gpzhrwlasw03oromlrqqtx6azkj5yqwv1t6hqur2ndb64kayl16sdv9f6qr30maudmhl49lgeqhozxkynukfurs7j902c345',
                component: '19vmzy6zkkakqca4fh23ywr324x2oxuhojfzf0ra6c0wlr9s29gaxisy670hwqugekq3n9l88ylmtda3hbijyc789k9ldpeohrj4sojno5h8dsvk1h0se0mrlyinkwzwvirqo21nb4i8mg38lve4c6sh6s3cdakg',
                name: 'qp7urs5tcw67p3zj4xxnnj26ez5bbvw5mnqtl1dqx23ht491zw5zvaff2asxc96jg110hcq05wgfg1vvjfh2b9xj9jsmvxdxpdfxgns66vjflo17pgit4so4u7d30r9xsls3uyyf69bholesv37gr8pgb6xg5fb3',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '8anvk8ssqui0c41dka5gdibsxy3wnnyo9z05dq9yypniuhg4l501dbqd5vj0nfytdrays5n3obfchjr6z70vd3qel65uae9esy1thjzboerr73xvpi58nhfwnm5tjcsjmwbi03719xbgxj0daujxthz6uv1ayflb',
                flowComponent: 'bh2vejv8me31vj1ef7oinqhm9xy1gn9n3wm6dbkfpjsb2gpqe131qxcdic58fbujz3qajno6pa7zvuq5djgrgzhgab41c1sh2cyrtf4vnp3x5svt90343snn1lqqgxo8tg96eu4mjx88voksyj038j1kfv01rki0',
                flowInterfaceName: 'pkcax1xnjyi54he64ior3l42c4c5wdh7eujsmbt2gy1v9lr6im33zfa3ifkweo6tq22jjxy1a5z62bkoqz8o4imf5kczqdfubm8onaf6i343nnukrt6l87upayktd3qdd4m11ury4796zigtyyshgmo0md5sdbez',
                flowInterfaceNamespace: 'gw30h390c0zd31gdfmp4bo5qtbi6y9sryvx6nqhcq99spz8tx8r6831aed4kewwuofq7dk1rtbymtm3sod8z1pmlnk2wdulnvkyfn5t8p7ikd3jecngvlqeexcu3wx0xnledhktbpgnq3le9jk7gkd0lybw49xdd',
                version: '514a5wwv86qs2saedvsr',
                adapterType: '97pkrzs9k30elt76r7lhqcwm3qc0m3r4tg68rsozy211omjl9s81ajnuqfpw',
                direction: 'RECEIVER',
                transportProtocol: 'ts0l0cvwb3gggkfega9hxnx9n4efoevi6d0zgd12edin5ev9upbxshb3hfbj',
                messageProtocol: 'te1ux8goqpqhd4te80qfoi4fb0v0sg2u6lgyaau3cr6yvzacm6tkbm6t25dd',
                adapterEngineName: '3u5gipn1oq53ewr6b0p90h7m3nhwbzy6szzo85ydhm7wqbxsszfxaxyqw0zdqekbhdw80n7q9z4b2c6pgqevh98z9k5v6vke2ed1etqqtdjmr61h7ieedp428j4noelvhejqbz9rlidoeliwbgrb4cpar2cb9qoh',
                url: '9ixexnibtctb62evl3cfcmgzp59gg6vwdkwxefrg5eyd062n0back4fu4bh1je3twkjre7s90231pcnix2zu6btvb7862ivhohvdpawcyl60hs9wz1j0hzrswfzfuaqnxqp2e2txpd8nmmudqrbgf7rknbis2pcdcrkf2zb5s0xcvozbq5w9ywfax4f49fkb5295wel3cf1tialntrs08cye7okq70we4asektiaww03v52drjn8jf9ouo98qjkvwu1lojjhqoktifm3l1rkqxhkj3zbs5rea8dmnw3roerwnloh4inexjurr86c7hlp',
                username: '54qqv3cjv3tqdptam3qb7qly9lld1amjwypu46x1sbiihf5dnzfdltjb1yyn',
                remoteHost: '8hg9hd1y74k0t6tr3vq0turofo9qcox4waxjhob3xxoqemmy83crv96kl0c1xo10isswx4zxun88gz7hzkkmhz5pim3oyw9qrroitun6z1fpacswu7q2o1ri886aau7tnmgeal3y3fk82sewpwaijht8blfau7po',
                remotePort: 5944658422,
                directory: 'qqsswhmaq4y0so4befnc38rtonc72mckx8kfq1xz9yevbg8r0v9qwwqae4i893y8ovk8bpp3w605w37n385ve9c9r8mlc246gs49b5rr1r545ikf4n7yf5t0callrq6ip2fzlg0b0gun28pnrfi5x75734mtauj4pne8yg9alfdsqicd1gvvijndqg24c2qh6y1det8hjv1kj6kk2tpxqt72impf3ibk4t8th7mf3eqg2o58mbe8wifh8alua3kuhzvm0fyviy4y3ahf6g727tj38e595b7zvka2dy9wspj0ox6qngpz4uegm6yktkhthb47ikk45g0lgagd8124dii8y8hr0pt7m9ejq1xjtptz3f8w6tmdmovh5ud8cvnc857ybyuvemyr4l2rohgcxhuhczmxf0ltfthfd56jmihc64rtccwyc6o2vi2sh0ocpodo58st1xzsn77xdcmwv698lo0izrfff4q7vmhqd9ynrdz3625ifm95dtpms9rdguxre0zqyelymvu6zkz8cmbd8fy23nu67pkd4wwfkyowk39ppzkmb6svxvjaa43mxlk9dtfwfddfcxhp47ims75wbcksd5mk6uj6goo9dw7fw0mgbummu2zf17ofrwq6467pbk6mobpq4p9ez9ghgn02rwdo3c45v441lp32sm9e9plhh85o8e4l4hs0ii6zq1u038cm0n62jv1x4o0n5mi4iu1ga2jmz376hsf4szwhn3k9b6ygi1d46bpm885dq98d4vq86jdeskj30j5ygbsagulki6thmruudzy3zvd2xnmwi53wmn9icpcb6ewb29ylce17ruwl5ss2x5t9facqj4ab1s6vdemewipc8uvtt1r2gaa0v1k0rlu5pqqo1b8kr6x6tluytldziqmsiut3kmk718kqrbom3rcg75lf98m2xbwkupgj9b17rfuvw5bvhe4hevnvvxhrez4k4rnaxqr5788j1s2ujiilah43etwxfxxspdd9kj6tixto',
                fileSchema: 'srjvcp5cgupng9xo8j3uii66ldxxyu5k2vxu5zm5m5onwbtnulfaepo2zjrda2ocils8boarlbxs9pt87tauuu1b5b9g5yri2mq71la9m8z6sh91pjcswr7nksflm7w67q572ngdmbayrwiazmbh9b2alx3g4n6jk374c4bre7ntxoh0di5szkae7pxp4jtmd0tjzsd96r5aambaox0dvz0l22d4wuvit2e5u3iea83lin0k5moqm9fneffvzh581zj6mndwijjm8nu3o03zyefyru291iyfyhmo93ckl3widwpdp9y980isjev9wo5wfng25pp7j6moqy6b81qxez3f00lck684p9hu30u0r0kimgs45lwg0jdnosmvd9ftp0qqy8k2t4zgk9en4yoo94eug5rabz2bghif2hnimvqfk2gps09hygzvcn7jittgwxfvrcvp9wy537mvdyjm3xpx6t3p0yikg74rbhmf2jwtauaeokgyvithim671y6ngaihtm79pd1fu0do2eg1a0no63eokeu7lhhb2sn6leiiys9b6qafieko7jfv65l6k6fk2tddy3ax6w5qht9hhptw8bg881hzm3g5d7mtztdpwod06lm6n9cklmubbghv5wx3hti53kdfvda9cej5bki6s0ry3ftg636cbq7tb3lk9gn9fwxtqu1kj7bar3efby4uclpjr0hmi18xr0kubk0wyxfa974hgnre7of2dsba9knp94ycrwlx92am36ynv0zys1zrkd8082j8izuiq8nhbcfju8depia5e36i2ha3lu2ssx82uucr80f0tjtzblq1pzqt7hwx81f5u4x8kfpbbh6qy7b0t3ugcldv1ukahgfgn04753gb712rwxl95e6ksgx9b11wd489s8zzhriruaigfc1aefsm8vlq80362x5i9ddohn0swrcwulupmu02udc7hkqud4p5gs2y6qkl2q9t0tnjjv3vlmkpuwql0v7stfc5wjkl0v15ieuc6',
                proxyHost: 'zk1cycfd7j99dz78dyj55zh0kx5bbomzv41lum8nh8n9bmlo3hyqe6p911tm',
                proxyPort: 6448736819,
                destination: 'aclr42mc6zneu6zcr0mq2z3xidp2rkh3iksazo2b7z9wzxtxkjz5gxn46iskbdv7gvwdigslr0b9j2iepepkwvcupo22u67zt2nacnkzlabzhrkv3ozykubk2ise4dcqpk7rajijhcmfxqdt4y29piuovr727fpr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dohqo0p7jkc4f41qeqssbedc2m4byavo5afjed8txf66sy6y8dzyoz6bxvjanqwpcqk6vc2srsz173t10q96yt6jpycze6o1990s4ubg6vmevzxqmrrmv99qq6t2hss9v0ogtq0bo2qbxj6fptea3woswzld5n5j',
                responsibleUserAccountName: 'kriedwf2q3dgv7rcteuw',
                lastChangeUserAccount: 't4q6xp0b3lbtt3t1arkh',
                lastChangedAt: '2020-07-29 22:41:32',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ueab6jjg44fb1kln5lo6tkjszfw0psbpwcr3tyi6',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '1r2ecmiytnavw8tqhtlybn78nksiz5w0y6l0zj43qhq8en2dgg',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'ehj5y94pt0djtw5cvuv8',
                party: 'ie7vfxd3und76aii6qmmph73l46jcm7tplzjwbezng497r0an1fkqak7g9qfilx65o05fd8kfy99megiut0jz582da9rpmqhpr7ti2ry0n5001ks14cxc7vrt7by7cjlcukug2qcl0b4ggki43rv6cidvtor1qbe',
                component: 'tajyy7igaev5rxxqhhi70i22isg5cdys40o8g8gvhyhdu618kzgqwq3lo71f0ddmrxg7arzcjaw9zk707dci9n7v3lp32o6o7htb6y7cj54awip2lry04hu3ad5rpkl1311dqgv6hdyiqighbkr3guzrbvlwhsey',
                name: 'rmodpmxeyuyko5gx5kkfmkcxgnkxgr8qpf67d16yxi6lb832f4ze48v37ox7mlngepohl6r7jf9967swlgzb6gn40tvqn12tq2w9lbf64q6fsjlcq2hy5djsjszze3x532ap2imfnkn6ete1uqjeooc9pivly4u6',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'mvdqfnoi76bwy8y2flnz54n9faxfu9iib5evmj5x7lin9zc3d8bc6shg3mfgrtpvxj01r8407jpvut6wa66p8ut2bha599s8qwqq6rv846x1t0mrr2i11w98e00pg8rmaukht76ya1jyqbqs8s8d731p73uoq1l2',
                flowComponent: 'p5v9896tb64xljo03sxua75wv9qm3ffpy80liz91ndh7a2gmblr1i24w76l37axge87o68evzpd1wpox6nhj097puu1zu09fdchglykdz9vd3kzl0qcl7syw08cfve5bmf6t6w7hsig5smbl77k3ezyzfoo5dpnd',
                flowInterfaceName: 'c3awrmmhlygt95kp0zedhf1rj1xu9l2j6s05ch4izjd78zs6e8p6ttpdwvr24nenvmm0ehe7rr93opqdxr74k7mnasul9bjrn94sezj6glzwhndl4l2byo0dj2oqcvc1vmtsb0j35crcqxfxe4zdkgq9qf6tyouk',
                flowInterfaceNamespace: '30g1fe3d28a7y11pbx3axlplhtocswf8upcllk1t1qaxkvnfrbi3geun2a1cgouprznc58ty504zlicz1afxsyl5srvob2cayhhi8d0ku1d5ytu5329syrx1oypi4coft36budc17b5w4bsg2dpcpuxs6m4kmbw1',
                version: 'hwpxmwjbtsgt0gdm85tb',
                adapterType: 'zbbpjs7bfyo24zjgnepf74uq2nb6y9m5edtoovdsngk75yry1s8vz1vhaoxo',
                direction: 'RECEIVER',
                transportProtocol: 'en37uoqfs8pq0efwgzhzznrsw21m911ghvn7f6sv0f4hyy79eazf213z4s2u',
                messageProtocol: 'bjtaahuhyuk0j5gnccljm88ccrbfeh3zf704n8k4i8q4xaa840qv6v6x8jh7',
                adapterEngineName: '8dctpaln6rmcia6fyz5e3dst5mdnzv7kp49i7clpqmn2fjo3qc4e4q1uzm0i8fykx4h46h65l3s4jxjg39o8lib7rtriprderpncf4qgtr0l4skciy61ifumn7h2y6o578x7gfrye5pnf51it8q4bindz3amuzkx',
                url: 'pzgp7nbxzc2lfh5rejfre59hinj37tuolnvath2bsq11mhb2m7dqu0twyb2l5wgq81jctuwz1q2tyb7zgmqcoq8zcx6xdj9zd8c7rxb94jg0v55hg6cl9x0ol13uwa3g1mh74wnhp2grqjs5fudrjdmb339tn19qc2afu8xyqxsp6xvr9d53lm8tlx9l5k3st7nrf7kl39zmc5cixmh2pedytrerpecwi1p5ijt5yi2hogzlgyejfbyse4j88mh430wb95lmd2f0cunctzre476n28pvxhpbgtcajw2snijcfcoi4j7v5fnq7wnx1pkx',
                username: 'kyunerbboqxp60ikbhw4zvbzp408fhr0skjqvt1mencdytvd6nq8cmd24o0q',
                remoteHost: 'x9t593b6ok7ol8ri4fb10cx4902t8n42n98ct9fxykjwcoqbeb1ze579tvcywly1iaym1khovllhjbc1qxy1zn090aayyrtllsomdubrfgxvwqdhfimqjyaem6pgu4hwcw8uc9q85c9ybkztzsli33334p4jwh90',
                remotePort: 5630016525,
                directory: 'jq1wlo6bdwxev5g6lopiajaozkc2bypkttyq99vmss0rspxk56w14646xaag2n6xqd6arvv4b73sw0kvtrw7e5srj3kt3n38k7svctfy90gq7x58vn2p4e72a5qzhym8871nvuj2wbzb0bmuv38r2qhtw9yx556qn83y18hdzcx8e4g5jyauyuazcdw5lsfsamqn7d5ayx04kpkuzf7kofz0skj6igol5t1sdsepfdl33nrvdg7shw1tsfng1vgczu05ktxelhn7pr4hx6ejhgopa54zgj743777y8yvpvfloioco7u18v9permkrvd09iecpcx7uqwc9dxh6op4t2uzmdn37jr4e1rhi4h34vap634wiz11itvl7e2xgi03g0wrclv4a30c50gvbeousj8ldmmpkil01p0hncza56uvmq6lrp9ze7t5ppoz1djvjla6sej2bwqq1trmqfuhsygu7dklwwyjdi5vaj34zarqkqimqr3qquvouxouu9k3hozf5rmt2t6wuw1sjakkjjt41nkg3e4vbbvyxlgkp5ibvb7x1bsg7kylq0hw9mjkby8un41w4e9dypaday7qbfvi3g63ljwsabyhz767zn0zsnj9o2fntsg3bfwedkk8ihjlmlacuhtvfnuuu19vpqow48f80zc9qc1kig0w4kjcrbs8ho2gptbbvht8q77hoobwoe39o907gw3urlss8m6g9mf7ub60db9pn3xlztspq51rczgy4xe24l7kawf240qqwoydqnucr5rq2rgpwbw35y6cpjlwxzzrloybij1xx5xnbmt6wml3e0vs0v03sky3sofey6oa6z3loisboaaushhs96gqcl269eccmm2mn45h3097ois21d58o4nky9oviss4ym00ab7qeljaus3hq9qhomx070uoezd4fhsi44tbldfser1f0rofhid3b8f2winot761uwqka473yinmgb5doe7vkvwdm5a7xawpeiyc0yxjzmj5qvkix2d8',
                fileSchema: '38ce1udite6i5rzx0xzo7jjpv0jw00lxqgeoniqdqcqwcfsocog94zrp7y6hiify97opdch4c8psu6wiywlo3y9w04qpmbc3gai6x4y601rs6n62yxdry0svo1elzpbqh15udtncusl5wpceymvl4oatqc5qcvjp1jw7bp1tbve8genh8ja1uqnsf5339mi3lkz2m8xi9uwfd8wmt26sl3yoi0centy9vb65naf92omogi4ae3m8zb8vd2hvupyziduh5p9s75lbycm465txvvgndxg73zm8xjyhbrpteict9i03iq2k6hvi6ile930ju8ch4hp5hmi2jfcx3u1lgomxdp490va1vpw0m6pd60yymkvgy6vexaf57tn98cromd7403mvl7jmlhfdlwy1pyv93bj1gyulxk3yxiypgq72eh5ydfojr02bxdq9a5bh0unvhsv35ddc79nj1u17f6npfhm70ba9owokwlmxp1q3pzih3a1oab4uuebm00gi4due3r7ylyzmoh9zukvjbk0qlwp3ybevbvibmoyl3z098m3bc0xh6a81lclcixxrbezxg516mi3imtpvesaq4dwi71kgjsedp334tifu3wpl36rognul9u340fi7a4rdmr4if0obvqpnsfsqjotqxezucov598ptmpu94qnkiym2j7g8odg5wrb1nzwductir89cypqgsvcap9tg2z2zh37xq1gj9z6ccj7rqwnseftuxx0cguigvq86w3zdtj5f1en622pf3g7wwjsiuesflnug82cebym93dwfjd9zchzsj4nc0obkgorov31oc14pvcyf0679nlxpo9d1jsypra8wgm3g4v35cu3mek3sylxz3op272d5dtn81dh5a5pqsm0w3q137ptu1fb2e1jid5p3kdx714ixkqn3bbvxm3nodkemrel27qokv9t1gl3llutcscxyx4u2mi947xoy3gop41o20ricccsnxpxjdsv6ltuo6zwg65m6dls9tg97',
                proxyHost: 'po1wuc88uyjnkaguvhij6e38vzqra4wz6yy07yym6w3uewwy5xtctfbolidnd',
                proxyPort: 8630063020,
                destination: 'as57owpsy881uo108i90dd21arm9bvlqqupu9byaxou2ekx9ykrxrcdapq40ij6y486rcnp2w2lo8mc5qp9952pd8u6ge0otscqoutwrzrk64dviy981l98xa20izgz26ffh95ayzavtmm8z2zi8wne7jfnava4d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'om41rg5gkdwklq35y0k7oqm7fo241cqxtvydl7qtuw3ruznn8zikh5gvr4vu2gc64luuzumlvvmam3xwrjy9z2grl4384lto2trnaxoyhprlze9c1y8uameky2gny2uqrqmyluf9bczaeb2jxa3rmkkrb2zl7w6p',
                responsibleUserAccountName: 'np7rb2vye0oq6um1ejo2',
                lastChangeUserAccount: 'ldxjfdfvingxtovhnnr9',
                lastChangedAt: '2020-07-29 15:02:55',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'r9ixh6mfony5khtb8nb3mt7x4vmv4rx6jqk6dafq',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'nhu5ha0fiok7bcnqckwo08kd5dcdiuuvkw6zd1etb5h091mg6i',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'v8ojcl8k3t893jngkewk',
                party: 'ye83yqhj70kdwpnju50or4wb4whf11dnurubklwirz3at6lgymcsdrkxbompc68ajdxbcmgu49tpxt1ppgtnuf8xnxi9o146rre9diglebjxq1sewj418d6n2x9hp5lc4cdsyk6zg4bcqhmb8we1myxel04hz1di',
                component: 'uimf12osqcxjv9a5cn4zwipf5xy0p191s63bqo6pvd3orfoz7fjvrhbabefpbzfxm3od1q338didczyr595a7n9p8snmxvcyagzvdkieplusmv2tiwuaqtxmvmr70qxsd3kag6ydc519be9cjz6r7sj72o9hauep',
                name: 'qhla3sia552bjh3rf8kb5qj5ywjvofvl0vtcfxcj3nezkdxgvgd4dykf2egmqy5vprovkm1en93wogogeel40mg0g7xikg9uqeg9vfaax44qvavicquafkmruua4qxi940ke8ozt1b6hvm2dyiag78lw1axdjreu',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '9x1cmaim5bcpj4wyj7060wlheah8yc8cau4q9gso8gkyyb6i9mkb6oddhzwc68qpx0fg5pgxkq1zj6o4a63oxhtd9oilhzj1n2ch34qzdh9ko9v6hmmmqnqiqdk8ol55y4es8cuz5nfslo5x892o2n6oyndf1iuw',
                flowComponent: 'yeo2nkpdijomu92uoi842zbry3ql9i122i6sk17jzzjx392v50z95alugvbhv0nuqi7xlpyh233r1ubzvae0iu69rj81t497t90jjc1t1xak5swd15q9scw7a92zgqre4ytwx9e6n9kte6t3bbkl1wwc69y4ex2y',
                flowInterfaceName: '8qy5dm6ol6c8n6cuatw4t5x9rraaijisa6jef4tmjztavr2on7lq365psct448y5r0v86a1jlx41xavtrjsb7i4r1n3cfy5gsekjeqh5fopievh6y87n06gf6ehhmnv5zan24a730v6bfwvsbsugauydes8304z3',
                flowInterfaceNamespace: 'vhobr79l9t8slpqnykqew3mwdw7jftum79jet70101cmm6avngkpi0sd1gt0heish7wjsjkq64crjsauxsfaqydgisi1qrbp9bptpdiu4il4539waihua9u0e3qrdjrhu453o3wc9ut6jcph9wzaiyf36lhrbtb6',
                version: 'vmfzfodvj5hwq3gnskut',
                adapterType: 'u0h20cu2memcukmi2asqnkvfep10f3sxax1yq2mgjfmgezzo99306jrhmggl',
                direction: 'SENDER',
                transportProtocol: 'fvfh9epsxh7rd14hrcla29atu5wljutezay8cc14ullhyabli4ydcu3pd8lp',
                messageProtocol: '8tgu0j5s28h2f8f5jw18ntf8gwpq22y4lswji3g5al9tqyanfqxe7q0ajv9x',
                adapterEngineName: 'xxzprc9pl440wet5elwynrktb2ha4i5580z3s7eg9ixczfhjmd2ebjrfbtlc6y51roqox0slvuqbpyl1z0am2p944zd6tmo5iel2nhwh82johyelh5bxf0a92nzyq69n84p7fj9injtamk9n9z0aqebedaslmt10',
                url: 'sel061rmaqj1yccs5wwnjwimyng3hsjd8niuzxdvh0ki40ylvwky4qso2t59btb7zg0htm7qiyld4925n4jaeo6r860ensebtcuilj54b5rjtwvslg80jg7qir3wm333f88ayl1fcxdkkbecyo0o5ihpthf2tfw7r4rczcul64sks8vj139hzmbuy9lutbhg4f24aqsf1b07h0mqzdkx0srdg0co2fkwfp9hw7h0rleqnosrdldwdak1txpzzjqvzee3wa6nfbh5h6msfskzat0a8i3bwivmqlypmurty8dpl85ymroj1n1sssw4nmwy',
                username: 'dtb4akhtctpv574hnlh2e3g39cgk8rbmtjzgcbjj2cc7n9nalp5d2mcvrj3u',
                remoteHost: 'ppdnft9lr5gcnxkk1fvccws61v8a4bsqmf9uboe8dl9zlu77rirmgiuqwpzqx5vebq7s2qv12pu3jh0we95o16tmiqklwnyhrb8rrsdwqafopgr0yp5c589e9kmtbrx51uq7m51ksg2zb8h8fnb6fd2lli0cqnqs',
                remotePort: 6900784771,
                directory: '2kqlu2ffayvp79rht8ctgt6g1o4rh7a017y9jadq2zmr46pu8wcug8f5o3eu4sdi8gobclgpceksxtuqysfw74x621f04s805vt73x3bwjp714dvsbb5ed0srs8msnxyioha151d23gn29rdpi2b59wuakhyq3deqxow36ladl07wr6dfbka6dxba1ep451kix03tiy5s1f13gg6s2jg45zfr57b7ar1eptbc8rz3whf7ckxrdknv5ptfrdvtpp0d3kd303fytxv7x6384o18pnxlbliie6g232seuw0vsucsjsifttg83c5dmjlfvima27aowac492uj932my8tcjzribs31wdncdfykz713q94qhys6rbi8hsgf6apyobwl42j41apfkgq6nx2ux9udtgp7wc3jvltdk8runz7wqy8gf5bhnvxvnoi573co7pjwyqhhgxmch0gzwha50c1o7hijaqm4gk9cur3plm5pfvmpl2jwkmx6to041un3qi7dacb12r4obelrwwpfks9df8ahzup8k4cbzxxflt2f072uabo813xq6dulrcfznuxi121nmugwfqwjpjmcakw3dpzco1x83ck7wyjtf1pewguw51h7dtjd6749ffb2udo6j7ar9cxnojeu2o2jay9glwrdj2bzhde2ipbkl0dxkjmdyzzlfdweak7l248igm8a0oygb01m3spmjrexstuebmmmo2r7sgxtb7kuy29y2k57o86pfyrsqizplayt0jsmtka24tqich0h0xyk48zyg2xmhk9cykz6iyswububr6v492mugtuu7fu4aogdzy072b0yw3e07nnl53o6hqptw0e4fe8pt8fgkwgbkrq2yc2flu8ko87gmrhs2mehttixhetawvy6liavvjhz0q9nt5h17jia8rc6h2j43cvc8oavwexotmn5qdk0s055gh4knpy4acflqr6lngrn75f54t0k1r3yqqfanomi9830hb6zgiak76t8q860idgb1dd',
                fileSchema: 'tfuafhu3bzwiid1r68j9xbgzuye6k6uo9eby4yqc4qkcybf4tzezmweiad6royj3gvokpok6t2k5yiz9r495p0cc8hz2qyjfn2pu423bkx5zswvdpvmwrhl4sx1d6uuba4zknrj9hpkf8up5p5wpdhra5t9zmh4a6e3xk9tr6a48i478n0plbjx8qy41w2z6265oxbc7ekqfkmsn3e1p7cm562ubho6d4h6xs9o815wqut11nf1hpdopzivq3en01mgq4roj5ybcqgma27yhhb9zyeexx9ypfdoxwqe1i5mo9evnlcuhi4x87y74bu4jwm6zsebqarbkxhb6y2gyzm2bnqkre8l427ajyjj0ld3rsx5lgsi6hcwpo1lllsqyrfcpcdajo7wlss6y44catnlsjggmheu1qrlamoi1nmdm8823dksjlxso14qezgv2z5q7rnlumy4egruszv70zxuolup7l63judfv9zwvooybklrmy0dxsfjthc4r37oxvsu1gr42ignn6uk2w4wa2c0cmh0xa53qkyxcqpc039hcoi80otbenh4iofzuuh6z3lhybdrw4ezwb4d56txy6n7r8z9s421tdxkb0u4ymlz1mzbjy8bgp212l7q6cdahuslmox8qo5easai7e2ys5kj9wui7f474x4a2y2z57cabay35pvdiae7zka7d5htmjvfh66dccm3gyumkp7xl21jzti67wl7hohgs8gaeq57c7ueu1s1krn4adhedpyxvru5nrtcbcdlhpzpsgfdtmdnb8ods2q087q10csh14w2lbdz5bs5y6uj8d2s7sjvrrxs286nkduwqfk0e7tnq3p4pl8nqevt91mkjjsxvwu9fb6jsa1admdhviqkbu9n34fw2yl7pul3wzccfqulwddnd238gdvat1lbpxzblo7xlptc79wt6jdhhsxer7dh4w11bz5ytbc4dfidqxlwhsf3ewzpfay1cgcepp7zwl1xk2jlsgslbextmsqrqk9pe',
                proxyHost: '2nrtan7rrub4lflhk2bbg2533btiu36sryptookox3tfq9vbvy4a1b8pxqoi',
                proxyPort: 10149914140,
                destination: 'q7yvipyzqo95ush6gqvz1x3x1fwt1k24zxeg6y0fk4ve1s8ctfo50fsrg9b2g3bed5s0m3r7sz6pqdqtay9qmk7c2zwvf0dah0old6eh0acr7pickqkch0bbcsmbaw610g6zlcivsfv9tkyh2sml81xyoo8izksg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hwkv3ij7vpox5l08145i1pbnydbt8w1b448ost2qreelj65f5uegfrhw2mwmbj64e3h19sqcxchbq9heegvpf98zc80nclhctstyxbbtxmmnvpb9xd5y8ydgsdyrjv26r8uyftn810ao2pt7ywc0ypuo7456cqrq',
                responsibleUserAccountName: 'anra03fhzonawqwwfo5a',
                lastChangeUserAccount: 'o2whx9xjeyo70zjlaoce',
                lastChangedAt: '2020-07-29 03:09:05',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: '6v1x3dlrx2z15e0e6tksxbiaf82300eilkb4hxr0',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '0rj9lo600467z2hc0nnt8jvvf9hvyfxtbvgj7h259k291j1ovo',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'wfpdh71h6ce8rl011uhf',
                party: 'ra1qpaqcmg85ref8pgo85g8pqvve8vmun0vr13aoopfapabvd2vp18w1esvv7uokx9p910bg3xr3nzupjwxdqptmg4ix9bxhmsukmcvew2nkdi9pt9aq3cpklprwh7t5anheupe5i3n5l43pnwh5kv8xjarnks3r',
                component: '9of9zf0jjc537gqwtf0dgavobruos4zuhdfe1nombhwy96uuia6ypudf21f78fosb37gtqyu59txodank78hctunya8ldq1sd47qfddkrmc57hxrizj5h0y29nhu9utmyqsgblaoilgjgo1b2njoeqv93eoqe927',
                name: '26k8ftqzfdrw2xxb8p6ig58ihnw5tqzq16ke5vymjibi6nlo37secdyzb4zfdr5fm91vr7ijhvwxilw4ilq5hvzt4e7hwe236pywfpod9cq9fxqhe6p2xwjy4fg1nwgh9darrm5an60znhstj67btv8g2i6kgjkt',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'empcnuhn4zk2ixq346tac52a8n4a7fd63yktmbvgv7v0kp8veww4r5vcn6j7zr2hol7cnsc6lyuzbqxuyo63od5syejx10mklcpjxvje9aesvb9oloa9jaf2ykmdf5rq16bgdgy41jrzxqxfj6ifj857bbtlu75o',
                flowComponent: 'cji59l9ydystkw3i1pt9wouw0lnpc1wj37xze3cew9eypa22m9w3yad1xdl9d2xpsnx9atlbwjf5ab65ii4ews4vu8nuiz198m4fb1nmozbrq5sov2m392f8qg8wbszaz09ayjzlsbp9u3kob9fnd20nwkuab5zg',
                flowInterfaceName: '61qkxw6bh7wn6nku2k64p0u6y3dzcvv8kubwcl1wcmsuzwxjsfdnpbatekbiykazo22yyxmdf09g43tot3eyo01ry8mahgx57a4gqaj83ixtx58zcx75arl60wau8vaq33qd57gfrbj6e61dqwh8jumzx06p8juf',
                flowInterfaceNamespace: 'hdewydr0sh9wxnk1xht7j0wkk3vxmaz8tys98q1lzppuv3dcbarezaszbga5bhnc4oalago0hwh51xld7j0p6nr4r35prrw3hmignmm1v42xzkdj8f8bwy5z7j1k54jh7m8rx2epr61x20tn7ydp9kowyic3pf8h',
                version: 'pehy9026s32nzqgfx89r',
                adapterType: '6mpogt4pz9z0m8yt32b1r55s8q1bq55vd2xng1ehmbbewdxrbphbybytuaso',
                direction: 'RECEIVER',
                transportProtocol: 'zj2iyfykqhuwd35uumb78403ig3pih87xh2dxo3zxinlymvksbaklsbt67z6',
                messageProtocol: 'jh5ve8edo7hjll4jj3skeud8al07m2e6atz97pmz7iaexqqis2uy4639cdms',
                adapterEngineName: 'klqmzz833s682dljbtf08k1w74proo70kkvry73axst832bbvf5l7k2hd98qpzve8mnwuupxe7qidfqxpdv177b1tbjpb90aw08u4nptvbwjuy7dk817bs6qkcm373bzkz8tixh3bzqnqqowvjjtfkunyjqqyuwf',
                url: '452jo6p2glv96urea2lz47bfq7nwmj5l2iym6ck9vwgxzla3r6fnh76qbk6venjb49sfwa991dmrxwe5gdjoj1203cnbazfq5pzko3zx401bkyg89l1yccc5cl4jez66w1e4coklk4wwh4xr9b7c5fe8lzhnpepob7bo06okmxnqaip2ev4ufyxgs74v0au8d3arde9qgng2obyia39pj376xc9wvqeyi321nivywgub900ueo20ovg5jsjiv6crl5bbsmbg6eakd5grjvzagzkgazlrqebbk6kitxt3sz326tgz5culpyomrn1pcqsz',
                username: 'dv8npwfkqwh0r5pn9ix3nfwod56ngis077yf7qvaz5lrh12b0c0249hi0kw9',
                remoteHost: 'pxowx1qvlwmmxxkhk3be7s698ny1ab54uj4l6vkeyekw6ck0agb0adorvqx0823h01hpu94wlawf40w0lee0r755e7w0vro7hw2yfeekydiszh6oc43g0onb7iut83xo70nymxwnyszmbyzy5191osvuozlsjseo',
                remotePort: 7742608390,
                directory: 'fsyxvmyd347c0kcdsorjhb8zkm47wef0h87rwsrf9wjhc8jqq13m5vdo4m6q74cvy5ge9g3830boxs9pyjz3l6hwzof9umjn5a7fx9mzvl56j6jq32fz83jg6wzs4x8c1qtgqm9legeo61e7td3mlqs5ylf4ksgjdjrrklson7tz3eq4wb6lajxy5x315bz49qqcipvjhizzmcexehrebau7ofexjytei0gxsezcmi232aqkt343ur0gb7op774jgypowkx8q3jewkfw6zzvslpvhd4n5z0btc22dpeqbkg8j77pr63tesda33u88afaakavn434phlhe3jw86i19u129cq31bs093amdq9esnxzl1stoh5tnqlq0ea3917z1d51mjh75rsc3a072jkp4xaaosimkpc8066v9hhozr5iu3c7osjrqyntnys7kxjmovtt5a7c6zg8blffv1gzh0vnlaqyplwsyeucswbyva9ktvcq50j7kf8kzn3rxxr0js82qqm2o24f5tpmw502trzgjh65i3cbzdkznlh4uwubfmetmt2lhgmpxfgh08kv37u2q1gmh2zr4v1ba4whk9rw1beknh6lstnyudwa3j5plnq50lczt3y04cc5tqsrvceig23q0kv8dl8dnsq9qi370ieb40her6qbzyk8gqha903wncqzbiixfcj4625uwzcyvv156hhzq8aldzs3wtpni0p8vue2d55fuza0bzzzafr7c1kgi70499rde4a7hwtmg6xu6aca98zms30ehnd6xh6ddl915voi84uaosxutcmlohrbvukmvpqp52dzy4kg6scwbc6zzjh6q3w7upqaipxzyet3pkbkz2ieccjze66my901u3ik3mj60aikhtv59ugggyacjl62nwe70git0kl19hn4rdzvj92llrwsvn6v1xxmzw3a9zte0btpfepczmqn6d9e8gj3c7pqbw9pnpthjs24uec9wldgj3387gkps8w7jcw1lc8g50bj',
                fileSchema: 'abj8hhqbc4zrbrvlaj81l6zds0vrldq0fstc2vszg4hk92svic6ifa1mersrmthzyv6ovv6epbwr4z8bxvtanj8na9mm08ovjb89oekn6oh2cprfiw7ut88fsle6og574is1ncjmjb8u6msz0ecarccolw2b96raich47dsoibgiiwa06gcdnbuwk8qq00i4rl0sut0sha6a7qq0sq8uoviqunpwdxe9mkoa8rps31krqn7wrk9jpj6etkqfs66uqxe7lhn0mf2u6ko4x29ak92ip3www6q84fxrx18wfndk4qjl57v54qq43h8l78yh5vow3d8pp38l9e7nsjn07jdkn2mc601ewipthazdq4r0znrmlms6gghl5q0e47u92x8rc4qr7y0k5vrpi2mpql8fte4quzanz5rd4o3u9l6qo72hbbe0mpnzcv92k0592wruc1qkc983ao5a4bjvg7ap6ol5096wuwfu9jwpyj31h7f31qpblusn76qkis8v5qji03m6fymykiq1t6ig0tqpfexwlxt2tt90emuto1uhtq9sbtrwnvr5k9thp4esyepz9qfjvs4s83lk624lm1euskdvl613u6udpdufn522jnyt1gyrtyn03h8w6ttpw4jsj3e2t6okxo2wvk98l8oay383nmuuphkh3r7ecwojv7obevu1zrafvkynydq2f847bzhmk0xldmuo51q6f0axywzqfsnlr3qrpzzkefbnejhc1tkaywbeyl1ac1tsj5sjkcb87gvgg0zym77fxmgnap02r5b8n3ttvkvde51dfqwgwrbuihzpv4rr2ujgs9uhntulqc2nkdpyw5a8nis31zmezj98sp8x6s2qsf81hfv81tlhqe5z1pyqnghpcxxaspy0fdvbluf39x3y7ts57z4en018jreb5l7lxsypfea6zapf1foga0zkxvd1624k9jv7cgttqmi6a9s70tkotlp6ffve7f0ai546j013b51pyu51cj7waiaugypk',
                proxyHost: 'y1g7qducvq915f2lbhm1islanqnfp30ttkc183i40b1zlqede0zl8p2xsrw1',
                proxyPort: 3866423198,
                destination: '2cjev6un2yfxua5jf8dingq8yq7vspwqev6k31uxhik7kacfes875hco6kl64x8akqfhiu47jx3yoat58cm17kdjssdnr5778f9jpy1vsr4np38oc41jja34f3lyj9yf13v5p5p7i59wa1483957eat0n0wy2vzql',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yt7gif0atj4jbpc02efsyso1pwkax2451ia9cnnp30omz13cx6esq3h2pegi18ezb9i95i6uti1jd9sc7w62ky0nxc8ipcmg01uusb7i2ep7ny3q192fr5pqen0wxrmopv9hs4uh3jufjh1gh7t6fucu39yfu601',
                responsibleUserAccountName: 'kkzyvtryshjq929lcvsy',
                lastChangeUserAccount: 'vbo2c6gf4gdgwlyqep6a',
                lastChangedAt: '2020-07-29 08:42:42',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'vlzn83xmvibhzutw8zxn9bbxj54kl2fl2v634jry',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'p7vxz2792nvlw9w4vcownq4c5l4uccnd2gmhgov9dk8enhse5g',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'gt39muxuvftolslb5b7b',
                party: 'ywebfjb7evx2s25dutm0a7nu6ch58l0abuccdxydy0vq2mjdxzfwovz4waqk8ef6xjm8mtm4pnk3hi9k56ihjz424o41iwvtj750y1efthlslkbd8ygozw9mrb3cduxcmpwrkhxyl14gyu7bg1p2d0a70dyxoyml',
                component: '33qjfdii0c7s6f2mywn94lem67020p92c5240ukjgy1heinc3nvsbr2v6qemzsav3tgnab9mup19ho1lavhrp7p7gbe0n114lb91r5vq2uz61ft790wgqcwmxniahtqedylcndwdt8k1jw7umql9ylcjvupqqxm9',
                name: 'e2hom0vffauplwhpdad1uwexsv4wy3gon2txx9kejj46e7gp1d7p68uekr3r5tqzi59vno5dm6pqc2ya82pp6eqe3phutvvjxpuggr4ws4ohfqyixhfrij4vb05395u14pd17z8poj8mzibl80bxq5hyxpdsti3w',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: '1fn4dxrbajzh568v04pjh77a3troazq2op1h57prljy7fbnrme374gd03jqgjxc1e12xmr9qnx9uyjpa6te4onhbsjqrb1khlie3vjssuvni100d5a28ttca1l151atuul8gfzc7ehn7etr0hcva419wzgsykzh8',
                flowComponent: 'wgsv0dimx33ekippzjc1obbehel5euh5i1gop83mez0xal9u5tfb1q9ks8qal9t0i3sftllwa1xftajgbqpy5w1a72qfninx46kupj9uxhxnefyy7uc6v3rlaa0d57ajywp3e16by5ce6v6fjjiog02xbbcibw9x',
                flowInterfaceName: 'jgvl5a0r0ihgxstf75ww87a7csc6utwj4wpcggy9vimhvvt2nfzdnm6gqbuyl0fu6ly45ltl7vwxz6oqh89x9yb2q6u4iuw0ro9pmowl5d1w4udfayywfhuhk2lfladfiho6k8enu6cp1kmwipd5ji0d0rzozcrk',
                flowInterfaceNamespace: '0gm6l892gstlwgj75s31j925tvx8uo3wu5wn8bab399h244ykj4ofcmw0c9f3pwfv57p6vwy9afucd61q9tzm5cvogw3y9rokmc9h8b3rowsea4ip6xpi2gm0s2ba90jzlgyvf6lzfl15yhbh3fa9gtsyg8zioal',
                version: '83ncq4q3a4smjcchry2n',
                adapterType: 'mja5al48j9tqmofionopea5ia7phje67uqog8n4cag48qqr7ux9vrl8tmhga',
                direction: 'SENDER',
                transportProtocol: '2r2rnuo5mplcf8uleld6lckpbdy98ajuw8f6jinmk4i9efepxwkfjfg8qdr1',
                messageProtocol: '05ign4end58wklwuocqhvvqviq9fqv0f1xl2w1466h2n7nv3fvyyisasiy24',
                adapterEngineName: 'ek53rp0gfe1l5otvxnn2zawwxagqkedvwfqv0q0w7ls6g5vbema04j0ro43ssm2d4b9lxa6dx44pcu8zmjpbsujeh8lvsyyn2rfe3r3jktx74f9q6xvw54d9thvr31dci0j93omaxepv8ajywzn86v61f9qlgih7',
                url: 'w3u45mwr3qwngqoox0phmfqkagqqvouz7m3rgzf246gor7mtyo4btzcvjht0z35wplk3dkk9yqnhev0ksfaeglfh8vwmned6av03ami2b8d9c46vjx916dfz1lqgevizadw24499yvjcts76oswjjtwmy1fs8pb2dgyb3lkymi2lb2szbxp33saecqbgroi1uwvh54tfj3n539cmp0sqb4yyamvxbw932s8eqcwj2os576892w4somq66xx7whsezrj6aao9jntiz7atkf5hbctnhc7b3gofog42l5ulxuewy4d5rxfk1fiptg272k4u',
                username: 'q4l1ffgv328v2261ripz5bng2h9lideruj644fqvdtgk1lbpaw8h56rlt9jw',
                remoteHost: 'elaviox7r1kyz7dvi18x7w2yltpsp7oqdjzh0qd2rxrl4eq7t597xz2o1n44db8m06jijpqa3zyc527svfb6452s6y0l4p02fz2fd65yvfae6dy8irpbz5zzj3dkvbvj3m5599yh36207vsau0h6f1kfyfilyxrd',
                remotePort: 6305284048,
                directory: 'gdi4c81civ53qm2jwqxebwrsfl3ey36sl44d05b0b4i1z0xlhftb697ydsbuxt8efvgv0sqwl9qytbg8pa3e4ehar35h6ttimlvzfz9iisasn6izakj36c7e5kmqt9e17vsc54fgemyn0awpxgbebui1kvpz9ub1jvp7prd1n5li0qvp8is1mtehfbndblysiyotcbf8o6zi7zmzy454jss8ydeyfiuvrakt50ne0h42f00theyvblaf1j5pyobafcl0942cdzj05l5xdtzqwyhk6pgojhiecbachc5on7kockjcp57bmc4ds5jjz5h27u8ncpflz73362v6levqcp7h96mfnd4fqngil4sx5qpianjor3w4hwq27olbwvdpgzqrufzfmxugt2mnrht37rpmvirwtutpdpkszn0v0ay61d2k9kwf2k1qkvmj7329qqnj0n2zm2e0l2x8thcjps61qeawuapf2kixglvtr9d3p8qab7e17tjh3gtsrq0qpfgysclthpdq56k1o5zcabu1km4f4xvmenoqc64gl4ozrhu4yxxdpm2udpwv0nfuyh3692mdk96y60nhtwozt6oyuopm48iq4ym02qy7i58yd9vw7u091l8n5rg50i1hr2lh9ib1o68f765bv2c20bwizkciw16f8000t038u3z8s0760i9nm7kqr5jgsbl5qp8z687i81emhdi725mk2g0eq7sb8mcpokk3qeisayj8jn89i7hih50el1mh5iqwvd487fk5y6s2vx5peevilk6z10f576kmy41ts3qbffqcm83lvu0szdbuiyc191u52tv4vg5t6qjkapkwyh4onorllk37cdva9quogq7r27rgxeeta8lzwuud9gunn391ztt7zfr7k2dlba11nretc1nf6wchy941fnt2o32x3xgqdjwbxjye7bqnlxqseo1b9qimkwghzoyr4l0yg21db42uf2s6gsgjorbmo1bfkxacjudej9nyppux1i9z35vz',
                fileSchema: 'lv5k0n7jaqhhzo3xn26bwvfqfxxfqe0kum5evau0cc37ih27kt3pb7bmhdxkhnohfe7tgfhsnaz9m1eiliwflymbjrto3qsg12q17ykbcm6tqev5juxgqmk2copmggjlvask2jqiphubtkngt7q6tc7wd5v857m931o6aq5ya93qwbbc6jedddtfxpp65amwjpa8t0zbdjgl5bez7npved9pyl00uisun0kp4q7sxgwvobu9g3o3rpmvtieky4svdkzlfat9fm09e8u4sl1veq6pysbda4pp91h5g8ayc7ks2jlua0sssreg5vuakf7823waogudpztxqnmaamiw30w4cliv3m9h7ialzmcu8ggep1ch7ps15q9rx5bl0gzbe587i5fb9hw4gwsxnw9ikxq5bu8fxrz6v6gkzxwjig6nkkwsr8xz6oqmu7dcp1j31ahhrru76z6q61kk6s34ugf8m57fh1186sib61ieogwvod1aqpgtafkj0m2zm47qttf6uacjg72210jcar0z0r27108cpg4mahdnxc9clvvbib7lg7hefdubd93k5y6g6lvb4kxipb7rycvxuvxyuh1174itd7hxyyvi3z8uo6skgox2ehinebt0kjnhfpdjtlluuel376281a5ndfp542zqfhw6hx6i1n4s56h5hby3c86j61mh3oy85va2jy89gqdys6b6qdyqh8gwfhxa5bsfncy8lrsaqsa5bhajeanxg515l1i5tq0unyxtfs4hywdyjg1i76wa4w2bi0h7qvmee71qktdslu2gcttn6f4fdiecmiqq2bqpyunl63s7dldbht8hkykqthxc9znxk84vdy68r5370zyd432tvklk7xerishhdop08m82ypxo43fmg0qw3j59pwu4hfkr54hf6an33j4tzm58a0d5r2y4xv8cjlnqjuf4o9gtnbx4kjvilo58ipp1qoqeelkq8qf05elssizdcd5fxd8m1j9v6tzayukgqmveapco6mga',
                proxyHost: 'dele50dt5tl8u9g0s0rmt84nmqdjmq4bs1m4h8s4aiilmyvgzgzsggq1bzof',
                proxyPort: 9331583840,
                destination: 'ehpitabli2csbmhpjhczxdv18uxyxm9kvmsll5m8kl0tp3aumfhpdhzi6yd0ix69bpbhqqgg63l7cfaysdy8ojcegfs42r6kfyrcssti0uwt9k4xrgkglb2dno89awsufsmu6mbhn3msd61j69dk1jpd8qqc8rzb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h6wbzvmx9etiqcfiz6rvfxl2vzy5f6v0pzhjolcog0gjzgwwdljlhjklj2ysi45kpnb93madt8y2dreb4rnqji8kqmso3uaa0hz4yfs0st1h7us7jggpmi6xm1x1sot4uqpg94llu0v7ksze0ryu8a9g12xvjdlwl',
                responsibleUserAccountName: 'pkvn5n81g44y0cez13z2',
                lastChangeUserAccount: 'yn2boyccxcdfp9lx39mn',
                lastChangedAt: '2020-07-29 21:38:26',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'ltc7u0kwhm33j4fo3vwdb83zu0nrmj7q84hkza30',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'n2dhm7rnuui8egtskogcunhmrsb930xf3indgdwnuam15ibq81',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'bc8e45sfec38j6fqo6zw',
                party: 'p0f9f65fo3ccednpjy42nmurs7e0qg34b30uc8wc03hznk9hysgfvcjisfd4pa1sldd3gq22e3cfdlkzwzyqrev2cym77q2czaaqscxfjx8rek5jq5uw1klotnknafsy2vbk2jl93pkjemum49qnik3idi6tfai9',
                component: 'dfzpsq8fju69twffgvny9uilfp5c1w1k3f2arva7je8hp4m6x7uu52o06p7elqllac2valfx72paussnum0b466vfhdnm46sczl9ec25esxkgvhi89evnqv6cwwlt0w08bz1velt7fibbc9texglnljnn37jb62u',
                name: '3js0a8izvwqf6mliwa5yc47qmpf2wm2zdpf5j47wcen23keqlagumh39tvcfh4sa8sk4udf298u84ke1f424m3zmu75mhnqetp1andbsudbi1mxzqbm820bnv0124861os1sjqkii8spc4hqehqw9jhnvjmxjnq5',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'c8zygs6z1iqy707nyi1mj4jiiaxyqmn50frsfjif7vxkqyuyh1q3fxs61s9esftmhvdqz6klidc7vmplu7mek4o4zq0yuyaeesxwxvavl1o6ryv5o89yw1e3rjwj08gbw2wm6rh2vlr7vi1iqqhfmo9561s1lm8z',
                flowComponent: 'rnqnov7xgqrn57pczq3n7zv0qtuoyt9idfd7j2gpd4rd2lt3kknymrm2j6unb1rf10jmu0v6aieho4wcil383y1xx7lgatke5jitohh2y1gx772291zkqr1ah50a0asj87e737pcjtcexy9w10c19pdt4yhofqpk',
                flowInterfaceName: 'bsaina0v9liieq9pg9civk2wo5yo8bimb5l6slufmkc4cmanj1syfgpi9gvueu3nbuvdlhh24d30ig6edc9eozwobe1f1gmv1xnr0ngg4ybxz7sjrjq9brv7w8y2yvqkxll2926cibwrekvdbvrm2lq0rvg0smpl',
                flowInterfaceNamespace: 'vhfats36fxakn6piwj0tkw72uymc8shldy2ib4er38c69d803otk925jahhie6dabdfdjk64rx1g2p57i7tthtk90lgaf1ipn5rf9pf3dj7oisozyfb4i6ua6ylr3zhf7hb7jwdjpsc48mylc4dn3815100non1s',
                version: 'a19evvomcwttrjyb0wmi',
                adapterType: 'pofsa4fkpms0jpk8236hmrtwrcvu76g53p9s05vs4dvo9seagk0rzwe1bwio',
                direction: 'RECEIVER',
                transportProtocol: 'y7ja1ogenza2s0y5xl1u4fpvfdvxqxij1zt8zd51hlz8rokzyhy8uh9bxsc0',
                messageProtocol: 'jsbv0nuxo2w5eq31icbtnpc63scijo92drefxab3pzeznvaqi6q2lckoo6q6',
                adapterEngineName: '0molcuo8zjs7pgqpw5j28qvjeclvfuc1a5hq5cnjid9aybyhnf5kw4atnnzbmd98x3445dgcznpwh9d9ojs64uxr83tcnajyoamhjmqoq2td1htc478xdku5yizbf0mn252vi8j906ufhx1dmoydjjad0vr9l0xe',
                url: 'r2mydfxoh4k7ixtnz4sif3yjisa4kzwsalqz9o2grcxtjou5i1f73n4ri93gyxz1xurbbophcrnmc30ouom3rifvdjqx4oeja8hzopfvqu625anzx7b9fm5k1dwd9frj5e7xykj0fzpfqdhhyjsm9enmbui6y07hg6putsegesi658wtfw78jvn1hpee3qoukkrpe6fbuoh9m4sbnaj7lqylosfsgauajkd5ytmst55vpwq5msrxdfmml3jd7hveh5ovjgsbhzrwira15iuqeosl28f9w3u73n5tq9fo59fh10l71btswl071k6mt30p',
                username: '4mtoth91sfjqurxlqcqavsq1bjkbx3j6zpqcbh47voxzsbexqfzcx4ojbav8',
                remoteHost: 'wxritw7jcg7pcn3x0bezgqtkbxdxe6oaic4e6nsr9mn1xe5636cyjg2xscfu719ekgaupum5uaz5ljh18y3buosac55z6ux5dnmc7hmmh0a76y5jw0z6mj51jpejgmk0uhzadql1p4nzf60s4mr81wjmm6nv22sy',
                remotePort: 5807588476,
                directory: 'k4tid49gyg65fpdd1ue5d34phorkmptquvl512xd4alg7xi1p3dch427s8lxr55pncajm0gndpz6gs9uvzur5e5u23zgp4jbuegzah955livxpax8tykplfxdflwameuqzzvc35vimr0m5f628skcb0lgyefmq978iv1klgi52378ezrm6qfgvmb5hq2ilv5regqz4k696ysi9pp7i23diq3ur2uphnazdak8513z515r6074j287chqr4b4575rnrj9o1p4kmitpwz99zkk04dbvgahr9lhcdsk5idy17or8subczggofv4msr7g8adg666v7lhcot3eu6llrakc9v8hn692pwj4uvigx9qnjssl2xp8u4raaby8epocu3ax0aqljstson0kc88tos103di5lwcqcxggmlqhf2up7hf1uhdedbwbx23rqi0rdk7kfb97tf9l3zecdoaykns1y8b5yk9qyd3ss9isbpc1disyy8590x7fufd9hn931rucr1m4bzwzsd8mw37hqqqi4qlbggu9scqlyeadrppgdmyow97tuoe3rg1pe63ycv5xzlgi793agy0kdr0fyhe7917tztj5pehckdyv0vmrf9d6c5ue26y5hiry062uy3hp2248wuy48mvpacukurino47gj5f3j0fusma7ho57wyzwoh09aaj0qhb23l3yxz7g6wms1qcsa3aw7u11qch3z694heqbbltjjsvyncc7ldfb1uufo3fxm83uvrvz8ppidtr7wx91c1fibd0kso5jp0c7c0px3hig1f3j4jhbs0yw0cwp2wc94804au295m57a8pvena95vsqehsvnev79g9e3uhtxa7gujgxje61m8ri7vhngw31kvrgts4ubzt1y6gl7t4tki38pt3y19biar84y7rpqdib62gw91iptnh5rsy8opi22y6bvg3w94d9x892nizow46fy7bn4gieq7dwu0bqrgmu4w3le8fbj7xwe0k5s6que7uo6316i4j',
                fileSchema: 'ancjrf29cstm44nll18uwm7n0pb43iapeijzq653h04bcqenwmhfsh1ca6hb03kfl52qooai2aiojtd2h4yyhdu6gl34hanyalgkgwwf7d2a6gkvg9nfb114ib9fa9qsi6yaqmqn4f85oo6ugrj3arktqa1q19odxe33t3xx18gs8vax3xc5093mne6anabo0tka6433mvzzq3agocktq2y1ft32apsff8vqypl3zp0cyb0ae3c7vp7gokl39i5t2xfxfokza8z1vbdivitkaokvj4xhcrjv400kjbvol7q0r308jn2pid6huzask37p0n842yiw7mr4u0vgs7zz2340q7ltq6l3cks15bjma5uvn1ylcea35vpbn0zzgevy87fc64bnxstwa0gaekxw730e2wegn5q48w8h9epyl90c3wmconlcfy97k9xxs73zhn0tn14exr4nt45cmccbxtsaxaydzrhypdr1mrgqxwatflfjj1vlvhuyeb1oth95ntqob8b0q619y6e0m6vydpznkqfzri3cxsdsv6lnmw3mblonjix3bczl8rk05wu15xflq0ewe37kgaws4aggt8ckfnayrkf23xh02sm88qovr8zsvlz3ixcv6gmhm6ivrhm9uxu99eqej10mr7ag6bvxosyqmcyh50geqkxj8sqt1ywns7rms1vf55q66ncy9dx0t2bj2icklh6ibsi86irzkxymlql8chtebkg9x8fnplz8aalh2hkvgzr8m7t6twhqaxpg2b1bogkxbc42brane6gjlsy1av5fxa4toha1csvvtmccoc4ywb08qih8gkfk8lek57gvojon6insa3o4ux6czua9cq82zwez3cs3ggrr9fjhbol34my2csr3uvzjdm5zxe6a2shggrbupgh2cmim7nifc9z4nb0aufd65vwybt1juua4x1ovv1ei43328agx6leqd9dlxypfgeaf3syd4slixcl7mce3sxebzrbeaqyfqhq4nk6wn80d',
                proxyHost: 'ggqfdinp1do8yqd47nxr8lms6w3vwf3tj03nvv3f2r6c0414hjlni0by6e56',
                proxyPort: 4587225623,
                destination: 'y857ps2ox9j69as2t5c1hhnts1l5oennaf1kc77se7eicx1clnju2kjjd6s8tp4r5oplsdzbp2wblvyfn77lmwtgnlycaopiomudw1lg4308vmloesjzw5t623uvhlji1uemcc56ihuw33yn67p4b6183yd5pc0v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pxtbbjf694ndok734b7503em17cqn5c999tf2vymk6a6aheml6xj4sd4kggfy88vfht0rk3kymx5cxnnv2a63hg0ilyqwg6kseojnk4gh5ksg3auek14pajm3bzgkgn7od5mgxwqvx2sfbgraxdxyrh2tau6gzlh',
                responsibleUserAccountName: 'rb80bndgc55409787akvg',
                lastChangeUserAccount: 'sjwinl0i2pht8vmijc0m',
                lastChangedAt: '2020-07-29 21:19:58',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'izjijymnqtlglht302fspke0u5q30c82xig72tc4',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'tssy7tu2a5euo0ptbakb7ubsexdiacncilf2oo0093pis2vori',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'v6yu7pi0jni5kets2gc5',
                party: 'waad5zml94gk0s31bid848dv03el8h92kai4af92m5xs6wz8z98hc9vmj3jyl6z3hxoo646m0t1ci4kf6553cno9i8668ei1emwmbgvq2pb0ncg3q2f54uibdwa0akfoj20v9lns27n2lvr27osw438xn82gzzf4',
                component: 'hp7082f1ze33gg0qppu60tj15rfv4jsevvjqhp14rcszojyergzjom6rjh5jqov4mr3qj0g3ubtmc29q2fnlfya8yy73f9r6awl0pzwwz099848mvz58v9edhtkpkt4f5nv83ezqvyrg4y69i4xic2khdygjj0qy',
                name: 'rou4hpgla8vnwhwrh7gezplm8axwowxkv3ditdxadqtkhjparaw6p99kov7454zw8zxa0ih2sq48pdzabe4vcfmnkenry9eodlndid1aniat1p75o08dwwu16gnzdquzzy3i95qttt9l13nw26plyt4uo4ncwdgj',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'vdg104t8dhvulov3zz27t3p0532f7itti54yupox65dau8nnfkl9d134g2zrus8zehcalc05v0rvd5fk7ljvzh63yo76pij2twynxevtrya9hasa4nhlrh6l646tamusyxanv8rlzjaysmv4z1c7n14w8l8m7g4c',
                flowComponent: '8dgh38wdcar6rq0xdhx6u58a7knnb173lo09kxn4qvove5nh4mw74clhdeo7js4nnr8s8nffxkggzncp8u2qrvvema8qsfalay0xs2pkp7pgr3fnoy3brz7a43n2ufdiuv2ijq0kpy9ni6medi6kiyd8h96a7wfh',
                flowInterfaceName: 'u6ngtj98fx9m9z8ricrsxmgo0ysi3rgferiuuwctmamt467kw0xff0b7kjamzuh01k5rovgl9z1dr6k8acjkz2qd95k0nyhtgzzbe4p6az7fdjuehbcvgvnejvdml1vikk5lyygdqxbbw3e3olbqhx1bd8xrwzee',
                flowInterfaceNamespace: 'iqbyzya4qdw85m92pb0g0px9eu2pcd1qxe96th0f9tti7yjp7mlvvdigge4p8jisyv6lhquzw1wcs756bqyd98p5h9smwwflxhsr024emjdcqc66hfkvc8lomu1qsr9ztbz5gdg2n23t3c2c524d5bwra0gt95pt',
                version: 'zjzula4qn0j5gimkgis9',
                adapterType: 'n9d6vgfx2eehfpbiiz9d3vx19cncj9xe3r56605so8mno4hk2jniiprzijxt',
                direction: 'SENDER',
                transportProtocol: '7gngdzt8wvp95uldzhz7zbqjttnxa3hohpwmljz7ong3hm80e97xmdj12efe',
                messageProtocol: 'aygzp5lefkk4gxhcr11clpebqdev4784uomjb4m414qsxbjxz5gy1wui8p4e',
                adapterEngineName: '90b6pj18uto8170r47h8gc3zbgdvc84sg2cwfn87nkykxchkfhu0059khc23gg0hkay701k3q9zrwi96dsx20pmznpwmm41g51pnx633fa11p8bu802tnou1z6fyufxl1hp3aovncqeknhnkh95ursi7j1sltmse',
                url: 'ybl90p6lnbg021c0mpsvuw54pao8t234s03umc1j271aaxhugxbcnmfghcz4oj4qkr88k9kxqxlb5fjme1b123i8inq8j0gxy93crjcwob8suzqn3nq2n8nn50374zo3b06t2tjn8a7ch0d3c2isyl5bwvukoonrovq97lg4p76xnm9e9spfctd6j0s7iz49wpz0bf7qt3f8ltxuf9ijje6lzpbob0na9di7c6g47ctaux4vljlur6mmqv798rp1vpfzyh9kxb7zdfuy8mq5a0c6m0rtd5mu048g77c5op6v9tzl0balwei129uipsg5',
                username: '6hj5si4tzvahfmaop4rmm7hs0az9uuy81q6rnfpfc0qelxduh1io77g7wps2',
                remoteHost: 'es7ond40k2uysm6wkoxpk3bu6m2imsi7g48bvls2oa33gvvh5u8y93znkkh63a9qg3pm5gol6ut6eov7plucgolqgig5dld6p7licbbbg016qkf9u9af1e2x3ten1fqs2oehod7zrv1r08e1iuskcw2h237imloo',
                remotePort: 6150661266,
                directory: 'znkgv8iszbn7iqssoc4i62ikrayjx9g52fdvnusmu6026nkrhbw976c2jes5qvv9nmuglvudd231yzrpbow6tqsfjbbl2b1zptwwsm8550xmrbsmyam3xooxbjsut9jiqlaepywbhw86eohqu98c334nxcv1k7647mvttxy3699o3duho0v6f0290yhnlqse7fti670lpcwd2bii3nrneyly9j1hhte21ombiy6n5nou9gcoal246qw3ttl89o9zbsrm9wsuiiff8kc95r79pswny8s4xlvyv0m2csohzf0chhqb19uavfpr655fdq20vyhk21heg9148fbw8jxvyms056u8wq9ffgfxi5z43zmf4fzgt5nn1xo2a3fc1wjcitiifsfsj270w4ri6b5x0wczined6k2omdivhvx93li2e8ggfe0hwm5e61nfokfj9qhq7pic48mvavbqh2pm24fuj8y7lrx01lvasq5dur53n04as91791cadsfdwyo4e5sw5c8wxp51tvyz6qojid3iyyig14qck6hqjsagwws4wmgbe4ncrurmwocp6d95inc8aczu391vqlv3bdbspf72ukiovw7boz3qohtky7htijdwh2u92e1zeqtmzq72n48qhy2mw6f709efo0ny9yhsrnayhqwuirzefl4mg7m8t6eqpxainaklwwl3d5pi218gzton7pgbdp5hhrfb1ge40g6jcnvqbjol5f9unhtgy6k76rdws3wkeu7l9rv1on1j62mmfyei59mt309h42g0f5rfq0avt24gbw6shkyyhtifxhu1ux1o73wqjzsy2vkn35kvjggxrtqwqoa4ajiqdvlchca47a42g52bi24inczj7hqa5j33n3vkyy3qhaxksqyn2aouxudswf483q2wb9f11ejz9mb3jam0stgcqtb5xfub14hntzeyr795ygum5hvh0x6wduhnfuowks5vvalzap6t52w6nnsokh6jarwjd2vfuvlm43hfhpbx',
                fileSchema: 'x8h0pbcgpvfz3d8b4dp1rw7yyby7jsfs7qj3rb386ck4a0kn28r7w2uymngp7uahdh4u1zeuymguhjt33ezy5mszs7dhxidurea0xdbnw2f26nouooeip44fxsnx041bnjcem5pz1xo9gbcwv4scuqhltzh8wzur27189an9euso5d5ucfqc9w706bvlxav2a8d7uefnwm4xfpc1muqmeooci8miqjcydci6y43bu9wacyxkv2rubth8g13md2sfnsf1849j7cbnxcrittl8tllw8s8n0b2p4nhnwkmfvg73dy747pq8hfkmsgt9pdgzdvrq2l0xmeq6saky6jh0iwwxaty7rr816wsm04ap931ou9qsw05cdkxs70jzmy8a7zawbxiy6ev34yo1eaailg8uesi80v57cr7bo8a556lccil36hcj19ec49bbdvvauuypue4tr3fue98zrb9crov4l68ppr6l86p7j9tt0nj9swrktoh8aglxs5uazw7ffmdgr6t0ifiju58dii2bvkpuq73fhyeore4lkggnycjar818rehx0enhg8zi1w0drk3em807caysf213j9w6bdrue73sue2qae7n2cschhvlamxw117k2spg7xdism8ibf9mtad2v9bayrhh9je8nwqfargfq3tggqcxgaw32vc5gxw2or88oskdms08cgfjop86i0gpz9szfh7aj7eru9istl8q5tiht8ln21g5n0mfktijqxs1n1fbejcfbpb4flwt6zd0ucv0qncobjrgqq0n5e23mbm7f4o1tzks5ac129mrravftnvbaoxedojfwer36q1phmeh6duirhqhp0c83rlga7cpi756e2abie3o97aafjowlei9rvta90tins1kio2i5y5jkaeg8ddizvjo47nvr4o1osu4w5o321matnjy05hu4yb1b41t9aza5w0zbfccj0f80ienzmo2lf5qf1koo5j96u0d1l6fklpvgt8g5b2o94xq9rxjyllq',
                proxyHost: '4zeo57pebmj3cu0tnhhc58om57a5tt7abmmiok9f4blluwr0kdk8hxg8xhe6',
                proxyPort: 4510412089,
                destination: 'n8nwdncckvc21q5h914co73899dlr7pm7p3905ggj1hrstgldfx1kgfuwwbi525xk63b19lim541037rsdew848enwn40ip3ncy5nq7py6jfo5lct8q9y1r2dibh2q2gw42bl9b1zpb65lowawij8imqkqfvsflt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l446xmjl4t7asrwjuax1z54eqtg6gtzp39fzaauovto21ghlinp7d5qx94n3qflkr90w4q5uvsq7kafqyfkgqta48994w3bp8h2sl2hmlp033qs797em6ednkajhrm8ziyw8lpvk77sjr27u9hrtzkvx0qa8aom1',
                responsibleUserAccountName: 'xjhbpzwlkvvru9to1j4z',
                lastChangeUserAccount: 'hocod9us07r1tvqy24px2',
                lastChangedAt: '2020-07-29 15:08:49',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'hnoo1vov8awsq5x9m51t5ny1evrk19zvqvq1rdsq',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '92lkyia6his4t5t4ftd739jdx9wcf9muwqyhk88j1m88qj2e0l',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'tkz2nxgc6m6okylj4ml5',
                party: 'xqqez2rpd00hf86z3xetohom1wpjxlee1hiovpkyew3lu5khpdzpi6ikeh14elpbapfhgmmm6fr5o6bgo9me2d47msecn9cuow7sb6s2nq37oecvf82madui4m1rpdsn9efwsgama02gmrzbw9yhihoyt81b520r',
                component: '9q647vcarvgtov8pv2iq2sv4m1d5bs0baw6mkysv2yzasosknr3cxfpxd8heaqtrhn18p11fsk4f1vijzzhiq1h6h6tuprvvojq3rg7an2zp4fbm7wrvaihl08v0ahikmb4frgk1dgwiwgg114g485p3lz6s466p',
                name: 'qik6aet6pn1g3pqrvr88def3f652nkwdq65vo7gtz7fm31llhy01ea0he1kdwakceqeydvkgmqg8o5ur8lcemtitt3i89zjyd6swjw34g47gcg35nvuxltxtqehkgfyhzcv5l6vt5rz36iufafyt04am4likgeje',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'w0tuug00lv1xzlx2x9cci7hnfaisnecda5oqvaictjkqfec2a0idvhwgt9q2gjeni7beatjzab9n6kiwkpjl5udcnzph4fkqe0fuxt94nb2zbn8cmgdovsymis23evxlkkk72qqcmixzexzqn25p2gu3u17nac6z',
                flowComponent: 'kqymc8v2ao56d1iz1dgiuyl7vjx3ov5ni1ypmdfinepqbv0se25ej6d8kxulq84hud8l4pk1s74nf17ubj0qylbjhx4o9uakmbmunjnryo343ivp84n5e87rep7td1o28n6nx33ugrg0y35qvo6eaqqi75t2i9nk',
                flowInterfaceName: '7njtmq3y1a74u9v2ljtjrd3gr94ti8jk148i9zpck09e540llx6fk43rrin40brxekajwi93g2pw7tos9abr48vun0nlbypif6lxx2qyp87ej4n2q6jovlaj264nzidrc4hyxasxjrfyefo26zk6mi0cysf5agpz',
                flowInterfaceNamespace: '7e8dyhgw77k8hkg33eja40lie24fjl08ncrrciyx3nwwm2r72x563d21a7aiekb58499orpyvm09zpf1u4voj6w7vt5u1jgeqenig19em3babhtflvurb1ulctu9vqo7j5c8sei9t3lehm5js14iu1mmzq982nt8',
                version: 'aa72sj4l9i5xinuk23g4',
                adapterType: '2fl188mmr4c1d8dgr6n2fci8b7mn7b20xqwk7bymoic7l14bxxmrf6glooqz',
                direction: 'RECEIVER',
                transportProtocol: '8qh093hax8k4kinw59u0dlrisnlg0fngqelnbyhyb8pmwkk502a8d60tfxa8',
                messageProtocol: 'l97ysywcj7pnuv37w3o64rz1e5qwox2s4795ok7cduog0jqvoa5qky4cgl9c',
                adapterEngineName: 'luo1dusjix0mt55o3z82l2dvsux5pmyhfxv3l8oedjuob4ogtqad5jcwt3xdk79ibj1rd7m70r7xp51t74lwwl2btkpb9vglngwyztmtpjlvkes02yvqsgzbkwnfue4f09la91xa0z7u1px0ejqrldhqzev7270s',
                url: 'pyj1apl7m0bhpc74z61arwo3g3pjk4w5bdfk7vkbrbvnbzezngyjulxwjv2k5fgne5cfnp0lpqf8y1pvhsiepqr4sbkvg8j1x1rzl50ri4aohcch9zm6xp5yc9ipwy8vp6ljx4c534i5q6hbw2hifad8rpw1zitjznsjlaez78whh40z7z2trj6tl5zxfgxog0dvxrc7kabwxba41fktcf117ypwtoug0j3uaxfnjdqlviz6mhon7r2dyi04exaseqizyxoqayqi433jglfrp6reya84nlnceprrot8f82y275eypt21nov5fyx9ho09',
                username: 'ghzz5m3gu2fpdhtof4ajl2en8ghrg0j4r1kh374o4tfhrvf0m3aoq35vtd44',
                remoteHost: '6szyiwp42z8vwuzhcgj6p77p4osm57fxod1s9h47pgo7ob7p2qjnlaem1orbhc8vali4uupqxjpviwjk5aj17mvu7tlb35vs65l5lprl6iww5ln7xmh6ioiulnmy0gp5c7fwk933gxypsecrw4scr4rrfglgphg0',
                remotePort: -9,
                directory: '0oi8kwdtix1q5c11dp1tgj538776dxxeu9yiwzim81cl7pysuihacxstf9mr3gy5fincfokgqt4l4bcams341xtx8cyvo19tvvkul2mvnjxkw0hbe3m1bpxha33n5l4xewx3888jyufy0kkc9zfx5acnbkh2gp5kaqi1cp6rt3zpo9cq1p0urxadtktvv3z673r5jug9x9e8i3kian40ik38byduz5z649gju4glsz5yudlkabsb5hu21sl31k51bhtwa7wf9u4baqf6azowqi9qcefxnocuksj1zoia1wzozaqzp7tb7ao2v9jrc7cgzlyam7tnctcrdxmpjj8djeoydxh0umgnv9zdc1ertq972e501rggoddtj3kakfo1a0w6xhvwfhaz3nzkot4tpat6u7h4xic5qe3q4br3d0r4zfa2ycq12rvq9juuzq6ry65rybkknakmems5ad15avd0fw7qs2c8t0g491c3iwll04s8afibjgehua1lp3uq8h4ppk5gyedwpsnry2zqntd2vry9bby41a3lpcrz8ho4t54lp8p6apvdoo6j7ls3x6t0u559mz1ef5qcmczqiy13wt7lvgrwr74p3236eir2ecu8x1gr3d818rqeavd6lnsadv3yapdtoryxtgdpho0lrjyj5y8b6njjs6smenac2ynqu2zx0it903nn5vpqog0shy0626xm8mcvasd8oq55hn8kgq1r63oybc8eru9cxn4xz9pm78o0nmrau1gwx7dnywwsr11ejre890k49ycp8rkq5gr78mlrcmntzkqm6m9ffr8idyfk3iuuakzzf6naq18hjfko47ebp97ulltfhlj0mgun5v0zb86li2fn8yy6kc0q5sx7x771vbzppu1x6js7zvkn7430os9ahrmpiwxfy89tz207dfrwywsns46uyru1gjaseo27lotwsnmsohviejccd399zs4xb6kmh8b1j3w72ine5hl41b8xng3fe0n20b58g140l72e',
                fileSchema: 'nsgedomsdeeh1pfon0kc8b9vyjox4vnp3a2hlz7iyy6y7v45fgilc1vrfb0j82il7wdhyrw3j9zsl4j36inj3vj09jmowa4polj48ud8n8x8itjkvnn6tkpgsznav10tbtysdo5ykqraf2iukqskmyhajrbkj9f8l1i65nsqp84ucngex8w3m7oap0duj2y04frpetnmbqk6ar6nnx2dyu7qlv3ozcee6811pylgpuan9lz0eb1dw0qx2ae0ear2ror41xfmfjbp5jw96i3akknkh817fjpmgodttmmufug8gare8iux9xkti1n6j2jr47nul00iqsew0hegawh6bnjlqag8q7agwx6gjt0j6aa54sj210b92k41s7kqvvk08rmhvdd0bjmj3ootm4zigrxjxoagib2rp0c07fmqtkserwf0jxrg1o2yh3zhhwkwvfwtvpskq05wzz7njecuxppks4lpw2bu7dir6c7878s88chrsc7tkftor1157k2eggsddkwdc4spa0zfk6s342grxqxk8lf3g7k38l0ztzxllmpii3zuqzam9vyz6rw2x97j2d1cqh5jfplgl02yvhyo9y4li4t9572eh55n45f7vtpzyo608pbsj55k3zp9taw849el1aimyyn55laa05qzpvtjrsb0uj84i8ch1zyju1iv481hlev6uyhf6oi3ov37nreoc62gr8h0ghdfz0is1sg4h13h4obps9ktp138x4vwrvjapd4nlvgbozkdv63lwumvz06fgkplcrgrb44bndjcrh4vfe0mlttt52la4wmr3y652v4zlfp5havsogih1erf5lpsbunu8oxblvkw8ik8b5262vvgotz5bzt299v4s0nfwq6ucfw3x3s38whj4csftq7r9fncyhq4r060tbm47gvoy1crxq4isr18awisnxdkptynrzszczqhhikkql2j1turmu3mnto517yezmyme93fx98o47qwlcc0o9skarhbjyz8fo5mxz18',
                proxyHost: 'ek52oo1qadxjqpgiw8kdbjncq8b53snlaw710otevbswc7zth1wfo27dyrnk',
                proxyPort: 1728671454,
                destination: 'l0nvhp6dx75809xbjrafm029u9ssenz2lo6lvke0xsfe637jbxyy5gn8wwd9np803rilw7zr1uvxl0a25cyyjg59695h1t15hgin491qcjdg62gnt5de80duk1k46ps7frzg0xr3ao3n6odkwfbjekkr53r8h3ix',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'unaiqkmz1675r5gmqoj6jedq76d49kd9ocen7n56hm8vhphb0mzw5r35yp6z42r5tr2bf0x6j9s1ppnivyqewc1t9kpbyvsm6z5pwnlvmmz1wmkq94lyj7es7y98i4dhnhj8pa5jv73x6mrvbhngqnowag3605cd',
                responsibleUserAccountName: 'bjmmolaha4uffob7i05p',
                lastChangeUserAccount: 'ppd94ktcb6j00h33esrn',
                lastChangedAt: '2020-07-29 13:44:07',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'fp1833jhfp7dwok78xfr13zhpvd9b56or4laeegs',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'g047x829f9b1spx8kxe0lxdvqinlojt0kudi1z9zjraoi4zadm',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '3yy0dgerrxg6jsd77ih5',
                party: 'f87uz6esta5vb39urpqimpe0998u3xfw18gm885laq8i0j4rh741nez0ch77gl2lyczotxe7azis2lmczulihd63ziyoka198dwfa25mljqkd2j6hlbhys8dgeoc5j6qyubac7u9kz62t1cr8bblcg1gktuzlytw',
                component: 'iwxy3gh6pxwn77zj9w475l2fx600br7tmoa90rqnl3gok5nuufldb0630lshp2wuarv93e1v5p5zwusm2o6ennm6prtu12vg6do10qmapmsujb4j8zekzdwxmx98hhcdk8ykruke3maftuwjht4fs5kwywlaaedv',
                name: 'xjrc6mju7jves6c2r1hxs2gdz89q3uw81n2jq5n8rgh4s1zymrac1baojbaj3pb2hl0ccqcybz1rzc9z09tl3g22i7dezfh738kuod3a1o0se50ob802z4ef8ndc99x4d8qwen91mnkj9rgr8oa7jyrhbxm2dy49',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'lgplbw5tdqupdcbtjzvn5a4btoa9z7k503sh77v5qhrbiydpv1r7e6oshicdfju6l4eidma2z2rqshdukjoz4bjlolmkzkm27dnpwatrqz9v82pwbqqaziuca6ia9wlwh9ir4ihlyjbeeibqey0aq0rzyvzll4i3',
                flowComponent: 'h6fvc7c2leyh0uj6twm4kr30ndepnv5djlohsj7yq72nsztgu15s37qts8uu4hba6m819xreghgcqrxbhec19jarb5x5omcj5ut76ep4fm02umow6bppsum20rl8w4wfugo942z43uiig9kvi0zclzttx764i0k8',
                flowInterfaceName: 'c2ok2qq0re3kim4fzpiq2j79t6yuufn0v7r9818et1y1lgq1hrq6voe3c3vlnbjc3uph4ngwfkzplvyywlwjufeo8fgo99vwbigzul2y364h0xhxk9k39dzm414h3e4x85hin0s65xkcd8u0cyl0pdp6lyjyensg',
                flowInterfaceNamespace: 'hc2ln6vvfhz79jci1ic6hwx1sbolslfnphxal9z71w7mbwgj7wgoaluihywyzlpwy8ufv5qmfyjh4yad0ye26nhsjgz691wxxdsv2nuvpuo1xnmn7a3qzx5a74pynosuld1dj01mdbgfutzbam90wvb0stywc7d9',
                version: 'csixalfaxoiasex0i3p2',
                adapterType: 'ba8tbd5n5t8aviag35vuslxrusrmzscojr3fhrol03rhi2zskz5e4x2bchfb',
                direction: 'SENDER',
                transportProtocol: 'ffcnx3ybe2gqnlpi5ig2vpbxz95sq9xca7u6x9zfco99o7px3ykrdmosylmn',
                messageProtocol: 's5stcpklaqh8ukqr7jqag7geonx7f6v92pq9pjmdxcx6av8gd25u04xgkmbb',
                adapterEngineName: 'nuserd4pthqxz348leh4oce2ah7iv6gsytuo284w36ufbkvtvfg9ib2c2y6wj8vk882m2l3iouyjsw9c8i51jelmvu5sv52hv3zrynwc5sgrr7l9oz47bran1lq5n0sacpufmf7lz7emg6dgbuggwq0dz1a85tyk',
                url: '2ynrdskbmy42xzz4cosdnpehx5bqueqrfrzmg5c71ykydkfqf68dlg3u9yd0zsoi5oa9ss1qt1jvxv5pa7sllelzowz2qjazi6cjamik1rpou7m50olg9lxphfcn67wnikyihfxtwnijexe0bwjomvd6b3b9pw9gb4nnv15igk3obt5o49l1hi09kcyor63kbgx836dbs8nz7p5avo0m1mvnvcpwgvz7z1r3bgdeo4e618a752xgveykkhp78aa5lyy4ph66sjn9fwpl4ich8llcsxdt4a5fnbrgpxen0hxeflbubpapj2nnp7996mg3',
                username: '3fq18l5l4vxsgoia7elcg2cnrv6q1mhqiuql6gi2q7v87wgysaumlr7b6p01',
                remoteHost: 'fbt6n6p18an1f61dusdbn17mlxjd8asgkiq5eyjwqzgadkytgbwfsige0n5a3l5o4tt0ydq2pbvyixgfy8ameqpmvmebne8uovh1ilsc4w5sn6htuhi3mmvzvg1ds3j29bxfkghsl05rilqsc6znvznnuq3bte2d',
                remotePort: 7214306643,
                directory: 'rp512fn1fllu9xd82cv7itzzna4r5gwwq17bpzsd9svk510ytayemxyob6iqbuml11a58nlno5e2o0h7y8is0tw6614a3xwvaj52itkwr19e18gyiiwh41y2zjixjs39gfwotmydp3la50wd5ugx88x1wx0x1i7rxzxfxwftsxrm2mk96em85dnpf4fo6fpynun8cg7vitv9xzplai70n9pzo0t97i3gykul6ax6yb0abla5gyb8jxnc9v9xhr4adc2kfyxjwd5v35p74ak9p54luz69j5ny8htei6dkd50xfjfxb6g5whjay5kuycj577g7et5memkea1njh05pkdagyoz16xhpz2y6k8jwhv4xonoh0c67suq0iq0euvhsm0p02121fqckxp1q9gjzfe9qk5szkm43of4jcndhe72y3usecyw3zeqy2ol8f5u5cz11y6vu2ew69w9gaxc2kt4mnjc1tp57l7px79uyzwm0ht42w3i80dz86uvg26rr5mddiz25syaw37im2xsr8eds9se2v3q681wa97vceq1jxyt29jqkun0bblk7iz7l2eksb6gh0f6lq59bilr4tkzi5frt5pueybkyrlusahvyaya4xdylyhlcelcios5kkd1cmp6lugayxmkf15iylna453v1gqmwd2w9tz6m68ued5h1oz5ooj691r6zloq3pgfjgctjwbixdrucizwqhxsw6ux2u1ahebcvo1xzqrua0wgot5llbl93agfwdwzdiu0mz5buoroft33hop0kv8h5fryngn231zbpltsodmrrx15o20gua52hegoky8mua04xw8q17krw35jxvau4q9gs2v2ww0uzm9ku32tdtvpzs26cg06rsejctyusk5fna2jkw5e8biv2j86hzq2y9c4oe4hdr041atv7jrr8irz66jgogjxbnmw9eg79h4fp5nm7trncbyd4v2osf1z0fnc4nznzw5r1qmp2a1jp4oongllkwndwstppxlxfgau1',
                fileSchema: 'rwz12shsxs1h6ic9im5ls69brfuycibzh9j2r8lyc3xmtq38lejv2dw1hcilhyfg21mn7035wj0a1zd7w0g7umtszrb3s8j5ju3zlmgt9x8viheic1vb9k0v90zdjq3py7bdzjwdnynqd66zeoexo8nrfstkqubjt4awrb7lmz91aukpkfb51zyrzj9pjr95sfyi2rs29c9f8mksip855dp40g3zr2kjis7mrw0lvqagm5fod88pa263kgn94rozwrljj3shfy00fierhkji04w0czlh11nohnbgtfc6c0v294wxgonezimi1oc7zwm6ec43rgxobnvkjmqd4csw5f6a69a03usw74ry4jhkprv20vdntk5csf3eg7z2wtb2l119q7u7potk1irmlzrlv5uiw9679yl30jxmasa5v1mi7tgehd4kvhd0ay3gskwy4gttvndffb0wdo9wdk7jdjrk0fzz45r0n2z6wyv15s82d0fexv5eoq5wlhn55avdql5qthorgxqm1pa4fxaf8xijke0kyv7t3ncxyedfh0bzfwx9g7licfpznpep2kyff19yobt2rlx5t2563ygvosbpscjgwx3fhtkpw88rjge9afh85klmvs1g7dzz02gl9hx4f9ro7ou7bahecq14zuz5ztccgnd3ao8bjz9yd9z235c57h6jivn6k7zzstmfip6ke1yiy299koy7bgvebat2umkkiasu24cqrl399juii954ao967skl86eunaxfaihcop73fp6tpxffpo0uaahsogi1hfxu62khuyxizh8y2iggl8naielfichrfooj37gxye5lnivolqpbg5yn2y4qxrrvmj6uw1yi37hhi11tv2cp6p1wu2bundih0qlh8rnday04ouxu7cb3y046bttt29njsmxwh50sphkw6hzgqenwreb32h4csd05y67y7ve4gz5rqwpum1c8elwo38qdofy2wws49yqznc8jbs5jt4w5lvh2pc9vgzei2u20',
                proxyHost: 'xkgf94f0i8b75tjaezzxb26yb3d6yvfl4jub5xxkjfd3mub7kfyelkdb8cjx',
                proxyPort: -9,
                destination: 'c0b3dmoms9mogkeio95mh2r2ise70jdcojdunl1mmkngth6m8c675d8d187mja92k0k48efso3ygdcvvgyweovj2cdvglingu17u0dxtnvoj4jhgp2i4th0otql3oyxd52om339m8jahx5rf0g2icrfshti9ckg9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wbkql7qnrwbn5fgcplhvim2vhlzw9hofbdutyjc288p1egaalpsjopgfy1gsaccab5kgws4sqscwo53es28b1oy0q0o2kn012ctmlhdt2x0ppof3yinf7g86iu4it663ftol2cpd442sbfi2uspu9573ef5t5ba0',
                responsibleUserAccountName: 'co6x7g69rvlxhnszuc5h',
                lastChangeUserAccount: 'd7rppye72m3r8tpo4ws7',
                lastChangedAt: '2020-07-29 12:18:22',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'gp2a52alk4o3kwizm7jb4uii6r3nuxbeu2tp1g3i',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'fgpx3vv3d21vlnf1mua56teje61wh9yhudnbnh1idicvit3n1j',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '8jw1376lp1o2pw05l12n',
                party: 'wl422e6d93udg0354j6tb9cg1gj2k3y5lodop3x6li39e94ljnymxem3o0flx7ue9fpf2dqgk5vypfxwkxr8ijm2a8hcip8jcuuhl422zt1dxz6abpvai9aztr3lagclg3cv9er19iuar5cbuxrmlyonwou1v7pk',
                component: 'gz4u42tzferpy8c87gkun3ykpi0s93jqsgz7m85adrud5weujot960nmctijghb9abjiaebu1fjtlc02uuwotbs9xbnnor5tkwjaovodpw669oyc4kf5o1k0ysnmwztlnw2eg93rl3yztfrqlexhnlhsdxs0uqz2',
                name: 'fpcot6mgwx92zx745yxvf01mk7wwoiqp240b12tnkq5i61hb02ejbiqkfu804kerv8r2ukwihqyhkkvmwfn5uf9yio7aga9no3igivr2fu4o8zxps657zxsq2aqcpj81hmjsb9at27ymmhntefzh23ezkvyfh61v',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'dk477rtrza2crfxsp28j8ynoi8en10wfb91lhnvve8txxpeyvgbxxjgyvq0uqqugyv4snzucy2xe8fkb00rq70zcunob9dhbs6h5axkv6lnqk5o4w5c6erardnoixh2p2zh3s6ymqzdwuvfv94rd054j2jr3ow0v',
                flowComponent: 'fp77zrb2n00kyubos1rq7ole5h1hrt6v8ufdqk921b3strdjor1owub9bu2bbxua0kgf7pvbn0w6zjj1j90rnxqteanbuyyk6trf0tstirpzfyda1yg6u3avo2az5gf33mive50b1ncgefa0r6j27uoi6t24j5vb',
                flowInterfaceName: 's53hpyj8ne8p7tn62svewy4ls7zrrq003ydec6t269yrj9dail63b479sznc21h650c8350khlj9naqq44011uh9lr5xpdmi1oe542aahrs9uuvzllp9s1gizbhlhoffrn03yvg0inuzzqw1a503spzm9v0hy9q9',
                flowInterfaceNamespace: 'k3b043dmbvdqusfz1skasq3jwm79jlxmxg00khcmaqvitoj5zxfc061dwlj9piuxcrdtg9dyngpgqra08h8lz4ryf30poecnr6f1cebsoxw80w1tgqbj713l0mbeeh18szqsi9dypgr5npzhtojr66eefgh2efzl',
                version: 'g3cw6tcgyzkomyy9odv9',
                adapterType: '0i9ke2cpfeqjtu9pbnk3zt33plzu7b6q6gg5uitwjzf2xdxs9rubowse2z3v',
                direction: 'XXXX',
                transportProtocol: 'noj95pcx4ugkmbz8y8qpuz9zmjfgu8bueo1176wydjvcs4vtcf5wza6vfywe',
                messageProtocol: 'poz0m64i4r3ji21wns32jome4vfx93t82xkuxbo2pzkgueg0svsxceyoss8z',
                adapterEngineName: 'b49fu6z1fiy0v08zrhbwpgl03w2etp81i1isoi7n597blx8b3es623l9f415pfme4561aami1w66swq0y7n706mawk3c08s73ilqwinbojssve4g7bpj0mpsz9pad6dkxxvrbepkb6bdptkanq0zlfiqcw86x3ro',
                url: 'a3im6na5hvv1xh45vmkssx6karz4e7ugrllq03ga4z43jbvfgb204hgrzw378oswooiknhaec96x8tx2m079hrl831hzp6wakor674xotfssez4uxz6wwcbbdyzmmej3at0ws8ycqto2qagmcyj0sm9knike96yx7jqwre7vigodil8l6ie8vg1p0tykwz4v49duzalhug5p2tgoabm0bkhspj25fom97t032u9us5r6gjbebbc9bg2d44917q5klke00qyvu1ddtpa6ihv795iyj29pz4lyrgzwon197mdumz8a6q7czp1mpzblsxs8',
                username: 'j2o9upxhqz9gjjvlv5zrl6h8yllv4dzszi7kp6byeovbt48197wfsiz373w3',
                remoteHost: 'egmubf42a0i8onhe5wpp5355llx9cbacv52fmgll3wmlo60p0dr49glw5fn9j77xupoqtn19n4w6wy29tb9gtj43p9i6acormyt6agr1b8gj8hl56l7u05dbgl0gtg8by5w5urdhplslgfeol8g2cmvjdvtidgco',
                remotePort: 4831801390,
                directory: 'qkt2cejacqg91e71yjx79wl527yxz2avnezq724z1x35yta5k1k93i07sgv7h28pfrp3tl7fhvyck92rvu0gv07liys1ua51mxetdulfe4cojhigbv0amxakd6x7b2j1jbgsmpn75wg2qxils950scnphmdjm8di3pmo1mbhp221e9mj4esfsx0u04yeuiq07f98eubdwez4s68vrqg8208uu8otmsfwcngw7rijvf99mrpv1cabix1ndv7wyi5uqq3kwk8xwy7xhsx4lhdoqhc88sn5ex8ek7g1du4syrs9md4dkmame839fteu3djv6ugcwikqzsdvg0w0g7hrvb8w0o9ll0twh26kvvypb4us8m42u833oxtgcbcccucj4puwb44xrpyicnrcakt01udg1dt109h1jx0e2h5xsvdgt8scoz7ev0o89f2pk9pkyee1l7i87gkjiuu9ofl0msrdthhlooeskjr8hfw7jlx7u7tvephu7r2869g45g4p1nkaawcaulvh4uojy70cv2xu5hy4yw1ztriphba3uxc650j5m25d8kh0mfjr4zzpzzps4el43g7tr52lp7ff5qksu7en6x2cxx8yox7297fn3f3z6iaewsk9g1a58ggm6aiuryrv7k2i3xcvhbvnbk6g2z01ilc2jxa9stwe13bnh70qmtxdt2qox1cg5atjmpa8nxnq8u6wtc8p7bazpq6rz329kwh8y9hy7uxzd4rg7ep061r3n47vxeh6x0mevtnjl0rqwyldgkr6nfj9m2c3i7dtj1gepg04ga4b5ovuryxcs6iootpjh9cxs3dcm6bjzr6seo5rs019kqd3fgyv550eg8jv2aufxui0drvndtz4m9re7g419xxy9dqxfwwfutsfdi8fuw4gq9onbhcoo2lw1s40wguwtqeegzrp7y6rawywrpbiqjgjq4fccurnh9picyu98isgyrvigv7zflo3g7inpfzgplo8nut04fgkmj5uruxupmh1xedu',
                fileSchema: 'kju3rh5w147rwerliic1r9147evaaq70jntl3418vcjwybis5sk7ft0thfi3zdh1aq07n1aim1fitpu61b42tw09ggxwnucjjda2zoeju5l8yj2af62aqlwddu0pcnvv01hw8rbqppt9q40hluzwwylzf3e5sqen2262sw7et4h8tgzaswknxh1jj05sayay37hvy83wisgz5dqi0db0demm80nvogybmsnlcdkjqkggcv0fxjcopaxuh86aefg36p2uadfhwloro72ll41qf9jny4nnu074qzqy7sodv8x2sshd3snxquv86j9mo1zjjitzs6wwofmoepgpk2tdedkqf46lxk50iwywwo45utdexhx7okyx3b229ocvv3mm7h4tmqhfh1768oeyiqqo2lp8yel7x8ikaz6qqntc2v157xmiuqytcwydpnmgp6cw8oac8ks0qkhutlwzufl7mvglfcmf75qr1ew0vym287u4cyaqfgi3d6hxp4u0bftrdga5n8mhyb9l0bo8esiz8nsbuc3c2zw5pvj83nhvzz34b775izxhb1wayovckzhj5jizyy8ct0oc31320nx7iljb4i5sop7zv6m1fkoyt36jvauiooafzvgt8fz8ugx31022xjfr4pwgp1lm9r1na15d5zpr0bd0w5ntzcpg3fsuwe3blx24x2kzocsvjpf6bzqij6uk2vhmx7pai9bfmn2j3373mtro5qlkg24rlbpv7lh2msud3dgjsceu6whyr5nryjiyf3l4l1a8sy4w9pccc8covotkfaeuj3098oebn6h8y1g2aqv7ek9fflhtfuzekb3s2aa2zxfhv4j6ai0uab7f8i6inp6ztoetxbtbmfqietwq4756i1s0tp4mh3z6rvoq7691jjg7ay0sh6l8bhz6b2ss3x9697pr27rem3fogndu5svj30fcl0rce4tt8ha7ljroza1hp0mtek9dpkizv8pifm2uipl4u1utnnjrzcacrewkh9x8o0t7',
                proxyHost: 'hitiqvg2y7ysn74s1mhn4lrms28kcevdyhps6gb9dxpjiro7g4ukvzddmyo8',
                proxyPort: 7715635721,
                destination: 'qdp69zgb53he1tg52gyzfz5jkikgne969exu5qtfcmzfqdpvduiwvyydocs0kscu1fus30uz668xx3317pywzdrir5o4bb0eiixi1u091auxfvdsx5w391lfexqtn1cgw2u8y6p6mbn5n98q9baxpvlymft972bc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bavyxpu3vodiasy4lz1v7zoipyq96p8zs8dl4joavmq8ylmmwy7a0nvtn9z5tpcufk3hufxddeykvwlykhz1ibw88ntfxetd9pfa407pbo59wvki21x0kqmq8e18tmf8t0ialsnw7y20be9073ey7q6r1scgl4yv',
                responsibleUserAccountName: 'a9aopyytkkrdiyuxiuzq',
                lastChangeUserAccount: 'ls95xmaps2fgllcrekvd',
                lastChangedAt: '2020-07-29 15:42:47',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'xm6hhs32g4mqa8e680w0gupn8o0ucy7bofjchhud',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'hostt7y12e4n3o6aqveq1hfo50c6666zyxz8kxmzjx2eumujlj',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'zog87mm0splehqiqrbkl',
                party: 'oqtn7icop9ypgvp2c1lpxhutjtey1szxuld72c5evmzsy2n0t2o3lask1p5ir4sct58uq67h6w9frm929lxbwtp15mgxqxz0xu50oj6sd7k9sagib5jlaxn285mg4neky7ateiuwxm30qk3zto4f3s261dc5m9f6',
                component: '9xwgh54szwveku3621259oiyhad5y2rgm72cktlclso6bohb9q0pn6lfaljpyh68gtg2636n4nfun4yb2xewa2ww1e95n2ut2dzpcjovq6rk7f1ql1uscb7a91h47g1lq5gkv4pvsy1yvyxngo11im8czybdkwnq',
                name: 'cyf7m7m32c2sit1h1batytgytdlwlmiubv87u7aalwtsenm403qu4h9ggicv5o3ezy35st616ftnirzfkopv3c3hjezrpku7uujd1r7efflxjpt3y5irw0i2jxqtnn1nw75ved4mqau5pycygiiduv1rqd4u0d24',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'm6eyw1azh8rdqwk9drxgh7yp121zuk28bevgq6a0znriqw5etja21404cuohopxbj2px52s1sht6cvk7h68e1unxstevecak0mdo7ztclgtrtvqswopm6bqwv9r8a658ybpz776j849ihnel4gngl0m3g0jnvvzm',
                flowComponent: 'tuka0cmzam5nfioff5hxnb2iqh3npnj9ovf1kv4oe5xgks8jla2j5t8z3w3m3m3yvowy0vjs62uu2b7pj90jkssj0tc411scjl1tsajj95g5m7inrsp5lkbkh0e92bv7i1nqo8fslvhtuljulypw70xbs1cqslqs',
                flowInterfaceName: '3sxb885w8gbfw20sjjiacg4zrdik7oqtfrm6ym7yg5rxlo66komyoemkjalxoexd3bqqdjt76tat7v8iolty1aa4ks3g94j2eu7kqxv81ma7r3bsvcqpdorceiux4v6ynq14dhbxdenmyb80v8mf9cc23ahbwvnp',
                flowInterfaceNamespace: '25bn1kft9y4sfi8nxks7joinxa8dx4elkl7niqwypsh5zh8cnhlka5r80yygk269vrhu9z8kyz9oyriba7rdi9i03cbycnqcjiefiqze1i0m1qimvykm064t3j0j190qb2cj3hfz777m2bs0q47cfq1vmug3kbxq',
                version: 'qhrq7gm5x6hy7d3eqxqm',
                adapterType: 'au4r4lb3xppuqdy45qw685itafobysjdwh3v6a64xb2jlklk8t5kcl60d4cq',
                direction: 'RECEIVER',
                transportProtocol: 'tocjbzt3gk44mamtncxdlw5vcb1haqqcsv5hs0c327p5ajsbld86iyo4fsww',
                messageProtocol: 'qdcktp5jdikqyceugw515jum6pco8rdhlrcttjb1g2c4gonmqj4z1lgn4r2c',
                adapterEngineName: 'bddzc6qhi9zn7ec7zksw3tgkrnwmlgfom6wi3xwmza5a995b5kkd2xo6uxq0k0fu31i01t1iv9vt74guq9o8yerua0y93eqzfzcibisq7k3u1m4cevujv9xd1uru35p5054e9zw0ksr6izhnpt7ed501npksp89r',
                url: 'hd2qhb3dgxxj7giwt42qs0xlvzt53wtwyssnfjdjpr7fn6tjpgw3wqdsdzd9tydee0a4rerygl0l7r3f9j5d3bdcv4uoj6wjyjz5m2eax486upbhboaa16t2gj5h2yjfge6tspbn996q5va2xrmkoivif8rzp3khr5h3pasmw843vgc6txmn87rai9wz8qksstfiazv1d3qsq3aqtku09gndafwf7cw6hoiqm6957t5pwfpvjpgcbk16a6v3wb5ak3586ain3g2ggo7op6yap7oi0z6ndmz9wlr7sm4yqp3svjfyve0srqpm5ixi42i7',
                username: '03am48wg9bsu4jitpwh5cqsm3x1o9rdy9psxri8ri4lb1mkmcyovfqd7y4d2',
                remoteHost: 'v6yibp6dqy27qyo928jv305eflo7mtwng0dhbf48jk32ajcl6o0pcdmieyemo10jlepczzczcc2fxpzaa7rdto6udn16lodkec01e9ga9we1iwdt0wiv5gnzrqtsjuj6raevebhhf7ebf975dcmagpwvwhop82p3',
                remotePort: 4710388028,
                directory: '705drx3pixeewiume5jgg63lmj9qowfuqynws10wofv66zs78816zyrhn9tdbtzs45jo3q5ckdoluelt6aeq6e1dv71vrfuqv0zd5zdwymz9t5s1hyqa1t9mg3ulcd30tgmn6nvzmpm0gx5ew3sddziflb5zt90o11551ycqky4sc8y7e3zsn9cwrv1txy6vuvuawx6v3yg546di1lcqsh6lu9yn1w5f16imthlbp5j3vz1ulog7xvatchrv28e4bympgnhrgmc2i50f31qmf5jqr9h3rhij1hyzxv87bw154he0ri3f2as8qmjboi52ahwn5ty6uwraduo9mzrptxz8xivnty715x6bz19puuj4q8yc9plo1s1c13bgwigtu96mziknc0flj6ajbsul52ka6bs8b5x60u9ib9yiptq5h8sojv3cng4ws241uywx4p9xmalxr1ki4fx0xafapunobxzm627tyx9trpd4nsqg37466q8ilvdh7w0506cmhd04l4pgppd6kpxb3lvkxr7evhnzwladmsc0grgrat1ytbklilm0bkrrtz0csc1f1z2vqlx78ukork98i60qq8vey84p2mh67gmi11a4ju12rx93rdjktjumkhe8lxvjf5oiazsajime035y4i9zpnpz9ppr466zowi8ur8uaza5fsr6nxklffpxxzseiancoigc6ciel1de7hdohltdzm05lkyud1zca3hej20cjxcen261f8fxi7qpwzezx2rb6tpye4vk67gdc8vajges1nhy9i86hqybhldxte0phv1nvzt5h193pof7smn2id1xhmx4vafu30cucb4pjj5o0f4jgida14db24shaa9a1xbuye2d27jgvsm07hh3ffgkxkk4ekfn49wdrtf37hl1aevithub3e8okrr2i20ebqqx1mnmwmwtmzz1jffughsfsehu27tdp9z0qrqoaa5luazz5d4s6v5e26kun717ypt1c0ioh6oguev94xybpw6y',
                fileSchema: 'goshqushtn86w7xjtw5jy5eoya1f4uskcsnu1vy220nv9y4gqv95jzpx0wrd1xxkj9hb1wm6ohdsyzdwum9hq20cgtbcax14a5tw96ll4q56hy4dibjf4bcjm5nyry3xqf0n466z7yvjap745y6e8a2f6lkymj4a8t383da4r6ov4h1117o3c1ce1iob9h7b9j49a0e3jip48yvvaltn1xwh21svfylyp5nvgonwr930rma115nvxstru1d6fjcg2dyuu7cmms1v5yut06loy9y7pjc0vhi6nmi1qoq9o4dqox4bze5n7wkyi0s0wfw4p7scrf1wd0ns0jxm18g65l0i536fdyiu52dei68p7ajqiu6zibez7pf9ae205h82lzd0m5znuk14ua7bxeyy3kl1jq3ix1yh2w0ixf5zgn0uioycci54153s0hwxm9yuitxvhvtfb5uafefu0p67bsjejx0wwewzhjill1rntk576yp6evdp08dmc4ttnrpzl1gtb0sgxwyyeowwqk6n0kj2j89kixjxgdmt1jpcyrclxlpa6a55sqos7cnwzxaqp4xbndo3v95grt314wo81ueiuym8113qv7hzq772m86jvbijkafl4rdq573b5fu4x3tl1hswtd4jcfst41m5t7w8e5atrs0wtkwg9vmi6qorgds01ih5absba9wlcru3jjcgqxc1r7c5up9boebxbcrxun88t35dcqvg3xstlml28lr8ftg8t9gnb9ho84b7x6km4irjipj9m9zvw24jrlibryb16lqceozp4et98svnvudn21h938deepsbjk0odwgzgt9b521fzigm4uvx34higizw7ahwzgcmmdtaexql6npo9l73gnw4gsmb2t290dxpyzt24cxdor6gw1kkksptdph9ik55s49k03ok5m1ctu70r1j4zxubfmnsjvxu8zc570f7lgn4u6binrr7f15jer9vxnw4jo546dsnzzk8gboqrpuwf2d51xlnl71k',
                proxyHost: '5ci5h87yx8h53ili96m2deil2zj42vno25muvcrrpz18zzfi2mfqv3a8s8v0',
                proxyPort: 4415544027,
                destination: '2km5c9lkphuvq6d8otpylpmrsh6bjl5l3bssod7cday6g0lsnrospsx4ymusqx4apta1ux1yq37t8lmdii0djxlked0dr9f2pknenj0behs2l2s78bxczcwa2nqbasbk5xvusrzrnqzubgdkbnlo6medwblz9j1b',
                adapterStatus: 'XXXX',
                softwareComponentName: 'rpkuddd7oztrkt9cqwhfkc2tgo0fzrg7e3mpgjsjywem07b58usoey9p9apykqglsbe0gwdwb7ymsutnsekpciyc60m4ipqp0skj3ijpbyv4o6krgpc87tfdqz2pwju9axv84x4bfwrlgn5dbzvokq6fdgydtdjv',
                responsibleUserAccountName: 'r3l9yhd4kgh3re0fnlol',
                lastChangeUserAccount: 'ddwo6qs6l6zo6yxm46eb',
                lastChangedAt: '2020-07-30 00:48:36',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'aoe2eta2euifbrfvo8zhupea7igpulfsuvhdu4hb',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'm5dzn6ckl2nk6cbn3yot3rpurgprrb1vf5hud9x9d7283glu9t',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'q60wf7p97o0mk3zxms5h',
                party: 't5aq9kq4597kjmdvlsddamlogk9r2h0wkmaejg6gt0g8z7sbmwe5krs5ht2cpcci2tl03fe8pqhbe7sxunnegy8jguv5s5x94g71ml3e3poakzuvlr6bnb32s7ai5pwq6d8n0ssi7gz6ifbgy62fgai9jtrp5t7d',
                component: 'lmnv5qijz4vt7sbr0kqotfzrgmlq9kwr0m3qf83yhk3qxplwhfn62kwhtaoqksrhlqo114qlorrqlgae9131cndxo6q27vmhynl1d6l3ff56r5ts7guo69gbtzu075uxc5adtk9uylw03wdcw1gsuju93gk8yfk4',
                name: '6xi2ed0roxvx73nu0oh5yif0a40kjzzbqfxawqh7hskpb7sdeqcr6lla2n2l8gmqqier9v5va15ab8psqaeovml8pg3qsv8ce3xdl87dsrr6mwh9wzfq66iiczldlghchfsd2ommtboq4gt0gggpr2pn3ehcrnqf',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'xvlouc88s30itgrcdzo37oetmux0rnsenwmcycs51h2n6gtgsiizrzwcs3go5xdpvn6cukxuhv3ssmjrmnxa3zm5g6tofvqrsk0qv897zyyu8fy0ahfxyzxqbvv8bi64ggz0lxe03wcvrihqhxehtwhbopw7f4k1',
                flowComponent: 'zbs0j4qzlgxh89uh6otrj6798b2cf9g0yyxctkzzun11w2v3vi5i7w13zsyllxt8pi9p0frdom7mu4jiokgqovv4rjudxregcjrm2kbs94xj3t5urrkf42d12ratr7geu40p0nxoi2ypr4di8sqgg8wffa44lb7i',
                flowInterfaceName: 'gpr4khsz2ght9dbzyzwd61ad4uwoxw92ld6vsbaxwhqs63mrn5ng0c7eo93574w46ybuk2elq7neokiqp9u5ockv91mxppq2q4odx02wvq9a9gntjkn6m2a73psgpk4b0b5kivnng7uovixnepfyei332anrubgl',
                flowInterfaceNamespace: 'bnbch3io2bdmj5svaxcss8ej74xs33d7389cxad3kfhq8js64t5ztk2b32mz4fpq1j79r54vv65w4a6id2gvfgfsf99kxgvp3m471ed5lisqxo72a3wgh4or0wqo1y9x4rnkuljwz43q4dwlf21vbcm5g4qqel19',
                version: 'ngqbv9kwz9qzd5n81a2t',
                adapterType: 'dtcicxvuuowyhk2wwdb5m5lptj26o4ibkucj0hts3qcqpexhs5rk2gxtt6hu',
                direction: 'SENDER',
                transportProtocol: 'fufl384fx8xrqacvgwg0n0esvn9e18c3zhytycb8nhq3z0eie7sxpcidnq8i',
                messageProtocol: 'hcu7zm8stgowkwwnq8f9dvusniub0ugwtimd69cj1xkwf9bjvg20mqr2ll69',
                adapterEngineName: '2i0pc42vkybn6ulkhq4umb3b9dhsensq6rmmkbxfxrlt6enici6goy8g5v6zzkpfh5qwfp9oov71lm0l6gt4dbrg5jnuysgeda8e5aqhzwccbmhjdyeycgdock1qd1p4vlmkuq2kznre5msq0h5wuv53pt6qus0v',
                url: 'zhgv01gjyhg0kvhkr00okjj8n0nnrdzybqcdaushi88z2tcex6xy9yr1ndlnl9ulyhyvwyrsn0ke1hao0p56tjsyypcttileh8en77wq0zym32rov0yirnfddfrjkn33rrwbqouony2gdokc0lt4zhs11p947yno6d6ij5jzqfbmvsv9kkwj7dx2uehfuvz6n80yasa27nwjl40wio4q50ioe15nb87l70j395f9oz4btpy5xpzpogg4jbgw7kgahurdebc3vugfuhqhf68510lsp1ljofib4yq0fgky2kjdi1vr3abd6ek19zm7jtvi',
                username: 'wedm65qsfjp3fhh9y8amhueohkwu6j32y2nj8rs1u2t3pllwfcck9hq0t3am',
                remoteHost: 'w2ldpco9d7vv7w60e9lbdvhuaw10k3eb9v8fwubrp6gp6qvrt8wkuzaic5yc372x10iq0g22jrgtksknr6dvalmhk5x4wk754u3jpnygtum53e0m63x1uccdikg1hkfs3gwcwhs6hscgq1yzm527p3p1a6dmqpww',
                remotePort: 6763217449,
                directory: '1osqxwz4tervrjwdhl3p8p7j77haqfjrprohfkr9ehr8474letk8avzk5drn1h6h30761braj0h23pcgq9z7nvo0ew1e9x0shi3klq9fcxuywhz8we6upxmli1mw74qw00tiigepbcw4uf33kxw6t1t6f1hlktssq8s2pl8pgsrwvc2v2e1xuih6eg5xpxbaf7ce303ip56lb05reb4jvf8zmcc657if6ktfe2659pb0set5ggjrwaxedl45xxaeuf6btabmetqah22o95vf6u23jbud093ll1x59u9b7c9l99czx1m8orqa75fae36s3vaztski690iny2w0r5k0lxf4k2rtxj28uedd02ty6u3vvkhowtk2q55hm0555na2vi37bvhj35w7ra07qsj2df7pc96yohv075zke776ccp0gi4vie3qhvozhxw69zvgkuoi4e69o0ieikwgzsykltecw9xi5igr05yixs9p630ko221l04mid5km9fsgy1xqjvmrgrn04kped7k4bqnt0rpwe6yuqxzvmet4ticqkk2iq90sko748j523eibp8ai8lgim2fe4qy9eoc8cc60j5632wjjfyjsx4232n0f24nx2j8bkj34chfk8jqihd0iwkd17vhwxe51cllbngzkc52efk9lw3ilb3j8qip0moo11lyf7zffx7ghcivp9nrmjg3gi4emzhfiocfibrdn4dlzeqi5j3ubf1cje80a74o5xwpqevob7ifihmo5nna60nw1vbgi1bm5lp2cdaajn5cn35dofvap82vxx30yngwkc7bmi6qs9667ilaz12z3vcaooqumje5md94r5obuvjvg4guqslmdpftx45eer05tkoxopyyamunmlqzvlify1z3pja6c4h1muyu1nmfc1z489rljcs5uz52t18dajbhvh91r37yos1usajxid40hbo44kwopbgntbc8ctgo2bjbuk420zctewo708ucjy8u7uwbkh6705cmbdbp3vy',
                fileSchema: 'ogx7o2u18gx9i18yl2hgumbrch755ffrmwv8d52cj1af5mm9kqaasr7q7493t6virexfesvg3u7yrwm2b7rgx0k0eerx4ptbmfutl9y1p3sfix79z8pe5gz0vci9359821uw0q460vgoq2no2jmza8xv1pm05q0isdnjbococr8c872a3xtanm6lcrxkzngb6lygef94marxj0hnfh79x4c7034bdfs5b7nc5al12ibbzknezwoymh98bz8kaxicld95i5i5hujjcakee8horbsd8bo1wipcrdwunwmghcj3hebm4zc6n9h6yda58i2nkr8qkc6r14irfsqgsjgzurd80eawsxmltf8oksk145em7agjj1f17t60vxb6uhiyxvkiey7hf78su2ia4host950bh3lch1c7uh66o66s8opb8ostzoh4tfbshx21f6gtzgenndlwkte4ub5tulxxfdcsxlv6zw9mriiguzyjt29uzb4mp0hfiu02zf7arrmodg5g79q2m7ai456yp7kj5g8fwy1wghktfjbe6swpl3ar6vjaoqzp8ht8ctmr51c8cl3ybfu4qvmktm46gps1brhjvtx2y5km1gbmpu9s38jo8ncj2u4tz0tk2qr0mhkk26snr3w2mmiutkfp8alj04n8huapqq6c0yhku9us8ftemivq1y2xxt4u3ztflmwseupi98fmldraqghlapzoggr5s5gvxtvu1xgfhrlefbqd1o437mboq7j9bk0xe1obxntzq3xyoyxwjmiszhcnc80eccxtd84z06ujeu0qr9e7i6utzrgieokmei2kkbwwnpny8ta6wnbhankoxtu06h7ol4txj3c6avyyf5spz22phqpazc2zvuunbrpi8wcelr2os0ahqctky3tv3guepsa7fq87tax9ksjecawaqa5u06kqtegtjvydwf3zj63lvaz1ziamnwzf28cb4dx5bu3vqgu43y697pu1oiwwhnvkkd7fteyjb8vhep4483h',
                proxyHost: '448xlas4h5dz4ykckvgxkbexj7cr2rbanazk0k3clxbir6fyrl4glx16b4a5',
                proxyPort: 8916683444,
                destination: '2unxg25cty7kpg9g1c0ydqnupscxaw0hwdkb1sguf413lmt0d832h220515kpkxoxmj71kroeycgq3h4v2ideq1mr9b1j53xok9upz3dca0mswwefuzzldk346myg3rr1j0982s2uiiq4tdkjqkqew46tpwzlqbv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't95t3p4tzgxvllt7dzkws70jssblfgbfe6yesjat16f4urj15n5xjr4ql7y49smpuexq690oiuja52yv93wksp2xhfi5mud7zmoigmp5gqlz0fidv0q37lg96tkel2injps1j2astdiif0tcwmaho5nuw05xdpz9',
                responsibleUserAccountName: 'i5gfdxnkgvvbi6h5n7c1',
                lastChangeUserAccount: '4ke90xgwhlzn0o1wimfr',
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
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'jodz9794v11rfrvuclmqoyewyhuef3n97ydacn4s',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: '137jlo3d11lu5bjt9qt5zk6kjt1qniq6eelc4pg5fpt1n02d1s',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: 'qsxmkz2cup126wzpmpt9',
                party: 'wnae44xqhcmsihfjblh85qzcjrjn475k8qcrg26r9ncx4dm4yhgdaa2i543qbbruok7u4yw7v1jwx4i5x4k8ybxhnzwfdyj8fwb3b4p1nfep42nhrxpqzmloapi5yuw8unqkpn1bln5wstrddc4jbhgh2ez2971p',
                component: '0kd5qe9gsjzws4kk2cuoo9z3ut4v21yy4h32nqvhzxesu1xptbcnctip8uqmupk24pkvaanqwm1fbc3nzmdgayuqrguwbcs5qv2bqceio9ctraym5zx7byplxgduqij849bcpc4xae80ir2e0moalhqfiu3dn5nl',
                name: '2w3z4ag47h19ugoxxhfe5ntioumsa2rqq1eak9rzsow6slzbuvjqdl2eor6gdim3h0ffc8s1ex79b376ty3x2scysyl43i5mn74wfvjv3384zedg2uasos1vpxh18zljphi7ezp42wmzivkj9y94iqqs2iedmd5z',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'izzld5l90sdr8btnklqxmmol7ukym38eod9d46mevgwpcfn87c9j37r9o9s7qd8rqojm84ymyb71ngwryvnsfxlveclwagbmore61srswjuf0s3zv3xchtrs7gth0u3grnldu55410o5s5rwjergynxposhax3u5',
                flowComponent: 'lcnfddxli8lwwmt5rcjk1q9n3wv8afuu3vn3suwpsm231l3nohhdrvy8tkui8fmy10bvm6p5nlx2yanw951mluw3gbuqm04960qel31fvxj2fcsl13jjof0nul64av0tkiq4vyv8gqtp8nbl3x8xuqdfxy46p2me',
                flowInterfaceName: 'hkj6iv8z92n6bnyinlw7atyrkqh9o8hnljstfuj81l412dm1c5eger8wwrw6qf2lmcc54wxkkcplm5uy6ztklz79h95rg4kog4ihosaivg784oen94oet20406lf0eagfw7rg9wz1luhcara4ehw5lrt2bdx1ho4',
                flowInterfaceNamespace: '84famvde27ptisys680pllu060mve2ulyg8ag587p66fnco0xhwwu4vwlzc32cq8jvr4cg4tpm5b45j2dqf5l2poc2whuyuw5jrwt7q5eegqry9f3juurhm5q5hrsl971kn6wpx88eu7fkfnm44yfobwhiwvtt5l',
                version: 'jjgwoz0t4wxtjs63mpq3',
                adapterType: 'q67mllitdd7v439da8dh6uq6tpj5incccbtub85s3u9ds4zsz6nez5mjge2x',
                direction: 'SENDER',
                transportProtocol: 'fnvnfmiix9ufwbs0s7lg68ax7i6t4jomc9zdcse62iy2w2roe125qfrbd3yd',
                messageProtocol: '5vgtl3a65i2vd76wpvqriu3t3pmvg0tkwj6msg0t2280izvathpuosfpi2p7',
                adapterEngineName: 'cuo5fjmak72m64qg8x55p8g15hqmruj2htgqf0vj0agzwqr4rfa0fqgi4jq7dnvcoscsq9bvenx38daiwqevk70yqgz6n2r6su21hpnhakj9ggnx6izl5ycsf5cvkszdue580626156m3lbs1f1q0sl7ilwreglt',
                url: '87w4c8w3hyk0lemtbmghax18zmqyxtfxylla225vp00bvi54cwd6cq56dosyudkfivo4hlq8ywb6wxd0svo39h1k5ovnt8n60nrmg3z8otxxie10j03ppde98qew4c7ssc6ujh7gapn7wvmoq9q4s8ouh7or5d80flx0jp8v2qwo6jm6did3olqfhx7ull9vhxba9k6jzatyvhqo6shy3ghaod2pvpu0c98z52es9ly5xb9ah7mfcwyyxlqc6b2rftl0ygqpfzwrgnzyvoz4o2cyv4kcdpko78h0j50pk819vw28zhzjbz93ifzbv9tq',
                username: '8wurkufhfs14q3m02soygciqeko1zeovm6mz6f7ruwteq8m90rzaf8yew8wp',
                remoteHost: '67l5br8j84bfxaqa3zy1wfqkv3c2qakzmbx02n3uiqiykq7u962hc2eub2a950znumjr276d3xzxyjfid9knkk80vxhg5fvyki05vpq4hovs81dntc68dyfud4z81xdqje5z00pi7sp3sroqkmf1y8rs5hhoeyzh',
                remotePort: 2543866785,
                directory: 'f5xpy3jfrzi2byfwo6vbgajm1rgofcg7gesa3minr02yk9btp0d3zru3g17kf6i6mkia28tlcnmiqxp6fdxxyqxv7efsb9f7vhcqx9u31wt2bhh6ucbsf1hg0gl49glv8nksqugj8rifk2oc79czwtt6bna2pdtl72h4szkzybqhscyz6s0a753l2jan3gvv0tw8cwrgpw1cveudelwosej5mje9eodjcrkzgnlzzq3ginx63qvfxp4rtpxodmj4a1smioso911agrzg142tt01nouq4s7j221u3xleyme1xrgiya0i7r66h578gwlf1c4apncj4vj5vqmj1squj4jqk9ppdgqs7h5p5ma8dllrx7zqi1sarz12ytfayv44suat2v8g4obdsajrogqpai9rlrcd4cb12j5yonstt6t0ky1p0keqvuh8krdobgh3uaym2h0y8u247so0nhdypvbpqupcm2ky19rvuxkbskar41fmrjkc7n3ur5xv0snincn8v1aaf0b37jmvnn28tkey16i00f8x54ookfzih4x5rwjpyl55owv05en0gopagf95mtvf6o3bt9axmaz3aipngup78zjalv8b0eo8cc75i3jpvqyolo9yfisijyileivo5arpl48qtsloslijwfees2jk6p8bt6ush1h7ayibqkaixg8ps3dypun52qqwvgjbyik3e80hsvaswj7m65xrsdgs9xaehzf7wl7ensh57h6hlq0u7ggqw7p4h5ve3l6aseeem8tozodnwqx7wwxw0jysj90lgjvluwxo0di9z9a3nx0rxy0z45k1ks7yhifzkrjvy1enizioai6e14g58dtfs7k3w5zwhabnwcqgdx60bfi4bpx7zefpz5mlqhek4ne7b9mvjb61za4zmk5t1brd5pdq7ml3l7ub0tu9fpt57habhpluncwogxuliynputtupw0r6ji080wlg3fzmsfaim7a3z2olmowog8oq6lnm7ptwr42514puod76',
                fileSchema: 'mz9jetukzdtocznahmlw251aro2x5h55rwi79qbkiruboocwljhm9yvunfzoroht0i5irhx0x4g9mluwpo8a7cyet794uydkmzdfo7e5wtuc4sfmuorzfnl8frnocm30rep5jxtxos60hjzpl1j6nxpjmnx5p61b86btdmy28atw5m5s4qq1yj3g9zdozf0z50zndyejs86kavcv9pvz7bx02dro0tjk47y99jjh8d1iwt3mj84zf012tbi4xuj2sxp8h860j81rkh5onk4zo6os680aegaxbyn7abbtl2etemnomtk7cfdump6o7msqxy8x9potpg643jh3fawewy4bp6p51bcwbmn5fwmebpts3rrtsotrg834xjlhgdwcj4d7ed5f32k1gvw99fgkvsqrinyu9x0meex45hqh8vh61kiibevhzgvap1luvb5bb54sjpml6hwq4we9lm2rxfdlqhp6t6gfz43d813n7xgz3xxhb18fq5tzx95w53miumb466h6cfepra7klu4kiebylavs6hpd21hp31fybssoavi17jgvbk9lhwvxom79kbvc1aj316vm1lnl5slb57lffq9fe9nv13ob661hy59w66uj9islbsp7vqo12omo0bm4yszipsngzjrt5ie0kiiruqmorcgam07si8a4xgbwi2v91stmeepa1alpzxtu7h3kf5i6drm1cdne659maiockycuodsa89x82lr9iyvoh2jsd8dq1xfgso9cu3fz4rg2tlldkduy7t5izm3o1zshe8r0eu4ehmghjy59ybsnmdc9yxe22u05el48cezs5lir9nvhto2ccc3pu1ryttw46hz7bmtnu7gdw1sv0pz156t7qxhkyvzibkhng2wn76zxovsitc90nmdq3zisu3kcce3esyv6hc7rwzm00lbkifu0z1klo438ef4mtfkslzlekpkwviv1y0p56a4m945h1sdhqq67wp155xs94sm8bu7ciqunjpjlsyq6yi1f',
                proxyHost: 'y67ijfrc7kyufh5wyu1exv5ax7ht05a811cuod59pgsjg8tumzq6821mjcg8',
                proxyPort: 6287920191,
                destination: 'gnf8xyftl9nyjylsouao2pamb6zej79zfgagqt2vsnhscu5fpvgdpbag1135rzcl9v1dgk76as157mqf1dls1ufc4frwhcypxlqbp4dl8am60dpfzgrx7qkficdvhm97t950lzo1cdnt81bi0e986c0r49wo1a5o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gzcyx3a3kacalmp1l1ugrqbguyj9d96ks4jiuo6zqc2hq0xaoy41y7v1opkvlqnds8sg3psz3f3xej1eiwdbvw31o3dhqxpwgp810steq6orof6vgxq4wtn6lkcpga77ynkeamjm4dvdaxc2suol8jcmpfmo23nt',
                responsibleUserAccountName: 'qgb792kocuvycy87gq8k',
                lastChangeUserAccount: '1a01l4f2tiit1k9zgcpd',
                lastChangedAt: '2020-07-29 14:00:57',
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
                        value   : '3315c67f-81b7-4c66-94d9-72d5b3300363'
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
                        value   : 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/cfad0e9a-50ed-41ff-a409-5853ea714d28')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/f56fc17c-d8b3-4a58-b054-c72bcd5865b9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'));
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
                
                id: '77836b9f-1708-4d25-9040-e547c167049e',
                hash: 'kjhf1ekew0mmi95ah5arcnkjetib2m5cq82r8qvv',
                tenantId: 'd97c1ded-44ea-4370-8469-e9730008ccfc',
                tenantCode: 'wz1h7fyothj55u6j4c05i27vmmo2zy6daj3zzj1y2wvtlugmg9',
                systemId: 'f0851ff4-e6fd-44e5-b32a-4417cd74177d',
                systemName: '5bkhj7kmr96qx5afpofj',
                party: 'i4ke6eyk8gshzdhy7xc5255igg5uqn6r66aj7d6th8fu4rkah5vjilndvqwexwjyh6btetugitree20ja4n3ekq6jmihsuvvbb308ziw4sq1irzxpe83hur5bg2v1lxwubby15c91p1safbjzk4i1nuyiqir9d7y',
                component: 'roco7mym3kw0y7xav35y5a1x2maldindmxptxnet95qtxxwmiv945yan8tchjl5ags06yc966k2o33wf95xwyfwdqpnligqq8vpu0syktg74f84ymxc7oxbyyiz6jx2yhl56kn11v278276aqtw2638w87kay0du',
                name: '9mmiwztzx78uc6ypdprm4an5gn4gqk4i7j3sa8e24gn9z6kg65sqwm8g39p6m8nl9ck0ftqko5b887hbbjthuln5ioujhbzcy3qnlzgdptbjqxst8shv9hcttqyxegnpmkbc4dciy38szwvi7u55zf1025mglfd1',
                flowId: '6daf0ed3-df51-4e3c-bf9e-91e6edb90f75',
                flowParty: 'vbe1ktkvbp7bny86jtqhm20wcbarfu4jhl33ykjtk4oxucs19fmcwer34h74jpjs7b36ekpsowbt8o1jlcao28fmbz277szz3i1p3r9jalyv8oh6xwc22hgal5836th49jjs5qq75i4atekboy9mwrozbcd6jbas',
                flowComponent: '9ettqswdmzvyfiswedj1254ac1didapys052lljvqgbrrmyjng296v2at5y17xs1yrervpan9j51b2s8sttw97ubpj08xfmft9r17zo36gnupmquy7vnlywob48sddsq2w7o3undypym1bmxhzdl0yt4rlpj31cj',
                flowInterfaceName: 'bgeq3lurqve3flnrsdas5d4vxjl8kod54aqhrbas6uh0xg3vnv7bk7wq852xe99gdjxxrssv6ksgoln3tcs1qb1ypj7s5rqrxokwsy1iz9wn6ewsfg09ekf22dumprv4rswhvcs9a2wnm8qojvvm93t4g5t41hwp',
                flowInterfaceNamespace: 'exzc1hvx92hi9p5xfja41ha0pcr3j0s1021cdp0ndtkhdfbrlakc8xo0seyck1c24tygpo9wgzjpgyj0vb68e9jvidckcwreva10qjdrdh662ix56v4j746tq5pm8r71vrkcleuebzni86ow5i5fw1xuyfor2g4v',
                version: 'mwzmpy2apxo6fmz8vlsi',
                adapterType: '54ptgt7u4pw1i3hcuear2pikdt2qpafjxfb000blajx173er3cl2dy1ss3nm',
                direction: 'SENDER',
                transportProtocol: 'n27600olod2i89q4095v7ar1rm7golnq5riws68lkxskg0fu9kamtemsriw1',
                messageProtocol: 'qvdv5hnspo8ijvu6ishy2oec68p7madhx0liw66qbd2pu4m7d0npecc235kf',
                adapterEngineName: 'ec2btbi5sdyle0ft9lds9c9nwlfw3x8we6k0zsafy7ibunlbmuo7q11jbt1i91hnoh7mxme4r7ozcxp0v1i6qbo070luu1khwsp9u296a21j0erminaagnakj8rxagioj7r8c3p5h9e2pyk6aie6a5is3sp5c1lt',
                url: 'q98q413eyair2s8pvrzancd11araq2oi19rmubvajyqtf3lbsig0n31t9gybvjnhp3921a514pnacc8r7fg0s5r5dq8adiswetm915b01ke83ym8ifxf023x4hhfut4xu01ttztlzqo8uhiwuwtp6o5esdz73pdbi8v1e8bvhpmtnxivif8bk3a10ojclr3hykjnq1w2kaduwfvr9iu94jl1oc6ojn9as5kzcbbsmk6o10vgn9zbps21jsqba6bdt9ol7ae0hyrzis117065ist0llu56ia9zary7rjj0sc9llwekhx3ox6qcs0svkwc',
                username: '3qgkoa7c68qsrj9umqvj8epsibwfd7xscr67bvd5a7bt8yufrndx66facqx3',
                remoteHost: 'a8o1kqps2u76r89bttj9gtoee43kpt4rzwub3ghrwf8k2phok9uje4ahkhqlse2f6upx1h5varnqwmyim7r5muzlf642w530xyfayj477g1dzzi7j9wwnwwm52wpeevzhwmxxcmns1hnv1nm3ki7kew4an47bth8',
                remotePort: 6264700377,
                directory: '027jqeahuolme5mi8qawhec9l6m4z2anqkwkxtosb25gwiihl60eq51u2lulqmqr9eb13c1uoa655dtf9df8atpdib9crlpjf1n2f764sv3birrn0x3aj41vxa0n0ehb3fxhx18ck84nr7jcaflh8nv3h3qrqo0yiid12ej5xfhnpw95owesitxo37emvdvfnee3y1uvy7xswbbzoimtm5loi5hudo4p2pooinp5r8aziy72rc3c2hwkxh433c4arelug0htdm9dzcxpq8uefdsn18zoh3bh6sbz2aitt85hyllke6bxikxylb9esvmsig3rw4h0wbr3i8xl4xpdaszpgthu37tjx5q0xh9btgjktlmw9dg7be7hqwd266beonpoztibrozduv817iohq1m5za9xunwdofk7i302qglm8y9un6icehep559teuadhm3ppvr8j8dm90tfl19y2obe4e3x4gjhvs73mfrjemyw231ucj9fyafxg6ld6aymx6yicsa4whe211t53nxm3plw22vzi95wm7doxjqui28rqtq0fvzrtb8rxk43e8mafc1adr1mt3tlq8bbanbajcw89j6bretdd8yy1eno4bdd9piz4gl08um0a82insg48gapfgu8j49muavv2xseb17m8q0gjl75qc55atw97dffq4errjn23sa7aao3lqycl3xhsqamq384i1mgjswxchru1m8ewcdx1tite770qsifk3eei3bepb4zra17593dgmpbqv23qj653kcmdacxhb11z29ebwjqz8y1ohpgyeuhe6ic6sg5s14teyyh61mji3v8bhippo0onzxy9al6vipin1pxpf5j6tmk5hq47pfzglr85groz4ai8ulb1yl39320wnjfptta5ijb4fqbhrupandak46uv2qu0ik1kqnhw3otctw3f5137b1uidkesbvs7hvbm3gdjeqf6nfkktjju7er1wlap892b8flbhte96mm64vrgdlvf3sq063j',
                fileSchema: '13jpmgtqixfo51f18uqtn0e789i5zg25l9z4z5blv3ku7q90p8yex8zad6eo2o1jsazc1ug0o8ilphvqeecziec8q2q5tbyobmpahgap3emvenefukt36fljy4rbifh8viatjc2y9exjq2ztxfp2thlu44kvxo2h2l2quaknl72qlozuzky5h4khwodezwytzqhxjak91dmzks5towt2u051vidh33eyq74s5t2ozukye1zjoyytfz6ald2rdadf1myjsuswwcafp34m7q85ers8bebv41nlywtkczkvrpbp1j8j8fq4eo6crbqjxxnmm05ovwkqnszmmlj7039tcuatxvii1z1j061u3lv0qtc1ghsc78cpygn36na714og6c3e2nxv23nne097nx874dlq4qazf6896vijnvr00ema39w797hbongvx6f4a1zdgy8ecw0tmynnifij4frowoyzj75b7qn83kd42wcf36f90q3ts03ug8lsnz2ao8z9yzuse2wexlx5grnr9ekmg177ww4noidfwfbn7bnmqmu2z82wuraqfct8i8p1iezbsrc8sr5ea4gu014pevd9gmwcx7c2aut6ypptvzpkssj7rf2710oxpw2xsysvh3kghrefzvwkk4kr6mgck1h7yh83z0tk89v1li5lk9waz1u3bnj98dm9p0i614daq382hwzligwezoq9h5cvri2n0mcjswlo0l2ba92mednizael7pcer4t4kecbch9yxx0mfnd7b6pqvfl73stxqrw24jp6mi0gzdc7ks3apm873qbotbnnnd1h3kihfgumc0rc2g907rxaze4l5odnqm074bjz3ed6301fi33krp5o08b8ntxl4gfkgb5t3gnr38pu56lfnvxaoc2q7pnaeu3v4evl20s8plox5apiviky0hpi1g79odakiuao940jc14yjozmfmpb28tlccufr6lvo5mpsjms0olm44ub1lj4gm9end83lc9ov7duvzfndm58',
                proxyHost: 'vywntx6toc5isuzxxiebdpzip7pj0ci8e3s7qhk8icao6lkp42i4yu2gm3hh',
                proxyPort: 7024048174,
                destination: 'xyax1kaq2zl372vx46tpj8kpifvpnz8udf7ywl2dfq4xbtxng8l3romyikgh01pb2stpiecmfa2nmtvcm2t4okk0qj74s17o0jrj5ze7ldkl1vd2fzb72wjppenxuwmqubfvojbm7c5i6ehe07dycgbxcxk8prnf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ey4dzuitecc4zw9u77tq46lpxjs1yi2a1atzp1vqvgbq16soxx4r60ch32m234mvuwlyn5zodykfmswf9mzav7g9x7f02cattjva9yk6lwf1q1gz3xc102bioeh10p9wb3jwfjq55cegyl94a3tnqudcfkyw50iz',
                responsibleUserAccountName: 'mrym6402qpafhy3nwtr1',
                lastChangeUserAccount: 'klm1engu65whkcnuu735',
                lastChangedAt: '2020-07-29 19:24:24',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                hash: 'r7mi7dwe8xg17ytrumnyd6pd4b0c18r9dk7h1bh7',
                tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                tenantCode: 'lyg90tjcdqgcgqmvju2c80bpdtk8sv77jy5dpa9c75xicxw914',
                systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                systemName: '0tu8fxdia33lm1twq7n1',
                party: 'dqvc4utimx5qeqtxmd7thc15lv96by4vo6r7nekomgu1u6dtdbr55u9ruf9kmisre0uu4dxffv6otusexu35qisf24o6rq3kamdis5tjnqc6i6bywanyb4sf1783zl2n3terwwhjtvg2cxb3hze0h9yqbo1avyai',
                component: 'awrp2eea3aj9qruvffkwysnynpho22h3nghu6g1g5w91g1xc29o728lracj26221v5iza8aufzvrvl7otjq9vi0pvzf35gkazas8uauo6xb2j9kh7rwdirf2k83hb9ftk1v6uck94r800z9wlnbz11quotede1p6',
                name: 'ad4zp2q5pvvfy2ajksxtr5r5h6mim17ust10ncqehius9a69k4qu1c145rbi3jt19r8tpndsfd7uo7g0ifc80tnxgtdsgv56r673nmrlv73ig5svpx1pvm4k2egym15k3s4ri9rex0o56cq11gcgevmvsdl39k32',
                flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                flowParty: 'rf9zv88v3mxnf1ulc7nen7gcwvmtgcgcebpe0vqfm613wkxl4t04016kx0bivmmh54ke3jxu9adv1q0eyczlwi3tagphknvz5i836nno2a9p2fcshi2069ddmhyjxu4utlc37rf2apuiozvg11vkmu4erhhmbasl',
                flowComponent: 'afdxitvqprn2ke2sh47pnsovk05yek4veqypkyi7thxrvb89vkdfueehpfij96kaa5rmsokcbj7b0krxksilxh5pk2ftdsbhilkiwl87yy5zc9zai08s15aef5c5rc6xnbix1h5skzai1ikxa2agc1su9myjm75w',
                flowInterfaceName: 'r8jb3cqfaqut1vaf855nkj8sxvu74ybqhn7b4vp1scxy4w6kadeluzcixbqjy795mqwn2y5jxmkrlqv36a7dfus6og7dcgrwx2v5g4fwk6qjzaf0k51jwnihyv2dctnredwz9xags6sd33hncnuzrpylicguom1y',
                flowInterfaceNamespace: '9mdr93rw0w7s9pnubz0n1d2h6vhu8zgtvoqwpi7yxcl00vw4fbowo25yiybn7c14y08pj45p0agdr7wtighdgezr1e1in7hvyc66yyjfdbz95z5ftt7xktg08q0z7mdqy9skwvgj9n04mn5z10rwwr2mwiwa0enk',
                version: 'iwcef1ijynniibh2ab7l',
                adapterType: 'mtjg3bwj1iy40axqkhpd7l6hgxd73jcov1lfdbh1vsqdx8559t9krlkk5q16',
                direction: 'RECEIVER',
                transportProtocol: 'xo39m82f73yguuej1uh1v6i7wnuh2jr03nf7dg272prxvep7waxuf2j7qadz',
                messageProtocol: '21fncx1apgwazbntnfr35qtvh071bngrebivi8juas9lsj7e0pwihulvj14a',
                adapterEngineName: 'h08omaa88u5kkxgnjg4gnkzn7r81utvf4p5221mrsybejflr1fxixlllny1h2lh74176px2z6xi3j9a22fzuvbrf6z96u2niuc7slu90fq8prky8n8d7beu5w3lmzn77yrhgt03c4xo40a0q8f6ra6bb03a5d9cp',
                url: 'v4izusgt0sypy2if12b00qy5nvs9rto0moaqyh21qjc1uwjl5fwqfkehzqy0k7kd25sidnkjh8m9p5r9uk082ka00a31yyftjq0zn9wa97azsmuqw81b2wnfgdjj0wepj5nsyq9i2lpelcsctep449crze6mqs90hq40gjd2pof8m9vsaz0bbb88rcvu8rwta9g8lrlujvchbdjzk3m8j7c52hzyy0mdhhjzkgljib4xh992g98tnn11mydc8v2fcp66ctz04l5s2njnwefrv7xx8hrsbdpfa2v2lpe56znand10aipu4kfoelthvc3s',
                username: '7p00zyig9wsvu8gzsxylchlg3l6mhchya6eqnf23osj2zfcrk8vncp82szxl',
                remoteHost: '9tkqe56gzaf67sylsqc431g7hgr1hruxcl9sz6xrb14hva956vx5it3qnh0fnct4ysmvo5i0kn9rvw5euos7rq15ptnovpp1a2vitgym4ho62ce09mxe6puoplbib7dxxfljgms3vzxecoo48fx568dzn40evku7',
                remotePort: 8866563451,
                directory: '0h9bd9vh0w39wqs9nlp8d4l0k26363x1a4aqgwn6qbagt1xephtag8stpgnayhf22n69furlrxrz0ybktyio7zwy9uhd39x9nac7bpwc2qnobqhnqv5rn1hrce57wg01oupb7ve46fg0edu9sh25akbot0ozgctt8a0dnp9hlql11c0w5mal20n29j7hwxmvxw8vf6zvxyby221l1hb2i8scv6zcienjiaegm7c5cp2dggoxvdahaitdas4qotssodr192ml3nzoqqdhpzvpsnf3flv6ilh2ta4lpm9d29odadf22hlj9lnghn3ujfxawbu6rek849qgp467ztix6c8jss2r1nvwehyg1at3zazs2776c2h7mzm6ipdkqwlju54ecoodcnjyhqkhnr7iijnpslfkfxk9x3dsjus034ea2ro63gi3k1ywfqlb0gbs0nsz5rlhysql2vxut9y9kp5d44eesz4eqhj2eo2mz7awchnhoorrwow3l05f72t1m1eknd61ld0x9gxntbmesy9u4we340b8w67rh7btotl396dnjggbu1902kjgaxccq1e2i230ex9yflzun9jwwptz7jqck8ii83trlaa76bin3vxr1ef9afbeqe89emqr8azpxd5rbldsz4dgqe5occ1g05jmws01hzof0pqcoskefkd7md8v7p6rbq1jwcaogffrg2f0txyyno0nb3zantague10x607pf4a45000na6xh701hhupomti8u71duatihjdj1qzo2m6c5t4lv8nz4np4q13wb90ha28k65zzcw0taqp4y9y1agl2qnwjit1fwk8rh2sw2gen5anr773p2vf6266kcs8qy0pebbwrfjx28k2arc471oofxr7dhpf90g55wzharnstjpkrd3o4y4e9eyfgjmnmr9oq1421m2v4gbohxeab2e7iyu6j3fxp6i002nd9lghum6o6dyp160is8afud182u0ccd2rhsn8jkm2inrysjzfpiq0lee',
                fileSchema: 'jfylemr1pwui27ypu8vzu9nngvjyxx9pe44bn0q37ppkpn56alaymych2zemuqgpevddg3f723glug5kfwrspxnkrfpexvobcoqm1l1o85yw725jezneq8yzn7dr9ly0gnu90lhgthv9egp2g9707kffv31b3267ii4ubuz5805t58v3xl5a679oj84kc71gzbkhc3wh8qfniz4wvc1fyflgm2qtmfh6z1cnax9jwvswsiz0b096oxhu1sakh1r7zx7mkuguy30tbeq8xy2amow1shir9s8lsrjw2rorctq83xpbzfcvfeziym3xm7cw0iw9clc5si5qyb0h2g1r80pm578d5tzwkjvpk9xcm7ia5gu0dly4pzyyichrxy8n3xqvibq8e6ypbuz3rxcqd6g2swt6yh974at8s1u8vsvkzdz99veg6gwg2stpqkgutgxt0rftq9xhm3nvtc77jmbcycyac5jp6g2n6xlhe14cfu4x4rpy3b5sunczyld26ts1rbtt332by7vewe22eew5gw4gd7yht84mtcxtcijoc09rjckyv5bg6zqh2surjbsyetqgzyma60v0u738nqqf8lusmqgzdkpai2r6l0nulic6cdgguyor2z6aw9ssuqkh77agkz5otsdp588ksnde7hxqymg2vs9nhszkc489xqsv5upbcmkw48fgfc18c0yu3elervdbh1gcaq2arx40xukzlexoul0zo3oolst44979rz8r740bdgy1zg3odx1gmdfwnkmbk466aqlp9owystm9ghmm0afit8xl06owobqadubol0kaoc78zipql7y6c3aythtaen4iwh92un76aauqyuh268wnzwiniu3a8phwlbl7n583yl8f2azbluz73uj8loh9sywgxthfp3r5qstw8uzhtspm8k7t1p5ct64seiyir8tz1i2lc5fu9mhdfypqmolhi9u6h5vnso7v93olq1d0q2erxkhg82rpy4w47wuuxacn1896sgtr',
                proxyHost: 'nuvd34jt6g1otbur66fosdl2kn948r8w7oq1wahy56t3zoykk6lk00zhosuq',
                proxyPort: 8914873332,
                destination: 'ib8mhgyhja8ouido2ve9sxuodxt7i7jxz9nl5gg5crta9ys8ryb42a93xunjxjlvwdiabkf3coowhmmiepssqs2bbttpt3dzwfni3w66574n9egh1az666f9xjfdfk6jjt7ozg8ul2bfuxv4fgyuecs421nbuqvt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p5f89mx9ksdmii8u0q52ihwhn3h6zajcqqqwn2rwnay5bv801e43sjvjugxdi01o1517zmtrf5jsn989kqigmqh6meuw9ltq4t1ibov72rhvkq1qc6wha28te04pnltm1ou1deorvo08t5lm2m82z8isrg6cqex6',
                responsibleUserAccountName: 'v9ya0fdwhgavj507fol1',
                lastChangeUserAccount: '6orc8pr4s1bdoaq7cnre',
                lastChangedAt: '2020-07-29 16:32:08',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/fd528131-7a92-4b0e-8b5f-c41eb728d9ae')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/f56fc17c-d8b3-4a58-b054-c72bcd5865b9')
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ed8650f5-d8e8-4943-8578-6469367545e5',
                        hash: 'qi6lper7mdxjb14x7kxcs4e77i4wz93dxj3onr6d',
                        tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                        tenantCode: 'z5r43hoklyhl2uwr53bwu37h0kddeyu66gfhgj3cyfebfsfkp1',
                        systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                        systemName: '2vy71r2j411ggwkbah6e',
                        party: 'xk9jkqpxol6slxmgrj7gu4tavn1ndjpcrv7tnz5wm3jep4z6eqsv76030aspqlelp0yj479bu0jslfopcwgznehofb61vwgnsfvb8eyyja0a310h4yy4s03wnid38jwtm3yk9ooa4kp9tpdskrjsm58zfcdycbaa',
                        component: 'tg6iqnr0jbpc07r5jvbt837l6xvq62h9tc9jmp5y1xcwhpz7nrqnk2yi5v3hepy2p0y3w8bh5l1eg3d0e1y7stkb2crjkwhbjg9aa5noa6ybs8nspjby3n66vc2jm7nwwxs5cq15j979ebjlchkirlkqpdjzkwkq',
                        name: 'b6rtit54nfbyiej67qac7795845u5rixtyrb57zplc2nslj1hd72r2glaq8wy2t89n5rblpgo4wbxo6hbi304kspr6fw9uue3xlk449ksp4xzfaq3m6tutcrge8rnkykvty6yfif8l6td5z8mecg2299canvdjra',
                        flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                        flowParty: '9c8ondzel3r6v1fa9jxozuzpgjrh7pmsm7equbshicd40zvkrrbpyx8elajbes4f3hw8ra3cqk7y5fw7e76copb6cgkh4cou3q51kdqtwqeifr68euzdh7vc4t5unz50w48276tsv1p2wujull1laq9xp0o3q36u',
                        flowComponent: '8if79uowaqrvjcvt2depc318lb3grsdp8qtipfqn1dua78jaeharrfnm5k8m5me40d2n1d2mh24c75jouzoqmntf0hgwgqhyryygev6j9nlfd1fta92pw8ab6ci2cv6h8xn9joye68hxu8foxf41oq6rbcmnnyvh',
                        flowInterfaceName: '0ve6z85r7czzmsq08nbjcl4y9jrdk7e1s1omc51orchy9z46ryfl6sw5h8msvwopfx5jnm0vr6xxkpbo6iax69r8plek31xx0wkwhii3fd9j830ddricivvwyin9lhrcw09tz3frp1i1bwnywr54itupwe9mgjes',
                        flowInterfaceNamespace: '79m1duseqevsi2f34g3yxhgpljabmipnjfam2a6lozvuynp1u7uqjjzdcnpudya6iap7g0w5uj9b1rios1rx0kwiuztzl5ueb17jibv0008ctdjokc5cn747w0xlydfg07s0nj556vt6pmpibvgz95fas9uvjy3q',
                        version: 'eupax234ukjeiccvmsgu',
                        adapterType: 'yxi1oue3eh1ta0dk8uj3r1avtypshw48d52som90971k74yyfv7sfx2imabp',
                        direction: 'RECEIVER',
                        transportProtocol: 'azub0afq8a0z2yd7sztd98t2jgko8h4yzx4ra5z1uw0clj5sbbohvftim1br',
                        messageProtocol: '4zf583befosd2unv9iao1ogg94iwed88lvhicrp0avbuano48wl7e6eufx6u',
                        adapterEngineName: 'oew4yq9zbz012v9qegv42d752rabv3vrmffqw75c5ua53t3xsg7v1v0gq2tfsu862se6siecvezly8ej5k242r4ldf1v2owsq3nao5p8e7jre3j4fipvsh5tcsv0kgm9pa13rf3un910bhgulggn0auesh89g7ym',
                        url: '0r28sb54hi0rqk2cmmdbuodzfsc7h6337v3opq2gachoz63haohxh8znkjhuowl6gsjfsyzlf32i14gtoe24y4tbeof34g52v6rc3imhplikbny00pams4whp9e3e7gxghdhbmw24poxuhyiqlyw2lo8akll19qs2khqa8tbhs72t3arvokgk7iydke9dxqcf67g2nxb0mqqbwfq1ijkoz14kox1h404evjlw8y4blu3oft5e65gqvgnneo79gtkkoqo3ine6mr311hu2oeqhkrrbg0wfbmv0z0grc59fbi2543a4n3xgz8h24pbzdwl',
                        username: 'gb7ogivki3cudqjpich341099loelijpxgnbdu8vk5zgnnki0bwqt3c6y777',
                        remoteHost: 'xg429cds9x6s19e2pnysviovd7vrb2geqyduo9nwbadnwhvmdhzdxxhc87q6dkr545hl55hthy6390d9r15dfm4kjzrnabv8a5za755pqc6i1v5d0gnssy49m21w3koiny65g5chkb6mrr4j3fpvh043u7bkzo38',
                        remotePort: 3791049939,
                        directory: '0lp1z6yfgnuaqlasu5lyowslaglqspxuo3skrwilsygcm4cka7q4a0gk46wotzcucftpv3cdr9lefyr3ws8oq6fp5hd59d2h0c5r9xsh0qe3bpk8ytc2ggu17swu2t8kh8wnntx8yftzzdb7th8293xezdv1we4y520jxkvp4puwp1athv2ai3sf08032porlzjkbw5nxe82d4gbeq4xtcbtht3c2qtyoi9uqxlddch033wfu3iy6z8z4bvv2karijtb2qtmun6cqqb0v2vygoud5lxhp89kulq731vz9yxnkwgu5q0h2fwceg7x3qr3st6mc8dhyywvwrrxgyxs2e364q7mko2hpn6buxq93e6xf7c5nwsduczitrjhq8puengj9axrva9c4yv1rg8qvieza2zvv0pokorhezkzlxqjpyh76mwkb2rngcst1iojkzsevr9ui9sk11ba22q8dk2i8urmzlenmjxljqj10vz3eas3mchrnqsl1kpw3bt4ubzw68pifef8b5xvtnoiqkf0guklgrcm19wqeayqy4ttjwz95k68xqzaoysc8w33vrh47s9iqtlv6k7603ndv7vutu388ozdat63z25vfcfstgmjhileucfbon9owdmlul983j5kicfzwa9d7xvryy0vhg7ew4nu4gxcmtl2ep7m34y4sfc31wllrn87v0r1j95eyf4l2h4mvbrn81fxzthixw1m5x1fsds42okm0o448iwxz3vj0alx2yxt40ies05uh4paud7iwvpx00d518eom0lzgmkmslyng6frq1jzlrkc8zn7xiz6g3rv9i8ckdw5bi5o4yt21urcgwbmzz4tzqv10bv1nphabzz4kjokj0u43tor8mfprowubi921ey6gwfhg5x14lu6p28nv889s94word8amntppt7po6dnt4rj36f2rwjqmr77nturghfsi6m3zo1ob9fg9b3qo26ax44iv3f0xpvzo9p9k5wml25p0rvzh1yrhm632ht',
                        fileSchema: 's190w1qr825q1kp1jdvxv9n58ou0jug39kttqdui0cso7bxeue09p7j6w57mhmupjc1eqpv636a6y79lqlo7yo0oeblc9hxnjaqs65em53xvx0u6z4tuc4kt34m26bfe7ul0wgagitgeprrpqts5yszlut4ulj8za46lv2uuwjrdy0o5uhdhxnh1qw2zf8uzrkitte0txxoedmn6sb6plgpty2elu0fgu5s96ejw5n46eap6vwk0q9vxjambrtp3bu0hnvk44v79i5m48jg3odpabtkbezdzoqnas2me0949jh29127usouzkqahpf8x6wbggjzobz68fdextzwf6jewsjqfkiz7uj0z3idwyaqjr92gm65hbp4bmuk3qaq4ys2h6v5kb1jh980l37o3qqfqtwcx0pjzs8fl0m47cl2dzm2yud0jautg6yzadatlara67depos7x9fheud5471a56cszmmr7qfxjx6x7j1lfj8zsqsydhd9urvhlp2ph5bj48t8k99jppmcl7ord9oukfpj29fjgyfbmr3xjg6iix110gulevydp6wovk16x7wrn6ekqi7ct9xznhbftw2jxhjsyw51yd2buapkjjx860up9j560peqxz1dhrjqtnu4wdcexnbqid3rez36lrguvqan99pwi6r7jryp0uvabfx0ncwwv4dvsueh9onrk0c1ong5ui2y2fehyx1eyts7z4pjojpufhelpn4hurh3f26jdfaiq0id3mulrhddiw884i6zyntkuvvcjam7d2ffdtszkavmclp0uq3fgkkwelqdiur5ldni6duhs7yioxuklvddlxatyusc73s6kyr69reoukc6q3i7nyl20l37fntphep104nvn4dbzb1l5javq2a893iw2nylzojlg920ihyxkjzd7tk8trmspgc135zeko6drmg8xtfeunhj04fi77z00pl0km3bq32doxm07vc96a8xkmloyv2ydy20v3he4n24w9nudqjm7ymrb',
                        proxyHost: 'elq7n49j79x496i0xhwyqminw6uzssnt9ous209aky2819c14f355ge2pne5',
                        proxyPort: 7730761468,
                        destination: '24jg2vznyljgii1tdqbo3lr6us1uzefu80sxvpqcjf113f4oweueya0r6cczuc71o67cvbxpdj6d64qipq6ezae981ihuycbrc8nivhuvmrvqtfg6zaxccpaz2wb7x9y27zv5hn26o0t8w2ac81r825j5xrndel2',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'da0m9eegfwtpj5ohset3qy3uy14zjoq3pn6yjwp50mtkan5gywdqr7wt7u0zkaw6n4hw4zojbmkb2l3q5e0ngcasjr0ph73oe5ryjll9h0lwwrp5i9v0s0lhd8v5a6mjlf3hvepdj0odm1gihjc9dhvtav6shkon',
                        responsibleUserAccountName: 'bgm0yb01zsut6jm8tj0u',
                        lastChangeUserAccount: '4ib5v08h9xotx0hi2gjv',
                        lastChangedAt: '2020-07-29 08:14:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'ed8650f5-d8e8-4943-8578-6469367545e5');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            value   : '11c8338b-8b94-4ede-8cc4-b49b145510b9'
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            value   : 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('f56fc17c-d8b3-4a58-b054-c72bcd5865b9');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ba02ad0b-3441-4a85-a0f1-022f197ca4cf'
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('f56fc17c-d8b3-4a58-b054-c72bcd5865b9');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4b455737-2583-4808-aac8-161d27dc1a98',
                        hash: '7kwfa4m4tep49kk2sqgpfl5xfg1jfw4yvfgq4nhm',
                        tenantId: '0d74cc45-05cf-44e3-9770-616fe1614a4a',
                        tenantCode: 'l4vfi9107f9dr691b9bjbdakjayie62cjdfe7ygyddpasukoui',
                        systemId: '8aaafa8c-94b8-4025-bcc0-ae83b8abeffc',
                        systemName: 'huy8qr5rua8fcbbl11rz',
                        party: 'gukczklrg5zxl7coie2w98wv5jjidt27l15va0n0iz8ef8edwdemfp6xpagie6dbkxmconw5lpbq2fjb7cnm00vk6hi5jt02bfmzm6nx9gxsbeev73gvzrh624hc6vcr6vdyezl8ezcygwz6bu3vfph55kqw4hqh',
                        component: 'qxf74zpene0ofwj84pke8rf6t9l1nr1dscpskqxpm0o87xk4k9isa7cldz1b2dweob9r0azfqnh5cmlokrxwfn1mydxbm2hibwg2e1r4as26ginq16f17pz2vgcogylctpvh9fujdq537gc4jry70n4dggli4isx',
                        name: 'pysr48ws61l1mjiiz8h9pdzjuexqjote1brtnibt5s0fzzev70ck4r8d7yr66dlll4ht73tsr2ef7ao2m1tyy1av7pgnprza6s6l869w8xmvasp0cvbb10gql6xivhbawmqrmf01jqtqe4yj3rtvw5ksasgo5tny',
                        flowId: 'e1d7db9b-86dd-400d-a52d-7dd589adc54c',
                        flowParty: 'rhgdcryhakdjbv5qjx422sp30tg3jnzfwokbz88mow74pe7bq4icgr8tqun8q296oza02b2o0dvevjt6rmbmcvp5zu1o9nbntrzenv3kc52gu5h3y1zdzyhqxemsfxz3s130j5gpllrgmyaxomoeio0vtnv5e2zt',
                        flowComponent: 'dhy1qr22xn1m3h0o8k5n1x6tekdaddld7d7homplv2hg3o00cvvft8kh0t2pxt2urzvh042274pgq884p35rmxy0syllnorrzmp4js9x29kxgewsvoq1gh06l0ptlbvi6erakcsnqhb0h45xtid1nqove1e36776',
                        flowInterfaceName: 'y1i9fw3yf48ztskmbd0l02krh1vxlxi2qt6w2gjg9d2ha3erx1cgvnevesgbuhsg9re8gtfp3vtofim2g9r39l4wl144p2kgbh4x68i4bbuvjcqcixvoverug0qf12qlklgjy4qmw0vtw6u5bmv8x3f0f4kbv05y',
                        flowInterfaceNamespace: 'uf3tjwl16n8a7b820jx8sjv0zos2fnxiw29ef4lgihjahcl76gbwww9w5sj9tjwfeg6iyferfex1bipsm7rvt6tjtt34lvwy4kbwfj8wxuo2gphirnv5tfcz2o3dlomt04nvh2yu9apr5expnis3gp39eoycyvw4',
                        version: 'xuywhhwgsmjtqv98szlg',
                        adapterType: '1amnzutuvsopo67kpl4hfnavbnoy0xu7m3if6lbifl9yjdl8nudgytrvvafr',
                        direction: 'RECEIVER',
                        transportProtocol: '0dl1kun0o7goagkak4tnuru1ptl2xbdgneff18p47xl83dltg1xaf3mva3tm',
                        messageProtocol: 'oz10syq2fecxczv57o2kqefm09q1bxn9cit6zp0a7nv5zkbopbrmpazw9u6u',
                        adapterEngineName: 'mn9g5v7zuth0ac02xyaorossc9x6h3pdxm4jwlcavf6zvagicqvjxy7xrsgy88kqybbujrapanmiyulbs9dr1g5tvch0yit6i2d1mibb0l5misv1ava7nod28jacci3twey68eiq8hdmhtalvua5mfn0vlgczkbn',
                        url: '2ly50q1v29khotc1ozqbaoczh4rjwc56jdpwy961qp063fti1k9hxz1cv12zcdtx79ck980w44awgub5hws10ju0efln5m615cz46b6avq29wtr83jm44ame15jkt7uxv3ma9e1l12yjtdn6gwcratetvhv6jr7gx028uqxdcuuzbgrcv2eflfo8ck7bqgqa67opgnp1anhno2ul2yxbvgfhq3smdbzcrdhwtekulxv1iome7pjgttdb2asnxjrt2p1gyoltbn5s4w5i70pocxxjimogdzw7uk0jxtqby7l71zn1mav7dxj8g1phg0v5',
                        username: 'g9ymiju914tgh16bnsw85eqhzpo851wlw079xyjanvavtsapx1922j6ch2wy',
                        remoteHost: 'nztjh191mv8powzy1o1xihlw0ultp2gw2pe1uvbgm2znnxuowqzcn8mx669uutx3tvs26i18reggmw6oqua5z4og2ac2kh8vbx4lblp90lft0aq45myiknh0h3dzchzo0ryvyov2doopv35sdnwnhv5i2fpwxfjf',
                        remotePort: 9106628644,
                        directory: '5vxvcfdu95anplclgbpx3gs8c6c2br7ln9r81lv989i9hp4h4ll1g79r3tw74b83z80f7ik27ix83s9mlm8wejlo5i9q2b61m61dy0jcvwrfsoeoqhwhrd56txcly3x1kllseq94t0mwptwasjyvy8qax3km0xlkl9ijp2ybg5hh5ig41a4ie7ujltnmozh5fc4o924zoigp9m6emc7y62ap8ofrn56nt8ecf6m67hs5ndg2ijhpta7rv9xk2vvz03ro850hs1ax9q3f6xbhhgn0ffs3apbzv20brli6xwgjy6613l12j8k91fej9fk2474e2qef1ie2htmjvsiqfv6y83tgzcbnjocbjt9ycfayi6fk2z0rrled8mcv5txa4ilfvrf5yiagu8p9b2ujxo8mqhm1kofwxjyeodtiz5o6kksxi7u53jobumqq6skvbllhxkm255j7z4vx4h2lrdhw6ha316rzdc66iggwrp6ewpz2gcdk5g1097jllxngev0bdoqtycrm2fz5ndztbvp6rut88wemlf9uhzqa3wldsjrjjf4pzgepq0lc32e0v2fe1fx93xkok2favp1b80hn9izmztq7ookugva6hacnfimc5tbjobukpvqt4y6gdkn1q4ryatuhvawfz8v97owd2ud6pjvvt4e02de8vcicxh77bossnt9gxywld25ypk03q635dq1f5yjd4lpmni29ak9g8ev800wqmbz6harji976dkmpw2gbvokmnt932otq9wu29i75o0oqomd0iiamdkzne747sig17u7nzdevedozqgi84agevivipck4ixyn2c8flw5d72c32sh8gjz9515mdb8dwpzpcytu4hiigvj43en4auty30uj6t0dhbqka25zqllgxvba8g7ybbhfexzlh0zy3fc4urfdwk825w5y1r8khfxuuanbcve1ejkrxepqyp3wz0z0l82fqupgrppk52ztw43l80s1jxon48e9m85n0w2trruw54nm',
                        fileSchema: '1jrj09evqx8xlksa4sd2c7755ubdrs78c1vicsjn6op1xk8kgav7bvnvw6hc0g9r6khf44r95dz4m8fvht31315ntrqqunbl2bvtuj1778hsfe1pjxvsp28xtw900hbr2td89u81pa4tb1zpkff9m7m3v9maoxpb3vo6vbxng9vlrjbka5kw880hz0hzt15misbnb5wq9bp1i9kld7mllw488c45g9vwem4uqc4wwk775l0a32lerxiijxbtcmzwxwdmnhq8zjosps3vva0eyvs0654wktth74q5vdm0kcj92keivgytvh36ccts2h35b5xpjxtf4defsobhb08ablvh3w1i251weiupl0g1umt96sl5hwbz1944ny7swic1gu9uokxmxmrt886wpf1kmp25c067hwwgxjl5695xjqmrt2okct7eaa5fz19jnf13ixufruc7ixlcj3io7nuxofvsd9b2ak6i1kw8txenrrrpbur6ydmdvphijh2v1xsjwsqvbq2vs4obhd7yg3whuilr2kwzum34a1hlau91yl3ij3uark911uqk2i5iiuwpt4ja52dhiiap4jbopkwmkaruc3wdru4stl4nlp00co1rc9x9hxkey9foiqrmtf97zc0n4vukcyqhpti6lwy8fpsk9oks7you56lw1ng8675v6ri10bcudk4t0wxfea1vm94t786kmzdm5shy9bcnhcdu4460iw65b4jvg6qru5f2tq8d7628weo4ww4f2kl873090gzr4pq1it10f00m4s0388yulwdjayfpzeopqa4bh4ssuuzcgapkykk576x6cyukyzvghpn87imiotz8y25y6ua0hxbk5pclw2ihpsejapvhxyk4axv2knahuq9ysz4dpesco1mkvs5a7eigzaj054so94ubib0teohc22oaphiniuz2gze5ssrxo4vow4wd5aryadaj9u9pfki4ec0mimbxnvao5awqlt3nir4clpoh6orve56qwb9yivdf',
                        proxyHost: 'n7wxttonbfv49kjabkkikykenrmbgma9s69wj70wy30y3mpw0m0vuxzinl94',
                        proxyPort: 7497629855,
                        destination: '92jsxylob6cvxasa1ktnxpyhdqeo5hu7i5revk0sw1nzzxp73an7vj36cexh2qqknp5zw80rih34j8ldx7k7wwxy0eqbjbokrnk5ylb8pskev8ucuast7psr72iivbu4w8kjiok4ot81ivnnuv6uzu0glflx4t48',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'yqth46ka1atk9pbhugfb0dn04f4xsyfj5hjfvug0spzjyxr6tsy7xqpdswccat544frns8c8nqivo8t1fmo2os6k2kadao91fy0cx5zqpbivhjrih2k0kohbzv36dppa4mbk7mofiorkhdz8p19f4wa459dltham',
                        responsibleUserAccountName: 'o2u96daz82safbtgyf8s',
                        lastChangeUserAccount: '15x2kpli0gfdh01qa1r7',
                        lastChangedAt: '2020-07-29 20:42:29',
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9',
                        hash: 'g719d2osp4k81b22v7ewrl4jgrxdeure5xm2ntpr',
                        tenantId: 'e80df54a-9ff6-4112-9094-2d34ab64415d',
                        tenantCode: 'kqr0qymmjnq5ixe93me7iw9uctiscvauvfc26gpvrzjz12kck5',
                        systemId: 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56',
                        systemName: 'k7lacnp1oiz3y3qvq0r3',
                        party: 'jl725to03oqkr19c4q7xkazsucqhoav1bemxfq5o920opj9oa27hce2sl4iqjkjp9ttc3fijdvfvz8i97o9dvignezmqrkufk7y4byp3r3wnla7mg192x5neoso04aucol8z387fdecejcf35ndy8oll4tp7287o',
                        component: 'mbcrqumxf0rbhjxv4sskgck5urqwztk2pxzo6y62sh4kl2jjzr7oj4a5f4ogjo4mo0zc637z3u2ltggkh8x2ad83xy9xb1vzkj7yy482sytbcdw60z2cub8k4eclao982hg50prxf3pnmnxwg8be2ymhlc8kfwbb',
                        name: 'zz7obgjnylig79qa238genmajfja9ljkivpkrrhr2idxe7rcmioz5qqj8ppjirn4zmajctxe2waayvzh7xq21h5bm2n4c5hbvuichgd4lhruhxjrvxyyuhxsm8exv298si0jqamlbftcnmo7mmdomqc97ymg7722',
                        flowId: '81f10235-4988-46f4-a5f0-8dac59da6d6d',
                        flowParty: '2r5kc3g5yu6825m4jc9og8j1hvo6kvopd44mebpchpicgwxw9lwqyjznewuuiaw93vxdj9yjfll905fw5h74zclj53yhhln09y9oqdp73alx58qljmifxockh7s2upzx9ngsih3lu6pgb31kept4x6izfsk8a74h',
                        flowComponent: 'hpd0dru80rij34k78yqkdugttjy9idon67yuczfbh8awu3m7fo01fmwnp5u7510qdtsd4i53gsst446g7danpcnqitac1q749sg3zgljl5t9z9x86ptpwi1cjgqmswkvtsma0eo3pwpvm2q4fkktvs6iws5qrrmz',
                        flowInterfaceName: 'r6nml4oxchjewlmua2x87te6qmud18797z3ejsz204apbxqjuquy8jjegt7ypur5f8by5v77qelxc8ob3zmu2h2iv2jfoe07mesxk1dwh7tla2dchtkehgsjcrjvdmoaoxoq0kjta954um9dr262025ojt0f6pw6',
                        flowInterfaceNamespace: 'e4pbunpfjf64pchzmuhkxzex0s1vvmcxgi01vyjvrn9ys1zyvphlg1hmwatklogyoo4qxuzk2ehkg5p0hm9rnuw3grafr8zeg84hvgdgw0jx3aozwm2w89hr2al3kg1m31gbyoey435ofwwqo27uhkfc8b2ywv91',
                        version: 'qs7pudvs2pa0hlscq10f',
                        adapterType: '4g5gk4nzk3svp5h6d4sj5b8o2zrp91919a5ci3a2aapvsms2x67zsuu5vfcl',
                        direction: 'RECEIVER',
                        transportProtocol: 'wqbh16m3mo32lwr8l98ftsggmrufuj1wgotv5319hpx7y995brtu30skvsb1',
                        messageProtocol: 'xpycee1a7g4yrwnx0tkiv15xyz86073jd98nrk3fsmchm1rhreawjqzwsilr',
                        adapterEngineName: '33zfe5bavx9zwcq1vwpxn1rvrx96s3tnt9m3rv8wl1jlylbc5bhqfcsmfb3hj3crs2p3alkfzsax53gn2314nen9dawbn8o06sngog361kvqrqpva3co1hxqyv09hvcc1g9civ45604af49yc3upanymwvnqjfvh',
                        url: 'n3kxngeiszvqjhkeqwgy66m7oraae6ltehiebtoc24717gk1xfx6ee1fzdwkouq4dr2pn39x4mnfgz3jn8sk16umg46ulxhb9ptyq2eg4ywwmx9h3ga66spqbyzbscxtj5dx46lhdgfbwndvia55nwtpnla707sux4t6mp92the0b1x9j0f4hl78tkf7h0yt5pugnnqrxva5tzi78swgny68lan56tfkqpnaav2h0wxvezxi3z6ddyjpygpjyo1j3st71jh9nz16s1frylt21bi9qmh0dyd2txgfiof6w0fk9e7qgoby6apdpmtszx4p',
                        username: 'ofr7mnzoc5xzzsp85bgeepxdftnxdi0egzwq4u2rk9ikcj5ku66gllln3jz9',
                        remoteHost: 'm11377accp213v9zxjq499r616bkacfo8i797fj644m85ftzfxctf36opt8ifhej4hsozmjvet9e00wdzunkowna4d5aq1qjez9lrtd76k9adcd1ppeyav2cnrir88i6r9luuxst9h0qhrvrrixbwbl05vj7jo0v',
                        remotePort: 6204719299,
                        directory: 'rx6pd9uk2cai7hwdjgamhe4b52d4lssw1ulfcd0gsch5ynnxjmc1gxyykpl5irueaqqhl3emir715o8lvwfhflp7ie13m847bm97oiivm2pu6zexmvpyetud902ycvsgm0pa058r80hlqz3tt02sp4rdpco2tv57ay9z75m1612drvwbqwqidhjch4ozmwoyhx50t82cs0w7oh2r0p1b4w9auzvgc2c97g3pd0htfbw9dgm5c4hcz6an0kg2wlw9y4jr9hork2c5x90p33gmp4dxjx6j58lskps569160fb9ti8o7fzf3b3ghj9czv0fmgnu3gzmubu5mr5mjtr6lcpn66v5ue4p35qmq68jk9iftei8wjz74xgzj63ljd1nl6coq46g9bsfo1ob2gbfhgdd4p1v47tiu0kx32he5v3l4u2wvg1l328n3sh68b9atwv7mxumw9r28q0ikbp82md542n3mz17k9cr0uhf5xawd17ja41g67y8xi91t6eycpeh6t0kg2ms3jpbf2nchxz4zzuvdtzfh9isb6emx6kjedn314tjqp7t37ogme2cz0llz0a1erki7u3zb09nboli1vv45yibxlr9ixshf0ru397lyzz2s42t0l03t4vu4raoc5rguumhzabg67g2g86johdzeehv5cx04nme39kmw9xnxuvt5oyejqnqiemf5horuhcdyaa0536m8bwv57jhdaw8vev0cbz6v1st2ww3xz3k7drees1efwfxg8yae9etvrdh71x9r9mr6ayfxhs99237gj3lqfc7gl7htgil8abi7mn7jca40sl63tceefmx9aechdw30uh350gz3kv97hsv0z5trb90rcata5gdp8z824lk99wzts1n8u4ak3g6xsj8nzr438ere9yluf17y6jbzbmegai1p75t95x9izetk6wrvokawpu2tbc3y2w52yb5bql7n4nd5n568hlp0bxwtmafvakh2cl3h33hgirweucjzrplul5y0uxb',
                        fileSchema: 'omocvp7yval1gque3i9nxt474m7v9idmm3njgoq7tmpzo3e032a53kvzehtvagid2axcnm63fc93ijklgs141ryurd3t5kcql4zuslb8xfj6pu6ail1xgreo9bzsohi742zj1yedxlv82sp62r4cpgc8rt7lrpce4jnxje9m6opwh7rlfpffsgjyt5lxz4b9x1n803nudpe17gkkaypddsoxoamq3bfikdnwtjxd94b0rwsdwnasc85nvh76lcm9n3v7our1tvfxd7xd0azh9x3u37ol4tgc3wrm53t929rsuusp69aemus77zf3kj9n20bq0tvpqo5gku2tx2fqyo5y8ybj0ab7huc45f6l7f6kbftmjnfehgimcun2bw1m9g8wx93rsezer2dk1cxm9xrueb5lisoi5yoyjxuennl39nlo8xli8ijfwmd80eb4nzyqxkmc6i2nwtmdm4hqg94bpnv448ces3h7kdwpt1lu9qp0kpovunz9yqi5z589ow80nicum0oabor280dt4vyhg2a27du3wrxcb0nmmt8lrfo7l86iczhr0qil7kr69anakvgavkxsokmrnwivij004kv0k11v7316901v61uwbnxfa97ftgjfl4sodgxhdj34zdfmm26u22vzg8rqeuj3pb7d4jk73if7t4i8f4zrhi2vqmcue7olivrx1p6d14344udyd0g5xl4l0iqwn3i061mbs160lfa8cdr3vefyb1xy8bu58f36mk638m6vdzv0ix0h6grl85i2u9261zke512nbwhaaefvsbfukg4y2ycc3kibsvyjofre9quwnc8j32si80h5e3bmjjvragwni50zzc8mied94tirnlknqfhd8zdgcmkn3jrpasxa2639bg2vqyw488biia7vuscc4it7bl5jr2w8t64pqimf4r0l5s07xhha23d320w4wnoh3i2fogo29iih5ata1z36w9oazkn4vbsbf4ajj15aw5gzijoc6dz3fs13uzjm',
                        proxyHost: '7cb3brp5xwgko3kunq5chu1t8wmxz3ksweu7oa5wkrqpmhx7j6n0geo2h8zn',
                        proxyPort: 9546888597,
                        destination: 'u5wx3g49e1dvl0kfgxa8m3jwe8rfwi0e5hpg8x0drvifps3i1aug4vp126y0qft3ycq8gkjc0s2as4mdpodjdqn6dflyawmkhdf6pi2w88o3xmitosch5v5uevb8zo318rneu5n6ne49aztbr3dy4w1chxolh5n3',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '6kw0ks06kr6hhtei1pv0qkpsvxveo9st3suv90y693ojv696ghcwp3319zr9a5grhd1fjmphyc33yhvrmzvxk4007anhtwkjfuixsteardkych59tqwq9usnawg5mbzw3e6pkoj5j83tzmlwj51o0q5d2gqt83te',
                        responsibleUserAccountName: 'zzpvtre7ny8a65uz1ccn',
                        lastChangeUserAccount: 'nc2ppkizc2p8pfy5nrf4',
                        lastChangedAt: '2020-07-29 18:49:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('f56fc17c-d8b3-4a58-b054-c72bcd5865b9');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c5408c09-d200-4945-8c27-d863a1a77204'
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('f56fc17c-d8b3-4a58-b054-c72bcd5865b9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});