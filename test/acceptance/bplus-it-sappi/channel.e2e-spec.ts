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
                hash: 'xo88i0go9hd50oqqy9qd9lqfjl8umcn980vtk2tj',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'zqcgqzarygr3c1o51aova5xikbip31lglh7j85ljqf7jp3tosp',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'w2izm4uw09hh1ohnyods',
                party: 'c0o2zy4tkqzao945n6snkdgsofcjolwl7ytpsl4i58n8ck3px9m336ll13866d38gbefp6e05jym424kcto87h97uqeo92bxkfr9q02dxt80wnrh57vr595rai80te1ekurskw5dv50g5dmgl8lr0p5zq9q966vg',
                component: 'ehy9ke3aatlwrgydt4bww351olnczq27zub8z9jn3pha5afphu9rslgcsey0ogutzgf2uz7bc0i7x502szx0x1ignahpdzds2atn9csfxpwzv7ris3dnf1uyts7m5wocasd3fzkuvdk2dk8iaseibo7yd9nniz1d',
                name: 'v363r0bg7j4pjewcaaar2pw86wjdz6kp3ssloto3fqrju45v4ia64aekq76ilapg9xy1o3da3zd8q5p6xjetqvb6th5be41k42e2j1wyrstg9pn2uj5is3gfa83y688hu7ibv79gaiwm2vkc5px3k2nq53w1wssy',
                flowHash: '5whnaqiat4yyuawy0p0w8wvd8wmc8x0has2d2i1q',
                flowParty: 'nj73e09ycwrgzz5iwl0g4b456mqupduh2wsrdnwght1bw075e18a83v6r76afocdixk5mqdhqrjx3kgk2gmw1jisa1gv3s80jl0bxpoy4a469n1s7f3cf1jmwzl6t9cbn28m5qvc0zzsl46hhial9by2wprjzonj',
                flowComponent: '6tviaypnoziirzchc22un36441tyd40s52717tab740hsbkgsr85xd0wur188cjqelatcf799csuaaemvvkiy5i6vwzvpkdksdzq5w42rb44q9dvajtzxzjdfkf0i2wm1wr0qzjlsasmj6u30urudjynj70pjpnu',
                flowInterfaceName: '8m5uvmq9q05y3sghdr3ceqqt14p9rpw06znh6qahr78y4z5nbt0s9ycxeo4gn56ts1mgg8s3pcik29rbc2f85ljoj97r0e6fm1krnns6n43ct86pi16f48atzsvatdbq4u0a46yao0e16p9gqii6v4y83ytah8p3',
                flowInterfaceNamespace: 'qb73l8pdw0ps9r068j8b4i1p0jgmh2dvm53rnctvhbmvrdy3dhrtqyl9y978gjd3dssppegtd5uf1yb2eo3eoj3pju48m4auew44ia6tlc1qbrrzndp2zzzxido5u6er2350remgdsfgk64hh1vcee6v2v3a3n4g',
                version: '2fpaevzau0zg8bz4ai0n',
                adapterType: '9oqfd95pitnfqd7z4zvmb8trhuo1ulrf3zpurvztq77swd5zxzest5hptl1k',
                direction: 'SENDER',
                transportProtocol: 'ag4gkb0bdza583nnyaryxqimvbldrt34nv8kpwveh49sxyghxzkgfqs30893',
                messageProtocol: 'pokq6ztxe0oig57j8u2quj9u5au0qih1mis7p092ur8tvbrxctzd8fgqdqky',
                adapterEngineName: 'asbcrb9lu3av1wi98edlnxakt44muzph8nmd3dtysjvnz9qtntgh22pouei20gd7t5uqsk85xko7z9dg6mgcnm8vy7t94i854ioeatlohrn2uwa8do81oogcady4j39a75lokw1vv3dpw3vc0pqbrbj9rqp87y1g',
                url: '7awkgdjqsuj648l86r3wt0jh7feaqslvjh5uwj729efpn97x9efyxm6uy278zx44f76hjhha8nnpjt4jsid111aq1ex0fmn0i2c8qejefkdlpt2g5oxlz0ac07739x8wbi0j1n3k761h3mf468rj9b12p6c3x7qvjsmn7wyiii8uiuk5qlp5s9vmcttrxvea31d4zak6ji79w62b1rmtcfpnhchirmdfbn5mvb1cein6psbr7q8pd3hawyjtg08lqx22rm0k9qdqp8tcn28458mvya6ttgsuyv96tb0yr3111362rcejg6zy9hocrn3c',
                username: 'qetpf4765srknx5vj5ktqsvgkzg1ne6rqccdwkadohs9iv9kiyrahc3j85p8',
                remoteHost: 'so8lomw4nsdp315855y8yp00bhwqcogy4dd66k24bc2a7c7m0u9xohdhioonrblxajsymua64e28mbhuhw87c48y8e139daf05k9d8viycuk4dtnz4v5486jobdxsuufmyskv546djhwc632y19sbs3geb8aevj8',
                remotePort: 1658732034,
                directory: 'zl18yk1tsl1d7d5ge9pjq4hhlzwl3h8rtl5j1ip3uzlzypf3puns95snjldobzbmzvh2q0nac59d6g2dt4yu2l933ei0ufzom4g27ijx6zi2zhwbt9sqcf5cupaxlybvhc5ngy8jtdseuz0ycejdgbxi3scr59j04qihdoihs96vazcxxfl9i3mb1ik25jpac7m3qwrw3hvy4fry7ldzza7wmk5mw25ky3lj5c4tqobxt8jo3llia37xjk2kxlzqb03m1t014mrn0j7n8ux9et9ukadnn8ekc6c0ru9nkafdzcqpajk9gurnk7pcf6delmbm6t0f8dxc0u5p49qbqx6ihn0abwl0cj97h34s8gle2bysan66ggvcg6fhzrs8180er6ltwoygtcig6v97qv8jkk0ecx1rbk201bik0rfyhpjknb5jcum508bnr99wnxqoqisdnmdu4jn3r9ypus7mkj8kdtj2gjcij71nw8evrqji23pk87ed4omx4dbqehyhihrxkzurny6v35t3zmp8nd6jacuu634pljgt65kk52dpy8kjvebdrvadf4kc762t5ytmk23qvtuwu0tj3jsh2jx1zzbvan80kjbcmekuwjtx7dq112nzhfdsslou9kmhavee8g6p7bm5pcibsrebzo49dafmfjzzb8ewynytq8b9e6vv9si5qwepifzk84f99p9kncx0p7yqj2qyro91gap3ndqp7tjej3bpmsm41itft63vo4mkqpzaew8sp94ad9a6flnnlc7tzedqguzfprc1z2mjjp6swxzd5nb4ss3gopst4fq3vdoixr5pu0wgrfu3zluo6lhxj67vq6wo99395l1cz2vtor3eauv1ple7iyau48slms4eha1uc053wzxq0wnoeva2ghygmzha1zm0xopj9ejetdkjxoadp2yortu0at06ejykbcf69d4bdpaegx6en0fapxcsqkw22aapogjjy4to8nxpp3y3pn1kmfe8j8kuax5geq2y',
                fileSchema: 'gd2uhhqaloutnlczh4pgenoit1nhnj4i333u2s9j8r4fj60tr3zpt85nho04xujl7edkfggq7cut1km8xbwshqznj7mboe96joqjww0rx9zl0u499p2yt7dfl7gohb90l3deuy4fvwil97oyt2mdkrtm59td13xuub52h4k8yvp00eavyas0bqzveknnrzqifcb2ec5dzqkq03rcz39li369ojdvsd4683fx7psbvkhyzur4b4xt5x3rkpw0nqv4yk3ariswfbuqvv1zp9b95vc4wn0dohlxnt74mivmpdqrzzwzfqmm3kenajssd85qvd0hfaxo19oeutf6uc3tso1qf9bjro27fkt05s9cvu021akn3k7hjjztxez2ftpcyd7ux05qbuys184jbdktiraxg89z5xpxx78j0kbsprg2grhk94jr5g8j1nu9c6x0n3rov56pu2n8u6usk9blwtg55k86gopxxydfdxatmezpq6f72bk8wjf2ytesd8i0smsull8le2vju7jcc78ejjlm3qv6rwn95uoippt3gx1keulvjhp8eqb0m75dulebd7730vi7wmc3r56fzaicd0eolu9n4pi13awknmrosd669fzm3agphxgakuyfswe8d1umcvc5z9memjwuyizjgi2es3rhebxriqxqzqzpb0nahs394rjsq95ld2c3vn8byp5yfs7v6bro0fipz41qq8yrb5de0chenzkcobislnlxl5m829bdi55udonc6e97feanlz7iy6vmc4txds43quoc80gzcnz5yvw52k51ekkc6tixieybgatyxsocps44srgphbhkei8falhhwkhz3gwzdo44f8kkdwvsfa8zfatu5r5y2zauigmru4zzsjnh5bfpao1qof8kwmgyqibitdhb9lig6nfm53ryj9e9eyisrt4xg4e10u178myut0tutkw51wtjg2t1yc09uye7qrujumvzxrre8qh76mv5ymn8zvrcto0z8y316x1fmq9v',
                proxyHost: 'sspbbws48puyg2hj9m9cwjvnk3o1mhwj1ptippqil1ernr3gz9i373j8hqe5',
                proxyPort: 5568564903,
                destination: 'fu599c9goi70wx35yoey33bd59y48psq9194wr051g59mp1mke0ex4oqnmdfcjhch2uawykoqjizk1bu3pax5kzr870p5ph9ladmpr8cqaqs2t02oicitp6zpd5ei6i6x4ruhfoim0entww1o4vvozis0rl1mhqy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8ul0u1zk1xvnyovgg7l9568rgrwkk012lr2bhkd9vxqmxxdskzmxzrjjlz7dg6vgd6zieswaqnb2qotlqxjbkdr159sbhyr43uonnxoqxgn0dljo6oru3tyjii81wq2fpruri1i9ny14u9x5lgmn3073hfxz64ar',
                responsibleUserAccountName: '525qh4mwxzvdfto7ymxm',
                lastChangeUserAccount: '6av2v65zq9c4yi1xmoo8',
                lastChangedAt: '2020-08-05 08:29:24',
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
                
                hash: '1agt3bzduz1pmbgjmc1nhv47onoauuf8tgvvoyln',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'stc3w581xb7m8c3qfqjp7xktn9on4g8reenqi0u2zf9r1x8lcc',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ri8db1vx4nogch38bjbg',
                party: '0fpnc7cvk5gxv4y6tbhycuigsjfrgkjtijgxwg33ktc9ju5tznfp3qjtydkka02zsok52v5q8vg5sqmrjhuh9amef9vlbz9pced76n9io6kji1vdz6s4swzak4er2wup70obnv7m2wsuzhlauqnnuvtawsc4l21y',
                component: 'ss388mgokp4c6yv1p42zuy56gig4c5z2a3rdo6vwmfyf7bqvxd6064s9zw2sduggiot0sngb5gv9paagig84tysaj1aibp0civylcelzlwwm02asbanmegppsvgzovgaqw5jt0eh7puutv4lym5h6pcjfu4vjj7u',
                name: 'olz1sdpygv09on1oj1re3rz4xsolmcfjm7k0xinuagb5awxnjivcxuknx3erkjsv6rpszvbe3s0y12epd788pjmzfovz95zho2am4kdab12pvpk36pfcbyao1uf633c4ey9odoqpl3mev99wcp5tczvgj108scrl',
                flowHash: 'izwjwjcsao4jpqx5rq5gxjv3t039kaygn7aejnix',
                flowParty: 'rnkoini5t2kq5ejjlaebokhif1rg7di4xog86gujbbl416ev7tk26f7xousyl0rm2pxal28lk2kiieqyjzwnrejmml4ec18tmv55ducobcytb99szp2l2jcvxwy92mnnlm4mb0x2150btpvj2idbo62eoq7l2egx',
                flowComponent: '76xmqpk3ynbza2dcs1anh6j7b6xj8l9jjujxru6ss0iu50wiqcp49n2cwtfwd4gy32qcic8jm0bupe6duiptsffoag60q4ro9t49x6fxeghn6uwl8i2b4frpz6c258eqlaysurjl2uho84wy4ogzz8lk1nfh1xgf',
                flowInterfaceName: '1zoovpyh6djb36t1dlnz5yottzsxop9wugtpp9x2x6e2wenx20cv3tfwjm0enb1gw5ojcx7603ys5j9iqpnap2fvuef489fq27g3xxk7kcyfps550a7d5hi68ko4cc1eaeju5d3l4dg1e3hs29abi9mqq07i95c7',
                flowInterfaceNamespace: 'pv1dvanvycdub0urfokgwwwbsvn44cfwc03rga4ruywp61tbx2vb7tybzdob4pgyffcajysqoet2igv15hro2uvxagwvw67owiy5j83kbmew2fn9dqfm7pd4jcr60kh1jc05ks26ohx1839jk6vgzmr1zzyjiztk',
                version: '7z46ze02pmhg3q9j6bvl',
                adapterType: 'of80frrs20jk9j98zqbj3quzbn5hbro9d1egzlnm0whet8r948vssw71nn7j',
                direction: 'RECEIVER',
                transportProtocol: 'rh4fds13gnwcn14znlx1m6kpdrw4h52mk0fapf1ct86l2esn0pwwoh7m69lz',
                messageProtocol: 'xaj05togs5bbw59px2qe7stadw7wcz22abr3qt4ihyvhect1mxabe87eziw3',
                adapterEngineName: '0uif7ndrlxh3cbdqhee65jnb1pe7hwiuib933zd0iwknnrtvpag0jl5ck5sw00o09fs7emaq5tsimnijlf2ecrt1r4pvxn8eljvbimucjdcbxauyx9g3xmnj5hq3ll2vknksxl9xzo2wdc1hfz5ug6yczqst14zd',
                url: 'ml45ge9zwcfuuew0h7hy2j2zy7w0t0dwruxct9n6hnenlifuiv5xrkdvdgjbjtea3q5dx3sf9hiiwzl7w1nwwbp36zypdifrf0eei79gdgp79jzupwv82ud1txad9nw53797v4evbo1pnfsiv4eslr927ph07b6dfogkidfft3nibj5zv8z4zxjugw9w4m81qdwkhk2xlb9o93mtknclj2p6wtbevorim2udpuv4zk05z3csi09ld4srelo2dj1mnase09ymb2o6pqvdwaq461n1ee643zmggzgnlb63isp75uvawwaukxekq16yjg6m',
                username: 'smpvr90ijxfh46sg0qjq6xt8mbwrn1ko5pszes1888sek8g0npphsoeph0uo',
                remoteHost: 'ilhuzxt0rpjpj8w2d60pdyo130wfmrb6q3s3ozvlugub2jf9y8h5z4tin314x39621jfb81m1hnk6r1s1eabw8f0oy07v3gq377zfwovut2zov3716q4mo2fxbdqnsa6c4lbvsuqwtlou36y46fyygxe51uz57u1',
                remotePort: 2800737295,
                directory: 'hkakx9nyzst23g6pd9y75gtn3yf1tvl1k0139c655h0xenuewskoxtko28loeo2epptw2x5wsujzkc2ezcgfra8hm9rnlmqc64niy2x4ps22oqlk2i50wtoizqa6efupxe8v69275ckxl4g6a4kqz9b82gryo5yozbur7hg8k2axzkclo0gyxcxn57bejfd0atquzcdkv1dxkoc9ej6kflt6pbswrujmnp74eegsg6m7xnmcq00qxwbu7zljidsexjyx6tgo56szym9om0e5whgbbrqn63dvxpxpp0fi13jsnkx0u27phmjymp2h5q28uoeeb6apq8tm1uf9iv33dy13y0uathegzghegscrw34tvyyuslujx49vv2z2nndlviaznvyldzilgsoowur7fn0mxxxfvjt4qediubuimsf7t0kkyn5ck3fwv0w8f56jml9ebxpz2wof2sd4z90ye78xju6uce8t8zx1xatxymz08mqchaqz0awxy6oev22e6e583aifzae6gb0yhr4gr6sgbqg1dy3dwfuqdogxyovhj45yu0cf5lyqzetvwxg763bvjybxb7sdpz14hdcqr65qysi4aokelsgfo67dhadwbr7il9i72cwkat6u73a2deruv6b0jvdcgib7zwqvz1mrjidqxp7p1b9h1x6y2k1wlkfazoeld3yzasxc2tfo8xqs82o1o0s8o0wexhay5cm9sucwwrtyivdph482klwwrdqhq4tdyl846xtd07b6fw1233swvb3lwsywpukb4438jmwjqqu7x6c3qrh0nl4ufbtsbzfaq2iikm4snqw2hogn54qz0n4q522kec3ihqf28af1lh9stonpa24bj8beklndobwv8odubxom1s67ns8txpr25a5939ge41f7h4jevp7g9sjy70o609hti8gtdqhsisngt4rjkq7g4zpo0wjs5ziyjwy4l58xqp1r6aec3a6fq74v612s9ao4wtkk5avm9uclspgvh200quvb',
                fileSchema: 'whhc8s670m7t5ks4xt0xknep7zenf9wxc8qcb5zabsr6xtvwmocv5zekli34nzfygop5nmbnzhycihed8av9f4doh84b9ykvei200vuosh06i8qf2azysrgv3w4enuwy4yq51yrj1ytufje6c57h8ux4zhqgy7j3x982yxf5g4ayjx3t4cvt51p02kyveccskrgta1nqmxcte3c1nft6f6jryecdzkx3ucxa6l4sqftg401pvqjbesoov6pp6483v0fwdwrftgwb0vulq1v2elup11tes32zem0r1k9z31umhzjg6fkokagkubw0mrd24jk0dpqhz3nf3lwb6pvxlpt0ciufzyeuwyaplm9voip63a5xrbptm0u2cvjxjrcsqw57b5p4b81mwn0h2xunkeurlo4y3oezm1hypw3gk7ug2n7uu6ay2vxg6i9637b47dgmjxnx2kwhma2s4it4gqo01o8902qsvc8q7w7jq16aibhd0f3t8ubzmkxcpcd47jntbe3fv8fcf8awwb53pwscscp7v07y3qgkz1o32unb6xqmgs1b2x73tt9xgqx4omyg8kvctjhvwlowff9wwj8hhw5kwwlze5n4e9afk1pxyu60dtz6nexn7x9i23lbqx5rbq5dqr4tf5cv29snl4rlj2fooa6jlipx7tyyvjuym9n4fj324mtry61byf1oy76xnt1linv86yhreslw4mxw35cx0o2eb4yl0pzf1sexho2y5tixntse4ujgcywwqwsteavk1d9scqtqt44jnobxpq2q5cra5aephpwwznsmb5sfszki492azbmie6dguajbtkhe5zncwuvddzaaf9dpvhidfd6u86xust19v8q81kkluqoq3p53wfe8kc0y5va574kj6xn2un6800nwckxi2muca5hinyquxq5jotu3xvhnkmsxe9dsrae2gy2fsxknuovq3kd712mff5ey9pkjg5u6w13lngli3chzat39af3n58w9hrzapou0op4j',
                proxyHost: 'smkheregzdfgwlq97cwgq4aqa43kiu5xl4q3h9wl0n1n2db016alchm47c00',
                proxyPort: 6629387602,
                destination: 'g3z0t0z5b8ti7udqpoafzjc2gd1y56z1ffj5ym31c0z1o2t7qgebktad1sxt60c9c4lrcztqmfase4z3q3vurmfkhmbui3916ldpg8167ontjc74ujs4cgrwxvsi5479g8k3t5p52yj3gbsl483819hboeoswxl4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ma6lciwb15302yri79tlycws8m1eecy51y6d1h4pz0zgq9xzrnhc9cuz9s6mt530q9kckn3bdj98pd4u9zlln1y4doamxowbipinwbgdvmibjs9vmiyr14o25gq3b0xytk2fn64wq2h43fpix9ewnttl9ndh2kbe',
                responsibleUserAccountName: 'de81tn18jqpc3fmrulvu',
                lastChangeUserAccount: 'uy69pwp6oq8c4qnnlu5h',
                lastChangedAt: '2020-08-04 17:19:26',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: null,
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'zz3k58v9ssmz5gdpkhvbl9tgiq5xvrvcfo7cmiqxfzhhw2klei',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'fhw3b4tc0gc6y9ckai2y',
                party: 'qxwwzwhc3qmdd7ltvddzplv1rb23hwbivboidv2zjpr8rsr8vfshmpy1b2a1vpi4i5zakmebg9qf4d0nmu3s4izkpux3tecx218n7jqkxro761iohibyhpadvny6k9o5460h3rr7vk0ik4gum6h7eeqp1zuqq4pb',
                component: 'nh43al6bqhuenfupe8i5p85rbbphcazk9htpcw2edsjnglff98tw9rm0cdq0wn5n602o3ifu6zrd0gckel3qihvyeatth8evefz9rqjyqzjwp47juyrb8l85zqo3wz3pmuajo3dmpz42kfbzninbmtjewm73x3b5',
                name: 'qu4l4bpc9uyytju4nn764eyebdtskkc4kg1qzwrdn40qrcvn89kitht8r1j22dkt8prkuvlnyd4m0c6rxv8lqf3u2su2wzx3eycriuncau2qv7jfxqupdk7ahpq32ypi0kw0qonuhkyfcq8pi2o6o0n4pvu905aq',
                flowHash: 'b50zbuh2t7p68pj4j78er9cyv6hsa23ksnu4vnmo',
                flowParty: 'yy517msa0drfsqw5c4j7xkc9gnwylay3jxc57entbnfn7slhbm8v07pm6tk5kesdeulwtggg6870aciwu86u770os8rlt3vlspmel8lsqtmuiy42cilij0m7w5xxs0nbq5wd6q8my6gdeq0illjkf1zkkrf1t321',
                flowComponent: 'jfqhj7ms15mrv5irxtp0afq16jj6zftjs6mh3c85rszop2o84p0t5wp9fy96dlqp8gk58ogt24aporiwaudaci2vbx5p570qpsvctu89vyx4n2nlubl9su7115qeddv94l2vujgcjp63i4r0l6fvx0dp0pk77r3h',
                flowInterfaceName: 'gb3h7jfyfrx0oz2g69vt8jt3gpc9x4ujbk5w1zz0tpr0jsfd7uo6961fkg3qfd2lcgnhuxmuelujrjhap8sx6euwr0iyczp12vg095u84jx9n8lrjz5rz3fcekb2i67sluyx01wd0lg91olb1a737490k52r2eq6',
                flowInterfaceNamespace: 'xq6b3gpddq79spwsxrc56ppk7b9zhn4gxs1kwgx78p2gvxfvv4eqx8c3qktptdja7frrytz9b2bt1uakxnye8w5myqiedpgml7wt8uguoj5mymvjpoze1uk2heu2x6xtah3hkn4vrt0wye3pdre8jq1rthdyyx15',
                version: '4kosm8h7atvxl0linvei',
                adapterType: 'yv217d755mzukeqs59agyihvzd1b909x5tlo5i38lcw2xntns5wnio9kfte1',
                direction: 'SENDER',
                transportProtocol: 'ssyy4yousus4akgtjb337ug9prw3vbzj7d9zr6pjr4t55tiwe2uzojg8ykvw',
                messageProtocol: 'bifrs04kooldmz0wxzl8oi7xubjz390rc7o7azey5vx7zpc2tkh1r66dypzw',
                adapterEngineName: 'ap5xishqem7wr1kdn5n9llvfnezb2rko1vpl5p3vmcres2dt36hn6lyxja7osnrnrxe6dc350kttr49ckuu5wgk10g4pgub6ts358w4pphdilxi85srtxn6jmss7uxzkaubcgtktmztxdkxpwcozex7gic65r616',
                url: 'e8tiobkwr5o96b4euiddznl1dhk874u4fz30q6q75jrl90r5tpi759w6fca2p8ldab8gh46m3daep1v5oc059qey8kls2ivn93zzpg4gx0sg6r0r7qrxr5hurhljt3n72p3ut7oclgbphbspq8swwjo37696yx5fj52kzid1nwdl1rkc2mm4s4twl4r382jjlhetz1fqkbedaxm15qzvq2vvejks30r34t0xb4on8pfhkl9351p6qzarox7q6bhg9pgidxmjke5bccd9ihduarvjaj397gh8np5mgwpjukqc91fffayswf9yrip6odea',
                username: '49rjskhh3gce63v0v65d54cdgbiyf49w7f9yy7nn4byhobdjn30nqm6g7zd6',
                remoteHost: 'l4d3fey0ykwhbuvac6r1sjwbc7kbzaivzs0a8wr6j767i647gnsv0qay4vwr0fiojsyyaczsl0hqykd88565kp306bxt6ivu2jczzbfangp2a756g4lz6c3t1vnuxa2kebdrsi6am9g8p10gmp7fcpzuovdjfdho',
                remotePort: 9624473772,
                directory: 't35wai9a64wt5q4clohrnxmwns3s592vwm3tlr0ka7xfq38woeiu7myg3r48rtghz0mjcu4vftpzk93wywdged4tc6lj5bh6vpczpxvzawuvr6gudpaxpr597lqq19mri77y5b8043fmr8krf59x5tn0zy2fswfjfwe9azo13okfn6iwc4ijq1mxx61dlp1c6ncnsdnt5tsa5r06bw643vzwk31cwrx6dbkk8ssnx183wbhapyzhuelzm3dnqz5j6bxxd1quwah4nkn6vpjdvbv3y1ux09vdl4np4warzsidf64l8mq6ba5taojd2afbxxclilwmv6loaad675db2undxzp7uxrax8ta2ohv48bgvigue9ounmyclb049k17v0cngp8i5cn48b3am1eocv7a042q29hydujajcj8utx6k1a5l5pqwz9895iiyx7p2tazh6nzlhniv72peo55k9fb2ed2cqs8g47bgx3d84q4nhofhij7ytc1kncwgq8vq75hwjn0waedb49u0x25d3ps201b9mihtjqbwf754zrna72lw0wnx6ax8d8rbv80f0l4wkb03c11gkbdcpz3qz81wci39ewmz87xatins1areuayubnoq8s2p17n70w5iptfmeq0oyn3qcur8phvaxn23n2jpxchvo0k7mpa2wv6089p28lkjc3cazs4k319tw7rynoghjf5guoezjg4bb9pwevjr3d3qyc27o1ttt5zcvs4peycyrpfv3c7q7xqbwxuphv71m3u8w8rb6pqs038api02h10nx6ss2xpm0p8o3xbngyquyj9qqmu30oz25qgaueac4nflxn931y6wk3m2v74tosnsra234aw5hmbe310i1zs4vilvlccau6dtr82byp5th6ds1hsgp5j8hmh5usau33sj1o7tvlr3i1g49t9w8kr7e3ya0p7m5m398h6yo5xgcm1hx78vub0kqgyjn0rzdyn8vygbdcwr7dwbly22zvayibn33wvf8gs',
                fileSchema: 'ysrz0hft9y32t86cfwk8irxatpd451fouxrskgkr8lg1oec139sg0sgym3z1uf3w5zkl33iadif0revn0xulemn76zwa7p8qnd2pc0reici7iw00thgkwljkzl2q4axa91q20p84p2n17s6lqwf7ez2pl1a0a7yset8x2v4iu9qamqs8h34m3l477jyh172r4m1sth9xpootnkob9wfdmejgbe32ps7ghkhlgslwpn97i71cymlvl8ku1fetmiz3eeev4iuol4er04tcxq057g75ol3c41snrwdjch311beujmfc4jnk6r33j3f03ave36phs5hopvy56z14d8e5conaxc14iyjnvvkimbk7b2c5cgbsm2pbzv2692wkrnz3v5mv7hy187hb9ogssfsvt89wr4lml5bp4rms54a9jkncg0o1oob45f00elg2zmfcn1whqfcprf513gglxy63iqiny1mod18yjjzfi0hh28k93jj4l4rlzgt8g0nlmsjorodz81haja72zimkizs19txedragfitglnmu6mzbo7bhiqk0ucq5h6rtxrjp39h8qtf79v1xlby956rq4bkcg3d4va901jxvl7ys5h51z5ov33ozcpspmb4hpz9d9ajng9mj5f0ef3k7tuf9ux6asmoo3qu06sdmnarr2yu5woyqoz5p4byre80tqh8nd2g2qimmd4ryyke4rte3hichvy17pgt7todeyzgx52ugevr0jf4yuo2qsp73saifd5gsoakwin6695ayktbmc948au2d1aympv89731sdjm1zzsz1xqle7rl5qxzmtyrf37pme7vjcxhovvv1ya8o6yeoh0xff7ouv07z3jm62lyyzorhg3d49ld8aobuewicqvijoqlit253c1w13da2eru5itus2u4y6l2oz3uoa560kenapfe1py20ao37b3cw7sjfm0moic5qczknuakapo2ss0nh5vunvaqjoyx4b4ep3jy3kyi7vv3n6fg47mqhbir',
                proxyHost: 'aqxyp49qwdjxqkxh3jslyfwjl1svj8ow37sajsrgq8g6klpsctjgl686a1cc',
                proxyPort: 2357775507,
                destination: '0uhnm94bxchhprtz3wc3dj3ewjk889e5psbir2doc3ay275v8pwh8vxdbdgq6cqueo638duyvvgkenqr7buiiw8jdo99j7nitnu8eoh7t06jfjugmjq7oxgnfys2jdf3qs3i0xd4npx8e72bmu1hpi0fsmbst0w5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wc4izknd0tjwj4uptho2tqdsasnmvpdmdr2krugc3yyqxp0nyej81bv9dehrbjhs7gljjbqalem5vgqyhn9mjshllpwb0hwcb1o2d5yz0wyndoxhgaodylclusg05h7ghpb199mtbc49nimmyoq3j2hsyq0vveo7',
                responsibleUserAccountName: 'qzyr2l8g2v819s4ve6jo',
                lastChangeUserAccount: 'kpdmtkg1bmdd1lakzfy2',
                lastChangedAt: '2020-08-05 06:27:05',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'fjln52yrlif6ddr5dj32tvbrrq2xv918n8wioo8s8xx1w0gkq6',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'hlqsw6wwa1vp8swy3ipj',
                party: 'yo1cj4wzew1d8vvujlcizprnu97fy81lvnp9l0pn6e8kp8l3aj4nw3urhmllnigvry64tpynj5075vmo9p8kab5wgroxdtozmpbmbqg238tuamjuluovsj25ibhhmmzq0crrkuvv4fica5lh6rz94dc4w28hrncp',
                component: 'mda84g5g1t7ygsi4hflpijnamqpp5s7yecv1rlkhek7g4agy7akqji0von0badjm0v9xmsw92nnyf6d4qmf04dwxdmfe7aey0zgn8rnndqtxv3divixm13texz3foipqpj0f4hzzwgx1ojtwxcye34nu7zvlemcq',
                name: 'cphkwzqssuzko9w9mdp6rx87balmh02lwyve4nxhppo6c0evariuv4yfaoijen1fxsz599wtvyiajoryppkw5cj507tfjhgnlan9rnxrnmd3nwulcpuh6m4tgal7jyh0xv8jctebceff56op33tfb6ocb48j4bzb',
                flowHash: '5x0fs6sbfh9s808u423zu5tnwkt4fieg1lsws7pw',
                flowParty: 'abzn04j96g4mwuc4ph2li5krspro9j78qk7j82yfxx5u5zo32uqplb639cbongcvu7cth4tdprkcxewruhhg7gdh89dzrmk6icx51drm75ktf8m32ecf79ii64mp4regwdve75ddekv4uu8x3cs5vy3skjjsvny8',
                flowComponent: 'kvorlmricb9l6x2ng4k2brwyz4snmavkp4hl9q9s990vqo3qfxuj9fe1knwkxwrp188smtw2wrso9gor10yabwptj1wpfziu7w4sznk2950nzn7v9p8tcw62uld3wzzs9ce6z34g3ljbqe74punfudunylhxwx5i',
                flowInterfaceName: 'cnmp10raxff27xhi48jz50mbew71ucypd8s71avo04vembn5pieqf327l72rajzh7dge9yaz0suk7o8p22hqzynechpw44w3fp5ds8ib39a7svdtgazm85a98oi37glbiucsqd0uuqkfnfdp0maff6de1x16bsh1',
                flowInterfaceNamespace: 'i0foqy3iiegvfzj72p5gyu7b70om363riwyu26z6hqdmqqc5hitlqrc9ganlc2l26k2z14yykf2r241gxn5xqypd6v5eq9t4sd6lf557ii9txmrj54olftunlkz1dmx6f95qg3sq1ihe55hyoobnv8f56n6jph27',
                version: '9330hx88u1n8c0h2syvw',
                adapterType: '13ihd04r7mqr7z4p68dtd102yu3ekp28c9rmnniowi6r4bf9ztmlcltlj1s0',
                direction: 'SENDER',
                transportProtocol: 'pnwldg7649tyn61mkeautp67efb821n2i65mqsz4896wamv2p63s1nx8ok6j',
                messageProtocol: 'vaujyv1we3901vm13no7s76wmt98c6w3ihpqhmzda337rixqr8h3fuss96oi',
                adapterEngineName: '77d0fs7mkvwyhix0pv6wphy37qn27xxzer65ia39c66xjyzc7bjtjouawc1lazmx0hjkoonn3btbu2c34mj96v9cs8jcwf65nepkj5avv0na0jb5n3gya2jvggwfptzpwqwz8pxnr1up2kam7gnw57pe9dmstqwt',
                url: 'vtltg8e4vawi7f4tcock1chkw92387qhkmweh14j11zviy10iak7jesfe6he8ydy3o0wyv6t5oxqnudl920bctchwysq2rpmdx847vfz4vvamgwwdxd4zstwvfsrsjx2j9lj87qyweatjy9ai9btrso08ub0t4p3rhjan0wctjb9a6fe9x9v1m6m8zthb8hjshuapynym97sif5u2cyuvussnvj0wc1opaq0woj84gx8afgoynne5yh5rz2bp66j8mikvjmri3j06v60axyxaijy6k5z4i6rz4d18gz42zyraqpgj8p2igbzwthan2qw',
                username: 'mskn9xxxoa4rilt9ljlh1qkj0hr0jb99tfmc50nxx9gw2h78hx4k1a08lag7',
                remoteHost: 'uqs9bsggoo6ughgazz0gx0hv3w563ioi14lcinf74nqymaohfwl8jeve0fcbql45j41lhr7xbslq8wzbbkztv9ezmghukzqiezheyvrwmykjug7n5thlwrx0yfav7mzsioa198wh1ccb75jsyxnetfeor9h7r18o',
                remotePort: 1420385906,
                directory: 'd9ug6jtx4j1icir808k8trpy1znqismaguna60vf1kn9nz7u3pg92sn2zlprd4pwg9k7kx80h5e4a05qmpv8hqrnn5f50afm04b90togl7m5tnzco9g6drasifq0663748ojp9rafnbeeuh08q4exv6bzi1oirihvecx1nroh99n44oqxj35m694s3o0aqlf9aqxehhgg1sv6yk7t0pdeyf6xmec9znkzva9i8732kyjqj5iughka6fiml7640d72ifxzha5i5ii7ne49i7dr15a5kdkasboevwze01upiv7fc3j9rs9fung4zyvhmplyqmuuviaayau7gzcte1nodwih16yawv9pwg5y9h48jix68xxw06skarjqeb3fg9qflbskmy0e8w6g6nnfw8p968w7ri7qsrfvcyn1xzhxmldp822hm0ekmppk2duz8z666a2umg6npzhu78bq2rbdl3j66hxbjbbdz78mtri41qsgxhrw5qu00eozdsafprlt4msur39lpal10idvrvbefxu32r1zy011pld01uadwgrlx7503j32q0al3n6biapubueauynz09hh1qvtm9haty3p5x7a6y62394qfnr7zya90nnc6jkm84v1g97jcamrgie955mcyjxljtpbyerga0jvypgg5iaby8wwrexm5mivg18mad2qgfqm3fgqr8p076xj7aaqftjyn098u4cqoubu3j96ekidybybtx9bugx2is9bs0o8nvx5vky2g25jl5dqphiqn6skdtclmtsh51q5t2vjvot4ccvbs0nsq550liqabkx7put6lbgpojde0qjs333msloru5d55xiq83ljzpg2eoqf5km4l32g1ou3lb7o5c9epdgtjuk9q0pjtrvlt77mpnq1nofpr2a9jbv44yrbaxzq927f3ujmowjkhf6srjlswvspo69tbj6y5q7cmayvs3eml53azghmzdkswy2jfg9fs54tleykhfo3tclnxk5d6w9ctoxew7m',
                fileSchema: '2z4m0ykwpp5cep5gtraqx1s3tt4cke93vdiwmpfy7ci6u8dmpf37s7h5zmeetzv3jhc2tqafgvcdme00x886rb7dydw93jc0tc0iz2d8bno0r2h6cn4g1tino1iwzgauxmqayoydp8gphs2ito5gn61h7cblj5m9nemd9m19xa5smtbup4ndqvazob7fgmtlyzpvdcrhn7rz148j12jsoua4g4b134qesppi0uvhg9lc5fqsk872484pajd2yr2dvz0lseka22b4zc1c92cokkibky6inr8dx7le1hob7fyjvj9334ynja55as54fs87tavgamw6vhkno94gqym8auzkz68z5nwzfb0yigfe3t3r6ua6iqn38rk80f2i7925yfn8uaei5k771pr0vzjvyd0a4mq6jso823dxbfuykbabwibikrzirjatuxz8iqj2fqfk5c66ey2dmfjr2ju5f2jkavn925b89713h6om0j31d5dcnevmk564nnmrybyaao3qohsgy5pfs0gzsfv2y7fkg2o8i0qo5bbiwnt7fipbr2tdbdo8bdxnnd6n8tm3ju4pbam2d3okfz6ofd7zoyct27ku4s73inwqaqnij9ci9vg9jzu81mqr7al8lq4kypz1d39qnrol71yye7f5cg57e5gwafuzfr856ljatm11ac5c4gfgd5m7phlj2sfg6xgro4q2agq7pszt7laqa7ho7ulun6qsycbit88qoo1mtr42bbhivfmduh9876scchxiucuoynjtjd0tq9vxmk3xasrcxkaj4f1rleolet76us8r1g1g12xwl4h8pz1u05w4z267zmlr6m16wtyjrbfg7jy7dyztk175m4o3tzyrir6zz94ux9pl1xgpjvumt6kqbk7f7y0gwtmt42fiy4aavpjfzkp5w9a96qnnhcqljz8u94oomiba0fesod4wbw8gcgroa4karjw6m6vbz7zpxjcvx6v5fs2cs3stq26il8m0yfc3nua01h0mh0de',
                proxyHost: 'uu2djs91xh323hrtqdt7a327623frvdx3969dc8fir2y07gednjjg718krxk',
                proxyPort: 7183507985,
                destination: 'tdt7m8f8chknl1q0vnitnecz0zfkdkymk5n78ofi8vyvbp2ki0kyifzeisomtegdbuu2f2n5vjbfe3xntgv0qw5x8nwu3g3xngtx9p8d16inebtksu17k6fgem51vxhvdivj029tzzn506rdbcejhvd58vs0h6vy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cqg0w7nvh36wrbcj2sryk23jfxfemirnkwz1sacke1x32zokx5tr53hdh2l6gs20rr20zc7ftpifjjj9inzk0befzd5qf1jc6ymcecro46suqkscki06p2gjegvjb3qpzcapbmswhxecipubs1zlnwa0jyv69rxd',
                responsibleUserAccountName: 'zya3ixw9hujz2djrbj5h',
                lastChangeUserAccount: '56268huxxv7oyxkw6ndb',
                lastChangedAt: '2020-08-04 11:52:09',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '8hkooihiozfwelutzoconw7csjffae7zrn9mczhc',
                tenantId: null,
                tenantCode: 'sc5ivmqx3f7v1ehbh1w96vzxm3zwz261nnl1u61d02j5grgnfk',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'dpcc74bvq4nmbs5u2hbm',
                party: 'wu3tz7fzs4v89oi9adt9q8awni1bqd0zfgi37q6vbzx4levhx3kwrf781l4py2zo27ak39xfya8jeafyfbfdjho0bfi43tz0kn5sgeskjnpyj8qbcq3v7onm2x23dpntiys3imk3lhqg8jwu32azls3v3620obn4',
                component: 'e4lsivm3hm5a172m2sgh959rxikwzmncrsfat8et42aht7v9pqq9jdqxtvm1s7krj7b784pk3nbcoj9niq1yp0qcj1nn2az92nc030mmn3wk47flyo0xgvq0e9y6nb8b2n5t00gpk2frrmz8jx5hxd1zkqkc5icl',
                name: 'vng6r3ke2p3g2nxuf9p6ppoqygqbvpuxgqgjjariromjufvhjyk55ol5v09m4klyuy5orcrwwb773iuzd28jpgrwxvwxawtfahob2i5qvbb1luwu6lzhw4m44foo5cbup2brsquceau5ja20w22755fudvv7dzr6',
                flowHash: 'pn0rwgscg2msumxhxplf3gm93khm12hqfwfdqsg2',
                flowParty: 'drs83mli3sonnipothg0jj27x3xmew8ouc23e0tp94ppdlssmcq42dk4jeqmg9897ihsbdp30244frlk3fj0t3461qbabwgvjnwfnq2dyqyvc0qomjm8ugfn2b1ww5c2wzttms2wrprj0k1cocrel2msgh6vk796',
                flowComponent: 'ic45fjn7sovhg0dajvr28msm8zct54yczk6na14766laqtvddjql4uw3npruntjlizl87u96200zeu4zqg69t0fbuext9g7cfrfwqsuthujlx2kh9aezl9m8mf20f9v3e7pnkqtux062s2gs16i11ssa75et3ikz',
                flowInterfaceName: '28uzf4lwowyuc01mpz0rezh718pyneg10xg4w75d6jqisum8wncnsnsw1413j28emjylvduqc72uv8c0crchsz41z41d5vq93cmgccwih5f605lumca5aj8b6pkuxws031fi68p5p7c4p4tz2kze2rv75w6ov9zt',
                flowInterfaceNamespace: 'zsmch7i5uqr88vk7pilb16ltymirwrn9yfmd8h5iox26nzbq2ivpq4nu71zsejo62dtw7bzw18jj4vb4m53rnbncewsne8ac59rjg03ey8u4e3w6zgebjmewttfz5crr2z07dcz2ycle7ajajoqkwk3zorjzdy7n',
                version: 'ypuy41vkrtdadl71y017',
                adapterType: 'crnzaznxjvm0878hgsf254z61lyijjgto2ki4mu3gblf99dm50pwv2357th5',
                direction: 'SENDER',
                transportProtocol: '5ngzndqs52fs0nza2u17hqh1r94vg0lxeqit0uao7x7nrgtur88gq1yk1a4p',
                messageProtocol: 'snt13ri9dst8c9o500c6zc9helmx6kkuh69pvajdka7215ml7brqg1uezxdx',
                adapterEngineName: 'pei0kvqv8rhqczjhbviz6irksfqu3q41h8bqze6n5kk5a79g906dlxgvnm5iev02jmkz5r6ab49drl8gi96za2ylvywdfetoc68wa3o5am82wgl05gz2x6x1djwsipezo4av00skfog80p4lj2uvner8gkgar2w7',
                url: 'lypwxhkslun3ng79x5j4kvpl3wicz7rzk0hzurrk7ohsdayftu2jh1g3ynlehmrpxpokrkdy1jf7jhtahwacj67zdk61mrcfxt7slm9g0amg2xxgvzj5dnn8uuqlspm0m5l0witzu7s0cn419a72upxtix6q54o6pn6vadr1x2g53u8yylusyc6qltih2mcibesw2uj5ob9w4lr1aia52bcuso7ccpjni2qd892dw7xwjneq90cfhw4td09xnvpwa8vqgjhn8gdwsu9zfy6zp7e69rejya5gkw05304w9njohuz5rtu180p3ccvu6gjd',
                username: 'ttjcddvzecnndzj7g3pm001dtx44a16qdc0vq3vpdvnkvsbuf1kcwrm3qt7g',
                remoteHost: 'c5zy7pqbfo9ytopi8xwxkvdhneqslneqlkmdwnfdzehzr49qys7sbid3l8ufblamr0anuyfswik78gu6b9iy4fgcsqj3u0te27gi5yigo5pezprizqa234uiffxdv7jhdmbh4jigv50l4ehpnvoxjr40pwn7pe31',
                remotePort: 2786665262,
                directory: 'i12r24cznm6t2b5ultazzjfowdyxwne547z6tsruw57zdqx2nbnikligiwy1d4szx5jrc763wf1kxjaiq2jn30o6233qpshyhqz6cqyfae3fn11elskgfgwyakmlmefssq0m2cqc288okp1vayycj0lpanhqe2sy5z23r57kjcra3nkocv8ulc8alwypdwtsza1ics8l2skfjip3hhv69r6z7v1qvakt1pcfu5w3z0ls12sgqxoaqbk38490wsq9p50kup8mz2p2t67emazaki9bitmuticnpr7mj6iqnfed0bx3vqxbjrxfaq2yj45lprzop5lerbr26aczeks03hco7u922n84zsf6rcnukj4exksu0uav4ssq7vk4g00pe5ol1dz0uja2bxw61djctc6hygd13n1c7mxzeviy8pugrmobcb2hqan6yyu9542h59uit4l2pzwnj8hkeqyxgdeon2dsakd7kqs0uafmoc7ux1w8mex9qc1du35jzsjgh2s79ccaz34moqc3wbw9jsxw18d2yjgf2m4g7kj9uok0fudfzxfygfmo7j6szqc5vqzo9sg0h5d18k6rl8j8ozg3vsmseymbcx1nnn1tx4yowiemor014z42vly3vpkw31wbhyacebrmlelg22qnibqjuzk30vmqsyamzmjkh6zcehexig3m24tf41ce2gd6l3lawj0pk4hgkk9fsohuwm7hocixmk91n714b94oa0quoaf1rms8d1fhpplq553s3x3d9z9s7anasw76lmbbta39mmi4g1u1j8u36jymqgdh850tokl3607xvheowaj2orggz52wisa22i2ykbkj75d1zt9wqyw3wk44fwdp2vp5edkfn3pqxq98vxctdkbtqg2zgw6ucr6pdjbzrs9qi8jgh03g4rm0xotdsuu8s8x5ed39u03g364fxaa6ts34xk6uyg196vzmrku2r0rorxdtyc27zn7mlkwn96s8x97pbtr9a2plezvodmkkg9iu',
                fileSchema: '93agy1tvab5a1wmg25ajpbqcgp7l2roirtbip9od8hkc8362mk19d9fx2cq5floklhj65dtoqdcb76bn4cl2yl7wzpieogqoqkhnt8b9c302g2lgm2yyohxtvprsq0zgqchimptrbl0gnhn9jx7jj49dwiv67z9cpz1iql1cybi2hfkq2zuy3mj1tzhar1wnyuop1wne8ljpnzht2ibia52xtuon64k0tj0gi07x9jb1rtw546q7lvmifc26pwuoywhr9xl6lrkxn3a7a095l6i4rw1j5m92hbm8lcch00puj3769p1bqd9bh48ef28i751uf5glm1p0m6otyvgf3hpgfr426npi3walyojmjo4w24lgeuzrn904wgesgcpyl4rcviwxny7v7en8bdo5ls4y3hnvf7p8v0gq61dn6hwdaqvi0s2ccisp3gyjejovkuy39wbq4dcrnb17nrf5mhhj5806e2r8f5hep3771sri6xqgkn7ovfe4lu0erebt6nnuw18v1pi6r3bpzazqtv2ga9h4yxthzamf2x7qraj50o9a0lxhhmt34phym3z00mu3s3ai7t3rf29rbktlfoyrpunoyg6sfnm4vf5k14roa11kb4l7w1249pn3mt88mwsayl8tul437rabedb15t4pzkrwff3aopwc5uumtl5rx2aopk5xbfqth879p5v1se6n1l6hp327c7omqckrg783z8hv5hgqsfg3xr78955ogo5t7gwhg99xgdxhwn00b0f0veas9j6x03fcqfzsd6t9qic5d7s72ba5r6e47kd4af3b8t2g7v5f62581j2i904ormwgm7psyadu7dbf4766jmayevv5f4vl65sci0uncczzedw7x9nfsp3oi2q1863oy43h92mgwma9lyuqlvgfpmdo2owwbhnmee2jlwv3wmsd0fl3q1r7u8nwe297dvln90nugvh0b6tksl3h0er4n7g80j5d140q2bxk21e7ilrhjcfop6n49pg6b8us',
                proxyHost: '7mmczsvhbulnzaidm58j7quqzavx140mho81l60ssei4o2s1troxp40b2t5o',
                proxyPort: 1369260604,
                destination: 'qab04eqkm88e4t7am1bh6uwjfvfi3ste4hdm300r20uoatv5lwypftqazi4ve4pt1khuqkc2jvf21jpo16yz922d6yi43yf11wjjzplhp9d5vw91tygf0xgan1b2p98y0lhbjgwwfgbqberoujh5zbelaykdck6h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n84tqrd7hecoeqoe5kf5yycsr0qf4iw6jvvwb3kflqrvnw91yv082wbc5e847pdryvx0tebphmnjuaf2oy03d5qkuuzth2nv93dfno1qibb87d473zswht08qdii6egqzs6d1bif6xuob1jrrvm88r8venlzyrn4',
                responsibleUserAccountName: '04k0tnr28ffwn2bsbbug',
                lastChangeUserAccount: '6azavym5fn2310zhqh27',
                lastChangedAt: '2020-08-04 20:22:06',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'dtr6fl818eztqndd98qo3da2wp1rz6s5gn901fw2',
                
                tenantCode: 'lp8qb2lxibev6gwtwg98fha984tei078kc71co9ddjr4yhw7zr',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'yry8xd8pguz6hw96nv9g',
                party: '6fw593b3cp2vd5au1ry64u1b9yih6wq2fwqpcqhulz0n54pb7m5bryl5ylgw0b41mg7w94n0mg74te52kwchjf5byidgbmmfb9mrjx5zqld75khmuilopdk8w71t76fma36qpllv4qw9i249r8nzjt9up290mkzk',
                component: 'q7npua1rtfw4vwfkp17dw6vdfcwifeyx87j8gbq4hrmf77244hdcsagd60k9kjguxfdnn233fyyx6ratif2aawfg03apl59pd7tjuock2efoyhkfnk02hmyylkpw0nm8fzdjr4pfrbzcb0n0i6oo1852cj0ikpfc',
                name: 'rbpzpedbk9mo19potyipbr31g6pc2mazeh72l349v5373sqjqbu4vq6z2ls1y6u766kwmuox7tr6z9mv9d72bfdufcyottd0gevbaq45xkgdd4ez96twve9hmg51xjo0ng0iod26dd857g1ws1dxej79hy2sp273',
                flowHash: 'h7wykb99mimw6cfjl56bqwqah67swevwv62w6svw',
                flowParty: 'w665qmxbanmr0urry6vgn3jeqjusv6g6v93hcsusy3uosf074xbq7fcoc0pkbf53xdadmf9i7ba4x9ig829e92lgla7tbz1eaorjthlbwgytt5va9k0sxt0zou836ee9m31wuynyuothefnt4pzwnbx5wqsvvytv',
                flowComponent: 'g82wx9unsuhg4zvcvzla77qeiqfvwux2tc9dz40pzl956rhw0tt16grcrwmtlf1004s3ddufpmenx2y9j51i1hmhxk8schq4hnefu5rllw96x0mb32f6gq5hbfadh9nskygbz4gc22ah9x7xrxlyd52gfep3pkyo',
                flowInterfaceName: 'lqzgribgcv94ltcrobxy2bvs0sfrgk8uk8lin3yp91g9a2gw59q3hqrd1se2ti6ken9ijjc6aykwncp80qlseo72kthu9cpyrmpq11ubo6tur5s6wg41wicijp2gsnddbq7a29kizc1ou8ytgc6zfmgfi4d6aftv',
                flowInterfaceNamespace: 'sjr65szm4w2cgweqxj1565qiugq1nqqkzwwcr97na7d4hots44v0juohu18mlxu7199r7j50gnr9npuki2107edb2jxzujyslde65tk8tre6hoktu3jtildndsn7q6nhkg02vae8x1lp37rf9wi68xrmzcyzcoua',
                version: 'mgp4a7j1k047gajn3h8i',
                adapterType: '9nabouk63lbw1v78ueadap3yx5iofx99iykeivdiu49ytlcyce2nvce60hsg',
                direction: 'RECEIVER',
                transportProtocol: '7g2ka69tog96damngm355oym98ehjgoosc6giytiuovfqz3mt16umvvr92w8',
                messageProtocol: 'm9vn3338ffpm461kwb6j4ldwlrqo9r4ng3l7jjj022ismbjcng0zed62b7qo',
                adapterEngineName: '26v2kez1va25xnmtgg3xfqaodi7r2og685aovj0xj37xeybju65lrkr696nb6ycarh2qj4wopiwp022ahgl38h4mpfe86c8uqn26gwshe9jduyumhjsdpi96ki7jp0umxk43ogelkjkqxe1pqbcplozq5s2624vm',
                url: '89mo9oyldlrb1kwatzndk4kj3t5s01autveuc9m1ppdruxu0wcjdrf20oqwhr6r61igjqhey7wvs5i93bqh3p5mcejevmffk0098izyo4ujh5pzsfbawcjf6iccf4lnupu5zfq0z77oooyhjeydqpwbr9se3s9jcsh1npjitinhw2795469yflyq1787url0jj5rljtfpa3dc0s7zzufoxqanbcw19zsx2oz60l4kbf6w1l5oa913p5kgmimmj72h2qzjauxlivt5veeyro6uqi3lu9dwb2a79dgf96njlfnotsfb3dwhowulrl0fa7w',
                username: '1xl6blatg5bhyhuccpmwxn6xqddbe4lkdr30corjn8tg781w35y4wl1pgu3u',
                remoteHost: 'o9o4j4eufhngy16n77al63avt8n8o5mr4sbdkzihbfws32axn5ly3ngcr6h9qdvq08urne7ilhs3whe3tbaeoffe0omty8wrkzeerzue8dj5scqdhexb9vyui2lv3t2o5qcphnb4fg78ycr0f5l7bmn7bd9zvamf',
                remotePort: 4374856780,
                directory: 'fyrbkl660e2ryitw5ercv3ww5zifx1j0mnef4me7utwg1a9wl9e4wj3c2lfks455sebmics13leh8bw505bzyentwo9296x1m66tur1v6di0a41540ozg5srq5gvnkwg0vcuwk0tyoj3rx4qjauc748h510l40bf4o57gmtxy8yac6b8u18nz2vkqs7vns1sg2l4vfonoqrbr50x50jcrdw8lv0dzo57qnguvi5vwd2sykxssv4oale0jy5gke25d4c5b9m5ym52fyx94bno6gu44xte0hcxbwsvacafznpfqh84v91022ow0lqnvfrq9s8n7uhhlboml67v2p3kahpoqo1q5h81709s5yiyntbg0ywl6r3lb3nxqketd7kp0r3hsxb0c3627obup4en13y3f3qvtp8lmuh6zimxp1m0nq3jtni1sgz3kubabsth18yxr0y8kuhz01mgbydd3er31j59ilscgcj0vwowtz3m0plpycvgap5jzxt5dw8ar16yg2ml5enmcy4b7twtkazvqgnpblkjwu312t55d2p0gx71u4hy1q0hxhzv2fzf8fbka3yvvb49e5tmwxdy43g73cme32bfgq0t38briju5t1s6q5w7ny6yeqbjaxv53vbbunso07lsi5f0uitgti9vzzo3uuub9waiolmbz9zg2chkxgdpdrkuzdqmdp34raa901gysd7grpu34cwzu5d9c10p36f6m5cyfk5895m1hwe15hjawqpvzi4idcuxkxea8snrl7wd0e4o8v9or8xtxcnpt80oaio3kkvho7ocdt9iozw0tl5bgp4oxaqovoxt1dzycrb1zdng9x91dp2k80lxnqzbruj8j7wwbtexax2wbh24ouyzzriej4n5gxhs4gfjcw59dia1te1wf103skz11hx9w379zp2irmdk07l7mpyyqz3r4lr3ncrd7z7tuiftj1kn650rbyc2v03hmae7xzz8subee4mok5hkm4eu47f0jmhvd5jhia03',
                fileSchema: 'pp7ssav9ewlg1n1bic14seewu7lpu9332i70pvkgne9xox7l9xdnmdo0of6grapj72ykrkug9lb56inaakisn1pi0m1bodaf860fu69jculp9opg2pzuv71g11ro4hftuumubbbdnmeeyvpl8dk0n658rclpnpgsj2v49kix3iu7o571trrzbiu6swis3sfude2njrmblom0gc3m5ckb2u2rhfu4j01w3d3rdyrldi7wy3ce93i0xvwgf7hq9c12yym68h3gshg16g4cnlbptcjhzrjehccrwc9z60399jlbo77s6n1n4r8pd5nuip6jnym0ea849ta84in0b1jac530twqgpvtbdal337tcasrml8ws1oofz3u4t21puaywobc8zpo62p2g1w065xtghytva2o6itji3npwd7ao2x0xb7rdg874fhig4txd1poe2ukjhj711vpd4jjb6946o8u3try9833oq7vf1ixfquqctvafoysek6xi9ybimt6y3kojqn04i3hqnfqhrr8wag8scq3il4rke4orf4blghs9lnmz3gi72rw70gg7x4vy4aj6ytt88ubr1uwe37qbqm5xd6356mor3awh3j7pd3sc8jgbbw19zhwx8s4iy10c92aa0ct4phh9zsype890kwqjkye1la4hq7c4sp72c4x8zgr4ohrsowql8s4hs64fnxafkn3i2jo1wfndbzh6kfk9y3u3s3f6rl9yi46b04gmdw1f50kt7eaz1twyci6rrgl0k4zjo10yezxedvr1xaw3is87gztv1y40jfbc2626kpa0mnmgmj4l12nfuphf207dqwp7rbzc7plxnbxhkfsxocm1tbxtonbb9z8vgo6jmmkso4o60cm37uyovtrkrespp3p4sgfaad944kt4bdx9hs786cfmgiaalyt51d3rfln962txx78q3re70cjq4u3h1j8vylb600t2ahpfzzlmg3bp76vn2qvfysjnj7jsjf6evygvq36jwc5ny2i1',
                proxyHost: 'mxn64nugr92zcbbmsfrqjyjbyz947qf8kxwz1d6xvyj0sn5bffw95ggis0u3',
                proxyPort: 1192461794,
                destination: 'qu55wc99u8eqa9xm3iqwpk9t9ghvbtfn8d8sjp7u89my08sw6x1sauxyenlmzt8j7go82n2qpsdaxpm2he50z61zwrtacsr5tqi89gegpw9iz2dtss1p7ej1xgcwgo81sdnhom993vvpincict3st1nrop79ckgn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rhukc0d5w2z36a7379zw9awsqbv5d54ygkqzzcumhzkpatzw3sm0p21p0q37lfzdicmnz41l9ctgzeuyxlen404ec6e5ivvv7jivn1wkop6brxxmts9wnr2jbs0kesyl0ve5b4o446byjs7c8qynpvagizh4h5wl',
                responsibleUserAccountName: '8sebbfmwhs6ysnrx9rat',
                lastChangeUserAccount: 'crsh01rx24dz0p0mg0wp',
                lastChangedAt: '2020-08-04 23:58:29',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'd8qm2nthb42zwmlugvle4u8m8oeav4i9mafg322d',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: null,
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '1rlkd5nu9yr5sm57sq6r',
                party: 'ac2aoj5lbx9rl01h2p401a5cogqscdkl57u5zjz19uvmgq5dk1dyjmjaj9n8vxbpr99x9uayucsosc91mkdqssumavp7hkpy26mlfiwjpi2kmi884hawqehmvzfvrzp4x2pdbna4rna2op2f3qwv6eqy5xlhwtny',
                component: '8xw6q3dssd0hg1zo7doyuy6blpswky1d5gz3fc5cikzh6425y6g7ftkk2oki7r9u38lfe3nmg8rz2biqjkz9q8dits718e9huxbo4lqyka7eql56r00optxitivt6fo2yah1l4e1dcpmc1x9n91zu3tcd4xg3rdk',
                name: '1wj9d1gkhjvwprw5ocn5h6ugbxo8ipcmykofiaf1k8620hxos7mkqbayudhm4wbzsovor5cqbtsw2rd4z74mgns1at9thch0axatfi37rtvu01ype2vt0evzz9buqm73vkdkcg6az5qjq36xlthgfcrh2gyt1y8x',
                flowHash: 'fdlvpusf3e6g021x0rty8h6yvl10t7h2126po3fi',
                flowParty: 'zs25wkklg5xdqsdsxbvmpe0s6ufg8yq1xr9cy1jeyxbdg7v2i72jgsc0h9156hj4yyan6kygb0c1wesbxp9rbtktjj7vb69qe4wtdxcjbtxubbtxihjvibq2a2tyl162tj0b0pq4pf70np4ubiiymd9gntviiigj',
                flowComponent: 'bfym9lc1fwtdmr6w1bzhyhmtqamufj79eb8xfvwlk0r5wv7zj2us6yu4l6svvb9itw0lmjekealnpfy37cbozvktuutl44plty9y7mondektw2on9qz12ydqmzzsfiuh02wzcygj3fx4robt62aa5962l4gqcj5s',
                flowInterfaceName: 'vs9m9pdll6cumqn99z72qndp0rrcm45e23tvyujmbkq85oimrajun00uvoja6cyaz10ytnjxqo1ult1lgti5andxpi05ys3zzxf5uobkxzbmeusmuv6onxqcn7foix6qi3lneqh12v0lgpiv2jrsno8qrslnoa6x',
                flowInterfaceNamespace: 'nb9s1q5zfhrk24enrxlsd9tcvitm90283j395tfbnrdvs7jeualuhffljhbpjaak16djpbiq9jd09r24fiyo3rtyb87abol5ggtt3ozglay60gz7krdj5t1grjgxmcrtp2whz3s270m2xpnw1se465ra9xwtxqce',
                version: 'jws8ic3nl2rj1u927m01',
                adapterType: 'ufvgtd2owtrtea9zw21fqc055d5502gbseu0k228d65ieun7fxtkahefcyo9',
                direction: 'SENDER',
                transportProtocol: 'm7fz7r4rdyeceh570voqsma1ewsdicdml8i6idx27lvnuk4fsbhbyd5f7wnk',
                messageProtocol: 'xizzxazedv31jdz225b2meobhgmgbdjiydpkfgrr2tgedeouz5slo4tlu62u',
                adapterEngineName: 'x18xqi8fzbg3b91xeyc2x26icsjgvse79nrsidezyq614yl56crx2cx8yqm0exgipy6gv6de2k3r6k9aiougnvc4kh2pq3qkn29aweifrvfkqpddlwfbsqcf7zgl777defux3whqixu4592hfr8jedm39mjk0bcs',
                url: 'hsgv8mb436469r0pu5hkum2q24qeiqu7bz9z3osftjg02jxkdoaht8ftg8togogx9efvn91f2mbbbi7cskj5gazn84rez6waoyjhxj9avse6izci8uaplv5if9likb56kei81ekmm15dnurizbe6v93f2upkhe327a4f0cjaadwnol3x9cckc16t4uxg0y9px05lom2e15sb06kuu09t1ope9vyfg2mkqav3e42v9hepqcwk98x7j2nimlf54ouugfgefrvu6b61b1gitxktr7fw01t8t0o6dzi0e1pad8avtegr8h64t43p1hcvyaci',
                username: 'y5t7tiy4336wnwvsp6sum3fy07zb01knta4g8a1pmcppl37t8gvlswdckeyl',
                remoteHost: 'k7ivwffcvxdti5pje7y4r6wdugj87g6fqdsku3z1joho9gpnac9q4q7hx2askzodpk7f8d40t0tugkkzt8hrdumpnf85cxdl09hr1g0948c1n0o9m9smdzimqbumqkb0n7v3gdwx63bre5dyyeavr0he4ftovagv',
                remotePort: 4460710540,
                directory: 't6zulmn9giuejis556s5587tnl4ipf6gepz7ztcnqie4ky0c4oj4g5svq9d09kr5o8pc9fqbycp30m0jj0dfmz1i7ogn8srhir4evizo57jexd64eldp3r4jcxc8f2s9hdn6dmd6fz7dbnl74mdpejje11xkdhrqgekwy0t33prmnc6bf80indcrniustis7vizu065hc75cvbs6q0k4a2jgfj02zty51x9manshrl8gcm6296ecazwfn8gqfqmo8nsfy16tfnh2e9mo7ulyczxd9yfujuu7cejqo0nuhnzf2yqs7yb5u0v2n5jnjzqm4y0e7t380cejj2fyhxgcpp6k8r1zs329udcspen4y1m1bepc7w1gdra4pave13uz21nutg421vgepyof2qcyny418pw75kd217tqtxq3ehd1gf0m5i0ncffhbomdkq4yqjagtiw55tchmdx4bq82d08qelxzcy7lvtvtvz2faljmt567t429kdyvvtt02309eghdzv7mm4qcvcp3lvpqva90dm6m24h2xl259k6j04o6afv5pr9iikyfvpusg0e3eiuafvc33ih233urdg5ew3f1d7uo3i3eclutca1mkqkq2hk1bgfvng9m02dr8h4zxnr7uy4n1u1afhqbgruhjztq59nuempvecuiwm5gwdnh39sooeekgf3tbnacffe3mp6jlrwssvbh5pa1ovgaa7iynyaot6d8j2xyw3ppbnfq9jscm8s0i1uexanfbtz2qim0ty7vuzbdhfnod6ruy9zfcfm4apuu91t3rir4o2c6drmrb2p7zotx42u3qva4cfq1h1285sgp7av9q4tbyjfew1kjqklsl8jfmrdb38by7e5ryc3p03hlrmb0tr7kw4keohf59ichaalpjj74sw5gakjx577knku54tlby7k2hsfvskqish4v8sm0kvdpp4r891kt4wk0mjdj85463c3inkj2nime9n3xek6361ngfa1da1hmsu6yhdtktaw2',
                fileSchema: 'f4kte2k782d7plcybkca2rz2bxc0ezlp9jd37l80ajcdo0x1proym08im0ozh8as9flxc625ufn6xzg15pm4pi3oh1ssgfiwrqqcm3tljyds7njgctlc3rpw4kigesfliyy1ntm61y0ppqrkspmofz0t77wctcfy955sjv25estgao87sb3tof1176l041bms4ihoagi09ajip0jq4v0ay5l4e0rlm5iuk0tru3k7e4cztuakoqdx9qsboq8m5i31ocq529uqk24c19gdjisq00fu3jrw6ohjuyc8nrvx48sfji0tn7a4d4hiq1w05vymq1432nhf5zziwps6wqwbu44dpd4vtkgpr8o6ngygaopigi1yu8ncko5u9mvkvd7ii2phmjxwf62eh0vji3ylmdeq1rb0o3lwwdpjaodpvlecb4qcs5tg1ue0ulm2z943txjrerzf9fwiphl3p2l376jpf5q5ni31kv7hs1n8m5jci6yu9i3bqp52zgnj3d2ow4hsky4dmll94glrk87v5oxqj6t87fbfoqfodzqojvhbrwvdgvtquk5smcovua4xlr9aw2gyptjln9r7s7ojw54xqoqsbij55d03iatbhwnyy3ru5ha6p14htfu2aguwpqh81hncmz4a0spr5tj29nkb40gtyy71l7a5a4opjukru34st5yefbdz74i8p1gwtx1uinfc6kr0r5v0h0zz1uk6iyfunqv1f93zbjkfw0mpzxtetfocvb3q7pxw94avq66p4rhdes3q566prpwpr4vo2by0hww5urklk9tzfk8a6hn7bze1foyeov1k1kg6ykvsscnkxegkt79mz2iex9pf0f85618yi6b2lu1wjajyie6orzr4p0rp89u0wmzn46rr22q8s9dpl90ykls5e5fxv9e9aqybmpopok9yh4jzngrm9j4o2a446674ze09ux3ioc2wpmho4l9cya0urd63mfx465i4mkbxql07wg241flk2xkrd7icsee11s8',
                proxyHost: 'wy7i2acha8w3kkferk05bwih69sa8xfsgwfz4ej1pvuxs2nlacanlgjl1f1a',
                proxyPort: 5218161435,
                destination: 'gkva418tmnrbc2hswk7ewf6a5z2laplyt2a1k6g6z2ipd5nd5pynja90saxsfvvmzcapgc7qpsb3pmlxp30500f1ilyarwe228nwqktpheinrsd413x5bxfhy2xur9uov95v5h1dtvw1kcajyh8g8oru13nj5cpy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yd06yq5k2gvmm3kuamh6qetk0urx6saj0z751rpcf6lo6ct6xivbzpoxzbzsjf0js1o9dx0nxm9tx2g2en6il718a0x9wux84tcqh0fxyzrjp57ruudy4obocvge5x83bl56njb3l26eixpnb42z0hua3032xjj8',
                responsibleUserAccountName: 'y8aikzmdccd5b4fq86ar',
                lastChangeUserAccount: 'khbdsbuydfqvxke24ioi',
                lastChangedAt: '2020-08-04 10:18:37',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'trpa29mrjzysxrb6vkyd2xuqm8lmpfwrz2tr1o4n',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '5wjzd6tc9pdk57pxyci1',
                party: 'ic2kvm4qldjco4cbh653bb0cqlo6mpy5knnwcoykypgo6umoubohc1gfpxaede50uu3ba3f9oia7gan2fvegtrsui7iqc7fugvar7amrpzoo3ih71xf7lwymwntvc9l39yh7z4b3p2nbh2hqxww0by6up32xzrf9',
                component: '72v5pdfqg7mu7qrvjd0wpslbtsbft4mq2tf8vjj8vsywo0nxc9ofqyq126b76yc8k44yjd26pmb77rxzuqv515f7unko0glzyo6btesy7eos0q21t64cfjd9mopvdlqvaxkvopa6we2sqatiif31ka5jns90gav8',
                name: '0lpzzmcqu3aewu96oa3bpmetee1em3o5i7aety8pxodgsdil11shmlerrj5d7v9bcwbfdraq3oggxn6s5ny2cy35rfslzs7deswt4651ucrn7vbsael8ij83y08843dqotyvmenj3izj3c2cngz5sp4vqtwcsn48',
                flowHash: 'tn9sujrim78bayx9huxokqpe8yfs08dinb755gyd',
                flowParty: '48zwjd40pkyl69t3pgld9hp9awqlba1ngsmorwk807f16haxvijgfx6ak75ylp2mmr4n3gqcqcz0n4m2tmsk34hgmh5n61081yvi69s7qcebq54ae3gjlfzlnamsftsswj7h4g16qh1d35zfysc2le52bgb8aacb',
                flowComponent: 'c992mzt7a7viy9xzmzcfog3m6ghnl710m0m8o3w3zr82i9yiet1u4lmlnm0bqzfc0wrtw9uqqewgbfq40l5umyp6p0td0o19nt6d0gibtg2zvpb5t0ruuiql5ouwekqqzdqquuyoweyqkathsg2hinja1n4dqegd',
                flowInterfaceName: 'uihlqnwx0wc84py20jaqke5jjngqt75fy1e53b0keb78zcbfp6bez6jtua49vfdlapkssvwog0r9yqmm1yyrthrxelmhmhg3b3ls4lp352zf00xfzatat0bm6ct47na4j8vo49yt036lngsijgjgw2wr71qrnkkt',
                flowInterfaceNamespace: 'i10kss6x1m87bx57aoel3r1okllwsv2ykzpr58nhgadunc26sdtqdgpq6imux5kfbcfwkcyzo9c4s29apirhhaeh4gnk3m4slgywsi5e3z9tx0rnqhimpf4uf71ol98rpyzw2blobb54r9sqx44gl4g0xv7l1bep',
                version: 'cuh4so0cp3kxovqkil7a',
                adapterType: 'yydyvxom2sgow34jnz8ucn2s7m62u87aipzbdeehiq0oeqsp7df8jr95o4h7',
                direction: 'RECEIVER',
                transportProtocol: 'za5qmwfxkn3kbz5dc9l22yiapuasc3m44w8pugatvmygsakfjjrux4in5a9e',
                messageProtocol: 'iv9lnj9ov19hnpf01grvroyd31k1tqfeorjrcr5i5kji2vs1wi73l5bmzobv',
                adapterEngineName: 'uejcs1lv5uoj6ekahbdslg7ygfk66oa8mdcu0edf630zbnj51plsnneic3y23tkju1lf3lqqoq95jsp2u5unuln460lzq9uil37dyqvuxu31dtbgmz5z10l471ln0v462aw1ac1ccfuevxs65huxujg6i6svtpgx',
                url: 'mzu0sbzgbcsed5uljdlkfjr9i1e7p95cg8natpp5v6828wupvtbtbju6yyx5icqgij6rhiguh1ns528zi8dgs0aryby0hchu61r49vpvfkjywoozrujkfy2mo6actfzlxd1g6brp566y402pvycesqlm8m1tah1v484j6dg2t2swwjzh68w9uqulrlozk6hnu38tx7bbc4pe952pxdc6mnqsmbw6felz08j4b44rt5ivzb7gbtf2xzji2ce5ccv2zpg0euu1gker8dvh2lmsu3twl1oufubkq9i0g5lkgj1xhqjjwpxy5pvn4n192cq7',
                username: '4zyoh2ot4oo8spo4vrgv1ni40c4t8n22vusgkoghvg7jx2fbjvhs3s799wd5',
                remoteHost: 'syvmkxtljkh1rz8g6erm2jeyqjy0ne47kzcvlwhj52nfbjauepl752wbd1moprzjxor0q828z75tqj9crmst4q3w9wab2ju3f3u4pt4lzo5jfrx8s1lqou38m1oacjcrl1dyuk0lc70ky1ky718oxn7p0kj31fv4',
                remotePort: 7393200804,
                directory: 'jtybcoei0b4woczpj24q0puhwqchcctudk69agj7czwdslhfgtsgnfad0qobkr7ipc9nremqw1t6gi45is5eh1ybpr3afs2e645p7tl6cr5avza5di3ftdfv4fcbtqghnni1vvtbttmvt47w5ocrkvt7h5lbh2lvksdhgtkadjrmappqh73cer3kxqudv34zx4ot3vgxqw0w1spibxlbsa2ofcw1efw7bc08yelgg0a47re0kq2ayvuyefd2ucvl9t7dx63sve82aldguk3tsogzzi5tax3nhp0fae4bczdhgl888l74z0otsti8gw9ybvs7bm5irxyb743wmk4gkmymb7zbehwkfwiu6o5ay4smzvsus2896d1ko7on27lhw8zcfduyumwxim4ubmfag28ojr6c4opgyp9k1z7usx6nt2xkgjc1kjuknpaydiwo5q6hbs6zc71m84my8tg3o0b8zm2jnoqf3r8nakygnc8qyhgzvoxu8270wy7yp42uzq5rjxrzcxvxvs66tyg0xugwob3k0usu4zx2ukd0syowmgguqmmylvn2s1vv23yfep5tju185id4yotqgx62wqh2zxodcb01449983br2u8w5py5eq96gqhcvwu59s3mgdtgvjv4mlwcgt3vt3c3sk64zrpb7jgqq66huqfxdss2vxqz1km1rg9bbmzcdjargqkqxgu42v30ds6j18l8pc6ffpqa50r5onjgufysdhh2ldflxtt0eu7xeebig85rr3ukcq68gvzjybnqe7fgrio87enzyjw618yo0g69gubi7z0yi29kxkq5u0nqqygncln851bfbhhgez1rmoai0pzjnjdlyrq1t0yok5fxv8m5bt059m1nxumhmikntplt36tcgpa0h1ly78k4f5ie7no6n4qizrvd8ckjj48plmhzquk41abi9vobg4kv9h45617uormj79ckar68qbmegrmbjyvg7ujw0gj4o12x2ndpiydvefn7fsf8n9yahl8v',
                fileSchema: 'ut5w64y3477uxt7ll46xtcalrnnif0opoelzx90un9azkgrt1mqmd18qjndnpfeggjkr5x6trvvr06sjeq0dzhtqq1bad5hnl90ee2255oh0vzlnp4srz2u4or15flww07qdkdvucyw0v5kb6khwhn806psbkr45flht89yr793o1glpbzdhmu6cj6m22z6a1m9rs24r85hconppj5i3wizs5i1jx67sjgs627z7lvl1xbsjneu2p1blj09nq9rlf4ojjcx27kmlh1ro4xgf4lf66k8lgjd0hzmjkfcu6fvhgrr1gf1keh7g5r2rdeoimxx4a803ioaek3auc8sn3tahmn76096xauzpcrq5lzdliif4mvq5pesvbvgwyr6nh57uzzap3hn6fagygvpk95gfs4j4og9ig6ton5wk0mmzw2f9l2wg3e1ofzx9dyyhvt9tndiyc9bqgvo2h2bwxd24o7i7v637kfqrzppd0ij2fvkd8e84fvuoa60nxrr9niq478cx49ztvfkvt7rl3t58m06e6jjv3f7y9tpklnkyf9trbvbwyaywukmwdoqvuw0w5cpk65oymjslrsyjoqtnq8l1jn18aentlcy3xiqenwkwlnyx971damecba6a4t9023be68hviicyfzdqh5vpzn1zapwl93o73fobghwi08y9q4k7r80s7042ijj6h8ipv1x80hht9359bhpne65icht50hl30qr499mnwrsgd4w5z329bixf3mf7lqkfga1okfdra3lu7i81j8mww9e1qmopjpgh9lgcutc4opmw7a2th8yo97t89wobyf8m9hdhe23qi85jy33s0ejat7w0vej2vusgt51mxbj337asp0mpy7g1hna2ei8aeico7y4jsbih3o3bqjtpcgjnzhfpvqmjpqetztdnl0qc74f0wphyjyd8wftxlsjdydh0zn3ippwfxa17zwwvyq1oie06o7wrvekt8e1im362ckoxmgrwaaohxh5eqljh7e97',
                proxyHost: 'g6mrg85bogfwqgp9ocunotgb3mt96xrpbaeby04gu97rfoswmgv4fuj9wg2o',
                proxyPort: 4898005817,
                destination: '0jd435bg0aye4wbd0kngo7yy5ojzv73slrqy0kp9zso9ur7abgg4a547r8bur03bgj8j6rsz90sgmjcrq1arvxhfuiqypqgebzqrettnym2qde8d4njkvtwm8zkcvbnp5kjjjyok57zd7xhmmpllwodrskvgxokh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8vq98x1eidime4ewkgd96csq9dyk5nlc7yxhyh0uw0loqazxzdjljn5pgu2vs1r6rbyput5r6ix17jpzv8as08bvsjjlv2jqgb62n4ktbg4otrzysozhf4qjqkapkp2vusrbvvq7t97kinz7rf84j9v4zseghlat',
                responsibleUserAccountName: 'mty87fjcboy1sx9pcpue',
                lastChangeUserAccount: '53pu7nqrmcuyb6n6voga',
                lastChangedAt: '2020-08-04 16:56:04',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'x6segv6ercrux9h3sv67m86pinazhrty7n954f3q',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '431yuuj2q3po3nlahu8dj0lvgtvohz9ip1ut3r9iwh96kmso2d',
                systemId: null,
                systemName: 'uvc8sxl8xdbwrdwn5bzo',
                party: 'r36ufu50jj7ewdh79zds7hq7ean7kv39gvevrau7yh8nm77hy2v9ysk2q5gqpi8rnhwmrrmbnoahk29qlpcknv0s033iqmxudunpxzrms3t6yf4zo77xdqe39w2eteu2npzzbav7u8ct46cjcc9o0i0rwo1jr6v2',
                component: 'km19ddecwbvi1njcez9sak1ikga6u9pgj3gy6maff24cij2b3v3rr5qz3o2bfp05i232k6g7qzhyh2d16dx7c6ye5m04oxl2mtty3dkaa0hujlv10wsiomrcibrgbi288s1kv2uv3h6yda9g8b86lnllmtrpyq2m',
                name: 'bdphxili4yeqqh7nb8n959a4j9jiab3ghu7rbxw220t7xz95wwptvbart2cnb42aytg3n6amdximpkkz6406ji8r8fmkpujn1yzanulp7556ndkgdp896c9k9yhujakk51a80u4e5urfrfm8gnlgqv7xpwtgomnd',
                flowHash: 'd81888zprspxz0vl0t4uyk988utv2xschcgan3bb',
                flowParty: 'g9cy4rugt4ss3nu1lm6s9sum0q0oaazc4m95ru3o1aylxckmmua501c5jn9clfg850b8teize02bhcf4j933sk1fntrtc10lvl6ymw87mzjx1qvww84scuou0uonpxbocqf0grtta74urrzq7lpec505udcsp1d9',
                flowComponent: '6zqwybltzr12ufitdccx7du7avcbx15z60rldzt7j5nmljvwgl1vcmi99drz1hbgg193w011wg70w44ftc5nqr3g7rgvz1wbbcirs87cfobcsvvx1aa2bj6h6bk57xmbcd66z69sez0ne1x2lvko5f18tixet7o4',
                flowInterfaceName: 'gj3dz6c09s5ex8shxhzofppdkw1lrma60xf7qondq086gkzfuhftf285qg0k5w3r39orzs3ghy3s4cetkb9fdh2yofx18tsanvalt739m8gat2j8lwss0j5omdn779ghlttzf1dta1mey88w44vwofcvdjc8qttf',
                flowInterfaceNamespace: 'cuhmga5egvvbebfiz23z785qd076x9lrvbar68cbj6ojkepyd7yrxy44d4ph2skyvf6l2ojz5asyv16a4u40rb58aqzrpb3sk5c2saqtswraqhllalqtpd70wtedfqnwwrkh53c0fyo0vbaeafl4xvw1rbrruw4y',
                version: 'xeh59zrciup059n70ehm',
                adapterType: 'vcyszz7l99868kri00shrukhhpdvyce125be0kbzp5o7af8ky880oudh6mv1',
                direction: 'RECEIVER',
                transportProtocol: 'bszydpnz4ju45ic97d74g2hrwvv0qvdh6nxvljxvuauvnyvtnwfae6th01zu',
                messageProtocol: '6tnrfo6oar61kvv6jw4asxwnmy1z6s4fu3r4qb53exf3xjoznsb49csej4aa',
                adapterEngineName: 'mgydcoj134rn0534l35ssbbv88sn3k5cqfrpq8u6w5grltjthp8yf3diyy678mf3gvebhiugwcqpigoub9niepc1e089obju05d6tn684t1kpmufjlejeinkx3e8900jvn9p11419vv4hn9cj6vb918ao0rfl75r',
                url: 's54qbwskdaeylkccv2bs8dqolme7jiw15hicqncxeg3uko23ipefimqydohx3va403rk4fmjw9h42jigkilmy9fd5zwyw0ph3vui3harijeqvl22xupkzdj1qwd984kmdn7kryjhm35op411lhe025vozj73wc3ivhmramhtk7btb3wjziw7g0i4o1ae0byim4qggxv3g0fbzjj6o5saj2bko2c2c4iccn7tcot3gzm5ywz6xp6drsqzhdnuqrrnbogeg8l6nuh3csec9yca7n0febe9dv5tprfodwmh337dhmu0goohpiq047omtxy1',
                username: 'zhqala6rzcqrcvpgx9oqrw1uk24yhsfypp4oqg8vf3d5syebl2w95lbp12ad',
                remoteHost: 'sd7eahi7ue2tp94f8ov7yi0ge9z9b7e9nn2i2jmhceufx578m4c29jyrr7gnpbl5q7ucve6g9hcych9plpxfozsg7txtbba02cgc8vjc41nrpuxpj75z4wtiob28402ohpo3xx14fb3a48ookma4uh7saay4wmip',
                remotePort: 3972070996,
                directory: 'f47lbcyyehqw8cyyr6sir45h5hbo04qse1qgwak02qyenb8v61m0v3lzyexkx3qs281e85shs87nes4seqt9zn97iweedmf370p08k019tox81x48eevgui220l10ph5cia19bnhw45shy4st0pwaer7lsmknu625fg8m2yktnf02yheyp660ti41c7jxj4a9u5gc2syvvrlz65eml2e4sx58xn653jei4l703n3o20bgrerlcvoa4b0tui9ne39yla29jlw53x6ocv3ct298gxjg2ro6nondsblyk7twnc83p0npirvkza29neq98bst3109zu6lsvoou2755a3e446buww0kfon323v3lvx76qc0n6bymrwpru31dzdrwcur70tjfokktdrlr6qo73d3ihjjmzif7ld70q81hm94gynzip2jn20scioapc92a04np1wnl2xbs9igpp2ajxil6zeh7giijy3gsezr2fu3qv6jr62etwb5o1m0h14obhvqecixoxrhki1pkc8oa5zn6d0gky6s5lpa0vcqk36mnwtzonvehzmc9lyc1y3yu25dk7w9x6aencuqgapao9vret94tdu5mb11lq9c2ebbyjuuk367ht5go7dursc1yymxfyo7xp7hrxs6u3zk178x9idv1v1kcqjao2546di9ljq98gt5y1klgymz0j1nuj0gzmrlf6uhypj60xco5kvkxkk24wpxadfiw5gjyhiin4wml9ev0asm5yevi14tqffotddllj17eq8b1n842biilypscdrngril8qvvzq9t74smo0fv807ukzt8ia47fxqmithdisiubdfzzc1z1e9cy6ccxcd7pnuhtmbxoe5jj45l83hregvdlp96bl93zz3vid8kqgga9fyhbh1sfnyjbevlra2ubhimnsocph3nzysl7sog1jh3rwhusdzpo78szhdrj2mh01bi924kplwg9ly5fykb4w46ypvjkrasy52rb28hki1uphpsaz3txa',
                fileSchema: 'e50thxsoyvo7a38o6hn4wnbcjx4sreqrwrqzoqkm3xd0z76itir3qkxbtyqrlxzc8vtzq0qa7400qj8mne02loojlwcnxwigwhau6w4yyrpiibcvfvc1uo7edhfd0qnydp9g3c56jcrj1n1hzw7hyr8nffbmzz5rmmsc9jghaq1vyvdzw5xjdx93et2zclblybj5o7zqmqmgy885mhvpk6343tdko1pewyy2xpsbesmi1wag0d24jiajo4gqj54dtqez07bk969jjbov4meciyg18v0yi8mwnmgoccngjzpbwovyacwbo3semoj8iqzto50yd7gmhi4ef7y0gi2clvq0z8bailpi0xesgtzzghbygm0eu1bgy72hiugi4dbovnndgcjw9mrj59of7nbfrc13llk4bpszeu5avkpyy5ufavp1y6h4avxjlos2fimbrupbosya8z25n1vgtlrn0vfmbvosxfnub4tsnqgu9gnqkg0ds89uzswh43kw80zwb7tyxt5tfcmbhi4is5etkhbyh978jy8txp1uu0b1jvt0bnk8wjguo1gmz1khiqfqitcu929mzmtvofl5auztnc5isdaktj98agsrduzc3h96qy2xnbp8ilbdau5fx795qccbwanwf4b850vnm1ngxqn2vw38z57u7hj6p71unzfuh5cm400c643zacfo6elce0ddvf3w11tzmfbmp1nw51unbldkszlhlq4aqr7v9w21h2pomxdhmk7fm7gf96vtez1ihtcfrd36kp0hze27257261u9qjn7y3ky1vsi0uczwwqz1rw1k1di0ud3ugepiuwu252j59c0j8vtwyrmrdy8zp16uzcmpaej5e31l0vf76cqgp7rckvhuscg6x88x5eext1zm6ric6h64znujsnbc2yu951gooyqohogr1j5lv4oo6dhpjiwin1mhhcihy4grg5127gf25e1ryfzfh3cl6d6zxicchgzpzxiwk55qmnma57rycqfl1tpduxg',
                proxyHost: 'zjzfp0s6oyz36ggqkqtg0bbureq4xy7405lbfd56leirueu9sq3l8fox714p',
                proxyPort: 8861168372,
                destination: 'ykeiz8zrgyvpss419v0vvewg0ynj9yrj3aie76jlijt93tg7fynrh6jgr8ebc24f6qp2yi8p713nnb7nlzc0nzmfb108z0eztsy8vhvy2vwzq3ilfpwygstmwssm1mih1qxdgj64tn5yrt6ykzcd1dydz3zq9mg9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r5thkyz4haovjq05gwim8wecw7oh0kym2h0s24xkrf9fgyjdg73a7gjwyyw749binpf1h5587j8lb2aui4gfl4uwc38w47f8lo3gqlqa88e0gko3jwcakpwlo4bbfntlsw5cakcoueoqpoos0q6wup8g5ikvw27b',
                responsibleUserAccountName: '5c8x49ra2kmk5w0564bb',
                lastChangeUserAccount: 'aiuflb89hodty1ahzsxr',
                lastChangedAt: '2020-08-04 22:59:16',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'b5nme0ro8v1ea4eixvdfmpt2u4d0d40ugfhgbpjz',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'g5jxicmhbfhswdukmkkktz8lk9xq80olc4s4jqkzbv5bj5goh7',
                
                systemName: 'tl5635ro3cc6o9p2od7h',
                party: 'jyq5ya26yddewc85wc5kbwu7y4jy511hgfkpn93edxmv3v61keqgrvknmush8bugmragpnj47rfwil1cwtp9bzj84bfodnbtxlyv8tc4ct1un672qznkib3zov4hxyu1k2jy9c09u682pgt33cfb6b0u2hd5irv2',
                component: 'e4cn3hg6bd6aohmiwd0fuoxofubauqgvkizqob2tevc4z8pi6wnsic9yd1jzicirkcsz9whhe6jsqfsau73e7ujro21hpeztpxn4pss42bloh8v6icy5k3l2wnwt0men3afzvn99ipm4us263mjxfnevuhk0zh63',
                name: 'e3nwg6twilakw3rit11dcgwgsrv4g099568ys56o7mziiz6vqqr7djqeyi6mdicj06by5a5mjmk7m58kaore95itraxexrc52xx2mnp0a2tdjgd2jqwkyqgsoi9jyydt22dqfbinz0a5obym1ggiuxlugngzgau7',
                flowHash: '9mez3h1a4t1oghx1row3lljdzfqi2g3y4vj1gbm0',
                flowParty: 'uvahzfn3vcovbfqynnzyi0bx1cas7qelqg264nt91lsjyuskkemjeh8m8xtnq2c8oojn52o561n25bjdtum9tz1zxpezk08l7lzaozocpruaqxyati6hsvsvt0g5wbci6e609fyi5b7gek6fwoe4a3xohqoi1cj1',
                flowComponent: '4wux7loenp73jwvfln8utdo5n5dycf8lmw5uh44pgqql9tziu6u6s6hzoh3rk24zq00ivi0xac944dn3v8e25mg4ia8xb8drzji2hklq1uldzokle8mzspgjbefpg9qguat12trwzxp21yh9v7zkhg027mkpl8gk',
                flowInterfaceName: '4xo8wk354tqdh0ie7hcej6g21gkkm5eosqk1hvgf3qnm0y78dfzk8a1ubv44o2oj5spi3c7ie4ny6drmnm0d2rt37k6yvdwo6xeyetf36fd9800j7xy95zwnxrd92y3qg00n1wolmca3wz27fhz6t0lpc2dxss73',
                flowInterfaceNamespace: 'jfz7xp12w64u348ksax0d25j1wdrywhk76jqznrginu6i62sk9ggpeokyfmocggj3nls56u3pbjqhd3ah1pxxjx6j6m2mqdilnhv4fcw4n29q4u5c4fme6sxgx6305jq2yom4sqkyl8mk9kkd5sxmjv3rrvnxcgf',
                version: 'nk9m3y56f2nju059w34i',
                adapterType: 'ju2hchgbztbq09s6431u77nq1xn7ec4g12i62kow8wcyfa0dygfz4vg406ug',
                direction: 'SENDER',
                transportProtocol: 'yp13m3txjqstbf6c2g1xjrbtl2qp32ki4aipxitqvk8d3qhngyh69ggxadya',
                messageProtocol: 'nl7129gdqnrfurh3lpx2uktri7zepl5796z7kbi3uxknfkxtiq36gckgnkiw',
                adapterEngineName: '811fkjccj5kd4vpgedssur8b4l7j6a8t5vqdh902b8y7vfa6oskixczrukztr8vycywp5ranvlxljvqmbdzhw6opy9do5b091mlvojqxs4jgc8nsw73h4p734jcr480qb9kk485rsuxlex749elmp8niszxnuddw',
                url: 'mytytx9pcxvc42ktlw7dwhrq0a0c8y3x5roint8ej4wxhzoabk5gkydoigk21jf0mi1ie1xbts0g9fpswbv0fykb3fr86awsi83whlqo2xayo0o58kjbywpkyqn21mkx8xz3bk6bxp8ownn6fcxkl9q9rspjogcc4f58xjzy8ad6hnxvisphl843ufz7eibynd9uab9th01t4m1g4dke0f7udo63edblyb02ijfly5kl08blgw59z71lk2ohkbvixmo2z59q0pm2b8czxeraclwy7kunmon0yuj3m3512p49bsl45c73krtuk4qvwt47',
                username: 'k6yznuhxmmlonxmq76ou5opyifnifworym7me0mdg9zg89osqpikny2lfpuv',
                remoteHost: 'xlxi39wo6p1azcxv6lvkbnyo43959ov8bue43he8s484l69m3p371xcoingkr43j7wp208k2wzsablc3jryy7erns32oh056xn5k72njv7ya0xhqg3kae0qa7b77mjy3ymx037lwd2jct51ybg37q3y8rxidao36',
                remotePort: 4988255682,
                directory: '1ucvp9cs5hksxzdxvvsdqr6fzo6edyr0wbhfafwun4cpe3ldcbs88a8u0nlan9237ozsxibxbuyo9u5erlq7y2j6ud0p9drcemm3nox8ja4m99yojppuo1ziis6kojcv0y4ehtmwgeb6gn2kirozixmu2731v4yecf6y6yek3qp9ivbuddsedhffs2ibqphl9k7grwuf6k78atmbopk30muuryixfnr7qfq00xz3wrh7rfz6rqbbhwjhsm9llr8h2d33nh0z83tz9u0k2l9o5zqa7x644w8iu90oc7j6qjz09jhl32yhdfevxq7ro60mp5ig6l52kcwbik07atk2fxzjt7f2dohx5trtq8ufto92djfb3n1ogzkd1nnkdy3gzdce6qnwcfwf3fxg7zpdxuvuqf603potizgj9ervqu360ze25ynqcqpvxf8va8gea8rxc6cdqpgz4uvlr2zyirrc59p1ixgtly4ugjkp1duog2e9qq0iuphgk2vqti4ptlvb65w46eojvifrhgcwz8irti7p1lnxvns6iomonyb60el8ihdmodd0nvcfp6y1alowtctafwlyd49val2dm2828zqik8587y5f0it6u35lu9rrr669pyvsasy8akif2fu0pviajk73s04q7iau1zudva905uesasgli9q6pjvolqksjhukkgbnah1zqiowkgkjdu05h0ic9gb45z3bduui9ntv91agnsqessnujp0fum07ve2hx3gbr76nqqtvwz576tp65yecyr4vwn0hbujr6vbgfk8ti05fwyqe51fgbtv3jc02j183n69r17wfrmpoy7ixpzaagw39wuqpzwy0vo6gq8luwoc86h2ikb31r7il4qw5xbhjfs2646qiv2f28w0wwjmerlsu2jsxlewvmkg6a30vf4vn034yqkn6e0dqj6xw6erd8alszc7dqcti2zz1hq1n9n1zc423wudyz17uoex4a6dmsnl9n9q2qw77suziyicr3zcpdv0m',
                fileSchema: '7njuta9riwn1qdxxl6zo6u3wy2ed9l40c68wyfgrq8wvtsp6cq2qe7u321kwbdhyovglrga72ulgijmnpn06kf7m4ah8el30m4aagjbe5tmu57emfbxs0a5qt07h6wf3og83wxqe3uydty1igtokb3vefzd58hmwbva26z3qfyc9vqv87lb9xc92sy6n53cav33s5z1gc5y9crp0rbd09gey1xqdubbl4zw93w33mruni43jn4eztsgmslbmn7ijjvp1wzj66vns0k2qalwttgnt6wvihd584hjc8lsjpzbluvuigoca1imvm9tnwezgd373icbjaotmrdqfzy113pk1h9793e2ii4m9d5dia6zenixhwhdytg7pouomq7ixkl64xaxzb11clbaabcz85d771f9ezv2o82vnzd31g1aiq5yf29no8mo4fd3l1iuocb4fubkg1nzdepsun9do2jhd9xmvleh89hvpkvjhhqpiwnrdtyycciiukkdl8nq2085i2y6jigjrbad8ponh54j76caw64cg7nrr4nq11llviy8nrl089dpko11ogpou47xf5h97w1bq593fufa804v68clazqonerronny0hwwaorz392zvkdildncg5bgrydem8v3socp9aqticjddiqrx3yziap1vplqydbwy991sj57ifwrz3aonhd8svcq7ad7ql0j4bdff6f18u0qxwr1zvsy6x0ze9j1xibt5stf4c5utyunwjq5pfi7uo6buzneu829p0r9wj58mxj40hysx3whon76qpq20wdtawi7oo03qh3ueakavsprxxi1dmk1xavum1llrfh1prxz4c1gfcg960ghwbnjzz3rn3sauevxqvqc7zld9hdiqse3ps9f1njc3lviuxsd48pqgbq7523nuchxdu9yijt7zx7nf4o4q2c7q4gsfs4t003r0o1qxs7b4kaaqeklff4pajw1wco794e11zso55o43exw499dwfiyml695nqs9h42b',
                proxyHost: '2ix43efpkdvvltiybce2mdzefw98ey2e7tp735tesxsgbt8m2dgeu6om64ef',
                proxyPort: 9798424834,
                destination: 'nsvtgq1cl4xwrqvnp6rtg3ds8jy019wyya7vxcl96u7iut20nopsecz2yfq6t3qid84y43nm30bk04goz00ij0ja1rjo8yq3m47xmmx1wmqfk5e67cgic2kybwm9aqkxh15svrj31z8o8lkmdmdxly7c0u9ietyc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cksykatmky9hbc35vnkgj5esb84p37k38h50patyuuna9zjrkbnp0y2b30qqv0igb95lolxr1lyyx08ejtg7de0vfi5scgpfkd32u6jp3ag1dmoz8fovlbf97c497obcv41etb7r5athh6jb0mt6yxo9rhzub6tl',
                responsibleUserAccountName: 'fxkmskuw727z25nhev2d',
                lastChangeUserAccount: 'elcbtqnx0bekfhww2j07',
                lastChangedAt: '2020-08-05 06:26:07',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'vxtqvbpcrn02enzpjmqktyu88q4vxt48j8vsnt5g',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ohikmnl4uzz84qarfxf1nknjm0qmrrwupt7kujkxi7s5t8bpxd',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: null,
                party: 'vb4i9l1135koimol2ck2xwhsvxm5fhzwaz6tqe5vpc28cw97b4ajnn70hobg9q7ihieyycige5acmxnm7x52hh46tbxbk534deve1cpd0qfnlla1jlsl0n4p1kiju1hgw4ngpkhczxe92nufz2l63rf371l3h01r',
                component: 'ynbl3bjd5rbxkk8cs3b7hd6ux7k2drugpodg6jjjrd1gmy5mcy8p59taoecm8nfayklw0d3y4mwq6zmb8nknfmlnogxaeddu67e9d8745adz8213kxrl2nim830clfruiy2vi8f8k3bt6koztr39798ibwizyhqt',
                name: 'gemjsz29t4ezd45rp39jdfxoij6x4u0t83d8nepzlspe822gcry9k4p7fcevj46lg5h1n6ojcn5d5gthnhe3pjc5jhmtf5blg9gvja3vw3xfewu4jv7sien5ombpfud7zscm5vkzsxgy873ffpowfmzt3pqkksbu',
                flowHash: 's8y1xv1kqvhw78lkso2s656abx0tiuvnl06hedi0',
                flowParty: 'znulf8v64yvgsmi6l5im8kaz9zjzf651uh5ieir95et2ii42vv5ok9uzurio5hl63vkshp9i65nwugjc4wyaza9vcsj6vclxyxbngvoryxewu0fifeuxelhb9gktrlx8nowli17wk9ucb6lne9mybe1yfdqjcyn8',
                flowComponent: 'hxhicustkurgxwcuf7o6s66qdm3jc6y1pocoluge62l7a9szgj0jwxuse67zys3uol1yghkdgj38rfhazwmhdu4dwg1xcbizrlxm0jzranzmfuu9caengrcg1aw5kbt4pnfjra7zxbhs27xtvkr0qzwgygubce4t',
                flowInterfaceName: '6ixjeodnjcqnf2iunt66493yxy3kxe9984zi5kizwaid4j8fef63y4hdwrb0r91t4kvl4fadoi23bwhqozn1xkt4t63v8ee1tm04p9rjfzc3360su4kixeok7hqeoxabllkqu2ydfgup7iw5t6oj7psji6gxg850',
                flowInterfaceNamespace: 'cqf5wtlsiqhxxpa22aj0nx180rn6mnkfh3ovn29nw0xn0zly9gku8c69fhda5po26sefqa3hfj5r75o1odsdygrv5cpzo1phnbpkgkvmz44f7b5wcph8fcj3zmvddbu7j4fo1w67thaqtvirxyqh2mce4yy32xqb',
                version: '0rseu574imo2ebl1333j',
                adapterType: '6mbybuilvfxz5e7awwewgzwudczne1fw386gdwc60mq3fy1vglq6c0lc233w',
                direction: 'RECEIVER',
                transportProtocol: 'er80b24tolpi5px6rsxjvvafhjgn950byl3vnas4uhk0qn73xyi4b3nnsvda',
                messageProtocol: 'p77xs1p6d8uoolbvuiye9dao1wbkc3xcjqkvmz8tsqglyfpdm849b9pd2b46',
                adapterEngineName: 'lj02wo5enpavdcqdvmzfhhaek8tag7h7hfyoztfca2p94z6ovwquo143o0ex7p4s1mctfzynlrvlexdij0dtyoau1xgdsmwe3him43vo5el3yl9s3aokz1vphqi7cgfo0la27v9qru2bslxm3wjx17xnf2laffly',
                url: 'b6xcm8be91l0f4umcmkbefxtkalxmt8ofbc9nutbxp4a74mb6sz4et34josk4ipqw60pf1z6a1lxpafodocp1ju2i1fh3uej19opecm89ligpdd9k67drk4jpeinmb6nqu2dw3irvoy453virft3hhqslm7ea115gbum9a002vxg9d93cjz6gd1jsl5x1q5kuzqvkcwi0qzbesl5sjziz6v2iz9n6dzcm63exv5pc40jg0fa6sqr4va7ij917940o3crd265k2d4em8jpl2wfsuw6fotkdmbgmb0faj59b7qpjnkwv8f8gqnxu6icu2m',
                username: 'kmh4dnkm1kjsenywmkc6epxtu29p4oa9idvwgksgplkg975kkubitf45pe6g',
                remoteHost: 'petnw617xegnt60pmv3743drmbsicybnczjkskckiwndn8n5lu4ynl08x4pk8bx2z0bgy1w2mc2k0ukyrn64zukd1nb93ajkk2vdf2d0fy05daiea1qkla6slrt9jczn91q3mp4ru8bm8mlg15o0zdo4njjdkqxr',
                remotePort: 8623168124,
                directory: 'uwvy5l7y68kf6voerorxrpzni7e1jrs3dxwp2jr0xwg6c16n5t70pkieed1kakh04y2ffyz2t3t2uno0h5oohe1o320sypf5lxe4iedsaub6nvyypha7w698drw7f5ydft3m2fxjoothij4wbavn9tcvz1237lx4y9twanwocy91y1fh919ybyylifh0wysodogcfsvmgbm2lf1sdpjmtm5ao51qwu9bik5ugo6l0vah51cmznzsrvpwy1la8efsdikkpf8955tbd3yx6jtxid9ebwaq0te84qthgklhiz6knuf8tmt20jtbqwezgjg3f2sl9qdrusfgqq178h064pwczbk2aw3btoqbjdoczirsiwr86i1xwk4nxfb7o67mexblwcmhxo6hagna7woht7fpyhgqz6pbffixryfxlu3xamykfep81cp0jcj6710jmpbqbwlcx9jdgyqfgmtesesp0t6tevd7myil052zfu39zbes9qwcj2u0iqnlfy80mttbb1gyltgdukxoafvw21vefrk05y4bw4po7ghv8fl57qlrlp7jdrmkqqs6ah3kgdm5ss5bu4t2xtjt9lrgodw2vmrw2nkc0aoa74s6l966ta9abz4mgqnuzqworusa7avju8drndpsqud51mkrsea7fvog8oeuqfp899rzw7qvbbocaza9e2b5tj3q3u0v3uma2vrgjlj1ambib6p8z20a51o5t9i393m2aidvqf00fketyl2hckrxxz23cjp571sbftv8vsvgief9sh8a4k61p6j252dt7djl9i1be8iuumwnu3viza8id7amblc33l50cunb0fhtttm40opxp22f2imrattj6ws9rzjmo3n7w1xr60lw1z66q7kkqb1vwxgezvhva8lrevno9yagzlrgt4gsly8nja1po7zu9jhk5c3irbbxzhssxap3ogdv42lqnxh3nuwtjfy9f87kcmwkh3iv1vh78uezczy227wac7h6hgolufw07rv70i0o',
                fileSchema: '1lbqcoya2xkpz3e9jdcl2ou0oqi3g76kazc7cmesmq4yrn5tksrmcp1nqhawziza17avw4ziik6eh8jxoddaa55yin5fndog2dc8t8mjrlb9bljgbeon0g6d037pdcklsnexet85vpw2umpbmdgqv1segvgduuvb7irdekw7z0c705ra35f3dv3hgc5yuggumnaysnh3q3xaofoh9ngqjodovf0h8alkcsq005ty3c3u0arda07po4zohkesq8cpz1naswgr3o87o0qmrpj7xuoahqtkd6zv6ktmwxavj6kbnkb722ah9dftreo62ucpluf6tv626uwe9ml4fxsmjr55kpnz9xzea1yerdku4jt3oqexrqqvutiexdorjrf3hq8qur4u7m07akmtusi06ucni6f49kc1fp84b5uttxirboaclzbv9rnmkjiv9w9ay9xwd6soyyo9vgl1ei6mpaxzgwvev6l4r7og9du44wy175kcbd4nhe2rhxmusdkjyn79ayilav9ty3c53dyq47mw6uyquo2xi7200me1wshg4ghnd9gmoj285e6i2h03xahe7j89k4x5h7vatovtchrbmilmqozy6tq4nkix3bre7x0xylggz8jns7imjh28618h088xgjim9d6c0ee3izf75n043t9osn9sfout7nc37lqisqvo72rholajdaoiokbz22y68gczar9mn81dewtoj9f4rhnu3p41dbuhzegpmay1jay8z41of735b0l37wrva2xznjut0f9mtpexcotasb3oyanrt1x5oazxlfahi5qhpry9n403b9hxpeb9qjvkapuv31gjgevydprxzh74qff46xatg2lpe9bkvydhygl729weysfj56lhnebvzswdipo68yfkgulh39xovch7y2i515gw0gcitxo4a5trgwvnqqyk4ffv8dyii93rd0veeh75s6lasrgwvp4zrz6dlcokrn0wqnlgb93vmt0cqmxlvl18us3ifh96oxy0',
                proxyHost: 'tmprw2p33eurmoxmyk3pkxyjsqt81b36kupr9cy7qy57g1nftxu18ioakuyx',
                proxyPort: 8674274790,
                destination: '0m0wjowyjxoeao9tgwui8xst6ly0du1m6nia70yw60m43urplncsy7c1d4uwt61q8dbe1z37kbnkg5yxa5vrtc1qlu82ljahp09lpm5rs1n3hyk80loh7iftt1mymwlj0lxjkc37o4muagzv8uc2jtq1i1jnv4os',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xg439tv4acy296bozx7dum8n6wlav6q5d1wld8xjbmiavwr72xfk1e9i6e5himu12qkgjdzex5de24g9k5jjyqm234rx3albe77k6hpdz4sx78avzsjqpzckvg7kosdisfyowh99ib83gznzs9sd1g4q3oig9zz5',
                responsibleUserAccountName: 'ae37m0fgz4fuc40se0sq',
                lastChangeUserAccount: 'dskndwasu8nwciphdbzi',
                lastChangedAt: '2020-08-04 11:13:22',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'cy3f4p1g52n9xw2cuwqi8vkpim71mf6dhw287rsv',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '2w6l0f7nq2l7n3k46nll1zg1dp1bmeafd535swyfatejzwdj45',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                
                party: 'wpsf2hnokm7outysqb95vayfon0cy4jgmplmz72f5reibge8z1p29dolcq4nfbgymo5unptfifaz3b5n7yj5wqh1wnlmdgoe4mtptx68zuvqtebgmk06o9g5gjrosuvqhb2ptfmp4bt9sjvubswo5c84ja472x1v',
                component: '54vkwykw75qoeo84gtwkmi3gw9594l7g7e3uanntpv7ykp19tl6mso7ta4ljz3ndgr9wahhwxtux593rllgc2fzcbs75jozwai1eja3lb99x04aohsmxjikpsfmur4nm52f9up06q8azeo2szoxn44k9zfty0qmf',
                name: 'qda99tdinzudtrqqc2866sorb77811a7tn6ynzu9ycsp9mm80udfae2blerz3enx830v9bbi2d95bofvexvmat76g2yoczp9fpry1zzqv3sp9zb9wbowu28fboovduxkutxog2ojgaq9m1vqspcn2dogman4p0hn',
                flowHash: 'jryc0wkz8ok07x9sek28bn042q906fh56pbp6emc',
                flowParty: 'v4hduaom3yswkpc1747qsz1sn0t3wkrxe4fh0fvwx0jel7ym8ufwo4v2gbzazng495d3z0n9y4tuleugd99exxxd98ex8fas4lytab8zr0vzd18gqiyp5e7y2c2eo717j09x1v2wk1jjzx3fsbr9syugevx4q67m',
                flowComponent: '3cxz8oa030qhh3f4vl7ie6pj0vte8dujn1x31d4mmv1k4zdpcr0j9dn5m1tnmh8mfhlo8qwfv4gxo9b9v1dsdjzl81qu05ckmp2kotwpswokwdsj7gwzpccdrkq7b5ikfix5w9bjcy2rm5zcaxewxcrsxtlai9rq',
                flowInterfaceName: 'q6h3pb3aciq17wqctit56y89ghz7v515acabr6mm5jlys7zagjtandn6crih2o3bgeo2culaomvq6nesqgymh1mm0a1d96o0reovijozfhdekq56twhz97fl0nbnhkb1epgnopkkec645i2xj4sfsuk9q4g24fr2',
                flowInterfaceNamespace: 'mx2l0othtimxormcrfxpy50z05qad1uc0a9z476673x3xqnkaxo673actc1ubkeaaqxvszcon7oh14hjqri35uh9lg60afwzunghgmqm1033u6g5lot2ziyeoi4b8q42pl9jwhyl4qdhngpag91acpfnmw9rqbhp',
                version: '58ornzxid3preo0isovx',
                adapterType: 'fybcdu7vbywvaoyu950g72gr1gd718vgk4npx59ykfwikibj51470oyy9nq2',
                direction: 'SENDER',
                transportProtocol: 'mm0um9w2m7q58l13ev4v7w4wsn4msepg2n9w7haqhwnyxth1bjmz5dagj8sm',
                messageProtocol: 'mhgczno28vlam3qvj3cp678e2rcf4yk5wjnvff1059yztqsegh10bvh5ampj',
                adapterEngineName: 'zqro8upr13f3lwsax5zgg7l8pajwwg9pyh5rfpa6ol0w0c7kan4xhewhhu1nh467848b0vv6gmbdqx6p9ap9xg3oa2nsfwxd17yutjh47t4nfu1lwl5yupt487nsnc4dy1g5vy33i0kdy6a95xto2yrxwj6e26y3',
                url: 'wzoiaewbi10jg61b5soh94hla9zhs8oypklsiparfuxjma7a5h9qyea3tm10acj6lb7651s6v2vyep1648jjo9ewxasp8mxvqnu360xqca5ems0d0mylcwqo744jdyq3z6zdo7nfatxutec9h3nert861sq96q8ocrkg76og6vtgglbhq7wl94yz11n7wvni3owzp5azgi1zkah1lm50s91ptlx1k7b700zln4rugucpeywg9rfy8rctbkah49mo4yek4ghypynvt8cnm9hnvlz6tn8hqog403q7qz3ibpyarungbpicx6jjui56qz0e',
                username: 'f3eb4zmpnqfv5v3jlnx0ilbz5fix003vkiog9kwzmczzldusi4po2y9nyhkr',
                remoteHost: 'pnddaicbhnkr46xoiurmmapa7fp1snz51tx1ugi4yxld9ytl6n4hh29zdioqtdiuyd55aarux8jmjbbecriond2z79gju2fapjy5q1j8l77texqts3hvmnuwzfoorwrx6sk9ng0xxha8htah8cnr2b5lohm2zxao',
                remotePort: 5691004323,
                directory: '3zih2sgk5ztel3nzhnufu9axm5s8sk08tjtx9whqykv0g68mmjtmdok1nyh5j6rdz0dbnfdffpyz9n70wpqolmii8kwgtldejwqduw60ckexr86yjwg0buqzr51nrinlszpjp69qvgkgvogekr8mwaz45f2esoxty6y9ied69zrwmrzej7u82qp8trmxd0dz51yyrfnv99u5pa0hwhz1936nd4g5bnj4pjxxdw27ynkn64nnk2yshpo585j741ip5joyyyxdqv6zuxstipa0vxhb6cm0ky8wfwmdh9obfcnuj6klzc097q822uut493fzo7denbvmt6gg4wsgzqw85qse721e53w3e59sgp3890x37vh2ltxyt1a08r04flbfpibu26147riahhnkzfger8k16shmjgbedc82gikdqvk5ahrmvd6k9nxmdzcva9vjxv5zuiku5d500hayk6862nhovkeqixs692fny8ry1mp7fcsdb1dde3k0ykex89qeppqtx703uv7vrdhw6c3ao8zgor69v1ohleio0tza24lipzkjnx5hve533nf3tad02u1vn8jbhocc4w2chd5wglgf5p3p6ypvv56daa1vsvv0olysfd4zahdtnw2z9qi3ete31jnsqnwian0l3qbkw9zhsez85tj6x7qjcyakuyvhc145t8k9bgrg4nl2486gzr2ohc3upsdp9ueq6kazm1o8ds9x671tzpdhbkwmfk84ue8ulb13gmca9mkuzpawam9z7fre1apyuq3c4zw3rxnd3s9hr0ow6d8jgpz5e1ifcphlceat5zqpbq2olo3znnykwrkhb1jx9g23dzdfn1pysj6w7f9iaz0p68sk8k9vlxxa9qn093jf7u8yuftxcvl0bt9f9ywpgwi8fjw211le0q8ydolweh1luilrlfru5ksukahq8iwf06iiqq232y9qa1rai22ef9jcim9yz00cil03jln1g2qcbi4tvfhpvhq9elt2i0i00uec474',
                fileSchema: 'lia7fdv90l07gi0u5l6dm6wz6dkq0stx5t9z5a4llv3ige7byhswz7r78nwrbesd6y37lsoh5c99n06zl8zqxl5x1xo9mynp0dids6ing5bz4fn89iib57zu3czmzr4cyi8hpekns8jw3ypn1r5oqmddbvuigacxvc6wukkjlib7vxl8i6k0i67wjbjdo784bjgban4k66va41c6pht9viddu5w8yl013f7cwmkyijj77y52jerusev6pxuuhhj9hf6hjucs6btqog1hiw3y5u3kluyxhqrcer0txecvvsl59sbuxswlhfr9ryi41r9mmugh75b410hfky0xxsak6mgu4y32b80ehw1wbuumk69mvutxa8nuaoi7msixonsj56569p9vwv0bcjxndn9a9chp6lpfj4p9fmim1xtjyi6q1ayeg3f75oyyc7giinkzsqbromjrii2n361962d3wk0mwcfeyqcixpqgy8bnmua3rbnxlf42p6v9yquvm54m4goueto711bobw7w12r9tq7rchgtzvrsyrf8xjafhz1mps6buxpvqv26se7e7lxgtjoocvcohiwwvhcwcitehst3jnxdveg5munwg62av8kpkegddawbaancjc4q1if6hizvt0d3xqf318d7ac41dxiir5wcmcwsn5i2sn2j3vl43w1d1z3vup1lettw17tyvstozsshrrbq171ytcboepawbr0b8pm2gydnmr9cch9me0yqzesp6ymhfyv4czdnz3bo89lduxobw39qh0joaj0ibk9kz08waobvk024v1c7c35r8r6tc366o2lx64kscoa933dy3qy8kaw2kybfmyp4yz9hq0ko7s4jdnfbypp8jrhq7zyuak3t1njrn03rdpag7ijkji6hbpwig7qhp3g72g4z3njcpvhpdce3ywngc1v74bd2wpxrj6y8ikxe760mdcot1olr1s91bo237c5mrx8mnkezdbvke6mn2py2udswi28i3n4tqbvady39',
                proxyHost: 'mkzk5z83gyaiujywuascp5709sya4m1hbodzcg9m96yeldq70gqi9zb4bhiv',
                proxyPort: 4442243735,
                destination: 'rcug1p2oqh1j8be4dyr3qc5tkdovn7yi4ejs64ilodevvx4rgixf03pii52rk0jppsvjb2hav3yqi4jk0ejfmq634us82uuypif6nvsfkgin2cov255scm6imwm6ngg9kyvg7eoeofxr5ixktj5eyxyxgroa3esx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wbkzm7wdho4ete6v3hw1c1coghn9ywjf3sjgqahub81bf76maottxebggnz38bg2q23cezf41d21606tsdrznlu1lgckjff9ae0m44wu7bwkk0cpduhu6xn5502c4pcdcv0qlmvr7dafopsn0kvr85qne11f8xjd',
                responsibleUserAccountName: '8jgmyjvmfefhi16imkrp',
                lastChangeUserAccount: '3546i2watbnu21qpas29',
                lastChangedAt: '2020-08-05 06:19:16',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'houetl37dx19xrtqyt8of3yptndb23ksa7jhuacx',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'b49nhpq453qwd47yktlc2huleuhgfx28n8ejjb3cbou58zx9ve',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '9h7z5xltj4wq6s4wgo9u',
                party: '2udx571ggiai6vu0js7hsp3lfb9u88xxuowoifrej978uugvxx49xdnrq2hyes8ho7qor5nvdcywtksnzj08end34of2y8pz40hkag7zrbei5eceyxv61v5mjuypuj7maqk1rz7ef7jywo9x0y4ltsm133nh5shr',
                component: null,
                name: 'qio6sp3drtjfxk8ag627puwn4r1ajm5mbhu4y4n36ins4so8u8z38n39h54q5cupb18hj4qzlwqx8ow7i8ommunvb3wil47yjwhsytqqh7dnco4a20wzkgv7shmumm1op5ju22talcf94xoiwgm38qcmmmkytu2q',
                flowHash: 'sz34frv760ycpdquuqing8d74jfdotmjuaabxe7k',
                flowParty: '85vuazk8uwzl3q3on3n1y80ciwkvtx92v9ff13i9v8i7033kp5aj3n3zwxbiyrh1923calyff6axsnudhic88mslrl2p9f4oja26e2tmeibyj4a2py5xppap4cjaycp6oei34a3ztaiuu547q07j1ndtm6iffzem',
                flowComponent: 'ktmsx8qawwyaneee6em5ge805fayjvc2krvlak5ontwxabz03hwb7g2csuxxc79t0i1euka8mikw9hhw0l6hv75rfpdkhfgpt5mpk3hulvcm7mn43yo21gmb8e6f1fdzkmx0j8dlmcm09v0wc7xfgoi3av00frun',
                flowInterfaceName: '63a38w789znrq7wk5zwsds3e9mognvux6d3vvt7ru9ttp8kdsi6ff0ht7rddtsy37qmu1vhqh3o298dbgr6320z9nqcadir6ld6d4hc1ncadebm0x7bdx7u83z55pxb9p7xa87muyvf2e95dpjwbpq0ikhxexqml',
                flowInterfaceNamespace: 'sw0vr6knutr5zvg47rscosqea1w8d898g96wqp0fan0qbeljczmfoc8lnd93h9h2dkos1wgnuah3nldowt86giqc8ht3pasqgiv4vhd99dox915s3dxfirfvu43jv2d8084e667tefpm0wez3vam11y5zf695td5',
                version: 'wfrbm079arc50rvi4iqn',
                adapterType: 'l66dukt45umfh9qc9wsb80rj0t2ksd06rdxgrbc2uocahiobru64z4tq0wyr',
                direction: 'RECEIVER',
                transportProtocol: 'u42q747plrp06wcqissunngw0b1tfpovygfrjatd2qy83lrldr32hoibezd6',
                messageProtocol: 'k3139psf5xy3t6i78ed8jnubz1r0fxs7mituwdas4teanz0ngyo3l7zyobnv',
                adapterEngineName: 'o3715c1v1yd224uzoxzb36n16giveamjapc20quuu8zg2jbg0j8vg58kitakwoiec80emxu3lfmfsww4wblmtt8dptx09mj046rvhomqfbkcehflj7syresku6fc9jfasgtv8w9hlw1bt1ezdprd6whnucmm259l',
                url: 'n339ne771qt5kqhy5ngvxxuopt52c6l9r5vtjggvqmuv30q2y7xdadsiubtgtqmfhisyub0hg4pm49pxnvg7fh2q3xbruhcdkni1jssdp0cfb4k6p1ww1p6tr3uhmo7d360m2wf44wwobz9kpk1h3hgpsqaaoz5ywufxmlxt7en6v4ji6fx4f3eoyv9r0v94eg49oih48ggfp4gpv5y93ln3bcw4499rb3vnb0cqx4dc0lhvzcqjwtsccuy32d1w1rne0gur1cw58fukrzxsemu0eyqew2yabn2oefh852qg6ue488ltbnym45zzzamx',
                username: 'hn6uls9gse098v2avcr5svoq4nv2sjzvpb4tvfedp1uqegnz29uy47vwtei7',
                remoteHost: 'jtolk3n6naekeifau1ftvl6ct9ih83ohi62qgmr7gopbf0aglbuxrkt4tpcdbqa9slrl4r0sfuc90xi8sk4ukgn7jl2eknznzyeigwy6b30rrfsaszmxznxjqfv4xzjaf54z5stsx3vrc3hcnq1oaqdpu3konzsm',
                remotePort: 7872626207,
                directory: 'aspjv2h0cbthkhx5751a14ymozhbz8wxxmihbr5wj1b7uupdteo2fdz8sl0pezf6bmqb8ixy2kno2mjw8a5u552tiplozaf483b854jsmtdujkcbvziu7bkhk2zyl4joosweldhtad8ir45e0mrr235cqav647jsx34uo2t3swtzhfigmnmecg65npjbri7z0bydh7mb1uuiicuiq1njohs2twlws4ff3kckvmycsoxuo8kcvt9fezwm3efn7nkmlmxsbqawjr4svqnojmo945phl0ypmkf9twnbwwj52nt316o3xq2nanzwk0d9ziqr8sj9db8rm6lst53uarl85gatjot4htt8p1ja8imzu99niz6w7yc0fq3d6s6a8yxjn996wbvjiyv7d7v04q4gipkvp5qpkmewci8391d9yahu1qhn988dsa1ac9p9wo7sze4ple50oixrpnsmlk5vd3cs04nvkf36oucbvm6bamh2uk2xrx1gtokcetrqkucwvevs0xj8ypg8j9btbf921wzdi5uqshsx3sxq2i2wh0uqllv9rrjkrfm7gvbyr2rsuolowjxekmu7rc3i5xdzlf3tt77pkyo2ctfsv2ppwf4bbcx9u1iypff4t8j785t6s9rw8z9b7c76ihms419uv35udcl0jrq3a2iwdkdm8zlqx5j8aszsxd5fhuu4v2iughfcq5m9e9p57a8wczklcb336ws025m0j09hxtktij13dsi9v0ln2b8utwo0gsxgxwms1ni03yom0z3bpzu4fgl10zgqnar567ubbmgyziuvrgjk4y1rubjcw5bryyoimkx4fy43tkqpubrp8x8zgn39xb49hhl83w36vq7qfzjica9iomo2b2783whuwh2zj9k10ck9in20hiijvx8zxr4o2u785f53xcchkb0qdzqmt4mt125jr4nboo6j96ijyw403zwn9hg334dvb9erqwvamj37ey0m54el5tf1tq9s5s46uezt4brc2xmjzp6e',
                fileSchema: 'cjehju0df9i9yrdzkql8oixj6jliqaig2vsnv996syiolv9wen7efxvypprc8ixgm9r3ay17jh1mz9o99mp13az28b6xjw4zgfktjgnqfyfowbtw9lfna6jpws47liu85hblbnbf0g29sw519mm8m8tt4wp68vi5l924r7755o4qjhgmhqv6914q63nuncvoj7coqratsqo1a64b1ojdifrxarct6noj6v60nf91qumze8livxb2rjk3hnm86qjwlioncv8kmiaaazlyddco4vdj9m8zii4dhoqp086wc2wxp6xcstvykbp4wl3s3iqlvovl4lubsqf45kriktbyud8txio5i1a3hc6436xhgmo5qtzhekzuydxj357m32q1i6zdedlb7rcv4sx1fxs4q2ogwjfg9mwjjvlcgyp7fhonwtdo5heswfypu3ftqjieg1dizvenbyshnhghdqo8oldcbbhkd2cs5klfw4iq6sgksq4htmyz28126h4v9h4gm6c31jgdlj1je11ral3s1473adfxz2iayoe9wi71r2x4ppyvv4ulrt9ynxoo13kzego6d80kdar3cy5zstvdz7b1y7dz4h2uwzktucvo7bu2nimp1lrzw8witc1ir20ue1d8wh6og93ut8gwu8wh9xoti6mjo4krsg17g0uw6nnoyr4d4mcjwqbhmu4aurgq6niv3rqdbecyvxa1uuvd28r3io8waky00xbcxgckug512dex4jbumxbvckqc06s5cfpfteui8sxrqat29ilt7skt6syin1jnjpqkm2cpy8yh0zbh35twqolv19i03z3owfr0wr70vt4vxm53a2tb37tx9qv43fnn5pp7tr5ff6qx15ngq9td5adqxeo7zyvab1mv0dgstbkcfelb0ydmzgmuotlaohg3g4qz4zscc76pfnx8m3m8w1whtzw9b4fg33gn66wt0p6jg7q0v76egouj08ztut3pfa5wawqee5nh41h447v57zqxtk3lfar9',
                proxyHost: 'c5s4gm9hjrlhy9i9c57myjv5qme6xc4gyig6esu8q9v23dju40u7yy7hek9l',
                proxyPort: 1339559140,
                destination: 'r0kgey7o3vbrcbj0kb1m2at0w0h3o3dvaccntyz6vr1t8eutn4dhe58omhonuupfj8wybczhcpo2bhofm5yjdgtnbpl4oe55tfjt78bcnzxuggdtjtqnd9yf95mo22oef2oc496kqmov6x0uuwuwfmfhqyxiyfw4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8jhjskkndkkyr0gg968x91qot0d2fdre0gn2lo6vrcwcer9szborxrc7p46lqn3k96zvz5bh4derdbqlc8z46cykuqq89cagyjlgm0fa44tkq0a1nj8osbtn73y0ndy2f39kxgyco88iyvjlmt2pak5jj5o2nrah',
                responsibleUserAccountName: '4054z1vuybv7zfhn4lak',
                lastChangeUserAccount: 'lvxi3m96ehklhbcbxei7',
                lastChangedAt: '2020-08-04 11:01:00',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '1dds7019pkfh11dqs1rr7464vu1njdamorszd2h2',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'eeqhn2t6xixh3vqnr1lfodme3kjhy8lip6ebz23dtzb190s6fe',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '3f4cfcsa82yfyoo5m4fs',
                party: 'lbcemunby7y0aw1jz16q7ty8i30vttygo70rtzf8fv0d05v5xfarsmnl2kz7zalnwx1e2qarndkvmolx2fft6jguo7eu3krxfk6kza9duaww7ejulak3peg5fz7gry4ku977seukgddf9f2tcui7pffdfv0n1oou',
                
                name: 'gdu1rrjmccggix5a9rwz5zqm7t8myd2jddwmpv3mih2gcci74wsbnpbz55duqpb7e48nnqqtv2bynt5slxiar2n6grif3jsen15p9llk64hnt6tgramcu2hf448vj06fhqprwdhc42k4bpuusm4vysnljor92lcr',
                flowHash: '9vl66ubpkpkuc64mbqprw8uurqsvx66ovn9vt4ra',
                flowParty: 'lsg61sqn7qm7fobcbu25ncrgiu810j78tv1xhafylpple6b82mgvncenky6xczji3tcxtjbm773o42odgwbrq28xar6ahnydwbatdairyemh5l7wlt34dcwvdzpifxkwg9fb82yircbcq1bxgrraqz6l41mmmher',
                flowComponent: '268axbfcavwz7puo0zr5axmgsch62jnxk4ig7vnh684i4rh4d7etf3xxyj088hqbao2bfevbkavqkoi223kog464v8xprjvkhuq5wenkb7cjfzegfl2obxjwls9pu5equzrwm7gzqam33rbda6z6sivrxj4znsil',
                flowInterfaceName: '2htkaxu0wre79kvulblc2bqxomabo0bqaiow3jr6a7a64wr5ylvas2044p9pfnbh0d98vdi2ek491rugccgqtf1bnfa2cad5zx14l060ppn93qy4y7hhqrnmdrgt1m798pn15ika75490d3jsgiv3eyplo9nczzg',
                flowInterfaceNamespace: 'u9x2mykdc4up74zr47kf1s3xrar3u1uasnhqf62l4l81otg1kkp5coyjrnrcpo2a0geite48zytq5rh69iuqplzw6e6yt0zy7zdxtftiq6gi0cncgcqx87t4su8s9ljjevs7p5tm3tuh7jl1yjepgafnaqpeifju',
                version: 'k85qrs1qy3euwwsq6vb0',
                adapterType: 'd80w03z5n1glomu87tnuyvasqcjzaan4mmjwjl07ldtmas0bbd2wsmuo751z',
                direction: 'SENDER',
                transportProtocol: 'suz7jhie671iuvhe4xgfpiddjprons4i3ox4etkykh7cylwrjo7d5aftezbf',
                messageProtocol: '6zwcgk1ukxtmfxdi19fvtkh0ty64mbi5dd6vqncy4387l3ts0qvqjoojkxq3',
                adapterEngineName: '8qq08v6oymlzow9dgzxn9xqklc249nrub8pbkm8jsb5u79oskww8y0nmviksjiet24fjbzfo0klv7j103fp2c69g5w9occsn8cfrgjgqu9v8cxj0bt94dwrsh75f0bhr7yj2eqnrdugdctly9gflceeacud5h7v4',
                url: '9mu25rpnek83yar1ph1vpk41861nrtmb2k7wlozkcwyp08hctwu6f5xpbo2g5gve5sp3vkwq5fqy26ptgtcozddr42txttfh75gr27jf0t0doj1spzlpeb5ppj0w09kh6q4nyrh8g62wmo0rb3ufcoow65lp0n7992pb9sc5pm01ac256b4x0diafzdvzpgxeawjcw6tzeqns7ylmm7ncuk9rwkgp6tmd7j32fzevpp3tmi1l0as1zbbfxsp2c2ujtfbgj1mr6zatkqpy0y384gg5ndfitxyuh49bihrfant21eyed2e1f6jgnzn4n7j',
                username: '026t1omz7c0sec6cbump9ltm3wnvdabnyal94z2alvyn7cz4airufw0f1m0a',
                remoteHost: 'e82mdbv6mnco32atc2lua7qdsnf3d57d1rjk1hluz51m1pm6gn3te578ylcr5ji4iwkpc0ntpl8r1v02rshft1d9zb6yny17jqo634yjp953kxd4i2y5mbqasn6kt81w34h3za1npui7m118zla13ymqzw6oxnuz',
                remotePort: 5050360844,
                directory: 'k3bizihf6johy73imc5kp8bebmvx4py9odjydss4503kgl7fnhjy8ihyqt108lvef83gjmjz8e1qzuzbz12hgobyg8fd6kakir1s50ojxakwf9yxo0uvlbw1u8bh98n4b3qlji2smo5py8svpe4i568473pjkygta9k3pwfgh6kvlhtgx5exfv4a5a0g8vx5loqmrlcvokm7xiw6g9ct8c238zi4lqkkkn76no44uffa5thgtxr2lhs8lx3l963vv10zqjruaubyw34jkiigznk2mar3sv37ggrbq8kuu65jvrtc54vfbg8z42hy4bvawpsuxiezktxax49aed02kc6hgj0shi2hrn9jwfknjf4d6o8zjw25w14t3su016873ji1tkcuqzju5yepb1dqze8bez2wyrepx0sfjk9mjhhx3x3j2uc6hsh5ui3kr1qipqajlirhadcp60wuq2bkch95yy777o11i5xjlz3uat6poregplmhxbby3glftrw2p5nwtepn259xfq131fm9jy11gwpkup79q0q4r9294cstoqjf7ai9v199izfa0bmwi4bu9cf9oo26cuxjxk0bj0xx96jchv9onru09i5i1t2nnogo8mhq3t6msgyhbdfqsr6v0whuvfjgh8z2xdbtb3465ahx2upg56mp3f22beaer8whn0unjpsg37v0x6iesq38np2mzeyhcn15dgsya6tyicgbnup1lt5p8vn4ya0zfbyrbx6ea19n9r4xme4ekkyk5rkig899txyx9sotkj6xiqi5bldz7z129bdoz2md21vr8nvuyvxcmax3tdzdgd8et553f04kr1qxjyq3vjyj3gmek7gx65y1ultdjou5hpaw2c9lk1ta5cccv7jnzga4smntrjk0mljiq6d82ls1zqm5ciica6j9lu4r681376qkntq5jvt4vu4wr5oa6otukww4ggy2e16czdje8qw7q28bvwmvnlmi4bn0uz1wiwu5opwd54slxedetzxi',
                fileSchema: 'rctdxeabew0ve4sxomd0wi0ed2v4lghs534r9oyt1nlg1nlfe9dngx7tujspp2y2z1uxdsnx44aug5o8f1031a6kp4bul1lzxhgkosgdepmx32sidhb6xxn8gnrdveoeqm4spsqd6gnzutu1x0z0x9wmdanc59k6omwskcxcsssovr02es96y6usqezt88jmxntap5izzqbdh3kw5syqezsmum789begyiio8l1gpe4qzip0okvr0x9r5fvwrdwkqzyqmnbvhkyzlkeio9dr96x01tjtgc7akswn455w5p1ul22vtqkkcc1bwzrjufblxt6b8p0qtvsp9tw7bsf9jf8ye2wi64es80wqy3f5ki4zhhw6o2cty0pvnpfmehg1nezv6yqlkjz9d4yh5kgdy6nwatcqeklkj7lo392x9pn91vi9ngh1yntcr593hj1hfhw74q26mwxtyxh2qlyfsopub3w2if01l4a79a7k66zjbce0arojusnd7mcr2m1o9nv3c58hhn916p3a6bjkc018sf7rqnzbmf02ih16zksqt7766ga2134slxfnk6k96vgp5ikyif97a5hb8fu68dj79lx7o75rqcwjrf5kdwhhwufxcwkp72ubwmknnb4a7jkl86cvwg22ot5a1rqbzqkbsjy8vpfqgg07osrjjgvav2ldqtxfesj4wsoso0f5lupo0dakbk8hoaekwhrogmmfaxb4vthvm0ptst8a2k1uuqqizfgygka1bhyd04dl9us2ltr4sfruoi6id2onl4s0w8t7gayf6brz598ciq2s886p5mzkegdwkol06ftfw25l5xzf87tm8n4v9m9we9yiij66lyn8is1ujenbwv65n1b74wnilqszq4e9fyvzunqw0i3mpornh9zztyhlxymedch1wgn646izq2hbcna3lbk9rx4swpss5j57vw8ao2ofsee06fkbuifon7jwld9rbpsjhuyxwcjpxyejrn7qvexj227tvdu0823an7v7',
                proxyHost: 'rfoyr5xynlax66ubkj2633br6og8cw89wkwfn566puem4gf5ygbz8xn9zbup',
                proxyPort: 3980652672,
                destination: 'mbj2ls3obf6boparg07h2si4h2zfowhmjc6du731a5gnd29nw04k09jl8mi0o25xcz1ojbqb7qbersonbfbfg371htggegllomjw1idnqjlx4uqmlz0jxm3zpu0zuoya0ss2k0gdy5ztavtk4qeudhhs83697zam',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '32t4k7h9y2rrmb8x2ybvw0mwo1733eddztajog84o0g405itnm37slt1s20374ack8ri0ba05u80a04de7h30r8u607iuhodf8f4qw68uiqae46wec5fyalu5fptmy0s4ptce0ofq1gg8fkvmijc1lx3vdth0vm0',
                responsibleUserAccountName: 'hq8zupf6p7o6gsyc9157',
                lastChangeUserAccount: 'i4wlsazlejc1bca711f1',
                lastChangedAt: '2020-08-05 05:57:00',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'dfokphglm78zu9ovru5oniglpq1rnwu4hxvcggs8',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'xgdiwb508dkoyhizjt3dev11oli9negqp2mer48go0mov26jiz',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'oiwtuph044beyebh7435',
                party: 'qi675r9hrpjcfdjcdbeicqxw58unbsfa16783siypxowm63ob4ma69ngq49li88lzmhww3pmbsl991wqdcx9regfrs7ssp1yhyhwhrdxwi331hdohbmz3rq9cx7ctzvkd64uiy9qtw8pvsc127fdwc82j7pefj4q',
                component: 'eplukmjy9mhr33c10wr66ve5nc5mf3dv4r1s1kxee8ubafz7s63exqajyditcc9xkuovfrclk9juvqkflklnyzmces25ssj523b1j21ttd4iab91s42mab72qk8owf615c4ieoia5bvfoc5qbk8wb5ho0wv964p8',
                name: null,
                flowHash: 'h1k89u5ffgj03lu6dnppqfpvnwcey5bwny19lx95',
                flowParty: '754v03vfv2f3feltoxnp6u5i8d82y3k4ksonwn6f3n0p29aydbjyg37hp16emsbq74zaenf6q0e0exzammzreg0qe89jkl3qg759k1okb55mvp6ay6ybuffvycgfb9rzhjsqthhe8fpi4mxnck9tpbwtgb9eba2o',
                flowComponent: 'ff6xmkl4ip79z3lj6igwi333uk5msx7eyzzx4sw8jkhblboap5xdre32ul2cveiyw8x6svhhieqs8ywbh1ldkomxbcbukx6spxdv5k0qg57seoamoxxj1vebho4ae5q634mtye1aa4z6p8e1krakj4hin1fqonq6',
                flowInterfaceName: 'dc5bvagjsfr2afw9nvc0a058zurx3i5oly1byvylm3xvkwwmqqm5uyzqcspbvs1e7bkeuujhp7bx2fta23o0irqu4omtfq8wjwpm3q0wirzj1ocfj3ctbruwbr8q2fgnizcww69pmmwkz33sp1b94c3po71fuma0',
                flowInterfaceNamespace: 'z44wkue0i1vwpvcj4np2o5zv85hkre4umokzkmeqnocjovxp7c6d3ymflmhx7qr8qj7f44ysbpxcp06yveo8ez5czx6b1exxqe2xe6bx0cidqkvwvpvjq13eueugystma6gifb0eutwhe9pps6eaa359i6ty7aad',
                version: 'gwpvlf3o40t2gv7l2u0f',
                adapterType: 'fczbu3m9sgeu3jxhx8awg5hw5ysytq2gtozfejo5wwnov9n9rrh26to273xp',
                direction: 'SENDER',
                transportProtocol: '7m09dx6wwg4te3x5jh7ys28bmj7ldjtbyplb4fcq7l64jqa3t214epbi0yw5',
                messageProtocol: 'gpdihp25are57c337cobduk4axayxmnz5hiak4t7awgf485xialpbdawpd3m',
                adapterEngineName: 'cy7abrh5axyxhnvdnszdc2dorg0w64jredro0jsgw0zu1dgxw3gvh5hr6g1ombkdze3fpihgzx05qjntkbwg8xiau4iwo8nikdzxsrd161bwbmxezm7bi7vvvzg6opwe2vtviw3bj6tl4v61fsz8bhdgoiypv3eq',
                url: 'vybzhw61xm1imt51z3eo7yt4pvlja6x52l3rhtbk3ndubszl7bgclc1d8tuotx9s2fnhqdhhnbm95pazmbgz4b8sps5szoedoh1broixhsqp97kk1qbkp0ya7vzb2pn16eyutb4w5fxxarl1ss48b6948ty55drgtmkb4k71nh0xr6j15vhi8kxower778pfy46quc9dlnruothcx2m0ni4l47recx9dq224dv65fwvhinrk72huvolwzm6hg1q93zm8dwujk2iziv27dlsklv0yhv3mcyh7ztn7hcps83shbmgxdq9usdkvd3le1kug',
                username: 'az6decav3tbg4yu4jk1d7jcz6r6n2kv0aklixa9zt1j0c95o9s2y9kzfbmrk',
                remoteHost: 'y96xmvvkcr36thhyovulren4il3iw9e3cdp3yy5sdjgbf2nc877xgortefja7kri7xk2vm3ciqak88x9vo9ucp3wa7juu2vjc9bb6bht2psxj8jeefk9y1jin8jzvu0d4fh8whwyr5ivsynw5862a08xcy6pklaw',
                remotePort: 3445674694,
                directory: 'dculd74diwuxn5ovv4rped7iusw56yffyktcvwqqc441a02ujl5m0uecjr09hfttr22v7ju79paibembu2ie37kumk6m6wuq9jjm2seuijim883g0pr9mzrtp00hmnvnal6qcz9t1jw39mr3geiu8yihrdow5zlntcgsd1he87dyism2jvwqnp09ge1wzx6r845k7s4ytlwojcpg2qg01zmvfqe4un7rgkeua83k9covrwozlkrbufg8b8pdypqmzs2pr6wq71i4zhmzxp1gcf3sv58a1gzauo0x8fvwiltrzrb9ddcvi70htjnihwcbj2e4f9l9s4xe4lhf251ga6y99h3j4i0w6woqppl366uoxeaqv0jkqelf0dlg6gyibo7h6bm1axu8ybeywg8sw1k82w52h1xjrencbvq8muvsuk5xt53390gqqur3w4f3gjkidwglfwuhdsmz6u0012n9oe94rsntemti58ci2sm6p63d4sav08j3d6qtwkszjj81v13tv4rych6atgrmszr9ik86z28qlzrhgfrdd2vafbo7881nhv7ewzx76t42p1qb1punzy0e3skcgm2b0qkg5ltto99zcdcqolrvymdkr2impibg72imma3c60afq3eb8lv4rg6rgl7qx0s5ky0dom9mvdq4do54ywmnbwnwojvybgk8ftah78wat0w5l7sas8mzzoa2w1dp5f957zp0ekiufwldwdy6hspk1ey9l0um6d8zpwo5ks6r9hqhr5eeumw0nrj9ce9im3bf08ay7zjbard8leprukf7w3v52gkxbdspvhm1rajyhm25hi652w2qros6j178bgii3maif52a05t55xcbd7skt2ckrhu50qdjntqyg6mp1netnj05nb9yblxusvtv67jglx489j03kranwcz8jdjg5xm4rym7d247o6nf8vprwsutys0hn1kqatt98jggsi6pxbzuv6awawn6m0p446tnx7u14sqzibjjxamx43wbgmkd',
                fileSchema: 'rvfei5uuqa4rjp8lkopnmrbzlyiy87unzwa5zrcwwaufdaehog9z8o3o8nwgs5j1bb3b6yaq8fmwttxyv5m6v69vnto7edjtqtq7tmh9ljac85ntox4n7x4ircpcy0jelcay5g1yon7b0mqqw0ggyet8tkvi02jmm5iq9bj89xenc0jv3r0y3hydw1zvomrdnrjdewrhmcwuopyy4kptjco0i4ke0cri9o6b8cxzllxoi4ouvxcqod8dh25z0gmcjql7rhazjyojn8oxx2600gbwrxxdy5lnqtwgkm4tr2o2odd82srydsmj2jn8yvy8hqiygk83ywa3nlvcy7k8xt4z08g3dbstgkioj5g6igbiox37zvf25e6lac7uwmpr93zxcugi1bv82kbav33mnyqrwtyfrtv6e4sckeyljyto9ds4d4n5zmmqsl0muw1zmam83j4ipgoezpz5968zlqxqqa71ridz9mxkj86rqwib729pzm820llxc1mc5e1obi1c7rld0cqmdfh3w3m2wdb3rdporw5hg3vbelwvrmknjflxwrrpfgyae2sughxad1gypjlq34kzesk01j6m05ws9jx6qrsgyn5s7laetnp7eyl21jjcrp3xp4n9tpx5sq09gfibg7hd53yep5zdnjuu4o1yiktw5j5vliz059gxtkrmpek0y6oh0uo3jsxjze169fsp1f8rzudizl3qo97vlh9jnq4cakv2s06fk25f54ih5dot6xddfdyiby0h0a7ojypyzly9af1zox6p6v2enc9gdzvnyvjfq8i7yneikc1tj0ougsmwwl2qb2iqhhn6i61itquh1an7gg6a8xvqognvds0cwpwbm6hhr4b890xn8b1ctc4atck002qb577s94wcklm59j45zus2aal8wzhhma6184wbb8638zrsnqsw3nxreuhgmqnc0wef89ehk9b8w5umjnw6fua60mp950irq9o97r0mhp8kpmimtkjoj0o0wr1gush8rw20',
                proxyHost: '3ykmx8jl5idw9nkgjfzkcdoixbg1x4sbdxjkmjyxhozodjpkvfwjvbhmeack',
                proxyPort: 4131619023,
                destination: 'rrxuzx358n2hedx2zwa45hczf4wfjvc9m1nj2vmalvzjfszvomn3sx2xuwib7up4trvd91rp5keahyscp8bvo9carvb6b3y7y92hhq2ijn3gb6y8j4op79u2yh8v6xe2qwqm8gbr06csggq2ojgchpmps10822xb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'npvy1feyqxb8qu38wqax8l3dtnzctuvdqxx9fl6c5z65853kcpe772tu1ongr3tz6n7v0p2jgezrmikwkgb4c3z2rgeq0fn3sqx31sattyexvoowsqx18ln3l8azgwjdn3ntcl1t3eqdwf2v6zzbsyw09ogy6m2y',
                responsibleUserAccountName: 'cv1o9mc8yuza0zjwyy9u',
                lastChangeUserAccount: 'fcj55jehbmaqnspi4wfo',
                lastChangedAt: '2020-08-05 02:40:31',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '75voan0rdq41n9gs44xsgkptoa5c0ld7r4i3a4gm',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'jyzj1071rqmj6vbdt3sxrlq3rb4f3wnojc3mys24lb7fg1fzuf',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ed50ozs9rrfg8n3fe715',
                party: '2a6d9hlasxz41b7lf7k4d7bdcnrqiqndta84dmprow5zzwewhk5kgdxgncc6eyoyzm4densdz9d47d22c4x3hi2f24a5ra7o5snrd1dwuz5h5cldpkvzpa4uun95dkybjbardatm81dqtwkrqc6hr0v04extvgs2',
                component: 'g6ws2b2a1c0oavg8zzhokyv5p27qmbzsm64dg3rvosvmht9jw973i26rfrzg3x231hxrhzllknpeai4eb7q5nuu4gcdhtgfmh0af30dnlpzvkex3rqvz84dl7hlovubvasa4mi9vr9973f3td79ypoga2lxgsxx8',
                
                flowHash: 'bqrkgndj1gtzxdigu20zg0ouq5p0npquy62a2xl9',
                flowParty: '8oipeu92n4lricfzs6or3pxx3mwaf8zn3uwxd42guz92sxpnkyf75vnox9fwq3gg2ur6591m72a24ocmpw42d1cqqoqyy4vuut8bnr57i0vio185j4sjdks95d1zmkg358y223br4b0z5dkzcuo8ey80d3dbi15y',
                flowComponent: 'afkuu8k6p4v1d57y84ikpkbo1d9gt12ro0xnrpe70gqupactwqqy3wuavco3hi1j30peurjlwcldp9sf785vwo61wdzps64agoulc56tkq79ahjxam0aagrt3pfg3g09x3944uz8rguai30bof0q5y0ma40qifhk',
                flowInterfaceName: 'wmgrx834q66did85narb728nzydt8u52u2srn9j65w4dmfo7mmgs1tyjas8ib5ruu19wnz73udhidwv5izqiv2kyw0m1ng4wyt4z74axzuomxextcz5t4p3uoyky7ve49ew9rha90ob7nuk006yvlbcjyby1h19a',
                flowInterfaceNamespace: 'd0erlc30p0ybwj123s8wv6uj745h2yomxaaiw4hrz5vtg89b55fuypihxuuywo8u1f2u8t18h1vefd4q2987m5x9074kti4yaz127efuemtp1zlzgbs5rdkf105knmhssjdqsk1hv4twifjbuz8r1i2lyhrr58hj',
                version: 'kdro6i0fr3j0v573i4ql',
                adapterType: 'foxzxpv2u4mfm0hh9nno8396xqfjrqahgoipp3dg38afayxtyjpyezqwv484',
                direction: 'SENDER',
                transportProtocol: 'opbm1gkfwq9bht3puh4qzt31d7j8j3z8xtswuogpk2yx69ps5p365dbqd12b',
                messageProtocol: '174kbkvoq2k7epw3vucxt3q0mi586wj8kmrisktffn7jywvvv1djzj6jchjz',
                adapterEngineName: 'lm38vf5b4v6g1d4pekp5qpf7nhczej9b8ymh84svvqm0tpiatepphcvg15he2pkgw0ufaaslt65ggmma8dvq0yn8bi9lt5zmfg759h9o5qn7gbwvev6ox3s5wm9he49mnbmge6kfv0ebuqe8nsanni17e161gj6a',
                url: '4g54xlk2i1bislmj2l73fiu3k0eqiauukb3gi9pnvc13td24vk3nz51vfaoi6drsrscl4a6nlhcum5shta4a1u72rqv9qt2u87zyiae0nsnvq7bxi6k6wbsxhmykcns8i2exg7u4yp4tnkxz4bzrgnb64px00neecewaj1k2nd2a88muawyoxenmon8bqthw3kmszbnahxno7iv2i7uy76dk3cr97yeipkjamu6h2g6vo516htbz1yhl08wexchpvvj66o8zd4luytmbi2yidgxinnzw63vro2rd2ll1jg5bssdvcmjbe2rg9pdcy2c2',
                username: 'gtwcye8h3ujruygmgo3ni3z1z0gdrtsuz1zzelxoliho8mmgayiww2w7bqqd',
                remoteHost: 'pd5gwflibehruzhq1282i7hz90bxry3opybjf7i41a6bdssfr8t37hbon6x85zftk10stq90pbo55undykk0lg0nsem6ln0ity0qkx377lwoors82wl8a0a04zt2cqe0hyhpfsr513l2j80bb0pgtb81j8xhg3ci',
                remotePort: 9328245299,
                directory: 'cfse8d24s3oci58jy84umzb11rypjs16a055lxayjh5scjr7tmn7753e92yu41zurv05t7k72dfjj4c1mxjgj50vldzoaibs6frjbg3j6js7ls4uybqp08svbah6p9ks6ydhkawx9s20uwz1jsoihgrgnhq9qxth5gi3n6g5o91ywnqrsapkc3ofzcracibp1ee0iktt92akygnnk7scg9mpmj3czi46c022wl5wo6mkkpp6p2ryzc5i0f7srq9t2dfyjdlynocxh1sgwiff0ttq0hffxc9gtycepusrc5q79cbvmv5xz5eav2uuwyun94nirls1n3lkavhcejc0s46mfr5lndhbzaf1bf6cc0elkpswr4c0pi1d9v75zdvdltk549nqq70ou8ho56b2curddrvqw1giv2pr7i1sg4fixtheku1k5jvz2pwq55jkjzk7fbe6h8s3cmy7fil8vdijxd00r9jxie4bpy6ycaetf0nunmhptcngw4nxz1n9vv12s4k7e4sut055x25n857d81kea1erbtlo5y2m6b8li36ydu6xxqjo1ja61mfb7qkbvztpcmlcavx0lggpntkockszvz362l5ks0bzah5duo0j07ejybopofohl2cp0ce5xthodo453wqjqooceqnmwr4bprwo6tkpclnu7u9m3ics71tr9bkctg71dcp4ysvln70nfd4h4349yoqmmcpvau4k7akhc1ckrd8yu1ixr4p1dl18d13lytbu4xaslhpp7u1khey0x4kefh2r05qbcxu5n735vj7dchkt4yin7l041r2bjvrp9xwfsab2s0lnpileciffq1l9tr25fbahlq3r9usxguj4cicqbzi94xw9klknni11hoqvrv6t0c087560axu6fvwk5rz7nkk74z46vvjtc48zoflmmw4iop9hseieez1bwz53ndfrxzphkv4r5gwgxr333ydyyua46kh7pwm2myxoow8jf2b6zrdxjsz0t10bkyva86ym',
                fileSchema: '1bte4swylckx77jq5m9fs1iqvajhts2itw8j4meovlnyrfosbtbfy6bkidk8x1virip4gnltorv2h8v3p1wbt9m40n1kj62gvzmlyru3u5xutya7edh0lkdmmduqmwx3wm3seyh2dm6twi60tfwf2s7315l9h5edgimue5g79bflchs9shnybib31p3bo8ai1axtlgdrieiupy1ity04a5rbx6ok551ij6ougr1f0vq1qwm91q4bp9v0xi43lv10skftm1bldf8lqw6ttmc817an6is67qehtmwusbsp903o9zu8h7d3ne66k2r3j8fzzojp1uq683inxcbh7r3ipc50abwpbt9aylo19jsnj520tu0v5rnei0e795cd3bzo94vapk73x1jvsgl0kisbgofrzz2h3f659q1877hksokoec83hmz38xft07oz39vme68zet9a9mbbx5zycrf91iah8mjs701b91qtffbz9fm0r6o3sb0f1ti40io7614p5sebq3zgayjy8odmdmoclupzir5ospkjqs2x8atan97t6nhinuzwxdz2osr56pjn0l7fesajqpbn710uv2nz0i9al7f1ia41pbb2mhtdk7c3mihapavhv961ugbkr9eexj1xd119ahbjr7glqjo26igrfoekopztpsyzydp86oya1l6rnu2icofjlbt140rledhq5rl742wl7o46c889os4mbzep4jh5ifai1o5csj8zkzl62zbvvipu7r8mulxlok5g056hjd2aytlkzdh9vsl6h8cyoli2dfhxf2ic80o1766k9z9b4zmsoo9i4diuljv44bt0l7kjqajdmv7jnt6b587p6wlg78vxqj6mplwxt60xrxlc0qsex7e7yaaoif3i5ars16phe4wv31xdzt8uho1hxud6qfz5dowqx26hu5sfhpqgml756pk498h8ffgkyb2dvkqrxjaii51f80a646ckndima5y7mxp8rofqt1zfqa42frap7js5sjic',
                proxyHost: 'l8y2ydlsjvv01xjctncnokljoelp0a7zm20zcvi4usrerx9xoptqd82saoxw',
                proxyPort: 6620547229,
                destination: 'meapmp68jz0ehwlffwjp3s00apcyfrnjbz0htiw0bpu6fmw168jyv44d7874t77dr6h1cgtmi5o387wgzc56jy9dycrphrmvaa1hk3ny0qiksdc066vjb5z9ns7d4ec6zs2hlb6gjllynf4bqx5pm6xdp0he86fg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uobyyrinmqewhrreokh4g2icstr5e35zf4dejcvlsxamuhs8emjs4pma1a8l3jg3gqbisys6fhua5z9cbkp6w1p82fz6zjto3v41tfkotqx2szm4x1gwfvdo4z2kg89on3uh9ow1yamtfvn4fvzjm1g41hulhkn1',
                responsibleUserAccountName: 'qrpzvne82h71vz6cvjgo',
                lastChangeUserAccount: 'ltpcuje4t4a254j7tmmx',
                lastChangedAt: '2020-08-04 11:52:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'og0vcxwsjdjluhzj5bs3nlein82jzg8w4xb3rzjs',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ct8bprtkdm8nl0g4j9bfi8b877sj2gnkrgwb41adk01owql2r9',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '3oh00gxz6tuvfrcxpvd9',
                party: 'up0er8o7dn40u9x262opi1wqnq86teh1po3i0cnl79m3w6zj1fwj5fhp2i0o16yyz9nofpabb8iq0ukvt0ks9km6kfg37rwp37edxretww401c4piynjx3bl9ecj1g79usgxcfon5242ir03ok5uxrojkcdgvju2',
                component: 'icfomsh4ur6k0p4w1yfiu1z1bcj0j6xmk2yy157lztkz0paxqoemay68g6preo929f9fh33xucyxrl2xduhsi9ahkq1bl5zbqhturm6nhdxiu8g5azvkr16r622o7so5qpds4zi6jz8hnhowytkabpyj6cqo9p0q',
                name: 'jgwzkels2i2a0ilzo0q9oa2mvrn35fwhvn14ifpv0v7t3rdlb5c26g13u6lf74yikj47xz5trpjo9dm53tbss3pwlmry4wlkvwca7qaqatiwptutjs67hwo9spv5peojada2ig1fj2ddnba8ltmo1jawat7nq1d9',
                flowHash: null,
                flowParty: '0fw6a86gc9j474t2efjfv2jkd50vcihiywijqzm21351cu8namifr319n1r0t3xzyxgkrppofxsbwcwkuilow7jxaas36i7iwqaouzz5arq4veb1r34jumwzshclpe69sau54x026uvb0p4dcr5lqx4vvobfdvz1',
                flowComponent: '7m94knzepl7oru1k1d2yztfn2snjghpemra4mjbcyb1mla48mu1c6z82x7hvb0gjehyiozataegzpmf5vnriwj0m0ze9cqiorrx9q76d76uyz7ymttkpxgq040smom57pm5hgg04ilzuziwroa7c9kn821cpmvxv',
                flowInterfaceName: 'necot2lrc29fwve196bkig2xdcbkclws6t9qhal7xqnpykiqntmimlkrg005do5euzjqw2wsu1ew74ggoem3se3rbll4ni5bo38oxgmjh2kvuc61aymwp8tg3l1p7g18jn3fv21xw7btc3rtk6dm5hkiyp5yn1ee',
                flowInterfaceNamespace: 'wad3kusflts9a867xh47j56q8chkcjjku7gwmhy3b4h88f0709cv8pdih445j5mmz7j53p9eqlvcw2r9ito4x20l3yde0zp1gml7j3lfb9b3rodm37xc0uzfp71e2yrjv5fo3w1rl048546jy7oiczhj0edl1l5n',
                version: 'oj28w05wymi7u3ij3n3r',
                adapterType: 'vuvjjvep8xfblq09aa3rtx8qp0jhj4obqskq4308lm0midvy2g4auj2vvxfa',
                direction: 'SENDER',
                transportProtocol: 'l3oy36fqjpvlj9fuq5d7f3bncn6b969mwfv7oh7xvz1gly5epkbx3nwn0kyp',
                messageProtocol: 'c14tauaibsiqnl0oym567whl69k0p6sltwfj6qj7pra7k9zdt2r5lieasgwq',
                adapterEngineName: 'xo1mqi1blrhsg1fhp305zyzjsewd1eda3cjw3o3681eeootlbx7jlsu07iimzu7fuflli77jfjs8f067iza2wh33fmxfh2r02z38zmt351fqwjnof3m0yo7au13jsq1xdeb30nr68eg1nhb6ake4b4g972s6reez',
                url: 'sbtj9v4x28kxe44saukes63xo86v1dbq5coow1y4fsugb4gesb1oka0kxiplmnhamw58x40b1v3p6u18plbs22ri8zc21jb7zdev0kx6x0xoa3o875hq3zmljobw7arufer1wjqu902ziblsi62k2kgdtmg6kgrv8jnv265il7aad3pqndhpfkfy13sin38uqrl7u8srx83wwk0s0vwj9q3ph45q5t7zj3khm5skd6u9bhs67xtvpyl7xe4c0ys4z0kj7ysd5lcmy89n1ho94goyo7juw52ww9maj25573xtps69qfd51i0ww9q09hyg',
                username: 'iwv6sf75t9gzz8mrgpezvipd56cl764be92huiy415gz3hwgsqz32yeu3i7w',
                remoteHost: 'zb83zjeav8pet7m03ab7xwswkiberorgst09jmanemfbig6j2sm7r6m8vehww6gfbdo7ckf819e0mo4a5mebn8jbj3ges2cwes6xhx5czhrdzp03uhbv8bg0tsx936iislcabqa88bb7k70mot4vgjv38dy0honj',
                remotePort: 5617631176,
                directory: 'hnw3kzx2n8iubhwvgmzvbv415wasra5a24p8zzrshzs22tx8d4mypkw30wb5vlp3tixulv6n1330g5gpkccr2fdynox11hrey29wokf8e8uftmc6kij1ob3jywxce4plszgogw0qaczs8aqlcaex2mfe2ytl06pc41jxmaz1bgrvzss4zyz9azee5jb9gthi3qt8cshcetiemq7ivpdf46s208zq22hh56usch78qeapn8m42euzqk2m7d1srrj57z2h9zgmtpfecc5srq9l4bfmgir8f100g34kzkbzgcxhggi1yufp2pnb8sv7x1r81eiiq7au7g26qhslq6btcsax6z19vonai1im2og6rrg9244js709fmnxmi41b83u060duk2hgkrq0u6rzv38qx835ysucgfxyp08spgd7kb0z3qypx7nazdqq8mbdk0dwhsu5otqbeyuj7vny84hw1i24y4ueec73z146v9q1365x7hbdzbor79yl4i54pwg077qs3mk92on2fqtkqs0tatsfm6pmb5w25jvg0t2vihpv4jxj5tbapmg5b2tcv9949yolzl5b40nl36yheyypdcw10sl99ezzck6znbuiovccs3spsltrtl2bsn07bp8s4blvcho6m5iqdmrpztxzzoere6giheyt7knt32opktehsbl2tsiavbfz2wcm2qkfgwjxxa80ghn2s2bg98tl7r2oefp74phvshhpjvinodoayzk2ew6eyqz29iv54814rrlugfn6mtd1qxj5seh6pnaqfpi61uvrcqx2kv8k2z34g69ur5ug619wycql4px83ptg0vflofku9icljsh199briatbkyq62cjo8w9a5xs819fxg9kb2ghhmo08c6myx9a2mphsevnx61bw3lbp23gcddaw20nadcpyq438vgwpvdos9g69mdm2xm7o6dd5j59fqppt0k1yw1gpx7ewv45h5xnppu4b3la6rvx8otbmwt8hxlojmwdgjkgxmzo',
                fileSchema: 'j0yw91yox55ihzqh650nb1dnk4iar2ttn5g0123hq0fqj48mr775d86n80mh3n29pcrk5j7tu1n7li83s9m9q2ltdz7b69pwx5s3mw2159i04j0qwdsdbnrhglxf3yfd8pmiyh6qd14z3skkaj47omq0olqm0zwk44wyl03raysqkv40gh8otmi7i66pnlutn9nomny55831zoj9gp5qhsd7s4fzewir827pfs3cqs4w82oo4t2hndru6iftsl70pv99z9ra4nyjgzwgu8g5us896v0lao84al4f5jlx92zi0laopdus5chqrzjq5krpcgbzec9sowfn6janjrztyn65yizlh62k9xpytbwdl67t4i8ta4htfb85dqabt7jdl7smpaq39bv22ead6ztrwjdiu9ew861q3qm8eox97x3k5c40wafolhjpgbcum9uijsjb91k28an3tr5nbj5zq6b0oqojfygfa6jf1gr1qjlysfe5ypzyefmh7e9iu3veksoqn7j1xbn6rz01570h4lwrs1uq0uoqopi1ex16pakm4exwwmls0ppu4lmvdbjb2iist52wsaedeh7z46yanggc3cj5k4a2z2pgkgs0q8pblmh76o04dzhb9z833v17tjc8hvtxd0tjz90zvh8aoocdabkqpd5n2o478tplvy9fok77plv7rkimwpciokeqrfl4l7esb6bpiqhm8b3h2o1fgmmawq7pkk7t43h2jbkl1vqq5g20jr9j5djvh0852xausojtyqnhimbi4w6q7vtxzp33ksxz80xyriloo0b0hj5vqnx84ez4vhd1drspu4ignbgnad1p5kpe2mpagdg11ncvgb546g7aje6z2r5iqzlfyeocbcjpnylugv0diwan34yid64dhwi741bn4zrx5azqnyut84267fpfq0ceo6o732hw8nwlx7u91m3150u29nz833ia3l5tgkure4lu9arharqj4a33jlq9fufkb0yjnj4kex514rfcjd5g',
                proxyHost: 's5z9lmorfyhrdabdxxpwpi1qhqm0chgvhl5gzrdhlheqwi3gxhypttp9iqzg',
                proxyPort: 5909936834,
                destination: 'np0bn29x3vxt1hvkbwxxxe1js61t9ho9cero5c98r1b80927o9erzw5egrujqcdq3iu5h06q7x38yzpfgatfajvzrjq3nvatgp6akrp3dfl2ohpv8ansolon7ejtz5pf2p5rbquoxcnlciixqe5r8qx28o8qbttc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y9wipiuor1n9c5oos6u2v79t0rvwr65ty8znso3woiweret2dtehphejwkuqpav6o9dz5zaaw772952b4cn6yyuu7yq8ycb9odqd0pp81y1va6xa4snnyx7kz5b2jrixyli1gbnzyqfxtqf0mka6eolwlpnb4w7c',
                responsibleUserAccountName: 's9fcvrjo6r2tg11220tt',
                lastChangeUserAccount: 'ru91yvthpoaw934pyfvy',
                lastChangedAt: '2020-08-05 05:55:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'yr4zo81bshiwk6kh7jh103lnxo0tb5qoug0f6cz5',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'kqeycshbaidgqwav0nzyrknb24socr3lq0tcvtx5yc4pr0j6zl',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '0w9y3qw7cbzu1w3mc280',
                party: 't38fb1hm81pdu6cw12apz1q3l2v4bgr2vh4jca6nfq22de76hb4rozqi7yuj92php4r0h3b98y9sh1l02qyd1c3a7rei3p3doqh73ftw4zb670tviex1vkik7plrj9x69cfpdcban2qv0n8885lvu20ygyjq91aj',
                component: 'nbv6vw1nsl3ng7cdjtfgtuuerbmtekak3rlgdg0y80h2cvy87ruy8vbul3cxxixoq6y1dfiirb6lb5esxv6gkjmi6uui2473my32e03sdgto8ejl4p3w8f5pasqgbuefuo6f9szjn1z560xrv3bvxbvwd2f6dmph',
                name: 'q393ocpjmudxd2f61ngrbh1i65c35l7b6xauaq4m8hasfm4tyfhdfoo6doxzxftqg85kdm6nqjimxj5ijflwbl8v23i5znepx58jlufha0l2b4g598wxkkofrsoi0nxdnldh8ztpg22w1nmlw77za8qgsrfgi8es',
                
                flowParty: '9ce5ye3u2ve1wc0suhiuj1mz7w516jtn886z25k9c6hqg4ynt4beng9d3x6o813t7dhejbeompyhxut8l25a5tadykxat11mivbukrpllutfn6s0tyavmxr0xtou8noh5nqlhwhxo6f8b2mpumexmjrtkkmnnodu',
                flowComponent: 'bpil1ayuy8org3bbpgtt4fpav7fipp9hqzlvq1uoh7xdpktniud3lfo5k5pxsphplgbfv16dtzca50y0iedc7jjtguqqq8lrdofj08ly3sp9w6wusjox17g7zbyhc1eogzn2c0erdlfs3zixx848sorj50oo3kni',
                flowInterfaceName: '1evdq9zmc97gd2sw8qu1elomu9f1p6gueojbuqwgvw4nkojaijbldyaics8r5radrmo7fhn8b1ohrbignyf5qoqlcywia8p2l28qo4xgfzf9tq6exsz6uo3buwd69vk9tx0gedakiwe7efc1psqoo5iqz57eeoms',
                flowInterfaceNamespace: 'n50hj5wns18k564bu5xtmosf0bv3jr98g3z7viyqstr20dmu4h802y1mwb1y2abwmy724p18amhx06rh3mxatald6yk1bx15qoahcty3eerlgewwzmv1p84u3ipwt5n81yhr4k1852y9dqdzbr1k8slannkj5fmz',
                version: 'jrmg13qax7b5yvpk4ha9',
                adapterType: 'fgrdjb65kms498fic6qdwdz1i0m37j3i1bvh9ph36ucme5hpqty282r7k2z7',
                direction: 'SENDER',
                transportProtocol: 'd76kdd44r7avbt2pfspcjw5akr8a05mu3vnjww9llrviuc89a4lds0kl86l3',
                messageProtocol: 'w6uzmixr32topjmw3g1k5c784k4bkqh7j0cgb0qr57rwj2if7m0b9pkdiqce',
                adapterEngineName: '0p51vsfhtngzx7j56866gg9z7v9i75d08mglc2oxx8jg6ke9k8h7g4ufmjbiec1sfe7e4tg6uzu8fizv16c2o6itglgcndu6yw99kp75ech58d0vydm3szbifz5dr3akt7u61xh31nq351s87x1cxz1valfauom3',
                url: 'wgc35b8k337wtv7y5sga800m3lnsdg53ixpfs1gitdth75gva5037lthnl2lr743o2x469gltkegvavmtqachaswmkx9li4dq82n3z3ovz4dcoeiimyfjiqxvsk5q9fgydf3qb3p97nfze60hnxeh3hsjq3yptpyv2p3wed8cemlyyw8lepsku0o0r4llyqmfjktkvymegpqp27mamikad0cjypy3yxo4pvazinca65huj5cba2d47fxl1yp51zjl3dwlh7ls56upqsvl89c74xh5grbsmbm3bjvvg589th9kimbce9p7gyrjqm1ck0c',
                username: 'xizai7lgx02la43tdiu8b56kiddr5kb3xsbybvcljt96kaftyaesb4tggatc',
                remoteHost: 'gvvn00lzups4celgzcekdn7rrg0wrmu7j24o1mv21gv3clkg3wvqz8o1fmzr34sl0b79st3s4spz7sl724p9khtja93oz4btuuobztg34ho0tnmlucfswfkh2mhli60v2o1ngwv0okrnjj7kozrh5ajdcaphsn2g',
                remotePort: 4042745019,
                directory: 's1g1yr6wifn8gfy5ii2fd562k27km1h995wnwjbymyz52d6kmttcmqjtb15nb7lvlhqx9ycij21wirgc40xme3b1oseiboaqj9guzi3m041mcqck44llip852v3wun0t434jx8v5jd4tyvyb2csfne8qt5nhfqpvocbbmdmv9r88kh1nsc78zowrtmbnbwoqs83rg2uvv1j4j572bfb0920xik14fzoflg8ohq9myy2nlsij5wopfdmiucuo4bbqahjmqh7uqdo2846h6f50obkfk3mz9gaknzshkf6j0wit3aw9qv40ltmkypoxqqydsawmx7it0oix1q034jt2p7plqdlu3uvd6k33rtenwh96sihjfzzi6q5czddt5h1rsjyhhrg5klpme8zwy5t3imk0f72b9bts02kee3s2rwosvgcydtjr7pbx3hi5vqj0be7ddd3cfk8isdvp1vrxqwt9aolmez9nvl33pto8t05c8bpzm8wqlrm8a74m15lurle3lokgye94tos3uus5mbpn67rcdjk5g8x6xq2johwcbmueb9minxhp2q5me88hvje3xbace6drzkvpnybin5ic3ypp2y5oihy7jrj5l7kk0da5se6urevg35ahxf85fplfvkt19nvbzphv50242gky3tf8xz7r0v7l7cyq55rn5ug9jj1c8lkc6rytwf509idoehym5g80cjl3otld9aa1yc89g46namygghiwhp4lwrmuccz2y1qqypw0u97jpyus769rkgd4i5hcr5mu9p411zx1zzjgpyk2yb0v9sfhqa4geci3tzcjz8n4fisll33aqcyrhhimhbd2ucmqnzyu5wipun2cetjlzt0xjz0ug449f386jcrgk9m4u1cr95xeoqcrp3jwp52kafsrme6wsew7463es1wokwmk089hm6c6ksl31d827429byr1g14qbnp9bajcxvgoj9v6zf7q6ktqg0dhyww0vpqsqx3n414fvod8y0r2ij0ougot',
                fileSchema: 'g5t5v3x8k42i5t1xvtx3t9wk7f0058pt3bs3b78sflem2uh4h9uryi57btfs2fd0072uski7fsfeg6trs26qqpjncymsezrm0tedvm8jqljmh8jgsyorsnynalw7t5hn2oz4oowlmjcbezn1j7c8i58pd8gsxlnjzv0kpy17xbq2dk5bx0gedkg0hx8qf126yymzjw2k1vzxdm2jibkau2yslyhhz2clx0q01qdv0v78ngios7uq3u8fjsduyxtxolblr1efe724mdlqv5xej9eqdnz2eor917a24c54j8t77kmniyktatk982h4ksoo29dufztpppz5vziccoub27f45n8hhkngs8u8hbm5br20lxlrw6s2b3kh051lore2cbyycmbhuzakx03y2oyyo83we4ldem8mltqzyi47gye79i2coj68laqlp2fn35si3faohnn1vi01v4ab4wel8njj00lkmn4m6vjokry9xf2tcd74z4t60lj5b13vwobenzyf1fde7mvczmej6x4rqdg6q7nqu1l77kf70dpriapx1p3pxc8pphgvkdsglgdl3uttgb9amobvkz30xu3xyt2ayekh99gaqkkdk0vq9fa1jklssgfhrkftqe1abntdu5tz631g7ygihcq9u7j7e6b9z4wqs665k2rtl5fzcnci1vyo5ejj1iogw8xwdi9p4fm93ktd5pjr1szd86v07mooipy22qlt6hoe07coj50wvp8touj2cfuhgdth2eqbtrw9u49mw2pta8cj45oetjwt7mvkzbzon1nts9uyligma6z2s0vvtb1vnm7fsbpq83a9d0x35ax8lbdvym1xlspayoiyns66lxsw3e9llg50q2759wj730dialybd9o1o2zdkto5aqfnsvq8y4dg8ex9z11s9yx203y5rcbvlbm0ypimgzubgcoth1rjp1mjma8mbdk5gw3jzpqejke38p4en82n4ltnf2d6dxtbzygr1yjxmpm45plxnrpzedit',
                proxyHost: 'vtnmt8lo4gqsp5z0jgtz57y5l4vipbt97g9fyl5nc0lz05cmup28xbhy2qgm',
                proxyPort: 8120621552,
                destination: 'ri90wgpijhaxhumt181oajpe1eyoya4v8e2p2nd8h359yvr6822ll4wgjdry3biotdrm99kizio0nvsc7sc1p2q4wgu9d0hgu4d3u28lgqs3lkxjuzu188717kr7zo7rbvc79mxdytq96tba0ip8nvzul3p87kfs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vse8ix98kh474oewhvaypt9hn9v4hm1gkv3k1p25pty6lbkvjeyho0by7v0nom9f4s5f7w03ppmnkiifi2rmcx169nu9tji5h098aplln1nyy5c1gn5ycx2bfe0jkbfqfsjsozyzvaf80om1590jswnlejr8jhjn',
                responsibleUserAccountName: 'd070qwubyndvyv1cx1gh',
                lastChangeUserAccount: 'hxt7ustd90ni9uqx8me7',
                lastChangedAt: '2020-08-05 08:28:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'dd311dz0hhmoyqnxxo2yu10sgw7nxjjwxdj6xtjh',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'fiyvb5ugm8st9ilk41q7a2rblaatforfdex2q9d35038vyy15n',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'lav15xbdzxyhtrtl846r',
                party: '6wyu9nrthj6m3zoee8s1yocjf6ulpaxaecwyrnw0n0xf8bhovszbcq6eh24e2ze9ymgojznjzrp254ojrzemg7fkz72w8xmlbjgwtp0mstustvubs6xkgd1wy4qm9hhhhuih6b5y2lliitrfy90xy1k9hrjqjevt',
                component: 'j5kp0m69nar7lf4ns3tvd3uoke6a4osf5j9f0tlcle6z34mw6wjydr1nq7pqpyzubbxo5g7llfq2gnpmk7qf29hozqu6dw7y34eriolt1byucfxb30ddhrqy18qdiee9ne0bzcxq6mku5modb7wphv5tiwrl9bvi',
                name: 's4fzps4yr02vimph3trl5gef6dxiuvrhxnc5thdt0udv051sgwhthw77mvkjc7l4976tpsdtecac0hlnm7i2hfw5zbafbbg0ebvyc2ztnim5kwmavxugxm2vmlwyz6it7dzo2mlbjblvcfyyt5jv9j031c7gs2z0',
                flowHash: 'wy8bfzuwc65swnsoufraqrtj7i54eaiuyespwago',
                flowParty: null,
                flowComponent: 'dipzlfk0ifkwrp733zs3841j2oo8592ej6kf2bfv90jz4z9yb8ylxt3put3cvxdbj6453o6slh8bvao7i2r8xuknmdnaztsbp0njetu7xydc02q22s4g891lavzifzlg3ofg8yhqdhckrcf59n7fcdwh78cb4jwv',
                flowInterfaceName: '91g4erxfxo8ce9umh96ob7vh10kgf6o2cxcltbe6s9ca18iqnzvprxewa19npepejf3jq7engb26uaaeuirruue6n5li2ckcbw8kphpu8hjv7yz5pp9nm5aeffxufgbuwoer9j2u6l8jidqaugq1zuk79e9mhcki',
                flowInterfaceNamespace: 'ce014ewl7vhxdsnv5sm2ctoh5692z6h33ncjblg3aw9r4sr92i941i6yv9gzv911qszyavkj0e5rukbp79l42y6433er8r7h9pnhnej5xhr3uez1nfn4ygq10nshh5yrjletyqn8tlf19k47ykowbg0wvrhtuc5y',
                version: 'ewdsxt7i00z9j9kovmym',
                adapterType: 'qvi9hnonc98e8xemcim3w9031szl4fwkuf36ajgqivwmmhre1ljkpddaylcd',
                direction: 'SENDER',
                transportProtocol: '3v61hltnjr5mdqgf59v6ixn1psqzfeh0qzwnkes31s4lv617q0pwomekbmxy',
                messageProtocol: 'zod1gvyxx68jphgd2jvoty0ju6jugy96ka4zbol6o3rjpufyjr6agbc7t4qn',
                adapterEngineName: 'vzx2plj5jlykd9ldvqedb220uswnbltdeeho9gevqnz0spdtyc26bxdp14c686l1y7skzbjcz7wj3n1on6nnk9dkkxqixcxnvdr1clqn5qx2qtcqpgtyecctegqi64sjdzvrbimz5vddvzy8zfhw6c5k7tt1ic7m',
                url: '2fglj0nzf3w8qztcjfludbtfvpwgputo0b1tml69301mikztxfmltv2jjdds9gryec03wb57p6kae0ehn8mcqn80dxp9refk1dcrb4iy02e8k720xm77xg80fdy7d20n1gm3mdmhqswupbveqtmnselrv98e0sbpn1yuzlmarnr9rzixx55u0llrnkn6ppevb6fk5i8r6b44h7p7zqm1rirtqop474vqa4rkhinwnuo92t9q08gsuxwgx1bgcb6mdrtodbq4bf93k3fskdkqxlyl19a1f86g4x49zjx8qwhtq4hmsl3ix6uysbkyr69i',
                username: '384s6h0vgxrt4qdr76226e9hr2l45mrqgqj6ewwa87jtgyi8r74z1wnog2l3',
                remoteHost: 'm1vjxxu2pw1mt2tlofqeq5jyvddp5yvbubi0npbze41l48bs2vhgp8piv52q60o068telax3416z6vsajo8yf7raawd8k487zuz539duhym51papdyqvmqe2mp9aycbor95fketp2zqz5ho7vm04im0euhu0bipg',
                remotePort: 9464758193,
                directory: '28op5ujpmjvlvyu7ua24xp02k8clfm32i6nl8sfoqmu594zdmgg2kx5e0o8d9962euea3lx9dltixpk8d7poei4cokrsho3qfojovlnlqa7hgfbgzsk2q4fam8genoni39sbkyzc4hdny2globljdk2ck9ejknqduu0573z2k8xf31nk9hjvcnpd02hrzlx0nu3h667acypkmvs63ja4rdbqzz8gid85xwwql2kncp0sa8whpag3hzzmjtjb6v45auczdbd1uhyvsuqrx1uv26b2ulwqgdwbskyf8z7jit14kedxbg3gqnqwe9w2epxud0duyb2ew4ru1qdpfjy82b8llzhc5bfk7vtoywx5ulb4rg2h4p197fcezrdkqxo8nnpvzpwz376hwt9xl41o9vfb2156tx0asje1pis6aoowuxcaq6qqua5v02doxs9yb4v6uphcqq4wxq6rvwab5udm1zdoxczwn8tjfs8qjioqeqegr52myqc2j8w54t4j4dna104mtcbtuxeilw0s3atmydufgtjljtkwm3g4chvdnzimt35n42v1qa552tiqgftc6zf3s4shai8xwpijj0yindokagp4p0px70ltlce9oe6zwfxrbet6sc3v9lgz6gc3fb0fhsh51x6g93avlr1oz0uyql8gj0ytcrnx6p49ps873me8i1w4lbwdg9w2oodwjilvvwwasu87qjolq8scq13myb66iqv1lf0i7j2klsldlad206fvwoydrmufjau1bbtro2atcf3ogpiq2qhv0swtf3foy1xf1lpvmtqur4wkj2kt8hlvjmhdyrkldbfz0ilnjzd2q9w98asbyfjqgmpl3cs958cvv9l2pw279530zgd5674l7rl2z68lwhwuuve97l3r02zh1mbr3bepi02fswfrkzhf0ebj47ycll9aff27h04311vnjidc2gcmvn5082eb1glftiu7w7upioann7aq4fsoqob03n7omgfwrejd4m2bpmlj218h',
                fileSchema: 'drmp20veq0o0x3szktu8gxiyljtrm7v1290g2mw99u5t6zb2lqizy75c9wla0q5sggavoqxic2vkalvx2z2ertfyhbsx8c0r3t0qr5hxq1bc1cx28wl6hj3dnngw567sooat5g8taf5a6shxx4xf0gwqmh1exetmau1rey7vxcl21196v2z8j6i581q8zei759ebr1hewx3pume8lq8gzs6yemrsxne8kpqfzyj1zmbw6539r2q7yj0d9cj4mte00fnjjg32y4tofvr03zpy98tmg20jtuw6gae1neblerkyjo15xz712mner6m974azmutbhgr0ugo6ckspjyfw5czquzteluh6syh10r48vw13p2p8uaxgep52m9tifyzsf43cg1qlroiyne66gr69rr6mgy4zgfsh75szuswcfekf4bu7oyyds8llnucny9jwejpoiet07te61n4bqij6db37a3bppwn1fv2n3j672fjqipd42xapxu45123h78hy2oif1nluxb2e8d4ulvyzi61q8owh9z28ijpquhdyehbugtrh15fnoqrkld3oa2rw3svt85l6tnlui52s31zzgt0e522ebl1ou9t601ovw7ore8qrdtkn519zhsp9r2ri9zmkkqiya9jsqvfodlawr9kuoduuxwc042lssfbyewaspk07e7ymubu3vqmk0og8nlasgg2w6csx3it2ld1bc260rql948zrvygt5x12s8auu95b769w829cxhwy9gza7kpykc96nm5lh3zt90gdbrx9spmmfxwxstd850hftgjd2g5tffiewvywos7o3rznpi3dlwdkuzbjrmlv672uf6ys4sw9uc39simgglmavon7g25jcxo16jh9e3t93m9i87vp71ubapsq582gl6zogax91bzjbynw5jk45n0b7h01okuq2y76wuk7ynofxvvwlujdjx5pz3be3l2rfxhg4jzfhgjx4fx3fh2a8fd4eaxv32c7zw6pq9gfujaf1zdp',
                proxyHost: '51oq1222htifihlyham91jqthy2kw5ve6mu2mhmp2iaaunstafqq42x7t6zy',
                proxyPort: 6455699614,
                destination: 'qsmb505jlftzne14fhwrgegub9uj359zycs50d24sarq4vixaw8koio3lergnattipt5008r1z3rnm4gyrx0g0f2fyawfi75a58axxv28gww51fwt0rhwghj0s9sthkqeckg5nwhzwj6u0l3d8n3ekvbrkevr9u3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 't0r4179ff99ml48q9jl9495gtz97lxyag8v128py8vvhivbbahth6bmxgpqrh0yjsm9rcm8xgw1tv82ro4s1hsevulf6u2yje0lozosjmhezrex0tb2an52qxftzc11aekjksfizhe1wrgtgsxa3ybk26l8giks0',
                responsibleUserAccountName: 'h0phdu2fyvza8ipudr2r',
                lastChangeUserAccount: 'cob9xjyimpjxnlmbkl8o',
                lastChangedAt: '2020-08-04 10:41:57',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '4fuqjbilpihoykmlpaic5qfn7ubkgclzpxfj2yw5',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'oofr7jzimef5vkx2xjkhtp3dqi1if6qyai1ovzhzmjnsr3xkr3',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ptn3yu9uf1x825e6cdo7',
                party: '2gkvlx4qwcdsi4ht26p8sq35u4xabstrxlinb903igmlrmtombm9rw490xkyc16jckzfz3u4zt208gv19ztbmqq4lxr2udo0csjo4gnm660e63pklzbt6je5ovgk7ojswueyq8w8ilnnvet8sbagbuurwkcu3czm',
                component: 'pz3if8v657hgcnbfzvlittpncd74v3ffeiwx8avb7x0ankqzauytdxdo1kux3kusby6w1gunkr605rf8xf0g22itdekwi9sreebdjsvwod3b558f6ljkt17m65n0h8h20zl8kbm79z7v1gacvowfeck1tn76a9q7',
                name: 'lw4swiwasowdj44k2vulfdnwd0svnb7lt1yb0rkb22wjn4ahw6hx90jelxkbaxv9hcmxfvwr042mn5byjoujwbx2yhwb7c67p10f4sp99us101aw250jfa0qughgb1syk9eh2qhbusehbkah9nypoidkb13iz99i',
                flowHash: 'u7k43ltxt4h033vnzjsuvdfptahss3dkozclbzzf',
                
                flowComponent: 'o0no2kbm3aqzj24xi7bl3nu3d6i7q9zcph13dl1ew62psdi4bc8grzbajossovs8gaaualq6w2z4tsw8w7x8mdgahv0n8nzvmjp7bqjohwq3eoa0144z9fnrbn7aahs8jg60k8dech7fe9xoe07r671x1bxq54ei',
                flowInterfaceName: 'sqq4chu3coyn8s6ycnarmh87kccz16ov59wkh9dbatjswnlggglvgc7yuxjcayb43wkysm8zuxkig9j3aedmwjaovcqaduln4kgvenokkjd0ji3yndfymf2bsrg2cfxhe4ruhwug9zbgxvag3nd6jjl6ou78izx7',
                flowInterfaceNamespace: 'n3ugap3kgwu19unz4rig0z8amnmw3f8auad40ktbyd3h6gznk9npmmhaz9dzld64bksxchzuf71lahjirvzmf6a6osp2tb61bhhofn0szcoa8jg10nl1judsgutjh02p5sgvfhb8md8b3h13c2kbrh6iz2tyglhz',
                version: 'te9z3g4sehpe4cpnzfm2',
                adapterType: '433ie72k0yqmhlc1hkuofd4y65xyg9w2e7e3f1deharjf9i8u7zrbx2g3t7h',
                direction: 'SENDER',
                transportProtocol: 'ngbzejvtz3bn53mh0dp8fkb97d82ufgvi7ux3isdi3htef9z1j4i83a7twqf',
                messageProtocol: 'r8caqxpu1x1yj3x1izl2vp4z4cpz7k5lc05jmiunfw92bfh8pa5o2v159w6z',
                adapterEngineName: 'bdfbl5p8oftqt2lwldefwkf9jd2f7eshafmq01n15cd3oqmhkfklanw1vx2ybgtg1j8d2kh7v4aqcjfuo318mjx2v7usz7juoihshra71in03nwi822o3gg5baes5q49f41hsusj4g33zhojz4poenoonj7zl3u6',
                url: '63rtdymmfhfzgvhtxd5lgmpvlnz1xf0hxdica5nhzl992mbc24461s1v75ap34pe1hh0cv6tknnv2kxws612rua1rk7vk3ahjwv8yw2vboyxu2cpaguiiywp6hpqognluu93mgr411859qpfauythws27xywxzds6yg0ozi6veynhw7tefyox6mdoyxuar2ob9hjgrx7z3qtutnp7rk7seykjk26aodrlqwn8yzs49n0hrs86zgi62ninevcealyhoq55aks4kjw8t8wzxwbhhcg1h2lcoekoj5chhmj3pu491s7acwl1gnxrcebmdzo',
                username: '6hqhob95uuk1oe0u5xfl7bfx4wrlxvx3b8n5lbmkn5jcuw8707eh9mquaiyo',
                remoteHost: '4d6vr3e74793vwu7wixxeigp6dbr2mwhqld0a8c9ryhvdv81sg6uuy5a5odtixvgs0gzfvnboppanixvkjs458te38j13agixz0fed2of7hqnuxu714t0bym11xdlaoi8nhufungs7nse9ry36oek2sh769g1sr5',
                remotePort: 8771215017,
                directory: 'b8fulje8yevu9767sjcvfhsorh0ruf2qwncp3evsnuzsw9i63xqbkoro5m0tpwrrgv0isptmv6cwaifiges1yfu74vff3k71ttzrrj09011n9p7xb7ivq0wnwdf6ner3pddyft2enrp44nx0rlua12l5vo3psom90kqe0yvvk32s2xfnipna941yiesy5oc2541luxqnqdyltwlzxdhi4x2pb4b0ttli0nemsz304m87t5gvpc10f7o8ue1wdnej26h0ag1p9r5rbyropycoolprjogp1fcm98mxdiodyeznwxnd2vriqanrr8ylkk49huw7umvs76wbls8gm00bgu6mgj1lor9l50im16d1c4d77adz4desk40ol7a9lo9ixk14yqo8a1zpfxprle3oyoawllm7sppkf6a3dit04twx4tg3mvwwtb1trjlurwke0d162vvyb4rtp421b8dztep8ir1prm3gddrmanfgv0p9ix4kgwozf07u5vwy8mpqt9rd4kzwdl7hgdtse8y9x4ii1kjnkugpy4xvcsnvcxbdfqqijcw07zqaxwnp94qjspijgixh2duwwwhuaq3oq6vd0c77oiczcqpfhiqcrmr03ca64kgm7vzvepqwkhotefld9twc6eae011hepj8r6u7t7s02lkrmin6zf6rqpz5ssob4gj8yl2p7ul1t4o4q0uf1dsm5k3f7ssqy4qw76wuljdrg38b889gkmxcu3ozktez875q03o4o7bv190yncfqjemdgovsp0z7xzo8nndjqdytxkvob6hbvsp61ivx2h9fva7m0itttetwd3bg3dj8ewrogoccfd2lnl7ffhgro4sti23jlcwqaadug614eazvg5zursglbzwqphn98vxoc6us1tde96jroh4chr3t7k5k3uudx52a23ycbwd4a0j2fh0lhy5za1qw32xgc0nrxgz726sxlf6gqsnls1vaee121eslctc4ba67dz8n83clm2se1f8paodpewyo',
                fileSchema: 'kfz3f4o8p7kautoqfukmx2csn2mcjmqp0f8wm8ghhs4b9gthygrvct35m3wdq8giczidrrrqen3i95rtjs89veh0bwh85v38bdvr5fr6rty9py6r4u12l06ibrka9aostzwctbi9lmz90c6d75t55v799enl1n0mv1ilziewz6fu3fyp52p8521cefvw24nhbibs80a9wovxan0qg6nmicruucof3r1jjp6zdls6u96bv3bnn7jrcsvb2pndmk3tmdr0al3o9s1wfzrnrp2ihb87pcp79irltcat5yag8o1dmiz63xqk2kc86xrvn25a66sgzcric1d26z0ygaitt71twe89vif5nah6vrn9rhysg6mcgang9ijzsfq24vgenubpk8rtp61f447hx9h754vko28jr9vkmv895in3tsntdfs0alxnzscn43ufqynjm889nw3mle9exbfzz7yeticprp0gtbrl2er2jtytmsiaictt1r8w0qvl5o487opvthl2qab0m6svstp4g3fg9sr8us1wh9bf3a4p4bx7m35z1n0wb1mqt6gip7hd67ogo9o5y37qk7gxjjp4u8pej7ai9r8spok2q0yzae7m861x1y6z1ko4hs8tvhjiacz745ydipjeuhnw9tdbamsaic18geahqz9a5tg4dpcw4z9oy9kctum76f0rxfkbnqcvzm1xobyzobauwgcjlpjbynqle9cj63ti3d28s419l7pdt2jangdfn0cm3nc9tg4qll91ftc6y9hwb61zib6d8wck0092lt278nu155p4bs8tyb28su64mpjn4pr7fey8xf6rz7vxrip0jdmblu8iqkm8m8p8v7ucydisxa4t69n0dqz1xtenvslan4x6br6ksywu79urx3y5p2sahkv4jyowfzn02za0n028s1o6zxuz8oo8cgj0al7wyde1zzinxdgmpkkchx5s2m8ychdo7956nuvwvbqw9moqsjfjy0xi2vn7o2356bxuvj6cd6r8',
                proxyHost: 'itfwgpylypizu8fyx3tdbre9tl2zrue9wthpb6vyrqlb00l6gg1w167au5r2',
                proxyPort: 9889470297,
                destination: '9gbkrfqet762fpfmt1njvn08poghk4kwddy2k792pdu6s1oesfi7hvhljxw39ttdbk7mypi4c1hzrw0j3z1l56glxo0mxdi2lgx9kixgckur0q2xhvwemhfrqygnba8pjqqws2tlwywnccyx34d7n8a2ifvcdq4u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jia9gl92akvx78gj1iizaag9mmy463nelokcdfus223wh0m0qwkunfbt7mkve8iwmwwewm64byokdsu8xlbfjc8bq9ag2m9vwgo3ypm52xptcj66tofco0opc0g5iq9dz1o37t5p2abjxsnibvy57xw3q5nj6v9m',
                responsibleUserAccountName: 'ppx5491ytem26valtknu',
                lastChangeUserAccount: 'im88tobcfpmitluvk7ze',
                lastChangedAt: '2020-08-04 18:43:34',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'bkbv0pdrhfjw05ra9g2q8y90sh4iritm2ovh66a0',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ltz7ceca8vd1iztkf1fh6zti5p4fdyw1821gdjwc2u06812dox',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'uclvzkbkcxopnvhb4pcz',
                party: '62xsqfffzkkdkynea7ajd917rtsrvl3z5chr0y9f5a9k6aehj9wh6nbgi8yb2wu8r1k8m3ra4rg1peazyujtx5suacf6klu28wci1dtl0yub6pysaomrgpd4f2ozxso4edhcs60jdh4trfdrca8as6t48h9trcve',
                component: 'c7pqiciwvn29vkanaqljdmmu6gk550f6mmayzln04p95uxaw8lb52szna99vuyha0uno06i0g4d9c0fi77a7540qx55l2i0a3yq8px7insnrqwz6j7os4h4rlvj0ugtj1yu30je2pi32y6hnk4y17andffapjk3i',
                name: '52niolb1qbmz78o8oz1xchvgr6z31fbwe3hjjziu6miu5255t3njeqp1fossl10fn122sg7mc463fxsuoign3nqij1ecios3f2fyxn9c1scfck6ikyiumm9n40t3e0logn3gwsfeyq4p9p65o8lmbnbi7mbcw798',
                flowHash: 'br8fqscmo3bfkcotr25wvdlpt2gmalamih0msf08',
                flowParty: 'q849upsphfgisbk4dmgkqtoqrnvv261cf4s6wrm68p9wpqru37giq83wvhdf5yflxc5to76ix9v9m7of5qxst44swydv48p1wci87vx3r2379sbvhfobpz6hemui3hwx50vcgqgwywuua5o9zaj88nx7ogkxp9yr',
                flowComponent: null,
                flowInterfaceName: 'mqmntf9d4mkkc6jdabpb4s1mw9unejognj4jlo0aux62lg581zo8elk6zjrhimfctlstu2mqy1auupylkvxwafnkk1hybeoj48d8lt9e8tzjryrsbsgo2hss4xjlo8431f3fs6q8cnko5gvej7v9apnwy8sz59bc',
                flowInterfaceNamespace: 'tpi1v0tw8y6l1zs7il8zfdppqg53flihmv2v0aiu7h2awea0mno6m2owunlmdu6jy3g1z3k7sgss4dl6fwmyymhgszk3f8pkq41f6rf392w0t4qrd0yz6wmovoxr5rrb7n8onq5j7eb60sdz09jyl01d77jtyl8h',
                version: 'pi8aznzcfhv40ssyp83d',
                adapterType: 'hyk9l6cuqc8c6ep8rd8kth6fufvu55h3vcp83rk8y7ezxy6rk3mc4i43atgv',
                direction: 'RECEIVER',
                transportProtocol: 'x725hmc8gpofvamudo8ket6090ldkpz68jdhi3lwpbq9wvfdqp2e5wr1hjfl',
                messageProtocol: 'wwzadm4xbtzd0rotkvm5k351k6y09oufut0lhaex54o3y2buztdx1sx11r6r',
                adapterEngineName: 'ldvh3a2bi4i0apyysf0khyq9vyo4k7m8u85egh73mu4q22hiu2bj5zke2m3z0z8k5nc52lbe0jvoksgcm5jr3mghgzzzrcl0bzsbqif8kfp1jq38eljyr71l6udzbz5w70whjf2dy583ua4r201izzb4kcrmjeof',
                url: 'dtyq0q7l1js037q0flutffpv7ezhnh3v0ynjtcfd6tehrppsrt024hgsdn3mtjz8rheda0zt6s0e2zxs1p4v0qx7ku4p0b6zd00nlkrqbuiamexjgwcycxie2k9urmt3zeuuwoj9kxavt4ujzfe8ul6sdnufkklnhpltyenjfntu33gf5yfc8d4bn4jpsxklol8wjlx9d1ma6v7de8b1tugifrtlx1yquv974d0qpizkqbdknxk91fa0x321m9geyoqhu37c9e4y5rni8rlaaq3xgj1e3ftiaszelerck4itvmxlip77td9rcfgzbkxr',
                username: 'viaue5qmxih6psr4jrncjfezfkbbaqxz0vd7pu4bzmz7w9jxca7m25yzaxa0',
                remoteHost: 'ma2gtcgc6s05gy0zix6go3n4oduwoup5nyinrcojm5k81v2m7crirk9qpoqitj9m6bt4m8o672bwrfaecq3m6rbz2n8t7o0dvaamldgq0hpfzu7jd7tx7zpjfcnqed30blmo6xoszs1ec5skrplcoxkg8k1fejbx',
                remotePort: 1642854690,
                directory: 'jj2ml338d5clmphnhw3fxjziomcl71svc0wnnp4b36aov54c1931jwwfxr6m8qftujk7hafubulj8c6ezm9yt1d72eskbez8io5j9l6f3unzy9g3xe02v8k529lhmind1q2au47tsf680kafgkd3fz2k7jmtehhtz2dil6oe0aoys755y6jbh40g115lmmvkz24fplj0s17c3bgfifxjwy0hucl3buyytas30tsk1rv2clorkpliwmwngkdc2q9kaeyk55kkkvz6gg3gcm3u6zitbbii76jbvpsgp9i6fumfl5yzhxnvyz6prvhzkm2fwm62uzsgsprfyalk19j2yx8hnukz4ne3c8uqd9671xbgi4v4kmw0umwinfcxd5yr86xxduxshuol58fy2bbkwnd43z6r9w2df8hojdtkpx33bg7lhf3gw7eqr64jznhzc0ws1yjzoiia2du2xj91ruoms4lm4r3jdbl2fqvardzmom2rilo01koaraoyhrscwq9x6e3nybd7r4rc00ck4dm1n1bvo5m5hmhblv1956zecebb25sybb11lwdkgjk4ce1xb2k5dxg93d0i99maeedjyg37hlup766sp7jys8z8v15z7s64y3dqpxqtwaqxwmftcb28qlxb4mn8ed0ytwk06zqme0pb7lbgkpglf9t7z6jgd5n7zhim8nwfux3bds5xjiegbpf69ugcsyyjf964amq4fiyg5bo5cagoy9vgar99aq8kizeaqi9t9v6i2va9z33ys5pw4edlpd6ww5srhc8zr4z30b3qzdppusuqfncxc87rf65aur921s6x6682x495ye7rw2nu5p6ysyzifap2p1elice93udd6ayu2tf5tnsw9ukbmxcrmiiufx4my7zod1f9j08x3c6gggojkr35m2mq35hvs9nli95go99p06k7nlo6smpmaafvbp73wvktoncwylzj8u7mbm8fk9uhk89lzogp250nvpqzcg1ofgn8et3mvgcq5fro',
                fileSchema: 'ybnxiacsqoix6uenk9w4sy6i6oby6tfk8f6hpg4k6gqnt89kpporseagvxq4cvdp2nh9fb0lbu17vps1nzr01fzhbhisvqofl5ftrp7g9bdir5zuoyuxyebqj45yyoraz462vvkggncg2d2s8ftq63iui6t2v2o8h3qdxyu58f18b58inlstqnudd7qr4ubap2qvcmmlnxkr8g915m5b9wnzc4hfq4zkreqrg59tyf5gcgchs2a1kc3u1js6lucf57ovskdpjbqam67c83acfwcpuwqymrmlnynchvgs0ihe2rtk4mg404h6czr6ujsrsk2dlye5ug2e0wm1va02ib5p4159u4rdq94gnb94x87luhyem8hc7p9gtvs8o2rx966ux4yurvih9dp3p1wrnbjpaupnst4an89k92omdahwqyyu5ppdnuej98bpge9kjpp7pcyy18nfbp300z12mwlqqcuh0aopr63e1idzl0xbx4o7crxl7b37ijfj6uv38jvylsagsxfmky3t0wo6j8bhwdvwk9ls6zj7nf57dd9mu6peisumc7hqe7vr92mv1zaxxhpxzpa4884q58lvnvub8vbf5f9eh5ii810dsbquqob3eyyl6jsjapeaoxmazdzcdxz0ii7w18za7yeeoq32hnis0qb7cflkijenq81ql06415uq12phmavhs6wsnljz0864ey9sxzdwdn6uuvy66e43f4pouwcp7mojfpd9eayzxxpnn2j8h42cztrb35gh56ajz8jqxjpie2g5ugigy9coph4rwnt0js119r26nfqear76khqgvfufnmovv3u6ui3rfofzugpkqvdzbijlxi6u5xzhs8ushe5b5qeum23kq6y6q0b7qi44pdhlbx4jz3rkx9y1gw68o2w6f09fohiq6whfg4q24c7fxwx8nfj2oqt6or2utfqftmx829pdb8x08ft0bqqq97wo8dpy8ngq2dm1f9rl6owwkm5q4yxucpvwx2bg1iinddjj',
                proxyHost: '56b8e4f6dpztc8i4fyndv6phl9f2fzwbmtjezb26yutouaejmq50qn9sumnb',
                proxyPort: 4205926605,
                destination: 'f96kjq1kwflllmwrs1vr75wksywgcbdk49cvzxmegqerzx6nfaeb0gvr813y6rskl18ryqlme1kltwie4blm1q247tngd7vk45m1yfk7qr6olwi2b2h8v1192zugtibqzzy3oit0t0jkmi3vntm70k72eq4kt3w2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'okkfrp55bxs7f9xgoxn8hr7bgad4clkanpvmsznhfnpoo36n6qr1rfd7p9q614l6u5ho42gz8cfyt12svryclvq13c2q4ki1jnr2xt5lz5q058msyrflyj39y29az1o5zsr3sa7hnzqnh7ap99zcv2j1lr4j52jh',
                responsibleUserAccountName: '05cltzs72okjv02wyz4x',
                lastChangeUserAccount: 'q8k26ubmj4tsx6ifwj94',
                lastChangedAt: '2020-08-05 02:32:03',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'nx1st1hli3veygue7ho074lt1pe9gxggldk1lga9',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'rfm876s16aoi9hb7jkr4jepist2tx5iclg4esllo3evclxg9yn',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '518uagsx4lqgrjiyc6vr',
                party: '0qoqjju33bdwmxs7d967na3178cezvmfhm7oebvqw031voh00dusgt8v1ycoq72txz58u08ok5yadvvwzbfqs8mqg3cuws20vqqabjik1dshx9ra0wkhvslm75ul5twexrgz00rdpjaa1nj9r109yvwy9jai68u0',
                component: 'e3c8w0ffuicglpbvbi9ii6kwra9ays2r5fcoski6sc4tuqz9svzw47uxm0b6rn830w0zlcbzd5ex98g8wu68jnke8winrz3zy93kcgvu34mdkos2qhp4dwvd9zuadtmvu5o5f9y56z01k7wrd4wri1rscr1ltyai',
                name: 'rmopq1mbnn90ht3fhyv3ykio23ysqj7muwhhvnntvju3wa780y8qkj6cpjd36m9x5k167b3l53xndkowptbd8x1eenn284qt149hl64kz5eq40gm2523sysh33naud75qdbkcj69lafz3vwbq7jufg7o92gsuxzs',
                flowHash: '9p40fvznn7fnrperncyqy2e5nheanen8a4kxtbkh',
                flowParty: 'ek30wfelna5v9p12gk4kvhh5yvdnnn93pprtphutn0sk0lh9yr04lw6ap29qqpsiwli1ytx2uc0twbi55ivno0t7vzrbg84fidxrzdjftnp418c9ogu9qdzp4bxx0fngei0cmlep27u85mgyrou7ybgdq7p7q16k',
                
                flowInterfaceName: 'skpucz2wukgztw2wbap0dhi462ksqefp3oz6yw61g7mb3wcuafp3cnalcgghrxejehaub1nqst6gn293g7vog0fj9o5ug1e2t481mtlpn0zywf14e56ph1xv0wugavh9sndpiq9y25hgmouum2e04qyml32r3el6',
                flowInterfaceNamespace: 'fli4serxuifiqracbacqo1mn18l721bj8qz5xge11frvqloptcxn144g7mz23m0jn9gmh5aw8h1dakgf2fq6t3m461ymrpt137brr1wgnb0sfqmo2sqtcjb5qc9lec14a0h1dopvs66fg3v787ik4fu3s807e21y',
                version: '9qefru5uhjfuce0nyrvq',
                adapterType: 'kcb369gxklt8jj3g8f9iv9c79sxuuc5nyuyfrolvupbwk277c8ztgpch3a64',
                direction: 'RECEIVER',
                transportProtocol: '68fx2x9mz1d2w2oiwf3v3v7zh69j5uj3281u2niql2g62yi03rx0exi8jxhb',
                messageProtocol: 'ywjtykimq4keyxf39bamxh08n5b5ns4tckhl3d1bb5v2k3u39eu2zlci72c4',
                adapterEngineName: 'tdhreqgp814hh8egvoodyyrupjf62m6qxuf6ujm7pn8nkuu4qzof6gjudkh54on7nvl6hqz05s4ftgha232ootu5piq7k7q2kcow67yff5rsb7k566y07ohbdjsv2vf7n3flbggbwuij517occqgetfnjdst3emf',
                url: 'khgmbyt4hwqxsulmtcieplvudxlcv18icgx8v6rihngn92xklbx8yvcx8hr3m9d69b6ra853abx6a51gxqjkbimqy4lw8yu8yoimf1h3c7cg8eea5ivm08x9xfc5uelovtsg1vpmgp08h0fghl2qomlgw7czglc3s3qz7e336gaqp6wrg3as3kn33qg26mvlat6izd7d1ltns4r1k43pg99xy7w3jv0nuy89jozpuvjm711c4odk1w6u7wswjdv8el6hcp8l76q5pqjwmfhvxqgnckk6mkc17opaeivzmuq498de4fh9opx43fkf4fxj',
                username: 'ybndo7hsqjqslc9yl6rz2er1gdrj04lhali8ejhtztri2xj6emdlo6u8gi13',
                remoteHost: '1sjfibkfaskxe7jqp9m1wmbvfxh1fxy5ftx4i4g1ai51bjsc4y8gzl44zjtvpgehn9yflecwtpzuapdvjnfyqkiwnw0ang4oblqufnxxptep2bngkm924l5lpqv6j4q75bm0b3htjg1o7s2cirgafutdbugglmum',
                remotePort: 7626909919,
                directory: 'c5cz4ta9y5egr05ojm6bejjlw92gd1w5plgv4rjxewl4ty9du1giwqf4g3jyv7ruo28kaizvq1sdxt8er01l0jovrstytbbx67528bm5nkwvdwpflktdmjrkaqmxlzyhj7sjs0nua1gtdu0f6hy6gh2xel3zb626tqqg00mvzq9s0ewmtb06hv1zp0y7jbxfblfexvxksxrcvbetuflsq5thjvbddc1amgq5yiv432nth7el6q347uxfy6nebqqxdqthwazgk8snmlzupq7f46p3nlu0dmm3fse1iqsbqysfkwsuo1kd9sipo5ay430ns5vxaaae589z1bfpihldh43203g49zidy3xktnlxv2koem8xoj2mmnbblsgdnnx0eevl1v1jvi4idy2yw6d4cuii2maexqttam08p67lgtlr652ofwpsefdn2uhlaknlv5lxg4ab8qrbbh487hhmg2ngr6mxojnqzvf6qx5pfhbeso4zngbzh1tzspl78u075y1gf9z4au0ecb41jlwdfkvcktwbih356xayraoludpnv1md69wzd2tiwtgjxm2kivt224vyddrm0e7o7lhe8knciaahwm0wq1jmb15ozsatfl8wrcq8gyw0ikq9y07gx06nw9lfsq9f88s5noz5kkoel9q79v9ntlls7qxh6nch7fft9ezgc3yzjjsx5iqbeqvl24g6a97ryyl3h0ox2sqdakiiecvkooaedezvrubsp0usrqpv27o7kbopp4hfb6sy4lw032et47r0r7rzxqyhuap6s200036pkzwywhikawauyer1viacta90zyw7kwyrx9uycugtt1t5wk1z7g7e2ioyka6p1x34o8onmmawe0vf2lf2pz1o69pltgyjnjcp3jmrga5jvcdgijvs01vj3qbmgsnk0njve9hyr07nzs2fsufy9j1o24amarapuacmfzjkc51f3awxrj01f5wkyz4a1dt50665smd8pjqqxv8la1pvi7eg8ye2y504',
                fileSchema: '6syscxwjuvboz6w4lcinyhijbrcof3cvpp8f75bze8119whtc7wwvm0nsp0a415u98ujgxuiht6x5kqj4ld7d7jyd1kgsf474s6prx2kxvwiht9lpwprncap97rliewf49dnm6q2b96c23hpgsts1n3vf1md65tt1dxootdnjbzx3p9giirys5h8g7g3ou9u59xvsp6dxcf45e4sjnnvtxhk7pc6eck55glcet5eenvs1jxlf080kfphb066mr9qczxr4c8gsioae0kru4w171vlvwatnbf2dvo5sjmnlm7m2q9lhu7pe48m7qwk23y5eew4npurld3sgbov3ml65s81zkuwuei4dfjl8zkfirmjarx9elsaz7x7rspxo8q41iyon1u5ervncxaotrf0hknge1n61tutlmcwbzijemtcsfif9xe2jxqj8h78gsxfttjoib1gfk0mjpc41d4euzompe4mj0n3eh400cdxy6uf5h2qr0x5ki2cnk3qd9n2ktpzghw0wkrdx1gx442ui6sg9jg76c6i1ylpyp2wdbnivxlk0iyf4s662x3z7wm5045jcmmkcu69pl7vwyhnh98jkwx4crq4u9q16tiwazvzn3khn0pcwcusvnpat9eteq38g37cvlhydjwctcpqokn8jagkmf3wjhxi96y2ezw75wm662dy10vij55xcpit7nzk15jkg4u6ts91y6308ttvjqjlf3598cwy4pale45l2rhjwkit6dzo41efdsjr5qpx5h0d5arfkrw3ustassd5vd6ld56q1ejyjdho7b9cerbi33j29mp4uzyku48qdu3i6n0ztegygjyuo0dhsqhpmsj07ljs6boixiv0x0jdr8ssrj49gigroekiwk0i39q11vuqvylsvun10qlo7vtwc3cxj5ws8bamghj2103aa92w51bcycsuimcg63es4yy56exchm1sx38zqlu624j1lbbkhne90ki2mbu6jgn8dti3b0j962m2ab2mby48',
                proxyHost: 'ej4f4xyj2oaf2w4nv54kswuwjran4wr3bw2mnk3sidm6f03ddoipvzwqt5he',
                proxyPort: 8070005253,
                destination: 'lrwp66wii6hlof82eqhg8x1avxqx2vwysrzal8wtu2euvpvovxmczyiaxybolegx0146juanotmpcpb2odwe6uy0c6267n8n858az4dwcvrte3ysnvnqmjxzti9ggmvzmgasuwtiy8hvjnoit8xql08ss3ozp5t6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'war8o0rctsvmd34ljaqrkc22zsp1jg77p1iggxohuarst59l32sl0sfjhvlv07ki28fa8x12jn9hbyafk0yat7v4jf3okil3jpgq5y5ith28u727djbjhn6vl13j0k735vlxpfc3aq260oha1umdxymh15kroz3p',
                responsibleUserAccountName: 'qp9jn6vbb2ogd00hjrlg',
                lastChangeUserAccount: 'j6ba3ekabrx3izhys4jr',
                lastChangedAt: '2020-08-04 18:22:09',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '6hzgwo0ic1hqjjataw938h3cnd35co3em7049f3y',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'c33ke7vnph5n4tqzn0xqzgjprje1mg3gkbokcascaomdo1p7qt',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'y828si74v28e7lggquv0',
                party: 'cknllf49a4og2rtvhieyeg26xho4r9mo352bzb0tp2t080r4xxsfjz6s2z9yjvt5y9vzdum5uckv54rk5ygttfvanryeg3x82nlsy5s1kptrqqa8og1fnzyl06e6w15mcjh2iu920y431nnmi10c8kf9k57z2f8n',
                component: 'pun14f27eylfnprnorvmc8gspfxat8r8zpu1pzwnc9x5v5n3drf791ga18muxdrqbkslwibcu90gu4s8n78domet041rmxnevqofgx6g5zvazwq6jl9bses6pzztmg0un2xe5cil245frh1fbhpozczx975ben0q',
                name: '5sjcxmnf4v4fhu5huxfm6w3xdqta9rjcss0v5mk8jmp695iz4omc1ym9kq5qcj1phf4ri66rbtb621cikkts1ycb16g58p3s17o25zqk0o4c2lznfczs0eh34xnttcex4jzkcrixkhc5ajkca6aldm1hx4291rwz',
                flowHash: 'ownwwf93idt71vcu1v99pa9nej478tgxd8rwf1m9',
                flowParty: '2ppkg6cph3c8s3dr1ypqk8bwmal12h2l4mw0dj2oi320qlddjq2i1o2m8ic0a6ao5anrv88amr7l4soqaf0pis32hmbn7fznfce7wn0tf6iscah8qhn6unovr76iw5lug67v6qdtcryo8x1kif6st8n4r61tet5x',
                flowComponent: '1x8rehq1iffugn7g3j4ubzdz3b7ns7pzto7yai933v95t3cvz60f26cwej0njjfbc3bvzuwknmbi8te9pgwb7ba4lvra59rpvvinaz7zyyyv4ayqjlpy746r1ole2vrsfv6mooa3ysl97lykn3wnwg47dmfi1d0m',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'wgdyxlg6yq2zn9bi6ilxf0j61xrj3vsbr0hsttmbsocg28s07nat3bmpjj07v17fsgm39pojfhvrq5bcwhqfpboz1ekrysky8ougtpipartw3qbs806binjzkaok6rxmsxjdi2uxfl4xtjzcevtx9ftk4z7l4f9q',
                version: 'i4uo9cmgf6q3c27xd7qz',
                adapterType: '54myvk4wrrzuntecu8ul6ojtl3e7w8kp0q7unml6grmanof0zmvutxmmm71d',
                direction: 'SENDER',
                transportProtocol: '8q8szq73oos45x2440xkvuwjydfearoe1klyiy65y5qdhdntr3irzj3lrg0k',
                messageProtocol: 'vxn6rnv2rqf6x7r6r2utgtvly3fo5clzt1uy1snohqym5d0y0m493i6d2zrv',
                adapterEngineName: 'bdawxunkx3bnbmdp4byqbxzultnr1iqk5246cd960n6re6d3asyaxn3pjtxyuuv3anw21xi6131mo7ttxowniyqze9rg8r9kx6a1tqto9j29yek2wp2ohlmaux3b4etl3guogy5uwf7e3gbl2y2pysaa4uj4hrh8',
                url: 'y2hvcy1ka5r37wowyayvvkzqg7a3183xigi43y6l6h3m21vc4jrcxqzlb0ztc1qxd2hst0b92hahfanyw8te01g3q8g6vblcjntiv6wdo2p9u6gziyqcuj0e2636gest3tc0m6c9uq8xacdnl59c80438v202yn2y4bft1jkve7hc2bvu2gzpmo05cv78lc3rqu2ya56xp7p85ns82bpca7pb39kr0g5csy28kz194rqwhc06ya7kzw9c8xjk74f40jm3i1ypp341vkf2dn0rxn7jjsh441d7kvreohsk3ilif5hykdp0nquz7ede14f',
                username: '1we8qnf9dox0tcght1zk1hcwrsgddx7h37zkcc8u8v9b9s4xvkoat6lumiop',
                remoteHost: 'g955hswkj3yvckj9c0cst87w6gm20yep6nl31jm7d5we3jym51pe016oc47xs1rt7yx90ldncajoyptj9lihp862wsn64hbytug1kslq43flv24qv115iy6ulmhlhmhruwyl5d5y99j43exp2ububcbajzpx4mhj',
                remotePort: 9309128392,
                directory: 'ngcbndrrdo5cdhha56s90kcgfgzrz42nupka573i0sq6d0g273tegbnv7qvfvec554agfvgt0hvxe0taymfb0rk5jxjpovxbsv7gj31oldzk11lyq30eghvw9uwh4tp4r00ue61jfcw22lxd5vnnuxus0471s7nw03y81p7je39ken820dkvean5ljrgv49h8rm6rf6m55bcb6i3tegz20ugdp8nvu28m6dt0cpez8vpn9abvhyelb0sb7o8d4m5qoba26gi57luj286l3onvqfz0bostiz7l2fo0xak1qtjyu9m4l7w1dqxl43h55ivkjio0lqq477halqmeke4amy3lss2c57t4ah2o7qgpxv5tl7mdxgtd0ja4ii5cmvgaqs065uuuj9mzj1mkdiug5ca8armglmyenir21wu9yj8r6jx65jgdbzlguy7k54zqmweemtee02vcz7eeh7p516o17ixrz0d593ha9fu64y650po232x1zcq2gd2475x62yvzdhdh7hntokg1qh2obou85uukmtdj0ux9z92nu9p959c0p5m4pjia6kmw8de4nu0pxzru4lwphe7frk7r4pgx4islpwc466e5cu1vnjxbiehn2q828zbgr3vp88ypcxz2pp74lp53z0ta4wfwkxirm0rxdvlfo0kihf0ng7pp72fzc8ja2paybqhwmewruowl621bgkyh6rcaax1cr2a5eqxp1u15oqv6ar7ng8d1e6zpxz32sbr92l961joimb8jt72dypxvqcgcfbrlbey9qh35w538mq4dfrtjiguydogws60muiq24wh5ploqt52wttgoxy0fxx1vlhzea52fj1ndw445sxqn3yf4mn1onmh6s767t3dezj6w224dh4b1d3mynspmkee3k5hcpaq1sw01ne2rad9xkhpqx11pghl3lymnl9dcdmfioz07m4bn9twskhcb1aupuehyviygbyu84krdflvyg79uqc41np9wrwznf07ei39f3dq',
                fileSchema: 'wd14hh8ouwlkeh3nki7rzl98uxfseli9x3qf0femimz2z6yoy2904g04c8jobwfdyzc4cimb3ehi960yuwjr6tgp5xqqzpwkpw5aozrnwbmkbnl51su44td3fqs43cpf9m359r7mifpig2wt0dv5qe5ufcdlihtze8jhvuv8zqm25c0se115xepj941qtdk4qfyae9r3c7nhoca9mh5ybjj168iiejpuyz720o1whq69gsr1nld870qvhcguk7iev7tuf0m8rctow5vcz5yyv4dtf1a4oumljg5oml5sbijtfrdbv8zlrq6vxmtczo7nfc1p91cyfa2yvg0v4pklmidf9j6f2226f3fyfu0xv89142hnur411ghkmt0dbilfgb90vu210er00oukr67pi3u5o19ct6h5z6aw4usx8g4y1zbkqjqvfwwnhvmgkan34r5oe7cd0itzo40cpscalo8zjdp5i0or2m76hjb7n9qbmv9uhkkphs0i9d0uid9c2rztjd7u8k0mioqebjsu89gjchc9g0sssbtr3qpjct4ewhujf9aozp15c1koqorv1vw8gch1w8a3e2ubh6attryzvn46f7cn62hdz49al3kmsjloee9r3jh430o1k9kdfdi38rrsby06c20d4sbahrxad36r7rfvb7x3i9si03hqdz7cy7gfbkdxo19ffptevy4z5yjkosiy6ff7et6nhgnuds8tw8wsv6a91kd6zr3rst2upuaiy1prnu9d0tpo0qhi20ntygac1eajba8jl0bgyjnb30w3jqz6tdcoqf2iamodttq3sow4xe4tobep367lprm7od52xi6rq5n8ekliqscoi61uqxp78v42gh5rj1gc8yadhx0hzdgt3dyolgqtsi4b3qq3fvrmjb5lt7x6b4a1aoy33scgr9crpudtxrbzocfg2rkk2h74ju51uoamifh17otdte5zw8jtovt1mth6l28u6rlbjtlpww9nzhsx56rr8t08wbsgambf',
                proxyHost: '5qyqrexg48mdby30xxs1io7amf2bah8apx0idovauyxk5hxd35ct9qalevs9',
                proxyPort: 4358342127,
                destination: 'f5kkutwy979ovswhikvgin2e99hddxkz5sbeq874wa7huz3htulrwbup0raxf9vvuv0ffiycomm3vbv4pyz2lkaqoz49ijc7uf12ih5h9b1449nakrl5jm5c2cstq8khb0bnbbpqovqlc0vhu6cel32r6tzbxyqw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '62jd6nltz51mv8uajyq8zvan231lrpk4zywzhixv0r23rvhgc9z5lxbct5vpl65b69y4ntixivy766pebojgh93p3sv46zoo7w82v4jhyfjyjjjlur5gsq56gstr3n9pi0afxlbr83edfqhsaf1lozr0xrig2own',
                responsibleUserAccountName: '5jjk5gjofppm2jfosehz',
                lastChangeUserAccount: 'y7plmlnmvjpbd22i2j55',
                lastChangedAt: '2020-08-05 01:30:31',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'i2ai0htggdx1l8vi3hakc7cr1p3wqa2d8onyp46g',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '6zzh1et2zo47h4athg5sgckj7nq2ezd34j23nz8yt0jcyvspjn',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'si27x6u3fedwdn87h0ck',
                party: 'jw3qt8kfnvnccrswn8j76fj44e6s8t1wtmd6whbf3f6iw5tsydjovj5lvfvbr5pun0pqeard8x7fwcyla4hi7p7w1c87oxv3fv3td96yhs4kqm9hnrjxawlh8c5d5nm48s8cyutrmw9kf2xhhqm9mt1xligm4vca',
                component: 'cvuk41yvxc9zjcn519rzyao7kmyatbzvmjqqazss3jl5hp5qjev9ainh22i1y0zqtmgl9oum4zp8y0ddvc0109vgwywnalf04ju9h3qneso23tez53x5lkoofr5n4goggacmc8k2bbm8uvlcj8uon5ji71y5zr0w',
                name: '1guhchvtdcgu3hnpa10ev1ztva5owawdqg9ovf5iv4gm5iu81245yc7ddxi8v660621o985uwut7ub85pvf7k6dnwmu28zteky9b47hi1ggdkq49ngfktzbmi02766aa5ebgsrnvtup4dn6mebcf2lqbunbo9tpy',
                flowHash: 'nwug6vab90234oc2vjb76fidwkayirryunbmqg4i',
                flowParty: '9sl000tjyio3qbsrmubh73zkjiurf6l4gc84w4ocxy54es2t6684pdpm8qeu7kcn811selpxadh34a4bmvnj2y79tplvsfn7ukwdio7n73sb2lskyrh5vygdsj9iw0ro4irpxx5ntigaw2yhgjlkwjhv7qooeq8y',
                flowComponent: 'vhzfr2hxtiry6onn7j28ekba50dntk8o9zyzv4mluzcfsrrrkvxu8sg7xzn4csrxilu2oabjrambh87l7798fdbk3qb5y6h8jha9tkwve3acilwpesi8vzg8wpg05eiv2usdt7vx102qfmdi19duu2aubf4t9fqp',
                
                flowInterfaceNamespace: 'yg8xoyt61xp3losoaol06ulfl3qnc5ml9n3gnsiw2808efwxg7t4j9h1z7xx7f57ibb1llbql7igzb3xfs3nmjqxc7ktmcclhbqtw8m6dwdsn3bwvzo7x2sl1p0x4gqitc6o4uhirv4fvtj1vxrna82y2ks5vk31',
                version: 'cyjch7hhyptuhay5z48o',
                adapterType: 'x15mc008jemgh5323nc1l1jfoni9d262locrc04t5gyfzc5dtp2cajpskw6d',
                direction: 'SENDER',
                transportProtocol: '5h26v8g9xka4ilqc6x7ghew2xzk9bu4bjs3lqf3vkhwkdvshgqfc77jepy97',
                messageProtocol: '4k9rgvi61ztg8bvlvrs5sv8npiq4pukyemidy5mukcn492ecbip421hnn5nq',
                adapterEngineName: '11li1ba3i8m87161idtw13dzbjk950x2yuvrcbpd6ulw8wq9nxh2p94plisxsicr5d0k70lj6tlq43as7hq327vq6gsydw5andhjz7gflk4ezv2tpae8gps07lc2qtmloo6qrd3cs5dgb65nxnygdscmv3k6p65l',
                url: 'bx9eenaoil6wflhugkv77rnq0w9ki12czzorj4tek1hp36ah8jacv4j5uj28mg9l0g55pdxynby0tmrkg8mefvp2bz552cq3dok11gsuda07oils30jvwc2r4wgl0oxged7s2upe9xaif1g2rima5f5j8y3b1cc0qt31q3styumgvezoaanbrx4wsfk4hmnmolcdshbw2r251w7ejwjbx9blgodmnfs54e4gua2p6mg8juoza7t3pv8c1o3xncoo5sm1ebvxnnnt3tnunaq5i10phf2oxsd5lomodghqwaypl6u7gmg1i4ox50vcbq7o',
                username: 'vpghpb6hdxyw4ig3mbxrnb2nvicfiptz07smhbonii3pc74g1hggjelegpwk',
                remoteHost: 'ycdnlmia187tdta5m0ziua1pydr6ogeo1sg6d66tgeej9v4vxut8a6z4zizfjvcjzgp12qy20m90gtfs7t98j29jj76dw6cn3t5vana066gi4fzk2mhz7scfl2hk0a71i64vqhtuu4huc1qhtin1yxte2uycfdn7',
                remotePort: 3518906122,
                directory: '3seekhhftmxb279fwi80ex1zdnk3jo0gnewox6xrfbuyda8f2c3371f6krulpyv5bu59dr0v9luhk30vz2eh8k4m983ze7yctp3reemql0mgihk2tgl9kpb4thl8lifp6puvj73l6toawoteuvn84gqgk48kbvqvr9e3on9m47jboalb1d9697wrmcuj1ojltolbalt7bn3d4ygiml3cn486wq951ixfcaxj6uoksmpo0xvffcpgv6ga5zbbou3uhc61z623axz7fje7rvxcileofa1fzq46y0ekhxalli35oewbv1o6cwwmb0jgl50b1n8fsx4xnjeitv35trl1u5p8haw33jlv964ggnz9s7x16e0vv5x0k3vfiqewdssh94j3mqph9mopvtnuvqj9donchd3lxizbuzfmgdhmm3c1k717dlupbp7q0b9702dooqrl56sr823ezjri0gv54hhwmd6y41kldop4iklzp2iqs03d1g8abe0whnle74fsr2cemgyg1137m2cy4fggnll3h5be7vw8vhaiedj0i3ea03m02ftygceufjrshgsn6fmt3hyp79nix4uehkt9ekz00z5n8mwt6eufrdw5zgvrddrnipy3atrgv69uo5h56ceqwob99cjggz18x9mshz234jgam3et24421is87zsgajj8qtbsf5pqwzqe48gh1by0v861p6ocb4qysbni8bk8iq30shilmec3rfkskdtjokgv6u8wvh8tm3hmq3vc488j5qa9y9s9u2vrtux7ewzoc7pzc2e0objav01gwy3eyr1kzte39b4sytetlj3mr1218g6idrtwkmsfwhmrcao43opu7dfy68y3ol228evure9gbl0qs6ljqb5ekj2ipxsy35uqztrejaa24vh6k5qhtkdqjqc6a54gr7uh55tl1z5hcsomtm6za1wsy8c0r3g9nsg4aa3bedrqknmfj9ecp5rwhqyirb0uuzv7d4vqcvmt6gvlmxagmj1p9t7a',
                fileSchema: 'e2lv89aj6r7aesmni2o1b8oyliqhyhuo6qzl2taghntnhut0inkz1tgc0nr1kshkdkgo8tvcit6butejl5sgzpis8nyysev57smdm41tnca9bmc3tapjol06dfp5d567823gnf18sfzc11sck5r2j9dawczn89pfngujdkrmnnlr1lp1luqunnwpr6x6f27zb9uqdxu01gjffxqtmoso4poauvzm7k8a8q9npoo2uy8jpzlpkbk36gwjuczdyv8854b7kyz57anln1rghneqzdw2rj27xhzputpnyyj1she4j4om3ttjk3glw549v42z8g6ih5wtc9c14thu63qkud5c5egtm6rgkqrt8akxu66m9s3l0a84mv86qv4r4s27yi4eljge3ejuvt7g4jdww9ihtnop7y5laop9x92o1426d4583acc3zk1dfyk3lqtg255cw5ni392d4x4e7mmsdvtrbd8o1znopy8k56nxlnlbc6fb1u3qq4eirtovzgh0v6fv2ueyw9cy03ehudlrkh8xgob7xktkuf6lxzptdwfodsb1pbusg471r6xz3hqwcelqyvdcki5q7uxzquky8td7j629jfar8f96i3f4ga09n895xr13q87cjn99txvmr11fhi7n3d6vgju4bo39uj2js03q9yadbv3lbehgjassqi8ona19o8outvlgdif55jkykqpenohi4dehiceclomakn04mgrlzaugffuoa2imj0k2sgzc8wolhagdh5bb03t27ndp0siji2upeaxzlozfqdoe07m6g14w8flu84psacdg0qits5qqbdsodnutavylyf69pj38k3zx0djojbcy2nn3vkbbxjytcod6jpen054j8bxxox13uzne2nemg11ce10azpbugiz3h863f3l0bsi4nc395ty54qckju6wpn629rqyzptkx1hky73g5hgn06tn6gqwxe17whay0tmcuw4o5m7t44j4br8f5ok17eotc8nc3dqakxzxtvo',
                proxyHost: 'kkugrcrinu4wdnhcy8eljacaxm63eran12xjrkkimtq92aoryuae1k78un14',
                proxyPort: 8136308365,
                destination: '678sskw6ehkuqmykc9923kteml97daxp8uajm1ezveycap25121rigjks0sk2zzessue8aalhx3213d2ktpik3xf8uz6qbtpghum1k9a3fu9b93mgikg8wkfxxjf5jxiolot4uxd25do3mpz9gm2r1qbvblbepzl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mh3seimkjwx3sg09w0s2yg33rkwkbr3qyt9s2il1jgqp87ajecfg18z9vwvlfxrq78vxpac0e01xyl4mwky598sych603u1ihp0n8qpvjsoesw3tish0hwnhy700dx42z20bbkb32nbeh5pxx8wmsl0kfo3fvzbt',
                responsibleUserAccountName: 'xacv9aaaqvtxr1u06ew6',
                lastChangeUserAccount: 'poy55qi00x8pz2pfwt9h',
                lastChangedAt: '2020-08-04 19:41:01',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'dva7x2y6i86vlxzw09ztuwhngz55fcy4sesvczxh',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'f5yjrdf9v0uxoneupemccajjsvm1vk17jlc9lqmp08g8nb25zq',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'jj7fkkwl4jebfh6zmcuw',
                party: 'naccgy9dt2yy9sje2q8utasw6reu64kif8lwnwz6kmficxwvnh7odigiqx76ij3qam2lxqwac22vnuxwers80uubu12zousn4gg7zgr12v8xy41o2xbw6u7t8w45w77q67xb8z27jzq3nj6lt5lso668nw6rv65b',
                component: '0x16p0hctr78bnfnlixo7272v7v2oev125pcmujpj74lndtukwzoixol46qikva6g9ggi28966pw3wfjpjnknrq5mpdvg3wyabtcx6tegtm1npk832xdp9n6swdtdknsa7my2wusalgjln6pfop8klktpe3clc9j',
                name: '4e4sr1kdzdvgeahgtbb3vw2flnk0mszvms6zk5v8q0h8xhyo70su47ed56z944rs0j354brgmup9ikx6lsuvzphl8epbznnea9b4whhgzya0aubyokh4ah6oyvmm898twcn5buozsmpn2ecpotjr0hw4nyiojj0y',
                flowHash: 'tcty2tr1zjyke2qr9acemr658bjznibbb70knsda',
                flowParty: '6uixkudwv1hi3bnqghjv6z7uxjsdxy6r1w2sgapqaasi3dq1gccav0duz8zhe4ovt4j1k83batc64eq6z786glw8pl3795xs1qbcnawve5egulakwt7kl2xo56wlkuuad6xwy2f29efmfq2o8ac9v3mmujsuqndw',
                flowComponent: '8hf22yr43y45cbjusvr8ovhzlu1fyqt7gzn1z4ih87wpg44rnqenemewwu3wlhjb4bvghcnqr28724ysut2yu1xsf5xtyu0z0epgdkq51qktvpcmfyhuw8tu1szg9frbmof5vusijc2hm81zxjrxiewuy0c9ytcu',
                flowInterfaceName: 'dd8w8s1vs4lcnhx5zox04ekzuklgpdmjmt8o7fo22lbru7fj4z9jtcztiwkg4m7turgyk35655nrx8w58pz53zkc3pr01w2m1o94ik2oxiom3cm669fivekenfbqq7m7oceswdfmcyutgs8rnsg1t9wi1hl8uftp',
                flowInterfaceNamespace: null,
                version: 'qzvh93an125jd97iusrb',
                adapterType: 'o73cgc0953opxpn8bu75xos3gmrd6rlndpl6anuqkeazsudh3bj1kxf6u22e',
                direction: 'SENDER',
                transportProtocol: 'brhg1xfhkjey7t093jtsrhctt8kuvd9dlt57u9d12g7x4s7dck1ckzqnnq8c',
                messageProtocol: 'lq9zxwvk1pcmfikdf0pam3any9g0cu2k15n21riwy5atkkw9pgz4ucabsop8',
                adapterEngineName: '8va6zkp88zz1x0trqbx88gmf4e2qd8cws8w48h06xoerqpbj510qbc277nkycucxfnifob7yt8sfdhtgmdhp15kz3u0rd2osadcj09lusby5m79zbbqtznctnaxtvhjbevlzor2yv7h08nzx122tlcddprip7o8j',
                url: 'd4og0lahm18pbi0pfoc45lyun6sjwlljoaw9puuh5qgrhb2hld2apdjs7syxjuqfro3yr1g4t1frpgfud66bzcnxkqbvcjce7iv496w1kefeftm5wnkb0tcfenjoiis20xm5micqgsdwfrzv7048nqobyuvrym1l99mnz74yp85a86rpvaemwk32h6hkokeas6xiyyfly87aehzetpacrwfvynl1eue568e44jt00wuztxl5f607um9av7iegefk31aobd3bn8v4ovrgnpaemhn6bljojgeeyvcqflnrgpodqzipz63qoh3t1fob2upp',
                username: 'o8cedpifyrunfye59j3t8qfxht4u5y2uiaunp08v6n3ntx3sva0nsga2kr70',
                remoteHost: 'igoc1ga9tfovkltuvsjlk8e1o7mfbdf6uzeh4i17xo4ydmhqkbvxyf6l8zrbkbu0shw3air54h9dweemn7o82y9ye1byvdzxzd9fqhclrqrh1a3tkfnkon7lmueqc8schh18cfd04a6t0qu9vi1uqvbg7m13hrx7',
                remotePort: 6173407394,
                directory: 'qc3huo7b7hdmii5uy26fjuvu8bf0et7aj5bwc6kt04nif2ayf7eq7otgxl5s37qs093w0lrho5m754s39rjc656axlppj72a6ui8241fcppo20pwy20p00b47p1gq0st10f0k1o66i1q9hv1yii7v0wc8580hb25eoub7kycy5jszczx7s15f6c9itiec0l38adgr08ds3va93zct52u21fdcnregse4hnmtgwogcyv51zel0hzcubttqykpyeoer5umqvz5sa5qnw7expv814p7eqxl6dommvenjx8tsbl5hd7sant5f5335cqfty3cd1drhy0393euu8lscpm3st040qtbl1w2dr4yr78tf4dl91by6me4qdu5w03e2eqrpdtr76g5w0673ghceai1az7grlfetsyawm5m87zggp23szymcc4eqywu4ku52lkyfy8f566eubmsbsb5w9dou6s2hs1629yp9zwgs7i560bi140pnjp12705bjuobnzq4pcac2ij82rntmb55p7q0ppvu9093auybbcd59ah6p57vq6l5qoqypyfx8hog0aem8j840kxc88vlfh3gmiis3wwvfc6y5iw79hppb4qexy0uldw9er8ssk4qhx5uf30us9vpovdw1uokcuom7cw3noiuhmsm1phebzum8v5pj9dzawkenr9qj0rp48kzojqszzurzz3nn2d8z2q4z1dsnamch8f9csuy0uakurvqwzgzhrdtsm0zeikquueky2hk50ztx0j6ygixvl39pvckohvcb531w37rv4obt6jjf78bv6vyhar7ie4cgbjiu3vleaztvk63r0290e8unb8zlud6vvy93s2th3np6w75iuzzi2ur4xf8au2z00kv72yyzhscybtg61z308tg7f5cvgovje3gvfc517pk4e1jl20dh0jifpdxmn1xh7vfruewwkxheukus3djsk3x5jbwpp7adcb1nlrh5uv95dn8sk2zq6tqlfv60e3du043aff',
                fileSchema: '9lcn5nzwlelflsf21cmenjfhfrq9v4sy428wl10priaijliojhzcpxnkraokibk07uzv12i488cn9hbyr1npgtnkhl73i0e97sk0fbl202sid0jsswjcwo5dwjxmt1d656qqisfxk5ujd3n3punplj0pt7jxn6fydb7oo9u2wtn0wg1qxty06wf00ng7nchjyy2qdojsaozdfgzq03v7evseaiamjacyerk8ra0bnmd43l7vfg6y3ny7fo4utse1eh1hgprafq90yllz3e3q305cn30ui5yg4gcm3dyx311z5j6ugceozig8j5fskkvv1s73sunwaz8x9o9d0jfv9sugeyextvk5bgp8c0f3a5lh2ijstfh82n6xhzk3gf7t11m1gra6k3tqc523obksovc0ansfrjnz608lszq9i85sezo4z2jolcg6gxjh1ge15bubqybvb1v9d0ms5fa48plch8i2g9qitu5jt4jukeir6ua58gh57sunc16ol7ap4euguybn2m8eisnolhr231jyarfi03fycsrvyfubbhfqct9c1c08yhrmrhcp74uuhj3yk4v4wz6yspb3yud1ff59klead8rwqzyb4yeo0xzwqryk8hb41grucfc9y1rxifne78h4xi1i56cfn9cw7q5z0ks6ptl7aa1rupwl6kzhwwk1hav1alrbilsxwq38nxnp58gsl331zwy5cabmwxfo3f6nay8es2tdogd4jpr0temjpy59helnnpc0mqkodtadqqo6y1dv71rqjdsfiyca1aasc74y1fpwzmqy8e4evhlsghspjwuv29d49u65ycixufe68qa97egqzfpwyvc4h78d05u2m6vis0eoas6b2mrzhrohhpk2k8fac3qputaa7xxsehswhblhdjf1s7al96itsbhe78kbba9wpq3zpgt367ji1zsujkkq84h7fashjzgqou3674b8dnxdvl33hpapci9dy38q7anhvb0wg69gd3v69dsblp0kob6i',
                proxyHost: 'ni13329rcoytvbqbz5jfse98mj906t913q7u3oihegkgxxlobezu0qh2bdwb',
                proxyPort: 6123910676,
                destination: '8v1a56znsyd55knf6ddkv8qqsy776r32s04ajun8yavl19ugt7kue14tt7cpvmh47ctjfbesdouphpfg1hsccomrv5xxtgyutxwb03vmwohz2pqfew5tnrc7sdijthcevsmrnlu18kom7wcx5kzc3xhxfskho6ru',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'few1vd76xku8ny8815e5krkbkwuvjidz16hlxkvx5zzz7a76egnms9w7w6oiyafqgeud07wsi51hfslt7358jj2ytiyvwwgkap3u8ka43krqqtxwy8vyec62d60jzeghv2h6n94dujr1mtrwm3bmaf4tbldqbkvg',
                responsibleUserAccountName: '7h9ljcok07olu3ikegrm',
                lastChangeUserAccount: 'sfgpp8t6r1fj5vq94vgv',
                lastChangedAt: '2020-08-05 05:19:06',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '45qbfhjuxuj8oxz91yrm80lfqi6jdqfjmm0xho5c',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'xozqji6zbnc68c34slv51q9s3yapkculkwcj5gvz3e6p4rf5sa',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'imn2unw3g0p0qydoibt5',
                party: 'atqygxbc9ln81pymm57bgikc5xg8w0340giixvub6s3ilshb91d9lvv6qc8ct7pfb62ixspik0ergamlzzoasom023mhzb50worolbbrgwfus9v6gtvn6lwu1kgqbt27kzv14prjai43013ou6s0sjj27gs2uskz',
                component: 'goher04grh59tkus8c12wvlhmni4ljp0ogjo3fxs5epi5r6kqzv9o5bvy3vman18m6nbyw0oa5sw3gw5ywzxzoeiizjyq61hje31ur51eauk02xnj47ggek0x409q276zvobuufvkek6exckok8izj21zodqlt29',
                name: '25u2f0649m29y4wvmyamf0x3gl9d747mbhi6kezzn6wz66gf9ojx6r0hi15emgdzyjv6vkmr335yj8eeiwxemoz2q9gxt0c2gzrt2yfetshqqmbop4t1wiz3ej9e1o6pk3sowl3kgu4chir91e1r1qr9ei5vlz5j',
                flowHash: 'bobd5p2s7w5gl2fxokignzrqzdineht7mdzwc5te',
                flowParty: 'mb3ldpzvf9f69t44mm5dx3qeik853xa0fk2gm2f6uwci2b58txirf11vfp89e8j23ma2a6o8yz391nr96litdh5mv9iosgsajy8zifdmh0xhxltxtokkorkv310gq1grx5jkz5fzmeupybuitzbbdecwuznmbdg6',
                flowComponent: '84g2v418p8p2xfe61ttt36a17h9vxjr6eslgeidwk3zcraxt70mp7zq88jrl68tn7nkofcuy1ut5hn33ml1hmiur6ivr7kvs16ihsp65s0zk01g30rpmi51ws0ddcjo3abq1vqycxx6oeitg7d6myidwrgx68tus',
                flowInterfaceName: 'n6p9d1tla1p5hn64npfzr8zgt7guc1tblruiho3d6y5siug15q1a9cofsx0zzlx0m36ews9mezsga45zibok2h8vyeng3f1fg3tqiw6tk2itjzzj693t0qmy49ayvel4nab0x02avfmlptx1r2mkbf6cm3g4qwl0',
                
                version: 'xsuvops2rnak3skt478m',
                adapterType: '1o8pqkuwli6r7w3umz57uogu4s79vxz4mce1003eaafk191mojj2kp79q43u',
                direction: 'SENDER',
                transportProtocol: 'r5g6u97v2r5zh0726jpicpcow063r57qff96vdhad0bji2mxw3pfm81rk7g1',
                messageProtocol: 'dy2fp0znmvf8eyrwrj30qvir9l12e3bp0p4xlbz5qowozt70n0a552d2ol7c',
                adapterEngineName: '03vfc11zsvesm7x0vg43l6zzy15y834024w7ruzhq6pwhoyj7bda79kmbvwdv5bf0zzjlrk3brbzbrfr5eib4c5qkbnuiveyt3rmdgbqs4vjxt8rxs152jjdeow6xlafp7i82br1m56zaf6sxot5bwv4jnc0gu92',
                url: 'cs84vi84rxxcn97vfnak9fql8wkxutdqdgitqjducj491c8lj18xbzdxrb5e2dslf93t87h98ktewhplemk2ifq9lsk7v1f29ycsunww6sl7m9lunt87xy1372mv9mekmodkry5c8hqz95t1l535olzxpz411px7ery8hmya14e6c0pabkvfrkv815dbghpmsq1fmq4uctvpumr4ro6yd82hb80p0r95jo01mxj15wqiiyylmfxlidz47qruzm7ivtepb0goi3g59jqi31cskar5ea5j704pdvv5dkp6c3ehm3pdflocbymlfqqrjqhq',
                username: 'a2k6ap2sf2i4bid6zmr60lostvzj5zshy8y1hgyie0lvolc4sbumcq90ugec',
                remoteHost: 'qry0npu1teyd4v33qa2pxz3qy805lfiliuq7pbh6pjm46sn6stnu0nthye20garbqkeen9xe9l2p8g6xz0lkbq1lu5azz4t7y39mmn7hbjhihux6xtlkkstaxwdvi8qhqtpqaxlde4cqgvrw5475cy2qmup6yr2x',
                remotePort: 3314410272,
                directory: 'e85u7wk5ekjzbb7uwi2tbhdq43xii797l5htkk4hxmhz8v5lnxstxkzbl03qbw4s02wmu6tydb1g5cbj35udhc74qy2y43v77amhej3ctmyr7simb4kbs2yi0mpxfnaslszt58jimfbixdlcxzzuqegzxdw9ahni5s1t8r7122owdnjg4kgv9ayfzwef46eufosmsd5714iumlcy154zo5zfqbjy4qzr4nysehopmu2qv1qdtv5vjnopolck0psaxtzzzjtbbos3n8scj41nhdcw2eh4b6ve929h7xl3lwuhfudkxai60vnkabj68sbqx0sv99z053sgnzlioqfcd36p8c6omrzml0caenak88zdamlrxn9p4s4c0n2ewlbs6xmwuk4zz4tucweel4dv1muygzxs73xo3uu6qxgeyc55r9egn72caf56zztz71vzvxc1q1pm8gfvpat7trmcfypkdt1yypoxn1lnrd5nke7apoib3pjar63k8sya9ews327ifjujf2gt0czoq0y6ywyumygtqlhej83027fd81yyaa2k8vqmne6p3jczp1mchooerrydlh5b5vk92esjh48u6itrp5zmtoeok5zhkksr3xqb6rjjql3wmgmkq40cwnbiweb8knitu8l2si1xggssxzuh2qs4w4mx9jcew73t9p6pu3grzisopg52n9w1lqytvk8wvetlqui16e77k3b0gh87ndnzwrd4a5wq69ke90ld8twypmb8lg2nij6j5tctyhhp468r88x7d8fmzm4cp45cz5jxug75glqos7onmvop0018ente7u3w40838mewngps4uwdsoog6x6g0za0j5mz78ykioumzew7utzah8dirvai7gp2lf61ltzq57hkmuqvuk1617gur29xpk367exo87b5pqkg41eqjjdr1wrakjd0ll7rvodexrfmhigk07yl1e4yz1mbmzma4ny4sp9l1ygc3l9hamyz8y9efxx951z8f64yrdhl8cwj',
                fileSchema: 'd2mdcibqi9n19p4ymaw9u2t7o5jrcrnm04s0dgs8pogd1eutsd7fnd64xbybdazdl8mi846cv4hnpcvmfp900kumyhyp3wznhuwbw6bo5hu00gik8gdlunsobqkggkikoqh6jz2kore3drzdbwx8fkqdv2g84y5y9f58gd4ti0vq90indip1pacs8p5vq44ipuanzwwrqak9zzab9stbn0me0s1ie2a1wezn0ay9ltlu3jkdkwtv3pvmfcpg5q9amk0plcgq0f3dcdinrdize1kmt84anw9w7czx7zq6hqqolg07kgrq5u8bsulwz0sib3ldbom020eacue6utjiiypum4rb4t5s07i6szkxbrm0h6kfy0nozvj58sdimaf304ed79xqsoa5ij15eq18opcdagg6rutvtl91nzfl2qwnxvd7w8op7pqyw6yiusiet59qf32konnxwdz2gdhb84rfsyvaxwpk2jdpihyq07ymi4uzyubk7v2m0wp6iasz52la2v6woj8r25kxpzuz2gwjy6rcxj6a0eawnq3vbsfnbynwp7rlm1ca2a1a4etearkj0jx5q8155wmfezjn4xumco57p9cdm4waht095xyjg6gqig5qajfj9efoc8qv30qombnmpdynj8ann9ivreoooyxet43d7jxtoxwidazli9dt6291ox32hmtgn5gwhl6c2segpxv5zmqz9lbnpclnp9bsom43zpb8om5nuwoin0hvmn5vnaizuhtqkh0rwsd19r7yloa3l2pmyoeouivi43yvcfcqlh05ko2giumlde3232pjkvjxccn6zgbifp6ek8ic871mhxs5o3mqkqas5u8my28qih7mrr71hpmm61b6iixzqoh31i9xlszh5skroadnrqo354bromlpz9dnmbo8u0ukctdczbxknvle0ktvg32n2kwjp7y3h10eq7831bgont8dfc7biqkno5buoqkn5tbg94dcjfssah01plhkbuc96fp5xa9vnxzi',
                proxyHost: 'hkwnq4lcaicqkr70fobubopaeb84nmhl96vjlaxep2j6gh3z7ovlrhi4ra49',
                proxyPort: 7613737450,
                destination: 'q9dmtcpq7kz0vj9yw4i0ovownx1z4bhbll3j520xsvvgifs65414sgpzgnkmou8bopzne40wtvgx6pzf52dyraavwyhukloju0x7p6oj5nttx6pifbts96xn08qwjpkcsyy7b334g1npccfkkw172cdwfleox9pg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r0e111032mhp8ubdu0xwg0fiycey3n9px3pd9i7o7805bib9lggxs005y48uw2hm2ip24hgwyqiy5gunbosvoewj02rwm1ouqyrflrzfmb8g3xtphms3ve4bq9e6dkf1v8p4qxr8ggu0uvioyywfrwb2on5jhpry',
                responsibleUserAccountName: '3jun2j7zqf9gf76n4qeh',
                lastChangeUserAccount: 'pato7151bim99q4la0z3',
                lastChangedAt: '2020-08-04 09:05:23',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'z3a5631tnr8hfadgxe1dw0sr0znr0vtiabbhyjof',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '5jjdulxwsp2xqdgolmbbvmv2uu7jmg1dluwh3b5lunmauvkvht',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'e4vxygqo3bc4bu9rsgje',
                party: 'd9cst9r9chzdd8akgb9ui7njst97pcqaa6b9i92oicqicz4wrrlo46mbjeuqs09upw7bh577r2czntwmirtypvgeln9vqakpcnawpx3e7js5v74a4h070h7zubh7bj4onqp20f8zpyva7bwh91wox5kmig84dxlv',
                component: 'jbp33runej3x5mfixhdk65wkwc6wch4vm44a90b6i1dd1s3ntfyvgernts3d7ogt4cell9hn43mmdhbykcj46uwuei63anraeooto4m1ljo76r58skei3fgea957bl25dxo3gzxpw87t52tz8h5ok4gmoibltq0j',
                name: '6l6n4y5or6xi27c0h9c9edho6kg5ng92rhumu80opy7ufzbjnda8lrzgeixkabisvra5itmks2n7frjaaai8clqp5f8c3ok68j87g6w67kfeh6x8snschfd2gg4vjoyecmisigmq508nxf132qnmpouxxibpiple',
                flowHash: 't7j5slwemv6y4u86k4rv8ig1wr217d5h8fwh4xlz',
                flowParty: 'ue7pe4vcqdhwd2cbmc0okvq5nvlwct9hg9t87e1er97vl8iwlit2mvmq4jyqok190q3usvw13lziobn4n7p29niisju5ntaagkaa6mo6t4qf9qdex1yfhc2dfrgq7g3upwp8hisvtv8oiggijtf91i7tck2a6fgl',
                flowComponent: 'rquypn84usqfsusjji7uxxh0a0lxdeme0i9tu13x9ntjrd8c8c9wi5agikqnq6rwrs4ue0xglfgg11jg8k6vhsottpoyhpwyce0bpzfyznlzstf7x5gdanna0cyxbkyhdo3cvayp2z1r1l5uvc9xz5jgh7xae5g5',
                flowInterfaceName: 'cfluuoxerysq9fzjw7n8ilhemm7nf2yyd100q194l9mti02sx55agtp8l8yqn40g3ej6u93t5jmmzy4csrl9qun2ugswnw0zii7gvyd6a2ogpw0ccp891w20iuit5mdnt0cz3qrnkwizgkc9pb9ca9381ryb6ix8',
                flowInterfaceNamespace: '0tnstroci0w338mpleylbs0glk80fn393ses13kpkan1r6etrolgiv4fhvhpjxj1dfowytujd3hemn66xth64w7abpilv2ljy7tx27torgobn4isiho2oyz28j1wi691dflynmejr1kxtfne5q1qq60yty6nnqn1',
                version: null,
                adapterType: '81wpnm2eh4vk0onyqaoanv4bnva1slylqn962hwb47pkj1rpimddwph6j3ow',
                direction: 'SENDER',
                transportProtocol: 'g9gp65qi8u2ttpahpia9ym4ubsjop5329hhgolr51o44gy4zga2745ebtof4',
                messageProtocol: 'stk8dk4oec2kqyv4lvu2atnsgbd1gke1cku1a47hq1vyz7ocztzr18okt5ut',
                adapterEngineName: 'rd1v5q0c6k5jq5ij6d31lzslu1h4exykc7suwvjniitq1ku5ja5vzq170kuep1ybjq0jcxxhnp02etrib295kxqp7ccm7sp0nkytfbbheuv8x9vj7j9zhbxkgfnrmn6r5eyaj4vojkgewvnmm5hhy0or2l0w6tqo',
                url: 'up4ltsdmcx43imtm37emc0x9jkl7xaxf3vecyzscywdepev05139yqweeyaho1d4greumj0o45ndfrreo291iqye5y8innvz0vbgg2mzi3hsu2rbe5ekoo0cqfwkistdsidkbs469fnmo30ljqkfsni02869toszpet0m6px6iuzllbuo634298s842g64c81ht74lqzzi3yz6hmiy3hfu1hyo65hprf5iolleg3i2070fjszr3u1t5oc66ngf7z4buf2aoh5849b87y8ibm7t1bp9g72lxr4orcyyu36arsyg5sohl1r8lqgbf5l58s',
                username: 'gomly6zxb3qxz3c5fzq3ns4imkt0re4itnykef6r09rml42c2bljqbrdgdzv',
                remoteHost: 'q1n5xrzoq2g0xq9m4ahlcdpbaabtat15ugv8rvsr8ql78irkftw40lyfe49vhebntt4fhtj4lqd2n1j1dxmdo3x3kfryn88z0v4ilqylnrmtmwqvt9wmwcqnx1lr6h0yxfgyghqu3pzjb4lpqucsdgoikx158q0w',
                remotePort: 6402836585,
                directory: 'jblm6i24an1eii31oxyore1trq5gwj4qyxkqao3375x9msqac26l0rf2i2vod3tn8elq0n7lovvfeky7yjpt7u4qbh91t2bimm4ofxkh4iksti4rqobi0b88a0okyejgi7osdkbba3dqeslugfriw8l4f1cogg273tywzo61c6msp8lddul0jubr75t4wffx96s6x8fdzq4b07uvkf1m0s6l4ru6kal59boy8adqaa70hok6zjz7px4lc3nqwgg9an63mzg0v922g4t1aoh6cjbwa5cefxjybjwf5ljly9nuf4vklvwh6m1h3j1su8yrhs8cmu1xm8rvejx7ghotlrrvef3m8ybsvzisvuhue0zp2i9qmthunnsmo9ygfha9fffbf6vhfjzw5oq805lq10y8comk194go95dvotb4bp1r148ptls54de0qhstzwcg9v76pvf1gl95yenfinq6d36qm22ubsf10vn23wilsool3hgrjgc9qpz3bre282pyeiiv97bl7qh6syzobjljheoef7syqcnplo76ixb6zd7alic0mgk6r5tdfhy8kjoy6ul60m83h030iewy07chea9b6i351yoinua7r90nu1gn6j6y81qabclio7d75cvd5kr96mnb17hiqrsum2hcnljesjm0s6jsxr1gq4uxucjhei2f04lnwuvdjfraccr0513046u9wdkty8m05onqeyrmk277k8ggbe593vrdgiz03dn7h659xybot0a6yhwfu0j2i6wg6hup38uyitk3oln162voc9dyi4s1cy8g2l4ge8wbz7j5xoq9xvf1ijxa81hnynzk0wz2co9z8vjdrioge4g7k28yhgdk8ohtkeshiogqw3ifnswjwjdwvtv26knuatqhirtsn0ukftl5s5dwgzn2do9tg305raozggu08hpxxh2kv6gqvqhi94baztuww8mvouo77updfhh3oki95xtoi0ex5pi1j9qova7g5m6594x3hgfwtkuo5ue',
                fileSchema: '75beqoqx94aw3t30ihssuyujj77vlr7m7zrv4kwfmz84gqoksxijadeiko027t5cr90jc4vywsvbkc8y8bigzkljv0vraf9jkd858n6kpvuh0xgzuta5a25rv7kadhqwqu684xcaxewm5esrzhus6bnaw9udef0wa2bd0taijximtk0ll12rda253x7mytmstxr7oc7617sbsrnm4d4tfhtumceybt9l77ecij511f1u8c4scxmqjqv33z0f0d0fuhxnmuots80zfropf49y4v8n0y4zqcx0xwdev45ky8fk9irg3jsn5jqoaaa7hf11yxi85pezhcgoivj9yyfny58zuz9h0nzfbkmffww1nqllqbf0etx9krftok0vc4y2g4r11pwf562hmilv6hzvm2pt4c0pe6czkkrphq1bk8rr9r4fv92bo37s62i7i44dptq2h0hk6alzs0z56dlms0e7wi6mns7ufw7vjli1kb3li9csakebs67joruytq4f2wk0bdeb02l5r55gebi815jutbmc0qxik7j54f6a1j2odpyvn4pmlxrp0e5htl6p6gfahfcwjo190r33aun4hk81085s8jtgmdxguzc38mz6bqudnpnriebb6pckd5gctkikh25z555sbi7uh2rj74kv7k6o7hsrlzzypa71duqj82k4hu0ajc19ptkicve742cpr7kgsczyi0kl798r5hjkkgyq008bvzjvmct6u50zi6mr1a1cj0gxpw2httgovqm834t1r1zupenqnmop6gnhe2x16cpszb4hchx9i5pno1a1nmxvrilmyd0cr0rl9vrjcut9xky79p4kw87auml1srev7x1dfnu3my4ueeluw0lxis3kg00gtky21vxuxvfx5pzaphbhqkuvzi34v17xjaf7e8l4m0tv71m5xknguss2np6fg802y5hribxp5t5bn27fqaew6smtr8alqn92gct4i83jdgszfipkvjcmtlfn9f0k12ljm7b4yiui',
                proxyHost: 'rgvk2z5vlxb7ijkrh3md0ww581wkrqc44kjou9j4buevdmlyjwn0idhd9l0w',
                proxyPort: 4045257403,
                destination: 'b6u9a5jffjie20zcdbvkkf0xe4pzqpvbm3pykz8vnffv8jpstt3ap8fqj53lnjyifchqpcmj2outnqyqx9iq1xcm7v92valzmvxb5alyueld9det3o3zawjtqsepkujl3tj95eukk0e7lgkgi07bzvrxb7rrl9rl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's1om6oe28y99fhfs3pujycdds7y6b6bnnh0xo6kt53v0b2il7khx62zjuuuwq0czi8yieaqipm4mlrpwgxgp06mcuayvu1ks1xsc0dn6ves826h07igrqdppl2qnwit7tlnn4cx790a9l5r3ppqsu81nddauizje',
                responsibleUserAccountName: 'yg3m18kc9ob7ywbl2fgp',
                lastChangeUserAccount: 'fuxlt4pxgbvrbosqft2a',
                lastChangedAt: '2020-08-05 06:45:41',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'l0mh15pejycsdh9yvl8hlh8rdy7dwk2huxfz2qoj',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'puufqadw07k3l7tf6fmiyii87jv4mr8c2lea5xv0osa2ytmr56',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ztesdxtv0rxligzjv70r',
                party: '60sg34480ybtm7t6b7958iu106qi11r8db2fx4u6fxb9qc0352ve9vccce1culp7gyo9p9lxux3hs4cgkhe38ezgcchkvc5czvry9sk7998azqgny9ej7qaf5linxla0f14260sq3kftshx53hdw9nncvnaziubv',
                component: '6konum3us9ghylllcdeso66z5bjxskva7ksonsvsf2p4rz52a0aphyqudx91q6mebkz0broxo4ldywihly4wdr97qsxblmvlxrpf5sbhi7aog581sq8iw708lme36uoehqjrd6o3ibt0pjpw9mfhlef7jcdwsfgv',
                name: '4fvsnf72pgg21l83mznnrgo6p56q5eh3az4842yrvivvy96dbwn603ygzn88zovlvcict76uqzi42p05eq29hifid1okgbwzmqe8hhivg51fihgxfkurgtps2pmynrlfv3bt2ymaoi5kash6yr2gk4npnqym68wr',
                flowHash: 'n3dxnpq10fbf79wzslyu63hkvrkzrg16q2zy9luq',
                flowParty: 'u8e62hsarirf3w0ixj4qg9qhtxrzmzd175a6c35qfncv786fvv9deklds6ns2hltdv21djy1a0tz2u7edmuptf3i9t7s54zonmh8j67alp398cvqko6wnahpe1kovatvodhuhls4lp3emu9nsns96jqyfa10asef',
                flowComponent: 'ejl4xl3h5rx1c2sa03xapofnu5cqz8o0ys13x4oyvmzmy4zz8kjm73ozk2vaz2z927zqigmzmyzpyyipnd0hulo4mr6tytzvpo3pfap1vyudy28nle6rdnfoid2hkgg8qjjpuvq25b9eh5x81i8c88w25ozgeyel',
                flowInterfaceName: 's3ysg2ldofffyc7n3ubejfajfa5ycw3niqu5xed817digj88w5zwvdexqsp19st03msbo39gqmglm016kvcb310d7etu2cpkrmd79wt8j8562kgcrhatma503gd05ckt3qfdq65yhz9hj7ypwfjc29ocrqn6poz5',
                flowInterfaceNamespace: 'x6dabiixpjcx6o6u9nj8wgltj9y4ppasye94ywhgicvwojq0449u76edhkfgxrnlrb86ncc9avksdvxlew6a8mmlh66kfap4uesv1uiqhxyq2k40b0qywahqsr08n863do0f8uhxd4ac74v15dkyzbm6o8cl76tx',
                
                adapterType: 'frfdf0551n7p5cke3nt9xc36ezvoa6lrpuxjxalqzmk8ppcixcb5rb729g5l',
                direction: 'SENDER',
                transportProtocol: 'lag48ja7gmf2y72itq6cku53y59k0lmfn0ux1fev7dyhw6yzhmctgxs30cow',
                messageProtocol: 'uv7lnt07qj3fpt4l5b38swi88arskislgr37tm4mi32qf25svvsgbbftsjse',
                adapterEngineName: 't8z5592exkbh6ti648xsviydhs2f4mvgx8975f3mwmfcidezu86c68tsnn21k8y992ql1jdmouscjypl068pwujfp8g5f1tp2s160bfle7p9hnx5kaan3roezvb3zierr8wtduiuktste3bg67isi03b169u257k',
                url: '843f4kphx2euerbgkri9yxdp9gpbrqr6kmohei8i1qxvntw7ew3u7q4txqxw7inovipsqq98txahnuxmlloch2kg39ick3rczlmendxtmv6t0uhfetp3a2pxa5js4of1mqmd2m3woqxgnk3lvsajh8tfpukl6zf77g3ipg5ki8ycs88mm3xbkjim4s8qsx1z3tem1tr7b76b1894fvzhfp8lf1iucxgfjj1hu3e6iey01zpgppk0timhs987p5nsdo23k25b91mshkk7rfmt3ugf6dc8w6cjaxb4yv5rdbkkxfvu35a1vgcb9whumpm4',
                username: 'bpadga47rjdsf2g6mu88kekgm5lt0gfr3me5wol1ygxw011lcb134iq6irm5',
                remoteHost: '6nopu656lf0anvc402qhzbl5fvv5i50wwt34o3c4y4dquefqupjg7iuuhoxqdw7mrfeewd6ctk2rdvdkmbhlgo5aln0hgovvpc69jf7b8jt49d6vdge4122pcqditdjska5ltokceo23ja85d4ovw4ghntzt59sx',
                remotePort: 1066283224,
                directory: 'f6cp17sjrxhiwtfvvqv636uocido3sxhmcluhg3zypegi8pmh2scjxv6mmq7y77wqsqd5tvh2mrybn4v5y1y670s770hf171aiy0nzmbjsemsr3huhfu0odp1onjh0n78d39zzih5kkop7qp8fjyakncnhk6wfvmvy2rzf5cul4euyyg3k8hewoud7pwoopp5dc8sx5uiiop56vivv8plb4litga99v6b571lptl13ai8it4mi2344bi284xlvohiopgzrpwc81aps1t3pvxs1ct4sz7248orm04m0sk3jcas92dwvpkcpqrybqfckr74rclgqlo94pcige2yl5njc01uhxqkj0ad432m2mdxpzcylbvfqyiy1xapk961bn0b04f5tlvo4uxybgca3pmpktmpxoi7woh6wdb794o47clh2r1gx6amn3dpg1949vxjrqt0cqi3xp9ag3kukv91wanjakjcm3ezn51qma5ao31w41mcr9ajf54mhrcmohk1svurlh85iaeny20x0jm36jok2qvkvajzn8pzdwn7ltxanueqoz0jz583z30q8sq7arzxpcl4767pv7xfk0jgkz3cml4lmejig6ec75mwqk16sz7rih21ofaolu3tme0kzmtm05y1y3zqreo2elusjwu3zjb6m4iagmjzjid80zl5zlspjc84j3yqfj030t4poq30l5fn0921s3s09a6w4ubebqbsr5m8xuydm5u1w0wse3hzhrulizsdsc86sb23iehizn2qr2uhqyo12py1zttgoqsumhzij6d9bdh6efnghkw9fbvdmbmd0fiodn6gzlf9o4iez5lrpxbus3w2eb29ltoab5n13qwg25fq30rfwuoa1ulzet7fh0x6t1me4crpdxwzr4biyng801u6zimvgixhs3t4ionuy188dkon2a29v32aqoiyvilcluqsnq4ge1dqht5ha6z27xibgiurvm5381vgroozfgfi978apv32p7rav3bbwg32b3l',
                fileSchema: 'qbicj3w3jj6j1wsjlthwu8keierjagmb2z0ijga5ybyk5uoqcl07ctmnjw5a7syypwosa0exlnjz6clzk8j6c8b4ucsmvsc57iztmx8gbgaezg0mb15lrzoek5f4eeegh9z3umte3xvazmdfvr6ye0wzh1bnzrfh2a3ynz235r4ek5mqetn7gkff0tkspg3mcyntw3tc88fad6ev6c5a5iedaxbuqhhljqxru67ovf7bbhtd2hagftiqyrhyncx0xfye46njk8ari6cnjvjrfbv0cyq9akbzotxaoufw3847al67nkgfbbguvz3ypgf35mtx62wtdvnau3tgxcjsuyzhy50t0yva61e2slvw4ymdwv814upaya250krg0vgbxkd2cxxqp6zzkxjevka74iou9lqxlb3pdnwnhsb19otnf7d7ryhiov5y2nppc4l4ujkvc71lndy5gkmyut68x0ytguo5uf99o2gozc6qzbf456m54mzb43oxp5ioxvpx4czesnawe3z5bwsbmwabmd3b5abdb6w1ks7bs3ds2hd4o668cvvyai7ty1gvue1do9f8rzlm5jrgyy2skr6i1vdaqvawsyjk65lyno9mhjxhoy9xbcgm90drg4jiagtye3j21zf1ywe6ovv7f26ur36d3asndzrr41kose8aqos1ddcz61pg119je9n42bql8bxgp65lfcqmjfh286chsezlqll87dzgqnwod7ib0spaky97hfdkwpsgjv0pblf5nuhsf35bq2e1rcvbhjfz8wdt8k6hzlzqdquicj6i2485y2vx9wowlzy4fwy975pzb1s3gck1bpfgq75ju93gbylulu7c7vpa1ci4y7dzvzl55ha0w4nk3w52dcfv2bokebr3v8p4divlqat9mb3v6qxbzxihd8i13aimfbfc5p76c3yonozxnohy0tofq7zwgiav63861ljqbvqqf7xkyzjm6ddebgvpm0hcxmz310krq2hf0bz56n9uznvdvjmf',
                proxyHost: 'tz51czvq8mkgm0k5ygjahqgqfppt0v12v9gou1y7wa6po7bywuifhvg5u9ws',
                proxyPort: 8814814368,
                destination: 'xn4s34tamyy5tssbr1aee1n3jzkw268rh3kgkmn72hg8fsf5uw7689mgij85ywtf00oe7rgrx5br3epjxkvqi5xq07jzxm94tbsn80n686dviif1yxk426b4182p8nvw5e2h81rot3t1fjhyb3zdzeuwyuu6bxif',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'glmzkcq511e97mecotngp1g02w5p7lqfy20e0x5bdgoy5f7xxb0dvtiwypq14v6imtfc137noxfrcha3gn0vgh2z4oj13p1qkpr0aqlv7v9ci5r8tiwjr89cr4f0y2c4mk1f0ho4pqz73ulxw4hfzakbdkjenhdu',
                responsibleUserAccountName: 'gdk9il3d7ngkr5p3aeer',
                lastChangeUserAccount: 'gko7vdfj7ar1uhazqxw8',
                lastChangedAt: '2020-08-04 21:47:50',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'tu7ynnyvxmfhiea2qnpbadsze9apnfqddcvtkihr',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ihxumvqgc6437oetvlz6zqp96vqdi8a2ohbkoj6vg3llpy0ex1',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'snb5wpw7ny6pvluru4s1',
                party: 'xkxxif1eqepqch0myrlnj3bhuo227y4zg0nsv0s80n3svln3lwg2d7lvcsdrpgrfca1dd9ia0ixjadpndt0p1m57yavqgkedr73ldvcieow6gegpxqzslqpi9ruj0hr7sbzanoswajoh7801uel7vncaqotyg2q7',
                component: '8x39sg67ywbysap4gmffxsfvhn9x1yxdrql63cxzggowikt079psck4sflmq9vrsy96lkx4oj2r929c6w9z6t4sdys3n5g0d4n54eu56hiksa8bmpkvu87cfgoa4huk5p851s5d4x4jwuoi3vpizc1ci0w11nj3k',
                name: '67gio49swjyrm8eauh0rd2vo5823lgm739dcwfwhkd2k99wqp4v2lnlt1db5z1kz903ziiha4nvs3n269sph9rsnqfp8eds3ndc0w1dzem4il4817o8fwto7wnxm3agkzpu2518zb0c1hz5cnx94i8s0y7pte46v',
                flowHash: '0g78d2c5ow0xqullwca2ml7rj9n00q564zaqeiza',
                flowParty: 'tphn6csmcm1evhw6kxlowd44dh0pfed62sobdzt16usbmta8d06gklz2knt3pitm3xaypqevaeg51nd82nk1bucj5nmoszd5karys0t7nkbtnlwo4ifbu1wc6xpzwfbopl3bwuiat5qqin3d9znnrnth6liar08m',
                flowComponent: 'm5nebrqw8rk30yhdu4qpkfl5wemhaxdwtqksfkt3liovtli4je96npmbhl5pg4kbwx4bag50w4yfpx0areaikzxu0s170nlxmx78e2yysdt3gvmbtcqghyu0o9uarp8q7ydd5c18x9g7swcmjpzmmi588mdy07aj',
                flowInterfaceName: '6sm17arvfu4pwokaj67hsngk01wgi4gfwink9huuji1vj0t70dzv8gfaq379nuor0rqx0ce37pj9iue3iwif1rr7dukt7t8rq20oq6ji7ge35p6wpy3n36q2h6hf4fsc1ft784mrgdmkg1wzskxn9l02224qjb73',
                flowInterfaceNamespace: '2pdyzqa59g0ijhxeefl8y4feylnnlr6t6pyriv95wr57ewr9bjrab8mygy9ofb78kd5h1ez9m113jrjlha2g1vhgi33svlck4n3gcwwgnwkc9x6gp86q8adpoiulywvirzo3un5l1o5rdbm8sf0e9bfctcqswy9p',
                version: 'sdawk4nz9i60of5wps7m',
                adapterType: 'pj6b9pvmnlimfvy8ttokivdij41blw038zq9phhh98mphpmpzd7ovohy8vig',
                direction: null,
                transportProtocol: 'bao7ju26g9jucyp1fzn2rd8qy4nvi0rlx0tr8am9i3dt313b4fi4n827hvj2',
                messageProtocol: 'qdxrl22lzwxihm0rfghxiwbik82puo6223kx8upjaa2h36dgzbpfzpfv4bqx',
                adapterEngineName: 'g2crbkvo7hgu05mmhs3xt5pbecfkgfkv9yh0su1lxvvki591ebg0wnt5rmlktilg18ezf0fota9hfvyk1ibi1uorf7tx1smmajykekbq66uv8lyclt58aql43pajlbd3grmo83cur8mkmvinlg3wac0ub72rtznd',
                url: 'sckfpjv3lcozhu81y9v1zvgtqrc8bjmr9nigbs3n3veug9lzdac4zxj18f2n7jb4y2os5ozgswpqweu23mx36wauhjmj8jqhfr5ph9trascjwzdcea4qr0yfxd2dvq9mshs3j7xos3ywebx3pf7v1urairk32xr75488v3wgwvlwzdmwf2bffav9khoyojhv2wrtvdrh7930atut34ws7kz0mxnvg5jj4ggvsoar7gdqac0tq2ppag51aqd822wpjw2ytxzgu8nstzpnmd11xcclp394l66m5wa3nfb0p820l25glwlu5141v1or1ubj',
                username: '1163zgmvx44cymygnkk9ol9gti9enz932gek3zxcmv0fnqff90xq2wkv2ucy',
                remoteHost: '76ksp7qzzz5gbeonj630rbj05syttswklns0xhuk13ou6hvkr8drj4qrphg1gf65np9l0vqwzaocqneye74fcz7ln89q8s11r5idr8mb46mbwcovsmvtbginh3qtqvkxgdbetx6qx2elyi9xd645hhkofibspvb8',
                remotePort: 2670169165,
                directory: 'hy71py39pvk2rbvanchbkpnrhz0f8xwv96u9h4rdh63bng73p2nhn7x6gz9flvwxoae9h3i3bbwji3mdkt91f5bpln8nts9135yd10ttpelu039pcyylszirppufl8yp7jxv39s43j2ptv621r28qdd8is4nycaqmpciuwckcqul0b021lfi5menli60tao5bxsrhptqrh47vb5qw3903iu4q2xptd5n7bxxanmh1kpx1h1hoiu257dpnj4ulojewrovixmb7njxw6sm7u7mwpuj0odd56mnw90fq0basuyp74uo0dcqo0uxdfyd5zsi86i911ak0ueq5uxyb0furv9l5f9ipez24qubl8kqsy9a2kjqde7a2gve4lwkk3fcusf9fcjtqpdsr3q4troozin0aeju200kdnkuv9k73uvpx45bh3nza6ht588fq4wyt1etb9hc713o0ozb7kaxej0f2s7popfa5u7lywdb0o3bcxm4wkzd3yw04ev1b2o6ijkk1plk8mfkmapvo90m3hgeyjsxym9esw4vludmhxb5s2qseoxoay7fjh3o2dgqnysmrskavktxlxcdvx3t5gdfugovkh7zqfhx3aaqmwm00cfaqlhef1y3mbzxb82bi991z497xg1hm8wyid1r5lf1gmjsovyfjzywiyevcygjrfp0vds3azvgmc1iej2ic8xx2rbscjf1u6gsy1o1m47v9d7awlis8e9k321u966z3nbygl30feh12w82cz8ty293usny5ptwwbipst1aiiu1u9iq3hzj93ahx69h3gnbicielm4x2qni56u1uw8yqpjwbx5sm1tjnlnrt1h83kvmj000w0ypdkv8adkz2bbgtfjzzouuxrsl21o3wx3pgrhfhsanthj8l9d80tkzemeswmhkc77vteyxjush9vt8h6fhf0huzk90rksel97wunx1xdomf2gsy93rqueqmnhqlcrxegek642svaolp86bugsts21hdkdpa1ur628p',
                fileSchema: 'oh9si2cq2s9ggv5z7nb26vqd4m4dyiyaa0i0k9oe5wwtzzy54f04nwjmjyefam0jhqudqb81n43yckoaiu0s82oe9gbmg61s66ng1dgs3gkp2quyfao0zeibu8y8th46tfj8a1m6x09jdi6ngenz29x8u89sq6m24yovk94b0mfj4kump9r0p374d8656ak0r04snt55geqmr1txontbfj6af01ldtulu4tly710rgny35i0ei6sjt4s06f8qeybrgpfq2qoqj5mx812n4vhd1zmxdsztqay8azhcvxb0ifx3j60dgp5w1u0gxv6e0cwyey3wn54uutfzngixcgs9074ff6rszhjj7yl93v9hxq21gwu1p4mnyabtj252zxisahld2k4ejdg1r9bqwiwyiwpz3yf0y5i6if41085cuz0p0aia9vmctzffrc6jke2imznkhb85u4leri7m7g7xtmly3nmicd9sz45zocaghtmbejzm4j0537xfyygswf60oadj6usriz5g89bn1w42igfkc7z8udxsd5whqcbwuswrcwl8sdgapbm7gjx4o68z2o9u4luyb1z9dxscm7lo2mlejc344g53qg0kf6bzrmasb7b4smw9kx4akwjkmfe3bdaj686bk8ofzx20jzj92c0jpnbh231nuodudcodg71rmy86xv6jgi2ef98w13ogynrbkadagayfgql4kxpvhupxclywcink2lwx047zb8b8vobwvlg5fjet8v6189s7au0s9c8afuqx3zaczg9jk4icgu7xuiktg43crhszpnomg2dynt1tj5c80nsxfgcbja4ne3ewxv4giez86mnxtx35jtyqf0xt9tm2uody5hgyns41gep301ktxdljviemtdx59bnuy4v8dkmvxodiiy0i1mew8ykn60loxyc0jwatdjbefar78xm6ouzqbcnrevv0b626uu5md94yhurxp65a058i5o4p9cx0em9fbllaupsntnv15xnqps6yjeh',
                proxyHost: 'ofvh6xt39hdlsyoqo5v4xe2vtkwvdu3kcvejide2pw3xwkfxnxuun2zp1wnv',
                proxyPort: 1053698066,
                destination: '7o60fqxxqu2cldcujbnaz23jn71g5yzpcs7w3yj42m6xo43655ba9hyym7gehmfw2rypm2b2gkya066b9sviw3a3svzcn27t4qv4s670e5ydii3zseectgi1k7xxvzrothp8tmnc8i42oyngrm7ijkoszvydeiju',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1exln7og6ny7xnk4ass8pafiz2immq3h8rm39u3hewfxh08pmcwbk1zkvmlsy7fvt0hhmr6o3mzbr6yumf656dn2t7vf28e2uho9d2pg8ulznn0k0fulbgztklbn1dym2f6qitfirbgy11zvazwmqdjceq6k6l5w',
                responsibleUserAccountName: 'vvpamd64x2p0l6cgv658',
                lastChangeUserAccount: '8v2jgj2tthi6wwi2r25m',
                lastChangedAt: '2020-08-05 01:34:14',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'uxbl9bl4yfa35kxb0sx339nvkuarvenr0r957k30',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'e4x7l58nipa9op6cusxccuvh7sya3tbkqakgrmrutap81jyi7n',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'dsqpbuciq6wsntyiypqh',
                party: 'veie8vudwdaggzuqx2q8s93ckby2f31rz7w2fsga2ip3rjjsvg7yxty6qmk926g8dzex5bx96vb4ia11u9uoneadosa5ft5bi97y4xaszh94rirxp36cjgio6stubfpsqlys08nj2v6kkx3r647fjpzp6yznb6y0',
                component: 'lt1zdquwkdswfirhf0ygdage3isp3hhk8g4hvlzahg343zk141hh861xd92ka0h8gpsgckugq39zf1moqg47amvbpkd9ogyn7faolgsb3t414kppgat735o8y1j54e1wusor9vlyw0n61n365rv11f3gerqewmmr',
                name: 'quac8nqo6ml71ajqrx7sggukt095xal6s6sdip39pwkx3buq2j0mzrg9vki791ofcqok7r91xn5tis2pnmjtyvgt4udk611s4eb6a5aohcj08hlrx1rd0uvz457uf9bx2ixiv62vdt7ua90oetmrmqbfbekbs1jh',
                flowHash: 'wm1wl0uljux90hozkmj2jg7nlxwnreac7iv485ew',
                flowParty: '6gcoofy7qs5lwogexrk11bj1tqqtub0dtm3q09ejgqlddhoam6k8dxgq2moi7c4be8xkmxlgx8l9nxqf5ypn4srhfhvz1uw6b6oyv4rqamueleocobq4706lhxs5d5edvme1nkn2it4h4msshh48xagx4ea1w2j0',
                flowComponent: '3bqlzc1izuqd3lgrmu8tdrqj9dv5gbnsrz6pc805n1zcok75eh3bspm2e4o5utcy30cl8s87wlwj5mqgxce2buvjjk0z24x3jk8cdeerck0h62bh0cb3a3cfzkt2urt4oe2kmypfenmuxc4b5hs9rka5cbgyjwrj',
                flowInterfaceName: '3z32g71jc9kesbfyt5qyloxrcp3lnhpj1gm8hxpglyoz6xi3ifu0rxnuuzvwrf1p4j5521jt9ktn3jd7z2kmx3u4bznd93qy1lxxoaq7ba73s35ubaq920fv5ofv5xjhr7jhz6qsgrxss4nlu137kl7vpmrqy6jf',
                flowInterfaceNamespace: 'a1afa5k6jtbyql1cnv0uyw2ggyrvat1h2h3hncwmcsltff49naq5it9zt7b4cn1acjpfps94er9u0q62zcqp3k9tm95hpjwnof1l7jizzajrz3ds9qcxq3mqrfrtv9qdsaercqab8nr0t95vo2aho8j1c9v70cam',
                version: 'uilgbg9eztjdzte12bmc',
                adapterType: '9t6wejlpqhwanc1z5nyoycm967418k2un3wnn9aefi932ifaqzu9btqn9riq',
                
                transportProtocol: 'ubqzt1mhe6qocsqwtocy7k2oqjtajzwtsdjmquj5eox1tna80zk7yqcp8zp0',
                messageProtocol: 'cxvoiimsaikvh3hzvx61j4r7de3x9yjz02bc7wvrupd25otfyfif8dfa9ku7',
                adapterEngineName: 'g36e5530av7c2uq8vjyllmpp56bbqz4i3gpktwqc9bbag2m5atqyqm7so6pa2p3x82yg1ukpa5zbl4au00xlw0wsovqha27zdoxwpmyvhja6mpqyv67521bqvxxde38begza01i02vzpvm9edararjmsz79sw1bg',
                url: 'osleeq5hgix3fb9z1oo1eon4rm78m5voeh2z11dea4k2d9y1te8zkjs0hncxray39psa9b2ng2ofmpgxfe894li3wejtjqcq031xzkta2ugnwrqbhqkeb0c7wzs5e1ekn9i8mfvkpsekt41lkn1xpnb5liungkj47vz5s01axdhn5rsbth4fdfcdp3oozeggcu4eh99lf70uqx5h7kbghfd10b1flj0t2kyxzma74qgqy0a4hqd3l5n5kx6y96s32cxg3p9r7sda0aa2q53b5ym8hl73eziddcsoudy8cg5y21z1wawg5gparmovje8u',
                username: 'jpkkgbu89xrk5gk2scqxhjc6hkvqkntwaxn7568n1h9ovfbrnuvtge64ctpn',
                remoteHost: '18yrmzjuhn9xsklr2vkiytgju50iay9i5fn7wujwci2bq7h6i0f2jqi6bvlsbjj3013wh3ux85uhmd9q2qnvf24q5rvqf9i9ery1id0t7i1yo01duiz16uneips034ce8uuowyvc4hz6kypktj16j9jpzn56ir5d',
                remotePort: 8369333038,
                directory: '861ui28ofv1zgb7cqvsq2vq9o7z99ucul3bmh2l4t75jsjr0ceiutzu8yaxu7nwhm1e1s5z0bcij0qe4uj8bqkma4d0jsgfvblnt212qq2z4aastsc4fjyjwz3ogk3tnadn97bxbzrba5dkmspxmo7o857w4cp523wigjgs6xyrst0yfh68r3qxarudqm9ubi25h04imwoq5tua1pmtvcfugq9uk6x2o1fq2oidkgqrpyortkcxo2bvj6pyjcnm7uilcvnxdbojlbqauwaoc12v5iuk2w62ytxb5eh6a9zd5is0179koljeahkdxba7dyrui6ylzn3rz69y8cy9znvhxj4ahb0rqnbw2lllc1bj0zpexk2gvz0ebye4jjabykkgvga2uvhh92tdfkbh6npheyu179re8jz9udzxwi1fupikzvfj0fp8hmaqwggjsfc99h40kqmdb8ihn82omsmcwrwkfcsto02x43310kynr7tn1bs0s8ujsq5d5wn4os5rm2adrrdonsx4d4toeccdg50p5o9wgjc25pokgdib1o7mvfkdm7yny0f4o0vq2bcmlb57a2ict9gn4ok4a1up3bhs32a0dzrd55ch126srzwfw105s8w69mh7kspltwu6l0a9p0yd6a1jc7mm2wmwr77a7cbl9wl5ai61lovj6le5hpf6b84g6cf9ght7ksg8pej8silkhzg1vuzqgim5fnuxc3hm81ox5l7r3f39fol5tupqpve3om0wfb7uy901drssqbrm4xvryodts12v12pdosduublchd8b0i7v79k5tar0wfnh832dpw6gbkh838s53jk7ce8roe49lt33y5mfhkhotn7n7ej0wp2jh2zqkma1w66sar9856bzus5rml8ibtfaf2ue4tcees3xw83slz2cbqsgm1bw6x9gh52c5915y6th4iyi9s7i8xaerpnfd1d73c5obk07hbig6u9n4zcru5qciums36yjft58maqtrtu73vl1xtkmw',
                fileSchema: 'vhayeir7u5rwosmeebiu7jq7g8ia2csf3mpz5xinzq0atx053bwp9v9md9si41jg3082jmhba01od01pq8njnb0tjpn8klslvd8yacu804yixpxjmgbxhzv693ok00r6e8fe62nr5f84gbej07t3upojysnusr3vqwt30l63q5fly6fyv2oaw0qx1vxogk0i2wa5b1m5y6cpowq635bkox49fyqgqbfp333n27u1jyr8z43fq9kste9lrnn0iuv5dio1sxmprpge9ol6lqozhnen7smfh8in5lx7emcwgasm5axlphjiy5psexha56ucj9zu409cjg6fm22grh0d7whefcri5b94jyqqhwyh32243rqekgzvrkzfhse0xs7itsrqko3o50y3lm895cx9xt67ikrblakioffq47crb1fn2jojfnv8k88suot7dilx6oj1chq5fe88zy45x4nr8mnlpo46f9w2u0m3p1db7fe8tgd3i8w77jsquzpubnbc84zbzs0voi1mf48tpvfzdxsp85izy7s2ujlz9svs40ffdx5oap3a2xtx6attnrffzzt7kwpyj58tluyp9cynztwxmwm3wxo2j12plkhcx1zum23zxq5dw9zz86wi2idtp8bcaifdlrd2zzqrni4vszyhnozxfplwk6wscc2xq5bwyelb1x1ilshslfgryk0h4hgu5a3kwp5k6qbsj2rkua0ejk7safsigqe4a938w69illl867sy9p6mu76ptmwqkp2docy6bxy8jyxh0lm5hb3i9vb02eocn5398azu1yal4eavv5fz9hxwz62lb5netqq9a192cxb1kccafjnq0w2tjrbbp3nqti2w3fiz95862n1prd6ema3nodl3yxhs6odywna05pssmz5ennl0wlsehtcutih3rz2a1pv2hsxwszp4cvuwge3kbfgog0w57pifqjahldqg374svi6dgcqkbg5rbo1b2g396rk9dkef8nje2aiijn7jcfhazcc3',
                proxyHost: '6oupwa8yr8gm9dac4uaidp28kcya9cqa75aeiwt8pdka9xcrqpb1gco1mumj',
                proxyPort: 1426678163,
                destination: 'n1bqjy4m1dvvzhppr5p937nqgi4gbusbk0rlhmur235hw9sv18qu25oszy7a1rkodb10kcvq1khgar8orcbpdfx5czx1ylg22n9cd94grydxj9pr4ajfq9kyjqzkhmaebf1cusdqavlh39fdtz09fkn4z5ad0753',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cn78ck6xjylj1gacy3m905bwpba4ohfbz0oyklve27cfvy070ejofkrvspj8om73vqgtr93zzbbaxikzzd2p0nrkf7h4ocjvl2jpcvo82analnre1mjc7j0yorvo39jhqkw3zjlef8m167kvzboo7b53cq8sjbeb',
                responsibleUserAccountName: '8nfm3okwgjgahq3pfok8',
                lastChangeUserAccount: '2i1uji45ui0d5ctapud4',
                lastChangedAt: '2020-08-05 03:35:39',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'df4ckj5jajjytal3dt4rsyilrsqxtss1y5ekjvgg',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 's9b75197htnjfuy7eh34292aj9h92nvza54qotvljaq5v8q5kr',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '15qg9m0tnv7hls8a23xk',
                party: '9gl54l01e4u24wrsd6d29q1wpxtiwopajw850sl37h08di3i2415lhaw5yw990l6av8lxv8b2vucrsxxe1aflpz1su69tv5xeh674kgf80e5gd23j60mzw5lg78ftxq8ngtyuh1bxhttqz5xnyofj3ip31hc9s3x',
                component: 'sri1ypnucqu6y5aacinte2mrrm1fe7x43h3f3dqeuvindz242o0q1qr703enyy9s4mbp4kepq0pdv7lac111jhunpljlad3dmvn59r8vjwisvjriw2si3ensnw6qmt37xsdkbxjcyno9d5oas9vu6zys1jilxfv3',
                name: 'zhkt7r1rh7gq2eyzmzlsau497nbga75zjbepmakqz5cz7zcgppwxdx63tef5f4r9bjt3e14uw6zltr9biewov1a7su5u116pqyjmick46i0dpmb05f0y6t7nzz8xvce2hgd2hu6cmathbi926fiacrozeveje9aq',
                flowHash: 'wy8thtyoafsplsumosg2gwxxu3efynobcxw9kpce',
                flowParty: 'yul7jv5cswawien2oja3uhxf56q3c9vdlhz86e4r8b0yj721pdyu8jqn7rhjwkrb4y80yd2m5mptms8wxqhful7vhmoytwq96a4acqosbepcngdtvf6vkakb8ukl65rzbp261ezzyb138q3s90dz6qgff2g353s4',
                flowComponent: '8gy6va8foc6l8w4kdn6lps1up3jst2qp9y2zuwj9d0six7t98iib8hewgtkj8o7guyfm1vcyps9hzpp3ym1aulfiqny23je56xatddk576v6fbn7zekmn877jvmynrz0apwno7ozzo1walatr9erom4wcn4tzr2a',
                flowInterfaceName: '00f8apltn4qduettf0oiy05h49sauv84goscznt1gagtyue5a34dgmo1h62d1v416y4wt2yomwp7ycnmrr4f7banjk2uk97qkbeg9plmeao5ncoo1gnu9k9i3j385pfdwdbzr7r7a6hkt9z82cqcvzh95ffmiyec',
                flowInterfaceNamespace: 'pfxg0cvjqxfweimfcjx8o5l8a933mc30772que35i3m2c5agupojr44fsysgohjbtcuhjmzfwashbccav97bcrrbh30isn8ek5p8p3uutsw1gb4ikrya1oy5kf3ttumrtw73h154yfyzcqag4yez21v7ghfl7dya',
                version: 'cs8zh77t8yn1taydtfjh',
                adapterType: 'tg5wm47qc1cu9d7ixfuyt9gh7wo1i7cg1i3xtxxg5j3knyc7efgze17w5ut7',
                direction: 'RECEIVER',
                transportProtocol: 'pxl38e65uvctry2tcsbyyby056ufc1qs9md5l6iec0m344qrbzbqy8o7aurk',
                messageProtocol: 'uvds15kqyn3rua16pu4d2573z19xaxt5cfdl60025g8bw0w9iuw70vk2q6l7',
                adapterEngineName: 'cb5qcn85dfkc2dd8lmhfy2zl6bvgp055uili3wzdoq257xtqxoj9v473q33p71xe9iaxl1adcugnw27n8sa0rq168tq8km7apgjxs3chqd05li0u3bulrakdczelg3q3cevvdtmhb9wveb8srqy495jujd6do9pn',
                url: 'up111j3cke3klt8fl6hgzpjsefpnyqgnvjz6tn0l7w8tjcfzkqtfewzs3igjagxlqoz4ik1rnd4h8i3xt2f6a9mlkqcode84spagkv5fme8rtk5thyfravpssnih64nfnihyjgoe8k2srs7jy4cqed5t9geqtttvpswxlfuc4c2mpzcj6pcjltb8cefeen9njospi97mmzg1rpiu93uouq0442lpogcenw7iaj7gi4wfrdkpw4dao3bi1glaxglx2s2tk5w0a1blgtamq493x59f2tprvofqwti5x63c4hec04eqx88zi736gzusriar',
                username: '7rcw4l3x4l7zdeydd754839rntjqet5eu3233vrfdvlbt4lu263qycdgjg7w',
                remoteHost: '2yoa9yxzlffd6f3l8690lt96co8mo9n9z7vrxelrkjg1w8x19aokhg9o8u81kem14zewtrei5dv5encouliempjx2037urewdn6hjjnkyhri0hmwuukd7s4ffraol71d7uu0api6luzbm84suxchkbttk09z80wm',
                remotePort: 1188667432,
                directory: 'calsyfo9yagl01e63xp0ciplpoktlpgy4lm5cr3en83ln1jvmgv3vpg7qeklivyt3vy4r6dngh66jme6w2njg9wtleyvzo1tdk9c52xhd4tpwbs8kl6vepwut24dr8fz6azq4tbjzj2ec69xz6j2yc6atl5nbrj0w86vjc16ym73lyrhdc2dk9jv2ndn1wxautshg3bcfs60kb3bha3kv2o5c87rn26vo1wvo29ciblyj51j8lrqgce6fl2mf11nw20sxd9fp5r90hfzzwbev1cn8pwesc6m6dqn92ejmnr4gjsk0uqyqpluijoxx2hqeqnb312n7qhw8xyz0jmpn2353mw9m5h3fvsqq1jox0kzn1t1yzkwq984a4g88y1jtpdu1phn1ulh0vyvm1i8z1rkn7d6o435g9724d03vkpkmptcitbejv63qrgi7lk5b6jcec3m1xhkp6l1cnxjkpfvvtqvjuqwad1qo68e0h490fgv41miwzzw47pbh7qhznpnqz7d5ke3uh0oehelt4470nzqz0bjnjyuhu2qin9z49p6n466lfjb33bhlqd1swpintetc0zhnkyuwzau0ie1zwjusumzq3q9pej2bqnhao6fjnlu63j8ad1iv79t4pjxjvp38lsz6ls6e9ujwtsuv1oqdl65u4kc6nf7kki3xd3ljzo51maoz84blw7vr13j16v0e7ri9vycv8s4a6d81l4ywa05pzhq7rmogh379j83luvcfphuywtjhtqra8qu8sha5txdnemczpgjfzmv69lf0urnisgzfunt4t5vzt4ococ97900x3v64925s2465x97d437efpxjg1iodsgccbvyzqjmppttcb47nvwpf2qz4pbeirrv05kqs4hlie90t2wvd1fxyeqxuv8v1js302led0caygfdoj7bb87sk0ge1gx2ysei828ocpvunpcmscon6lyqqk4wf8c2a3db8ucvauytd04w15g08l8tcbd7dz1iyl051zxt35g',
                fileSchema: 'wwyilv8o836pg7na4b8evtdtxn3ku15ptv27qp6lqw0gfu1e1044uy0a0yq5mn733y48y21mhpg28b68n4mst0wmvvif7j7r6y2bml34oqq1bdn26xuqc6qg1png6twql403q87922w5ha0m43g7vaa4k7o9qdo5uu2q4tjeyltl58tduw6bd4yv4b0zkp81mbeu8krdhsan8de7z8si27ybskft316b5vmdckwxj9ej10pmpgihm5tcri3jr5owlqiva368jd1xoizsqu766ukhjxskz6vj9v4wzrepzi8tqcclzcxb1sdemarvgqshti5xtrn6l1epgrwhy3g9l4qtn0f9qt1t3lp9faxp7ohbqcs29zypzd0itiuo0pv8zzv1vfxwwak0iazy37urzw5b0zrs2tq7c7w7ainq0jh3s1v5uqobxen3lds6h1588rcrrducjpa8fckw9gph9cdkud4iuabvcgfqiy2aysmiy7thr41s2i6d30dv8hohwch6xydft82guxrvlov2be0sehpb3jg7ms75gxr5klgs3kmtlkl9m8loavhgvoiqzfmbvvocd8jcxu3423ggwhe726wt8kv9i058vc51m69w5rzy4lxglin2oxwo757r35jdzlsbyvyf6rz1pinlrmrx313kw9buj21hpkoqkvmbr6datqn3giadyxvr6970a9zslz96uaiuvpjp5tq9iy11qt3cqgmf4lh4watnm9xbehx04ijo6me8w4df4ergtkh951ijhk125pezot07tfmvtvekuzc3380aqobklsjdv5k121a47laqj0dqigzx6wg8mblh4o5wf2hrsxf739zqt8fnap1qdh20bd6xgzqxmx4foebgq1e17uj33usj8ynyz7krvuk1xin3r4gi6bk8cfyr4u87z15mydiulv4eiimey2l7h7hv8agmvxs6uaghpg8dx4ty073gtu4bpcjrl1tcgk6etdncotkld3z4m65tt2y4oiifr4afwn8x',
                proxyHost: '06kb94111dgjsn6sv18dxgfpq3r3chlj2o754teabpxjq55rfgzezifts09m',
                proxyPort: 8974857391,
                destination: 'cfpzkrhzszsvuqw44dcne001pbzeeaw1gmgxunduc0prn77g32nhgizh98k7zf50zscz9mw5lchs6o446kfi32em59mzt94bx2n523p31j5o5s0mrjefjjgtss85ytr66q8qi07kk0pw2nxeomde8mvv1gydu7la',
                adapterStatus: null,
                softwareComponentName: 'd826wm3v1ms12e8qzhhxx4vtnytvqtkm645khh38qackgmt5nc2ajk2fw0z3rs9qqwvxokmpvydgz4os4kb1t24ahudnnul15xthhv951f3czgh4o21i43hsdr2n70k9xd4ha2fkxjpw8s2xvaueub1t1oabmc2b',
                responsibleUserAccountName: 'otu7kfw54219muxcnleq',
                lastChangeUserAccount: '1x19xg067ut8xbjh7tih',
                lastChangedAt: '2020-08-04 16:22:22',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'epoocmy6qfsgw8ipb5l6vogb5btwargy4161j4dv',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '87av1bvtg9reovfmaijmqfzjaoyxy4kot53qcgm0clvqny37tw',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '07ol8aoactkfwnjjpeas',
                party: '9dkvpx8n8zl3r4cpzkio2kvrbt6xlf66q5zkpi5cegkjw31bnx1j4xhhe56bcijb9vikzkcd4ifhbkal0zzab9j8dg2675vlj481xvclvd6qmhi1nlzeedzoijmmu54o5dkltfs4gh0vjz1051vc978ya79xztsm',
                component: 'vz85prc8dveyt6qdih439yaomwngsmfjt1827rv66mxqe27fa95v79t1f6aukwdgcyg39lb6776k5f8makkv4hlqfvag9jwfdeuesiv0has8p1gqujj0vm4p3cydo1wpc6f8xcwqi8mk2ino5g4xdvjnscmjp6a1',
                name: 'payi03vmn9b1gqh36j3ug7hpqgwsz3x1xak0dwvh9n49orljmmf2it3iz4b42d5faxnu111ghgz7ab72eat980x0zzyd4jzvbhzsnlav6o990z9m1wv89v50qsvxg6evq9p23jc78ynbo3fknc1t3whq5johx6x9',
                flowHash: '8t1y8o79ig49dq6aroflzun7khatkk84d6zivkgg',
                flowParty: 'a8t3las92kljgxhmy0qp9g4x8b4y1tz10t1r14s88rwhmgi04xpcpq6ecjmdsjdyevvripgvmwp85bbq6l937m2aq7fgzzc4g5lyoc4rlsljdc863oiioba8s07711ov8xywv0ib9cv9x18ggxv5bik1mtfikvaq',
                flowComponent: '49ui0fo8hs5u66dq8ev2zgsj4vqebk5k6lee3e1chpgeesi9k47bkswrtaawrkmsx3zioqwpkabwg3vw0cgec6sxahy7o7edftoo6pzvk5vr1d058qamvkv4mcthfcypyu9x8s8o5b4gekiuiheosus6a3524k4g',
                flowInterfaceName: 'm2ck4edg1aolxuswf5cj0cw07ts0wobg0pgvuhtfj0blznad1yn34l9i18co66myc2kk7oupgoejvx1zksauo6i4bra6z77zzxzuavntthc1i0pxssl9g816xgsene8tz77gkcu8n6r04tjt87kmgizh9s61kf2k',
                flowInterfaceNamespace: 'vazfe72ktyqfq0s5jsww6xvxyrg7nnzxqscbqyomwtfxje19ecs68d1y40d5o19nmqq10rj35nc2sg1gjvzcnfa0ozr9mndtaqfq17z2ybk3dnci2jrxx4t6uybpsx1b8m2tpjdhh9jh37klxcilnz9n3rjnz1z7',
                version: 'jag1vp5bvchi1v7s67j7',
                adapterType: 'bia6ziwvgtzfp1vqp55gx0mbzxef7td67losrszfboul0po48jxiq6z4rvzs',
                direction: 'RECEIVER',
                transportProtocol: '60das3kpt0ad428xp6sgt5gedtusy5n85x32ecihvofbx7kpkrxkrdtm6bfk',
                messageProtocol: 'vddr52vu9cj0bxtpwybe6jea0v64wlje1sszhki72ovjdpxxz9hgkyi0q8n8',
                adapterEngineName: 'tjfkycizsv2nmq6s0i5cngqz5blev00y4vm1rfrbjhz93nmbtzi52112js7wghvgrdjn8s7d96znmilcgp8edgec5ydo61yfxged4dcqd38q4me1d6u3uo11mmaa0j6ckxkjd3w9p0s4hr6yx1bgsi685vasx8c2',
                url: 'hpp0s5kue5gunremaoeoc9627dcxfspqzrhpahr8ge8re7q3ul5d0e7gkojt1vburuxtzocthvw4wzpfgpaak0zbxslaifhzc96dwukvts4ygo8u8q9yi2tfr9k3pz061uo72vo024ykh0z3nezsz54h8i734toqa3wq00drqudy5326t2u6gcl5f2qa3ttz4jddk4hft2nhuxkhrw43lv836ap7zwmnu0duhrt99jpojsn8lrhbbdonp5842pgbbnbg8jl8w6k0zf2oyuyrn18vzjx92z0bt3m0styls8ti60y5b036iqu5j13chb3c',
                username: 'a0aha7o28gfsad0mbwpt8z58w9q9u70hxiavt51qjpxi2htbi24otenj0z7r',
                remoteHost: 'rjdoi2waaed73ztf8tncx2jr79l0z1pqe9knplbf98qtjf2p77w584fkylm1h0v9dy9jsynqg302g0jomy7znpxcmp6svf7on9aevlerbvtmyqazsq22zxjt9qkwzvr9gq5ba3srk89u2k37nj0rl7ko3wpq7a65',
                remotePort: 1825959201,
                directory: 'pm65m9xnldror5up3ga9blzafx15vpk8ji180cmqj9aofggn2zxly184tku49syy68iab85boqqmflgycjgomrcra1h6f0hwrq3k22yuzqq4kzpn98tv23ny1ztwj43p3naje8pl7ap44z0u2dpsycfjwg0337wdndkxa2xdzgfua1sersga5677lf99vrxomg7plbvopwp7a4fn73gyfj6i96o6n1hpue7tpol13h470zbpv8sehdw7n5ajpq9q2h9wg3lqhvugno8a9mqekbuffcdb6jz77ivcdqfs9agk2ye7hgiung4zztxo4jjizmozb89i5m7o8xpswwqo852aj3ft0xvluxjkr7qmtpsotzxp63woe0ythtpashj9s6pjd0sjbzyyl5sdbkyu4lwvnzmnr64an1n7qvew1n0o04u82o6cmufuindadnjn13pbt3zc53ae8fa0zw8tw2u9lq61tqi8escrsf8x6ocweqqke6rafruasg6wph1diwm02tuxw55cxqeq2d2w3bemzd2dbmlk099l3x3v3crtrs0nvjukgagfimwupg73xglvjo6ksk1wtsfrrrvn4qph7t23kg627egyagqahze35i3btwlmzygaggu21bsbj56idb703thfbbt9cxxnlt2y2gyiy6ojf0tvfgm53cmi9jra2d06qwjyjhggt1vk5izcdlqxyrrnxf6b674fk9ru110jooatz3xmujp1kteo7scrg72itfq4x8q07np9pacbka1sp0hud110mcij27c6caraztveuuj1e94ahjndyrace9od3u2ijrbzo6zrvaxtoeinkdca2qnpabivqmc0iufaikfm6jmlbxhvyd36uyzqzxmqzzipi4rqsf5s2vhmg9ywb380cqcdsc74t6j196byw445qgedo2213q0kxormlrt0x4w45c3vgp3ygg2idhru6lh133mdbt9bv7vaaiia18waf22rm9ct6g7vob64he0cxyst0q4knkz1',
                fileSchema: 'l02vy5py79887vbxb3a3t33iyij0gadewidkeul34pdf3pu74e1gavbrcn3gcmntko450bupkhuv8s0b9upidvy6fi9500aa2g9kvsehp9yp21v5e9owfm3pnqm3cnyrxibcx220mnp0n1fmj0dw7755gk95yixv2h2gx971hr23acgyrxv7511nps11vjfzrigyea8x9cjj9yc0yr1zj09mvlgnrgrw1b4cs8t61ey1ddg692igsvxm9yg92l6ef9ahvr144xalz81o29ei9t9nv9gk176ocrdbuyvqsoqkepaclz0uph028vk7x5jrgc82nes8z8t8ea9hdpakhefjew20u4jv706ya2jbfwm1542uk5zhhy5v5znjb4lfdodjy372u303fbhdx13aklkjh5tohpz66c9duyz057qt9ledsbtk8ucuvg0pl5ykr395bsxpquf9ejbvnw4sj51wdocmyj8topprr6potezbn1alcymp6jj3m4zt0d1f3wp5bgsf938wqsftn3gpdl8npza06s0i16q76x2vanb4qzx27v7bp0ua2175zh58fwlwesttktgtvfvh1dd75ragrz8ee7vemv3p6pbsr2ybeyado5wrlewntxoj76p8kwg5cfg0wauvd1l11y9zreguzh0xvmr3ms09g67usubre24i8p08oooo5i6ox091ilr2hhjrzjk4v534qm0culhd905q4ba3lg0atw9wqmajytle54iot9qmbulif4h4qw5veqpmiqcc2udinwk9q265jj5mm05ryamimtyquuyp9puaf9h9vnn0iikh08hsyvdik2l3oig2q2c43exku8imso6rxe57od3mulxzqbkz2adkkwc9xf3aet46bujy75jyb2559a982qcgzkiy9azzangvk7ep91hvegx7u5r7lbhomvds6y6pd36n0dgq2mfwvcizw67h6tcxyjgh0s8kmq4nifmoax4viahfv8b4idi4l43d26nnoztiyw2v',
                proxyHost: 'uif61z926q49qcp9b3bz2x043bhz1ts0s8ics7wzm98r089qihvsk70jkcl9',
                proxyPort: 3350592748,
                destination: 'sre1uy1xyln3s7zpkzh640jrzd1ygacue5pxdn823zgh3ony41ulmcc372runlhqe56tyi8bhxeb5dwyy25kddkereqxtqnl5ln88tanzbc77av83c7sp865u1vllmu2lhd51f2uibudybtp5sn4kd1mybv3t3vu',
                
                softwareComponentName: 's7w8mxl867yp6q5tvlkgu0igu6xj2zjlbrav9di56w6f8m5evoxabwru8g42ne8jt0kuc57za0yj4sqnahkpivfgs2kqxg1qey1losjc9m5mq28rq419wrw3redlz7jo6dm3an39sf72dbtc0zp5j9xxu5k72bfj',
                responsibleUserAccountName: 'km8nc5xgf5g5t21rvarp',
                lastChangeUserAccount: 'ylrjaai68lgu4inbcolf',
                lastChangedAt: '2020-08-04 16:04:36',
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
                id: 'xyjbx3ubgxw8pvedhp0zr5t3ezwmoghctq0ab',
                hash: '278mefvurf241uke9cr1c065ekr76w3l0p5raoks',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'h12hnp80sckqmxmqzmr77ddiwvu6k5veseccf31dfvmvn7m36i',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'fuupwnw5sklziybtqi8p',
                party: 'f02zmvgd6f93s4lewv8dk20gq7v9n0z1whwsmvaarubdg3vylnj80j4izqobcrlb413xomxhxj49pg99ezp8pzm2wwvjt4olsorht6h6nvubix4s40if653t69blju1ilxj0qcibr3jidexrgellsoz1j54g4qdo',
                component: 'jzie0b946wjtkd493sghh39mkxh2g2x0ke4lu5gf6fu7dkivkw2o643vsfe0f0xbrcondgnm4uhmsi3m7jwj73j6q065r0ctjj5gpfd3k5mmpmfr8w0wcc6o5e6jvwq86gk0l0ttnswai298lbbfpk5jpnlcy50h',
                name: 'jpkj7l9k8lugtxgp3go4ty7kqrc4w4gltwfr4q81xkg3085taohfaofl0ufqyjuctwfsaeq2ecjofykl7aptm4bcsiy10hup2xk4vf0eolq5ukmtmbajz0g0kuj13lexb4gcixdm540g49xj3qhg7rsdexsd02z9',
                flowHash: 'hkm7kd28l679hbwtjyfutr9tmxsvrc0irrzam005',
                flowParty: 'ip9i2in9f9tqckvl6wktvl1yszoqxub136m72j76c6hpr4sbkxvlybxyt36sh2mbz62rmazkak23fnzheddm5ri3wwlzt7tkrjse81yyr4zobqqjdpymfx5esgqcs13gbegwud3lvh9nd011y1ludsaqmyyl1nhp',
                flowComponent: 'df7gwbso8upxdf009dx4osphmn2dcjiakk42udk26wmz72q375mvkt5kpqr069m3r6jhwlw2pcxuswthhbndi7tmq67r21i6gyqz3j3ot3558bjnv0j2gervu48j2d36f7jzpdggskgmtogj4px4gii1xr9tzrxt',
                flowInterfaceName: 'xavims8dygzndajf0049ljix0m8lxjlvb3f9hotvhyapjbz27ryklob290yp7ta5v7h3175pstwk4xv3zv3ige3u8c6wpanu6zzgvjwyktksfp8w07etyj376z5ch3bpzb98dtmkklxi15f8mqa12gpygpngt9fj',
                flowInterfaceNamespace: 'cpcefmgdqogsoehqfeet3t02ssyopbh9m3uh5mo8slajekrhuda3l105f1gmdthj8xkz8x6k4aixj6u04gkwwy1aroul0pknit656a8z6qzaf7zr0se7q17ht63n45rghgk0tppvbjbybmvs7lc9wzjej7n3l8cn',
                version: 'xxjxhw0c5mufcwkmiim6',
                adapterType: '5a29f8kx84k4io9kf5d8ull8xqe9r68yrkb9r0epu99regiflnd9bx9occkp',
                direction: 'SENDER',
                transportProtocol: 'pjf8qpomrmg2kj6iguw890unxjwg7p4fh1pqv7rscd3l6zzmwj83dpe8g3w5',
                messageProtocol: 'mq6ytgfn38tzwfpozawi62lxsdxdfc19i6aijzwg9rarkxh7x0nzsd9fcusb',
                adapterEngineName: 'qg9iqyh73z3j518fy9enh23ymd5tyarhq6qoo2571s914wtj1n5jvbze0w6qu8cd02uoouxx40kk9bpv99l0wtlqzg9i6to7k40jybuwe8738jpmr5t7bvo4nk998ph2q15axim4z2ggi1002kmeoc3nypewqceu',
                url: 'vpclv0lrbmkr2ygh3meoq4v36624kifaynad64aw7am91qei9w22wb5sr4pnv4z749ky5joyn1hyk27rl2ltedsc4owg0byruptvctsu3zn1sscns4bmoound68phl7dgawew7dbobvcmav5659a7u6efgjir1or8v5b5h8m5d6eexe1oxlk5hcq2snej4va0bh86tixd1o2bh6s25lkxpi8bak2juzjsv19yf9qvkxjgve8kvhedqlab9yjc7a2w31cwe8sitrlri7f45c98g5v2znw7dbjrvwgqxtmfob3um0duowye12bbhgpyzvl',
                username: '2foqyycbzst6q2r9nzkmh993r8u5n4781e4d66liidzzdxduzae2fyfmrn35',
                remoteHost: 'iiiwah6o93831ysmq4ritlh3klhyrtrxjk348e87z5nfge3e465o77sklcggdykmtm1rzmqtu55tek2czonjq6pe3tgu9cf69fitb1vilhxu5g2rc8ri2xdu45ldln3pup7r066t5htxu60imon6uipqjqy0br6a',
                remotePort: 8258258275,
                directory: 'ozle5u2asd45p22u1krkrfphbkdgi292w2uvfvezyqnjvw2jah3xhi354ucoqlr0w8jdgwmmyailuioox9u1mh3d4hfhrxfn7sm2sm4ysm2lrwctsclmws6fekbx37ce72l174443wv756neu8lqzd51irxjd8cakuxjfd070adphzsb5zfr5hvprnn1pjyox2ipe317xe8kaz22azb2p9yww5qpl8w45g672oq6jaka3tpb19dv7v4raym6g1s77abjoqz33gyozw4a74sic1yc81eqmuxxhvko85gxfp4ochey2zu5i9khx7ul3rpryx8i5e0gf8q8kwiseoy5plw0nj3s3z4rbonrt9w3rfgpwg45oc5h4j4xd8vuqwfcnb1rszy4nlq0l5h9f0wt13u8vc2lrtgb8dgtbzq06tou0albdapbhp4dd9i9tcujau1259u0px0d3o04gx6gfzt0o7ak4yhpbwl1gvhuljzfpu1uowv2mwoz98l1ap9wjt0ylomcdwasfv6r9x0yrmwcxt4eyvn5yhi7wue66tpayctcu9ji050epx6rl4wdu7r6jouz6rdokmivrqcsif49x6gievsdoqjt664keejomh72mjpmn9qhht0d4zxf532cpwjtaeef3xqaihbepkrivjr76jlmgrx9x81f9vna492917dvyd8mb7oqq59756ojys3486x0thdt5zb03hggimfkqbhqm4orrmo4lsgw0cm14oa95e279k6d9i6i8romhjo4dy8yspscmz29agrghzvpkgwby19kba1puq8onvfjmsp9srig08hreu18e2sgqi9dzzh4m9j9x23eocfz9psxyeo15ec8b0lb6ia1xczx3ymih8nmev1fe0bz064xyvg2m2nehqxu1yqgywxpplx6me6ogj1x9vb4fb1rbd2qg8zhqwtrdw1ufcwtigsvcn00fg21ss384dk85bylcjaaq02eg1rs78096z47mdxdoz1okbriefe5kp1t',
                fileSchema: 'jbpkrdluysyqvgxb5hoy5osahkk66fwdf7h9i78vc0uj7s7x1sma73p7xsnn0epjey6dccmfg79xw0g7xxnbdjvhcij9q7mbnipon0jl8pfx55eis73aqihmo1uesy6z4jnqtqx27cy9ym1ezqs1fvplce3b0cj7rtixgnrqotpcuyz0um7nlqtoqxxsxegs0vw0d5etiqfbks51nhj0667di1s1d815rmy6xfqeeiys1avjwd893kerwenqy6lum7e01faxg03cz3ckirxzi50do8qgnyibcjzlfhll8gy7l5i1dvtbjbhxmlpxg9z5libqen56ctob63vp2706n6rlh51wm6kq4yagqjqkis1c0bsvutrqnko10q049qtiza7z0542v6yv4jdmcp0mpmfohg6pghoq26evgewhh50s5npxjgxwwici3faezv15h7fsctnkaliq57euhg0y0hby8pf7xoof57i82enwiomed5v3sntz3bdyw72rb35zoud2lzx3bfsz6rn5vr1bkj271vig4lncx7uddck68ni47y4eqqwi1zomsc229grqxgs4zcdqe3hlf23mxnnamp5h0ztnvjj3n58csvt6slofvplskm0al6u17stg1wlulel3ib196zvqdpywk68keklh6xps266yeshmh72hfxp5gxc8jwe19137losb406v6ebwhogj80tcvnih4yg0szeurt1ym30lbb0c133vbcs1xktuuowhhpaq39n0qthan4gjogsg00deyp15477gh0qu6canrssdnlad2cwo6e0jo008osbq3f1byijgya24ptenhobwug13cjkivrb7yu2z6c8i1h3uwxppqx7a22g3ldy7fz1h8ar5ze4if7mrmb2h7sxav0fgwm80jsyrn03pynu75sqy0c1om518kpw8hry6atmtsr52z4vwrobbqktk078utqmeby2k34v1ytltu33t28z173092ufl14khsvj8mllnaiepwg6i4huc',
                proxyHost: 'jej5l7tzme7wtl104rw99pic2x23ft98z5rqlawq123t07i0w7u2mwjj4zja',
                proxyPort: 3820497561,
                destination: 'le9o8h5xiutof504byb325apvptnn0hmu0qbkqkf52x4x2rrxrgvsacr4xsnhc7iv4avxkbt1s2fh2dww3qrkcdglcj7mvagyfb4irngxoq0tufi1aig6mw4uzdris1r2vdeg01m4ghshyl6xtoxn9ajnao629i2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3olneovd96t4v18wfpls7il4ipbzoaxtwp0zngebcxazq2ca8w23x0tbiuv95zqbbnessllttv5j1jk9kblozojiulvhaus2z0aedv48kp0w7ti6abaeyt7wlj07fpzevwi3ihptmgc9dwqftkdsuk9dmk5m88ya',
                responsibleUserAccountName: '4zbzobaelpwhl9me6i94',
                lastChangeUserAccount: 'q1ew0prvm3f7qyjn1w0k',
                lastChangedAt: '2020-08-05 00:11:39',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'wj8mqqtkt2zjyss5tf6a91o97jblhzpl6irq6szl7',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'zmpkebowvwr4o7nw7zpp8468g92zveph0v1v2sfhw0h4ihjhzg',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'erjs3t49l972dm6pzmyc',
                party: 'jostyf0gw8gz4gmgvc44dq37668hz3100ode74ftylz7e15owei06lpjqo6rmxpzth2m6rqazrcmrsp2csw9pdw4oyilf1umt95hh4h3ty809l1h8t1d7ztyf9r6qf304ps9zspwz39oese9a9f5w24m0y5kllm8',
                component: 'n02n0a0pi6fdwysoyr6p4qqo9oq6pbitgm3w53scgfjusntzlrkr04be1v2be5ts8kovyxvx9rynehf0d3lc5a8qq62g0uahyilhi34e31tfrvyc2xgybdlwr6pnm4fm4tlx8rr50euz0ex4kexxoo1abpg624qz',
                name: 'oqecun3ph3wytnw7oct9ifcszckiprve2aea0rwknis9qtr9e482c3nata6ywrdgc8tvkiryhdagahrnizcdd8mj5ex7hh4eqkq7a4aftrl23faxqugikycoupb8gxiwc0i5jhlr045cd6ehxurm6xxhi7x5jv3b',
                flowHash: '0heyeunrx36lf0bd29g5za75qs7fwttgv6k4yv6d',
                flowParty: '9r611ecxaiom8qly5lgr2rbw9827h3c3te4l9gh43tej93wf9wa5em75w98fn99cb41i2xcfvbl9kpj1jqh30ejxv2t6s70kwkmt7c8gxqe85cloats6rka030toamsbgqf89nsn09lto6zt0rrwlor84689bxys',
                flowComponent: 'rtfrqz9t8tfith44xm5hlixy834ykv4on4nvvthu5ju1ua569io4dx6fn2khtisywm1hfsnh9bxdvynns6fxsclyuhtvnk8xxsvs7knetw47bodmjfgxi2o5segj3oangquo88bgu3gxj4jfgifxf9t72fewn4th',
                flowInterfaceName: '3akbx4f5wlzmre74nxsqsevni5e95k6707p7t6959mhdxfidh8rbgbdpvuw4dv0h63cqsuv4n6r0i12zoc7bg79q9va2rn0quj1tzl6jmzbz5yikt80giwqmq5qqgnnpl8gxr4790y8sj2o4beyb8dyx6ixaqhm8',
                flowInterfaceNamespace: 'm25c8l15fu9frvu2kvp0y80wtqjmrca8sofrdhx8o6x4x2joe0s5o8sitxfqxgjrd89hzaf27dpgx812vol5dc3ckh1oqnqkxmn8fcj2ggh9j7hgsfh6roagez8ctaho9f63qw0npmekpeohhbr23jj3rsht2v3b',
                version: 'br43t26iw0cdg48e96eq',
                adapterType: 'giwx185yvb5a4u43f8g5rr95b8f8r5vbzec3e0f9r5rrkffrhwp2bvgossw1',
                direction: 'SENDER',
                transportProtocol: 'e8pn787szq82atrr7ps4f6vlxvztxxwd5o3phsacrxg66xu3xee4kz7b9wwc',
                messageProtocol: 'a26ygxfkjqpx5e565bae2nv09viuvz9w3yl32nfwkt4cjtmhf75bkohwolhw',
                adapterEngineName: 'dvn15r0rm64jij6xbqkg0ou8y3ku3zz9tz57vr1tc2n3libyk7d4446sudmocck8unt9bow8dtuw2iag7rsa16tr5ugktrm22b1gq93jdjoq0j6rsdxt226coomqx8wd683j5lgco2nyjknj015hw2pjqq4gnojj',
                url: 'v11ryhkhjznx75yvhdik9ac4ptk7kw9evn7uaq84wwzuczhcaj683s2uw1fl4d2zkmxwivx8uhhyntkcucfyntvizoug68zj3y9467wgahmyr658tldknmrl8dx08ad0m5kzpgnh1ev7w3vjppthqawdy36ob68lviugte66z5kzrupju9iblrb45q7spttbcwhjods8ue5ulhdk12dsp5u08cvl1ixosescppz3r4uqrhwvaiodw7dlysqedo95hjzf7wdsm0c1eic0ssub7azw30dds8zwqr6y178s7n46ionrmwijfv67bvnxvpby',
                username: '5yttuwc4etah5trbapiijlpvkd313jiomapsrfapelji4lzr9qhkn22ofbub',
                remoteHost: 't46bkg51jvj5vxr4g8ymmr7exaoib00efiaz8bq31ngqr6cx5kikr462do9ei81jk1a4khbtrtwexcf3ot5tr7r7w3626dx10xhiklt4utv3pp012dprhsjilhuouefmuap0ynd03s3btgsdhcq6hxr76zwsxh1g',
                remotePort: 8498182498,
                directory: 'ita5yy62byc369s00y15l14bmsou56tfca09ypujibi64zn0cwql2xb8sy0hbglljdzsa3grnes00gmylj4w81rbh133inty99bc1tv6mkk64axt162iowxtxtr6erlwi5mij86kcrv5v4g2w73ozpu1hvj803ycpxg0luuctk7srt2ps7ux0y2ronmcf0ymenaf7ri0qdogkc6nsxtdrqpluibst14fdqqosbwkz1xf6gz64sq3zoosh4usy91mwt51hxbjr3bd7hj7l86az0v1dckau0uc9zurookas6bgetxnd28cfkvhfv9h438gkraz9pf6bjal5ltke66u4rq7syb6y1w1lu1ujcqyxnr3g0mx0a5m1uhc66k9g6xphnxm9pjo6ki4uqch3lngiqxhk30aaxz7cj0ff5wgan8cjoyvcbhwbh94r3xptk60h49de920t75eij86uk6kyr2j7ntjw4dho55c0cxop23txqmn0c0q3d54a6kvcx6zkgubip7p0ljte7aiu5672s5z7b2zjm8ii9uigt5pez8cw2c0tfghshetg8ih04zpziyjkowr6qolkt3mii19iw610e8yfu7x0qvygb67tz0i3p37egkhuojgmkh8imacxpgscekefkprjytkwhmcvhoc8sbsvj1p50b7fjbdl2hlkjaguvl70ynwur5wq7sk5qbkyqagfkwkkueb3vpxl934eedrb7zb1u0xyssm4o4boevvvaq7f8b1p6v6c01p9k5xw05jgzl4baeec4xg9atsd3a30byop68y8023zalgk3jv0xftsyvukkxcfny9941qt3rpnjtkar3bb7ncu1we0bqr5bw31bh4ed5epgwxdiq6hcllxh3drnb0xxvn4k32ug9vz7npsiss1g0oi0zycoq0rigwr297rdzbbwoukfhhsy276ge0pvxozgamcle3o76oq0k724unnd49gtl544l479j8iva6bshceqvr95miz3p6bnu0l728mxot',
                fileSchema: 'bhjuwvdq1e7txl950tg70c77tmtb5xrfyqqeam6ito3lbpbl9t7qtssw4u2j0ga1olr0gbaw3ew2mh2ue26g927ocg0i6oy5ycs8wglnbn9qzgdfjawby2c7u65q5phf82ibr5hjr56agq42f2cfufzgut45wz3m09y77has5iy6uccdi1x1dcfzdohkrurq7lmyt2d3c2312fauzvdra8xgghl49pi840wq0thp7vycisd8vf0gnuw7g692a2d2cgag8hs9ukmm160ovwe15j4d2gkwjfz2vhyxse5ppz4gtll1fn67kbkyuzs6808dc2wk9yspz7vwwyl2fi2qk04qouey4xygfy7gikfs7fw71r24g88i9kd0i2u6vfl0sgozdqrvpni55pdreroscgjbee73m8oxgjmlysk0w91bj08vbi17qb29k7qx6diajbqrtajr3iagr4acx8mmdflirlofho1uhivq622dmzsjn5wh1ohyuc0zkh9zlachrhiov9mxei0ksemgy4zd0trrwanwcmm8k2nh3w0fgia8dh2i63lcxktnfqnirj68ftdb2t4l8mf8bbbt7zuc7nv08yinqbknk3dlvdinka7p0svbg20kh0bpw36g7go47w6d625nna1vp6azq0wg0z85r3tj0g0gn3y25qpwcgkij2ak7n48dq4doxke2coc3gf01ittoy7jh952cxbydj1cl80hrkor524ddu1nr0kven2kstob4rubikpduszxvjm009z03s4daolyq4nt0z7uqim3119l501d386ki9u2r3by88eolhhz9wn7q8ik30vjx6ajifoiw54zte2szfkus6vv4bf7r44zs0mlklsoswku99yum8htsffft3tvzbtdov0bjuoskgoidtj4qxnq5nlejfi7hzor714w7jhzyf63g5gxj0i1aiyxb1m75wff002iw1g6pqjiyypdu9mphcsf9mhg7cx72mgduypu3ib5oie9rlpjusem5yaf',
                proxyHost: 'q4gzoysbazgbfsd2w734mwcfwxrfv8qwd0gpa7gigf4cgikm8tiliz3r27y7',
                proxyPort: 5897278558,
                destination: 'w6fz3rcwm7l5subzgtiks00uhi7csfzcw64drqebozrfzwzd2zlmsemllokoasa5voxx0gx5v5x5so8qnkcohbvreunzk757f4vbo6huyz02oh82w2m3iw22y2roomf0xxlfwe6b6rhbyd0b0rqppc6d1m6ez0we',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yxlgmfehx5immb6qrbp097kti9t5qa7w6ke9zfzrabpc8t11utdjnje6xmevsissdovfmycu8wm0p8mvbh6ba0b48lmbmszz1sl28al32n5neawmc0kpi7jaejhkdr8ch1o9cijuxvz0wzkn87w9ridfotj259cd',
                responsibleUserAccountName: '8za19lq42mr5rklx4urn',
                lastChangeUserAccount: 'jpe838bsrpms9wmq3np3',
                lastChangedAt: '2020-08-04 20:43:07',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'mi474ky880l1icixndmquqj2tamdrhxsvtu7lf3c',
                tenantId: '2z0y3fwufddz2yl62ypuhwilfqkog43zudrjb',
                tenantCode: 'nzejksgbmf7u0k2b6dnv5lvzqeonjgy54jcqdpu69efjmfhyz9',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'uya5sl6eur9kanqkkj4p',
                party: 't0qgyg4tnxktjvze94rkgi9a2xfw9xhso2ry967ebntd7i1cld1i9jlxi8sw182ork1vqotdjxoj5s8y51u567kwej113ed3ogd8va2lftzqjsupmjpo7ujp2q25qfdjmjn0e0xvcng0uhs686inc1ic8t0k3lrb',
                component: 'ig0w5o9sb0mkltwgc82akood9semz3ejec9hvdi3hrq4yoqj9fkw8gmbh383ubao3l4kzui7s9qklve3pmmpt0q8kjkzwkfzk3d4qizzbqdfk4w8484pfcur8fb2gw7cjst7zkah5uqvja53k3uquou49kngsgvm',
                name: '1mqc3m476xzgghi06ojig5p3eoow9ikje2w6mr31svjgjxadd7qlwsanpv3joxqj4uvesonp7y8tmj7h74n7n8buhp75ur3n8a2twzheigxidbz7o4pzmb80bcmsanwf9tcg3ug3yj6pk2n9qfmf6gxhwep99wml',
                flowHash: '6iwgid33rfretota2q5lcz4j2drhnaw6sma3o6v2',
                flowParty: 'rubnpf6vdnu2g3q6cggr4nse0p77cc3ez0qi28gwyeoauvgfcacesohnlh7db838zxabfko3x0wlzkyh1g3mwgqgc5fcbzyh7e5ccoidi08fj8qld1yzw5671yltv5b1d1qgipk8apbu7lj3xug13vuqxf0avf56',
                flowComponent: 'umvlfzq6e8vzany9p5fx2r27lpfp0tetelukykqkr9whtzyrka1vbkst8z5m7v5wybf2sn41v1nrckjvsbb8isz5k237rjarurer2xqqgv07e7v8ru9fgpcpljm5vtmk14nkd07js3h1xr62i2bjcx7zriwabnbx',
                flowInterfaceName: 'g62ewleygoxmix6rjzpi8s4gucao5undc5sreyxi34spqo2qk3ji1u27fjkid6ad3we3uqy7h4abh3ick7qy6tgmslbp1bozfyay2x1pplnhps6y31kcty0pyy6ukmq3x9ffvm06ouirytkopnizk4voahettti1',
                flowInterfaceNamespace: 'xmeyukm1rchtafih2b7kz3pbwh1b6t5dqzzhu0qmcm210wty4wvr4ztqj5orxkx4x798lb7yps3p5rl9f8obumk6j3bxkbkcw5s8sl0wv7dlhycygjy08cxfvw3ey2qhp9tpwc0itjz6gyh8qzwt15jcxxm1x9a4',
                version: '5wxuxaetbung57weeciv',
                adapterType: 'e246tpeiltn5pg8w70oq777h2bh5k1ampwax06dz35awpskfmj6sopntfiiz',
                direction: 'RECEIVER',
                transportProtocol: 'l426o6yclix0434p4k7ld44nric8pydp1es28u2j49bktrhbej27xezegwol',
                messageProtocol: 'ij1ylf0rc5kojy3nzt1mwtrn9g8em7w1mpwyl2d9lmr71jzdayyxahow84yv',
                adapterEngineName: 'anjsmiv7zznnsn7pspblga5535ryfefgzafver6fnp3c9cup59l54lsashvczjkzio74m1l6gzzacoh81k0fzg46597xw1g32nea06q8vy4c0s9i3ey6ott7i6jrl2wa32om7u50u3z7t3utayhb20g9nqic40v4',
                url: 'jx7uyz03qce9ye9fg6qn1byp58k9y07bdnpwxcf6ow8ntkeopghynuuo7pqwayhu503xc0bpno1dijidbkvu5729kxvx4bsgjln2splcwulz7b7t4rvn7bgive21d1lpimpvcfvj7lrbvcc3zp56smd05ryyr0ubinkixkbkvjqoek46tnu1dxxpqy4r6cpuk89kp1vcovccqbjm1dynqwe23jzbmzyd97hob92jmjdn23lgk2jy19iusj92fxd1k34l5gkncsnjp8lk2h26n8hrfmc6h3v8ydip9zm8akc0kzzs6z4bk03w8sfdopjl',
                username: 'y5gxoyupbhy42qf0iudhr4hp6ioffzjj8l50nlhtaxlt0eha0rv7o1chb0sx',
                remoteHost: 'v6kx1mpx78v8p1jpklbmqyvhv9jkz65glnjtzlnc2ymyvt99o90vwvbvi5phrwqadevqs5glcikbldagii7ef67462z79aaz6d7j1ic55v62q8y1waefyekl8j40sjodfrq0yrl7gdsg8rwe6htlcvr9777np7xz',
                remotePort: 3437099481,
                directory: '6yg6hgewdtiaf584fcydnjjemuz4vqm35tgc2sakh998wredu43y5vm6wdw8w3d6i6kz1z3zlxv69y22etcau1in7p3vip8zbdyi848alrvgcv1hk14xj7419y8panyh19hhbj460qhtn93lq5ftx5bkio2p9udhbaopbedpez01xtfngmmth8b7pgukri7dm7mdj6p63vi9j8l9walyr8pd131reg1ovl8yi2ze6i9z56zq2os4r343h02h0llkp6swoku6njd7082ki1v3outmqggtavlj6mhb49jmjzwa7irutzo89rzx7y8nd8u8ketkp7deqt3au8pk4flbwwrqxnd6uhh9uyauzml932ykcc55gu2zo9ltnzgv75j98e6buwpjaoj329r1916kizzpx31to7xubj09aypch2hqugmm1k0v70o0eczn3nv27276cucvs1pld8dmbadcbpv7z0mdkpu7hez9c436a0zsyvgro1pzzoylxhnbxecyau4jbiqbyjxau6eaz5hslocijk3loisj4osgb23munugb1hnep55bphodfmh0s3uafxan432om7fbqstsqpqihxsme8jetmmy682samwihdqjdz0pv1zf9g51eowl4m3yhhq742qf2s78j3sahfh77phrbjyai6grdjth1kqlgc37zjqyvbt3fol2vp617zcrr7cpmdh73w5meow6kdc2wnj20ntrs3mb2bh8uwwkr7xzgqh6dqpfq7mkzjdjzmvs4tzgef92kkvywpl43g6x2a7g11wrxy13jsstrmying5ledewq5kv5co3g0c5wr1uo19jver34znsm7tiu2c4twvruin5i9c9x2ih143yuf9s3pkqipkf2urpk099aswovvcjdxhor8opdlxigdgj6b2i7pzjs5k8c8u0vakj221denk8t5rrpy4mpuzyo07ef9bvmaznvdyw85paz2xzu6o31bskd9b2hc7vz8ykqyeihukoiwg3hewa0ag28ua',
                fileSchema: '4k3wsywre4s2sf7z9hntrlr0vsz8nmctxtvod036xclk5fqgojclcmn3ch4dzj8n3bgrynqtak648jbyxwxp9d60wvs86093mcuk6palgm6l4fokbbkt9hmlz6nzqs1akgqdlrla0fljjae9uqbaana49qkpf4zm9s8f2glgzdtah9euel30mxwh0arbfvicorh01oacdxaswngtbzand054nli14tbqkskiwcddeug6ngubh6ze0gyo0mec6j0c92wmdmx61kvwrt8120n9duqo33w05l1poa786ttcsdnr5bvq52q922xzgh9u12yihewj3wkm25camm64gsi6hs5b7pr1uapn4w1v0az88wt8ktwajepmvakvl45n9njg4ozj19ioavjbmocj555wtsbrnd9z1gloxrkzgmwsxzhzpjs8b4obp791grp12nhmk9tveqliposo4edz96z2wa32a9lus6vbi1f0kxumtnpsnlj56l9u0xrpbl4vcczema2s0rm3jnfzgtxc4lmc88lc737l6ufneqhd8icwb39pkbzwr0o9x9c53sccvqhz3uh1d21dd2gyqoatr05dawumild0z6v6020yjo0az4n0onv3xxfxuvq1bty5q3yliq24is8y8wlqyazq992kcdqu5fuzp1l3s5mxbm7np7phkq2gq6whn3sqjzgkz0h837ks41tid1dvtmqfjfg8jnogdylx03hlz43ami5e5sfrzz7flwdhbcjr1sp2rnl7oep5bz2g7v47mvyuoe7rrebbludz00h67tc7dfsr5x53d2lfkrmund2l135506f87c3fj544bghbec5k6w4531yat1xpsedoe3g3ryglebhjm1m2u9yweylnn27gr12nqs54yi7mbrztlikpt9o440e6d5tio85hnfgmpte0ooevv6tourxuaozfes36mkoc5dnytrdk5f5xjhjtcigfejyjr87b4h605l4blw8rubgoitx8i885v0modjzxzior',
                proxyHost: 'rylrkqgwmcj065wdwa8iuxe9n2cru0e93fom22f7rdph0ygsoyqf2xacjzcm',
                proxyPort: 7461337469,
                destination: 'zmpimm5qnzl0x9ach3oi4r5oa1ps229lrjyrp771sm90fek4a65z5yq9na7i3ysp9qfbjz01gzt1h5b68yl942851nk299yruvp2bmhtvag2w0lp4a05556yb0t2by54q5cc8bzbo3x72i1qfre6vq7n7aguxvq6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p1vier9gf3te3bm7ghavtbcfesyvgp8fh0fro4czo6op036rqdh9w25yoq8pljhv5o7mc9u80oav7ms9i6qp6n9whqkxma8v5viky15wrm3s4hb9kmz78l6ccywg7rhju291wxp60iw0i2khg4aqv123t6dl2bby',
                responsibleUserAccountName: 's62m8nhyrzrkcywgpvdf',
                lastChangeUserAccount: '0r4vlvfji7g16ew4ggyv',
                lastChangedAt: '2020-08-05 08:57:29',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'j1xrv6ed8lb7c7pjkdysdqbioomu79qwyrlmb2zs',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'tyyrk3ch9lqcefrrjo4n2fq0wip7oeu3nna2gf5nddhlysijlg',
                systemId: 'ipb8kqi7mnwzbg3o445vsf9magzbh16gdfz8f',
                systemName: 'n8xniir2ro2ahltpk47m',
                party: 'ylrhjh8w49651ym7yzy3up35mk89d2j1bvgt6sdjtjrg104cgmugj0eoikyh9k4xqzcbps6fh0dcmgq37ltu4rla35r0r5lrave7rd9p4qjeosbsy7k3inb3agc2fr3mhj1r7kiqkm25giqg9mjn7ksf8p8w0jmr',
                component: 'estsxnzc9rq8eptle3hcmhtnm9rw0qdu4v83j8obr8yw0pqkx24netzlesybsg3nyx9217dxndibl5s61js4l6x0w4nzie0r41s8eulg4zs3a7mkjybi0uv34acp8n4ov2k11mdjc12oi18h2nqx4ueanwr1quby',
                name: 'n4nm1gtyll9rvts0v6x2jnenbn277366v1e8ptkrvs214j898873r25mssrtwd7thpcw497wrrrjl2dgp17lwxd87vxb61o03tqh3fk4ucf47w5lc1he028yxffe2vhkogz9elqdt3avyrdl0qj2s2h2xmlq49we',
                flowHash: 'xw7kjvvwk875xs2512bvth0uinb6zituisdcdsye',
                flowParty: 'xn38wx1mgjotbya14px0mkocvmz85xzvdvotvhokm9lw1j8wa8u4wu34x5t368sw0pd3p90y2pzz4hgspzaz0vpqfcm496fvmi9q5z2gbsm3lbzfb2ejypbnfq8lqi4sl9grfkf6rc1exvc88qzfcn6y5ma9cocm',
                flowComponent: 'we04j3nywkem39v1wna4ewajhsm273doef2bapunqhwikst25jjx5clhs3t289mw23gvrpnqkfg1k54irbmlm07cc1e16j88dd0yekfbhrvrn73nojr42jhs0vm6bxiectljkrvkw2jckt0zmgs20i2mi5nhvnvs',
                flowInterfaceName: 'mztmp04pbcz41m5by9d2rfc9d3xw9thtcvczpbnampmtj7qwlncixkhotcd9t4qfs1hxu2b5a6tl4nmamy71n407w02rm3behvpionty54b0ycbdo7x8qstxdcn9s96uvypcoq5wgilxudwfime3v1h5l1ian4km',
                flowInterfaceNamespace: '1i0i7t87qe04f4lbkfuqg9gp1qsbdrgwcoylajp06v8nxxytj4zqx0yyq7aob36ddhihshqjwaxomev69li263g5ny4x7al40sgvtmu4y6cl4866crerby7hboelkti8mix3olun3peia87uqh2habp900l1v3xw',
                version: 'kgyrk84b5rg298hapchc',
                adapterType: '08wkniy4joxrriz4mlufncln8cfjiibjeohyy8ugeyrp8wuabmpcc4hq2mo5',
                direction: 'RECEIVER',
                transportProtocol: '7arj6t7lr9onj3kk248nr8beuq9cs8mau609z1yj61c1qo557ny9f25k09d0',
                messageProtocol: 'ss3id6kvmiqw5kc29dwz0bvy0c5931bgkrir50f9jivvernomsg3eao9slyw',
                adapterEngineName: '2dhwlcr79jrv6mqdc5ea33u0oxwo8mj2b8dirpgr97zm8lbrk92e0qxsdpzs82ctuc7jl3kx47cgi3g8oloyw153aw98szre85zsh6vbidq659jysmlfjkxj29pkt3jf000eofq19ove8uptw3k9261oirn3x5hn',
                url: 'mqkbxfzaof9q8ds6u3bntbldde6oupop6ebcwbdukgis3h6kmwzyt79mpg03fys0ngfccdhcuflvt3datwi3jjnrnxzgd8ohnjzsamgul91l0663gqouywbh92o1odn4cxj1gcf5gdq03qymzbrfx11ke3z4sfqg4siouphqeq15224obca3tsx6a1nkmyv4n6hwupa8ywdnynkuakdmo744auz6twnt6jtkoh161bs0d0hoxijtp48sp5x23f5h3lfhc3a4jxutrefpx7ebvwnz1mkdi5mhjq9oyuicf73sj84vya9vpqh01ahk90en',
                username: '609pvdwl2sbigmwfxyy773xvkfum9xpb7qgkchbsgzutt4gtap62jbkfbq9v',
                remoteHost: '5efgy89h6rgzh9llklabmsn42oeh8hrtt20hngfagk6filhuuba5cy1aizkgznqn9yxby8obov2y7u1jbgrwqyb1k98jcws179259fkk8yndvk6dywluri8ss4gllg2lvev79muvob7e8ant41i3zz89kp3h86bq',
                remotePort: 9868841893,
                directory: 'xw9l7kpo514zmweu1gm4zou3bolukr1im74vdctfm3ujhwsjf5djs2a2f68ncmon8qtrlexi7tr463xqjm67jnp3fqgl9g4o2r6n3ma9ss9uwc6bf812spaukv6jj0ossabnnaqogz2ja1h3v1ek3gyuylyabc12wgqvj4kv7tiv50cl6jlq82m0jg20jlosk9jzai1jq7dlq1rnep6rwd85z2mo18j5yjg1z3g3l866gylpxwqunirfydqgqjwat9ycc35fsxxj4nrgfyl5l18yqr1gycj9sq12i9zj0jysdbck20nw71hx8jaqvn3w6vmql1rw1ujptob7z4c2f7wikgotr9mg8147qn80fpshq9c8hemcrrilbe3hoclxdx2pymf4jedf1x2q1pof0gch0h0fdktjcac8iadpq4okuibiq33ri1fuaraeo80q6hqxqd6jjwytactkzdxxdon0hs42eguy3hydzajjqg648c53ecsk1172xw17eggu0asl5z5r8jkqaug0b0p4lgpcfclzp53403wl14q0u5d8lf3n7j6nc6mfl3pgebd4xpmz58mt99j0ume9ttpkun99xo8s6akuajp41980c51feaxat6aztp5rg4twac3pfbuqjcw3a1kwc67u6tj63ihuwr6zn1dtm5pzi2y9vmb5uqatlp2baba0mw6g008etzz2w06iooreixdoq4rgiu1yqikv3bd4iygcf1a2d6ujqnaf245lyehuk27vih5iw0gxxs5zz3pw85x2blgyzkzgwa21o0znhsxedecm0w1stxap41hmc4insjpxcdkq2upd1w10w7oydzqjjbh4qy9373yrl0v09e6b3ye9qy7od9k79vrafqh41t52wh9tbk847j7v7nygeb07lqsvndukldvnikviedwurrhe7c2jf5i7llguujrmhszgw68h96xbg9rdn5qumd7b7fn6b861i1gkmzrey8ps2gq1z64ljapu4tivl9x2nvvlw6ia',
                fileSchema: 'gv51e776ia3l2zb783ms61bahj7jzyz157xqavgr8ry4w7q5zbfthv7g4jj02dnemwo9745c4g6tfnxayc69ax7a4kan13c26cj7phisbsvao1w39421m1am83j68hc6fft9feuicy6sdf3dluhwj8ryzclwfjou0mams4obiiiodwin65zqysq573lbwo6ys28okz1y77mf33akpaq2w7m5w3btl5smrbq37fst17ke2goci6wngxo31pjzwq00okbi0awcvfrnv5rjaz9az7pv5tdgr4yzx3767s5rrmjy9vpkcp7f5vkjja3uzpe21mgm0m3qu3bb8lkciyoun6fgl3bfjj384qkg25cc462vi83rju5ziiwr6muxqo8uci64l29s7ju0n2yxndxxnni6879mhwcqhqajeh8ug7qdo0vf0kpjysl486vfty0yiajsmnlug36fe3wnvewefql6t0flse6gwhdhh8ext7uprwjmxc386b793ckm5yn76int08p0nhjqmp3b70nshbg3ynqlvse2jamk0lmczy74tthkiielm0g2g60t0xnn6mzp4ylxayacjmm0u2cegujw37ud71868l5cufn3xg8c3wi2v4ke14pphvh1y2rlgdkttp0vaj5engwsmsrekaybjharg1hbjtxuviovogomvdt7qlb199cv4fykpza1krefwx30oorcfp6d02yonn462llu8bsg87atmvhcgr93lj316wkpip00xtvwjfbbb3x0ww4njgf2hb0n61naeasvvd94kxkya1ocn2g2q05egorn3bcs8l0spl85yc16opitq242usro9jndr5g9g5r620tkgmbj73dbxrcd1x67ulcow4rzhhy9qoi3vphqrcekggfa95iqnpw3h80cekop2iqi1jdz0336c670qbrjo31doeoprcus107f9re0y20sh9tnvomoheo0ywuhkqwk3uqu9fi0ynnycw3js72m7a3mnn8uxsldcynvjzb0',
                proxyHost: 'o7mygtrr4bf6pzq4edl9s9fqxwmen0h88f5q32mlu5dwmb1ytmdptv6pv561',
                proxyPort: 8277152260,
                destination: '0l3fwj9lrfi49kqac04xpz2v2p7ucbj0p6aewscj6sb5btv3vpgzqs4z6ppbkgxq96etkuncqt6pdairoutzx39ofoxrno0hnf2ggl8sr52avmzispcpgxgb21o1t2deu7auii3cjv5zxahsdclto6fzxajr3wqh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9b76g28ihc66ez88rnneyryf0e78unrg1o6zrzxumf9tfac14ca6bah6qncv2bv5cnxb2v0jkxybi93ue2529t3hprxl1y3sxdacdt4wcg5e3yf6ht9xclvjxxu17dm7bzpnviylr4c2guryzxeqycjmu2sfk5b2',
                responsibleUserAccountName: 'nhr1o4cdpe73m2yj4miv',
                lastChangeUserAccount: 'pqupoirnt0hkuc6b3c07',
                lastChangedAt: '2020-08-04 22:12:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'u0miyid84ywmtck7ic8dymrsygv3fo6o7bu0sl2i',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '40avuf2c55h0q781xniqk43en2ficmlsefdvitnete1bw7t9xi',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'm7gxwkbx6twahats57dd',
                party: 'co1gi55fe2ut1cfzqwmsmne72ybt8np72bdotmpzalwcnf0d5d342wdtv5bcsu5us6kc8br826hflzgkin23nh4pq81qywxcn5lshwr34quum874pv88i26dq952jdbykskznp2hyech2j1g8pwkxutm9hmyx5c4',
                component: 'kth28i5jme7dfig944glxl3y8bbr6of91d9nhajrvo13faxyokph22kzly8cw7v5oqropma53zxc95jtpmzn4113osgbwf9ky6kf42g9cbsyp099evqg8q51z337ua9y5ipy9y98jrss44xm9ixz3l7szo9l8f61',
                name: 'bzof7lam0fo9sk8pcqgiph1i1sp93b1stlzmgkjck6dfpbzstfvd27n8qbqbj24jk78c34d94i4u33q5cqv9ocibpok9zxcz1zrjlr7e16agw2fifjcugyd89cglpwo4g6vbsler0jtmoznmcpv5tgq8uw9o92z5',
                flowHash: 'h9rzit94qqkt1yeen90sc8w1vbt30o35e9qnnoikl',
                flowParty: 'ixh7su7ye9uedo01k0rwmuo2c95wahud287upddi517faz2ox33wt39r66wfbqsia9kph5ubzm32fzzxg4rzutyzhsva38k7a07g7ldr9wt4ic5m7h2tz1fzjwhatuv5h7htwkvmmme0w28vceegomxj54mfiibv',
                flowComponent: 'hvgsnntmmur83rj007lby0ro1qam4cwgd4zfg5riodetf787e9uqf79u5094b0ywxehtumk8i4kbnlzq10wpcdre7kj25inths27fu4xs6kmwk1pbavh04swyd1ix9ng28ayfibn1dzwwwkp3ghj3h7qaa3y946j',
                flowInterfaceName: 'u4rc47qulf77vfwfq5s7w56rpd0tir2vmy70i87zt98k0dbzjiudy014zq1ecf64f35nh8mjfhs17o05ax9xuuoxct97e7bvxl8kxll5tn9izov3il7gj5h40sutx94jnloxfduqhudecqead8mbdozyrgu4jcct',
                flowInterfaceNamespace: 'c5hlufa6uy10b70ph8uw9yg0bix0lzlbxskqv582lyg3nvb7mcweclkzgi90zk9vii7owoth1su5amlpl4vwq2g893uws6q1c8tjyt9hbv7pft70nwi5r14gwtszxflh9gnuyd3aviv5q2v9qocyygzb4cthj8dk',
                version: '70b4r7l31585s3ea9m7l',
                adapterType: '2kbtr1r1xg6k5ry9mvdzug5gxazii7s5eedkweqogvvz6h3lc3ua1fc3nr2i',
                direction: 'RECEIVER',
                transportProtocol: '1m4eiek7qivm7p5jvdp9vbbp1qwt7srpgytvvpvs317cpm1pbph0m017hjhf',
                messageProtocol: 'aw91lwidt7h4mv08emqewic4ynet0bp2j9g7hshler39rkseaf4x1njqrl3a',
                adapterEngineName: '6ljodhja2xa2witnt7fxp3ccvgahbrapkc7zroyib6x1r5ar46zhax877h8okjcrhcoejcizo8977wul11vxzyavr4odayny86netv8p3vwgwgzcije16ztz8nwfqc3b2vnd59rgiy4t3qfde63y69xgux5plfau',
                url: 'g2owm8f2uyy9wwlo5s4cr5q939wc50wtvzqbi1jsealxyca6xjqfouwsh48gh1q0zh3jzy88uoju8dc7d8sv42zl6feiq6hj2ng46fukb73i6l0pg3kls94h9zxhcefmnhxyjnbl59pncqr4ysk1oladdi652t6yrkykcaebunnvfzqjhy6feeb6jja4p25jq82kyx6jch3naxh3ipsok1zzo4wfj6o6wkdzpzkg2bzp2gfmqieifg2zup7jipvq6wkek69a4jv0a3iztb0gw333uh1rqx7jgeiy16x4pu9o4z5d25ost9fpxcl36kxc',
                username: '7gwr0rkgkmdjtpz4tzbx260tphcntu5jnb5ez8mk2ea7o5zahgcbeyn7ra32',
                remoteHost: '3lywmf2wimm5sezcr6qx4g99gascparmxw7nsqehuhggjtqf0bs59vr11mx28d44lvs3y2loqabbmi785yvqjvg74g4c0876xz499531iphigwwgqjcafg1clnwq2ixe0voiinssagqknb70zm4afrwcm2lhsect',
                remotePort: 1755060129,
                directory: 'tkk9was26sbrgk5c7x32m8qy4m99xzvz9r0tfw5yfbx6c40n93xtpe7hqrkvh1grb4cyk8rban8s9z9qvewpz2nnwl2dbg14nsnrnett5z1bv4nhamri7kjpjnco33jj1lx0iqp709aettyl1ev1jiyyi3qatikvpmiv6vgnhdgwtv9u33xp7vcvncy3yj1ylgw2y14anehmk6vyafta7dz9e6xj3k69nmkrnhnwnkgbszxoc89j6j9ig1q1s40fglobvxna07l0agyln534dpgxlhswiqazw0rkbl6nhp77an54olkmph0ycn6a3et0xzro6lmn8hx9drtxf6rhz7eqofkzujqo5qiiwqyweyfzuzpm863pwrov5pqwuj8pu9tdd4zj393v1wofwh5r1ej8r5n8ulq3cy6unimjgw44wrykam03arbyjryur8rt0m18b19i4kqp7cb82dfbn1hza3d1dcky3ytvl8hpybawn93n6udhp3pzighdxxaebe4h6kavp20kfpjt5f0f5ftqd6qovmujioy9zf94faf7vnm2hel46s3xthem1zew8hlr5den93fju0hr1vwtcqchu4vj9ijjgtgdwxwnpnp5p4qnazphde4ibomyampbjyhckv3she9bmxc2m36voclo39931gwxaa8hfiiz1f46vwoijsl42xg5w8raewv3bj4y98i9dppo0wavyxxrj17yx8481aw6qrd05pf571bj3xx5zokm7r2kaddsqawl9g6pdncvdp4g89pkgsl8iqg2vuuybocozczfy6362lpd6rgjb0zbfzn394z9q7r6s5nsy6r92l5d4nyvizjaq0jztaizpyq32mjp8zj6f3vo431qgbh83qqk4pf9dkndzxcqq0c850yxxga5q3nk4vgqfwkkhzecgm0g0jdrlyb757oi6sxyygs48ie8uc42pgi3rol22lr4yhepkc0tqqx6r9mrpy4tsg0dmj0hieki88o1ug5gh1mmx29rayca',
                fileSchema: 'dsd2cvw9ockrcya6nwlrajy7wzru85xqv9ucvni2w9183ha6fi9lxvuvhvozcqo9skl9lkj2oe4cyu5m2nxxjyiz1absah4p305oeftl6ryy866e0q6qe7qu8x8wo7njkszgohivlqhff2ztr8fecn239ssqajjoghkkh7b8rvd5ngv1p7gxrqaz8ya5ux7zkcpuscqr3cho8pr43ajqfjvy66q3sk7acxddzh6woqxqwze0p5o2zjiy74al8e9pxfr916a85jdwlmskl45ofbqrc06lw0nyasj242thx0md4t3n6jfv6gwprnct5bk1q6i6glphpqaosufhbpwhuf2ldup7smv2lwwyv2avi6wmn4ppanemcicxuxlqiy2rxrubgh597ltbu1xrnfky55fobi40o2hlxgeidy5mbt7hznuf2pv0s37x1e55n64l5kgan5119u3wteu9jp3jqj96m9gyoquuh0hqxvsn88syl1sxaf7nv6deflql8b067uiijn9761gyrnkdlya1dxap0pk8co7o3prlxs428shsp6kiewkvxh7o8tc4j4fpxqwram4efs202n7ror5ob3d5sdxf5apxmo8u7c0b4dy40hh15a59l6mnef0raxg1u5kk743km5jijp3fepq61youoh8uilyf1pp8ziqem5vpprg2k1hamj99qdgoskxb3yv982ssye4er29nflzb0tkv2rqb9ad2420pledf6n6fom1xe8h50710ousp04gubml7279bqob1qqhfdbyx8g3mknt210axjzospd00ulbklz8tl6gl1d9942g7s5ys1ah7ic0tourukeelo3vwby57b3gynw7547pbghhms24ynwqgydgakzxl1u77furrrwycz23hoss4lgw9z0wd9bxtjq89qnmfhlnu0nemkwitkaog39zo9w55rxuzzc9c5dwzr685i3mpwve8oy9obix9fvam053a5uj58rss4n3ioqestj4ptnuxzxot6y93',
                proxyHost: '5f66k29slfkupdjlfh1g885olr8nvcws61bxr7pfj6f6dgchhicwxvaqavx7',
                proxyPort: 1125656149,
                destination: 'd2ve6j8a2kcx6fi10o3xw2ixbob6aiw6z8o5f69o7bfgqdxcj0sy5fnvefqzz5atnm3pu18a5jwn8egrej3l9udrbtwcwcd0dqxmnx0th8gjc1tyiyx8uvg1gb2vqdfveembrx8ic06c5n8vpx54vpu2ees1hv5x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wx76yqfm4flpw213rmllsqpq07sfruvdzgwgvotqm1x9bklek1l4b8s1wy8bospp19kdvjlqgv9jufuahj705pm0gyigjgacawq40zb7ohpfyb2b4ipr5txngulgfbe2nkfmqnzktwctrst4uaqxgdik2mf2rwu5',
                responsibleUserAccountName: 'cq3j2rm1oetkuh34hqgz',
                lastChangeUserAccount: 'g2izw62n26d4g3i555or',
                lastChangedAt: '2020-08-05 02:15:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'd9j28vcybnu8vb9blt9h7cyeh9oif2dqcsjeb5zk',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ruawq77lbizdi28lpx6ui4ckzkkej8a6x5yylhnmmcbdy56a9ah',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '18c1qqntsve84mrtm2ft',
                party: 'hfok6qsmcvfx73gqrm9iau43p1iuv3ck2p92s1h71z2ou2nmzfw2z9o1pcao9ce2t7yxl6xohbxl77z2tho4jz6dzerersjdu1yc3shlcvuokijagwx2zcve5xjyzt4pl46eq4b3436wlfsttsc6xot97lek3xyl',
                component: 'fr1erxrz2hb1hlktd39f3xc9casepbm9y8fiymcvsjlybfsbwnatukrhbataxgddf3sp0im0gn4j1bce2712h5z90bw9rxznbu8nz005l6i9j3do9c6cgqbnmbxie6zbf3uz39w1scpzrgvke1makw35xxiwwdps',
                name: 'sc4kfx22k61tb6lkpe01iv7v3t7fh6vhei6njpb4y6vey1ushbqwqm19039txn5eywftk9xzr4mdgixbszn7u830kcpn63c7uhcah4dabejnutehngo3rr30p9h16lfh67qqewwj34zkkkmw8gs20k51fhuxnc8z',
                flowHash: 'cyn6q2ijhf6otzwjxzsg9r4ubwpvp76z30lxvqnn',
                flowParty: 'd8vh270b1abgh02qwi6gppssq0ma1fwoblxx1gexgucg5xg04nsf04mqp7bhvm4ejpvcy1ijs8oe3kelkyd5ipg8wx8eigrn5kfwy64p59dmqmcrk35swihn8kpo4laisgasmmvx6q0cltwb77cw8oi48lcmwlf8',
                flowComponent: 'teq3gyo7tav668gjyrv07q00ebu4wtktcckri9plrespoyjtzz7djdrbmr4c3mjpwvs2e5gu4jl6vp48umxp3bj862ur3wqjygmhntaavtyhw9abqjy3jhngbxnls24kejajn8aigqrut565zmnhxnkzhdamqibt',
                flowInterfaceName: 'jy1qh08eyc604h1nncwrlvaxw74z5iikmqbu8zlzjyx2h6tc905xrub5obas80e130uujai5fh78wwblxitthbh6br7s8f3e7a2zfbhsi7ehkjnxmpif586jdfcj4jat86v1usla7lqwiq1p0z6d9qpnchn0bbln',
                flowInterfaceNamespace: 'cy5nwtl19vmrb60vf4phrhr0graolmffr5mvbqo1xonsjrvwgpngyo8us2dvogotxyhhmha7xhem65fdw86b8lfj7sz8so3nwrmnh42eywa807gn5z4tzlk4wug773err6602eo3vy9gclddhmpodg9stv4wasw9',
                version: '3hl7c5ui188652eks6l5',
                adapterType: 'zyb76eggc4sf2rir3az9n289wsey5dig2vxhuo370d52hh6772lv5d9pd7vx',
                direction: 'RECEIVER',
                transportProtocol: 'eymz4z6rzba0hr3kn1edlhdyhclmoys29mrybbpz5wcxbn422qgubagh1gch',
                messageProtocol: 'xk5ywf8bpswpdbriwi7lg000cc5asofttaap5n1gto6qeaf1tw3rl99a8skr',
                adapterEngineName: 'gaj4zzcxn6uecd4zpwkpq867c1z3ak2rg5pgzautghuzvpvc8v3pgyzxce5xrbre4cbg8iryqq65cgj0hs4rtefnerpwx1vrwle568hrirz5dkotib0ugz1eed3srvlsq8wlnnkny68h6s4fw1g0y8w2wst4252z',
                url: 'ytkwoaxeh9lw20zquwny46xmkiln4p8z7cyk23g9g7n7d9ne7nguq3tbzoul3t5yetv6a3ihbfyfktil1oaz0ien1debyom6skpkptffssb6tiyb7i0qoi39615nz2a7d3uj0cdrerhu71ooqpszmcd7ufhx5guukl7r0w0nu62rc7onaxr34gpliun3boutayz4grjg0gpo284v1g6okq91yr2wcqhl8ctepgs4rmoomjrs4h147htzwfdn3z9a1fsq23mdtnu7vcfjwkbjngdksr2dab1c4tawj5ckb0fxuqctidvz17j52rgqt466',
                username: '4m547bru6a5vus8k500472mrrnh6a4ta7qxemjz62s8syopsxrlmtjdomlp0',
                remoteHost: '1jc147ykorrl4jgmsfnp313fg3dmzgqrfvmfo66ot7gsoqkbs77hup7aolfnpvcp5qurprunxxy3lz5x1o55x5pdl52hejk5p0rcu4bcfwr4s7mbaj9opkyaabago93upbz8bsnn0sflb3u2rcwr7z6z7a6f8pk3',
                remotePort: 8715711225,
                directory: '3hf7l0u0a0giqcciinp3trt2y7tcnzqugw4fs4lsa9fl7zx7e9v6534h24r7kbdpsax7dhozx76p9fz72uv959o65gdt571hpmrpng4hl9sbrgvu4v097qpufftijdmj7ufemzhb198124dhz0wxbpp55ub8viv7x25tqwqmmpyzaq8yg2w2ltw79924xpza3mcbw9zb21dus1iia7nuw2nivglpoung8wngqts79xp5cuz0ndw43arxyd6f8mjidi5au2wbhvc9tz8939u6bds258db3n4qpf7jrl2fndjudukyvuxm45vg8mkgdy9z2bya768r0c14zsyj84ktfidu9ps0d5evpo4dfob1i5x5mq2oj7w3gl754m1qcesexlioi4wh0koyfobnoauim4oe5a5ucu7cf9t52wfylcpig373t7574k5vd7hnnkm50knwwtcliki3dt7a3u1hcyhem7trfsf10pbdvcb11heax8puakm1cow1v9onc0lnk7ep8v2nlqgsgnl29iew7xb9o1d6lynz70qjsp70gj2nbgu3tdcrxvaok5luzk9oocv0r68ff2cinfb9vqswj6loxyonv7adfinvqnujep71q5gz14r8jqsqm49brfry7wm34p0cbnq7dci7ppncbmg3i1278bephti915w8uqkyavs6ph7krk8u60xamhclbbcvygcqfv5f342clov5kw9pzu7hs098p8s8ov7ghwkudpfji3y7p8hunsbm0mfbue8ift28ifwbzu5ao5njcr9gofh7ykvw52q88k14l8g7o6le8hme7s8gu8t4x443o6p4c4k04ipvbtmxy0b15k2w4bi0qdpsp9v1l9x4j4ktzstq4cph2fv83oubxdtbvwk8rnij524kahwxy0z2ijaqqr1w1tg440n0nueh55z1gpz0a4vvna1logkum2zfz0u1yesvy23a02iautyxere62xbmr2riroz0avlx9yjb6dtzvj3t73oibukkw9xw',
                fileSchema: 'fn5pnj5c5s4y3lyhmc4cph2yrsxpxlo206vdoukg4ndxq75hlz458c474p29n7q1iasadt2rjwrh6e5nc1pwf9au8gexkzljbk4mvm7gkun48sa9pppb9srz2t7aj7617hzmigw3poidu1ruz5h75cxu4cf40c0mez0j9usd3le5xa9kdjc47yo3ay4ib24oq3kveerua2pyx7jy85ntp20mmng3bon6hhl525fgonb558lo39s2u1suw9zqwp098qnvca06oktzhgafxcvs3rya6vblwei23whe74uyau8t6395u4k7vwtzd2ha5i3i8ogad415ue8p1lh9tx6vqifjm5iegv7to5ej8ty8g0qr1l5hrgkuvtjg18bcq3w1x6q8n48yoz9w4u7c3tafj9wom4n1y6boxmgwhmrj9vy4m0y6htmhjhu3tzgbsiysjuyt1mp4582cta6zbg4hzkampibreutd5icbzck2l8uwzif1mqg00fxlsoz6v6dplhrznix3x4ggjdenpxq1ido1hpm4jtoud14apfxturgp4ea9vybeh2ya9j4sdpgyj9iwusvay3k7fvf79fkcg87d6e6lyr79c1405c61ocu7pwz1hzo35fz18312lbft5tyd887p3emzakfrmbarwid3cxs22rvhvzjdavmcvgqfphtew8hrrodsvke1kbyz2e1uxomr7zeswhm3ujdokhws54e18k4k00w2rmizkx4hx5tv2ce70eorptgxnxsar0t3tmfz9bquvtqiv15q8njoxrkokg3xl5k8cfmb3lv3872snjmav41yrjq6n3fxtaprqggxiznd3bnvhj2kjkgm6jz8k4t85b89xj1k1h5fy7w755df98q6qah4gl3q6us4unmxfgfpu1mxdk80rbbu0g53jegmumaoce3uyz6ni6cotc0ens25vu4oi98fl3g81cr69id23q9vh6bsjick7m5tbzy5nitc043o2quz6r9budhio9ai2m98nnxl',
                proxyHost: 'aq55yrp05cx3rc3gu6qsyep851ce7sg2bqnhymzxe00p3op5a86z2pe70bor',
                proxyPort: 8732260660,
                destination: 'm2cqxj1kjgus8p68pce24gvmb5rn078zzpgsnfwe0ks4elvf5npznt1wav8re91g9dditt1p6ge8ur29rt0rk4jrzdqt9tjxtrxbsryb6kp7d44pysjndo35kavfnyxz930ik943xpye1sh6ita846mb3dnnqf82',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jguwsaaiu29yfmq6lcgng4kliy58qs42vjpeund53obfd2atldqkf9turdf4jqd4ifvk3xczm0yycqyv4m27nlm1cmm7iygnib7x4r5lkgqove2wkbcwbuqvuzp41cx8kktfzv5a77ry5a4gouw332maw8aa7j1e',
                responsibleUserAccountName: 'tfw0dggcfasma39vijur',
                lastChangeUserAccount: 'lxsvn1bqu1xold4bho6e',
                lastChangedAt: '2020-08-04 19:10:15',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '182cnu2gxjdsn74lz7wr85qycz5nc2zwmoig9igf',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '43w2lff6djjwlcvxc0ahtnvgphix1v8ijuirdc9fch1sicykj7',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'kxw0v4o2u7ss07iapf7dp',
                party: 'p9ureiwmw9r35g405eikhvlq5g3y920ppxu2sw02leiemhoscpnfqhj7nphnsy9zjysctcabivqm67x9mhv3a7j3khbb288km64aj8yh47s929h7vgj8fy99h048vqifgu5i0jh8fkjjtzw7a837hpx6121rbzoz',
                component: 'ocdytd6ouexe14fe75xqdrmhevkk20rtzq1ew0032qx80uwg04ezfupjb4zz4ftz1r2ul7iugvoac5c5g32u1x05mj76cyn3gzhj6b8u2ie77iafa2pl9y4930ygcrs2f93p5k25z4uo8h1a07y6kbxamdo19iii',
                name: 'slhxtwd0625gezfijlui06jp6x8794tu62yr5uzhsgoyshmiv1jiqshgcpwpcg8opw4h37cpvug13d89stmvq9jacfgic8ve7ujk01z56rd9riaaq3ildz3x9z19czv8r9b57oh42vmc5qh8ui3j8eq66lwlmwn4',
                flowHash: 'qckc4pzvh71a50ylhkijer7o34dqg7tas8a0jaqb',
                flowParty: 'k9werd4zfe2h1wxd2jk3op7l2100n6cr51neabn94ndgfp3q0mxomb6cup8wxstucuxnjgpgb6m71z544bsz49r507043vi99n9njygrvljkrk7m8g50lxi28kfa9qk4zgk1bh3nekuv20124aulg3l1tgl6yjad',
                flowComponent: '4y0inj05pqa7mgig7kvdk2et463g9y42ntmg7omxcs41m8tzwtut8q246gipadt24n2va1jfs0cbkhz7zxwvtp67pux3ulutv4udxcp8aqjw5mc0l9nmnqmwrzgb4gbh5vqqnbqdv7lh7fft1qrn3apolqzg80l8',
                flowInterfaceName: 'lq1aj0tpytif0z568cifmn2k04d24u4qxx8fpcf5d1zvsns79a5qsq99xz5p3tbunljl8mmx4e1416r60bv3t5g9kpkgnw8nhnsm3vzdv51g06vlvsdjt9857uwsevannsh08kki9fwtz9obhj2f6bkk41jsu7vq',
                flowInterfaceNamespace: '6stecsnqwm4dgp2odc3pszgzf06uv4tqkqdpbper5gha7xylpve86n8fuf4d5jykp2k0my45la3gyy5l3jtuqnuklkdpcuv7ew65lk2ruwe3mvmmqjwz1jzvyod2q9ipj3tijjno5435yk3htbk9fmuibkmnslam',
                version: 'o0zo640jczboxdkzgwle',
                adapterType: 'oxelo5jk2kj7hsogd10g3oni58uwons9h6wat0gvmsre7fvp89tuuoz2oxt5',
                direction: 'RECEIVER',
                transportProtocol: 'l0omke5zltvwqcv8pv785hl1qc86y75l48iizik54evlcsa4u0muetb2ebwv',
                messageProtocol: 'za2gp7pdsbqqvlmvycv0br6rdus026rcacshdlaokajnxuk2k7bpit2wz8oz',
                adapterEngineName: 'qnl1cykq24y1rgmbi81i6eykjmdf2viy9ut6cn6z4zzbh8y50ffj8x0yku38n6y97i1vo76ju8z9o54nvzze4lxqvqezpt5fvi7hf0hex1n7ayfv8r4p80egldsmnqle1zwhymyekoclwloec6f302umwoqyji4z',
                url: 'l8g8kem5eyk3lrkmw7kln17ngp19wocvovtnt2wcmu3xffc4wwj5wl5igccg6q1m4wm5a7z8tjw7l5bc2jkbldppwlu84fjez4qplx1vtgr7b4aaik4xts39tfcfidn68ax0zc050dfvsws4b673lv8yt70kdb6m37lcs62361a4urwslo41w5i13esp190o9v08kbk8noagyd7qc8oerq0bbjb55n6ah37h98r1vlv3ez0tagczn15ji26u9v1s7qh6p52r8bzak6od9weuzvsbmewockhe48iq067gfdnxxjgh62o8k93kn3d2zprw',
                username: 'mixvqig4t178m10hz0tnjyzei9xytgt973qj3jhi16b6di4q25queo70a59f',
                remoteHost: '6n3l3ix0sk2dz06eemv02k6s7pfewz4j83mekb471wu7zumjcij63kh6bjy8ow0b6l2h8rpr734yepehh8dzjc0g9k2ueqdbwpnihkzv8ybptcc78a5ly1yzn8rp0xg0k4q22pjgwdllwflspicbw2fk62nppky6',
                remotePort: 3502488719,
                directory: 'r7kci8003t22uk24tow3bft5i0njcwqmsek8a2oh46uc8igxsopxnti8kur465e8tlw2rpflj04ckdhiopi6iifkykjrww8d74alj7iiddouamptcigdmskgk5l3l6cgc89iyfbb78sbcu37h32qx0fo5kxachmspepsbpr9bs815pblgylkvyhagsapnqz8muxsidssvjbmnk2div18an3ipgva6xy8o62twqn0p1hzldduwrl1w1chg7xu4f0ebs4w7lxprmh9gmnyd7ttthia5er4o61dvpr5pibdho1s23zg7298q65lw4x9mlnuod2304905js6pyvkt4sdcjxytm468i7qfk7qarjpeafflizeqgvkpt7y9ji3o17iueiyrdgxdmxbfg67uqvqv45ch7jqb3pjpnn4uyy2b62cv6gsjcxonoz2nk32jloh8j5vnpu81ihitxtkg1mnmk2ztrohehco93646u2y2xa8ugdvbcw0ped94vex9te0yr8ew6x1ab5fmglzapcqwtcmkt8vysmgmuoe2ftqft905pk3rnbbikiec8q9hyeen56z2ctdwji282a80vg1yv2qd3xhhqbiimgjzx817qf45rhf3w8ru46lgbivajrarg0kk2hhembscqofy5ufldjfdeebds9ugi7ab3t13jppm0zy4ez5xnco2dei3jfgpyxtkg8d9c4i0yj0ypbfnzujsqt5d044ruojjv7x0takbnoioyqfqjxeqwm9y9n6w1i67lri7rkeaf4ekj7gxtppx64ytffqe6v7cctp1t5dcn4l8csnqxbe9du6jpt83veyvt0pz5f3nuduqvztqf37vx1372i5wbimwlt1dfzsmrjvfy84z7avixone0un9nw1ed3lx7y7tspmg2aje7zl4gjcm1yxwp9ey14okcmzb9qcslbva0xwc2u6efo6inqefkzw99ndbxcgklbn7y2xcy2v7sz01po2xvxqtlfs3lsqxaogdwnbxq597wqf',
                fileSchema: '6zfnedawc3av2lejf8qz4gjce50n62j4zluppmast9sqtyxmeqcxev52jn8m2wxer2q4cyy1oqhvgou88owu6fcoig36y94p10w6a9uot0wsl0e3xjszv8civs857hzbwrl76pie486wprdxtft3xdshlucj7pbrqm7snx72w60vo8827kwdgiymzy9t8dtycvd5mqfen86fmkq68o1a7244vsfutaehsjyq36hzdf32ghfc26lw70wt6ztaowed6fxej6b2037d6exm8qlbknl4h4iavcdby37fgzxr3xqzfey6ayvyok7tnoi4r6vahosl95iw2vmekjugq5l0veockwulysdx8vo9p977oy46i1szgruwy4rj5p6t89p5661wwu9u696fy3rogvbrgro7yy0g2a40kz13uqiyn2kezsxz4ug680yn7uid8b73232jx3ilfz0mtuteqfdcsab9rri8y2wxm0n5lfp3tgpdvzlkt3r87p8s2ef3qma3ah45xzblk0yte93cap8ziw2zjvtktn8il65at7e6zhme10582xendjpuu3ycamfidk2dscjwja74zgzyngd91mxiox08dzx5selkc6zv8s4t7qjo8p6v1evphboypbe9a3zzrdaxt61sttsv6toxz5oxqz11dj114r9z0yh1ettdeed2itnir24dnwhq17xq5bph1zcza154n9qom5yuanmi8kvzxqbsh1oaqehj4xx9johpatk3w49ho6rs1wt0z8m7vi8jkip48xt7cxl59wbev1te0utv3uiuup1k2587ntqb238h1mojxg1r083gjai3671fpy55q1kk2a8o5c7dykxbeaggdx1bykfjywm3rm7s4w1ac9v1rlbhyajsly37taq457nuvabyvdnzsmpww7dy28cmlgvb3o9ha00oj7p8h6ei24adpf9hac6xls3glwaveocq4og7mkwc7oyms01cnuasyblf10vf2oaospco7aw21esf6aeanhbk',
                proxyHost: 's0bj41wued1wx42rzal5lmu0jxn0qjfcgk6zo9vmruz2rg0pvxvg7l76fc0l',
                proxyPort: 6675394011,
                destination: 'moyi9s7rkhttj7ohsoj2k0jr11q9r3e4733nik8iei64pxiton9veq0vvr2lji35sfbwc59xwpxwubx9l08prab0q2e2q62kwg4q7zox5fstuyh3qcasv4foxzvif3ms3fbqnlwxd50rtaqbcu58p9m3x6imh0vm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'im6dgy0nv8bce9baul71japttbii5zbrg4fwc8gl845lsnsu9hj2q9z54hlhda2hm9it5aew5fecl4j74kzwg7hy8lcysa2ogec2mbhj8cxv6z1c1hig7mxap9apafhllbjfjczzwzssdkqisz7792wptmdd9vcr',
                responsibleUserAccountName: 'viurbnkja4a7qu98jke1',
                lastChangeUserAccount: 'g8maqm7yf5fmahgc7pcr',
                lastChangedAt: '2020-08-04 15:09:50',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'uali0k95p825esfr9lzgdud870v27g1oro0qn34x',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'ov846vcrfiru21kpmrdy8s2v8qvx2vdz5kf8eoz7efox9r8dqu',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '77pkplkco3z0go9nz5ay',
                party: 'kjdwkuwyvvfnbn31af5bd0z9798dyqtet46mb8qd3kres891r03djjqxsebdfut9gmpjeunqx9a4kc9aq9j2ivcpa4abraomkxc3kn751qzpt58aai2tahyi3x61lgz7pw2dl7vpj0b230dsv92ppfiujdhhpmg4c',
                component: 'uwr4tcxd09bpljg6k3c8t87br7fjmn2ifnmmnaz8sddwlizlxp1o0t2b0m7cgnjl2jcyo5joxmfcg5z8jxm63pmqay2z6t3lfo6eneulu4bx06i946lyxah53romuv1485ldxdqsazzkkoww5loe185zr11q832v',
                name: 'aocrw2etauq08jiwvpvbo9h7xtxkpxsx4yk1sgv03xgyo6rgs5quas4it16zz74ezrkkle7dnby9uzgcphlpf2scsnf2tijdrxs80imjesv2020ux79sj1pw7cyxok1urqzqgasgk49xxnubr8v36ukbee4svzs0',
                flowHash: 'hru6hlrunsico79uvsu8kthupt8st6nqtbahe7yd',
                flowParty: '0f9sitwuq41bnp4w9bk0r7pkmoz5qfq69zat8t7695x3vu7yka2xy7qef244ii7o24s5gj24b0yfhitts982mn9a9aqons691eekn7y58klgbpvlfzfz3iqg7s9q60qesqbxnt362zksy0ab71d0w8hm7adlpe1n',
                flowComponent: '8b81ngp2cgz0sfcc970zk0b8bw83vhy7v326q245f5smb3a5k8uek0qahw2qnxrixb7wmjtbg0n6jsoi7kysnxwbe7vu6az1p56zain5ufmy4jcep2n5kq4eophbr11jqyknbdqiovlo0tmyn6bt6tkfvbnsjqrr',
                flowInterfaceName: 'gh2psy0c4o9gc2t5krl4ov6d39uq84wc5vfy941931p9krie2a946rzs6iamf4t6i6nsd6ddemanp5ak7rriqj5bc4t2lyvpccseypc7qyay10u7bm696o4yo1v5gjzospa10ktuxelejk1kwyeguq4js61dq5g7',
                flowInterfaceNamespace: 'ssx7qe0ouk0q3ez6uomxdiurtw462km0xs3hs78n1jf5niehf27qkrfs01h5yntnjquxfne0ivlshe8cwo1nlle6qioh05jypyq4el9rzoemd7htjp1bgiljpguyon37k3l0segjz16cl70fjosfez6qfsvnf89e',
                version: 's0abghom3dodfzjyzni2',
                adapterType: 'g4ni9ff07z8dxzp7emxp09p14cl9hpuelkovwswcvyvlp39gtp03bc0rb14f',
                direction: 'RECEIVER',
                transportProtocol: 'ewhydf846ik4zvdxycci5571lhw93dya69hk3n599ctq7512316gvm6x6xbq',
                messageProtocol: '2r7c2ccuca4kxeljuxp2azwfjjjnq561w6p3tmasod1udacw5tdvkqo4tpf0',
                adapterEngineName: 'i9igt9zmczcv4kovj3b3wm4gsvlyf264wxg479821l00al9iwdd2qe1l7vyp6432q70idpvunj0tbuk6hzs11jzsi5he0q5oxlc6o3sl94s0kl3aqvjhabiyxurcxt9ybs8y7niusmtoj326puezauntx2vuo34k',
                url: '3sei4wd4bedslcvrrtroba5xad7u2w4bugvs1ul862c3xinmwbbb3pzln5ihui052kz3uwfw2fw0i4ydugs6jhkzzyhxzhsfv8xqeiomhelmff2aybt4j2w6z092sr2l53knic6kirqailwf9m2hwx0snlqxpjjqaz19xtrdrti8drpk9kevdhr99jmbfjoqxz7o7p0xwbm6aym4jdek7z3bghsijycmzhs49wxr16pmft26ifhq7pn6a0spy0toxyf0teanany0g73rhi5kdtkliar8afzbhehouyg3ah8qp4s4hmi7c63vwx8ghfi7',
                username: 'pykkw5dvcfn07ngwndjnyhakspakrh5p4gdr2ao0v9yca4na5x15pkouwsww',
                remoteHost: 'kx6qhg3zk8yjcdju4nsscn9eb5b928br5vrq94jsetpiidkmak3vmlmqd6jm0tqniktkxsvlfbwcny1q4i21hymcb5bc7hkhksbn0b9mtv765ieom4656osznuzet8szc0outsy9y3boufasdicsyidishlihfg6',
                remotePort: 4039914667,
                directory: 'e3xe1oeh8ag2jabvzu6b7g4ge1kgwdzi27phipxiwl16tqosr3wa1mbp0pj7wtlbhu4gx5nu23mn5qca51klqqeriiyxjcqlefpytxrv10eu85zdtpbayl0wpxq31057rkvccvkf3g7xq5n90w6vzawl8duup6f2lf8fm9gct4wx27v5yrwa7iba2lz21934lab3211sald6msuxd1j5dbgt4pcz7841teh3z6lf1tv79lf7y6amlz3hwm86vzr8j5fw2nqpn1iugx5pln2yzs5zwa1cv66agdgpe4x3x1ys23itkf32ywtgjb7t84n44thppxfped4z3vk9fa20mr3nski41y8726ykfznkz79jpeseeph65xvqtqp9vxc34gny7pfgwg1l28gfq3t2y6fl0tunue2vax2dmh2fbeb4un59rha9lct3g8rd5v9bbn8qr8spaucji4xm6f2nmuged4zcpcripbrijlmix3jthj045d9lljl3frvjsbkh6ybu8dzdwtvx4u6m48mjhieqxtwk5x19f85luhhjdged72nlethzy1k37wo8qzsyb47vpcjeiavqxd8d75cwr3oj24zqoetpivq8itwskdszhzik5ukxnyhz6ura2g7riq0tlb59m3xz97gqvqwqya15788t0wbp15hl6n4ik3basizdq578yxr4hwoz7b5t0hrd7or9c206q5qcztg436dq9w9o0x6zx5dohck8jqzsj275v0ernhoetjlhnef6ldt8yzmkzgp0tp8ar7g8w0slauzwlxaknvxoxygf9uohmyby75vrqufhw6yoinb8yykh8shj935bsorzejqdmntwxivpxo9nnk2qdn072y9t7nmmtnmzq4t3zpcb4bp8j449pd4pq65lre58v8w85g695mjoq2lfxa3o3077hr1hwe5a0yjoms90ml7ur5h6uk2vz3kvl3dpnxr4tap35xvj8qy5bnp7qwrdgdl2cs4pgtejotncgcpml2suw5pl',
                fileSchema: 'w5zy2ti8gt4nv2sorlz2mcbz64n6qgvt02nxrdee3c6pmkqy4op4kod0u2fh38ffnyznjpbbu1zxbcedr1ybgtdjae87onhibo43iexf75dfny6v8p0bo7s1q8mjr0vkotz9qe06sc6h2t69wmx9g5l9jqdbpopnhctlc6bip2b543s772tpdi811zlfbhswkeusytha5bu5puge6pijrfw7ssod64b10qx4ceqdv2sloagdk0r8a7uuj56jclk93rwnbtjh4s0tgpi22x0o8tryup4eyubmg890nyrbfk01i43qr3tu9rrobpcb4zr6gkjipqlsyfy6mpeibrrlv1vh8xkbw6zi1n85bthtifflm489qyvnmwo8y34nobyuag8lwt9x3uchd88scml9u4v2g7ko3pn5r6afki7p5tt1y38vmpj40f521gr7gf7rded78rgrfv6a4ygrhnrblg26l4d80v37e255fkye594p4tv6hnjw2syh5ztgo80le5wv2dno9kh34awzyjwfpplylmgwyan3rxsvc83zjlxomtbodbujdxowe5fvibhwxlwntv2587uvi51mz99h4re4lln0m58ijw39jj9ie9qk4ft5h4r8ib71qdihxq51xw8o8c2odsh6pimcaz5aa85k34e6vtgv5hzrwt302dtlkn7nth5p9xo4t46po94y3levvapp0ees8dxj4p2e6wehpsmjxahr836ul5ikaa6zcmsba3k9qjkouc0sjs5j03p2wi4cnx0bhqbovzt45khvqsmh4bvwgpvey63ed2fpf89gr9r8glg593362fu5dgeglo9fy9vxohwfrt260g4wmns8wfsjqkguwxigl363erenviv9pc1y32e8firuls531sha6bcqpb1cv0odn7kmlr2c1xdsnq02hm1xh2v5cmay1m3at7jnmjl8zekbiyac7flen3nwsp4m3wx4udetpsuuoneromawhimc0e4c1lm5fr9m3lp83sn79vmo',
                proxyHost: 'oxiuca0fcbgtvtcupbrl0jm4esqnqrrlr7pqvdqlulmlv1mzge6cs7njte81',
                proxyPort: 6291768650,
                destination: 'usm32b2q6b422vjll5z3ef57kus6i9qwurtaiqj41utx8mwesuokhmpbustjftmeu6g5nxqusi85zergeu74rxx42okbhx538asi7xjlt42xu4nxv864vwn5nn6r3tq3di69t7lpjffwr8hpaylleijpocoieurn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vl9r69ocksjyonryop5zd8nlmo2tnpl3kvtz5hqkb91sza6pxwelm8v1mh9g1stsdbuoppes695utgj7tjyi5rk871fn2au448u9qsj11gyiju30fuig1111rcxrh3qsugaft45bypkyszjfqxkti64xv3vnhax0',
                responsibleUserAccountName: '8qzrsb16nmufogsjh67h',
                lastChangeUserAccount: 'f3uiuic6ydixz0fkox1p',
                lastChangedAt: '2020-08-05 07:22:58',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '1w5mgv2jpjtqml630syk7rms9cqevqf6ofvxotaz',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'u58kjq0h48g1jdqd482s8gn5v2612ptk9388nbi5066xibe9me',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'uc26bxe4tyfscxh7hrei',
                party: 'bqjauswnsb3a64lbh1vj94y6c1w0mgz3h9vkvagfqalcf3p658jajgxze6darnrh64eb6qx9lgnbq6d4p5a4xr6yfvc2f6xukqa9j9w1b4mnvkh3f4k2bh212rgf16slmbj0ahw1sbdlvebjxbdo6zznu6lx8xzf',
                component: 'u5wejtt2m519jvemfg4a0zzqjys6qgsn578mrvbz2tpf90yyutsmxtx5l0lr4ml9d3s1huusg8ott21geuvsn58gccrj360uakvmduk5n7wgzpijyyqc6fvfocer1iu20lwrbfyywk9hc81xumszonp8etympzkha',
                name: '1dzporloyhgapfh4tm0pb5vug2e0s6znjty1ikin9ihco5xv8s3qoppdjuqlp6lrz00xbgk8kvyxt2hwzg5jw2irp6wbv0wch7wswdevuc99cz4djt8h3mot4bfsnxllg54aapggzw9c0h49lr12pe4i1f9u9alv',
                flowHash: 'mvdjqcaru453k5j3b5kl3mhicq7e1ddpb1kcccdt',
                flowParty: 'xhdzv3mecqv3kyrbhnh8pk9nvbcfavsr972wc4nqyc1epol736474314sbr2zwxkjj1ix2qunh7r9nfn9xf6sg7c4sd06uokjcnvn7s8g6zzg9fkv7pi5b5po0shtfwqp91cg9cs025z4z7h2mcnwx7a4dp6hb83',
                flowComponent: 'ot35c8slaka7bpdklqs4qh1ew001m5tsxj0wx7j7cbf5l9ujru8irvp2cpowiq7k1k8ka2i2g0lkv5eotnv3yelacidw7d0q4qdfdk2fcjmq0nlaurkuar0brkmuhdd0a3xsg13ad6ww1d3acnv8bceeux6rbstu',
                flowInterfaceName: 'u8il3irs8gm7v7rv06fmawhekk2s3b77gc6vu28se956psk48j6lkq6n5n6p7kssinkler7dz4x5pl95eux10lwf0ky27180vov6d1ffko33tgjxd6momjwmg314aebfyz3oh95qb8laa4aklj12hm2v3gjujceu',
                flowInterfaceNamespace: 'xmp7obu2fe0wt45qy0b2y09uhnesp5hutdrtvswyg6c8yx4pbxcmiigj520zerftvlgc9wdut8eajvxqy0iq93uzjrcolcyf8hwyrb9bd4xileab4u3hb5snnyzm4vv5o1hibcphbvyklptvvrpkf1k7z7k4xgyz',
                version: '94lkio19c1xvpa2s0qin',
                adapterType: '6jkxafq9mzymw9d2e62t5r0c3sfqe7vxepa5zo810etklot30xd57n9bv03t',
                direction: 'SENDER',
                transportProtocol: 'ojgup9ylhkwwu74cyqzam6fwqpmdjd7zherag0ju7lzc06hw5ye8r9on3ulp',
                messageProtocol: '2s87o7afzq4y5xwvnip07089lmgyj5tephvxe778dfxunr4m9l58q8vw3t56',
                adapterEngineName: 't9h8dypdtffqibq9kmahj042ph9v4i9n4116ug1ff395y9vruk9roygy4iiyamdlh9pioz9jw19bw66ofjnnzknws1wsj2etnigejkxe5fvu3tb6vus4wupyiqvdzty2t8xvvg88zf7mkt2rza825ps1vjlwj9cg',
                url: 'xghl732oj7v4fog231zmooyzz5octsel63lsyy61kmxz0oi00z4msmvnnvqybr840t765hjz72y1wgwsjup5wo8agmqm69ew7gamymuyiqg06oljsb1pchfnu53aca7j34cqm1clfmgyid0l694yf1ondmfjz9qbzrbb31iaap209jaooeqz65lce0lmspf40y5h5n52c7d4cw6tykh7x5bvqeqifidqk46syhcyqxpoqsubwtjc8ay437qa0frgxhmf0rznlalsbm7gnxtz5et3lcodhfbd1oyf7o41ay9bguo628kxifmx93o6p9t6',
                username: 'wyekbcgivjk7c6vddvmc2vmr0g5v4s831hmzgcohe57qba183uatksygx2lu',
                remoteHost: '0pu2w05d4u3d96m7bifvjppm8zzogrv7cmsnjgpw9f16byq7wf5s892npcd5hjxqqdnkv6dh3g8b1tba205bvwcgsdltbmqx8wb7qfrvr7eokcdrorri1urk14aoyup5qxsltf9vne7tvp9sxelffsj1mgbkula5',
                remotePort: 8607774996,
                directory: 'e0e8pzfcguy4g1kkrvzfzold2ldrkaefqv8thf89tbju7np4nrunbxgv4xlnr1nvtsj8zs2f1q9ssweps80kir0afmplobs5tq1a1wz5a5qfffsvop7kid0qmuu1r1bomj70solq9c2yuafsxm868x5zkf0va1mi9z8ev7v5jt2bn6kcla1o425e0alx4lp4yw7ysr7hkqe2k0pu7wqj3bkv805ff1ozoh7emg2jgfykpalx2xtisjq05iq63f9yaotld373iaoip8a3j4zeqzfc2hn0ny5rarjrazr2ujjvbacb4icrdjyqyfawqarw5l4feu88coai5lfbh4i4udcmqvjuzynx5m5ygd76igubpon7qanupj6wmaacki707zq2pxr2j0jlgae4lt40f0fu7agjma5868gtgzh0q6wo6nnywqp43rqdpno90z4zeahavztghjk2cij6wxqeeukd3v3qvly5yj2vf42e12ou20f7qxfy16rtlbp0h8vshtk1q1onysywy6pnb24r1uwp9t9hfs7ajdrybm6q0vu6wkwjx9hxbmzd1cymiofukexh3xze914r8i8t584uejyinxgdy9infb0rdj5lak6dk2kwovjr03eeckyd8s9rcvujc7hmepu13q29ceq7ic8ovc32fx3ulmy0w9bo2qpvvvcyj0r0hlkh0qnucro8jr4c5fq4ftaoqr32v7zjq2v4z9la5j1wgle563yjh039kfx8a2azl0unocy7ra56hlvrqufc4th4rygkl6ajqcii7or1mu5153kkecgtqzg64kp71iyli8ad74p4dewmm9zqajx33q3lzg9i9j6lw2tvbex0bv9o0gdizg6da30fnyj7r7iunjyn0j93i6mucajk7dtw0p7nbpuvodhbpbrln6jkghzd1lr0ya3mh4iu3aw5gwjcej8q8dn9d98h0w6zf1cycamqm8avsxggrqlkxhsi41q64ykcdi8kgxdimuiubcpnpq1wtf69lh94',
                fileSchema: '6yee8ekn6gvej8vkqishqicfz98i5qk5hbnx8vtwlcizlspkdygqaiq81ti15xr3nlla3x6ahz5vcc9bbqxwd8p0hlau47f4nl7e8wjeb8cwpmlommcjksccxinn1hh1pzq5236rrwau8dp79gxixrysbrd004ftsg2zr8nh86mkxzb9zt236bjhkiqqb7ua47372bjs9pekgwqbkgag5fpgl1yxyy769fvwh2tuybwqtdqskb3g0hxb1zsbugf56mlk89xqj0o3cofb9v3v62vm9rn6xgnxsu01234cdszuu3yofofrzxo05dq7fr1i800629mln1vjpstnllf2htcz428iqnus9dfjbpoj2vdeoh0cmryfa0y9mux78d46186t3d9sgzwrike1ule81aicvay8awbloazzb6ss45mpyy49bfmfd92zgdbae48yipr9b1bb06g2mltf17jwkwq0aw8h28o2tdemk7aavmyggrn2wgxqa1lagjzi57x2c4gtcv08814eeewvbs0ec3vyqefh7qw06av1plwfiuapbh5u1rxfxkqu6qm7dbfcjyxc6l7ulclsfl5i5a6x5vm3hz6kdqoye96fqlbtsv2b3bmp2j52z6wkyh2cbkqitb14cjkyhe7k6af9pn4czoc37b14t7sdqvrun71wifqvj4hb1e5ek6q4l2uhak4z591xyg8hkzp64lssvwo7ico5umat1lh6bkiu9xe46woruf7k8cma9vqt8h1bnjr2rih3om7xckqw23fsmi8mi1vwz8m2uy177a46k5gb0uydhgccufzhp30mnj8xc7rctmz7s3jb0dls8h0dbwtjs4m13ijmy1m2trgaz73let9h0d6vgwsnzlpbk1p2t0rysv94w2e9l33t89srq9ckowrpubcd76p3h68zpnkn9049ojcp89qpzuo4tjk3b5ydfvjt5y9bn926ch6yprt8m9vd9w9nonergmw2j9autst4l17migyywkxpsxb3u26m',
                proxyHost: 'gxejml3yxlfgrkaui3dv8k0jscy7ug7b62uwjx8ad08tnfhyjsmy95swy1ew',
                proxyPort: 7606688434,
                destination: 'vkrbmf2xsy39jbtjyo80vz9tr1s4b8qnf00kskz9cbj8dz1zj6jy1zo19vkor02xyflrpjb233mw6gxjqii4tkmrbpewwlwrwn8bs6y3xfjsnc4lasww53s7yersi2inkg86s68l9g7qhb8qx2x3b4g1lxmikech',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ifonf1yucr7gc47janxvffijcz73uwm33sj9n6firvdre87qx4g9kqbr9yl77vjygwmijabarjzpzyu9es1oo4gszalv7y0v288ts0ocagx168dg4iv3qm6gwape2nj5o1kioyxmc4b0rxxjjja8kc7vsric4222',
                responsibleUserAccountName: 'w2j05n9zhh2sxzbamdu5',
                lastChangeUserAccount: 'b7mqhcz5tsvzicxtqp23',
                lastChangedAt: '2020-08-04 20:19:59',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '2n5t6q82bfh180s6ueb514i2rmdeklawq5msjat8',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'mf0vv1hv7f9vi5fq0w4njjo7kkmfwvbxrqs76e9uw1f8wusj3h',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'onud1tq1701wtr8ai9xm',
                party: 'c9xd3ndbjuxf209ov8h9wprpp1tg1kj1q0831drxse3b5nwf6adisqhcz8az9c2i6degoakrigpmb6pyoq8cupwhnm7qurlb62e37hhusuhudh1lrveafceo8oqakedl90yynaobrhritmn106ge7vlgnyz6bl29',
                component: 'f4z05epl1p1ilx680xnsdip0k47ajjnicasnql4uz80wdq5kkqw4fua7nagxy715kh8l0jp7qq16fjqdwgpud2qjhmcl8gx3z4lnrhprsvh9s2kcdh5cmead47xl2o8vh8m4x6tl8uqcad5r6um7odj94t00kgf5',
                name: 'u91h6fwouxyjwewhhrtwnsiyagqx510h0usrejyy495l40xuvu3s2ssvj7ngrtdlseynluqecdmpaxrrrdq39q07glawrp4yptl6qo1eq1swq14cj825rce54a2yl2uu08z6tiuukyvlp5mro0u073dkybbk2j3a7',
                flowHash: 'ule96jin215cya0kmbyzfmmrid8xrmyqhxao9sxy',
                flowParty: 'oo1vg7djfqgkmqkkpb30gp9gdrb60uby6syq7762vbqikd4u3v4qrhq108w1x83dfxh439slkkwy022fov5wi30yq8o8zuglvcknsc8g2y6qs60lrb2jwq1iaonl12codtekl8g5n5lbb60j0d8fsmojqjqu170m',
                flowComponent: '4v1hbm1gc996rbdtf0ucnjernpogv3ikpcofvx9p46myze3mycx4hrnbqtu38kki2ikjds2ldirpes1o69k94c6h27o9o4u09gvitgsn1ezvy74q7vyuvhtftejpkhlv050213qjlz4q3230jxg01kks0yzbbj1o',
                flowInterfaceName: 'p4zrguo6uqij3nyg99p5dp4iorigr4lod4b1khe9jn7373pmk95l9075c25yqfuf4daytguywksxxvxrg62vnmg0moh5nia0yqqh7homvn5t7zn264valkxzbk5wjt629rmugpvkie1lnien5qizdhmuph0id4xx',
                flowInterfaceNamespace: '0anmjo66cra19thp8bw69p81bp9bjr7wit1lughtu720x94x5d5mf9kvwbgjwuz62zmqbiun7pf9a20a5wfu8hlkj5ttjyb9n88p494njwhld3mcz6u9cat896dfk50745n5f32kclwvgvic0yptgd2c211afjpm',
                version: 'qt9bs74wcs7gggko9u8e',
                adapterType: 'cwdm0hgk8ox5a76v9xzw8mny0s3960zzjcomywuygitwjzq5y6mz9iatrtzm',
                direction: 'SENDER',
                transportProtocol: 'vcmwm97ocjt32krs05hlfc5o002jc8veb5m2on0lh03no470ap9higducbv1',
                messageProtocol: 'lmvu7i0zqno1cxeirgeen9zx5m2xovqnhsl24t0zznpvcv6h7a36jltj9bic',
                adapterEngineName: 'wjfpx14qnrci9ufe47suow35i5ijyaug57lagtl4ofcxiyuy9ufrbnt5cdimoi8uhg1fk43qn0lepiis7634jz3kqxf2mrxbh6uatii1mbqmt3q6d930jq5b1siu0prn50vmjwggf74xalsbp79k3p0xo2t79h7m',
                url: 'n4664h8stoz5btqba5dxvun9rakb11po4fzdsorhmk8hu68btyq4wkvsoyg9hi0kh8yzewgvqobdp1b23tqc6epd7ak34uo0vtj83qfg0gel5yypf3ne1h4lhgcjhie7qdaqz7045sg94dxvkaw6lsindk2cu0rjay9vgm0j9c4cxmuzx22a0jp144ch9m0shbmucuqxgc4hlsgljyu8hhz3f2gnuudriydd7ia2v7callmi8sfc3yecaxytm88lmdlw501kn7znni2aiulmyrmvj5xelyk33xu7tqd8xw17obfifce8chd6ozall5ex',
                username: 'pig2m7jdhxlw26ts2sgsmq1ckkdv9l8yqbxw3uyu8fst49dvz8jsc6el75zu',
                remoteHost: '84o73sa1qh68q4g4cqfaztl34164svgj4e98pkw9l7afuco7y3ubnfh552exo6v8n58nm3j1sg00lmy973fx19xodlspiw6mgjnz6yzrpzottfwkq8k1w3dx256gt7hka0s8fbanaaqv9vogpw85mgefju2hd8jt',
                remotePort: 7699649617,
                directory: 'fpauyctj1fu4eqf1nqua2p1f9y1dm5ao4z46mipl49lau1lwnt9436vz31f4jjvvpzgay4mboig4cyydvqbzrqgm596dxhqm7bifzyk8y7nouu83i2qd6hjzt89saa2qrk0h8mlth2swzkehfbxd6ao1395y1b2fjwmpy8rhgju7ahsi9754bxbb58230vranu6rxpuj7kq1v3litkkb066n03385kx4ue0fmse29mybwy6jelm25fbnu25s6k620m46so1s0sr4fqw09nbptqhf9p805a4zo8ze1pfhi1k5ktog1syjzwzukduj3ii4qf1grz5vz5es3ovut13w4n5g60tri8e2qwmgbrx5nq2feonkal5po6tcavizzw80vuuwax9lfyehyhiq0qc2x2w40zmiy9m1bzv9ykchqi78rh7sww58tuelrg1n81yijsa4cwjw8ieieljd17ht4tmp33ng9pywsivwn15847o1bq006i1wh8tscuwqmteyyyqybdv4d382zukxf8zh8zcmfd5ydzuz94a6z4zrkzvu8j5c315cz9vy5hbecgda4u8r2fk6a3uouyj334nq4yollwi34hmzkv6ua57wg66z7uloexnoafu4p58yvqqfvmlqbbedjh86xwss9mgxiv0ok1ixvfxdatg4v9244i6kbbxf96klle9ogakdg6evvrdf97ezxajijio60cxmio3ama9heh30tinwar52oc9w7xmj27yk645z8evk6o6ps4liwc1r3427etbry40fkzcudiidblppz8qta0wqkybhk32fzhp13gj5e2o28xj8oaml7ls9hbqth3tbddcltcw2kyx1sll9s7mz58t4wcv10kydotu9nptgopez7ful69hamvc2mpextnycb9n5rc283z17tk2f4ueebzwhblje1jsr9d7b1evvnw44fxxpphrigawa6r55at5ztqtgaf7adrtlsarsmtzh3hfp3s2kbetdwy5sunw41jcayadz',
                fileSchema: 't92pg1fyt9flavj3xlbke6c7mldp9z6oqk1j0dbmic1ms2jmmnnijd5zcervgq70sm9fmq3oqwzkduhnokff52cso2x7tpgnqf2u3u2d2catk3l7eihvjl8b8rwo1k0v31podugjr0l5906hv9wazffe41gn2cb2xbd4af48rpt5u5gccb7yvq3eyczwv8o5simhpy4p2db7erj5b978y5dv73la9ots98v54w2ndf1ab3jwvnack182yi9rfo6e7mt2phxis116kl58r3ml9ghrcb7h6fmvvgo292jpfcogbifo1qccxwxlxvxvwqhs425qmy9dwvbkeiixog9e15bi4dpw0yplpym5u1sgyuqgstmlbfmqplbwu5qvcj3k5p08i8t76watmgh0wph3o7apg414hq0klsv62o26m29lop8r865l5qda9kw20klo1jrjafhx35ie0hjp1f3ktvf0z7ig8do511po6f7avexyhfz8ix3rv7zkn1q51sx8p12k6vtsimhuj5ccmwqymj51o4jnuaxt7i3h3s76macvng7p9ktfj8gmuy5mavz0c3gnhm3u01xg1tzr5q4ytft00vonhunetgglgnkyid8rtka92sjun3qo7s2lc3aemvedmqkj4mpmpwnbha1qqwjh6qf5a8drumk052dh8q8gh93with6x2omfevhlp1sb2g0tvzcp3jm1139vx4ccy73c4wrjs8n98wczcso5qn59yamqxplj3ddrv00t565ool9onreky6oxjh8m729nxqyrrmpc9i09alqx6iw59msma1zw3c5qqmxft8gxxgwc90wf0e4wjzn7cjzfji3ln3n7auq6p4kiqpkugrthzynrzzkwtm6wwv5fdyu1kcv058t5edxrk35dmgvs9jv6b7u3cs58cxt9ie10q1gog3uuty53q7rws8rzjj12vmc181xj0ga1a0eijguf7e84igyq2ohnp5jymv6ss44p7fe0v2lw3s7c6etmzsyvuje',
                proxyHost: '6oj7fps9eq9v51180qj8wkj8jn303tot4ghil4modu6fwaujkyuiq6x88cks',
                proxyPort: 5753744422,
                destination: 'hpxrbw51sm662kn76n0ecusu61usibwujx431h6ijhwq6tjlldsgm28q6zrhwjohkfdjxq5espl8ko1pc54kkz3ygi6n7rjcypp5f2jicvw9cs91nwm2oq8zm0it7k6bdpkofrkn3jfh96ywg0eimxotp7zwgrau',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'swa68m9k1g2blmil31mcwimnqwyjzb6zetk4tct9sabkqhceasg72n9a1votz6rvu5n11x350paegdve4hfy3awctf6yp37njy8eucvzwn3j9x7l3tvn352th889u8ojp7m2gzqne7s3gcuzezeyzv9sdv667mai',
                responsibleUserAccountName: 'rdmvslfpjxhcy81vtj5y',
                lastChangeUserAccount: '7ajcsejvd5rmjnmugexw',
                lastChangedAt: '2020-08-04 22:26:36',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '6ddoaunnjnamkh6a0rj5ise8ivg1uwwcyhz5rc4o',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'e30137j8q582g82hrn0be8vjt8xe7e3dymn2ukmuqken44trjq',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ml1d44ol6b98o3jm3994',
                party: 'tcbp1p0o14jw5ta679l5vrvr8mih9haecpabrvhqgvh2u6nb3mp3um5ee0rdvr2yb0s83gtiqig7d32b7801oarxeioxv5jrbed4nrr148erhjkecahavvhstfmz69etw6w4yicawk9qxwuio5mt5738ewe5vomm',
                component: 'w2p1hglm5zppy5z99mcaaxt22ifwxdo88oumlv5s0ie0f41v61z6r1qvextx4r93kc2ibg5aj07zffudcuas34vezb1u0ewyfdtypdrt663m5760c67tmazch505xwgdgmmpw363vkdkfj9qomf5znw7fh8jnz6b',
                name: '2wpxrdcjoxzknoom6cw9fslozcb1rpau6cl46p479vh17blj99rrky85niz77v8iyg7guwnvvv1r3186jpymhu11s861ba9e2tz373g65dyx5jl0l9wp50169qn1b3hgpakehdi6hip8ko3otcq2jmmqkzimnce3',
                flowHash: 'unljjeon7lvxza2ejau47fsdr75ndzu5v6oa62d3',
                flowParty: 'ykgwzrir5sopb70yorgdq4du5ewatnpya99y1mduidg93vxt4g97w18je123tnhkg5pz0asdhtgvjj1v73561t90bcpfwbbc2kbsg1d48mq1uxol6k482a718o5d30lo7zm1kuzgppot7pp8ma9e6dhpejiqekodm',
                flowComponent: 'v75xgsq9w41fnf0m8uwfavfhdwv71mhkhadn5my29h62f872vky0czzarkudvjb7r5exq3yzdrwa7l38bdbg19kjh8aggscfin75y2ffyqjjvrind9y2p4ptzuc2boicrzfy2hgmduunjs85wsewjp08sodti7ah',
                flowInterfaceName: 'rm86up64cclnzvchmaosx3rcrjdr3iwxh6rnkok8oauq4wz0rnosq8hosl24vsg7skydmoyx5igj5qxipbum1uqqf3sp0nxpvyv7ibcfyx5ltlytz13eaub80eqwi0kkdnymur3fn44m7enqsq4uw6891ujyp6qq',
                flowInterfaceNamespace: 'n9y8qi9d2h3tqkmoni6lhj1d0cy8oq6sco3vy81vc94ou62x5fvci7ts490i6tbgw5zpcvsbfrh22nbxk0shnfreezcvtw0518l9itj5qcwzloaoj2dlzmde4q27jab3188mudg3vt4k0lgx1qhkrn3fw2q0yjh0',
                version: 'z75ww4c3ju7zaak9eqq9',
                adapterType: '7mug0d54j081u6i13mvi8q5awaonxltk3kd66gscs7etep50zkubxpc4sh93',
                direction: 'RECEIVER',
                transportProtocol: '28ryja6hkvjnlrn73e0qqp7lwa6ggrcwl9tsef452d4qgql7yexdsm7uvr6e',
                messageProtocol: 'ep1cgy3rpwolu81uxxnyrvixdehhpz4cigd66g1dwsdx30kicwwtoy9emjy6',
                adapterEngineName: 'aj5g7zj5corzf8l2lzwx87hp8jr4ltbqs5dipkphqmfmcubvnk6qxnknht1hj4myevdef5sjzhn90lf8dnapwmtrkx41ba6hl064x10sx4srllga58gxpncc0wlz41jg4y2dvt56xq3w8v195dcsch6hmpedryxd',
                url: 'mc86nvlpizphktqefd0wy42dzdgfyb3ulcieq9rwdnpuchkz9lbcinmy1wlwva0u0l1qcpq2wrb33dh15hhko85j9bjk5g27vhu1n8wm2mdztocwsfaqr9ddfj5wu3ph73dwsrfv5u7jinb08p0u72d0hcno37gvp5ujsmypiu3n3aed55mp4mgot9yrvhloikp4twyqbsr4mxrjx2i1uvz8b5f02eht45u0lt8lu88o704tt0wva2suftp8etkvyr4whgz8npoh62gix10zvquh9g4ipsmn5qb581uw3n1v3sabx15ow0am3vawymh0',
                username: '3sary5e7pd6agsxupdi03p893nj0f829c91e2me8xmxc1unb3ufzzdton762',
                remoteHost: '7nklo4p2vz9kteda72q1cavd17i4pwfst1jjtzgr6ytrbjudp15v30ymsonbeq4a6xgo3z6x3wkszjs4tmv12lz7jo7cy1860t01r0zgx7pnnq9qgx7qktda451z33q7vjdrzad1giswi0t24lqr8ctp2qgre8ro',
                remotePort: 1401265997,
                directory: 'lfsburcrascdxbju74hunhlr2f1xhp4nb6sbcgxksbtblnajs5wlhas9wmfj942n5aozxkhbw1x3xlvwpms3sbbti3qha06f0lukfuz15r6twlpdkf02nm72arhivxd9wdr2m50nb54cp94je37vtqn1dfjn098yhf5h1mvj0hr8rj006z7ed2q40ze7yzyh9vj38b8imjhmvykawljh25ovilw7ofhmup4ayptv1tanrn3yjylk66beibe6x2z6amva5mgiv7v1dykmra1fqf9ibv0f6hk1fnl3u2gwpfpuwtri7amxd12ntc67eooqnw584gsy69q1wwc844v6rig2qw2sfxyikzi5a6vz6tt7q91s8ikv8cl34xxnyagox8vodmb82t0vj0ky1jw550kqllfn9egsej7egnrtxm7vxpndvursry7x0zebdy5s43f0m3oc6ddaprmm4ffceez4dga51qbhqn38kiz2axh8osxq3apnzgrzavecr4cau04cp0uhmy647u1ijhzwf8i1qnqb846n60s1pes7sycus5uzncm0kmjfbxkdzw8b6z17sxbvc33wuilvoz4yd1ywp3prsiulmckru3blywg7wuh4ou6ynjqm1y8ynv1hsr9f1vsa4hz97clkguepcue9kgyqnjjqs64aocz7dlm138fukk09lhs0zv3n7gy04t8i9korwjabqnt89eo5rn5iwlu59h40amk7fxeuf6iegnzdyen945eya9ezc8bfgim0sianfuwv6vbvx7n5wn3vzegpkjw5bv84194fcewcsrlxjqejw0j5ryhl7fvbxm17aepohmotba9p58orlb6nwpvwv024mqjbgyseyof13g2u5w78g3qvdio4uv9l3t5b209qmwwizff6w0go6563xcmpu96h4tas10zvf2t3zdy0xis5xfggm1wejge4fiplct362nstpaw7bt3akenjnkhanjjrebhx8x2g8na01t1m43yz192hyg9fclyq',
                fileSchema: '4bzfmj3btkz54lxtcq3g1mvkljpng3rih951f1d08rvlwwfq7o9tc59id9m7cs013jw16qwyspgkp36qwcowgv52564dvlt7je6190q74qxqmak0xzt67m7k3eto3eabem3v2uyssk8v6bd9rdeiebpp4gtmcy8i5kpyxp4brgyyd6hdbwavzrkiyalc003kwctdbexccukrvdzclkhpobk97kuujkp90srqd018t4iamp0jvo0rlqavepktuvbuzo3kyre3d4bj0ehit2i1e7iaax3l3t1fzygzl6fksjfdh6j4hgy987gbozwd4pb1fam6tpehhljz58n7baa7i9yuh53rjv4742uc3vtxhg2ul8517pi04bldbgm2p0s88xeus1a05t69e7bfkdhpqvfhakw5gi44a4mrued83ndalvb2uih6n61httoakms5w1nf355flsqzack5uphkj84cvkb0szma0fi6xc2kenfis2thxs6b86soqqvgh93nhixelaf8pvysnj9sg4kza53yjfb4qx7tnraeukpoiwdzo7dz3pwqu4yh9bnz3bz10nd862bdachymcqrq362kklztgxvtrac3jxvu6ofggy715v0czrkq9rzuicoak7jp5g65iwxr78xcjdg69js06pfggk7oze6fxyhs228mw6h60zzsm1gjomx8mz7109xa3vw0nag5ocgezkzin5qa5cmbhtzh6dq0efk1p1kyz4bc91piqp6t1na0r0mpm8ryjnxi7sbzjz6fwkgsdb3ba6bq0zk1e23rtgfmj1d5qrz5tpua8tdei1b5n20qh30kklt6367pmmzfpn31exerz3orgct88dztydq6eugu88wfg3r146eo6kg2gmyu5tcqlhfwfckt5dw39pbdrzm0qhnxpjntjypmz7oq5xlsov7mohz0ur6b37uhvdrgo9z5d6hayapwpesun6gwpsyivohz8gimrsenb36muy9r4sye5sa73kt30mb7zbese47',
                proxyHost: 'uqvgprhb59gih2869kh9f716m0i1ig07cffmvecscm4v2rmsduxgo8zjuqfe',
                proxyPort: 2032780967,
                destination: 'rgp0hqnansz1m6dwtswzsfx3pbnhgqbfnm5clbhazmblq9labuo1gzhfupi51w8166jxao3k0gbu5hvczsy4uhnhzmng3okfif385wvf68evmb75o3357qmmzjyjt4w7dg0p9l6i0lepzyt0jrchzdnj47f4vgf6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3l6b0nhrbmx66laq2fo9aw6e8h8uhvgbipifzvws08egea8i82x6yfphy3egnqhirinze1oyexqaf3yxi04wlfdqc4prtdocuuzhxmtuoa30vnuzok7g5qqz42jrfri47s00h53n5c8xduecj77wgaxb9asnoktl',
                responsibleUserAccountName: 'r4syvct6fpead7r3umlw',
                lastChangeUserAccount: '251uwguhgvcbsjxyacka',
                lastChangedAt: '2020-08-05 05:39:18',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'r63b62uf1yyd2fex4yri1k6e01hhmwgyts6q6043',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'bk6k658i0wnxoaqegb9at5e8c8hqtclsqh7s9t0brqfozgwj7s',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'flp7nzwuq6opc90viepd',
                party: 'hrq36ukaa72x7aztqckygocq8bi0jakbknt1e71hybr9ylyutugtgb520xhf7wocs6zbnbjzyd2m0d8may21fouem7ya6yay6slhw99qfkhpgrw6965yj3vikd4d1rzwm28q02zkb60y9sdazoo41a39i4zrolmm',
                component: 'g05mxf4vs5y5buhqo150ekhvuryqh8xhp1knce1s3y6yvrfhr1lsy8osabgp832uumvxvrerks7oq7ohv42fx1mztsh450d0ab429ea5snx1dljxy7otn9fqinrxej9125b62lms6zk0vbr3cwqsmqrs9ip50ixe',
                name: '6tfmnp02euq1k0wi5fcga5s96ax4rvyter1cj8cfqbhl7xfqhgl8hva3n9wcz46n5m5160eevernqrxzo59xqy8vcs846u7tg8yhlir8oblkat8qti76p2bavqv7dpp2zfu247zw934ycnt84yfvvy6kixofozug',
                flowHash: 'cmiidjn0uk255estlb8o5q62j4oc1nypmslszkig',
                flowParty: 'bmdgyvhuloooa8isaon9v73lx2mgptmnhmxkn8f7g45ql8u4dqjdpx6wc4txeloqnmfyuy72v96lbhpggcih10n602906fov8q62u2k99okbjz4rfm2bibgekcocbvok490zadniud2ubsiiqftqbdygh5l08gug',
                flowComponent: '99um7x59geoowkc5pqlhfes1qxp7aryg03jomiktxcubtbj27k7dvqcn08cyxhoi29faujlrfpcfk4gralt5vryhhf2xvxdabohxfjq61gnfqwsp5t1naakam32x4cj1vn9575qx74rgsd18i3i1zfcgl1en9r0rb',
                flowInterfaceName: 'wk0lwsth4pa9wnx4ckjn4fba92utaevamy3ywiqv12rwnpytw8h9ahjdo19cdli2amvnjsobxdod4unovqfcdurksfac5nuigkamghio82q7lgg6a1m2wrkzg5pezmwngklkcfmp06m51gjrj6fwprll2687thy9',
                flowInterfaceNamespace: 'iuoqblwgakbh8xw67hdg5g8hu4bzp060xorltkcaiuo6imfix407k3f5j0dj06y4c1xacdafytw3z5i6zo127s8ixaabhk72ivhb4wuoj8io83q8jzm2ohv4iqqb2cnp6i01utpg8h09rkdcmlykz94jg0vi4znb',
                version: '8e92ogmmabujdobu0cq3',
                adapterType: '6xiwa85lkk67bneigjo1e7ua27k4ihpgsfqical2kowiaw35puyq831wlmyl',
                direction: 'RECEIVER',
                transportProtocol: 'xn1dfvfwyashw6b85an0pov3dm2ucl5aa0nxig90pbq376nhouoqmx7bh7ui',
                messageProtocol: 'caceb3gqjrvqag24iu9g3mzq6qvgqldqijyehw2tb3qn85qawmyvqexr56g5',
                adapterEngineName: 'ffjq6i910fmrt7g53etpg0p21b9ys3sux3bd3aq8dapw7x6ji2fr72rs3fa055i6ha30m9sv3g8w51evw0vad2hnpojneajkp4hjh8mn5sl7zndk1uij74dpgx4mh908jw7ylp9ruy6f8d2xtkb0zkfupf82gohv',
                url: '6nxyjdicxh3xqktk3gdm89z7gxdbj0um7e2dcf9spoae5weyy24z52c6tx0e26ntxqsaphbrk6up5bg3u8huglzqcwh891va7p905e9ebffu69py9uionjvpsck56g5aaeodfbk9754dbh7ozbrdrcfxpjbrfur0whtrknvjfk3dinqm8stydh3uyvqc0ileokr6o27ug6cjnnvyrr4ju95jkub3nfv3v9xz6mpntyjm9vq2ah137z1b7zvy1oz6epttzotkub89xea0csahyr925x5r6qv8voimqn3nhz2nuu68kqrpd1uz2owsdmxb',
                username: '9pf4eygihvwx39nvuf6x624tmc3ogr92lnztcdrqnbkj07s84yspw1bzv91j',
                remoteHost: 'o6hlp0aq9n9gp9h0xl7h9lfxuij39rcrbh0o54ctf03ujw6lodc8cqi637n97yz9rgsv0gmagn01rhwz59gy2edutyuob3g4m32rzvr5qjsa766tj18asmf9zarkm8npjnem9gfwyw5ki1zb40q8bye9bd9xobcn',
                remotePort: 6883093243,
                directory: '5epx6uwm2hi8bwfyeg8qqzm9kp8o81e2oj1qlxwbmpu08vw7b57kp7ae8zphd90gy0a8u1xmo8s358yeb105718yk2jqzuzicwiuztwaua4cydpx7f07zxclrlrtr6f64y0jw4bdopyr610i0y95z44qod6upghrboy9jy0o9m93t99ngg2pw3azy4d55qan7fe20a3tjzc51fdoi2ywd36oen3116h1atn8i1ks49s3ylvnskglntujnfpdnzpvdhfgw7jy59sp8o6ndg9r6ypb0opd2p14ijeeu11o3uqip6cyvplr18dq7baeey9zpdfcfn34nrz0epdnrklm7txwmfsxbdkxfgq21c4zt5ty99og4gsn40w01mu7igcv3z5f1n0eex5yjept9r3agvhekyb9bpprvdew0o3hzp2dat13np6ulaoumtrkzof54ouysuqswywprd74gxwb4ka4evewq8d0o1wtnj3rdgl6h8dnv7ahya2rp17h9td2otf0ttvsb2dvhirbs0m5ne3pir6tje1ybubd9slx69r5hqaz2wsapr5nb9l1pjmv46bgzzjpput8cw9x8aw7xs29a3x7og3xdl28f1xvervl0z8lhvn49mbs0ccrpcjm0r9t1dkyyb2qhnf8ikb3wy5cq1p6oz7syyj33ly6f8ylrclozuy5j1noqlrenlj53ghpwtknk7iuu0k8clc5thcd65bwlf5g5f8ddoif1yt1ngq29akr4bwqcuf7gc5ir65mzvkk0a1cpvs9nuajfvf4ayx5fbv38og5s8gf33lv0cosq64xrhiivra7phsvfy5l3v16t9trm4vgbs6iw93pdkyxkyucvdwol09a5a2xoa26fvv4gkjxqbdqykbowvok6bx640j03xz6w2ornlfy1fulk6azn1szxrbf3cmn0jrs7pmnwozsii0mlnzqises7gpa6q9znih9wvjiqsvwtowtvrrp6hyioebv62vtrzhue22x6ybig6yp8ht3',
                fileSchema: 'rwi5lcfedbjc4g0www7kz4puhfrx33a15bweexfgqqhrfqg54260619m4w4s7n7m43mzhqhl10b9hhsl87b8a8t9uldaoaq8a2zvfveh3yx7w4sytxb0tkhxg2p3vbgpken5h03r7dt9l9fnhfhmzbgoic3k9qdgb69absjge4r8lsy6bvxb4siid1xjrfxst7qyz2gjqsgq2uns6atxncpx3xjb9rbd23rl5nm1g0solwx9bw5mlq2rwmqwftq6bfs2eem5paritfv2he75x1oftci2phu7dz7yrzbhqv83o7frxjba587xi0yrc1txwec5vmwxtwx6mcipn4j7wwsz101qh7jwn5it84npzzsmorx3l6j056n1wvb37rahb5ul0614qofanmr6vdtkjqyxffs505p10l1c7nm8rn2iedrzjnaf0l27tqlr4ai06ybxcemb3n1xz1aqxqgi1b1zgwi6tkivqn4okecm6ze6usd1z8ki3h0zioaz9xgomuko5uubh4psvi21qk7cja3ao83lt6ihtjcnk3z22i7iqunlyor1885cc39dhvyr8utc9l9dmfzeh8a6xv0qdy10ty2uyomq6u0crwdu213sigh35wum6tasbl0a8cuie94if7y7mbpv4rlluhpsknx0ibxzaqb86b3arsajtujhz069nsl4xmunavffib2u3tal11kbbzycvbip5d5utov5esjgf2xzu5e0bxya82lp4962u6u4uklkpftklnh838kky2oqazbtw1eyxbzydt22ieprtt8t8inqhummsid2h915qf96we5lc7og2mvcr32591dol8h0598aq2ytvl86ow9r98910ikkpxxssun2msxkbllxpzhku5xhr9y7f9ysn72pyc6zuj2ajcqjvyiz5y14g2ytwrh5plod7rpi1ueif2mjvndq48s06u9qij36seqkqnohnofjgfymin9x0tn4tj1iz697835ln84o8ukm9dlf3ik9bqgo3ye0',
                proxyHost: 'aoujhyhe9n4ap8s5hot7u4a9nqcasrjriy7kn06j3pxm37art3hjr6j8ounl',
                proxyPort: 9624333030,
                destination: 'c18ewns1e7gp3zrock1gr61yv9txtlfrurm7ye4fuuwzwiilucclfu29qhkaoxrkqpdrnbfrzqrczanrwyzfgm2pxrlj0v11yfm3q2v718m089fya62vk96xkbtpkiisydjar1zn93i0vicjoituiqk186ds5xco',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dv27dsnlu4hw04mziyyne890sjxbu0a91ai10paii1kvj8snkbfrews6pyw7kkgfm7dz9y4qc02qqjlbz4un7wrvfqzvzp6pvyhhcttsxbs490bf9a29ld31z3mqf702o28rmudeb3yvgbzg0ordjf9l11mlljs6',
                responsibleUserAccountName: 'qfrhjy6h595i5cj2yvm3',
                lastChangeUserAccount: 'yyqea3xzlnswyrtblfi1',
                lastChangedAt: '2020-08-04 13:30:28',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '7kzsz7jhw1umf8smr07o0eox62wrhcz3knlqnjfi',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'rcy5ucia5u9hx1dntbckoxd39gkq7olrjq8rzwh3by1b7s1oh6',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'xdt3w0lfeq0hufbfb1va',
                party: 'b8fu61kiic72bvtfen0g8dtehkwqh7934z37o5njoqri4736jdkby0ykhokhr904l0z3llr9xxb7myj6xek5whwmbqu6p9jy3thnijr57jtnbhez4zsrhmi05gmgb7a33ty746yldjqvat5s3nk41akb1jnrhouy',
                component: 'kx8zih49wunrhepejugw8fzcav0wq81j1kf9zcpy0mktmnmwnxk3ofwp8v0qfy7mt42zbarb692ggjc2z8yr4j3hv5ubb2eldod3rasosavaqanmhssqsukaohr79ox9unfubryn0inrqnfoe9phcx96cbaaoe8o',
                name: 't6a4z34sqctte4er9fkneikvfa4p0inc99fn52rlc9m1u36u89u3d13ah4eg9bfqkvjaeyuv6p00l4vcec4qr18xqiea4hxnusehlhkzzrnsxetcik35hdo26ez449jznny9z6ninav18k0apncznfxkmk977dbh',
                flowHash: 'xfdiscdbbx23pjidhpw1dezqvsqo0qsq5mzir7cp',
                flowParty: 'cymtdpyfoai3z54fcilt9bbtxmtu39jo6lvztdkcpjg3okvfnd1m2ke7sbwg2a4fcq2j6vjltklbevw6zkhrnwd3efvegjzcz75kmb7ou15zgr443tnhroz5r8qg21kfbpxkzbu58qgycpigfnbgiqla15mp3cxw',
                flowComponent: '9u2kyvgnnyg3auppj3bno4oijo0lvh7aobmzpb0lg8na4h8de1aq0cx5nhartxxd7tkugpxsxurusnccr54jabzb655r89u7nyzijb2vwn1phiaoo6p3uw3898o9kqnzd591ihkxrd9ber4nwn2lomxck2o2jdmx',
                flowInterfaceName: 'khypmfkh0ljou6cm8aoxrf2rnk5m1fgz1ggnbogpgatrmac2hbv028g9x1xdssiycdajcbmlbj7y5sd41abc45jsrr7gi32dpw3cltvlqboxbzup3y689q6cpsia49nyn7b08mii6wesqvke49h8ovd9mtvrdhd51',
                flowInterfaceNamespace: '86jqmyb3dcc65w9fzczpvho29mgdyespo9tmieq2cyvp3lrb1angpfgrakszsni1o3mrr93selh4ey91nzhgclqc7oabmxrf99pi93hp5k474xeiq9q818nkb04rpyntjpcs54j7c0s79cyo2d8o2vqlpu97li4n',
                version: 'h0ioz4xjw80rfadpdb6a',
                adapterType: '4uwsdgti0avevi8blkq1rs0r0k99jb4dqvk3m10lin330gxox8g3km7cz4fy',
                direction: 'RECEIVER',
                transportProtocol: 'ry3b1g7qftbiv8f3u15rjr6b4uigt1kom1ohxkh4c5lwr6r2l62ht5ceo3ts',
                messageProtocol: 'j9lakdjebvtydltcbsqoiibm6w3xb2p1zd6kdbdq3l55t0gshjs2315gtnuw',
                adapterEngineName: 'lcdwrmn9vgixcrs4lerg4abr8essocbjsc4pyqh9lyy3hz7duz1dkioo8b9qgfd5dgesyok2x56wpz6cg8gpxcxowv8hgxt1q25oqgmkxh81ztjahwqnp4tlagh83icvmrjj8w34ai60djog7g2ndz5c2ns7ogj2',
                url: '6mg42bk2deioljp7yeb6t6qepwa74r7csyjfmd10a1hsmjoaoiyiyw9l1j4c7f5k3s5kb9p40ug18lavhpgkhhqc7j2rsq26dwui20emieabecicq8mkl7xeu5cmfivpbvvti6pzg7d19ymgomaqk64rkqhmiwlwolpclitpveay2t38w83r8mx5424hkcn3ebvl8suie7mz3v7z7zcncmw97na9zvoz4de774p3ux2g6cztgxlwifftenk86s87a607wo7oi6zmkkwu6wfiq1e0ac67q5avzojy270iurawbkcma6ieadsv0mnks8yc',
                username: 'xe9uyp4y3ebaywum4omvc8olfvsepunqsrylxjbjqnx1ym0rl4vqha2kz1sf',
                remoteHost: 'mp69jmz7d2dprys19z3o47buzjakod3v3y4oi5mvlxykv8hop1lfjsk0tswvbbabp4wjjrqmqk6x0pyklfya0g1hs50t788py0nzz443fp112u8wwe2y0nun2jnppmfrgmvrkm5brjkq1ywxmhoybm7g8czuwuvs',
                remotePort: 2820422550,
                directory: 'unvtxrc3v64qesaq6sx1cdii9zzqxjdjxbzjd0fdk85aj8p44z1b52qzrh0klgx5kkeoiabs23py20lamoegttrk3dz8dgzo90sh08789wn0di8e18a5bgcu5lrepmmiecqtliyavitosz3po7yt0ujg4pnea267siw1dsf5325gwit6u69oxy4hptm0wk11ld4f8ir5bgo1hk21jralxbvdbi6wo6w8ytwl044aos5f84m4kbw91q9ckcf5jt6exi76lng2wg1yve99m0auec3xi7ipyaty9rhn5gc3zwijndak0hrwtosyofdyw11yhmwspemu21ygw7cgsc4jmpjno47qa0j1gbevrmy23frhy8kxo9swkyznza5rxvmepgikbj9li37veqv3yag7pe7d71l75djb78a7dyi70qtnyssir9z5gn781b9pv605csrr537qxe029vn1wdo0ao9gxsvhsficqh3y4hwrl7jj0xndlmrlxlcl2qxkahjjiufia36o2bs5v6a567xvz322zrs175w1q2itfx2rkew57kbbdo923991lves6te6ulqdqda4jnsflqssm1k6yk0x758xni2jg3hqr9bh5i5s9he8a3gjsv1qyu48x7qjgfet9m6v5qvk61iv7tuarz12p9rcmngkzes9x925ncyxnocce2b9g4vmtio1mamweu3thb5i5y48e4y6b6nzrfa61ne6wykv0267h3q77o6q5s7j6q6dt5lgyu71vshse374syukuyme1zegxnt3758vc0nhkaybphrz1uhozfbyi2pnk6olq6wg8cu5bq2th43zplfu8awelyk4lcvk115pa0z5aevzn7ht2i4l7660hg93u3pnw7vaim4lifc0npyie3tmqaaiqkv7z3ohn154yio47qvd95dlys2qxsweunflr37s5rrm2btkphpetpleuc6z7mo3uscnyr2ua7jekzvngvltd8x2gkubv9fnjz017h4hcvwjoyodbkrr',
                fileSchema: 'i67tvjwitgxun6ix7o68r007t8s5f15q11ur795yw07ysnmenbrpmw5jtzx813gkhwti1wn65nga6h4gri093lzdgiq78kywmio6089jk5zljg0yk9rrumjz96p2i5z2myrxw5cmuai2lovwxcya88r50os0adxol76c34nwnb5ar8oqj275m3ryuztxrbc84e1bie4nk4nrqravlitn1slhikf0mj24jrdeegq5ek2dltmb7ansdq8qh8crq8r4dqyo9yb9luyohjrr8fe1joi6feidomx6vpm32cihx3bezxrtnzkfxlanzf3608obfuish8tb52jqg0tan3xk8n9f2rdlw9r7v6i39svsromntlt0o246q0fxaao18ge1yajnqumtxt537c7p3674pdkhf10gemw62wzpnr82e0fn0er26f0xpeqeqskpd6b5yi9gr6sqxr0chfckjiejx1qcjmrzzaf416wx4p43x77cmpjt6qopv5ron3f7aa67ia517tb4oiisathktuikjnx3ld6ke1qo83ckr8m5hwxmde9yiblzej4mkxg8090ise9uoo7kbiq64k8pvv472mu0c2lq8ezhjigput0kidid0zj6s3na580gv9vhw8at26jlu5k64t08jar0djteg1wwg52u14om67aidhvtkg6fflis5jq8z8ct6sgu6myuwzds3p45sqxvdtoabcvxhcwm6g6bkf1ix6kpj1jf0xc8dnefpzeqy3vg2pq7ahnxxedxvgm4avsuppj24lg95b32q90hoxfxj83ll8j5ioa1l7f8551xrhmhxiuceblmflv63q2cgpnjunqmir4co53z44m9webzsboa33mhjooen2apyjx4t70d6mxoxeai1qknpu27qrye8abo9n35xqc07a0uo91d0z9da3xgzxhw1rwbfyi6rltwxtri7zluiyr63dywjfp8hv9lp7bd5hm7zl1e6yaoplzbr1ium4ix871nzch2ap0sqxldl1ha',
                proxyHost: 'ix16x9h3kjpknxlb4zqqj93kxg07hrv73tmlooa4hj8qp2wnnetmgsjlh1a8',
                proxyPort: 1897047652,
                destination: '1mt97xadn1plfjv98wndi9z948p1tb5jplh5dsmc0odam5nk10gcxu718ey96ng59jous9j7c3iih7dgfltey65zprwi259w60xssnxdmbjjmra9087qip769f0f9u95ckl9za6zdq62o27a8hbf8qvyd0vjjr34',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mrg6y9w7equg41qf372rijp33ob2c37z0kqfcj666jf0zmvqt26js76o6qsvly258zhmzkrnfepxkfzf3ix7fx02cb2bfpcauy24nzdqjxtrcat1bjfw6nw8b0ib31its765nacgaihydoie5f72fku9wqcmdfhd',
                responsibleUserAccountName: '9k0jz6eww9x2xg64vmis',
                lastChangeUserAccount: 'hj73r6szohnbgxkcbsup',
                lastChangedAt: '2020-08-04 10:53:03',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '41b7v6ea81wppc4xtb4c1t40qgmweth6lb8awo45',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'cpo0qvljo4wgpxk92fbi9vh089j67ebbtm936u3fqh3r4riic9',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'gsnr27vvosx726wcubdd',
                party: 'shbhjv3iu5a90i6ool1w4bune9kiiyvneq0ou87yjo5b5s416wx3ub5qa18h10abyhw108375mmhm4nhxe6elkjzgv5vj3lwlmnbrs5r6uawfvoyl41hms4ir7307ibo6cvs62e60o0gn35hgrzca3qalszs7gg5',
                component: '57wtz1vg55hlbx60iqgmph5lc24giqjaxbbzpzojgi0kg71capwxqqzlfn2r7py7fgeshf96fwutfn18ik7pmwcfo2jdotli60kk5i2hd0vn84vfak79wsb6bmm40fcd0ihukld7hrr4nf4uyfwiz411wcy4hr1s',
                name: 'hnvj45qyjfy8nr87wolnpcg48hfx409koij67ki11xctlftg5h37vl1yb809b5mww4zzky19au0ki6mvsib29yyzyf312zxgfwijdd8wu75q13arc02cp664jj9hr9cmmsxhro16kkyb5lj5vthlpb3hs5zxyryg',
                flowHash: 'ao6lksdxllc6ge74nc1qwssnh4o6m9jc4t7s9msu',
                flowParty: '46kojwb21xi8cqduxqioy5bbojstciuop4y4rgfhxns3zqjw85of4atxen88gyhkkoazbs563c3rd6jbxzs0iv5j8wfny7ou1ncvmwqzc6vcukaimcyz61kcf3n62ysf3f8jo1cshm7z6b8w8buec2n3tyi3cz8t',
                flowComponent: 'nook7qd7ph0r314v62j0funv9xuineo4wpb6lq2gfxuvwakd3y8dolu84fqu4bsh326tem7l1045lrw4oexuu89wf0ol0mf917njr4ol8wtzhvxfu5mi774xofhrm8so1rty4efz6kmdg2t2q0ajs9t6vxw6wd0c',
                flowInterfaceName: 'kyanhab0xx78eyit4cahmwb4l3agi5sappmjxa44ev76eyvzu2obw37vm4cnerk1cqietir5ytezj962lr1y8ekghgfp6b4x2fqvwmjkkadxowwtt05ttngpl8ipaurwf5ak3m7uvaj9rygjs7a7alr9ioyitjsm',
                flowInterfaceNamespace: 'hq9qu10f3l1fbuy3b8f4x5fyykfc9yghal4wcu95x0sakk7evja1bnacizrz8cv77a757z5qoka2e3sptbydrv4hdn8v7oy0vbqogucssbxfhqb4a8t0lp32yvl2bp5vl4hco44i5khh32ugsd9itok0j47moj0z9',
                version: 'fb7oboj67o5r9ai6oxpr',
                adapterType: 'fp349w7bksuzgmr4ernwpq1u0pn4ildqyaut0ywq1fige10cgro5wldaz9rk',
                direction: 'SENDER',
                transportProtocol: 'hwyyikjkrkbhrowxft3wmg7d808x8hx7xiwzwxni5rlryz6eqp0oqt775mad',
                messageProtocol: 'vpxiybeny0qxajqu8f5qqv2yhcrwilg39jq7lzlym55gse6vgr86dp4htbl1',
                adapterEngineName: '1hn50fft6gw9cw3tyk81frouqxvonqkjqib2l3dka4jn67o0ljc3ev5oy6cjunc07eb360wspw46iadhnsd3z0njg58lawsqzvivpdfh8p0o130k2y7jo12myl97tm6feld7xebha6naty1ihoq3haoxrrbnna4l',
                url: 'yr9h5p0l4hykwcsvkd4x2h7z5ey13elckzqmcyb6g9e8dtb2zp5jsrofvxxcvehrzqliqv5a768xrwlxh0qufhj1ch3p0xh4cktuki21y7awg9x790ujbff8jlz0xeyh2wliz0g5tt61ff3dbkl1yuss99wzswv80hpcxyd2i615d4a4zaq3b821few839h6k6my2t7q8qq9bmnwp0qn0tbh1r5vkjk795xljnvp9wy50b33qepmemhd9hi6a7xscxpcvriu9efko71fo0sth3ip93ze0kax1co3a34r4i4iiigfs4herb42efzhteup',
                username: '1pkoh6pn9teh844vvbwofgbzyjvogimbjee9dsm9hm3g5vvknjuxuesalgv6',
                remoteHost: 'ao7b0ayyqdf7k9fvto36qtmizsopiuw18u75taa03vlkxy14tmx6xu34lt3dzwttdj0398vcol1cv2ue8aquf4gjh6k9eo7yi02f9a7lqigduz25aag8czn9au3gyal41tt1sjsu7dt674itphoaf35u601bbooo',
                remotePort: 9700468813,
                directory: 'ty0vssj1hoeic8wunfrnq6sucfpi4g7yuc6lkbii01adprsbznhq4jjpf4u01olyerjhov8ntp56rrbn7krmffwzzup5vky7t96xsgm06vkit7kz2svf0odtfn5nyfh5hflzakkdmo2pl272cj0psh7enslp18p5gdw110xn3qmdjsrwk4jk98u2ua2qndvr8r1kprrs308kuirj4shp6384x1kkvtkji7tolwqokqlzi7cud4txqb0gbgls8ywnshkqz6573r99xc3rr79blap01c2iickuxvvrqcxrkgej5607f40jc5oo7x662lx9cj9cegw4ycabpjkmzcab6k3vivgm6hawydeibcwc3lx7l6okyvsq3yvaexamhi4i1i2fe06zakza3q2lt2pts5uy2diaoi6satljn7mf61510r32r4x68t9a6ps3dbdxspd0eo60q2w471svwre3dvugmzwpkzd9xky9jvxly41oxqlxnclvxqprwr6jgnzivjc9mfal60uzffpla556tojnzfhlokmow25e2aqqvci2frxfxqersed8svrky0sh99w7jykxzmvxokirlrak3o93xyni7w6ahfagrr7wrx1dqmh6bczsewtgir7587b5bpqru2yoi8f8236cpvragvqq4cykulfxnp3pndma72vnm14wextykkxrfgi2eli6h5pbtk0vpj0jxqzf1sjb6pu5owbj2md64fwgipjwo4u3aq2yfavnh7qk9h8pmb1taxpna8142zvt5n0ir6tifmiont3eatrazxd6k2vvjjgoesxnry2ovyqil562eus6c6ml4423swv04rfq1jtfd4kzhihbbxphv6g7mqa129cyei8zmp03e7i6hj5cm53omn5ak32w30yryscn2s87yi69wobtz0an2x08pgnz7qo7gv5adn0qj5vdcvwx2zwmnvj8hvbpr5uqjj0gos9i1ackbqmw1aqvggwtdjhmvbpauz3jpa8xs994s4i4y4w1',
                fileSchema: 'opcj0ik5fyp2jzihmrg13jt46yhekpue4vkhu4vqlb6gfx1kdfl0w1vgcof0315oguydnc10bk7fwhil01uyacue6lecgb5u3jjnly3v8p97ww6d8t4ew10r5mf4cn6udykqj0lqokesv182l6n48hugtyd7acc42d7i9i7veq5tb3ogg5nrrujkdg6mwcuy53uebsopo97t212yliwktfmdxu1wzccvftxab7m2fp72g6cvvk7zsj311vg0fda48o6079wjx59fr1ftixjut7z3z71k1yvfz7n0ean0lv2zekaq0jdkg88mv05mf449vhl098cuqqf75ych15eknrdoeca27p2taeufqka7krbc15f6jyyh8z9n1gsyvyu2tod9ma84cq21s1zkq8f3qhmij42mvkfe8kj2sipebhsvupv3bkugz61e7ypb9iwrxphwzkmihyxyllnl94dhyqi8i8dnkjd2eiy0khjlfj1k59fsde94p9zodl5sokeot87gtxns49wulbh2chkbk9ehlkv16zjsm1w5qxnyfbmbv7pyska5zk15891mzqaxa13dy2byce9rbhhotycpr4wwzvcse7z4r2rxlrsx7x57oqfmvsuc3lm5z6ma9s9ovsksiru6t01kc3zotw1b9ibbu41i70a6odr1eii7ikmg5wrkwj6510jimmcado1r33uebygcqv158a3timcdwqkqqq74zhaswlorn8ih9ld6wpz6svj10ej995kb0cmlwmb7c2qbpt98krg3uj343pelhtlrv2qmvswveftgz8tavso8bjf0pzm916jh7qzv4dj7egpe46p76j6vdqf8qd4a9n3w3tf5jw0fqaf72bgnd7iyogbv0juon00odrhuqaqw6iitpcfxaqspc6ig3hc8o5b8mrasmhv3s5zhht4ble7q3llz2c1zv678gu6vysje01c3sv4mg67x5ipeh6lykd8c4y9syfzcbpt442e4izuwiwrky0zvwtcbjzf3',
                proxyHost: 'fzr41xuaxpnifatwwbuhpclru4l8vrpdkrflf4bbmpxntgm9ulbbhp55fxf4',
                proxyPort: 3623928675,
                destination: 'zxoq4v3rnf1d2ekv0lo5o9cw85vo2fbqamm4pqguou817imrbj2fxkjqdjy9uekxnqird2ntobpl4ggvbvp7pnn4l10myyw2w1u55zdopqjfheevi7if4osaoiw32ik3cqhkumrdxq97dajm1aleis28w8qvgeko',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'als9qp71i0ugvxsi3kz78pcpl6c5p2gpohmjrsko4a8xc8x885ra3wc3pc19z77rsp5u6dqq7q8gtbd4x582gdc05u6e8kj8vzjnqv5lu4aoare55l8cthders0fnicpigoh5oj5agd61r3zh906a4im5bpm336l',
                responsibleUserAccountName: 'ieh75zdch4pcn2hkt290',
                lastChangeUserAccount: 'oemyxkq4rkmpwh94toth',
                lastChangedAt: '2020-08-04 15:20:52',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'dzcjl1ebsmjcqjfqa8cffyjqx46jzgia542ieuen',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'mj0vs4r190r05gykvi12j7mijrvd8tpgqye62zeztjb96c19o8',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'kq0lx44h7enl6g3q5v4c',
                party: 'lwujdtfz3r2oclvf74dtfryeztmzdj37l0v20fmqcrx3n79w4xnyktoj5a828qmxmdmaexfg4lu6v40kex7il7ucue1y2q43yu315fvwhic1yeymv7evpfy6p6pjts6gk0sfytdn7k7c01kqkq6laajy0kxlgwjg',
                component: '4urw8mcw8wkuailas5m1om47dbxb9nxepfs3m9abo5601v52t8jic26lu0y87n41vtfb0x3qgwirl174xlnesirixpfvqf70d67n4mo712i1jyrla5y5zkim8dmmpwr2an80jiu1klkn3qi9i92dajd65qi2uwxj',
                name: 'vxiqah7nndmh6k3mhufzs7fclkckoqtzxyz9f34asejyigc01a8gfm6jge424mm46nqo7tswm5urfetc9o017tazryaxb6i5e9qflx4ki0c3mytcq87k0iv0b7n6uizkewo4cqy2cdbwt7yqqoeazj6lls0fzg4z',
                flowHash: 'dib2doyn5qp3lme3zzka4pgbl1bf4ss3inr42uld',
                flowParty: 'q49h9v1qf2kltqk20vi8a80svyvmcf3qjxymhw69h54cjqlzxp03tthvmb6zfoeuckg4lvsjirozzev86mde9u7m4kyjxhe5du5phwva97i54fmbb3urnomabovseo71e4peow3ate525dz0m2jtpts6xlkaoszx',
                flowComponent: 'zz2p82gyqjzoyj0kfgdjaef4gbqfqisrm7y84w3jovvi42ly8d8c0r7nfbox6ob5a5n3kc58fceib0mir3cux3bh7ajr17p00gq919x9f9an31oa61nowg2l6nb1cgk7avoz6wzvferob4owmmy8ncivmrhs904w',
                flowInterfaceName: '6bqh0oh22l3nvb9btbt5eymw7ysj8sqs0pktqug8kro9zv5ruzf8taridckt2o1rsuw5dghp9rkgwbbh4atigcv4wrv5w9famc77slwo0w0s65a6mgp7k9zecc1ip7c9kjsdogkiathjgd7i8c2e3equblg5zxge',
                flowInterfaceNamespace: '13hym0cc0r420opufsv3znk4k84f5wlolzmgt3sl8s9eutapos87zhrs4npy4z9zventqn5vtf3a5cvbpkww99kwa9s265yicyax7bvp101v7o7iy051ss16ugjsg5c2gegt3epp0qqx85381bmvf4s5rkkrb49a',
                version: 'ppj4iu46o2u6dql3sno75',
                adapterType: 'sqr5wpf2j0v1oj23uksim99bf9w0rpjsjddkqyhkfyxujd6o775sm7vts6ad',
                direction: 'SENDER',
                transportProtocol: 'q6py6d9sxtg4cgsmefl29n4cllkdre6hwlkka0tqr1lh82olbzxbs3zzwxxh',
                messageProtocol: 'tb8bgm4x8na6kg644jshnfo3zbnpu6c2vowmc9bprkercv839m0uom30md4p',
                adapterEngineName: '253h97jwokg678gb0psg4hqblr464pdcpvmonde27wifv8rxfnlc4pqix9bzlvcuw2chir7bwekvahkjp75v96zrgqwop07vfzzna7pc6mkztx4aj5b4x2hqc2tmkon3n047owazka2r0q6irylmluviidq70ox0',
                url: 'c9p229oov5thnf0l3g5lz5v4rxtn1eeqoq2qdo01qlbrqaf279q0ghmti30hmpwtssjadjjb45fyi04zxf4aty89ymljrc9zbyolkmvqldg3ls3lgmgqv02nylqxa40dyox0g4e2qncvzus2rgv1dsj4zph6uy4hov6e7c065ry7fniowo723kp6kxcq6hyvprt275y7tzgz19ncjmcoq6dzc71bgnr4wbc6bp9fhn1tmin7cw5t5cdbd0dlh7eeh08lyvls0p8fs2yw4d5tp63i82epr0ef5d0jxij9ctgo266l1il5f6zox4hax702',
                username: '1d5cfh5j4vradra0tat85f1d7k00pcncwxugttw9y3fe1qz2s404ipax93wy',
                remoteHost: '8ixoo8ktwchhf7mp5qbnid02zr6nln5quloauv5k5phc0lmbda0hr38g40ari63l0wpnt21g38cxtpxcd3nax7ct2va1pdtmzzhhqf0kxku9ciuzi7niy1nruni5nsdyqub8jgik4iiqhqoeww077h28w0ckb6oj',
                remotePort: 8320401226,
                directory: 'il56y10oznm8zrberwmr4arl6zy4fe0gh359rn28y5a1o5h0c6fdipvmspze1akubvbniqc1pa9xy4uqzqt5no4u96xsp4188zpaywpfe1cjxgjfokltye015gwj5a1y5w0e0xq8pr7axfs901gcvhavg6vxsez2fmchddhi9sna4md2swcryb910v9k93z03jyhqz4yq9uqiep4qc6vbi26yjo3qfyu8rvazfgrz7hyn5xrrlak8eiyjmkilpa93lnfdj9xika0zvakvfi1c4oy6cxcwiu87atqc6ts70uc8hcf6m77xigwfn9nqn8f1thg81mny7cxsh8asjqci4qz588icvo3jfb44sbysrkwk657fzmnb3moux3xox5zvyf96x8lavtp0x4hsvmaxf5iitolxez3nks6qpk87sdd2m0u0jiwu7wjjpbkgahpqucx2f1d52erpaa6ijfit2rpl8g8i5v690bhny01qa0dm01gk0vgkejjewc9pgjslb49hpvdpwacekyae3zy8s44f1y74n06de3uw6ips55eo9ha21ci2rv5ssm1vlh7taqm151bfystrn4yuwni6zhfjfqbs9c1d3w40c6gcc0sqsilb7803id3hws4nhdo88b57nsrsaud7hgcrrxqjydsegufsqxmqv990v08amecrx6d8fz237mxtfvpztln3hujt2iypd37f717hpnl57h6bkcaz59o0fi60ouaxwwdedvme30h9o37a1malzntuzgmkpicy8bby2ttyyvj7vvhm0b1o7n65qm6xmlzjzp7aixyz1jmptcunkwt7l94bvwrm2dn53bs6rk7uwodli3mx2r0dqgxa4pxi4zy6z4t6b4qx4vkfphwgfns95lo710hy2bkgddr818q8itthywc6m5qslbqwnmwvurkk5iok1jpt0w04gm7wgk1w0k075gh27vs4oogxegcu4tpua1getoidewncbjo2d9qoxh7aso7n1x5j0liil2w3pr8',
                fileSchema: 'wc32efh63ae5zjylpgvb3g8fxghtwj9pnmc2qicjxhcgfk1j6c7jsn4er78plv8q37mqasfg3uhgjssbpgugahwc455wfwaqll1c2gcv1vljerf52lo5pp957mhkwqfaauspt9r07nku6w86unzlzob1vp6dl0rmnb1uz1g2bx5hs3imy5ymz1s5ywbxviou3wef1w7j37a7c4mf47l1se7050bwwcp91eewnpwrkvoiuikurvi81fpnnl9mv98z1pkj9yl1rjjk4ec5j6sw7plq2gk9chm6vxk1p5vykhvkd5p1ndd28x7d4jzgn7prpum9ikiyobf0a3fclwshs5qxag16hii22wjsina45f0omkv4fxwinyoii2y8den6kvk031y2vuwiombnn8ef8ewnj1k3zt900jwd8mz6aevqwu1m296he5mdicr3liaevoypof0xg44jzaedfi2rf791i9u9dkb2jn4rk392z6sxawkoif47ynt1z70qmdlp8vavx7f3m794scxe6bl05wd5rc6is4ef1a8vtgsphtzxso5r5mp0pgvwf5ccvs2zvfy699rj850cxdwa5tpa0qtja0tseovqrwr13zjtevjs7xgsq5vyteam4f0ptdwe5i20xosndlkoeui5c9ivrvttxgmlfxnr08o1po31qrlzvbhze5v2kb9udffs3w0vrd0xh3lpnz6uza82m3dev950omae5mu21vykwiof1rrphopt2vqylvi4xtkhvbbcprljuuh1lakrtz4qr7fsrh85905ngxj1qfbgtit1cazqt03lu1l6mmhopr8bb0sotioard1wsaxgmqj6lnj9ny4a3jvjlfip4l1k52kx75qajyw912ig46tqe6wp3fg02oz5pru51m3q05osb3o69ry2somlaajuskassfiqafrt89gjflxwitezwzshd1zjmyyta8x882bnh5bz3tcin5uqn7lptxt09rj2ajnkf48hz1u9jt8om3c30bb2m6wp',
                proxyHost: '3m1ezwd3f8rvmyvl2xcdb8ayztud378shxxhaocjctzs6c39k029mu05mnv5',
                proxyPort: 8598369709,
                destination: '9tv4whktsga06a9irlfn0us9gwtm6i12qb98ykldcato8s6zw1mji1g2c28bkzcgky29kdkgi2nqx4n22rgmmi66klxisy6s2ggnujti6hvenwds5uyvgmos47cbvy3gxzriibx0iak0ptzhif7kmrmxup4ii3u1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h6a0j9yidx7oewua1bkwnt5cieagemocislv6jtd269q1dvkgpz6lzm95q93274b8mlg2gmpoklnx07kzwu4649bbkqhr9fmjgvfwhl9phugakdkvz9rvkuv87qqbwa3b3fiqb977dhfzjkd9krkoc52hleeb5zs',
                responsibleUserAccountName: 'w6hbom0zzlokx93o1ugt',
                lastChangeUserAccount: '8nvjuecsifgn6onp4pjr',
                lastChangedAt: '2020-08-05 01:14:22',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '1gx92h05gsllf5j4mx5b4drwj6bvo2yqe42fypm3',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'smktydd2tyntb07ysmmj3yvdstlbr2vz6lpmv09r9axi4h621f',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'ztbaww74vjnw3cuoj4s8',
                party: 'b7nwu850j1lgpx4up3vfl7yj7tt1knmdj12kpl1teosrv4fh27b3uphmtwbgx2a67fvvpk6dr7e66ax2sg5pi4da9w3zvz3vegumi22h417vs45hm1ouz7800o9ktf7iwb6bd0aqs8ucuc7imi3yum9vo6tqtoq4',
                component: 'xujxi3hlt928h420ng1bwi7pupbjm5ux374k0ba5xfakwtsc9qtn810m4owwzh9o7s9xbye6etclbrt4uxcumx0yp413sxot6ib1hehwjyzhtok0ngteogo3ncsmu8qa9kdrppcem70fzed482fxfhxnjh64ou9a',
                name: '23r6nnwgtdd53y11plqmzs51kaivvirllzaorjpztm6pqume61fe5qjkdxm6ebwr23xojlsfaw9194hjblsbhvmxriuj7dv0bov9yhr0bspmle407kosf1mq90rnkfw7wh1yg3mgyt2ezmi8d33bgtg4904zsgxg',
                flowHash: 'gec36si8msaqvkydwjem8ail2f6l3e53rwb5a7qo',
                flowParty: 'qu76h2ztc5age7gzk81d5whzw9fihasvwum2ptxs7nyf1ef0lslt1prbwv53bksbyii5qo58oa2ru796u82qitxdmqo5kyd60zo9m1szuiibxy2oe4r1ygmet3gw4gcduy2to5g0jyjnrswoqgov7xqk9vzvu9nk',
                flowComponent: 'qm36w7qxarc65p87dpu8xbckqsfr8rlko3uusp0343weoeevlyd6n7v3qbvp0nm9xkjzfoa6rhdrtktbge2jri255n55qszjk75c5rfcua2na720y02x1u4udwrrj0fxxp89v2wcikcowp57zhzv2plp762zzgea',
                flowInterfaceName: 'i297cexxh7yuuokpaenaf28qvjj1abeg9azn3b7xmlnrwhxn9i6jba2zm5pf9oe2jxm1wpuj9y9vyskckohsoeod6jz253qx6b9j3rxw8n6p9jkf9bpc057ujem3zlh0df7lyomse8t41u42amgvt4avso2yoh61',
                flowInterfaceNamespace: '6nug1sd4zu2526mk3ep3mb0cyuhwk49dksbocrj15a893z921sovcq1hpvnv0inmaczk2dmej0jqekeldln84mdabjlfdrmfxwxd6divy949uxqok87hs642zbxbhpncpyybmv4bsl1n7d9zkloerdnfwolukh0p',
                version: 'pey5umgl81db6tx00fg6',
                adapterType: 'w5alhlknnqg2xegotv2yz265cvg8nhq2r1k5hc6t54rnr30vkp5ilzpfcecqw',
                direction: 'SENDER',
                transportProtocol: 'enkywbigfgreeqn0e8j612i6iqqyx7lqxjhh4z3pnv1vzmp8k6qdxe4drmi9',
                messageProtocol: '4d9xm3jedw351q74ymdza5tq62h2fzp02ipaohfwdowfvk3slbi3pmi6opfx',
                adapterEngineName: 'iqd81r6f40gnj1anlpi5ytwk11iruweqlanubgltwydeilid7lqoz2iuogcqblpefy48jai1igqw0s2a35xuo28ssrj8dk7k74ibpdkd2xmre7547oksimrt4fmo91ma85t71rhlz88fasymnn54cq9p6t44mdmn',
                url: 'os6xpiwlkmtqru7juxek0yz0x28jw8z8wj5i5ipeqt5kl4a3fw4av1u2hsa2o2ft8yyzb307larmtwm7ypev5lmdjjnbu3qwtc4uzv7vy1ocgqhxbiqlzxcu3kpcbhf0tzhn2x2ox66b8btfo657gh5z5ajp9zxg0ql3c581w2nhuesprts2iz9rsn4esgmefvz5l30mv7uqdxs1vlv9yybamk232maceysr611gkaw39k5xc0obaj0yjbbgaphbfb3ryay9xjvnw4zgwlp54ahvaeiobe1oey54vjf16q6dnx917f6m6a4exia9w36a',
                username: '9mcfff3gqalom959x2h2ey19yk3kvsqk85blsj9stnx12vrv5pt0tmzfva4f',
                remoteHost: '3qqorkvqcms33rit541pq47wt735nvxphgwsb7umb7jgxal29l51w34opsvp1rnmmzmdj7kpomliv2nagxwy0os3kv8bcaq58zqy5k4x3wdexl6d8v9ik18kruai0p256xqi99ujnba3zdeinfg3k4j8gwyvyky3',
                remotePort: 6943635141,
                directory: 'xqug33hrfimkn970fxnt45r2tkm7ro7er9d95zn2pxo4k4vrat1ver0gzh0drkpq47nds59des3hl3xj7mvhbxxm9vljktlxvm318sn5jo4z46lpqu1bmtputdyc7mmeauy7bl00uzpc9v5ber3rpkkmmn3jrwr8yn9lhtn7y5pq1h8thuy3zstmkj1ria1hdsyjl3yx20ql56ohbnfadkz300anzfp1f9smkwxcxobfxrlndhwruet6lterokgtapp499v8rt72onvi6mneoh5mn7hhcquasmexx5lmk1p0o3cxx10oqsjoxn6oktbo1r0vklod3vv8ehofnfmubf4qm7saj4auupelnjpkdlitbgu8rejo9rivzy9o5ozi5ie7v23e9ldikssid9qfxmlgetitbdkyg3h59fp962n31bxoqx8wok15784mp64tdi6htryubhlfpatymsmnektft9zsq68juwwfatu1q2cp1ew3dozfauoqqwxboo8l7wxzrvi7egkd08ivquzxxwyzifra7py1qy821rqes9t39rxwsbmyy5jkz2epid2spt8mbszg20xdino4ypz01ip26n1z99wul9uv5pz1ps3kci4qbkrvkmavcup6rjn0z3tfmta8fn1g867eo6sxmy0vv26wevyw9ifen209hcfnlplogcpsy26si0vq8ivexzc0gz1fjm11yww35fi7l4sh0v5j9gwp9f8vtg5u0xt7nqj0eqiolvymc0e2k3xfzk3qtlw9srgfsdzsu1m64agzaz5x7ag48xyzuioj2wiz6sb9o4mr2e5myytj5k6kqrqxn6jtuvkwvahfsq73kz8fwbq8aj5r861f3xvbjvh4zmkpub4ijt6tc23uwhca8h7iydghg7suwp7xq4hna5u4y3puqyawxjm1ug4133lnl3irylvff3qqqgvqddqyt40jqjkle8nnm7jkfit7003dcbhvill6jukpiwqupso1yogtn9w12zygfnr53a6c',
                fileSchema: 'oc36n3jf3q18piw58e4464wl2xeb6ub6sdoo0iyw2sm1wjfq7w0al890ef3h2nggxp9yvjcemsrzwwdhlmop6cg8tl6ppqn2b07qqdhx7b8c1qon9vuo6w4wn5l1hs0ukytrxwtqjhobxfag6ox7fvjiji2wchtt9om1t2oa2lhikxq3zorqnd2kb1xd3kz2r6zddns9ry8eyxmnt6ybw4ou7lhyezi5s308fzyo4t0fufrmu0erjk9bv4jfgkiqc0dmhd7zpl7ylys9opgmca0siv74qgtdcnq6e013eifomnfhos6i8erw2szl0g8wkiayg90pdzhz53f93wyp2vpnfckbpwbhlhgln71d07chvmcjc9v3szayqw5uumgke1cu4cmh9orn1fixbffe1qoithbw8czuj9w1nkwkv8gzmaa5h08ox0wp6clybx02pd9nwcnrfk2mocmmn5740jb36qpvq0x50nmab19o46mztwikkcn3vri488ibuozrc8bq7xsue6imxmg007imx82v0cyyp1b48610h81bmy7rnms6e9v55t1cb0o6zcccfhpijmxvi8q6oqxdbbifdighryu9cen7zbetc0rw5gfy40ox6b4tpb65tob8obcvenoczpq2ju8ul9xtoj2t1xzzpf49ayftdufjob1ejzec2r9nm6mr4sop4oapcr7kysduvp9b7su0cj2y27h6woj4qsitjee8gylsyfnms9n9b4nxuzv5y63yvm6lhdk8lssnbduo49th9emcs26z10ufq40rranggsrwatkh08c51kb2iwxqu0buvqp98sjivbemnew80qonypyqx3w6iwjhz932nry8u5wy2s4f4b5l9hr1n42xmtfi5ud2f183pk2c9jqsm7izydgp62li1f9ic7rmn5zrof2xfvq9c7suqw2k5y5u3ui4orpwzf1ke3xy1gq2n91v2quyz9z61x7zqw4mztgdmtaqbz3h4cbhpfec03xoowhtfplnrl2b',
                proxyHost: '25tie6iwscwtuuno52iv56stbo7t1088qhro1atm5ftxhffbzai5akkr6uf1',
                proxyPort: 9033810968,
                destination: '7pszdm81mtixx1fyfescy0srqbcibsxqvg4u1j4emucxu2k25vz5yx7m25mz3yazgz9ni196pqeiafyu9v0aat2r8soui9izeeogpwysigu32dyacjyld21gel7gxopef2kwrmtulxudxbrnd79clcukjxuk69ft',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tpzowqr0s4207j37832y3z4krgrgg2y3g5r0fqo06c8icb8o0o668aevr0glq1iidq1j7dn3h0gwwnu5cb5kyj2noqiz60muy0y6qu5hb7u4popb794fzjgpv2edyvdjavsrqpokbghswxawpzrfrktkol5i5uly',
                responsibleUserAccountName: 'wj0m20m9smizr8mid5fy',
                lastChangeUserAccount: 'ky3gtff1vzjwyeogh9zc',
                lastChangedAt: '2020-08-05 00:30:00',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'redhls6hcadnl9ykodntflo9jci1bmqcf022hurc',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'uikuekot0fn5rhpiegiy93ah0oabm9u5f8dm1huxz9gga0uq4u',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '5anrfh5t7qfydsfpzfe0',
                party: 'eyeqsknw77r1qt1ngyuye6vb9vqwn7wjb7w0h2b12pst533ycsxuyj60tudsr0anqw9k4kugrhwzxyqp1iy1op57f4la44uko75dcg4j0a5m73ygbo1vdp7f6lm6zqo6hydrqlsg3f6b3vrbojojibgc457kcjrz',
                component: 'lw05ycl0wwbv8ccqmngk9g8njxx1ais3lsxxg3o079bndv1moggyc2iedwjf4cg3os9izri59bqt4iujsle8j9wzlxsclk7fdj2wox5yw8435iigpqvwmneiagflbzneuqcsqqzi0czyniukn2xmg7z0h8lzjwbt',
                name: 'voye0jeffqeai5sjj7diqv00d6atamjupr5cocila59rtitl1lou36hxku6wsw475tl9eu8r2q5gv4x8k9xn63rcqyltl6dfyvmtkg5xwhr9nve9ysqtn8892u2rjck9kz4qcxslavzg74mecs0usw913usdm2bv',
                flowHash: 'pay7tpg0af8klvzq8j13vpzm68ctj6vno5arx22a',
                flowParty: 'rjd4ahjnggyeq62ukf4vu1pu46abfxb5jflddkcqzdqj27b5fcapm4u5b121g8qsmnk364s759h0f7kdrvl7qf11zdbnofz1meg58hzrw51tbt7u4pfeeqqx9y5olkja4cu404pjcoyu5cqeh8b7655ep84pxhma',
                flowComponent: 'gyp578g0sftipvd3vft6093t9kwe3vnmlkxamil5ce42owzbbr17m4uu39k52hvxrrdmydkh11tmd53goj526it50jo9jei7x7m1h0weatcomwtvuz4wtjcglf2k4trzonp4tarvd1d8gtwtpbw2jkwvftcn11pd',
                flowInterfaceName: 'ovclfalhwdkw834ng4v16wrk5fd3c145ypdgyvmjhzg4mambf7p7uk3sw909leggrvnfde5e48ajevkovpj1u8xvfajm3qgbrpkjfh2frxylin0auxz8a4433etpa5jncpwdfh9p2rpvpeh2t91zx53loz6hq39h',
                flowInterfaceNamespace: 'k81bb7ul4w0a5y0onw54ieet3zz0oe208pzqjg0uug97s6gptbkodhjitcxrdaula8wnn3ixwynzqqo0kyprre4jq7r4774fkqc8jji75l338ldnmmhjxpzeow32ifed4tx64czd83k41vfazjd27o9wnkdlqbhq',
                version: 'v5yxexmal1ce8qwgl8zn',
                adapterType: '4wucxvzte9moy3ij96xycrgpbvk9eccr1l78yyq7is7cvm6q7wns86hfq8tc',
                direction: 'SENDER',
                transportProtocol: 'j7mie8exn6yxzquihfqzcovdv9zmh221q7w2a9t8wjfosp79aoefn8vfdqtf7',
                messageProtocol: 'lctyu6rjf7zyke71kb5a6bck1bf5w9z9wkb51i6l1i4twriwd4zrgg9fluxk',
                adapterEngineName: 'iet3v680ctiajodsyy1pine3ckga54pi91fgdiuxi78pz5v7yoa0v3fv32hc7yr3gc7hzmb7fykqj1mfypre1hedowdbp6yvsg1ewk11x5f01vf5g9wow5zuhjt8v9c05ph5aas2o0z5gac5wukn1jgo3apxw9f9',
                url: 'g5aqaw2ssy0bezw1zxvnm5x98c32z55x2ebd1ojj4qcq03f6ldh5jwc6eq0zbwxc31wi2o77ggwa3vzr370a4o3zm47hriyjvokuj0lnh5r7rm9egrkqo9bfng1xtha1a2qquyd45a0memg49y4g63rikbahpw9ri1blvix9sefjgelcho7xz9j4roj6ttaztmowophzmlhqqpm4p89n7gyty8jvnwf1rpfx0m3pxs53jkdkzro00cg6y9yef0i1dn5ydj7lzqadrypemmq8rqmhyj1eq6lhlsf9kh94b02rra9z2gyaoswzsnrqziak',
                username: '5dtrqurm1qfdjs0lcbot89dusicn7sqrbbabuthdznedbnl92zbpit4wbaji',
                remoteHost: '3dsk76gc63ekrb1zqvs2kqpm1h0xu40l6mcj1o2gcvxlyv6p6u79z8ehz2s0n0yi0k9wmf0czhgegm1mnrnmw0j485853x47i2ahw95cmrikmcmcu3qia0rbkfju0rfns5thsw9f1gjz5gutc5yoyu2x85he1fdy',
                remotePort: 1933120510,
                directory: '5xgpnbksta4bi1u6024nftxsdchl4lwzj2feg8cumwvh54bzem30clze6ya21w0dj6ewd1z9zmtam53pdkhkh1yruexxmvzyd5egb1j2h7z3xcy589dm7hpwglt4tbh1k8pajsc3xq6focy74y8ad16eiv43fm7k4swi04lw4552req82ri7y5y4h4fgotv0ym11nt8v5c2sp9zzm6c5p49bylchqxdodmd7qh6oe0ps0z3nqa9k643ii29ksoepxf2kncu0yz8tvo3ycyhpxyzqikb654msc00kjtiur2ejr07pyv7o7cmym7op7zpp5wmp4l93f89oghwr9y0reudwjvecah14t6bsk3valh71hjmplnp4ez26ordv9y2gpnz7ba7b5zpj56fg39aurz21ddlv8b9xr9r961ml8cn8elem0pjux90go6zsgjb5m3tf2rm0boo97y1xjdez66fmp4vu82xor4slwtx7dtww8ngb59mic2h1uf6izlr9swmh83hfn4ur8xxoxb1y0pgitt2wi59bj51hc4kxycyyg6b6lpmqoi5xe1vk1634lkkcdx2xe68x0cj71efdo9592fgj4lo8xm3op10gqqpc14mv25g587giz2pjq6fswj6t45cj74jn9z360j1ogo18mwsp4g3onfft4wky0coqzr7shf9ov6ykny3nrwy77sx0uzrth5rem1gke5najz1bglkumvxqeadcxbroouo9m9dp2l81kaejjvm9q3p38bpyqg86w9sj3a0hsu83c6tamutvkyrpdzkhsv3hbaznmqwf4901jmkp2fb0ifs0n80bg0eszybixktswmep72jqym5f7o0n620cy2o13mg04lyha4da8jzmmp606hpzhd1x7ejsmko6t340vg3ffcpye6rfoy4w9kygb4a28bdndf4isjwp53xozfeqzs7phoq2mvpl5uv95xk9hmp42gqihz0s47spug1jzjc4ag06fvzdwrll72nw8fgm1dmx',
                fileSchema: 'bf2yl2s48cncuis1zrhhl0849sdjxydyjchmgkzeyg4d46npfwuk8wmqlitz7ppjgr9zpkebn27gvluo2vvjkowfb5vq53shldvhwpc6kamrrsoc8nec2a8c371hqwgvotzlbc2khdj8qek97z4u2m4xod2or4avtske5l6syq6a0awk0adnqkhdkwp9ivxxa5xaigsj1sl1pauwfp4dha6fbxdqggg44sb28gg0dtvdozwdu43joh1s76v5e8h9re5hm7b3y36da8zka7jd6kft3csbnq1mq2les4dq2hqczek7m4vky90eiypfjxgsmsayastgmn2hccmdbq1k1nys6w8c8vhituqhp1lsdpe1c2qysask7o705semn0sw0gtr60gutyh02ur0c4d8kbv4d7dx7z8q7pk6fwgx5icylgk40bzoq5lkb0yrh9g4ehlccd2si175guyf6tm4kld6x27hx02kil37goq5zzeta4q9wngpri7x6gjzrydqar0isoah42qixtepickpddx0o391i6uuidlt6dw9whlrlawb58q8lmqq7fkfd8dsk8qkxrdlj6q0661nz4pb2f3isd9rkkstrsfwe6n9mkopa4g6ubz38yao73nmho1yl5eiaclwfl22rx0cc9tackvxpb0ym3t2wn20v44pt23tnhsuz8h26qh2gkp7z0tx25lqtbpf41oftw33kyaucrl1x66d9b48sw8k3sc2m5u20n0pikivasy7a1p24f2u7905v2swkkjsq6r070a4l6gdzidpfyiknipid23uc1rdiw614rmxahyhl0v3tvy5hv0ybxzs4vkb5dsr7b98abpgypw7t8txm1sycm5f8aijfme6nb7d8vo2oi7yix5nvcs4m6gshwpg8vdjyy5wdqv19y3m5ydit4uh4iu6p9x69fdu8pjooizc6lo7773lfd6iy91d7y8dwq2iy2v533e1xc7khr9k9us8z6zhyk4p55d4oi355qku1biwl5n9',
                proxyHost: '27a323ife5ar6i8kjumvmdoxd46kfb2vr0e3mltsqzmx31xgbw8halkp6zl5',
                proxyPort: 4835512951,
                destination: 'edwixeo8cmikk0agy69pex812amm1c0mive0s4fzkmyp50d65h32dfaqwk9759rot8xfuu0mb573lxpd5s26olv2wdzygbpll2n241o1f81a2uqv69c3rdiyzht2zw8mswdfuq16ntktn4yhroowqtk49iwmhlc7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r46o6mem5umbygx0l6p6ljlwsghjf4xofxz6ig51tgfef3fs7lef3yz6nw4j0ydnpgz1vfxc5h6uqsj6ghp4fr9uahiumdjlmi4ffgym5olmqa4gll6l94mtrebzut4xxvxcnqlk95v3oscbjt6j7iqzxbqdmna4',
                responsibleUserAccountName: 'r7vlsxzfiuq7p4n4ttzf',
                lastChangeUserAccount: 'dfkm3ndibwyhqn88twdq',
                lastChangedAt: '2020-08-04 18:07:31',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '9k3w6ehy776yvjqy253f3qai53sux9vk1kxilb09',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '3fzreyypuiwb5v14da2tkpl49aonqn7i7dwihpaoujhuj3nfa9',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '48yr8qkgizeek1vhwnrx',
                party: 'dgottnf8txc7docnx1b3mcudm002vevzeu1qr36crxcojsqw26yuss0xe35zfwnp0vc6nla3h46v0ordvl7gmceg97ka77wpq6pa33ibo0vh6cncsp8b8mijodtz9q2dcvnzazmhn5poy0c8y0vi3ty9nl3ak7y2',
                component: 'bda1fmv6aai8emw0fls9p4jty5l1klyct4rpr0cwvqeee20vz35jryxe0fidkqcgag91m5o0sl2q6mx12e7052ei50xsw0zz6cyzf4uiv0yi8f148tnpj7z5t1bhqm2muv4xtutnp44rhauf891f59ndwiydkw1i',
                name: '6yb8u7wvwlc1lrm1ta6bqoyu0trgin3fw62m1xy31dpi58ll0wtem8y024y6fr73ubnx5arjkpr1w6fv23d4m2d1b4txwa6hboh3ic6bqrcgloj1fllikcpnzwpvdo0ortvah03r12ze3uxx1d2d83snu4witnyw',
                flowHash: 'l72a5su9avgm0x91ennjx3w9bm51gemwq4q081hd',
                flowParty: 'gn8g04dkfmkn77eh90vblcp9hv6l359b5lxny819kh6kblxly4effcld4zndqlxcw2p6jf4vtp27e8a28pzxnupiric5ne5srxbg12nrpwca403tuw6jw4zlngvhtu1c6qo9uhxk70ofhxbzz2sisvclbdvh6nw5',
                flowComponent: 'igvxd09fkbi935f26qqk6r7b014fi20ppd9a9caafm4k8m5x6zp56it5gawk2sgc0f3cgjtr6pr4ic05rjmnr993pqpm3a3hinn7nngw8l8oeryweszqaptfha54xh3qvnb67yycb3pztpkjtq90csuu5htxco7c',
                flowInterfaceName: 'atlyk7mq70zb0i8qj06b98v0dqclzd38fpk5l9juxvjj76r7f1blnqpl9sh91f8j6fxtaxuvxxknm2rsstksbqyt9k2nit3r97aexn6tqeno0mtzgybt1hg1kvte12b1j1465pe4fwz0pux533ohk1w9rh67soqj',
                flowInterfaceNamespace: 'bdgmm5srcxq51840qzdn6gpb1af3n8kpracfgdbswktkpfzggz15oaknpif2g7qlrxxd8synm6o20hcxmiuce54xamb220hx6d6hv0acb919k0vcm6b5f6ktomxz69vj5ra4z41x7d3kzdn3d888mu6rmn67j7dx',
                version: '3jfdt4l7460n4acypomu',
                adapterType: 'gptdoarnatijjzdvelxyqb9vcsbewmq4jmgoedl5ow6tkavii61mc86cs0ub',
                direction: 'SENDER',
                transportProtocol: '2hkfu674f6jvc6fbxmm8wnrmt6xygo2qotseh9nui66obg0ssckmrxh8q1ic',
                messageProtocol: 'zqqtp6x9vurfcbt6we63pyesst284vrrx9x1o4he8nk30nmu3hc8mz3orv1f6',
                adapterEngineName: 'kumso7kibbfwgcr2kc2ved1zxc45g8u6vxob49txr0v4a8ef6ce0rzcw9nxnvj041f427lldlyj5q6olkcebkatbv4rkt0r6m7wlqjlveyespcgx8rt5w9v5ohyj422gac4kcr9onreh29jkp24bdfzfklgteg07',
                url: '1duc95m9e3hp50k8m4ner9x68wfup4wuur36ahhlswkst8gk03v8zcefm19eg5eo5l1lscfnu0lmnr0ndf80u1lma19fa8o8nkntsm9yjusmur45ogtjvuzvqp53kmrgy71gim5jzcl8nvfb0ifvp1fxhpsi0ncho69eenjvjmnwksahm1ujn83n7rya3k1rea7ll7pysxb6d3xye36lxdig89lvsw6sopanmtytipja1f7cptuxnuslq60l2mtijb64im1eb6vr5k2kquts4y05n1vfqj31cpbtk790xv45gvv5b7cv8p92sv05nwvp',
                username: 'xfj984pni075kdpk5lawj9d2vu9y6500sytwi66ju9k4s6fg3i0ji76dmgz9',
                remoteHost: 'spla9uzqmee0h8gd1p8nivt2oo2llnfywjhrxlmk8gq9qh8qnuqigdce9isl6mbteg29rz6l5ihv882clinyvk4f49nc48edyv5w2ydgk3ane40trgwe25vxvpiz2jxkbk486hvfhxo99gs24nixhkuwoyx9k885',
                remotePort: 1131562203,
                directory: 'maazg8g93kl7akgn6oa4c52hsot744nswmf6a80mb8k4lcj9lbojt7r2o8npl0yp1zthkuel53j5cnunfdjxtuvx01un1qy4wf3it4lhzs82c0ey6mxw017ul3qz6v2zaxr9349k4fdafjhca5pipkeetlwm1c2zj0uacusb6i0bg3ys7fyaxbrh5vrifhq661fmtj7ivmyox1vwvo3yym4a991fe0hvorrlaiikjajet4x4tohcp0z5gxu6wivflvti5fo3isf56svr5rvpa4etdqu0v6btjlpky0ed0obez93repswqgme6ni0mpkmre6fo3h3k3dguibp12yrmhhc9rzv2g0izj6qa2dz5p7stn07dp8lxoqtenvhmdqcot8uhqeuhoagcmktzde2jcn8ns3ckpjhzpoou79ryp3wo2m6gh7vkuk2gmhlaer27gxf3os3st6qpvsvfplf1qq8enuxst5s684gslipjogxikn8hymr680vxqxjxpa5pubmvrrg3xsdnvht4msl5jo2cm2paahysuvjvr2koqrz8okobo4s0fxxjib08hrk7lzsphi9t9ifsrvizhngpgdd82x7ifs32yd9lebdu0ou10rr47rvbce21depctnt92f9ue420qan0qilv5ldfvrvbmd6pet7pg24qowhnpf6n15aiy6yvi29d4n8sxx0deg35r9lk58vunfbylehbmcol45e00klmeo3mpjrxmzmcw881q455ayu8kl7uhaomr4yawaqrf2cni1fuit8kacq1yg8k2dzzpqsjpncjso7vvtcnbwa5huordk6v4iziwuvpnjmpzzmyti867ho3vuh0x3sf9ldpyjx6mpiio8iayb4h757evg00an01zrbfondqulrtsnchcwmib9j1uthehkc5dnuuzjfah1ithup1wmkz7g6ep520z12kg678rfo6o7envitlsss45zlnh5j85yj59wol8w6zseaiqfovjmd287dmo5uahfof1z1',
                fileSchema: '1dyweydzwl4f7suace1brzp25hwztkef8uz54qf8zqiey0b82z0y60rpivihb8o8wzn9a8olxdzor98f20q0kkrmgy43f4nb9nnqqjxs1zem66bk1cm2kz05iuq4gsm8reh2e2fmif7589hba66mg6aibw8qf259lckoosbs1zr6rt3zhf7z4dpllh8p7js32vi7xfs3deos1mxb7izy2csvi8ka18zaadi80eeqbtrfhxcy11nie695iyv3zhdmwpnbt3n7cabcgpc99ptjo72bj0hgmxk25t7novukmjifhinq2wef4ejkfc45msctmhg37ofqp8b2pco9ycd4ve5ql49bwxpk2bwwpdszbzlw8v05wj6xweppxqqg3p8c6at2canucygp9yjv7j2l4b4pdpqxpxyec445z3fo0ijon5g0bkwppx9yj1ve694lawuqw26k1c19gx1cassd7ftazqe32h4npkbvsvba7nzx9hyo68kkrtd2d48235bry5yvpp011ioxfjc6mebvz72w86dkdkm01424blhnug17li1zf1jcamm77hnljza1v8njveecunsi2nnkbrholrvnu30png1ygww07kxe9rwm78otaklzx74e0yyo84yc5unoyjjrri30hwrw52dz1n3siafitimhaq6w337dy91zper0gkk37c6vviugzjqjswa43b6w9r9fwcoxc9gzjxtzhptnjcqb68srcq5vm2w60r5ufa8wq8t2uh9v1d1ts460ckv0dnth68ewxfjw7p92huvp7inwoan2alf76p1bkx6tes0hak4889nuohsie5mit0ps7d2tpubhwxltcyix1ozctb6d4ydukn6gf9o0ag3s6h48705jo41hnx2uvr16tabl57kuikplrh8rmhy56vm1vc0359tme9e4eulx4gvubd5q95i4pca7mzgad9pcnlsb0wyddj602wh2z30bxmu2szb6gvqkpbjwkxbzen53egxry47f603wrswg',
                proxyHost: '6uw5nl8hd755mkwt9lx7cs9bpuuh5ekx85h75kuqq0b55gehwzzr3h43p3ww',
                proxyPort: 5536006312,
                destination: 'oga729j3rwaljfbtl2dvqlz8l0232g85a4ujs1d3fhhv6o5zmzlqvushvx9waln63kdvxdusgx3ullqpdm8dec1z2i6q1bqtzufmvg1t9fevn0u85nqsjwdcqtmqkp62l7hglr1e40p88at14tsixpcoinwdm1la',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ynw5js6mtnr75bzldhh4i1oqj6od2dte0popmjzarx10yfjkr7p9tk3w1fqn3gsow70h79ay4wezgeljzblc1876san3m2tl9vyawsh6a48xjhj8p2un59m0t8ozfgp4zb4eorleagoxoofn9m5du631smjotsqd',
                responsibleUserAccountName: 'tq964mg6xorqkgylqkrk',
                lastChangeUserAccount: 'wkyglyobdwiwxhc5u50h',
                lastChangedAt: '2020-08-05 04:13:03',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'kv8parf7rimun9j87qlqt1w9bpq96cwof3z8s55d',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'bmmfem5mmnu8ltppfxqcq7rq6197fc4is693bj09srpq1fv7g0',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'mcjmrej4mheas32e8yvk',
                party: 'aixiohccbktbx2d2jlbq90rtxt0jze3cq8glfl8j206tegcfd47s0m7pcupg8fqzj60cm523m270wflfjxlu1qdg1bdn4f50dd5r9i41q249uyl5kac2hlfpyfvnd8gprmawzkayr58214z5kc7kbuw5ddafu8rn',
                component: '8lly3mpilduj04ptymkis1n7otdlsgzgo55n0ttm2cb6yut1h32rlvhfxt6rycdkzpcb4gg7ar1zrpyd4u7buwvabjfdkehobfuvco09oy1e2d5bvcaf2n8cw1nlpejx70g7lxv4i5nkihrak5v1651a2l6gs58q',
                name: 'hxn3n1sgvyxyyvkxzmyk8v90dnjg5q2m1rv74xgupdxdb6ge7ng8qjhnn0dsunvghyhl0zgfsig7fxq5yuish6o1vmuuq9uhk6o0jomsg10i5c5hbw6n4x4naxsjfdu34l022n6qranam3c5ud8m7syynug2cuuk',
                flowHash: 'ta1i3i9wzt0jceu3q4h3s2bah563wgp2szdgh002',
                flowParty: 'vfhltckrerz58zuw91y6ggw2aoc9f4resog4d2m1zndphs5jcniwy1eboq99rxtbiuqm06fik8a5zcxs1eyd9hy5o5y2t6fv2w59pl1jukxzwfrnhp18dh8as57bvsl4vvwccc8mjv8fihjukz07zwx8m8xb63dg',
                flowComponent: 'ipok9ir66s7ipatnjgvvygxw09itdgai2e4pvkf1zqcx0lhworo0v77b9rmq1d9v5nmg4x6qc0490i257l028hxypriy5lqg9xdf8rxdcssbd86bxyt83mmog0g74h6264pndwhi986bep75pd7t839akuk3r60n',
                flowInterfaceName: 'b4qb84a8ichxbg1unae78tkuskdm02lnsc5rxj8zgzkux1756x9hp2s485o83yodopo6dn0y9qe61z1c8j1i9d24bwgva08qx2zyytgeskcj40e7dkhm8hwu4balga6ybizor00rmwqzoiyp2mni4dr8c47plm9g',
                flowInterfaceNamespace: 'vp67kvrrbcau0q88fj80vzltdvamg72qb1p4aczj997mx5tqv2emv4ccxt3howh8ok49s6v4sbyyx22y4o7gqjo5i3d52kgfsz7qlzvhj0f2vuoqyqb1f064frehzmxax1w63k2wwjpauly4duf0xbro4kkc58gq',
                version: 'nl38sgady2uzmro70fvn',
                adapterType: 'helvau2j8lvkawaomhrx15l55sul9xlkgplrdsnqk9pb4kelyt1gc16di76v',
                direction: 'RECEIVER',
                transportProtocol: '95wh4syffie5r9hrbrdumzz0rp67pfojpcnoaq77aokgk9ioz8n7nsdki9ve',
                messageProtocol: '9v18wvri730l262fem99pvasd1avcx84xp6gnltclib6rtkzyf4w14jzsjmc',
                adapterEngineName: 'zl11id8fm0oja2z1978k72kzcx8j8rgtfa5w3wj3c00a409uy676jaipqlgxi4g8hzsa4j0flcdl3j4fryqbp44iwmff2s91syne7yr864aivhsfhm1diw8i1v9yu3fr0k68jdfrhw5cle60t8pdyyc0ns9hsglgh',
                url: '3jx4gt66i8z1dmrg9ww2t0pvrgfcs1l3ddxqwsojfkj1deuh90pjtdzb0jswd74et1blfvobg2c470x4rxatg37td7b1639tnn82hoaandt2bloe86n56hnrsfpq8eupoo34z4lvrvo78yjzmug89pnbfiydw9rk2itmk7bvorzs9qoke2zppydobsx95zv7coytfe5qzc0xvejrxg0advdjb9g0mmvz2x2bukvsnw4irdl708kez6to27ujsqzsgj3mlqsm5saxvtrz92jzpc509k1ywz6cvd7fifd7uz9fdzg4t1j3nzrudjo1joi5',
                username: 'uhqo7j7s1ak78w7hxvupewschqwbyo0zc6xud9vt5beaplzdal780bfp1w4g',
                remoteHost: 'wcpwlayev5g7zcfhktpv1391571aa7sjk49wzgs0e2wrecjxyd5j7zc2poex58fux2xt82gyurr2rmj5yppoma4suzyidt55wqp2zmq5fetlskskjxw976sipzwemfqo849n3uawsiv7si160lzamdkqlrlbjhdi',
                remotePort: 2199884347,
                directory: '5exfb5eywj7eobupzgi89lflvv3tjag2b4u4bu8n8zo2cay0pkft97uzsvgx4g9ty8x2fyjizssnlcznn76c5gz18lgs3vgr9w68q79gcjhltmqy6es6k181d7wfw9c84n3443enzd4uc0j394y1zr8481z6i0mnkm2qjw0673q3ax0nat4tzb4plu317015dkgflfyi3tg5wgobhcfr9tr3qqq6n5wbhn1edyg92y2skyxyeba9k2ncaweb3gxu1cnb4iode12gdf537jsd0whqjmnn2gwipdhqahxgxeytk9x190lki4q2slv7gatefx4twzg0dw3cxjsec2c28peyznmrvbwszppusfdhhrvqdn722ypo57mybi2dvh74wm46gl477i404wyld7mfafuqfl7ubuc8gqh0tslngqb3yldlieihc1n7kaaj09rtaophfvmd3dando2yrik28wsxg4ysvebfu4b5gp9qzm7zfavycm0hx4s5qghpn0efogjzvtm8nyiikhtlgq23av9tfr4hah02c8yad1d1k8fzjart2fxq81kgwl77l1f881k6ckef52t33japprpj09d5xo18e16jdb1msp0yz0po8xcixd1pyob25c46e8vz5ezh59sxzsovxupmf8hs2lw3v84ue95eqeyurm84e59o45j71i6qf2yqjf4i3gqka15x3brwbyfzvtxcuxbt6gtqhvrls0vhwq4mx64fbjlctw51xt25f4oqdv7jabb3n09ofoplia1y2xq3t2o0qwt00qvv9daum9c92yx36uelm07266ujcq5wml1edqloqcanxl4sigvz8k8cbusswht9ndoupfan1dfosi0pldl5ndpew3x9rbv0er0c6mtcnf0gq1g7rlx34pw41s8jwqlpxm89aumm2q2i1atbwd2y32r7gtpu4y8zi7xa8qqd5n9rqscijxipd5p6bbhitv1n7szmqmcq2zxfzt2hovxt8rtuu8bnffeq4nuqv7np',
                fileSchema: 'qots5x6mfwztmvtuv4mkdsu02etbha4c6w9jymkmzbcebfu40ip3pgryiwbml7gc38j0j1106xy70fj0edp6nn7x55vy43xnw8y2lbzp5vs39cvakbkca47f7553ba34dstdpzqayiqg7al5jp5v6352zxyz7rm3juocak0nh55yoywv8p98q3zoui5fuw3k9sfaacbpghpw2pwtks8tjm43ti5l0qyhbjgn623i94ii7j7my6iuwg96t0vua6y5e3funjjqo0ebjuqch8rgyhlwnb837lpvoajxi7m9wynr3e6ki6d903y62kazgkoy9luz0862038ig1w9fk41z5uyoziwy7iohgg12qpj27u0zfmy3m2oqva1or56842u3e1lfcgvmtnfm2u5vr1fp1jwwsta0yeoiznvnrns3lyfrl39ffhfgapwveo11kgwgu6dqmfs37hiaztqv841hap52utju7l2qskwtj0wepz1t3444qnteg2i3zbv8xm8cyy6vuxa3a69oaqke4dcs6057gry055w149k4c9l08ask7oydeukdl0xxacsouatkupuzoqpb8l7r5r8ho0q4tbo8cs0lu4cjyzfhjs2qjskoqlmyu7h8ryee87v9s3gczc902r4ghxjrmce8o0sx7oosic9jt8jpl80oht9aubjipkt2jb2nfltkvay0dcgqwx8yek6a68pal625s3xx345026x287vgil2xk3v8use4s2pnfk9nfu2fnfv2vb132xxmpf6aa7g3bb84m928iycfu2b0fbjbec88xj19aha9mnttup0dkfpmcqhsx10990t5ze0d1pfuxfpvfaj6i018wp7gjinhjmow6cxq73ju971k75ghca98b0ok5nu7qirda20h1cvi13wfsccb733uhi7att0r8wqw0zzn3ni6pw3avbhyx76250no2vp92t27mo5soiqr6op7ac6rmewprvd9ido9wo30k9q8oiyc39xd57s7e9l1da6l3t3',
                proxyHost: '79fmm6p6ss5sj0insz8hl9wkjuslxl45vjeu28k2dyudce0y5qgq9wq1671p',
                proxyPort: 6172817435,
                destination: 'mgpjwfhrar5t7zzw39ggpjm9j6l813g7oax1qxf5ld88wnlfx4abq40vp6opkyw4aw34qo2plgmwwx4wxfanbwvrxsbv1nzj1j691fcoy18qrdear8wsa4erdjrv7qogmewqkajcod6nex8e2f8vapspddbnuawx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'owxr8y1gt7eu1fpg1h3kfr1azuzbu26d8y4v52cseetoab92v32q5sa3ewjdpfezu5astclt7d52o6nzsq9ep3m2u122juoctx8xuhteeiljefangt7epftmd4drjvxmmuw1f5pqpndxoe6aw4zrp6h4wn5h961i',
                responsibleUserAccountName: 'np64pyif9r36vhm7z6t0',
                lastChangeUserAccount: '5dztdwmoqee9ggpfjiib',
                lastChangedAt: '2020-08-05 02:46:06',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '4vroyaurxyug5w0r9hbld8xolijdyx8cd54recy9',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 's1akirwvtv5gzma9iyakumeaqlu4wkav8n2k6jc7o4lxz03izs',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'eeijfsw8dpy9nhpve5zc',
                party: 'g8wu26hwaz6y5xijhx8nni6zvgzxuyhscc6b4etievx9h528xwgjx068okroqyxh1a1x5sm5rjmudcymdk445asixohhbfjljkudmg0c70nd1kqv5na6bin8whfpnwe0ki0wsfvenh1b572en608zx2af81h7uea',
                component: 'evxwyzgdffnwloomlyi46r1hckr7m1tfbtcm7djbn32rjb1yvawzjhlz3kb85j7ttxvb2zxvwi9fqv59xaaroktikw7190229jq7jmbd3f9mue12m4hf63e8j3pxazku8m9bsg4ee6vuhbbqb0vuwy9bepifpdc7',
                name: 'cmu2firxzoig7s10mnoeb2zhe3hy6xajfcb2nsgesnyl104t0s1mzj2841p6x6w59zcm6gin61yva1cg1rlpzhfazmzu02mlpkr9divm9q9v9z6nk30emg98r7w6qve5n3hv2856r90moxsiutfonu6wcmt56mp9',
                flowHash: 'ld1k2mfn1s5w4cyf9nspj0flzdw3qz0mrt98z9ow',
                flowParty: 'yqrr96zfoak4vfzmdqcel4gdinet2czaugx587ieaj63eiy0cnhj3b5661s4cm54501aqohbdt132ah4mok2x1m9wld9z3swr59aplm8pefwqu7vegy67mbj7kqjo4w4ztlrbnurhqvektmdb9q4ivrlykghidxo',
                flowComponent: '8ag6gozdcfwzk3kbi4f5apipeu7v84kcoeklpzfma60osaujdyr78yobtgl1q6r59v2wu4bczty1zqddnnmuie5a4coorut64qoxwgp1cjql7q9whvs9gu8aewrizvsbqa4szlih5544lsxxtbjqjzq2rs786ct9',
                flowInterfaceName: 'uom5p4gp9nzgfqwvkrhqt3b8jb9o70vec8752naiihjiyu71pxq1prfa19gm84xw4i44gg68vb9wo981t356n56rhkq0715mwva6al0g5sejlwtchq9v99l45ooele0059oiyfem9aa26ezqpe87u6pc6pjfa39v',
                flowInterfaceNamespace: 'rrax6ihm5jff9n3v0aqodg56wozfnyrt667hg9i9leshd4t0ebc8ja2zq1d4baaffjoszq5nsx54npj3f5h4gr003m1gxg5oy5iusgkf3v19bqxtxs5bt3h0fg9olqrxpdp2by661z860rp0funq9qudnlq2352s',
                version: 'es4hzp325xl2caoduvpz',
                adapterType: 'abzphm97ao6s7kjig7qefv739roho5ouuf8rhyl7fampm2ps7l17jxz8lwwo',
                direction: 'SENDER',
                transportProtocol: 't7e2aq1ku9apeabebx6kwo49e7wy6ou0erwdjkdrk7hf37rz24ztfbjf5877',
                messageProtocol: 'x5r2udfemllqf7vlps25rzwxsccvsvjpkyf92c0k3yh2d5p1lpz0sf0e2p6s',
                adapterEngineName: '73qc98j4jb70tuf12o5e0t1hxrdaqp2ylcs0plii1lldbzj3qmyexsqx8fh9gac1hvmfw9p6o8rz128tbpo2b78abq8mrqbl69amkzvu1c30agxs9vkmwapkm9pewdngs1ve7axponm88w1aug88af5jhkvepts7',
                url: 'ajv0xnigxqbk6duyeydg9i3svdczso9fybamhqurqjnrtd1g3zl1w3s2chfket7wf6thow6o42qkx0qo1k5e3u24m9y1aax62k730avdsf0vynt2ucyo152k02ftt80itc0aqrua4krwlvduyr9wxcwsnvf9szmuuo1eagrlxue2phdxfcaws94slrpaj2ye326ot3o8z39w6vmm41q0ccztllvfkp9r3dor009a0kak9935lyie64eap8mx8w8y2gyh0rio8bu72b7huz3b80gsl38aoivborwf4mpsz26z96vv6nrwhnl1jby48du5q',
                username: 'lnc9zt8avlvhe1gn70m1dd16101qykfgujututnattsnzodnjxpj7uc9miga',
                remoteHost: 'ry9g1unjsv3gxo45psn0bb5jcfoimb2xh2ip5115pwn49ukfa21hhp77obhl1xcdu43zmqqv19ufgv5lnxbnal4mkz877kchw4ojr6q8e7ygm8klb7cbn05fbarqqyjeku0uhu7umixe2zcvldwdl9w8g2llm9y6',
                remotePort: 2396732549,
                directory: 'ktfc3vj1loeng2eecqx5buhsib1ymo4nw81sx6tk7pp13h1mbznswdui57mccjplogqi1tgubovefqvrichb7cqgpr49c3cdvzn5xzvbuex0rzfeeui37tw6hj6uacoyvku182f0sgh060ldakubu5bduvv6ski2corbj6mbw93gb4ul4l694aly9qn8m780g663k4kla863aj2jgcf8g3d81ai05myq5ijd8mz0tvsejaknfrciaw3lp83voeqep19ajxe864z5vnwyv69kz7xzljf5x7mlf98bocso58exbxykadsrgdjqcvtdyebymg72tam6nv765utir0llc4kl5vub1dntc7lgdub8ga609s2kyd0dm97takxuqjdvyu2ckrv0ffzy4xcmyujf7okagc75x0vbnmdq21bh015qlgftfujzengk4irua9a0825t31tv8d9uwxfky4edr151yxzz0ki1p23uaj4lp9o1asn6s8ozruudwhwmdv1f5r8flykep3jjdot7pty1xunicqqb8lp0z7m7fm5mfc4gdxdk8hlm87vuailn8h0nh0tkzwhsy31at9tt917o8uos2e1bullsnxmsgrif54lgcupx9dagc43dc3i8yxr94qv3741hpu9atp9xc6cg42gvhq98n8496sypmorlbllcrcfurmqckqh3xjxuyz09ssgm6glkp6999fwbjb5vrkgk0q548ytb0ko6z8hdep50so4t8ft7ymcqxe5t5soce44cmb8jypcaie2p6luxird5gr4z5i5owhzztuzueq3l7t8hgxndhrcsmk31cppvagax6jiwk3gqdoiv00cz5waute1i1fyyi0mjgog88eosve0978t6nnylgb2j1m3kec2kc51663tfpb4x8htf7qn4f2zh6pmlh2z0o4rnwet0w6zctzdfai1lsu5xev9ia9x0ax67agctien8y9a2v7j3uefzyscqakeqzqoxd0w9zlzc5agbqpbmt1je15iy',
                fileSchema: '4ge080jgraya0gwr54xdo1kgq8tiamy5fr06fqlbq1xh0bflow2hp1pstfule8zzccvo99rgmi7ayh7km5xlz4tqqz8r7as2tze9h3op502br6qvkqn5juv0u2uvaz7duobbeqga21q0wfiu6iu3mpqbev7m67b9kebec895weyjolyjfais7pbkdg1x10hfxrjdson48so7knpre9y955p0dxo0iyx26r43m2vlkh8d45343megl2ckt8dga79wgcsnweb0j3rkt1mkf32s285b4kqjpcww9u3fywwqjwnoka521inq15uvufhan6dyhrcpv9zr4iw072yb734x1z9kkfgpxxid7dvgk8kkdhopgbkxudwq4xw73627m53odn8011409ww7l68cjnjeor7isf7tru09v2hvtpzifshc1fx2imu9o8fhj8yqk86maeo91qy7gr1dd77a4ifwu2evt1bf7jb0et2iippkqodkqkq83abdbcsirn9zba7j6krb7ijqzv1fsxbomcenvv4bfuh9g77f6vye427jf77wxmo434hqurp1rd03u2d2cjku9vq04dxbi04cv2669k7931fjhymfv0pqcbhhbjtfysbuz4y3jrs5i5bybmk8tpf5rz992w3zcc3uotfncwx6sr9ybmrg1rqq9eu692aiyif2l87n5igy1aq11xxhn1ghqnlty1fxhnokcvok4ooybuye2nsxl78z0bavqt6jcdftw7w2tppz5ssj7wclp1t2wua6hwv3sjwbqp5lzjer1b56aly6f02ot6q18br1j82l3l4pvtjc0w3usd6ddtszmmkmtpmrsh0v3pphxj2p54mf0qskwbyc3u7o0fy52nqrzhked5y5hbhtgce6rq6y0etj9qvcjv34g6272m3gabuf9n87jucev2d25uyldjiq6m4a30w0llb8bk312y7mpzfghtvy1uutmkaippgmkvfzlmmnqtgjxdnl87z5mccvnwobrd2oi63x4fnp',
                proxyHost: '0qm8227en2r05ntd9mgextwyvb0i724mhcvpc06t19grrrr6swu1n5i5aiio',
                proxyPort: 7938487033,
                destination: 'x33eljle8tpz8ur61xxczm1vwh48do3bfrf4c6x80uzbfg7zpe3fr39qk4tkt8cdnwxd575t382ps4e0uesewyt6u5ew8i8o5v2zn139gjuabq749nh0f9zbwndn9b1trpa8glg1gize2c7w6zd630s45zjbt3u0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm7o2o6e8gd6dexbfszp355npfus9xswz2v6pyh4g32svbambgidpwouujujgor59xgg0ldcg3jhqrhm8v4c2a6j68tdx1esf72ngpt52mrig7b832kyltb7ob8yuegi8rol4d9mcxcq2oakkugnwwz3pfg5rjp62',
                responsibleUserAccountName: '08zebbiiuokrdytci752',
                lastChangeUserAccount: 'mve7k3n6c3omwt9qzdc1',
                lastChangedAt: '2020-08-04 09:34:00',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'h9vvdri0dx8ak0cdcsaw801g7llywn4bl7t6gs1w',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'g7fu99dqfagjvvsx50uyf46ztw352ydawzzjwsa7n78ufhppzn',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'gybtfik15srzc1irxuug',
                party: '0pge1gvxdg41l5xzzfnaf0argbdp0pxedh5iysp6osjzza9yyssoon7eozzu7ywiidzxlxvim4rkfmqiziqwb7oynm0hfk0fotef094kohh0uhyun5u1b7aw93bid3o2sbp2l7ikgixyybxbtdp36tfdqnin1dcd',
                component: 'mof4fkz5i45m6jbvkpvytypy7pvu5nzdnhfm6k6tkbfoe2077tnlrtnqdwxaofy42hx396y29x22nsduul018orvkg0klv31oum22qhc31kkdyv13cbpytmz92oz9e9fsvbbyxc43saishl1cr8bqsfu58ah8adc',
                name: 'hd1gzslo2ntlxijvk35ry9x7gdsstpcr8vwv2qkeoxx4epopps53qico5iyc6xskpaol50q31wgrlbjv87umei2aaqy6da3tsb4gq15tiw1mol4gex7stolu1agitomkbrwww0ihgetoq9h2j25bfipexmjdfogb',
                flowHash: '9jk1d1jxmizrxbf59jki73406zzbnw3g0q4cfmy1',
                flowParty: 'l3gut5c7nk0v84ukzefx03zuhz3jia34z9ynfmz7as9pswnv0y02qf64u5l9ctthu2rgop59dkjkxm1jb0spsgbici02xzxgu7lw9ahjihtiw3cw5dwml8z5tartkqhu3wwdfnmwu4j9g1kmymjt2gsz0lhlbbbv',
                flowComponent: 'ckq21shbd1krbwiq0miuqis4ibsoyngh9fpmebm8m18dwjdnfnpdu1ii47cyhsdhao0c15c2bjwjnjq5fqnco8nn7xpau2nk8ege875c92u23dqg3fbyr0nbadg8054guuxm9f90e6cj518wz7c6z09j973sbmw9',
                flowInterfaceName: 'forufxhlk1w0bq8ibwj105lzfs20h1olz6j17jscpyp73gpdfl8xequu477zeirvq8u3rvhq0ofutc8w12snr46fqp58l759i9sm9dgbej4olyheou1phc7yp4brys9ttmwtiihikj59fre8ekw5rmr6ziisop6d',
                flowInterfaceNamespace: 'qav3omy89h06w6tniy8yn9z4i42u6o3skvb265jp0emcetxyc1obz62zl3jfb98bmd5cw55ths142xu8juelrga0c3pxvkycqhzi5edzzlhtzfp618eht6qdpim3x8umidnkqyg5o6ga4i6zou7l0i4nu2zibrli',
                version: '2d8bk8f9mixzv6qlurd8',
                adapterType: '0smtx4eesz4kb445calsva6boigl98k3k8u62egwya5htw0v9s36f7wr0fg5',
                direction: 'RECEIVER',
                transportProtocol: 'blhuhzmb63du2jsnpekanv2mbai0e2isfj8suk1e6a3djivpq63clqgcplz7',
                messageProtocol: 'd0ga9b0jy3zhiatcexy265lsnecdhbai5ulqwdj2wmew4zojailbi7whdedk',
                adapterEngineName: 'cxsdqypkhebniin3u85plahvhu8seuoam9wcxc38ob9mf1tv3g93v13fqv3g05or9fxq45af6hwkirca1gqqwk97pgov6wdqh9oq6rowchongxubifdpina0c7h8svrgifa8mm678fws479jlsx9weuzkvu3pfpv',
                url: 'mmbse6cmex7zesqy8knn7q6et458k2keprew39puw71n14otelrvnza83tkn2baf67z8vn6ri8411pmlh4wfzsaehndnup5btqcdu8ssqkoyvdhi2n6ug9abnbusv25qt2f263zmlddk2ld9bbongci892n4755jff5x8t576sj4gk9yv8wb4djrbovkjatzhr8yws1lete526h7l2eseuh5y8hk103xi50v0qpl5cpgbqr07mbwpg6sdtbod38pk8efrykwmxkavtdgeb93hde0dughbgr0ibyydciuz17xoqpl0gj2g0ahivieyalx',
                username: '04s25brjs4fp5v93oaeru4g8361pwxflscm0trp2d4tioo5jn22pe154q46jp',
                remoteHost: 'k4y8pb3bki3fbmksl42q6qrts7n9iwc2guevmb2p64k2wjw4g6yxlqy4nk56glkrmebhfn2h6q83fi0ny803cdga8nobprkp9kglb664hi6pnpmmgtfb2nk1jq3ztmuv3okgn9jfqll37xa9iap0krutnnonlq09',
                remotePort: 8597981178,
                directory: 'nysm6jomgbidaoxxwftlryrbgzdjlzjyrjuebdb9r5k1jhcw8ba1f8l9es8o8raib3fuf3xn4lu5tsy1x8byel40zjjx5y5qbt170x508jv7cql0k28rerc4b7n9cjk5r70w6umfg0wn6dbti6sf242ibuu1knlnt9udzwoxa116gv4yh3d6j06jkkk9j33mq9gwtd5pcs0w1t2of4bcbrgi9oxsjzqw4x0nhl45l3z380u8efsqikp4d5qmmuwx3vs1m34vm4smklkflvf4943hg8aprmsbswwatbj0o0r3v5oxf8gq5zva37wr3yfaxod5sw194wqfq0ly4vo7c952ujxcs5cqx0j8t7lmwmi50djo7djjrk0q680290rzbnwb5x5ahs08f4snghod9vr9fvqjm5g6ba6o9v7cvpfea8asd7s3g5gi7lrjrbg11kdfpsnmash3xicndojkwnia7hsqys6oa2w2hmlb68m0bqvmu102b6ipwm41oz38ngg9uaznosakljgtwlv726g3xez9gw6zffxxyzb48ltdsqp79d22bk785d9390l7eeonkd9a5r59p5g66y2329o4cuqlh2zycg1sw8h6wv7a5c077y80e5v574j1gz2lu8nuzdno2y276lw6jswejmzd0dij3ng1v31e715l8s6wt33jf094okquy2tyda27pfzdbz2smn7fmoept5fi3nd5berozl5ylrs4t0w38343eo4xfohx7w2xvunfoud3vqmozigmx550bgclx2l8xvd0b2krsj6idbdhhvc8ilpn60e7f12u7qt0t7ndgifdl9drdw8flpnlgnxy88rtw52vxbkm73a1c86y8rda53ng63uihyj00pahtgdpk26ndnh4naw0o02scbkq4e8aravg27pinbei7uopxqhk80nxj7la4ka901rq6lgguc0v4ovwtqf9w35nnepijnoh9370wilswqmyreuzckpaqdb8q25jo6k5tkc6haqn8dyo',
                fileSchema: 'ng3ttusdrj2hmvkujmu1xj71sx7al27zt1ouimvt8thdy5vr6os452ojklaf72v0yh95opgqtkfyti8g1m5g5ncz79ccfzlpefhzqm8vzsm6acyldeqqxu2n3xo7s5rflq2img7a47eo3ivn6ybysc96jk4l6m5qw0zoztexwh24zzkb9cgv77y485oxqdv8l5xa3hq8gw07sqgp91dv5feplo62ghd53vaq6syy4advmetbec8i8azu803t47xz5uprq9sh2cc6h1o0mujcjr88lnafhw0x0t32avpx2t02v01vnfm82w6aw6k61di3xskgymgamp4zdrmqa1xt9qfazewtjfhexk4jcy4g688rxa9lyds0r6vyps7v0b881i7l3a2lkmnumi54pjqr7osd1qxms0bsa52lmn40qxqd1vhp2jqe0agwfvkqqpctoxsmdrhles3otycqt83n8d9xvist1kh80rwcirxyl6hfywart592bmun5dc8gasv3ipg1z3e6cyqj2q6n14rjuud8ng626mcha9zhqadibyhxg9qqht0l0z8wok8s926n0anq3t6jl5v17x48kqfklzjyjmuf5uvuopypsemhul692cqlv19e3o347ocmx1lo6pieqal3k8c6yocb5y35x99ecrkh6xjb632jfrb567el7ay4gaehc6w6c6248bt2dzwmsvhb0zvjsnzay4sdo55dk7fal7z2436s0jqpx61ilgk4yt1fn35iyknpit444jc5utt3a6om5forlz3udps72z0fqmbrgb1qiasvi7lonkfdipsn5r4n822pvqe2piukoa6szhpuwb85ce6r6jwegdjd75gr2tyn4e7buemkhbmsrsm5icst6io19s2zwkvslopju3xbexlsf9j9ku6nfknlthrssd2zlt3jkcu0etdctht9gujqtffzw7gdf0633jvs2tmmwqcapn7sbnh8xtjyhpenuf5ys5uyt0893q7aukqagr4o8h5suo5',
                proxyHost: '9jmia9meohjuqrc5123pqoctbfltmpn11z33qp89ejmutekheredwkaoea2y',
                proxyPort: 1986058687,
                destination: '4v2d6zl994x6mh07fi38r5jkrkus70fshappjvh80jtp1l3al0c20voqdtpcht4110w85mnni3mosckq6wvvio5wtllshxyi89qenmeq4j6jcl2cy6yp6mhb9u7b147oiilbrkqe90bwq3ic0vlyu2l04i5ik9t2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0ttzm1urzzei5gl3zrgqnshie259gsggs93tw1oz2ojs5vsfgwj82nr0bbu78j4yk7uzsjkdnxeuyynzvpvtp51t8jtzq0i4c11cvf7h9j356f6yrf5hhwzkdczy4f7o2xct3cvd1rvxzdm0v3yji9ivemdiwdgd',
                responsibleUserAccountName: '7yaiandcop0uhub9v5a9',
                lastChangeUserAccount: 'gozado5qwpwhax8lkna5',
                lastChangedAt: '2020-08-04 23:33:42',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'abkeo6ha5496xkkxu1ku0czhgc95jwlz2wks1717',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'iajuw36jogxow9foth8qo3d76a5yqciu5qjtpikkl30yc8t2u5',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '9eccy3dca1814dw8ahox',
                party: 'zy1gi0a7rsggytb11x07u07xgtzne1nmwv84ih4w05kwq0ci29tj39ftwpw657le5ycn3u32k2qpmndl4ydkmo3vdj72fhvtbjj71ubr5gg5ll379fhhix5ty1fbhz0yd19g7wmnyzemqybhgx7lls7beuizbg4t',
                component: 'z6f41hz5dcoq774q7vlku8eu3z23xgzwgh449olhg39hb2x8vm869yqx9m2di19do9l2u0jc49mcj2loen1yusa17oq8dkzlkip2jlhqsz1jz36foc9uqkf4uxth1v67qcfq66xj5wqks51bb2qhf5chqud9zzvw',
                name: 'r1yzwnp9luogesni4bmpanagykdlb36eng5ju46kdpa14vflpeoiobu8mm8gf48v7y75duuhsi6bj8ojp6feypn67ap8frhl80ora5h6xsqvf8i124dzpcyygitw5eaocchesp171lrom3m0zbv0qau4mw0jlw9w',
                flowHash: 'l692y0uhl3u4uaj0vjrevzfrmgtrz87ubxx2pwak',
                flowParty: '81sxlk321hmx8ulvb92dvivkfmsy88k8hqntw7pkaif3tss8xc4xxuymirrzkw06iftvoz8nzhnwkf6cvulvbbqp7e87egfecvc6zywqgqzlm9nyx9ydv8hehsdhmdm4eg9izxpfxqqhkgsn9yowr9ffmtbivqvx',
                flowComponent: 'c89tjbtchzjlt3bxf83etwiylxsjydwndc7v8vc8341lnrqiemfh4enl9ke4s565ul2sq26illm9sexdsv5na6vo9hi00rkmbj6psqdb2tuz54v41a6o911ziwepzes8nqrw0016pq42m0b2m9teodfzzi5ft8hb',
                flowInterfaceName: 'n60rn1yey9ljojmxm2ciwxezpmw2xi4gntpu97nrcmq3veo8vxsw700haexagm2o0x4qrdj10evguyy648rp5046r4pdsjiho4z4ensmk89b27qb33kskjpt5qdiotxuvvepajzw5o6l268nmba46k1qv513ph57',
                flowInterfaceNamespace: 'nkift1jwe3v40k020aqocav91btak33ybulzjrben27915y6uehlnszywdc0jw5e3xxrpk9xzptbcgnyh5mv7hbbyyvh2jdbvdr5px1blwmxs8iligtmqsm896t1jtho5nkbd3x06v4fay17doqmqdbpw1rffzdz',
                version: '2m08eegiwjv0rznhh9m2',
                adapterType: '3rcjtkuppvefj0m9meltiivfkszbqsj7t64yokfafu3vvhtri68ge8g6h8uy',
                direction: 'SENDER',
                transportProtocol: 'n7wb0nurb2vgxz04a7ur0o50i7kbrsx89tdao07gpprdyd9wsudn5b69w77x',
                messageProtocol: 'u36nklqj30fr0ku9zxlgkjqazkenm1tyt2jipovobm0ft4tkdqgdl1f0gpcx',
                adapterEngineName: 'pbinc7a2ahli6oc7bv3jh3up8s8umi653rs2fy2vszv0gi53hxtqrxi580v14u3wgc2s3i911ufd9xidrq0er3zxbvg84g13rr6or74jd0632dd01qxvrx53yrsvc4mf8v8wjlwuu4frq62sr8jspox99i4ikxm4',
                url: '6i2b0ldlwca1w2fds1bzawtp0jfo6a1dagtoikcbonmknm1ayx9vqsxunkae8ujw6vtr6xxbveatd4q7n6rexax50me814sg0or4gim3j2cv99liht1xdkume4kb8hk1hq78q5jfwixaouy57y9chtshquu59drkx43548as5qrvhzhxi2hymqvlm3s4ij3mt9rhb4xso8jl5euz6wo6de83sgursjonsn93suqhx79wrbhbo44omai1rp8ff5aq8q4q3j3z5kvrs7gck41u7ria31g44u7t3r0sxzbrey6hyti7p6237j2ytuqw99an',
                username: 'st2u722tinxaor8evcho7cteje9oquhuxtacdmfrl7r3fz6cx3ve59psw3m9',
                remoteHost: '2eae152m37p03n8mqsr796ivtuqweifmf7ip683c953gvrq0bbqs31zxq3qfsbdvm9qsrqcsunpn9ya5877w1q4hubn7e4xvbthfb45anhraegqkxndpm8rjbr1em1y61oy9cfyu0cf2zjmrb4d6x6w81ofedqnnz',
                remotePort: 5095980666,
                directory: '1sz4zk79psiu7up03sr2tgyw9o6yvfatojatyikxs3v0eh29rcioauyzx8dwbd22zm4b0tz5tm4nvfdpzzddn6ajzsej5e1r8mhgd0k5jbp0c5cpdg9jxg971r899d3glvmzle5xgw0212vbbyosw9z8dbz51pwhedutgt4o5ihn3ux5a14q9kl0hv1qy8kf911jm4fl4fl84bmdij29s8paj3nj7y424n352y0ay7tbbf4v3iiki4gja6n67w3fz3h94y0tvsl5f0jp71b6d38gw1g49tbeh7q32nnwzicttbbewlcuookjcuwhmaqqabvpcaxr67dqotqdn2bvzm9xstzg573k7sblm0uae28g7bwmny8eqb7z1f5vpdqy8qpz3h4sl3p66j9xvo6wn0w0s26iqyn6lq9hattoxt9twcx5omyzyupd40fw4zl4yayjxvp7k5uvhsknk7oqztt5mgxlkhlxxd22rq8l7wwsq6kwq2khjp9inhzx42w60tk0u7p5bauh1klnk8el8d5ijilh74mhvazqusojcruuma7iz9pmdkrwb3j15fwsduzbdfidfegdcre591vg57b0ojhqw3ajg5kvvvv3v6dj6oug0ac2g91osbysuzjveogr37prjppukkfrk7b87ynluqjtx4f338z6er1v8tvu5zr008jl33p7vzlyflemy1vo4gsrt999dfr56ex6wj6rzagmasl1syvbzxrtc38acyv88slbkxey8pznoedou3dtp97mrcjh5ai333bxrhfkc1frkgr91or5uf5g02izxbhv5ifynt6fgdxlp9sg2t9cnmwtrob0k3ssfmts4di8az1y2lb7jyugg7znulz3w0ylu8gq3mtt8zqegxcagbyikihi9sgtwbsvz3gkr1berefhmg26wxevbxzx6wyct520rw93mqa89j0cm991ucnyo3kdhyt9jwm6m12zjri51muwyduyxfrsn3znz8hgyx6l2s28mffkzsm3xg0l',
                fileSchema: 'c5cxev1vaur7pi3daxodrgm8p5y89es7qrgo5y1pzgqpk5z0az63go8pp082k84nxpwkb2tf1iftxumaa5kw8t3zmnoc45iuh9zfm9ucytpytctcs5oglh2rl2x5n65kj120n07exu1j4bmk7fi7yio87f7zcpxl1lyhw43hgd45cdgfymh0no3k3bv6qsajhs8oxtsbh3ac7ff0yq68fdnig5koexzi5xqtspfzao8ob44tnotju75hhvagz4k83fsu078txq0o6ow794armffs26uhju9qmijpfgx29efc676qgcmxonypsos8elg25yeo064ttpb82dumknqbo5xmixlvg5cpnrd2myq3suxa22c2d4jn1w53xh2ikbdicsk329p36e0q8hhy191clx4qy02jv9n9a3p4097o6q1lf4tbg82so1sode0l3wd47jjnqaacibu7y7p9bdigd5afndo3yismy0pu3adcr04k9ctfcsx3eic72emojz3qwreftnayk3c9208ghgk5550rg6iwvmad56xbmdons0pxlxn18y1j3fk7ynfsjy5qbta2bgcww7ozwo1dbqocsz00toxp6eyb6097ryimn3uh17ah9sblc9ivt6qi2ghn4nkrhdg4m12j1nevdmayydaxnchafba39yoy3e8fmuovpvek569oo4czb1pmp8vhn08rteg9kmqpidyjk456djiurvgbak2yp6nvfyia4ca2hs5qskvlwfehp3itjpv5xi6mehv4htkh5iqqa7ht9sjaug00fd29bcyvsg8zgnqd679j1k0pu8lh2e0o625cnwfnzu8mf5sf7ys9398ub9lecul2go744ggdpb0ckrmafbt5p9pguklnf422nzkxwqvocnep7pjqpnt6xxtjdtmptwlpxy2mqj2d8ua5ds2gy7zxnxz67xf152e3rez4akdejq32kpvsmsn4gxq9e1l675f3g82xs1k4ey946zf3von6dcm8sv1obkezvbse',
                proxyHost: 'k041l2m50mb64xyjtg1b72n3iplusjihjht44ifr0cxyyua9zom1fmbs95gq',
                proxyPort: 6902149849,
                destination: 'zs4xegn20w3h8m8sjgq3it4r856y41tl9djk4igvl8xohulyxuzf9b6zgbnqt5cab5sy819wizug9cf8fsaw5m66j925kszrdkwytihhgfgh7iswc92bmzcilkdp1ibb9sw6kihkfqw5aiq17ghey8r682jqh0y6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2a5iao4017dz3r2h7lq558w83dss2fghkl8h15edfqdmi6cdnmnmi6r4ptc507lqpup3q001oxe7azyylmva5bey2xabhxu6rbylr0mjj4vbccar9hui16ugs4ufv0nb4a7po98ucb4e7kvhou1yskjtm825pcqg',
                responsibleUserAccountName: 'gw9h9wbmby7v6r9ug9gh',
                lastChangeUserAccount: 'vn1pzuliq6rikm27m4q8',
                lastChangedAt: '2020-08-04 20:32:01',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'qyn2me6nnvd9xbb5gnjc69wovw60apvfrjkk8t96',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'jyq3lbadb4d5bt0nwfzmqksgcvmm4eaj3zx7fkkmwj97hdylpf',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '9xjhrj9oxp2ccrz0vgy1',
                party: 'cxiqvzzsnaku9xd7qr62323iae85aw7wbepccuik79xfuuhcc85fvjuh66trja5apvqnfb3ipztz9gsxa5ow33r23aeqosx9mjvlxsoc9qmx1tt8xr75f9tqcobpoeec77kwgzk4dkn0ud7kz0cq6mc0cy686yt7',
                component: 'no4zyvo8buinygkgdqsirzvy6l9edq38rl43e80tdcvgs4owvyvnnmxv27zm57uvhc1fbkr0e9a8gik20f01oqd9tvr8zk4z95qmtkpnumz3qeyv1owlapz1p9zpfjavfxbbduvsdn8w1ktr9ncv0pcgrwzapyxo',
                name: 'oql1jh8extm1l9dglftnvtyltmw7l217wjio0ua10kfmrxcnu73oxdv9qyz8edctafovsflm2betq2ytekszvu2vsadav097ygvyxdfxsyelnq6t56avo7xhut1az1dsov06nijz3v98vp2aefqjj0xbajpqwx3p',
                flowHash: 'rzil3ul9yqul05cc32uykd1vrd5ds83zsfk8ri4y',
                flowParty: '6vy5koatpon4jcnnaklt6ya46pw6b8vdlo5r3qy6lj83b2egzmnrq39n2gv5xexpyrfv3ts9f8bpx0t7wql0x5snd7tpl73xt5m0afuc58kfjb4lnlan6tcl7lu9eobxcaop7obfxc4mzcmu6xi2rh5z3r86hcko',
                flowComponent: 'tdcvh7nofqc2nhe57lb8vagyd4ndlwvrr3tqfyn88nawvoozpuqp3sqwy1pwnoupzf4igxfom5xpl099e6oy8y1rihhby0luzesm8yhqad3gk0kt2utonhsj5stiasdryrxgthhdtty9p6fzdtco9b9drxnj5e16',
                flowInterfaceName: 'p8kukqptkcuwwbx1hqkhacot0niusse4oaoneoykjb0rthsjrg1so88m658y3c93bm8s79nullwhi5qp1v4ksppdtuobihsannlyi1dp0592ttsv7xad3u3yep41hzptx1qoe0xckjr2y69abp064pgk9ovnhvbw',
                flowInterfaceNamespace: 'bof5xjoc6126p5x3eeepdsxw8cge2tnvdr0j008caio4deee9qjtxz8x769l564mpimc7k2nq1agblfqhsv9qvtqojal252tu5t0lump34qxej16rgr3kvj5hr89eunv2djh7tyb6o1taye8lkqlrhd2cwwd5rej',
                version: '5kxy90a5teutb8cat64l',
                adapterType: 'oefx1844en4kaqluq9w4f8t67bfgxgv1m82av87nbt20fgfju2zm1wnj6m0d',
                direction: 'SENDER',
                transportProtocol: '4fjgtn7a1cij7zm9gcq3zssukfwkca7ocv6ooyrd05bofw7p8n11c8e432i2',
                messageProtocol: 'f3wlzxr2lhl1ro3yo4ugzuxoh66g2awpe0heulcf10h9hgiz4zl068acssr3',
                adapterEngineName: 'oortqbenshgno7n0ea0gtatwhug1aolljx7qk750axak6kulg2vopf6me1kyrrbo76uhy7ypgkjkpifdmz55myq2zx11mgg2g8ugag4fbsxcp1b6jevryantmnrdv6ep4poanc3j43kpt4w4vhas9rn7h76dtgfy',
                url: 'ssf81nlra6zte2onu6z78j4r3htgyhleg9xppzdsd5a8cb38a166glytjjb1hr8cssb0cifgqsjw2w6zrfjx5nlbktipkmcoa4ytmrv1bthm7xm3bqhcy5ksjtzietbmkarx32vhuwwmivn137p8qexbksqd0mi2pihk6shixuimm1yuwl5rpjnckgyn64rxhrdfkael3tgm01q13gdiap4am9m1f2n8wul54a5g94hhsm1nvo3f5k2v0wcxq696bmpstxmzfupzvja0oueg4np88yjy9qyiqp4s82vtls6j1rsfs4wly505zhhm52rk',
                username: 'e2khyfugf4nhd3lo42zqvbbpljybmlvrxdeeb8ukplror0v3nejl5ty97591',
                remoteHost: 'cltd78au0n10mx5rvh4hc7wu6yufbuizy9mtaszqgazw0sl0e162fg6i4vinttqca31rjr2uqij5flm9nt6kcltremidrn55uprdv67p91rt4uhikqenglg0f7snpnjejzby64p8sd581k1e7tfm9bug2k14zjl4',
                remotePort: 98095964289,
                directory: '1vil6mqgodbkgjs59y9e1rqbfbofeu3twxvvwh7vaotrl0iccuwkt0tulshim2lg1e4lv9xcy1oumizjc57hzkwrzpjavwuz9p0jo0zskrra7g0jm5bbddxfpir1tknzlk65i9lh8lzw34enmp9rl8ljko5nwhz5at1175q5gopfb4skjd60a22mwdvw5jytys3e4eogs7679u0m9rchz7qjk2xix8n8b14xb3pgt6ww2fjvk1oy5byf4814dk65igjirnxvel5g8po3vovqvzxrf3sro1w1qbv9cr3zdbqsgiihc6920pji5v1kqzgvnrsm62590wksxk530xrooqtw995uj0wcd7t1cdl4l49fsl9v0xvi065o56ig2qgzej8lu0vf265m9o7vv6mokfey7v23lxllytkeuri9i19bktdsc9dwbzoz65kepauoefsynyzccp19odp8l4ml6t6gm2zqolc5hjk7x8hwlqatgk0acwfk220nw61qp1xb62sfp8az7su0tis5cvw8un58cic8td40p4j13k2fhjht3wxuydmxzzmkslo6trq2xnthyc23r8iva7dmq7lal4m3vd2z21mid0l48seyb845ut0350lnzjlhek4kxps4n76p8yoj2h70zf1lo7af57y7qhwly9933elofo283xb1qq0vq3ib209hm7lztdi3kq35u1vvm2xab8w4yenuev1seezc4j5had03lbzh3yi1rh7wuj0k0yxyoez9df7j43ccjromlk8jfd7yjcjlanoyy5oq27dfe7r1p7th6fgkwfcbmeap5drh8xr9rqyq4le1d0c1jl6bl64jxh4yqfp4ibqj6basctb673ryxbs7am1wicsjj7z2nms7lr7pw11s01p42hl9uqldf8yxlgqwdgkrt82p431vq5brs2ni941th2jswxeqr8v5in30r6qzzq65jrzmlq0124tupd3tufgf1p3hbndel91ylw0qzmwjdqg694bgabx9izu6',
                fileSchema: 'xk1mzv8gciq14bvzsro1oxz67985pob9ixdoeokqpfswieszz3s30tiipjmzxvd9eafjr4xxmmk2y7mh6tvz2ewuvh2jc5wuyqtlf0yaksta8sw3tahltdge882cif7sbt1u2l7blvx8rqh1y7nfp2my43zak54wco9whqd4t9wx0eif1hknqd1q5wrq69w5rjlrizygxheh9bnh2z4nzufd64zwz4x4kt4vgkbd0v4dwduhogwkyqxo7bu2ako27yuhomcbmm5y7ksskgclub6nlxy99t75op2yi5seixokekia1qtojdcxxxfr91dbsouc37kr5kw41yy8x9mieynvjzskid2ejg22jl8kkvvib72ao4obgvshfh4bbqoqujdef4pal6tv0omjr5ahumbwzapiq7x7iahxc0enn2ph3sfw9brsstsh8n2dtvn8l8klvwrlep6q9mumk2odf2d30ym0a3hrvb99xvyj3x2bx6pptfoqxxnzp6z7be1k7er6z3ifboaa2yessvcncemfb4vfog4uucglqn876a09ixilydcovh5l4ena5mcouono4c3cqm2evsgqpa2vjf3hb6cc2ae8hpnppbsmp22cdvw0k12otj5178p9ivi8n0yxz5zfu51197tyks07k6asot8v1yy443popilspra6s90knlsq3h4gbo9gp18rlvmtixrfg20blnmcz9u0q22x8tzwh1y1kx200zrt7nuwaokzyu8zfh2kp7sthq58jjkqtzxm4gppsgtuj442b4kn7j70fglucr53knc22nr64chm7uvo42krb4pn1yg8f4lujf4sab4r5is5y8f9qnxwse9rksrokxnalptlfbpwxkbeeyp0n5p26fwy8ixqkg5j6qc1qoe8l2y0kf5nksmtqfwnfd2rrs26qzct1za231ac82nn6s4vgewjdhu77519d5zs64lpxo1d4lni6fpg8ecizzpnkggyr2hfsupcni74a29pq5wc8oikjpjp',
                proxyHost: 'lxinqtbe4t108tz6ylcaa92n4r7t9zxuawmip21fhv4irqmw8k243nafk53f',
                proxyPort: 9394805571,
                destination: 'qtig1fu0469kb1n6owijl2eekbaoevu8n13kku1onczlngucuctfyq2bbn3dc0u4j1hf8dif4aykj5du93ggxxkbighkr6do1y1tks4rirmzetx9p835sl5sjn1rvslga1j6ux95qju7v46oamioeuyp4dunz986',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zjgxi3am05evkdvherahltfq4r3poppgan6kojsyuz7nla5h9kxxwm8o2wfgm1tdkn9thw7oh1t8tlepl04t33ta5dgwwcxeavzhc9n2k9wr2pp7wqj1hafedzypa02qrmjp8m19svaox4qf8bwv38lt8tl77gie',
                responsibleUserAccountName: 'kg1xoy7y1ckcqsjxkxx8',
                lastChangeUserAccount: 'izh6jja5b4exqog3d7ob',
                lastChangedAt: '2020-08-04 23:41:54',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'nzgj3gcsvi6d6wgcyedvhqfqc5av0lwohkeazx8f',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'eo2qfxxsny21eevxdevo0rxluuhw6x42flnc1etriksjrr8737',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '8jyo8jgs3d4ao8x89jdj',
                party: '2v2jccovvjmqah5pidza5a6s8t3z8vfesf4z9tobd2g4pgwyzzr5xmd7ufv509iv9f4u54wp4nsy7uxpyd65ug6oa1g420q55u9f10jzpemhfr71rad4yozp01xcq8sojr3tp7radus97u189xopeffw3sfzd4pj',
                component: 'y5j8d0izv2kip5js07opu6g7tnp8amzipil2xz33vl4bljjg7qatx8kgwh2qjxllepx8y7dsg7y5y8evcg00pqxaxqszmhoqb9vwgp69m4kkgghr1gygkxwpzassdja9mfj0irfv138fqow4swilwlbu9feta7v8',
                name: 'lx83s4uew5oyzksp54qenmt6wusg74zpiqpqcpsaeodthg6y60bkpmzq2uv60aewy4kpg64u15by2uq84gw4ayze0397qfb1ywht52xof3bjre86pb1bkcq2iko2fi6oaj1kq252up5t29r98rv7jip0pv7g1kps',
                flowHash: 'pbfbywqf5bpvjng8mxl7udyom11z6d9neaycry06',
                flowParty: 'fjjieea5r7t6dnjdwlz9q2n71gyq2rvhrzaz9dw8dg3fkvrgp5ux4qxea5xhodhs6ykmy574huy0k5igc4buu9b44k1to1yaa4ut0vv8u6bfjdsh2500u4v8sgslnk7uvk3qliq0pl28qjng6awr1t427qkqf9vk',
                flowComponent: 'tbwcsuwjje0qgbnb1zh2xlt4su2ufoibvr8hfqfaov5z9gc31bfgivy5roe99banyfm0ej2pfctjkjz64jv79tusu381mxbd7yzx91w920v11urv3y5o4pjjrnd0lm5g2wnzk5pwa1uc91lkde1uhwiwaxb4asp3',
                flowInterfaceName: 'm21r00ekpufmbi1rash1szhcka5arhzc1f34hjxy3q81vkp6s9k20tj3w8tl28hun4dcoen3vdzadx1vy9qwc1p3z8txi24gtf78l5yxatn6kuhimu62ag4u1y1ef9t29ywi1vvlc5a59l2bxknzmt1i62ls1ji8',
                flowInterfaceNamespace: 'xabmtp1ggtisar9nrcewwx9frz5gu3oya2ajwj8mkbqzlm2cwkq6l2ycqzavowtpxyuaw9c6eucqf22fg8t0x3t54q36jabteq7lwxsez49ha0mq11ak6e4d189bq6hdxjrpxoyn7obn6b9imutaqw94a8ui5i73',
                version: 'g3diyav521ssuk0fwt5s',
                adapterType: '1kqyk4hlr6exvg3e0027hvi1okqvw4ezhl0v7rfnw4iyuzch0oeh1yt1ndi6',
                direction: 'RECEIVER',
                transportProtocol: '6a04uown2g6t8x7qeo9qu5wjm1norikjlm6md7xsbh34ea11aghcq3a1f4jg',
                messageProtocol: 'glf5s6joic68wuyrhq5ew3tcfudfx3xh6g6h6fqdw7m0q18qjpgtfuyvlsdw',
                adapterEngineName: 'py8f9lfeg49z9qc7tgpbs1cgtabsvlxjsk9tjmbpfn6n1oc7ahrrpra3k62edp0hhljzf69ltfya72r890cardkzcks6vts6f2jbw0iokwucrd81fkx6yceo4tfjl9p0ggbvd1al10bpv1j7w17t2iu9g06bqasa',
                url: '0qzlmoinzjaxzztgcrxezbd7pdgur7qt1el2vbexlbhgvdp1vbq59lpemd2no9xdupjgdl4eta71wwreisx3k0956d5txohcd8kdsoib39xmykw1cr4nhgj2ip7qqv10iox5q7uefk0qxo6ux8p36so3ddv88vel2ws2ib36wct5vdpzfm2kvzsqpjcusx8n2s1rmqsdb3qmluhuu0em1i0o21tl7zp4taa830voljys2lvvwiqd06coo9syzzoan0d8muvcc6cejn2sc3l2apdtznnw2irwfkyouw5b7s7zqkqlyayvoq1d6iw1oz9u',
                username: 'g57d31lgpkoew37cql9n69t7ejqajpedmy1rkp190izscqlb5oxkzojldfsi',
                remoteHost: 'ffg86k5r5py1bu2wr4tfyufrdxmg4994cpmpjmzm9e91vh53xh7184qptuwczcx5nygp5upmgfifarlnoetw4x1kgp2jnb7ltavmiwjcdqlrhhujcep7lnqhb9ci56r6t32exl3odup17zq8v730xi7dzp0di0l9',
                remotePort: 3269425710,
                directory: 's8081wfb1sg0qdq4u7x5378kthbsev4tuy1s5v1sjw0rqjrzb1h4mivhcw6i241gzpf1ahtly5u9yfi12mbeiswe6fcaaecdkljolha9cgsdf2jdkz6lex8qzrk4yp72h14utp6bnic8bcdbgo9ebib7umjhmvzr3qjkd21w5cbo25w195m2l5n8lm4kt1t1t58d8woxakwmpni447slpriyvahylib3yqnxlqagt3nxtuxpaj2mpekcdwlpnziwwx6ksfaxl4ku8npb9j4fjlj31ewmpmylcexkhc4bx2kbx3ptljiebxb9g7j07uhadmsztoh97pturydxlfv6lgrqrwm9x8sk1vjh2kl84cqslhj0udc8g7f9tcpd061uwhxr68nwp1cgsttfuhrhwxp0zovgufd2s4i0gb50u1fb279ojog91jnbq19a0036rev48lpry4rv3xg1jtf2ezp8hs9fk4f60gv2zdfer57ksasfhd5548vqn6b61k9otq51wkzm0xecmbm70t5ooe3jczpcxi5zti70mums4grx9etxx71ir0d3891jycslaykciv3xb6kw1x64zgn9jrvqgf0qq6gfw8ujv1b3eispbysx9c55kyghr98mdw0k46xaierxrd8ei1isfgjz4ttib21amibdgr64b58f92j7gpui3t8upasreunl7pz7nyn47rx8gjw6aa9ih45xoukjaro95svkhrvef1nuq1vak6yemd4rszusp0d6as19ksrscu4e43p779scctz33k4upsapywinol5uwmoqhfg5ryszmkfcbu8xrfwn0x6ka8tdepxp6oqxcvyd5cywomtwga18bm9abrelejlyhrdby94i0w03xov03w1q42lfr6yt69vxkoqiik55yg5dlv4eyjfypbqoqcyn7qwxc7qob8chez9ju9mu8qx4sn1kz5a028q2qk76vtwvixx5gr85bbchjp0gzdfs62hblivh6ma8tlpjmt1kgax4ehd1n',
                fileSchema: 'g6pcsk8png1dtse3ox7jom8powd6abe902vkvkiphr4vccvqzctddbgpu8rqi1ukf47di2lbr3do9i1mgk4c9s4kotonq3zkria033v6raf43uhmybyuhm7wixyt9zg91z6ni9fkwofo0cw6jk0x9as5uxncjd6dmyom4wzgjli6zb3l2l45oz5ekp4mj5u0g59houbkzcxmv7frn6zl05pegnm8hxribqy607m796e9hpjxzvi9ul18hg6w3cgnl2kjtvls6bz3iaxci6bhp5zh0z4k3p69ydfmwhtak10bmnitmzb0c5klg35n9elhpimfdx4lnw9y1wjjml0m8ihgqh0col0dvsp7se8elgd7isxv3tmhazpwlelzozwzad2h2hjcn16cutvfh840db6nozgxy0pqeci1s04g0j3ipkvf7gb6h88jy58zsagc2fojyocy6iqlfx0er17snqs1yrummc3yh9d2zr2ny417th9un7pgbpp65gc42if385pz1r6jbfp4ion334foyw4ujhr9d787ektgr37jgmjnqi9lfmu54lxw8nvmm3oguok62eeyj3na6q7j5ffcapzyq9ghyn9cfnbo51lqi6hipfwc52hbgmkhns0fovp3jc9fill9jx6o4qur6oql46q8hvu0czkzn5zj1ifcfizl78zcla3irluhemzqe4fnlyy3n71mzugnjae521w7o26sq9otdvtx6o06h4mrui87lpdeng8f20x7mtpqobj5zhxk8fk5ei167onzx5cex1ngw75fjqv57lu0zd7k023igqhf9i203y1xdduc7n28cso49itjviqyox6sx09xxaqyiwr1c8slb2b2ii7tgn1oz6blkr1x0iqmndj42ff02n3dbck4t4qs16tyl2jypbswvoae5jlmwtyi436kvzeqsctfkiybxplu7izmxfrne12qljw1w8nefm6hdf0i4g9d6w8kbjy0gjxjs7e6bxosd1who3iaam1xv62vgbn4',
                proxyHost: 'i8req1qb59us394kscpojdzrhat4tvi3sc3ydzixo0huy6ixjasv1x60rtu5',
                proxyPort: 7141489909,
                destination: 'momuvpxmxd5gi08b8rsoqkdgpsok24g0wonvlet8ncm8stpru82ec8ojjvf2tpf2jxcyhun2o5gf3zzt33uczqk9uu1dlh1gw0fr5e12slkwevc7agi6jigx4v1imsafnn60pv9p5lexueado35jocme9vs0pjej',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'izjqibeba429hezgtmodxwdcb7kry3fpncxvam1w5n6lfjt8n6z217u4lygvd9z2npm9uxecg9ej6glszkeyk3j9t0ab0dh1jj393zj5xq1o1rx5z90r80zvqfvgdnky6sddg3ykxrap16ee5el3xsgp4wphb6p2',
                responsibleUserAccountName: '46xrawi142saf1h30mql',
                lastChangeUserAccount: 'n0x024o6lt9g9d6ly4sy',
                lastChangedAt: '2020-08-05 06:10:25',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'ym80u9n39at1bwtpspytngptflnrghtqp1fvk0j9',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'h976qim5dbmbzdxpp6dkxmi2tipw4s0sa4703r6ylabyhk5x30',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'p8pnl0orvtc6z1hk8dcb',
                party: '2x64a0rexceldtnwj1hwlch67uhpd6d3idx15xg16ue0oa25unpbc1n9szr6fpryig38yk1ey0zb2w28hnkp9k8w058xmw5f26k9xppkw17ruz5o0pv5pwus5bf3hslsobp40hkwh6j1311efpfmhbl4ht22oju0',
                component: '8tphnnuzw4nop3farolt5k5efak9g1fhwff8lagc98tigkxgsh3k6txkltri5vh1jb8z4n0bd2cpv4r9ngetkpd748p7cyrnld24wukhadosfawfsp7sy5jzk669r7rhoo06pgr4jkg401idxy1ze6ttln9y3fly',
                name: 'ee2ch5veqoqei9c46jyf0kco0te0jemna5kv39xak428j44auxyqm2ejr5fd0cy1cm4shdsd6mn0tiqojyys3z2xvb0v6bz9xrrh9duvpvhodhw5ae89cxaog24lmu9p0kgihggqobwef0o7l1ii0bz6d6eupdob',
                flowHash: 'p4cynpge711t5l058ven8ru35nf2ps5slnav67qk',
                flowParty: '8pz8nnm1mf4ddmw0a9b35zkeycurhvxxrg3na75i9am31t1g3i73gm71tzo0lk6zkc0o7pt90jq0mhchk35n1947qtci1r829e2hdh5dqlj55upg1hyiumwigwk34g4pf0g7gm1da970dlf20xkx3srvj9zk2iaw',
                flowComponent: '8isghlladefywtywadvqk05fff966gt8jgkzvfd4ggqsmu9dy12uujgsu0vtzco19ekkldsj6c2wmpxhjo1q3jej0ebtlz8gz6o0yupv6kn5hcg66zgqhpjt59miws9bnynbtrzetziwh2a81b0ll2ngxkghge1a',
                flowInterfaceName: '5f4euqyrmri5mk8xnle6g0truhrmw3tyxb464dkjhdxww333hde9y0gprznwsw1avdr6rvhoc4nji618xdfwpmw0scbmkieu4jj03h8i6f3y3mvgbl415eeyfa52nshn4568f7ltajgex1vu7i0no4i1akco6gf4',
                flowInterfaceNamespace: 'xwytp6cianfdu9v9r8a0y4fw9phkinw4s1o7g95ugfap64hjk83pi5uwp3b0xtzhmpwwdphsr93oub6jxcoozyp0zrqeyuc1p8aihyu3bi0qatl222dxk05kshvyqrvzej2n0phz1vd5ua6hgfo9imjny643kbr0',
                version: 'fexsacnfw0fu8liv266e',
                adapterType: 'bb60k8zzmxftg3axdfjwmj3t4uvgcfoa08mc5bz501ztljym3m5pzcsmo5hg',
                direction: 'RECEIVER',
                transportProtocol: 'wnv3blbkv0arf5371kstkgp4m018nd96lkwk83v5fazu96k193u12nz8h319',
                messageProtocol: 'jzqhqctu8m94k3kn3470619b6cy1g8e78ajpf3ao8dvt1nbsbf8l2ojg2kjw',
                adapterEngineName: 'bn74sb9dunovje5pld5j0hu8dnfvk68nvc6r3fgt9984ichn4hhmskr9rasgc5ilj1qxrm390pol366avr1nhjcsjm6d16o44n6bfi4d7k6d4t5ze471iv72l3a0n6biy0io47mz0ypa089ck784ttaec6mvrwo2',
                url: 'yf0ccpo8jn4y56l4f2hgckd3a9bfm7aifk9k0w8vyudp2h09ldbjddk5wmyktn44p8nod47xwea1uxxhoc4o58pd4nuyluaxyj5uzkla22qiu1cgcgam8mnivwsqt8m8wa6yldt11phseq63d84pbi5j01bc7udkxzcvi8iqguok6irqawgt24fkyhaieshtie6ylwl64n27xacx6guswzths8ub0h41c5awnxh4sv3uy9axuvk624miejgzvjckex9xt4xgse3aj1bqetuogqxluyxcmbdxegv0b3vzuuosveo9qrepmbygdnbmu2az',
                username: '9povsusw9o13zera721f2owx6bj56eoj03ak126r3uur09pt24cjzk2am58j',
                remoteHost: '8vomkrvgh6e4mx06r994usawqfvr4k0qt3f0h79qi39lnd8633j0db6f1nlow10oss0bpte4f7ffqqo4qtvl6rodyzq43dai2eo5gzbv4ldnt5n3qa2oy5bgcrg38ix4mvn2pmn8aegz8yg4vly6levm4fvyrdep',
                remotePort: 6561438716,
                directory: '9u9wwxjq42hfelgy4alrs1bzpz78qdb2ii3qwvnp6yd13blu4fb2z4uog0ibiibcxkwpod22wq3atd8kodrvlk1go2xycknzvtp8r4dz4d2l4gh4zft457ef5n1iuix053k8ph4gd83dpur52ymdqekncf8jm7gjp08ku9szvg0k13huhoczcards1cj47gxieoxa7z3yph0e8eimtbphqxltg63yw3jzymzcunexpgv9sd070txcd0h26tjnbyy935lw5nlu5f3y0xjdtrb25i20m7pkpvewz966j4o5603l06w73v0siukpa6540u3qtrgin34jkzxe936q8zlinbi5774du1g8p2lbkelmxzmbioc8v2duodxkzs6n1gu2y7e3gezf80vjcqih95oc4u103980mkzkdzilntgt1ew67u85d9unxie87ib5uu22ju5iy78ycn00e4mfcsepd0z1fscgd5kupmhgil495ztwlaf7fxqnjbry4xzyezvhj9z4xphtyh3zrjfioxo66xaky8jw2donkofb8498hodo493lg3xr0jif3gnropj98cxqcely1fjoy2gtb9qacmfj4l77yymq1pgef1hkkl4sddneqb9odj842a9hiuozqjp9rmt80t6kwz2oyuftouk7yoyaoszni1pvm671ypp2cmobe46zxejekgd34l8cdv00232tu859ujs7ae4a3jdizxtxgkcwk9s36ss9khe2gw2gqnpd3fypi3ivdx9iguyf5mrry9rchg0vc4jt61lqxpz68f71wedwvowiqqoe3qdc7pasm7k7ze6zj7qevsitt8x3s4csh17q0gudtgizx4qrbwiispsc7nkb9jzufk1xpf59aiaz5aezeb6ppkkqmst8mbi71kgl4d4k88rqpi51zqjsncgimbhdan405aw6xwq38tfaro2r2r1rhjec4xqodkoq635pmxwt2grjzmideg227ducqi7b6gxtjtvnwseczryxni6o5bj',
                fileSchema: 'gagxp1k5h3h1r4xlpfyzkiybn558gnawiykx922b9f2z45mc94f0lx22we0bngmamlmtxqnfka66yqf8akbpc02e2e2aave3jvfnx72fg288bl8pxq24120ganwtails9jj2kqjma9mkikn8dh6bmnmhluppu03crluax7n0cy5nl6luy5vsbpebnhuezorf1fqpbsfei2xsbb72sz9hn49b6obklpo7te7gpqq8e5atcs3jlugx7bs4y8brp57nfb5x5pgd6t2ka4n3ez468qqwxi2x79z55k3em6laz8s4p9ard1x1q35f79bys532puwq4k7jewa4r32it5dmhp7kpq1oxuekl0advuh2t5btadawu5sae1t391c242nhrssabsbtfz8m5c4nw6le5m88an203u3vu6ofuccgycgvfig4lr76njihvvykkvurt2znuq4tajl2rzo3azatgdw9tt13akd0m88ufq7ecrjxh17cdk777frk9nyueo615opqac6j7x4rsdvmdz08lhdqzkgct88g5j49b588vlaqzo7mn7nhwe5dpzfzv0utuaznhiy3qq2xt088sn173ppoworce4qlrsoluzgqc255dmpoy9s8qznjsmbb8yf5oqix3naljghjztr83l83lhgoroxdhdhk3d1rag19kbxwb49szar10ca2jmmp9kk7r1v3nci9bjui7w7f6lnuc7t3l1nasn4yore516er7csfx6drxyql6xzyh6x5lyum5rg5db6wt9eyaaeyv4d0bm9vp5e35385h7h5vxjalqgelqk1um6sbsvlfs0sowbm8lusvhjhcb0bybu41nwztwuaplvi62e1ykgngv17770wpdly334j8ihbrj0lp8pii6xpxv5lezxfbhsox7j6dyg8mfihmalp9w98o9rq3n2s7q0diayo5ig0vo53cfcrrczjz6d2edf5qdp9yjbc04up9sobtpk5vezqhsv23uwgu9qrv0hpwihfgc86wxc85',
                proxyHost: 's38vd5do2j2kdn167hfh57cei6235twrcz1886t505q7mk7dnqwbjs8q8euh',
                proxyPort: 8412896081,
                destination: 'wqkj64wus4c2ccqvrdaprppwrc9syeb6dwma11utr4837dzbk5tt6d07binvpmh9plp5fdu4pggws3psiyq4d504fdan1gblb1r2yxoh158kkvu6z8rdo0ppkxziueh7r7ra9dfqcxd1z8i1gdgm4a2b4emrbdwm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2m62xywo3h95islbitvxrcblc3a3o2ywk2h6x2xgbv1r2e394r7dvlhe0cd9bi5ttp90j4azogr77shmy6uj3kcn8g9p0tz5ueqaispniz1wy9r7ixen65j6gmdaukeqvl7u82qs3py6zs1mpa7cwvgeq3hg14cf',
                responsibleUserAccountName: 'e28e5tl8corf9wy7g1b5',
                lastChangeUserAccount: 'kmlfzf7h9j6b97g5wsoz',
                lastChangedAt: '2020-08-04 15:18:29',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'mpuq5zxmceqnzgwmzqxcayvwx7t2bdmzryuvvsoc',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'okhy9pd0ar41yb1aycemoce8rmldsbw9uyjy07m3ycg1fvvj52',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'jgz4q4f12fw52t0mwndk',
                party: 'or2svd4rml9w60jwd3x1pol4bakbmnsbrorw59rqghwte44m22c0nwtbc8n9nw1lmodlvg7gc3pvo3g674ugifrbjux2v9bgya55ezt7kdyk97kqzmlta1mphnanvoqph6x9p45t98mebshx2pcojqylpifswcgf',
                component: 'cpjhpue5mi7nuqenc0dxuvo60uobff89ld9zer03w2klmxkpwpfluk2ydkbbbuhjm1j0gwsmc1yu5bo4hj9pu2r7q4ltsnl5m33yur67dlgp9qqclsi2zjx7d8hzq6k3x4fsp9vq4slymrzfu1jblywtt9rpd8nb',
                name: 'ipj94r19598zrlv0a9w268oulxnz8nh576ddrtm4grm9bz3bc8px2p92nwxsjdp7yjgg2akcd6kl9u6ev8qa0zozfpp138x4b78v48p36mun8z11pb3pfmyifa4aixnu67o3jb9j8zyeq3no2r97uztkvc81f83d',
                flowHash: 'wh8kcgs3i43s9hw15zo95rbd7ueo4qeik784noja',
                flowParty: 'a51vhagqvf74t6xrdciqf8ejaurolp8s50xznvnl1rr499v7zfhjpbtu84vrqisjol36lhyk7nqjml3g6gksiy6htpnacmd2ws44u9kn7eitf9v45itziqdk7q8s1w37ugdl72g06hwwatd6uz3mq702v0i3k6xz',
                flowComponent: 'a6btlxciuvsn56iew78uz2iugyqdmo5uvugl4kuw8jr4rl82ehwbnrwp5bunnbxym2jp4hiru073iuyb8oa5m0yc3f93ch5e2n9xk2hxuvwdlsy9t7zfbtxmuetkgsl0ug2qzso5y2u9d4v4otb621or1m0vfqyc',
                flowInterfaceName: '2v1zq4b8gd88n9d8l2847i1rm85d60f93qrqt1904ahmm15jnj2yq6v5ivwzohokh3z0c8t709uzc80a6glyv96c4oeoidxnda7y8uzv7s16x0sendrg12s1nu99gw4cytadxphvvrysrdvpuoy1svwk2v397qmd',
                flowInterfaceNamespace: 'csreegroxuxnu22uxct58kqe97mut4n9hx2a7e4ot4z38k3qq4ryofq3b1am2d30s1d03dchu3341vph948beceudkmyez1zwc5v8fic064nredc3x5cj677zsarhkoazwclpyxxmast4afmnw14btq7f33uwf6u',
                version: 'gdh797r2chy7q0znm7he',
                adapterType: 'e4q6zkbf77bcq8rrtxktwovnxmb72as2md1dj2hpko7kutacgh10osrgv8v9',
                direction: 'RECEIVER',
                transportProtocol: 'q5b94en9dldc2v2w8n3l6f9pb3ld7wxzjxw7r706tj6nzxaibpcq4yh9qz79',
                messageProtocol: 'kj97m0f8a7rjiaq4d0sp9gh4s4pvre9vfs8jlbr5uj5bca9aprbudn5eglpr',
                adapterEngineName: '38qc8yx73m8iajbgcma11zffhkhlp36w54hosndi5lfk3fj232uqoz23txud08jx95a5w0kdv30wg5e4xe0pky4v6kovr4jgm6ul7hfnwd9lx58rcgxyrgqdrikeeo3w9nvqhhs2tb0jilc5tl3lkvfgebsef849',
                url: '702l52mxl37hokjpuqbopntabhrogurbjbrauztdbsrpqllm4ei5eo16e7dkxfv9o5ndksvu1lroqz51t7pv3nwaig0ptuvssekr7s4lxyj7nvq7an7q269qp51ab8zrsmvbiqhtp9ax9sxdxcglrn9ll5d4bwgg3nnt55pmozrsr09ovjl9bkert8wz0ailvyn6z85dp0g1ngx3jiwr9e9hz9lsd1fvgqfxbdl7r7g7v7psi3yy5dv9mjwa0szdiq8x6hl58stf94oclxfgli92ahx7uhg2r317p2bhdbdss2n9jd3dbo3oob6bvq32',
                username: 'zj3qr2mylonovvuuhrymma6y7rs6zvw5jr8odlngwsagvzf3ddnxwv9n7btg',
                remoteHost: 'fqkt49jim126tlrx3cpaalycyu0fjpxmxu9laweg3hj0pbfgutagmsc8k0kmqj03rfglfrytmaxmme0zppstgso0b6tgvh41a2m3ggysumgmjtd5trt04pqei77l79bb8tfa86h2cial9i7sfy5593r4g3v3ys6d',
                remotePort: 3575189495,
                directory: '3ezn9tbajfbpk7jhm4b90lydfzt8ejftdtabwgp9raeoetaluz2ruscsythbrqwemy4ei3n0cprrnze98x9qviutvc0onyfbwh4h96qrgjch45nt44oa2u976tzrfh3u9khqatf2zwwg03fqif2warwjsdnnipcccqt8s21vzaxnwuzxhksc820uhiyap9lnia6nacxquh3hzziuoi3bkii9unjms6sumli1u6380q9kvcjo32jt6ph0nu4t5gi6axuvj0r4w6zwns7prf0v1rjz6n3paarl1mdosti16zagxvyxp7uskto4rb82ur5mp8v6ll09k3z30yvr19h8u9eiqa7m4x29yifqi2mx84kvmnzxbupnky7og2q7ehhpw9mm3ew4tjlnta12ljqugzz6zjv21nbjnzk5s8h5x11lkby8de159z3wkva6agdio5aea5qwuo6fz5dwkvqnwijrf5uz3ndgofg52xtr5pnuewazb99x6qkg4k1yumtv4wpxpaxxol4gv8y3tp76sogp8qldff7f0c8md6a26tfmy5mxydqlmqzskm61m2w98loi49jlg9w0frzcf8rchhrcux40ly89lddzbz7v4t0rcrq6czqaknmf9v7dh813i5m2agrbdozcy6pojwmyzm8vdnxj12bnub9gmfxzvsjhqv8glpi94cj0ax7pfgn0wktd003pfsnxp2suz0byszsldbawenvqh5da11hgo2insfbi346wljyxrmakp8e58wn0ld8ke7lehbm0z0i7ae0whtfv6xy725devcwua20ws7vhs1h5kywjyp2o4cnj0fcygq3zknyh6bhzaca69kztuzejo7jmixg5c7cbcsaue5k09iid1ik3nqo59t1ye55kx2rhgrwl4jnx6tfrrhyoalr9ylpo04dj0f3yu20dlsq4j6juurgdwhwv8qzqtiawd423axdnnble5tkdmcysa300la1flhdg8qvby9b3ssrs1rdy6aswmbps1eg9',
                fileSchema: 'uwdcm6kd8pawq9xt13hna8gua8v58868hbbzemgijtjgpf4qchzbjfc1u99xhtqqu0gc7sjtpft4axuk01j9a4kk2ixe5ee83u6u454sq60nobul3y11tbr11lduhim1cgjyymapzdwdosth5t84vrp60rc3ejwj1wos7evmrudpbs0iiyi54og07e9fth8871klbd42xw7q9yiuawr7ob9139csu6nhdw1lai5bq9d0fhodzcrdnmcwwtbfyr9e5d7o3us4sz6bbcv6qdl97mtkbp9iwp7lzn5tw723diboleiylpdlcr118gagdjyrec29pgl5abkcxnubb8xel9tlkje1yz0q49lzmkdio4hxwqbvfzb39rzykqfi7smunc8bxmohneebowerahtilqmsucp7l52cki3gse3jtgx54ga5fpp7lpp77m2xznupih9km32aalmphipucxbxy3t1agt4hoalx7m1wv15gl2s9sw9thsorsi1qb6h4dchnxdqav38343uvha2zbvuy8j4ysk57zr7v8v4pjjuzftf5fbn8i0xwz6cc6m9stgmw917no7sbqtxd64xg3h1gfzses16xr7li4atapoen9quuatdwlqwosfz0sgjm9yao500wgt57y5mwsd42lota8b67lr7n59wd0xgoozfuhat25ogq41tjs8bpbmwmndq9uew7uk8t6nctk7xiyybvofa2ppo7pvd93n52tn4fdjsqy7xg16jswnlrl3bd2kgcl83nymrfq4bd1nx25qfrlt2nkutxxrxebiln7sum5u2dxvh8lyfb87tccwc5zdl3ysskfg13v4s8u5cqzngjasztg9wsgiyj64kmn8tods8877qrteg1rf3qx2qh4vysvadrul29ekwdb8wcb0taim1i8rfftykd7qzabl6ghmbf763w3dsafqabigo1vpe5wfs7njjn7wavntd4z1tukxteev02ur7pvhjef34ev5mpus4n57gv7zqj3h0fjz1',
                proxyHost: 'uheunc9x3ntc29nhd28nrot6as3nhbuxg23nmmgc2m7a9ovypmop4em9wnxi6',
                proxyPort: 7109024541,
                destination: 'jg9goexd14kvmnminaliocb3dr9z425l5rwo9kq4pcgjefmqcnfkua4lzop3gg1eqtp8fm44omu7m4013ilev7s9x3vcmy1stixv2s850ug7lssyhbqr5h1okopwgsfts15usr8382ic9dk1xh1k73fqi16flsi0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'v0igyk4yzrsgkdf1kvo6evv6gfvhu4y5wr8r0jm1yamfhhsss33r1id1g153xmgywsi0f14neqio1dorv57jq1zgqhkdvgwxyugp15km965f1bn5m58jywuqvwxgtd2w3cr4s8937zl4ggtk4amenu7t7qxrxpxq',
                responsibleUserAccountName: 'hjlrv6xf3tefjyvn2x16',
                lastChangeUserAccount: 'kkrti3jtrfs66ivx8mxn',
                lastChangedAt: '2020-08-05 02:52:49',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '84flcbq941v0yh4afpqlky2pvbr0phlanqkoq9dx',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '0b6bmn8zoxzn6vci3glsq4cix2s4chmy3km09mukqaegrxkw29',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '7iu4km06rytehfl8gqo4',
                party: 'vrl71oulxzn026zdpxdo08qghwbufr3uvwqlchhixlr93csoa7tbhm4rx3y0xgx5fk4fpzjc5n63wspu2k2q4lghzrxwqw0wyhi0zgr8z12kp4ny9c7dobhoofh3vpgzlr401250pcqi4pajsa2qz9trfwpxlu2e',
                component: 'a1e7vww4yli4psfll3y382bhwuw67vv30aj4wjnp1j3l41yj33qrw8drcv4f8tihrj5msevpp74cegfs5k7sa1x80ksf6z2nqujyzclz0wv7gbtvnb4fqgxd0vjocmruhw2exm7pu9ctof93maqpzp0jsvm3fm0p',
                name: '0045k8hjmivxr3r2g7ga3jnkr3b27u7pipvtco7ger855stqr83xncjp9sjxoh018guctb01t61pw1auy3332l0tg42pq6ja5c82iws767zbnbeb71wxnh7gzs9f42me9kntmrxr5lbf2wa9jq2io2389zer5eor',
                flowHash: 'tyizfgm93n18oofkpj8ne46fy6iq9pih6wn1j565',
                flowParty: '0wnao4wuz1sywlounbw1053xrk8z3anjmjs0w4ecrh87t3rs0b35lonzxwxupsy1swfw0t6xvnc251h6izhhedrv94xfycib1z96ttfd8lj5jfkroelgxckhbxdk6a24grf2t9f1wu4dy7b3la4ji6zq9td4ntl9',
                flowComponent: 'uf3bb1w0mmjlyn00ycgoswpj1auhben0t822ej7ql30ha7d53dcnpyw8ovhp3gncczyu88yp48299auiwvsof3jt2i74cutdag0nvbnvw8e4z3ufm4nokhhwqncmftq0hfgvdldkemg3rmabhcj9xjxjyn9wfa58',
                flowInterfaceName: '7p1jd3fu9rfhkpjp3k90i7d340u679lgqzyqc98ir7rlz9sozdvgi3pihdovemu5eddn6bbg61tsoiafpzgqvp1eqxvq3a9hrg4e2t0z86csyb3x561s27gak4btpfajvrvdr8n5h8c53dgf4n0x1z2fic26uixk',
                flowInterfaceNamespace: 'uhskzofhmo88qpwclgkwh74vayde6srv6sotzt81iobyge7ku4eyswa9lrwaffrl2lrgss10x7oc76t9j6rv345a6hvus368ccpne1ktikiz1ddtllgm5re9eyakcznrupj0gisb1vzf38xgl6ddscmvixycievs',
                version: 'qnuvacwvydpo9et70xbd',
                adapterType: 'sbjvo8zt291523vhat7vclww48zlltu44ueo4qnaii3nhkgffnkmqdlyjrcb',
                direction: 'RECEIVER',
                transportProtocol: 'udxsvqw3k0642tevxg8o6k2l9iamqeg1ut5pm2hxc3tf2rbcbu8rvub8ui8v',
                messageProtocol: 'fjknmmvt794douj16yhqv319otertzbchuphd8y57pdmrayc2v5s4eevpbx8',
                adapterEngineName: 'y0almadahaa4i2ul7dh5z0thhwyehdevn5mm1ehwv5x2obliu0zdjgfkkymu46wm42pz75fu3q35l95vvz9a5u41d49pqghu5lvyiz45ctfikdtnoxx7pdqyaefdozdj60s1jmk3xfoqvp5lccpnb1drybaphdd6',
                url: 'def6yb4i96s1q04w2yvw0jefvyoudyimham78ka72rjdezhlpjzuwuwa0hl1kds8yqfri9lca37xlrxjmnx6iftarramtd724ljh12hkir7ajlvgu1p8co4lw5su9lyu9shg1rjdk532ca2mm79fvxaa49xukmjzp6qeuuqiaqzsr0fukfodwjzpy9c89p21m1ri7zvj5itdqhsyiesq91nne1237gbwonatkpymitmk2hwuq8ewwdzo1g47u2ygu8pjrhfjq8vf6ryp2h177h9ln34moa0lxvapal0ddg211pt96lub8g5o50oxd8n4',
                username: 'd3oqnzrww4d7bs6b5fde41ih8dl9h1sb75tuu9vubhv9yqgh83i3a8ferph0',
                remoteHost: '5vxjd6lv2yikpydezvx29dm8yeiem4nz4hqup3pp2yazcyqww3ngzcm2n898oox182ebf8ipbvpki6ljj591900jnk7qmrdajrlxu23ytqepsnl7wcluqyvz3lyqlyg021hr1xnyoniuc20yjj0b7ccgpdldln3j',
                remotePort: 1944901558,
                directory: 'j4l8b8oxcoqboupm09tfqt9ieodzvixe7assi80ftom3s9jap0tyllw82vm31hvs7kn8gf6advpwtvnwj3m81gt9gdcdvo89v5y4c27dbfa6ufbw1llxt0lbpt34jam0yz4hwddtnswqqi4w4w5grwqv0bbx55nflxqoo19bxe6xvoi6t5rvx7cstk1beeszutl2my4bphklsd23l9cy90p9i8nott30f1xdr9g8ro1l27ui61gd66yz62yzcj4kao7b5g86aaxd0pigtnx86tubycvi2c4gj8rokkyfn9bh9ovkee4dykpr7ca0r6weexdz2rr69sf4bk8d4fvkcn03luw88ma51f92m5l53gn021arud417sqc24dhapj1j9eeoodfogq4z7p6a84yoewh6q4uekjzktown6i0hsmknnlvknvug4fj0lka45eznhfa8wq8gitjhjj11txv1n8mwf6oyijkgtwz7cgh3pk72014bu9y3g87n9qoolrznl7wi0aiio10mzpsgo6fflapki1tn6w9p2fqpsyz1k05gtrmx2alcajddwb0cm4c2fkbjeqk4nxsqkilz4c9bua20u5m3ky5nsttt1ogcpt6uvyhkjr383sx4frvmyevbppf921l9q4g755ge50povggbhtphufnosgqmslepfehxx9mtn4lsbdayabsi5z7q03smn0582957m3ebk3u6m8ctt112t41ol4z3c5gv4j9207cze73c2didt0ppjjnegnud8lg8udj4ru6s6zjklsk21t98d0oansn85nipsdhkbhewn0d650yjcoo3ihgof68l24fkjr6ivr75rlayu6hrnpnx3qvs7d0frewkd1fc8yc1wzc7bgi6ion5ds3z44wxg6fysz8a8mdficyvw194wmduw0bo751koqdlmdux5c3xa31b1ngqifg08qfhfipbzjy248syfbe4gvgxjzg3ra9vup13cjr19ihvsw7i62nv66ew9gt36onbd7r',
                fileSchema: 'uttcl1uyq0r0728upwjk4iu8qllxfqno8hmjlgy2cdm91dopdizdy2ea5ph113onvsfoqmytm3etvmc64p5f80jacqwdjy4irxc5qlkqax16ar7idb6flyfb7rpewrg9r5ook6tkgdfc00ookllui57nf64kecfheaochhdy9y3lk1ccyetn6rn1itvs1qzzeq6xmrw4n7y1zjjgy1g82j3kb6j59tv4xlnsyqsglwemdzqq3h8quurulqn1b63rp0r9rnfb94itnvot76kb8fqna4h5q912tr78kg4rp48rsx9zjohkfi2cjjodm5kfepp94yj2hdiko357lhvronp56hg9mp7xn66xtetzcfk4ib5av6jn584jih1zsb0a8h3qhzw2j508kkax4as6k3tb7c5t90nckq1lb9f7jleojxzlmc2w41jtfg8qdxhr76uia561avsze68whe09k57qjcf6blrbu7jo7gih2e5p450qwqacmwj86lpj1vz55i38mhhud59l2337fl4nka282zjnkth35r23ej77be3x5vaezq7ycpau2nkadbobvggckzm6ns78e7udjivqefw6j33ndwrmdmvqa30we9srumsxqqwxjs68zeh1eoabuyjst801rcqnu0v3ncib6rffdqwlcyrvb02fb7xt8xvuyfuvtxfnodtu3wnonwgw5lhujibiytpr1q9oi9r8p5smxrpv2k6keft8ia249tsxsxgpwj4awcftbww7fgjmfiqvwcxsj3x9vdmheew2xcishr8wu7a12t1vw6snavvvuscvr3s4qfds0i7a0amjl2h51agz62c9gyzb3rd86xus4cq70ybss4uwuort0fo20yb597tjj0oh00unoppmzf3akfhd4x92pyw4qouqdmc2erj3nhvt0vqqv9dmnxrs65eyaoqi0jcc2yyxt9gt0hqjh6m2bvm7c9jkdljqchp764bl9qhxkch933chfufty0sf05bt4vjxbcvn24z7',
                proxyHost: '7897e37qc86gvqjnmhaj0x2u44jemnm89y8xbs3vdl2bwdort3vbkareosnu',
                proxyPort: 90300910315,
                destination: 'hte8rz5nwuhkv3afxu7vtsjggpeq5sud4i0j79tyiebljkfi9ok8w9of361zi69t6abax5uz6294wo6e75kwml1vhvff5prkriwjyuxrbieklcgtd4duyx3p98riol18ptoajzz5m0tdgcuoer1odprts723vze9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nsumlq6flyxy3pqtlkuzs1rakydb4p7nptz32a314ywjo5ocn16or6esyhvdas0hr38pguku1tp1y6a5ylalprsibc55dk7q5nxq5znme4lpgy6a50sj9hp57jur3lr0769ltmnndbrw05n8ignci6kt1g3ia2tj',
                responsibleUserAccountName: 'llzfekcq1exikzig7vic',
                lastChangeUserAccount: '39kyr3l1k8bkdpecewxj',
                lastChangedAt: '2020-08-04 21:33:39',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'fdj6xotor3gffwc87ca4w7wr3j6nf0l6y0l03bju',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '0x43gb3e67mlmm3r9z3d1feeggibk4p1m9ystmhg0ojpf3ulvp',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'aogdqps0hi94rynhy89q',
                party: 'dxc7v2cotx6wzkov8u7cd7s59ce5g98aabf3bahfyk6eznkt1dqvupuryenqsbi6ctn1vw451akotlk5ni5tyaxm4txxbcc3na9qvmrmhbqfeocq2uh1am89s6wsv530wt28hbqcrcqisr65dkox5078uh3geypu',
                component: 'xh7tkksgwwvylx3muc7ezrhstps0264ckxjnvl7a0ggakx6zl7i7q4wkv3w7cmt6jczfbcn5bov5aubfylxri79t1lmlibnhteflv1ll96vntx70urb1e84gn8kiize243v78sfohp4m3t72xdc1aetygjrbj6dy',
                name: 'zsx5g9u8jylpe2gs28mbe7lh5935qfrpyo51q992pj3ccjtjdkpqdp9xfsjx86h58t0ozq2j59wqfc68ebm12lh40knycqb1hm78vfxaezvgp58xx1twkqjq3g4b8wa1c4x63p1q7kua3yw2316u5yr8dtr6xad4',
                flowHash: 'ixp77uo7k9kjbil8nej2727gygc0x8l2drmpkbq5',
                flowParty: 'g4dphchse0ao7nkq2k0l21nbbfiin1v2aizy18be0mj3l5hc2lpgwffu5jlxjon7xlmzupyiqb30t3rc1bzjwtvjwyl6bhnex88greaag0lomrxpvod5uu4zy2n3zsg1uu7pj6dib643zveaq8q54s1tkjuqv5et',
                flowComponent: '12xzbc32103q1o238ryzyhw6vq9mibkzrnih4nxnya8ezkqkcrs74xfvykzbnax0zadfyxfxn24tay3myawiwtja45g2cfje3f4861dtib8w3ctndr15361mmnyybcyf7idp4bkdxq2wxcpmi2749rp2cbax0cl8',
                flowInterfaceName: 'qnfvtvdzq2v9294fewxh73vuihyymgbng0mod5zhhueq2od74q9pttekrg2fidtkjiawp3voqb1zr8tyo17n8cvftf8fmdgrxuwukh8m9oeafco9vbrodfdwyu4m3lqctttboc7mka8marelz0ho4obet2g4cmlp',
                flowInterfaceNamespace: 'ilduoy7dao0af3e4ej7e5spkkzior69bmy0owc6ol8y7mdq6w0io5nmr76y21gxffq4ud88u6guwsjyam4mynetsagy4ubp4li7hwj3rsjt10m7y1pb28l1tyklaxitek3h0dbdkqvi0cdvp4ubnhef4cdwvjrqp',
                version: 'qkdh3h5ntww2xi187vyh',
                adapterType: 'sjolfuktlmnyw3a8vr4dxucy1h4isnhdl7qlsb01iirqk3r7ap348wclybs0',
                direction: 'SENDER',
                transportProtocol: 'snich9jrswxepyvw6w60uhw47slqcs5jb50rjwtlhw2k0wq0ccg0dt7k5qqe',
                messageProtocol: 'skmahjim6y21ptkchdcninbtwpf1npg4nfhne0xx74wf7b9r8tvpu1crh5m7',
                adapterEngineName: '0k5wddb6abd7wpghe3gt4foqdtp0xsoi9o1r99tk691jexdpmszxm1tjfjk58mlmfjzg6qr8mudidqjuolae9rpe54o8gjb25om85g6dks1x4qskd8qnatmg4cpjbhzmhw8e2ak4wei2uvdpganadqopu3sjicyh',
                url: 'uxmk5511njvxwzl0lodnc0ldbx1xe5a9zffctzltf4kqp7biz0qcgcubv811bx29c2r1sj4fy77icz3q3dk4sskb66re26bhl73e8d5vsh6a1b6f7cxltp1htdirq29npiodo3ewqwkl0oaokar60cm9npgm49qmb7fr56b1mlzl4qafx2p9m9pd0g17ngdy89dx3rcf2vmlrv9onhkc2a3jdrivs0hsxbjfoyatpn718q04y5mwf3imvy094hmrrub35hyihkspzbf81z9h8mpc204h9mh8hspvnzdm0gph9vm7eufkb3efdxvhjt0i',
                username: '9ny9kz4gnvhuvf23z4czbnds6nemexbbkseeqp89a9ihm970o4txu96dc7il',
                remoteHost: 'le196kmvai36qdhu7ood220q7itny5chgoost2ceac75ncux5xzwvyskjgtanpqnx0hruf198v6q65zgk1gtyy85nv7p6yh3t3ls976bgrli8pu9m8bfgbaqeipiv2bgtaoxny9sq2g3k38kqanhcipvx8hyso54',
                remotePort: 5731436859,
                directory: 'ldqqcuuy40nq3t78o957k7y0obani2p86z32xh69vtoftqheaqfsxpignbt7nve1q4tnrw1o1eqvjx9reyzomoefa5c5qjpofqxzrnrvnicmpb3dob7mt4f0hyv5cihhfa9evl1qg36a43adpubikq21100u4ucbngvzo5l05baeuryv6ruszm4p40girjh45apo7hx9q0i822a6cgb3dqee019t9rteh6vcdb6j4av5qbsjslz39b266oovi2qlks8uq1pj8tjpqmnevb1np9t6dwqhlidlqp72a6mwhokr04n7ip4clyhgjn2sokd8k0sqt7whw5mgaqtamganvdea8t26388rf2w6ly4m9itkjqeo7t32fff7sq7wfnd7ucx2zr6j0r342ubfzbr6r8p9dxijpo0k8od1lunaiyd426e2bz54e9wdzhfb1n49ljsj3lqqhdq5z1ekahq1uugywh5410yjyfxd14xrf999qw4jzofc454x8dyudorsvhepgzuqr7x1lpt0adx7frqvgmxpjxo6a1qx9m6kcekubrncw4s7x83bob4k288exx6ygrctzxjfk8cn2cm5v03q653x7712hofze1ibk0m1dg2x8jxognacltwgmqv4xod95563ne3dtlvp16b6x1h1n4m6tg28yqwor3u10ex9ii5nruh7whf4ks6thli7hhk3hs5q8rxmy6bwdmczlvsbh8zf12u352lp2a46dbj9qfzl5exb03v38kc2rgi359h1l4z6blfe3sn56lpwvbpd6wg6mr8etk9ab2gyr34cdwzoi6cxwxwp6gnpd0fvjw407wvptnthyugsr5icezgf1tcsxnm7e6x78pt03smissfgza2i27dwrs5qlytj1f4n7jnfdtvjkxw3qhqynepekx47m51vxjdglmhzbgeybs8ceyqako2ivpm2acd9g57jtbfox8pqxx7lpn3ia1h7lrq0rzt372r2fuslukm3qhxxni9ntj4nviicbfp7',
                fileSchema: '85skbcmuujdf6fojajdl9kj5xh5j3ihinsik3iyj0o2ruvdboaaxlhye0ig2qcedbzrmyfevhfvcaq8yisghkjpg9rsvxe26r9io30hf9ucesmyviee103kyb4hwagt4f7jkzhjur7wgdlfkryworiv5kj36wbqnjy89xh7akqjrhjqouni4a0mk8tmu7dnjb3vjau0ufiakgwh0zt3udyq0h7htj9urpt57ijmwoy1fo0n7ykxqw3ncc3rofjgv9o4suf3pmlkm4gdpo46mewbsyfiq9ibzvlh1t2ymtb4ss5pbxnsb5jgwo8076owzwnox77vongzurp24q9liau8999bekkjsmie33qzpwiqutg9kymrtb30vv80oxhq1t9zfk7op8qczsld7bllcz23xmr4083gtbesg02fntzdefivastwnwjyk2s14fbfwbah7qiovpooi7kd8mdhpv4tul7smngpx3iz0jmligvh8wbif6e00sdrpz79tj2afm1sojt39ihdr6r4mmdre1j9bcia7u3vusqa2wu5wvik4hukvhxt4xmjcqk67r7b3shzeyrjjmoky4o1ivf2dn9olalw3xmpajyuucg0m30052j44bp7ki0wj01zwjvrkwkjqmzgu8q58frwj128jmmhncxp651hcbakttpo230s2slawlcky2ry71ah4e48w4qo4p6fzry1nab1mj3hgqfgm1aupdjbjkaneld2i6t512zjzxje3zg8dixl7c2ankul7sjim6grqs0lk5je97i2lefbyww7nde1921n79pjjxk88qrclblw62djsjp9qsk4go5j9bor7kpd2ii1sh6fk4xujocyq2po2plxh08cco6wdcypiut04q6kr3nh4n4fazpgek0l3ch0exk4ijgcqlmijbc5tnhfeajcm1dtjpkwp97afa7au94fthhs1s3pno4z8jp8fyib9s4xjac2ley1zd7vrq68q5gdck3rb5w5827cajhjuqk3qs7kg',
                proxyHost: 'wkr8hft72xmxqvqw980573abrpswz5qjz1x3lhn2gc4hdpzetu662kivhvy6',
                proxyPort: 1046720673,
                destination: 'csfzkt9ia4fv0mit67tnrqc4lsu44fquq9zatrgb7syakgfr6d6utpmlh599w16n6j2sgjpeqgsoynuxawbtuxzj156r67qxq8s8xyzdbjhtqqsgku330jffl0hi6j1uv9sut1s91kqsil7n7mhjzjegkurkbk9sj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h7792u6o2w05fyr7ppu4wow19tycnrv5v183fagy2n1trd1nikkbl8bbic8gowtontmllex3tbq4nbfn9dyay39blhcddhhup67dzq4k70ddqejphsbok2vglj3rgxzau66smkc80zsczbimviutubojhma8kvpf',
                responsibleUserAccountName: 'b45kztbn3dgs0v6e6okb',
                lastChangeUserAccount: '3cmeny9u76h002x88gwr',
                lastChangedAt: '2020-08-05 01:16:18',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'm797u5p3ugok4hofdpk1a7ch9do8gnqmci18nicm',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'chuw9bphe8dthverhn765mdgnwysyt8y0gjj2f2k7oglenv9lm',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'npsfxqqhsfu55zv0z8lz',
                party: '5dixs2eazamw9ij54e9zeex98afdl5t6ohcv0lgwdd0wbjyz3sljuh21bnydjewntw2h0wm993r0c3h7p2uz8qr91ceq8s0saqwbxsyrprfiyk2feym5u4u7538paoj130zh44ql76bbaga58y2c243ngrakyf7s',
                component: 'xe7r7rvjtott6yukpkdywhd10h5sniod4cn8s40nhu36nm1v6sda1c5noyydds50oyvz6zkxsy0x3zuo09ljy0cp9fdeybvzonryhdjj7w5l23euttxbxxjxx6dzx5ousjzkxg8rols58620fm83tiexl7xmnori',
                name: 'hu6i3x2tpc7om7nprl2ciy2h177u15rfqjowfqu2o9ssjw4zft7649h57d84kokrqhghrrotyguhg6k0rerz4a7md1ke0bchw1821zlcrlz0kso0qnkpjxowfhpjt2rbgth60zrk5gi6peivxc05q6fn31n9lkc6',
                flowHash: 'ad0r265l8ms6g67vksuxxjyx72cck65gz98n8hpf',
                flowParty: '3xdqldiantsl7o4gge2wcz2wpr1di3c84n5680bm3pzc5xf565sunjn7uqf5zbskhry95tdwh5w4v5izuq8nte32qjksufzv9jpvzekadlfb06wfqya3hvttymcmb64saq9kg2dywa12tykdsagcr3xfomgy7p2z',
                flowComponent: 'h31p974gmoijmhicw4f3s1rphlkjns7dc7zrqmgn3eevh6qlzu4n4tehei4j8rdgsemxklnznku28e5qyewnlqsog7yyhnyxwbwlc25wo14jmz7cm14rxxgsym6w5ub1pdf3i858olk5lv8nx9xh2ctbcxve9ias',
                flowInterfaceName: 'olow0899f92n64ea87gxg0gevdzbp9yv8mpiv1aogb44i4prll6pqx8t8orv4718kuigx5xsaqejlzodhptdlygtqmm6p6c02blrorb5boi8gafvb7e6ge4d3vl6ger0ab4uf2ktw311m92a31kdat8dpq8zhl18',
                flowInterfaceNamespace: 'v8v3yq25gd713sbwz5idc0lkrzpd1jlre2liyuzqotllhqu1wmpfntpxuaeqc66o3cyaqapl1p7kml92pmpju4pofcdvl723eshk42o5u9f3erjq56bs493875kekuurjwj7x1ldtlw3opmhcxmv872b7bu1giqr',
                version: 'o8rkr4y6agiihleep9v1',
                adapterType: '1gfxic6pz4bahuqx9qy53lyuxgg2qodea8uvle9b3aobzhfjoukfacaaiddt',
                direction: 'RECEIVER',
                transportProtocol: '4ko81jgdps7lbkn8gsiouxofs85dokszt3c6qpw205s5darir4zoomk5773q',
                messageProtocol: 'hdf1hyk9bn4iab2myl78t0668lrb61f8r3k15pevmadspke3mfxj1ny07adj',
                adapterEngineName: '3umb972kjj35o8a9wn08j6jgbeyyo23xqi7cwr3ig7d7ofy71bg7dk6hqfay9hm50dj5zmgj2omtoxbya2no7owbyko8hbnccipnpjfbz0sh9gjs56ghnkr0e92e8n17ow5gmkqzgy0gjqqx7tg3lkju7wod0g4g',
                url: 'junz4kxl9kn3nbpc68da134j77zfen1ihqm1vcpc1rogl4qf4h4a527l02shlbzcz9iz73hhaxhsbidlx2cocj3kahexpbwaq072htcx2s7tx0acrw99xbcvzydccd4gx3gts0nior3v4pd6rd23nbldaxhvgbpm6azzz4h3r1nq7udjz2aqp1qcor0nqg9bnrbu1num3jaostoczfsayef8sdmud0snzoenv17vneqd9ztblmmnl5vuxagqbox8r3qaxvyimgohi34932l1nfkcl6shgx6y1fm1pdj44mjbdj2elrw6zk0i13k6hrhv',
                username: '5okdorrnnl714wk5jbpyza6i0n444j61ezy60ppbs9715h7xr5z6m8fqpqul',
                remoteHost: 'e4anzsl6ny91mdqkgs457arne4q7e6ebt1yb1yop9a0z1lddj1b03w067p4lk3jeny0ie2ck5m6fqk1ztkjmi9asxfyjzemf7gjqjry3kvyxkxlfvfu0186nhdwtslzttu0pqs7dwxgxsnvue6l6gfq4ouktvd24',
                remotePort: 8049921614,
                directory: '8j8a75figms5ix886cwpv09ichm2mhvxu4nksk99krexquwi7qlp89202oc3taduc66l4cajtp9aay8inh105r4h16frvdtiu3q8is56cipfnuubsfqwdsh1xhpib9ebdqmn27cnqx14ukrt82pa4atdimrlkrjp2v3s2pk7m02bqtk95znzbgqvfx0bwz22qfz6uyc3x7vygya1fayw76qj3y45pgxec3oke3h6ar5qnyzn3q7zfza38eadw65kwu1izzo72zz7gt83xeeahgfgi4mg1cu8s30kw70x31872u9pabzuwt8h1pm5cze45ca0n7174boyaygxus45kf74l5qpq9j826jk9h5y1o16kfzzw22eyl5i8x17fstfdf9pwt782aq0bhien8qn3b5uahd0jfa5q14k188rast5d2f79yuiorihpb8v0aglfzdjno5gupdxrxgzrp7ebtqlnmplzxmgyjymcl4ia706ads2yywkd260yshagr29n48uovomdubr70t0glzhcyaq9l068cflbq4i6nb5wjsehgjmfonmp1e6mntvrbqbobbf9xitrhb6li7n9hettbcqz06i8z72udmiqw6z70ucw79sw2rww0i7ay4acgs4gpwehc5fjx6z4n7qxp0x8zc4q6wc3lwxlhkci8pd5rlfyink62b3wk7g2vgqrqhg67oe8dft8un3rw9k3iepauyp9tx2ir3pdpbll3wk48w8x90252vihk47ijcvhhs06mlgkvn19jsbxhjz0wtbo48b9z5yoac5xogv8n21hd4lrnlrnxtkv0lvnbhf1h2nhtd6aqtn2j8cyhiozcc627ar2aogk51wj7wrorrc755r4y7fb2hvstyc2cxj2imjm7lc0k29r3gihkytrs2tf3h660qx700brl7vbvm1vney402i6clguj5qhujhbhj6aaertlporlms83hnk9zgcwzr7nlaxrs3swlyzfwre2qxc0pprcl8xfo8oti6hvex',
                fileSchema: 'bpadsn43s950kzpngitg11tybntej0jhbd3u7acqc29rejmu8r1ns3a6qrar2hrajv54fkculcjo2z7wr7a6um6xgeho66ry8k1wsk6y46thzbxbsz4nv9dvt0wcsp2eag0cx2p9yaf6sz67bxjmyu11qrjuh1hjy2c2oe3dyakhv2zgj4gk7jks9p1q16wyqqg4g8mlxlo3lgs17vnsxezl1ei06muqdmg899emabfvnxaxqast04nfoziledtt08t2qznty70v10a16afdtivdmghf8vtfo2o1u1wkszqtrjwif7g7pglkcmw0r4yqfoqhgdifrqo4t7meze2ws3gq4jihm02tsvbc3gapubu67m3jrj1abefmldbrqc9p7ks9qui5xs5ie9y62d4qog29p5nn6decnbx8ynkf0ytoxf9nshbrcuuppwblhzan24kbglbdmvepdef1oqfk8tte52yaxiqp5rp5mrpzgkk6qlt173h0tmg8088ksj7umdiej64944zvfqbrsewk9aucy978ygmqaodb1b5eay0efyvvf4ssjof50pwyv32ozb32yu6hzbe9v3xti5fad9ljbv89z4swbuwswsp6ppjeh52bpinsqkyenybgtfwaguz0qbjho0r12dmoihk39esbhdm329fvdg4fmta4w5z971yfjahiukjwgaqmbb8shybjp4x1oghyfji0sflp584sjnft1sa9os1effiu6ol2y9ez04e15yy8qe9k08cd6a1zkafp1x9hk3ohvijnx9prj2fs1h8rzwx2r88jkg1o5pjsqggkeqaknbou1cn2g1atutng1bhhrn7wpt1liizo978h2k69fcopfzh00bt0xp9fptc25plk2pmxwdjyeqdh9x9ds9qm9edcbc5dlrtr8iq0oyb46jjf33kpvqv6ar4rbquoor6fm1zboluv0upkx12vpil5td0yo2ofi06v4kqzrmegsf47o7ocwhmxmkwpmhsvnyjpeqk0qhf7',
                proxyHost: '3ras64iqxqh04m88bsnmtjy0rlrdgng9thwo8yowte6cm3z3psbcr48ot772',
                proxyPort: 7604434388,
                destination: '9jvxog3d7op8kuinrvpm8joym60p1lov1sklfzk9pq1asnf4j4q9d79vtxdnr8ppgoexptkwh5o5m895j2k57wy5czj7wmgbjkasuczoa4y1wj7vwlmxhctcfcz17v45s2d9j7jmlbofbmf4vj8laokxfd2qva8d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jbehfejk16p7cjvydgxnpp4sqtwtc3fm87o4ctin426ln486wvdrj10mr6kv4huihcy6md7vfm6s5lxjapdwlmoceaiohhdd50w3nwn4v26ijlnkxu2yorbsmu62079652dkxwcbpna9stfhcr3d6jqeezl3rgdl8',
                responsibleUserAccountName: 'p645h4jmtig3zb879jzq',
                lastChangeUserAccount: '8u34mkfegcdyf5rt3rbe',
                lastChangedAt: '2020-08-04 20:36:02',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'vv4d8tg6g1zj2600x6rqyqr7ronacp3dhafhhoaz',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'nb0q67wr82wyhlc8x8nmuytxyd9e1v3o6a9tkx65zt0036mmoc',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '4o0kkidli7xigvhbd3l7',
                party: 'vqtrxyrfqsuvj7q4jlikskyk94yvoo3ia119i9lv7rj5x3g6wo4os27n0jhlm3rd1cey0puahg3ay90afkrlc9cuhsj9gzmlu1q5s9ha7e4bml8wr3hlmpml74gs202fyve68impjmpfcq2a0uo7jcxw6xy8asel',
                component: 'dg2jrnnfd2pyxoz26f6m1iet6hye2cmfcl5iqoqtckh5w1n2dkagwkznzjs5dov2l6rl8e25hdnls29l8avzg43fnei017t1pzcuv45hs7410gzpdhi9hpmxhf5bqpqok077oy0p1r599sx8w2as22k6l36ydjsj',
                name: 'mkgw9lym7sfewfabk8lpbyabjwzivv3j4o12tfbgqxdrmx9k5ryew5fttx9nwzcdsb7u9jlrc5majryjs82t0h8djm1lcn46304rr4nrtfhvnbbp190dihnjrdydvlrqcz79e0yxyf4cdwfb8jt76fmik18z6j3y',
                flowHash: '525agatjwe33r49q1fxgqb7n761vj0uxzfsyfgsu',
                flowParty: 'bg4lfsdanm3l0l43wisig45i37f249yeva1a8402mo2qe9it03h49eosf5qrdbvwy8o1g4ylp9jviiq0oeg4fp9vmdgop63k43zo2vloyghj3smf6k0qr6sfxr27yjks3sh5cko10zrt0v71w6lc90pndulx70k1',
                flowComponent: 'ssdhrcp0heomjdzmze74cvuuz8mdskj90jo6ist3jef5fd45ybu62ond6y45l7biwskhllyt5i3xs987xh81q3q2erkadawz07hdz6u8vfrqscoebaqkp0fg3nzw1c2fh6hont5syhmnn79aa0e9il445xrh6xs1',
                flowInterfaceName: 'e3uoit8285hg673op8c6pxb4obi1o9c7jksvsjujurb31v0xlxibv5amnriddgajryqqm112fjy6tbnei7ru9o616u7bssdlh9rq12ko01q6n4bcsknwi00kqoeu06ld5sogk5wiipj41q3nkn2sosu7ozigtljy',
                flowInterfaceNamespace: '6fmxbgkzh251b0gvm2mix4l2g6at98ja2uo84tc2hq6da42kvarjvu2cd0g78x369dioziab8jw6puvgsbqvt4wm05elvs9ir9vnuarn38123vmvjo237l7hv5p9homm7s2ujjqx0m615b6ku6gwezlzbaijv4ht',
                version: 'q7g4zzn8z3vhxshczq69',
                adapterType: 'sp3jajdyxz1mq51d30srva4idg6jog3om2rfhawp86mod7hs9jj14o6z5huo',
                direction: 'SENDER',
                transportProtocol: 'hm4fgwj62k6se93lhxn647ed15s9q65uab2ttj2k78oirvioj8ot2i957jj6',
                messageProtocol: '2wmf590g39zz5des64ix8h0a85c8075day4130v7r6tvxfk01dhxrt0s24of',
                adapterEngineName: 'ya6pkrckgiqnvwtlbco7os92xkgtlmt56ljlcxuk70mn1o8yxpgqv4a7hm3s8jlcuvu71zfx4do0j9r4mz2szkus4vw7293874v9l20xulq3yqsp9rzk8n9ijki29vzije35pbh7vkaya7yvvbsv7occt3y8wdf6',
                url: 'j4k7fp9xk7kg381f503k9y8siysvvuyhd569h9n42glbpwewvjnx16oma2dmcdvt5duyf2rd5l91kdpp51c6ka6n84p646z2hylsua20bhxaiuhokbalrh4xpnk75vy1p2wyn30janh4uzikp61tsqy0pffad5tmwcjrzwfb522neo5ryrumuhznqllhhm2i9c400q1kbjf3wkmi4l0hvribdmafwtg3h5f531ihc1iumunlluieat29uf8y0pyuengeoo3dcru7fd491c7jatwyhushq60489iw0dmdbh4jrc16r070vvtxbu3ocnzc',
                username: '5yjdt1kzpuqaa36ibxkdf36ct1x07nnk5ltzvn0uu4hzf4f89auttnsw9cl5',
                remoteHost: '9zs8mfx4nwvegilfmx5q3fijbrwk2yoysk3u4sj6dcloowbuj4ixcrmge95a0o1z3x5quwfoaakwn1kudcsf0qg90gvkunjk8biqil6oe7j0zgit06r6ztjxq148z7mncubf15qqgpxp5wqhj9l88ffuolvm4owc',
                remotePort: 4894719645,
                directory: 'el23o6m25gx928qqsj89khzjolnz1rfr59t660mkfv6xbgvolo5qayv876d85vl2qdjzkeqfxs8fo3ieuxdln2cti11p5x0jai1w73g3k75loziq8mvcq79q08ukp6y7glliof3n3c3rl8qqnsd9pwkzb1wnm00mlbauriiqoeeua0tqytv3pfruy770c7cg91a38wcg3u0u4kpbo5yiu9zdo8q666uijr6lys9jc5o10l1a4q4jkpga4qmtkseknz9qvs2xpfumzla0mjp571r8hiynzz8vexwmcz7ym8jo189yf38ci4w3dt0qf8tv94z2mwtma3qc8mt7s9r9pbt2mcat1useb85087bzky58fhvvou08s53lxgx5nooy7v31hzzkwxkjbup5m6m2tgt69g4t4mja659nde3m6q28oyu0hld1fxya05413t7y6k044nouswikua3gdvgitsqrhjhsab1b3q5bmy9k7zcgvl5e7b7dxq4chxu0rbngcbc68x3tzidi9r30otpii9yqjk1u2nmisc6vux4xqph5698l4blfquen1x9oc2oe67plttl4rnwdc6e4ufez78ex3c7nqiuyocgu48to1jh24lm6n0giauuewa37zcr5frnbx8ccebxolf8tpbm1jibmklu54a1xywurskclllgcupw2ovhy2j6sgc75jfa3o0qtb44rgxr2f4c4buqyq18iefz4c1evp2jii2rfd4b0pqlivc84lcjpyagnu9sr6gztgk8ufji81j1sacq284no63zo4kklcpj0b9cu385l25g6olosjnrqam2itivf413pt19x0lze51zqjtrjbwm9hs4gsuxszj5e5c9dgx6guw2170fw6aqtk1ck7v85iqan2ip5or68jbe1laxn32fxly4qkkfbdv1av933ijhkz2uu7aw5itnl8nen0d3g9xfb1tlbc74mic40ingep8xt0mpu5pamhmd4kbxkyt8539tzoa2f919th2z0nxcp',
                fileSchema: 'n3gxnn7w96dahp726bdxy9evoj7mqz87s2j9ydyjhq37anwdmmsepj92v5i4xlscu9hs8oc2kxhh8yiocuze2s9mbq1mxpq2l3bzlv10xo0wvm99zzkj02i42o9gp6q4tq2zndarz9p4d9wna66yof8v1s1mm2e588hwtqet9reit6jrnopbselash8ycrpou11jyez4r34dhebm9140k3ybiq0f08thr0niwo8yhpqvld0nvfav8pyves2ir93n1pwxude96egnji0ubnuz6l3lzxzj2d7qosci1djwu6uqsf4ic7bsecc14f43b61h5n02fqa7a3hvft6b4kziln85c0u1who6okcsail14y614tf8hw1umjkazv9gappxiwze1enuuyu12zewtzw7vri0ysbqngtrty2gaatlg7siewm5rze9sxak97hs6834zdu66lclypparyovxh5h2dsx5m63vx5gqddo9z8734oa010h4s03b1w98emxnpq77ck8n9k13n0ne5evuowrhw0ulvuiyt5x8ojf1t2p334cdid8uy5r54tlk5eb2wss6do037cya56j3nvvpid9wpi95t5stfaoo6dcfvodsltfui78pdxd1yu060ny7vil6yv8ukk943l55ql2wd9mle18vl46jc3wjhwcbol9748k03sqmhq4emfs80ah96capjc9nc6jdymc1f1x7eife8bzek430tbb2tksek4kdwozfrky2vw7c0btvy6jfozj9tioq6r05a9060p4nkl8dyi3dy5ddxmqkoasueab5e4wbtsvpq0pslhbmgph0w6gtd30oqiui9o8spdjaohrcdrftcvypc6udkv1tjj2kikd4eh8mhpfjjgq313nq4u91vmgf7zyw6xqcz0bpdyw3wmr4a0gkc3a7i4tqgz5vf1v6q6cfxw1oi739qaaeobfmqleduywq8446n5ahuoaqj9qp37746etlzs84ymhu80qz9du8ilm27bsulxq5f3e',
                proxyHost: '6mxy6vvkict4nv9v9v5kw83ttm1k1ve6f38bv5v5qm20ga8yit27kqmps3mh',
                proxyPort: 9926930463,
                destination: '5c160c0f0dk8l6e2t8gzwwdmwq7a3r3pgu35egztl0r7vmrmwqh9bfl1h1d6jg9tosv6u8hs7y3ionai27vhmoez1rhlinb9boaygcfmdoain6n4gdk8sqdvprktvdynjp8ts4ddzl6oy79boh2n2o5q80wd1pwx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vpz95ktjy7ti230sic4xwh2rrwpf20syy6l82rvrgqwa9s0vjuo602sd8mq9y9nr2xi93pdoatx1nw9qpt31c01me7b1n1ube7lhlwdle7d2wzwld6zehhbbxyzl2tjdah0vlwv1w7snwa1ub8vxwob6pp5xd9w1',
                responsibleUserAccountName: 'kv14wr5dovaq6dl3y99b1',
                lastChangeUserAccount: 'w80nr1vqkup5qnasj6ji',
                lastChangedAt: '2020-08-04 17:55:19',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '5z4jhk769jtgykvskejs22som9qobzeh0x5d1ji0',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'b7bkuygetcu0nus95b2q2s9grst1w5sgszd9evg4vof95uococ',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'k1m3fp0ouz3hei3bf407',
                party: 'q3bcelu2qqzwjvxkjak7dykstoidzxuh804mpj0hfa4pptrzkryhhn0vfumxey8vorzekyeq08tuqg9jm9cfjrnugqwp32g2fh13rr4qq96des3nr36cdkf2x9semr493of42d25seevtt1wmibx1dv9hcym6bwo',
                component: 'shraf44tec1dcn917lzga171lcwo6oj7u25gm060oe9425d9l4b7ri1nleeef4q4jxd1goompathiys2q2vh2cdyop00yej93i35nhgtoq8072nqbcfvry2ddywx6tfgzpf6i2qvoaqeihs3stfwz2lmbeo7gxhn',
                name: 'jxmpqk7v37m975r9ktd2xi7kizwt4k44ym16zrjl4dep17vnw63zqholzc0ak29ff0fnqfzpccgazqoh1a5pxhtu7041n2n5ikexhi7312weqy5vhkn6hes1422ss80sms5nw4p639vjcrfms0vcz2pck59qqe9w',
                flowHash: 'x41v4u28ipbig5lbu4xmq3usx16qvsl4zcqeoyx9',
                flowParty: 'udl06ww5x0hylnyogmmi64xuqx4juzsufoozgpbte8qluyiqqeeuxtmugdzr2slngvq9wr0armgntw6njyau05vfqam33pu8rm7h9epjkgajfxzu4pmc56auicq5mn641f7mjmyp964g5658o64v4szmoah8qlsu',
                flowComponent: 'euswwcclsc4w3zqzvf8kp9a5f20u0s470w4ule4xccil3h8g811mfx6xdbfch5vxm56r243nnl01zknfygklvldyfn6tts6fo5hi6672wo5808j2pbhbiswso0m1pymko11u0wg5vtqx1rj2oq2lyfs85d9npcvt',
                flowInterfaceName: 'r0n88yg2jd9xml8n1sb01fzyuuq605d7elzbh4e0u83s0j3agjjjb5d8ujo8g0xky99vrh79irus15cwdkx8in49g6xd0f9p0shqst3bot95ftu21nb1abo3d475t2u655asbarkuiuyd6cidp885eun8bcimhch',
                flowInterfaceNamespace: 'xjyu63s099py5f35eepx68lsst72hajor8coti93pa7er4ulqk0ee9tr2lq47w4wuwdq85ffuot5s1hndt847qa1q09hgs0nwtjoovs4yd6s89me3qshtwm6qxk1cx3pxhommj6xz9uzlwzwe506v3fiyzzszrg9',
                version: 'j2agpub3vru9fpa9fmiw',
                adapterType: 'gnndsl7zb0fxd3s69t7y2v9e9naqel9ro0gpg3jw41gdpcupnfmtrvfj1yyy',
                direction: 'RECEIVER',
                transportProtocol: 'na7mlyxlo44wujjdtz1bx7a0cxkloii3xbn5e9i1pghcnhvz2xceigk5xvej',
                messageProtocol: 'dxv79zbslbfsor3596jlrohhuczcjnk02hsr3hmpi2si993hna1bc1rfl8vn',
                adapterEngineName: 'ha33u8qjddr07rh8mocy9umi818m4zftlwj00sep1bn4yv6dwbd0wq10cd2w2uw90swmri7aklbdrbtvm27bn3fe60ffzdp9ly114o60s03eocvw75i9eb2hfrroryrdf53u7p86ja6udyc9hevuyn7slqlmntqv',
                url: 'i54m6dmh63rcfbjepefb09ua47arhbr6vumswg6dwh04soj1xavk1z662o367qydgx0jabiuewgrms6w9gzzcx18e9i5wf2do7qib2napqrql61unbczk3vflcmejx7msri8yldhetiepf1jskx52e93wjqt4nt1kgh8fpzfqdmqj4glp9huo4ylqfuw0j74aknx4d129dxeuov18mtfd54cvwwxz379x0c9qizz5c68lb2bp3uwxdl12eldqejhjxexxcoaf27tu4j1ln11hhxft4z9affzza2p7fcbnibp75hsgtnz6hb6zhyq8o2i',
                username: 'rn1hf2md452a9xlhu076pk6lnhivttggzaq7qt7ov98oi91f0l0mvyqndktr',
                remoteHost: '6glnp76dwe4e13fmyfq1uhu9hasi57z09kplq1s7iqatcjfgk87x9aimamoyfssmrit9ctxcssgdlg4jxip3crgq94q9i0ha6ug6s90qzma6o4coj2cqztl318jl38slngi6d6y211cmlxpbn7lkxgsa1gif51u5',
                remotePort: 1168499741,
                directory: 'qonrla6hcin7rz8483h068slq2rnxc9ce96wc89csw7n6bdftodvxr0y971svi7ecppkfepqosm4892j33sfprw869cnigynrtqw71wpwv8cscs9wsrp3gh79zorwukmxlp6tow9weg6mzl0iunxuf1mwo03il111a21ad8xtzrh4s8x9rbqq4f1oqubwt1ysmchusq8zu3lzpdki0vjrqfrvc4gon9sj8qo2ipu5mrfg2baku17ssvs6ixd2tdiv84240hylnav5bqlk5oh45nuyh71atv1bznmf8lytwkbmasxooyd05cw0cnxdjw9ffs75gr9d90xyvc5diclkxkje1eyy6n6wht5h40cewse0rh17tm6auxtuet2736j68o4bj7ndh9k4qbhrz44w49p5h6jvv2zergmhfy5uckud5lcphryutob8m26ff0x5cbzy40pr6tdmwdxk1boayyjmuh447cuhk93hx8ocb110mlvszccyggi1gu14vzf2rnbtylx6xquzegogufszn2g34c36xocyub42zcnhfh6s9nahkbwbza2z923to3i60cvc76ozwmcbf0o4nmfjarrn3olmwdwy7akuhrqivjp3p53a7ngny5voavtfaedoctju3wnksd13awhorhcd35k1vs8ptg4za5vfl1q5mvfya9wx1em0tc0ynrkrgn8y83maq8gixj21l4kga04j3m728fwy0qboa73pwvi8pe7ordno8qu8w4sh3b7x6itc4tr6nlrnvtaldczeumuxbzc318qfxotciavbju1yqmhkjybu4f8vayvyqnob60766ppk7jrzmzm6x0qq6eg1zbp9u41p96kgrnvod5pc5d0ieqlijoyds8b8oxpmntliwh0iru1z7oivhx9dl5xg0ce5daq1qksw0bz2vta10azfhizg0xhkisa8pjvn5pvc17pw9d0d0rne54kdp3ec1nzgg7c5l5uuzu90fhfucjpxhu38wwkk00gxm1wiuhp',
                fileSchema: 'uve1cfy2x40ifg7iz6dvqf5ffaihfz2xizhbrvowux2h5xg1t4u6bhfqlxtl2wz6agzztcjld96zpsd2ego5uftyea3wlagk3ahq6u26btps1x4l940t86vqnc3gu0wzuw4u8x6pbg58t2s4yhtelluvtssm7wxdhzgfc6g1d2yd3ktzheievls4metgaf6mjz8aulzwejvt3wgu9gpmbht6co6i5zupijhv97q8rk26przoc3hbnofuwvxk7txod1xte9hloi6l2utpdgke5i8pahw1e4ntlu8sfl9pcgv0hqukcvl3zfz60ru3a4kvgm8eyxykw1fq4q51h5ph4kazpbnhg6t4s7084d0m8lx826f05iy0qdsn1hr767lg4u432hd935xhzekkvvkd5951cd44kon8mwczbbjf2xz5dx98cy382y96wdu9fjpi05snqaf8q674nz0brh1pht6dzerficdypjlmr3dz4befefiqyviq9on07j096uls9p26moqb8yqqlde7x5b9ml9ucmpxtko2b26n1rqhm3q7e5vo6kykk4779mitfflb7rxxf181aet52706fkirr5myntlu7i59r8ggswx9lpyleqfy7gmn4gd5xfqcatjtodojhawrm5e78uiiutxswjrexlg7fi59djylqr4s3t89zau5drk3lrfod1kr7hy9au1eoweyo26d1k6upv1t2m2totthrarhikb4m58thtmqohvvvxw1kvqptjkuz3jogz6gublcswh5p6dq8mswreb93dkc2i96uwbli578gwiyo2cf6wwdqohc53t3euzlmsmr3ar1dj72k2oedr00y62ufr2z1f3rlu1q1uycdf6p7er323z54elfe60ehpph9ey6ruwkwo4plssxkb5lgaro92ic69zemt5npzp48do0cs9a3c0jny9brkel0kfqw3w49eg368f6cr6q87hhjpxpztyz1nqb0p8fgxlgn7wbth4i80392hs6g7juc12r',
                proxyHost: 'fv41s45h07l8akz3y4uym2pyghzvggl80nql2nzum57f42x6guzjp1bla32x',
                proxyPort: 6261758485,
                destination: 'ly4njf4qbvkiqok8a66iuqhp5ziossp6szz3miw48qqj5jchrdygatilrb0848mer6h5r95z9j6eppbijr8af76zv43vjl2se2suwypl20uexonrsr3abd189z8txo8iwsdzztvaau0kum1uy9q1np65atywxt7e',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zea3u3060s01ygyi9pyy1bizzqxcdm3vqm7iqmowcha59w0m5nyjsn34g9fc0cr0gfu79ois0ma7kr1u2qcflgpzoaedra3sfwywhky8eoic0bsks6qte0zsmwhjgoe78qtcs3fvzf0bdomqyne27l0znhu4nu14',
                responsibleUserAccountName: 'yikoclus8zjfxm8s2aba',
                lastChangeUserAccount: 'lv7l67e60umgxbqrxane0',
                lastChangedAt: '2020-08-04 13:35:27',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '6asibgozub9jd5qardmvh4f3l0tdprt9g9tps2oj',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '8kxuo8oid6r1055wecm3b6pbcawzegvqwhlu0toq4pi1kpcnst',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'sgcbuneyaesdj3fatuw8',
                party: '9grvlveg5cwuvdtaj1f52gj6dt4svdib5z94zu3awpleca3mthg49i6m00ya57hrbzxa0c1jqxfyfna42oyopj9weez3fw6ljq1z8u01zshm5l7cgmzaf4b0595zwyuwrl83i36oqh5uncmgiav9zzjcje5h7b3x',
                component: 'rhj5hgxdh5fbd0cvcy3uj3wyap8b6og4j0ocwa8iybgytflsnw0ukkl6txtpbb7ni84bqah9lwfs31zhgff4h1t7szjkuzan6mu65iyo49gzjfq4eehybjw3vl4lf96s0g9u1sw630w2y8n5ck0vjypq2g39w1uj',
                name: 'dx1wvp9ebsfqbbau7gu9tli2ak0ddy3quxmh1pg2u08v0lr67zrgvxv5rc63ntzjgn6aaw604jzh3kta3yrujlfffzh869hdukwio1o7uk16osbgwvc7ol3w40b8n02bis3q26kmgg0oudrf2pxglk4y8hetk8fp',
                flowHash: 'w7dhj75xo1w2h530udvgorej8c8lloo11o8qpihb',
                flowParty: 'vylhgu2yyuso6y8dbmlz2mreywj8x2f69nltld7t01uzi1f35povkamfyf693f99f0vignv3ygpdrlou1bvoo1bqss6rhqg9e38kpbwaeduil7imtpe9hf932rew5hfw9asg2gegg4wfzzs3qk30j62edouhie2e',
                flowComponent: 'hrjudm1kyrdt884vqfvsx7bib4y4cxsttj2qnjs3nn9tr4wuic2woxrbcc4al452x5wnhhrrkngcfhlhi9wgpif0sp9mgy5hg6u3gxl0qod4l4o578hroowy2umuogp6vg5w5701tv5xy9fh8vbyj46p6pqhvfb9',
                flowInterfaceName: '61lrhtd7bd3lrmt9t8fmznprbjfkwlps0bxr49i0n0qjom9lmqum2kh9yuiaqdhdlcgr8tx7h9sf0ncdvjw8b8rqahr5p75mw6ezipxpw6i6jsvnwvwyu03cob1nw1i552dteoigojl2hyy5ign2bmoxuhoi2hxd',
                flowInterfaceNamespace: 'g7i429ys7tupy2hz9bx6ujma55v10ooaoj4cbyrpge1o3ltjrk005uy4s5j9eivyp5xpybkmaw1k3ew6llc27nhj3ky58f2ma3dcx1huy9244mei473c8yj2660apmvc00iw3yivpqpb488mg0dpcukv30580d2k',
                version: 'ondib3xr33il4iof72dr',
                adapterType: '0d95c3ry63hurv3xa8pucnokpkbw71cpz0k5vwd5mud2f5l6y3rbnlt0k9ss',
                direction: 'RECEIVER',
                transportProtocol: 'gm4tkf8dkthb9tfmmcb822wz6hf30ut2r0hv22gvpwv98pekwbt2qw0faj19',
                messageProtocol: '2eg5938myp7gili7o5r4je8gnb1wgw8p2jlo2p7wbvvax3uxxlp3wbx0dnbj',
                adapterEngineName: 'u5hqflwukls4x2u8dnv3kv72zhc8w17bgltq6f3ylw8c7ucevzgdmpdudhjlt395b4vqxjzax0cnl4fvpu4uy5wgq3num60gtozr83ux9j9dhnlsw3d1pqkiy32somh1apyx467qmcbgupzrvra7ppgjog3hr9vf',
                url: 'nzbww7vq4h1f74ad90f235x7c4fzyfvmoljexbcm3irskhibk2lqw7hq9xnathwnaonvnken7srr3hxac7xkrqrnog8hrno40yjdeg8td9n9cbs9790shcf3rurxvi12pxmxgkrzekuqc9imofwex0n7jukbbdeqsa85j6jwkb0blg6k639hoqz10xruohj555jdd5w65i0v696fyg1bkq98kcxv9p9u5x2fk9tm136fkck09y01jwtwfxvt0raybbwsw9abdu8j65im8v0gbvbi0h8polsav03qeaq7dtcwrjmebhha3zyqbsi1zt62',
                username: 'ug0rdd2ewfk73nuxj2fg23iwjnn75d08n3olsjj7xcaezpo6t7m5honemw3c',
                remoteHost: 'k649vt9hu1dgs0bpn58ky3cdmiojgnmznf1tvezjdy6u7vvb7q8103l8pnkmk4wh6iwmgrcwmcbvb368qlbq2de4zoypxp81zydpbamapgduvkeu5kwok2pzgddrt8y152q8xozqtjmspn18fgpdw47qssq5o0is',
                remotePort: -9,
                directory: 'u2kpi2osb85x0bte46r10ha87hs2eh0kauxzktxt086h0bcj2k136nkrquu7akhboi76emaykwlm7qvlkja4w3jw9juxmbf8ra21r3hq7o8eefghpmcycv3s72ha8s4gm6wvi86jbzdlm3ne8z2c0m1dxylbqjl0h1qykodnyyuujdonuugumffzuhqu1e9smf2za1mwkmhi3jcedsc39g05rac8rwz31bil2owwoejf1k3t8ev9re6jp65i4z6a223wkh3z9qw0nu3g307bf529ws9efj6xtbc7v5q68uai6juvr8ued4o4xw3uq0llt3z1oym1hcew1o8zgjwlag3aw8cw2aykaepanhjb8234g3tv5ddkrgdpys5t5h545s3hreuli4ghbexfkkx7ictbh4u28sf00cw2et44rqro7g09yd66blfkyolv27bmrhfhs2b9wzap6v3c9dhsknbsq237rxwvnjaokjkzws8bcbyf0hca4aqbyhwea5pofu7jpqpq7sr5v0a9ir3ftw53bit2s5i2whn3xskh66fly2pcjr2kgl0xiuvz5f0n0iovz63ozcc2lb4swm5bdeuq80icgyar91iu0de1k9zh9icfn5px8he0op04p6t7daqo0p4hgt1f254tuni7n712tbgalgko16gr8kj0s02yg7vn4yserd9jm2l0g1td4i7i9el620ic860gszd832huy6yq0a8n20628cbokur5ewg0qqhci5atfwe49rtrwycwj5odknhyv449eno1g83gb1sooxtqle68yv4mwk6ouxe3d7viy384andaadiz7pc6r69nxl1u9068uaxu94v2q5peqcc5icap4ulmqasbuhgnp538w8hn9vp8yavdve2tg0zse9tkoy79nc3m22h0i4ll8dbaao0ps49n31vp3xotzhag90tg7lxe6qexjznqdcu1bx662k9wgf6u40lhsh1cv9kbohhoh96cn1pr7fsg9ppt7qexsm391nny',
                fileSchema: 't6q6ui26zakbyqg33giyyfcz3mm89onzxmmy21pl650q5lhd639ovprn34rbl6ndnh6l68njy879bmgld24ferh7dao4uvfvrfj4xscl3kql31zrhhsc5ficvulxrplze12h2emzlmj23as3wrj3s9i7owvr2lecplt10xj70vj9fu1yit7fegh9bo2oiiddaipwyjanazmy093ht2gv1qk9bdrzxuf4ny2s1w74tdmamk8r3me8vz6cphrzvw09diccdka1vfdtun9kxlypt8w4hdnqdgy4zbcvruuhg0nvv9idmtuhvpdaalbzl56zqst3v7b5jc0h9y3n56y7mra1fx5tmu7m87ey3tvoq5v442vxme6tfioc8ft7woxju756bqtaf0cfp1h8u011b5umhqq6oht1szckd0panbcuwxnno5gzzub69iq3nck5vrm3cwdqfcqvxcswpe3f14911mqozn9v4c97aodskj1s895qt1kzxebhh6i05gy9hadz6ufax4007o97q1sv8qj5xuu2zk30hutex6jkdgp3khn6zg0xh9n145yk3k2ahw2rwmufoe698d16psc5n1th6f5s6tgqh7f53zb6buqgpc6cx2i8scoi9ewsxqtjkovube94unwjd7ku7rvzv45nbxxukb4zryfr7pfj6tsbj1mnpy5grthz49b6f8ulut2kw0ntgo5k3e8o5kbmw9egehz6n4q0q5t28z8de1lu3ct1nlmojq9e8ba7uhxrofwhk2rqs2ant6osar8gvdbixtk33kqf7m6z4ao8hzouvr665wf9xuaxp9ibqpa329ocvhw5noowhj6062c6jlal04rva0epijk3braj7jw9egixaklfj3mdig92m0p41truuphqdkgqn2sl4bknwqn87aazw8ap0lcb882rfb3gfkqdgjhs441fuk9lyxc55it2aaspht8lhr4jwq6px3kp4zn5iadj7s6w35qm9kkbykjqnjm2qm6xsfa3t94p',
                proxyHost: '894qjoh6u1jfo4qeoa57od56ngaa2yxb8wdvalwrxx76n2qptdb6j4fxrydr',
                proxyPort: 5204816419,
                destination: 'y7u2v2gzcp5op45aivi6ta047utqi25lrbnc47zu4pmg0nzypnefup8gdbuzdmwd4m7xrapvt6nlikpl0hbr1tcdqg71rfsvio4isl4osdvczk7wpor7zricyr4b8yzlicwl2rrqx01o6cwz0bwvgvv8j0y1zjtb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ml7ufllhsf14fc3h390hojzkvwbfmzm23n2zoyth750biztd3kdkv2z87t8yegxwu6zte9tkfl5xpm5117uv66dr02whq2sq9qr4tnqemzif94n15an0vegt9hdltdew2drd2kdszmnscf1xtn2bvwkjxe9kv0dg',
                responsibleUserAccountName: 'doueqy8pg44u3gzlol0c',
                lastChangeUserAccount: 'gjv0zomgx2t1hsspz34c',
                lastChangedAt: '2020-08-04 14:27:44',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '6zlzw1z7qmrhnq47ei4vig5yhgzs1irpywe1wdgx',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '8dwqpog8emt89sozmvjwobp4h0nqhqb6dp2brsjv4okr24530u',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '11xg81nk3iwdcfz1v4oh',
                party: 'ryiis7mt43bhfnim84rxggu41tfqrkryifz5tazy43k4hchf0r0u62o2t99fhzwa9ncbqmge9mz5l047tlmv3ff5zbmjuuhgyb5p98w9wknh8rmjsmqk5wnupjq2p411m22gpdrfie1n83hx0fiyt96brhfjf21c',
                component: 'fmysad9lc8xdh7q1vvsouagafn1c928ddktbb35cxvocw35pz764dtb36qf0h1gpb29stqfocz5lofz7ln4pp3yf3qq6gx2h6bps9kudor20ief0msrhyku8ye0o8pua2azmg3u4k27vvz9hnxpc9p4q6cdh0ke7',
                name: 'vw8yh3otu600urizug0kkppdc1zxdiuyo3aq7yxptqm68xn395xejeezu4jdhlmb61tecdf2hwtc3r2drbv7h44tdx8ijvp9d4dq1lpaj8z9udsoqsbk8w70udz6mpv65ig1birckfolnfx7uoyxfz2sg42dciam',
                flowHash: 'quumdwx7u6x8xg9lf61wtss5tkw7kt9j27b7akbv',
                flowParty: '9f21x3t6lo0uldhqapmq8iqv60zrygmku1cpqas58h5jyp907uwblnsw1sj22dfb16xev4yt6t31yv5fyygxiqxlzvn6tfb44c8u8yfo2l4p3adb603ty7c9l6xf2e2hvoprpb69o2xqvggj0r5emko2x8lyz8un',
                flowComponent: 'g4hcjrj87s3m8lt05a9qy7n7hjdiiltwmhewyzghhsricxsfi327by6a91yaodkmz2ovnux3t35rdltuab0cnrkfn8mtuogzcjr7a9ll2hav5d9cqcw3wrlbdfonpotqyljwfcaipabi08o6l4gjif5xcch3jdk8',
                flowInterfaceName: 'j4se7tp8wv08zg7mgumu9a36inhoeljh7ytm4mcudyx4keunrdh1k75t86bg9oozgzejeh11forjxeeyh9c8pul5hoaj084461t89nzz6g1eio77yep7wf4zws1owto66jux2v3zikcsx98i7ls5aziyxyhuykd1',
                flowInterfaceNamespace: 'maveiv9o3wht3rcsz1i022gvo3cgcb46uz5uxmol1sd16bpep9alsp4vhnulgj5obsaww1rfcadmlvtsw6ms1fn8d9mos60i9rzv292o7zd7muv8w4mjgblk2k21regjxxigzdb655u2k69t5miwf93xmjo7yizy',
                version: 'br0muw04pvc9hwczvr4v',
                adapterType: 'ja30a3h48fk38sl5nvamjhdh3biyo3qcru2dsxpyigo8kkvvtj11d7oz9qdl',
                direction: 'SENDER',
                transportProtocol: 'wisu6qal1hcoyndclrb98pf9wutypcdewjjh883pz4lhoawjjh4gi4nhfhme',
                messageProtocol: 'vft24hv6snjfh83dv83j5vf31wgltisx1pk9f1on9l0ommuarkv6zp08bqhl',
                adapterEngineName: 'yrljrg9vqlblarlmlxbg75v697s675fs90y7ctvdnw2vm6zziu5wwtznvj0k1q9f7p72ulxewm1k3868ablrry0ntgmy04grxeu4gark6xb7xkkis6e01pap9aiwvpbcdbl3ibv1i36ggzces45evyxi26yn8agl',
                url: 'yglfd5x19p7ajmamuzeqverhjufipfefsxcxehtg9owk6hpvjnlur3vyfpoayrhm1waq7qjdx3fqjqikgknfha6eu34xq9aowp838sd53b2hj523z1fp1pcdehxkrehtxpsjtr952b4yl5vusgwpt83a9tsw2agyn7ie39edg7x3hrp6d7ckknap4g0pr9f3v7ootwwgcjskpldqw44453n1gzsazkhfok80xsv4ba6hm9rsrztsqiqtrj48bjdbdm1q0vr6d2lz2st0hplo71g0z3kaw7491u6iyevf5tvaqy2ynzyqzz5vg9uxkq3t',
                username: 'c15gnod69wwhqs0tuaz9p466mgk990zxhoh589jmtnf42oar9ub3ftxm9bg3',
                remoteHost: '9i65czay3xwc6w323dzvqvnqoyugq3u5z6t6qq4kj54x4znl321jxo3hfmn0xw3m7g0jz1wpcrwinitqsi3dw8tfnjuly1t5k7zyh85z1210rri2re8yv8qqjwvgbicxylahr5t5cypbggtfg7ps6esqz6hgggz1',
                remotePort: 2366065173,
                directory: 'k9ld3qr85yj7k6ear4mtu48unj2dvyojup7mh8lgng6tfk1g3qnx421b18jtp3ji0bvc3le86dcsz0a8bj2lstgz7jjw5cwsu3xg3gefdcnbo51gj8opnduvppmdyqbsbvsnnlrg9esnrmyq7iix307rekvun0i0ocejx7jjsag4e11vw1gaull8xw4fnche80au8sggs21m17e9ibgxwigk6eoxtmx11w3frj56r8jpbo06mwabigztdqs9g6ycfqvdx2ulthao91pylgxheuljawe77cq1ci7lhi3an2ec5nsavmrsgvgg0sarpaw90v51e8ogj83cok8l4o3tpmexrxgypg4t0sdm88jjtxij1bgd9710o1hpbarvfb3yh8b9mfl50sa1g5lhn9ukn5xuqg9iuoa9q91o21kwj9rq0lsqlysw1alin1f3o8d9zwqit1ydvpracjakd5gzmrukxnrzoqyjmvt3trjjckajw5v45loaufniyw1hhgytkndr2rxjb3qwmjfcwzjmadj86ialrxd47gbfj9lpxe28ppqbn5bvk78q06au57ffeb44688vnhw9lxgsvyixb5mitymz6tlvcv5tr6ufjzrmco1ctrv6aou6bgbqozwkhqeza74awt8z9u70fsipjun9mi7vh3ngpby8mhs6kg37150r6zecoviq42dpub14ln2zje9bze7hk9qxx2dbsy74w3xud9timmdrzsvegembjpgssbhujywseu70oxylcun9v8mefn30yxjhrt9vjq9qdd9uswtfmy4vhcfsomwohoxfarwtsoa4jvu34fntv7t6z0jutuw6qny7pugc8knj49rihl76r1du1lbdqmj75fj2aaaoras2d78t9xu4np7jpknw3nm03yslgy6dbdtrzz833ghbd7xouemilapixra0iu9r2b7oucf7iojs6wa8e2pdtwwv8v7mc3b020yll9z5h5hz7gj6054tmbvkchq0tw1r0pye3xncelkp',
                fileSchema: 'tu518868lc391hrihvefsq0b423jb35648gkj6hmbkpej6qi7rf7l5j4rzb8cs2xrsaudn4udm7csbv4nik60clvz6zp0wamdhyvkxniv16a0sgeik7x2ek0emaixxb7qgd52di0kkg97vx4vd9ysvx839qg7isequdsp32ozulu8z55ihrluli5u91n153n32wukoszg9o61jqwcox3ay003vmaavwdjrglwj7ek9cu28vxiqa91ro9v4s0x34s49z3qy0b0hew2rsv9g700g04h3l9pgpntryprn8pyn6mf7ijtxfqi7e3li5bs9xq7mnn6mnfz0nyu246ksuzz0ailnbucmusju4wa4f87ijlcfj2ccbvnqn9t7is34lilzrx8l0m5jb3ha2y48aqsu9mesfgokiosl14ykfplesdhx55rkw39e4f6igpak3mykmqaf3nm79ilo8v8ur8rkn5fqvrhm9hqz716bsezjwbt6nuz2neu60iv8tev8uc6qwc6lfc6x211li6qwqomd0up2srgqmabh3i85ltymq6lfa3d7we550ec1jwvggq94vx0kd40wuvucsoelnqsjpqz9v8i95hol4jzrjgrrx1lh4bu4cfklnjfgzpwzbrh0zi5zwsikwbxv2ldh92gtrs5e0wfk0zfbwmtbhmtb4teeq25jgf55u4awer4s20mx8fxbmc3rkvznyxwp2p1egujort3aa7gge7bwydcj6cu8n7ypawxzds3oyiiaym3q8avmbmr49rdo2l2ia7fllr2l2w82kctt23ukb0q7h9wgovvf7vscp6okbt3foqz9bhr0srrmx75juz7b5mz086x9zmto39p6g4qbur30b4j6f3hc7u84he18am6hknrw20ml6g7icnftub7clkiimynmbgk51se9c1hsxs011lx1q2ohq7feqk75l3eyml5rxkwp8srb6c0pi7ct5gcuxe8e73y62c2kc3i3a46mkj94z7zotc32o9h5leqwnm',
                proxyHost: 'cdmzzmoleundkdy6bot1py2r2hc5yoj8xzlg9rrydeblzs6qdul9757at7cz',
                proxyPort: -9,
                destination: 'o959dsd9iex0z083vfrlyi6gysk426th6kpbi7zgbu7qtgeet94ej36qda0xoryd9vkhviw1o69hrx0muf5p1ephl00iij0izn2lteaj4fqpt305kzggc4y2diuqx0d7ad1q4bmphr0ajg8wl7j1a3peihjiuovm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '38np20nt3kjvuflmsvk1fb1o01zztauy0ieo8mqxfv1gp3hu9w29cpjlwyavswepyzemu6hrrk9ltxko4v2jzzclmkruwd1q4gva6qr00sru7fuzjd6urho3ie8s9upyjtk04j8xffpjvn05yhgvtfu13nx0pxp2',
                responsibleUserAccountName: 'r55h673asrl69et6q3sj',
                lastChangeUserAccount: 'puf05y34rzxrvsojzx7z',
                lastChangedAt: '2020-08-04 18:59:39',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'p56lnop7wfhal5qso6fshlv8itjl83qi1x74cyyg',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'h8mmgfdxbd1hwvwlgn6335v7iqs5eunfjo89ggeangpeajj9ky',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'uj3fqwdr761iwah0ekkc',
                party: '4zg5q35lby8dqbl2cxjga5i3d0fkwtjcq5d4arah8k98k9s99j4ol9kj6vewvascg4e6nnhjw2293yf82fwpdjnjx8g9hsk4e0p8y0h8dk38wswrh6cuet2iawnmaugpx4wjq2x5uezpr2nxizdir70oqwvdoqxf',
                component: 'zmm58oqiva44chvntt95zr9937x85mln28onil5ktk5lsuy01krj2oi1cggq5kvgacsvq7zcza97z2nrt08z0j3bit8ej5el19zdpg8bsg168jx2vw0rg1as2gedq7e39frcmqipn21js8i5bu36yphp2xojrc7e',
                name: 'q8qy01uaknj3zgkwnkmf3af71lawzjc9qf6wqynr73wjd3pkiykkvb4bd52hyw6wbszn8e9s2dc7w9ejq9n7om6belw6wx7906eax0troer7so1euolv98t6e92mjlgip04vw5aecw8sl3hrgeen53nfnn8tdds9',
                flowHash: 'z84tqyghbhtc3bx74tu1w3o5mpvzzqx5bedtuu8k',
                flowParty: 'qlxce5cj44ai6ojm1m2hm1wtliivqq10h39tvfe9ne4bxfzsh7rngcvm2a2v84x7431h244yie99zmie4dwsskph8a6lcr9h9q9smfgso1e5xw0fzjnqxp310xtd6fiaon4s91w8lz60nllp40wafdi8npgvu87p',
                flowComponent: '0xz5spwpvvjxcglf824hkb8btwabrqikgq1hvd5iqo715psu0lxe7l12gw6cn28ozpjlr569lte54fnglrlnmwpbh1fb6glimkye69iccj3060rpln160lu4utb37p3d72g62m203nn32qjcd4gak2cpkyy5xpa5',
                flowInterfaceName: '05mdygsc0zzbga7bdwk1mc3lpc6771v0fb7wvbndrus8zqvny2w2k8srmih4dg9z33ncy7tcz2y2oy61l8n5g0zmo6tfpvpmtf68wtuzopuzjb2p8kb6052eatkbxs7oj516emdxpuh1eocurjawik93e7g2770b',
                flowInterfaceNamespace: '72e2dzeiotpfxy1k0nh7r959tgtsfvo8egrg4jbkienoe92zjjhxr6rs806g0zzvaqrr8in8rscot6t0pafc9b3z3zfau3d5k75umnhn9sqmdoywbwyre8lygwo2ff2bh8l3r39qhw8svu3wa1owg5318od6djlc',
                version: '8bh9lypuns548z8e0ocr',
                adapterType: 'piyc0z43gdrnj2wfqnwtfzteoddvm0ihun5id0mrjri28pl333buot8c8xz3',
                direction: 'XXXX',
                transportProtocol: 'bjvk32nxeeagekrrm2ht5ixmystikmtadxzw2hp41r66ap9lmicg54r5ezri',
                messageProtocol: 'z63ztchovdxvwcvrodgafis0tsfmc9xkaerr9fut0vkht2fusli3jhm68jic',
                adapterEngineName: 'ekpsymyn04cx007368a1tuhkx0gzce03pqpznwshfjw2lzp7028ehenz2z5vki492tjisjrcx179ybtqx5dbx9wt2270d74y0xe5q3l38be18v3ys9rs2t0hn6r1e358a76dbqd69qtyr1wsim0mxbqffohqooba',
                url: 'wovrsbyp54a2yltgd05qrmep3wzbn78v9me10xk22uoodugypqgdgpcndobwet3z44krby21o40vgiyghmw5bcyfmjh2e2s3pq28bh1mji5r3lv55fgeh62ofc9gfnxaft41ndqg29ntmsh4lbpfvwl55o08m0gfrzf7dphm994q1xqdwsfw7r4it4sm4pqftf796a6csaem4wmmjyllvykg1uuzzion6k91njnxjwcgd2haq5akdb7qnztkq573dueyt7kp9po9ganlq9xhvfnwuab204qxmjtp2j13xqr90f43s1tggzxsonqd2edf',
                username: '6y2hcorifuqugkkaw49vuoh2y1w5slp55ci4es6k2m4uf5a9awih1v7ob0hx',
                remoteHost: 'gtomyczbcin21z7b3o575o7ulm42x3nnv4s2tz6qvrcstx6broctq6fead6ih46pwg66054d8mdkdasbyfl8hspgadwaxaqv5thykc8ss6m9jkx8sv92lkuibjpcan6zhcsmtbyntoxl11blbdj8u8tkgo5thzq8',
                remotePort: 5999447176,
                directory: 'myukl3goz9eff9vf604z4y1fovadh6siaif78hb1n4t04ywbm9lwir4u5r64j6f5l95ph6c7o5c0dld4zw12uvu4n39ilzkma0bdalepzyy0h0j9flg5vsufyx484d7deoyekn7dd4c26w3pimprm0r2a11n927pz0z5vam2y4h94o6dal11qp81dxdy1rj0pblic3nvve3epe5lzpxcvgurnm99lw1ka525i2cte8v042e9z60y0hu1d10kcjyxssl4dp7lnmsdos9kzu5nhbrclt0eu7gxbnb0moubnp76lkah7fkksvjjesbbz4sur12jvn5m3o8bb26l3ggmbeb7xj57k41vwk4tbxs1t2ucs9bhnv74q9sj9bhoapbt1cfpbmf3eyhc5nbzi04vyfittz0s1rw75is2g8m6pp0orva4fn4dz252a1c8u90hw0reag0cyaako0xphh437iqyti75v8uerhpi80v2si4xeiejonl65w09uhkmbxqbp4fy0ucmrhkm79qeo79xuwx616qsa5b4f77pogj0nexbazq7zqyr5hp3a16q01ww39zhm33uadhoqvwd909haw6y8rxpluwiyvrhmvwa48l70c87lnbekdxzey3tx5qrorsebww7hay5ctajpfmqc81xmekvyhhdcs7oeavumlopezam7i3hnfy57wmi1pbcczsaoht28g97l47o3qhmx01u05epxxv2c20smz4vmrq4dp2f8dubiiw1dta8deyrke6nxc3e6b2zadogyq4iquh4be17vgukrtos9s0lhz8c35a2y58epis6ygvj9gl9jhb9sxxru1h3w13mxmgk0fc0r0ucejd35i3rdsmfqe5xd6d005eaybe56xcmm772mpc5ls81r75zvmtpl2jx3n9qm16e96ip99ax9fiwb47de7voee5h73oc0jrnjkz5gzu2wg8a904pcc0880qpbt60kx69tsf8uommpm70oii0x3c7gi6y5w1j142vsz58',
                fileSchema: 'pot8fgq83f2ajkmt76bb0o7bt40wk854equ41dhl6rtklpzmg37hn3lm5tqeig27onchl6hwosh1cmgzecgsfe0hvpx0bae3czy3372e413f2bzz4klkskmixsgbx0c1ftix83wkda7uqkjowusfqcueb6vvmugq4yihtmu56jr7boscshmn4hsl6827uzu6e7im08mro0p1ozvmxbvwanuro0wrqyif5bojszq2py39067qc3cnu2ji5kav8lse77f246omszs0gwcxl444vgzt925poc59cwjzzsb2t8bx4jzr3jxf66luk6qju4sopqcza44fyxfjym391l8ue7i1lylcdil59hxqs5jopyytrd31rfzflq5uvfct7c00m8iusy2zcklagg08efqlwrp1df8yl3dx4e69w72fqbknajcsbpv5vdhgalnn9rjtmvxiyymklmlnrkzi3x2xwta5et4b16mgenbmfvg96ia40201nvfwo638jcddagofiz8fhzqg57pfoxojivcr367d1kusyfnuza04ldqv57sdsrkw0oklda24rcoc4ghtu56u4pluvvggoqw6bvaby78yjz8sdoavjqvxie16dv820aaur0paamcygjdt72fqylkbeinkd5rth5lur2gcowvaace99zn0r9w4cnxp8o6ugz6exdqjz5et2mfu18sinuctkaibral7lxaqxjlx8pta2eehxlgwo72t8v70h78et8bdpf9235rvrbxqa92dwf97ccbpna093n8vb35tyh5ej69kbrt13d2raq4s4l4iu7nmzofqke8yvbewp01gydll6yr7l2e0c27yus1c9hcjaq5x4p445qrps233vtrd596940fwjuwagit1bd4q15l0yx9lcsh57rk15i1oaq8ubczu4r5wh48sy8ok2t7q4hwk1aj167ur7x8zss6jh5tydsruerc8yf96p9jsc02yihgtbap6gbm77equtk6qonjavfeujjam838vyzk1',
                proxyHost: 'kzhym4o2ay8kkhwk45lkdg5znbm1mwa78sw4ok9zcg14cmrppb00qsmyvmpo',
                proxyPort: 8568049425,
                destination: '3205degyev1wzm6423r26pmadly14mndm6alq6at41iv2dphwv522gd7gjpoczoej2r40z8fauuxrc7be8bdopptm3sp48zyr0ww0ldvpl4b063fonzb6yc892ylgvwe1keebwzhl034elv08y9e4xjazsw5tiza',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e5xpmam04t07lv7g4jckdaws4ex02eo2rhazqi2i2o1lz7hul1c1gloo2tlxv9oluchuf752bfu76o33uiinkjbylhl4avgavcdok53hqvetvianq7dii5bo4cc0whxhvhofb1sbm2buokank8uuq0302tda4vu0',
                responsibleUserAccountName: 'wnip6t545ti5ftv4h68z',
                lastChangeUserAccount: '4cidvyeqmnyjfy7kw7wo',
                lastChangedAt: '2020-08-04 16:03:30',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'fjzijbtv2z2sp4iy5iwgizlbg7hhm4obtveclv4u',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'uaqj9tk0olow1klt253wmytyq3cebme2l9fgvf3t1en6xpkwxy',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: '4mf1p970ouvb879aadin',
                party: 'b49yq19et7mnks9hnc8rvwjje1nma5vzuzgtidekpczk5a0nbuznzftt7hg4oy7fq56cstkea0f8fm0tk1elx9stj2fri2xvw2uw2lki024ylwgxglu5xrjwgg5w86j756a9wdxyxm3ed26ltvjtgcrkvqbg7cy1',
                component: 'o4rv0w0xg8astl5w3nufq9k2nqpzmirbz0pjdv84cka8oh8so1brrwvoh5bltpmfuwamenjtmiexo1dmtidvep6tg2i0jivhut13g98j0zmv07xpzybqchv40d294zz4v1i378iln0sbu0hjemm3j13hdv685v05',
                name: '0qjtlmo301o0vh4tj4q78c4jfh4tckpc20rcu2e3yj6d5mmxdiue39ehc4ihggtc7z95i3vrblc5lkhof2siicaxrhus316fniy7fezkbyafh8zadkuy0a193f485b7aam7ui2fg55o7c90y5goftz4m9r7hvygy',
                flowHash: 'en7ypnm7spa4vo8d73lx1gyywiu8uk1zg2dram1c',
                flowParty: 'hlva5cmne1lyznc2ibghg0e25qawehov65qa21hl9klnenknaany27oqu506zizp27dvesbve7wcqkpcheenkzpmkmws1t8xegndufnlhww4j8t4p58kwqa0qefvogsr03q6xvj6kmq3jyg3tj4xmb3esm1jsnvn',
                flowComponent: '70myicyquxn5h2e2k8gsaq5hdznc0awzynbt8w2cgspg2bge0dn1wn3dwvin0buawpxo4dhdlz9268atafe4mo44blzg26k14k0c5vvu014c514ipv1biq40qe3qpmkitoo73qxxhico525t5b87u6uvjmkn4uo9',
                flowInterfaceName: 'z2vf548mqpwy34b10g8l7qrtpxzf3djkzivrttwvpsgr9vgk953f5gpy52wf50lzhigam1msst1r7xhk0f0n6yljc3nxegslm41ky0lck4ubo9g0qvpuw726ep9urw5cou6lf4fqd6baj0kst5kk3sia0n7awa0b',
                flowInterfaceNamespace: 'rzf4t0dfis7gukd37d1sx047xe4byn0x0t7s3tumacuua0wi8c8kz1bjmkjm4499i49uvzkswciaid2e8fc666om2plylovnv3u7jo31dbjph43zbdauhdibxkmp27d2qf7fyuvya7vvld3tq0m8vf4tpknux9ec',
                version: 'kjlsp9k213f0tpnloggp',
                adapterType: '7im8vqgomgcv1ewp089ea9wdubqw0hjipkmv8clsgh4eyimr6w174qx2l3ay',
                direction: 'RECEIVER',
                transportProtocol: 'hu4ne1fgzdq1hvr24syftvc769hoj2iomy853zoh7u8f6tl8ljrh2kgz33ia',
                messageProtocol: 'l120459k0mldul4oxi3ng6eg3xnl3qmkbdp4c1r89pf6q9xnus003ipgbhk5',
                adapterEngineName: 'cir3wlbeac6hjanj79huplsytva7tm8tlqjw7thu98ub48qysnpd2dufwnh6wg2yg4bhngmt5s6o1q8h6mm9voy61wdsd5rykajw9v1txloqg3delqin4u2ee4uklymzuo2irj64u03ijlt57bztr98khg4o5vsn',
                url: '1o9d143z6rja0dqlnprvu353cebbvx1bs9czrsn403nuz5a5g6p7v5shk7r36r6g8nyipfdfi8cvze6okvlm77cw428xcox50u8emdl7wdkok5h3sesoxmz0cp7nyav8so65wsxqr0smu3s48u37jhqzmmsxclzvkw4gxgsy56m5w7oukjr0p7r4rfv0zg07a18sgsqwmgbpsf6dorksvmi3xch5u6hn0rmpacjmd3l9zud8wsx5i6gfzhinlizyu5r8tjg77osl2dd1ynl49rqzk9j49jueyopf3n0nspwghp97rsgl6b9cc9xxexbg',
                username: 'yy4ule336w0yj1q2il0ge3s5lf4zh3fjcbyosplr7f7xnmcot9en1v1f98sg',
                remoteHost: 'vqux1lrgoqhko004oar71830feze0uv4kbrecpby4x8bp9xv26z2o5hwdld1ercgh809nt7oakfhiu3t8m6zg2djd1wbzq7hak4bp5rg0knx2k5w7k1t7g90jpskwybiby9ulouwnopvh1pntz5nnt19n89vog0j',
                remotePort: 8738211562,
                directory: '5qwrd8xz2xw0mgibsd3gqxiyomz3uqat4m5ypwr8799eg6ftjqth6epu7n1vo3erz5j40aqyuz4ymmphwgedofz3z0luz9i5cty7tx8pkvhn7074gai20coqtmdv3lmqka8ogtgztsn6zj9ms9b7gkw9c0jma8isbflmzakzula73w8xvc25i9bs7frbuo2cl6bbj9ix0z1nk8oaqjj5mxvtaw251c0gm7dbevmv9m5sjscuczqg6yfjq2mcqajpnq6yp6xz6rpx4vicukv80uu9uwnh6w9gh2s2n74prl45jfbzcypbdxbbxgnf0o56r0nrute1mxiio2m5l18r7bjinhq4wicq78h8giy17rbbbvr9mb1x0cb75l4xp5tsfgo10xa2ez5pzdge31e0myu6clqa68pqyz8wkd258usfk7flxeiw6bu9m5vdwnfl8v4prok0g8h74rsqceupyuod5lztij3k5ss92n9bxnbm85p8kfbmfr22srwc984yowiqchv2g759942r4zxjvle3yreun7j01c0deamoncp7srqwz3uygrq3jsao1q5rxl7ai9paxgn5uxbhp67etlcjhuj3nwxo8uuv7a4jqqf92z339gk5r7qe08i7o0jo2vfekn3m6sbyhadu6aup3yzjmeuvl9vu46hy4svq7k79d317gdx9l5g3a8kce4h1gl25xoqjnstr23tb8q36cmtk1nukcnfq72u414z5pxo26onr7wyk0e8m25rg0ryfxck8y0jyxyvy50d14c0u2mzf99jw8bz7dtgl3o4vt9ct0a1wqzbc0sp3h1dywahtyw3ccxj9e4qroybl47m9j3yaz3u6h4p4q41g9zw3hg7gokl3q0oxc5wcnz6il49qiz0uwhxa0gtcg820ucyx2im99wj42n8wrbacwymbz3cm6yfnkqcxg8wl2sygfthol2so3y0vepppsq0t0ctvzzt5e4f4q9k9ico1ud29u38wfyn2zieo9cbwugi8a42s',
                fileSchema: 'pe1dr0tau94m1i0l526zclv596s5dvzvvz4eo7qey297qshtti8wfpdfpae9v3vps3ozicbm3eafgp9wx26m6yjk0e0zkozdg1hsa7tyefjeqljep26qv3xavdgj4fchltagjtr3yew5d77kaikofzpzgguh5m8mlmzzua6w9z7b0tei9el8hkw5i1u5veyt4zacx7zcokmc8y1nlqenmy44r8rl4t65ib65krr6ro1o9rfehpe6hv2kc3u8qvcjy8hxpofkrzy0ovzquysc314q45ulqvwhe1k5wzw3xvrmlm1che4masg9mns752s3w7meldw6os5fa02z9db67qk24038kxihzihdj0qzbli6syb6gqfv1uuxpv96jnhis3ckfsbkp0431sw2p73wz01wdggc21xjcg54wp1vj2nz9mr9s3miaffhksz3vxp5rnr6mikw62d0ksve6t3pc6ckmvp50utw3pfwm8kmyu1tuwyamrs7zjj4w5ee1crbmtxddox8vbciekawh0isltzzfz83l1wlwsewqs25u9u1wffz8y7buhskqc4n7l4bvmc3eydqpkv2evocldbh601gnj6dsnyqgk41bouzpe3gins9r2aou1tuym6oynlvcixxbeeontbcslfcacmpmz51buffvmtb7zkyx0vw2l9q00kulk49bb8ll8n5plavz4l11rpn8m3c3eo89wufw9fkojhay5cx5wqh3tquqqmt9invs7t1qvatgl9f3ejy6dnccaf1k9iegroriq9toekf0tqx0txh0xkyntpsdy6uwkmhpwkvaumn2hmdx5if25gm6bngdxvxx5fc489h3dvf1i9olxe1yeta0tnrbgi1szprz75x5l445ma9dikbivc67s3n3dsylk7cd4gi186o2kan4dtyyinnb35yzg1l7r5hr0pvwrw5phta29co5skvlp1fjaxlcuac9ldyehop7cn5s3yjmmnq2u8q2iszl03hdx9sn2pt8ws0c9ar',
                proxyHost: 'qfhpbzf5vv8yb5ud1jccht8xvgjtc9duwv8wr9htc7bnjqxihfswyh9xx9yo',
                proxyPort: 9551216694,
                destination: 'omolcq2oby6m63vs4z3yw9qz4b70fjwcm3i2qvgqprlibpi1lh6a9d0a7nm3bv79dxbimbtejyk2cwkdbqwtitavzonhcbekw7hcs1a40x29a8o8acs0nenc3ltw7qgch5wyttyw3nxfpq6086z6dd2p09ozw7c5',
                adapterStatus: 'XXXX',
                softwareComponentName: '398ta5zhtuc6yqewxkb4r72oc5dzwebixxcjhworoim4xzf7ic0vbdmzkphyzelbvzbu8y22stvwecvap97hg2qfoxx6rdqxvqg4a92hxjbduc8b5zxx36cjo3rn4j5oj14mv5l1wtw3iej3ezc57noroo5v1ml5',
                responsibleUserAccountName: 'apa5hz3yuymabtmf7bvo',
                lastChangeUserAccount: 'u036tfcuph17cqxy0hzc',
                lastChangedAt: '2020-08-04 12:48:31',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '23i3wkbyz710lkqfmn2zytnte0xdz0r3akx305qg',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'qyz1g8f3qoq0ld6h5bmr5x6p9wgj815n677ozcljblgsoejk2a',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'krpvxhotor46ahhhh3b5',
                party: 'wbi4fokm5cnob39kvrr0qzdg2i01pj9g29x13h6ilh13akblq3hsyn6gf9p49ag4r4z98480mg1fpaamo3fekqeeaqin2mwqqoe6994bqpacopob3861bp2g3jtv55ssfd5a1nxeu9ibshl9qpln62vw0i736tbs',
                component: '43iyfyeywhb404qof3nxiy6b92nfl97vye8g50wuewicnpldvi8obhcyuy78h39t3ys4ot9m9f0p8jbgi9tp6i8j91fbm837wcly81269nqbvv0n12tu9me8cb555t2x0gi56b1sv00xbh2jwepy7yxs5xf1t82r',
                name: 'hnhyegrcl4gsrogeffc65zw5dgq6dsl7lled0hos2pkzrbwv6eh3vqvpkwkcbbs8tb927d92o6bcbowc3yj6wejr1ct1n32xm5wx7zs49c9g32kqott5fkl56i6ozi063s5gnznhl0ol8spmfcimw5xtmso28x7j',
                flowHash: 'cs26ql89j5m4wtel8hejggd12eaajn6pljy2i11l',
                flowParty: 'bfz3uyf3ugyw2207kbeggvpbg9kcs3uao7m6b013nrccdkq9z4gbap98v63a82g7kuqs0t7qmt7114ev0flcvmshd657m3xl5ebkdaltu96lfyx8qshroxnvp4d0hbrt1vwytorqipdmlo20e64kyfvw3b5ua9fo',
                flowComponent: '45hobgcddw85uhf4zfw3d4fnely6tb2tx9aq45cpyx76oz6oskwc00aeqrbtdlor21h4h3kp863lof8b6ivgd8dmit1imssbowpi4vgqzfs7i61fb44tjjpykix2hpq50swqw7p3sdmm9w9mhz0mu5ofud45im53',
                flowInterfaceName: '9dfve25tg7o5ma14g0hrimri6an9kaubr9pz8qxaf4symo3ofyf9ykwcr0ppfep24tubmtnrizv5mtinp8qzhic70jptfdmm9szqyjslx44un051h5wg63mxnja49va3cjhlrt5mnkntl2nepdvlobwxdm1wpyv5',
                flowInterfaceNamespace: 'utom27r412r5c9gz3weiu35l0fib9k4ghr3mch5kvvqrz4vstt2yje2eylvl065h9tfinz7vjv3c5910yql725j5jh73xggquqqis1cv7l688pvbe5ozkll2qqqd3xo399g7nrtwcpmu7yfannujhw0u6k9z1buv',
                version: 'p4fbju92y6xo1o4syxrc',
                adapterType: 'wfmr13uek32jj66vo1ixvrnjdg7t53va0ay0j21juagz5uquzqnc1zsgzwg1',
                direction: 'SENDER',
                transportProtocol: 's1km907vd4xn93e0a3sxgynv6zh15s2nzsl555jz602iw8enzs2683xnjftz',
                messageProtocol: 'v3lkyorgqyhe1fi702e1356jjfkxkwex4z0amzjkj7p48cw3xbeqacc02vz2',
                adapterEngineName: 'wigu60pj15t07d22f5yavg36nj2137poj78cg4llh54e6iw81o0kay4vpw2njlvheh6kcusxzqui2jihp4owrb22w51tmjajiwd61e6oyjwnohplhc4x0p6vz85t4gvngq9qiijhsg5dpbjljkbtaujjtcfpu7bw',
                url: 'vbx4paxdf6uvzvqkgmo198f32iptbjaxhaq1wl2v5twkbk96krs7k0tjsfneaos4k2jo1hnpxa59t9g8bgcnfbbetg5jiv9qmkd90b7qyfzz2jd8ewz58n92g6j4me9ez0b57gs5c5utcjys6l22vialrpclel5rqbg970xretb1170wjdjgypbc7kuc1pofl2yju13c5uxl23x4l6b86s5271n7uxfukr8vm23bxuns96w7w4nq4ytvr8kyx4ojz2tov55n1iay7wbaj6cq7yaigpvdk1peulmf4vqmxm3yebvdzw1l2smr4450z22m',
                username: 'c2cm1iiidfpxv2yifm3ug3fvhm7eocvc14fq9fcfvewv5ovogwe1rrdcaqgw',
                remoteHost: 'vhwx82v1d2u4n0g8e3kix2d46tqmb50mlky39xwwhhh23fjg24wruc5w9y59c08ve5h4ny004vqvdfvt7kttzk1u1qyn8m7azfmbnxjjiw7uhp91yd46jdlzs4v81daplgl46lpjxx7w4ssh9xng7kps7oxksv9r',
                remotePort: 9269603338,
                directory: 'q3fzx0bb16a47qq7wxptned2h0qdifml4ja96atrnlqrthhdvekw3mx2i7k13lpou59hufehg986m7gzumngclywcxknnmu0h5n312n3wcm5zbhup01djusfm8xqw5jc0nkmczvqivm76dmxbg6f2p50d07dnhhe3q27xvllfa9kph1x2hz7ktk5b9ex9zdtd6t7dpyysfanrbuyx8m0jntci19tyttkrr34prhh075fin4ly8nqywvkxq4ark5ybv0v0dgvzjhz4gg2icbr4ic2eigb1heidvxb1v4tj5ocb5de82kxoie163yadiooch4p4w823hh9lt7rogg4xz2n5d6ihmsakx66a7e8z5xto1vo8kfwnk5vp86jsb9zb3nz0q7t6lsn1cjoyq7huopg2n8me13hwjbgqj7n3bige9gtzomqydmoms1s47xxh90r3uuthx0fvtqh58j61rhy7dbkwaxr5cuu35quvux6lgo76lgqlrbseswxk7te5731uq9u4bgwps08z9aet8ylz80vipdl8cebtht1hyy6zeldiyibau2mtlt5jh2xc4sm4qcdr7ngl8xa9hve5635esyq4a14v943px3xseyywdffutvjha36jxdlx4nwjnsj0o6m5zvuodnzt9cncvr4mnzypbjoxm1b5j4xl3wlsryfgdksmzoz2fkhb6l7vdzd52mfthlkrqwyhdtnushsnrsvsbb9jar7h30ia6n5bnm2gchcpz9mo98ex06okos9pehblsxl9xlz04ciitrz585gvt1ia0xn0y4lvrk0ggg5koyd04z0z8bvr4f9no40r5u4hln9j4xic089dazhgdth55bdg9cfy9zd4bmob30d8sohldziqlblx98rnysdtryibl9js3rkvtvn394vhxcmai4t0todg2c1hw53wp6wnwu25xylr1y6q9o16bcbf3p2ribf7h7fn43mxyqdtv1be6zsvvilta9o2riqm5v9mezw0ex0r1zv4k3e',
                fileSchema: '7g9gupy2tx2tcgke1zvmg2tqteu1tlt7s5v0ekz7beqixbemtxggmg5985cuhr7i8ccsjje8mwxh5abed7czryoiya6qd3c5rgshs3jnx5wpgfi1o9cw4cqq8yk1v468gfjfs0la3wilqor7lwr86yd4hbom4ggqazhj9zihvjs5nns7wkvbm2kwht046cm30367wqn9qqtc0u3wd3e1snf94y3knhj0kwwq9n88k9r2n22f4rdzga8uezaft1sjt62n0eqw01r3bhvfc4bj654u5tsvuf0gafbryrr9oktcixnj84c5pk0kpezs36doubxeqlnvdshuqxptxzwolwltnp8ngw3tlf095rezn6dy2q00607tzmjoz01prblrmkpj2hk9t170q6wcgjfp653ar2rqulzosh6gr3ox607ak4mjlty85ki536bv4fbi9g32fef103y3zl3jhwpvpzzzlfun4se6j4kliqvq3fs6e1w47gt509giji9y1z05zhz791o6fznqj46ge9qfjr5fbntjvym6d7re3x0um33wovlappjpu49ltn3i1d9w7u9y6nhgtlt3l919678ll5xspqfj4bxrk0tgss2we2mncosu1429guxy4489w98n19i9ykn4rosssn3ho35lnogm3et0zkjat7g4hmfnwfrnoyd6lelm7sau4xzzflyswz2qcl3uiu0qge73bm2okab7dnnll0kti3mb1fqci27fbyhafjj4gy3krpnj4an2asbogx85ybvdzzmtcy005dbh4ht3wclwtk3a6dtt9p9c5x2od0alfm0t9a584jg5j9qn694d0n09fxh4loxfg1caog2kbhyax0ugpr1lzkjuldgrzjxo7nebsxwvmfj2alxan1wvgzxqsioyutidtilb37mc2fewn7xvwz2dgc3ehjg8thcqs8t4lz7rlbxrmt5tiuk9ivxh5y39sr82lcsot4ht6a4a6oymtup4j9m49kck840191tot4ho8c8j',
                proxyHost: 'cc70zpnkd6e69b8hf8a9nvfp3zijvzygo2eef5x0bctfycea0x31scs369l4',
                proxyPort: 7702351536,
                destination: 'affqe5mmzrpihx30gcylwusghf27e5ttdm2q3mvfx6z3eegw0yvkefx6dw2poczngty7m3n9ztsv754pg2sajbf6inh5f2rwn6d03z27bc8zl1citu2lruqjwim09nl8js2rop8fuq45sl0u21rxvtagqdlmwq0w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kcnx22vd69pze2116fvhm6de78p91nkmch1ky0dj3v6b8mi6kgrhh4ubdpuxq9fzioijp52j2q1pqtq1rnthgaah6q2v47lpi9culsiz5rpxj9v4ukeje7oupk4womffpsd45aos1whxmaqz1x034dwgh0duyyf2',
                responsibleUserAccountName: '9kq2jos25poqwrupqhrs',
                lastChangeUserAccount: 'azeuban2o6c7pb5ykju1',
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
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: '1uydngt7rg9sdafub28c8x5cmq28jgsr3s52tdko',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: 'vav5e2nkjoig3bmhe06jgodg9tv84otcey8haehjab5beh9lc2',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'vjso2xgaq9521vjn8ezb',
                party: 'ussq4s3ujy4q73zrcpd1wgzb4001wdj4aic8co1ey2to4mv1hyflf1756soemfgol2zc056szvvl3rypw7qr9nzf5l5zh0hdmvuka8k2a35i45xphfpf3ao7ibmaqc9vi11r0fb6zuktlcxg16pw2wtl57fh4vwx',
                component: 'm3mnnkj3ee6u6at3g0pp23fk32loeqlv3hxixnb274r8nhbmcnuh5zk2mxt675b09a73qopqtgrz3hsswuyjotwceobm888c18olr2b4qg8o7jp0vd1koy6z9a08covil3cyxmmthsw13xgmokbzgu6xe5dg3g5s',
                name: 'kku6w87186lmij1imatpl4rsiqflj0rujnixbuupvogs66vag2f1mfl1t2ps758ga7m5uyi26y0072r36rns9k28n1xnpjcrjdbgb7nx7y21ad914rlilzkhbb359x8x64d8576b0e4qaphjwy7nh3v4ct5pmb2s',
                flowHash: '8u30hi8m4bw4144svl2mbhq7y8krlp1cza8v53lv',
                flowParty: 'dkkbdc6h2b24a5sgdp805istmqpoh70eraspomgfqyx5lcx1msbr7mkld8c6z3zckogyz3bfqa9tpw79wugcigmy0oluattkth4o6woatmjf494y8utnr6pjod2uwxppur3p7y6c49wp45uzah61y6jvaz9qmlcz',
                flowComponent: 'kmdlu4o02ngk6yfhaq154qxys7wrz79gh575bnrwzvd0qo5edpsxi3c7etuca127wev5fyk79eookb9s1dtgqodf85zpog5vwix44bnthp0ppfbvtszixcw69sq9wx53uz1tb9v8uvhk241y609r07prv0julmep',
                flowInterfaceName: 'ed0hmkh3tu4hzt8d0f590dfnnau0yw92hlezzrib358ww166bflph0h3ukbp6l23qvicw9pphz3iirxvzvr321rmr18ci0ehoy2gszt7e7nvctogndxlj6hoouvjrt216zemj6y8t9rdmf8821a3xf7kq6k5n3y2',
                flowInterfaceNamespace: '3vw3qf9ptftoa9teo1kanif9gombhn0jsbx17jl3bw06739ly5dp8o34uv45d7qvq0j4k82to8kh0b0dqwt6yas9cnv23a2b16joizbvc1l6oh48d2f7807wugj2pt5as4vu7b9vru72j64ofjfwq2pyr32lbp7c',
                version: 'mh3g6l62ugbjoq90bmzj',
                adapterType: 'da30abp675j2it1yfn446h2xxm6fx534ddq53i95a77o36ztydcqo6lozvnz',
                direction: 'SENDER',
                transportProtocol: 'n5lcafwu4xbr0te2byfyf67emsm2tz9s5y8rrdc2me96lwmqpmlulwe0k3dl',
                messageProtocol: 'am9dhqd5qhyvkgq4slfmplgjrawgo9y6kr1ihoszx6yme1umhyrf2r0cc5xz',
                adapterEngineName: 'ujvkyrvflbz9z0bvgpccfccc14g8tkef96k0un7ryv2hubz75mw8akjvwmtc9z2ef5ddvmxu7uth9adgghwgsuflysdu00rw9cvbxndwjag6i9o9kw1urnqc48p6n8cez1w4yla4u3ivlfu4nm3t3vunv3jjf2zq',
                url: 'sy2nm53l3ja111xq3edfe0wcs1h1m5d2wqca5l7dlolwajtyf8f8sqzuub27dkkreimgoic413wj8u0nbzccmssqgiej2kpd325xg3kl1tovn24a2fnisi45e0y6y2oaf6taixgj7z16bb3g8vng8piz72f54ori4ljjxgi04lgjwusr7t8zznnndtvwkqutiqwcbrtw9bygghrejpu33k5bit17n0j1lnjxlkg8xo74nm1m302vwc2c5cj1ab1dau7oijfr3p4slnoigkem2iv4t31idzp7oe18ywugadyukbh4ueamkut3stdt3jjj',
                username: 'vi7k6vt5rj69410aelcuehuvwksmim8eyry68rrj3hlfas7b8q0vp7e8oh4p',
                remoteHost: 'bo8poyw39blwv4r5midzw390nrg8s1uii2zih8zei97qq0cbytygwzlm82xm7k1ya9xe65vxii7ajstxh50tg7svu2r7h36bsk0ua13l5m1koxfmo0dpttlgsgftf0mhseabx3csroat42rolxz3w9fi2z13pb4m',
                remotePort: 4137143178,
                directory: 'eyg2m8wwo23x27fmkizuz7gnmakvox760063dbqyuxhp5dziznl4vxervxefp58i1xd6t00kda94f3tuomuczqft920oq63zcq1nvcuyb63nqforyu6yb1oq2vw1pk0w35w9mj4yf0hnve7fgc9gdz5rsw2nwhtu15fczseje42sqd5cvisycpkbi8ym7fle6djbx9y8bgbflxouevznjzyzyzoygx3druvtl3okbrwaey0mk3aptsatadivb3ywc27b9vqucexx9bb5tmjdyem55fian0h8ecwg4nclgztwg41fuowk6f6kytzth13xd245b5nyurddy1c3srw8y3z878v9w22j8lv3ddihcx7bderojjrilul45br6zim33sb1efs33s4k4gy5enn8qrevudvvdq3sxn1mlvjxtu3zry2ejz8xy3o0w3do5s1ch299m9m93rkvolyytce71u97g9dyrlw0i6jtc0t1dwuwtb8n8ayx13t387cjyely2xg8q6ekwof8axhpu7kjqft0tc2cxkihzvql0sp8jw5tzttwhw13m7phn8a0bwasbb60cgtcwnk0642eybtpykeo5uuz38sxrfuxzrwx4a8iky1wp2roy51uxywflocer8yi718ijnljnlkfuyjioi8q9lzsrddppxns9dfanfwuzpkzaujskt7n0fzh9nvxe827g2s03dwgbnxmd9fb16tjw2k7zykfdf32pch6k3d9jms5ze19bny7q4aer8srbl0320sgwvzogalpy0npy9ngdhyyyb3u900qcm1rcbg51kqxpdfdnzx7bs2rgggg9w49ijjqpdk3es3rovcd5wdvgsl40b124mqfl4uva16fwjhhxl8wxw5gzlkvo64vde3cfeb3dk2dkdqiwfe4hhws1xt824e07ycw8oz9kdi282886phhvzhuku0560yvm7h2l630wukfaieln1o7j561gden6pecgu42s6ljws7lchdgsl675mwf0vnbayaz',
                fileSchema: 'q33fc10ktbz545uwdmtmdczhhjlb30piftwgdnzg36moimm3mp427w8fhexlchqkf6gfn9h5ulgwc0k2qw03qj58hpi22l343oarnr5o4dic7qz95wyfp2fphjaoyol2zouzn6pz1nqgh5kogewgcenyrko3dhc7lber8tt0qtppmc22vo83xt1mfxcxw7qf78n5vbarjswr2agmp9psk6ed2cuak28u0cdon45lok1ydioupr0ton9nprna01p1txclc2b0q8a7um2lno08eh67lka9plymkht1s8cfpmdq79vnp6vkgl9xw7yratrupk3qlbk5o525d3lgkr9svw0y2h4x7vkw316dc2x334wxvydkkauxylghq68qrry4v3q29hbtlfh8r0e3z3vnvx4f86d7n078wh842asmdmaox7f9qhr50fw71r6yi4gu6w2fws3z35632bupcwigo03lazrmt9v9efkyqmuuc9yin5qavh383nvf9fhkgu5too3tbx8sdxx8ukmvnfehkd97ru28qlccwctf0440ystexgmt1mpm2tp59ap2ug81puqbvbhbeoncyu5nb4a3c64ax2ww1nlm558afow2whltjtuqvcjam2ibp8ha8tsfg1vv5avsvkgj9h6tqxpa0a3kd2qk685m0lt8ahy8ooob02nqrrvqe2qnsxfsdmqci3fmqaino64f5di1oacmmrojrtdm4dd9ve669a7lu166fta8xe13ibxnegs2vrm9kgj7y3j8w3r3uc6bp0vyq5cttmujpcumd1osvpfe959gsxtkb42amlyfna4louiqu85topytgaahoqtkqyga5wsshru4lxhmahjv9nij4vgofnt2v89ltrxqgmhzs6s8tnw2kkrbm6azaypz77d9ogd57vkgpfdzv0wdgshpx2outvz53xdphgtyv0t236a5g77m28f0opicz9pkhov04zbggpgl8gh00e4ji2cnin4psmiyef43mnvfzi1nvqsh',
                proxyHost: 't6jh8zkhqxhev09yvimdd9llqbf5f829gkj673ix4lm89o2ta1u0jk222wqd',
                proxyPort: 5733199552,
                destination: '9ec8k0kodw0dxcvd88cw16in5v0ualey1u8pl1lyc1k9a4lyzs00dwc9fk3yee452go5baqxdkl3kas72dok4jqgv56hpm6s3f3togou6swmb48pbibomv3z2dz4ktt85cwfqyahuwt91ie3gh0cfmcrwrx1utoq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hu2uiqw9wv03qfnm8724z7qzwd2phdfz14vg5kveupcsitcpmdh4sin9zcl6k1ynjcubf4ge81871x42o3mi5y5h00dacevpslikq10k41irp4cq4n7y0gmoi3nru1zmj3l1x0nnigoozej68k3ne5vo4k2cctjt',
                responsibleUserAccountName: 'eu1hli53nmcvxk8f09gh',
                lastChangeUserAccount: 'wk7n9cie1gi2s6gah5kv',
                lastChangedAt: '2020-08-05 08:43:51',
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
                        value   : '2705aa58-645c-4729-93dd-dd71e25d6f2d'
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
                        value   : '3dc33520-4cb2-4278-bfd6-076ed42bf026'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3dc33520-4cb2-4278-bfd6-076ed42bf026'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/6197bd0e-991d-4566-a038-bc473b0949d2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/3dc33520-4cb2-4278-bfd6-076ed42bf026')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3dc33520-4cb2-4278-bfd6-076ed42bf026'));
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
                
                id: '7990a0a8-7761-42ac-ab51-2b0498727fec',
                hash: 'zrz5lhggoadj7lheb2whrhd798y3ldow4y9c5mwo',
                tenantId: 'e1ab1f87-f700-4c3a-8daa-6f958cb76592',
                tenantCode: '7er0qvlo3ej8w355o64nejrbnwhulkws0e2gnql4de1pdpnp1b',
                systemId: 'f2544431-27d1-4ba3-9e60-2cdc2adbd066',
                systemName: 'noo9hsgcse6v27pcsicu',
                party: 'f1yi1a1kbk7sf80v6nskl493vcf1495m5wbcd7pex5gw7odjraclfse4m89ovek9nb485qu3e4uiivz68277xz14dhgnbgvpfzlp6cwr1ndxj7obrenaywitcs163odgxfpbw95e2tzwftk130ovi7ehey7ailh1',
                component: 'hup1qw7pt1jqxxfmqlp4s4e1gtawkw2dk0apqjefncz7j7v3v1j29vibh2j2rrhpxku7jqs283f45o2yqx7mpv3kqppzgt8omvb7a4j5g989set37xc7nmxug6ip38wh2ifhx6girl4tsb6cl8xa7tc9newvwbcx',
                name: 'jrwji8bnwc7tcfwkm5u04fj158ihebs8j7safd4f0hgvxjv1fspgplm3194yoct5rhgqnnwc21jjyy8qky3b5hskne4iwsjxky0qqcslnjgegms6vedokuk2pf04rycj0rpfx2an5h745cygj6t2bty0gaxa2gr7',
                flowHash: 'y57z7h8btakzqyga8dshl0dyebhfar33d1m411v9',
                flowParty: '0sxssvipgcbztnckubbja28903vmjcr03np1pnv7l4x4yv6o6hbunus5wc1sjeg0fzfigvj70qz4fr7fflv87hpheydpabizhgyjtr1jtbsefbkog73ous9zowglhv9i90t6iymkdgxo7qsgj52j1z4o5qyrcqs5',
                flowComponent: 'x829cm51dzqtiio1ob8f2sqohp3ewnjjd56mrhmpjuicz5rs7n3vwovhecsmk20okig4iz5gy2ab6qshq09phov9b2sq10p626j14qecifu71gdl26nhdbbclxlfhrgiy83kgom4nfm0041ui2ksgsa83qep76s2',
                flowInterfaceName: 'z8w3yga59ewg4l4om53drkvmltkvjpvi4uepc8m7nbx3rkhe30prtd6pxoclcsjzw0fmedxt1m9ob2hf8uzt5qx8p47whcy0w3anha6t7dgmzzafn55ff2o54if3zxi3edvyjrrsthnbbk7w3jqeqhfzjnmqjclz',
                flowInterfaceNamespace: '077fe8th0svqvlvysqetlg0kztnc5m0bcuiymr68ezpzl4flzyq8mz7t7sncucivoh0j4rkj6lh55ivwxdbatvlrxx9gzmf1zifkmnkl13lwqmuld9hec3bau0b8m06ojuk6mgx1b8525xq0bvgkgud6uet4yqx6',
                version: 'uj7ld76fv8nwwhfu9gsq',
                adapterType: 'ih9djbm3tj4eb8vtmalgf6wxry3n32b45kdomu5qqe33bhvyih22qu8leouz',
                direction: 'RECEIVER',
                transportProtocol: 'odcdqjvdti5hg6hv780olr47ppkf6rjfd4z31k6ltfdmr7kqjcsh3jpyp11d',
                messageProtocol: 'fyy7fdg48j3kjd8keb60nf5uyx8grdtfiwhbyd4kta4opu09ke7ci1ftgmp7',
                adapterEngineName: 'xtj7l5w7nlz234pzvfwh97a2pl3snldbtq9geu5n18ak7n7434e714r7ut3ftqxgq59rubpxrfv1c5722z5h1lbghj039jf21txlllmfb3ozkhdcsqpidvg852dpbv9mddvwn59liqutxff3y5h895lm2osylwvx',
                url: '39zhsbja0tmtj7o9rls312j5zljiajktt9p0y9syc4bn1ki4mfnuh228ozksfc7xo8zj3tmkp3v4kj7g21mk0gtdzn0vs615yr11cr91jkfkbdkr4ny6z2cdf9r2olqnmdt996wnhayrtmenoypgvzmpt8b7zinjh3d8okfc4etu5a25t892qz82jee4wgt5ueasv5wh8z14l6jl5bq2jb8qqmcbqbku960p3g1pzki22ahlq5qbak4d06yune27ttegdf129atph1bbgtt52x1f9c016awj4tz3ml6exj7judelpl2lkcyxkfo0k3rt',
                username: '877utrtcdvsd2vd85jbq6vl0rk8atdyrspo849k03dlkhi4ngm8iggnjbb3d',
                remoteHost: 'i7pzns88i1nofbiskz0cypkdcz9c9d2tuipj5vwor8gj3nmy7pcgjlxrc2pj3vcoxo7q6s4i0h4gamw05rbnwnjb1e2hto20ofuqpza8ovoby1ah1lm0jb9lhv53ltmpz58ux2iwautnsbbnwp8vw3a21vsjaiya',
                remotePort: 1688320562,
                directory: 'hry79l2p1m5387ybdxf8ttyk1fgnuaefhnq2db0ujb9bh8ao8y0aoa3a59vxuspxr5pg3avxjgi0tngfcbg7hom6ue2ga0ruexon94ean28yfol3fi6s0t4m7epk4i999rxgs1thkq0qhgfmv55qjmw49co2pe28tqadz55qkqjfr5n7hof88idy2bjs3dps7q6k4zs1yu8o9s87bga429hxntbt83v45e9a6kn2okmpdma35rr0wmatn5t8hb2leltfg6ldx3btd1x2mlxm2o0k9tq11geb6d9nsghqrtjdrenqhaymvp3hhb20iju71j4j77uq303m5pxfw8jruj3yrysv10ctyfgttnwcq4pm7s0smrdy62nefk90esaw021jdhaaflvg7w38gg2x0c03rrp3afbjwm1zeo0tlxy4c5l9ieb2qs43s8a0r6ri83lndwrr27ilzir5lmch0z5rylq3y5gzsd0zl9lltw0o7so2ncjbrreatbnry47o1d8bhjzjqunl54uthh5hxlp3jz400whdkueqy7iuuckxgtzqxwlgntfr8bi44d2f5kzh8y04ovyuvle9qvezj046xnynmkkmscd5zfpgzvbagbhww8cx5vdbdbxi8mhj3vo5ze93f0crbff6vep7ij5waxgb9v00t99r8ae7fkk922u5rt508yk2sty2f7arc3ihrx6dg3clzcjsud379ap395uw4es8cn4zrucsix2zcd6cwd40hke83y9rcvecd3c5pxt2yb61vfq6mjcz0giyebgf6po5vzr0bmtd0skohw1dkewnrbgx2ulvhaaa24c047ucom0mif3c8p3k43cczap1ahkzt6cwxvmw0w46aew6q9veoddvqnvxbthf6rehfa9i7fzo9bpkxuhqyhtnm9r7mqyblm58hdrmbg342oz8vosn38ah4zsyyndyuwdvh7a3sfs4uhizsp25mqdnkdunhqlzkhrc2y9jv4wkcfrxjwy6fzv27yjz5k0l',
                fileSchema: 'cadj3grqqkepk409o5rdjthoekkol6m01vw0m83vk83j3dsw2iol966exk6m9f8loswj0gjxjszhpichlbstg5nn2b2d9m469t9xjx02swopgd74asmefz4ufhfw2oxja6jd4kpot4ofybyohq06y99ow00yp9hsgqstxbxlf1p3qk8dbh2y3007z1dkoy3hfxrhatbp11qm73jzpinc1z11vrlxvx7kylh751c64tb3h9qcux0ghaez7i54ifxma6ph7jm9j951s7kso9i7g64uicn4h6btlmw7r3x556io4x6zbqpp3y2x99ne68cke69royjv935c6sa05bcdw7b568xcfvrhhukvjgr8nuwejc7h3l23awh2aqjq3sv1knhe0tri2xklp7qdqriha29w1ecbf6pg0hljilaybxi5u0xv8xsrq6v380wxs96vc7dh8jmjl0xu06jswo2pla54gd4grfbsnwuxaq323e0p9gfq3kp147r37i6pir7eeru4fmw12v4n2t3otgo6g27fyk7vnhqv5ot7anm93rwczma5d99vw8m2tgvwnjxi5j06t5r83fd1fhz0ir04rtty8vfv349kkeucnph47t4j7yojeq95m5wklvun9gehgdqomqct7saijs5tx7pvd4sqw7tapti1ekhqrpre9jhikdf88iaacalo167w0z5k3rhu2pxskkk2ekz0kwh88pdvxzp0kj8c00u6e73p1q6ejdpwdfsjgtk49cudq4ncxucrvnegd1uutid7h6mmsfqlhwxicarvpibxe24exygyohw1s8zzow91cb6dblipiub7u74xif5tg8ieyb1vdqlqg5lnuvl3fw6fh437fe5quuxw3mtxyai7q0vjis0t5zqm30ux31qzrjlvs4z5y79tc5ep3sqyh7s76m33dbeyuuuyzt3p5abnyf0b1mjnmcbh57wzomtu451fpopp0cte1acsd0rt5625boijj62b6tu5mnmmtps5kzxtbfbx',
                proxyHost: 'zeq30ntx8n74zxz32zoo7ixpoukv2ug0034gtp80rumuwmc64zeg9glz4jbq',
                proxyPort: 8851821729,
                destination: 'inv64sf8b67nyqh95hfugzrow45qqojmpfauvzfmifaok2qb43rqici7ydvonq8v5nayk7gx21f2tldsso6a9imgk54fj4yn5b53322qfy12zyt68a3uwswktvld6vr9xlmglby6jbq97a72v53w3r16hlwtqh3r',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cyr5w4402w2iari9cujyyuaca7kdoydx35xh8ezyol6szvzva3nl1k322aahfg09zpdh3hy6fppvvnjyl2c2u2o0eh6r1gglx1gqp1c1f7iivb9v3812u0zzgd7ew6wtb3fr4e0whqxkfiux88lnjquh3mldcnwx',
                responsibleUserAccountName: '617q666jaiej1qlfjlyw',
                lastChangeUserAccount: '2nqvhiu4bl8tc89q59gq',
                lastChangedAt: '2020-08-05 08:21:26',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                hash: 'edc2v9ufw91qvyeuzegeb479ukmzvlomibgswvis',
                tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                tenantCode: '0gvgnul2splssnuhhg88o29o5468quiwb2rvani0hikgfar5u4',
                systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                systemName: 'qiroiaz47h5mnfpjlr1z',
                party: '76vtth5ld7pom8ofwjs3x65ti733h2242jiyt88q4yoakilw5t8yh3ljd431f0u5f94sxz4cn4iqg5gwrih6ahm5k2dc0exqijgra3szur5p64wrgk759jpxjqsfoyzivrgrttgkaiwhmkcusargmc801mjwr7a8',
                component: 'qoavysk4bonlb8qpllhf658m2b2i56nh5a9e95iibhcy4qznbk0y35hqlfgv8lwd5tfu33ma2d90zcvixloee6yugap7jgw6ub6hl3352aeurbslqhul8ja7wjdroygbvn8rk15lg8fvyr8jr2ndr1ptozi80my5',
                name: 'e2z2flsups6mm35c0rccsunvcb657kypl7ioxze9au3faarccos6wmy08vpawlf74bp7yy81vtdzjqne0fhhdvpkxvwkjcg3u8dgct3b99o72h0yezhxtaxg7myntcbvmm4byf3oep6wlua0cvrhes67zyvr4as7',
                flowHash: 'o260zh0zmkg76fpf5oq7y1xlrwg4d757tjng2moe',
                flowParty: '3j1unq116mfba6o9p9gwf9d1numo9gc6yrnave7tp6zfmt2ud2atgys4k1kybcdqd33naybii90ftrktkuk88pokxs792ut1j2vzcyyi56tj2xzsmummm4iv5qagdarntlfzyz3mxxra27o1j720viq7ft9w2e1s',
                flowComponent: 'w8zx0gdath30sho0dhh17s5w09zgp9ouf9z0n5p7sj4i4xtbc43l5606mqlff7ipca1klz9oxu04hdn7rg6m6dvgaulap266o5gvwb7mhlmn4m9hm1kqfkyotqzv9nasvsas0z23xsksm06heuz4yau3k7teahko',
                flowInterfaceName: '2gjs2hegchcz7w0rfni3fgrcuicairo342xnjaktulrb4ojspu79d0nq48rv570lbuh2qtxfibaw0g1doxfc6enhemgnhcfc1fqj5yvjhhflwmjnajkpqf27wesrfbfpg17z6d4llmiwhb3mz3sb1a90mei0ll30',
                flowInterfaceNamespace: '5f3eeneft8t8i0983k3xssuq1o1p2jn39k4u1r5o3orb832s7nlkemyqb5dnogi4tc3f339eofw02p471rr322gci25x9i2gwm1xsljnbo6lxfccmwcifh8sayc86l4v7abpa04c0ctxd7n6ouitqd2faei36it0',
                version: '14goue14s2rcdcdke7dp',
                adapterType: '472qu3wczk6ig98xazxduzcrvb0ntmc7jz8g5hdglfoz52pcc22s2dgc6bzf',
                direction: 'RECEIVER',
                transportProtocol: '2eq1cq60hm5d84govzy21f7q1du4cz4chff14vaozat77wuzx2ejqcxjv93y',
                messageProtocol: 'kz010yc8a6mw0hs9si0noh9nljd4nr0hbqahn8e1stph8ahyvyrz0d7kiw0z',
                adapterEngineName: '7iio3l3n5x1vxlw1tgdzwclfog8lh6ivu48hkukfmri9sd6f5r6cnntpxexall19aawwdug0tay0ade48vqex1ycrq5guow9owpoxki94tv4ee8x1lxr1xw9s4k445kud19w19dfr0loc9dv5q7mfnuyu460vpdg',
                url: 'fno8n1dypu1asiorrxs8wlozcda4qyop5xjtg5gw77thc6ipuuixbas80urefjhvlh8kaq0th29bfg37mr9bdtsdsjxx6v1ymrhe63x48zgsrs14zjf8u63cedmwnfbexwwd15jxwoprhl8hpehi28kbkmglhmyqtd6yhh4rkpwytlbeydvi1uztov3y8nnswv2tv9kmue7vm2c49gmr0vo1ctz8xpsz3t370rp19k2jum9gde5v1lbkfhsw2ii6rdvku67um6zjobi37jgasht34iob5v59ust7fnt737plb4j9hcw1igjysxfalh0w',
                username: 'ipurtjie0na8604ecq1xiruifgwrs42zdqokqqhi55fjhl9fsk2nkbegwchl',
                remoteHost: 'pquezrdxpmfxvpmfpy4zmr797w07tt7g64coqgy8o1tnx262jln8tuyy1ge4pgbs4ookwc03zlgl030v0tdci38s630qbfmp6w4a3vxg68b0qs0cmacof3lctun6zcghxnjbtakupb8qrqyuo2q7js2h2cq4lhr9',
                remotePort: 8802898313,
                directory: 'v1q6c17lfyr57uh4025c4kfkz1c3myh0avyhyfjird7y3tu4zouxs8bf87wi86nqhws9pmry5xdzevzgdrx0ry9vyn4v3grbnaykp7noc7amqvhcrp1dcgch53zyptmcj0l3ntxso63rt50q5u97x9oismeluogz3i5hpje2zcm3a5iff3fsxyif0rq2kj0vtyye619fjkbbuixm0j8etobyskgzmx322r6bgqb00m2c8s4a6kla8jdz106og3rz0xsqbtyosn023d6n929kzpl7q3mkp03hi2dn7wgvvjr3h0bn3srton3odl2qd2xc0m4jn4ywn42q7i9jbeu7mo94zsaypsxp0cwx05rgh3gjpohbw0xfoa275wo9yryp9xzvqemk1fyux845gpvcf7j416wo9tlsr8ofufu1gfarvrs9ft5ak6vfe4r88opv7r3wk9dtocvf9uydjt28by91w0kxr9bj040trf2romos3o6kf3v9btvpcwcrt91trwrft0izzlwvoojnzs3f22unq11lvx8sel91if833xmll1l12b5x1ynjkt30yo2r9qie1gbkwy8qcozhsxuism4dwu8kv7rtgnmsr91s3tna3roynh17v8fkkkdhrwsvzkvw30l0f5r369revnw2b5gue8uwr050qyb4u0yxv5v118ffkavxopd00p5piyp1ltktodwhf9cpvuj8fm56y6r3tsh1tvpo8fhdqqcy7z7srs0kwcevnqn9v9sv0tocblfqwrfl51kxo5senhw8gcszy8573i7yzmy10k2hh7e1isw18druvx41fwq9fyzedodgrzsygaf31qqxyprq93qv6l5u73jkhyuh194iyb7s26i3scc09w9e2lgf4e85aq4pofwzmbo43lyqtzt54l3zj0k7ubwubply06a5diyzdernu0xfqcpgcpq4525rxeansrlbuq63jsmlz6d9p0xyytcvmp8yn4tip0fkd7hd4e0xzc5ufu4m2aycftvq',
                fileSchema: '8ffd3gf9mvxynag1xysdkuxvonx4e3yu9akct0iydat14k9jytkb1jns5qz0wmqm3mp5qk19ya4bbwohjwn8nkg3281mht2faata8vcsk7vrd2spxwalhe3akz25jq220nht4wfu4xik0pyryp2yvsz2zicmgqwoap24gfxirjh4dfb1sk2j4kqmczojq067obps8nq8xtwjgulycqb1kg53gyz9zjwe9ggpmja9ptasgfvwsvuc76c5b7xxiuh0q7qub5pkkyolguouci1bn3t8y3fq8g9vdavducie3dqo9ww0xpl1btkcyj5tn8s3krmjeglmp3oow5tr4ouqi0wvnybhc79t63row0bhtbn4kaka31we0oecudgpwyk3qsceh5itxwgb4hfve8jk11hbd7wudnup29vkfke6rkea9wdaj99jwrlnjege5dk34e03mkulhjz7wnxyyzw9d42l1gklys75kqgmrb37lvso7rkqn7yz4yupqr9kx85rceasm6n9dlltpafp24x9vdcx9hq27toqvpc06vhdehi8fdvk7u1jmuqis4jsmdzn23q7ie0c2t567s9xkypcefok6upza8cq52e1zmde8cq2r88yhc5v7lt15gylfwpsv4kbazumzv1maskqdbc883o6zdo4odwo56sngj22gsr8z7e5xw1eg7h9ca858rcwxkowmm7xyc9chakablvm2eax06sduuo8vim0p0exjgbhc0h15a7j4cu89pydwylqid0hxykzcopwrvpui8d5zfp8wu4xcx11t5k646ck7g86o2rj215zqljas3ikd0oydwohxssxs3grfgonko1466zzxvdfi5mgumfe1cihe93dkf6kbjly2h0wcyz4h5i13avvy0zu5559rssnys3zupgq6ocube1l3dztxei5xazbpkjw7rnkp6vbvqh9rvygak62ktsrxcshxuhibxs00wzp9gk51pbr2zmm38focpwdq1usb6b8nceybvtsu9me',
                proxyHost: '2x17cymchz5tefl3ydg7bzcdit8eschg85y685cnaxn5mnct5k26l64kv34p',
                proxyPort: 1438225689,
                destination: 'vqvh01t1v7ethcsr5bxhqcws4o1bd2vftkk90nxvlzk1lbke11jkf28mvga1nwjm1hak6ocqbq94qarxzzgru5yc96cy1mbyvefmw9v7t1nn060m96fra9l2pzah3mr529k57bj7zdwt3w3yrpkkr2n8bccbz6fe',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x1420kampb8qi1v8vfmd0d99epwx3u5sk3xhayzzyrlc1m5ssrjppxsdvx1vagqjlj68n6jckk72arbowm9tit6grc2e3seklu7pol6xjsg334ok4anio8ogsppe6d8oiri5q8ok4r2l8e9b7nkhb7m1vcbtuamq',
                responsibleUserAccountName: 'p2cey4dnqqo2jfa2iwiy',
                lastChangeUserAccount: '6jpsbzp9vd24h1ahp4h6',
                lastChangedAt: '2020-08-05 03:16:29',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3dc33520-4cb2-4278-bfd6-076ed42bf026'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/dbd80630-3d18-47ed-ba11-a68421845aa3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/3dc33520-4cb2-4278-bfd6-076ed42bf026')
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
                            flowHash
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
                            flowHash
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
                        id: '97ca5776-e59d-4c0b-809f-79fba43f284d',
                        hash: 'jytaid493nexqtgdjhjmxwxrz103t2br4q0ptlh9',
                        tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                        tenantCode: 'v7j4jnize32h6517gtaw11vzhqqa2bbpbqh0i5x4g15fjv8j2y',
                        systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                        systemName: 'zc9maypzx99z7zkbv30w',
                        party: 'cdnjvs46qzmugc45l0oe141uetcut7lou64f3bsl5fd1vzgrlbn44qhobcyzx0mk7tkgced0x9uhgh4mn6o588g8rrltweovpxodttkhonu7fkd8czpnkwqrnsap1kt1u3t7e0qd0jg6in6eyqo7kdatvcvq8v14',
                        component: 'z67w4j31ggm5e6e4kjtvj0d6ky8psyq3ew35cdjwp8qfkidy5ajqupck3ww9p53oyayop4j8p3gmtjihsr16ryg0mdhz3jp36puunn60sgr4sar99bn9khgzq7os0yq2gjt4esghoi5sz3s1ry281bojgb8zoi43',
                        name: 'w4x7mjta3v6g6w36ve1xl7cm0zv6kad8cfzn0m7301przp4pg5h7ef5ntjhg2g60v1kkqhmtwv8s3q89zbg1apdar3sbir9ib8fr7ghpndwak0rm68sh0v7xvxns0rssvdyo51hik96u56q01mmsam4zeoe32cl0',
                        flowHash: 'drv8q8md95aboer208r93f1s2xdfb2xzpf1udwfn',
                        flowParty: 'kvb8m4elf71ix197v1833fctg44jxkutjjashd4om355rmhkyifm4b2900v85pgx4vfbzgjm852rmy7bh6o9889b8dwis3lcajoyonnfoplo70zkr53j8kboz0vhdebw9d4l14v859rzb4hj4a9x3m31cjn6qh2n',
                        flowComponent: '7kkzkc6kzmt1d7y8h2d3nxguopzjctsj3bmw8poqyoscxnpbky6351oq3zk4j0s1t7b0akdlc11wmm7zg3q47vrf0zd90t72ojws6hfprzpq3fijs5uyimgbn17o4x5lloyla9uzgrxc4d970e44xevl9vwfxk1h',
                        flowInterfaceName: 'mf9wtwdyv50dcc29va6jd0vuk14bibmewu8mq4o92dotzt8b61mj6axwxcgqoam9uxda3n3b4xk9z6occ36ejebu1buc5hrolnnh327pcktmqwekf5h5uliqyfrpoogudiq1gdhibofwmbn3mc6xc21nmczvi80y',
                        flowInterfaceNamespace: '5o9o66ig87b09oak601dvdeyewq6pvmz3fhj7kbdqmdm1bx7ig9eaabbet09yfa9zn4xo9dl8a453j0bbq6fkozob9no2432yppbtsjr5jcdxjxd2zqcbk5wjyqswu0urh63ygyw6bb6rx729y8rhhbd2xheuttv',
                        version: 'x8o0xdcjabpl0icgh203',
                        adapterType: 'wyv5vsif08w4dpc4c2wbuv9gokjjuny6mr8yrudyyq5bojfg4y573v9ia16m',
                        direction: 'RECEIVER',
                        transportProtocol: 'su1t39don5f83fkoovjqv7b8u3wrhsxm5npm2lelytq4nqp8zadqd2rh834u',
                        messageProtocol: 'agbpjnioep4b22qhssa9go3l0gcb8sacrxnm9bgktb85wka08ztsjqac5cak',
                        adapterEngineName: 'dr65suhzgdy5d2iqvvxnwxfrrvc0te8tw9erdkxaqwnmbbglbb6djqwohr0wvgchtgy5ytwxavz13dflp0yvjg5sa2jlu52ovjq73r4ie5ap3pbzwhjorjb4i02l93tnu5au95kqtkvhy8eywt2a7nu6fcsxn3o1',
                        url: 'f7og4wkm8rpyrszs05bl3m4lnw4y7hbxyudlef8tumfqjzgt9wxpxcflci6gwipe7xuofn08b2rherddz1nywafpo1kb2yimrb1utubpp7jgemsep7076n2ua6m6eehbxo4zffge7bt6c16vw49giaefnova0byh06fk4gvaldtjfv3hgk8uolzhbmlcqj83ipbtv93i4xv3x02ggyagbrr50se1gnm74c2a7upkyt0ksqqjhz5gejwens876m1n0mzqh2t125m5vrjbmkicay7tbexw9ghqj24hofdtuduw2big32nfuuyhwsqgqbsx',
                        username: 'z248a4sk2y5wm05ivhxayt8hnxcyy1uk3a085pcfu40v4ha63aw5ejubylle',
                        remoteHost: '1so9350h83opn0hccwkmsinfb6gpfk81mk7yq9eu7kmjl9u5ija2zulf5j919c0rhn741l9q19l20kcvnhbxjxmqezhohrhszzr4vyzdpkm0yz7d1hq5odpu0ot6bifz9zkapzy05oaugq3u3n04l4gldnb2k1wd',
                        remotePort: 2887922277,
                        directory: '0i6yfjrib0cg4mcaizlcp8l7ywavdvorj3dal2zmaly99f0z0832x697e42earlqo23szlr8fgyhmv4pe5edlih7cbiu1sx5y9lsb3flzfav5qq6wltau8lqgqyfrz37y929mmgqpe9b14gtxo7kecpp99evg4auo50f9kcyzsrifhdazfrwrt1l6p76wkfc9ws4u6vjj263x4awhlizvd3itwgox8csxr4fa2gflokff0al426fbprfn2a0b3mqcs6vag60ba17022h3z6ee70va4juwt8856ap6fqyxeu8pszxb275y5dl2lr2spx8tdzc5ngb3rvs9few0b4zrxk69expu76f0rcp8y6bit7fp7cu7trixhge4g2i836hj7qynpn4b4hf9z38kmbtniiooje5xdsf97k5ll3sadhvh1mrdvkohis0pnk4h2ppc18inp1ip3lt79cayykmpvdlblf9yjtkfw8moe58ouqi4rzk9ojg0bxg0fjq6ch8bqotgmir0l4pzzv2kji1fpn25uhbdiu9kayzfo2vdzloxhzg703zd218jtgjbfr1sh5xca2873px9chm1d1quufde0cerwc4rb9nh5oyaotjg1ivfom654x1vxzbw63v8ugtkbw7a1s6ajn8gjdxczoiafzc7xohb39kzqw39ke7tqh9j310x5h045wima1wmdotel2i84254des5as0jukp6qh99xf1ue1dcvaui2mz9csll08hfilkvhxoh77lpafa9c185qkt7ysplxyuvhlmlkwrkn8g9u4vzqn36dy9n5f5brvpukjwgg20vu56yacp7lowlhqs1ok3jwb8dm94y0x7oza9ijdopvzsgxg8buz5todqnve8dr2uaw0jqv03en5mnkccs9y58evashvyq25da7msr6v3caq0lxaeturr0vwq95bianofsgtqnpkzms1w0xnnxxoyduqvsl1llr3avsr6by2dd0o4gjmtz1jn2e6zirsln8ilzkwm',
                        fileSchema: 'bdvki735pmwpnkwydc5ohwhtwc0m9madxbnl1holnxsk7ylztk6ez10zge710v0jh7bt6vr09x6pmzs2z4jq7zk0kkr8bsjxa7eikpld34y56sm0xm9ddxfv8wt7ir6h3hwamrvwh67wyvlmtaj9mf9ygcuk1uz119eim8snud2cn4pdtmcp2gp7ux2gpp9c7uriisng461e26biq3hpcgko8yx0hyjwrhe5v0wovcu1vw2jqrhmus5lgdkkflc543au7clmu99gdjua3ihm8etwiy6f0omq3ujz0do4ol6ndzhb7kbq3y9xxuqrjdohjctdwm7egx75y01qju16a6g8qg12ks118odki4oxobdlt9mqmccw92ooipjezc1fn2erf0q76tw678b4ddjnp9j2cmmdgbejynb5znfwl53zxfiwcbrbjwwvdl0gzt4tiv02rhqaj2a0vgyhts2kmn807wa1dzqk7248ucllngxt87pmulin46uwkcaswced5widuerm92ujeu95nte407p5pfi4zu7tmo722ku5ov9qn19zpavjxmjgl171eip5d0xxzjofjqnnqp7wog48ttdnupx8tlxe0mrfjo7jg3wgj5tm2nvp7m865l1js4wop830eetzn34ek2tdu168xwkw29akf7tpij990q1xcw7agovhz2rc00vg47tufhyfht492r60o08f3vll7v3ktqin1udoee30utpzbfilpudlb2haqfkuflt7dlpxh512wk680pq4hnqcoycb14tvpooxj3rseqrwf1p0pn3o9o8c2ln17bhccc8formry7r0d3yms8uqkbf1exmscye3fqq4lh4jdup2x990yzc2esqtkl7s57xr3uxw6vgctpaiy3khmrk0sc93xjocr1w9ypdpvf0j55yl18r557djabus6p5h5n8sqstdhdredu6j4uastv664vjzkdtav6bcwuh1khe57h91py4vy08yn7i9madw7136zzuw5auozw83',
                        proxyHost: 'jsrlky3fyehxurberyvvot5n2h1975xkypso4xdk5a3i8raox81k8a3n1q5a',
                        proxyPort: 8471929457,
                        destination: 'cy9qf27217vn9ek4ruo977av30zr2i7qduev1dfcahzi0mqr9m26rxlsf3ktjpt8vz4lj6q1mkv2pahxxj1opt4yf72k204qv8yujgegg2gfwqfbmdbfsx2gmc2e9wjlbkugh0v2mnkcvs7mgvj6i33brmyg5vtz',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'n738el0jur4v2avm7vn9ddqv8h5b8gb6i17gdqded8n7sfht12fz5y9b5t7o68774zqm706foflz2cyzprnuq1qrpniay9uz4vbthovbrz4cwnmvnw9mnlxh2qcvsl42rc590vv3bxck3p0cy188t2cotv1k8s3q',
                        responsibleUserAccountName: 'az94tvstl8geva4s4e3b',
                        lastChangeUserAccount: 'xch0j13v74v413ewhg8p',
                        lastChangedAt: '2020-08-05 06:25:42',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '97ca5776-e59d-4c0b-809f-79fba43f284d');
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
                            flowHash
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
                            value   : '35163694-e41d-4593-819d-c2df3746d8ec'
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
                            flowHash
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
                            value   : '3dc33520-4cb2-4278-bfd6-076ed42bf026'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('3dc33520-4cb2-4278-bfd6-076ed42bf026');
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
                            flowHash
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
                    id: '562496a2-5227-44d8-b545-7f2f02a546aa'
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
                            flowHash
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
                    id: '3dc33520-4cb2-4278-bfd6-076ed42bf026'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('3dc33520-4cb2-4278-bfd6-076ed42bf026');
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
                            flowHash
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
                            flowHash
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
                        
                        id: '03bfcc31-a4cd-42ba-9ec5-0ecf1a5b4319',
                        hash: 'lol99ylufx7kef2gybitqznxmerr6fk0ch0rhkhy',
                        tenantId: '8c80b075-a994-401c-9ddf-a65de973e920',
                        tenantCode: 'hwiwyblf6f7vnvug488aeoie6ud996whmkfv0pvgo7ndt26rls',
                        systemId: '521a52b1-df92-4474-b5f9-7ec526479b23',
                        systemName: 'm9yvxcvxxlmd7xnpye96',
                        party: 'k2kg77adini6korbynpg8r9ans5odzzrn7riawhrzzlb7x4o3zuac4ytyp5n6lzc6x3ojuhv1x5h6e89thr8sr7bm51l9ikue4xttig4v33ppy2dtqyhar0itry245x2c4pseyedkuezwtck8lcd589wadpiphin',
                        component: 'rhuogneik75jluwsmi7am9wq70wmivzu8s7l49wv0l7zoo381y9rzd03ukoygu9zfvw2eh7iw05y1svfk10a2j97zkath1jya6hi4rzu9lpta3ckla72pv573bkbiq7vw3f66ut34e53ofifyfhubsvunxl24hae',
                        name: '09io6w5gtn23lf8ns703oip23nfrfsj552e15otc05bas0hj7hic0zc6fhl4ia6l6o3lbms8nhnu0xkwrnmwyl9ppbvzvrv8irfnho64tlfzl3644d2wib2xgouhkv1d3u7gr4wstbez0uucwubtdwpwd1k4vors',
                        flowHash: 'd6wfm7m7jp8skw179mdqrdqedrlt2hg0urk4pa2t',
                        flowParty: '8l2s7kq3is3ipxgqn1n4fws17cq6tx96hkey8ngs13i0cxyuer62fj0t6j4g5jffcujtzry67xbndyqic4nddob3f8mlxw9wihzj4ftiwh4agi1k6ukex2zchogyxd21vezwytwoiyq0r4qff4echzuomgbpcf6c',
                        flowComponent: '2pvw227qo2pcfh7yc8en3buymqhm71hijm35zxw0avwp47v45gbjrhaalno1su1clwa5z2ah5yw4bi4r0ixxprnzjiakbhri5ucejy8l7h2rh45fq8mj0542xffejio2cggd8zs4cpd021qo4euwvtsyhewv4sbk',
                        flowInterfaceName: 'tpynj38vozlqrm7mjgmthcqmp0fbt0qy6nzlqn86t2iip3p11bci9iooq877wk8d7ltjjq1kuo4wyviyaz9vsgkl4q5m1326yxm6n2oq16rp7pegai21xhx1slptsyyven9ogglklx23357tlmf42y1j8it2ob5n',
                        flowInterfaceNamespace: '93ukk93s60obshk9cl98y1ujfzqlorsihv8sb8y4zf0yqhbkknzb2l83dxd5d96y3pbpjnlhnllwixa0mpxojt8t0m6uwqihsuto3ipbsnyg5uhrfz1i2e5gcuxbva13ywk9hwouj90j0d0fumrdn1shb6jasjcq',
                        version: 'qecgh093pgf0qk9d73nz',
                        adapterType: '1j1119k1pbfwnicyelb0x9ymj0aap3phfnmmvkci3lpxo0rjkc63ebsc4xuf',
                        direction: 'RECEIVER',
                        transportProtocol: 'kodsh94zot2ne2usbmr6c7od9k8muyp9u5m3pqppiobh5toplgsc4nzqfi9a',
                        messageProtocol: '5yscu7sr4nbi4n9a287zraaznbbll4zpag9sa1lflcq8obdaq0chay29hp8l',
                        adapterEngineName: 'gzcotyyyvgd9clxiahrdlsumixl4th3bhp291kedkhqjabuh9ll6htq7i736i5xq72gb96m0tk8xl8t6txphsojklny9osn2qnp52fr0m2rrd8h6ymyz2vjw6dbqceob6cg7o41a6glgs7pjfkm0j6sl9t5wfzep',
                        url: '09ifhl9wvlqq4rrhn5oaomf40mqgnglp060nzc6rbiglxy44fthbm9a7jovtsn9kke22cgkjx46vmc57kjagm032s3ghkhsnd156v6u6aw2gkvkddljhonnv84thtrk4vx4u2hotxyx3i6vsxzf6cpdo6zuglgh2trh5mfss7vklgx5kg2iaoyuzc9vafytkc5n92wtlz4jccqsj7ukf33vro1j7aa4ubk64cd88km8bnxscozfn3ibnhdbymrhow2jqjlqm0ui4vhc2i10mu04yut264nq7tu73v44ib93umqexrikt5clfrt6uktb2',
                        username: '198boi17np2zquuxzcmzyb3v7umtx352s6ji71xbb22krma2x0o5mtv7wjeu',
                        remoteHost: '4cq4c98pbcjt1j2gj4jf56x4g0illg7p0eom8un80rqmrkmew0fs039psd6s2bopqr9xi3q30vg4z35qyce560p0116n1jm64i1mvo9r2cqwxmxvrc5cnwdhiuprro9wnipe1ovmfsqw9joemz4bitd1dhjbgegz',
                        remotePort: 6487304499,
                        directory: 'gs72wrsqlhtg2ehcudweritjfnycp2l08r59lsfonj9aap1sju4miidu3ez480h9km4fh7w5omfkfc7p25keq1d1wozoei4w5vck86m9iz3z15t0860nl1h9astg6wgf8os1103zjkl5gzr3b814y15pyv2gj3vnzi2ewnevyetc8m2qujlid1kijwb4ome5uium718a59u9qa88z6za2ebo8u7hlbsmbat6e0xkn76waogk521df1uoyrzr9ydqsvzvt1u218p4m906oj8mt88qh6mip5sa95w5wz6mefltizs71qp5bawjgidimx7581l1alfluj65pu8d4bsjbcjdrrhoztumbu3pb1jjne8ysggx63iyqqg430zxzjw5pgkykd70igdibpa7q7c644s9j91wy8xboxbt5p8jap1u8hchhtdtk8mxj2y6uq8mb57ne0aipzopng5ucx6z9cmdw9vvr6z0ul8iqrfh0p6vai6h2ttiik3mqrvvbjlxde6mro50pilaw39o7lfocaybht30d0qmsoli4ycxmics1djrv9ay03i887nk0dx84xhxkdzh8x3259t7292ntogjzejl6bo3bwk80uoselhpkriji11egtu9uymrifw6sd0eprj2nof86hk6hef2a0396q6tbng9d8jtov9d78c5dpujemlfad27fmbwb2pdb1scvqc18mc6ntfrmyke4e0chvhix6thsk8c1rrq44frmxd34xnicmj5u23lohnqfx74lsu28pou3q1wdqouaa8fpcrrdx8i6walzj5gdws9sspiuvc7ylj5n8n1wtdaffgdn8dvonyvzo6r4avfc54d3ls6u43s941o9f971dz64clz6n8tzpq14usvur8xhb8u0tmgy8udlaxo3g3iekdubppi2rayxnb4onvq4a0oys6gvb5r714o7kvv05q0672dc8tvhjmhrmlra511ul9b6j2zoys17qf2nugns67uzjfaouvu664b22hefvn9',
                        fileSchema: 'ip8y1ngnivcgvexjoqtsqq7y0vbybsmejun4m2ux1ksfh7e4ho7plhrkesjsawtfy2ok8g96emqs3g7rdi9mou97gjn6uwic6va1f1yox40r2jhg1h7qinso8i5xf7xur3z4k8l6v3yipjlkp9oo5u5stgy3hykbn3b5b867kt0dnjw642h7344dw856omghgl5ze9flymmyyati2rqaoxi6de754pmi1d9a3k7dljw40s9f0b28tme1cm2kqacojgpbtg8iybm47iijuu6l8jkv71ismre4ok6qe6lpibd2q8nrul2usbnspiaatmu066pudy2g388oxxqgkiv1ao6asxdb68d1jpaekznrhkplljkxeut20f5c8kg1vowo9mlpi2jqbvb4ciorpe7g9aj3jr2qvxsg4sjixdiw0f4m52kvp96570iftpw6gsdj3cfp08u4opmv35bexehna59wa4w8arebd3ipb8jz26jqhoxgynfspldra6w4ux0gy176qb1snglf955i0eao1b8u6xkzet70wfi3m1ctohuo0rnzykmsr8wke9e3n5aalaexbnoep358arxcg94vke14di5ewqa7gufqi55zh7rs3oogd55d7lvuzaz19oziob9h0hyxya60jdln7ej04um4vt9l2h7uf31d6nb97blf6pwcdf1n22w2vtd1e6e1hz70ssxd8hlgih1w5bpkdkfw8vsjnsbz5yixfrkfbkafy5dci18e2tpuzouovqjpzqz7mubposzooaeq5srwahdqgh0afd56i7atjiu1xapmdjf6w6v3naguv6khho7vilognwpm1710mph0m8al034cmnuxxfoguez4nf0gsmzo8gq3dp2kq36l7ij9na69am6w2e3pfra9l5h047pzgp1seg22htioo1fn21aa8oyfikovtm06is364ucqg20ikw3cgm2pomljlkwh34gu9ax6bk27qplb770gkw00q8qztedfixvxq4d811ft6mgd',
                        proxyHost: 'm83cfuq1fjf5wsr68ad4p9pyginmotdx0kmw2h26hlrk0osunvhqfeiv63kk',
                        proxyPort: 2475312240,
                        destination: 'kn8wp0vrz6e0exas7qgsd9zkhik9ianrr0z7wkxr9okk9ukgur7lfgo8sfz4w4apf61lb9d8eyrjy8a6v4mcny3uzrnyaidd5a7dwusgtnp74w60xu4mw1o6nz4itxctajyvefk5itvlb5qpyty8p8iu0bf8znqc',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'euslw66madocpb6bn5c9sfu4lozmhngty3bd90gcvquvc7kdyp8yagqv84wpzwrl9v85n3dk9lfz1fsn212bi0naqos0odhhjifikbk7lmmrsgatwnn4qahjmyohupnv9k214aw2vxsamr04mwwoehnbc6s4dr53',
                        responsibleUserAccountName: 'yucfbevpplvoo3krc8lb',
                        lastChangeUserAccount: 'rjtx4440qwmfyxfq2laa',
                        lastChangedAt: '2020-08-04 10:37:59',
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
                            flowHash
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
                        
                        id: '3dc33520-4cb2-4278-bfd6-076ed42bf026',
                        hash: 'xvh67gbhnm2feup3nuis5vkfzwpyf56ptexlpdbq',
                        tenantId: 'd8ba3058-98ae-4ce9-9f95-19b662777756',
                        tenantCode: 'i1ypjahh6p59waoe4tws2ae71thmc6mt2613zk5qguzhfd02jx',
                        systemId: '119453a3-9825-45f4-a660-1d5467011cb5',
                        systemName: 'hmnarlv92dwr7s7xu342',
                        party: 'noqonpd0ht8mce7gw3jh5yualipi9l1fa3utup8k615agijrzuae2v3zzh9c0rvuaiw3pwkhd5j5roz2a4k8dxkoom7dmf6d6kk4gjnu4dmedlajgf6kc3pqlg4ufjgi2fk999jz4ubr202onf9sqbjwgh3880n2',
                        component: 'i3rjm6d29r7bi5ac8ro9snazofiwrb678ccuqdph51z2yh343dh49vjxvx3kkjv7jdv3gqkleud7d65sslam3pdun1hhhk377looo4p2pn6sp8wt26ccjpuy8klzob7vpdu7lwzsex7vzca8j55f24f2iu42b3hg',
                        name: 'uv4c17cke9c9ywlljrhou7bmtc136989mi5m514rgtgvqns5f2xthtztdl4sxqw9i4ftoz63dn686urijl2lav01gvltw3eszw2cntfmmhoi7yf4zl3mwuu4dmrn5gjzwnt4olqac3x232m15dehryu5rcvbk9yk',
                        flowHash: 'r34a43d521o1l00tbwgvkd3p6axlejsg77kvw0l8',
                        flowParty: '8f2ya5xqyjrcs3h9b50daiqwwzxeo7sokjbri4j4wadf1jmgs6vr1xczn937698wvrakxv8kaj6ye9cfh7eeyoy7lsiot5fa601n68hdsmytl0ec5pjtbux75e6y6qenoc827i6w09vnpcetoqf8zed7ivo4cjt1',
                        flowComponent: 'cydwvwcsk8tazhuhsye02li27c5cflzuqo4a8fdvx9oe0adil4f2atmpi8eigwtthecirs0lz52vlwczv3knp69erqk22ow0wl5q1vmwe0q63colhva0gk3iy2gtgire417oot2ajbt3h4pcg2slcqgkpmpwibap',
                        flowInterfaceName: 'tnklehr7ftwhpf42gsik5vt3mvpno3xbcmgizso2ygeqdnvbztvwaj7rgjhgx6lbpjvvekxv287el3x2uf8txv35c252xwu9msdtceal68nzxc9ycvg9y8pp6i870wcgae72ypb46mbwxslo9u0fgge51w300yxk',
                        flowInterfaceNamespace: '4wkdm10bzzj4kmihlzymv712d99fb0y448umtjuqls6i7rh330izolt8736vyiqvny9ibh5mv5ftxue71nczksmyeglcfv9eqlnenjiizots6v0hucw3wk0v2xlcjtmecgfv54kwvc6q6giwojh5labx9jcv9wxh',
                        version: 'i0q8dj17ejexgk30xf9y',
                        adapterType: 'd444u1vmja7pqgzqrtd21ny1hynulnf7anpw976u4nszu5ymtyje0l81o25n',
                        direction: 'RECEIVER',
                        transportProtocol: 'y7agk14onxcv1a4sl82nd0okxp6nfk6nkzvucufcbxjcysud7hb6wg7ts8cv',
                        messageProtocol: 'h9fs23xn6nfs2ntjv0xh9s28b7ugv6z809j82wov89drl6lluuikx0tmm7bi',
                        adapterEngineName: 'y6lbveoae4382tvm2apfsoe8xqephik8lv3ypvr22j04zieumt6io7po3iaiqka95vd7juxen2infb8fp8no2jarsqgxg9st08ukpp50pwqq3tuhfti59wba6lw6oxjwrhjsoajwpj1ejpsvtphmhs0m7fl6e4ap',
                        url: 'tk2yc4lqdkbmw9u56881197u7sgdj7o8rtpibcxxtpq1199j5n4f4soo76w15y8ftgj2fbsdb85072e3v2bhoshy9asbdbj02y8cj9c9b886018g72otmuifhhwifvhlp3cikkv5m11j4oc0jg5d5l0ue0c3clg0uh2vige6z6wqsq6pxfemvok7yrc0qyq5qzyfpuh8aoc9qzttce2vpp0dpoe0hchzv1o47spebza3zjxv727j6elc4l2fqu4pek5fk06mp8v64cj6o3znihupl9lsd2esiwg87grh1qlpv1mt5g9sreeftffsx0rh',
                        username: 'd3f8om1ihk15z7hr3z9msboerx0qou7yhmjhjl2ksh9kv7e1fwrqdn1ltt38',
                        remoteHost: '57iv5hbv8xtuk0lxou18ghn4l5wm4wk9a23vmps63yvtokutie27rbxpw9agabauc99z0zmxdhpry6dmtbyb78fzf9fpa1xh32u5frsq3w9j9bd806bcuvbcu4e7d93vhilnolycnmd03fzis24gacvfjjfmf4p4',
                        remotePort: 2988130270,
                        directory: '7728yoaxekd6auzkwogkn8jpz2ya7c9l2aut7eglefgm7081jnkpjpgz392iut2kakxhevfpglnh0u0914inr2cpyi2nrni94w4cj7vrwey8japk8ieaf7fox9eompq5xijf09lmxz3br9r8pai720k8vfq5j54o0u5e0maua8chkj41xk8v8ejkyicy8las55f0q7ahakdceqetkdt8yia584q6dbxkxrzdi5j9cnqt9mlshzbej1icgcfalgd1cd8aaa29qini5bcwp42xj89ssfuj8zmz2fl0x2znuuvzyl0e3htf0pe1wl70ajpq509rak3ga76wd86bf1aoapulp8x20dgay73yfnbbpiev40ipi1ygi4fqizzfmomrxl509qfgf8o2yahkhgn18ol2q68qgoxuudmb32yj6watp3ejxtz76mw2aip86xvl7owqj0l1ea1ht0gkwpe5p1phudipgiopfyvdo0orc5j9684t4iknwlvwi4rt3zd1dw27l8xvrnfigw4qxkcmguz97mp3j5cwgbxefbai9r13xa6lksixhzvmga0ztnyktzyl5i0qxctl24shdw50p3ri3auxsnzvcoq11efj15eerql7vpold0fjkcb0jzqjen0eyvkenm2nfq4soik79xsuob1fmxi8k6c87dsyvwroh59tsf3il4o882t6akewfjt9zrnibyvesk8povpd6ckkjkgd0r3ne7f3250k1yw7qcn3yv710njw5ebj0gt8z1zxbsusarf6cdhog6mihwth3390tjh92ei5v3rn29keqrbl5r1tg7a0jj5wa8ngg6p6elwy9dztklad9jkibt0wo4xf5bebauv8mjzmir27cvw4gcm2uz9aifgsku85c8trxlkbzz150xj37ecqc7b629ifhbkwgwp2pz215fu97rqxnh31x46upbvipln8pwkj7uhky1r7714t0n11ifkzpt3sq6z54ejvz7o53698c96g5gw3zt5vz3r84dvu',
                        fileSchema: '0u9n4uitc6qstxhpcycciej8n71r6twpj3pcmwy1fezjmt8kxbci2fsj5afmjftt8o1m19qj27r9osiu2i85umw9oqo2t9l3y6czamzlm1oj20lecdp7dkp6z3w4bp6m0jo0wskobvwmj1x0o5uha93whu34jbh60awydfgprjq1we3kjpdciueo5fkgwlom2eqzfww616j97t1g5ks95ku3doct993jdzvs9u419stftf3oobvhsmkr0df6l48vt496tn6inlq3nnxcsxncgpk5zg3bu2xfyp1z97qbysqmk3pe0slnhrxu5pnkaimxpkuvwg26bjc8u4fmmkbniv3j53jzvxp22xhwbbl2fb1jn1anlzhybx690c0mojn5a8xvr4rvdto39wauhfixvop8zc3ufsr4456jtenkfo5us1dlx2t0leo03u9s7lmxptlp63u9a1h79uqvw6wv1e4glj2pbt2enyqxyt1yk7l1ywvg6afgiw6q5r2n5e7v5iczgpvnz6j7973mossc3k2k7cubpxpambdiw70o2ic5y8q5hu2xwiw9t7ggxjav1ri0bi81x8t8qo6xe5yu4vfks2kpjffimszjd1onxen4eczv97dbzt48yg2z4dnjg0uq0rla2h99sjdjo24zgpj44brh2f9fz26r1xvruvy6qg1baqplw4x0tc1rvhz888dikyeisnt10c6ruyncfl17lijfgzs9y6y8ct4gvfmkyct7rwwnijplulm622tvsq29pxeo5r8kq5jeo2fkrf9j66mwksjgotlvwdyh3rgyowhyptghjj08ef7564ixd9pift5ip6wetkz1ktocto2o77jvmaunio9qawwqpvvcuz373ayctl9yzt5uquh880gnxgc09c266rsi9p4snv6rbu7l42nootj5m7dbpwmna8gtzcv3j12qp0mhtl9lg0fl0nu77k8u0wudadweop4fhca5u50n6egz7pdyqun7umutuauzm11075g83gzn',
                        proxyHost: '5iaaxfqwiosn3tl1dmd1ecykxxm67fvpyzacqu4yo7516md4j6cnt3peo539',
                        proxyPort: 8895352449,
                        destination: 'cttx8n30q3ste0anlhiemzv0dgqp3jntahgn2tvvpet639mgjes3s3lkb1o5djjr7x9idbyp2c8fj5nu7wg9vdablsitnlryoa5hqumkjwgvdtyp5ko1yvgeyyuotsnoxj0diosgnakzr8whaso3u5dv6ls3cxhz',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '6vid1o5mq8sh2nlvqe23xqvv7jexymxa7vkrsgnk6wnn3x0hoga2wpf42cdtmomzg1gsicm09j6597k76jsut0o489zk5xsqetaj1s5w4d5l8w9vjokok5am7ctt0idd7v5q99ek66agrd28ji07dzdulvqqwy61',
                        responsibleUserAccountName: 'uchnxnl2yn1n7k88epmn',
                        lastChangeUserAccount: 'bdtxuqc1pyj3jo5rao5f',
                        lastChangedAt: '2020-08-04 12:58:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('3dc33520-4cb2-4278-bfd6-076ed42bf026');
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
                            flowHash
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
                    id: 'dd4b96f6-e617-4731-8cc1-d4be7a88777e'
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
                            flowHash
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
                    id: '3dc33520-4cb2-4278-bfd6-076ed42bf026'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('3dc33520-4cb2-4278-bfd6-076ed42bf026');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});