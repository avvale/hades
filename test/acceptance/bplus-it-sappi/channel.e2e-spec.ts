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
                hash: 'pma2vovswsusoqu2pqqvuvupadj6x9yv44vmruyv',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'big20cclxw4cbvozs9cpmmnmfden4exu5jjl17p5o6qwf6b5ce',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 's8zhbm47gj7wv3knvckq',
                party: 'rzvngsu1z61jf5656l8sgrimb8ltvkqolojf2gqd7oulqnogcnkz8nq1g8keez5xvgamcdbsndz5em9hln1adwkyoqn9uqmkbx23djg437u7ytr0vbmefq305wwpfkcw59pnay3hjq6dtqll5a28uls1hhny1tup',
                component: 'v36xe4iz44kktppk77zow7yukomi4jbjgcui50jxz43234dbhrvy2h0jqazqa49u7rfpoxa4st37e386p2ef1t6fo7gmwhwjpffxtqpi4l5uflkx4vq2pezdweh3rhazv6kp6kj3ilrigrvfc67f359oggkntcrj',
                name: 'lg5isfa0crbzlp1wvzypvifzr696xxqnky494tq8vydxvah8j39ykla4sf0h6gguy4vfdfciqo1wukuaq1n6gz3xazrcf1y7f5r3nrqm51ohxl7htybhvjninbhf7pxg3hcoxplbly7vpo8hhn79nh36tr276dwu',
                flowHash: 'q97fn32zyqxrthqap5q9k8zc8hsucqess7nd4thq',
                flowParty: '92egvksijden8mwubyv6uoubixm1ar00naedgb0hlw97l6lfn63bj3o8u1qaxahtbzxdzeal7ifpfoe4xhqory588ot7ddu3otr7mhjfrjvfv73qza93ujea1cntva1mb0kd8unv282q5hq4hnjh4wsmkhbs279a',
                flowComponent: 'x92o3b6awao34wsflkcjz2rygouef3za82zb7nehf2sik2rf088rrakg69pbg9v2k8av5guczbg4jzq1swrbzckfiv3br22tom1nk2wvh77q2hlof3nnlcv6ycki2zl3auj4x4ilee8akrnii8uuw6k9i9v9f5iu',
                flowInterfaceName: '5nlospm32r022iz0u1tjahhy0oj6v3rq7oew7la9s26vnwyhyoyt5woeg2vsxxt8wlhdjcd192fctsjcry7nmoml58rt2d096ur3nf8r3c0rltazhmls6kbmoj7vxlvc0mkzpz8diy3ve7vlegnncrtm8tj8b9t3',
                flowInterfaceNamespace: '18m1rly6jns50uomexbamtspcki9uv63wyvk9aal17kchcn3tyc0czns1whb02h1flzpgsxuw0gf3ogtyy658n1x5m73lrmviw8jc1zafvd2z011m547d6hurglun5kn0tsmjidlj1psr9og8fhuix4c6m0a0k1d',
                version: '2ttl1vjxywgkjx1sa2i4',
                adapterType: '0sld0nkq2wsm841v0vn3tk9sbfqbumw4hpmxgcus94azinvlmcwumhvb4kms',
                direction: 'SENDER',
                transportProtocol: 'sdxo5gi2wu1mf4kfuq8wg34ba7l84p8ht425bcwzohlk49yjrjose23nybqq',
                messageProtocol: 'h26xa12wm2dxj1o3ms3jci817ruje961a0j3okv8x5zxpd7p4wgwmwmkiw8p',
                adapterEngineName: '433gmi3sgawgflwgldiumuahcw0x0v8nkcgmj8aeqnmk9rvffem018w5nfhbtn0ulv7wiwmgmhbhcv6kqjte2gp4zjcc7wjrxtympnhxgtpw47jk2a77dzenkhphlzebl33klxyfzk05baop51n4l643iuohks5q',
                url: 'fozajpy2vxrt8el2lgzxmrdjb3j639t9ys8w2groogtv36qavnx4ufhwud76wyprtzdpq9iz3so4k6jd4xilvlmfvcynif8n6tqmwama7u85f4yp6wq9ydwlguoa2ri7v3jex7a5708ryl66xj4pqh4vxctuommvvefljdt7g8ir1b4xgo4ebrudalgrangdbkeofu2gd361s98td5j8ygu08s36tuyhxlxcr5sqagwme9ch9pv5r5j2hgh24a81cw5h0r70g8ghmd246xfb4tfyczvfae45yru15o0bprj3g709xw4dsua25wrb2oeh',
                username: '3jnm97wxjhaoow6ui5oqltu496ssybpobustwqptpek33ogcn1qxit8q1y18',
                remoteHost: '5778o4g16j42fn6pohngchwxvoo2di3uhp1xxb24xpl7wqa9ykw6iucp9ifh869ohoqql7upda1lvy9gzzyv0q3oqi0fc8gju5fatnk5bfke2zbbwffrcotldvz9lcqiw0jcds4fslrm4yjx67cc8nhqpbc21yhv',
                remotePort: 9531250837,
                directory: '5vkkjoboem97kzf4awhj0kv9a07ttoqnyg3mgzmqq2v3jw21luz34loe0chcc5nvp04f2n0b21kq2bjf7tpe3v2i0z7gyos7jr0y2yp6f6k9bgd5tugjdux0xrjn8vyjamukov1z1brxxeun0baq1d5b5ipx9hh2iqdrrr1pxf0qzyunoh2r6tidd8vfpecxyncxl9zuz70e5ccbzsyi86fhkz56ags74eqhz5zbw1hnxlto3c62qc15z386du4oqtuc6ivn5eme657ol983ls8ls62u3rcnq6xob8ctdrmmcqu5t2ojh0gwmxhs40isqafa876uc9cz8dwuh4k0g9n1zrviq7giw8xk1cm4ykrqop7hxr6sz0ggk23wdfmcno8mevtbn98pk95ghvddld9q4yitdrfgae9243kooaa95yyku5okf2pb8fiemvj0dy0fog8qoviv72z94xmyom1wwk62ncw825buiem7olvg10j2e4xqwwfuhchtkvsimk6lrvq0rtyhe7d7nlwb197rrovfp0un9qiqb7fefbjs14d5mba4m3yh9gmeotaumhk5ubkxjebe9op1x6p0wr9jdtq79m5zajjvv5fbiprrvpviz2i8oyzzwet2n4o3zutdfw8wj4l12fszo3i9nple1snmk42eufldc284esnsg8daakbvv1a00c58pc603cqgzrglxihutsmszaarg2vtjdsocz2pzxfnyes68ef4vqx0vvgty58y57bqqjosck2zgi7d196sa6mfrr8ql7f50nc6bwq7picgbt46ksmo2yy9fyqya7r68xb95f1064oywewv5ypss5l5i182pxmdrczwh04rom0slb3i9qpjhu1mj4h0qrr3puj82kvagktsr0yxp04mytw53uigkovz6bbaur6j427htb9cfkco64js9ejwurnmwr2jtn744vmpui90nqjvwladha1vfbljfzow9fpn6lvxvozg1zs5v6rlpiaqi9h253ka5vvu',
                fileSchema: 'f5jrbvnfkqnb91i6301qrn56jh1eyxn608rc8rdxbc865tbm0rip1zo7571jy41n0cbq79efc08qt4ypgqrjebe08qqhnkiq1i5jznx1tdqakzjj1ztpf2k9vbr85aiuy282yutruq2c8e6qht2iyjk2d24n0f1kysb75q6c6o7ngwa1bafofgfxmbxaclt3x0h3jf6y2uafwiel5r5lr11tffhoqqlr56fz4iik3tn2d4wl659jgoswhjbr6galtx2qa1vv7hh8bfkj7j22fkb2l1r5a7smtcz2bb72xck8dsyzt0eshl3w3syqbx3cknbokxkmg1yz3qw8tekzf661y59qgizu5k5ng93r1jutqb18qnw7axo04l8e7v6f9xrhghl0h1trng9ushuaop8j0ives3y2n8ujxpboj7jgop8rd7xgi3wctnfb8l6l4ns1u74jguam9nw946bbl6bvdevf1yil5fsgtrna78tc7vkpkrjodq1vsey16lzoo0lusq22teizn8pgrgfoeyoxw28vx066sp96e0ei96u8eth3r1beogoi9h6eg9ozht46okfpsfoo1v7qy7ehjjka10zppb9nk5qvovfpzc1ckl0md9tc4rcwu6p2g5tfzushcpai11is1w6458eshslk7iz5401y0zlybbz417s935khtuso1lclgjlc332uhn4c3pyl16getph8rnkt4ccxjjw19j68fd4vp7riuuax836chy6djfp0v80xyjllqvx3wt4bj6txeyzqnfinrk9oe3swuyy0upssr44vo7zgbntavpe200z5nmqdbm2hc612oq44xptgh4r7wr0ocel3eas88mv1alu5pe4a9eh95sg03f1p5al92oivl30c1u7nyxtmtahbcbzsczrcp4lf7duxi7w0syywnhqk056nl6v4qsp7jb639vkdhatzt1js16dblp0zkn5e5bpnlp0o6ii4rchdt4zg8l9uqdrd69cjhtef3lbov26vjawr',
                proxyHost: 'e46w1uc2smpzpok12oxbwzwlx379xyyd7oodd9v71kytqj6jtav2ap6u1b22',
                proxyPort: 7433859687,
                destination: 'xbxwi9walxfvydgq7bnts2dnwv98gj2iwvne28zj3euyvcz1xvpmnd2sdty012hqngu6pk7o8fchc8gbc7ywn2acnubltaztfovd8pdkm1otxoxhqu41iouiw5yeqlfui0y5gkwdi2sqzdhgplq28aggkjc4ztow',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mng197xw5m9vz82pamith7xb8lx85ia8j3cyw0bodx0632nvnbhii34wn8vobfbzjt52wb80uwc162qhqa4sef7ljy0c4ycvi0t31cp3tdvo6box3r6cjx9zq5991vi5sdswze70ejr30aa4cxf7of0pq2yyet5w',
                responsibleUserAccountName: 'tyd19yun0e1g45mnp5pt',
                lastChangeUserAccount: 'trwpgyoa2rj64l48phhs',
                lastChangedAt: '2020-08-31 10:13:32',
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
                
                hash: 'jjqzdpka6isp3x4cvd6n1rxk8ojopq5gx1gs4m03',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '8z7ev9acrvbxrhah76r07iex9j2upleuiq8l9fgsonnx9of2xn',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'vid0lz5tds2wzvzd4yvf',
                party: '3bnwi3drb5wognnjibhmxvuyd145qldcsavyqxrrtd4aue4y2hqnji3pahbja19d92r33twdgzek99y2kq6bem319s9nzn81mhz2dyx1x11rlqupkco33ojgp43owfc77iyy0go2cyvhxpqsslerztlx256xogkn',
                component: 'd03mberg9u6yldsp607dltzxtfv5gjq18mdj7eh5oof5y6418jm3s9x1sl5j7mium6r2wtasarzkei1gmufwzmumtlyalphfu3mc09r49tom6vrufvb5ifi0qzx3ee4dnjy5xuz495ewz6e5a4y96lyr91m134sq',
                name: 'katj96mscamd958ohhlr9bhw4hx2bludwxdhlch5jg6uph1ah4nvtxw9whxaczlxzvw8ybhcfwpp0cabbe72h8to41kxzmto37unztlnmej8q9rcsto0a8y4sgn33j1nmpahfn591mbtc1w7harjowautpxuto3b',
                flowHash: 's7aydi9ps2dvu29rzm50dqewzjqcrporhjq001j3',
                flowParty: '8zy00y0xdgighm9krbw3gm9cq5rsmzqbwzbwonylxfcws6jdper6hlsmuiej9xjih2bf0fmcrnvwvyag1uf098j48siennr4o7q7r6aibt6d2w5bq82n4oxx8vfcfeytq771up3t6pa1u0enrkonigqk0aulhqwi',
                flowComponent: 'ywvver1h4690gixahcj1fiaeoytikxzk67wsh87elp4rdkkijztxnwj3l46r5mkkf9u2msamo0fb9utprildzh19fhr6smwxpqngniid1zieg1mr18wnultm707gxsq3rzny4mmas7hlpi4b7ymaifdha1nxilhp',
                flowInterfaceName: 'wbcqa2t92o4ivjef48mj4ca76a9upfkuntbtgkm119dp278ziw6vwbk0775u07tbggcaoqycjr4n1qt6uoyuq7z1udsa9zm2oj90jmzmku5ahjl3oc89c23lh55zzec4ki1wa07i97c7mwqskba10g583aoygt7c',
                flowInterfaceNamespace: 'vjqzi9sycae2anjmauclbyit09d1uum749n4si1fpbzfgiunkh3qmqm2kxodbcla641vf8mzklkecmkew5nf5sekg5528nhy24za2bvptrirtx9mq4nzrbp91njtsoz6e2qzg9hi1qggpmy1wpmwc9qbt7qoz1kn',
                version: 's2thld1jlpn59g0azi84',
                adapterType: 'b353evxgo7l9g21ela1d6eldo0hojla4xtt072ldifrlebvmbvpe487aixx7',
                direction: 'SENDER',
                transportProtocol: 'd5c30hfr116253h8unv3t3l7lvnzhse9ygto7h2ksbk7xqagk4d37xi9d4lf',
                messageProtocol: '9jym00dkcoy7u3pajh95d2v3d2rd23cdglidx3j6c91t49ltnl7s0fej3ixw',
                adapterEngineName: 'ywywwzeo1sr241npr68jgvdhrhx3bjkbmw1270imnr0f25hayzxd4l6695ty8la9hai3p81sed20u7wouddzxxyk01wlzhudpw24yf4yzi5pybt23dztnwm0lixj04s18rmqnx4nmnil2dub753hfr2a5449o5yj',
                url: 'fxxc4l3ohqnpxapowo4g88psfesj9imw1aaklbje2t33kjug2zeqm61zxskjnhuiqbeuobeaf232a1k901etq5ezwfxzs0f44zl6w55yahb5ftyal7zd5ca1zs7tbjewin9m9p1rcu0s824t3wc691ogdeen6voiv9h9hejhrc3au98x3u643q0kvkxhczc9w20sb7sepzhq039p2t4jn505344x7d1dn7e8fsjw8yyimo3x99ula34825hyrf64rhyu9zhd2y0syvpx0hy63hevthuumn03kgihpoj485njt4wdvtiuw4meb99af0y8',
                username: 'ntdacavqzjtaw6limk2he3kfunaxy2yv3zgtw1in17hnkc9msem00ib0zjk6',
                remoteHost: 'f43uliatpafu73u1dr8muxrugjsiu0a2l5o9vabuet939gawvew6orvo9ltrrldqp2k5c0tppomi484zee3mj28osqbm9r0zvutobvbalwcru1dctwdihbgkpqp43o09gwewf1a1lqvfyijyol89pjn4i5oldumm',
                remotePort: 5070483341,
                directory: 'c4ui43qk7qwniwpglsars01pciior37m5bqctqps43jmimjku48blgm28idggm107ofi52xner1g473ydnnpu1ijx0euq7uu9y6f2u1p6jqb4o5mk4oi08q9lzlf2hgh0cm357tr3p586m9e86b5gcwaiqx03gzc8nnnneh0caxd37aqm4b46hhhoo8pttbfliyq12qie4u6cuha2sn4usc4e7heo0y2w5oq7j6ohddv96tgsojh0e4qgosgpc3f6i2473r128joyyf8f4nlcrtr0e4ze89plog7eatwuuyobvyn6csq99vyo9vmts1qnt9yxknajq1qmkpat7nq2aefk81pxjl1pmqlqygwwe9zak34sepylwwhwrcds1e96ll4i6tmp5cc62oq2054rn9hn81fiko0mvxii8h68045ky5m4bdz3j8neer7jcp2opji3a5khsm2d79k6l2eo7tibt5fxd24rgogxm8qus3cokrn4taqgme5w3g2e7l3a7qkux3cczpnaer1m804icedwr1m6303xofd1ocwv89wl4si8gtvi5q95tuzqbeo25npfgkj33cw3rlmsrw6tgmdjq38su0wqe38w0wffbtnuxm0fez7t9pv98imb8f29n1z2me95esqxtoh4rqdpe14g58z95ewyyk22eoheb8vy1ou7ybqb4idrxsae53yg8fqij4z6v0asu0ub8lhnwjc8xrhhfmv44liz42soyhw968d1g83pq16xe5o3t2nzr5pd1odz6zzqgte5kluspwuv5bw3nrvzlap15oo3dd77l1nlsleut6oeaqxk3nyn9lde2z5rtveuiqvufalw7ojn57ddvy9bw4vjoj3jz4mpsssromlvzquncuvh2jxllh6tj6wc0azj7cvqlghnjd0yfy013hd9r1b4gn3sgam2eywv42qcgz527dcb5vck39zds6u7mzz8nmu3a469bdd3hqeb63ykw5d1ak9etema79fu96b6kqhqr3cloi8',
                fileSchema: 'l68ifgts5hpe5bq3oj3gn8brjmpxybpwqe9weu82nvgvx8p4r35p5pywuj8rnoudddzknwdvyo9o881mak59qakgdauvui69jk48zvq6zvng7xry3xpwx2mqcmtzl0h5c60yd6ci6lizkbknkxnqs9xxixl2rxubmnknwkqdszippoc0y6esnnl0lsnkpf4qhyrsni8vvpax9ckjolbgmoih8lhfubxkw6htbkk79thygan78t71xfamg6892g6cp08a0j8jhibvpbyc293kmpmuuo4nfjpmisueox8739b6b5it0aot87fvvd85prqo2i4afz2xyufmp4dy773n8qaz7yp3hkkcblabljl4jb0sib9g4bmlpvai2n2mskq7otzx8xlxphqdvm772pnsm73ynx138d3o2kwiveb60p4ihforpaoyzb3lmkf70gkfv5xabasqx3j6u6qanf10u57hcymnkg32mh6rgbd45i3dd34rve7ykqm6an6w3wsjqn97migp4qcs0mijrejh9jqdvbrhuahduahffx8wpjuahgiaz0vhw5fvne0u44kt6pda50ar1o2jc0jrbvqbv6jsqhttmgoc3umgk1mqmmgc1fssssdz3lts2rjbpl21zthnu2ro0lnmdvl484t0496wpxd5ztfp1ash2amby94x7ng43nhn8xmxjtobktt8tvdgi4rmaw7fgfedhnxa9at0r4tukbzm7alen6ddykxggheqm1whxmez91hpsvvkebjyhnuly48otvkzrfv808l3bjrn29jhmdvfxw5wz3su06wl3o1343mxjruqi3fwlnek3ii37montcjpykregp3qxpsdietotkw7sgigyvjvufx1eg3ybq4v6hhglpsgh8qqqvnkcdu3e9nab0kju1elceau22d4j5ms3t8ahxy62ptsmtozpge864bubvoha0rpmv8rp77atfdp1bwpdtv392b8y7vl63pddif0oue8bamcyye59ylbj6930ws7',
                proxyHost: 't17yzzsc04yapm6k2talrtslccxg7wc652adlkmf6md76zuns7ay11pkbszx',
                proxyPort: 1387555726,
                destination: 'hkr76ip9kmpv0c6knrt7mquohk72azkhjqsr0ldv8at6gf8hystpx0ojhmwov8d6rgkyov6rccti0bnqrws5zyrnl9ky54pdr79gf8g39otmxfrczs1tmmv3nxt1gqs5qayv2xvh0zon0ejtbwu1lezta0210dud',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7priynjqq50yp1pzq91uyowa0bvq46w8o1xveuo83zjoski4t6j63yv4jdz2o8784baclm9xdves10vh8cshx39rwp04agxxxskqgb724893qa367p0r6prp1gpha4ik08c1m7hawuwgfnpysvcvynrbmrusboen',
                responsibleUserAccountName: '322sljedljels9bwq8v6',
                lastChangeUserAccount: 'nvla6phdsu1tna5sivbr',
                lastChangedAt: '2020-08-31 04:59:34',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: null,
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'vxd9bnkx002kb0ho80jn00d65p5qzeud2tdyzjgjpen2afe75z',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'ycvo3nwoxre1w5l18fvl',
                party: 'az52icedw6hqaahjq30md1y1phhcntv2mb3aloyel78qn71fdwl2fmlgh89cozpk2akobfrf3v1rqyl655njbvx5l25p1yxczq9hdpcw87m47sx89u7fivivvhh55rm5ir4j0xs4r2yxy5t41qtykllt3so1ni94',
                component: 'wm4py8ffc4pr37omb0d2gkau89wwr2yg0925z0839fsfhvvlyp5pwmzo8rlfalpwj9hwn9vz63rdezp73bycllxd8q2jmmxmc8qdgzpcucco5vbpzuu1ptigux8yrne2buuda69q9wh6944m05pkycppli69zjio',
                name: '1w1y5t6f7wftlz42337i9sh3lp74wszk461neme0naedc0ckhmxuscre7rqqzbn7of4e2kpvrcnduitn3lh88bhmdj4n5ugkkdpk28qkwnaxuan90onpxkoeszy1ymt4rzg402hwzph9pc7zxqv5dcs2tj054rjr',
                flowHash: '44nm15fjnkzgtvwu638ewzshm7t5mqp0ujj0qb9r',
                flowParty: 'aetd7isd3e2g3vqc2ceptckm58iopq01co8vbivqxmucu11s9efej91alr3yxdl6hr5viqoww37lwb4lrnmj470s10tsu2chvkq1ej65jk6tgu6hoiz6zaup3kwarn7mmyropbrowi7njy6hbjtu8jd1oqg4emr8',
                flowComponent: '3rbkhejnucd8er60bcmtxfx0b36jptxkuo44bhst8ho7kees2quinptyjmlghytyna4954p058kgm4ddybjocvgqn2hqoxdjv2l28wsd8qmgc88i6lpw1m34e9ird0f4u49kjqnqp9w4qu3eyup8tqza62zwtpik',
                flowInterfaceName: '8ju6j9ttkxyt3ua483g9gghigehsywtoqtax7dt8fead49q760k5uj9s4eohm3wqeob297484aal9pm1jzipg99a5eq6yrwa1j7vb3d7xy4ussexu3gry73wyjoewtwzl9brmwdwucmh7ybisalusko6287yo364',
                flowInterfaceNamespace: 'nhfben6evngafn985j98ksio3cdbm5j7bijyh5stm0cx39bu4zdvumciwugow9lisbmava6wftdalbtisrfpms2z28vd28ht7i50v6ejhgaki1pjwn3kpv9vcr1pwk0ucw1wqr1jpyi6e1t9vcl3rvvd9kc7h52y',
                version: 'ryte7odspvi5hscgxwgc',
                adapterType: '3l89vbrybemy5vjmu97i790ild0luc0g5l3o65mkt23vk4opjzrvw5wg4zpa',
                direction: 'SENDER',
                transportProtocol: 'v10qjg5d2gnbow28lihp4i4q2xuafm0pv6g0auru3a0qdu6aornxwoqep6n2',
                messageProtocol: 'fsxvtwjk7ztybaveelyl4lxxr1j1tkoi9zvnr9zyzcxhfxlv1u0vuqhih519',
                adapterEngineName: 'k78yq8y1uoksyj9uurb61b55n1lumywq5kbchv8nogjlu0yykviryi21r2xe5a5o3zibrqu9jlhhfc3l4vp8hr0khtld0fvl9krd5mgx62xp82i89oiwnee1emyfpxw55uuq5v9s87i75jf73rsp35ojsrps98xt',
                url: 'gwfzo7cv9f22xl3im8taepna98e2qxydce4r1d39d4wmhrjn6nh6sbh6s1l1ea7lve518f21467npjuaukkqf4it41ycpomx3yvjctz2ihoo1y2l6yhkszw1qm4t5kkig4oe274axfl2ws1nyqar3jjvoytufs0ewdgpegcaohj8zj9pty6mpi4d80l5pilfkoeiv3wiu27m99uxb7ng18enoperox70uurrytoai6tx7g4iq7sk33rd48nn432p1ucthweiz9j1y1781dm76gqfy8zf7l0909r026fe04d0ozx8q6du7i7yw4i5yite',
                username: 'lg76vcdpbhp2g513mrlozrxwoj3my1r7a1imcbbpb8jt0xsbjnkvwpsfbjw8',
                remoteHost: '0fqds9zra70z0mz537a1vztjap7sc5hq3biwxjeko2g00zbe5aidhhxmi8puhdes55q1qe40lhz7g1ggzu0dygfrznlljgednijgyw68edg20k7yzxbehiooyrys6axjh95mgxgzomn7mifelty36ggyckp99dlc',
                remotePort: 3805003495,
                directory: 'j5fu1delgid78i1k32yo39n0h9q60jgu15d4obnpd2thy3lv40jfhpq32e5cds74qyoh20sk6m6ngwae7llmuj6n3gbkw3ky2oqmlqlv40bw9le5z6cqgdtsaurs51kww26rv5txx0o85gfmo5lhyua365lloy57g3jozplpj7gzrbwsxrh8phk6848h0ffrrzh0rgmwqqd0nsvuor4f1zvodzlhmejh6pukdrhyjmfsh1fe6jy51zxl32f8ak5c1o8wzsv171biv3ut1mccnfuzp366wa0lccqa2he6waobirbmqwhhwpen9w2tnlklrvkylufdw7n0vb9bmjewexpbnu57n9rpn0fli39q7vdgz2oub7v1x72urlaopt8crrcemu716dntgx7nkvmf4k5movzhrk9tm5bt39q90x13qs9pwyv6ktyptlkt6y4t3gvd0tszy8qqc5ocyqi50gc7tkheopw2mkh3dt0um9nlgk69003qrhq8ueg9hugbl0huy0tra601l2rcnegwleaiixjyzmumw6eg0vjc1pf7b0p4iz5i2lwsvglpl6gay4l8eq439r3vjdhj3ij6ua2e8p8ufc0bqi81z7bxj64ooxi9qdefcwvw2qq2ycudrs8lcg582vl42agdz6rscx0t94rl6tnmcvf2omuc1gkgky9bfhys1b5h8etgto4cerngumnkgcyybgf97y3ije55h85gwnzjl7fy5ghg5s9saezdehi75laem6v594nke676hlssasq1hb51z4zdjn0f1ie5h4p01ivhtpc3ow7wno9la82bnc77unm9mv6tsm4ul7robips6bit2vajht7qf2zy9uw5yry3q6qppajkao7rcuy0rkp0teop0u4c687abkjsgemvcet5cnr27vmxlll6fhlf0rnwjx2rln07s71gwxuhtnrcfhtm4pnc7bv64q70k3dhdp2tuhap3sqxe5i0bfqg2z54qhoa5ymnfv7wxzcmnwb5r7u4je5m',
                fileSchema: '3wnj49ksjwkhhpqubfwc6ldek7q2ksluhism3ow5kp3d154jjo1ky92ap1fwu7gjqzmbdvz7i4pe4k1vj986afko2pi59za77ukty46hjwyz12fld71l32v7desv7i2d5uqkhub5ggo8rcqush1ztpzbf3j3s3nl4jirte6s19zzojl35w0boec3zmk8ti1qse98t9hs2liv52vb8qyc19h8nsj6r5e7jrs7w6ttgzfo9pkkip3ud6b42n8g5a7kv82w2d10xzdykbu4h5f43aznhcopobws1hg8azhgpglbbk872gcuinivofvbzuk3ysjmnteti6fwcnuk744wmxn2lkplvq45rn0lov1r8iramwa437aidj78p3asfbeqkx6xfav0b7wjb44ouol0mlvcnititalowlrlu7lgmvdh5eht5u3hkmbr4tce8jj8t687xeplijfs7eiwpfpqo2mjs1cbx9mkcqz1edmiizwgmm6y993c8qbqhowebvv3w0omultyq0fjl00temaycdmnulw20vi9ivlte7v1bskcxpwvqiwfbagcwke7mb2j3r3fmagifurypr0ql1umi4ztwt6uin8nqqnvie53we5h8vx5svi3tqo236h73979mszfx97fi6hqpxdpvxswlt5gzvo8uuyfu46zce79zx9xbbt9xvlychj0u5dwa3huwtiovgxy8wrzu6a8xb95u7blz6ppicig37khqzbn66nvt1tws1sihx7bl6a4wdhc12zwm2vf6z5932xccux4v138mnxv2semqput09yy3n37p3sz6gfzdcykt16hyea8ivna7ocmkbe3cvoxsjd4wt34wuap4nrcbii19dk30tluw1osehnbyfru5pgumd829zusb4s2doopv6uo30g0dti2t4js5e5a0bsddt5z3id87zarxxx3n48i7vvxj41v7x9nelnawlovsne8g9e4n7qvxx2kwme5ugz7stvr8lcaqkzu40r7knxf43hrk95p',
                proxyHost: 'o1962j934db19x3lye0jo79bs8qxv615n5zivqgi6ctdfl4dm69mmvqe9cmt',
                proxyPort: 4477003289,
                destination: 'b0rp62r5d68d6o5b6augk4davge3ul0xbt3hmqcv8bhj0xzwq3eaj10k3h2o0dtms7qed40n3u1odjnygmtjbnc3cu4r7ezdgso7sv6xwx3zmphu50dmnlazvyoqwi39gz7i90bgespx5knycuzdm6265stxu2nn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yx7052iqdwfivukxy71jnetlmgr0hoa5pvb61kq85v239rk1v3nk2zjvzvwzjv4we8erlpdq38zw5mm5jicxlpxanpat51dfx1m2w9xeuo0miqqqre75h4r4ugffdl01s951ikjo3cptbhm9eynoj6ruadagllhx',
                responsibleUserAccountName: 'lma607ht81futgrozh8q',
                lastChangeUserAccount: 'us8bzsc5ifat2si38d34',
                lastChangedAt: '2020-08-31 06:16:19',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '47ki2fabkgzx3gwl6w1ngexnzhi8ua1uj4rsata1ddlszgcuds',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '2fa2jecpvxmh0jd3zazu',
                party: 'nqt0gvzl9ezcdecth35f52pylqeokwx14o1cerksatxyw2l45gvgrdbisln4q0sggwd7nbdllv59bd7t663leuwhasbg7j4ij4zd3ctcpevw0jynlw0ihb1t1zn0alojgjqacq8h4sw73ynov9eaaon86sw3ul54',
                component: '08450thhdxz0q851vi8jz32j126kdcczdue150utvo2ru7tww58g5sr5whojqt4vxqzbppdquifnykhlb6vsjqxchnm9fkvniantr8l0recqh69y4b2nrpr5xv2itckdxols8oixa9kguii8qmcb2g6j79jkl8t3',
                name: '39038b4ikkb3okk5k4p2j3kb17j9obp024jvob3wlwlj1v11grim2a2las486cvowj1a2cj9gitefedr1dxikldctyw8xel1cui75tvqu3j5zyi8zynd1qfwyqzrjf5c9j956y4kuhlv8akj32bajuu13qs1kuev',
                flowHash: 'hswc0pv0wesg4zzhru47oiy57jai87ip5enem98i',
                flowParty: 'aze66tkkzu85dnm84cssf0dp09qga1e0jkrkts2xrz94qjk9mg76ry9ilrozp65m30zgr5h4ucchmbbf48quky1r7262offwu80q6dd60o2zy36zoulaybmo6ccxou4a4ylhdqhjh3g45yoqkaff132y2ch1w9v9',
                flowComponent: 't8hkgn0dgplp8glsv8vkwfpdsoq2fbfmjd9xzkytvsmxee9uoebvqb9ligqpvys2ifvyfkfw51vdirplc30uvgi4lj6ls6r2xwpeyj68acfkjpb737fu935setwzimxldbmkzz5luicx2yadicc4uyfuxeh7ahi6',
                flowInterfaceName: 'a7zqidphrkqg0gynqsbiroh5xo7wbsc6ecm295ihws0bdheq8nqwy9bp5f71p9gr6hs29nj16p46b0208amnqdrz0nn3ya405tiuw0w6pwhvn3t9q0u0dozmm0ultg14aju3nrro6sgnxaiy2u0coqv72nme0n00',
                flowInterfaceNamespace: 'dzhzr11anmao40uid0jx2llgqnfr68an03ivasd4p5qexipl97m1xydi3jna7puk09wxqhs8oyacqbguixqv7mi2hky40zdytbv342tmicgg1z08vdy05m9az2872396heohm3jj1gs9419shfppmupphvjfr3d3',
                version: 'h8czdifu4odhtju0776s',
                adapterType: '7p8qx4elvij4zbkitoipbbcvk98rc026owxkq383jihzu9cjpr9rdj9q0b0s',
                direction: 'RECEIVER',
                transportProtocol: 'phms63bmygmvf7srrjwhd8pm3dm8vekwmxlygi0iofbwwjhp6xfnr3hilppq',
                messageProtocol: '3nh0y0j35fkh77cyxcfc081fgwkwdaetvflqaj4ltjwz6hdatjygp2mkjku4',
                adapterEngineName: 'pt5v5rrrsnrwh3w3z6aqkgl6bw9qtmd65xsopn1ictnsysh3km15azb9nlsz8ules2vcaxok5yas1rj8hlfi5pfmwuy3xmxq72ywwr1vzigdfz6ia3ugkvwk0hsek68ncbuokxkj4o2gd3vnttjf62urlprvsxbs',
                url: 't4uoa35e6i2gmclqyif6hnfxcpuy7m6ge783qaf3lwybk4fci203e11ztp7vfce4haystxcgi2bo2lvwgc6033467hlxqe6n5m1j0asuq1ijtpztq11kkpb2c372pmorxylik4b8kvs0efwutfceptx56ehcuc8pe5xt3ywxoofisudmh18n7r34uz535ugi6yl9b1ncdpq6su1j2i5sc3ne3vvg7otwc24pet2p83d2iczwobb51btgddu6nnfol0cmvqieg4l6cbehxq91oqmtyk76ww068cd27bwyaizrndbimygwlzble2mmfkjs',
                username: '1giqmp405sd9p9o6z9qza6iya8u38zn5ssxbloijwtmjhqks86cpsqurdm5v',
                remoteHost: 'icz1zdkp1djh7vcg7j0otwzul3bsipiz3meq0vksyyscehjn166daha65ztyp43lwoatj2ana1552xrhlijlo7nqu5wa2kdo9umd9qmkcxn1wiximred3d0rjmdobu78lyl7jz9xq50zdanir057z5x3imxbmozw',
                remotePort: 1663848383,
                directory: 'av3bquygz71rcdi5nebbtlsxjcg6mx9vz8c0t5ta2f0vukpj3ozh6qky1rt17njymvtl7ner94gyeogvd5d3a5ie66zt8pq5pwm502frwjmlqpvcq0wkh7ln0v5ft0sg1n1yiztlcsgzxf1xwts00r7zwpi0bus444zxiluenuk360ab45k7rzz0hddkavydvme0r1nzuilfmc5uipoyxqyl1ainvnthq376exx0ph9xtqin1o3me8ivqdypp3o2oljux0o2dsoh1epaqkvhed8dcm4uwikd52lolapos5woz0hrqn6075gjxj4xz618oy7rcex7huedtoapyxpi4pf8t4r2vnm0v0hy95x70vr730qqb2fwrjwq532cdao3tvc4y5os1y9v27sibce8pj79czwjzpibv30cqjf2fyxylptl68cwnwu3oqdj0lmn888dyikmwzxv19n4vv5y2k0c6u13na5l65x8osw3nbmncjdy5ywjlti84k974y8i0u7utv1o1hxbfxgh5n4azy8j5suyyo1tktug4w24ptklynbvgbtd2t3susyg3d3ad61k4up1x6t6ilzu0v76rw8hnsqc0m7g575tymbvssgi1u6edd4f3y35pfq7raf9w2hllwtr3a4yfm3ao9ssiuip7hp9wcqb7b2k2ef7p2mb0vsc07ramnsw551cw8wlg1bme9b5slfrjbqd2xaz88q7snvnb90yw4g5g1udh9mkzizhbyzrtth9kfi50yf3xl5aiyc4tdlneqh5y1i5if4kl6u6pxpoyqnxwb4r5lxoegmib6rtjv8rpg1w3lk93ucghhoy1g2rgk6ouxfe3e9ctzivd9t2d91rywmht2ssq3d7m7ohfm992siklawfh59dnp4doxgyc05fn84x8dka943ypbf4yvbsp6lzb1663cggzlvrtt838dygeqz1l4rcxkodcmk7wkonoonloau3rrsphpkdcgkx2w39dcwvfowaf4td1a3zyd6k1igo',
                fileSchema: 'nxobfrk1llw4echt4ziql1xdcnvwom2gi79n5p3fn5pyojw1jtz55q05rfzszkinwify1bwrzv7i8sre8a3wog1ccqzn8qd6uqpqrglam5l7gp4y4601izov4yhov5zoyg8nn0u7wtakmg88e2h3fy38d9mfjxahl0qg9qdkgbq3oxye1vio1zf2xdjy8x7n6mp3wvaxy5s4oswwqygafcyjt1dvgyzeg4368xao6yowelvk5n6ipx492cheph84b5kv68jlz4zg90cmr13nlk7ytr6azg29zbartwp53nnrkxfhdnwbfc4ilohh3rk45qyareg5hn5s2dhonhq9hnfi2iipbc0q4gaj3ixmvevfl0teydd81isk65itu87a5ri10bxjc29hl1ijnyvk2qviunggl3vo3jq8xyi7r8i45asuogdpdaowjw6ey0o0mrp13i0smvw4320h9tw0u59gti0e8jqeox55mr8hbouh8nphc6dun6z2sabvb9y0v3jkei422cn88gjayocoz0cmbj61u5hv2qtehw10jbc8iq0qwr2rhv03cde6k5qbcm683e2xwr9rcdayklkvwwxxih9yc4rzgov5uxquv65lkq3oa5dqclvhwotd3568pe8nixfxylaeiahni3ow6k9isb77dmhrgxrddvegxmr2zbnrtealchon2cau4kndipr3mdg9yznkw2vxohj9wfw042i40443xpzrdfe5qmna97ykhjf1dxd9bgjr6r7alasvikvu9ceauzvxlmmj1ih2r59xny3deiaym3ttzvhzkg5a1008mcl24ulscmzghsxb0hja4d90d3ugfcpq88m7xg8o8wbisqojxroz7nr9yxpzpdks7zrikxnja1qf3owuh22gxmon9gu3uqbxmqcaegl8of9nmmtkr9nzt5nkzkt2zd8sj9wy1n9lipbkepxbzfop7hbsv8fl87hn4j81vvxm1uh18m4s8fejnpx5qsh06gn0roahe8traqno',
                proxyHost: 'lrft5xmiqy9z8sobl12ic0zvkvacu29bmfsfk3wnl94uqzwqfkr4vg7kuwtj',
                proxyPort: 3818455318,
                destination: '75lawvd2p8ja45hrbpacb4n2ldfho6qsisskwknecuzsyucwdoe1anv7tcy1zv0hdvm4ahny0iktmvee10ys8fm0qjawcbnrlgu02lal13hzi7rlkskrzkztyyqkwfmjt7gsiohiyq766etmvxz79hqtlfr3c267',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w6cv88h104b74xqufprtkwjvz686qd6xuy8ez8qld93cb227qnmbluvrdftjhwtip9i3nvwwn8v8xcwbsh7oommd9ww9w47ma4b6l2sx95yb3rvvge3pr68wyf0x9uce20k6uolhoj5hg3h8rptezts9byh39vvm',
                responsibleUserAccountName: 'hq8t0ikurn8c5723t2ez',
                lastChangeUserAccount: '8vhihgpxrqs8vuuf2r0p',
                lastChangedAt: '2020-08-31 12:54:25',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '3ddpqfpf6u3mbvypesebcwcpbpbqrrg1clzlaio1',
                tenantId: null,
                tenantCode: 't58i3njyxneonkfojmom7bpoetwoxjxoheb58iyvs4yt8gjk74',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'gzuh57y8y5hy5zdzdpqe',
                party: 'udairn7f6bwinrlz8kuf0i588nc7d8i5zcjrk5hiqxkv5ndreh01aum2d9kfvm0j1159lh3j5o4mpz52mtsttpi95ph1eyza69io0wex28gmv97unyaas69c31ofc04pp6aw9n46phdwlatugz6e3rc5ipojk43q',
                component: 'gvy67vfc15vizjcdnazw1d3s757nxfct8e7ojx0xljsyl4rhng757yp2vxbjz3ib0d8d1ddps4fto66ptci3fne2d8n6xocvpwxuf33npwq8dqs9gxt7of2vwgvhalxmmefbko7meoostccmwd90d3cvld0s1asa',
                name: 'w2uc57awu7986yajnma0cs90tiq1qaz78w2wenefa03t8pw28u540dro4wg06ztgvul361yedmns524jhl8wvu8307gzymrsi3rwa5moaptx22yzo4cgpygpd2l7ze4pqoyxutyyhyhko0j3rkzgb85aawzd2i6p',
                flowHash: '4i2dehwl6r6ml15fvvsrhkmxzno0vp7rivmas1fa',
                flowParty: 'nobho6nw0n9y4y6l7lqyc8z97gk0rx1u26lak8m4dq5kyompgmoavsof7ztwcsi02rjta8wzvmih1gjg7uqmr4mqsowxbpri0xqichygcr0xuqpo2jzrtgo7zye1qhisbjynrqzuyfdhe6j61tmi4v4bfpx6vlby',
                flowComponent: 'ywrc8pto0v2gb4vdr1i402dwio7bmytym1avctw1y3rc4jfzfrw1fao1kfjout7dqckewdbdg1dwo2n07tik4mvhz4ts40r2lm5q3wwgt7toz6jr0w3cldho9fdfdn3iqzgcu0wmlyq3o627v5h9m6jlfia2u6ej',
                flowInterfaceName: '7wovgwz4blrz2wwcanc49dwmfvwnpwboi11ynfl9wsoq7bigrbailh9x0xgcz69jv66crd1eamki5mh3yufq7xznf36vawj7udrfl00prps0lzqrginjzbtkod25aop68mgkehahlfd228f67nihtqq45yo9oz26',
                flowInterfaceNamespace: 'ruu50w69pts8oaln6ar1k83fcowwpt9s7vw703vjlsfvleduqbtubbzy6b71iw0agcc812jvcxcs08ndic2c8x9kltl0py7d2uw8kxih03hww13wynil77xutlxehifuy8xelvx90obc999rn3reopl6q6n1iod4',
                version: 'emg7dvsgcnnp6cl15w5j',
                adapterType: 'fbwqrbdft6k94ycknpintkosblscg3zzahu0phdbkvrnrlf0w1mcfcdamcmo',
                direction: 'RECEIVER',
                transportProtocol: 'h84j1s3jtoypne20mk73e9bu8stnkj06ii8nta9e6vplb93aw4lflvd6p237',
                messageProtocol: '92yv8jfoi0qk3jzbm4x5ri4j5tmhpmdxpov2x8bmboxyreibj48u24xgzuqf',
                adapterEngineName: 'w5pihtm54hj2q7vbz6j3i17v0901rlxxr2n3bcnl6b6nkfo2hlvcbqvbu0cl3u88dkhvv8p0iguc1nf00mcjxad4w7o0ttk6duxc6r3hc8knod1ubozt142ug5e4b987iki9bjcrijzzts16v9c6o3ruzhd9b4zr',
                url: 'wapxa0k16teusy1wnozkgfoecf05so7604uayfrl8k4batyduk0hkej4g0toshoegxnwjpfvc03tknwhujwlc2tzmzpnp4dvybq4yoiqujhnwatma0pgac473apyxglmpmn5emnwpd6mk0m3bir4m82mpusauaw7ego485ugmoci2ydb81re4xztus8yfwtq5r7o36dmi7wmvr0ixxkxgzjidu3fxf6qv57kdxpvutrocnlchm1pt5r6mgl7sab116qffgn49rblotnxzpqq8gaaefkleajbamxnrzjovd63gwe1ln54lmc0ti5gpd8e',
                username: 'a0subje26w3vd29iqbef2wq6pyt5yqv97mzz4xej0y2oxeu8y9uk25ktv0sw',
                remoteHost: 'cmkapvbs54y35lvtfikfe695thpos2hv81v8bgzdl2q3hippemmyrnik4qkqizy869drb4bqsxe45ar58s3uagtcl9wh9bwz1gixvhua4atr9k3nmo10k8krhiag1e1z0f4a2dwsygc4dsrgpg2a1th8kd4ewe14',
                remotePort: 6298509966,
                directory: 'cb53q9ugzojzz3hg9hp0i24y479i0yp2u26x24cb3krflkbmup5jsfls202a6g0bsyju4c3b9dlo92u2zbzyj3vfe72bcksodimua09o40rttdaduur1p4zq0e0gyr1c4fc8fx50buohrl75gdf9ln96n57rzfdso7u34xfm58b6z0kugk4emj76ykstsbh2eloicqo2x76y9fghx8lfohnewz62z9hypl1ncowf453s7abqswplzfnggbuzwblucmb5hbyjctb8azpg6inbi807flk9ti5tkyekk0wju2xhj3ylnaub33zjhuaejas1vn1xsknjv4xiqae4pycrh6quyx3w55pu6c19kx6zr1gg85bq8wfr7kzbxz0wiycnpb7y7999mrdthxauvcg18dk9rt5smksqbd6f7h1cgj3xbn500rqfhce1qrutml0v1jflzrhrb654xviome3es22392zs6n91w3ouao5xufoagiksgf77tdisthtskxje377vq678pf5e1lq3vwanbr20ililhcoha625yhnu5w3xho3vb48ybtfheayhp9k1bju3r4v2acygb21m3ozs98ijh2go5tpcodi1whnptrgaet3p5ipmqvdqo21kimr3okdsqo04m8qfkex7l51tuu5ekif8sbz4e8043wfvpog3zmi8xtsz9qgp864nfzsta8hvdudmpl0zje1y0lr98uqm4vvyin5mc5le5p438hc8bd427kl4pnztq0jc0kig9yth002cft3hnz1sk8rask02clh1n2rg5t9kteigw0c0zhi46b8cag3art8wusx6cz0kl8h9igdez36242xk0nz34mqpp02lruauu8sd57q74iohch01dd6g4wpxytx2jhlrz1fjj5p7c302kx2teqcbn8swzpubasbn84zofaj2khsp7e38v6eqedz920d62v54yf47wmxmnrjvclqexp513uiu6w8tv6az64tuzbsqpc4u6m4h0rmblmh0ex4u',
                fileSchema: 'c57q310jis6xlwnkyrv5qcrcti5gdhqhpvu8ap6t1u0jrhmuef685po3pdxjrn5l6ftj3y7i6wt4uewo4vem1k0yrwzuqaal0px60v83yodi0lwn1c7bl8ru3cklhewp8hbvzd1vd74i9od52y2dnbfovdk5h2012hnlc1kmgt6kso212nbnq5rmf2nwi0myzgumrvkugudr1vuwkp474sou3mx8rimz5bcfb9xe6bc8bwgdgegdubadpospwo83lyxtgfwfkm8yfue855liwenzzpdthh8s2gzy5b93vn05lkfofayhsj4l99r74nfgutj718a1kd6vxwgicxxs8h1m9r4i1f7o1ofsbibc7brqxbfh6d9a435kwscoqa6exx4ldvgakq9d32zph7zf1xms336ziagjusephfcrx3a2otvq4xkix7we0tdfq31ef528z3yb0j5lqiw0rzlp08az19pg67sqyybclwq1dl10br9708r3tu1xp2of9knjalzqmoq7qoib9kvlb37d80mhubgv4iruclwv7vvzyhxkolxg54yepsf85zcn078v6kcdq4usas8o0itqwa1tynrdg20o1m2w971h629f85i3t631vjrfdina5nlx390fv9x23pziyisql6w15l0nhztl5l5vvktevd691xzblala33i7ou0to1lzj7bksvyby5inpue6j7mbozqzh51a7d08b3637lcto7ls9aibar0q0wa3g77wjfm5jbg3ry3ii00esqzvvler63fyxjyb0183ubljrzmqrxak64a072m268aopsthsijjagxko3ylq5d0svs4s0cg8q8poz2nssur3wwqmxo9m88l6zb1s2vh2wy35gya17y5aazio94sdvwz4df78pmnbmr9typdk9kmkvamd308wykhpezwyxhelg8snv8it5al0byfj1g0ex23t2n2isktgtgz9bsnwzbzek83lt1v41fkfhsu9qn42yb8bguj9hc7jpj0qon5',
                proxyHost: '78urv34ovzhdtfo4g1qa54sw68ol0apxxi55pv0vffkx2rzpci6w9ozydvm7',
                proxyPort: 4896807278,
                destination: 'brjg1r3ucofin5klvyd5zqwcacylcrf40gj13ifwlt7vttvn54gjqphgbmkqtrr0qfp1fsnvmjk6uzdvficdt52nnqa51dkg915fdqpycki4q1a57zuvcoxkh60hl7kfnwzu5glq34se8u299sku1j5seawbq1gc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2xkth5aiq8kqbg39uek1xt5tn3qieavdgo2tbhrpmrakv16njxqkdcci36e8pb5dytaubtojhvp8qc7mysmibfue5oclorx8lerxsxaj82xw1hegp7pl4h5uwk64jpvkywl0agv3i6mgj4xcdtiyq1n1mxv9bfpg',
                responsibleUserAccountName: '1yxkf1z9uhjtdc5q536u',
                lastChangeUserAccount: 'usig31j9xbup1g790rtq',
                lastChangedAt: '2020-08-31 04:00:00',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'olgh49xh34hh1mq0wpgvpngzyn4d8uq3wrbt6fro',
                
                tenantCode: '4gwmwg8e2i4gfxle5krdt8yqh6lsgm9504g88v4rveymi1ppeh',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'g8mto0lapaamnuw31zl7',
                party: 'lpbbv500wzjxyl8zp7pqj7d2kroiyt1taxxqthy217wmavb490ro7frt5o4b0lz2rzm4otkf5jg52jle34oc2ks527ylynnqyuqh3u9stnjdnzyj6dtpli6tk21w226i8zwi2euwoy6qwx42w9wwjxm1qu7be9bx',
                component: 'cbp2rfkrg64ln15vwy5wi3po2k50dotw0jobc3vy9w1jon1o01apsakseasqdz5fzcbth9yynf39xck25uq0hoigs2mbmm3jpjz651zdysu49j0xh1c0yfejy97alm4vwi4b5dwtchnzy554i1y2q2amye0d5oyy',
                name: '07f2oyfxdhb82hooz9mzvk1zt31fcu22mf1o78cjfxmu6vr6dcslf9c94yf7n3olvosw4tmb6hfsjplo6qtnmzq2x78d9o2h7p8vndm7t2a70fj9qtldr46jexv3gw8wbsyqr4q9hbte87rc67s0dmwa0txei677',
                flowHash: 'xhxquwhr85invo7klpbutqibe9qdskk6nsnxx32u',
                flowParty: '7j1sekrifmzorx2xwm6z7aihy2d76fhalcvznor1wqz25ru0ndzblddtt8v51svy7uex7xza7jbo1ctsqowtxt21fdbeneeqq9kynnzlk7v2p907p9v4ol1psc85wqq5eo1h2f03yob3of21u8hiokcn147kmvxm',
                flowComponent: '8nx7m8ni5y8iahz37uoooj0ss01b9xnvbj8abp0d9mma7bhkxvgeu65dfv2023t877h7zi90mimoj8dpbhytaausf7tpxgtirzj8soadygmmygeco08ydmap36d7t3qdvwxdaci0ggn1601yksygmmjwx2g1mjkl',
                flowInterfaceName: 'pz8nhpwpvkbbnvulxzc8zutxt7xko6d29hjhgqnv6x74o0rs24tz5ecu6w9m3byr61g90wgy5ebvxyk8b27rytpvv53ut3inhwe5c3hf7jcufukozhkp42trfbq0jmihaxfq5xq4zkbmtwf9223qtmp563blbk86',
                flowInterfaceNamespace: 'dvik0a21e9s9h13e3wi38q9xksfrhthe5cpk99eqh6u72x6o6rc4nlszgucsiy2emddyoeidgqk5d04h2re3oj5iv55krcu3v26z1vj9qh3u0hwkmg7g0o7w3dxjoab63kroaynb9vwuvjroxpmj928ylscf4nea',
                version: 'zkdj4uharno0a21oddlt',
                adapterType: 'qkm84idv34gfvvkkvaurye8155evezfegcx5ehmjscoyxdgk6ufb7ajnye53',
                direction: 'SENDER',
                transportProtocol: 't5r4zeeywmlwlcv2bani5rpil3sxbn8by97fu74miyrajq7tcqj6w69ez6m6',
                messageProtocol: 'vvjtqpamipa4bvx8vl2sx6my19dh02istph1n2djkhuz9ho5du84rmsdohuv',
                adapterEngineName: 'hp6a1p9w8518zcdqo6g49syjbz0gq9zrfe16ktfjcwg020iut2ehaf8nb0937mhrwoyccaeqzdml9hyhyqkfcxve02ye0ueabuy6kxo99pzqaecsdvxvrgwb5oyzbf7ja9cruxej9iwo2deiakcsl9izq5gg0z49',
                url: '8qymr4bxv4a4zy2tsffsxsb684c2j4fs5l2co634e0aqo2aq6netq2rb8s04gmsu9kg5tzwz3mjv5x8cc5ti7p3ikszb3zwcbxawjk1jpw6xbcfdorwylvnxqtz5yxsvlw90sxyidiyw14wmiampi5n8it5nr65i40xjt3ohs1ilc8s5qyg1t6c5rf17t7kw60ujrbadw7nju7dxsltf2ufanjx9n7nqmuilcvmk3o81mad5ydpd222kkpn2vh8klci9iqw08wjyvzne1u09x7e5ysiw03562aceiu14te36tnvqz94o0tj5mqllm3x4',
                username: 'eya5t284ormim54d9q3gkb1h7xdf6qbdzmq2x9uf0p94fxtpcov4lt6hrufw',
                remoteHost: 'my7ce0hhgs3f8fihhk20j5j05fpw4c46sgdnqwpj62qlp4ibbfgqykjd4zrpmp37jr8ep3gggw9my2pt3th4634rge70rj320iuc2t2wmtahiffmk9finwhu65admxrff7jrqk1mqvah68b33spkh3a68awvbz4a',
                remotePort: 1284247510,
                directory: '9uc0rv94z6ccnej25n0b6savzmiupx5s9yvbqsmnxoifsw30g420i8u72crzh6tl1pcioncdf2m2xrb3pczebqhtrxggstjc2s2vcugm9k3bsp7pnuswj9250d9f5uont1opsggr47vbct28uxbxkul6grbkvuprzyu6mqbyzwb5219itya860h6p4sceoeb7e58djm07hmi3irz1ex1152jvi8tse8o8z5vp8meqrvnf046fon3bqi5sbl1mjq6pe61t0ewr1ka362etryet5ebidr4vf5jjmdryxd0kptbqo3ysh9em6nhe3jzd1f833sa3wx61ym92vjd1b47y75zuzxgyhi65iupht5o8gm61lrf22bqyae5enxt6jg8kt7bsad2ag8z0udtsareqhynibvltaukneclsgq59okkx7rxy4pvsjskcgc4e7jv79qpm87et5ta8utbx4iq1p1t53xhm544skculoldyyset1pknoytuhd29uksa8jyb7mh5ptwm9niywx0bnnnr08ll2lf54zxvkosqlgjfcte7xls04e9cxc8zefcuckqf1gd73jq3ngkrphjl1a19yvfmzvi3telohfiqjn35tlyfa1khmntxkb67fwkhadhr7pbaj3y60650dmpuovo0yn0cr56i9rfvfn0cqwyy5jyxotf0euj1ucrdi9zw17l3yxeiylqk9w8cwq2c7qu810jqk8doxj6c9m3e8q782kumaszisc2xy6z5uw6130ay24rurc0je2dj6cuwi83m73xctwqpgh3gbx1a2bx2mgujxescqt33fwxrsv8fxweyytnchkyin04hahb4x2l3u52ebvtuyjwzi6z3xqmnzk6j2zqreuaydf8prn1cw25pzl0keda0owsu7lq4npam4mddqe4e3u5ni3yj49ps2609apabpo6cs98xhmhlvsui6wa6y1upiqx5qy5osp6qtk8eydww86nyoruwlzza49axh7w72bu65z3mpkmphoo',
                fileSchema: 'asfv5bsyd8xc69j5b8lf9ael0bd7t8w1c1qt6ee0dldictnwx7x5rn68z6jdqwjjhl51708fp0sfq6ty5b0nvc9tqjgh3sn3dq9pydwyxfhvxouyx7trh25flhtolgbv3iw6fkw3k1mcvbg4tra8y12ptodwv4ywv5qn7kpqdi78pvtmmfttbikh177ik7qjda9uiktll5d1ph8bnrhw6y3esxkws9js266sctmzvoko4t73pnk9zslq0g1ot06gqaaw78upms6g9thcs7kkkdee6rpc0f55okeqj68pegywz3lmlchmanc4cqiwacyip90wwjhllulym8sxz7kipm27ha44uh8zle0x0apdvtgiqqjsqozsuwgqceqiafhhhyd7wsn280mbik3h3ugvklfzcmnpa061abhykug9nnwzoa3rjza44c9439rzir14oulkhffndswygf5cucpotm1jtbvuxnx9f9iy4ztr25bbd868oe6o911vdoqfcf1uan0zs37pyyjf1mtuoolv40nxsm9y83x3xsn40or66gw0vp06tjgxvetkbjtdafurdtlsrxk6dh7lt3epoq9u73s5gez1ysimn7matvn9mnd7vr3yqbkfi57h1qb569ncenqvibc0niptkx32pbsthbb14aed8de45785lhq1s5nnuenb4w661hwkn862ofe286mzzthipzub9vdawdln7vty45qklu181m901tnrubshl3jdwweutm93fzjj5krel7g6t04bvw0fp7lh04jj964h3l8egfuzcebswhm0fzoyjg9peaoylrpkunugzyexx2jhtjs2f8bv5zst02jctc04fqcljoma7nfiz8yr4nb457avicvs51h1dybpv2gbh39nruhny4ulyord255h8zy0ndwnrdcgrkzjjw0lzgg8r7uo5y8seeb8wv94tx25e7ti3utvlnv88rm19quderp0rj6xwe6o5tv8x7lqmsolgkqdp8fc5e2tarzf5i6m',
                proxyHost: 'j3wary7iikuqmbrms1kafnn41kx9nq6ld3ohm8myhvj8mwg8zoie483d6pej',
                proxyPort: 7433939225,
                destination: 'rg9goqrlc8k0evgdgolym4wkfwr5tyauozthhijzu12dxy5pwbs7h6umzi8v1lgfyjatqp0hyvsp65zmg45nodaopiem25bv9a7oa709nyev9af9x1degf76gjpibfyvwg34d97zlek0yuo60q5156afzpf8bvl1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zhah4y3v6ldx6tlxk3isdpgh5qvz0iqqesv97z1jbcxwab5gqc4dg3nn1kdyszck0dymmr84xfms3j5yoweswhobhqd3ad16qw1o2d8uhqv0lf0tn0loxxsm0ugqpz9n6wqdougz0rdszkolrz66o4cbwckr6wfs',
                responsibleUserAccountName: 'm1nhkke2acl8vjomxq4e',
                lastChangeUserAccount: 'jnf1xzxj75mser4rwatb',
                lastChangedAt: '2020-08-31 09:23:13',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'rfyteni6xr0jp9kkn5xr7y2b8d0crn3mv4k7kf4n',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: null,
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '5cidz7ui9yl5sjx34pj9',
                party: 'pes7xf3f1v0000pkk9iqelx0yi5fn0vojgzokhr9dkexvfz8peiz10ilke2tbh6qzrkmi6wl1ygz4i32w1hhs180vwnempolthes5m6a732663gubdjngflsq27e5uwf07so9juezsen8un7pgptht2x3lnjd452',
                component: 'oth66w7aw76e12k5rhhag6gnusqj1jui5vxn0bn8s4w508skvdfhicro39nqtn7sw0dwkrm1wlv2n5h147zmhsj8uow3k4ncrr5wsbf7dyvxyzx14d34xjn53thi1rd4cauv1ehc3nezbljc8j06b7af6o2mf9gs',
                name: 'mpg90w1qexrt4ni9tncjzblj120hm4h1qkl6w2fir7elhaw3x1nygkgasnvngbsud8pxfyfyltgbxw6p2g0413mulhfsqhguh7qoip0ukhyxijcvjl5o0hqr1gx6ijf8gm20ghh3slyeiw4ofmvw5v1jahebl88m',
                flowHash: 'w5ambj37t3hhquc7chixwzf6rwvarhj7ja7s9azj',
                flowParty: 'q8sssc0khlue4ahbkok549l2ooy6kneifdr0xz6cb2b48ab522u32qats4zybrk5e9p3kj75zc9s02bse32kalw3prinacww1ebi6cb63r6m9f1mqg1gm38yumg9leyptrm7jixk0zel9mkmxx0c6vyd244od73h',
                flowComponent: '9g6guya3r6dlyw760tsz4ox63rrq9uq13r1kwvnpgvifevttawccka36htmjmslw65z9xwp70hpl3glzlg0le62pt79w2htn4u5msto3zlli18x0swrm3onybym9403ualbu9xs23yht2x28l5ybbhm2uawt5945',
                flowInterfaceName: 'qb5nhd6w6nco84y75r8dqj8qquldxqtuckx6zuijq1vbkd6gb7vnkjnx1p1kr661galgowz1p891zr4gz9rs6g5pe67rlwx4br93pq25h15caz6xgk4nt83mu2hpnjn69gcfypsftibcw271ax4y26oto5efb2p8',
                flowInterfaceNamespace: 'j09hginzwjbyh96d0vv54pgno3s5jeyd4tnwbbrbrpw9u4iuoyv5wufq66ba2hsxksm7jueqebvr1vx9iklzfaurarhcet5bb31wx3ti4lq3tyveyezga33rx5w5mahyjyfbfxxzvg4u18n5yljiquvfhuo2a79p',
                version: 'bko7cvsq3rra4bwg9pcn',
                adapterType: '8do9oahrsi0dfe1i978wauhfngbaro481ogu7xbrzuun7djrv2cw3sj1fgr9',
                direction: 'SENDER',
                transportProtocol: '1lmpsc3p99s0v8xs9ciwmu2fqt6ygsodls84tm36ivlkn997w0ep4263xmwh',
                messageProtocol: '5p967m6t8hboclwbrpkrjnt0m90mse8pq4979e98j13ot8yrpl263ebex9or',
                adapterEngineName: 'hkh4kn9kgoblhs78st5al24oaia20hi2rrbyrjbxpnn44912n1x3mv5gr9437xy7htkh1wdux6uef6hdvj9wcl1x1xw9u6zzuagam99z4yn8wo25chujcjilulmh3mgvmdjoesgxur8i0prk1jp8b9jctvsuizvt',
                url: '8zgzo8sf4z6h560ovstbzyhgc8xku8ixkg4kvq0ssonn5kf47czippbdzvcj6w03tqw09pixirdc43updw2ehs6pme5gmyciydiubjqv7te8zgsgnsrzu0dygl42jzmrylwfm65oj68zyskl8de91xuckpi7u6af1r73csfnzl1zvheoukury1zveqhwdvk97ynm8c6peg5jp7u9yrc59hoqwd153ohaejzn0ijngdxadxll8ueol0zfm773i9zsufxhiizxsk5saag4eki4svt96bhr56s1ixzlg78eai79fo4i3bq0noqu7ljrq5nq',
                username: 'xkious5kqpihuik0m3c5lpmtyw8jll8y9u3ywlpdj7cczqfddtee9z05sheq',
                remoteHost: 'bmfo1v3zuvjkme32gvgzrhpopa6dq9m4sqlhbzk0gaorlzciio8gb0vpdm9e5aaylofmx5hcuqlhf108qitn4456eho6tdil7xktfk690zwzj827eymel3tqps3js3a8gu19kqz5y9z0z6bvs8k5nkky8806ei2x',
                remotePort: 4566228989,
                directory: 'qn7483ys553judai75c6qyx7ane89ky75yjhr0jjgnrikbma61xlnipl9k0crtp3tco7ciiy714ra8x87wka2u0fnxt8mgqtsf0rjxydwbw3m8bq4xhjge0tp221qyvv3rmszesl24pmkht2yb9jpu4i9mtr35w0d8883s238x3xxocp7qzt4w1hh3ahbpqc9vo5pl73sspgy8rkmohb8ip67tiw6n0rwrnz02cj4pfec3ruyye5oeh52bomr1cx65iilit5eo9vza3p5otobgmesler710mvbrvasj71u4xugdpgxivl2yy8gqqjakoxib3avg0nufv30nfcrnc4dv6wx4qr4reyaajxy52g5z4gwnpscf02apfhywulzsvtdadvj8wap4nkxnko2ljgrj8tp8azysgzbwd2ghldho58bb77pxw79w0w0xc1irazilbahof4fgkj6v15jogx7qk7avgto89s5ghqm1zv7tuf0msy77a9eo4932xzj794n0mjt99ih3a2j67zu0oyrb5sv3jdreo8uj0fbfrndrlerheirvvhjwxeymvc1atossbi93j316ex6o3jv6bintb01qxqj7h91f793nu9sjqzjnbneburwz8bajikzpgo6xc6xp590b6vfla5rffb0iadw3ogzgvh1u9p87lr60n8c7gl88x5uy4j2o9rqckon1g5lnhx0r9z3xgn5p0bp92deqij93yuel0w4x65dyrut3lsagszlpsmvch7ai20jcp7kr27glnabdk5isht4x22n8ke4xlld6opl0ifwang6pr1bn4wajoy6ydvf7vll35g6q8un079fuk2sgq1jj5ppy1yraq71c8i95379wb8w0tu7gwy4gdqjfdiy015ifue6xp97ve5ml00mk5aziprfeblj3ip2mxj0jierfr6rlmekw05kdptwj4o45o91nfd74ykmtcgjgr10dg211c4cw320t7jgjrknsz9kiu9cetnsaeuaca0rbsf6yc',
                fileSchema: '97onsvndsjmwwhkpjb42ekg89rqidv6zeb92lgi0l75gf1w6bn24rsf0j65fektgrbzr11h6h65boldlpius24r2avro3ktzlnwnv21btioeifh3vixl93n2yxwpozs8k332dscykmblod5rpgcvxoit5dw07u81psqm7htobmcbmf7dxqllhclk1n3ti86vdeh0el873480lq3yvno1zps40iamh3cce0ux1wydzxsyzr4m6v37e5ngjdsns5zqhmm0arv0oa0jjrhy6ft7nznl6peb4lf77f35ckquu00358z8h5xvp019axfh3umept8j75deajc6gjheoken1bqc12fm7hkp6qa9mht54vjhrn4segs6zxufbyclf2lf271zah3n829rsklblmgvfzy4x7bjm51w4lqsokqoaoh5mtnprnhhogdbaadsp0hbquly2058hbh882vjitnz5h8l4uui6tnyhatp4buxpykx4a27iy8q5kbxvhitqfep4h08ueq0idu9rp57nae4qz2evdsbr0uwgctc8hvpikji9m3m3yh0phgm09t4ed00phepwfllhnis82ki63hu77r9pss3qitzrvp6fmw07jz6f0cdn23e7fjier81gaery6cdwhc22e2c1bhs3ss2p4wnxxo2yvi4l9cuj2y442kpvq79iaj68cihyn4ri8n1v2oxn204hamhoaje2azkel3wy86g6u27deawih6eij1gbsxh4rlbkde4l052io94jczp9zfuo6oostbhxyvbl1ekp7mwjprfk3y5iwjetxlhbmivkztoiyzzea65x3068mb70ie5jmvn0jgcd7koymcoe8c01vhxrilaeez4wkvbrc9xmbvtoqkuk2wub40xovvc9rbw5y2bi3p99h23b20xtvqw0re0cdfygk397czlgj1745ze4smpra8n4g8b6us27h08z9djkmam0pqttek0rsvpgh70tjqb73anngiglwg8fjgdklepgw5qrtzf',
                proxyHost: 'zpxpchrs4kg5vzkylje69o0uy5161o1922i2kcekoo2n5lturl9pxuzdxrm9',
                proxyPort: 3342369335,
                destination: 'anqqbqbak22dwsvhec3s2vokvfbdyd4d12py7kf657ieua0llmv4p4k00ouyod9elptl42p26haguk9ptf22hxcx5q51520q75bjl5gbuvbzabg8y1j2ql639lc1nb89wl4s7ro8ytc9uclggiksfqdt9u6js8aq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cgjh0z1xjlayb6zy1vcle4ljbiu98qc8pdu7ftwjmemvuf8dm4wza96gdr364k3opu0yqkoywrksgime6qvf3s2yjl2dnu1c08rhvbdntkwg26puat0dofh13yvf3husekoxmn4ia6b8e5jcfrvsgq6veue99nbm',
                responsibleUserAccountName: 'd3w5n6dsrfkt7cy40fmj',
                lastChangeUserAccount: 'y2xq3fi37p3s9v1vdob7',
                lastChangedAt: '2020-08-31 09:24:47',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'a7djop5sd8pt4dhpvgpvr6ayvhxgr4n5j4v3jglb',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '9sq7utmp14lwckmuch19',
                party: 'e3putjv6cjda2k8grdtth2anwmpemn7gzqe1cbuhmn95f1qv6mgyqr2n5ls1fqhifko9oew1wwsp28nbosqshod5jz7jhcux5x4nq2ho5f8428sxcxlb79nch2v6ztciu43hh5pqeu0lerbw18dkknh67bcpjxid',
                component: '3vjghgw6bzcvbssjuv4i74qpzml173s2410q86ud5v1nhrqzhwen229aew2pmrhlodwnntuhr1ow21vifvg3mliq0f7nej52fvh1xxwauro66oa8k1ix88vjc0yen51h8ry2n9xy6y5g9v0mqibjmgpvlrh5su4x',
                name: 'zm1jhopg2lxv0mggwik1o4kjg6xwooc5onrufwse1ncs0kpsd22rxpbmpje4ewujs3sx79sks8prqum5dt6yy42r7hemtckyq5w9ec1boumoqrw5zoejcikkj2t6k9noe5el8t5y17tct7kysbd76xigsxkwcplv',
                flowHash: 'n6iu791s4aw0eidamm2hmxukboopptyoqly4h1x0',
                flowParty: '3tfry35d6qmv5azb2ho4bazos82j887exprkzgb8pd8o7ap8cpnyms8svoe0lv009wc27eva9tu0t8oczkbln8c4db51hic7e1llng56ddfyh1li9gp8cmsd210exd3kyfa6i7x6cw7svy0sbng9zbs93zo2ae2d',
                flowComponent: 'bc148omo17vd62u2udb53m753kee8qf8ycqrz2q14p5evkvf2kz9jfuch94jdgn0lxqcti6b5r587ne26txnodpdbi70z2hflbhvqbea49m72qhc0xlsimlq0xwl4ty7ryj20s2gpkm9gwor7z9u05pmwl37tpgo',
                flowInterfaceName: 'h44xdby74xzopx5ctb7fa1d68m2ukv6ryufkx9a4avhlowklaxnonxyp688281w95t67n1fhk17h3zpr0p53nb0ekbmze5c9qi7ctgzruo1gd26uw66641p2hmd7mg44cwwqf4n10ll3g8huib4v0s1e5sawkxzh',
                flowInterfaceNamespace: 'r4szzc953vu3sfld3wnlhh3m3fqg1t4ythxrq0cpodx95zj62hqf16yllplsxccr4tb664ap4pkm032bd3h5grma7nfbmgo9e72okbu7azf46lemfm5k1rzl01otr4z0o5bklp22aok9m21t3b7204uh2l58xcgv',
                version: '73thuu6ytovqg9pe2chi',
                adapterType: '5pgitcxh6ytopv1etkqnif1amsuef9j51x94c7g8fqxcm72f0hqwjrojpegt',
                direction: 'SENDER',
                transportProtocol: 'ooko2q6vz5o0ptvkmnaktkrz2xzv0ysyz4f8mik4oaphxiplswc0w5llj862',
                messageProtocol: 'ssc6yu59o1zgio3ho1u5qdb2d0mdaasgc99wh75vn4nbsek1khiq1vcjg32c',
                adapterEngineName: 'h6ki55c7p9bomtx4kf2tmbwo3gpf6g3b76xamw61v9jy1ci3p0pbm0o5r2ylbbmgqbehbe95ww5wgjrp6u0blwa8pbi7r2dmiuku225y6mtrz0mgfmckuhggs24w7k9m22m1t1mh8ocwqmwbmd7jvv0ird39bard',
                url: 'rmz6pkxymdjqhlr8b3ctpusfkm5tl460hmsld1632a0bb5wc804k5x58dbir74whmye65lla4rtf2kesdsv773s7eneisygjfdnt1srt54x03vjef669sage19ng4kfj7ramtzd186mokvfesnpouyae3y698c7xoi04w6a7d72wl54msqrdqauimchl0iisuuzujfsd7plef3oym7e9w3rwzh72wubzllpldb6bzf2bk472ji767hqqqdx6lyiw9p3qnii18t24gzhmjp0pk9roeay7aexwjdpri1r0pt0o5bb6z628gleiwgcyoe5m',
                username: 'psfjig5nwrxwbb9od8m4guutxzw798u2yggz1oljaijaccdedygcays6zo38',
                remoteHost: '0vso9f7owsnig00zjxtzmjexnpahpyt4dag4oyhzsqvwx7bszva5a1a6uvjgcrni2xefwcysm8y66r913sglgasej8ia0o1zplcf6jgs33tnm2e7ryvjwrsyd6hmgk4jk6fnbnfgfd2mtgmv2vl1vv6b4f3jal4t',
                remotePort: 9687755220,
                directory: 'bp8dvo2ogqc900k0wsn236ys91xvgbe2232l3021jd71e9gh876wwu26ps39aztbxbcxk0bh3k4f0oepavur4pyp4r3sn5fiikv3f8n8akuvqmbw52z0usj2vp2qjfmiovr19tmuy5h9dk8kerc4bfpuor1cxl2z2jt0upa4armgss4de2ajae6mc9ozfx5awwfblpdmbveeadhdciyctsjkhtxncdxrswsjdaqdc6j80awi3fb38rp23liv4crcjb9wiact2jh0xrx601b0tzsmyqi72yu7nju4xskorlzj8nh4dtii1cnffjh30qddgcjuxlisogdnbgnyy56hyvph7ve3z01gh6gmk7njuzc65yj18wzk4vn9t7pagq1jx8v3lfxpmw1iyb0iigba2kb5v31a4cti8vhwobhwvf5wpl69nv62uo4i2uu63vn7c0mdmlytzcgygwy7jfiayx43q9a4n3h2ozidu7uson6gabdho0x5815qdwkaf5vqi1p6texydxywhpzwwg0ooc4r9fidtejz7hssm2fz9d8vx0g21snm504e0t2n39z1688b5mqdcfafox6qhzy05ure6w8wdt0r1obd3fvdk3olqc2mkundg7sq2laot0txo5ovk3nnfr1ilrjv29n3o6fh69im51fmukjprkubn44g1dq4d4ntvzn7bj0v13v5ig09z5ma8rj8hx5hvwaygaqru9z6lgs42fvmw1q08mw371bojkblh789o67y50l8xeds5lgxf2azltfnlr983uvmqc8prtk5z3igl6uecbghfpb1ubompyfqevg7mf4w11ytx2i0epyiqqfuuvr27xaabv94tkggn5y608djgttiavjbl6ygzuagbpwd4a3kmi2oxvfch3chw2wv66ksek5uo2zya3kjhtbuphr2p7m1pt4h7gtp55nhk7q9900r1barohernevum17lqzgy9n73l2q6zeg38mnbqvl64m5fe74w8qr0h7dr1n53ly4e',
                fileSchema: '8ykxz9fhoucb9k2dfek32su6q4gwa4uy4fxu1uj5o70ir4on3c7wjegkxchaxmcrnjuyugq5083ecbcna1dmgshi3oe2iryeug3sukfqcdbkkxr35jrv9fxxxtk2amyf4m7f30pn8xakczgtffsv92iwwy26l50bocukz2al5qsogdtnwksy2akhludu7chm9jtb62sx821dpt3zbxsspgglc3dxb105tmyq4urw84ebiwqtr1249jjuuxtuh5ssxmrmbjfwclssgipjgygbx8qork1b3hsg51gulxlsiwugso2i64xn8deibm2szp8vj93yh5mlqf5b61qr5x1k4tjubo05koni7z4zsivxromjfxk1rbeejkg44whskujkzu4mk7ecidcz5klhh6vfm627yupchmhpw5esxtnp71qkqcca6c2ie1erzwg7w0dhdkcjf59iykoelymsq36y5dt51ci0b1nivagk7gaget4ftxxod79f5v34v71lqs01b0nju4gw1k25nmv4cy14qh7za830mdxrlu1up0l4lkvoyfp93ujde2960tlfy6un908ynodynhnq7tqqdcf3hdzbyt0k0gxqrfoa4cv5h570p9vi9dn654b9edgxnt44opi03sve6tpqiqdafuhf71662ecchjdhvq81wt26vzqgbwzwck6s3j6excsq80fxa99luoyq9jq289nntnr22q95x4s6xsel6a1uz3jusoxl7x3vlv9jlaso337jowh2c3l6yjgejczkek49vq5aya86cv0hah8fhc87bphenapzyd1xnrdh79kec1rwllwgxqel8ldomoar5iir74jqy83yg7j0j0m5cqthyakukgivmrkind4lqjvi86dc7j7a893ce2jhr908z4rxnu4b8nskdwrojqsnlvjfe2sfl5z78c4tvfogv45wfq7pw5k5otpt16y87xttborxctbnz6hjb1lkmlaz12qutl9bmkofqi9rbb4ufn0nzrotw03b',
                proxyHost: 'v2f5oawcz8qqqhhkiis32b7gnxrznu295zqp612306srey3gjgwtv2h2h4gq',
                proxyPort: 9326420141,
                destination: 'vanzyya6st7xeqqynw0xsiidh6y59c0cx2a1sbpsk41t1eca47w7acfghi8qbrqlp2gnczh5z2rkypk2jj3wgu90zahzt1zqqdivkcz04hs2irh6napax8by7wealw11f8jf3bd8fy8qp5xvjtkz7nfqkr765k2v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dg6wkd1iju6cgdlvnq1ey9ee2q7o8vcdrda0wnagpp16zw8a90xcc8ddp1tudaqfhwzwoymxhbxjaczciqaioy9h8vsdaktyjuf2cydgyfab5oalbng6klfmn5wco74ajw5adhptvsg7e2ocdxy4r73twemp87pv',
                responsibleUserAccountName: 'admdr40ewzvuahnsuos7',
                lastChangeUserAccount: '4du6kj3yy8utlfsfy9kv',
                lastChangedAt: '2020-08-31 12:31:07',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'i8gueo2ahc3el0y1nm3qwdjau104a0av2o1t42do',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'unuhff6wa51lddth2djxvdt1o960jn1sn2t71cme6kvj5zyxwp',
                systemId: null,
                systemName: 'hpl04a09fw3yhica6sgd',
                party: 'me0h6njbsc9liyf4ludes2n8z9g971u73ul2whm9ln9jhfleoa7umavwp9oa5ihkpqixk1igy923ldj45uoj5vd1l01seck9kum32g0l6quiz10hvax7mvfli9rmhepy775ro2ec0frdoxwogw9o06i52n6oy5pi',
                component: 'xdxpjzz53kple0j1nsy8e7z7otkimdlfcj6cb4mm1181eicds58ahurfcc10fxvwkazk5041zecvl8znkjxkp7vp7w3bfnbdk17f7b0n3gy8s3zz78kk8wwuq76q6nw9vyo8skbfg81yoet0yg48wrovguazpkt3',
                name: 'm88cpunvui2h6ca912mt90o0xlootmmumqmk0awxlm2myb99zmc526is49gdivwh4e218sar79zg5438cbguwc9vi4m7duxxkqdgoztwduig666vlzn56r8awu27l9pa93ddccy38ax6x04i4jjz557v2kgeasec',
                flowHash: 'bqya49qf1kryyjgowoaiwiyya4nx1x5hkrwwrdjd',
                flowParty: '3nu1rwojt6a0yympid28a16qvj5fn6qvpvohrsxflr857cvnl2nr5n4n5a71tgy7pogsr09rlkylo32s36j7pl45dubj0dad6j2n4zfpciw6opwhfhk25qr7sohi9desfy1cyl4itysaj5x890hgt985d3iih5yk',
                flowComponent: 'q9xtqsj7rz0q9jfglnau3hb8iy50s5pb701vx9a8ka8gwfzck33givols44fv0n6ljmkhg1vpl3gt5gu2piusi9huigv32v3yg7fq7yphlrgkzdmnfljli4xkt2oqlb91x6eb3lty89tag4qsgagmo63t35u5lgf',
                flowInterfaceName: 'o4nt1ovt6chta7tpqxaj0flecbg34a21lfcmh6255j9depp0qryz58rad6dnnngv3t9ysb84ml26djlbdc71jxiuj33xa5vm1810dzdzsxv6hrxw2l3e936xqgtt480hjv6uk2ir9eplyypr76g49girqnxkit1r',
                flowInterfaceNamespace: '6bz3nphejtogg5388rexvg7p7xywkiqp3p8p3agrg9hh44c92hlqwp5rgj8ekeam6750bcfdyirznzkzbgxo77plday17ea8bg9jxbhy7vp0nnc5ty4o9a8idh7dsc7jvdl8gqxt7aijsb62p016rlgn2w5gdzeb',
                version: '9lhunhapft29ht92v654',
                adapterType: 'w3rj9babi5f7qb7hkbpqa5x8b1ig23yj7p7s61jfnmx9q69kgsmnylduwlkh',
                direction: 'SENDER',
                transportProtocol: 'in31udau57vr4h7drjn7tt0zxa0gqv9q1jxew5aq4uvylcgg44ccqfj55beq',
                messageProtocol: '6x84v85bfsceshz5uy2myq3pysnnn4ms6ww9vpvx568x4bqf4pfff93aed0o',
                adapterEngineName: '03bsldmxaob3ftks19nk5wlx8c7ggctt8styz533mso99w1o8nh9bgfr8ug12g6fon31jiqigc7i1iq6pq7udrego70shaimamuzo2z18i4bfzuc58sic94zq05vhogj4t2tiy6hpq6gns8xywtd1ezobva164f0',
                url: 'caxql52qpudm7fvz4pk55oy23qv7ru43x59ifgh6qqbegegku2kxsefvze1f3j7r1pyhvw93uhfwskbrtzpua6me7hmzi0jvrzb5kuqlfpukvavneddjykxgr5n7eay8w4n9vjkzstsutxa89iafvlfz0t0evecvciq0qk2jzl09z4p4bkkmf1tdi4605wd5ymkjo8qr77t2lm3sb3i8cgw6fyvkfhyuv59sy44ql2y2fiqefqg0ky3082ggt3rmeksidfelr6wui1sjvkgjzoq4utwsm8jxpzzf30onu9n4b752pyu240ajdmujjbpt',
                username: 'm21h9z25s7fogu3bao8k5p9t14wz2o8zeaikldodfhsezx5h6byjduvuojt5',
                remoteHost: 'nsa00vo1z9y4wuyl3y3xbwqc3jdz5rxxaf1gw5amz64jm8plfg9uz8fslo45hqw3505tyudfad7s8fqjd26ax7s0osk0qmbs2ne9l3dn425wovzk4n7x2nt9pqwdw2e39izm2ktkqc8h7nv3mqh2hnymfadlz6ty',
                remotePort: 2662228048,
                directory: '7crkc23t24e61tefl2ba81sroj6vjcxivp6xk26mtecqenxi5cr31fw53dwjcjeeki7v61l6u2m98yfmztfxk5561lf2idrs9ihs6u9ts9iz3h4vn8jmtvirkxkfejd7ddkfzz5oqitrs8cffg3erw3yndf0zomx43qznmr5m71e0ff47n3q9s4v8vur174o2z6a8vykqrgep1xoq91456gez2hhr9rr7revqhmsa0ihg8jv979oi8220puiqi21lefy1nhy5n325w2u4oysyzhl0d13uqpw7o0emaflr53ukgyymang692xilz3pvxfi9q4lu60v6msfod43djjxkn9wio0l14tw47ggz5ud7d8rydq0z7je55c9yiqhoadmneq9cbw1if1w6fqtfztii81191qmt0lsb44vhcltedtv115tj4myaq1hlbaea5uf0amhz1tq9xoly5l01atqaiyayerlpvsi4arq3r8o8iw4izlta81y2fdlcx60mzntyqtp0gawkx1fjrz9hw2rhgh706qehltu8ysf0gnfqfknyulvt2l9hcyreitsgq9d1sey4og7v510v4efj36va1ai5iwng2xmhx0jfkkqtubq1tkc66rngxd23e3dusjarwa70n48xv9cmqsd6j9cxdv7pxjwn0s1o6df48zzcqtczkv8gk59kwxt60ddfyzb8nizycl0jda2a4ec1lweby26dnnw6mige7y2j2sk8h4w9v3qvxx8zzrnbguqhzr6vm8wwxv03mqffnx1avhs5xjmznh678kbswkv0z9t91x116dtehsgr147vv932b9g1omg834uxbbi9kjfl81n5w7svqlzqc4jxuezdoll1sk7z1ge5dqyd5hexk92us7xrgwvzy1q7jz13o1mv31dkf23t5srmry7x2voqwb2fewlmauuqq0abqmzgbe5d7v96ra771f2gexiwjx8tcjv3085x54zj2b0lc82hd86c3qf3owddjsszug7e9k1bya',
                fileSchema: '40zdwty69aunmahpauisiofgd8y3kag7b5nuuc2i32r64pp6qi1fsl7n0hbuikp5tjvsec18xuzdefna18k8qd6wcfqnmsl5kxr05tenkh4ppd26krl2w0org4ndjhrmhflja71l3vot3xqvzoxijabnvdhdplc26yenrpqxm1hb9wtnhbogizh53psgh94ixrzaifg4812fq7kkeni3q9hmzuiteb7npil1dy1jcvd7o35ki7985c4w9792zn3nxjdd7b2aqkpp0frehbcpture7leap7a0jyhugq4y6mr7b7m8bkfi0q78zf35w2ln2gsn0p7ysvwk5siusu0ztt3hf557ienb48ymwodkfaexqmgmmdprcr099zbqxit2o63zn0t3yhleonadpk6gm7a7l3imcq8q0q5ngadl9qf6jf6v7p96ifanir38aenz6hrkn7iuf8kb51cf4ohu4fwdxr731hfu2x4wj6ic5tkkdc0sn93px3dq6pwice31dgq1cutlm6hi6s0ih0n8z9nbb04jpsgp64tekgo3vz1g2tut1g5dqwlmv4h36ru8vkdo3ltqhx6xmansq5vxb5hv95dspm9g5b1pq8dc26wkk4xcvgt9xb32ucpfmr2ryao967ndaeuwre5ve7ngqxqggp7f0cqh1abw7krxe02noiki81lg8r1w8t620ckt2bqqvvvkbjzk1rzewajhl4b0brd7mrc8t782eza2n26jgp2ml3dgmbhmj3lct3qtwpck8h7llo2g8n26eh14nnlnlrjv6pfdfinwci6l1zcn87zqb6db93dnt3cqklxug73sl0ju1srqilr9lcfmzgk7gwvrd9ium79nweubq82aamtq396qdpqgm2fcl976ra0c7mgp62854l42ceq29vasg0dhz97hgtz3aa66243zibssfp2cf6vvv8merum7nzg22mufevowm8kdqj6wqb7oea4dcvveul4macz5kjzcwij7zoc8x2wynpnumqcv',
                proxyHost: 'h6bepeqsoejjtf11mti2sufqvu521ids6cykgvhlz3atf7l25ws27kj0jfeg',
                proxyPort: 5326647667,
                destination: 'v56nc1pfeoe3wq56ugh7mpvrlluramehnnsyxxckudhzw8y832p0s1mdvwx05n62kj424vk2ilbie88yx0vlgjn4yt55obdb3pn56kpr22qncsb9fhde0zz4a85jttnmjhxt99ohweotv827x5vhvs7le2k74vfs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mpankrpbquuk4bqw9i0cqmydcu5rcxjllmrvr8k2m7h00muyeff9cq4spujhihe9jhyq7gg5shs1lcxd4slvf935r0sx4zwynbg8supuj5thnd5wpxija2vjnhrxq5y0kgnak75174ahkh5ty6mrztiwngwwbm18',
                responsibleUserAccountName: '9n828krfugsrh2nti6m8',
                lastChangeUserAccount: 'j1trjlqmzyl64ljs4czl',
                lastChangedAt: '2020-08-31 08:34:38',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'sk7qie7ogwdwy24ptqzqxxtrl9g5qm5p60kj55l6',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'dyxorwhk6sm6oizwo0vg6aulk2b89mviwzcyzbhh5o91plfr5s',
                
                systemName: '9l0ysregja2aadgk1szq',
                party: 'wek2mu36g0krfsj0hexbhogezy5dmf1h5o55l8twjdjjic9tqhk8eit32ef9s3jps22vxq2uio3h82bojuka5csr3mvdw3moesr322f3hce1ct4d65znalfwd5xjlhwtcyqw6dehhb0z9y29n2zkml4p6l3qz7x5',
                component: 'lyctrcbpio4nfzovvs2l4glfy6s05vjqzabonomja1s6u1al5a3addfk5ppxp2c6aayq948gcz40bopsir41j7q8ue669qao9g2xp59asbdoppbzvmt5j9z4tohcq8do8auvfsg4m7p9zupdfm7pedhsln2hdy6z',
                name: 'dd288yp4uhz4t0l13p1gi2dgfnj6r1daz5hm0baa4l50w1czh681z428lrbbxry8lgif8demmqrdbv03xt9533qfy83tsjx7fpkevztjfu0d4d38xae8hwuhn3sin55sy8f63twx67pshtefptargkdx8jto9cc6',
                flowHash: 'ofmq2cpisbfs54gcxeyvenqji5yfjkfx4y66pvyw',
                flowParty: 'b6eugn5hhdhb0wd2kbwz6wgcrn2xgafdu04z9d8qaasjkceb1ibqrcoukcar7iornj8m1c82c0b84itbmj88vly7u6rgvg7m85lmv135ksgugpxd4m4rvalzlm0vixjx657e42bp0blya5y5r8wo2v5sm8flql0j',
                flowComponent: 'dx5la43t4o746fv7p9yi6t5oy4fr2361whserj80la0rcu1p8nef3cehk6krdm2oayu1sfvbuzrlkduw7pqakp4t32rei4yz3m7ye2rn20k4iok45mlg5rmaks9yj2mj7rbzfq8x70zn3iisbocn7s40dfp3mipo',
                flowInterfaceName: 'qvmvejno15oswqwcw9zdwy2ngskx18ykay0qzok9uyv4e0lqtxroz79xra14stahfvdy5po27zi7q1rmcylrmmbkxlu3hlpqcg17b7pn3kbmf8acc9pq266vxgsrou6ct1hiif6jgn157o4v1tcs1ag22bis35t5',
                flowInterfaceNamespace: 'rqaoh91q4axnc9y24p63nn6g98xwpzh9b4yq6gwtkbr1ipg17p4irunorb6bbi48emb3g95ljf4x6nf8fmve2t69tza2y4jyc0oyxvqyi2en3iihs92vyogsa6vhdgsmyqvnf1ewlzi00jg8w38mnlu6xfhy2cp9',
                version: 'lfgzes3rld365ooyygny',
                adapterType: 'cxjy381nvo5lhhczrc3duugh67mzfdu1l4ugeht42klhr9wvqb2yo5jokna0',
                direction: 'SENDER',
                transportProtocol: 'zjcv2eik9ytep3j14dl0wv106a59668rl943h0w4crpwvjd6jfwp3sfu94vz',
                messageProtocol: 'likd8oc2rsgruy6n4yinkbj4di0fw92nswc382hyr5reo10x3kg1n0cdhmwn',
                adapterEngineName: 'nok9vrfnbknwwuc3s10fjxml4o070x87nxug7wp8kit57q2fh6u27sg7xgjdit9138zxpo037fjjrq1tx0luj0zwtzacxwsm55q25uilit68bdloo07l62eby7zto6rgzmfd5gqcez1s8rqjydj6chysiiw0s1f7',
                url: 'sduy7570wg2f8keig1y4ieiefwanwq7o1lrqoa3fke3divwl62rpnxt7qijl6wx3f5y3kfln5hxwxzf4nvk1qeaf5i07dhk9atm1kvxsfyxt020b4773udig3axwp3ixtxpdoszt5ivcj22c8lxl79npqdz3d8rob0q8siz7satukphletmnuwf1zmblgxw99rlwxolsydxxlrtz1ttuc4m4bwulvyeu86smo5i9p7xzqcopjdhp2esxa7d8anloqyyyqwh3tlzbixwxsbnyx17h2loy2ew36911cq4q4dqjyprz516xblslt4s4m415',
                username: 'lveihtwjc5hlnafcqxp79haa0t6xg1ti8oxjn8w2011buaz1g7l0yzwvtw65',
                remoteHost: 'knzfdml419tdqpz60f1hkwtwd72yxu26gf81dq9jp4k4or7ztbbu50l6a1vygaun9ao6i5fqw8oyxpuaed08vik3tw62gjxe5hjdgni7wz27yxn86vyl5idplamunia0hqmp2espu1nby4ht444bfckt5um6xxzt',
                remotePort: 1642764272,
                directory: 'rp2imbcs94orgtaiygawn4yv8fduiqaodu5i561t3shs0d5iic3zogbmsr64pfiwzmgeud6jy70gf3nyr6uqbjsxx6jye22fdfjy5vuuhnix4gyw6x7a68a8cl5c4utsmb7y8a8rx58od82i7vkt8hx6wrnljycod7yevd8n9ba26wkv1dpoqrl2uxj8zzb37c25xish3r7csbf5qrq9qyth1yjjx27bmw8v72bqevh6l0uzg98bt36e5vp1edndqsu0a1s12wilj96rx0c11ag0uv0ueuqxewdd68tsxrg9jzd3j4zpjy9y1tofvbvq5gc9kirrjbhepmdl0ez4qjnx315tpyb4ddwyrxj4e5j32tmqa3bzze1h5p21vcv4yff9jh75o6x0f23gvwcu42zl7ya2kq7dg31x6y25m1pcepfvjvdsdfvkt7sho0jkvveidozi7in9ep9cujtr0gif4376sw7a9d6w1teeuzlh38fd6bvvmseko5zpe5fpl6wqly3mh8gj7nclgrbptk2lnjnr36w9xeln4z7m4myuwckvo0uq2nv6ytf7aip92a60id5dukiyfmc86jxy4p0lpc3puw9lx8bd4ozpl6smc2n0h8pv9orqe332hv7m2jeyxt9g30j5rhvdqordi1ui5r9yjzn7s7dsr18szp3xv74yv6gn98mzufm6pa89aaq67p74b9p14z5osn749n9g37jgdm3lpbvvq1is32noj43bfht1zkfpud3vo2hu60782yat2e06rh895jz9srwr8l361ofyy8ekku8axz8tlrv9nti68hkmfiaau9lmzt59w2imjr1n4l6h9gunm6nqi3ybpzanh7c399v05g063iqthy9hfvy34szsxzbwvu0gaks9uyxdt0t5djsn0fzjkoyeal5e6wc71bg4i4uiko4cfc6b1nncbdv7cvzeoksup16f5cfk6ncaxkzalkthg63uqko18tsq1yrucoi8im5lqenpiynsut0jgwi4',
                fileSchema: 'eumbcm5v56kqu6kv3h2owikz69dgvzfmsj30fkyhf5gttobdx7rzb5gkyetl19ccwspbf86rxnxq6wksulkiqs3h2z0k40fq4is69rj7anp26mskg0r91hvxist5tvvmhr0ky1tutr2twfdbumeqcgqkpg0ujt8emt0i8fl422jnxfykpbo11809o51ivjcgh5g9snw1aar3c0dunjdtokupzloi9bd2okp2p2b0ebk856wypxev3x72wnw40uxdmgnhqfk38p4wb5j2jwcofgm64pqselih3nevkb05z3l2k103ys18gj9zwcjq7t0kdf4638sidal3axuivkusov2d5gdch8qxvplrwin91f15csqlq8adbl6n71x6uqc6v2npxgovln2i4sdw2ng9e7bn8mhmaf3iyvyu5izswk6t1cirl4clpv51dbzaiu6ep7zy97g5elshtbutv7wktog7n6s8dzhf046gqb8ztt4wrnum40hni30pt9v9u2868e577orh3c1pqs4e8e6qezuz6yh8z9fo7ov34i2q7oyfhay7cc1yuogrwfwpcq2gyqrv1qm0sflayozh79gykyavxpjzqtx7ns2qa57cb74us2gg3yguqv4df07l71l9acafsmqb66l0wals3ce9373a31synq0op0un4w2u0pnhx6ihtn2awgbzveouk3d7fw9369ud48dw04uyigmg08b51ym733hml5j0ibs8ly5nhzhg103dc908pwr9ycpk2zc930ib4lpny96jxyan8c506e0zcref7kerukcckt11s3amxqbdsncfedochwici5emtpq20ovc0rd3npk13p9ifzr84cz49ya3klru3xjl32blvb44w0ftv8av6chhqicvw27f53qqzdhrmhov9ywsqk0xgw7pynxsp9jj8sm518om1nw289xk7hhrfjsmv8o5kwnv8migot2237cy1lkgajspgboviwivnh0m24y1tcgm21m80qwvgf5wj64y',
                proxyHost: '2f3q3n0seklpaccjokvu12ubs6iwiamfg3yvd2310stdaq6h8ie2gj32dac9',
                proxyPort: 2948543960,
                destination: '5okxw6g61c6j6o5jahjzhd5qj626pz2nc4ngsrw6kyyl4yms9cp8pakt4ggnfgaxcdjxeav3gf1qm332x80bimkx446eqlqkt555buevaerhd3ks2me5drk0mn9zvzacghuybdluxyusl574sgebskepzjzpr1wa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bqjxpcmxj6cbos8td8lolvrgh30exic48dnzzd3w7dr9wur5u6ha1iwtya3dlkiy9nou3gga8k1c27ybkecelz559w6wdoodt4gpxksa2sm6gwtp52ay9ytlfgntg8m67s2rjed2tb44sh23p15acs89pwywjygy',
                responsibleUserAccountName: 'dkg29lidw2s1z8qwcaus',
                lastChangeUserAccount: '8ulppy28frr4i6aa6xpa',
                lastChangedAt: '2020-08-30 14:22:16',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '2z9pr1lskd4kgv8f86oszj6txg629w2if0xgvie2',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'd9rw0a4n7gzti5zd4bgk3bswwhrxerlgds2r7g2ohzvaufpuby',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: null,
                party: '8e74dlh958l8g251m4em6ru5mpmkz550g5ar7stlhwsok3odbdba47hi3kr1hwbzxnb6i9kqqx5ux864cojzao54zoawghd3qen20nwsfsa6a2b31fzejguein09g9y9hfoaszlo1ofvzvjeolj4xaix51vqpm06',
                component: 't6wr5xr50d5k9rhp0bdtmuo2inri8d3fcyp6nckkwnallztbcop30ll48990ljvolbdd0etel177hkxd3symup9x50fuz1py8sysqu3x7xz4lx07fogptkpxbrxea98dprz64dhkdquuxs3z90jdjt0qkndj4bwm',
                name: 'g3uch1633hu2hmb9ioj3xxxlikik3flwfbz5zcu8dd89ab9nnrpcypj6mz64pyzxtx7jv2hdbnrkj2v8rhwhv46pgtll91aqqfozjyqijszk5jck2x4l1tc3yki1b50k15ur2hpmjst53iynfdh4gre336q939z8',
                flowHash: 'fp3kkjlfj2mlecsrb3cla991zdedcp4ur4zdzlcc',
                flowParty: '19qct16r5ijs9ksh67x7cslvdhx0slrpixq2grin0ktptsmblttegxfmnakmrrudilaecbold8tge5q7iwugax1pe9o3bxspjf5omt972yqgvnhzl00fh13tqsnfpuxrngcou0z2hy0h8lxvhmggj0ax888c0aeb',
                flowComponent: '0hi4vn2q0tpr48yx3a8jl2guj9gthjui7mn9zqifwq3scso7a1g0wuwols8rtnd1sh11r39k9n9jz48uxmrumkd9pco4wm6xp44rft1xt74wket4dnrfs4q7zmi0mfi6v7gcias92mj6djf7mp1nb54971khhxwi',
                flowInterfaceName: '3swf0b5atiuqao2jqlmugs8lbjd5j8y45olqqppu7601e5s5d0imvlvoaqopbto8974yvn2r5hhg3cxu23egco1gr9damtxwqda7izdht3v8atmtxzldlldourmnfs03vqb5n4z4yogd4uha20eldf91uwu5kxed',
                flowInterfaceNamespace: 'afjc9sc6oh963dbuq0qbk9gny7tot2frlwgyp0ngkjih2tjmyfzhes5jkq5i5gr3ynkryizqcar5gm3a8p99pw8c7zr0stw9yf0d2sdcme63hipnos1vym0ayhymjfctd7rviqqz3gxyaw75lmwf0sh49kbn02my',
                version: 'iot115lugqvecnt8omr3',
                adapterType: 'y0byjwe1rvdrmk6n3kx7t4q3frji8ivsy9po4v63hpmklbphtp6vf4gdfzdd',
                direction: 'RECEIVER',
                transportProtocol: '5h0i535b39huyrxddn93fsdnx67xl4n8thgao3ec6mq74h0gx61kqceu1hqm',
                messageProtocol: '0re8caiwv8sw4goegt5mtj0jazkphik3v5ni5sx3htmhqbsrcvezd7ttheob',
                adapterEngineName: 'prsyhhbjwt19cygoxqpjy3z0x56ncbfhqdxx67dag9wdxvdxnj007rj214bsdw6dgy2p0n5mf3wx6j8u2wcfx9ab1gpa6iuabjpookl3qih17s8zwcvucb5jh8nanb0f592sevd4uq1gu28wzzufbnbqbk9wq36z',
                url: '32h8y93gkr4ljou4wv53yews6b9zhpyt8xn9vzipjaqrfjnnazi7f8htviw7ry7n33q2anapy9mchjnwrbcbnbr24csnc0awaxyvuz6z0f14o4vpk9je5it5wex3npc50gfzgpb6b76jhmjy5222dld3hvrj3dqwgpx2zzdfzwr1auqnfui3cqvkku4i9hq369vecssen2m0ev55beikwzmtygex9tq2o542lal0tyvtpnmftiyb8xsokgdsiu5tb9wbbcijofwsvwog77uxyj7ziydr012dsgehfk07b0bi66vdkvsb68fn1y6sgerb',
                username: 'pxc8z3uxqtcvp6crbqkca9ol7t7citw8edyo40ployz2tit3vqangcvt2stf',
                remoteHost: '9aosny60smjox3e2hdu9cjca00ynbwrs0hugyxqhhwy8ploms7jxh6elesfwbn950bchz1c7mqght4glxpp0pmzh99id4myxyv6h5ae1nupxjr6onk03hy1l6q0m5kjbyyzp9mg42zz0giyeryhslvhw8nlnpkv6',
                remotePort: 9032364012,
                directory: 'fi3tetp06gf176rhvcnlhxl6j47e8dndfho8h3azv23ly0zmdo1d12amgw64dfvrb4zkxmg2s3x266i7h19w74ri3ipy5k4fkbrbim3atro8ur4qkr2pi8pp260jkfxvzupnlyozxhqal4odi1ubu4rbbnfetif5b4tt5moqb5wjf1z35tfinkc06bci1nqc7wxjhsh68j6dsrs09l0khajl0kss1jc3e0gnsdaeofecoiom4wl0hlwd9etwqu5q2f43w8nhcgvcx8r0lpkz8l6jd8l4rh2m36prxoeqep5ppsyqx586hcfppc7os0janbtccnhmw30r6y0h9cvjugdaea1df3tivnwwp2rx50w3eygi29eg2z0xdg9vbjbbqpsm5exysxp41u5oxr44snda21hw871dqw6niouuacgjwkw843iz3i43hqn1v5m41cf58e4qrdkv1jicuew3zisdx0nlialfhlc9hwuu2874izfim4gta9t279l0xnknyf7qovw69yuj7jmqmem0j0p7kzm96g7xzjwyyuqay9blo29lcj5vxm4hk6qvn9rs9q0uv9zep5pwqo6vz1ywbazw92ob2tkhfg9ffrmp6pev07bsr704tor2jw2zia8631jyb5qobrffgnnowhfrdlf59s1snw3770cq7yk8zamal28n6t1w6vzsoa7ephi64lap1fxcaoga5vvf3f53bdnxg2gocwnmglkvv2rf0ytkttekd903ifb0b53k3391s3io3luszd25pqmiollocncw4i4j2ps3z6cyp01cx64s5ezt7443gd6l480oafixxxbdewtbk2cbclp8wzyd3w5drunf2szzz13hdttmqxekdzii7zjn1v636i2v56zxgspv741ipu5utkuii3mytmqtstt3ng0vynqsixwyv0bt2xqjdok7mqinujwappv8x3xoa73imqf7uuew0xko86bfyvjwx5mx7zisqmq5lekttr4qyig0rrgeqadaj3kk',
                fileSchema: 'b10k8w1cpqwat5jtbgm5auaz0ps0g2r5svgq6m8ift4bgnrpn5juzwlmqxk5wry4jtkwh7grz7rkrig2fpzul5mo0h385bv7ad75jt6phbgpyrf7vr5zet79w6nght83a125vtfcfh7k80s577zimrug61fbafmn4rrvqhlhvq72aebrjdfd6kvg5iefvae2wwu0mad1h8co9h61oa52awf4eilkrluwcvfzt26dgp8zvynlv0vm14koakq96xszceb1ytucsa3ue5nvo2k170x7qhsoo8c78r5gkss41bwmnlumcymd8pzhop6sefz726d7gyw4mv6tgzel9opffb67jk8rvwab7p9qw5uam0y7dpv16ewzna4prd70pwi5nympu4jr9flne4a2xxex236tch9ejptso5522edrchlejaa7oc4t8in8aefh0i733zek51cwb1wk8308c8160zqbwaabjdjmn3l48ulo6i4h1kds97qt7jmwwce5ywijd8clur5q0cc54d5xu8iupx635xbigw7noodc1xg7kf21jtjrojs9mskasutgtss937n9a2e7gb2skb4hql7xnekdg0yb8fld11quly7j6e2kc7t7kuncrgvf4yyzc7xh4455ryxt1ldsni5wslwc05nymw76qen7muay1uz8dosivqmyrpnvn1mf72bcfsf8dm7omyfdbvfsejbsmmtbqydqe9qqxhyryls3zu7n9l93hrqwv79r6qwhfw874j6im4h9ye0ewpj5x3ekiv82zxe8d8k8pjse41almnjvm4mfsul5qfeu94jarp923k97z58zl3xqsag09dtrq0hhnxjay6cicrhc0aj2m3tbtsn5pu2sgs5iegle1uunnwk0oo2xon7uoy103qzxtxfn484806vbo3rkhzglw12tdu6oe0dwmairrw1upbzs5s8dh56b7gtrwzz05xzb5qey9q3b1tdnxxer138rj743i3f1q773vukfvt9vtylzfm2n',
                proxyHost: '1nmcouqde6bkd2xxfbsbnjjac15lt5ae2vtn077of9wk5hz6zno4k4ocisxe',
                proxyPort: 1424096211,
                destination: 'rhyac5qfodnn3vsotpf2flbedxscrks62r2ah4dk3zwdwvfd33w49toy93q0eb1nlqksrpyfgqmubcv67ivg3vcrutz2dsyyepbchwcoi6p386fihyy4yuq6d6x04vhtth42a816d4lyn5hew60wofmd6a70udi5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jwwhs2q38aogvkrilydtijb9cnaek5psrmwj427o8p86h1o12j486sjeymi7egqzp6p210h893sm1unbwsnut3dsvfe1zqsnaveeildpun5aoovms5bjp5cbs8lwkuwt0o7cseqo3nxhqwuuk07nw60g6gar6w25',
                responsibleUserAccountName: 'ib265a3dn9rn4voj85zr',
                lastChangeUserAccount: 'zmz3x6iiyy2zhwdldctn',
                lastChangedAt: '2020-08-31 05:42:17',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'wpryx5d7e8j56htx3cirj776edytveumach8fqig',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'rtakchavjw6fa0ej150xz3op7pap9eihqlo5ocixmeud7naqlb',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                
                party: 'gylkzd46k33d456f91a0ehsch5mwaje7sq0w91fnfto10p094vnyka1pbc1zrp02shms7q2hzemzqrf65ei9zr0qt048jzu0ddgy8o3bvw98ikidkdbuhkyknnojxhijcey2yb3cszx46gaceh6smrpylhb84r0a',
                component: 's4if4iylzotavc7tcb0midw2waadn0qi9vxe0dzft6bcvyn1fkz6f7g1t9iv6ijxwx7xgotrejnkmj9gp07q6zcwq1ms6j9fgkrqrldytqyh42l1hov51qto791sl7mh2zvdm5unlng6xq91xwx89xv8zvz8eyyf',
                name: '2hf8yk3c6asam2l10yhop41q0n4ftg894z5ppx0fev18syq36oyw0km0bcoe1gjqex13npfd7ld6gj7yy9d7qa9df3uqe4ime04bfep1ojubohay4cdj62gzcppu39fagjmtlk6ijkrmtso0n392r79n6szrdzpz',
                flowHash: 'cg7f7ehkjh50w8prhhe3sk0y2j6yo63m7n8n3jrg',
                flowParty: 'v9haizxmykbbopd4luj9dxgsmhdahpz67f4jmt6l3fe9gk3fwzzfuunn1h2ui7d3w7mlc5q05omn7dmit38v1aicp166pys04oc0cesrat0pfg1g7aap41qjxvuzptoq7wu1hb660owtftpesnltrf9vzmmvu4zk',
                flowComponent: 'phyu9ahb01w6p7euv3y0umtqg4hpmsjv3kxj5phvxti1zhoja3kygj1k9rp7qmlg19vpp36coj66ew0sd9i5ipb7bz9b1hhyddg0uwyvvj8io2szitx4n7d4jk8i2x61sjiozyx0dqekwjphu0r8pqdx12k4z7q5',
                flowInterfaceName: '0qnykn9mp3qba0o1428wny7sw0mhui1egbcdfajkgwwiik9v231or84manrpm4736xoq3hcp2f42tm9t367m8th0d7itt3l09s4humv7l1a4mudfgzbnaw87fhv8t5yqjj1fwg2h9b91vl2lbed432udb1fs811n',
                flowInterfaceNamespace: 'jspj6c5173khibu889d862q6yirjq7vzfa92a3y7jh4tm9h52qt50m6kmot5d85wt8zo3yjhu8j1njf47aqnjzxxwaxvpm0bfx73zejhr2crm0w3xxdwzw2m13u84uzyjnkwn219fe9tf77braquzp1nzgv53dwx',
                version: 'jp1uebg999c0h8a93mfu',
                adapterType: 'a8e95d8ly8nr4byj7qn2lqfqc9skwjz68q3dvd6j3xxzq1zmt2iev0zuz99n',
                direction: 'RECEIVER',
                transportProtocol: 'uomsqqmeoakvjl7o7k6ndnq4dylxftc7bwimq76xpmse8y0nxgasvxs7jzbx',
                messageProtocol: 'l3ffzfqb5gv277tdvuhcpfvqm10n0qc0db8i62155epz0gqmbf5j8viwi6p8',
                adapterEngineName: 'hnva1wjo1e74kx0smopmqsjrnxmdw7pfefv4uflav03a14vib6iqxlguql0mk993uswv4jejqz1cnwyeq6wnhbgwxz94iqb5f9h3j0vcqmcczvkgei11fbqqv9pytcxffpty2a3ifw5t3u46ueivjzuju1f28lqx',
                url: '4t4qa9itc6rp5wcfa4zjev53pyrzvuwqnswljci1jgd0run2pu7zap9tq6gboz88wjkuy4eoj646l7u1sw2aii87cc2g66y36ekasgq36ty6r3psbe83nglbblf37k2q2xzwcla9phtdmuewi7jjpeha82ona96mblay5nt6xe5rf34s203p680yaigelauaaf1mbasd47lbqyemy5tllxd83aws0dzwxv7lk7104ma1j4q6ozg0g05i00o8l9q5p6zk80u4fn7jo9koabyq1bpa39nbvo04o1w5cshsnmcslr8sw2x499y5vl87wf7k',
                username: 'cjrggrkytg24aill93nqaaj7tqgleyaf00g2546b9nuntacpf0hulzeecpq9',
                remoteHost: 'g8gfxbhmmyx7ps2ojtk8rslerzayppja8bt84oug4ss9853cwxkfbniey0t8t55kc2nfnwh5kf32nt7u2yt75bceowvfx592lxb6x10gd9b3pqm1m6xkz0acud08dnosp3949xz468goom8oertoi5pci7sm9ffp',
                remotePort: 6221768843,
                directory: 'a1zykvfpfvo75asaf4pd3o100ofl9lrr5mf0yi3yemmeyoln5oyh8xozjp74iokfsmta05k36b4gs08zjwof3pwd1mrib7cqwnwcjzzwtj4rz289dni4navlg9gcanrqp09ou3rnnxjiume7tozwuop33qnakebb9j62aca7y4xxaxmyepulh3c9fk6hza6d0rx1wrcnstxcxac6xp56d0qmpke7lswg8tx0ei8sklnjdyfwxih52mn44tprnd26w4tbc9m5o9113n9tlowics3kdd1pm6dzdgpj1r7vmyj4zqkmsz7007klvist8v2j1147fm158udcr19qe0u2mjejp78ahfbnup273dn9j2e0m879gs15e2xmf731jeux9xktstcr29karqc6zmoyjzcqxt2md3gt76sodeav75mk3ynpnjfuxt4seedh5iz75hafea7k3rskr9vl1v0oipzfynkxpv7qqe0o0v9axf0en1nnxfzeepzahtm0gqfeudj90xds61b5u88156qy6rg2n8yktx28gnxqbe8k3dv6rmqtl8nmllxy3r3nlmszh0z36idn5z46omujidg1yjdqzgi1e0tv434v6vkzesuhd1c6uy4844vinb6neufhu0x732pqtjemr20nwuzzr9apwwqdpix7hz1rz49yhqkvyzby0y07vcmm3p1qlc5vnuvcxzllyfunifiz9shi78pqwik6t9we2g9pqwsyba9sozq6jnjbesdxvk455apxn7r55bxb10pt3bkk1w17g47lgfoqacr55ya5j4ibaeib5sdg4gkjhtpgs39ojuk8jm9n6krrp13v63x65o9xsinld3r06xdbrc4ziwf8glqkbchotwz8q8hi462dvtv7bab6n2o3gqaahzzmvucqgi5gtb4iilvaah0crvmfyjvghhrn099nx43uippixns4ttnhvbs206r5pd4rm901nl7offrow79hzizi98t5z6xw11a5lru8gz6yb9l8jiiz',
                fileSchema: 'z7jbr72aswqe8ra7cp4eywx8u3nca3dfdxxqcd77c7nxswdgep2m8nte9be8wipju5uyrogsnapfg5h3ccingy1ij9qref54zh6wvohqo921zcvl4toj88i29sfqois9enji9t2krofd51mt7ex2zpkntreg6fglv7usan28xgvnipn3dat96al2jqf4xhwt5novs4k625413rxamu5jym4crs637lhljozzqih17gjzbi8oqy295tweyy3petenirknctqr7x6owoea55pchqpck8wbr70hki6wohnpzgtpn544qmzsfnwamtnrqbmgmuxohdmfw0x5or5oaah7nlplhcg7owdv7cnf11lxpxgk1rcbfcckquny2cio51j1l0lytjjvfbcnd4xma47wb8rxyyeu2zqjpc72j5sv33raezazalv32pxwyte3zu4id6xje1qbvenct8xyve8dos9c9dpw9ctkg0i6vb5nry5th7tcuamkxyvl9bb6hg4z3u9rf45d2dkj3cj0r5mifbam69kkjxf5k4d7noy2ure68gvahw8bl87127ifm0unnn4iudl14s36vtm2678b1r2ngcvd2gipervd89b9yiljnrelkitlmetf5x6hzge60hvhkjr9tcgbmvaqjfjw3ysk7ryu6hk2a7wju1nqlpb0bmupddhgkkxe3oj5n22semjzuly4hrvoaam0k3emefdgq12kkk3j4qrvfw8kp2bhxf0ogohwbmrsokfecduwu1gyxjc3eklpsfas8izsmv1ztw96g2s32o43wabahfd2mku8uf84qhrn106vt1ry0k5sscnuo2tx9yajysonwz0hhd0ankysvomg4kopgu0ihrldq1c2mx8jsj1rkd28z5l8gybo4cn0o5pun8pvborx2aoxhombgzy9pmcpc2x4v2glycd48hzwuci6mztc5vvsikuhdixhkocflb944a86yi8jcfatobj5ihhythrvfm78pletelejl3ydtqwb',
                proxyHost: 'q5rrg3jtctjcmivfmuevmafz6ioccct51xvjq3oevi68e9b85b2ymkympl3e',
                proxyPort: 3090571571,
                destination: '2weaxgs09cj3juyo9ikdbpc5bso5ckj1b3m1faj3spsckz0zlmwrlx8iawkc7es78hefqyjksrgp7ufvsz9t73w7fe3ozgt1en4ls7o06h1ac0bmdvl9wqxqwalucxcvq2l58a0am75rfxh3tcg0uegvw6sztimc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's4ry235apv3nl4ds6cboi0fxm9jkagr3yj2j8ktu5uxex84v41l5du7fg1vrtp7rtpssraibhb1q4n5tqwyjtqysfw7pbimvdqemgsyq8i028oil2xm3lj0xmt25zkwo5j851wq57r9x1y8mfpaq2ua0d9whgid8',
                responsibleUserAccountName: '96vfmfdmwynwf33v6s2c',
                lastChangeUserAccount: 'inawq7q3f4ms2qj6asbu',
                lastChangedAt: '2020-08-31 09:41:04',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'qz44lni7pgrnnk8zett45yt0qko2lcodqptrczck',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'qdglergj7d9nw9pu7z74vp0lw3h74w0gvb8wgd0liiunsh06rv',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'af6ealwahabkrlhokffh',
                party: 'n3ec30hemfv73uak0ciewqc46529f7uvia9fha1yaqcstor7yfv1ec35fc6vduqc9bfh65lwm78sb80m4xp6i5yoh4gre1918q3rcp3jknz00v778pc5nc3hqpcfr42e6nko9v9jvubckfr0u10dfozya2cki3aa',
                component: null,
                name: '76r4nuhvmkpm2ks4ir1jxage202tlkhmcbmoitqwrg02mne9qrjhict6hte3leng0o000ffqqnkdlvvu15asvsbfb2nyre466fl6sh5wkg5wzxt410qpgi7zb381x4yv0gbtnpszizttcxb5f2k86rp2z17bgc3h',
                flowHash: 'kutjbzov7xhdtwaqyddr0hybl1uo6lxm9sep432l',
                flowParty: 'c6bxx221g5k577czcvick3xmrvesbt02l3df6mmhlfeoodcbw6uduo9mzgbuou0ssuzovz3d9cjplk42d9ocarzh3ot83cdbhj0twoyuqgk6p19vt3aivqn96cdpbbf7un9vpte2ffk6lxev27lra6pi6r6pist8',
                flowComponent: 't5ebznelq9wmoxpvk4wb702x57qx3f5vbd2dfynwkgbcj18dxop49o85s9n3jm4t7sldqy2a711j9n8kdmw1ga6n51126sp68ayt40y2l9f9c9grhnf1ihbrehfx2t1coi7a5atesyvzxwjo7ks14b1qxnpiw9th',
                flowInterfaceName: '6ey6vivyxo39l3wpe90c32kh5ss6yea41wcqrl7flznwymjv46y93txfok29sroof1fn00czozix3d97puy03vkm97ei29ocrt8x2qagbjfiw2ohaj3zk1icl30tb2yg0uyfht2ywq060h4n4zz4aczo4ibdk8ax',
                flowInterfaceNamespace: '02fpv3qi5resnffysl96xzmeg2zzng6hxjod66otd64q8lfttlsb55qxqnm21qz7jf27o23qi3zsu4k0o9aptp9y964ojlxkdghvorx07bv78koa3h4467owzukm8oduqjdkf3kw61flwiwblyhk57mg91wt9t4p',
                version: 'chylzwr6glzkt42coie1',
                adapterType: 'wrm3muhumhk5f2m102pmf8p1fxriufcyvaw6jiogamgmvrsrpkj3eooy34q3',
                direction: 'RECEIVER',
                transportProtocol: 'mos1exmr2fejaqg2tmxzv811raz1mhqqldt8o5o3uydjfgfrvsflcey7le7b',
                messageProtocol: '2pmqsyi4eloshfmrwyiei4wjvic5luzvclogs2p48lvi01zan61jppoy94rb',
                adapterEngineName: 'ncbdq7di1te9i9dsusvx8age04xymbk2rlvmz3h2gfuldq6d9y9tt3msw9218z97hyo09tqpvwdxhpgp2rzra18v1ks9u07yriuwsa03xkfq2mqiedwj0ubqhl4hor0bk3w0sw7y18nf5mh0zpul4jtqw6nzl9wz',
                url: '155ockb35ih4m546se3x9l8cnus2ypzb9svp4ihodf1e8u2zb8l4cneg19bdxozpnipcdofc5uja11umkmjxomh09ykk3f97oufaigckow1798o7rlaz1i297ooczipoio5hj7v00u0bmdp6ooalc1i6tdxir1fzbcpl7xj22rddm7dv67677dimabhuwbhck1vihgh1ksabqzmbns09p9zbnm7xypn5a5nsnaf1le3lw5ruxx435dz7d6l9ijbxs9gzs5js5zftgmi3axqr47qtzxem6utts0ng22i5ye3rph910vgnx5au4qe788ya',
                username: '7tkdyw195bwxjw6wgi6gctullvlq7mvs4b7fsbh9vce2fojd09kyvz2w9wju',
                remoteHost: 't4s8pxqsauf41e17qmwm7ahj7frdoj4jzs90s8gp2bsfioij8o2kkr5lc42hjk5lq11iovc1486o4o74557m4x5m83xvzhf06pcmgg9rw0ts2hg4d94m9cmtar7j8m719tolafkhb11hdnbetob8x0k4yegj9z4f',
                remotePort: 9268724246,
                directory: '3k6ujqozbre1iqmee35tv8a8tnirz94gutiw6xi3gl1zwnd1nfe57az712s2e20px8r8u12ugqcubxrbu5pf86ke23ard8ulkfg2slgdzq57vvl7sf7ivjotfjcn9el8kzkt5i50f9rozq0wt29ntpijnyj50vgtnvfgra0uxqceku996ld87x6d69x0omj1wjixfvh344s6fuq8f4h9rcz5a8q3szva4a055tpw1ozsqrxc1i2pk7np17z3k5v9zm2nol5bl8gsisa8jva3lttwlz88162a4hz70wec0v0fn87q0240vrb474ryrqfecfo39sfxp065cfepj5idxm125jib6kbuswrcwqo2tvjgz2pf1j05tzftosxo8t8mauilypkdzv1ew4ay71k0q2l7gc3feap1hhdbslseb21taabqm1emen3c6m7a0pvepihs8otvnw8a2vzfe0shtiwm2dk538wtnoabd42iljuq1om9gnj3anncvptuwgrp78kmahl957n0iuutzcv33mvcunu64xz8yjhwxmjoevhce5c2r96c3q5lgkl3i0703rpnb0m71ewufrz90y65ynnee03ng8dow10t79r5ggsajgbjlli1yi7xuo7ktc8flk68fafoqxuvt1618p5rl8htr55w134csrgcqi6cplunjvj0lscicwh71ywsz28h0t1i2p6wwg3sgjct884lkjxob9bh7525miz9jdurqzhpaynyvf060upu53m38kk5g79xptknvfu1pkjhf9rcoudvjfb47b1wznoznpvg98a3i4bivrq2y2rys8uhowguv2vtx3v2ogbzc35f5at3irrup6xoj4o9fpg7pgr04ax7pluktpdi4qwsrefnqqivb5h6o09fq7w3knp54ds9eecymy5lg9vpixvg4vyh656043wedremwboz82s1b6s5ni89mvm9wm4mlqu76e340woavu7fhj8u5dlqj5vthqcguxwiny4stqlvhxnogdft',
                fileSchema: 'n9871xawxln35ope98vxt8k8iy7e1aayl3lp5ne2f2uye9an98v0p2vtm7lqt6xy6i43bm4x0i86ndf3u1pzs9pnt7jszxw4wylnbn5ar026wfzmi31654034ur9gnd7dvlxargwminnfogkmxqziqz23qb2das2abz01vzlcfcsyg9iw4kttsrik8iss52lxb9ad6biw7d0hr7xjmae6i3pwsd1oqgnnwm4sgw3od346shgl1gwliawp20wd0tx16p26xs97cwg5ywai0zih1n4484d3lr57wm2pkvmkl7c05uc0cvh5v3xoqo0pmhd0bljh2s4v6v16f0xnkc05f7k8c2qewc6j3wtx1ojy5nkoiivu4so4miwxwf74g64y43ggdmf1r4cbfaart8g8emn1hcuvqaoz2r02h4hyjuqpnoxnhajps4lc3mgdk7q25a0afkxezece02c9zey0vyoonvwjrdz8fh2h68ziaoflsgnd8ql39zd9lithhu5l2xaj8c6oi3kp6e1k4bss60uaoleiy9k327310fej5z1x2jcrgx8bg0c4s9v1xmi0m1yykzr1pmo3kiyo0hg8xrxhflcqg5cg5wjsmmcts47gu8rh27ttlcfhknstvu5ugtdgxmpudxw9vjcs9a0pwjz1638nns9kfmkyj4a18b546bcdxmo8iz2vnlgmet077cyij03v1dl0nhl6fegalbm50dv1p7wxl2b5kfwsu9mt286s9h4oxqkuhrexqx29e302k6i6x2hs2bjp5ngz7ewdi8rzlp4hafc37rm5li22h515rkikfl540vlehzghkvlobx8vxwbnj02vvjlel7950npr7hjsnaki9c2asj3atmj9d0u9r9nzuybxfbnmyb3iyo1d7qfhasa4kyt8rno5zn2wxqqkznyl0xlyjq3jmbx0ssemv2uwrgaflnwz56bgkgrh7sz398s10sivv8xhhojd6xqam8z7y5g6qhblocxvfnlaui698gczk71',
                proxyHost: 'ozsr47fxzl66ifv7l6dil5kxf7b2ao02npely9har3v70rtfchatcjj4q6rm',
                proxyPort: 4457745564,
                destination: 'uou6b4puj4z3vyrv82xr7tq803oj2br14w04pbl2hrqydyn6l5960kj3r2m46rgb14jx3qjv8qogv02soxhh5m5cbzl6orsdre8zevj1uqyz6ijqjg68ic1pucvyyin0pj4rb61a40lvldqs75c8hz4yn670kp6t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e1mlo33ty5piy1eye6vszzooa6ievpuggyx1tga39s6rnyvgde544rfzkvz3bu25z16muco90z1qwxj2xkbhlsnuqrszbjlztk27znzsvardr6hom3rdzwtd5afqt24rrhpamgsx29xn9beigy682r4c56nfzv8o',
                responsibleUserAccountName: 'v4n6z4vls73mbgypeoxq',
                lastChangeUserAccount: 'iil78jctmwnpuo0iheru',
                lastChangedAt: '2020-08-30 19:30:32',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'ygg307obdsbt13bjop4jck1dztnyjeblvwfl3mw5',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'pyn7aw4wpv9et1rj2rk1eypcwjvpyr6scm5pc33mn5rfxf4x1k',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'ieew7g0jfdo1smdnmvjv',
                party: 'ypmeluq7qzb6ffvuy3carmf7dd6u2htrdpyl8euzbbdv84xykggjv9xip902nxf1zoxe8wqelnyqcedrbzbbsb9fq2uzz0fzasl3q1r6eb1gdrnk5mujpd05yhji75azdu6na8vgs2mknytpi748ke4q82x9l7m8',
                
                name: 'o47m8yu9xxzbs5t2j7ilw3kr2x9l0qmlwob418auksu96gfl60adeqh9e0gwoqijgqvgxr01gd7vjkzfgn77jy985eg05pxvrub96hzws1eut6yfrxwvcndlw1gt6gc5f4vjbq0tgesyll3y5dsfpxsksu7ap1pb',
                flowHash: 's6nlpg9yzs6m2znicpxnypv47qyvq9jl8fyyitk0',
                flowParty: '7ibwast7d7266q2li7w3hoknbyarntnh0agv8h9rxn3bit6mah4eysczjxi9w6vt9m3i3n7cbp8iq70frxhfxwg976pk632s7bklk1aaxzni1higpwohcnn2mhgdjbalr7m48kiyyr9ny6h7wf16m66t9ixk0eud',
                flowComponent: 'l0f7uxoj4bzc43hi2hw3s6qery52fzilns92e4n2dzjvo53c8xxbjasx9jf37rgk5b4yd0swr4oq823zfunawsint9i0it590gwybeyyjkoywrfd7fjq3guyi7qc37poyzc8lwg0wp5ly7scds4vcijsbax1nb09',
                flowInterfaceName: 'fu9s641915q5ae7eptanq37n4v7o6jjhh0tph7hiniv561i6f97l8lyznux4a2p4gr92vlv55clsehnp5ql5mxvyc7fdv6b5bkhpqkkp7fgwrzcbauzdzd3ye1s38ws0z5bkdvgjqv945e92hfdxikirdlu1j5e7',
                flowInterfaceNamespace: 'jtw6ajwo67v5y0ez9jchev914lnev3yqgnjemn8s9ud4hdyyr850ydf85qve3pf8sz4uhxgpzlfncr6zamophkl0rby89koyldvhbliq9d448bpmz0c1u1fsc7z33dqn8ks9sib2mezzqpv3q6shx4j7kptzh1w1',
                version: 'ppgk278hnky39w7jflc0',
                adapterType: '1vgbsukgrzif51gujcd1dgxhio3e7aclwq6oos718ym7kgupygo2y1nwi7wl',
                direction: 'RECEIVER',
                transportProtocol: 'ae088vg8ctc2llp62r0nfco1micy3ewsmfphajrltlvpqvrmjycor0372dyr',
                messageProtocol: '9909r0boepkpa7fa0i56z2ba2mr5nn8yp1l8greqvtnj3pe0z0w5wzv0ev5v',
                adapterEngineName: '807ii97pu7a3z7vx8vsodtxgjwpeovyxk1hi2shtjblsyn03uf9hfwpwhoyzfrcdd6fyzb23my3qoqkzib0v8vu7syrmznmo17y7fjdunco061iydxds5qokdzsyezj9xcje80hok92uutac7vilayn2yrqx8lre',
                url: 'sjqp9hpfawu3kpqdjpfz0l9rtb4brjmradilgp96j8dcup3me4hz5cea6w40yagj6iu70ot3l1v2u2pfof7w9hg7krhqbry9164pyluabso2o846kiy5ygl04jj8xic90ybysa5wz14y0wmaubn20voy712js4cjbl23pvehy0y2jnkdbwu6boro4wm4o6qrkzx07c5hlkdapy8xrzaneezyrx79dv20f4v1wxbqtt8jjkzygpbehxvsrnfkobpgcwzoaxq4y928vd02urgsaed0m601y0igppvmp513uyy882bzl8jze35kzldl71hp',
                username: 'ss3tary4jbkfhidznfxq9yhwvwgfvlcoz05ztbtlgg6msr74jq52bcgq0ljy',
                remoteHost: '159931n95fd3clqlkapca7y36ioniq4p0wq7ny14a91t8fua7mzlt2lvydzep26icq46af4dzqzohcv5tfq6nyhe28oxf5jiq2cjepwlmnxqh6jrbomplqu7piituajd7wyrd6scjcltf62ko0ql55ki9sy5r8ni',
                remotePort: 5520666407,
                directory: '2idfytvklphfeckxubnvf5l5z38gmldk901aa1zjcf6ur3txn6itkmvu5zqn08mo8ckdd89c1wqv27caya2j0pqodgjveeisl0e4p0rja1uv67znrh74dl6tiejpa3xpe2r31asrt1hwjucxrru4ox2s2uknwjvz8u15ikuud6q3h2kfblyq6wcwcqsn22netnflsjec4pxj5w7eqbaqv5veozg7iga4xehqxo2pifaw30d1xrqqjp72wrrn0q03o6rve8z7y4319wc2ocex22kf4idg9n9d3bm836aizkz6hlkh69zrll16m3t6xegg9u29lq7jzuvndlfrlbq1wpmiuxd3tw6quk3v869zgqwvz9i0vzspnor5sp7z0b98m18dm2685yamj60nhum6vd8jovu830mmq3bvr7dnlxe4lxl6bgg5glnpvswtkwkvdiuiuzeajupb2tgheuzs4t6ftdxcpe2y465x9ggk6lhpjg4vwbm3jcf776jc2mbha1d9qo5tpqfzrhmynq9t3gk074op9t0b1jzq1f9q1uql4fyog9kedvn04njzknq9qg4ilgwefib8xvlqq3wqhplrfokjyqjz3um7aa3vx1xdlyosscm1o6rnwwitg95k1ivstdg060zc0ji8xqz96uyl80tjhj21lz4yuorp5w7cs8n80uk75zjjplkhxlrj1ozhicq20if5qgbhsywqmhbhak86238n513f9yk6gpkslrvmtwqdnpbmj5xsbxmcpl0o30jot5u78jg63kstdoypvmi29dy4dw4ypt3l1304wdo0ui1kbpno7eaz0c61zl7b5buxc7rybw1nvgd7mnduper0pc34wxdcjxgylek4selbzci5vzs1uo8flnvh6bis8n54sa7i4cpbr9w2946citt02256bj2kbi3hpmxiyx6jotyjfv58ui4bzc3xp3ny9e9b3ok6qb57gnqz2qnpguyaok866crzzllljmflnsufmkphn223otldtvjx',
                fileSchema: '2diih2gfz0ubd5dhh97n6n66w41twc4lt26m5h4eyxnr1xis9wf55yli2aqoznrin82v7xser51gxoefcxeuzn8rm90bxwixyyjy8e155eaxun1zfkb0jb0k77w1itvg6cirau18okd8z5guft309vunlt2h9wdodrrxzx30w35x4sgwj6ytft8x9e0028kfs72iqwkwvtny9vif0iz78pi2puletwzkuhbseijkua31ffvdz6gm8x5qy7d6aezowh6ryarermw52mvl7eewpwv4hcvkd5x2rn2921lpqzwlacez1wvjl6kmvrccl5islx32g0x4l4614u73ubt8kmqf3bepefk6xcbwfh8z6dn39xcy7tgc7ba7dsb617mf3399a78pj035fdiothk5mdyqtoj0qfv5ga13exn2r5zfthq94trq4ekevfrwsy78ltafe658kj0kvbw9eret1nija583sbl7hpxdxw2c75jmsqwp14gyzdlddd0gpxf5x7hhxuzarqm469fdzwzfmj2vj3w14kfrj2lm52wpa54vdfv54eqxdcwivzkqd34dw7rr76qa9rid0sh6mimjntwhvma7iqr5smhn7eakxj6tds9h912z8fqk2q8mfvscf5spsyfwivss4jstc7cd2txmdt72ijk6e6k2i7271ravhi789nms1ec2aye6z6uuqz1f33ysee9ejgyiv136k0lcs5alufdddq5u4zmqn7ngfg60rq9bcksq9pbtopfng8vuy2buo44tovookw6cfi4fu8w01b026wyua1yhy7kzjxu2g707e91sddylfgw63n3y7ahwgwsu9sepk8nj25095okjwte2o5muwa0jv62n240ml5zu4iifd1z7csx7txlrrtlhx4qggzn0hjksgncuzbaclutrg36kh4wi9ycae8kix8rfti19mh0bykvmvzw3n48met2r29kniymvd7608ougpih06bk7duqurwh9vznwxbrh2m7tts4c9scv',
                proxyHost: 'dmd473s8snu23dbbhz6nui0d9584tmx9z3t9fwetgr543mn5xhg4n7tbmkjn',
                proxyPort: 7698259153,
                destination: '5n03k0xorcaswvzzea34xfgkladbwi6zmqdd2fm9eq1osbz3lbu2sx2dl39zpyt2sxklunn73qizv2dr6ca5tnidpx71w1r4m9eo5rd3wlgddm44kj28p0r1l8vl8ct7iptknnrxf5mx14nl9xpyehmpsvsbl9lf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qd9dlmansuyu5prf3o40qc7yvx58li9dxuexee0v9793d52vqkwonlv041wbllped2x21kwqzrkkyciqn596og4pa241g7szzsjjkngk6z65135qvt1zhmwv14n913ejaa3w657k45neh9px41jye24o2cxhiaxy',
                responsibleUserAccountName: 'oft5b3oca96xa863tcqz',
                lastChangeUserAccount: 'tuc1rap6p7lgg1tm9ap7',
                lastChangedAt: '2020-08-31 07:21:34',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '14vfrdlcayyhgwmwihng6vhn67pu2adie07sm19e',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'e1tzqke2tegpp7ucbw1ggr4s420jmrqa98xnqvw7y66wbt5nhw',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'jsoznc7yr9zho500smzh',
                party: 'cqlhi02ese88iwv7cb34v6fysz32dgv3bamcetaivrtg737mp35e6oxyhqg3iwcz8ntsmqss0fmx8lu8ct16s7krg93octgs40a77yqc50ojdhe7epy46mfjzl5h0oieqif78k5xuzpcmmjjgvqkb9d9ps6oonqf',
                component: 'efmqi4it2o4vja376gle7si8pvhnci12qck9jf5ftw9eip1yd1o4j48dvfnl574qgr69d1cjcbhka4d5e3yacjza25n3hhuhq1coksnsqtkq20vs8movt95mpj79wpydpb3uuod64wc9rfxpwbhdd3zskjg4x8ys',
                name: null,
                flowHash: '5bfrbwlh3ghc8piiys3gb8lbnzo9p8zxz8y9z5lu',
                flowParty: 'ftt7ffe2fq3sxynfa1wku8cccu0y537moh4627y2l992u1i2uok9t7zebhjzl2u2263fgtw1zndr0wr5elldiukmmpaehlxa0852gr4qah5lmh45lj14d7ffkw0q9nqan7wtvdhtfixrsfmd7ligdig4ddq7wsmy',
                flowComponent: '1dscbfhuc54wg3xd9v4xzchzrkhssozu0yv33w5jti1stieqihbdzfsw5fpnjfombau91964pqmk5c2z89ouw3ez4ipx80cy67tzerc640ijohnr8crfw6ng17kvn45dwvfu23ent1ofads0ncc7qjxvll2nogey',
                flowInterfaceName: 'p4k7ug4nkttw2ygspmwesnxrg9brblguydtyxteewlf4i8r8qz50oijeo3rm8019ikcb0fdkbposuihr16u48vxgu5tuwt99xdl5lbn51k36pfae4gmmyse2yazvthdiv6p60yhglyjg075zain32fyspgknjx4o',
                flowInterfaceNamespace: 'fgnr2mgnng5xrexivx9g6gvrkkhc9cfn4x3ohdrel8fk01f3k9nvxdhxop5ciefl21fsbauc0yp7n4iboca8pc43toqm8khvx98fls74z5e4bpvt7dn013wkuqycdpty9ncl2zgisujzg8946i64brbmtj11sbkg',
                version: 'kt2jx5kuta81742kwexn',
                adapterType: '71rnaaj29xo12k4fgmzsbqlkpamqh1vw1d2by0znadsq3ooezshmwpjltcbv',
                direction: 'RECEIVER',
                transportProtocol: 'y10w9uf47loyutfcan5u9fyk5urbj5fttfpy6t1kgcmveuxh6i1judmwz21v',
                messageProtocol: 'fpxw7sx901jdg3b9r7cfmwdbn12uc1jadkdusnonwmy11z3wvihz72us8w2d',
                adapterEngineName: '6ng790ulb22nb7byys107ipdyghdq0m8i0gmc9mvou8o9edgi2ejlfuot0ls6o4c9xomgrmlgdkspye7wpf74s2b451so7o9wjzd1s3krcgez7old9ma0bbovjmkd2tiouzp6109v7mkm1l2cggqgfkp2jb8iah4',
                url: 'rwx58783a59ujzp6t5kef1pxxw37ey6uuf5b6ul8ho4af0avdzsk76nauvydrbxnd4itymsfe5iavzhjz7z5dulmo1nyx1warc2zxyr348w4jclvznh3gz7xr277i29qip31v3fn32bprxh1pdjdjehrh9ag5xs2dj5fj8rurgnjrpew4mx6hbafqefhtavi4v04iknupi4skw4lrbf6opllzbkb46k8aj0s25b7knw555554zyyogq92ut6m86k1ezjll1vozidu6nstlf3v2zakekp3v7jow8c6y7mowqhsd3op0ncapgelqqtx251',
                username: 'feb13gt1komwismktn5jcga72jj21yjzec5p921tf0awo633cnwh4b7s56eg',
                remoteHost: 'cfwee0dnh3ne5qmn6lgb2fdo1jfemk801zvnwkphcpchvk0kq5fges0vo7gmk302vx267co9n5l2fydz8dyo1512c5ryqtf6ojwnir20dznh32djova34rem2tpr7nn1gul2xd68kwwa6olfaojac35mali71yrn',
                remotePort: 6010324367,
                directory: '3f619i7x3sbcd3brxgpp3fjb8qjtkt3oavs1pq2zde4tjq8qnlkfofsde89jsnl9fvfxk0bvvjz8iiy37bfeq54mqxb5nc1hc4w4t0dpaxu956jpyv1tzz2o05w3qfboh1tf8yyw6sh4ej9x8jpv8a9chmawo68j6lh4duv6nwnjw5qgr2g40dopubc8y3es0ivw5mq7fus49l44hes4tewdjbmms6ldw4dhj5qr1mb8xvkoho6lhuatfrsdk3arowv7rpdyh7mmcq42q4oh4k5wuo6xm9uasmnyknxsckwaagxqae7wz788nyg63t0cbcw8315cnegww61bjxk4qet9uh2kildvkwcmoipdb7saffq4lgggahm6rwtmn3sgeqqkn3iztbtjztkg1w3flsfe05j0iv3gorl2u7mz30ouvjf5lfzr55alebcqu38v6zw7dd4t4uch2mhn673kglk9hsznqnabn0k3cigd42utwlbypnbg5m48dv8s683iyg6jzxneml1v94kwmfxfkam074x66yc82jvsd92aeqheszhcj7gzsu8f16ex3niu5htiqt2hoz3wcpq7crpl6jp7fsl25f8pkgq3yg5bxeksc10avsyha8btzay14pvge80lz9uc4x6tmnr136catk722gzz4zg9eoglhfruf0m6wa2ykwe20cs7e7j02j44cjlau8t6cdqekg31epa0agdbdkso1fdvez0d4uaevv8h7hfozkoizhwkptxo7r38qd3k1zrpk5f1umoarqt4c969n36lo008mw3zo7ez0eefgrlo89eluw1l9wzmftpuaal6fwk8u3yblyda42rm5im1drn4aoh7t7luc0fgev33mgr0waaxh2ns7h6nb70e6h7ati3bx00zrm474zkj9shqsm1rfv3lrdf9oeb2xvhchd5z30hruxgb4wsjscghrsm4mn9uqjnnsifxl5cbh5mxyzahw44rst0ejppaqw4qy9sg9sucfahjfhczo2b6',
                fileSchema: 'i5uodxipcpnwkg81hhb4l3d7zhb2tolfh1a0co40qkohe7zecy2ct6ov8p47ny025w2qo6s0pbr3gjw9tld676cittznoil0w6r66wo0tewsv8swsss615oqajn5urccb02ipi5sazh6cw8aiihy5qzclhza9ghokw7z2w3791fkpvhxt9tyh677l0bp61a26qeep5ax6buhhesip2ilv1u4jz7bi0f8j4tpm15lmqitf6lfo90reezubfpcpoozqvpgtth80yxlykoemgden8wo1x8z1nl759n54pyzpj0585elokk21x5xrkoh9x499ecwxle6z4c39rgihwygl27hkcj9nbhymva2oxtigdaqe5hvgze1y2sbjnol36298k1m7gmm974e8gfd5gktq2h6906flxygpfat3lvw785tivikbffgt6dxlymh8vaizxvwb4yzizghtyvr8fyjcyrumqkrl3qmftupnw8po1ou55oyzwptr4sa3o290bjd31ojxbrifwzml9qeth0h3fhd2bx8c18lt0wshg4097hmeknhfecii875xomb1pfjthnpwmlecqa5zdt5booqfhxrchezfq85e257pwad4oahyw82impiqki0ycee0s0axq949imfdmbk8cmlwqk7xnw9grangymoyrffkfqkhq9enfpwwde9v7qaklxidof7qm96chsqjhh984sonz30r966e6j1bu0lkfs52765ipfa54e3qsva4q3pd7ka0jnpk7l0ax27ps3amt0gwn9yo8o3hiv2wat8te5pqtedhy0crqfci496uq2hl3jbf9dm5me33aj8vvrmjzc55mhcc4ziqv8unpt7rqdd6torfflngejeoebia973ex67iffr48u9q0wo6iofruj1dnfcls8wuph5b36vtj86kwmrz437ckh2vd68prqv14fr7hbvaqoaiutvcu7w40u4z6pb4yukbomw20mmag0d4cb1mli922cb9jmqvizh75oll81m',
                proxyHost: 'bq8xc695zfy8om3z69hzyj0bg51h5yokv10i44y0ulx6k8funncdaesrftnb',
                proxyPort: 9739074580,
                destination: 'ryt5otg66qv248akwl0rcjydhzlq5avi5jwtdcoi7snvt8t79o3u0l7l48dx24xxk1q1yb55lq6gfzwn000jv4b5kgjy8o2uamlckncda2eiwp5zksqnuxph458d1fwmehrwtgu1ea619hhtsjnayw9wzfzb1ft3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y4u96wjw9xy5n3cagu0r4fcmnsjnr1yuu50fb5ssu74xmor7xl46a8zsp3s0qcmi4c51oqd1cdvrwtbad4tref9zl8oser651c63pedp7k80tu47kf1bcd5psbwn8yil0tfu6ij9tx9t8ovtx59m6pvnhlc8mxjk',
                responsibleUserAccountName: 'ehqck983o654abcpfhdr',
                lastChangeUserAccount: 'jjfajhstp8rlay7pospe',
                lastChangedAt: '2020-08-31 01:51:06',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'e4kq4bzqhcnv5qrgkdoqf7ud2ofgdonw908prv83',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '0k7cckhtodyrnv1oku21rcv2wcnul4bj0lwiyylu8hjt2zm7qw',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'dgrkqc9mah68e38gr3ta',
                party: 'fkvpd6knu84pk7i7uv27s4ktf8d5mbp0z1u47prmqw1x81p88ataw47lrkuqiw4mtv9kmo8i42rdy9fzqenmio8y0d35brlpmudpvnzoiaz9eecr6y8lue2lgbocqhizq383bsv5mxy6ntakodqou2nanlmn8vyn',
                component: '0uf872vdk1lyd7dfpn8p63uphe4p2b8xmqk1jjtsu0uhmwj0b92o01fry74ggemisvycn5t11eg1r5uxoxldusuonv8m8dhbm1yfiu96mjyzsghzvqodg1joh5srijcono0fp3r5o64acptm9jetyrhvs384x0k9',
                
                flowHash: 'a3j6o6medv1f0b7sl3gaat2eagpkmtb66p0ks2fx',
                flowParty: 'wm2iyyovyqu5ucf1xzpe31yilafpg5vz1laocsyhqf3o1xsq803yy193zbe8t0fskkoy4hoder8dntt10oiu68xxtj5nrt25wn2ul8dv7e829ddke7o5xt6rj5b5clp8wgnk9h1yxwleq91gqc06fznhgf2z845r',
                flowComponent: 'gqsoh3vlybs8oa8qzwo1rtv5ylfa6enktt7ggegwtj8tea7aoy8bryb1ks5c4hiku5zi8f43z6bes9fckdxziu1fzbkb5k7t6dh2dujiq6mkv99kkyg8uxl4tp4brrv3oaq2n82ecipogw9q3tvddzv713vszqwk',
                flowInterfaceName: 'o804oxyrp939kd3tbfb7cxwt2ybexkbhxh5npt8oaogbj25pk2dk3dwwanakdadi5fexfirmpdqt4ieh03ovd122k0iqi5iywspavno8afftgkmc5drdwtp1imlwiz3bvycjqxuddanv18zujabhdts81k1qupit',
                flowInterfaceNamespace: 'a3otgeuirnmcyugx10x7v0mghzzov7m9fk83b9kwvaxjevhnimkc499y2cmil8tst6nm4wegkh07xuurtj2t966lk4068d9x2x8iupehkfpwg2gqmog1lktfdor6sdwj8byn8albnic7k67efczg1d0wgeujh4x4',
                version: 'cxx8z4y8f1t0ail5bv0i',
                adapterType: '1td5eqhnpbosl7eveenuxk8ajj5f65324c9t994c33n6y5vlfft7x3n6jr21',
                direction: 'SENDER',
                transportProtocol: 'g51pg3pqoavp87puudqggc3614xg5ad6huhu3i3a0guxg37l07w1ks46koyi',
                messageProtocol: 'ogo3m9066ut3i9jb7apaf0t6dpbd0a799uf3xdhtt6ycri9b60r8q8bwomw7',
                adapterEngineName: 'mph3w7lacwael6jnrgq2odc3edhipo1jhmgxpqudsymr3qs61cwg81obr4r7xdh9s7fdul2d88y0tedta19kit7iuo2r5yslgo2x3h8hjbnrvy9g4cyqyxg9648xxfuenqf9ekzs30viyws95j6tml81vakfg8u4',
                url: '8dnft2ptudgo0sv9f9gh83ztw61vm3mdf4t2ia7c1kq7bym2gl9jlpkutlpz9n05etwjljpsy1q8rc8uc4jhuq2nldfd54uz7qtwvz7uiq8jzhmo8gw3b7i02dz9vh2xaglnbfswde3bg1mvpmbbmd1k4l8elyc39dcsrypw4x2bqdvnooxdbcerk3gl1anj3d5gy3nbgijt851h8nedgkesx5dfg0rj3whbw2tntno9uy5wjv30o434khd6iip29o62wnd59fvhxrfiqfldblczexixgkswca1aef6xgr57kbdblo1sv4gcmqs1x9xp',
                username: 'vmq6wok9ybs1vpsen0wlymmxrrknkk1dce64bbi2dftbe0qejv91f8ye75md',
                remoteHost: 'xmudktliwwfj1vv0j9rkf5fx2c7dp73nbu4og3a5pind6hfac4pz5juuwnchimd8xo8jxcshtq6fvmsz3ejg0w8int1nc3r1rnx57z1jr29ev0jpq4ixvhbdoul2uve79ydfrxdvaelhbq6zdeqza4mabncjrzr8',
                remotePort: 2942574342,
                directory: 'ycza402n17uhghhxe5bxp7c4gryj5iquljbu087z5vg5cabl1btvpr6uynyflhtk0m5y8hzolyhx4ev1xxtfvyv0yoeg48qx7ykto1czt8mg2dpdxd9vcgegez6gw7f4l6u5i4bi04dqc86z8mb5zbezicro15p7sk54fp3i2vvpn90en6g8jas3ix6fztbev85qknboarlx21mnz9xyc6a0kn0nygbfbwyuzpmv892cvnq06hxavam7apbh8jnzr3chq3kahjtx1pyrh3dqc5d0zch2je8mo097xaus4n44h1obdmrmo2bgndfgcto4vkwuwpc2moq6p508o0pc60076r841lm90ep9wdtti177u8it9802kqaczvw04wvce58ivk3qjg859jb2z7nmnht7ffbhnvkb5p4c24yniakui08xk64ufewa55vn91ovcsn41kff8flgeg8h7fxt9ufhfk5z2xno17aj6vkq9zq089l7pw6lzfb1ct3vc360y9om1qrbfs22glmawwr9aqklaj1h4tr4h8x8pslgp2ppomk9q18byffnjvzsn4im5vy75ra9f8c3ow1xbef9d0xt1t0l7eyoms2h64ygc9kbjxaah6pzmwfrx4x2hspwqrd8tkfpnq9q7n9ks361jnnbt3ezrz817c6jjyuyxyvthxwx17esfdytgqpky2nu9xtgi6kt9w4jjdvu702vs0y7nu1cr85gmmuw7ynrl2gt4mg1uhek9wwspq0x01i340hvad8cj42d9uawpm8red2jym5sn0xylrqbsoh1sv9lbuz7z4q1xp7uqzdyh15609hapq1ktl4bq0zkwxcaijkrkdwd4nl5dcf407kiucwfa8v7pnh7stoa41egpt0cmfb1nrqwrx9800vpbkr842v5es819prcwi3ktikb75jj0bnwbb3xzhx45sahhcbpmhktadctyducnofqzmgnb21as369xd5sxjclvqyzxpvwzwoebm5j4iywgmbbpyb1',
                fileSchema: 'tmbjmf6umf879oje5ug1fzjo5fi3chycudtby4qpnoxxk30mpxpyzqzw4dfzeeygq3g3qm4ixy6qodn1c5flo5rmim66eo3akgwtgvfib6mdlh82r5bn70s14ql9oqovw9abc57spu88wy4gvag1f2hrvwwiki86yzib8nbmsgnczdro7dscprz1651kltpx50oas4s0hjmvydeyvvjofa6kjruzkdwxf8iq75d7841jraifdjhgqbmohn5gbaaf9a6qvbfw80ll9vcofw09ygfy22ygdv1bzw2vrmmusseitwgmm9oh0sqzoorn1jb7ol6o60elwpllmy0lcnfor9eiosvzbam4jhdym7z8j7dfm5fd71fc1vrp7mhwum86koyh7m1eepcxewh54zg1l9ou8wism8oxhqsl9tozfi3bp0ausoll4ro5gqabluv4w9pbzece3xrithc2sxuhd2goa66oohnp3o3oa39phjmdurkbgz6krtrzeuxsrcuj7tggzgjqb2ebvv9ex9nur34yumhx22ebqv7va3n1kopzzi3puszad2vopt6x9xusthddlkblmyfp8z1kwwz01qqqeaav03q4ccguzs7b5vcl1kcq0xyi7ahpgj758k368tk2fm8fp0znclpkmb1l0bpjamjlwzas3mdnjfa0f7sw05ns9xpgx9vz12zv7nwyum0mi1azilgb73grsgwyjt6u4y413ln7aqv95ul7ax0436hl72sgbn1d5gm7rdyb2cuelpr133o7r5kh6frhjuaq01tpzelmeyk8x4nhzxqc79rj5ex5c3quuoypn6km3uscsw566ix84vm327vf0qj5tvnq4b3hecea1j2ohl7muv651ubef4hc3v02xgndlj6zo9cywymd7j1tsnerlc0ehccpvj5z0a6t8a4sg3uwwk2hoslarprnx6oi80ad6sayutdjmvldrz7vo63oy4uddvgznlcd2jugpwldqb4jmjlbaoexiih8u0ukfghy',
                proxyHost: '3djtbee1ni5gtkos161kiokftv1774sfe87xcxw3ok78jf7p0enltzcc0a2e',
                proxyPort: 3745275253,
                destination: 'y4qmv7laoxa43ycpe1u3rjyargwff30x08ly3hebb8wgj0li9nnr18jdi0omo5lyjqszx6jsy04ibhcr8pwccmm3lfaygekvaslnhuk70fc9er4kqv5x87p3mw9by7j477olo9th4yo3pw7naje6ym9xfc4iuz3r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bnfn98rbsd4t2h8s9dgn48ibnwhc360ok3b7wn9k2m810o18y4jf87s5hjebj54qwauics7bh6h4rp5cx2i2qewicelg6kqc6gunnk8vev4r4ersubee7alqip9j073jmhycl9abortnf2gbgam2dxbapvhw9lf8',
                responsibleUserAccountName: 'qxw6w03vuw38dh47y88k',
                lastChangeUserAccount: '5ntsk3r2o9pse5619qjl',
                lastChangedAt: '2020-08-31 01:35:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '45ev199oacsh04qcoepm2tyg7f5ov0yieiipo',
                hash: '22vl7fphwdiba6hm5lsuat7v9hhn9w57k8ud23vh',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'uqms7iqo9zc1brz9rou6dejs5l991l4swpntyn4d9548h95nnk',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'o4jtxt24zqio3dpngkvq',
                party: 'wnsx74yofk9942uiq7n48idqgsan5ox2zssv3qv6equkneig9c6g9ilh4vzilcq3hlfbnyxdrua508kfg1uwn69bs9qyjskh2hctul1km0gfk1ujz2kcwfpfguewjqap9jprpjbz0mutvzopxwgz56oarmv9k1q0',
                component: 'ht6o6ybeshu8byea48lqrgjdjkxoonijpl6uowkgydio3ganbljbdhr6laxhrtfsbqlw993vjs0m2hunsoqkty3kmzyilbz75d2l4hqrq5d2bph74o90067zr1qouwpi40luspc2x5dqn5h3elkdhkjqmpn180xd',
                name: 'blsfnqewxzg3v7ari792epn9b1rr2t3zxxnk4569xxehwp43n6j494jc6rvwyru92s0rvrhtwy6c7vx1j7gz55z27ic40crbd5kvctjc9mtayo75tkmweqjggkiblti5b2d14z38tpn1uxyt99mlrm6lkwq0154p',
                flowHash: '68wvfpp6tg6n9rf9f9n6t0w8l33lv2t6ung3uo3c',
                flowParty: 'x6t8676h7wighlxrse53n44u9p1wag4lt5dki05fpm83wigmq78ch6guea1atoml7wid5hm7laxmlayult7c06sawc8jxw6jjfoxlpc4cegifdx17s9y8qy0zkfig0fsaax8imml4lczxoyoc0jsok7pt78783i1',
                flowComponent: '9fcyhrq09shl8upzdsx9jbewi63k7obcub6xlqsw779cp49wccrbno11c3xupwqhm8jgdejqi822i8zxxkp3lhb17lnxpkw55bblyi5lez00s4g3spw3mrlsacmvn4ouig703svvq40ykympse6b4ejni8yke2vo',
                flowInterfaceName: 'fd6iu9b8i24srz2e0wphhx1ukig1hzp8kjvdnek26hs5t6vtjcdkm98amd5o9ij2pmxdr5z14bddzp4vgmdsoatgag1v8alwtx13zdf0mv7f4fv90rf6c3f0324lp9hfmhpbgbu4qg0apxpk0j9t8iiog8zva5zk',
                flowInterfaceNamespace: 'jc09zf0azwblmkz9c28hmg86vgf6q370l52w6ycmye8pso964w90jcglmw6jjpth9bzp8k0dsbqz1smsyhx8lkgn0i18m7zqb8uhgu6ipv34dotnbjrpthfp16wdrnc2ui3zj4qfi8p32cdkm6wcr50trny16idf',
                version: 'twtmqse2ahkuhhyogcqb',
                adapterType: 'tq9q5iazfce43vqyirbhbsput0k3nof1dgmtuat95ksnybmdort8w9r1qkbm',
                direction: 'SENDER',
                transportProtocol: 'gnj1sz3ov2i6c7u6sl042jxd77nqs5ru4qvztelu3ac3ec319vml4e8r5y26',
                messageProtocol: 'x8uu8oqq3md75qmoztme2uxcr8fyx7tpf6yxu4799dsjme4vwg64cw9gst0c',
                adapterEngineName: 'w1wzyqrgtbucgwpppj9h8ugr1ncrlh6y9ctf6vp4q75e4j4p2hy5h3kbtrxh57jm9tsxusxm5rcx1cygu4m25mejygwqbdr78697hd6ew1jpq9kihpbt7vzaud93w8g1dcfk11kfilaez6hbpmgx2edffu174iqr',
                url: 'vmucr3d3o8cbt4tooa22xxxegzrnrgkca0zhpl5f3cf4aw72a69fot5sox3syfus5f3vvyj2huq9aa7a1o0a8r9bmsf00biibclyqcu1t6tk15mdnzmfo9jw0zu7eym11u2b5q1jsqlm6jfuxf9cxwsdp5o701jxkydmajwpzb4v1oixwk39fdf1ntjx1rne6qrpajye1bw4k311bdnzp9tx0qehsy66eo4pqn28ivxb1wdm7s9n3gfosxpprf9fpm1y89xyc5hfs9nji68szk18f6x6kcczlw4kmub5hr9g6gvjq93jvdzdosd7krvg',
                username: '04ucb18g9m2kdh756fj8vsk6li3og2kfkcqtfpvnj8mdaeejx202dl8tzfif',
                remoteHost: 'wttwwq4s8l0wxh1cshduhk9c20yxiubd8b60af9t45h5jtcv56xzg50hyeeqda51mx6ria46f5b81ywu5c1zd6d4wlr7a5126rcbevs4fd2kxlf8pkrr9h36u24vodh76jkhf9vg5m54gcvqnrvj45ute7aqsiyk',
                remotePort: 2816351207,
                directory: '6wnzu4ckfuqwett83guru7ddu5ps6bo9vmqk8y67l4v91yhqty9cqqqxckltu52j4agj1l9ta2g28ta250mc8keyiwlffwggl2edt15ntfgkdahdzt8yop8mkwts46yl83lpe881a22w2b1pq6te0wtigrby91ge75mtxnz097j006s1js4qj72tkx2d32e0q0y30c17aq9bzhsn4n0ykgj85lsb08u6et5rdhyyv7zwp2baps1b1pmg2d8zxe5mgtcsjnpvw052dvnkixteyurffeyr6xc954f5m7kbp7vquytn2a43wsh5dg5r7skerd13bzv7bjiquymribfyvnjidxx7kz9i8wj99zn9nct88748fax2p5kya1c4lcux0f5ghiy61gw7ftbv4u1forlwf5tygrzraso537wq7vv7vlvax70ofyde13i2z6qtg0wl3qenzdi57gjrt7flj2gry8z8qoqsf1oc61x9ndropqbzepuzpva5zu2ejxtyj7plsnvxpqu2ydxr5bxcyd3d4pz5wpgtjwatm7xw2qd2yaj3a3u40cexfbdwgpl1uxc05eqbnb1umox74uhd12vn63n62wivkypiqopwi5vc2sbgt87y5tvqfngdjsuu7b2fpfch7i97anhn46c451ziaq1p0l8nl15vc179m0gs3i0060xjz7pei3g06nbmby5k76kg8v8r9dasbrdsz7dkm6a9l6ijvvl87spe6yo434f5ryn64ni13b69tmjrud072v0mf6bqvuv29pxnhfbp63g7bq8eqyl9kf6goja8fdvyl6k85cl7ma7qij89bjt3zgdy858mh4l2tds1ftsagw395p58llyfaeuame7ggqq8pcbjmm9xa0iyxjxa2p756dth2rgy0dxcneu53hb3iux6g9frc655t3g2a3jmkr4mqqzy8u97uke3hafypefmcms6o9bzz5lvooapzkzqfd72h370xo1v3gbkfekj7yjj9vjapdo0cn0otwhl',
                fileSchema: 'lkhp7nt32hjhh5pzmfvko9d55td1gr2mdk896vqr65wtj5oknbc7zx1zymezich9fmxflza61jzll5o0j5ql0jahz2ig3j36wq6gbu07axofz7s010i7kse5z1miau26bw9fljl4a6m68k0260zqndhr21bppw3bdt0nzg4e01xi11n0kgm6be8yl7x0urxexro481o1rvh507z4ed9tetysk1kejfnwh9m6fa5fgbdvt03e7u6okji3hwkah1xzqy3hisg2e4455yjnlkaoewv10nwzrxiktwpknwng6a93yg437bxpscc843ht51v6bf8z13d7tz6v7agmx2sytebwtnji27udbawarzd8wxf5btvapwpm18fdmk2sko9snso8y4bb1qsoy5g70hdp3e6vufrbbw75hsu8h1mwz1hfu7osh0orl3cz74gzsdxtly0u04rn0hgr1nreztvkt24kigbrvwcbh74z6l9wc07nf28qohjr2lmlew3r57gfz1nbxtgqbwlzqw2wc2o1rzkvo64n2h3fr05f028s8mwyl4h3nwawdaptm78u3fpytk38fesamyfq2gc0xetkgj5yja2qtabnr44npbesp5s3dsv1re7vmfl7gwc5ol5qwk1dwrs3f4im8zhjxy4lzjfw92rzmdfq19yfv9c1rv10rpp3ec2ze1m1tx7xt30w3aujqisjn1vkizmgga3ymu21pppqptypkoh0sssqg1q5czyhe9515v4y91tk2a95p7hjx9ceab9ffpgc5u3ausm6xqdk8s4jwcy1m5kvjv18xcc5orbjt5pik59y178ikvwsvu5lw9d92bb8jebmc2h127fxg4sya31jm6vwh7wy7615ew7vo6zfimet3szgptqh1kyo7jca6600ipdngykoo4f013sviuv5j0ouxay900h9cbhvk3u9q4ukfdlta4az6t0lxx4asm4ov860e7um4nbkhdyd0zc24x413a8d4q55jzzskjpud7xxnxoq',
                proxyHost: 'k6pnv1bjpxrptob1xbqepb2hg59wmw8zu67hcn0updedrzekwfxoiqjmczcl',
                proxyPort: 2637995204,
                destination: 'sole5l35m127tycutbmevjbofrqsputtiqkw477yexp9ir10ix2f0qz1bs2l3927mes9ocv6b8mcepl1lhly5m5oeg2ufer87mj7jan36vddt6yrwdg5r242ptvb0h7fcpkclvznqikkw3hsr8effmamn7g74dfy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'k2sp6v3sk9wqe4u5slo97i0dumrvfj2gyzwv167zbnzczyz1i88epv1o53rk5l1hx9psi09kn3hfgu1fog71j4tpiar0ekm573j9nmr8idnsw1izvv3m69ifqnsawkl92ptq4hg5s8kgrs77qzxzseambmuptfjl',
                responsibleUserAccountName: 'qlcd7sy4gowmhaed4cto',
                lastChangeUserAccount: 'kgpdyiope9mddvdc1a7d',
                lastChangedAt: '2020-08-30 22:44:02',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'py7juh37t0jbdg94pauwskl1m57f946zlgt8547sk',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '4a018hcnve7mzhtde01dwm8x70fxejgu7oz0t2biewfct0buia',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '9okdynbcshk4i94j5igp',
                party: 'jkxdouchcme30jzz2xbzilmjw2bumy5odig408vttzkbzdldzam18zb89xybzk3gdobjznh9wyedwffde2abnyi9le052xy2z593mppwn1kbp18ls625wo4a938lfuy0zqi4cy2wa1xkq74kgjzzytaufuksxcb8',
                component: 'k3t4fr92bpyu42f2kmjechui1jfxdjauq08j97h621wns9xa32welyo8xlotaqq4tdwx9gn2jilqi613jj3duf8ecoqoubcr8wjzr4kgpw8dg2nzjm60jtpuk3793skt9g2utgpy4zgqp8rrl2toj0y7n89kgzni',
                name: 'glnfg0l8qu3mp2ly1j4jly44mhyy8oconvszrhsq0manh62y1skk4p09xmkkuw7z67yafw44u0obpwcc62fp7glzs20r7co78wk1vgis9dzj5cb30kxrr2k12qnjb12v4sohzl422ihcu4t6co6en45mydwh4hd0',
                flowHash: 'h39uvo7v9pct9iko0n7111h7pvi195tlr3xk64bc',
                flowParty: 'i35abesylzhb9e9s7yyejpizhhd088fxdwvao5neazqaqsb7affkmay5ax5be0f0m75jxb0i062fj3nbq5xmvp0fg7keuz27aovksbz5ff9c6z7e23vmgn0an1m2w74u08sv7vryi5sdjqgzpmypytg5ecln1i5z',
                flowComponent: 't8liw4fumotub5lf249hatg6yqu336rx2twtmexlbkpq4hj3muzyeli98k16nrmz0jornxted7ee9ikfp4cdvegilqgk75lm7azfftfvt1kdsk3c8ajbntzq8atop4y980c71r2yghb872kmuyg16sjt2b6ho6ky',
                flowInterfaceName: 'md3qnakvdu3e0t60aq3xpmqhk225f6c0unmespmao7b6r6yn6k2b6b90fc9jtycsq97uygoj70j3d4ifc16iya7lz169hesetjoo54s2ud1s9ztrd8x57r2t8i1duc9cas31glxr08yskcelwxboy61iaim82m7m',
                flowInterfaceNamespace: '5sofzl6zzlfoac2bdglipex8ld7ajjd1vdx1gvl16z3g5wb9jftgqx3gx6ydzg4huon0x5xj56o8kz52jf5r3b4hu1pvypbidi6sf6j8vns80wgw0x38f4kccaoumkzoqqhd6m1ejz3iwlsxd9her8o5wf3afujz',
                version: 'wpt4vib6chvldru0po6p',
                adapterType: 'hv1kt0h5m6zi057xbysmd6szkgm1b0t543macgbj3ptuw32nnxfa6mr4z233',
                direction: 'RECEIVER',
                transportProtocol: 'u64s421imhspn9vs7aq7rkqfqe6rh9f0kkmfy0b8bap17fknp9wbilga1klk',
                messageProtocol: 'z5qyov832y1847fza3jdldqdpdg7aq2ffa47j0ncuqvk6za9gkjrewho1a8i',
                adapterEngineName: '27nrx1tecjkz5xhw217rkhy88xb3sby6bzvr9u88h7ep7ehco2x1ml8lk1b06b12wgq6jfu3lvr98yad1au47b2hemmrv39sv8yffqq7wsvvo8djif5z90dxuvq34ibo0boxx4r79v933c6ujtdvkl8lnr2fxveh',
                url: '66h6oei7m129whnt10mo2tk3qh9zq5he6heo6f31looys3tqratbo62bb46ps4lg11acremrutcnb39jxje1dmzyu05bepr6puwe2mhbnsi5tppdmp9o5nc3fta7mcri496gi23i8m9pthxnuaoaidqx6vqehwpirpzhj84ifkzqnl5cdbxyt0x5raun9ttz6szgf1anevdo8he0trpr97gye18peg598m8wk791pz1lxfaiikyds3fzqr5ukc2a9vm99hfwmynh5fcywyp310x53s8pjdzn425zqnfnvbc1c8566z4hbhay8crae59b',
                username: 'j1ay76pezh8spgjjapgx9rfh6734qslswj979esi0zftwcwkf6mz9wzpcave',
                remoteHost: 'nyqh6yt40jlawd3fga1ud3zclx14czrskohb099kp6zedlfhzr3dz5augtrmo1qaw0l2j3bsvois4evuflukm73gqah2ffqhhcq77p3n8boa58sixdix1010c2payor7nsn2mv1tmyfte6qm1jfrv6w3o9u6039k',
                remotePort: 7955110288,
                directory: 'tmd696r9prfxmjtsoje86nao99amj8idjpy1e0wn3lxekssve341hyjndyzrx2msugfbdqm3114w6ue8wnlte5ot64nkyu0l5oai6n5fzd01h4duo0m3nd3nx2laor77jzn70zpha26x7hfzrrsia453z0wjz3an030t7h0u88c4t9jyz809wnljc8km6vmusr5lpgd7hiwp8evezlocw5pvyjlvcpu63e7ua3oalpdehoel6min3i42tqax77w6jx36uv19km4ubvycm90vmndo8edioo9mqouqmmwpdfq53kcfp2wqrvy0b8lhyk6chajg0juajgki56is7rr48adsuz06xlcw01g4cfr6s7e3hma69g8zkrsb0eaoc17b3nevgzuzfsoss6e64bnvc3yngbqm0uevv1y6mgl6t0mrd2hqpwjytje5k7netr3zn2rwk3zysl7whee3l10co9rm0xbh316h1tqyozp4uvakwknsaxb4bsqhwjrcldx2yxx1rl4mksgg6dgw7d2t8lohofyx41nugrrlpaku5ng10fso0aw1ydoxnhr1j84uyw7bldapo8htivudganefrbxhpootpx2c4iodlyjuxvy8kcux2e7e98kk42paiawnk9q0qv8tviso27ug6ubbv1rg3qoyvb6u5yjfv7bbqll2e7aui87q49qpbo5w1h7qcuuet2928jqusduce2ckyghzor3bpwkdy4ddezed14lsil67lhojqrdx4ph3qbfxxorgono18jt5rjnirc1dcugjqugc70d4n2wuayb6vc3k8ieh6jprey0j7ssnfkg5n6yetrhojlhha3tkt3vudaw82zjm0nek2futhwrvgxqmccxfcqp20c1qnhrmz6qxnzjmmzfwqgm00r9cvufakash98iczbgkh2bmq1dzd6hmw12qd90lszrchh06lhrsi4u9gp625rgiczfieolmvt0qxc3vgpzaqf8frm7ymmrq0xitd5uz2ocs7tnhdmn',
                fileSchema: 'ihcfwancsyrzhw0xtz0fe2pesmrdvp0tuzkbadytjkf8erhau590gd9wu5uqqyuxi4a56kas01qqspm3o97hchrcp7avc2agz5jk9h877kuthh7f3kvyvugraiyukl23ap1z8kvwnj331hiq0emw35hofb1hrdfv6uh2wnyd0q8llx6dhm06aoudkvnvya6mp9wgep0ccgnyc0dfomkkn4uuf345p3316nft17pl00hcjlkdrq1o0zoorxd8ljgms4iqj6ox13nirdvx7y6verry8frquwm2bk6ilierbzvj9qw5ui5zgtr5yvdzxjw1tmj23mj2xbnilgplab2k3d6b0cwu1g6tz923zsxahdck8x519pb0eeitlg8pqit73nvwbbplqh6bmsfqss8zpentd7omzb38dim2jhvdbbfxl3jc2q5f141yokhq8y4jgpfq2frbwhlk48xdzbo9mba14dggofz1zstfaebc3d43xm4pk5mnkowmccytihrslwsv4imrafm88elq3usrkan8ysdwhrv1xncd0w4288t80aexkic462f6fczqvr2fpq524tj4q2bw7l41es33m47hl4l9nou27ucvomq31cwwp5gz8yn42l71untepm13liavvp3eefzuihs19z6y7gi4ejq8qogcmay0leq2utazilk9df7yydosmj17iqg1m9482i9hf9y51ymsb7ydn6ffdt90t7g9fb5d536x1ua7xb1z5ew0vwn1is4z6fhywrug912uuvjq8drulx0iguxc712ep7wy9rhnxnrhskj6e5m8l09k0hm4qij2tjnzxi5eeopwg4zezkkquc695ovtgmi93cjtdxu2ael3g8soqs2f4xv5k95566st58almuvrrbxqhrjqgcty39dvlobvqbbzgvsh70qix6idw367jjnnp7moz5nauzohtf6f5eeijbpcv5360zzg5y3uk08tlwr1hx0itwcx71kksby9bwq6wl37zmirv5mmq3sg',
                proxyHost: 'bnrg5mt76kwqhowrjl4vava4x6wdlbg8oakmvih579zv2e5zowt9awtoae5w',
                proxyPort: 9675255228,
                destination: 'zy8xw5mr6vk28bqn4xlk4p52teh39dwvvrzpkv6c5mf745djk5uqf2hyk1de3odd0rx9eo6ulndsoy30ucck1t649fvd0g94qa905ig9mvt9kuvutlngrj3y0cckdax1axtxtn3g0646zlyil8p3pqu3ynkjhixj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '060fs0bkbsojvd33rcl4pruaxuqja93uy5cy2kpfym9wvnvq75e731s086wraegwgkotkgpazbj6g5lmirpo2xhtkj9gy45tbv1nbk1bir9k4ycndnfsmq3st5pc9f6f6pqsu3l1txfuuhukh7j0cqqwqd1bkm2q',
                responsibleUserAccountName: 'v7ilpux6o15lqn2cti96',
                lastChangeUserAccount: 'uy3si0t04k0jbj3nvuk2',
                lastChangedAt: '2020-08-30 22:59:16',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'vyp3787l3ww3gtisclv0vwn67aiz4kd84bs14e4u',
                tenantId: 'fb5azh87xcrwqumqhuvu2bg6je81x2pvtqa7t',
                tenantCode: 'mmhho1t0irfiilxun3te1w9zo9i4vxrxxwua747thcaeiwb3xu',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'kgwhjrsbkoxtp28mfjh9',
                party: '5m0fvc5ag6rxpjy6ei27c03sro0z1kkhrp6n06h5vex1idkza4bcgzg8iny9s8z9epmb12hqdtnee5fdixe786xpa0nj63jwswdz28w3oepa3c6xx0qnzabou4o2cydahgxwhe7zbpa80db620chbu8k1q5j81g2',
                component: 'mg3qp02lbum5r888l2hyussx4u633nybnncxhroew4p7hoov6jx5c4mw8zoptjms90jocqczewsjoohwmalhfl8s04l2ev53e864dj409srican0v1rd0jbujwwg9jawmxt7x1i7oflpcwvdgmsaj5t9qcmyf4k2',
                name: 'wuez1gk6iq86jp80wug03o75xvhz52hgk68bzobtxw6vzoctqgpzvzi3k7gjevb3uxypg0hat428ebq5lkqcq1oez5oco471w229fyoa2je8c1qrv6n5tew7naglgg9dmx8ml97m1y9a3w1oxjrqrwg12o3xeq09',
                flowHash: 'sngffz2cybmwcpjo6jrw1hfv9v35bb6q0niy8dx5',
                flowParty: 'fpery2w3sl8pecces162lhwsv5um5xppqp5460gmqoynwwv9ugmcrptsvrsq2m9usrqya4uwe6i4u1ub7my3r1jxzra9bnkgfco096voe96u3wux08vcxsgpzhx9tl5llyud9jv9o041qn24hv4zzk931iqf05kd',
                flowComponent: 's9q9pftuwnyhg5sbmjijodutjbanmmn0c3h4fgcv0duysa71tf5w704064weg5jpdz0om17guxp5bfmohnld6c23s7w76k50pfrkiywv6urrbsfnayzdibrzpim3jcybde0tvdlkzxbmlokse2icqn8j1rfvuu8c',
                flowInterfaceName: '70tnhtittlgfjp7a0ll24vaa2ao2at0m5yw31ww3m5azyjdbri16179a0glsuekxf4348l3ff6xsd98tlh4xqsu4svknz5nctwb9wz4sj4tp7kb9zgi0qbrwnbkgppd2fid2kqgqxrye3cd8u3efma1ubx9sttha',
                flowInterfaceNamespace: '0awl9yufa8zi56a71f7oacedqqljhuykqyyfy7cao3fnpklsmphmtpb7x56s631665j7jvo9xc63h6dfm5yaiggx0mh9sm3gc2jco0rto72o5ehfnwyocwtgq4lqogyykzlyilc8zpuo4jwah23iei434rkofwt2',
                version: 'zown1jvnjxcis2ierwke',
                adapterType: '29xqmkt145r7rfk6cmd6lfrbvkxgg1bbt6mv0sxq4r8ojf67cinkvb0wcd3y',
                direction: 'RECEIVER',
                transportProtocol: 'bdiufnftemsvj0q7k39zv7nqw1dd22ktxxctp4lvfmvwigy2urpd70w6np31',
                messageProtocol: 'xpkwornox2t6nloc1kmzhw1ha7ehbeoegnhbxx5dtmm5h81apwcgk2lmf6a5',
                adapterEngineName: '3s72rapy6hix57ulxttqbfj92wyds8j194pyy12sp9asz5y951ibpjrqfdjqs4mnr3be904e7jkulkfevpfrm43byoc246zv2v8ob9x1gvpjfhwqzsnfvhdit1hzacz7pac4qv29gbbexosy1dz32u8iofj6bynf',
                url: 'k5wnf0skt75l62oprq5rn4f35k2axykfqdb4g5t3vs3n1fh4dz5u76j1ydhzl3llt2yjma1u5okkm98arrxchogqx3tysoxfp1c8w68eiawhdxarb47g2qdlhlze74g3snbyqpazzyzek0yikiff118kvqr659ohjji54ie6q5nnqsc14i07eskxiuw7hdhsxym2io6oatok694wzfh8g7hykchcoodllmq4iehqgbaxlt7azk87srfvn4602u7bk98icmdvivv9rxjiw3gd4qqmpsy052jnvlcrz2hsy8eec40pzmuuuprcjvxx0vam',
                username: 'c41x4lrj6mavyk2e4sh22mkgu8a6co9bluld742yg916polopo1dmoschvj4',
                remoteHost: 'qd5tytuhvkz2pny1y1s89spjcfp2ykndsf20a61u1s20vkttkmbr34anrtouyoqzib69bch2nbj7o5sxlu7onmsc2ys1t7jqgaaa1evpc2uheykmezc8z2ivwq870zhb56lzlys7rt4uzeo16f7njwskeqknepi9',
                remotePort: 3367889279,
                directory: '2mfc6ajf7qoa1taf18ackbv94sajqhfcfwq9mrrihnoc9j8b0i8g96dfcehn7hqzg6g048xgebemybucu1oz0rt5whm6g8x5to5w0zn3xh2rtdl57xttq9mvkwfw0ud3mat7a4u9awd8y3447m3kgffw0tv0zc6hl4q8jbmissowj65gktym7kc1wm7bwrl9blntkddfpnxmkue81qy02raghgts6whnu2bopqo1jn6a6rb16s8wteijk36t4qdoq2nm2xwduyoagki8of49j8j69irl2uq1yv3vumk7e4uxnk3v4lu0jg7dn2s8jpq0ys9vq40119raekrz4b2hnl6ggd6whqd1272a0m0edk4y0qodrw7eijnooyv8q4yr5b0p3ad8u9po0f819044yhgtbfai566ncm2ojx4uehqmkwn11g0tht81pq219xj0zx26wp8xg47tpubyj6ggeyg6y8nmoko86uf4fpa9pat9tt6io8ac4qiafdhx3qv6uybgfcu3pbtdkmth1fe33qjd29r3r2woljajw8jgnrnchbnn6vqqfspc2hdryujfsoa76v5sg9cubwaq50knx98mh6jtpapv6sn5faezokdmcmylpl94jzlnon8zqkzm6iw7ehk4b6ioom6641pqqtu9v2nspo2gstxrv30td8bozsr9k0mjtvx7dgouj4q65d4xw3zx1iw6usx7lfdymrsve5r5nefdvzvrnu0sdn6jpglviltn96k1gvtadi8069mci1dzcpxmil8axk7uq251o5h2yp5qzysjghathh1cws4orz0ddxriucy5es3p2krs7z3shfssdq9ci0ca5elq69pkehi4adx53zuub4zuxb7c4d10qrteo7dgj6vmirfpswk0q5m6pz9219y2q477xtj7oqdxlbtid676py60da33j9m82xydd61u2t3sxdzlh93gm5cqpowfxsuni3s2ymqupotxybmop4d9f9k2pd6thqpk2vmlbgd72z48',
                fileSchema: '6huejw14jwc93izpxe9dreg3asryjmjy930gqo714wtkc0w7zurbq84xw6hwlf86mncxr5nrm9jhb6r9tdvmr78jhu9fwyzxs5de9nvrttsmoz7uvwod6e3ym8bm7xlaoiffh6qrhf8intg6xhcnvptnjuwov14jqeuyv73oj1aqw11w9iadutsg4zwga1gqd0anetf2kx0ekup9rhpa6irceg3znvb1rqpx2knnb87d0a07yodky216o27atqvujxsj8w8k49yb0pj4zrhctukm8ymqgwekape7jkut4g2gtebi0zbkpdzq8sywx3qb96jkzru3mua8hwiezy2ipzzb7a45vi04blgxtiy9vm9vzk8gy4685bu6oi4alx2ifx8ya744oimchwm1ockkik55v2bptvy7ea6klm2e6ok59nvletzhpccevxdvqcjhjsvdrs77ie85hz8yhiccgjp8ws0xhh7dfejefnk59asyxazc3t3tvqpdsfpczu9qlb1fg5a0asslrr5u8gebp8pxm6j403h0zoxdrqea3dtdsmf9p1gb26k9wy978qvehzqeiyb9oxdrf7a57g062el9zxdmo6z6j59snqhr2mjxwx7l1al2ixsf441pjgtuft67yyhpr9qyochf1a0xauyw105al41zxfgx5cnaf9v55i3wjt5qsyj6nx1nnp4bb5bq3xca97xph44n8ecko7tjgu3cg5tdfsvv2iz2l2hjzuuah3mw9wrxhm2sf5gia1nk11ki2d4ssab7gdonxl1j096kz1pihapq0b2wskfpf11r71oxjqn1fi034n5iubpiz7degypn9cb6rnubb7irdh7ezxk5qqsppx3e3kavkefb5s84p8mdrpy723jr826ozacpp06wejkdpkiimznloalafvj2ipqkt1snz2ncd19sfk6hw33udjaxjvo2d0e6g04atltlq6hdnstm20gm4w0xscxn4dmpw2zit74bou6dcur6z9pmww9omc3f',
                proxyHost: 'x1nr3t8piqrimx21uo7irj5478xt09bw5v8qdwrfqg1hsm1urjwzoo2l9fc0',
                proxyPort: 2807446418,
                destination: 'ojlcy6r1w3hnl5t1k18s8fngr4fgtbbkj6v7por719t83js2wt6byo9qo5jnb2332ubimczd3tbr7nbi7eyp8rztjpjmwuvzvdrwuje4fm2dp71vsadfziboy1huviupe0hsp3wex8zlgy0ejezdk1m8ewyssglc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '65qvc42ayevtnxmyhrserch8x0simy2rrsgvwsn2ekvj7grea6lprpji5l9b23s4s64ns24ez1wz3y2twzaq4m7ybgojg0ztdj3uhylr2t8sluw0pa508eav2hudogxmr4xlw790fk7q9n32levpyzfdhc3kxcxt',
                responsibleUserAccountName: 'dsrk8pb9l4019yw8refc',
                lastChangeUserAccount: '3lyas168wx1i0hnd7ygg',
                lastChangedAt: '2020-08-31 06:53:20',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '56n66xvkz39f3ec9r9r3ekl32lkdgzlxzbe1sh4v',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'nnugamw3jrk97ltha91j0987cx9x27ac3ruxm31vgohxph380q',
                systemId: 'vbg9s4pakhfw9z8qxm0mt6pwvdzrl7md2ejon',
                systemName: '2goarkre4urtavug0ve3',
                party: 'e4kplng1p34aqz0zb26j4ksbfdstbz2tkbjib0mki0vzr9ooz9zawu0ihj2hftaaofmuqr05s865pphdv4yfwj067cypdb4wwd85hfqggyhg5sfnom8ihc4effk3fi2oobvscqept5ci1x4i8jmkrjhwbyhp3nri',
                component: 'f1u942wc79fe42evra8o0agzpn8ky8g0a2nakz1fl36pttkel9j2v12e6suynz4rtd3k0wajxhjulbz4dpguufoj5shr3hsvuvktkseqjf8w5buh6t0dk1351u2h2gny5zs2g87h3le9zzsrgvknnlftopbly7ez',
                name: '9ryn5kemzwq3keykfq5skj38ciyf8b7nd1v2mkrw2sn2kebnd0azpzylxipeod8rdv1e6rqdgg6ljr0szf7a40bbh5w700kfnnfnu5fqf3plgja74p4oz26tjkkuv96ykv7wdoz2z600i4m7k5i3mawx28b3lw0m',
                flowHash: '9p1xs8qtbc0yel67doudu3sgijxnr9xzeu3vsow0',
                flowParty: 'jpkb0o7iwicnt43objg06j5qcy8pcjvzlcbf5gdrnr920s5hczcdtobb8gbzo1y5qcya7dr11floyv0ub3ifoh786w3y46gegdith6x6zoalle2yi8wnramvuknqppd4uy56tfhn52c6q5pyrjcmaibud9kj1mdn',
                flowComponent: 'o4ynrvlqbxt4jdyfk9pjul0pkgnlnlo9i2hc4l4mviaeqmcaa30ut4bkj9mi3pmk4w0q6fou7fvdsm3egp5qxnmqjo51pzvm1z2y43q3mbdhbqm7hh21nk7z5gstoze4linqvefe6765t54d9la7p3tqjm3apci1',
                flowInterfaceName: 'g83o7915qqez55c3sjcos4m2121hxq26kbqkkz2cx13hf6a18fvoqb9scu14tc6pkac9qf1q4nu6n479jjy369nlhzau82kicnc5r4ztz8kizs621k5jfldbm1pxzymma7emdjmkeliyax2hz6vhn0uj6iuvb69i',
                flowInterfaceNamespace: '2ztrw54v1tb46dfo9v5etdxdz7socz4gw5mn8vvisybbf4gnkltuvqnehv9xkct715wel3u0khazn9jk6mob8mfylek2tfdsg35dynloikjcaihuyx2ld4w1ib17d9lpolli9o5u1vzgnic7kphg27rc2dv6lmsg',
                version: 'ckesvrxqtrd9edmqgzpv',
                adapterType: '4x06q8bldv5w04v40yw22rbgdp68fdfvc6gf3ganvesc403lhfrkihsgrrq7',
                direction: 'RECEIVER',
                transportProtocol: '11lehembgosoogzyg57wjod5g2fhvdn1o0jou98ciigkti15yje6np31ztkb',
                messageProtocol: '0trs0z4kn3wkoffxbepngfc8a7a483f5c432zu94vmyhf4tptkoa6vo9n1wv',
                adapterEngineName: 'n9ec2yjmtklr1ldqjqbdxf8qcwar87pn1jpaehan69a3g4savt8wcokyt6k5st2o8u8snzwim7p0cc5ig9w87kmkatxawbpubdkmsdzzghybwg3mhqhqob6efzovbx7qlhhq4g6c6mccw7ijt2dcm6aetjj7vzsx',
                url: 'tic7kgg9bowniryfim664ujo1pdnovsqwes0rvfmigeflr9a4k7hg9eyd4s4rthtvbulybh3egkm03ukbldcegjrr8i96r9nwl77aaq5qiwye9edopvmmq6tf6m2vpr3lhfghszrmy4bw55ag6z56w3jach4xz53reziwh3agz8tv0ws6hrs5xu30hextny4wmm4fx6rwbtz5cwbzxqyzgxq2lbn82t9u5oqlohvdbmopw7y1ur4wm0i0ywsevwffo6bq455otrbt9oji9xb6lni9i0ipb7r52uh4z9qvtc62w2j7gjzleelywpo6of9',
                username: 'ik7fe4j4emvz39k3xpv5rl6ov54bv5azydorvmxc0jm4gwi7bolru9pt01j7',
                remoteHost: 'qvhnd9pq29rrzd2woelbm1dw014k7klxsvf1hgo8tffd7xa29l32wabwmuwbwyz5ht28nfuyawemu34dgbdwzi4v6ug7qkgrsl94mvk9xhgu5a4wqi0s6agr89wu1nhnt540u36mbzk69el3oj21bnpy923d2nnc',
                remotePort: 7716937359,
                directory: '5q90y74l1rpcptj7vw5y60nnl49lem6e199rkmsvq5uss8mbkthwyknxtgp4gzp9r0ima27z6rbvtagmjfppzaj0uris0ggb6mtkp4sl2net9j0o0rz98k72i21y4rryeo5p30hazz7rd44knepca6tup3eyyqc1siuxnl6uun75ehawxgs8j6k125bmpqq9c2xq6qd9pyqo9rbqcau44ebiyuzje6c0f4d89n64r8uh92udydkp2b9b8vifecy31np9ib1nj0n37vzula4rhrwqsmha51yib4e9086q0b0gumn5aca65nutyv7hq4eo7ayy8l36e6lhrox7hiiaq5lulmx9mtqymd02rq13p8p2erftmms73nhw52t00brtdnl4qrm16bk7n2pcttt1k8umv9amznbzj5n9tjio0zkejcgc8u4fd5zsbc5mgccdnb6aa3izyithun8kpmst178wujzukt4yx40iffsgulmbvwx1ljx8j3puj63q6nfpy6wgl7wglwzoqip4ql9lpyttlh647tzoq74vobhcfw4jq03k5mf7vfgrw9si6p2dcfbgyx842c9apfkb0c03crxrvd6syc2gusc8hme0o0sdxwd422n2o41mpltcz5vf8xrlgzaorcur2voobo9t6b3t9x43ps9dvjo8gc9vjjsdapeefej8y9awiebvqv2pdwdrljdrplaip1kloezo7gmhl8ai829i23ffccdw5oone2in7wnhwl67pc6eynliooeubmzbey6eqt51zonnwzywfmtc8cgns9lzpuav7mh4fswm9lhjaqdwa11p6aeufwaqpne09vesaq4cbxhjpc1kkcixdac1yuiaxypx3vxp19d30goi2995w08cxvfxxw12mod9fb912nluk64zevnmedhz7g7s9zird1dmjs2vidowse1866pqi14hkx67pody6mof0o6y49nwlcfb44mesd4w6hfai4nj7cx9srld0wteoi1t972cg6hrvulm',
                fileSchema: 'v20cyhdawdr5vxp11w3hll7gxi3o4p5k4u2985tx0qku6fkchu9blggxlbwout2mfyr8h1blzyrn5qsvzcmtmg09wsjat1xupw8h95ns3k5fvc1zafit1sq6nlluhjpc1fgl8xd2rslw1zpxa097gn0zj9j2b2wpjc94cgbdzgsrkfionrruxzm09w5e36k0tuo35yzxtielo3lp7i2unoygcbkwpmr9iae5qk9ctfn7yks3yyoq75lzs1uyb9btgd929hprjjndqpctvohvq4dxg9kkblznjirb7hjcdf50xcca4l7bcvluiyyehq95qhve7um9110g4uec079yhbsaow7s24k2vbayx49ktkf2gjrgptodrq8vsc9agybgfab1ray5ui1okzleac3t4e3qo563asyayjyzf2hnocz1lnclixdk3sdt5e0el8mzk8m8v0mxdkwcwk7kf3y2chgq1qm52cm9qbfptr1c3w6uxah1frgzynx75g8y8vadcfzqgct7ltcpu9rkhs58odfoxzp7z3gp1ektn4mylrc4vrx7ezoqc7qhp9a2lnjcl2fe9wdyfr5vt4q5ajh1xvz940lt7vpe5d7l9zvd7rtkdt7n25o9x7vjvpq6c0j3dnug2vcsgn4q176l2y5q2eaz3qevi9vthp9tmi7vtah7qnot2m45wx8nmw5k2aezznxyd9fyd9fzq0tdq1jekteru1yel2596tox8tshxnv5kul5l48wzd5khs0np3ak5w03wc39x3zez1zh2k77j6ncqnd8luqy5orn8cz48jmonbx90qvgfbya8rw2mrdeth0vml2ph99mxlzl2eqhe6f8xzni855zze8kvg18x8yxaovggviltvzpu3rdn4yf4ami3s5qhttqoi8eznqnj6rut5sy3sqzmmtxmjwo8yx4foxczj0kj1rb4xub55h5kxbo7dkpu3pqpuyko466n0c4xc0k83db3f91502mojuzx0nkpcjl6cekd18j8g04',
                proxyHost: 'mfir1adhnmycjzy1qz7y80pzxaohzjzuoknz7rhdt5nje9ismus1nr1sruug',
                proxyPort: 1319279299,
                destination: 'r1lkqkfqrtygs5klzwcx049iuwtocytbrggqi2f6u4ab7sit51y1p4k2ijo4gvq037nt5afgiw9i9405gnyikfg45gp176igrg2entar2cxpv9n63rknkq9p60efzphkvh6g448twvtayoqka3k3nuf8gslfx8sf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2w5jabzhpqaka2td4do7tv6s12dq75ovw4i7azwbw69313rxanzqas23erw83zfe36w7q8nrypbu8sr87u8rqlgvemnf2vvkbx1yfizule9w6wihqk3qaw5bg9oz9t4we0idnwri2y03dvk8qhwls99yplnggj47',
                responsibleUserAccountName: 'zfqy3x0qhl8qvojcfkum',
                lastChangeUserAccount: '8gd5504rv8w08hl3ru1f',
                lastChangedAt: '2020-08-31 02:44:23',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'pu3jeqhki0dy3mp984z25v30hmtvipkojixdm3xd',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'jb3foqkw3v6qk5qh3l7o24490kn7tyi4nj72tn7wymu2i8lr5t',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '4l4hgybaqs6xza319glz',
                party: '5k9fpyac5inlkh9ud5uitavt0645ow6kxw3pttci3k7vdlr39cdal3m17ujzc6qmjcjrke8s66gb2ljaswc8j4ipk1l87jzahhklejkjo8navkbct3yvleijho2eihqtru1vuzi0t3lnnufxgx6fike9zxyc887r',
                component: 'pdyidtk6mizic08myl7jvi607cdqtfhppbdhku78x98b82vatk35ffnds8aj6w3why647vmigpzjpibxy0ieey8399xv2wz9665pdyrvhd84qvp7iabohc4a4sflsr4hl13htlw90wm67wbuxkh4r6my7aonhg6q',
                name: 'a094t9jtu5ixavmnscnwvirpdp98qo718ybbkoo8pr7iytfyd8c0m2n4ghv9gpr8lkx1v4l1tlg8yc8yjvpzcjsiwjh0fame05pnzd80e4r4sbyni4jdrezrfnn0qsjtpxhr2qid8lo80d2iya3y4960dmdtiwhv',
                flowHash: 'yy41kmoyc93y9l3nl7lydn3rxiyts1ju8qrcfx0jd',
                flowParty: 'lpy6xz2yukz1xyw2oznjlbykes0u9mqjbji2f3g25owiri9kdnldbkx9x0ybllsekoneneend7o36gnx4902n95zgdh0rfimnmghc83tu03x82wl8412oge1mwy6trxdjcihu87nfbrusrpos95nwjbu6mljy7yi',
                flowComponent: 'hv70wgfi3w24xgmciew93m8mea8bwuvwuctf75144b7xu2ae942emq42qzyv9h4okvxpm5nkrdmuv7pzkkbgyczxfthz7e3vpa5rem4oaoiivj7c762ebuote1b82hux0q7yg5e8p7g52qiu21bma8mkqewn9324',
                flowInterfaceName: 'vyigvs0sz4kpz5ucdegin6lchfw8donxm144f6uqoraent9qr4yr47t8k4ofupjkjz8npqjmwf9pkl6wzno7753278u5tnl7ze8rgeygc2k56niwrkaqeut2anw5ezgw852n8dhhsyfn4b7tkabywjlkud24mkl3',
                flowInterfaceNamespace: 'pzwmasf1156hrqtcoh9jotfg3vnhydgcb8nxzluqhyf2pgaggloojuzt9klsy9um2tpmad29e614nexsz8ywbowu8mlt84np1k1fs9u8k7e1ar0uy5dx7fswq5l8mkimv65lp0vouvsof3do3zqsa7mmienfdui9',
                version: 'd8s71ub1dh40uqbkpyip',
                adapterType: 'o0zb3jter90jdhis970qfzs3of59bvvyfw8w1zsgm2m76x90oixiuj79cvoo',
                direction: 'RECEIVER',
                transportProtocol: 'bkb7wa8oh9kmf3t526lyy37lnbwu94lsgf3aopjibnvrbosifsgk2ib25boj',
                messageProtocol: 's8kzqnaujhvm5z581edgxwlhehmou7gvf9mx3sxfp5uwgpt08fgbo0kegb10',
                adapterEngineName: 'dx8qgee3v7ss8n0ojdimsjp3ymgmr4b5kxx1xrgo4upkp8nbpro3zfubsrmxcog9xpymbh1oertf8363ejfdu6ueaa3x8epa8ygw9pszpnwrzpwe7p5spze6h1s8t1gh226yl77jla4a9n9j4ifxtrif91u66ude',
                url: 't3md07vt5es7ajhzkt0ugvfvo0lv9y1h4dk9sucz5dj074hlz8y78r5apsiw9mdtydd9t6hurgtms64kpvvc3hy8uemlt4c4m26tod8zb29rrvh79z99synqnq4896ltadmrrv9qnysvfyitmo7lytu5vjztpxxg86ru5p9kmuj6t62utzkp4st4ljqq3w2albltzfv6v1b55cokbwypo2bx0my5dmq6ocq6x7jcdnjceoyw8paxsvucord9f15sagskn2u69owc4i14b9pvo1ikc5xm19z6ncyl64y5jh9hhh312hnwgtas9u6hrctj',
                username: 'm3vbozqa8lgtxbpj0vblfrmk834gy8jcr9b9tc1nl0xdi7wdvd220cta9i8z',
                remoteHost: 'z6jgtn71yvtx5izbuy61ygrbcghtubo01glgeiqs8m7f3zkj8bwfkpx7kz92ssqu1bevznpmv7lavtzd5tqtkhgzs0i2rsbivlawd313n4idphfuwt7o0sib4n4x718ic0m8tbbfwb1gitmml6fx9wh84m8tqfqp',
                remotePort: 8452290056,
                directory: 'ldngr7bwy0yckx7jgcc9u5rp4oayjcc7rppbqnmqpivjal3ias6i9s8v0za6p74az29rjd3a7w7qk3il5e47tcqfy0y2la3xoaql5agwjsckhe960w9rwlmsqzksxn14h92z3z2ld2y25ash1vun7cjdihf2fu04xp8gg920agqtkxjokmkrrh6tsjsdnnnbvrz8dee7gcv7ig0jtr7d9ch8vgmop0nllflie1mnzqakolqaqcw7c1nd46qwzdrhsyuzjo50zvcbu5ia80buexm1834vfsdlhofqudm3u6o7kvpyodyqg2vaery0zvjd56pk6ldiuz9lkqfyj3woutyfynjdm5yarafe5i7np9l8a64ubgrgdh76llyik7qha6849bi7k46rk73fo4uke7ydaxl0ztbhekjeln2zoqkamc2frb6uzkjlrvcpw5soox5a7uewrrhq0ymsv1mxjbi9rb69e6dc99iqyf71j9yqadpxm0migvx0kguzd5nt99fo71z2xwqnyrsse3ka535apmkbu8lyngu0ip82q9o3z0xf8898mj1z4q644prt3b5jj75mggl6v4pkz6toimuynam8g29o5v1xlhsobxj1zue0wvntk1ouqwd0gjvn2evdk973zfzw9x9n4rm0xg6fly9i1oxg87vo55ds90rhnu2sl38muoqip6ygqxl4ooz0q0myjius11c9taptgisqrn44ucfhw8fnyjtpwx6n9dlpsftau1toojvdiaray8gnszc26lulvlx7yqf35n7f6wui9lp43z0kj3dm9pk9543tqf53w162h2k3lr5fr35sbrvpisayuxfpwdbhgyezmu3rigcmvv3mep2jaj6gsz40zgulmjlgly7qatdkg55wsf7cllqldwcv6otbkmsqtva1ihhcnk66q52xh1gi0w2o6p7y5uyepquso1ow9uotz9bja30i2xe0dimi24vx1xwsxfkpyp4jpuo6cg4y4u3wadjiu1x9fi0gm5l8',
                fileSchema: 'rmirue4tb2ioc95o8g9ls0e2dwotvijm0bl19e2czxmtyaidapvfbklq5u7kjw7utj73hfigeu92uwh1fri0g5fbq24lw69in913yithntol7zuftbxj19ezu06tx0ysiyw1bagxvy5637n7gs0174bae9punjvr5il8d4s2iy7agdz2w9ym3h57v7lhryz35kwgqv4ol0on63g5lvw4mk5p6h66mewvzlgxw4vfkmrb8o7vmb0a9fe8zzqrkj338fu7m15tjefkya031kq6wqdpzrgbsd1hfgyapytsh0d2imb0ewenszx2sh1pmk88deor4mwddwepillw80ctojwcva27qzlfr8tvm5ydwayj1v5pfs388cnmrcdjf198nqnqe4wfnlztb0quhouuatk97e01hqmdjzm1mm4gzk5dmtqsjnd17rcn3g8kharok3dxv95yk2ozmb4i4semfdbafny9npdc57ghk7fxer1xjrtnswjvinpflxh9bqbvwgvsxayu20ns1z17udzwkfjassvanxy9wike4jkc4ac1vsfg8vxy3r891djjp8assd0jcotr5f0rmlfakvgu68q3kfbejrxhhwwdyj2wik9hthvxjpwpp6rsl3enxksjmzd20gt60odfie2gkhm29fpj21n9z4nd958h7ju5xb41y408rumnrkutd6kj65gh8h4gl8ni0tzunh9sbbn6gls8imy46tj6yre04v5nxqvmfri86qcnrs24obq1xuemhmb63bbua4swfi166jrwn36twy156ed78qncpum4wqgms288rnp2vsbqfp895dg33v05ym1ne9w96fkpewxf35gm7daglcw4nvfratq9uq2ekbw5dipcq30d3cgvelx6alqfbwujdmpyhtwfp6b4m5nwuykvvdl74ku1txtk09tyi0r7c2v4vs61roklod7n358en5hy6vr39pirmugpoc8gt6t0ed4w4ecnps9s93fbjkcelonjnnkmlnw1f2gn',
                proxyHost: 'kxfamciw7qftf1i1j79vs8uwae9j7xq6c1mallnxse8ckojxhryot2uf9uaw',
                proxyPort: 1771985291,
                destination: '8j84imw1xij1r9dm1lnvcg3f5x8qxp10ufmnltl4womgm1gkjb1nz607e8kygrde1msy1pwbuonmlrlfruh5l9ylwc7w9pc3sjo8k89yx6bwtzdfgsf9sd2kkyihniefo5wmz59cydifeg8f47dtzspyl1unmjgn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w6wq1if6zb6nvuyhflo6a3ssnejwrc8p55p3puma64vmz3vzxq0azswhqin0wg6trbqf8dktl9lu8379cyotgmqrpunlqgrthbe9eiehi07ohh2a8myeia17g6mnqxtk9w3bsuy3ewhxy09udrl77n84fm8cqfd6',
                responsibleUserAccountName: 'dd9ptcz2msqnhsb5jnsc',
                lastChangeUserAccount: 'muytqxyhytw871ypwjh5',
                lastChangedAt: '2020-08-31 06:58:44',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'dbadyp3tem5vciah746przxm4dsd2a87xywbjolr',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'rul1miljlxquolwky1z7qlysm67tfzsgtzmlf18snt4bcqh80u0',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '51hqdt0xaoi529q0o35u',
                party: 'qzk7o7bt57mkyf75yupmjouw40q4zywazccv482qy14yabt14vssnpve1nvdpomk6wj8ug9zbn8hnqz1dv718v1n7whrricarzlg59y83aq3pmgm7kjb26xvea39i1e48reimqe5m4bpdoideyypnq2hlgjhelq3',
                component: 'ai55vc6qucil774mn3vmxcu4rrg6yb6f79s5ywcqxd5okyqbj2qb91f50eziwfjx0ezj7m29kapiteupr4whx2m6a344qzdvyuzpqytj2o9th8s98w6v8n6p6d2hvnd1lxddulmcxgyu9t3joxc76vfqx63t506g',
                name: 'z3nh8d9zl7hr6x3z69qw997q9z3ewn9oofx9ahi58ovzd6no0otvdpesp1b6ckjp8ia1vqq8bv5831qj87nzvpp9m2zw2m72ql40wkvhfjs17i122xfbnv94wmofka9ufz9vfhnslx898jfae7cp7cnq9srgz51e',
                flowHash: '3ke1016up959ezytbs0oxpq58qaf12h1r0ht7v3l',
                flowParty: 'eiy1l300a8lmvd6tj99gmvwunvk5es9hl03udzfyiaj9iswp22upaogr2cupv8srnqkg0869k93h9mq53768x6u2dl1qz8ytcptwnniv1hnn4tu379djcj52eixmsdnp442l3ltc3geylqho8i71r0l7pv14uqf9',
                flowComponent: 'ui0zdd9e2q350e5arvn92xg88n7cy7kfy06wvglkz6fto0qcxrc8mz1nq2irsljdqngfl61eykhhzca041sn2yvktcetiiz89mdeaql3zlwmqd3fl7z0xaklj8lsbdfkx33frqzybce594i1skts7ipjzhd00pyu',
                flowInterfaceName: 'saiwhfyx2jhhab4irtunosjw582k12l6oky463f3lio6uyxrz3pyt05yo7islo4rmkkpku3x3v7g56alqdk11zp447qkm1rrsdfznx5e092w12bc731dnnmnwbuf16e7ethwcgzhj4b0jkd7xksyano31qkfp2lo',
                flowInterfaceNamespace: 'vcyayl46w5ih1sgf2a1lrzq6mqboi2vqwahxzpbiwv1xc3w8anob3n047k7siaa3llkkrk5ischke8gfkjygrpm9eaor5zfw5b0fv2inaj10jrog610pnlf7vp9yoak3ojzil6c370cdow8fb8e4zqdj49b4e137',
                version: 'kc55d81fszodfws4afdj',
                adapterType: 'p1as7f03b0wvknhi231o8a6nru0sspwg9vth2b0wk0o15zi142wnmx6uyybs',
                direction: 'RECEIVER',
                transportProtocol: '48rhm45kt0gry3bp4zz1zvqx197pb8gpm50byhg9cpdkhddebyctovxzscfu',
                messageProtocol: 'ozabidnfrhsouijomufgl1jx7213ae1uhcqpimng6ass80dlbjk7td6mm1ru',
                adapterEngineName: 'k2b9naqluj0qxsrip1pnlloqy9lpz7169ddu83udkf48r5z15djgtbas8ddu0c8d4z8kqfkma75r0xxig4fjlijr8i1dnv86uwk6av0b991lydfrsoyrjt7ll16hgs30jbp0l5eq0uxq97cvqfr3i0j93fur9qv1',
                url: 'qo5sgo82ql892bbs9r88akkr831p2t98f8qwe8xbamt9w0b43dc03bf166ihforxyxxni9px7j1btdbr64xdyl5jwryeu5wjuqrxy39q3a0519fhk6bkn29p18gycf0k0o6w4di8y486x9myql35k1cuwbiqe3q10hli6bha70bghif3srwtir9h5ffu5n89untvk0weos8nuj16ldf9jwls4874wjd2azs6susuiw4uwph6c0t7sxbyipk47iixbqiwxy24kfk8mzvn7etrfgj4f7h6xir239kzi3ye4sfcfxibpxwmv5wqmwn9p8ec',
                username: 'bodpifyh66fkr5jh5fdcz5domd16qouqzxdxoz7z4ka164hir7yib55fiwfl',
                remoteHost: 'p9qas2ezbbttizp744fdxllmm1vhrgfthaskt2dpipah5eaxcv2ncvfufi2relv45of7blxs6976mn4vry6qic9zd1ck4geukyjw8b4apfldmzhn1k9jfnq5ajpahc96rvd1bd32y82jzk95z5emopddst3x4lej',
                remotePort: 1094958474,
                directory: '0wrwhi9qgylaj9mhnynib623j3q3eq8kza44mc38ad72rfra2ns1e3be7lvz6x6yo9ib1944t77tzwi4c3gpdy8bktnb8sdu4jsti3i4hndxvhqjmq0150trp98tkwcn2fr8o6kzkkmfztz7r13c3qevtjjp4w6z5qnfw24v3zse2c39b5goxkb37x2b1mxs3oyun47gq1v88y0d5ies1ogcnsqt4zwz0lr6etlap6667hp2j51ihh4ikcbxi216cndfpb4lwojvldqmfdsw7o11gu5xdiow5lrdv8917zr321075c79r8lycsdtu2oumyi6n1jcjpdrlcjg0knp4ymgi830zlbbo8ho5hsk356pgp0236jumo8pk2o5d6tolwiy4wzwj6a3km8gezd0cqbqa7wys1ic9ax35ig2zxqgjnnn8orgz4dppu829alhd08qwxxi5l65j7exkkgxubzm6ykyuexwetu7p6y0r6cz8u0ta28l8h0zi0niml8o9cs5i7w2g1q5sm3s14ui95x4gbjbc0pr5a8cfbhfk9t4omorrqnvee6t4aq0nhb6way9wejaa6qvkbw1nn93pjel7qx38qx3qcp95prmvt9chwauhmuw40u0h23j21sh17ct1njovfw3onv8468fzp69k5rif9rx0u7ro9ymc7fj0g2yjxsalw1hwpd13yfhwrdbt32lou3dl0wxwhoi38wylb6ojk6u5pui1w5mjkl9ii6yc7k1upo55divwj4hhy4gdwumb1y34qfh9i8as7i6mi8kl508kyt0mnz8g8vv2xtbvhbi6milqt7k04da6sahfkhn1dvcajig0jep5uayfmhiomikw6cbvxodwa2bpx6j0hmf9jqu1ct395msild6n0etxqmpbc28lohbojzgjxeafe5npvbpjcb4mvqob020z7rjrqikhya1hrbegnmxxk585l8tq7eyfjcisrpsf2jrtarvcnz6o1mn2y0777wu8r26ruf6rpfy6gmt',
                fileSchema: 'uwqv0mrbx0bemd4m0jvu7gjq71rqdopy7su68ylfglgaupcgcvn4wcnsfoeg7dhjgjc9qikhtp2z34rep8ont3cffknu2le6dyf59xwxqvbxuot1pck3v1u269mfqwrdtlmqn1z2wyceaf8ver82cy9ybxg6ocvwjw4ce9vbtkjvdnhz3lsyrzvnf7mp846m5dn6xgaof9hd032cb4s56i8fgrterfg1yj3xjt0r7uh0nfh1by974zjzbuaqyjp25f6vb98ltgfs8j0jg9ghdtn6byb2p77oxcjlpsd60kg9rju6e0nkttblalgmcq5p1e21i2s50hys48xcace25lu276q0ad6fr2rszc0q2pltglnymz0yfdkm44ekk5iifw7b499w8aqw5xqazm7dyb5fjhwi7hyfcusrty30wqtw8en592t9dbfqy7g5938cbl09f5fa49keqkcp3l9u8tmtb9wl1xxrmqn1lywqt8acqhrcj2nitihtu4ip7kkz2erl163ipslatxe9pp4otsqou8fq1r7o9vnpfcr0wu5liciryxi5fjnyartk0mvl47aaahy562urjuqkhnid0ed8pp5p1hardkezo1kmne3m4k3w9v83qbsv7wcj1k3c2e5ftwtv6rl9kbyb1asg4459yzf2ffrajolhcp07v80el34cr6g59dqfxpxq0tdqyq91t86qpfwd23gbbce6teqwgm7p9bvqke49mma44fai1pcfbpyj3v8pumqtenbz74i5ekyazk1djymscgyh2971pvkk2x6o7ygm52ue0v4twr5koycda1j4wy1fddtrt3pozutcx1nmkzf0flx8c38240lvj7kaxi6yledpzat1v0655it72fwxurngh3wdr1uqhm97gegg2jq6w01faa0r2gvn38hsd5fuixgym829t6f8g78xc82le5ac3c1sv1n59n0lm3mgwlfy65z1r5nzb5e2jcicca4mecfu2x3zbj8xe1zow0a0fr6t7hwf',
                proxyHost: 'kf0gocq76hoyy7ipqdyeh6v8uly6f56awwiujby2y0ixhkul76i37vfcasu2',
                proxyPort: 7458078649,
                destination: 'qzywi57hren2mq32rtv96mcf6qglrbz0fw0iy7ubzoryrvapz9ewfrhqelxopc9ql50ihorl1f0hlo3wkisawgz60hodwq1704oiwiatj0ac4ugh7gete6v17kdkjq97rg6gzpptbdrs7bgkbhomxs0zop325jva',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hc0cm9n6riz9a5c0fiypzlnmdpos9w1cdgt92y5owr29ru7o6y3tk4lpkritqk5ikekttcdl2ef59km636dp3g1q74vjog3obyuozd9xzquqzna2z57pqcbftxakfg9ogmcscmb5v953epljifyy02mckl2vkzo6',
                responsibleUserAccountName: '5z6e95e2cn2lnqlfen0p',
                lastChangeUserAccount: 's375u6xl9e7i6ys2lv1r',
                lastChangedAt: '2020-08-30 20:38:23',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'c2sknyxg9x48h9riwdkzlvfiz1ripfu9rnb4j53k',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '87lvycdld352zgdwfjbbksgnds773hp6vc24usod9pj746b0kh',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'exzzpocrx9dehclrw8gu8',
                party: '2wwupzvyxbmg0bef30yzr196fvj7hqcyw8k2vpe98jc1twmmheluaaod0tyyet230tkvo6pb64u22e1u02132vyj5fyxakjh6rl4p25r2u3oh4vrp7rx1w01yccmxzwc4k3rps863enosins02e2w2gu8e2e9lky',
                component: 'smyq2h534h4glp2w41q3auwmlj74kq2gov6nif268lfqnv8cqwqtnnmhnxfwz73w8p9dg3sbyh31qtuhrebgeu3iee8g8qfgnouxt5k4bo511vwzhgygt6vel9wiywiy7luh26gfnuoz75fbr12e1emkklxaegsx',
                name: '5v96t18cidp49dboslny0qgubm61rnr2egprkne5g32lwj8rwgfy8kk4hwdaeybu8pya0ip2u3ooopnzp0p2biu4yr6by1u7w53tm24asnp89lml2xh7gs4b6k5xif6ek2sf4yixonmy8aj340xpvbpax9pq370c',
                flowHash: '3ealgpvag8foicu22zkgxqfht7lmcitt9eret7fe',
                flowParty: 'a5batwsmlmuijxxhr2c0bm2orzkl3y33n0e2s89n63crh8sireewnm6hpev6ub1kduwy11g4zhgxs30v9d7i1i6e3uzo96fqvwivlryud6tyxan03z8rhyu27z7kvvv1rolyc1d8fyc5dycpwlwah5es71378idq',
                flowComponent: 'r2lx0ck0kdmr7iqgpzmtzoq5p482g9500b90jfj7w5e8h50syybja5z74e1taj3u02114derktahomx70cuslc4msfpq8c196w9n767l5p636vxen8x1avucm8a36gk53hzejgl815bel2z0qmfoi8cld0qhjcw6',
                flowInterfaceName: 'fcytmmht2onl27wbah731f4hlyhqh5akg177wfmno8mpt39p4f22sgt4i4rf4s3ub22oawyj7v33btx5c6d1g2cvgt5nr748xk3qibc0ik6bu5058zbq8zjmbybx6qag6asm6ivicn6mmk3twegfze3vqakt4tgq',
                flowInterfaceNamespace: '1xnkccchahpynycbindalkfdy9yse29clstjlti6f09n4q04zd759i8tvvqeetdjieg96e4nvec030pcf0mcezrmgj8dhd9ljtasf44a4i8cd5h76ow9bygahtot2hw2yixb8ayv9c8sug10vve8fiw7m9s3o9ky',
                version: '6gfq2txvtrt1toigxnfy',
                adapterType: '0nvbma8n79rg6jvtgg5kkj1vu0qfodlhyfodzix6sm13zy0ggfb4lm0zw0df',
                direction: 'RECEIVER',
                transportProtocol: '6f9yl080sdwmzeyk9xmhqzvuggjkn0f583c18o3ntniz1o7xqk5lc8nioans',
                messageProtocol: '8qlszcyuq6170xmavxh5tlxa6esykdko8n5k2fdy00ivwotq9qrcc7jfp9ha',
                adapterEngineName: 'bz5i2l7ctbk4oy5nx6xdc03fewovsmaglbg8q27silnhkosc03s4fqo5zjkstye6sisd5hmhnvd6p2ikcfp430pj1wt3yj0cc33fca092w4kvhmf0sle71c225ogry0crax24u49me6vj0slmfkitoewph1kqz4x',
                url: '9va2a4irer8ahjun9cpkaf4mv80hr3yy7a6iw1akw2nd0xgaz3rpmm9xzk3680j0va3wqsa3bbapi24d1psajlqe16k2c55h75nfvqtyc5r2uyztmexm56puw4h2idvnqeoooepik4v4two6g0wd16lszf6ph8870hbf4ygjvbeqvv7tanvc61j9h4f5uqwcdrz26te47is7lw4llu6nyligi4fnb7vwe69pwfgcejy50yyefubxmvbr15facjc674h20d0u72o0afnzbcc9zsgy23szvrxq4g9om57857vtv77z0j5v0u9rdhh8ezim',
                username: 'zb5g4qj04lhg0qynboj189cz619sxg4rw3b79bx97t7ih1k6w8trr3uz433h',
                remoteHost: 'vazyu07bq5h6binf7rfydlebmqtj9nr6bbobaz86rgkeengcdktj04o108i9h3czfh6ua5k4y1arlvdupl8hcu8qug0lggurxf5ahecaoz2qixucdnyflf9vr9ng7djwcd080w7am1f97l6at1tikqxdk9r9gi79',
                remotePort: 8638907289,
                directory: '2g007b9b3cpky2fb7bu64unwvlmxb5m5hwd4bcee1inukjkyk9ozudjk4wk0d3tofp9k70ulee3unm9fiv5d08jwzgvbqnxwevyz21drbk45wtk423a8vxcvrdf255tvk6z9hsqt89d9cmw83vcykypbql99q7fwe0kj2dskww3zj3jtx3miqpz8jbng5pra4x5w5fgm5yzbts9mlplnsu7p3hzlbtsjdg0amf34yzv5h6bre93wk2e44zstybvhz4qhmzghhoomzluyd6tluihi0l79uj2s8cgacwfb9d0vg0zkxifa4e5yb7akgyvzy4n4aht105sbp7bnl9hfhlwmqjyoprzjzypx5ura90bwc1g2ltjwtbrsg8mszjzlftzqmrfe890m11cvkj5pp1zmg62c3xyd9tv139j1wdize0g1mphraf6ssynfheos0lua66he3629qcqkmxeg399umxxb2rfoa3qmen718jzrjk5pbs1h0e98ho9ziuwbwtwxt7ebo3mv10707afkojuiy93hg0g8c6hbjqvlq4iznsi967ehwb8w008d7za76rmccidlq0a5hp7q1am36rsgpxgq4y693onzgsadpwis318jvazcfyoikzgv1qu86ml2335717c470v9oz75bl9tll7vbicmsnxaks9u94dp4d6llgreyw8b1aquiizrrr4srht4b6nz0fk9d4cjipdiqm24ymw1jbtawzbqlwv62ph65xrhd6q9swq60321wahab5lqilpx20b9ldk5uznnx4pfy03rzolz4nkchoio774g8y2g19kuw8h5y89e2xrt62bzr7itgtg24kn3k1awptq2p7u6q4uya2342dkwwkgsmttdhlzjb8hdlfdom0kriyh5tsl6a65ax1b206oxv2phwyjct6t5cxdlz6ryygf2bfphgdgcgrnu5pkh1c03albjrxbne3q7spdr3jeczxpqgh0rivg2nn0vy6l60whpenbn7cwwem2cdjoc',
                fileSchema: 'u88x3s5jlufc5tf92ws13njrom6f6e0v3ew1efx8ygcd3xervgegqff8pubrmohvh5jgtxsypoip5ufrf7kxqf9n87tberxxyzs8egynju5kt2yekshb1eix7l82az6u44q7sz70bp6yhm90puc92ia3t1n7kjer71wazx2vyzi36lkrhgz0g1ahwwbl5urr5kfcts409tabd2yqv2387ap7tezez7w1v65ke9vbgpkkidvsgltr05tqwdau7l85jmni07xp1aurmdefhmgfnu8gbrcb5h7r1h1hsuwgeowasyqirasts0rh1chl2drhvfb12bh0i7xf2dn9nuc47kmw8aadvauai40nx7bx3dhpkt51ovz2e85h97f8c125kfgxy5f51mlducjdwnelfqrco9nt2igrx9xekcuq8pscxzeqjr5mk8ji1kkj7pkhazb9w4mazkt008gvwvq2fu69dh42wwrbpz0fcrm3o0axbqz4mqj5lxo7i0c03ocep79rdznf212qg5zopijg1ea3h6h1j8ojeu8juo9ds8lglno9nrii0uaiptk7v8qd35iri8zhtt8yg5augzp21ndhzgjicapaapz6ebr9xehdy2m44sqtp07htauyya6avjo81vd1t2hmjyl4nqzxhpu7oq7i5nhemly3a3agsw8ftl2ll5mnc3dhplzpt6hnqxw3htscqkqntuv4mhlq8wdvs9irx0zv3tkghcv86pegaaj379co3r2aif4d2quj36gyqp8pmnvknl9m16s01qgj17qoey0gw8k2hokre2dgofcferhxmanx16mo9aveu73io9ptzkmivunyqwl3stuik807jdjkyo6nwflloreif6lzfgnv62ait0ow8qwui38zpv1p2ckydvujx9rty5j2ftbwfhtcqaxubfiq9vup5ehs2dws86n1fvp6knvvuik6faj9unmk77aji3xosc33w8d4tjlau6uibj0jzie46l44fvh2dfi3qne36siw',
                proxyHost: '69mmqq327a6xy2a9c8iczsyqzizj64x09yt1etbyuvwu0fegi35mt5gr6xzu',
                proxyPort: 6729283751,
                destination: 'sxwvtdtgjkgehhg8n57wg68smou2vuifsfwkcb9pyvthx1jpch8b45q0rn9lo9xxvz6a6fn5jmt38l0f7xfarxu7tu3mo0q7lck21yjb9u64olc9qw6cinpohdwh49nfh5e26sgr9o4goa5yz919ikgajf89wxfz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p2spsvygh0a1bfcj1fwn2ykpf0leawlq60n3o29vsvbckdtrnsvvk0zv7q1icif7b50kz9mqgb8suzca0dhxkc9avgeppth1apu3m4nj722u2mwaiw7dvthdnw3ks1j3prtwofbpsxmjeiyy04mq3hjvnldu2m02',
                responsibleUserAccountName: 'libpeokb8kff4qlb0vk5',
                lastChangeUserAccount: 'cyyx4zdyevad1n9rpvuk',
                lastChangedAt: '2020-08-31 02:40:27',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'lgwtvw5l7hxtgrpdjl8o5ktcl7cpc9sy7isdoxil',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'iaflziaurfo0xnq2fqfw32yqujjufgdrklhxmbh1k9oaouus44',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '9z6sdbtxp5p8zie0j5gr',
                party: '8a87z5iy3z2qa76j76u29jyps0suc0i37r9epx7zkfvm03p44mla3ewjggbkmfnlibb7npk8qt3ylh3mrbs8sej799pphswej7524tn0u6a3bm0h64gorww4ntasrqtkoigb6l5zbwuyu1c7943xhf1zuqlaf6d5n',
                component: '27h2zkc0wed6saf08tt2dgdap9cghwi9pcjg8gbkaawcldr741lrbeyzv621928s5iry6yla4dgps3acm34ugpvaah3jrpnp2b3b3qwnpgjic1vz7tokz0006rgt18rlxmjo3f9ix741z6ufkbk9y8bymyhjrsgu',
                name: 'aa7njto4zj7k9h18x979ovoob95ra1bpi0p6oq0vvohksywt894hoesrao10f0qh3y8ymqwuwy0gfr6b8cbg4t8cvn22t3alwuib82brge02s9mgpdpouck0in0035sf20juoacimkwtnacnnfbrrl5cq3iw8dq4',
                flowHash: 'reeh1xcqymy9ujpj7qmkyt3ihxio25d1wcnqu41i',
                flowParty: 'ep026rra61t3v5xmiwtln4c9yhm98gv0c1f4613yq9qkhazzxfziu0qt2bp8n4qauxif8viwfruavqv2eiwt11oycne33gggvw71hnry46chr6naeswuapo6k8ajvhap3sqdniuuzv2bgm5g2ahw19v7xfdwky1f',
                flowComponent: 'osi5skfbvxca89e3fqwcz38rye3omttrtk2gldfyqrl1umznpqlnqn10n9jc8nchkor96qglt765shtatzi1a1wp3nhq2amgilpgf385lbnv3xmalyi24bb47wu3oul5d544ci57jwo747fqok2rvjqfwaw9l3r0',
                flowInterfaceName: 't0bnfwhe687zyzf9el3t2tf6xmohmnxfbtc6emon75h24lkubppbjhki1ium225sbfmrtmeyezf99dyp856x3cdsz7i4j4caoqofi6gnt76cpmdoj1cerybyfqyogchjloeu9g1y6t3unkepcctnkmy4kajvjl6o',
                flowInterfaceNamespace: 'yaeu3rhnquihs0jtltmwrq3rx1sj962zcgz4zy16u7c3yi9omy50bjrwjvscmpeup1w6mbxq0i4jr5vc0y1cockr9doo6x1lbu65c6kbfcx3jzilqz6rn6o5dw498cx6ncvf644nbw8u27n2ojjs0hfbi2wyh776',
                version: 'lrftbneuesgk9k04oaq0',
                adapterType: 'ttnxr6xipgxvz14u0wdgain4z6lds6ccl3day8q7b9q4xyy2crrxmgw9yt8l',
                direction: 'SENDER',
                transportProtocol: 'h3b014wifku0vutrr4lvmrgl2g0lo6ixpm89m1lem0wxhdckbb4553axpv29',
                messageProtocol: 'gbj9uog6z8n1yt9nd4f96ei6sfdg3r1ols9603nenteuf2mgkty1eg29nks3',
                adapterEngineName: 'eyy0b1heo9erhk2avrid6i2r0739egsqw7z30zjf47hc425ihsczmn0brxs4n91idvdpqgrk7kql3e7dzf86wf9clhy0l9nwldyrfnyr5p7d05q5jez0z7xt11i4sdsfx7dp85qi8ncr5ie1hyuu79pt9yld4vgm',
                url: '2ypli7oqhbejeem512nmouuiqic09faqktecwhksdht3yhox3brjnnxdz25qia5vhfuleaunotde2uvgj2ysk6uqss75yzpve9thxiri8vqg4hx8svefnd6kurabnf68m1pw55swb3q54rp3z34jcg59pvotvt3mqoigmbblculx1hr8xjwu3k712jge395akeukby0mbh34tl0fqbzrkn1wwj8f4fel9h7g342jc97q5aq4inmqp5735lyj9kt27s5h919zybo5v0y6e3ah4eqdcjpnzs6hdxaz6ef9rxoqvxy76k7ez8qzgktxxci6',
                username: 'y0h6jx8vcy6rmszfrkwqdtmhbyow4m4xlg6sd8limcn23io9z5vdkwa3n8y4',
                remoteHost: 'qbxwg987l45wmfdgob92vwm119bqk22dr2yfc7vds7ltl8b6dip8ke0hd8i65j13copck6hdchxgonq79146hj1tc33r6tzo7fi6obu4adshbzi4ls6y41d3o7d5b491ya0uf26uvktns7hsth5n1es65pfeqa9t',
                remotePort: 2926418854,
                directory: 'mmnf1v6m4gg4z1uaq3a488kmh1fvptynud9ure76daa2l13yzc8q58hut4shsfdcio992mm3jpr0bduxn5vlqq44z1x7lsqs3wmratgrn4ya9fv1wz13jho17d19dh4njl7gzr28mdc9bypk8zpef7tjomkhvsb0nbedelhhtwwakhod1sn3z2bjd3ze665c575shytsuzq9j5njw28dxpjf7od70coju1qdq0h2fmtroxiwxnh9hjag5otcayg8y0ql1mnidb5xc6bu0du3ovurlfb96wq7u2mwn5sp5fzjctx39fpj5xc6xzw951w654dm2ebcbnps302zdt5hw4gw5mvpsidd09lby5enzfhpqxb9sh73hjomr91jjv410qnrw2yi160b992wfb1luqsbdxucq2zlzuswpddnr40gr478682cf6lcjhg163nul48ox7fmmycfjh73ssy1pvw1q58iiakd3hoyk4vguhvy7wl6hy1y1cvtekjqvspuopakok75gktvzxorpuiatzaflxzkoh5q2r7c5c2flnnevsdjiefi1t2seil5rjaugamkttdak8q78hdvk5wdd90yw7dyt6zebxh5mex909hbm91nre1xi98l7t3yjtlibfh2qysybeuct7vzdtycu38jm9k5cekmznfkp45o83ieoy7r01i4hdhvxgfeekw3p5sl2q8liypeggxli3zgiz4os0da83xfbo218ckum1s75xbp6i14auwfioh7etvwm7u9ltqj9pxy1ygv5pz6c7d4nbfqk1e55odnty7ngia06f6ne6fhpivfue0dh2pjq8va0ze8woaj6hu5fgk2jhcu24tqag4702yhhvg3im3m1tyj0wenmm1ismjxcourkallxxmhgc7r4swtilr84qc3meku9cx7rh1hwbcsjzhz3h7665ermfkimwvl7yzelbsfw0qlc5dqhq3o0pf93u4nbb3fyqa00mf6cq9usm12yi16mwqywa0t47c6ajto',
                fileSchema: '9qkmehyxuzvf9pbhalakf2v6bgt6wapmlzawg6fiq2by20r9sr2nw9ztv7v5fi3ci425ucap05nyrsxr7lkcsv8mab7i44rg8akvwod030pcwhnondr6zdmxsfxpir2exjjwnyen5sbwqjmdy2mmaqsq09jvwkflgdzsfkez6c7ktd6qknkdextjwn8cufe5iq9y1t0v3cdwklog8xz0go0yec4uhrd3xprwz97efxbloz8nmnipciqguvh9kxqw8pliwwe1obblua6qq2ayg4vfmnzdzqiy9r1t47df64d081zqqkzf14g21w3g2lkzw4i8870agi3khzrlmzs9kti8bcvbaz3q9ocys8j1i5xocmt3ljcdzlqopd8mvdizadjh2l5765pc7cy9tdqw3mizr5ewg3vqjqrozqjbwpyddq8coku4qit6l8dbmjddmpt4mak5aslc2odkg7obag3kwokwki6bl0ounng5hwzy34og95mksolzzqopnmagjrwdyk5dxp0f6f0z35ptix5wian6rvoun3fueegu9qe71np4eklbztkd9d3oxvzpxkdhhs03optht3qoh5bdg6lxxvvnq4vjrlgscpgtu0toa7zics64yujub3islumpqjj6opmb6l9ax6ehn20crclsouvajve3wywr66jvr5mrq8sd3n30y4nbof50it6wjz5ox4v2o30i0gibxds4788fyi3ht64zvarbqbcqvjjdk2pg2o5i74ecpcqkav38gojxyz6874cy2bef1v3ycti0ukkexuw6t8g4n2b6mc7588undxpy7mucv4kuxi42k31nt3znu51730o0rsq8rz6ow76punglh8qdprf9fpb0wret0c311qe7wioa4xx2utgvb2qc84qboja5fex2rghxz7poxa7r6wlz6uqsw0hgu4x6hlk3z0ysgprakmugotgmdaeg4k5b2ub1d9ogyrg8owieucbjj9xbv3ey2m57xmk8mhpx6v7hij776yho',
                proxyHost: 'oqyakem4jsifgrau7skpvhd3i9akgas8p9sjecfqnqhtdlx220gel00u51qv',
                proxyPort: 1980125875,
                destination: '4o4qwkjzgl72m3a31m5k872aqce7wovv6v82uu9z8rj8hdtv249yz3kzs3b1i57731x9ne9j8bl4o6p3hcozv912um9lyajh3e548k4fjabs2fkrpsn1rhyw0vtsontae81dhhy2jbuj0850x88whfl153ow8swj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j6xaiz7iohljq5fm4gv7v65tqwe1c90kj6sz27czzeurfji9b4xlthanmbrzgvh3o7g7ohhiuofae2lsgocpcwru3dzxu1hgpzxf3685mzemcf4puhf50rlwiybp4tpo7ds1rnn1wg38tgbp6njthi0gkflk82y8',
                responsibleUserAccountName: '5dqpel151p12mj4b8fg0',
                lastChangeUserAccount: '6lgh9tf79mromwlac8sv',
                lastChangedAt: '2020-08-31 08:03:58',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'nzaf8oy7ggdh3s81i3yaatxagwal8zi3yxhbhzvc',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'm25fxlb9q42tyxbmik2uqr6r7r68qe1g3fi2xsxq1z8awq1b3l',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '9j8wwgz5x1yufdrflm2d',
                party: 'k2dwrq33dini479qhkfujwvagbm5ztersm0mfp2atv9fqalqbrcsh37qtlazdm2fn6l7sl054bnvo3j26mo5skfda5661ns6jayqlm0w1zqdwuv8td438t0hjbs8u6dwxysgl6q8m1lw0osp2p898iusizqoa9co',
                component: '3uyjdbd71dz5vpnzc54a03pav9inl059xxzewl8ae2sjn15mpi01rzxnf5kqd8ws1xush1jz7ouhcgeaidmw0dshakososatw56u6nb82r274598i0zqkqzulz87w6c76juy551ron1ffque1q2mzaxc37bwby5vn',
                name: '9w7s0zzu7d8t9ejqhqxd3vx372o03l4siyu27p93kfq85nngieryqd8y85vf5bczrhlswnd6jugn6uffbf75hyieh7su3orcljk67u9wedy8llf1vgpyup9gxguop54uraf18x5vscxxyu9ewnq57n89bo4ylhlg',
                flowHash: 'n0tb1ij7hia3bn6i1zza9n87tf20780lmlxtx7et',
                flowParty: 'pbm8gnep9zxqhucow5y1v9nw6e13rp2665mkdqa4uh92llb129p1jdhmyr7a88d2cpf4mqnfjwp70bq8szmavacmi8qtzvl305a8xs64v2ix9swhu4zw5y830ykzkpn22xybj0rjd25w2cxiih573o9iepwq7syr',
                flowComponent: 'al27o8mip9gw6r61vqtllsy5s4yi8795smtuy09mhuozb0nc2zufgmtkjl9103jefhtd3yn1s9d2atncy4s7d1sexzt5ub90rx1e9t5lxwgylnzt8mh1gznzmhxgvsg4piyzrv1g2ywznfd2ny7y2gqa7ovf97vc',
                flowInterfaceName: 'ks6r79b2h01dgdus26ig083q7fzq74ra0e9eq9qs62z4m1w5er08p0udcmk0lv6w7daf0ry4uo3jbtmx7xxl154a0cdx4c1xgt184yht1jw0qm7uabx7gwoeqx888uam30rgj4rwf0jy2ykyaqvx92snto1htut1',
                flowInterfaceNamespace: '3131bb5l2lx4a00ycojqwfazerjc59wz91b90ls7bq4s8ui7jodkh8bhqblchcwzjmz3y1bpjpvm4cdbjadc3so15hrlck16a1hm9bhkbdp14u7w3f9ixq510r6lva4o38a370dnkf3gsdgcluqn3qxpqs0bi8rb',
                version: 'jcmthg9tzfqy02x9y5yj',
                adapterType: 'j0lp0llmttrmmlhn5z4nyglbino3yu8jhei8jmqoc0njojvyn1oahbde5hlg',
                direction: 'RECEIVER',
                transportProtocol: 't74qliz2vnl0ymfv050uuvj1r4vphfq5iwtwwh26e46r9368lhrcqkiqv6a2',
                messageProtocol: 'pkuc3prd4g5ywx3zw7s3x2lowd14biqhk3rip2vyxypqnepcn45iw8aoya0u',
                adapterEngineName: 'uzqkpfpaldgj1mawr6c7xfmuswcjp88fe3hywetwgbdqznpkr0kn9bw18y0ahd5kyfl1mmf9nifrvoscgajuwrnwi3ilm1ze6egh3uw938u91bfn3umoajaw7zgmuf4l3vq6wfyippw9b9fyxbmbttsyf3e7rqr2',
                url: 'v7k8g6jqtr1pda23oqbn4e5a2m5hjjc3cgi0m8db80eis40njlsoqhjmw7w1mlp0mvyo656dxytzwe11y9t1njuy4rgqm60qj8f16phjw00qk49syzruibu76g7i2vpk4nd3qdrtrh3qhitxhmhwlc1usv9gq0zpu6yi1bpk52skx2wwfvd26cibxj1kv07v3jnrnv1qx58g4oor4h4igp4cdau3s2v695c0a469ivv96js2l9bw3z8wotgzn7ql2mfw1afas9t8y2lb9t7tpfsqu83jfbia0c00hot8u3ln4y0rvkt5ysmfgdqvj539',
                username: '744f7by9tgju7ed1tfg7lroey38e66d5xk8wcqtszu0y44d1d032lwwrjk8q',
                remoteHost: 'tnltn9dz66glt2nfxslu2vvcrkn2f0wiau81uoupg132enul13vngg7rizlec2y8w3ipv9xnfy5o8yekw9zq1qmesct4rhig0h6c5eqtt4s0229ykkk9p7chn7bc46y6i5p685h5lougt5tzommmkxkd2w4ci30r',
                remotePort: 1846542948,
                directory: '1w9ttr0eelptdgb5qji03maobwnw8tc95os84saiwfgrlp03lujjqe751n8r1v3t0i8z4qwk8558dhl0780198fxll9wdnqnxye7s6cn2c6k9p7dzc366g2ke500rhemfwuwombrdcj0uhan4zm8h61jduo0i6m6kooyy54hal5qky09o04gnb2j5jvk6zs5ii3jkcb9qm82w3kn42kdw92aye81enswbs6uqtqkopyd69bf9ukrtftf07pt4ed2ifplepztkifr4zjz8q3h2tw4c6wlpmrphshkk6w63yp9smnjcwf1udaemqmv2vst0i6u9mthnkupi5rovn47mkmb3x5jmpm99gbsk9dhqly4mf1013j2lylgmi9nlesqlfbn3jvo6sxv2ty44uxjoxyjl7lv9y3fy6q1iwjn0j6v7s6kmx0yw9p3r276yt505sqmfome09r225xi6saaeefmzmsqd90ck0ngsg3k03imeco2c1wd567i401qsjcj6tyy3y6tcdenn5rm21dysqfdvd18lqkqu62wm2ug32v5ltpclc2hn99msncos9ys5wq5997dr4k6oio2lak90uuwlahf7zwqxr27kg548a8lzw4pydfif5pikpzyvftfwa13l92iibj4ylxnk7fo1419tks6i9upb9thgnqyj3ezcfeipkvnksfl3dw4hi0bgcidl6nr9cf9kvsooceo3drju8yhy7mgrqzpffiid0hksl9nb4x5arqkwhiwvanrf56yjpao9geapnmxpjvjsuampw0yc2esh6zr816t4nebz5rwccyt8brzcgrjuklyukset82cjsl7k8vo6j9jidvdixbcpk975phux6h0y9epgjsow6yu3n49lo8tfumhypxvdompkd9iz3pqqbozn0pgec5xw3wyfv5swa35vwh9bn48q7dtnig6paj1c1a5rpf1l2tmaa97ggn3w1qmjtk3exfslojy3lar8h6e9otp9fv84xz8uju937tq6cg3',
                fileSchema: 'o017i0pu3u4224wvcvczffyrveglyky12f5kudnbfkd9bc6581as86nygcik95j41w2l9b0dvtl2ke0lk4ehvrro970ukz7c4qupocwaj85y7xbfnikxnnx3cq93dgtf5c7syymn2ay40t66zm7gckkxrd31jys4swl0pjd2vmm8k7ke9k0nyrmpy8nnl4ue14ybq2tvdi2ihwe0xtydt6nioazvy3v674v51b8zys9ah07q5r6gpy6a4ognb9sqbpbr1vt9f9ei5l9enkstm8siy0rxhr969e1qtfurbda1sa0jf4xt8fbwcvli29ju8vk7y23g3fl70im9twgvw9x6edl783k9qdw4rye8ndq6pcmtuuixlq9blmwdqmte2m5kpwfz4h090vpyp7bcauev7cutibpm78lcrludxf3mmo28n32fgxz69ajqon1t7nf82caojdb8rxv8r3knlqrym9pn4idgxonyvngp64ijfi4maqx8z5hr9lsvlj99h13h0xob4kvgc4hk5roaququry7twbxg6v311j6f8vp7ejaeo9xl3pcswz9mynnts8kcu9x833qstngxjhme3coy9d1v1oms0j6qth0c5od8ybu2m9nl1wpepwxs53ltaidaqqs07dfo3uq8w2lr4trv13j628wp23r1lwlamzyv5y64ik1h1gjy8ktmpcge911zmf5ati5gbq6gvr047byqdjdxawa3gs8pgzwav553l2jtrdxt4xrjq77wh64logm2dizxgnimk3tw88uuuz80cg01pssfgic37jahfr95cfe52gx81vb232r7929b2lecdie1suif8x0fhc7g9dkeplkl6m5va6ermckh706ow320a5qen764rlaemfra8616og1q1u74privm3p1v4cmktarbdp1a901aow6zkonxtdvhyv8zqev0ng6dkx0dcgpshqr2kyakzn86zoh1mwimwf8sgkc3o9iv8apbx2dfathnw1fw6z7tzokhk7r',
                proxyHost: 'sjutvc975bhc4lvb2f2gg5bitwyzkkow9ah0m5nxknq3y32bemtd240x7ai6',
                proxyPort: 2259887951,
                destination: 'po658fkqghggsa1r35lhqndxaqsu3c9v4majazhk8m7gw1xqx1wqcwb0tz19o1m9nw02tihgcm0h5dflvua3rqupywwmg4ncevvspx3ls3hvlkiz6a7xxp8iqzuf7lnenpkvmgljkgnoj2lu6j1cfue3mebwo3p4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1c3t3u9cxv5ht33v8ha45fduhomb9k5wzffb0jpievbczblf3c0ijby01xptk9cicauv3uol4895dy3wjyjs447gl25jthvgbplv4h9zfk4kjom2nrqnv3cfdv9uv1nwkv82c8mdokacjfquh6caxlsb2u3cmj9o',
                responsibleUserAccountName: '2kchv26hwem4acv0pa4z',
                lastChangeUserAccount: 'f4drw8j6454e2ci1xete',
                lastChangedAt: '2020-08-30 16:15:32',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'k2rykbg0q0jx88ys85cj26oorkza8eayko6x0o00',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'ee07wrl44kcvzgau70mn62o79qexmz3309oigeqqrvzqj5lc4r',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'l31l2v6jaekph9hpgc6y',
                party: '0f1wn26jlnpcvjmxsepuc0y4jxgwpmftjpbwsko4vhq9icqm5u9wf02ocr5iqdaeu05rwkoww37m3r50o3089vbueub8uhx05vsl5f9affoidbsc0pyf73l4a07yp27xralz9mit95vwf50ppkrpxqsxz1sayt6m',
                component: 'e5cvu2sb3mm1jcqbckutxsv36jm5vtobmg7owxodrafou4b5yjfwiclhrgkyhr2s2s217mb4bwmdzxhbv2a7muo9ztmszc5b2d1lckc2xl0gq16mi1ehwczu9copyphch3ygebvv8n17mj1y5ix9s8c6ph0bks3o',
                name: '1mxbmqoqm1arq9c5obk543fy5mlgdiweybnj33jwet0l5hp36qhyy6asx45tspp3zp9ss3hnr3x6zh7nz4o5jw8kyre4fmcphsw97ydwmrgfyjhlan346ni47m3zvbzim7lyuuu3bdyq8w2dfepch65xoz68jc0tv',
                flowHash: 'axrn6d7rdv63k7lqwn2rum7pqsdn724tg7mfgbpj',
                flowParty: '87by22l2wa7hwrcbrzo0w3hwdl8qkwnrowol26652cbiz5zq07mp9efapy9uri4su0ongqa8ij7l38ntn3nl3d1h3i2spxdmtj8yal2a90l5jzrd5dcmcto2le4pf0sjom0wkxyn3b3yb7o48dn5qw0ormymyfdo',
                flowComponent: '7vchkspb7me74aqqmfd4dqgxgmiim0igpxx2jrkz087bq03j2fwy3k8f65ok1yy99e4619qs7lcd7zo99iay75ww4xekbw8il18cyqqzhfy2gxcctcazg0lec8w5zcukfgkpm0vco7ou0aneqxivuy9wg770oaip',
                flowInterfaceName: 'yqhxj1neuyr1jgizmafsgie3btftyen79licndp1207mqslhc7igq75f3bo55zl08umfdj8iutg8p47ao7z01h1mx61pt10behtp43upbzkqmuyzii7uagrngcj11bqutdk5p1h9r6y3ketxa9ku0ap0kmtn89ok',
                flowInterfaceNamespace: 'xz91kamqp4fo7hzoc6ahw4j9ouafrta01ugd0ymtx8zstedoenp996aijtp1eay78lg2xdv8bwg6kf62f1bp4luylg5i8e2q3o9kcvt0hq6qf9ydz93s8oimxn9u1crhtwz4owqeltsn9f5pbgc0lc0oshhyrk5g',
                version: 'zazkb0v8vjyy32dgxgfi',
                adapterType: '7k6mr5o9047k4awjj1a1dqutvaxlz7c2k2keofrkzz29qpe62i2dqobb32ww',
                direction: 'RECEIVER',
                transportProtocol: 'gc918ofcajsb1ko4nhnxjqtqj4s8eoeq1c96kfkbugsvkz3sw8671j1ffji8',
                messageProtocol: 'z77w3gpsclew1j305iys4w9svrnea9pc096ig2lu5euhkeja6ubcqixc8pnx',
                adapterEngineName: '95gvco5d5hf5v57mwlrg0jzd5m0jazqz0y76g3uxr7porbxt3wa0osamoylogixtsukaeai37jfdqi2kw2msxvd8bgwau1z7wsm5b7bo2eu0vlk3c3jtcgntycskxlqi7k5l7ls9yw216btm4ywd7fng62avj8qk',
                url: '1k8anyu8on7izbhcdfvdkidu1gxrnz0cu7qotebjzd1kbtj9sm0k1v8b3tto6mcqq5ayn25adxjb56b2umz87q9yxgiq8clu3dkb0xhmrfnt16mu4d9ov4winzl4842672ohjzvxqf7i0jf94j2s1fy4zsg4g0v73nopiieenl01qmzeq0r7vv2t4s54h5fbbg9oynnsmuh7gaocd4mgsdcl1zifbdqjwvq40ozpx9whbl7k6bjxiednsnwrx5yvgk2tef8ze8hrs0zafko80em034widfsthl2uu1k1x0fmjvabjs2olq17ql7jevca',
                username: '219qrnff48gvqdybibdlyu24o6e9tphedtq9x8zbvtrdk9w6ui9c0xj4fks4',
                remoteHost: '3v9m7hnrbaghtmwde8v57gavs01zehvjy30eunosunz97q0fvyfh2ofm3u5nkfp1gtny1gpqfsb6xfggl8tp3a99uiu2y5o4xlk9t6tvoikz2p5z93zr4ivo2kcj9ljw97zkmchet9v9yjl3t3z08hv0eq9kxuxt',
                remotePort: 2188942665,
                directory: '1yxrke9vkn7ksadi2046k6cah1xsnhuo10h1fmmp85njg2851m3kprll6m2kmo2cj71733ztiy8ihbzyzhhzh49q2wfi5nkcfy5ps5w7rblf3h6r8uf6f7zpngtblib5582yklz3bl34411eh7vfiuocfll6d763oat5oh80cy0bzaaq8fahmsgou9wgiazozew8jm0owens76iuhbn9u78vls4dlkceu7wuw796gkgwtiukg6aeika76oaqrv4sgw9dxnuoup9zbphj7hqawlg7e853u8nwq07se4iptwin0wijl08paehg6ryi6tbf4he12sd4ubwae1fzkxghvuz6vkmuyc37pbo8sc777qvax417ce9jaabk8f7s3f9flw2i3062snlu8un8h7epwkjsqnrbvw9i11sfemrkc5tw4g6yq3i2kvpawh67wmffu5axov8s4e8f5zfawt9yr88sofggme0npmtsxbm92xhhfnaq1nhxld2fmjq7s5126yym3qgmsybaoazk7c1qsau01r4svt9ukn0xqtq41xpvhad5ztb001n7h8rj8q8ch4sw7835hpg73w6724ucb1bi7zseyw9yv4zycre5g27tnpbug2q9vn42pk1akfjkhcsgte9km8ksciylhy1x6cqegvxd2uifahujsy539feik2o2kkse5vg4e1rqbg3puu3v7njp242zb7lifu1mg5dwvhr186noi786tkbj6kef5egymjupq4dr9wkj79yqbb1pj4gf7hpjnlpqez1n972e5kx6mo7p1s0njxc8uc3qqw316stvivkpxjp4ujyidtev48f8v575p1ijypjj0gzjtw4bxrpg1d3retuskhb2qgw2e10szavm0tdc9y1m9egvwubp5a8urh5oq5lqpyhd3mrhg15cdyovtl16cfgu1i09b0g0fryj5ziqv84biu887bhz4jkygn5qu9dh4qniwuptk801aim3g4hg5g4gyd2q5r26ns0pt3g929m1',
                fileSchema: 'ny8jzg9mxe361huclpe1y68m4aa3tjofuoh42qib2pc32nvwqt6cp7ew6l01sfl58dowlf41akrv4q38mesxwevjqs87rvvlqloiq8qkt2o3tb4tlrqyrvqe55keza9q91o52ud1li1wnmfumw8tpitlw40opqv7vq1mnupqht5m3kr5jeq3osxq1f1kkbyroidtrbq73zrvg2dpwu4spfpfjya5eatq0sid6bmdlzml3jaahxr5u8rs7gty1obfsrjaqit5dn3ru1o9bzvose314xq65xsqsigxpeoxhkklid5eay3m7mu118qljmi0cqivwk2bfu5y5yp0ayxo2udiqzbwsn1ilim686ycew4z3j4wrpljrillrjdurneq4d5k3cd5ej6b8vxd35ta9cfir209silx9eoe5l8gy7m3viiklrkqknfrhenao88mq89midj0pqtfjcdxrru8hgfw6jfmxd7kf7z9dlz5hyclc7fmsryhua6mxkk5zi5x8k6a2hpbn4ypp7hcmffgn5xd3kvfnk3syuew8xh0257ahccy1eoxn3kblcv975auti17vslyywn2bs00g733em71et5lwep9904lzqsx0cpkybjyijzc28hkxq2hz27ov46hrgynpvtqkbzl8qg1atrirnyo57tm6kc08pm3juhcl4zshccf4zhrm97asjqk3xhv9pgpibeufpzex2f5q6zq4fxjgmbv6el6enwa5c8xycwjl8q6k1gkfm8opaktx25fr69jer94g96my8rahskqckz0zbv251lax8fyi6ctt7u0rzaphr8avh0ntajegd4otl85oasa9awxydpnv7usgq9fkyqakp72uhl3ccpei59ktzqonv3ewdyvmhuwh1171az91ayan1fzc6ndqgrkp5o0kkbbupvbdobbx3snb07tw47qpbi0w0mqactw9d7szed12a05af3mxo819wjinfc3juyl89upgd5eitrgncxv37znctex43kh920t',
                proxyHost: 'ocewfbpxizn53zzsuno146v8crv7jso10ztjcna0ltubr3wmxufkrsxvs6m7',
                proxyPort: 6883199943,
                destination: 'kc4wd63xi4bewmzcym7x2zr8uzwv3ss21xl9cqa2x0exr63005p0q4z4suf73n6ilwzz04mkw3kx7e7jb79jx9i1wx9if3xwefqc15ja8z8s2ga3csafe8gswldwx9pivcc64fydpb87lq8oz95nvrurschv5mi2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'id3jxwshbcc6l2f2w11ahg9ufiljxkhrs1wrj9mla35escpon1edrzmy1xnx1o9n6ca3b76r6m4stqrj06mxqazgoa4sm7sbyxx6hiqfgpmmc8fozbi9tcfiezhlqyareruypoyn6fsopt8ac64ldae0l54a7lod',
                responsibleUserAccountName: 'u7cixulm48uai4gnlwww',
                lastChangeUserAccount: 'l0jqqwq8hpvadcbkl39m',
                lastChangedAt: '2020-08-31 07:47:42',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'q9k85h5jovkrf3faytknuylm6jk6inhl410prujw',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 't1o2xkja5efmnc1w8nnwabjcfb32precfnkpao2szj86txnctb',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'noo3gpzn4v666zmli31k',
                party: 'sozb446qi846160t7rs9v9lt20h963ffnx8wmx7fdj3t9octm6ti00q3czkpc5t5fx2se047t6otdeuztb1r5v79b0q4l8gutm0yxlmstn4lro9xfsozvete2f3onwdfevv1igg24uw2eolga655udj604fm6i5n',
                component: 'i53rfwkpgdt8tqtemagqsqthk9af8wedautz9tqqfbram6ft5s76sdekv5w6wxus8hlkybm38tbj6iz2vlyxdxn8mdtt4tlq2hndmy0jvdewdflf9ll7e1znelq7e523lokic7suykmv9inaaed55u6q9cgdkb2h',
                name: 'ngzptos9l0234yymcrjywmsig5scdxs0dzcqfq64fn37ot85bcow650udj63q6f5d47cjo6dih6960qpevrjp0zdg31hfr5809nycb94u6v4rz6qpjl8enwwo6hm8bjatwxy6wzrsvx30tn12l74jul6cqu28lgh',
                flowHash: 'v8ebwtevg27g3vsbnq9m9psuukywk4eo1ovd6wl0',
                flowParty: 'vgoktydapmzagnj8o7qpbowz0r7bupows2r7ppb3ragsiaeypdkphimwlxtlw4c9puylw9a3mlhm4m02jqipwrobcx0h849y64ul6gbbo3c12rmxz7z0i0x7tsvz25pwnkf7w4z517iift8gnu6mqhymxi7vpa6bl',
                flowComponent: '2hrzqeyjb0fc9j0ax6q20hk72k10i2b7zwv03fz4tefroccfbg1sbzbyf1zvb9e819yijkjsbyzt9040yoechbj7t2rlfyyquhlm9y11em3930f3hmozsgaj4gk5cezv8x3ojdospjr868ld9xrep1t7budyteft',
                flowInterfaceName: 'e0qa8ksitpde8il61u5hsr3xaxidtbtasbs4mfinfpdkkfa6q4fx4v4l0oe6oyebbp5qp3a6wv5z4fkfjochkwa3tci2kbt4fe8um7iqyozz6qzpbs6bd5umcnie477s4vsobhln9813fg20sqpry3jgnyqbhlrw',
                flowInterfaceNamespace: 'k39pbwnuqvy9t9egwkmn5idumaswf1rsp8tccv8k4kmqho6ggcpffol6req5nqluqdlncpqj0wbr0n7h4l9z4teat3v7xy7mh4fkh68hgar7kjes0zuihasdzdzhulokktdya9tikrfuuiudcvxjxpor6v4ls74b',
                version: '93rswogm8hsw577p4akd',
                adapterType: '3aq08zwmkvi9rgljwn4t1ru1ask4fn4t5x7xd85fam7nq2goan49t888oegl',
                direction: 'RECEIVER',
                transportProtocol: 'lzzz4td1qsyze8eehuj9tbq8njujlwftr2cvhjmenp3zk19vnpql4xwblkbv',
                messageProtocol: 'ten21g8wfvs1y3q4hjgzupt7s8k0he2vx3c8s06n3c9ti4ecgm0kj2dk2f4b',
                adapterEngineName: 'cphuywd3ixkl8ddowpsc585bnmkhh60ugwcvcwmgdxnwanfhde7emgtrmrf1893b2mmf3o3l4hmo1zvzl76wsh0hfobhbkuuk6h440mdoijog64dypry9hzf075wpd1d9madtl85sutb1z1js3pebj5izrld7grm',
                url: 'xk83ftzcytou41085dnxt24uy0joop8kgdyxtafei16eclaktt0s4rsks92mb31ovt7d6ihll1atxjdtsjk694x1ury4c8m6hmd119kh22tclmwfko5kdxphbhrbhcn37fhi65ir0ypxt819gl53hya3e7t7s7arae0mhhxkjdig1f21tog00x9yxtlssfidreblznal77ewd9yldkg1xf18x0ycgppcp8astn4sxql4mxvnz98kk9apn7w970tuylkfdklp5siyrvk4gqevvb5objlxlxs8dm1toi1ugcuxe89xpsm9cw4bma1in13g',
                username: 'tdb2m931krslhydl9s5pft78mljjqqjoorixy86fm459jr9u2nwbai6qgi3w',
                remoteHost: 'zctppd7rilhzm570i41wtcttzosstxqm1g4eff3ljlij594k4yehmnlj4t82p1u3orcfl0ouqd3t3ohxs1etgbikrxlqk2p5ajb6hkl4gn4lzqwjp3143yiuo1rfocsbk5d4cyat45o6lnk5k0xw1a98gz439h7y',
                remotePort: 1828096409,
                directory: '5q38xg50wir1its8b9viyg9y44tr1pthvflw7ywpdveqznhvijs3q5lgtjuj3oknq12c567syuy8xvbvkcr5yefmo9gnf62pp0d42qs0v8d5gme59abg3q9pvlufey3g0llh8bh2k489f616gx4r41p0z1t0aiafygfw5n86yt5xybkzwz1uxdiqetx21zh1ssogu3su6bxmdw417j16mkoru4b9684q7esjnm4mdze9prl2s8m9i8tuw3ytceczkopnghq5xrqmksk5jz0elspn1uibbd5d9hzf5fmtn8n8y9dt36rutf3mq0hjmkk32csvb2i4ftgmrtq452sbxf4vfxta7ppbcms7a6mcmodp6xa324blgjraes9f07u5u82qzbmm2m5r5heid8i00cqfw8tto7dqlm5ibue6v8ulkboq7a419y2s9e9p6bogo1z0jdbnwym3qrnhbi1ewg041kjl6hv6aju671zezqxckfyq1q85fc5wehittz7jtq307ulexflyabtt0yuvikzqjzh8r546w75i3k1ncpdnkbcxd2wxo25qmumedunc9choys81zsq09dx0qujineshyd98zjnfj7vpqulv9u8qxwxu7zkvtnrni1bi9nfd0uejwb2pbv5vim87vyv8orr3rdxlmnevxb454ztkkwysixl1g2jf901h09uwdllqtg1tksbz9sfe0euzdxi30c3zueux0ph40vsh20v38lzpsffaseje1zt5917btqelnqrm0e015ud68iv34jhpvehl5cj4l4e753pqsee305vxrlb0zaaojnsymy5y0niu7ibxaxsai3uh654uz0hzb69ci3m6vw6xyo0zkruinq9c9ei7acyox4jml58ub6xvwyqkmaxwm7eyku082nsfurnb0hxz06t9hdba8oy0qvcoy7enruiiizlsxyqir9t1iu9q5rl4lg6pryv1kxlrlcnkm8ckf8bhpktjmd1lnt29zdh8hm1wwfe37vyh8a9o',
                fileSchema: 'g08hy6yqw00vi2dy9ud36nzrsii3pucw67o6dlc1dvvt9ha6o1mxnr4l77xhqasknq2d9oq8qodhv90gcth2y2k3mt8l9b6j5tnw4e1zwvf04r3xpl2kcndp1ng11eis2eovu5pucu5gt37hl8p0ktzvi3jph8vyecqymosv74io2uztd1iz8v91vzswbgfhz555volgx0xfurfo2yg08nmd9et3z4kkbqemb0lnh5nj9lliekg4n1pjnlr1625unq9rsh1gcvywyae16k87t32gjqo20tnfy7wmjjei8vlug6yuv427fshh07xvcm1i9pra5eqqdl7xmuv89xk3u5muf52g7ohhalb1g2crtlxvkhjj90eju2yp8ov5vs071dccw3aid08zht3sxn7xmd4qhaxko2weloyhy0ivz7n43b8jvluadqq8c87zxlb9ywxgs6s1hcx3r52mlr8yfn0q4tbypw28uy6ivrij4bzcsgt6kvgp9p9b2baymmz6g8fqehch5inkcylphxol9vdvudvldeilwv8evybrx1pclcty8dgosqqk358ehojq03wpphekowuwvesar2f81l4jddnsg9zzcva2gqdqb95ucszjreakkk8lo19z4hdn927sia81nm9k8278vze1q1o9dsz8lzb5m4fcg4kn8l8o1whesvdg0ve7tapqrpqwc99hfrcqxqt1c17p0vqgn64jhq0fk2xy0iuh943c624a4xcs8jzr4dhde11arpranjwe7quremhrc7pviui72bnlbcikz34ji6mxbd3zp32wfyfw717obj6ygmqcr0td7ckqtfvrp7zv29l5o3wyohpjxj1mk3kjbztyo7wy1qtluxz3lh6o6tpchnu74pae86fkfe4nm52ebgg0wmipg86xszarrlh4dxgetc059e210yvljd2wd5zk3zt6mv0h5ymz6itgrl1dlh41iigbdk3vc2ep7a5ou9o9ja3hz6fcu7nwedtz2qw4jmzvpowg',
                proxyHost: 'id29a2sz5zut2oab42pwd4197m0r4mmjh2mi9cw9q1vxbs05d65wcvdgupov',
                proxyPort: 9807145467,
                destination: 'azn9obmq3puanyweofzrqbmll6uhuscer6aoaqev1cukkl7h9oojwkv866vohjr0saokkwmefgiz2g1kom95h7tz9c9kb8d3dar1tqr1q627ic38plafoakxepkzduyo1bz528n6fiid3i911dt1bwdv4b2j4g38',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8g8nk7bq2u25qagrwzbg74go57i18vc15vbvvg3pvgz259uaal48aopbrj4dqcikpyvx1x9q9fmrmockwrszecid0w5y0g3nho8zif4tt4o3szhsolh6she60770ivksk16j9s95syevlrz79r9fahl3vvha8if9',
                responsibleUserAccountName: 'l84fixp591racvh5fm9v',
                lastChangeUserAccount: '95bp5pjq62jr08c5z9x7',
                lastChangedAt: '2020-08-31 03:40:55',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'jl2mua6dple6omqe1eiwgjaey2hj9j523jvuvbj1',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'h99critgaisn17hpz9nptb6l11oo5jwcqn04fguwh1m1h0fc53',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'ck0ejaoz2y7ppufi7m49',
                party: 'tr14293a4n1q483c0mtscbaawcsugt9g526htntesrlkisiiitg91q5vr6p5m7fxc8fsip6xcyjyml2vbi48d1h1u85n3laesxyen4g0lqtobhe2c7onmiekw6q82d4v6em6qtgzkhllgaqv3xne3138r8c31dbg',
                component: 'q8x6ncd7xkfb320s7axdl1v21d80lbdjplp6pnb79qluon90yu83bo7ypbem4ulxc2shw99tpufk77mt6zyrmiufy01yp5v6juuo77516ksysfhp9svcgeiu9j7ku7g13odwhnymbgi5fbdb8xdc863toqacqpqm',
                name: 'kmotre8lhuqzwu4va7ku6qm07fwh5nxzxjuoj6impnb9odmf871nsrh2zro5qulcbi2zfgd9ph8voiwc9aowe4ce0p0e3rl7we8mbp2o8zeh89ujj294ah92qb86euf86vphsymnxq9u0zxzhmgk4hhq5eorqrfh',
                flowHash: 'mtuc4j9cr88wrdjpwcxsh5wqk9exbbublyj75nih',
                flowParty: 'p5ofa89d6njiih6bvtnckes5c99ow7wwf1rj6hcdtl4b7lunhbappef23qddgzyzg66shh198yilqrbb9kcl42vi4a9lkizr4ku1uz3be6mi6vb5hkkiec9bal1qbor3k6qtvucb0ih7a6ae7niqs12mxlz93iy9',
                flowComponent: 'nwjoi0nhvp88bww8hjumypxx3umizl8329hg0bouw4dt7corz8tz5bnur6g1n7t38qr3idaxrv8i35yt6825llxx168sklx5bw91cnn1f27kd56xo8c98ivuoppyrwq555hcah4ip7zkmat4yxv1bdlj14zo4082s',
                flowInterfaceName: 'pejt2o69d5m083k7mgpbkp8fh47ra25ez18g58e49rzm3ymb49hd6iqt9li2iyy7o2g68241nmo9zk8iowp22odmcacbju1jh9hbjnd3xscxrk8nbcjkr9lrr3637x0oqgg3l5oawepgceb7iiem3ix3afvmcuv5',
                flowInterfaceNamespace: 'spwyq8yemvcapmb024zgqv4zxenhqcre3alnbfg18b9w0si8gue6gtb78ae275q3662czhj18ur0bi7duc9dctba35tgauhajsreaf335fdrvg6i7pys975krvzmiewyks71kw2tkizbnxai5wpgoafo8n83vwid',
                version: 'yc9s0bxynbsihi15fgre',
                adapterType: '7df1nw7mj1zmitl7s13eicrytpdnfu63voo2lry69fbtgvegjytrft37gg7b',
                direction: 'RECEIVER',
                transportProtocol: 'shq4becen21tnifmbck2xth4frrsx7kwrf476eqcvs9u1g2g6hqn6o92l4ve',
                messageProtocol: '25mnv6n7q597gk8varssf7r5rb38d169ijnl8i6i60a9mxcdp66g1ai2nvr9',
                adapterEngineName: '0ir07tinf1qvg0g4w9ttx42oxkgf5knke5849h2lcvv4zby6yzzgyz46iu99ktz4q9jau0a1cz7pyr7nbflo1zfyv8won0tuhpwd3lrlbafltkqyrt18abla8i6wgh3mtyfb08sl9uakqmjq78yf6mvejzc2fdfy',
                url: 'hdiro8fv8enhm5qcc90uztcecmxm384vf90k4xyfhek3n4uh4cp5496nae6jyted2ye80p8u9ppko55o9wg0osb0hwkyci0nd3osjej5vd5n0wwjv8ibxun6tu38s07z80tpwwflz4pamhf1zwqjegwt4epjr4y7m7wgv5vnxyolcn6i6pioqhyoeb286rx4boyogrbpn94oapg1si96v7io0rp72d5axti2l9lcezj0g4w1epm5nkfy5fnp8q33gjov2b3dzebcdxmxgrqcwhj1o7o8a50acxztboh6k5wz2qqvxw2mkwwbnuvqpdf8',
                username: '1kbl7razrdoxgsd15a064lbr78qk6ml72t0e749blc3gsj05zuz9rmimb2d7',
                remoteHost: '14x1nlo9de432nrh5elps56fjab48mcv1nrn38r1lbzo16pcuzyne6325tdv2mindn5l93vi7sadfswpfzisc4vumja2s4d8f5hx2cmggo9gga31cb9xxzuw16iue2d5qvblwnibvwt06ea83qi9u3qf55keeyah',
                remotePort: 9800514087,
                directory: 'zp3flhj61rzq0td4ods7sqo0qzlvzh6pc390lydjqfide4vu1d0ybs1y3hrh7gqybttsg0z04dqo5pghjopuem4d4vykr3v4uxb9gyomh7hj0eassblrem4mh6di62uv11o0q6ekme7j3nztvpqc3vrqyim248li7kemozo3fi1e4y2ollsg1q6gdwts4tfqczw2sy9atu1ju0ioqrlhp3m0mwf7rurhrj2wea4br29yw5g4h6sx6fvygfz1g73udrjbyu4xrjb0deodl2jgqi1u6d79ghxr04ovcuwvbwnnulx33m07bhx303izi1mu0bt42itq586w14uex8o6t0in5gljl6ovswvp4veplgic8pxd37au3o54c7fd6zn0s3gm16unpfavaice3mbcyjfpby8rj3nhdlousunuv1x9pdsymh0ldd75srgreklr8qc1sklyfc6619z93roe04luetrvup2xmh6tnm4khpxfwardy3pw4l63ezcygutckkqe4xgemgpu9erpa1r8dl0jo6uupy97hin3qc8ihc5npxq6fz1tjonrqmvq1uakux935k87sjl7a0ia1p8spt9zzyfuqi15gyz9e3wp79z2qlp540hb746qzenvpnp0buvhx6rb12jqu3l5xqhrc3oa24f4uvqa31wfkb04i48pl9zk2wy6ovby96j3abe545dhp4kuq7f3sto8jb6t2q2edlwdbl16wezes2nrwu6el9ggu8k27zl6vbb3qqi3gzyb0rlso5adcbohs51cfr9ncvw70o452i4xb5cymbufen1m7hzgq0aiz30wa45kcejkpjkn4h0i4stphitrk4l4ipyq53bxs56c35mfvj2o7ts0p8u184wixftltwr199zwcufwvn43fikcb7waipgr0cru7qmnf7hs8k7fy10ofdbjc12chvu083j335k2z1edbf2ghakb3n2erq45xo0o8aovyimr4luiokxxzwjbw1x50fx4b7ywq3qwj540',
                fileSchema: 'lmy6be1aqtguweuocmwns9mwtssx7qnx92rd6htj4596mhocskmep4p15obi0vlhk38kf60q1obrj35x32mg5ysyh6f92gdr4j2avrjwoh1n1fq7icq7qpqvkt2n1ys84zcjaznnqek21sw448epdabf2ntm29d2ptskgccp0om4ujo7loh1gd5fn8am21q3bx4a2ytgjtv7jktamwfb0z8jdb575guiiy42q02b48q2csoa4imgt26iri35q7ien6fq0ffe0yvndvvtjuypt9hg90ey5hdkk7n567eli2vkvdup82qjd0xafs0pkcoy9chrap8a49dq1r4lhbnz2ng9t2s1dexfld5wxk2bl6ix0fqc9no2cbr3eh83d13murn8vp41h5y0c11zzbmv2mpz8ep75un7ofqhg6q1kftolcefbe30rqztxx2c901pljatrcudcfgoo0v9o5qxy6vy3iy5poayv0f1svojp98jse0j3lozt4fsz6nz65oo6scoeq0s3kbd7eo8houyn8avul180wek12767v112mw3z08swywkh1ptfgdgec0choj8uynhrjlwn2k748w87vxzgnk8nbcrtr00ygjcf0qc2mrsmio50etl20q6k3fs02uar5wopyd6rm5cwje2itq8nbrn5w4vgx247nkqpsmry3awlf9yo5antcfnb8hvkw8spsvrqpdpzp303its3c4o7tfkdc3pq79lx9u6k6ph2ugafw3njjfixswin0gueb9hcpnsss3kh8zhpufrnbl8o0bmxndmlquqar11vmgu06rpvn9zw733qsxqp8p19buo5138vtoo2uw4t54aikec5uzaxvxsrxyo7gnovossf6nvhex91ktlytvtk8xe0emm8n241mrs237c0akabzq1qdqe69ciurjdtco210aiwdkeyvgp8x6siuxeuw1jlfm4ymzu3pu8jqgricwrg8mv60fxy26luj1otv4zwpb4w0zqf60xge7c1umcq6t9',
                proxyHost: 'vvdrgnwqwl2p2helkdqjwq1fpm1pmhu4fibvk2i19gs1uva7qaux359hw43n',
                proxyPort: 6072243579,
                destination: '9upaht4r5e85zcxkdyu02i2sy1b496ez57395yj2bix7s3ptv46ndtsm27j8j5bzz7l8ui3vgw9fqiz4f66mi3llfz33lq1odcx86l8rj2e5dyalh4qxt5n7a19jqfiewtyv2hvnp5kelj13pb0u2vqfzjos00jg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bm6f0ii9jdhhy0612g3ynagl4qj35kf6tlgbz65whgba2ufvczx7gmzx2tod73a4ucaa3diff503r9t286mdk3k50dehctmexxhsqicljqbi118yteh8q3u1sdedx4d7uhyf23hxdxzdp55niwrljg9f2ligulpw',
                responsibleUserAccountName: 'trh8x4voe0xlh80eku09',
                lastChangeUserAccount: '2ta53a75arat3pqm2pq0',
                lastChangedAt: '2020-08-31 05:41:49',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'xty8eh0o9mk1ygpltdclre2v2nqynvicqlingf8w',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'tcwq3qbsxm78cpuhzoc6mgdqh725uux34mvst3tqxcfloxu6gw',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'wrky3w7sdbqzipj6c6p3',
                party: 'kc5omqo3ceifdsa7k9hvgakklpg4ctzvusm3bxio6yrdbexwh4c72q6m6nwrhm6tnjgpb9w7mppnplfddxo0dvtoprhekdvrvh7g4p6s63reraunm9jw06vmjt85ael8djclnmuxj1v47mu2i4nfy9156pk5boml',
                component: 'gj3jq61oqtswqrhkjjjurra328jex70g3etc37la36dl9eju02xn498trv9tzz14f8sm5f70qe1fj5fjjoqa5bt9816vlb8w97yfyq510q54tfd68dsi0iqmaw9cz10rynuepwpk78hgoo940zxwemwy78lasvty',
                name: 'qk57mvuxet4wum3rk68k0wghi06bf2kr7gyc5hls58mxtiiran6h1buf74in052tjeukx9beqs3hmzawphwzy5ofps1rxi0c4xohs2bsyfon9q2gr4pnahpq98f1k219mieaoofp9o3ayubiwwlim6f16eb1jbs4',
                flowHash: 'k5fphgmf4pj5g07943am4nmklc8qsdpc2e713at6',
                flowParty: 'udab7eqwfmfis0t4vbfrs11g4ntg83r7e0v8ptqxov1rg7us2u1obo4r75n01srswmzvo2jwxfvvbkglg7s3wfrxh21lmsp3t5brlg0vm4d0t3u0x2qa2md0cedh96ar6h59mbqok3nwwcniums0ldfrdvch4x5a',
                flowComponent: 'q4gctxifduylp5zfq49hbarj7wx8sibzf2wacuam2l6anfuf456teymeic4qgohgpe28tewifbioyspaqi5ls0hwygytqfytuz4tikfebqvxlt5aq1ceu84wcn6o1bxvtwd33tr81szvsa1j56wop03598o17qsh',
                flowInterfaceName: 'ojojb0ybn5uhompcuie5clfblc1u6vy4mru2v4bvx7c66whvlcllnve3wvfuaq73pcchmu62bssmvupmq2esolyb7g6kuhzm7569ww8dpshvdsz7zhygvpof6rd6dnzct21f6cdwx6w2fjz2blsndbfsbyco5nj4b',
                flowInterfaceNamespace: 'kcpyqaa1q5twwd1vm95nnevfnsfk19nf6hllfo7aby0hh5kuravdcl8hyc0tqanhg1nlnst7st9n5c6u92e2h3hqutqktj4bc0d9aok6khcybei55n6tyndxcqui9py4xb55pwe80idg32izyv3af2paddn5cg14',
                version: '38ce12838ao16il8807k',
                adapterType: 'vo7mbas89oj4r80mk359orubxb7beji8wq88keco50hih4te9oo6p2lkdnrr',
                direction: 'SENDER',
                transportProtocol: 'mx7shoxg0amuuieg2wbeaasd3xrznhf4e3krwqmzr4inldduog2a9sobt9c2',
                messageProtocol: '0mdswembkbon8swubql4nw7e68v95i3t46xeyuw8e4jtpf5vlteauevtpvrd',
                adapterEngineName: 'ktexojzjjsy88xyz9yqmo2a4jt8ua1ih1taqas1gkkvciwhgh24lxl2v2lwo8rc3db1urvstl9od6rb42tre812c3bhvdsrl6rjqc0vacwi75ul3ujyjtnat874uoefailb7c66gln77p0vru23mfpr0fbxwgjd5',
                url: 'itcv4jhx8fy7xpv9r5f40giqx2n0cz53k7rfx8x579pwo81r1xx7xi503uq5k90pt9rfc77o9zh9imq37k4k1ulx8z3hz85z7i4qcxx6dtn0owdzzhlcwi9r4a593q6795cbyxgd5cvavv790jtwl5b4gz6xf69hvi58wux798pjaiv9g44hohc6ha1mzdxaufuofge9saxs18rh1v12giq6hls6m50i6eixgovxru4fa2rehidvs5ta8ixmojrfoc6syzijp5n37wl5lfp3hu7zyutatz893gf428ed7ygipy63s8lcyx7xnsb7puuj',
                username: 'rmxkvtdgrbhs1gxo3j17zo4404n66w9d1ukaz3o60kdmxnf1kb04ziz070uz',
                remoteHost: 'trol8boyknx7gt2l6tblsund6cesj24qogzervwieiaa2m7b6ka4uiolfvhqp83qg6ihjeey8or94g3g8zns5w27gausfpo1rl69bccv798uq6ktjde6v5e01pw3qy8hft1xs1z83ct8xarlkv32ac5yrggj6ti1',
                remotePort: 8835836986,
                directory: 'ut63qu41zprpbbkmaekwdrdpj8j3mjw1pzgdokyxwu4fwngva4ppm0mu2xlltmga7h34s92olzpq5g12h3ik0wv7clkwh6go16r6431lojfa8d8utaeskyxtm15s36shf4ak3pld0iglq3zisn38jzimjgwvf064bcdjmvq81kaclx922fqe600x0esz9n6k7pcx7ck94rgxftmsvskcfpenzgymth34jlnszkn6uzzfj67wrfbjkvxfm78np5l0sarog1xg5s397czh2fb87ivf4vujxkdik647j0t6e2wtm48n7a3t3wg12zlzj7uun27ljp3xo0bk1fhs5mrvjadtxss2ntotqvicavbmyjb0xtcqmnh61jqt1xkv3hfxgj7p40zq3q7yv9wcuj69rkc978tksyopz2zykudr0pkxj1wby1d8ghhmqd74zmcwsqp7zyplhlyky6bndte1bosni3sis17lbknldwzngq920eh8asl0hcpxj5g1m99jdau20h9oebtmkgwh9sseyztwr0lwmw2zzjixs6xscmhv7vvzuvwdy3r1xbuv6idybmukk9jm90jqdhg17ulspab5k3yin0bi60ifzk7ekirr0tm3n4v4cathbk1z6io6pre2uhanq9zkiyhc7kb0mc6a59pc4z2gjc152nwfn2t8ejbqwv8vej0lug39vjbngx7opnd25nyyksut69ylcfumbe8upny3tnayrhxllwkrgz77jhasck5h9ra1377af4vr647jm8mstatou5f3q53rkd0xv022nmc8cjvwc3992xiv8jhyt7jcxc8ypok2k1crb29bwqyxwtwkwbjpm3t1jjv3zje2011p0fgqi87lif03wvumho1ynsnc7ko8r5zhhi23gcmj5bisghzx20vpksnb5n4m0rh4c01670g41ku2p49l76soj2qsr992wg3qnz3k4h5xqftspuconlwjfan2jmxhymq5i9haweh45fd23z74sy2q82irtjcg',
                fileSchema: '4nmswvpcyb3egcph1j1atnm0rabyzv3bybu3ybfypjvu4qekk0dyjrv5n6ur85dolovbnnlz5toernlmi4y9jgwpikuloyolifcxxegq51w1wbo6470zg6ozbowjakn0yhkr9xtb9ycwkx3lq740bmm892mhrz6gy7mjly3h2nfo9hrg2co1pv6oev4zf3swetjtnrdwy4f5c85vczdu91khibz50e2fw4thglah60cc9nu7tfva1jz2663i4cuftrabvdrn7wjfjgxw9pg3mtj8k25qyqrtpp2ejckoua28bzljoxhutu60dzx4cj43nl92a2xw47bawx84imipooyeb5acxlohb9rfdljasd44ly9rzklb77ydponyglgbb27pa6cnkf9frwupeef9t9pu835lyttswwloni57qai6avjhohi3l2ciiq7d3yixytt1vqo5c1girhqhfonm4zvkhgei1ws6hvrv908xxsd0ivaczdunvuqobzh0keca7lt6b6cq06d1ymrf2q3ybgv69qb04acjko85f2m6okivdwjo9fbcg1yncqq0bpx2tqqdw0y5rb0avvme2uxpx57zah4u18zqwuyfgw0ikdobna56r6q916f5h6r8i8r6g97w0fkj61xq7kycaoeyv961u2chw5upzhyahpmddax3p2fbsrxfwmt0e8c1ic3gl40wg2jwyagdtuzhgmkdsnjwc3l6al7nxj3eh3he8y4c7cio8kxixwslfgwdbctjyromp94a423y4zor3roxxeg2evff5lj6ruvpbwmwg5tf3udkc5eubzriiqz3s721ge02x2sj4t2wfgrozxz5fg526d38reheow19zcow70vsl7fckxsv04n5x7bs8ygegvj1icaua5u78prhmb048fw015pdcn854ru56limvpymrgdy2bprz9v4nwbjpgok1ybi9m94optt0nnyt2xibmu06q69mruj3hlmj99z4ulsua45ykkx1mycuk7hmf6c',
                proxyHost: 'etjgbhwr1q3smrj3mwibmw87esns1qth7ojkr86r8l0rhfgoiwsarhgydy27',
                proxyPort: 9499901834,
                destination: 'k3q4ssht312arphssbnivbe6tf3ghizhkcnyu3f807jmrtuak2zd92s7u6ritrkfx7333l2xdxfm9dks3kl9o9mfjh2omad4f08qsc1mp24jr1uogvu2x9burbhjnlkq4eavgl920e9ur3ar2qxpmo9d90h2pzem',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'frzzwiynpvkyexrsc7o5bgy7476owuf65xoym3svrx6wzbr71b9uynech09osx2zngsy0yw17rr0mb687conz535kusel3pc1ps8btjcef5psmqx6y9bgr8777l8iwb6qnlscq0gmyakiimghtcs6etlz2kftfoe',
                responsibleUserAccountName: '7cum2wcpc8g38qxwwqsi',
                lastChangeUserAccount: '43yoz1u369j89e5kytwu',
                lastChangedAt: '2020-08-31 10:22:59',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'jkilh8ggopwea883bwr9arfmo1na8trfwlotxgcl',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'hob36uonxpxym89ef0dwp23fsxdrnvcw359pf8d48xj01hc2qi',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '7769g4jh6x4gs9y8m4xm',
                party: '3wywme5prp1gu3k641ishisjguknw2mht7y6gkxx7ym6nvd98bh0on1hffqrbus50kie8aqvo6r08xikoyngpq9yil7ykchac45rk95dhhtamrwiwdq9grkbv8fle41b746r596hn311jvg5gc2hpeqkg8739j0k',
                component: 'j64s6vszdq4y93gujowlyysqir43kezvk5rexaajechkcqlymat7ya9ofwjnqc1rs0oajd3hrcr3r1pfdjuuysubt4dguksdi0pavcphjls51684yv42zaglht217n7lfp2v3l8vhbi6o66q5o1cligs6p05d0ki',
                name: 'hl1a6anoecfyxcyjgwrvplm7y85f48r78mi7xqpz3u6gj05fn0khvwxs49qfqa30m771plif3ri2zxxcu9k0tej5k3m75ntag7g1pwwir77hwokwki6fk9zuhizh3azlgyaca19upg9mvgpnmeuujl14vijafkn0',
                flowHash: 'b2fv6e8xcj7ib9w8u6v2xule0xo7xvj2oss5vq06',
                flowParty: 'yc7694vzvs9vff50ieqquzpt6pz0kuu7ll87af3ncgkw26me94o0glls1xz3ssua2q2r7f7nocdvavmu6bcls0h706g5ld54it5xy8uqsfcexwkcn6w58ftbhy0idf60e7fknx9jz075r5vun09iuctoop49l3dy',
                flowComponent: 't204afniro0t8hcx9ttia74t1yszvryu8ns8xyvjqkor3zbqncnhtkqdnc511c0ve2r8iscql16r61k4hh6wi2vmhm1yypdu6z184xgo9jvtej18jnjh3z1ea0rd0zfqvdfcd0kturdla3tkllajzsr70xibm6o3',
                flowInterfaceName: 'qslnw9gl9p2l41n49pvnhscz6jdwudvwyqdqxp9r0epznjs5cehitstmbak9tolm7mpztjd2lkg19lt3rbl9ptw01cv3sealsakkermcso974gsdm9kyzqp6evx24mutbt8me4ctz7kk2jlj89looguivphhwjua',
                flowInterfaceNamespace: 'e6bkhc2jlvtm219d6tpbqnl0m64mfri0vktb1ctj9t0stz0otyq5thjcvhmt78bial5i06c6d2867y3g6nxst1w6dwwfmxjmupypfdoqazjqvitv9xy0dlwdqzefetyle4hymeayj3h02f9f3sj4p4uvneappdpp7',
                version: '52pl2y2ozidt6tqh609l',
                adapterType: 'kpa2rlorqj0x3qmprg6t7lohhed3ge7s5kb6h9gnjwseq5vslw3jdtzr8bei',
                direction: 'SENDER',
                transportProtocol: 'm2yd4lw1ztw8uz895i1mbya85w86ev2ur18dho1aok7ank70civj7cbwgkdd',
                messageProtocol: 'w6b1nj31d2jmh27xa8fyen6u954l94bk9488cwsf9jb9u6pq2llkf4w6aqby',
                adapterEngineName: 'cofhrx8b2ifyrb0g4tcwpjitrvxp7fmq7wpqm0u3lax5j8lgt0ym1e4jicjibo6jjrh74gw9b50ge02kssfjvkful8fzym2i2wjt0aadepnh3fhgq08lakxi0qot9acoc4frolxm2u5nbro7jmaw04g34i0ilux5',
                url: 's8tz6d2k5smyujeptoq7qyv64uawns3fseoqglb9f0qztdvy0hbimpphmydugfbmz0w63pf4odvenir696u5sx97yd9ros4p3edqzuuiccuiyckn8kpn6afo5n2wznzjokwa3s1elrxu79x55901dx36fk6pnom29pcy315xwdgual4vhewzzt3nzptm8jaehjxktmz9ni4il3k0mh0nptqcnzgyvc5i2bulw5clf91vn2n18298rcaknh4fhstp29d11omq34hu1gz0l4kmd79o3c60ft9epzy8rs9juppf0xsony0otaag7b3gvrys',
                username: 'cr7siyutwkgpxh3exydj2h31mananvfi9fmza2i1h31ui6r39t7lh1x6xozu',
                remoteHost: 't11vw4tkjabdex2g0bp692r7ag15fd2umkv8fj5ceh502ktnirtjgyqxk1lijhhj5csz5xm1lun8xkjz4brlpa609hzcqo0wmv154zr5mz1pscbk0urq01yrby71p2i2zlnri7zpgsauy280wdvv6mg5g7lhdul5',
                remotePort: 1484240850,
                directory: '9pvxabv8wgmo3fxhnjekcv9fdm67g1y59w893lfcgksmhdh69i1ctnvd477tvddnh2v69u8pjafzjss77jpxqk7lppszv7vm5d68chwzgjzm0vjf67gbt5ev5q0z46f0qvnc9xbs43e3u06knoev7jenb86mpmq22r5lyp2hl1zqfbg6faz9hzjt88tczsz6wwdy3sza5m7vsztk6nk542mou6iz4cwt619j3vilxfe0wsc672813vtnkquhwlzmu9jejrniopglsapw3jt6038dn100jzsehdtyetnz57whs8zgwo6y5g79dzj8r9bnj1yk3he9vbb5o96v3v8n6q4nfms3k591rcuzp2w66ul82fm8jdeyb0jrinog4e3gup4erzmcop4ja4z6n7bxlbtdfksxfpdz9rat1185yy43g7p8a1l30jvinkbr5oggsjr5b3poz304bxvpfowljrsbk0ux7wy4l3ma9h9hgicm2g5g9qsngbnkj5aam8npgay07wr312y1cqcvjtdwyi5g7a3a8cqm14ksrylkqk130l1txpczsh7r7k8nikpf2pub1gd2vnda81nwyfiu89di5gzph2ksxpafbiinsemyolzr04n25zs6d8d9te17yuapj5hczpkd69pdksmjhpyk9gefylxw3vh61eaiirfycjz8m5ozadahz4ybkvzemhu4u7ktsceb958o29k81s6wbi9oa41wqhie1d7ixzphr0sqof27zm4zc23kcbvqckonpbum6b12znym8cuaq4vdth7gggo3kmyvdw5k82tg8wcup9oetmfoy8ky1cx5du5cfykb90uy9jiyf8sg67gofiodyhpx3akg9u8f744ujoeyoqry6pbdll6tup47sfl86o6rd49v7heie12gsabqh5r807443r1kioo67u4wlxg40h916in9brrmo37vv5wbt741i06x5r0bpy2jy7gh4wm8rf9wlihqka9cm3uyr7spvw6io8428hqr4mom',
                fileSchema: 'nhow4jvwy8f8cbe118g5g1o1bcrgqhaloh6up82bomn2jfec2fsrw4yr81npdxjtcji8g5ok6f1e6sqm869sv6808o9ksnx3bw9dhdermpm86wofbzsrnhyne9wc6asp85qru1qdqdebknxkql04p4hicf0xvqzlch0641433dgubj0kzxd82ux4ic2jftlzgxmckgnt4m1ngopvu5ax31kzqvokc88m5y4mznnpfp95lpjzkos59opr4t0at68y1uasdy2bmhtnm0pjulynn94myadjv38ahg72qdztlbr74ymxixsgyppk315il0ktmgkrab5p9pxwhito8g0jlwvr85ehiz8lhy91xxsay8mpdxzn793p5b8qg4nre78mucf6t6p2qrfa8gaphpburb50jn3yfcb3olgj4lk46p8z3s7mnd68xyy7l6wyehyyoyikmdkivgqfgxg4muy2mt9khc4s7eohuuuzu22p89bf6wgi84et83uvkauicxwnpm0yqnj0emo2b5llcixk2nzbv23kgpjslw9cpxlp16kofkuyxyiyxp2pjrob270220keriv72ubl2v5t3ow9r1ibayl6g6evbqvn6119kybq5sbf4ro0kitlpmdp0uy1zcq8u43zxb4rwqbul2ossbf3jlfd9v2jiegu64wdmxxvv63e8b2u8cqdhm9qwksjbtzp887czgy73cie2lmgqom5wivbsrgezw8w3nwm0cfq2o1ejtmkhdem8xgfazysff8p96zte1kn2tkoz9ycwmo4yaa62mjq3b63zsbc2zmxuhyy488c18fbyzvmcftj0r93j08cvhu9vm062055tlqnvsp2sjtez0omg1cbj5f8wn770amp94x95johxyhl5i7fpyln92v5gzm78lvn6k5jd1qw0jago6d3ezf63e5n2tkcrwz6zxfj68w3quwqg8wn061npifi55mnxrt8j98jocioxi3dojx0u7m55s1vbna2e7os9rwxdrzm7ren',
                proxyHost: 'svnu89ljtcq02hcfecpn4ss79kt3dvs648lrdien3sxcc5dang46ttd8gj4j',
                proxyPort: 8160274896,
                destination: 'o08afstsk0bkoxnlz1gv4a42mldvb5yxv1tfvf1kzh7dtikpesar61hezdla70ip9xio1sexwokm37a4936xprh8dzs3ip80ke2kk2qeax5auy0uzfnl0jsmuu886x9eo8wg6t1xkc1g3okbprzn4hktlolt3067',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g9vjq27hry1bltpk5c6pktcjxn05l13k5am2ta1uyg6y0m0qabt46b60vgqumr3pbiyx0n3wdycy1pa60ayytqij6igicgd6qj15mqckf5l92f0cm0ggc33a9z9jy8b4egu248yiurb6fbnc4v46ias6kpe1ynok',
                responsibleUserAccountName: '8r0hjypm9nzjc4am6fgp',
                lastChangeUserAccount: 'aey2zmsallqgd0e9eigj',
                lastChangedAt: '2020-08-30 18:19:20',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'k7e9n65j11nzsojzdt6t9c5mxthvdk963tt2vk9z',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '34nn35thx0g0aw4px6v36azzvoh39af9my6iqz5ae3nkqgy5a4',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'jkf09d6ug62t2vtb49j3',
                party: 'fcek6rbh9ckvky4nsjb1k8iuolgqb9gndrkzynit3hh87xqhylmevr7n2ytjahviuznx8lmu6mb9k9ccexs6xx10ueidilf5azte5020xmvwfjbvxdfb3gdxm09hazlxvb1lclz6pn2cjy7d6s5rtuvdo0l1278a',
                component: 'uj06d5v9vqg2isaij0v8z8zzuf0dzjpwo236x6mx77538mfv9aqftl8y32uqgzox0q9p9f47hwn9czivndl8n4sdxzq35lttxff6psvrcd2wqds8mnqnby64pg83jdvj3g88tj02y0gq6fue3ckvc168o6ll1uh8',
                name: 'llyg270ha063xo25yem8vw8x8f75rsxvttuc6rpack7h0fh0tr16wcwiui3k5ddcawfgozcaipsns24oqk86xisltwwzb62jv2l2rgc4z9dgiswhspevk993cfcc2c9eupy71i4w0bxnzw67k7yxx7665othln0l',
                flowHash: 'pzldy0s32y2cn8cd5kkauzbcmljtuxn5r4zq7thm',
                flowParty: 'yikxoqiylom2f718qfbttcde3k09we6zb2umcae4m7grzysnygaqo0ph70cqz5iyq2cwbi565ildcfowhs1kzw7x5wy6kt9hkwj8f1sqffd38m019m0h71vf1s6pa0niofyb0i3s9uoz1xvgxzbva8hpwvpn0oim',
                flowComponent: 'yi1ioaijo94ju94afjxxbpys1xx70979mebhyqoqjdnfpp6bhzodnxc85qxn22b0t13iox6ozaon4younem3f8kihy1kwir3inenp6luw9ag5eyb70u44ge6msthidx91qnfafc7paae9javez9vf8b7sof6mu4g',
                flowInterfaceName: 'wq06h956h3ywev4ilu4aftfyzyoc729bj6gih4xzmv2bnw9nk8lqdxubress0ut927d48xcgbicukw5jyef4c7g1j3ykuofzoru84v96qr8o6rli7qxlgj4428yfva57mdcesu1vpmgrjup5l9zl78ts90htw1uz',
                flowInterfaceNamespace: 'x2sqvdu6sqhcpvhb6ibuy47jl6yx9amywuyg7yglyj1p5ka3ncfvqpzo0agtjmscsz6ka87sj3fr7qvgiymofy1x21f740rskhxyidxpbqgrsyu8csm6d05r39wt4on4pg4ehozacd3hgqoukokeoinzm5rcl0lg',
                version: 'wozjx4ayp5sd5a6zezjtj',
                adapterType: '0ffsdgio6aynyh42lxnqy8kno841qh6cxuu6j3uqzb3djkkre6pirz74h743',
                direction: 'RECEIVER',
                transportProtocol: 'ct4qlsz8byb8tzkww3acftfup57w1eq7lup7l09jaavegwxohj60xunqb2nm',
                messageProtocol: 'l42izeyx66r3vdien7zpwv1rlvc37bafin2xti6srb1b3cgb1z2xpyp3jfyu',
                adapterEngineName: '1w6lo32ha5s2depvfdog1r9dtmzl28xw5w5abdcabqplxk25hd75noqeia8g2345zp20be2pu96y09ehuyrll01vq3ykld8f6pzbhy2b2jva7ah19xbjcyguionblpa4f2pl9n2tutu441kj0vp3ddx701qzect1',
                url: 'ttwk9plf8ev4t9ofhk6mton4t9q0wukkuqtiy2zjzribcqwrc75whzd855ziq8ug7lhapkn3ski0x85n35sk71z179ilnhhkj98696m5s3vfyj1kk8oxx3i350jrohhmytscaj5o0lmxk12t47cx7ulrihkc4zeun1dq2wutkwt7vemj9jgmn0rcjw8nwzu6h3oj72j0u8v2zq1rko7q9w5e4on2klqu5wjja7f1j9lv3pnjzoz4bgy8bixto0d6w1ozf3jp2jg6trke5m1nfdogjufcq0d4z08ugxf0931vlbaooixc69b6gwzmpjaq',
                username: 'dnlfhfsbujxaxm2mhn30k7azfd6rj120dn6aukqv01cm634uej58dqf3zelv',
                remoteHost: 'x19d5vnlk7dq40r11q8oh66ug6ai5fdebk7rwjqcls3hmkdkieqqb1hodjves7gaddxozy4fp5xrj6oy4cob3u7id1rljx44jw7e9h0hgz4i56wabq9l326y3grnvfpx2ca3jhbywp0tllbbdsdjnt62oq9l3tv3',
                remotePort: 6786942613,
                directory: 'm0pascdroxkg5uh1bhfies9e87zwtrwm187fli60rxu3y2fksg3xghhk5ko2jdzhce2q2z917rak8iekjekft7ey7qoryu4wo40otswaf1vl7yagzmn3pbtgeoyrihvzc93f6y65os6icpuawv9zix66jbgk9mgmwp6h5emisjkxawt5k4gttvpaseettnmcyp2f62xku60p1baz2a9hajj7isin9n7pkfgm2xog1wogqz23w1hdxw8h46qusas8nrbl2r66g7oqjm5p7erg54fzjrqeg2ok0dw0mq2kfuykl1lhz7rkz85uy2ktzucqf3gymc97waydadvh6vbs4nt9pv0k3yolcsxi2a60z2bul61u7jv1jq9prwqqkd3zy8ffiy52xdkpi7fd2njs9vilv0a7tvzb3semwa35l38kbfj6ofjjaz33pgqiqi492hx31c506nufkg9ymknjezu0ywsysxrefn3hotm0la9hok7arilhtdhbxne9wj47fbs5dv66kd4bcodiex0y2oxpq7ue4opzfq8ffgkniaz3m6bk1kbad9b5bgq0xygyz9hrzgr7736y0iwf6ypdjm0xb98pw129kk9t14v5glg7l11kwqx9s3r112azacalraxyn65xvn2ni0q7p6w8hk1tkknpdl1hnfuiuy5cqzkuj2z1tlsqt78nx5gfzsenu22kwdcqulcu3ucbbtxi6a4g19ofy7pxjb6y4ipftyinnd9pt7zttl9bm6lrsffk5x3d62ep106g79hiou8ln8zwdvipmbw6vfdkoakybulre3znuwi3asaj3pyno9d4pkn8c9b1fw8i31fp367c5szn8mjj4h3pxzz4fqchdzgui4ivn6rus1atd5gxpmuuje61tzp945z76opebn9j3l4w5m8jgi96o7o6mhnmzrqpscbwt2dtlta8s73i5oinwyq258uk8thco7tg8qisvlltakt3ao5kiftwrdae3jlbo6oltn6xim9pot5yxdgz',
                fileSchema: 'v3adx6mp5yvuvzze8dq3uwec4t9rxb378pnhr7idxe9a52vezpm4kxaxy1hgc1papy8l7ci2olofq9q4oepnte2s6olbn3skmmwwc23apt401diofle3kc3a847nr6m9qb57pkr3ybjbjvuq1sdv7ewrna0hqflft87ze6ojcvk4sp22ym81csr3km584vdegk9qml6r69spdlfsy5ho8e252yrnk00v7isf6vh0r24mba1cesy6rjo9cgmisvqq1e7hr5na5teo45w0gv8u0ah5cq1cikxlox65zazcm11s5d0u62ujefeni49ifzesolxywj5ar9ew78n0nrj8ofsl0u7m89zjps8wr0oglobxt1vt5paissozn7u1556mgp1u571rwb9t7kra33amcrhiwtlfw5nu205m7yl7pv7zastwvf442jn7ysfix9ia2o9z357jk0swbdrg3y7idxpra0n9adqvymgkrt6n0hzao594hynmyp9hsbe8kzw1jza3btwvnglrdwillvu7xke9b6bzjd6io1gykgt3t7i5cqoesz485ibne40e90227mzc8qu6z851zxkl4q0fmb1fucay3jpl2iubg2co8ibvlrwk2y6w2mvdeo8slvltrjni8berri0fmorlvqf3etlik5r5sdfmvepirdz6sx2zeypkxv4jjmgp6th1ycghkwrh1kfcazqhtjh9k0rxcjevyzkw3jnuwi7o52awpdfhz0bpgmxzuogiltlra7ov1zym22tdsfpb5n3swmckd2ffnvg26e0xtwtus0p02jqyxszp5lze7zuem9lsccfdm7n2rjvt10o07su3gtobg0gkc0vbe6m0jsfi5n08tm1n8mginepplypug3e3bgb7l7dazdjdvwhca7566lfs5p9k7sewvsp9xjg2nk7chtinf7ekop06igbio23zw6dpsavavyp22w746usf08vewlzbtzl6scstaykqqu4atwcv4md1gdjxvr7etaznjnxr',
                proxyHost: 'v12n0d2zutluq34sklukpzleaxm71ii00tr3yfhp01lvxasd84est4kpoj0o',
                proxyPort: 7162663139,
                destination: 's0us3fmv0pnoe9irfxi7vdfg54cn2h3tbn0xs9t9eppcux93u2wbubqt72if6rmmb8icpi2kywbsa557eud0nos5kr0u2wn89at1acem2zpbuzzqr1stxszyocbfidp9pwuo6t52tgxg8rq21nzgeeuuqojm4cje',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o61qtjdvhldcsk0ky6on2cv0swe9r3f9h3r07ylvbbpmhq23kiol8upkispsasjrsf232xlowlgbbjex8n2w53mw6jost9y86nq2sx3euz98g1iw60hb5uei2h7tf3az95a79hrd9bia5wv9g7avoeyzrajb8qo8',
                responsibleUserAccountName: 'irh44yq31ttjzinagw3s',
                lastChangeUserAccount: 'i8pmhosm5vo7483ld2os',
                lastChangedAt: '2020-08-31 09:06:26',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '03wotmbrkp0oj5475w3awnd51bxgx647s4ss4dpa',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'iz2dh0z460hpugyzu7ydw62qj7zyilt0bj6luil3ydyj9dmwam',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'gjzuj2vtcgr1qv719vxa',
                party: 'yj15c8jz43188mqh4b7k8zb1r68k9qfo9a8d0wu2ogk3kgjt7dgz0rx15ok57486f2lrggej937k2k3l8lmhjf3pyi367c34fqqot9ku3qzp4ivtjoyci0dyjeqe8b7e3e0pxqxz1n2n4dlt2kwbyfn68q6eh27n',
                component: 'yumqp6mliyt0aifymx115l3pa2mvgbtjjz24o3vctw2dalwxb8ferxorvpeved7moofy8wy6g0q4916g8kkictkt4oir0yvdrjtf1c3zdoji6sxtp70yd6t5uyllxabafpxfvyc050alxz422o6btz01hs3hgiu2',
                name: 'utdyjncxswlsi6xqynd1a80tdyv1lc60jxjsr54g3rk3e9eflpymmzl4pww7z25rfc5wbwa1jwtxl8xfocld5mo65p5uf3mhi14hipw9lttwpt5r8zsidnt42vflduti99vv0xi7cshldl9po1umq8pvxly50kaw',
                flowHash: 'pr1v2r2r8dpuapetq1svjrbx1792iilqj5486w8h',
                flowParty: 'w7c7kbhpu5ensb3j7y4d214rff7bxodsvvd4jlq5yzpxru0s3o5la4gaf2jvbmx04c4hhgxhkd09qf3andxhh89buys0tbniqymm338t7gz8kgmxy6990gi5hu7h66yemwb0t1fgppfsprkt7pt3tggwx2l1bf19',
                flowComponent: 'z4ucpyquu5ugfijj14s78tlspslj7yq84pnxc9o93qzsdhw590ppsa2lv2hsgh8vwmna71uc2grf3zonng0vs4prqg3dn71dghwiwikmdqgk47zl6x4ln2mom7zjzbxlpi935yrk3fffh8i69yc3x27dzlbxn9li',
                flowInterfaceName: 'yqfyw7i9ngmttoshisntgbnaewnh46iqzssydzajwdbe1z2k3reyknqgm2q2lxbritjauz0wjnd2zevgul6i6kyzcubiso2jky0iahdlc456r6mtq6qqa8v23lldwfgfv6bpllkwjawnxzwk7hjgej7lc6ego4c7',
                flowInterfaceNamespace: 'rwr7l9uy3rr1z90il2szt2tmnc4gizebx4cfrt1yiuld76mwvzlajwqndjouf2it8tv28awcfyb573homylytw7e2d2bom80dq9pkklkhdaucsi4p0vb0bkz7talacr7jcnit0lp247y8f1n4zghandvpjoyizcz',
                version: 'qm3dwn9yk4p056ag87ed',
                adapterType: 'z774rekb1vthsk89wkk1bays2gs4btemkqi9mdchtu30a1xacmwk8h5d14yyr',
                direction: 'SENDER',
                transportProtocol: 'p4mpiyy6xt7xxjjp0uybrr3myhdzb2fsgxqehzjlpkblxxe3lxfwjzcp3e5e',
                messageProtocol: '02uerqehs2mezabzk0s3zctndafyhx9vydrzfb8vrgwmjatq1ljfrjfflbdb',
                adapterEngineName: 'xocempzjpar4s4qdzn0946cc221vljy8vw1u5a6l583v7d0j9yb2c4kjm2648q4cdrofewjt84ilw5v9oih37gl14m1y9ronkblnrixqybfumo7lras6yyb552ip12dbx76oxdbudl4vcefkugii8i3obpoinw2j',
                url: '34aw1yzay47j2o7xv3motye3dflc92gwjb65h182p71n6ohcingg6sqhwpr6hxof3y4843z5gh8upe6e0hdwg9qx1llgp2vikzqbq4pv59qmzigqxs1q6eb3nz712ej1wdo7rfd5qz1s20g0st4udmr58chgod04pnlu6laupgxl7c912lafwfpjlf2n1bdyvnv7aq7jyowvk6i32142nt85e5xhd7zxlvlv1xia7xtpycac2dxckka84ip4xhq5rdxj3nweblatgrlem2nt47pzl0c4rpjlqnjqvtbci7hz5o6ndzzx6tukuq1ajlc8',
                username: 'nr2bybzmftomaljp968drufs8z2xif4a2dq0vofug93y25xg4zzmo2bzpwe9',
                remoteHost: 'ly1a3efy3agppls6imgv2uc8n8v7gfj4h40kt56agmt3ka6te4mtv2nl0s19m0kxmdq1pffmgyd9zxhsdtpbpuhvmq4zhfr1374tf8qx2ms4nugvfzno65bsf7gjo31iov7uw1ttu5xj3dycbe3wy2gessxm3cds',
                remotePort: 9826356287,
                directory: 'jc1rnylvtag3zyvheojwy0oug64kp7r5m8szsf5q15xes5d9ii3ekd3mrqyjz972ydfrzm6def2ggniotx832bln0llgbhm8l9uywl0x46pds3tgvmk5pzr9kbo4hh3idrbzqo7psly91sxu44bipzxh3e37ze20z8w4uiho122tiq9n9ft8zq3pdggl4udl6q1tuchzf8roxocjdz8zndoqhlpukqww82fcgxnzjyatt1ov99u2uxtvhkrjv6xfkgqj3ue8m3291wgy4p5tnbwltpklz0qnwl2e9dwkljdjut04xgp27kj17ysbu1of6omobbprdwkimu8mgehkcqk41d25l3ri3mpvw7kju3cxgkqxyno368oqxkasz8v3wcwe0kz0wl835006lm5jsrjl4utlcwby3a0umx84fpvmluqr5c6u6x4xkri323bfs3yeujv3gs94hqfvtsm3hlho36hfi7jyuxs6ikbs62fsemqvpia5a9k9ya00pam0ihpapqw9mixfygg7ld314rwknhxbjg5u3idpofqgtx1q8qf09n7e27t28k85x9eyrtg2zeb8cozw8vr5zcvnyjrfz8vb8lev3hrsxvcpvk5kl7jkuw9jerzmlsprw4doi4bi0z02kaffiw11sf4d876q5bth2dfkwjuwklisrrpsr0h4ikbiyi1likds66m8debcei4d55ovs8no1zjkpxmz2eil6682lrw2lh80moqr2vqs6npealffbeaj4i2zbahn75rxq4zmq7j8xbaxyrx921pee2rh8w61puriqalc010o8l3p2qd188xt5br4joznynwl2jntirii2e902qcffdjmfg6d65kw7eap6rqb4titnk2ue6cf2s0tjzdvr00t4s4bpud5l0xh64widhvy2nnvgj0zl1nytgazfjc5ik92oul8kg8sxa8e16i035bn4q1hzr0fgyj4xj3vwxjlsmmv6jkq5k333c8oebc19vzz11zrxztukml2emkv',
                fileSchema: 'kod8lazvbpq3x9drf0v402wd9e3y5wmdyygyc92kcd2bp0rgw249vg5yz4m7avrfn63zgcwzxrhnyooqygefbtb77lwnddn24ncdcj81x15snjmhglfi01y9idqjwvioktcyxss9rfhvb4bl8ihvdinzrkv0dyl67sr4hzvlzgieurfnfjmpoohqid66qur79ls69tffmhchtpdohhg11ijdfhywwpmuo18k8z9v83xn3jxce8cnpmwkdfraseoh5cp8172aesm4ueoi6cm9sp0un0xyihc2yzwkad0ba8n5eoyt3svn8cz931s3naau0lhew4hhm0z2vvnh0sdzu652i19vbvkszs55c76tyjv3viwub1my83mchn425kf5ikh48j25cbkbuc6u79ttqjzafpswzzedcm1cp6pdd705d21q3ns03ocdf0q2stlueasgxc8lzj2uv3fionsg1xw3psmowbkj5r4upfb8tytata3np5o2lowzvvynxcblqr1lk79ngi07qhobxu806j8jngpvczjurwsm74sgka3sh7szza77l4fenbs40a00f8e1e2andrl2mipt3zl2l07pj3g552ihq6b75w101pmeqgy76yi89h4hns69dhd0bfyhqj6j1n7qtbt5ledo4ev9gpgq150mnt4dancl4ggmukbn4mchuskqkkahi9hnv5xesndahmaltqnplyor6ahw8iuwwhastc4vppyfb47e6nsir95jmp542h3jo2821y4v9fgv9kvzvn4r4tw845zqghtfpe24q927it8zq1u1ebbhy00ntyhkxqkcgsymvipuul0zndej4fb61tngxzkptzzny6gkm601ro6v4rak12ms0sfn1syflgwcwqxl4w9fu15yxm9idxoexzm6jj4pj3pvykd4cj5thu6lrh6jmp7nwl0t4p7kzk3rdl2ydeekg5bzzxiv4l1dl69wzdpc4drhawpq248togb97u7m6wutt7jrguk5tc8xairi',
                proxyHost: 'qhyheolzpofugbuaioobhq9fupb8a80or5da2l0u23cojbid0pt5mqirj9w5',
                proxyPort: 4288111951,
                destination: 'k216e44nsfkl8h5x2yll0rkqr31sxdyi913prw4ck82dsnvxgh72uz5wy9jvrbk8vyka111tylky7vp3zme2sazj1wtuu1ao3ccao9tzcdee8o5tmbk15erj79wxklx1v0aut5gloncerwxxh7gibzrgdognia3d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mq32qw53wm5vk8jnmk9zp0r36eig1bro9c6c81jriflzpuytq3k2bvf95vy2z80op5f4pm31ktmm1rx0xcrquiy7gyt14vtohqn1fwl64ha3y5r9cn0bpmqwcrh1e04zcfvrreaoaev66rsup869dtynlhagzb5d',
                responsibleUserAccountName: 'ryx7m9fahg7rt49ivibf',
                lastChangeUserAccount: 'tekgv2ci04v0tmgqslr2',
                lastChangedAt: '2020-08-31 11:54:16',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'zx4or4ywb0ahx0a6zk340ivoeq6d6wxotlez01m5',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'axp2qrhmxmhin8xp35xtfgg3mfvcdsaa13zq7xj2lzjvac7n3b',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'b9ran9j7bez521w7sp52',
                party: 'e1umjfx7sqwnf0mdawdx557vkwxmlkznakc9i3bwmhe9e43vqz44ws9fjawa3kbsjj38gmk9iku25ytwwyt6evn41ifci8so9lj6aquxaukfijlk1xe77kcvlat9oicvt0vrx0zvf4u2l2yypfzcduk5wcd58ohz',
                component: '09vpxmf1txwkkqrwqp2d7o2kfv08wa65go9255yrvid2e4gnp2e2xmhk6z4c6nr5esr59niwqwl9v9wir3drfnbogp9v5ej6ei8u6ekhvm40xsvsocti9775ahzmxws0hw86guc21sd72dfxq0j3104613a0bl8q',
                name: 'mrcyyp1a85huctp2ot0o48uww5gdc796vnertrxa0ldk7erj560hf4kg0a6492gxqg477124lqjo7wihmnrgmh7v8vyjaw7zh27vu9w57kwn3p12l34j5mta0golo9amjv4cnhjz9xtuewxz9ub79yeq7cumzhh8',
                flowHash: '2uznt611pap56z667t46pem2ak35a8qd0u5iei5g',
                flowParty: 'zy1sjkpquhfhxu547fel446mh4e5bmpupa1lrj8chdadpatmxpcdy4ta78mc22fwzd83382z94xpggpp10kl1g0upkm5yk2qmbynw0vnp054a05dlmtjsrhslprt6ksq7rei48jq0fr80zr0zd7hcw3d5onjxd22',
                flowComponent: 'lj0p3bcc9o8g6en1xadxzxzuuqzybca0bticjzcw084sy4i93u6rosrpiasstkvjfbigr3vg25chjdg271pjbu32e9smna5k0zkmsjqcnxpbz3x92xkdekcea6j4quq0m4y39or5jv7inlhl16vv6123m8wdo1ih',
                flowInterfaceName: 'pihvuxyeay9n73m870spqcazz8utew8m5kqkai2mzxqg84w136g2r1u0d7f7hbioqyatjcwike5zwoibw9dg19rqim9abwh87gk31cej7wjoeu3nenszncnlka3ui00bhflcu95q2ehqnlkyc30dw1v5souaeczg',
                flowInterfaceNamespace: '64anmrvy8mvcxlbp46r722kruwhhxl5avyg2b2z8nutwuvtyeg96n4rbnwr8iyjlsdo4jy0pby6g3e8g55w7bwwg07k5lf2qj3lixtariwk9eyghiefiuhdxlhpdhbhbhvoz3waqzixlthhn9u09u5pgafqypv8d',
                version: '37s5z5hyjjuuhgfaw9gd',
                adapterType: 'nha4cedjeq1io41zgxjw9c956bt671ozo2hluywwv15fa4c8r3clv5mrec01',
                direction: 'SENDER',
                transportProtocol: '213cxskqgypdj7i6h4xkwzresawsgemftdibcwsn24q4dahjfi6tysixoz46i',
                messageProtocol: '7j6awfuv6k6n4n42p0r3g07iti3ct039az0j69wvbfsiuckj5qzit1ifxodo',
                adapterEngineName: 'dcp3qdjv8t6z7lv2c4a28ktqbs1gfzx9gz67jgw25rtvde74sf7yit9f04f7s2uyd4sf32y2jlo4ev6oh08ap6dyftupr93jjhmib08ptgolfkq0ggcdfqhr5n13n73ot8fzkzy3y8zfwotvbev801vslwrsh40i',
                url: 'x6zru9j411fxtyndyi9hpb2b73sg2anzifw5u9b6pdzrhvwbirjgr2vj65t6nw1quiddu85cja1jdmzo2gtbwdjyljl1vgivyjqukkegsl06syl6sstvrmaxnc1e2htdvt504i9pcrsj64hp6lf6apy5br5pqxb0lfe49vztlk9ku86q9yfal5cykvt1v2vdmrv08mynnq4zmwtamsk0m20kzwejbwqz2tnumvgmwxi5x3wwdf1pdnehofq7gg6537xzy5094wtwtmce19ze68xxu1ba9s5muiia4c84p17u3uqlog4snck4kppzdxkz',
                username: '0a7c7vxpbxpcno64xk76lfozmamadaahy7tebgmobn6seb4e7ogv4pflrzwx',
                remoteHost: 'f98qzeuvboyw49klllg5syfqxy3jnflts8sgrmngffjxl0xhwcbbpx9zv3p1teeo70mojrdk5mutgv9c0utqwtal2qb01b18xqvckl6z1d5bv491orrcbliojij7r9ro0z1mwbbsh36ya5oqv9lz3vjhmeininn0',
                remotePort: 5466782111,
                directory: 'al5a8pkux9pp5ejfwdcblh7u79mm3s1d9du0ommp70nc7pblmtdy6x5wjl4zsjd6e9xpblde4bfxk2mb24mfq7ue4rrdpoxipih5jkvbvwa51nohkdwkrauiqsbdiu2z5rtcktycfthljcyh6antigz3qjfq33kvus522llv2s54w5yqr8d2u69cw3yqr3oo5c01pskd84h15cwzi1d98jicgejuqm84lc8skfhkalpwezcqw4lsknr6ad11qizd0wd3ef3denfz17p3iiwp0vzqicfu25wq619dfft5md88gs4gbt99xeq52blkbghsglwhichjnd7wo2awt2bv8sm8dwjhx3q706r3gi9d06fq0kefj4w3o1xjpaqb4menxtci6smtqj6y7y86apkc8pqs15tu6eliubv7u1zqrvxad0vbm0jg36iwvdeh482gedx8zu9fowq02rcxq5vg8c3n717pbvf51uxqu383e45ra5ntd40akgl9llehf81qv51ckggdqx3d3iujmqx4y515aeteerdoug1z610w8rbrmne714kypnv56jxrdngajb3jhimxyzxyi97enfzioz166mijad7sxlyx41plsuw5akvjmxss59emz1vjryh4axcnq6j7y776xk7ug36eihdp60ru7ddu6q32qt8bisbr5tqzv6xmlwbczdwmj2p07utzey5ip7x72faebjr3lat0pqaprqcnquuw0ouwyi5fu7ihvdfdgkb0wac8fqnx6yafzv8zq55ue1jr558updefds1kzaaorhvfkatzfayw3k7g1589rfvd6ffcgzlonc91bobyvpfzfpi0gltqsocn51kx7fjmebwpenh16rqqmbny5gy45s5x4qq4xaf0wyhnyjxfblz5xai0swyvyh9y6mdv7x7y7gwfnnsxf713jmp5cqfrdgzrjp43bvxvfcpa39h858k0cuinpksbbfus7a4dk88g1pqztf0sx1lwe6zkaauqnwlznlgi8ktt',
                fileSchema: 'xhay9ttcmmer819ymdj6lnme2xn9ao37gpjbvsh6k5pi1u5g26lxbu213r38rpcb9qm2su77qh3rc19psq4i21d0hxs3a1xz60ximw97t349xptbzz5t5ej52afjudgj9bt4pede4nel2s4cfjr67l7rmx4xo7g8x41fvmxvazse9ptwrg31bjp62teom54urumukav0lqya46ykj8a1erk6ko50mq3b0ikcl3c3tz145gw2buw96wwro62xl9n3auv5h64d1wakg7lvq6i2lvogyxnm0jhx7kqto2b6it6ejxk3ja59netv2fpuvsm704la7xa86hy5e9apj2mers02bluevjfw1retzv7994a3iqpp6o7l7aeyxxc0dk9eodbvvqkfts0kk32jer91cffk8daywuwhojly16akg3ptzgj4i0xnohf5rplyk1u9qmtde7pxg8i4bwojykjto7b99zbe9q9gjp531tiehtl1haada429dj1rfao7eqajb8fxzpbvkrccmw8h8qb6bk7ffrt80qyqbsi9g6elq7kuovn32ug4a65jpxdzrzvyt0r0qbs4jncdvj0b0eqslvx70pf7vae71cnbwwrmuaksb0ybaj3kfrjb4ff3jxa3kz8riansh4oawa2r399nqpo95rcjfofwsswxnb7qd2kiuxvgh28ir3k5k5ejvr98q5dniwlyqx67e5jh91u5ffas9hnlz3h25f9yqz27cll7adm7o7kyxpctzzhfa74nkb60f0reagpfj0tsq9mem5nj40iy2ofm5irlaz8fbbbszbaucdysgql7n6nelf0hvmrnj5z07n94d52ukw8xt6bmiuiz1ide1jg0njrgi91hzy4ow3bem1q5c9or6klifef8akfrcwvlm5hhxi966g9rg3htd4gr0b0f2oj2kqpxaxj4h7merpwj4irhaom7gjjarjsm4vl5cqgy3jofvnmb818hhmfa48xngb78m3jqfmmuulk0itjzktjic5e9',
                proxyHost: '2f1zgnw6e1yxcz9tregywxc0tfw31zc9ec2boxl06a6zob8syrhmryeztcfx',
                proxyPort: 2224048182,
                destination: 'tha3ulq10ggtxx5fy5lk6xyus4e7klnu11p79p6je3biortmnuqt7taxp3i4v7gq9y4x3y2eu1uam014auzbskm77r09we4f15rclhq59r6g5idkvjjmsoe263p7hxlzf0k3po723djifkg5ky3agadx9k40azlm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e3mavk9key3ajhh7i1tb7i3gqrp6lral8j3bjpv88xxdgjk6qvstrromz3gv2h87rfrgtf67tifmpcc0aj4jscjwccq0pzlokgthqe0ndpjq9pzs98807kiqpoqqphysbxkr8dq96n7j8ijr9v9f3f016pc80z82',
                responsibleUserAccountName: 'nv3zvlo45bldibewthnq',
                lastChangeUserAccount: 'mj2k68y8x0x5qxow5g98',
                lastChangedAt: '2020-08-31 10:02:25',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '42zq04r6f7ytushpdm68of4mudgk3o1djt50x3s9',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'l4frfq08ywtmkbrtjca11rni5dwvfficp70o1ib762xbp6h3c2',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'ji47jy9qgz8cgiyghdms',
                party: 'a0u5xiugk1ir404wxoxofizongbj4j30mxz7e7nlkfcpi30yhprumi3stg8dnlt8ykxah2uva4trakrradtx3gupbnc87lvv2cwi7f97wjffd1cfabg0cvq4ahgmdqndb2skru5pju65eqfcu817eyw46d748jq9',
                component: 'mgd339j7er4s5btz897nvn1t7jiid7txp6txcod8nw70f7l92n7tpdmxy0hrvk0k3617hqbm5t0sbf35b6wh4y0345yxm60ekai4hv6shdslvegrdmxei9lm9bzeqj8c9d6pa2fd7kn3q38s0pqvito9tp8ho4m9',
                name: '9izagxegubilvoj2dlqw8t4m6vrvf38hpso1iwkgyg2i77pe3p9dnu0xbo66febb1lbmes2rdm9n9k8n8z8ca52afmocyah559cztmcpy34lye1jz8rsl9igso6mk2sw4wfk434ouixpklckuuwkd1dt9grx9fq9',
                flowHash: 'ov0qfc825zyjz8j81553855ppio21ngr93yzgqbp',
                flowParty: 't2jjbj01ld5bk3206av69jgztb81yqe9pjk68f8etvt9ouverkvwlup03kpv2gr9ipm52n148l18h4l6nrl6ropcf7tz11dk9s9y92ifrk6f2sipmjcrc5i1oh95qv7e224rliikjcn4cv2n5flg5o0370b7hrqw',
                flowComponent: 'pv1dyqycw702ydi9t0ckja8vbdd5nkcemzeradjtj75hd5vjst9vtekkjivx61tqkl6vau8n0qi3c5qs12zp4c47qq3xjmdg58zey1qosli2qc53wakd5ut76a6ff5q8obxkerpp6ypo2yo4sveekgu0r5h6x65b',
                flowInterfaceName: 'pxt0qzn691bs1677xtxr2hv6mhvfo9hm7ht5zmhyya6lr0kyik8c4k4xuki2rie75u7yqeo86l7jq5kyc51swst5lomkmwzo8y0v48dcn4h3vzkr8jsxhrwgp88wtz0h4s5anre98biw0hhse1spusrhnsugh50w',
                flowInterfaceNamespace: 'r6smqd0o2wkrjypwjn28zy70ovywbotjaej7b2l91uibnwb7nbnrc9lss5uvmkgyeu9j07hfagk354hfwzrn2pw6vtqsw6dpdvmden8pogsrjkre01wynarxifpzakwedfsxkjm1057acq3i19hj1u38e4u6lcqs',
                version: 'oz2qv8tee2jt2d34ya1x',
                adapterType: 'i0epjyzddcjj1s53czsmg27f8rtgwddosuzdizyo93ohr2cq6vdozu4zzpjx',
                direction: 'RECEIVER',
                transportProtocol: 'p6i5btpi1b9ywolq8l0buocdlwhu14chsoyq7xrgogfczahr349z0m62gjiq',
                messageProtocol: 'kyuf1z004kpo97es37taq8p03cozn0l19721rpilxhfhq6be9xd5s62wztesj',
                adapterEngineName: 'yckzfdtd8bqgs8mxakzeir6822lucbgawhygwuyw9qnrmpy1we7jcuc2hkvocwpd9mdrgmvxskm38zvtnd0cmsz3qhg25azwoe7qdy0p7ojcwxawgnhwtdzozrkl38jd7zs8o0hzmzjrogl1fsjcscqov6pawndt',
                url: 'ycd8q0zcb1l3gfn6yxi1af84uh0pxt0iqafb5u9e4m88ty5utggc7kxzmrstm1cdonr4v2lmypt23f9yrpp8x2x7dmzqmqttrdlkktqjyghguy989c9bcyxs767ywixh83ap6hqduahybdj92bkcb4ixfmwbvz6336eedtuekcn50cfafa6zru8b15pivzlu72zpwxvj9o3uxlba2onodju890zeqjv1bnz25fmd0whqarhdmb44762mnagvy0h7ssgnod6jfuocc6nprf2odhn2b2tt4mqg9bkkalanedamjdkbmvb47vp46egz33su',
                username: 'sfr6m3622gjsp0g3daaxk9tm1n8mnmgg1db3pqhaffvz14qsfduwxmiylna7',
                remoteHost: '7o27kba6kxa51pvrsm386oq1coddgssqwe7i9n0w6s4n16o51kl7mqsbu9efkh4ntxpytxynvbt7gcrwp9el9fmlq5hjnp20oymtwbtd5bu2uev2d93b9zdqh2lhc0day4ss2ky621l4tyl1zmwzg52q61k8cpmy',
                remotePort: 3780192667,
                directory: 'j4zv41uvia2fzz86du1eh5qelauwxed9s95gymkwtwcuoz8b9ccbyx7ng8hhz7f5777gayen18kkqocd9yafu4hrqmjbayh6dvmtjydjfrppgura76f8rkt91i1f9gao6e1to7ze2sqxmjtomoje60438nuegzslwhyk4v3r01zpg0y70v1lqhi2ee29rd6bfuhplh7p2q7669zx8m410hwulo6papdvtqhd3wt4s5ulxtlvjdtpqn8vlhngeiyzr4fylbyjx2cuphk6n2dcbf7ff3veqa2ck7vwdqtywxf6e1l7d23v5fq6bbsqkay4wlzeqmvatfooyubfhgv57dkckr8fe8lj8m5ysfvtgp61vha1wyz4wsy7iqpwkmio00lxnte4xkvuncr61ymnj9jr5kbej6exi5dulkx596dpd4krky4cbrvhmu2gcvjh4pssprnvoutposyrzb5ox82neayj44m7dsv9ed6n10mjmd0xw4beqmfm7zmp3qmifh1hxjtfbf3qd8k3til0td7cfg3c7agl8cqm6tkcm7nhrlcgwt5ihvrk9hhh6986h2tlkjt65l0dxcjl4j8odosg6jjxftcf0n9hi1g7ehyi0rqrd1lo30gk706773gvm97nt3n5oox5ed5d0d0qinxd9onswc3924mls71u07lvq6jft3d21orql65tfwwrg1odc1hvosy3ofa2zbyxt647e51nhsbkx6ju3teey4a6vjh3pywhfykq41bmi3xlbvhco913yhja41fnxujsy9qtnavr3nzc39xndd0bq01s3fy4zwsi3726b8i1jkp0y6857pocm0o78raz1bqeiqg8hzwt2epn34h0cryddi2rrbb4id2j3r78986wkhd7sh3wxw9gc1fkww7z9moq7k41cem39767iqf4dk9oui46t3911u5ki0q2lpetg716nqf6s7on9xa42t705w8yqjzvucew1jb6uvh3lwo11jk0ppvrlx0d93z2xxxve0ob',
                fileSchema: 'jvj41mughzfhsz3r5ilv4xdv7e61lpxzueanar5hb2n7jiph3b0vozc3qbivp2gyfjz2wfyxav3unx509pi03uhcaobpvcfob9nbw0rfjlz1lvbp2q8c63rymm1v4pr8g80wwl8wphvt6r5n5asg2yhj3atzxu97uzh6wcsw7i207d05jv23kczpc8ycf3toe6xtsy77ay4rw48opcivtmevjk9ikzqv6ekx24w7ajoyah2zzman2n13zardcfsmft3q9c4aj0kzwztzehh4d113toy6jingko9fz9ol8i1wwyx1b6rni3npyyk6x03t9uoowa9pzkhhjibl2bc1iq2243dgoezgxdskd42ttkozzw838ba7a623gtow7eosp7p8ssalcviollbhppgypny1vlx2ab3ogsrhu2lc4btr947waru0ei2n6tu0g7igfe3asw2eww7k68h96298llv1audsceifuh0jbf55s6chwogcwidfgm7b8soql0yqzqdv0xljvrc0qev3andho0gz40bz0sq47jk8gknc1dxdzy8xwhjxcgaow6xj75s214b65drkverqcjo5hfx5bo2he99dmiid4j43qj6mdv8fmxkpu8k15i0uhl6bu5or9zoqo9ex71764ijdy91ui0cjiww98eva1gx2dhpj3rzfejyh4zud71lwjibz7ujis0x2brsgeauzdr2sl2gzkbu8on4eo351bxus22d1qy9f7vnt2nv44izwh4q4dqey0yqs6nb8exb8lbtt838xmp5cvx7yd26aq1e50u4e8mdh0xtnugwi38iuda88sjzdbzebmuatbt9g11pwcemwg1q7anmoskm93qf5g1h7dbzz26spy9e8jp62y6tlu3n0j9nhzawzjqvu7coe3stjs7hx4xe5o6p95ve22m8fo6l0wbxckylqz7l6w5jzgkhuq2md7ym7543ceqdgt26dnyx3hh0w90a3gdljmmn341eq6q4ro7vq2fokhm3dixgb',
                proxyHost: 'wqrh27jt725d4carc0yaghhjj3pqo02g0dwc0e50glo0toqfqjdn74fdw79j',
                proxyPort: 4301940884,
                destination: 'nhlwbt2br93g7vxfup1fi3oxumufb6lkw9jm9uywsudb9879evkohv8q54ex0ujhms0emszjubiv4u7llydfkco2jlfpq1vogs55ymu8hjrlo7r9xs6hnnt04i6sotxq2yw8j09aen2orx2n56a600ntnji7m6nx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w54n8uchl9yigmyjozqx1dwka8p7t4f9d2jsbw959al34mvxvwon0gsr1f2v4dfgt1hknxvxup06xw9c8owaqmtr01cl3dc7ehdxie8nqzo54kkewhgu4mri03upb5wnjqidh9xz8oxpj3h9cfkafkdwtdixf58e',
                responsibleUserAccountName: 'kej9p5ksbz0x3jfl3ct1',
                lastChangeUserAccount: 'bcyybqxudpxs87tqh8zq',
                lastChangedAt: '2020-08-31 01:51:06',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '91nixczxhttwfgomszqeuk6ev36rt4zcrffcbwc6',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'k3adayptp5v5xmwyjbpuynq07gicyc571f7876z2ganhhlk7rc',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'g01vqbksvns7nj97hf1a',
                party: '44l21lq7fealcz258eln7lgyvqkbfmkli6twj0bdiivfb5esx67e3hi2jou2k3gym261wryjh13x90at40zq4b154n3dxga4mioy2151w5rpgojzzdgbvu0n5c1zpcnd306s2vsm06w1em3wz6xzo1c6rokg36j8',
                component: '9r5xoskrbhkp1k8jr9dwp5flgtrak7slpe2h678kgovwbbm02n1fi4b7injcg2uml1bwy09olkfp5r5emvoc7hcy97vmatvcctu39b6aj3km920wzml4kizsfiv31ayf2xolqy7v0uot2qxyc55q22azxggddhg7',
                name: '843iz9ij19j5zlibd51z22vs8h80sv6gokwe47jj8epg396cz1anvehbeb8yeydlbze58v9uel3fqrqifzwobwfvfgmm9xvofkk81812xvvzh9b4co174sggjfq1atkichxxfkf3zjgjh3dln2pj2tb3nqfy7jiv',
                flowHash: '1kwg0n0rooxt5vnnmrpifd73z3rudg5ugt2zxp8c',
                flowParty: 'lmi2h65x675sybf7ojpbmy5y623fv4d14uors5176ljuevrunif21nun1mqmft6kz8jfcwd9le39gaqlxll3bvjj9j1ojsgxhxxccr6hgyiedq92lpa1iv2k62wx80gbulq0q7ge7hl9x19xu2rfda0ij6w82liv',
                flowComponent: 'twsv4fjxhf1g549u1j99wtvgyg0q7g5hhb2lpz40abxkr03fvqqjqvzn2m8glyodrzqxxrk5yuv5ik2ho8ie315xb0yg0ebedpc19b2lcech8kav5kcgcfu7jurmev50dpa6rznenosdytpnlifvqq3znnwqs6cr',
                flowInterfaceName: '6ukpt8d7q9jwakzhlhotftu6wqfd27j97be1wmkad5hnyf2f724h82jkp0kiuut3rqnac8goc0hgwb4yacqc4x6l0fbehpdwqidcaiajz4dmaqwwu9914j1cwqtkadsoojzagflqgghlpik68n6wnx0s0cr5oaw5',
                flowInterfaceNamespace: 'bu54zxyz18ggpu2dy5wkpeoywvdpx16vxru6iuk7njorob1ts4qv2we632rd8wpd70xsa30zbggnxf5rd140paa1h3afi03ykyo35s6m1s072gpg482xkm6p6ledgglmefjuknpeji85jsuk5qfsjvhyfw60knn8',
                version: '18rgb9g3tv0f5tmfmgkm',
                adapterType: 'mlxrsrbh7fy8vw1wt5ujc8562opnn9tjpftwngkxt2wsr39p0gle932451f9',
                direction: 'RECEIVER',
                transportProtocol: 's4ry6r69gqkz55jcmbln5ig3clbzajnfrsn95kx9bo3qplojs8bx8fobi3js',
                messageProtocol: 'ybhwqiptswx33qg0nwlyvzyv6rwkin2vggfn8gwmsusvxofkstl0om4c12ny',
                adapterEngineName: 'hk02eq3qgwe2a52z269u294vubx3oan9n9xhcu7bc4ycpabnsmehzekmaet073a4es6gk6w9sulej4ksi8zx9cfhz76jaynws9ghuwwkg3s9h6nnssr4o9pd8bxg0jgt0v1zlofwfs9705m01i0kgo1v2krgtppi3',
                url: 'cj682rknc5jzkpw9354iqkgn2tx5iznnz9nvbkelxpvlnh7d6fzvzqcbp12qgotr2rtfgodq9h96jplccgxkr0jtifhclxsfnbxq5b5kjfumrrpvh1e797aayt8sxnjlcwceqijoh4bcaus5aox8sbayjpaejczuzi4ndjh7u0wo5fvcql241djytdbbjbxbu4ojzjy9o6aw1lsbympwcte8656iijfpc5ycmmzzn90evrui3h8ncjhv76gb9349t3da77nctdszs967w7pb3w37f7v58izzq47116139d7j6ktzmcx6aww4v6436y69',
                username: 'ksv3hl4ci7jq69bjk24gtspzq7e0yf3z0zn3iu6qji7ypulwyiy4uz9z8nsr',
                remoteHost: '8qj0pytjkxxry0kb7oda584mf26fhxnnxyj7719utcexx3bvjyfj04dfldzfubqvc4k4j1xw0seupfh862xs36ke3mf65p3aw1v2u6yq3ptmb4ybqtujkvb45qamrrypgzq3ou3up4uku478yf043w7hg834pqlc',
                remotePort: 1034427318,
                directory: 'vx6ssngis6ki7elesk80two5yh6d7l8v1x2c1nwuosu7d0a8xtdoxra3dlykofqwsx6kbanelnz0h9ojor28u6p1165aodcvqx0nw6sghxabt3a3fqy1jlj5dhndj5s0bkruw86qya6w8z5ha3d2mjmxcq06t59uusu2g6srtkutikc8ilyx36qmxeut3lkqra1vhzude9o0ysa0a0vek8lgr2wpyiaodgvk1nhzuyy40c0jtxh43go4rx2wzqbpc9bgcx1ocvula80bmtcn8yhcrv8hj79ecc4tak3ltg7ikojzhxx1c41iduvonly2vtuscn3gch578dm34ecym94u1z91xjvmkiyqsjfaclafzt87y6pib7kliyqcinminlk4uvp9zbss6utrc5r9pd5gzfpv0eloffg0e034tosnmjlc6s0det67e7ze69dgt6gkg88o8ddbo45z9tywp4qtcew57b3eaknllgvy5lr30t33k61wonlvzdza3j277sndli8hhzys5scbljwjglffdqmwcd7ning9z2s7hqe4xtkf8eut0tv4xmvcjf1vv5hp2ksvps153hjmdm2nzmpw6cpb9gdu9jd9597ystxb0sel3rot4llovoe5td7sf9p4df91nl8v32rznoyexxe5w739c5al51wusq1jtzgmbqa777apyite5rgloqssrlev0xv3f73yuk07kk0mrnwasawryqunt9sl78u57u72yhknfkl6wnb8eudy699ov3tki3glsgyo96c1a2pqj6lic580quj7k2wm2a337k3y8mo1q27kyq4ys1aol4xpxx2gp4947fh4sxhj95kdavn7twts59ac78vyulie3i7j73szr5kjiaw1975im4rpby2xy7wlim35oer4ktzbw2zm8i7eraodf533ouvrzncynaseo8po9cqczpqelhj8iuqj5pepxxdn53977bnxht59haq1gv7slddi0repdwvwthzzcqbgjzz7f5240d7g',
                fileSchema: '72yfok0xrp0np58f6r7b2fbseknglohvthvdswl5e32wmydsoowlqgudbduzmly6hxycvx9wizzghpr1ru8yuav8r1t0xs64y193qyzkn3fhi0pj2o7wghkcvacnj4394qlz34tvawy0syk37m2j6p1ljl6x0z4yxqnlvr1819xy3duri2q3c1j8pz7qjih9669nins6wtx6j5b5x8f5nxpkbwkne1n3zz4on2dkf6l5njtrm8h78b8hm1fqwwnwwlcx7f26ac1duytinarieegerudwbfwqc4222jnx8ugsp5psmetno7k6o3kyktaw6yddnoekyuzw88lbmn01ank30uumswpiu7wq7c46fbpln2g5pvt315d2h9cu5r12fllleduwwa661g7dzgigu7j9xltsprewrl2x4ehoxxt4rg0algtzmnizjvd5ktyq82rubn2qm9csyavljwm83i0vyzp772hfwrmrttp9r8dudhank37yyik3ce66polg7vabrc5vyhq9oqdjt538jztje80wxglgy3tlw7bgg1pdpea9rjk4rv7ahxis51iu1g070088mcxqfnoy7q9u6r7fbrpzw6i4z75o0o6glwgx0w4kyp4u6ot253z5bldhkxawogdrrgeo5zdmjn7htbpquuflhjsvhqbgvdnuf4tutvsf3qivkag80jwczcr6fmzt485dptsjocqk8e0j3v4j0h2eiyr78q5ddpxejvfyhzuyxwojtiilf9f6jpflli9ttbjvce1riw5n1w332diqt4fr2p2gpwm3k6pvknq5ewxyrxf9p8kon4o0inm04dbsasiyxx8anhtr1jud3t6jt3jr43opsdiu3jsifw41bm2v01y3nl3u5dm1rnsrn3qpgfc1mhr845pq5ksfl5cz08qcz3u3as628hd3eh8aa9qr01nnpmovtunauh874h4e3v3v9ql2xh5mdwfoi1tmocuy3jljwpjtbi6qmhc8b3tkexexp0xuxdbl1fvm',
                proxyHost: 'epj26edky9u355qlykmba8jr4rjp1bdqfn8mjxt0hm4fimbv6sz3o2ux7qv4',
                proxyPort: 9077827290,
                destination: 'hvkevrefy18wt2nh384r1ntsnysnzwj2zhcpiezowd9fgj4ecr1eu1wbjh2psg0o70riaspvxh3duceqol0xf59zoqwzuu54twvsa8p12ttga8txqns3szu68srhua3r5sya4yb80awey8zj60mf9huy79dv26bi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cu8mtkncvrew06c1j9f8b4lmvwv0s1ecx09lb8fv53ujflych6sto5l4p3w8njdxf2hvhog9qevfuqz3uijmoysjwf7osi2cwllkiaygjlnh0wjbc5zq1av60eac3qljft2oglh8pft5fu1n5brbkgfu0hyzfkqy',
                responsibleUserAccountName: '7afnig1kpm81an7w56io',
                lastChangeUserAccount: '4vq6jnr5s59h03mn2r8n',
                lastChangedAt: '2020-08-30 21:50:49',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'rqo8s18m2za6t5k7cep870bgadb2m168tyzmmrt7',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'zcyj50v6c0kank4rijuzmpjfrv3o4ozmiqsv36t629r8mme1o9',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '50dxgkp6lvtap80zdd0j',
                party: 'g77dk8gi3nxyk1sr7tuvc1jndt2efy3dq35iw0theppfzobx6vy4r5rscuqazewijitbtx1qpwsg9wpor27jzju5ljb7aqhv0rr5coev40aeqhn93an0lsc3rdbsri48avhowavhwogea2sgntw2nams9qtsunzu',
                component: 'mxpphu7b0q1l5xs4txkz4c7bnb8m34s3xidw3o9w929pv4e8nx9unjl1omdeh3i67m2bkrg27o8levykpmgud99u2f5gr3slkrjkayzgxas2h2n8ejj9sqs00d52tc4x8ywqxuz77t0rcvea2z60s553aons3pgy',
                name: 'faax2sm6f57ycvvcpplp5zh40acfhj5njy8kuq9k9yv5nia5kfkdmrk5bwxkilw5a37riaq1tvmboib3hr0kfi6nox8p12k1460rxjgrvxveb895z6u2m6na2zka17e6zn8u4pibhqri2dr7jh2p52d7auavyonb',
                flowHash: 'l6hs47wu7mc9ffqpik8ihe1jww6h1ctvi36d767y',
                flowParty: 'x8bgmlrxgvm0s9ibx69bzud2eu5sxlmv1zllm348eisdxbqrgb4gnglcxgvf81smza4izrvbr84cfjbbiedts2r7j522qrt30xm00drq06gqsce7kz0tvamxftzx8klm63brg0qllrgrdw88go1bwfoi6uc9evck',
                flowComponent: '9w524gsioiov2u3xo02pdqsjz3093xkvfcfe02g3oucushl0ndkfsavzzv2icvdkn222k0gpbxq23ffvgrvk7ebjuf9adadhnaro62qhiongkiyki9p2biixu4faixxveoejdjt7zg5hz6camj2urd8r0y7it4uu',
                flowInterfaceName: 'fjsf6m4nmjak0q1d4yjw5ywv7m5e57pw44bd9v1idmcvv3synfssdt41wj1j5e0h61k6j6yk34pmsgqlx2cplkeit5uflbh2pnxj6fkhrfrs34oyhq6mghep7trqdannytymwkhzkbczx9ahzxeh4mvcpsxsbv1k',
                flowInterfaceNamespace: 'zztnby00y7o6nntiuhfkdmggxs8qnwu9mgrbohqa3hjx4b3ttjl1yj4w974mdw8uu6sq7pxlpqaupsgf40v7vxjqxo76alccmg09xkl6okqjybyoeetzujmlf4pw9prf97obz3z7oovkdkgx1b2uzrwqwe5rgrh1',
                version: 'twlv8s34fwlxizsldgwu',
                adapterType: 'omaslwpylo8fsk35e3a94uhdgzxwneh8flgxpsv55pgfm7n9brhz16cox5qf',
                direction: 'SENDER',
                transportProtocol: 'qf96dwd6qsetjabroy9fym1xz44hs1e3n8rts5o0o5rhih8zlt6g7tfnyclb',
                messageProtocol: 'k2n7dej7tx09p6j102bhjrxsgcoh4zd5e821hxcz2q62d1gxvzk8bfzjg2ct',
                adapterEngineName: 'jkj9q57ohfrrixi8z7071ag1lab7neu0p6qbz32q4zzs3h65wmue5l6rupp9shbvxtkhdrmhwtfti5h7c7rr8mx1ahoc43ss73b37tbx9q7mndychopkruj83zb4qr61o6ym45ebf9z9edz8jw58kqas27k5oc5w',
                url: 'j4zmklum8zv19jztbttvqq1lcwrsliy4m9qn8vljs9smfx3oj03fxjt6tfkt7g3uaclj9s9k8rlhfuhazzo2gb08kxe4jc9eifwwgyunvk083mustmgsvzl9sv99hav2cx94ql1akhwg3ch4sq1hr6jhzs8wr4lcniix7mxemgdwqzu1cw5502nw7mailinvrvuznt1e1r2k02xo0q7ec1ucvbkin9hacne4ejf58b5r6x4zbfaobre3zzwk0qa5xtj7fq2j1mrtqvxiamdxktd539j5w627g3ff3eaonrdzyk8dmw2fw6gbcoa7jutaz',
                username: 'o4182695xl4cs7jbzlql69ze2ic58j0mv13p513n4kgih2pojfmnczzuopta',
                remoteHost: 'yjpq1rhy2iwuzps9gz3k78bnqewa213ai4bvrpr8zxvkab51nzhvim3qnu1awl3forfw1limx8pxmdz0zz81hfqmt0sd8aow64qfc9d1t87c9v8njj50k3aluvwkl7tph9actpq1ttfdmo2hk7nkzanxe1b4hpzr',
                remotePort: 3793210234,
                directory: 'wzhqoqhh3991qpuk4lne2pvt5tfr47i0dy9uow5sw4xabholc4vzwez2hcggolmrjd3021txpxonxns1874t9doyfhpor6dw27usqgilksn4md4qx9lbf60s4q13iqjx5oucri0232g8y1xk32cdhrqtz2pq0zdmzfvmf6af1powbtocgjjgqaswzmi5wscxmf7jjgoyniun5ajhmzq9v0a0h7fk76xfu6f9u2p2nkfexrxc363f0xjm75gru7mtv1x1malu7ypfe0dd0z9dhr4fjoexiymitjv2vv9q30e908f0yafiz22rhpry1xqh7w29ip77vcyynta4yipdncjpsmwfhg5wqsyopi14ic5y4nk7akb85n3quehujbpe8syz0lzwltjcemlyzeamzrmryl7tnndw6vhuqqhxraahac5i7r3chmn20ugld6hlt5f74jm1839vsl0gbir73mpu5o7xwzw2704nemvmv76rbm2hrvp2zbro7e85tvsuszk9rulikyrdyztmyk3nkxdnoaggcztysm7q8cq04nlh1gbf7jxgib1yz3v8rl22fg4xuxzi7wpmtlyq7fzecgmw71vczu4vd982z02tgpknsdrfnds0n49ka8d2di0xz573ynrsfjopvnrmzedm1u6q0w0eqbuvqs9p2ntjpr2u84rtvz3ny2vkw24vli65oxp9waztx9ws6lkugi0zycet14et0l7bot21nz3zhrf0ehb4xm5gd5htb6xdykc3f3r3bohvnqtotdrb997cxkaoq81ua5fqv855bf4ghfl9nubaane59xg4ay7nwvbyn0pi8kqrals5obxdbc4nuugg3sd2h8ah8k3ehv64of6zr1gwd3l5bk9p5a1evh9udh1edb9zodloidf1f8nhcb4lgfs92ctiu1h48v8gzux4z764nyp2v3x8gxgb5qkixiablrzd323fis7mfaotaxicjwtt6dgm7xfmsqs4j9hx6104z1aobgm031qm1tv7',
                fileSchema: 'q5ymy1ti5ottb8d1x73tl2etcqi9lt3jydfhw1jmqnonyzmgx1tz5942s1ux54jr57zhdonkmpbt4r71f83z73onxflexcvvhv5u83y14jazmppfys5wlsazqj9cfmni194r4de4pe9ahtmpbn6g6abywjcr51zol0p1e2fxn9lucpvmka3dl8hb601cneeaf8wdhwp6l3lckxaa4m4f6kvyvkbgm8oho9sm5lzy21lfhkuejcnduqtr2039x9as953wqty0yimv98day7schbgzdbt0c0q2xbg752nz4nkgfiewazpd0kpg4abdi34j4k6lnpv1u5s94ksym3kdwmx2b9vzq5sr6nxdvimbms19dffqgxummaxzymeil821jipiqxl5uot7f2w24jdlihbc3dvn3u53jvlpus683bcwg6x0whkip82kgcvcmea0bc8l08wypaoea1czjpgzk4wspsgiermgyvzl7gljfvgrr4c1q1gj93ing5r8jlyaupv48tpxzx9kn4tcvb2hvi5dlw78jpccui181nympkeigmqec1ttvgrr4yxc4fcn0sl2kel1heash108brlyetzdz3i6405glx9dl9ppk1f300c93jls2wdilqov8crh1y236959a54k9r68g9q4bl99nhx07iyq14pkt7aurrlmbd9ki3prp6a5pba96wriqbmsyf5q727jwzsf3qdhdne4ewae4w2rfj1lfmnbhro1g5nprx7kzmjtvgkreqdw5bo8zlhafsofsvbcm0zj91y08rvu1nlc6ti0rd4kavn3lugbnqdkozyy12r0ievrxol1q7fgzx5cma2ycs3q2j9xcoro6zb0p3z3qkacsl7uu3j48ab4kelur4l3c2y27ka8zraymazftjt35hryrgb3ctho7rgb8uxgfegk6i26nm5y0kg0dhgiu5kg79kyzduowjv7ach79drigrrosg8nzkxuhinzggianjupjo1pq0afdifi1xy0ly9ysfuk',
                proxyHost: '78oq34rwnb82do3txxl0lzvji6i5xgqxorr84zrvufd26pjusasxvrddqtqf',
                proxyPort: 3266809941,
                destination: 'cidgfzaouvzf0y7gh4i0gcmjgq50dbv5md0o00qetn0w7gwihjwgm8mm62aoc0vv89jrdy6cuinbv0mzyksx5q3aouqqaw6flgco5jt733wln9saws9xweum2dt30zzdty6lhla06bov47xh2w8ifeqvo3zk4ryu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h7o3310s1dd4rwhwfmnz73ndf70quoulx2qg8zew4yyqb7spkyi0txjisoxh767p0ac8apxtsvmczdgtcga237s7urgm4m19sccorm4d7qee6t56a0vvi95ttrmse659bxnu5jfjsyu0zw9oytvcpe8qs7d3j2qi',
                responsibleUserAccountName: 'jaawh0jm8cmmj7lzilzo',
                lastChangeUserAccount: 'scz45mv2zjvh8me0j7d6',
                lastChangedAt: '2020-08-30 23:37:34',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '756wb4czp8oezi2noaf0v9zacwkiludaxoquuuxx',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '43gq7qflf75r0dluuqgnkhfb1ocjl9schxv50xeiimenxjg785',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '4jkpefh1iermf0rl836z',
                party: 'drycn258833m47clwhtfs8vu5pvz5x52ihid8v3mry6va62vyx54i95pnmk92w4jizuadmas74johe97ywf0osvo9zohhdlvt59xve7j50e63srzif4xdf6ajatgzievjkr84g6p6qwqnob2gwoysfroy2df9fnd',
                component: 'imnmna8773hru9a3wiv6glzvoih8ypawhcotm0yufts7lbt23665er7t2nggvbrxfkkw14aedjah5bhbjntrfu4lrq2vyp16emvrwhlebwm9aiovmdfjtux59ff1220d6uqyie07a6o6gw5jnio4qgij51xooh1u',
                name: '1q6dwl07h6df9e686p9444shpgoipl1bp8ry4gf6np7alnd2ektlooic48e4dklsyzgmvt672kyyg2baqfj84e8mm3gvxb6yimwnaj3xkrl1qmgnvrowl8tey78f03rh1l2x5kolu3te5vitn3buuofu4oyxkjjz',
                flowHash: '5oz3kigupwkv86f4w5503d8ljptf4sw7kv29wo3z',
                flowParty: 'fkw5xghue8f3ds7g67dvyln8f6x2yts3nokb5migd1hejk0nhvgy5y1pugc7c5nxvdtln9uou13pjbyxgan74g0sewswxae54x1klqxkfzuaztxzwf55nswwqwxl1e7hcz64m52jyibxsa72oh85mgi509pcwpyn',
                flowComponent: 's1id0gvzovi7f3ykjh4koqvxc1hyv96ynvofmmschba6pk7ez96llxdosepzunkyc98209gws8rkq5zy42fthuxzq4i5mum4i6wnprh8kiqirz5u9w17t6q3z030v5v5xisoskokvakulnxtlempflrzejho6utp',
                flowInterfaceName: '6n8gvwtuel0mduxm4roaa81aq2f5g0sr8r1soafkptofybpurj7fcwpakh6flvyupba5yjxkxh3m84ipf94rmpivdpo05v0mbo60p7q3lm7ntavsx95abv9d10pd9az05f4lxlh5gcqdc5lvdvijba4logkrrm4q',
                flowInterfaceNamespace: '10h4f7m8hf7w62fokfmxc0o3wsoxtann4p2lretr6b4ot25n8wegmchr2pia4cn09kq0gz3yvcfgawd07e6d4xy5053cof49pr37iipwgqq9q4r2lx7zmqfdu9yuvvamfqejdcnk81zhkinamk0pf025wd1pwcjp',
                version: 'qcdyqzdyplodu1avnw7y',
                adapterType: 'kf4g4saulrn41zzfwn142rlsjc0h8zb9uq0ikbig9djfbrk54im3g4yt9dvu',
                direction: 'RECEIVER',
                transportProtocol: 'r8b00o61uxakzwsg223jewb5chxbcupgwo5yw9inj4b3tvmyihf8fkldkiti',
                messageProtocol: 'wwm36buqfcmnf6xjp6ikzfrhsi2krudorxkdo16p258tmud6ehfr0lxax02g',
                adapterEngineName: 'ohpdtrm44c5xw6rtlxagktadwahiymc4e3td969ea77q1t18plmdgwv6c6yp8o9z2g73z81lhxjuc7wq5e1q6f3ibzs20264ffqbrsnd0sfsyqhmr98vuae4t178r9lvnd9oed6sm6pe14uc4ff6r1hsx06anf1u',
                url: 'e1qang4zo9510x53cdb3egxz66knkxoavagjmce34kfb6z3kaoi5f5vdslrb23ehxbqmje3yad7dmlk1nsh4i08uip0z25qp3p5esnopfo4e22j7gtkkigekbq23fmkye14883duqz9px3qoifaaq1aent5qu6jjaxuogpxuk364gyoxfexxo830k7mesbi1jm3sl8xnoekgjspo6tagx2cpirwi06hnt41k7a14zjf55yy8jbn282r4eku16gttuxw9mp0af0ugaxbk3grjfj49iyp2bs9uf0kguanwvgkb0511tfpo8v8bpwczll13',
                username: 'ubccri268s13yanwtq50k830yt7fnyxmo9277t7kbp8zx9p4yn7e7gdzr1o4c',
                remoteHost: 'hcqxi0f6ugene5bchwcsuivhtm8z267739yb7d7yau83rsebc3se7tam0oeqomc7osvbq4azbolj19r75hesxkugtzq9yyvuhce82xhcpt9dqsn2p0ufd5lbncs7yuws9qkdo3e28ieeetuakg5lanv7h5u0dpjv',
                remotePort: 8881349745,
                directory: 'm9xahd72xsl0ps5ngolwzw2mk3aes0n5jvzbg6v2h19e7zg37k8f42qyywm9nqun9zm9fyce0lwbomgy0ac5388xq0zkaq2k1vavpjvoynpuvlio1kkyon13khgjc45bcb2clubx50a2wvlinc50ebrebv2jx04qmcc0k1giipwye7reqk9ukq837gsey4f7qyfr3pu40db7pzl4ajw2g9d6y74341afsnaowcqmxwq9zxyv9oxvlv3skoiaahpkotzj7z49u355g4bz1cgu936fcyzk3zt17ahkpnmpgvopf7xkz9bp358c1mzqkpua8ncerjfuf20r0vqg1zjanl85a09yzvooos7lefwsz8row12lt9iefy5xbs63v3td4267zf3ua1qo7a6mctitmbwydx3nc9emr40ortadxppe5qrdfuzuioac05erdaw0s6ztsfbtmj14bcyw23eaey4512694uian2jo515x4n3knoq7oc072zfnb3pgein4oqvfrz4vah6mytaqui43fsn4de5ddznc1j7mm69ipahkx2x9iy7axsrrec4mig4yocn5oj9zfep3mqlzo22rtufplt3o3l0rufz5or5bu5a5og6c4js3wbrtnwp4tr5s41awt41z6bmfzahjia5tq25ijn8bzp813ut0qkjmq6o4f8ad72k37wkv9zyr9il2vpp6iv33l3p17ars2n73es3vxgtvkkdkgr81c78zxxkf2j0czwflnkighdhtkeb3qp0m2etgcyo33qvcsy2ap1eogx4i0avf8k1assmb3wax3ubr1q1jvjyb54tcwekkht06e3fg5950gbk90tyrskb2nl1xlc83lfk0r3ewsa1nb88g864v4evgd6u3jqpel8sdxadb8m1da9rrmqj7mk43lybj6cp4m5f66869skmhfshzghfx23s17zk48ojvu5mskzubcvuakln7jjyca2w5ptk93qpa4ryqyfinnjej2cyl45ir74d58dekb3jq',
                fileSchema: '1h8hg2jlmmo0yvj5ryn7lw651a3wy7ef8z21gx4cldo5ope69y71p7va0jz3l0u32zo5vgmnls6hdp0mz2cei7rm6nhvp3joxvnsezev5wjngbba69irgdjjuwczjgwl0hi8eondw4qes6a7k197ja9h7p06jgq11piiytfbnabv0e9g1808jmsbqijpwn6c94kphhok0k5p769oghdtytojyu65s014nhuy11simkm30486ivpvckq0u4x1rhianlnjfq1t8sq1kgtw22rh3brp9ppwh4tmy3gr6ed6z4ba5ndgv2snal28k7wy32qmym1c7tqjozxw76zp2ashoi7ltnrpe90hna4o18l7zq8yu27n5cl9rv4tfir5yfs77ab4wve0lb5ytgdvvs5rzchousmqk41gr9laeikrvrc5y61t4ulu3flbnma7jhpjixzz2nwuf7l41v1x414brx434j7ey1ygow3jhb0wrqcanuzsp8a2jka3a2lbwhujk22z6znj6pu17kptbfnlyzsks9aenas5mzb5ghlczrbkf5mwzx94ixwztvjqzf47caenp7n2z7h8wokl9w7bjnzvv42jtt24mwyxmldz0opbsfiyb7o1jy403u949fvwq9mbau657njw927ttkhr99d1q8gls801swsmxho83mv93rzezzk423dg27irh48srb39j1n721bs4wh93d4pug0dx0w0llrrmmf16hknrs4p186eb8mo42666mrf4vtxdtgg4x8df3397kwb2rm0xvc8p9vchxkhg5ofwddssmpm34xl1xur9qv0kb85imvas13xx3f10k0aiistw31pxq4lug4ro1zcwht3l25hd9w6k9feqtxq5byjsqdaqryt6d69cvd4dfktwcueslulif7raeyvsfd9tw18fn0lq8f9uzv1t4hb3v2yg7hg9lbzal9b10gh2lodegxnlodydag0d4nkb18zbpzv84pfbiqi924do7pcm5dagj1i6mzz',
                proxyHost: 'ddd36kn5431rpf4p4osc94z36xxrhijf6rrl6q3jx7dpwtv3r8dojom3ug0q',
                proxyPort: 5746646385,
                destination: 'm70yvbprelix96vh4m3ruf7auc90apx8nuiijbq47jcthh8aau6d5joyxtmfyctbhc04kuxv69j61vgrtovy17ciy5chsftbwlhtc6bf1sdeg9nc606awmxifbqs4bzc2l1zbmojr6m88ctl5xhbusv93qyrs50t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x09wbgntjky1z3icymxgoqtwou19q7ezztovts4l2fpysys4rfh8fp7cdep8izentfqylb42tntquwoe0byc9siiky9i2xf9glyzqyfu77ireytri9m6caiqn2v4jn7yck255zjb2ifolmo68rij6vybr8ysddu1',
                responsibleUserAccountName: 'onbvloqawenucz5o21gb',
                lastChangeUserAccount: '2csv6tvhy83n46fiidgn',
                lastChangedAt: '2020-08-31 05:26:22',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '614me9xhd4u04dowqj61aymmtyhs5b5wjfjmtaq5',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'bph9ot4uma8ko7u5ia16v1loj6qp800g1vvqx4cvkbqo8t66ve',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'kk96k22b0mhiu063na8z',
                party: 'c096760ubneqh8y046b2pee9wd14rax59un4liebf292jd92791zkmz4xnc6creuyl521nun7z2khl9k49km967milm6y53ghfd7ly79fic2ax19nll9i8kdtsk4kdqvqs8whfy3173asv6dhcjz1tk870zhbsd8',
                component: 'mi4aluce3u5g0vpmbrlt5ncrxun1536mr3fqxgygoxtxkf72scodfm48o2qozu4672nxsxv8e1huwhiotou5a79ovqt0az258fdusdtyz8jx9b7jcliua7i5c0shvtxlf5le8xditib4qg2069wa49hz2xuaogsh',
                name: 'yc4iesf5aq2wa3dza2om0mxq28bmrwun6fxv9bjjewmnztdd2qvnl7kqmlxp4kuj7ihnnp7jcwkozfuekoqemar6ybvd8xa7fbgfnsnon589p8g0rpj7q9p4s5jquze7y233wzczqsct9lfp4t5sozbivl6xosfk',
                flowHash: 'ilqshdbl7dx2n3sjwoepcs4polqht7imge9z717n',
                flowParty: 'ep06syq7qhuyi8qxr6jqw17x2d9rvweqrif7iv1gdg6heq1jhyh9qaf0b7648brc9tefmtw28u0554188poghk4i9j9eb8sgov0gp4ec5il46vwtgtdob7y7wlynr6xeftm0161sj8yxcl0n8es8vgpqalnkhhv6',
                flowComponent: 'j2lxlo1dq8sqt8hje8dug9ntirfupx72x7tz3g032xmtna9yu36bkrjmo3yanu72dcc1xdcmm6u75jnubnzeagvn8gh72l90hcj6jdkqws0kpas5e10gaj7axevnydcaxwbug4e1di9iu4b8n12b3ve8zqx9eutm',
                flowInterfaceName: 'ai3svm1cohe1fm864o7h8x5nmbqd6por8pxn99ge87kko99uh4xybkz6ginag6pdylx7ltipfx9eg68wibqimxaqngxojcetffb2jxiz0phn0tlfcljosjgcpn6st2gf7yfeahxrosp2bnvudtwnqw8d6l7p8vif',
                flowInterfaceNamespace: 'y0314yozg4begbmj8n5l1o44umchocirrbyogxadd0ukfmgts6tah14aa74g5rvt18y0qgp8g29byaf66hr3nqc1ykgpsurhinx45km86a7n0bqj5ufvi3ivb75fmu9in70w56km3ff6lqjige80ym8lgsuspjbf',
                version: 'al3eqwvqohfjnnv8uwax',
                adapterType: 'hb3hk0xjj3faj1t13c4ny4fg032ilv9hf04f4oxidxb3clxfwxwu97m6c0uc',
                direction: 'SENDER',
                transportProtocol: '78n5fd8igyulpgkw7efjalscwq7ylnq9mlkccvt8ny78a0u1nvelti6fbmi0',
                messageProtocol: 'zd715gbjv344w0zfso4xmexal535fqzcld2f91lmct7nh48ij29vjie2tg3v',
                adapterEngineName: 'vg00e64pkjw2uygk66utfsupeaid2g35n0yrm1xdkj40dag03s24o0xrid4dutilt5ifsg4injap7dmw3cmqhj48y9o8lqalg9lty2vjib9gdfunm5cc96pxwnxue930d7lnd0apxg1p39tv2fk8edc2ooeimhv0',
                url: 'f2fclytgb2aix4amdcf53y4fgkksnvzrhqw457vkme5np2oh6h1bqmjivetly3ls5p9ee56eovcm2z3ypib3sf47q4y5675n7siebnhn3jru178ped0jxioae8h0n24glmamblgnkeqrx97qci16koll1bxyl5zw5snuqyj4cqj2kkmlij4zpz6mplrb5y4s212xecu0p3trm53b02rd3fy3tm92xkgdpou53zfsaz13gryx0ld5qa1c9qhxoo0ls5jmzaimdxuzluk0gdae6k6brgkglnawxgm6myhkzwv1vxwer4zlzz1ft51x5437',
                username: '11cvbkwgr1rd3fdzdxma77ncw5wu99w47toylzuso89x1vj5alkd9lpwfb0p',
                remoteHost: '47vwlmhjmq3znt9wi1kpqbdgpd67c8soniq8termo2zuchv1te1pzqitkst4v7cg0uxaa6xzsquxrtg82z5ccia1l06y17wla4m0gd5ghmcelt9pape6sbiwnmcdqphpxq7co558wa2khngaquw42xpt7b0uvu2s3',
                remotePort: 2415513147,
                directory: '5jlc2600tiunx0pvkorltwo1d2jlrq596z1wio41786q7nuua4fgzixiy3y52k3ph0jsb7zgsy9lj3qv6hxt76wdy5wi956ddxpdkp7ksclrtqc8m47b2c2cr6mnr48rdjoeap2bdqt8b8f83eu63u8woohb5u1diky7c1ih0pb4eqsy5wb56j55er4jogf9ymdr9kabzfri45zdenqg5x85u8okyfhmlwgv08zwaj5qgbm4aun869oy1rlyhupy6km1k258skskh8jctdl3587q99csm5t9swv4w30xfhb1g91yk8anw5e604f1u5iv63eaul999pnbpbcpb4g7gau8tqcsfea01ovuwuqh26t1jogvvbubxbocwa8dczg91shmi8cp9htokpfpykqkdxgbu81vy34g75h5y6z55o27bzdb0ld1yjt8exotcue6dy2b3o4inmjq7bcquzp1c1qph28nxso040ptv7xnsqmmzwmuweqghq684c2u1m8gglicxwr9f5zrzh4vkvpb0powx78rcig25g1k8bv9txcfm5jcp93y53cmnj309vxxp56tc5ewr1h6n7lj1qimpiqig13f4q2zueon798qtm9bdyic4wynvr6jk1x4qaoe6lwdbodt1db16bt2fqv7nan96h3diqyb8rt5fi7ygk0vnsdy32qez6d2jcehcl7mpwtx5yo7cflrvi2xrxokbwcp0jblocc233qw16y0y2qturzklivtsxpf03l2ccozyxq75r88yl6ii5j1hi1ndx3lmhm45dzqye5c3jpsk02v9gq9rfy1rfk1kpo06ny7d9xn7b0v3wjzpynhh5fw8rg55skk930cpkxi6z4grwdn34mgl6w7z6oeyr6ns66yzziif11825bxt71bntfp7lldkv7llkq6tx290iktd58hs9pel69wmc3ddgi8oa9o6cwosw46a43s07ptq1miq4zcnqc7wm3rqnnovgz5nud2zbwnyapgmygmwa4oremv',
                fileSchema: 'wnsvydrbg4m8w1te8arqui1loiafpk2cb4rcp6hx92vvisbcgc3vs02pjiqylexwrk9wydorilaz5w2gu2k8uivxok6iuquss82ziwtaxw2dvs6eqiy0uliucasec6jsxq0ott2zbkav5zz2an04ybhnfjykn89v5twq3aabueyc8kox7znh7q7v90vhjds8183l1mc4l3o0ixut51hmstyhv31m7eqpg96b86rl9v5ikxqq0iqti59ce5n5vfrjopkreyzy19lyen1qx690mumfkhgtsak4wtch526ha3k4e3auzjinc0obzc53je5dc2abf4z535m0p2xnn344cl1rdcdyks9z9zu5pjlrxv84bc0jcdfzh9quhnphu7qu11q5ahr715tbi6a8ds76fncfev0r7fc6jhokb2ljj5m4re2xyjucvq6g7f2yjxlj46ye9cvvjjcuf0s7g4z6srippgjf4f13scijq35jzshjl4fgcxfq7s53sog22v6prehos9s4dhtchab5cbxuvc2mld4t8nx7m2ez9ye3n7a1ja70a7y87hchng6t5rg683ad4px1k1n2k8dxuswaoxwrmgrcvq79dc5zek0e1xe7x4ntykqtdc7s5mqmjp5n6dgfsk6b6o1rxiwb1zlklyc02v5bsidakwatspjd7baqlvdzbdej68nl68mibmix5071dk1wftrraggi8arevonur85iua0x9ep0eeg5q8hboy4ah05ut21g7k760kwhndjv6y8jnwjt4tqy6if4gxvi7e8ifwzxpahhyngc0o6ug1k47jgkiysto1v0bzejnpwf9n7tc9tc8zypt41nnqwuh3dj1m1k4y0c4hdf5gr31p37ik67yt5uhgea3oyhc98lp6gs2ttlposejc2q56c8fzme8phm9a6w10unfnehah6mylyifodal57yzob8ml2gmff88cwuigtasamq2qmxysj8rf2j4g6td12ep26z24ss15j25h1bwol352dy',
                proxyHost: '0z21n3wmq6o7wiazdawxwjkqnrn80php2gomgkixgonzrpwc8h6nyj3rs34o',
                proxyPort: 8287011530,
                destination: 'u7dqbw0tl8cnsgwhi3m0u97763dc53hzhea16mqeea706zmqmyyus9bzvgfkmmt6wuqfxryktes1z512rmu3z4q3et1d87onvzvmixtcgtedxlzo6ey9eg8mf1ltuvqt6wko5ff51kfkv1p15dw4ny6txi3l9f4a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wegwu60faelvm6wblb5j05d34b3tagghhow0vcd2zmkd7fy82y6s6xny8rii24mdk4r1i5ljbznh7ppvd3cp6n47t41btd8jcv0rrovcrg29b3kfmxwfrpoyg3ie2ivm3g1e1346thr1dk7mrehv1ulcs0josjx4',
                responsibleUserAccountName: '6da7a6q4s2363ez7k5oz',
                lastChangeUserAccount: 'zy98gobp118srzj7ofnj',
                lastChangedAt: '2020-08-31 10:49:29',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 't1lvv2gxbag5st6hyhrs9trhb4zx28q26p48m4r4',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'agvhfj0lxj029jobw48uvmscjmeayfmrbeagirmbc9imcblrv4',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '97xqrbkhdfgzdls4reqe',
                party: 'eud4mcnbs8k01yrlqo0hdke2d5quqr4bhno7234djyzax1y27fpbkewfr13o6hkcdh89rwhyca9kiybprvfnp253dom3n5w38mof0e7kj1ydbbppk0woc7yovgqir59c8c7dzbtu0u0wnmiuvombhpt9lxker456',
                component: '0kosum8wcznos43w9ecjmoxh5l6xjn6fsawljq5eclhh5tmw10pbo16u4vc1izp5piaye2v71e5r8af9fzxlo1vc27bpzb8yyta0nghbwg4t7kslpx5o04iaz5iu6usdqwie2oqf3cypoqfdznrea5ac974d8huu',
                name: 'pcqg478ab4xkad7liky9rtu38endzsfmc285rord0czlkq3dla6qfs2ztif3sup0nfqndb2cz36vxdl1p7obmlprkzluhlwi0ek74y2563ffg3rc7f8nobdmraunugzoh4nh3ns4dyau89z4aw1x9htgpg9qg34f',
                flowHash: 'aukefy9pa8rsma7efyj6n54666k69hufy3a2mchb',
                flowParty: 'yklj3xjrl8wd0g6ggh82uk3lu16wfhd544d8dvw27ivp185pqqoj1ukjt8jv1ec7l321f9t7uu3kg3unfu7kmtlhvdmdkpm4tqovydxwpb3cfhxp6ba9s5s1l1yngacducpg8sta985vgezkod2xwse6dw3l24lg',
                flowComponent: 'ejlgrbw2lo437u40fp582kmytkmu7oq0387mmujm2mwg55xpsfttg3711oju2cukeha9d9sjp3pfwngpcj8be2dpqczasaygtyy2lryhpz756j2mstmcu2vlk5noa1xwle5ergzhe5p5f5ftwzmz5kmsqihdmg7s',
                flowInterfaceName: '9sjvgq1amrdi7k4hup6tkixpslqv0sdadv7hw5gyj1w0u4cu0i7pwwjz13q4sfrbs65olyengarv46cdmfuokrokkv3q6tjvktwinrbig8glc4odfonvd4qtrne6nvqm3hp68wp1erdm0w8e0hzytb7457y1tefx',
                flowInterfaceNamespace: 'gi5zgljnf3y5qy1x4d1rhj1dhxpd35ws7krrxufq4152k7i7sn4jfv0hoirsfkqow68tefpz2jddqklbm1m0mxykrw7yjdpwd6nudg4hgwuqsaqnljjys6064ax3t72nu2tssscxkpw95hjr30rarzx3axqkcem9',
                version: 'kb0501b2nrstm2nn8qv5',
                adapterType: 'y64fti80ugychjnjm48bc3sthb7x9j9f8jroap5t142lv2xoh1tw5gmy4az2',
                direction: 'SENDER',
                transportProtocol: '85jjlml42llm9llbm3lxham8n3tl3k7dds2ehixzweg9wsrml0tz2q8clzbq',
                messageProtocol: 'uyan66h0jjpnam4y0uycts0dv5m1y9b647clv2xt72i9ulu5tj8dcfyqpogx',
                adapterEngineName: '8p7g8k22qq1s4y4e8s26l6h9auzco6fdkzcr75jaarymql006dzm2iwy7a3s6lmipn88d18clypm682lbbtr83oe3xk3ah59i70n2k0h4oz7dlazq77zbydt1crgv3pu53u95jtjfz12rjjqzcik7arpzf8w3dab',
                url: '3rp8jjpyvrpjmke8uli0r058fz2jxrjqjqccnb17wzzzy2kiofzm5qm9jddtn82j3u0pt2d2le9x7jm2gwdr2xkgxdwu3d1yyx4ia2v3k7ll7ufm6t72kdl2d0gg2dn1t31eaqqjx7g9lfihwfg1d5yuqzkrzp3o8t9jurndugq36vyw99deuxegpflvc6re3xdgj00sz0b67e0xq3n9otp5clcr35hrjtydwbzzy8rs5fa0syygu52vjypcdt64d5p2exk5peivk64zq9s2wj5f5col55yvd2ft052s9r8jgto5hkcj1dz411v1hzha',
                username: '8yj9657i4jaqvbeq61vgvhnn38w85789budylhf2nii852dmt3vgwd85724k',
                remoteHost: 'qgmsek114h52ooyeagv6lp8lx6zsw82mmbgzwxr3agu745ict1hst42n0yfpz2poycu7qhxgcsqetngwnvs25rblwmonw1jutx9kn6vzxunfbsmxvi4yo0nkzbpr12dvtonnvw8smk71igvi0ak7s0nuq8kzgesc',
                remotePort: 43025935220,
                directory: 'e6rhzu9yfz0jk0xqsyoyx5cw1vvdqoinv6vlsjhpbpkmvfxq4vl6k105cnk5zgrfk44muzsm5qgv1z1pzhb0bbipd31k5cppbngxbprpmxwlclzh3ucnpn49ld8afh95bkqp7052ek1bwiedm20wwme4mmvcrrcwospmxelzlot8ahba49wbrsrw07xnkyvxl5w50kd1u0334bk8gtugnfw4hjfiip7knylzkmmqlh4235albbemvcu2kncnvcsxuchv0ppbe5s4hhz196lds9bdow67s8y1uy9sost6c8jmy5qwm5xstax3rk5ht7lji2htz1wu7bgfxj9kh9fforawleyb6elidb01dko7ndyd7wtivpw54x9vg8cuktuppzt1ubx2x3fs851uql9m81x8ngtpg1vi0l293emwwbx5kr4ru9kllymq7yfmcjtxjxjqpr4dxzvyxmwms5344cnghcirkz6glfxxjy1s91yjuw0b3m4735f12le7tt1dpfmyci61stbofdib7fm2qmqd26tgc3bdarec04mhom10sc7mg5ajbsntrigahm9u22mepp1hr2bo4i97mldndm39fkpt45pl8jpmetmfrs4gz1w2rhmb7e8g0su7lepza8k8uoc3nsxnhhu45huw82parz0hlfcygdg98bu0c7bb7daaccf8eir9ausgkq3vc0hou06p9qq0d2dg7c1eitddbkk3himvkf8ue4q9aez4e5jw29opqohrc7erwiejgjny8ys94s4imfbwlfyn015nqj2foha7hzde273aqgkpr4qnwgihst5nuivmrp8rt9gdcv3z7ofw11d3fmsut7grq2llkwqkprmxfzurqzrmv81zf7pkzyob0fkytzt5l3urfrqibcxohvv8zzvs4in7qi4ctzfhjhhkuudop4d8ubf0dvolyhacuxxlq1uc65flr7arcpxazfts0nknxfezqb70olshv0h7p7ttp77evpbk333hg4skot82sw7e',
                fileSchema: 'l9t6xash6w3xl20yz9y0o5eyv13vt26a9y1hadxikyvnhec6300vpj4ajkeoynyz1hf263qql6g8ha9x8qr63evzl8trf70krwtpgi3xy0nf11oujr14n49myy3je6rw3m833glg4rvrj0ygizsxn2abndlhmauc4ngtdmpt9z8f0ty5kaxzr8mderaeqhkcji45a80qmxbzfrp555j1j2iuytjingu04bfib2mccb76v0ud5y4vswnsx6whrr9mycxhae5a318k6ali2fpd1fhkcgfqmizznflx3ofml9pxkhw7i2tw4dua1nkx7tp0sf4a8qrwg9daa13rxasfoueadqos73u721bpw7vo3bzryessbric172rq61u2kp3j7plmupgux9scih756z0937g3w1vpnpmpcccz23fbvxx622m38prthrgrjrwpfmqixq3zui1vk7embogtsg5j6pxacy675bfyujxdr0tw4aibnprbojjvkc61ae6v2nevo58d1dfhwo7crl6cnd4qchpqt9zpa6kqloksjk7melunu3vm4fetse9ixhpsbtv55oohuy9y2w2ms55kny4b9ekfnwr0x70le4rmmdmm9nzg8lkq4vm8n5pp3o3q3r0lcdhg4jyiy84vfozdq11gm0ux107jjl52dfel4g3vo1xnfv78zjr0tcnno8wdz0pqby456jn0ysfzc6tqtrhqej9fhokbnzmmviduut7n4pqntlvknotc4ol6xr2pk4q81vbhf8pylldv0aub7kz2l1yyueak9d8xeppy8mhs1yxesjs7ksav5pyebvixln8dvwn8c45z6vloqup6vc4xehizeyymd8f12v130nef8n9lyfkdhtefrccqjsh24ozwzznpsckm8ybimuzhhw540cucdugoad5pelezx83hfh1zlq7pacw1g6g53dtgfp3b94s9l74j36ttu97yfrqf4484pih0d1bb95b2crs1ld5gkx5cagxoq9t00rkklva',
                proxyHost: 'jel8xkn9b9t2lnzn49tuk3s1l67b2d40poghvwqzpiwv1s42al2un59fvtoq',
                proxyPort: 9488968045,
                destination: '472jzr7e2m6qpu6u3pob0ki8nx94re8e9mmsdv9bgo0jqub8o98w65ld055802mtvq8rw31m33emafdyfsz8wqo7p5zgf342qxaz2h8ke0hwpvxy27gugmb5m9olq2k5v4pmkbbckqc5c6a1m3eeum3b121ao915',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'poes73okc034dsvxmttd13mzrbrmomlj2fp16ixq8j4d4krn28oghc1qbn1whola4pnzq9ltvoen9430e8672e500jdoanwi2cqw7w28u01dva7wphjrltupnbl2udctkvrz66bgwjiiutexuol0cp37yuvo4r06',
                responsibleUserAccountName: 'txpkc1nfcjsqvp58m0ty',
                lastChangeUserAccount: 'likz3jq49sab5hmz7h8f',
                lastChangedAt: '2020-08-30 18:17:53',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'nyju8e333c6txwpw813xrd1z5ltvg7r320p98k2j',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'lcpcnocn4zsaph8omklp30031o2182qn71f28jqr01ngsuj987',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '1w6e4ts9dxuuv4yp6kae',
                party: '9t6rq6py6r60dx9uf3s8j5j3t30nmdf7iuqd50h82gr5ryefi2vh73qt889vyocyzja08y2drgt12esrnuyqf4p3sdlzy8madl98w8y3pc4cr7k89d4hfsqa9rga30bntcj25801i404s64ugk5lfd8zpgtw798i',
                component: 'o7jl0kc4endjd6l6k2l4vwblklvt1err5w73g5fsd0dnthmah0mhuk9fnbs8q56f6tsphe8vjnke2t533oes7jl5dlpvr73qg3uzphdju5nh231bzhseeyxyxe0fvmofkejis5ku41hn0rh36ie7g41m26e07wv3',
                name: 'er9yyoznjpmme7o1kaw06v4k2jijk9naighz02c6jsy6yybtcgci8zehzczuohxzv1p4r42k6vrkjzfllw2fj2e5t1xhcqc1xru75q7ed0olwzue0sk3tsds6oyd98605a1vvb3slwsr38xp31wudbwe8pf97nm3',
                flowHash: 'fcnmfgynpub9vvrga5mm0g6wkrc1w8m5bcv1ujjf',
                flowParty: '0fvdtsw01zxv5undt2bhsx3h9kfpcpogihnjrlhwedyuoq0apgzd7613a0rueb7kscfzfsmizg14y8dz2w2c7swqlbylaaod8gebiklwn6p3yxjt7k8vs8iqmwuqg8uxl0wosrpv7550zs9fbqgb0dpyxfm17iyo',
                flowComponent: '15hn3rufetcf3ws0ocjypn9t2bk1nyhugpje4yh7fa9b2jfsjuso5v4jy2oite3k6sopv8nk5bxc5hnx7hw60x4f6w9sc7gwvpcuw5jwea7uh7w206krmujc3pbnbs8oj17vhmjxtc8hc8qblqhjbw1kjkmuv1gw',
                flowInterfaceName: 'youlx7lgy6xig6f8y6egspst0imxtkqyboehfkxore0h4o9541lu1ureia6j425tgzs6hosvqwceued9f4oktehlrr2snjobtmpqcq1v7jpbwryrolis88ebnpbif4szvyukst1zgxl00ag8zt2rd6m9wmvh9i7j',
                flowInterfaceNamespace: 'x3zcuoknvpo0km0t1gpfuj19ufqwaqzy31si0qhem98bspyumzqhrtyn9j7n5padw9xutbebj6ppxx02cnprowtd1ojq6t42h3bgc66t3i93imq53fg2aopehw2uk3ytexsw0qlqzd05tyy9zg3q0lbde1jt33ll',
                version: 'dtozzwwc58ki159xz41i',
                adapterType: '4jgo7jlemt7mxhhkx15839nb3xsm09a69c6d3wkpkgpirbwszyr07n5ak1qc',
                direction: 'SENDER',
                transportProtocol: 'lh8ngf3p67wg8i44ctj8s4k44tmzgbjfj2l4oj2st82ioctabbqiuv7jkjmc',
                messageProtocol: 'q5r0x7mrjkf92dt1fvw2ayv2q2esqcvn7ii6yjzhhxgp4al27eehgxydnrwr',
                adapterEngineName: 'c8actzlbvkdiyd6st9sfxi4bli3t3wf725ftdzh2m6qiq5etl0437v5qxbla9zfymx6uzeq8hzob0temt2z2hbn2tu4lm489ltm3ohx3mpqb2x9tuy4d0agq2qa90fn5wd7w37lvqa8wmzkgdy4fn09zc8tkkl58',
                url: 'win00aou69xaidi7h7809bxzw6yjmhez1ke1z4dwfbs9446tep0ngubbsgqazfxfit0aaqq1z3fflz9pjd4jpl7futn1uohuiofu1wbwmr7y20h84qgi1upr2iptjrb9o68c3h2nnc2m1csz7jeowf72274cm0ltilthta42he1dhcop4c5ozi6h9h3hvshe48ocpfhnvynep33zoa858snr59vrolrbqnu2iyus0889ry7gxhocx93koy8ktk1chiddj33smunepcff8x8z9z41htmls7fgsv7mhh2qs2h6c47ievhqtgrv1q4guu10',
                username: 'zu95isu9009uvowhr2rr5jldqhza6ayqwr6ejazcgoalfs8mq336kj8hvnvj',
                remoteHost: '9a7ix44mvug83q35pqh9d6celucgz5fbonsxcfx5gho1wvibbnsnm966d6p1sfd430p8z7ij88nfn0k6f6lp5uo2ksjq6idxb8yw4qcg2znqmi7ov69g9kvk6yif49n9hwgrznbih8ua30762hezebh24wgs5ese',
                remotePort: 1430427279,
                directory: '6px8taernigbwdsr7fou19yx7kwkwcfalt8o05lzonlpivronlmlrds1s31i0wfnqcfb0zmzd1m3ig2qhvsiibcl6ea5zsa7lihme68oh924s7cr8nnpykp1s4styy9mmhetabueo68yrv3w57920kn6xw1tjxl0h08g8nx0omf63ij1rp0e6px7wymhtrr7u5ktrqd3wsp7xip8a2atc7pt94v8ozjqhcki5xqa4kf3c8fp9d9rwuhjeikqa3o9rx8pu31d8fnqidefydp7myc9viy5sor4owmksykauyt52d4h00o45n6fjrwp0p67yls8hv6cc5slsnb0xzyrac48aq24fjky9ry3un6w0vl349w6hturtczrjniocu5n3ehwfo3szns2rhmzncxxiap6o51fp0rprjn8rxj4v4gz1huy86fskjc0tgigzgy2bt6gr0r83ko39ju9y4c0e6xuvq77sn4teoud4d8r33qq9gkns2t67rpa9no0sxltnxkrrmr3sxt4s2eum3k5mvdha6zc0isvdseurhpxyt9h45x6tn4k44gjjdfw8jc711do7jq0eqdzrpc5mmxt91q7nojq4i7c6emyuvuu5bq0k4x6i2o4pnl8zsn1sx4l3s5gennu6tlx5enwyq1gb6r37ad59qzo2cxsjxkw68j03k0qcguch3ylt593efttqyj8xwljpy89rvddjh8wezo7tmfimuxnszczfjtp6evpmse6jiszo0f3jim04vj272ux6n0gk1xn9ev5z1rdmnnoa36vohw817gvfjqhlmyr7e3twz56jmq97g4vokoi8m9302lagna4z5ttnz7hu5whxvcb1wg5h5kxi8v2lklj10yaqivj72ii68ycdfx3j76aq3hma0j5t34cmu12fqah765fwaxfe6rbgkslw5ymzegnwkylcuia1w0cptpxgqp8zx0tfxesq2nihdta7acpfeh0a9jjox8rzfaghu4vr1ir1rwnrrxch3bq8earf',
                fileSchema: 'hurzwhkudc4elptyhzjo98wkdzkdt52mqpl951aylmby2cijaj4d8fldty54vx4g89kri36j7dvfu97kuiprbkqa5yk6ra9deq3oe95dejefi4tc3hezdlhr90o7e1g5b29e4nox9kw6n0cgh430oq1czf990lv6snm5gehaumhzv4a3cmh5kl9uo00mpwq1dlmzumhx3k2htrtlzdg1bw99lh6lttvtipv1zc9dkv4l13j32cwyslhrwpq011cd4gxp50b70qoa2nqe98xfj5vki152cj2omvlm6p8tytooeub57rowkevdtyq8nc4chd2kwoqo9xquqdeduxlgxz2sfsgyy50gjlwl2odr5kgocehd3e2yx3pweh4rvwh58dszvbyimotmmab3rbzcei7sabitv4piia24u0pme1zrcshy2gmqz0qhgv73jeewea91ww4qc2kqj4n0r0r1saj21yz6gu7qtwayudobgmzxzfq8er7lyhsvog5dzav1embdlg2o6qpn6vruhfymakb8e3bnyvz2tdeboupri55obkmmtph6eexeek81f9sieukoo5zyglhwuj71vzst00mabioymu78vtnmc41kg17s8cg2qcvx16t1gwokmozvljojz2qs1si1wb0033z2v04xm5ede8k00hklpykad2n8jtggeef6wsoic0jblbh3qbestzie960va2yrrso7rzmxu8p2yqn7e45xx307vs9d8r5j465yxujuf9ygqilh11iw2qujw13dtice69ecd2wm1hmrkijt5b5ptnsyhdsg8jhqgwpo6d00d3nnsffl2js185ltrxta30jhrd4a5dhtlkonin8c8bs5s3xk2v3fc1dvc0lavmxp28scderlyk3mhxru6liuddsedanalebji681j9q8i72r5zp3b9bticdk9t74fn48qlm33qn8v0laigc3k9hzrmgbs5gw8jx36acnwoknby828dfdhc4ca8wbf2u0l9ddygjjfh5u',
                proxyHost: 'qs8vsli2khgs1p3iwqoft2if3s5le1t5u6z0itudsxuxfcgnjfpctdwpbtce',
                proxyPort: 4744883237,
                destination: '0nk1588ygkujl416s7ukymss13it7rjkxxo62nck4nk7ps2pqeuap9cpr6n4h9eebvk6lceb8i6bttnswgcsqgxubrfnjh53b3ps6badn7pi6ca00g1vb65udon2riv9hn6g2m8z0meu8ni1z49kciwstwbwd6w0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hvk29hbusklpbqg6ieb8ujqhzzrwia8qerge687rv55pisqrb9lflmjtbr3y2lfmxewpy2x3m3dgb9819mzr58h89iirrhvaesyyuukjqbqf5kl0ykzgct33v8e7xow48genz9rwsr6gldivkfdwz78pjcpndn1t',
                responsibleUserAccountName: 'qaz3enxqijcga43z90tn',
                lastChangeUserAccount: 'fm28dmy7cfvqg558z6om',
                lastChangedAt: '2020-08-31 03:00:22',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '0cmpqhdv3wc4lu71yi83000iuqf64u8pfgd17joa',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'mrys2pxf23jbzbmwhyeq3dcigvka6milnovyw2vwe824ofipyw',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '5njw43wc6rg7g3y9s0p5',
                party: '8ap97vy8s54ixj1ljhhgqxfjjtjop909x4lcwwpf3q114k2hbva5133bzxocytihnq2uc4igm63epv7rjzkvo3qrdnagbxjivjsc0jwevxg27mspybjhrmbbp842uq6xjnwwyo77jced9pcje2jjb7cngqf3ibzc',
                component: 'h2wl2ydopw0k32a8l5bmzu7t7ur9rqekowl8qf0i5kgmytv0nh9j7kglc7g8km9dz9qcxbuijuu9ufj66ux0ephda9ppczjg5zqcfxv91ywtyrl0kv52wlye24m0ble3hy0r86vqh1g5yz3f34b17a0ifu8ll7y1',
                name: 'n50psltqogynvpo3341fwsu62reqxl1e0os39ri0il8ct58pz3dtkvv1u7qc1yam5qmuyqap7sj6h24vuxci315q3gt7zei9tt5060xszqcs633io43a3geqh5yqp3iuoy2ngsmzxcas1rqoea8reckhsfw6s6pk',
                flowHash: 'uwe9n0mqs92j9d5ng8r6yc7rn3psw9ghzxwzzr76',
                flowParty: 'ukiqtffrqp3na49fpdzni3123c54vj5dri2z76gp3b2d4hgtr94f739yrv4ef0hl9nii6tu45x097nb6l3akcjnj435frljwxnf5po5e5jp26ibqz0wmtuhc7gfzoy0nojf9oj6t9bg84vs6a3myw4z1rx0qboht',
                flowComponent: 'nmoxl72vg2qrg0opm86jk8ur3owqk8tou20dh1vxtissh322q1dv1gzzncuxr5gtrqz56vcbcdb93she0u53k5wozzimgvfsmjq3eds866bf2rbwvjhc40qw2ze0j96xvdhpucjoxir6jfdofpp0c52erevl93xa',
                flowInterfaceName: 'rxiqra8q0tvjibnrdh3jpv0ggt0j9d5zu9lh11fbtoswnixf0utt0odqixsfa8on6jdid3q1thqxz0zaicpt2tse05iz3scrugjcwwakec8z9zaxfkpu084qw3qdh3bivx693wmtgf6wborh3hzcc795wi9tnikr',
                flowInterfaceNamespace: 'r6vnrf2b3phl1i479n3zyxnji01a7fk3pxbjui7ibe3uem0dx8zzqvl8hr1uzfinfbvbg58q781k9u2ffnsej8d6t8yni56iul58nfcr7egw5i6cy2few4qf1dvzj5qocmxg2x9yc6rssinxmaja4fztso5fa6cs',
                version: 's0gk84tcxdu9mkapque4',
                adapterType: 'j0wni2dzh8w2683xj2x6uhyz3wmlwgolw86ujsdyxlup6iq1n3jjw7yzz7jm',
                direction: 'RECEIVER',
                transportProtocol: 'jlimzc8fnstol6jd3y8b2zh216upszxnt5vzti4iijmsp9bbjqul53gw67wb',
                messageProtocol: '4lw987lic0u0hmbe7gj2f4w8it0ymzfme7bng731l1qqqi7sba5ax3alrkz6',
                adapterEngineName: 'uge7lahe7qu7ifko3u7od8b2g8rh9jejzxskcyss7ve1x8mhsrdeqka3irm4etsoe13nphvm57ck4brx58dhykbp3z0pagmw6snu3e7miukkckme4d480xdg1jkoahjbzfdl4bbwzo92iv88fcwsxyiw7l09ostl',
                url: '4ajl7s75tseidhj6wlmdhjcz7xhwpf2iidlbiyc5cs5ncpl19xbews42xhdkbkkh0enqajzrqa5ejlewv7a6qjfq8uurayfueybpbuo6lu2po545dj162teuupg5zu4ia26qd0i46zwvbte7gymi0zi5fevgqcnyf6h02vew8cwljvyj18cqpvbnr6kl0srm8mmc2ncswms3id9jdztamzl12nynthh1brjsh87cn5cxminj0f3ypjrzk1fcom9ytsshyp3ghruc5vp8eopg9nnf4zlbzvqdcoc82rfniq6duzwbdta2wli8m0mfh2x5',
                username: 'gsgtaa512kk54cgegprfoi38iyitplonkmntbjbgsak4kc5mu0yxxdc11nqy',
                remoteHost: '6v5y4an3embukx9mcleltg5nrmls4esgyhrgc1nvjejmv4cezqheli4ytp140n7l4gpwzvg9pppyma18zrwfrpxtm0zu8asjgp77h1txol990pepy4x7vkd0h7gmb74ifqg8yxnc7k595ya2nqw1njf7uagfgzfn',
                remotePort: 9142688059,
                directory: 'ifcex7hlbz2p223ffctchkhcn9ebvrskbydy4oktfysh2b3om7nmgsu62pg387qe5kjf488woskngk2hx9ny77qu2zrdkiyv2fhoil9tpd9f1y0lsrr3r0982p3jdayukvsmp6r7uvpgodyx2wt0tf6853u8kewjlvwd8vqrxm9hvdq0qosp6n0ya9r1ahji3xo1sxa2ru9jfiaf4moe697vukp41pp9cm5b9n60w5fvjfzlmu1f3g0vzammth9t9bqn6olxrvvzthwl872niz3xuhf21zea9jho2p810k2z4yxgv26jbqundcz2cme0s418rr1oqxbgaw3ga0aiux8rlz0a3b0i4935uobpmp8jroaqu4uxylviwurfehn6kpa22nc37skrjbf4u5svqeyeo24il3l11wx1dojogsjrkdya1b3yxedwt2mi87dfozso5lt6ugmii4gayjkgrjs26745dmxgsn3ltijatj540egyaboatwql2tqv28z20i6rhlapnaann10u8aaxmdrasgyosjv4uly0cownnurx1kex28f0ctqo46lvxit1s37rxno421arhq4ln0p00hcnai6a9xq8b6soucugzavq03e1tpaegt3pz4tsaqsv3nqt7vi1alxbjkbva0swb9bland7e09rfczd04a8rb6cwtevlcstvz64pqhshpq2yoni74ae7hmgpaj2ta7p1gadqny0zmvvs1l9mzkr6rl8hzgnkoksdbgamk13okzskkbhnkixxnhyra5p2i7k38z1cwz9bfnuke9lyckjjdry3o2by28jcnukppho06g5xwwlou199sp6fddvkkpz82q0sos23amyid46g8r6kc100eiwa0kotupxzbkmpqp4lvcoodjqnqdryjvbkowqylo7txq1y08uvb6533oo2czn8343m5b52yfk3hgwawedyhanxnb17x74fstbgu1kva88p0ozrsx5trvk899hr9wni000belxm8qx2ewymnty',
                fileSchema: 'jrw3gy8dsqd2eaubv4cgasflq68dgwb5i3a30b5k1y679oty0u9thgh01fhkyljmfccqo7kj3nblt9w2v7g0jly902rd0gx2ls41liok241jbvw3nnfvr7sg69ji8et5n0ayk9kjgkrkfj0s6hchjtxwdxufthwtilo5g9wluah4uzo7z7y5l1oav417soujywugvmj76bwvkc21x8s4u1t9ysgocmep8cy6t5nadvqrkjoc7olmcteqaygv3toejs9qwj5jhkb3wcxynlqcfuqcfu4xdcs3ng6qkpdfl3mbhb0g4zhho49uv23oler80zm17a8swqvb43ry52i6y3c9r71jx6yh43u8hgzpvmsj7jwwmxrn16iu8lmgm5661irt62l8tzjrqod2tdbp17f14lmhecpw6dyvjcgqix8n7vpglokx7wveyk5mtq6ryjiyajhv1s15vnfldy6xnw91hmnwlvdu1nz5hhzes8finn3cpnf989yxhjpnsoyblkajr4hcq5l2remf2idyotyj3pkhjgamtgipwkvltnclkkziopbn9c5xrn6fo4dhf57apkcbbjrrppxd1oz76is0wo4yri0ew196eq0g0a490k77zuo6so2wtvq6zhql6cdob5gj2nnrmmd1x0gdx94jchsazg9v2hu499heg97qzm941ndkhdl0flgaeha0birpjs4vkwmv4i37i8h0jjawe5jttkn25km1t4drv07ooahggcixxlkf2oa4jluuijxlevofoz8o0lx0tc2w22dpl7nbvcss3qeuk01wk9w43k4tt4gjiyxlix7ivuqthgyg1ac1b3k81qijh4p2gtbdct5qq15261zq3aw3gea7e4jmb4t4gptwtbr527yvkx7zdfx4n6872dmkyfdou4nm12q46pdxshdoxsmyh0n9oa1k5284s5l4qvpqqdfrfi3pdue4l229v1u60dnjdni9m8awytwgla69go3lijcgcudai6clfmfqlj5cqkf1m',
                proxyHost: '6pno4mdltqh1tqbk65ngjjrzl3dtdjghkmr6ehj91cw7611pt6rat1mej1ep',
                proxyPort: 8319101738,
                destination: 'zvnwbwuvlhjdig7n5pjkcspd3jzo43rkxi5bkmrmnezdpd06fgppn0t0dj5vhevcdxs78tr0chqqewu6q3ix6gtholrxapexnq7ecouts7nezfk9ypbqkhdjlcwftvnudqbzjd5mbo5j9hk9ipk0du11tdlqrrm2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'n4as361xsw0om2wudarw4nuzeisrf1y8ymvvo4i9ypfad2et2uwjqe11na9pwld5q7xj1iu4l6g8br3yulz167gzg7burerfpdojbzb6gy08c8jw30fckxddxrggug4p3un10kyc2gtl8g1e9pyza291e9ojpiss',
                responsibleUserAccountName: 'je0n1ck01xlaz2xtf2vp',
                lastChangeUserAccount: '3zhxccljdogagyjrcbda',
                lastChangedAt: '2020-08-31 01:47:05',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'gh2y85kgd96hgi6p1ghwxp0h4kvm2pth7ftlgpb9',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'xvv9o479izbv2xsevdo7jtkycdqg96kh6tb8qgpq8e6ebws1tf',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'z60jhx4qq94vqm2st9j5',
                party: '83d5vtlazl9g0bbth9ve1s3y36c6rgrg19k77p4su2cit8yztcv4x6rexboqiekdjm2rcu70to6utg3g73bxwbjrx2wsd6y28lck6ncryfm2faaxeh9iuwavyw8qtt8d8ycum370pi1thmns9zx2o92z4dzx5zw0',
                component: '0su2pm72x8doq0pn079v691cmaanhn9hcrzyi6e2ngz9o9iwh5cc0lszp13bk8m8u1bo5oh375d9ml840cg813zp5e4bl7uwg8jzhkmkbbdk1ho95dac1h61vq3p0k6cvudi61e2djj3igy6o25d67bnkyf6lzii',
                name: '8guxca5bjjm8uq4mzmkg1k6sisejxhteb8jeblb5fqg0kyazurku39mamm7gdjkzf0z3yhcr7zf3qjr8orpoex27a3v22fymvgk6fxuvolqa9fcqw0fe0zvlsde6i92xutoi9kjuyq1xbmdgw18cfutbpex6q4nd',
                flowHash: '4xrdjjw4p8tbdqfi8qqu14ycvotviacsctjuqdmq',
                flowParty: 'yeyvp2aj3mbjf37dcdfdj8u88vjj4kuvo9oj58okjeh4dkwourwk2y3ngdmimkgwvjgdtgbrl0ndzpwqmrtarqwuciu7smt2ob2olu8xc65d3qnv6muplvo2bzllakpx7uvmyq0mykowqnbto0rawustvk68e2dd',
                flowComponent: '5b8m4e4warrd6lpx7k2f7e2erv7xthi1shkny9qynab49myq7kcie4jlyc35rbfnt9f6tpy9j7b2n7rx2b7rs8pzojfg8xx8z4ugvrjnkiv5jimh8o506iojc27qvfec7slf4jfkri4sudep9xy42a9s7ybyul0y',
                flowInterfaceName: '1ix0int7qd3jk5ofvyk53c6i7f1anwtcvd8qslodjsuh7al5g7qb08cnlngt850awrymvv5n6vuqj2c9z9a1zq7gxqenitmife2bo2xjrv47hrozup2yegu7egtdvnorwcwzmxyjuopkt11jicljr0cpap7437uz',
                flowInterfaceNamespace: '1hfd9t07u494rh8gjm5ge6n4w043l8kdh1vsr3roj6xyjvn64p1r3i0jhim5z6cn6nrudl5j8fyxyxrmwtcwrom0bibxajbr460i8d6upwvmc5md8h35y883jam5obw144jjkf8hxp9g9zbp057nbrth132xraie',
                version: 'nrt1grldjjz3jed8whoa',
                adapterType: '0burfe6exkcg0s8lfo3x5k0yxgai256rr4ru0qtkwhfl1tfgpzl4advqxw88',
                direction: 'RECEIVER',
                transportProtocol: 'lnqxkl638y2k45dgxufz2r0swo441zmysl065cnocevj760u9yzyyrqugok1',
                messageProtocol: 'jm3fr59i0r4dfghzwhgr2091neezceprm5pctkda9pb2fsuun2dd7bqsn89b',
                adapterEngineName: 'pm1y6r1znlz9icvc12s4aybs0gowo79tc6w3kjgsiqfosbnik7j2px8ul7u8cy1snjswo3jtnappa3617p6av7g9u5p9x95xyw7mh3p5ytjz83jiqntri67882b23ie92wgfjqeotq0fswrwgyym23z4btftoqts',
                url: 'hpv0w65nj2cscgk6b9247qbrnud6cu7g45obf57e5tsgklocw60dvisdt3k3z09ayb5frpyuhselq2544i9lq1sdxgqbzk7xp1d2g4k7bdw8vqcatzqbxyh98xwx1eb0e4s3zsze3ixqkomnjeaj7zp2lnxmskq4uyvlmqnqjgmyystu9bimpzzmtdqu51y2yyoj1ldr3w4midqndhipc647papnb3mtb4hr8xe21654q4et2k4ggsco8nl98c8xnrapslenu9zbpeesszbiz0tdpbwfkaeepd2vqxff5xdoitii7y0vfewm6ya6opam',
                username: '0its4lkl68z709vqit4invwybjig9nt9hscn96hg3wc3o1n3et8shzyb5nyg',
                remoteHost: '92z3exx1mzlrylweaf6g473z6zwidues0ifl7ry2xiqzbjm6xcoln3kyt99fmhac32tgnffyu2a4vufhwtq8zwo8y10cx9tkgm0fchi2ao92ruormucmk00ad33kk44xkwmuadcblt5cs3gjtz5t49897lr1xhs9',
                remotePort: 6989250073,
                directory: 'g0cvnjn3vuha1fk5zv12dxnghc7jmuj8yp3t66zbq3io0axwcq6tipl0n2am13mxccv9kb7l57cxfy6nqls5g7fc0731yjbknifajbt0mxogsowbqks16vfm95biwrmaqm4sptef6anyomimh1ux6c3dxo2peknpi12l6izqukvp5osrmtk2dpn402xcczmnaxglg39xllcnz9kvx1j3e4qbkoq2wpt9x8lzk6eds4ph3hzic00qdkf6zcvmwq0v9tpwvje9ngnypy5zzcvznafdrvxowdma3nbuw359a6n45x8qf5kaohtn2t9p4grzpswqy7g4aypbr5icoula60jxok31mpzpa7rjjn4eorw74voem0yumblrxp8o6nll2lnb0i418mk0z33xf8uhapc543qg5v3g6a5tnytvcs94v4v4cyy5gayat24wzcqf0084yb7fwv2mi2hgd78sjf3f159trw074rn2tfzn8ep9uat3mx378saq5vzlpg9pinmjd0dwc3g9jju03rltlnbfa6pk9laeui4rftocp2etf3zx8hdcvltf5hto5at6ijuxv1jz05xn5d5yiob0zz6089w166gij04mypm01tsnqsnsx8bqsm8bw1a369trxu88srmyudbr8ayy6uz3pyes307vlgm05ym52ie2b6ctq7yl3x44nq15u2w0qhyuupd3ontbwedb3mfejb8l4hy2ur8kd4xj85c9gantzqbrusmzynzxcu5hrprekc17zfaz7sjy52yq197dhx86anbr9wlsum3lze88qr19rwjudcxwueq4skipoj28e526x7iwv4tkeqmiauwjvujen072f6rh6b0xijwn4jrhmp61o2dhbtzkyh21hrh6nib5cm38dz53dlsru6uoietu2mhaakhj7g15wvhu245ummsa8bhn0xazmjgw5xv56jsw232bxlux6i0srwfv0bipnp9rmecfnl58czefwyourt8yljv1va4ncrfo9ncyxgx1',
                fileSchema: 'q7p2scllxyrudv2hlx6wzivef6ykcgkqctucjid4cnd6ib5sk44pclodun4quc0npyqa83pes035m6m9szbpwadr33xby75yj0usur3tnn9wbarr1j17cpvy439ccwljf1yvlm8iuyg2lb9xq26iok4t6ii7fbu0gughcwpfdgie647mroogmemk2875ia657awsuk2kr5vgctyu48c1rr8jfozt5qyakc1vee27oa06xy7gk317mahz2ucrsk78w5eowoa65d3mev0x3jsw40mvdwdvu762dpc87t7a0x9il33nshcgd6quc129em9abpovyag78nlsswgo131ye2tdcabanq4f47st9lm33xkuvo5oyaglm69uvlkqvchmonp0ds1fvwaryxbc5x17dx2s9w0fko7y7l6a6crbh27jccz9pwpdj5ls5pkcl2sfj2oxrirzq6ohbay4a4wgng9zxly9p45wj6k2hattfvqn0qvgzj1bwh21q51jcvfpbsky3xfsomlubdqe9zg0i0uj8b9wag6hk7oxozpxys29ouxrimx39ygull1e824zxm9cdt902sawh98kb09wwwt67cwm9lus1dtu4ndrcqbxoams30y2g5fzygmh22h8g71bjef81mmrggu55gq366v7o4dlzqi3h0t6u10lizr6w09sjjrwcg1sg62jrj01p08ribb8n4n3tw8p6q7qwza8zfg15v7l9yxkqpn48jgeas2tvbdyf1xxzs7v16d0b2gvub44x5lo2x2ulr4rmgug6qwl8oyvjki0lixrsral6j579u2p4ix79xydcz3knra3ylydekwekq49g8wisgud74hngu9dzkd7ecou9dvp2iiagq10ghmcg8ygvsub7t7wbp5cz2pkym7ge9ratzdd8uuk4hi0q2qibp7o4enrova0se2se79igv96bhtj2kxy6fpcxk3d5ln8y1urgzpp2a8yjo0v5kbtnsp6uxxjmldxek877zaj1v96s02a',
                proxyHost: 'fj892osrgner6cqjn0gda98gdp2t9idouyyq7jcv9ym0nwy3xsgx0cqkbnhfn',
                proxyPort: 9010224848,
                destination: 'l0ceca9vzw87otmqeniur2lqlabcv966ftvxf5cu0hf1mynvzz8m7aoo2bde7ujqbigisag4k1spc2uf3yebjokggedtg2z3vseibvh1pfpgs19uxh46u3begeqvsp8fbh7978y788sp0cxtqmho7ypi89wmfklv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mq6i31sve0xgbrggwxe4qyhxfc9f7l2ncjjliz3ihm0vvwfmbdocui29bp30xomkp0mxopmcfjx8y9kxmaxebu46qumo9o2mqlr8w8hxqasg9glq1igiclvrf2ngnd5usqta0boaxm9ygoy9y0bu764d5jk2t093',
                responsibleUserAccountName: '4cqshp5n49i09lc9czee',
                lastChangeUserAccount: '7012jt9ugzxounpiisar',
                lastChangedAt: '2020-08-30 18:43:47',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'viilc6yhvy8wo5dbu7jltiqc6jv8ofl46gg4bu88',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '4xzu3s8ucml0qnuqpiocdt0rfdclda05lr7dd18rugt1ttaix4',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'n22xd09gg8xy9qxan4lr',
                party: '9iliisdsnyret3jc9gzskycq3vkyvvmsd3ut0cn55qvs973himk4qifd5a4bv8tni9mkxw3ac1fhwxlnlh7d6rbyy38swa23pghvw7940raq5wjlumffzfbq9x2u55q2povbee1fmxl5hdfd8ztk4p8qax5taau2',
                component: 'ng7agfyml613s8gj5nanaqo4ez3exe0yanmru2jd4zbgpbzd45pu93ar6loveox81nsgixl2bc1q37wxa87fevf3py5o20rntsecy6al6flu57xumjei8lm79i1z79anz60nzi7dwr29arfgpucdi4i748ns6xuw',
                name: 'e6rfn1cy0yac0lwrndu0ulkpdmiqnk4zqbiga6kz0n11t17vaytuiapl66dxra01j8f2btxjihv40o5p0nellu6qfzco26k9ayzvkagu7x9y5ufuvyt006vht1dpcbulmzjdiwy7s6hqmlnyaxci3yh3ig2e958d',
                flowHash: 'vt2gsur41zsezs4f8faor1yj6d267nr5zgnqh5ud',
                flowParty: 'npfti84sxe4ll6qu8m23ihoytx1p3xoz8u8kniukqkfocxbt2nkioeg8p0g8bc2kxh84t6u1nbuqkr83amamhnfvnhj5hqkfikhkfestyi0jjib9qb90iv9zzsli9mf4ok8tfyb1d3fvd6cnsgppjkj4ezwpe8oz',
                flowComponent: '9fhy5ouqstpp0073vz4pzlymr6w3in6sq6bfz86jpzgaqw6on86l8btletkyvqkxbofmckw8jzif5jojlm2aztxrug7ctpllx2fq30cwjfrabnh3584rz238dnb9938scjischi1ec9m59m77urgui5k7fdctp4n',
                flowInterfaceName: 'he2x64vmcrvgxps9z1p133p9drlgz7cxcvinvun2t0emhfc7lmdt8ofx69wocxo9yhmkb014yo5m6ghlochgijpco8vk0rx94ry3xyggllyxz8xpf1xdh4jgcq1trb1sj896blrmogm82b4xwleov1hyons3z7yw',
                flowInterfaceNamespace: 'nibwg67fqc9qux79mfqo3itx6ev7et9p02hy6zsznxxok8cumpvsef56t382gtttbpo9iu3bsd3swpwjwa6dfhcn5d5pvm526657rvkwzk5kxfbqxcil3olwammdesz3nn9s5wsjautmxua8e5y53uqa8q05botn',
                version: 'srucrb115386ubd8bk67',
                adapterType: '874ocjum600w5fgt852jx97ec5j0k6g8g9j0oheitwbq6vhymyak0rwtnnkd',
                direction: 'SENDER',
                transportProtocol: 'akhd0yk5mgwu3jiakl1nyxkkrr5ffbj6hrgpozlzzl9par8ltmrsd7oiwcge',
                messageProtocol: 'phlkzu7krvcxqkfl5i3pc2uolo6jhvms73bgbu8c1tnxfhvdhvkx1rrkgw5s',
                adapterEngineName: 'sb95zk7ad6iw9egemznprhdr3ruds0nrg8lhpe6jwyhghfza9ashefocdm1f8iyk3z28jujpiuz17fwyebhlmnqjjv85hww1a7gpd3b8jpk1vo7fadyik0wq1e5gf2rpmhox9qly5xuwm0fnte8mexu7kgjk5y06',
                url: 'aqytib52b0fsl0us1zxnbcnbrzekdhykolmhgdr971teisasgq564ht5123wm7e6gtys0fl3xal4esqcq0wt4lwu1stns7nrh4kpb015sw5q4267avxz082i7joq16gj8q3y11qq6kz0igv5wds9tmipu3dpuazdk16uy77gqdk1wm42lftlsvlwtct91g1m0zcz2y5iota9l0llswmv8tbgm7612ljar7nltkrfvnnzqkp2ds4r69f8akheshfaxylwhf2vjjt3rrclrrcwzirhgpy23rb9b2r5ye6bfw8i6lrqp642mquw0np3lg87',
                username: 'ri8jhmcal2vvczr4iy0n4b0t6mkedo4ypgtswtiz5g9rc55qrtxtu2c6j35c',
                remoteHost: '4tkplk79lsaz5k5rhl9p8aq3zn1h9l4x0v55oo2tguh5vhwguo3dvp5mlpua2dt7u9qw38sd99xibfhzdom7npkj6v9zi3k7gwqdcilgszvv25z58cpvw32nho9d1g0kb3gjipvxspqme8zu1omp2juieemhecp4',
                remotePort: 6685656600,
                directory: '2jugvjruutqugbryvo44086ml84o2rxzmhf6zoyz2e8yab4d886bszmbxhmc1lhyr20er4j1rr5k0b9b7jwl9go3o017qzdpy7np1mui93mmpfl0ntdqyj5cw9p3k5atogvabmtwd4bdv42s33iury78lviu3jmx49y8k7d28tszmqur05ij6ix6xh16pgrioyz5koc63kqf7x91d69uvbw7l4rww64d8bcvl4hxqn6ia3bavf78qv9y3oc9wm3d33runx44igzv9a8pxyk0o7sinb61s4gz6ii0g6zcquqjmmc9qpj5m85om2tsa4unn3wp9odhjzu9pakcal6k58tgkszgg3ohz56bne5q3jylwm4kzom6y1bv9vpn2wbo7p18zjuffvtdm9ssyesw9tzgchjwyf3polreobs0awzf530jyyj2z02e98cmutzyofi0dxmi97h6owg6y7p1ark13v92abrj7q86qnsq195gkng7eysk8rreu6drpjtb48bex78u9jhlahuex0slna3n6ffw48suwzqtgu8zrxkzefsqh19kc3j12up5e2lqnba72rn6ctshmw562y6yibmq83avsijmf6trrwjrycb274gbiygovnkjbpq7vuifvpq5g0c8tkb7ptdpcg2ftq4mmdlfpryiektjcshz4o7j87it60fmfattuaaqmc961q434mcdr9dv6lbnre6vacnwg2jeccyhmlrro64pe7kcfqv0umyn09rlt8uh4w4jsb50ggay8e3ituxulnmxse8zcnlthcfz98dw4wipf526x5yl106drrd1lqbcl1p0r4499pwab0ds6pz6iz1tl17nk70ck6yjful5gzumefor180oqp7r6rzg7smv6lbzkia33q9vmdq4f8s8ghxzusafyj4w5caugzgvnpgb1f7s41n6cvpr6vq9n4ir54d4n7a7ddpwlhhzjz0b095j5o1n0kf2km4s13te6ube0yi6qwtq4z58qhddl4mougha',
                fileSchema: '1nt28sjd3105af88jyni04z82nyq93n7l5ecgmdseeq2qhjsckj7m6mxldjohdu3bnwkdjp5vleswkbpfbj2dlsvm2w6w8ftlcr4fvujhd1ybnp8v2wj2rw7m17l7qv1i1mxpg1esl5cw4bile850ubrlszvk315f8m6flpu34c8bbzf49dz3oc3ayk9zi62a9vuu679ixvc7c21qdvvjcirctk7kyg9wwr9yhifcucivioz3rmrkvpnussv07l4xlle385g5z6rzi1xb86bv72ns9b2bi6cfdrgnlca5ul9hke4a77tt2eszhb4g672kjh1m8m76ii30ao4slmxyxcpnbpbn10hy5t6psek2f8c0errfwy0gst2gmg4ofpfe1931j46hb5z1hi2tbk5xs2r7gcng8xip7sk8kx4sacmdkdcsxhfgpp6dcvdsq9witljm93f5nkwtwk55v8lbxb61vjp3uyba8k8mj2r5yq6ckbl8b8ojvfziejeistihbh2iip181pii2uy20qwcirnrtj7fd592yj4lbn5b962p1bs31gym86l55k1ypzvm4mccl16zotk7wjofi1gg9nk0gifrj7xg6rh41canbr5g9lxolvg1uu0mu2i4kz9ix2fscedh2esk7d0neu8i7zv3ti2dq450m1jb9by4c7k4ora6yfaun1j1rplaymy56mgoh9fyx0kz884iqis9q4o82840okgjffai274tue7cga6ad9ktmwpdtr17qber599icv6e4s9nsuvahcmi0jq1z4n2rn4v88apmiy76muaoxn1mxjt6pbj1cyuzmf8628o92mm0adggbw4g52oj62qukcvs6ya1bodxw2pvmnn7av7iheg2iqzi8vz3gpbfd3efw7t0i98s0p42vvigppyejrpxem1hmde8rz9nrpm5f4u84uwpa50ffgf8zz4c8rfuxyxg7iwjh2mjhiibitn33wsgqo4ldvvl0les5uieyf6yfm2dt0zp5fexy2',
                proxyHost: '1au2x1mgsqb0axo4o9y6hjhu47nxwipctqcfru1yxha1cv252nbxw3ftjhxw',
                proxyPort: 74440624866,
                destination: 'qvum5szps9tdbcyhgx09ax7z94btlbkt1vb1wbfg915w4o7taz8i5iu7qs1dtorgralq77xq7k10srj9r06bmk8hgbuj6lmfr71mhflyli2ekzc4m8m5cbsft7dem5vzqe8f1cb9rwz80pwhejwqa9y616jdou3m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dzbt1cczn2rj3siyjfjlx000r5ca2vb9obyx5q2kpwa9r9lw49zzo97dfnkfj1xi7z1sxfcnn81ox8m532ud2ipaxf0pdapzuuu1pdnuk4aqkzu05roroocoghkoi89d5djujw5g7zrro3g95p8d24fbzxg21gfc',
                responsibleUserAccountName: '3cb5ewsfnywbew9roq13',
                lastChangeUserAccount: '62rsxe72zwhqsipfi6wb',
                lastChangedAt: '2020-08-31 11:57:58',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'xgp8sl52juak6wmp3e0apd070s7fgnwzxwgi5hdt',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'a4p1q1bli0tp85ikne0lzquq6ognbi7f9l4gv193f9ai0y18lf',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'nip5t4yjhsjghom9tvff',
                party: '3l5s4ldycxrf0aab6fbn47cehdz64hhy13hcfb15cyhmr75a0atuj74wb20021rwxh0nvxllsavfl322qcxja6c5c8k28te10gejom294ydxmj4tdovcgsge2xw0mmqocmdyc6kttt6g0wmcdzs37fo6i6yqdei8',
                component: 's4yr2ovsa8buroclbofhd8a14frtwy24s9fsqnpftkjvxw59dtjf4ftx7yg60893vu1sfkky27vlqgr5ok6mkcinr7wkzbx766pkz41l6u4wryxsji2qlbq0wbpa4h7rx5ilatm5pmzo7e9ypf44pwtsfx1u3071',
                name: '5q399l0lftdpwtx9darjv2ajgv8zyh1plxc4v35jcartescc1dwpta0t7dl4ff0jatgsoxiobjzl04p1173uq2m4r908kh97p4doeajexcipk3xzalf2jev0890llceftcbuh0ni1f18ee90bhxbj4czuo34qndc',
                flowHash: 'bhifghxkn8l1gen0stfc5pbyeni4u039bi6tuuh7',
                flowParty: 'fyb3zytvsbwo7kgcdjfc9kdoo7wlefcznkip4u8aru1yvsgl40e0qae2lfmv1mqrykisrf04q4okxk6s4cxej5rlz7dr0ho07z6ma7jqbi267im4e15tnt30969pjlw503burk84kkl0a7g6rjmgmiaryr01f8np',
                flowComponent: 'lkdq2fw3gjz3s0wpdl4zfegcgwxc1h5jmjuwhknzby8l9twz0h4zt2sp333yphy6s7tz2bw5u4jry5trhsx5d3kuywlbrlyscz3zpqaugmol4l48lcrdmga1q912cjelgy0yrghw002bxbgryf11vohsue6fvint',
                flowInterfaceName: 'kbctq51s99y41qb354cznrngmf5cyjj7yy04m3prua4f70nnlqgclisprmhgbivu15qzxynfxvg4lvybbbmvoyarow12xa7pm4bce4x4qx5cuva9eoy7ch21vbd2z3z2ybzy5kut50ykrsv485opvm0ha04dpkz6',
                flowInterfaceNamespace: 'xaxlmmwynwddg2pbl5edqci13coha7ji6enq6wtbkunatr5tgeb7kyvmlooxrkjw8s5ubw1u5wjt4bynw8asjin8yrd9tjcktxay5nmpv5z9oby6jby3tpefa5wkw8oh834v0cieu5w1pbbxueavfax2nncxsjcv',
                version: 'cepf66k0xil8efqgejz2',
                adapterType: '29fvv4508c5s7t8l1y7qvx0q8rw5yrt2y47qn3qynx75xqumk93rcswyjmiy',
                direction: 'SENDER',
                transportProtocol: '8xwj3ya1u98vpdbxh3obyrj66k1d56enzlhjcma0goozkiuzjsvs8hj9e6hd',
                messageProtocol: 'cln1lvom028v16h8yfgqpr7towzastv0e906w88wa9eycbwsx3f68grhd5g3',
                adapterEngineName: 'hye75dbnzxzeh3tq6i1rjnm42tm5jhzc9vdbhnw7csiogm38cp235lilt1a4zki5uxn9sk1oxyyp9nq2fmahrzpoxitp7ctaefi9qt6taapt41xjryu6vde1lmnspnl0rluj95o60pbba7pozjd2a4swz5qtkoj5',
                url: 'm7h1ep20xy2t0t64a8idcu9dh07fs0gew6zj3abig6t62ak7rbfehjdcez2r3i7lp5s5l7gl7ujdbrmgg3ixefxl2s8bofg340qoljm9ceztgti6xwq4avkwcf1d2wm32v2sgtg663gkff4ja8ebib7puwlz46o58lxf3yr4rxrsllvuria37lh6henbssjgbgxk7ejmtflb3vkjzpgdq0l8w39s0ve54uldpycdmjk0n8mt4fv7hlz5mv068y5vrfhhpneb4yzbney31eg0wx29os1o5r0vg0oa0itkbnmcg7fwlf0m7dceegivi4yz',
                username: '42ibbq3vznidh1xcv7pc5e45zmgec9ic87zi4srrv3z6hr2hklpubhc8fgfg',
                remoteHost: 'irdtp140oxjj7lgqo3vztf13ur0f211hve4rbge4ql2l3mlmgyi40gearcorw14xejanm2aggvndzc1b9399wt7m0hjv4h0qo6al44uew3ms6imdgodtvkxtk0xkr7laglmjy51oaz1n5v7cb7onqt63o6vpaqa4',
                remotePort: 2120134198,
                directory: 'q7bgtf3ub2agt7v7uasdzu01umjh63lxd4rtkkixnkzeas3pschfaytvc0tsxg1896mmfjcpq87k81y9lvonpzxarxjlng28xee1lqizqcv0prsh0j6mljrj0av3096r3uhwespohkii0m13wkjh94vrzfeb7lyhbmyj20filf9oxt8yyp4sufdf3l14yd9wc93gq8bftqg6ksdao0csmiz3qm7vmvvfiqwog4rteczfj8fdt3lt86asz5r3iunqujovw2m1k3phu1e9sscxy7ekeqojgl55zy0feczlqy08cgf49rm46vrv335n7tn7rzf9iqmpbrp3e4momv71zex7aom1rkcdcc6j3qagd90w3dh6dw8t9kddcknovtneai1qovya2x9xkcrbpb4izmfntltg1a2m91iv7qfafqk43guvldjkw7oily282m5k620srlb9ctst6greqz1wzuc43v0qb6ag6b4ljiwy87kxfckj3pou3momkb83j4a3ntkpm3c5nyf4q6ka33n62vhosigule5mcszhf8vm7suhdhzghbm93gxeixpbxw5d62e8opincnqaqdpeggp16ffb24qax45rqwcog7t19hg9dquzkhgkz20c8zuw688le1hnmygz478m6l3hsydsk8cpc14rjvsluj93nm0vschi8hdd52wj7ipr1fl2g4111o40xz6l3qwan2xqrb65u4tdf8fwrglnuozthohkg29wrdvn0rtrjnv0cswxzpswtojz03l0ijn6l9uobud0xyjos9r2wv9n5itywwd7dreqo0i2if81988xuyj3sdd3wocfa5b3zx70mugyxoltxwmdrfwer2kpajjifgnbcntj7poqhvzdhykb64t131hu17nxl59j8ovvimarqc68ux9v6ktc7bk0uqqsx7axmgkv2u3s4p1ty78j30zekaoastr40w3a3xtji9v1w3scbdrgn7vdoh7v53v0x6ghhxndz5mmed17aw1iyk5xgple',
                fileSchema: 'mpw3x175422ims1dz58yu1snu7mv35qsbhdx7s4qujvw7dijt2spgk1rvdi5phqxgaglifv015hg0vbwxgq18skw32qeoccpqwgrx2s99l3h0zcmu7qj2ua1c1tn1qafoiffkp0mxp9kfkwtc115xmvfm0zisiok8sg001b9mhirz4wyoapfwvrg5luex11ti9jyqetmyzudavbwpxup6jpkltacd0bh8rsytr9zngvtvwjii50vgsmjrtvv541qk5zrji63urieryg58ghablia8x5oo3ecia3ckc4eijtsgyhtogzgu164u955yb8kh93gxjl31ikk19puz6bj0c2t9v61e1x2e21rszmx11z5dds4dt6tyob0g4vgrpwn4rputhx3eq04460mkqt2t3suzea1xoifg2532vp5av4t6p1h5k7ql9w9pdwqgu124zk0tn9z0bbpezxaqwcksw1vmi38l7tl2s1amd93c3ezc1297y8ov3pe5ze668cxc8l4gwshqebhbyo7lihp2cvqcyotcbdq6zss6k2cgp2qtxe06hcwber45uq7shznktm9z1skjhk3gx7xz0xax2a9z2wpo5f2ljl4w4ckw3gwwjcjmvpfqaw0n31bcm8cz48du06f8cgtbljswodgb3iteim8jtdn69i28c3yisx67phbyk0g1dv53nz03rps0djl3ezyx6k1sozthk5zv0ke0hbswzy4xmup4hx3uyiszy98gtzicqmuepaiwrz8xho892wrb12s6x5umgs200jjunehfsau8gmnipoxau90kbud2ymuwpcmyjjnoqljkivoghd8r1tbcw8iur3zzfmawasbgoco5wizs0zk72t2xgckga2z95085d3jk1m8pyos3yoxgx8d0kn9tou6axa18iibimj11imy3kohdv05ulwjfl6vxlqtpu9uvs2d2p41503y5n7wldm362rs698c4b9grday31ahvqst3r366ax7at3ckovuym4dh1ly',
                proxyHost: 'rshrt0mxq1inlnywfdw91jwj3kets4ioqmtyaf38bebvxuhad4iuo0kfjm4k',
                proxyPort: 2086466229,
                destination: 'x6gnradaidky0ev3oxhamatvz6m0lan881jefk0xj6exrb4aws1fwjpozy8mb10d8meac73tz5v8sncr69artr2r8zj2d3c0awea9n8srigsjkvtmjsotl0sxyvibop5wm6o92di2t11u7y6vwsgw6tohhxgbzjzi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nyvlr24f7lfs5sshzsmo02ptb25vz8bt7ml272l1scyd5nkff98erer79bltobolq57o60wfrwtqwalt7wqg38x49dpnd3qdlxnxpb81rewvbeaz4ucn3xvkfdlzhs42yerdvhwm461ne1hj6i4ja3c6hyfixa0z',
                responsibleUserAccountName: 'yyewc0azp2y58s1cf87q',
                lastChangeUserAccount: '4pk57a3mceo5kcx7k7i9',
                lastChangedAt: '2020-08-31 10:29:08',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 't1hjs08nvucipm3qrd228t76261s6lfptatjs6j7',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'epvdz3ocip1i6i5me76u5ixcdik4g59jrcb820ibvois16ex2r',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'sc42tu3ctqp6u0338vka',
                party: '1lrkdzooqb9euby1cgd7gikjfsuc43gk9ddyvlowg4tkqy2upnuoiy9jbtgzgi5kzjj6b1nr1khkf01yambfgjwg6ui814udwlb904pir4x03dk2ojoikez0lrp0ilyzph60h2cml8va1tcvcbwidpyuo47zdcd5',
                component: 'zo69cxgc5wli433ywvxx7hki3mzj284234dd3mgxi2250sqa5c15dv4omu27gqk9vagc7554i7045yurdcbz4hgh1o828gpj7pisy2m6d7gzto5117rgbv1arbab2bsx5x1wcah2lq86ecxeg92un1jlcmlp4ngt',
                name: 'ezajqm0cjsaf371ya1pd8pvpmyi05c8q54eoozqco4urrpoxk6d4bniv5s68p836ewml37voz6fh9zm0t96ft3li344utffwitdm1lbzm57r3ormhaex0rw7khzjf0p65mx7cz6syhcxmwxmwkjbtg7dobm6yytt',
                flowHash: '0evjxm2biyvspmyevz3e2bsfiwnjas8piolhlesp',
                flowParty: 'pnauzcixqkacfxelsn79irbu63p63ku68200mw8r3xiambfwagbuq8yam3jdsq5hk5s75o1k0s7yl8mqlnm0hlenrzh8tnvklgmymm3e4vjir9yfmrax6lyivdl2lnb28qwixtyvf7xppalpfil6e21w2wjswmo9',
                flowComponent: 'v1cgkspsk06d6ady42lhkxlmfmykyjhdj96fpt9b3umm9rws4uzgd02s5kv3erm2e52bvysihtdtt0aud3sizjnqv82u4e98lpwfqgac1rdrbkxyje38yf74losgur80ee9xeggcvrbo8oo9l3hwxrcg9lyvt6te',
                flowInterfaceName: 'ls8cwnl420u9dsd8mcikryvy5ow3vw8x4omdv4st08qtyktpfz75gyj2sx23albc9ystc23717twnzko9h1wn19zls9du4lnp3upgv3nlbh2ku3fu9u9shdrlpn3ea9kvwxc11ddxrsincezjw8q5pgye9515suc',
                flowInterfaceNamespace: 'q7p2lglwoe5elyy3c2utbhlk9wwhemd6r9egiufvlcnm6xdx15c87ui38k6gbnevxhbw48s5awbbfs63qn1y18jk5lugam5nsqxkcodm1o7ytyww89byp26dwx8bv789tx9tscmvv8ykotdxagew3tgb84hjmohs',
                version: '153oi653d5sfofynsrst',
                adapterType: 'tjuu6582yg9m64zm279s6i25km9upeitf7ly1y69d6va9znpc9rm97xwd1q0',
                direction: 'SENDER',
                transportProtocol: 'tauov2zgmgundcioxhbrr2uo24xa68i418q5e4wjst077gixp2i858j3ay4u',
                messageProtocol: 'skymoqz5ecrkx8il9h9vy9l1i5ol4qzoxmg6j7mvo7p4qqqc5q1dpmfdrp3r',
                adapterEngineName: '56cz3h4a1mmltulbv8xeu33hdmsvzol9dlm4ksd7kpud8fbwvjgucfa6crgmjk49rn7atenrv5mlc9x0x8nz1t7rg7h6ypm0uiqxqp8di2ze4emcrvnfxb75g9k9wyc9wix5caad91lfd8rbgi9n94pnqeqe70ae',
                url: 'plv4ocai86gq1m3uwmboyvhaamqxorvxi0jdcdcfpcat2wrzdd1uqju1iqg3az0qa5epg586tset55y4dr4vh54dsyixx1xtglm647qjo4h04e1s2tnkjcu1dziu07elft58np6th9vpte2wjyzustbphbz3k0pu04qd5lud51o2ca3esak3gwxc54qvabjyufuzoktfjdr3x5si15wvpxgroaopdweltwahg2zbh7raiv6ne15pc4gaq8hm8yl4u94ckjm38gjfdo1gq388lmh2eoale3cqr6alah218sthi186nvr8v9acex8ekkgi',
                username: '4lhig4r1fnpo8l96cfyomvjidn7clz03u75iwme79ifnca7gfe4rqbyo9z24',
                remoteHost: 'matm4deo082jus3ohbfasw18m0nbyrxr10kp3100ojvksehm5ov256ggmnzcw7uac4njrne57jrjtu3x1d5sj6jl5c9jq7sbzuivufyq5942t02621e940x70c8kgdayvv3vz5xa41i9waon671mclke7bvshta7',
                remotePort: 1778071584,
                directory: 'k0fctpy5fzv4t6pbmikpd1lcq7pibaddeinjruprx66jaczud2q136dfia4o5vsooj5easc2reekh6x7tdeawibro2fx0t774jjj60r6l92wbpodgud01mved3yzkhu1o7etgi9tq49ntusga2t5ce84xtld9t2fdt5z4p6fcxa9s7kvbghbbb5wfktja96owzv5omfmcnu9cgft9lbd6n54xuz1hn01lhjjkjzthrce4tbo68lqrdmjra0ff2xct6klhwozry646h5yougbexsij31yodbcvs3spdjy91t6lujbx6f42mky57zs95krgkh0s4gm9n5geppc7buprxjhbtyqcregnzc3py9jtb908rvlujk9rgsd2gldyh98l6tjpy2j45e5s0qidarcnbiixqc4e10ae3zmuxkrvphcp8xeurwua3gipg5ttycn6gjroiq3erdsm61l0z2m90861kfkpnpzmzxoy6qcjks4xbkglbr5c18ri5xmptqss8z6zk7yob6i3yx52fe3tur8vssaudwpfke8oyzkg98xebvwwv27i6e7austxy7nuc29bi7yq1nibnt82av6usllgy2vknq5bq3hbj25mnd9s4l9vrwxy2f3kaafi0bxodxcydr6tmevhrak7tg05woflgynu6z4bp8dlueu6dfux4058cs6saeklazhyrqbit5v4eh7c44i2of8knmn8sxrrvgwxw7ojyuc3jvfh02f39608qxfc5i31w5b1l5ja9ed3etdo6b75ow05a3nk830s2hkfmtdo48dmzcz3dgjs17wmh5u16lpzhh5fj8l7t5fh2u2xbu48dnfab9moablm9zubxnp75dy5dwyer40z4302b0nv8ifmvtuidiu4v40al4019wdyiarldxsii38ycgxju4sj9sreq0ipuoxft5ixavp4zpfgcptinh0gs8qfllm7dh2kcqkym07ecign8hv4yvziqtsuqonypb5wz59pzpbirvjyx7d48vx',
                fileSchema: 'hq58rexqc88mmuntj519yqru6j342lnmo8u4ojzkf22f3gpd99xd49lqycvvxycq9u4yxd08npkycvtp8d4cmc0ffmkitzeiha2269woy9d6n286j6jvxp8dqdlizxk3op5vbz8euhe47b9cexppd2hmfl84bh7y3dmssmy5rgpm0y3lh5dmklz38x119wftjp6j9rs4hwe4z8n5ll5rg497q8xvgl721ray2bkyr6ehgz5chrsuzpyfolg1lptx76htdu6jy4gmjk2nni6gpazopgvrl7i6zn2eb3gwyn19b6o9lrjhk6rty6jskf23pulmmsvaa61eugqvnf0lusv05oib70xmgmpuaipck6v9h0t68zgbdoepl5bmv2fpofjegd58x2b29ddt6z5zo798r2ypur0hpy1vfvkyjo053cg6eiy2a06w1jsvy23evmx8ijh4br74lt3odxjxmgu2uv3ztda4971jjhgs7egasokshabljha6hnwjmuheeuydc8es1mq7ab697mpptgdy0xrsccojqex6e9wwc0y20oadqc92jiyf6efd27nuyxsg8qrfynat3bda8bxzesg892q0ge19l8x4atfz1zocoopvwsevc1nvm2yw5ew8rbt2ml20sn23wshredlll7gs0fw00efoih5l4yww7gk54whjxw2x3zqsyqq7a14w0vbiaxd0koybemg1xldk4dtuklc1fbuu236s67r42tnn6q4a73kucun5jb92lqensh9hbq6llhl9qoixleov8agjpskowp3aj4c27bhxldpprqzk5hb4tkwbbcy2ogv78w76b06f4ml12ganybck2q4su5fawmghavak92apilcx97bg6t2ah2bk6n2i6ezbahsp85cu7czz3w2coropu0uj7mxv75iaq5ftpoa1xe19lxkq00vixpm7jw52egeppclc3wyszxyqi1q5r9llwkzqefs9rh4rcj99ggy7or0uizw9jigiey0dpbil5evn',
                proxyHost: 'sslysng7kp95v4wibhvcnft9ca8j88lrt4oo45t41mj15v9vr0k8y848o3yr',
                proxyPort: 4112280967,
                destination: '0jjlhju9bfwf1am9gbuh0802njt9pwvby50idjt5056hl9njj5jeejcbc33fgkyy648iiukeqit06b8q47z5xhwzm8px9inkd37n0bs6e8g1eatxaeb8cvzt06xsn9byqa5acr0y8jlrr71vknk1iyymtfit4b4i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qi115v0le0cop8a3xwa9w7670sr44wrf2pqc9bp5uj44v9cnwed8ly88kg0u15c6wzejynyypghd3brebpser2dfmi6w0n5zq8wyife3ujbaaceutlppa4zu39355q6hq1ys7pbuby03200c3j6gx352o7hcft0q5',
                responsibleUserAccountName: 'fbv1cijd3z46g5hxp6sz',
                lastChangeUserAccount: 'l7ix73wctj2flbqcidc2',
                lastChangedAt: '2020-08-31 01:01:10',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'bl519cma8w8tw4ju0lrochdk308ttgquqfiproq1',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'n04e8xstq5njphejsrkooy47z39awpg9ssfszwgt5gqs65qiuc',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '1rygdy45vh29l2w6vp7n',
                party: '6ibp5zqpn4fvbmkph5ecvu22z5mmrjbsw3lygzb7xgbatq0vjoppzdkpg3xn91il0zdsicsb4s8n5pwrf7hwjbj7rp2cgndcu8lyordqlx44boen4bs99e4xaj9w6u2rntwir560gh3rk0x8efo7zh0toj46hrru',
                component: 'owpivqe8lij9arddq1z2sk4vw88j4ih0vd4opylujpf19nudnavnh3e2jvaszfcewuc0eyyues6jekhjrm7quq2bv3uxa2i8idtqqpxwu714nackmw6jwh3m2y6qfe9rgy3w46ltfczsz2szwafy4jhbrywvlvha',
                name: '95hhlro9nhs6f3num7f0tvtbs39sy4j2qow7yvs334c89muz26teumop3vn01ztqq7te9iop850m63vlseay47mer2kd2ans1xkp3i1n80jlvo9a4g81tf0r54eg0ejydqo187lcw7441nu0a4std1e0z66gtbqr',
                flowHash: '754cduegdnzv9xioldnrohohi8hx2cf6hyji0q8i',
                flowParty: '3vvam1uio252n2s2ji535wwjaj624nxl7lmqoxo7o6hk96ilhu2182l385p41eo11olcq5x57k8z9fese605ww0m3pnt4xpi9m4k7aobe5wfebmj5gi2hfhz6ll08m7lrvwphorze0fpkhcye67y9o7rljkwzexu',
                flowComponent: 'f5ulap9svovim9hvi91yf4vsgco5yppmerbl26hsqo1cict5e2ybprc4es7ymci6pg1fcmey9mwvfq7tnkgbc2dxwt4lrpnhd4yb1psfblj4iyy8gfhwbaz2jn0z32o61zvjdnbnl8kwxfyjqjtmgxlvws7qorar',
                flowInterfaceName: '4qom2rhfvzjz80765mffjp9wd4db20wsnj0cxm6y8p6cvxe2cce45u9r3qwozcvh39k0kzi2s116sir2jyy9fonk6iqzokisfbdd1yojbpvhjddp7qo9w3q3s2rjw2zhteokuj8oy5yxwfvh120a76arinyuwlzg',
                flowInterfaceNamespace: 'bkw9rmkq3pnb69tz3m905jivcv2obtm55pj0tudq09my7dssgodqptkg39h7h9hs55udv4g69bdz6f27kv53vytc76v6hv4kpr0ew67vb795moijz39b2ak7hqqc4i2r20oc8pxjya9ba4zc24n3ew2m4v3rx4yx',
                version: 'jdrxmvikz2mxffd7qvhi',
                adapterType: '1wkexri1pug8qc905fuegdgp4qvfkkkiyq6xvv8b8xj5pifnvfq666oqfmq4',
                direction: 'SENDER',
                transportProtocol: 'jocihbcxdvj4tkgzkwrekjrj5wz1fprmyu87f6guxa0br3fvc5dk2s4m4lx9',
                messageProtocol: 'w1k7gnrl5x8ezbk0yeawvh7f9v64b03asscp2rh6vmvlqnszcutod1bggf4t',
                adapterEngineName: 'oij68je1osoxkw0ep77xnoudgjqokypguqgyzwq25ngazdwa3k6mbbejcthm2cjlnd4ftoyng3xaeyteqkw9hoeiu1bzqo6ih0bdy18i2deo0nycdqmrffmfqdsf28serh9o7c2i1ymc3uxl8vsnmsmwzzg3fq9j',
                url: 'sh81thrkkufib2m40p7i1ueq20v9h9pbg0gct9z3rofw0u0tu8tc70y74sbhp4at8lk9ipez0nnngvbfu5hd7ggs6q8vu5opv38btf74ksbhyguoa6sohsdniy0lwxpkir4syy3yhx1frawi8vi70i26upwc8u3cv8wnrn8h6fakpink8rlm0skjx3j22ijt3lqx7ytcoylfl67ig00zkm4fec5rvjyfpy53apjetc36mn9xhpqtwq8w497o6z3xtu7mozif3r7tdbniscpx8haua84y216o9cft9cdl4bm79armvcpd0ovla49zegsa',
                username: 'dvt5hbsb6trfj34gv57ph5v48gvt9ww9qoke5jvxhg1gn05rfxacsqz66tij',
                remoteHost: 'onvxlivn402p4n66vpz95n9xmxek6ild2ctp0jkto2cq3zvan71sxql4x6ig0r4vwfgmgm0ll3wwszed6tqt73eoapnepuzs8yg47fq2829cai972zpdrdxnuu2elqro8yscw8qsg2esfzywvz4x49tk0uz7ahtn',
                remotePort: 6661969559,
                directory: 'q2dkfr3qszsprm6d91kxtk4w9cff4dtf8e3sfuw66v2i85o3y62vezt3aiuiy4em5p0zwl3aoegazr5i09ldc740a1u4w2gogi1cmtoolutnk0x6mp6zbqn28j5p73kn6cb7qd5t9ow03vdoldzxo01hrck39qz0b613ugbovrynsjo2jtp7ajx2ydmm2fep8yr4svgtn907y0u7bg007021yh75hyatqm8t8uhb28dnzc0w4jj59ldlduede8vdb14xofw7sk64ewqp468ia3fckkbgjvb1icdtho9fnz2qoyv7sm2u8oquoe1vlg3t2qdfzxf93daa0yzivmp8rhwh4wkeqj52kua3m3gv3jb7588tv6fu04rqdnnj457fh5e4ed1fk242gfgoexfbjmf6e96osgqglbwc7hjrok8fga0gfnlenz70ptr1euc6nm06e7q7mw4fcy77uv4iuocz46yfvfqd70axiwkpy51wpr7qhe4po84f54pdwlsycctkwzsy0gqugqdw123ywakzkaos4p2tpspzf0o62kuj86o5ykc20iklf63zti3c3exmlt8b1ixokwytwn96xxacpr65rshmb60qlbygp2xkrrteuyctpu9324r98g4qz0wngf435tjo87cgadsw6gpmgjg508gdagn88hwa760q7dmuzjtv0tg0yru7j1nico4xpvweganr13hz03o0ypnkfhc4vsdcyrhymfrf41v9rh22iq2c5x2t0ts6d7m2h13um8rwjij7wiff3o8mmjpaxkefx2xjfi867pa4py1quyvgxduu8t0xcu5zlur19n3c9ehyg5ipywxnx6iuj0fw5bylbzas8j81ezk6dj5shakqha5kqyqdj2henxao0jx9fuqeq1oq9tte6cahfzt4ps071l5m4acjqv7dpgsx9d5w3pegv5ehr0hdbo0mme99zapx9w38hb9bijpccq3b4dbw6jy8851ek1it8ykwczcmokrhik4co508fztj',
                fileSchema: '2hvmn0zdc0ldx1oodvg62mga714ylgi5cdjguygbtf7mbpncy0sw8xvsp6zxrt7pu8gfke2pgu3jbfwmwcvern7sexmrm2rh82vfzqcn5yb3qvk9wgmjl2c4ei8cjhps5ywgmky0ltnydo3zvu5qpbj2fti7mlmeoagat426jsiife3glc48uy2upynr35hs88r3vozv5xek7glnwfanii28qw6kgfgl7j0akjqq83vwdc6cbrokbd1ym34wf0w5wbgn9j2ic1qp73lh88jmes3nuwn585zxigt5dlvihan3g52q260qv8q6ouo046eh2abgpuj54ao2h6nu5m8gw2kvbcgf4v6m4rczmlyh3qgisrqpkcju7wvymt9h8qbrd4i52ovxaumw11vqdwvv1735vfsi1qv0is8lwhiyyuj04zbijmsmrj5d07b3z8uflsahotvi4nchwcmnl5s0nhdb5xfn04oyvaauuwr9az7m0e8ew33hp31aykexslrc9xlq6u8niusovoeq0woq8nr25kv8jq2072d24p1let0c612zk7fffzh1ie8c9r37usi9nk4h5q6tnesxfx8jk0w0esouv6tmn3ikvms2zwaz6cyj4nr2yg1vvz87oj8ahnscuk47j62pkrqhklkgdzzp4s4axezsait1slakpzhwlu1djkm7vto0cnyhhypg2he0bpeh3ql0a2cg3sbmfkd2lhuvy6fz2zz2mm8y4oe6s61v2fxsls0h1j6myq1o0dar21ewxv2b4xsmef26bwycbh1sw9gqey8mo1teql6ml6g80dqjbuhjajdobijvfpmggu4vv44xpksc2jbt7o8xfn19f2olbd1u3nf9n6orxxfhpm2pyxcv1p9zzzvfcin3uk6bghs5csz3w3445ww6n5yf7rxsysiqggwjumrax7gagxvqt5mgb0gc9kerqlfwaaagibu41hma0l71kmmik96qeueeqiv7i6wfj1hr616uyeohorijrq9nfftl',
                proxyHost: 'wg0ic5rcitmffryc23bc2mqmkhshoxqvbis9c9uvg0raopet2ant9krusj3k',
                proxyPort: 9345388440,
                destination: '278hiijwpclm080c9obrkiepkat5b99vgknxygjrf2wkqbu7ag0rsc91m6lqdzxne050pnvbrb4p2iy103tkk8fx7aq6cwdemba6bvphpk3aftyafy0yj3uxzfy7f9k628z7gr2cc4tz8pygdc7jjgkif728x4nr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5uet1ivlnehfqvcxsbqrb4uetwolqufxr6bnfae51g1f7vu7agt1ifp37z6lb4m50125a4gjje9oebkdxiamwb1dmk6cf99sji2lsk8cgzdv00sbfsjgsyengmala4t3s7f3y8u0aqhen6ruq351jjhiuzgnusud',
                responsibleUserAccountName: 'ineur6v1tvvokotpt419x',
                lastChangeUserAccount: '7is3fpxxm2uh4479ouwn',
                lastChangedAt: '2020-08-31 12:53:27',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '2iyc9he6kwsr9se5aj6va2aylk15w7iwg2josx3z',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'mt051evzd1a8tnacmqwwnpq8glczes7497wzli1l5w5wf5bbbg',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '5t5aksvacydbxac3uvgt',
                party: '73xmhzws4rxze7pq4eppaa3fi2vx9pc5qdukffiprgwpn7mtryqbw3e5zma0w3rstabex2ypdzi3bomqe1ipah8snwhls4i90nxr92gf2swk22v3ce8uzv8m58110328xawe5hdel9408eig3n2cmz17d8tenv1b',
                component: 'l6r2rzgz6wzkjysmboqgpevdxnnjmil90qhk87t2hfjxansxxulf40uahwnu934giq3f9itdm89eud35bjd373eyysxp43qs4pjcpgc49ipcbgo8wffehjpfprvqwetdfogmwbcmmll44pyxd5uchqd21moi42rh',
                name: 'ufnqmj84p668dx8welz1576z7jereok7jf0cevg2ozz5xugk8h6qytmqytx0w1yygnp1pe813uh1g0z4c6aw93kh8v5kzbdx41d3yf2cowlz5keeq7slw9mfvv65141zvxstb1om77aqwl6omuu0y6yj9lcjf0mp',
                flowHash: 'q1d400h28wu4dis0fxsk179vkdox4l2brygi8u9q',
                flowParty: 'n5skos22si2echpr7kl6x2xclifjka0dmzfw6y5vsrd5b3629nqawmqr7ppwnol35s0dllexwy6anbg5wd2ld2fcvatl9t8x3t6cvph36sz21age03xgmiftwlhukct40x7ha96nuybr224fd9hvdxt1i0m3pcxv',
                flowComponent: 'h8j0h0v872xrahlwg874ouu320o9bm4fctotu9m4ztog6yft5d69gyb9u0d062633utjh85cs9siin75p7axmqz6yt1u1jc6kgme7d4reysj64klfubadri5discubavat5pt10qcy450h6qo17m57h4axzqrcwn',
                flowInterfaceName: 'h1ompvjdyu1oxvsq9xj6hmrkr1bqdpuanxscstxev3jocmwbs0kyu49ufjk5nn620kg2eiolrl968v5unmj7hmt1h77hb2gq5sswx4y9835wqx48eiwnk5ve3hucp9ts1jrhvph17n67cmo3z9k97ezpgzbjtigg',
                flowInterfaceNamespace: 'a7h2jc7xyw9ee10w4ybdjrhy62512zlezwp67kygdddvl3tfkgylf6bsmg0kfqs1c5syuwv32iw05a958wrlli6n15aiejs5gbsyd3j9nwr6yh67n0ig5ean3fiorp1m5b9m203agj287cuo7j7ocisok47mmnz3',
                version: 'mu6a68uytpdf2xcgpwnk',
                adapterType: '0cgh3mdlxynz2r5qv5zcfkal2m87slriui92ovgw5huuisx994ho96htbtb1',
                direction: 'SENDER',
                transportProtocol: 'x5fg2i7dwe0j83pr90ay9lqegrnrdsm5dz5guhey1a3wi6kitspvxn7lirz0',
                messageProtocol: '2h0lcpqtpr6eyodysjo6xvcmfqs2pqytwvjyxl9tprwooprzqirfrgn3nsyn',
                adapterEngineName: 'sp6jshtikczb2iamazl4swp9ysfujoaapuzj0ijs0h47o644pt5zte5weil62wuw0rafxmopmda8ekjrnqsn3exibg2l9lsa27ura7gxs3oy0gpx4wam305vzg2kw2jttjr3q3wf4lwb0nxk02vyreco3rbsjd8q',
                url: 's2sy05co7r01vvfaop8g3sgmy65beap396yipo265v63m451a0ru9aydizzazp4cuhuja0hx1pxrkwtx12tv7bezp9sdnywbzt97y1lzmowg4tf7z86ts7yjy2wunfq3pvhpob2s7q5vks156r5sww7ewhu4d3g4viq96sqjqfaewi16jt76w3pnk0xsq9sr1uvx2xo9nb53j37a8ejnvh3xa2rzs43a8tq3rrdva66s5f0gki25bgoj6lusmmvgkmtg4x5ndy0n8u30rbyr4wlgqho9xx1g80jobhp20gudjq2zzkl43ya3629x5iyj',
                username: 'iarbgbs8rxqtvp69fd8lgq6od3586zlotv2l6qocbeqkb14ilqgt1dgoq0os',
                remoteHost: 'n0ruvsx4i3yee8cff8asuhiltveyx24alqq50rkuejdbvmnk41nor28m5gf9m9y5uh1npmqcj017z9q06331z79mk6j6z5z29t13ti370vnbo7r22lk16o51eerr2fis9n7zo1oyfqbys8dqy1yqta3w8ult9axa',
                remotePort: 8384786308,
                directory: 'tu3cax2sspi4hnz2fc16eueh7cx1flrlzyhnpfuq0uxmymifz8dlruoqmiausgmylv9r6yoeyv8c1unsvmt8ljh7wleeyvm2jc2jkicdxxwrzk22u40uqy0htjlvx39qn93n73pc18prlwya0qurdlmumg8dsfpzq1162rnn0gdw3e1tggr6pezyhcu15s8w63128i6aoizkk5j7yfsl4nt6dqgqksma2dsd0oj94coexl8245ra0agoouvf7otbjkug32keltxzz8fo015lazz3yhs4mwa65u23db9560xkiuztfu49jvhfc0uizhn430ehmo7ol9nkvuriz5sgjvugeee3a2ajh0zcs5cy6dg4dcyb6p6ui594c5p57mbmsb32s6xm6ph8rwz4x0mk4l00ix29mvgqtil78ymw8gxzslfg0t6a6i2wgdo5m45lnua9ha7o3on7ueq1e99scq1bczrmwg59nnkw4tg6ukovwdioybeww4b120jnqg2u37o8tginiddmhpl971odrlv4jhflr48n8rbl7s542xew944jvwyjqth2yxs2fhkva3bifo1fsyrco74f8tilhb8igjnavtyahmg5ibsoc7k7re1pfmg6cfso2o7elpj8dwndr1vk6gnvet1wpkcmbpnt4tr1a8g0em68at7offid7644mc3pnpf9pgm8shg0308cf8qhzz47j3pio49rfjrzpk0gkjfm0qcoyctalv6x43gduxvfq0yjgthrezxe2iomujhd6eigvfj8bji8z712rfapi169iu5oiyt9n81y3gd5l2k2rj7znb0jlbem4mszccu6h41k1vyc1nxu536it1pzvw6mnzva7t8y1imdrp9jsobvu1q1h22409bcuieiilvkevsqkzj709nmxlfhnb74elo8n3rficc5y4uvand5qtxbmtxhomlc709rh5d3sihkrohnyu8npysa5cm43ktziidv53a8lsafjdz92d8hfm7gpm98ase8ym2z',
                fileSchema: 'igfffooab6tj6gmspqhz7ako0ogwcn0uxci1ljp64vpd5nctpcp5391gj9ftteh5asvlflbsipjxetgh5kmnjzbnnivy5nknvqtcf97f3pv285bvnyb2dnny7itrvdm90zap1chh0npha5pacj6xs9poe1uqkkktzblcp0vlzig5vf19ef7wwbtawqa55sp4puz0oce1f8jwbw91baftholhv0ljenx76cbs8u5zpqkgjyspxf7iuqy85ozgf6nxwmuxqaop3i5thsbssg2mrd5cy1vup5oc0vfr7e3q6xn6ph8lnwz4yajv3m9dmsxishnm49i1suecsoajkduuv6orvp35rki7c1ql3a8hr4zoaa1dviropb859868ku5mqo90xe9neif96ikvdon2hjmjqjkebeetslkxm1lmecq71z3jdvla9twuv1e1gatqd1i9v0yyjqb5b2byxxgxhykazpupra8kvfuidehn89l4cw4jy5c9izy7xi21ufowv7g670hyjr7smz4iqt1gp6g8l0p3ie7l2ffrve8bcqqlzuxyovplnfqwms353h9uupudza5rtq0wwphppm1e6k9hbwv2lliqhjf8d378rwq1d1f35g3mw08om6fbtehmzt5tp35t1rhbpngise7tbloeo4zg5riq7eip470yvrufom6mgp38y36v7pjvp0dn9kzb0x0yng8qh5elchzca4hltde68ugxft0z5y2f79gp418kvgyytzjh7zurlos4t41rivp00pmf0ol8tjp2p40dwvcuyslm7t4v6cx8x879cvhirbttcpb9o22bhjtluuqletzj1pdnq0wpkygplii2zjcsrm5ngzp774vdmj0m86tdgq48if6g8dbn421l2upuznnkayztjx1h056ja8f5044qna20thkp4j62cpxdttkfb9enslb2ojapst23c5fk47rmafbb2cjj5eyihaulbol4lv0xxrtdk0ejr5x1w5bgyhmvtp1zzmffqe9l',
                proxyHost: 'bwcyih6uhxkefseefnxi3vplxuedbv6pxep0w4fgqtazohlz92tv9nqjf7ip',
                proxyPort: 5807404121,
                destination: 't6zzw53542ejh42g5ne4faniti6yw46r0q6yfhuv3ofk50prov2fbgrxxwzh55mqlr6qe1si0jydjrobzolessauyob19fe8snvdtplgevcb2643npiqjmhtqtwgs09dythrcra9e0rn9d2urffqerd345vokuwg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ftpg3a3rfm6qklzon6qbe7tim3i5xjeb1vjh7f1mgm4ivtbrky3e5q5y39vmkc9xkmvvu91op12z5ck6s05taicg3p8100jmp8l2qaqz17luflddk79ze83oqx6apoytdims4b3d1z55neqzxa0cn9jlibtn0u3d',
                responsibleUserAccountName: 'spk674jr3salkzeo2099',
                lastChangeUserAccount: '7gu53bgxcof47dvdhsii7',
                lastChangedAt: '2020-08-30 17:34:02',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'foo4118k7pnvsn9q41105jz62754hqmycygjiepm',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'lr3uc3wvt6x4ygfxv1ae7hbgkreqfl4ekij78r8628f1rwsnfe',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'y8td2qdnj01d1rps4hdi',
                party: '7cuaep920v1912kpx2ubr6zswqh2zj5bmt38vvpopkwnhqw2cpnpxmp2ak6dt4zvngqr5vwz4cldhyg3hziyuyj6vplx5m60hfft33bsoc1gbf1wjpkw34v4hv1xsboemh9o8aq9fellze58z87lf4zep5ye9onr',
                component: 's1ssab6ho3etnwno4418gu0d4eq79hikhj1gulbqzl0badqwcdnn0zwssp6crt0vnrfk84w7qplr980djmk30jtkvqhtg9xlgz2qtre2icyoxy416nsgl4ba3nez95lm91m1wydffrgzgcgxxig9zirsm865lt0s',
                name: '67tcmm5f2bs34ispulwc8upkk31ukfz573b5w53g103twvzo0p7ggf4jxz7x5ttw9xeyu9yd03q93mm2ht4xlr4yyorrnmaw8zehlidvk8jr301o79l3dltbl2is618tqd36mobtnrtz1jzzpsex52eewmbcw81v',
                flowHash: 'ljp91t1kvx35nxxutnzq61wu29axurms4tzlj1zz',
                flowParty: 'xst7kqa6kc3zut13ub50cni05aeho3203fd3zqytegit87ege6189cbvxetaf5mgmjoxp2v8gklbssv73wcvcx3kowi08epsylhpumzwb7g8bd6edl2n1d311qbno06ewjaguqevca5f63k9wypcb3a18om7188v',
                flowComponent: 'yw1sfpon3zgf3jnjo0g6y692id2jlu0dzbe64ireid8yvg5nanit9rwp4tuqawkjfgmc23w4sia9pl06m0kp4kpa3o2fw32e5k4flkqqeajwzzngy17p9ebbsp1v7w9l38f0tjr24jdfynkxds8fg8h4jvnpnasz',
                flowInterfaceName: 'rbtp50suq7uh76krwrrcyegms4c4rdll5zaj74x8fi25vtrfx6uwodqnnr83bakkkobdp7h0cg5xbwvsn4jfinpo1ebz8liyndum3w4g429kxowkri2tvobwxowwla7sdu4syeg9z0bvr3o9eju6d70g5wamrkx9',
                flowInterfaceNamespace: '8y39em5xtgffe6w8lsmii4b2gn2yyoyrkymgl32segmfm82npk8ntatb4p1nzcah7cyqr7ii7eu9c5x2viyu64pgv5n6grvhqmu1l795k7m7da11clzgljd4m0tb9n0j7m6nc2eu6kkti4e8bw4dpdz57xmsgkvq',
                version: '9r1hc717tbf0wd2wewiw',
                adapterType: 'up0uh299bo7ynbf0aqt0k2ecsf0rjbyex1xmujfv2iia62mqilakqp3qew90',
                direction: 'RECEIVER',
                transportProtocol: '6ehgab3sjxf5hxvjyfqfuzflflpk6fhvsxjg5zty7xa498ssxa8wmdz6bzlk',
                messageProtocol: 'sqgmfeiehomg225sbg3s0jao58ps1ohrzc8hyzcknbvru79uv434o4zvghp8',
                adapterEngineName: '0i0peiy1hpo2j7oz963pisldfz05q8z9ym3y4e43uoahy0tc95rytd3omnylhnfsf536ggz26upv2v4barfh91sgdvvojujn3j20moc2iej9cm7e3kbkj4h6o5rr5duqh2htw9yl42kq3d1ed3kz52roqvzl9803',
                url: '53r2h785uyfovu05xmvvwbua1t8bidz9cm8uv1wplbya6y0yv2a2ke6umtr5otoif9jgmnofltlf78avb684lqgxj4urqr1hhct7mn6kmd4siwkkh8nd3s9iwqcfzvrhpfj818huyxsxvsdnojaf2ksgao91kakc1m510q1c3akffgax0vee2df2ojfxa1nw6t482ir0zhymwp8kz6dwibpxi62zpjc73sarj03h3dijevdovazc6u4ewde65gxa08x7uav9bv27xiv4d2xlu5lzvkickp7f4nblw8f7657yi5uidxs7exg6t875v033',
                username: 'tonwowv0gc15xm066hgf4ne236h0dw07rp8aqk0c5y1slggbf0ae6761nnae',
                remoteHost: 'bkgfn88nl21hlc56h9kg8ht83fcps9lpdvtknuorowhoom852tvvc07tc67i7f26c17y66zmbe4n8090y0gaw6khkolc4t330tpl5cyi4k0mk304ox51a71qyqruoopm5tjrrc84n6ucy0b4iejxvps3c7luxtif',
                remotePort: -9,
                directory: 'r0me1zu3f6vwr0n5w8bs70uga2buaxzb96vhucdudxvjtq7kuwstrab2z7lymc41okagdlkjk4w3l9luh5iu3ljopgdv0ehhm2mbpszjgv5gk4oailkz0rm49w5h6xxzudeofwpvnmvkpp6010d1l683texnpdnhu80g4hdzaub0jun9cbu00sfxaq7q1u3pjsk9ioa454wngcre9qzr8w2lww30lp7dln5c0hr1tlgs46srxq3q92z5carjhjqbhayzbo5zhduh2lyy0sqgpo85ke0qss6x0lqheclojxj1w7xg8e3nbuat8n5vwfpamg9tekuvpuf6u86gyjpuzsgljc1htb9hp6kqf9femzl3pcqpdz1l9tm02j5jo7e8p67euss0tyzizxwkxy4w9m563u0jio4ltmhf78rrdtyz1rqnx8c46yz34wpvubmzo72v6ll0502xlboie389vrebbltowpzyq69oml5s97sr5kv85tsvwz9886roujeo2lyz9zbp6kmbdmogcp3lmicc1gkema7b2azn2tqg2j5k5ct8k42k00od1nkg345dp4kd5jzrqhfd0q6ha6yfqqa8c5e85wnxa59aphtjmykoy8g1ahvuki763vudv0daj2e38nphhjzpcasfxw1p8batud30fzjmwu3uitguizsion5npx7nr5e7rfej4yo5rgkoi7g6w70xbjxvn32440k7a9rsv78riszc80y8vbjmjbgoup6a1qlogj3wuhciip4jtmnv7jt0hpqec43p8uow043vcg6wfs0ez8360258c42p7n05s8f4oc8xy0s0k1vg5i9igl1b7brz57lhkl21d36857a28c18ma8t5sg4hx4ljo3pws1lxal7lggtd68jnan7461ijjan2k63fhx1zz4b15698mytym0mofyvhs4sypd7m0fwno4kbfh7ffnqsfemdjgfmts1q12h5tpfxlzksgxo62a8z2sh6ceswe5egxw1esumv1xf5vte',
                fileSchema: 'fnurmk6trvq0l0yb1b6z6pjskkk9bng0t1omj18vcbsfj8l6tnwe9ehi27rpwy91hj6mhuwbj2cr8vomxqpju2fl9wgvd8y7hzs2w6bkduge3l7vi5la9nnupv3rwdmfoh2o33ddq7v7nozr76pbpyvn5v344mc94czw14xaad32esiz0pc1jnycjglfi1urhydyg6dzcjmbcs2lmtjdu94rjschttv4daao1u18qrnow6ged2gz5unnlz2uk7tm8206tahn58q5pl1sqlis70ldy3oq3zcbchanpllz80q201jxiugop252qtfnyyq7ey8lsx4nkym689cuhw7amk0und16otjmy7mtzxepxm6b2hg3j5ew5w90c2lru1fhjapps8iz9to5vskliran4qjnixpwyze68v3qpzc5o6b3c33hcufwkwo82g3oqca1eivojxxfd5fdb5qcsst3doogmlnjy4juzt9jnjfyhfyf7sqk56s8uty1afk253eadsivuj4lbs7adlyloz11ahcwkmm1vkr1p78c3ldueoh5umwj2gg3y0lbxpsgnxyui78madvkylmusy22826o4w1yjael725h5ktul4db9ls1ixrggelx8ljgkr0lufsawdd9jscbdy3ew2j6gk8az5v7vja3qo4dektylkr1u25rqkk3f7esz7te1d3fedbgzgakfm9h29jl92kzzth3kqnjnm46dhz5e8dfrc74sgl4vjelwk9yhvtulnvm4cbr94ipdxq8i9ih447r669ruwj62vu5hswltbsbbyribc61v95m4eatnsdrxbjuk9gwz2ih9ddvlcsw7r5n3nmz34nn1dzhd3jcbdyserwxmds0n489iaia51nphgmhmdge0kwgl0r9jc0ytihbixuzzjm46gwtrazuiw8qbxni2x0retughq6hjqb9eppwczqjxbscwwphxb0m6cbbmlmph1aoqcwhj2fgjaq3kqs05t994556qerww85zcij76qsg',
                proxyHost: '6pc72mok8dsek6n7kfmxiws1zlqhl18372dlw32jds3bf53l0g04g3nelp6e',
                proxyPort: 8364412270,
                destination: 's62niugto7dg39bagwn3baaql1ntoeo7fglr55olo0n4m2qcl1ikchqytnia8h2ty24c9vhnyupawp3zhh6l4zkykaosofsa4udnxxwvevamhiu3rmrl4rtysxep1k5cylzbuq73vjlwwzpqritevbwdtz4hc3dg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1ne1ga0tlp2uvr4vy41z84nngxd9ljbh35rlkzkimj3e30ja0oxhkt7wn12se628lwprw6pe38jzra7jsv03cixrmg24ie1nsw7ki11gzkat60qbgswui03degtx40gdl4ta45mydch7jy0y7phr039h913eo4j4',
                responsibleUserAccountName: 'd48h89lkau7eombzwfwf',
                lastChangeUserAccount: '3ae47qbjbkep45eyomau',
                lastChangedAt: '2020-08-30 14:59:48',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '68j40e1aesio0sew9991x86qvnhezy5x8tgw9c94',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '652xmbwg7em52yggg6c0sckoahpxphkdkmb11s8uel6m4am2yr',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'wk84dq5ci3p52mc3p2cw',
                party: '7kbs99wzyqdquf59owbm7drc7gub0mq8jnmyzgiv4jwft8bp71t0i9ungbc8hfvy6qqtdn131o867j29mynekz0fgvq7c1sg0mwsetjglzu6q5mdgf0y7qsqx9ld4ssg27n4y68up9fr8jtvtd9qhngopwfc1vft',
                component: 'f61ojstogj8x6d8hzhlkydnrij8tln3swkdu9ycil89ntq5n99ja392z70jf3y8jm6ql9wjrd3ujke8npvxn2s76zvbwjbtzc66q3r5t3r5beufymptk1byynias5g6hq7uell2nl1fr71nw9h9zil332kua2h3b',
                name: 'hrqr06uwpawosmo144scp5gby1h4k4dbk8eah6ewd1vmcebkwed3s5rpngl8t8ezxko3f6ao924p7bjyk73xvpzasalyqqopfszu0rr94jor9rnlhmkaw3fijz5xcvh3f6bjrhcr89lcbejdv1nby8mgx4tqw5pm',
                flowHash: '5a5ab850wb5stky46ziedqxsqvvo6qwnbz4ynm2z',
                flowParty: 'k2j7l3ax5s72skdbm4y6re4fbtussgnmuxufpjhc4mth73jniqflbpp8yinotj436gcle1a1xb3twk3flo2nxliqhemth3zm2l8t0ykzlso95fseeljw7eys2qio974sfoi397leznb3d1151ml73xoq6zmh2uwb',
                flowComponent: 'ytmpce3pgo4sbjgz8cn9xpcsdapgboxmx5553b7fejqp3s95kl9a355dntdw3f43k1hajwt7y4w0scacmuiy1la84u66oybhmhod6e09t077k9avhp70ds59s8hoyv9tq3wuf56exf3w2msvnmpmitlrwvz2cz8q',
                flowInterfaceName: 'ytj83xxv01741va30udj1a9i8kpwypwvet29u9izef6cfec80bvbn0x6s0pzs84ct9qo1sepdqyyr3jx7nkihfpua7kjggo19hsj55hx0mp1anjphihocploj7k0czf4zu8hi720nnlnsuwpnirv021d3obhbuus',
                flowInterfaceNamespace: 'o0fheaa8hgteyk1u1r29pw0d4sdy9m8bm7rnt6yi5nsqrsi4towrpi5f5varzvpwqdmctn75mf0f3mazsteq34oj76psiq08qot7d702lmxinhogqveewc2pzxeldmr31hyhr9k7cavfvqah18tr6jovn5r8zfup',
                version: '6aat9hsc5gf3kk9a4i1i',
                adapterType: 'xn0d8hh4klvnu3m9i6wiamrnmijv0uv4xzg4lclnlik1z8eoizndneo5o2re',
                direction: 'SENDER',
                transportProtocol: 'mwcyylf18quyfdphpucdxpr6yqragpaqay5dz5zlmt4473i8dxahwo72nsiv',
                messageProtocol: '6436xv2cayuxiyvbnkqf3a3sucmvff9ljz7xjflxfc4zh4vu47uczquqapke',
                adapterEngineName: 'mk9r153y02gemvac2hvfopl55w8uli5lp6too89go9e9gat2iimwrwdxa6z2x9v1t0z7jja7byu6fuvw8xgch88z3fub2vcwwfeopw4nsdkckpdb57fcsojmdlwsdu2qtoi973nn1bnztkj5fngbz9yhi19bb15t',
                url: '9615c810s4eieyw3tt5sgah0oydznv5dylzww0gnvomp87vswndlfb2z0l7bpqd1gvq2qkrcxxlhmmbjx2pd8gc0zfyaldq81rvxva0b9uybg3c7vh7k3yhj3ylx10ynuxx5u97ytzqnz83tg6poyj810gwko245segae2ezyqs3g1vebww3ok0qnk5kwr1d3gw5mhefzbsvbl7elgshrjhovuew8nqmgp7bfatpaqmncsckw1s8v56av8n3ah6nokjk1yftfqzze532t8kyg326iqjh1p0garei72i01ps141gjz0zhe8hxxhfhw6du',
                username: 'rypr7ksisbh1ru06r53h69aglye7b3c28q7pdezywswq5vvu0dnralst8gck',
                remoteHost: 'kkbx0nl7a6txocdk14eauioskaxnbzhq8o9ab2a39zvw2i2i1175unjal2go8xkdb1p7csrsx02ccplpqkvvgd7tpva0znwl63q2hmyi4g5ee8ss7oqyi1usk3hzok7gl5nj499lgrw893ci3a5mo30ib8oz9qel',
                remotePort: 8762414067,
                directory: 'jza9fax1ujrxml4lo8hq5w9vjmsxw91ooesj2lajpaqx52j0ovxuc04mi3txcpakfqs62bulzjnplp24uks93pchew5h5hmb9sd1c3jg35toy3f1f8ouq905prwbw9sikkvpiga5pqga6kav72vbtknb2owgny7mmeno0eppd9at3jooiefm4541yjwg1ogp9oksasbcd1t336z0i9558eobl7rjr99214as30c5ijq0zv0yxp1myhbhcecgnutk2ua5kqjblr7gfncq8o9tx2l6fftq1aeyovjeui9qi1850c0csfskl40e54uy12e3f67r1q9rmov0dmuc1vbghyiyaysh7i700j8w8o55b8lxdk8g1wiqree2s67vpco1guxswnl6jkudh8y66j7vwzvhqg7wlwug23048ilvvhqhtyjgv19fzaz03xt4hlmtle0ehsezp13nhhlv5sww20g30yvesqbv57jkgw834v909p2w4cmoideqso83ynfvmv90olohtqy1qk0gdavu957orzad8lhb59p6nwgumbl5jypmnkd4w8tkns8pgaxo339u2d1m7jti5duxhxavritrtmbe0vbaeg46d1deopbean1mm6wflgxe1x218me6hlxjwb51e5padwpn1u7edmj5alrhiuxz7uwj42hd9fijzkgfqua7gr799rdt39e06pduiygi8p0djl8k5pm356r58dzuqnvwnquh28z4rzh8rraidfaeigcsni2algpvou24z0suqgky0xx300wo90ommcluezna46ejcvzmm926qh5g8dbx9kta9mtj2m8majs2gxk7og64zohjetj5xun1xshom0wwwekkuekcf0kzcgex6geobzkq3x3nxu2ojct54snj9vd3kjc91doaamzbbpmh7pbsy2o32kvt49qa2a6vavep89n6t9b368uh16kowli9dpi86ayq82kww2ecu4t5p3ui8e9e8de54dex5ceqxuzzb4lutpi46388',
                fileSchema: 'ikk027q8ijc1kt47x4sxen1ug6yj0ugw2or181w88km5m690dvwyh6911796mx97c3g6vv48hbe4cuz066w0036gc1z312w92cd2wfxcy33gjkd93x0f1vhps5eqnd1b5x4d1fottmwwuhbelybiw722a6wk7aev5cb0d0x0rhbswe3v9b2nrz1x4ji9s8b0sm2neb8ldtx5li4wkzbdvnx2kyayd29ijgsj76z7y0gnmpagh7vz53fykveo6fqml7k3vvdgt7k1jdno07ivyv9sishakjxjg7jkdmxs4fjejjm74dkh1lv3ed6iwv7hhyd41uepuuwcv6wpdfvdls3ie6qus6x8yluxzbtnflmw4iy1un312n54voe186glgpn8qfwcnq2ajo2ndz3l40scsxzk1gnixt99ka7f8v54t22wcti6s2wmq000elqpf7gmkg0fsd67m2tbq3s0agr68cehz80w1r6t4u1apo75cqx2xj301llaioazvxp7khjyd5bmkekrb57ry3erp29ivbdaidnjo5hgc3lhysj17a6hjgbjzt6tnzfhzg3epe8xbp0a10ir4whb5do29cyhqjhbit7amcxb3z0h6ykk1zjh4vwa0tcrqgmhu9603v8d6v8xyu1hz46sm8l7pa826pewyvs9okn1p76fr13lhg9i56bqv3kvvofvyccqiv9ud8tqv0no5kgck1kl0aiqmiwn9mrlxqbtd0gsolbu13rpjmqxisne8cj0chp9m0vkqol0cq7izbgre3sjnwm5i3f5fo2ye7ykeguzc3mk5rdqlyf4tlod9xqiack7mj68t9heu71ki2p4jogdv8lmcqsq0p947u8gc7fgzdw0fsxzspnb85z9tl5zq9hdpalebndbvvrm6b9yhbgqppsqrqstimmhwveautqoar39zvh2bcfe38owevgv1djqaenkyz1llhkjh4j5pgwoqu58nnhj3cs09njetvfsq25xs1koobce2l1fudgsqywg',
                proxyHost: 'rsjkxr5i3ep2ei3lw3vhe2scpn1250lmwu98s8s9nfmufmeb9qldyqmyhkrd',
                proxyPort: -9,
                destination: 'kdztmk27svb77e271yis9s8v1pl8iom2ge45m3he6fr4cyaz6do7cnu9tr68lfi0bye7rhbki3jbaay3r7e18ef54lhfzrf1u6ui8jv2qyztaqyj0hzkyc6bzj51qh0kxqhzsz8jz40gwr9c1ui1soxt4owar0xf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ump9p84isdu0nxw1x15r8512grdyoxrrcvqxt39ob7syanqd13ehv30k30tqoww6e48geeeoz15jjv9zs6usdp5r80h5pdg4xxd3y3up9lkgz78ii8rarelj0d0739zwfei5jmxz6zyw9stuzqukqjl9n0sql939',
                responsibleUserAccountName: 'cqi7reafsdif62bvule0',
                lastChangeUserAccount: 'w6j3hj4gj0fgkm1lathk',
                lastChangedAt: '2020-08-31 08:16:50',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '4io0820kmtppi2nfevfxaitunoea28yhdo15ks2j',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '5bluamzfh4rx6lybeu44dnaeixndogr0hzim1yzsa6ms2ykbjf',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'jrfhwj4pr9n08cdf6zqr',
                party: 'ctz2fk279ayffw6dhv39uh3v4i2qwto4xk9923eapxoxygsgknvdrdikv1riz70ktq0hu0st88x9ijb6dfrzn0ckjtwd858qr8y9sy74mjf9f1cxhvg74sfb9ttaak52ocm1zrxhd2s87wkt7ghejbbx2w6q5k2x',
                component: '58xns66t3h9j8a4u9bwpotbzg9xho6j63sxmqojoqjxcd3gv278dwrtlp1vw88j33wn21h01s1kqv3y4p0t39zpjsbct0h0s0mr3w8nysiyl15af1mi3vuy7hev7dn1iq15viwtjppgbwcdqhc7yzyqx5gs95v7i',
                name: 'itkmyo0z7x63llbwp5gomv44j9f9a0ikxj29jjiqdi2r27esgub34rcoxjkvu41dkert7n31qm09uoyu9rtuss1itz9z5xez0i1hwc3z608uhyk0ox54iavk8v808pzs6fcfqbg85xf8k2u3l4o6c0rvdiftmzv3',
                flowHash: 'jvkg063v85qehjgnzlqwq11fqwiqx2650o5nztv4',
                flowParty: '86hamf6wnfk6smkjjs0ztorgljsrxg3kvysv98qio1vcmn9tcmfn83szfljeepf5icritye33jz31deutlqzueaoo8ygxglkahxeh18abil249in3d6s5e5ycajb223z2oa8p0fsf9z4j35ehl2au34r1vp20h1r',
                flowComponent: 'jztpxsi1bdnqushk0xa57cacpmmn64y37v7ygfawhhnx01t782onfzxn6y5ivtsh83enfm8osy6jdny7sqtuajrqlxhefkm6bvv5xksq14zmj2smp3s3snyrpc1xerpx0xk8n0r1zyr70h9vkjyh6xnate74o1l4',
                flowInterfaceName: 't57wm747rqlu9dx7pvyhpndarkdg7nohi2u7m3ngd0akwza6cav99dhbrbl5qffzabwimog0x10e0to8j1kcmnn2abt66dljin72xf9hough97sep1jqvf4io9vjjw7j67uzr6ng5i89uyin5x138g3vtaootrss',
                flowInterfaceNamespace: 'ppabbra3d9c53fbw9nglhh6kkrvpcutaf81sykh6x1n9kdod5hdbp1yxruz7yp6y7s72t4hkek8h7qjm0fa2gkbo6zghkf9ebmugs3warvjp5nk2u1dktmergl3g96qt6llbcmi0hj0igigitvg5e6yvqavy4l80',
                version: 'nkozonwsa0s1eumuamu5',
                adapterType: 'v6ayv2dw44a6n4ei56v4j8tejsdhozd1yug47jr3lprogwsqdn2j7su2tlum',
                direction: 'XXXX',
                transportProtocol: 'r18qij9g1koknzue4kjt5srelp5p5qw53fxfg9vwv6viu9xrgzmz5bx5d82y',
                messageProtocol: 'galbnsw6viwlm4hlu5ik1mu9uu0ftssfvtde5g6xmmhitwtwjawt8ugj90oi',
                adapterEngineName: 'pschoej0gqff5dzukhus43fkwokpui6e7s64x2n0jmrdhwgxzok2ugu84pi3uunydikxvlxic0f5tkiwse19l58akfwya8st0qu15pweynjaoy41x9oc30hi1ceye9p6rc6ddqwf6qz0hpfox277whytgpwva36c',
                url: '2jtn56hapw48iesjjc6dj0ii491193lyqkf0da19z9dlvkks2i3t531a23viabxzssjyysylay2s4jcibmnxp81f6cv09624pz0de5e1hur0d4fyylo2g691fgt9z5tv84xax4uv7spyrkifpa0429262nmxt3fphvd8p0nw6tbtlkd42hduzwp3j16vyenj11deyg6atyjnqtt7roafq6oc7adtcbdx8ptg080k28ndcbn2421kedrnihegl0esawrmqwddgr8bpx0ug9cm3xf1vdb05jxkcwqyujoo6vofpb3xa0zcpee0afdftton',
                username: 'euwundop14ghncm0lzra797f9bco99r8fzvuvxnb4vjkm6vct7qzj8ed0z6v',
                remoteHost: 'vyl3dh42z19xivw2hcp5i7fvsb56hk35r5mtnni5c3w3k3vjvxew79evylghrhfi3ir8xlbws9wfcjffs84ja8k1dw5rxtrhps99ei91f0tq4xi8xci6pujnatea0q48ijo4aju5v82ee2vprdqqv7ej3vj2sud1',
                remotePort: 1814505280,
                directory: 'xtgzl2x5l95iox534x2ek17els2k0mfyabpt7wsgyqza3zt467ank2mmao23wr4gh6a92pk5yen8ok09kn7mzupfam2vldc7alm8f91g4z7of7s9xxk7lullyxjf2n27942jlcx16rl2rg3li8l1vrkm0k546k8h6zpngjo9chotanmxnl1ts1ik85beyley1rndqc9m6dpxddtpwf42sz9agky0k2lumnz92g856bg2mm5nnmxrk0ikl4txphm0nqk17rhk8mfgxxg766ss79fejcqc6jtsk84r4u7h14te2c2w5ahjdj9kd9blrhcjgio262bzex5zxb5lfyzkvrlb6ebp7y4ed5y6baixu3botx4atns33l7mmbx591duip80p1e4huafvikd38m7con46c7ooyq7sslriqj2ryfkf0krb9q0i06hqn3j2bummozcau5dn4dzewhfsphame1fs66oxzetqbiqr31idm0onuejgkj4nje730pka6isgq87usvn15njyi3hskrp8il0im7re3a74g0p6kggeyy39up10k9m0f22sdsbg646bbt2xxw3sjo9380d9oqk9dbsb8ram8guco26qug55g98aa5zeblisvsjvmsdqsm6vcvo4bclix3zgtwipa3uwgj72cn5b7gzjfx51z8mq8tqruat1kkmj44c8f24desrm2phag5ej0dsndj3d0vn5mn7w2g4k00fw7iwlfybw56pd5y2tj1uqzqp0f9mhuzd8v6mozrkhuhioy5465ru5ckn35zxffahmool9icee54alt152wdotqqw0rmwzorvf21xf2eltz7205ni1su4p0caywxolr2899c9pz9mvfx8gekooy366kh5xqiv0vp9emdcn48jian9e1txt3nt1dw88onq8ivqxep503sep6brkizkccvb0thhw0k7l0tnveb2mx14swy06no4lft3z5enbqqzushnfyy94kqwisebv0lo3vzstinnss1h8689',
                fileSchema: 'ee38rq3z0br2ym6tze2oipg5r4waz9ttsw16oinyaisst0b9rylvf4euxta9pwgri68vbffpaj82of87bq2vu93eg46lyyfidv7euk9esy10oths8b5bnneiyc7fyuidhg847ta885ljv90clz55ckm1f5m58j97sqpadocbko1qqeapj3cilhvrpv6kv2kg1i93o65ampwlam7qoi79dw0uy7g7tyywa8xxh63w84wp4trot4sk9roygk5w28eilt77z6ozhrocc9b3o2vp3z5ouxmlsmh24oxmytf6ntvaw8soq8iljt1ybfie0oz929hma2rmkczeuf9xkd2mtxj7daqe98keb3qk7fr5dmdpkdxnuyz7cxgqrdeem3ez7rh59clp29uj3h1dx275jqwiqzljpaw4v2cdzwiz1z5lwcxybak6ck9kxwtebtxbv9zsazecrtq78z1a8p06recr2zdkejdap9gqu89s648fpj5zjduva7jxk0f4qd521xssehaaouyvyzyhwc9urzo09my1ef2up2w0vc91gh3winai6zg1zyeclx4lfbenuhe0j1pwj4oqkmvgb4l8gmzeo9drtb1zbmcqfznf01qsiev0vqei6vk5hpt84gj9qzy4f8x95e4vygszru01sn9c5m7tznkn3nie2fwgcxe5agevcatzm5qoo8xicsgzdap0kol6kxgfpvf9ypychdn3hmwotxgb2ezdea7okdpfj0e9nlwmjc652p5u0miiyx26ldpw06h5tctmb48jex26nb87ub1be6zdx6x98uzf541ls9k8sly5p006ef2igosgpg3jmm04wng0sozs0cul2ruqdcbbny9rb1dj6dczj8rvrssoo1g1lgc50d0ysnnwsuluy4e609aw6ubx5v80y5hg2gdi8001bukj49pih4a7trd4qjvp8ogd7u4pv8ee64ivnj9a9wvnqsk2tofrxjyh0j8b5tejb5v0b4ouz8h2a3zmcc5a0bjctklz',
                proxyHost: '5ydp3hs394k236dewdlm7htq7jqzjlhzuds5zzv7a4otm7npd943gpn6fnd2',
                proxyPort: 3174691477,
                destination: 'ak9dbc24sa7w0efj4cr248il0qdw15u58zryu4hhsv2yzqs8nlxkwkxp2ah711pfxrtsel8uhghosex19hgrc3uq40rvo534t7sea0y5t7ijjkldbj6bu8oh9ypshw6mqnuda2vmd7utmhz3lpb7u9bkgpb192mb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hrm6z90ctdd46671e54uf6lk0yymplibvvcczmp7j79bqotttzkd0dcpwotuzfd0muymlcv8illja26yvqi72juuimp1f7zrm2kzugo1csft4jp129cfsd9ygkh8xiqpgh5oj36m4vxpwqbngg73n37rbl918gmh',
                responsibleUserAccountName: '0z0rxd9npacosek8ocg4',
                lastChangeUserAccount: '7ehwdfejhhlky2z6agot',
                lastChangedAt: '2020-08-31 10:40:45',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'i8ei7toydi3sn23gnxk17r96fezigt8km69znvum',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'wb1bffekj7fzmwjptxt8kxrmujzgd3970msy7zth6ws19b9b26',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '7b8r10kthgmapxud7km7',
                party: 'n0zab7dmv3vez8is0j96gwx33rt811h04i9u0t7i400b5bgamv4rsu0ifaubsr0lrw9zcyez9osbhm9cwjyvofigx2hn4wlhpo6lu8b0hgdnk1atageohobxlkhpt88ngct2ljf2q8w7omgg57or5rnjweh34soa',
                component: 'xgycehc88x9hj76pi8u4d07rhc4r03qzbjoiunhizahz1uygke9vf1n3saisvrjsasebgcbbxkihzkyw507kvtf4s7iltnxazk0nuudcstnqwigll8i7xo4t3k53uwdx398qnfxzhlfay458l5s3dtwabojop9es',
                name: 'a2q0xj5cuq7nxinxpmk3r7vkwzwmh30m759o1m77jv6nfpx4ctae158ox9fatse4b1d6eh7yjv7xavk8nhren4ehgao4cm36yxw59nnwu1v0zeolikp0fa2uj97z3s00f83acpqqttnq4h2g9a0s0kvzajqlxylx',
                flowHash: 'dmq77mz3scur4x2pg9267j4kkx2e4bws3z2kozku',
                flowParty: 'i2qyqij5967athdvjfwb8x7uwcnf5bqdh0ku8mn2gl047994eey2lkevntj6rcnygkty580swiz3by1ialanh9b9ivrt8bnb0wcy5yna1lkyeh0nb80ypywtcaaf533n5oygkzahuc4dxn9g165jictzz1izgyam',
                flowComponent: 'grzy0cntogdqmnqx17pwvb9kobg5jk9jekvd8qy6vh5zron4n52jy7nq9d995vggl3o635qweui2jqehk09t779hvbwhtmzq07x5l7c5qyybo6dnj3pgjhsbynxm93dtyeuawfp3dzhfr6ujz07x6lkakitgoick',
                flowInterfaceName: 'q4egk52oe8qojn9h1v4fdpk1with0pymz25wewozbt8k9123jon42cehjib72xjyekujrb3ici4otj77ir9140679lb5wyf6rmcj0fwanvepg3rtiizrpp5gcaz8ni7nu0vbxbpjp9sztci6926uobwlk57zh3w2',
                flowInterfaceNamespace: 'h7edx8petyxjp78lch5jlkdoytytmv87d83nzgt7sjbt39asvsgohrrijd3xfgec396qkn4y8kynxbb8mm9b1zvk5091cks3kwqo8uoyz4yt6i3wpizv6hdfe2338xuuii04kctxuobrrtgiw0k7fzm7ajwfbvoq',
                version: 'bp4wiesh1xtov5xznnwa',
                adapterType: '12lnuyu21104v7muj72k7ykgpih4s6lyik7r7liiye7d6ujloebn4bbjvywy',
                direction: 'SENDER',
                transportProtocol: 'dwnsb87j3d45aedzsamr6twwitc64ri46gpf0pyobzcjr906tuxdjt3o9to8',
                messageProtocol: 'd09mfr1e2828ezm93c5wyluf1kvclkelwyiu0kevgj1enxhehyae82sab7qt',
                adapterEngineName: '7cyp5x973xw1o7i6coxvzt1g8v9ltx3u9ejgnm9e0sk4jxu0nz0qndtsotwmbgbvnf2u925r9djno4v0o5b379inj7lrlc6j5bfa9futgtjwi88p8jurr2q4e0eqpccja754he40pfd97q022pau66lzzw3wxr1i',
                url: 'r3j232t92r10hmlw1f4z6hawf00paklbcddezdfiwi5kdpp14nn6o0em34an5jxtdnih8b20c21gx1clqobevngsuixhdzj26uhqto57fbofxxb4adrw4f5ghm8uaktn97xczwa7zlhkk223qu5d8f8bmcpmya6tsinof37as9ryd0eluqig9dmucbxiivayki7zxr8xe8my7l8un1a8jvc72rweha9691vttb20qdyfomuq3kt6g7zwt5bgz9ybg974uu4qwvgzr9xtvuhfenp997ncp50wl541aa7jg7lsf96vc7rciwdrvdj2b01p',
                username: 'vpg0mpve229ndv26zuqkbof2op8djiteb9ppha1a55zrvq297yg0m8jjeq3x',
                remoteHost: 'dkrz55gtk1w8fcllr08afzawwcfdc2ybd3wg1ah8jn2vax4rnnqeadtf7dc83mvd1miaft98xhqtzkoo2d3w4kqflgpip7d1fyh5qh9uakxuy99smiavwv7du2wbnb487hratb1i87af9uqq3npac2gof6qa47kh',
                remotePort: 1690351786,
                directory: 'dd11lcpalti81c9h9iwula6584i0nheuezmb81uyz308bquyajau17k6910ifaam4v67gxdtnelmvonxtwu1m2uvmkm7fdr84o1qtup87z8fjihsjn4yvsy93rlnac2lf3s6y8g77mlxhadhr453mrj3hz92brxvl7fz9s9ggtur3xecmte3w57ru2a50nfpogqwjdo3cs2uza9kempxyh1z4z0yzeve88vylc34vlfdkdqrvhzrjq6xtji21a45nmoai617d6256894xci2w0rbjxdcpnpi445kh6g123miprkle6oxxz1e6zstvm1u02i1xcqrlk07sxz2l3gb9uxddwhv7r99n39txee07l7jviqcnwn9n3wu7c2yqpyqlctqumlkyomw8azxggfded9lmi7wo8pwtiok7kahr1yd9uydivzfxnoda4z6p5wheyq8wpsai909ivk06qwkog1hqamugqormrkkdk8arjf0t62pp9767kq9fmp3jq88oys9ro32fgfp7f9jiwtwlar9qxh4kjd4lqoqmhrew5orr3nywjyezq1k0q5rlh3dbop2tta7ife47ar7fn2a5vrskmq42jx5b8qkbz8nlgtstm3n5cki3dbpo2dm8vy8idsp9oy8fakwbnr0a92al2joxadjj1abz181gaf9tvukg41rzz7f9tx69bz5osuvspn3f7n808vq1v2ud9rpo6b29h6av9u01yqu822zpundca2kdhbldboibz5ius0epeduh1t59d0m9o3xzec8epkzo4f5m7efjo34e1doxyy8qqw5vlcs0f8a8eu2w3krsiw9dk4eric9ddkzsi9uqv5i2t8t3lhzieju18253a2mlkyhxdctlolfu89cbj6pjdp8s3d5qcfv0i4h8n5lqsq3x1cgnrp96lrao0577343q25puv0956lyktaqpx07qsfctqu8z2bzmezy0hke02qyy8m49206071v694rr3l52s0sjxtv3l7my6mbm35n',
                fileSchema: '38kuz3g3dz9p48ro4oci8th4dzy8sxf27jc0w06tqgms3ejpbgj3w23yoxke4bkcr1dtsrg2uhl0q6jhr70qo9z8tlvk7jfxtqchk1w19yaz0368oz6mpprwicx5hxzc8hlhgkja64bfyzz8bt1qss566d4c29pjz3ve7039w12mpu01phcyf6axf7dnotvsux3rqlrm25gzs5igp0z3nmu6urgql26qio7h5ka8atyzhpzz5387sshnkcw83i6w92q6oh05kfbg0kt3gh7spdae6uik261cwelhuux3aj2mu5kflrkd0y5vn9grqgtlnoblgt0ziyzwqp4s543dxnstspts0csciwb0cofzwu0jlcfvmg4tlvddk414b3x66inagq8czb8o74gwpq15lsjhc4woafq6ufouxq5hwzrt714rt79ss3c6j042f0wfj8k69wqx1moqtxgniuy6cho8f7ouf5dmq4e45bib5wid49nc0jo39cqroo7v4mmsu6i5992j5smxsvkj05pfdh2t21u6ds2s2us0sl10dsflle5gmza8sng7k3akkfa8iu85ibs3ij4v30s1xfxbeglgz60cvvi0d92vbiguqtqp9uppfqcu5ai2rqer2ogr5o3z75dsqv3ahg5aikyohvcj0k7xjl5r9jb113ghbqth4rs9a6n2oanx01ps2g821qpwd6p0l5fzri0osimv2tc0omgd8gjagezrmvmlqq6bw314fooxkcd12gxdrwdnu9aufdfrf0ewqrjza4k0gthavd8b649hx2pa4zontvx0uq6ld5a81vbkvo3iacxih5tmhnz09iot9d864xmnid5jcw4oini334yucikk0y0pscmswjeqewa9vno2rpztk93dk1amr3tdpmmoiyqtgn2hrgeokutnw9so3tajbrfyvlb2kj2ri83kg1rl8zo17azhl7trucpr2ldmmu7m482u5cww285955xpoknmpx93ofoszxbdhoi5crztwpor',
                proxyHost: 'bns6l9xssf9gfctut2924oyfsxwo4nqwe34l667qzskmgct9oik4o0joy88c',
                proxyPort: 9716733492,
                destination: 'x9uxnoamefqf8gi6x19twnc33avf2tgggpqa4s7e6q1b276zyc58m4d94dlobisebrs3ly7cc6bnu8buxeyudsojnx51ibm3b2vdexux4xweqr71dxz7n4dpcxm2kz2929bnfg4m7pcw47o01rffnmlm42lkn6qe',
                adapterStatus: 'XXXX',
                softwareComponentName: '2ww4suaigf41uuhnlbimh40oea96zzsz2wfizgaa70vclhbmurv9whynngur7kibqifmh2mfq3jkeza6l1vz4dc9brvm1ivzpfhz4q11dpjeioasy8vlhjeyg1740w5nd1utjyxtjghpjrbbkskuw81wx5st0pnl',
                responsibleUserAccountName: 'v6piv4132e73g6gz8alw',
                lastChangeUserAccount: 'frt908v6cz8hul1toy2e',
                lastChangedAt: '2020-08-31 09:51:50',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: '9t15xsuggry1heu2tedtzs782gpfd0dk06m1zv6f',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'j2ysm8wghrk9rhv789jmp0rgnfqsgfmncqi9ugurhtjoo5qe7b',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'imopk4eehep0i272r82q',
                party: '5yz1d2c1flmk9jgded7xadlincpgocvj7844wfk73m3t1bx9xfg0m0lfkaqsac30zcejmuoiyl27x48h6mmohlfz3n7bpvob2xkd95x2m1az0gnda1rxxpmk8kp88nqbytt1benw34bhx8e22k6p9ju3xkouwnqm',
                component: 'zbn5nitq0w2p1dpss20bktosavke21n1cys67ro0695wlb7fifg1ch8jufamb6df4ytzuwgvsjczh9c8u5ba2yp43s385grwbbkrc726117dijq85a715zc7zkk51w1mtsuqh2t8pbu7af6n8xf5kkcls8btp0og',
                name: 'y620vhivjrnsker4rtgya54t92fgi6mc0tt7nhojtighe3da559fz68b0tr3j6grrnufu9pdwtv1sbgsemaftixcag5g0iofis4tjuicam5mqs41cz1p22qv9yfx4933tmhsmwz93wz6ua1ubhtcubywxcz6ohy6',
                flowHash: 'v27jqv3jqjb7ce6xujrstlf9vhp4y6qgoql4o93e',
                flowParty: '9hkhdxzczpx8jyuvmwgbz0v3e5pyhxv7gmrjoz7dj7e4r23e0mqznz0sqxr2ptndo6pcmadzv5lhfyfm5ayy37kjofh4sre4cx3tk8dginr3c2dfr52aq7hbvt80oa05x4xh4lcvc8fah1lswgt3nb1ny4hjf07i',
                flowComponent: 'dx6bkgkktgre64j6ep0f1g1d1v0hjkazmrjixa72c92tw905ls1nse5jrc7cs1j6s5ob2x8gcalmu10nz1x9dh6qfdn9cmi39yl2tqsbhe58jh5owld8rmcl0lxgzddrr1wcc03oangfgk0fe7s9dooauph9akyv',
                flowInterfaceName: 'blxsyjbas1b1sbcq0blhmw6utkc6tcd8y1r52xkf488ko3mite59xk8s7zhw5u7x08yhntbuzgiu7obl3depg7cgmytvpi1y7f7my5ys0ndl9pfes0391ge5bbufn0v035u0cuxw5bgwxe1ye4wtrhjtojzenubs',
                flowInterfaceNamespace: 'l37i596s67s781patszx0psovgdfj8ni1h84xjkbafsnvfmand3126wcdakt8jiousyh7ckrhl91wkzomwe6m8a866c3cgvvwvsb2x8wh7bxhsq6ei79gpi465q76fcz9zfh0ia6g18a8b3x6ahj8cmzbfnl7jzw',
                version: 'no4ierr313xc1mqocrjc',
                adapterType: 'dt9s67vyibapv8v5ya1wnbgs3usnmyzz6yaz2bs1gju4aem9zgtdnna0382w',
                direction: 'SENDER',
                transportProtocol: 'dmt0nums0rvrxp2pcbz89utqbstwx9i2bnr0g0ni2iv7wo2fa31n4jfz277i',
                messageProtocol: '1v2xsozzxza2sefjundu604awqg0e9pc2pacd0lwtoa0p7oik1lbxt5fq3qz',
                adapterEngineName: 'joxwvfelew13ght8gnz4mj7r1hwsgfs1go8mq5cuq2khodt3rorrwpmrzalobqmcs7vkkgfdrbkm141tbzbb4zeg78tegakyae8ngrp41584brhlumjtdske5qn9ted9mzauq52d1atbsebrk6s8zssk5rmqd7ba',
                url: 'r5ora3xxolhg10bvqkt7ymladv8ndtte4utwjrbwlc6ld2yufchu7l8gycidar4eqqptzcsynnl6794d3n8p4v3b918ss0m1tvz7m01l7qjhg7g36plnwpgsgslteqlp4b0nfxtdba6a3ignudj452ujx091axwbjtmbjsamqjaexk73anbv4x9yi9b1qh61co7hajt44yrtkfeva3lh7qu14qquss4acsxd14u6zn5bhdjf6ujrhc28xt4uumt3mfl74lbmwc00qh5si25z0ok1xtwvfezjsvecbn7tzkbfqlxweij0yeuxf464bmzo',
                username: 'tcy0z3iobazk5tvwzvitjztgql8jw8x7cnoalkqitr7br11blpbw1x12r8yx',
                remoteHost: '0eu08txl0u4epu69edir61ohlayyer9ioxg6kkoq6r7z3oxha2q6u4c2qkxsoxi3aha2kw4orr314w47n316rdduug42o4d58rigkfei2r9mvdscgx5aizhl4nxv21bescc6m7b1rp1nr8j8cu4anvjyu7y0crtr',
                remotePort: 8883743547,
                directory: 'obnmiuwxx2apzgjcz6dvv0rg57wcxcyz8sefknvix89x2dkj2ue592fbb2cgotuaxmbvb8sfh104ja05m0n7j9leltvwlvp9faminaxu8s2onjz353lcdi6cqdk3ofnyaksk3lync76iiypacowehm2pdt4yrsjx38rdn9d4z4tt5y1tqhkzejjyj3uxtzcgx50nvt4o2uq1jzt9le73064ebve2iznohs40rmtnlkl4xsqtz4xp1vqyphrri1c7u29n4we7a4yn5qr306v649vnb1a7rbeg0unb5iuvzdj8cfmvz3my9lzbynktj47ckr7aa20h8qzwjlzug794e4ilrxiy49ce9r462i0z7qrnmmmzpc4wvpx96wdjtsosfv8932g88uak6wlvcvylsrz5dinww7wt9w7db6tkkf0qm1jia1gtiof1gm8pnj02vbq82zp04cizs4pjofg675use7fglyxfwzvhr57wl08mh6tcc809d7y6ebjtyeyy3n0nwankelve65etga3imbgtzjc1qwwo761xz16o735c1kykv9muxu4q7qpays890c70dg4aqza1e1lnw0lx5rldok3ckzx90fubhz47gt98oq2wfcwfq8ksweefbd4bxhkhiq6nqlbvi3l206z6dwvlypytubcc80ispf3jcz47no8t4tp6y6nut4d0jrbcnperk294fegb2ku3qt4brdh32psiuu9bdqhpdmzx36k3jnxhkydlisq1oc54r1wgosmbpz5g1tcoslkg5o7wnf2dc55gccz0k3qa7rcssogcqujgaq423hffjg85793d6p0i2g9qamd4exshzya5hu2ytiy8revv6nxuuj4bfz01xnkv4rwqrmi67cuv29n7ll7fdvmlas6gvaajx1mf0ur4h6q2ha8je4zl88ui9shzhr7dn16lfs4sqf23xbdqrisy43e2fcfto7zuaajx41wlaah5y8yew14eeln7p7l9jphmgk3f97imyfu9olft',
                fileSchema: 'rz5oys1otiflucmk4qq21c8aaqemi0u8sgl0lnvpxq7xhyrokyerhjqqfsmyacd5b3ey5o95qq77pdwp326aj05n42o3mv11rdvgue37dul2isbcp1s4uylrt031vg0xai3dkqy1iue1mghzs27978krjj0dd4r7zakli124h7emybj0ijvttr8jak8gedew7vokebht0haef9uim86x08wj0wvd2ewbmi6czav6e6mk7x1ypxo3iztuq4ub3sd6a0n46d9xl85c195lanxw5prva5apumrpbbg7r9ykqxj7b3gizxj1xyjdwqh809rk44ld05ynm404wrsi468vyhpgswp0d1uuw0l5cqzfch3z3dunf0w53157hruubp93mqh6q8djn2f3etkxl9g7155i6bwia0j8whwifpz26x9qtcbnftolr5jn7ktzle7sl54zffwtqa82d0y004i674v5pb66qkznkntpr2npdov7cdi4dy4gn4ttjixj6m3kmnwuirt88lsm1niaytmyhfx3sn81tk8ut5aia82b8d9krjw8sesnruwkrfo6t9xr6cltly6ct57acasquywc0c57akc0zvdpmnl2p28p4n0whnxpbw0r6p8fq43fjih7m64hrrgomckk6q70pexkw8qbwd7opm4me2t11upd6noukv8wfh44lrbq9pgflc1vzqx2an6fy05o6hn6yp1upl37j3ae57qu9jd6618py1itzn23fwpjzmkp1mq8blfk838ulhqryhv39cmi2scw46cqiyzrrzdg5qpnsheij88fra2ewdfdg2c65duayrfxon7e0u0fhq0l64682t6syrtd9qixgsdn6ox71p01qeoi6b8ti71jsrplcltbq8a4w1teerr775p2kp6g798assw033r2ej9cfgq5awhyl4e628n7yymqm1c0wmiv6tqkhqlr0bqq93s4i0yshyzvluhhr5gg6ajvwyxjmzidifwggxqaz8i2rlxwqz3e5q6h',
                proxyHost: 'pvis1du0e6vts375h8gb2c4scr8a21joiv7bzp9jvzfh8ytylmhiy0fm7ny2',
                proxyPort: 5250531584,
                destination: 'q7g02jfwoi82aun6rxp1j244xelscuui64zoe80f0v9otywko13w63fw3jwgmfwiv8xrzsist4aktnvv8aimr7td6ngilrbv66v103gkyn2ra5y9mzbrr3rrjld2inad256zqz5gkuvtrl4t1na80mwawkbq7rv0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uz09q5qi0pwemnm54iwmuifg17glssxph470yt7mf11ubht9r0mxk388s1jpv1r3yoqwqyks38hk6xcblfnsesj1ttzqnvk8cxd08wooljow2uqjw7pl0v8mybbhqt7bjif08sum8lxo4vh2inii5h5jzq3xb0h6',
                responsibleUserAccountName: 'br9n7wdx8rw7j9royhwc',
                lastChangeUserAccount: 'k2r90g82rxdn4nfjabb8',
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
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'n2ng8g26gixxw7ymqpjrb2kp3h3ol43l5p5u9n0x',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: 'k595ngwxd1j0vb126zruvon8xr225dk9tiqve4rvjnfdnidfvl',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: '4a0hhmxun2359p3skzte',
                party: 'pjc2z1v2jr5z2fnwpqw0deu3ogscyd2sxyybsfvw5g4ow4ux9upek81vgqmv0nm86gm5cnhve1wm1y46vdmp1lvwktuzm9l9idhbe186zhghnq95u8g3ne7lm72l7ny0ek4pbp2liqwq8m0dggyvrhb3uk82c5no',
                component: '4cg21hqan8celxretfvk98c5brq1as0004mfhrnr8slqxgtsyykeydt8gig9lb8dcexdjfrwofvv4q32q2kiaxbb1jyybgrz4d0ihll2wyek9bbvivneti27gylmkf3lji3p0nokgngm3q75fhjetjkzyeqv2n64',
                name: '3cm7ud2swn1r8vomybemm7wzwha3i75u6pzi9zwr79cc8i2he4by6nfdtdeg7jqqn1qv5tmon8f83q8ksft1t32d00dyimzw2n18zvy9fyxfd9sk9jwz7zbjo5ww3rrxw400u58ecpz681ibax2z8ahc5f5n5aos',
                flowHash: '1jcajo2d3vujenz1by25e3qoym5ek23jgxkw6k7i',
                flowParty: 'ml1g3mwjxmnn0jc7dw0nmnhcgghbu2isknwbvq3iappfmit2wdsymssh8xhzzfzbh56h99qqhc4ufqf3tnomcwv90c5vr1p02m2il6h729055m1h96owjvqav4tc5m8vbl97t60hrs28tltxzk55m5sfd07095qz',
                flowComponent: 'lf5ij9ghmydgndsfjgvuxupopa8f6olvrwc68yvx6aq9i9xvy3qyy4pzngrvmwhu0f7mdkht464cu4ykf46pny3v2xlpn0gxqae9s20jajyyl14xg9eqe4sv0ms3rhasnfbt3aahaq883f2z9b0fdxq9f2icdyu2',
                flowInterfaceName: 'ul07wfau7mpjh9dmzt4e3h5w4dza60esqhotv5fwbjs998v8yk58whrs5ti9xfrj4arft6vbi9gc6uq79m0c3wka894e9jp503ydogso4np0tjdrzuiuf8nszawwdb3b2hbinswtj71dpbfh5r6nq6glhg19bxh5',
                flowInterfaceNamespace: 'mfdr139jynwgn5r7k5si2d5k3yai3093gps4xcr7dfajwq7li7lwlz32f7vi142icjmv9vvnobumerhozqdjr1iycemcbbwur7nc43ikdc6eirvm2qandlhk0nsmfcdkfn5duzmtszm2tup4wgg1k41jsaps9jkj',
                version: '5b3ggbkoqrjl3w2trdhn',
                adapterType: 'zxtmsmnpxw8wkex90gda5ixukm3p6cv2ei8qcq730xffmqf1hes05c2sxtj2',
                direction: 'SENDER',
                transportProtocol: 'dr2c6ml6prew1y93w0af4aa13hwpfo5t7igtkmcda1u5urm4he190ub58wxm',
                messageProtocol: 'slsanznytz0jwv7yea62fofdbq4l81gtos8cmhp8q70546qoqs5jlke1ebdi',
                adapterEngineName: 'llu22p2k8rtxufrpv57yhel5rh7d76lzon48dfhp7yzpxv0kcx9flhijscerolkamy2ydegahkholcb5m6xh41ndxi6dqa2p3t3v1o0a5o30we1nr0vjlmzonyyxb2hka9woer6bcuhclp868nt4u7335j8avbk4',
                url: '3knilg15dimulunbcv156pqinba2c9akssl9am677v4tlm78fekkqv069fbj264bk69se8mkat2t6xohuumaiew3gse2pr61hir48ahg7ko64efnvwqooobfenps6orpmkxtpsvbzhwmm02lfo3bk9mfq7ww0hqoqc6hrzij8sqwwb4ln6m2i4k6hfk1utoh3tt0v8yvqdamnffzwe1m224nvsy5xslujx1wrco5hqudysvjp1a0ajfen9f0r3egnr0hbraubalkdvb5hpbnv8lhvehbls72tyrbwf6lvpmfl6sd40eizg3vww4kny9w',
                username: 'h17z88b0rjw79kl039xb6s7qy0e0rbj52kebhrtul50jic76nmp6jf8s2vua',
                remoteHost: 'tl5rfrh4yivuzfmxioqj9ek5iht6ehzd4hl2856db66wuhxbzfu9uuqha07wfey5r6wnqtp0og9q8w5racjd4wacn8yh79s7b4ai061olzu9i1vc6slee2u44zosayz5c3vt5pl5r1y7ef1p46tvk9f07ges5y3q',
                remotePort: 3351099259,
                directory: 'e46sr9fu7zrcig0oooy8sqguv28t1ov2lp7vgs5u2egca76ooyjqjf98bvxw28e94sys75ksl349apvd8rjfujx3nwn3kb5tzdo0yavo7op5xhoasf7iec7fyznwqmgudrg3yp2nnlwvulywfyvdu71dkjzzllevwz59l1z8309mwko2uybt9wxakfcwfcfqzptkzqry4qru3spmb85gqc0d9wyde323qgtbslg9oferl9osw2sjtb81r2obqmqh76w2w1sdqap8wqqm1jgj9myjzmnhqmolqwnjkmzxcbz20gczlpjfykfit37wp42nvnmqqp95qwamjoma1ac6xjfb67e4tln2qhtadmzi2if6kyfx3uatezr71k9i4jrqn7sd1vj2gem16ky0qyfutu4xylm7m3plyg0t6p50lx22zybo8brwyl25cvdmokcgv87cye6bbdx53mahnd5qrj4xb4ah73pt9ror3dg8ex2twtjxk18a722r62d35ozqu0ksi41pc47ipi1t65c7496vah74574zmlc5m4tfh3mn9iiujrtszheo05hu6b9067jv7nbfr81z65vers84bqb0g05d72uly3okgp3eqwm8cv6umfan7wqttste5d0u77icvibf0qfjn6hrx2m7q05k1h0yekpym0ry785jgk7mt2ss3cjco44ybcpumfy8fcle1opvi06q8nnghm2nfljl8qf9al90palddsefu9vp4512ifxhuovz1wgbnanfzp7driifklibl3q5aifq77fyl8vdx1e6rzveef6yc7hp56wmbk5jly0l0vsjmiypaucgi5ahdr8qafd4dmsawplbdlgyvhp1thdgesffzv5wx59a4944ags5ouw6a0i5qdm9sv1pyx6hrr1g372j5ad5mfe7aub51xd7ys5xdcindo0ih00a3mbgy14gxcv70pp17bmitms5nx9mfb5gehsgxtz03tdykg6ub3z0ortpf2xjoq1rsevcz4ibvwqg',
                fileSchema: 'jsiefcwvshx5siwr6lm9wqf1stvvbhsmqtun67po2s5d9hkoz03wiltv5t26272pbomn5rflhr3q486we0xnp2h65ssz9jx59j6i6rc9kyiybgqy72sb40xa5ho3vz2xvy6rbhs8opuu2ujg02yzxym0os21myqfsl3wctrithpybjjohq98hv53md9vl5x72r4abf95un6a1iyiuk96g9clqe6jeksfrrz7zk12a5v0y4vy2jhf1d5h6m1qrej80x9b32iogab6xjng7j8nghygvevv1bkqostzw82jq2gjhiqg7o1qhu1g93kwe2hd65ekfph3dwgs18ofala1rtkks924g4xmnemhdwqjl0u57lkxf72aor1e8zylzn65ru3amksvevup5swmuti8c9qv8fs9r0wjdi2h1jiv7qn7n0vxkoxx6guwix0buo2pnxpx1y1rwdorlpxethpck2y50iekqsr50828z2794vys0mwvgo1xo91e005v9v3xt6lp58wvkmsncduzd04ca5cwzba3cn9b456iczqyagg3wvxr3visgfb6pq2rx67h9mf0bocc8oiejl26n3w9vypqcqx3id7leedt053fee3jms39k4ca5bt2f69p1nfrtwgrty4329bm4vuwgszkmq9lssdg4maj17fk67iqpymop7hihk0a11ljty44vpbq78atqpu7besb1rwyxenbt060wfpzfik6z9cggcis62hi4fiqwobbar3wg91nbys7paou8ug4qxnw0me4mx7hiab0itixp3ex43puu595e4anxcxes3hg3zifsg49t4nt77t240yl2fta6p0n50ttqwyfd2tx38clge3cwsctf7b8yjjjh90yb6my4jzgwr86zwzuyo6deg5q1zaetkglkb9q5gb3gg62p820z67m51cr91k4tkzs0anppep3l7u4g7m3ki5by7vdolve8tykkviteu35lk5k9b6eq66hkwotr066kvmgjfgm53lqg7ts',
                proxyHost: 'yc8actaud5f73o59kct0xhmadoll5fu2fvsivyw4ayrgatqszz4rl7y4fydk',
                proxyPort: 2127041807,
                destination: 'ydbt4jmnitr2dkm9wmbng5arridr93e1lkqzzr0tv01gvjyr2y1j6yyouhbx2pb7zk3pusg5pmg96hs3v2hsv975p5tp905cttby8pehynoq5q4x2jexgfsgro5ip1eivymx1zkponz1flt4krjkklbteibcq8h3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bkn9p3girodklbz5xihsl1i2v62pnqjwqs2vol59dxlyib5dm5ddph07lx6svknrdcrinb3d3kowx4x8g2rrp5lscc8pxxotp5z2tz0up6zuo8r62kxg02zml5z59msl85hqd7ia1800btcsn5u6vzxzz1ts9y99',
                responsibleUserAccountName: 'm2zvxruxzxiev2271iy1',
                lastChangeUserAccount: 'xok7y7ab3m4kw70lyyet',
                lastChangedAt: '2020-08-30 16:26:10',
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
                        value   : '7a0d4e6e-779d-431c-9752-ed51478a294d'
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
                        value   : '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '10c3798d-8728-4ca6-ab45-f377e51b4a6f'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/cbd2bac7-4ed3-48a2-b04b-acf622a77c33')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/10c3798d-8728-4ca6-ab45-f377e51b4a6f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10c3798d-8728-4ca6-ab45-f377e51b4a6f'));
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
                
                id: '2df4ed86-b6dc-4839-a0ce-1e2346623165',
                hash: 'k5fmwxhqccrwuyhmmd3je0zvh9f4nwe8zoc7pdff',
                tenantId: '6842cbbb-d965-42d7-a4a3-15812e328daf',
                tenantCode: 'clvgjmtq3ye5alq488fp1g54mklurhpko73e20yycb43j43oxc',
                systemId: '857b855d-c81f-4025-baff-caf16c53b6cd',
                systemName: 'xa92zzrorkcarsuxl36g',
                party: '9pfmarl1kx6chn3hdm4gh77nabbgzqo5tbsuz56i93ujz6mb3l1ce8paecvlzmsu32lpislt5d9wg1eg0uy77x17hi5pi32j4xmllssgvwkxq59ylrvowvqmnux5oion48qacb2cfsnr7zes8ijd56kaiu7okrfi',
                component: 'ew6wu9lep7sj70qh8uacjk9pgiqshy5cmt7x6vjipige8uxi86y5k4ky0bhqb2l9egliuvz1oh8pn5fpl2dze2dc5v62q7mumgwjzoslfwo02qasajfvbmfdgorhb8nx6xw7qjo0o5yu3deo8rp36oopqdtvdmuk',
                name: '961ok5dcyzhzxzizdu9mk78sxwe2i5lvndze63rzklo1mtmtkqbujds41a0boeosh4i2x450qjugb5gt1zr1xdgk32bg9neoviq7j4otn1bn630tvd2lzh3ubpxw2pqu6cc4wtbk5eavkhh7bf1l0jknzd1vdknt',
                flowHash: 'nm17whpqsgoaj6oc2px3qrrwhr4h8s7hgcccec9s',
                flowParty: 'tsimcp4tydiybujku9cra7xm81hwar3hrn6t26754bd852kagdo5g5t5htnjleiipx07rce48dgemi64ld1o4y2eqir0ukbgg5uj5nrxvcgy17mk4ev3jz1vtnyl7swnfctnr98kd8nn4wekndwiiob5p0tawfh9',
                flowComponent: '6pon1moox1tlaccft4psvw5cmtgu15lhetnk406d1ndgfww548i35jxvgki6j1jh9ikovxzk0oovs4yjnppdt803qt2s3soh48clp1bkadgpwz1l5p4ybjjkoee60mvz90g2htve560nxzo2wtq7c5gv463wkf9e',
                flowInterfaceName: '8ak7h0qn56fqywu2u3n5mgeelxnjvrcwr3evt45b7w4n8ytk79ykok3gl6zfmq2re150p9wnnzfi0g34wsfczfoznkzox70bigeig7xw0zrsy7ej416kk0qpg5vv9kf4tn33z5adimns25hxtvon7j9v4x9c62fn',
                flowInterfaceNamespace: 'hyujyjyn8oe0ui2m5jgmwhmgj9cuxd8beborarh9hhmosj29apj63njwrkdiufj5skhhfrqxsxw8r835u5aabzmem12tzuvlq7lozl0e1kh32rz85rb0vok54cqhfx0xavyvishmbkqdf20my088vgew1ktza9ub',
                version: 'p6vw2ig05re59rtuuz3w',
                adapterType: 'zmnmyscqn642x6sbyqszyv0rceciw3vbbfv2siyoc5cpwmhau36t27bo6epn',
                direction: 'RECEIVER',
                transportProtocol: 'klxkigo774d8z6vbwax8l1wq0btmj4kmqi7ibw2qizmu1n6pttm2crt4ynws',
                messageProtocol: 't5vovo6x37igz25v1t6018uic0uxkzz395k7iz5tm5ztjjk40wgjh579ojti',
                adapterEngineName: 'qb5oymqf1g1eswpn1wjdal4495l85frrzghx5aaj5wiw6tayrn86zhz2itgcqdu1u1guaih5cn31uied6g92edfa4dsw16x7rxpdkug8jmjq87ugj2zji27o74pnfdr269l2v9findqpnt8glt4c0ff6nrijd0qu',
                url: '1f0q95a2qlb382fix2ti4aq9psq7c7fl2eprebtgknw707pkeeuxpmhgtosnwfqjd41oi9rlxtwt2m8udhbkstu1c81zl8oal2apkmpbfj77c2lsjbhuh8ng8spbxrdsp0t6dcvd29qvka0zpclyorefl06c0jdf8sqoj2a3uggnw4kbr7eedxotywktmqt5gu34ql9wfaj9wwdozi1k7z6mkv7d2bdawpfd6zpqtkvm5jdhiwksdbmu2xywujfry642bbmc69gtpgp6edujougobertpqs7xqcfywzw3c0b9nd0znwv7hi5c5hhc9vv',
                username: '0349dznbjevroe505b07qtuvptllpr2qbsqnsniz7y8rq88ml4nltu111tp5',
                remoteHost: 'ckyy4ncx6ul6crobhvwhb6to7mx3qwve9q7pdy8gp5y2nxka21p4id873u0p9hob1o55y671hd63c9vqbxge99ftnpfzvjvawh5jmg15y50q9623buh6fxcr45joksdvgs2bczjthl7zeanzbrwn4y16q4b3y6hf',
                remotePort: 3561120010,
                directory: '745xdijfrreupq5m6gwxe28isvrsnibj7ip17imt7woavhx4f7bfmdtkhcc3obbwh59ajkl7pt3fptr2az0x6iphimim315sv44efm7vf9b1n5mrtxh78ygucznrg9s7cw0toatuz18fx6ga9qxr59eidhw1s7569assvj41cs6b2j7udntfxtxhwryjesit08r29h65tsnsjfz885nf4tij1hc7hlynliwrmumqwjmgd3shxvry0o11u1f3v3zmj6cny62qqge9noj7zjh134zcqk0fs2zffsr4k40qx8mpdyia5edrvod592r27ehfd84rg2yasaule1mdjkxl8kyh224hkg54ib8niq97p9k4m4hugplrjm4ccvlzygs1orm9bfmoekrt8ag3vudk08wrjpa31x3s1jfkk8s05v0rg58o9v8ig6v2wc95lmtllpmjquht478pg0ss86zqxrjgcg216qghcrgkowbdpegm0gwy5dqju8pwu766dnfnkvr3b8d91vavuevexgrfb3c64zuomt497da3p8sksmcrraw6gygnxe5zp3h2on5p32rubj39fd1cfa0dzb6w7dwsb677tqakconowi4kyhwg7ktc77yszwbl85964k3ovv46m2t6uc6vsbnp04bqbjm7w7mfnzs56yi2a27ixq6m6cogtzbzd0181o3zo6xptdcpyx3lyd1julaw0uzn19raz00hk59gt3pc3e8m0jit5gli0o7drpw5xcntd4f8q3qgjjhw5weg2dc309munqrigsw3v1t41boz35b8h2afdlkdfxninpjop09bv0cp7mp8kthm31wit0d5xybswc9szot2wovidlh22mgshwxafccc0b9vzzpqf6ab8d7o7c677n4fqwejo7blo2artqnan4brcng8sjh8e3hyqrr7bizv748eh7n07t6wpor53083g3gw5gvxquld8o8tpbp65ame3zfg5uh3bba7f8vg0gbx8i9t0j8sxtdq0yhe',
                fileSchema: 'pwfx7zumk2fxm20607telvfbni7upyxj4d65ev8m6vhxuabuvfr2h7iwm9vtwo2n25z3uxaagjo2z7jucgnzoklgkdywdheylok1ekxrnviyqorxujivdjvq181upf7je5b496ersjdfd3faq71mj9rcv17bzku2il6urjspoizob8qc5455ymki9vhqot8hvv5trjyrhd3j9pa12oqzr75kavds2vx06k862j667dxc4bn5g083otqzq32vuuzgi8werppc7gqcpzipruh0vi8qzgmcwqx4ucylcml9dm60ajr06rrs7hq9z4r5jshgdl8v4tklsb0mo47zfgy3i98n423phqynqaitwcl1aio1e5isf7tdjjk8ysvcj0rs96yscq867oh9885oiflv7l9yc2gclio8xv13b82o44j0ylpgl9ejd5p7znvji29gnx81ran85clppebe1p851c8xo624295eedu5o09di5az69ryj6oprr5oj3yom7pqmfr6f5ml0flrv78v6apymk2abws880x7ogk07q127qbtd9srmr5bli5ikapqrvp3cl1d18udfgr2zn1zu5akl3gmo1qib33xvgc5qnmwdf7lwlagjkrkv88in3lw4drznhemxn1wrdjh57615smgwrel7rmnb4btau0j9ai0xf0p9oiogvkvlrssyelv0f58lzvvini6o72wiltxm2pe6ezelgqlha09uuedewel8i1ovpg3ahdno9mqexnk1f5ypeuw7df3nnq8qqkt31lzd6i7fln40rpqqw2rvbwysaizetkrpmxr0id39ajsf1nscgtww3g9idpha39c591prznwzyeycmpil9iar3geiwd6fxs8s5114thduhuvrhegjoa7b9ifg7p7z2kwomz2ytatwf2j1ugg83iu26z7axaytync3hv8tv6t9vudvje9yi27nbmpwo9ma7tt65uzft9exza0lo8rxxitmqc1r4hq65ea1uwgnb98fgo0450o',
                proxyHost: '4jg200v0rjfqnayhkshnhlkdp5f6do2e850pcvn72biulpvof7g312gsp9oe',
                proxyPort: 5948822319,
                destination: '2ofcioalupq46le4tu0qwlfgyxc1usctb15cs9xp4b9mm3shw1hxtrdy8cvj3nih7zu59e8t0mk2cag4dbwyjnb18tspneg1fwc2144xg3ymt96v0nzmm8x2m3x1yj8gc4p1vx9h42s30t4gfykkuztpq12f078q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7o04hwe8vzbwmxyq84q1ny5bjgfnzzfi4gx98th3ypk5md3agl22r0pwjjtcvi1yxjtsaeqbqi92f35ro69fiuw1d5wkcx1ayhlg4o5jv8kfwxop341v1p9rwnci26hbzo6zihg44lts88hma95l9tfevlt9zern',
                responsibleUserAccountName: '97thtmkce9u9c7lamyzq',
                lastChangeUserAccount: 'jryfblr3vwrcfghlyi55',
                lastChangedAt: '2020-08-30 22:33:39',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                hash: 'g2jtkfwhow4ijyam4o17oo7nmclirhw223utqo0y',
                tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                tenantCode: '0v645aejozdtvtcz4917kbc4tzrs1yqydcnti6ppqnl7dzztsg',
                systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                systemName: 'dt8h1ax09228foj8z2lu',
                party: 'sed915uqw1ufy1cpygxjz023umhwnlggyziumhu0rzct2lyvuw8g1bdi0grj50t2xsrbsge9jqaf85yon0m0rkmj9nltdk8q6r58n2dyshio02il2iq6pshjm8lmtf63m8otf8mzsyikv78tdytfy64wvak5qygx',
                component: 'ggqjocl4u5jqru4s8f3sphswbwivkkup8gfo7nj6t7g5a895sx876a5wzc3na2ks2k56qjgf6g7mpk5i1nkgactfp84kyilc90fn7t6nwgigf86un2sdhln5yb2rdznhy96v8qxpk4s8cb91ntygdhe5edy7wo9g',
                name: 'zlwdvrbbqagemkk3ziciuat7g3mf6356oy2788qnteckr1jinhphr1t8o3l5ww4pjrs1f0ijyzz4ji6xhzhp5bl2dnf4kkwimjjqb71g9z03jq6fqa9c8s6vhsgutgquuenagj7njglwny6606fgapmt41y3wj2j',
                flowHash: 'u6hw5zsdtr8x7i7v1qd4q192l7mru1v3mea4dwcm',
                flowParty: 'sdtemc3sgcysb2qr3whv59eagmrqaxbkisdjy2he2iean9qaub6riiz0wvfmau2qo61tp6rfp1whzjxoxceoh5732ouemyarq89i0y0ex7pdqzth1zdwm4ukd3rq8m90pjaa5asqc1tnzf8o06qs2o689b58jxk2',
                flowComponent: 'lnjuq0zovu9xil4bhw79n75l0uhwp1h2tcclcnmcsxpuflsgqncepluqba3fvcoch306yqxsuhl2e3mq2t125myep36f310rak58nuv8nksb60vnuvk1spf05gec318lcktaoea1by0uha9octd2bzu0oe3w61je',
                flowInterfaceName: 'j89fm3ojizdn2sslq4an2agh0aza5jmrmsb4wzksj1t2wlg9gzmdfbuafuemnij9ipyt9nlomfphc9n6iaw8kvc494ffi8wskal5i9833wi7j8jmpomdxdpfrgha5lo982jakcdlju0a7chm79l98pkcdt97atcp',
                flowInterfaceNamespace: 'don1qli286p8xg70e90br5rv6swynnocu7810ccay6orqswezona12bjn052tu249bdx6pu86es46027341wo4ks4zq4g28x7sqco5eqr48t1aiesqmcns4fr44argkrr41ilbfgdxsp8bj8ttsgtizs8mkiookr',
                version: 'i5tdhx86gl1ce8y9l6vs',
                adapterType: 'vlxnlq8o87gpskfcf3bkfw1z3rjfvy2n53ei0tbjs3g073kl35q6p2x0i5vg',
                direction: 'RECEIVER',
                transportProtocol: 'u4wibbbttjsxaert0yloau6xi33snz78q4dhihvz45rtzz5tgecvt2qz90kc',
                messageProtocol: 'krns9xdei2ehuc5nebir0eeh7obxdejmtpx4w6o6ji2sgpbpl882s89zxg8n',
                adapterEngineName: 'z6023lo7u5bzl5o0tty9f74rteqjlys1ppa968858zanznyv2z2n5cgm4szjbir9yq54t60pknhxnogk1e62hpgz7ga2i4bhgq3pjhqsp422zaqu8c2gz8bbd8m3y7lozanahegwa951byaslon1o75ywjzywu5p',
                url: 'ck9dlgbyw75kwpjhisq9c4tkcicbj3lwewkw4i9f89mtzc9roimveczfbrgfnb6mkbdekan8jt11v5yylif9eeqrr7xe7yaw0bytageoekpwl9dku8qugvgej8zpsvn4h83b85qkrfxoiiem5xo1417kjdeb4rxg0wddabq8msd4t1k99mpzrob3oe61skkvfmb5xavh9lx9y83ikp6nx6izqhm89m5ars69qnuf3x8svu6wlcj6spxzbl4uwn2550eh2ynvh9r7h8fcu8qflbdayrn8lgplm9uad6db42lq4tufkvoowt8g4orobjve',
                username: 'y6uv5va8s5hrpvmjygiy9vtbsl3s8yjcqdscqyuczb049utg9odgo96imr80',
                remoteHost: 'lsdwq46upfg3uivr2teym6hcdporkrehn713u47esh6zbbouyvs59wud8o5jfgmd76ac8q2i0l9t3pr6y2du2o50s2b7q6fldhlqbfs5m01vimb9l3mv8crw3izjc5svexj4ikj4qfb9vqf0m3yxzr2tchvl7x3r',
                remotePort: 3644280752,
                directory: 'omlkiue0aqnfoz2n4ztncs13hqihdfaxj2ezvxspvjz41igknzpgh2v1ulngrkw5c4uz6d36zlxa8wz20qmej37cuwmm6tpmfch2m5e2388tgz1k232k0p3kzpg6iza9mzzcgzggzw8yk7l4h5ro946avo0h4b5xu62okd8he631cu4yclk7bxipmunjm2ajdcp0oq55buhvdgo8gsvkrkdt4z5uu9evipxdk75n2vkmwudpdpfk9g23tz2f0r4m0w44nr3zc00mynzk09xurn7gv9akyb7aa6d7enilq3bgmg8f8779jw0ukoo7t8ndtlb22j53l86qi41loq5ypviiwgp69hgphbg3ynmfcxqw42ysh6q9mqfoh80rju0q19so9zb9s8k1qatc84hxzo10u87mmh9wy2y2c8lrtooghmpf6m3zjel1gd2hlt2jwa8rryajl7oed09b213bh68kr130ci2p5l49y1acb0ypp9elle5psts3ljk8gqaxiqrzmo154313d06gsgf16rwfadmbv335yvgfjzutevq00d5g8kio2ahgi9yk6pkduann8qtm1va1z1xoatbllb6n5lwxl53jmbfodjmm4zrxo0n9wbyd07o5zki6nfz3bbuj01c5xzk0ehk8pjy2eejemw1opbg75ytu5l97du9jmhypki05ra0luo20pytlxueufdk6zfkb6344eg7ex1bceee07zr97zt058k9nwe9q2ydbzs19usn65km3yvcpo2qxcxww2cxs1vmnutor6mtewxpc8uz5rkajkw9y3s6ozpfkbokitrjhre83cahr1xyzcty11y2xkrcu766cxs4r0outtdjyfjoefesx3hfvnf7ia219904uzxsc7y1z2hbwk9z41tpswm2vrggns7wo8dzhrkbyoi6xdpxbw175mucgyxxsma57c792eriuojagsjope9m3n1t0hh0jviqfor6rmpakuh9t4j5fu0wjdady52u74nqvw6kejw1',
                fileSchema: '9w1fj20g9cd12u5nlyfzj425aew4d8j0b3pa367hlamp4mvazpcwg7c4t2zg4dfdxt3yj01asfq8o40uwlhp46ksprn3lnhl9o1wh4ujoldmef9yjqmuh0b1qku6frw4c3ffbv4dlpdelt2bvv1ztowt9m99b3ga5kivgzr8pfkcliwngspwas0ahxwafibrbd11y91dfhm5vg22e7d4vpu8w1waattwl91lk8mngv0p6dwa82bic153eqc2oo2hlvsr0lf119wi9urvayzefk7dx81n707onogx05ew3e3tc81gv3w3ks0cljnkfjtfi8b5bz0wv1fn231r0j41k4m6towcx9g8i0e5gxo2knklpbm5kok3j4y2ij57awix268stwvjcolwr7uwsqa5896ay5fq49s5cunlbxrrgv4s7cpdfz9emknhn3zoz0gwq7ldy5iceifzdslphxs60gqq0zv0k44vhj9560d60ksqfquwp7zjfo699op3jvh6z49wpuhnaik0zosxlu5cg0836e0cgjodueev22h5xksgwu2wdip95essw230gcyu9ytv210l06ep8jxdry1p15zx3hyo3v55m5ul5mhduf0bxaujiv99r4sju8k8jbtnpivj4pfpyjv1qmulpx097b23l6pkjn1ikfyf4c3x3m1to7m1hkajdwd8uegw59qz01k22z42228vns3e5num1j7muglupzcnb7tcmln1cl5p3zbgts4p98yopgsf8w1ghuri994dmnk7usnbml88zff7znmln2xzt7du7bqk54ctach1v4do7rt94f9cle76wfvhie5h60sn5n5lmqeds2kdtbqy72rrn9xrgo2txoimhqd8wc3iwn0chqqce5hnqh0icj8emxkhc6s0im14qia4mwz5yu2hnav2huuhib1cc02k4btxpxbtmaaqe994aqlwj5xlxq4z8yob41kuwm7a7gfl9quecmgq2ryyj7jztezcff5efxxc2xeiawlf',
                proxyHost: '2nmpsbpvbgc0a1mfpluszvgmm3dtgf1tl4tfwl1jpzy4tswbsm2xeaf6tseh',
                proxyPort: 7959502491,
                destination: 'pzyw7atuzcwhci4cz104hidg226rd1g7amh0jnog9a08jal741ne6y0427rlz1qr85oe63gup6qbl7wiao7h6s9sfjthkvauo70zub450nl92bxfegim46lg2mzx1ng5u7nhv7nw4asidl9u4ytizj1fo3hgr9lq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 't3quovbe9rolvbm42g83gukdighpdyr7a6ztrr8271mdqmh4heg434wwal11rr11ecl1zkf12r2582fhfzu5zk05hzvwna3wk7oxkg9n9ufaahcoia2in01gfdw3qsxbbx6ws269jm4cp6tks63rnlep2sck44rb',
                responsibleUserAccountName: '6stc67cc5yvno4u5boo2',
                lastChangeUserAccount: 'peg5if85k0nw43i5wdst',
                lastChangedAt: '2020-08-31 10:41:32',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10c3798d-8728-4ca6-ab45-f377e51b4a6f'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/e38a3087-33a0-4881-b8b7-53c06a7738f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/10c3798d-8728-4ca6-ab45-f377e51b4a6f')
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
                        id: 'f9bd758d-6143-47ab-a7e9-ccd2d2a2f122',
                        hash: 'utp5puv18fwle9h6eb4dhvq7hn5yiaq0z6owlh1k',
                        tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                        tenantCode: '6xkhu956zb1jwnjs8iggxu4onhbb3uka31sojbzg8er7ytyjzz',
                        systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                        systemName: '8kquxz1cqvxoruwvuh63',
                        party: 'd0rvnlqhv5wbkwe85wyl3n6ymvgqjqtaxp7et7dxkjggz6tt8daacqpjn88ije92s78jzr2fob15g5eln5dzl6xnnusqvfhhp37swrc6zajudm7zmifwp3opidru6c6lmj8e1pl0tk1z5r30e43r37pdowwmqzh8',
                        component: 'd8yp8r19podge11ph9devqy6vq73pmel5v4ts94iv2zi9b4r8oo9c6fd5o1gmxie5b26gqq6nqagz0dy9sw0k8rpcf8ikts4xo8hurt3wp42hfywz4gctl89yxasxay7ojay3ipd4k9po1c0n39ooixu29h6yxk6',
                        name: 'ltkmwla8qmfmikdx7cr8xkow4nul5a32m3vwq95wnodyku6vby7qj514kdl17lx1dpu7n9wf7phhlj27ctu0jxant9us5yymmyer8ry84p2h86op43tnr2fdl8daltt0egh1aspanca9y3veezhejiizd15ruhbr',
                        flowHash: '4bh55rx5y0djy5ud08s1og9tvipxe7ihtxtxu7hs',
                        flowParty: 'brxni8p9t6252jn7fo0vwsizluae8www6z2wejp7ee0ebfaonzmj7w41717p31p48lm3lobbgny4egdaij2x9zpar6qbxsgi7fzgbbp13q93z2gd43t83k5t42kfwxwxlwtkmoigdx2cz41io5lk06vnyyyk5vw5',
                        flowComponent: 'rv82pjdygau8esletfzfqftz90cyf0qnq1wnwx06x9lw66tpqt7rwmsym9x7hjqukx8whrp7o5yfoxgup7cvyq25ry7vy39mkqupa2n2glcqdotq5x9n017t21wabwwqxrovams3mf69k63rqnf54k9u1vyy5wd5',
                        flowInterfaceName: 'mf13yhrn308zxw0ri849zthv6qnr4x1ld89o0fpecw18odpzv8vtttxhm1e9bvnrwj8oidhdg3ksfs9lu98foou8bokne8ist72j3mc1pvrhwc6imdcsl0aax6nw97fsojfhxuczzcqaqwgkhsuu11oqs4zup1sa',
                        flowInterfaceNamespace: 'uixq9d86tj82fqatwhj2i8lhav7rfl7yqmouq0f2xt73ebogurmqdwekoa1jpzz3rcp3abnbaz7pp46rs8vrhsxtbr87m4l64hxcy0ydueo002xip4l75emer5gy87rs6dhi48ibd71rz80etcbp6fbk4zbn652s',
                        version: 'fzmvq7kl6ae6gbwc1b7q',
                        adapterType: '7199phe5xseowuz601nozccf8in0dl4oerfuqegaa6ieanrs0kfddfqjem3h',
                        direction: 'SENDER',
                        transportProtocol: 'a9ms52b8nx49jg6rjqmd640idoi0zfzhvuahr8hgymisjtl3qt3829eiomv6',
                        messageProtocol: 'a8darreu2p9icq47pqnpy6o3v42w3txyk4h59ufo2btwrz34swpsm7rixe0d',
                        adapterEngineName: 'y3inu2f8ayvnqarb48h4tag9jnjkg8thvgkn363hgqdild3ii55fp3cnlyijjzwb2dsxcwu8kpfibbvle7ilzw6r8fnxvv4vytweceg6f40biro4wjjg2ix12s4n04v5hgf9g3w3zcb6lqwsnqq2qf6w2adw9yq7',
                        url: 'st8222gh4o618xw8btvhfsrsj4ccgfbg2a6htz2r64jcamn6arx1e5tgc9uovr0no2gmkq1poeaa19uddsq3tau19crtesj70apq5btcg3xyesuxyb8qrjstokirsduhlioo8mahkii52r6uvvs7z8prjml6pgkf3l1cy89rckgxjjyofrhs3gg50g7rla4qss5rem9wmtug23mqrb8ds58bx1fybvngvz8lno22zgamikhj7czgo3aq3doanidpl3mrmhqbjqbszkb1jo85mkm0elkra2g1kejqx5jg8p8ikpgiqvfdrf3es7cx9zit',
                        username: 'pb9utii59jo2wgonv94q5tznf5yzudwxhy9hrymz5bokscij62ie2nr0142c',
                        remoteHost: 'vcs9i8v3xubj0esvnyh34gca8xtzd29u5q1bjvqk0r8qqno21z0rwnnp4ivkale4aiaeusfa5ljy40dlixw022toyxblwdwl3l1tm35chjiwol0sfcpnexryphhg8gjai3fjfsxholpcauqqv5h5charja6r60e5',
                        remotePort: 9489972656,
                        directory: 'wib6wxr21ugk077f3wrl1ry9eycsj8wa6twvxwj4sg36e1mp98zc3wl9mt2foyfjzf06mu9hbxujd17spkyyybta9nxee9958958mev3nii1eed5w9enw055gslgl89k2sct3mra22i8blti0wfgwpkgxm0dmox7ibnamzfesfjuef7vgserrduam39qe2py7x724r6efkgzvl80tpmtvbt73sxlqp5m3oa5rlszn5gy6d8x747gj7aihm1kixmab1k2j2az4q6oo7myaswxb8gyxdammr97faionl4d2le4x71exdfz0mg0dgo4gjrnax28un5nk56jv7zqedvn1wruebibl36k0ttv1itwk9l6aaxfe0bagy1369ke3rimmzjft3rurhuyb5bjru677dk2exmxb8ihmmxj1u4i5hlrraoqrc8m9t2ntc6u7g60obxliem7pt0p1xh7dmcu67aggtvawxeat7wv69sf0wmuafzyoqavdrzy8f725nl3gg49jc36azox0ys4a45etru6nfqinqypsefcetwkpkg4hcxtny2m1w8vqy802jrfcma6x4vk74qi9bs1qbq4gkcfq51q1da8rp1392da4z4461v6nwa6hmrf4xdf8cvnq2lw61q8e3cmsyk4wl3ajqhkohr1ry42yxovbhl1d9ga174typ8so86c4dfmvprpyh0wr03plm3j0soxf906uz8oohj8nsrpljt4f9f27b0t9qf3myytsmqer8sphhglhg8jibh42ttbyhpn2j8e9io27n0fpu7f1q6cdq9kckwjum1w99z9sgjw5j1aa7lnqhmi1j5m5stt5ys7js4kayvs29f3zsawjodveoexw56vlhhk3les5e96l9n3o73vimk8zraz1li77zo2tw5xjhjizd0zf9dt3co67sbi3z1w07763s5jf589pok5k4tqb4ytwuw5g3f35talc8j50cga80s13cuw5a2fuj1l32w54tmr58oxh3ep3i93et8x',
                        fileSchema: 'i3jy6c3yy0c6tq7g9m5qejbrdv00gaekpurgg0igs9197281w4u5ues5ewsm7484r3nii4y99o4nn4rmju2t8d6693ulcxqkid993w3bvibaqdmjqbdzyun1r9hc04z704isnnci7keaseh9g4w450vqm4ersp9y51tfz2ai2009fcdmtxq4jznuqcmtfrkvm1h9iytsmo47vd3v4a4dzn69ljhrlrohpcbj2w100phru9yi3zzygiyzsc7ikrpe0cw9ezoz3877y9ie65j9p49k1typfbei0otjm5vuk9m4bfbqc4ln9aftbvqlm2qtq66mszai8ceji0a4ap6bnddvo7mysaqp7vww41uke9xlw8k8c9zoux8pde87wrpzfnw3t2kdtza8v2xwxf8pxfw0zeyrrwtt8qihccxlf6pwwsgnazdcgx82wvtss9v6sygl8y2zkpfiek38nxq883x98p5ou3xw2gextb5ciu6urgd1ndtjhi1nsfye1wsbphcek2vtu6hlbxpdel5sekp895ayv4hejfta13b18fxwgmlwelfmee3mxliq0gdgoe54h5edym6gtipxyg29zudco0hhbv19f1a86eqfm2wqnw4nqziv3gz9q8w8q9c98rbf8omsqmlh3erzluy7orayowcy85xbhxioqqs5ubb4slfs5cs2ai0zczklf3dqhnyydvpiaw6vk152j895uaip12acli2d5grspx7489wxd2sar7ho11xokwr5ur986cpfgq6z8g41sp8htp46k6krdhl8qgwnh6dvwk412wjsavwvors8wghwpaqfp93f3m5ebbzr5x5oqftzd5l8eun6opjj6vq795mxmnm9oi9a3ife6stj7acvnaz7uxkgn6fzhyz941fcfui0j5o8ntqx6uv1ua3vgpdf0xk2rvb17kqpoxg09j0wrbpyh74obgcve51s0h7i0etmdqzv5spnyxajai8e81uztuwnun4egholj8w6d835fbi8g0ep',
                        proxyHost: 'b02xrwhjbjqb9yntb3mc6av6z6gqyqcbmh6v373oahnkegmap0lsojkbfaqz',
                        proxyPort: 9740336268,
                        destination: 'omj2g8b8ahienuh755bitxp4n6m6k251o8unbr9pki2pzi15armds56bw90upe6m56vuaugb118d8n79q40nihe3tzrzfrfqkunxfen0tj3okn3fco2dx9fn2hw50ruuxdfsf1ha2o49x8f9e63j3387ew7b06n2',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '1ayd7eyjwv40tbjmm75ezyhtkyro0nkxxqx1kpgdsj2gbhmij211rgb5twdmgf15ed8sdcomylgvzsi9301pmwys0cj0kau29zdmv13cfviaylo5crni0xdcbzufe80tddp28xlhw6xb93yk99claj47vfm2aa8z',
                        responsibleUserAccountName: 'i392lhycdmwsvs8qagnd',
                        lastChangeUserAccount: '1yyco3rdjwlo80yzrml1',
                        lastChangedAt: '2020-08-30 22:11:20',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'f9bd758d-6143-47ab-a7e9-ccd2d2a2f122');
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
                            value   : '6e45e06a-e2b0-4897-993b-2c9d1273f832'
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
                            value   : '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('10c3798d-8728-4ca6-ab45-f377e51b4a6f');
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
                    id: 'c6644838-fc6e-4fc8-9c64-3339ae004fd5'
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
                    id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('10c3798d-8728-4ca6-ab45-f377e51b4a6f');
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
                        
                        id: '2837f36b-89b9-4381-baf4-dbd486f8af01',
                        hash: '307tmuymklto2pzqizpl7je51dcld24qy4ev72h0',
                        tenantId: '13eabed7-8e3b-42c3-a4b0-33eaeab2e6bf',
                        tenantCode: 'shll4t6r49sd1gd5y8c0gin0pbaolq4v9ph10v1vck285s1urh',
                        systemId: 'e53b26f9-2436-4555-b67e-d6a1b9362023',
                        systemName: '8avo6zuw0jhqy935hlsj',
                        party: 'xyewyzcgr8a3jrrhlauh7dcpg5giyjbhwirfpwu0989q8p3k3m3nibaufjtty2f7ibqmxuazjlpaaztptdvq6x0xweuks88crzsaex0authnpm4tl23bnoweal32rd0kopsi2crtx5b6yeags5vtwfzhxx5ih9x6',
                        component: 'ns4m2lu4uju6j8kjosaqhzrtygnylx53w0q2hw461a502wlb6uvj3ziye4ggugig1f3i8q2gbbf46tcimhe1qsy9yluizr48j8bt3cmepo76tbtla5ndi1podctfvwvhe6lujonlgdjl2ev7t4mvmfcb0aw9hsfv',
                        name: 'li20pyhg5aetod21784l2kmhqxvgwbjvr85789qlopqnsshfn045s72g40tbepxdbwcgjnmud2z781uk1twy92eixx7fbmjbodlhuvmttkia0thd8oedt1gy866rgyazk8qsfigh7xlrr8n0txl26x7p3ivysx7r',
                        flowHash: 'wqjr46xvirti0px6whkek4077dx4lne6qxp8siz6',
                        flowParty: 'k657a8o782e2b7xhem3ip2zrjeuxu17c158lr8qsxmodrnutuo49u4a7w479fj3xi3qu2tjrze2itlkov092iehd8vhy49hv8bxvcoq2l1iv5q3e4itv0vf3n5ti6ac9da7g35cm5ctdlf9zyiodwk4rkz200uup',
                        flowComponent: 'ojq2ou2id7mffv3pkqfx9ndm1suddu0oudvwfvqz9yklfoqbqaoup4u1cp9pka29c2jdlkbynbhqb7acd47pfusnqeiatt622fdpitie16kopxld8mvnxl5ykhf3srho9p6k61w4kt876znqvdcnpa5eicb6mg9b',
                        flowInterfaceName: '23cq37l6cbpbo2e8gbs22tx5lqzy4iz57waw8o83khdk1293hxtdal452iw7f7syxajphh6jvnluoem4gmz3ridbk2s82ehxj43uimeo0bv0ptzpaumayi1i7bhvczqb0eu4r37iaxf84w9lgdgqx8dtdhnoq6fo',
                        flowInterfaceNamespace: 'xlyhr2tfli6z6s42ro5n21db6xd3fb8x2v0g886trhg47prkqzhd7iebvb3psgy6ba2b18ss7l3blby29lvz3zr907dzkzjv8od8w61jwx70a71n8xawmt3mnj2g9ritx8cdqhyzjyuf2pbvi4vb1v55wc0llheu',
                        version: 'z1d05l7nivjgaqrjftn3',
                        adapterType: 'evyqmxdjv2se1g4b5h5ke3zvam7t5tywz1s5k1iiadoinlpwkq2pzfwqn31n',
                        direction: 'SENDER',
                        transportProtocol: 'n0srkm5o2mn3kxxs6tlypnp3u250fn8x59olgrje3dynopz2pxxf9n97p6d9',
                        messageProtocol: 'z050wva86k40sy8nw47cqgrwgxm2bdfv9p5z57k1yxvgmciubko0275op0va',
                        adapterEngineName: 'rame131dtdq3m3a625c3ry3ho3xpo3n6z7s0nhmo8hrn6agj0ixm9797jsjkl9du4s0251pxltqauo1reoj9i1rkiuyf5fx3m7p3wpx2dilzvp5zzwo6fsmboegbgdkf6ei83dl2ki38ucizviqshum405zd2zvv',
                        url: '4afejd942gim77u57cdxw8rsvdb673wniw7c9365o8g8hj4i3oe4gn8uze9i40taxu77qio2z2i9shgmf3ot9f4dug7jom7sjqbpcpp23njyft5qjg6facp1dvosbv43ckm17rq70mobwx04lr74bol32ikgcaksxlkvf4w25mpuu0f5tbwv03ltk76sr85gwwaqkajknm6f1qb9qlfhoh5ola7by8zng9efddg03bshqd416cxvz67l69qwh65c43u5mdmjwr2ucyi2clzlvejlbh59dguodudk2cr4zase8nkt4e151jt6snjtok8q',
                        username: 'iatm3cuhsf5ixnltwuyme3u2wt3bpy20zfkpvgzqykgcrev4tc8d6zg3f36h',
                        remoteHost: 'q77y5765qhzsxnyokw964500a0u7hpdjspivsthbsigdfuif3picxp0csvrjim9bzoh517a3svd9vmu6ia0yk5g90ldqjv2zjzin5ghtrh6ho8y2x947r3y4trkmdmyl665olei5tvz7dlhrde9s4v2yqv9pcqn3',
                        remotePort: 8464781035,
                        directory: 'v3epozijymh72orewg8w2xm2s6trn82y9vi7dc1wda4380vte0yvpyfmj0qb33w2he3zstmzw5dbpmm1u2kgdvg59q05m0btnetwptkoby2ap8u5n8uszs10gh48402h6ehxt3f5hz1rq2y0jv25hmsmfto9legpi0f7eobcpbsifvr2fseh5gmns9ihir6qd9jbvvvfho72ycrsshv9bi8ttha3c42t1fcy0mtxeqmfffvvfgnm0xdu96vknlfhfv66qpo3ukoifpq9wfkhlpky62jhtq397i12h9cy8yjdoij3e9vdvy72zr4j2sgs5d4izzpi3iddi42ke5jfftkoesj201252s7zk127u7k3qdalbhy8pylqpaj9cfhk0z1h1trax259yxkxej1a7zaj0nakhes1hu8y6jqknxn8y2o33c7ckfhq9eeisy0d1b0gq0rlce4h1ho6rgycq914b5d8bidw7vzc5ehf5evv8oyvpp8g89fpssymucx4lzpmm3r25a7cy36tn2m7g3ztihhyp987t9lmr7p4mhyt1ucigaujxn8k8m3t7nfi91as44u1iyoi3y7aletqfs01jiuuqo0u32kbhg6r4l59d1qgz557ektvi02nf6ylltj3rhxrjqqz7l3nzs0ulvcutngxdxgbn58lu4vjqtm0eev8v37p4glij9al6pu7nfjppcdafak66u9f2pfhgn1aijnq8gpadikspe1os5pjgvipunpsv5dhk3efzqs8psjpqqmfxuew2e6vv96reb9oerccztnsd0phay1rp2oh4l0xpgw5nlrowf96v91dzvp59yizwlbltsm3zwsma9m45l1pbgur2wydb1o9s0nko4qbpi6mi271pmpscx0d49bwt6dkp8wq802x1nirx26220chi6xs8ad08q9nn95tlm517rgl88458mevxgzlragn0cr7o5kax7lwy6ibjd561fnq6r6vezzdxvre7uhsbgwxq1a1ygn2mzr5n522',
                        fileSchema: '0a1nso7gvgru9s2wv3v6yfqoyol9a4jhttn8o4copg0x48c92q6xnmglx8oyc685d0r41a9drh8zwfhfz75ny156qwjml3x6p6pvgxzlv8okn6xcy7jqu1vncwaat1op5flcthqxh75foqog7ft25a94sli9cdc75cy5v1jiggr9d2kckeunalalhfsxzdjd21ferdhveyjqy4gmtt74upwuo7736pptm7j58ma8owvzu11gk2w7ifs3pro3pk2epzn11g5t6qjhxw2inziigs9omkyfqnbp31z0hfufawqung19catyz1zq99t7i9av513fqsbfjz4ubptsqpf5i1bxol3cwcai1yld8xwligbgwfpwpqq97labwa27kq0olvgmoq5lx6n7m4yt12x0uq5rrx80vdc8ir6u2afuud4opogwohkn3k4lq49zrk8ng1b49efud8si8s0o2p6hv9condau5cgkpe3xa4875p73lbxowkpydvx0l6tckc19ojtlhlxlv3h7ivcbb4lcf5gl9zkd05vax542jv3ifxn9sv5x05im9t4yoj6n1me64dpo7smjdi3wbetpodhnq9us9mj2min2gtsy4lxn1kgw8dfr3lj8ou4pz970bvazfxvb4nz38o4fiqr9gce4vou2jxu9iba8ah20n1n0qtxgpa785vy7gji8g6otsq512ww2754xj0guafnxv7aqn25y87lpft00djiqwoyr3t28qn4vx7yu61jqbas7lyb61fevae4ywlwl1giz5p7q8zmhr6iusucnaz8fziqhaz8ablw2tb38dtd4g15bwdi2z3eezugtck78brxecyc7p0l8425h9hxu99uruonag1ljm47xhh4ebfq1saifjdzvi3quipj85m4jxciqpz5hv9mgck9r9b53ja7zfccum3zn542585nyllmswvi2mki0paknzuyqnfvfxdwyde1bpzspe9qy1cwapd4o8atgmcgscesmv5onpcyv1l6vyddj',
                        proxyHost: 'f8wkoqw8ucahdctdvnemgyckc96bim529y2w39bcejhdh98n0i2ll56mf8mb',
                        proxyPort: 9200133906,
                        destination: 'r328x5h7vsx6u485y1xdzm77s7t79lpcogvp7gybwgwh9kakrsjwrv7jsjo0mghypqoyovg2iymghlwx37z1s2sv2i5uzulyuztnj2vj15vbamvp9fk3in2wp2ptpt50nggjpef4x3kucxcnu3cezc48lcvxrwp3',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'dugowc09dfm58aiacucyf7tv10dxffx05yswz0wralob1mtysxul08ttxc3gqkjwa0fwgj43ic7ur4vxq9e1o32atv14qaub7pqnxrxzrv4wgk2z8rteu8ymtmo4i3nsyvi2rkg6nqwa6fxdbm716vhg30s9sba7',
                        responsibleUserAccountName: 'tu27is8xf755ymil6zcx',
                        lastChangeUserAccount: 'ol2ryn7ou4nin14o14ha',
                        lastChangedAt: '2020-08-30 22:17:53',
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
                        
                        id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f',
                        hash: '804y8d4nxpzg13lf5ghbk4o3rzy888xql5prgu11',
                        tenantId: 'e58b4c35-f0e2-4405-90b7-3008253393a6',
                        tenantCode: 'wax2vizu3wb4uh19tami9eremi2ffkp09z8jz0rcg4timsbag5',
                        systemId: '9c486816-3fb4-49e3-bb47-81b587d97576',
                        systemName: 'dss70tfsqdha6elcpmnl',
                        party: 'm03y9fu48w78790ixmss8h2r1865izw5a16hab7nhm858rn8zjok9ze41avi1pyzmgpmkpnrco5d282jyh62s3r0dh3x9qzclx79zmz8j2s0zh4i1bw36a20t14yus7le6vbc6t4cblezu37b5gds5ga1wlrcz8c',
                        component: 'z43ys7x4wbodocipd0a2nc4rjsduqov1uzpq8nuud340xkf1fr39gy852xwc2b6vpjtue015rsj5j37j8w45wmuq04clujxq3z7v7lzyxw2l2cm91183u8p54elx1nfhvzjw9q8xmv6uxh621w1ckszppudwn9du',
                        name: 'gai6nua2x2w2pyne0k2xmkgiv86odrl2k008hqscdsztgitu1vtoaujsztcamqcr5qrjhb3gjgfkgggf72jz4ate6qxxze7s4siolwh3pfwm4ufal9fe4hhgf6sov8n9ujthicpeah8x93eg8k6r0bdfsx9ghsv3',
                        flowHash: 'pxtm63ir7kahxrzss65qedbxj37yq4t2eyvco3j9',
                        flowParty: 'k1hdgz79k4ti6lsaue83vacc9v1nzglk8ngecyhk71cec5enazk8qn251hwu7k7rbe55f9cqc13qm9bvn3ro66im3ldhsskvrixwcn55qcjy2tjftqwoakql4drvjoyp6vqo9q6udmytnf2zwx6sanmfbrcvezbk',
                        flowComponent: 'r3cg62syv0janb4g3qq6kzg19l51yzgsfdpo5r21ha906cqixtv40zog7llpgwyw8utk3ijko7g9xqhwrxbk60whovupsh8qx2f2fmaoit0vlbaxi6p190sonx2h9pvb2jow0kwhbqdio4d7vokhchoiu93zi5k9',
                        flowInterfaceName: '1cu0qeh66sa2iyi7wyy2etq7pg53qyr6ycdzwghiwsz9mig6mdlsfx012kpbfsr9bemld4ejkv7n14uff02bkzedxw95olsr5v9ddbcslcm9k3rxfvpl1tpf2c4fdyjdif6i5qqsa5xnyqtx6ew5ov3w12crzzj1',
                        flowInterfaceNamespace: 'gfgupkvckzw42uxq1s2n6k70a2aq7qa8k26k32afif2e7kov6h06ld7l3nc53ok19a5y0b0w8gqawz1wryc5z8z9azj9e9dbkjmcqocu2zbxrltasv1bizhkd417ams3w1vjh96xaj0xwgxucyta6xndb7mp4dr5',
                        version: 'otpwx4h8wvygy6y41knu',
                        adapterType: 'kpzvhv5esos53porwgj598f4ue46mim4jwpaairdk40rgmo7sa48897jw90y',
                        direction: 'SENDER',
                        transportProtocol: 'utooxk71i55vey892at2wzkpe55p5gktgn7mplpjkkih7tbuuger3c8g80cw',
                        messageProtocol: 'lynh3286l2ijh4iyu4ahbd8mnc8e6iw08ly2tgdmyk1zxzxkq4a3b66elc6v',
                        adapterEngineName: '3zw0866wf4un0c3zjaa7k8l592ntsgmj1o516mqbeugoan2wgrdd6kpl45e3txpown2x0obgns53xeig4awgt97fut55zl0umgfjj2h0pnb6f4fky2sjjbdrfblgyn614mlg1f22wqnf5nnnps8sf4ytnsxtu7bj',
                        url: 'lragd1kcd9zivj2hs97ct92gofjy52yapy0wndpjpc0xeycvsxwo0816msp80cvs62gglb6ccqu3lcg3q41b1b1ytdu28c5o9vrmcph5nnig3mipmis35hzafg33h348vz8nkru9t58hic0i0ya1utzmzcdj3x5hhc8lwydb45h4v0n0md73nyunkhufh3at0awhfr1dcsrxi87632uotvye5xs97lgtuzde05o16asdzy4mpoj4x1gsq09d8uxiygj0xhntip6y9hn05p85v7t0d8rfficzrzg1als7e5nw22suge0izpr2sgnu8hcz',
                        username: '0lj4aw82ziug9yl8sj3q1zw3vrjuz39kq69bd7vpgb24nrp3t28w7fzojcgj',
                        remoteHost: 'vvm2zr8awwpi0udg56ef8hl9abmg4oj6nk3gr3odka8ow7uny0rabujj5glm2pb8gqlk7v25xchetmkx342dnarzgt4atqovtmw4az40j1o6hggqt2kgg12ay5umh9rqav9awwhxauh9pz1z86rwkn89d6ihfwo9',
                        remotePort: 8968962747,
                        directory: 'cr1v7oatm5fp6sp8pnetg6i7yqvjxiu4emopfh5ymhtq98uv8c0i5lmaiomc5bkbel7dyxedukkz7s3osqaxv884nuk7hyt3fsx215vfgkey304m1fvnfgnhglos8cu1qudxsdq30xleqzp4l85cl385lqzpl9oeyd0tnvinhfss5n8lrxoevyxemaclkmxuhjwq6nhcn0q672704dqiv0uzormizxdrw0c3l1zqu5blu8nwhv4wmpc8a02y0h5kiq3qxhzx89aridzzq4bvjnacf0d5vnk2ulpxe1mt0ayfe79b8by03wseqrezxiw7br76ipp0d0t5llmcycfhsg64wq9oro0075f2opi9yif9on8k4yqa2f4qwejx59em751fap5tlhsg90gd0zyyjjsl8cc47ep8v322bwfeqihxy1d1r2g8uylvd5kzotrp70spx473ehm6ehxecavft6zmvu3sgocpx9nzsudefcllkzshn3936q4qc293owka4nk8finpwfr39qib1bxqjtpedi10j802bo83dmpqkvr2k6vhg7gi49azs0petfm7j9b8hld00s2ifsbq2ejnx1em6jiqxtqfk01tvwgpzexl7md6973rjbbnvhfhw4ieg2c3q3ephzleqflfb77j7tlgtkrad5085w9qnul5q4bkhd0phd6dbi78e5ez4nh2ppq0ynbwhao26xr62r5f8lweauj0kk74auipvjcswtltnrtknvw377mu2reseeajsiwwzstk252osorvixuna2qto6uoyc0uuc5ceby18zh2c0ixdgqy0uqfat2tw8efh361qyty5ldfcssuycuqj7tfrz7epezdk07x1u36o8ztcj05itnte9x4z8vmklh8e7md5mo5yuwvx0o9z0stouup83jfkfatzb6apwhwkm9ef1579qzsu6smj8masl0nm482aswrgnrduzw00ggf7swhxwfp1kfg74rifcwhiccpiiy3ch91bsdzvqb2tdtf',
                        fileSchema: 'okpfndir3mrha6wn37o37talo1t9ixwdimpi9g9ebiwl2uh03buydmxijbbj6286u7dbcj175em18960i6ko6o6lih4vloiu1wqvms71ml2ikkscuqdihdt6c84btk9uiwflgfuwuxitvpdb107y7824dkflmymptj7i1i5ssgcgkxr0ugr5s4k4a0w971nqahvbmxth62bep1snni1b910r2y3lg4h9yrbd4epj1vb7t0dmjq24d6x771u6ikblz92u6qpx16wq81vwlbsyq2kg64yn73vrwkt6hvknwa6lifxtn2xaf7v6uyoarqq9dnby4ckn1oapqz73ne1bvn9ts9l6u84n09yke522lhqx5uv2fjm604xrgt4788dx265k0exn8jarrtvti6eitzw0151j9mfet99853kwomcrpyg7w4qmhui9n0hl5leeyw6k5d4otl377xiwsdu5r4je21jznql2mdmmvu758riw22vc86fzh1h4m3odp1mz7nvfxue3jhm5jcw990cowgkfy5cy98ml8c3k5q8dmtholuaqymevpubiwjpdxfttao0ntvw31nlpn3r4ukyk8vyt9ej8tfsrfwqr5hy1hbc0h89yk536k44mp2hzeyuzgav9aiuq4egc2j9bht8to7eqomjvbf0pkdimhjrunq6agbrgtk75fv7db5wj0ldkr9kodc59wow2qs15jswckuaozav2czjluf2u7wpa2a3jkdbev1zhk27k8u26vpluhuzlk1l7n8bjf2qqun4x0fcpfexqce5xnme0125pckis999jkgkw43me8zig87xa14m2py7pzzysybcxhl5ftmarioutyyj9svxhmtxkv53brgj8e4f6twjg1z3rzgccskvsy6l58qyqw90cy8tc1ay69izbuc5ursd1jip6ndq5b7nzvx11qnlg6curaec2tnk8qos4gdg2msg2mp6xd1w8rruui22f6fbqz1g9kndvaro1z29elze7eipsp7gm',
                        proxyHost: 'vgsh13lgamiqkmhurbbnhxlxxm8li0d1j2afitujk40lwvpjlwqkai80jk37',
                        proxyPort: 5469391855,
                        destination: '2zacwe6td6pzlqctgvl8fcq10l0gjpskps3pajwaqfzwigyenmx5vszq3yxaacupx0dktsgz05vfbxo67zbc4g7daf3p83ko87ochywz6vnaz2jqz0iwi7h9veocif2bc3ps2k8h7zkrvfrlfznh64w7psy364p9',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '0n1155v3ycq2xb3u6p8p57wuebizht88s85cz7t3zoag1rewcxwve7m3bqwegbafbmwju3nh17tevdkh3ac80ay546mqsqhq26p7knidkjzz4jae3oso8uqn52f7anmz3xywv26brmyclcqxzis07gmr9wk3qtau',
                        responsibleUserAccountName: 'elpdirlhsv8973h83il3',
                        lastChangeUserAccount: '0coxcdarrjf4hzbo54ao',
                        lastChangedAt: '2020-08-30 14:27:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('10c3798d-8728-4ca6-ab45-f377e51b4a6f');
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
                    id: 'da896d29-4142-4087-9e1d-eeb5518792dd'
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
                    id: '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('10c3798d-8728-4ca6-ab45-f377e51b4a6f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});