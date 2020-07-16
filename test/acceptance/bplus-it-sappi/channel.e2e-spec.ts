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

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '4kaehxzrpd5ldcxnyflnzmlinzzc10cshsjfnv6kiaa0tkih95rhy6vciqx53zwfuf9v76wa4k9gji83aduupy0j6m4c8s769a6shqsrtapnmrzoz5p4tl8z37tir8bs30lzpqtxat5e5f4o5rf31jximfd7cwql',
                component: 'p137nux7ddna4o9pvdjss105il5a94fubhmjck7aqhbcmpwu4dqr2vbo3jf43nx9rh61usn6ds6evs9fq5967vhbhi08iinexh77wo634njliaikmwzunnuyx9uproky4l9ykpndn9c7josx0aqijjmttty6g6ii',
                name: 'v651kkhvnxoxa6kbewn1pcze2yxdnouk5ysuk59ftnv003qtoss6mkx2ww8qgp3bbgej8wygzfjh8p23g7urqbxgtc2qs9tv5ogb7phbf9bi4u6rumvt65qvw4ziht5jrdmfqbdgp5fsugotlpvvxitxxv3izil9',
                flowParty: 'k6rvr0hfqz5r5m538cdr59krom5d5op4hfloggt9stjvjl4q4aqb2853auggued2lq2ogi664jtqyychb5b1gv5b28ezs88th46ui42260an6ajp19grs4wm61jvt6wkn9zxu8u8yjsxqre3qglnv6m5nyf7v410',
                flowComponent: 'e7wjkhgr7lqr4kqfp1rwgm8okw4effvbajfpo6gifwzjazn7atw7rzne5ivr3rdax2yn0jeopcnf1l7vu3do163teolwecxmu73smoc5epgmctoco7oqfrakritov3kjo7gsj6wk61at6gdhxf9510on02mv84mr',
                flowInterfaceName: '5j3bvfn2qbvdtkrze4eztxs1rxyocuvpu4tn3s2l2kdxrv9jomxuqjfk9ilfb89afwplg0r8srwo90jcc83h4e7zux4rbns2airst9dcozrhmkl5oct57ec73bf5r8lq2k3sketwpbzextih0jddvnwxthhaamjf',
                flowInterfaceNamespace: 'zp0ifr1i2b4cuxk0f4k8qr5hwjxxz9m61gq7zefnbgh2xg3o5mts1z8xs13svft22q6r1tdj4ew0m9ob5fnbry7c13w2mi2qjt3zm0js630yzi3s5tsmh7easygx2ohd4z4wm1mejq3kx5nxbrggbw8gbvc1re9x',
                adapterType: '9ggm1wwu7acw88dh6j3lf353mhxafmjlhk2gpku6vm2hv8r5rorqt27pztxu',
                direction: 'SENDER',
                transportProtocol: 'r85a94k1xxlaohstp1dywfkobijs30kj13s3o4nqmj785bpvcbjforlfrida',
                messageProtocol: 'w6f0p4ilesk5hndmnar12m9n4zc2s9ad2suzjo108x80d03l0qsxr7xzoq07',
                adapterEngineName: '78u7ywenhd1fpc1t5rqy40ucp9396wyoz7qt9wl7itmco6bbl0litw7342uma22mekg519tkyna6lg4xzvjj2q2e8nap7mtd4vpkeuc9sjo5f03vwh5fxe30pk5t8l7xshrcc5l5153q89r3j9tay1757612ggc9',
                url: 'at73h8atf52ctayyh9p9avma036cnckrjnyqf01th8wnj07l78kkuexxo09j502lfhd8l300s1re55t0pfxgp5bm3coomkbd8u7ym12gwj2zozwytzbhaqevs0tuwmypip9z7ps3d991o57i9ai74t42b04chjizlemptkcdpc0b2ovpxrexlxtistf7npl0m87rs3mbek55rhkupsc94eri2l5l1t2w28qqex26abtbu536dd6id9xj7xlh37huvxr8zg5j3xuk829nkny78whmhed8fjue04qkm46lq7ycwof6uqs3ewx8poyco8uv',
                username: 'seq2uphcl76va80yhzc1fbaqruew54s1jo5cduj4i264vi3g7vpxfr9wqxst',
                remoteHost: 'yqejzh5cqzk75z1l83y59o6ipx9bb341lmce1tqqf3qwk81x07t1o3b6u4cirvmoqpg84yhq6qw9uuznh2wsq5bksjbglviv5mnydq8b484c2kz1617jqsyeaqxtwvr5p53a22qlucpy59nco7g1ihb17p0wu1rx',
                remotePort: 9760588041,
                directory: 'eoi7wi8nkgivtwt3iwyrrjhofptpveilt2w47lt6j1ixz6gcg140e15dsid477gccg3q3jtzcom28d7vktvef05ya7fscrix9vqhtafk7flk3044075jyawu70wxuskrfjc3adpvn6zs125mjs24kerjmjsduatha5kp1gvqp8q8ylhjr5mlrle5zlvzomqqgvrhw5fa8hmbq68r8obvijd0dh310ah5nn2q1i5ahleghr1qb8e0mrfjctm75zsc0kngte6tt6x6ccvaucaqm32xzxohf0dwemku1b3gjnhfw6nr1bn1i3x2pja12h6l92euurzutu6xcozyigyuaww9t9a4g2h5rt7o33np5xlznxjfcvzbe59da5ydur9kt595qbqxxu4jwpneccrnpnt1aq8msdf7jo96pwu97mn6x4hcfk8gsgk45z3tj0aw26dmn9t6mx6dk29v173qhfwwk3y7qqzg0hdva12pc3rbbi9yj9tcq49l661yojwp0vr9gh2h1iclaryhcawlz0uzqjvwzcjh3w1bhjltklcbwhju8osqcm7s1bvhlxlmdd1u4499cogd56jjdio2hycu5xu6yxsi70tvnocbri28ll0ji9vpmbcsc7yh3w1ayrg0xsbz3et49wueqh15lzpl8hpw75jsrlogqd4pl2l1xvrzlo7xo3vxv16asd8vq8hmowufuqy3d09sftbqihpp6gi09vx0oc9wu1eapnohe7g4m9ql7e6ote5gwxhdzv7cuyu5odfqbeovnqzl8pdfk377mcz806kd2ooae0lteg0avkls86rapqh50zlttnfvtii1djwk6xgfysq2fy7hnsjpx71sesyw4lldf5delcfsq6lq6ujd96yf79pblisaxtfkq9bjgwqew1yt9tuhyhbzi56isji16n1241ej8cfutpqgtql75emxj43h5dpr12qngkyqjuaw9rj1shai2ho7skqho8hwb08hvv2ejgj55p0wvdhniw6g14ef',
                fileSchema: 'ry48vln1x6a7rx6ftplz6t2o8s7bku2rvs30js56s3mtwc03s41kqr1ydfhd647o3w8yyd3wvndu4knlakopjoq8kdr82eg07en042pore343kqp4pa5bmlfh0802mars68cbaou9zkgms5y0v9x0lmn79ujteibzp7yryahjr087h8s8cbq7wj4i3qqlv8tsv3af97so9pa37ifswpv8bc9c6epha0mec60dr0ehc1jiyj4pivjhlo6bv3hclwatv9q8wvmkjpaevkanix52ni41tx0tot6yslu0c8rhhf5zos9rfhk0kk10mdhi84yelq389hjo4x0nb4lzscpf6rb64w6r4n55iiha287tmq58volj5b5gzeef2og6ixg3963v2hho1dq2eocx79kye6zdrpc9kol99pg7yip5slzj5llx9inwtdi41871rus7xhoy4ief3ssb0luiddietls5f3rsz6bddb5e57sctfs9tz8e3zcsnha9ja0fj7ulp78wbh71e9ypu0uonj3yhv6igstmkskgfgxyhmzs4mmyel499vte4zrhgv8e1xdt9ssegjph4xmruhs10v5ibfg1qaflv8ydys05i9y576ppnv9ki8gh0tsvxv503unbfrvq88hvreaml0rok3ecse310g9g0sz2kr6e3lee99la1tl4050gi5kd6j6gc7fwvaohzm6s7tjzg7vs257cs9pz6euzsjd0dh8cx57avi30z6bbsm8ko6t2phmfsjq8i5lvz5frodya1rsyats7itkfm646jggia9ydpwmzw54zyv3vjjir117iamd94wwt7ne90xklbzgazeot06ps0gn8938mzaiso3sce7kn5id9fc386ih8cqk9nzvhoy1srares4gghnh4vuxe49zqv7741j73v8w9gsd2dwbwj8zbm01kuvs0z61pcmmycgw4ck6jo832pabua59ae0sribuacy3nb83h4x2uzqryozewmn55iod9g99yg42dfjc',
                proxyHost: 'qoexgo70nxect4ktygwotnstfja7bjwxqfgtvwb8djzfw06shzpsa8c30snt',
                proxyPort: 3487958796,
                destination: 'cyr2zwuvxuhovhynthpxsbfzp4f9g48zo5aowvv8ay5wcbcwags1rauthi7xavflh3ge5i9zzyspj93epkasm5t8s62xci4rxwms4utcvuwp6715pi5vz5mdx1fme823imm97rl989kr9nwe1eqhqh8zut24t4id',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'md0x7gbu9969zueguv0nciq49zskn0z8w23a6zow2ah6sbrz822uy271ysdhl37wr105ha882mvos5fv0uoc4rqcuatv8737lg3hid47uooq5bza92j78sn6b3qxyhlfnaaran0azbd9j9gqqx664o7iwgyje0si',
                responsibleUserAccountName: '7tgunjhch0pbwvqfqx9d',
                lastChangeUserAccount: 'f2kjre5wmie35t1w085e',
                lastChangedAt: '2020-07-16 11:27:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'j6tqte3n70jlhmjp7tlt1k8ayzai0ut6g9xw8yemlmsbwn76nt1pgugaf048feo4t17oi4jol6md0kfvpzcuagvctpuewekcbw5goqs9384htppgnvp5u1669hctz1mrqvu7mtyd3y6177i5cx5g2dpc18gak5lx',
                component: 'ysh62gct1gotrhsa1ni02cz20gs4kvimwo7suzunboe30h2ysvltu6i0gr1mvdj331uny0vbn7ysdxbox0nm874n61kvg1bbfuh8swev3zxkf6lttjlqspr1va512cvugwo4ubf526j140afr5ra2dkp5gb8a667',
                name: 'ipvf6igt4qpufleca4x465qojjb1mebf4469pyog0lfwk75nkpnqfver8ru2sjlb0173olljxvehbpjanpda02ndw7s3gofvupujczcb2vskghmufiardeasznpm8mijixhl2y089q9i39kj3mxxvu4xmsnoz3t4',
                flowParty: 'utmr93eq5iyyyndupn5yq6nn0a5y6srvbbc30wf1lr2ausvgg8px8db44xqv522bdpngw6xlsrnkce5nqn2iyubozoq5cc39b9e6vbrbtimi3ci3zis2m40yayecnctyjmnlu3apt64dctyc5zfug9tw3yzd3ozc',
                flowComponent: 'bkqs2ql4gjydzpxd0gmulkzhtqmkz0e6hup3lfx97t367tk55cava2ed8y6ds355fsmz79zy1hzt5heyhecjyofetyw2lh6jxpfo8deop4y658sjgt9x3704ffoyfkhashqi743lw0hm39ne6szredssuzyh3vj2',
                flowInterfaceName: '7y1mqj7s17phtwum1pl27rrhzrxmp1sa1n26t8jrsh8csq4ngdvi1crvb86n9y4xrgzcmuist64h7ftnjv23fkpjbxdwuar7cuayvi388ii1tou2x2gebx3r9b3owa4m0fd6j6myif2werx1101xu94oyv1fen57',
                flowInterfaceNamespace: 'mu191nde3qsp0ahio5dne8rr24iz2la7d0fhva37w2bkg38ws6il43aiketbz2artmflhc0poneq9ndcyrb7aapdg8lk3t3exj5h62p3ahp8st9aygcx21w6w9rye8kzt0wzspt4xf49uisbr54nogvs2wptci16',
                adapterType: '1yt8ujx18xgqaxsf8rtthzn8na59zlmtzuy3xkmxm2dwrpf3vywy24mx81hu',
                direction: 'RECEIVER',
                transportProtocol: 'awr5yrzlz0qfrz5iodbed0xcjjt7rqrntfkevfcikax5ik69dmchwkjhoapj',
                messageProtocol: 'eex9toc1uax342lvpio1fvb2y0ocd3yduwqoshzkgb4ry3io9nziox5lfzuh',
                adapterEngineName: 'sisvh5x82xm4j5clu0lmhhs98k351las0emssu35klmxzwauldz4holjwv59xtyu8n5z3zmhgses4fol0lik1ltrlg5sglzm1t2nfavw22xnqjgy99g50qrfztzz880v07yi1mxpqf7uqtvx4rys8kl7twqqthh2',
                url: '00cdhhe7l19gq7kpz3ow5sbza4ninqex33sj8gottbm2r5i8uyzm591rywly5234evp7axjl6b0olm66sxkojwvxzjtls6f4r687tfz012on6pv9430edqt565p2hgfk95ew16opjc00o28hgqff66s2ly9qq3dbeujwqhoaciwt33yysyb1syp7xcvcqdo3ntfpjyjipkb91zl0e0h9xp22v6d4v7uyavi20latq1qdrc7vwww2lss31xpo5mco22s173yev1usm3d9qbiwasspime5vvs1w00aoxb1ghnwss0fh9evgijytxk2kmbt',
                username: '29hfse1iwqy3bky6e4cjlkm9bqo3mn9iprzi3vzhk2ljt7ttgsojuounnube',
                remoteHost: 'qqhpafl8wqyra6jjyqjf8fo2dxly8ft3fvfydno4z8ezra8z6sdsxzredlio6hukyqi854oggpl0uwy1dy3e5bk6hjwd6qq85iy66x490mjqwpwcoa1sa2fjuro3v2eo3m4071us0wp8vf90eh5ctj8kj7ktcofm',
                remotePort: 9196761766,
                directory: 'eznmsuqm6y81513afc5f16qhgg5aubnhodyt0a2gjqal3s1q7d9wg0vcnj29tkpqmlxz7uearypoindbwobuyvm7p01x1mhtohh2lq06rm89bunkgwc5gchp335i1ma6wxlwp40bnpym46f34xn0wex4aqobhiuhbgv5ciaq0j6rpakrim01w6e1h8optvv4n3qprasdef8z99rdpmp8b082nqd7kn1sarrmqs6zo3cm6g3sygkfbysdjnvpts422bbeibwpvjp6hwj429r5wxzsnf4unekr5123xyy5n7v69v3mblwolm8nlbi38kl4exlb6ag4us26mhpozs1tc2ugrtl4n13ufme90mi08z681hyum42qax4o0jg3ebo02g0lgyp2ec6kya7bi5ow9xdoptqxprysodiwx52184nz433xm52wyle13r4mrvo4gnmli7x1ntmdr8kzacrkj57addtdda6f8lwdkpya661mfm19utk9dboxsgxf0hdlxvm19cqxhanzilh4jqxiuiq8fmx8mzs4t7feirfeg8bbd4hiqiifyavanzp0atr4nanszhgfawz21nzcw0nzsblofp3iqqlgjyl9jbubhjmu985nnlsaaqzthsqcacj8qx75143amz4ojtcy9zuoupxid9v5q46qrgkryglx3jjw3fh01nw12k7g3veytmxj3vrxrllfg9fmv9f62qr1l8fkde3o2tnn22vuv9gaxrt7m8n0mk44heoelp840escaz26vbrlv3aimxaw8hejuiw3tnd1vu65t46clwizmgl8ssqicgcog45ez8og386hjorinfi2z7lz1d18f6zpiif0tr3mls5xijr8u0ny7d8koxmcy7sjwlqg07bst5nh4qjmqtlj9xqfkje4am90zzrpbm0f7mtcy7r22kz70lkd8e20ln78n51ovpanvtidw427axrrjiuzc2mo2qep5zvuv63mutnbjw6ognkyvxoam4e3d4lb74uhx6wnoyh9',
                fileSchema: 'abozdt2slahck5cfk2w8ym8f1h2iyshe6oltmgba9j11wfwk0udi1qmxitckhacrmf2lltbwh4qn6r38tghasf5jzmqy26gemglniim5viry4c6j5uminhr8kx7a39x7yxg32oht3c227paraosuz2a3sg7p3w4zwwgg8x68w3prfr5xrrwouk9dv70vg3cbfd7tnx3gtttilk9nsafhqa5x608cyosamstlrncog3k3x0g921g2rc39p8gatal94an84ntkulz3phwsdxwluqgrxequ2li1nfn1b86v1o4afm3l90mved6pbld7m8egezmvalbws0a3wvdq9fc9ocr7v1ivmldoxix63fwrhiz7z9nxnhsu8b80oc5w62tpbm266fi60d53v1vix65skchjrrm8tt983v0xt9jmm559qklvr5t0obiyqquh1zsi1ptxi21owb1ng7kx82mw4ug9xbe9jxwh0v4r6m99sgxzfxu7b9jaazy6ogu5zhh5sjepdae5i9idytln6itjj4ri1b3xofwg9nen3r1q9kgqddnh6odnl6lwtsu4f3ayqp74to998bzgmzz0ulj01z2z8lgn46ourtup33k3hhejzddm5cvvsdrippfrc4vuadizznloq8vm78x0xlt1gcwzj732yveul378ld455bdjtk5y0wvrl160gkiw9vukc6l3b5ghl31nkf1lbhi0zer41e4d17iym0j719iuezvypkn0wcsgf6b7c678xftugdcmewd8c0taxha2xx4lbjst1ih7i6ntun307i69uu3vffpu8xjjup46daz909qupn55mys7qh9a453dyzl7sb2132186aduyudlo1uepfooowrf47cz1c9rgo56tqgzfhtg9h3cjowehjvrfq991gw3fgd3j8ay0xfegq2ficuw7aqwiwulwmhzjbnhj3uhic7h7vu01f0b1ezqhxr6td8kkg3v67jpee6ykzaf723i3k0db4247s1l5bwdte9q',
                proxyHost: 'f2s0towhlk5jua904lbyp2019q8uygowbjcy227lkfgjou6i0ck13e7tlkyz',
                proxyPort: 5060026656,
                destination: 'o9i5nd6cflmueudhwwoi923yxoaxw3jm6xr443845kpy7rab6z8ai9btztouys5fh0niu6dm4dtpe7m461dhoowat969mlkyublwm8p93loukiywjved6y9x1i3j3s40silglnqb45ugdjdf9ehhiqkk1hqqph6o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6a980ygzhlx0yqjfl9e0ahcnzrgdpc3qq0eb3s746qwjfapvqbcfuqhhenfy7sz42eglow39rnsh6nb80og62xprk8eq2qn4rau07837czwxlhfodpzua0f3twrtgfx9ffwiwzlpixp6j0prqz2i1sgf3afejp6i',
                responsibleUserAccountName: 'qzjyrrzsflhe0rlat1mn',
                lastChangeUserAccount: 'maegro42dw506rluwtfo',
                lastChangedAt: '2020-07-16 15:01:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: null,
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'gd09sg4n4u7wkqrsr091vtezqdjbm22khrcwwsla71zaaj0xuzzn89c0vg8vevjm91kq9w355bmm4cxpudsqy77cai377ffhyazjzd795vl4656xk28b8zlfldfu5fkengj05861f0ldwb2pt0p6olbhdtz4sgrx',
                component: 'lvef9kbks0q2se5y2puf9xjysbrwyeyir0vokb4gbrusbzooktx6n2rer2wuc911a5xdc4t8dqp1jg0rg88reo54of0p4sya1odx0dru0v1tkx0w6vihqq0ogyua1t6crp74fro1lpfbtfm0pmg1y0fo0cb0c1qn',
                name: 'qlxq5fjlgdpazg4elgufpdfunee5iohyihu6ef33o6grehksojkx6poo8gugt1n8tfoef8eod3kc410gdd0bicp4y131uvhoua1v593sxvpairvdwwxv5y12lfn3hlm88bepq3eh8e6dmhnk94xjztk83dfn6dg6',
                flowParty: '9ujq4qq7d4s0b2c5d26y6bpsrrznvzqp69mmyxky5v1iv2wecw6d4m8borh2jygvc4lrhfzt8e4sn1hvhonr8m7j7drhe860kd8x8zorrkvwxjdretbchqz6hf2trwj3hvdszgylnllib3ytwyw4ic1zmlvsjfkr',
                flowComponent: 'xldits0372o1e4cl5hypy2v4mqn6hpvdit2od0vjkkdmuuqm9lxlzomyok6cjws0ibphtvkdb5f14odhaim0ouycdbp6n5nna6qbkm47315j0k8evqgbr2qantrfxis8slfyqg8drfl0evhykc6v5gwqb6xa5y1m',
                flowInterfaceName: '52t6st7596yyde120m40ubyeepqwkag2cyntwosurry4g0huyob9qzn9bcud28de817ptwbh0rz7hn2o9uq3hd6gaf6834qq9bxjxkk2ghdc7vos2xzqll4l1yfybwez4fb2ord8ihh2q180o8032kvw7pjwxs5d',
                flowInterfaceNamespace: 'nah6vva65ouj44cw91sfiatfp62zmz2puzlhttoubce2fxn6qwt452tkzl25v7nelkh7qdss5mqf1miwsz90afaowf211f0p4pyvgxybbs8why0pjgwkaxw63bjsc9qbjm6yb8yyg8gi6qyv4e8rhlz2at2vfr9i',
                adapterType: 'zq3wikv0nyjyskygey5odoro1y831auqyj0cztoxqnonciq3x70ha8ege06s',
                direction: 'RECEIVER',
                transportProtocol: 'g8mji1tbupx7a9sve2vvmznvvbmamasp5i26kuzr1b9we5cuptpqtuq7bvps',
                messageProtocol: 'z77z28eot2c01aevwqfp7u3mschamngmnz735nqkydnc5pn1316n5b3140vf',
                adapterEngineName: '39en4xx03z116kq7i5ty0x7y43e88sc4ilfqczzd5dn4p1dh9kwukhkwxtkbgtp6tgpwmu08075dpgeofk02x1d7vyaods3hk7ubg11rqzc5bmcf91sojzkmwzq1q7xpgoho2obm2umiscjsg4ymch00hvk79xlx',
                url: 'mpp3b23b9svqfl50gzid5whgoj7y4sg264ge1ckaazi7xlod0vb7qp2ty763cekyatrzvu889s8v0txbclpzd1sic9yl0pkcnu95dyugb87olv18in5ld22k8u2fgxyb823xz45hcxd2g54j22gtx4npjddy6717mk5hepmq7f25vljrwfivwjdr2bghdwguuv5ib27m77vu7jkm03e02vdkcgsp0hcqm2g6cyz5a2jlpjm3diadyhdpuzgiot2i5nfjp0dp7ilj95gqmefmlycgw5h89foqbp1ulj5bhev7v74tyftkptvbaofatcje',
                username: 'bqy0wurnxb3bnqz1j958zdkxxr7ta8kgkdmrpyqdyhwewpstt3mnx25zfmlm',
                remoteHost: 'vj6c8s94zvktpiqbzorvc0yzru58bj9jk8i1180s7yvu8ydpa27uo6in96mu173pmzas7q251fe7gvbrgd70vh7kjtv6u0izy7mwd17zflatzwkdk7uq4r0pl4lzinzkiacfa5cpx997lo396gf34lkl7dq7ce1c',
                remotePort: 2200725735,
                directory: '9qv1ujdemhwvd161qq8px5x315ok93981vurcajiq4ftbprv56npy78dtr4f6uvy1xizzakeqvwb23drfvrey6ro6n3jmdu912578b56f3tb9oid3gn5dufl2t2h30ybs1a7ugbpkrk2rx3wm2f172utclxswpkdydx1vqb1wkbps5kwujbgrc4234ycbof7s83ls0ay8dsvavqbt9odk9voacvzhqg8ezl8nz220t7vp5n532fgvbu5jn7ifsl696fwkw6senmry45k2wl032odik4a8gs9sjkn4i7c3j63t4hfnqt1luwev69bz1f8re538o3lotnefo72a597zqtqsgkw86csk71j4x5m9eg9vdbn7qbd1nix3ryu5urrt5yk5oo3ig03aexaj9bo1pad3uz838sjh1x5625po01kchf2v19vtg80xkwkh2jy3tszr74z4rwhsk6xuejcf9oweou0v4qcq6w2jnqjppca6fqxpzom7v22ivyuvrd0do7tnk8t085oaz15lcqs3lfyc2zyb313hya9ol52uk8bmlzi3ivfoueqzujw27xskyfr5m2in8dewgdkqhxrd0kohc7tesoqzjp5hq3x4b9aheg847sw7zyon0nsu49a6yiasrsadpyevqdu0k0fx3xyu7v12vih1eclbyp79929hwiqhk8i4nulqxjfgjamu5i5u3nsch2rkkeng7ex7ipbilg3n73nxs0a9692rvak1z4ljcsba3qem9e2vzin0tooje7irhf3qjjol1m6oc8cjz4vpwao6eecl4esu1avfvhopof8bwzyhklowtzy6spr7j199khbm81hrkr7m7ptbdm2564jwgqn86tamvsg9626u0oqjhsckgjzp0fql29gejuauh9g4nu55rbwl188e44emllryglhtxln2pvypxsdmnvcqkf8ijtwnv7hhamoz840yyiy6ca6dydwa79rs7me5isawirdwes2l5o3wrpem3n9jx0s1jaw9exx',
                fileSchema: 'tmn7t1r3dlxax2owlk06ultbmywczrejiypf6cd69o77z5lcpg92ghova9l9e6dpu6h0fdbvk1indhtv8mjh12tv85yq1p3a0ewqrmzdtrsus7yy95ry0i6r3fenr48b5iat2ntjw03debnqnbjamr3xpwzyunpute14k840qqnnl6zaijhq66lvbf70qwqplp7nwa6qgx6lz0v83jo3ecbxq0glczijycfmlbjahsbd78ualmzomj5zjp11h3x6a9305zadfx09jbg97qmumbuwo6kdro07m7gjes6rk8mqayjornfjgtci2y5o6pctivfq2tqz31qt2odenwi5myetc82h4lm3fj0id4azpwroaf23e9vde4i4koaxkyicqreqf9qeuit5ajwhziz38d7yf6pez3pdfkmbpknvhxakv97rzh0hl54o1y4hqp1km3a2fgdu7qwuq16vuidromus94tn8hqh03ujt3vy40ruqxuzkw7ncmbccm1sraoij2cbwyfe2qgojegg0lvc5y5fvlgzhsnem6qfbpbz4be1m79pr7s52q73ard6qfm424xokuqdq7gblt367s69jfl3c0ml09p5w3ywupfsm4taapav65zbb3b5d4hx9vcm14shp32i1xjfrurmx98klk7gpl13clm9loy155nzj2mi7rbtx46txtb8395lngc9kfhfrxhbbuv1a5kex6mit8aqxp1798nkszbsehq0soinqpns8yd51ykd7sbsumhd89obl2if44f94u3ba2rup9a8lojlh61kb017ua7pmdz10fqzftssum1p8msk7cyshtvlel2rngv5clgiblpvow33r3x3lrns06hnadpam8f721kr00uej71dlf767620su9iy3eul5xt1gxff2mael4oxathozn5hagd62ej6pr2xhmn50j83conn0my2lve5ekp4is24raoegkpdwidzvghsyzs806ym0kbpqrokxycuwkwcav0r0iojchl6sdo',
                proxyHost: 'h7zb33fa9npkgefb1ts6eqmi9fkn299nmye73fdukxwob31lmiqym4nij5v2',
                proxyPort: 1979361490,
                destination: '08bgfvdcq21vzedkbe76mjw42cpwlzi4yevy22nzqk4zlpxiguy1q9aqjbrpa3ja2po49hpz8sxbquc0lvzppofw7silcape7vahxz7ohxqnh074n7fp7pdghvh4faezg6pnvo5ythz28xx1ordk551ikstef966',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rgnlhlvojbcwrdqyk8xpuozh8qglkiu88u0r4bzkyki9xa0q1p739lofas42gziiyqyuw1835ovbu6rv4yp8i9vp5vee99g7pxoyeod3olh33ttyia7iqc3pch04z25zl3a3nqaxx1bvnwg31sa9dg0xg6es7sc4',
                responsibleUserAccountName: 'efuaz07mr85jc0kg0qhq',
                lastChangeUserAccount: 'b70bqevbfirsaeqgvloo',
                lastChangedAt: '2020-07-15 19:20:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '8a78l3muo6ohhar693ewuv2n5ritvpfuc2xj4a5ibdwoflf8az4toobfpo9beo8vf42d0gkl86nmn2t54cva4dj1jnp8od3e42fzu6ugsodyguxotmpeed7kojza7q7auvubtcsj4dp4mtwwfbbi65otu9n9nk5y',
                component: 'd45w9qe8f9yr50720rttzrxt8ofdhwjprzdy2qx59jmrl7h3iyaxp6z2h5ddjc82zwwid2zjk8nbpr3bg3r5ftf8yqhgsuf9jmub5vbzsvtfrucnam2pwbx8n5l32uydmsf6254pxdzj5rym3oqjh2owbfgkfdjj',
                name: 'm087t2lxe73880dqhguwg54kt1bc0qniiednmw3o0hjfslugvlvi1zu93fgmtuchj2y3il7zxztnbn0kerq9iq9t5tj9r6wrd77fg5t2wk1rnfkj1q6fadt5ewqf273u2ele07evqwhvsq3wu0cvefxqc7v658e7',
                flowParty: 'ee701a58aqyb6jcs3p1cgbrkf90aat5azmjcajg9gxcgkcjkdhxnwky7474xjp1iqm6ytv057rtxoopmhbc36vtikugfu5o7ser0fylf7zka4b9s94zn992szoom0wawxvmucn4vc03tu517ugibximy83x37bhp',
                flowComponent: '9zqfktudf7x7pmycur15s487qunpx70zy5jljko0q9ikgkb55ati7dzq2jvr3cl2eij203xdvcygnxaz10tnamd7yvp8twk1xphb9htulxxszlu7xvc9v63pxqkye5a6cf7qlvnh5g5iwl2swd25fwatl4wt29cx',
                flowInterfaceName: '5hztyq56kwr34295y3ebzxaipprtnpg9o0k6s942z4kp3epr6xgu5aycrnqayx8xe9tuns86x2eibywrqi9t8f9ab7w5502ephdva4i1f1lhrk7m1orah0i1c59t0pfpixpe9ur40k33058y189ymmkkoiu0fji9',
                flowInterfaceNamespace: 'ic76abgxi67dstl9bgphrolarbgnz2v8t51oa207jpoy5048ag1mdb9r8zsqzulpsyf8gg27gq3vicnrpkoc16azkjjpg1jl1atbfzdbs7m3qho4gkanoe5j1mddwkpx8j3f4e7g56lvm3lftpoyyp1mmpe0cu4m',
                adapterType: 'jc4klxnj692qzv1eerrhjupjrp390vdprn2jflxtww9px9j0fr6iwsib8yl9',
                direction: 'RECEIVER',
                transportProtocol: 'vju9yhux7ghs8b2petwkpaexxp9d0b1uzds7g1it7jvkk8u434s92jf0jv37',
                messageProtocol: 'x15ccea8v5j2itpu45yszlsc8ofdi1uthayc0i79hro28autfinqac827bxm',
                adapterEngineName: 'vqaaoay5ox18amd1ccfci003we6c1eo9hmqpz5mzig3wfov6r09sgnhhgikfndz9f1eqjvmkozqd2nzvxfjxuaw0bf5d1d88hqv6jc3pp5o8wn784ci7lsrtu32nhcu5afh6lou30a61rv4lf0w7859mt1e2ho1o',
                url: 'kyarwl5vd4na94a62zlpszk8qii74301vdhocfoy5gsjj4dxjddxgdwql5plfhreqcmh3ljcoki0igr2zns0z4terlj9z1htd7jqczi5jrcqgfkxpx7ei1aczvv95fmbn2okiqx3odyvtu2ye0e5u9cjhyhc9n68uia2mitygtck6lvufwfwaihrqtzs6jf4xd9sjjnalg4a2qi5vowu5yxw0jt5bmrouxnq09oae0a3d2s16yqi9hgps4e6lcnij9lsefjk756lzuuaufiucwam43g379f8l18js3soz7rn9hayjr7dsujj91t0xnjy',
                username: 'ujnlgm3l60x6ty6qo4lhndb4y3524mhtkpqgvf6r5tdzrhfcku9b6zh55y0t',
                remoteHost: 'ug0zfar2oh5f488es0njbo3som5kse7x5h0x869svxwxuc4avtiysmav0eyrno2g56vwm65j476ogap2rfkdna2abq79e991e16oo67qiselbm9dr3fvdxxw4kw1svwrxgrgp4ppygqfpnyrk5y7a0dox354eo5h',
                remotePort: 1431807597,
                directory: 'amfr446kk82eyslq0rwdezg6ln2fcebpz1idhjh2pl2ctucq4p9s7spje9blmc7ysqb7oq9gihyox23ktx8ywel73ep9dz0g0dbclu2cr61jaxqwajbxe19itwih53fywe3zdjvj4owkrclhmk5d6chskz89m1jw760wq7qcm7hx7zad2s4hydytznywnp9eipq2j6a43nbho2ab4kho2bjbp22ovjkv93n9fpv8apfk5krx0d8mept3t834u5wj0bwvjn2l9lbep55050ur531yd555dyfehzk5syhdr3na2a31iakqtlwt05apupka0f4n4l57qxpm7ybmj5fokmdo3edqn9p0qe8r5qzx5gt2a0dyo68omztmmvafkc59ssto1a0ehydbmg82i9z6n3qtfxikiqs4eserumu84unn8kwzj66lrrzxiilukkdjwpyktzlso9o4l6jph4m4q0in551pkr0k4fk4hn434gda14xmmcdwu4yh2p5n3u6y5sqp25w68fw3kbg68859bdl1s7gpta6k5m9jbp3638fyt5wlcji7h6ofvhs0l6vmy5ozbuiq5j9e96jooedlo852ozy3t0rr2eq9e8v61617ho7mscb3ga8hldp1alza2q4yzdk6najacxppwqzk0qkcxd09c7ssh1v85iyl4roa5z6gchmchhcr1a9o615jz6z2138l955es8txbqycg1o5g5uog1u0y242ydfpegqfdc521lo652lto38qh96t3c4ue3rl3ymrstrg7qsxxgbglhjvkw5mim8720lzkd81t2f990fsrw58ugygvbwzp30nqm8g3qblpyqi8mikh54ggjk336grye6m44ejqjuiavydfsevp5vz6dinc37hm8e8qjnuyodmuea6q9rb79k9u1alkefaoyye0zagsmjk1sfzunvckvob0wujkd85zed0xn6mbx63qep1ke771e7nofz831ix8h8tszc48etdauqry2m9u914xxg6oqxo',
                fileSchema: '14bqc03jwswvkx7v7skr93vctqivk6pmou8i32vf909xjs1yno9mcsdwebn4qa4j7h3jtuizhbum4bt3jugvpdg4k82uufedxfrpmujmrwz1gxzh123b5czv2c6b4msalg5o3hvh0lgpo38vg1pzmvrw7czclaw6mxqtyv8layb789tp2pkhs4hi4sa7m6htqxz3evon9umtutrow874hucxv75htu0lgmdr81uvav3uj7oh2ozef3zidmdd54nxydtwkbid0pk1co7v9oih4lpo69k1czg6lwokddoeueiaych8yq6uy2zqicq5n2cfbo4ffumtvfqdc4jjxrwfk15n6krtnsfulpzyzgjq9pyoruhdnako4s1pmyffikuj0r37oo8l1p5hbaul7b1igw2u4gsgij2d1c9tg09q1tu02xki4f6cj0x6tlwwcak24eq25045xw873piazbucmpvrlktpiwfzzy2dbpiav00sd4f6g7r0lrw7zjy8yyvyqbsxr8h1w50h0r4s0uvd5v1e716fqe0fqyl0i2xfhc3qf7zbg4ced3qc7ey4jl7uy9wu0txbhlcclv459husg03erwceo13dtjld1cwel1oxu6mgvouihinjarra8nnumo8sbf8op8rdug1k69dzxc5atvrcvyolmdn1ft3ii4m63c2quieesqlbmuxwgtg81s4v8ljd522xhe7snowqr3ykqfpv090ohike9iub9ljdqn3oexv1c5t0k7dfh9amhbdpu5acq9e1tzmo31amidr7dbt2onvc16wpvpbgv5rnil6hqmnpfl6zy1z5f3p5s9l87rthgq0dei7it5iuako2hetc2u23e8iyzp9rc1qqya53blzi0r7z43nz89w2573oiihu97gn5ypl1ga6dld31iu0gpy29rwul8r4pij6zqd5sv4s9hf6rtt00wwgjv4t6zgzb5gv1gnnzq84z7n5jvg3t375478jdopl46t80dtbq7wn6ghmwlx22den',
                proxyHost: '3y2uqbls79llnxnyd6wp7h923jbzlm36im50ctyij0cfcr336bev2svkysq8',
                proxyPort: 4074572424,
                destination: 'eezq58mowtkhwq7hsvgflmfqonu8fv4cwb7qmv0fdsizo0w5t5nf6qrlxwlzmzlne3cy7f3mcrxyhnkt57zyhk2ebtyhii8nkemu5383sb712xb0hm5xy9dfniup5wqlcc3xlr5r2pupeov4z332ldy7jc66cc72',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1mwak4pjr7ncdcmwarr989wahkz52g2r9pqqyunqbl3ldhpukgie932oteq3knqk32crlfuaekr45pgaxibm5beqjxiey7fs7yiwosdtumolc1tx1ofewwphr55w1ukzrxjfvce2qe5k1c92tczswsc0iosfhjy5',
                responsibleUserAccountName: 'jchw85a9m6qvgewievvu',
                lastChangeUserAccount: '08010omsmz85edvpneq4',
                lastChangedAt: '2020-07-16 17:23:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: null,
                party: 'y7f5lzkn77nmt42wn9ozs8422a98d61kb0re055u0l8xfy813ejb9vja48jw0oop8y8or2pqijd8adffozg7siayqajt5gf30mksa97tbtl7bjjuo1sozierhctm1zc09ot1boilbs3up3sg282e1yrl7yrp3vy0',
                component: 'vd1i7mk04e9te0f7gophwro4dp8drqlbud81r42udwguu15j9t6rlkklpgr4h3ocaldy86gc7503pu702c6u82766n74r3j21wk62dpnlqobye7d11p8nxe6dqkiph9ppca9jetotlxxdwbdkax0rnzks8lk0l9v',
                name: 'a9p6xzb8ksluaqhgqn8aoebzhrlly3th0dk2zedtzsht2m5bft7ih7181kg1bwimso12h23rx74ac7m4wuo11fezl6zij0fejsigsrmnp6u74c40cqyzhfwfgow4g4xpjuntf46egurwir72vqlrpyhofe4zyjdw',
                flowParty: '8ifgxdg1485hq512n5zg0lil45rg8iyob1e55m025gtjd82zkxqcf8qyn2toe93pn40jg0j9juytda7bw35vkbfuqkrzdkjm4xm95hu2905vl29dyf8i0mxhnekrlj6pfwkj2mfygy6ilortgggvjs2e9b60gjqj',
                flowComponent: 'wyzblm7zkih1sihy91do7lekyek1uipdica7k9lafx0zuivchbtptoqlwkvyrcjb4suhfm7zron83fftkg0105hud3cu4sq15nzkvnaaleo8a9sd5099kffmqaao4zugvmdc05fdls6nw8mq45ujhvt6nf1okbg0',
                flowInterfaceName: 'gzlnhnevfk1u5a85wz674575199ern37yg5ln39koabz2h9pitze1rkzjjvs162st19gxfok40x3aswtwxdbjl73ees44h6ajibbqjgxtgg080k6z2pj5rcew6mtly0jv18tsn3s2l9ajzcs40l6x1mo86yusppf',
                flowInterfaceNamespace: 's6a7mxbmd6olayoc4udak3i4djsifqkk0o77yj68og0tcge40r280c0g8awl2usd63l9marcppcjxy17c4ky78utagmo9lmuke1wk0q89vukf38hbneyij381a8h2w16agh6ny1rbejbpqhh5logr2rsz5rm2di0',
                adapterType: 'q7r5ehs5mmp93efqg3g1w75m8kski0yzj1ng4nve6uj3h586i0w8fv4negkh',
                direction: 'RECEIVER',
                transportProtocol: '1pl8xtcx0e21o2ee0uhpd4zoigm1sbkxx9t8ju5rfc47ksgionoj7ab1xvl9',
                messageProtocol: 'ncy30g10kmc7cdoaaz24gzmmm6af6oqh170wusjga8fo0c6674br7x4w8hqn',
                adapterEngineName: 'b6i75u80hay430dmmikzq854397q8f10k02oew9wpklso6gisf4anlnetp6ypdsadodtt4lma5mmdi4beitlnedqein7v47m0xpb4dtk3yyz5jznps5vdl899urymk6wf5yet6ihwrb1q26kfserwruo8swpc8ps',
                url: 'b5i5i6tusq2ldgi8mzhfy5y95xy4z9sxta8mwxy7m1av5pq3b98pbpiohp2r66fd3wpff8tkf0e97mmsud6ybtyhi4ydtwenx9ad6oy29hj9lsebt22mysliyymtk8k1avqqepaoidpnt8z63ozqohc22m9c4hwh7yd4yaafk8qoirj4pw8kgb821fiv4rao4osim5bugtm6xs3at3m2s5g7ee2nb90bqo8qb5u26ptzehlrjhhcxkhizv2ac1os63pknbpmibr3stznn1xr1pql4lepksqbe6u1a9sxma6y38jnifcent6emhpnhux9',
                username: 'spdtf9nft9qkpd4bd1jwf46k474itngcq7mfya3xher03y5ouzbpkep019hg',
                remoteHost: 'bgvvi0flu869wpkzve8b6pq4ej23hku3fzjipdiy6opzfkrxih0afv2ks7qr4n3vntpp7omboifkz8v5uqkjta0czbd5rgmkc6klunpzwrn39xj3vdrj32w9xpplprc1j5yq4quzlzk3y2jf4dbdm5t8o2uk4d5g',
                remotePort: 4041176410,
                directory: 'xadp3a52ktnqcx4k4sk5smerl9s0wry5mbsscqxgqm45zraetpb2p7q53s6oh333s7nvu47nhki2gbi3lwu9jeds940hd9v9ni28yg2x5akl773xoswd238ourckyg6bollh2fahbl6wsqs2kk4y9p207x5zisz1flpie4emj5lmts2ft8edr4tsrgojq4ti07x9he9av3p0k7jv46gtijdhkout1c6fsyj0zz2dgk6004jy5efh32gp01f1gftrh32932x38gqv4s38w1eetel0xo6lcc8qyl5d2wih9cmpnb33vmcpgvebc0ivz202rr3ym32r83mgmqgpd3qcyl2wce7aqj11arn6lcf5lvi0jqjph34mqrjhkrkkv6qfz68f2wyb5mwa2tgo87xan33eq83tzw06c1bvxpzmqgu10knc9jdg2hg5xcnpycmi170eg6qhd4xx8ve4fy2psu03nbwhv4r5uw8aluxozi0xzhx37ppz32gqugv0246tqjopn8ropymw5r36mdaqsrbkircysyy9erql604svidbea845e048kwxmm27swl2ttyfadfrar458fe68z6hz2q58q4bllhs29fduoaz9wgjqdbbtnti4g8ey2eaa82pslsgr5q6yl4zd31u01tdvepybx0o3jhyqqinxreift6rsptio7pcab11bli4xg6xh911wxyc68by6s3uvn8g01nz6e0ke1sxatj4aujn3yp6ae893ckzmq1tyzsdb64w3tnh9du36085ecx5tlhfy5ooyg0mpvtsuvs2xdfap2nhfvtkfye2b5zvaj8f4ojn45s2kjflql47318j0q9un3zgytg2eiufy2l84m2dx8ap5wm910wf4pzn9pxkv4guv0txkychif2yir66vuuk3nrnmw8qyto66634a2fjg2jwh8441hoh1rxem0brk0v0i2f60wsak8bqrdkah26ls83vucghbjae95rvrfpuwvkcb38ex2b0r53tetohkvjp',
                fileSchema: 'e1echup5i4a6w9adkb2qc39j22kw11q3k2vdb4rxfxubmof47qmksd78mn7dvwvzxf6wz7ufp1y1dgsu4ftdzkeitie84jgad5idiaby40pb2kvnonj7m3c5ag8jvbc381ps62ubzqqo0jcshmwkjk458jcqh9nc90ux2n7woxzzjuwzzq3p3urtbmfcch2yygteffa9sa0bmbi2bii46l8urh6khdahemlk3wkhxeumyfi2rhkohobstnxut880fbeo87u77earu2830gt9jcyup2p13w7im5xil1u4kx1fexne79uxt1ubo5vpa3qdsw0jx0hhvrugyhi8yomak2o1nijuv8yzr14mqnz6yylamwpr37dz2usm2sff1sctzw7xs56mjnffqtjrcbwtfa10imptvwq3t3h5fdqcjx95xcr8n0i9bb72zva1hmckw7sayxd57umre1ofv221kd75we8eh106viahd4m3d8bbjvaoosxbjoadiz2wc4e54byl9ok3nlaycf9e1e8bga0xbrt9byvoauavvpu4lmyow08tzn273bokfx2n7z2u2boyn4srb9t4evfq1jey0f3l4z8sninqkz3t87elfc3x9mdp851zz2jf75xmjsdrhnl8kz55nr488d7qjmrchfo4ei0h8697ealvinz0678nnoh4w042rug0dy8maoduqm4bq8i2jnjaeli7zo93aepsgvtio5mmqek8in3j23cs7gpqrl1waj1k5frzsux95rltr406382989dwaaibnp195jzyjdz98akcqoxlcehc4lw457qswf5zq9l41psf7huy4aki11f6t79gesdg76tkya8s90cdcdf07lf9j1tf3y09iakve7smj2afv93cyubz561w8fq8h3hcl7u7ib7kjeldl4ipnp0za5x34wjfrwmxef6558mwue7lzr1pn5dgze3eqyyc9d11sagr1jkvmmqu7fktqeqztim4lze1dc9q7a68mqnq95w3g8f8',
                proxyHost: 'i3qmhwl78hnfxpsxghbcmsmq1e6u1h08l7jokwel0e84ya2wxqqkogcmzzbw',
                proxyPort: 8672950037,
                destination: 'krbdu97285dueils70hj1z8erk9vdl5ogqvn2twwsnhtgj24g1u6n77aol8197i88m6swv3ti6jhl36f7166qc7jmevzsqx900e5rya2on8q12r6p5lv4iij1z5xviyseqdbbcgjr85bf761ecj9j0ckl71i9y0y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ejri6kgxpc14vap68wp3u1m7jq2oiv7vrvo6fvuu54xtp6su0b59x0tntxyehrs2d9s8u0rq9qron0nv0a91fslbg3ddz69waqwzbnxy8aj44eups17xe2etzqiy212wp2i75iokqsdcrl6swes4frk7it501v7a',
                responsibleUserAccountName: '1biscp70w69z5tythr0i',
                lastChangeUserAccount: 'tyfy9y50mu0e0q0g7jl1',
                lastChangedAt: '2020-07-16 03:03:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                
                party: '7rtaqewxiwx8ho110ply70pguafbnulru1hi6ed13pg5r2uomn4axza4l1lgi6kpixl9j7quhbanai9hwqifet5oht9ygo4fqrgq99njn2a08mwntx67j87opeuo8jdm7bke8qj04oqc9tmu7z923qxlop84f566',
                component: '0phj4psg3wrpf3srewwyolk0gn0zm8xpnfdxcdrgsg42bcm018hgcy2gw1ejkp69v2xffd5y6otooqaxlbvsm5v4fk8j0oinjsehhqn982iy7f0n7mijir6bxpxusq2xhu26jmgvu1koquyg80vxfesno4srb19m',
                name: 'x2kg17sfwjbk7wapn9s0s6c0fwd33vxn23dinbj8iehjsdwftugvw195ebe6i79u2f256h78uv5vb4ic1zay6u38lzbwfm9buqu5qzw0gupkwm4vr4bfbmhqr2aojaccir36gcgzzgr99qa50ibw23cqfisb9zhg',
                flowParty: 'lcfqzqvf5yye8jcezh9eeuidzuftxjtstparssaxdgqkepji8njltqnmtrvs3h93e9hxy6zwhhljhi7qtztfi516bxdfunvrdsau4h26z4t8yy3bpn9ank0warb53zx4wikujwty8aoq9pfqxxmou51xgzo3uc3x',
                flowComponent: 'ospzc6t2mvr5unhjg7orf9ild5upufawywels3jn7dekdfqjudi9xqqeoq59i5ikwwzjtjqlzaseiu0jqernrkwmbh6bhhqkl6k88oc5zm1hmgaf1e93npsk7occudc8s3yfbuxtz4ezxh6uomyse707t3zoz3j6',
                flowInterfaceName: 'uvec41zqojfqhgwj88kmz2r0n3zs1u251naqstp56zxd14x5n6namr1zq0ptdobsntinggoa92oubu5x8jn451vbwqxdgg1zxllhuxdo05dlumhdmkpfv85duhjjkjv079n9slngnxp9lnwuqo51whlenkgrnb7e',
                flowInterfaceNamespace: 'h1r82l0yse04an8emrvcrthwqq5d7lth08akcvsh1oycx38x4igm3qu464iwzl3q6ggqcjofwf8e0cqt17x0ptpz237wcmyu4loz51zanqfl8t3haen15ozm9qc1nckywqrs61jff05aaqbcmrj4thuvxeepeyp2',
                adapterType: 'ezfma0b5w3xov0e1kt3sfmrg9sd6vu5vc2z1r4kdjkg3kxoolx2th4aphdx0',
                direction: 'SENDER',
                transportProtocol: 'totaz1oqnjidr2upyeg2gb8si1j7n867w3mclodw47eqeaofj3ikjbdtubv8',
                messageProtocol: '0jqenkg7hi9pngnt2dyjn1g0firuiegnczyr7n3oqsxrh0vul2a9gksycqh6',
                adapterEngineName: 'ga7e9y6mp6qjw73ep5d4f5qwm2395mwqeltxkccfwflfz7xh5fi19rnxq2p8cbw9g4sd0hnyanibjko0rduarxqj9q1rsmlxds7pf44fs2nsz5l0ryffts1nicja4t4eu2ihmhaq4hwanz2isztz0hswm045n2rm',
                url: 'va1wlk7ko932hrll198qp0dyzzoxaxmhkk0uck0h7fp15loxgtk9hwhf13vs3zqg0vondha4cjyqrr5qyjf3ne8xfndobi1sqbceg7mjynoj5qbz0bx5xha9wjon121q3caf9lc1e7uylydyk0mwppq43lw1pi0lncufw8v5rzd6zk9ar75xzik6opdly232jbq794kafb6v259uqmksepzdmtpu6gchaj1cgbrs5emg6fcgu52z4kan7q50m3qj2ql4831o0n8nyhimjg79cjrzyn05q9x52796nrqtw9nvr86ugwx3tgdbzyljda36',
                username: '9sjjmhnnvov7ki10cmzmza5zygyrru3q88lmty4b48ksx0hee88mw7vzjxdi',
                remoteHost: 'pdm5755wuggt70kzc0zrh83kz6drp2y4w4ftr91rpebpj4dkm3fea6q68yhfdwc58n5nxqd962mvunmogiht06ihtafolkr9j9f8ay4mceu3xprrhc2koyhr9h5so8rt3jwlnadrdn575t80lvse5dvxrvnsnusd',
                remotePort: 4030402690,
                directory: 'v7repi5evc4usu14xecvqfb6cvlr0seznlafgpl63cdlpzqxf97n0twooool5k2bchd1ocyzsk783r47upkoin09kt48pc71zj94jkmpl6p5q8o3xcvkd6c0qefqxpa0qz15yz857ijkodqp5vkt47morjhpr5yddawsxydkqasj68sfelkow8t9qcctbykhq9izl9riq7yuqzm5k6mgrac7k0qy6vrvundjp43fvdx2vdjcsndon382brs55dtjvg2bivv31q0ob7rif1ngrdz2pevzsa4d90bzh7ubgthkvaxfjgcmg3i4pbok6gndyio14iaieellln2z2uzbw0exzb66yys2xbo19tvb8r29g302g3innssxh2yadepqtopsgpcqapo1zxbbxnlwk5ucdpv4hpbhbwp9mvnkdxb3b37dfzap4hkei6zp9uilzgptnapxjss6gqsannlut8n2q2zmxdi6himo6qfmfqclzreai5n9qo06b44lzi5v88zt0piqqlbp90ouw77xog4826atamufpijhil5oxj80pk3jumlp26nbptdef1gqmqplcr68im65u4jz8cj4lpbkmsibqgcg8j9bwu31s6fg7ry1056b28930zsrjwfiu5pecoxugicjvdvx5fv4syjh38qfvdbvy0ufivv5f2t42cxgru2b05f6py2v4biz7yckfswm4vi78rxxato77qbum4p29mn31vtkye8xupwyr60svp0r5f0c3b8ql87mv7a04eobzuiz722zzzrvzjduve8qfwezbkg1jqu9vh9qiz64qtxhhdjcjuo62s5rgodlf5pejw96i2u1it1uhp322i3nkd44halgmb50az2t9hri69iheej9oqlvrjskjwwektmx0qh3q45fndt5ic89z4w5kgat2jq26s9wfb2d1ojhghdm7wh6rvn9p16ofy28ciell8tbjr2pu3iyicst328pvgec14uo4c17nyt2xl65d7c4x768amn2iz0k',
                fileSchema: '20660m1gzgqsh54ljg9gdyo9gez6ui3tg68g6r1nd4r7r8hm0i334g6m04v2vj7fwrnk6nqg496318kc6pdayrlwhsu52379kn4prxycv4kvpz9odj5bm61m0gtk9mhhr1rzhf763v1u7h61shr0yvnn72sc4k1sror1n2h2lorhh5734j7mq5x6r9phr3zdphn23k4tff0ijeypen3dg87s69mtkhckfoazh0mcn3j6qw71rn8g62v3f2p6qyafm4061x57cyqsjvvd0jwwty1xwox32rbv9e76qv0270f6f1nbrmmkznsemei1ckbmcdif80sud3r9gb8oj3wj7cqv2ekkc0a6dm6t6ri2unqfvp94uzzgls6qiy940gcz8su8ko7syd0kwonw3psvmwiyi6dp6kzisoojsff8jazxxby7bvd8ktlk00atye82utwkgqion8s4s1lp5x34grxcjkuazia463othgp2agdbs8gjx0emfqgcrw2r7bs8bvq1rynz77pm11rk37s9cfft4np2nqp0iimu338okk3bhrhzt4z11myhw3pzypxq1mpjmit3l5n3bbn2r6h2uyxkfeeaubb8wwkdhoi5cv2qvq57jza0w7puqmq30eb3g8p3ryfuajebw7z4ej8fdic7a6as97mm6sui4rafuauruunuti8q48ba7px56vw19k18wm0ukf0tpusi2is8avme7pwxe2tz6qsr4wext9bpbh2cqcvkvaf167kkzks5yjrrp8uv9evoiyst7wowecwb7mo086tox1k83q9siprfe9l99fy5cvfmc8vp5sc0pbnfcup3vqjcqdexw1943tnn223zyu16yqabft8o73ou5qwgna0tynb8evv8wu68pwez7yomagfz6r9k2r2rrz6tyfi0coayiakxokz9y3xlac9fmh7oofmbhvysadby0md7m8q9g1zhp6arrjkqzo4kl7pmrmzn1a3p9xf4ds29ibz2vgmbovx48o4mamr5',
                proxyHost: 'aow05hse81126kt1knznhz46rbeyj1cdh381pb5qmjwkbsvq502s2zkbmpw0',
                proxyPort: 8011538583,
                destination: 'otry955xhyw5sybg9jvvhyjykibiu78x9r5lzq8ngw4d3b4raggaif7nf988s7ig9z8spyl9pqnh4clks289n4lyh3sdid9t5d890n1378792nulwuaryuo0qn47b1vr43uh25ni2cjtivz05tafer2owynbpzqn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'obb96810t4deukn7lmm1n6ct39iwpzkqzx0wfzydtrhwc3bdyrayfh72luj0k8h24fe2w6dyrxpx5ruwhtqpqoqt4v1hgztbfdk1ibdfdwhaeu1mgsy7rhwme2tehygxy0fh5towho77kmbqd7ifk4esn1i435gx',
                responsibleUserAccountName: 'n51cm590hluv9ttysocd',
                lastChangeUserAccount: '3pb91j6yc4tkbapxy4e7',
                lastChangedAt: '2020-07-16 01:44:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '86riuriz71fboahe9x4497g1v0n9esq5qlixby2x7qur4gu5ltj5f0oo2nd3ulg6qbzlh7rpav8w450twn9u6jhxbgi19pq31i003t4126t07ssoh5ecq34mtj4dmfzm9xd882uqwyqn8m68c6bn1l0mfd0a2ey8',
                component: null,
                name: '3rlm4416r4tpc7wxk46raobudeiq2heyjd1sci6dj1mt94vgl3whix8pjohila3w5q3fwk0zafetr7htq5ibx4a2uocqxjwdp9waays355vlq5sbn6k6yj8ajw01a2ayttsmytv7cbml7fijj0ynblm0fj1f83yz',
                flowParty: 'oarrt6xwy27eippy7cu16vte43y0ko12da5tgx8rnp6kkvyofbq0dkw8cwqt3bdvcb3zrfi0u4s3au142qhnbmsg9izai7uso6lw7rcj0efgiwgwahrvhcvi9dw1sfbo7qbynntya1wxv1s9ld528o0qj0krvm2g',
                flowComponent: 'qqi01q0v5ova218ddkzncmrhvxa8smyetj1yshr7344kdci1my942a5se0e8dmdgmh7h23a3ulh4n61n9v1q4v18skfv1pdfo8ndc2u35jooyhvuhwf7trz9m2ya9ub7rpbi2k75697coerr09jrdwy0x51znhwi',
                flowInterfaceName: 'cvvlbq57dcj86v4kpu8wqt3x7wrob9nl4u6dtve32is8d2sd6so6v31iomvfca5v5ebhdekxyq25m5jgggr3g77hvq5yvc245yb9m5r2eeno2dw9rmz6c5gzj9wv4qtfto4mgfysgqutb9oimazuywsjkcelqau8',
                flowInterfaceNamespace: 'h29q0zhn9qbg9tb5dstt9xc3nxuy01itvothx6gc3sk0cvq5woc2apm4aacgpehdakgcfg55m2nvlfjign6qa1fic8qciw79uf7yix387p2gsye4gptll1wryz9emhwe3q4pfvk6gku8m7450wb3ne7y4h6m4a5j',
                adapterType: 'i2711uhya1ij3hrk5zd4io8h39vt9igp91yyvva5hc57wjl65sc8ajtfxhnz',
                direction: 'RECEIVER',
                transportProtocol: '385gjfyimu8ldwvgh9w78kgfouwb1citv1edi2dqkupfmg4b7zlmlil7qga3',
                messageProtocol: 'qdlvyginhndtk679w0fyvgzjb7wqytgdiwca0tjl08ky0xaftgr40m5dm4gv',
                adapterEngineName: 'm8qa8b91qqctkg760jjcpbro3bx3v7ap80d3ad81ghspwqn2osy65a0u13aj6w56ljwjttvc2ftpt3kgtx4jrpi0xjw9reknncywhqzuyhacgkb2e5odb2w508i5qzd266fzy6q3ei1h733vkxylzo16xk6u9dm0',
                url: 'aahundamca0e2b06pbelqf8b12tpc8rqmtq7icikoqys4krr6asyw4gs49jfforryc6bm3j551maqm9axhty4ud62daq2p7t9xahld96er5u46fptdqhwq7w7psgg1gygqrqecla5dogkmlzrek8prtm4oxv3f1tedt4i8ey9zjur3fn3wp7mbu07qmdt1n85s16jf8c0xcr5bhui4egds9t6lbztqt96h9lxlkg1x4hzeytg2fqzu5lkhmvcgp1otzqyd4optmvmcje6lp9vu4dz72zi9p6c2rugnxdgids6xy3uomfjhv6df8kveuj',
                username: '377lw5drd95h3qc9xzy777bnmu5dbltd4dpbwo26ivapatgkume8ngo6tbpc',
                remoteHost: '38f0a7t5ibomnc9xwwpqa0f9ihlwqxwtomdtsdo7276w64cad493pthwi8t0mxkix38wf5f7x9tdxj0kk88dbmt8kfatloikdyxg1tzkgay6ia62bmlza54qpn5yitozfj624eyp8oy4sglqxqn4glv3mmsgx2yp',
                remotePort: 1417039932,
                directory: '5f7k0yydk6fxsizhy3mhbbrniuvz96h9j1ypvxrkglt5uzm38e8m8hzjhv9tfvcgjkd7owdyukl0i019csp44laia8iow8z6noboadnzgmphjylv6t4wngasev9mzok2v1c4f5ugte4iqfwze26w931jg903y4d6wt69y0t21nn9ibd982ysg5l2ko577eab312nmzqz38z5po6kofh7djc94li0gy7bni1ts7pjfqhpp5tv67ocru6vmq72l54erdnv2xs2um1pzlapth7ci4y1ec597lo39gf6y5qgb8rcxse0iwjy98q87zbknpi6yj6nz04fy7ix2rc3f3lp6iu4xcf7bew4jv8xk2rccado2tblc5qobkjmwlb9r2dbnh5oj5cmmkx06soqz4ecp9cqug3vkwkrc206h61hxp23mv6vgw1vzt538n9k3ua6gfg9wrgdz7tasc1shc4ia8hvj52zvy1wosi51m9b2bu0o1drl9ondcv0hl9intbv7othlxs6y1544hk1psi14ei20vswho797rmaigewjtvrbbuw6fv2uc17cc4o3sdxduzdxaza1opicyvbjlwnu4yps0d9ivf3n5ua2mdpp1e8eqbxjjigyupb6qa9xmhrq2pyv8fchby3easb31m1zjis1ymjuh8bq7v7qrbzl3wloa16ocj8fh04ohi4u72s8kh6kmkev5z8h0c9df0kqbnl9wzn10j1u447dyh56hso1rz2d99rz6n0ygsfyq5wre7mznc4abmqdbhr4o2jf6nryf8oq8ekx6im63kf0pnmw07oa549xwu8hphuhobdr171t777a9nrqgd5hldy0jm7b82edjc4suiqk56ym5rxih2pv258nuzdyv6h4cyoir1cyj3wgi1s3f6i0fojp2k9u2b1whosa8lpu4s69przx0t9pbrquo45ghnji2ktt3n4uh6m2vm6jnvcpvkdev3ulx82x5o92lojvvr5djboke6ppa3mr8cklp7ckjqq',
                fileSchema: '2cwkfzum1tvelsvzw9ht5d81tnshfddik1nzjcgvzu72gmlw91wt3w5k7ht02a82gb91iylyoz8rylof8hqxag0257nlsaj4sw0157ofnl843sx3v22yyu1kzf5ecj3qsmsbp6v1zr96zkdcfgrue83dm8llez7er55n0r2bgt6l7smpltffgiwh7itv488rszipf394b3iar2c86pgcblivn16mib7gvxha12rfgq30g8k8qvv3s8nmzuz30fnd81khyausnrgnep1d7ndg50itkm3a35hug5abagzlfc0ttlwnypfbwhkj6he3ek61m6ezs9dh80gbhjv39p4gj2sxgkipfcy1k0avd894pa9ozfvi8xvi9g2jncme0owk9nsd39jnlkmk3mz67oqm1yli9uyj045mpgmrrdc3gfakgs3ensskvshsi5e3k9h46e2qyzkl5dw3hlyl38chvjdcn17lb1yqtmg519u0crrw9y2yxdn5tzoxz4qfn5u1xi4as6t2gsjet2pcizundzqzye6jyb8etavfjhdp9wbhcsv1ux77ba9xdhoo6m868osouhh7hldwt84f2y1843pl9cpmsia4fvqm6mmskut1c7h5dk1uw9hj47qvpm3aqwsstfx2plozh9w3532imshskeflqp7auzd4821c7rk96qpm9sf798g4r45090fbpbjjdr58b021ouuso22bj98t7txiiuuubjx1grfkqznssr6xujqylyoilr4qf1asf5syhq0mgb2dqy31wfiq6r6ce7ibt1c36fc4otcxtbap9zp3lr767i3lmkow47tfw4l5q2dwkg1j3j9q5to0z0x81qk3ehf8thekn8prxzy8yn8htt7w74k25czwfpyctexbldcpfap2nvleap2rgty9zgw1sxo35r7t4jyil9juktcijdubfoy2htsyrdmmi5ixs3n29kvwqs4herssr7v2jecto7c5grx1q3o6q4uuahgt5re0asb9e7o3ukop',
                proxyHost: 'asah7mqb1oqn9xrlwtf25t00l3chnemi9bc1m6k0efmjo7t2gxizv7emsel1',
                proxyPort: 8428295685,
                destination: 'qm09icavalx2yuf9cbs89cg0029qevd5a6za8a9m1c8fasva50gbbmf55skebbc25ao2m6l93n35e2bxwdaeuu6v2mq18tc087ci8nfrddy992y2ujvvf0xoso9gvt2xgas6u6y01jqhtgkoajpt7b8n2jvbhd8m',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zgimd4c3nmrs7681p0ueex023ki6ta8isawcapwemuc2dw7p452szhg7kyd1h4q7y8j0foy4o3fi65zuy70lfhdte3f0jhqadqnf4hj49w9p931x6si2tzb3i1pipgojneylrdxdw2ybfbnmpdobpa3lr6ktyuma',
                responsibleUserAccountName: 'qrkfwls9qhib7d4dayb2',
                lastChangeUserAccount: '5u0olvld13yknrcq9fgy',
                lastChangedAt: '2020-07-16 10:29:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '36ecya6kctx1klyad43r4ngzxwuvwx4bkuh6xx30iy4v1c7raj4k8nr0swgkxw561w4kq0nas229emfeu9rknk2a1nkpqrx514b3tyzu8fd0pq2xq5sm27ivuj3hv6klbs39g4wa0inugzr0iryye63u127lobzy',
                
                name: 'xm3sgyacuzcf37rxb7k2wsilwdluwvcxre4apj1285c7be682dn25qzl3iu8ji939d119nuk2viivrxvc3d35kk1cmx8nxjyrlcx3r19mec28hdx03d0bbv5i5zymsgakwtk9h2k0l7xlrbqx2beqhu5oagjiszz',
                flowParty: 'iwh9hxu2zwyg5mg00tctj059hfdp0v2cekwausj68fqo7vlllvio5w64037fx76sbp08ihomakn6t5n6jwc2ekopa3mxw5skstopbrdh9vpnxja6pbk06dqgwtmmgqtg7ax0c5ls0lt3frro71yftncntma2wy3q',
                flowComponent: 'hg3mfqhi8sv3wfszvzgvkhc52zbgsjlr9hdnvcn7q78gqqplhes9eq55lzouu474w2p2astucdpc4y9p1gdccuhcrsj78alpgufxx3ok7mwg0aii8z1fm7jawjxryi2pgghm5xgq6mckf7zn2pe5061idg0l5w63',
                flowInterfaceName: 'e5djcc1g8r1n3203qidnf8qmqyik0m4uwsrk9co25hsts4emajfqj0qo6nqwf2wjxovusxtfbyc1e9j77qku78xliyuhmalaenyfcbclgz3b35stp7iub8e6bk7vbkhht0r30xhwg4s2ea2jvafkkxkye7glxrcx',
                flowInterfaceNamespace: '0za49txsvf7n53ccwyypc8l2c42ayawookqyhg6jiqygsxyc93u0a4d313vb2yhoyq4abkkd4x50e2mcdigpq8vq7jimrf6qsjlouognh4hs8tpon9pqyi9o3wlm3xo6js23pzjkbnl8zujz9nxgobov30c5rrle',
                adapterType: '33sus42ggn90et3hzysg9nq2inbryuhoeyg4hna8tjavfwwogxfcvo1xhdcq',
                direction: 'SENDER',
                transportProtocol: 'cn9adb6rpucfe9i87myrqdpjx60y6puyqwft53lnr89cpbcec71hlu6gi82p',
                messageProtocol: '6fv6yyf87rf1cu4rstuzd8ufll54xvypwvv76c1k4iga6k9j5sechdqrokwh',
                adapterEngineName: '1gv1a5qc6rgu9lgr6xhh4cpkijzyj85j28eq1lp043bnkirxulvkkfieghlg3e9w7jq2zt59hvrfcqh7vrgoent86tfw2jamfxv3qiwsntnnhdm0zlrsa0dqkide99875wxb5bx8zk8jg8zhbnlyuv2fx002bwb7',
                url: 'lohfpepupaw061byiuz7uhbuif3ur08q6je4nnep637w3xtrwfpc8ud4d47msf7d3xxpqu5xv8tlzduexfpfc45t9wipcmnh3pzdzsm1hekoe5co8aqiidbzq66qczfq1ikxo9rj4ut4q5zmqicipsxzhi4r05n1r2o7q76dym8pbhwlhhd8kx5zi87b8xetmj87inicy7wjyl7k90b8oj098g8sc0ujlinb32y8aw37609yy4d3mh7xvvixcgccz28gxfclxp1868ra8i7rrcc6z8fpnzj7rt7w8vxouh2n5wkaifi3a1ia3gwgicnb',
                username: 'ddbchya96gx4jwe7kn1sk8x776qfwvng0acd0x91aqgvj7072q55bksnb0ft',
                remoteHost: 'wabitug60gkjcx4727etb1xbwz75yn2bratcrroorsulc24a7gkmxnrgsgkc0itd0sit0yvo0s5272aeyo7kh6n0ylhatgu9jga0udvnvy60qhm92g66hk065t5zv0iurjlxi1cf38lbtt8wj68xzdv8rwdwu8a0',
                remotePort: 8955801792,
                directory: 'd5bvs9bm03j4ykw7ezlm3ia5n4ujz5b36yverhdqyv2nryhc5ht2mxk2laxfpilgbjnjrxmrltsvhjnhdhy6stw3ohz4crs5kufczs7rngttka767c5d3ybw46iwf6dzrn10houundv6t9148j34impl4pzo85u2mx3jlpp63qdehni3qizcymy996o6d6m4fn1g7z4gqa2j6dr4f2n37dfc589sf6te8chaoiaiuncjv3z8gsp0o9beodo9h58r18s7kgmuhfjj2kxuocs3e85s2mpeujc2velqb619r9eoqfnaftr71nfl4b16qfbdzpq62imo8z2n0ryegosnofjx9lufxav41qpvav2oq53g67jutdxc9k3g77bjxonkcfmsszfl0sf2wf807xjwv55ckf464620bg4jke4j0t9nhqdu2rpuhh2fsfznr9iuozq5g0cqmjpbwfwkooz746iz25sw8dec7e9p3v3gpz4d86jhhyeb2ew56rdlja0hyv1k7ruj231zcjxlad9ogm2mxj7z8ybpo055hn4zhro3qsvu0frik8iap8jrpkk93vubbrwfb2orahe56pnfe4n4ujgx8k5m8nv3h9gkhgcuwvz82ohiq153jw3stj7715poc8l1jrwxvrl9laucarfpffd8vftjfpw1na0h3d15nkpdxczn6fwpkqkrwm6b9wm71a55dh53089kenb65zicntorurq1duvttpehu78zq6j89xghkqr9kog9yhr8witnhfw5420hi2d3slmd1ytp6mx7fipjpibtq9hg3ieuws6r6n8w55lpg3dwd474e3wwa37kozmq73dc4fgibbpqmc1jm3h5unlxtwo4px10vrwqz62dghqq9ew32l6g662d4f7yjbebrqvrnemxfx21ztsm829v9j2kdr4ajq11stmu0n19qgihy0cm7equvvcvsne1y14p3fbglabv9x4t3vwo880y56rn6ku62bnl8f99ujd091rxy7toasnu',
                fileSchema: 'u4gqylfktruupcluexhdzvxbchagq3o38t5myrtf8shmve2nss9ij3o5zljr5s5kin94gtm972kevt8hdler1tbo8defgsuyl71vkdy506hu73piac1kxp82a7uiqb5wi1tgsey1fc8f4hue0hub0scjrmw31cz4lvsu4cjbc1rwn7kaxiqc0mt7eafppb30m08o40356cxhf5texy1nmgut3wsjat2okdydn66xte1pb9kqrprfj2keadiu2j37q3lnnon486w2vslw6upqw80w7knpcr72p55w8nxiz4qrn9yadb9iphgi0ru2vdnnj7uwdgxsbajpk63xiq2d3f697o2z5qnht57m2i75prkl63xqj1q139gptbt2paucy0fngr9pho637qzr8xugxilzaa78ixgvmvv2rhez188qzdjh1pxxbko6marhqstz8u3fz2buo5tan7yj0dtgyzfzkedwo38xgiazhjkoqi62yrb4iu2jo1ydsds6zcymuffxby5h80f3b49b4q8egf58ebqc7tww5uzq558vq1ipzka4xoflw6ceusb5pl140ax41y6ql6flzokti5ztkxvf5bnnb9zgjwu1zbvlnvqeap16peywbayg7j35i7oi4fr2gjnlrrup1bgo9pe7z0k3egeuv68xhx1srrvy68i06h6u7eup0b9dwg2ogau9b2c86ykm7sw73re1mclgo0zr7kaqx9mslylezatal2dhbpfxfllev1rc3wlz98lo9wvs8al985z2ojngub5sn9rhylyf9qn41lp6is1fmd3dot7n0e0ckvbpmife8rv7g6x4ik57olvq8xgicxsixnjjlkuz821perxrfz6hhxfdic4a3wc27sxhmec0l3buuihhtrqre0av9ftbscbld6wkb24fagtbjd0vr9lc34niwe2dwwsmg8bd803065f7gvgl3hwd8fucpa1xijii3inencmt0vm8f8audgt4qor68zdki11b9w50dydjg9uj',
                proxyHost: '7f6cbr15jum32tv9tadz26l2zuqvdvnm8ojfnxpglkyrpr2d5ezhj3erclgb',
                proxyPort: 4109588637,
                destination: 'zazycl3321msz1mhafl4kzcz1pu2xc7fqfpxu746odfjl7puv9f1mbwqsw2m9210umap59vlymi74gazmmj2uvyg0qavrc7ttm8jhd4jq0wnlekx8ijyiqjlgy83uav3ntpbam3rcgtx7a95rup3fqb6l1so718p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sohgxliv2al8c6iz9qau1x9m7oj5du0340g1iycjkwa3ioggpci06da8clvjqzmohlccxipkhsauczlqpuucefz6tawpz7lux87dggx54q4i787soscqrnx2d3rlxmsyzkj2nn1ox6vpu9jzujkm4mmkojgl0s5g',
                responsibleUserAccountName: 'ss0kzmcfavl7dv4tseo5',
                lastChangeUserAccount: 'w9bcjeqtl0gw4y90ibgk',
                lastChangedAt: '2020-07-16 03:18:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'eeib67s8ejqy5v5rrz3ffh07jiezwm4uh1xe2n32ydmf944hpiolyzcqffv8ktgvaxa82hvdosjz4azkon7zavdqy7rtpi03gxzkxim2xuvej7yfm9esgb4thbtufekbxkz5mjuuttixtsisnab4rkt64scadh0r',
                component: 'wyubykwdzcxbmxu1qgl7ie6vwowg57irtfzcdai0b4inrylopd5r4ko4onqgbphi0w3xdnpx3cthaldhhdcnli1akg7f9q2ybxebvtjrmmim5749iftcbpnnl94wif4ra1pu4ybbnvdn8myxocy4s9hilu9iqoq2',
                name: null,
                flowParty: 'hvmh2ibnv25cozz6y0pg9llo6o1dzjhnd2oey1olnipiwbi2y7cqmz5cznfkd18c2sf6zxyvv0fjyn2j9pesfmoc4h1zbvb7cg6nwazza1u3my6xwfnzv9lbpxqsrqp70lfmsx27g71kyyxupgv5kht2gnxfs7ai',
                flowComponent: '7jwcnhfq9jmmhtvo7jz86da90hhff5vhukqgf65cryrzwo2emn6otbb7zubl05mqrlzdl9mavdisxwebodj98cydjhexpiks95h8u6b6uwh12zgdnot06318n8p74bijvg03ft5jeaorr10f35m7pg40saookq33',
                flowInterfaceName: 'ohfprqc1xe2swlafcmxl3ryx1gto7p9z4agjnzvjjt5eokauwtcpsdrn0uixb15clyifv3lhihzqk0sv54d8705kiv8owqyooxeumh44vo7jqvpkus4iwhkp574qiqof1s7klqcdonbzur1cjfgum42l9mjrlukx',
                flowInterfaceNamespace: 'ke60bkpw9df67zhd201k246meo0pdailjwro6whwx5d7og35kic95btqd9jx9a7km65w5e3fciqxb7jw5u9p82ebsq5cdpemge0tpzg1bhsji3e399laf749zqtncff93bezbnk22qn8x16ugagkiea43psmwob7',
                adapterType: 'st6e13wyodp3s032h105de980bnu0e6gch1lpjfnamxfaypjj92qppwfukwf',
                direction: 'RECEIVER',
                transportProtocol: 'frf20jhlsnxo57j6r9xm4wszcmv1oc2n2kmtxybdv3zzh5581blt9yiro9xe',
                messageProtocol: '1vx88mk40pomlz2i4t15nkfnff3tosa6fm916sp9jsmlcyakc360p3qz4wqc',
                adapterEngineName: '4k7t3wx9qqb7u2dq911r5yjcwas50c2hb7wz1p890x39c0nkqx99by8oz09ory4b4a8vrc8l73n0412rzj8alaqzym3zcu4l3gockosbh25gx36oj5qor6stvh7ahc2onjtexm8vmh8ygvavjo1q4m5oiatvu7z4',
                url: 'eklyh454b1umqufq3y35vid3k6n682ljt2lab5jkawn6t7e3awu5emhvxcynrd2v3wa6ypny05fk5kpmmo0j7p3rpul97urn2e5v69jzqmynvyyg5yxgtd5ohpbpzscuxirrli3msnlzqlc0hunn4vqnrg861aat44f1ocz2kzzgpa7hu9gpkny9o8v3mu6ksv39hrb65tnlejw4gx9w6sh1zzcor6tozf0qzel0z2wi9gopyulw6p8m9k7x6c96f8gtr4u6cd535ix0y8kb6aah2d395q6cv0hq6u3kzz4lqm7fhc2zr0da7qzqgnz8',
                username: '8zmr8a4vq1oz240c1gesva41hf944dlty9yexnppq6sytmv08m7ueg58fkre',
                remoteHost: 'xy0usuicqingvpa84o5lvlf3p103i68bzevxak7825a1e1nz2ryqs6gwkwp4tde54hrgjgsdjong253wrfoa80a3ugczhevqiwubslh06jmib7xaiad1w9cgv0w6qmr9h5bsdyvi1b0gn9zxyv4k4a92zx2paiho',
                remotePort: 3561500223,
                directory: 'e4h7hx65gbgyz9lnhrbgba5bog71iyt9c479ggucn72fwteg8mqbm8cx87dcqm37v1wp8ge7q36gimkib3qwtnkdmxtb34ibufk98hbh668kafyutgtaotlbt9l4nydshmim7sfx391okmamcyaj8mzusm81v3loujttpcltuvpmqso7mufzqigz2jzut3t1upa0ifcvbpccpxsfrw1zgjj9nc5x36jovq1x9gvk91jz9zqil6pgaoh04xa320bw9cf1jemn9dqmzrrr3frxriiewjnvzdljewqz9wnomv3r4frb3id4qo3nfcy8dtlpl4tqqhdk2pf8pcqe5y0dza5vlluluw4tfioj27ricat5etrhph0t5eh5o1uki8lmvu6vf42q7bzgj6rxxbaag0xhw2bn2d07z6ywkxdqug7m6g6s3p5g5fqliae0hrufp08g2ty47gh0n6ze5s90jp1y0fxv8a9ramklfg2pm6t4jdrumuawdre8p0beglrt12dopa6otahvigs852vqa1kbfifcyctuu11xhu61ckyhql3qg0mu99o9dqj81ldwoltqq0f6d94ymnr4qslga233p2ln9rchq22tb4mrjuvhdiavqfyqrshplvkatje4quo8maz12mv79ii4qvrrgwoygm086qv4cz54cnr1yg15icl4j1d3xemjv16ui5f12grxpolz5pnkwxzd4sg2ax5znysnqlb37cftovxs4qrch7bnuechvsr1b0z1xtqlo4s87dztq0yn2midkl0vuksjgq6igpyjke63yidunys7fhfg0zwmiz70adha0qg54yxpwxngderc9snqjkzgk6ndichvxkk5oou2rc8snqq9izl3chg03zqqsllnzhw9aokolu5mutnxxonx5l8z8p6w72uqdoh2dkp4lhefd5rq6icgk3thonl3g2ha4hrpzgiafv53of47nfzcjc35oc8fbjo6rwujtvxzq41xye3tcpemvp0r5po1wwxuegam',
                fileSchema: '9fp8xhityii2rr8ooajci5o6vy8gwazwv6fbbq9mqcljkv1vzdc0lqadm8r2js4ew9okr5msxzdy6qx862az1c1jc1wnyt18wkj2ro5rsu05wsrncy7uoqbotrlrj77mvqgm8ffjridxognru7tupijrjc4ej8jdn2cemq53xgxv3ocskki3l9zcld4jwhj0fro3kmvl9hz460duyapqhg085rgsy6a6pkt7vvbsb47zd9kwvsu4fyk2et9vdub9htvtddr0jf9g34b3zdugjnsnnzzkr55em4bhtqakb3496578zkf5cr8cnu19glx4lpao84fo2mtwqw7ciurg3xjrq773vc3lm2d449djmezhzw16zd1b26yed7h61q9qd3kr18kddhepbjlstgzu2sr1282cmgqsdc83tlukbp4tfnryishpqbuqenc1590cfxqlfth693ud2ja08qinutzqh7jt9psklqfzyt7puf6tzy9d1kzpuadr0z78o90tfb7zbhg7xxyoxxz346ahrjadiozlknlus7bsfsmeuy8mdgwu2htnx7i2ufpl920eha2skdej66qypkyn0tg637n87vddcfxqkpataue7schp0apncalxku04v2md6stvnfptfe83q8bdypw437qhyoas4o9k9ykrgyy8ykpmqr5z34ivthm4f15yv37vdfaphy0b3u9j6myjfal82swsz71g0v3k6hh09kqhmwmohr3ajr0of57zmpsy8falwfo4qarfilu6gxvu4yotspgmyfjo83w1h0dir25ga15un4jvd6t57j5k9vls2x5w4di8kulcdtij8hl9felw3t1aem57c2sf0qd0s8qrgiypdnua5ooa234brpedt3vv93mf80k0nsg6u6s1tnb751fdndp580s4vqwaq23lm2dvqrsxeie6m0ssrujzjzdskpssi5tn3w1h1ts014r55goion758sp1wk8i5k4us03auy82frogvskn3fktv0zma2np',
                proxyHost: 'cg14rmnv2fmqla9j8pwscpxusi00uqe5jb6o3aw5wjm9zik8escw999pgy50',
                proxyPort: 5571612846,
                destination: 'xmlk9fonyefts3dqdtfwhziwrr79dacoqzhnyjk2j17xif0yt9v9cf2616k9ke6eqnrbt7nmbm8z8wnvox6j8gtj3pyvcqo6f4pcluzwp3r0ykwazfo0agml74nzo25j8ils658tualc4o39bu1vv6p2ixj752qs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qplzgcp2ty7h63vjmkbayv569wkkcv4v86rccatyci0gp2b6mcwxhpfilxjbtwfz4qqfju2xega88kxfifc3qebbmpw3xobin9ch528nljew1hmlhjwvuc5ap6a792bdvlik6kt1nuyk6s2j6mub1tunrvbzmkqk',
                responsibleUserAccountName: 'mx1kag17kj1ew6gbpv63',
                lastChangeUserAccount: 'oj3v3sfh9j3d8rwe8i3h',
                lastChangedAt: '2020-07-15 22:37:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '3kjhkfx64hpzgc4bmsvffla2pyw38s5co79mt1kaqmp5p290m5sap2pbqaw6y1266ww74hoqkvc96ixq5fbz8xel3mo07cw41vfkokisjpa27jdb4dz6rjh6ehaaiau0whhk7mu2aiapuesc189x1g9jbos6qw3x',
                component: '2o9ti5rhskoxfg83welgbwd7xua02ah23cava2ob1bykmck92j0jho1x3q5bupippacnankkkdbwyhyysy4ynfek2q33cuwt5et6bj1844nw660jd8cp44y5wzru18ry0brd3sqpnxi8c6hx9uj0dkfslfnvuv87',
                
                flowParty: 'qyxsfelx0jppiqaztafda7jo5l8xhh1ev21p1560jzh03gyp866rd61vrnq8y5oklxhz1vkbwqwulteyqmegr68flazi7ntfa1r6dqyk9hxa139sz5wmmdra8n1gnjpu7owlah1nkv288mrf25ye6jxed4y21ql8',
                flowComponent: '2zmt7di9x89vf9kki71l0kq83r8tvvt6m7g1q2mvy8yxjlzzaddhopavmiigvm1oocxodqe8ddb44gd696yi43nk9oyjgsjn1dnz28829wh6u9lj0bl93nxsmbeeormbfo1u9j7x13tfweb587oman3s08x4u5xk',
                flowInterfaceName: 'z9ncxv9a16r3qo2oc35f6lx7ph9u58umfm9midi8czhr0vam83226qpblfdju90yg6mskykwzodrfu834n4rj4q6r12b77ip02zm4u1ry84b9n5dlwp69ki08mi8whbi2p8veqfa8gs6kuibi2zgdiulxf9podlp',
                flowInterfaceNamespace: '6a895h0iphkb1o6bewqy0f9q4kb8t593gkf3oe7vwl3jmumf497s37dsm0kp7aum9hrk21hbvbyg9s9ym0i4kkwsgk64a4cjx7tyk8bls3irdy25zaja34veo3kh62saultaosk5gtjniugc0ryh98zqj7ndkvhc',
                adapterType: '1kvzo2jpagrhmf77fmukxe4c21r6vyikm3uyc9uu2kpvl1rwo0b0p8y66a1u',
                direction: 'SENDER',
                transportProtocol: 'zl5gt0z2jg7rwgc7zy1ah6tfr1iw829wcfrs5j3elip3v513jx1ggrv9ca8r',
                messageProtocol: '60t9abrc99v1tlemd2qugawgnkr7xnd5lqaiixchac3qwt951dp1pkx1d6qi',
                adapterEngineName: 'pnq2gx1sruy1jt86qdxxnq1yirfj4zif03c5faczj6iaj19sjb1l9j8e2bcu3hifdr2ojjy6c42xdpouer9xn85x6mem90we2b16mtrz8j67gcou4jduti0sw8kvha869bak29r0uotygywblqxbbu3vxozgxrzt',
                url: 'iwcyqgubyriq1tha6lwxfuwtvr524ziuom1znpds29q1h9930wwbll8mmnbkclr25w775n0pwxxxjrwn303jbetcv6nnb3bbwpketpdh3g869fkjjx80f2su91ursmxiu2vgodct494mtar7q2p0tsr8gvzo9g1eqs55u0p5ogtvazqn0fygi2utakixr2tjr741qne5e7jfys6mnbjh4mxbj8bjz0avbf1u95e0p1gq3tjp82rrl3hbt2in746h21zoim60w8w03v49ws7oxmkswugo19xov2hi9pmdb7969r3q5c4pg8ru227fbpz1',
                username: 'jr8wxv3dabfdko38nt5iuljhc89fbl7p17w5fk987w5jj475kw2xdbez34rk',
                remoteHost: '101fs0vii6ozasv5n98ghdyvv2k0zl2ruyxkgi8njqurkz21pnqnpmj6m9b3tabouee63n6vuulzyfvc8cr9wxhav15xyufbmveeiin7u6tyws7rw65uzbroogtk9nup6hiuny1mtlym3nthk2sih20q0mvqy02x',
                remotePort: 9701906530,
                directory: '7gm9imcuuuky2fwn49sfgkmado77fr4dv2nend2vmlwz7rj1jc6ph4hmtux88zdmmjljhui1uaai4ok5801cb9mqgpqqf3wlec96vhluzdd9kf4llsixyq6oaai88mchsp0bp87ul0yl4xforng2dj9jid5ee775hd64oec4e72m7mgr0yukjh8ufmdn8gv18znw3hal852alyucdtwjc7pdf81k7ubdenjmjr9w0kqzto2yt16jmjk71jjdo5kusvx59jvvy4xp30v3vk4qna8vql6ky1mar815eqqcs4knmg59lmav0c7rftg1m561yuhcmbv2rcr40dv119wy7u094x1xsefz17c5oysut1a8fwnrr7oug92bbth00xosei7cgbk1so3wlyzwgt605yr8kcpey7oq4c93ez3l75m85egle1g4x232negardgwcs0fknj5ozi3zorssk0m11wkos8l6d1rq3fokuwat0c0w1gg8blckrn10t5y8ks1gad2w607cc7esmq79zvmlj2gv3w5fm20ler0wcrxjp6h5eflsx9v5xc6f66wdulbbn66i7lfzv8dsrnzalq7qu8dr5si807htrooihs4de2gwxz2ac2x7cy82jjt117lzguhiq09c0tl5t00l8w9frspqv8jdw6i1dgjijnbxzi8sd5hw4vool9rsex9my1m3sz3exyf56pdtwprwuar4yye9phwkwuldkh5dpgk1q52t1jhua04me69tpmj00epqgwwhlylx10eu0ifrk6ejpz5imjvwbjn2otn3awxubfii4lq83cco4isxst8qy21j46u4oehnud1652443zfqxa4lyz6rxwdy4odopasb349neb6qcjxbj3jxm3y1zqb387dfqcu8lgw7bcxxifrwl3lrjv3pt68o84miekvfzugk4smrp3znqgbq846xlk8cmifqiovzxihr8y281jy5kwq8ldpslvfi4mitd1lyb3yoalmv95vveifz7spra33',
                fileSchema: '9s2fclqorf6qkdou3kx24kycqqp7q27060bho6u68xjudeg93pr1nsdm5bis822ursaxxlb6bl5sbof1hqpgmjzl1i9h5gj6gn9ea1ymq9vwbx644af5qfyjee7z4xkxp26ev60gkgya9oztvsn3kfmu8zoyofwc4bvg46u4g50xpgr6fnz726d65aexh3ax95ceo3pa089jhopa1ecwoizolc2f6dg4g7krx4urblwm0naw6eils5r4tgluooxdcvp9wp3ayi473c1g47bj6g7c0n4hyib3nuwpf9p1g611np7h4m3b4cf41wqza8x20u1xd0yhyhryjwg70zf1996tpmu3s3zz79ge13pjuszqh15d6tw2d99hije362p4cw9kjg87fytjimmuh13t1n0s0wzfmee7afdvam422ufev8adsevt13iwqdu4epy5zeyz2hrfcy6kprxduxujhx8uhmqozqd0kiipz5g2e8wovtypjsiqm9l0k47on329ftpv0172ywzqlcntskynxmt4z2tc3smt78jdvxqncqgay053tfuec2v6mjy6fofisoidphp09lvv899m1gvh0xrjgoc76b8dkqn2kvg9g2f3rgoodjx93vlfpgan93vw89hqqpjujqz1czm208edherq1solv1dct8l78ofdeenj8f4fxaglphch5pnwv13m3lpmtr0xhuyjw9y5t85inne9v7f676fs4fduj4mfh2gugaesinbavdgkdsbbyec77i4qar69angwiiizubzsxb0awz5g0x3k7zu1u3j3j3i0b440cbts1ufnj08btxc1bukqo3ccarmh1q7lgtk3o31imti83xkg1v6e7lmgqb1c8th0to3plw22n2hwuvaxbmbbgoepuvw2ohapfmgy6sfl6mb9vsvds8pz8c759puflmll602ivzu0g9oci5ugi9i0pcfsp7xjjffg2vz62592eh4unsts6vkroi8zct5tgson2wnflkwh6qx3i48j',
                proxyHost: 'i4llhiz4i4ldp70f2x9xdwsu92w7j4udkujt3jadxsphn6eqezii8nffmvg6',
                proxyPort: 9273004637,
                destination: '2h42tp6z14wkbbl28l67mam33pb7peu1j34r4soj8de3ic7wtr2n5mxescvdtmzy5th2132zbvuu9eju921yuxmvmi3pz5ad6eotwlqd25gf0hf4tqmr3g6h3vwr8vf70vd80gnayo24pto72kzmxe29ge19j9wb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jlcqpdzacqclj3zkxesb9guh0wc3mn5g0klsnkkcdfz2m95q9ixlai74xg95zrxg4l0esxebnveo8o2uys91z5g5mksnw5hj208dgs3fmtndszl6ll7bea5xyheji58jebbefj2wusta6ouv47ugqo4cdorgru4l',
                responsibleUserAccountName: 'fwqmakg3zwte2gbbijwi',
                lastChangeUserAccount: 'jkmbzs3y6nx0t5ug1th9',
                lastChangedAt: '2020-07-15 21:37:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '3wnbpmdo32681jnc9qf4cvc35d6m8pdkps4iq8rwxs4pqeqlyyvmsvmbeagobeysa9f67scb06515uxblcffwima6afoyvumzkwhuo842xe0gdhumouai4ude2ypx346nbfz3cfzz0qsivm8vyh55xvfbbh6lulo',
                component: 'bk6y34hk38tiy3nvsk6s4lgoqiqeb2hhyzszmrp3ts332ofdgsb4a1ra4lhn40alzokem6nt06cxy7yydaqtm8t6yzrg9y9auma5r6hveejk619960wd8lj5kt0puhukh4082z3vhmioik9ramzb1mngqbe2v86z',
                name: '7r8mrlv4r7m4tp0w2p1k6d7qx0tyxaxo0zjk5kaqhm5cfscsyg0sljr37q90zglxf7a66nscf25v947py86dm9ow5yw4qc9jvn3yumet3ys56rpf38eyeb5y9e1yezwezpputyfnh3xnqqv8ycroc5o8r9pbnli7',
                flowParty: null,
                flowComponent: '0yvclatiahqzano01xeg299z9cqdddqumix4sk5bn0sdb2nh55jxv7um2cezlfv44004q7zrlertk19rbi7oboe6yurqylbsqx5ed19w772ub0n5zmbc27s2vqnztm98a2v7adp6ypr9z9oyml8tymwualiobi12',
                flowInterfaceName: '8dta0fmzlabdacm7xp3ul57dromegz532ju1kzoih0ar6y14dirbw1uniuy6ravnyuq20vs43gapinb5t8q14fbueo0mpdido8qgc2daw258du0cauqkxmymvkjih55hsfibtfdthpoh2o006t5wr116rddj5dr9',
                flowInterfaceNamespace: 'tgw48oit9mnaoakjv2yl7rt44a04d7crehc9h7c9swvjunx2o39o7wsbxnmgwd47ynhjovcvo3hm3zvpmr5qe2rz0hty84x2equyp1797easqjzr6a6qt4d7u2nlfzs4xabhzq4freftdwtsy41drmsludxo72o3',
                adapterType: '8ahjpqm7ayy575h3vug5hyeqm8k0yanujoxdx9hivpvol2i70j21ubhdg7oy',
                direction: 'SENDER',
                transportProtocol: 'ac0sem5p8epf7v9t58kfir8asvt3r53s66ybywcvjas3g8m6eia4mn2bd7m6',
                messageProtocol: 'lma3vvbkhc6r7fp24xhzfyts2uk0vewpsnue6af2drpmfay4ppe7mxov3mix',
                adapterEngineName: '2vndn9x6yd5qq83hveglcpi5auxlvka6lgsjyzqtdumluwkvnh8y5wjo6kn2zo973zwfivij9ucyymzmfeqda1g8p5m1d3rmgilta1bzwxdmx5atv32tza86ugciu91huhfa0mg40eyxlzninfiook8tby34whhq',
                url: '3w75imeerf1vvxdgrt9r0a8sjvf202mkhdb5nura2qi34pdy2mizko2csyugsejc030fgpfqfltru0xre8wv4hv40ibe477gizmda33lno41jbvkpjw7be8u7gq82yi4lu0tr804ffk6idorezstcbfz4zt4v02aru635e7u7kfhtnzhiubl7akbnl4wy1dwekcnaht802iq9xu76s16jah1sxy4iogxtrw7kdxg6ulsb8m0owhvqeq9wv9bty9k573tizrwnv2spacskrhkew63rv7c62rett297oufzwqbo7yto3gyfg016zc86ean',
                username: 'kvtpxuy5x26kja3mhwfjwwyj9czjasvjc1tcqksc4wzxd42s304kjy4k9c92',
                remoteHost: 'dcps31xo7wm8uyzm92oqb6imndmbps115sky4breppmfywrza28tyccw1sy64svdz8q7v7knx1xsnyk3obgnggikygiosi3zxz5cbbbjyoxtgxdugpjkavrlkfowmi0bdapnhy9p43bya7ykm8y4g59pkh0zojko',
                remotePort: 8924747569,
                directory: 'mjtqo28wpjd5xb330aaenznxy1x3144m3v038h5fr0m783a2dbd0jxmfgjkbb6pjungcpx9rfo4tz97lguhidj9s0ps8cngeiopl1hjkl9tpu3atpt4krp064zcp0i116ggcf12l8w6ow8u4dq9mrpmwa4mh78wjiptgd2owjvrafj5gwlfw0nwacqczbqbxhrxguis0repvw7tox8qmtgdewqfw1gcortsqlnlxdrlkv3muule7d49mks3gv9l5udxzgnl744cl84ztymodewdeaaykyjkd7eb4i59e9usvn6zotyl4wxcl6wcy386ea4t9kuj64f0oo1054r5p1xkx9j61l4gm4g8nf3c2fjaqz80vyfp0wp0j8vebvnjf8nnyjelqvglpxlpzm61w0ijbrsv8kfkdv6u7b3kp68kcki0htmd444itf53n6ubdw6s7pncps95ftk3en3axlrccgxig7ci5sv1hxb8gqqa0yh3mxw69itbsamia8qqp5z0w1fxnwtrzflftbdz791ma1o5dla96gspk69bpd520xajjjsrjberi2tr5u2v3n4wqk1jfvz72kglsq8ykzv2ihinypmt2gzmaghw0srrvln45v0yu4fl14npcf4gxge1fcvso01h350xsptufjvvkh5vy6il9jdg26b7yaklh2s5cwk5nzk3mlr42kubdk3e8kxn1ad2ujt2gpgx7cik1mka2cg4cn4snt09bkhdcqah57ydbszlm8nzrma07zdnldhuszn8tgo397juxlc5yurspk09rahs99uj9xhhv7m8j02qozi7mlo96d23cvp8zhaygky95ubk8o06oelikar5u1bi5ialr1fd6uqos7r9m1vuwb9r4hcdlrl9uidj2tuv5ffoccg0cv8mmkt6w81fozp519l4rv4o7w97ez28w6r1ftgvgosfgtk7ccpokhegegx6rs8l3xg5c9ihjzjea5j03q96btjzx9n4zjwahmzyb5bgpn6yumjx0',
                fileSchema: 'ibr8skba9cv5hoou8zw3euql4qe5bvwhbtb2usgb4dwvengwymmuwknhygfl2ebq0ldtt6neo8qbyq0dil0tzwv3egcwrtcwgi0v9xdmxfx2dx9ex0g5doh706a9zutlzhzco21613xhvb7ugqgi0nxajaa77tu6mwccj6mlkhzltpeu1mi958sfo4i7hd31aqyj35xd3z32hir9zvu2wft0no07f2x3p70okm0ibhhh23fh7dqgrghfk7m5ncd8na1wlqjc2sg0pidch3n5uetvv38w8g3tvk3u5uxc8qjo3tlg6c31muaticoicrn9h3crjsr0wp56wvbcisgvrt8hkqw84ykvhkm14bjyyhgjmgt78xe7i2untmap57takma314txoybxb76hg4vynr44hkd4owz3u22zo9qlkp965augu0cdcb2soutf1lu8rqzzoy9erm4p0olwf6l4a0k3pfq96ruximanesyz38rz9745lsz5oo4lxa3m6xew3r8m88xgpsxa66umkr8zrjx1ad4x08yabfjwn455pm5t003i4zaykcczaff41ofzxq7nbr0y1mu8d3jaynrf4abwkyg6w700mqzujdj6l7bqryofumqdao0ro9kt2vm3dvsnssxn441m11zvphnnd3heyzrwn5ia5oj75yo0lqlkndmfggqfyessmo98p0mrae0amk1gjvfn5kj0td7rkzquhip0vew4bzzviivnziku98k36t6w76dytbnxhj4aycyw0o5vfg3iby4zad1gl0o9xiokffp54urw8921185qw1o70pby2rn719txt3lk9fxkuc6nbuxj7k2p5jbswpwevydeg08g47b8qmw5p87m2npmmwros959pkpxlfx5m66je066r3yrgwe9gz4ilfsc638i7c47gpspk67qyx0zptzabumt9c0s67tkmvnn57tlc6m1enju9co5ki06n2e5yqh6ts0ew9rniaczt70e8cisjer7qarrpepcmgi1',
                proxyHost: '0hyjrabm5kqr18sfjxfnf47hyqtdzku478rck59q3hmbstr2ophl9ogn4rfl',
                proxyPort: 5552678060,
                destination: 'nkbvgg1byqdkwm1cm0asfrfe47goizp4uh6lkeoxvavqnauxza5y87u4v1megkqzd5j8j8ires4qhkabq3a4cu4dz9gaa63d5zn8vh0vl633l800n0ii6whkvdo8woghtg2i2ujhg8rfbr95n1qkzw4fwx98joht',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'npl2g39tgwcqjd0uugvg8vlhmru4s8tnrnvt3l0oxb4pzxdzcydqqwh93tuq6a5x9tzlyzfk1h0oa3ekkvz14nu65krgsy950hbak9t2ml0nv2qu2uv06ir9x49kr92smjbig12vkmn113gqzs44860kt5y2jl0t',
                responsibleUserAccountName: '9mx3r8a3529innpzo6f2',
                lastChangeUserAccount: 'tb8re9sig86w1jd71ct5',
                lastChangedAt: '2020-07-16 17:32:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'e06fhm66ivb3jp96nwq4jyp7dumbvvveamdqvtmh47hf8b7d609zojijxvmrtnlive6puc4cfvhcqo9x188j5ixchqgakkwwihdw89s9ff6f68muki4se8f3w5lg8e0ez7rcbuoyhi3t4sm5djri25nd1ewcsmu7',
                component: 'snm2nfsz1homa77kem85idxz469szu2z7t2kxlrdx9dcqscw35jiub3ce9yqwq8na3j6clh34o6h54gwt04zon1ssx274wanb4vb5930dzfw8uvzubxrc31ffelus25v7mcqnpp6t9sq3os5ad560q3v8a4oadqp',
                name: 'bvv8xbzolxne12jjl72rq7tfb1wnrohl9lwzfqygnhoaqn5j480s7ebgl8lnz3y9x22rx6r1hacsm9amefo89fwhpa9pfrgeiam9hedxjalshy3ni1w2q4ou8b3kdgk7ffrxmqycg1fzwxmao15ig8ftj2a4r49m',
                
                flowComponent: 'ezwve1irbmi94r8k99eb62ve1virzlqh3u4e44f1lnlu7v3rvhu3qbgdlenon1ndbo4rst6uixrxny89g6my61u8de0uqpca19r3d9d5qyg0q9et72ssu3lxwhex30tfwvdko9njv9m9jdqwuytonmg12ffl3hb8',
                flowInterfaceName: '81rsxp2wga5x5q4qy8liq5kd8zx09q6q138n6ssd8s1pdx3tpxp4ce53ca5uolg6uyljtyanleshgl5kduwn66gidfpnpq74xs7bypbbpwnmh20r4nz8ssz56xfgvlm6ghst3syeos5s47nm7mt4whs6i3olsjuo',
                flowInterfaceNamespace: 'aq4coq0a4obp665xkwn8z2j6o4cl029l0aoy5wfxlsbk3zg1na8tcr94viczcmc7c8mxmsug4atysr5b2tzljenej6dto39ajbsox5yugtiesooi8j5u1o6zqm1oljhdgtzvpo88tdkwhd7w4aqc1451oailck6u',
                adapterType: 'u3tgfimi6xw83fza5ybjgbb253h4agcxzyo08a8bipve0b8x0vox9tmproci',
                direction: 'SENDER',
                transportProtocol: 'a9p0cwpxxmqcruo7znuplftpl6lr9005nvd2ynxmqlx6j4r0k4uhgqfcslqa',
                messageProtocol: 'wodpqjdg2x72auon7pjapemgfxf6d24a9rhrvrsss600cphshc1m4b2wx3c9',
                adapterEngineName: '3xmx93u4o5dapy72xo6l7gdms7h3j8e4fk9vt4rcoqdjsyn7hkigwzj3k8uux6gzqyliam94a85d5x8gkqf23xeutctwkjhccukbdb2dazkb9gxtrj7wuvrameos4upz7ne61i5cwf8ms2nxbarciyelvto197rx',
                url: 'ej4hyx4ok11kfgkvlh60dw4qu0nqpop2tspiv39q8x5aavlxm3f70z0y6bmv3nlqpw63mdlo3gfzss0lbv4dccsbux9ju693abl1f6qpa17ily6vk0xzhlrwt6p7n68cdrgmo7d73as00xrdgosdzxjoox1iq1mhf04obs48ivxscauued556tjfkoetep32jb1ngicpu5agg0fam35n4ha0ydhuea3zlzvqkwshv43xzng0s9rgqylyzktvvh3xfksdzm5hhdqhrfmzfxqh60c3n1dq301lphlvb2oz8085xhd7ykfr2dnvkao4u6z3',
                username: 'ww5zzinrjgy8sq0272j8h3s491bwrfrwys5lxqeu5gme78pkj1fqu7cqpmqp',
                remoteHost: 'inceshsotrtxgh2zvtlya3hnsinow22v9cedzmyk96n5n5xx3pll6cumivao3udm0jdiflljqc4xxzxqwq6cco8kzo96m0m73aci50q7ele3mwn8409hq4pr65tlrqe0g1ez5g1qpome6wnasyt54txppdmb7ebf',
                remotePort: 2753451594,
                directory: 'l53o5pxo2b6vxdwaifg5ps47ivhoj0h4eg6euimto69m70vh9xhbujvtdushhd4zmkk5ki5kytx0bmkec3teqoedw2loettkow7n320i7bnllq4tj2ll62t96kbpoo32cvx0e3bi9anc669dpzce94v4x57ob6xfqrm7lptg30hubn8hmgdlnckqvs2pkheryv9gksx6dcz90i7t22s8i5cq47jkvak07i07boeky5y0rgech2fv3y4vjqnkdm36r48u5cmsttgo6pz9x88gv0p90rsgq37qjhm0f5gynm4zz499dqyt7x82001pgyftg06tjnk8d7wajb18zrp13wla1f65bo36tisu1u96z9lbp37rbz15bkpzs066z7pblxbm3kqfdfvi1nxtcqpegzewj4cwml39lzxmqt9hb3kwad0tufwyvsr0lqyts7zjdxe59e6pj2t16jwrqhnizjcc47uga7hnveo6dtfnb9tbzyyu8yl6vgc0f9ibvyc2bykwnqieq1wfmvzs38datwcxaha2prlludjbhg5t24m4qcsyx9yfl16akek37m3o9uzdj5npepfacsnqr4vln1iw69xbsyynsbghk9u8t41xxcy0fduug5vm3lmw95v9mgwybmqar2cbg287deaclqy3jrjp4v4wabohyeafs2xa088cae9sfekikdbrqwh399wxdjp5u6bqjdjmdi07r7o0o1ph0yvveurd3tb1gsms0idy639y37mleaf14bwkd74af7l8y3pjc0k9g2vqlpmpln2pbhxfxtjja8c7cefzdry0yq9fbguyk8bxgs64c71skmotv36vnsl4xf2t3mh2s3i7p4sr3rqypz6cd4evqepfzxbam4up1pv88iqct2gq5j449vce46y2saf3wpjiem9dop19gt38njqtliuybz8jq5usdmbom4us5459l3xhrlrkygfezew51i7p7ucv744jiauu7vr9ae15ern6t324leyumasnpg8avrsk',
                fileSchema: 'bl9kp1v7mgjnx948vtuwh5oo3ayfhgxj7lok1p0pdqrv3tm11mellcep5v2jn9mf0cg2y63gq9oujmpiw23982u0o8dzhv0bmym7h00rs1mzxn8bk2h1qhe51x40k154vzydmc4qbkj1ubmhiyski5nushthuqxt4ememoi1ogybgcl9v1ft2qdc1xni2btat61mfznuaw4gp4lesl0wgsvf7mraplz8ddzsrxm6qcl6aa75ome45ytegq1a6aipo6qwixc119e3p3x09a1tzavon3n8x9dq1u0a6rv7arf8hwj3f79tg74djzl3p9qit8pj2vxhaotxsnnxip3y8xvpddnx4ste6llwcshls7d2uu8vgcwb90qg9bss8xmbwibjl7x7vrdbwr3s6ba71dbyjxn7xe4y9ysse7uwa5nuigv4e9jrad5vqkpt7hoqcqg3xfkx7nqnjabk6iczom12pfsbjkhovfhqcnfz5hk9y141itz1ghu6nkhskmjylshakugs8nc7q64mnkcvthkny7540l1xaus4d7aacqy6ey8gecyym3cx44ex35on6vdl1dfqh3y0skchcegqyv5lyjf6hnk5vbdmv3u1qo6nz9bu7iwgfrtbc2unxq3e5bb5krzychoeiwg42pgkmb0z3t1q5m6p39x8xvqzs9ximrxzw2amh0z7n53m5ti22t0tyht7nyk735zclhqo3uu815xr10yzpkmcglqtzb35dfgoufa17ggen2kjtsxrvkvtvpgd44l0zx5ewid2u1hdukcnmwkmnp0ywprzook1sshrsd4n3gctaq86tytxcwbuefz5vt6xcy6yow7ciefnkr446l17fcjamnqyoqvfjrshlt4ot0fgsef1g3ltemk9zjxjta4pe0qdyoxwsnld3sxc3f6sw53o5ie3rp12li453ypiiqu0i1lnzcjxrv0z57uar5441jnwqpyn475prtk0w0pjvovwmeawe1a4ukrkw0st2826soxhy6sw',
                proxyHost: 'w4reqq8q544zfdgtjyz09zxny76j6314x9e9rmef3mysos9m8ekjpf8ctxfv',
                proxyPort: 6462274274,
                destination: 'y3l6u23ekcjv9truklwnvy7pzsi0jzz0q91bmthyk65qxohyekihccfzxx802i8gbynt5rsb6b0fec8ix01dghr5ds7h39ew5976scbk1h7ugirn2lt030yoilat1a0ctawtgx8knxffy9pkh32t9jiamtwi79pt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gjirez3nfxgzcsqxk7mewfe5zsl2g0hm9mb58ce0h88ikiadurzjld4hygqimopjzi9pwnlip8y4kaqtzf2c4z4b4yv13t3j33ho8xr9zgkqxwzc0n7p2yafvndxyplw0q6lq9nf1i0dbyp8whfccli1ysf02gmm',
                responsibleUserAccountName: 'l1lunivemlp9zbp0caty',
                lastChangeUserAccount: 'ukypv7zwa23mkobn8irb',
                lastChangedAt: '2020-07-15 20:09:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'm07na28lhbikl0o0husw47e4huq3pa7lb3l73lm0ivm1zwnxnt7fpe42181r39ud6kagh1p92v3dfoqyzu1emkg95hwfv04j9dxj7wjxw7dbmq6xeg8q7j0clps3ud4nppdrd8gvuter98dsfqeem2f4xgjvodju',
                component: 'jdvce66n0pagcrmlq4jy2umf7nzqp0w54n21mie4al2se0v0q8598wirog4buxydip9hrnuxvnmnp4xind13c0ln96ut4rry5nqxk4c64rvty71rvnyj0x6toczazvkf2s2grbnxx1ot15a0kvzzxmcqyl9suk2l',
                name: 'j4mz79rb43jsnw1ecyrdjyft7xm7qec457t8rpslmjx4gxt9ddlknh8qd96etbe8dszm14kbvyw2naybh19h5rggo327mtq6f0thp6uorhxe7w2o7gg6dbjna580bfj91n56ypl1qn5r5m2payflx472dvwm9zfx',
                flowParty: 'iwzz1o1lkn83cdubyb0019bo4wgxsf9rys74gs4kbqzp1233k8jruwc6cwtrfklqy7vhco4zpvu3iuhiv7zonbydffd28rn2m51mjy2ty4ua0covsv21pazk0iy14uvr3v1bajbfqtvog336t7cgq9srg9dwr2bw',
                flowComponent: null,
                flowInterfaceName: 'pipp9b5skmzbzx2g9nxywzqzj5plu5mw2qm3k5ubkquace4gptzzctay1wj0dgg5bm8bajgc99lmatuer2amo3zyd9vb6qic369b2zfyz5qu0wxtbk8xvxmjd5583q00xkzkywz7w0xkusenwy3fwcyp5snffam8',
                flowInterfaceNamespace: '9bi9fgjc5jybt8u0um2tgcg9oyqww60g0m00wbg7cfxekqn5i6u3dnzq3jmoe52y4ye2wuwvnzbtm9zfuhqlz8anfnkswkat3gj8xxa4d4uorx0v6k4hoekateqlzzmo54y9xrbpnqy0it2ztqh5imi1zptrcb2j',
                adapterType: 'f59u632pa4dso5mp1xxzdp8sysjh234q6568djgof3glx69swzp40eo7dqz2',
                direction: 'RECEIVER',
                transportProtocol: 'vpmmw1egavfmdg3f68hz1gp4u0ptzf38fleuebb7kki3m7tjm6aw6mtwvwvf',
                messageProtocol: '24s1kdgy8kieuyn1sipmsu7pd8z52n6ff4vkxmxtoo9u53vqlbruq21znlo9',
                adapterEngineName: '5090bgbrwd5bivhdle1xx04mvtrxd54kxc39uncedue7eec1ovyhoyuqmq1p7ebp7key2ex19mk0xj987rr8lrsv7jqetqmp0slz6zzt9mpumx5jtpeyslgzxptujvpmf7o2n3w8u0p8e3856wxnfc711se3bzjc',
                url: '7iczimaqw4nkerp6iwvf98sa73uizp8no6wcmjrt5km9kh324eben03r4e8dio3tbj91tq3uxxy3yvmoc3fiootl4fx892owcwvs9lsnl764bf3eeckvm6luizx1mv39lonqxguac4vfix8fz42pukt3pgguyflf1qpk70vfm88tvl2u56ylfcyhj2g41r0nim5jk6qj876xthsp6gb47sf3rft8bzzvi3eyxulbrkg1veg662mkxkj1bf24wljf5un25zm531dovs980c38wq9p838e5z6vdgb7fzkt2w96ixqbo2a8icwhaw6rd1pa',
                username: '77hilb1195krsg0fng36k4nmx2ubep8xce0ynm4tmy1xk1mmdk5mmaux82fb',
                remoteHost: 'n6gk1kuo208t9u1t8bn4glalksimkxenj97aohps7cyfkz3tfkfs7019nrdt64kd5cn0s40rohovrc7y0vhvvysvu7k4jy3fiztrtcu6f6nhd4rkh3uq1uycrqkptpq8ibp4rlblpbeup68nvhjgym4y1jhqe7k9',
                remotePort: 3849679725,
                directory: 'q4f2eyl4xpwqf4y3jl87fwr5itq6s24ydweqz2vs1tfo1ru46825zpsnznbtiejd77ftwu2ryt5yigwil3k4x091b2s5tzya0y7dis8xgtg2sj4s8a24yrq7rvdrs0tzfgoii8yv9b8h09gwfcqhgnp59qfpoxubg2blpghjuaqi9dzes11ihy4win3jobb6axm4ptq1wlwcw1kagz5m2wtwbbmbbtk6xd9b191h45wom897vri80juraw72odwjmijl7yz8g63a26hdsgskscea8rhrecdzjh8q3h0fwxqv84fdawzsqimndiyuodnqnfz3pi2263r484k8pneyeeop4agsbtrd9t89yzqzc0ndf58k9z2jwltntklp3xe9ypdjhdaxqcgw2x8coq14cjf7qjd57ipjtby2gqn0wfkhpyr7l9l74qvqq7eu251a0jzvk98hbk40qamrjn7df6mf0dbmn3ulk5kznrr9rnkamhmwj6j4r0g8612jhy1chf2ngm9rq3luhtccnvadih1udrr56z063xxwtf3wf7iiyeg8kcr6cn3dp8kq70anthjx54afstk0e5e11zliftjvxi0kvfnktorjszedkzxvuu2vws8h6lzst7edag029g5sqiy1cmfp88i4a9b8lxti3vbjjlas33gq0qq2mbbccfsb3z0hcm55m4dudere69f87r1aidkc7wg18dbtv5wofalrzvcv6ajwzupe14nybgkkc48xsly52ipidmwdyosyjz9qrvuac13o0rdysypxxwmiz5uhdoi4zrjmaofkjk1s0eulqw80y3xp6ij8vzcfqjm6su6s7fk4gclyvwjmtj82qlereyx47t7d19evrvbxunmr3myk95y13a2p6l2c0o05tukk0ychadj3uvwvp36lvuwhnb6gplmyx23x89k8fks2pnqas2qpnuq8mboh7d37dgkq3yl89i4yqn600uynk2qewjrpz1icczzxxeeit394d15c785nuztk',
                fileSchema: '7xqf4cs5xxtuodwggl7ifjg1kwh2j0e7o0kpz1a9shs0ayna8inknraoa2cv4k2ne5xj3dfjy4clc8d9tyrr5d8m9pmhtqwmnii28lzmx7ycyg27zk06ed3nw2msuw100f9seutjg4rmqnyog78r3v23p8raba2bhasqpfpygc1hb1p9yd5sd5d8t7b906nckt3paau3ik0c1bvz4veqix7yuf00ji4e7lw2q0zk9tvglkgltt3sodlu4m728ndx4ciz5xemtz7myn3axdop6158drs4n3hqgimj3a9youv8rkap7rank4p2q5bvy3i8uv6zht0wvairjioqc0g2qc4y5nmiy3l3pmn4ftjzvkt59ppxl83x8v5pdo2da6nvb6mncpjaen6mwfvtn8nafdrwznwpsr4pmzrshiljaywvwgl59z35ajxtpubmijmv45jn5miotatlt6zmg0q6sizqas9da87sdlho0n39nul20fme7a7v1pwh64xqao1ymukv2x34bkxb470w7dg3zx8zj5ebn13jow0f3r90mc5omkdxi0eyvfs8th29stme7k6llr5b7cp2112nzrw6x4elv3welrki7fs67s27qlmlysiv049no3n46moun9t8tf66prn1hv5hn9bcquqxmtxw7u94y9le8iq4r55qcqpqygomxxtcjxa484hohdpuaay5emjquepxe8zzmdg5lhpn4sytp755cdpcw516tyh5y48ruqg61yirtpwxrqgmgjwf3l4xs836rumvkv9shgu6iukexn36d5woqii9twngh8a4n866rdbl7uothdlvgv1wcac2oxeohctwakiv2n2zfmc937t3b7q33m8fkgfcgvb7iqmr2bwszd1cyt1byjvp5lr7yne6yp2iyolved11ct0cofw979loe40pbf8l9mgfoa43u3sbomn222vtd26qieopykakjgtm2rk0hbe2l13gb6c4ob8qgx0ut3p104oxmvx6gtawpz5zkcxb',
                proxyHost: '49gewsg2d8yrpugcjsrjk9n96c80p42ma3b4g1f182yr1tnhi0gmg6voqwl9',
                proxyPort: 3878005736,
                destination: 'qkvl5uv8s12mxkic8vr907gjvyi0d6d4dcc4iyaulawj7c890jdpytfqp7ji2jbgil2p4u3c3ypdygm57wjf2mtk20tc8sl0e1tj1lop2z5hahb7ji24bkd6sgulkay9n7smuyzcyyavrycw5sdu8349eapnaypi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j1js2c43wnqy5dthtiyf0qqa10ggdtvyyp004y0hlj2ci89n6f3wo5i0jwyfc8qtscsiroyl48kive9gtkor2xw0njs30ug3mceo0c22pcxwalq80xiv395ffd5mgip2gocrokqrasz5bkm1e51axz55ac70sfv3',
                responsibleUserAccountName: '8h28m4negd6n5jpt7s9f',
                lastChangeUserAccount: 'j1wqcalx1z88r3zufoiw',
                lastChangedAt: '2020-07-16 05:40:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'rzy9ku34jwu25oxzagohxvzf62majsbfz3r9zl77iwxn3cmmmnff2vpday69fz5h1is6gt6tc8gawhcs86xsvluykrczl8jsqoz532wiaxzhd9fdvatb9pv76psnsxjx27qll0fcizyy0g7t0jm4fht9ikppztu9',
                component: 'jx6xdxixzmw58zip94k7y0s2aziaifoiugu1l8wiog3wt5oj0e5m34jl9ltvpnxhht3w69t3ezjtyxnud7ea0ypn7hszfoj65whjqqk8xg7gtn7g9fbu76kf1zg2o6zv6nvs9j09o5qm7or4lbh83rbxlmywobbz',
                name: 'qx16bmai3okcpb7xzxp9qvbkvxebr4pw3zqj9dh9ks3wz7293erqupzn356busbjs49juypnfafziozqhenhs1nhxxvl2zawkfjja433ferwvqdftm50y72qri1i2z1nqkld8i8psaa09mbhug1n6upt4o8jwztr',
                flowParty: '5t3v11sa3tpy67x5mj4a2554v9kv0l8n4oagngbvqb9by2z0tbj53jjmg2021t4r4au3o16uhpq1rc7pkqic1s2kglsghmdq4lilgwxfmbgmn9nm7948lofdhsb039vs1ezn7nk11sdxtg4sjtsu7waykyov5rme',
                
                flowInterfaceName: '9uvjihd7dgsn3mti6l3kt1ofag9yn57n6r018dih2feqr43cc382fmwtiff7qo6yy37ucdwvojlqqp4w19dk5zx7qgq04b5rvw5ek3bo3956xst03ypgu2b63tu5hm0xi2gm3objdoiuhgrako27zid8wk7rmky2',
                flowInterfaceNamespace: 'rrvg7d4boqupiub1gjzst9nigjo0tafd8igtl6l9jvubc426plwif19oabjcupta8jgjhge1fsmm6mogezqc0263xy1sbwj119756cp23qxy0wzyrnbwkg16kuw1l2wtvr5fgmnrs75uxz7swynh4pu4r19xq70m',
                adapterType: 'pzami5m9f7jyik7b98rbu8lfw4icnzxiixigv86prd3tcgi2m5g2p3nsguig',
                direction: 'SENDER',
                transportProtocol: 'ga62ob42lnjrpky99npyr38epy9m56rl7tlaz7kpd0v6udgv17wq0y0s39a9',
                messageProtocol: '65hq7tjj16vmnxvflf80vytzhcj2zqihrbmidtm8b1v5cikuknm1zj3ob216',
                adapterEngineName: '8xkc2yoer32cjyjkusoy0g2w5krgmuxzim8tudrh95ok4apucte3wget8gw9chf1e29b0y3gd4mnkfdhogru9vro2y0meuwg7mdgl41423yk87sae5po914sdit56jehb92mevisdq5dlbp068qap9dg561so8w2',
                url: '6eyn6unoecsa1j3rv7rf70egy46u37qdo6mhbawmot2i86kvsdd780omtbff7g6vykpwggjd5iar04m366ppo5j7irri8ghc9jcm06y2wdk1hajdvy9aip8tf536poxk94svssa52c00i7ncxikb41dkq1wab4cf0qluvqskushivid5p0zara7zjfgpxkhdiamm56xt67ms31rycxh4dmxiu89xas26thaio6gk1hvuvhp22esa3uy3p8k2pr7a2blqgyf6w5e5sny8417fyhy7tkhtrt56vzo817rzsoqhmv23dihhqdxo7gsjtoqc',
                username: 'hylhi7z2zzxxigw3od0fnnxa7rlww5l6r4rxrylggwba4n6hirfkvz1gwx74',
                remoteHost: 'psj5j6pu8fnc7n8yxum7idzk45o5uh6whmrvhjrwwqknjb60acxb1echvds32ci7uss26yy90xtxfkwuarcffyogy2ddac12gcy8waaswfrqechyv6sf2btipap8uy9jdclyuzn4bz2nracgbkq4d8x5z6nhyura',
                remotePort: 1741089505,
                directory: 'o80wbo0hg4sae2bt3iux2yz9tmy4sdp05kcexyx9tfm47agfg17lw75yb6wnii0cnqqsx8zrgi3tk1xghw072abshayet5wmj2rgfzkkicgu5yhyqz4r0qv3xg1z7e0giycd3k14uknb0et7a5gner2msrt6sec6ao2tv2agshal7kozw7x4s71b4lpox496hteoygczgqnwtmuqjw3h3q6fqymkrbdnvlnh9e3p4a64j9k0ua5qnp4lh70vc8shn3yfi4cc4stfm6lb74jo450mclp73qbuo5g3s0ilpr0z7nff966hi5hojh8ve9ec4nh2eph9jdnv0vl14msucq1qy0cy41oxtf3zkoph99nf7ft4gbuew5dtwcvib86q04296tk0kufcym0hrtb4eova37mib59rh0y4slrb9vub2i1bnmgw90w1xledcgzn8u86k1opn53z8hvkdbak8swwwj4ksnwqlg2lyhrp7551zfdumc7j07uv2yb0cmrn02pck87s1j7spie158uowasrl0ed9yzs1wfevcdegg7amguthngo55spz68dltpcxjmfig4x8d5oi0lxf0nascybblhvm01y0dfxpptrbv002nq52oc0wrq16m23xq860umpcyotiiso9cyeej9ns31sxyvojie3emptu7y19vbmn2js9m63he2ieviy7ud9aoa76q6q4sd4vp3ld1m2s2g8wmjwakxdeqs10xys73252z9vaezo9sm3c3c0vr5prejdbnlrmupci5u15g7mt622sdmn0qn85gmuxbuzya4p3ta7bm28asrgq21yisvlxk6ubt9ssepm5w7ajzol6yh6mpo3wq2uegpg1v90kna2dloxzkfl95zzybxqotnow5n3hxt4v0z6ossxjubdfdw6slbzqhyhgqgcvkxq2gel2fbn8ogejg3coviesmtkdh2ksif7pj6hw3tbp3b2o91mwoany7dgb110m88wznwshf12e609zl1lpsb7tjb4',
                fileSchema: '8vghp7gs57d06xr3yf5lq5wk8n3msid0so0l9nk5yzdn4fxc566clvw84rlqlkwpes3ociqdy6k3f1oa36xt08r9o3hj3sxi3hbs8746rzd16484ogjo3iw8iksx9eduqh4q9hjhunum7oktiaqnfml0fs8mdw28bqc5wc1vfv11j66vu74stxntnbwcapyoufdfy2jk4uj5730u3cgracrgiwocyyh9l1aozq6it7d3dq0ix1xgrle9wnm6r8i8i0oifftxmoc8ntpyvu2vj4eguowub5xyxr8889ceuhr3s6i4gy6a8gooj4wesq9rnfx02ej88yx19e8v37vbd6nzfhmhy7ou5odslcj0e8d47br710d46yn0bb11yuucz20264ojrzv5pci0rcwql3tmv1ppivqdxmmmmeb6t5rrfqvnfm9jz6rilwfs3kk9b8b84tk1jjgd9w5a5pt52pxiey9xlvral4ht0l04slh9cikldau0f0i5ccyjvpjvys46ctfyq40f251p87wz2vvod4m1kv1f4a255epcw9xsksuf7yx5hncihfrvvf6da70su7f8xqalnf0ozgldmpcscjhqsfmmkegu759asqbr0e1eo4t1vnlg1p5svnx3r0opdjrlmx99wvniiqbhaa09b6m7616dlmhq4fmf67x0mclartifixdumgk1mapszx1sy2kydt25r9qjp5lt34qccy2p90q9ez89igccgxpu9588ixelhdngdmgrg7ib0grtjvi7kpixepbpe0bs7ggl83vwuye58bs9g2x10tot37285fjpcd77zb2wpm559pi5xcs1m0eopl0jok0q9fr70shljzed877at5yqi3j86nys3l7fbpd4pdsgkkh9nm060fg3h13ze71ii0ctlszeod08sweruu8g5u4bjpubkugylcjtfm1sqr4puvbmpeyzjcjrgkucx1cdvztza0kt7qtdw1ak0kk7nyzsud17dhf4jjrspbyzjf63yy8p',
                proxyHost: 's3y4d6vurwb64a8yzk4j4wgr2p3rlc2ugbwatzhid941dazmrt4wbztj5sco',
                proxyPort: 4061338315,
                destination: 'wsrqqg9iyou5nq32s9ebrtn8at674h6rxnxtaxhvhi2cl8s8tjml45vb14x9wtzn224qbbvcarayle6n19t2vm03mdm3zpk0zis6hhnlkedpmvxkc311tfllod0twhg7etfthl48i3x62ycejffylnsybee3pcd8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xbvvplqmtzg3kruimae6b8qru0jjaaojlne6387olo0p7ne327xcf5f72f2qdpzugtkxx6el47idvxs42le7s6pww3reokevaubrsn2i09hjgtj6lk8zayehivvm009b5up28ho2kw14p1c67kgh15sn28wkpkvs',
                responsibleUserAccountName: 'jdnkbf1gfjl6j18hr0km',
                lastChangeUserAccount: 'w6yye8onvl0cw5bdc0as',
                lastChangedAt: '2020-07-15 21:13:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'hex1pixogjrg56f0tpnds44t8kuolqkalh0fq94cpg33n8shc0hj74jsj16m5h0h9g2w0ckkyupu032l21impipytsn7w1ccu5fg4j8rizlu8pqa6cmzjv5edurjsoq6pyywsgi63ovyo4ru6rtcquomzth030wa',
                component: '4lsxhv7gy89ec4lv1n9dhj45ebdyzr84yq1ldo96jb6j8ganp4wx8mtqom6cwmls54n4bpy7s168nzi90mzj7uijqbw1vfu07eh1z2cg3nata60wqwt8r6n460ovxzg6uedbyltbvh1ce2wv61w4m95kiwg1w8wl',
                name: 'g8qk8aqzdx7eomu1xrp9ztnb1vdv986b4fy12gcige2wlevr477wwagdn97us0tj9kt903op1zz6kkv49cmun6cwso9w4wgp8mb2ti7wznqy4qe8s2pw7fudeub4ynrobenq3oh20iddcema9y8310avu6t6pzzb',
                flowParty: 's6f83cxnbgafyn3py11ztl0kkg6878l0tsr8m8qasauvx7fea6gdb9987fw9wxhszezzwb1w87kfwcsrhexkxncx37it2zyhxwl329k477i6z11tl219oe2236yuj7miw6wqjray8xhcwhcb3ihlic4zro2g5zy9',
                flowComponent: 'oy72ffeh2hik5k5rsrebdv54wxelztwg4weyszgtapa8t3wjucpeza3ic4ce5o265s8n1ydvh41negwdmpgga08j2jc5aysrfvon6sdp4f0lf2d0trizrr1ijusok72y8wi5038uppnmydxx1ceiy0ad16qvjvz6',
                flowInterfaceName: null,
                flowInterfaceNamespace: '3ylmi0l6mdwfqhrhhvf5dtkh5m5lhnmnmru3li0ef8rckzuy2olaknx73z3phakkewj0c5bagaqw4wko4wgm1r4ic2hvdkqce96pfjp5otgh0qa2sxscuzrek6nvf4xxayge1zm9c3j1mwfiu8rcyzpcb9zu9csy',
                adapterType: 'ea20exlc4tlnrfymty4mij1l9z0zp4qk2a514hune61q3cqomq9k7pvtazlg',
                direction: 'SENDER',
                transportProtocol: 'tcdfwjm14svktgzr490gjdzlkupksu2aymltjnlmboxiq94f4id3xsa41xtz',
                messageProtocol: 'qr9s2fqqsvuqxs0alyoxbdr0pgg2u7yhqmk8crjeeuayl181kg54ivg2ml1i',
                adapterEngineName: '6eziddx3sqzgd8h2i4ph9bvaeyw0y72np91o21qbyoqk0dt2rsyb7llcl0mh80yt43188ip8umcx2d3kycx04ozhcl8zq7e0siz45mecdlw1cirtsey99tnhtax7s7d2h73wwqzwdv55b05hvvambttgy9fwznm6',
                url: 'f19od2m035da8hvg8c92ght1pvdqz8pybnz4vuo24cvifee9r8ngnymsqhb03h9pt1uxng50afkhcah8niz0e7ie461u7zrvn4r2wvpbk09dfx7ic0y47bijehb8thj24nkasw2fn14d5cypkl8gdjlckenavfjptnaepg5q94k9bidxrskeulgx5r3raz01wwm5x9tkuzutuzcltr9ynfmas180gf1trbvpjkyi5ki4r9y962shamdulcua946v01i3d7cmpqe989dqnthx28krdqdna2qrttf288z0intmo2g3qdw4bfsxlyb6x6n6',
                username: 'vdygu0rk0txkh7z8ebij7o5vsfpm7znf1n56g70yfyeq7eyzt4ocs5sz04zu',
                remoteHost: '4ta4qfl2efolk1kg6vyo47h9f1e6dq51jbsdr6ajs1lbnwzp2plrp3ooagtmtwcyaap1u20l7bywogveqt9e7eteublole88vjrgl8r70yrxgrak7yj1m22hc6i4vrw4vjyg085e02jvb90n3jepjhs06gudi0kb',
                remotePort: 6180409919,
                directory: 'ie3etelhih8uoce24xp6tvhidnsgsci3zhuq8p4argy10k7nqdv7vn2vqsc2simsny0rbbf84ciedaild1v396pey1nk36sxida3h1bbqvffbvql0hbjlyni0knn1q59zz4nr9hr3h9few6x1l10yvs8ii6c4tq9cqwoblbtuwki4dvlpq106gbxbpnkk1plrzhc0j0fxx0louig2yvqxm4viowai0t4s6qnt90qc6at6trilrx7a2bcb4pfgdt30n81kte6rcc9m7gzl5kzvttzrce2miedj34v1o4ncaofn89kchtw8izyq8lbk3iuobcf2edo9vgfbjiu0j31k9jh1hx1tx02ymkd4zsq3v6dmbn1hmeiykzeiw5aaniabbyzehxg1y8jva1ml85cyhbrzwcd1l05u38k5jgdeh57egh1pv49v3ees9r0qzvbu177y8wavpxcrpuqly12lty2ogn1d0g7ybbjew3k8s7nzdqovultkwhqjz3tsge896rffufle0v1x642hmb454vnw7u8ojl4ycsyxjmxl64brt3tx7ysvjouedtzocrlh0bs3a1s9qnlfrr96mklcccodp3ui84q8h0afnclij89fd3lbzqijrr3f4af0hstov0zfrb9uss39skrx05pucspu3pz84nrnr733t3z8h83uhtzv3ylcuh3wvgzfm1f0fe60dlxws3cocq8pfc8suykzb7e7h4snbyvfk9ajgb2apde4upem9fncdpmekzml8orjppy6tr8b28a5mockeuu13h3be4tpcxlmffy6wg59b25zplxpjkolpvkaoczfic1dd34d1dfb4yxyzkbau3al68t5qduvmkrr81jwuk9tnwr9wnmwyvacylz31kae9wkwm0gieizzakbcrc8mbhrx6bzlcgyug9k4bpvatrw8olbahi4z0ih1gohtf0e147t0aux9rnh0mucdgfz4aktq0fg4vud37uuqlbnj1m84rstkngiy4ynx8hw1y2q',
                fileSchema: '7fiumifi07d8cnjvlxsvj5fo302rcg59f6so61pyfvp75kr9sh4rg29yfkp4rliwjp67w1yngwees3ltub7l5vc3oqnvu539x073y4o7m30b3cg5s8s1not8le6tj7u93o97ahbojkd2zkta3gl98y4i0mtglanr35ejw9ukaoynpjlozehobpprh4zdvlgui4mizvgrjqjltva9xfwc5gxgl7g9cnpka9q9vrg19jr2hvv1npp7b51e81u8l7pckstmsn4cqnb400byaj1hud9zx7x1priw2d6dffmy2luwdk9g6cjp6tn8fs7b2k8z6o6ik90vziakjp3i7h1l00zkxepecjuztzj2bko32gr815psr854gflh97ie96smvdh6vxie40cl7obgy7jtodljuvyc2wx2u6cy3v4a3k76ug23r8t251h0qmz1yw2k6slum5pjtiblxab7kqrdu9gj1wqxcmnij6eqzbyo6jm3r5woskywqku51at3ydjbst8yjli0sgpk9cro3wlxb8cnbgy04dbnkyxjyjplvy15eth1qks9c3krpjdkyz1h28yriikq1mh6sanov5uj3x7tdgjmdx6bxb6sheo44c9rfw91rwrmp4qrocyohz0d7tojcv5hz0pd5bzuy1pzyu3bzg9jjofcbwdle6p3ygulhny8pfoeo87mk3oe17y6bn95ue115hvdjlh5nbkmnx5flsm7e5r0s3u503dn7zl1jrw2ck5krtfb6pllomwaqol56wwj99nwlgcmvqhm07nbdtrn5z0tu0zw6tpucig7tpsz1om5c1nf8eryp4luqf4jzbp5r0horbjoadrrgpgl0hj8u2vccm8y0b4q3sg1jcrw6ci4sdf5kxn3i5uikke13wlmrml1gj71rvcstx1x9qwe55l1effp5v2cfeezbcbouh5u1a8bi6wsgd2gdfgt4l9msipserc7uu170rr2mu5zsj1osf2wadwnqgwx7gyunu63f0tyshu7vf7y',
                proxyHost: 'p4h4ezfn3fxf1j69yyw6gfrzdiesait5fylexjbcizt3604fs9nzwbfecnie',
                proxyPort: 7149191337,
                destination: '3jo4yk9r1ky9fdb1yp3pn2ewuosozoxp3wn473ofy65qrzemw84t5ynwb4mosi571mi6qmknwaov14dhe28sku9nq8sc39fplhkmymzaihsyc6px7zv31nbwlum5g8186oi0mwqogi903g3bkeg57n7m8uvkluuk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g9te815zujojd0ipgdy5ubquy5pgqhwftcuircwuetjgaz7uq8olwcv2tyzbgxxh4shskl6ufqf4uarz4bqllwkwbsz69dr5w37rhs8ajq66vk0o33pdnqxc8kn3dpl6iem6h10snpn0q2n7wfx80e17s0356cmc',
                responsibleUserAccountName: 'buuag7pt6496xiryvxh6',
                lastChangeUserAccount: '5lhbmt6b5vkz4hq45ey0',
                lastChangedAt: '2020-07-16 17:02:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'qiucbt44x0ct2z3l4ucgpwdqfvjk4lfun8efmp9ztwa0uma4b045h6l1py7aj9alhcnhqviam5zbwzw2qam0wqszqx750l4k1l2zjaiwpd0kxwh3hc26rxbmiqro2alage5ups6e5qjjidl6odc5ndpgr4a6wp9k',
                component: '1vv4iwfxmz2vvblk5jumoxb9716tbuefwadgcdv782r9ab5s2bh2jawmzxa5sfvidf4ixsihcpxzyykeijpsdtarbn5drkzfpi0f7rjpv8kacm4c96austs43opfc2lqs5zomjzlni8w8bo52wx3amge63bloyf9',
                name: '1sxjio520ftxczw303xdybvypo1huaem9mplxt1iqwq4mgzkafw3kbo65s1r2meh6oqt8klo1kcm0kege6dtn14epvv3f9rpbff320dfkp7vyge7ijo103h5mj4sthbptllqc58w8372s9cf2rsq0j8jom9ihqnr',
                flowParty: '2bk2brpr881osris15tdc0hmvnvx5bv2e4iwg1lmucbso9emumpwvon031ezzhmq10s6upw5adaum7k5hvy04p03qpdh4xltg01cnk3yh87c11c1ece68c1l9arz4jv4r8guupdzu3yxm4rzinucl0avgjcwm04q',
                flowComponent: '5tfat7fr6ayuoqmfkp2e5ddhfwhr7futl0gdx6h3ukurq3ruya5e1hjkj8u6z3hcl88nowe8xosxc1ql8zzcy8k2chdbj16o0ci6spzw32o901saigwwjztnspz8q108s660isik19cv4dfxubj5aokgy2c8ebc3',
                
                flowInterfaceNamespace: 'ktuz8ltdiiqu8qloiukld40q2i82mx71zlefwf69mku8fkkhkw2gj0p2n3kgg0m40p3dzl144toy8x8qqcz59o7ou2wb988x7cilaaen1h6y1a5oilmonm5ct1jm7m4i6t7ti871v3jaa5yt8jpe3xky2qg58zp4',
                adapterType: 'wu6aog2kzryhyligrlyyphza5igju6vjj48mv7i5yzndu8ykoev0sv6fsil7',
                direction: 'SENDER',
                transportProtocol: 'nww0g32wduwk61hrlnkib9hjj3l321ku5xpbj8h6grqo7i8rm4fryccxqz6t',
                messageProtocol: '4zf93trhgivfbiuewkk9tp5luex71kczaw86hqqt6ylgwsg40fw9ih6ja3sn',
                adapterEngineName: 'e22x4aggefhidnvcr6bx3o3znbupqv5m0umuhnrcnz259415yazgk1jjnm9kzag7a6nultpgm401wst7fep566nmhb48hx2t1lj9oxzh86oa94tw8s8yr02x57dr36wu60vp6hte36589e7c5c47iey3mqc1ilbu',
                url: '042bpul6jvoz75gbvqqyignfy6j7cvi8i7iawnmuv9t59421zcq36caowyob7ta2j5aj8sd607fx6estkbn3lkojt6hsab59c536uxr9xur5hyus0i6amp9extq8n91bidf6aaopn1k3s3iu50udng99f0p4pgup7ejx24oc1kvh3f7qblqft9cptvpf7eqoxjri26lwd8deoqt7edc41h625msucso9j16xp7ejggp8czvw10vnucgid2sxio91y0p0qnu6vofxbp15ilkhy5aiudwy5b6u5xqgpcejafhysqzu4yyxh7rjuu15lsuu',
                username: '7y4f1pmg5g0zwv0eev0bkhhxrs2lzzzzig5i3kuklo1rj60arvgy1zrifjnn',
                remoteHost: 'tvtc8bn45jisxj8ltw6ij3ntpf59ueaj2k3s5hkismnnfz3qw7tg1ale0qjjdnkoohoqfsbj90lbmxzs5hubtvb1ovk643xwxxui70gc5bywothns0l4508a7avbz0fsu7nhni4tvgfu2zbznvl4wm43pjggpv3y',
                remotePort: 1317782000,
                directory: 'sj148kg2rc1t65cailxoynh83uxktmsxvrot0f7xqnaxjinfp3rodpluboyzl53hec8or3vh2jkhdtekw26ztoeo71te5a9bp2p8br7iywm69nqmu9c9bl3rqgljmbsn97y3xk1ibpa9ntasynvv2dio1y62m5vkyi0c6ri98ih6p4y2k5buvs28dc8brt2rxyf776tllsf2sq2ln7o39z20k6nbl7ago1e6uekssvv7yad5dyik98pan5nyx2uzqahyxemebuhtrg3w0rkhs5cyca7lcupb5a61k6fo4eg3qk62ae5rb7eahi7neez0jk4j570xk5inbd25tic71qy70ueq04097ujligqd97h7zq40ry5rt3c8btyfjgfossjy4lv2zs22oy85bs3h0xl6pi1hi9midmm29f660anprdwt0pm6bg150qn6jnjne5in2lpbvlvz0qw2swi0swt6s51l2mqx9ki4tou6ql5recq3okv4c0bmdh818dnft602rra3zylps2a6c9nb1nce8p1zrkezn8yniv5zq0vsu2wxv6l8bdaec57yldy39o3o801rvxtr4pon4g0tmfj42xag5wfz9n7c3ebw7xmlfin4ml8le7nrqza4dhv4xmht4dcsarc89jp0rexrlkr2sfjl7eq2kozhx0sf80z0jws7rnk9xtuyia70loe8rzxhludgnj0py7lk7505m2f20e3349n97fch5hfdv6mhd1thbex1ich288u5xld1jil6ggwozp9s1qs37pxcj4lwjfcbdbilhamnb5jy5bwq4equi1t284oosjk400qx8bzukfza2pgve5634pang3ibckkdwj4bd8uqvgboibyamhmycrgzaqzdofwbac9d1d3b9quze2mak0qwgtx667n3g0lq2hdxdagxz73uf6klspcllep673ge2xtyiuv7ur5dplapkj9qrm77qhuzz3jrp3mninbp2rzjcodoh313mjg1uqpsct12mz9kc3ss',
                fileSchema: 'bdo6s5s7drxdu422h9x7x7kjuyogbwizecgliiye9ef8z1cqjepzgio646yuj1jmuf0l64wtnofp9dbch1d2eqqy40stjg8vl4h06vx2r7fv6wtuldzhkoueh22t17gkj6b70qvm0izr2ficy9q8gpea4tcsxyurqxkzske0o69lofnobn0qia2gyf0mivephevezs0x7c5y6iz6fx1r99qr9iq3y7i8c6xzhl8ttrqdvg5h44vjw19u0dq14w9d8fod7lm616i4ewk9kvtasbpdfwvlw0rrztg93ucotsglod7n7btcx72u208ojv6vm8pt90uceblibj2f2qq99f4sac9ms5m8l1aln186ipaxgpa1mmec3ckflfcwfp652ceccnsrjmzw7eb6fb0algc1d9y2ua34bq2j7tg0fuanghf2u5rhy27lkxkrljgr36esxwfz2r6to6xbv22qfiq8vzrtb298f0dzu8fhgacl3jwjvoq1h6hhyf6l028l64n35x350h7fd9hv0yywq6xa3alg71qnhzfad4r7r66bevghwapd4zov22dvzo7xwmb5t6psac5iv60igopvctd7ds9ux1q0oxm0x9rw83j4xb2le8w2kt0lmzqndyy2l9c96sl07vobq2e84n6bx7rwfnwovg84airby6yukoxuzkghdh6oko9qwjyycdleodey1kmzig1ko6mwrlmqc1f2ha0l96ab1b2bmpsjhec3o80c6ydcihwnj95u3e6zsx0hxnop1ltos3uqoeesotfn7ueaxf26tdyn5wlq0sb6l90rzj2qco316u4ku6w608mpeeppvay009rlsld1jn5ks9jzzz5opyv9q8ybsewg5n1cz8mh4lslx8atzrjk47v1t8tft20cuntt5echtckpklg5vv4dnahvfv52l8xwvwzh6flhthasw62z7j7ws00sfpu8qwnio1kdsufpo3tkkn8kw89e4v1p52f6ryoogjh3hf51o6vxfxkja4br',
                proxyHost: 'fz5dnc2fhl7sazbdi8r2a8s0sjjc8civfd0lpcajvpv9ex16akzyeilokp6y',
                proxyPort: 4700039141,
                destination: '3oy83jh8brhv2ad7v76z68502z4dbwq6k75bf4k14bz85pget8p0f56iezvz2opvyw4ww6mcby9blm1spv3zrywgkk04rgoxn8rqddn9xqo05uz2gk26i8htt8ybtj5kqzlc0p8paaegeen9rr4zc935fyzb1i7a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rfyihci9ey9gpgt1a4isyf6nag9teqsxe3rohrla3d0zonmj47wvj8glunk6xe05nl03ondqdninlc4ounz0d60fdn2nlzpnzpjolunbni33n3jqhtktrhr6x8lf0sqxky9xb041nh3ftnlpvnp9oyje65eoqy35',
                responsibleUserAccountName: 'fezeqxraapdx0x8pvbvd',
                lastChangeUserAccount: 'pbc3frlxcwo6py3tl7z8',
                lastChangedAt: '2020-07-16 02:29:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'p4kaxop2son0ipz9j6qtz539pu9g7dzr5vk9mp9q6sf60w6f7vif3muk7jx8p2a1xs8t2ht1mn8z4e1rh96t0jigjnbijmp5kfux2wwx2exsgo56gy0hnya4bcptrwnn2f53b37osna7yf2pjwnzlvdorn08um0f',
                component: 'gxqdpq25v6rp1h213mdl9lwo8p9uwjtnkr4hjeazctz4uy0mtl9jqwpiefxtd3431hqtvr8hb203pzgvk94sryqef7hs36w4kgb1zg0hlccpdbjulx6tk1szlzzqfd140ll7fnyyv9abcwf5zaztvgzmsm458wy2',
                name: 'pmf81br7oizia8p2c1odw6agow07fl9nqdq3f0d9s6ykaca5mm1eu9qx7k6y5mgf3kj5uu5z12ejoizri8ayzbz520l9bk8khl5h3r17vcma779c4yanerumiuvgm1ctw421tpdqfxqpe2516fcotj2gpdsmc1l2',
                flowParty: 'ywu80cjp6uqc7i8q5nkk7fgwuwyuigm9vlqrl95sm1zcs7djr6ja4z60tljjtbaggkrqqvl6v0ru5piac6isj97wl5mqb9bn2zhio2zdze5z4pjljble6qssgozln1y3ir1xn4g8jqvy69wri9i15ow01n1qv7up',
                flowComponent: 'tqvq3kf97fe326q0vw9htpp7hisx4aqvdvfmco7qi79g2hu948u63ovk19mjuuz2wlbxcjkq24rxrpwzaletkcb1v7u33zrr7mfbdesfk5ux5719nfxy5vlaxydvsnakh2uycbtwl8eecg7igaxuuahss9iu24tt',
                flowInterfaceName: 'gga18jgdd7g24loen4rxm2e319yz2jaoqrqq0bdn8t96i0t1rc2vg1raagucu2soyml0t9iy4iajxpbqkcdd890j3kxbm0fqsl5dldvo84kr6zx4s4yhsc8basm4wmcd8yny1e1tt0ocg8tkz8attbab660d39o3',
                flowInterfaceNamespace: null,
                adapterType: 'crc85luonolhe5r69i14mt127o3mpi8ubn1d6b5lqgmvrk9wgwkgq2zgynwr',
                direction: 'SENDER',
                transportProtocol: 'p0e8sg8lw0eeuero3eyfg1p61cv968c0c5zkk6kcafb5uec58lf1me0r18ey',
                messageProtocol: '8jayqo20mzg0hudtpfnyzmfiixv4czogii6vihxvne065a4akexgdh79axwc',
                adapterEngineName: '5e6e3mkb6txl972syzfm14mzlc7znp6htzaknwtondyqycvuy7m5ars7vv4goootbbhc2bq189avcjy4twpcjz25otkr23dnwcs1c23fbthatxbmw8qo2zf5y5l8jb70lc586dgdvo0w1978syxrybduwif6uh1m',
                url: 'o87k1gb1zth8zbr1o1nqdoxc1vql3xgim7m4mgnei5sjvo9wtoxe1aeymurufj4cxb3zj1j13p4n5d5arvv2xnrbw0urp1ew6ijx732dc8p24r4dxwgrzq5i40fexg6rzacx1cctg0m612ujhia79r4d6pip83nav0effuh7bqlz1usaz28yyc5p1alkfuihw4g7d3jgx8hohdz08fm0e7i2xcqrsl8sdzjsltxez5o73r8sitkqfc5dwv3qspnivm7m89b4vkie4zape39gabnyt5gtkf2li5y35yqoemel1xdhqvxdngwbx5ww9g62',
                username: 'w2bjez6iw0z5gc347qm70szldwj9bg2spq4vkecia7zq9em1151ottbjowsm',
                remoteHost: '1zz1umhcu3v7i1yitiqqq99xgw3kucxiuu2f63c4fot85v4j8iehbzj3k12qxd26mg37t0ncomf9pdbookwpn1sb0de9g1oxt04cl2263viglg03j7m3ivr1xprngudfbi47w5j360xuy5gcgmlffsru12by2upm',
                remotePort: 7964520161,
                directory: 'ijvxkkcuxxxe8mlsrnvccegw9dvnlenpfj26lxu6nzphmy3d45k6xrfyxll3s3d7axabdbqid4553zy2b3hqw7e7ftlhnqz0n8iz3weu9a9ziweecto22qzygpou8i2k4wknu3nw5y5e0ugwoqh5xu8fg3cytnizscae071dk6v8urug2h63lxdo3ftfqozhnebf3u93ou07mw1wwh1t35s6y26rh0zb2unommq1ocepvr4re4jo1scksary4gu94m0y83g3ua0r1l2nwu9yw4ii47tqmghw8a8el9x1ndievypme2jcaq1a23i6k2xbf2wb77cbs3xnvntb4jjtys4sqzpywzchx0yd0y43caw1qxxo4hmjx0catjo1h12ctxwcw20v37ogcyiow5pxigq5n6b7lp1q6k8s61wohpztx6trqio1xoo2bfisc4uxyy6hu7qdk6g2ze5ju5crjcxr3286bgk8ub6bw0rjpjht1ie59ndb0tu9lwzczjafrmwchza7ga94mhwbf93a016w82hya5ebt8ev6t2oz7lw215ldff7ou95aeeukcqcikcmmxbcn95033joltyo2uctbi40zpxkrxz3rlt0nujc9p54h0fhsqlt6631t0ypjvivl1l4hzdsbxpr8ggyfca98xdt41v82cuc0tmo7uemiumkdahxe4pno7jgflfb8xqsrr7jhkilfi88gm0u132sfgvimm6r8rwzkp69pyhkvj74ppyz29b7yfsjzw7cv7eg9v2j4vzdigsnqc0eb296roi8644wwflr49w5sganmpi8oev2iokpmcgy005fe3spzz6lyv1x05uf3j9vrxu0qwnio78fz3iw9g4c9247f8574fj0k0t4rjrrgpznnvdvyutl44bg66smrsf13p17m00h2tcn2t7pecy6pd2nnnsdt2k8wlnjzrokkbadk5fo5q96805hq92y5wqzej8tf5jsedkvon2oegchw6kb2mt9h58r93nk1invzqk0',
                fileSchema: '8i5jtw5c4oylt1ioi2un7iib2t9ywu24fy8264kx37tgm9cq6ttwtwu4wheii1y199ph05yc5li1ux37ww3ku4e428iytwpsazd61beejomyn5487ac84d19r7nv0gym0rpiiaatxztbnfyirm2v60bzwwqta5sdw6jotmwa6uojcizlm9i5a6cdu0ilh79dmxz1z1jy4zyinhwi8v1f717zq523058zhump210vlbqw1tpo7vrr8skgm3b5b934briyge77uza8o9p14y8cjsydkvbkpxag8ujlmv784lsukgmbg88de9m42a1zb5b3qm10v4e53gfdpj2s9kinep3pl6g1o8j9azlz9u8kjabz1c9ri1tcwcqys72rych1xx85h0bh2alzx4z9ytrzkr0d7z6wc2c4jbu513tpfx6ro5apcx9x9oywqre886y5ekswfccpltmj4zxp4qvu9sfyal48m9qmv7rw3e0ld7cuf84wrvwur41gvyyv9gdaxzyiulxeh9um9bpuvwn49j4ix06bvj5x4r7miohkyrl83tpmcrpnb9lp47xny23b8d7rvkpfetsbn8s6qcxwbmr96vrngapfkd27h78lyx7tel3bmxiuuvpzekn86pmpl3cfxfr6kzml6v6eqq33ce2nvpx9qx40hv2zckt7o48e009iuzbxf4lf9bb6cn7eg6kmadxob36h4bv4rfc7gthk29luw7ufifx6bk1ehl2sqgcyb43dua1e01iwn5xxqynouekmojvw5y3zd53gnwkucoaaji8cncpp35bck2z9krl6uotanclgpourl9m6o0eorizkyzr3wcltuws13xi6r48xwv2w8dvx768899hruf5isn423wbd52qpiq86ugfcm6106dk3n76n629dngyxgeljwoceepkfqtpzrrrc3m3h0g9z5kf7c4i4bm5y8uu1v2bk5n7wpfzbrw2cudbtz4oab33hoeisr0xpdydfai81kyi0u8vzz6dh4qrd',
                proxyHost: 'luba9tjp6ikkwqkvhkgindwzgj5lts9wjfnzagpjjxnlxugd3axlg1lnnn0l',
                proxyPort: 2364823070,
                destination: 'd5nxeu3ekckzff2h51m253a00sm9l8qm5lzzhthwjf7bj28shkzmq4szbap2own6p0uy2gmj5tlsb0yhlzzk7fip4630fx8q5xhz7qw3a839hsjner4oofpwdkbbldvew8ugx03xutai1xfnwnwxyzzjvu1y1mm9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y8iik968qod213zl2hz90k8vhp8hes6mt55m7hlv9r7vycbtpsdchm6f5ohox1nx5qbp579c9coosg2khx44l3wsgd12o04aoty0bn4g5aw5j6qick2o0a5mo475i5s5a3mutaj0f9i9txab07a0mmfe1fqkul8o',
                responsibleUserAccountName: 'tuyqxl7vih6p880uvg9v',
                lastChangeUserAccount: 'b2lc3qryig5v77gy21t9',
                lastChangedAt: '2020-07-16 14:34:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'jv3fmsgy79rq4nab98dea7i4fi2mush3z2hhtegb5tj88l58iulzrrkwmovjnmckccbi69wjxz092eh7r2ob73acfg83aqt17cvtr84dbrfitdahhpy1mk27qh46nvtmxrl16tc38y8e6958bpgwb89o4evmokey',
                component: 'egk3ouraqyrkroj3v5kjojx78paorq5hjdug9n4wl3zrz1a8mmibwj6lv3poceeaf4dm3jpajgobaymy3qvx5kieow8m2x1e0fpbsq4pjs6gyec336dlr9yl6khtxmvf5r2wnbw09dyk9f7x4nzcts4fyl9lwi55',
                name: '5mzkr8gntnnstipl68sy9kh3s6rbbgf1k6s568zhlpkrgviptqqhe75lc42e3qxevmr6uvy4kmn4gnlxg4hk62vpaifysgsx3bnemhdiozg0o99pu4ex1u6l8gcu3frzotqjpnj6adu9v8toa555lngdmtywef0b',
                flowParty: 'obnmcgdar000n9gk01e3sf84hcsnyecffzutviwqip0jt4bykrxa5baa4iysf447r1nddj9vyaq7ezeizvqybbr47f3tnfuczzg2072ddn17r1q5y2cxjpf4jbhyvmg9dqo50gs5vndg2lw75smxhnltzof60ak6',
                flowComponent: '8ee2yyk3bkixuvtbqm7vwvyzogn9p3nig5q33z3ba1th22gqflyq7d02w8fg0y99egdv5gq77fq4yrlkjpg35b05zgb72k8wqamjy1l23i3v15ohfqhw2t46hay2dxrypv3x751bvwlap723l83ayjtnov56l9mq',
                flowInterfaceName: '0zto4fq2wfvo0c1x4l3c09z19u3w5msg7wwghs8h20fbddj4lddvatdlccvoh2hj2ywffdmsomgckcgucnf7k6ya67vsktiay6eg0ww3b2yya3e6raw8r898z3cbs3uzm6gw7rxoyt6rzhb6xl750r716tj9g3q0',
                
                adapterType: '9wv4jrttcith8v12oke42z1b5qqgt0zkbs7pumvwb2fgfgzq6c8b3iojg9ya',
                direction: 'RECEIVER',
                transportProtocol: 'x0rizvz27w47mnmo4te1vrsr5l6vaeoj6qzc1ul4j9vja6y09zkujp0baf8l',
                messageProtocol: 'o1m0v1noe1dewskt8wxg6a2edxbxuhv35yi6pdbqz8kv31joxi7r0trpx4uv',
                adapterEngineName: 'n8myjribk4syo4sanpoqr7lbohchzu4tgfcjeyz6ki28kwuo4dh34avv9y18uxfo7e313s8aftdwhojxlo4bvapy1eshluidu7v23vpxha1fx4ppjt2ow6z65dhgs87ji8ljkgtny1g1acakzafo0qtfns43cnyw',
                url: 'y3ynwsm9ls0ska7d793n3ghaekbwvan2xflxx4svx4fx9f20bgxarctpcux6s4onmzc2r8p9a27zphpza6nmzfrlezznkp2hudy7qcm9smisaz1jbzp1kqu98hiidr6rsoytx8olwhv9yktax07w1o346e7ehr9j0ji4eyhfqccz3tnu649pvih1i1vkrjb6w15eci8f6tjaifnf39zmaerbaalahw1s14ybkxosl7vahj39imi1vrh9l6uzpgi3z6btx1706r7ee08skfjgaax11emkcvbzvw3pxpsuizs3trxabmz656lufibq0kpp',
                username: 'cpr50y1tw77twreggmr7amjcena5drh95l399r41bba1ijw3vobbi6yyow4w',
                remoteHost: '5e6ihojgeufgihuzjjdrwy1odfh3xitoed83ekh7roo0yvxu4029geogobw236sd5gs26cyxtt6kqajgaeec9b6rgo5jrxb96c7byv2cidpaarxbmy7spcde6cj3216y6mx1qpplw1mm6dmf1z5qbjjjubqnc8re',
                remotePort: 1009176343,
                directory: '300qingv2hksmo24qp0390dtnfxrxmgpcpox2tj25zukfon8r1jxdaavfsuq3ejgsunteoykrdusgr9f8rpdu7qcpowxafmtpgsosn7nw5har6ggyx0fl88fgy98lf36rszvx03pyiywrth79fzzwb8h2ew8ct2zww9x3zqxed840iavgmsdo2e4p50n175d0ivadrrlkupl15inrfyim7ynej53yogetyyhy3fieghod6uaazmvxbmo7w4w0p4vh4w74l3or7szaeq6la1ajokhgp6atil0bjy2jaz4m21qdij1yocmste79dkrl5y4auw02u4t6qqbo7ccnbtbp60toui07jttdgmg1nd81jyox12p7swjfddrmt0tlmvyp1dz752od9tkb8cz0q70n8e0nrpf5mzb3dd67xjz3knl5jh5ay5igdjwfu82dko7vtvy830p6fep6y3098et2ysabskhtt335gouebij6ic4bz5w4r71g3pl092dvgkxb170xvglwi219orxh3nbor8jx14id0vegoxihjbjdqmcmfjgcozewp6khqhf6atyax4o6a3kex9csmc63rzsoxnhqjf41rf7c8gkyvt6w6xsudlwrbq6wyn27gyuoxroiat8h9bkwxsof4t2ljtp47huswyov32vykojiv1nmi0rpaayz6rcap01rvmmdl5etjbnqj8x68k0sz1o7ype7srcjinvo4rdvtxu279h0frgd18nrvgl2cizeb7jadlb9giv7o3y8q12w598m80ktv1ifoxxk71uhhage3024yhbthe8l11iq1wllbjmx4lze6194sjkterh62p99e4v80qm59zjb1ao12rjeh6lbzdsp4kv9enz6khy9oj2jnj20pbihk8qpk86yrwalhyip6zitypwzgamadlxu9p91mh2o0myw4aghnbogiynkutfbvdhgddc1u8nznghuzbbj8yqopk141q0ya5isrsextavtt8lqzdr922zyt587fcr',
                fileSchema: 'jy7l9jy2f6n8nz9llucwl64nvwqsesbg6dw7w1ufa8oke1bc2pbrtkm1ih398951nti95povpfs7ij2t4rfadx0ph377gx90z5bbjjp3fif2d4xhtgoyrqvi3igfi4mk77eehj29z4cybfyr5zi5mc6d5yb0zpgc1tl84fu8kqy3nog3q9qt4n7ndd8lvzfwqpfct8zpzg5l8mzh2k2u03kmjxqyeztflrao9s0xlg9aum6p01w2cxmzg1o7gbu1acpm7qk3967rg6nltn2im255u10uyoamsm8b0af9ovqea0ft2rk0ctjocne5n8hzl79opwhmfhyq1c4k4dpslf5rf7m9lrntay9816nsxnu1kqc6y2neexc7gl6f7fsdy57t0z453ig7b2fxql26i0hrocgrzu4jfn8j61okzfpxo3q54jtkru6vmuk0z4su71jlof13gessuzb22xigqutuurb2bvncq9jblcu5xwghpyonjazi12cib9rhkucs5zupoaxbvok2qrduol1szt77sk32hrh0zkpl7n21sumvstu0g5fzmbri4bbfa85bqyk0bmaecrb4b0vpjtbk2ux6lgg4zxk7wazmb6rw3cprsmjheqdpf3hlpeaeiua31iqs9d464180dtzjezs7kaeepe254vp9e0pq36c1danz5nuwq340xk2g2xu8d4urmk683euw8urbg5xvpcb3xwkzd5th4hiuhtfhfiq5wtkoavl014mgdmxx3533z09tvwxki2ue42fl4k5fe9yjboqwxr9v9wxrxh7d1q4cebthpn0q9ci782eitfk7vkmv7p5wfo5puphkaif2q5v1p6xgx748zn5h04uux81o6jekcljwf9hfny4hv3lu5gnaemrc1f3j3jqzeqqccaao6ce1dixjmp5qx4rqpvxh2rt776lqmfety1qujingoo3l8rdn0euurzm7yn470qpusvbhunqb8ahij6sc8qc0avviutgqxqbam2s2js618lh8',
                proxyHost: 'iy4dshl7f781o7g24o45xeynrmlr2rraye2zuj67b2agcpmz7g9erkffv7nd',
                proxyPort: 1662984612,
                destination: '396h57ok5cjch7s609ntwhle3abzsrzttfpa60fkupsix1to1mgiyrzh6f6yjtto03nk7yma0us5mzn1ohln0gjhdon8l73fsbuc52fq87doxiw59cent40472m2fdwbsxw6g91ggsgr4qcfmk4sq2oh9kc8rvsp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'em0l860rxx1rwj773taw4ul7ea21cnz8e6e4dp7gh7bvdd3ld7ixewq3kfxw8njpo621k33gav2925bo2muma41fggvpkskwvvwqlo2i6q0okqkzgjjbp6vc8c6p41256lhffvpw1batv5bsy5uyrc0xaeko6km6',
                responsibleUserAccountName: '2ottbk6p0xshgwu4jwf0',
                lastChangeUserAccount: 'gm238fh2p820k342cxxg',
                lastChangedAt: '2020-07-16 05:33:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'n5l7iq9uuuyux4mocn2zp6zmdlqbgt58km0o7bpbk04p28drju3zh2g8to3z8bnpl76wnw6qjrmvylt5fdpvtsdikyniabchhn2xn7kt76p83pi9bd81zgvkppyg180g70q9dryukkm0emjpqnar89j0hs5npkdu',
                component: 'ii595mqhxxk7mcupwshwt4eyhiqkiuzvscwkt2l3i78e6885el4jbwlm22dwdioufxx7sismkvxrqbzjnqi3nwtlwuweyy39lmj6n32bb65p60vrfyd93csokvnuh9xc733vxj3jh1jcyeh2lo3rf94fc7j3poes',
                name: 'q1rrzt2wj1wrklcmye383livujl1httnqk6o5j7qa6f1eedauepm2ujwdwbz0vp20nnyl30zaf6fb0ewr6onaapuo76looum13z6gbrt393bi8pp9arjomoi7cvh59tgq5qzy5zc7c1t8p9258vl2mx3cd71wvo6',
                flowParty: '6w3et1xwmbm4jpit4im2lnm5obi716dze2ar2xfuep2jztvdm5jyu02gsp6v82n0e6a49lr0nf0rbetth6er6250p2dacomcb1bm91v9q6i5f2r7jy3t21fnqs3rok4j8nig2zjg71qgv436j1qn812wnzz1oehy',
                flowComponent: '3zyun64co5zu5218o0d5c31nsj8f3wx3thvm1vikmycfqtrv9oo6xviqmutz4kwhp1226g2l3om7sl7ja9ojd579t37cewzg7i3bfvn5mihnxhkr7g7do92vetpw748p0ifzptl6n1tovcfijh0huux7xb5z95hc',
                flowInterfaceName: 'titzplijea9c62kspko36j23uyse79km7uos1nd55yoouw5aobncodo90ah06hxijtib5npe0736uqj89fapoxu6q10j9p5obity5gvcqf6u2tfnapbru6eh60zy3b28hid1uuq1yj8ypyshkqrtnlf5d975lij3',
                flowInterfaceNamespace: '3zf4vpx0n4wfjzhy5r0hsmn2wn4vxcgzxjo32q89nb4lm36ja4xr90d0ne7vtesn4drjkht36f1vbiar0yla9dkkph40auj5cdrty3worsnuiuk9091nr6aetxmfn3q5v1j1ij70iqx4hcz4cwos23ycvq7zaocj',
                adapterType: 'd3w669i6h9hilvn2z7ci25v1vjb3vfjvk9yqe9tey1cifmuc8enhrplq2wr6',
                direction: null,
                transportProtocol: 'nrx6ebb39ynyoonistpx0djfa8l9fzaj23lvjstocfbao8mg8bs6vxbfbl7d',
                messageProtocol: 'eck193hhwqbhhzr542uxcvqxf4isu5y855e8o1sh8s4jr85hw43jlqw73u0s',
                adapterEngineName: '5z27kftkqk39olg8cn3m1juyj16vaq1r1q6fucw17a9ce142rc4n3k78r4bzkbxxawh6gu95hus28kypjrjk9s3xwdolwu73yctnx39gzraho70lhjfe406518d4q2a7yi8q5lhlxkto6diezpvkc8usxik5hcef',
                url: 'rfslb0gyd5t0llf2ssonvxhzipcyv0p20c3145emnha8uqpf0adj5fdahoxfbewdxsox63e2mj6kfbgtiutu2rj9xpxjl8iwo6qtugba8gfx3covccj07g9ft9rddx8agytj27yixd2m43x10qkzuxd4r1boy8o309kk3rguex73hzkn8r64bzn13186t1sbiqrk15e3simf7j1h3hbeb6g3922k7tls9aza5r0u0m0t33w94re8pb9w5b6u2pbwc1jayz6lbjbpwawrrolu30mgkfxozuevb7xet1y3i1d16reiiboa5h68bswtxbaf',
                username: 'd0wdp5ec072bk03jydd8g5ijlyv3wl26fpxo5h9wpxmv6rjpkwvrz9vh4glk',
                remoteHost: 'za4s3tguifgbphr2tkytsurkpce4h3h7pmnquvgqynq35vznd2z3gwiff11l4zwlmnsriou5o2noq5pbg71l7hahnzqdhp4yorylvcnghbhtetl5f46qyyvez054hq4nhm53rznv1g2mmcxasinqutz0p1u9fw5w',
                remotePort: 2420074050,
                directory: 'igac09j5onnqql36b28afu5ex65n8jwqph9grrbzscl00vmo1cpkglec7zyt375hxqj1l73m9glq7paq5ovoaqgd6tklzynylwyxj34lsj1b2shzyep77da713l1duetoxl1s3oc8nll2h113zruc77dv96p6gj3tezc3jnbxur70ch974zy0jid6bx7zrciare0jipqxcypxwgl5rmtlvnr5zqncc37a5jb37okrzipdrx977eb1e88c8wnp8u3p1tk67e00ns9pqyn0klx9lygwn4snc9w55w0opnzmdm2rmbgj834846dgl3pxhgoogi9gmne2rgzbusp4bxtk0tx5hdwhfgx3nat135wzllpcn82y3vd3i0i9jlbnf5dmpsfd9860qzfo0kpv25oljva18u8m99dh92yu7vlhh60em5nahmxrfgscnu0yhkzjbpxdomocwj04mqnm3lbx2utyu35zz0igyz126mg38nsr04juh47gxcoiuvs6pzgevqctl1pf0unvgjuk7x4bdxib6912ddnv8rv7zbxw40uczfndcloylf9og4rv5oboeevduw2hhbvanu51e1v6exnp43xzoqp4ztc8hxmuico89ka45nf0memiu7nb7m8qdyg9pvi0ir2uk4bhuh0h7v91c254c0m8dn6eovp2kaic9kdi7ttxvoruenorvvbyomr7li1ovvtap2rgqp8t6ws8s8rvdwrxqqcxyi4ffjn0dhfqzv2sm321ewhqwnpv3dtrv32rfmnsdmc45vclc8mm01y52qa443l1el4jku2m9piinfduhitcc52ycnjp5lwjwf6btwl4qx0snpw8g67uzfddbpuniu2ovubp09wx9is1z553frdfwye1fds630cm41fpx98nnqywiawslmay27yvf3g15fcd7m76d2hxu0wmm9g1n4foyggrtulys0xihg046fb5srilpenps4kat39q7t5ayvssvk6iawq7muq98mqplvm43kfz99g',
                fileSchema: 'y099n820p675rvdtwjhwc2opzskypmlzo7i9le5w7m1tbuv5t3ua0p2zum4n1ibfzwjkd5ph3y2f2q2y9xjr53uyxpttmd1zpgahmj9bie7xzhme819lgcsep77tz41rem5ln208f5qv0eei43m6njvarj9eyemwcvqrahv1zv725weslmk9brqvf0v7rf3mpjuwo3bj1tbb93con8vn1u2bog6p7zqmrnxh4qfwb8tynie6jn4w4g1o940ss45x4kpts1vxzos9e6a8oq7v497hf1w3olo1qsdbyutaoq7aigcb4r6kbvbcml2fy5fv3hkqfqhu1tmipqe6543hp18lltjbwzminyp24x6kgkjq055znfxg8pcstqkd8yxtywc32c1lw5bgrxk3uy7fkfnh2on1x757zmy6mxy00e38x9curko9umyonb5bomfsxtgp7qfceq0hy2t79ace6jei4817jnoc1uypmcc1e6azk036kwmwbcppzani7z2d8acc7cjloc2bzsbfr68f2u83pbk15qakyg4wca85sih32skfbeibvh193h0llzws1ojt2tkz7y7i8lnajsnl98gclbkbua1pk7wxybr5fxfvs4gy9g11sf2xkvjkmoq8h1xbklesz8cy88dy86ci9lxzbg0o9slr9mlk6b41e0o4q2nbu3w99xl1lpu8qrlgfxq6z4q7521djexx87uwyjczvwl9yzqxctcesxvgw4g500yv9x8rhfy5dx9o8h4dge5n3lpvhhegmjfvhqqdgiqfprdbj6k2sgaxcx519w6aktyy6m39yqdb3cglog1kjmj0ealrsgjz931ld9cn4ezd1xdbbpkl5dxzgb3jtdhw36htohz3405erha217i2dszdn8bj9xggybw5d1l2rc84nuc6m4556zlrux2h9m1jckfhldnx4n8zx97ph7fb173o54im7uoiqt1sumirpx8u176gzua3x6d0tiz6t75brh9afz2irfcnp8gy6h82',
                proxyHost: '42e08jbxh8h9jysocnqhtvlo1cuk8aauh0gr9yauw9psz9f9lf4cidgd60o6',
                proxyPort: 7030645043,
                destination: 'iakvfql64kis7qwau0esz9svhocg1xr8vkin513j5wpdbubbeqy4qcl2cfl0l18p4mjrr2l5sqfhd5l1cfyj7swxypdisr41jcjrawrg89c99viik9na8at76mvtbw273w48hb06fhghhm01rndwlsmzpdutydkh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vzip2024ydfgubxl81ymjyram7q1vs6njdmc8jipk19fhjwfa4jp6pjix7hf25vx3j326k5rspzdm07p7hbpwdrzur9iuvcbrzeh5b0gypu080vpdlah0rnpjbq5nisxob7zv51ygapwpt85ot7841ej6911ifgm',
                responsibleUserAccountName: '9rtfq09klnuy0sy3s3vg',
                lastChangeUserAccount: '3zqotzxjryp4qd0wqbeu',
                lastChangedAt: '2020-07-16 04:44:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '8mdkmwmjsuwbyvlskzd28j9cra6xfei49f9tw0nv7gdtlp5wboy74zgpkilcfpp61ifnuif16qdk8l53za8yxflhgcffyeborpmne2hcrhsjmqwb2sv3qonntuzy4slphxxrnosuvh02bug42sii40x4k3i1v5dp',
                component: '9rtv39aj85yjty17l1pe3ar71kh1u6l6ryzqwylvnlluc45hkei507whta6b5lyehih7dzhgg441tsxyn2sjksmncghro8zyg1ki66iqywmkql6wuzriod2625qnqhlpu0zuf4cqd4zw9jlcwg0w92ny3cturvn7',
                name: 'xnmdccw6u1sg3sbp4hd5w88xfc67l0qg69xgj00tupgwuo6blqu8v06bygcuivtkf65tb0j832dzbyil2c932chq58ptv3imw6fk9fcd10ehz5egm44fyb3o4fnyaj21x8j3hhr0vc8fu3dn2db2tvc2dvgxu281',
                flowParty: 'il1amskgylk3ucsojosep55xxigpj0nnshwdkfuofwlbuai71p84nptg2c90gnly4ezfnza9h4kchwmakebtgkc4l9vssh9we8l138t106xsdct3mslodck7q6celr5vws12du8d8zbq0dvsi5xgmwq5mpz81h6w',
                flowComponent: '7q8922ozs6i281ztazkwwifc06eyeri2teuusp1jnzbmdl6p3myu44z1hvnz1tpn6zcsxrfopslofj0d5wig4cj8wrqq2agkimf6f3mzjmdluv4o75d8416ypiau60nu0ty0jn4s16kxnxzaczm949756o085j97',
                flowInterfaceName: '4qdsnxo8hokdfswyp4flotq5c1mt4vjsr7f6h3tqxbbqeh40809t47to999w6uuwy1msnw253p489a94z6ekwx18c4ax8ucwp0ntxn141z92ugn5tfzxfozbnknoyi5j0agi967ebn0ke02rmh9angi01nkn8s4w',
                flowInterfaceNamespace: 'uzvadw4cqnu4nioxutxu9fop138wgo3i79bswhhw80658nuq904y1ww6gd25wy35x32btpknll1pqbew1li45nsledygh6l91xoksfdzrgnifbxzlkeduq7xq7pe2qv8ypw5pzho9zwmiqe5hka8aazrxpvq0u0w',
                adapterType: 'lwxpb4o003zwuca8hns1bc174wa3hdiaklssgp7x0givcnr0cfjkoga3j0lj',
                
                transportProtocol: 'ns2anc533ue7jhnlzs9k5agg6i4dgw5kjgk8ja28fj5bill122zr7jhpulrt',
                messageProtocol: 'wzwhfn2ox3ujzxxdvwus9exneal7rwz8w73xii88124o6c179zo49izat4zq',
                adapterEngineName: 'r5o2j1bgcvy4hc9rur87xesynnhfegfvxd9hn8vwlkfogn99caut58rk8w549h9cdo4g6tks3q4m2wrs9t8pihd3ybxjb7oe16qw1p0d21q4vcx95x9atvyxpyhs7tty1x6k0r83br24rnx0il24x93tafp2z23h',
                url: 'kabmbi5shrplt4wrxzkxq7xkclfjyaxwj8a05vpb6s6vgnogfm5r2yrejnfwfl2jv43b5ylkci4j9fd1cl9vg9yslrnk8w3eh0ey90zjv0j1kxux1lufvmwrg0esdif7m6i6ic4jz8od7jmb24siwcwaklbvn7h5jy34h3h6s2w0e2ev4i2h3duwl1fgh7zalm11sqcvbt98g5bz2q0lozd0no8oz3hudbwix0wift2ugtwj3tnb6jxbxp6h1383lh5ocogiaxngdj5363q7le907uqt169dd3nf5oxec1xn3ssmfoahs042tv3uvs6y',
                username: '18sq4hc89mm5dxkgu821nswegnoz4g4qc1qpx9tqenpmg277ernehctu8fdu',
                remoteHost: '97x45oi8kdld05vqn1b4ahsolwtra9dul9t3v1otl4076v8l7tnlmxaa4stpqop267k3ji7zwfjnjitufkc4r3nx5tuwt0jgkuvgirwyvvxpmqmzhmql1xlqp8km3knbg0tbeekazgqu9816k0849uemqedxgfdv',
                remotePort: 5947990824,
                directory: 'e7hjgq9n9dff1try9wvh3js7mhpjoa49dvjzy8y3xv0yr03mojhlfdz0sx4m3dehuqk6cf3hn0sk1mqmmh9skv2kt656fiibd9wsivulekyc7x9696aw5aqtn6drnlbkjsqj3282okwtuqnq8odri22l4bqbnxc30yjr4pzxt4uspwxcjogkkd205ept80hxigui616mb2uj9imi9n7bt0g89fvgfu3ppw5qmuns03bbbn78oc0zpuzi116kn3n45wgd4ancc393pyi3j4xl87vmv4plxaq1th3f1szfxb93i62o8442datdllzq9ywj1r4eip885be8fm6a5ek1svk7xb3v5a8rek910juwarz7e1nyniw0xum07csvbmjbxyp9jg7z9rxpnp72kp95d5se5mz6a4snb6yscd7vx1xkd25kvt49t68vlt3w29mgwlfgbv4t9jzlh71vx3gsjxu8f6pgp60ymlq8n8hl1e0tqzvd03b6xwxn6uug47bdz8urs5l9ro6lc2r4od2jzldmzrqb7k5smn1big6lczlzdxwrrqzqbs6cn43qo90yxghkh884hlx6kz7tf3p6akwtbit7p8tr04wrgzac8jit4lsvrfyipz3zfl92gehven704mlsrw3gtbvsbu7rowfqsfniyatwzoluwrfickviewbvul88oyrfhwp2vq89xey0lscuysof93912baaa49c1705p22ofnlu3uvuyaqine1of1yzw5ttin8rcafr8qs5e49wy8bybe21tu6oqwf5evuelukwh09zkvyujctrhd4it4x1kgreuwvdrfnbyff68od0vh5v48eg62bdyf6k8mnm3uhsc72y4a7fx3mz2pzho71fe1aug4a9lnfrwaguph5waxcbjct3msxccvje3gfgxbmtxtawgvgt0ft9yku06t1gwb5x2x2wn4lt01gdmzhkouy0lwwrw1wnjl39zpngiqxyg3wfvm8cm496zmwt04sdikcq0tvv0ovz',
                fileSchema: '41l6t3l6rrd8g0rpveoliqm6qe64kw6mub6vm4oxyh632fv7yzyp5bdt82zy242ovjotm8s8dkykvcqg8scc1tljryxe0hrmqe6x9boy8c7x19bkwo6ezvsla2ashwn929lknlzgbr7g5c79hvewq4gscmcd8z0syckmyqrns54os32uhf3c174ipdw1yp4ywufznvbppdo3z9zchgy452fpa10royg4r2nttt3vs6ersg39oabqt8dcnxux52efsuvxlfpfohq079uchz6986b0u8hqq5pqp6ur3d08iih8kqn2e60ef7wltxyglybdgt9n9l70azypg94uqkpveb9tzrt2srk1frgdji0p7ilcvoae8f9lksdtr3i689geqgiuev22mw8fap6uap26v4kjbzm9sjoosujkyajf2c8yv2mbjx1svtrreir1uwm6azfoeucmqs36s80jt0gqddsx9pt7pvmn08n4b2hg5nq9rxyt1adlemiyi0xbq61cjlzakoo9iytwy8gel48jweb0hfcl9pxxium8e1dbkotgpu6ld98bzat2nqtekf2ty580kbfnns8wldfud82pp7qt1gdbxpcw2vpz99vtdxa23bnoxjssym0jfv1oeum0jbk7valnn8d7bxd3dknudozwr9qzyrc989uj63imu8q3xia8r4y8eip40zu2xwkkut9okjyokw3yrsxg2m2p3v9zpm15ttqbmf7g3wa2ih8tee8zwartmodib370v0l2ehaddtwuryq7pxu36uxtzagcz437qrk6mzf8tu1wrtlxxasv4py6mspoye7udl5jo8l6g14n8eqt1c6ba19pjn0hqn0zil4us3n8oqnf77wwvhtp6ylg5s8kyind1x6achofdl7linun0qlfcknsi59li804v44iftnmbf68xt0blyefqr7emkh6mfjeos2ib1v1hsbftycspbne07xx7mfu1ivz0chy87qqvii3vuv8a2l6m7hltj5yvheormhh',
                proxyHost: 'stw7c5ogi5r3qyghm6wfcq7asb5adfp1vlmpoi48hgulv7ghg0vw2bszdhen',
                proxyPort: 7313017884,
                destination: 'h98v5ebw25cv4cxnqo8nocvsd2a6ofwujouh1qfqxw38rmfbp7dx8w4pydlxmfao68qasjdb3sw52bg691h8u91e9orw0d1i7d8ywbzufa2c5df8pur9nc3vvojnmen8dwp05fl2ktn5mfywdh2ldv73y0ip5fx2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'i7el0ecrsyb2kok2nbk6th5qe7xu8kxlsrb6wbuccjsjs0v3xsbowsuehvzfk5oog2klaj7fzziqri1o1nzbrl8lbvdblb20rgb5lthdq6qeo9myntyet7deilyynrwj94jp2fmya5m5wnxuihijy9ldkjnaubw7',
                responsibleUserAccountName: 'f1jztnszqvhtc0d66ilp',
                lastChangeUserAccount: 'xr0qrpmk6prjsyxn9m0w',
                lastChangedAt: '2020-07-16 06:35:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '1vkcbo1d78zpbgtnwuiayftm1ds22v3o22yh1w7c6vnc38wcbu18hlbl717w8xnylmcjgqgrm0jksxn0q56apozlyi3n77os7qk6xmmgnab5exab935l43wadsk8vvu39x1aqoloponrwn3nt9b3ze6xdsupfl8f',
                component: 'cbw4qzfdzw3twk9miywj019b1imzw22895ut3ved46kk3fggkvqchxsokngdndfdylobv5urmsm43dppci4okjv6jwcaxlfg1f678rimn73hg4on4egzhgqud2enky6gr8ln5pvv8itb4f6u150dj6w8ayxuhy1j',
                name: 'd30b2mhl95vwtojafxdo5h4ml41521omsldo8d7gbwwvf8pwtscdwrnnrigw87hek7zesmqo2k55ijuj015jcsgnuhpafctqf68jynoolffh5x7ae6llrlqzuyh9iddg9792nu8s7ufjurusn5k2qm14ee4z94sz',
                flowParty: 'wk4s1vtcnn3l86e6n7ykzgng7ym99wzvwhame6n3rnv4b85t3wun4eh9mnzfbnqi06ajzx1qyoinzsazo6ut54ggipnhqaian4d10j9vmehpxrncxbegzylzrl4c8imp0gvuhl0jxun8fvxxgy0woox2b6uwj0f9',
                flowComponent: 'm1bcfhxvmrms30xkip15hmjo2th299uwwapo7r399j6i3o94hangyuo0k8n79ch4uk7aw16hjhu1zpblub0kv4ds9hx4l88z2cnfcn9z4ya5llw40uyg1vgja4nr8bbbso41go6fy9cjw4bapw82nljm4fcv4n0l',
                flowInterfaceName: 'e59caxe2cxbsjreuuqxni320lvvsp6ldemtmvcr299glap2ixt2iumxufgv2jxvwjvqh4aad94ehg91n8jlpfbjjnoebri4zatkbqqzu5h1tfur18hz0n4i4vopvfgyeh3k0iab465kod8o0b5wy2739ue19di2f',
                flowInterfaceNamespace: 'c6rl0189hq4u8gwp2lrkjp4asf9bfu0jyasxx3q6q733ka5xn5w0lif3w7ue1l0khvmfzzd9r3hzp29akio6s8lnier1bgu931gw6l1uqo43upxncaurf7nc0jn24jyaaj1oatfdiu7ohhdm0wt2mra17crouc5w',
                adapterType: 'vactkd4ezf9sx1wssst9on8qo9qq97bohuaova6p1cpkt47duwpizjjs41t6',
                direction: 'SENDER',
                transportProtocol: 'nsap4xbvf05m2o1ejba42st8m55ehbor69zkvtnb8l01szwwzl6n0v43wiyb',
                messageProtocol: 'vq8iuur8tvna7sy9rfa24ljp7p0a1tamz7ni7l1fska9t6gkdcrpx5ibfh03',
                adapterEngineName: 'b6qri2wo9ti582e8nqolp9qtecl1xq43c52ksd0dvn0pe5nrrfgb8i6tnvdx9w2kgul5d49ajvtajdbqmf1em42ydjs1ab9e8gtjs0gau88h4c5r08jmpvd5yscircjnuo6pa19ke6mfutfo7v13xdni56uelf2r',
                url: 'higj47n3q7x1cngvqvigncgstlegwz4mx4r5cjrpvu6go57oi4i3m6wvhqvysujqpxoe5ji74o0h60jo63bt0av7qtr6x81yrxzd5w3o44uwpogb6d4btg4v99825cds9y42pxfyk1ody5ba7aa3vniuknfef37o2humuu9bnsz0vjbqb0z3co5qt9m5kfapsetu26c7mn1dyji5rs350joumy2yunma9xiqc02d0wgog0jswiia8ji9vngspyjaptf242oqmoh015gstg21luon5fn0l1jyxz3n7851f4qafh6a12n3stitfzazd928',
                username: 'mqzhoqe33z0n4mz0n4ufnrqzwhn7eoygridy2cewy41ywc92i60xidvzsxtk',
                remoteHost: 'pmvxjzjo2y1jbts4riwe1glhr597y8l3d0dkouuxabg7yg18rliifjbj4mehaez2h1wpgpazhzria7hdyizwxhc7y0nr0a4yehkrfm03m1zir5ck2oal5akzcyb7m6ewza13axij3vz55aztepencu95blm5cbej',
                remotePort: 8109844141,
                directory: 'qe08q78ajrjbaudtb0360kbo2uizejnbd3e46lhhf8ezfqegu5w4yvoh1q0b2iqntr8sj602vsu2n9q5z7emluus90c0ithdy0u6197etgf4oo52cv1c1clxaosfky93ik5wb8253gmdbu3gfqqoh7j20popdn4j3vxltg43l8mihx91qr11vcvo99japd4pij0wl085utr2wqv75g0pw1ebex64jnhoxjw573h75yzv18jy51cpbq7ressmtb3jaynr2rk5ofdwkab0pu51kdk7mh7vqu4anmnjjncks88lfj3zs5kc7xxrknx0ezs607jh6aobmd3v3kdggx36uxth7rl2buv5hrkcy4okg7m8z7bfzkmum54736d4p4lgu9lmw7qtthzlfxg5x2e43b9cqca5ltyenkle4s6gxd4ytj4ghyv7nviftkvq99vbw9wrcc4ulsmxpwbdpissni9wlem7q3z3ibfw5oqkpnf6wcqv04flpuzghg279nykyhuuco1shzkzyyodpdryhsf582zratp3uzi28wtwer5je754dhm0xra9upg0rrl79s6459mf3do2a28ufavw23b83igrxuknat0u60ft0aeyrqpuohfeop2yt6mw9jic3z3t80umtn5nzlidl4yfeg5xra9nsyx5ry516e94wtlhcxxq2ljis0l3k91msyu37rludxz029go8pdttibjw4kuw6rtfus83fekk9f5mhpixnecp003niz4ykrshzffm4mt7rnybn7vn7r4ars8qm3bjjacy35i1fwwkoyq6v3pwhuzlsjirdfw4r76ywdy1w51es20hyiuifwazwp9it2xlbagef9fkhh14k6126t6q5p9p74vbsw81u4nu01ufx54bwlb10ji20pfi46c03ez7r6duw2lle81ft1nfa1p7b0wj8kssy0iklselznot5zqv52p37fe4cikl8uylmpoykwqicvp8fgmni46upvor3pms201y38l9ntayime',
                fileSchema: 'glyjqrfkwhbv1e7op2j8dascbufhq3s3p9zl46zrea6sokxk8hokbxiqi5vn208rbmbgjw3zji6v7yqfu7b3ek8dlw1la2n7zf95r8e2l3e0frstn8ru18utb1epmjxedn5cfwd0fx4cjbysnqau29x1y3v6vwrhkyel06jkt4coq04ac6dkndp0h3zaxsn9tbhcbu04fh3yt6rbihzow5g43txoo1g9iddbl9es8pfu4mf6pbyehznxnuebwmogqlr5g5uyilq9ranzgjdt2f9fcld7ir0dw71og87aqra5096b09352m0f0c3qhi3pxr7cmv8p1l6nbkw9njkgqlejsgc2vkpwaf6sg2hb6v7zkunwp10xawrzfjcocy6mjqi6pw7zxbylk9fcevhj8t2kg7pnhsd5uslenhh264sqa4ivqyc5wby0nt8euz0sltzlmp3h8775b2417mirn3ri43u1vocgh7ikfi7r8857ucluz5faxxz9xrkdpoqmqtrd2iiwfis3j2l2bousgxdranp24pg1znnvcnhvzt221v4uioswwdu17xfnamat9uf2x5r4arplgpqxsf68b9th3o6k68m9bk68c85sfbdekqp8vhxaq4vf04gqr7tjly9hal9e1jfrwxhnjxy8urn4i8a1lvfj7labpsbu31vne7ko38yxtscz4bwi2i8nlz7pczzujjn2oeo34b9f0krde6ov1as1m1jkqbd1wasi3tjkfdifcbf8zlydu7hdbr5r4hb1uh041btpsdr1t7tuo57oma2hzlfhhk4z3a90xu89ngg5q37j9utvppkwu1qr52nc1qpinrx2gy07el6rr0wflay7mx88e5nzwrwmpau38ad9stt6ivh48pahzingirg9rrlnb1qz189unkf46260jq8hrt87gg8ro2noxffutdpizj82lel5gqiuoyo6ocabl79nfzyevxpqyxejynzl6taxspi2x2ik4bprj5o9wcd15a79jm8zv61q',
                proxyHost: '682nktoh3tcdqdjqe4ofweoa62080z5atlfwocsqisy6z8z4co4utif8ql7a',
                proxyPort: 7572574633,
                destination: '9938qehmh3v3n4iij8i7gq6nyxla8qso5g9mneq1x22kxcck739x6miqd9vjnea2knsvti6slfc50yl34x1xtu0oyb08o6oqumdu8mntm701wngdthun3sj9yz3kxc1r73he2te1y5j13bncbmdyhbdwpfz2yxxc',
                adapterStatus: null,
                softwareComponentName: 'bc3xnam6czj36b9cb1aw498wxble07se142znyts4qhu0dddc006hh4lpmypu04oo7slk3rd32pptwx8hipshz4zkd1wt571jx8a53hov8ptl3onpf8xqdnbsj961z7dup6686qkujvu0o653nsc78te90bevzu4',
                responsibleUserAccountName: 'awftq689cq5sibc7pdgx',
                lastChangeUserAccount: '8vmuto7599u4u35sollb',
                lastChangedAt: '2020-07-16 16:29:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'wbn8ezn1cxrz5fmr70hc585pvm7jao9dejglf14zc38kz7eyr9mwa6n3qr5kf4c020cxlia2q3cb08371r0j73u0viypnjn1qp177rh6wrf2ty4zyp1hpkhe3dx9pgv5m6go3dtfry5180plubf2v9ph4848stj9',
                component: 'wrmmom6yov7fbyynm07uesc11g2d6fazvwdjet4j0kc8mp3xqfvg8aknv2qoaykpu90pdritecvuh9txbb4ws303kttkhi8og1oh3o8ppqla52u1szjmkb5wkfu9d076z10bk6s3frenjo6hh4l7nzv6iu12e880',
                name: 'cxgzif2y8e3vip5o9n2gz9yiod62j6ztzj2qa9fhkg01xmgpgvw5wmbl41jks1quew9oecc7kjg2sskodcfstnk9c4xnwqst1ittrijde9iebhvxfw0jwqabfenclvajfb3s9lcnrn202k6v65svb4wg7wmo2k9c',
                flowParty: 'mq60mhka962ntlqpiprpw07a58wgh3hnmohopb4eir603wu94l83ff0tnfm2imayjasvit89mdky6zo4297dkv21kw9l0g66a19xxhm7dw205r7izr508df3ddxs5dxx03om08wmmbovidkv518k863l3wmbrkvw',
                flowComponent: 'nbv98v2bt7t6vb0vr555ubxa28u3p6p6nq5r0p4e5zhviep76dnd1yp0furuou5x4jp5yyogc4uz1t1057bvycvac9le0zz1kv68cgptfqxzjbwswy2birmu0watcz7ml0fyvje2jkzzzhiy6yvedk9wod3m6ond',
                flowInterfaceName: 'ra7y4s8uadwo63ewm11h9ljdlq20w0aa7ypvrkvcnvgg419mtpceym94udyuzzte6jd21olk6ajqtpw6vbcv38kocg2l43hem3hv4fcow5o9iti5jh0oicqdq3iccrzz46uofuljox0r8oat8k3ykfd5rwe8efrc',
                flowInterfaceNamespace: '8gk5d23xjk1hm6fkjhivy0trn2mv42c7n3b88cplxhd09x42r7ksr0jd54pzu0maoheghd0hayluj7f6u90admov4jsin6g2atu7qsjir3l1w2dx64v741ox3s9a5kv6yuawx53u4opqjigqcs8sm67jtirxbl1f',
                adapterType: 'udmol3tpm8com8e1kqxiyvqams2237om1gx85953mi108oodzt8g5rz8oxyo',
                direction: 'SENDER',
                transportProtocol: 'hz73f78i52y4dzripkweewpiokmpe1jn9evasf6ouoyzrj17i9y5gpx28qth',
                messageProtocol: 'ynfr4gkyguf9s075wpo2op41hssa1vepay2tkpe9hoesuvlgwxphh82u1ayc',
                adapterEngineName: 'mq47lmhcytcf46b6rh94bjbej012b3k8gk31hqlwfma1gtzsend9twulcwpsjb42553xitx50w9aewnd5m0j78m2ip4abpc9g4zyuiy1nhg05nckk53fyu8j7951e59esl196d6hz1cwl7c0qfnoe1359yjhivnz',
                url: 'r4kk0sucvj1aai34b6n7a57x2qeavron7kam5wzwptmd8i4gs371lyiy7ki27mou9gai6ib06hz4zf4b8kueujdy77etseen5kkd864qdvcbo7sifx1pu4k386mkbf7bqn43nn8cdf6lq2bt9j8q1nvy6vqknr2hfelijl090b1ofwaggr76uuv2xs5su9ik4om3jgi3wve2mdq5tuby4b69k2hukkcqmy5eg6nflbue14b1a4j3u89yunaimfo9dllb8avpyx79w2dyebcylsmot26n397bbrws3bnm305r225o3vupotdrc7gohili',
                username: 'wg50g1yb39ncu0x58k5jljordlt6bxiq5d765o97z19rnp5m37gxs3izxxj7',
                remoteHost: 'qxh01ms8dsuxb79scsr3tnr54yxle8rdmrhfhdxgty48hhc01ngov81ay1fc67x0opugfsdwe5nynzpa5hjkaz3z4fkwvmhua1yuwcnjb4ev5yn1ta00a4gh502ybg2tap5vqahorprwhdgd25zxbg91dqz4gayc',
                remotePort: 2331524850,
                directory: 'b7c6zlglmsytc4e2m0b07ob7xkk01v8i9gvvc6sigo6ijdoqdrjoelt26su64yctahl6ww1yxjsj8s5l5byn5nb100otvlct6ao317k87yirwxhuj9hx7bq03qkr3oi4bsh5h3qipdi4aptpa23avr4ek6yic96ozxu372iugtuetncy5umwqkj47d7ryeqmsq4tubbtf04um0a9y3so7ba0ib5u8gi9je8xqqw0yuhvtmgeevd3dzvirrccgmrr15ipv622kchpgjue340uns7azvbbv4kpm0bnicidp8p11cdo5p4doafa0ijq8d3qnljid620y7l7dhs8h76wsjhzxdqd38g8u3vwpq4qvnam2cuxvamd597649roi7cus4bx4odwq6jmf2irrp5zfjuh3afj39q9eib1naa5bwhuukb59a7kox9qmubq62fw9o1mfasgu3z22jdlhvo0gv5bwhvpebp60fqwxojq70tozyn08jv2v49rj7bm6et72n6zjjwdnr3012uvbd1720al8pit6h3hqktmo6tzsnepkkeh6mvbveqcjz3tfvz6xf2j7k6q2x7rtaj5jo0e4alqst5qx92yx28saur9f5ryoyptd652as8uaxk5jngsqt20hrr88wv9pb8gxmoitsmxgsptuwd3h7cmyntydqq0de0op8mtl1v3a8cu85fxn4drxw5hfmx7fv8kknknsj9hswtg9q2yzifagd5m1u6ha4j1f9hwz9zyj82wrga4549mju8ge4tzf8hcdr3wt0av0sueh2cwq0utzju2ishk9obpbrv90ajg5dmd7vj41zgu667hdrg43zgstcldkve22zj6utlikerwizk9ejd1jyss955isyhbjo8aztybg4a5xhfv9k69f4gqthfxv0jdkmlf4evjeb1hzp4m2co4qklg34helr0apuz1e4cgx9j74opuvmmgzqv6uqvgzgjt6oqe3hijjf7giyfxuzio25i9tlgcqs6ur8087uwy',
                fileSchema: 'lsft4olgjlv0dcj49zsxej5damqu1foy2zzviovqognqma6mskl4b0s92852qf2r1xjiw7g0qhtadexusy4ci6ygtrfbrfzr626yj51e77s2wb0yw80xb659ouccuiw2jfcp6xs286l0shu3d5yolvolf6juoivlz7mxq8bbfhmd4ydfkzfjivrdjh2e73swv2x6tx5vg7apwkyx4l3moho3fyw4u79sivyocutztm62scmjxo7fgys4m1aeeki16brfuy4uc2s3t2b4oah1nqkz4492rqz56j6pqiuim2w2aejvp9jkiysmru2mf3jha25a1dzqf1hbg3b0vgvk8is8ayb9pxwd6lj9oyotnf3ncnw1rk0pj6tmzzfgecve382eis5x5cnjd8xk3ss0icffuhza1sw5cs342wzoqnyqmd0f1w3krkw4t11cwlp2whvbel28krkev32p5efqkzzz9qh33xlv2vylklinoihcgotef4a9a44p384dkwy8ufza8c0i8wtnt3iohyynks3fdzb6md9wptgx0tdegke8b6d20rdm0mmmb4pgrz48efj80g61x0ne1tc0w18lkraqa9pf9q6l2d0j2hs1fmy6f9g00w8xndkz3i8toqw2mfjo5mdhs9cb3m28ozatpbdnzn4ab4563xstn3zvia03lqgkebgh0e0y1ct918zzeheahjsq8x39luadm3wlxl4bs98g46kfeunzpg2iwtak7znrbmoevt9jl9r044cgda9gjndip8wvlg6wtucpq9umqxix6i2brypvt9m9die0hmmhjfmo809c8a09972pj8d4yqsz9v6hv7hrg52ym6q1ehqswl3g7865q73rahniwgjyb5i0equti6x59qcsrepflju3g7qig2m9epanc6ygueteb3nijfb3ve7pinj8e8jvsugpwlz2ujacde2w1mv4dcahbr7tx9kqiceu9qyr8jd3ph8wa59mmodgbuznx8va8uosbscsc75dqdld',
                proxyHost: 'na0xmnua0mmdkmon648xxy30yb8z6bb7goq0ebbb0ih6figngcim14315l7f',
                proxyPort: 1637404825,
                destination: 'g809rw8dmx5o78vcac3tx6n0yjskjctvwazisc0lyplmd4xn172jxim6wtvutxo6oruu8r14scy3mmqkh387o3aj6z3lfvrolgeznh44k3tlrl2epncvmpmpo3ibgn46yajlc4rtgl4yuf8m719dw1fil2otbyhp',
                
                softwareComponentName: 'tv2uikgud0rjdylepa9l58qrf3ttn8nx6kbyxrdu9gd5xdyyy0pjx319pe6bfrr6cwygqa41dgxltavempniex85z2zupxgmcg4m5u8b4n0gu6s8obis5fljwjith75vjm81tcddvnwkl2ue0k3bizredxi669un',
                responsibleUserAccountName: '9o7ygun1510pqrfolod7',
                lastChangeUserAccount: '5rbsi54mejpx23n5m3rq',
                lastChangedAt: '2020-07-15 22:25:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'k6su6c5hhalcemq6qsinghag5w6s2irosyhcu',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'k59ltn96mziy2tqh5wghxpbisc74ylcnac3vblzuteob5ltlty0b6htq3ss64kxldfbseb2n3080qncwxywod63dv0q6gvi17ybsu1kk5w3tpwatwtfttfns0e4yn88cfcyevbhmt4zg569gk50j630xcrb9fp2l',
                component: 't55pg147vavo76r7a62h7jxrg8t04dxwqmry86lgg3ud8rwhdu10o1didw54iw6jnaoa1oj6jnjkg6h6o4hwziuuosfif40vxpiynghbrr7b99gz4so6iw3k0rb2cdrdwbaffuxf68yhsibwlztu5elft6k6yb58',
                name: '1584dhf2fdtofphywgmunin5s1mrfu3kzqc6yjwpsef09dx0tleizkbd0wbt1smelog7dn1nmb540cyj5p6jkj8a7uujidqnis79im580t583e8bz8v64wywsgz2ni8vkxxon5ax6lq6zlw80nk83dam55zytp51',
                flowParty: '63moxuxegwzkc9d3udys3hguyq40e17fniz0lnp6hgsav3hmgq4v2wm56c9c93ttjrxgw41sw89srx3g5pc1chqubt8kq4nfie05fun3wdr99u6w4wv0c0idcs1l9rr87jmg6u2ydqb1gava4ttsqclulnjd23z2',
                flowComponent: '1m699rx7w796jona52x7h2gmbg10b6y02mb1htedpdg74bwidn31tgj2vedm15e68x228hkz71d8fnl9cdmcij2l3ovcdh02x6l6t7po0ne9qca1b3m4xxetq1ly9hto613n0oagukb1x236vefnxiit55kmvc65',
                flowInterfaceName: 'um1wcnddmp1drn1xa10l79aluot1lyu3shx2vsq2zecgwynqasyozrveuxoj296a2bn41088je4rrt3dmfjoeoekrh9mora7mah125yrbw4bdurjinf0448k1kz0an9vhjys8rocz2mz5o6estpqtdhqar2oq3t0',
                flowInterfaceNamespace: 'zft567x9ebs3vs2po49bahbyf7tie4i5r5c3g134y8f7t2lyob1u4o7rwchga51bksoccom73aaum2jriknrotkjbcf1osytps42ruth6otrhnkhd4bxpsoznyf7bv47t4ibvppwchqbr3kkgmhf6tzageycjkzu',
                adapterType: 'sn6c8zr28cs2o54x0tdknfnexp92xoasban37adaiqahcqwz94a8vruundk9',
                direction: 'SENDER',
                transportProtocol: 'pplnuhlwa0sbe2zhz8iwzhx9h7tivdbxpuwu15rltj323dbjuqaaeznn9mdx',
                messageProtocol: '62fwsxxool28hhls52ejx0fazd7bqnaz7xxaeo7zb3ajz1p0f4g0bypxw4xq',
                adapterEngineName: 'bhxetw9hm856agx6hl9g9zw7ns9oylpcf2zrymmagd1n5syg3gf7je6q593xm1rks9nx7ulvow6zodbx7yx2x3yfj9ujx70ureirz9hopxwqeii93rmvdv3vf8r88s7aerd44ba2ybv177n825uejenwak65atk4',
                url: 'exz4hc9vzxtinuyyjq2v6d3jzswuzw591ogne849s823ymcy4szafepoe418kkdrapvsinoafk4grhgabi0bsnep181wlejxzo50l3e5zi66wpn78xoayc71hptauke30ha797ooqljp0vzgdshzjhps94qlexf5kmu0fkdefh0nwwihc8trqackstkdyfltb0q9b8cs9k0eo3zjdccu4hlsf08nvw9swxq7x68yksjavfmbvm1x3v44s8nbqdglelk70hzjv9m0mu46jg2rf2ms5q26frx4y9170xseu97izobe6pngzabmjx1gf691',
                username: '5ax3nmbuxm0yxp2jmjns6nvt0zda14o06gfld7p3fj9vdfob727fj7pu4x0i',
                remoteHost: '1mjyvn8y4rk91ts7szfe57yniyq9zj6oqlx67yn3bceiqojmgsnetadgwo38cbssvxbedp0p41woynov29pq6kj13yry1mqn14pfl5xz42zwz1gknwy6gx5j83fb0pz0pef8zx0ec1modesuvlopsudn69s4g954',
                remotePort: 4761182955,
                directory: 'uznaikwhbkmntkp4ubhc7dlt9k902or37qaq06vljn5cgrknm25ql23zleehptxrtn172xusfv7fciphbcqueh09v9cizu93mx65jyfisz92ew7s33kho752y428fsicb9xvww6bg9gsn58icy3dxmrcrg294cbgj9torj7slh663qv42i5oobjqqxvpp5gy2otiqsyrj221l0c0fjb5ml1g1ner3ll2euq41mf7i263d1ahi18oea3j9lrlh24xqv10aoi5tqk6ey7mefvw3j5dvj4u3d8vo97y6ge1rbvm8cbuv0sxdds6kjbgfwnq6g1kjv35vtidjhs3v0nzyukqwb6c560yz5n4xs4lj4m64u3vawof31qiba2p6hxs7c45bg017s2vx2rn6q46f5xrtutxo64crkpalm9nihimq9orc9jc4e3kyie0blrseip99ug4xrytgc1q2om38ztqcilnvq37sx47vpjiox6wbr56gq5o5pqxg4kz6gni3xftjs0snxmyd661wbzgxkenwje18nz8lyat48ry06cwik6ndrlfiatimzh9dpvl9r9tytcrzkc8id9nkajbiozde3tkwra11ovnah2m85q6xpbdki239m0d5db9dzzp4mltag913wczwdi3xzvt4qgyx4zirbgqmkvbx5y7j3glgy3qoo4nkcyt7t1ktrwheefig1zwmarxxnegai7vtd4axkesz5jpglglue84wjhhmbyjcv6jv4dxppnmfc29gzg52dir9nevwhi148hrurjvh8jm1sjlhk1zg3vzzp14wpfllqwrve05dqqie840bp4rridznwht3jod2ldllaaezvt6hu3wnyo48f0caj9xdymcqkyy99uy416ar2j5b2ywdxhf8g7yzxjor32z6gv3vnqitkp1ywjjamqfq6d2lr7hpygpo0g31cw6gjxmmksp2mt2m6v5tntd18k5guv7636a13smusnnst45nx6i1blbhn7bnqu6haaeu02i',
                fileSchema: 'kzjjvb3dzzmexncllxren4eit9f4858zkcn7n5agq489rqgmuu7l9x9p45ts0694tab1lzh887i0wbvfiekruek9iax5z6y06w90sqpgbhexee0wx47e4c67ibef0zu2a9z915xb2nj6f6rkln4nkz8qtfwpok0l2tmv0rl8i7kusel7hfiwq3errp1jol9q8rk1pm9tmwzx6o574xtmwzb1gqd2ex50pi5rkaalt1ye7qc1tfz3f6wxkvsr7s4mikdrqqvrv1f8i4i4rnk1sovwotylnxv40hfq25s48nv8s4mnajrqyrqy067t3f6l8df433g99wys5l0mi7upgtddy14xqqns7ui9ikfu84as7j1hxwnn54wn68hksnjpfnd4rlgaq5cbr5w1obl4evlka07ze9u83t3psl6j1lt4c5aatushu7dpdy03ekh7jf6gd53wyheus2ang7bxim8yh63a98jk5dl9tof119o1bmyy4pkeobjx36310cz677wavjjb1l7kwvg8kfld6zb25tjvnt55snasmb43h3d0qj5tuyd5qw8hrcks50essvzr9uia5vtldopsx46l089vh4bcx9q90z5eu1ql795unv7bmh0pz7wdg88nzz5ganrkwh3r31kmju7r11ja0c5wpskbyd6ddx3vj5woth68nurt4fn71mw77evr0qs8d7enviggvzxv3z9opllcp531pfm3psmv96sw1uf721nav4n15z8g10k4vl43uripmyjycjzqhzo58gaa3p4cuw05kh4orfy4utwr8jyl5l13el9sh0ra731uwfklldmzzfweulm07r942u0upxvl7gsdxn2zzn8tzkvv6xhhlx4w08vmdsw0u81bbyez0docd9h8x3li5d6yjaiwo8vbg5de79awy8w6mxn8rkzmqegs64ynaddg68ih4pv1fsmgam3uw1zbaei8n87asigj5r4g1rfy7aeg1b9n6rpij3wkwjsrnetr0df43h6momno',
                proxyHost: 'pzjl51wl7bkms9fv50cvvvxvqy845xreo20czw4v3ax18ryeancfd9dgfvbn',
                proxyPort: 9387804032,
                destination: 'r27hw6ixhfptrld2fv9sflx0vcrsn7on87m4vnfk3gewzaqmnakehlqgawzdettd6qcunag1zb707fxdye316bp5b8dwrv3uprh9duli0q29go2hje8g4q68231eycqfy15qpa5itrwt4vh8xz9j6x50yri3ektr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0rter7iyz3k4cd7gt39y311hiqob0jihiskcvxwyoakzh0fk8fco19jxx7y49ngj4bu9utyo7bjx13sjlz6c0b36sntormkw38kw4l63kjx152f43ewyf8egi78u602kcp21l116qtxxg0ec7ouvcpf6fz1itu16',
                responsibleUserAccountName: 'uxuh6hsgy5b47vkhnixy',
                lastChangeUserAccount: 'fy5ygjdbf69ctd1ay41w',
                lastChangedAt: '2020-07-16 19:13:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '7qq3jnx02v6eiecgyst28y26gjghrdqqhey21',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'fse6hmqwfbuuvahx9irnf1q9cehc2zantkw056pueqa8l7vr0fmx0ozmeog6uhbokc79f017vwnkuy5xc7n696vg4s4tpcuxlsnkqnuvn4t1zpmo5tsmfz12ztlm192svs9izpa5ap1yv93y694einqexuyqrmvu',
                component: 'lpakfco31xp81wg52hp7gcc4p00j55vax23wuj87tn50vzshkxm4q5rlicp6nqvuk2rbo3vx9500t41v2zeoxokcbk462q5za48zgoxuq15vvoxv4hca7zse341v9zrvf6e79edcw2w7de341qedg1gssdu1nxxq',
                name: 'g1qh08ar58rkynp79t9nb5jrn3i3cyzedci2i0d9zt15r83oadieqw6d6d5nnqj9edef7uhv6ae6dtahbwigbzkefmkrstb0kgjebt48hiz5wxnwjz2k250ofa3fih62c8nsv8btj6opqd0kw3m5s09er7dsvt49',
                flowParty: 'u5ldspnkpw8ax9q40sh38ybb4wmgtbh4mn1rskvzr7z6xa2861nyn67ldp9z33uri4ykd1ns25ehy17otndreuahensj51o6cqsktuzmfkmgf490nue4ne0lhqq22ah9xcbtl8l2p9scylld9jbik5z8oyg1n657',
                flowComponent: 'rxpg7ljdsqmglh8qiyif1c4p3ycs1j79i9abbltv13gf684fsf4euq9ady059vyskzur2td8tze5y50c4bca3iiuo6wdw9nnuz71fzu9jafz1yk120rblmdc0xv53jcmyp0fc97gw0nv94ucohhnifan6c1za20z',
                flowInterfaceName: '6ib06a9ls6m8fp77lygho1bm21ilrpnlg310vl59jpyat3sr8ig7wr7a05s04at9ormpym4c9svz2fedr9asfsmgevcmityw7b2eg0c2e71bfg5rjujb7ny3tqzx2yz2cbrrumkrfkvz2wckyfsdf4viy9qet7zi',
                flowInterfaceNamespace: 'th58c6v3tqteavjfa4ka1kztrxb8avzn6c76wpw1c1g2s5h9vfyy1lo8c5hpgwsbinf0ce95ayi122yqya8qmvqdncwmj5kt536xh8k3w8vtxxq71uv0iyptdwkn64alyiwfr7554kww9zn12gxg9ghn8fejmr04',
                adapterType: 'm79e3u70jkmwyjfralthtn07d1dfa5y0tzujbok5b7sv5b3yv1e1kxge31dh',
                direction: 'RECEIVER',
                transportProtocol: 'rqtpdjmhjx3qhwcoh0g2yogdaioyf0fzq4j8xbx68l4od7abdxe536s9dxbj',
                messageProtocol: 'vv3lou03hmvqziq5v818usfe7551hq7ak1a1seqrpwmddaeghacz5qvazz3k',
                adapterEngineName: 'xwg4epo9dfkeox8t3h1l5vpdma1mvst93qfqyp9ra9mwdi00zxc2oim82ie5loer7wa169g9gjlq3u6af0ts04e7oxllx5npzazw1h5j6m27cxhz1oreyrdbmctnvc7jzjh1g3qmsux7e44rkemghcsiuchssrdw',
                url: 't2rl7bcut06r3skca7qqwdn1en6ii0hfid6avrrauyn9vmn0obngu61nlpmdibo3ljned2s5wc5ck76mi5ezw4bev9oy35z8p2rujerw76iufrne18r53kl1dkf1i9v8jhk9vd172anooye9mdgnq6o2gcm5kzz4evv9gx3chmiq9or5gbpzwvlfml2oyezdkdu9xyffogqul5aduit9i7thj5oflpzal031pn0eetdhqw7r8cjjx4kon60smz2pa1g00tp7zv6o4kx52171jhlffabytr20v7bifcpthexktb0hqu1r7fcaj5pkunx8',
                username: 'visywmr3av6evqbnq796j1tmabzt0p3vehk5xs5gdzf88m3rdkfwb534rc08',
                remoteHost: '1itxic7yl3wxfilusaz8cut8n3wmnphpgvs7ag49a3g43g2o371s2ivcpikqosh8w4ly9ihw7398l9k91g9l7193so5w2dgi1oewatge3wftvq9pddv1cyeuh5vou4xki9apd611r2ukdpiircjh6ph4yxw5kidx',
                remotePort: 8788459498,
                directory: '59mb82d7yumjyt2yt36rptu0fntkestho6myajlfjpeimllky4ue50y9cspcdxfecqe99w8m7xocc4th64faqwe7v1nilqo61gzatalhv97hqjozwac02tcz2jrzyp1valxhihsxokj9u2y0ww39rofo6oby48np7o1spi6b9nn9wajwxdbq39eu6cxtyujkamdpnu73siqyfe8x6aqtj0cahj8sxvgapojhe627nykwacdki6bn2dwyfzksug0ozvhsuxjbm5hsw4lqpplx2z5s53bgaltcpzv6sh5lmaj7otjpddh2y10mx5j201bvc9ujkftebejvsy9d1ctxpfasl8dtdyl18ft5eyzr5nomivmvwft5tsskb2qu4opc36y97i2ockdsgyd5ew4o264sgnesn2lw7sjx6j9cqd7eqeqjas0w4y0wbyrh1tctp9f7z6cc7zwkokwlt24ruxsntmvs77ms5rbkw1d6tylnactcmjvswjbieuq4n1e4mktnl0w0zzfccxq2lm29znttmjfe6fi5guwh3vh051zzsra2h3rjxw70f6luj2grtvnknqvqwcwfvj7iebga8fh0ijymhbaku9mj9x3clnmdf8cxr1t509m5xip0mmwhrjwz1jsfsod4dhnefip912nfo8snznjexcluj8duheihhz7eat75c79jsm2yzkjzuff0k958ozic3uvcm0pu3ej9st6wr3u87n5w183nx5dr9o5cyzs1ikzyr8kipkwl46tr02x38w5qb0g3cnskalc4j4ab8xepgc3khxooelbz7hvm03l66meeuvqzadq1upb9rp31q1r2sc3htmk876hg14i8sjml1xxj2m15f6k7mikzvsjnddur6adeo53r2hgfv9cf8bhfdplva0dgnphqwhod4a5swgw0uu2g77a6qy8m8s0wwqt7bdnw2iuj06rtk7i2tfq5s4baq5rm39291gm1ol5n4070pq182plps8v9hj0ggsvlheuxsfhy',
                fileSchema: '3i840sbrvqiln2y23k0ky3a9m7sw9j0x557dit8wzzalea341e7v162ngk29dowcjuyhkfkuhy18wq279th2f18a1i4w0f73q9up4fs0vx19hivso8qcey28j74d5co3sgyk8rrkzc5yk0prbc82xl4wygeg4rn8glyrvza590sx19bb48id9psxnel1579scxvgcvr3k0hpr0gw7xo952km2bl2bjaj2c97c8mnmj8po68h8sbbk7hn22lemv3wspbo6bgn12i7c0mwpn6k4tix1imwe74k9161c0dnznhevlqvtgkjaqznp5kk2j69hk4dmho2hsnms2buw6io4go6xn618mtcm415mv71yry7j1jp2213s0jcf0usvl28cnb5dfi99wxlg2sjxyt1k2st1dlzv1to23ezfbbug0ffgbjbd3gimg5xcqm4kz5zwx2xd1t2ornyabqsn9lz7jx2p1m5or87pssys6w3yp1i257sdqt26p7v4d5ej8igw79kdip2rl6c16voy37dtdhynbi8d4y7yzr8goxcb0oe63tc77huapryqyj3smh4eusrdaji0qmcvwvci0h4orw5sdou9anzwjymofs3yql5o25msn14rfmuo78ibnzghln1gne73sne5mcbyrrksk4xrdftbfte335w9p81b05ows3q2u7vkug70wbxemmtts3902twwxdfrxy2mx584qa1dyg3uyr4qq326rozjwqilusht3kaufm2t16g558bj37ydtiyzt5z5350p744tjhgnv1fk73up0qtytswyntr9c6thhj1uqj1j3u9tp19xiodtau0pgqydsbl91lwsjqyvmptc06axjkf7rpflkun3e7cdgho7df143gtese61ohm9j1druoiem1gcjc48k9k3vz8prkg12zc2vbhg7d4323bh6dv4ek7xnte6z73tjygvv1k1z45dkdwwemsh614320f4xgs29bkt7h4z28kie1znogiq8k6jfpo9k8o',
                proxyHost: 'm8nt27zkzo3xgcoqkxnhzbsy0nxdo6mwv2iwynj4yifa2an0a85kyu7w72cj',
                proxyPort: 7400085535,
                destination: 'p7ymy6wgnklyavc0uiotgrzdk4onvckw0sptybwh71ix6b850fntdf4malag4wi4qdu0040hyeuxueb6adtewrxgc6ciqs1zjpg2l2ju7woxdbcd4pjndaho36rjiuooh6nhq4g0gzcwxx4bgdf6ex1oxrrgug1t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xroejy39vxncqco4ucta3sl8ykpgtx3u3ihypy0vn3gfoz96yanitp7jvu7do0gqk11xzpbb2t5qdmaj0o3mmqhxq872newnaawbs86hu2emnbvzajhl1m0zk0iyh5jxonzbgkx7u7vgk2h8akqi0umdt7enhum5',
                responsibleUserAccountName: 'g4ysxancufpqm5ep42k7',
                lastChangeUserAccount: 'g42d0smede087lsiq4qq',
                lastChangedAt: '2020-07-15 19:17:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '3fhnu6n2287koogzcsnnhttocetwtpnucqccn',
                party: '693c3s4r4k2dmtrogy36u0v9fvxs9dxm3fkwd5nu8u6yo3167a9puit9e8fuh3eru4xznz5ltgmtx6vz1d51dhardsmskrzf9h6lpflc5pq01jwtm9vf2qgokxzdmkyd5vpoaa5p4zypza7mnlpgu8pjvtw216a6',
                component: 'fycmg31rhbh8aqm2tz67nqcxq1h0596ybqft4oh1zpmws1x9in27cdrhwcdwlddl3cqe1d3ggy8k5luk86zlvw9e7sersjoexysr1n8hxsdtg9a5piy4i9kyozgub5qderl4l85j9yl1jmdfhgjj2rxmpsws66f7',
                name: 'zmzyva1nk5vioi7k543tpmnnpt7oucby6g0x2ou7ewzgx16i88omq71cjeo7tkqj4kq6crnymvxeu2hqx4t8cq8nn6uvphkwfcn4skxdq6e4avnh8hhhwpb8zyuz4hbzpbeh8kmzpn5gbwcngre394fyoakz3yxd',
                flowParty: '4mf5t5vovt8p12hue64akm938xaorbkz77nj7rcyfl5ifimbngpotammsxz6u72ne8oyzotl8z0p8nrp170ca8oobm2vgmhbgsi9fbgrmrvbtkmqal1mi46uj3oa0ewxcwh5cmbpef8c8q5vaih3pqqn987epm1i',
                flowComponent: 'd232bqwrflne5gwcr97dxf67xug4559tliqiua2h5l2ewlfh94mfnozo4drt54vmmvrl4bu96ccp0oc4m7kiek592lfz9x12yse2anz2t0u11hkmpazzn9c0c9hkt2igbfoug19h8b2urojdzdfqhorrqhek18el',
                flowInterfaceName: 'zueb8ihqmpr9qt367lryybwxfh2m24jut9qvf2f7wv24x78a86oqn4e4cv9h47aj4olxyp9469ooxg4tewq3s5ivc1z2onmfhuixo8svht84sb5lklnj7l8yuctixmbvcj026w8di3kzh8tpw3m1tb9gyqkxlg0s',
                flowInterfaceNamespace: 'xz9ybv08ftpnaetzx8idxnhzh99tr4hog4cbzqe304n2ksioo49ko20f78hsd3cvz5roc88gy8xu15mrptsuxj2azjpfgbwc8x6ewzxxjiaephn8aqghcl8naalg2q02bi4ni9ywhjabcys9zg89kxxplcer5vgi',
                adapterType: '7qbkg2h402fwam9mntelueih6i669yyjjkakwlj2ykleyxoyqudwo21kusre',
                direction: 'RECEIVER',
                transportProtocol: '7olaitah8o1n489tzap60fx16pz8e2mebt935uppow2xsflvtiv8g7dbnevq',
                messageProtocol: '5hfogsmupkkxsmgwzulrk03nurpk02el2navisdfwnmzms183vb8r3z6ky9q',
                adapterEngineName: 'zt295mrt4m4mrwsucaf9eqbr74ckjh3r4qjf6mkdvs46dyseappimay3n7kdv4nwh3blb9sff46dc9jui4axz4bm4spvwy1urj4l3vt3a5up34nwu1bp9xmnwvluspjcgqbwg2emln7ioift481hqjh1dc0j905p',
                url: 'rkussrz6gj9yzwlp8dmtsuibww7oti25bmyslfub6fy8qko10c14a9tondgfer59mnvz23vulwhi2jz8tfimjbu3mrfs9c3rd5l9cxx1yhfj1z2q88m69se8giyitfkyj8529c1bpmbgzkbt0t34w6dswgm219l0pqctafp49ckz94z63fnmohmje7quhpvayn9p5y2vhlbgq4nem1c4l1h9c4g6pvf2s87xtkpktwpke7k1cpwwkq1eyjyns9x6y3es0tn8oibqo883f9komdfp63onh1u1rs4o6il8e4ljk672uy2kvbkb37eji79c',
                username: 'rh24o2nx7781qeugy02k7jysrwqvjt50a4rbinggcvd2w0zos6opk10veue1',
                remoteHost: 'o4xuak0aa6h2du2pibnx0w1a3u7i2tau07pfl55g9606bckui76q631uwtrmngesw1k5la2pzr4s0p7oznj7pndu4mxap0lwjl9ru91zdyw7sr02w39gnsu9tfsnxcslfy3nyadiegi9khckr2lk2kdvfyesr45m',
                remotePort: 5526033625,
                directory: 'eh54yyq9d61ypm573ezh1k09by6jxbh1b5cvs8w7qk9jbln74q45oogw6xq7u1phdgkfrxjh15kvbmwdrbhnb1m5h5983uroi0m9zyljfosryf6fnvpmj05dpaixdkozd17qzjiiyzzaiof4y4o5cje6p5fec88nqsh9vatxudml1ck8p9043s5nq413yynm6m8kvc6l3174c9ijjj2suvqcpz48m2m0cydalgtamyp90muxijgbrd8ztmg7bce5ttafah08xqylyg1dlobcem9p784ooiy8up3aahjdo9rjubqrqc0lqnpj0u2y1qw37lawzxtd3xzasmft3zjvepmy1jq0nk82kvgty1sksszeg45e9y39ex7jnf0igaahb8y3s7utufsvkz69mxg0xusf4c2ngojjiw27yoost47vo277ekxxls1bdhlttmeh4zr55777vfhdv33nznk207qz74ega5veb3zrychvtuqnkdyefwicee2004eqx36qydtzgarnzoln0srvvf2ucjdglpku5e3ty54zffyc6d7zja3j7iclek9lquhquzfx305jrnjggen69p2a6w7nk94jrf23zwc31vwm7y85p62pbft1rw00xku5h4atjj0mupqctyt2rwdxyqmz4mgwkf4rwyjg2lbufmz95mol5dbibbagfkzgpw94xe1h16pz1kwdgo9fx3bxj9vp66bhe820an359lanhun7gno8c41bljczj9gxxg5vroygmjisxj4rukceu7lfuupq8b238x7k8jyp2wnwwu1eipnlqagiubyfzaxwgn6e4n7fqcg1x50uh9bvl5cjneqbipudh0l4a69cp53w9pl9ukngy1fy4uhhoc1d60m77fuombj0xx8bk383fxuoezl7cjtlyncx02sckr6njxehik0qpcg0htbl3170pdqbbg6es44xwhegtb9fx9knsh672a52ldhbbvfe2e0yjwsgl46363qbkynoemv4s0pvx47s83hp',
                fileSchema: 'u2fkq4rxrakymih14pg8jbc8bp15ukwdsym5y5vqndv1bvfvwbvj2hhj5javjsvlyirxumyqm23putj5sayc5jcpplasdywt2zay7864687dxq3qx6fsk4ojbre8mnw19o7svpfmged0orn4rdcp4vvxx9wo76vrvfpujjvtwolhod2rgmyi7fmfc77cn7hq0oyxd7g7l12y1fr671qf4jrjz23wdu598sj0xqaabsoo0b65ui2sn79nxq08ecvtibnue81pfav8ec67f5h0a0t7c0jsng7i8pm1gs2rwzidxwe2thaofpexx57dfgwix1i0dqdq2gwu4vn57b7x92aw3yljyv509wjfs8ysbf8trgv97mmt0ff5jlhdx71p3y9dkb3twbcz83lu9tj8s7pbedntm1poz31nl0o7xp7nw8pzgkq17v58ltz1j1z3ij44uuxtm75mw0avueuofo8fjng2jl0wxmqkzyo5l0sm7xxr0gwssv4vk84canmn6d9y43qc3yfofcltrzgfmd2846gvkgs7v2qectr6ja4oxch0h67mxhl4yuhjal6zv2y6cuvt0e4bn0wceiuswlndyhai14gou6lmvasiu0ur75z8eetb85mw2wodjxnlspzok2xt5gdv5zl6vrxle4sl8nojiy7hnzy1bzuimbdhazx92nwqrm7q5ajup7tvli8ptclq91vqwtysw65bzu7vr4tzcx6ccwnkncicgqcdk1tswr28889imgybj6xjx7koeafpm3hdg9jypdr1cen1mxcdf315bfo6ik74lg2gnc5hhblr6jxhkxm4i2m18vvbhc5m6jev5hhg7o3hq4eprpk7322kx0recjxdipk3x895v8k31vj06wkzjjsoyzwh14q2yfawuab0p1btrits7qsjhcdknnw96aftwv7csgxq6anmi085cbtws8y904fuhksa1cd86jhh2nfqqk42qh6msn8xx8ih008xh03n1ik0boamwl3diq11rsvz',
                proxyHost: 'n8mr7oxclnx1azeeaznmq73h6ky6rid6qpc3i4e3oozm4va2f2uyzuz9b4u4',
                proxyPort: 8337917075,
                destination: 't8i7791ycn5i5c8a6l670imngani3gd1ibkpup9ufowtrd8l3xpom3jxxb1ndkzev4prgns437ptffm4zz14smwtfcmndfslj5xob8q4yh824wrjx6ohf2hjjox7f2kak25lo0g7w6wlswe5i2mc5778cxsajxf1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm7588pmvgjkmscftg3ovf9ge8dsbtn84n8m0mljsvod2fqwphvv9kezkftuukhhbc2w0zsuvi7o2vam5wmuewftwpzep8g8e3ovu7fhimxta513xqhowx9313c91ostm8is3mc1gsaept9bqpyaok9v4m2ux7f23',
                responsibleUserAccountName: 'va3w8dzrn6tx60b05m31',
                lastChangeUserAccount: '4qdyblkyhs12isy18hfa',
                lastChangedAt: '2020-07-16 15:18:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'a0v4rp92x02jsyquf3yr9rhgfdvm2g9sho05rcdpyzrpsdq6y0pwxiro8db4psue80e908e60eh54j8cm57tski9g83xsethj3vcampcvvrytmuzz3swwe5qxhsx7qan8u0umm38yj95as3dd7tgr8li3smyvac1r',
                component: 'vdf3e8txns2wco89k07dqa19mhood9lukrof05ilxu9m5g451h534a9raxspe3g01gu0i6ehpnljnjeg688bl6r4m1o9ttxbj2mrtan1t4ji018144zgwv2uk05d1tp6moyft1p7lquzjiz3iqpv89kx6f1w3mg0',
                name: 'hdx7prwicxxgdbkjhqnl57lwqunhimkzitkvsw5e5vsxyckrcacgoi5cn088jy5yvbdfzt32e11egzce2lzqrl71kmkz7ri6z3mjjq1zugc1vdv3zycrixcfjhc9ov5ddz40og63sotdgf6n2t84csrz576br622',
                flowParty: 'ynqs9tv2j9n8wuuc4306fb7hrh6wf1c7z329tey4d88o80wh5hggbd3l9rju7s9w4zem9et1ai4kyb2cc12na7xkqmknbnqrg8k8cq5mpgq5sjv8jj21pv2uoq8ijpddjp9ytkvn8f66qfkwd8eagab9y1sq8x8j',
                flowComponent: 'xkskunsok5n8fg3xn1j751eib4ba49p7ndd9rz5iptolwszdqkpi56rr0virzj8prtodfgvcif4bgqp91sh9l2219n5ypw4yrfvul3ktwyamd8lxql7cyku80xg684j1xzbqdxqflgofvvxa273uejq3w8e554a6',
                flowInterfaceName: 'ffj6s53c6vd76qkfgvvuzagmn0pjvqngxpvm3oe7uv3c8edp6a9kmp5hvatrgr1u3qaxkdskf3xvxkhr2n0w2r34vznon0h0yue6uq3d6c4k34pdnn83bxgf2oyykswpmqt3kn2w7fc50scnqkhbum6eophp3eyc',
                flowInterfaceNamespace: '7f5pdvnigz89tx3pc7jp3tbt1x8sbkkf85rd79o2qhgjxc26acvlqp07p6kufzggx7s93i14pzwwqftmvzqsl7tti59onc58her07s9846lyd3cu1owcbyq28br0pqvd7rgfslmhfdpaxwuxykyqjap7fqljvdb4',
                adapterType: 'aa0z6kq0xmv4l7k70tsg9pc02cr6o5uffjaheak2vppb7q2udcjoj1q6pwwr',
                direction: 'RECEIVER',
                transportProtocol: 'wa2si10hew3mg68n5xjxfifocul4v6ktuk43kvsooc5zndtqxl30lpjmii8i',
                messageProtocol: 'y8ph7beb2qk6r117jfwdpzx1ygb5nccq6u8xrx6g3iqtjdlup2hyr37bd5vj',
                adapterEngineName: 'ux9vglu3xsu8xf1r13p4p9founh4nt72u7n4882cq9d1liqhz0f8p2ymi20wl3gjv8b9qxlt835v9gsgfmkr63apigxctims1yrunabhowlcdq1ol9gq1dfvclaw8csmz07kykhmen675n0lgy7fvb2rcsclxrho',
                url: 'wadoglw01anstwt7sbaf1hoshj0etluh98kgneh9mj5q6xp7ys7mn2z9i6gwieqhpp6p2ayupuz8yshtd3b8eqh0rqboge9cyk7t0tded8kj1maptm2eqikp4yccux1a8gbe232odkelcuab9ca6rw44sigheawz5t924wg39ul8v2v91fqbrylcv28kbx1z0jqhtviqzzfex8phla9eefoqc9ir66w08ob2k3sveepzb8xsnomlsrc8c41968wsqtefnfxadra0tkx6oza140hoazf60fccihbhjpwyr9p7n9nb7oxj2ql507rnkog1',
                username: '1a8ml24d6jvs0aiqrsxx6qs2pql7wbc7rzq7fg07bniu4jjxuybx19nxlxce',
                remoteHost: 'im5q5q47p84qx97ffhhxyuixl477w9qvwtxue704t1j7mhryutdftg0yopg5btezds4tddcbi3mn9y9anifcrvg0ufc9pj695ja88oty6ped4mqri8ojpy93rkwsoxd3jcn4uf66q1tdcvv5xbhojtvfdg0lbmdw',
                remotePort: 5389661254,
                directory: 'ic095ubx17idijus42lr99sk8qqlhfyo3qly6gjsnkib8sddj9h5zq8a4mkatqvj3ncaruogbtpdw272e795csq9ycj02ltk6xoqv767lx6bni169qmoqfpx8f7eiy5pbtakbxj2a690kqddk7btsi2k4x5p61hqavuep8sojo31skeujmi3quaew2n26axz5uwwxvoksl83jksd4y6txd2d0ge1itrein9js0hywusa7hkaftpb2d9h30ycmdjbmg5jbxre28xjslmlt0ms9x1758swcuxqwfgf3f4n1zp5107oq5oabw3kiuzdfyri5dzc2vbmzxlfwzqolbswjjs16scp4kilh8qqs5hw368gc6le1870r84pnt9jm0s7k4rldpatd4a4x9jk35tsx0p50yze3095zt6ubdofblsfbxepf14sm3cpc3ywj4oqwut4x32lyt5oe1114rt2hgmeucrlo1xdnx50ydexwm7dl29zc3bul85lxxwz39r4o2orzw1xdry2hmajcykp2aqyb5dt2gm30knrk2zcmdfuyuvf8v443zfvbluzzc9e5zc8azpvdt0gyj4m0ej7rd8z19yjaly9qs0f0c9ke0x00tbfmm050wd2ofe5uod5c61tkppvfnhy8lwlai4tqeuynrgq0rz9p9jdcoqkgahk4jn6ar8nhc1istcgb6d0iqfj23d6p4xk78ad6v9rc8dfamkczvr674lajeexq4efwc73s53p54wyapn5b1cr1k2wx44w8f6x3ou2ihrptto20xu55m0ohef7mu6335zxhgpquos0iw82vqy6qmz5fodvl2wvmd0hhm40gzs1kj35sdqxvsqfi11tydqzs8d5awnmvh6mjwd1sqdpgf0a36uvap27lvquuqrszwz15vuy9umyxj3as9xu2q8ty6jcd1xprbrcz2xr2y90gxgjh2tzd9r05pn6u2op35kt5p9hmhopt6v52zcwonmgsvh1t915vtbs2kovhqnnqqih',
                fileSchema: 'tynrool2gh4kphnisavxpatr1efow33khc71t903pyne3mtz3ulpsujqxk3m6epz9ajmresw77bcpvymzjon3puitz6yhxeq0od1480mc6pz6kpv96uq45ukb35gobrjccm0jz8v4ltmssc7j3qu43r3stnti5tpkhxluxo9tkzx5phtq5yjnpa22t52qnyuga5u8zmy2zmmmlzgqggyki5c1v8bv97z85ey55q6fnv7m0do08opwwtepj1kbp5drbpcgw94r29drlj3ffx3d8fwcute4dmmcy3f29hpk1tnt7kp12uozjc7od7e8ovcmwhgnm5u20h5f1bfft79d3kguw5pw9h4mvdkrwga23ucphwpogqmudy2ki5jm041aidlltf2qtkn4k6qqxpd2gt843a1f1hxx62avawlugn6su0fzhlskbpv479gi7bjcew5ar6msbpserq2mr4e0jz5txt1oimjdzm154ojfw1so15wdu82ic8swj8s4luew3vb3f89m52tro9cbneyhkygfpre1pv3vh3ponq4p9cx6oedet7kedhhxa00sj0gmadlbjvs27k0zu28nqdwaenij1229uvhf5gst2gu5jyl4mlfpqtf0vqfjqo5tqi94n37vxp21to404u66ukmszf2cm75vq3de7lj3bw9r3svk0d3zy7yk5kne4a3bw8t1zm73d3vfs2uunizeehp90qrw5hug4irq3g7jppb1u19az7e063gzq3a9yt4hn3azrw6q6hylaux89ovr6z8id9u9k4moh4gyjjrm4s7d2cfaw8gmyajltabpzbmt8ioct4grohajmjap6xzxvwyaahugjoj108syk0v8n8gmfh76nfai7qn5i7eh5v1aqmjmywoh4itd66c12vqvw7593fo4munsqiu3bb2bcvs1bmj4zv4pqtc2xy5wmgqt3idpaj4a348ihpew721leki81aasjpkg6f0ivikpdgrw5rrugooxlw1dzembvlfz2hd',
                proxyHost: 'l82z65prsbu35y6ouof26nfyksm4vqwtc65cwzsj81b1jzvjey5kj7crdlau',
                proxyPort: 7954262938,
                destination: 'f7pte97wmentj0q1pnwkzhailtsbinbb0wt9rvnyv40iawqvo6007sl5jolmoo25ji0b9xtrsnbwfdoj61st37s3x8d4vsijat7qom2vtu8p7bvdblqku8pbyp923oixvjmzr9ah3o69azj0db2jn4nznnbpqsyq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fh78kswy26qh3msvyzoy47qvm0usy5vditfkii6cl7a7t5jsmb28umswr8j6wy1ccdjhw31e9yzzidcbleu5ks23wwfd8upbgmabsunqlzj8uhhzk79oaetonwjhg1pd7eh11ir5rpr1ygpu9g4ff59967igzlzo',
                responsibleUserAccountName: '69bbdmiedirdspf8fg56',
                lastChangeUserAccount: 'wue1og120pw1e0idhcbn',
                lastChangedAt: '2020-07-16 15:30:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'cj6sn6u4iiclgisn3stwco2litbshugm0h54866tnxbhfovw8i56z6dwep0fdqerw5der0xola0x6s1xjob3x81iocfa25r9kgdtca5g7awxac20igxysaf7xk7pk9jjzn5102lj70po27qa9a1ickdu9zjjix5u',
                component: '7ojggvy2ybrwsz3i3glkw0qofygxvzek0s6ae71kcsj5c5rjr13iymukiecetcmmaoy9hy7gj29e4uvvwhriovk4hsavyg3y7w4ds20f2ok7e1y29d1plcyxtnsg2newby0hhxfm3h4l880iysgf77szqu2en4dwv',
                name: 'xt22rwt2h04qdj1k16hxsxt7dxs8xa894mnhzshxrc59d7ghms8eaxxsxoj0yxv51d3w1qqhfwvx20kpice0mpqnqj6shi2wg0sp71z338cdipscnhzbeg38x3ny6trjb3ylikcreptnkpangithsvswp55p3xix',
                flowParty: 'ez9ll54fdhrfc7p3pqkhu1vb84k2bp4iy2wuhe2a1qlym3ad6ilp8nefyxcw63n32c51iztabcj5vetvliigrk756ogmw3d52zkvvgv1jjkdq8v9ojm4pvqxzdetg3bwen9pjzfqzi7p51qprbmj608apptgenqq',
                flowComponent: 'bav0z0wmdx6n8m2fp9aekjgpfhmj97x7z4zic3hkgoljkvrzxni7q65ynggwj2085lxl5tw4ak98vquqpqe88eggh5zykp8x9amwxus2dmwi9cyo33ussdjam1riclfeixmb3glehkg0jddp0fz5xdp6c3dohew4',
                flowInterfaceName: 'vdvtqaw9dngisusjfuy5da3qc3y8zhvx903y6sckossdy9ealijaww60vrh6u3ybb7m786eg8assz0r0w1ji1m7gmigc9270096arfhc0oqoknq1d5psm2bbxvf0z1i17k01i8cccvbk78c5p3ctjfngyv676pgm',
                flowInterfaceNamespace: 'sylt6ebkao06we01nzkiczu9qpb3olmrtdroivvw63is6m7jhlz1q1q9ien0efbhpotj2xdujp8ecc0nnkvb5bezjpu0lt6n7wtxxwp4y3fv1tg1mx4p7hw24nc7qncvvfx3z7cxbyxttbh2syl3lsyuezu98znr',
                adapterType: 'ad1knd5euk7elf48z06savet1785d5sz38b9xkcd8zavedvwxp3hzduum4pu',
                direction: 'SENDER',
                transportProtocol: '12sg9dim4w26jjek9z3sgtbpzoot446xtyxko52516nhc6xtsndwqv8ljx0a',
                messageProtocol: 'b5thw2kpnr8bnpl8z1xdxgqyu98tjklq599j6yqh89jkosvywfzcza9ttuiq',
                adapterEngineName: '7i6yuwo269v8oyv284lc2xn6ga8ev0i6n5nk93f2lj5ehq1xkq4p1fo7npp115yl8v5se3g8vm9pw0d0x0hof5489bgpn30hvjq9r4fygfryg4pnxl1dh4sfqdwgcpb07kb38d6i49fn77xdov6ywxl1s83zau9c',
                url: 'kosomrfvrwras22qu5cd3gs7vfzc1t3w9pvoywq5onet496sj4qz1gnkq9lnmidbjta3x2kb8rru932f3azziq2dt03iyhfux4ts814sncpctcc3lpa0qfxs4ncvbj029y8g7qd77kh5il23x9j9ktq59cy893gpnl3ttjnqggt7e8ysldtpnxmu4xzrs0qa93i4qt8hl8npt3bx2xlgldptcgqgmtueywjeqc7rq4vggui3lk9v0p6pjxdibrbt221m73aeq4q0huowy12sfvy8gog545a9jtw84p1tu57h4il8zfivlo1gs6idc6jp',
                username: 'kivwr0lqg12xg4fdsm6kv3mz3w48yrdgx4oiolrmug0mmtgze1x1fp30n671',
                remoteHost: '4y5dgu7o9we5fgrynlrqk39z34u74wwfgddski2hm9h4vmb0isdt4ayogtjdbk1l6i1t3hoosp1gj6patq9vh1unlgzc3ariwlhc62b2oxg54z81lryzpb0ggxjph9rt2wbsu6oydqrhxrknjkguh1m8tnuo6wpr',
                remotePort: 8360345004,
                directory: 'w57most8hqdswqpxpwkifvsartzqyywfraoieb2xaw25h6ei1gddndmr78sinopj2iyiiem7zezgjgs311cr6luvv058xoa6thj06zx47jj9zqqfqvz76l6kuheo1x52vam3dbn7ueo5oiajsrhtcjrm0nxzr4fp3nu931zis85zvjtano8oy9uc9jmg1rrfdoa5awsahpl5otayltgwafc04kgaqo5wpg4jo2ltjbe5iu75an59cyb6y9umpcyckf02kf9sn8hac5lfld9qlbxv3mw09cq7ar2h72rtre2h0x37zhch3mk4243bb2mjci4gnjl9j4hamw92r45ocy8znehlmcsiszp4cfnh5urehmhvw2zd7m1hu1h7c8jrfz1akuuyxx8o8a676bz5pfe3dblgiuoze9ze6016luj9g8gzscno28jwf0wlapi5nw7d4ouuq99dkx6ix4zvg4j1s8wdv9ubyfd56qsa3bq3wsdfs0lkxcysvrnmty1px2gbf0z3e64xso04r8gmrq6mjfslaq30ah3zy4icu8kn8blg9pg7jtamid5mcdcv7f2kgqynxl1bh7rtqt79occkwqvtdytk95ye6fnteyexw9vnmztrvvg41upfa3et8l0upilfda2yha1qabdlkdfonhkyzdjlma87669ztu7jquxzv5l70w6mcgv26mmj4wrw9kyazh6kvo36oj7rapxalkns3ivol2gn08il8dsaeal6696sazbczh4l3hvhxy528g5eman735kui8dnzhlv1rsfzlprqxl0mrrsddjsesfm5s4d47c7x7xci8rk01uv2l5psdjh27fqhzhggr2xhrermksv4pqkqcss9fa3k8vnb8qswblvd9iotvrrz4kt43hqg6h2sjie4lzi4it053zfs3bpgyx9ulracls8av2izja1ica987aqz6ns31d89e91uakpc6jnxs44dgwrw6pcctzb5tz1rxozhs81yz5ie118b5ygb7n49yxv',
                fileSchema: 'qi689kdzipi8q8sxo7xjjb3bjxtf17i05xizyvbutjsau9hd5ml7loym8wkjcjf85c6htxjoq0zi07jhhmjdhhb45cfe8uiolyni67cedlu4o18owt130f0816wptat45nmajntjlq3pmbjeh9zqmj2suimulzn0anufw1o118n3z2y8a8mw34he5gl9glbvz9krhcxcdzu689kdaki67x9mphtpe2pef53mjt14n0ncrlrvsh7vw5ait931es4ovio1h4nutqu52wskpz2iucg24iam5e9lw54xj2olu1i3hj27n0gegc7vep4aoim6im2u5q2oir02kceaaqch5h0w2stvylpo4zmwuywev7br6vca0uyljk26527yky47spnut25etszst3kvhv0e3p22v4526wjdimaz8yoe50360191yhn08aiwbt9u3xhj08t90map9y0lizjej6lbwblvtt8bfl73jtzc450o4exnjhc9tb0k5yyw4mpdaafg2umg8h5mhoj94ecv1h1agqrnhd2q5c1l72rxzx4um93bpzqzoajaxic31tnqidmw9in47bus9w6y0fhxdlotbpngtrafa5fr7x4urnhuqjubd2v556w358o4uq817227cq312u7nop463qijmflxp9it0os2xc9pz02xjf8fwjoy26ketrip12ybhmyvc5q84obvdd67gbkgxozy2ye9c2y97q4n91n3uge8rtvjpatervtl5ma17kg3wnoo1yivel8gginbusshuesclz47o7h77ea0alo2miv7x4wrv62u9odlo7pjlitj5omvxdbolji7a0j7u1a6wyb7g6rxq66fhr3525jwg9to0alfw0h1esfip2bbzfenkvp6z7ctqj1cotxkt34zk8p6msd0xdlksbapdohgrs1r5u7fpjvp5jd4z5ljlu0ovf6v30paphyqd761hxwc2gsd1rwypbcnp03j9ddd1zdhnvnrz9hojwvfrnuq4f65fzncnkv2',
                proxyHost: 'mrmzgqkm0cpvxrm8imv4pdl4la2gdqc9n762gxin92pmykuwmobefuf88ucp',
                proxyPort: 2454052913,
                destination: 'g6crt56ndufl6cm80swbo1ia5coxch45lmyvwqwk3berwfnrvjq2mhex7ngtskd719hqfyx7jn0wy6wpes7gzwv6dchyns4k0p66w93wtk8gestidots72shd0hkg96hi1w6odpcc2rxkkmzy85qohu9xfoahd3l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n1ta1xysqheo9edsgmk7yusm78ndgv0x0p27uwbxh5a1x1yghgdt779y1enaz2av9e4379e5vw5aougzckxpsg4y8dsh9net1xm7quuiejjthrmfis9esypjqckjkeushx6775492vn53peiks2k9aq0z741bkq2',
                responsibleUserAccountName: '8fyxwaluvhobm4gyehy1',
                lastChangeUserAccount: 'w86o4mlokkw5nziag4yj',
                lastChangedAt: '2020-07-16 07:44:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'cyl3gpeb9tr8zx40iyljmfbm3lsqp59sfs6wkp6nw7j3zq70433aetll9yb5vmm80ldcd23iwqcnj98nwj0jwimyfloajuixx8mf5078ulkf6ixsu6d3xbo0yraf3o3uw2x84ip5thqrn1x58f8mpftv93qozeni',
                component: '3t4kwun36hmpz1lo6nphdh98q9xicqupqedui7sjped7dxik0yifu4gj0hzbjmrrez7zmu7cd9itbsbps058jleo4w2tq0vmhkl8t0y3e934nsnfzkvys5nhq25p03ggi7czpa04ydq05rjhrknbdpm7w4abfqwg',
                name: 'tec2wsafe523f9gfl5fmw2ty8x3vc2iay83sxuxodaasl27by9gqo3d1tyx7hosa9ys6azora8rthvpgoi5k8r7rudohwg83avgw49sdas875d32q19r03ana8174c61gok8jdz7orp2ttgeovihgbkrkzvitud1m',
                flowParty: 'rzrd0rgxeyhs473kg4va4eotlr4z4k9yexuhevrk0qv2xn4300f0r191yuvxn4qnzhpg2vljpu1nfj13ns1u3kf8sde4xwojj9k8ed3optxxftiq2ot8q1g8anc7vhw9tb8ezp19s4qpli1n2l9vbbejonh0lc3e',
                flowComponent: 'chkgg03utkzxhixx5xfahm8o2kejaox1twvi5xc414rhzid5d8nog95h2fwu8kewozwapds7nipoctqk0bg9hrj2ju8ri2fmluyfh3u6kg5iaj1n273v15cuz8ww915kuy1yoxqhjcw1q4pjo3tcc67iv6zqtud8',
                flowInterfaceName: 'iylr3i85fcafwkltwyz438a90fd2oz4c1wramll30kdkse0bjg5xogdvrv2a63i66e1walqyl0h6yc3e74riagqlqm887hskgpk3n3ugccmmx6qtw851o74oobwffufzqj0cen7wfulut8tm6phfk1043w6f0yc5',
                flowInterfaceNamespace: 'ejc8vlwkib977ndnezeev8wxa5iggrty879fqpytuhycxfowg0d5t5h2xo025rtojk3adi58glbhf0h2jzotkp23wjrtehuf31sgpclukfx5to09kbzpl1wbuf2ac952xj7jmfgtckwgjqo1s8j9z4pr8mlvti31',
                adapterType: '5kke5wivlgdbxq5modb9plt9cfkezt7o6kmyjm9uuh4btp5fiv79dn3rnkjl',
                direction: 'RECEIVER',
                transportProtocol: 'cjs2u1q4n26nf203uf4a8lxyy3dg82t21nzznc7myktn8cmpnepf2hnrjv7i',
                messageProtocol: 'ckl7ynb5ovhky0orf5k9fnyqyoiti0ztkib8nwyd3ge9e2tfj41ii0ecz1cy',
                adapterEngineName: '2wu7w96b7lgkki8h795xkynjf1v4me9jfpz6bniscz9i7txcl2kstip16t70ta59o209ir9t0qzi8vv8cb13nyg8g0bi0gcqpq970tduvfkl6lv37xtvkctlnqbijtjb7jzbsk1buyfrh3hlxh0cmfgr6q6rvwci',
                url: 'vdqixv6uaox71hlza2g6txkdif6o7v9durkqtl2c4wsfgd224ywezoiwe0oyd1t47uyygujcyebn7xuqzk6azt23pmshchn1qq0x2ff0uit240ae7jjfic4wky8qxqo2heagzprdg95e0olr9pl1tnk1yiemnvced6rbrxstv69v1490bur39gjy641ceqsiz1rc1b24hfhmii6l5x0j6eoi2hfepykme6hbeif6yriwyktknuwcgik2lmlrwjus8m8h6j4ikcubk369lgmq76qhnghlokl4yx186o9763y36a7alojp19u4c5hjd8if',
                username: '8tp8fy6he6utu2fhc5vlgow9kx5snj36g35if9up2z27wntmygq7dqlpml9f',
                remoteHost: 'yhats530wyr9iuixun2xs30xio6uhqei1dh6wezmp9zv8tjnfojeum2wey5y1ztl0kh1tgbkkwwhhwqem74jlrv1bmy4hn4ikheml3aq3e9h2chcekk8c4xpgw4w3wako5vkmjma7w8z6akk4be9vb4pu55no701',
                remotePort: 7515849268,
                directory: 'fzrz080aevup5n2kdzk57afaj9iw657v7qj8gvnm5absh96ma8tmkurrkawosreg93bs1xxt17v72ov39kat5zghlmh2wtlkufi8m7b9gjrr345kf54tt0mmk5dw1u9gmnnjg2u2vlriesbhcry35mtv85u6isxmz22md6zx3xuqhsbii5ape0ltv5vmj2xrujk99axhhp2z162y3c81e24yj2jf4ospuwt3sf8kkyyt1asyea659xfhssw8gwya9dh13hjhjojwtu6ntgprdcmr1mhvjzhwlnvvq1cldo04x4d5895luu13rcubs9v4aqpwiioio5hj8epg2l4nqd7n3skde7oiwt1ufdxrn9gh1wf1mi2o5iqo893dliauyuqg8c6h329zonln2fi948rrgsgvgrkqvu0i6o3164vg25npj953l6r014bx9j203eo1pkp26c1dbgnviu3ckts05rbytxvdgjogauxu4t01fjtj6w294mibfvcnoq4stkjtrga6hrkj2t1bbpe2pymuqqz2zt0inn1cm6mxjv56vxtli1qz7iefa5llcbkndmoesos3hs5u5tg3o0lgzcwhaj39qvt7yknztd8dfcty92tjc67queqo3v98f8gmk4gqj80p5annb21fbdyouzvfbndqpu2qyc2ey6cv87f0i9jtq6t3dyho8sm792es6hx2v3mbuwdxz4ut19lzfcb4ra2ygj99o1hjwsfhv00f4s6oo9znrfm0g80jafhweo0v35x21bzoyel2g9bbrctgkronczcc4vp04e1axnf1l9e2j72xz5gq0cqwqcfa9zo72tna4329hngjdqeinio9e94dar6n0po478o8w66fjza1qdpf2uws2pv6rfhs5hbxpljt712de1uvz5tp8sdcr9frcl3u0a7qrwkqbpjuhkfic8cbf9gbs1w1o3qhyrp3gvwjboos4lgkru6mugxlljqm6ftxd7u2x1gdblqqmtypt8ahkgfyd7uv79et',
                fileSchema: 'hrxkcbwdh9bq85aepv5xb2zqhvhn6h4aqvb8o7ojo2bwapcirrdh4lx48sx1e1t1ryg08xwdyv04mzp6ktcva7h7yx8iv016gl6az3eus5fv1xdz3jhvnlfpcsax8kd9mezj19t6qvym3idabogbale5wkp3fuo9j53aq3ivfdja4aidxycjn7y2fp8r45026c1o3ob53yfn7tp8663l7iqcq4g9muc5n4k71qgctzys4togy1dx9wqrj60rzdt8fnsj9djxbah0znxnrxzvvomim08b4ffqzuo0mtqmnv12qjajukj1d5bg9zf04uz41avnhquv91c8poia01kcll9c2y0my80rvy53ifhqufi8dr5kym8w5n6e1505p6aud29z3h3ok4hn47sx2yyectl0hq6ufh2g5v123sm8n7zt90ychqdx61z11wmsirf14y7269yfyabzu4y11i9zvvy8y2youbb1mig1mcp062rfy2mrzd9a3zcacz1clqn1xgy3hw3i57210lceg7aensbfob1mozpvr7hhdlbgiralh14zwan7n4d2dthjh3bfnb5e19toh6oyhlbzhw7xwnk1zlro0w52ryncdojwqi47gc70dgjsb3bap8bip53x9ofcoow1zjwwvhifcmezsx6u0459nya3qcrvg3i9imroaw8nxxn26yvl5ibbi4eu7iijlsngcru1123ku62hr35k03jy185l5i4k4ybzquxn250udtabud3w25ttf5sai0ip3a6wg87ufz4l0vctc3l95fdnvaa175473mdzjiftdsujoaqq7rx705w596g74wpvubljo205ggjpa2n5jw579drl802y3bdpusmvv3qk0xp8935fpk9xu1rprkwb0icq05qq66umdvrtzkwhsr06y0283b4ksi9c9lm4yk2ysqto0zpcz3u4f6i8962izvg2zq8bd1rtic46qzixw5j5fd98amf2bs50wh23vaivj75jvh6xestiyfhah8fo',
                proxyHost: 'glf8kywdpep2qqqk2oko6h09ef5d4hvqpfptahkn7umzeehmbcyl35puyfqo',
                proxyPort: 9278717110,
                destination: 'od0yd6jwji0a3auqvmngm50d4qqd22tkw3es3zop9d8ksi12djn1f0y28x6shovx9o30la43o0q6y15np4co16n20306jzr5moc17x1cm42uqujlhu5aq6qdcg9disa72kxcrgxe845u6v0uekqocn3pedkgpyc6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'itsv0j7yw68h6pi6wyefk6myt2ujumg2dvwcv3kuroulqmwj0dcz3x8rgvo6s7sh0ro3d0tj138mfif80b4078ksfl020z8m8lgwu5pfw7iv6qj2kqhexq16u4oj955w3vrafi49lbpwrvk8q6miwe9hv0qyixor',
                responsibleUserAccountName: 'ipvamk687vp7eyljdy9o',
                lastChangeUserAccount: 'j06fm4cws6q7f7w76unz',
                lastChangedAt: '2020-07-16 08:56:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '4pqxbabpv96eg5jj9r2owy7eq0gqwvus1t5voqavgmk7sikr8v0hz3x9q3ybmrg4l20qrkv42y0lgi3o5bgw02icro2n0760xmbt50ptwv9r8s354dm8nrpj4ylm6zj4svk3400gmqtegv4vtu1thrwodb873plb',
                component: 'jk9eyttwquxpgggvcrcg26wjo0826iidwvjh0z13l4ej55f6n3exvys1a8eekntycbewk17ph4p29hmxeizfxr943ylefs68pvemfpqlhfibxfah2phr7ksg3nwtfh5ja4gvrlhshfxltj1ghy8zv7zyqyn2l1cm',
                name: 'jisuj2k3xernu67gwxfmx2u5w4rlk2e2ciblh1mxf20og335wamoa240kf398bmywxmsb4wplizsnlsljmav9yuzt14mutx98vovkv6df7lenvg7tloeibz80k2xp4w9v73fil425r6c72h9p5x10juw7kpgyd2q',
                flowParty: 'me9ix6g1xo82smq7clofvsfdd52irnyav198tvgvmysfvos4k30wdtctairi8xn569d6ooaobdyil2cygbr1thvn896kb99fp9p68qqizc9o14axqtlrjrrf2etvl8z5163ubfy57c7v98mj71wwj4f1qss4j8l8u',
                flowComponent: 'hkb59b1y1dl4p62h6ftjb80e1bucrsu25uwye0ugntaaumfij69ldbgtoj072gca513usxkkedbmz0v1wbktz4hd8b4kfcr4woiw01tg0a0986hl6kv27142dfefj0uk2m2y0fmpc7dkizdlqtxuk5fbl0p1afmt',
                flowInterfaceName: 'j02b5s6emdelqc8nu8bu8myi51c153y0s7wtqt1ljfnizpgon6ht63esjgroabgi6xph3ch29irbkwy2a7i79mo8wy5uunb4q2rmazk89ntkc56yxpb1og77qv8bddlo4mdsswyd0tl2jinplo1aumj3h3h70mce',
                flowInterfaceNamespace: 'vblusclec05zh0ptdmdpj5dgt6na9e6gmfn8oy8xhtg9q3f6wx44n12x4agedwwjkjvzpdpnxqzrd30h5eguopfxrmc93m0rdjs629qdzbk3gc0vh62o99np9xjefugwch2m3t9w0d0mloxrstgpo8pb8jkmbzmp',
                adapterType: 'x3yhc907cx9v2kgtjm2bfwr2yekiels7jmk4pkv417sbccydm1y2byqv2627',
                direction: 'RECEIVER',
                transportProtocol: 'x0ss3ytlbyjlrf41z03dj936db0voa1p3bf21ovvnjmpqum0vy6r9nq6n28w',
                messageProtocol: 'kc1qoa1vn6ku1pv2j9dgpnzgaa973xx924g0cks41eunzd004dplown9ibyj',
                adapterEngineName: 'kvoli2is584tat402ohpt1az0t6oug5d1kmxy8eg5uft441gm0x4fafmg3vf110p75xbs055j3mt6fq7lzq0nn0qqwkxnezsfsnxao2vyiersy22c8jwikthz8khejy99uq1y31rokonqyb82qm3vixtwjzm1ykw',
                url: '5ry7yhmv4q5nzgebfuv7jv3fejzzre3w09t3ja6sxghlhvv7a2y4eb0swn7gux7t3tqi8nkgpkpnf5pwfooiciirot69pj2v0goo3arosdej9fora7lwf8vprldxncdclfkkjlr1v6bmqlqjgy0hqqftyd474rlrwn6omtuh47m52tb7tvks0l0swoatoin0clx0235p3ehq154w723p7pzmrc84uau3uqea52ewx3xx4a7bdw5tzymv2hi2l4uvz4hg24rrfwcjcf3d2k8rrkxf2i7irsastqre0qk6r5vuyldfqaquh6xbrtgmb2gv',
                username: 'f46ofmmpu4pr8lkel2jn294u4vienuo31znajwwew4lcidmz5hs01bwz4202',
                remoteHost: 'eidce0ieuj5yrngt8l0xabqhpqz5xj1wo2o943n2t3b456gzn7xwm6c1b2l0l1hoxbm4t51ggdx8bovvebl1d8jgips68lbk085lumxqsar200rq0gaixsarqwt1zmu4u4ftjhvdblqf3g39o3wdy3y50055vv4a',
                remotePort: 1499351676,
                directory: 'reh0wi0potpxnsa51yo8zuf5xqbzp06ss58xmagbukddcnckpd3dp18zj156tt6i3a6aibpfdp5e57x4afbga34kl89pq9vmmvg15biu6d13kpz7u34wpo2uj75eg7k9j74bfb8cs7zzocgy81pph0r1xfnuy52ei938fw2uatdlzos3sff2dydypcyt3ml5dh46fo23dgczwma50xsiw2t50wc41jghcb4k8ct7kvx8lsc8xlremak6vjs094qm71z300yu6wzczjq76xzyeua95yq1hg3l6gxmoqwv47ispdzxrulc75ha96h2xaq9ydi5wik4dqszrwlzndgl5avdcr5xogcnvubmreziw3x4mrhbdkoqjredjjupgfc2702fjvvx1n45f3hq02dzybx2q6a39rwg8xx0vlbgqr2mgosg4kucr9hf0up7kyvkp9wx4k23uyjp74h7mi5z7b8xmcq8y0kif06q6h0xjkf0p1amwmzkixknm7k4boevxyr6uxog4sqhw9lca4fxovi5f3qw5zmnl9zxaoyk04n1xnwu9zb2ipjdz2g1190ukscwajqokqrehkmvyruzdo7d83zmdk345p35qmhwxh1w0el92xsejz25916dmmgkzsqqiuhz2t5253k8nsg9ior9wuv87mzzbiumhbnmagjk74dzs31j03wl6g69x747rl8qe92j4cq3jjkqn0a038sfurokm6ejpjrz4tsgmpxpm2ufu6t0zspy90avck6vytfxdl6ndann9aka7zsse38po7fnwxcg9wfrjbnaml5xtxwjuhovrluubc7xudp8hscr7rxug95tl7d24d7a6ry6lbqgxtyd7hhgxnnyk7fl78pwh644wbd1o5ushsknksh3smt6cfwaf2wrux0ghuyzs7tj7csavz1zlnvd0re8pkc7jucf10tmgh9bpjr3427k245uqyqrfgih2ijfrqi8fy4gj7ha4iwll3odw75ty517oa7myih4fv96n1n0',
                fileSchema: 'rkhqw4dzfls0g3vslncs7nsmuyvkx0fnox6ujf5l5dyv54n9c12mfjohzz56mgim923tq1ibnkznt7tzroc0ackw841zrb5mn0zqqbg2egixx0voplk7xozi4j4vjkr8pif6f5nwdj9wmjazysa9d4lml9jjc6s2hvkroc1izij62jvqftz6fhgqsd7d5j5llxhblom7v023ddh8dplfc4et6b61sx2bo44i68jeqwxmdqfmh8sb2gg0baxffkp7pdbapf33dhussl3p2maz91i65xdwccnsfhnr79atxt8oe9i2sflnrrrenw1s7ypfl36z2tcq4kyg8ic4meuqkgb52loq8tozuzprhv4zg41e1olafsy0hpnier3yhm4rwhk2e61t71nwmg02uitbile1f0y1dfsxxebytqw5omi1j84bs6sxlwzkmvnntxb5rdzlbikpl99isknyhnte0154g4hibabog4vl5m10ly3mzvqfa6fanxcrx3q3obc9ru61qc7tpn4cihpq5tue7bzhx7eii3kdhokmn5f9jlf8us09ly17rtoiemxt5pnpqh0mjzcel9obkonja0wf7akcxxhoeyhisbhrgw5dq5sfqgnku1727dp40rr46uhy3vr0gssrux0iag6iwju36fc8olduzx3khscqo2a25tbxcxf1ardjs9cb824abirqa88otvouoldbyrbum3yity78l3whbbfakcx4pvpkg7u6hmg2wcpmoa34vjygmpc27adqfd79dtypjcf5d3ffepm2skltrdenejvj2eixgi5e04bad2xhixhtouz89y65tc0hm7mo9u95x13ja9rf74xoothw25bcjqh4o7bkok72wkgtiiwfonwr1lymt7c0wiyg5kzhlfzf7j8ryld14a041dm5c3z1frlmoh8psc9sgm2ke2reus7vyqclorfevpf2ayn0nk75f2ulzl8l6epbwqu6ytuf4xxlm1bc5qo3ijde4bc7dzxnddwzxc6b',
                proxyHost: 'domntlxz66nupxa5hfwbmhdxkgvxqsdvteg6jbpbkfb6x7tlyq9dd02ydxvo',
                proxyPort: 4963905337,
                destination: 'o7bklm346o8ykxhetiyg46cf7s5v4l5q4t8uctxa2n5yk39crzrnqceh9xr69jvo9vbc6d5on53212j8pq108r2n41gqqtqx8tk2u9x5v6yutluz6popnn1y18w2ts2wdwwuhku5qnt0onirnimlfhsf3ov7mhyt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qebnicb0a47giyllb8p6aamj0whwupimuqza54ngfy3gdtkkse38lb72dd7pto99gsuxkfl64og72vtcy83xpnlda2szvloxryzi0ndkki69rrj9razuir6bisaayh8qy5ewrksctnquu6e76n0fbtvabh7qokwb',
                responsibleUserAccountName: 'on39g9zgowj45parpnep',
                lastChangeUserAccount: '8l6rxjpw549qj05m9nij',
                lastChangedAt: '2020-07-16 01:37:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'w2vpkcyw84jzvvfkhehhf78v7x005yp0s1n3dnbwwil5d6baoifcw9evlbkvsk84c45op9nggdhlwgur58qzvdgtv323ax8079ot5qdr7f2bziuvuvj6c093lnib3b5d1z4wedlepfqk5zbbvtwmmfzcqtwhr1xq',
                component: 'vav70ytfhavyrhnalergan4k8vart2xzgd172ghr5ijaavx2t0odjst8nw352suqrhvzefl0i42qdyh94sa5o9bxuqnnniydihfrxeispdo8uc9v5ppraszw5elcalpu2cvsff6tn1kdj1uc5pm9j7ofwwkyenf1',
                name: '9x15iayq5wnjbq8ubxbpan00eoeuwr0lt8wvzb3guu82z504yeiw5q66chv7g8u4gc9vavn4o3x469m4x0bqlncg7gicdiydh1xtzgnnx98ecnkkfyp9k899wqcs209lrp81v7ytvl9xtzhwy335f6grsaklvzt9',
                flowParty: 'slazq62mvm3ur9ymoj7m5rh94glaur7isq5b0ed7i7d7fdo14to4xxeeemaw6v936srlp9rhg94ejivq73omouqqic4j3bhotwbvofua4dycdokpo15g9t26z925w3vkws7iwk7uls21k1klruofmnj4fjmw7nus',
                flowComponent: 'nhud0m3wfrom6tk1uacoxgyelkgfrjc8de8i2tgek4uhs0jxmu4mbqrmnw7f9syqa2bf1iu4d7fj4loalh815vrduddgam27ru9u4pzzo4qbctbru5pp9ff6hclptrwkwzbp0c12gzklhuug7sc0oqzakg6cbb9xn',
                flowInterfaceName: '828gbxru1z7xhngvkb1h5zjh90kvyzaktt1223dwliycbzatimbs2c5qmdkmsq1ozqq3cai518jgms3cq3ou9zdmfpkd2lur61lue4giaw7z2bp08ty6sda8nc117fxdu72cyjiczbkk3mod62imm7iix0nk5k4q',
                flowInterfaceNamespace: 'ynzf2m008ru84jmzbwkeh2fjf53how1z75sfmp1m14n9qxi8ahh6n6flr49v14nom78sozhr3bgsqzft07hfqmjyi1r9q5c4h3656y4g42k699xmgrpnbgwx17et0f6xyzdqc28e660b4rx1eloy1vtc7lni88z3',
                adapterType: 'b9w60b9ul16nfnv9dgtkpoapkvgwdpdz2ndfamk1pyvvo3cawpuommctnvad',
                direction: 'SENDER',
                transportProtocol: '7yzhysp24ets30aybd3ughj0etyhp7rgoii4qfc2kb5n4rlh3xnhu6eud6cq',
                messageProtocol: 'bj4tx0afuxug3ogp59k0l4u4g4prtjsmku7g3izsumhlk782yfpcifd2ar0z',
                adapterEngineName: 'lwizichyyzb69pohsk7s6b73pueyhdxrd9kxpxcyunttsm1co3wkdj8zmlmlc5lw959bzpf6wfxtk0yg4es5s3yusj2xqfgl0ixdot92wcpv8k4j7hpkn04l9l050l74cqre4kxmxujkqrrna60y1qvu36oko4z4',
                url: '6r2080vi98ce6dg4w63k057w3fzabhvddfk17l76q1i45els7oxolf5xsbigk0vnx50bs75ii6zri7oh5xhc3byvp7n3hlrk2n310lyvbkx81a0i17gh1jnlgdmuxsrzx1aa839n49h84frw8p0vymqkokc82hb0g9q0qc4ocx26spiai2sn9jdesadduzigc80db7z15gkyuzyr5ikdtaan8p9hyxpwigl93qxrvtxaxywo3rqoayqdqybeb852kqbu7k1ixxmidvul1qfodynz4dnxfwe3f8bsjm5zyneyy4wzkhdfy94ov9auanae',
                username: '7bfl4fumaff0ra7vtrvp5jhxe57m4fggdry64xegggdvmwqy9n7w42i6aid6',
                remoteHost: 'b2r4tra0sik6scwmr52qckhtsg47mrl5oyyymbptcai9j28z20q00a27bl1g7d5zt5jlv89rapvplvz5kd93ej5ezp9b149kol3ot5q7zn8iqflmmcu2k4juag1vjx353vbhj5ir84gck643hvn4cx92j3lklc7i',
                remotePort: 5476999770,
                directory: 'ka6ma0k609s93qaqllbqhsasjern3nxjf2hp6tsh3fd0mjgtqltsiknioy40dcl4jgehs5rzl8j7slnkd417ujlmn8dyr79s3ixt9keolzjblc20wq9wvdtl4ibz2foj3h6hm1irfuiwasboj4b0gcv67utrhol1nhs715wkwhton3najm9to4p3df8qqd2oc0s0bwfj81w67nt2q4vdmktp2eed87bjor5ogt39ily0wiwoj5k6bjb50gxwydleoxsc6mfkukboif2lfce3bpcmefaone4dr377shkhxorisn1k83l9gi7k7hrk9j69hci7wawki7y7nh26430gslfe9w0pcq9z5hkwxlmb2gs8gziyk4x6z7fbvzx6tq28d103ht0nbr7g0hnatknknl2igg2m4t55ovs0aeqa19kh1tg2p7q6kzpoajl7vo0bmjwzomj03n1r6ztj4aypbxcdr0xzm0d7zoud29ucbx7f44b4kudiehq0po8nvn64fg0mythbhhxab0yfwl7f331fahxcrsltj4ps7bw919h69v4plxl5c6nxtqzgid4or2lfc8rhblvbs9epjn4h48tfst2w200e59of1i468fjetm160p48awcnmp436xfdzab9wt0txevh4l5umzbn69b0vytu205cqz6839aww4206d1u4sfvoywd728w1hwfvvhqwnj7e9tadp3b42p8yf6o2yssfcc0eg1pnndfoaw235b80ilakf9n1ip1bmvvsgxivnrv3gusekun4qg9avdd4hhgxhoinmy4olj1n99qfjcot3rdkrlb85b0962pxc4sm1akug6k7em3o278ikf0iipr2bbqwm3ipxc12s2ql02jkg0zpyc1fpn57hsh0jkfnkhwewfy43yeffzst5zt78jynzfajng8fkez9a29i0pmkas2j6tlz0onbgn4bticbrau7khtji6o7iptbgmvb9x6xeo9yxkgimhi0q8bkkzsmuo4vpd7z7pnwgkw',
                fileSchema: 'sbayp69pzd1opk6a80o8xyyy0p1r7y7k7wsi9caz25n1ekesv9yjkaa4izn1p5iofzok1fi5ufmvo6rkjtlxfmahr0efsmzekvi8s2o018g31stog23gp9roopmjani6erjyn8n7wg3jn0s49ap07jhme9kmc8siv8uh2sl9aj8y8izp99i62ep4hu660ostlzxirtr0auahntwcmc91s1czko1v1egzyoyox558i1ug8l8f9cwl31emv0ks9kd4gc8hchrmtsm6q02k3s95h2wkmpzqwh3xb9jg0gw7wbwg0fstccbxultc89ny9d7ra7wd9dju5o9bx56rdy3ephdoneo99w81gcaw7qjd96xyheue82f85sdwtpw696qfsjswn0m3gig404s0lgblcwavw02d3isd64liqq1lkyuthzdugn8lfz63yzt8ladn3i5bhkueksbanpix1m667ai7k9bw8veko95uybk3y9lqc0uqtz6w6idy4pcvnfpuko5dytspf0vtjezc1plhwclemqa0s7rxykj85tw5atbhjge855n36ud2dya2h2059mkeo2z4t61ve1d01j4fk78vu50lth0m706tdg6lgxngtfjprclc0bptkdbfzpc3t4gaxmuutztha42to9y03awl49goslvh92osjd5cd4v0v62sasly8zqfdmk547phhhcudw631md2cgc58kava5iy0fesfb38awx62y3354xjxz4s4b72i2jamlsi9dh1upkf0svq0m8swk1wy3nwo0bwuanciv9xe2011zbhdenz6c5qz61uvqhu3fnfv1cg133cysukcuh5ubl4tp28oxkruamgfbom3cxoijtpx0fcxsjya8o1qaosrpqq275bkaewfp6swg4l20k0t5yywguv8rivyyyzk5zimmrp0y9x519jq8v7x69uq3u4dfho0i7eaynat9ybiu1urrr2zsrkz9fhy2i7e5phubqie3ez662gt8zob6x06k2p31q8',
                proxyHost: 'qpnqlf7uod9557qc5hnjmqchk59fe4lbysx4w3iblm7g1u5m1x4kt5h6k3ma',
                proxyPort: 6006046869,
                destination: 'yj3s70pqv3wbl4v6a9qqfqz7m2gc7sm3mh1z0pzh97dnb05vd8tlqfn6xbfjvzo62fnc1d2zjtyzfnbw63bsg2ks25wt40nz6thg1lx85oofk37qtx1ko4imwfx1fcbry08eoy2jz9vzvk8st77du40d52udpgvj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'f5gmejmwfnhw5cknj1u429jtxa009j8g80pumexkbk3mutlylaagtspfcbusvac00q0vcm7jk23wlz5cbw0ni22vzze6zkqnqgc4b18opq7h1j00pb5aisgk3et5n9pzqguvwhdyitu1dt4zqw5vv9tqt5olg5ce',
                responsibleUserAccountName: 'lcsp1sl9resjb2wrn0pw',
                lastChangeUserAccount: 'ux8mstppowkini22yl5u',
                lastChangedAt: '2020-07-16 06:28:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'xtkvl1iumimcgligbdmhl8ihl5scwtydd43kybjg3zc4kiqnmu57q0kvmu3evausrlziy2wiu7l2f62r9oonqiz96pooi0mbgs46aaxbexre69lmsk8mlvw6k9y4bsea3xo3vqh8c3nmydk0tsw1o3v1e7lhfljo',
                component: 'ifqccsxe49sv7nh43i2xemfus1l2p20t87w513ydhlc6pygtknvwjdxngpnv9pdp5eqneqyo96ktpc8mwasqtdqqx5k9ya7qfgfp741bj9xr3z9mcgda8mc3fi75kpnbs72t3cfcvcm8cn023ik2qclzymigo2g3',
                name: 'u2gqr4abyuf64y27gb6vwwu0zxq57lfilka2tqlaeawm75pe5f36hmbxhpl7wqobfxuxnexj0pzylnmij4afsyrtlfj1l1ins5wd6cuh4mqird31tcuxabohmgg0jjpkvo4oufwx8kexev3kpp4cci1xesa0w3ao',
                flowParty: 'qx46o9ixke1kaz662nt6cw01goh3vf6uxjcpx7e59053nk77c7wdssqck6p8eng71qh5w3gcz4h8e0oa8rt8l4ncgd4dbrlgdpyrwlnfuqlzq16j7nw9q4tfbt7dutar79fmitsdccln7le8962o2644so4inrtn',
                flowComponent: 'rhq6clz6cu598hqzy9eskolgjaiprqo68v98ykrns2b3cdz4h3prz20w4urzwzj5zk8bvaha459eezjp3yjn0jo4o4m8qpg8l8ecflxonnrvs7ygmj3iwqzkr2jqa4ipgk3c878v6h96srpyxknxwpj2ofy3inco',
                flowInterfaceName: '7l5rmnefxf1t4tlxhxkbkrfqof2mq09uxb4el6h7yl9wx23ojcx1wm8aermln27eq7ll23i4jhkm2m1p812uigbdf9f8k6zhsv6exui1w8fffloatd2gsy4jja3v5q4guiy35gr0jip63vgr1t2d9vt7sikd6mvcv',
                flowInterfaceNamespace: '1s88x3q4gwwnvg3vk8rhwwov9k6r522on27c5irlpow8bzzaxqtaiuuk3u82c9gkbxgb0qgs3d9jq764uw8aoi7yv4z9cjo41jdbtyz4lt9ihh0sgx0yx62for7skvcs3hlxg5h1ojmvw2clpxhmk1so4iuxpqm4',
                adapterType: 'icxmt34xazgqryh3asjvmvc6t217iyy1tf5pqbtpxgo9ne1so0ha06ww3aqo',
                direction: 'SENDER',
                transportProtocol: 'mce1hbpe3psuxhk2bq9rxl0mudon4kjmqvk7tecviqhfyt8wfj2wparz8unn',
                messageProtocol: 'bc4tkvw9t4ietfq8sqmxrgvm7qre462zbm8rodmanbog2ku9kl7b0h2na08n',
                adapterEngineName: 'smyvl1zwgf8vbyp2j359in25yvq21jbo5o4xjf0q423fx9y4kkvagg69zudiyftwd0htbajcy2itioi99ux5rm2iy3dmhzpr6ymalr1ndnyn9zsskm5n1b4zo5yy7digld1e30mi4i6iqo06pfujquexd9yb5gg0',
                url: 'd7yg30ct69knmh7awksjznfsn2fpt25gs5tfn7qzou8npg5o74wuu1dy87mhiuw8umneke0g0f3eusuf54umk9xlf38oz6jwr1vhf4l9ek6ua9v1fzycmbuaui1hiawg0nmqvw14uek8ob8nxbo3qa7105zfpyuvgjfi1j7vmryy6cpieb15sc859tokl3bl7m7vl1jzzwvhvxgplawqeg63zd7klhxzeg08g3jgd0ny0frq1sxr7uk0imsndse9zrjbofuntkdmp9t6lsn570idl4ieku5kpwy5kl3lezra7p2jf8gohhbiknic9qxn',
                username: '1uwqkiodbbcpk25pd2r5zhjsprumw96g402p8jgyh1fwybomaogyha5zyjfu',
                remoteHost: 'zpu8oxzlgonhwr9nkfvf6z5x3peoggbw3tx96qe3vjnvabm37ktld785dqzrnyxyn6xknzln78pb51gj1phcnw9hdxrpjoukg24ud8nhfgbwdiepxlx8vyorx3hsdbwjzjysca5ido8wfouuy9hrboogn317kpns',
                remotePort: 8932929235,
                directory: 'a4rnovwd2ti7r9j8d87uye3x0frwyx4vhfawzabl5210c70a0jzezxncorqruopj7fu7dkfrs2xcyh7eik7rf5nzpx1dkp7cxzusaxqyk9eaqalxgeq71w8rqziuypblbehtvz1fp2l8qecgxwdkrk7tqlot56tehs8vk2ez7h57eig92rciyrwatrj6r5u5xwfntgu9weu66rvjljur3y7o62efwmdks438vdfppa5afjndx8tfzfg5cg3c058a04oe6ozgo1vx98fn738p17qhzf4orb7cghg5zfyp41ff8jqnpcfm5pnh10r3vw32azz5typunhrruvkapjnagdpalmtndx1exoizg4z3otto2irrdaiqauq0i1jawn2p0yk63cl5f0unsuptcqqcrxk9l3tpzf39yqw86wgwjsj0ead83dyec38l2sawkf08p8oknztxl19g3l6x841vboi744s8mg0h33yd894u9oyy1m6eqydejpkupwlkjxb2emqepbo7mhwpmw1wxzdd4dukiznzdnoq0chjr65hf94cxill568i4avlzmk81di6vj5pmht0ltx6vwbjc4vrbvad9bf4rnovcl17fwdebw3elxuwkso6hxecja4zqjmb3yc59zerh13sfcm0pd068o12x44w8c7bjrr0zc3xxdqiv62auzngy4v66w3p45feqbgx1ybq78695bzkkney83o7u7t3fskjm814s44y04qxqd3gcf9dzj63xgn9hvmu4uk7vsn6h2f1fbpql8v8p6sff5pao9d6y7x5wy64v5y47ln1h54aee3q37vy5ki5yacsgrs9bymq6dp0xqlopq52fupwzg09cyzg9rrgrojhbcr3stdx8fpj4k1zztue2kti5jjy3pufu3183bz5zb9837fhvh246f519atktacrsfwsk386gl02qxuiqy52ksjpgxrwuw23n252ptvy1z3v5i11lqw2b9wofrn3xan276bymakouur86mwibnt0',
                fileSchema: 'rb4ofd04elj0bk53xajfxiyxepm9nzzaaugs5e85rq8a9lbao1awi6bywha0m5e83gv2m0un80k9ckper8y3mxpvekkztwynaxo50f7x9vei01tw0c1g4ppi3bsscllm6ahw9cdz40bx4wbllun36g52afogxlha9zsknqcz9pe25tjjsec5q2hh01ocxcgksp00cuda2g9addfifk2fejjwa0dj7ynypoyfcb9gjezt8hg9r3lzls05z9z838ggecso7rurpnk1sgyvq751vkr2i4tissryazsip2p670oxwp1p7fnxvgtss0nykaeijksjrseghstg8vxnk6nr78avxnyjfs54ibnpjvnet5l282g07qzmjsfbnen8vukxvf6eqhwowd6qckpn80i23s86wt9k34lrti3l2ts79ilowlz3pfz2q32qvjqx0ofx8xais23o94u73t9mkbp243x1cdu0iuwquj50udtmatkeku94j4l91hnhvmolngalpviahptfqncz23yg00siunbh0ug2ennr45wdb8kn12le1yqbg7qlovxv08un1pcw8tzqb7fdk6ka9y2kz062mpn9nei5vwx0ah675x53y4bbub3k0htszavky9uhumcj4jiyakkj7xbk7dq7yuh5wfpnmtfi5jjd7i0buc1zgq7bdrz8x4yv8496nlqh5y6r0sgvi125151byrel77zd76aaatw2qzsvt11cqy6yr09uit3sicbix3hk8epnz6sngewwni079p263aevmtdft5qgcw676yaks0j9pp7pfj0cj7fbdqscasrl6utl7hg24ums17za451qp1zkxerhgrw2928y54rufwbblp3nyvgh13ucew2eqqo54k2fh40uhon7r6hlsw67fte9hwp7upha0zsxw2t6oth3qp06zrnr30osf5xu5lai6xo4cyqhub7kivql115h9haxqn29a2poe08e6rxbi6m4drs97ae876uq1woywkh0ismqkj5h',
                proxyHost: '07919orsjij5tf7d3fnir9lf1qxee06pn6p1b6x9zdmw9aqhrhtv3eto1omx',
                proxyPort: 8098188660,
                destination: 's5ptu9d9h4qaw567vo5gqcozyyc8c5ryd2oq8ay0huoq76lvhu3noea005uj9en98687kkw2k2cjvjgy286onkslsdvzvum0pmeav6yb9uewwtmrycwdx4tbn2j03p3xjvl9068empqdoq0lfcuhlwdp5ie2as4f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a9ywq8xh7oybdrxa0yczs8mk8gd51uyfj3kj7gmidl5xf7wx2iylhn0kh2u3elxeomh3ofh4554ympse6eaigyrei9tcjzfsnr1pldfkj6sekdyhn654tb4q0xmdq1e5n20pulpa4exgm07gv4qomvdl3exy5mig',
                responsibleUserAccountName: 'i5j3vfcj6zl0ljjirfow',
                lastChangeUserAccount: 'nfhyvvutyovc8z1oid5t',
                lastChangedAt: '2020-07-15 22:28:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '6bnsxazvh0c131i1qx11v093lmgyj4k6zz7hlcr3y0ymzgvoqtjnxlwf1dr6dlcufq0n80h9axa5qkmmmri5no3ah0h0nu3f7dsjhzq04ujyk2sslbkyour63kqwodw24n8ijvjttbbmeqn8ojg96tzivjxp24jb',
                component: 'xq1m1a1d9n6m91emtwye03grqha8pydk4of8qtx7g5ll1ugwxsedypc4052xuf0lcis8qbshvrwz0n2732teqs4l6in52tbhmkk9pphvdxs88g9w3whv6ug2pgw4i8m176rdmlvjr8dena0fhu0dd4v8iqf7mauz',
                name: 'hphgu9eoxrtbj70fdzzxp9gop7chlc1tq9ubk32cz3pa74gjixs4l2wgg53svjcsefbfqmbmwtoo8avd9i1y3sa2sjv2zwxtaeij42952pt74f4dgbjj5ojmgw04rs0sg05ldnixfakapms8qiydc1vkhzpqwwog',
                flowParty: 'onarp1biu7qt71mtcjest4sg5btrc4sm54wx6f57wn3z6xcghha8eu4fn9m9sxynreioosnfbivobw444ssp6ja2cmlqe3fmvu9m45qbw8ps6ch2vyd360phbb72q4rzda9qydhp1hc8ojsvjggfwot0niy2wcho',
                flowComponent: 'grpof0gu1g3te362o894jxz3esj1ztw1m4ds9pylc2frmt588tubq4bceg444onzw5mhvsytc20v45cjl2u9zncuxqlqtf4c3a4cek28uctoss57i8hu3zbtjtjudiqb9iy6p27it06qyiy839a7n4j7kdcgvea9',
                flowInterfaceName: 'vgjesk06mvkyorg03jwt4z35o8tb5q5ilqe7itkud2n4sqtfnuhc6p46hy79iz4roxkjq69qcbvg7l031wi3e6v2pn5smk4gluh3hh601nn0ier0c3dapvgaujms76scpbc5rp6v5nzjkbnx29fhllu5ey2mkqoo',
                flowInterfaceNamespace: '1ntl4ty49pr2penls28drrvw8w1rqv3wgs7pygr3ducfyrhg0yqfznfh2gpe9o1soc0162hl1oriyv1e6wkbrsc86dv9d5cx8gzsvb9besidsof2143vu47ao4w83zspd1084e8ef8ir8k89g3ce7g9cz7inajcrc',
                adapterType: 'ob6so8545l4l4vtsdyt8wpufpfrlb5a8q42gxzf98hi30f6v4tfw1uvlxewf',
                direction: 'SENDER',
                transportProtocol: 'q0rxr9ir7hqz763mukebxwg007cxrmr676e2ntdw342zvadb8isozsuhazg8',
                messageProtocol: '5vyx1h0x0141cxf6u7339f4wcij2rnqg8u1xcfws9984svp0gtwb2ghn2vu6',
                adapterEngineName: '0bohtk1o5sfpblaexsiq319c0z0266in5cx2cs1g2vd6dyoxclez9hhjgxcrb3n5ceygpqpv4i3f86n25a9j7rxcdvs0l65edhws8y2wpi3c2q7sxokrsrj8rjhu8zalu9zwzrxxpor34aztpf9ltorghfc0bzpp',
                url: 'enngs04sxa1qcy2uxnjo25crj7xst698wye9xc7r11lhecu55oeadk0l712s9gllujc6xira8w1zwei1prty5tmq5r6rat326iuhkkqmpipo8nh6mtlohw6bzcs83vpj96t53bn3iu7x8sn5o30tn8w7mrlr1fo4agatctxss07hpgvtt292iee6d0a7oqjav4pkf9x78rwwofmxkhsw0nrrklx8dw2yptv8nb7kbrk93eah5u6w7uk90cb8o8c0ul90obnnqt1kp9wkaxrk2wrx22gqno1r5t7ady0p5obz81egmqlde7ulckqcxsrb',
                username: 'bmp65x1uoqtsk7x9esg164cr5q863p63ca1up0x30z8wx74ng8zbj9soyvjl',
                remoteHost: 'brguys9p1085ws4grlxs4fszph35c4bu123lp0y5l35dtlougoyl6gqpdgmn8l8py8rwx8yusadf1t1o39h1vxn01x8ndaab8sf42ubytao7lw8cjte2isfyzw77sita6unw4v908ohdubx7466r09712nurc9ap',
                remotePort: 5071366208,
                directory: 'lts4x56vvms7wib9u62651dqais9rq6qgwe1iwyf5q9srhjw4185ur6yxb24043csipks7vl1ju8ir9293xzlceonzbrpbsuc7jv1q5advcjovcvn57g1v7hdejs278c9hxcwebux0yyf98d5ag78a6jkh910j4anqv0rlyk4schpsrye4yuo9li5yngd4zewbmacn1h7y3kop64no6o5kcz7kp53adatgsg9e28d27wvtku3k1x11waav5lx0rpetavri6nqgakb8kutgx5ox86f2b7o8c0lnu9y8y9usrfts671vg0w25p51pokvq75qvkvt2vs6nen5dtfq57gth8bkg4tpjbigo6uinq6o6s95p975xjorrdaqlm1xexmbkb9r416cr51rrf9aet2rsvz3a4mreb66yozge1asnwtsoldqudl4t0zjozpcj9l6ylgxlzasdvfkz0mz7vmjxpsnf2qum58l2o1l5zbmmv6whyzbucj9ha5dzuana1apqh00ghrlk6h8ri9s260gvdsd6gakcxnkgqj8oa9r5yqv2n6e3nmpafxmhuq18va2eqk5lpr8ubrkyyq6kwau376ppvkbfh0eaw56qsjo2ha2looxpwlslelok8ntkpm9a0e80oxtqeh1drtqqmzq8oeucivhmjxwrk3wsk0fc8huyspywkfjrer2ra1wjjz6nvfmrqi6n2yzdbstiyx8hhsjtlsob8lij2ievgopgewex2m8yzt9rgjvpoku1p66skwe5aj8zt46z6asfed5qhfj2f50qhtp71zidi1s7pp6j3q0lhvtm55vpua8mfu5ofyb7na6n93j3p561x1kx7al0m5idjek5vqwkyil1yvy9t0muajjodf7hlf2uoz6f5a2c537jx4odgo496b4deuejao8ij9wt26ey9n7g6hdeqf6d1ylkw2rugkuv5nf0hyd1fpqusgjvjm3ax4cps78sgfno59g7q1wl9p3u9pqed2n6ujpf7mk22fub5',
                fileSchema: 'rc11ci4kuxs85mcsxta4qj2jtybuxnooihfcqbkdvglwfrliu95nz7hzu6q6q6ff8oaqauh4k9nub03ipgs6cocekayqotmh2nfhlqxurxupjf3r8eoijho3smx1u1kgxftuy7bgrdjua8jb00wm0t1ms1knx3i1sagrq5bcije56e5frktlfczd7yzxfc0p3ci3mwznrducbioiwbw9kxk0oh07g1woac2yejw1rlx0widvp0lotsv3h5o3ik1zizik8jg4xd42qmxvo6zv0rp0o2wxelliybpvaafy3fl5xvf4e4eme5ycal8xg2ogamvr3ql7kc4kftecrx1kjp8nj6jp0ziicencp62vqvdb5h9ugrrgnzwaeijruo2utx2rvbutl5uy2knnd4qf8623r2rjxidcxx12ufdmvnpdm1vg4zlt3uu6o5z6wkabsd59q5r6hnn8dqevya6kbqf7okr4gh6f7p9bl53ij678br8kiinx5ht285b1mi3g25zf2l2uq1dgys70na8uj2k7caz7ywyl6vod4fmjok94p4f2cruoas41w1y9jbbeiq1n9vcthhvqkwqhl7er2kryfevs12vdtlp1buh5rrwi6vwcfo1rkfy7g28e8c5twyoa62lu13be44trhkz4ge4q72oxi4qpo2k38q0g1ujaporo204t43d9kgjst1g246atuumg4gapst1bm2ayznmhw7zuxpss13ywkygqlu66kt4cfnxozjybo48a8cxabzomqtmh1afpsbk2c0x00j3afducso6q80yvupxmqjsqbpoow968ab21grnchp34qod42lllmavjuvgt2gszpjyflnlhpmizgw4sastacqi4n6bqsubuol5sfplwoor4tjeehdtnpun9ihvxiwh3azpbcrntymhnsu7svtwqfwcd67neh222ltwy7zvbu0yo24b9b4sltcsact0bvaemwdnkihjgeyp1qny9mo96yktqosya5b9iy4cxaux7fq3h',
                proxyHost: '4pe5wwky4sgprb8f5bk48q5uhtg8it6i8g7damkuk40b7dozccgtq0lm0lz6',
                proxyPort: 7014787851,
                destination: 'bv34c4wiqrd5221tp5wbv3nwbeq8py1uyv7c5fnsw74yvqvbrvaekdk8x3pgdeqiei4ckfywn7p7qun6rsk5yy1ctkugazeyv801llxt6d7cohsqv0yutgw8vln2frfigp9bzzv4ffpy708ix18n658cahqcvxtu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ivgvorstz4rfj8untqexpd3fe3m0t0wbulk0m3tkoxx1mkkko5t71zkz0z3mepud8um0qxl8yn1kzq6l2mntgbdx17af6wihyff3jbi0kbo4lyo14uor9kyjxjxy8jmkfq28uyhkijtyi7w9504ufola2apu8taa',
                responsibleUserAccountName: 'awk6sytdfe3j2n5b2lay',
                lastChangeUserAccount: '904tqrva5df954j6amg5',
                lastChangedAt: '2020-07-16 15:16:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '5jybcv6j47t247jwsr5pnrrezbipcjebf6mzlmd6ni65ongcpfcj9bh99n7ja0ci69l927k1910ji4g3hxhhrc8nmdarlggwf8zp6dc5iz1utk6c1q7w4vu51ffucyfwga3hnwfhxvlguyeqls8495srxm4y276h',
                component: 'ff8p1saxe7xn2ap2fk78qsacu8ork0jyhlye2roz30emfwm9st5tc3jvv3cnjtxahnpudfy7d57thsyzibxnyqm9ex8jmpo51aht8ky8y6t3x9sr9wrz8vh0xgd29kifzh52qzza6cnrnr300djwnxv5xkoywznv',
                name: 'mvrfxlf1iylhimbxcociuiqrjydwbqrx2v6lutrif01zu08ka87ucvqglbjoh0o8roc4sce54goake684sg2r11xjit1ie4f2h1suxpdfmbvggs08w0vc5e8t60n3434j9gpvclrzmplq4evjasdjrwklib7aldk',
                flowParty: '48eoun5rwkp862f8quus74r8srj0kakp79nvyjbus5kltptgia4szgecifs6jw0wls1718miyjpbqks3t352h4g3tbiydkpmkhp4d3vrpkr5t5qyocp93lc91q9a3aptgx967g2dj4gohhxygpq28etosijwm8dc',
                flowComponent: '4f2h800nav6z13o0kovj1pdopb0ygpgiee01v1fmp2l6smrabtj3vv8nhmxegqgbr57wss3h2aglx1t71389m9miwwe9x6fuunemcmipkpxcgh9wgdpzik2md5b6nq0ao0avu1gglqssbovig5fqpsi5w2mploek',
                flowInterfaceName: 'k8ok6xckn26fadmtqdlw0cxnafem8zu0tkfsvxtgxtvufukb1ujjqwa4bh07yzlps44dosmvm0c7t3236aub1blz7ssykzi54ulruyv0j9p2tw6dwle2arnzzx6ark3kw9f0p9rl27ui1sy22lncawrgozvuyfwj',
                flowInterfaceNamespace: '51jbzkpy4xb5nha3coc3bcp8j8n0gada2bpjtmav0dy0rajft4l0nq38emojh6wm4ebbf9ymz3gp42087x2h9jj0qeww6asuubphr1i878966ifh5fm4syb4gf7a4r4dtli4qjhubp6lzpj8za499o39s0t4l6sa',
                adapterType: 'xlib783jfbczk0b3x7j3sjb2cof4yqa0vs6pfg4ls6qz8ukn61pwsbxn8lnis',
                direction: 'RECEIVER',
                transportProtocol: 'cwh6b1drmdy605363kb5my4322je8lq2xea2qpqg2007muah4uwvqktx7dey',
                messageProtocol: 'qax0edze9b71ibxmqbmz5gj95eqapwlrx0l3c83ga67v3fod44pb2m8z8il1',
                adapterEngineName: 'yirw0ydqmlf5t1lvpv1c9jutefkqlj62kordqpo9shetf8bq3af997xh4ma6vzsg34uctsqdmeti36y8r0v8yopwggjp6mzo7l628y3hrwbus4iosb3k7vy4ry08m9175w8x5pwrdjp8nrxo76q4y23p7snghiz3',
                url: '66jtxiwkq5kfe97edtkzc6kpqlbvihrp71ckr322zr5oxsrdib90ys6rbtzdlrkerc7kodb4s9tgr058a2ikfq66blunqyezl5xuaj0gzqud71fx3gl2l9yi1lolgxnoj09wz7c15o6jyjvts61otlgdkuhfh8wicvgovrq8jr7eg0shc3kvgvue2z273djivyp87079vgrrx1izn1tl587giiv06e9f9zasugq8ga4kumq7r4olj8rn6urx76fgn9p5cemhzr99h9w1qar533vwcmp8izw2svr4b8jddxfmgqsnibtblr0ovn00prlo',
                username: '6ix7kf4d4bxoqln5ckxumr0ixmjccb5hxq63a4tp6450snaniviqr634cv6a',
                remoteHost: '1hqw9t9j0hfeod31lcuyo5zhcun49wg0t3ck3454rh6af52czgwpx6g0yphitno3n00el0bsmm347mzatw2l6b2p2y8u4y4krimmbs6rbtc8mqp7cfdanvqu3q0al3q29oudpsev404sg6gs18o3afvtqbv0ykby',
                remotePort: 6043231449,
                directory: 'hfyyje43k0xg3jesuiljehidepx1crt01ezg99rlq9p76t3rw5jcgkqj9ad37ylt0cyj8byzy1w037ai20i1jz6d1f5kqg5m60pn38ff9npp4cnvghivz6qr857b4m6xkcegl0hrzvuwa1buzp0xtetvei593fmxfxz48sb0iwsem4j5enol32imph1cj8s1r3n3pcz3ztrk4dwzo2r9p6jd2218wvp0kubdegute96yfdaiqb2xrbmir20lqgv4dtju9i96dos40d9r7kd56mlc4usyka0zfj5t9hstb9l93aay4l5ery5vaprvmm6ryx96tzy3eq8nrb9hyxllg4vov8v4b0jlzob4xk44db75mu8hzh3x1upy48jtknb702vnfpzbmcws0fwyiwxmz3kthtmf7ci791ca0fg44o3s9iixdqqi3eu65zrtzxpuar30ph55jmqp5uf2pbsf5beptwdjqwvj8t830ptikc5zmtgwofoy6kdorjn06yjy30b39k0wd9ne2md9waxv2ainyw0eduq6n9ak81q1zaichbptp9tr7piflpd8rttawgm1fgghffetwcvrt44cy5yqhkvyssqea79bofmr6nk1uv0d9k75yo4yenk3k3157qiz9lgac07e1oeyp70z9vxm2jsy16o2u9r9unf8i20b0grhuwqc3ue12vyx0fvl2wt34vlnhgwg2s35itnd90xzga9yq1h7wzu6vqwnrzau0q51076hrbaz04vtd8zpzbyq1yqhtz7qvc1qesk482urpo9f4m97fw1h4egjnd7n6rifdnbmim8qa2vf3ltmudznj362u92l9ogkgrt2yojbqw6v5dcfk3gunhtmdqql520zrit87b01ypdlnyvs015yvkcqb5u9qsna2vt1zo1xydc7u2dztotfq3xwi2hmvpyl7eyy1vzqzqiikn5c9h5fg3opx1ylkrpl21k9uqxe3x4fqin3849l5uf21beviqqr8r1jvsmk7of1ael8',
                fileSchema: '4i728taogn8o1mdawzqi25f1yab11mfh42or67zpp0q0kpyyv0coctiy01dyeb38gkummrcvr48bobxhkobd5rrst8rv4ceee02ezd9sbvgs1y6g5c6runptwhtkgyvmwxlofqzsn6napoedx89n3qaevub30dold30ag4fndbpiloxfpwtc4l1bshm2ei4u9818zx1fxsv64zitrjsnn751ejps7yw713187asxnpwhp9oln3yul92395tbjdpytoace6mhw9osh9gv96ncnfemqit47izbitrxtanuusomsd33mq2cysr248pqbssjkp76kjsfit4e9lwsfbbomhp6lx5pkkc10kcpjflnmo81qhufrzbu49k5tvaudtd1wbsbmxmb8k6a5j0riw0ewinv3fftkx8eyyavmccxwk6y2a3p3w9514jg6x543t798k59hzmmt5nt3ti3kof35jj1dvceg5e2708zlvc3az4wgog9peopju5e5n1kic9ffrw0h9yvg0gdo91sgzj07bcuxa7cw1nk7yzph35pi31tug4yktxjr1rq1xp8kasfrixt7xfiu8l6ke4u69g8vbhb8h5d7o3nhsvhcqfv194szm83m9gwbpy6c7gap2qmlliwq4atojj47fy8uaaineyctou2akcz5qq9ofcio06y9gd5dsglt9i9osxgt4enwp1p275zegy4c2uryltpverny4ewnjdalbg992ns10ijihjb2jcaqhgv01iw4t7upweftdryxwi8oee5ern2teg174ob4n95wl6euwu16a28wnhzopbk60zykm8fn21dqja5kcan7o4zxjdsdhemz6akk6fe1slighgz0midtqager28g0g8faxr9j3zuwsjckumq85dy3r5f4n9xl22coucjuoawfibcrxtajxai1np89mredk6qvxpttnofyos4jkih9kl6mylp63q41p5hg4dtcs1djx3v7v8typewa8idsqvtr4bri6hy9d8hhzv',
                proxyHost: 'gjn60aenr7c66e54bh6uvmab1l3fvjskf21ixzabjak1hjjbjm5ehngj1r2p',
                proxyPort: 5048261846,
                destination: 'rgegjo2nv1ukwr5hk5oshf1nsjdrifca5ux0ppxq3rbo9m1p88szc4topq1nhkatkyharkun3ntlo6s6vhlnf42mek7hr0m2mw72ebtvjwy6u9619nyeaelnkyguvjmsuogq5icv25f3fdf9la91h9np462dc435',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '82ggsctghq3h5wyi4vvu0aop8no9gok7c1jpbb4azdat24bdeqf3np7up5fb8fy8psv26odf53rg4meoedssn2biwtc3gwjqv694jdxql8ahqvyzoewp4f2xlu71ijkizjd7846o64xy4z7o5i6d6g5oqhy2lenm',
                responsibleUserAccountName: 'gcqz6qlzjeuaovridraw',
                lastChangeUserAccount: 'inim5monk9839tg64nwa',
                lastChangedAt: '2020-07-16 11:12:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '3lyznx1dxstb3vueobcphf7tvsktjlt0092am9agdegatpo4nmyi1t0ctcco9jsqdk58xkq10ic49m8v58vaegrdapy17e2akyjhgkz8nxjynejahix30qm5cnovtkhoa9j3xugl88lks8lo4ncrehwgjaqvprzd',
                component: 'mbhsrqf213rrl9hhrbtinbnh4tipprfmc2ygpk9n1kaj525hl1tgg0mw5zphyd0pv07s6r966ysizhwgb4lqhappvwywohbx4wpz8fv7ds61hp8uy92mvehc14qjhlkuwwdiv84mlbe7fwjiozpggwksl2vc2pbg',
                name: 'w80j5rioi3n71z01zuj1wl93bc0t5m54yv00dvfj1uk4gpg2t7w18w3c4tav4j8yt1rvv8p0ubpmim7yae6i7r4k8g2f5f5rwebwx3svhdqjti2g7zce1ud7c6nqc7j22ia4xyz7i7lxwg4ku7xvtsqe5eqrs6fn',
                flowParty: '7cn87c99nirtm05l1kcsrgmgzgl3l4jhqao48iaiwaki3sgll3m3slexnkthb56hojhmvgpz9ycgw8qcll5bu6w6y3m7hxg079wdoyuxuwpxsqe0jywekvuywy3y6l50gtomp3zuuybo0nzgh16clgk0lhyxowya',
                flowComponent: 'zfsi7ydu1sawvpa61ai1k011k3eymj15wsqrw4qm80na79viy1lynpt7m9hatpi8hvwxnu9phlh17b0i8wbokct6wtioetenj5bw8q53wpwtnpyb2w8jb1t3s6t1y1u6zfbyrj9wf01t1ln5tqkggg6yq3er2uyt',
                flowInterfaceName: 'p0q6w1w4mr4v9jdbbb2s4pv8i2xwisgpbskwleivq8nlh0t5pzkr1vdkefeuykq61yompgchinva9n1s5e1by6iblxrybby65qv8h4z861wc6mt1bvuuhtgj77t8nlir618kb7u3xqeyw8kq4jxxm6lrlf2txi3t',
                flowInterfaceNamespace: 'qqw3gk0sgfylfnoxwub8udxbsnb3uz57nogg8f65v3s0hu6h9k6lmcoqrpop93fda46qkush62jvflsjkctt2gkaots8gbu07uilmtzo3rfaqiesf4p7nfth7tvx0wn9dle4f5d9peo5ezf4g9o0nnnt6jarqxvj',
                adapterType: 'q4g0mccf75g4cceuvctlxz7q8w4fjnn240vzhf7m5btbxr0wqltb08z3dqqv',
                direction: 'RECEIVER',
                transportProtocol: 'x8r8lyrdme9pwdvkdrgjfrwssxki58gkvsktczxifrob2smg6srmnipx0pz36',
                messageProtocol: 'kfqikydx2iuucz2e4os4m08ykms7gt97c0zyajpqm3fb7us6hi9lhjsaqw5m',
                adapterEngineName: '6fedcsqt2e9tmklh2iwcvbj8k1xtju23bvjscbi5kxjs983oa99pnutrqmlu3zlt65413af0304dbxhetpwnkl4u1qg3qcyiwsklspajflgijnqms9yfiw45r5lwveol6ag7ng9gl5045fgccvi47of0luraps5l',
                url: 'b0124tlrg1axqdvjgcyao2533qxft9khvqtuq2c4tq2c9l35cxc2tpechperopbique5exwea8ogpp5zi3otgtjxg0got5ws4d1vkeprz1yugpzgxudwqs0l7tyn0644g2db4s97gsj5o0e4wdvono74e51l5ieg5istlmr5h73lc7pm0czsmvja6ngwr77g479a1p6dnrm5hhw68hxpcwki1aw7xz4k97wu4awefam1ed087c31asnacf02rgvqzsym64ojurx6mvpa10se5ugphrnfs1kqfwerfy12yryiektsmfrjufqko2ynqz91',
                username: 'jeii184r6a4yg6od21jxi2cbe2ks4sd11vgomqs73hcodr97og1bso6g3l6e',
                remoteHost: 'wubmnq5y24ond8zmugxjlqkivxfvlctkhpt49vcmxo9a3a4t3q5f1a127l5dsh97wa9g2r85yelmd80r08nsktg7pkv14yvypwatez35kjfkr9ap38zei5jb0rmkvw48qa11flideq4nmp4c8lsryouej3qrygmu',
                remotePort: 7464914522,
                directory: 'u27lf54t6ifysz929kzc0r6rb10vw7v6esadx7phohgrohmrpdmgjtqzs6mxwd3mwq3f6vxg66xx2dqnwr96dq50u26m0w34ho7sh32k6oeag6gjtvzvibofm0f3ythxh2blmjg69mj89gmngms6efr3r326s389jfnk1zokxojnb8pmyk647xujntgtuw7rd0zjulhqqcqeivexlu9uv1q43jouir051cyaytpwxi52xxuwget9kwnaimkmj3zw7ip0uvbmm0rgtlc6s9rcpdg12hzjvob8rv74lcl6n7dh97zqmdr41r2ftc3v8iwo5mgdrnsd1q0jhui6wam3y9xb7ft0zanae8d6luxz82xco7dc3fdowj8vbkvpx0luucgxfylhoq02rhl9xth16re5qowzp79elc5oe5a4ptlultmzs5yha5gsl28p70iopsoem5pnsagq94d1sb2zhg0cepv2a2c53j5vbncrfbagyynhcje4v27fnuay8swe0m2lyp72697dr0ciovwq4hnrihik3a1tw3asb4n0zb3mf3838hq6fpsufsyq71fa0rdtvo1zjf526x25o4tjkdt9009aufvruhy6qxwp4cmv8p4q2h2a0h67rhbodimge132le4l7516hwe8wizkgm763bw7i794fowyu536qn9n37hy2jcwhsx6hie8lodz81qh36k2alo794d3wemd4ui1bjz9lw1xfijd8i9j5a50n14ktk7mf64u9ng4ysms38cjsnp47ggbzjyipr4q5xs1r1lrhq129nhl6ft87qjzom6n6sk5itf41r7ktxuka9huv0utssk1pjtqxhsj9cnjctvo0n8ki2lf4qcxfjq9deqdsqkfyvzhi01s9sawpaxyz9fdj8jadwhgkoow6o7vuacdq1591ftk1vz9770jrnncupo59ahlqu24rf66jn1dgbfq9zchfcwcevxycamtxy0r6ujqfmcp0i9ninhziwnw3g4v530w0y9h05px',
                fileSchema: 'yb1ovqfsdiql6xfdx8ipq156bbvofj9y3c6r5ex2nk3lmqev7qgzvgkkjvobvn9pqcgmfzttvxywm662cif65escn2qjvjj0p46f1v23wq8gdgnim4n3o78wsnu5jzv529nv3dmxbmkumv3pq4t10o6rbtqhpazjc5l92a27h1d2d5rd5vtquau75f7nlnj5adiqlq1gdzgd5bzrx6frkitps5dd4t67r422n6qa1aav6mkxsmsuzutbwatatri1vwvdg3ckfrkbthx9iogx9qg1y7q9egnw5mf213deezpl3g8q144hnhdvhkaoee5ksjxb9zxngy02jjbjq2gj7ki2dnk62dlmn7bdp7wti8pmxp1rfmq96vv3dspeuizaqqxuqvkrjo9rerwzt8zasifn08xacfte16ur6mgf0gbswcosd5prjvrsmj7tarog9ok5jv1rligpniwa2ok8qv7eqbln7jl0zt8a02kks28jdydr9ousr89hwztaid8319tmukn3ljwhhti9kky6tuhdg9qcnoalmsq7ywyvhhctkk0k97hxtdms97vlw8yffiti6tli6jvxo4raik5gl6jpttbrsrj7y9spztc7cxcd0n2gdswunbjrzba19wajy4my9khxvj41jdmt5kb4eynyrjyk8ss0i559lwvf36nax77teh15tn6urht3pw3jaqnat37gbbgvuvou0do4ff8zchtyueel5wehrjoul3ispylia5intnd6t2g3i0rlxl4i517nuuvnmqt9g28xvwqfuich4iri4uext969mkmjzqs1k8kff0y348txpflxncqrie85b44cwozw9hm9scednbja4svcl9p43hmqie7w7k5e25uchw5q3w62joddb58agcf06h1f2uni734k9mgq9dnpdidipz5nemxighumyn3yvtd21u9csymjeogt0wcjg92m5i3togtabzqm69vfxbzqb59u41ln815wc6sab635v95giwh8mv2lpxnn',
                proxyHost: 'wdi9yuyfi1sgiv02fed0xn20gpqtxq6xhaganmar4vhwi3mnuavv2er88uko',
                proxyPort: 5733359769,
                destination: '2aiyp8x3geowp33xlr69f67lfvqnb6i2xaz438yag2tj0ky1li46avqryfoks3xq4wti7b7xj8xrbbwt9tdtu5vjqmwmw6c5q91v663kt6z7gxput9a0kwdshi7krimmy27l43zfkeuitdof6tlhnh4dv05gd65n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zaeqm0t6lehyaj2yqmrxyriom3hpe4c7legp0y286x819vt5wpurumsbiou4010nrybsa9prho5j4avt38sd5l9ziim7628g823zhlolop99hqglqdwadi6ih70nc7n3xmjkxxx7bjlek32b1ya5qfoam03mr0jd',
                responsibleUserAccountName: 'as2jl73sbuyzz85dzkc7',
                lastChangeUserAccount: 'rckf8y8j0hvkk1dyqsbk',
                lastChangedAt: '2020-07-16 03:05:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '7ju0yvbpx5ojdkzdiz4wx6iosslh0dv5qxw8wazkod9a93b08lj0i7tju47jxqmro59zgq5bmxdjdyuyxdvtz7l8bo4iaf91fk8b7vhxp9niqhxb78ntm6ucg7rjuuxq3tjr8fv8gffaeax3xsirrl472v3zy6uw',
                component: 'g4kh2t0xu3ez7v3a4csglde2oci9zicxc45i0cdfv8v1zqycpcsd6ay2zhqig2d6w3w18lfn0pnbkoabloqb9tkmlfelmzl3sp2qz0oi21hqphh8zcu3a57wb7667puacvojazt2a5yabghj2yzrmt8mu7w5qnyd',
                name: '2iezo48jbnuww1dif7qf7gyvhmxapmnsto15q7hgoy2ftrfqo802rxad8vd5atbynjxjnq6gukoiwize1zw8kewwtn5x9tncwdbf3c04eo23tavrjn2a2ooz6s03knwh6ch2pz65vnv80heeo8lhts9da7at3usi',
                flowParty: 'vwbfjarwh11ynnptm0ts8y2jwet9zmru1cbk2n6fhijqjvsvmnpln3ob7i5hcz53yv9zbr5nt0i6v5bikzat1e77vnguunhh6yoh8kdyrf2e49oduiw1xkajke9mee298lrrzai17vgby7p6zgs17q2f8mg3shd5',
                flowComponent: 'fqpnt81dk09ihle9lgj827r1r0s80fnsa146sl58655c3zexeob3up92wser4oh5ouv54avkx6wfiwvnuyfpwaryv4rw4q2sds478dwe74ty9fwkozw3bes9dh3ixxe4ny33fpkvenvqrvdr5smthhphi15183l2',
                flowInterfaceName: 'b4r3zdfu0yd3hu05x514ijht03xsllegekht6der4twpj23ekv329bai8zduwj1wowo6qeuavkyzbmoxaqcs5j7rki54plq3l2vnyirp33swy7cj0f5lwj87n5fa7h8u3yoksoz4jcpzjcqwvgcl19qwdxqvymfi',
                flowInterfaceNamespace: 'ks1e6zq4j88nzxw35n1jjjy4aun82swlbqxc1hufx2iwhvml5ndf8j0b44krvx333orr45csgnjl6ziykjh1v4hsvst8afv918tlfgvp94sj91wqc4a52bu7g49w9qqnbgbzyjki0uf9ghdcgh0htq2ok2d6zyfi',
                adapterType: 'n8hi02zzlk0rswxce40xywatxhr2v6rbc17ytdcaqvkkux5dhgyd3e4x39jl',
                direction: 'SENDER',
                transportProtocol: 'jc2q0sgips96l7k1so6bbt25zyrvfev5f9ekbyloisdirxkeiuv2r9kc3jsa',
                messageProtocol: 'ps15gymqvrqpvg3kuhclolc61o24075xjoj3xcfezvl278qtloxfvrocj885p',
                adapterEngineName: 'fzhdj48wqxrad69bbpfz32q3rg8sqmq944t002nfky7yfsjolybbj0kghfqg1gjpfsvpcvbm44nrbo8k7cqy6mrw7sv8fts7w9tncf7zjp2m9gsbe1wrtajt0jeqz4ypsiixo71pjb8a488zs5k9z09lafk3osdu',
                url: '58ltw54c7qdkuglq8q22z00pr9ugt5to7dpre96sriqcptzwlp2brg1po4orvbleaboah9cjzmtnckwutjeqgjfay9vkgcydqc2l6ltu9m71pq6602iklu3bbguco5arjs893juzh5tkl2heqsnl91jt6x0sht1xzxkg79bhitwvfm2u4tplb9ghsw3xouwjzwjh3ko8o04twvhmjhe2uvvssipbhq9z6hnlf7y1f7rm7mng65kf6pjon0fqcyefd4t22rxuywng0pokiag9ukg6v270seodkah75434o9madd6vqyrnpd0d075xux4g',
                username: 'bzgtcksrh7fnv3atwti4pnk923eqgmw1myjkoki16by5iiedpq6zcxkfp1wv',
                remoteHost: 'qgt15aretbqtmiavgo3tqyvg7pxavrzlirsc9xfrrxrpcalvra9tkh8lrh6nu5rlrrse5dntbu5pk3olvdmyeji0dey4v13a7ohzah1xex0xr0pkr14ml40r4a1to7ctprs5rd59uhpdjr0s09251qbu1pfrtjhe',
                remotePort: 6229921947,
                directory: 'cxvljenkqq0s6cg0i3kvmlp0tgcvda9xbyd13v5trrwtci73drdrfpko43ejergnckp03x8t9z0vao9lz8aiv0ipx8l9nttdnnbogwzort2ok0pguwcqbq7pkbymxms3vuaemnec1trxn8oot6sulzkkbeejld2y5npknne9ahi9nte3x1ebqk8xt4a3lljni532qtudpmhy6ctdn8gt783nupyujubl47iu0khqvbsyqsolvi3th2sj7c5v9gpizen56bywjlpzspzyw09p9vl2umfwyk1bn81o7ooc1km7lj84ztlo8uzw9aqulq7qxb5pgk5f4bxc8cwuof0stxzpsdvzk25ll0rnlylrm7lna384e2x0983s6o260zitdr527zir8w0309ls7v0d5ijcecx2ku7zxhtshlofsecexi9q2zdrigl9893btetyziu1dcff55vvdbi3j1ln64v79bjiwc8chisbano5padb4isz5xl0ye2snlazs2qf1jgzszoo24wq830a1sb8l0tf8fwu09r0dekemw1r0jfc28b58sigd37g4hbxpw4n5k1nk55lvvkwdu8ru23ez9wxp7t6fvsf13j4kb39z1hi5mrw98xu0tdf9abofnyx4zodvr5ky716scmyt6bzj1g7mqtioxexqirb548rv7fjmzvir09e1ymh7n66sv7cho8a3pb5a4xv6tcvry8fgh5528t6ij3scz5zjyo32j2o4muz4o6pjc48vuf1ke4noxowgaxtu57v10yx15wek3x6yfjge0ojv9wfxs5urpeo3e9cxnapswqnj1bzsfwmwa6jgh28rn1ff0tyrr9by2ld5peug5ik1e6erlat9at34yk9n6pyuowt0cdnn8hfoxu97w9hykol8lj6g6qk4q8bi221s2hm9xyhalu6mdxjs2bpxv1z3zhvs0cuy0rjrspzj5rpqzhwjny9l53tws9xeolujpqxm4wtvz6m72dg803q0uj89aejojhzjk12',
                fileSchema: '64axwbzawdwdggnlf51d4qi3lepjupdl0qw7euzrkur83oidhb4wfa5y6z6gln2xprxd4t8kjmgzw5nr2ku4trsuzff8sx5wb3k6t7euikagev2a53hziv7fueu15xpffq5blcn3y4bzckh6axeknsrmg0zedckct1htji85apjv1jlfe5g9natp48d0sqbl7rmksds4rj7xir2aky160o5ralm13ziv6b8wbsbu7w5sd8ucg26ddzpeglb5708bvhx9v2ao4y2xts9v08l69ev69b19t8l3d3w4u9qsnwo82pa3fr3qm3j0dio0hx99gd8ul1ewgfj1gs5j4grqm49lg4oc7zvlsmxyazncey4a5aqi2hlitu4ltez8gzuj71ie36gxiz3z9zwvt9cmfadxvwcx9k00qj12h5m61i9a3iylyrtgm3fc0yme8ftoq52ia3ajbyyznk2orwye3llz318094qfxcmg3g2armihtpqtkg3z9v3pip8fd36b385kweceoxuq355m77gfaj55onot85v2adg00s8cn85orntlz46fvhepy5fw5evcztydirc8qgifu70tgv0chah0ki3a4bvlsuevzcdayhhk735ckv8n7y1nnn8tttg1qeycdnqn5jn7l4z26rl48fnfqyv9457j6bd1i901zv2xhb54xyp7yz5bzdh77bwgp8d7w44xqrgzii8ch6b4c1rbxlf5augcqgk9uraraikb2k9rvcmsu4ob4ni8wm0d28q6zg8w1xck7ivcwdw7vhtimh33d2mp3qp9ueec24q893lsdfjt6z6u3651pph0p900xy6a24qspij7wmua6h8gnfyu2sanjilzcs5a31pjlury1zkss8ct5fwdravk2f1wpl99f3mhvwcdtiv6t9ij3fi0aireqw75oopqdylgv9vuwsi7fl7s9ztsptg6mdegoba2or4qeojdn9lruutqcx3wy3lf35m5svojcnqlpsmr2b5z71qfigq2ikdc',
                proxyHost: 'hngpp3nlmwuy5jq92sz3xgq6v96ke4q79xxk424s7pbeyz9iq5rjiw0q0qus',
                proxyPort: 7569516444,
                destination: 'o5y05k7r5ngl182jsunwfknp20gmpbud9tco0bvtgzqwlagibk8p0qayev204b18m2lcr0xvhu3czmtal6gxi7smif24kx588gxj5ls42ltfbxo7oevpawt9a7rru3hrxt80ilpa183iqx3bxixl8xpue1skbkih',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '64hwnrzsl2582amiqcn09van0uf94j6nas40jlo6ddlyekhu6jpeswr0az7c9t45owxmshufcn640y14qr6gfys6n5tvrhhidc1qd6b1tih4ytzcwgbo9mov66k6jqccsxtlatgp92ptp5j7jr983ummx5nkcymk',
                responsibleUserAccountName: 'g4lcypk29nsfcb5v2gq8',
                lastChangeUserAccount: 'jhbnsvy53yyx2f0dp30s',
                lastChangedAt: '2020-07-16 02:40:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'aet4pqjy4kyu5p4pppkbf80x89108v7i5zswl8zorxbeeusi55edltketfck965oyxw6qc393lygapnw8ya9llme15etve6tf54dqgphnt4ivytj6qjazbdpdnv9rbygew9ga0r8ieegrtq8qdst0307xynibbc6',
                component: 'lbytnn26px6cuaud6746hq5bq1uv40xjhltnopodngoqcq0fgblcrohzyecjmg19x2vbg5qci3jfo5x8oxswt13zvh2p0ofihgjgrokvq3i16lygca4ngml5cjom8enpm6a3k4bn3mtuizir8v8vlbtd05fbr7z9',
                name: '56411mf7gmos1w2iuzuvcjpljtvpf2i0sqldlch4efgx7nqwdesnlxgd6wpvmdizhnr9rday0gvmm08eelk76vx7hfx7g82de230wpehn0vz3koneyrktnk6rckf87nvpoj7npumn6uuszme5nawa695yjg2ep01',
                flowParty: 'dlzv7jf45ycqwgzyn0lbfylxzzb6blyve34iz9oeq82lv75symx461i99h8anmla29aupeee1h1ubv8pou86yfgzyqu5b20g1a0w9hu45olvqp5v14qcigw3wapodkqbm2qpwqb7sfhvk8dwcnyfpoysvns3zxe3',
                flowComponent: '6008p29hd00wdufshv420gbsn21344tw0fjw56a2vlq1gd7xem6kyn6nts7o0twqf37t9uwh9o31mfb7077i1ic24y3xd6u4b0zz03ij26ewgmgy4nhb5yacky6vfqgmln7btfqrb5qv2garxzxvtuen3b7pno4m',
                flowInterfaceName: 'e8ga0h6rw61nmwfwfvttk8lfra47xsq0udc90d3cl4f737qw0axf99ar2qpjb9pzc9x89f972lp0h1r64z07qjx2l7wf7zqd363qgh6dgy285hbew4lhfya1cym39z5q4yxaevdq0dv0m7jmjung0sy1uctni3e8',
                flowInterfaceNamespace: 'xjon93ubxb3p7q37yv4uoml948u1y71vh5v1smz724smy4rvppy4l2mew2s832xzh2z1ex8ymfpmtfvcha3qu4lkijxm3c43k17xi9fpraa66wilmobijej61o0uo4v7d3zkng8toms7avs8w10fw8rmvunr2f8g',
                adapterType: 'r86436mv2qe80u0rg9r4xdve57juc2fgepwbshed043da1v62ghurp3n03d7',
                direction: 'SENDER',
                transportProtocol: 'nu1813q9gyng9g3b7tb8nrwlcvb95ld23c7o4c1l0t1tadvm34p0nsw34vdo',
                messageProtocol: 'dk8cvu4aj74j3u4jxg9zn9l4ogoaow1sif0xrr4st7eqnesgtzybxw5k0jpf',
                adapterEngineName: 'suhsr1kkcpx7y2hvs685a02v1cws51hiw6xushp3j6c7jtms7ra5bswv7s5c430wnijyme4xjgl3mw8ssqiqn0g1a8lpe8wfnkn2f15ltd3e8g0co7y4p9hawt9gzwbsrazc0x1ket27zkumv2uwx3sbvkuhdkvpg',
                url: 'zzqn7tcylhsenbiffsyy3ctr6kj967d0pdbemss3ptcpz8cfir3px7376japi0aztly0z2mxqsiocz237evizbgux7apk9bsuox08fjiar2rtmy3z4udmrfoaddezg39w7pgnm7k0upa6w96zpcjdk6b9saui6hjrxceaw5ez0rsft79go7s3anq4gw4o9r6sninxexf0rlwghnzr5i2i94srnyfrpdquin2ffw7xqqnrl2kobx1u1dttvbthmyr40qih3jcezs7w0j1r6rxmhcyk063pxggkbhmxzxly4q3xkozof7oyeu3jf9dtwhl',
                username: '2nd9pbc3jj27u5zc0epy52fugkl4dg46eaxv3hsoddbtbf4mzi7eqjawoir7',
                remoteHost: 'd9zous3d3e9os3uafubfbq2wsv4socx70ngewpj26l4vlifapiyz1idtd8szhtmozgicgyuaifzblge2n51lqt3nwcvkv3pbmgcm28vij1knoujpljdsmx6cp4upvaa5xfztw5rur4b1nae0qpijnv3xs9ns9iw7',
                remotePort: 6059375652,
                directory: 'w2t3as1e0ti3780u06vyhsl4lu1hy36uibytm8bldkr8nl3rm6q593dgfyzvno772uh8w2la091pq2ly7e0f3nuo5t1ng5co7n7pgfy55wuq9tnsp613i4nxf0flex8skp8m4h1dstaqe3qy8e5qq20x8nhqpse981bgb5y8vua69a12r9xfkvn4txthdamhoxbx6n3t5l6u9ey28sl8sh7qaifk8orsufyec5ik0ttgya37bp6xmrl3tblsfqerp2hx6x9yr2yi1562li3t520f2yyhhm2dzjl3anuchnqjeiiab2hlyi880dfg1ep2vlkwc11mjn1z0g6gmf2tb589m6upcaauiwwbzp8djkkqigbl0yglsj3rxq02kqal1yif6ybej0o1e593iavpbmjjkq67uiww5p5953wrrv0hu4h76ov2k62xwzi8ittsnjp7d6vfb6prxfi0myvjzzhsovp4odqce10k3zmwx96vqe8boxffoagm7ajyozg37y0m9jf9jeihn42kz3l400elcic7qo60trz98za9nhb7wjs5jr5ewaxe48jbsb7vlfza9oswaclaryg3k2qy346i8mpr1cb8juxwha4ror9byvlz266ujdh0qknu8kwj9uwpmpiyzhoj617qw4k63h9megoaurr5x6644f8j1hg3gb1o5lmbjuy6h2vjtvebm86w4l9zdemdaq9jeqdrrtutk48bbkwe28pgi510b0otrhd0d0be3y4k2d5vzfkj5oqrcr6a7uif6bmgzxycgzzlavt4jiyn1whv1uhlbert200zitfb9ge6rdzbc0cllbyqzj5d82uqsu3afltx9qmvy45ytbtkgti3xunw3tk7q15g7omj7e41w5usyyi2lj725gydz7gobtdomkmdk7ejo6shvk7t67sacwunfwymmuv0qa8htp5s4wybasm0sms6dkvn6g3ijv182wxmwsubyvl2khy0d1brmwt9z7tnsyxdq6nzsv4nbz868euh',
                fileSchema: 'bzunskrttsjq7grsti6fe8gmxhds6o6cm533bewy5tkgktnxk3n0wctq7dg3gg0tbpjbmeo8bxgmobj6mdy7vfjd11f7fdymyb5joridljcvngqzqeidem66aujbbcn1b9idcgbycnwlyafc9ioqu0cbf79sgd7pr8yz26d2tf4w2rd914xsjtc0nlt17xi81ffrv1gurgd65dfvye6xki89ms2y218b7dppd1mpyxh0j5c8ng4t5cdzm9kbra21brpf4o5rmoz1vqe10d6gh7zjzargvbuvxvojeaauvdofolwl8ktjvrhmnpsva3wqtt2nh0r82vrhwqzeqxg34na81uplh1t7br410pmu0ub6z9tphg916jtvmpabnnpf30kfrfw552xoit6ikng84y3cg96w8cujykojyxe9fn13x682fio3hbe7sth966yh01vxzznvrtzxlwe6z57rldkpyuue16ymjiyo4rkjnu62a1l6ue2b0csx1rj9o4wrbhwtnliym38s1q0g8m4az88fuwcirqm6d0gblq6tu24b664i17v23q306umeb6qvyo03q2bu2myw1jote6z2xtzcak67xadz5u68b1fuecfm3atvmnfvzbmtkvby499ndj71ab7nyuk9hb0e7qaz6h803i3tfsvlfzw19u8wsdv9heom9nxjodatasg8ggpybcj3hqgg30lf7ebc0het534qu5upxxua2680n21ya7okv4hyiknpb6krc1nc0ncyup1oeeqg0bkgltr93kgw10jeh9poft34ns9dwyhq62n3m6uemmw7ri0vv08o52btki61v4pt3yu4dlql8yq3o135mvpx0jda44twn38eqmjdykliex6di971s9aumbnazs5px83b86nu18zvvz1cw9f71oe76tggcvgcjao26aqbcmo43pkuahalkm4ayaj6o0k8pt0rm30nsyjia71vojyde1pk88vu0oiqhdtywu0tcow4k4x5frzu1bgd1vfs',
                proxyHost: 'mkzx2mpkstb0b1v0m8nf3vea6502qz7bp6vje3zg9od7muy509hthusctcup',
                proxyPort: 4915678087,
                destination: 'lidrnpjctgj81hwvz70qw7ayh6tcz91bdoitj98ua1qi1zr8yg09h7ea4ic0rvkbrgynqzju70fmo0cxzt9i309v53gufmt0bcc5nu6mjxw40n3aaau3ehk8jme97s2e6smqhdplg7xrbruv4li8gozf0yfm67p1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '268tam458pp7kp9xekrkallpk44o7einttnygtoh6zbv60lgcn0e7y88aw08iirzru2j1sc7x6w8uy8ys3tthkry5khhut9kocg4j0klw5qzi7z41ou6n81cysllgklgias1v3djzqeud84aazi8ce02nb7uq8wi',
                responsibleUserAccountName: 'msizko3cjz7seod64z4g',
                lastChangeUserAccount: 'iaax0ncjnh5y2gps9vo6',
                lastChangedAt: '2020-07-16 09:40:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'hdgiakg7csmahju7z4hrz74cp8h31iwl6whjr3i0qfgrgjeywumjtf8us4x4x2offdp0ja11y7les3p2tslywo6xdrtuscvzgj6s4jlb2x3s22qnvuku36k11d5z8vk4y98hmlf51fba2cwatc3klcd08o3895x1',
                component: '42nfli8gsfx3t64xj9wuyl3olqnxzkqxwr0uw0qiiy906m3b4zhjjlp28s3e5y7ei84ef91kl4dya19zabd2x05t0uonjlhk4ri3174mi364sbcqwthnk13y9108pu4d5cgse18jxhare05cldzvt0cpkycmcg21',
                name: '96hj8qmpe8lpfyrlvzn8vdom330f8v84pwbk0v401bt2fdgzcckjh9goxh00uflhsfdpg3ya7y9q8ns6wzo60asnwn88ryu6o6cgh1cga11ei563xgpih16aaiswax5yqz18ba7bqna1d4w96kgu34eax8lidid9',
                flowParty: 'vab994r3nyqr1ol9d1q4pdi14px62qfgfb8ybkm21copzk81dr1w62x3i7b1bead6wut3u81i36wt5shui58vpshi5ocu41penwj0nulbs9302gdroc2qjrsq3ohvxdh8e191i7dqt9i97tjfdab0flfm0h2x57i',
                flowComponent: 'on0tfk6tlc9aiz21o7i11iyeue8fb63tzcns86lgc18qwxrkcl2pqxcpgjeb7hv3gzqbw2n5rgqfhvuy1oimaexvse33p6uqid2hl4eozrh1g6utbbk8a3qvmifdm9epluqn8xqvmbncjxownqecijip3clqfn33',
                flowInterfaceName: 's8a2roy8et4s3nyba91axgdo572adjcl83exeweqrgjev3kmjueqpepbop1cve97ew8twu1z07kuzkhf7dnglsemr02l9vmnyuwal8si6u5ri2guwpojz6p23gs9lnay06haii7v52jzzu5pq1f4ke5acp8pnu7y',
                flowInterfaceNamespace: 'qo7f4oktvvbz58iz154n3hevh4mnse3tanh23ag3nzzp38ctb7qvlxcijd8rt3vgqseghjtsgbkdamjto3yw9m6pb87t3y8n6hv6pckxqk8ibbiky1bg5ry8yqxy1r3z5snkmjxrmuwpvcgi04xm8ehmnivvxltb',
                adapterType: '1vgk5099dyz4m098woitizfz6y38dx5y54ghfo6lqd4gcwu32fecnsoe1fvy',
                direction: 'SENDER',
                transportProtocol: 'ycw5vua6zzjwromo9be2cr3xf6cbyr7riry4ycbggt0mqabsjw81kd8n0wfd',
                messageProtocol: 'pxo0s4ofmtiom29cy06d0tv4hc99457fqzgyygumfo5s639zaq8buiq205l7',
                adapterEngineName: 'kctgtsx61zsptik0hduw75wdj66ws8570llrwosfjljfr7bfi2jxpl0m2f04hh1hqtk7nzgs8m1iab0b7w1r5de480n7jfy1i4zer32i8c9nqr7cgbcwg06gz8uo13sbayta5mxj24wglmf5clkfjewx655q31or',
                url: 'q4e3blf62zsq81jsjf8w87w1xgd1trjy5ifi4k0wpqdud0p1rjw0rv1cx34nnfzdm49fqmkdpuz0zqm9865954xmo68y11roolgttg90rd52hsvrah261z2qfrvsfk1ibup7e4lwn341ucndy1dunvdxdu451jmqvz1y8bh2fajc43wwhr0zglj9f19oh98goti0ztbbqg535e76v1ajo9znsws3szb34cpiqc7smh0n9xvjde93lnojcqv8n1bmno7tk6lbkg6ble2h1v74co65iqnzp1yjniejb1d28u54mk9rme4ymmqcphmicfcfx',
                username: 'non6ql1rikvf628pg0wu8pxzkjo1nizdvmndh84lc3mfzrok0pzu83c7nv6y',
                remoteHost: 'uh5gmqcu2lzeq02e3taaj0plutndnu64t9g990jq4n06r4ob9qxa58bmygo24tc01sub1xmyftrm9hyl7qebjrk0p839s9rs5iuvqvop0ijorqnev4zlkl2r5u0x3vlvf085ncqmvd89txi2zdnauhx32uo7re74',
                remotePort: 2227336021,
                directory: 'f9st0rqfyswyt05ggaxlaa1x9ns7t40p02qloliauo7ncpie6awvgddd51i1lcir95o70gys5quhqbo62ta26zmtc56omvyrzc4m4hp9o0ucrv8fsbhbf5pbh9vg9mhuoj5vs1kdikar3ub6rph851gsnblbh57bq5tjen21ucaf1y9z63ym79yypbut8fqkr2b2ma5zyd3k22vm44ajnfpr7s9hoqaj4zlodel2x0d86ubwe1o7kg5b3g81eepz5q53bfda9gbxl8501fan2i5vdh7mfr0smfjb10vyhw8h7y6eda49hb8hichv70tdmgx5h9ygzq7ly1zfelsn74ty3lqnihatfu796lyatk9ahe3g8y5hq66kmt3erfnqcdak1qbvfcysj1q0lqobqjoos9ou74p4qqhnj267zm5ysbnj50556g4dn1zeosrep49j91c1idur6ggk75983a9yy0val2n3fvswnp7m2m74rnzh7pohi2ngur1uziy0h7kwczrt80lkyl5u47pw88w6h1sz5r3yexud9supxfo5xih4cdhoescjzx9ojc5zuxsp38j2kygxps5xlp163inb8al9o0ahsl685i950t3u7rw4o66dt1iqumk6d2g918dhpk3nqof22o4cpykmu5bjal6vf0wgm8k8x1qhoo73tccidzn3890l9f0ixeb3jjt0jega2btpiw4w88cmk9akw40rna45tmpi28jqvx63xbobt1rztt9jszuuacxw57o28kglh93drhqsjalwgmnl8goh4qbfevpautczhsrt6erfv1v25m8v47fri2xh506g8p3rk2705jxejln2lg20kboacylgq3mtmq1a7iat4gjp1flnkqvw9k8z195xmobovzjmvqzif69rnj5azlixwul5km4s99duozkg4e93f5p2lq9pxricygm8l5vzct2yeuud8ybwb8g84v1wersrzh7hrwo2a4o9bjp3znda0432ryffels0m9wv80ff',
                fileSchema: 'dddcaov44pb747rn02znk62s3ty9og91756d9wxgt3ybq2uw1jl7d342l0jw1ev37666sornepxzb8ohk06pqsmxvokv6muzc36l6w7mmu4zqxpn34x2uqlmtx1tep22b44i1wus14num9f6l7xcuofp282bgrdd7362278k95ukp1umxr9pfxwjyzgdthdscchlkmx4quf1beo5nwec5c2j8fpvkkd9aupyu1g0wuq7xhy9zse0ck9p81g0swuapz4ymurkjlxqsfm8wncavxpn7x67rtmmr9uqk45paisqmwlxs60z2ajowyx0die50usxnv1evd39lmi4szxfxr064pdf389snegwdlgq2ukho50z4ifo6gapsj4vjxxizjcnvngczghwk06e2se64jc0oc691v6bf7f56sz7xikxkj6qzauikoe8ztpiabfpkew22x65fh8bchwkp2rjcurshmmlgu8motvd0ku4rs32ltl355f2pculac5s7mohtj2kbgkccy9ws71quonc6b4btdwtq1k7cnvr5n2c0khn81foeqrtlhubf3uz2nr4mmvj7u0r7n96o4nap3eywzst7eyw8wmmrr8si391aofh7s8rxppu0syhnar2k68bvz5a0eu6fs510kdug4pmy5x4bme0ju8mv8waltzjb42tzfs2kuguq2al498tt76srgghulvs2u2s03l51sdmavtu0cliha6de1jy953tzsbiesercruonrsmx8ige9gaiagfoh4o8olzfwq1ccocexzbcjylb8bzyn2f9fyyee2bb2klz2289a4l0smulxl9ts6dcqcfe9ct64h172kweo19rgss5bfopb3fybei6dlrqjwimb2jrvbkthphk1hfsvbgvq6l04u15fhfc91ozuolipv8qke9dmmo89v08jkr8hkjocflreirrwwfor8ht1l0unzmwale2qkppu64v0c7nxdxcg2ghiy9k7px3x7urvlv0to0qik27d052552',
                proxyHost: 'exo5btvld22mwwgetz4lrn1wj1ilpq0hun3pg6mu70gn78a7tk1k89u060e3',
                proxyPort: 4404430623,
                destination: 'cqszixpplq5ofbm1nmslhfj9xh1evm6j111h2d0fzbzhtazeklnlomcffk3h5yv22zlmefqg06r0qx3alq7rev72ewwrggm9xcpur1v3idvyabw5jay999d8biy093du9pj2gkqxi28w3cik16fjluaqtsrp23nu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tzcffesp3lpv0ahjxw0j2m6auvqgfaooji11uydafcnbf9z4m1zctdrtv1eqtnyl4egc8r2zhwhfkp756yrgqgls6mbefi5d4ows00qutl21tvoziv66gszlpez53jb7lf9r9sq6q28xzuipgxak7c9dosmllv64',
                responsibleUserAccountName: 'xhad9t0weephsptxtyy4',
                lastChangeUserAccount: 'orgawex4o0m6bm34cw93',
                lastChangedAt: '2020-07-16 14:31:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '82zdrvu9ut1vl3oi61tpb3sd8plpr6h8b6ezny0g7dhgs0xz0tjjc0y246wzbbx1fkhmhsjo1rw0t548z8vjdy0p83g2t0i1m34b5hsa8m0yno0s2qkerir4oxbud8ja9pbiuhcx6xo89iz9ajktmcekzedc9o4i',
                component: 'mestxic5r7bddxmptmiuqofmmcoweikc98h6cw0foraa7fq8z5ztfi9l0w1r0eogzoxs4j5mw9tsrane4vafip5pb5td4ts91nmwwmc05q0e3aw09z1cfja0s9hyieu8ygug5sba616dv6x4i5052lz9cnudgwvc',
                name: 'rbsxj4b0arjeyytp47e1srna43bbmrbtuf69f4j6qj2u8bcp7vied9hu4cejyrrk0igetdhy28x89185zke7pkxtrnov95yzu1nx68wg06adzz1mc7hgxxrr45qc3bp3liby9citcsn6kpl5l47xly6fevv9gowr',
                flowParty: 'z2r3zyyyc2cany1twfx8m4jqq5zox5li9rp9dmssscxhi11t63hyc7uqx6dr1ayy5sdyw905d5iei21ehce1nhz9t8c4vzczrcb8sbgityenq81qv63txtq7dr4bvssq46zfwoug0c955wmskoguxpuc101zx2ba',
                flowComponent: 'zflmwtn8cd7aaa0n8pudi4xu4otxqyx3thkn3sx2wa6mbhn5enj9mrz10lzjostf19j2q7a6qvkvedbc263wjca6zzl91ftnhf0gmy6l3jlmi0eotj9zkh8r7lm6lowhlgg0ly217bkfuqzga4nygdg4pg2ox3on',
                flowInterfaceName: 'r84no8z5jk6qjds8rog3h4i09cfmocnyswxfucht06a2jfiyxzn3uzphxrze8hhc8im6pvukj60ua9qol2jiljirzfrs69a5ndhvywi4pox7gmtxwh1thayo545tljqvwnzmt5eg4t5dvlz4psqynrlbfnzahn3i',
                flowInterfaceNamespace: 'cqudcwx2ewwazp27ccqan59qob5gkwf487fg6eusckjjsaslax0rz4q0ykiy7hmfcfnsbf2sv3gxfj1werdxg3snecho1dchm07tnj292ju5ftdaqljwgespckogu7devab7enn30d1gluwmry9mptq0k10m9fc0',
                adapterType: 'vtemyrdwt7e45xkf7mexapn1tuyt7lygo0jaejfmv9bzijr201ym7pfutcj2',
                direction: 'SENDER',
                transportProtocol: '1j103qi2z155tyt5zxiw3vr8co4qbft0mu84tghgv991up1212x612esc39z',
                messageProtocol: 'n87z4g3kda9ac9qpatmeva34mkcciqacb08gn3abg23ds09igfbpygtkifzi',
                adapterEngineName: 'jox00l9grk94z8f6hbelcpi82s96pnskyj328d08d17esopra4smcq9wsosux15t5a9frcpyu0z8n8tb6kon3tz6lzmw5v5z6ep5agdmqbz9z2oskupnbtzjtn394u4so1hn9zndmjsl4rwopo3e8b06xpj7cqbd',
                url: 'xhj126gcgupactt7g9urmok9stbixhf4zlc4x1yqge92rynf804rvydevrjqzs7tydgbh01tvuftqa67tmp8kbboajfpou6cv5gef1jjdu4keuaux4rn74kc1ywayhsq60gj4uayplo1fu3q8glvpr5aipihzfafv076tmtr85n4makg96dv33b9yb5dtzp2z5pmzj32ydlitxa7tbq68a6grgnjqpr957hcqnfmeqz1pbv90pra1eof2r4p2ew8ea48emuurh8ifdlarr21t5x0yjjlw6j35zldew7zuastoph4ocenjq5hek3wfy9k',
                username: '9rhpa00tsc9lwn1czvw5dlqktweknw6fw79pm0gy8bc16of0vqr5clrbg0lwq',
                remoteHost: 'frzbh8ht635uggxnxakz0v89vsbnqoibr0pajvbqdu9c47sjg7p1g64ryintk2wilr21anl8wf6fmq3jiwukozjgg76quunptoi7k9vi9spkw0ee1dx71s0u3k1onv96c6bw3a93r6w0zau0iofm5baabuxiv2xs',
                remotePort: 5664438034,
                directory: '1ljnwnk6py5qbq9ej0to28e18tkmeiinr16hhjrrpf3zipcczvxhhm7f31snzo3i2cq9nuegb7igqqny4dntm6237euymwwyzipguvudzmmhxlv8nftvzqqdx9u56j2g5zuinaunv3mvxvef1bd92jbx27e8wo949h2zxqco4l81djtw5vrbe849zpgcixw4xd32i120jzmaihigh8x1dlr4bacma4ic3epmjiu31f6ucw4vgdm5ze8b6ccelut98790gu3rgwy5fin7678pzpbmz6hzz83r2zj7m4c3ejopedtmhoke7eegmags412g7rpommuhb0z9ovy6lk5aa2x98jkgvltszeapmlhv4c7nh9bbjge0zk1iln81pk84c3cqw7og9esh2omi1wur40s0zqhj34e1lof2auwhxwmt54rsnua27u3n5dwt46w86zkgfo6k94zlpv8214s55ec3avmnw9r175dsxzkt30nhwshhvdquvlq4fz402oaf7gdmzwanwr9azqemu35rqtnehw6z9tbo186k7wpytcm1w15flxt2lpiborswz0t8ipa3cg8rwdhgullsh0pciu8pfknpmzbltiqeux7xh6yx7iwew2a84sem43p5ajxrn8v2lgdnrejgsc9u0osi1oiji5isl194j3sped0syhn8bngzbjipob9u4uz9h2ohwjdqjw40gw4cfn32odaxvz3pz0hxqhdaz2iiiohjqpougmlc65zyiq0rgm0kiv3iql49dh9uevgflzakudffl55wbvrrvhjplwcmftkddq7v39ipjkbibhuix1d2iiholqa8zjfeht1exxo2njvy6y7pkfc7kxuzuiwm0hckumde7adx7blyjh4h2vjypu8sb6vi1um8fqh86l5rmv70s90z84cb13b59lax7331kbmfhelvnw3qic69ohhsy059mctmhfxr0h0nzf7w4l49s9boaq68ifnn53q2a165sz3tenur0o4dgax8lannnpoi',
                fileSchema: 's39yz685s0fcdzf0kcb6so2mdo9s4ws97y75fpwpx5d9zz2bjgxwm6jbpyvkansxo27on1k22w6jtgrajo7nrt619m3zk7m328iona8u9gm2s7m1gdwchrivqtjiqccrtpsb5z1hlpbxfn69ouzqsprat4jl0y12ix39l39cjtvypmbj93n6ye1zhimilgar4rqlmcxvyrhxhskgeyrudd110jh8f1qjja15d1zfcfra26ijfmspnr2txb6z6g9x1hew3x8ci1yml68qn1oj7su4v8a112xixvgdn3jpyi2gg3jgaala1g42ynm9x9djv2ufcqw1tsiqaf7yzk8xdt6v4mn18oyak02vxf88ebu2qkadf59i2dmtvyrxmipwkhan67wudsblesuv6i7nx948reae8y7ctppgksmt7pcxaxti7e78mu3rqcjqq8ntbf8bnjj9bfdf2pqicer6a9a1k8rbxd1543pydo5724eduv3r9nnyzqf0c9bgvs5bamtw7edd1ppk4yvqrod9grxxj9gln6sn1mskhukeklatfygul9lw2svw2v4r9t8541lpfgxmvqpn4u2mov8qu58zmyfr0c4ye4ruu17o74n1f1zgdl0zcnzp7m8zvivl6fzx1g1xjhqfcva6qr7b79uupj5bp6cbm1f4tf0b2nz1ja2lyyt69vdww0azux5id4qn0u2kwrpriimc9t3vc411tbzjnr6k6ok7jorol891s353n2wxclortnexck7ex1yehgmziisrscp4rgt6c3bzb41g6c9oqtf9oczswn9ttu99qm7twzfmx6gbk94nq8hjo2xv28a4upj84akusy4kx66xk76re5fmtltnqf0rmeskznjncjx2e43a3ijcwk09wj31jre375uxifqjw4zztfsi1a1ovpovaunrclkqk2srxcn7e180odb6j1sy85y0aqx06n9j73uns7mwcaap6t65l2oqo2ihmugo80i7f50jn3b4scbg94v5wvet',
                proxyHost: 't5aykaswbuzbidtxhz0ffbhe1e2821khyny9i9upy4gl1nycdjiatsxputj6',
                proxyPort: 8090763426,
                destination: '7v3wdefzkx2bq4cpg2ybereinbnlezztmd298x7i73040vh62ctm25umu7lko9owu8iq9r2ymb0btg30y4n6529apvi16ubixr102il4es8monhb5o7il6lmtn294osxc9jd94iltz9dh6hzv4florvc451y06ah',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hg8t868cz3pbyoe3b70jszjzkzy1yyp0zw4a8pzroarbkxzpfuqtbx01049vmw3nxbr5nv1wh3wjd6zll38rbjrb55by5axbdo0ltvpf3k69gb8qd7umqke2ab5juhkaruelhzz03xute6j55pp1xudq45jjsfrh',
                responsibleUserAccountName: 'ctkvhczslps099eig9l2',
                lastChangeUserAccount: 'xvzgrrqanpimpgaf1ai2',
                lastChangedAt: '2020-07-16 08:46:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'aev8ymwevhwtqaufzjgqslfm0h4ciz9xfv9a4o246q4mliztlycjm1f0uboyr5owdb1sow0503a9uc6o8k7gmwloyhuq72axm9t57ckpg8dyz71dk69zfksdvqxew9d8h2d7zcnhhe430enwt7s0m0kb9u7p0u1a',
                component: '30qa5pn63rwe9crv2mip2nrz3ntu05xkwqi74yrmjh8kcvvyq4oql56ag68txkfkt3jeccum0cqbpj1t3u5qbphagejgz8f67wbk9lcfak8qijycwtwmlqltjg5rd37f4qjv81u90wjo3dggpsnjuyp97dz8kpu6',
                name: '73imkpqpii618w02np7e5xjpyi2gc2o3d2wzzdd2esbobp82hctlwzg7nb06ku02c2voi7666nxnr1eenc4xztn3ai2154tknelt6o3g7joh662kth8th89kvd2kido48lcoreh470g2nrxxbmwytyjholramw61',
                flowParty: '9qqfialfsju3dnxyrovtmpace5dm6taqyulmmwkvbxugb806ta7d0rvsgaogjqh468yvqykuzddha8qpaz6y5i9mbm7oa9z0ml5bza8h3606grh2hw01ojij2neg9wc4pg43n9yfvaoeb4qhyznbn0tuywobvzru',
                flowComponent: 'bfru7bzckyudhzbublelz7z2hqmj7oa7jz15m5pj253rih28izsd9drd3g6zx6etmiyfju72tguugxqtdv6djgmihnmingcab4dedxgmfrvt2bz1a3bxmyqrgcqbxgajj2h5ya4aktkcxfjgbh023bbq9b496tyj',
                flowInterfaceName: 'mtxmawi8oj3yd76rtc0iqb80m13pgj1bn8vq8me46kwdlyqcmsq07qg6wehia6dbjghsgzf61ajz6322dk5v7test7w8u68kr8h6we1oawwnjzmej6qbl4m31wfhqhwr1hyzaqaqi5njmzgypw3yfhzj9w9g4uj8',
                flowInterfaceNamespace: 'rrhco5h1jfhvmpxlr9z7ofgho9mbf52hbstwao7eiltpakefyzbwkuh8pime0c7r2nfpyg1fnvdgmf4paytv1c6t4kr9kgoiv5smjdzkj7lu9i408eb4pr5wecysohto6e8plobsixkuro7ynuvy8phg4tzpc6c0',
                adapterType: '4yfgn9zfd8x4qvr9mgzfi0raxl2ujmsixnf44wub0pvwjcp4qhuvb8locaru',
                direction: 'SENDER',
                transportProtocol: 'qdpx1wbu5f134766zswbdw9wngq6txjp7uiopgfyl73gmvzjkzbsdh5f0x2o',
                messageProtocol: 'vqtvgebpi0oqasqo2qvb11ehrs0xtblym5ktiyqxw1jhgqgccjirm3dr2x0h',
                adapterEngineName: 'fv0bhwsqzz3gb7nuv8o8vl4wzs6je884f3rdkzs8oibeedzro8uso15wjwijc6unqu9ti8u6bmdqnlhu1tqctwb0sebd2pxfgjjtul02em86e2fzapli2xgkzsqmyuznkjttmws1ehcf4crt539lzw847omyddjs',
                url: 't3ejemjj78v8s32b33k5mjspm770e8zt95dgzt9tx2w93hine4h8n5olev524ny4sh336yj20eay80uyozqyo4t77cplt381ngwiji5zkqtyoaqxaxz2m37onvwsjmuit2cf1srqdtxkeg8s5q4lvaqw78yslugbmdriuhgbtuf3eqccmkaeasx8fqefz4q6u4s8zdh70y69yzt337vqysxiiuhya2d631a2senqm5szszokaupqymoylj2ee09xw0naikab85u2p5ksx2jv1gvks27zwqku8bc8zgut2xet9joo3pd4ithbzrfjjns6',
                username: 'x8rv8fnwbtrwp5fo57r2yuqaysjd55nip36vg34pryhhxh9k3h9eof4fnm64',
                remoteHost: 'n1keuql00jky28hvhopnfhwer64j4hcl8j7yjlekm7cmglup0h9xfe5rhhlp5pnrvj6l28tsf1xfq1v7ib0at1s7zjfvciv8ovhr0ujmyfiodhoo3qtxojbyniqv87bv3iby4n5yad3p3jv7mn9eqs4gbasu91n48',
                remotePort: 1706168971,
                directory: 'yx1r5kbafvd11nnh9pos5zd1qszcfqsbn2ld5t5v0nxjh5e4098qy6goxlgbhb7ketjte49nxj84lh5bj5di9tv9jx5cz6gm67dgd29wele0c1vupwwa0m5isedundzwnjjf2bq6f4ddsyvbwyb4qa4o07gyowj53xoj878p0bwxa2xnhe7i6cd3lht8mdvtp8lb4pukp1rzluh8g7fzymq9rmiilpsv0lmfdjimkm88vcqjy0yddes8zikgn9j5k79b1ad4nv8t4fs1ntmunqhfqkobumrki35yx9xei49n4znv3zt7y9evl7xy13x64ydz3r6r4hulr7qj1louqou88cnjg9107xu4vyk7unl1lzb0p1gvc70n2nt9cqulcspzugqkqqf6tt7nvsbtn4kz36u73xrkmfniqhkjtjf832np60e8kmu31dusfa7nlkmcluxoyc6qowa7hx5ern0sblpfs1e00hl1nsbgu40kxwx1ub9ovxsjv37d3bjzajfimg3sxm2p82xi4bgm4yai2aolkvi5nxh4l6h1pg4em190cwcslhdm3goz9qe2ji3zox75kp8toidnnk70yxyn0l0buc24us5kbne90fiusinekiubw865run34vvfdro5sgvrg64vvuq1oqs0brc1jujrnkbasriuylszdman5mr0nlx1ywc9ln0h1zzx3znkrvob2w7asnb5prlyh0lorm037hxruf4dzda60elzh9b21eugns2yijj1lsr0yqi66cl1oabxzt97ba71kjdvabvm64j2mwg02hwn67c2g3taqu7c9e34up3mm2itduxn7wy2pk9kj3jzbmhoiak21wjpx6a4mpyrltrq8vf631qd82c0uaqtuzikdh2xgy91w6bjdy3q539132ydx37b5c67gr16qzypw8f7ubzw87ntj6wy1yxem0b68jcrin4h2j3z098j9tzg6ql576kxfs5byedi324gqw3xzgs9jmhagd6fp41pvyuriqy4',
                fileSchema: 'h2alejqnaghzoeh3udo6wgnyz5a3nllkmj2p1nfiy512tkpkijp0mz9azyqbwya60cdfdddz0ckc3oym3mpqa37m6qhl58hqgs3gwhbdo75rv1ftfd6gn1dvvoz0crgup5gk6jkbe9dtgs42vakrbrf28zg3m6hdh01ivbs6qygvfat86uv3pvn47t121uoyg3madld6ho4id2bvp4r1yaxey667yth9wqss9vpfrnpjuut7gfgvm617nlarox3gkhwwer657qszc3r8x00t51n7orf1f5wiao6760ft3kyss0b48x38eyudofiw84k16ozjy5g7p1qhix2it4htc8aosojv7mv5j2e55p1hdzs972x64owhn7nzubpd1s10f1pfb80jelpyifh4jjoyi8e1nhkdkt9fkhg7whfd6r4g0vnheadfj1f3jopnkjjf7vpvgpo6tytuad331rec6v4ytumv5b2dkrsi6mak8y9jvcsbckeudx3w6s3m6twnd4ja8tzvn2l6lzpovuiqz4xevj0dhefc4j9t85s870cx1frw0b8pyxracyz7ay0qt2wbiynbcfob518jllk6ns3j18r62pjwl7qbno3frwmxjkujbb46kz5ehvk8djv4bwhvvbja6hq4mnnssvd2zmcvic9yuakzxnzbxykw45lf036a9j1fzovqbomyxvbllelezya6ft39htt1h8esm7zzwi93ggfvyh8udemip1lcahk07kkky7xtssokidmacjaef2lpcurd13c9pb1yfihygmch3627t6lt10a07kkivol5n05mq0suowdpyfbuxbzjumwzh32ohsssbm6vi2pn92l1ehxe0ne8a1u6h1ib415c48dtjfiwjcjft5ojoadjrt9ubngbtpfjxqnrj1f2n5o4ou1n5ndmz7jdk9dlvb5ru3z7joz8ty7a30r6ng5hpm5bmw3m5vb9yn1whwgukd9bu176jkxydkt2piqn8j46f9naq9hi7azz4syb',
                proxyHost: 'fjs9zuo6id5crt9v4toiy44g8vi40bvqlrkyfer2rqluwwyfzhih8yj128fx',
                proxyPort: 7010467696,
                destination: 'xagivxxboh8gl4g95ixu9c9wtim1ixzf9znhxwuaaqsxkbo0bnmi2uscdgd8kvn87bor5kpow4v1z52dmekhmds7ztbawyfq0mb8unzbhthejdztp5u16qacnjzkaj4otji1z02bs8s6lu310upbtagaiofh60cr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3zilnjxg0fv4dyozthxuengfw3002k41l223zqf0t7o997efbr5aiaeqfw7kwcwhl80drtbgpuhmt5svtf2nvxq6dfjvitf6iifkia80jau3ix756wnnxskuzf757sm6nk00y9nxnxydjzwl7ny8zsv5vgv06uiw',
                responsibleUserAccountName: 'meawamwpf70rk4lvecas',
                lastChangeUserAccount: 'fko1z586403wgl552heh',
                lastChangedAt: '2020-07-16 07:42:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'nvp9zzdbpvqld198qqp8axjwrmgfbgvdprvv4ey9lrn2lvs47gdgslt9x6iggxios1e2jylcnv29fvv5169rplg1vpnywi42zod0x47nfxrenebajop224fq0yj8tt1uejonuhzw7ef9udxjjg3czrkikgkcmcm3',
                component: 'rmmtev89rqb6ddlyb66gydfpjk5ujmiz8evg9qo84vq0ujt77erf0d0d2mchb74ihe0rg24hctj4510mxl1i7xx3qti9sdfyrfadkqd5262g1xxf4rq93kd96ysuao9tbi4oko1wgn7a8qhfxwykopg8st9q5j2d',
                name: 'jav0ag0r4pe84znwh9vbchgfj04kpn7jp6px9azjc7jskthw2lx21w3a8mhypvxh0l8q1tanxwmsxy1j5dvi3khu03gy7w7fv9123xao6x625klpi671gc2ijvqfuk1a854j32pfu0845e9bstsahlsx96zpnk9k',
                flowParty: 'nerrclkm17vyqpier3g0dxk40po5gwopee563xr3z2cuztqoso0xbbufq60w4ek7xqqjyrv1r129l9iq7tzedgf17sto33d95bjmkt89unonaiu46zt6r711l5ola5338ui71yp8j0h3c1pyiy407abv3lbpw8rj',
                flowComponent: 'zysgy4vk0rcajcn3ie3z4utll8zdxui2d5jmzehq3jgbsutkvotfl19wjh1wzkecy8ccds1ofinc60wga1v3r4jnpc0b2il1zd3p7kzjgkzi2blo9kdhrp55g58vl46xbojtu795s61zvzzk58y48o3cyl6k2q7v',
                flowInterfaceName: 'addwgipdh4iiengm0gz3zkyp4jaagj3gwhc4hqp21qjyl57iaqfiifo69q13scoat2nkjnvifrsqyipguplwj1acm8vmd4o3tzxq5be3ytxxvrkmsdcf8zbjnr77j8ukfm7qi4yj5vq4hp56it6m089y49f5sd6s',
                flowInterfaceNamespace: 'bxo4ybe5rd93fcjz6tim96lhsa5an9m5560tb5ejdpvlg1e32gj6gawwai5vxvobf2f3l35peigljq300u35oeemgotubr0wtsi5qtdxfigkcf089zd2gvpl592jrkjt289l90ojggsvbu3p7brep2tu1ax46zwd',
                adapterType: 'oclr13goszkkh8i1u7pxkn29vt8lyzaxcbtan97enxj07o5m609b5qrwz3ui',
                direction: 'SENDER',
                transportProtocol: 'imwarioxz3yynt9mtzjnwc9v7s35zs634g41i9m3xwvo9afz7ngtqnkmn0zj',
                messageProtocol: 'z2pu9eepip4uydzrwq95gcxbb5s0znnl3rnplzg0noqvx63foyz5s7u7dogf',
                adapterEngineName: 's0cf7v0kpxpi9j4jij6b01chwz7j705hveet60kf4qnneqrvgeglv659n39w4rx6l8gw25abwai6c8iuurhrubluwsv7u6gctidbc7b6wqte9ye9vsuqp0cidl6nn043trlfams0uyfw69yzuhojz86dpjxa5r6h',
                url: 'wxuqdsswsprj1143ot3lr0cuz9oew0bde1bf8h7o9r72s7hf4vvhut8vvahw1z919ph44j3tns8cn6yd3c6igb08doek9xeiw4svdaireux8yu3kiphsyjpwavkbwgxez7twoujx4t8txben621wj48r4mxew346l8ynmx4pvtty8lhzidf7ajle1sieiev49wy0dew8su9ktxa4es1al057prxbd31fzkrg76y5g38cyxb72cnejq44ul8d5213mra9gj21vz4t3txbg6k4676o656avknceaikryqu5nq116jho46slylzq5hhqnbg',
                username: 'ojg84kct3nst6lzmnbgxkoz6fsweweqb1ofjkkuakdiwh04zye92mcl9tuka',
                remoteHost: 'nreve0obmow40ypp2145afz6kbddui7h222qy5gdtg6q2kwcl64ozwpjegcktj7asykqg9i9mldrdsgvz078plw8po429v5e15kjjhisq3o777ls5just7mdihxx0kglv68x9859o6xwp0wi5ivvad3pmadi4d6r',
                remotePort: 81608072640,
                directory: 'o6t1oeseee2w75btf4cx3rchmaeamy4geqr4316dkw6yvavi1k10p9n6ptap9q64oybwsij3dzxttrtixogbg0lfvpotd6xevmmtt30b6ta3i1hp55adfgz3se7sf3xdp6184r3j6rctgsef0xvyvrte93lu9snjpxn7cskpjy7v2yb57bvpv09jned3f0e3616q33eq3tvsyc9uo0bggcjv20ccyu4yzlsxi4cqefmqu6c5prjnrzvr3e08ezwv6t4uk6aojmeptqa8xffl0w73zcgczxnvz9u1gs4cjpi6h5c84d08la1nd6s42pgtx37sgkknokw5oehjoz80sk5p8e3o68dmnc1pbdlvkpz3zmd667od8jppz9b9nysnj4qxc2r3zvs2fk5g8r81djnrriehl6u090iuanqput9kk391w5r6z3c1nw4txuiboj201gxo03gfex71spxtlmca26bkkz0p2hsilqnrbjqx7gj94las87b98wgn4y956eqj4zg8l5rtuwzhu8qhd2tj2kqt7tez2stjhhncpzr8hmm4nuumc9zxokwgnqpgs1ogosq1s4s1p15gj4g5busc97gk1xowpov0flfh7ojs0gaqpz7wsj6k5c2kh9bxommzm7b52hjvdz3i2g8c59nqk0bbrhiljg67q321phskbj2fus0g3n6tcvlrbw0zq4a0rhw5kwy928165w3xoh0ehu00cf6xv6nt3un2gbzmnzeq71i2wv4d1k6yl8s6z23qokum1dnaw9tz28yku5e067dg0go0u34usr58ojjtcs9vxrixp7o9vw3v8lao4yrah5v56zzonrv3zcgd51ihv9czhc75xpwcnjlnc6sfyfrdygdzl9yzfwnj44pg7bxgntu1t8zny70agpsjq4vgoajskv8nsjswhy9ruumjqyxrd41o9ezxdq6nyameb83dl3x7g7q82kpq70wzwfv3g30m7yx086z0ahior6ggx9gfdx2m6tjzch1z7bds',
                fileSchema: 'vzyjl083pr2tj3tal36o62p62zxo2b0qg8w0indt9vmuc1ixga7ponyswbjgwr8r8978vlf5t963pgj6cikwxu7x78u6c0zpmoscc7uirf4n4wii5gk8xrecm5ter49n566vnl55ps2p53sf48okst5mstafevdoi5gwi587mxhf0vwdw88n25eibgxazqqr8d0cjrx4lefeumto3rxnbpiamwjjcrg8621edz5cnv2q7f3vgenanth0haxl3zdxeurhjaiynt3apm2ct859buuyo8owzec5zy11vgqpf5ho4zuabo5zjoe1d212l59lrkz2iokw4wvocmizb9tthh1pwxzfflvpcel7fm1pe88ghhdghr66brsihim344cn1vfj2uvhwqs1ldmk69mteukpvxuc97hyljibwbcm7lk22uhl7v4li9gnbt7d0o2jsyc43t0lan70kgbwh9a4s66hwgfpazzmpkctxlujygkdmdpojyzyxokltpmxhyfut55nyzi3jt3162abxj5zuzzao973vepqlcjapa9wv77438zsnp55ypoholw5hw8xx9t7jhazremzorl1kee7h8317c9ub7zrav52fpgx42kvngvpyqgunr929f4l4bqf2fwt9qvdx674fpapn4y11uu75brs4aj3jg55aisrrt02voesvonf1adt9ktxkdfxar2kyfyxmnn5n482gv6st5xj1kkcy6m23ogd0iaj8207rv6zu5528zlhz0e2smycmeze39xxw6lfac24hbijiggo9r2oxs4ac97pgp200074d27hum51fkp2iqnnr0nptud771e1t6xinxs1ukly4c4ayvgshf7u1dletm7jyb5qwrv2d3xh6hhhwe7p51zcd3xtygnkv05qbnfyoifnu5qn8sc0z5f0q7t4mplunakpu11fybtn0k9kzgxg3vqmxtp4ts4fab56b3535848bp9hvocmllcp7ey9qshkzsf2tauyb0rv5ds04hxnka7h',
                proxyHost: '26hu4lcg36vzd1i8rkod2wvamvcot8fv97df5mu93u8b3bejrzyakjlq9u2t',
                proxyPort: 5391762435,
                destination: 'rohhumh04aoymmhx9keh5vyvo5ybkexcmu1o8arx27kvv93lxq0ftuv4iqv3vg4iihax6r1vyjg5px6lmbaxqjq1oa93d32mm23oulmrd0u0hhlwch60ys3m3ip3pd0cgn5yop21y0t24a7b5lfdos4g08ipavzx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e4wf2kvle381k6rh1mfehn3d3zbi9tgx3x7oijtk65xx0c63xtzhx2isokk0n68s443if2onj86ef046ou8g44mpjro3en4kut37ar82eqqnu4mo1du31at0mkt328pj94jrtigd9vl0wodbkt7ay6dquhhknsfk',
                responsibleUserAccountName: 'xllhlbr47p0mhnz6sc9t',
                lastChangeUserAccount: 'motu56e96wklfsrcan4g',
                lastChangedAt: '2020-07-16 00:56:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '9xmnbm1l7gdtfjm83upsozigpje9y4tdxvb6zki7ukyykr4ijpqj21z0z90vws9hswgykzmvgn4nlsmj25u7u3rnhneqxyzavu0k5id4vc931idk5gzh4c0ehov0nr6hmrcd8a3n65r7f502zzicj7f3dhzd5zdl',
                component: '9vqootjjamlaa8d6sbllobhegfotqtcatmi1novx6i9qoi5owqra0el6fquwo27oqd91n4kx3yzql3bfiabl7u6qdif703yrl4413z9oym7muymr78uhvhgbmwh6v99acs7ug55nwg92g7mn0p694iujimcsp7og',
                name: 'r5jgxp5juv3z9fm4yw8ai0c4e8xwyul4pw18inoehv6eooeg10b819tx7fl9mp2dyfetnmuzn8vj53l6sfoibeoi05ayzgtupm1atv75jud6rzihgmyq8vdef4isq2vpdiambb5k6jztqg5cfedb591csar08f41',
                flowParty: '93pke4801bqzy6imyiirtvvz21qj8fz6el6qwixaosftwwas4383xt5dcaj2olz3wni63g3tthhpv6vn0pvm75s9dhk33gtszahkmfjvweq5kjtrsfiy2xijfnvfvwwd5izf6jkccc1gxfqv7b1d999utl4g28yl',
                flowComponent: 'xiulkg0gvbhj9p0ljlgasetlryxof647e31mrgkjnhhvtpixwam2u7h45az1lml2pkwzkjtty44y5o38t6a5cf1yknixfsoao5vrosw6wbdtjgc2wzykyz3paggs3nvs6nfnowlw78wcgxxw7aesnkanlw0u47hf',
                flowInterfaceName: 'o33xz5jkloe1ey83kz5bfkjlkeduhymvei4mwazbit46hjv8mapi2otncyzlcfinw3vffp8yxaq88v8ecz80w38ammuxehpx979kaigdxjh754vb8ncthzuk5x4m94w4517r0qz2f679mgyiwbd1tjn89duuozk5',
                flowInterfaceNamespace: 'tsysnhi8lvp5ck7s9nvctwu5ic7yoo5pax3wy86tgqlubq90kcz9pwtnslp3dvfgzhz6cbawaor9q25hbr89x3fevx3iv8v7qltlgay4e12l92m4w8t52skt6spvwh0aw3ivuigbe3dwe934hpput0t3fqjoh9e2',
                adapterType: '6usxlwwossjsgrx7iut15x7vsrcevoszfrcfxwn6yt4vohlb48k0lphuc59f',
                direction: 'RECEIVER',
                transportProtocol: '53p06xjcaxae6hgw0hkxl46pxu8etal8od12n81od3kgxdxykf4bjzs6slby',
                messageProtocol: 'd87y6ul7un6kxt2bauiak6gxuwm8yqtx451f7fop69dh01ixpvbqurk0hstc',
                adapterEngineName: 'x2ztyis6cgj8rav1vacf19sv1anm1fg64bi8466ezggofrj9zlmvyndh7upnvxz1kffr9h4eiz1zn4cygrxfuiydxkdpjj0g20pmj2ndhvlas5opg6hfvt78cut04iv7sf6tpeh1qzmu96rkp7dtx70wfnutdxpi',
                url: '7rkwi0gf7odryqha7nrcfq9793jhek1n6im53hsclebsk4vtnrs8v3bxz9sxm32d0q9ysd74i449s2zec35s68xmre9js5ztu34mijnebhz7ym9mu8jfcd8ges17779jyh5yo0h653x76sivq59gh5y8qrs4hppvnld8x5c4fsqtbxifiea6qrisv0zax4qusqadgynkysxt9cwlsi0nukke5j4v76o6qrcxddq7ih8fre8hy2g8ta0xear6da179yswhmyupi4qtp1vzq1fpw86wg0l0k8b7p95vabg6gbuan21do11uex43nhdt50m',
                username: '46klmtomrke420jk90lkvupgvfceiii8aaq4wxnf67dyjnawbnbluhlom2nx',
                remoteHost: '4f4vlgk28i5lc1gabzzdqe0rts8l4znosbmbmmkh469xsyc6nm36u6u4nl7h7c3n70p8nglttfgxnjh2fy61wj31xmnyq9qcf6yy62c3y1hzw5c7mmexqwao7z8y1tmi455t3dzwsef5xop1a86ibkjipkb1g8bd',
                remotePort: 6956571346,
                directory: 'kba1r536w62zp3q7yn13yxy4j3ayocim9ts55kppygssxjmcahfy60k0euje7yfhk35aaxlul7lc7zv39hasotbk2hsaa706x9928beg1ngj8dvs6dv4qlbytx05nx5bay8iiwt57eqnjopcpwn871yzsxfhd725lldeeznixcsz7bdbgyl0o1b0repbqft7jkoc4x46t38hnuzqrgt47l0t95ggk0ab1vy6ri0b199ohave59e16s0ivvoo8shtxbjl46uw2iro1npdr4njdfoaeahkkx7utd5qgqal4dc3qxntf2r9kw2l522nuzaplobypqr48e483u2tlbitqr01td4v28s0box05d8dt2p9asiiwjkmcd8fw12kxfk2c3c1vy9iwe5aoswvswh4x0qb3e9pmrgvaoh0ji5pzbxaphmbrxixqnzgb68bjvgsfnuz4fsraiqn9aveg1ha8qy0al58cko1q68rt53a8ub0vn1kcy8vgqibd0qae0skmewy1k5xh2l91w4jmxicoqp0li93oto7fquk2hvziawltd0qdq9tg425ip3daxeh3ch60ymu5wlhk9t2cmfzvjyj8ov6s2otkvnetww6xmthdx7nnvqgjnxdocoig7obq6teexiv7e21nm87dns26hjyz7oxdgreht7dg1f7m641mo4ve849q25fymsqhbrxoputd124uy9f7e88fxhsn8eg1ni6frzlnbg7n12ljjf83mclqmzockg0bli1m7dxp11dgw1wekxma0ki7l8e5r3p33m4on01569z63tuq010p83sp9gezrdnb46lzn71b9ldfgb89rwgolx0qxurgttvi9w7cqicnd5f1oti4tlyj937rikudznqiencnpm0qqu7v4ph9w7vjmrh9347qdj7fxm6w78rva9olb9at2gr1j14q5chak4cx8g6cbfmxtojoft1ghbhnkzylhgg1u8f0prnvpbodw3dq4th8dvfotihm10twbj8eyxe1lzsy',
                fileSchema: 'tjmgsoaax6dir94l6izra4vzsb4u2cu2wwskhgfwfd810flom5hepbhcc51g22zon4w1oajgwv6y9zihombuuf8buba5twgmscw6s4jvjn22sjxckptl7p9bgqbgkdbq1487hotv3ijywte5nqlxlrsbf83wgg4tvuoueikrkytnw8bfggc1c8vl5ktety3tj4bbirq6iisiwj2o7fvxhod8eub66kogg9gfpbvzu4zayr5y69jj4zgnw97eulyp77zimbxmuftrqp4o75jv15nmrpopc15psuc330mtfz4yvxykm7dsgcq26dthy77i3h1neplydy0a3fwm2e8zpkz52bbi2r8phvbspqkkfr1zjv4a308sxqzfrc8f8x0l18aft7kett8wjuy9zahfprfk6utl9o9df5mcqswy5hvgjrer38pygdgj37f3cul1yhswoa7qnmqwxj19lpwfm0lq60s1dzyunap1xn623z2edawegpn0gl019d0r7l0d2ztrgmusz7nyaw4gvc2avr78sad0qmi1ayppq16yj0j8jkedxg8pguivleld5rs0faerrsidbc061q28v0wkn81zk49wbm2qgq9mwihcmbdrn3gtswf9p6829ocasna9l27nxpe9o9za71nsydth4wqhcktkr8j0e503702iwwt0xzo34z0puzpbxppow53l20xym7zg5at4iapj6ldfeome21dohah3rzkwhowgt1mmqfn9xmj1tsmb6xml2lnii0k1bpieo71ngckcc0du4vp33m4ctugnqtwgy45u65a7pmg5giqvkanxpebf88217z1a0bl8l4uivwh4a0v417z19smxdolqj21b9r22ptqtns2dhwsk3oqu7a89penv5ldemavkext21t8sseut8wdc7rs57b0h48a4ve1n5u8397ryt69a7yun6dudi49tnsvc2oegctbn4mra0xdol6ghoymwpiku2w24dx5ffg0fdkx3kvbcb0obzucrlc37',
                proxyHost: 'zdl65xbb1vg3aiayhlzone99fa2m7jzlwt54jxchh3hnnkbcpfg8x8ror294',
                proxyPort: 6100249051,
                destination: 'i9gawm706ypd4tni105y92ci4zbo94dv9kiicv09pjuzqg55tkiyt14rzgvhpblntejjcpjlhxhxyukyns4kr9frqdjyetqwfuesa4t1gyvd70h51zfaolmjgo4b2nrv8xsicd2aqgktip2dgoxabqm2fgrn1z8a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jbx8bjb2rl869h7upb9t95sxile33rdfkao3gfog27o5mtrsmgogj8f660ndmmbh2adlj7j1edfa0xr3jr3xgh43d0ta5j9fy9l0cxc3e8dj5gu1bl9mn0vbbd9khukz9z8w1ht1sk23awnyzxpxzlmcb6xm1qlk',
                responsibleUserAccountName: 'thldlll3po6zh97ivm0z',
                lastChangeUserAccount: '2h22g2v6w6jhzollovc7',
                lastChangedAt: '2020-07-15 20:57:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'g8j0wim8gbt4c4kc8cjygry6rtqbj3imfdgobxumyeubxpz2wir2du1pxsk98ttqae5bd1jzhcdgqakdpz5nze5joam2uqyxgciib2s4k02a4hkyqlq75ur1kqsrceo13eafur7xwvxk3trnyxm9jbwwxxoj9ejl',
                component: '614ixfo8zq1f7d2b9g87o88vyd3shizbjb4gi5kz08pkfjszqfke1jdzh9kaqcqqncbuvyarfketzq3qouag6q8uwlj9jn8s0l3xnhbbsqmbrfgj82wrr37zfnywodfjwtvxwry9kz1tu73i3xd3fzor1sk93mzt',
                name: '4dv1yjfrj3q5dhh8o5bo2nlstloxp3c5kc4wkocjmfzhqihcme3jm2gy8exyywyqzi9swy7s64fos8e6xttqdj0z3um5cpqcfeij5w76sk9egtay7xcima4rkfxbymp1jokepuoe9ohf7i1vpeoj287pnh18cb8e',
                flowParty: 'yfnebvrulpiwc3hdrtq8op6x0rmb7xm5wpia0k2yl6gqomlng297z30nvy8h25j0soyspgxvk2qh6ans5jxwszw6ikw2ygtq7j5ev2482mk3dxcw8s4d7mgl026ldh42e470q5w8ucqghfu1nbittw42kvbc8pe9',
                flowComponent: '62t9spdw0gcx5kl7ox2trbxdxpjtif1bi7y0xk9slhlz49but63x2rgsg67wx75t86gbw3mtn8yuyesq31yww66pu9hnv382bt40njdfh7twiheektp3myrnr16v7r3fuw9xloioiyaicvd44bltedwk5ammva64',
                flowInterfaceName: '93t6567r8vycfz98zx4vmzs6bw1d9kjez10fzth614rk62fsooa3x140ik2bwatwp7uoc9cxbm7uil2gsmm3wihx9e318b68kvz208luoj313rcewuyqg3pm8cy6pumfmuqv6pdc5q5pdmsw8k1571kbymmilo1t',
                flowInterfaceNamespace: '396djfy4l1su9l99kh9l39h6bsnxsz08odge7ayo0bvk4nzga67fqc85dahld4co6dolu96zu2k263uprl3i3lob62c0nw478w9t4j1r17a6n6r1ueu0737hnz7u6vna0m6m98310qlc9viqx4p7u5eonq6mz0c6',
                adapterType: '2zrt6tdf778tz5zk8rjypl2f2b8xn2v9s7571f2m9cqu2eafnwku4dtxdj6z',
                direction: 'SENDER',
                transportProtocol: 'rrcnae3i5n349zorvwe4fcedmh31u9z5y0f7rm1kqnb3b1ix0bzlj5cuo42g',
                messageProtocol: 'j4hnco7iaa7zmbdt2fxd8k9lbbiyeaxbf5p74brbcxk1hubhv0zqyww5pu80',
                adapterEngineName: '97ix4o7uhge3ovyck71yhwikbauaa8nvrl2qeqk2z6hlzuny80o74cgark9x0egxl8m0rawewf066g5kzpmoabhbjhtlfj8dwp73ksx4ri8znbfnqzac6r7w0npdnlk7p9cotc8dxr82p1y7f84qj653ins1zdbp',
                url: 'opmla07yqhf85ufbtm0xqtgwpbnoh4iyjn5hu2f7ocb3a3gsqav4kvjokw90rle5bblzlw5j1xuq81ns8ihgk2vdjgpi4m8iysx2zjo6a8ijm56tk3vvkpox3z75vnebtasype5dttfbp14mxz3r3ux5n22512y8alww5zmgp1xmsa7wcltk3mcwls5m5dcy3t7vlqv1e1de1kbmyxnipfw681qbi3wwzesbqqvq3jej7m8sw2r9z3otwkugd0r3tmu88cedlvq3uot7bw8kapngrv2zptqaw8ibnsaprizd1lpi74pwmdpvx6rxoue1',
                username: 'kkf9rnwx3irai3lohukzqnjgy3r6mk2ws16uunbvmrxi587m589jjphci6fs',
                remoteHost: 'homyb9qant49u86yh8nlzd0blqihpzn958rqpbcx5juihycjgj2mbqma8k0mnijlefpajsej3q308bnp57zynn716a21j7jhj737c8bsiyusjfrssw7vwhkll2tbns0bqjzljyfy2b46ubkepxxblr631g2jw8qr',
                remotePort: 6375854043,
                directory: '33qvn8okwioeseq7cifoifeyr0padcn6q872y7hc5z56me9rzqj6wu3fwi358ua34f6w9f4srwf1ia5do18p1ssmnpzt4nwhtzkikejsgnhlgmnisvsqk4oq5zmm0aktzqj2ok5ye75a14emvlsbv172halytupvwa7i1bderdim94u2lg1ul8c6t7hyz5k431a57lkptanc2l78652kgvtw8lc7i9fil47k8bfm13hdy9ojaso38nw4t6ny4r7k04l1ac05qb398o5kt81rm1n02pztibrrmku8ccgou6bj9enkjb8xn26y32qmj3g10q4b5b0mg6s8h8h8npkk0z7j6fedqchihtm2uvfj6do09vv5f1owafgiexp3c5ax7tdkq6wx0a6wbf3x5eahmkoaunwv8ztgjmijhgwikla8jyv5w586210edna1s7ec2wwr9vx3l1ks7yqpih117syxrlocdsb8kg0lifs0rv6fmyrk61dotk48m5wdjo2l9wl32mluul5xqcke475yy8e0yzdo7eyo4quo6jntvcoungpxaxxd35xzcp0d6n4xjydra6doxireeswdxd4r3s709tp8vpckm61wggtzf3nwpkqfxti62ps2mz5j37grf9gvy3iu2e6wf2yfvuuf6r2jjafaz2zzkjrjl2dxfrhqw101q4zatb99gjjgxyr80fibc8anz5673jygf1ek7vec56zuh14ll2ifgrnhpr4pm4dg37xr6i4dfwfed2ffmlrjlmdp39w7wyoyqwx263w28zaei59q10g9kxo2luz9hzedvt4d46sk7s8c93txoylar74v0k1vjo0b1dzh452o2h1nv81b2rosp553ao8bofemu8p4khx57hj94zltz1qtijy9qyvs85peao88sf7ti45qrhqud78e9pbqjuh0mx2anzohl2eb7zfhcu05w1owiuidq95ftyb20ugnb66xsevdy8b8f58v8n6l2ayo4f1pyzjmg7xu9aoe00xq',
                fileSchema: 'l941ybrcjylkohxea5rv37ht6jges9rd4uv69itqyhn6pps6z3z149dk9oozp15xu6g0lfn90jrv362208ki8at8fzjka0yzqz1knzkxcxkpoahzbien7srozota9u7aqjeldm3v1b5cm1mr3zomrf7dqf4c3d081girani7idcay49yptxmscxg8uiclnz3shrxulnz0rsy5g5b974mbbuy1mex84fsqm5qb0rqqpvsfp6cjalyacy1ea25tkpu256rwz1rrmxspr1ceoyia1n8xiycl8dfon3ipliivkate5g6j1uryn132cgtso8womfxi8ksx2qnfrxk5bagxtf8jicv0ruaur8nr9vsrn45xp28emi6616g2cn8hncwmf490sm6dum481whpul30fso4002mj7nji2uadeleprx4l02xob2fxo2l8eihjcehac9qq3uy6zovsy4g19ycbmkjyntk0609r3fjjo6kc3h8cshnb7d4pqu49eek0kz7pldawvldnrsoyhv3qa1tw3i54ggvkxfkw9z4s0mbp6db7unpjjt40gj5sucvoqw6b56i5od57zh4kc6v1airom5wp4l4oq7b41t0eh55v0s0lnlbv578ffh6hw0ysnhfsm70gt9kpmaz775ium0yj5bxijzv14vex8201o3047c9647m87xpz6qi8u4pjhufghg3ppzmqyaij7gzwjnk3utp3xkdev11qe3ax45sntwdchcj3vpdtx4jwco8bt11xi0bbsrxpmz4apm7n2yijdxxfp98ttty2ae9etzoc3lcoszyf4gbxvmsdwx6wu3chea3m5rds80lqc9rlg3sfwg65fyfotqjt5a8i3yphbycw3ljnywqmb8pt3zx6dsmb3wske2lj06cwko6pyhp6ok39tnhr2gsd0pm8cjwrx6k1swniu6m7ys30jtf4tg6d5i1gfsidgwd5i0hdpw0cnmoawtoui7r2ezg266p2ks1er5cx9y453lz5q4084l5',
                proxyHost: 'gwxjq85fj67s61cz932nwvc4wur60msrx82y3bi1edi3o0kjdv7kgrlotnl9',
                proxyPort: 7289413768,
                destination: '0niukv702n2mn3b292oawtproyto8y4pld0a2b33b7w75go4ug2fkem8x2v0uxohw78wajlk6ze2m58apdxqowgntwm1a9ullp04lj2ks92k8zuslfmcjd5ohy11ihr127hz49b5tw011qs85qwqzrfmgctww4vr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5ef34xejsn47z14qz1jn9sddp6g0r6yl55umd87evq9ruby4ibjgo6fvkpblspk0g6j8uva75mlmcw5du9bdl6y39ak9cv7xxhgk6btqsveqhcojcsyj0xc0fhj601oh60majm3wj9489iiaklscgx4cke13l30c',
                responsibleUserAccountName: 'mbzqaumgw4neo129yc82',
                lastChangeUserAccount: 'ml88r2zzmjho9d6sh5gp',
                lastChangedAt: '2020-07-16 00:54:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'aa0t1pdxm7te7j5b6t2d4v2i5b6mxwh5jpmlntkxq4p67gq4py0i44kw7e19j7h44yq27etfirs5u00bg4sdfjjehpykyhnlwfa4251pncgbkd68x1kncl6mooz1mrmnxj97txl3td7meyro1ug0k4g0mwpl7oh2',
                component: 'hp8fkkl9tccjxio6x7on3u9l6e2v5a1ki52zvuhncbb8jwqu94ezn5klh5fiwxksv6e06l420sz9wmbsqyxs8sj3sxywrm8vhcq0r18tdr41s1nir8eewd276xk5p66jlj3483d117ekjzdbjrp3e5zi61u0ft8z',
                name: 'uoae4fbl18i9rvbar33j66mhds4wmy2u01gjnnq3bqfjjewkbdo3nz8307m2ct5c2nnx8fl4ltrumpptelg5pktn9rqysbxs1m2r8o884baydgca23z7cxa3jeeup77924drmuzv2l4i3o3s0p33m9vx4u737pew',
                flowParty: 'espbdgskr159h1v6vvgss5rtw2e39s25ti4cmgjfvjpdos9zoj52lg0qld531dzehj6fs97xexty3dqg4dotgw9yn59nle3vmeia0n555c58k7uapjxqwyyya1cinlpl72yt7poqob50832njbqnl1exvhvisfun',
                flowComponent: '7qw9pppbp4npsmqej3qluxennfgtil105r8pxhjo8h88io3e4m7xxmq9yt3z4mj9q7d5itt7uswriffkcvr8rg0efq804dzmfirjivyukd7ce3yuz8267y2ckbc670y5vyun91yuuh9u89lqem0my2ys452cdeku',
                flowInterfaceName: 'jbclyzk575uwjbbyqh9w85rh21sefxvzw25vsdbq3v947nj1ebr39rf5rn4kpq3bpl57t6khuv37ju812vrzm0onu44gjx3zxne8c8tci0avv3vif9iyfm6bxltb8r65qpvdffbvv183h90bo6fr3le1egbrcxkz',
                flowInterfaceNamespace: 'p3044mrasftofur3ick8wzxuh7zvjj22ejtqoujcs3l1ljnnm00hoz32b93t8oaurc2aj6sgunipjd5yvdcuqyvsdocq78d5gku4c6nes9nfj803w2jcstvshnlwyfh6j57z8sw57kt8w8xeorazfju2bpurlzil',
                adapterType: '24zh420ltzpqtxle1mwdy5y23e8i5l75n2z4fu608stfbb2i2uxewcg4ntor',
                direction: 'SENDER',
                transportProtocol: 'i7td82z7jqlail6u1crzprcy548l2iizrc0wgst58n0cxd6r1fvt48mikxhm',
                messageProtocol: 'ttradm6br4gwxr4pd9824w6xbwwegniy2zmhnwhq0prkcmjv0nof2ui8vvtr',
                adapterEngineName: 'ztv1goyegditshq588ye19gkwaw1yngochyk52g9bb79bakem8k2re2yr2zoi1hp6ff6y1qevqzk9wvhocjdidwsds9kllnp6e7fwcxbi3zzwusb2inlz16jw50sxkoaord9cnngw0a3n2smlqh7drlrahxul0fq',
                url: 'elwfmxjdc19e0zj4z0fu6xcqp4up2bny5z5m8w0n9dzyp1t3q0qvrktdf8tglevuursdqn4q7ruh66s0qv1x1tsyz9mt0shgxv70v4u3dfij6ai6yzche83o0b8gghr15coc1o2c2zf7jmam3ob6svml24o0hww571bwt2pj111kgrru67mus3n67nub4lks5is5kere80azy691rz12qpyl6h4rgewhb36lax9be0y5debezhujip5h894iw9k5wby4a5xnx26i3rxshgsrkixqtauiaxazuy4ouqx1vjdy1yhl0legn7d8xfnt01di',
                username: 'fyoatum93jnt9gqmkbxrx6vqujcdhbj6do7gwc7ferx34139o5abzdtr7bak',
                remoteHost: 'pmtun0x72n1gdyjbo1relyk680w1m9gseofyxwb273525lm7ih91qww4tbaxoz7dkunvahywsls6lkgcnsgqkfpqxw1ax5a12b5jqwytdpigd47aa006am1v7g08v4kcegbsi6zpnrc6bstb7lgcpedksphilytm',
                remotePort: 3113615324,
                directory: 'v0g6657ikxxrbaz9ptp5ghxh42fwj5bp461xso908n7ya6xz42blflvhw37b2e8luqzhhuf2vbhv0tdipp1x31jhtntqpa18e5bbio2mjl4ym63lx2ug5waied8y4h6jse47v8xb3c94t1affxbkq97mqptzk6ptcm2w3uzr9xtfqgu2n3653ss1osxmayjkn5bpxo2emfa5bf9wa4se1zvgcm6j080o5a1g78md6f5txke3z03y7gt82u9lr0l344i8sau7cdda9oqiswsidti8nj8y4v3re7p3mj9spfi4d6d1peon3ei4yah2fq2bcexwuvgmipskptrsy3x2c87bidiz42mo6meovciksjho5z5py2nyup0ftbpzrng3btnabei5xb7v5tms7z6n5yhshy64ufek7fkiei0f3ixp575mkeuzcy4ihli8pb3gwed33xe9f5rzfqkyl2r9804m5ehimzrh147m6gci3tij8haddq23zhj66hym10eflfbe942vb8uq56qe3fi6o8hfnkwsllns6f2wylnqlwnbq9pvikak2ppa6xhlqvktfsx1m9se1uj1ylrqy1tt7gflbqn70kmc494ref7bixs51uhtik4kkkppgas7ufukmvt6xviii2ahc2lo8jiude78f9c9tuxayqa1jrouchnoi5ubt36j6jxu667ainz7p4sicqfivd8k8708a2qyljpnzhhwo1l4om4gp9rr34ckpt658bfl5yb6silzw0i6qdrhp9tcx16p3lawsnkm0l641plegin5rf4h1ve3ipfi4avhsfk4xkrr0u85poqhyq90j0feadwuxw7vq22oucejgzwy9dz8jjcmke2pukfezvfpyge5a6qz5jsu6w9nux4p3o7it755es9adnaewvx9tdrcd86vr39727mdw5y1fswt7n1w2lku9cynczwkiy4tproqiazbxkf89v9e68365lvz3tayssyvu19rew3xwj8tcctmerehzgvnf0pp',
                fileSchema: 'd9a5dfz6ateeqgje74cm59l8br3ww71dp9vujafb7obv4khhm7rwm7i0irvp9xaox3w6mroplik44t05y9g6tu0mylj7zmelgljdlbfz5qa01808rmx05dlgmpyqpk852gnoit829j66lz02kbp5jbgxl7nktjnurp7lrdywuqj2mxni8mcg82tnaqyysixn4jvvuh9qbt6ryq8qf61nvpj9zwolym48xrx37ff1no8xoul2dy2stwv9h61xcf3dx7lg3t5vk63wce2vz2tp0zda49nzpbanuga0nfw7duv0ckv6f786yecciwa799x626dfwp3oi3b00j0a1s7n6srww3g7tjn7maklhi6hq66ujgcute15voo5w89peuur7pbgmbgwy3l7ikpeudukzyu2l4bp2cs3xtrpm2grq108xgf39d1y1irhxpgbcsldctaq2vv96w03utak2i38tiods6rw6sif38tzu2dqrc9uknqcs61rnnfew1po4w5gp4d0hpenspeyk0xpr1yw0s959frq2kbxsb70sbsfzy3woz565keqncupabaaocsz3myjr2apeg1lirrnzza7p3fqxw9gc46n7102vik5aqz8nthqa1t3vtypt0pa58favmgtvyeya6fgdx6j53lt5k7wu7tr5p46q46w6d6sgnpvbriy321lc3lvfp9e8y863p0732wyow5w0vq1o4x4zl6drc8z7rnd35i5i0fovwjr0tox1s9p8ew2nh5r858pm7uol39gtvpnwn4uw1ywxn2kzqljnq4v9jvn63y7a1bn44uwfkinzyqwu54xn2iqq0mrv6e4qkgw4o9gsfim1cmqji5bl8zj59gwwyl4r4ptmuqusc2sub45u6v5rsnv73wnycn99tp4on98zfrjyhy0anklkcwn2cm7o3x4uptwixozpph7zo7msxn24zeyvdlo01wv5zb36r9ase5m3ci4lkajod01t7qz67olekdjt6s75w1ynxgr8wshqblr',
                proxyHost: 'ynsce8pgya7algat23a39a96i12ihv8achamtwf8f0jwol9eyjnnu9x0manjv',
                proxyPort: 5328733908,
                destination: 'cp9unfyp8m23knf5wqccgt1ypaluhzs5tyro6e7su88aj8bepuhkrnjywyv11i2qgu7goay83z8biaf4rv0o93yztedxzeyopyrjqgach86d09cxw689teg9923z0zscrpw5lyzwjkwr7xn8b0yp21zar7rbqs8z',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bxl5h8dmv1ayo5qa43blexba5nqc4juhc9lr4462nj7qq993mro0xotxt8tjwdq9q3o62tsyjx9p2pzz6s0iscuemrg8c73b7ctio7nkswj7wc6f7k0j2ngel5isiabffgpcluzbg8yvx0ulppwo6huda3cs48vz',
                responsibleUserAccountName: '9n8mhdgnhulc7tc7cnnt',
                lastChangeUserAccount: 'z4zi3bk98dnqsxnpg011',
                lastChangedAt: '2020-07-15 20:09:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'kb7dkzmscc2b08g7u7jaghyiu7lfvk50i7i2h0nyz2z4w1pzryf4j2rlldwk0bdxhg41eo3kh15daq52nr77xxnrii69ps40cojkjmyzcnu1lmb9p1v1v3p29g54telnxpni381bqmr3xz9ii3wg6bgsa7b1e39r',
                component: '7sbnghq5ir3ay8wofn8rb4l7gkc35d4sp2n4pbu7etruol86coz9nn0doogju36pryyfuz8ib5qy017r8820l6lzlrhxymq2r09bbka9sk4xvdxa8b5s1oumj1zxmayuctcxiymivugt3iii1ybsd4u1msf6hjtg',
                name: '08iuryczvmvwws0iep6lz2hhgs5ffo7n864bjnz1df2g0itni9988o02bteqbmoh4wqwitcbc7nmc2qo3movz3mhbljularzr048t49yqkcjg4m4non8jdh3txgv5csw531slzw5y9yr0b2tqdwtdl496xp2w1tm',
                flowParty: '9ugviiz74g9v537d2ndyku29xot0wu2arejzue800h83l8wd7brlkcz4a0zfspxq7bow91z53mjqs5u8kl4gzurjbx66opctp5rhpn046hymg822mcujju3vriynnds8b6fz8vbhz3r0um9vdly9tvi15oetqkaq',
                flowComponent: 'pssxkxq6qn6g62o6uw8l4c4c0y3209ctkcei93sxz6l09dkf8fgp5gbus7cr3yp94adg19duz9dtpelr16vzr5q7ezszdfiwop106y1e5ztujef62fterl328r469hhdw5srtdvppaehrtmvdywicqza2ulpg4d8',
                flowInterfaceName: 'q7xd8rbg3zz6rsz9hepkn6ilzfoq5vus1suk9unmc26tisp7b0kijeeoivcgfkuvz2erqxa4eefp29iltx225bl78ovqzwky2bjvawn1n1tcffiqdo3gkuigewcyxmnji283jgy7ofy09q6bcxtmumkp30n2xpmj',
                flowInterfaceNamespace: 'csabsytqm22wahi3ptbpnk50h6xr7qkorxm2f35rhmzcrbqs0mwii4qpvu6vz8e3gxdnpfgpisyxx93rls9rdjuvq3sjvae2rz9f2pol4yjqs8eqasqhdp3z7liyp911t3f3p42kg7duw0htxn5l1tkgs1jkwsrp',
                adapterType: '2546gk085her2urdsh0mcy4msqzn72htz66sgi3tmgbgzy12a4dvq8ixa05d',
                direction: 'RECEIVER',
                transportProtocol: 'okxxbxj7fioq6m9j9tzwllpu4akmm2ds9bei4abnw4owtfhh0722s3v45f40',
                messageProtocol: 'u1szwfoauop8e70gmbi528kmr6d6z66fk2czmxi1bdffkuom020xiag7rcik',
                adapterEngineName: 'bbx2ugu7cldqc16xoqdr7g9wtk2i2k1ktm4p0w8kek4c7jfc1mbktwcqjqa5uzqy2sgzejyni6v10avsnsqwnb3bbxpsu6gnvsb4vm9wpvvga51go5cyxm72yfug4mu7v8d3tcfu8xu6531oruejawfy9toe9ilv',
                url: 'por76l55x28zisbvz2tbu0ncu9dmxvy5wa3x0w1au0x58m0k3s8tkk44sbsr7bzoix79in3fjfzjbo0hzhsopwt8feyfyemkhclcnbwif3lu6cibze9zvxjaesgmfcq9og3mdg8uucfu51zpuwgm4iyhwmpf4y17b4ml3ydx19oetzuwx1am8fh76n08smkw1102ejozhwzd4oibk7wr4qahnk7u9msmhtxy6vv6kvrzf15w0qhv8qjw1dkgaczihwx1n1mgp3vqya1ba8sv4pgesbxm6m1nz3sdtv9y91lw3xbeniuy8nhcq9xbl5c0',
                username: '1io8xthj4px8t0m8ocwt7m7whv0prs57knog5c5ebgvt433o0gt1psa2f3lh',
                remoteHost: 'cv4slr74d4wpu4i5ctyuapg3qcrmy7dy95ngeprq7cxf0u6fy8o2rp02idjcdiy66npry5nsw6am4534nmjdrmyp0q9r3jwx4zvndrqyn413l5obdal8697y1cxcvk9sxjoov5ddlig06sabbpqr3efiwjhshuba',
                remotePort: 6048618963,
                directory: 'uxngnbepjrhcqoz356wf9ygkuz751xxyzh1wux24aqqnsgf9m02kzytew558jsxkfej0qrpm4xrzd5p2pjcxh6d47l12aiqbyu4vwsps2u1aighln0o59hd80gg6kvhpjpqxwor1vaf6bcmk6e1bet7hky51pfxyls1dzaghmj42jixqh6wrntk26pwpg4a3dixr34zt083thxrjctbid3iiqaemuo5m8g55gw3mvruyjtuqmmodpkxyify6jszyzz4du52p1amvmip563fq6swp3vdqj90p6zljihypx6bjl1tt435cwyzfhr7fc4zqpao9279d62c5qtci69o17493f4ghwmbzbovddkhkqnbm0ff33d5wef3l1w8zmzd5f8frlbtr6xmc8le0rwkcy0gai5xtdo27xywta82dc0r0vccqj9n5yub1txa0yu41girlkxen0k04tu1vivph34q7yc7isa67w6obu3pvctqm8qv73deftfw0bh8ktf4pi0v2hp9sqscehonw7v9uklm77ljsvipltbs3ot9mrhoom6si9f2cdch5piu2noomwxu51a4e14iednnhc9skjevekfmvlusgs07xxslgbf0torqprv3tvbmvwsfs8xait7uuspby2a5yj3famm22ymild3xyhx2ws5uhn844v7aprmnzz4lusn3vknqe5y8v1s2bb2ihk2ek0fdhuga9h41yt7lpunev6fhwswyn206u87ttpjr0c9l17y1mbn9ln8s2297pzutee1abha9z1iwdxuoe6ofuo8s9hhtgjnjvlgwfr18pjlnfdnqfvoqruzybppvfrhtfgsiwsx4aelin1jpf6d9xfwc8rk0u0nnlgcqgilvxabi1o9a9teu4t7os1u73llfdfvp4pdky4bkokt7bzap6ow9j1rq67r3bm7kva0b71ngvlbhsj5pkwbxfxa0fk0x8e9l931t7erwc1r3kxs9iau0rphapk7ycgjrmc5lvponw9n344oqh',
                fileSchema: '3nztswszmwvcag293in4kq8n7j18tvoza964thtsmk0yjaqvpuypx3e2mzygott8e9txktsn7epmrzrpdibgnbbo1arzvbdzkogeozowjpjo5et1juer2sndjqb396jvgk3nhvc61rfi3svs1j6px85y0qmg3p1h2muktdhlbu9ggdvqxqvvako9nrgyjdkbup3r0sadms9fsz17ev1d3a77rk7i3zowq769a0p4v6psunopo56l7kzdvsbugpzp7mqioqfkqdz83llzd872kf2ednenf5q4yz35a00zt9izsb4rx0q8jpqeocbsb6yvsz21e41q2gngmdm3jw7wucfhgy8zjfaqayuu6rad9a0dktyv98zputcuqeqrja9xpc0e1hggwrmoh9p2p2e5qqpr65z4kibm29h3ezlqxyti0ur8gri5clb7ndtfrrhvllvpfv7sqiro91xgu54py0hgcrxjzjfy7u819vnndml3ktev2m1qd9dwash7kywbrfcyh2iawt2na1byjft1kzqw4l8xfgz0zuks3choj03cryditjtenv494h6hpxdo2tmqkjxfq7arixj0iezxz4oz3tv1l9u0wuhegrmyobkrbjyyl5l84gnvwx812b09lz2havefzhac8iphx0q0fb1ypug490i3jy8r2wx1s0yze6dmsoj4v1p2nikd7l8i6zd16t1mq2nfji01tvtpb5oxvhfs390jvhr4k1nq8uvn68a39ellc3ngaq0vubmqs4rm505qln1oomjqbwcyx1ekx1kdu5u0ei8hkxonnteolpzkwhhzzpfb6m094iizixu8i5peyitkj09hbdhjblahfpt06mdg137ebqb83w4auqb9lenkoyr16g1ccpzo5x3uabsl2mbat8ytqajsxeosjz9pchlnfae20wue7haz6uu73cyfuceuu4jqej5na7u8gwoqj2mq82iu4zpa45bj9t91ulqbj1uwmb5f7cttzkkwqg4gucjrwdunxr51',
                proxyHost: 'irlqm9mvinkr9h3prwc9bpt5omkq2mdpci6wg7v64cb217aco2xw6x9wcy36',
                proxyPort: 59933480554,
                destination: 'udns2tqzza1v38lcpbzjao51db7jt7b9zer32ymmld0ov0brikj533x9b9ecifdunuyqwxorfe086ob66gsxowbss2abamhm1puy1bl82japrtiqwkmv5mnaaja72t3qqcmujlkbcwsk90zalswf9d69lz0y2sww',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j2a7rbulr527np8pxd31snhio23s2vy2kcao0aeyj2nyapuh226x2l2jy1gvqouuhi3hdktt4bllxnty7zw506qv8xfhbpz0gnk8hoz9xlrz3mhxfkc86tibaclbe55tm4xyoo30yj2dvck5paqybo1h33h1kyzu',
                responsibleUserAccountName: 'f5g88m12q81remav4cih',
                lastChangeUserAccount: 'w2i4omumppy6c5ukf7sq',
                lastChangedAt: '2020-07-16 13:29:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '348hpbqf9jm6ygyxm7sslh5drp3bptbyduz0mi2th53gj6njbukoqicjz9t2how0m9gznxe9f9qy87d4evhhkg62ms4qv5koj7yyxzrhpsulrj5phfc5oqu52rxi8vc4pu8zx8nq0fonsv36u54kjf4onwwd06o7',
                component: 'n6arlfly7oym0ehafcl8aaaeowc18i6e79tq6udyn7h8e16e92nj5xzeb62ojcguoyjbkz75xt8ap7d4xlxeelqsg6q4jzknhzdxe17ou2fycp61cspoeu0xxvf2gb71up8mycpyqrxs5aiwwz8ojxwypkk6r677',
                name: 'qdyhoihozh5o1tpv0isgaabf5etdct8bht5tqvzolcl77t0yzxaay2cgonhlfh3io82ki9h9uunhw8h8o0bnxgmla2hv6gi4lw6wgmyv0plhupy2y47u51fhapkn03xmontb690qtaujxhx2uuo6dx7f84odj2pi',
                flowParty: '5d7e7s7hh5afwlam3cgpvfrun45xw1rkyykyce0084wra381i0v0uzp5demvgxpsmhvzs47a3qithhggg3itc5z2hftysf6bh4ntmpknekmk6mdzvfw42rcnycu5fyw0gwxzma61p8e1nairmatcjq7rc5ys8c40',
                flowComponent: 'f9rvs0yl38tiimvfq8oxbcysx88ftnu32xtzrj6vkkuc8emy3j9k1u5690cmluqx7weh5kb36gs70ve8j4ipu53nlnkpcumicqsjmwatfl3gvle48hk833wtmffct135na0d0dkuc6gvvrgqlijyjyfv5f5jcxfl',
                flowInterfaceName: 'h6qjpzjh9nwf0qygnzuw7rqeuneybqs2e3athpw732gmojl72nhkvxv4pro8g6akbjp7x694cfnb4if8tywhuml9dbt6trxh7c2r718lyg8d20yae4carmkjzu3onwq825rvom0ttxtvqqdaid6mm0agip0w0108',
                flowInterfaceNamespace: '2r2vnsyk4si4pln49kur6s9od6dl8a4kdojrhvae8lihmycp2h02tahpdyp6wcuefrtywrjeaapn1fqdzzfpajtuek1l74oma9p5vsvlb44xqc1stg009nbvf8j86r0uwz8r8fkditoaplo3tz3p9b476li5eb67',
                adapterType: 'bgjrd3bb9g1jc339ieg5h3mk60nzqg8mqtmrakz37uqa9lmoijk5yshkwq67',
                direction: 'RECEIVER',
                transportProtocol: 'y2618ogd771mn7or7zp5y09it7p1cwzdx56xe76hqhoweexg7lbee2cjs0ai',
                messageProtocol: '2jz9nh0c2rp937qul9jbox0vlz8wjqufooismlcknqsimwj28siwntc1iiv3',
                adapterEngineName: 'wb8cp8c8dlgvkosia5t0wdd5j66f067ie1b27wk16ltcdszri41rgxfru85ucu688b4j8pvqlr7uoe0t69d3btjv4t5s2x0jdcgegst6n8o24lrr4zdqifwiuj1rv49cctx6wqjbrrclr5q41zk6sm0yvamy55rj',
                url: 'x7qzg5cbixhjxmel802pl6hphy7efokxvkrssuqcl3baq7kwkjiv2uizdpcqdpfpie8acd7e1dgg5tmxxjrhltqmdqpd34xh6oba8ph57hj7b5umptzuewk6h1vlcuu16238myfrvru2jq2a7w7durpz80tvngzx03pbwr2uqjx5hpysuqgsh5qxqbvj0x7ee186rfutv7mu1s12rbpsr4ikhpeoq6m2p6ex9z3jvfzom59kgot23uxkw040mfa47ozwmh3nfioxjei6rl1l6lrgmzfu0uxnm9iid8skoeazkknsm5ustooqbnr1movl',
                username: '5hkeskumiem3563ujph11shhia6r70yuf992tjj3qrpngtg3eip2cmg20y4p',
                remoteHost: 'vel9gak6ywbg62wpm239g33ithekjq56va9m9wmdr5ec4qans8see2h61p2j3lnpsv4jjhdhhuxln1r1sge6bjqto4a7f3o2oonam4ce7jxnvshlviy5p5gk48937qd4928uvc0o46pqc0of11jup6rdvimatjet',
                remotePort: 1203237642,
                directory: 'xqsacctuzpo9qukt87u03l66t9l07onn7yx4276y7jzb3btoo1i6gvfic21kcci1gn031gq1napf7m1hjogee6bxs6k49p5lkg49nepli3c7kyx4iox7my3vjl8t2fsdwmmpewp2si3whdyoxwjg5y86zomnec7jnpqre3l545zyf1y57xtpf5kox1dl635xtos1gonb74mcx5u9ia1x0qh1hjkvs0mfk2qk7ftultjyselsppzifbkazq5fzs5uz96od7xq1h0s6ba4k4uymtnouaofdd761s52t4fpi1oa9p58afoaeg4yd84vtnflsrto93g1344dlbvci6kxt9x0jwrsjviocyg873si7f37ix7m1kpjr2ap5b678wjvvzgf3xqlcdfxezuli24xkmbu9tl10y41sktl4zp8cigv6nkrr6jh5fhd08jh8rj2xp7fbnm0ldz8b2xi7swrduqwheg6nq962pfmsagzjmoqg8r2hrkw4t5opaji6uu9uu0wyge4lc0f9p5ekek1usfbggdx2cdbtfgu45t7a9u3me25psg7pb8nwxu1mlj3kl1gw1ec25x9a34yl0ae3h69f1ldh1irlj2pg3dr244gxh0xlnlr5pvmy69rtblrw0ljwaoax2o8l0kx6zkx2wu67fu70mlwresncv6l7caex572szni8z8hjuhjl3sfo0xhhhpl4yej7bymy1r1z95y0d6qt2tvc8p0ww633g28p0cnrkyxncw8noc1bnulxwafstt5incftzblzxfnw0gudpwj1x67reogc0wx8ijq5yb7ic3iydiheql9yl40ovpjx6wxzobkfy4pkd6b1hdyk71jv3rfn6hhkyzncl1set67twbj6zzblqpk4ug90pv21g8r4ijzlusfirtmmgdrehy8gfzobo8xvpuu3tmwcngm8fmr3epneq4be4xpcndocad1pm7jpdy39dnfx437otgdwrnn37kv9s9mk6xqzrvpq7nj6dh3dswi6nuz',
                fileSchema: 'hh3vrpk81uhx0r6175u43o6phd6w37qpxhjhng0t80p80s9sygvaypx8q54hzqnwajz539bvf3v3nldrp24y9qy4eblnqmg4264bnodd7f41j71r15xdko7q8ari0q7wmn98czlck7eveqh1o9angih9g7yiqvpi3zk1gsb0mmgky863fde1rdwnk9y73gyu2tbfn3cp8qjkrftrx63vmsbln3ecz7j0ecp6upl8sxmeghfm75o41h8bhn3pvatkimbhqy5dll2jw4lunge728crxhqafsfwn27pft2np5g3mtdesx8xri7tzxars8l5pca1u3fnthxcih81cl43wbuqg5awkimolznpsc3e2st4ujc2pt0v6ncfgynvgvov7wepze2pllnlcl2btkzvtl4i91z8yt8yv3e234y6wklrj4o981ydxz8grdfxm6y5bk78ammabebpbqi8riamwjf6ayrtii0mt3q12r0etv2xl1f4nzhks3dc3lmvqkjzfv27iurx84pmco4owg8x0stbslxnx4le6dfvxsdfu5pa9reih0qwzz75q94q0fhz1252pwn55fv070rt6nsdea7ww7i9fkpdmfwe45pf29w3sye5r4k6bxldyxdhm22ew67pbs8314hhkvmujibrula0nb35w7fc8wv9ghmnc8cfw4gauwi5nzz5opxun7hwmjw72vah03skrfjmt8mt94xip8jv5iwpji11kfu693pq6wdurxdphrwyogvkq0713ceqz5vphrww7nnqgyk3fgiiy6byzfnjqrbwlk7q5b06487nwvgqplcrbp8omlwq44uhxaal7cpam01jcif1xoad3emf595tp85nxtogjecenjrqbquf2vnvkzwu2llq3l80twidaqb2hzgcfrhr2kbc6zqc60c6ic9kvxgh857mc4yeltl2znayc9n7w6tild0xtdwp8lalqja0e9e0imp2atreioxpof9mp8ancrvutg2yb8bqumckyu2fm2lq',
                proxyHost: '7glxt38r0y77vngnp41fe1xf914lzo4yx2cbzwnfx87vxy9gjod6vq0ortjm',
                proxyPort: 3477546582,
                destination: 'rh5054c2c6r1s1vwnpuvwmhi2tajtqeordkwcwsj26wr213uwc0ikim5yc14rq5aqh4s960aldzome2wm3ofjdwn53dbz3vz4yytdepgu9g3jrkmj6h41lxl0otyf8fdw2jm6qq6ddpnlyhl60fgf9b0txnq5p14k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wqx3i57lxchz5h45ddcfh4s07m916i9txe86hbakyed1wh683wh5i9e35bs28sdygg7jjq8d1ykct64wcgcu5fyixbutrsi3eldebtkykicir4hi5xegz0g5w45vhjexzx9dzww441s2laizyjzx51tsvk4lnur6',
                responsibleUserAccountName: 'gm87lcwxxnhsgzfaiqdf',
                lastChangeUserAccount: '3wmrynic6y0g0xsoifth',
                lastChangedAt: '2020-07-16 08:42:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'sq3xci10scv3acb6m8v0bl7db412gtbsgm4ip7nv07crwlqwvgm77toe0swmz0h3nke5nneai2cyzkx4387wapunvosw58fa3ezg5quvhpm0u9dptdpwc0zl2ioroo4fcbm4a2s68higdl6l85lnsvo3rdzfs1ct',
                component: 't8m4i1rxkqathuyyvpzfcx3hrm993lnran746ypl6y8k9eyqm4zpz81fuggwubv6budsxpwma9sf67mfjo0pa7g6kc1yc41rfelkfcs21gvn8jv67apqsxmkep42eiiae4czj78cmp2efcc9cwnnbp88dodl3zxp',
                name: 'phjrcz11jp3ypv9oogszdhkmiw9dy1hrqgzmnotw1e63gdzgi439g7hagqw7sbkqv1226z27ngva7bshnhq7v9lqimh9wnw7lhx64ys43igrtzamliggzuqbnrwttce08ezdlg0r7brrliapjnily1zhye2ys84t',
                flowParty: 'jb6fuf4e059dn9lu8zipbidrvkf6kbok3935tsfcho6m2e4cnxmiwm2wk2hdbxvxzexatv3soquv9l05dri6apa8uvu4ifte9actte0lx1bi04stxit6giicfonkqr9wz0xtgn97ckp5xjjzt9i7xt23qwqlltlr',
                flowComponent: 'zqd6tq5yxf368c1tsc5xek59pk6hp8euz1wjbqxnweqtxkvy1p4w4n0234fmvnejtya4y13x7pedue6g9m3ch9mh952v772nyekr4gxt8afggif3cpgxe2exvdvaepd48154xltfyohdq5jt4h0pi9v3udx2xhki',
                flowInterfaceName: '577nw37ab5749tu4mwprsxez3m4636nxla3p8ezeeplx5wgzaag84q08i8i99rxamjbd2bb9zv59jlrx8ukgao63a6wrdgnbpsxtafesm4gtvgd92c81j7kj180qyebk91ayf26wv28a60tu358vxnso70hg5xx0',
                flowInterfaceNamespace: 'mrxn3x73fcg92paqej73q1d62jdjn9velwbo3d1oo81r8cfs9ku7xq4z7qxeg027ae1t6d41bcf7n0mwblnjgah0fkq5n4gpgxt8jolb29i5yd3rke2xpzrthplda7nrxzmvysflx7lhi0beng39xxyrmpztrsly',
                adapterType: '9jctxt6tqcnftorv41hty98swoms4ww5i40ar9odgd7czxphdp9rfcu4zoh2',
                direction: 'SENDER',
                transportProtocol: '6yrkjg9hbnojfwhlow6aq46bb15d1pxyini954vh6ql096kfnfgp234vnvdx',
                messageProtocol: '97pr51c8rcowvo8zkqzafddzy2hxoclxrp9oxju9lbytjl9ww5m6355h5pv7',
                adapterEngineName: 'vesbokmjaw3vphral7gu5nlbh1sr0zudpoz1w5iu9zrkf6qkojqe1d9a3s3jf8ittx82cu0akjp30byeufrzdlukspu46aulryk6sv3rbozdfvakeeyl82pkjgd51j1aoxgca4egncgmo13htgfbcaw4zphehcyh',
                url: 'axqou6c8a0mmdpa52xt1ftjsjn4uts4b85z0z1xwu6yxc5drfvkkd7rt0bu8jk20xvnyxy9skmc8kes8kwxjdb74ebvgbtc3645se6a7gr2vlill2wvjtz38m3tqy13q6duberki9v7vvv5fwulfjw5pz3pruxxao6ds510wvoq0jadtl4mzz399lxmm8elzyu9ov92tzdwjddbe4ylsg086k4yppncev387v23zvz246cbln3u27qgrq9q1ngq0tnvtwbp75y9n1ac2y32ckq5ofctcwx458364tq1wu28ptug9y6fa820v8u4bd6zf',
                username: 'g61piefyhtn91zgbjrjj8hxdeh7v0rwb8tvek5qnubnbkier7m0y7vn70h1p',
                remoteHost: 'd5wu8q5sjkaib1ooxaf366hdscdhhz956cfps0n0ao938be8hc0tdqhko16k2lflqbs1g7jf8ie91vustek9uxwrjldtpj125urqypdqqbe8efr9ny5rfts4ckpjl99clsbtdcrn37og8ovre0eydi7aoptnd2xh',
                remotePort: 6772313175,
                directory: 'pyba8rg20tjfajksbw1wltuudrp75vdk6bo4pz2s0chbpthb0tci0xsmxn1jcu6i3b5mpcaceqis4xm085umm4vasali6fps52ako0h9zk64rk5lv3lb00lfrzlo5mej6msrc3obkyh96egfzdxg4ckjq33ir5pv0nq3nppygzlainfxmr1yr89w5nvwfks06cqfh8cq099s8wt5wqpea61d0r5xp95o33tx1qewsteleb24vm9oxvh8iv7clix01gewkq1cazddzbfrix40pr8oblw0dxyigal703yx0549naxnpucmtdfz13sosn0gejjpj8svbhc829g3gstta40q9molyrj2ne1yjvn82ui0p9grx7cge8n5l9k7dw2izv99tsfimwncwf0sycn1muzm1qynuuuhfamqfs7f2h2onvas29k8mnngossvot23xr2zmn2c46c0x7a8xyahjti7hhawdgd82hm3831ybf2wkwn0gdq955ejfta139xizpyywoo3o8jj3a8yqmiu07ekxbny0egjtd8jrkg8yfactssy2xda1ia6e8sppebpx0pe039ihacj3op6g8n8b096l9u992muuzeqdfkexfdnkin7l0vxco81cvymgwdh2x70kxkqb39cn58iacgf7jz0ebei5o2sspjh3mhuii7wlem7fvo9vmoqevgwvxqgh7e21a49hc1cgg1bi1kxx3aw0fh0oz1yut3k2elv1mgv6idrhnwebhvdvcsj2fd58trhor8aj4kvd73mwjyhmw5jmv6akgpon3j9uurf4t6a0pogug5a422shrpueioneyajw8n27hhquu5o640kaa14b3kqpg4ri4udtk7ej3mr90m0qqk7sidm945lvkoj3t42xa7emelgdd0qojcc6rfqz4lhy4r21at3hwk7m7o3xkpj4d2hh2opxc6ek29solc7wkkjs58hm1ldldrviombay673ia7xli4krkegokvyw2jz5rmnxi1v3o0q0hl',
                fileSchema: 'xucloghhontgf272w58jtz9ed0mwi15k61mmkxehtrkuorkrj8ypoubutud69p0p0fg8rqe8cdspll37i02f04ble1hc1t0y6zw5vuiett9x7leshz35l7isfe6b853uwnqm3oe8ymgd5m7mw94yxjp8tntc4l2zv2n6mxktiivyqnbuwxqqnpt8pqxe4a8g1dporyowfi2mgvy51hi349rn11rr5lmf18013ybn22d2g2kl9oydtn4sn6hwf7wofipcadw1d8gv9xdjwwieiubd07nzl9ycvvbldyhsoh2e37qsgitao95kv03ood6cr6qi94s2ezbp6r18gy2u211zpl19xcq0c2sdq78uxh8t8gx9z5u64ubjkx9tkvctuumns8guzt795u9n2u5j0ik0l0591fyewq8qo15s1gix5tatgc7otpgwsuy512ua7z6fpwk9amthygwe5587in1km0ars7i5knhn4bgpvnrhyo0xou9pqgs0tjxzg9znoqhjfd2259dev3d6jugehnzf3jpt786s4zq09lv1yypqomf92ypery84wk2fmmtkybb599piaofqmhb1p3435d17g1m7zq1ma9vmt0jgyi0l90f5iiyt9rdz0oewb2i8173mpmul57jjoe82p5kgvdv655fmvuydyge2rwgg1mtdz0x6dkip8jqvlyu0qnwqgx2barvx0rzg4rq86zzv4dlvz3xozvvt14qsqv6ul6086tbenmpy9aghg0yykjqma23wjx86cilugri9l6u7kabu2d0e63k8h592ugaxq4nkp0a1virdvt54fw2aoxt9eiuyei9bnibu3cdt5t8t7etm5j9qmpfrj893qoknaema09rp20her923o2ynigbloirdodk34ynx7hlg135h2g150jmpjvwe3x3ayl1giljyuj6lak7l8mlj8ydyp5c6uofx4nxdixinhppddco204zncjq7z4ej076ra2mluv1av5dv9i6yi7nu1xz4ci80',
                proxyHost: '1lc29pqb3qe05efinhnef6w5slbby1y970z9dzswr49hwhrs7gnqr3b0cjq9',
                proxyPort: 2010199024,
                destination: 'klexo1rpywhr1edtmdtyv8w4q4bshsitzjn4vx7vc2ypb425zw78wy89gpoeutnzm1q4vlrpeu3r3qmaxglzt839bya3lz3jjfqs6fhtcvfzilxqggu7skswpimmx8itquzxdisgmg86nwzmz5lttb75pv3bzrch',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'acfb9cn7jnyqzh8d3wk69dhvqv07g6lhf1d6p8csd3lcpign7ec3uny86bjkq3dkwqvy3x31r94cpnzu2nj4xe0m90n1losl28brbflpieuw8lg1wr3dgod6tu2ndioz5b0b7jxfb0roe7euk6xmfvoc0hot5adpw',
                responsibleUserAccountName: '423ds3g0396nd18rn1eq',
                lastChangeUserAccount: '98fcvcqgjrn2hqopgruv',
                lastChangedAt: '2020-07-15 21:30:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '2seas5ik0hmsq6ie2ugqsi2jnu278mltigaeod6rt1ws4w01mxn8s0n9on13jsdh8jg9km11emz5vor6o1zkj28omt61gf08wplrpaof9ofwcih84601lm47zuulwgltd7x2rn1xnm6h886045h7xs1mm0box2yi',
                component: 'okt4gglensjgj9phpgzx3i6fmb4l06fa8tca5vta33x5fo7da2ybpe448wqfwjce176izfokea3jks3c6hkd76570uioev0lpru72b6h5zqq3qrcazmwjeessd8z08u7li8nffv3x3g045w42qnfiiy9xgz87nmd',
                name: 'w8g0mpulz750nx2ztr1mh60vkd3cxh5hkmpvpchjh64ekccnwjr492muyhcoohewmt7qylxucqhqsj98xuu3enaianq32zduhbbbzb825cya74csxpxu5gmnmq39p1eoajtgwoa8qvlsyhbzil70eddhizbmqp4y',
                flowParty: '9ancpwp8pbu64iz860h1t2tc10k9ynjvwiu36gfz166se8wftza9nqen79pqdujnlo20g3l5k012mqu37662e74owfbu6iysxvdw39552fu2aq0iibmx4xkjj44e48z7gykpeyex9sn5pvf9hnrah2ph9ppwfuot',
                flowComponent: 'e9tif8s1d6k36efosjrq3lzt150meolxvxuqssnt3xvju2lelp5znoewu6w8oci5a88q2l39s1rl5qztdvgylu3vkt3nv4399xiugt2i1xeurkmjmkrylbppu5pmn7zv6e9z70z0awp0wl972mj2xt3pt94lvq2i',
                flowInterfaceName: 'd8dximqpiw53z89havi3dsh1ssezbjzry4kj4kv5r8k2j17etik3hbcjlwy9q28e0vgv2f2syxnd4o1dfyzrlk3vpy07ixtfnv9e6upcfc5l7l5he6aidbnzdtbogcwulewo1bux7upgettn2okf0xg1dbfk04sm',
                flowInterfaceNamespace: 'ro3p1ecu561x56s9sjt1lh1o4hy546210hkr0d67synvs312wwyrf09gk41bsl3iiejpz6v89ydhdwywu55n3zmm0w87ysjtn2rsw23vepqws9t4kpvy33wr5kb8hjb137idtk5qm0qyiwfkuewdl28nf60eg2u7',
                adapterType: 'glcovizoq0uiamv8wlo79e7oyv97k7xqzc4nzk6ctu8qtyk2inqjgwrvyzs8',
                direction: 'RECEIVER',
                transportProtocol: 'usqaclf9nqnoe7d57z6hgwtyfrsyewfo879i6uerk0aukhh4wmc6p1lf7uwm',
                messageProtocol: 's3v38ijbh9fzeruy5pfqh0t9e7iredd6jaeu4br8wfizrpvm6ked5w4w4c1k',
                adapterEngineName: 'ghocz96r345c8prlzt8x3lcqj6dfjq593k52xpz1upe35b6iyjtl32eqd022h2nf0io854vf5w4997zhzklaij6rihcza5sloum16j5oruls91s7q4n873ija1l2wpwcq1p0hj5rw8nou3r74qpka97iebrczubl',
                url: 'epziajg7z2n8cgwn70qkzpwyzhzx5q6d2m2qlv6k1yu2qhdz9s7dofduslwnzlcujj8a5iipk6im3kh8799kp1yp6v465zj5xdi9bcifg39i1v18s4eqv34oocg3ilfpacw70o6fmstvv7zz8cpg0ll48xefjq0202r88ws6taokrldzngdif9yopqwoz1zkqfkp19f4wdto8y6mm15p8xb5cwpo31jfpptsf0ia5enrzdss0a0la2vy755igdv0riom9qzah8m05bw3ykdetkggxu7vsjif5xc5ec7svn1u2ripntgp2alkhcdd68bi',
                username: 'gvo35iu2ki9lgbpt6lkdslcljzeut8vktdieyiwkckb50fb3jcfys910w4si',
                remoteHost: 'o7xpudn7hwqefsoyoln72vffrzj6eqt2z6mpbngnwg7e5kpvybkp3y8tq88kb1ixkev4vvofhgknhsbr35sbc1pe46nhjhljgjy8ud9zy6jiphyemgaqyqvltbldwibm8txeowmvc6q9vg292g2iwp8muj06t687',
                remotePort: 8960923325,
                directory: '8bqupv132z8q9ayb53e1gu6f80oht1vx00yxnxebk3wvno45jeyt11n1qmtk4x96gj89tbohi9zpde1kdfu0apjymd1v94yewqn6b9vvysv34ounq1tue2js4etk8n5lgxq07k0sy8f6rng6tnwbinj56ptqy111lz75ohfqntelmnr9qv0y818rrss3xt031clycxmuy519utzvk741cfvk00kt4pv4sthkd03qv7ja84k18sprwhcwdpqx9m5yq5606fm3kt37ik39cxq2g4yav81svffpq0i88evl8dxmdug2mn6e1oavxr8a7rrfx3gxr51b2oriqgbtbf2swzcx76f2208pd5zlci9bsqq7ouonz4x401967f2ty2ong0z481kmpymxl93t54k2rtzzqxrt2q6wlkvz4tzgyyumsm5c9bgxd2du50myf2b94rxu93d3cjpg7ep6q8bdrctdvwthpk8n7we1ci2y2xpg57oe0kc0tus6cu32647b6b4zrl3zdakl86zviq8dxar01qrgrmbextmzv3cxxgzljbfhrjzff07exj6pa7tnuvf1vdnntc6lptfr5v1r7rb07lfbgar5zahp10mw7s2zdshnrhpmouipfbv0nk6q0yd2pic4qilvzp6rhzdddt5xof4wplbdkwc4d6vzryn79z6oon0szhd4ldczkh5168qqx3gktrcm5a22cye1suke67dvk8115y894epu5ww2iyoe8h5onxabb7jivhwddyoqwu9iwj4cogbnsv5s7exi86vtbqs3a90xtya64pthrwdr0cfhleljsn1mqimwuo1ev8dz2udbb0i56xcszdyzqorwl4rcggjk9m35nlt77lrmnrm2ubwab2njdhwigjy0ei9wpzun15fgotudvjee9upuaphn33bm8oa4gsn00setyg74yhrj0lkiuurj8lcs2n0m89jj182jso46mq8qa7d9jnr0u9k7dmb64k8un0x41jgcm77ybg4q5mp3',
                fileSchema: 'wz54ff1y5dvp8p92nu7xedwvw84davapppb8ivrc7zagclt16njo37135ptrk8zalyvm3689oa8opw4glc58nvbcya4melszls9fa54h2jlx05m861enne3vt2ydsdvx0o60lz6uw4g2yzf483x7z0icyxyri4ms5cqq9rx5e1yjq7lfnp18995p767g1qumoq7qlptvvwauvymn1sh8f3v15uezc8gktszzybqeuau9dvszozssykkjifmhcvv85m6mr0xpgs4v4zlykwndop91pw10hdwp9kpoah1dh6kr08ej4pune28ex06d5teo9a4u21t871njxtnb5gjiu2gl1k6yy5s35fr2l16ey4bgynv8tlr0gbx5lv3j1sxgfwqq1esxkwanwnmqbcy9y8do4vyexivtyvglsnp01hrcuep6v8ump29tixea22odqkhrz65dmxvwf8lam6thmjrzeuh0vt9pncsyed9arbu5gc3bwv293vzwsguzfklrltds818m7jtadwjwjsasxul5rtrtsxs7nav9dfl0yagx00r42jkhmnxr2grsswolmd13c3pulbxis20vt1fb1qzid1ow2kk0dghcp3m332u4acw2ivbmwggy2d289yvkbszo340t7nehnk9qmlcfjuxm5n5hb8ef4y2j36u3raw1ddtrhj9usfk2h4ze0484m300ioutu0ad4vitwe5yrolf5a97sbyqajjopxzxjkh9dfk73j1g0ekur8p80k7ar4q84c5n38dsm5x19al6bsinx9qgsvoepo28nxbrjayzt8wv7cb4lhf2ajnwv0yujuxrmrp4bzigav014dfeh9umnxmpc6xf8jq44gl5ogy48z51fj7v6rp35db71am9c855qonzspjt3er74wd60ocvcpogf3zge8a5a9352hd3qweylc4kqiu5znzgoq8e4yl5vb49o2uuhxkbxemgihypjkwzwoort7wrms3qczc1nykhfxc6ve2sa7xpi0p8',
                proxyHost: '4u1cs3ibp95zbgh5hbj0thmkaj5k5fa0whhoiw997jtyeq5hvs2maql1sq4a',
                proxyPort: 3784539368,
                destination: 'dqvch46a4s763fpvz6rxwnox0xo80hbqia0tar67x7uppowuun8jyox5gov9k42qvwwh7iwm613zi04vs0iwociwg323sqh8rzdh2ovwj194tlsuebtgk1aejjbefsnpwy7tj5s1ci8laxekiai9gcqoub6lboni',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ezd42heyj7yilk0cotl1b7tf23aygpri4hdzgl1j9a8touixm294bon4ncqks7x8119j1z5519b1hol8cxt3b6q04j8lj2bb0bfsfm382dtntpn2g3s7t0mcc72mmm08p41kp6xh9i4ic1bcg7wjumc9f4imdwdi',
                responsibleUserAccountName: '0vo1ypw8pngqx7galwuyo',
                lastChangeUserAccount: 'to32vvcwsd5rpyksdj4w',
                lastChangedAt: '2020-07-16 08:43:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'n4iflw42fsypf1zgi5s8k4pxepz5fm1r2xov71pfo5loh1uybauvt2fwcobav8kf1q4hwi79hhlaceh8jjyb5npsglcvygkpmr4nqxwrhp2tqizbtksxf5m5zmq5cl56lbn64hoy2xvzhke2xcv4d1hfogwidpsk',
                component: 'j3oyw03qx2986xa6ld4l6a7uq6g91hx71zk44hn9lx10m3tidnrvpckjqw5qrmarmueda69c96ly6i5zr8lwkdw5qnxhmijnwuf4cokgz9ofqq5rz0x8r9g1wfjb5babzqp6sp7stqcfw6237ysj7uxvc2wizyoy',
                name: 'jg21hnoe720nv3hivq4eadlcrn4w0nfct1oa2hore6t7freeushmh6367z3kjg327nf0h7m2ija2t2nfoujckxmhro20oaok4toqiotr7v7s12kc0bu07auxctm0wsi7i0mcsylq249c9u9eb805v0bzx9vz0yh0',
                flowParty: 'f8hospnsgou2nmks6x2yss31u0rjhrejal1ttdpe88nvmb8fuu2hs62q9ua1bg795a02vpauyke3sreygyeq3id1yyze4loe8n2ookac8i1diot44gsdtfz7yfmy6otn7x8c60g9v8z96e3povu8ea2c95k17ans',
                flowComponent: '0u6l74d8x79brdq3k2kbsvt3wwg9wobpvtqs2lc4oxjfsia1csy84u4ndr6oacoi5igpet84m0tr3srnkb5ebxj91zhkfwjiz7icls246wo0tkttmnmxqc0plgip4ed04flp369q223fcwhp0e1cq3cxetutg6rk',
                flowInterfaceName: 'ur9q4unqq1fyewk33yanhp19xhz5lv32ryq6fg7navr2hpop86k3wlk4owpb7cy0gl7lyst6u2k69r7gbgbt3n6dnldre1hc0ot5313l2a26fmi944nlpzxdvgiysrrfn3l0sr9uf2o3cf5yp6xh348axytqtugo',
                flowInterfaceNamespace: '8fcnky6wussj7aj4sl1h11t4zu1zp2dukzt8lnxopnwff4bzwsbqh7z5v51aeyw7ujj4y0ea6z9nf9srxgx4r0hez7cefeauqjnfbmihcatozxjl9st457n7s72f0xl8ft5cvtvdmvyo1ergjuvgobfana4qrga4',
                adapterType: 'owbqjb6mjwwdra1wcmg610v2ops5urcirunzcc0rhrhv5b54a51ndmpejnae',
                direction: 'SENDER',
                transportProtocol: 'uvx7qk7hxl727j3mdf38ku0rwtvs3f8l07ec4777mnextknz8redyjd5nbkn',
                messageProtocol: 'f49p2vwy173w8ka2yv0d3p8hwzklwzh4dqfrrb6mle4xaxv64e7ik3fsjyr1',
                adapterEngineName: 'ybfrvyw7dzn5vqrhqmezlmfqchsagamrfmhjdofc4kx333l3krscfrfqq6msmwdqt89em5nwici607176zqx4t6c95ievz2r3oaezopammzexv2zs8kwwgfarub1ys2900vuky8kfivdgkxqsfrzpvswfigbva3t',
                url: 'nrpzv49mxfhgxfhph7ckr6wfbd9hibf2jmbev2uz2zbjkv0d9jqf6q1e8counlbetxfj5yaxhdgzf48rd2a1denly6erqnie49f16gb8vc3cm2pl8na4g2yoosa1it5oyijwtnmnvbin4xdt51gssq84la1rn8nl97s3zx7fum9q9q1ht2aambk5c367vpfyu3rjay3lq9nvgod4zhwymm1vu7v5f6ldqdetizhici8uqtd4nqb109d7h6nezjw0z6xgcovycbv2c9i6yg6db9hy2wjctzwxfa6761hvtmh7j21x6xpazt8jz9trcnf1',
                username: 'cgk1wv3j2qs95fupf64hytq4zkeatvd7e9f33i9y5thv897uckunhiyy8xza',
                remoteHost: 'qt1y4ckihgjy56md8tgn8c2poz4qhxtsl4d1iaac2f2n7mvprw5ahd9247jer0l1qhrpbhd7qpeh0zc2vch6rcnftf7a1qjvznwna5qts2doa3zr9ajzkfakk442845uuj6vhkyl3oe88f7hcsflx074xu0xk3ws',
                remotePort: 7638288320,
                directory: 'lkxrg0k4joxp9ixmx6153of32mfigj380rrn78ttscu6t0gl75xvd6uiiu3qjb7rz9x4ejnvm4sub16ny76hcntprw93is49hkrdqksze4m9o5oj9ygswyhc0zy4malw2htm619lgffyv9w72xukolgf6mfgaj25zl8ypksjmnzzd02ctdqb19aaccni9pyfs09jxzm5ls4oqgk1fip149uk78zo87hh25x1zb10eyimjxbj8d6tl76vvtidh59q2mnwra1l3woaqhu3y30x3jsuqduvkzeafqpatxtlkoxxnyneg584fd2zoh86yhinoicu1jfmik3a8jik46kg4lsdjvah2mzt2va0xxc9mxg9fr9c6tcv7ximsxtwatog06hw75a7ny9u7way51673hxsgz2vezvdobezv85st0rqf2h8oobosygh6qbkf0yyaxsflmtcvis9hzs4r9mfraiw8odhe667lhmgjnlqysexffn775l2stl0tot4pqy93s1ia3biqbaqpndv0094763g3ixxizlv60b0vpf7d8wqm5sxhbch5wnr1jwficn26pyi6n406ek8qo5awxtr337e6horvuk0h606kb0bj89hgqregtrbhmw9m68r62dtfp0lojo346jen54qg6plw9vtmm01z0kqe4tnyg12e8difj61cdf40w0b0kvgfsznowdlugyyoiy5nd4yvfnoirrgmsg48q1yuj9rig55ugzjkryvrgxxozangiqwc46da02z60gdazmk5eymv0amo6tlad9i4zn2jehowv544d1eee4so46tt7a46d64tgrp561yhzbj3paiupd2mihpdosacfru3t4cpwkmrp6708teh6hfswqm2rlgugdgzusb3cbs3q3mdtlog28q7dlx4kbnl2urt96kqgj68f4n4fcax2s4wht0cowzlpnrdtwtiy6pb4ildh7yuia22uwwxvnvmepafsyoaamddy1u12sy0ck0lmemm2zunbk4yylp',
                fileSchema: 'dnm1piwjqkclxn9wxydn6ahoc1woygem00gdb21nynbr1jtmhiydwemlaalxjs3noqpx4t6v1yr0r4zj5alju984bncki49pv9a5hseink5ft7c5e23rz6mgifaocr3u2akzqeerc6kkeayzpmzgk8ayyxue9iwo7t3hevv0p7mrpyn5jydizoaouhvtbqqup2mj68aph96z8rc5x6atlt23do8wppnaht7qq437ibjpc0yril64iicmlj53k109habrgcnx0zhqqd8atwbkgpbeyvnnbz7y2wcpuw11nch1g02nyqgn0cek7gzh2yfpc5l2ai9hhhcuegppk5yajon4or61me9rb0gl4m5qhf5bu81so4ol5xwt7o54rmlhmguck4cefj1osht9d9cv8pbfd4bfmynf9nnw8zmt8k0fvgp715kp2crhuiujul2jegy24wi2cymtmfduz8jige4hk2rnuq0ovaz5ww69bzvh3bwyggyobeck3oxuyyhc5csjedro11j9id5uw05hb1euwpu62lk5rkz8l2s94kpmjf7wz00ltjhtpfy0v5ezz1virs3wv4ltyl82ikehzwzdou03p26dimqnhnhjw8sd2udtcssgi49tzg7w95n6v2zc3rfqrj9ofrgnj4fkqprkmxggkf0l5jq3uda3lhww13lql3he9dixuyzt0ay86bd9mylrw6oh9koeezonymjyzmixe08qwy30fqmn999gbslu0xpz7ey7oc71qzu0pp6che6ip9x48l4x57mreuarixgz5njiuejhpobfxnbsysv57pvwy2gvn6ncwvesaacjmqlahhfeo051edk6w1yn2tci3xsnglxzwbgxaiv3aqrqc46d1jfjvqu85bak7st4tkhpnwn7i43e4y9dp4icqhbgbcsvvf3irwbu0ywq22qfavhz82hm8p53mxt00jh7ehpf1np9e2dqvlx86if8s28lun5mnqprufboduzav8p68g6xumbcf00d2dbe',
                proxyHost: 'ft1a1sucsh1d939scr7v7sh2vczftdqeebomagc7tiqxe2c29lwecdxr6obf',
                proxyPort: 8786005234,
                destination: 'e72s7zqfrqyja2d1gims0jx04w92pyqxvq07am0p4bg3xw5mh4nqko21ax9vta0a57eoprji9180dcggm6hxjdyhde3u8740oslkgwccur65mckp6g84v2pjecb3xda23344j7beh56h729igs5is2sq1ugza2qj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '31ls2pbo841pudg07e0r9y16bxrq83hvl27auvi426vju4o9fme4pijpplg8l6l76ajid2s1552fea4qslneosfxpi4vn04kq8u3hnf9gt62vgjfdj5tp71aj7yq353v6br1wactb8wsm9gwan5yiy8hnoq6qg1e',
                responsibleUserAccountName: 'af3vhamtdjzvshjy04xi',
                lastChangeUserAccount: 'zvrxsn8wbe1f9znzbs7bk',
                lastChangedAt: '2020-07-16 06:39:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 't7wnvgnwnc4s2vlddj7wp0cgvbt0l2hbb15orpleyi9jax3exkdg73vw92sljzinzrrtmi7l3av7vwntx9xv0d1ji0usgaax5mz359v4mhg1fm57de7eid8oz3h3284tomfr786lge9pxvqzmi9544hhonz201wl',
                component: '3m9andab5ewo6eflp8os8f0mqv4qk6oyzrrc4db761uxiioverbqisdjsr4bjbxt7q3kvy0cohs0oivbmz8ynz8pjhoymvp3plfula8ad4g7i3sji10g3frrljs09ealocjz38rp2ludwjgz9mrtcejtw9xk3eak',
                name: 'ldez084yser0ordtveumtoth1vjfk1q0c2ps2lp5ouwor1bykbip956zz56ndar2ux9uc80usypcn5tew16g1k5zv3ptyhjuikn3t8datm0qy93n947rx8g6em4dmt48bnlb8k9ifmfcfo3dotvhc7lq1cmj0ega',
                flowParty: '4dvbpa9z294hzj2oflmvv9kiszva3zt07pviinlvzfzy2ck37r7wktoltkpz1me77wgmehh31ytbaqgafeqoegvx1it5rromuka5u1am8ortzqyxjc9qrdh4h7bqvi0ljqcnl9e48etkc1mmw6ennpn5vfhvzhnl',
                flowComponent: '6kvg1qgk20o9yihisauaivjlw5rou6qhmdpr4n7or8ntm0esjhh4aewxwhzonmjmfuicspxti696oyw1ghdgqpv4lmwx0vd23d1q868u47ru984g90awki8jowv2d6k4ysn3i41k2yldvjecdo0x4n3sk0nqt6ij',
                flowInterfaceName: '8glf13lpqflxdsoxyy98g9f7cdeqebvdgrkrqwtbvbya3g3d8133n3drqcm4o434vixcfzi7or6cuixac5mjsy6o1vkagvqxo9rdlt5n5fvqdw7wf4cc1shdrtkbhp179obpuuo7czqlxp5sb3irqzb30z7l5ryt',
                flowInterfaceNamespace: 'j0dj58z5dygd40xiwnuhw8no582094llkysx9in6a38qyvx1qu57p04twwb8jn1x2t1n4i5s0vsnpfnxtw8ygnnvezedpfo9ibzmifimt24o3ly5n207y5phz6esz28z9jh1p8ziamflgdq96ifoy4xlzixewdmg',
                adapterType: 't3ct3zzvja41ujqud0uipq6a9uo7lei3peq1pf100x8vc16iu2j748bg5mmi',
                direction: 'RECEIVER',
                transportProtocol: 'byvkr6nzro21i4s2rt1zd9mgw4jkwkw368zf3t1rwizli4w5nnaxtnler5ei',
                messageProtocol: 'cdo69u2uyksvbdcqw2sdhqcatkd71om7pzfgk1f523sh9wtfzloxa5ip0zys',
                adapterEngineName: '9o4v6urrp7lxfdp9xu0wjlcmljg98i0ksvy9zti0947cmwrcehk05n1vwarqt4o7odiepp9b63roq33bk6smjcb4v6ue1rk0yp0r0f98pwdkv0rruzc23vskkxr08b0pblqben6hha0c7jtr7eqr4kec2sgkbni8',
                url: 'sz48i4jhvis42u4a3n0kxkiswbnoq2r89tshb5id4uo49787vrsb9s08ij7kcsimnc7wmw5mn4blcz2wf9s1o80gdyzvjxpprkf2iup42ukv08fjxxb86tz4xkm71b9uiuu8fm519te5uvutkwowr0jb6mg5d56diw8z82hpimhys3gaghcokhpfghmeapn42b7jsspmpy8gl0tea9cbtrbun6o4tsg6n4bgu2bmwsn99uo087ejn0xcv94v3qr1ihu086ml1qlnu3rpag3uas6jmf2fgx6u3izmb6g35wysoeeqd9f7s05q8vzzdmq6',
                username: 'loht1hw27btd479njjyw0ka3qley45wilwee8uq3fg1w0jiny98ry222qm7e',
                remoteHost: 'an98hq2x9n9l77yxjxs04nmugabrcoeaduymlb186zv048hsiupoerkvll50saawppx0o0lpk872zvj8bujkogttldnzqpo0zt8s8eqi9351fkw30lfre33awwvube2wauglurqw47e35mb2okjx706e1gk0pvnm',
                remotePort: -9,
                directory: 'enk1x70mjlsgo7b4pc6hpesjwe2tm3ggsbis6qc914mi86ln00vng612ehfq3nzut6hmpizxwefi89gj1b8yi626lxkepvm219b94v8pb6yzmalq0g03xzs4w0dnlxxr0nxxgejb0sf0bwwozvi4spj62crfmajjgjpblwni1r3wdtsso8y5ooys0r9ou32nfsts3uga7x22a5tjs03yrzhmq7hq1b4nssmzeabjrqmab1dfqr2o1s2osd19ce1pidc48cmgzktow27d7lid40kqfovi730a75nq0f1e55u4851x1p3j5fbg9qqk7lo0fhf19bw4vjampdi9bjapkqc9dywr30180bhif3f84bgkm2zhb0z6lx9100cdj8p0w9khi94cpmj8ot29akayguu80ptf6blz3686mv3yo9qoncym5j7m4f2276y7rohpq5mutxvs6m8xr697tfmaecp37544w33z56i27udwml21w6w7hascz512x2jkjsbjse8z1xgoby45sq8b8hbf98ov9u3xq1qu0on3lkowftc78118c68adgmpu9cl48tpntzbfovqrajwa1tjqy2k4mtukgc0q9d359jleoytdii3kmaygndbxkbr317dizji0ag1vz6f9oii30phx4mawc8s292nh1r1te4kack6n3vh4zaj7t8blggwzf8npf0295s412de7jksi19tdm0r4k09tm3ow0mdtd28bu80jjt6it9sgx36xw1ce7xoxf7inogtkvi7xoeef0d18nk7uvcwdmnv0pt07ma3cgzz7bbx1lf9si5umzc1nsbgdfu12pk7ryvs9p54ghm06uqoxnlhl2u74pt4wvky6otw82dgx83swh6895y0xaubl272070dvj9loa98q9i6c4cf9n45pnual4wkhq9a75ejzcwjyjom0ofwba481vd0y8k9zbr2n2nzuyexm1c7g7e5ag5anzuzn7aqn1hhd8epxbua2onuaa5snifi52ckdpbf',
                fileSchema: 'bxxxxhcseav2hf1vl8tt3o1ikg6djxgphrqn130uuwzd9ah6y7juf4627z4bgqifqx2xq4s5qlj5uuwtt8yeflr543r9unkt4b0nhfirn31m9lz0sospdr1iujoo40cdepjerxa7l7ch9b5bcnmxoqq2natpw7242t7mlsz0c8e7c98c10zllmbdx2lj101a8g9wnee8dhp2k0sxkxmxzqu2xiw0hdmg4un8qdxbqojygoyhpt22cw1sorx842wimet4v00r8f2lp4a90m783sjxgwdhp67fx5uyxpper68irbbayt26snwdxbhp24ki8nwckma156b2ju7pbw97syin3t81bb59zyzyvvs8rq87t2sx4stmnqx5vqatxhhesfbd00q8k7pe05t8wkxl5epcp5a2twibb7xfc2gt3qruskvvhzw5jkw679nsmewolnydetjr3uekf3n7qxffk9a5ehch21t2tkdz321ojwxqh6r7lyyh34fyve02sg3iy7ocq0e5v9jf4sdpxx7soaeo3uvehptpn72u7ri61k5yr70u5w2th3ua7g5hqsq4d6sfeb8konkq8vqda47dwvc1f5z1x0f8ja34e0h36z6lkrv8k2heoetmi2egbbl90u7pt7eb85jq0v1oyify3tlysn61u45ee3um8drxnnk9t4ktxxa38yavnqbjfnefmusksq2ty60id3yrbuc9c9zez88uwf3v7i0zkmsoagoux8wzff3e7dqxnfod9ow8tm5hrcxaqi1fxwc9h7vhr2r2mk0kglb68dham1kg3zhw9m6b946yr352olmn21cvi1d3i0vkrnes4qif2sfjpmjqe544bf7pcymhyvklel5tpongt0lre84h7lyg9vyq7xlspvfjaa63jrp8vy2v576ajaxo67crcv0ske88i3aln9d08clp65m5s6h7t7fisraoelyiu1d893vrd20rspo6w5wt3v0kz4trege6ve55k1s20j00s0d77pf8dwcu',
                proxyHost: '95zecwssn23zm1u5z2zfh9uk0yfmx7xg0g0b8zvoauuf2ibndts2hq68lp32',
                proxyPort: 8066418165,
                destination: 'sg4lreehmvt9nct4wdd6ezo12a1fjeidwa2b88e1zhkcvf8kpqww85lc2ugusqi4h4ecolduzingo8k8n0tqrn6yrnteh82eyj46gtuub3o6f4i1j1lbo2sify5qybocmchwakuqd26sv315hvizqw7smo829ced',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vy8ifets3c13alykw0e2srxsxeejbl8wnojbbjngo2vgnjuflo8ueckbwd5024tg0ehfkrawcacnzjptbiv6n88uw6b3v1ex2nbzggz368hm54zyu3dkjwgs086pkyz6qjokouusik3vhb1obrlgi7c88xel3n1g',
                responsibleUserAccountName: 'ysr19jbsz2e7l3k1q4ro',
                lastChangeUserAccount: 'iioe2gjcfn4vygq4lbfw',
                lastChangedAt: '2020-07-16 11:16:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: '2wj45mwz1bl2tikf9ftkwa3pt98varaecgjnkb9wwmtg4yf6cryba60d77kcjdmr7tu80jzo9dobgtgseqwvpk3kspmsx9lvztuukcvwfy08hvoojwxapwo1h6v7vm75xn65hrzyr1gzwlc0zpu50cp4b8bsd9k9',
                component: '84onpkppfs5qxw2wdktre3g6u9og3ctnr2560jjauwa2rvo6ngg194c9smpvthhspbkh9p5dzkaz99j040rlde7a1fouc150c0ckpwj2h1edpazonhj0d8ypa70e19h20um0bfn78duwq2tkaxrrtbnwu15h7hmj',
                name: 'tv37pfp5avm8xzueaf5gksd0d99dmrabbjj42x21rms68cc5yl0ql2jmkiwfkeof4stuzbvmegk140xlqr9qatl86ockbc1mf47dzyrud8gi70blcj3bnk5e7wnwnkap5gt7umc275voh571847fasqfphb47mpp',
                flowParty: '3fask7ol0jitoe0x6urlngov1na5768iy55oj82fs83b3akbocrtq8dkzlu8bp91yy20iwfzi76lxnk3xvabd0cg0odgfb3dwzzjx3dunpdviv66x30t1zvg5cr6u6fs1y7p1ysk375zcs5nipqcybvfk4tkzft8',
                flowComponent: 'rlb306iydh37412zamunu20ulxcjnpntnnmvxor2pwri10nzbj8cw8jkjm6phbv1gxdffk4w0ef8x4nh3du3w06h5knv957aol42xfx5movtunn6zz3c04ovwvm1xmcha5cz30npctj42p9bj5vurfhkq87rxiaw',
                flowInterfaceName: '1fsp2tgwnmszijsmwbda80h4g8kikeyioqom92cj5ac23kf83ngychngpyp5t46kskih1fqayi4tggxz3ih9rm810a0hni9s1cxxy9tr8g82vpmvxtbl9pex94ihgyyirou537rbsjp2dwx4f8dpxwfyutk7c28f',
                flowInterfaceNamespace: 'ud1y7obvd78v13yiwh56h839vjooldqugpf2kce4sqso2veqa84c15fauq5z1idlicwvyq0nqhgd0obiw3o0f3imox6fjuv4jlj9cftuto6k16uoqrq8aiw1bi4nf8lxuouvp25v8wlns6rrli7a8rmiugi2hjkr',
                adapterType: 'keu489dc4b5121cp1evc53oqmuso79x0a9v07yqvmp2r2an7lrd1vjvqh0ka',
                direction: 'RECEIVER',
                transportProtocol: 'dogaex85ni4pff4xk5sqsltyozmuphbop9u6tuza4795adx0gypltmpvxr3s',
                messageProtocol: 'pjw9wb1x5ibv3byu4yduxrpkkczj1jwmcfly6v9i6cppuxe86kfm4v83rkex',
                adapterEngineName: 'myau7ot3o9r5pbkt8fguia7lztvzyjh6wwv8l7bfk56pjxsof33a59gs350v58ws3uol1jmloewrucx8phf7qorov0zf6n3gjgp6lm3k51msy7eorb2uasr88c96dfo27x8r6qpzjpthnv09198w7w48f5jjoliv',
                url: 'yr7zqq0wtk48qhqr1pmu5x7jh1kn3hhrmxkt54sivugwryn92cy4iohzpt0mmxi2kh2t0h7gv7ll9hzogm2xy4djcb6hndjk92r4cao66jj2u2uqrt54806wn71wqlhz7edl4lw231bqg3ys8u6uk82cdlqmnjo02uukkilpg46ftwhd28efzjppyfv1kxm30mp6zbj49tuc8183j3eg7ujvqqfbemy4xu7v0b6ra5a8919glrtevl10v26x56p2qp1t12b3onbq6fs9e06alffa3kh0zlndojt8pjrgnmj7xlf80t4teu8cg0yfr96e',
                username: '7v0oqdekn6107mt5jknq39770m8o0fqcpkkjy1p7ahmu250lzeol0yut4zih',
                remoteHost: '78h7ni9wdvgyfsnpjqpj0vgkuecfcxzijvx13uwfmhsmmocxs7jg92zlcnoyvsl2fser2ktr2itbcav9x12o7pwntxgn68dsc0njq1ze5ysmng2m4u9iywleddjvo3zryf6zkg8elxr6pu7qw1289mv57f8ibzw0',
                remotePort: 8844317143,
                directory: '0t3n0fvwbhmlj0w3j0a2hninrdonulwqtkt5gpr104vr7mm0ecf2tmsuk23uk1ijdm2hsn5c6qdfh9pb72e4un7945zwl6c0z6vdy6ua7zc8doslm5x61uf0nur1xqebth8o4alvgk1cvqiv5mw6rrg6cwbafrcnhdwqpoozfwqq8z7i0b2ixucoizsq8zenu07aezj18i1gvudpdyvhvrvksevp8k9jqis2hbq1eotvqvht4mscoca3r9offv6m4zu4w6r49w71a34uyjulphixxkqzn4yh3jvz6j5n8sklf4ducwj98o4l73e8xd476h3qj0d4apti6cwo6iu6dv3fg06trxc9dbiszvrzxztfutvphpkz0s98jn930xl2jnzakmiezry2o4msm8k7qqp3b81kwit6r0nwz8xd60k3ckhyf95z94dshlm3caull99bmcjsvyobnccefnviwbez8k8xg1h6pflqpm8d1bpyf8ulngmsxyoqt2wtk49wzdxslyif2nzxvzgtcyrjw0y4kxnljp0cutn7r1bxv8lrqlfju8hb7ylargrs0rb823z0bsjm45q9lvfth2k93k1bswf90xpoqa3s08u9geb1lrkwxwfkdwhx4b39zzrz846r2szi4r7rp4bsm9adjs84lmlyqjwrx8n6xa6mi8bc35shd2y2lvnj57wgpxa6qpfnplplg0y90h7srshpskkmsx51siul954puzyw3t72agkw6a4o5e3rd7nayo48n8hzg3gww67yr6gl2jle20y02mxwlptmhjxruknrb9itvwcohz3yrb65ku4ra8i5rc7fhb7cmyd85q797th4tvtrku97i2e2s91q95x7pmoevqaca06s0fyzjz8au5lqhl5w2ipzqyp7osnt62d0ma32gogi2ilmqk2dj40ori3i21vtiipglb251d7x2dpp4gz4gvsk4lh3d012yb4pfhovom46t5i577vimhiqypdhf67oqsg8vyktycd7yoee',
                fileSchema: 'gcsxvot0kvcr30041c5znsvium3felulbu7azcyddmanoc68g0q9nvnhoogqxw2txs8vjjw9xfd0t5v0dqtc0jtor8dgvwtdi4ovd25m88gm94ivrefdabln8yn9yiwyjr9xo1dnwd4fnhignlfzu3onnaqvtxvbys53gebqe07l612nw5c4jt3t59aozzeo6sqrgv61s31ek8y3e3bj7qv33u8wkss5i75f3zp9s00i65uxc7y28m1yt3rmxfova1s143yime9jrix7v823k69fue49zyhh7ln4grgf1ykh4hx82gnksv6xe5vcqky689w5qzvplipt5laz07ee4656nlpl9ew6xn22mf58rnd2oemx6cmaltbomu9npx5kabg0bftbmcwgvaegki4xvm5x7bfrfwln1i1haf4j78u804rlad2sdsbk3n3u8qhecr81jclsjzrjwsdf8gooq1zyrfl2b29dfu5b88ng64itzzea6sic7q3awvf15vkdm7tufow4w14jq8qn81cw9immnyvn6esoopr99ujg96rv79tmp78lnhc5w5yajqn9zsxpyci2thk862ztobke3yc1s4hrzbbu2qlg63dkslp29vtq75ojexjs5cibhi6bj0yktpua45gy7ywr3g3okp7hqjwikgqv6jxrh0yorgv76piyaka46c6mxvw5m1kbjksamdgdcen6mb2r8d0mc66hki012mww8qolsg7z544h6yc9qcduo2j0ore5fknoun7j0fqipki90u5hjmwjejtgwf5uuzngl8h1h8qle7neslzzrf9i91w1kxwjzyvz3kqfwg25ao0wda6lfypc4o9pli0oc05jo2y96gvxj8fluqd3f1r9ptih3hd0rsz3qb9p7mxm7aewmhxkizuv0vimgnjpgxj47x4dwfs097itufu12qgevqveeiphppzx9hu9xr4oj2kx8zv2daisc8gbexqijsmtnzkmqcsx1h92yx5s8pewc29m1jzpj9sq',
                proxyHost: 'efk7nn3wbtp8cp9nvn8npsn7acxcptckuicse32g7aifvlanzksuo7met638',
                proxyPort: -9,
                destination: 'wp3hbpnjuo2dcz4dpeo797vtcl0uyzcmkvbwgipa11ces09g8ylutce37hiu67i0ej9flevyzpan3tw3u829qq8mqiwdbwd69ratnwyfaybe3gpi83asygmbtglzwi94gqfj19obkr03z23oh5v8nydf9mzggp99',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bch7i5w2x8toki6pshfb8d1jypv0gu80d6z2frira3zhyyhnpzcrnuvwubs9i9wzvcptagr3ukhs8e28m1cmk3xl71nraxqx055q4p1ga95hs0flml1mel14fr4trqaq18j1x0jqe9iqee6s13dkcnlsyd9t6jii',
                responsibleUserAccountName: 'qsldp6rrlacqkgdnbt23',
                lastChangeUserAccount: 'tfqnnl7svop8vig3uweg',
                lastChangedAt: '2020-07-16 08:43:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 's2jxptvwg3tf9aft4pr6rpiuxwyn7icvfklrl389dft4dse0qiqkpzyj7bj1qjp324wyya2fkj37qth1irse3l28yaucp7sgnycyt1v9974kk890xpi5adgqlwfmb9a3mutqxycu2prvcrmcfon7e0hvwo2pfle7',
                component: 'dg45yd7pa763hzt23i6kyijpkszdf25sjiopaauq7p50mxcivx6rh94lf4q0o8f5xx1k5semen3k91s69hp2mqzpwutpnv0xs0bbtgw8wzhtg3wr1akluhepxqdymxcw10bf5tkl9re1jn8bs23sza4zhq93hy7o',
                name: '5apkzwb54ewdahuyahhacuwhuvz76q80kvyj3duok34z36nrt6u74n2dg0i001m0nh0bmmeujtflqzglmasbq88nfgy434bugsvgvwys6nlmi72xr550cc3pbh8076jho67212ccqwe5jxjs1ym3n57awwqfg4cn',
                flowParty: 'm3n0di9tqzy219gb66vhxt6ixs1j7kdiu8nuspgkgma5byjvcadq6ffmnkrkoxb04q9kl4srvvrsfjp23q9mrdyetanl540eft52pl5t2wiipglvccdqk4ujv2qh3z71gxwy2zfzcnj0csaxzn6yorc22ntj0hjp',
                flowComponent: '44s77amoo1h7fzg9oagwbyfcgsd0gxnnc2686lxznufwkd33p1sm8n05r1uu0i1xbjrp8c4vr6y4wlrgl9r4pd4hplx5os0fxoreblkw6ypyzhrlvesueiiivusfri656xcnfng2plx6fg9ruok6s5gyhb9zu4br',
                flowInterfaceName: '8tgnmhxafik3wlv403zjf6j386up4q0cyjswl807i81uip2ele4qa4afnzkiydjcmvw1ei9rdgkmeoo8d983frgkvja9q2u6fk7bnha1206rn4hh0pklt7uxb8o61yjhbg5crgr0a8x96biukyvfbi6z2h3pk1e8',
                flowInterfaceNamespace: '2sti251ubt5qqkdaatq2e4aix2eggvcocpwu8d0bqgs9w23bfw4kou6ougi2q4axwv73tp8ech7nflsh5bovjz4y08onem0j57jhprwgskix5mscjsifpozgtousqyy6ygit2vprg1iqqu4a8eldqkeygahaok6c',
                adapterType: 'kul87ziwl5bfic3kvatbueqslwut859dis5ygyvk64tsx19wxln0o4xm8vvg',
                direction: 'XXXX',
                transportProtocol: 'c6pz2er6pjs0z3kntfww60lbbb3zt9oheb7oh8mp9sr6rzufu4qdx64upxgy',
                messageProtocol: 'iuzz62itj8v0celycy0wptyjiikcqzigkl63e4w17jzkdzbgwzvg5dwemnot',
                adapterEngineName: 'agrkegstoren2wwjscry3qtmytt7keh85v0mjbwotqznc1hh9kip70a9lxfcvd61tpc0i1j8mom7cdwc4giv71ae7torwokjxrjx1vexm7vxnk0fds3wulq48e7l2kz1iurd2jws2aptpxnlqjl5x1i37xuqw2zc',
                url: 'fvv0psc7rum470f4z7dne4c5ydjezzgivltzt4mxed0c9pdhi7fe32uv7r84e3abunpgfxstgg28mzzdeypzpk6wprp0m8ci0anj9gmaq3pyr9rnznlyj1jx4hs52n92fprff4d2obmq2liwfompqeaesc3xbisp9ukvo07l15nl1uts69n77xjqie154dlwzhzngsculs233rm1za0q1v4kvwwasrc3nqs8b2ym868mtdx1q2sqjlkbo7kroqwf7v4qblbjobgk1x6crs6gnz2swmgaqrqyjlgcjmxmoexk0jl4ojf90jzw81iwy9sk',
                username: '8qgkj4dv26bqp9scq9tou5oc7prxz24wg1ozx9sa0lwg2tg5969uwb8a3vf1',
                remoteHost: '23nrfceqnl8f7omvwvfc9zh9v0hx3yxv4z4cqmz6tlvg9120mzxivlnk01b0j5vi7onkgat3xiokfsviv5o4f3wyr7yp9uebxcc7ujurclxfi3bzbzkwc37ktxw6zubd3zpal3r6gqvylf1m4xcjiwhmnyy3f4ze',
                remotePort: 5206536684,
                directory: 'li40sm9twa129ytlrx9exsq74ezea44hu52b6ru2eru30pqyeciqgxoobz2u6h9viw9f0cva8eeum8a53nxakeadf9ohb6i6o6zntccowylelaph62tcsl447yyxtzd11j5fup3p7857re2p2l7ou87ju4djveco30gmby734jwd1zh3s3b0tdjahnfxzzbzo7w7i9vnvdgglau8kwrctssywnc4552003422yfbf8zcvif5yxvkfgecolb7kv907fh8ti379wpo06oqla6mahtz4vwyovqisxzcoqiljvv1ksjm2i0a5kp2u8vebgy5dgcfp06q9823lyluj4y21fcqv1j8t0itz0c5082bsj3eghiky5zsgxseeb972hw1ujfww88jnbnbpqi5doay2886vrq5jlcu3xg4wxqoitxp66ujt3vbvhn5ubitf5xl36ttbe1ll7jrxqyyohfmypuzo77a749jvnpzs43f6vnfyf65bc2t0rmigcryzirjnyxrahwhvoualxpdd3fz40v0dbevyqxtgq13obub9hwefyiqlj3ikp9z8mwmhvmn62q4adh7ljcxrz3ztzxvv80hq1dns6lydhqlnb9o9p4fg8lha7ejm0v4ijk3u2teic8ggl94teqeuj9osgk380bvmmbumn48kmja8nhgjl9kj774uy62hlv6nctpt143q6be97pv8av3bd2f1ufmd07m4mxban2bll5sd7ijewfd4fdbk06p49djs2y07qxs2dv80mvt7a8e0s3ayfssa0cky61u1a9pa48zrlvpx53njpazdpjjvueuk43tttaepml1qhsqwrxlueoa64dau3pbz5574nhtmvdfwwg0emxedarut7txbyxonwd89urof96sqjkfdwhi6c5ytdum5l1dzjcrc810b8pa5dr0xy3tq1rdwlyvdbubbkdv9uskwq1119wtjr4yf3w1lieavxjuxu7o5gjfnfnz9m09w2hsbfzf1kkqvg2h8rhq6ipc',
                fileSchema: 'ugm992nzw1jh2z7svlwkjgxn6qejyzjiw308nk5juyp8prtqn5zjucvr79xnkdofgim19qqv5ju6m9ts9abkwh6iasvmaoairu21t7z80ky3iw5tzoqnqvq7b81i3wjuu0pdcbxbiqzlc19lag0wazevvrg1oliyru7gcd4iciap0sqozkqp0zqv1cgvmgqxo4ekijg0ivdezktr53qvn8nli88dt7jqhbnzgodbgav0ea6obwhyu3qm4nnfq9uif5y26n9mnjmnz39u53k3f2qkliytryc5ygowszr0xy03obpcryvt3vhugrok6r6ykv8kac0tq61vrsj12gk3dt9drrlufpu5c095frjxip6v4sar7y9zv4q125lqwzs0cvzcklrz1n50l3j8lq93bfleoewg1b94473dvmneq33smjk5vfutyzw4t9tu4zredt0y9w23emyn460jffrzaj6mdz0i9p4ye0deq52814pr4280vu3srkkh5oxbhq0lnd3c0t3s5m2xg3z3dzyo38ccwoynu2t5jlknh2uk5wuimqlpeggt0u1o25wfjf0qe1igrg308rzyeofmwb5h4s9yx73yk1rxulz18ypw2qzpfms88x2hls6k718qcc7gx4v9lqu1xp0tioae0hhpuohvjng2xluweooy8y9mas9xb6v26dkd17uhntgla4s8wq8b0q53idt9rcnw0bwnwaihw8yo5k33bahnygzyoiuh74cj4rgp631e22ef9tc9iouxi46ieda29ayv3b8bbr4s5gilurlaoxpqcfdu7i4vkudbi17ccmavuyygggldltg4amuuu7mp7visk5rvugw6joztd19uynxtb0ksg2eoly87x3tj8i045qvyzrgv7y9lf8zc2yzoqne2aw33cuvys8r326vr6pfg2nxj70je51ii89uhwv4hubs44vww7dlzipmw6iu0mn4keu1p4rtnz9t9t8vjsk9wtczvbczej3c3a6b4tj4gbjpljfip',
                proxyHost: 'kw5jsf0f109zkgdw4yqwqt3vpcnfhntxc95cehpteu3l2nmm1vnjwt3cjtvb',
                proxyPort: 5219863254,
                destination: '9cl9v7pal7mt581deko7vaopnflerhd611oarjmlfpq97eqqy2rb05ze6pmvvtz608b4dryqtkqt8ougupef8q3lmnrxmiaoudo291m52fctydix4f9ftdmgeamohxd417hmessnkaqmbdizyl3guy0fpigp8iw5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '52zbu0izsxvqvno1d0kvdd5ykipcxmxubj1ptvlqxni1w5u6zpraxqkyw3hsj7upzb30axkvs4nkhu3qhy6uc0rxojxymzyb4gcwf5wbklo75gf3aufq2b8xl214665uuu2fq4xq5ahqg38dsa5aax172qf5j233',
                responsibleUserAccountName: '4z8g2gv8p8ovmfkfwh6u',
                lastChangeUserAccount: 'vb59a3hmzpl2rbpjl83q',
                lastChangedAt: '2020-07-16 00:10:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'ww5iahu28ks9blzsyausugpvf1zrcijngc7zlqtx656xo7s40ggnbwgpbpv3ggzyjvg4vf7iroxzho98e80gzsvngcod0khkkyd2c1modibukqd0cp6e11uq2aguny8mvz420do647y38lw4vah27azd8otsqbsa',
                component: '4ajjeou8491mwbp3f1n24g8u27zvas0ika3os8e7tamjg0b6bzxvuf0j6ep8acgxm8dkh4sr28fmt0rj2vyvqy75v4vo8g3lg2elpk964s1sjrav34npx9s6pgfrxfd4pdo15bxvhfjt7g5z6z63uzt25hirmguq',
                name: 'khv20vtgt9a7rd4xsfxw30jfcuevr6019qnnjles18e4j5gpz7d2a1pcww5ef85ybp59zjef9adcubud69kpw5wnpcflb04auxx3izip2yiyimyuh7r6slm577hefnohoq9b421oupt6ykoa40j57xktoyithzj1',
                flowParty: 'v5xhq90dd14mc0d1s8nlz1gyxbzz2e3ugi6jiddxm5k7r7vvs30ipplmbk7ugajwqyikiul7j8d1jwb1go38o3dl3h777rsz5m113meej68yn4jd23tll9farzxipl27c1l9ptxfnnqwp16d3vdagb8iqusggb2q',
                flowComponent: 'nygxuzxpp4u4obihf0wcp6vtmrzm3deo1t4xh0dmlmxskuhmqmhah8noyhpiq9kn3h66mnpy0w12m0tbc8w5debvsjnlqz2khtawa5fy6xtq1nxnykgdruta6taium8uu4lm3jsmy5aapcpr3tel6o9tz7byb37u',
                flowInterfaceName: '8mvz6acqpd2d54umw1mmtwge5q7i05svh0ters9pt0cevwnskwytxtv0ezyqq216fd5rj9etv1i92gitcg69zb522x3o963v5hwjhnyvhiocunbxoom811ipgs5oe7f5e6zbwuux5whoh3thpmoiuzy0t883yzma',
                flowInterfaceNamespace: 'vdmpb457zgwtjhk0ye2axcxck3zsuvhya0oge5k8emqhoj8c6rn87fwlfw63ezyuy5rz7ffhp6haddlq6kgdtrqsi3z3561zblrr37e6cu0nm5atfqmllf3gxfdo4trod14rtxrdydfup3mzpcbdighmgxs15iqx',
                adapterType: 'fqpasl3vc6dtl9la31lhgcqpjn4n8i10z0nfl3ec8l54hn4x29ouu1xlrucp',
                direction: 'SENDER',
                transportProtocol: '0e5pdugjdps6y54b7hir5s9jhp47tqha1kd513xwrft8pegj9yzlcth40w2d',
                messageProtocol: 'o9ofcxyrcbe08sj3tekoflerif9qopv70if3073eo75910nzimsdoq7rf0r6',
                adapterEngineName: '4poht9iwbd69a9z03eu4ce4ipk8109gb6eh2zko5n14t17trfz868v880rzvjfdyvfzy7vajibglrm8vjo0eb41oir465p6c7kdleg5yhuopicz9xfkks02q62wa9gvxdqlsj5bef54yov6y0vxhk65z7hw7cgoj',
                url: 'ujpgtumo1f9iva4ru6dne8ay9qdxa5t4k31jtk88oovaa1fqnrw6h83sm5iyug0860v2h0cexz50dttvjsmcbus4mglyd9ytcsm7i554cjo3pce6ofke8p4vy6xpumk9k6r02a2p0q8ka4cojds7mo96aq9t5ewtfse0eugxasilw2f78jao0skwcle0v57fsgnq5rvdlf1moimg6xhisk1gmexjv5ik8blnkbzm4bvn5b8lh31zpru0singtl2jo2hftwl27c93w1ccly7f449m8vk9nawel3m190yoyo9i89knlsq3qunqfvr2ewh6',
                username: 'hsjotpmny5m0422kngrnwfhi1dop4j8tykh1derwl30ns03kh4e9mmjujoha',
                remoteHost: 'qtwzslwmyhd8q7gldv4nhmt1o85z9wj48zbpzqbdl5h7hxbbg5jhehhtiudieeevunncrseko6iqopv0iqjnu9q25i2qnfnz61vq2ke7o0xkryrr0l86uz1p81crcgwdmuk29tgbei8qlzd963e5xjxfgpro7xn0',
                remotePort: 2152108624,
                directory: 'pvp7gxu8z6auo7dxghrof0iz4abyeand3b9p3rez881zxr0u6urs5v0pr1ajii5dx8n47ndhiv2gerinm58na4phqii1d6re8lvticwfvnw575b310sivuz7zv6625a86d51xk4toed7mzvvnxcmv1qdxoml0gi63bsz8fqiw6k5wlesefucq8xp55z4vb8ni7s9erarlmohuun7w36i59dgmbairlyrvcurw6rlvr6r852plehzig6u4zxexd9kmgkhnrql0gav3xgcnvwohu511yu3bl13lpmsg5picr6darczz2svr663o1z7npot4yhfw9mhmwzd2yaxwasrcafogwny39rt9cofvb5ipfyqe9zo0pcdg7es4spgvnuiqbqqcs7rlo2yqjjxb0hjj56fbsbtz7e32pn44lqdmfw8ic5mdkodw4oy8390vuebsjppaqs680a4mqxu6syn94av9oj16au74vv7vvskkba65nh7ic2u2tj7ms5jaify8yzbw8auh5hyz3i17op8nhg1htcymwr4qb6a86tah85ul76qxs6wk6aix3a6o5svvp3my583804umyxe07q1rvek6zuexnug9c6ilessenvro0dbldyrhggokklayyi2b6hrqr65l3rqzlrhd6jz67vbt0lszq8yynibhmzve6kyvjw6xyo9w3pqy6pw5ywy2ta9vng1dv77nkdbkgqg2wr61hysr4icrubd399jnbbqygmiqxkzuuga2dqmqxc1o9pdixow9ng3npurpok1ct3vtexajwli10yf7jeolta8w7hkhpevtmxuyq50lqiutfztl0fadmnptwmip1klv6rvr0lzp77r1n2z1jdhgn825jwi0bdjaizs7szog1u9r0n016se05k0wagsvftw8zuzupvbmq9i6n8beakamf3cao1f7umymvxe3ahlk9izl7za38vdfufaz4gm9gbcqe6736diiilp22fu65x4oe2maqlg93e6ki6zzenfxwsb',
                fileSchema: 'g59avwjx2devtg8o20rkuk9l8584cm28y2bsuyfv477hxvssb87ogs4tzcdhvzs7ltn700i1wrb4ptn64rgikib84dstzazokxatiotykz9vwnlc54ymsuza8hrf48rr5i97lfi74dswaqgbg8pwb17pcfr0gktpze6yp5mzck2p40ksqxnom7gagkr0gsadzfc7puxnzt3odo2nrnr5hl6frawkx89me2ir7m3sfuxnhjtmk68egkj5sa7f9qsc469wkh6frjy70f7k6dak1lxxvjv71l00u0piouyfm9ajeijolnjj3v6sl9qo8zil32rx77vifmkf0e314fuxl7ralipulhjncda1cd09k5kth9eaazjqffunsstovsfudpjdeat2f4wxpzfedshfhbnvkkcr373eekgj6wmvcsjdkmipyq2j88gk2zomyoynyxlh7t6o87g4raqeh37alikz9ldtc8rr15wxrreytp1dembc7g01b4g717uzjs5sv1icsdudkmaxeocfmmxd4w95dl1iv1na1bm2jh37g4c6mvx29rkcphgixhg3apbk6fv55y3eyqii2o5zr443izm0gcfs8985ofgu02olcen1x9s4y9w9kkp3e9d5fm1f2opkt0iipa8ysamb2m0fl8nkdok8svz95lokrtt9ccc7irmrd619jeegkucst0hlm5l4ekrpfubm70taihatsqkxxubawb48286c5w7tsv8w3otc0miuze7ykau0a6fa9h09vfsi182lsjy1tw3ryccz31vbreubqc7wljicm5kg5weha3mikrxnxwvqgvxtr1svcdq4317kcq9uyyfgz56otfw0bf1vsdeoht3u4vzgoomj66wfeq1ekl19z469u8vwu832sn99y2o5bpp5tisk0u7l0wb3fplrosg3083xs6mu42oeuaakrqlbwseza0drs9z3you9r88y41wlus1s5nsvlls30h9soc0rk3mbslz06wioaiomtp7amnf0',
                proxyHost: 'vlxctjw4sy0aw552epyr2aovl6vk6k3rnt6rdzh483fe2kvrsoqfkiza5qeu',
                proxyPort: 7019812367,
                destination: 'jfi4shv94990opjidopnv0ng3b24a83shqkdiw1u3yplqebh7wkoplzku0lb8zm9tqkhza8yejd67nfqmg42hth24zx45u9145lxsbi2tvo3jd6trwzk0xq74dgycgb9qdpk8qft9fe8ruvpnuesn3333i6wttzg',
                adapterStatus: 'XXXX',
                softwareComponentName: '6m1hmhs1k435vjfocgsc4v7oqiaumltsqcderu25btc4e01gvmvc7eyxzhkg2708pfncey1mtvnwyd3ybigmoisvigo96nc5uwvi0e4x85odbi9iw5mu2fjp3e0km4bxeh71rawjza6asy9g5351kiybebtrk1va',
                responsibleUserAccountName: 'cgod45izoag7od3a01sg',
                lastChangeUserAccount: 'ke6m4fzfqdnznb8lxxde',
                lastChangedAt: '2020-07-15 21:26:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'x9nqxzggp6nwwtpmufolg2rr3qybr08qntjlprny55k46ykuganavv99ue6bz1up8yb8bqaxxta35j60speem0dxw49qcefp8ijjltffudnfveuqjh961vnao52ciuxyfl0d8pmcjmmfzzcagsu11gzolc94axiz',
                component: 'kla9la6ms2s1ss2yfv6w6l1mloentt6o7occqibjhu7bmr9ciznhkmap7bpk1dpgtzcusqlxb1tst5wvijx1co51atucwclmh5eb6p1g8p7zwpqmdy7sjjpl0iws2v9b7586p7fx5neguyw3qjjg67e8rclp98j1',
                name: '5tyr8grl1dunj2po62nq0ljhhw56j2q16ms7rltlzikidpmgaudlnxlqq5sa3awymf9cn3a8uifaeq8aa1evz6uj01kdfltw5e47bcaa5ti5mu1wxy4ub1h22gdcgcm3q8xqqoywoofdqear8h6y0rhfxbyuia1y',
                flowParty: 'naucgzfpbu3au2n8v74gtm103tgakbp18j742hnrspm1ir5bl0csvyx3ssz7nna379hl8dsq30ys7mwehi03p69htnllcpvj7lv5xfuryyu2ei13md8no9k94au8ky8jp00cmjxpejc89n6jrrg7fsngwj8xym0c',
                flowComponent: 'qmc2gbu6hv6vpcplaeudhxbp4d1nxdedfcdaleop46uh5fkd79b10iqcdsy0dzo8v30v76gl7y3vwnbr2p060cq69z1erl7fow42l1mlx4g7e7c3fy0ojt3lnu9ky2tep1gus16iqsqwha97vbi7zfqg9ugbzsr9',
                flowInterfaceName: 'odqie4flgohl7sdc2w9ndqowdgmsy5usakcro8fveg16mhmtutvej84je3z9929rhk77dvnelh2nipm083qij41w8ip4eohlv6qrm4gfz6bp8q0ik5wpn8n2exo60qb8ia3rhdivs0sgflbbfhrmsnkjdsupw77d',
                flowInterfaceNamespace: 'mg88rdl13r9y5y2iiz1v6dtmgyek1xwn56gajenlw9indo8ujs92wh7rr25ubot5kp9alx1p0v7x68ayabxw9gteb5t9z54q1wj17pwb9t4bjmntkhr3vc7jxp7gozxwru1mnaten1b1v3xmng06wuxnfu8h8y0z',
                adapterType: 'lklgfnvpuz0w5hixxusp6fmvje6hew1nnad63afr13ockvzejrd6q2v49px2',
                direction: 'SENDER',
                transportProtocol: 'vcrk2v88td3iapqrfjfgmbok37hz6tdpndqnzfyt44677jsl51k3yrqki0h0',
                messageProtocol: 'kfim9d04r02ocukcewbxwv65pin562d8xnjbcr5kntir39md4lxr6n843ahn',
                adapterEngineName: 'bltqttd5rg70pfw9jk8lqcvtsodowrg1j2cyfdpv9x99tb63j4ml5aliwc3ytp7zp5lhr7pgp8pjnnkozjajo5n0zw4yvhn2cl0yejtxmbkpmrl2k3lsua4862yjwym98al2jvbmd3g0v155iahvd1z6q1x4cd18',
                url: 'ty0v1jb16scvtxu86sm2t1ovjoq7subyuz4zhmse9gjioodtx91twd5fdeqsy3i5jwfsxv0ki5pi6ysjdzbcj7mo5qpmjgxu9nk8baa70o8yafjs29m07j2x57fdki46hujyza6v9a3rxu79dz1tlwi538snanaur8vlyo2ody8bj6v0hh3c9s39yhcs28a6dxuwdvatcatnn3ef8v15v1y3g1rivb755b7ir4c7k92s0zockuq6b78oua67kcmevcpwf7mjmje5qdnttpdojgeda0vtysxre1hs5r2l2svurolmpn5ukaj9a40iqcj4',
                username: 'cckq3ur47spwc33i1qfh5lq7vt2d6w10rynbi453czg2drcti1jv3dinorqt',
                remoteHost: 'fy3qzaar5iqnf5utjfm3mxrx9thndhce73dxa2ktog76uqmatutlwo7lt6avn0nqu38iux0lyhtjd64p4w60ch8yidevp5y84myglmbortgnoynatma1kbx5fohlpjf3evg0gemydju4azma7m8bjmox14gy6qx2',
                remotePort: 3068419059,
                directory: 'jhob53s5raso58p00vsg4dy95jxxj810pqmhdrz7ctt0kok1uuvkprum29xxnmt2ni9vcm2bwdo8dbd2g9gdxaagp39flqsp7ez3a6gkth6gtj4sud22ec69ca1nit52i3p4sj9myiegi4brat8iiqtz6of1m1gjfxgb5k973ezmezro4kh2l4nvglbbpfd5fwxyz158ymn4pd10rqru8v8qij4o8prcqz0mwvddindd2kn0uyhjbp8bdiegeok8l3ir4c8fhvzqye2n4d4dnvfklg7hiri7eg2uw9cgnfqrlhcjn3eixzq2a3my3ua4u5m490w6osglxbzf9axywwgbw5fme0f91guytb0psio7u2yd5mamf0sricluw02otk0h1m0a0k5b9yc4tjbgghuqec8j59sj26s0brv0gmq07ill9br8v1dc6tuhjn7tkqyov8smf3w4vk9f977brmhakw2mt3c847pgkechfzeea6war9uu50twpiu8arf03mwvvwm3lst9l75xb68p6epgp327wod5kdg73atxksybewzhszdaqbrlvptbsdlq8jamo1dce7dwa3419ra2sw3g1cavr82vdx67nsbvwsraz16c17qywpu8b9oh2smho03rj8zlrgol55myf6v0h1evzlmy6d1h610953zxlh9u6vv2jx25ir4a86d5md10w7qzw9q2cz6ib1ty7pje629cikvij8l1c7v2o2izy25gckt50xs5bc64ij0ek0t6j5lnjr9bw3chmzkgd836qkpbfqslvnf5sldguggr1ycmhg8j3vmy3vprsw119ar3lv3o0xvxq4xxa4uqapdrg1gdjfgh9l2q4z6owc59j4b5dchzuu3zr2a6ffnvjlr8eecwtiobmiqno80tfyx9a9ljn1446exszoiaaapotu4slubnds7ju469evcyfak13knpaeim8uwzbn3i5sk9ti6q7o0d385j4rsmydeq0mt13g3t35a00mtpb1bp2z2w',
                fileSchema: 'pxtgi0qsnwzpinabjnhyoh6n42hliawh7nsnp3wsor5u3mb360fprhyxut43m2ygjg8uihhczusjtyk3cjecbemmaneic9gwp3tz0k03tnswe8ifvle4czyolc8jhhzvvm6qy14cene6kfy1t77lrcj9g2p5b0men7ph2qqotdjetb1cstkgavl1zsfc2xhxhkrfs40lcdfnhbbo3wzv7gw8bl8xmjmzu81orm9lf9n9ix86xbt608aufnuv8ddfni82m5af77rqfhtbq8tqcet7cjihrw8npy34or4fe8tjxs0rgnzih9pqgped4hd3vxecalfuemkf32z7hs2zexrg8vxzmgh7e4gth56k7z7lma5rjdvqkkhsdpkugkqkqxszwknouujcm2rj4s9sio0v2p8gcv4bt0z5rib7ruat1jmrh2vbe3cmq62bpehuax3ukq6gzvwm5adm1e6lthvq8tlvxosxjp0tbnzvidtmkn610zikkcw10mnnqcyo6dph6nhchou6t7fzjnuy3nx776bzjyh112qxvkqgdviewu46bn9238p6q6241mfyzht2mdcs0pzoh5nzwk4kzgwlabhgr6j93xzbd0zz7o3vb0vwb2oy9hijxzcoggr9ih5jzrblm3cn39bf25mpkbht9kcf837vytlsi8fipawwbxadmo7qlkbf7h6e5kkajeb3me65dpa991wroigubabgyngsgji817829cnfikzrfxry1z8vz2x751qhop2wv9pfpdz70jrzeon5kupzipapa25jam41kd50zkieq04tjhnirozx5hn1e1g359cu4nz4k9kzyyqym2rdg4nbtsa3vqlb0i2ux4pfzse04emnguavv5u3a1xn9uzj1z4ax5njvfuqtjji3hwz23flsgae0777uus9r717lm4ntij84it839itbzgot0odnj89c95qvq06qkn8oo8329guyv4wq1yewjx5g9xi3culpetb8t9ltgnomgrg03bi3v65',
                proxyHost: 'nrt0fmc69u592zd48mytmzxq5q6rw0ib7s1xp1dtjgsa3qw8peetv4bw139c',
                proxyPort: 2046220364,
                destination: 'tlttxcem7fpiw1fk6te7h6r1fkznyck6v0vdmymvsrsgdm3887fxph7qnupfxnteahnb5nkpjia3e2hq4me5wm54r68m2dzmrswct4mkmid6bey86vj64liv0grt77nuqa2xo0tx9bu21h935zwi5qzsa1h5xzzc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'migj2w2l78qkn7iuvy3c7bp5ega47scn1m95xh3mawatqsk4tp6pi3f0su9u4mt8xuc53ockf5u4hx1cu90id575wedwbbw3x21uvhhd33fkqj29dw4czpw51kgisq0lk5y9r2ey4oj01oop3xgnaqm7ueo6xt4i',
                responsibleUserAccountName: 'd5at7dtajjdggfodvpiz',
                lastChangeUserAccount: '48gc8lbg3fsl7vwfng04',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'kn3f5u879xft271y1s4r2xtp86yc4enfl5xu3dz79usb9s8m05p7twf4b4wxkor0iqa0zbtejc0njgxwrxx8sktvamxcv48hb4ydu0vr4mszg57do5ej99co7l8rqzlzx1h3wrwqq18ko8gew3pt98fw6aqi1ps9',
                component: 'a26rhm6i5g60unc3l7ir4ysoxj2wxam608rb0wl0m8qc4tpr96friadnc4g6e0wwm3ahqjycd5q19a9wkvii5cy0ulldwi5r8znrzr19ht421tu3h2zc3y3t3xs9vkgm67qnk6i1ezsi2raflrgn2ezee895yad7',
                name: 'dgu75ik183ea4vizdse1i42amblbj0a22bdaj6jziu3ef3a1lqc9rg2fpiayda4qxsjdem4bap1xr4y0aplr4wgu6szc95j33bqge4ckmvdlpy0wp1m2e4xashdwxwp2vqcrmfsx0wqwmiikiuagrqz8gwd2cf2f',
                flowParty: 'tyewwt6tafjy00aju87sifue3no81yhiuvn3urjclnxdalf2cveyhx8vdligcr1ztq9lf4jlttv9pgufhod82pboi572jf5rgbo827s2l7khqwmxw1gwrfg791hnk56ba244xrfwzy51xw69axr82l5vwrdx5qt5',
                flowComponent: 'f0c4sgv4ldm8li6o5oqzxmf2npa3qtpw0386h5syqqd1vtjjphpbyf7ogp27gt6ltgge2hcqm99vk8c45am11xmtjo1b8lsg90jkp1igrrm8vj1zp992dtwqkmcef62255jchflvgqjttjktkxlfjv7kwftwbc6l',
                flowInterfaceName: 'j77s9bfrqs32gvb7csvdybfybmx0nibed4b5i7894u4aad5gjiks7gc90tt3zr9tb4h03bbtn7lzy2x8dqcqoz1kqm6c2yugwicuirenotnkq9d0ahoeqm91q117bxas6nm25sl13k7e1soo923jrmffdzton43n',
                flowInterfaceNamespace: '1adeok8yw3tvopgmi38f3cdtdr571m35zzbht254ygdc2uwohu8l4r1ln0m69viu98vkom1nbz3fdrsrxfm7s94jynaa0pq2ua4r07pex707acgbuo2d6ua2cuqfwss960oo6ocijbhykzh46n2adofmaad5e7bt',
                adapterType: 'kxs3hupl25ub12y6u9l8suvjyeafsv9ns4n4layawdkr5iofz931swk047jh',
                direction: 'SENDER',
                transportProtocol: 'rlxprclt8k36nzd2za89i1lxvjvt61krxa2fdn18zc48cfs12oxmybawu9ti',
                messageProtocol: 'i1oefcwk2sqbrhw4wvc3m0xiz1xesepr8fvkglh146dbtubykluqdg3exwfa',
                adapterEngineName: 'l8gi8wot70po7fvpxbihxg5suj2m2vgecbpdg59ssnrmdqk35nwjlb3fxnxt06q0p80bny55wruee0qwinmyk8g2h4tfhyuyqug25uc6dorvvzkcxn5t63ax5vf7h6mr0faye4kg0qki1bwtim8p92bzvh6ksob9',
                url: '57ozeggkrd5fb7je46gtk5vjglyv4ejmsavwcbn8ep3roujeeaon51l23gajpllcqc6fvob73u25iu7vuhftlupvc69sk4ixjg4l6fufhkxixvbn20fl0tms3qkj92y8je53kczq29c97aski62to5t8c0fvoiv4q15yzm94mxdqbcflfnsbappmqbphdmcjmf1tnr9ubjhpk4jxbtomejyz4v644dex8zqq1667nrx5c6dhiet0fe9wwc76zdcx81o90pz7lfaefzdopi6qiuz8v8p1zpj9bb5dnac4co9adc8moxdkqxka65pjo7dq',
                username: 'p1xew5r07lnse5jmfwr4cevt0wwsjdrb51ddp2gruc1mef66vh27r9yrqox2',
                remoteHost: 'o6joskh8pj7glfv7wc5ott0igfcoekg3kjgd58bvbrphzoarl9a39jvjsnt3r3rvgib87h528mz4esq34gk86tdyhkp0gvqx6su4shuq14hcw54tesfjnw73w2ll9dw9hf6v6jvclj822twrx8ep1o032ooaag47',
                remotePort: 8660246767,
                directory: 'wfhnew66zdikkebartmcn1rk3xbtnopcsfjel0xl0q4p5afxxh3estjx1dnjy3huj67v14p5gjl74sra8sfb4gobwlj2ggv0dih9itmzd42xkiixro6734gqubqz8191g4yz1ucw5khta03whkeb51bz8jy7i48tvlvxu9bos0jua8bca4p8v0ci3gnanv7c1rmudzzl9n57uzfe5gfusn3jub11wtfsvi4eh5kg58kcn4q2pg3rm4lvwvrq3bf4c5p8ciptqel3mp9xuvyfdzqegdyss1n9yvmifm11alkp7x6s4ad1uekwt9xa2q60m8mnbqkcd1nzx8cwa6yrefqucfkjhygxzfg0w4imb7o57z0v1rajaisa9pzp7x6682egjgeyn7lq4l5qodqoko7l65m1947qkv34tkjrsku6dhrlrry3sm5eravcc83gknqera2kzy9a2fqzqxh85wsyzdhrfgrum0pz8cdj4cn8psraw3skanwrpwphab8avgftforf6gw51u2n7ez5hrd8winl9lgpyeys8n216tp1gsww72a90r5lu3y65szuqs1qpb0eoyhprtx4zzlnrh45u7o7awy6lfikqkgsf7ybp17pjwj4zs2twe4oi9sg4xmyb9ein2k9uga8p0a9mpqldgkixojihkbjdaqfa73p2qczhi8etwaq016cw3q8obvuszonen5zgpp3bf6zgjh2icypovngw42s0j5mg8tlrnzxwjleyo2p6bz81bhiduxmr64qw6w2rt195ihdbaryr87u68mr65niqwzvc3rf187h9nrrqznk4qx1ew0llqnhk5phlmcggsmskyqhorwyf0lpx8k4y8baxmv6wm8eqjf283o0pdob4bffkoa8evfmzpxxbz0wkwwfse3bttcoqa221c0iqg6cgfp4a4w2zeb3w1c43nqbfk5qdsalznwxvibe23jh7wv8fcey01ta8zftcuuv0xtdh28dg2t0ydemkqv5jm8uv6ppjzpw',
                fileSchema: 'd6wxkz6qici2o8hgpcok0r9qdz4v086llhs6mvbad5bvmcmm54xywcm0j6wotzz8zzee6mz4uvjjuqsitlwq9akkr46lualxnejb6s1pnturtbmwt22mg2h7cu3uscxxxtrm1ktz8xglkaenqx63l5n4eynu52ho9zedrx7r1drsa701jfld8uio30uv1qq1sliq9udp27dln2plmb2p4rs53w3vhqnv0h38gjoyfxl1w7dlzqfy14rfetznxp6a1w67l1txu61nkkxweej0g5gagp4l67veubyyx4846saht1m1qnq2ti9ja1wms5zvp8h4x3mwsefhp38ysgrdjxqcaqpqro4zvffwv0bemv8teg6op70ob1hjb5mlb0d4k9k7a4h14jmvfe9877nt1mp7ajfa0ciz6otsyw0a11qhh6elisznclo489kau71k6cu60eb8rui3uatrkynykjybphynbh1ymosjy90ei8st7ghuw9nomj3hxgi36fpow7xbavqixkcxlaw6jtjfqyfvf08jhknw3236w08ot24z12fcy925kap2chxgb0yzwcxdtvw7o8znh8rih93q4piz5x6292oi9gxlmja4m2nibf0za0e4kte70cdbfrpx2dsez6ix646nx8138c4f250c1fi0w8c7ba91csjao9qi4c1i3uwnzi20821phcpoe7rivm3qg47row9ucil24ezckb3d1dto7t7oh0i8ntfrxuz80auigu3y1bcbb1ky5kattg67rqq6iosdslbcbrwx1z71phgs9oe3ey2rjh5xlfuoczf266niwjv5m14rqk10ev3rtvlgxitektj4osz2u73rnq0jjhmgq3hr0ih9jyzeroz4kvej6fsftmygsm50k71fsr9w6ltvm4pbg0z492cek5006jb9zlz91c98qbo82oahxc44gni0ntx5rlvmnpg4iamt6m3c3jtqwbu14mrfhc5v7xyfq9yapgjtqco4p0m5tyov191aeajv',
                proxyHost: '5na05fnijdtzosvrg8l7v0tdx257tht64hxu60vm8auy7kz5ieo9h3y74c3y',
                proxyPort: 6568275454,
                destination: 'ul3o2o6vh0b2pi41s75s3wxulm3ou3j1scfzoy7741ouv0m37xa7r58q4ohf3gn5069se8ec2dv6gsp2epxz588esbcsahvse3b51jo7vqkum2198qbjk7o3ycl7n6imi6t6knjilnt2zoq3tz792wtk3yktbawo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6g3h3d3uuhvcmg3c3lbwb1vsz758essw8ddu4qc5x6bsnc8l50vywpkz3n051wduifyn2z3bqkycghfo9kmlv4gsv1mjhvretce8jmzm12ekxg2m479gvz7fej5196qyydwb5l0pgov6jeijvmwbtca69kocnho2',
                responsibleUserAccountName: 'jnw4yhoogtyin6adie5b',
                lastChangeUserAccount: 'kt8cfu8wutne3z76wm37',
                lastChangedAt: '2020-07-16 06:55:01',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel`, () => 
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
                        value   : '26610baf-b32c-49f2-a506-ad321f68998a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '26610baf-b32c-49f2-a506-ad321f68998a'));
    });

    it(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/26610baf-b32c-49f2-a506-ad321f68998a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '26610baf-b32c-49f2-a506-ad321f68998a'));
    });

    it(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '03c2edbb-660f-43d4-bd62-145076a5e61b',
                tenantId: 'c1c168be-c333-42f4-bf6b-8e824c2a1bfe',
                systemId: '4b36205f-d23b-42f6-adcc-0808868c8621',
                party: 'gkipqeld1pw1jbao25g09ely6sgjlilldub9c35wxq8efn61q849garlla5yneiq9wiymwmt6dxsaniapplkx8d1afj66itc5c3nuhj9ug864qbswtawx1b996orifutvssdf6tm0wp04at4epesfzl978r26k4p',
                component: 'q2af0zyo8sk03utjal8rwalzdzbv613kdk1v88ndpljq3afnxamge7hvtx583i1yqbzkbpv0oyteh4ldvib0rkpm0c1x48pszb5lduiytu6neai442ozjvl7zq1tqca4eq7we2yh1803e6uixq29sdis16mmozyi',
                name: 'd0ri663rmfitenbqj6te0tk218hy44l1ithu4q7wtzfog8k0bi9kezp3ipvx0vaooehvb3od941om4v6af2ck0cru17li086v91rr2z2khzxfh6rf0k3sct73543y6rra3mn7g2ofojdx55yf8g0i5h5itf5c1i5',
                flowParty: 'gtnbyhjubdaoxona14ihc8tvhmj6rgqc8h1jde0o63n9y85fe4rpvp39wcxwvbqsnsu3alxvtpga48y7hn1iiiicgxoz8xngorfwzuxg536iv8wjd5ld3flr8oi9jojjbffigilpd1ny7e670hvvt34ywgiejsk5',
                flowComponent: 'jvm5w2g47g8596ak05t3t3xym3na1j6ghbxx2hxr2086tt65i20265luzbhekg0ieuuzsu37nb9h99brb4z1ydpavew0j915hhbgkjxdyvbbnysraz758enyhfgijpvz1fg7ala6554dr4nop5ci2m1g7br19byt',
                flowInterfaceName: 'dl730o4ebrxg8bp84z78eiuc0xu1ej677agxdlnof1tk1xzjk3pe4qhb5czz0edwhre6hju89iko02dmyq2q5mgqj7rsyi0hqe13dkwdvj10zajvfukfznganx4v28dp2dgg8xwfyl38fmfijo9c3gj2u9p8k14w',
                flowInterfaceNamespace: 's9m51vuvdr06cese32u8i9ua94zl9e1b6zkxqptl8yo31fuof25ynsxeo9yo64ikvscudwh7m4sve4x6epdg6ruzvpzt1t0jxsxrz73imiqwo1ef2ik4dzzwbkvmimevymeubrshc6z0f2be8alg82995gcbvrjt',
                adapterType: 'zzyy2rrzyeazp3j6e8g1z7jjf8k1e8xww7inocxwpblxmn1ghz4vnkbxt295',
                direction: 'SENDER',
                transportProtocol: 'yucdbrg0qvualrzqv6c4y7vgrf6g9ikd800dr38fh3ilwoxy8or2ple9u8th',
                messageProtocol: 'p92sgo14y1ss3fmyvwq258zzt2wt5pm7i3ipm8lgurxmdb06jiybjmyv2mu4',
                adapterEngineName: 'q7jjasvoonclsyanlt3s62nl0bwrsnyhpntnq42fi5dws8nwnssp9wzkhqz2zxxc330ztzbl2msldayi3qo5qqvif3yw8ezp4qy6w0fsvjz0b7c5q35ztiywittd62s73h1jt2iswvl8ivws6a1r0n2378nt2x7e',
                url: '6p14knhcalv2h9wugg92zq9gk14gyjkoqb4vu4e0vxlyzqpk6gy3gsdr0d9puyopxtm9fblfu5n5r3qt42h481cg0vox3ndzvjq8pj4pzm174yl0j5fv7jb86n87s8s8ihb8vjwx2kpcamqgxzlj57hm8kee3txr5tljes9lhoii2fcxjc2x34wh0dbwzd2l3fdqiosa90rbuygmozgnyjezb2bt460io4derfvcpcm3gjx7fbht45e49mgfu2nid42d0snsh85z7ju0xajy73e3hat4vcpkqu7eyl9tvekgz9yxhd4hz9b6cc8qjqgx',
                username: '0if9sjy0z357q0cv6eqgnrmm474dqcyzg27wok7cef4gcll1d3didw413w49',
                remoteHost: 'uf4cvuqi2plx64jpom113jss10st9o8s3rxk91np8z1yqlemfwogfae1v5eac2uw2rm97zi9xxarakq5lk1wge54w61njnhg447jg2nz8qx97vqespqh81ea2cnz0arhvu5ibz84kqmr1bftoqp0n6jq47wsxm5y',
                remotePort: 7452930487,
                directory: '9gzhfrwtmhs9psj9rss2nduabfymqxs05tevk2hveawkjkbpyam9udwp6htrr0457mqjrksanza40bcm7l1yiu3gin631fxw4nb7jk4pey2ecm7f3xw8fmgicahb8yif4zpts3r1idqnx0jakqfjqphlwe5n97k5a484trwmjh8w9o7s9bgahsdyvut7otgu16l4wc8brmkzgxgznbywwi7t4jtgp0giid696itq17gmcvz0vadoaiizd2vxsoptw7o7hobmmhyc33r9xdj51su568o65gmwfjgvk22k41q6d1gn2ldmooogd31chnnzld7codn4nuihtnymox10gllnapiq2k6blg2nqxp1119s15eeb1rlwnrckrz2ung4u0hitk9bh72salwp8owbx3cqyvpmcdlddy0t6shm87hq3fayxkqsl74rh0ws57arvlutdiby3k7bon28qtiiapz9byzly75ky1nn2rw6sqqyjqsfy8dws2u0xj6j2vgopfo8qd3xwbpu9m1yxt3uq8vhr9nn4t41x4zseuhijglcc43iciq1f6eollc6rorpaski11j7z6822lqoi9yhl2tt32vcxmunszgslw0bc6taj5500pf1s0qdqtk6j7pvk7383dcd2v12lztczdw9zg7kluljzujksg9h7ynhxna82spplqit4t2oqwr27pydnoj7j38y3gyej1n1ksjb9jqfh83a4mmrp3mnstvfd1ds8dvxz8e9cqc7g0a92wbc5vusrxt1754a0b6y2wwk54aq4dqfvb47s19nlss02ja19bw3iboo9zw9rsxdvy7y3g81imep9wn9d4y2bvc1ligzshwih2p576e6d5azclm4jpii301k1f0hq2y2qahdogzkmwtvxwf63btsvvjwa7fxdjgsxjxalbnj5i5rs8ywwekfoxmfhmwiikaq3d10nleiuuti9gar0slezucnex9xl1bd6gh7agt5jfxbozl14jc1y3e6453yt2yoau6d',
                fileSchema: 'eot1aa24oyjpu7jjeuvkh3zv383ckyy2sx1i6stw99kzsx3up9vl6q62hbjucuam69ufn6y29y4io7kt33nsg0ea8rx02kp54w97hl32uc3svencepfjlm0v4l8jy5zr01kycp0um72nj05bvluig3qepgk1wpn2otdgawy7ithvxzhd8cfqjde1wryk24adny5lj5de3lupmk2qnf0c5fhe7pmfdnqvxrpeqjo2s6x3boq3zyswsvhnrk3qmkfzu5l0gpzmvk5pke0ch75ijla7gpefxjioe5wo3ntktl5sq57k6iji5wtlxwxkn47i7hbd67sqtzvoi43ucl2ycx2qrnnidxskirkhwf6lke0088nyiaclrzimuhwdu8h06ll3kmklmvxzw24acpy7x16upudpcwms5o5m2qk0ood1z4647aollx4ikqyb7l00mlrq495drtl5v43spwxvc3pmrzu10k4nsyr002xt7qbqcnur3mv442ni44xr4eigi7pb9ul9x2ohjulhtuftvqu7vnz0hcm1bfeg491nm6cu6mp1bnv222ffoc0ge3fp1wp78fjc4w8mzvumqiso4vi18uhod6coqhwy8egqaf8ci30emumztclz5old70cl7o67yls9xsnnwhn6a8ac072j1n8l4rtnnwwmeggn87fjk08ns3ns8bts0kkl5ynq7t1lkks41r2p6zca4tmnziech54jny0rwou3s27qpkpb5jhu8myqpjg8ij49bd1mhf0fog7qhshe8ijihrohpk49gjpd1juysqks5o45bwl1wsgc4iqb4w9etywqf0pa2vbq65nkapr1k2968x2sq48emx1g8b9og6cdjsv8u688e9j9l630zb0e2256ih6yvia806bgtkwfcucjcy36tjaafkgmgq10pf6xa20qlaq0iucphcwkx245szw5d6srv66ze6sobcpcl26pi1rr39rg7fmksx03gd9heohn3g6o10wxcl8d6g2nidum6rin',
                proxyHost: 'ri8ay5kcjkblbvk1qon9utlutz12ny57rg90fpgx664y1cql800o2jig63bh',
                proxyPort: 8051417561,
                destination: 'pcfyiwipkzctbf2kxjg9l2fy0uwb1jnqqus1wndqnoubc6z1emq6ym9vrdf4mcd7p3aym94ia5iu1c7alw5g9snosaaf2glgj46i2llqc680vy2z72halsnndupoaw2eco4quexgzzfpkhcw2h9ivbevv02x2vfi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h1bb0wo3e9x817pl4owq0jf73sba7zhclfjopek9tsmbdfog9ikzoy3wpykklh5bppikdd4sje706akgiul6f4l4h38mkebsa14wdmhrz9dpkiu5vmh27gt0hv0n0f3nk6mqdt18jzixdcshffayxclucvmi87tf',
                responsibleUserAccountName: 's1dc7jmwwq7lh5debore',
                lastChangeUserAccount: 'g0rlyx6nx1ssz8oiwvrp',
                lastChangedAt: '2020-07-16 14:20:50',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '26610baf-b32c-49f2-a506-ad321f68998a',
                tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                party: 'o22gkqv6p81tuma1mnra6sb5qm66700i6hsv96k24flbtors7ux3lzic181dz449wtpx6qyv9l9nikchlddihe67zaj2dzuhn65n5zw5mh6jwr8fwhkur78c5cfwx5mj45i2m9ru8xmumq22zxk1kzu3jk454e3a',
                component: 'wyl47oe9xywlinbdae2il2xo29hkxzyy3etyce585c2v08yla6tuzv2glyc1ciu2ekmcs1rew8ys1ebw69klqb4pl5492dldhnnopm5x30p9jm27zv3msugvmlfesf0bjikia56mlnkcwkg2rsgtv7v1nem1vdkg',
                name: 'nw5025lyd2lnkgw07rhaxdy67lqnxhrnu775beayu0waoua8zwkcpc17h6xooiglu59gjlbbdl4i6wnzxnlav6bzp2rjgyxbo8b54xndhmp8w22po8isfrr4sal72858s6mnsvz0ohq4teq2vpeu92igozdx3o3n',
                flowParty: '0ss226pjqklzc73xgufo5c8co46ynvrepp9389rw2f9xx15wlluu1urkdlf63halsx7r18lxp0j2yabufab11q4oqgqxggrngiaxrw7pwnml6j6avjm5yuld5o45jkg8kqb5rnhosjc6wv7ok8nfi3zg0u479bpz',
                flowComponent: '7bzizq2q78j19l3jnhq37qj0ux5gb4bob09op2uou4ulj0hbfpfqfj0uxlgtq10cgrkbh065wbozj12unwa698e8607g7a02d7sa12jwhme2ylv6dxktqvudlc7dp0mhspb1h169hlft7j0n5l8wg1lmghxgeu9q',
                flowInterfaceName: '8qo47vrzkkz5c9ehwt7fvyvr8380mxxw60qm9ldhhwzpfc57grfatt24xvy3fph0j7qx4jy5312qnb8c7vhqx0w1n4qcyaf1wfcp6qqoa7lkvgyrf46o145sni4jzi12mvhcwj4nf8t3oeouen5w3u3yi5k0cnrs',
                flowInterfaceNamespace: 'ot3536x7dit8wxbirq2ec4j09w7lg5qfusmrkapl59zsdavml41rdipl9mgjdhiu7d1bwtjc414r1h057tcy7e1sc68cfga44cw04v0kznt8uta0mbsce6moxy7satcbnggvdtbin4n0az1oc9hmtkszu7dnj5g1',
                adapterType: '0q9gsr7zfdxlpablx763zrih3j540vn7fcsp4sjlqdk006r3hz796p9msk7u',
                direction: 'SENDER',
                transportProtocol: '9va3dyvike8c28olq07px634rj9yqjvx27nuty89rea4td1mkdjaij8vty5c',
                messageProtocol: 'dk0q0sfkucs3ago7yvwlgf76khwckmo9vm2h49el6hhuzxupx2fbevy13cey',
                adapterEngineName: '65habhxd0byo1mvwabi4lwmwygut4z5yl3od5iz3h4k0dqjkh0rtug2cd42ll06njtzudu8ahvih33kxx50e8e3ph9dp3zmgone847odn7ef1d1d5e8hqnhj2cwae1lb2kukea0cqjogfkd6agqpo6uiunx7mc01',
                url: 'd8x98iji6u6r5eg3xfoglnt4lndbvmfwlmlp9y3v1it8zd9k9makk50bkdyauxz5emdcyi2kt79cqbpfnh7k63ac26caqpp0ppinofyeviza9usqnsl13tcuyuvpb3kr3g8fyqvoc7522usu0ngo37c4ux8enni7r0uvddcd2oanrouledmczjknml70qrholfharcci6x9ni8kw2gtnoc7w7816lb20xiuu9pxwy6djbok2pkp6oynjzl2lhkbw2e7tjrfpeimje83hyiljlpjm8ap2ekgonc41xsx5h3iobnvl0lbi6n6vn1bx9vzz',
                username: 'b7ke8ita9gu7otwbvqcis4y5u9kyaqj085dngfj1dxuwla8xdy3g4gpdxyou',
                remoteHost: 'oldyotg1kincotocnlg81cvrcssq0puni1mzl3ewac61jt1l220fn37u10xa46pgwpefacnnavyaw8k7g54d2bathyak92h3z28dqriz6jksi9br274yriqzgkp9t3xktvmj8xfqpw2e8ujdgkalm7qhvd7lb66b',
                remotePort: 4937976705,
                directory: 'yl4fo2uic33bannd3jqo4pox8ph41yxy6bx0fa8jom7tsw36ruij7rkbjtbmgrncvfv62mb5mz0hivep7b5jpcu0y3840eb157fdm3pfrfveukjsiebt0b2jjgs2a0taz00wnxnc31hc69pzbor4uon0y2cjdquqixob2wge9ecsyq93xs3tdjgzofozfvgv0jx3wlswpbpj25h458pxmr0tcrdwpj4b4ajresyl8lf80zq09l0uh83ennubhxchirrikv94bmvfhb5x49bhlcbdbwjp815bwoor5s2kmzx1kmyo7tfe7plps2n4g41lm7gtnh5wombszc66suvw0qfs8nvfpg5mwq6ai4j3bcijfk24nxxz4sh5g92yum7tw0r8nudltffe4udpd7uzwnnpsdw8toe49iw1kg20s06hg45upvjgndb51eb3711eh1jyb9xw0gxbnbgb3w9iw3vl0dv38v1n7vuoyzaai3wjvjjwt8rtsc2wj19u9lw1nxel46xdnzihzfd6eqlruhfnd89mpva1xoeo6cd3c9d3dqcok85ae68bexj0tq84mkwlr771gwy5hq7my2o8qrtwa49ph5cw3wp3ef1nzeze9ur1p6bsstzqdk2oqqtb6s5s76jbrvew1v6qd38r2pd3zhf18vrueqnsrhdo647mz194dtdufwd1ye19in75grniz2im7oyw5l1mikswlw4km2u7msf9vhfrow6zl2tfnxrm8ybkat1117t9l92c6fjmzcflk1upuzicw92rkpasy155r5vgihz4kl9svfsk3thkudsz6s5wdg9zfivqgcww6tpjrvk1g4xdnnbemh2w85rcofi73nooju6asnk5c7tmn3lzt0etkaf52av5ydabkijgw8sy97lzrvjrskmzzoz31puw4xpdm77v4cimthyajw0h0mx2lq5oe48ojefg81s6jzlxv8dne79yht96gthe3iise0vxnh5b8ix4fro2rkb5bhs33s99lwvn',
                fileSchema: 't0usezhcdo9eg01ncf4nd2ohywacta3maizcuz1z6tmdvsb26kvsknj3zsje5v4ywxzhvvl0qpg7cg78ljy5mtutyku9ibzsmxgsqju0xauorhx86g7bymwqdoi2gqkccfq7u4vio96s7pfyjeic03tmrmtb1e3ygp0i8eybbaxw5vrq9ixqqdadgwyg4qehbz2hws2a79ee88yvo6f42s1gvlcwi5153fz6h69kgckei69wp9tmig8fkrmyi4vs1jymfsu8wpkjpvy5f7i9u4ichi0n69axg59igg5jjkknhxk976xu15wh4sjqr81gmmiuyobmom5hma8bx17ty6gmnqp7jp2796sai9seexuj0x5gg3cl3fp8ik20ewskeu8wuwmvhskuwoo0hliratomlrii4wuypb9pjxfwld13qffls1gzxt4o91d5kuponpp5ah3psz1prgex2b3oj631ud8uw3hr1lcf1p0w0wiqqt08wrzxlqqzrsjee8h7tp8ao2kzoqt3v7p9porv1obsu90o46qgtwdfn9ix29jby6as7p71rn6e5j9qcsc78dhl87cnln0lciwtrrsrto4k4lumk1nlc9w64dpxp5cqko9eqcs9av2zgfwlbear33sjvnybidv1m5v4e09k4kkuw2xweh44u4ttcpfnwg447suwygw491yi91ur6qceu37eyr6yuclsvijj5ckqn1obnieoltulbs30cnv0sk1moru1kwh5k9ormcqg5kcenlrppqc9bohen5cbxkj4zlkcy56ruz2c5raktk99imic4t87iv4o081adziy0hzihd5pihcabc6vy8jqypkpov2jhorh105uxq8iibihfsdkdnb6cwrm3f08gc4k7z02sc063bd920isqxg8e870synojuo0za44y4x3ba21v3ei9g5g0j3iaridtwge63pay7dyti5j1egnocdaurur4k6xp1tw8v4ie47t9wlo5677ksmny2c801ipiftai3ue',
                proxyHost: 'ltfkhlmtem1gq0ua56dve6s7btb4qo904i7m6iqsoenf421upg9flookqi36',
                proxyPort: 3812713808,
                destination: 'rvpgwc61l5g2iwk5uboln69yar99v8csin8f5cjxlbbgx03wdb63gye7j5yqhf9eq9nckge0lvgrv257wfnt1g5ntrkzejc1g3ahi461d97fuch2adx00ewqw67mlmqi4oodnnsemofufr63iwx0up1652b2vlau',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zoipknjuvrdsbledb0rhy4zmiu79azchytfh8y5hu3u7ntkypugsk9jpql58qjo01qlj8tmoqorxaf2ewv40zw4pmz6y6uyfzz0r2nign552orfqpolswl2r5pljdfgvltgb4vo3c0q7lice423icxtqqczahiu9',
                responsibleUserAccountName: '03l3hw1ttl30t6l4nkd6',
                lastChangeUserAccount: 'n6hpolxrhn2g8goy3jja',
                lastChangedAt: '2020-07-16 14:29:41',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '26610baf-b32c-49f2-a506-ad321f68998a'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/26610baf-b32c-49f2-a506-ad321f68998a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateChannel`, () => 
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
                        id: 'c594d29e-38d1-4615-8bbb-d7bf0754615d',
                        tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                        systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                        party: 'ojnaxlxlx2s14e4u7qz3fwe5f8q48ty4wceo232wy5qmesa3behljqp8vvykbrokwrbacxifnr8fxi9sbp79lhp0qymx8cedegzp31tph6zf5cq5no4yd9fy3wb9yg3tphx6k0ng0h4w7jdjnl78y65uywlkirhe',
                        component: 'aedl570y6uomo3upqszxs833vimg2c7ki1l8eco2paz0fp7ktj01c7ouz9g7jsfgiqic7k8xnla9wzthu8f5xp9cntxlqlomw0yaih0uledwzzlxs3r0pujwg2prdgzl7fnbkyv5xufpxr8wdxmvpyk7n0lc9xpk',
                        name: 'r7jplaax8bs9om89x7se9inl73egwfg0b5qb31y51sgpe6e3uysf6r5vscti74c8ganabpyvv2cm2lidt3uasv814ew7wv1lohg5f3kstge7qp8h4qdjy7sqx2c7yv11v9u0sruqvkgvard33392t6l0ljavuv5e',
                        flowParty: '5vfj9a1rb4slx53t47jawj458ichpg3l5rk1su560h6odctaw3spdt442rme4i52b7gigg68cmaw3ov8p6bkruzdjup9m9kxwg28s5pr9ntj2lwyxnlcby93mh5wnnwsu2sju6m3y4sxpadqh6dmaljuh9s32jgi',
                        flowComponent: 'skj6f78egzpzzefvzpc0bzrhqvuub3ip3pjkque0j78fcc6ol3vvaxrt4h1cw8yvvdegi73t2gdbld5icecvxj10nwvaen1xa2avl36rlgtrnhe8vmu8s0tkm468gtogfvnzszbbs47tij8r1pm8oe9ygc8kc2k9',
                        flowInterfaceName: '74w3yjwrmkir59flcj0owhjldos0gqveeasl6tjlaewlpzz7760ilmbe9d0sk45ghez42esxs7bimiubvg52e5l25opjmnh6099an6tx2153i85qes549m51k0tgzt779nxytjjkttfrt0g3q77d2c2t2j30nvo9',
                        flowInterfaceNamespace: '6cwcfvkokh75hilc3683991jnjs5wzxftarae2i1sku3hdr7pn5tjmw3a14yh3dhi73kyvgb8b7aotzlyto7m26volq626bxhn98fmufwb1vtop3bv64rbryu7cvv9wp49q9emu6krzg5yzjl4giqv6ca06cktg0',
                        adapterType: '0rnh10p9p7pkui7ahzevivms9ql2f4uq96km9h9pcc6uexnf0eg4opbw80pl',
                        direction: 'RECEIVER',
                        transportProtocol: 'rediqp9rn66xrr8e9872r8swgyyqjzy9sbzu9yiastbh3n2brcsblrs0umbs',
                        messageProtocol: 'mp2da70txuhuwmzrhlby6feynkho1aimuc8e8r3015vr2qo580j6395cw528',
                        adapterEngineName: '0agkqqf8tnlvqx2gdtb3j3dvdn6lkd7h85low4zdx3e3kppo349rd8l2lyb7ez9eyyh3aj3rfiuwjfis8g55ingk8vtqwc678e1j7knb0t2bhk8npfyc5iebdhg9d5xrz6469vw4dqzczskq4htun5hrimeo9bge',
                        url: 'fah1ujryi470b7hi66aq1m72ieig1qmu5xadjpqrpbigqvm5pfbbqph4j713v0mm98ppegb7ln49dhopsv700hlf8qt440wsb40tctvo09it16t2pbptihh87a2xe83y48fvr2gj4ei8wc22lgk7ubqc41xcs00zs0eja7dv8e8cbiqfxcjpmyhlearel67buwmnoizdbd5km7oxep83ubm8qaua5ih1ls6b58rn0vd903gdwx4xjkh9rixed5w4yh3wtkr6dr0uef1elmaa98lolfr1k6d01p64749w349o9dtw4uu1z0n193qry2xr',
                        username: 't6zsweg4uovhu2jrdkhgmzj159q2w6v4if2y1i9kjyp16jy3bqbrk0u51tl6',
                        remoteHost: 'l8nqoyk8v81namqk07x4nub73n2oaq71izpci9w2o7amxufh6zjdioric5v5hs4gp1kgtt75dn5n5rgp7foglb86pdh8u0o4jn6m6nz88nr346mq4ia6rv5qbvnb7smncxnmschhw3vd3jpqsq7kffhr0xovp4q6',
                        remotePort: 6837877948,
                        directory: '44luo0xc7m84fqumyvehp8vxunqh2qb86o205nl6a60567joi5o0jgwbzcqzt8enz898ope4jvynmvdxbmuu4jqwcn3d2jtpdjhm2bc62iwtkyiapmhjbeselehxq55l9ipz7wvqwgg6gv45qm2x5wenh2ii44k8yf35tyustytuixw81z23r4bicurzxos7cuh8yu12gc52ew222t64jq1bmt4jtttpbagctpqm8a6ov5kjpyevguc8b0qvjxwl9atc7toxyxd5803twylfj2erwkwqa6d3sm5n56b2r157cstegu15uuedn6cw8guoacr0uho36gbrfliydko2qzr1qbyujfh2d6ij7hpilc2v2h6ks799dy9tw0d25bhbl21bnrjoqlpr2y7c6k470db8wjkbwbkt9utyhfw9qx9t3q9bz4p7w46zq7msribf9q3zxw90bs1rjqbs5x5u6vkqq9u2zarakqs9ub2mjwpvwejhlc68h6degby2d8m3l2r7nbisehgehhixbro8vpo3ibn6ozt1bm7p780t2n9ek207tb52vd3gwgqtjsdlm9o5xmfc1zfi9i31r83wtamk2vp77gc5226ldt9miic4b4wyvhlsllkunkqb1b9nhwq80t1xxozn7ymis4lq32zpt5xglyju2dw76mou5zuv75kztpinrtsbshzvs05mku461nel5c0gw3lkah0pvcodfskd44gv59kw5bnlv32hx3z1jmq5mfbbrf72dw6wqtfz566vnzihq6h2nophdslwu6iv625nismvcihz6s1uqeaxz4vmtyq9hk4paqd0gf4a85uca9jts3f4wv9rm18eb28sbzf6hagnufcf31yjg6i236x6axya2u8hunuoqjv01qir839wphgovo3n14kb9k9tpdl7633y6z1k8v8pnxxph7qtlfhsl0i10fiumw8qaqcls7czjl7uwa750v0m805a96r1vsc03o9u6wjmnh7a1zk0n0cxvn86zfj5',
                        fileSchema: '7o0jeb80jcomhyrf1kokojd3bcney9r8uq820b0fwkfa6z2qfqcf6xibua1jbae1iea3jld027pne71qfdr8115w5suvklzwywfv07gvmh9nv8q15c36wyu07ddhhiseodkgro2an4tp3fubv9jwgqyj0c0fxaise2od7ygd0b7drw7iv3uj6hfe33iwcv0b0xfqn18zt9e60d5yyucg30mubu2y7vo733d8ln4tal66n43wjffkzedo5v1suxg2180kio0is59oaqo2jn3744kk13xc6p1ipt3evk0fkm4kpg2eusapjw9y9t5ef6iwcj77qlwvyf56oynb7az9jg0mc06hyf75vn2egz8vvcgwsjfukxs03ya4hifvzz8lpkqf46qgzi1lf3c923qij7d9kfrtzhctof4vjdpkwo5cyg78388wybwn1d3ix8phxyptb8ryuuirholw4sgw14cn9tkxo7ricw2fzqoswsbq2d4mgsl2x6erd3mbp4fym6w83ngovkz8t4mg7q2rytktzusb3xa61u787bppui42ajarm1hi8b7wcvceel0d5af2r8sz0q12gb5jrpllqjn9zdkzx7z3j7o9eek6p7lmsi82el6f16jqad9pvlfjn11rlrfuzubbkzvkk8s3lzeicp43tjymago09pvwzlnwp0ev13dr0lu60en9fihikttcy0s88iwpehvctvq2yn631j5thu5ln4nh51gw4e9mh7ml9ean10rjt9coz48f5rrvr56anc25cjpih7woc859pg1bpy0blgeitg63e3urtjc3q810sbvqxw2re82df7kkt5tdyg59s90qtf1z7khc2rsxt6v1u9is6rj6efrid0jdky15kmxglk0gzpto2h1yra9v8oyx4uklkss6mys3uli8t8hmc6v49r750cre254kd0cxza8qfck80v8gnox75l5ps98i1bto71kib1o2jv83f9jc5ntktdtlxhcgvui9llb0gj4v8gnvzict',
                        proxyHost: '3mfr93x3os4fjenla0junab7dna8op34cgifhedhbau92dz2tqp83demkd0j',
                        proxyPort: 5552393111,
                        destination: 'fkd4el1zgce0c7g99e3nmnnl30bfoaav7wc0dv1agbb5r921kwyfxxybfyua96q18eei5pe7b0jg1soo7p6fe9shyuknv6rwb6e6kszozc1krly6c8bztbsp6l9jmxh4qtboe4xf3nm9dzjckz4numku2v43swfy',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '98ird8sdc79nw1dkilpbs7sn0u2uubhrx3tev8cl5ty8dt9pgqohth6u1iyv7vxv6nivsedvhqcf1swovxu7c1ci15rafocfzit9u2aoia6977cwl5elup6lsptozhuy5ae7qik5hpdxthc42xbsp11dgjpduohs',
                        responsibleUserAccountName: 'jcq7v6cc9p15vr5j6b5h',
                        lastChangeUserAccount: 'lk7tb0annpby7hc6ov9r',
                        lastChangedAt: '2020-07-16 18:25:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'c594d29e-38d1-4615-8bbb-d7bf0754615d');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannels`, () => 
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

    it(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannel`, () => 
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
                            value   : '26610baf-b32c-49f2-a506-ad321f68998a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('26610baf-b32c-49f2-a506-ad321f68998a');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelById`, () => 
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
                    id: '26610baf-b32c-49f2-a506-ad321f68998a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('26610baf-b32c-49f2-a506-ad321f68998a');
            });
    });

    it(`/GraphQL bplusItSappiGetChannels`, () => 
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

    it(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
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
                        
                        id: 'eebaf23c-9d43-419d-b02e-a4cac836027e',
                        tenantId: 'cf1d2b14-540c-4933-b902-e78241750d2e',
                        systemId: 'c3cd1972-e74b-4da4-b425-b09ea5e716c0',
                        party: 'en6z3aab4istulkht54yazoxkze8zj3c0q6xv7845fpaoomsq9aivxek6ua7xy315ky2nxy0ijwj4cqflg3wa0u0cwbyi6gdcya26dih3d2y5f135f2cgerce5y4j88bahptic8laxphov3dn9mlmwptb63b89h6',
                        component: 'b3l3i7ks5m4qgqojasiatdu2pucrcgscoh3ywml0ujhsyanf5cbq9t71gzno73udfv2frils39sb3b241zo45kv68ysfvwnoak4my72avahyhu81nz1ffa08eile25qqhcr18tukup1mhasvuhrk728eue899kds',
                        name: 'p72tyxwv21pr41ns7qxz7tekj66ecbngyxk6v9jg5mpzjo5wc23tdo4hbkes3p7ckvrghq5efy0k6vznwlmseav036vnlpk7lbhl6wc2t1qgjinj55rswn4ni6bn5ifl7pii5hdlm8m87l1l149elbet3rnflafv',
                        flowParty: 'uezniyt9mp6he8quf26jsrgk4ttfu1m7k7yrne1kg65gyr0pm1ur7wwv7ffddl7ar68y4u3cfz02zp1ldg3nv8bk70e7xr21thyuc4om0o88y465wa6ihy9a2zamfqg0cugsibxpxla4nadx21gcpc23gh85ia6n',
                        flowComponent: '6o2hmds2q23azqszd18p2dhr23a18n64s72srlvi8sm8op8znck9rk7ix02cr2hnnvtzlwv9pm2diain82ps02h2hb7tw9mirvh5dvqmgob9yqi9pjfmihf4sz7qyahwmqruxazt5ghn8q82kerpviwgqe92qzij',
                        flowInterfaceName: 'yt4bonx8pw00fdy2n22ep5g4o7p6ntsunal74niw7163wm21ub7gd7ddem2ys0jceqqb53e01y7pad5pukbgja5z4fbo77a4f07u1lya2d860fvlf73b6bnp6bonevizfys2hqid7incd2vxy3dq0misr1z9ib4b',
                        flowInterfaceNamespace: '79kjmasli1iy5v3qqzln0m3rnbs9g6rtn7grmx2t61bu7ol5bbx1q0qpyd5p23gmuva2kk7s2hcy2b21n95j0k3jg28hdpjl548qtms93yzn6q451ohju6evoa3ovnm3ulijfsvi0xzp83xxn82rtihk7g9vkipj',
                        adapterType: 'ka7kr89dz1zlw7vyihu6pi4murqlpxxviz3o0bzhyn0lvtp5w5aenhp2gkfg',
                        direction: 'SENDER',
                        transportProtocol: 'y8v55okdjw3vag1tym8qigyuqvt98xfzobbda1btlyv1tujauiuza69td8te',
                        messageProtocol: 'selczo1aslwd1reozpog2v7dgozol8rhj42n0jscc7a300phkeundp3wes51',
                        adapterEngineName: 'xt75pekbmax8joqhbm0zn55fs7wal6cfg7tr5hcso3snnkyd4qoytdw8o9o67fsu4xataghwg2dzpz1r8hyfuevq4as9rd62cwbakdrpphw6ollqizqskvj1jhrua7fcvccb5jqka0iwguzgz23hzza3tfqehca1',
                        url: 'yr6mre66w9mc78pu8v1hpc4l9mxotf2ldpxfmz3lq4jvvsureyy74b2o2bjoji1kbh4g5h01zh0kjkfci9smdktrux02q3m2nyhs1xtne4xg1nkx9pjbjosloexekw9iahueym45313jcqg1la0laec1dgtlrp2z9drp531bww05ug8rx8qlp1p1xl5876vcv7tavqml0a5fmgdpcjn02nbe38fjfnmp2bu5pxfz0zhsac0kfer9p3m6hxyf0zkm85v2b00tlg9l21lohazpnxrzd9wo1n9727nrwm7rgp6gg40rmui05ct2h2dfv8nf',
                        username: 'xcxwmpf0bsrt6ntkca7aretz5i5p3ldxe6rp47dp7fb9chend9b9aqqvro3e',
                        remoteHost: '7atwnyl2dgm2x88ag5bjf5da4d28wf3qoag6b3v52su54b2hz0yuc3s38mhgax18pv4ftgi9zl9knd59ae1l9907khjzc448v6j8q9rrdgq3ctel3gs4t38ooq106sgczd800evlfkln9uk3jmijeml6x75ikhne',
                        remotePort: 9524735488,
                        directory: '0lqh7tpl5il1zhzkiec2ba8t2mqsj40lkxbay3p8kjf6w4tiqpt9zsuliqkysek5rg33sih220hq5d0sdl3mn1bjxema285a3ghob0utggaiamx6w4l4cny3uhdmawzmdiydscxanh0e2vd2omc2s4gi0ph40pecx29trviibkolhw6y72sd8qf6d3mbqle8sa83l0wnkzli5ynuv4qd5uwv0bed6kez5rgaxwx609p860xgnbjg34re7kf27dy17hyba4gppdrecole3nfhjmhkojkf7wzvtuupwr5j32deonn4ukwfqj1jvtnxsxf20bp1xuuw8gdqvu2eapvswtul0ye38z9tnh00sw6jzexz00l21xeieuck14f79cywh5atdgewz8lpq38m2man19ussep0jbh5f8vr5hsw50nqt01qhzxnp8ih8oqq8qv03le5ujwxdxelzuvlf45gl3hl5l3euzyiddkju1qc4zpk2dmhmq0hhrqpb9bid7chpbasa01vqmflpv3ba73ir05b2enxu0s42dgoaty4ytdhkvukcjct14kjbl1adepesy4rxifubemy4rx1drxjxliv49diajthfl45vtpt5rq368l4da9e74o6rko8my7t93wiw0lc0lozf8altmbhov0zb564x4fxy3dg68trin4n9be534gtlrnf80iou0api1k3zl99shv9ednty38tujvdza7estq5av0wed5q2si1xny3j3i5vq8z9mqzcpireyu2qeibjpzz3itemxo2bizhtervwflvd86m0qw25prxcw6xvva2ca0tb9hy89155hwk5ceugd6m5uz16fuo71625d10gfaa8mpetbhisb7cwnnths75wyepfl4ipry7md1q02prynw8ce4nsrp6fpuib3gnmmi9pasfpswe331eg7n1wujne6h3y411yvxbaohmzxogfc1l4s83uc89lnpnxrpljyit4v704trvh1103e6xfur94iazc6zxy51d',
                        fileSchema: 'rvy42hgmwatq36t89i3ikpzqa4yyahjzxkqc4m1vc084s4zgbutey64i0osnhi41fzg8epgmvxymogrmoolk8qcfsl4rdotoctikgsgcpnpm1vew9wlb3oio7yk5lor4mi4krn5iqseyyf6f1m9jb0cxcmj47i1wg6v9jp7lixlv1jv7r7847622p8s81m2rb7wxqfawefz1kget9am7z0almpwhpb92uy34460sotw4y1wjueyghn1up0su5trm7ls5pgjmbiqgqhz4jlqby6bcpi00ub7cjbcoawiarh1ctelwn5eper9kh1kbldqie3gj1x3d4tcrx38funiyuq1sbbzko9ge86pih2mg00o7r1x78jzpmz020lmxfci0s524z18yb2vo2zxekp95dvitb6kr0il32t3exdqz0f6y6fn7m8kyuq4m6qh9bm2qphuk2khpebm390ah9gho5fdv3xy29xoaudkf2imm4ozguwick1q87n3kz5tk0u9ieoprs097nqnko1x0hz2bkgz4c827bqeokk9wva51svuzfi1xx3v6utza241bxpo3d4xglcy5khss7928o3vatoqr6wrcxmflwkgj41mae27azajve0dlcwjqh5tc4ly4kb3a20dny1q8s5zfr8xjndevafrly8xca7mjatmy6qgs7u6zlcwu319wswqvyo41xa714sk0viqy5ocnxwxmt6w6kwf3qus2r23337wy2ejll4m0cqxyhzbj0cyjpit2xptun9yyq0jisv18qjk0zyk2j23hhyo60bosd4hrup5qt3t537t8xkaplcoqo3roq5ahqy7tjb64ls68qunqf35057j1u8r0h5bagpzxtu4ecsvx4kei1vdj2c33cna3jqifoy0zq148iyu389zzwxkbua7h4gedflx6r35qo1fid9547dyqfo12ilhcx7vd6vch654ayd8mk68bmldr99i0lwm56lqj2rcsxems7hu15tkcikzg2zmsebosl29j',
                        proxyHost: 'jegc6d1vme7r31v9netbwnrf95o1kuqqq154uynblrm79r27d5c5ihdy2d5i',
                        proxyPort: 6992597746,
                        destination: '2pwktsy5om3508ucqo2x3ajv3yzezc1adtfma1d0s3fywkg3no5cjc5tl5ku2yhdbhpl78a2ojq2j0wca4xm3jnw6x3kuvyag6dve95smjsuayg1fje9yxgczzvt06tmjt4up811xwgjfajbjnefket7fvx2980g',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '9o2qayjekfvfjxu59bg9gi6zs1flpysj8pw0ismrfafmz9g6nkddyxzmdq5mp9niy64k55gsa3jq4yodgf32srupdosgsyd6izmceda9bjjgy1on4q89i8pqey3jclh56ficcmgeanibsuechwecwaotuzx7jlkf',
                        responsibleUserAccountName: 'nywuy0eoipebzt3i40g1',
                        lastChangeUserAccount: '1kzszucywe3trp0itsla',
                        lastChangedAt: '2020-07-15 21:31:32',
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

    it(`/GraphQL bplusItSappiUpdateChannel`, () => 
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
                        
                        id: '26610baf-b32c-49f2-a506-ad321f68998a',
                        tenantId: '64b53c23-1ffe-44dc-96df-0f3488af5681',
                        systemId: '01996283-9bcc-43e4-9963-a18831786df7',
                        party: '50f0lcgsyzgf9r8v5t7z7swqu8eo0kzy6hkt6ph2xxexnkm7meg9zkvgdeur7d8xl9qgp77j075h8145gj436qfoethfgcru8glealsk7ucw4t1dcsyzfjsrxtltio1l5z21vsfbtr2lidzt9m3e9zomzriwrrr0',
                        component: 'x8wa5kpxinyacn5hy9ywbz1lf03vjmh9w27vp84r3c5vnqs9hz967wyc2zcgedjvdawbqfqkc7bhvfugud7leng7i34dxtlrn59pqwtyy9bfqreye77othr42oymhkwyeg4osmo5k01htltcftm8etwhrs0zmmg5',
                        name: 'dgli4cbiq2reaescd754o6nxhs1mv596dfhy1x11554asi9suu8di9smornybv1df2x48te21xl2sz2ttcp37cwn6ryz1afwp867utjsis8jh9lxyuacbljwqajn4mdr07hmqeya70w8dk4i0fkww63y4wy9eie3',
                        flowParty: 'ussav72eozu1jauq1sfcir3eo90ua1qr6jdz2ivv8lr4xlfvzkd4i3p5tt83byk8suutkgw2j6zd07goy6d1hx3gou2a0yaj743lak5cqs6afa1iou6rpzkc0ooil9smo0ried8ycvivgwkctbnao9cnl9eb7tzd',
                        flowComponent: 'eb8hnexr5ahbz0zyx00shb4va4r1h17hf2agshdkduoavxko9uj6bebre9azxc0hk0a40yu7z678rwd4z1ntdw8pqd6cw6rzt2zyycdffigainkoyp47geg7jdzvz25tf454p38vtokbw8t763ym4uigoii14zom',
                        flowInterfaceName: '1fd74vvxd0r298px4sbittqgd60bseoxywsbu3lde18wt6785604cawsunpd833d2zmocax7homoombqjzqqa4m2fllcgqwjpd081ynx1gj04xwtfoxnqttpz6ug2ng7c8exn4awi0nvd95orul8l5edwb1m19r6',
                        flowInterfaceNamespace: 'arzfhtlflzng2q38lpw58uqrpmk9nxwmj8h9bw49bqobr9ve8vidd3ezvsi505f1zxhbuwg3vju1vprqd5c9cbcl2ucb2cq3x514x6x9a8mty6gzvf4gmzb56tvk15v2ngzlwtfpemc4jxpw5a767z9o7d6w2zwk',
                        adapterType: 'kubw588ijlllsu2hdxo4jqija60hnokcluzp4gt3cgciaffwzkbu8q9qtzbf',
                        direction: 'RECEIVER',
                        transportProtocol: 'bppwoni1yl1sqm02suh9blxpoqz7ysurjqyocr1d6o9q7y5mwjmbrbe2qi6q',
                        messageProtocol: 'gpebql4zc27zvdajcs8orkake32pyibf627ptf8aeno0dy6rhbsgzdih1d1e',
                        adapterEngineName: 'kn9zhklg29662dic6265qucy6uhsbtdsltr1ocz6d0tixrlc7jb23wr31yn5gh5t4zrvto7o4gb1sl97hxafqhft8vjxozibqloskyqlcq3zx7z40f26170ox9xi9uxpc0m24k5209ripz3g36sy6by7mhfb5cor',
                        url: '29ugkzbbv1839jam22dn7e5d7f607op2qhhecqr3pdr6l6e3fr2jrwdwflcuz7709uz7mtpiqye903nrr7ijvpnzrn7vkrh52h1uhbgmy0yuhp7cq9gj8qwiqadu6mrk5sv9e8a2gkxk14ujxvztaf8e6vfd6bbqoan4fpoev21v5afvrsr9it2jcq5i18sfycny2yywhux0b4nsuaqehxelxx6lqxdrrd4mtf197sf75wnpfo39fn9fjsr98w14bnlkwypmdtihsmmxk2yy0knk9oh095hqh08jjlgpeowmc4ylxgrafkwnckgccv6h',
                        username: 'mwjb7ry468nijefqkif54hdqngchqknly1ui8ssd6k4xla3qiecy7yy2d82z',
                        remoteHost: 'opbbiac4rdmwg0to1jjqpxv8265lxkjy9xm90og8w7dlr6fil49m7n7kgyrg7w743clu0sh2tjn6xy8c84jzy7o1z7ckageqpdashbz39c934p5e7gu449k4ygx7lkgm65h23cqxo0cmroi7cl5afctbhmb1b0tm',
                        remotePort: 5985815695,
                        directory: 'afhqh1b1niulelb76jcdae43zwzd02vfzi61kbzyiog7a952hrfee442x1gkxiw1rpnqys6iul2oqa6wcerk4jr4asr2xnrqn76qut003yhhtcdmhio1jkxycghcu8kw822g827skb75cngjsrxnt1hpi6lauhpy3fprjew4lbb4z9fa14gji6og5k4px3lnw3xpkft3u7of83lico2ku2musyadtmobshwp6vhy63jpypfnsxqezv3f299ei17knc07ii8dl6ddw3eo368d3lzjgk2dhii2sa2xnvcm607s80ewzjymuasrryqve33o0kztfbwlzzbo7tuog08q43f5w7k1p5j4qgxe3m69yr3kvgk1d2my551xi5tjq8a0u0uhzbzbqasp6u89cnsq13iarlq8y2urj4oirl4mayu97n301fm4uax85h8ux3osy5grie9xdi62mpmgm3wy9fhoxbq6amso8s75ef0i9qc5howopz6r4zifofncdn5b8heytbjlp0go3w77m8kiswgpc6ahbih7mnv9a3cl29s8l50z7t1b9a4svu7i21itcpa6nw9ms5ltb8hmajjdj3hqz7vut6v7csxdziesmxpp4o1n5vkolcmrmedufqx3sglgzllpg6ip60tldvnb6z63eqlt18px48y41sg8a1rs3872ftcdp2db9w33939vbq5nh8jh8lbjooazmh788f4azc1afwftm0axemr50jygwnr6habju7eku0tfjlas0x6gif4vzihhucgmclcgk8sytpj5q898ue58tb0ckyz48m7n0sfiya51eob2z8wuhzkqbc82vt0neh654ek2wjl1j5t0qzqvbu8y00kkb057k2s99wp57fz6tf9rxqvket3h0at9t33r6xdrapzgq1ybuvxyvqza2dgzbu9h2o0p8bc1e4k8k0n5hvv8co8n8x262d2azis4qke94t2rp73o2s0fnqd1ccuy59qo8iic4ceibuztqgfgl4w4y95v',
                        fileSchema: 'ut4gfz51zssz3e3lg2vvtrp2oi95pswqkbc5n47brcnvd1eu1aolmi2w5hq9uee2nvrp4c3prkp0ktn0xqp8h0ttl4s9h9u3g043rj3omx0jru10jrrl6v5lsfccm0fdo0e6nmb7o0wm7azgi2698mfq326c76h1iasosra19tdg3tc8ebcxmgxkwzppqmmuaann3pt0x6wtjxj1abnezrgwr1ydset8slr5acb7brm1bp1y60fv31zqe9414udxn8a2omerll2lifjai4apg1yxz8sromfaty2k03vfjveu8yd3qn7vckjm64rw8qdjeo23ng09q86t8xgz5fjvyiffu5xiufd5qgfvr8cq8ag2cfhalznqnhhanpa9xb75afjffc6q50rvaxg173xftajclzlnch8bzj0yjbmil17e08szvylab7ziid47wpkzk1g2ur6xkgfq8v072ku9mplf9ur4k4rgi2qf1iqc6zcoxd8qo9uhotxclj95qf920mcuupkg3xy0yjyvuim69xblr9i8vpinzpjgle5abqlwzrrurmznl77tx0tfmnuw3xlyk50dqk994g5xumimcr772mem13mpc17n09c2548neo223n1u0zb8p25m4gx9xpu6gft2wcch0ptlf0hx1q1hbtuwccvtqsv613b65nztpcngvuuwhbli05dneohuh277fdbinwamhz9ne7nzl4nbyrk5wzept8p8yf5x0vr7vg0bknwfzyr1ks2a067pn3s6e0g3txzqmef9lmmyq4l95jiqik3sve074b52rw7hozlzbbdymv13cd5iamdpgox9913589brq6da9vws8153jk0yfqolnv8ag3vbuqgwwkno3sry9m61ro0elx1st6cul4xmj35s60q7hgwcwhvwlub1cogfq8xm03trl2lviea2ei87r7w7g6obfdkjcb53tqmg1z5b9kv9aqar2borwbnegfgjo0a1qcowjshb7txx47dmugm6nfqhfii3',
                        proxyHost: '5t5h4n1jiazs7jkfwif9xg0ugx59okdvbcppxj0jdz8uuik9w9eklcxjwgmi',
                        proxyPort: 3659542945,
                        destination: '2td1j9pt901mohqc9eo42upxwrrf4j58ut5z7kspqwi5oy7dwgwbje00s6snlgmomv45tcs7xa5sxc9d6eqyoh2kivd6un08ijfw5tctp190l3ouvj0vyg3ebmnq6h87peujlxqvbnnusfrllz7xbs1gxhecxaxq',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '0ut5mhu2r2vsenna5lfwehkq22m2j5kyqzz3n6dhfizrmxg7fh0wtzx57za2pvtrvhkpkzgxmnkywrjpgx29z3ls6h4y9ibrj3uqqw0nybubkhckeyi8s2l06iiueslucfe9vh1k8t953n69d2fb79qt9mbvykne',
                        responsibleUserAccountName: 'xtcc9x8pqxtiwnfsouii',
                        lastChangeUserAccount: 'kstt8nbb48emg6k5go27',
                        lastChangedAt: '2020-07-15 22:18:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('26610baf-b32c-49f2-a506-ad321f68998a');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteChannelById`, () => 
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
                    id: '26610baf-b32c-49f2-a506-ad321f68998a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('26610baf-b32c-49f2-a506-ad321f68998a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});