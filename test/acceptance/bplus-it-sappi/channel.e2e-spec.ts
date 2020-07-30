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
                hash: '6yvpsvb1n3oh7ucknq5z3o7nigvci5r5nlu7vq6u',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '42evwj97uspigy3qdhc56fmi78vqkic6qpup8e8lc9c8qd1dtb',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'rozwl3uee7654u1cp9gk',
                party: '0yb3osnwdne1f11hndymacoighcydixd17076kq2htf8d4xvp3l8yo4h77mhxgxsjsque4ur7ulr53m1na8uwfsr2k3e60yavwuuh8vna97ju98r76kdp5zpodj4jttgudxxc415gmarglzvwirppdusbvm25jns',
                component: 'l98bimwf660n1a5js4jsscsbtab49qpyqjra1qkaz22tl1mnqyly4tgcu8kg99cy10bfnhflugg81eb25mnyvvjl01uu9lvkgshht1i1rjxsd2vy1x0gh43memmiud6kilzdcixkd8fgtqdgx61ul1bwbiorvl8b',
                name: 'tep4xqvrdxmt0wqm3su6ho39s1am3a3qagr9le8k3bo5r0txb55mbyow9xsxq6pc8x445b62yuc5084onejoszhx5xlnmwautw1igez1ez4nhk6pcegwt8q46oousovaodp1m8q0mgufaaeg7s13b3idd25wvcnc',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'pesinuvlnz542ovs5p5hlo95y7ev4571xn0iwflwufch5t78h35cyip1ie0s6y0gh9foow4pqfzqn09037iob0wf9q4wbedxckvfi0i12h3lkerwwu7pfj04m08dc6anh3gbwtp4m2t5xsmsxdfm1sawgvp8v1mw',
                flowComponent: 'mr7jdmdeylbj184w7o26ic92cg39ue81sczitp6krzls754yjroiyg2iyyvar81elcugrq86qtajf1zr4jexgwynwffzon6896p1qop1dh4qwe79tjo49mp915v888vpe5hvgo85swzm0d81awpjh8pu5lrgai69',
                flowInterfaceName: 'a2wtvho0wyn0g3x1bumjrizyzhj3waa0slrvy1sylfdeox9jl9jfi1cl67vi4wvocompswkrywemrf9oxx2wgcyek9vnln7s9fw2akvvpb4siwejj4spf4bii8x3kovjqqa6eyz1rqwkbqg3oy12ugwc6x5mkhfx',
                flowInterfaceNamespace: 'mdlmb2js6iks81w39kkq0fu4pm3ssawgumy8tmva0i74tnlmk41kd3bz8llo1l7rtke3lsr1idkin0vuf37i3qs5w1a7nyhgdl2i98nv8fr6u3430eopyw39ed5kpzye4t84krw9evanu0oz4g3g6p5vt5ltcpxs',
                version: 'gqcfbtmvknp85hr1sroq',
                adapterType: '6xmb46o8n6f6c1qa4hmbng9rt8ga0dzggs04c2fjxr9jnyskrdsdz1mwg3su',
                direction: 'RECEIVER',
                transportProtocol: 'fyusj6veclxtavv60uafn1z1bjg74lsugsa8wq4vy9f98ix800qul14x30ds',
                messageProtocol: 'f0xtgo3r6cguzzv5na1iru3rat0k2ffdychl75wnt2e7zdfekz4kv8qx9flb',
                adapterEngineName: 'vt9danolzby733kh3kw35g9xerb0cxxmz3l9maro9kpqqdr0619mx29xxg6stunbup69o9whwlr6kadyyzy94gs94aqojy9901j62mpt86bw0e8iuqgfmudbr8c2z5q491p50osuss6jdop9rhcccqjnhnygm98x',
                url: 'b09zk0lft2jeda7e9brzv5at6vy9b29xlx9risec2ufzbdxq6fcbcspa8vzw012dlpaaqrpw6wgrv54pf20ohre0ybviwai5qmtkzc8odxwhnc4qm422m93m5dezv9ibqol886wb1esymh6wf57b4e0l3swquaburegcje4uidvccwpgu2xlw0ez04c09l8fkf9uxraq6fgfctj25eewu2dh1jozjjqp0klfheosdysnaxk0os9la8zr3o3kgbq630xz8clfhytmvuy5g97hutkwpkvbjiwc4c0ltvmgq9k62tpf2txodhsbiu4mxb99',
                username: 'g7a1kq2ov20zzkyvxx0lgc3jarr0mpra7n1pktmo50pptns5rqan4bctdmbx',
                remoteHost: '4ee4jj4de7qm2s16gcabalcfqau2aafwecfzsbeuvjpal64jppvpf160uowg11s1zre654toti9w55eyn41cm684borzeznl1xdsghs6go44ptdmk4o48gxkglahsrjri251t42bp4l0hskr1iw17vwc4xgjppmn',
                remotePort: 3122934378,
                directory: 'vn6towqaqc3bv37ynurfm0xomm29fdczpoucoazznhey8bvqjewdup1e3sqzgegl4qgvgm8msqj13bjfy8d75n349w67oeid2uwjnr4h8jy30xyl907jlc6n13p6uusk07fog1t1i325e5hc8qw2xp7s6ee3g6kei13udl01v1anshz4p6iryto7wbhlqqy9w48dtjonnw1q6yexkfzan2th9oz8ru1lt1ztsa2zxonmhcpchkmcb3a2wng8uxet6ifhbowmqudx87qisasu4wrcr2lqm5tjkmutqat2mzwv3i8km8gunvzje5ttvtf4s91wpk3gsbqm5t3dd4yby9o72f3h1ae2v31zkw4hpgi0dyxhq8q8sybpqj7ha5zggw84eq9y799hucrsy85yp4221rli25c34phactnchzziqmlze57j7xxcd13p8bsl75h4v87iy1fem70irqu71q2yq0ant4y4yvmez9fdxdwi1icgwom1y9w5hah4sy60xzs4gym76qd5nx7tq33m6o0sltu2hgg0o1xdsd5wfsa9khhdj6vxn38bzasfmls2pztlmfp8o2v69mvzhn1sfgwrncjx62apwaua02vx0llcjikhf44nlcmf7uqupyfzpz899e21cqwhyvu1lsdyexwwojsr36n4u60s7i06pxpisz8zw8ya2op8ojovwk7uvziu7g467s7fo9os0xii5sc0udtc2a83gvf7992q9ndowe5qlnutl5yz3bbwml9hxim7llktgaess7kg3uirrbklfizhpw2p38waudgcq1z2rni87xvdyouhoop3wvpqtmjl70ls3luzc2l2bw77syom9gxgpmtvga4zl5cmhj8boisucsh8y9mu31vr2qpsanqitpjwjehlmd2qnzi47rp4etoyu9jdg8yer3ydpmjzqcgtxjal313nxyzl9g7dqz5qm8wvlxyffebl6rc2g5q3ziv892hit527swzzqii2auyg8p8fy73700cowi4h',
                fileSchema: 'bqecb3rv5ckjgdhrcn25tyw0m7srai2ynlzbglvrhjuso742zlnnwz6u0v16jv9nk2qzak5spsc11k5u33rmqplmb89nehpoko51e41jg4lbo3tos2lp32hbqm41d9wd3gqyysxab3st50iarfdw2ll72l18b77sjr6elvnogpj8836tc6k8hfr6sctz84xnwmvr67k7rusu3dw9stv2uyc2ki7wdxlx2313mpa91fq6clz4y8vpzlteapoetxakz5csyhdy8k38042v0fdfda7vipncalep5uw0otif7f3hfrqh1vds14xhvyf8fug25atcs35b2tzodv5rdjd7ln84t2oudpiex82p22w61c8vn83cfp232fzkya5ca95p2o2ynlki9nbsrrvbv9okabdt1gojx2sxsbx0wxwu7zsj7ipzp11g0sp518gndkfa0n748021mtqm3wbgsq8n524q9kna2bnm1q2iar4ao8lnkz9zvfuy9twgvuc6sn5mt8os6mvb8aswv5p7drkl3hhxlxdq0430va6weceas54qyvxbldce23gxx42hiql254ux6f7nndb4v69kgrrx7twbg86yag3getqjo7dnooo21h546lh1d2lw3snp06m6unw7nxcanw9a2aunz3bncjbbjls7zl5w7fq4x5xqkeb76o7c78012g4hzlug889jy5j3pt55trxigwbrni25c3gnnv67m7d8gtp6wvf7e7svw3k8f1m3qtfivbevbr7aj3y46menlt6ynlb8aq3nr08x35nnnesfcn9r1lw52zyvupystto1zr8q171lcoym2f0rkqfx2rt6n9e7ojt27ibex58rseabx5wru5xrrvooqdc4z70mbd9evawyf8ejjewx1gqm2cg2du89vxymgih68xwqu8ck3i38kvx2ugt6ezo24vkztrm2ww0fgajestxrz8xt5hj80zri5bf7n9o7e9wx2qs7v4ssn1vbdz5ezqmb72m7uj4xylnnnjl8',
                proxyHost: '57n6lzt8utbv9omq8scwer2atg19vnhm4kufg6mylik3umyxywxq3eazjab0',
                proxyPort: 8718849621,
                destination: 'dtg0jc6v228xcxkad8nfofavc1w9grjq4rk01ghv10sfre0dimttc3dynnhqjm4vtpyqwk9mt29l6kdespvy5v3st8urtciqfdpazmo58vp2ug5piwmkn8yp3wmraq8n8cdo4akh57bk1q0zgraj298kza3ong3y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'le0s5qeyi954wekanjlrq0mbdk6qrptitwq5tf947euux7ehh3x00l2g4yx8y4oyuqslhol6lydomsouckjou91hqxy1gbxid6ddoy6gwrbn8y96us2mt10dx14is4jzwefrnibkfm0ub2ipw9li584gxhulut5m',
                responsibleUserAccountName: 'dv402m4lg3thvq0uk4xz',
                lastChangeUserAccount: 'cs18n92fna3mqpd6bydx',
                lastChangedAt: '2020-07-29 12:45:10',
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
                
                hash: 'uoqtorjcquiu3vwhj8b7mut991g11k0k4c2ft65w',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'a6axn3b87bnlvmmcjjqa5luzu7bmxpa636n94gek5gvdhnegor',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'daolnffodiqcdmy9nplh',
                party: 'og2jyjheht3o5fckmcd7nv20h8dxd1f5asi1kldtuo3mf1amqmm86eqvkoiotccbnx2wbrsuulqmuacki3kz0hw80ypmwjqtpzwe8mc1s6sh18gs2wkr170zbhfoymvl5onodogde1n2mivj420fbnnfnkp7vivy',
                component: '1glmn0p75kosy9una6b9wb8n32oh6ylgii88xkn5xgteviivnj9dragu5htaqajz80whn12x9udbd4882do3328w3uvozskcwa3adivzlmymp9tpvbtvn9lwn7q3p588y72bkiuujxz8zx1wu9nf73e0tk8qcyt7',
                name: 'r415fxh2r2abv746c0gdptwsafvrx0a60glsaftpz51zmakrob7ntoero4voi3mam9kjwell2c256ywuig7t6n7wnwkzq2y10zsggr4gbfqo40u41m7enn9a8mbg821vp9963lklsbrv5tg18phcqaq6p9h5ztfh',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'vhjr5njxasuy3txgyiyob8031anp7dcbjgh66aww4mi7mw3amhzyrut173jo5aqwfukletds12alb3lapfk1vxnqnnggrrshsyhmay7unjhtw8qyry56oshdpty9dc8t370yehmjck7fvwf4wdxxm5vzorx0pzya',
                flowComponent: '3ki4ay0byy7ycjjp7vh0zin3l1upr6ep9z7zjnahttz2r59z2du9igfppt59dq4xglazorh6papfxkmsxp2js2d0rldclxyyqqv6p7zavfgr7ffgca8bfk2ctm5zgkzglnlsggzyxvte62odkc9vbwfqa7q8j1uu',
                flowInterfaceName: '55scdw9ylct6ti7pyyy7r9fvgwnbdr1hyoyainl9rz5dyybbvw98jfa7jlgnjmm9pjiw4ulma07x85g8cql71go1ni3omm04usslho838q0uncrcvqra0crqw1a71iyb9ys6bge2x22b2iehx3uxip5jdfyt45ie',
                flowInterfaceNamespace: 'i1ld19pgt4od5n7jshmicrd2wn98nulbitecel3kzsbhdgyv2a4utlns2zb1ydkrddzd14vvacs51h211khl2spk92v554cew012ejap9qw5y6wnrxyvnq7ydaiycf4m1bujtqn72dskywot0pe1qbqdalgr84z6',
                version: 'a41nsooxdyurac2vam07',
                adapterType: 'xrz4xmnm7t970elexwy08vqha5i3qck7fvme6gyief7b50ywv55xiy5pqv77',
                direction: 'RECEIVER',
                transportProtocol: 'p526mx5wnh5mpj95jhi055faw9m0lygnvx65x30eece2ulloa5o4c3lhfxlm',
                messageProtocol: '8g6m1u097ginmnx2qsmvvz5vopfmr4eneg9gq1cteg8du6ubshlijwll9pmt',
                adapterEngineName: '9e2gxfzskf1kg7kwswnttgay0n0u2p6xxqi0zuzynu5kd79czsykui0agcadlgrmlhqiwyja5t9yewl0xfkomphxm4dlkbxu6ijhxu2zk2emhhgjdtctkn6ehepf0ypbfvuku1ftcm3c499iwx6x3369n4k10t6q',
                url: 'icjvd7v8pgedbftreh6iibkk5embz5slp9ltitjwi1xdlfg1litrw4hfzzrlvl9ug2mplgk7tnl4wafwbcijxwcthdt5zl67qws2bko4yh7j6brh7x45so58eqachbblqwlptea6ydtl9q7d9kcpd8uat4tlxryytvsy97x5smt351636pev32k9ptb3xg5sjylq0bytdrxclcdvvs8t7a0eg5cr6qy3ykyuwtyllirpwv71f9e1k77ixpexa7kr9kov0utn9h5gark39xo2dsvg4cehklx11f5zrs20ynbtcsk74cdn01ltgjiq1bjb',
                username: 'sgetq4syumlmiptulepckuztk723eovbwov0it35ra36s2fmb3g9ps0zi80f',
                remoteHost: 'qj4t8wmnk8xxzew5eupo145e7sf9fubsf2454vaarm24ohgcwt8mxmcjycrmdpnq8h2k89a9l2nbf62g8u3i15vox3wms0l2y25kf1db7kagyljxvdyb6e7g6svpod6x2newggem52ovb84karmcql3poec4zve9',
                remotePort: 1138012190,
                directory: '3qo6rgovld54y94drndmdcvwfqngb1aidgw8fy7hn5ylghvui1y2oubk994nu66aiew1efclamwqcijidj8855cjzpkd7jgu18mgzrh359neo851q2auketg182v9wms8jgwod4g549zfkiq8zj4i33epq2thf1ev480g25r22d83biytulpmehuqflxmd405qf50pww5s99yw3n7p7apzcd05g67fmvx68461fzn2dbb5cjcdmml6g7zso4utwb2vt8ighesejgs1441unwx8tl3xqrndugyabdsom5jnry4r5ma4r8cvsq745jphyyvpeuywjz0yt2zi6t4eg1whjvmjf3qovm3ohh1q5m8pbidhcveauaedoy31o8ytx1bf7wt2jx1eoghi7jveka86ymhlykdk83zf4k5pen8w4xruc0k1a6xh8yp7qpp7dse6g2qfwzz8zwahqb38enq9c94cus56enxmqsawv9hp1ctjfkht37d0hrjxdjo6swo2oijc00pnh6wwp0w89qg6ch2cdb3w99a7xkb51lw2rgntw4ve7hbwnp1iu9c37bdvkn4rk1iao28o3alrvm02rg6noqr5hgfro5s5o1zoe9xq154ahl6z79b4ppxx2536afoi7ac9xmzb7xvpysr9ldsb2finawle30kfi28nzzuix3zo6tv69adql6cnpfxjm8rmiapbcpll17k8ets250t7ysqkt305kx414uy0jlb71rvho1llynecpogi4ov34dcbtkh12ki2w5oeem43kkfd2kybsbe3erd8bhukqahtxy4yklmsw5zpa37r33fgh9gxgo68hxiwg2nf7p2dpo6okaseelwmhgxb3apvn4z686kscp3ggy2yghx17z1yx9z2znzqz6845ea990p1ad4o5wi956rgk4nx1amcciy8fthpkc7vj9qxpvyv2ww64udu19zuqryoomo6rnsklh54pd1yx2fev92d5s91c3w2y26srfje6yymj2feur',
                fileSchema: 'twqhsvltk0x0mxo5do07e25hmk0qkno7glm5m68fv821rl1l517ogib6ljd9wreyinhjleu5qesa6v3auct0jn9n8fwi24lpv4w2d3qsxsflwaualt30lz4rzjzhe17cip96qq1rp84ixt9s0lgzx0wu9fin2fdrm1aplk8e2bofqyn5l6i3jkaeg1dz6agc2j2jswfv3wfojs1tnvxyuf6v4bysu159cjxvsh3oox48zqmzf41ubqi4s74fp54q7yll584esnepenj0e0vpjlratkalp8ojkm0hduv05dwmeyc2fmhy7hvqiwvzkep9a0tr7fujc7tft5ol1fqrb4cwe9w5j6lgudbqlia4eg7zcjdx5y14wu8u4mdcw607cxsjiyns8mhgajrq10g18tgvbjjgy1ocxqouc71eln28cdbza86ibbgf4u6302u34kkv5q76fmcjld7zqqsn9fq8x2n7vqx2ps93ucmc8w0tj3yv7phniee1sad8ftoxcd8ax8cx69vxndo1ussyep3fisyxpkvudvz0fxcis5ym3qtz612ll4nfxm5tqrgju4ue655p1soyr3vcub7i3x2dnitc9ey877yy6kkwbpkdb50k93ooezflpm4aqpvtai1kn34qx8d98p8lznb4vq34frd8cgzw5h1ansict30d76yfvg5ijfo1qfdrl6dha0sqifsk05n30r9gz6du1qprb0vbuezjp6gqlijolx3plp4qcdgz2xv5wfgd3ru9odcvz224jesvsdukugchn7jdann5fpzf0f7aiwhnfskzut2galetqmh2jyj9xkgb3fnropu4xbxshvlcp31xa7ty91himu7fwp427ruepoi1bm0vs0p2bl059bdnkies5pfz0fuqm5ksgm33pdfq4em4ak3ea3b16fmhawcdj3gfnwn6ao2eb5kb2mz2v9xekrx2qedpgpir8e532661cms4cxyi8a1yhqesyhiouj7y9zy0wyhxb28ohsmrhkhk',
                proxyHost: 'xkptwn3ywcwhgldf6s62pzu8pl0k85uvestswgytfd6vz6iipmv7bg6gwq7s',
                proxyPort: 6404140364,
                destination: '7bogxpxf8j2ciwzv5ooaalsunl3xdxptddy6ww48dlpvtoqvr137fgx2rcv2kru5nfls0pd6fkdzspwl7fs22ofyluqnqzhzhs2ty0ibea6pu5bpiwantlmc1a4ryjsnuwi25pfl6bt0z8jbw855yaxkyj48owpi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tl2752rtzimx44767tb8wpy9ixg5nsi12rskda1jbr73p8lhj9c9dns4cjl514y9rhu0x43rjo2v7sqgotaftrbulqi6j0p08991pmybj2upg5b0qj12n1kd6hkmhm3nubky6cn6xnkv2ggydurrmmodahf91rbc',
                responsibleUserAccountName: '9v9cntcj5fktkoj81ihd',
                lastChangeUserAccount: 'oplrmyz5q79okvc1rfwl',
                lastChangedAt: '2020-07-29 07:46:14',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: null,
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'eckdub8yg6an8js19tn0vvmi34juck1rzeyhu8memw9k5f9pku',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'u9uxf9lhgx719uoocnkz',
                party: 'qbk42io0fbas4fe1ad9xn5qy30erchgl1rbektqsqb0p2pmwelbi8xrpqha8cjo3yrac5emfkzl0qtqywm7v6yussu4dkobygqpnyauqawx7vt2jmneet9f6g21un6vcq4rvqfhc5bwapjw2oiym7nmpgjs3h2w2',
                component: '9limyinjz38ab515co96wikvxvz2a9skfmwnsdkbnv0xvzlry7nujtg9j8qy60gpikil46smaf6kduw9of0kdashpvc3984xsl9ju9snhg2fkx4o39endiwsza0vrxfbyc25vrqxxfkosncqx7j31qxne1z8ven8',
                name: '26tiv3ad9r6dp2x4kgy9ffqygytf65l0k8h3hrxgm0qnwxcep4tng0rihkpdm8l2fpxdiiz16m0vr4ptnxmmf03lfpf2t8bi4fmwp5kug6mlqlvbve3l7bhfer4q1z0c4cxea2ccugz645fhgd1a08e3r5jgn5bs',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '3zrdcn6ziqd1rxfzyjomcw2m82t9wf5hu39xukcd0jxa13vwooc8i9wlu137ngr85pa9vid7lpakk00utf164fkdvlc1rxqyna4b9q160pi4wygq8nzuxhagevu0trv3jwuc4dh1xo8bdxcfecc5q71l50b6goni',
                flowComponent: 'c8ixit8wdy2fcf1o0jcuo2l5fx2kpy3kh3s3var0q14rgjax7ta57ebtdwlfn8hphuhxhfydgvwjnb472ji8oydyzvod5cmw2886u4dzent2j84e18jdu12owieyf0gz3v8n0nyv50z9mhqnwkjekozak5ig7ntg',
                flowInterfaceName: 'phbxoxyduxp8qtjlvsipgp040oxm62do63hejwct7rju01724dzzwa37vjij1p0q1bh0lhqaqjdrm9nhkibuvsl9g0p84p6i9mctm2lp4ybuwbsfwfrkzwxidkdvvk78u72hrpbk9uur332f2dekytvax5l9x78t',
                flowInterfaceNamespace: 'qlt4qct13cm4o6wggpbenx04rw8nuignvgtkqwp3ozyebbvslec4ifcy7ybt5pdef5ob6ajdsofwz8yqgmy1vedrkxuhhj5o3yuo0j9ymsot6kuf7tcpivrs5zaj00fwkndbyi0buo39g70ep3j29cfg28bof7xb',
                version: 'pbm2au7784ggkfw87k6m',
                adapterType: 'g1c0g2aczuv4lisfvl5d55c4vzfjz44dqhoyfklnhbpbvdd574zeza4jg0qm',
                direction: 'RECEIVER',
                transportProtocol: '25hm2o96edwd4u72t0mp64a2by620gmj618vk25jld282q3693z7svr5qbnl',
                messageProtocol: 'mnlzeyg5i2qwuid7a1d2grlmvc97g5e8bk37riakbhsuubnpcy43mvzj0y25',
                adapterEngineName: 'lgefgc72amvhqcqw2h8upii7yw107kvt2mllrbtdxeurstsmnew2u0agf0h818cvlmtzq89j3cxpylscei6somj78i65l2jv7mf625pchbiunv6cfa8siu1swnmd5xevmcyabdf6iye1yqsr8ogoi0am0jbzv0l6',
                url: 'ecfvhimc7c39jk06bjg09hdeam82x931qn6pss9yfluochjd73p70yghwwebub0u7ab6pa7r1erkf21y1csevi32rp3y4q18l1yshfzp9409oo8kd230r6psgqcihp692e6lfn1rp1et3athg4ezi2676xdjdrug9x91tnzj4wug7kfvvke4reg1qxq8775i09wdy2ybj3tknrmd9ceckjrf0pm94jv6pxrs3ritzfv766fd8bfqcedpztu7nan6blvlndz3fep9gpah7d5u20cpftsnjqv322yd3rz22h83bedqgkllj6j1n3c7688j',
                username: 'ra67wuhsxhfe3e9vhqf734vhzskexj9bk6q5io739y9ditz19thbysps3a6r',
                remoteHost: 'y6ctuqig4ps2gc1yhfojxjxn2520kqx12zxdkb845ibd6dba1yk5srsm8lh3fbv0cke18byivfz4vsk697ml81zncswg4pzwlfj38o7sfdl41ltmzm7vx69tr2z90gg6vr8f6xaxt05mkcsu8f57xf3h59p390qg',
                remotePort: 4008287911,
                directory: 'zpabh9dmb6ngp17ovffb2y91p5ifnobdmmnis004g9ufgg80lp2eaxeb1tj2ts2qx6k73ktg2qcicwjjl8qrgmjqodi1nsnz6lrw1kxq4ic1rawp0n2il31vdlw4elad2rguinw9nwt7w0j0nxzk5v8k8wjq2fse42me4rmdjlkddayzpe40jy3oqmkrm3yoo975x94albbedd6udx38dpjbumrfvhl9x0gdmisvsmit2sbiv4xi4pxlqnpzoxpilas33c0opvi2dvhq4bwr820lm4prdeetpgmffg4vxt841q73dnven8s91zlsyjte49e0tjfhi1s3m13ixudeklc24d9pkpm1h8ikw67jn3rlcs0z5b2xs636xb4zd6t4jpez3lvcmgx7vkjda2a8ribji9zmqd6j9c8gezdcnd5e93bejp4az8htjumurn23h1yie1574noh9rpv3tx0pn9qwu92izgohn9jcymjkbhyvggtcm6009ob031dnmhyki3s9e0qxwvjayq1gh0ms2sikzth3lj0n5lg6i8i8sr3sz4gzj25m87yeurkpfenlppfg13p3qim74cad67mdjgg0rx2uqeshohxhd31j1a03h82pxk2lqol3w69r2d6cdjmh8tgvh3qcw56b7n5oijink2jo5xprn9z791xb5ga8jny1duh7u5ykrapizzvvw1mxu3avnfwdjj52bjj4nude0dn0mqk53jjx6da75mt5a3qx4waenyf83kmi4hxl03bab7o9td76lpazmdo6ue6ah88ms6bwcl6havhzg14sggdsw1wvzs7rlhx55m6mh5wrdfmsp86rcglxlvbvxrixod6x8v1fi3emowa4eeqcwsqykyodfo5z1h3vgordrj3bri9jnspi7x5usio5uto4e64srnwhecqd8joa0ttcqjg0gsruigv9hhw8zkxx7sls7pz2343yjgtvtvqcbvd06wqw563cpbdgetez2b754mwz5mcbo1zi2aztodh',
                fileSchema: 'mahxht52w5h2s3lgpk0arrn8g8x6ceieavkhxctdzclii16ajytoxhk0zwinbc5li7v505z5ikiu2v27fvhgghq0fbu8qa94nzxzwusgf332f0c5v7ml6ss6ad9gada1na683tzlfmvgtl9vm2riyonixmiuehcjgsjeuzjkbto3w56bb3i8gtd40fj81rf5agfxwlf0k5f7n7ssj4wgtpjj8ayuelvpkcd7y89rhpzzxzweu8lx2sp47ye68xmtwhkkna95iijw7mxyfc5ta5ul0hpc3r8m4c2xerp12vb1z0xq226ovpr2ttbgs1j5cibzzlnzmd2369ku0axd7cazwzeojjveuxi3kqjfmvolfpjla3ie1qs8ees8m3penkn98tzxvngibffhu410wgghqzdvsekh7lfhdkxsl727ifurwz8kootunk3f6nusl3rzdi27fyb2ivaggo8dg782d8hz82vuwcid025hd0t5skhv00yxs49vc2yuu5an8sns4md9ldye3hlkg3dy1qez72f9hzem62essv7g8mb81wcwz2vvcfwoeemmyakoo287vds8p7d1ajw6n86xcrjzht8ia1928z8waohg2se0tvpv8hwapr2zkdzu50erhmfwsxz2lhhrm2mdlq9o5l54w9w4lrdegjshn45jsu1knvqyws4x6gqqv5jt9hz29qip76bzdkh7zr1a1d3o7coqn2hj3g1ltf9kevf945sttbb37ym47k1cp8vmd0wv6bjldae4et6u2advkrlm98ygns7slcyz617dc2oputj9dhbvdn2bdq7g42nui1j0b6jloja8uo654hjwxoby14qlrnggz5mg23ll9strcoy3fm4loe0dnpxx5k5f5lhgiq6g92sky9zeo1wqs0nfnodv6oyjvhddll7yjf29tdu1bj73j61xfpzlcw25e94b35zuu8o14oyss7kiboqrflm89roclp2yb6srhic4070u1llmwabcp6n8hf0c62ta',
                proxyHost: 'uhbm08r6nfrhmh3hpm7dmhkxdgomz5n03dpva1kbpt0f02ihnm6w65svw2yh',
                proxyPort: 9244907371,
                destination: 'kcqff07f7r90cvbrhbud38h9hswy17jmrcekf0517ny42v0f1ru8tjnaks7t5u665bd4l54yrztuo3epbzopcqmeet6i3n990s3ymh7uj757gz4zmg8n9ca7crqjvya68fjemg4yov67sc00c3amvubh2yegancj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7c527tagifxf2zgp4xbkcfkbm27wpawxgex46dv6z8tupxf34vtq3zudf3us4jjcdh0649mi4mlykz7cp8y98nexm3e4f68z9fq1klgrt26hvt36teoqvuxn3tf7kf9ru9eg4ln1r3c4u9etndso8sclnc1cqv0p',
                responsibleUserAccountName: '6n9y8lt3ojgw9iucrw0a',
                lastChangeUserAccount: 'azit746ilm4a7k5acwui',
                lastChangedAt: '2020-07-29 16:34:48',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'ln0w5e3mkemfxthw2lon3tbky06noxw9cnpzgikdr1xt2krhsd',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '12kjyaqk5assq8qbq8wt',
                party: '7pxbn2uy14qjmtkv3bgr46ebm64d2ckg8ijczsxqded578vskg67b0bf97x72e2a73fb2pw9pn82whdeqh2o1btzq49ccqs4v0vhws9il4md3fyv6q29ubtpl74m97pmxczvh590kgo5csga640bc0z6bpyrz1wo',
                component: 'e6id00xlvo70u6wl4eo0sthsk9b6zxc4rzb3iwwbxa7zk9g1kxcwmo433t5uez072ww2x7e9yccquc5zjh2u3kivnk44vq7gph61mv2xyx6jhd65ztar9ulpgt2jx6pre69rdhj5ulw0wlkfif980edqjsqst1om',
                name: 'l8nyixc2xe06rcrjjzrj6sgwg4a4671rvaa7umttwplzlijpks1xh6esv3h1ur0qtr3nicteess2405z4h533fvaxdf79bi7zqexyw780bq285re3n1w6hgx73dtd38vxzrdn04o4g9z934x6mslv9fig69z22lr',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'sv4om3wep18sd32n11di44h3jodzeyzklddziw46xdjr675twd1n83r1hapi0wv9tvwp7erjooujx3d0py9ekqrajx914gtjhxsu08o2ortqxg0qkbw47te1ddr4tb2eqtgup57tepcckat1z495tok7n6w0imzj',
                flowComponent: 'bmil7fi8mw74g3ybxuht4wlok9io6l603ghjvgsx75mmn3wud23h14v85xdzi0cv12n8kxhzfwh4ka5sy6l8cjcvbzfmemhqn8yi7vb03cmwyjxcmzg2mskzvnk4i4ryshg2eukdfe4k5xdwtfbu11wjk6ifz6iu',
                flowInterfaceName: '4p0it410gmpxx7sqhojqfiz0ntuhwno3d99cegc0ikgva0cvx3yyl0zro2etn1bmmfgis7d8vm4yfovkrw9h9pgzp1vl75tcoa92kx01tij7cyv5rpj2xnrwpw3g9y9bylf89hh5uzlej641cl0cr4eigcw0gj63',
                flowInterfaceNamespace: 'uwgf9x0lvef33bv4u7znfqvcbmei2hulj4sqwb2l484c1zc1a32xeqib30z4sfdnceb3rrryhra2lbtk1xfpvp0y260xl3ca0qn0h35wx6i9kx3p9btkacwxpjw3co91oi9aizkvsl16bnetm9vdnci21scwgdgn',
                version: 'nvarjwmnp0qzeg6sc57k',
                adapterType: 'mw788fuhxisf9rf9nyjlbapq5uoxwhmxwb8pwmd21fdq6qpp94oi7hf1nm11',
                direction: 'RECEIVER',
                transportProtocol: 'h2ge1e8nldno9pdb39qqjqa9worrynht5x2sypvaxllwj7nj9xx93gzey9p5',
                messageProtocol: 'zph4xwg31b0djewhhu9itire867mr9tmezctuxqqq38535fpzhwko6isxnap',
                adapterEngineName: '9pj1y1uww832b5rcsq0voai4unzbkclannhar5ckhcfncdk7h9z3tl3cfbqxtq99m620s7h01fet80lk55b6c0t52j4clye864dhrnyc9nmra3tshg5f23xqmox9ph5lvkbu0i6693of44ulbpffxsttaqogxti9',
                url: '3lyij4s4u2zzttds294q2zlfyymcuuygxg3ky7283dr71xuhh56k15dy2guejrzju67k7sb8sstpnvn5d8trdymsju796zewba6nllajlwppncth0cst2vl4ap87hjbd3418dzwcjiy9ewgi73zfn4c0f0ph22a4plo5qjgn3ph2jkxuxkma9fxb09jwut9llfutnzwxps2qriboev5q1j8dg8a2x4sim1vp3cbl3rxpy4wjzscqlja704itquqmgn9kpleq2saarxfcaudvwo721o9u6bsw0s9sm2r01ki3et9b00q0hhfghg9g5ntw',
                username: 'dpu5uzdiewfi1eyvgymoxs8ddgmlgstp9w3k37qzwosrche4jm1ux3uhh6ld',
                remoteHost: 'wc40tk7fa379g9m6z4fxdzkwxc5541ig2fbyrtln63hwtcq55ae5l355ihi8r65jd0pngh8zwt1o9wq75ruo1wtfgw1qey9kxo7mwaqhmu7dr45g0rl85ch3vs3sjkmhya3dc7cmj6r5g8uyfwtm820u844s1uqr',
                remotePort: 5643570176,
                directory: 'zi6i7h82q3if43md5c54d35ajqbc6xlz0cbrkp7q36x2c70vn8d2efncgzuqndy4xejnjenjlba9732wtghucrpjvu0nl3ok2i995j4g7fai0kurn2fm2necu7kt0myi1bzz38qhirf5ra3yjnynbzze1am4v8j678ymp28pt4fyv07sqzgnh7fkxdsv80b16g6py8ym83pm8l1os2n6v5fivk9zakxu1ckomaavigy91p6ux1kiqsp5hszej0bq5iqmf773bvgbilrhd9p7ocfcoxynz516u82qap90tk2m4a3f8f6s8xa4cp549jf03a6tfcyb735s0h65qo0f0jr7z14h1melf6t865b3soy0t2vqtdvua2h6r3synu6nngj7o1tjph6a9htyq675zzxhbnsk30onef23ccd3dev90nsdbpw8x912t617tyz7vhyvjl0ff1ptpb10mevu6d5fby4x9a8u7acocniznk6ug6qcdkyd5inbx9nerqjuj9amrzjm8w5urbru00qwhlo0m3hmzwbmbvbhcyzkp5gdtpn5hfagn3rgyf5xt51a7ss89l7yqjyadryj4g8ji2ldjurrh37bgds233mgewrwcmbegtu7r9suy4h7b54tou2sjrv0msmjylzmgb2bi1q4h87frn0bgpxeciy6109z96ornjvuqzkc1bnm5mc4qq6p19l08o3erufkcwr4u13lu1jfy4gvcwyaqmmye3egurkilbr3gjkeaj51ubwn1d2ixe6wcrv2njgxw2p6x17wl7uulu10lcu4gwn3vmhr53k2guuueqkedqmxsohksb6ltd4fphqvkggt2ic42ganvzfc65xnbof0ceohts561rnfnh00hdycttxy1rbto70bfgcf2vw0e971pe6najo6om35e9lbo9nqv1af8hd7b06kj0a69kwa217p5746w0k943mu8bwx7kwav2lfs9uod055b2tmoo5cnxxj6go2h3o7gd8z7tyziuhulv51',
                fileSchema: 'znkny56ltofnckovnpd1b7iybvox2fc2x5iu6h7zgup43tq91t1i4a42w5113ftqtywdowiaa4gapomio4wzw7j1iwn9l81m2tu1wwlojru40ksqstgc0uyag8swt7yj7pwffh25ogo9vwn1ty2erffllv0csjxhvncmthsa56vre2nzhx6bmydafijq3gvi6xphexyyaxug1wmdf6cc736csdohnt9dajb9rhxu81kewwxjm5takgyvfqf0oognmw4el86xu10ivo2cuu81atds0weqggm3akxclr5kr0upfwqcrkbomj0gedmyfg4u5r3llbsyjza7avap3ydn49bkw4nsms7ho7k7vm4wg2gutpki6y0i03smg51cl3q5p4r1y9o3r1nue5n0sg04s3bxyzbb3fz2xc8mcbn0pmvrcp9g9b881len0u0r515zu2lcnrjq7pt28qbtkoljv27hjjgyk8x7k7a9xxdqpch2bv7r8vjxxdzpj9dkdj0pqs5yhj1uo7ilkp6cszdbaf7pqv04p97icp7ztfc6vg70y1ie2hpakjjebimoy14xq0hp9w6jojwh197au0uvu0ma6velifubeevstkijh7gkqlpogzx0komncndd6s77stakohwn9m0eovfkwi7pzrtfm15fvlm8f29wwhroengsl5ln59t7svouizztmenr7qnn5d5sfv26az42tjlwgzw4159swaszuu9og4cn1s3qo73s53wdmfanthuag6budh7ed2r7os1xq7dzyazsfwspj6gfwft5t6w1hmkchmiiiqx5o20qz7c26sbmtpjazkni0enz4eifw1ixusccijdppzo28627prynrpu7y113ledjk3kmk0ntwquzpv59v8jcnr3snbtrjvbmhxk2jg72p168cbi1tqhhblpu8y7fpvebda3tj7hl9pv3v9o53xtranx2zhck8jxxlvmj9lekkwc0pc1az8roo5q4wg76z1x4ecce6a8fpzztozqz',
                proxyHost: 'coa6bppuo0gixokxxnmdcc0ekjfderqj7ynwi1ljm5iihdsfz66k3kbxivgd',
                proxyPort: 9804822540,
                destination: '7ucg2mm8tibsoh4o6vedfaxxk8igftgaqc81vuozwjr2ck7xgiojiz9yja1mkkfbfq7820ndipj0k2m8fp7zkazit76kprctw8l2q58weflgijfvgxwy9wp18264bvxd3g7k7f18dvm2rhl00nc03bqtui6z77h1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '95d64uzqwbua6519kwcqlcnopg033d3hn4ttzfc8gyxis6zar4wfxnv1zrmhj8wce30cise62ixkyqxsmdchiprjzptu0t4vh3fpzevcyskjk8jjojalw7ojoqcogvlh9bnx0kzr4xar0jwaeu24r5t1eu3yxxqb',
                responsibleUserAccountName: 'cn78tn3abjobk9dpblgs',
                lastChangeUserAccount: '2ae4xrq2w41t9vrzrbcq',
                lastChangedAt: '2020-07-29 09:44:00',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'v15xnkfi6v5ousootz0w4tvj4ciyxiqsdzp3c1ij',
                tenantId: null,
                tenantCode: 'vmtbzgcspyejizb5pqt3lmwy7in01jrgzq8l0bvnnci7oazx3r',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'ufdkid6gb5qi68mffsnm',
                party: 'ulmuzwxhnfiit30ferfv2j1efmu4y8jw1exjyhnszfz1yl6qlobwkfv4n29fit0tgy8xnfbzuajteczb61lk87d32eatcnwse78sc9lq72x2sed95uhiafmqj2rpqh10325qr1iji9isguq7qvfyeot14bc3nc12',
                component: '9f91byi3aha1bad4nhvioippkocrj2lxss1az7jtkiqhx71th9giahstvsu6ovtpugr1y2r8mxox1i95t186kkxffb5kktpe61yev2sq63eudido75rh759qy0mv0armate3zxwnfg2zzyz5mvc4vnud446n4i7k',
                name: '3fej2iebacdaqadb9ppjrj91hwnpujsl1j9t9s9az3i974kl98ohqa8vxjhnylo2c6vfkj7p7s0udpqdgz72g8le5i6m2nmn2nzx9qnrdeg0qo10t1ks70sqji94zi49tlm4g9ortzbhvccikrahn191230p8dak',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'e6rs1483o9v8jrkwgx9dkv2xca0b61tz0aotl9h6cy5ebk7shfuykg50ds3dnlj7izz53k604orvmrr5pg9sr1ukqlhujk8ow8xdm4qy3r2hfh9py7w1i4rqbvr2vxmbko69opsuvn72k0r371xs755be34szk6c',
                flowComponent: 'ea6k8kyopbk3j1e1gyoh2jmmh41z290bixr7w76wkuqrjvw51st8dzsgnk1b5tiysgsw9g3ivjbxxishetr9v2s56d8me0rf47ya76qxbbgw7r0pnti1dm07pq7kudaminugn2x92ys45zftkv8ixwwgrh4z5ww4',
                flowInterfaceName: '86wv4ykusueys6l7stjhqxfhcsroa5mubahkn3puf30lwtshx84esl3smyk61di03po7eugj52ivvtlo3r0i0kshuz0hw4afay5zvttgrs027087mhlotnjns4qbv4axtyyvcoxr37ef4y8y7uuk5b9ww09a8zmq',
                flowInterfaceNamespace: '8at3j860xrwh7zvcx20k5w7bysvtb5tn8r2mhoubijbuz05euz6pozyvij5k3frx9p0tg6a4dx2vlm74ghjvh9ajq6cg3cgnv4myzaht92i6vuzth8j2gb7n52pyyyncc7fi0yelhykyappf1eywz3zwpbrr82bh',
                version: 'x21k0nwzb9yfjmuoejke',
                adapterType: '9yhf8btrq42hfj1jpecyb26zm0kumqyevjric3w2k1fwocudcdjfo0aomuww',
                direction: 'RECEIVER',
                transportProtocol: 'yae4lue9cbe9fwzy7jv0q3f3vj4hxm79iwbys69bsqbscjgvvag6d5es0icd',
                messageProtocol: 'heqhq9fyegucwatnkw0c32w0w6vnhq4dx8q9wcoq5nu1om7t3abpxopdcjod',
                adapterEngineName: 'dvcv8lqot8iwaiod1i5lrdmnmhulx7ckhy7a74dniona4s3mt8rgjj0f2utef6rzf0ot0edv8lwhmvl4yr5rearl4g5f5a5xuyprw5be83bi2qt7qx86yswtriksmqeqsrxq5g61xsutiuxweqo77vr2xdg6yenp',
                url: 'h12s8d2044izc4tr91rp4w8oojfrj8tobcfnnq85upon6s6tdi1axq3ky8vakjv5o5hzto2ukkga2i50z7qimv50qdpvwsdbx4av7fntv2b1w2s2fdilrsj3i3bpopadriwhnrdz1t9i93ftg3ftu3fmjgz8l71vmpya75lgswooaxi1i7hz4crqogpqus1mc1scznozz7fme46q5flanyc5isxobakkjlz7mo5zrm7a9v3yjxnx7uaiz3ik12dkducgkxef3iqrxroqcrwcmyparjp2fns6d6g05hkvfinbnj4exozviz2yzjrmfyfd',
                username: '40w5vn5ny530384qkh1i4sdsz9ipyr478uqt9ceycw7iqv4d45eg4r1vxeh0',
                remoteHost: 'ptj3iecyipcb5nt2afvfbsu9yd4u3b9i5e21sz48d89g4tu9fu501xtaf6ow7qel5hfjkjj7eqmzkr9eoue2kkt74rrkz9ud26mhlhi3nau3lqh8j1p11uqc2u6c2kdu1d1dt6iu7lm3o7x80yz5fy11gapl1m1m',
                remotePort: 5266272222,
                directory: '0xaf50sgn89auwcjth3rgtjcja1pt2vwd188odo2418xxswgtn8wrh5hzpok6m9ml9xl65dyfb0ptlx3c72sa26w9cujaq4dorjwd032v7fc7raf931htrxv2uq1t1ywvvu6cczaqpdq7f6tvfhu6s83adahb7ume00301vf65lo11p6a228w4us6va0j3h9bndj9077kzxignn1ufsf0rbu76o9xhcs9d3b7p67fu8wzaqzwsyt3w9yqrta6vzi57vs138qkjtxajrvj5mq899qeixoh1gpiex7684llgubm0rv18uwcwa1i8dgin62omznui09g3hbtco8lc4q398bqrzwtq32uensjkovamp2rjtcnfqy57ju4zz10mr14knn4qokwjc252jn5q3w4jj0x691e3axxkfp20lq4n133bo87dcj9j6n23anr8vl6e2y9upwewvjuflvienhi5kaupfcjew0bj86m0l74qr1nmckjsbuoo34vdzntcb05zejk24d1l6ysmcmdx89aw528nh08jzlsi7ijtojryjxdbw1njfnc1l24i1cwwav22fvq85wpgjsk9hrt7a20h8o8jpjdg0s8yh2lu51fklg4843rp2lz86y6ld04asmg0p32z0faogwvvih39biob7qaai0q9874kj2wie73t3tjhxnu906p60n5xgnzvhznxombddp33l45s1ujawx4194gsnuvmb0ypehwsb7re5logi6yhvz457277a104goka6me3pguccj7odbak8j73qzdzr76e560pbm4s2tt5krvw5epcuh9r6m2ju8wyrdb0giqne0tr4ccv8tdyhaqd35aga62jfilamn2016exkqosrl140hso8gqykdcfgzrx7ps1dbw7bv9tl3u5kv4tgg1mhrmnevl5weyecmo1imld8bdqyvniq12odk1dsm4jnve1k05h9en94ccw3d1sjty62q0xhd38dkplhrf8b691m4a83tsga77jpl94n4',
                fileSchema: 'pjzuhisi1d47pytkiko6ofnql8g4b5cp416ac8zszut8r4voxy1abmt8nnx93vi6a6ctyd5cuugz4r9sesrgdd9cobfcjegb9zaj5qh32vqz03t1h2tpdpj9wmqn9rafrrwg2j3rjj5ey9bwul9x3gyy5v3wgo0qnnvcbff2qet0zu7prtoec3kd8gp6m79gbv5ngpnpbla5o5zo7vfbd8xcx7qqyhhw1p2l64qbdm8hfbu5ln08c6hkiwhn037tev9yuy5ssiggd1g4hbiw77ilqmzt665a6hv1ra9oxxqhqsc7e5ml9bpdtiym91y0qgbgdi22x0r268lv6mvppr4z7u31tutxefyb5bnznwteokr2tq3yyfb1fa86ride30k975j2bk7vmvl98cpvaomi1x7s0x18b22b9pvc84p4hx7c6jqbq0pmrtpyr074afkit7ev87nr1ctev3o0gjueutujfrluy29qyyqz54efleo5w7e3s8cc35u7lran8fr4xvr45trhwisq23cxymqppwvxmut5jiw0a1ytblg52dxga4mie7e19x9yfv3b85lrxvwq3lrbtkpgz41a8b0rlkfkydf3ndwa1sa6rrep6k1txfocn39rbv6iu3x39ozg5il8dv1j4gusgyjj177odd8y12970e3sp39x70d06707yl33jr2ny5dexke8snaco9qktuizlwhgr7p0e850i5ssqp2s74f9jfay5hgt40w3c21mkekm5iux0ykbnhw8ekci63e7ynt8pndg5vqd8msaova5p2gue7gc10rufbhao44kesaahllxumhfq8t1vzgbjhmtk8meg295sm1bvxg5svw9vj5r23eydl0n8nalkcjy8kphqcd10xyf87kxdnq0fkctwjja1h63kywssao0gwbzvdtxb4zxifsh0pwyi6ctgxvi79hxc0qncnz6zb3jb4lh67kribn7poh1e823m1x3k3060lv4grsgn7uf50b95szc4wbk67e0',
                proxyHost: 'qtyq4998zldijww3z4fpyjcncb6owti3mka49mhv6bb2nifw23s7lzv2eckz',
                proxyPort: 6745738913,
                destination: 'ufwa08wzjjwz99vbguzncel9nkq70ixg8sfcs7389ss6657t48qisoj35azxb67xzdci8twfrfnqhfyouvjdj35ztp58otu9w0urgdbt5t95ec71trvf8wrqouf56jawu4f6mcwdv7bpgq1ekko9dchatztj3upm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uhnmi44hr072j2b9mjhq5jzi7xmsuhtrxrsjg96ayhpbnfzidjwusiio1npx5y9qekeua1hjz5ug1n0a4vkhn2scpv4lt1f5rix80v0at9ks7ctdy4flk5s1x6dzwowgl8rok30ymp970c4h7kwespgt6wd8e6su',
                responsibleUserAccountName: 'esr3tiw85cxyokksq52b',
                lastChangeUserAccount: 'ozdxke7r30hkiu5fzqsw',
                lastChangedAt: '2020-07-29 13:06:12',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'vjbshc4e7qg6xoim825aadcc0yy6zrjmgj4z1im7',
                
                tenantCode: 'vr6lsl2ikte8bxqntvv9vl88kuav34lkikjt14zdvl19ifyz58',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'ndby8bsgrjhtby2f81bq',
                party: 'hyme1n14xiqb7uqt4noz8pingjaf3umr6a28adwepqf5vn76zaj8ebiq5i8xh8gehkq8didgmkx040bewo4j3zhfzclj6obsr871ivv2dmso523lz86q9me340z1t1a6rw0wuct9m7wzqqzz0dtb4umbnq7q82da',
                component: 'cj7797rdf2yxyr0i1jul5h6duhktdiis44rqdtqhcztsmh0rvg3gh8me4lwjmwxisqb1f4v5wjgkeuiyvd6ymkjdki4651nlbs70y3l4p2sjx6nla7bn9okpibm9cdlgo44wruarcaeoesziii1gbv2ziy05bzp6',
                name: 'wj81t58dl4s7cn1i2dugggmism84ysjrzs6zxk0zxwosmvu30mj9vfa7kqinzmk13muf5hxjbnp9obowu4aoevex1ugbi3n0gb8hzukbz4tma0a2202icxjcav4px9qw5b6v0mx3g2zbgsgja7sygu3k446sqh7d',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '5txsqnpaif9cjmmqj744fyn3v84v5nl5c1czkdlx8f51u6r11250mgw4gtdpp3iqec5slsolln8nt8ubiy5xx2oswau0i812ta8zcw1204zia8smzx91oli3jfxqxpr2mm59s0qe6245230z7kx72skjb8vilz02',
                flowComponent: '4yabt2nvmen10kvparzi2vy9aqqc28dilkjzv9n59dv4e322uisdlylyoqdvk72nwauif9n3lwmk0xo7f717f267z5x7rcx0ahp2civj4xtzcbjp4kavdlmoxh1vaspykdkz0rset9zulzi94i4db9jujklciuoj',
                flowInterfaceName: 'z6uw1z6fa7msrssxfihwp6ij3polvytni491i2gi7xvuyscard3kyydzrpi6gtqq71siqvwqe3sfmqy2j1ejs0prni3kx1iszzok8nwcqdpumoarxyv87xzqd1fxe2j5fm5bictbfvngon6rd5ezxi48lz57u1qo',
                flowInterfaceNamespace: '10aip3ghjo4vrkhsnrmu42wbhdwz893owzkiypxbe88o2pa06h455e6iql2c42l7bksgget7s5ddqcy5jipsgw5m3top0t7r4l3n8hwdcdd0jzzg1fatxc3bv3jok403prkvldg1z2lyehbuer03hihaedulk0j8',
                version: '120y3bpqm59amtm9rp2r',
                adapterType: '2laezpj0moyyvuwifxapghdkr2oswr6f0yjlnf2iya65gtaohxvdalwb8iks',
                direction: 'SENDER',
                transportProtocol: '692e7m6gcrpmnlgf3n3yxsgvgff7ey0m30inzm4jiy5n7qg7osk2o3q9qx5p',
                messageProtocol: 'pwcf5ulvp162c9zeje16pwv444kw9toosbizkszn4c51jeemud267i4stugk',
                adapterEngineName: '4093zcobbe6lcnndyegiq3c6tfb7bjq99b3bd9h6zo1a9y5wv87xy0oddhddifvxafm7gtdf81nj2czup5bnq6s3iecqnrflcf34kiv52pk39m2hmbtck7svjei6qhjnx3am9pshx3fpn3dh9017az4j8rndskdq',
                url: '3ea7zow9rwp0o85c9yw9ns6fvs4pyrmb6trs1n7idd3jtynnb9zrnkbm2mqfbsfweg3mgbgg0vcfkces5utmspui9u5hf4us2w1e1pywuf3idncg7i60acwno0h4f3cbvwu9a1y88662lge6a0hrvsvxia17g8xap6zwcll1eejg4mgakgogfserm7if6742fkkavvsd6fks57ia6x7ql67hhab1y0sdtj2advymg3rib25b69xfpnhi4jtnhvqnzrkdd6lvydwdq4v341jllp1eu26md4ecgsm11bhnm89zvengf96f7d5cxeu5d2oy',
                username: 'td8n2iwhs94v3z64ut46hm1mx09z1372axum5jzeiq3ugakgkn78hqh5x7rt',
                remoteHost: 'bc5e03y3te2flregikowyeob2nba1r3q7cpiijmtbcbvinvy9y53ysdu4p8mf7x9vhjlgsktjzluhjb0e3nx6v91kvay1qbf593b9o6nh6jkufu56pqj7sgkpm9tg0gyvvfby32gzq7hegr2fejphg4ryvdihhnw',
                remotePort: 4905007094,
                directory: '3kuatau754f757ehttn4pq5iqfh1a1zkhdub6tb05u8kkfkwtbd31ww1tdj9tphk7wprvx1uusdezfx6yrkk5ogguqfj316bbg5423s6njxwmt059v5hpmjm57mybobrdvh5hxhiqet8fpye2m00mubxbo7sq5r143komyp71cnvmh53goigvjtian9rwo56v2y9ka85j8e2ufimkcv4wlsdurx7q5j00trkwk0x29w19b8ye8hj88ol1mf63slo6cnk6cj1l4zu22tit21rfi36wkr6wt0holp08481xc18x1zn4wa32ogixxpit6f6drwjeo8mfmu1g8ueuk91o6dsp46q87nq5iox09uckp48131afcsst7214yi7uhjjeno85736whpy3jw6ujauqin1d53vrppoxtebj2b5xri3wsqe2f7ny07mg7t3ni0b55s2ur11u2opv0ztvexe6wttt01ydme176313czwq843oawv8wk9m045cpf6x3dc5yqmiv3e5q1h3lzsggu26y1z7ufu8cqf0z63hvb7wajkiby6klz2yjif9b2bhcxq4i8jag0mnfye1ipfyjlgqj7amftvdn9nifoh4qm8sbs2h9yz9188rk8jz6g6dpyk4d1a8fz06d4f9qprfroclsv9dt7v6dabqs6lb8jukhrwhw7ondpcwxys1ac8vi76hj8x15ob9z4ov47fg0dbzzy2magelba5jf496q61c7vcm20ybtcttgm94w6zfv30g8v2drj5g2ht2m6u3e5aojt4w81ny86jgftc4etuatjsqwz99kjmmdl8lpvtpsbze8hexab6uyl1nsl738402q82iyejic1rti2quaznkx9hb2cdb9cxqa3zlylo12fe4osppumvt0ga8r2c1kfetwv3zs782s6p8fc1mcrdhdbgd27qjuvq2zc55f5k5uy6q5j3ibd9x4uyhteazpqmmuetvvs8b1xrfohpi154x80na1fp1rie0b3blecicihn',
                fileSchema: '132fqrl860p12k2rogjsl8d6yxngivs2x9juzm2k03nog8eqdq29cjag2ne87znkekaaxol23emha8cwcfkxgsyd9yiok8wbo798epatyhv6hpur49s739tyfdfp0c3uoogd67rvqx9qenv2a25ki5shi795w825k4cn4xaaonhnt58sadr272qx1pvp9kw5ansui9xqc2remnk55ldneoik24urxiyepday8x5x3xyiwf40hyhz64en174d52q29b8nbh5x40pe5xo6y6ktnjt2yjgqlhb7dudp28b7aqaryqynnhlzk94de2avycvuhndwizqa6fitwrlgjsfrpalcxnotjuzvc6m5j0h0ffe3uaxer222mx4zek6b1oi1lagjrmv0l95c6oydjrrnf9rkffai2dl1tegnpwlczkf7ps1icnxlqw7tv7bjl44phrl4v0eia88bh2cmltulw1xre6ecn7nh8yvp19i06wmtnqd7qh9ttt07lelwx8q1t7kp6vrqf9q7xxf2zgxeuxekqfcejwnz9dxctunsfmd9k6bp74kclm2iskeugxv8acu2qiqjpsa0o9003g8xh16ws26hdoxo908ih4t0hh5kfk6wvwkhkgglczr7ql9hj7sjimei6qbtbwuisfxu32lyz1kh9w1yzrt9wd80zhu3oa8wes3ni7mx2pr1ie9m39en0hf49rj47oqvpgk6qdnvust8p66dy18iuatz0c7eu7pdo11w4ixfrk3gzmlk3avw2hz06j3lnunhedcamjq06w3pwzd8cbegjr4aifxu5krrjod4qjmu082nqenn4nyd5xdc0jwsbkj2vpzgfgltzix2gedsgu4q3lcxeihnaf9ybawe7y7iu2stk9tu4kxyvoieb90sthtlpozmp93mvrypuxgkgku6sj8rpjc2bq53oj2tx1gwxypyzgqbzkglaq3iptf042gewpf5do47a0vjt0llieqtn1vrhvhb6v0qz0znzw6i45gyn4mt',
                proxyHost: 's10zske35jsvghrt7zmnh4dojcpemq60ldqnab3p7hytrgp3kubfk2z1e3au',
                proxyPort: 8563207036,
                destination: 'dari0556mb1x0o4fbruos5hni4635j7ncax6dct0z0f78w9bgdh24re03p1bt5r12vhi4i54k8sugymkjrqjnm3wspt4f8kv2b7tuz2fxuwjjeqbwm9c88hahjxbo5d2mfmmg3gv3kh4y5g1vrfvz6cpthb41176',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k672rhqnx9v9h8phkwiftfuzanmw1p968mzao6o8vate8atk7ohoak94m05tn4acb60htmwb1cymoevh2g7f4jqjmqy2xyj19ssay547ekeixnnurlz938c4vgll0099g2o54ytdr7d49qkywrh4gv7ww2r3arap',
                responsibleUserAccountName: 'o3k0nhwaq3vk007vvq2k',
                lastChangeUserAccount: 'u56r3ii1xt64r0kg5amp',
                lastChangedAt: '2020-07-29 12:37:33',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'm375rqorumvct8rkbpnwwbmonruh5fapm1d745ib',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: null,
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '3rbdlgtwxkc8zt1udq67',
                party: '6gtceulsu8twu57dhdghzukmsa95awqjytqy0ltqxpjmowmyjfudod6zilpaaebd2wzcqv5pvls59cklmva0s1vnkc7edae1oqho7uj558cl6avzoxpdeaaxc4p3a3mc42te1vo9wgxins9uzfvykz78w19r5vsx',
                component: 'quget7vtva7cco27fy8un5eakcgdunm6xpqpqw3m8m5in19lssmdyrr70mwryim07oviirvk3ppi47tv91hekimtinwubo1rb60jglfuezqfj3m9a2efn3cgzae14ufyncp70b8rrtwqr3gvce8awj7ob08wbu7c',
                name: 'mhy7h4ablpjy3eqmjfv3eiqkuwjobnkw3vfm98ab6sgxvpgrzioh25ia14rjyqhmdmp88t2onpcim8r3n9izu6eb54shjudiqpe547d6w98rgm9ipltj6w5vqy88gue36snhcziit9bbijqxtpcvvd7xbzqedrwc',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'b2e2o14fh7oxn7ao6z8m4nyjaqngkhjsnx3nx5uigrltit5vhupzeijt9lr00q8jn6lgv3s08fo5o5e1lc4qwkf94k4p2amablwolm1k6jztc06qzpo9lis9cjektr6tqr7m15nq9gz30aht3m00ya4yy3en7ljw',
                flowComponent: '4med1gj72mmhxtmlkbxrfvi9vl4wu3ww63tpxx704he8notkvolplin7g0877jmgrqh6ww3e6lw75rnpqxq86q2dj3etft6s0astor32vll9fc095bined0c2jq3tyt8jfz2viek9dgvs6z705che3smo9ezduqo',
                flowInterfaceName: '9t5aqswb31w875bjuz7phk6md80qb2873r19zqfn0xffr4egixn0tvapgg6n35jk9eq8zv40zlf1hp8uvo3drg50vm8xci60m8o44svmvqtno4vh3ya4i0wqvxrdr60h3sxfm9af2idkponsqvfn5sjnq6ac8gp9',
                flowInterfaceNamespace: 'xe2dupv9zxupkt10qc14iy7oibfjmprf0caqv3h4d2krgbr9f6brsl9a1tinqoxkt6wdxohzfand3rfqwd6g32n5yh07pce8krweyjuin3x2v3b97ggvdieazglhxll33yrsfqoqzmjnlvu8qhgecun35948723q',
                version: '3a5uq1hpzzrklu09j30l',
                adapterType: 'rb7i8zljxgq6m46ul3l085n6a4ggc5ykom3uqetitgufkw2qw0opr6igy3yb',
                direction: 'SENDER',
                transportProtocol: 'cak2e4fxu9i2a5eoqx47txjnq2l9wokq7e1f6zaj9ld5gc1c3u50o52j4p7t',
                messageProtocol: 'nllq4olf1dj2o71ucphcoob901uggb71wbox0ooqx3s83qae22p1nbh3witl',
                adapterEngineName: 'w8ckuimos69oimrkbkul3rwc6kh0hxtowr4ksy99ls8ofjpo487s3glr6iwmb9j380rmxdoqmy4um8jss3mm39nvmnsv8ime0zq30f555e964mrogdx9f3rw3s07y5bfyrtu8ktvg95es2zdhl95dqrzbgxgjliw',
                url: 'qrrnjj1agkhavuyr7k3nvy973u4r9q3q0fclrw3vaj6d93gyxf65435hhpy0q8479f92of294s7g0bf5cao0ch6tv78mdtlhabvgsziydjgkkgqua9gxs70xk8wv63lgg4ru8u2nzkkog7ie9lhax7qz4s11otva7xoi476rez7ymlwhilpby0p3ap83e4cpeq34kuj7864c8p2bcvok07pqt1xemnk71tu17bdl4wbiwoxkvpjg3rjnz8u7dwnczfmg6ucog5ipdfgyd5qylvetrkz61p88d7vph8317z6acprjmnu0t6ld9xemocbu',
                username: '6ak8yosrdnl7sxukwwhndph0ybljtjpjh48w99dx5dzb8xw1008trnl93dul',
                remoteHost: '7v568cwuj4ik6gwmuzntjsiidwsa8jft53seq3vtk0em7kzkmst7vqea19jhhctfuhnl8m4u6cwja2id474fvpg3mpkytp50358ul96sfou2vffq4cta9tdvq1faq1h5ujo8wjbbw41uk4w9tljbae9ta7o7o11i',
                remotePort: 8692891329,
                directory: '6775ah6nhkacjunnh0577ngevh0sch2lb6d0ci2sa44ujs43q1r7kisxm5gkyua9nravnetq1qfsby7j4ka9iqa1ch7mqqo7mz9094d8uxqs5aync4xujpa7rhb0sh4kr710bbvs2j2ip9omed6ry9olppgp18l4t48zuix096vumsr7oieq3wcv8jnass45rz7h26nguuhj7c0cya4xeqmh1wvjmdp18v30zuxmak4vxkz4ex6ktdtubid9y8qs7g14lklx3y34hbdp9e5eemct11t6elgoguqgknsd7tuyxj2m7686z13vne45ymhx52f5kztg3dhnkyh9dxn70vze391vz3kjd1i2ud3vjovf82uglcle125d2u7mrxzegsxkh9a41w91sryphq4gn55rbrusal7wuuolie9agaeskznlp9qe72ychhbw8qjyiozykqo4h2y64xjix6d2ufk5rdohdtt7jwpvh40q1g8hug5sshyuntmeo6qqbka1qn7j2t7ynmoj3ib7hh2ozgmrszi91sto1i5egcjetyhdy3yvshtat3kqctxjzpbi8s0gkslutcqxfkxd5muwq1bdwvmzx4np093bqq7wt0bevk7s1q3sldae248m6rbl6q4ln897q6ot5x8wf15a0dy0oij1j8nut7sav1iqbodlk5mqvu0lg896sc8z9a9u1mg333y961m0vff6o9mja3rqh9g41l09ypryqfxwhpdgm5eh6eu5l3zl5rxlb3mbvsffvwitrj5ek7vhsysyqdph5fismz9vjg51kqs16vetpbvf0s0xww3rg1pg9sf8q028i9gqkqr5pj8aofmegmys8cp7yhqfa7oeivg63g65ll01g6qa88u29enf5my7enry2qtvg4e16eekx1drulckjy9oqcnidazxgaqefhim6sta5u1uyxpd7x1235slg3c65zvr4foje6puye9nz72we5pdls627glkg6nevpl74u6z2chv82372zi6szy2',
                fileSchema: '22m7k5oahtq0ieq69kewhrvcolrbas3j995xlswloka00rydojniec91vk97tcujboo8h5cexo1mg38hubv580oht02ubjxoqfdwemcq7rd2blh31g8550oxcp6dca8zydi5v7fvbrkkckcngjemah8h0n2xoyxdfels0uayqd1fjbhacfzd960ob328ulf7bxt0p1vxpaliuacay8dskkxp7asr80n4otpttcm8qyufhzpt24y84knhrhmcyaekmb9pzfmc42gklukk0keuz7lx796gn8ktbupx865s272ws5153zj8hxd21jtr1klnpx5g7qrobeg07lfdlyoucei54luar5jvb1wu7int7lddlwmp8d1f6ipdpw67n2l8iin517v3yz9pvmc6a9uul5p92qoossclud1nxpgbg2uf27cqq18j7rb7z5q701frngqnlk57ycmk4tqzrfmllzsrvzyhm6z0ashb4cvsecmpnctwnllfpz92zuobxug5kj9yekf5ilbp0gpz8e6m8pajqgfrr1zk6n49y672jbia6fymem5wnd7r2p1cgbfzixpww1ko2rfupq2wr9w5dp1eeehd561pehhqzv4ngdz1h8bu4kmv83s5ztcaai85exmuenwb7xxtqhlwm796h0u41p6jt2tcrndzzuqe6f9v2ewyvkpqyxova637tlo2t7f3gyd1n476s7ali1otjjwep7x5gp5kdskb6vucsiwhtuvhukwuv75x1togre30p8vtepso853jhs2tkcovfm18gda8diikt0b0h8gp9yb0meabvynjxn2drnzrk6z82id720faa68mrjh6cqtfqpcpoq74nyrvkdlbv61555rzeucu0hc6r7scjmp2oddie98tsehzgrngqt71txvch6rr0c32u75f0uzicsnu1ab27t78xghxx2svleqgj72gmfaf099y43lm8j290t1huv3thhdz9f5o30pgqiu1vgm1c93664e01zrk59m7vgfw',
                proxyHost: 'x5ovxwhbnbsuatgg6uw1hqqnemfswgq4swkus9rq5vrpka4at1jvxc0c2mmq',
                proxyPort: 9092586152,
                destination: 'n01wugy93krg3x6mh51v732zi2vzgp6ekmbt0d9hjx920vr2wn7gylm6gy0ilx0rmk8pzayzuhh2ql5lk176gom0tnn8kmvtj6a58h6r4v2kv21cf3dfbyk573nbjkirxhbp0l87xjqeoizsq3ao559v767tjp64',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g9h3ghau80uzrh7dh2hshyyldcgfrjm0zidt2gxk17xh6d6vopy1kx66ez884ydsf4znux7k0t9bga4twnqtw4oncl6dzoyi3taab02pxj1cluqolur86ncqgvisqr9zxlwo47ckazd5zx5at2fjvwtlwobx6g9d',
                responsibleUserAccountName: 'qc75tqz6n716rnjyzbsz',
                lastChangeUserAccount: 'b2rmwxx1yftcxpbsfbae',
                lastChangedAt: '2020-07-29 06:00:09',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'tmbiewcp6fw41t0y2xwi6clvqtkk3c16hvf8vcbp',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '2zzljzimszqrrx5inieo',
                party: '5nq9oov7f2a4x7pyrss9129l72kyri5ya9lndbdaj6b6yym2euee1zr2ex05zsvf45smems3z7zisqgfj8z2qwspcvn6io9d3y2bw7bya2f9ltealeu7n1p04330yg8klcxtvqmb7xa184kshv7sn9a4p8vhidxh',
                component: 'f6kr682rzy65wzc83zxx6lhjptyhos9g98y008q25p8pj3sqedkcpw0gsxucbyv9tfgsho1thi3opzvu5ul41l03wqmwyq2tst1xqv4xn4jtuzl9kby02xwhpge5pmuk5kiatega5yb4eksoruv4lrohr39a2xg1',
                name: 'xxgw59eyt3c01jghqgxjx3z01n2b1ppxbll263j095kh26sj41xmh3zpb6aru030lilddwu2f7oho9ame4ah2zq6044ses1ni6h3nf05s6lt1sm95f7i9ye26vxiuyw5fe516d4dsm6ixqgsecvyslfma0dos90u',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'j2x18m1x0qz6r6qqhwse6bpisvjf75ox5vavtny2pnqfauog6nfrbv4qm201dyv1jz59bfz6uvvcsrn1y8e5upu5eaevg5rs4f3edbyuojmhxlsmjafuo1ldsst3ox6wdcw2kj79x9ky0dipc0mxk3dj52q2abaz',
                flowComponent: 'q3epk1pluyilzgsrqfqg4u0ctrgzhe6inl6zn4hth5wvvaghyeakondeioq5xn1mnnb8op9i15nnvgql95t9lr6mcbrhgj9lx2qcclrsgweibgddgqi5cl9h2mp2t2wbwtnv3uv1bjwapgfn0z7o9rr5yba2gkb6',
                flowInterfaceName: 'urpssnnszgimvwtd1pes03u83iiirck3o06zkxvkb6jryb1xfat6b6oamw093zkqcxhie7jz95mgkyh3usdswds18c8kvbs7r99h1wxrn1c0c04muuqbf8c8gy1ujatjj8l4fe296vb4w13f37klaw03aj9eqgxy',
                flowInterfaceNamespace: 'oluvlli0o7zjd0tqpu2jhotqpka1wa4wyuinoabpsnpz5f8lalhrdcaeptxg8sdkj2f70xm62x35xfjrosq6ymo4dzn7iu1td5q65q0l45k6y8qpseqbrxna2hbdjh34p1qh2ajvqv49m70lj67yq6ovxvzsvm15',
                version: '7jan1497ew9byg4tzdyi',
                adapterType: 'pdgyy8x4b4vr6esilmmcfbngetjolgyrwluac2ai6tapr7hkucykxy3h12kp',
                direction: 'RECEIVER',
                transportProtocol: 'vn1r0vm1nt77baorusyra5k2r6emyol1nmyrt2w2d2y1dz2psnclhw8cehlz',
                messageProtocol: 'suwudi1u2sysrtn3xdgqbdqqmeoijhvsz2dgdifl5fyf5cix98nio3tyvyi8',
                adapterEngineName: 'nhusd2s47zxu3a00g3m3ahfpjif0la0sp53ypqv7qplot3c8s9o5ha39bzbcxvb41uryja2rloueh8fbt057ms2wjoygtwcbnhgewgrlc32ua61p4zxp5ppe6z7hvrm08590h5xnwlmxapbfiw5nrqgy7bk82348',
                url: 'la6h0ggilszzby1i73dbu7syu1pho07cq0c5qzfbag4tt5m7d5cpoibn6s3cojro93m1clltm5smlj5bzzvwlz1kkwi1yv4gw217zqtjbvgwgi3wkp12ynixfwtx79eevp8mpf2utvc9y8y6c0vlkiswk1ag0b52j6ahumvr0cyewj44vd0nty29hqo5owhqnzdj7lkq49r2efroxqv7w8g0i6ve0f7cqjy392su4zvm8hrkfmp77qtmq0abuqf8xso42f84exf9tms81ql8oquc7l79yg9jl3cbqceot2i90e9yrhrwtweglbeenq2l',
                username: '8s7c2zsowvr7iq1h5sd5vo7bkrjiiyl35kypuhzulj39f8vam93rgtvossgq',
                remoteHost: 'jht2qidw4vaaa3bcnuft6u644r12qwe8qwhbpoy4bh1cqyigaut73c5ke1vf79ekt455omxfk8v99mt0zeacce6lu4i17jdzctcxfqhygrea4qa6f3fc470kx4y2jbltge855bz4zzws9o86r5fie1a785lsm7lg',
                remotePort: 7851146921,
                directory: 'gtkxv229sir477xu74cn9ex249018vdbx561gtasxynuwmb11iz0lhida3s8cniu5pfzd22gu1qdm8dsl7glswx5uk2jj1q3g5ia64b2w95csvl6yt1t40x0yfp9bfdegllweb9ffsayiru89swqq6lr7afcg63nyo3ovf98rhri9mhftiorwi0onw09vx0dwykp1bcf9dv5zfjsp4chm1gfaivocyzzsgv8zugmjp48xh8l4fmvaxvg58n89eoe7fsamgjfv98t9x3h0c7nx8grwq5euofifk4rh9qoslzqoch3nfsuptux4u5a8qn3is96f594z0zoailz13gqwpzq11x4zix1rnz12xith2bwyqkk0hhlu0po990d8srhzs3ifs235fbfqgaq0xjkcnhok11j3kqsv2s2dc26pm8jmnyzknse0k4ei1otfcv8ap61nh2crau94y408trkdyep84xqxllnacsrinat3m6fld6fd0uqhkr0a5vcdxpxniyola2mwtv242wo04d08pkjw2jlfls7o849mf19kx8wvzraz7vpfsfnhtnsxxpxuuzyi337qfl0jmpunp6upj4hrvjqsj86htwom36rrh7mq18xjrce29i25hs2fw43m2uy8k027vc7vzypfvm21qt7vwbai0harea2fepa86astfsbw1dwwlzo9ywepyql0qottp55si67ejvf1ii7tnlfksde1d8b7iorpqi6ws3mxye64rebku27syhb8bp4dorbx8nf4eqc6preb32rpv1din9o0wnxsou70wehh61pj7toby7a8h6j1y6d44tnl8s9mwlhj5x7k8mejqkkeakvhs2bxq9c7qtlizy88vhfv58w250e3gvj5u7w5nril0xmdlb0lddj2ncdn5td8wesnrpxy8er4qweyg7xne8iyt35p1nxup4p5qh4ptq2o230ess2h2qn49r9z9dnif45wanpyyawudodalx1cqya0phg5grt99f7ye9x1ky5',
                fileSchema: 'tchlsihtljghb81wuayxpmwa7ptaqmsbvacgjsen0g12kwdtwz2tmjv26zzs3op06lwstyy6gxfbkr8s70pfgp1eyxgajpzag8jxxktu8k4hi1g9g7xscur8ajre3yufpocm2cntmof3zgkv192fcl5xsjsa22kuxe2qmo0r3kmkylhiuda1onc1gygitlc0i4vbskzx0svp8k0b6eki890njzl6905ktvi8yop0fedhvtnylhmmj0rcbmyy6yeu2tw30n06qdcw0xerxw98jl1yw9437pervul0rn7prffkx0775a3kl1sbwgtv4io08c6wer32li0mfcsv2zu56cvwjz9q8uecr9su2mzfdt0sg2scphnlmr2cumvs49df9s8c4fl8oa3qrp0drltsz22vtu3cwq4mvh3rtzx9ykgh1jfkxiedhj9nfnjkqu70ra17ltycqn4odv241uup3mgkhaox26dj97lfp2pt3nqdle859mwvi0sg5msheob22r5si5o8qqalcy37zjfnizt10r9zg3crskvyvrrks9z5izvnf2xrgki8ln0pvdq3387tkptuyg4igf40y2pwcddvof8zq1k88yjuxkedntl8wwnq0tqq1n6f7cho2yyttkk8hniwpva5df174tydxnrkgltnbf4td39w37cvcib2yr10kuy99zk50gssbj4fj6z45kqabenv5q1ov7g72qj8joypic8el0tdtw2gtrsibspn5wix19vijmh0jhd3tg1x5xhdg1ye7kd7ujbd40ot98jnj7kxbzqz378b1a25c9yy6w4f4l7q32lwpky3azhzwealvru7gmpktzbb76o6z8pc3xm78rzucduj5lydyla4ajpyqv73ljix87cugt2sper5fg5yq4rtcagqvsyfbitt4i8ndcvr7sa46e4z2ukvj86nhedhe25euntlhujx4eo8kvcsinwdzi3p1jm1otqqcrjq454h1513aav5xethdbugkbfozm3xip25',
                proxyHost: 'fow1igi8eatiqg8ngd2a8mh8fvbs7d6pfku0kqusxypwhrsv98dj5vhy2sa2',
                proxyPort: 8679916879,
                destination: 'wqxnm8l5pfagqraff19ces4hi5rcexdjr07sg8bqopvbuzr1tj33ez1ijec4phtn6ihkyj6o2zu9d522x5dfj66gy0v4bw0alaknme6vwdcbj5so2qnwyv4v9stustr4bccjz3gxtwl4p3uvd480uxnoy2njlv2z',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r4rvhowz6d0io7awwuzcesgtctiq7ckvgv4k8w4qeoovzk2vi3uloy6im4cvrqoat3i2zdx5yms2ug9deolr3hwjsraqtiebq9tqzz0ww4n9ph211jb1xax7x0efkoukdwjmn9vnk34i2fjgep6rge5934tq9iu0',
                responsibleUserAccountName: '901ijhpz1pkj1nlcoj7z',
                lastChangeUserAccount: 'lo6k91384d6oaf3xppsd',
                lastChangedAt: '2020-07-29 19:03:57',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '1xuacqq7zi0aypm6ktktjbngn3tdwuw7q3uh9xyp',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '6snvaihwft6do1o6comm8lxwzmubbja9xvjwlw9czpyqj6ifnf',
                systemId: null,
                systemName: 'lbx0vokvoo26nu9xe4uz',
                party: 'f28ieov0i471cs5mbzv7vqnwkozqdkk92k83g5xtk3dfwl9ufchake1jxmx215kjjcahj2sks9ay6dseh42c7ng8i8jwrfhjtvccg5tfsjfxq63ybth9l99girwes8e8watcgq25h3uhkagarhmhhwv9c4nqcavh',
                component: 'jurpiyq3rumuqnpl6g47bm2yalijlir4bnhwt84igfop242u3n5a6nqjj9zlmeawxfer0yxfasod1yvxzhmbu6fdv8yhyocew3v6vrynff1j3lom7i261ojl4jaiavg5om7vgbl0lk5r99vkrrbioyiujj7j7snv',
                name: '4bemtpr5z597mjkzoxh6ijqjp47v7jog1fxusntzv4hr8jbd3xt6zxekonyonuq54frbayer4bty6rntp6ns9mooadxqhyrizcymo2lz5rmpcb8vk2gpbiq77s1ihyqdzp2uqtopi6lm3gjomizglxkgpyy3vktx',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '29l1ok5ls1fuojuqlxy6lki6sz1s4w5xl0j5qr757jxl28x5qat47ipyhohe5bzogbkj5y8qrmzmy8qfo9s0tl4bwdb3bbsy1e7tqypj187ctcdibf0kh356oui4fl4ltndwt2iz1en8ora9b9133wxhb3jmhvqf',
                flowComponent: '49e1yhuqq2bcbeg08cweun815o0ch82wg5pfoevdabwwjo17xmmv5x9l4qy881yjoa06d5zsfxjnyqt0n51wge9om9iz8mhqq2qaljpjhnxn7o5kd769u3w46xmcop1g8d2e3xb88y3aet5wva86nmjgpjuf2578',
                flowInterfaceName: 'n1nlkpcg40ypdgmzndvf0ruxhzbn05crfvikbq68jm8wws1jbvyaqst5t1jiz4nib86nnoutrhc9iqnua1pt2d12xtcmq5ru9jf3b88o59ieke58mr976rt2crkp23jfs7vqixnjudeghwea4kjint3rk6hch71o',
                flowInterfaceNamespace: 'mvb581um8y4r27uyxnji6qgh9sh29tszypc6ucgfajuuzr37eixd52bfr0f7v017tuc2ps2w0cyy8kzvel5stievdl1dp49kidn3vu1sc2jm7z7haiaecyw4y0bo6oqfpfvgict2d4muzl123ojoq5ywc0kqutv9',
                version: 'emniggjwuvy5eh9b5i5g',
                adapterType: 'gp6lublw94kv31j516hdx60is10051rknivhyivp40pyhgg8nf9yrffk6mfs',
                direction: 'SENDER',
                transportProtocol: 'h2od19md444hhiymct3d5i3lenife8c6hlukhwnxdw352nipr95zhkw4gkne',
                messageProtocol: 'vr403n2zdblygj3u25y5rvpgd6hhcs5w88c45tnnxw59fg6dn59dncp6nevy',
                adapterEngineName: '6oo2qr5l6f58ikwobblf1qtktztbp7xzef2txs2st5gegluanryb1i9nbrlufvped1gt4wcchae8x2ntblh7sb8h9rqjbcyt68xut01ea17x3nysn2qjs489kdzg7hqedlsg7l8275aeqlm3dblkmmnxdupxqout',
                url: 'oibcdfg6b30vlpx86jncylqtep1p31rrfomjpf9k9m7olbkt9mxz9ld07yesdvuk6icqpck8r07x9v9w69j1y4o3pztg1k5hm04yfqzkixxftichzu4j9gfyak1v163smnc9ponbivj617docm1v1f8tnt24zzs42iozqynopjyuu3zfnp9xw97k7ensrzhcuaxs2pgq0zi9g7cae07nyq1hkrxzkrq7tyzs2urni4hvys2kl6qf564l7k92vlkjhja5qcbbv8vbtt278iz2hflbvex63c7my4ttmofzrdbnk1lj71avam1wahqhkpnw',
                username: '2mykibpyb9mbo0cut2lr8m9kso7ur4vxcbh0t9wjxf4zj3kijympkpppblqr',
                remoteHost: 'kekn1ker9q6lf8k5qzpz5li0evsjeua0z588u4mmz0nz94sfekk13ybawm3bg6y5qoeurbz8dwdmw0c11bhuxnvw6hie5sef0g7o9arkgqcdtigtkfb8r7aj9ojuobcpn6s6wn6ucxd84qqnz5o5b7z41ypfadt3',
                remotePort: 3119664958,
                directory: '149kgzl7fwkctyjfeue92qhs9zqjixb2yvirl7s5di7atq5lea27uzs5gx3ua6zmlkidg06bkrsdijh4dnj2ib8jxjefgdq0xnv8cq5rw8ynxobhaxpyfjdvbnknqhxoyulqwwuxlwfy8czbjwcs1tldsaga3gmze3u4skkq5zd17fihsmdrmzxt1kjomxqwli77cmeu0hpxtk2flxvyc6ppbn7ntmnzbn2pgjciec6wkjqqa8zn5nrbc6q57bfvhlbiaee9w41z3qo4vi5l2bk6z2gax53unu14w77ls7dbgvlipn2uo0hdj24jwa2cu0bpj268ln5z087d5i0x9uvehclqoltnjv5hkli9qjui5mgnze91enmrtnwkfstm5ruu9of511qsxnzjhysveoteqlh0c81gexbrjeh44g8hmx6w7e7itzkpgbjfwo2ubwlrlwwxfvlaxxyio68x6q1pac0wwcmc854nhjsn3znjhe9aaf12ttcuopdfrxu4sintmlfs3eyhx1t381p7phh1zy5tf7578dviyj202l8051c337if08dtv5r0x3c7azvpandl3ivvaxii3hmb2kbunajq97zg3f0af63imkf3pzy0u6hbpluqddh43g2s0kbv5uqww9qjmnfsv1fjw6g2orj1qd2ki6jua05tke4mpy0j0sp9xtbbp1ciriyr8t975g5zldpeqkrg1pmo3uxi0equq22o6kaa61noxemfu9x7bof8mhs4ts9z5aflyxjgnmn4xtlj69188et13d66vacezddybhyv1gyhpffwji1i1fnbotmc7mfzrdrc3g2vezp7jaimq4pqjothleujts858nesif0kwrkfwjnmlsnce7ykeqgicbyfi304kroumxz6ur4cxlmbgptfp4jl9denf7hrqduxwnq7w27jmw06n81se0u6tmn1r651s1boglqbt81isg5v1af3n10oyodjioatokeokhc1uwudbqtlv16x03xtqdmgz8j7',
                fileSchema: 'tkn3we0k4dpv2rh3mheojzg4kkhb9p166sdufp7isg4zo67574wa644h83sgiecw5j3vk4eg5cusm3xo92hdvnkdajvgw4n9krshh1vpyhwzcestu9fupmzjd2z5iy9nr7zm4xi1ote7tw0vybat26fjxsz2nm24n8myapy2nmzvlfzuw81grq2w2relkuhtpgyqktbtiprflrcgk224qraxmewl6dnbcaxy5xxh9cd87h97ba769fjrr09d3l1h0vu66tuum15l3gizce3z081jfp98ssck9go1sp4y57mnv59wguetcjooesz8srnt15lmqc67lvz0hlieqvk8yz8zglyqjgfl3czzyo11x54dtfyt9n2j51xcu4qbgdj8vxdwzuc9tzf778liglq5hog7xtyv5bsp8izvi55xpe2u3x0gc1sv1fer0xxeba11timamp3i4ot2ofc9qfp7im3j7tuv127bo25h1n6oz9otdr5rvqbkkcdai15mwsnxmojzbrezjdak7yhrbwyxqxaxon8v6vba6mlebifuv919mbltx2nukm5216mtzee2y1khpzyu3ycanwtv7a9pksdkmrihird8pj0ggtwxmpe1dplqqwj5lb2n3pfvvf21030nghjct4qp91ncsv3ay80dstpfbkv43g35f57x6npv2u34u54wp45vs5sz0eorpll87z9ywig13q67bf1sp9gzlvpgzivdkfv2934v98pk6l24uui1gpsm3759nw85bi60btia8cgxtjc6vwtsfzgwwot7cbahzkq5wpowfiync2c5egh5a0bva2ja4jwntcy5ya0a9tsby7y1trb0h6ziu0spfoci0e7aqyl06l8yro1bmr5jzhw6phi4d60p9v2n5oyq48vdmpov43jpdsb68v5r8cjmonaf65ajw1tq0i1180ynpw6qq677btcksd0nt00mbyl8elgq59fb1wqhx1zu4udiykn8fey5fu7r3hdqysyybes6emrpv3fo',
                proxyHost: '35vp6i1xihvdgij1zklgn4xkh3cryo5blkk8oinscg4iqcm0ow40s768t02r',
                proxyPort: 3414773106,
                destination: 'krzfmmj2ouidiitpjxxrsup2m7v2gski5yc1yo2a5ke5njift5u0ndw2a5rianueqpfgoawon0a8khgfxkq5fwi1olunpufo2x65jvobvzi71cyfqawmkm6e7suz5v6qk739n2dgh19qp1vo9a1k3mfbck67axhy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8by3ytn3xe2pbl6i7ckjmspp5o0eurvjb904jlgs2xum2105lq3x1fap9f1whzco5wc1nu3f6xf7k5myx0mz58pol6pwxoxgxboh4clvkwl4yliehwgotdvdjlu5jgyrxgf4ez0m3rgg3ajesj3wkge5ckb58spc',
                responsibleUserAccountName: '1q59nfdjd3kqma1bycft',
                lastChangeUserAccount: 'l5vwirew49e0tj9y7aw0',
                lastChangedAt: '2020-07-29 15:19:07',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'pdiw61duke7ytotu5l5usjavj867vufolnova5np',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'zlgxgokbkq8897z5bwwv2t2z03uto4s4qc1mfreykj2kv7oynm',
                
                systemName: 'nqpek3lcnedkoxsz7swc',
                party: '9w3vnrru8q09dkfsu8heo1jfql34c4ymx5ssqs6l5oo4ck2ja0rg8343pxids2sv15ljz6xkwcwc9a3604vfj06kfapllg3knp9bytx1s88k8vid7tzy1fy6sn965kv88pq0vic43emi5rif9niycmdsjx3236xc',
                component: '02zibxmura5w8i93t4wzk9zedyt7x4zz4a5i8a0f9uiiqi3buwa9pydkagwvp9r7e2y8zacbzutj471cn3h77f2q3rtp5bvvnc9bay33zbklkk3h7xr9bagpai7x4hbaatc74kjwz2cca7bfctyybc0wtbeu6s3u',
                name: 'wt84nlmb0oexv5a66paso9kl4t4s2ykp0iobmtfrfbvasnwebplh1ppq7nmrmf5yp40oviky5k2zh7blptn3ewzcmwyjais6gp12tcutsugcpbbaxwj4w24c0nh1hxl14kl357lieed9vn8f9kl0kohcobefqkh8',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'c2pncfromyww86pgya55k4h2e9z0w4h89iiyyvujbc58grjvc2lvuk7whdu0dt1alnsuhimyriw34gvs6kjdiuu0o6xsbk0n4gk8lq6n9c9boh4m6dbatrgc1jgx9zsplos7tccol1r1h318rsf41lz4mm82vn9b',
                flowComponent: 'ur3c27vtiiuyzbi0vy5ggqot9vumffcb6jap3yqncvw0sq4axpwlt56ywbqt215dhq39qpq0o7hd7fok66b91ff10j6gubhl1163ue98zaxl8zj1oz64danp7nyrbaf9tlo4u707gsn7atfz4k7e4f12tazf95sz',
                flowInterfaceName: 'xw4ji2on3lw5gt4odyogreon199eri0xy0qvz30r418bvjotii9kkiwjv3a30fd52ngjc3tn3ud3u0g12nuhdi1ljkan5854pv5yn1j18c91dejg9qv9caafwsu8oowz23bo6wmaphi0mfj1hkm5hnz7toj8jxtt',
                flowInterfaceNamespace: 'w1if98iph9mghv026x3huvk6nwj6hxohce9ptbp0xd6s5lv4d7asjkwii7c22p9dcbdlyqd5uorovm3hnwl8avdm3nor1ecx84vr3bpq62wfj6w963t84cf3kuit9dxmx58s601ogya2ejws6zt8o25vcexsxppz',
                version: 'dohsttkwjd4ihzmdnrn3',
                adapterType: '351wbhtn2knbjdi661ub42hh8qtpojcwae1mnaiax9quxv0iyo8uf7kiqw7f',
                direction: 'RECEIVER',
                transportProtocol: '7vj6hsam7hwkovglmavmo38b0zke0mi1novds15c8f5hsbytr2t4ncl8clf7',
                messageProtocol: 'b3ktu5sdidwoo3r4qjfhvqdiam4b0oijto1u42teeoodcncr93ak0aqlrs5v',
                adapterEngineName: 'c8axj57xqsjt0diq4ox1sj9g2lb4ans0vszh9hfgxtqifkjkxy4xrjcd9uu5k41k258a0rpd2m1qsxhhokgu45fczwyjfne9g7g6y7hjcgejfoidyec1rj7c2xf6ib1mr3d6e1ywe2fhz7j33npfkb9hi9vqlz15',
                url: 'eywsppjziq7ukuzyisrfpm781vlnsghpoqfmft7gzcc14p5uthn8lfyg6p3r53xvxk83hdst2f9vc1xiko8we3k8mzbrxq0x8omud2gmm7o5qteih9cirsn0ne7rw6poyaf3e96thpwfg1zfadrjtj0rl81mzx78kaqp4t8b548jioyx4fqa5zyep5ml6m0ac6fy60pli3k71iy3vfh5c6kt5deo7b6a1s0dhyjgsia2ofytmu7yensonyh01fblu18zum0jrvt2sscpp9v2e7za13yrthbjfkmrty35whrnwbfzzh38jhjxenwj09rh',
                username: 'xudvhtnzqcjiuvhb3bnipbov1yrrnyigk3aofpx9yx97ox13kqa1ct45p2ga',
                remoteHost: 'njs2sr1spemroyi0a446xu5mt3w3bgwgi0lux6qh8bwfldignuu32zjt34yr9ju1w6fx4ycrl226y01y0wdr3jjf2oilvn9yqidd395c0ti9p3tbq8thxgkmyxrv1lo0cufnfgk73xqs4989k13ci4tnb3yqpafd',
                remotePort: 5223651473,
                directory: 'q58i2vk2d543jyg4zkvy61s7mmecfwqdz6ukfzrq30f02ygfzjepngfbtnc4r7kcb9hiz06a710c2f42cdr9reda95beq6cuv2p8x973suys57jwjv0u2vfh2srpnbw31xb16wo9ee8d70bco3ei2n5zgbshlwfh45bqve496983ly08b86aud06yfaz4u9vvsi0t9s0wceek66obewl5iobznsikjvxjn07ljk329mqiw9tdt9mwc4lbe26ubxc82gbl1el9mgw98dd5jsgmxntlyf57ic5eaf8ewr1g8ahreohch1o25gxghkarr5p25k8shgot55fj0qvcavxgs1vuw834jc7lbvodh064eblzm92d2sscc829550g0089yz8lkeafp693fblwda0j2au3fe33mw6ctjk5tyu1yyjgg04jwhq7nwpiqe9ktbr92j8tlpri3q54jncyuwvbd2m4snknog15ikgr7652rfy4ihqq1hec27qv6etntksabgmqrzz947o7fpazn27um740bheesxmrsktn1bb58kuk5a4sxn9mretj0mqe5vqtyo3vpnpr9xcuvbbcnogv998rc8gxe9sg76fsyb1pdz3gri4p1gumhuo9deyzq9vokjpj43j02btrpvfsac6bd7y08vu8ma68a4jk36o3zejx4opjhnfguhgbv8rr1kemdzsagh9l9p3rxf7mhsarky03dl19gu4d3rr41ep5yh9gt3xw75bythulufusx1d9kzxnbro6ac9oi1kxukhac0y4vwefwk0j2034uufgeaf1rbo83mqzrmhqu113dypk7c1209oqz2lq2iqv6myoyprc4fakfs8r2d34nm8oovjsiv7fnzhloqfkjyio25j04jui1tg6q9e8kxb2yjst5czkmtcp788hkg7om1hwhikrxdd1t5r4f2qch3uivhog16440qzudkq7jy501cijmdclmmuh6znrkzatxiasnrq05uydozlj3dykos3of96',
                fileSchema: 'bf66nsqj1zrwuyw8i3yys4umvrnk1h1tb7bmnvbv04og644ln60cjg94hefipupuvao7qxrso8qa0bneb6z2o12gqxjy0cqd0k90nmhnlowhha3chrpm0dctjjggg06ccpzllhodbnqyrt7ge6ph6wi1xu48w7er0c6s56yrojmjt425h3dtsuf5xt7x55ngrf65zwcdlmfjqi7kxx7ptzn9nwe7prkgit60csro0a1hh0ctiuffxbyc2ouoyaw2j0h1pybhysoj1b3jv9z9ve3q994c6hs86j9d9k10w0k0lqfph0qpfw2zmfxfxpdi5vg7k0j0iw95blcunuyl2k9jl5f4tfqz3cg20zat31s6p3gngo9fh6o9aziwn19hqjkacrn84bek1mx6k2mqp290tackqhg7lsn7samsp3e9js1eanai9mqcaff7fa67yfw50wxbmx6pk38os5nspef5xqx69fxrgo5ibendn4n05i0npkzs34ybo0wj40k2eokfirkwg28f5qyjlzlx4bfsg2k5qkiez7hk8zhinpn8lz251piico4ekaqtnp2lx29jnok727og47l5l66ehlv2to0hhi1nmgrnno5y1dnvxcxwj9c3etg52q60kuelel9qarkqf3ktfa7p8d7hkwaf2un8htufzlih4rompa6tm2ijokxzx0lmczhjx35bdmgwoizx8l9gj87rg1ullwmwz5zentiiht725xpid70tbuxwx97lxmwae4jefz4arp2tdoaz51jv98det6lnmtz0qcpoqduyrfvs1rjdmocmzpqoubk6zsnspr2ph7jaefxrmjkkw51jcwqs6ctvoae41zprb13twuitk0hkrplxz8bjxarev28ehicstn3us7ukyv8dpsbz9m5o4b9aa8s1nrxb83ed9szms0c7b7dlfhhx3od5sznnr9hnejdy9k84jfe58zuae834jzlgw2e3p3rsplz337t4p1er6pp39bwd4p52ap18xrxzjtg4',
                proxyHost: 'ailhll3tezljkj1i0olrszcaxtvi4rtd3i1817ai6vkz6oir0yca3qgqt590',
                proxyPort: 5202695885,
                destination: 'xkammcymapqtieulv2c9t51y2yk2hv8hnp1e0d0scdivj8rnjujj4tosmd4lnqbnev66aiydqyeweghg38mqqcd8u4fu25yxusfq9danshtt8ic9ovv7cz8b5hjho96x2tuodatb2gy8c6xxkup2ik46ud9a6k1f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'or0wfmjyrjy93h2w1czc77x09sgwcsakek422bysa7jdlpopagho14t7lnoskooa62tant087w6gojv6ryotx25d2kun7fr5391munqbd4w4uu23nk3uuqbqtgxu39ogknwfep3j8osxs4629ibix1et70udfq5s',
                responsibleUserAccountName: '3k0r7y2ldtq7ft3wmvjc',
                lastChangeUserAccount: '64f0fehe1s7ovxzws5fs',
                lastChangedAt: '2020-07-30 00:57:54',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '7lzl2k7840fwyxkqxiv61rnu6twwpqz1h8za92yr',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '54442gaf7z3yvxyfharjonadnzz7nfdnsdtez6lh7nlkl58e8o',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: null,
                party: 'nccfx1wn9ut7wx5vqnpdsf4v2utrcb0st8dsua2kqs8z3tcj0gjcokptj68nl1o7evxr1hpoc20vu4hqgsemkrebojw1fe8o99gmt9cswcf3nf0olf50wddn242d0n9dwkm9wsdh4gyia1uakc31810ryvra9irn',
                component: '8d6dq29ogmqndivejkmtrh2swo8tcrxnvp9phmh8h4u9ifzd3d5gufdvvf19bc4vzvrfx65g4mw36hemph7kvbnp2mgjuso55o1ew44obtalu7qexuvmsi7wqpf38h5btf4eo6jec5v2qeuu2qs7b2i4e8smfqiv',
                name: 'j2di1wfujqzgvttn4spc9ak2pl01i0cvpy00rttginj98yz8c4hswayxm7vcpemsinjguimkuokl5do7exmtcubnov6sge3jmdc9hyr2g8s6cnajn7mjclogcj3z16071m4i5klrifi7mzxqj3cl41d1aqat209p',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'c47zlbb9867sgw7zmx94pcpprgetm0n9z5h8m7dvl5jvapdzhgztdm2e494caan0wowiyde8uefc06ahf19zfmisgcawhnea4w3a00bnqgkgt8i8m08oijx4vip9inz7x9ozxo3h1oo3plsrl59qrr7tkrkte4c2',
                flowComponent: 'zwrscs6lmrclm5qym1v66vfxnt1lzvrheu6w49rpojnlt719sylaralmzw06o9wt2uav2vb2a920t2h7ysnfp60nxvt24sp6o2c79j2lk8yix75v7cd1g1hgo3pfiv08pj91sdjqzayji6o7vg82b71h5nb56n7m',
                flowInterfaceName: 'ms0n2gr6sevn9la7m05qtel8pi73afdl6j9iv3k97nklqvftqe57dveismitm9x1qfi7r6u1i17b5uyu6jncnyuj2mdavrxumf9xb4d8deofk78anxm6suedlwb9u7bp6prl0hvsmrhiq4b00cllz65od6t1b96o',
                flowInterfaceNamespace: 't6yq5h4cm1r7des3e0miqz1zv91qx2rycj6h93abzyrs9sydqc11jt1oeiax3683mpcr1w8pgxfvawfu9zhi6isxowllrrfjhxuxginb2ysz8m3nfdxucsj0m8yivnzz0bi6cv4t7z3e8khsv02s8gvohtv1c5gl',
                version: 'jzs7cyvca7cay3vb0dm2',
                adapterType: 'kmon5pxfcql5uv9bbkymrtbh5cdq7o4594p6wbu2ydsfgi8yhxb8mhzl29ap',
                direction: 'SENDER',
                transportProtocol: 'hwi9w8628045xq3jqdh9vqasmx3ep5qmvhud7ny799z1jxd9habalx073p54',
                messageProtocol: '0mo9hcjhot5onviwl5gyloan0xblboy0pueocv05ajsgrnv2t0pgo1jh1kh7',
                adapterEngineName: 'u4e09b3pn9cahj9l75k5kw8b9esz08stco3yq4vevuc1jrxnxqaowy5p263zcbvokqwct6e4vu9syftn5dj2o8e4tjakpfgibysesyd6ymm3uiozq9tthmvpau83uryz8brzza8lnpczjaz5s9r9itpdnf976ecs',
                url: 'ptso1jmrjh6x85llp879q1b42v7ap5yaycq891w188e91ic39y4kksfafmfdifwn4taflk5b5d5lk5ydief16zq2l4ippvq2v7x659x3onrqc7m8nlr3543aoj14iwaemrjac9aliokujqyclafh8el65lz1baslth60emmh20xj81lm8tfjhn1dlf03d4kgpmtoa3nvvknmki8jcxcpepnm339cgbd722ax6kvlvr4qfrnh3d1oionrf3me4frse9eovgkut3zrk7wfua0ov32yjbgyry6yzibs21wvwxg8t0h2p5w10w0c22b7bh6q',
                username: '3im9735c9nruoxvnccwmwut0e5uotc7or63z1sfgc7bgv77m8vw5yh4bokea',
                remoteHost: 'gxa3i8as8ylea4s3o7yq14mafy81atrvn2t6pipcs0jcr2sm2olo3040203mop5cmiv7e5vtn5xaullg0ag0ymnejz4mps2ktbsx3srxf8aj3blm0d4nka1ji7p0hiftasoi1pns1voq35szmdzq39sgnrk2gadr',
                remotePort: 5728330816,
                directory: '0e1o36y137no0zsl7gwe9cux7cimqaszwlu0m5exc1hn3b283fmc7rbovekdr1p4trf4rkg4smcu3pm0o3tfmomq10igrfibifljz65t5azt0ura783jlsyffwz9porjs1f34pm3x03xebmkd23s6kuay204y37mr7pwm6fb26tssiorrndk689ewrkf9uel66i0w2m4ait4m5i1450q1nbjf7iru44meqojf3axduhrj301z2fgpy4hqpocjb12su13604upf4tlrq7yz2af71mj0m4k5tdlywdkezsb229i9t963gzxwkztcn0yl9ty1lddo0no405njyecwyv9uvrt12p5hx5vf15qvd6ofduwt0h0z0x3qunxgfdw9440mnzrmskl815hhw4jmsdvi1og3xxfxv1io4xa7zsh9yuzpfe08utq1mccb32ng31zipxe3lcpneazylpu1hcbkdid24anlw0d7bn9ex736jtylo26i467lof1uvhfgd1bvdq4blcsa0xk662a0etvsnnyzs4hz7w525yr3jjamwqsb962lw4hssu6ngxgwdgxo7iudcl0ny81mrigaincyqatqv3o3ywb6bdaq73ozvx2vjxii41wn6gzat6dhp01gtzcew6iy3jh9j7mk14vn0z65ywt83sjjkney17b49e3gr6s89z9kd00ahhn38rbfbpf576euvxoprya3j9ciobpsvntnk4urrexy4pejwndjrfs5adjy785i0acolrqtdw163c9dzk09520c9lq8d98bnlopfnp1lf5ptbyclf5bg6wklppa02vnqktj6padrqatqcn9bc1xlogtf5x4b9detvorvlw6q6mezrty0wwlyuiguyvjs2z8om3w20wylwcdn5sz3u8fnel0y0j7tonyspqfz4cj5w1qtzg1pdqfvmp02r4pvlonbiqug0bp34zzeiuxc1bjutl2sufxbu0x6i2xa34iwa57kvzha2lfepewp25lvms8nu6b98',
                fileSchema: 'im9w3hejqyeh96vmfnvkeqaue46w85ovwd09qj59chro5tb33f9snxs4uihvtp6w99eq7yy646d5pbosr2i2mwhxrmzukxmqil8vxahm7mbizad2wkdins8o5bi9wndqnextf77ofaxuqz1tc9l8p17n8i2fm3ef1oolvu8c5bdr6ulntgdkmpifvbsdl16j6go1hxarztjkgyf2xoiemszxuk83wjtd818wtrzuw60ax1qnjjqnln9a5shi81bmv2k4z4a025zvck0qv8d9ze8nmpfrhanq7qvarfmd9ln3zxmibgeuodm908e5ygxglpuks89ss994z5g754nb83v2i2vcu0d8a8do7bceeihkj1oo7x4mr715b7xy90z60i67pru0xnmowkkdl5btwsbbb7hmlxuqneq22bu1y0nfn9opnzo8w1td3gi0ktcc6o76tw33kh30xhlvib4bfbnfi5wri5zzidaxhv31z5milfzmtsnfpv0bss3puhgb3xfycex8f9ohgsm5pgpg55exscc10xqe8cpmq8uuzbcpw2z0ui8wyb7po4arzlrz17uqp6uf7c97798xenlzajxx4l7x7rhzs6md1agi59feqz20fre8xg493umfyc2vr85ijiubyk4i5r4bxxuflrl5shnn6ivfjp9pplisvgcndp96gav4l1ge42eqvbg7dw2k8znlxrwe9qe525ltyxloeiv5szu4katj5puggll6qq5jno6acldnfda6lpspyrlh43365bccsm6yru3svd6gk0ajozk92iy6fanu7e60f99j15vqcrd8sivftf8liwocbdfwgpszauaq3tv3vk28ennxhzrzm4nqn7ap0owscbssgfsyk9p8vqypdgkaq33qpjg37sc3dkfz3x0dgnmasdv00kk3itbdqp37u521w3stf61veawsot1sylgcjdqz6amwltujvzjbtm4u2ibfdrshwonu8fldecse9lihff6ks77lzqe8ameciv25',
                proxyHost: 'rcul4yd6jmk67zrb0qph9w6nvj9stv6ixmhid27qrhvrvbzj8yffwv4i0i6q',
                proxyPort: 2752730919,
                destination: 'n9x97abw23nyq59in46f5kbzpz8kjve7d324xio4u23go0b90nm9jyrfpef882uyi6upea3ibm4kvyzvlluhgmw8yx0kvaeg4y52cvxr4caa65jptapg7qpx847sxb2zhgzbawjokuzv34xtwouys86hwyx27cnv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'a9upbempmz7nh63pfokwy03qg18zx2ys54677hcq2vn5y0xqc47zstzpekxe3tx43uzdmygz9sgjpbynbdxi1vgjk7xm90nry38y5jzgxom4tyvyqula43wrl4m56tz0sj7ulpvbkw0bxrztb4t0cswgof8jx1rt',
                responsibleUserAccountName: 'qlvjkb0erb3vqfnamu1o',
                lastChangeUserAccount: '4fftycmftt9tm0j40pvj',
                lastChangedAt: '2020-07-29 20:39:19',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'yreamyo12rxcnwn0ymcd26h95rdvpi1khivdki4l',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'h51wyy00ltgt97oqmd7s3c6q1f1oqae549hu8fmq65opv2qf5f',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                
                party: '3b0cej5xtvca7hxkaqipjgojshw2jfashtk3t4k9iauu5ko2yknu0fcxrbww2d9lexuzwigtmax7t5q5wzeuwrjndi4suu68h47n2haf9nzk55vxnzt4lrcp0qlrmddj3uxulpn1jnj1wxef9fr44hw3ll3bbre2',
                component: 'fh0a0dq0qcpj1hnh823vpchwaotu8jf21uc3055h4wt81vps32bcxvybt2v5eu8b16qtflfjnf671kubqtb8mthkzlbj9ilbaq1pog5xrg0a09omq6gaxjr7gxxgt61o7ougutvihxgr3q89azii2pjnyow1wklq',
                name: 'awm7p2z3gnfw5crop38v3ln5mj0zgm60moao4aviwe9sjvwsl03rujeff0ye880kujzpllny2fjb6wgsgz32u28ocot8myi1afvlgga1p1bgv5of57yp2z4jhz9xaul0opxezowwv4kgv2uqes430fcjur0jmg2p',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'bdnkgzplgtyz8v9yvob9mbqjodhycmixos4u3u6gl55x0proi9xcspdlhcontzjl20bd5m1u62gl5dmjka3fzq869tacwkzz4maqd5ukhc400dznwwyanepn04nd3i1ft7doq4tx3j5lx0qzwydyrn99dtn2dtyi',
                flowComponent: '42eu5q39gmya6ezh6inulhw8f5mg7c9r9pj29hhgvc5070h00wawqjjqe8p719yjtz9l2hcv6hrsh5mp0dc44b2wpjzlrsa7nvrldpakzlymbtuzhxep8ssjqr0q32w6z4vjacfjua2zrkwkbaarvlu8u9x98pkm',
                flowInterfaceName: 'hk1qyogc0hq1du2s3ioaz7e398732hg6oqaxqbzmyvevdh30fu446seidbv6td6ovihuzty6w04hxqm7tsa0xc4wsx3rkbeo6y3g4vy7h756mel8hwe8rjrb3qqp5d59hrjporgknhzqz8p8r826fgogy86u5he7',
                flowInterfaceNamespace: 'dbxm1qqlwhyz35n9tc7jgkm3o4csaronhz3cx2bc3oj5tf4g5llwpufdup2v1xdvv5jvzezgrn3aq81h9h26map3sdg1pxc87rc3vosso4f4dojigwgygtki3qzirxjscppi5nxcnw02wm9rmq20fgxt5p20ye7y',
                version: '2y705p5jr41che8srz7v',
                adapterType: '9zyzcm9889poonh4r68d9jhkneas4yqo81p16yifuum3751ue27bkaa68aji',
                direction: 'SENDER',
                transportProtocol: 'w648nnc292n9tvux7qkx4m82zmxjvfjaggdx02yh9ifb5o6h6jdja4d2qs0f',
                messageProtocol: '4nf5df7rztkeas4a52ukeec4cjke25rk46y74b6on016mrql19iqjc3j3hg8',
                adapterEngineName: 'sc4nwfth4x0cez07sg6yq95is4l3pyn8iip9r0g9pfk73o3mrj7si0e3xavu5acedbb3e67atmd8v5o8wcaseb7096fvsbhgkqzrfxpnrmczdys3k3wleyprydsksuo85ypyhhnqzk2s6uxd77y9g7hqqqw923z2',
                url: 'ni38mfg8jz2dujbuencohfkqc51ftu5wi2k2mn2fogpmkyub2pwtpu478r7nrrmdtorwmbqee95awz635tu5wky2ma22medf07xecmdzjzbkqo29yhjloc6zwph15zv4kyr5odgtapvcd9kjdlaxjtj4527nm1l6kky61lm91pq80r0wj7x8bcv822gvktp7000bjq8ryy4gnxjpzmcgygehve5wrjt6wtwlpqev3yw1hyoww61b3lse15gmupqlji1532vuys02pz41nd6ftsnx6oz70gtdpuwad5a81lo3wh8ab3hg5zdw6r4ec57f',
                username: 'k4haskqtlzu7ygtjfi9zfk4zop8cv1rr9lh5ksachp8s5iw761m9fccdelki',
                remoteHost: 'zga94wgmw2okzizwszz2t5qsxm6lhshgxq4d3z5vbd1k2b38rmzszn0v7ixm76ak8mwn47jfm2ls6akvce1u50sd7kr4o2thl5pymggum35wzojklzagqjvpxebg8xt4fkeu0jl4c5vlvsw89gmmtnyqpulfcucx',
                remotePort: 9248430543,
                directory: '7px5pdwgm0xu6kq37lsdytzw8xzze5hlqyt7kyhnvdobpi37bqrgchr786s378cl0aqx7p9jwgx7orgn3a78iy15athp01saj5qt32b5b53wnddmg9k1uvxpxb1lcnbgbg4h6v3iza931iajlffszfuwwxkc7svnzh2fjohcn14jz81ujm4owr4nhupsjou7997nfngjuqfln4k7is9j4ubqf2qax6vwu1q410uey8ubu3dk9m606j9s0khb3qdjjg9qkgw1yxn67e0uqeplknxdek33dkj05v2q6duq6n9gvva1zqbyhavv49kxdduzbqsep8zaqjhlggfg6sjjfbqwvs52dx0ptl14dbwvb8fj8564p6pk51m6rpuui75vuh5e4ntffs9bymhpwhninqd3wi0rfijxwne229klty5zw78haen62woulxep0egrkcrrq8m96kw7n53qu21208m5k8om99gb05zz5i7sd4dhkw47mjtsog1mev9li3sfmc9njuiq0i4trl2rv55wbzz0ydax8wlsqg06d03xl0mpgardvk80byejcjuhgzpx7cibjzkzv2crz2ci001g6l7n6zxw3e6bvamah3pnxo4gke87eti1qiiyhhll23mdd6kviymz07mgctkfaks4tcl1ht3uvrdl3wa0eq0qix5p8yd8rpdmfuyopqn4s30yc1gv7wnzckf8h95z3nti8avh4m2bzbf5zlh1lkvf6z9oj1r7j08dhpyjbugkqb7yolj3xgxzxxz01n313ltyb3nwdptkc8lodm55r1p54h8keaa6tk0xkiu2p1koq636q190sggy4qs7k4dgbyhni75e755yx87deynh4bqzjq2e1827zxgfzn4r3ahjufykhuzg18ret6l0ne3ezenxchip0lucjm7b7psl0lgjbjdw789e6421kohsaqktusk1o0dod2j4z7v6ba8g0kc992fac1ffbsbt51hklcp2ofbgtj98db3at85f4yw80hpg',
                fileSchema: '0p22p6n1p76y3ks1p9gf64786nwllfybzhw8eo9knnygf1rv50e0m8z8yqq6l3fjv5osqatalj6fnlc1kmzi382nxhpi4tjxmqounonk0ke6dtm12292i7lzssnkuwsme0tknza8zmy82awl7kfdr9drplxej9pfrddu61av8uk4kn7a0c4sii40ylgh9nxwyc7wfg0rnq8zss1a7yhidmfzvcdtipa7r6k2qpmdcynl6ztrygbaiy6onuzrmiguaya5m7s5nahce9p6j1a9x8eoufg3tzf7d0twt9ue4ovyrbnf0ouaid05szfgolodgeskjm6zkb19vngrgzd90c4hedxwmqmsrcm4om6j5tgx6be7zb06pefnxpox6444jsf7q0mz4ma2fp4yo1gd7orbgpgjo86g80t5qbquiby79v53uz8m2m1nfl0xhy988dsecbbl0w3v8fztzewqtbq4wnd4fl96kxmxhtpyp6qygzd3dj1z2pqwxfi4scqvzaoqfylmrr3ju1g6nznxh351mzj99x46bsph9j46107hppov7pzb7llythdzn6vrvn7k6pwjfktby1hb2g0ckpt1nhs94hbd67dvc3pc4vvf5hlsx9n82qcsvqpvpts7wiy6amu4yyj8l37hw4r2aml96k54w1ajy0z1jxvawytqls4j88ddoel4m92eucogd7sz3koby7oz74r7v95ovvm5hgxdyaiufq1q92il0woc3mdbwjrvg8d7ovtl4307skydxat2a6xe0sj62jobe23nwh77yujdky8s5jgem1c45reo8hezqyv3p1p8xmz40844es0j2afr0ylv5hz9f45raadbpcjxgj5sopepeh7v48yolw1pl1wwr2w2zp1n3yek6ffdj2ffa6uo40zz3cokc7wdqvmvf8lbvsynbwwkntorhshpef0fh1yeudbjvgfv3v8503nkxa8gnwbdbmde9ldiobmnil51hwf3af775pve1nmhywsq0xl17vjk',
                proxyHost: 't3mi1w8ygom8qlzt741vjsoldxadpem1o73acwi3iblnkgdxrywiqj6qvivt',
                proxyPort: 2141015167,
                destination: '8nx4w6afh5qrk0hmq4nojxgjzf8y4je0cl3qk3sa5mroefzxity6jybbhodw09qzaav9hzkt3h9bz1c7ibvxlid6j4rwmaxn1j7lkich5svl7y83qj280qg2hf60b848m84rd2q9debpfm8z20ny75a5oyjsmla0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pz4jrvqgicl231t0i5mezryu09iprt3n0ivzq8319gup4m818oll7vefhrx5ieg1nb5bkwfmnsl87hh4wrc8xl5ddk1wdbicfz7qccabqs0b7kpo8l2p0gajd3bw7u4trlppoqgkvt5ficwpk79wwcw01dgtan51',
                responsibleUserAccountName: 'odupxaipxnucj49kupnc',
                lastChangeUserAccount: 'jaovjxpo35xb5ncfdr9r',
                lastChangedAt: '2020-07-29 13:23:07',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '5f1sugpd921q0enyb3ni0rt3d5174wb7ub8500s4',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'vmfiaocst0dcx5bjbl0hqqg4mo3r0yhqob1l43vii5mamkp9xb',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '2v6yhknihwsbcsnwvcl5',
                party: 'bk74o2qnrcd0ru37d62hij1yokffz3fbsr9emu9l56uk0b70di6sby60zh1or6c7jik7n5qk5yur25e1hpb5bfx4uv4kxxp280yb2ebk6l79dcits52ctmpjidg5a1teosn1uqxw8a3v2kph9w5kf5tgkcwbjwk8',
                component: null,
                name: '5t2dpnnlpfqpvk8ti9kbvpextztsg87586na3f67ijeua1dsr064a9d7fkxe4tpshuxticfrbf9fw30jizlk38v7lmnj3wf2aaz1i59gedhj4r15bps7jcwuu7yp0o3sphekq2j9jifnwiclia6g8i2xk0cqe85b',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'k2ihx0yb5n92k2i2cwv7gyejj3tbppwqpw1pumjdk91oqdc58pfwoijn2vndnzlcpjlkcuqfa7ixw2fmdx32ujhs5zg3i7l7dh20j0siir7155bo2ta73tyor60uj4fcdlegljoop3k2uuzblwmy3qvvomdmal8w',
                flowComponent: '3e695zlahaieo2z9pnd76sff4pwtlbv2d7ztflisj40nbn0o3gi3igs7kia69uxbp8yfgl2u8f2n1wb053f3qtoyeehfk864qdzzf3lcl1x45hwkr2vsrw3rs4e123rxlm69lcztoacsrqqesfkr2rph2cjdrf4x',
                flowInterfaceName: 'm1w6brnied9oydzbbdm3bw3pk8l2fkuuemghzn61r20k5uiyjp6n5h9wvov5xbi5d3ws9ukawe1ulbuhnxulwarg3yzgggky756jw7xi20khib7z2cnoi1f6upe58f10mc8p9fzdv6qrk07vn3bi42o0jg7spxco',
                flowInterfaceNamespace: 'qlx2d6ihwcenj8yq8p0xgzhqo7giymx6l16b9c5vquwz5sbvnk5wqm463du1z8xky4xndkhz8e9nwegdoahhmwbgbzs7mp3ddtzzqdu2l48n81b4oe1prf413rjftu99bzybzhhoakh488npsrpkiik17mit1kph',
                version: 'lu3prj11frduxo4i6fu6',
                adapterType: 'al4zxmfmr7m1aexflqu3prfnkfkh0k9s763w7i8jqdfazm2in5rbsif1rzi1',
                direction: 'SENDER',
                transportProtocol: 'vf62q08vvtpamkvnhth3yvy073pf2lof2qkqr7eybuoplzyd4na1sazhlwr1',
                messageProtocol: 'u7k155nd0s3i1axk99jgwzeukxheldgiy909xd5gs30qvlwxfioopvabw122',
                adapterEngineName: 'eqxghmn92e94y1zax8g3b94k1a6ex8rq84lu6lwliq3mlo0s0xa0p04pa2huvbkpcaj03cpj71vbax08x1q76kxctabl8mlj4b7pj6bt6y2nrke636ospc8zzr6thyzp81tjw08f9dqaimunarl5qb22jmjeypk2',
                url: '5j2061roqnf1uhmodnh1d05o51z90pt3fgx7mdgb1hhh421q5d9aj81sfy8qvh2xq37s20ed4hu7ubrotcr6aiydu4m3kwq4w8giw3tjk3pi3y6w2b6gh4ijm5yfvngf290m0jnl8qogcga8j6spykut0p54k591s13gzn1taweof2ylr4jwkbv1p4o3l5e822wpggbf60eofuz8ytcq7dol2ib6focwwq04frbv7zgv68uf78hyvovp9a6hgucka44wcueic28xid2m3zjgr18dw6mdp4b4xpg29y230c2fpo39b0hca0htn5b8b8un',
                username: '2j4gtksgbs9dnsl9edvbihoyjbepkwqeyk1afwba5jtso747kot0e2dfigiv',
                remoteHost: 'ywork5fmnjaf63hemtjocm6w4soewkqucgr72r6e6lwoi5ai78g5nd0t87u6dxkuwubw32gsztq353tdlbiw7wrzdjjhzhi81d6fz2qio4pppp07nf5u1kob823gkdrumggcl9ovbqwhgdm4b4w96p6xb35z0bln',
                remotePort: 5145320411,
                directory: 'vbezf5xbbnkoi7p8unruzilv9x78h23j6k7ho7aruy161a4ygkks024gahkvvfxquq68x7iyhjhqjnjo37iggr309v3romqbmwbpv1og09dysqg0z0yd4rkl46pz4575g14y41bf141mfi51j3z1lbhmtrpzngm6py0rqtydjdtaagdrazl8id7vfd3w5lxxl2uevohc89hzbth7gruepo1bmazur12p0qvrmaioe01bea9h0k5u3zur3a8zte9qa3z7ccpe0a1n1cx676sgjjxvfyja28lmdtkw4tbglz7y1pjx5x00va4pzne8b7cy3w5pxh57rqg2e7hsp606o4msld3i75xxs7kucqvvc8iolp2gsa8ko1guoes1a3nj13x8klum6m2ukdhdqq46msgot8agyifxu5wztvoh9q651dq8oijya3vm6qj2jgglb4tnbu6r3ch4vek9ffy4sgb386tval8bikr5sh1t0yjidb08aryj730nrggut7vxdc3ahrsvetiin5iuyc0uuw8zh0zsyolnbvtkxym4gk6rv0vyfypb8tbmka12bq1q77v84apkgxtry5kj65t7pxajoea21l7wro6qcs9mxrgfjraiw4mdcyse37kkvk3g7npwxw2kp4584q1h2et7riyrp6ihik2f4fmq5enfeit7ub3urnp1bgqb583u3cw3lbocnvi3qmd61ilfbxnxsq0jertpsc8f11bh9wd27w4zwo52x4o9npccuajgjvbhi72km6a2itynnie4pf8xg1gdte1yup60lcmixcd14u3ybm50uqt64uphgf6rcc4r3g53yphwb86rvqhuo3jvev77j8mdnr8qukbyu06e0hppqknbp354waxmyh4zqlwnewefktqobiyeqadp1guilx6w3ieqx3f8dbsfdk34cj3ugfch3z9a3z8j0vkxhu42v3csk801q02pttzsckpujnzzsyyysabhwznpvw7f0q2ogt4oineanez9xzogj5g3',
                fileSchema: '04p38rp2c8ewy4uyls131egtcvk7vsnknme48dgcmnae3ay9m2y97dm3s8g8doie02cqiyux5lrcunujw9md1x6yomjt8pofzlgh20as34e7z30gud00r1o6affmo8zmkly71931kke8sh4nweqh4h08azy2e525gkhlsx5m61ti8664b6mf2ukj2ev03mh3g3ohr4wjvuz63knhb8ab8oknl7e1vbvp7ft98pdo9uditxscsllb94xk4i8cubwev0f9ymn8etd1k3kpro4eafdy4pwi518djs6sws254kk698ssrstfecyz3fq61cdll8rcg3q1swwlicd8hg6alogvt2gtniqup4oal9aq0l1ivm0jc0sd361o26e9pgbt2gy97tkowkzo67xua2xnp61rnemnd6msg7qhyfv58bnv4oljjk257soorh4tbaze037mjw27x70zpw1rk76s45xotmtwirtjp02c3er55prigqn9z0ez0dunb4kf7ydcp7ojoua0ijw5r2a0kph37y52ocvv0csooe0cf270erx7g8leywopryu24aluos8kijnmyz9pqhtr614oj6uk4465k5g3owua12p4768hqgw75587pbs2959gb1f2pkucke6v2u8vb6179eseqne4kpqdhe3vcaa4d6gnoldt3a81ualbnciw4jgl6i421ivclaky7kd79sh7dtgugcrfoh7t9q5ah5xr6ycumbj4xuzu0ivedrlwajmktzf1k4nd82mfar23x69rf50yg5er9378pb4v5mt9xzogbwgz6as1tgfc650hnmcq8wc72kh6f682civ8recjax1ckxft7nm8oiitqfxxhnvn5dyqtbo9wezbdcl5fqry6t6qatjc0a00drfkcw50vhmee00te0ew7vdpv0lde53a8oltjqjod4bvyjn665ggmht04jz7mzsyb69q5ipumh1k6633zi0k2sh1o1ybjmv70nltqvfj0yfj80pf03s3yp0cge6c',
                proxyHost: '54esqujfgo9aiaixe7sqdkb332urmalwkjbx6vowgrd131idmh9xjt8zy4b1',
                proxyPort: 3835624911,
                destination: 'gdcillxgvy3lgi4jvm8ctcbehbw6auakjfx54t6dg9e8s1zp61m29zlkgn7nag4rlbfctzzmfr2o0t728a6fe6xauu9bz1a9xhmvb4armtzlt3lufespgwr29ba4z6vvv2jsbdj4enyso9ip2qq384m3q88jlx9u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fwu40iqrshjkne3oqknxglshjgonn5h98pwzauaki7kojfxayfizdg0afn87cy07pgjgdxo8j3ia2ugaijm76r38jl2r2f10ib0qrl7ebuspai35dk4ml4pay8ipkd15o4vbx8e6ih31lpm7s8xmkwh48e9u4hpg',
                responsibleUserAccountName: 'ud44x92pu38dwxxk8fdd',
                lastChangeUserAccount: '0thvp2zixru4gkizin8v',
                lastChangedAt: '2020-07-29 12:02:49',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'nityb4au5wk5d0qstvp1pgpkyn65m9ufxu2jnsm4',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2qk57pk3v11sfs0w20w0nhwxzbet3pmjyu51fpm8k4b0s9o16u',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'm6i72gaayusudrlwsgb2',
                party: 't5zqkg09fpdcrxfxkfascjy3zb522yj9irvr0lams7irsqlzp3fv6bjrebwj1xwu1cbw5kzvq28jcztggo6o0sh98n8jcq8tbw76ao8ry5h3oh3gotbsfowfesr8mh1legiem40sd15h95gvgb7oc831ddreivxx',
                
                name: '261hb1iriftfuzezfxa2dizp31mm18l7n84ce91ifxd3qf6dfb5guluh6cwfqiz5hhjk9zfxpwjb25ghlyl6xu6yw7jni84mk1oz0kytfzxxfhcwytgl2yqi13gkn158fuptu19y5f0c51yhfrngd59met4pq6cg',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'g1a74vp4tg6rfaj2h24bneikxz68uzhkkoq6or26fa32ik68bf1i2q9sqvn372alorf1xd4ruqaqr8bibacz3d33gieg764tk05kfqkkm6m999a5gkyovaj1em4lkmpgwjzxqlri0iyo56vlprbz4442uea3khrn',
                flowComponent: '5zwjo8lxjqat64coi12wyfbl7dgivbzrz3tejjfih170eql3qet8cgixugptxrykfcfzaydz7oh08lxhjek8bi51tew1cwt545mp7ivn9w4a97ubm4kqqc95erupqcn3vzzfzi3dnw1cgtfbnx641sz3wpoeohqy',
                flowInterfaceName: 'bysxuoigv3yvf3aol6rrt6686voobhyfzffbh1hukpv9j4szrplzxnevfazpgbtzbjhczs5mcex7yq8xxafxx1i6ts8ibujuwjbyjvg9xi6mgzcb9cdh8uuqmwdj92moqox2lk5iouqqlb6px1wwdx64kos524pe',
                flowInterfaceNamespace: 'bn5f9di7nnz2m7k1zsgzrggghput3r3oupvuacixgsrh2z87l80ljj6pzhfe7bldr7l1oz2ecf2ckcsxsavvwez083w1lx267eaeftv9vsn4yk2emxzeg8nu8ldzcw1khiyutafjpn71yansid4jxjte1gzk14nn',
                version: 'zepak24xymz6rjjqw4pv',
                adapterType: '14dt52ldp9o60nflqf6m670klxmuhs3b380w8udii7pbn3hgsvjo2cmzpw4n',
                direction: 'RECEIVER',
                transportProtocol: 'ik088raemevmmeqizqtw7oopjwqbqn18yig3o3sfl22p1uz1hj7o3mqylaoq',
                messageProtocol: '1p7sq7ab577kf85coqxvw1brduj6emb4u5m7b8y7en1832ikay8oyk0q83l5',
                adapterEngineName: 'atdqvi8kibud3qs6bfbm0u3h33tqophaasn2saae0it6jjhk95h9r6aiwhmw7s6z0fj25rl3ey59h8ex0zl1mykyboiepl69ut1w9h0luy5hrdye8owj31hwjmt3ouoboeuba3gsl2wpeqcswfy6lsho2rkkfet0',
                url: 'powcuudv7jrdfreoyg7ssbbrlifikjn71zxky13ft5le601kq366yf2ujshoozptl5ccvu1kwgi2dsib1avtkc1i0wol9sug56vhlcamimdpk1qu26muad25zebvniu26qxfm09buz2r4ourpqz1rjecu8ldbuqlnlqx3c4e8q6t15pchg8zoz4ullvpyh8wwe25e2a850gz2gvzp494eo81z8z9c3a8cvw6irbk9simkvx26s69g2lqd0sa2bpd6s9mrfwkz1dpu63rxs51q0yt23g0h9oe200jnslxtm1a359v09944ak7unobqcgj',
                username: 'rkp8tkcvyyrdf585pibccmeeey1fwkqbvxx1eoruayb75dl99tt2xzhhpe7j',
                remoteHost: 'xl0x84zx2gwi4dzno9waakrcrac1u12naqkbaaczjgdirzld9bgr0r6orxzw8mpwt378492wvps5urg859o5njnvtgblnn6qgmvdo3zpnull81lzip6lo7yy7rh7e0e30vjkc7tofql2m8fslikjodpbj7779z6e',
                remotePort: 3051233030,
                directory: '6ty34k4ua47vn661wbyh1jl826hjnyfbatiw6vje4y5lxuvmv1bc10oixlbxvts5mrym2kseajezb4bxuxgntjtir0ndscf7r5f1wj6zk657w3caqdl5spreunk25zrsh8tbifwg11tezl7csmlo1u5za1qj83t7qq9rwbfjbq3u1dj0hcpskl6x34iuo8u9vs78468om79icg6nqhzi9nlo9417jr3kxg1s7vddce10avdehuo4efgu6akrhzkcwyjyf21l9xrpqehe6mj723xfuh23teikrb1l3go4k4hjb13ka0ezw501ilioyftfr8jg5fqky83oyqw5zgixrfjryha7zwipifopnhir8djvpo7usz9t0o99ovpuo19vxrngjl3plc5imfoalpl5t3rw2shd99n55bup7zo55uaq9dllxm5aoxkktngq58xazpw33zjalx04qokz1dntouqtlb30h9l344fg40l4rghnnqsed7aes7gpx85vm71g0ge8qssbgjlhp2u71kaqtqgwpc0oaota4ivhysrdtp9fqc3sytt81eo3p9xygyptuu8ie8y4411h8u3ndai49n9jw83vqowwtddycpmdvvj9s770js02731orh0wn527igm9jt2axajd7m5glhfm4ufyxrc83w6rtm8pq1gckd85ul12waj4w4hc5x788ywj6djgvwwsjje64xuz13yyv5lsllqcjbq707isq4x87of2l94y2yqg45ok6o42tott9p4hwu7r4gokx0lc0x7lmjca2hixvpf2c1e6bn60aw9aigj8yfckzggdvpywfnq6c8sma2ox33mmxmaxwibuofmziimhy2w12f8hrecwkbkj0mvrb4gp4kgtakolyu2x72lzh4d5xaqme480l0flv12d6pkkd7a39mo4de5gcwb0ja93pxhoimxnt6c2sgg1x1zrapl8p2bjf2qnamxky49f3jusabmvevdwp9xy4p7dkcpmwgv0axxlr6zwpaz3',
                fileSchema: 'j97x8d3nznqq1fuzul5sfoc2056ogf67l4tzrd70doxdnlc7isyi5otxyest6egdfipcmbkjrff9t86vva4zdgqhgt8vnjohmkyqsdk2hhxski71qrik1w3kghep5ihyw6go2hvh02qxgxs00aqhrg2l6c2yjejefkqhnnhw2853qd4f40m80gvtunwx2qc3ue79t00vusalt7qclunn1qhyqh3c4i0baob6yal2lkshmit5qgkgkr35pd9ss3rhdxfw8mq5itnb4k5ue854o2uavz77j4fmhse67amavdkj5apetuxr4f1h18731tu5nqj6yhat0czdlyw6w6hfulylah4dyiffosasgkqb6vm3f146en0bps5udlim8lkmwv8umnbn0p1asjnvbl22iz6mny5jb4uetzm9t78z8we8373th0t8fcr4z74ki9odxyz6jec6so8puh2nydavvuq8kanyr22z1b5azhe77id108ya1tkndwdkufuntdm9yj2m2gwtzzfvbg4eewjexx61pohqywb2b0zia9nu941ya16rrzor4mehtu0asi983mij1yypln09v4fwiqwokmeenhfdecatxyyu3s8b9m4b01zch4htb5p5k23hrpemhqcbl2amg4wlsfr2i2eu8uuidn8ozagcdfl2yfcaoidwdsgtnvftsduvx2mhdkk617p6dihpztrt8oo710dvmjoh7fgtboyqxm0vxsvq99fbsjyt5ag42tzbwhdgnmzby8nuogaxtcipx8lcz1y9rmlnberyfqva51r6kkncvnfp62fq8cz1q9zris6ybplz8j6l66rz0i5u96pl5zo3bj5qgm48wb6jlrdhjytj0loehzscmakgvv71nddinm2omf0ny2w41bqir8rhd8fej02x7wgz135lehnj6au3n9dagxr9g2yw9wxh95oeymcxw34lky0xmpczlkk2ra281rdlgx7s0xwqdp7kumrvluyykyvzx7bn08k3u1d5i1zn',
                proxyHost: 'uxwbulibmsmk41k8sxnh2t8859zzg112cpeizmc84my4rotw1ceaqlr7ad4c',
                proxyPort: 5431316169,
                destination: '9qprem58i7l9gvkukj9uq1h501aiy313tubfcd03e36ahlagshi87z46y9k4c6vd9hlq8kc8nmb8qxe2dfs128j3pkb5fh86t5fxc2r7ikb02sbgsylrbbd0i2yq354kh8ctad81eg4m97p3l5eymqsf73zxbl61',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oe9qlzcnhb6ov613om470fk4ucbqmtbzmrcg8huayfoxonyjmwviovl30ifsivfsubzqjdygxzikbhmru564gzsya6wr4wzfyryslvovhkdvdsrqln0k7hmgpgptahe1tilf2tbuz00e8wi7wttmafyajr704m7o',
                responsibleUserAccountName: 'gw6vdqsr7pbi7xt7xq54',
                lastChangeUserAccount: 'cs1gdpe6h5tlfdcityw8',
                lastChangedAt: '2020-07-29 08:36:43',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'eb6awan9xfmej4pqs1wcfeiaxbi5xdnvuet813u7',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'div7my767ecvccuxk9y2y4yruiuzczed538k9wg5g7hxxh17hr',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '71mrrm4e0j18ryrfbisc',
                party: 'yvf2spratmw59nujevdiydnmshqize7fa17z1j0p8ppr5nbh7w55wv494augloruev0nrkil2u6vkx5i338snnjuvh5kqkictw6vxku7vep8pwp5u50x2jvkvbgop2p4iwjn6qnnje79joow1b8aevvi9m3h8tat',
                component: '12f69dm8htzne9scsabdfmwv8ehc10agbv4fcbxvkauvi5yhsw327tvnw21r44oky2egw39pik1gawrkrk0kinryc8yj801nvkrrfqoc5hjs4272kf187sgfz0vls564doo44hiar8pa2v6bb1i4pgb7l57h561t',
                name: null,
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '54atb88p9l17hoezpy71htovwu8eiiatpp98x3z1r7erw3v65txhs1ioua3k92o9ztb4bjh5m86k3nrnc9wjod16zrucxcfcj06oold2jmzhvj51skzc3jr8c04zudzyufya3k1rzx5ajpq3d8nn77czlboiudqm',
                flowComponent: '0wlo51m7oagiz3osmx7holzh0ixql7x2dn7fi9718d51b4b9znv80on8abg9obnuv6gt7vounmovjvt87uwihv954kreabv2fffzqhuehe3vn3t9gxmrbfwozjsq9vnp6n80uk9t7r51hkifa0esho70gj5vpxcz',
                flowInterfaceName: 'nmi5g5jcsw0t4z2yiwmvg8gby10bfly06nrbs3g03nmtbnwopwviowwn54uamixhaz8jpvxvpapo208efq3wi6rz96829zsm6lfc8g77uwnjyeyybdsaeytg2gn2iqe4rjwck7h9nr8ne2we4k1u1cas7xyb5i4q',
                flowInterfaceNamespace: 'ij1twaathpoz0gs1ml8j8ewbfcn17d83sgvt7rpyn3qw92hh1p8yiv442vgo27kaiwwiijowjr22w5hrpin3gczazoxvkhklvjh942r08msu89cbe4h4ipxobc6hukixj8grf519acspqadcpaf44ovo5p8bcc3j',
                version: 'ep5oawakm8f3ctpi1rm4',
                adapterType: 'ettx53ez7bt60l3dybj6xo3lx729fisekz6bjbzveuhpp7q19a7mylce47wj',
                direction: 'SENDER',
                transportProtocol: 'ulb5igimbk5apdt7ig8vz0zogzpr51wvduzvi77gk0xx6fiqauu5c7dc8whm',
                messageProtocol: 'k9yu9k9ly4ro1waht3qkt27njfat7xq94rnjy8s2mae7frzw4xitl6bwv9ob',
                adapterEngineName: '7b7ior6gnq35pxx43yfftuv78kuun61josf51vfm75izjqzgb32a3ujlsaoy5z4e8py4gtk1zhsssilyguvchg65o07euc0awi8tdjiayl7ztwk1x0rbfnc3z24vshmfyztsv8cm3oymqe9uuummfzq34afsxkhs',
                url: 'ynfwg2gholi7w0ssui66a66n1yi0y1fm6nrfrcmhbxh177cix8iu205otd83pcer4v4zzi24462ifwxdr442j13np0hvbq6hma03r5fsn8shbc63ngeu8h8p7s6p454p8djnyqqne00dwuxl87oqm9egxp5is25eiislrkq8m5ahtdhp94trct4dysv6m1ud579ewwx32c9buejesvt4n8x6y6qmp2hn130tf6grcc47or4cyyo2nslrc4tuawtojsczhyahy1b1chbj4lo5pxfmojmdlh6bmgcmjteh0jwuktsfcudjzjwftvod1129',
                username: 'tas8lx21npqbqib53pbpz7z5bfk4szfzerrp5eqfrrvulqjl6ih0ufwu7fsl',
                remoteHost: '8zjjogi8km4hf5a57a1ht57s3ff7j1en6k70xlcvnv0zh4yq5zaius5172m3d2agz954wpsku6b4yf1cob6pm8iz0j187jd77w0p7jblxhl2lww2xk9ykxi48n7xzetoeoh0huav9kq38zq2eko8us9ngkze51fv',
                remotePort: 3535913295,
                directory: 'yljwp9om6ss0qvizpegn5e1zui33oyx1iogl5y4iy01oga8cofhky8jhu7wquir1lk3wv1189j77mkcr0je98tipio65it19af9l46xq8tcirfe77y6671vomn7hj0a0d2qcou0au5lz9d8ckd8jo5mmibyba1523u3ldevfqes0ceg8xgjmatyacvm6sputyq963kv9ko2v0vdbki34l78osztouzhzwvo19afh98pbhyb4xqziqussog1vowqrj51q85efc0yhaoxfi9uzpadu4ozaw9s19nju8rw7tayutmumdgbwglhzmypmolg83mmudqr0u292vbk83ghmy9k7k5d4gjutmkzbgta8idxzeqj35vbyglgpni7ndzrpqeijrd9nb9w33ghmbsyeufrt2jbk12kzf0khgx20t646da354jrnq7bdnlgt8s5ne1qrxfihj9imb4itfs7ouqpb2htgyocieervwuyunh6h4lztrgvcgo0updqj5w07g0oi2f9zu9rd05vyho0bj83wqulgujhf1vh1g1rdmlq46clyototntcthh5r77xie1mbnfz433qbfubj6pocor180rd3565yao20nnyl7buht96q1brly7dtivwvtaf23zaqyycwtweg0wwwi4klumyc5w6wsakahwyvb5soucwav77c9xqk1ncvgtwhop9qk8y6fstnm2puz3p3bru7pct836aurdxjob89lnlkmlqrwlgy44ree0kracnq3g2hqbi3z7nflnfxjig3sf0ucxvpbsywm8d9c8kmcrne3fw2mqf0z9sb3ulvrpefuajf7fhun24u0a78z0d0o7gaa5vjeil0igqboatm02i086pljxc9p4klm5nwunzo8derfixrdv3uu0wgwr74c4bgymy50yyf0xysnri0x8iz2gdj9447kfveewd4rxk1qwqrd83oarpe44x8n8vvfve6oof6hbf5cxqiuwnc245h51cbw9blkxr3t8c2ebsag3fw',
                fileSchema: 'orio2ka7hy13wom8vxnog4rk223z1zwv7r9km2cykz6nreakgqdjjhjnb0c5yykuvymn8vdi0caqdxfqkgmtjxxrcqjpnye8r39roczecklgttzoohr3ltj38c9v62ia94jfoa051u8uy4tppftfwnpcpie2oyjodbxck1pcua47gsei1fxsl2zzyl2mvnmy32fiyg3t0pxrjcapqxq6t3kmzcs59fqb67kabnbmkkmx8hfi8k3iotmnu3xfv6fhv7cbw9oq25arqdvymse9zt6kie7vy058xobb7wr9fqsoxq97g6mnsm0q9re1bhge1f2yehpc9rg3jduz9y83lg2vkbyh6cmucvqmzirr1lfwxrnp8o2r6pk7xd4qg1wmhvvvte0xapls2lngw05tsw4oz0rxox2rr2x9z5tw4dn3ks6nez5l8y1qmsuniiaow6rcmwbj4rll0o8rglm7nch2n01p43m7nokbi6za2t4i68omkhubq1kauvmq4bxyc36k6lnnpeaf7m3t8imy1ki3e6vvg49hja6g6b6or2og6uul9mw1dvcqvkwp6icffsdnp8b2qpt2qc3ryulfb7ewf43v3x349zdq0cuo08jc608w5ps1j1zz0o4uujxminu0m102gf3uf3o71gf9pslo9f6tezqrrmet2nelgfdg8qjj9qj14jcjh1h9smcqg491gkaqrwe64tv470el9sb9yavo9jl89iketv9krumz6mcr5mg0ghkzx8yfu0yw12ozg6l44wiy6ecmp2kvknj9rnijmqq9kgudxa8rhuiizl99hqjvna1x08v2v5idk9r6t9rzmz6dl5pb46vciii6lex5fshyf0k0gmhn6bqbkwq2tlxc1awck2499rmc06puyo85e1z8rhur6h0rer7knm4d7qx7vguqc9yaw933j1bbwnn4g0fbl62c0oeewhsnad8mkn461le5bspwxh6dm21nukxne4fmb1r0fir1g05ed8sbvd3z8v11hi2c',
                proxyHost: 'ygqmr2ithd0ydvsnw82m384897kkq7nqvbsuyzll9qr9iuwuijttod0vowgi',
                proxyPort: 3237744358,
                destination: '1r7nm5rz1oc6noa5q4kl6zj3ridrmpgpawsoxnqids8d2sgotclewig0fbb8upz6099lo3651gm467fwp1xmkmi4hcx58vv88j41vtprec9cfwyi89m842lczpucy41gy5ueockn2t4l5t38p91w2neilmbdetct',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bmbbhkpeyc1xg4wtrmgvs4w6aycvombjqf7rz1b38jufwq1jy32lq93fwtu1ipllz7zvy2k80pp5gq3152xxm5u1uwwl9hnd0pb1l8qoayyh5j5y0c2jcdbjkubi6ph0m9g451sp5mybsmdeczeugaf3i52z47v9',
                responsibleUserAccountName: 'c025l9x601msuatmn7ku',
                lastChangeUserAccount: 'nqi323px7440mubjphxy',
                lastChangedAt: '2020-07-29 03:54:29',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'yfda0q5qoynz5r2a3y2obvj87mj5aq5haunmgpvi',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'jtqgbu4h9d0wee2f1eheu7159tgqo6ijhixsf3b47scnikt9q8',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'g50aui1pekec969dcgca',
                party: 'dcw6af54dxxbq2rr9lqvwrm08zfauta6ywnyd0bzst77uhkdsql590wftsb57sr7zc38ft4cbf7a7x5y8uf7yoia7j9fmxj4xzhdhy0fk5eq52lz2qwu1jnl52aiwct8pixvoi0d5f2khii6jy3zirvp69mubj37',
                component: '3kyflbz8y6f7jje90f7l5e9j8wkam4cqnsiqkivpr4gn39rdmxukgwj6mehl18jh5etu7j0lcwzqgcoglh1q205hlo8tv6oydqv8flzzrc8rudsdl89n23k9t1u6prgnd9kiz5ypzwknlw4mcq3lb63iwtpl5gef',
                
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'xt033ljs5uqwpslnmfcmquga0j4pd637p4kk083tpi4f123tg76oitzcwi4lb684zkmhil7asoridr68xc5d3pxax3kbpn6wozbunbd6a351w8qmm25bftrezn2gkzugbiiviakq2c4lu7oni2oqszh4hmuntgy9',
                flowComponent: '8mmo70kl4vhqee7yr7knq66a5rk99rcjxf0vjug3rlmwz17g2w8q0etu2uep0qrx7jnhklplxgiq8sb7f63rrr7bjudnbl5btjxszwpge76hneawpjm8pt9s8bp8iu36bfhotquhj4kes5uqyte4s1nbnts8g5jv',
                flowInterfaceName: 'db7bzljqd8hxskgob0kl6g63zkd3hra8atk9bpcf6qvh57inl9ht9iy4bh574da7g09ofdt4m7skot5ne3au125ezuubaldyd6tag81gatvafoio75pv5ozi4s2h3msdyqyiak8dcy5pxxw3g5luqf6jewl1p741',
                flowInterfaceNamespace: 'xkzsn4elz3bnkgrx9b142m8g5dojf768vajx7gxqps3q6igj0jm63glysyiir7v68fuk5649qqvl0w4xt6nvuljyf242wzihhau7wu7q8rnbf7pam8g5ekd0low6d4lqs3macz1l12gn3d2a2tma5p3hpctrkl9x',
                version: 'mkux6a5rg1ivsial3os5',
                adapterType: '81lu4xckqo7qnglf9m529rd5bbjyjo6uxyl6bgttxztm0mxdm35iuyqfd3ju',
                direction: 'RECEIVER',
                transportProtocol: 'o9dx338yvn75tp4vv84apmfdnwgrirbs6k2qhwo0u87f3iymakqddsxtoc0k',
                messageProtocol: '66uonq49ykfvm3jo9fc7nzi8463nk2fo0olgbtmqn0gs5rvtycza0rnwkbfc',
                adapterEngineName: '1ri1x4wl9qlhdnojtsi6hffs0woxs1vcdj3h719cazdq1j7qpf4yurnxycs9g5lw1qtrkct0hp2d0o5hx97ovjh72apsf9j0nzwe1d9e5x2vqdqrku1wza90awubathzk48ss3vbey718qxr6nx83qjacn43bpo4',
                url: 'wefu3hqbygfklkac2rdqxwh735ptr74eovnksfktnn7zc5e5locn3sr8kff6d0wvubk6qlrh6suu5fqjgqczjkl16rvuu0gdwao3bc8q62cimxb0ajmgwzdo9jkoi4mxr3mrg27adlkmeeehcbfzmlmbrmkhm2ijtu8o5g8rx8ae5z65vdwisna5cyrqvi202yq6bx2kiv7k1vopo5xwwu8lhn2781qa725nmnsvi2nwot7auf6e6p020j4y5ugx5pwz0yuwl4i0f1b1yizcgtirieu8yf4mdndkbx3if0fftipi373zgel3smscrwwk',
                username: 'o4r7fn7yxgkri4uxn5pk2ciw3ioe1ipgwviqxw82kveaz5ot5upc598hy33z',
                remoteHost: '5pkoo0wi5h6102f1i74cardmpbyzecyinfnqldgbrods9l1ss1q5w0sd1c61mcuu594nvh9yfa8d9nnjdcylcrmgdpxs4tfftr61gdrylc74janrseuhknc9nqgt2pscyaxsy3qcaukw7z0f40f013a7h8vv9tca',
                remotePort: 4790726120,
                directory: '7crv97vmbdkglksu7318ux1yntr5i8hx6m2mvahp8tfxja12rso7jwag484b9yokzxx0seo7vrxafyhcsujxv8k5ua0uluhyd4vps2l500adfj2hiv5ebgeqkiuub0k018fji4apawvl7fz24jomuhz5m4j4e4ttg6tt9urfjdctqffau8ynd5wmyxbqxut72poatl5lrik1sc2f55m0fvplf15ulqtdvmji0cdzawa9h8hj3jo6yjap5j1gxphtu4cx7l9moiiian8jw5h646gcovlfc324qan8frabdtxgjpn31bltr0ifnxvbwhszqv0wq4h8fhoaq2k3bn0dslhtx7xg2gu5vv3bwd67zwk09dqxa4ipnqc5h369w7w96ttc8k8wn7npcti1zilv2b7u6qnwqjzc6uxjqqyllfusuzrdt6zsi8sgs2tbyfrf9t05laiybai3tjcqf4vconhocs7tjxxmz5b42ohi69g8ghw94mjub3jfzzmre9gy2dwrjw0dklryyg98gbcazdbsrb93bmuhi62p0vodkaxypiyx5063z5x7xmn6iswtmtdshpz4tqcw6athszupflw6x6blu909xc7r88jahwaerwlijgmuuvf5gc5fd4vpllw777vytdoa7wouu2kiuhra7kdrff9dnt8l6fllhinam6zgia3z9x9ej1nhgg6257je06vir6zcaiw08vip9po0d6iztgmejg22yd2i4pr92o49qgpbalf8uw4u2adazk6kv5jnedszph5kp3oii1uvt0z26txymlbypakfeft9v4gwrnfscupsnxx8ey07ag3jy9g6r4tgzt7fd6p3ifdohjjdb20qfpezlpvfbijja74an7ncz3c25w4gcb5jjdy8j39lqu3eqttiys9299wz342q5nbbdmifpcj2ov4fobdagzquymknsgb83o8r30otf2f0l63tfw7yet3svtrtns1taz16h29q35in743zs2xn9gkilxq928cvsh3k',
                fileSchema: 'h7nv223mjjdrbkjvtips2dg99cq90z4ocxev3muglh5ydnzn988om9dkt11qchy4adw5gi5cbtdawxc51wn11bp7t6mlt16ntfpahw5keg1279szpvwedhbjh7ai1jbujwedqrthjj5o9xmy8wyo7mg4saejpkhfolrxxxvj2zyaiwbqogquq05xfi40s6ugwm1xk8pguursvkgwmjzwdsigsuiwky10z3xkohqidtr0exs60kfdkxvs7mrsrqn5vglko25fblbdskv3wa46m6ryvfugnrrqb1oe873f5rxqzj0gd7pq2348vtkszuhd7o2gu6icip0q7dyysim5m20bcid5b4lw7nkv3chcntbdc3a0uxotwqqeqziu9ugpub47qqkqeu81mf3yuttmlla1kqpwzojbw7ur8i4t7x2jws42gcvginpzq0jtqcmzsv9ss69q55mujvnxude91smuhgcaavju6qdc7h7ex11xi6x5jdk7h4dn3zbwcd63hb0hjgj55i0rgucxqhzp76oywvmiv5nyituekfzwz46201oyl24w0ku0hikxe2g799qkw6jsx1h80sme4428nva364i6ajdi6ocnuoh25z9arwxe6cfuvhrry8kma744tvuuq3ztxwhfpiraa3xq2m1zd6an6euj1z1affdtaprfqjjzdu9ops99qje1n889mcq7espewwcuqkrptzv0yvgmwttcasfqqsze2qvj7v1kbw1sthhhsk7ls7w76toxz192sh6jr78rc40pw5xcx0t02ts0zkp84abaf573ylh4139qr04g21q7nks62cobr04tgd44cd5qfydttf8pkbr9uqfygkn4qerukvcy0n24v87f0cs07ngawgkgojj4x4fyp6z1770mmgrl7epmfwm4zoc3cubiv2nwiwxiahoys9wnerdpp5iy83x715z2x14r2c8ew9lla2e979axz1lijdoat4g6j1rxbhqd8hw0f6mrklycyj8kj3cvhp1y',
                proxyHost: 'zyekz1cosrbk0w85hcot9htmaap4yf5a4j2c13i3jf76ui21fok39i8zx3ig',
                proxyPort: 3815244529,
                destination: 'dtrjzfsi5g6d0pc6kh74gpl4ocfrv1uml6lzngdugj13fn7gu11p43ijy2yut4kxvg8za6fnj7ik65em3e2nfvmt849tf207vykooot46vqb8a54pkvpoog7kegs3ogdwhk7gd7xzmxwfqqsw2twf1jfcu25u0ib',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'atra2rxib2yjb5a9mal6qkim6p5e6mmqknm6a2jyg9g70fpho8gnip8ly6puamvwf30ojo5of7jueidi9fkig7pjx77v2j25e8rba36ntmhoydasng1h811s0evm0clm351absp1dpagxer5xgqywqzg0ix3xecv',
                responsibleUserAccountName: 'n3zfb8181vz4r5yjnozv',
                lastChangeUserAccount: '00spx4v1krn3b4q3vn4x',
                lastChangedAt: '2020-07-29 07:47:01',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'ofuafh9h4qmu7rybbr5oq2g5tgh3kj4rpkg1bphq',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'gi114dk1cfxumytruseb03ghaywyxkpnyluc690wx968dwl5qo',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '251qzz5q3wfp2hxhmao4',
                party: '3tyqutzaxvkwqz4ic2fvk0cmagd9121n8pvzq6c51at5ruehvi0r1sstku6qpc5g3z317fgpa7tl0zupv9pzziu7eo9fihcmcz0w0fzw26imv8a4491s11ishff5alkb3zivf3r0knux97nvgth8rupd5w7tpwfv',
                component: 'h9rql66blsaxltle2rjzhaokuwkgrjloj5fxf1wfeq3jqh7ubbkbi59lcfrw40fozvp8m80qzqy5voe4xo1yjuksb07cwgx88ly0agdn9yf8x05b7xez22iunj4w6xsmaz16484fifsjz56wll2p82zk1i9a3v2y',
                name: 'uhpgiffnhdodfhiolmxqnoll5weeg4fcsdj6i275uu7xmqxhmllsw6gc7luqwm86svn2a2tvwo38k85siv5fh8y0i2eyxd39fotvbk1dg272mr4e93hh1y4dgihqghj1hr79e1618dpnri2icgcsfjofu0r9kr4c',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: null,
                flowComponent: 'z7e95n6vflr6lwoash9i6wgjhcjgn9qihqs57bhdvv1khfp7fmjahrlqiev77jnadx8ae3bedrg6sfk5ojx47a352kc60klbsk4o4spnny85vbr5wj49c4fr5dt4bo6egk8k6jot1jxipevv1z7jvkbyqed6kjfk',
                flowInterfaceName: 's9798rvtjmv8taqdkb5wx5ws99b3sax5ix378brordq8e911s9f76nzgmk2ks7bdwxeqzvn1o6y0jfetm3dyt30ef5k0sjbhlvshl4pokn4ylltxc4628ayfcvmolb02mxupkejj80ilxaymuqyiyq85fwlb8z7x',
                flowInterfaceNamespace: '04g9vd7tlfkz7msu15kjvqg3zf278xz9tvy18550mc6gocerz4712bqzyfj30678u0a2kvt2bs7orrkzpeiikhmqi22dfea09evdl45kcbg6m2eo1hvvwzzd9zkg6f8djdj40m88yux3v6u0xy4u5pqnpbyem19m',
                version: '6qna06excoqtwi0ea3i9',
                adapterType: '3n6g46yzvh4fywu4znvbbj36pzlggntstqwr6rcu9enkf39dyjz6tswnnro8',
                direction: 'RECEIVER',
                transportProtocol: 'aohvauu6lvu5cpjl0eb4jufu3qofmhjy90zrkih1ftv24vw28wkm6caifats',
                messageProtocol: 'g1kp2orkqpopmcuzbf4rfnbmyc5k7mln7wklc5f0pjlwwxs56qv8fu53z282',
                adapterEngineName: '38woss2hppvc36rapfhzj917ie2qgsj5kn5srgc6dbeyuji923f5gdln3q1nkzgb70h1xoso75udou3f6f62o5r8xtkhjd5agwkrzlijm0oztq0u8uwmpat9xz7358q1hfzc5u0smdimll52dvhi7tmpmh25bpwf',
                url: 'roglvw0z1pl9fvtpmfs1bbpaynffueiid04pg174j8a63lhmw4szbq65zey16nzc13ksxydjy29z9o1hbonxbu3nvms5mc6luodt2hff6xgxq31qyga7it5j6gifrdv8ghx1g0vejc7pdq8pnmwoc0ni2avdm4xqucrdqshm4zwv51t4kuuwim58b27w43pugr7gj7r43lv8x131zhh8uhj8b9ih79u16g7k5q07imc081xubfzoegem7gxp09qrqfw3xzculrk2r5jeq31h4985z3w9w80iiyar7tbdlr8jk33ya3xsvzz1j2xt6vbm',
                username: 'yuuhlt7owmju2a5co8scrftqoeag1u4job4xw2glh8a7y7nrjg4a5n3zwx03',
                remoteHost: 'xk2jms555la396h53l0rywxbd7aknnokmq5774kriqu1jonjy3394v96fotfqtlrcdbtfhjvralj19vcl3z8awtq9cfk35egmkka7lfcvvpzji6lsrmbchp0fdl95ugyl2uhjjc1b7goxzdnzhztj0hbjgmvtv3e',
                remotePort: 6177593807,
                directory: 'd7m8yilqgxnciwltc20s5am79cojnq6hylsf46qjjgkkwbds85nh6t6rvatpl67fxkeek0f5292lon5y3cavig23n0fe1jiww93wvvfx3envn7va0le5nu09lduvoweud9nte9mgawuj5rthkpo030aczj0qnw0j9euf0lddu7ebk02vq8h86nlha5ica74lyqwcyuwwgux43mlzr3db6dw5nu5ltsyn4usemk985cmr5arbi3mp569j9fk7uofzzs3n6bdr05qubs2eknseq85v9ycw19m3aqybvhfmjiy6enr3v4ou5smrdltz13q2ics85820s2qd4xo34j5md46mvyjuxe392zjzug3wwgxlx5s9ry23tvkknfrwepd1l2oe4z1we87x2muplhuh4sikj0wspl72533izgkmt9i6q5nf9cf5sec6cbftv7zq81105k6vca2jomu58vn8bbz9g470z2sh5guj59rtgopj01h1m7vc62w7ogp0kxm6aapbvn5bhlhfzdhl18wq1ep4w2n32ms5fqmfuzofu4id9udbpwa86isova3xi8y2fy03hbjb6fc784zk7jwgb9d2ifbl7odirk93ggrnux2qlfjym3hhtj1gpkn8vcuqbbms8xwmb89ie5x4c8wvuljcvi24f2rsolk5fwf6q8f4pf7h6rwcocmmklp3ac5i76d5cqi3a4mwzkdyhq6rbnolxg3akbbv438tipwnlz1ai5jz3a58u4s2z27o2k9rdlkhi4ued0q8ein4hx439ern2ep03mjdc47een3vvomab6s0gtfiezk8ka2fso4tnyq2w7vohncdqgyttx7n8h1p6k926oiupd4zlbb9d81myghey2o9cz2vot9uqqgb304pg6xhy8y717ox29i14u0o6t2jil29jmzs2qwmedvyfmp113dbxd60rp4hd5ii6cl67pzm5l9styll2zns19t5b6775z4jd1qu8o5rh13b8yezn9rzwdlw4rws4ss3',
                fileSchema: 'p7ghvmq5fgu0urfg1zmd8in0q6e0ghmmp6tk0h3t15d1b6fga5qevr3f7jngbtigx64u1ff45mk7btpk8vpjulrpcnrb427phgevxlhrmhi4in1yf4wmh942kdtobmg8mbfnkwck3bs99usufvwvoff3i34qy6uce3q5szxstz8fbzin1rljmz1m602lnibhl409jfvpj11grknxmmr3175uid03kumfia2du2oqbqwfjoknilyli0ndn4i33zle9875t08o3v3ijvugftk886omltirfl0vllecob4lof837jxa4pjkyp2n4bi4qva53puxj26qejp6h26g8qd8nedl7gbjrb6xovw5wgb44jvd6yhcvnbqn7p0igym7eu1ihc3836y99why9bacsrr9oi6g9naqgfzo3aicli0f8gztnzj5g00qk9lebdqo543o0mh31qzcpugsn4ryert3vatjywxt7s6yzeqypfap0bdjmviimxl38dkoj5x4xudbt46zzej0sfd7vmdkpxw8b2il2p8yyqluuiwao9v407ppynhre42p6at1wbjp6g3knd1hnwqa9efipb2dh33u91ceeb8dtvydv1bi8sdwp49f34rx6zqx9hj24cixhqtphpr7aaf7afze0732hvtgyhtpdrvqwkjp8wup7vw56tsih07wd1a0w5laifgd5lhdlkmaeq1hxfi2kvdyqmu9015ury9o7emc5j662zc2xcq2s2os4zln85qgelwenm86cml6fzx2ok6kg2azb04gxt50ve3vha2sbdzyt6lzc09hpshxzd7xo97vxf1lgf6bfjz5jqvi8ygk75b4als0baq5vcj4ijueu8jrzri7oep0yxdsjuk37zveb14jwxwfr1hwp7svvtdjwwlt24kjh7ieht2yjsnn34s2recy9eoameumypy2gtnicib4tpn6l8jhguospxqm78inovhc3cxcxmue7p7pfr9s35wm1alvc1rrnpy4aofb5c5u3gm',
                proxyHost: 'vzg138vzmzwfz68w9e9kut2rw0f28vqryzzck387skmqoi9zuu5z6v4h5aji',
                proxyPort: 9249204741,
                destination: 'rhakc8y1hffqycydwulsd7p699d36fvgf26vfyrv77mzznj31alw3xh9i4tm4hm5gz5to7y5l2p7dp5c65nydmb9p5jb2772f1m12tffoino2xbor49x2r8dtn390ybrcasitk6so461ved28kf948k9wevaqu40',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zh2rh2ld6nsqts3pt1c7guzb6f8c2ai2werufccmzc623vj3fzbvol92zex43ir3bub9ba7lid89mhj6ahlzns7bl2md2yvqdjvxjjs56br9nf4w7731sovpivfjhxlcztl20zoluoab5bi90hrtatbb3s1znde9',
                responsibleUserAccountName: '159mtbalbn5awa0ry6gd',
                lastChangeUserAccount: 'yg6yzmzt4f7zkyg31mqm',
                lastChangedAt: '2020-07-29 22:56:38',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '0pxkcwgluxwts7md6zp5quiqu5oib3gsh79n7phd',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'r66l27bdxsezr19o7pezedi8hk117ek3nb0dolhvl89eby7zl8',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'bwmqhf45uiagx2fgk9gv',
                party: 'w8g1dfruklfjjs7995htrpvwwhfcykzgq3rwtjzz5pke3lawwziekja50074b7mxud0gyynizgvqrjctey2ej24nb27uffcge3yf7h8xz1yhicpk11ba0c5xh8oz30ic1zvlnoj7wn1idgep7rrpveopdnx112ql',
                component: 'hkbfvvngam54s6dzqwjryoh778oapb8y0lvx59mlye3q85sgcnz6d4nqluh6zd95rfmoti09mzvrqapi9dzbrq6cp5wtlowwfrfu84hw59kz8sx1zb6p7694yzmzm466dl8eo0kfkp9z5tdelfb665f6m5yygmib',
                name: 'x149p7tar8j43j2ut5btp14fxdabh332tuw2angz28bbe040khzmcgaf7aaycd2n2xpv30w47zmk3tqflosgo66esna79b6bruzc4uab8xn1ab8cjwsyilveq8z1u4uxay9xxd8mxoqkg6j0wocbh5yewa59tt7v',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                
                flowComponent: 'ujk987z0xvekl8a8y8r39d1cymxy8eng3q3aribqahlrypghc7m90i7spcx26gitnln9yxhik37rm1ezuyh802c2y7n7xr5kffaybg55jrfjckhwfwpa2hqcb3y8tauyr49af7oyk92yuv7o1inc0h9283iv4mly',
                flowInterfaceName: 'l4hhcssi87a0h7h2i4bec9l76hsxkhhirejvxm256kje1gepgd1upjet9rxu4tzwm1byihag2tst18ohag4n78crvev8qmy6qnnm2aehw4c62lu2zod35stdiz5iuv3z7f76qdy1vi1tvsfoatfm4b5ivbnvp56p',
                flowInterfaceNamespace: '6238k0ixqmlwtc4pggqa8upyfn24ll6roi0k5ido65huso85ovm7udi5db1epukcx69tlszfy2z7a6hnivi91xblxul1erf8p53sqw2c8qp8tg8dn33nl7imwu4guhm76kepvx8y0er4thvbck4ujxooc309iqmj',
                version: '6i7iomykfbph78o4rs1w',
                adapterType: 'fvr7xu495nu81r1ng83ok54uue9nldprg1yfeq2s6cwavg1vkzz8405bazbh',
                direction: 'RECEIVER',
                transportProtocol: 'tg5329r8od28911yv70l0n0cmuhlshslbo25jq5z7cmmvfn408gfbs3gk49g',
                messageProtocol: '3cpxrus7kmqothzxbkab4nsfg7op0hqf45m1khcts7nt55ds97o0yymyd9qa',
                adapterEngineName: '64lnbt64yfn040095h6ul2f2c7z1gafhucn64giwpz4m8hlcfr8ls7ttyjll66ihx2sm7vfjlhp8zgg9pnq1aqsyq4d26s2tbvoc0aho3hltszrtzgfly57pmls4ee7wydqr81ro2b1ls7uu0asho41axysqc730',
                url: 'dy45y6zy4up3m1w25gushn53qsifujf1kunu12vb7lq4i4d38nddgrx6trg850ym03z6mukbvkfeqnaww1ekwd4t3kvjdtn8kbol1p97ly66ud7i3b0l8kh46s3gv575k59btx3e15cg2vlmvopz7sms5orjk0dk50p6hdapnk13ikewxxznrrotqx6hsa5t29akq3shqm97d9s78pugdir30v5u12hgjwi6zkck54rlfft18i28anb7gvd32rt6e0hpjtgav41s97dpwrq1gmxrel3403ligtie54cqbhdk4dq0e1z46q3leqbtzb34',
                username: '9qssun918tng2v1zp3dh74vhl2skpsmfejuwodz5fujh968itlv6o46a7mgu',
                remoteHost: '9cx61jmox4piiro6clr2041a1r8tcnmna125wugzcyjepyeu7uwla9nbdsfiddrsa34ce4881uxnksh6gdmg4t3yd7sqccus0iecl6pvbwybkxfalz85zilllxjeoqjqreu2k635zwhn4b7j2m3lvqo55bzt5983',
                remotePort: 4800717703,
                directory: 'qhhr6gs466rxi470sjed46u5he4r52v9q44a0jb5onmdyjcl9istch8dvo9ihkirwgnr4y568oe7h8xgzynwiahhgox4q5yhua3uz3pmerzltngbz8dxqw9b0ym1577l2yjhbr6i4atcemsawv736qe0qrq1shtdv382elolbwvmfytacwj7aieaah7j1bumjx9rgm4s9p6r7v8fu3uqo0lhb060pjoy5ziupkiwfb1r5b7wd08z49ndoqied9u0vnh9qwqw9690fn0xgy9him00p8vvn0jt9w8hnmlc8k3ht12s8u3mvc18vkihhihgkzvv0wc9lat9llf1wy3mxac5l8qv0z6xvgws5dy03tuzwlx701xjz27vtbsx9mcxvgb68hqmykwyu3nsg3zroyo0877b40j9fcyoq39p6yhgd21xvd55wu2p2yrywkv72h25pw8j4f9uer2xsya29dily7hdqr2pswbr04chp24qh2c3y38gheuyo4f82izu1uhs4qgwc4bvfrscmccilzmz8poipvuv4xztobh572q7d4dzbg3swmdlshhdv81t2gxosnhs1uv0cfvvvegt06868ti4q1hbfifjjoncjr92y3hwy9fvy96oezw104hnumbr4dmd23z6zrzjzb8gjrz4ajgjc63w1myavp3px7g212tchk3m6ock327cq0r5ohlljapgi1163znkpml7su0snu85ncyyd5x67xbcq415bppas6xh3meklzhuwin3wa5bzzsexg2xu0dcujgsut46xlarzuinbwv5ebgk1n9a6apftc39zsa3xw1kue8dy9hs1yakfidvz4q0rv9czvmon2og7mv28dcwtsrp3n6g9w0qexogedtpyt6t68zty9yket0volgc3e0skqbrs959bmvqtlizl42f54payip2wkln0n6j3h9p224lmtazo48x0084p88bi95eqs5d6vky2dj6ra6g1jkncggrujbqoaqmv4sl1tduovduvm7g',
                fileSchema: 'x0792yzqffh27z49ydclujl5wmplkkwk7wvz7qc7wkw9d0gtumhdh8cnlsb0vw0arnubgltcm7habalwal3ciw2349grm7s2jj1zrodaf38ll3ouxtbv1vrung5eaua27dr39wsyiqy81xjfqyonrbedu9j8lakgwat2y3xikdbrcvmcyp1h28yw40qbdm0qsdffyh8h2x3ckgmhztph9lcvx50gon2okg3b34d43vqrfsyz6hiravo2l79e5gc41n49wzwvtpax3bnc174j879n85qjy8u8j6lvlbzvgt0sep86iyckhp1fr1pkjoc6hxusmtgetndinjk79r0jo8f7e8d8997dg0ulm77otqjwxgib646dztc732rr4n0xr4dm5yzl9tznrhyiz9k57ycznyf9jxolfdpvjs1nsmwyfp8o0f7h8atk4jylr5a7ydmwg47awjkswwyjeehl509tiyu5evsos23j8bhe9ncm9kjz46utqjoehhfdt6wdij5dusbq8lkaly7a158fz5whd48ooqqviqmmce76mpy3f0328stzkj4593g6dh1y7eqfjsmmttfily72a1b4mfqooaadtbqd99a2i6yl3cgpi30p4k5l0ns9qt7r144jhw6in7bhjvenrsqpp4t8vggty8jy9f4in7wczixxqco6fzno3m37a6pee0wai0xyuj0gr8pw56vqdpt3ayw8j1t8ryvudku3hi7edkxuo0srgri6to6i9q3kskkdv7oxobacq6v7g5bvpsfegqkymvzylhxrh6l9ln97qzk6pbblhnoimpaysyjr02nhl2o3fb9wr5trr0f51mvro92zk6779egbkgd4pl0xxwry6chjd2s8ya9tfncxhf5x0hzwnkbnn4owlmo3isr2s06ztpus8mg05g3j6jxclm1bvjvcashlpaxc0rufjl89fmt12b85qpyaf7b8424jzthha3cbkvc9bvwdeyfrww72kcm2xuax1cwddfvs6ex9pbox',
                proxyHost: 'd03djflwmfknhe2rwbqh7bsa1ku5q5fget7yb89twmaq1uswktyya6q7rcqy',
                proxyPort: 1635596670,
                destination: 'v77vp9jxfww9tyjkcqcheuo4jms1fjyl02baj6n6zse99qtdkteuzpurubuzhd4t237gtnjjobkjyry0fm3qe8ppwok0cwg76x3s4f3r0miavoi30ggqpepbzjgo3g4lndtsnanfgpmnckic5oqebqdcfxr6xt5v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jpp348ua5i2vf20o5t516rdyn16g6tps5bx5303pyqr3ils4psoybxo00tv4u5scv26gtwgnkypyelpo2vq35wbjpabsr4byln9d3tk1q4e19goo78h5lof6klux06bcnfm9gonhc2whg1398b8o2u8hr3h484tn',
                responsibleUserAccountName: '9n324v08mszpmkc8tjfs',
                lastChangeUserAccount: 'kovqw9j9a5u4gnj25rsv',
                lastChangedAt: '2020-07-29 05:34:14',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'ovj8zs05eh6h1c6c2ftoiv4dpo77cefqwm25hxwz',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'po6733vpec7ockpfb3hekbayrf2esjtnqha8svwsmdn5fwhnxu',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'vwtpbo3yjhqm4ehsfkma',
                party: '1qhtorq7bqegribkosthfxqxpj4dc2cmz965odwjf8o5o1mfii11eqdsz57by8l9ty1dq3jmx7ipu6dz9olwsgngbod0bttybcgqjp58s5czrc1d295wd68cenegsoh37cs2kqrwsh8hsbjpr66ou82f7zrnf724',
                component: 'k25smm9iucdtbp369vb78wqsbojhkm2r91n0jovgep4najutp7pbs4nyq8ghxp1i9a838vescxprmi9dpenuz7vhdhi6dcphbar9nv11850erp57p0pnm8prunyoxztq55g9rlpmzgp9k4di7ifhdrihtz3zesgr',
                name: '6y6zseqwy8jebhg8kh5wjgcj7wrc176186rau2ruuzh7ck4qamlpvrcdxpxhds21855dj2tfnhjqfbmg0ifir59it5g061r0kye2zqa0m9kdwpvxxh8fmsl0kwg5p4idwoxdhwh9vy32v2j2b5m6kgwkpr9h7dbk',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'n0buzurdzzswu54b5xyongbs337sdxjvmmi9m4lmf3zmkj7gazrdoffyn349ehknldwzvfmsuspl2yjyoybzdbzlpsdxbsw617zq30yteh72e5faaqjk11y27ru1cre9pgwxgzoyl32v0wnvxw435hitswkwc5vr',
                flowComponent: null,
                flowInterfaceName: 'i36lny0hpkbt15zn32vh2f2au4t4hb4vexee82075c4orcu8azrcm56v2zinf4e9yrt2ff1x0ib8815f91fg44ubinkmjst85lr3iay161cu6hsuv81nwmsnwzcdrf7xqgc6fng43dajkife27yrw9h16mu5291m',
                flowInterfaceNamespace: 'xzeconjecjbq24u0ohbj1pauc0wrqlljd2rqnlvsw7xjwxb1765otds3sv9orshne9vzzk4ib715g0jjs43ehq5t6nnp2b6xevw0js35it1kms0iq2959rs4z8byjp8kisgm0lq1a26zul96rsb9sfzg0e047z65',
                version: 'y51z36fx7ov5adyzx4i1',
                adapterType: 'rq4mxyudmvwtemo6vtz4yzlua1chpbefozb6o1imoapiciyzuu03ay0n5gtg',
                direction: 'RECEIVER',
                transportProtocol: 'gfy2pybrrm4xuxhkdq4tebyy1hho174gr2k1ayil91tyowau9aul1cfcs9uu',
                messageProtocol: 'mrc9rdzr7p46bfszt5eo94xu0j18hp3yby77qpwcf8owgblitr6szc4tuudq',
                adapterEngineName: 'mguccdvr746q9lawmmips70vji3o1jjv1vzxw0roffo2jhao4wejzw9h7lfj7u1imq6y01jrxucx8oydrfkrmmorgnbkk22u0z8lqcsmaqw8u2iscs4y8hd3lbikoyv817uuez3aumh8rv4sudj6l5sz5g5c4cu0',
                url: 'x53r3hfjb4raoxvh2s3hqfflstmaxhz2aak0we2nuhd15z8p37bfptu9psh2nlz3l7ujc3jotvl01gzh1gdtirc6spf5dqfo03rg4f4a8swhxp1w16zbv2x4ll819k7lce7rhy3pdh9qsqbxntvons7kh2n0g7umfntkh1vpjwfy8r6krts1vq2ric1c7yzyxzd8pqydf9m6mr7l6ygin71s7bhuwljx9ud6fon3dv0cuwt2ba9o1vxn3xf1ixtqry58zxg58mbiimooe89rbt8cwbqwbp4207hcrj2425y0vrx2e02xi02g5opec1z2',
                username: '0x9qobc5lpvv9rkxkaw7adj85v95w2g1qmxmsubbk0ptqc20a6s457aesj0j',
                remoteHost: 'linuwwrp0o4hksn8jnypy6iqz123rknocifq1kmteimcwp0d8dfoa1va5ubvm3fyzy2qwln8634r2h4h00j1qm5kvrgl1kxdcke4754p4b4wv4xzuwltkd5pqc4ysbd5udq5fdjiul4m3oyf8ma3srit1nbq7se0',
                remotePort: 7818308365,
                directory: '74xtrwioez90p6pzk6blbn3sr4d4dnt9n8v3pzsu5jldiuxk1jt88tyz592f3n7uqqtg1wzjw1pzyzmm8hqa8g86iifmxrfzxr08ltamlocs03ovwro3l3oe8jymzspt8ut0j1c14effy584md3agubwi82onkhhel3o2b602d21c0ckwae18kb1e4fh8l516hng8dxeq53kh877kae6bu1cy9e8jfyhxo9w9xdaf6lefrnk2s76vgpsmw7pyrv4kp37fla849wyw890kzcti5e3pyn4wppvykigahrkg11rewzadq6ohn1lnzwvypfonnj16ipa9brtgpq5jo22kfycyv5gagk6405ylsjy86n68140yb5y8j72irc92hmpj0ut6el4wrwhyvy787edn670pwp939snmyl23nmrsln5nsms5v03n4wjv5fdrh8kp29epug2uo9orn3idpjniuyqfgfdy7wtdk73uindyhb0rfclbuluk8id5jftzlb6htis6x3tdbjx6ho93vwafnz3neuw4sttgus27pmushx7h7241nsxbtat9l9dloridxu89d3pvywbudfbrpt0eygk5wlmy45h85m33aaz5591gi0lx00xkobcldx2opowwjutykztab9wm2d6iqwipkmym0m3uuv98tomyptlwlbh0yankby6b979u4rbuge3p85kg7kksjr3yn2fun4wdfg2w8qekw34f6rjn2fednt5bprhv1lodfh67h2yihvyo6ep3mlvxew6k39b4uw3xvknbfakx3aqp15xhsx6hdcfv4t0c6kdg1vxx3qem60iu75z1qlgaue0zyf7aykllpgzvujnj5tr8p1o1a044effzyjezlsoz3sjbhqlmj3z4z017cnwt7epvwsqyh9sbhor3vtdnly5hzf6zq7a41yq6orpxw2ms81747oquooa35k6qt5gxo95g96x3o2l857nitj2pus9czdfntdpfgyncvlovsmk3ttn8btfbxqb',
                fileSchema: 'ilv656ui2ue281irr2vobi1da2rv0s5r6apafz4daw8ahmve2the3zh7zjg6ltcpul351n9evje1vgsswv9qevgwd1hz0m2nafbwp4qj1ni2hiit5uqr5endlpr6p02f6zo8cs2q86ylsmvogzi60kdxhuj5bvqxj91xa76ae8uwfsnp37ot2kjwbxle3i3j1scrv8u9klykceqlpbbq8v61ihsgtysvh8z02a1awudck8guvlv8y79vdi3yoiyzgj6sqpjhj6jmxi72xjp917r72j7z5nqauh8q5ayd41jomxwcm0tb6zae4pv8vmgvny65jvudib0vdiylhcm39m8ph0qxt2w0k1tzqhwm0nxdocbv549cgxctgiod2cbcqy08wlyui7bqxyo6u1bd002znvclhdb03g22ofnhx5oxrlehhwjf6ucwwhb9pofy955r32n8oza7kbzlgv1ot03oblmqov6ih32mpiybuap7n2mja0wv3vm3vo2d5oevpl2buh93iketcj38aqojkvtxrhvh7e2tkn2dnd5m1yx9c1btf8i97p9a7l8v1zewmtfgqlfg6fn4gualf63f38rla0ww8pni7govppqpzgk44w3zb0ladxxzs35b4mttz15zkbpqf5kip09an89xi2dwik23fjzcj6xq4qvmb12gwn7mduu24faanmfs4j5fjdqc1e2p9fll2bqw3l1ngmqmfcwcec0ztlmm7zx7hv8fvcyanpxkm7cc3g3akk7xixh95ua4tj4540s8s3f25musa1qrfnk8bbp3r3qvc5outeabhykztjrg68r6f9m4c89ejuipdp0icuywdn3pmn9khxcsgqzicerr4l1ob4hsup3151ng8nhvs3rr0dxwj7ieyco4gdjg5b7h82hdi1yru8jnq56fs4hljp5mpudrblyauxcyvbnbo8s5r7d68yqrq962elfa8b3lsq31uqckf4ucpdyrgypzed5cp6x98db8rx9rqztaxkjxxnp7',
                proxyHost: 'm7nbhcn0usyflk8569zj2sg51yczg8v28f729oldy9x8mysyd2bj5cco0ypk',
                proxyPort: 9236986931,
                destination: '7hvqcam170rhv2iu3p8pzmy5m43ccbnnqgfmy6bffix33o0h9qn1d9k2s6lzoh6nk7z85ze8b6qlloeymbes1bifz355n7v3f302y9jk63jxtubzv0zcqxl97jcnh5i4t74ik0gwvox4eb574qpg8chdnenwrwot',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bow1e8yo25oihfm0ecmc1tn0ej51yolzz9vpnq0g0a35qq3b2lbtt0ix0r7lbrht6dmssub2gpv8f13r236wifyc8ihyxbpsva4yivbd1rfhb9uiexhfyb6acfuffiilveor0yzjtvfylbvzd62hem89nnkbldn7',
                responsibleUserAccountName: '891i9rmcj12ljusothym',
                lastChangeUserAccount: 'ag8kwix8jto7zplrpap6',
                lastChangedAt: '2020-07-30 01:26:19',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'wwfqay608l47ja8k1r24car9parx6l2wvw9qiybm',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2h9uvx61lj7wvgcrv1iaua7sp6p4hx85o29v9l0uz8fv3101iz',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'vicab0p0nne0zsxvuugo',
                party: 'gbv70rg6w1h9qovnm5zz3hblsfhfawd2bh522wkhy5jh7onlc5nbkqo97acjc3cd8g1syta4m2udysyo9u2tjf6qz49lw09wyncqxpmd1slsbwbs4wrtcypa23f8jjl1eb8aeu917vof7wltatltr162j2vkva8n',
                component: 'lmy16t2kvydo7pbqg2zz1t8g702xmpy3clkwx5timah8qrfv5g5ysf92zy1dxnab620p6bgavsz0wle3lqyclebqg8lluxl7fi99mzqu507b16flowzzfvd788ds0f6nr88od0aqe3c8jqhqvb7eresl3t7oxo6k',
                name: 'oyuqawl120cm0e8nof76or11oi1b8up6mki5yjlcgg9fm6cowo3fmn8gcff84y2osdj6kv9ziam2v9i7bh3tybkb1d9i4t4o44r33dwqvlyh0hogu4hulgvdjrua106k36yykjgsl35ljxmuqi1zisbaivo6w1jc',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'b3llg3eszpxrepwtv24bwddvhkrffo5eykx6wvg7mznx32fj8dfqm7pqmx85itvaqj5d3plkgs5boeq5kkjlbmb51croode5a8q70kyav89vsqtefo7jbw07qk8lfvkb178f4dol6zntg6ap4mwq249p0aizocph',
                
                flowInterfaceName: 'gnmxowj0hy7m2w31i7l0qcvi5f8kdjt15jd8bzciwl6ppv3tbk3nt6zqcbxjbtxqvo5oj5metir7fw516firi1xdgxxcpwv3zlblbgy2l02imbgu2tv9spydcksaqapd7rt5seee09huq3e06px2om4oqwjh7xdj',
                flowInterfaceNamespace: 'xel1hvvszz3i0ftp37z6d08dqrh6qnzhwpx5ql61zc4ai3ow80wonht668wa9c1b2wd3wy9n2dhz0slduum28ocdizgd3wdwx9irsg2tiov6ji1kxvkij6gfvdmoqiq3fhsm1a9dvbif6z0y9z6ffqvhu4lgjvx2',
                version: 'w0az8vgjrt2kuaoupa5b',
                adapterType: 'x9noij4xtlovbl6pr0clngmcd2982hqonnzu6okqb1xxc40h1lv8eo7xlmw4',
                direction: 'SENDER',
                transportProtocol: 'd1208bvb515pjplz2otj8ak66rafr602tkq0uouan9zaz476cgqbh33wfnlg',
                messageProtocol: 'mky1x1wozmvhwf8tmqw2ai8gepqa9khdeeg17enfn3yzzl3d9cixsdh8vwlf',
                adapterEngineName: 'lc8767iij4baf390xb6btj6l7k0uwg0rzfpprqav6dvgj16gjov08pryzspiq82okwj5h0p0ta2mi5n7xpr4kmes3zk7u4qbmkfg5hm6h5xpr254buppowoxgel5avplqb1o2rjkid5pzfpg94cjz889245flsqd',
                url: 'c4crtywpk66b58hm2gkyfe3e9km1j6smrrfoh40x3kxslb2k1hbxb0nqdultjt647gt984xtu5ph0l206re7mise6iexsjzf171fis9wiikwwrxg4sq930go7vdieb4mzm2nxrufcs5jozq1zwy0fsstmzk8nh6z7bd0riyeqv9h9iqpmbgvdxrjnx17jck0jkfxcz5bz9ed4hv0smntzen353nf3yp9k0m1m6wgc3gbz4i0bn27igiyzzerb63xcrxn3maadnkge3us4aeul1apfpxsb91a78biquvf5ym8or5mtp3fjjm9l16gz9mh',
                username: 'z71heuzat3o2b65qw5se9c1lw7j8u8rprwb5la98psgyalxbnb43uig9f2i3',
                remoteHost: 'gxpzc3fffdwkup5fe9rhbw7f11lqtdht92qyqp2g942g2b4mmvlxuus6pomlpmymtonkbkkp5yv2mpsc64vba95kaluva1vk6m8ife1ofo9p7i24gvs88r9uppwe91os8n7sxazrx9qkujg0ohnjw2zejk3og1qe',
                remotePort: 2907043377,
                directory: 'tzu6afkpwcsgmsdvex2n8l5ph1bu70p6ciug6hqnx3nmpkk4kqiodjo09tnd45zdrfpogpmoani5edwt98ydgo8t2t15vqc26zfxh5u7t9sd3cs0g9t0p4hvh05z5f9u44lrh5ak7ba8fytt9k003pokj4wtvgbhms79i2mn9tro37zcu3grjkfgtpp3jt8eqyql57oyxwo0n6rru9ncaljhjuujwrs4471ac2tds88d59q9btekfudgjm71lduyy2mljuhpl9wvc3lfar7iaq9q9fvm4wxf0ajdcorhpywtw4nfpxjnde6f137u5l1gf50bkn72km5ti20sh7cul8y9s65v5fxlx9xb7kq9ccj4eq35p60gku8klhv1xv09ognoqud59ewkxrxdz5khivecmbu63xtm9x4qv0ktwbbpdauhq8yighq888s2f6zdb4qkh0frp4x6kjv9g6pfm9xexv0ylvqx0wbqd3l4oobdr5ikcffqnkyb05auo23jd27f782j44w9eviddevd3p1jgxwou3pxtg820kk1qjbnuvk58gwxwd5sgww0p9c1381u0h99fgp9op0jhx29necg5tclav7no79ic7mm07z35zl6hc9xi4xulp2tpswizryt0ur6o475hoimova5065mwjznacorhy6hehvho45tzhnjcd2mobs7suhqogaibeh848h3wl124cu9qd6sf6lafftiubpdueokcimm2s7pjb5moyms0ja3lfvfsmrouiuvj7qce2epls9ltnichrxpky97n1hw5g3u4yoz053124rnw2ylohd2c95irhsy7rax8xxhow1a8gqhefofcl5vg9pva0peq52mjcy6jyiu0o10ry3etl11nzd6e8ag7w8t4hf2c2uoa4xwvu1lb5ss040ovkvvlouqv4cferj1mzw43bjdzgv8hoavifk9x37s80h8j46cov0r4m6l0m5ws5qdkdttberu5movztg77od87kcj8heiwb6bhjga',
                fileSchema: 'k9kq6tydp2rnuqdsq7xqy7jvxaz6ulkvua6tdnoyurjlv5zenp2lqxfwmpzg5v5gxg5ourhnlhs990hgpz1rpa1lluaceu0z23b1v0a8derlhbf2oyyy81frescbe93nkrb6mg6szsk92xzo2wa9xscmngh0p20kyrzd98jdla2ket5f4i585e6fasvim7cnkubqjgrug9u8yl567l64ymsfm7dfqq3guyn15cuiq3s97z4yk0h7mh8hfuta0xh2s16ollsxmcngyjskaa4zuav759u9q9c29ejrmc3cp3g3g2m28hig58d6cz4lf0vqhb6nbhcnn99tn5vlznv8jovixed5a42kyp8pv7iv0plxtpfo8qf6rbe8cqvtcsbnietouu1o7s7zzh5a9e48d2ft6q91yoyhn0tl8m4spzf75hbgixmi8euxx5a3tpqpp7dw5l5cut55vqicdku1wfm8i5siqawk188bkd9putfnvk3vrmqj2wkshrdwkbgvc9f6ls8z2yi3n91aro758dlknd33b7ojgtxrxhyhtr28xy3vcaoetukbwlxaymcz3z92442nhamkf8n5ab55u97x2o12c63gwnezd9bs2ebyygdowvts1xa7acff8l5c341iceax9n1exax56tq5t9goru3khc5z6a7k4v8df2t88ir1e4ry0nh1buoe1vo2tpgnupnwpqbuvb6vb1g81fozofiko9a72zcdkincwl4yz1cuc4l8vnkh55rqqn8ly3m5t485k9acqdol4iny1xs9229eve6uc520vls22vcz1f4nzx13aottebb4vbjasg24e93843d50c3qmwh2op9yt8zwqfcptpfu49u422ftyvzk6gkb1e9k9bbcp5s2j0g3gi93qa6slveuz0a7vu09mw1brtikc8m8ffvhfsolaar4k6wpd65hdhah2j0wiuj6xx1t9p3w1rtd639nn7mi1shbv4rf8h2ybwh2j7ni4x2mmjhvj4akeuayivzf',
                proxyHost: 'nryrmi6do4tkhej4jv06nk5m3tht2i4w8bat7m3vapjsuhsvoep9py3kb0hd',
                proxyPort: 2085390580,
                destination: '7qcdm5y369fr7so85xa7uky0c4eo6zlfddjmr7fs8tpi5fugw8jzoldj4axteog6wn7kllzscyhs0zlngno5ht4jza38ajzsnz16z1xisnr5f2bx8ao2q9v535rfevzofte06k3mz4rlea211ju3gidlwwwoh96f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7n1ojust854z5ry028scy4qu9yqd7n3zv0ucf8v165ysdly1i76kdnn2wgpbcpq1ovib5notfashdjbwznvrrknx3cw6zr518msr9diyhyqnuf0at7u39f9g1h8jwceuga934renwxf6fsy67i8q8f7yfgur33zh',
                responsibleUserAccountName: 'pitcajs721fmhm9ce5cb',
                lastChangeUserAccount: 'n6w0sa01h1h1kyekouxt',
                lastChangedAt: '2020-07-29 12:56:09',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '43zj4c9w1hc1vq3ny5vksz60ym7nkhn50oox7sue',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'i39xebne9hkqa40la1r14wdwvcirdrbgy9hulygsiw2qiq69ts',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'bybd6kwah8ut57dswsmk',
                party: 'j7up4uwn9ld4dl3wuyrq2nyx53dcdldnmsrytd6gggl2s9d2fkcxqpohwnn1hy3lfxd74eky8jbmoc8x7hk9bmss0s6nmc06w8o801jo6z0wjuf828aodnxrcuwojox69dse15agi4hv7jlwmsapkbcbsbnh6jea',
                component: 'wujab5zfqkx51b64pwh7vyiuoluk2pyso97l4or6wnegaf97d8vx6blihcrzph4afhnmkq9hw9xh3dnit8pejfjyu39x6gf9cmf1ezttfvskvy4pz03mzraewyinru92gpvl2wiz3qed7g39q3bbre6yyhjw3uzz',
                name: 'x5miy855xojn4tq48nh9h21cv915uq0nn0ydmtqvv61qjd7k1kz7viz32crzxtkxo7h9jtp1nz7r6qjgqlzsxcx23u7n19ghviz4swsbnlpou03k7ib2cfhl6hsisq3r1ib90f0i61zba1y2uh4kbd0srz1s8cxz',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'vaivjquc52a6g9f3r21wbhreo6d1e2hpwm6jxad1r3yk7anzhi7ozq3pyt5o574y301kzms072ypbod5953xufph1b3lgv0oaabppqhhctcw5kq61004nmna0e8orlkeikz44b71l534q5ycoc2dgcd6sulrs3ew',
                flowComponent: 'bj7jbkk6laclpbc1q7lspbbr01hb85cn0xjfd3dfkr3vui20lt5kaqr5nl53lju1gmj143qtq0e65hfpv2n8ykgg9mtc8xlr9xmt0r7wp7wkuo0oxmsfdcmzxgn0e9ibnq0p3dciabx7iulyn88uo5ykwvftq23d',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'i8qobe12eqq24b4sbdfhhhkbtt84scdz9v0do8dhmuac0xpoy77h8a4911rbyvothgpiq4llzbr1sz5n0yywusjj8aan31k1tj7j0c21f5x5skl6ngqrmzq8t84z2khu8af1zgde3k52b1pr4yc19bcw6hsmnm1a',
                version: 'unau2rbew5sy6oktev3m',
                adapterType: '3op2vzxc4daicymtc3u3937aponu0arhurexcd49bu1yr229l4ry0f5buses',
                direction: 'RECEIVER',
                transportProtocol: 'r54bbra5csanur0kqt7xx7m9gyab0vtvpdzjdf05olbhtxf6r41n5x96a69n',
                messageProtocol: 'a0iyaqpcr5ised1636gi5rve2vhnzabkqjorv713eob0y0gi7k4kkx4mda96',
                adapterEngineName: 'eobu6bgp6qwqcwo51mqkbb6nifxd29p912g2cljmixqmzjzve9z6py6apla3vjj5fs4t3i9szp1fapcmwr393e49ibh7ody9w9wl1u7h0hy1i83ig34na02h7vw9sxv1uln8kq9idzpif8e35uerhgw3tlecock6',
                url: 'auynn2okp5qx0sywgw7aw5gnb62wg0zbfitcn2ofeklwie8z5qdh4ak366cpn2svu3ovqumn3pnii5qxz0ys2l39220u2tkgqzk2fuj1u6a4aixeraf1pp54db9ys2ia9es4r939m7i31lm9kjswvlgi131nd6p5fggtijd32z898u8ejirfn7hbj38qd9xwqupnbqenxwkp8i1ltpgwoc0q2lrk7okrpkps1fl1erm71s7o8amwjxx8pwqv4hzdz3kngtixrujwtehj9mpyq4nqpfuddhbm5xo6f36mrm3fgh1tcqdyi8phve92oqv0',
                username: '14izmnxzpnatz5umtdaacbqykhn8chi000hge0g6yyydh9ytj0zln94iom5w',
                remoteHost: '64liddtqxzlny5w1lshkvp2flcej2nheqflzwhisedasafr80eh3il08cei37n2928t43sg16cv9bix3k9s61kftd54vrk0zu5s7ei1zfbafuvevexq05xhwdpgy4po15hucy1t5oa4lvswm9u01xersu1go2mhx',
                remotePort: 5176686787,
                directory: 'cvf8cg8iakgw9m0gxs5c56nheu3v9gxyvfrsani0wmitoh3rg5zpdaf80pwk3n5oad3zv7z1zgi2nu5iadchdpiq9mxalwck8wnxqdi99sv1vituiv3a0msa2mpbruxypdjfqsiosg1fat99mslb8eai4obdu5ctlwc6vfzfklb3p587o124eky0my1parmw982j68er5rj66vc794udlfqjaqjsgbksmxtxpyhwx8kclvcegoc5lq0oh8p3gghdvjuy5nv85wwalouwg51aeniuhoe0dcp8n6lomn22bfalnop428birqn796t5e0ymn7pe9pf3gtb5243v68mtr1gjdcq95sxqpb20bya3qxlh41an4qi7k0jbarlu2pcdzxjox0ta9zttod57dxs1tyh53arv5ndmy0be4hc5oa7ugjl02c80f58sd4aiwdgyahsgygimt96fqx71ruzflkiz4nfcavca3llm2f6jv77pg92m556isnwzttztokgohe0q2eyannn6z7zmgco5wkhmxuvmi7pkipj7uxwf2tfl76308moaiwj1t8wzpgbo26gvw7gxa2cvqbzfh3ioo9l0qhk2biqyvl69jqjjxqcvl81b8p49iw28226qhbxj0xaeftkdqb3p5dcwpopgfmmsglhq1nzmrsvotumg860ryd2u7bvhnlvdun05lrygu7bghphwxvnnmsp61wfkxvvxoje7arsezujw2dzfe10jticije5vkoq6p4mbad6epxaqso56f9jdz0h742ayxc2kh2926be227tw42xgsc0vspemigxs3a8x3ixzx380wldzkesatbjk9luyjdb0p8a9rc8267kddeuxrgv9bbrwa9nlv4djnj11lfms6lqyexn38pndvvn415frrl39pcf9gwsldj8ewkdlql1c0v1x8o9u3n9meljlodyxd3doegpiky5a3j0qdfhnhfs4wsbrvd1qultlybdna7346gfa0xma4nkbqgvti7tnt1zb',
                fileSchema: 'v7n2arat7xrp2zal3onqr102sucyqujg24ixew24w7rdp1a3zza5fbuasycpxt5cql3amudei98hvvsxrarro24iqyxce2jwrocpk42anqx1t3vze7bodhphwxgvdn9cxbspynjh3j0drpy11w8a4n1esxkolpuirqy9r4a9bi6ts9j92afb3nbovsd1ru9reg0g2pcjw8v1m0mm8gshugm48uxnldsits0ryvha74w47zqrhvugz948lpwvneo5yc4cfnvupvfofqx8bocb31a3f4isfrqtmqi1ka5dc0hizqjl7e6tt1u1bafmmtrak1dpn3uki3p9jo5f8jolx9xbdoj1cormqu7x289jn7bb30wdjff6k7o5nreoivxgfztc7nreqmpae1pefdvge8x7ahckqv0bmxcsv03ld72w61zwwk8zdklk9p9eqmvf84g3ryrthflzelik19yq7ei5v48vq2or86cibr4z9n2fphnon1lu22tp96enr8bmfparc3gt4ntbwwhrzg7khjfh9sx4pbw72f2o0uuifgyst25xzzlhpdt7a1l6ptoy1w091vpn1tki30nzomlpxmgs53u48cke0g0q2q7pq02spsgq8jkpdvzw69k8rmcvp1drrozy78634obrt2g8lc29elvynruzvqk4up9mlejtjdk5aw5ciie5m8x6742qx4v5o6ol3848io5qwcbbl6glkwko30mfg7frkcvxu2lqki6vn2k6491274ncq9mdikyd78xtp7rbgznosz7ny0hlnzw9cr6iwvxbw6owv0ukjn2ouua4osaj8y5gxezq77y8rfwo4xna4ag7o2evztbvemtnfswuauojwfbnpt4t0avqipsc3q31voxpxzvtaej9k5dw84gwko1eh842keqpmu1w03j8osjftcvwg25i5lpb4w3tfs4r1qi8ekq811gnc8dhyhmwt30t0fhwkt5hlilhftp6f46qie278o93gcb1rsxm1gzxoaqxk9te',
                proxyHost: '9ow4mf4hke6wfdwka9dsb5gduyrt0y05ajx6bw0ertokmhcagdao9mxvbnhz',
                proxyPort: 5962573809,
                destination: 'mborr1xy6dpubtf225vz4jscza5j08xtuk9lt8ycloooiqia88uosfglrqyscsq3jvv124m7p6s4c5026782eha2la5qtw0023bre5722byd9v9gjav8ring88ot5tw69wsb1ptdxw5sii4l6sv8w5aq7gg0s37t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'idzo2nkc00m1yl9vkmwq7d3lwf1m3fodxwp9il0zy2x9ujrzkj0jk7i0dzrjfb8yzz6xjuxuhtubschxlvpmrchzpzegf9zr5xqdz6hdq1c3axjk3vj52tspvnp0yvmpbglrnsuqwims0omzwhbv8knvuzfhwgc3',
                responsibleUserAccountName: 'pgsnzzq7g0lsu0nbsl8v',
                lastChangeUserAccount: '1lknhjpcx4m9yx12kjws',
                lastChangedAt: '2020-07-29 03:00:16',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '89cxhyuh3akjv6n15uncmfjd3iz0zonla0bbpgu9',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'wnkis89ou0jn6rmms8oocj6uh0jb88m59c0uy1mhuw5pknuf9o',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '26p7xpvdxk5dobhf7sut',
                party: 'b8rk4tmbrbkie3tgv604m8ryvujtvmkw1d76ut2ykrn2aim60do7spad4xmorngxe41yjfpa1lc3st5s2rfhhrodert289rr36ekwptq5t3jdsafxerh96lcj1b94f76ocq0ed4u2zg2wwfw7vv3mikb12gf34f6',
                component: '6pv8gn65c95625hin6ix6hfznujegokr3sbqfar66nzupj2pyvyuec3r59vwzg7i5imz3uzmteardup53epfn6gfdwxqj36z9ydfup1c38a7lahdjr7f3nnzs8qqfaiw8veq0nrnuj4ubsej1ryb2nuf9sl815eh',
                name: '1dpasgun2hchjghgwwgqchk6whrzuhppa67kzm4l74h96envvkyg3g54p7ly1j67j6szjmo81x6cuish8jns6dz3zub65tfw26naj8wkl98ih01a6ckvmp6brk25cxr4p65zqcja8hnblft08dr6gm5dv95lbh5y',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'ien3r0poh1xywsimsd45p36hroywztnmqdz933jkh70jr7txxgx4vizdpmvkg9beitkxf5ndrmzc7a1j1wvqvph1lav53oj8pl05zngul2mrmx06jwvb2avzw4j5cmmunoniso3p35l4vztwunv8t18unfo873w4',
                flowComponent: 'galnhzxl6z4w0r6qzgd1s2kne6hr66cscsqbps5nxfcfsx95k4o8jnrv9t3g94mr7kmry3lc7949zoqk29t60gqhafsstzinfzigqmwwxuytffddnnm2u5fe3pzdx8yrm69vkflvyyni3s7oqwzmi6wztjluezk4',
                
                flowInterfaceNamespace: '5s28uhm8lxpeepjrxc4b2u09cpx07y706ydv88y77palat8b15a6j06fmmqfrg6ezdhhu7hxxs71ujz3uc6cfrea9gsu0i0khza6y4v1g7sjyiwim6q5nzhqt8nbe7m11dajcoy8h5z7epptgnville3jkwmf085',
                version: 'ojod86bpjl5ikyya36hw',
                adapterType: '267pu40pk8ka82go43dg0nq90jjh2pv1h206a3n3942kyhcjjuncvrpv7wie',
                direction: 'SENDER',
                transportProtocol: '0bdk20y6j9wk8az48nwdk8eq6nqzrlpw3skglu7md5eqmtfqp31h7r8wd47d',
                messageProtocol: '1c5gjicodvi6e3nq5ggqfhh83gqp0gytl7ud462bdroyxy2c5ups5krlue6m',
                adapterEngineName: 'uhyue1lrtxcwwpmrhem9fe4ul2bizzet91z1me8c34ockwws728qkhtghh2hyl7n9vk84guhdsbs3k4qdwyjavxbww3wzrywgwec8xutuidxodpsvl7foyk8ntebrd67lduaa3qzw95esipolx48478rhaideitx',
                url: '61wjwkdlcaon2r0bmsydcy04cvwr5xfenhi4myr59d3knijegppj0m8bqcvg16blbi0e95tpkr8dzscxmiu53n4hyp3mc37svspnnuhf1iwv3c55gkoynw8ms9ardcexuua7z092q8pto5keb2dyxls7szhth0i6byqjn0of99yfzf9rmzkr3x008y3ztgopxwpwl4jwbuzz4jkl4gducvf4sc21sekiw88gsbhareqy9pu68b5c1s0wp7w0hkisy0a8e0merwj0dvzqns8y9rs0stdq3vtfeq0170mqukoy00qjern8ogegcplqnyxw',
                username: '13atn7i990w6vyn3xapib7bc5kxlhgbi6yo56ql79eg850qixo0eso1cwlci',
                remoteHost: 'pb2bie1m7wnzjlvyasievnoozwc68a5xetv1fk44mieozfj0ez6h7hmbrrjmnyovghu8q15r2f2ugywhyg5iv8zsqskhz04c4mdoec29f9gtk8nvvqyhwd20dwg1dbp84kn7znlwrxmw0ohm9zeegoniy0lpob50',
                remotePort: 6326056903,
                directory: '3wuscfmbf4yw2i4k6aiw0mrdynj7naoc14acsra3th8j2glb0wvy3zr24mz5m89t548isdc0n8lbcuz5scm63l5v3rwkul4cb3rpxgbj2flny07nzjhnz3b4zf8edl8aplwyaxykobq40fcmypvrawazsz03xv8x48am71vmr5qodjxteity6pq3wane3ox9qd9cmjnvs7vpspegiuoel9eftgrij40bacv0gs1cl1rjtw80emptwmxzk7a2gedaihdm682kdna4m6aj2lk60lb5l1hqu5e9n6gjwyydi0jwknlymwu2155woxyvm63fl7ohyuekw152895fi8hh92h3pmdxqys1z3wdapgbekt5d9d3udszeebxltlb30cx9nbxlh3m50976qusymwirkig4b0vtdnct4n87vpjhl2enr0c3gyytohidojptp3wasrvxzg26ke1ucu0rx132ay682ad5rtih370cxjaq6xy2ore2pqcve84uo75ectdoxkgebsztgql7vacrpshsiep8rg1ep5k499xpjxt2fo8xxsy0c33zwh98h8lkm5z12z2t8k5hopcsb49sjee41ht6infjaxgk86ieb0mq2mc98qdc4b1mrtt14r0jh71im0wfofrmgb4ca80daf2n3sf9uudqxiviv4j8lqf1676sdq9s72ttmaanvbpnin7e9hiol9t2q9e33477gweu491sqwfp8byoilzjsg7dsmvm0cdlgqx744yrn6z2339xmrcys1opithmb2sszuxajswp5d579mfzkhxmea2srpmaf2spckr2v6y0vr077gha0clik5yptjuodiinzfru2rc15692e5wxsh967ulr2qrp1a92ablul6m3gm4msd3p3yraw0axl56iak5sftr42wdd6wd7o1fvdr2yk463juw7yv5v1u6oevjbavoc96vmz04clwedv86xgd3ucp8ya0hgnoo63a5d12ehfjergz34v6ohtnwfvijfxndf909',
                fileSchema: 'staiv15fsmqjtzy7muremza4jy8a402edfwn6nym8gpwz2n2z9gt7eyq7y873e1b0d9mhyrdvzzavef8ryemal0dqhxs8mmkn8bwtvyng0wp156fekuqsmlrcavxzdisy9245vnce34z0uedust6pnry43z5fnzyhmwwkdey8ke0biq5qoqt5g7lq5lq3cunh8j25k4p8k7kmqtvjnnfyin026ui8sft7ba0q36sweyvnf10pcuq03qrhsz1x3859rydmzlzm4fsvpvnmxsf7gop3tphm6ipmeb7q7qv0h9hnaf3h4inx7pqsd4whu6zky8985x2y3ah3les6sn89zi2rdv7evknhktxoktv1zttvl8rkibf2wp3nxk15yda4gkz01gkf0l99g4p54on6usecbg938090hxdew3vr641kaxhedfx6msa0oxjmvi7z25ylunhdyz5a6od1vpcpxxco2j88s1ajgm0yetuu1dw4nkkvc2jjqe24yg7234518t4meoag4wwlouqzkf6gz3p3gc3cmrp6jcvvykm0341fl5euy4wh540vj4hyi9ngo6sysv09ciy4deaw4780v2onmvlo5hcuizs6z44caut1n31j1dc10vjmvk77a7geeek0vh9lletkhqux9m49uohfx5z1ghku4cwir7716ufoczqc5684t6p83g3yde6vujsaj07g6hfjy79we0o8mckyuawwiena4arr7y53r49ik82bjfb77m06eefm569t60h7rkxl21geofxf6gy9a3yjgxymir5kfug46bqk8i591zor42i0ole5kxagebsq73iff6phw9mkmhabvlf5m7h40nx1rimsktsbofaq0cq3buzfx0flqtqa5miktxd7is7vlr4je5e9yy3p6ffbgd1sp2ueopmp8h43lq13kfr2h9utt0vfz9kerm6a71v9gm177jv2dugofq1rzzmlsyvfst5jp38ebugta8uh2i783k57uszkciejg63jyhj',
                proxyHost: 'yl7x0yji4kju67tkl1qk16ga4j89zq8d1aw5kzp8732gxmcx7f419mtswsy3',
                proxyPort: 7678706893,
                destination: '96p6vw6s85jq2i25klqzkaw5mk7p8tt4eigh2de4bis7aegncon5d7arxjyby693xp9zlakzl0hsvcu92n3yu1zli60ou5ztho1cge0b8d153o6bvnlwk7xx5q6j9ntmdiuagc0r5vk5qebrg9ajj65wz4q154az',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vo7n8flf17waz5gwnk0yvm7hm0157hafmjcq45ajkaztmjlzefq9dhtriyjzpjujdgwzmzcjh8jijjns9ukvm6ehqvb776dxrh83bvjkux26k9uisdvwc6uc8cr7p0jjgo3zckuyue2qsoddsk6zjqpnqmdx2h29',
                responsibleUserAccountName: 'jp5le7iv93nw4loex6sc',
                lastChangeUserAccount: 'w68uz81h2oo1dadv8jjj',
                lastChangedAt: '2020-07-30 00:45:44',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'ryql8fxmndmblhj26cc9qy0l728pfc3c7i6kikr8',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '6uct737v37ks1zvez9gl2qorcdink7q6xwdgps6kqg568ztkoh',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '26mo0tqmjzsatsb18jzh',
                party: 'iz6trcziy7kd7zrpd9b12zuiu51qas4lbzme1h4hhz2olive0nkpofa6rr4g8li175qeq1wkzg15gt5h4cckus1dda72g06x48g5sm62t9wms26xntxybc7kkrmfbidifw794l1vzl3hvuncffyniy9gf05bsqe1',
                component: 'psmmisczd0aiao4v6yw8q1xreax1apjip22ksgvlmnr328i84te2nb580g54c2wmubf9jszj8z3v61hcwc8dujcp6fis1nwpwd1dsip7nfrw27brmx91w7d7myxvflksjdwjamnf6j451argstfeonnr57y2u0to',
                name: 'j6uh0xmiye9j7j04nuxgs31t5lvoug130otatmyds7rc9bic7f9aq1sank77gei9r9bjv9oyg662g7mqnvygp12ngxt7hry8qxxkwmn6px5asepvx597lluiccpa6885sb2d247spccq0psfj13d3iaac59z9d5x',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'yak37n9tcdlmfszsfta70bo542jxzr1zfe01g8uufkyllc3th2cmpt30i8qt554o1jjtl4mwj7nis49xuukccgr5h8n5l93zbxnp94gmrpzk2f5xak4zw8mzlvizilytzysuxdpt8rbgby350urshu0muisl0xoc',
                flowComponent: '14zco02lcyeml6hwu0bl0s31axgxwh2zqdlz3usxmzqtz2avnr7jlvyvjnftbdt64eu6dwgwvtzcevb2ruxskh6ky6ygocea5nj3f1996gylq0f23e4nrpgiolqnqxg7e6zggc4aphuk203ti4svz63irzohszn6',
                flowInterfaceName: '4ohurw9gegairjfbkgtcevmmtu5gm3fytzcunarorwcvq3n8w2aj9z1v9xezv3jugk9oqe7vfbd8e5sta4r624xzyjc7z16vxiccsapa2og4sobxonixf9gca4i4spe1xyca3mk7k6tv3cicay9dltpj0jghop5x',
                flowInterfaceNamespace: null,
                version: 'njjbs7cpxt25rknmt414',
                adapterType: 'e6w35j0l0fjzl3bc7t99zcjnl73q8z8tpalzo6qs8ajhxfcvz87ixv4hkx1u',
                direction: 'SENDER',
                transportProtocol: 'ee5u9ezl0gqe5zrtuzt0i4evx1dmm44uq0mh8wk8316rahhgr52xstjdeqay',
                messageProtocol: 'okox6aa8139p6awaticvpvkgpsov7xhatk8gq9fqeaqmm6erkg3gvw6ivl39',
                adapterEngineName: 'etq8mtxq9k9p0p9qb426z19uqhhg6as0gvvujaoshscs1438i7ern3da3rmpr7objz6aziqcd5djdugnz58y9lnygfpmtaef8m9ijgc8pgqw5f6p425g10wgrfk903065yl22r3a1pzarnjrcqylm9c6a64a4dxe',
                url: 'au3mcpzs77hurcgyyzt6lb72oh66tpr8a05k5zne766j6b7h27i9zlbozhtysbwarjg9lk3m7yqg2x4vbx6tuja3pob105kpypjj3f8oz70o0txqa2umw0oyikfmhr9nicuk0gpapm65e1ntkkju5phk3kzqgz0dmqcen8bwctjwgar4y8jbz9souzuis0m1j54elpf36padh3ld1gd0t7ws1al54s6nf07zb8cxgt9j3prn6t46mhb8x97q4gzotpv23oa13mp4zoy49i3el6awu2p4tt8r96z80rlrjz7w8fft06nzflsypa39x4d2',
                username: '4rr8n7s4gmrfuzlsk64lt042uzfs46v1ygdh9y59iw5tnl3cbodlv0znayfh',
                remoteHost: 'ga3lix1fvi19alniuwxxg4hhtx2vxj28uxpsn6oax1ok2cxz1pgz0yym9dsjrr2xc5iezp79mkuitmer5madsylt7tzkyv8rh55i9mqbxccmmbm1jkvqltvxp22rtpahb8k1kgg69f1lfg1bhnh5uacoc5tm7az3',
                remotePort: 3819749349,
                directory: 'ju9n10zlhmzwzegz79fjug8cm7fsm86xnztjzspz7ky9znbzffvtmqayg8u7mg23qp8dfsdw41vzzxwct2flh5jb936isq3l0dpse4g0t36w3safb1z05ra1ac47zzfu6a3ua2q42or7u0fnahj1h30fxx7vqjabvbriye036w47sx5bi7ku74elkbfxynreq7pcgfw49krprrvxyrhjx6nxkgkibr1wfyj0jgzjk2m56fc973exzt7mlum57jyl99mjec6vkfqch9rx2o2r6qxy33tptnjez5zxhiw4ro5c3unmt9qt22kys9zkimpgn9egojzvyqgva4o43l5ccj096rcz2fn0s2rzqqx9yvkyrlp7txoiyagq59avke6rkchy8p3pf8be0atyisyyd9b7te47jw0ar8cgltypg47dssem8evkm0p2bw3uccqfe4ddy4fa9o6sb4n6lbz0m0j1o3pt1iv01uont08qo1zi0cst17skrynpdm5t3kogaiz3zhrknqkgq3co7jb3p3qz2bpdryktabtja55gxqc89m20ddeuh8zwuji0rf15n21kx68mkcq2xg3fidw6ncgecmk28mrbftx8jh9sgvqavgswy83ltbqyqnmkt5456erfh2haf3zzii71tz1a2htpyin4y6qmzrlfom0h79i7axez73epbhwvt4sr8z8khfwpd2lpb0dqhygx5fuf4pljuuw3fdeblxfm3cwf8vpepzuzfk8khoqqsvtf2f9bc6oxccp8wn42my2s0gvmgm45j4liq5gv2ld7vww0yk6pks4zeea5g0vky1bqkzvfmig0pw0z4qxczvn0gbbwzbbdvdi5462q1alq7dnyvksllhzzsf7p0v7bjadb4vmi2tm1lrqa56jbnrg72dsbb0pwweuhfpzwgdna78147yw6h03o7kgrrqajs3xh0u79413xwbfkuwn9rntojikko2ji9mz9j1xn7d5gzm23cslfatgmh5sje56bvv1ihr6y',
                fileSchema: '88f8rkb5qtkxz491zpoyquqg5qd6q23vfju10ln6en8ls0qq3aa1blvzpmyk1qn979u3cqvjvqhgsjocq7rreblwqsck97cxhlija5hecf4xxikmjx4o6g51g344wz6oocabzuwetn1f4ox3i1kojhe72f2450if43jrbp2pd7txcz1jd882e5v8v9nwfbpvw0514taxsodv77qffce7og8ws79ns0cw3xhlka2fuflhlbi0bnnu3fh3vtmjgk9lqw8744jw5marheeu09qhn7kzuavjqyyblga2ecgt4q2baihdsjnw5rw3ist1iqyq4dyq9d5jup43mfa61z6ngbt94cscssiiw1jno6c43xfkzd98gb5efjqgys272cs6qqsn4hg4acphet28uv7tcrpc09vr9jasvalvkz8slgyx3qya3s2hbp6i72hc3r4f8agipj99jspsa5xajmom02gpa8shkr6qhbgbxg82hm2fis5pkfor7ja6imxkbi9g6vf28s787d6ytpeg10cvnjc6bk45amn6j9ymp6ivhh3u5myiyfy8vrurbq184g5vci1dnjckfvqfxyvgte5hgnv8bh88z7j9akrhmgz9qzujiyzffcy01aubyd44moyetg72sdjshjgo8ejhxz4ht7xoyq0z8eagbtyiv6fsd33z66qp5tvor26gcd04ehcvcqf0wdzqtoelrf369mydibo5ni8c8ph5pnnz87u2vgiekxk3tqndvs3g11rme3njjdz2olyqlkncyc7iiqxcjwqmc9prkyiltg5kqeo9nh6sm29bhjpv9l9u1t9acf1v88s3gada5x58fl8ql3vs118dhc6io909cs7oahw9d44bqir9gja0quqm15t1jjkuon8mqrlsi52681vo6vzxqlabd4ly5bd7bqltxx4ld5m6kowt2elgmn835s84208nij2qjd5updz3btkvrzc8st0hn1gn7fyeutf68ik40ihbhz3olz0rs5l5slwljyab',
                proxyHost: 'rccpmc6mhlbs25hbk235qu6e20q7t1jp6tnzn2sgw5pxkjxx1w8ug4n8qpib',
                proxyPort: 9201628734,
                destination: '4kzerpvoioaln9ki97nluqsh0s9z9orm21iunal9hkp4v53cqeclzfoww72ykg2udgbpqi2qxb718iliplp7jidkrj74wr079stwq34jex6fex69x9ncxjgp9o6dmpko1uy1c3npriog0oojxsnk4ss31a08wjvz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's58etqv6fsejjvlbqxkntb5yzivlasuahv01cuibtaudq95clg033peuebgm6t02exio1h9tztldkv2t8x0cnpnl3jbtl2w1kv5cs8uxuorxhe49h57yx03vignb7tknwo3ov80b0buvm01fslt4g60qomz22rfl',
                responsibleUserAccountName: 'rxpaydvdwkedffs5zgi1',
                lastChangeUserAccount: '3qvr8ph400lpru9317u4',
                lastChangedAt: '2020-07-29 12:56:49',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '89rfw9djcemjtss0s6nrbg9x6qt96a8yoltzgio3',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '3l7lg78uybqbh0ql4yglbglfr3zjr213sormhbdq4trzu7bmjl',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'rzf41glj7rwtobqag6bz',
                party: 'hvtjz8k0u3xllnj6w5kuckwtcel7ose4fes4eml9lwzobtf8ztgn9bjd291grt75aprjc0tysb98h8m1houl52pb7jivcvnqq5nxepr89svs40onwib96v9gothpvfezv0u2om83v73k1tftoadzmd3np7j7ipox',
                component: '32rv9onmalzwmoo8d4n86s64zyk7zl1424ytvy2npsvxrnpykgdwr1r5u2exs9bsbvm7mj7dnk8z1hq16qow0fgno75te59wsvg2fdmqzvep0fter25ez1bcnvi843sle02xulug7ipaixsn8r861ztco3d8njmw',
                name: 'rxv0d5clyoofkwezpwm8mqnu7ysi1ab24m6tc9t1mtx0j2s89hm60iuar1f025j7lplvx8j8co83g7ccca63tazdki8woh6a061tyixmnk3bckuaclcemr3s11tljhco6opppk3dkkpl14sqtx91w9y0sopz37nq',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'e7dgz453p1cjc8tyx67hhmf54csytirowaohq628qfrj8nl7d2wi91bdth5llafcx6fc92ih2rmrdw68t36pnbx1yn66eicrtjyn7yqcily55a91nyrwjpic52pm1fp3d5i58lswsvlwxo4ni5wk0ueapx903g8p',
                flowComponent: 'kxbxr8xakpkyyjbfqcz160rf7dha7xtdtytyjoxtbhhlffjezz38kj71jc9dql11cqmjlc2wf30262cevlzwwn7ud3o0v7ns44xt0mo2hudk5hva0jwb4lf839jzogzksu0frdbfph4j6ozy9bnvampwsoqtxy5f',
                flowInterfaceName: 'cw31oq16yye0kv1n7bipovdbn982600tz6fgdkesqjzvx3mcun9d74cfy39iqnvazrjc0aa7ygx4my77x9qv7ttv5jn6og7aid4jjh0fdzrv8ihaq1srvgt0s29893i2m82brfch8ygq0yv0lhvuijczl9fd4ky0',
                
                version: 'tz9sztz0g3x3ma62dzsv',
                adapterType: 'wjti3g6u5dxp42cf2zqkbackpsex3cbru3xsup7a8esbpcluujyo39fnf3a6',
                direction: 'RECEIVER',
                transportProtocol: 'kk2kl7hwl4hqqkbp4g9zcce97gbfsjlbupdf6gkb7xvy9rerqij03izp01o6',
                messageProtocol: '8rw0vfu4shmlozt89dqy0lab5bh763muvpje2p3aujazhabe0ft8ewqm9tub',
                adapterEngineName: 'u5bls1v3ecm9jt2quaa54qepzgbazhk89pf0gji3xdvs86vrb2nvkr809fv4nprbirits0u0cmnvjrajika1agby25xpyamj6jqv2kcomn6p5ah7u2g1985hod0r98lx83z6zd312ja50n03fbxo9zue48if8jw5',
                url: 'yslowewp66v3xs060h1hws2t5thtlhuo8qlle99bhdjpc0mdcdm2a0cjduawopc7w9ekigx5z5mrek7m031yku1ebs23imun633ektfqnnwqxuajoprptdkqo68khsccxfc9r1va2qvo7wtf8mngresduqqxnmuycn63qdllld8hanh44xh8s6bfzy94pgt23a7x31uq4vy7brqqup62ruivmw6h1c5wdk84516fv0o00ejfy0kfotwrfo33lrvnjq0o4455k0fdmx2xs86v1nuk56urv133j838jy60tcvwz1gc78nfzqjwanzb6aoi',
                username: 'ydmhxv2dezcu4y1p21oeoaxmzv5jmdnddxk3ua1ipl7hg7yj2f8ng8nzrv1v',
                remoteHost: 'ay12rpoxb9lsjtvixhqo9kl2rw7e3t52kk8k83mdvum2m1z5hb4vjlf3g96g4u81nq0vjqout465alu2h35dh25ctdybcmebsxq08a1i9qtkd5so57pjwojf970l0b2m4vd0gkhejtp0cl28l688tcz7jkgd5p0i',
                remotePort: 9713452011,
                directory: '1mgnb2w2tzw1fn0hkogq3ttbpmr2yyk2ypjnwmsnlpsktbzj4lv3nphathf92kr56yklsfol0hxlfaepd338xf80j1lqz0lvby4d09kfpgv048lyj45cn42jkx2w3crag9th4ym0qv3h74nd7upp8ryogqkygeligk9cl0yyxd12o2892z537y1gfxsn477vn52ppf8shnwtp1eh1yv0cgop0pdq348rijccrsh01q41qn9lsip7nbxn6nhdkvmjbd83i94st0sim6yzwavh1gchi4ig298hfcj3kx0krfaaixrra2gqcysechj7r8jih714943bqpzrlteao9f4qnhn8xhrrbx9p90grpjwctxh208a9pa1c2bqu5hj3lrx1wnmm4rwjgk0jcz9vsizrzttz4g9907zfug82ckipcxf90p30lcswfvuvh5gl3ut2rkhqeeaskrjel9m8wtx51gwv7tizj8hdy69jaoxrcdq5geqenxf3ptog68xagkc9s5fwx3x1stdl9q8g2tatskjmm58ihr8alkawt6q1b3ygmcwyz0v3rvxbz82y4rf22df1gjwdco505ryzj91cho4tmp8camlzo76wozlogcl8hp87q4j2i3cjaqql8q15597ioqpmsl8thu7vrmxb4zttc0zrg0f0u15cgwlns30e9b82tiq9wbjb8sdgq1ddioo2x1im2pdh5eppekpte3vfw6venqcbmj1zw7b9m2x2ap1xpgfzm0d9jmm29j23xdd0g0jhwf0u7gtbcrc4kb7uxwhjkotxrtayhma3v2x2zr5acd48n0untbiigke1hqrvcbkmzdnyaqcu8524zriqfi5ryku69lg3vmwwp95sce33udy3ebep6t19uz6q00hppv2y08ahgqmbwll3288d4k87v4p4annvfzf42aoecumrbd3juz6pyhp24scpl6f1f5an1o8p6c4jteow9265onjwhhia3okxajj4hkhcklza9rlsauj96k0jxl6',
                fileSchema: 'q4hghixyt09g4x2zbr5qc4deb92qkleics453gzow11nmnr22d3w358qrvvvvme6sl06j4vwkwcjm1c8964m66q5pm06xyrd0o02lc7ymvruloxj2liy5r84j0ecsxr27dgtdalekdw9j9yjcfn8e92eice5qez7ncefqezmsze8bqhx4sdpeb4gdbdfd6gxvfufbhcgvhd966prkoatda3gs1lbtnb5phansvc49ybrwwh60mfy1d6qpw8xc92adueoohvbl3iklferxfqlyaeepn0r0cuw8pujvbc10d2siyo9op2ypijhxmsgnoo2ddgsc9u9yikh9qskv4bszunrsu4hjhpu4k81op0cygxg3ixvoh6yv1fy38jha2bylbact6r7gl7r0wzd1ydfjmj5qdubk7fiws5c86wpjan32bsnlps4zcx18h9f195rjozhy1qvt6s32i90habppqs519t1ktl6n0s5iqx4saiayow50a53n5axkcah0zay0g7es4e7mpfz30ke76n02u8nhxbn0ors8fk1gv7vnl78nfvzwvxmoojgk9vbtxkfz7n6sdifpn9c6lc0n0py0pi799h4jsnnlw5jg2n640kpjkgop0pdramk9bst4mt5fmpl7vuanjw10bmlclyal28pbg5dzosk7sozd08ka5ofewpal07zntnlkci5a270dnoq2u1ep9s00bpl9z3tmmuofxm5sao6plutiah5odqk2hwqjhfdnxpgjuu0dab8m8trtlrewx4ltcn6tlj81ntg5llp8jn30lq5gahwa7stud17puqsxdwk0sxqf90fi0o7tzotqm9lvngj8m895n7bgsu9reyevtuu90h8gxdab6ngzbeqompp3qbwccmy3fds62oz2jyjjkqey6kpbz1o0yym7ps8r55er7pxir3bulj868gai5o0d7odepdeukz0ou8tv1of93rhxvc1wcnmntl3313aqr0f7or0hhnm10nfq938od1mat6on9mz',
                proxyHost: 'do90oy2culn5txx5nn8w44d55gf38jq20w00rz0nvwxpcb5kr9i2nzkqqp2p',
                proxyPort: 1243138145,
                destination: 'hjoaoxlgqajy49c2f4ojxygukykleo141wany9k8u8qf4umj7br9pr4nchm2gljgaly5rxn5x1u94yofybgwyyjqbuh5jxfsf5uvsfy7ytzazwdt2ir9c5tjrjhpetxq76xkzmzp3ncm9rtkjdu2wp3a8qcavdqt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q3emsyugj8w376vcpjyb3459zlz3gw8vhb9tgfju7eqduzeu5rxgwv4fdx8g6zsl82j0ftvoj9d9q8ec4h54ai9unt71mkbmntjhks6r56ttidkknvafhg18vn2n92a0w35fkn9sqmi4d8a7tnjzb1mmtrfzjfge',
                responsibleUserAccountName: 'pqd3ly3jt3vmt8cs1i8f',
                lastChangeUserAccount: 's7kf742iftexukv7wuya',
                lastChangedAt: '2020-07-29 15:56:01',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '1jkt6blwpdmxh5a2od1tifcofua3ftz8suw3mu1s',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '59qs8m6zh26utulg6vi9dlawm1w5jhfbs2960n4ij9g2nzalde',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'z77cgzg7nqdp6pst00ut',
                party: 'tg9vsg3u3wf5p064nij19nqr2o9qewp411jbhz37zkccqc464u2dztjn23jerkh151qmvz45ej5832vt7b0d0tqg0ov3t88h64vg27jxhzd5a5rolvwd372dkzmbi7ywz2adsjv31xzghyzjkw4o37qeoahsvi03',
                component: 'ogwd7oyphkdkntu255xhckxq88n4qsdsl4pe9dg1efho9w16pp6utag8lgphl5hpgo9y3zr8lzbju576slmlmfq6d27ios7xhgipp5n2atsv3h16okmb9wbmw1ozx46pizfop07ehy6kxiuzj1chmb3ty89gbdhl',
                name: 'y4781ja9kcg4m1kj8pih71027tbx4p53ftogbqxlx93pv0tz3166ilgr5lnvagqg76mn6b3di6jchzev1xlhpttyt8qivu3xsq8cxwqkahfvka5835dlxwo0bxzch9l286jult80bg7s5mg8vbd1jemjecbxnzll',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '3ldqlq7el3tuuc05msu66obt70v55lyhevk3ts8tnvmkdiqzz7fwg2umcd2kdkf5xnvyhtwc1daxyh8vgwa4t2otr69jwoovd07hzbytoc9mmawptuu5k6u9eene42mb6lyeh2lu7gya4tazl3oqxvbqgc0vf91m',
                flowComponent: 'gymtmrflibmbbfnro2viqmkd0uo2r3ypyjs4tjk8i7htej8gtqn8yik45equxq1gzyxvco7bjple0ng3qkk4r3yljfvvi9lxzdjw3z2dd8lx6enmso8pmayb7eggaz1pssie17s9acdlq4i3f2puz9esbqkr2vsh',
                flowInterfaceName: 'o1ltwbj4tz3ecgwb9p0qs9zy24klodnrc320jhcv4j60eons63v46rxlo9yxusnmy2sgb9jfhu78rmph5i1705oxpxj585ex2vpn1dc67hc0xascc21r1fcml6vk3b53dt1ayenmz0jum4t3ugtd854p0mxib1m8',
                flowInterfaceNamespace: '2xm2ztw4n5cxaadicrkt35r5ieede81qhpbdu0nshubxd6nc9mj4sr7rx2rsars34coog7xkpzwu7maekvuhwa55ez83narw1ql07j2a1syrqvpeqyqonqv7zsnimp0zp169sz9lx5edsoas77qlk1gtoqste64z',
                version: null,
                adapterType: '6q979ytrtuq3wr84gr3mgquhb6m0ufie9900azt8ivm0zfpr5cx1tk5m2ss2',
                direction: 'SENDER',
                transportProtocol: 'xlnww1g5d5vcm5i0qqnq5t3w71a4xg1vg6rdddh37iihqp5o4s76srotxaz6',
                messageProtocol: 'p0q73xwl4xatw5we7nnmrwqqhmp9akshf1xonkh11rcrx6gcq0pnzx2ffdu7',
                adapterEngineName: 'wqxlx0mx6qm1n7axrp1b870yaao83ju1bw6px1gyzln1klhlssv2cg89tr6vsff6juw5q6jbdn7wpxegfmaq5s3yg6v2gz36cedrcamp791ypezsccnwzsohjhqbkun8z5tkz253o31jxd7kcqi2md6nanby695l',
                url: '9u7nmxdtt2hfa4aow4vcn7qoyi3wegtw7xv1d2tg7kjo63x0zqk626pikj7t891ii6x4qahyv4v8hg7vrxsj5jfhjkb5259r7qdvhm0qk8daonaeqj2svauof5oa73gzzarnb9bhwozkz32x5632ex4dgeyaw10ut9bnfbqblfiznkuaj7synqfzd5s6j3rmktgsckfgakvw64mzajs61xu50k2ny6sarrl8fhyrkv179p7ua0hq9vjvckoj52rmpxc932tn6v883pip6qsjfhoa5e7ts6b8whmb5v559oknxot6x7gelrg4e17guvu7',
                username: '81q6d9cfp2vhrxjrjadu9jzdbsdwhamgf68yelgtjms61y2zbehlv1iwcda7',
                remoteHost: '5ro6n3klv60raxlo0zqxbielcxnpk006sfdlfd8ycirkdiibhpmn3jb57f8xj9kh4kag9wkkyshgvedueoxt0yci7y957zr81wactiav6vbq00f9g3w5l7nrejq1rseavfkv10xrq7itnvf73elhltzr5xvlab70',
                remotePort: 6424732306,
                directory: 'k30w7id9op5h4t5gjcwq619c63ro6sdnx5mp8zhz3qpf6iq70s15c8it9hnpwavgw86mp9lu8fuyurygjlshvlgmffe5m7fxplv1k3eziqp0d5ajlzup76mhqq9l7bdu7grd6ehmon8oop1da54h7x3m617k2c4oc63ngvztt78sny0a6t4cbtngzpf9otbd7adp2bz80pc3h7ptjzgz11bq9obmgy12zmqr2u88az7o6k9850vbdw7my8bhz7iqo6nrabjlwa1mcxlcf9lqquelqfp05i4rlmryszij8namovoxut3mcyziddfzkwwdon3qcbez6e8p2qbgwsgpmrw70a5w0qcctva9ng8okgjneomu8opnxc3ym77on1s5wj8jw2kwrc8ekvxmpww3kjiu9acx5athyqdrsvf79xsc26ilz5hzgy5bf37xc471f5o32kgswsnghc57bcbpk2feoug8fzevv6h5jflql0vbvfl6d3n8lxff3rnduet6udaaorzhh2rmiz58xuusrc4eo5f4r3v05xi9d3ip3nnrzmuf4twh3u8dxynodbhucuxdq20gvdu2vz1lpwqo0mxkbelcvbdi6tglj9zdopyx0szhg9p1ep42icp224cu1hjsl3xgdfs30oamjdhjlviegxhr4asmr3r3mg3thb9xxkkbw854xoxiqr9mu6u86sn6v6blb3qgcrzathctmbkx9lbyw5w657nl1uregwz0qdomgo7ewtw7nqle1f33hg8dkyuzs8k7keiroel7tkfk7cir7cmjdode7riqyon2fvlmfy60gb5chkso6wbexnk9f5zwzeqbevnqfrxk9jmimucx163me9kwuijuzy0hnijltzm7gpkujgp1u8nftyejvq7tlad9ajfedj9qt8btiuhlkl6fggh8edcbu1wse57e5b8rh5iero8jjm89irmok2ixkj8yo16ygcbl3m7xxkxc8wxclag7fl8bshxuz2cipj2em074mjur9qkp',
                fileSchema: 't7ds4uz06hk86dy899107oxhnmkw76fiafx5t29ec5lw5joowrji8g3cz1ewweix0z7rh83lxs641olose9oo56gco2028l4kkszrnr92iirpx652ikt4wxilud6h360lr0ugpi4m7t8t8i43e4g22d58oyglqjpxkut9h4m7eh7dbvzmokdzxmnhngylqv67a664ci6555wa57ke1nx5gdz7s4jxoxxc6oowmkziqc30hs27ywwob28skxcn5mdg8riqqb07kaqdfq49dguvooicy0pkj85xhsy8p9hy91fx1towmp8yv0oq93idl7ohgoq8v3f755mmsiof0kq9hgmq4059g4u4wmzonlrgke4gbxkd0mfmc36nuen62ae2iznj8vqycyu3z1m2fqf7e62adngnwi8kn5y11moxg0cnzdflnch9k5h80ykclg0yqkyvjd06npnvvsizu7eo23lvb2tvz2vov8izo433lxnjqq4ij1jp5n5mdpg302nzor7ur9hpyf3d3wy4r1wmsvob7svuz06ndkuom4vy05zfzbzejo3nc5386nfvm9f0gqeuhbrzqc6rkgz40foh3rhuzgkrxzfbhk7560ljnqh4cia1g0306hvp0v7joms9ivpbtzule9gilk0675k9e4kpvbzl1a7fdlqqg1nc5nogryq9ry1a3774gs7gesd54eejqyw6v12tl0ilg1ihqt3j72ofcls3dz9awaa7a1hanzoj7sqn563wpc4dwaeo42g8wr34np5c1zw1nhbws3v3fkj88n9ccufpll834iialfrd0ntpqvdhnydexoe0072jz4n9snh80vmyb4kumhq4qs7j8h57i3z8pqy5qhbcdflgjzxtwgt8w1m1nnnwkb76c1ggw6qxwi2b3foegxzgg6nbyrrue39tv20i8ibz7e2ew0be3ypw7v4h6hk166bm2ly08fziddowba5s6oh046q8jf4b3w0jzj1oyqoda54wj7iywushhxjmdys',
                proxyHost: 'kv895pn664avxpjyb52ka42agftt80d1390i5ti9hcv95xjp1608ns9dylxs',
                proxyPort: 1166689223,
                destination: 'clfoxdh4symih0a7daubka9dfs4egl466wq1v0ad5ef3odickzl1ctm37td4ibji47thuzxxu3mwqss0e512rrvjdsfqh9b4kz2lsrzt9ijh1x00fzyhgw1porqqf3w16nlr3s3owom8sevu2xaeihadfdzm3qky',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'saqas39fa29d97axpv15cd8v3a49q1qw1bzmhsjri0apwgt48ko6rz6likewwxhvrk6h8z99td01xv989bd3oiej7rn2k1smr89kt7lzd00mbzl0osv6i0a0vq0jz7rtvq4qbhk300v93cuzmz1hat1ftggqis8q',
                responsibleUserAccountName: 'r28fdl9oayymmojqvetr',
                lastChangeUserAccount: 'bcbf52rs21t4pj0vd5so',
                lastChangedAt: '2020-07-29 20:53:44',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '5nyl3gbva51n2aux5c5ee3bn0rt0spebboygi156',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'he0gkgfqe84fiza0seeau6a23v0szf7mh7wyg3z1rlf29gtp4y',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '7eq6m1bcw3863xwi8uce',
                party: 'kefq1mtmt4tl4t5lg0uck2qlr1t2kmhk97kzol324bmww37qk14faeo02qaw81q4qz314bus0ak61afaczly28pyyywwgo797n64br9dhrw6madilrenfmvk8xxbvymn7us7e5t4wjkjv0x4stfardu3i32796fn',
                component: 'm2vvfragdis52kh487jg1u31xcmrlmguao0cbq6u1fv0qqwgaatb40mxmxk6q3khln3qbpdmkay596jcm7ezsaelyrs43c1a4az5hm8q22ja305uzkd1c2ck6saegggohrpgz5rihbk2xsigrey1ba9ttv6rr2d3',
                name: '56xlpktyavzlzy5qcyrwu5nj8rds1g5v4x91wi51odxny6c5hm8xvotvlgympzobi0gjkk8udgbavi9o3rbd34pl8yq1e7c3ekzhuo0sfdx63b5ngxsgktq8i2czc9x5duvyr798hg4lx21996o3ogq64dg63pw7',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'vpv05f6bht80oy90pi4n3aiwnpuw3ow79o2scf2ibyv3qaer2q5n5810jpaem8hg86kjxmgnyyfs30jkonpv9ftecmhh8g8004apa3ly4ojr3aqfwpaoak34hufs1wrtab5psh6i26wf72qyghf9tomdh2s05f7v',
                flowComponent: '8jhs7wzjofqcsm2cnzz876q2f7l1d8bk7qe6o1nppcqohi8nf3b6lmblbj4ewdfpyrmy6xwu4z8e2h99bmegwvhp7vl2o45ya8kdcscnpp2zprnfgq3ii2tpzx6t6m0p8od7dwzu0s8449gobbxriqobat6xud1h',
                flowInterfaceName: 'o7w9my1ge3bysmb2mg7e6kj8gdnvwci0f8y65nqavvvwfivbctzo1jjd6ia0o1qql7t9ozienb5328nwzxuwxcwuim1d5tp1mvev4ix4hs9s3n4980y83vzlh42zxmtqdd00yra7b662cgpcdv1ojvkh5wrrshu8',
                flowInterfaceNamespace: 'ury2vukxv7gn4508qcp9gszdo5h0n7bdauhn85gbawd7xrrt6crwya6c813s67n9xnc04dkd1dvhuosufjboythr1wzsqxudhwkmj1pobp8hxcttm59s0n3fyfr1a6jdpg8hcns2p7h2tfay58id25isj0xjxxmc',
                
                adapterType: 'cy0nyocm3is5y9b7kdhsqx94v5vm5hxuhuapigym9x7wcjjwuikal16ac5bi',
                direction: 'RECEIVER',
                transportProtocol: 'x6u2tiwle8if76q7biqn6dh0z6j8ith8vpj7kjyh2qjiyigyfc39kr2axnxj',
                messageProtocol: 'xtgqipc3ofk6lqu2s3vugyx1xr784r61o4ye19km4wpba7gwquf8q897n60s',
                adapterEngineName: 'itkmax8fg5vjxsq2uyx9sasu1xvjmfudspjegu4iyd16fuol4u8o4qce1uivd01n0z2szu5985xqcs2pe4y4ko3rfu0jrj90dlh4j7orphotq3f57800cyhpdune4x52ji73nz1l5zslvbphrl9ffdj2lv5zgihg',
                url: '7v7u2ny25pjde0fpznplfxm0izswwibut3xzbo768030m3l201cv583s5kl5atbaxln3nif89ko7dd6y7a9dhw64zrjl16o90owyjgx081herkahr1w9r1bvz843pg1dwpxlxrr9h2ya4r4gz2oqxs0zsu6m57gxm1o68ov0vhp35jbjbwp5k7wbs2g5m43895y46l2l9wvitqs9ddg6xpwklx5yg0pvw98thzoct9qi7mplqx1h24c50wleubuqq8m5jc0w88gt84ys6ffua2nwjcsemrtoqs3xpjmk4wa7fwf1qcvzzsk6zc0z2zuu',
                username: 'jwni0sh9vs1iy4czm0sg8fze3yazfavaaa9t4f12dzujbuouf2vjqc38i2yi',
                remoteHost: 'ltmy9hbi62u2si8t5bk8b4vehor1nza2fgq91etd3ng2b5xmbgv6x0vci3yah9azdakyll4su9vzjfbnd0ms5lmjgdh0ji03k5qeuv00pl7demhaqe4z3z0lkqwpg8cxt0egc9jfr4i3ooduel510xrkvezup3nu',
                remotePort: 2300952274,
                directory: 'ygni7qnfaw7ghem7dyekwjckslksxicxuaxzmr7oq8lp3ftszx2mqi4bm7vykjy1ih50adprx6qw1rq1v3mmexv2ocsidhj0p97r9fc8eml3huwkugzbx2gku6f8b41v4hqmq9ovqjj1xc41st5iaonxc1hin6sv011v7rpauvs359u1fnh47q1vcvo7xbhilmy9eh5qrw2q2bqx7yyv7on30n0yddhb44a0oo0njx4m8jaxyurlkvef539a0r6vs56csgh2mh0261uscndjx7cttgvln6z37zfaywe7hbxsk9nhlap1d0dxs9pdd5raep6lpue0yomsj1b2q2wt5nr58jvfwa8bqh7ep08kjsk72gpqpxwlywhbolvx881dr79t9n18vmkjsbnoy345ddvbyucezg124hnt3jldrobfv9495ma8i5k4dmupmsr5w7yztgej9u6fia4hfxvnx620f1q24yg65jfe9x5ai9e2lgmb3rmaf0idcekocup9bu3ljcwui5pvi1xpr8wvdfx9nis4f2fd8dtj5suj6jk8ir1hj9ofswswnz6j97rhnehky3gj1lbx4eegnhbln8sfrm7bjnvx5bav6j98vk2vc19z4ohirgzuuamaib3o7p0u2fz5quhyf3u8vjl8tds5fyh27413e56xupn2o4z386dhzh3qt5qlx3axzwbv3zsmdt1323p0a4549he14lfkavpkqwuq1p8ffxjov1lihnglrr7oyz2pncb0ektzeexnpbcmjgj6k1rlccodgr427q183pqsoljtlnfk5s3g8e4ft6kzvtafoonvzved62zhuok2bupwi2k94fq53z22r3b9nuwnlcrwwoy8umfkg5n6walc79w6zwimvm9ullnap9eyk2f4rerxhnljfpgwxqs2s1rjawadc4t8grkcxjr4mbpmjzb7jbv021qa4dg1te91xyjuadpxmbimsbx553mgrl7s7v01g67br5inyf1oxwibb5imtc17fd9t',
                fileSchema: 'g6t88l7bjd8dgtsh8uil4umrj63nr5ldxkpd0wvfvbh2ob5792h2t0c222ogs33azzpvlc65q6i6f6zrro7hkippa12lydx7c6q124gumv62aog4tu18dkg37mroq4g2ir8wal2h1phqx1pmm7xbmkph265gcf533tn00woezape80d9ccfzdt64vn7zdkqpdimvtz44ei14fg526qnhhvqib62rls66rved2qsyqzwyvuc82pvzp8wdwitgr00hjey37x205fq2z8pfa9iav08lvc33d6ci1iy0t3qgq98xesycgi97a7jzanggdsdsw4w4pqak3km00s87um4t0va5zidjrh4lc2simh593vxk5uuhmy667okwm8yq2qv8dkeowjg3eraeou3pxisl166s9hbfkd5j746kdf52z1ric3i5jx8vxjl04efmcbuflhn2da6eepgk4yzulnohwj00obkn3d267ggizosxv7r62fqnfbst6d0kdgjzpgcwie8e4giius29uly3d9d6ilwso65zivtumjc3g7bqyyc6uw63s0yphqh5wec9y1w2ahvvvt2j8aiuk5fg96p5fl9n12iwdy11rndxc72uzkndq8hoti285oxn9pbmsdscg5me1xgqy9c7ebs1z74zwkalks5kdb1xsvhicvxxvrd5tkit49g233r0yyx5kwbwc35re2ap1jvwasx4d45jymc2r6qt3mun8emulcw1dlq6h5oh68druqqfm4x2sqzvz3c64hmr78mrz1teh8t8bxcv5csrr9p9jkqggusxj2kfb4rrscth6ni44znwtzj6e1xm228hc2ocjexv1i70j2q8x82gzonop2o7bxin5l635xwra08sf1uorl9hpqz00pa76rm2xds1nwsj3drtijelz29p2npwg3sujq9q87qmsp9ieghj4zcp9312anj8rmv3dnorsnh99m0cx1ka95wiz0x6nlrod5na3zmfhflzp49n36w291io01p2mt7w',
                proxyHost: 'svnxg2ogsu052wx3lceoppm7pbs79k1b3miyaroqtfva4pwa46724fzvgwos',
                proxyPort: 4752408126,
                destination: 'ae8lqrlng7jf8vcmyvilt6c3xi8bmh549x54a1e5sysb7s07z5ma24h46c8golmc05zxe41qfwu2dk176fx346co6s5m7xboemz1tydyxx08990d0rhimdxxa9fjhihupa3rdncpfe4p9jiu5fyn6agb0xx1clj8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3ed6li6s1mm0h90s62jqg70vt66141zsutzautv133yz0gc3eqrylqzx76w828krfzultbt0vjpunnpfo3226j8l6dn8pbx9221s3rnm08omvw56w7m7u95jclscgd45l71i113eguub2ud9tn6oyn4panbu5j9g',
                responsibleUserAccountName: '9t2vxhhoc4argfqaqmie',
                lastChangeUserAccount: 'ld65w802aobri65mtijw',
                lastChangedAt: '2020-07-29 11:24:07',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '7zqvvjtr8skf656fkufhi6nwrw3qsw1u0m1ugr1x',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '22w3ixv1rz1e2cpbptn0s17r24p7749fh44wq4je0quc2x55tk',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '3l1oqmcvyvussil9wf2d',
                party: 's1sjysj8uak12ck1fdlgzayoypvf24ehnfz271e101g7ls13zxqpw59ed58kwwzzont2af8iyorsse75hs7wk8o36rgvkcpchaf7wycgujsbe57tgz81dqc11p4gtnf8odb1kfqyfibv8tm1983911es133smgoh',
                component: '9i4js7ezu5y93cusjqcblowjj12sc2mn19h5e519uu0obghr1xqinxxzkftzwv4vg2rb03clotuumm6knskq9a4j0b7ftfepay85shcyw0bqzpkqa1c01k1vz8kyhegh9xmfkedodtr8bs27ouoje8nzxj5wh9tc',
                name: 'jy795v5sryykps9tk45c9ymq7jwrwkdmshokrrnj9ko280euly766261s4f50jitdb4pf2v6mx52zynrwg2y0amkoscdml8yx58q5lvz86c61twnlm61unwec19rzavalaqfqeajn52huobdy0w86k4jw4rld3ca',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'cth0b3fton2zvlmxuv1cq7in8zrro3upbiofq66qs1a0sir0izr4od3qe46tts2wsi45zsv1wcf0hs4l9r53o4pzk0vd4c1f9tnlogbfntf7b19fnxxtddrr1z57ajjel4ufc8jcg4zf8v0d542p2bifeb3klmkm',
                flowComponent: 'h7y9tvgljmw69ekj942bs3n0dvqmzyq8bd3ys7vippb1dh6xshlx2bmklurz1fg12j35y6ybv070lnicefk9310ksu9hcn82hxgxkueb7la33dewapk6z9u24dmgpkrow69y3l3rjjxddrk2o954g9zrzbbnyfbn',
                flowInterfaceName: 'wt4xae2sabtytwnzbpy206adgrftyfyyig18qjinrxljr4zedbqaq2w9ncw2vq5apc9mt9v8z2hm5la7lmdy7rytwbyq911edo7tgja7r846o52nx7qjuor0504evb5slmx0b4mdf1ss38yrsjnnpeeyejstn5t0',
                flowInterfaceNamespace: 'zxtgq5m70d1mby6yfweagczl2h2o214154jf0bww2vp7mcphyxijj0f4rt3rv8hq35jqmz5xlm6aqfxs1sasmouomp427pmrgx2qx97b489x4zwcvjpr81ruq429o57mm0x7da0li1hn43o1859f0c34fbagns74',
                version: '4gyinyfxrh9nojqt8ylh',
                adapterType: 'l2lgw4ip06danfh0b7mg6sy4nsnza6a0c47vq5cyrz2hyh1e3ozm7kok9f35',
                direction: null,
                transportProtocol: 'lhvidqztpsg2x394h9v1iaf6ydmjeipe89ifslxeh5mazm4hdte4y6e5tnhe',
                messageProtocol: 'gj5szc0tf2xifidklf2tn6uslghsrkwj833acxuidg5wvtjgmcvt40iogx91',
                adapterEngineName: 'n4pvm3roi3a2yt555j642i078hbamxij1ei1zcvh6de46cpuc1nomcz3pgnrdzq86pzqzrp5q0iex9h35424fpp7zxaaph498dwbb8a7f7dzwy2bktssfigv8wp7bu18mzridu2rk39qeejengyocdcfjqbmrv9g',
                url: 'y7s1h17ysmdxjbb5of8bx6w656j18hiz1s110dj8t7hap7xc7w1umkt3r44xxgqe93s36f53zbrxk6mf3neeyzjkpm4q0g9vzn8fj2z18r6jbw6z9n8cgb20r038b4vq3fz0uz5tvweqfctvzoe6gpinsgkafnly3yaua14t094i2asjxv29wq0knfzftqq5zo76w9w6hong826o7ygk35txufl9f3qk68ylqx28m0yfxjspenk3g59imky80rx1c9xu2zm7nyvdvq893r1ua0xl6kfhmhjqtcseyrowcc5qhzuopg1bvgrv7ylcwmyo',
                username: 'j1dlar0i71hv0pe6tb7f55n1liew09wqnav0p68d5a53uwbyjxxjzzq5risa',
                remoteHost: '43j550c8giaovslucvpg6xxo5g38ogpuqlrapudm15b0boz6qzf03iyvfixuk9ss69lp4jnknpws63bfxbejyacv6sysw9t6izbbxefvn5s3s2btvpl98zpy6v3uhvornjynfgvrb41msuyfg26d3auj2lknckaq',
                remotePort: 1165210541,
                directory: 'xgrwty9i2j5r8siue3tht070hgae16ojfiyeavocwipxtr2wer3r64hm4t12cx2p21r8wh4lbdes37z2xeb9lmbiwepjr4hmtjp0m8sagyywtmdrnoqd3qj58e06gtjguh7n3uj7u05cb6hg6qq6s7dpp4a2dzirnib6pyo3k5qt6voudbgnav569peufmddw5swjsjumhbgysaz6cr5icfgrj9eorxwh2a5sdo8xu0ht8wnrzr8nz4xtnzxgug7sc3shpzafi04m21923ksd65xbw0ciqdd9j182sj04hht8afoian66qm8kw0rv430l7aytxg0g1g4va68gjameayldp2o4evfenort3fdkkfoio6n0bj0xz0qz6sj3twcliyw3hrckgf4a3l6raphidmgkvhx6xrspcjmovsyx8njaobk7lhvp7k73iv8woqinc1wxbh37xzgqmnqpp21uoz53svyks05p8rozqpxwpeunvkpvdy8rdsxw4a96vjxk20ql08zfstfidxgxcdrikyhy79lor7vanwncj05g4b2ah6d58231dxlw1588hb0fjwyfrsrdbkcp1fa4mb4jpqldvfx8kr0w56m7cvdy6g2gxcybwu4mxnh0dqhggg07fit22mk60kyngdwor6hf2oqzkmihvaldzku6wmmjr1ya88j1jidcgfk03x0oz34l6rgtahkjaz7jtm84b36xw1x5sdtx300eszei98aq405s5pz1112lf1er6eksg60rlsiywci8i8t5uzvt283najmrwjq2biuwdt3iqe2rc51uaut8lmfjy8r0hr1o7wcf2m6s5rl1hbsdo7l3jg3l8pdqkps7pgk2l7iamylidzx9vg239j5z25kz56cljdgsd639msivsbv9l7qicxk43jp1ubmusoiwgy5egelg76iszmm5bxg1qci8kc5atlbp6ngw7u0hc17ev1fw4ur725u0t1cy8ke9lw13sgcaxhy7esgzzdlo0hwqsgdkyun',
                fileSchema: 'otunjbbod1oua1o9dgh71rmix9t4glk71e7ek31k8za51h2jft6sdbewlmtn213x6bpyfxssna1lmjdjdslu8v5xmchd7p6q1gg1pwf96vdznohfpknd8s7i9b8n7hjb6fq08vxwsdb2l47vkv62347a4qj3vkogljkdvbqvaq738zhzxgsgyvp040rcu8hafx37jw27toh6dwfiwwnlvyje3x83xxaz1x3jeqdcylhapvbz77p7w33uidi9a52c0h6d219tcimcxc36ygjwoziyrshb3732rrd4j4ez0mu5boah275xkgnba027zx9boe6ov1z5v6ez71poaz9z8iljmpkozhqrcsqwd793ldzcaxfkwo7eus53yxj78jbhf4tgeq9vzb2wcaibav9uvo40u1apfhiew9f3z7j57tde7cove58mm20hxl0va13838d96rsnxymsyz8mvsoydjx8u0t253f9p5u5x4lf4po2yp7ymz0ahl3oy9g2mib042usue50otxoea74ar83jfgzj2rmllvdp541i2kueb6r4md318urk87m4q347peow4r5xro1z4517bcazd258pkajzn39yizyflmcpc33vw54lvv4q4rnscu31hlee9a7vkcb6n6y18nzzyi91uxmo6jqzsqh7mgcn4d51z7j45uf8bdx7o4uaygxvw2es85m7doveykz3ajixj5ambsxo5clye9n80vm83rbf1mmg6p0kxr6rx0f11ewbnc0092aty6c2q2ywv23gns7v7fdnjuz9hktb7ackmmsqioht1j3iukpf4iqcym1m7gszzudx2fau3cm7n1l2kqv3iru826ngjq69kktx3nawgr9g1dd4g1l3u7v843jdrzdk61cv7620f6lkpvbo5sptul0imc3ofx1nn86ueppbg9mnop3j52halzqe77kzq0y4weykfhb55qan3yfr5cpxweu28rzu9fb4qxlg4gm1ovd3hfxv9gdq8ryhcbs3062ugj',
                proxyHost: 'de2qmk90yc8jk279us6067rjkfzws31gf2znnt3c8l6q002e2qoh960j53kk',
                proxyPort: 5121894353,
                destination: 'tobx3bq4uwr120hoggy3nxefzgvftyxds2lq4qrjyksipnmep3cjd7po372zys0na3345ml4iwrrsk1he0tow1tdq6p2pubd9krl3h0vorenjh9bc9gvnwbxlh8cuwfjnnn3kp4ugwfxpmwr375d37ebt6bfl4t7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iz70ax65thfcrrmlhdleawt5ru3332yzdw5by9t3fcbtagjzb1mqbo4bbmo9qej35gowk260e8gvcuwmfhfydtn6t7ecf4ixk5uzshgcobj78oijtcx2i6h001wbpqbi9gxs9qthzu20eydyla838mf3vd77gwg2',
                responsibleUserAccountName: 'vze18w8ggx6arbxm0aja',
                lastChangeUserAccount: 'xsv42fxx2lz12yloi4pq',
                lastChangedAt: '2020-07-29 13:21:41',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '4z1zlor13nm1gmdyopfg7zbntnfsj3ntrrku5pyv',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'u7vgm2o48qog3irlovdektma21xuhmsy4gnoaxrwtdhpkll1wb',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '3w1znvw7vwtlqmpa3ale',
                party: 'qrlec18gxxzrraw2moxoxh3dgsw32awpmzziet7b9fx6mcpfqnfo8jvyu39dqozngfybc5a5kftmhlpgd9qce85c9a5r9vmdb4n8iiubu7zfmi8y7bzjl7aapleofck9anq5ue2m7qa7tbpst2n73jepkca06c97',
                component: '3q4ftc0440mll4wau7pvzavhrv1fnsbeqrjw0exqblqs88j1325cp0d6djwphxp89enovj6m90wu8897c78mq9mneklcuebijbx4xtg35zrket5pn9mgr8zc9lktakhoswwzns9g2k9yjnxaqlejgeefrp9cpaj8',
                name: 'nsrd1454zfnhj03p2j6baa3k036s6s44ec7coh7ky6fa0fh8m2asodmb97tq451lzzee465gb17dsuaindo0skn65eam7vv54qdu0b95t5vvqucbsfc7dxj2yvatazujyy20icnm5lp774k8ebt0imyvk26hs2oo',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'gqkulhapv14typ28l45sfsg3dg0n6rsnstqopgseqhd6w3m1lw38c5ftdpqm4jbwtm1cdki0v6adfobxek3cxr9dh3ewht99mxghtb2nprq0y8tf376zhxl6fl0w6orw5ofu2ly1rt6aqr0vwxic1o5bd9i0xgvf',
                flowComponent: '8h46x1z5txt95wbj0ex64j8awoa541dsrbnaq7z3d9lr7z5vmcoeosvc35oi7hnnqcf3tjuukw3xu5k8tmnk0cimec9we4qjfgarl8i4ce1ea2fxb24u3m6su1bepbhshxq9jsq5u0zshcnxww6joqyb2vp49z1o',
                flowInterfaceName: 'kkr17ugjx74w0ad4r13jc17kycvv8hpvmflrdswdaxlngbd3l2b46rmlmj7kswna78820fzohn79e9ac15p46g7s42kneu91qk4nu29il9855icremto2edwo48suo2egx7smjl0fjhfs6y58mpsttgz8990nf0x',
                flowInterfaceNamespace: 'zjgx0hm5hx9way3pd5571n6etyclyxe31g0qct2o8v0k4td96hup97fsoa6z8z8925v4lxpm0n8f11iq5n6vcu25rtts26hugb81pam7v2d6na7kzdmolebdygg75d1ddlszy5mnjlb4ir1gi1o77l3cj1qdyj1m',
                version: 'fkwc1cu5m7c8slecwvv2',
                adapterType: 'yuj721lsebp0qvm3fg3yzjnkwat4hxf5nt1ym54ldvbl5qrobcj1lalex9pm',
                
                transportProtocol: 'y3gxfxw6zvrkymfuxj29auwuuefcj3eu2qqrm89d3z7hnma9dxikyp38pami',
                messageProtocol: 'y3a689iyzi5sn93ocazsfxj8minmgzthmyuhc0c2u5jk39ihbynls4wx8m27',
                adapterEngineName: 'cof6o26ej9l264euzjeu56bgezkhaotjxirz1w2q2bw59sl7j91ovaglh4fboic95n61k4em8aeu0m8t1up9avi8dumh8jd7cvqgzpbpkwu35zzk2w0heqtm2684goqzuf3k6qgpmdgmhe2i9rq90wncmo5qonru',
                url: 'ewn9skscgmp3uxcdj3kbgbv46d46x1gk2cerj8q2izjguw5yueuwcxu3ybi4cev1j0uo3fgtzg80t34kduav1rt20sorejws4hji8of0q5rmpis98zdv93kvk9i2o5jpgz5d9k9q6vft0h549ir26w81lriwfrrim1oclp2bg2519zr5uwpjz26ff3e3si8pca9imyl5xzfvysfe82xkgda1i1epu4dxn74789nnxwtroaiw3bo82l09ov87s1qtzjckzyn88hqhlau65o4ub9j2ve5zx5jbiyz0fwz8049vyicwgify7zjlno2z5ycf',
                username: 'l1ezearaloiqp2ftvuh3pgykrh8ejrjo9nw37a0pir9vksjpgma4xs8sb6et',
                remoteHost: '01e3bmmnror8clkq75midvusk6wx9oviiwxq98ob276l0bixuan3j9eeska75xnt5oiuqghn11qq1i6awig25jfj435ett4rvrlk0w1yoif269q3kv6wdnocjvywz08nq79wdb2d79o6fz8qf2lcgfemua9aii1e',
                remotePort: 9517098577,
                directory: 'shmif6f6no1ns4mj2z7nqmt3hu0cv16hiorhpebwzsgcizv6ro3uf99i8hwian3rfwzqj4zqpqrjjzge34fhw4ye8elp90ko7eygszmwqg7jvze7qxt7z8gp8twg6c46d2a21xqq7l2zeeo5qk5qausq5m9qql4ua0c4m9isexzl152t69gomlr9due8mx8lqhszpt174dmmlurkjvfr30zof4b7innaoupdivs1wj2v79o0x7ql8tnuayt3qy7u0gvzj1d41wxrvhbbxeexlerjqb33m0o4mle3pifo2yclsmepmlni09r7mt6tzw49wcvcudjy38cu4nh97nwnpx8mlcb05n7lwp6tbl5nfrara9snqeofuxxtag6kid94di1eq3njr5x8ogbiovtlhou61pkiuppvng8ihqsgxj9dlr16a2xo762nosuxofwlm9ie1ibt8q3mngfh5xl3x336xy18u1qqumlzjqd28mul5jmpwv8co99djtwapggbpvi3ka8l4w91g7eakn5fne2jn3dwv83jc64zfvkn96w3ft6hbnp24m82g9i4eviud1bajecone793ey2w41b4109c3kj7vzi90qpttu8v669n7sejuoge0q9yo2gxc40tvrj2mvqn53bzpd6q322j5zf6ag7fegz8u3whz652kmuotxzc0w8z5cv7wwgpqhta0vmckkwz0fg1hoelfs1bjlo3xduu8d3meb3m49jp0w62qjiw42xowb2cflsfocvtuiic2bng5nlfbzk6dekky4elzu5wnn8tsp998jangvxcbfhey75ylxi3297zqdztp3b1cqsyhlhv2iiju41iwicpk4a4qh4n0uqb1542fcl4mibtovvngxgwubznaruc9gps7dm9u670byvkm5qrucp4eu1e9ysp612zx4iobcv8doc56gj7s8z2hknobgls3c57hdj3q1d2oswkgrt3s6db40wwn0z3pxmogw80doqwrylzyzxt3sarudv1yli',
                fileSchema: 'v455cy3bz9xycllh4x2fg9b53rzrmw95li36621e2eycbt7ucmz3sascyhrc0ni1fnmobtcui9keld0lavz2d4tmhnpcviz6evk1cmjexa5b3hp0hg0v0y8z6g6zxaj10uumfcz604x9zdie5wvzzb6a9iyqxzi1no78cal0bh2k7wry5ol38ucoi8ymc27k6sizwsryaqq8i5ly8a93rp0akc6zzauvl9e4ggx4hq87b7dh7ttohn382alv28okiozuqheue9jecywaapbiyknc26b02dqg9vw0mjxywqf89fjakecbert7p3uefbjg6idk6bos5vj7p9bhvc9i0cb194lpjeajsplkwgppebzh5k5wtoj8jdrddwwt9idwnwivd4tseuypbms0nau32qiqfm37q1mlxx0texj4z6492jt14fwwpj0886hsxydw05eco8e3azfxra7bdqi49ysn3ii8q8iae3xa5i2an9rfzgw22jxvh69b7xhtny8gvc5faptlnmwmpcibqec3ep9zdaf4f86ztgsiaycqso1ihsbiaxmgz0v89r3el8ndgfh2c48q2i5j9pojf8c9a4oduif2q90k9qus5uid1uu0texzalmqbrapkws5c7wnqvhzqwbsjtv2z1n9m2dyzf3iqvn95ebcn1zkkllp4lvhqfvbeuqgz71mgxhcshvuddw3xt26p1nvhugh5x7kjv0i0s9gfrt6953lfg981pwzzf5zc3m584ddn3gjo0c0gfjhu81ohjep0xmha5e05boql1ondee4nhly0uedcudtjqtt3o649cuhrpg6dkf69k31edurx9unwjjfl0306mwuhpki08fzrer6wwaoijviet7v95kns9741zn06m0gdudf70lxp9cxr1ctd6rxry80guvbilue1eh38mtymlflhw01gqad3cn6pztxp92oqf8wtrxrxqzzku2ksv1e93cjcxiv235sv94ik2ixxrulaibdnnkwm38yevbfj0qc',
                proxyHost: 't6bms2hryv3nos7iz0okrq78r0kj8enq5e08bw1a0lqbl1k3wsut2ag47rtj',
                proxyPort: 4770775563,
                destination: 'ui9gr8dgkhi8cjy9pi9to6y7f1o1kec16bt5c0bnoidm77uux4z17etia7uq6bvwe9by7eu0k8a03rtuukt48ft6s7w7f2gap0w240c02cjiekme1rosjwveh8x9ag0f39drhddd8q0emjlx3ep0qwzjsoguwbxh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4rjeq2z3smqyse05df0rln6r4i63lirlx10fj8tuf0w7dnuxxdbg6uxk2kucb9prkpaa8cu0nsdjz6q6nmviwlx4x1v2xxmdmk1g9mo8fl3velm84z465t7e3gqvf68acp964wsntiafr7mzdpbgmh7uipqhrthg',
                responsibleUserAccountName: 'qle448d713cbta4bynml',
                lastChangeUserAccount: 'fr18e0yz5riw9cm2ft49',
                lastChangedAt: '2020-07-29 17:49:06',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '4mc6fntno8pit41bi7ir7npkwt3sy80ta20lf1ca',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '35ux7z3ji2jcqzwo086s6ic5kbscxb2n3gw3l8sfbqmq4ahkgg',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'li36zfaqml7jokjf868u',
                party: '7sovekizfcoginm9lxpljw9buvihejr2ta98yoixdky6dhc3h6su8eg2gsq9vr7811mx7n7oyho4dag4p84bxofm69yqwa5sea1xbtn5cdoq1yzytv2ayaq2j8cgbvfz9zhsv3p39hqr6twofscwrxpwnedmb1sa',
                component: '0c1q0r5z3oq5sk70fxor2u9prlks8w20i3nsaakj7psq2lo3h3oqnzqqhlik19tlbix05beenfbkg783spi0nw9vub5vxf2gbdt3snhvjsq4130ga7sz0ptb4kgzc92vbfgieicxnu2lp5n91tj53xbbqmh7qoks',
                name: 'b6ijcn5jydyxzxv3o6otited68i0zlqoai1iedwc3a5s5on2nnuus1suon1sed9lxen0us2pv2mc8xlrl5hqq7zizcfthgldyu2bdebbzgmp8x6y6ph5uqcfva0ziqr0uckmwnvr8ko4t41mradkvc5grgf5nrv9',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'tibxmgsyd819sd99ftcb7pzcb3ypdxfp56z3zk27tj6kyxv587iy81y4tt9agqb2ztwdfcxqfljjrvsmlu2o8j1zz0hadyhhw4qjgb2le3qqy29j6vw3wknhc9lt03q8uaxcc3498s82bk0kqxunll2xsm71ewej',
                flowComponent: '6axbkjb9t1j0e2m1eabfqurjxibvnvy2mrwa8p0b4bb61zaam282v7irc6v50nt1lk5yh0iwinc1ir0maempgcuvd1gjs0dytwb2rxfgf4pn5xw9emthpxlrkzfj7irenkkwrinxgx3e0vwvgaihaji1228ed3qk',
                flowInterfaceName: 'mrgnsl8rgf8u8aecjlocxfeuhxtbnwoi8n28as3gpnrf6meuhpf9sbmh39zdagp528ez25sgeph3deemey2y0ryiybnufwglqtplfmoe8t38rkujhcdmgob4gji3cpck1myzwjhuqar848xy68tkdde6v3puel2k',
                flowInterfaceNamespace: 'nq2srg85jwtwyuom81jb323dnhdb93326i0o8c6j4o88vrpg54qu1tys02h6kugo7mkqvdbntcstu8v0jwr8w3s1p1pmc4codgnbmdpc2ll95crmpmi4e7mgs0l8at1qbj5skxixmsriy3d8oy0v1q1irx5rx3hp',
                version: '69tigybd2cd9juf6nqwp',
                adapterType: 'qn7k2tbrj1pf27klqigz7sc55s1nff094aga306xmhtb4bkoxgdb6gljm6z0',
                direction: 'RECEIVER',
                transportProtocol: 'fe107axt9lfxr5fn4mjqfrwmaz9kms4n82sa838a51h3wqt6wtzd6a46lfp9',
                messageProtocol: 'v2fjuq0sojwg923942plmtihlje7svpk1gzw1ful3waq1h2hazhqdrr8ds00',
                adapterEngineName: 'fdlhsh9msvzvkt5nyer15iw4kfomzz8dp0vtkehlz2f85eyusn4suwry5x5xis27rtoh0ly4nlsy482ju6949b821d2sz9gk86g1u9ruxuy5j63dgb724n0kk2p4yutlxxasdig0p99p1c6jyjxa6u69kkkdclgt',
                url: '4l3yjdd7016wxissp2tgfrvbp8x7tiuvg0ossb5o6mpj68kbtszttswe7vcgjvvr736s1mwin8vmms2944gvbxxn7b23bize8ejumoj63mlbqxe7pa2l3knhalp9li7rpeu9avg46x4z279i8wax32pp37yz0piwbv428s8q6ht8uz3wkqrpp6gooqcmavkb4gfsekippp45jn6u7imo02599g3aj7dv1l2n8h9ucq5ka9t2qd5ufdfsqlgednfn6t8v4t4f5s8c4ayhm8p9bra41cmv6nagoxjt60tc1e217051a6sbju5r5n55b39f',
                username: 'tl2vj5j9nzk1rdihx090aje3eqef65ma239js9npu37bb9lwo0cupppj20qi',
                remoteHost: 'eojvd94kdw5nt84wtl2wgmh79vbwsw56ivu987d4beccj3yrxnu72imlmdkhu8z19rdj9d7pilbvi12cn55kwyzadfndl4kj951msf682gbaln4l86s00sgk7uzs4g838bct97z6c7vrb6p0yxj9ekrhteyfi9w7',
                remotePort: 3206543103,
                directory: 'bxh3wljyo1mzmt9txjugyrfxwfa5w1jpx2fk5wm5m2l6jralh70gacphs3iyfrckz3smywwxnzu3y8taaqx3snpnzk7hwxo216a1q9owd7a5ccgr9oidn8zewkgcymznce56xalco0cpoq9w2zvdb5icchebyu76381h1slnu7qe32w892xyqprk2ff1tu5rd4c9xwa82o958u0vgi2okjx3y94pmn9lg1puqowwcrfdyceedy7y2bkzf4kyxate82xk7veparv0pm4c4mtg3okmfvp7pqwx9zxnstz1xbbxa018dvzxwv7o5dekz506qnv22lhw1y3a7g31cy5b8ejd7btf0sz7mbszpud5nyyfg6nr4jivrz0fjssdniqvwzac2r5hskqyqmufciqfinrssdh8as5cok1r6zale0tlry5xrqtnslfw7szq34fvt9r2a4bqit4uv26itoqkg03d48yqzul2smx844r09i4tejzetmt64gmwhl0a1sd2ov22bhvv5h4r2adxwb77t5xybmiu6zfrxo7orfllsxr2eabl4kqa8iee94zemjgtbumfjlsgvuuu2y0p3q4126ttmw4emxous6oux0pvupf1zzqf6334nz6pxl9fxsgxbnppwwghy4mcud3of1t6dzx0uxz93wq8rhweykgnqtulzlw6nvpjpvlz1dqyljff5o7ecqpmorzasjh39oi4uh4mu6ddmbbpsy201acn4hdvkjense0mkzdfxs3zhh5wupwyxvb1ilug74qg9xae8c7c9w3pmumx773yp3hdpg41qhwaylcmckg1zcw51fp4lmusn22nbumi2nldzia2hiikapuxtzdq2xr7r851urgb60oure4pdkshd99f0q7qtnwzm48rrcblxfps5y2812rwpw62xotdx0ix7tonoul3yfko7fey99ni3ek77ikzdrfi44jpp9lntnajscck7vn9er2dp1pfi5uhomw2q2iddnsco5hu4f5iabmubfr2',
                fileSchema: 'e9kdmh8ynayay6w71o2es7rrsuc09xf4xqghfc0cmxlel882rqdqsuoxk13nswkkq0at9zxwn83irydnopou7yyipa8jvm4h38s5nl3o4p9a56fsmls3bs5jw0kif3yru1wim9m0nwzd96j1eye639tenekp5bycd151i6fktk9rxnu1tvdm5mt85yng39dgq525g1sid3jqbkg48l19atbtgmh1bum8eka38p46d9zc4bz5ko491yjz97ors8m9e5bco6on7ze5zw299t4srmwlhaqcau9o4bzosh4i70dnl1twm4vrdsmzw42x90cdbo1em2eygsvkm4va7tu5okdfreinjfmqy6br3x1r0xtbvhj5g63cvwlv5mz3srzurkzdvnv0c8rwn4vaow3lyookt7ud719l7rriy7feaj7itt1ezbrtudpnszf15aukpljveuxsrrgwvpl7v9gu14x0u9kxtnniotfldv342ojdkzt2opd0hocpnrcimjz4i9746tukjs1jep4mmcvrrima5i9w30e6x9ohgs3z8odklttw864ngyvbujnpw2ghgxqkd12pzuh619s9gq6wqnwdubytm4nqyn9sa355p48qjz0pmujy411nlfoi1ydf0fkuq7tw54fysrolf8pw96kw91bkreqokpqhtqdskdxuqxsddylbb3f29b84dh7uq7dmski3x001n1lnwno2daulhwkccr4eq4j3bqa13cfuc5ws8p9cdrunphi8vrosnwevrsdmihkg7izph3tgb3174rezv57nqkfnuj70wp8w4t4f5hco8cag8hcj12a2u3nqbzu5ox9h58f96scfutf9ov7fwr2qos1dxop2lylin0r5tdovf9md9pnjvx15itcrlvrythh5b04764chlv4s5veb60p2rw79pheoowbxhmf93tq3c9usnc8dg6vz85x16yhnw6gqj92636cbquj62hjcid3jwsp3u7nydce5twkaqtnhdcfrqp63mfe6',
                proxyHost: 'n0h725efr72j56jv3l8spsmgebiku8cqqwytg56gtbx5ywk7nkkhbh593ekd',
                proxyPort: 5103858930,
                destination: '2c7wyty1tdrovdsir457cildns2ajl5gouwfz1im7oeljepmivc8mrjf0xekvn6k24ogdb17lu9vy54s7q35476byh4bgufljy16ii3qwwa16um1mh4wkg5065iawwcm7m3f0y0j6p9wyc78z2dluaqxaf88gwc8',
                adapterStatus: null,
                softwareComponentName: 'to5747cqvo7kin642tqfmuv3j80in0pt0dot4u04nncaiuyo6q46tplkzz9e17lrs5h1gnqzehdmez8m5h5qi0ahrd20rgdbl43iqcmi51y1ph7pvzkf3ktr8xhwgc6ap31xfo25tvftzi5lx2rv1106eumebae0',
                responsibleUserAccountName: '56z6fx2jz5y19lpebj0i',
                lastChangeUserAccount: 'vq10begsjtql9jiw25sc',
                lastChangedAt: '2020-07-30 01:42:18',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '8si7hfe09u12kkkpsyy49jnl4g0zjg22hs24g6o8',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '4mi76n7vbn3yritbgi3i1foggbue69utp5bc3t7ztr4vp69aq1',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'csvxv3i394xnzjg9b1oq',
                party: 'yd70kiip6bk951g5wagvajhq35rjtmdajol9hpykz07ujbqgairhlq67fogedt1inkagx9tjh9u72m7sfvn9x68nnq585ej47023pkgkbua0wdu07unggkz1vm2lghso5b3f4bvgv3oan2e3d1en9gvjd200wwiv',
                component: 'xff0egv5srvjw5d5ljlvmifgl27xx3775fxhcxn051vy8ja58cogvqe1szbnf5lyrjo35zfr4i6u0w6e64pgx24s8cmqaiovrjfizrd575dgzz2ny5skaddz34sthvbw2qmkp39sisweb6gavlzdmnr2uxkrblii',
                name: 'mal3uo87lv8dldh41jm4w2p9ffcxsz3d5tj8p55820w8o1wkbd45to5okrl6cqksa0t6hsw557hpzllbufcfum2fb8tu1ix8qpeiq0d1aisiqyxcgff8h7qx3zmvetzg046bm7z932750s7ivhfl584pwjlvxim7',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'gyqerl6e4hc766an2st92ljbms1n56d0dasrpf64puw287bcwcouiedsqw9pl7y759zc7l7zvkys4e3urzy50wc6qm7irjmg750s3l2kfq46n1tvbxnujmn0f0urc1e0r33erpy6oj6x9e2qby9xuzw5ixjynrtl',
                flowComponent: 'pgihngfj1pbk260fdn02zhn41sbme42mtykv6868pazwjww213aczvjvzymkqmykog7yfzthfmpfiuimh8zho9hsu3l4yzmoe0slpm4zi3sxsmd9wymdqt21ojlxmfoe9zufrr0xhzqx95u3ixdva7mphp697s92',
                flowInterfaceName: '15x3laquftnvy0b8a6ot7nwzgmzvkz5scf437hiyv8di5p1thagfsl2xvajitvlxj9cvug87hq0delnqffrl1011mv6l73padz6xgp8j18qcqbyt7qu17ngwdwy2n95giog7veghdo7y1ti7rie9ohqd43woa5v5',
                flowInterfaceNamespace: 'ypq74krlcg650it27jfrb197aqbocxsf7aeg41qutyoqc1v41nn8hjyk00au1i8t13sddw3ejin3qd5lehk7dz5nahmd5xg2ppohn7h0k7cilpkbq7aqi2x65zh2zazvyz6rjd6pflz0qrox5ny1aluamaxlqdf3',
                version: 'f6fuf19l2bbzrq6lxxn8',
                adapterType: '61yp6x7etos0px855v96k5vxmhwhbse72qpzodtot8amjszpgsqxqnff25fu',
                direction: 'SENDER',
                transportProtocol: 'orvb1s7n0r1edl6whg7xjet8cn8bwh4endccy2njnf4megbp6gru9ydercdu',
                messageProtocol: '9i3en06z2j1slydwpw5dqrj8m4xd0ve8kt7t78tn1uvj6e79gqgfxgk4zi1r',
                adapterEngineName: 'iac2ahk9j8jxqtid1a3p1ghsg3o12h2eona6thnqcw3ddoyll9jbq72ykj1na0k9zqfzciit3bgb82azwmvy88m3rigx9x6jefn44m12aig4nz40upyittctbhvhkbsix1aieqsnncz0ga1kil59qbd8zqbvxviu',
                url: 'yy2r9taqso0k18kik5upca8yve99m86c588zl8gzz6pxzkgpstdydoom0bi6l7w4jyf4teu05n84kf9ihxle65ukw1wu0cfndmzv4i6d2xln8szni76d4of5vnl291s5k0k9m6h0ab47licansvmcop2qriq8zxj1lrbvgymwmxcai8gwautn07yp238sl9a05jvs4bdvdfi4cfvqj2p7wtt3jz3thwfqeuc4j2wtr4tey5dtmik3kgz4ptldyv7kmuz56j932nceiq0zciimtbq7f9mfc9n3m1t0tbr0pp291vmi2mnglhbxzl22ile',
                username: 'ovtql9h3jwl25sds9wfb85ftkjy17bvscmrn89gohx4t7l8zpi8gi31qa50i',
                remoteHost: '52cnfbyhaqqkpdibey8jnap9mdhuzfrdweo3y2s2w1uqxrtu61wops7amnzmg1f18gfs5ndr7ptjc8xlj6ln7qbijdt2hwbryp785gelgvol5m7vird1rupmn4qukz2eu6k1tnt6if3zaj71bee8se5ixrl54zkr',
                remotePort: 1266386019,
                directory: 'fbbdifrngtaooj3tomis45f4cjc60lg51jgqf0ym60h9cfjcpna0gbas0uoiikc94k8s5m6no9rinv2s3bi0ol73jbdsqyvnroo01hn3obrgbkdzriefb8zjvsi2afekdx7n14uh3f4mjpq3sqq03wl3signrpxuv11s4oc30lp5hhficin983f9x8m2i74nbq523a4a4e7vka8b1py3swr3jdkqqm9bf207m3s5sq0obg8nea37vl66bhidezje72w3gvgutfvvww8x6g0u1cptvr1rrua049av6nra3qr0fg1l6vkgtml512tt3b4yxcelqvqnng11vht0sujf257b01xd8ladl4wcncblf8h3prw9zcxcsiok8wiw8fknwur1yvcvguooxvv21wxdc9b4nrotfd3exw1qxuixcxn8cxpszh88z2o4z5y0ro03qn7742l8k05kylt1o5wmzvchlvbai326szhtvtipux7t2vepwob2ks5r7q8du1daldgpmlppw00x2nwesj4vbk7vr8173zsuhwxhk5lapxve886y8it0v1lavxyo7agken3mtab9yzdwxd16nnnla1i3ss9nfhev6dva581zd08r5sv6u4c5914kfy7bpgrl4acnu5yorsrrwcqls3l1muai0d0qlrm8o5yjzsm7f8najqysxoes111j9u4bqntftqio9or789cv14zc6omemhejzh0nkfbf1ltncvvuk4xu4lq2eauyrib9oe4ejjl06ew0v8qgfdqwdzsmfs3bz7j4e31gy37rb6p70bq7iw9lnu0v4swm00ml3lf9eyojp9yue3ljv06q7ok1pdyr57zxl0syrpzlz1n6wjj40od8qwhs5x7pjku2s927nv0f03hnavnvdj6jfcl2cunxmm7ul2205qm3nrqmtl5mmycagl5ikbw4fk2hm5ksa9qk67yw0da11c5yj6orwamrob4o4nva5s8ijv19jsaovp5s1eb1paigszkaro094mbf',
                fileSchema: 'aiqswlfjnk6fzxva9bgw68a1cac8vxw36oi5li768r094ro5zmd36db2pwheljxeku8hynjgc7ad4sccv8bbzqbn6fq0ai81sufkn31dzd7zd96rj7ctd55rtr4wd44tjgqtud2533h3ivxbfz3n01yyfgteab5wbucy1qliwomvajxj0zs88sk04ab2seg36jqka11gpgf8fea5kse802541zkzom3u382w562nfel29sn3cq7k5022xmy6lt1viah6ep2nw3xgi1xen7py12sqd179qa0prux7zqnesuvfxy81tp8jx75qbq6xgswox6d0xwi0tp7cv5brjma6r0cs9tp2hvy07ilg9t1dykz7tjta7pw4jmp4977aqcuzyyudoy2jqzb8yzfbqkzr6rkz3q9xeuohkvprqgqu2uuv2wtm8s7g9bx34njxb4rg3wkzgumq20gzkwb50sjrvjmyg1m9lrig3ya83kx3fm3pbiw3atgy25jxb0vo3gcvq2w56g2j75dpfbm17u0l283md3pgl1253q446g3r556q60d005jnrsiwvyieuhlvwvwvv1yyknfv8db9bxllr7p45tep8qymd4d2d7gw3icb2zqf78qddfztpz6oe87bwozn52jb14l05ks5nfvduxqxtvotqtjqh322oakath9w5wg2sjn600oksfi63okw6til6h5sga6jeskc0xhi3toyo0lfgcj4hx05nb0jngpyf4uxbesaxuqobmjidevfo1amqkv3x44gcasroz0m479nx4l1jc1uxd1t3oqnewvzsgzw6c2ft575ui0v1kr2t5siwsfknih2m3xh1ii49s35nwo1xq0s351suiwf9h2ykn430drqyxjuz0rtxqpilvkn8974f2ujwdsvln47pbz9ngxuvdeqltzyjzqbw9oukkcfijcxcok1us7c1mff39efwy3328o2rme38v0hg6ba6zlyaxtixrxbwmiy36hvda9rigqor4c1lkgllvrp',
                proxyHost: 'yeq5067an2dlggazi1cbxs893w2wbav49z165kljuy4qkre2yyimgx8pgc0x',
                proxyPort: 9156179294,
                destination: '4wftvfbt6ti4a26yppfqcrojon6h5pcmvmjqonkaeqkljhx6soglo51svpccf250a18gcke38hpgrk908jtl09hebj7djfh0ezf6qnb8cmoxuj1kfbdg6tijviodgzybsk4h3qyyeon2ke07t54cl8mevpu1xykb',
                
                softwareComponentName: '7zmb58ra6390tj2axpggqevwww5glye9cb105a2wgzo1usxjakiyuzub1y8x0zybsogkxqvmouxe3qoujd760gvhfmgzumhre6tj1z9aal3cnl9cren8ucndf0ckzk2evap85q5jq8t9mkprcmgmp2nwxwf5gkrg',
                responsibleUserAccountName: 'in3zjbpzzvzgr4ss9hfk',
                lastChangeUserAccount: 'eyoe9ibicsofr6g6obiu',
                lastChangedAt: '2020-07-29 08:11:07',
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
                id: 'lf3eu414usqjp0t4pucy71xcs8vpu0g0gn9ik',
                hash: 'u1fa9zodial8ju9tn1nho6akvdvdzx6m7f2cn8su',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'xwefqkceglis1glsytp5i5yt9z9tf9dsgx4n3xnvh9qpbpr7or',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'ak1ecsbl3p1ujldk7dd8',
                party: 'u0r9h661fsvuxasg66m8juxgka8hz6bn6g2lkn5unmyr1q4qgjcovmjb7nt3xqnssccyqyau5kqk5er14ndl5rss9myxpnt05dz6pa5j4jaimoz01ai2zguqrx76714634n6n8y7wuxocet31g2gubnk66498585',
                component: 'q6d27b7mi8wwdrxjradycn7zg5qfm8xs7mua0qed5j4tmydu40wa9z3tb9cdhvrrs3ovj0al40naec2ejapeh4zoe1thj5aq0bbm351upvcy078fl41oytxj7jpvtpy8jrjenpswezy4aeicsn676srirtl565u6',
                name: 'sjbyz1tpce3h0fl3z8kwauc7o582t770e5fic38ncg5m16t22p3dzxgvj62kqckzl7o2e8f6bklv38byq8ob42ianife47dio0lj5n2csbhctsmol2mlzawi60dd3x69apvjgic8c3bbyhj1rkceo9jcc7v4mryk',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '1aau0djp5oebun1q3vhzub59fzlgazrxgm9cg6h66pwwyg5nf777z4qodoif71xi9fi8uzvgboi7r0z63p8x63l4pyky2ir8yazvymbnyv9mpqm8u02m7va7dpgm8m6p44i51laz9id2xl6839kpwgutpxs7a2az',
                flowComponent: 'wyrept48u6txgsd27dfrkcszk8sbt5r3ov3m0htm80c7105czgwp4j0hushnjq0re7srs9i232l0a1fe2ost7mmw4teg8xycyaurpuu9qug84rgi3z0iomz1ihmyxl1oht53s2cdw6nz21hc0bvxhfh3vxxwyxp0',
                flowInterfaceName: 'toauc60m7aempagt16ir6y7x8pt2muo6te8i1leab8xtxo0gx8bqdpfculaqx6sisnyl71j5rg7z46l47fx69186o8ehkhqv33i5tqio0cgb8xh69jag69vmur4whghck4gbmd0frwz8a7dm2z5zasxfcptu95au',
                flowInterfaceNamespace: 'kqprh8cro6ytnfa6bdu6zihyyho54h0q51vnb98yw9sj48eb2labvpe9obhwqum6pb0hj9znhgk8yg08b2famrzy34jfelgbl9pdk85lsahpd5i6o2aux6jvkr0bm322izk29whiob5kr24lhljmx8lz0ss2hi3a',
                version: 'w4eok1kvua5m5tg2rt6j',
                adapterType: '50om3t1l578oy6m4r4lxvdlg544ucoatrjsghti6pbdbbejflqh2w5wp6feu',
                direction: 'SENDER',
                transportProtocol: '62eee3kqgxmll6jfpz7zdq7855arzi966b0ytxhd0dpc9potp15k8m0ve9ds',
                messageProtocol: 'qfo01h9tda1q1avssgrlpafd9o9ifu5ufilx5rrsr5ck1i7f78ll7u71jihx',
                adapterEngineName: '2ez9by6fgedm04cnmhsv9bne496vi265vyif4wni3qpinqdoxwk0i872l7cimgb40nqc7jfuq66ucymydw13zj2m3noei36hvnfsc0bh9npy4iajq3km957muijzdeo9q30w5weesm0xnib9ngtt0hae3kp5n4vx',
                url: 'mvsplbfv7ojnwbpuc3i7rwx5383ig6b1h0w3guvkugxnwrjlsw9i9y4y7cub8t9t0468gize6dmzzm6nffuyzds71d38q0vpa1xv866qhggoo78wch89qxwldmq7m2hjk7l4cq4o3dqay7v8v8ao6umelacigfg2ku5iylp96u5yfo366ud6gek4q35odxc9ipytas7ei70upq8pmdkhzteekfenee2xb60z0dhxs1noet8pcbm676z9ap6rbotowu7uzqptbiimd777drdr3ffz0ss44dxe13e2a2w4xrntuetaj4t7awurilt5nmcx',
                username: '2k0daqx8znw2pn5r9tzau7o8nj0614tb0s3jvsgj3crb5duw1duz7syk2jjp',
                remoteHost: 'jlz6kjqetjod2k855dd5l6afnlht3bitls6phehkspnu4bh4a2mu0dix9npu54y1cio1lsgv4eldgl3ccorc083skqbnjpphv79qm4r6i4kkp306cnb6ypj8ipi5zb0320leqzljv50y8b8bnozeqai9o9679e8b',
                remotePort: 5118122340,
                directory: 'tll28pmdvl6ewak70827isulh52fnw4uehr01ghqxz0dk4ff082ml9sefxj1cuko6kf6d189gs11w7k1lgxm807qjumdtvxwrepzvb61xpoxva29xq5lyo5ge987ewr1evofrl3e0wxyp5b2vpx2gko62by8oohtzhrk3fgo7x7nndqaawe74vqste0y53yleoecx7ejp9bwnap3zb12ljo8db6rj8yieqsjnv9x9uqgyy5evn2ns0lj2640gstbf699v9lunl30y56mv3oi8n5tsumiszzeank3bzoyyk1izm0ar58pioyzyv5w0uve4onyeptyxji1v8wl4fyhdp16cr9mfdhyxebj2q562tijjgcnx6bs2i6sq9mqwwjrq1g2yg60tg2wf7okbdqsxaaiotd3xtcrx7n3pc4sxvevkzqtqryr260uelevmykdyg10841l3jmna4ny47tqlf4nw0kq4vqw7jwkyrmuq7i07erzsxlihrvbcvpg0h2mb7i0lkwdmtujgayasp8b1e5jw56v7d2ivpgduwddxgm9ouv0i7z97tz2s1s681xzu057w7706ynm2ug5kqw5x7evcatoexf06v0d74mgosykzdtujmjvy6spqmwtgjmn6e9fy3f539etmalsyk369c0dmcv0lsjy3kcv9othfl1e78nv5p4k8hut9d482fpnvyti67y3puwsyf8bxe80mf4bjg2jawve3f9wsatrb7dpsxiald1kjod1hfknckuxz8gijik1sfyhyqorlzv926pis5hrkoqc52nrs6n5496gefzvfuiydephma5qilceld4lm0sldrm05q8y82343lrxpb74hg4u3q6h7hmwhdxcazfd66nuyw98dl0jvcg1xkk20fjvn4xurex7jdj8sxhqe294lbu8hzaloo4aeib0xn9lrezu7gl3ajdmefs1m31zc5xiifpfvg4qrz55bd94ck6d4eri1evraonogjqi5uojldixctr6serw4hrz',
                fileSchema: 'pt61k59cf2mvsm6lyypq2ci90l3ud0mt4tf7ykh13673ov0one1mscfms7s5oq9r8nk194thju9jvwqwojv30azsm3a6cpm24qrnj5245kdz4t13cv0uvyvejvlo82opmmotta0wuaigf5k3sakwtypyvwpxcrvjylvy0mlrrzrx1k9ffp3wehshqmo1699g3iplbsb8nzii2rj5tz3zeivmmjsth1v8ytgagy4eif08vepeuf07k5hg98ed4v69z2lsgx880qhuvql7tjqv369o9h61fwnrscshksrz0pxrw5ww1oli9re095fwzevzbmh1d61panq4m0tp0kxao6ulw62k760fddw3covclgwu1lkht6j07ee6l52srfiwlin1541yayfupy7oxecrcbcyvlmcxdr1a50cq0qkjo1exdikkwr1o9uthigvu9lrflc8jke5zqym5e18sdh32u198e7wab8notn60xyzzdhfinp9fz28mq8ynoth00n5pupmg5j3bwv50rv56i5x84032o2khbudr1lzfm3hg5plb41f0hqkl5n6kz7h851e9ajrshblh3ye9q86lfyp18uq2f40wkgue2jsv8oz050fg49vnfje5n4j8ha0uer866k3oj28fp1dcpw2a18isqpwnr7zx2ut3jd8m5k3bkjsipr12zjuzxc6j1sp0775zkhx1jym81la6ynoq7xc6ytkkowwq9w9ay9xk6p8yqunzz4kitsgaaqz2380l59rs86cznyt5qck0ju5l1y6cw6kyg2f8hz2gsxswr6cz945i87iqws70f3xxls2pvjtjblo06wvh26crib8yrhz1elzlps793q1vvxqa97hnv7ezfavetuc78bf8dm3lzb3j1hg05wwtl061sybks3v3wtjgjbrjrht9pcxo253lmulv331ev89yp6zs11bozo0pntn6milgzm5e83xu6ywj7r08zebshzz7x1mxb1vlaa8roqoqaf39th4ezwkf7aw',
                proxyHost: 'ecs0xp6sl0tqhgkg679ap7rrk79uc4v8oom4uub4bnkkgj4e8aqub49hh7wk',
                proxyPort: 7532575947,
                destination: '9gazocv00n5x2fezbr51jzv6rti7d9hkzn7lo0g9p3f1jqic4o04qzlbx5nkkd3t22y89fislzl0hpil3rub6bvf7na33waz6nm6jvhqfpux42mgzlo0d3zo3notdufa4t6ppkctcnhbwib7mfxb4uy9y993xgwz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6rw44xdyucctz55nabefga4znmtwcc0m0wzso085jpp584rnbfaapczwsmqkso7zdtayyjd56hq3ps535l3td444udxkwf2i4o9njsl0bpv56gzfzubnso7kevj4plzu1zy8ibdlyaj9ryzn2q8bvxgz38z21nr8',
                responsibleUserAccountName: 'k75p1vhk78a4f1eitylx',
                lastChangeUserAccount: 'vq206w6zo5vrejdxpazf',
                lastChangedAt: '2020-07-30 02:07:48',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '0uroam4tbzi2o261ib2t1d09uo72mxeqccqiy0xvt',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '7ednarul5c8505gjeczgdqvg55zz9bu2u8idn0e4nlcpnye0bw',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'q8uzj9soqxwl5wu068ud',
                party: 'pjvd78gsm7n73sy5k2j10qjymukvp5noyxy53zyzmir0456b2hlecdaauksztq6sqcyxv4zroe95om92op4uncf07mguy4c76t0q5aa6t5gzq3zlfqc3mdzgxdcqe60a0wp9uq34p5njvsgl4s5xszeu0w6i8nhq',
                component: '8uynsbif0id0rzv48qfqtixcd00ra5tvf2nnu2dat6q1rqhvstn5b9s9q6x5j3ckt0efmditxxg4i3bgwn51gy47ib93i3lbsdqqeycz6i72wyvi6r829jf4ju8js2rp60opf6plx5xpfi9unw2ioboittqpfqch',
                name: '4u12zlj3ud9r2vgoojdbwxszpal17v142nlk1xfjqojh6q739l7h6pe8pzatv9l1984h45s3qac8gp69s16mfoy2hq8zgiqbcltbjqftcuailr0x646es2yfx7zhg9glpejbrdsy5v8vhkxavti4bq1aewklllja',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '682sjqgtshx0etwxnbo84xq8jn42bh9uxyujf5sv3gskter4lfg228ogxh94nb1uhyr20a5k9vau5ttticcarpf67gife938b4os3q7h66n8e0lg94p4nq1gkezzxit9ozsivw71p7gqm1vbdcpmj2pu9x7tfta7',
                flowComponent: 'cd6esb8zmdac515cly6hyqbl498v7uozdxbqqlx5gk6q1o19k1ctr5hdjx4wv160dfmjm8kp7xdhhp0cwx2hnxsyi41d4gruaqox0fs461m41lmh9z584d13iop4a59yxrdbz0looh6vpfof9r8k91ipm337utwc',
                flowInterfaceName: 'uq0m1uvsycrepi6hxi8vat40v94h2d46wry1rp7pdyei3jshyg798zhw328egdk1566jr6w0z04ecbow0s7rmer0y85wrj43uy7f3vtck66kq11tg7agfi85qglkphxm4e1d8pexjprmj4zq47ewha6drxkq11q5',
                flowInterfaceNamespace: 'iwvki4y8u5w2d2zmug86wmk9jftj9imq3ho5mtonxmuvy9jmrgjrx3bkam07v9feg1adns8n7mj3ddwwikhbnhz46rsti7n65sz0l9xkc4k2n2gtkk48m5x0svqoa3xcazb7qlnxgwf3zv0a7xtllk8gr7i9kgru',
                version: 'bp0pzk6ffq6qtkjesqev',
                adapterType: 'rr8m9srq8f8u64k3e9phzetrl1agb77xcqh0xqa7gn1uiln8b7zfjxx850hk',
                direction: 'SENDER',
                transportProtocol: 'dqmfy0mgxm50g74rqlb5c1f2ag27dx4w7qlc37sriq7pck962uvkpr0wqblc',
                messageProtocol: 'sq2fwqdnplh2464feze9xd8czuntvtateo2h1a0sqhym13uhfj8onxz6kctt',
                adapterEngineName: '7onmkqxfym6txf914arwy8bf452mx5bqixs64rv7dgurtc6udj6ru1blqrqbbdgvv8ckwoe6ns27e7t94avji98lg2m219u8yfzb470p2hwe90923cql6gfa3mhtid368lyp6w2sq8yyhym0nld41mi2wni92757',
                url: 'ihjs7is2yxk78huve5potc8dhycno46uhq6h07iv7niwfbc6ni12nbcjc1atk94r5ueceb43n85zy6hoahaedlp03595tc1o8z4u5mc15gf6677b4vwk69af6nwqx26utztemz0gekhv76t76m1y5h7teb5y9o2urkaz902nmdf3rsj6y2jb3jr63czsi891brlt73h93ewzwaqztilahxhm3a9d8l61beyi534p0e7ej8fa6n4l3ag374ayehgqnuppe7a4xm1ayepk9bmrwgshkzetwjlbxolkpco5hhhbi5jxsgu50v972suq1so1',
                username: 'yy8bt57ijsnubrdtd1q7i2y2uajsxd76cijl5tyrc3y60rkbfsleb2qfpeg0',
                remoteHost: 'msld06u5n4oex84phxnrzr4p7odilozpjvx2znr0vps3pm92zfvvnhazzub88buvbkva3uxu2ubl8f5s89dnxjei7d7rjs8r2kyu8me9zqlpfh8yr8d3yrkasr2rjnp3sxx3bhba1go2xikvgxvb6sk2dcco20fk',
                remotePort: 9099843171,
                directory: 'zk2fb23819pyi70e9jypruwkjo5idwm9298eifpvjp2ea9ga7cg5tx3zom59gl3mass6zjv0ihy3nevjuryn54galy9jkvx3od7xhnybjsm4pnvs1shwlc65ld4vib01wec2m65epd99s1x5ep19ok992a6vhm9647f8sp8o5gbyysu0ziqge7fsy2sklpyaicm034glcja53yiwgnxrth3tr2gajemtwi69ecxthyxnmnfubboee7v29n7aoeo2ubjh3zl9cw822mkw2hgvnui7piaeo3zkt3pouuyuwz2gid6zxe3ge3sv7wack2as962k1s3pyzuw1qjo0sa8ttscipdx0dsex0oiauwbhgtotpqgb6k084hp7i2wauave7o8qfs1i2tswunxny70h3d6gbnift8xcyrzvdt2t260i608s5mobyh1qr9v8pkx4pt3c12q16rlh0uj01elsuxjtkb3cmrditmapk8myccczs4ozelkzso9k8k209xu44zmy1zjtzzbgipjt6mgxfpg556erh5k63t12tlzdxfi2nxpajpnjqqc3gibkwlv3tydn049fxe9n9w6nbqhqhksyfgqdd0yrgcl6ihsttfs326uu5yvom6c51jxwt7xrraweovbu3o7kmuuz3kqucv4ushukr9zyuozx8o1jqzudg42zd6nkvosdkmpj3bvg66j8mcht0bw7j47p2eqo80e0lymijzbfto0f0ft0rykxptwcghosdacnzo6c9yrqg39nn27xu89xozmqd4mrbok34swxaozxaigwmtj4oejxb6a8kzhhy7sl3itk6zmkze2gve5q3nfvy9vdpwi2dnvvymms3ui4gzrnwfz53l0c3j5gwbjyxqzvmv60v1rok1hlzmqnn9zsojl4mb3pyn1i05xd6gvx5r6wrsbwiasawihszon057q0pfzab13opq757if1y0ne6r71qzjqq4y9x74w0khe837b2s4tkltk085kvyjyxhrnhcydozq',
                fileSchema: 'k4b3dylnffoteoq8bf2pd3r08tdltsvsguw4l4lc5cj1ubzub3g7ryizyagm2ug7ri1qlm7z4i9xuc1mugtyzgrmmty30gdbroxsyv4bidwuy997iaciai15o8pb3mg0xh4hndy9mgymldrnvzjko3hj05p3ncp4qukv4xpytspxewpsf0hxenhmtrvomhh2mqqvak60oufyvztittq6dnzw0wo60ck34yjodxbrp0ah8xf2wc6xscw74kmdtmjlyjwqt9yjut934go3gec7zys619m5q74bscfcj3r3up6doirxdb6sri52uhi7uubs1or0i85wg7cjmhkzhuw7c9si3njt12aqi86hoyng2dnn6njkgn8pasfr22361gtc4wnoefn14b5tqskuf3ocy4v6p59d2hydnfwswmg452f4lhr8vjjdim6kxbqtqctsiwinro49pvjfgm2aa0r2yz77u8oxscbrbkit9qj9yx6m35mx5gp0nfjxbdr1lqyo1dnctq6p1mi034p5wyjsfw2gqccukf5mou2d1boetu8zqsehqnqzo6xmx7d0g24oob6tgojx9hbcx7azbsgum3gjep42eoutfuuw3dwfu57o6odpke1gjm0zamys0k04c1ronw2ipgfxstonyhsbpk328tal45kamjpltolpssp4s48aygabtb1jit579nn8ks6hv274uo8p3ag58sme5x6qo6flq9fw4sn5i0xj8yqowo0lwdv5imk0g3oghaj2ksyz1zec36fo8vngvcq41opcztby3u1cq8kuij48l6qmyaf6fhi778rh66ea3bxwg8llxh0bly6wf6f27mcr6znltfvkcp657d60ithvluwyex778fyjifn2o5l6trjvne692vwz5pvperw4y4lsxipjfoctvuuinv6bf8flrlbjs6910mde52b2hrq9xxeg7zx1krrg6evn5rxyz74k80jfvjoi6p3kbq3ju45p5zul2yyhj8ayf3xg2h2ql5me',
                proxyHost: '1mzsvl51h193of1up2ebs2wxvrepvarsr1qjzgrvm13ugzhlncosydza6sep',
                proxyPort: 4127478459,
                destination: '8j72ss1hhlfjrmu41ab1033tncmfm0aenvvbg8gmsou4u29i1gczb887kot4hwvcpi8h0romdf3jvoca7f0po865bktti3zj2mxln856ghfk0e1ejhni1k159nnprml28srugujqkfaunanjn5snjglhxsb9wmn2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '87e6knhr1w2c0yrq8yguodsd67uyazbp6qg87cqv45dfwbvpntpelrdqqpi1iwd5p0yacxs5nsbvdhs6pnxwl2p8pw9oxz167lfmwv8fj7nwqlnizf3xzelgp426nf4zvtharrjtbvbgrxipxoassfzm02o6g3p7',
                responsibleUserAccountName: 'mudvelq9vxmo4pvedl8a',
                lastChangeUserAccount: 'txoaop39myz6x6fhyx4p',
                lastChangedAt: '2020-07-29 07:29:32',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '1j8bfuk5mb96pufgbuvpiq5d57wtw75c3sf8l328',
                tenantId: 'lz0wt6u2xqls7im2iuxp1hmv7z5dr5wm5dved',
                tenantCode: 'kfwa8rolc0q5mm1aprielgrimj3jn94ilmxte45a9dtqryponr',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'qx924okpxu2takmhzkhw',
                party: 'qgjtquc2rohlkx71urgib745x6rk98l60jxw6wrhuik93lu6gwidguyhdluza9eojfmvdcemft2ygose1qtlr5q6ar4fudjq7hbxyeuubqto9vvmv3lhrlwzb1gg064npxk7kmblqvr9c680l8zxq9om00belwn7',
                component: 'sizpbkj5ij7f5cggs90os2j38i9yao9uumaf7a3lbrik3iaapj5pvvzahj6d0it85sd908qg9nv7h7a4n7fow7pkdht46f528ev8hq7p8sddjz3yx416jsfgkf6rsray0f6di44o8prcsl9lnjy273f8n84zmg9a',
                name: 'kyehd9bscbtm4tij9h7om7ll12y14knei0r16tp3hftpfl725wu259rtoyvhu4zte199ddidx7hi8kgb960k40cjq0o1swazgc6395sx8bgo4mrraegsu6nhyu32iee1d8h2ap5qx7oti1innutqn2za1z0yftei',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'rifgfd2pa8tp26kjw1vqfhyeghirugoxrce9gb6tgqtt76wqcj0we5qzxj5y6o8ejdp5qeyrn8iaomzq7zh35w0a12a3iw2ceb0omf0f3rxuvlvcxu1otarphfleahbbb0yx7qipaka72xqc7h6e4m9sfv7ukerx',
                flowComponent: 'dp6myroai8iek94etcu3dzksvqdaep4ef3kba1nk6ack2vmrx5sy9j14c2j77qd9vayhsyn30k9wlv0z7bsqv1hf4xszdjj608qnc0c37irsgj2fblc9xmudgube38n9b4f4gplmsthx3058kid7ekuxx90hjnb1',
                flowInterfaceName: 'jn0j09t3kjfhqsk12ipnyxtw17uxhzi2vpsvyogzxetm42qm7l4q3awzoryfhnwuu8m6e2skybgkgeuilq2efu2amb6hxxp67job47w0wx6mmsvp8l3a5ewichj1b2khorvsgcsk7v2spk0cstsgvvckd0awsmyg',
                flowInterfaceNamespace: 'yfs06a62uicbyyocseiizqafqowsm54plelgxfzz1t48vftni2m2363lb8x576lcnsqkbwve7hjirb2btg9boumvtwzzpoo2zvoy1xr94cybpixbkil4jddb70sc5k6fu3szmk5uth3e3k5cqrgjv20rn1nxn5si',
                version: 'lg00vc7ms9bqp1ytuh3j',
                adapterType: 's3hevk7a0fjy0xww5951bbacq7z79u9rnle3hatant68wmdki3q4y3r0mvnv',
                direction: 'SENDER',
                transportProtocol: 'r1egyk7824rfs08urtap91709n0t5l823kq2sslb9078giqwhvvyaxcy4i7z',
                messageProtocol: '7k9fb5tyl89zm0zfa1apvewcizbsorizf9cphwbahl18fbgu3dxd7cwjiahq',
                adapterEngineName: 'h55ovmp3t4kulymtkwiyn9t2h62yv6b5acc6rjhnz7nrml93gy0y8xhsbzoqjwqn84o6yk93h7okmlkhz3iidxy7uy37efvbgejt04y4u9l2c05oeo1vkz6eojbkl3dcdv6veqnwr4lwv6abovl7x48bpyjhmsrf',
                url: '661p0bjyfqvchcv27ebuquepyqk37948088qfjkhxnjq8uzrkj73s9b4xxdgqxpuugu7pycdn361002gtf0h4q72c17bdf0rmhkf9r41gy1vxdbzrpaqwcjzhwqndsk9avxfulfh6kcd29d37gwqlp30q7ft039w2zr5ghcnifyoj1519j7x7th7f126lthlz4e3e03mhjxwdtpru0f6sz9u0o0jis885554i0ljuuxyzmswt7zf29n38h7162c9vvptg5k3fh6js3az2lgp2z5yy52sj32esu0sngr1u6ggdaqwupda8g4vk8jd8t6d',
                username: 'ml18p4nhuuh1m0o6l1t71gjro58zvpdsf5oo3b629zuwqguimbplzxzhr0ma',
                remoteHost: '7sdk4uofedslqp5ip698lfrz4adii269l7hc91tqvxajo5z0ys0qivl5acgfvjld2io6aps32h9zot3r4thfbbuj60meng03uxxqnke181tosr7wkjywdmfqr8u0vlq1jfl68rtuvm86fb31f6ff6rld5kyydzor',
                remotePort: 9444808727,
                directory: 't82hmv4wt1hzujkxyelixxowqdcd4o3e20efrjm8kzqedgr8u104wro51n6di312hx6rdei27ljndl9vx7mips38z5d3qsof7u9bnqq539kkdvv6s3cbblutbrqpn0wtclyxzeihdokeww8q32vj3iz2isw5kq9se1qcu4tkaq2qqura77w42e9z5jf5favfgrl2rjei81ylwaj6ye0vm6yqzlgcnkqvungmv0bdyixtdlv8ysemp4v011sjm482qh6oymlv5hcmov05xcm4csmr483kg7zbxplinqyvt9gkjepmlbu7yaexznhrx0roypuhum9vq67t92phvv3zkrbofotukjypzndxy7djwawwbw00f5fqpt7ti4acs9jmlxiib7zexvjvkuwp8fepfi6nmqgmwj2o36qah3htimn43dn0m7plcl8z5bzr8d5o0a6w3sqtof3w56tjvwkfvs9in60kvfnmtyrd1lhwbwa5y0ix3b462x39dwiynz8kh6ls7h90paqoci49j4gp8sho4vcyanhexjx0o0yuhrbt1c1skdrcfyzx8h03zri66a6434f2exi5mxru8qij7cd0sdnh263yxqyf1smovwxpmexsxdqz16riqgm09kf5iajmsp3nvb4arknih8k3nqzgwcxom1tet7ezxdz850o9q24wf9b7mcwgzw7ln7m17s8xmxo1kbksx3lae6yni1mzifgbxtu0d7pd2cp6803n0jndl911bk2i8dm50w0wqpb9sgf4l873pyvatv5fkdxsrhv5b12vhq8x3fep4j42sadvlykj7f0a97kykiph2on1km377ta56dmsjg26zi0kcqd0loc94wdaa571o6dracrxn2ar14jcmfq3wvxfydumliwjsp5vgv6xuc20s2be36byzk67nifyyl92twc0s0agnz2lma4f2jn2xin9timcqw8651wtyfjof9q191lkk7oophlyz3bsc3lfvn8zfumey94tng0gyheuemja',
                fileSchema: '8drmf8cpxd12c3amoemnl7qqy32a8xj3lmx7jqvdapgb9s42mi4ncep6u0r3g4lw9dw0hwc7dydiydy2g3uap4rblt37tccofwufop76qaiqtt0a6v5q177w1pgxja2ramq1wst9ga1dias1qyc49b1f9ogb4etxkq4rrgglwl12yq21q75alyzuhstqlksbbhoflr59576hrytgymcjb0e533ep7v0ve8uqbfj5871iyamp8zfinhibcy32bsjzhjfnet33dk7fm7kr8ra03hw2jiuaishf6ytewoh3osqm07eqc7d3frrcd74wu1nikkklx9d7ndqbla105xit8rupjodkb2r23o6g0kir4e31lzi8dikyd4m7ep5s6lkqpdx9w67lmjlcwxmtd4oiufp7fu6lepps6vtb7gxpy59s6qmpyncgkqozpjb6xwt7f4moq6nqeziwhcn2k5zz31dithmeu6705guzycdp1v2g8wj9oalwhooy6xjjn4hdfjo8zb04nee3hu5tdmxjh5c2vfataikyeawk80k8ag5qy8u46u30hruczjktmivjmu055nekcplmco9z859y6j6hu0al6dtq49y01vbov3xa7mipbx5f9q7uwtd6v1lqk9sn8ct9u2rzkb4wrbcfoe3fpgujwdptlvy7olmexwdsxxzut96e530g5ajmj23i4v4s6pxyf0snjkzm5z5vq4avybbsu51homr2s1gm6nveem27ixbtovzl8ffmrdu4w5cf38rb2nqtpitmdxwoyofr0lrbniv8v43uleka3gqfbyebju257j56orid86u7nmiavlj76liano3kj7819uqhtog6r19tg94qx5w98aqixqbbl8mj03vj7n3pa6v5igqbwr41ebdvfwg14bhyvp580yl09vhg6xg1e1ofdkx6d5bzpm7m3bxxyfe9mpx2osq149mg0qep8ejggg49h2xv56ke3237dz49h8n37slu060l48qeoijew724ecg4',
                proxyHost: 'aldvo3agzggg1s44vnvf76ztzahjiir1tpibg15oybfh1i9t75lzc8dtuoza',
                proxyPort: 9712785658,
                destination: 'jmqwlkn2q9631mvehwwjuqaw8gk5ck18jdaz9iffda06i4ogtv7wx21yzjoag1ngi1q4qt8p1sf7gq38x5osms0jno76s071dfw4ekvzmusa9ap8lx4w0dsr7k68l4neqmhdsqoxu1jbugg7nsz61e2946za2i3h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '61sd3vvjmcmettrju53tpwx8nrrjcrn3r0zf1shtzy3p73yhfigmnaiitn753rx1bf2i869swyd8ub5bvp10iehr8usvjj7l3i6fp5hhytttr58h6ek5d8h7z952m2mr822n5k90j3553wak8gg76wx7jf5ttdsp',
                responsibleUserAccountName: 'h1biwdsgwlvlvxav4ju7',
                lastChangeUserAccount: 'jx44hyq28xninaplztu2',
                lastChangedAt: '2020-07-29 09:47:11',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'rxcsurah03ze6gvyz8lsokb7hhbt5t9vj9ytehyh',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'nz357yr9gsc6lqlarw57exgp58yzg60asjqzlhykz5wgbzzbzf',
                systemId: '36ubxbpvo70np1r3e14s10pkvgo49g9skgimw',
                systemName: 'ieixi8cx13qda9snyp5z',
                party: '425m1xslyrctfc6xp7vcp4mr11p80nbkcar907w0csirawnfelgvw9dsjuairycxj87k1zz3c2hdj70h1uoswf31z2enpmr7flurqivaicw5jpl5w1i70tj86ubhxlz2kszbzvec8aj8ka2v91j4zcfch8y9rqit',
                component: '53eg6vpudpt03m3gwsndounlr1pf5ypp6emkqezjgrpg39p334gctxuifb7co7a21omvv2zk409qtafebdjhgaemy1qrlq8t96mnv7ba0q386xvogvac8cysr1bpyltbhsdwqiu01zrekupwy9kzwo27rh179rlc',
                name: 'a29d4f2p6zzrzx7qss6617kt63y9c757wd13gif9m8u1b78qm7iix8t071ya0g9el5kyy6b6011v6wa8rwowxy5znc60713qt253nk570me7wz6jcj8xsg2qdqxn6xt3n02rij09v7ewyedv1e3pgcmtyj3vxino',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'mw7meioyl5rqihn6wigdg5ymk496q1py0qysmr8oaleq5jpyxb52l31emzeuu16zc8yhhytd6d9ij6x78qdot918v6eaeytlkylkcyefkyvmdjj1jmm8y4hxb4d1mo3e3yg8w13unbs07lqxoew3vg80a0uolw44',
                flowComponent: 'sgpkipb0qqwj1a30fk978sckmur578gjqag3zjm1gmfb7rysmhya6qvkhd77eua7duir9t8yvc3yehe7pnkoyf1a7c3oxe5xn5ifvnuuxy3kowmnbrtwsstksl28i7q90pypnuhpz6vsvhdiaey3xfemw8v9eqh5',
                flowInterfaceName: 'jxrydqzhzoxbm11g1iuxs8cx4g9l60wyfq0i5cy4es6bz1uz8674ierx0ewlkwkk7i8jzayxtnv0sdbiwy6v52x9w8qvmib0mn2thqv3gsdv0lr381zblrj4a1t1hh5r8tho1gli8rq52ngra9avlt75vg5hwehg',
                flowInterfaceNamespace: 'mmztulpobqinczbq10of5xqnr5wggkun3nn557g1x0m710uvz7286ggwv06219gpch7mmqkvjl32jjv3dg1lcq35z79ewmfcjns6fmt5dx1n59bgf8acg6z7xxir8af4d1a30mqd19c30c81wgpiadfn7q9aprog',
                version: '0mgjc21mob9oztprh2b9',
                adapterType: 'k8l5kdp3xw4zaf3wzk9p3qtt7g65is1v625t4pneg2fcof2apvjwc5t9rqjv',
                direction: 'SENDER',
                transportProtocol: 'kk1nm2y08dm2s7pcxzco9oveomx275uhyman20mujs95yqj3i7swhgefbnhg',
                messageProtocol: 'bzjztlpa15vl2k0h8bv1frci9679ljc9t0r22ey1hxotot7b492mt7xxbss2',
                adapterEngineName: 'l5rgqmqsllfr1uahlht4bvm9lu92gi86sjv2t0vcayw7ezi0h15acwhp4v0sv035fl10hoyvllwdke6apgn2q5itru6xou7asfeup5e7ix6waewqyxklojj8p7iiu38y8atjtnlgyzhvdh6ruz1wdb0th5zo4jy4',
                url: 'uw10pu2fs7bislv8v664pnkyuqugffhdrf6aq0fn9843j4w3ivig1ptfr27h0nrchwjkgkkhibkmk4zl6chlhgj9m9pkjx4l88oe2jilz8f3l5q2ma6lhbdbg6w005o1vgffkxthq00d59uujlsngefshzkflvhh699kp449r8qxrrl9459jxa7sm76z41my9iay8ns5vcl2jgh4mpfrzyf1h8q1m910hm9hak8iwyc401umqtyzuyf5ygg79qgnn5q4jxsr8dtr8zd6k7s7c49vg4a4h5vl5qzktvrdqw8vdl9dtt6f0smc20arhfdl',
                username: 'zm9emc4wk182nyfyx6t5ojh5roe8rvh5xruajva2yzwhxijygvqbzv1w6gh5',
                remoteHost: 'p6zbzvhj4uyaontkov7yawqewj3oqj5j0zirhrgrbgsu6wad7x8x2lidfhorod9ihovy45wwzjiufm8yqiktki2xuawr8l6mq7gn49d9gpky57v4od7m5131rhm2hoh41nldoa68gn5ofmnr4dhvaj0qoxgylawm',
                remotePort: 7396406210,
                directory: 'f88hj62qka09aljt6baavqfz906m9oonw7vkaq4y0r0lxps9fc66ixln9ow50hk7mayta45dxq2wb6fq3wh1s26uju0yc4yx6rm50n6986eyoyhqjkl80qz9gjkuyvomjk8utxyokdo0sbdmrumclel835t1aukybn1f2mr5hlopokgsybfym66a2coydq9wsfd9au34jfiqy0t8dfrlpkr17zb8t63brpmrsx5rp00tq1cicutwb1i3qohyhvve5hrflny6qbnwz6br02vh8capfzjppuipcr35t9l60vagy3hs0g08hhhj27etq3tl2p42yes8us2dw97cxs7h0ggu2xdw1hkdl4ix1otqbslm5doatg33391qnjlh8659gw4wnpzl6tiea111r91d1fr4xh542h3vwowc19uvtq1tyayeo23qoktz22xjgunll4gck2w0bg6o60nnsgmcu2rsbhn4lj52wlek3lj4s5zault11y8cah1kjr4g44n31upe1yvon13z99tyfvez19ow0hcg0u8qc0obfvnchxbgp0h3sg4j2rn3sjbtc122gjzlhkiup69cxi94hat2fwd5l54g07ipvbodpkd3hhi6m4ioztpc4hh1nji0kkvrwwju8srm1j6rceti32vw32gnyuh5i4kmv0ovr969ip71a2g1lue5u6qfluua6ivq8uz0luke74wdw79pnln8rcz0y1tpde61t2srbcua4nvmx3uwd37u6hvgs27rlftyricich9b1cledi2ecy3shr3ybiz14w049cgashk5by9bcw1wynnqmovhykbs1jtlhppfkmj1auw8h7b7lf9nn9oqzm4wma9cbr8nzv81nk7lxxr6visyx0hmxs1evx0mxnl37p2pjl27308q4lrfgovhqt1axma3y8smdy6tvnuktzkadnsgun40ojspyhvpgi6hnja0wdql6flxeel0r4hulltp41vej6054608jup021nw8zef4r027gnsmwvb',
                fileSchema: 'kvoqmpmjv6w57dxub6isbysyvdvfy6icqnul7xbjlp4t8chd9waeokunw92cori2ukw0rwsg7cbxlq1js17u87j3w4oiiw526t6rvbdgb0bzc9ntkhpf2583foo1g3brxrtlc43gr2ez5mlyf1ysjexz7xsr55brsrys0o4hkyodsfgfbjtn9ioj0g9qt7tnp34p3dxdzlrcws94799bng2rqyz3w55xkaf3p2ao018cd19hu74hkv4lqlbl3he5wlfadvw36c424qwx10a3ja468hoixinbut53ih8bs87z4cdx2i8qdjrl6dnfb1407apg6m964mn6aujev1klqe83m4j8ng0ositver9ja3aw25skoj2hgircstsekrz20ur20z5mqitymv6ihlmzviw4vkpb00m4va7uaife73ldwhg12u5tv6y1flebh6f2te2ulvgk9w8bkjyj9me2znht6fzx7gfylvcz6o2eutwl4hjgquh5gykspm7hrqhmr1gvjnz4xw0hurt3og7z28eqik68drpboqj5yfymxgrhpourcy9ovomrtx15kngpcdm0smiq59ymub63cs03t38qwk8pu4sq7qksd070sdjmjc2ismcyzqowxxng9miapqvfsjkj6vulu1rc2mthzucdgucl1dd23mq26xps1z2l84s7ws34ra0apab04fq7k30xkm7rnyitt21nzls0uwz69l77y9crnr1tlzfp18pnsbv2em9dn1y4r0m5g0z5gxooxdz8857dylk46kehgjz1vgphz29xuuloumsb7u3n6yr9isf2zrazrzbkgxlk36km7ffs2haq8z1el2ca3en9vou5p5m4s9j5oxi5b0mntzm8zfcx9cxhip4ovpkcco02avqza9sbh383lxulab3vkm5vpmaljwf4rgl2ihdfbude2pir5aefumfow5pbknocd72d45kmb1926xsstopm2cpfci8xj5p70ip4bfmhf42jz0mb80u89zqrc07j',
                proxyHost: '6w2cbm06x0udhnfl7gv0jkuc1qfvd2ndjirmaa0jpzdxdishjz0i80hzsyt9',
                proxyPort: 8582071974,
                destination: 'uq6l37ue35achciss4gyo6zhaov8zoh46vtqeelfk7kcxvxv9u0u53qx9idfr9d29eopqebqytqyky4rruwnveh35no8xpbasfi98plwg1a03vnw3ggc90e0cadyt34biga1k8sahcl4cg2ofkqhsrv0t69zpunp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qba7j8a56wcwp0brjk2uuhgzezfgrr0jok2oabs8vkutcrorxorz5z34x1yy1gaa5kf4r2qmjuvs3bquztpxuo92eur6zfw0tgwrjovfhx85n5nckk3o8ruzmpioqsbufdfhsxo6fgllnd60sei9vijehi3emq9u',
                responsibleUserAccountName: 'hpp14xbev0onppzbzf7y',
                lastChangeUserAccount: 'syownpnjz6d90c21pyqj',
                lastChangedAt: '2020-07-29 07:40:13',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'y1uhzy7c1lc5q8rdmsh7mi07ujduob1bthvi8884',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2ido4y4s0a7dq2tnaoota03155ct0jrz5z5fwujbpft1kkqbgs',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 's8e1qdpt5p8fzxkt3mw8',
                party: '0dd92bkxlju3ry8k2iaza0fpn0knbs15459qfzghcze4ffnpbv8lf37mxx9b7h7kw3pobnp3u6nuwwq317srqu0g1342ej8tmn4r9em4zw2mycq9hrp75guh2mnv8vx4nuz4lig6730yhtqegjoxm8gry9u3fw8q',
                component: 'te5tanegwgigv0a6nt8o61i94gid8jlhb0gfmhhghjrqiobxqbo67fhay0fvhjqel0wyqyjhee8i9ndibmtlz69rlt5ziysny1l4cfq5njjab3kfal1qy4bk4eolta61lliw0b3tetv58fvfab2yyq0sxxgyvk1d',
                name: 'owzz66my8b554w86o0w9lcyefzfoz13s6zk76bnk7yn02ct7bymz73xpvkoyq18rirs8zt4fz1eck0htaqi27b8j1gdetnovuarmtejpn0vji8pnf6d7bdxxtmgw52y6sh6rlwrhapi1hhao62ppbnybyae38avk',
                flowId: '5e4n6dh1r1yp7qe72g9tmw4sp5k4ujyivjitl',
                flowParty: '3lw9ju7de0pgf15fqtrdxzfodx1rjp76rym3lkah1evco9eej9g7urqjomowwq0vvo8w7hxszf3xehxpqs3fxheg3j8737g3uo13dcbve80fjot82hgjtnpa8qcwn1q8uikq4vvglkk2dlljzvhmdygd51xjh4kc',
                flowComponent: 'bpqnx2vv7ii5dzs24j2kmqnu41plcpqr0yp8wcwpqo1v98u107a80b5cnyh3vqjrqqa4gbzpziondlmofuin3l2mliwdtyzdcr3um9yj5a9m3ydmafn9nlw1r0ol3crcepe9ltwntit684yo89sqeey5iqq8ejiy',
                flowInterfaceName: '1wphv6pz5hgvp7cougteavvi3g4exlifhpfsa6efucc6txueoawijg2jjd3lidf42k35doyhljpsyytfqqpyn1x0bjq9jo5hmauvoldlbkzrc0gtqc1p3z378226ah22p7xgm2oez4bc3vpseu6miuxqjl6eb0a7',
                flowInterfaceNamespace: 'fym52x8iv08bp16a4nmjxwnzjpuhl7t00l9rm74ak7yiqg05o9ugczejc9ogweyrvc1c48lkuhij0fy6igh3go6nga5bw8xkh9xd2e3v7a2sfqfr7u7qdql788r9q0mu6zb9ahi2kipqrrktzfybq7tyomngpk4h',
                version: '1m8ixmxz4idbxuesqe8t',
                adapterType: 'o0wtzrogp5ox9u1ef5q3c65ugs7tzt57iyanpwwpm8ahm4h3x0dt4wvxliy6',
                direction: 'SENDER',
                transportProtocol: 'g0e0dbojf7rt4yutl3o9wo1lncoiy78n92wjc16rz9fzjhg3puzyvw5lp458',
                messageProtocol: 'wosheejp5an2wz03mki53jmljo0j0cjgykr5dn7lu5a1mslkd1bmqqq3mjqt',
                adapterEngineName: 'txzdj7mm0y7sivdrfjzp9y9lfff86w1bk4gyq0euq7gw7q554j39pg8zacno1t9bf78tcbbcg4oqinmc2jtujonr8jawngh07datauueka6uzw1dp15qrfxq2i5x1uzpyiy72vvdpixxt0i4qk7gb33vnwustj4h',
                url: '68yfzu9i7cjhvuo916fijf8dn2coj6r36jg52tw7j319h9uz3oo5cm0c436ocgd3jy5l3wt2ztkpwf6ehqspb0uaynxl1n5j22botk2tcy5z9fvyw0epf2hwk00c4546bsyat5olauufuj3tboj1w38flaahk7ygzx1zhhgae0kwg0yy2f0an2xynt4wkhbz3isq0idoml628xfrjqv8pct2rbbczk9s1gi4s4d3b6vyl1kiokl98tudnv9akujk43f7wlgyqp31g28yow4jgo8cfmwdaa4xs92leu02h5m6q3z2mhbomlxcs85kvea3',
                username: 'aoulw74l49qs15g4kwn07yxykhj1dcu4oukaxcz4j1jsegczkscprvngn4lh',
                remoteHost: 'bc8x4gqmgsk2zszuwhwoazev222llt48hvir0zs2i085r3ry1xfkfyw939ysmqd3bwdjtyvqogrvupb2hlwgwvjv61u04zs9tkqx7cq0qb5fblwohymxv6wxecs77f71ma7zum7csewjtx8lkk0ixl1pwkc8eroq',
                remotePort: 1090064194,
                directory: 'ege94qm3wmteuabkwasd3nwrevduu8sczeqjmzv5lyxdzhj9htww51wemwokvn5f90f9mncqnxapzp7mkebyuf9r2gxpcailhm44i0zkzzrih3s8vye1kiyf6hl300ov67fvww4k8jleo39ftq22a3v9c6wtnkhsmzzz8hck2m09oaqz5je6hfwuisxlddblwxwwgi1z6lpv8kobla31bu9phd30famz2mnqc5gdzh9b7kgnlzu63cfjdfdq05fvsxrrdobzj412cnr5f8utfopffk081u6bdfqhmw197o49jync32bgsdkkiwx8g8o3e2pqdv1h468kkrptrwzd84jnxpm3n2zcc2mvdqltiqmxginbbl04bn3cbpk4hwwh5qutx9xwr46s423aiq75y0ioqf30d6f38csmxgcvjx8n6smexz6ip6xo9lbnzw1qp2eiv5veaeltmr4ez3nbm5xt5l3ntv7v6kkdwv5y5y8k56aiwceesu7k58swrkd9u528fhw6jqhr0ut492ml611ftwqj8u83vlzthyha6mdshnis3za5hp8j60zq64j19pf41l2nfr8c5svtdaxsmjk2fh58mujcrufw3n8zjgny5zpyk85ifjwu8nzrwxm15farct38tp8a4lnvl0cr9vcg7vw9w6o1n04orwa1uco5g3gq9n5wt9acuad5a9g0rw3qthia46d5y5v9pg2h5fr0s7xkqcqjy9hhy0ivstta7hj89wurs510dkuu7izcdtubnkb7r6q8z7t39iuva3p1e6suvw74483cclz7k20znlq4lx3og2ganewujkt5ful5j3v72b8ibbm9sh0vw3b81ppcaz1rfhocw3wo7vle1p9xghqyajb5ko5ayt2n68l21ocwd4s4haa0mhb935xb16nne6371k00q4kbucli6g83lhk1zjz2cwvp39ven613a3t9f9qzgbywtjr77kppqnxyxcmq83nhqjn38prrot2qw5u0kx3vb270s5xj',
                fileSchema: 'qzeiw88o95xkxdi8i5t1ggqqi1cs3s43jvpuqxhies1cwd2uoy4vnrjp5lpn8zk2e0ctyihzhjwrtmxffaoiet9neib2y650o6nlzurrpf9gnpdjvnrvenztp5fg7ak4e5pecwuqoakczlm6lyytk4c5aht7r0j5hcm0311dv0p1wc329m7m955i4ylrxyn1zqiawbdwx7d1u4sw90sp7aattulodf9swevx1r92ftbr1uhynkd7a5larh5d1apay238gypyyujnzpxm7yp28720rwgv2e4nvyl8pfqytq10sstij1n1hyq0hhj5riqoezi1wydikgn1fx4gdq6wg1jpvpoql1tey14lmkuz7yu4ocax89ofjzlb1r2bixg6tcd040ndmzvdfccar8g3il6borp1l900zbgpcyrfyp0ujykq8ttcv479mtjs3ndh3bge8n8ko7pzsnvdy811o7qjs0hnf972ihldn2xogp1a04qku71cqb9xribxr2dw0itmpvoiivyvqw7yed0q1q231rrt7awkeurp9u98c34cf3aiojz8dt6usq240e9mw3qm66eyetqly9hyzi85r2r7s5prkb9yra4pr68i277tkrwmgxlxqndmauj6ohis6p3kgsnnw7nlscvnay6ea0zk3t7au044osaqrxz789pxmhygymxtc3tyfapddwssxb829df805a8kzhgckb77it56j8h11tauionzak1wn3s41v5avme7gojwri53kkc8e5zjgclaxtqoo3qe796k9u2k06zssxbpiddgxizunft8dxxl3zc1m2fa8on5ivcihmqa6i1o31foeff6a0oswbr3fvneg24wp4jfz77vpb0nhmnfql1kjs444b7e7i4h7lo9mt8zufn8alqjoi82us0whtcfct7x20l7l2yp1f9wctjxst3pthr8odunr5cd7459ky0tw680uly58wchoypn1mxla7wlvu8em36huazqw4xkq2kr1lu05pm279o',
                proxyHost: '895b9vdnk2d59wtpk607pxx55f33yh9w13q2tgotk66krwq4p47t75i5zm8f',
                proxyPort: 6253475849,
                destination: 'ckyyhai3dgcep36onjk72nik6l8qe9hu34izhav5f6dwdee263sf0smpzl9e3ek5zof7e8rp0uh68p9d2v9ozd9rrgjiqsj7h2v9tru9k9xv8rrrezh94t2wpp1p7s9zdt58cxdo11d5wcntk8qrj6r3hm9nuhhv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'awmi05arq9xcq44ja7nfweu8f94va2ucys04gld20r6bny337pt9hyarm14pfl4oqz39ado5ht5tjueffsn6guog4g1a2knnd5ordxdbrv4j4cwj9p3yx8hyrx2n9eupb8ow4txbqutw5kmxpgzo1fn9r2jljg2n',
                responsibleUserAccountName: 'ct3ypjzjhwjepzymjdoi',
                lastChangeUserAccount: '20medo88kgiy7pugtff2',
                lastChangedAt: '2020-07-29 05:08:10',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'kjjd1qsn89z67dawifa63orb4hj8iabp5w8cj66b',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '1x7tqrrh55eeczjxa9jwlq15ni4w9kzl9po2q7yx12me62grzo5',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '73bnt67m1z12ej4tqyn1',
                party: 'ak2ufoqtyd7qq3gz7my9puj7zjtjrdwstg5oc7tx8vbsqpq5hftuvrbh25j9g2oz9qfd2y0bzi8t8ltc2bw1vphy2jic2fz67h31tjjhtvsvey4gx92oxetto3xgv6f38joxde8xvm852rm94ugnosefwby5q7ka',
                component: 'nbmwyk0uzqnczekc5ae25kb79brnfeiemlc1mqwv8rebbjm3q6wm3ymdkdpgq6gh85umorutbzpucsctipgy3nrhwlreqqzyn7k60mtr52m063w1wsuw6uqhra4iwtnjuwgptmnat8wb6kem4555mowi06akj1pr',
                name: '66tlarug5krmwb2nvns0335djvowi8kw5ucxvfd19u9y3gwpam2zs9p4ee2hdxntrca8neo75rq4gx70lof7s4ousp4pm7thcki2yiihrwhocxbjo29jru52xby4pifgvejh3nlj3fhmmhuljq2u4lf10z9dr5z7',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'saei5pb22uoxxnp3quuocr2dg7ywqof3w7i6ar5b2ro3saoqtr9az4p95c4ca7dokd9z8aholz23t96lfg7nxnlgay6shut4vdmx5p2ok460bxz5h52vrhiu2gvl1cmui5k8vz1x5snvdzbdlopkwwg4cclm7485',
                flowComponent: 'x0wl1o4a8ylbzqhp1a113xcve81u0hfhgce0iemobntdlm70bgo2xafri69z4cti6u0buyccoif5h32pnpu3r6sliflhi3rh9z800nkhekduzlyu7idseqak69lzda1ez1jq0xrj967nfqb1xv98sl7cwk3iw8jp',
                flowInterfaceName: 'j1kiv1eclc5s4ymtvbnfzwoyqblaknewmt6f0i6waottb9bxisp1p7xxjbnrrvw9gzr98bww08psmde1k30yw9stargqott61ggvtiws08w1e4by5qctxztlbuegh9iygci358abp8si543dafy6aqr17nau7y7v',
                flowInterfaceNamespace: 'bx3kv7gmsmce66sueux3crvi5o1id61kwak3xoglogj0kggocyxwtboatduypkvwkfah0k2p186fijhn4no4paxqdj26mz2ypm310jgjztvjeldxanefnvpmu387812l6hb39wld03i6s8gn6lsknynhvrl0a9wl',
                version: '7i1rk69kcw4ccuwo7g8v',
                adapterType: 'g04foafu46y9bmgelothqicdxvzj1zm169532e5jz3xm3gosvg8cohk4guh9',
                direction: 'RECEIVER',
                transportProtocol: '0h60novwpu4gxt0nbwi61a34oaqnhuzo8na2ckdhv968r5kmnbb4q7tz4vuf',
                messageProtocol: 'p25yfcoksvh7ww2o7x19evtmdh3pyk8hnnpdfjgqy9mo1brr9cbptsfgtnls',
                adapterEngineName: 'n1lt7fdvkr2zil1visdgc51rwz3wj5uvlp07it1z2wc278q6qj8px27hi9y4i16kd2ucga06h1z7lbsq7k0eu3k2xt7648hcqqqnpo1pvrlvve9geqdleqtytstwzvqouuio0g2h1vf3ox10u416v4sxnl9erw1z',
                url: 'xdxtudemzgqupic5rpy3nupjfxpnweih243cws3xzprb96s7u8iyilm1gjnct46xpi61u2wdcrfjlxdgfzbrgwqe3f5m1emujxkuzqofqoznmv4i4qmjhxg6ol2xlmo3arqrcm6bkhe9z31yp3giawh0x9i27pc0bhh6tp43kcqh4urmt6bcl62djburzyv3y1s5di83dxnz64u9lh8b9ihftmyenqwipu9agloewefa88ng8edqx5ch373zgk8plb8289bh5a6e435bhewukk7aeyty6y85986uc5bv7ooh3s7vpguki1e26u2xvqbu',
                username: 'kp9cmtu6v3vu5fsz0eafmn6x6l7wwvo97049bw24jstzlyf6t2n44d40egiu',
                remoteHost: 'wucv7lpad17qq2acivx79067r83a9x1j4ctwrxoz4dlrc1iifm07w4bznoaxdj9k0p1gh6yuupifnv5pwseyrpo5t2lejxokz6wpv3f8jd40p5blqvcwv718iozg09ssz4rzyqpy241zfpfd79xk82b5lb5dkf5l',
                remotePort: 1385729857,
                directory: 'cc419owawt25vc8uec0i67tz4x2iy8000bn9rozojxp0kbkyvq1q5rqkr4ezbbwe2pytkxtl8iniui92j7whoyewznykqp050cv779ml75xwj2a657c6dikl862tlcdaxlmuxagsvdg2pk56evb8nax97wck77mx4528zo5yo5pf4ikxkfjumxvkf79jwxur1b9gfj5c5pf92qd7fbhxqf86ju46tv2p8c1d6yeq8csy55jdwl5sxd3zvayvvps0mzhu47ps0avtykkc7iwixo3yqrp33d873agufdbdmcwwb7zvgr11pqui4mbys86wmgh8et1om8u0i7x4gz1vx7c83gy5k4iubwx3jyzk6qzpkoslfegmrdbcfbsiziuos39ggdaks9ut9i05v6nseunfga6xq02n83m3shzu2oiqq4arrcjpekapjroeshmaitqhmdobkxx206quuuhyeeus292rm3yzp3tgbg9gmxvh2yqijwpzga04tcdtqxqom00ffkvvk2c9i9752jqfshwmptr5gbehd4qqi11iups4gd6qw21jvpnegue6he5js7qbbfrgvubcmsk0ta2bsrzr1z0zlqfocjmdcc2i8myuk4whkcd621olv238o89oonkuve6rlmypuszbyvrudfwkcxz4vbu9dj027ri7on4q2ju3464y41apu26j5onvduodp41jl0w6vhyrbxmsmbqamp3irzd8uufisgpouamrz8ispqxha0v5chaiijbkc24cy3vxgiwez8fgg557pls3setg5d48hjq0b7ozc0azshcxj8yknhm3t1o9ptdso74gdw10yxllnrsuajyt4jnxcpi718b0qbkk1on5mxve57igk4v95f2kfmh09z4i4om8qffyqtqq55sju0r0anhqbk15q4tom70fxhevnfzwzi2s2vul2j2icy6qb9can2bksb89mty7jtqqozp8nuijwfddclgd6p65zq6vssvk96ywgmncn7gzh1fqoh7k',
                fileSchema: '7xr5p5twy82f7azqjspa0rsxtqa8qvcqlya7457szj2p83o82cgcmpqwoiobrxge8aj5oywbayh8o3qfdbopl5tl73brdn8q7hx3a5y9akftb85xw0g4lmuqzaf7bzrrc943qjsymcv2lsarbphasjoc1tgpqe31wqmepganfwnj9y5d6f06w7wx5jss5oxo3ntum6d1v19hkoza8iwnwconfcp41qb8me9tu204k5n2auqq56aql6so82dretff15y1mpcl6nfga0j49y6b1gikyb2d07sfz5ookc78kryg7bdoup4megzajxbv60yz8tykejrp4tlpbo2fz3wqoj4yqfrqtbh1xgxlymm09uoeqgh1ashlbfh0l7rhuj84sbfvn5p3bxus8zjrwxu94bst8pyiiuea4jm2b0evmhi728te7yhdzn9cmf8gdkg2i7nkuqo5jbc2y5aj2zldthhlkwv8172j3bd7dp06h5n65b4r7f6p9l8xilasxvuuhxujqlvoxqtjjxc4zsaba0bme2b9hhhwfr353hjkgva7ee4w5vqb2afge8e5pegbh3rbiy7dcjri1xnyux3optw9fwb4asmkxgkjok2xhal3ce3twvh13vfvlkyxwe327vukxg8jhjif91gichmwiin7ryw8uwvqlpyifk6p14doj4mt0mxhmex08q8lvo4ncppasa00894dqkr42ysx0yuhensct5826essiafbgmvqcfyz1ne506hubs3eeukreqzjicfyp74uavm8bv3tyf778zznk8uzl2pxbrhn6oy23y2u0gzjd9pq2lyefe203uq8xnl5bjzmugj7k59m332lpdn0t6rpg5ufksfz4ardk0u3p6k3nl2twtaskn8acwdfpb26chhfxa7hrdxvcbc372kts5vf9qr7ty2zr1he074w3l28kxvdhfxjj69tjvbbbc0tq1w0p3ik5le6ihrfm3ls23owx4aamuv9ipd2zs5cw2pedq0glpscjcvo',
                proxyHost: 'tt5lnlqlw48bvg30nri5m1u0xwq1jps37fk0jwbjlhyyou4pmb65m5y3idlh',
                proxyPort: 2491856144,
                destination: 'eqyhaqihjn8t0ocn4fzdtzrx4n62gbgy1zoqnhpwmrz9sg4zcrmfgpbgk7ijjiecewei35d3b5456z4cuff86tyznzk6clhfns37mwf2xvitohwdfsdho210x6rdhz0o2thoep2s2bmxnqjhzi6rmb4m3szqae13',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'adn8ux3n6j75actyniiyv42muo02u7cayuqanzrn157d7en66ru12o07nf0n4njt386xpf413dfu06rnrcftgi8eow00iatcpokvjku7ic4eqweqenu4rsej7n5smqyu7knhu40r52qruejz64kcj8hsz4l6in9f',
                responsibleUserAccountName: 'jg90eyd7t22u7uy09jub',
                lastChangeUserAccount: 'lo562307mjdx5x6mredz',
                lastChangedAt: '2020-07-29 07:26:21',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'vpx8iozo03caw9pedsnqbn0aqcxv0l3ufpbg228e',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'jtlt6tylc46pcss5qeafi2oosypir0tzicen3l54wm9hodu8zr',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'xugn0lmf70b00v2uhm2qf',
                party: 'iqkpyjf0x2lhgdw3ytk1wftzq6tsoq0xbamvunzi345khnvmrzcw0khcbh3b097e18c0cyeifpzadp8fhk48mg8jth58bf92b7dtnifqfql7xlk0lv8bm0vgvqj0bxk7q2taz6ipsl9w83eoejh6kge050ox75vk',
                component: 'o7i0eu1nziip4knn7ah6xui4akxux0zile6xrtgnaetbi7xmxwe0v91vr223ghdpjrhpfojkyci8qzebn09oni8zii052c04a9xm0yardfqtq42wt2a1jrkl5mjcl0ir970p1d73323p8j4w462tnenqlxlzhpit',
                name: 'fnsh2g50nn6du5mk56ba7hlfzzbcnmxh15doylm4n0mm1itiuedf59g5kvsrgpi1x88hwokv1xp5zd003u3j728amgr888qjrj2kr6oxlhq2e8ozc23v1n8sq1wlnz641zs7e1abyyshsu0nzszv7zfve2660e14',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'yuygp3scexo2n78f13xywwke3jrcl3jukzsspmd3hrtebkiefvd564mre2cnpdh54xizgslbgabkpuiavjn7r26oiljjzf15egpqz666musglsss2uvaoed8kogxeh8kqo43i6ycaop9fjgvkfwd0f0ae05bszn3',
                flowComponent: 'acpgvm2gjtufglweh1lhtwk6lndw0tcn7utua5e9z7eowy5s0lzses8uqb81m7zo3lb3v4pklgu43dvt7rqtbu1o7lko0hc9iav9544eq06j6vp8sdx19yx86nb357ny8gizscvn1uead2uf2miafpytjpmm3uh9',
                flowInterfaceName: '63w4234osjg91jwiaxt5x0k6m5mrdgbo7p76tw1rd5gsqlitgashkhnbo7753y1n0s7wnimrdjgorvne378p3rdpod05en158vdkx62ta1d9bsg4edqnz1x1alkakdozgttsyn7a5iarrzsp5vtft6azb9zrwdrt',
                flowInterfaceNamespace: '851g6fvj3y52dmfd8q2iz2eisonlbb3tj25fhu81ebm99eequ6wmsxn4knvzuqdfw1gbq46plxc8xv82yjo79qlamctfm08w1lu38aw7vmgkoncae58zk59r6rjmjl87g5rkw9wg639y34jbqjiyf5upy1vnhjde',
                version: 'pfugmfa1mgdbzb7qlyz3',
                adapterType: '21u9hlvdmfuwgc181r6d56x3m2lyqfldm2g9f6tu4581v7nfmk1c4d5ddwz6',
                direction: 'SENDER',
                transportProtocol: '1lpozkfv1vdqiqu26jic83g2otu1kox9r1uuxgletmc2kmjqndjozignixo2',
                messageProtocol: 'tenr400y8yzh85t37mq5zn1e2bvkitkio8z02fyai0cb32mv7e2oisvftgdq',
                adapterEngineName: '8fmx4lvh6suc5lw5c0gw65fbaw3ydo7r27uhlrnbjfjf9susbsjqzcvmaf0ik7v1dua6m7hubmpakur944csforswzkr8nwgjk4huodu3uuma6d9q1gjrc91vsvq3m8t426dhf9olqgb4deuu94d8ezzgkcdl1sk',
                url: '97a0upj26f0aa8axvfgygh5duzuqeaise0mgljkj9pbagrghutdzmwuivhiddu0llgfig7qj9v05j0dwkmwg5rokj084b72vkok29vsm1lzcpazcfvv77cdz3senf01089gdm9a5bsbzhq7w08dzqiikkurru00l3rsi19rlcvl1djmj2f3228gqlmfslmpsntziop87xhi08otw5i1d0lb4dnuhwmdv0n8c69qhnvsj0xd2ydy5rzh9zy07izmihlyedz8tkd16w2qmvo0cq6a6k3m243a3rip1o15izgn2x195rubcxkx4jh03mmhp',
                username: 'ayfuwmlpoc1qy3yy0cn8hzozhhgscxlee84ugao671rip5n6un89u5317byk',
                remoteHost: 'z8hfqqp1cxgya57byd509ze6dczuop3mdap5zprrqvh8dzkgt1z22z4pf0gck4iur3p3rms177h0jm1ufnvddvadlfvoyjha09w8fsynasjbn8r031gdhxumm7c6syx00l4jxfmi6pkwvhsvh7glt5t0k4jfumf0',
                remotePort: 4045554623,
                directory: '3gs92gnhftf2tvvrillzwdrgwy9sv20ybrq8wu6l4qzhqbweeagmp72o6y90daqotdbqh4hn46ksttiz33u4y89h9oejxlum4mw34glmt7zv0bgwev6mazx9tc5kyt5fdi6ady4sizrsxmux4dba2mbks7zq34czncfkt1e2qfhxahqtg855xow5iucd5dxfjc91z8ufb7cmys4nb0rw0qt78b93ny4hrkxykz25cvxkn0gm2t4gntj4h708uva4ksrd7w6iu0fww4i0fg6q14z5xn8q2d5um0fz5pdp9jgxho6ceprc588bkbcy64znwewfydahugq8zw3wvl5yswz5e27sx74hxb61kp315cg71un73i5pfgmb518zeary4vjparxibbyufd05v2bnif84ay7sckwzmq7mjusaa7nauyriedvjizeyseonmxpfj34ddpz7xv62ueyfc1fhi0w22csv6rh2c26j3s8mls5nbb2fvwdbm3ef3j0vndls1dpz55b5yr16hu7bylyrvrenas68peetcnmz5opuk9aliwhfmu5uaqffs3ao64cor1al2zqlma0k862ow4f3xajkac28e3kbuec84f3jitk8wxtb22glgy29an72gkklz4wstbxqhvc2eyo8vyv9nt3lr6zs5n1bz3zgnt2vkkp5rwgkhfryuu3mlo80nasfmh56g4ojkrmxtporiou7rboln5wipvie8w1uhuxch6ahewwpwphrcxg92xgmv8mvtmstp9s5ggwee10cbwm9r9wwpaz3iocnlxuax17k8s618d9mpgg4ldpbdx926xfxbwkmv96behn08xpyfrtmy7kjo89d365i3aaqcp5s4oaq5p6mqytyr5mhse4apfqfk75pgc1w6qzlm3vkedb0f6p5wlcq5y0v392do9abu1cfzsd583ukknht24h257y36jevlay3io87w11q22irwd9jjt7d72jzlprb9jc63xv8fnq0h6cp6pbmyom6ld99',
                fileSchema: 'l557s7rxoikwcivxoch19rgmn3qdiap7zed6cuoetv7sa9q55n615qogcle8v7efvcbay3pmrujwxbafdyzm2276k4rv23t9k9uie8n6h5bjonukjzo4lkbhcj8t0c5s0khsc4h2bjf9a1fv9c5cvyajyvpljwwzjbnlspkrfkhh2bq895sq1eh85a6kb0z5i3sqdk21ubwls94oc3kx6eh99ulr56ym7z395pcmnng1dhpxcop23akqklxnmxwjwsf4cdsc0gm0vbz9bp577otf66giieczk6i4gnqu62pzv3ys2jacexy56qmg2ivz7yqo6wc7q6dq8elhniunfuu0txi47cyrxyo277qes2ljiqgmuw72rgoxfkmtxiz73zmwuvgxm5c5u7mkd6w5w3wmzlnf5rn9zsah423zwf01fm8xztdo2t5un56rg91di3qmxaryspkc85gghzdygdu1x6gklf8lxj90jhr89fd9aavu8d7rg5zczq6vgsbbt7f5ha0hhqpt3h32xx0d0nk95xq5b6mthv8bhbba5d983ox2f0o6xy0tjfwd14wapk0b69llulemim7ex7kvgx3i1r065a00gufrngm4wxh04k0gdpim7a10rbsjf2e4b4l293xwib0mw8vwb93fhu0327cx7eg4hsgwhx9uwt22hhgpvzortjp9lm0ykbn3ne6j34wlfkavcpvd5w7hzxkksg5uulol6bmrsv7n1i8ojer8y9nbst6bz4phlj4pecnjcnnc3p25dmqoeuic64y6c3xfzfjxf46b9k7yk1ovne3fe9hp44azui2s8emerhsams1twbrite5m545f1vukb9sikmzzro9ew0rl2szuxe751kpyc56wbxo2qftikp1hk3le8pnrc01730jbbr82ohtzkobdhfls7w3xvc78bauq9qic7xzybrv83vfl19ch55cywd6n4kul0vjt9jntjvstnqcl4x3mir3gw084k0wuvd5ho9q26c8r5ikx',
                proxyHost: 'r7u4067082kgdqr2hbpr5hgwluwy3h5o0hyed2vt2xl0g12ld3yy0pxjn477',
                proxyPort: 1251457646,
                destination: 'd5tj3lyhiaqukzxo6p6zd2a3lemhk1487athacikmtlngnxkv3pcwicrm1h7d64wpfjns3qqiqswptiebps22tyizniye9l8zqcruj02tm8b4b0roelicad9bf5xanp10by3xwe1fugfk6v8rt3vzyn1ghi7vd96',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q8e9kn9w3wbdp3kh8uypk68jfb2883djmfarycxkxnv8rsb9d8d4u0wvmyn3hcc2q7yyd8z5jauc4e72173l9rondk09zas09locxzieq6x9rx1g9wf5a4cp0kqddocf4meir5kfd5nplns4ivgmjqwuk5cyel4j',
                responsibleUserAccountName: 'bkdsdsralnphad5c8jkx',
                lastChangeUserAccount: 'e4h0b2tkt9h8wz3oud0k',
                lastChangedAt: '2020-07-29 13:27:05',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'w1kwq04utg8yf3k5evmp4c2ootosqiz78bs6m5wc',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2whymtgk5yk73avvuvk2sta1b86ds6q8yy24yssfj4l2gxljhi',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 't29rjhgn4q4n2d7crpf2',
                party: 'ftsysxxh0663jofie1ef5v1sxdbjgj7tlh195t8zx1sa2c83fes7l2q9z6jdt5al80wxvd78w1bfi6zco4n7zwhl5be68mc1zpsvkxlv4xuucebe0po81i1n8ktmdroqjqeuig10vy7bua3uaz6ag53h1edhyvgkt',
                component: 'pf5wcyymdjypgpm5rwgmkt47969x349e83c2432uvprmultgqflsfotgvxdersys813e0hk9m7d4kpu3dzq0motzuet7psxvxmjftnoss8l3h1xh1bs0easlunykp1g6xvxkm0q83gkt7iv88g5x057adxuajvag',
                name: 'xq1lz8dt5mdz238j58okef1rlvjpq97cz7x1a400rp2vtgki9jtsjjh6g89uhpvlpsy4qhvijf936rckr6ra9b128dhf8tysiq5vicw5v3d01r9nkj27nz9wdqtig4hsk2z6p4n6fav044npo257nwtc355d1cat',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'iv9plu8yw3ulkpt6icc75s931izlofjh5669ofqtbw8p45zziw8v6wbqxbdj1pw7uk3xd1wx1ndprt823e86upb4z81xsccpwbhp0kvf42iliv1juhs8zcowr0aio5sh0hlc6fns28cxgeu8gjngbhq7y5grlgdd',
                flowComponent: '2yr2vh1rtkdrzpuoinphfw87i2pqt8ncehv9w7r2qgkv1q8mv18d2ucfeq21ba0zjflxji7rz8g339iwhsewzkb4pez0jyynnpfpopbdxv0qwub01t6hcos3072udqubhlaud0zp8ltn84t7j8j6umeoancfio3b',
                flowInterfaceName: '80h9ht8w1hpa6tolb3x9pula2d3fn9ejftvc1lyywy8t1npkecebvafaymmklilo73sn4mu8jiuh1xpezijat1hsxy5y4inpo2fy087z81owkkjrw42bwa4rfsrjz1ocj6jer7c27dvukxrwt2qbnr8koxkim563',
                flowInterfaceNamespace: 'sd1cyyhk5b7qqqsn01lzazab8vnpegm2ifd6i4hw8n0y22oe91pnjv2e2tbp4ej47uc5kkwg4amvl9fz29cbt0nrffp2sxy9v9aidpgw7gg1cv6desqoi22yqbrp9g626n6cnfueiehfv49kyeg5mcjzv73y2qua',
                version: 'nov9lx1z68m9zzlxcwor',
                adapterType: 'h3l6otjicxk1d0fc3o7yjlk827j6qw5rry53adhj16g6ats528yre7jnwihj',
                direction: 'SENDER',
                transportProtocol: 'nflwfry1nitvh2v5740n8hxarabkkf2g95u8f21da1h9jomnmm9bheektf4b',
                messageProtocol: 'xxjw574sozywozsq4ba5tn11vlwsqcoxl47727zzw881atnkaaeqivmj0h06',
                adapterEngineName: 'va5adajjc9dvjj1xm4m7mnsxvxdq6vowkxqg7i4itwysze35qbmenclj84su9q4800tevv0lciwkcb754ee47iwm3qf3q3xf192vo6egadrloer0idanjs4xxszcm4dzcqo4jozjjzokwhqs5glala8mhxkipeef',
                url: '05c1y4ik9cxbxmzgnlfgoh9evea9k8l6ofzuttssa88ddwtzw13ysauqx7o5gx2a9k3jpxqy6igdl2zhoik5xjex5wff1w1o3lxmwflc2uri8qf2oggmhrh0efakprwiispybe7civt4waz1m039gq1vluuv6f7g6s36f7n75wavwh2ects3njixunjsev5igk5i7a14fbk97mjfagfb0xq7uvvu133c76tagt1yhoq3dq7rvf3w82y1z448yk91xlt46wixu5skedspta7e8k4s17qaf0cpjbjdv3ib1c6kmiq8sy5jnozovjdf6790',
                username: '99yzuyhg6y1dorra7k2x4vzw7pxn9wjxnd20lvokm7inrn58389o91blqfk8',
                remoteHost: 'enr8nhnx5b83ikfij87v8fvceuwbuqc8oe404pjf7xkhthbcjg05kyszbnzg3xrc3gzptu8syft9ao3k3r7fkx5ycsz66tl52wzg9u3peo4p39v1yl7qrwtlyq8qdekw138afc9shs3xsxtukp0o3y2ewbmrpu1f',
                remotePort: 1196324020,
                directory: 'udtbb9005cn2fvgtdvvzdt36th46tybppxwio0b1q99odazodmpw1ct3d32cchtvb3uguszfq9f14cbfw9eahiia2g190b2xs17t51ne46wtivw6of5zk6apt6equbsimwoa12yd6f37in4wk0cs176h4bir9dx9pgwv03hy7qdyt90b9oelx3im0tml84kj5dnki2pc8zvoxo47qqkpozd74pp4uwgznhgqiw4phl11cnl5fd7gtfrbbvyykg4cp5eaalpq5jy2532c8hpu42g39q306lexat74d0u4ls4kowx99f7cxepk127x5hq2jx3nqrwcg5g0bnxnnkmxcv8iiro4ysz3mqotgtc5vlcoij1zd3y1vfnq67hdh0o49361yxz2ytcgr79ycxbwrq2tdkteladox4ugwksxpt09n632okgvphuhbm78d865wi7a1vjfltg8u55u2js7ti3xrqozlsvl78j6pr601y7wwst23gou7wqm52vww1lvm9bxafmr013x0cschqbcjbwy2ehw9g17f0taw9j2wkfno0paccrqndcrj9eaykncek3ghx621xvhw22z0tnrcq9bl02l3kzjjbvx4cleecic5xbhiongobz2z54eznxno80oiok13qmvrjjf8rihu90ns5cgs05seglw5qk2ijb1u2uy92d72jltak35hy8cby0dfrpqf3d0321inlit7i3lqy5ukkaas5q9acl5oxogoorii01q2k71p3udrtcg6t64mkvp491meshi5r1om7vem10qc5mi444vjaekhjxuago5lkynll3l2fft5vb8pnk86jx9qayew8jdo1mzirmvw7r8178i1zpz8qpi4vo2f10k9xh585gz9uw6nv34zjnimbkl9569gljm9nzuuwgwlvlj1zzhmzdcfhg9vlyede7olja8jyw3ffkk9ieg3rywof4zp3due95a6ckmx0n53t0avbzu05cxud1bhva9qhdc0wiwjq7kekm6xt1j',
                fileSchema: 'y7f1cwdilx1vz1u3hgtkzens8l084ztwqi9y0va0i3092q1umpiyh2q12qjcvxjhsw2w23slt4qasbir2230ggsttyos6k2u6xkqjm8kaa2t8ymu9l39awrg9poqygmnc88y4hueyr2mh3kiygsfxv76007r5sulai0hov7jy7hixg02lfnhakynyjrjf7sr2jam66xalakk5a62xrqfnwhlbggpzpfiztug2b3kajckcdav7ff7ngo0zoz73knen9mk2or0crby1iowshe4tue1hgaa0doy24gxwv4bdkwii8thc120t4gsd72qucqz13x6gmpvwqwn8a5sph6vk22107b5kkw2ts4kqv4ayje7r3wd24tm5bkv2amtq18r6c5vnjkx9notzsk2eipr5urfo44szl0cyw2x0rwrppodbcehm8rarupiu33ns666irnc1gle71oso9y6n5z9igzwr9k3qatjmup9he7sm222c2k5rldaj3be1rdytvy7hf8gughjtelhghtwhu8lbfsdnfjjqilrfsi8u1vxashisnj38y9fenbz7osv4itwdtubhypb79ne5h8w1xlea7d6fgnkm2ueavx6dp5mxmryoub9idbol28z5njt4f6swwdycpl8gz1mmtrdv11jlr1pexvvw5j6jf95cghdc0yc6g4f74ahc8m09cgsfcnn17879sot196jsx33ugy2fskbcmxkvlbtn2c7pjis7osh9mzy8kxkac6f6r87v0tmds7rivjc582irgb8fbrhwfrlw1abxolwh9u00k9pa2cbhzku9pct8rcy4ymycyxjhab13uhwlm3nv5wejtnhfsfv4fjnb9v7ikhor6eioei223ifso9vxdra656epq0lied6ycpw5aunezzre5ymfwb4birhtenbswf9sgs8lt506cqtwkottg0o9v72fwbtfsxvmp29sxlytvctk3v1ix8vx5onwiy1pk49h0var6uadpjiea3tnn2o4tmajcmy',
                proxyHost: 'w8jmy1vs22by88v3qqpc80p5zataqtqzue3dqhem2u4kl15meps4sgi3jit0',
                proxyPort: 3091949538,
                destination: 'b6cr8889bxdxf24ofktl7r8mh2rkbmekhfi1znz3vg14pfvyrn8t79xypivy2hcndcw0ms5pdajqvcrdhvikjohscofeq137swds13c9u0n9t9bzeyll5097sxhelwmr1osb66ru26im921tg9n7csxp5hibnnak',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8k3ebwqo50ev2ruhvq50qeey4qsdvb7orlws3bc253wwimc45f9b78xv3jod2p5kzd39eld5mr8ormu6jcw0ez115suwxcokizpchm12tjcq9z54r8svho6pmcg7wmkeq9c2xmsr4z5iie9zb90rtjxh0rn4nfil',
                responsibleUserAccountName: 'fkx40khx8cz0ex9dv166',
                lastChangeUserAccount: 'cmfe29ds45cx31a3kmzu',
                lastChangedAt: '2020-07-29 18:23:42',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '8wsvhuosnek161jrdq1247xkkxsp4i77mwlhv4z9',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'ba32zwmk48g0i1h6dmh3mc6t1auvb6wdjw1jzq7zrzz9xvmfz3',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'gyqw2oj4s63a7hjmof9c',
                party: 'wi0hy6lsugj04pn7e2av57c5zzjczwjqe9vcwy5amez8r9pk838r895rvuexx3ngdjb4ei21c425mkh1ft8slkw8gytbm53d0ccgcqrai3fzh2rcumsf8f31ucf18ebcvycxjln66f4o4qlov9yucinadx885tsz',
                component: 'aehh6ma7i83271vxajn9nz7v7tw2dd34epq1en8zydrbsumki5zzv2k8o3gyw8ps4pr31q77sjq4gqn5d4bpy5yg1gr665cm0t6v6y5bxxsmbcbohzi1x4fxbl3gor1mafbp2zyfiyvxk2ylj6qu1i9563c331glp',
                name: 'd5jz8njq7v14fvkgvjvqp3rkswtxhcxkqugj03szb81vm1r84bzd0t89p1wz24i2j5makdgpmtjo2iu7p5cmkm8wbk3agcuclp3rr3d42cgrqt3uv4dcvzy5w3vvnlal34zpajbys3sol35zrjmgnbhh3697iwct',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'ejq6yrkevt3quqek4jc52bclt81vbugsy1s53qcj7cz3nm63hh40311bgygv3iw1ztuyyr31awdrrviibnzn50kfefordcx9woacfluakftoopczsthv8sv7pdtvyuh56lxrly679lwugw44fff28fnti6puqg0w',
                flowComponent: '76lr9cnc99x8z0twg03z6u4b1p97o0fg7lkerv6y0mjgwy61rb3pk48oiur9xojxzisixv7icjvgg6s7v1oxwg3vogcpv1tjkloixz6rn4mphrp3ahxwi42jhq65vxowcsgs25dy615pg7upbgf77o2115s612gk',
                flowInterfaceName: 'e9thc31rf2cmeibii0ec3zpt3szazat9snrhf4jxg75w2lnlom3ibshmldxh0a59h4z2y2yyh2sw2wifs4xtuoxidoygasuhwfmiy5fwkicbfukrddmkdhgx65svpp12kab1zkn26xmndn9suqrezcwkyr6tnj3q',
                flowInterfaceNamespace: 'cb1jpwc2w354eppyok873ynwea60jz4fh3rc2yz9q506cos2orykqzu4tzqtncsvuv5rthdvv1mq9cilywi69ef4qvpgomjtt73mycx3h14whcohhk8rwk1rb1b42n674frfpye7zi64kiuiqiuxf1c0usxrzeuc',
                version: '27jhw0bfoskvy102ffye',
                adapterType: '84so5ykgs9o21tewd2dnli1gpprjfchzk1lp2kzze9wrm7x374cktf6rkrzb',
                direction: 'SENDER',
                transportProtocol: 'm60rgxiu7vtu8bxkoz7ibftod63ae0hmtbm7eyddsrxpijkp8wzp35jfee1c',
                messageProtocol: 'v5ex8t060tj78af82rejbags907dizaf9j4ouiy0fedn1yc9iu4636f5c26w',
                adapterEngineName: 'ct6dkwjayncpxgi1to0z4s62x5liwdjxup49t9rpmnwci9vi8xtwpa7jqocv0ucsfy9m3h57utn5yg0sj3wjft7ydgb4k7o9z6ooth11gqg9qk41jpuq8jfe2qiu5b12qjb6hs68gk4xx1d48exkc7xourpgt5lx',
                url: 'bviefa7j0wrihagl0elmued7i5ei8uz647t0e1mz5xb9dk3v3o0zftu8c6oy2mlnqldqt6j7d0roh9h3r404xxenuoh578ev6jlna87i8nqqj0poum2okty7s9adytwfwwwtii8lk2j89dc8tt3b15g2taqai7ww1hzu1sw5mq6premdi4ay90fsgjvvcutgvuiptg56045evwj8chuyav4fvbt79q8p9uhad9wvykkzhfibpgf3drmh2q4jkqu0h5df4j0vc6zeshubupb4z03juakcygfkcbyw2t920cmrhlxhniba9gb703q4muq8',
                username: 'moofy849j82vn5rathuzn5m9lfh59c74fpfazxy3ty85rtc1ljqwz1pzc0cb',
                remoteHost: '3l88qydo3jaq03amqsm9ysp1szewjk675jigwc08zoutn6huw3p6rtf4hwl22qm00zrvc1n0u7fda38qpwb9brsp5reflsfa9kdsm20is6ha2ptbzdoi3cyp75sao99nuu6imktn2of6q850v7obssabca5hsjkw',
                remotePort: 1765114643,
                directory: 'e22q4gui20j4l7hz5jhcj6xqy2kbui4obmpzdadosj7dqo5fz19otkkuafiv4v8k58e9hib05rj01bs7sbj7oyrgxirisihhwtqcngbbr9i1x215jaw69pwrfix4f8vpasgopqf7vnw5ou88c10ktvcbcpsrix1nrf65bmv0u2obkider0rwkzdp4440oy0gwj01jovxeon4y1wvccy1mmusgmzqjybyut9uzp8zzqqp14r2n4ssqxapyuz5xdo4kjtrdasf5cvzoac6tpurxf99hwm6vh2hn2d2nut5mquioyp8eb0q0ublrvud6plkui5w1jxh924rm0wagfybo0usyhhai2hit1jw1sz3ck2tr9fctmehkagxds9vr1pd58t5b44ghbuipcc1qhllac8eh76h23tsy3qg9v9on1b9a1sky9k63d22yrb10j7jkrunsri1ickdr5kbfok0x793e3au5tca45i3jj2zbems2cn7yj9n5gm958y16yg6qcwt5m6g5ykssvitjmmnn0j58ssrvpawa5i5a0wkqv64ex4d5b97sny15w9xi4brbxtq5jb8zpgnfbvp19ukrde3d64nfdb801p9999wr2v620y4o3hok7vi6jmk38r6yvlc70znxuerjsvrwzp568t133g9moqphyoj4n78btm1fgpzuz400epm9fabyk6jmv3hu23o0zeaey32annznepe60wp7krkb50y7wfdrdnjwedtf14khru5y03ko3gcunqkciunfx1ylsdywtinv3ca1tl31uilfwu62yd7kx6pp3d76q2866nppc0e47enomv9x6t5ut3ecz8m8cylw2920gfyhmr0obx4bos2jx0aqrmcx3tn8fklu86uk57nythpfkvt1vgkbfr445ehz9cb5ud1o9gk08ztn58b8w8emnptksbe5dbi7rupirhb2exp9h9ho5i97cluqjw0i0ec335vx35mdd06ym2n1gxe8cupky5uriqvrtoy6bje',
                fileSchema: '6us2idw2z0me8cv83simiqqr96krxs1s8s2s16y3awtbw2fxaabcfe9gcuu3l961twtag6q7f4688fssxtshxth51d06axc7l27vlthexbb9l5z9zzeiafkseww06tys0v9uy02puofq0yfr0y3ylg4h909g6ey36o6s7hz7v398vtrmai6qihhj211m8pw79utxcj2f1pziexc2oqk3h3a2hlt5jdgswt8mus25zpddg0v80dpho0watxj3zip2mnrz90v9a0xupaiw7uvlupa5cm4soq9kgjt64pfj0aw5b9g8tdgq1r82md3f6f71vqnishrwvlcqpd6ouu3weunsdu4ivotoghdxcisqmcgvirnzamtdfhgu5iuv427pk70vlzp4dp1c2pzuachim47r3496oa85c1y6dywahq93m5z22dw2iufaxey2f1uqge7go7nhwjmm6qr5wh4ydgifgvtfst3sfbnyp919cn5zooj2yaxtbjwce786qhbijddgrrbtf4dda0cwo56tv3wzixtecopsce2wp8day91qaeq4f7a543nnzvpge6yh0oxkv1g0z4uig6l6yq9ftfj6sp7n1lfir9lhsbpa9zxfnjv14020pf2t9htvmk189ftobukxpy6f5xcgluut2q6vecons1h3xrc8jn9aw6m1esuwcv2dsns3woadjklc7snogywfd6tin81t7b1ohotiw8dt7pzwpby1wcywxja2oqhfioy84c9i7xkji0hb3edqzosguhjrs21zkqzoludmu28bq8nvp9so8xdj4zfxi8v4wga2ff2wjd6l37vxfdi93q32w4t2k4vsezef988durk9j1twsrlr83zyc3q9vqrteg6b57cvkmp8j0bp311s996tlgqx2mgurz4g64g5nblq3m8yt4pk3rcs0x1ux1ndge12hfkgwhiz4kwtq3a9k905pdbc6x8b05ve96694ueewx05lizumaap6pem19yuezjgwpf6lh75wr10',
                proxyHost: '8jsbbpd9ypdtyll72a4jkn5wu6v2xpk7d16k1eg1pk5zajci4qaie8bdit6v',
                proxyPort: 8395989843,
                destination: 'dvweoen5memjgyoy450wm8v1cdxiwky80i06zaygk7gjc1ke2zka656nnx7srq6rkm7zqofasvoj9zvehlkzxos0bg4n2jagr6qtda64izgs5h03p09nmip5meoi947mvvb37ml0j3ldw14t1dig2rgdq7jla1p7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'njmugbakpiau2chvddmets8j3r9r9bllifm72rubbt4ijw4ra493dz0ifowiwqs3k2353450wyjlwlpdrmsz1j8ify2bah13vxtv15b4qw54i4wcl404wzfzyu374e3sv0cxtq579375oz6p8o50pj3gcqw93cwx',
                responsibleUserAccountName: 'n8xmmirxxm9ieuph58zt',
                lastChangeUserAccount: 'z4fwztx6ayq2fioz7zfl',
                lastChangedAt: '2020-07-29 16:55:46',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '402o0159jqd334r67h0zi0jo2awsrrhrulrvmgwf',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '3cddch3e9jxm7iuhjyjskkato4mot82nvqvl657nh444djo62s',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '3725xvrlv6jqm7vr8ddl',
                party: 'ij3mm168kyz6vufmkly7ktj15g1u3mieza9nximk8033w434sfptao87n71za5vddgmckymajsoyhltzw3wpr6dce5gft7roz364mcqx5b9sehuq3s7bap3zfl9qr0pkznbid36330a0250eo57nasjru6c14kvv',
                component: 'ng4hb650hbpw2hq4io08sywqchchogt16rehasou0mpr73wlwx4f7pchrtshdl6xgs6et9hf9ho6596almcissn2plhlckd8wev1qi84wwytuwfs8qrlpqnk6k7fvqepct42oz777opvjrdyhl2qh6ly66r6ax8t',
                name: '87pl9qbtq238ky813nqpdrvxisr1wcrprgew76jki6mzrzzealqhcfffp6kdvi108tvsukzgvnmwkbt4fmjq41639dyhliib2u08m31xqzqov23lhrv63ffqem2jt07a060p3go2jb0q0p37wy7bbrdwe0938seww',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'uulxkg04z03hc9p7kszlhx3f49y086gobc72qplctem4nqrw7oqdq6zsoslo5ade5dwmhhgdcwe5deqj3z14vbk5bspi3lkd22slzhz6thtg1ei9dz9zggl1hlmtk9fcnix4oe3gcfve87gpbvsgigo3ij1cz1jb',
                flowComponent: 'tu1ho2olajppo2oblkuz7ork9wedv9wxnhez7bdtwomfcvbscrxfdhxt42dh25t8j3ntvssx0v5mwc0f5i1qkz2w4rwsr8cw2xj0yya1rnzb7all3sji9o0hpiajk709lluff12at99nhgslqad1d35mia0cgr57',
                flowInterfaceName: 'wdhtcezk36ex0e0m7tq1ypv3q3ula5at31vyp93xk91xpjn7c3l4va399rq4icrx0dh4r1fsr8zx32915lcfjgbl0o21j0c01x978b6n6l955b76735p88h3ifmhefn5fi4gytklhouqhsruulxpqqxa550ho9y2',
                flowInterfaceNamespace: '1yz9e5wtojd4uw0zbet40wr08mgua2kvtdypflr5hozjrt65xhgurgug111e5ieavupd50o69k1ddqbb05hooosqofjsptxkyfqwco6sxo2rheisa1bo7nl8oaenoycxgudzo46hm4o74qf8sjbhpwi1zguolty7',
                version: '6169mffxgkcljewh4mcj',
                adapterType: '7m3myue6oj0x9ar29d3e7luq3wh4a669e1ibxzg00qypcaym0l8o2gibhcxv',
                direction: 'SENDER',
                transportProtocol: '8ljar6immt7hmu559hyxvcmnp3udaxj5wo15ke6kvggjpkciozrtojzs2f5b',
                messageProtocol: 'cjik1dr2ps4p5bbvfrq29044zl004j6kvh6h7ioi1l9qu2pq64bgesqzvq43',
                adapterEngineName: 'rf7ny67gi697nacto3f0fca86pc17hiokr918tfgmgofa5nb4h197mdz4rp8254ut78mo4ud6qpslmc792f0pf28tl1dxxtguh65ifq30jlndw0rqn2ni4hj38vqx9gqd2mf6217xohuzx367bwttict845owbnu',
                url: 'tg21cc8ha717brnh8608ivfgzi1373k8s5v4ef1ro28us8fhd5fpu512iqt9nkwijeyf8dhnqllcrpe723b547dvfceosjon38uiwpo6cij4rrmu62c2bxa9jv1t35jahnqu30iowifcz4q5wm16aw47tvaj29f99p8odzl3e7s2zld73uhk9eki7j2gtciwwc7emhvh1qmmpgurhb4nnfxb3blx2uynehgyfcfbg9amwxdulfnwe11bimi5jncgx5mq3qfd0wws6eep2s1zyk8fi6x4uhwp6yhdqax6xli8t1udggx34fv0j9nrsp6f',
                username: '7expv7oygs2zlcaaal5ysfzxweuxv9057odd44qm4imtsyjd4z31adgp88au',
                remoteHost: 'bizbkdu75crdye0007yq5yw5oaia8nzborv8cd8aysbvefbemag4faxd6pw8lus4uyrmc66ilyc4jbohv4ddzf3evv5jg7y0l6ofvaztnojkmiw2pe2t1jsvt8arcno4w629lsa8gvoedrgx94h5qhgzv07343p5',
                remotePort: 2224469884,
                directory: 'zz7jluq9sonx6ac5r1nacw62gsbuj0tv0q084625cq39jk7c6dslsoqu5hu3o962m25291s1lhpvyi6is89k2i561sht3emw7q4ij0ipcdc9a1pah9p8xppq4v7mmidjwmzy9mbbfhiusqhv12o1kzy8zvptpdrb7bhlby6kxw50lomuuoa4uaphegqw62i5uhq7h64xm0aasve8jjz6jn49fk2v4v4shfjpg11kb7prr3y35l34r2p0rvonqcxd7khnjq0tel72nz1740tnaw768nj92mghcjfsdt34yivrwlg4lr4ogkjyxqo06bm0gyf8232ef33doqhjtsww3ns4vwurofgum852qzf29vx6qzvtedxl8xo2coo3zrjql9ib40fs0tk0uj20t6cqjq3kcook92ioprym57xo1jn5a0ojfjghc9lvaemvdd11em40m4hr5wdtvlllfvlac7731ysdi33i7y1ej4k0st6sghoxsnchdsn789b1q3vybtooq9kf5080rtvq12jyi2456ypjo83b79co6q9j2ro8s6u499q2zcq206qmu9oez3fmjfd493fe1m4pgpaqzgngvthvzgfqyba7ld9oqwww2g1ycetvd8xiyf0w9el0zmjgge0mj56b8bojbg55q3y16wu5p7bpn0yv3eewgfdc038tchgczizgexcq9tz4w4pkh19l6lmv31fnx6504bl2gwyxfnuurfzn7br179x26231bi4wg2x8nbnvru59qjtkyy0mogc3vt7szgdfym1mt1a1fzgahr354fn917q7m8xmfj3i9wak7ltl9sl731e9degaeg9iej1jo62ra2keo7o0nl636uhprasazoofpr9mn8b3ez8fy0wo06a8are3hg5d0ds93dsj2l1yy7f5zolqsta4zlgymld3sdjuf91fq5iwqblc1eb6bpn3tjueizzy47mbam3wkw0zx9jzovc5gl3f6fd1uj95e6bs38u0nx91tx17by84gfkm',
                fileSchema: 'lupwpfv084iwck98xpuelfqa43c3ecy0hv0unb4ak6xyxkwq3gm56ynwusn3g0f1whruicpfm6dsbfpbhu7nwwlt3rcrtikhu6kej7mzlixrfjs6qfnhu8knzzgt6kokqestjruh4jngel49l1vivpwqlvxgdvr3qa1m3k66b1w5hb2gevmg8y2dmmj9uqg6kq89ggts4gos2wec74vhqf41sdmbgx7vj1iq1oy4dd9mv7vqf2kemweu1b3ba87u0yuwglc9pjwzcx9kor96pwq7duqnsde79k5pwcowjxrrmyoljw5f9fv1hj8mhddiae1z6sacxbimjrijkx4rgtsa2r6muw74cfx81v2dbdwxoxi93rtlouatgor6bo5c51d4fo3l1tftyhc3wo5r5z0xbq06i328huzpg6jmgabsdfnlnxz6xlpp6kd2va50izhvcd1f9fwdnih2xikcyrbclew6bdcvgeb04ar6ss6it7ujvizc076ihvv6i45hlt7xou68pb07f221vpg21z6164yzdid01xgbqgtunoiwwdrwljr6x6evhewrzubust84ayfhzpkz3y0eh6oi6sn894335ozbwnd7bsn0oqlgi5r6rl5blm9u2md7kl6v7zopmm3lklxq2zw8ao9nxqvjzvk85mfyg0qt2cfmm22k1hpbrag54bu6qzhgzn60cg70l2g3uiw9dcdz6kv1jzfiul1z6adl9d0khd7xe2pvh2ar6vvkqm1tkhrjm02of95ijuzv20il53dxnoqrzdm2py8a2w50wmd8fq4r1mzlf2w5v3zykcgmpzeqwdm2pr42zr7n6rz2jb409capcxds7rtofw10kaf1df0x3598xdbwmy4v5q1sp81g4glprx33whsioxameea9mu6zmbzmmcg2z6fogdmeez7ppysfqsqqjnal1pfd01bhr3m5j5aytw2txp5ictm8wziojdl9hdmfkhrcn08b2zwhkkngbad3cactn5c8z1neanil',
                proxyHost: 'sezro2e3n4x66v954dt70rhhjwuteoco7sk3nnj7lt4u67vilie6rxcrbskz',
                proxyPort: 6801743821,
                destination: '4nrf79lsyjkwbe2hlpsjonhkp1x1rl72zhpyj5huc5zqen9j7876nulwmlgzlvq2bjml8b5kvyom91gl45hf1mouz2mt1p5penedrxsloxv8ojhh7jtqy0lo8lgjy4oxdgxb1yz546zqkubxqjq8bmr0ro6d8y2v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1k848lu324nkk8oy21biw5tdi7a7t49b4wapv6ybrw57giekythx4k2obebiajnzb7kw6wqydairwisn3pwfvgf96656mncl1ya7awwr9o8v1x4sany4fg55bdp0poz3yg1g93704g8p9am68e1aka79uwh4ivrk',
                responsibleUserAccountName: 'z9qq61y6yoswyt4cryru',
                lastChangeUserAccount: 'llt98ngx4ogi540vhik0',
                lastChangedAt: '2020-07-29 08:27:14',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'mp5lyxh3bbw95h8v0rh83a63krtg5ywvtzmjljre',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '7i9c0z0xs5busu85af2xxvprj3gr3mni76cuo8d6mmq910emi7',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'g4p8r1ik17ezy9wrq53m',
                party: 'h10fs5ytrcx93yzpgtxckyknxqhy5rxjctxk0lr93sorfyniy0pje2hvnhndvg0yqerq1bmeppjpxngmi9lnjo74ukzn4i33c4gvgq8upm95ii95yyvbhxa9k9y1dbbj0jzp3wtzmxz2vlg72wrjebqmeiacqv1g',
                component: '3wk63kxqqixuw12u9hehqami12iwi2d335oiijl6y1l5gpy2wt7z9i7fke3r2v6dnzocw9o7l8ipaypmy6t4oofzz6kbr9w2xavdqr0tov1kznjqjmyj05q4cy626ohb0j7f62r6yxqcpw9ixkevxexa2mkrqlx1',
                name: '8nr5z98dzopxhv6t72ovq8fm1q589x7o0x8epx861ap2yizzuhxni4xeor7ccgi66g5cf5hrfvvlhfqj90ytxok4ef9cq06eco7ygo0wfcvrqmavcbg76tnewbcipa5ow2g1jiz9fsn3h4yvslfrh0end2neicr8',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'q3n3oyyd2m52qcsz78ygdrons2xsrjskfjcnfch0drmyomc69owyjdeq70xwsefnjg3mjcvq39isu2nbpseocg7e9m0c8oybz3xae9umzq8484yc6yzjq8m7qz9ohh6bfikuujs72jtl66ftyxenx9c0bj4mit8tp',
                flowComponent: 'xmx939qoqaae5fwebbuqa9ve6tafg89c01gr1036h76a3h47iq3u7cnvribt3dvwz2dpyjevxourdz1ftkvqlfx3obibw601429hfvpwg28mewqlevghfos4hyilqv88b0po54zto6q27kko8tss2tqpqucbmb7c',
                flowInterfaceName: 'nv7rwh6u87p567xi53twebzvou975f0x06adcihg8c4kjgt36m0e66r200is2yc0o8ld0kdi96yy4spbp6nx8ybwotzsqh3rfloab3qtwvz6djamxvtutxgf5umi5qvtx1utg9ug687uvkmk02206tdghw4ywne1',
                flowInterfaceNamespace: '1y2iwatj61er7306jxwn2yxt58kg1xgxcwf8336o2rpkt0pcbjbqo3ost0z1dsror5wfj1uz4i8ha4j2pp1jo7hlw69pjqorik76ewtgx6vomxilgqb06ky5vr2mmmvz7v6thp6nwv1chtjlwry7hd1j13rr2xba',
                version: 'q7yhlzzrhnz9f56obkoo',
                adapterType: 'y9o3kwpvtmbz7lay54zept30kcpzi8wjdhiz9agixefv469egukt5g010frz',
                direction: 'SENDER',
                transportProtocol: 'xfywdw93w5rqahgjjgm2tyoaagiafdhtzsivodvqc34ues0wbfmdbt2za3mr',
                messageProtocol: 'wi06db8zuh6r551yqd2jkigf17cvp67ros7wqruj7rh8hk2zuagqgcj89j2h',
                adapterEngineName: 'v87gls0pxhi557axkq3objw3lcrm6cagds9hqjygj4iu2cx7wcmwmmswh1l016blmgwolmjx4ydd06wmvkff0ze0zaridjkvtbqlqahun3k2wtx44pxn9aj113jy3cflkld2h5dx69hdtv4o5vmun9v3afzd7eya',
                url: 'wwcv6olpzwma1e2fnr1xczd3s87tucsv9ui3sq9wg7g8sskn1p5he0w5illifvmuuk9eqxotyhgvcsblcsc74jop0ypvj0hrrxwdhzvi2kli9xyx126ivgrbt2fz2tslavs3poiq6h93hjm2xug8vjcr6hnltm4l0sdroffrb0suwrh9ilo7vbf999y3ixpq5hu8wz9f5otyivd7j106v4scfrhcugp2qu551a7bd65szk5pw84s8eljc7vg6fznbxparod3k1vqbtweypinvopxd5m0wajwojyp24igsl0af7hobkgzmeqz8p6wyft9',
                username: 'j05oy6kyi8zv23kjeliesa8oken0gnnxfodgj9iyj3et3pk3ws6bzan2gfbg',
                remoteHost: 'emy58bmnbi7currj7bvxhs03q6gk6oh2360vltlatyztv56s8kgmfg02fu991xeojfur3f0kfxen288bq6hkolxmr36ib78moclvm7077suwwox1sxpmcj3s1kfmdv6le50bw6tc3s3t6f3ti1td9h2vraow4nsj',
                remotePort: 8488678692,
                directory: '9k0oe8l2uwlj95kiafhkgk2zk8f0bqnnerx6tebt53j8ikuwogjxojksnja8a3fa6jwvyqqojqm4e8yvniymi2uz0mv6ebcxa3doag1cu3h706u43sp4ml4rk34v4v289sc7r36q4wm6ztgvdjrhm0kwseisr1gdcx4fs23rgryb7ngqomuzhbz8ypq3g6ldtgexa2t7z7pllki75zg58idwhdl6bc1htkka4ulihutt1tt4f2lrrs2xchymcem9zq013fy0v4wazp6olplup4lb45b1m37yhc9a0g1fhr70xsyaf5aqrqktb7j2a1hpe8ichvld3c2b2mkm95dn4xz81h4tkph8otmb9hn2fhp7mc8aeyrna67zfhu5ly6d69tnisskqgk3axyrr5q3oua44g2d5lalnba94e98n5so19wbh0q6o91nyu9zp9f532vl8k2vw02ftp0n3w2u1r49910tv4z4z6mv5ur13bfl4a5attd11uf9svww5hpm4fmnsjegwttvvug8pz26hoocpc4nnjgymszmdsa62f4jmagp0hf10uwuoci23wjdzo6r5cstr97phu4c8i0iz3aouunyicq6ihwiy672tth2wnaz3z5q6nquu7t1487rjw7rg2g3gmivxxz5jsh3o637wuv30b0xhfssi7v7xxxt832jtucuoxxcv18k9s0ljy7p4x5lf9oxhrb61wy71pamghr2dvpsuez87urnlsgsklmptxvlj9nr4hdtwi7ahvmv7os8vpayd2z58f4gc1j4nz3zz3jgpsf2y05hmz7gknd0y34vy0fr871gl97piot6nfa01wjeboux2sshf6rmiclmsaen2qpitrtozaa7je6iw3hih0wbdsnp08mfbtlce5zn3gvnxip8uo22nzshnft8g2wjztpdldux1la72o5k0uua757tv069ptn63eqsi4utc0td2fftx43c9cfrt0uuidd4hf30lc5rzqq9mtxmdt1f1xl1vfvk5gbm',
                fileSchema: 'nxdxwedtavxl93dgs2kzmp60w7wmbrvwec1ho6h2oqrpo6hg4dtwa8vh8ls8xea6qedhkp7rh8p4utcb7164xxt5zyse22i0m3e61zfonvfkvsh7pm6vv0m0sy1eewu5ogfb947vw6elqij7sw5nd46fry3tiqivpmzfo6bszy7nul73yciml0iqma6lrhmioow7punwsqynckivlxakks07osiley3kqla62h8kw6j6yprpr9zrtjhv3cxmki72qd9dx46nxuvppt8vtlfsvn3jrgozb1ktm24d6pkyrhg4ixedq8aryx8gtwj758zmr8rc27zgwukh2vz78ah2km02mow9k0c3x5dobh4acfmjk8leo6g4z7pth6cfl1hejk8gkcn3ufarba6igiuyfx1t5j1q3qekkkbh3qna5569e28w9ykrnttufe1bjjbnzfvlc8172jztuypkpquqy67rd3czlh46zn82am64kvjpz06v5j0uv0xuk3r3ruhnj93nj39tnhbwdvrjm0ix85wdwup5l9mourtia42zgjtpi0kf7fx2zc3ekgnt8pjkiniisouvxx90yjdhbelle1ggouy9s81mirjbndz8xvbb1iydotou96an1pje4441j4de3ak9b2g9w96lncb4cg967h2dwisge1g7m3kwl5uoplcq6sxxfmq95005hx0o3xuyt7w28c0gs03tg0k33m32tx730927c5fsod2o8yefux6ojly1ovrmv3xparetjqn6l4r9x36rwqavwsautiw4ozj1k441hemx0cpznblfra6olne6p4m3ll2rcsp8giuyidv7v39vrwakki1bdq75wipffrbfg7mjo9xwr0z695uo98bl9xhx5q4yqheqoapwxenx8oxht85y5amav766gqme16j7ps3ccgopa9mr7lc2cwpfnekxdbpwhdvn3xvkjhijmnwmluoexautus837762xwvtyj7uyj3s4rc1vaqne0x1pje2d0e6oiiy',
                proxyHost: 'u5yj50ins7xxvj3whoiq8uzbbh33njn97wp7vp4wnh3mbj421nmzngv015bb',
                proxyPort: 3208770621,
                destination: '3ry2u20iq6ozb70d1lf3ydnrd7qecci9kqdacuwb0so4bjtzt98z0lhfnkfvsehul29f9jjz45tujy52aff5ab51izi88sz733510ufumobtxbdylkx8vp7or4eqeixm07bapvrbkrg3y0x8kr5525pxwkkonfb2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '57i7k1vvlz8av0x21rrjtb0rel8citzkwnlq7vw67122p88up1q84loclan0kvrlkt7fm91pj6wesiqq44xs9gh2ep5aqb0l0nmr4pokx6roijl3qnni4p88g7oy4gd5r2ws2fxu7nt15oon9zk8bsnukmyqefww',
                responsibleUserAccountName: '0qxj0823h8b917opyhld',
                lastChangeUserAccount: 'n6yy47sy8t42gtt05800',
                lastChangedAt: '2020-07-30 00:41:23',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'ktjhfr74cqp8ziualovh711l9qu9m4g1qy1ny4up',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'mtsb2otl77qy7jci6yep3vtaetmpi4zqvzezx7rm1jho1bqrs7',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 's28u4twwy5oyv0i7k18z',
                party: '3dprcrx7wnwohx5mv12igthi02fn3dq0mm9yyl0i1nmojmya0iw6pz0icg4537o6e5qexipb8vkacrv7plb0syzv6zophqgyhgofqfxoo1qk43rboaq2o2d6yog5kdt5imk0s454ev4v6ga7csn74wtgid7rm04p',
                component: 'xon84tr2wl9hp3saajrsnglein4hg48bnutwo79x64vevzo8c891uuu7nm5gkt2cs53szel4j64j0gly8goaqeu9qnqe2kqu87cw73s1y1vv3qa0wi1iwsvu1w1sgflxelbteq64ve4tppy6j4cdjuzqeuig0fhs',
                name: '4esytmjzmmoq28tcanbilpk69y29x5ty4zdx530t0lop8pv26es73km9sd3fw861hdruq04vow0xccb2rq30r7x3sl9u93zz4lgkji3v3qxq7qhyc5plizbc1jjm292wtdk9k7fadms5qj4j1urp8m3qarhgr50m',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '44748rmvnuh06fqzgxya167nhu69o9x6tta2mb4t39vh4yc01oshwqf8d8wx199x9bakjq6bmynwfu825fduxk77i6d7gxtf30la4yngi898xfkijvlt16o64rb1fkgtzd2z8sfhe9k0ovy8zmt7yi03pmsdiod4',
                flowComponent: 'qbkgaxmrttjabes1y7a3jrdh8sh3xlv1vu8rczwav6rhj1ls173ur1bea6qiuiekq6oropwyedsny0gv6k90e7v8ofbeqq4pp7aciqkq5dspzoq4vfmxsrdxj6sithptawwyfstlfvq8r1hu1ekul6btm6sl5nml7',
                flowInterfaceName: 'dmnga0d20b4jf47ge0qlkz2z5np0d7z5km03cjmh6yhph3atvdzyx4ictna3h4mn59yoohqnhyw7m34mehpd38hh6fi69m5593n45rq7r9p5v1p37897re34290ge3d4mx7pvdbcwt6l7idc2p65zptnbf5r3aj9',
                flowInterfaceNamespace: '53d9fj4coy3xac9uay8lgeglm89oq0ctx6az4jzrch23rjmty04iuks7nm1r0q25al1p49pfduvqfp1i24yz3tnmgdiuk5humczjty43umle0pwlxg1856jrxdex47yvmgzqt2m5ivo3i7r2r4de2up13zmirs0f',
                version: 'g0inkd0lio96vdba1ogv',
                adapterType: 'aofq3sj38n9a68v3y6suqrr9to9hvz1k0qwql0ts7jl3fn2z8c9gz9jlttxw',
                direction: 'SENDER',
                transportProtocol: 'fz1ac1jv3vdmzzsfaj1682n679f0dtuxqq12t20hjx01xinm586154krf3at',
                messageProtocol: 'ludsumv48rodba8q4xcmv1xa0j6sq88gipz5ousk7hkh7t1s8xbfj6ehckaz',
                adapterEngineName: 'jq3s0d0jm4rk21fc7ra6fljs0gvohhptwh46o7j6dogu6usv112f85sapbudmk2scx3zuueyzyh63y7gojk2fjxbtb9nvy5sstk7kqqj36q7fk68c4hztry99xz2gterznebqcb3mv89475na8ukhxk8m5vaovq7',
                url: 'zlmefe5mxwayi220e08x1qcllvyq3rgj99q5gd0y2z3thkcj43mrim76z6xyj4leoyjsgb4gouon80dge9vcc7tpfxunpcbst9qiz5o4mc725w0qiv6rmz5z22fuitr0ge1ll6zmsqdnib5n6109wwznb6hnw564wofoiolh4yxiemglmqz1bd5mbpxqalbry0wp03in3hpdk3hozzq7gcs3v6k0pufmu1g6nu4pgys8ch1ydyhiwr18x4r1zldyqacyucht1bjwxd4q4mljmsi8ojgwki9gfn5fcy6350771fhw5bbv4e1wpbz5ulfq',
                username: 'ggv5doot3naxeix4nhox42k2ip0ra1y3f8htug76rw9knlkesuuanjw8233x',
                remoteHost: 'p9yxvmrn6smbe5bx62ubx1zfubuygklzzqcpcnxxbgun5jlowfy3p1vfgoyzvw5sofpjwcksvz62ae5lkelbhbl6pmppkcpntzlhppnm5wt3s0unpnl0obslmiax2d4c4ll0x63gkp37b70r5wpgeum9438avgpd',
                remotePort: 4897024869,
                directory: 'xqufyvzpx2n7m8t62dgnvusdx5w9w5l77prosajxq0bgmjy8dg9dgadm7g6t0y38dm5g63q49hsnszf013eajqa7dlmc4n3jlmy1s0g0gpfl1reqpiiuw6mt7hyxmrv9fkpps35b9tuvmrlacu5cnnowsqybfm20m4l53evx1u9ns5y9qn1fdgd398jaf7qazwocpuhdra3kvxyec53difv7a2h4gzdmxb09m9dsgxp6d5hfg3d92gzncgblwnyxwmvv369rbis6d7vb9yqaaxralw4a35a1qrx9ggwr9ypbu1dljiriv0axmsmrbyj2v6gfojrtb8vv50fwr0p104phyunq5ka84ewrvmv78tmte5txpa3h8soriiy5hrmtpbusxyuvwb13gg6u5d267txrcrtmgdu14ddr9uvfeg8ivsvnisasby4gmrrqb451xvhn71t2xop15dk8dq9fo9aaq3i6wnmvvvsi1rr8rdatwquuhlvvendkynqsh0owgxlhgr3m3esugg0zimkai1bodi6tlgxh0vua58ingnhgq9hf3z18qmsusbxq0dddgyl3vskzwkpkwqehie5lpm47po8fez1woex8k2a131ncd82ejr5ds6wyc7fsqdm6l738fyk8u9fpuncemj1nw5lg75qgh8krfz79hewsffwh1huz1bfujq5r8yat325sju7gm3i355d5l49vulrwnp9uw8p6bx60arg0fg34bhjxlu7l0xwxvut7s0brgbdiwdjwcqeesbf987nawrqytkuez8tnw7rn34jah968p1etjlvmwvy50gxky25e7p58bxhmlszhmjro4ljbqc82bu9mc6ocamcw0kjbpss19mpfgymm2xkdhomw3ksy4w68ynwuqwnuam4vkpwb7ox2e9c1sp6whbsacle8ch035fzwpbk0twxm5su4e3v7s30sjbbp84m97p55aeec9zl6v9fzkpw1g28lw4tb0bzxpap5unzd51kzv7czb0zyoceh',
                fileSchema: 'ioqxcevwltgr2mdhvodtms7ng2y88ugh4kfwaurn7o63wr8v3fpcmaxqipfhrqepqbqremye4ac9s1fi9wijyrfbmx5z6e6kqvqlasscrst1xrroiqaj9y2z7l576b2uye2otxlr7aujzz6aa4qzbo1f9tz8b5mstobazs35w4lhx98axdqrq408c4ig6tbqi0rs4ubbevntsko5ntgswizy46kvzn4q3gx13l3v3q35y6iyafg3v693mvlxzrc0zq49oht18r3jiquenrdmjfd7qkgwah5e2p1nzvm5tcvnv1byiz0an5yujkzzq2lc3zrgesiitvj9rwudnmxbjj65ml9oa96kirfinabikxxcy9zp8breff07kyhtwpmtyws9q8npoz2i0pfb69b9lzdgwdh11204k1uk76f47d5cfw3bd5c7yifynnjrtx14k4hsapvdrq8pn3z35qsas0njs1nkgvavniw44k97ajv2pgp63bgatxptxoifitktkl9ype2fwqgxn5pii3brm83jk5diepxckudeftiwal9fglp0zp04i1x2y9p8se687yohumi8aksnei8th16o9k7cnft5ocy1kdkjlswecov9iw14epcwuvrobfkb5iqa7z7ddvlsocrkf0u8h80qoqkfdp5xxzeslrv13os5y0g5srdjw4g0myor2d8z6qpg16pixwh0vti0kqngvs8pt9q0qdg7zzd84l8piqsuqca1q982s0tn67enqozhr7xh61w8wzstlojg67rpv368urqa13vvflq4kz9yb00sl6lt01bpyybcxfgtwjbt5aqrnqhms705e06ddj09xxt9o2jetae26ytz4aaki7p0f5wjfwcd07wh4uh17ruhu62my0tlkf6uj97yrrjk5qjhxgu6j35ox72iicuyiv69bm83fv1zrqu0b9ra8xs1veyl8f3nnwj96uiu76cccu355mtfmabmy62e4nxotztn99ihn9o1o25qa4c1xf55deib',
                proxyHost: 'k4xep45x7aqyrzyr751e32q5ez66kivbwcwojjip3wyani59n0ny14z2cs35',
                proxyPort: 8303215977,
                destination: 't6dmc731im9dy4wghdcnaqxsw7p7wmdyf972lztr6bo9tixqa7g7xmw9pizus98lndw355cs8sklde3cyuh7isbgkzadumnbkxigyf0nxbhru58c7bere8lnw2ckf22mc6ajfq2h1qdwx4f3wig8102cw4ntq8fq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c52w95nxkyvlm96d3n2rqzh9vp70ok3mbngnbx8b3eeuakfe17grc2qfofsojoauv2gnmfbdicz5q2s71r9pn2tiifre84vd0imcpzi8pnpr3omzq356u6dls5fiketg4068cavx06xz7ii5815uloqbnn9t6opc',
                responsibleUserAccountName: '59ijnpvhdglccdrcb492',
                lastChangeUserAccount: '2xxe7z7vfnx77dzdzqug',
                lastChangedAt: '2020-07-29 14:17:49',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '4l9zhz138op47h3qgegeacc1ps48584z3uq14e4w',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'luduttnxp5n92l39onsv60xj30bn4qae9p5v7xk5triw9ul0wp',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'yf0871q8l48jqs1vsygv',
                party: 'rb5oyqhyy3mv0atoqzh2u1xc63ewjcwsmmrbzsny2gn7dmq5hm3rv6h1jzplqcludzpljbfaaxsdaq75ewtm6rjz0d1rzjb9myxomhk6ra8q9xqbaozoclpdg3vfzn3przap2ztw4pna7z7abz9r9m1cco2kkxls',
                component: 'sa5ec1r1s0v2h9ewrbfon9xdip5lno7daq0efj79tukvnjtcmwvokev1r915rxslb6f599yvfkeildza0lswikjzs2q0wj02buo9xe88wcvqkyipo0k7a5pbvcndfq5nw67sk8wbe73356xixj0fk3eezb6b2psu',
                name: 'o8fzytt3yvutb9hv6ocr1ohozr4h30dcnr9cjx73yzhpbojglcce7i2m2n1vocxs09psl6k5iwug86je9ptg6x7dwr4r8x7rbfmmqu9q7kfjoh2s69m9bdmfmszh3olp1k8p7sopjolys97gbvek6ma73dk0h903',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'zx4021a0dt43o048g3d1bymla7tmhoo3sf1xg9z85ay160i4fc0f5vjqnyyvkb0pvcdxn7fp3slql8deu6f0mgphwfkyeammvibfphmhvcifefdobafay3zmrufvzmospayld1jijbjx0uobyhgfplkqk61vf15j',
                flowComponent: 'wa66d9e47eez39dehsrjiyxokf30j0k59limwolpf3sdmxgispehzwus8smc1tqmcbiqqgyves0i931swb9chifxvh9vcu5lhgzc5pqju74bot3vxxzpioj4s0u01a8h3kjrdz5oogjhim4g70kr9ilvr1thx6do',
                flowInterfaceName: 'r9zhddy52fhwtb7m4k9joro03uabpgfarzqa6l1bu5tjd1sdee4l15lhgfuulasnyv8mxct0kir7mtf9uew3cxqh0kyctevh3eb319dmchx3jotyrf1c6azcv53bfl1ngnxvzqlb45is5pu5e6p6fc5858ednn801',
                flowInterfaceNamespace: '8255fbvk4rdxbtlvzbyki5vi9puhmgjj639dyop0p4xxfl6qeve0ifaxhf03ydmn7unle477w87nvkkygqgapopqfn6qfg9dhaciomo5a463dzo6pchbgg1qtszva9ktnu1aau1yvm05m6lywzev5sgyoafcowhc',
                version: 'aidgkrfm32ynf6xz92xv',
                adapterType: 'a58jz1pfo08zvmtitlv2my7p24ftnajsmgsiwazflg9x3ngiw4hrqxpc4jnj',
                direction: 'RECEIVER',
                transportProtocol: 'h8hvus3epgbmgzzi51azvcsrzbl442matjvrj4cg64eh36x2d4ovjx7ta96y',
                messageProtocol: 'nbqrifppoi61hg451r0ulutjp5wr2y6ty1iayus93z7pf7h82aneiph50yl7',
                adapterEngineName: 'pxm8cq5wnyx94za4wdxup8a1f1z3oe318xeuq9mdegnakqsz35zs5ywcltszy14udfva7sotkb9121thi36fsvx3nrteam0xwv5c3hl50odugrugq5yxa6ijre0c3b1y3ok2mdy67grujhvkd3gppg94bnmlzsll',
                url: '9w3k7uxpkk37cfevw2c1hiil4313skiz6ie8nnx0m9ui4mgmczv1sqaaflu8w10pvrlijrnk3dhx7u3f9flqt75za9x65xvv372vylvcfnng5q76af1uxvpkbfc7yl8gslh60xvkecell621wv3s8mwfvf9y7796yrxmwygof5evqhfxfbccfh40zqvn1jt2q6upvzqgrimhvudoqpiypn1go6hlmahn773hjs0z2ad1gciigozxx7cc6toargqxeiiusyzbr223d2msv4gp0kxd4v890o5pzplp5n8onz5o0nar6569sxc34cffmvzm',
                username: 'rags3mjacrxz5itclawur5n2bkgy08xd249q5bo7hndwpdmkb7svd3ia7esa',
                remoteHost: '8hyic9wb4dgghcgijngeb301w88dirvk05r61vid7d9krtofyq0aox0s848sp6o6slinphq69aa7p9xcex9lvdysxcusuus1z563wmjkd2axalgrtuk7ktuew08qcby0pw9id7h4dnvg8fatd1vsurocp3cslbqr',
                remotePort: 5838391831,
                directory: 'y58azitxkpphgwdon9ev8bc6f9dieqhc4q8lgu382t1tmyi5vg908dpaguftcc3u6v8quxe017gi21rjfpsn4hz5tebdbx4439sn9ul0ej24u10tncfrtls7mjrywtoge29f75detn1j636u21h6euentetmec18sbmqexcgcyfrj9tql22gbgy76qltxh35spet4yl5t8zywe5u9sflaqn21b9ybrt7tmmd73ujkw6x72ykir8k499wxe4dkdbi3dh0dh4nyd5vn2pjaa46hpnu8zd96b7q221p70evm9ausjlq650mx1y5yt5xsylf6myxfmesy1sl4lt0jr5do1n6wrj1mlqt2hlkncbwc9hfkx8pbdxmfc5gvzpx4ypf4hd30uukw6nosaplja4b2l5wfgqwm4z4tjwl9x8k8jkzs7xuidhnb9wi0dl7v1wpvq4vaoopuhkat0xtbycj30j39de3ynn6f9q1qok8f3116rszb01mjn6znouc3ov52dvzubms2ryknh206r6mhb2bboeemcsltrxjmbu0ifepo1ylxjvbk7jttdtapxvkgxjnglqwuqf2q1petvwyrgrsojnowe3x314qphh8dipz7v5x5qgrvy7btc1ucrpswp5aly3tzldh6wqqplvlpub1m2a02ncz8n9gh9bn4hp787ppt7w8n7dlcio7fztn6m1hfdf7s6ut86jb2mzuiuq5547vm20sxhdkgau3vt228osuy7w6jc6rzlgt8ogcxvhrcdj88zp1us8n1ta72g1ulg3otc2t8pvrkhscmjsazgdn10mjieouvftnz2ng4ya2lt94ogov3ywmm2t1r2w2d4zg7q6elune0wnc8wg56b8oi7rojipu1j58ok87vtdwmsc8m5dz37tw7eq6xglso5kwwt4exalcmgqk8detncbvgceal3mbxv8q6pxamtjpzm4wuqv2jsspzyhvi1hpp29in8dmjoaub0vrzc61pxvnbfc1s01uuehuh6mi',
                fileSchema: 'wi0z9m2i3feqj5um1x8fkvy1115e06o958jcl7guklmae9itelq7b4vp748z18xj75buvyj1od5kt5jgvku699oxap10g3ntaqwcpz6j12wuqj8vzdz7yoaqhxyuf63fejmi07w71i7vgor8baop1uv80teqt5i1zlrkihf2cc0unjhst84ykql95tviee9p84aj8ns2t7uiimfjo0lkub0663m7jpileeofe6sstnbaoodz8dk5aeoa9kisv4k28icgbck2yr64eqhcgsg0ya4x52ufa4jfbdmqh79ws1bg7iagwx4201l3qnagtdx7drw38xw8axml4n47wn6re6508u2rs3enomx1x9d73mnfxnxlv40xi2lfr9kkivv6qyo9eqrve74fjli481kk6omqmholong9e5k19ugu51sqe37dhvm91lgmrlfqfpkdha015zedl11vz8ep2uf0hx9iee549fwas47cq5kxu5mq881eob5uusbaq1nwcwuinpixnbka84kuwartbaehtwnonp0658wks954gzep16v3efy1ohbs57dti96xrlqp7nbnlyrxy9axj2t8buuvmnn4b6ap1hdyej9l8ngswf1h4v4kezlpfckh011ug9aj25efaz5y8tvcoebwy8w54twegpjq86nroo5vjzhdocf31kepx2ehje7kko9hz0vpkbg6un7otvhdydbp590p726vqb2yk5i5pmr6eftiui8ev9tbe113fvknv7dnztzf7kz83wartci7cnr6ekn31mmgpo7cds1gzgkkqytrly7hfb4bysc8f4qgcyet4j0f7wb0jl1fhfgyqqhxsu7zsksvfamgfx4x9chzhzlyw68cv6bc6fwtu2bamdbak2vfzyylqt5qnuzauninqgsgrtyjd7y5jkxdxchoat3yrpueods54usec3dth3syk0v7gzgf0k7adds3idg93v4557nspq5ikxvfdrq1qjq61jj9pr3x5mi7igwe9ynajy18',
                proxyHost: '3loq7yhboyjrxzye91ux9qvexswyquhlglosal1p9ldzfw4xsbxlyrsgsd7x',
                proxyPort: 1184728670,
                destination: 'kpo63dxewcc26y4jleeh87ustrfjcreyivn1knj0xv09ag9d8k2hwv0pn6z6hm7axsa9tt72o8hteeh76we3dupatys3c8c8ypbg705zypoaz6licaiwgzewv5w8dnj3b8lcgiootez5t06u3m8n3fkcvvwasrfu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c87ii7ihjpqtvum8obq23wjiat6rd0ws0wq685hg6j2faqcadtbau5ckivlphqgvityh0eaqxlt3phcep8eij7k1i36fwustpm3oedtmua1s1k6mry12764y09t04o7x6p2puppvk644pwosli5i45vixy0up04z',
                responsibleUserAccountName: 'sdg4oo0ruccua1zeyish',
                lastChangeUserAccount: 'aa6j1jcclvhf4wumhxzf',
                lastChangedAt: '2020-07-29 09:50:21',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'k2j5s4m1xw5y0x7cayx9t9347ew0737etmm4qip5',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'atxd51kaafvss82g5ulyg0bht2rnfw5hgvl74k0f046yc57t5w',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '6ppvwcsjm5rsw4l2p6o9',
                party: 'qxafmp4nbppl6km1aqxba2qpdob0zyoh6x2cqztwxri4x6rvrp5d3efsfjipsbim9tdtbtnkkj8zh5u6rhnkctupr7753ktk3t56uriw3v4c212btnftkvxfgr2wi7v6tnimymw8dyk70y2wdclbfgvq0flzz3p2',
                component: 'y23vp20t5n6snb0mjgfov4h77s07lhr9h3catwuo5e5nnzdeoe0mju7yd7geryjo7n2f75gygvdkmvrk2aszcvryr7tgxwbx7y1fpzvtb3nqnlk9ny8zf6mz6b0a0x1gdc9cjzcb9x2gi8mwlxwjbngb06pqljxo',
                name: 't7o3lyquvb2ngl3sbkzpyei30od8nzakixad95kp5wh6sw90sn18u4kf23slbuy77gx11vhi8bcwxtpfhe1a78v9iaby9w3w1185bwg0y8u65mmipmxox4fxjlogpd742eoaqdlon4ky7jlnnr88sold88d7np2t',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'msjlly8hkz8uvf19m5ogtf19xa7t4fdx2757x53p0umsl35byuufa0sivsltil518mqkfupsva3a1iv1w0ct2njkas75wnq9vd70pqfx5mi9n76myz4xzi594hfzf4peqvv12ltjapqsx3u5c05rke1mkztf1i8o',
                flowComponent: 'ijaz2xrqr75tuu635vunhnq0unmgmqmai7z9jhp65qcn4ovj4giul7m8k2wveebtvxh8y14u5ed9nshubtzae2kk4e40j5o35k72ex85gr3e1ah6zhetgr9hzadzhqrc1inks4ak65qy83jzqnx4kqb5ucxb2nnm',
                flowInterfaceName: 'jr0rfetlj186rlmuah3dp9tfser2diinanegon8s3c11fc1rd8pjsni07ba982jm316xgi1qpzzx02u6ism6on1nlwdee9isqswd0l414zsdaowtwjr9avbsxjaa9z4iddi33le7r0ae0tx774m2897iyov1tcac',
                flowInterfaceNamespace: 'tyv8pltdcokm1mzplhm4svvlx6p7xb1xxon0gtm7mryqr2s8ii1ulsahs30dk8ah5am0mp7y1selor9jgaq5vl7tx8ihi2pj6x63cu1zki882jl0wr5un9r97d8ybgrp3nuyyo0kk4qjt5d75rsi2quxsvc7m0qc3',
                version: '83jvm434g3wy2gxtt23m',
                adapterType: 'rqw0otqzyauq4hc3sma2lgfyo74vxcnz0s5dft02gd187wt0fziqupd6yb1b',
                direction: 'RECEIVER',
                transportProtocol: '9osufpxelt6i15pwi657jh25bmva12a5m0uhi0booe9vdh49r2ky9opzqjgl',
                messageProtocol: '5oox6i49g6eky06huaaun0u0uoreu79wkpdc41vu5s4uupns9xncunby3q20',
                adapterEngineName: 'ey4nwt91l4ig4gc2gzq4kfy2j4opz0drn49c1penq7xc95cecgfmwz1mlv0e5kdtiqpc43nuurz1ok2bnhj00r21dz7ruidtjf27smrkx4ky3fzljh6fxiskcmugy2ekwyisft9oolt2z5uuenzijds3utwqibzo',
                url: '7n579h9jl4xipe60sulkafkfpjqc7u4vfyb62zgtzusfgtue1ir4i47abx697l38xupxck8yixn6b5jiqc7zachtjo8q7z3ywmt9puoxnjkbls0r4frouu729zmg3ltqmb67piv0dzhgrfx8r481lmqteyq0ctz27ete1qg7lvkbzqtjm0fts98cndw5ny2s2crbjwtlm5dywjhn7c81hmdx4evg8k43ddibd4plm8deeic56vr65dwdyahvjwo8becmkryfxixk1b35ws0198uax42aanqyk2eiknjadsdy4hk1atntfgdkvl02e7wc',
                username: '1k33ds8k35rfhxn81yxja18m6p26z918hv6ypbcv1k34efp29lxet4c13rb1',
                remoteHost: '0hn3po0yyldsx9y12omf01dx6pzv4964k8542p8okgormcpxoiexwzjooxg0j5ou3mxpe3ejkd6hg9fv71rwg7tg573uevel9oxferprnqtk9beb9q3waqotevs3bzyj28kd3q49fqq2tzeqwmircqenxd1x2h96',
                remotePort: 1939183957,
                directory: 'hcqiuachnwatyiktfjie879qawkr782sxhoj52ft4n41lmxfwppiedt7fmufu8ix16b1ca5fhcs3h2xb1tvq203qi5cbudrhb8v6esw9jk3vkccqqjy378ikj3dl12pz8o62tojkjz9uxz92ovq7rnptbjlow7has0i9p1t3kka7std1kve7s5fgo7vd3t4edcaxmtg7a0gsg6c5p0y7h9qcv5aws8vqk8pjhh64r90r1q8puupg3k84na8jzhuc8p3q1brkwpu7t2549xppvqpa9tg1jl6ea4ca0p3jxnp8g5qhmlehibdglt6lejd5igl3xqvr4zx2k12am0adjceaorrwk4fm0zx8wqhxcl8mvzi1t9kd862molb9nxzvmkijmd9vci5bqfbof5wkg7651k2uzrj9n9c6nhcda9hsfxl3dqlpakp3tukrx4h5ixjvp5kg9efcyr7mpkots9h514p5041e5y23v26y84xdqc74z8ib5zap2dca4ieixluoqapxc6u3q4ec1n9omacftx24sigihbztvr41nmect9w76d1vqsa49jl3uqyl6sv4gjq22j8emhy1gw0a1mawka0gel015qdanuvhb9q9kzqnktd58ydbzt340hmb2pk4r2s5wnpaznl2e4e7q47t2o1neq16c4gs3s2tl36eyx4bmeww021nezwcr7c0xlggmk47ayf690pmaecaro01zwz6rbw3yx9krh1ssna9wt9tklbe4ivnb9rira9c58j64gv529mp833ophacj6j1aa4gbdzbe1ojx6owo5g7m9ul4pid208tbggqgnfbqbj4jeqyrzmpc8fi88xc1a7mtvlb067ss5uyvxku24l83kn7iwct9j535jhrzj736yyjcz04hp62sy1rpfrelgjfel0prppdmuzmmvycz8dt086kz4o6tet945sctabjdu2s2v7v1ncmt1drd4sdkzootzsbgxscvrrvm16gr8ritn998ilzt1gngg7b27uh',
                fileSchema: 'f89st945uozpax0oc374gvzbultfvznajzitw6ok2ntsbg51kpquneudmdwzbr57b3xvyxbszz6g0pcqvee4ykppu3co15prw3p4im9rq6nyyhgywsmqwvvoaekta9f22vizve8r38mer2xty1jsa7am4zk07cfz3ajg20li1xe8vj2utdsvzrsy9fo34f2b9k1i6kakcc46p4ijgdlvadt5rygvn8k95gw2qfnye4hdab6lhzauqr5dpp8d3r2a59r44gxvgkm6fjhic8axbudnvs9k5xcrkvbbkwamyglrt3y1z9j5efjhsy9o5icy5w0yo1456qfeb4tq7rthnjsnj6f1wtqyfibiqe7nin7klrqlw4pqeu2jbuobnqxp5s75jfe6lb0emip8y0f76wfzr8ptbv86wh61dj0ikmtd96he3b5an98ytebu488dywo64n1p9txvddvnbbkyat09zgck3hodzu3ij0p4i2boiyrdt73xvjurwe06ptzp81o4902c9k1oe7hjoxu3sz0b3yhfk7mowz12ed1m0m55as0a66xhcya8sp20tbwusckn5xgxyvw2hhuzc311mf3ocqt3ol6u0z01g6dyhr2wj95omyhjjz2fmeqtro1txwqev1p0cowsktni98ggm6hvttaq7o8hw4ydrn6twpw4c17jznlweqiher1vlauj0ust7fp1vb4g6jrtthgf1fbzlj5rwpk30rs6j38gtyqvwa1c8jpayss5tdf42et9rh7uvrdm7wmn2ierkmsvsyzq329uv7rpk03y1vtgpivo931yrvt98y2gp970cqho3d69xgtrrvhuth6cfnxvch7v8rhzj2yrowett2yusdqt18prqtpdlla4ohf9mlkriqivhyyglvf3t8uuk1znrjoq7ut633np81nmisytresl5cs2pnm32oaqe56ifb3ygejed8vdi7r05rmw6xqlorzdqiielshk6lva8ut6jffy66pe4pqrwe0n84a19qgt',
                proxyHost: 'l3xps0q6m0nsnouoj4ufihvk2vgje6se1e8rgapvl8r2z9jhpuurybmlhdb4',
                proxyPort: 7277667052,
                destination: '5pjzm1hlrtliebuq29m0x334cedavis3eru8zunlcg0fcpn2s1r5c01rx9xogykuxih7vwij005agb9xqz58z01t0h804z42jg7jnemxcdyp55usme0st5fisx5gjot2dwdcxpe5ycszy97ojkc03josgqx8a7wc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hfe0yh59qpekhqau53qkeq9nwf5lectrhh87t8qw4j60hskua2wl3sdvrrr7w63czvbfluylmgjqqh5ol7yvw05m2n67bkcd3eidlkt3ygyv28f814sgnrafbovkpegdyibhomumj000tz049hvzct1bbkhy97xf',
                responsibleUserAccountName: 'foyad3w1ka4oqq3yyczo',
                lastChangeUserAccount: 'ugasvu4w39atdhmn07v3',
                lastChangedAt: '2020-07-29 16:25:12',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'w9p8f1fxa8kb2ht8vgk6q7o5xniuvpnc53vign7l',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'pfq1dj5nearx6hcszg2teuzn0iv9s0ipogp8i2l1upfv9z6eg0',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'm9ahxi5c6ru2pa0abvol',
                party: 'i3eomyntjht7ppdqd2oa3a66ndpmjno6teoy0y2bfib4anbtc7218ys0x6lc1s2k05bfiyb18z97664rw9skfquxsuyncrfi7hbyowflqkwi2u8xwi8sqjr0ez3knt809f0rbw8lf9fm8c02yk8zmo10q473eqnq',
                component: '69p8nf5htxe3etaaobsq6glepse4my3fphk8ocxw2n8mtuljn227syg2lz5vr1nm3z1rx3smpxtq21z638b2t6l5avy600tvg0zzrlc86ytmxj02cam35kuvk9own2zh8m8y621kx5i3zj1ah9zddxckum6px4el',
                name: '4fyzsg29elqfva2odyxqsixi4r83fu8m9vacf3ebmymhhelyn8i4r2gf81jemw3lgv59ub3m5vus64yrflzqaulu7pf64eww8fm85orbi2xkngbc9jyqis2dtix89u6ei0r425rj2utw75zc7o5oc5v8els4j9bu',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '7toamoe89ydkboe58eznflllk1ndi5qrf5sgwbqwck8lb6lyye19mx6nxoyqwfahfn3watwog2h7ksq9xzqt7tdqf5xjd78lp3nydiejxut1q5b9nx8dgrrkfegqxt8hy9fqivttry2899013f5x62ojttxvfc81',
                flowComponent: 'pflg61ws833w5c8x2zfwd1wg2tw9jhj3g2787hhmiqnxzgd6nq4finnntlw1ix0okfz1y7ove9y9o31gz0mdjiyzzqnafexr68873hcfcmxk5n1p46k03p8nq1fv4hdeeegoez8f15lgiihhqh0uflulgsxrkubj',
                flowInterfaceName: 'm4otbz5xtum3e3555ko294nct9svcyt8msvmdvahukx4o0nbncejsixqfc26a56jkyrcpsduurdoa9jz5p1lhzpq623vuv8y1cf6rkj4sj16v5p2riijkbm2jcwgmt02q62noe2f8y02vafzeocuwg295a09i4x6',
                flowInterfaceNamespace: '6zejelkvh8pyoo9bjao6dmfo5nb4nhagwa3hq3fkcyziy95kso7529jiw2e69i7lc7jsay9aq7v6yo5nwo85ocwssp2ecxjo36eoksea3q8m1k8ldm073r31dmcgthckebhzvmnu1zqvntbvu1cfgq5hj46rch5i',
                version: '2mi8r9qoqlenr1xh5dsl1',
                adapterType: 'atm9zfwijp64xgjcat41t6jgyilkfdpoy0mxkpj42oke7zw29pg307lrwlbe',
                direction: 'SENDER',
                transportProtocol: 'm4s334b5w4e30puqiw7c2ls44l1u4ypnjjk49t2zhg56kp4k0yx5g7cykpqo',
                messageProtocol: 'fioty5aqz8tp950kpsn2dbirppmiir39fpd5n4brb023jv1mc6rppluupel3',
                adapterEngineName: 'icofi3wxtcq5j4kgv4jyruvy3pxlxc80f2yy26xvqdvule6bfo27oaixe50a83e3myh1u8bh0okf11sdye5c2xwek7hmp2oh2udz7toauycrxfcg5jnqn1lx50ml3vdz0eiu0vespthse52wg0el2jpmfayw4mml',
                url: 'aztiaqj0yc3jqsiewvdtyaxcvo99vnybjhord87w3oy67lweb38nz6nge8acwqjw060fr904a5y33m8nzhp1zfoneel2fonfstpkbcm8pfwyb2vj3jsvt866nddh8j1y956mlvoj1a5c6uhz81yshp46hsffo2j4odfuh7uqzi7sx2mxan74npg4906gjmydvbx2bcjoz2q9jlqhi5xm94rnhym06n0dz5x9m7dq9v0bwnsuqn1x751lengzb9cy5khp64ixun7n80hmxokd0zph84oz0q8wmngs0xnz5je3i69vdejvrdc4ibbjekc7',
                username: 'bu1qy0uc0k1d8sklorb3ybh1yzh2hxr9xkzcheoyix0g8ja34dalr37nr509',
                remoteHost: 'akiqdkfcs41qbd54654hm5oe1vjivjxirsikafraojswc0y7zcxnsz12a9t2otso5xy2ssqq1ln2w6z42a1cmblyotuxf6sgoiucymivwj3pl62zu8a9ttu5t3e0oa4y3uubzqie32io9cnsl69mz8iq7r04nae1',
                remotePort: 2060101166,
                directory: 'r2chsskyfqml286n8f3ja446t1nv1vmxgrd4qoovn7xkii8hiz0mpcqqxnuw1z27mbi1k5z319qfa6ndce6kp82s2qpldn53d26a1rfpgea6imdvmb7y5tqzs1frsm3mavbhavfzp5mn6jsde6niw4p20ba3sy4k6xsp2s48rursm6638znzsegc3xuosrgelep0r9notjtqqgsvbrpu3dwtlh8petx5t1i1yon6shdz2c150gba78etbuaahv0gi5ruzefqhxz91aqo7inpl0dbzlgfem9waeixthy32xj7d0xlmcdn5k6huzwbyza9ru638m6lhccbrvnp0qfnzx350tsllkgt1dmjhs882aqm4xgb7q6jl6lmz0h28rt30xilhe39cwii31r437gawbd43a6b3mtejl4kml732975ssj1wfuvxh3hbbagrjdxbchbcw1mh28m35jz2597srdtewnttsee0oqcx2jpvilg38x3c95uqcvltnaanpa30wh4gxb6d0y75xj33f22z58gp5uc7iu5pu1x40gpoatrz25qeh9uzuvokkoo9di4oe7kpzp4yrcr72ma76mrstu0ixjg6lk6tj94d9u2grjxuogr6zpzoy5m9w1wxay32zkdl8qll3z00l8qqn8rlp4eto5e8qp5gthvfdqldoi0nrbvz7i6pq16ofcewe4zivn0sju1c8roqurc188y3c7bnab3i0ajsyts2tu7nwzqnwkqn1o5tds6cjl8uweyxm0p2ake4wdnylkhu3eapot30rss224g1imfzojtyly60q1foo4l15yfjk5gwo10bbv45prn5gi7myrr1uy9r2qld1jg9j1vusdzi95hpdqbht5y03q2pzl4pi9gmr9pa66xld6viurqivl8z47k8qe3lf2k1fcb8v6znujjqgotetlk4uqfy5870vu7l4opbvk9it2r6xchh4tk5oec9ogf22ko5l97fa9icxhi90t1m51hi8gp5ryc98467bhi',
                fileSchema: 'ejcjg2185whb65d4ij6xrdmjgjeg9a7asomorowo6wf5vwrn5mctfcqycfo5rn05hlsgqhab3207v8r7453b82d06yjtqnex0hgx658msd1gzfuofamz5sgs4p8idvnpn7ye14km7zonajo8qbul31qq18e7zo6y7nto9bva21tb5g75zcr077m0bs5hu6zq2mm4f4lj6nx4pbv69ik7djss0pr2ylr0kjbh2g4fncg3nxmaraqgf68xdub13ym1ki59q5noufl7aj3sy162nfigg2e17o58hrwer4agae781qu7oihnztprdcch5m8g22x87nbpkpo9eyq7jbt4py14j06i8vg5r1o7tqqt3i4lqrzo85thlnsq6phx7bort8dx429bf180lb8uhtvir2bkqy2yh9y3k448q9bq1ftxmfwuicmqhchp2yyae4fw029arkyjxapawvdhwoc56v9ryjm7dv1d5jfkhcy3xhvekij273wrqu8yg6lrvj30fbbpme4z924efbugbf0an8ce3eena9xej6ji9qb4c9xqdqw68rjsgl30w4dnr92yeb766vo8h3n5db7alwfi1rpp9ycbvaxlp33cn5927bhqtd1occcitk1mkwwpwg1b8aqdg6z9btj0x7fjiqjkwwkcyjzm7o8cfohpbr5sw9yxc5bcojky75fgah5img7d7wblndivlc30u8k4bvnvvx4uowa7611i307zhy3tspzdblgp2xg0f9vf6sc3sj28gn6uwctpbilsj80itxgwmftdx8r34m7mpdblmg5usbhkxpnj8xb7cr9iouh17wzvexstlg90w1x7yg7hei6tf2uv9fsdwrrgyunyag1qwx30lfp7z9ll09l2f3vyggbtfuwn6c40f7e3ldef55flw6fu7rl5cjs44u8u66i8oxpmbsq269tedyb07wecqo6yfa1xuoxw9cagdg9o6zcfmi09iv9f99oquxmju4rqqke6diq7r5no9gsvpi2wnejo',
                proxyHost: 'dijtbxec4ejiuw0qglqqpnfr8agekr82xkdz0nef3m61p0yysrwqiezsc1cg',
                proxyPort: 2822630380,
                destination: 'aq755novganyeaolnd31yc6v4h2b1c1r9yigfby8rgamtu87xyn22svm2yxluen5917ecazorlr4k6pxkj42b15zm1g40uzx9f3phpokr9fvbaknl9ds8tsszia22t1ferj3o1fp6lbpc4w9xm1s4j9qdfufq7sn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'n4qkun06g6tknu5kxzyux95xrqwo177zsnocj3vskbdfp3csjq8bn8vqbxpwvluy00cnk649xrjf7x7dytp2gexot85m9nil6ox678vkcmsylit06v4mfobgfju435h1tj0h9s3nhah1sqga3yg4d9sdypf6zsn4',
                responsibleUserAccountName: 'tqmmyvun1etnnwrer39b',
                lastChangeUserAccount: 'epha23na6ex59lqt5or0',
                lastChangedAt: '2020-07-29 10:28:03',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'cljj5zrf8whzzbzxud517fjtbjzbbolezr6uln9x',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'exdxkhj85pfbaox5hjtc99sfbxpv9qgpksj7ufag2zemtr2ib6',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '8rqjl3hanpjwqnr3219y',
                party: 'ysj0egle5an81g7tyvwwq67xl2zc17llxbxqqvie0ygd65zo0n2ab9kle44ydutfkigw6r43wqnl89w3wgigtict04a0hk3wcp858vru84thicfnzqfroze9l7frvkr6ckqpjhp8sfsbx6n8hasii3x32oae5gux',
                component: '4wmu7stqsfgdkgns2pm3wfqkdv9ct778xg6skb9j96td0fbezbsqnwkjligys4n8044qxid0e44ax0ax922ggmw1hac9kbt8kle666gcktopfaogz8vua81oh3t8u3jkf4nwcfy9a3vuplb70hhrcqmecbgtbpxg',
                name: 'tgwaai66i4n93y8l3yox09i7dlsadywfpwn43ju8o53pmcrfysbtz2js10q13xyynbevbi6xq6q1pwgcokbkeamj8qvxcbg3c8v2dhh4j62uuoxa6ijnomyegjjfj5xgim1x39a8ycisu6lpnhu5j6tgq2jw290d',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'rh4rvuq64g2mhjnmaadj41tl8wpd49uehl4xjvbp36q8rtowruqo7oxs7ly57pm5x4traqf7tzz95ypf80qmmxe38zovn0s5ptbk2sd1wymhx05fm9dnuo477pzz568jzbb72c0zv13cnk5z6u20mrwerj0s1r4s',
                flowComponent: 'mzrxgpsgkrz5ujlh7vbrnd3euv9e3c7a5i5vwqfhz7zhwdx9mmvdg72p5qbt8i4g66irkv0qzbpctyavyjji4zbdpt9a89q9rregomhblhgoawbgkhvm6olbin241enokt3mzpztzlbyhsgndwqz3v8oma2qtvee',
                flowInterfaceName: 'yjzwmm74zfew98h8qp1pyts8hxl20o2hnwc8n6t4h8vg37zikc3f2brhwrl3hnws16n7qjf3h1hj96j449a7m6lwz5saggbuoiob3mz3hxn1lxrrgf5rocph4c94wt16wx3cljw1ch0d1gigpwmp49t9ohp1lv5w',
                flowInterfaceNamespace: 'swawqmvwmqr1z9zza589iw5siuuup4ink9wspvx9n0aj792gui5caubmzmh4fqmpoo0gn74fevyr68h15mz2ovtu1xo8a92ytmrhi4on727guqm6o7bi9ploc1e6zatfchpp26tcgw5j1kzze6qjo2c5x4uepig2',
                version: 'oif3qxbe07dq3zxj9csf',
                adapterType: 'dkutoi0lpstxiqvhy00edq1a7k6649jypp3eko880vya8t3299r4h0afe4kgh',
                direction: 'SENDER',
                transportProtocol: 'kkvb146hjlrpswqqvacnyz2elmh5qena21fvxxi8kiei05wyjxbosrhxn4da',
                messageProtocol: 'dsc45dunvxp5wuehcprumbsocvct5yzwl87e8d7o6l81zvf1ldbsptqt6ax7',
                adapterEngineName: 'h74j9v37biw605bhu8kaj0e3m8yuni9875mn1vxqca4gvw3mqhxcmrc9g878wyeq26wxxlcjv20v6468pfssdolyjtko2reyne865sh6y6lacj3rpfimat42lmfjvex6b09ha3olh106bp4hijxc8jj6e8x1ydsm',
                url: 'by8npqwy4newuv2rgxl20uplyjqz07nj5dk7st6arlqpyyfbo6csp2e0nk18yeb5oiuccy35riuk7h80qgb0lk471mb7tsp831eko2uwbrbdrpui67h24mnwsp7zdm33lnhxxcu38rw0feyzvpe909hm4gjjngvx56dp5q88i07go90utfd89g3jouw4rcgh85y9j1xa3vt27t2x78v2x49ln9sms8egu6in548n7cn8axijww2ylb3yncyzoy9w0o4qk5dqv05somvr9evtdzwsqlhupu03sbq8c7sruv7kp7kjm5291f9c3i3meyvk',
                username: 'v40i64je4oopn26161c6cvzujaxlg9f617hbafnxtfj2lxo3uj99hicjnpsv',
                remoteHost: 'lm16atsmmsv5m20zfzpw2qhcvcfsea2qjg4v6uuy1wf2ei8ybb7yh6b0pfck5ubqnih3erpj4chiy8eieevsuqagwkr3hthovrk9o27v8emvawu5wbzxtxu0aeyh6cryij5iyalwg9ogyiiges1ajma1gthigwgf',
                remotePort: 6937546227,
                directory: 'u5essi19u6ks243d4a3px2f6wv8xphlcpignlzp34k5reodo29jnja3sh3l7nx5qu1kmzjlej5y8abhoix67i6sy4vto6mujd2zaiqj2378t36pzfhg36f4oov9b3deft6724awmlruyvhf5uceo8ic0qkc2p01nujgtxfg4ysrfxxlapnoxcymmfuvkg0s8831cdkpuydavwf7nebk0hzkv0k7ejgvq3gdjxkudo9ubrc5ofv4gu7ib7n1emda4x3fmu89d0cahhcedb20kdc4r1tl6bz5ph5tpwcx0k4ee962k4mswexfgfmwh0iqc5iq2r5s5fgchjvdv49dhd0z6tf6k6jofs6nap3c3ngeeak28lod0wjxd29pdmtl1mqb0aydlbxpo9zsut909asfogdm63cornby25fjtsaftbgi0c2li8ejnqztxdqc9xwiq51f5zjjwc7xztxmcdar4o1ehr52bes65i6ucib8xacfqwwrx3apgtyykwpzfc7jcrnr452aekuifw233zpt9nw6ynpqtelysea2lef6je6s4m0u9plzgpl2s064qsnov1nv3ykcxcursgsj95lklxb5r5jyi5p5pemx1oc0emyop73ikl4u1l5jgooi81w4le38faov45koyirmbawz2n0h2pk40crws9uzv7d1nh5t3t6d0842f7cag0hi4feqw7xjawbcdpkjl1f4gazdp5inyqglt8mm57qwf8ke7sx3xxvlpu9uggwj11p629bykfyu7h325a80wrvhf1uoxmdiloht5oto6dkudr8xczkfhztmmrusyh0wv4ff6u1ck0havedo1mzzowxjnpe4m3a8870qicdqo5x2z12vuuvtq93b2r8qa6xbmcue66967b1t4oca17175ljxdrw4u0v1hle7pwj0dnweoasn8udufscyh7itge5on57bjswez8x2rabjg2a2256h1k8rhtirn1cdndl5hiq04v5m51mny19uubzkcpszvi4x9',
                fileSchema: 'kxr610rv0180o73nvl6g956sb8p2bww98hxm61ebt32u5h213d2wtyo4ahxw3qr5twqtky6xwv8obpid9i4d8vtmk5go80y28ihzuclk5mdds5ooa24a6xerm1skl9g4t0qt16azwvnsfmco9j4u2ai4wsvcg70opyusebguarovi4bsdyl07gshdl1rf4lfduik4h5tni0h028z542rava2ac9r0ib6vdw5tlb8kjjdzgcninhcls98ndjuulvqknyc0y0yqsgz8vnbbl2cvu7q0x9q154yev8p6ipjeqnmql4ydjzsqhwbnde7raqwmp42y81b3lfocjx9ljak6vne24xi84efm1210v4jbt1x6nftd0dg0ug4f3v1no6tcyxfdy58kqw0jbn9gfnitgipaw1nrulbs0ocjc84go75y2tt9gqbx41d6f7wn98jbz6xrxy1rdcki9jex1a2ewaff7zjnvziyl1tzombnb6tajkxqig5lq5fzabw2muonz99anxft01q5lob6zmoo3gyr7eduf9l17xaw5o4lup06x4wi71ray25eg3st19cyvyyhftpae47rr8u2bz9ujsdcny1n855tew9sfwaue5ych8a3j3y9hm2syoxh23u2w0c7b5s1n5hsfr6sgmkf2sjgr6lo2ovm14q3gsdy1slqdwn0kyhq55xoz1n0hlm8lbab5suywq6o641hwy90ofv9j6bywn6cnmubxwf6bsrn2funweuwm1y4rik3yejdsb4ehqnl3x1ysuaixr01msboa915stirkftboz7f0r9klkcv3c9u4askvrwjppy0g15lzg3yklkje7dil3ivu7j9jlqa0ixmbebivfxa8l8jcaxt2hg4tqjw7o8bmvm6bnqh5uwc2wg4vkfyal7nhk33svi52l66h3q0ge4lsvrv6olaidg9ybht7ctbcn5sb4bd0ehuhr204vn1wlt4hotsrsyn2odkrd8439e4weedwtrskr1qd8ryacfhlvr',
                proxyHost: 'zjdhpa1ttfqmdeajzdwwp7tnaxyea0h9xbpc37mwcplai0g28qepltipikjn',
                proxyPort: 5950731204,
                destination: 'kh54s8g24suik7zjj7akjtl7evety2ynyw279k1g5ieoxv3qw3n1u1tz8pgx7im0qp44ggh4s1v5ykwax3axmbw5lqsymisnogihughlfkvx9ghn6gdyhdz0i7405cjo8ghpqh067omn4e33aqtlpho7tdha7k10',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zm1060x7na8laor9416vz9qz98ihx3ulgqhunibqwa1cw9ym7g11cb3t2tgy8zmryraex6a9shivn4a1xzaojaxhiv4vxmxt5i9s2freo8otedemp654w5th1jl9i15dqvjvxtul7e5smx00spll37y7osrwp2ho',
                responsibleUserAccountName: 'jacu8zkfcuzjsvwt5ofd',
                lastChangeUserAccount: 'tc8hhypukjd6dpxr6ca8',
                lastChangedAt: '2020-07-29 18:39:24',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'wimqc24z5sz4ks5m9d4q1yg8i4sqdkuq6bzsoffh',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'zepp44dufnzweu4w1cpu88p5aml5ikupf4hry1poawyttaf2gl',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '9qi9n228sel11p6lk2yy',
                party: 'e2l3ehcp0f34jz0oe29kcu8ts5exogts0guoa9tfywkw4tkykqni5d0qdiitnafydmo2zh1tpjnuhvky4chgrfjjfp2o5rv53jk93z2uqkh8zl6otipu422j4ibims7vdeleva3jaje1frek2erhghqeyrzve43b',
                component: 'zsjndl81esbku0rir8h1do06xi7t4ylghc0o2zfa829cmac75xti0wiex3xt2gmp87u157a1ldzu744lkzhjycrs52n1dsqf48mm8l84feq47p11jngqipg3bw2t4vepxx1anva3d3dg4053yp6oxfo8s6r7iuww',
                name: '7f50opv7iabn23ixlcv1ubujlos5wm6hyeuftmefwnt0x4riibzpfakbt44xzbtx5nyg3ayqjptif4ykfiiouwtiqkdn4gg7zujvxkm1lvu3zeeukauzheaexxopm2fx4sj6jnpd68ftfbibscqrvbuzpw6eta4r',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'sfqqou5ti7punxonnyorn3hsh58thiwipdef5219ad4djs07oq2rjcbaracnrpxbcykthlz9hvbrf84oqeb6tsitr8ow54xyu1f883bz2au62ul8tiylcvadi1raz12nxm6efmysyaj4u2i4iy29qypyvdoz21zh',
                flowComponent: 'jq460ucui7fv9uqyngf0fg25thmaglvqrrlhlfxfiju0aoqi7fcgs1dro9zrqohnke155kqoiupsiswtgsutlztf8lecf74lur7ylmfbfxl8wb63f93jc3otlzi6cwhg024ziz5v79ifijh4akvf514wn4o4qo6w',
                flowInterfaceName: 'd4jgvqya715c5drc8c95qbest3lpp0gbsbpcc5l6vinfa196vt1374it2lnssymq228rk1s0i15i5c5a7a3rb5o368gnl2ozg4aqnojksmrkzk2w2xzy8elv8lwlo70sjpla5eyvys0cl0y0inntqasapfldwc2l',
                flowInterfaceNamespace: 'iec41yk9ms79p1ujgi64vnew019xfk2hyphumq6p17epdutvsseyiud60kz1ijjlu9xd0r2bszm7ttrgj9y4lk4y7hi15n47ikts4x3vboq8z5rz4bm448nfiqlrvqiwrkm978xjqm9iplrhelgwz9m37bgptbhs',
                version: '2hwlbdemqvno6loiiag7',
                adapterType: '55gn3qu36g0ml8e05vru6ablrraqhjkng8fhhhwnf6xpkcn7ydpspzrg9mnz',
                direction: 'SENDER',
                transportProtocol: 'ojaw8xbb9ozdfpuhc6szqycnxayf8oywwm7kejpk5a380spg134il30bvaxit',
                messageProtocol: 'hxsmmj7ti7vtbn66q8t4ug3w77w2zvjx7ghmddbs0o7uojswwdg3ssqf3ahy',
                adapterEngineName: 'mywpxtyfs7cb641wj4y752g9rsi39f21cssykfkldst5e5plizdorji1s752vs2dkyvqgs0g0xr4w0n3u6400gr4n9m99qvvg48klje4dw4iax7l2kmnzk6i7ggjco0vpv6u15foub02fhjd74yfid6o47wtiqe2',
                url: '5mnugsaqibfakt4njjd386dlgfmv9pbve6buobjtw7gzxpriszcmiqdldtkc74kb4mbpvipeh15yg8zyka5jwjpkzw8tpd0ko9jid415t9654k7umz3q8j7g9ie318hha1vtvbm7le85hdmu1q7h1nfn3kuvudryu9t4wghrf6rbtgltna9rox7iklttbzk9nuq5omezpg4juh1a8yy6vxarlcn5mt3ece9ph3eoc08wv5smxcl3xxi0fjxri47omuyqgwscdg1jtjxa48s0yviy6r9o6ao3w9oo8q6tclzb8y588z39pco0lyziwixm',
                username: '3vongnlbm586phzrrq69p8wg91498u7pe7dk054kai91g9chkaq2lhddqkf4',
                remoteHost: 'mlx3d6jew9qp0jcvzdskancx6mm7llzandipioj27300vcef6ivm9mj8cm7aop5fjck2f5ewki50ms93nakaznxyeglo3tmu6rtsb5un4x0yndznjvsz08wqtk0bmaqlwmio53gstmbpxg1kq44q7rkvmzkbaxjw',
                remotePort: 9681736379,
                directory: '9asi7u209fit4cjydsuir9tod5xickgh1iwm0ixadto845isuqwxi3prgkfw6u11jupkv5vy6p9dgsvp3vs4edilzavio44gs034gnph3yu39vip90dqnctehobb2053ojwodhpkw4ywzwerqorwb85p7c0rdsrwyawjgv46btjevphoejp8np0kt5hvv80vvddwu3k0uyiboag7iyonvhgexhhev83ej2ywuvse2cy1cyzlf1z7iwjr4qshn7yzk8f6mo2hy6e9c6whal7jsqdmvzt1v5z7zfj26kyrebblrmobmvja357v3srlanga0e5aq5y6jea66a1rbwktr72izczbbnlxtj6z1uuruuklvb2xpr09nf2663403qyp0brqt2ya2am0m4b6zcusowh4l44jdqwxtybhjatzp518yl285r6msrpovylohh8ts6e34wnb8zgt7aqnug3mm4gdmm219bc1vyyp0vi5pnogdv7tvtwjd00lw79a2jk5x49qqvtyrvm10spfao15t9ces0sqymymj93rm64mo9pu8w0c8pcinpaeyrzqs5vt0tquykhx9cj3pwgjwb783dfweeusqf9oomb9koh0pycl5uom9rk2x0mjliitjd5acvfss07y2ydiwsy2045wxhv9bm90rran2l5wjob6fxkkefe8hftf0klv7fc23sbde30vct1yu8cszzvc1ybql52oxcj5lj9yqw7t0jlwc50s3nlghgz6g3qxgbluz1fz0dwpdq8wrtyc7t1ng200c2e7njxcv81w8jmhe2nbql788a28yhgk5s13467x90wvxgo06dqj6bvq6lnng2xodj41h02quct8ex0lhi5x1ydyokc0qokthqa045tqvrw1686ilv0w5ap6y5jve03pvhi5psnrulf13bi6o19dfyrs6y43fcvh3u8wrwbuhsqrx207y3fujqiyboud29wfufgovxatjn3w9tstccrv46ok00lzzbytzw1ysw7hefdy',
                fileSchema: '9dy7h5g55x69dufqy7hgje71e8z9t5xf23orjsb9z2tkzfis78cplsyo9dvgbi72gh2v7d1vc11e3r9jr8vtqi53l1xla6nu2co1pwryfam4ljxafhdlphzomusjer6wbvvzgbkxsdyk6wonk9zcfrnecrp02p6r9p7of2b6budohqumsymdbwqi1duzsao6g1ppdhq0l9lf75q7l31fghmufdjobcwgodyupu825dxcw4fpj4kxxsvx98r4oozuneh8zlzyhkosmw35i5f82i63silixvkpz1mq0xzg0jxdnyod5zc7jb3on051tqg571aa5xsgri8flqh3jgl5042pb3rebzb4fhec17dhnswkx5fhbiz5naynkjw2a80fwkawohixb9ggx51yaazlmn65z8rm4qr1gbqlarpp3i7evu0ldjnmayquw5m0fjihso19zymaqo644srbus4x3xne7m8pyc44m6svn1kjwbgbdxnqvffl36arcxr3svgefnzqw97w564e6lipv8o52tkrcnup97y3hwgn72tqtfb14kgzwfa2hdqkbmhsamvh0tn8lq5ey2vpdl6j926xts9x7tgqswdawgba30az7srx5iob8jrc4zkqqghpg3qlotcsw8hhdz3y9m7l2pbke5m1rqehifres6tvaajnnkpx7j8zgs009ho7iam3szj69202796w2m96502ebr6ewflhyt8io25iegqwl6y3bymve2rw8acwegwj5ycqm06bgrwau0hgiuazknlb9rx0kqp0o3r4jsxamx0qdci3fbghv7tk50gko6n2q0uz0tbvn3y2gtq4xz2d5mdhqvzjmj1sryhme4vvxn7f4vozpwl26pt8b3xul819thof8zbtga1r65r5vdz218zdzgad2vqrenh6394lybmamc3a6p4j2teqt622n654eyni33vi6gek8a587tm9p2ygalymr6lfb51s51v6mc8dwias0jkq3u941tok7qhiziw83gcq',
                proxyHost: '1ltszksvfd3lay11xh7fnlm2kfphxx0ljlu3b8rcjo2n3rz6z1lny4nid6fd',
                proxyPort: 3100455027,
                destination: '06iqjypkkf02osvftzksodtyj8qzztiruvlwtpxhzb8sbtoipb20ybbgo29qfpjhulof2a38o7q4uzi2bt7et84d5c0ekhinzavfn3t8xasvq5c01dko378ssx0w91j3o37ycdqmv73zx1kse7vjybgldhglgav3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'iomb5prlry7jjgvxaxao5i46474uz2mtg9xfp5oxpq8zsa7uvu77ksd12evukuz0hjxt7v1z8566uibj8mlqnbe63i7jyjnovsz8yllzvf7tewilmhf0j4fp2jk297tt54j08p47x8fffya0kt9noromthdilo93',
                responsibleUserAccountName: 'bkk9ymp9xgqkpfe0l51v',
                lastChangeUserAccount: 'e6258j91mp2o0ei3mmxh',
                lastChangedAt: '2020-07-30 00:30:52',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 's2da7ibngu0dr7czixu5gyxuubrecle94kfspa2z',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'v9u6kbrnrdfm3socbqslhjbna4wcg3kzqnt6fhd3a0r33esi3k',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '2p0bgyft0d669f564kh6',
                party: 'mhrpm86jz0i6jax8iwua9hjnhymgr94owmcdxwmt9z9wz201gp8hnfdymrnpbn19uw9yksvyfxudemeo35hkgzwvrdx4m7xxprtjf8xmb90u3pc09zub1sigkfqxmppawm2i9b687bb86zd64forsv3uqim8i5e5',
                component: '390dyskq5hn2tnda1qszvj04yh4h0inc1kmvqx3cy6g81wtxze81wwuq57iz14bxujz2jq0mo4t1zuvj0o0qu8jrwmb40bzzzmqbsfk2d65ijtu5znaghcyxxasqijnoyywcuxi6y09ivq0lotkfu4l29ru4r1w8',
                name: '0qfx51c3yny1h4s8wknhp6aynxhpkuebwt5colbb5bdo7d0w8zmq9w6i9i4a40df478hu6583an51eroqmxyohjhnvap287bpadfy9goalrcnkl14rza98jnni9nj0dt6mvi44o95gzee0izdadjv0r0dwwobypg',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'r4n5psa4hkwmpxsuzcz2kf6vncysv1cpwj7y6ltj1wck3jkyqixjybco02p259bmvgpiqurfse0eushcev526yctuxb01a1b2ppgzbmaisx0zbmd6hcxqem827jox50i0xbpj6bdkdl29x244sfpt2ntmicuch8s',
                flowComponent: 'n6ohgmu3jk65vw6vglxv45plm84isbvqt5913f933x01r5bwqa0vgvkup7wsai8sub4wnr435d9w3lakxr2bwlbng2fq4w1u7l0sfzl01v8cnitvmvgefburegsh68b3hlqi0qym9nk048cy9vnzmjsgquwdebso',
                flowInterfaceName: '5tuby5pebry4kq0ioat3w6exo1qw5q1hb5x6li21wzfbrsh33e3iyqfvv8ki7xjgl4rtztpvplxa1w5zii1mwvmprouhab6sw60nizbrmzfgbxamfqhek7hjfnmxcrv5s9svxp9dipfc9t5axca6e9ie1jug25kb',
                flowInterfaceNamespace: 'h4357twzs3ng8ivxvff6j246neqqelxdawz2h4l28hb0xmeoxq56ckxt8pgxs0ehhjpwp5myl5kosmvaex3abgsfbym8tbmuoxff5pgrjp1q0bpbi402rtig2xu8tt556flxt6jgzz7zvz9x8gsis9rczq30lfq6',
                version: 'hdn4g2v3mf39icew18v2',
                adapterType: 'zyimjddyjuc88hlfdgwdlfocwd8kmtkme4mm8ua02x0utmte3ngd6ldgbh98',
                direction: 'SENDER',
                transportProtocol: 'yq72fxhxa8o4z7pmc3amidgysmy8nw34lyj9h87x82ktpxoyjcbym5jpxcwa',
                messageProtocol: 'heapnre074w72xgkbjuupl3uk0s4vl64vg5k5zrfsbow9wkgjc46sdzuita5w',
                adapterEngineName: 'hawimcswbm1xxcafv5bpntlgzn52ds8llaoej0370len3ck15sr26y9dm8e4xz21o2oq8r5q9tltsn7k5xt8vhz7z24ml5nvqko0s3i1do7u41679lotlt9uxxonjnz3rkt1zl484fpvuibel0soklf9hnpslfo9',
                url: 'lr91i9vpre2r5kzsompqg4x9tgojb58ckbdj4q3edz7kvlwtcmj21u4tyddg59p1l6jmt3hasob02cfwzdxzs11lcmdfnkicwjtdeewb9uy8fcbz483u7keze4qx37jkf3lww80f3ds8zz87qb8p0c5m78yjw2z9ys7gnn9ydbg4hxy64ka0u0blpkectw4ez4f1gg2c47fqfxzas9hxur40w2m0ww3jhtkb38fmf2aal6409rt30dfngnw5covjcu29u4ckrd9u95eg6fi49pxbswauoqww4b14e6dc8rbyvrurrcf7qnb48ap64jjm',
                username: 'yrrjdic8f8kivxxlsfxlkxwtodvdqnmhrx9deb2so56jcdj7hqqg67lnnglq',
                remoteHost: 'uvbsuco3y9hde7g9gnwwa4e1il0bous0fsh7esufcn754z5u1cef8bol2uvk06o66nz5ibrqqiqefgl5139psznwm1ov99w1seq9yccmc1knrupxfkt9m51zs4v6hegjdd1tv4t2iog87akycz56rxg4qnjs17oo',
                remotePort: 8588765471,
                directory: 'ici9g77cjy2ysreehj1yjz5toe09jpk7lp8njucx5egedqxndvk04fu0dsdsfi1en91fdwsj0co8emp8b8pm1opqgr43hbonggbdlioidbpx4km5ixppuxu80fi1963y810yoi6wh4qhuqb3sdoxligacgpkv7ut7k2x8qny0oxph4yoq48in2lyo554bbd6nx1vts1tkq7d0gb275bdby0cbn6gzsqexitkg5milv9dcishwm210vn5hicnsyux9xc8pwfi8ggyrr5omhn2lenetz04xhr2hiaikn55dkvkwafv77nrdaus0lln6fn64df2wtnaut7j1dd80q8ll8c42h02m8879umz1p1o91l7r5iirzcsszalivns1dmp7vq8axrx9w26cpkejn3l7v9s20yvdckdw1ifc81s2ie1wc3ihiguvncjwxfalom7xnxo9x8cukezfb4dilbu6kxhjirogy6mjk0r92kdabnlns0x0kth725xeo4u6f25mqc3pg9r312sqw081hg62j4n0zkds8qihrgh94dewjc7latzy4s5o4g01mtluaz8cjoyyjlnvol07n15nam22fq5wqxfmoguqbqvd3zfh8xc12r2vq6o3litmwhwja91jiz8wfnojkhl6i244qirwu4pvjxu5mgi86yzenty4n921r1xb8nyz9uj3wdjh2k2wfjnsx55sm49ptiv08j2y8m0rx8o3yq8q1gfc86aa6iv4ud1glryorobjfnz6uxqy6d1m3aqtyk4vjbpvt93wjjoqukg947nxvvn4fynl5slgvjptdg03eqnp91cxh8yq9qe9odwqlvi1nwyqpj52njihxfx3iw5yjod413ey3u3ic28veavw63ddaxr8co7kjkdbkc3770bxg7jqyqddbxmyj5fo7z45mc5hq460vjlbqu2k8cpjgvwyrgbp10zff8ta8dsvfpmjvtyb7j5twc74aooh0s34a2ldxtzjvbbgq1unuz49wbr10fb9w4l',
                fileSchema: '1t6gh2b0q5xjglyg7pb2p4hvzgaos1dkw9rotuujgpwyoaojqyl0t45zyvmtq88jdf269g08b5fch3skj14i7id8ovj98oxqtvygp8ftjadbeuvbvcmscu23n411rbre4sq1l4bvi1yxgzpucfoefujnec45b4tv6ykhxnpbrnr902odc2jlrnjjjgq2imdsc1jfy4v2yey9jfqq4ehnh4fdhhlax62o4vis2skve8gug4sor9sm61ufjq6rh0uknq4qcgad89eshdmgfiyv3aoicva7boel46r0utcmf057ualyssou8u25ljdznsmhofc7jsn45r5uem4yzzzjxph43g1rm5htatauudfgmxih07e03jcxtvgqpoce1llequotaig2jfxsj8hjhsf75ud991j8tgc9z8vsdpvzfurfpmhmbplmcx4ewnfzynwv7myuvbqq4lplx6knravmcugklojwjawjs7xntl5vgm1o5dxi7e7r8u2icfrr7xyp2gk8fwvbs2m3ae7pzutw7ni2gq89t7c5t6qk2gf03xj4vqm1p8hl0lnronpbydirmept6sfh1fs5rldj6xlcmyp4ckt8gs07hvqrh8j5h12vz830zorg2pivs89am2fti31s485yyfh8f0y0xabvgkut2an5nbq26onq9zn6semag5gsim2jxulun6q4y3cwmoaidxvndrl31ysqucbo1kqxkcebqgjdcj2cjfxqnjps2zzi21yf7vtuzlr3febbazkhx4xete38ipz3ihmlw4z7ulw0yu6qr9x2wcrb2l2o8zucntc92ednppesrumgpbwogujuq8cu018otj1imojqt90p6pyv8ahj2t1lmb6b4vw2w2d3js6qjgosehsr9al6afskb913hcwynam6ambq4u5qrq3l135bob1uzsht8ybm9eafodbzcnnjvaqru3gu53un3vjvx31kfv3dj0tu1z6hvosomw009gwdil7ujz8uwqt0awn2yz2mdxf5',
                proxyHost: 'zoxdscf7jl7adxi9t06uwzyvyuuwhyphwplwuwndywjgp26qsstwnwwhnmgv',
                proxyPort: 2701024826,
                destination: 'cadtgzhpg1gbazjo3o5ghfgpek42p8w0il2kp7ks5zczfqszj47gc60hq7pzumae30uybdch5tomltiuum4wusuoopz7457ac2bokpbzh0n2k3srw5yczm1hlsbkdhdjywh8c4pi53iz69rp4y5f45pq3d0idvo5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'his7lyd453601un35ydsd3lhl8kgp6c0x6iogqfff54wmfrhzsci6g33bskl56v9m039rr0mt3vlbjsycw5rxybjqdptif9ll7d5ukkyldwqysnl4h9sjcnn6up1m1fb4q7b4zd6g3xyiq61gnf46abe6ddyqgsw',
                responsibleUserAccountName: '4e4oqteljinatof9t8n1',
                lastChangeUserAccount: '1uri5iu1ga0o38tqr982',
                lastChangedAt: '2020-07-30 00:02:20',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'oqr0znxks98wxxyswwuyrrflscvnl3pnw5dq9fy2',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2djquuwtgvqy6qby0nwhfags9prdgk6aizg4i24fu5quph7a2k',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '1qwn0qfq7c0qo0986md8',
                party: '60514buz2yv4lxmg5atb5bynst3gy6f27ovkypqplkr9dfmysb1q3jl9ycutxtq4e2qzielhdhhbsd85tzix3an5rv1ao1orf1v2ocsjycw4lu5vwvscpad5ucnv49b6v85lx84rdng0i314d01zsl7zj8ty7yj7',
                component: '0z03mtbqj84p1fyw47zdpd51k2qxs0w5cdd0dhc02mtsxj3b26d7eexxe85p5i67dqhu4kgldu0zukipuytt0szvyg2qfmg729ve3wy0299co3xeybn2mv8910web4e8t84tecbjnxdfibr6yefh78lalbaiujgk',
                name: 'dwvksidolf43ul6dhzw580a0nvciyd4qd8ioyjw0w9khenxl5vapwg7cqv3znra3p7cizo0imtkarbwguolmp69bi8lg7dansrt6venouja521k4urfvc3agpw6x4hhvcyx5bw5edx1lpza6yg0cnen2x90o3qgi',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'lj4wq58kkcuvo6kk8gg02hsk1y8ftl95ayk9jxvo1frl7lbsoujnhsp76t37ce7oj414h8zsuv67ngc684x393dh1uvckvdqjntd24gfri4ieuu1bpr870tcn3pvygdqhmwfgyery979w2wcoves0yo4ukk9iyoh',
                flowComponent: 'n9hbu70ageyvm0w6mnvo0auza1dhjsdlsg1x2ze42bs02j35y843vst1m5if2870b5y4v10kmy19gfm5ekrmtftakifh653na06l5xtfn8ha6bdnzhubqa6zuessvzsudh0g0wzdoetlila59qddttuihlk5y661',
                flowInterfaceName: '6o5m1zy6kq3y8gmv7wz7jzsdb34vaccjz3w6nanbr79o991nfi983qh5xzrnmvdfv98tioeec46wf8rnql030ul5c8f7rkh92fqrrwb4b82rh6r9rturawmboumsarxpcjlzaf40dij4dbmo6uenqc5buaro0zwu',
                flowInterfaceNamespace: 'ej2tfuh7s75hoqz9jl73ey3vde1jxbn3fy7815fp7hir2juyc49e0oep7vxijx0pz3onsy1lyu2o2psqvibj3d3c6foeb12ml5lc7fsbn1j7t8xafubvm5nvnwskmbuzzv5jkcd5058l3yy2tk18nuhjg4dyefcr',
                version: '9nvlhv7fufng766f1j1c',
                adapterType: 'b0bkr5fohx0frinuxzcfkk6gsv7ta6duno32vsl1e68ppvy6itmo33vj7cil',
                direction: 'SENDER',
                transportProtocol: 'ctm070646jqgsnc8zkivysj2hf56i62yr5bnjnh4ygfjl58axxzjrcuxlue6',
                messageProtocol: '9183wdms7met1xg6wi7md60pafh120jzv6xcq23vsc0qyniu3obai7jjjwge',
                adapterEngineName: '298ccnb8oxsmenhlnl87g0c55zl8ll7rw6dyp9ayrlk0ws5nc9utcag5oz1h05l96xylgnr0n1z2vi8ebfiv8wv1wkryommrwxt3g22fkow49xcw6btyynkzkgewigzr6nzm3vh8t9ck64vcdsh24sjrf0ihugu8a',
                url: 'sh3tprdvjm9gfmyle0n825f2esij5clcvizx7jrwve1hch2hvv3ojyftb7b5l6xmhmi1an73wmnpm91zb1kia0v76o7gl92byde4ujurzbx8d0exi8rg0i5ie4lbn6yva4qhkrnqkp273hkuhm940bmoz9fufrm6npkdvdajxa38xb1d3ouegkolnzuotu94bulz5l61n5djpe8ziinz6rwq59q6fycxsurhx2ai47vi3qey1t5x11ptt0aowb9iq8q53b90xaqe4ehz8wyhso8iy4muc7pirr4bi2uj5fcfgj5nbxisrpm6zb19pn2u',
                username: 'y1w6hofmhctov5gom2fapmxzj5qjzm9zwzt3tl7ja6vbdud5zrs306qlctkx',
                remoteHost: 'ddhk5sa73p0dtlkk0jvthl2wayqoa7ju0e099rby17i2bcfxwtakkm0qo1wnotw7wlh83j1owdi0gtmi049qbyxqbhxgvifsar62zuqtjdki9p8rv37yzfipghfujr99tg3tz3z21i0nfwjqnzsth6hk55pi1h2e',
                remotePort: 9749937102,
                directory: 'rq6oebuhkfmokgj56ebf6rjnwilp9ukrqbqghnkjxkxfy7etff6urxfa5i9mcqbp2bjehb41erm7itd6dwg5gtsvna565oi0fpy1cr2o6twydi9jyhgu3nc2k5gl2pnbpv9hzb8n67dzloegcl4toobmtt7jv8u0404cfqcd407sbmiy2xwgvh7vvp6wosbs5nxllz9ocgsobpn98ctdhiivouro9fc7soomlcrosk129muo781dubknjz46l2du9tpfnp1mgijk1qmg03tkp2ew2ymu3vswb1wq1c7n3qxm8oozgrfatuem3x0ehpnos4t5rlx3kolwvhaxk3r23qf991t0hksbl2o0ncsweupg6vqvjf8y1g6zhkx3pr6xhm9ahxfu17xup697wwzbty0hxjw2qbqv5wc9git9akvq9qj5sicwfokli43hi77vdpagq72dxhdxgtcxr6nfmtlmnbf4w2pvq0ci45mmmpk7tktq52ja6ufe5bfe4o2oi24gytoxfqnkt5r8hplxke5tmrk90h6h6fp9xylzo2hkujqzxx0gx0r4qqr6ohnasukx9i0k3nqoqy1daagphw7sydjqntitiar00rx7l5mcn4exroozg3omn0l4bzdb7z78j6lbbl6sq6eope33b00kzozdfpj3uj2f4q4svnjxw352b3pqo4ma5wbu74tpp2lx4k9uxe5tdrt75lk6okry0wloj5jqessg4vinurer18bhzwr0r51kmlrrdavmofwqi6p3nklxcdra1ocvkoy7h426wdq57cdsurm56bjmw7khf4qly2zfm2rowlutvmjyab5j870lkqgokqs14xeiudllkp13bi5k64crs3xz6by77bc4apgctcc10rpbrbndjn5jyz8x7ns21do2bnj4zrtn9cq3ogcer9h7la5vtkg8b5ovx50pn1qlzjfi2d76fscoqlhjsj52ce8ri71w6wh0cn57gi1y4wdkj6va08cmg4ssyuib4s1edi5y',
                fileSchema: 'bewua9jtvxpsmdyf8qsw3ugba0bqd0xqy16o58od3fxgy9bpi3l7rv3lzss2g0uqspj3r9sczoywnw1ki1xdze0zp97mcqoxba03kxcbc0syu0squj0um3k26jztu8ngt9g4zih519f4b0iiomnxyjdf1pzsp85cln1pkxn3gtq2kl7e256mrh17jm6qhiodhrcuxoqbws5keifuvq2b90ctox31f0hoxlicjyg9ofasxerj2gvcfv0moi0rdrh8ore0801a2bu17m8ebw9jvu2hbpcpj2u1z3k27rfo6taxn72n0jm6fjg8xi0vhxr50ktyo5rt03va2zjhzhmaxkxzr5rj09atol7w1mmgbrcov65y7xd3ti1t85t3lolx6yc5bp320rzrqn44mtb1ksjwvs5fw47doj8abl4vq95u0syynj8xk5xw4pi41cheizu9ge8a7q8bzmzbp89d78yhxz8vrru3bzf70lk8uv5hwg4s8ih73mk8rual08274diw8fi54ocogkypduprvjazrhmtsa8srpbwf31yuct7tzvn9s9sm4uhhuq5lhd89a62gya2390e8cno124l7vp3m68iihw2a7hitbihku29tpczbrka5vzp44n0pa4xgumtl42otgjiykcc7a81kq21vl6eamqpzylrb2itdb2fus6pmm0sizjhvgbwm2mozabpq6l16yu7ich3fcl3sip7phyih47pyo8i60t0lkeuxqvv1ab5kj55jwk9xg9a1d070nzqq8rq53lk2u382ridvvu8rknp240112v3isnko8ivm6myotm2dh4o248e50rrc4ddnmjpgt3h1u692cjild9ku9ndcy5qovjunkizfgq39r5wg8kt9qtqxs665dqoi3s5v3ko8h3bq9bknnl27bxjz72404nuvl2d3w01wjc8kbe71m0s5pam1lwnaepp57kvssau4r14uprbjn8ho7otxul683la0jjdfwonowr2ld9a6eog24047h1c',
                proxyHost: 'w1qlhg529qgkonx00uampl59k0p5x55ylwnbqagw1f594t2b35mvw8tciph2',
                proxyPort: 6042396154,
                destination: 'cpp8ka6n81u9kvw04dutdj5foiv3rf88sj4dtn8cg5bn0xbzun1k9wszww496xeivlbqkr0klu4jdo1lvu068qpiagpgp9oijvyytj35k4w1b6axkgbn5a14xwz1p5k1k4eurzd3yr9ti5ctyg74psau1qmdzy6c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bfd9s9yv5rmmr0sjyt9771otdaxn0qa656tderz9czqejjbgcmpgd2bci2fjhybmmuf2u8sbp7k4d7wi0rior0wnhe052k2ysw9a0nonoy9134pac1myx0m6pdz9uxoypmyglm84kpm68rhuytbzax67yubd6sta',
                responsibleUserAccountName: 'oe8uidh7a11e51t2zso5',
                lastChangeUserAccount: 'pyyrgl76vcpvyh15jnm1',
                lastChangedAt: '2020-07-29 11:27:20',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '4xo7c6pbks43gh22tc999zdyrwsyu10ak6zmkd5k',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '3r24bawpkiuvpwtn7zvysvfkpsfeomkvlzdij8yg5aq06zwlog',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'vcvht9q7nydnez6u8mc5',
                party: '68tnh2lfuv8ovo7x52fx2c5kj5fl0xtr5b3kg85d1ng8h099y06im0pmuwyl13c6g00jsrjik2jyvxbwrow4amz7txeb8s5v8nighpmx2sghj906trvs9zmv9bvai40mkheez6dl24aib32cw662tjhs0nfvqk1x',
                component: 'nvjweohi1pvyg97s0uev09zn04sfvq96t7782bkp4suspchkzm6ufs8ywooxi2mao15zjng3wi5v8agp31us86wto1iav9ewmummzr7a8x3coqr3si8s04phredfbvgybwzhailquo00b6dxfu7evxbnbi0hcyxi',
                name: 'vg6qn04myxnrh3xkf17q6ohbfdhlc01m0vfysi3wylnpe4b96yj2p2nx5w4kfrctfif1jwiaxp5b5bni6q66hh6qu7ubliad9dz8u9250dt9nala0nkpw8binvpvj4xny3dkzzoqvyv3qqxu4p3j8boefion6154',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '6zy01s5lvxyz75h7d2o2bs1p1cutwghccusdlfjy3t5m0mtoiewz1k5ah4tb7zo3jct0q79l6d26pyxhj5ncun4uv82ds1fx3r592wonrybbtwo2un7qg2qpjp4ioair1y35ufkbqus96dgigmz27d8kvwk6ctbd',
                flowComponent: '3w4pg3lvos4fxkwv95g3i3v6bl7hxd0thr7lw5gtnsde8mdj3e73gfj5wzq1ziw759y4rf738w3y3p0rlrprzxfjn0437n75fn3d8iuc2zve031o24ypzxhkipgadk2us6xkmhsu9gltsseqz2lw6yr1l9f2crk1',
                flowInterfaceName: 'xrkzb58egqi30p91domj7m1phbqs37rskn01tml2n2qx3r8aboifxq4clo2nxdb35ax4a5knl9rtho2er34n93z2ehxmms08k9dz01qkhwq8iha2znb37nae4rwaysvcfucbpj5swj9yibi39obox1ab09en2nd4',
                flowInterfaceNamespace: 'usqn5piffbe6hg6cjny5j5gkeq1gbu8ti8eevi7fyv172ndmyzvmia2ekdde58npv6q3a69unhr15qokh19viyy7flo8anfc1ha9t5k19gfrmg6p43wbwt8sjl2qkhxig603kr6fjoj92sp6g5yq1i018cpykgoa',
                version: 'ic4zqfnpwoirvkyraxx5',
                adapterType: '8hk4avo07gkcqvh037m0j3zzzfe7rsa0669sb8mt9w6q5y54nabvkx6gr23e',
                direction: 'RECEIVER',
                transportProtocol: 'ml1i932h2uvtiwqft98vq0g1dg8f09ubjrmzzkv1ost1nle2sc5hsq8919po',
                messageProtocol: 'ggo4n16wh5rs1lf3otb4pov5w1ufu4ygt26egqcelleixo54cn38wzemuy76',
                adapterEngineName: 'qvf7r8z4dnq7ereykw68c4yibmac023fohyao0z6nmxlhnfnxm3va1hit44vs2uactbv42k958bwq6yygo0g7f524v6eta19noqdlh8im672d67f8k02tzlfqye8sfecfo8feuva3ut21gj244i95d895zy9h3oi',
                url: 'emdoc0v69bqkae6tqhm4tv42gexdip7iqqag4qovqrhusfxy0k5wu2nukpv2ao9dyn4h4c49hpntz1z98a4l76m7goird6lzgkhb43lbalawuknneua5nmvaqs21jmwccncg4nqj8zwjenhtzioslaxk97g24cxc3vsj9cvozap74gvukmhg5q5h9zepoellx1adl2tzs9oa6zyg46hmfbwwh6kifugeioc5cqr2vsej7is8b8qajjrtwbq3hwoft0hhwjwodd06zjc8k5mma5ye5b0nxt1p4st1ix1gpxowwjdwoes2luhr9fg5grkrd',
                username: 'j0gus4h09zjispeajyfeqtyjfy8dd43nw1dhtekuj9neq12j7esqs3vedrms',
                remoteHost: 'lqsi4zkc9y3f2wjzc948drtb5g900q3787ea47bb0bas55zak3ptmhylu9ye2ccqbbqlogqa5gg5e30awrdnwxhvuvklwxr0p3el0wl2u7dzwec1z456nguy8byus9xioqnx74rzrp8vlvfcng7mykmyyjq6x34p',
                remotePort: 4833752272,
                directory: 'qfwgss79662lgzdvkbaxybc3bnrhyxlb39efv5emqjbnbog0hp6b1rshz3vua17pr33j653iikmnyrz7jegon09sirc89ujvxj0kkth6fnltpcqotn1lzhdrr76ttspjjvcz8nl22nmxpltriizbqykfgz177a7puptil0zi9eg1lf1w2tajnnuv9mvqyo82hjxi45pl1fg9m4qbfc4g81ffwrnwqf9oaikivazwnf6lgmiqi52szm9xhnwm3i55w7t4j5d7q9xcm8ekgbh5gjtfvnkdn5e8pb3yqyvaxvy5nclhfi8s7aleq9hijdjb952qo0vb74izqsi8gr389qk2vkk2ptrb1tmcht849k1n182w1wiobx38v86wxmlgmgiraslavf880ofh9hvo8dj19n8u1yoh1yd7we85ndsmg8xebiqga1wqvdn46zlikzl9itir7ldnv2oiatkhcleu023yp3ute0ug0mhw6z5nzx2v9nsy3t9dv2zt05hk0b9xs712fia5j374a1fk4tkg1dxb9kztzcj8qkzh3x1f6swzif3qcfvli4gllrmtf13o1k4zy8s2xxsn0d9tx8glfkstbbm7zhei26qew6yili255pt08ognlusp4vgwjkzan01ibyc4n1o6woeh9seueijked04fvirshtv21vd77v1944ole78mgu793qmau8644sq28bposjfxfc6758mkv2wkt3nh3veb7h62y725ij4bcln17kq60ww1z1s3bjy52c3hv7wcczo8k7l0ms1rcmioo9xv3wc8t8mcoa6d1f59ct6dthq31y3oxh1ddpmipiw4ev344n1a1e57g3twgeakemls2q2gaadydsvvo3m5nkuqxr70lblayce518pphplrhhf9sduoumh2wp1fcmb3nei22kxdeppzb72d3sey728ebqu2ovmoir4u05g6iybpsc2oyjnu7gxddrrrcz3ywlq1a79bslzti8xhc5oazx9x22n4lua35jp',
                fileSchema: 'smkqk3yx3qlmirdu6wbahj2oamcta1tieyqus5bn0zeccxhyrox715jugspzmy7xivwgkrkfbeqnjyb8mijptm0xv57oc0l6zhordsqwwjd0kv339smdeghpptvfjx7ddjx6o3644b1viyl11u35t3itlx2uw9yea91xshvvb9g3z74t2v7oht6ir72wu4zpgrc9cczx57jlipsbc26ijt2rgztezhflkwwfcdxmn2a4oi7dgjpui0decoejwehp006cuinfksw8satc5ivkd8apo3y4rxqxo6j300fs4ve9iow83ukufxrpajmz0dx35b2rp13dawg7mq8x1cvtbl0kar6gu816tnkhamwcmb8o1thjizo0ubf402476cj5wznfxerrlds01uq61bvvws6ul429xyw3xkmhha5x06npuld4hzt8fo719yqn2jsvaqnjvbcrlj3idl7y1yp2hrombymkckuqdo11mohubb55lobr04ngm4ocb7my2lwav41m2l3bmqr8dcqkykhtxbxvwdjtv1917yn2crq7nnezezmj0mxcuinw1ssrbcrwynmgz5pvv4z022seqojsjsqn91e9h41qkbqj0lvigbdmqu3qsihufb2m7fqwdmczuocvxove8ibxenankaxzmi1teqcixx7q5ohne8g5xdtfwz2gcxxbo3m8md8gygv6hzh2xpr1q6f03mfpz1ueiig62atn87tf5gzlxg1h2x8pppglz5hy5bry938yj47qvsuev9vtkbqyizrpaqcdgk76774c4y4ej29p4kdhx1g3d65b80yc1df4que123uuyk4mrzspkpg9v7c9r1ni2nggny7a6asdipb7jmhnzz0805rqijvx9r5ksvct9yx5805huaeyhilykxni8m7flc9kih4v9xmmfas8b0bpeg8eq0yln3mgwxix7xeiukyiexosn8u0mk7zz6ccp8f81p1zyt5qtrn9f3vblka2atlhje3a8emwby4gk8ecx5oi',
                proxyHost: 'r5mzrmel6je18bn001qeqrxhe3wtoes6t5df5557gg5nreg4urovj2rpeca4',
                proxyPort: 3202803460,
                destination: 'vr59zwp7hd13kah4lr4bdrxvq4pmcdnbedt5qyf31ka6rwujmv2ljencyracr15zcey2rogy5p64z8yyobrwomlhdyc63a8isy3dyjzo6tj6qj0wspsavi068yopo4ayudmw6x9rlgmyxa9pmmk9zibfhqy382di',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kprn7vmzojjunwttlrfm06rrq8nv3ri4y569f8dmaz6hbxrpfjtmso2xn7g6i327nq9807bam4bmhqfjk4bt1s61oesjgine71raclh52djeihfarhs0z0lvlhwi96nycsvyvqs31teqiu1om0k5qtdnh7en22hu',
                responsibleUserAccountName: 'el4hr4na053ojlucxmen',
                lastChangeUserAccount: 'zwfxgmk8j6wt1sg3busp',
                lastChangedAt: '2020-07-29 22:42:45',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'nnzk72153m7zao9ew9q893e2wyyx5un5c63u2xxh',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '7w4zfh7bmjm6pnp123kqu9a5h9tnqjwpppgkckus327ue1upif',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '68zh133z9529vnxo8mgv',
                party: 'eb60nnrrrgau5q8mgtb7nl64wh0ppo1lo02prs9eq7pnksjv81eyg0o45p107rg4hiiaku9mw8s5fs6oaq42obzlyncx8nuarv4so08442vkcuyt2v1bw6ol4183odb78befxauo7sgz8men9o28t5nmj4f71m2f',
                component: 'hr56zxditnzfhfdreho8z43y4xzq2xapvvqk5m6t6rxffvphauf28krtn60qitwjheqzhtmmyarl5t9cf85wv8m58llygzye4buue7lz2e6ayu87qqanynx9p4cpgrm2a8386zna1yzd009q7t9vmnc7obkirj7h',
                name: '7sxpgkcagrmou1oi8710qp8iro27xapehuakvi4sf6y5h4k47vy1qyx41o01b75ynoz0mznh9u4q3utmnxvkr5ljudbnmr1t5wsi20vldae7p9ojs5xkkkth1xjgt0jxep6yrjvmmyf0mljjpz3l7vmsyyzbw50d',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 's67byj5vaidmqkbfyu50hqe4xq5jtqrvxq6g94ba7qpiorfhsfqwjhkf6ejbg32wz3dzlllnbgo66tcnsefhjwwxkuscz4p4tj1iwgmctilcm9wr5efqi0ey1vypakml8h43qjcwhsgm5aihlt74gbplclp1xfm1',
                flowComponent: '8meyczzec7g1bm8fdb7vx20b10okd4hzhn05trg4ur6ei7mjyobxonz6mtsesu3ung6ei38kjvbw71a91k2pnjk16nk6ktvpbdcjfrnfk1omuxxajg6d11avv1b8puingpqp1he8t7l3jd399t93qc672rr77k07',
                flowInterfaceName: '01ufe76yig3l5prvfvmc5i252v126x3spsnijonro0qfypi695hz88j810owmvuqn1ajmj4mkmuol2ysn2o36vqv5w011dphwo8mvl55ho8rtc2g6jxgvxu57ical5hgdzs5vof1uejfy049mpofy1lv65joma8v',
                flowInterfaceNamespace: 'pd6crp5ke2sgpmjv36ac5wpw46wel60lg6uw0crrwdxxnksya8njvat9glosoctmabsrzi2x6a6fynomabhz3nspm6ts76wgbwpoeo195jk27lnf8filnp0nrfb6jzaaoap1ebtszyzzs4k09vgo55r0bwd4rbym',
                version: 'uurkkqn5nezjnkwfm2oo',
                adapterType: 'w7a51eiv24zh7ikd5fc98a2hf7n8htm86jfnc3ivrjneup4ewjeayyocwnvp',
                direction: 'SENDER',
                transportProtocol: 'apknjl6zaf2sdi5kn6aenh7w941t1qxnvk1bae0eucw7ms28ysahmze8561b',
                messageProtocol: 'oz5nb0sddf42v56ih76jtpu3ijechfwudvhcrfsbovy25k419l86n4r9w6bb',
                adapterEngineName: 'ivmswcjin1gaonhveuw2kiqerunc89q6hxzqqe0714otwila33jpu82ezihoyzxtcezmv34a82e8ibcd55jpgmmor0wcqzdort56ke7z8u0xm7ouqmqjtv5se5x30g7nfg17lrhcj072o7i931rmsoo0vk4eqf0d',
                url: '7vzew0pnvbu3crqhrdji5awd9j70w9slcmvpxh4qdgv4069pxksrn9xkh6g4hpqyxdf1vrym0vvgem1guen5jnx5qebhugmvhvwl60bcourth6bt2z0v3tvw013m6f0zei9gbwl5reizu2ajc417eg9ub94qu6jy1vi64ua6czdz5i2u1rcxxz1kfamvy8f7d51tf40sr79gx399qjqczcpgkuvfk4v146h1zmxqw1bvphdal9nfxgp4d1vz8y2h5v802si9iuzwm0spi2ks8xxl8icc7ndxes0nl5uujmk164j4qvbp66a753oyesfx',
                username: 'bl809kr4ain8zvsdsvv7wjwvlyn8bwld82whievmzxuvaoqgg2aqj9rog2qko',
                remoteHost: 'jtbkwbsaadfobuuufwff74a15owaehzrxvtiigoulghuefyjmj9b368ymx2jed936tzm5w271ag70k1o41ll8wlzvhb0yuz5bgkmuxy69eunj1e1ydnq2bgp3ltw1wx5dybm30dviudt5so0c644xyk9ineeb48m',
                remotePort: 9278605177,
                directory: '5xp7lhc451gmhecbk0io5k8bsc72jrtb27ss99u1j9tk7viu2ecer49zg5kauy8mi8sm0hu9t995lva26ivd6zz93o2koba4mpje3i733giwn8x111ifwizr7fo0ye7ksv139n04lxss1i41r5uobt7yv0a06i7kwnpz2z8macs5jplqrdl40w9j1gjzvvk37dojimw4lh51sam3vhbz08rgq12k0fr13q3cj5uqnx9ci0y9qim16yafl5tttghhl17nplkw8x4w6o6tfgcdyls8hundcs3g8zg9hud76bvaqy35k2yz5r7td8s42p5b0g0ln3q3e46m5wg5klyvgicsvfczbfwk8orqgwdls3dlpsb7r0soq79ghcaw644s32ldcvl6hawuokkx9t9h0sk3kyb87xca3p55udabnl6tjb22y9qm03b92wr3pwtrkshy3ordzb90lyo8ww2372jkkumlvjnz29zi96b0f0uuzyfbjqvvw0vhqru12tmw2kkgbmr6j5upfmdkz40aeci9fatrhcetek0gi2leh44d1fe6j0e5jvzc526g6fpgqww4nxa94cj5b3er1le43xmikbepamdxt8k5brobvk10ecc3bjl7ff982u24u9extblccawovltcn5cf6gafg5fz5s2x0fmnw00d4koudbndqtwb4kbn9zel8ob5upsdkdc3owq2j9rzkbprun5rcdcb3b794wz0yjizic4qgbbmrcawua7y1oeq6kpmsv91j3jj2basx8gmurlwml3xnxpb3q8i2n86qqku7ahrnlomc09umpjd8nx2icpbi1w1k7veeltqwvzoa0axk79v5t5rfx6rxdz4glvu9oktvqzmzrsvgxqgxj247weloyw1ejo24kaeawgjcobfn1gz73o409t3a2e25nxk9mv9qvv9zudx3yck0jzy3vdveqd2kued44dau88k5ukxf60wkuvnw0usueg5h15bfvx8twz8p9h5pqyaas40oyakv75k',
                fileSchema: 'kloqosq7pa68oh9c7gpxkyvq3yw5vafmthnst9686cagzrvkfmewfg0k9w2mx44ihb65br2zlihuwu4pk7iraes4zat6umu26zu1lnfupbsklyd928ve54fxhr1c02zjys0njt3d8tw8g4aidey86g7vwpo4wgp9dva513u2fc8omkg67il75z4qsonxdxnfr24xco81t4laaxfis7dgvjd49lsvwys1qukcg8urb8uzuo3ud1wl2jbld9n7pl9e0o6f6pfcrhqs750koy6tmkz3hxjxq2u3tbz3zn2riegvwaynv7f2d46v4czoaw9bqiq51haa68z0lluh29kvmbi0i0dhwvozlkaah5jiu85hbc1j2gbtavxpyahsvd8dusph9gh11u40e8hki58urgujlp4gc44oxhltvurwgu4rn6hl44nmsdik6xk7knd1fnooazlc2kttge12h3oo9ij5gq4en7sstwbubbf4flk4ea7uh6ouoanhe3vhjdc3lduerouye6x1q0zpsc5irhh5pfsjouxhvig0rre2ccy2mg6qqlg0dpji071t56160va6wqqq2ehb52scj9uwn9871lk5i8c2v02r16qs95a8oq81r8dxtstwsg982bg8ippaw534dvd0zby7ulxn0osv1felgihcy59r10sw4n1fjdw1l2b4m5to4dmnq7vpit2kgyzso06rjr7myt9lax6wjemgmdj2a5o87xi1rs9n15xjd8b1ccngecmunq3i7dicd9yg2595hwf5pocox5ydvdyz6a9hzx2603u53crl47l9fmyuxr3n3wi0g24dgicc218r0g73imbxrbuc725v52v4qch00gqavnc6l036w6dy0mdcjqo0g1ogs7348snl1baing9835hgvh9r9ctq7j32n7jnbb4o5ylul5yhtnm43m6kplcnj12ugmo769gc0wsgj1k3d5pacoeaakizvmjgaf79ieyjqg6xvqtltlnoy7i1mv0dumj3y58x',
                proxyHost: 'bt91swxcbhuja6orzkdq921dxzc3hp0gfumua3xtwtpbueyqt1cg3kf792oh',
                proxyPort: 4112844548,
                destination: '6zwz9l9pfr34mw33fjv0tb6orrpnu5f8litc97kpty8v99z57zjffce0rw8f59ip2db3fpysl0wlqyhrtu1qp2iu934045joly130ght3tj64xafo7znlr7ossvlycjdp8byq2rd9h3sd73w5x1myfeqe0h5knz6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hj1cgfyw4q6fnrhfe050w6su8lm2l7yfitom93oavty5st4fvrv8djs1nyrugaiq4e7cblyy8wol0ohtnjq8jwpem2ht08v308w0owry72fqv418a4cql8tejxqs9jiin2mggtdoj2l0uce0aeaqe9w3x5ue2ffq',
                responsibleUserAccountName: 'izdruftwx219m7ysblpl',
                lastChangeUserAccount: 'dbwz2fgi06umlujz7c8i',
                lastChangedAt: '2020-07-29 23:56:48',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'poeri4lbtlss09tfwl1ea69aiacixsrzedoki7yk',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '8gdczwj8xyum3x3bnvtfj3hiz27b0vci5dufkg5q1k53y0chjc',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'loiy4d606d5ds5mgozwf',
                party: 'obqrvpx0vsj6zk33otgpgf1286akbxmogtzt9sd6zk37tmp7upa7tvivkpdz37blwvmvrtr6tfckxmd8totlagvgunrtddn6febmsew0cq0k9kuu0xlnjtwsddwfoi0pgi7ly7w9bwe5vc30ta3wpiiyq7qfm0ma',
                component: 'w5gftfcn7zyvg38gnyvgi0iz2sx9cmhf0ztu6ydyt8f0c18d0vy7p1g336e741ifqkw07r29lnct198g9eq9mq56h0eed82n9nbebn6alq4r1qv95smbpbbjz431om7a4dr8a8dw7lb7lc3pc26clwl4gob7vltf',
                name: 'r00la5gaf2zwi61sloqo518s8b1c861elb0ktk62fxiar336u902537fy9pjci14fawr71vsbbt4d8vtoikk1qdry9xh5iwf0y77g2ovehjeg1b4ie99zfvzdf99zqp4ntdzvca9z3wlbdqpdfe4x1dz81fvftbx',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'grvy8012xp5c45deoewk5ne1f8etzo4or1x99y5cp82l068b7o7qlfqndypxcqn7gmbpd5pik38qs9kbeglo18zz55jz1fvw3km72mjdqd0fbrvt56gbryetdxery70x7uib1gcpqwhqcqxmn3omuhvez7eq7sf7',
                flowComponent: '9i0oof1qv7uxqr57zdtz2edgg60vrs2rcl0n2naombemy8rl52tia46smcci6k24yupiesfu6k6ehzv7q2357fzgf80o50989awdz8e2pg8m896am2g90hg4kilq7ej9ltx87n6sogcwqzvhbdv6dsi0dynvawuv',
                flowInterfaceName: 'pyuil87nhxgfgdkkpq8ysca5tceuxsicmo484i33ueyntgtx4151p9j7r4m5pclzj2wo008rcm5c1xfyjdp7sv5lmrpajwvrpdwzw3in4ldwiakadicn5viwh2h9gkkbnd8nkcwd052o193ewhoca4pteo9b41r6',
                flowInterfaceNamespace: 'nu5lo55jkylx3ci69wodwu9v3ch2wamvau7g7h2w22xi6yl8b0herkc5u59ulgy3wid8q15g0oe00yilegwt6zeg9mq74oucrhtbruzxx64eogr6jhkfkymyl60476j6bpymdbs3cuvi3x22g19gxfluffcfy845',
                version: '0fsoc0truzsme5up0ie6',
                adapterType: 'evooxs1d1oyn3dj48d5v1ou0s2an0bi294xj7we56oyoxhelnp3bs3l8ym85',
                direction: 'SENDER',
                transportProtocol: 'zef4iz6b2zf1l3tpr22fbi4vz682l34f7l86ilzhj591w4g6btclzx7i8e02',
                messageProtocol: 'sbsao9t3re8pqfphxe71jjt5v3g913o7x04d1wocpptc2uylphlumw1srgmd',
                adapterEngineName: '7dxrwbgg65hedu6xzvbc30j8rsvc2myk886pka54x4ir0cywyntci6awa9ihv22xotbs2dadv3nhlemfjbub97rhaoidz0r68j1cx79ghk9rwxe31ao08itxorcf2orr0s9e5zoqni0b45jrru1ys5xbkye2e4bo',
                url: 'e5rdl57adfkmetn0sxwqeh95wut3ucnav7k62mnx8v5bcpqmtrenc02ztogfz7450cq28820vgzc1x6tyta67yhcxwgl46528lpmo3l4y5e3eo5cnar2m88j3ft8vfpe6r69yamyt6w2txp4abx3lbzdd6k2etp91ra55ruqnak71g5wye343ogwx1vzwq2h1ua30h15vo86ne4hrupabf6m2ryhcdc58zchyiqgbf43eq9p8ywfusauyf77cybt1h2agfjahnv2rq4h3ypv9805jxw9c3fp0ayxpdh8c6qatpbg471tqvnbob2iv2kt',
                username: '0sx8a57vfg7xqlymw1tv3zwehztc23w9ej6y070s6d4j2u907jz1zb0nrgz9',
                remoteHost: 'h412wi7og7mc0eqzmru1zve44hgkjfpwnk8pvz9bcltn3ztt3uqjx80eyjkttw4pzjq5996kr9v60whm2u88b5j1mrz0z4mnbx9aww384gcvmzcaxg0vgjs1fdnqwsdbwrdgktnm1tb3jfqhdo0pv1glsq5h6s6e0',
                remotePort: 6362765472,
                directory: 'fagcqs9n88q27ud2dkjer4n1jcjm5pduorbgonj3skn9gzeq9rw8uv436tdxbigr4o6k5nb5zlxgokdr4k68s95lvmpe5aut3xdw2vviydqf4zv6fzj3i084zmj5s9d4e0edgydw3dinsl433de4th6gp3l9hdykfcr6bzg1do5zyhe3f8m1pbceg6cc8ytgqteyc1aqpxb7l3ii2hr2tyaxtq7c3bx4ob9fqr28rahqsntz6uwn8oloe0jaag62jh37w84em1hdiicui7k8cy0cz6bjhj38agj4spnambc1r4bg8pge6dtqrf8qu2b6f36l0yv8jt2q485wb9b3z7w5hfem5o3727vhw6ajdreafhmzilsccactpa8n1w347u63czp5qcmul1zshwkv2koxskr3x9aebkjzb5hfnlk8t4jczxsnb5gsas2oew25fnmhex8rvhn67ywojs09qx8df2fk978jibtqa2hxw098386t0u73kvok4lh0zi06sirg6lqzhki00s978ltv6287n1x5s954bulscnboxb5c72ier0lennhv8fhfihji9x00srhbu3q6x53r5g0m7e4w3wrq49wuf1j029ix0a8yu2wflszmgwd42ldj5wn1aqk6m079mqflmlad93j6rulhytjk630atnghkblwthmmihfr9gcm048ttpl47noik5s27vrqe681ufrbwy0zrek6m2jzfq8yi8f8r2y4aomjdi6fdwc2ectjup50y2cpr6y8iof44tlwegbtnu2hcl8t51t4iz9f57mz10ur9fadyed5uttbt8mieanhoh07qh89yj8solklw9tvn3d64zwvm5xkjgvplvag4rbnjqnt611u93gf1spez7870sq8lbc3k9acq5x7aso5oi9virkno1dao7pomsyerb2j9mh8575dhvcfwvqj8ezaplpigjb2632j9opywg8b5o514nbb66d4xwrsblz2o6gjn5umb7w3qmnij8sy2vfme2c1',
                fileSchema: '7rj9eg0faj2ce4pry7cvyhm6g11jdae5xs3r9np32cznilik1ehh0nhzzmmckawgaj2zfkj6yh15t3c0zyc378pa8uo6jsagkf1zkdj5m9n8itv6yj6ri08eu3tps9g3io5nzbcz4br868mtf9j7jiz0k0kxdbh5c2chwp1f2k5wvoh5qd24gdio5wrbjg4qnbgzusthtujemm68omkl7zpzw3vm0b043ejkg1a5lyyjkd5nv4rsubw89kmr02ego6bnfhnoak1848fhwcritiamyzx7u9uhepofl5pr3sb63s0w9m8fyiywumbbl7572v4aw1lusr0k5zqexzau5rg8ugpkictuqtdk0lszge6wp58cfvgq22kfa3c4iw34j1xdnqtafpllhb4pad4gi17sr64be1xby75xhyluixbyqh1jhtmepr1rqtixo5c1ns3mrw4gxbbdzg9eeqtovg93ene844g4bqootsxj6rwims7zd1ohi74p974mew1mdu24q02iqzs04iuan1wapr8isxe7k6sl14pg3xx1my90nou2ll71p37za55vznjwf94188b3uur6dx8fhlmvsvuiljyxw7pev4j3a9927q219gq2qmtunn59z0e3wzrv61fg98t13iq6avi2gauok7tm6xoctddvr8nqq60q3i1c1e1lro4g4l6ak7bu4732uv1loyu1owxoxpwo09juekgfdtwp26rxdgputuxbbr9axrnww0zo5yttlozsxdcl4gd6se3aajmndwyfxnnjzu0q4ez1c0bai6ka3ebutb06ov875pa39ic8ffqqln7yeipc9v13ugfhyrxn7c4opkovenu4d22uuyuglm6qio46g9ea6mo1i6velp6i7ro9jca2gdd51ikssqfhwmx1esegrbuh28tvdq2usq5m0svh2msvzcaws6alagjws2ieezw93s6bd1l68iof5kvxg38b9qme74c9065b1zuhvrxx8i2nvwb6hri6ubmdh3n0',
                proxyHost: 'ln9xr665k3eln0fqftky13396zejuounu6jlto5l4e0byzm90to4bil1okn5',
                proxyPort: 1488128493,
                destination: '9mo5857zwz8f2u4n671b34dd2kuckxx35z2dg4derxezwhz8fnador7n76e057n3jqsncu5jxkppkccr5e3ze19j3ex3ibpd1py9aknyyptuhussx0efos4tvl1pba26sklvltoqiu4a5074q2jd687xqi0t7m43',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '61oozrvaesxhysjweirh2kcrxkbpx7uj17gjnki2z7culxkgsupcbdfjhbgh5bqm86ty89g3nf1vafme0c2le8mk2h5rj5bsbul61kpf8zqp2p8ucs8ss0tnnr7w33g2pwx3djy3o4ocr11e8qhfvm3c8ec1hk3f',
                responsibleUserAccountName: 'gwvsaoeekfcai76sumyz',
                lastChangeUserAccount: 'kc096j3fbjhyhzgdpv8e',
                lastChangedAt: '2020-07-29 17:32:19',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'lndogewxo94runs8t2kf7zeaoyzvg9ev8likbtvx',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'lrhbvpstn9as5b188e5bo2fhhdtvu76pma5bbtyvdt9wu6gnpf',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'lnjhkp960xzx9l6yajle',
                party: 'h7qhlbvxy1cyzy6w15rot0m7sveiqrxiiqi0an8vl2cepbsbpcz2ym784py7tbfjwki96aep60ag3qho2kahmpbx4lvuzy2cwibhx98c4xnnd3on2p6goa0k1k8nibgzqkhsocczpve5cqyrle6jj5n51mcyespy',
                component: 'z5r0nlyy0emijctgr0kw51ihmkni7nnlbm1ee3k4vutste30qeg0ti6surkqx8mi3ukrjqgzgr5da5xwbvf23c33sabjss7iyl7z323fkjt13lqo604hfmf05n3rzpl7c447wg6t2k0gomry0wns4fho50soa9f2',
                name: 'lfv00nj8ey4x1xa311146q5i5avuu8h5082yh9tjynr5vld7vdz71q9y4hez6wjkz9s4ak736g1i3i9r45xye0fe3dn819rn89kut3pm4w89ghceq1s1t49fkg5vssakqt6u55cx2mig2weavh5o6s3bj2368ynf',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '5vb7bbp5e0fl7evy7trz43zi2tiy4amrob76bep63s0lh805whyvy8py1ygyiwoowxd23gjsnuxtdyl5av75qipom86su1zxzt4dir4hefnu12w2plha0zg23zrjxiojww4tlxl1xd4qogdoj4m4ofqc1jp4wj60',
                flowComponent: '4sc7i2keepznzipjdtipr863ky005mycnwf57umjt4pwv5ezvb80t4lbst2usmkhtxtdbof6akiizu8vxyelybbs58wzzd5711op6ebvomhcl5xuw24ov3wjyb06f35mipygogekv2x8hw51yhrn7537enk8qw4j',
                flowInterfaceName: 's4rqpk5fuxgew7d0y82sqjc0k6bbz5jw3r6i51s92dxl8rbpl4u9wdqfc642e3pqkvkuowyyjaao3mktx3xoqz0s6gz15v2bidd5d9jy4uzqf61aqu4kghku8fbk3akuaurbeg6qp0d594fu0vxong3ish6gd9rx',
                flowInterfaceNamespace: '9ipd3hx1crqyhazw4psvyzo7dntd8s2sd0h78h7rpv1jgo9jbrsp5lgdgijfn7qxa0sufg85hcf6i0je1qqrf997v7u0m0jer95i5spahd059uqf0n5k4o24ucbip71zm2pnzzclvl1jo3wwtxcet08cp4hn4a2k',
                version: 'ukgkiaqg3vluc973rmrn',
                adapterType: 'svxu0tjrh0kqyg7hr77c3x9pjsvltcvlj71zus78wluphcknqet886gpw3ub',
                direction: 'SENDER',
                transportProtocol: 'pl0sn3783qttlgqqwmi52iplprxfkz47t3vsbl4x8t8oza7pivdd9g4uohn8',
                messageProtocol: 'zz4mi616recf6817qzwdviddataqxltkf42b1mkh04teuhpyrcjl3qnuw8hi',
                adapterEngineName: 'flw1bsuq8swtrgxth1cw7yy2090ncjqojq9xkw9c0wntnpggp3pjdskuknx1392vs7rl8qum69azjzi7rgdktcleqviikyu2g70590g1oskfprx3muxkx11tu80nasm5p8qrgz18gzijdemlyvmpaxqp35f2uid9',
                url: 't11m2e5k9rtj0231k5kmsxmn3pqcyd7aledt4so0cpj0lv5xef2tdqf3e4ex55xo3qp31pdom33rw2pzoj7zr42x3ae9ic73vn2jo92x83yapnqzawp2dise4646b1x8709zafi1hb979uu1xtd9n2z8nnb8kxcied19j334ltk1uiol2dztde2tzsivtdauyrb50c8mx28gsghwq5pobq3juctczx6293rwu6wjyrh6b1492bo4pq28n93954kxj4j61js4gdbwv6zlw1wywvi3rd6h8vubvy2ntvrfasgyz5au2nscro8iv3ngo0pl',
                username: 'nbu039axd5vf18fg1v4jhftvb8ej5z431l5f307zlbus7q7fqbwooa0tiqin',
                remoteHost: 'ufupczpgubp5jslek69bp3n8czdlvt7l834pe9cfvj5hbz1ch2cnvbxpuq2tw5qnidqayiqkqvo6kx6qsfd90ds3k9fk7q61crordr5xv6q403zim4q4de66n2b9y39s082tqet016es7kzs6apam6poh7w9g2jf',
                remotePort: 13261392631,
                directory: 'hv7fbwbduqi5ys5hdnid1t9e6g8jim7aroe5lif99brkpswzy1ovzsau7hji3szqo8vgjomaw91uhcxo7933ld67r51l5w6w68alc6728u6skpp07sobql8xtobf4uydwougkdh9weewr1fzqka3y710gym5v9qh965a7lzmhgqy0hwt0vcuea7vc0wnzbuf7dm93vgvefp91k60vpa1cjg7wjyeaa3iqyzqgqctmbysyo7p6m51w32fghsae4kf0rtnt24kr2ny89dpq4ufc4jy5hcn36tgxf0r7utr03l3bm8monq2qnhwq8mbou4dg9nz19rbuecfb90kdvgvwflooui14694basc2r3mjbplc76yp318y077erngzuvbg1jv8mbgn0w2x39uefqjq2elllydrnr3y1y3o083kavni0e3z2k0s99m8ngqg42z94x0shmw39d1xqdc8bf8j8pa0cva1ruyqn3ukwoayj24yore17uppr9bflxig09bxi21ee2qrtx8umcohf21rzbhwnoc62d3jetbj0z7cfsz1b8qsgv1van6lduiftxy4zckoq3vnwy8pua6h1bkwxk1634yqsokfu2p2ebxaovd9u75373soz4lpb7h1fkgcqzb4cdosdl1j1lgsee1vswqif2zo46brmy5y3wid16konh23nvu7d75aiv65gdncd4kcc9sq7xf7xfl9zeylvlepyehp3mub2ooe6kanqo85j05g0rhc21gpx6n593oodnbpnju2ssw2s2zz6pc035xay8ds8rx23b1065xeb7ujk8cbjgwtc2uti5vtzxmrsmptbuk8prawezrq8ywyvq62xx0g3d8dnfzorkakjveh1habftd7bsr8bdbarlfl1gkirm3s17yw1qe61d1k7vibs4wx6y3gil2tqq0ukf9asbsdistt0c5krvqwmovnr7z7q9u78mszoufbp0xukobo8iy548l7gracgrzs3oqa4v8tp9gjiwvumhlt3uk',
                fileSchema: 'ccj7y36q6540vazvmzxnw2hb22si18obml0a5q5ha9gs8oiuxcjlgjyyj4tbr1zxs46ytok2hn33cbcx3gnkpaas0u3onf2la4qqtlkb42do9c3ehm78ufbo78c3m1rncctuvk3hjalkwgu3vonqap0smj30z1wb2qsahuphd5rjb6b9rgqkc077dgxnxes8jphpz0p0t3wkhyry7e96afo214ayernshrjmpdnsvqf3hxczn6ktzz2ietvjmowabhs40df9ulk9f9bbj83q8r9hlzd4czg6jvipst5jbm1m340z1d6jfkd0xzo3src5hpp6dsgwdnf3xfzgt6ppxxglpgxdq9oldqyjr5ga6h2gguuzghvm2lwgsukha5cl9wsave5f7dqy4g5l2msse8d1ajdij7d7m1yokosjwyxfb4to8ginewccmcugfsgekhusju0sfalyujnw178pw40lrd66uxgfodm5dk5trrl5gx66z43qn67ngj0akvequd28n6yknkm7wbb1xuohpu73bdeivxmlrqcjh02e6vk0pvd2xmhk4qlgggbj1pwp62ivxlsqr0jnosc71r4f4atpc2waelwarycb2z7ggx6de52gdcdrpgblpifwu870z0ya76sxanqw7r9p2mcg61be2jauhojsap7b3pzr9ymwoueyjpx7gh7hbdpkt98rs510bb8el9zhjbldf913amvok479ql61jgqq9shcsix5oblkxyiyurhyjqqoaruf5jibkbjdl04tegyyaf2io726hgps8i9i13wiqoan08kkg1h9rm0i4p3tq33fne6d8hjdhagsrdmz7ynxh7m38v1v4xe7l9e4s80ypd6a0sm04gzdfcdpqubng6zg2agpeul0snfbz90fdug4unbid45fppii8sqlo0oi04yx65afb0m60raeqlcj93nax8z7df2tid0zb8wacuago3xw9532d81g8pu4ho7jtyylw085un1f5jr9kjipc2bsp1e5',
                proxyHost: 'qxf538u868bcpgakrz2rbhoqfssul58lz63ig8fg9mkkgunb1vlqxrmgowxw',
                proxyPort: 8327311185,
                destination: '6dqbjbqx1iko3lc94uh20rxervdytxg9axowmkzjoibirnc4u75q472scahi7ex1xyhfjo3k38uetz2c4efqzoze5p40fadwfigb6ywhh0bqcfzco7leo9v8lua59zablzpy004agqcpk92nt8tpgqbdmt7mjdtb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tx7njp77jodfdbn6gop1z65zbho5bfmdmireakhsbggvhztykdc1jnxbxor7mu4e8q7j13zthod7ar0oudxfl266t2nd8f64rwwa9ylv7xhll9ubu287hfj3z0hbao53lzxx0j0g7vf00a9p8y8n9zum6qgwx8wi',
                responsibleUserAccountName: '56bxm114a3kx74akbxyc',
                lastChangeUserAccount: '94a0xsvm41crd1vkim08',
                lastChangedAt: '2020-07-29 08:51:18',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'z6i5wfh0bgmovxh52seaqboypo28rst0x1xnju3p',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'ypotctjfij3r59y5zczkqffgrtzx9v04hw53fxdtqbllojnmmv',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'l3hhv25ax2bmdcz9npi1',
                party: 'p5jkkjtdbdju879cnr3mrf7i1qiu5kq33gl4m178kl7cispm1lhchyl9fnn1z67jc1ktp39zg5xj19f03ol5p7p7wyndijhu778fps3fl1hn1l5obicz5ywfamonw44iwv198wg3jkjuzmfdkitytqy7updorucm',
                component: '9mqh32ggglhwi5jvg0fxp7u2yyqfrjjgk05877iw6dhgk6u3ys7nin9gdom6xqc5z3e5fu2aza419j7xhy9yoyspx5qbr07u4qq7fp8q0tgwqjepd43ixc9e82o1g94eezxpuvjtiqzummijpwcschf79r51dlix',
                name: 'llcxuf1brp8pjvhlgdwfq5q8hey0fdkpfbpnd7ug0tjqomorfuassk5ec36wc3p252sd5dsfjtks7mk3mt80igpmc6v12c9i8hxfvbqif6ewj76q4245pdz9flmcmsqmxnxm8d5zgvatse4bq2ly5t7jc685gxzb',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'c32ljms70fdqgv5ks6au6icrzutayr6ys5t4gyfnctd18lin0myzbpf6uoxr7nsmvvmzaod62s6tt57btp8g78yyv1kkhe2n4pqh4pj74vu11zhm3uq5m2vepdtqv0qqj87wqhwwn5cxy00r4tc0olu1dj8vv2p5',
                flowComponent: '0nr40dpp9jaiey05kobz52lb39x7z6y7ehg5tmm5ei4vp6ii5hje7rmspeec3nbclisc8rqvzyslmzus49t3f6tzue1s2t53mxi5pnnm8xk2plfcpmhbb3i5pe0bs6huf6umawx2w402qzcmnbvk1ric75ntocdg',
                flowInterfaceName: 'aar6mqv4o76hlt2nxd4m3w56zb4ol77266gsm32wdvf71e1o5nh3qksqz2nd8lm642qm13bc3hu3qvyuzkoat388ga6pcnozuhqukplfgtln37gx7k7t8t1y7cx6v9j3i5jb7q4e5u2t5k9tq24aqw7hh1e4kzqb',
                flowInterfaceNamespace: 'jxgf34hyt4t78ebilalxvrfcmy88e9w5blsgobnjvj65s06yuc46hz0ho46z3wl9zs8q3kizuyi7s45mgtp5qx4xn4jnuuisa6iflavoga0e5d47s7c1fgzreqg1usbwg633vzr5j44s3cgpj077gx4bi0dizxk4',
                version: 'z1nt17defozzwf8ysf3v',
                adapterType: '6ev2ro5lnonhcvhi7ypt9hnpnzdh181ptwxss1cdg426maecntknbj7gn9if',
                direction: 'RECEIVER',
                transportProtocol: 'g45cqfsfziwj2mrg3fo3628smi7ednbpv0uhhlfz1y48fw8mmgdlf5v9mtba',
                messageProtocol: 'vb4r2rzkfvyghvejg0ybph5a5zpxvaucc8wyydrbvq43g8ee5rzg887beqmt',
                adapterEngineName: 'h969qdil889pg2pge7oqiz04uxhygygm415mgo4q527a73gwhc2k5tba54w60dohmgngn6w3do14ploeoroawin70kko6gc3f9lvktktklxh8fjulw4003g97vhbgy61selg2482qs0mjftfxal7ipna6c5igl0a',
                url: 'wd1ol9e8axt3almewm2le07n6mdw6ou7kgb5cdmw1bs2zs7j3dr57rho5vs318w3o2qymohbjcw2nenaxhs3ghxww3a8i472g8x02biwvudp7j49d1cs7i9hls9uctchkz2k72wkw14d9l1y544vgnfmacv4ycyvfkou4tpo4xo38wmv2qhhv5z5u0pre8dsjqv9r5cbs6ekf74s0zp3kssdw47s3pw2n9pz68ri6v1zfa9d57luuqnew0wk1v743y8ngyfohrwkx4sskdb73l8cv0gimkw8p7313x0w56cd0h9h8i1001u49qjgjg1v',
                username: '4l6prikm6nm88uat4f0vrb6a1ps0ga0sue18caddibdv7cf4m7yr4njalo6f',
                remoteHost: 'n7ptp02lptnwohxmth1f17e52nwb6wiko9zg75d1zv29kl40aujz0s0wzglnjt3r5zu4xel6l8nqglglp9yy41ucib7bbrw8482rucxcl7mex1cjds6sqqc9ads3z7jcnkbq5pzixgiffi0fxpgn38m41q5bmwzu',
                remotePort: 2095070995,
                directory: 'w4pdlzxkmd55ljc7o8krmbacxhpn20mqdor9gxd0mubq1mi8346rywjvuwze8lr7vndwy4766kkx0l8q4elsmexlk3tjr3ep78etw79d3wroz76r6uo6i1vi8dlztve4xjfb3t3tgbnizgp9t58i02yvjsd0stlk9zwzzqagqzt1ktb8cqkk3gm92inzwd7bvk169ovhj5tmjd3qzbmbfw5m2z9kid5y6xmsj9fviz2jir10gjwoxeya67bn3p9g2nd6bdbzawv18qke5ddbr3uf4kkqbs02cgqbtdprsib5l89l10ob1p72dadrmt9hye7vc5ay4doja8ky00w2kqxtpzgx46w4rpakjnjurz6npd7e1cg140zjb9kkqu09colx8l4megh2c8oiorzsaksm92hq1xim65ltk701r5f6u9hnajvb3yb39to0r5h8psauh05t1hea63w83ch5dtevdb0s5r6ohnbb851rla59esaswouwxksl4vwcknr9mpzcscrmdybhd7j7473hbith2degaghx3yz2i4gi83s62a43joespjsnrl9ygx3uhlako4617gqa7cm9jodbut8hz787yg7cu0bog9tvnxkea2kpsjn7oouicvi1ikj4jb5gxyz3urbiwfkoa62vd22fqnnbqklwcel1w1vgdd9zwhgtyn9prv490dvvygu4edhqdudwbjwxeqxz05768lwq9ke3oog6zjsf2sz5cddhngabnwhwpk7zqumti55b1snjb88bkc2wazpbv23rcdfbh5sg2km7ridusqpf1jerubkbw3lpqlbfie00ev6pos9xhqo0c7eo568tqukczekct7qguiuv08v7tgs9tqobvkk4kdhrv1pmw552c2jdwoss6tea91tsjqo2ikbiioadyu0d1q63a3hmci95n0ch0dajxxezzr2a14ssoj7oow7e9qnqojkyqbac90f2tn982629mkenivuydxmdhbgredq9pmamxjmip4fi38o8h',
                fileSchema: 'l9492scamxmgjmtcyykw1sq03e383q2kds6v8twm2ai06stgofmk7tpl888uy0zsxysc2wt8pr1qk7q8admdlvwx7il5wbsnt1bkx8afa8m200fd79vano0p9tbbbc31jd7n1gs3ffhbopvqbit7f8znulcsxrdabbb9pos1uxtploj7sszu6fvsdi1s43821zo8r86u2i1irk4qkr8wv5wc5th7msv6p0nj0edix9aj9t2b39fqauvkgkyn3xowr6u5kai5hj1wi3dn1fqmnqweb3uhy3g6e09r88x5r528i7mszfelpwixxw4gmra8xp9425at4c6ioywfhy97ncgf8omir0pzsw3vqvrp7uy6ra8g1le2wyt5ss29tpx0q0v60xk81uqyrxuh3dwquvjtkqqbs9n5z7hin3ffjw41q48u6vlvhh3ij2yvlbx3wzu0r3yemrapqjudtbev6xx0hjmo64k34kf3q2ujt3j3rbd2osj06837khig5aaauw55wb6cnw1n3mnm5cw0soo0t281su2hbm4hxnp1pxnoowessc7rawujd3jbobhlkds8p4iglqp9yrsd79j4mp3qbl7raqt68matel9gx5bd9p14pm4t8dv1do0krghwyx6r8h2i9bg2xvyf2x9ei9ook4fogt9j60iok4fxowpi1z64vuots1pc1g127jgxl37e9yfu82sbgs9q2i4sl4ivnfidcxvwggypf202xjq9hlbjyxka5erpxe38tzb9h378dl93o5o5gjk14k1hgs38fi1plmja5fsb64lnpz1ugjn9fzo5r2up6xtl6g0rnty34hhxr6alesw7ey1g7dz57txpnswgimvbkv4depf9egt1rpab70lw21qf9mv38txye6erzolrmemwwkf7rxuwvecznjdnj4bwvss60allp1d2x91fnhfk9dmrim3f2a81vlhms798bl72vi4tt9ccd9yolbvqe1lzmwt6grq6eg8iuq9pglz60lni53qf',
                proxyHost: 'cpe4hg8b3n7odb6far3t1e47ktc7lu7sp3l6meh74il29r5nhonax2kml3z1',
                proxyPort: 3947691457,
                destination: '76sdweholopmzbecxqz9gy88aam8sf8o7uun93mk4a2dzovdova75sua8otb4i2l3zdtofyjnd18wf9l47blcv1kello44s1so0a2sd18qe71vphiyfe2c51xttwpfqn391zruvc0xbu2ncc4koqc83jhfeu9utd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oofffyljh3z0nw7dk1uevzjd8sb7ttwabc1fp2sqbux1kx80kanljgnfs87g09legqpiihz7xlpdaik5gr6qea97mat6h82341ceqqc50xa7zgfrh8ldiu4pfftvgqw299e32j0ha7do3kf8b7qjqwz3ma7eeecq',
                responsibleUserAccountName: 'ru2ufwv92hwwrc4f0nkk',
                lastChangeUserAccount: 'mxt607hq0odjhb1zy3og',
                lastChangedAt: '2020-07-30 02:12:49',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '49z538hn9r84xjmdbpll6obrfbhpf8sbcgcpx8aj',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '2gcmelz24vjw74k3z08d908w4rh816sbjnsdek91fxtatu5ewk',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'pv9edjrh6k81vsidqebb',
                party: 't75hs3956dbrfd0e2q4wmp4n6eiknk91aqzbsu73xszufmxdzlkigjml7fh6ikt5cg4i6aj6it4nvxdu7lzcrj54ehqpl90n1q1pqxiuryo31xrt5cf1lm773y2hd33j7cz37mww3fvpzsiuqnouw6ivtyur4qbn',
                component: '4oat42vvu7cmdif1p1vc93hc76le42tvtw66pnqjga580xhzj5jhg9as3f2jglbrefqomorsbjs8s6wbay1ftbb1pw00tl2h9d5pdmx7ysswy8x8zw9hqdksuichwc2k7nqr8v6rdbj7whwgr2f0razfdvtzanmo',
                name: 'lddedhd3bztm5dxylvvgser6hp341yh4qnoi5uscj66tbq2rd635qs8v9ml0cmyk4pn5fpezv84oc5na0tnk2kvsa0cx8ic6u3uenxuix17fnbw6xv0dhv8986fwj279f2lndtbsew1r5yfhbrasle2tzfpnfp5l',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '5ncabaki04yeqfbf56h1w07xq3x16zu9x6m9ulsbn3jyeoh03hk90x8lp5u5mvelgok1fxpileqv3tgj998oeukcwyoz9f9kx46s7onm1i2749f2xy8mpebnggu6tuswpqugdzcn420tenkhkadx062w4no8uwdk',
                flowComponent: 'jbzpz8uen3bu2itg31xu7ggalo1tk9aq7udb3jqkp92k9zc9r397pl071kergabl42p6hkkv101dlgitj4za3utbcm54xnxydjm1fv3ox5w476sy5d2g8r0azb3twxxf51oak8p3snc2tc4i05abyspevd29dabc',
                flowInterfaceName: 'd2dt4xmkwu2hf4bs8ggrkbyexr4ml1hl6m50dspmwcrcy1d8i5831u9dox49780n3gyjursdkcoluz99hpmuqbablvayuavbn7aqhrac4xn3fawbciikaay9xy2ylkj0irwdan58k346avj5mrk2jxqr1b6dmaza',
                flowInterfaceNamespace: 'kkky57n0mfpq75cqlrrcdhre311uy3hle714m95k4jwyzm7mqovhr4rc3cywkiel2bv7wxilkwe4dfz0trj813m1q6r52cxudew23o694gnceyr9b6uzuozzm37rsjs7jlt50xll5fpd4v7iyc0mittvem44vtce',
                version: 'm211aqp1ixq7uplxnus0',
                adapterType: 'e4wjs295qw9l580e6n3wq2f2hm12snx0tzbv1g5u4ruxusohodxylq1f0zs7',
                direction: 'SENDER',
                transportProtocol: 'b0y8u4x14b0kge26gwqfv71szl2c8sb0raz3z2eclg8r4vdyisx3xydi45oe',
                messageProtocol: 'ry1pci5ij2d3dn9o8utbdrzcneu9wy5ncx9luos3hrnleerob3wwknx4ctzy',
                adapterEngineName: '1ogm0s30u7w9z5dw2uf61qzhunykup6spoap2likrg3jf39y8wot7pqhenwyomf5jwlj3il0noz7jy3679ltav03j9arh759y927nd3en9z3o72q62z3b42x22kk0z3868mrvttbuj5zd01jzxguds5qmnq2rsjx',
                url: 'h1ffi6syk4x0hgl68vrzj57fxtodalzzav71ondz1z02ujh82mgc7xyxyfi4jb1vnha1u75qb3e4tydq5msyrr9pktebgpx6xfia1ued88bd6z3ock90pmgs8106wg4otrc715vrqbi2ax1maukn22jor8atkfp0oiadegoax7qt8smw91luc5m8x4p6heldnxor2kbxirbeuezuyq5nwbo2wl1avgamx10l2k6cyeghpzpm7upgwg86aqm3s3jcdopmjy7chznlm2wxkmd6q7k2hsnx3nbksq3f2hebxttz0miy5m8mwl73acin8fkm',
                username: 'qeuonq2b04n0qv87n6xwsyuj2ntkv9ogvx5amdk2j4dv26ovkzd67fb81miy',
                remoteHost: '7onq714ojhhihxyawxrp3ty9cq17m8pn04naoq281k9kxov829z9vrnr1c7pub37o9tlr8ov7ebsolva4c93j0o227ydu0ha457g7180hwo9ywro2jcpzkh93bw81xfsv1wyjky5vx1q9b0w5gcdnjuzijfndr1e',
                remotePort: 9378156592,
                directory: '9cqn7tfw30vjbl72yio159vb27etk6s62zs7txhluwwhn7xz7zv6yzztblmg7zvdd5gjc2yb1fy3gz6ffop8qroyan87zzn7mctumm24rvn8e1glmdo4pdtcntsrol2secam9noaxy5v4s2d8fsegk8t4eemq64sbvv7zf9dpggfiefbz4q48lbf9z1vulsx6mlqvpj0ef2lwqagscq9e2lzc2978xx7mie5ey8pohxky2afcwtooarigu68973etnzbixavpu8i670l5a05qhf4tr2fkbium09k2pruy9fsto26onlmr1fx96b0n6o1zl81ip1qqrxrtr4fvqg2i3gbbxdx2w3i3d86mb9yziuz1apxddw8kjz68xqcg6eu4gmr7iymgxgh841qe72uk33f5bxa8s4wzgbnylock9t9yojh9nxzdhrmnsnptmm0n2q47rb2c1zxhpsiampbdkukt2rtxsortk0jrnc58ohpmft6po95igzoofjdrq3f3ou3ywcigxk5dkelga93p9et01o9qa6p07gajqgbsn6h5wl452qym0vdvsqwkor3wqbsf385z4x9a56ko15znrteyvqc824qvs8001sff6sdtzcoeas5w3dje2j7iia2nmpefv507s1330k4xq550zbxxms4v0dvp1yyaysgkj0kcrm957cdygsgdo91gevjh5mpfcrrem807jy4782k9x9tzuy4mphuhitaehn85021xtklqr3cnbruw7a4ofro4ys2otdttax4w8yn2p8zfcubsusent5etf2kadru93vpq7i36gl5qggayq5r9tf96xl0feiawg0gxu1psjkyoyhgj37gea3egfztlbsnqe89a7mudhcfss8zdq10i395iykz3z7qevn9tz4y2n169b6mgwvrcqdq8w2rwyu9446cydl59vrg687bb06213n8uqt90dxwmekn0laf97gtwyouwsboo6rxgpamue8hphb5ob17tla7bg5v07lo5aav',
                fileSchema: '2vuoamfyrqjgo7tzxgg6azph7l3ihgijq9vp4twoj1r1n7wdfdoil176o1e19j5vw3y3n2299ruaf0dnet04c7wcxm922u4bm2ljppmx7zn2ekp4c48okqffhyvemb7iatl3tafescjh5vesfuobaes6iqnqgb64cjchfnhnx94lbw8614fr28a4h34hlkfoxq3ul23ede4hko74lezkzvxmlrqjmauko2xf0btwov8kjqnn2490ykb1hh359mnvmovhtcpsg16sphlfbykdgq128bdpkwv6zug9ydjpvk453472lat9unkf8rxr2km939rgpmhv4h5oqismqkcnuy1bvaau01dy49bl2bo2mzr02n6pl45cqup6kvnp8w3itb1cq5r4lcvvvuupjcnqlfpwun05fm63s810maoh5fa4n0c6yzxtimk34y74nr86u0woznzwz3d1whvhv404086zqqr94bb13zy7g9j4d4xam0uwxym2l1ourwxqf7fywn78l09nir4d2z6tad3i8wek1yg84bacge6xkk9uhjr3igqsy9ajh21g0njnl653fz5gb3oi3q394si3wief61r6c25pfie1dp7c6rw3sgdqbk7aby2rc112nltxsvh2owbo0096vpemlil74ltq27nrf0fmw1wqoyxmhoq2zzuqspkokmloog6ouuyk58b4gynv6ra294ha0zr431bmles4d2jq02mqt3hwafgmc6qkxv89cz6fhlc5cppe8xupch526xe80vlp82lfzr0ri9jov5ka65fjkgu1yfo6hco9k26cjjr21ocfkjyxtf215pj7uxswlhj9ky1xd6zk1qh02n9t53gk1f18i6fbnhzszqd3nckn7l3nxigl248lsnt4cr91jy81c0fkaxc4aszzb6wwepwtzyn9h7bd9rwa3hq5j1p5j1bdzlb96ocwfxj2e1fmpphj2shoq8ij03rtyd5ve3dn9g9wtd3nwyuohc6ji5wsgqx4nn8jtfvmo',
                proxyHost: 't3r10sf2axx6dmzp6edbb28zrpbdqlr9jd8au4zu55ocnt69wj5xgg000sg4',
                proxyPort: 7101133310,
                destination: 'lwikp8hqldn2rj2zfhhvvnc12djxfiaxmrxjkjsut7tlpc08f6w6hc2fb4ikxiopm5k5m65vx57nq7qr4h0u98xcb1tfxcfmxl52xthirjhtf0bkbfxuohtvixb8jm0mh3s0dhzkjsfkm2n2q2uzkr4hs1xu2xci',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rdubvc8ql9ig1lb8vsnkzclhryjki70tlzv2rhjmuo4zz35io59kfxw0w5syxgf3pr9h0y5sswhvbj8d63hu5qwle8zo82quf809mu0pt2f987udlvtcqyvopo1qvl682rk1jdbmg8jrme92uz0ezy3zvjm8vodk',
                responsibleUserAccountName: 'z7s2lwgrhuujfzictv8k',
                lastChangeUserAccount: 'q0951l8jk1l3neknwvys',
                lastChangedAt: '2020-07-30 00:24:39',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'yadvuijzuffyd8lccawptcambtp5a7ewkkalla4a',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '5iaexuidvpr46popzm7mn2lh3683d5b1hntnj9m4cr2cxakcik',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '096nxwlkxxbslc3o7ztx',
                party: '8ok87pgw2h3gu9s6a4dh1qst4j8so0u071kjybx2sa6fto7mrdwgonsqfe1blausuv02vxenxduia1m1qglu6i0kh3jh0yuogb4vrf6bo7ue5vjukjeqcoxvb5j6gy19eq9dm88lmd9wgprti9czdn209dc1t6xs',
                component: 'bo3y7t0dstjxd184imznhclh4z3m1jfltrecwk8f2c2srbcqqulqjuz3tigb7n3gmjbkbperv7hr87kbu56yulomktwp2tpr5nlnez5wu5twyo9nrs2wwhp9x3kwcmlo56ae8rfr1was8gvct2rrxiwgpb78h3ce',
                name: '9smnhfwg1vzn5f6dxh4aziuged5200gcf8v33vmu08oh5ihqvtyb7o1itijvsauaocj6ezibccp1j8q1qk84m72jvwic4k8o0ruaw8olunkd3p3i53rsdmthb6cr34jwwaj7w11ul4jeqycs40oett9scjahv126',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '9rlbu5lrt1doqcjszjqxp4ixgrn0xrzmmqzyqotqj8jwrsipn1epx1s1jz7jmhajwe1jjcbye0s0cwzt646f84juqe3xb98xh7vy73exr1gyl7mbeph1iilzzf2zkprztsvzdq0fb97o6xxowwtn0x1uw5fxfg5r',
                flowComponent: '59nf40wwqae3dslqr5ybzwxagicvxsm3bnwoyqv76wsvbi0c68epshdc5enotwur3v6h5xd9ifqyhhup4z8mzhp3upxg273dyw0pdk1z97tys4cdgek1ugdrafgq83psjc55kia8jib3r81q873g8vtre5xjumj1',
                flowInterfaceName: 'yzb2yaw05ul0sp1jtex4mwqi0p1jzdvvybgixeunsysdtl4xqyo9miunmlqw7wmlohaszwbt4ltu8i64tso4geovll8gwdytw30msug0smsmxg3hr5nyp1ljd68kksi44bhplch4odxkx1yowi3c66fdqpudvuav',
                flowInterfaceNamespace: 's3kt9eadvb21kolby8arvnmh0jamakdz3e4dw5r3cf2iecnnsqyvma8bko48edafqiqzcvbdp5sead0vclrqxi7pnsv3zntl1u6u5l60dj10tuqyehhcrzen39ezpt392bfq9oaz3iccoils9crg99by7fcjnzbz',
                version: 'xr06l254xgiarde1i331',
                adapterType: '6misomnkqtm7ntmra03whren91s90lg9gym0u7yx6d4iq8n1y85bclh57ola',
                direction: 'SENDER',
                transportProtocol: '68uijgmyrulygb1ef7r8dhlt25udaix2209lg74f2vrezzubzsy8uj50aehc',
                messageProtocol: 'zq65ih16lez2nip69n8lge1r1pr6xkpogtd5rt7xd8od5sa9ix93vzk9gy0g',
                adapterEngineName: 'xbwbudxpc7cfe35xp4ykdox01r63ptp9aggdr1nmjhzekwn2l3mw0goxz51d6kbbo42e5eg7jfvk8rghqayrmgvls2ltc0yglwujcx8hsnhece6tqp23v0sybaiexi0wi8e8jym83ol3b9mvwj2m81s30cjrdyuq',
                url: 'e01u6ap6maq377q0g7xloirttssipmoi3xoy8ohasw292s6flbnaho3a9wbfm4vbw627gcvf1nsut7nh8ja1r6b3l5pczoo87jtk7sd3t4dkw93gn9m5my3ekatporjctrigxnte5fp1e7elr3h6o96471z8qg9drp984t0gzpk7g1e9gdr9e4v5ieehenuust7kqyjs8hzna69r0rq0jhghfpe3m3xxjb8v8dpuk4dse4w0jfwgs7hhufwpo6mf2lrexr2zeft6tf6nlr7pwr3eu6us6qbsvuxgf6ixlpovot8lr9yu6qrddtkogjpp',
                username: '365mv5pk14h00g7bcpzr4ghzbr186p8onmce10u7k9q0arp9uxxg21x8c7e1',
                remoteHost: '1qrnclp2jbd74mahj6ajz43iwqghcoh7do23gr4kly72gjzwhae7ppazoybbu46cjr4cl010tfwxcezm1gchnocx19opdrh8g2027qp997927q5nhv8fa2tffz7a0hpys6dqujm2pscm4e92r37hxbp54cld1tmj',
                remotePort: 6404114687,
                directory: 'fvikyb3nzkzlyg03amxm999966ap1t44mtirp3i7503cttrqjpwnk0oy35cio7oj3tpyazzkhpce1dnep91kvtq4tijbydpo20dht4qclt68ew365ukkgzfs6is7nz4hspmqzrdlv18gvvpybdrq6efno3iowfbkhgqvbvd63yu6rznqnyd820ka05ls0991m8mk2n2fk4uchw76nsii2jjqqsnj43ohj5j6wcqaqhzmfm49bfwic7jhuff2gwdicz4orqcmmeb43ctkwzxm4506e6swc9y8ofx8ey1ft3wcko6myvl8sqyzgkb9iwff8aq8u26lb6nbwygf0k20lgp60njeq7ws45ufk4i1f1d69rt6twqb6au5gwsuoag80q57qvlfu6w7wtad4dziwxentg5skn0y73xcgcawtavztl2lurhkkhnwaxer54i7ejyio46fw4ht8kf4fgjwwl62fxytv2q6ztop3cyqzpbdosn0zzxxptpbuxf4pagxdfg4yrq7jmutot7me0w0yeo1kj1j4v5l1wmb9lhqo9geka754kj48gzyxlcmggeadc0ve0e8iaz1vwaqa41bua39q089pcz1bap6gcpfkoj73c02f36ruwpxaug56tsaderwwih037leluhpm5ykj06zwi47xrp5qf3bfyi01roc7ilj92qhhy94mhdbkgb18n7mnvr8j64id92eqtzys32pek70lmvjkf2ig8ksj9gf2o5je89qojkmisnqojpcuvcta2rmwckk6wx3esp1z73727ljoyfb8crrrr5cfd1rt73hz783i1cwsbce24vz2ssfm3b9235u85tr8of6fn8ekq9syn4h6gs77dstwuif9yzrcgmllxcqekwtalag834o6rryimen6wferp67op9u3c4ocwuf4zusyza888vqgc75iqufpxycseo05clww81ti1yatrwif5ng8dbz60ljhscbiszy2kq6frr8ih5i26dq5xe7p0x8czvekh4g',
                fileSchema: 'cevx458y2p3rbo3je6d5g18hs7eigvbzd0lvqe66f7fbgplqbjx4mjyn68majf0ywetbgkgu83qjpwakqxc13fnogfgsw6z5d25afso1kj00fdqpi4k6zydy13um1bh1yif5qdhdqvurooj5y4y8c0hbwmqegcsepiocma79v4bw1cma3jqnh8xu58g7sysfvg3oohr5he1iy9n6zvgyrnky3rk6ngrjv809cx4j9r8gd5o4aj6ytql79cuq2lg7bwkcui8w7aul9i50rmi3hek463eqoobri9ig7k5xky7j1ph3ncs1y8t4q1px7vb59j0labzhkb3wxpi38tzlsigl37kmhzuesat84wdxnieat2tzxa0n653qtkqu6vt1ebot5vfco1jjhd1csmi4acy6ub34zymwusuxixt6e75d3ypx9g2ho0lneennabyjfrq2eftvjmprr2fzfgcep90wsf68qniduhzee8zywp2uq9rcs5eke5c2fdzb0lvd55k5fyex4fbm1gehwx8gk3l6y4for5bzyw1c01lfpl7mmbry3icguv4h2barzz2tahh7q7lcayzl3b2zqvqgj758zfm4uydo4czjqcmcyecf6orrsxx0yyq53h7s4ia9v5qgk1hs52nlicwnauhfkwk6tkk2e1575oos9o5xamrcmlza72spsdwpljq8uxqbb3nh1cxgqipzy8i7wjo6gonkaufi4cwyrdio5uo49nf9rx70fe77s1td09tjywh27u9x69lb8uxlnpex43xynum8x81bkwtgm009munaj5kit3jng94vjj6cmge8t3gobj1gk5uykmteb63u6ug8q22mgy9ttgksqjnz7p72k2s43s14trp73ympycnqgw01zaplyz2v3zxgyhkkjsjqw8ok1bb948ix0gr03i49llxux64zby5wkf3uj0wf8msepx2bsn4fa9hg3cvtl7qi5l6vupu7bg68uvz7wfov03fviljosue8q6vhtzr7rvrz',
                proxyHost: '3ejha4pin0war5tmlf3cv7x99lnrxe72q3plf0owmuj11xj0b1jda3v9xpoop',
                proxyPort: 7637371998,
                destination: '4kdq2yyhw70bw1h5qtflt5ogf0asf4nfqgqgudpxm7qfcdah0lm4ozmyka6i6jxw19fvly9t2u6y5r1zkisv8dqurqjo9spbqvf886nh7ijgyz9kq3osl7wbpx2xq5746mpmvzyyriw09tfx6wdj3y0xdrwss42i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nz66w27h7v8i0y0fvf5zdn6dmvuayzgxe8t2oeqmxye4qb28ksjg7076c7ldpn8iqu4lddow5cipz75dypet9dmzjzzzyrv5rntrrpe9dzs6coo6xej49ijt7mt4bssqkxudc9qlqaf7223zwgcsc7y7f51g11og',
                responsibleUserAccountName: 'msccq8xwnurht3q40vi4',
                lastChangeUserAccount: 'te6fff71jil3m4sfdrkj',
                lastChangedAt: '2020-07-29 11:31:44',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '1vm9triypa9kzcxozwugzfffmsbwi0ikout4penz',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '4843d8v9l2xb00jpanjroipyordqeli9q88v1lyi5y6sphc8wv',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'zso7htr8tywkbjl6p4jk',
                party: 'qnrghl9nzo00bozivn6m4q7voghe3iuwg0wuh7zxxjzmwm3u577t4a3ocrsxipfvxmajs17mhqn14ku69kzwu9g9wmiwgj31mrvfzcfktoini6uctpaapb660ictiq77t0n7m9y2v5xfe9x49buyejhw8dhvdrvc',
                component: 'zjayro69t29azshlvaznnaia5q71z2durkkqu9h330oio6nltgnzvmwy8cci9rhvsny0jmdgho7zht7y3bjspkrvjdllxgmbyu8ol5cku9qjvwfevd6zb0zaa98cf3s95x4t1kojwd62ez0epje153655emzrqvn',
                name: 'ie0mn5q7bofodhkr640rck72gil3sjz5maf9p2sp9cuslrve3p9sdq35nirffg7gwnqldle78wdrun9lavvao9bfug26mvam6crol09a60ol9allhj5igp4upf2vyme8w2kapl1kt91onffob7jqn3tb097juegr',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'yfqpu4are5a0efqnpxmgnz4s51hswk9h2uw9ytd99xvrpcktcercyg656btes5jef406z62ipqfvv1gzp7zv2vcr1lhd3jglrgji9yfj60r466gwyhrq7lno0iyegzrmvoqottkd4u400rbhikig1wop0b9wlysf',
                flowComponent: '6uwlunet0zklq3qnz410k0p8d1e06a8mfa3lvnvlq4wcygvqcuq3dqc7yj3o0qb3a6o8hpfwm0mlibm67bq4maye3ebqhoc9qzzwrppoaaqtnc4wn5nirj9s9dxtzyl9gw4rd1lld75urv4ac587i2z8qhvj97rv',
                flowInterfaceName: 'eng5xiycqafu2xxu63x2ulpmaqjl2axnjvz0d3mgchahqtknd8n6b65yz9bt5jm9gfylabdwov9joq1t1bo61h8jgy0bxqbl3d4s3mmg6e42sr1vwqo87v6td34dp8133z19iotr5rs5hjv20w8qjpp0ihol41ch',
                flowInterfaceNamespace: 'zkw5l4b2ml0yizdu4ebqm1cmk2tdtwvlndo9ssc2fxzzjya6x8h9zcwaqxs22n7c88sikku6535zardu0m8gupdbfosp8z4fl7ynu7a7crecrfvam3olgt2b8cv3jvgq6k7vzig5nq7f554t1bu5npn2qgeuc4c8',
                version: '2f9r8f2hfo413zxizxr0',
                adapterType: 'kuwpyrq9s12w58vdmqza0uuf51vovm95wg7oggnny86b07fh3vgzf3cb9dpr',
                direction: 'RECEIVER',
                transportProtocol: 'd6p27qkq5r67iwpdvsnsvty80q3f991xkw8k9wepdjxioq2h49cf74ezgi44',
                messageProtocol: '22z4ya7jakiw4cgk8zxyecffi6zth1i974etj2yh68ger6lcun1pna342w5e',
                adapterEngineName: 'ea6aimx1amxocxmhujely8bkp1ioj42j9o094m1s78f6bi3q510dnc91i1q2gid18u03gidanpjb3nnv24zy13e6vkusgsz66dog5g5635qwhuigi18j9rztpj8c5njezzc46rou4j62t2d62i509xjn5gyngkia',
                url: '246373o66llyxmcks5glojb4vi1abt9hkz4fm8gnz2om60iim8pbxnau2cjoxdlc3m1lra25vn2ru0fgnvksqa5ndfyuu76llzdtek7og1b98758h1csxer8cqjpu9phdpd7lgmpigj0xfab12bggvc470fiharqu02meftnrf0hmpg4wplt1myxrvq6tqdm8434y63iwqg8a1u8tk8igmsi2geuwcbzr0vq2xccccy770guohvhadta43tmjolhwpw70iwqjmzap6akbxqdlh83h791wqbpls3rk265499q6tx8ueiy7t7uh0rwzhv8',
                username: 'lluyknp7pmnecpqewg8gwdnks5muq1zlppguludxpom99cz8nn66lsw6wk2c',
                remoteHost: 'izdxqoa2mr6fdkz8opqvy2o731vm6804iymqebylas9w3gwg2qkuaeztmk4c57giy4muqds1uu4tpugodhtwaks06v1j7gitrth9c1yw02t6raes1gm1kjvzryxj0pa0nzizna0v6tvd61snvryhd1d4rbnn28u4',
                remotePort: 3634830966,
                directory: 'bw5eo8fmmt3a7iqbjsvklh6zedhuz9vvw4i4typ219jxl0gbx62c6uaathi096mn8ipss3vz1vmdsi862abzmrbe9gbnmiq258x6on597no704oe2nyx93p8yha3w3427wbeu41mhkr56g6i655pvxvuldutbr414756d2rys01dtblbs7a94eni2j1kzl5h4sqppx9tkx6ko878qmyav4hpe26ntmx2l201hc3aknmvsha6s5q7wu22cflw0gxydnp66zu3backuvz7kveflyxgzyd0qjnc7qqht9ttuqb73twekiu32tip3uscs0spm8xancb9r8h6oqm5t3bzdmmp3gg19xjly9wmuif926c5pmjij9otjdew0qoes62xwgzprfs7jliyz1vsus7cvpcldduu46eqn8px3s8pstx3o743u8hhmdyihc0nneghgljv5yid7xq5modbi3pwyaswcy67myxyn7m1f0wdjxp5bb62lqr7zj5di113hqm3i00wl7cmtbpxo1sl0vi1wd2xbrh63b9sg7reajzhpsdq67xktnj5m8atbthlk8lka6aa4wmqs8kvtw3ys2ccyglxii97mpxd7mfo8zbjs6n86taslebfyofnxoixo02q22d6nu4sw979q8ibuiejzqzp4pguuoppd3x62uoz1ikx4g4lalehrelm076mdf1385hm043eej9q74aue0yl6mkmief329q4viln7gnpdb8gfioahcubel7h2gglzs5vyyxn10klnmv5mx0e9exy1lqwessrae8svdo2nzq227llsfa7w4wyw9nr169fl82l9vwluhr1wdm7z2jrz1jsy6enh79s5ccnycgbiqvxyb6diu26twijtw8flc9p5944t0ysixv8w6r8uv7hwmrg376snbsh50k2m9l2j42vuemnifxt22kslr5iey496xqay69s84jbdt4znh4alz6gxodtoj7y1sanew6dz0gsn7yvdlxdts6l8kyh4avk6k7z',
                fileSchema: 'g11w9xg01254e98dcwm1sshrrizxhazq2ko209c88eqpf33496l7ycsuaui59mjf3k48uuh2fb6frsceea9s4frazx2it5rl5j0pnd1jxn4fnli5f6raiuv6ldg8pe1il2si8pgqwstnjbewdts1vuvzs1z8yslaf2dl15navr97x8q24ld891uhglohhdi05jjhxter14f0cbtb1jy5pa2qcbglwgbsnc4zewlhx48vo5cryvzem2d1anhod34jkcooc416uaer8rd15st8ff2um93ijfyvyg7fdrmx7d3pfenwlnipi71b1gkr1hyyryy97u1kggk4jqegaxdqpvmuo3tha4b3yq2jth06jekulg389du4og401v7a7vhyh64vtr3th86bvjqdm0dlivqiqaqw3musd2iy1lefmq8h8vl3gh9dkv9df4m555s8mbs9rv6itoi0v0naktryobs7q5m2bmoyafdss2vamqb30yy773p1rlxjkxy743vmz827amfm3ufhzr1r2abqqjqxxv27127awftms80ay9a3wq4ry61wmvges3i5l13hyjtk89amwr75a76enr9h0rasq5mr6yg71rlqucg0cyskbxwts2ha0oc8ruhzbospv60ohu6jyxv45jf9998sqgetbcqlrnjqeek9x766rcuvelpzgn0hnd6rpgnkyenr6shmeu25p16uqqyewxlnr4mftattl9do4oug05hwoudk1es4toyuack2fztpmkvq79ko2lcwlqagp2n2nbteml1uhq5h7gmmxpov8hnj3ccckfws4jk84d0bdfyqvr9lfy1uvxm93t2vwno8g5lyvazwot2m7wqhyvqibqttdxpuwbhvdx87o19ks3qklhuy0t5jwxsq4gi273xbny39ukri0ckdn7gmfw0ziwpqrscg9lywrbj5ya8zb5ore7mp1c7crz2mn7jry5cwl2ng5x1knswh77530zgj17zg5mis0jkrc9gjawjy433m209w',
                proxyHost: 'jff1z2ez6vtu7fjydf4zljdkpon16b3fe9or0joi20yjoyh447zy17tvpg15',
                proxyPort: 99468355748,
                destination: 'b6mznuqovvw4djks7k0q6ftpbmhe9hqn0cs7vnrlwajafmkpckim8vuemd7v9l7ik092esa9fnqktpc6kqtnrqbuaxjs7haxrdl3c1z7k9vpbsqo5olge8nvy1bkxwwdbu1gpoz09036eyr5eywm4813g9esb7gz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'std3eznlqjpp3juf9pzwtsrql375xuvldun4edx029qezbppfwpt6sp4q1emae6bc93lwy9cfuejn9h5qpzqw92jpunevu5os30sek33yi8ob1x4jjxa20yimlqgupkix2eu5od9cegvaqvkvn8uipc22uqr66bn',
                responsibleUserAccountName: 'wphcutslkmlok7p2injg',
                lastChangeUserAccount: '4sbge98bva6zyq9uirhe',
                lastChangedAt: '2020-07-29 07:31:22',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'glbhq8gpxcydmr9d8h3i1xhhdlh91j7b8fur13lh',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'cagf7z5pwons3m7ers70o9zqbsc0dcqfp672evxh70zkdto4mi',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'ridfahh2he8ea67iuimw',
                party: 'jvr74g32rn5hbd2ap5hedn3042wv0969wtxbcqg104kujezislg4f2qxf74uvm078e0nrk8dc5nfkz1fm587kxvt432b8so6r06g8zt9vb3z3nt44zbxgef9k47z38hhnz8lh98ujrh343actngi51wj33bdyjmy',
                component: 'ejjiletyuexqx6zks2gjkqkhpdj3341ohzicbh8oj07gmyl9ajobwynjmry9le82c8xg0u09d21zfki4i4x708t3jung5ulu3nsqkfq42ta7h653rms52uw5xm2hq03zwwvskixpub68024o1bx4hgmcfa13wikk',
                name: 'gk3f9eorvj8qniknobeohvd1pu8h045oxetbgw3moyporuipgzd8cvyg6py5jh0covwumzm6zvxpkia410awytngxg0kiclth5sy1eyyz5nips7et1mprg3hl6zbg86st108cd62ffx41zu0l9cyrwxr6y2gavb8',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'gnxegt4yw8crcl56lgzwegzqqkb2tlozxdfl50umeojr96kbf97moqzmeeo0ibbtn4ma67z4caepye2zymqkmrayz2famcas1r9v4pt4ek6qxr62hwqe59bfx64wqeq5deotcj3h8x3az3r9mj3xtq999tds74r9',
                flowComponent: '0y9la2sl33ogttq9ktr9l35limbem3ecdf2ia33q6i759xnmmo45ur27o5voejxd4y7vy2nzvv9wyabgdgo5q66777pw38o21eppq702ol9ap0uslnydfqdz2alzxq8ia12u5qn9mgudqf1fzs6pp9anjcs60sjx',
                flowInterfaceName: 'glk0oglyqtq61rv9snx2aygr1lqiw6lide4e2aeqzt6a3vqveetd21wbpwrshu64gnbb8h8hsa4ak8ff99shnevzh7dptr1umb30lo9q7anpvrcozta7iftuno1wl9dgbn6ailj63qsoq0pu6ch5ww0urdll1jg3',
                flowInterfaceNamespace: 'gpixawly47ff5u453d2d02j3a6x9ewtx2030wa4gdc6n25wg9ui0vkijmmtw3o3rwu7tdc15oohrxfj2t9u7pps0txuihjz770dedew12ihde5fsn8q8qgxg5v88sa0ffowsz9n195pg22o854wyg3g1orn0r7ds',
                version: 'ah87va414fz628930338',
                adapterType: '6u7pr8k99i1o1l8e3xbyk321a7olh4lupe1j1he60rejqpb7muk1bfal2ram',
                direction: 'RECEIVER',
                transportProtocol: 'w9n3agshxlx0b61g92kd24f0gbxjti2ca4snjaxvlqmosb7cl4gkcphwp1x7',
                messageProtocol: 'nj1asoesoyhgpwk6l82qyq7nru3tjqparjsjc7f247vyjt2bdm2gsu3xqoz2',
                adapterEngineName: 'rkwjddp2l2olgjq1r45c2j71oeblftduce9flr5hlfn6npyyx8clrs59bsnf6qdqvrcfgt0y8xl2zjt4kv202ui3daazov9n5lzfllu3e2ohgunczglhn45cq9970jrw0ayhy4fmwnk1xe7tyv9xxbuyz5965avc',
                url: 'uszmomsn994slh6wesek1thhwjbpqdjbre8sxqhi7wbbcxzlg50f61o65564e2q6rmb9kta4w819qcf1dj4fpjlh1l8oe7semjw2p35lmz83o4mvvzr2fen20wda492e9peqi5d7h9qlmeuxjjw1m3hqsqyx13c6tocknohh8xkowu4k2gn8xcr7hnc5uwj0oer6cz86giom8dt7ziqj937frlfu54u391qeb3ixrlzdx7l4y1i6l3h8py3als60385owdfbobzm3qssqrxxj6zainpbu61ybboxykglp2qi2w12e7sg9hjftkcjpv2j',
                username: '7m30fmwadsg72flk5sp0zwbv79miqmpp1lttqvmhk94loy72ongwq6rv7gem',
                remoteHost: 'qqko6gqn3n8fz0xr3in84pzfjmz7zg85ehq1woq0naw437haxmj60jc36fvapz4w41zbjnyls603qlc0ytgdgc93df9hbo72dfozudqwgmnhvmifupypkkfonmtj1j34a0q6l5j0n5kth1bvczuvpk45cjenj4ub',
                remotePort: 9522664980,
                directory: 'scwo5is624djurclhaorqd2bbf69d86jtt5vhlcs9d52yda8git7pubguhar68lhp2crjl8zri9nvrwvk92g3n95q158s2uey9cesql8816qpl79xa6jtbfbir7ye473tautvz249cpnqgejtm1zky7ch4zkbzvpgj45o2udtt3ow9y7gccj54g3dd1xmgcf0ljhkdj35sxan10eiykw27536lbl5o68j7wuocug00kyxzcvqqvyt6j83n82wrrjisnoxxhp0p3bt47u4bm8fafiokax84wycvj6ln5wzuq3qqxyzb92lsuyoefb4ig3qgithyd6i0zd5z31vgss53f6z0kwvcwdobybb9yfeeb27iy0h1f3fm1znz2s1lzry0iu2iglwkrpxg01hvjogdd5yb7o1uv3wsmtlq2kl4tzl0i2r0le9t62i125vy4u8l979uq3bcajcsagkrl5huwpv266b8omxcjtgb7cgygr7ly90ryjy4ds0f0e6eymwijmeq4ww32mynf4ghe137ks7p2ppisp7p3qk4a2artb1skvvgsn75u6ou7p6fpfba28b34sho9u4xz8q4mi5kpejtlikkz329wd5mn5aozgr18ra6gruteg29kzeul075v6d2hlqx9utmrcm1hrpchlrkrs974yqo6lpfx2gpmj91rbea09sdygjsky2eup3ae9so4qrxcoj78zlqaiga0o0z015f1ywo3wsqi2l52k5pucgjcfg86iy6fwohasc1iime53elrg8u3xvvl53kkbx6g7nqvt1inr2l625w5onhh0si7ywq36x9oygr0xqzdombyumy66cnep4ks2i9qr83bgvhk103489v9blfeli76vae8168uu3hw3khch59u3quv1kbhrlkzdujtu2rrul5qrf006o2kmi2urd4m21x0o939io4frek0q4bwtacs4e02hi8mkm31l4gonmq4vf35p7re88qzcyfqcfxqb4871hsj0h04i2aeg6vn9',
                fileSchema: 'ccyjcnl8is8w3i4ck5fqbr16d9uyi7nk08qb9ar54szcy25q3ln64stlzq23jhjk28xsl0qpxadmby71lydgfcon35egwf3haabjk7oaqe6i1jyzuoyas3lyolj79zt3gsdda3es88e9qkitzil6wr9c95896ka98fd6ehb8pzuzj0x4q95tc1lzqt8dlcuu6f0dkod8ka2g0icczwci2vd73kanvgp3uz7f5r814yp5fxb0zbrw6awgx1dasxolpy0qkwgk5ht75866sfv03dps11ufkjvnpwaweildt5kvczavt22bfvo5ho7gz8x24j8iqr6dolx01k3uzxdgk4x4m4xrtzmu0gqzvqn27j8ufrpzqop53k22igb04koeiv4i56agwenr6jnzo37ih6wx84240zgnwk8mc72tuxncjhoc11uxcttfcsz7gtcz19hxb8n2xyp42542779yd2el8ogd9dzmqo89d3t0qsi8xwwm06db0bkjbuy8yefu9hcor7b2a6zwwsi620zdwfxjo21mfn55rkc22fh1ld0z67svb20fsawz2s8l0n5aq5p2hfrh1ck0ljvwiw2ar9y4ztmpgxqsvu5nri6dwk1cl0qrpj9g25ok4659yfp5i16q1i044aco1tkvzmg357paq2tvl42plvm4ppm8of7gyviv86ojud5bfz78ewak6e59s4u5puv0zesjl1pdzncznphu72z3ozqgftmp6a2zvfuyahn4fhj3uh4s0difkt2mc63mq0hsogmac9nbwon2rcv3hws3lodvj4a9lznulcwdd9q2tnx11etaxtfu5wys7v0w77tqn2hlqgo1i3c26hrpg8ybkppddg79nwnlbtlmgxaelqim90x27a6gv6fzjnimkd2dzf7qq02q3awqbxj0kn5ohtji3k58uhynctr196x084x311zxghk54wxv4auwr8pja7d7ndo0o4z2r6ap4sulfuu9q0eblijzjgmfl1v9hc7mwkzkqqyf',
                proxyHost: 'm6367qy1e3xvsvvr75910l5wkhyo8b6x7jnvz7ewrjowm1n1uxdks5s7ybd7',
                proxyPort: 8758647545,
                destination: '47iuv6vr5bgrqdt1pj3grysvbijply1b4psr4dwbv7rxvhhkac9vown4kdsc9ptqvav0dci89y1rxa9455j1mqno86zmqptxty8wqth4apvzpgec2ltw6pbjckjqc377cqz5h8armtg6ncxsrtupiovpx49isppgz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ai2lcmrimxfkcyrqblw7kui6mo6i0b0r5uogglc447619ukvkrccci3dtjmf4obkvly552lh5l1qlmnf3sxfmgfzft0mht7gee01kzmv947bqwwcan1quouni0belgbte2e1edowomrvmaasovy1jq66shh2w0yg',
                responsibleUserAccountName: 'y8ksz9t9mse08ahkhr4m',
                lastChangeUserAccount: '2smivbvxg9g37q4e0tz7',
                lastChangedAt: '2020-07-29 15:05:06',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: '768b8518sbht62bc3hsskjaxhtqttjzzbxciwzr8',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'rooqoikvw5bafn08msytopbwnswm6ar5tbsnfe0rkx3d1ridoi',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'ca576cn6g50w80kwy58v',
                party: '99lfoikzksjp0cvtoa26fzi5ns4ygdyctfsp1o8h4248op6ykvy8rhozhq3aejz9owi9wds5ak4sdzm6paw9o9oe5qo6hdm7bvmydyap08of0nepvgsg3t1c9xyiqvaigzqxagu01j1myvjqfa6nuinjb11k8uz5',
                component: 'rl9vyyggfrrjg63is34t0pt0y3nwmrl3stepej0rpqhl3xp119i1eh0a6lolpfy1ztg51si38dt9lh6x2fazdwgmjd6qrr0126d1sxjaa38e8qphx0368yh20n7ycnemkbzu533yrqs8hacau39tqezkc9lpn08b',
                name: 'ea2dpdh341jsdpoxzzw1l2ftcmnw3w9ry82hav4oprs0wibt3r6ix3j1x215346h0ha67j9o0nfw7ou1fbh4fl8qbpy7mfomy93qa3xmt8645rxdo9pqqcn5jx4o6w1odxg6lnm46ok47vu98jr0mhciy8furpfx',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'fqng1ad0g76wfa99y81z78pv697q1y0vemm0fugl6zf61qsajxpv6b704e726w4zr8xh06647f4htyizmmpw4nk904wwa3rehzm72zq206hwau1am7c24h8qg4lly62yl0srrubcwl00g9d3jtmio5k0beg5mpmc',
                flowComponent: '2kjk37dylqg0atuw9zxl7bij4wsl6xuvqq0w4m1xsq37n73psljzlkbi3ef1ha2ljvcq2tvjvjd9hnarw8rokj4xsjk5bt1jizmog84rxs9r57dqe4q0qbiygtroasgu174wd2xe2aspfaf6jcti3ysb8ck8otxk',
                flowInterfaceName: 'f04bi4bn5lkhk4zv6asnodz7hkifbavomy5iuck4rvq3t0uccjdfffkxwk5232xkguq782pdndu205oiyc65j7zmpq21qmu4xx6hd06l2wi7pwyt01z9txe9mdourvtitx9svsdgu37ek8989zu93ae67jk5ie5l',
                flowInterfaceNamespace: 'l33g988829ajxx49gzup43oh3iurfbe66i0855fz04rskh1ncan6x3kd8utdfcldvowvn4ezihv3w8b8asc6t3rffyxaeqfn54ut1nmnudqe4qcubrs5i4nwus8agwpridsj5y7f5jntqgdsikqlca7ba5dr8ouo',
                version: '76ocw1qko668f550najl',
                adapterType: '5phx7uxpaqvacswszsluyx9hgva849cflx1rolpd18abcbfueruev88tk62d',
                direction: 'RECEIVER',
                transportProtocol: 'bwds316s5734qh6gscdh0qw364snhnosxc1bjh0rvrf5wua4cegjjkfcfniu',
                messageProtocol: 'k5kbbiyw5y79rgp98izsecrmbqjya9y2kyhanggm05gs1liswbudh5sp2ikh',
                adapterEngineName: 'cknijroglqwzumxe35bqe6slxcwg0xeef2v7i2junc8lr67ustarul0uzwldyatznpfxip74y845b4s9x1sqkofbt1ogav049ehng0aq44g1varcxzdpbttji2fk4nbdoqf1snoiklp0jsc2g9bhrbx1beqhclfq',
                url: 'i669ull9pd1zt4fka2a1abmxwa5tdhiwl4djnfu218b5b97olhpi415fau7p489manw0p03x7guy51u6acev7moqkgmttzq66alq1eo0eqgxjo4gqs0iiwcgnkiwjc9mukrfm01zucbk7qxaph1d1myhnxp1ln33lqcsbv4brm8kkancgjsynn216jhvjx3xcz4icajmwwc2nm9n4wk2tcat8gli4cqi3pe404oxgd03z2z0eryddiiw5z8dcmcb6kczge1nx8pwd0qymzlezpmftbak3hm0mw0bvvqg0hhp3wjfktnil5f0wigc4fvt',
                username: 'y600w8g8dtvnlx8ywzxys8cwe0kr5fb92qvrbg2sdzlq4kjz2vhlh7k2372y',
                remoteHost: 'c9nhehtds9rbbej2in2bgx32l9yt0rhx4hyxpp4aierjt4r8r3dk7gcxn0hbpitna14ugwdgkuz1aa68xcleztiokqu5h6slqfi63q4yt82kzryd8bn7614buqeoahmn34okqvvjl2jg2qvtapldyx77a6r2ofqp',
                remotePort: 2920567167,
                directory: '9idc9bd3qe4fgs0p8y2thzjf9kr3r4or9przj5lddgypce6dgdu42uma3gv5krhva7w0ppq3hgi0df3ahy7xj97zowmj9jnhqav761arx9rn83r2iojnejtqg9648ifl81d5g6scskwh9ws5m5q69dzjh5q11c20ggmrfqtnngvd3hdppploxfjwffzegntv8d9cr99du6bx0ukr02ny6o2g25xcvj1jzmdod1zrwzwldjwhbxort9n79zfuf42cx795dyngpm51dpdjzjz806kvfm6sh77q70c8akygeeunmt9hh4qciqyaz2622k26ycgga3jv033lswf1cmu9fad1fcnfvyk1qalurfqm520mnennqpcgfo5kkv9ejt2bfcj2cduu0yuhll6uzbol42oez7q59xhv2i0o21r30avs179ed6bwuvlalsn71bqcfzuz93i9cy4anrak9e2mk920yxhzhctj6fk6b51h96aclz3hharulpegdy4sel29tomgc3z41lsdlvylg40sxupsmacbl9z32ph3p58nj05crwe7s5jwl254yxn41t5a78bteoucepol8izupol9h3ro4s6diu46fui0ugi16u4bjlo9bm0fx5wu0nvetze6d186kzner8mfug5n2i3w1li3jgwqpx55hqw90peuoxlat06hai8xlh218du3c1h5tg02vfd1vkimiaaxrpeil7smng6i3gexuo9dl3fqxjw4fvtvzq1h66d4wnr47dojkhhug6e1w57bbjhaud6l8gwdrqward7lzgy1pkm3kfpcyfzewx9g7145t2av7xdft1s0lttusxvcc64b7ymnhfg35w9cj0spnbhmygcybopjk12siek469qkboo27nf8zo756gre8nqvwh22dvppibbcz0xulf2f1g1ns7wb37k09hbq7cej1s1nl7iidtfgv1ji2ipsyifw5cqh5bnnbxgqpp9qaxeh0p4goyio33dg4lldcf0lusm08oahzcv8',
                fileSchema: 'obbc268708x8was9g60gg1tc4t094xlpsxcpa7ljufxnulec2f3emnrufpwz9rv9f7ayhahsqnotnr89xpp6bpm7jlioczn7gs25e7m0b7l05sooj2t9naji0ouatgdj6un8dpz25xc5w8hz1zn26rfubl822nae79gfhujg0p8ntg21mnrzsudjoyseqa6nobl9mchb7zuqklm5hgj156gfnw7geilkw5311b64yrlopn3xfgqooil3xsatihduazsuem5fvdmgc7fd9uf48i4l13megtf022x1ngpebx354dgelfwza4280nupcd7xmbuvenkztm6jl2kfk67erfprckcfxyjgn457grmdd9112kwovswi5odzpxp31gcqgjkh90dvljl3jn2brkpy80t07zis8j925dywyz2x1nz78s11rgol83z04vdy5iwm906g3zumaqwf5yg2aoboe7jji8cv43frpmx1zfsqv2quibj5v84bkn8serxmeau0etyq713vyytc8b89ztcpfkrjayi190c6ewvr76g31stytioue07lozkdc2vjuev1yvujft45ei74b0au534fimzm5z2qeoxs89vy1cr84x9mccnl8fxvp7wr2nal75ouq4zqovn14b8mcyo6poc1w8q8z6nqj9wpvoj3zw5b7uhsl3925270nruoqck1db0j6wzf00ti3q9exuc6m3sq054l3bed87fhp1u345wr592x9xwcwiu9hun83gt724xyg24k8y863c8w1pofl4faypl8f5rnjtn0kc6ed9ep9wn1f4kg5imsw19n9y1dxa2nen2xmf6e7xmdmaw2zhdo8ngfmu4tx25krv344rgrqkgv0y0d62bdggx3t4r9bxghtjk2n6ryxma1ikkno7t0x9322mko336d6efyn48224f22ayp6wkslaryxdlcka7m4m6uomgac9zwt7dnluea4wp2j3f6awagdry51fqfcmufqok4vqc31wxyhp4ql6qm',
                proxyHost: 'htfbpvqlzpizgrcpvbcvuuelqdh4ihheadruuuw9nqsasw522n9wpx422852',
                proxyPort: 2762255874,
                destination: '97vi5rsixo850xhknlrj0ia434ms3p2mqzv6iingcebuq84bq2bbx3184b7xpd0h9xe43ctatal0t7bvoyv0qnvhvrx3nx67dne1mkl0pvwp215ac6z0imme8tqjpj9lya822mfzkwn5c40bh3c2giraq1jdooka',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rcub6zjxmnrzd4hxtj18umtwnkmc1p614p9ok3c1crv4rak09k6qekkdjwsf8v0mqx3p2a6hvr7dp1rol7nbumnc0uffrpau6ybc9hu5vbks5ok9e3k5bclf1hp74a6tlmw01x31mab8qao3gkxnr0jiibq50yxyh',
                responsibleUserAccountName: 'nnxl9bj7gwcdozzsehuq',
                lastChangeUserAccount: 'g6tnjegk9ienns21vb7v',
                lastChangedAt: '2020-07-29 03:47:04',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'qhb79jealg3curq0ee9yyjdbw0o9uzpmv0ofri52',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'ey6p0qngjyytwg4znnf30pop96spl64w7cgrr4psj3c5fuzax2',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'p42bo4nqza47ua3xmkea',
                party: '13vgibjnbah1i6xfz5nfbnxpe1lvcfv3ifeorctillkh88rmgazlhb69ff0qe2n9yqry6ngqrocqsvvpafb7923qc0qtjq39lyt6wktpan5idtfkp8mpgeojfgz3f7ofqydm2i4l3di2insp4a8e2fs1zzmwht4l',
                component: 'b5ngks2lujlimtp4ntm4k9j2srr5w14pefjn0ne1e65ijd2bl6p43rq03uzg45v5j69u7twk3tyva144u9s4omu6qu3c9ecz8zg7alvczpdcaa7mgqabym20awqhiquesjk8b41kbo7crkg5it84sz5r4me94m7x',
                name: 'us8ebn04ri672dxhawtai15zpnet1trpsc2ouwm911a6cfugv3b2qbmg2k3bjjenah284xazyvo8hflq6v9v3ov4ks1fqwc6b9kvcq7b57oxiarzwwgyvuu7lgw3shn1wmctx3xs2j8gzopz59zwsj0dg47d6c6n',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'ionxo677ef7gufac7hapy11bgsfz7rjt5e5lk3gwvanjtwseil3vkqprvipnbjtapdyl90nu62b8a58tzhgzh2bicvdxg6i8zqzwmf5pzmys9ag7ipsbpoh109oao7pjj9rycuw12095bb7wzgtqywwkilpfmwrg',
                flowComponent: '9c9k09arobxp7jnnftyci14z35med08z793w5c4gu1akzasev9cwjoapy1mhmbjp8vwhy5nqlqdguvc4ktga4xagsu24ny9mkgy48797v7zqfo5wkuisi99elwmp0z9xbdkwp9nwvk4pxxe128w6eg0czj1w4umy',
                flowInterfaceName: 'pirrtkmax9t05udvc4f5r1fywmjthit87chn63bkx5lcozbmy62wsn0qg7vy0920avozzdntjk11xjiou0jqn86uko741r5ac1zjo7k7zmtptd44gz74u57p6jjc7wjdpzvn6sr24ws79m65vtpv5wydkuho2wr8',
                flowInterfaceNamespace: 'woq260m3tiqtth52eyqonx02piz5mwicfl8cz0j1q4fcj5mb0n485pu95kglqs2vear7zs249biowx3d24y5tug14et3n8hq1ymqpvtogur74e6lhc84gg8vw02mb4oy8pdzr7gzc0kcvtbbf1x5jrwmt74cu12z',
                version: '4tt2rkwtn33z6zzmmnf2',
                adapterType: 'fup0f9w40icoto5e4b5v37x3o54cjkzqvmrmolhcmyozeqfj4dmze2apdsu4',
                direction: 'RECEIVER',
                transportProtocol: 'ftnjmtyt2nymive2etjlvy235ruzqpde8ytwz9m54sq0g4w1pnfsow6jtx65',
                messageProtocol: 'jeqpb0x8kw9chjufte606i9a1is6c151e17k2a6j90klka0prjjrryyapkak',
                adapterEngineName: '759m02j146l9iboxw2ogo5lytbnakklf40kkcd44wgl0chfl7acg17i73n7c9zbzjn32b8yadcwnsi328fq6iv8sdamstyvq37dk7i6pez4xjr5a9olextcxm9tx5b6htwhzv95ptetyjodyh04s31zjhmeddk4g',
                url: 'ympfqj913gs854ey7u7usb3vay61hwqbdtqfkplfkpjd1lc0u4l4gvnpnqjy00awp6bt3l2lcnv69x9kaoj88obk5mf5vjp98s15ufx7etox47ivzbbbo1qw0ac9f0nspmu7tzyllvg35vdpaas0ooxuhet1p77die0gd6ieihy7764zgdk0bxg2d9fr1lngs1a7on4rbo7gunsi1xkrsv7b305fcvb01excqit1laupiflbzn469krfqfxy8jknwaa9dtj4mtmdw5xd7silx5gagjtrmqszdzzhbnixrbxf8bgl5q1tl5282tha6qjs',
                username: 'pmpuo8uljz3qcf9una4ihlne0chh05cymdqgr0zncesabyko47a9ou3by8fo',
                remoteHost: 'mhydygvtmu5ymqa27d6cdqfpuidhxrnphiwgl7cdvrnze099tfttujubgcgsi843uqftd85rn19dhfxy7yxsvy8oy3kyiobs248bv2jdxx8x66by37eb53ggxvaz4ehrztw295xre4i7ayj40191y7cribr487wg',
                remotePort: 6348567295,
                directory: '1clytp4nxoxofdgm5x42zjtzqzrs430dik0dsu7vrcreg0ltp6ak1v7zzk883zowi4xip25aqu51smeuzs5oyjoph4st2l7uhzisrof82on3a0bpt7k4jrl2q1b8maaszbkwkjvghq4bwiwdriy4r1ez3z00ohoszp4onpjh8txyhybzz0r8f2buqdf54x7tow4toe5gbsf93l1em5hf91l9m3rnh19pb90mgssn41yiylsab55oosed5uz8v8qztlptmqxkz0xte430ndmmcv58zxph120morugdsnht9eytyhxub2da6zyg3i4bbnfko8144tu8425e3nie8hz2il7oraaz2czjvagrawt6lr9jnsw83cqvr5fj3cjdsm5j85n61dv6ys1pllcd2s361jjr6bpp4rso0wvjp4cfcd1f9txe5s7ln90o5p4br49w7k8xmn07rnw84tjza356zse6r16ae6oq9tm1xd48htonwhleqhjj5336lluayq0ptu2fmmaew312n7inyetqab1kmzwoj4hkjc54logqlh7dzznwylb37zf4kzjlfxvbjmlwsq4sd6v30m8dezh8ap61t9nejj4pqjisztx407nv4j7251v4gossjiiftmcd28ykb4hwo2hruzla67hegnaq0tphwpixr5thlj6wa9t6hmsyo6skgt6yd6ekac2fyuua2efhcwa9pcrg45tmmbveq4ufkl769ycmmahu4kqb45qvil32hxstnvzvyfvglnpx907bqzeqakftcb22hfrjudwgcr6lgj1a6wrfo2fc1p1950y5bcb700u75w0lxo1bsk1oqsgl4rwmknq2hptq28ul730o0617c72yx0lfrzbrbdlqwnp08rlrsng0htwtitfacdndhqt62ne60pp2q6do8xog4yf26jgemve1died3lwnsthm4q46th35kjwa5zpfv57w24vt8uf2ay2e2bvb0dg8bbssla1k91pyruf35ubc4aked13wmh0',
                fileSchema: 'iueu2hlxoclorrhbnsitms37vcw4aiwukladagnn26z28jgg57vz6ukie9syqyumbfzwtz0rwfgk8i2lmcktqi2kf3z41cp86oriq5fcqn50u48fzgqun02iicnn8108voztlz10dpfrnvy7h9jvqilrrj7kgzud7y4pzz679jkj6cfnnlxu9srosugonpxrzlugmisqgq6npe8y6xbpxkzmjz2iughk4e26j4ycwijg06i8xts2tvl318ywcs1xl73n2yrw7m2npooer9mo5akr3bpr67wxh3715zsgpt2wezfkc03tlfid1ysz5yemg5sivjdjlfw97hug8o7d4v9b804wpbr676blztn700a3ftkxt2u5pjjb0i1k3ee8wtpzu8w4l26r1ysdr3bzq7dvuywhh1xhmh5zyd90n6x6hl29icng9umnd35zo7du3qto6j1mfku1mjfw2mk3e6ewi89jzcgh4b6gkir73tyd3astayolg4jw2x79ydladftf8nquhxhagmxvxve5rx3vt8wnq6xbr1vrobe5tvzzj9q07iolkhnhs2xsnqnp2k7ic822owc3ib2grev0mcq33mxfrs4e6kq9dxly0ldgeq5ebs6yfzopjuzr8ioghnpf4abitv311yjuhlnv1no5zgn0ficicd3yqebqicilopvv4eosmvtp1qub0dcrwgxlm38rm1llpecf3r8bu2hywg9nr74pcwxegi8m7i1zlqt7um8adwkchapag3zbu9swpyk7pyhcyzi74kjp6wkt3s2c9fmy9ofgi1lxp970j104d7thl94uhrdvgyad7z1gxdstsb1wa962rxflrrtc4or3xz6s691mp0ctswpqfzm30l6dvyc5weijy114kwd9mhpsrbaj8lsxj45qb1c8enwxljmjqny2na2onl7sg5a35y6a99rrz8c3e4l80idgy7xbc81d5f42jxwdfnzpkzhi1k7ela1o12kouw9fu6jh1zoemfac2ttva0rj',
                proxyHost: 'wgqrwashcjabkaao6ip2r6rx31fq34fyz9ow8cydkxjrcst83sftyakydk1k',
                proxyPort: 2921559155,
                destination: 'l1p6ymukqmrejbhy4fk9fi168wr2fw3p20mk13ytpfm02duilwvqbwijkmb36l0fbqpskdm53brt0yxihacgd9e0t2v1h4hleqfop9h28csnin2p9yc5q43tx4b05kor1czugk3zmngquq4u9qlqoyapq9sq5hk4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jzo0hk1h0s1t1q8farnweh0chq98eqr484189j1pfn3r8e9steykdfcoi7opjal76e52knj21yxzxaypadtn5n92ecpqbee0v4d9gd6t8ofj9t3wie45jcjhr7tcq3jl1xm4m2fvevzceyv3owssgecn12xsnrow',
                responsibleUserAccountName: 'yqm7hcau8q4mtt3k5nlu8',
                lastChangeUserAccount: '6jg399gmgqbcbe8m03k6',
                lastChangedAt: '2020-07-29 18:48:59',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'cpbxm8y9vsf4qwh7mgm7uyf355rilvufwbfygq1f',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'axudr89vbhot53md3lsur5nj0irs6wayjst7sps9efbru8mvdt',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'u4ij4hcvgi87ooja461r',
                party: 'u320ihjcz8ae9mowx4khpsn099aj4fw1us9t18srind87xqp05hfb2pujweu0t559bqvasi6visijj3dywbwjwmkwsclvag2ucqgzrye5vvx52g4r1hu8wyftxmidcjwmr1m2vpll2qnnboq2905vppa6ihzf5hx',
                component: 'xd0bux3q3u9sprlxvct4cj1ohhmod8qk2u96z6jmzqf2k7q5mot0ufmo45hhlyuethrrrefwh1lsvjed52ier735ygb0em6p2jkzq2r2c1oy83qh0c22yncroa8muyjrrs0zpnimk5voi323p21zolktlmy1vcld',
                name: '6lm3acg8928hb6769xusvyrglwb4nyp1yl5cekvyg0t4pvenkiqcr8w4i4v6euqoffmbe7e365tuqootxp5b971n8yaebbac1rj3d92ve69q30e8uou5kj1yshenxl6fj5d5vzziznj9loescs1z7emw22ksvvuo',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '13mww5v5l6dbgeh5i1mu2a5rg3ojq1hcn0147owb332a1hq8u1y2prex07slm6nylbahycdng41imni0ozegyqem4dq53ak6l8yf068bsyrli126856fefihz0jrbw5q287sc3zcsgoe4pgw6s4nea3ty81hm1ip',
                flowComponent: 'pqjmx96iqsndulu09pnadg1v1aysswe5xfwgq04mu5ivie2rygl1ve95f5mzbmaxlgduo63phtr04zwwh5x9ebrwnq7e4dabx1i9sgun2pbsdugjkz8ebipjujzcfqnutt83c949esud6zwiwnxontfrx05w8j1p',
                flowInterfaceName: 'pcu3jlfs89augerg70e7t66tzq0tzmklm5c038y5qgqhh4il7kzfdb710zi4sswo69zxjwatczdqx3jf5lqvndl7fne0t4qa0r37c2shlbn3h9cwuihp3id9yrfatt945ni88v1i5h5llxldw7w89wf6yldejir5',
                flowInterfaceNamespace: 'b0oglai4zi4gp57gvvuuzdbhcaymap3oss00gpc65ow1208znhrepy6evdoefnxgve7ksck5tk5f6qu8af3n1jc11s1z48bu5hxtp6omkwc099e4mhb9w2mkftaf2pnoks5wavsijena5xjurd2erlvyngluttgp',
                version: 'zlta3zj4mc1zjzktmdzq',
                adapterType: '287pkpc5z0dp65456nkhii1c0uil4v2tb05hidf7jb5q1c0vaq9xupxx8z62',
                direction: 'SENDER',
                transportProtocol: 'mjpgggqgi7q5z8bskxjn25wmglnqwhhb5fxrlfer6vs9259mt7stv5xgsbmt',
                messageProtocol: '68nxa9h5gvfry587b002u9jqzjty9iyah8q7l7qlzghcg1wbkdlfwxrkg7xl',
                adapterEngineName: 'b1zqtjdnur6pzoxbqeo3k4en7gf2rgv4kuw5kugb1gk2e13x12arzx7vw1g9c7efrr35c2f5a7i1u8ogsiihktq2mestt440asiuxc8br264s3t1f6vb2sdjajpnrq0bkzy8ojqmih994wv6cvyv7anqqksi7wvq',
                url: '3x25tkugf6xsm3qchjo9f8atjdneod0xd15375p4221tt6zio4l40o0cgbn5knlruxdnr8qc4ddu873r2gk6n9s21njgcuicfohoxqun96xd38b082316lsvoaq0iq8ihs4fhhoironk01x2jbtjrhzahu5mlmcuu31t9lhjm7z88fulacaua57ck0szokuqjq7xv97axw3aqksnxvkm5qsjifygpkfz93qnbwvvkly9jcmri4wgjxi9jk65wxpswtv9adkne541jillkahjc7hauzixqpdym4t0fh5tfkv8u2aby6qrlr7d3jfp7t9q',
                username: 'e4vu1go9t6ci1mkcn42mvfyhorbjnju0ufsynpmdoouvleps0t8u6x5m8wyp',
                remoteHost: 'swjpodxkyfjoxxxdlky2f398mz83dkgdb4edzwcv4qr86qstvqh1gfuiljh9xpskj90u1kueqyfpe8jtp4878ix99f52czikhps6qig9tsc10zy5bruh4dbjz9vs6ff9zahqvpanibm6rfvty8b2qm72dxkybrsi',
                remotePort: 4248238485,
                directory: 'la3e21cnyxjtuotfj2hkhxzn9izpm3yc62gqtyryw124hutg0l564nnqi7dup4f8j5zn75dl175qc1wl93c1jgyh3x6ehwksmaj2bfy3mpyu3e7x2p686ao9a47hcxtmucoea19rkxogxx02dcsgnn69msw64y9qtdtaz95jv5iu6ytcgm5221noxaxehkfaquebdr7e9d86kry894octdfwrj1y2hc5hi716r5bmdxolbxft8koicziavzo72omw08a7x7pj4mcv87vsjnmpvkewxpzhh3yiba1wii0zuguhenmz1l83jr5b9jxn2p4j9cseibbkf91vdus442cjlu7bo36oxm7mwwy1zw9x1dlcc9olthmuhp3qfrhpr53xz5ficjyn9x6kfmtuj5e411f9mzd52wdqd2pfq21i0e5ll1f6iygpq00a8iagzcic8wkxa8mdxjqx7arfp20ukfo000c8m051zvydvge1dq4upylz9969bspi7mcdjw7zi9okopp13mhqpx0g4xh1sxtbo1f4rywe9geps9x3j7ehyv7zx7ruct9i3641ppbp3ntjc7ru0o1em5oxdsjhv18o7bpjjvkzjjsfp6jy389lmajsz1v3ldw5h4eh7jjdkbb06vafnzo00h9iya09oscebi3nr86xyt2zy1qa4y1pa7np7tdaeky5ilfkug33trqumdjfu01wc9wn382dp5hordzc9wq3bljylzjj5rjhdoi8x2bhwckfwcf6idx9kfej1nsiouvlci3gsc5qe7ovxeaatobijdqjs4tb3idzl7pepsmgw6pqyuwr85wmm6xtyctbu002f6pozkfmph7cb09yekizjb3l9mh6db4b924s3hopi7eqqr9gwpzxksozwz4cnbjkk4hahjuk4fqtw9dn9t5r3nzcfev5mtqcpmqbvo0p0zrl3rprsbh4l9mqeuxzg0h1qbbhyolepvjd0zeo9x673c82avhnz6ufzi2w2tf42w7jauot9hu',
                fileSchema: 'hqvhi4szxbx7wpnnvmuwmdl84szmhyv849wu23eovu9ieuc70irj3rvfd106hwqsvm0l13e0na4abr3zd56v7bjvjf1d1vvg63hi7u2mj0v1ru6lrw2z5cxr5kj36lieafc3oo77y2uoytr8vaqkdf6maebemx6anh39nl0rqzutev9thz78s72y70wu625wr526ach1ockooo5knkzgtjwi7fgpp57p4qdle3yt0bo194h58632luoprui15tfinwmwrtegv2wyuosl365omv60sj72dlmzg5ymyt8im74o8zz39tql4ov8qvx8hjaduncjj2j3s2atvfx8k2hu3vsrga6aqx5idf8lpdmxv0qregsj32ctp65at9t3wpapaofdl9bob87q5wy8e4com0vkzsaipcjfcjwnintleug2h3i3v40b5kbmwl0wiwkip694lb8ja26f83lq5vehlkjeebfo42wnrsc6k3fp9jqcctxh1c9sv238tgs8pnnu49mh34uhcg1aa2n0hh5zilkasrwtro832ne2k1lh7sz8zq7wg56667f0nv15bmcftxd363o6uvgg45qk6gttfd9496j88zxpz461l9pan5cucsk2o88j7vfbprdxyl0amx77bwu2lcz03197ek3gfr97ntu5z5d0zqcj6a13fn4d6g3ipwkc9bb7javhxima8ggjky6t5el2add2bw5ta07gpe9s58a3n3xitkyiyswvrp81nbpgqlpsniiajgpuu3wlp8b4ckzly74i1r0m21dai4gdcsswu6jt5p8tx5a7d10y8xgn9p9rz4nmnzi6n0pbimu9xr7whf6mycp2npm24hworv3u016j6iv9pby5zi4zjffkmm6vveq9903mb7j3vs9ip5hftbzbr5h95vtk60bk7yuq5a89814g51r3e0rjsuw8spj3vufu7zhkjuyasyhiowxioh4k6biff27yfn8qfqdnznubdp4i0fnrhk4ft9ljgjdvbtmbndqf',
                proxyHost: 'ik8f9mimg2vn52d095txcv9rv4opb8rh6t17gx034nso27s8j7pih5j3fyih',
                proxyPort: 6778855869,
                destination: 'zj6wdnffudbxu7ltee6er56vjotdlv5dkh19y17ccnw0gr6tdda73g609r6bae7rztmpxsldccq57rgpbncwepm08827sarpbbu3ymz9zolgxj4lsj3uy8ca4xo8wupt3wferb6t9ezbvli4lt81vyp2ygpzpdeo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm1cyr89npoybm1zd9or7wk4tutagtet7y21jeyetj7bg3k1tnyfwkmnr2uy0ej40kwdy754rgp9hmpystogazf2v7q5pdllpm07fyvg00307by1rvumivam6e4wx85lcutollmrdxdvjavlxbdsbklpi7lnsqj75',
                responsibleUserAccountName: 'utftstmgdl17r9evay0l',
                lastChangeUserAccount: 'ltftyl0veax6jerik25r6',
                lastChangedAt: '2020-07-29 20:25:23',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'uruoh3aevclf8lrbfn0yx1uvuuhid787bff743pp',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '66s9f9l36a97ucs7yyyl965xru8ra9vrxuwch0xvcz9fyaigbk',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'c4ectcrb7cjbtcb3fr6y',
                party: 'k9uvq4gcokxwjlkvbpd8yjyf3xs7n01yco6yrasd40oxh5r1uxeca4quh4z2eydg4r3uyw87d6losevxzg2m8lvetog2t34lfabfqzk5czvrtsfpwia112de41ny3etu7m42sxvvtb0fpqsqiib5n242ev8v0ju9',
                component: '4yb6qe132n9nfg82kj200i94g3c6wbmep9xwf7giswemt1auo7ihetock378td2ub0uka29gs3fsk48mrs0jwnnamwismeg8mrkwzgn539lxxxdlbjpynya1qfe8j1tlr65jezkfdaur30jyoa0j2b01ae39drca',
                name: 'zfsi7jc5gi3fi4r4rvtf020eak3g0aj7wseq2xykum0i2zciziaqnd64oxbkdh198xtdxl4qvjccnn4j9igrpe436i7lfpa7kzwcp37ftqzl08mfokt8o9vrvck9oobhm578t43ir8f59zgmlhbj0tc898bzppmj',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'kejq5ncu2ow8lye1e9yv256vnd35pbis9u4e2peavtp7y5p54jrx1m40snu1wiiwlv06efejhn0tu4wic35drd5kkghe81w2y1x61gc2e342fid2a7ig5m5x125s0cl025ysrp07cq5ziron2fchhyingd1ujs70',
                flowComponent: 'n6rgzzgyievx6477q3vt2ndz8rohdlwku82tsty19q1d9ct9qqw2rxv87ixjhlxa62yt43exn72w4af1ij8th3xxil6z86zx4v2oao5e6kfbqsjr59ilmww1nu2ecynipenilqjtel2dvt843hpxwwazox9l5b9o',
                flowInterfaceName: 'ilnsp3pizae64tajwvwwt5cuy6hrw2xppzrthxt4io9zmp8u25pydlus5506e2ips0wf5yfnakzpf4woimg9ibb0i17wxb5vnj40ibbiromgv2vphmbbtj4uhog54rb12vpro4ufsvfokxht8653k5puawhfjgor',
                flowInterfaceNamespace: 'aiql5b0a9fuw2sxsh2upib5r418m4z8os7qzoeorf2635vva9fihua8xwjyepp3ubf8qzbl2tmorohegf1ueq45wb0u28r9vxv83w36inlbyhrhf0y5nbaqx7fetinw7ruingn4jc60fz3k9gr7grvbgd7anh50n',
                version: '00n044dwapmdrhcgfbd6',
                adapterType: 'pbafc8g6em6l9vstwokrlw3xcrqyqhudecwbu79fkfurt468t0wryt6kkgb0',
                direction: 'RECEIVER',
                transportProtocol: 'oc3nin3aktrlbeb03g6r2oarx2aqlh1fkyly0d3dmltfo64ik4talr7u3wbj',
                messageProtocol: 'tpkvp0ilml9lisowan790ib2mgewbtvvtn9n384vifg5zh8s775q2qacbvve',
                adapterEngineName: '5ryq6vatubwd80ktjfbny0mm0q6kup0pbchgz6zv4wz0xr01urre2quon7fbzm5tallth0qhzaavupnnmlp6td028yi64q0rtiudgmlmminrtckwouw58ovu9ts3g6yyj48teag8r1d0hk4mot4hvy0n79mw5s2u',
                url: 'r4k82qink9jhnt9sw1vm7nu7ogh0xjmju9i9hrbt0iinre3npw5suwmx5ius12u8625bwchb94j3v2o3nm9y6pmuxd9d8knkd135vwy10p82aek7aoc4dopoocacwalrmhckv4nf2addw719qwh6pjfgp3txjixn668io827tw5d4izid7izw3gxvaarskvp974fq944tbcwwf31ut33z5gymf9648dshoar92a2tyci59bm1igfezirafvilh2k4n6ci6mfx3h0nec0eh4lkpqqqmrl32amzhftu16h2qi7bnvdlj3nz25yg0jzdey8',
                username: 'bf4uyd5x8iwcfbcosrcdr92e2ojwlrhnad0vfgp17k7ywtj0voo2knbzumo3',
                remoteHost: '2onfzuim7eslml05kde2uyes25xfi6epqhasgjan2g3rlbxhqh3c8qgpdhztkizhdhrtnqg7sus38ojvm5vcqtjpvoo2rqd52ekv16tremrp2ca4ssdvefh0ubgkxdo0d9u0elkc2t1h1igpcz9zh2ttz8mr63rm',
                remotePort: -9,
                directory: 'xdjptzrtvm8b88ue5il1xz4amd236yimf47v06oeqxnlathr02dhsw4fi1qvq7w3sqtgo06x7fau97upqigyyb001ll2cipl9id9sjsf6buyobaqg8ip9ykpjyxlni0s1jk6lrm0ss96svw9s9ktvtlyoey07e4ayyn7s67n34orvzmap5a4tokwk5im8rfy5ezpb4tfm4anlon3a7kkegjhjkybpy2hun6hvs93b1j4rt2zjlq8qki853aacsij2qj3521q1a02rdd6pj520e83bkwbt35k4z4ji8cb0u7vathlb0b3rbc5evsyl2m07qojcys5j94tzpjw4i43mdu8fejt8t8g901rfa0hcv847vfz3mcw3xn95q7grrfmmxb712drjdy1d7vk2ss2l668ega3nor9k5opm2fz53y6robl2wdvtsiy1dda8c7vjehswesaixo85hbfvg3t64uqc3d6gz3iy5jephvzruiiy26k30ps8yfcwx4484ev8zszei250dx46qqvocmxatc9l4ikss3tmsrx4ylwnf8g19wktz36z2ydj9sufbc3f6rph176xfke3of1u57rj4els2dg223ifl0fuwpzwhnpdxrfo2mvupwf3hi6uv5px5xap7epvfjcxf0rc5r2120zedmwfxlgkcaijdcjfpz3pi65f0qsi0nbo2bel53xm5wzf4pg43wbe1irerxg3yqnpfyj1wzpowl9d1br2mmwxi3t9i477sj137wi9acjlxhys4tooyyzrz28xjbotvsl3qo36c76k6qmw5mhp7bhh2f2sta3fdxenp0le4ybeqwgj4dbjh3rxggfw4h75m88c0ufn3hkym3zzqfcneqr6l37s2uv2ckyh4k3uyadumyc8p9hwnt9dfanzhofxavdkhcrtc2elk3fxabt5bp7hck91epkx2hl9gr26wdh4r5c32v2q25c0j1wcapiwiye5yrt106plpz5u9442p8220qb731gcouuvkm4vujt',
                fileSchema: 'qkgu4tewkm696txwwxc0i786sekeyd5z6nf8ay7u0m2y7nx3xpoh83vwazhigap2o6if3db8a2ta548y4r4ih6d8w4c1tmbq1lyhkjh5hxr8grsfze3z5xkjvb0stc8qdkr6lf19xwdm83snuac4chraw2nqgukheun7x45z9rybwkkmwp8ubetjwe09ssipt82ndwu9q7ahawea5g4u07lfvbvk56xu54imtcqyize3qbqzqgp9hd80058wg6w83k1j0dmlcgyq1oavp0h3rxb87y7md2oyca51hj4xw25ynp9jbpoi2p6g8ahhpu1c85oanjc1678s0uhxoga55gdw40ceundyl0srck4avipgn0rbk2nxkk1otx7j72mcay8sl60wn5rxslr1lff35k25fmvtybbj1sowvm17zm4wziotofyf3vzigvv8q5tidrhymp2brf3j6x444bswmbllg2385n28hwxipxlrkaah2wvxtex9hadbmdb3lsa2z1mpkgse2eqns3lgnw8uzbsbtd216h5dx2jd7suwzd9ktejflt9lvd59dyg5b9s7l4jebo0xby0o5fdc3c3lf68az8gajhcfr0nu832b3h7vopnomu6v936kycnri1fepbcm6iayl460wttd87kzuv5ttuik6j8lv0reltiugtqghzen9d03rfuhn2hggivhr7sec2yesmz63v678qo5w2xot0rbizhcu03kttk3tmqoes11hlyd456iibqk52jhcf15db5y488f5oky0bolru6h8fa1plynra7io5b59f3riun9n2sm89qzd5fbzf6v4jbm8qgp7h4vjs297sw5i7m61mgewdk3fapz876a6uylrr1tmkkiu9jmlkrkoyrefb5vewccnrh4gu6g66jzk9l0somtzbu5wf4ip11mq041xz0585gi7gby26kgjyzrz9n6y4zmq4noj0g1io2j7jxo0w95nvehtshqstsqx79lzp7q84fc1zeguyut6tov',
                proxyHost: 'gcnvio3e9e71r7wptlhp0q1jd82r5qeqkisvnrd48bcyctu5xjbt6xg8d30q',
                proxyPort: 9462124724,
                destination: 'c0wh9cdy5g41kwl62lsrxpae3h4htp5rwm5c742kyfm1c6qd2gjpnfrzyi5854wd5k6amp9vsao1yzix6dm9glbazodp4oj8vrgurt8lgb3o9i53dgshsy5dp9dyt9uimudf3f6dpjsthlilp8xaxnw83z35x9s8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1tot8y85xv57j1jtljpw13bqsm8kbbexx0c7sysih0cdgicib9n22fbn34t63tvt1hnba64xgfz0c15pdq2dml9gqged30ej2lhxmgllacuw95kbb2uomo1256kto3egj0gbdguiwniczgywm22znwgbjp78147r',
                responsibleUserAccountName: 'ciroj54sogf2mfvvlt8e',
                lastChangeUserAccount: '4rkb64fivjsp3puae0sz',
                lastChangedAt: '2020-07-29 22:57:56',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'jph5wkmr7adwbz5t4xwe26es6b0hpzj25nnnofl9',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'd3zj95fepxtefo2y0jc4bxg22ukx47dshw2dktup3ofsvpf0b0',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'vtr7lm1recxai6dx2h5d',
                party: 'v8diaydywsdullqd4xx84mbjgm11g4n0l79qinjkbrpiywsmjmx3flq0ploeocg3tjn87xbahxn8zsuxkojvfosv604ibj845822kam0po7reww6zxtu38s3wg9df9lznxh171h5ykva5ddhdfvutew4ym7c5duu',
                component: 'vs3301nxgk42pobbz81w7hl92ezmqpfp4i896z1sr32yjuzfzxuaqb9j9rcu8gvoqkowve8e4k1zp9zknyz67xo8m0sw3il5ujj40rtsgag27yhggadume09d9a7s0r19sff0asmuee1x7hrqfg7x5i8kiwkatp6',
                name: 'nsla9pdrrg3ryr1xvkv0f1z9tfj09ncn0mm0sele3pwn3rhbk4ro3gkfbm80leou4awgslasdr7n4z6tpd2gd0cnz5vji1e9yzohrihmmn1uro9b0rucukhs8zraxsbuo74oimjaqvgtf48etu0l9oekakbwve26',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'xlhwyp6ysve7vn98cq3gryomi29wx3z16paw638ot2uxkn0ik5dp6q0bkp6as6kjxpy52rqolcetxdih1927mi8ea9com934xukucc5j4mj1bin80l073w9qotpa90lwkbyr3kpgcz0f2r1gl1kzj5xnr3tiorrw',
                flowComponent: 'ceb5pna8m2l785xf0815lnt01vzmcekktn4qro1bc2og27pvv2soe5t64s1ytah27683dilfi632zlben23iq4cjnzfk2in21myctb6jzs0ay1wg4swrf1mxtejvg3e2pvetr156f9jaxadl6wrrw62f82nviqhi',
                flowInterfaceName: 'o0u8sfckuf5fj6phr2774cen6h8mn6rayo00qqx7vm2fvelzg0xau7xoe2q8yjmmhtiomr0p9welaonve0u6133et1d8ey9g8ydbwzkvdq9u26d2xzrk0l552uknic8t5x7ealnwbphfzz8bbg3fbt4g71f705il',
                flowInterfaceNamespace: 'czfzs44gvqb00yuekbgpv8rgea4euebshsgl4jno1bhrof3zibzvb7fyuh5rex18z8nfjzgllv0j1vowsdu7uoilgvz4c7cayhfp9s32tdwg3876pbt9sx6lb4xz83uos70guquott9say3limfv13vbod1fyg03',
                version: 'kvx4vitc1gl7sf06fsw3',
                adapterType: 'upymcejzpnzi8gn6dzy2z6fm3urbgngie3fvvgcdimxyzi9w72e1trxkfr4k',
                direction: 'RECEIVER',
                transportProtocol: 't7r3dlctkaulmy77a86h559l05ktdsgkcuj4l1j14p5r8qcqfz3vg5z55r4s',
                messageProtocol: 'p3uowyh78qehr3r907cjvsp7r0v1wura55vknma2au72wg9673s3sox81w8i',
                adapterEngineName: '9e18m78qgjaosn84cohmp9qjsbit5pvn9k5ej79swolyb4lzv7jqlxadl6zjkpbju8krzmu5iyftoqfiuy3pt91djf2n0faxoltvzyk1ft68y3ye5xk74z34co04hjrx9trna4o9gxts6w2bbctauz0ksktlphg2',
                url: 'qp1lye5e812dbmdi3tdgha7sh1qey09mr3fj7tzl8k42fefbz3wu3vr190z421o25fyoo4mtkjaw8u7e4m2fvaou5kbeh21qgphsdsy864dfexb7xlhzz1s23w4ai4c7mtjwekdf6iqkzhbk5ng40lk7b7vsx2d7mzx2tsfs38e1qazoljizxv7wdvixc7im6j86tm0lbekp4h74ng0thahvf4apm1gc7dg4z0m0q8w77n2hmzhua2ywj4soqljyszjymvps5cpx5iah502h9gf80ta7th73lw04c335flmv7lrw0s8it3yoi1hiq8j0',
                username: 'iuydxm5wr0js76anukbshms9y57npolm1g1x12vlj9l6rfrsujkvvqg3z65m',
                remoteHost: '66lckbt7wupc2tw3d3kaleumbqd5bi2nvar3rva0apvb4o0qzwf87elio7vkqrkgt5rs8mbomweb6l9o0f57yzy29lv8frlwji1pnbfb1g2lnrlfwdv5fmz6blygwciadod1a0nuggthky5eyr5cdc5b4e2727qp',
                remotePort: 1875253158,
                directory: 'pgclski64j8a8x5c2psstakreskqeb2oai5mfshs6gncjito3j0jtq6i0pyvab6olt7fnbywp0o1jjh9062jnwiuleyfvx4sqxsqfyyqfzr7xg6r9xocybchovnzi4xx0wkp0us4zbodjfak1catfrkordpqytn4nda12btpd6tvigu4j7k6mfyn82g8kypodmf12kig06eozkaz5titix6hbpzy4nrmxc5ohabkra1ur2lk7camr1wng73do8a48hmz8z19yect01z0c5g8sy8fqi8yq6qpwcqal4gkiz2gt7jw6z3dn5swtwgfot3jy3ymgy4nqvg46x65ay42zp39oy4j9zoh115m8yzlqegxofyxkmnu3htl41826bn7d80qz3cpy33b93vq140m501remkrenij07ag1855vn9n6rea0qzqzw49zo4g91z06w93fzzwpayub7nb6ohhf0j4yxrswj3gliwk3cbagzok1yh7gokqg6sq08ncyjdifquvoejzp8kq8f0h4qp787e7sevocszjsuhy9022br54d294jeuu2ah6f9rubrs96h7szdicy531bji7juahiktjynartigu989qu36mywcol1nwfomc25uh50z0cqa9vb371bc2q65f4wju0cki4zg5mw80g6kssmk7cqm5jmnkjvpenvpzy1fwox1wi7qe4bum8zlcupl5xhz0k4bwygqkhlth0985pj4uh97updn6dfhcpmipw2xk9tz0p4futkwimfbs3rq1uio4kdqqc7p0jzghfjze2h8g0tamq6fr0kp72sy57hp19fdfsdd2f7lfyre4wafgo0ooqm42y69dke7rcnedw5hci6gx10vqcrdwwqipp32tvphprsycuw0mz45nnt8704qzysge10dnzsql8bys079r70gxrex7t2kk9l03i8ozfhlwkc6xg7ymr0a0fxf6qjvj0vd5hnbd4dyih7hrhimqtbkl23fecmvxgs2qrw7611325xn3',
                fileSchema: 'dnx9otbas4ineok2d789egkkxz4h29rzgvkztwn4fm7s5bgkbf2hcvpqafopl2nll1ciklb7vm0mk2ipmn0s400ex1by2jiiwr3ty5yw6cx9q4t4iy013t0ciyzw0ug1omk7rdo2cdha0m8dqtpiqzponewu4oxrpldwryjses7nn0uf34sy3pzw85h6qs4v8zydg1nk4lwd7g8d5zmhx3p257vxehljiwihi4x1rgs33ltpiok68sfm10nlf74xm525clvabcgtffp4mo2wcrodjnp32amsah6nyfr657cv3ssovnnbpikl6t3m3pffxcgpnb8z8xoq9qaxgk0wu3f7n8ip4p9srsr65em7pavco3jpnqwj4354i6tqa1e11rvhug3hjy4sukby55t8hcci2wkk1qzqv89fpoyfbo7tkmw2l0p8y3w5nns8sndl0qj7654k84q59gtvn8xhld0f55ywx5hedymp2cbs8bafrukcw1cn9lnz9yg8bhryuc9besa8qy0tvhvh5yvyvi2clmpcljr8mgeu4oiawzxml3mn22xmndam4jjux667rhcxc5p34cwuykdj868cumsibabv4jg3f02mbcfijsawsn8jsfa2357t745gea677ia7k4tj5ke6apm05ragj1v47qozj1069qruvkxoruuzulhuylyu3ubrszp9e1pbqmrst9u5j0ce8lj267miy7rzy6vya3d9e9289cw30xpndw9u7hetp2fh9ktdl5mxbixyepjcn0laljbx7rlm4qws3p28ic9lakk9a86lacgttzhvybpyqn98iq0zk7vjo043un3c77oysflsj0eoylncdyq3234da7dyeq78tug2br7hzaligiwd0wzl8etklwbr99q98s7a5jxfqejl2ge7m5gz1bekq3lu6cudsy8mvkxlyc8pj1bbyuoneqabnh06cwheie31gtmcrow2ikysfomrggtbq2f0vsn454g80fc4zzo2k9pos8fmiqp2',
                proxyHost: 'bmfc33218e3p2ve870dffvrp50zad9zbxlivzefml1y7zpwd088orts8hllr',
                proxyPort: -9,
                destination: '2cuie8zxweirhhl8drlxnkkwwycd3kjj55gtitcoxhkf9e2fkicij0ay6zo2lz829aswn7o7xk7k5p8d4xctiokkkwkn0wn3uk7r2rkvbi6ny080w424eap0kquze3iy3nshr2htkov8fgdlkc5qmmxjn370v2gx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5sm9h3yxual91l1yh15bcq6duhtzbgy3paw7nbdlpcbhff9z8ik5zd1lri176qv8t1dodcxj7yelbf2aichx7ij0nfmva1f4af18gybloy1u8gsookdimmvtc38h8mub8jx6wzl7i8enzhf7i9wbh1rjuyukvswl',
                responsibleUserAccountName: '20fcx67shqms9sjmqh9e',
                lastChangeUserAccount: 'm7icy286nmktrzvzb44u',
                lastChangedAt: '2020-07-29 07:28:04',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'q4xmc3c6x4u7nh19p5nhc0r1lo0o53z18jbox8uz',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '1pbgfl1ztopmldzqouq15todjf0zstj3oq2caesrxi5fy8rg9h',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '9ax0vt41xnawkysrss3e',
                party: '0vsd343tbndx3iaikglvvjlhthck9411ykp6mjnqmz97wgj6d8p81kcbm4bth6bmb1o0grmo3yaearaikcu598fwn6eklovc3qoxnn5xl2qpo36yzp038gacjhf269p9e3q49z70vycd31kkxtq4tn45niv2xng7',
                component: '2qag7g5clqw62uo81chdeycu16sti5wq7svs059yuo5tfnbbff364izu2ydayd7zpphkqz35jg74qi6wfq2j3ok7fhhw9l84hzwsrnzwzlxqb8ocdcm29xsmdxupy99die09jv7nzril7nrt6mncnp0h8333toib',
                name: 'vmvyj0qtza2elzh37035fawnftu90blr9ovfqwoajm3x9qa0lezibif348rr89rft7ta3wpqdgnzbas33eefmhrtaitor6ae5nul59bmhyasitbsm2nudmay88rn2p0km5s2pdm9uw7k7ag8z0kag548pnsu5uh6',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'ci6zo6gdb7yrlplmo5ppkrayc4kzbl5ot5ac23b79chhrjltq6flzj5dxrgie3e6dptjmoov9vv7da6wgsl4pwca38ssjmapka00j3g8y6tl82p0nnydcxe7z0v3usrtpb9w1ngfd82suojmw448b4rmcwvubebf',
                flowComponent: '198knggmo021lrdkbe65opqtcbqbjwz506n3pr4c79dxb05y6e8jorl1tpk00lwirad5mhuvof592zr4xcmhvagolcwdk512bspxzqmg5r7gic5rndbnuav7p87k47oj8dyc94cue9rs1ebkcz3y499ax3pn5yh7',
                flowInterfaceName: 'inrzz432ct48a9nhgkulx9onkzsfxu9g0r8v05ahnrmtrv1ft489nhxkdpmg6zkezqqzubpr4wwpf45rv3ktazp7vqm2vc8ioia128ui6v5r72jjsrhv0ztdn2pw60gjx6ofl0o93rrqs4p530aw99loo47x20pu',
                flowInterfaceNamespace: 'zv4c0qq7t9bvqr1b4deefjh6imptc313krjedk24u1v7meegs4d585sb37drgonsvsocwpcur5kdfk44ocgrew01mrjhbonrw5oycs3fkbnovyuustutc76zthh7dtqkauwbocfym5o8e010vxpjnc7kie0bta11',
                version: '8myeniddjyqswznh4nc9',
                adapterType: 'qg0ptevxajdeighw7sanxxzybq1i5giwttiw8qjlp6a6zhjkj969pp58omfm',
                direction: 'XXXX',
                transportProtocol: 'klcqbq0jnq7ibegp65yruqh1115y2qby9l3odyg6lldihfo4a7tvot2xd2t8',
                messageProtocol: 'ashs6gy4vz3t3hf5uy3hupniav2vf949jvib3r5z2d931oi01sljm9k8ny68',
                adapterEngineName: 'dperbcptb43wzx37ls1jj9mbavwguznjb65lva1zdzlyvb9v65g21y7dhlbg98r666buk6o29lf3l96hc7o7zmgicbmcksl2arq1tgp413u1kklj1labqkwyetn7j7p1oup102mb09yzk3kekek1c9g0n20zstg8',
                url: 'evu4urbos14ggofa7wncjx8cuoycby3ior25kqm5gjnfszk29os4x2cw4ct15udy2v50ogkhw1i7ik2e1524ux0fqbh5sz4ao1879t4xa34k4ijzvtaxm3xi8wnu4q11ng334t4qwa6m6u3th82zkcn5jl07gwey6716jr2cs6loq8k0jcj09mnc8rymp6726e5zit9ayukzysm4pebcedgqn8ywy4leed2d5ou6rjzbd7r059nwrduu9lnciaiz1x5dp38hhde6rdmnvby0h9jlkslck1ues3ff2go3y5e5kplkc5yof7ilb0r7jvht',
                username: 'v72kfte02zdfmcg8nnukcmls7kj4mvzbevt63h3vyetgml300nwh8tcokg2v',
                remoteHost: 'mw5hzxv97xktykbzq07vkbsdvw3y7x5c0xdxqahbvsrru7epz6g0bi7o00bo5phmn7613mn34hxoyiwnsfoowzlh0991e5r1xb3ebgtx5ff6tuxcd4xenoo4434uu3g7lu65z155tgu170eqfpmdcrc7m9m0d683',
                remotePort: 5473794801,
                directory: 'hwdg7y68sa1q44fj2cg91iibafhzxyz2jszftx8chs8hlt5p9vf37xwu6t7ul1suigpyg4amf13ari78ecqjmkmcketjec1hr2lq1bsfhtpz4cd8vhfqm37s989ix5bhddqo972eaqg5v4govehw2qghk8q79g88qf8mmndb1ru1667ti87b01nugbku1hn3f16u4fxvi9cb6v45cy7etv88ycu837fa0xfy64sl7l26ui06zdwrazkfsrtzzsbng46ba5fngqk3efhjsrlgo3z8sx36gfcrgi7qvr59ruxgf8cjy4rmeih07181yzorzmvdjehw9l8j4mrx80m9jalki4el1g7ws8iko8n8qdyryjr2f6pp34jskoc5f7p6fe7iar6m3cu2md67y2kh3xg9gtvopj3lprlajnkoohzsf5dchaz5lgsfmxh72368hev13qjecf5jw46cec73zhlzmejoi25y8ggwnprs7mclcp3fg21mmq3lhqhe8pfe20j9etlc20w3k8u7kqmlp8by26u4ft6remssa0ay2zrg0pun7au7lrvyt1ptbpbcbx07zm2ch7wvkektjqc4wuixu1gncglyi5ibmi88kkp7x117k5bulrmryaig01k6sjxvvspyju87drfnk8mpellb3xbfjb3tsnpm0bpigjq0l4p44vb1hos4hg8rh5lh5o07eabkimass21od8h8wvibaryjlzzplkuzkrpwz4qpiyu96yukfe8hlvc19d4z7l5lgrddbd8bocteiwwfcyu4oqm546t5z3s0oirg1o3d29ai2v2swiwbj8dpos5h2nk2cq1p3ucjtqzhiq5awcf84w6wfgtxeio5r9npuyjigwql24kfspdods3ffutsuns8q093try8dop9fjex3a90ccnrgvcxra35ws0ukfl08zn726ktodvolqdy82cdc89qkgymwalkqrol3l4e886v29dkklaj2gdrffubj2wlczuz21dt7jk0tojixqlj',
                fileSchema: '1g1ry7bi8vgis3z2w11p73tbm0ruux7s3sigzcuxb1mmg8r4hrykzs2kq3bbsxme0shrdqa2gbme4bplyhtzxa6uiuyul5ziz0umau29rqr63p3txlfwovlt5dr7ovgs375e3cynzklvj1rflozopuqqe2y9howf8hl3bix1srzocg6s0ydku1vkvl8oiaksiff387psuj6t9o2zvj6vvowwywfc33xtn36weglsa1t90ot9osp4k6o0ynpa3p18a0vohrpk7buzg5clrc272bqd4mqybfe3vqu4hbsmsulmtzvu2vj45jgyyf2o7zpqmy77htd0e4g58llwpk2nh8j5gyz4cmxlozupo7esb9pffti10tgrnmffn92mqan5gfi2sld740lgaf1c5463bpneemjpybcqmo14jpa1tkyg43a64vs7ikkv1o8arssw7e0o0k05lz3a0ktqg49irza1ellkif1pgevz4lqogc6gt0wylst0io078wd5ua9qji6ksguvdytwcugzq6uaxoa8ldx75ffm56tgg7fek3qk9qp20tkv35esuvtxihjekq6iahkqwbig8c8ezoe04a1yxjml9ebpwe657cg8n48acymhw0tb0qgcl0ajb051wvw4nb8bdetswqjm1iwy81gucnosc2qpq1bxg7hp2yujmo98efs1xhwjcs9rkp2kguwfzj7fqeod7spkhol8jpmb49jzd8kk256uxocmagkuugimf6ejw6d1uwlzxotki9hedxifl8yyl7w3b8612rvv3zoomunvof7l4aptouewk50br5r4pgbzfk7yy4loc4ypdd5ofvtygex3nxrcoa7cll9mias6ax0u7ylt70n9m4ug6l9y3fd8rg80tk183fb0fy7bge5c0kcbsxp91ae8b4b6txxgygfrw67bszr3146lj3k4g7noafdo4jioaixlmmn9tn8y48i72blhj9i39zoo6fhzrdh3oi1pf0iie0zirfn8p24l70mv82ct',
                proxyHost: '4uzpxi2va6wz5n0scpbz8sn97u8j4mhapip5xov0yaxx10v56tigrvhyirst',
                proxyPort: 4635668396,
                destination: 'ztfiqhbumj6w4g1uyiv3e24c0ic8tfe3i1wxlbjkz3qdtmbvxinpe3rt3bdoo3h44f1zrmhc2pxix655r3l3erlmlba82cpgl9c3o2vhd2a3ixnqbv31r0e4x4r51wer1qd9hg9egg15frip1l9avjidy9ha52t5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gj5mfka6tx2vg6c7zeyfsg8queouq81f3wa2vdez838vwr9cbqvbp79gnv86gktvyztzaaglp0naks0u22i88z9kl55xloxmazqhoqki7y24t9mt5thv57e173s3xpy6vdlp9j2ay3ucf5n762tfiv4i29t8in03',
                responsibleUserAccountName: '04r01alu3kdwf4ujo5zc',
                lastChangeUserAccount: 'hsz0r961o6jmem1pce6t',
                lastChangedAt: '2020-07-29 06:00:57',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'au1an6qr8zl11hc688vfrbvwux36ybnnesc2fg91',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'skhbvqemw3mv5uxdtoznxufz2qlbu28rl4ji1p7ho8ncnacfn7',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'lv88etk89iqt53imx0an',
                party: '3ervwijn8ko0fvm7y2qecwj3bo0hg6wnv1zipnec639x4zoj6zicbtfbt3phm9t6iqq1c258r565k6cmicgs3ckioaewe2mqxapnsmkch82x58w0w76rgvgudls0z7k00rv4u1lr1isf7zdjqzu97591g9xniske',
                component: '9ok0a5ai0del05qp5kato7xyx23oqrk7q1bpnj87cizswuv43lj7h744fx0b5o7ehvrs5vghgr4t9wajwlf57kc6novow9k9uugvzj5lozaumxdrfc3rrrnpqa0lfeml9vtjrpfw3uafsjvyvsitz7conl7b2r1g',
                name: 'tx6f6d9h1bembpxafhijezgyxtn0rsa8yqi6z6s5qka59gf0ae0o66m7h9vfn6cji3eycvghm0dwg5bgix8053c4w44ph19lh7kdxfdqzmorzrn0vhtdkqsnutvlhkr6j05zjat8h876f343ilnm9jtvj95k3qq4',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'i6k3rkcqsryurs0xowzx58g96m3i62okp771z64ez6pafnbgrqutv4j6a926518xtchn6ywl80x96la2my6mh31bs2e0x4qk5959ftk81gop6hxg3tsv0ocysiksgghqc8c17pfdoj1a8gr5udsba1k5glky5mlw',
                flowComponent: '0hwgozyik7yzjrd2gxk7icv95p9u9i722gamgjwpnfr5g83jjcofz3rd8fxhatxvy3nt829f5xxh7buy46hagsh2bt1s6qpbmgjcpkhqbs5xxp4majyt8368tn9103voamxwrzmw8yxdap2aiol25mnsb4vm8sou',
                flowInterfaceName: 'zt00g0zdvjnrkc4t8xnobgkoy8r764wkgqtaxz4wp2l31mnikw35w85ab2tjo1g5zkf8aq5511uydlkze7a214pcr2mpbfos093uup9lum90qjitgnsdg8hrayjv9e0871ddjbrfqbcpq0qw2f4wymzw7gjo41r4',
                flowInterfaceNamespace: '1yqu7l8ktos6slgtw1xcho0tlwpy2amggrx8e552andj7n3dc328o7jg679qqwlqg1odlwd5smj1alyz4st3wdf6zvbhgsoito0cm4kqkehvf1kqmmfsfb3txe3zmudddrrrhc9x34iep2gn24v2cb2rd4k312l5',
                version: 'yufcbu12ha3ro1p6qjtc',
                adapterType: '2hfw4f724ybkfgovtmhsfwiaie40aj7b0hi2zbbva9slczvlh653zpvla54s',
                direction: 'SENDER',
                transportProtocol: 'pasiirtnlpnux2xl6jpkgk65bdkwkt08tzbavcc72nt9patn6dknamrc1msc',
                messageProtocol: 'py7iae9hm2f7lmqkh52x5ccexh3jry9jszz6qk8je4q08czhlb1uruw2mtmj',
                adapterEngineName: 'rj0hvems1bqralaj06m4p1pj1cv60dwrp4htuoz7lk8lvlnzbku3ltht2xdd5buuhwcl9g1yo4eody44lvmijluxtarjmtdwvnqfx48yowmd90fwfzb1eel1bobsnme8kcnlp43husihhmtkyg2cuqb5zre2c88h',
                url: 'zrsdgs5ey2rrpwt2zxfk8r89qbcjixpqg0a857rd4k2ybs7ru20ag7gklt5zoczoiycfipztn4cqtxshzbswmwwcgfykol6gpoj592w20g41pytf726qcw6aq5j8god7b2xmb6gtvhya1re5ofwdlrcm2zjx0gkee6lpe533oxvla2je4jgegth09ed2z3cdxxt4zrda4ovlry2yho58evph0jb1iva4877fxg1kfau6lhpd8uihf2yfv2pblj8acjo2iqm84yu4p1l78xt8wvdpb74kh68g3y6pxew3nwda3f4297xb62ltjckisxrx',
                username: 'xedqgs1m6f1l07pysoq4sq90tzp7vfp07tnupzrzse6red4ys589jzzbgcxf',
                remoteHost: 'apbvos8g0qud2bultxp6p5vd8euka7o2h5yaf3h6nmzjkw0g7p0wsbs4ajqxmbf0fh40g0130n6uyn9hnjieo27cbmjof9r8wwbh64vu6qj0312gccd6uar56sd506hwapmjqjauuotoip9kr831estwlqgs1oe6',
                remotePort: 4314955032,
                directory: 'av8o91ida7ix8kdpc9q3erk9ey1pkmilf3fz60uqwgi3r9mlwvzjdzqnxajgm379fvlxhq4xph7nqmsgjzxlxyyjxj1er6ty8c5w0tg7534kpaifb1yjer8tjfqcfx5hp8h1hcnex6bdmha0nan4wr1l1ihx33lscax1rnmloisldhyhtm7fbq6p61q907en19nufxvjz09gxjyhx32bbo58mfxw6rqx7ie6iviz7our6a7yxwv250xwano0gm3lqdq4bmnvsso7fj8le1ahqxx1fscxe3385rofyxo9g6fk8nd4agrg5sgysuu4lfaktb4vaof84guc9r72p13l7ggygpnz3cpkrzwp4dg4d1ppt9hetli2dwr528eqq35c5sqnxf34sl23047x3rt73pmf9810d46dgssiabrl3894crb8uiydx0u0sa0z3x3922ob86aggum8k5cf9vjtc93lg2oou3bonyhayivn5374c2dzoh5zf54flm4o5mpu2do8z7ff7e1r13amt385ylmcth4xr2lldbtuaqeiukhkamoqy5xi1rak0xd5ezyp2old6vbg7ljyhcj7asfpw25j0ie5aljsoot7yc1di9s23ab0lrhkdjqrlnhn2a9yy90vw0kzaarjupz14j5dt9dpatdu20r6i80ve0pf9mbxam8mffamzbxo7h0er6nizqxqn26ttrlehss44hms35588tk6u3macomesnft2mmed35ocutaxhijzp56vljmjlbkx5o0batuu1f7q81hqyaotc7i4as8zf7896p1bxhtenbcno5vx0r7rs0o78rkdes5z4gm6vo63u0zwaj1clctl5b11h7btx7z3t301zlhwh0gvarr74mmce1hpr3wsg7v5hhdijan9eq2wydgv2orivqnc1yrzpwhgadw28o5n9nbuvdtr14y81eg0sum0n7sxmc3hk36vpj690fnzq97x32zgoya5xgh1uousigppn9tdeyp0x46h0g5rh1j',
                fileSchema: 'x8ds6j8bolbrp47jpxlgjao9lp7aumtwfgvcw6ytcr2prs2yar8s0qchmizjv2whcm1jl86xmdzg2kejc946gukcu8q7lk50zb1kv90axckr7xe2pn6cudt2i3vggbm7w5b1x3xuqxikwg3a5fp8hiqahy0vzzxlwiilz2ssexwgqqjxnaozr69nma3qqvy11cwq8i4oxu250lg57s34izpg9gmoooehurwm1ubs8o8fwiqxjgbntghhqqf783oxm6o86r1tl2qalet9c8emvvt3io3onr3v8vwxjmd7gfl3pxvl8pl3hghhpdr1p17vod3udzuoejvsiidu3vyg6ip3x6rs0v5kbcg5sflmq7524hjujnbud31hvgr80ksyw8gwxwm17k9z9gg784y8dugy9k6b2hbhfpdahuguln820cf8ja2ltigs5szpwnvndw1jplw059ut55004f2vommorr6hvoqlnwbzfup9tlkic11d9fnskhj4jnunx2zs4bfp6ukaz88k7ywfq4o4tx5u4zypggziqkv12dapc6fbexcj8dtlehccuthnimfxi3vgd7s4tfzb7mb4z7d1x4tadlgwd7xgsix4xj8nggv2vu05x3o9k5f0ddw8s3qwffi7tox5qp4du2gd4b5nvq792qo5sgcgzlh9fo4mo7xgawlzwh428qju4rcksn7s165d8eqir2wis0c098e6p2t3sc4ogp7oy0i8di0sd2nhz3r33upnwj2cne52anb4r9x9eudvaysfl3ydlbbbc5z5clb1wvn71vaxyej6457w127aldjgdlbyj20iyfd792tjidgdz81x38lugdbnuzhvkx1iz7fttrwqha2lo94w5m8o0rmmiad3d0b3z5d18tqzju6ugvchy99x2x6xgvecp3xgsbrzr87xx1v1q9f66ysolgf8ky6ihlrquscemd5i0wp7nl5p1st2vn1d8pm604qx532viibfz2m1sfuh3xfap7axo9qrbf7zjm4o',
                proxyHost: '9td26qz8e2i1y2rgg1elboxtdewwf30893alfszgo3hl1whexqj21h5ls8g0',
                proxyPort: 2473552251,
                destination: '12qx6dc1vsp6a7ldyxx241fjp6rq5qwzrjpazjq7l38142aikqidz3img41awt9kl92ntmrfvx3txoxwaxi3h6mmos6qpmixw97t7tl0n16g4lovuzg45nzicq34an23triqpo13d108ecogm3uen2mshfjli4k0',
                adapterStatus: 'XXXX',
                softwareComponentName: 'xe5vr8if6wy73eb5dnewstdg88ysybki6buip1m2ktah61q65rfk9pecerejn0fbmoprkvqzfjeycfu6zo7wgc3i6adbx0pqnw9rj6noevb7mfe8nguseqvjz6oeuxxw0nzbocg7w4bynbxyjg2m6nyn3nqion25',
                responsibleUserAccountName: 'kyzc4o77b6m7ut7l0hx3',
                lastChangeUserAccount: '10afco2grirjxx3it0cp',
                lastChangedAt: '2020-07-29 06:35:05',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'amho4s1vh63iwn50umh9itsn7a8q552en2h9w4gt',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'd0mur2537y2mazmp7ebm144qpyzmhioz4djurcvr0f3bchpofw',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: 'cut8ihl359ouxaqt8193',
                party: 'nvdee4budu56pqxbebwmj9dtcc6ko1zmns614huyvtpxa5wg1ap4y670k8htfyc25vue4fs9s4g3mlsxlovd9h3pkhnrxy6v6lez2g644qiawy8dnv8h9uzfzer16mxk4fdctr6inphng2upit5m7rby3ufxbn7p',
                component: 'bfs20go3grmu60moabn03pzpn5ghtr1fo8bcvv1si9p4vokkhkvce3s5ovo7rkemn4yjjl86zy184kbnbwgmk7gc662ibapaf6dsjv27os1glgxt8otkkbgu0n6k6ui6dc22vosk3iez3knpyafi1fpffbspxgj9',
                name: '3uuem27f88u1yi2rz2ooetkhad5skrcgjr5dcrmbljt14w6osvay8el4lgljnkdtwgcz1il7ak1xh9xs3n16k22oxummuc3f2ge84fvvrecw6n6hdgcawoso7dpenaxjzyd2puwjtyzbgnkf3ui1hi6361hf2ytd',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'xmdxk5knli9ywbll05e87jm6ids2yxhlbpqvn3zwtnt0ct7is8s47tsf0pl47iynh9ze319hnake17li46jmkcnpqaxwdx7aypeigzizxq0yvbphjvhzm8oc700kithpvduvjp9v0dx7nmi28u6xw8t7oa95hqzz',
                flowComponent: 'rctu1qu5kcuzaf8wxmy8wzjz8uwcl4c97xrng9r5n9zdpnhlabgacbzc6q08ukfkl74kp5syjylw0wxtqxu8ay0u3sjzgaxo56qmdpcdkfspvz30zxbbggjye2v3uq4hviucdbtxaqs05y8c6yligylm00io7c0i',
                flowInterfaceName: 'joomdy0oi24hru2uqm2q3wsj59ozv6xpryh6zcpmvyilt543f572v8mh7mf649tnhr6r7kn8ve10y04od30q3cjs4cku7dce7hrel906pn8py9e8uh9bwtjhl0t4i0flgei8hh90j8oct52102r02p1o5gioh2l1',
                flowInterfaceNamespace: 'ih9mukadx1nb14gy57rp63p2eyiou26mmbb68g0ag8ynuz3r04a5kz2pva3icvlfvit67xo9to3pwv5nyqxytbtptxvlwtlfemq7q9wxqvi3vf9n94xxfsisxu6319whncujdpjyorrz234tlpw987elcnxph6jn',
                version: 'p8w0zp0hppdfm7c4rxe6',
                adapterType: 'qo07krlkcgnyuxpgkil1lvuwx7eagvwp4wju1teejk6h1uvxk0v1qfcy6dle',
                direction: 'RECEIVER',
                transportProtocol: 'zknbbmshab51k0kxgarh19t86fa253g38mho7bae7nvdia60msg296ziqpew',
                messageProtocol: 'go9hwxhvhd4aig9e07rjted0ck60llnr7xfg1m1mc7kaeplqn6jq1n6mvg6b',
                adapterEngineName: 'pg03jy5io5zbmlqjb5n79yak3nrxvp0v90aubzikvgor9fpsykz6k0xxlebs6z94e3j53lzaqihbwnu17wd4c92tt6s2horc884c660pq065jomc55jtxpwxv3q95r1azjskrrze8kh4qsxp7lo6jtuj5yc0hea1',
                url: 'vo24uypqjsesg5vg32kac04dceapasj217cziltekgflm6yvpt1nw002gcgzetbnmbd1kxlvlrjg3j9sehnbgvt8c9os6j0hx26hcpldh91pg2af8c93wi0w8cbnpjw787j63aehadjp9c72mlxdmtgpeqh069bwkldslvr0fpzj8ecve5b07weq38xbfiqln66w3drh0mdiafpdwl9nd3tixrjh9qg33ezhsr3w4t7b287qxup2h6fssh7nzx3j0nq758uq1mlwgazpw9k0lzdvvdvl9kmf12cvbd3cqda4rjty26ax80uf62sz1wy0',
                username: '4gdzfuhw8p1080m4dnl9z4hgvyoiadh70l19m7nhbdaycs53pwer78hgvilh',
                remoteHost: 'z4ubf33rc1ltyvx7pmbn46nilifqdgwfii0dvt2y5dirwlxo43qrmamd0aqyk43twhmjmzf9in22i9qhcr0ifjyot1rzhmk6szsrwphp9ec0uv48abviof7ajsycs37r2tz7zpzk59lr2w4atajv0mx7kxcj2mvr',
                remotePort: 8795686912,
                directory: 'poneh6mf9i780tbmraophgo5wza8qg633k6lopnsgyqajnhs6hkkpoycx0r0lss0vjmwjqwww9a567a2vil8uhgzvaqgxqb7ntea6ovw7mk9kpijjsxjfi7itne73holwrt9a7r4p80ou4d3mxbv64aej5c1mnb82l8v5pbkboq0a4hle9in6zhyefqvlv3qfnj75wxuusb1q6gd3w9vwogq6ects7rtams3dl4e8he95cl6p76hc6bk9ad7uuj3155ck79151q5wmg5f3fn2521lruu2yk0cjei8xamuquj7j3xqo21urmwndqpcmlu3e5k8jxlgkgaj5iyxja3efkemhiy934sp9632vkx33blp4vq5wun9dikct5m189py0y2xdyuhy16pumlm1eb44f5rkyqcyypzbh4cknw8pjh6q2pvefd9ywt5frfaxxxews6ml824yznht415luhy2sg2cl4scv7zniv9ualum7shnfh02piccb57zddijhjahf491l2jxmel4k7ewds5ch3hvpudad9jg69hp5qieg4bawrl7jwq4wo5ospilos3xk79ju64pyaew5b1kz8s25w95stuil8qfnxkubwzxbzj37jd7rd3sppwncvv9f8kad0j9n2lq6u158myejpuwqzb27czp15ptz1o9sal9d58idgtebpadye9ajd217aoogni526ehl6z3fiogv5m3p8srncr3chf6k6bj625vtwwj8qbchrom84nalhix973eebl2ujrldndt3d6e0d8bv5o2phxul4xergnwwaek7xa03cx919ch53zrgi10m3bmm034jnjqhkhf15ob138h9uqf60p4jzk6rgij6spbzzaz4iku2m2rprv7qndl6iq0n23o195x5h8heg8d7jso6lvpo47h9nckxa92v2slz6s0xjhs7082tus6spor7ena1mjbcdpl8rrbc8ggjebbrfk4n0o842kxc49q2tq1pey3zt9xggeo0an86fv88s',
                fileSchema: 'jaxmttb495x9m3aeig3p0za5ke5x9ke0xqanau2xqz96vozqv6crgt4c7312iubt9sn5bq4bmosughuazcb2qct902poaxn21h4u07eej7rcrhgou1vg1295xg56z74uhg9iazld6pa8a1s254vb9wiyxiqepbzcof3n0m1lkgh06iikmxs4gmgtym931dxd30p0ocjh6avyif496wj3gvmib6y3nragsr78ejufawakpg6c45i5keiikbg7nx7ztqn5qsw2puywomja62umjtwe9mpvyv7ykevikvt3mzvpvjpfmzyut7b8l3uutse2sm7g8w6fqcyew82yfznxr5plv9cet2nr5n5u95ivx0jewmwnmwdzapddsp3az9wyejmhfaevf1y60gsors2j5v7spuzldbdj9n66bjg7h2h2xgdlvdorgx7iq9scrptjv3zq2goclxrxb0fcju7n80ilq1kho4mnx0khcoxph77jbmiv93ticsziv7flnkqtrvu1cfzfx2mzh7wkdf28tpmxmg018a4uqo62ydxxj7do3wy67iv3p4ieojk5uieadj8vqi13i37wybfl0ny0d0xda7fx6uxz9ht6xkzagri8kswnfd532fiam53cwrp1ebume6rgt0lc9rxabtol39vpd98obkpisl8cla74qvo8604p9dtzwi13oprwr8lfzhcpy92sqr5g5qr712076v3lhpf0kltcyl7w3up0jvbtkgi30nr9zos84se2b2oar2yu9nvovujltlnwlw1trlnadbmlfxkf65ao5eat9ckt772vjleo23vkfh8lfuafddy8z7gqgfy0n2tiahc2cg24n9fbt32agtaaj1ytcv5lipv2a09lha8v0r4ufulefoacw8nq2fcxtfs8maydi56rj2y2v7mr5yixz0tgncecrvlifvfp5i9z9zvdi7mq70e7t1cidu48dzjv2v8a1rrdn5knysq2zidkpffnfsg18n9krq3o8y32mi8r43y9',
                proxyHost: '7ytm2fvu5kxj7z66l6szbjc3ohtb89byva52u8a2ptleejdazkzflacsyx7u',
                proxyPort: 4372342713,
                destination: 'f11ixzwy0v80keg9noyu5bnv6rdmpgrllrtk5b3zbm0lgvwz7bz5jblj3wvgfl11dq66pyeeiaa32zf8c3kgwa5qxbwtjlnwpq5pafl63fo6zb96befv6s2flrufkjzk63cjxwvhhwddvqzcmz7x0c3jye5tvljt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zz89qrofmm46453p874hzvcj46ay0b7s9ak18x0ahytf22k42ityxcmihhbx8pypd1vqr6e9zccrkx715pyqd06y4r1zj3zwcu190fqulxik6vszdh4m4gi0jefk4fu42c1fyniq7hcqchf3wyh6paj71b5chjdq',
                responsibleUserAccountName: '9jx9r3j3yxrdu8vlive7',
                lastChangeUserAccount: 'yg4j8z52ztpkwlcrkl9c',
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
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'vwkuivy7b66dd8sl0ob718ni3th5hha5m85oapw9',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: 'n7264a930zpquqwqn3gq42cyetr00gt2l1h0c1yeud8azbt0x6',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '1clrfebng4c8ovcwqgs7',
                party: 'exna0kbjwht88aa8gk45vee4hmxpsmeza8ccnad7h2y9e5m75q8bqvrcf4v729cf055yu5yv2tkzeuub3yth83ajprkgjccc1q1adc0d55nriqfviovi9rx3ig0az8wpun8boqawo36q6wezew9mifzxr8ly1ex7',
                component: 'z7dui2iud8jhbtjpy7sh1iuhouc2wndrcznipzuckli50uba6a536miae9cg6v9x8gwn6h1onl4ukc427096qrqycgwdua3u19mdbi04g0tmi5bry9g8l0fbzpxybhsy5ye4qifbz048oxuaegkz7razz2vao8i1',
                name: 'a5edgms9hmaltrk4adqvmjzdfbhtwmzee1t66nud1pouvp6q0cqoo8c3h64ojfoy8owhdptlkgfjcvkxl02durhjcohujmmip3vupwq0u9pcbm7qxm4m1ctzbfzztfgjvvtyal0xbag9lo40xjbg44tsrz57kxdl',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: '51c3u7i57l4jomlkelzmqfw2jh6sb25pey0zykah8pmmw2wummo34w2a8f0kyvqmttbf7re9f6dzflj9cjvpj1rac9wf249r17hlw4b8lqeimxofsuqfm27h2dv6si534f064pjq625ilwgcxq1lq4wlx1jo75cv',
                flowComponent: '312yi8mb881yizq4xu2t4n4dxlb8bkpem45eb24r5p3suplwkb0ek12t0svp9xkuq2fnqgj42vcyls6yuxo37kh945d4kfder9g2hxbaq3jddzbzqpbzohr892vqb5cxt6p8t60tpbancencyehk00b8rwt7hl7u',
                flowInterfaceName: 'jxr8cok0kdxdnj4lchv54i2jclxtdenndf23hig753hhykay7oj9n013l3d93a5dbw9f0dhjhp8zc691kccssl3mepzfizqkd05dzsyvglfzg75dcio9psx33gbsr40cy6ho1abw5f3bvmkelyjy629k41v3xuwc',
                flowInterfaceNamespace: '1zi39wetm5cw8k2vl4vzjhg3hr7oe02wiel1dqt6iwlv1hrmjezf3hopwppxudrs3iyjnlarb71f6j73ixamdcd16hl9mr59n1kgfsj2gp809dgf016h61nlsrasf28dw5tysxzd90lgykzjbs25opa4h60b1hj6',
                version: 'bm51kxrph87b0vomdx5s',
                adapterType: 'ga85e23hxebx19tfrhsw8d6ee9ojbgq77brypxmro5y7j8udot7fkxuk3s5l',
                direction: 'SENDER',
                transportProtocol: 'v7n41wx90xnl3fh84mvs8vavbobh7wb9owbpgklhyl72rkze4sr9yr43mlqn',
                messageProtocol: 'osz9xnlpoldglzbfey5ts4j7ksqy73e8ktsncnh0y9sw2m0fy3riw5dicbl4',
                adapterEngineName: 'bscr8tlrpirzb1kvi99jpqqpy5m3vi1oaqoj0cc18oi754sghhjd4tc0tvc1a39059mrgv4yuemhbiycun9o7v7zobn4tuoafw3llab6sdua05t5otas36bx7idj70qujhkx6x7gf65f5opi2enckux2d8qko4ut',
                url: '1untozza3rd6nebkrye23d5d5rzqhisjx3i31mdv3qsffxcqfylw5fmp5lstxigr6joilnkn5ujugrdonx3laf87yg4d78j9z0mauts0pklhl4i8hw9c15fs0p1xcqcfho5ljtm14x1yuc8m9rp0epu7b4bif0s6vra1447liaywldbq9nkmvnnhdgsjqx6v3c0bkydloemge8suge2a822hlx5jxzgbcukhg6r2fl119cs2vbnzjpwoacdegibmtbtj3oz9xbqfnf77b6ufa6tkg64dzvjiftc4gprtt1g9wlnjymhf3r18zni45zl8',
                username: 'vgmvz5byg86sq16u7ci8bh3g1w20uea35bnwhbnth0fda8aq86unhg6dd15d',
                remoteHost: 'gnetfq3krhryqhq6xi0wtktqc23ozl01xig70d05auasah6xovbvqqxw975fjm43qbcmx4eiohglx600ulcsb7w76et1thp3ns5uj37frg5b274hr9ziybs2tmr8b0hk5pqu546634zljqfh6psi7l4erdopjdrj',
                remotePort: 2618403892,
                directory: '6hubwl7mc1qe9aoc3b1mt3xku1n64fevtoxynjh2vwzv862n4mypflkr6dusvjdp5gsbzmvpsc83hr45oh7ar1ck0liq6qapygsx111ri44n87jigz20pl780rtgq4sf3g30qdqihx104e6qyalwcsgrrmit47tqe8o5p35maol0w94cxsparoajt4pw8uyhr6hhlgat7vl5ol6pf4jvramnvhzerw7dl2sgotoaw0awgamslflxmeu928uifunkyukg1tnsr5lhfewio5n8n8b8qsff1hkf636w1j9gfpi0vu3eogg3nc85jxevqzwg9m3fsput3io2vhsefz0x5rclv1zarbydlqsq3h9saie9z1xkrdknoomsu9kir798x6xsx590zhau7ifquazhlajlv803vttf8kde9uc4d1clwz9zdyywjvpxjqqdm8q8xsjg5arliwc7tactnz01c7qpu85acvn2tf7vwk7ywsj0868jy2bhgcw84s9z9y3nghbk8vm8rjjcb1xq51uoh7vl4xq1fo0axzc9jpitjtb20jgdyspnubxd7ff1zn9cep53n24uqfd1edvkd6tf3cfm5e6rr921f5rgcfo5lmpwm32biddsx2xxdv6givzq9n0te4qft4lkc4mwpvamu5gvpylqx4piru0mh3n337okcb6dusm5mze5kimt3cz0xx17x4ej8jzhlkfb5eydpp8tyuvvq78buova3rhiw4y7z0cspdyoyit7uhk8sg9ckcd5k8y78zpysqs8qviuyf99xk2mvbfdxfz315xqourgi1e3qzum5wl92ek7nt0rc7thd6npaszphoc5e51o6gw8yw1zwlpgbq2pwfhav933mcx3r6fzi8atcljn8yc2enys1snee0piovj2igwyqm9mhqx7ppqi9vsg5c00dqyd5egn2ow4uv43uhob2dgdh41plxba9j0a5ducyq80a07m4rpfdgy9ula41giyl1ddhslp47xje8cizjdtp8e3',
                fileSchema: '652h0npeky9jfthbxfiv7isq1ag1uvoxm97dwf358nnuxbrq8vc19dq51ojbzie5mnpm5znhql15zbyxkvr9ttb06aq909zwkw8889ovix6uqvk9f66ruifu4ci9dqbtvt0g1ancbv7b4jwvl82x24bg7f5ojk96g1wzav04ndqjm2lbwawg6edx5pm2cmgatl47xq62qs8t09plnt5c31ln8c9y1pqdoent9iokod5ks9q10ju2x39oicfqmrov91d0lkl503qyz36xhdf3frnzxioi7s3l0z49e9s0hhjb98p26xqoty2eg5bbdrpbgcosym48o1o35qlmh276z5c6ubk6qgnas650n227s84xrsg9guoyk2ms5d6gpfjmcygi3cye551qchygpsjitw6pa7c6hrzr0dwz872s3yc73n6lufzih4rzoqk4gi47fgmrm0p8xq4rebiu1b5cu6acz351dfugajf40zwsrslnf7yje18rknhmit880strcyje40cprrl3uaowga2glciiyyve4v3je8teod51w6i9ue4jqp8vflgz3n9ih9gwzypvupf8ep7y7k8bjbos0lrn9m3p5ajnnjwx12ufu0gkgv81flycpt4fymv7zdgmfi29zkau7vg52uk5wbs64j2m1qn7bfv7dtbf00emwdn6cytcv106x1qyxyvl6bb9rsafth2ww6ckgovg9heqpfx09cabvm9620srrhkzpencyfv8jphv7hvxwiiaijnon17zpw25wwkrxwbwejse7lj6xy5agv0ttr9i50yu400ubkj9c67e8hr4t13uco0gn9ve56otkgcrlyuwyb83d6q4jaxoixyi2fxlbcjoae8blybvzz1vagd5ctpo1tme40nob4brixc8x6levpje9bcei8zus8zl2m4u1qdjajuofomcxia36twdvpk3clc8jqdzfowedbyi381bsrlum61d76hasclndysud5hnrx7mg7bnkd5s7qv56f1r6qtm',
                proxyHost: 'upyzw2xdyoyuwzi9z7u2xxigifje6993q3fvb2mampfz85e0tvzui6peg6s5',
                proxyPort: 3921419048,
                destination: 'u7xrer78hl7trn5zjf4zepwwd3fdq42ghrfyb63oc7yzit11mjp3ts7ou3t7ak3yz2tx0y7f4ycrr0gaou5w3s9sy9dan0s8fzmgojxxy0vhx6ril2j39yj3qh8u5stvvd83jdh42onia589krg2ouz6dvf37v59',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h0f9miuv2q470sbtp5fzzm171ayft9ggrh947mknw2hro6g80sicb6764xv5uh1z5al58wxfzg3npoid47wo2fi3r9hjdpdvzcle94amht8pnkfh3mdzrpg9dye9fy73943708r6siqmouvgrqh0ohxof7jg2f5o',
                responsibleUserAccountName: '6oswi1keqmtsg4tqna3r',
                lastChangeUserAccount: 'ivw1ju55dapjw1f1zapa',
                lastChangedAt: '2020-07-29 19:38:49',
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
                        value   : '4091ab2a-cff7-4406-87b5-e80ceba1f128'
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
                        value   : '998183e1-57ac-44f6-9d00-f33e013e79a2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '998183e1-57ac-44f6-9d00-f33e013e79a2'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/11e47148-94fa-40d9-a816-998417b3a6ff')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/998183e1-57ac-44f6-9d00-f33e013e79a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '998183e1-57ac-44f6-9d00-f33e013e79a2'));
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
                
                id: '7ec91f18-c7f9-445a-a919-57592cbc9513',
                hash: 'ymzfl4agvne3rgj470n5ernw5oh124ppfsui4n1i',
                tenantId: '75fe85b0-324c-48f6-b542-91c6d063cab8',
                tenantCode: 'yi3buysnely9lezaexa0x2755yur8riv22z6jwzmslynee3mqy',
                systemId: '164572c8-8307-4216-8f9a-dd036a72350f',
                systemName: '0m69nk8mv747jirvse9t',
                party: 'ot8cnqahv5rnd2akppsau41wzaidn79ktgr0zs8s7ooysuppcba0fc89fbgjs8ocqn6de542461b381dsbpev2vsh4de2rq4z81aomahvi4wfw2lesn92aboiimlgp38vz9x1eo2ctps3hfnbozukbyk10hk8ur9',
                component: '5uzdufzdkyeuai6z2f7dnzzk07qsqm03gn1pxt2a6sou18g904p7gr8kbbs0wye9hq9v8vgqkj7tchg7i9nd4vppkcpyh5mkj7l8ctdclafbi0nx4b34sqlwfgcr0x2486595xgbiskdha06eqfjoytbfoov6in8',
                name: '4h5dfkv0z0ngus6bpg2iie3g16f2bffkwshupjgmuxd53i8au2rqzmknzxiqatd2ze9l4tku44v5zmc5fn2ykekslabk7yno8d0ntmaom9ymvjtdhhvndyp9pzq1yls9bp7c595bpuiohga0sm4sfkptdeb28n75',
                flowId: '0b15ab97-74ca-40ec-a7f8-2ea3c70b15ec',
                flowParty: 'r5pd2x7pemh6i2rvwih4ey1ugorqcesy8hi4kap7bpywrejshl7z6apgefcg3u1fq1fx5a5la4774rh7r8kutajrxs20t9wlcvg8ksdaeirf1miaafoyeppfzozmve4ryiny5t5wz5s62u8oy3fdq2h7u9f09tu9',
                flowComponent: 'wsyw39qrocwz79r0gee4gj9l23tzrjfm5m2zclnwnsiqgryppmkk19qmph07es2ej81l677lwhlbdm6vt2qwedpd95t9oizd53gx9hcwjgtju7gfzz11nykcjo7fpt4ysx5j5yf24yotnrohg3o9cavz4sms0yiq',
                flowInterfaceName: 't6kivsa4flsz0iga1rdseg19lgjzkcjmcos7cp5w82gjq98smbxfbn642vlxkhsvlrnu2ocbfxq5grk4tc9j4hc37nnppd6rq4plp2287qxaw4vlht4vk4xrp9m4yu0zqx0u72pbgo6u9gelvlcrl4xar6bj494k',
                flowInterfaceNamespace: '7kmwh931h5jmexlu3ewf3do65iluqm6uacbud5b2qqi8vbrjc8ejo594yv8e9e9n34yzj300wy9lh6cl09fb3w8ih9pvhu9tv2bih0wyj90la46a2c5ud7lalg61oo1p7v1qqjo9gxuqc8otn7m0s951c04c01oj',
                version: '4cn4l9r02vldxpmndy9f',
                adapterType: 'yezqjr9qssd4l5rdd7bx9l5h05hjyheqvrsikthuv5c9glhgkdpfa1a2vlgq',
                direction: 'SENDER',
                transportProtocol: 'o7s0tjkbxiagz9nkwb7hrhauuhkxks23cpsvfaheb2m0hz2yq15it7cfj3xw',
                messageProtocol: 't8qb83xe38a6m1hfqxr7wyt4vvhxy5bcb7uisnelrjqu2ybntqlqe5f8ta4m',
                adapterEngineName: 'g16iybp7twu4bvmcvmxzrvdu1u1y4k0hxvdybsw98udtf40fkzy2obt655mr1xp8edpqynjk0p9padtpqqtc5oi6gb6lcafc7ucxg1kmxl2um3c1hzvymooljwzkvhgkaj6uhx5amn4gd0l60udbs3lrd4m1ft02',
                url: 'qg7v2egnptlp1vdp9mw50qszuo7lu9danueaf6msotyn1acne91aatapxj7450doigklo82pquc5yw2lx963yynriphmqbapvva3f8ztkkt65y8w5dhukmu72wvob5c92z0biq26acgof1r5crtmeyk2nkaa8wigivqibqup4lxrwdkc6ubftbfy5r2dnbsaivzoai5q72j7yf71xkh2l5t1ggwg4vs6p9uk15l4asbloiur4ccik54n8ndutiuykv2zxzkhbmh1a5vlg0ernthzfl64kwah6bzfxs2kwiuz7043j7ekn3d7qsctw04q',
                username: '6izc4980ifs5fyy96xk2fah1hx5guwfuh52god2hk0mbglsjfkxkxeeq7hyy',
                remoteHost: '3uzpfb9rjni79i20757uucd6e4hpk626r0cwqkrjz5ggdqwjrkxvzsiesp3cydoey1bt95rw2h9npdacjktpo9rfv439qv2lw4u4qovwctjh08kz4vrnmajrvwf5uy4nlam1k9keu927dfalru3knidsoommlovf',
                remotePort: 7153255716,
                directory: 'jzpmgc6cze69wxpwt8vu9rhojq2np1ic1tjcsycy7n4n72fgg6eqj9w70unzrffzqefczb2jxskolyvs9o0ohid7cju6d16mdwexvj6ia5n4t07hqu6lrlq7ji79rjm273obqqmjsq76n6m27kefezx8kwf75hwgc0kwoahmdyi35lsnlhjcyjq026s0cw4p7yffg4iqai7vqupa8hzyiitth8txsocs2039xjgvcg7xg2ani9jlzvhwf53966t1e7f36v8sry3qlm1bviqqf7g3598438j4r6h5fr30emxi3t00ea0i28v9xfxqnuuhvx3hocrdu389y9h5it54sdcz9326df9aups9mh16arg5irgi4js28tkgc9fhipfm2xribez75lqs8liid49oq1ww9ssvnbv1yx9b31pqyp32kysgyprid5pve6rg6juokwxgp0yijfg13n7jytogpsehgpu6j53sf5dajln1ahr0r8ztah1ljgbx1rvgnsjoq6tk8se2twt039yd3p8n7qsk6n367x3wrpetbk7hhnn84cgkb42fushzt47x0rnm34i3fjkmpaeca3i4sqen1rhoyixmzesxqfyplfydknb49jvhp295lltxbvq2it5a1ahs67m00mpifbk3g8ydqnizwo0jg4xhhvldthqtil7fdjldexpqokv88l3jqztlezkifc0eg5yhxv4faji6rdkhiq1gk76zdeb5iy5t1mcl0obm9p2ft1tr0vln72v34fub4l33wumhm3zjcon6x08rheenkl4wmsio4k3dxosyqegg4t3tc72vsk87p36l23j23b9u7bwakl35h1a5vba35odwh9jy3hmihadhehp84gb2lq0ue96ha9oprlwe3gtei99mibeiu2o83nbp0j73zh2mfv56nhq5ai8bi6g7fn2nzad7xz9m4q9sd1f4oho4i7v9pbihnuv3eszldgv0p33wtwm1nqdqphd4kmsv2ogchlzq8p2444m9i2ti',
                fileSchema: 'qy39mzaw004qhn8w1x1jwbnhscpb9436y09ni0pfte3hq9jcmbmijzasoixavre1ivfcitldbci8h9ndm56vqkm8kpo9co89jz48o6o8si0iq3xy4wgbz42fj0guyrbq70zkva1o9h9kncb2l7ntn2nbg5jtcmnxcf2pb4rtgap58h3xwprdeh8rlfe0gzn6g7ary4lknvraehuju5a08m373ldpq460j9429f3pp8vifc98ho5nj6ko9wf98wcucsskn4tj0pqaof2de0ielpo1ommijclmxaeuqdtfyobrimfbau80nzk63fuc4ip3p1o8j3xaen3mileve0efv2wut2mofj721i0wo0mpq92pkb4guggix9a1ivhdy3ikmr81hjike9ncrl3jit4x8jjheppu3nhg25jir3stqn5n9gs35gr22uh5bs91aic9386jf8ieyyami45ntqb41k817viznwas2xc4xsxu4rpyw8vqfxxpa6qkmaxt7iyifcvicgbou9ovh91ssqe38kd711kh4hyqkb4shge5uwdfxvto6y5yxr1eptd9835dhozuzydjhzjus6l5hlyblwzcwbed52u88yd9tbrt218ycom6eswkct518875btgvbaomyrjzm9s8vz7pa5up5orlcc757nzfsc1r737vjhsk5lmwfrqyy0z41mqn72h9aoc9d1avmkkyzwbqaro79kxat6xre45taijimpaheplwqlg8moigezn8awgt96apiv1slq65uk39ai2dhssfdqfcq78u8n7oap4rp5la411ttcs7icjc2u4d4187lyqr3h5x1d3od5qy8ixylbx78qt8ppjaqg9pg2xj92dpi97g5jjqfgo2y62p44mcy2ynffxln50r1p1449g8sbc5n8dvfg8x7h4qp02ahzsy0pb8xc3f6mojs9rxwtjflal6hss87943leo58va1i23vzeft3r2vojptv98o4nol3ut16y4mhbmcillqeulukfij',
                proxyHost: 'syn7j21emvmevjs2a00if6mrck11iyzacyl965qy9yn3p2imu90j1ovd3rr4',
                proxyPort: 3696849922,
                destination: 'la23v8qfzs1yt2ra8401ky8gnzsw8tq7ehj90d79wqcp3qni6x5udm7p0nw86699ahz8sxqoz9kjuxm8d72xjlwwkfz5xsmwq3bgi5mkmzrrfo0b1jq1woxgyij11hybp9m345l8wrouyor54e53xjhbji1w3495',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gyhv0mcjbrb3b9dbnea0gn47lliz15r7qwe3gcjniid5dc4hn0kuycg3k4u5hbf780jipeazwokodbfvuxmmqiwkrt3j5yz6jrgymeascsq8jbbmwzp7tkhe5516lmhwv1t21pvpes0x59zgho85prlh35d8b4a2',
                responsibleUserAccountName: 't8syrp1v72ok1vw0g62p',
                lastChangeUserAccount: 'z0n1ss8geo3hzo4v36bi',
                lastChangedAt: '2020-07-29 19:43:39',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                hash: 'lm55cggphvoigfq4v2uugz1fzvf0dzsf9am46se4',
                tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                tenantCode: '80sjtllcgtfrvmx7myros8iks3hh1i949hnoixx2netch6efdc',
                systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                systemName: '14jvyry7635cijbd8pbc',
                party: 'jxbh08675jp9v15c0n2zdpn6dktbn4cs05776okdza1zc20o07eou4g0up71wusnxq25n09v79oa8hstai9izwhtgmxva0rw3hjes5gv5kggcxxdk3fvsmf1sfwnm4pslx3zjzlxdo5ja6xlttccbahnjsh11t7g',
                component: 'rki4shlqpvi1uv4y4p3hdte2y5u8rffbjj1p4gtz5s6ko4onqgiq8xu20pupbmt50bub34os5c6nmqensdrrc1e52ro8vr8gnp0s2h36e6x9n18fftog62a9jwj6mvq2suv7jzihgtxbj66f5oo5b2164zfqn8tx',
                name: 'agjrmm1t96tqulykx9s4684358evcb0t74lx86v55lja5fnvcd27rh1f8tehcx1zqmjdqncy2j61zhjuoasukyye38jyuyeda36bqzalgy04lm9rzajor04p409q68u3o21ngafcfu3w7tz0d2h7ctxehny0jxwy',
                flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                flowParty: 'xzn2ftq0zyu1nvuoxx44uj66balpjy5dvp5yw2dm28qfgeqgzs31mldwtlkaz1wbexhmabp7rnuw0lq8xslrzgrhla7dq1mjjsxt9fuy9bh1gjc2xi87exwgpfsjn122ih6enxhutzw86aup3rc85yr075g3m0s4',
                flowComponent: '5ndsoibpv4vjjvuuaxvt2km50jjf1zvu0bsumy50u0putd564snqwcichlaqnr2seon7bwg40f8wvacbw7krfawb4vv4ejzivw1rexa6dcqxcliyn06trc6xzk89he8qjlx6wt8icfc8dtwops5hu063vebkyn7g',
                flowInterfaceName: 'rg3futclvm6okdvlopgsmc8d44d0jq9r89sehfyh6h1vc95nbq2yyitu2p6q5h4t9xlsefpp54ms18d2rfc4lzvvrmhgpy53r1ch9h6qsv42it9w1hvskpvtabv1yqlxmwunrh904zw1wb5fw5lvd2fp9tm5sn4i',
                flowInterfaceNamespace: 'o0y5shuzr0rdll0skvbwzcf7y79c521iudt4z6d8o3fer83x2u0rwq7sw23s8d0pmtltl2yph5ximzu3wtx6s69c0nz65b4m2prq986t9rvj2b6hm2sada21k9hg33n0jab23cjxulqjcoave2ndhz3vo6vvo62h',
                version: '1ph3qoqd4jxfk5hxxilw',
                adapterType: 'qb5muxxdh1hlkcglujj1zj9x686e2171m1h60x7vxq40ebk5e2dptvanns29',
                direction: 'RECEIVER',
                transportProtocol: 'cxia3i4b5cz2j2o84q8xgzth6qxrua4sw3x85iyzeuultoh2r9oiml0ujr0k',
                messageProtocol: 'i3p9g1fpdbde3w3do0i6rcp1y63qh07ts6kb1ri4617kv87yztnlnq0fez49',
                adapterEngineName: 'xxh25s1skw65esbhr60z9z8407mf4xoj8rc1y7f8n2ls673lwx2hl3zd5bpxs59itjs9y4733tgxz361w7dgn6ncr0unp358cwkn1tswgjmz206mxxnrvcdv1agshpwxoy20q1fvrglkdpbu9e1ntdvjtrf05wxh',
                url: 'j73wy91m2yi7pvacuc01slmgp9m8paukeyayid2bg9rohk372dcaqqq9dhfl74l2h3ww520gvj6nbjmh9hkmkbr832e0n71subhkn7i4hze36lu1tspenq1aq4qrhj2uromv9l28rkffwrsvz2ovr6cpn4ob2hwjeoqig3q9l8tx57yc4cwhzcrybkkhr7q0d1cgtz0mtq3xxhhp3refyv1wtenc4l44ldc7csrr2ejcpcl4x62ofy47dpm223xl6ghff34jkp0m1lbwnx43ndrl5gk1j8fgg5fy5o52meljizgo10stnsmqwf2fu0ok',
                username: 'zcxd4px99jp6oy01dy53o5hdoms33fxatahmjb1977oykax10dkq9uwtmdem',
                remoteHost: 'le498ipy5mlxu17t6c6dvrewdnm4tu1ubxouvm01byihqr7g2ladqa4lm2pjzi55u679i4qbnyownh06qifqjge6ycemhnhsniez7xuutodr5xq2l7z9zhnac0fgc3jxvxa4fuh2e35mtcclsopevhpvegg3isj8',
                remotePort: 2273336684,
                directory: 'zuxfi4u9vpwubedtf6xvvsvpzlm5hipsmlsdknqxbdp6hho3rjz4co8okv2f4mewu0si9iohec36xuvx73rm7cyh3dq6usg4r0q9e4mdu7f5becigcyj5cfgmln5qj0afjhrcgoq6t6r834lxgxxhtlpg8n7mm1hm7no0jm06dbp5ckulozt6gqugfptri40s3wsa3yd09vja30tdu4y8ujq7h1o19wibwcedq4oll01ro0tp0vgdte1miykswgkrofyhie99hn211yby2boo539robdq81634725vea202qq8u5cqt3s0qyebotn2rvl86tph4qnesvwd8er6vblmvthm78uxiko0eq89on9t97708bclyw4gepww4hq4qk2fvu3dvjkeboeujibky76nsouhjr4yjs1jso21klzvz3x7wrx52nmtg00rza0l4qs8dhz0pwrdo1xwv08mmr0hmrgc0uuvpf2ynwq7co9hnt6t5nm1d398yq1xuj35e9tqce542eywr85dm77tiyw5ysat5voeejy51djv88iwkavt0c9gh46w4qa3w9bmdcc2rs4aoghsczibureaq0tof69wqrg0oqcbebhnt0pcssnd8thlb5vbnhysg1qza10z347rdf8jm63vcvt27ir113z2m3kmhnet51xhlh0b63f7ahmfeatq8qklscz9lxtzunpete3yqfpra38b5k4mrcs65hz52dpl68lto9d690746ywbxgs0ll5k3ni8eod2j7ahfzyfxhul5k4gqncoice4dggixcdpofxttnox1i9sni1wtzxu4clb2dun6h1lunzw9tq58ins1inzlpbwol0htyihzaokwdvkpw7ggld9isvrmurk9yqnvmpdchjilbbhf66dthkw2k1fze5mbrl6ecepujahzktsd7ysce1mdycu11nx7ear2mxl9e6myqaq967mrv0bz0rp2w18161b1vwt5pkt583nlo12lvy8f73okbwnpixa4aer76',
                fileSchema: 'fcnn8cy5h2dsnfz6i93tdzpjjtvnvwq4873z5bc6jyoxr7juk0ws7ubskniji5w3n0vxh8t7r4xqvhjj3hg2h6yfheppw3973tzut3m2cnigw5vrt24c176f8hxjvfjrwa3qlhhj2p3o0s1xl8r72st8sdk5d9srlcclhi2i9pous3qvn75pdlc0nryc8uckmykvt4w5jhcwojpfboc4264riui9gu9dxsw5po7w28ptf3nphyoptyuuyoakfxoolc7irrt4o75te4vio1j66zqmhrb4tla2sw0v5a8dwqxz3jcqyuip2d61xo7j8hf96y8079e53gn1fuhkj54ef8qvfmiiz4bt4hp62hdvyt7s5v6givx8elj7e3upatmwyl4s04y96nzhy2e0zmai4d95m1crahjas1is40eizc7tq4r7r2j7o7oet3a1xwx98zaxato7bi0n99lwwimcju5rudsk0yecgzmxqcstxy0hk4v85dtmx7yno3t2st6laozuiixurdek2xqtw8wo3c83ghm79r9dinau3rozilhb3ldjq45j2isnxzu94t183nr3gzoasfo0d7lfqewhsjzwgrghq6lit51dtzqfopvnqmaaine6udfvwf31geipdwav286x5n8zujdxjutbkl077k3jdjwcwvd64710di4orlrpdvsqeiw9vj6u7b2z96agdyljbpye5cyic7lvuxr28pflrp5yvnjkhc8wdxwyzm8umud4fjmfu2vgmxapuci583mf8fmo1kckw8iv3vnx69wxyh5dr22ldbmyo5dhkkv0krltzo1uzg6jr7z6nbx6vtjr3n1qwhgxdyxxmui24wxoio9t5odh0cvzlxd74157fn16g1niivgvbc344gwp41yl1xga3t7fbvbi9ef7ddp18060yae8ci9xerevsrt2x7st8d4s696o2inrawbx2lje2nd2yw80yu60tz99n8jcl8hj4pj0v5yjaksspzchsunhwk9e5hrp4att',
                proxyHost: '8e4ojhdbgbp6nvcu7on1xr84l7cbwflo243j0i1gwt344rettv9ijzng2lkr',
                proxyPort: 1601169168,
                destination: '0forw5ae53x6gl1axixjk1ofvbjy65xeq4d98v8m8g0kch5eoawaie1tomwg6rgnau5z0h64zy5a9ztv3hwe42lj9ykfo7fv908wrjhuamntmdq72nbn0prrn3e8cm987awx1p0fbiviu1vasevps4uex83y4k08',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hgow2pvi05j8bxbhrqa86nktfz1armbykbuw9pw538c0az843flogftwtnltm7ur603nbe5rj8f7hq096nqelzqyn7ii8ch3ebjf89u3v8xxj5a8m5vehg8p7y51nszu1htu6zsulpgri4xbk9n37iea9dyraf8m',
                responsibleUserAccountName: 'yx9risqvtg0fwlkyf9ni',
                lastChangeUserAccount: 'bpkdafamds31tcoainll',
                lastChangedAt: '2020-07-29 06:04:43',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '998183e1-57ac-44f6-9d00-f33e013e79a2'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/73ebba56-763d-4446-8b3c-2ec8ea9457a4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/998183e1-57ac-44f6-9d00-f33e013e79a2')
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
                        id: '1fa3ce08-7ee6-4d9e-b6ae-08fc48649465',
                        hash: '9dbmz1ywaco5sf0atzl06t8nlzn3a7m5rcskcwyn',
                        tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                        tenantCode: 'sok77e74orhmadprjp2i6hat49u6ykfg6rja42sklnp78n89wp',
                        systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                        systemName: '2ia3l2mky59jhapun7f6',
                        party: '2nrljmvgc317vc01rglyn4yfcqq15yqsa590g1sojgmdd0eetuq5ur8jc3a09b788cc82vz4ufj1qy1ue5gpk7xp3gobghpdvyhfhvn1vfwgkxv19v0lbbsxya42dhw4v8cv7xuqc0nzyraaiisi6rgjm7etf4el',
                        component: 'yjd2f1b346udhnmlz6arfsicetk98azumwfakqecme6f8uhv0czztblh2vt7jzxo6tejiexuymfiuwtvv5opss6ie2uyj3n2g8vck4ou6z5apofj1ebavi3oe0sin84qtc6ngnrm6rka2iy0ayj4u4h6ij34fdx9',
                        name: '6cnm2pc0hxtxgfax0k2xsozz9ygu3m76jbk6oeb3jf7i0bx39m38ilh4cogle6z3nvbj5tdqmbwjrkv0w0prsk2o2vwz2h21liy96na84dmanaqwfy7pdmamp2p1pyigvofjusc3nmwh49dod40mze2c1papqfdf',
                        flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                        flowParty: '4vmecu4vcfeqax7wnpicib63y28ns1q5r5ven4m33e7p6lpbxem7hqt9a902njlepmmj70kvhz9jachjnusb7uwszntseqyjrme4rbwjk1vtz7b8bpljeowq9e81kcmzaykk9huvqcxgl14ihgyxk0zoxo1dtvud',
                        flowComponent: '4mrvjzo5d8no5wc4gb6a0ebdbt795nodsndf8txgq28fodq5f6w6qy21e0lhzc5co2jaerbpcied0d1jtoe4azq02c498e7zb94ug15u2fp13a4nqllejv6xkp3bx4wi5netb8llyousu05pxdv8a5w34wdlbuel',
                        flowInterfaceName: 'bbashcp6eelfvh1pp0flcasnvccoc37kwlaoosoesybbpo3mh0g5xosdv674pammge16qfmtl7d4vbwankqzrq5g3jqbpeji33ynt7ktd79i12v747zoqha55upzktc5wuc0f0ud91hl7uo8qkp30hsvaa9w3kh5',
                        flowInterfaceNamespace: '7u1dc59lxjxnh6uxo9gojumsuihv5z6gcp7urzjiklhk06w46wkgu77qdoau4361yc5utr4sqsc0sncuwghlu0n78vi9nfxgygdj7falu2b8v95nk2g5v17g7ew0hllr70c4ksij1fh52frp9fvmij6qlywxk45y',
                        version: 'ndqt1q1qwpt8lswiy0r0',
                        adapterType: '1qw700oswg3r831cyaa66qrqsdfmhix7pwhuajow1n7cqxt4e61tkfnwh76e',
                        direction: 'SENDER',
                        transportProtocol: 'bstlughnzoa7pz4r25dyzekslrm946lcxdaq2ilajsiu9je3u7bwf05e81ev',
                        messageProtocol: 'zibjawds5ky26e5fu2s8675zaqkajldu76bj1tt1txofjyqybz9q7o64rj1l',
                        adapterEngineName: '9y4329g6zabboag6hfm4iuzndkkk2kdp55qj6kvngiihb8autlk3gxj4wvaoeznsun5hckfz5vlnfosjhd1nzns6wvi99guuth9qij6y4746f7koucpe01e83fftqt2ng4q6godm3790ewdpbv7o6rt87eqpih9l',
                        url: '8bzzwkpi7rk0dfzqx0d831q2wkry5a2xx6s8czm52t8aaw486oucqifq4g5k4zrlt08gmdy89543jgejvl185vij3pqut71451isaep70lkykw3wo8jmqfsn061uw2o9eppwbqor4hhzsagy2ihz32khefsuaqykkwxtqiz2g4zcgfug98i2vajfms1d0rw6bho4r8sxrfl6h2bl05mxa72o8tw1q5erc97l5abyunjkpw0dtvfiggjstb888g5s3uawakcb6oyt6hggy1ye16yo1h491lp6zvn2jus9byl2ecx2ijnpopt0ziyzidxk',
                        username: 'h4uzh7gm7jlsa0x1ojsuxwiz4vucmf6y73ypxs3cyv2aofrb01a0wetancx0',
                        remoteHost: 'lceh172iwukiasl99dkl5nfkvfe14gjwf07ugh519opmjh53hyseq15clhkpjhljrb5tz5uruz6ejsxjgee9w2m12t6248sf7x7wpbpl46xgk1audj1gfxsd4cl8weoio3q10u95pc0zz0fmuv6un8o2hxwiovwj',
                        remotePort: 9360629457,
                        directory: 'aq1iqk3thyyktuaukfbpicn9upd49mqapaqat9ap1o8tc7beuvjxw0ute48wdv0up9b2yu7lc2nj8chklaf2dqqxje3z4tijbkyyvh6q8fzt3wuxwgljek7owdlppzo1jxbj0dmm9la6uzrdf446pzk5ow2eikvswea8m8asqz9ycarnbzqjnsfj2m0j8o0tqe12ywq7g5fu9pd1w2lod9xsrcurnxklkuj4xti2eyoae76rgmdm5mkpv9rosubfh0aexvmoxa3r90jlak98zho0bl1apam750r3mss2gwnbujllad5627ltysu59vki0x4tyj84zwee2qm8vbn7bwcgavlvymntq9o0isqmbn7el1lboh5sz5wtztgy0qp8xbg5sbwa8bdd008b49s1kxfo8owg7ub67op3tgjln485govwaxyzsyxf45t16iysyqsy59j3691khjgng9rqivj9nt9a6rcdcrb6twsx1mc93ijh008fmgyvjerxtjisvxx5mmckm57isognqbpuildilbg5x59c59o1vm18zlnchofmu5sbsdq9nrmx17hg5uu3dtn9vj97z1gj7o6kr1kb2vtns9d02y7wnkm342o4ruevzn1giag1055nzfemumrb9ce063054h8hn9qjanxz0a9d140mp0fzlprxh6mm4yg6bkzem6vqrc0tfqu0fnx3rrgwf17kwm1qumt870fded7fmvzyje481d892evec9y3ukqosoxmu3vfuusfravonoah0g18utzki90skbw1owxxw1qfkegkjhqsjya9hqsscz5adp2z29yrtmbauw3gh580uc2kh8zd0mzaaxdsjls8y06oz5da6d04e0cxd3nt45prcau70ezmmzvzc8gwofoy2umyl6fyr03eygcgurhbojqnfwu9i4rwi5td00s8h59dgp3cucrqy4l6jnux7oohvvn37kd9ouxna3vxihlhlom45f4io2m0bfgq69klys25jj2a6emr953l',
                        fileSchema: 'xi1hnnngbykmwqfa0f3dwmpfj51v3hwxp4qxsdlvl903dx73stooplkzhcnvffdnlz3fzugiycdxu9ttpjnuyhzdokzu4cu1ph317jpchbb2xxpif4suzwekw1whri054bjkt5y7gpz34rijfy59q8w999jr14n0zbrsf4klk64hrz9agspmsy0zs8zl92gepumagfgmb7t758ndvt1b30zpmk7vfttcgln3kiyx6nw98hzn0qn6ytj7ok49g2e3gxdsag6k4v0fluvjlg8hace7j3r2bjhzxpggw060ykwwav6h3ip27oo031g1bofbghzqp97drs9w2dr3al473ehe0kq2lwexm8y7wtnfkke8ycklt8ot8j7jbn2k7yq4tdzf7gy6i5bnd4okz2tw8a6tfccdon077dvg0xljh0m8ean6ytrzaip6fb8o4r8923epsdtbck75c7j1ryxus4d5f08001pj3fzvednn8e56031t2omcna0x8gn044u9dtehw16c0e05v4xvvel3xfrocqhk1v233rnkcn4qe2zbur8gmyw1ciih44nbm2jumgsgw1n8j1aca8jwocwf8gihiwt85f9iprzm5yedkmv18i4ui8g6qsb3aaxsmq1zshjk8lj9kd8guju91dap35pzkm4nfruk976qxd4jy6lb56v2p2dfyfc4ysps9r19fy1ttf1u79pajrmwo61pwec6mv8vxkyrufvqfs06bxkfk0qgyi1nnjo11iaprqxtjpyo7c6x4pe6dli1utncodggx2onbo75h84qrau8ofmo555cl0v702vc3ixvzq04r6thjuxwro751pmsrd7k5s6g79yeakft86rdbq5otf8qmvcs7qh23g1hr0mspob5ti7ms9h9ks3fjq8qncypy02r7y1up8lle3o3ewur7aciiz419i72pa2lmtq86xwvr3ci49ss8yf1gdadbr3824oyjjhwxfbs1qjzmnur4k6f9wn3h2sieatt2ktnshhp',
                        proxyHost: 'ylpohvmv27xky94eg512pw1hcpjfrcfashbl7pxju6jlrbfcqwmrp03ceyha',
                        proxyPort: 4908856416,
                        destination: 'kgeop3e7to5b8s6bnhzpjkg50t44ossi8flfi5kf0vywefattvdff6s6eu9dt89th1y0mubiwafwuiartyerjr2xs4qopgecaf7shn3q0rwwmxrajl6rnay6gbz46evsucegoaojvqcpzngq4hx4eiv16t5mowf2',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'aoxwy315b8aa0ntnir4eqxfijiuf52v9j9cu6napr52570ovd7nqht118lh3rw4f1tar4n482578jnvnr3so4ullxgpawz77lkdfhl72oneaxkv61iyliyvja2ntlkxlq1vissyqxtvqlv2no80612q8enzbuxy1',
                        responsibleUserAccountName: 's74crqjgzks30pj6vync',
                        lastChangeUserAccount: 'ono0fx5nksygw1rh52g8',
                        lastChangedAt: '2020-07-29 20:06:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '1fa3ce08-7ee6-4d9e-b6ae-08fc48649465');
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
                            value   : 'e2b45c25-a847-4f11-9e9e-358e8d246377'
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
                            value   : '998183e1-57ac-44f6-9d00-f33e013e79a2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('998183e1-57ac-44f6-9d00-f33e013e79a2');
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
                    id: 'd38d2584-3116-405a-9be0-def5b12f74a4'
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
                    id: '998183e1-57ac-44f6-9d00-f33e013e79a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('998183e1-57ac-44f6-9d00-f33e013e79a2');
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
                        
                        id: 'a51906c5-076b-4cd1-a52b-86f7eb9535cd',
                        hash: 'fz9gesklupn6xna49nwwdszbkykkdtasomlmis4a',
                        tenantId: 'd717ca92-0bda-44d5-85ff-b422e134b636',
                        tenantCode: 'p7ojuhzjv6yt1maztdnqnxj2qgvqd8owv2kc67f5jw6qvsdliu',
                        systemId: 'd20db278-a99e-462f-8099-4c6c0bd42a48',
                        systemName: 'lbw4qwouhqdit58b7ji3',
                        party: 'sebz9wyynk85xspb01wbbgi04961qxpdv6yujdkckpt08vame19hjc3h06lonziap5ec6pzz6mmp3ufm803xzy4x8t1x4mq4eeooy8kdsseaxi6z218juaf97traqt8a57qfpk1tq1d0b0tc1di0mmy9132sjnpq',
                        component: 'p85cthr4c0azuwifw6y2mutasxop9ys1ffgzt4kvjf8g9q3gievb3iuhe6n39flx5anz8iuh9tx84lelt7k6podfhix16fteye7ah7ki7y67x9q1p76bcpv9c8wzn4irhx0u9e6xeml5epf319sqy9b56jjs846f',
                        name: 'zl1qjowpr9f7wa1banttg87g5i93sux45l6fgqa1h3gdwecngdctm30s0rkfa87p3in4k8elxj6ehfzm3lovid2helad0qhh10yvxz6e1qjikgn20qr3sw4qw68ic8efcaj5djppb4dk6anapxg02xg93cpg8sde',
                        flowId: 'e04ca09e-eacb-4ab1-b9fa-56d6741434d7',
                        flowParty: '3uo3io70bg1jock0nrgmcbxp3o4iuds98ac5cfgphvjr9cuta53iujem2c6gqowh6zx2rhblfbpxowikpfoyszp9bk3ajjohomx4p0rne0fp60xty7wcqx39vg7qb01fc4ac6c829sr6l5g7qkxys3rhvzwemdaj',
                        flowComponent: 'kpp3ecl106dzvovmxagz9ny2m03g5fooc2hha46aamrf9wv16dea8qyeptd40mdj08bkrmwkkc4ibzdth4xpvg1v2gakwh4ahwv0ywhc8cclnz9514amcg0ac249d4ntoszwun2lr56wridtrp7nojr1v3ki269n',
                        flowInterfaceName: 'kkdh73kpm3vj5l1xe0b0ovsl4berrxtng5avarow0ovthfhktlpjidluk6e42i1gvm2mqbtsxhm6mndvbo6wepfmvg6jifl1kxmo7amu9l26c6tq3n775zeoz0tls24pawypy4ifmdl5wwifrl1uyx67cmjxvml3',
                        flowInterfaceNamespace: 'jerh1osotzyp1unfh31vkic52lprsdm9zk5d7drt4oslgfko11cklfpsqqwehlas4m1cecvp6tvnict9xzd0ek66p6am8p0o7i16bvw1g34uza0xvieka54281drw9nrnz0iujnn7mj2h35117h9qg0vyyp0e1k4',
                        version: 'iztxo5rm3ficglapn6zm',
                        adapterType: 'i1dv5jsb3on4ineaox84t9addjniefr16rdbyr4d8uh88o5u13of0z8wg6je',
                        direction: 'SENDER',
                        transportProtocol: 'mshk7zzab8fzu6loz3kmdip17z58u12xic9srxi89gc7i1vk30vhau80vmxu',
                        messageProtocol: 'ywrbp1kyu6msnoe27wajd3d65wj70udxtc7uxdclk7fvt3qbi468iht5j94y',
                        adapterEngineName: '4xw882ki4bnyzr5dz2obatkm0dnmohugsf9u9uyrq0rqen1rlip43tnk3v5fjqxqj5ritvooc49k1q9ktwpkg05ulkcf8a447aoan9lja639ob14xor8t1h8ojail0odwecell9nm3ajuxn9oso7fapo5e7qy20g',
                        url: 'y7lc7892puvenmoxn4r1gwwj0zeswjr2gif1w9dsu469qep3xgxn9ypw4sv5vabfz5x2qdr4i8xwuhzxz6zxurbk1fjymjbj4t1nw3ap6b7et4kuwahyxdqhx8hhkuj1d953q9z4el3p7e1yt8skkgc5uyr8h50lxa44e5fpyzcmzolgx53g4x238g52bb04byakou2sbjckuerfn7z7q1xolxo5xe332dhmrinp7xzif3b8xbq2yc6heujonvnvkfvvpsl8caedp4p1juq35r0re68dt2hg7v2rbbc1zfojsrnlggdn7qzgcmn28n8r',
                        username: '2a8geau7r7mmk5jakcng3zk3d4j9a2cqemtoxzd5efqtcr2h32hxy1njrjpo',
                        remoteHost: '473cfe0wgwb1kw5p8v1h0yuw8w5y980xca55kn9q28l7n6a8a7m467fi1ve28mcchd5clszh1zpfnmwmio9xyxq220935zhigr5j0fxbfhbswpsora3ojaa7ggpfirditmfduwdu7ndy9rgne2aeq7x3z27k43xg',
                        remotePort: 9626425740,
                        directory: '2ehm8oo9wsysa6b6olkfz7hfq9hjurtbs70nuck1i61foqkrd2a19iuiehq1vmesgxkkfpeicc0t241vecvk0tef2cj5le2b38m2hy7x29n67felz0kuou1yah57q1hcnmn3zrat9hk1b2k7ktklhp6rvv0an0klr8u2tkgci7tsefaahs5l4o48vmokoedvbwfcy5cshieejz28f4thvk6kv9f67e6g67rg85dl0zabnw6g20gc5spxsem9jfqjl87e1kszliiz4k1m9vpz1ob7a0a0udkif1p6m2z44xcetzb0mxoddrqx1db41enszdorzh27egvskcd37ol51bxg45ywgbhcwfbmehdx7c2g5133wvbkmyh0xiepq9rdp11rimfp40lzhrouw8nh0a824bad57fr43myf65rlqmv36o7mkmyfzb08l6xax09gi7fmfnnvuuqm9hztq27t9hx7hn3k4ko8axq0xfypq0o7bivbwfey7ys0vh85skhen5i1lops8byokc73ko81e37ezdv6gg3zwfcozwl71w792pskkljz3ss52jg4o5gtycfkmbl4q6k64ri0guvt9knzzisnhrz3qkei0vuyezw4tjg6fgb34at63obl867fi6rrzcjr1jfbuleropa4wdex8z62qk93czyo5jg3w8itdekwzeiv4310yc5ercb6d5efbeh4c4w2umx9art57sj6owfofty2ow4rvfgkysj49zbvvr2nk2v4aoh908n66r3bkn6bjlasz0vdnod2zqo8oewuuux9is6b9u33p8bzo1hixnerxqmi4yr7tw3fm8h5hyemj5lej96ni10sdgfpgwsuwfz6f4mmqgzn294k34url4gkmpq8ks3pby8tuj5a0v53zp3qi3r7uqwf7e9gppnkn1dsbzwwlkn37agt3mb9t6wvcuuq6reciwjt35akdoypc1qy5ncbauaak6potac91kpfdyflaxowp5189fcavdx95ykyrh58a8b',
                        fileSchema: 'o3c9tzxj7vupexbegxe63n6bqcv71rkvu1jmv0kibryyroswki6ct35go2ruyezc61utr7bp8f06e6376k55z6m4g0fcajow52otzly0qgpharmybsxw6ocpupnk2ntpck662v0pjmy8b7at8t8ew2t418w8pyrzng6apvb8k8ykoohqctv1t8shiie8azrqerr48ug9zrf25wqq79c5k50p1cirgdztt3qm8mks6hrzthn5gvx224567uz47u5tiuwc97qtxvr7dv0a8oszmf5sxuximfgx7x6hukptvn9tylnyi4ea1rllskleicluaf90tz31h702oza8492vm1qrobptp3snmbm36b5tsn9u033a9q104naqaw3oam1z4osmi12epcm9o47c73fmql9yklbsm3urviwg1p5tt277d2nxglp9fpyjbbrjjvshm9sx9skz2iuheu4qp8x0flbdnjav5bix2gfyc026z6fd6wpbwt7vyvs5gk6jzf4iu93am2kk8f3kji8ncgb5zmoe53uzy9hd6e40rm6nj5nahr4sp9aslvfpjmb4bpsomaj9edzg4ihswhyhq8pcqd06mivszvmvcah7j88fc2onpnhe5awt6aazh82ne2v2lzphab5eqklxc3sqfpcgpbswkfc95r8hbznm3ccpg3x5s0az8pvt59oe7ssabwdj80m4dmwwgo68l4zksfpodm4uxh104z4s1l3jcopmtj2s64xu65kc5bdj36mf12yvlfl9o7ynn7m2zw0tihdt5kidcn6ppobp9gaw52zjch8qv3y9ery94liyfhad1w0u0b9oaq8pti7pfl97w3k0l614tb7j352l792h1cnrx9lt38wy5vfrlous58psu8l1yv2n070q4tyn56up0nd49ci3pdyfx4hzp8hkx8cepwjc3wdurr1jvb5tyaczj7e050wt57i4uw2vbbwerygdi74fxxse4webownsuzrspuy3cj49426nglvdg9a2yp8e',
                        proxyHost: 'tpn5b09rjyt7s5mv3dvfknia6eimmt6nn306zgit6u0bjf83t8n3i0pnhqtb',
                        proxyPort: 5435375890,
                        destination: '7c3psm87piysjvvdtp88ya7by5e6ywnoet0e24e28iosdknpwumuem4oc3gwf4d9wkopzy0uzbjfoh3t3ade5vga0rot2ajpuwuim7cs3mdim0odt9x5fpk8fe1m2jpgmycdz1n1j9w9mj09t28j2owl62ftcdls',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '1mht5vrb1bq01vv5fugo8rcp1b0ufpf67har44rwx1sl8ou398oo8udv97tsszp1t89kv0ri7n56lhgpkz4jtxrwapngjpqy8m97hfl567mjmz6zzepclkrgpc34wi45cqrtrzn9i4i3smxtmedqcjuumoapmeom',
                        responsibleUserAccountName: 'kzjvmdatndkedr96pgrl',
                        lastChangeUserAccount: 'v60t7ylrk9550qmg49lm',
                        lastChangedAt: '2020-07-29 22:49:03',
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
                        
                        id: '998183e1-57ac-44f6-9d00-f33e013e79a2',
                        hash: 'rksp1tczvq5p502m8xwx5m6knkxhhxzrj8tbawwi',
                        tenantId: '0b5f0f9c-66f5-46df-bfc7-10eacde76655',
                        tenantCode: 'pnbzb98i1tofquxtrncgjztqpivjiuna2ahfq65o5kzo4jx6s3',
                        systemId: '7c344791-dd35-4d43-8dac-5d18b8441767',
                        systemName: 'l9c6fbmsdxmy4o3g5v3j',
                        party: '10cxf4x4oy1277xfkm6x1jdq6csazdw0mkb79pialmrn2nmi53ihxh254e4jijyo8yp5avoov824c0bq34dj1i9bmuah9k7by24rkee6t88tc02g0cumd7gebzr96woks3ki7jm2vjusdivt1bhyk5phtll1gdjy',
                        component: '916ndzoozgjwgezg7ed2q54laa8aetbu43i6l57s1lt7swm52bqnewnbgwmp9fnqvacwx1vo7o2ikfhpmh95sq0ev51ysw5trs8lzjusag41l6aff3au8whqd3j2usi8ttupx2nj8z315vcfqugoiygxphvr2vgm',
                        name: '6pkcigb9fdjodti1i95c2znt6tie8mi42gyk1jb81qw1g20g7a9xaeg5xstmn85e15ibliyas369oxan66gducollbjv89894aimskog8i8g96tu6kjfcn5f6d57anzvfsdngmyu54n1xicn2jye0ib9tvfm1znr',
                        flowId: '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd',
                        flowParty: 'z9jtxiq57myvykl7v7jr584a9iyhlanm5o11obq2n6b99ya3snjpoa3bi8wtrnmosoqatidi1uuvacb03r7a3btjeg5fjzbx1wdr0x9dzgxis3de0jy0bj87b5us6awi7bw0ft2o5udzza2y0n9qdn9znsuxnalx',
                        flowComponent: 'ysxhfz4grbkqvep0tiaeu60kh3ezutp32uztsnccugxr97qydwrrstl0uuuywae5hkus2jy5d38v0l7b149zexkazb17i1ax5k61w2gpka1ezcq2343zptdrysmi0sg2idpu1hb4u9vohjnrxajv3npxturwbnxb',
                        flowInterfaceName: 'dbtt3hlh62m0yoqsprw42erdn3lnk6sz9omgyxas5j83btya55qhtg8twi0jfg3lol9mfj3jls369n7thz0p5trrm74k1x5fmr86d9t9leex5siplu07padoyndz84xs7r61562a19mm2yeywp5qify7qsoevjqb',
                        flowInterfaceNamespace: 'vfi9mukvb1conzwpo9c6s2y2zu1u05zwdrczfwd3oht0fjy9kv1cm56yoonpvhrfeqdvlhx57o5vudee8anywoabqhr4j0xln9mj016m6t4ov4in8p5zu8pwsi7uc37n3qjinv4tijan1bb97q5ldno20upywl3z',
                        version: '8i171jinn0zdlxitgne1',
                        adapterType: 'wiyvckw0v7zbvosgr8cwkdzi8geqm2cums156vtunt6v5d5ends90hlschml',
                        direction: 'RECEIVER',
                        transportProtocol: '6u7369hk0wgl4frdf4e25m61y90rhssanupq8ymedt3sfr5ooz59a3arxtbb',
                        messageProtocol: 's6dalw36qioziabq9zo10n9y6fls9xq06mmeffqkk2ge9wsouxwbkdqjk1yt',
                        adapterEngineName: '4r6zf7gza1tblwl7too6qbtq37ulk413mtmxve7epg6r0x4s1em138agjqiviy9pykref203xydc24ahxn23unior2rk1fwk6i3mjm71acupux01kx2okryfyzq1ovl88hz3352tumlldi9j1lwdj26y5ebw0a92',
                        url: 'yuh9bpsjj252csesf5o116mlnfdlae49ay6n6rjxdxqav1qf82empmbigedvs1lxjrp33f5ldkyh7om402f6014cj9kziwyb45y33rbdkotcv6zq8lrkcg7g2ze7gg06tyhgqpoi74ltrhv8ig7hzdrdu7aw9sfze2e1m2lo9fuipz70ittdg8pzu8ha3bkiye3p3frmafnyjn2371ybsfkioxddefyjyh78cdjmdm8da568aiqfz0z5bfw566wzzwkw8q4hrt50mtu1gl88sqcgvh0btagep0b383um51zi8u725d6ouh84b7s8h6le',
                        username: 'ezvv80ux9r8ucwuma7fu0grhzp87nktqzl5f8obyv8hgdgnpkt7e490rztc9',
                        remoteHost: 'rgevhooayt5xrg8p2bt8t33uaew5exvhc1rnxs0nxu24ogxzjt6jh50zg2uwple5aaq38t9xuogd81v6j3x45tfrhkmz2dcjz3iw8pcbx3iypaiqiu7dxmfnc0do8u8d0cpfr0qb7ydfjr8y7c54ste6afob9155',
                        remotePort: 8031560716,
                        directory: 'c9xrq2iucj4203t2emqqllyg9gx888cw00n4f739dkzsabjxk6pwsbcgowg3h718w3vjwi7daj2ijl2o49f1etv7oplwzev5y11h42qymid265s5vtlrlvslezmugkbewo6xbllzv4ro9ueccejhco4wfnon3u3enp59mu9y5hke9auvy02gchyq3xvyfbt696dahlfth3adu3wr7ozwiqwzou1uai3de638kl2vkx4tv7yl6k13wv1x3w3z8qihzzkrp0qflq2go0sxjc5cmq71i0inpbxdkr4te9xpcuzkpkx5flkxlpkvrubs2gk1egac1nahbwuhfrkoelum2xw7xfukqjsfh9907d2mdo6bpi1svitakyb85fs44s0jg83af5yu97kibg38tu5tju5n7gvta5lpavi4ukexa4jbiy3zdymzf9j5l52o1sqgg2u9dv691otbfcclxevwgalpuwjznt6tumkb1qmzrqyu44bjnog4achupbgyb1gvcgpgxjdujvwcwsrxj6f13e7xuoreo0yx8ctlx94bxxk4znb19ixu6g362eg14hr9rcutyi3ibv9v3s12wcp29tobksug52hierk0vbglelyl32gbj63te7lun90hrajqut3kf7jkpmfes9z0cd1hhs3v0085g7c7svmsb03tvtl0h507ilywr9rdhy887vktmgp1kbg4h8t1hck46ciavvf71o3og6sg2z3icw2ri4svnw5mhajsteyxolr6c98gvjkcpkhgzlnkx6hqmpz0f7j382yvms07ayfujiqf3uyxfaiyufzsavypu9289c28khbde4ojlnw705c2zmk5frxxbi99xh1atfu7b06tsjp15yfoyvdbe22t4d7fx2vdw90yz0jmnvbcz33km6okicg0v7ew6aalf87exbzoep3dg2luagqakb7ea72ko0baqj052i2wedyn77k5tk39rssrflbf5knzz41yiilpvpcpapsek87peghkrzl4cd3t',
                        fileSchema: 'jk1nvntjnbdfp118ign4zx4x098kue7mitawviy4o4a7bqr5n84r88f24d8ios11c5v619w7lin8mlzzndghcbwo2z6mo3kvc49sd24bjb4gtpak21ln3aed3nq5ae5iwkxxmf4vn0ztve5037sw4k72iggwids0mxi05l2vsvhejez16zjie1yfc5frr80q3vbjwc5q6fgcji07w1q2q3l3rnag0mjathmx5ii0djn527jlncu13m488or24oh671ti7zg3jevylrli9q9bvexynbblt2jy2h8oq1q25l42uip72p1lzt5hj3ww1v129ojc7ordl5n7r5mn32flm92wcfktq9rexh36uu2tpj0je787pgvwjklmme5zql8xgpn2f0248pg6qmivtx90ygzl408rzwys5n7vfz92xdwdtju0rawue8p2vasp6rl1jpda1wdndubl84ov3kzkhj8l7a8a0eygdnzo4shdwl8qavkazh07lzxifyl80wg2tb91t33da2tfoula9ujol8jry6xamzqztaniwdjvwlksbxyrxa2v97lizht6i1wuqpx6tv96d2nprf6336lbeuobstcxhtxpmdkku913t0916w17wsxbc9c126gcdwpkulqatdzl33vhnm6wunhgxohs8e1gapbm3758oasmu3i60vzgmyobjwgmbm6lg48pj474pk88x49q6nh2j9jj2ycdkadx6fbrnbs4arddxswqjh1auzoe0m23cwh5wy7yblpt3dqdiqqvyo5h2cuzpbhg7kieqn47qjwrg61dfg0sh7hey05ixj7phsbulwc5plzl7rcsxynluk4uv9w0k35g88dmjrqhq7nqv82qfxg2l5pliz46063pk0bwa1hhay6ee90nf9llo1x2oxh1esbj1y8vem4xyfc912mlnjou7hqnlv0posbryzvw91834w7kis9jmeo4njsnmnfxsoxxvxm59mfr1ptoxgzalylxwyvup78dre5tobhpfz32',
                        proxyHost: 'lc28utraofgl420hmj5ugbccw5l442zovjzsni13wtmz6dgvm1v2tbpa3t61',
                        proxyPort: 7181433741,
                        destination: '43tlv0xarswuagdy1nrq6hqr4z8f17gizomluunshy8bumlqkbbmtibl1vevleipy0kjebo1k9661ora7kxayij66oummpzsmaecebo6rkg8xdci3027r64orrrg2csf4uzmi9vngvbbxcx9ozngw1b80lzwgwnt',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '04z1zaejg94r7n3rdtxmxeutypxif6e8vymj9d1btaxk6z5lxu63kuyph2a62ilz5jb4ya1np3ygzoc3kd0d5s6v0n7oln6251mdhgahv6vjgrufpd5apphpexx8ixyya8vlchtb46c887r7yrws5wph537vafig',
                        responsibleUserAccountName: 'bpm17ow8knzlo4fqhb8a',
                        lastChangeUserAccount: 'yyhvzc3jfsdf80f8o7mv',
                        lastChangedAt: '2020-07-29 22:13:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('998183e1-57ac-44f6-9d00-f33e013e79a2');
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
                    id: '3e2f5fa9-94bd-4d4c-80ae-76db56d7616b'
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
                    id: '998183e1-57ac-44f6-9d00-f33e013e79a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('998183e1-57ac-44f6-9d00-f33e013e79a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});