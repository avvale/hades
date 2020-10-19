import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () => 
{
    let app: INestApplication;
    let repository: MockClientRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'vzu45rfsza2zmcm29efn0darvnsqcrn3h9kitov3kkayxk5abbknt4x1a01njyrpr1lqg0tdcq7sfg21y9iiyndmcjjsh0qf3tixgmt0s6rzortmkcz81zy0m4g0mucn2jfc94wpk81d6de3p6h8vjk91qi741n6vdvwtnmtur3309liwi0wf8uwoidhbgy6s3pb1988zvzmcf56da4wydy60elqgayv4kelo5pm0vwxostz8l54i358hryjrfb',
                secret: 'vj7wyi3278o3asaret9k1ediipcsasjld2p3qxs7j60r8w4hys5t28hlp0pjhjfesvf58r3xrwp7p1eew0j8bb9ef1',
                authUrl: 'skurjcgnk87f3a95omqbzkacopp4jaxra8nmnv9wbydlai4t953elyd7wfk7119co1k1lq2l8rdzqhj4lau3dhzz9lz781b9k1aolwelw4cnzhd5g1bmmv08gj8nlhhekw4f87xebvzj4fnqrka33fxbj63k7gystdi2s6j3k02kmluxh9zhp9wqytwkvp7pr1ex7jk42zuf42ysakx4ut2raf9oe8n7w0zml3vwiwhldxpylbhd5ns9af9sdy7zqpzm7ha4nn6vjmkftlwh7rilzsdk0iae9aez3tx77j88emunninz893nok90odae6zo26kal5wsxvcaxcdpe39pfib4glw4giqif1ynzktv65svp12gwym4hkbhtw9hmpyp4vra0bqsib7n1cx3a5htdsdb34zcefgz4ozc7dha960xpfl6u783nelgrww5u945kgw837t3qk0zy6f76ohccp5wxnfn96e1qom76bz0d2m7sksrgiirlhsn95w6ao7td7ntoekrmwp8ium8jwwrkojd0d0ao3n9811ru69ap0p7z9s23sak6hv0k0imfq86yb8sulssope8d0yodwwihpedomsacj9th2vjl3iqvca3wgaa5fe8lv7kw5oj2nbqz7wblyux1gk835gbetm32x1ou1v6rvh2z4k4srm6lzua22jw42lv2hc6kiubiepzw04lhrqffccea6v8jc1h5pk1o0p609onq7xxiawagtl5el5es0wuf4secp976wo3qscbxzvahgy2ebxbu596tozy8c7gfg66icdzh2cxvt6xa10w024dyehl83s2qaodz984lwkqj6zr7ewi4zvj1cw5yl42dgw0f46aadsoqj8r8wqf1h6neaqg29afa99qhyyx9au7g9vjc68doji3sia2jxfbta03xcw6zl5wiv35zrd2wqa8cxtb79u3zym5yt6jyc727mv5tleixsncyq8owet8zq4llwy9mkmztclz61ftekcyi7vsbp1av9anfoo9cjryyi9gaszw9ytjspyo4pymi4mvzlmy6rliftokiw4hu3wfneup1yx9wfrtt0vct5f7vysprgwk8ngrnojlcc72ckcavfl3xy04gffu9vo3mzrluawpibdr2g4uctvyn8sq0sy42cllginvhk4k4deieormiuck5p25y72oysv872xgr2nil1e50u7ekrk6dclb6bxp67546hzb70flgt8skiz85xodstf2csxgcbghi2s8ahiliaquvmnm2rw7g4q2q106jrqahzgqjoh68n304rrdt5izsmq9gzxt13nb69u73x39bjnndpfr81nfmsn204gfk1a5pzih0db13mu8ashctwypzchfmtg3oba6jvzdjyhe20swsipgm44rgcd005bgbjfry98n8su41p1f7hz6gtqw1yfn30dfoyy89sr5rrqgnck0ug6vo0pum1k7g1cliggq491ytd1fh193cf3i8v8py95uj2i3eta92bwxipuuc1857o05e1vfeztyd90o9r5z8nw0qny0r47t6a7gx1hfdowkukgg2ewydclisg1x1f3idb8sttulnmlvwe1gqxb7klglp7741n41yb3w205tof4rgjvuriw9pp8dmw87776ot7eegrycrl9qa1wflccehoiqa5dfjb2gg3qa1qj0rsv0ei8mfumkb8sbmkxk4ys5ywq0amz9yj0bduqe29cn29lmuo6h1va79sxt991bk1qzu2464zf2b3jnzfm96cbloa5a95bca3i45d0fod0oyxmirvkv1wkttofh4aow86fnvmq88rov13mzwkxrhevhrt3fcyzgynxt6ypsly6ggvwzybucp7xh5o5ekqyb6fk7lqykl1om8o48o95o5tg0ssrwomrkd3mqg9tztczg4tpev4brfgw6immh3s6lvwfnofwpjlhd3z20trzvht9xppk5cuj6gedv1gfb90gprrrvmbjwrvnojc31nm56qf8a0qmnpfpsdczeho5ymndro',
                redirect: '78ysc2t3tuy5i0biwv6rtaxnq6v9sgq210g4ngzaen6vdbl46yuxus2pxju3ksgnfoa94fv0awby7h6h5qlin3l5mrrr5yjl0kaj0dctidp0fa10fkpez30pzxcw83jfm80o0aqc8knx9gt55vw1lg30pbs8xa7rotau7u7v5szzszp3evqfq7t3uwsgnd2pq3dwwxwvp158penbsb63rs852xnumj7328ofdk178uy06b7gibglhyl0xzxgmtd1k6yok5casok0pndwpwp90odtme3ps6ekza8pmusdqmt9lt1q6zklmcdzqfgeqyt0hou0pjsqeemoex366a61tj2gw2etla4fcgvvphfzoxnxzbxhswjn2ps6way55umacfl88afj1du9mim25725wonnf4xxs4bo1d1hqdm0ixxk3qx5e8xj593wppsssiv2etc4sdtusd4d354qpq2hh2inx7ivaivtxr7u9cfsejvdp9zak658aluz3aaexkttch7xcvvzklqwk8p5wwb4shfxq4d7upl8pl85tej0wdvim6fvai805nygttt2bqaifzvyuvp1cc5r2v8lgai9dr8ssh7wastwnc5xo33ym2oe7s0x4icq8tx708hk4oftj7vzhbg7pe05fvraslvwiqpzcst2bke4ui3qhc9foi3mjorc1jjyei895xnsjb8ssrifp6sair14q4gxolt1qt2ofkzsmtxbp4byb1lll7g67lhrrwv9eyc3c5936q1bqu5qoj4rhzerucv8o5ry6f4q99w1fqv2mdkjkm3v9n80uh0i50u57peb5dxhr8xr196wyqrao097n9nibhdvssztdc5hi2b9j2b3hqoyczgu05odgou1h83ym8sarpqngoxlg476867z6qyly506gahjemok8wsgevxowpim2g7j3hcljkuq8uivunps9y7exdsc3wqi5foggsa1vtj9xwuq046klhmi2v9wwg2w7t3rkfrlqq9mk45j9uep4b2xdk9fngakvmu7am69wn5rmhhug8tl5u0iu9t0jkfpp6djefuez2zattkct6geixpfdkp2yubl2pem1bsehrlumv3noit4qgudqa1jz2k3ip7vq06ovfxxnobq6msms8ubhnz03uz9xmcs6gp2g2wzj6kt5u4070iq0h47rnfnlu3vvi37g49d5goz6s6heugfwc38azju9wsz49wk2zfsofi6yqj1d58xlpklva0j32q7s3rcidggnbonwjrxuacr97bhhay8qg6qjk3ftgdnyq1u95z1i3lubdyt0mnhwivqozhj52ei91q0uq6rszpa35lcvtr2qlvi0vcgyhzua7hovw80iom8e2sf4a1qbtfy0psoprvv8gqbrqmzim1lz7k8txrc0c026hoicbattaok9bx83tvw6mfhfyxsspnbg4sopzhmng4mrudjxe1xwrmvii3in39mtkliux4336v725xk00swwsr6ft4kyl1c4obwv0n5okg0ezg01ixihc9b004gox5hl1j998gc2fa00g87bs5nhn1q0xnlrkuhx2n3bdnq2rvcbuspplqu4oo809q1mxsn775ioumcfbtiowlfk1tvq3nn26hipkj25ns9nd8tzhqk830or7jffnaef1440lnlh8jd0x2ln0fldhu11402cw2g8pggul9ym65sln465aqb7cye2mrmevlyf4tvizxxd9i7oaqznjlujqqe03el3hdrdbqdppchsgm46rjkyzkigu5l45n6o0le55gnit76w9zopa39dd7m953xo96fo8ythbq2is4tzmmljcws1l6aubjtkbeizfo33prl4gmqpt78udlaxfow1ts13gxbrent31k44k5v8qub4wcyw65smejumifvsp37f27paz6amdg2u41ev8xi21mru7aw5mr1p8jkumwhabfizdbrcmx1r18hzy6bkdbtgm9xgwwss87nb5dpgceh7d2otmeogthzu7a6h3gsjkeq4ku54jvsv5vfjok3',
                expiredAccessToken: 6758007480,
                expiredRefreshToken: 1592326021,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'AUTHORIZATION_CODE',
                name: 'w21askz404feirwl29bh8cvh3a795frbxoayofcww4fk6532ib0eky9ofts8nsli0e60zk4v35143ywkwyxqjx0jmaibhskbdmdrh22wmia0e5nskj9fmb9v1fwev8vuklkubfnt0n6awwr27tzz7e8n843lsprxt5kceqgjf2tgav3el6rbvpvvmiqsw9aqegaag70yhsnffnnjmli52y7r1j9ej7k4qlvtm4f3srcqfed5vg6vcfh0qui23g3',
                secret: 'cbi0aokqv41lespsep6g9p7necvit5vwj77unroiwl6uktxu2xaxn35ahtguik4emds2jurjslicbotz7tnoxg8bvn',
                authUrl: '0dbqqx7t5e0l3v9bg4wdwejsfb3mm3bb2qil3f0wm7yb6ya61vctibu75kegtovnh5qk2ktm4f5yyvrpk05lnm818xzofs586m7knqywmcix593qzs2h8hfursqzek8enmy8esyhyreff4qtygrphbeppoa0skrc5i75qoge3w8lac4qam9wlvm4xspc552l7jq8sgo4i6fg3qglaj63ex8utkm3urblqo0kekq0gxgyctqujv4qb9pmiqomsibbp4g9r46igu77q9120uue879fifu3soc2z9o6afop89lzplnnu58aoig7wmb5pqpkm9r7i9tmcvasmdxerycqj92juxcfcxzvogx4pnf8794wy5psty927n5ywou8qjs2wucftrfexshu28d083c6u7cczikju5nqgw3r4tm6b8vq8i5t1hvtveu7b9zjk619uh437n14zv3uxgdutqhrncd6ma18e0hdure0kxzyhhw8gdltiddqvmayfc5bnrx1mjd1cm77etdctgmf7kdgb4qzfuvu4za1bhivs27jo739ljabpsjtir3p2dokp6e3u5v19euwadarcp1b7az452zzhrorbcvbwrfcbtny7dp6685220zl07t6v06d3gyw14q28rg4k95xvr3h6kushsaccgypjg59lr7w6twoor63r9vwaaebwtmemsbfmtekbly43mm8juplr2ai3ruyuvl44ram8l7fi87vo1t84wwxm1m5o2569wcoc01cowsxfxpvcyyk1prhrn9snwblzmahsmvn6yk77ofas96s61qsjtamwq25rd3cq9aqcm637u79ippasnpma0rija9moc34a8qs5huew5atmcr79h57n4uv2tc2ywja02wic31nj67kf3zb9wbzvg6lfio3wyuq0yosri1908l0om6f8dp2jbx6c2quhe0feajl43v6gkvnyml19lvuzfkz88wxqs7jbu1tb1ygec6zj3dzt2l3b4mjm9qdifdw3gjeuguynhgl8goxth2fk30bux7kj8v0axess5xjkfbavufhvl3tlerzro2eotud5x9g51qnjo5rhxgd3pobn86b8jfrdjtulnjl6hwux87pu9jbe36fhi1n2j1m13abtfe8eu9ra946tosa367i5wr04zgyq3m5i1nbzk1zaf6bly80hgwcljrwr5pdqkjxvl2575x9nul3yuhebfucetxl6nmqeap0zlwgukqrf9ojecsumi5o1z6fstl3xoqnnc5npywd218a04nripbxzbrtc4lmjcykngvpveoc3i0hbi7lg3qr9y0xpn2hgsqv5zpk4g74bmpkpwdg4uv28hjrq5pj0kho2b25achj9bk3ucufjb5kf5lfvobxn93duul2uh2k0b4jx2jsq5zamr2ci10ye8j0p2cosol781e88ur1r2hqqrfppu90jxtcpf9ppjnwlbj9k78leuw4dvg3dimq1hxlmsoc47guo6wtg5u2qlqbso6ctiw3c524y2ad3vfgsfhyj4ngrca0ui4vnmwqmtwsmz3vxb6syyml2yv9awfka3qdg7woc7nukbcs76oru9dnh2fsce10xil7dqxfg7q0wovrjd9myaziss2eoaoir1xbv2ia3srbkygf85opcudq7nvkwluswzixio1apqlzebm07bgyxlgucjr71d60h3aztk5ttaogdjaucl9f3jma20plpubja0fok7uzhm56ta1s7tggceztg930ylm4rzbybzyel6rci7b4x5jo2wzqsciwgbt5lqm3uy9wgo1vmsj0ilrel8xsja79gckreujynyyc8heyqmvc2y27lkycqdtwte1wn0o9jqrfmdmgtlum32y21e4wc0myet0h3qu7f1hi6lvh7pb9cy29fuqdoxnuixajuz4k43ss23gmo2jpa8prmu5ximkpwbmwezjd4huaraiqo7r3ixip7jktgjji6iqlsmok6tpyqvqrnrtktvw5yuben848dcffdp8p5zxu8m57531q4dt7',
                redirect: 'd9p75kf3lx7s9c9zb2nnz5l0yryh8v6nu8gr3u3te0ampi3n9op2smulqgckakielhd9o4pek38abuk1eukz6qj4k21jkise2o28otge61qbon886u4fyfru2kcsi7a0sdzzikxiqqwumvkwiw2o8ygf6qfrcx2f23tmwgp5alt27eokoik48hqjy8uupqu1dktir9kac5wtdd63djv51cknu8ge5wlk8v9arbc0cdf8eipb83xg2m7105h5s65nceobqv3uuszif2xidk4th7dm0pbe1r7mqyzl6qruxz1vg7i80g6lvrxoxi1beh4mczt54m4uilfroiaebvkt3uw6622z1oc8ftwbma97u9panv2wg6evaqkuezpto5eyzjxdoo34t2bjlfujo1alx9i64gnj3esmuly1y34cioin1wcdldf20ojfafr0cl3890ir0d3ej05caekdnxvate8wa0ffvzj5gdwdibevae2pgbq35q92y474a2jncvxwn9xgqgwb0na4iofbyskhgrqa7hblpdqql16t64gwgzmjahzg5pqfjm8p5qwgzj6mmlc4kl3x0lhcrenhteglmk9mb9ju77e5rjp9kuy8cr5oesnjgxoxbrkw1uk8qj4wzh2dl6wn16hr3l42putwjphiskndlcxwywn3qzr6vz86zvz3gszwy2sxd8ombcsm4vaxhikwha510eyhpwctgpskk8fbggb9jpplrouci4erydvdqdx0mhnijgy8qn7yvvu9r4qfutfm0d5vbe0gtkjuret95pgmfu0kgpq5n195qugarwraxa3sr7ykdlb1r1skdslfyaoifmw8yyofq8f1xr36a0r3sfmpkqf708ggxa27v7jd6479itocz1o90ud5n1ip6zxxkke7dyr1tg7u8bpngzd7cki0go5t6bbqy9dd12xf4twtow0udwpp9i8rotoi5hwhkwykpude00b993n6t2v40x9n5l9itpb2ze4hv0kz845x2608z0bca1uoi21taulr42w857gs533a77yl6ldf3qabrrjj7xehuss1w4grxa7l3fdg5a4msfh2f8yzyjjo84py1o9mbgdouwhpwyu8cxebo7jhtbnqzqmpdque4g0esm3wqbqikis5taqjl75kz9llzv4ulv916z9umhu9vml668vt8lrrtv8w26c6wlvczdq5bzigykqtmdip4dpk25mo2tmcuxrs0hcmqktmpm2wslfhonuymi8uxido838nmiixb64gspgiwp53rwl7m0evbpd3uohyyuzxrv1h5rojgfd9cmh2owm6jtv9vmxlv9uf9ag2s7z6j3qfr8iui5ga2cr0iz1llwmhobdmi70or0r0wykadelxcq3rfqjwws8cu2wgskwovyk5fjyhuwgckkzw1gptc47ebj4dppyqo7ayuxefnzu3q0oikibpldk85q3b60vzl8psq66g49kwjh4a3mmxjbpk25svyszu25b5hs6z7h2d7gha786tqel9mcuor2okyi385slei2zagnhcy7rkx3gasqki9w4s8ap80nax6r5jooluny3xumfnxxi4m5khwni8ptryr0g8gb144kk3ereafr0o6rk01qtykmthc35cq623mdif66lwb8a29zn9705hu88bnqhc4v5f544il4gci39pxbr0iglklpogyb84zne675ilnl7agv8zo3gnh0gyxvpskh03ux5cnrhatyrhy4ft6ql3han9rf361dfs15y48pm6shvaf0ozr8637cjy9bvmiei8e3a7fit9ngga9rmyjd0vks8l1cdn1sxd59w5tqtpjz3ju0gxod1wpz38dmvkhr1kasuskzu8q1y5u3ib86h8pk9kas7t31r2bnwi0tjea1p54wqd510umci0mfnopw6farfjqdg5h0hzr8ngs0q1zfutrkg6ro80c3jprq815bop8k5ae39j1zt8qyq4vlobnqzq5o68o93facajyh6qznq69vtijbzyz3n7dxu26hgjmnql',
                expiredAccessToken: 8838801757,
                expiredRefreshToken: 9307696157,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: null,
                name: 'uevgynzbna2xbeke7v3f191flmor66uhcss736on4oewff832fx68fn7ufigyijjn21zky4yakz61hkh85fg9k7uzmeiorw4mah4pq25tpdyb4gz9jmykj5z6sb59tk4yhvy2nh8uif3h7yf5tkz0zjbep6ye5r7oqxo05wzdjux2vkv5ri6ro6kf9st97wxlt0aymo2a10vk905opyqyuxhk5dojxmkzcyjijoqzy0lx6gc7siaj2rp02dzr84',
                secret: 'xydo8kjit7ek92qjn10ler3hnjsdx6rtkndr9awxi1fdoe9srut0o4g9x0sb5cil7vp0wvrq6f0qwiu1oago6lofyd',
                authUrl: '077lmcfcu6o8er3i5zfwzdqxh31xuevuk5drbg53vzaslxiv1l8eqeeynbsr2r2o4elk2k5gv3e728dk68slye7d7n9970uv01wl65ejrt581bjt1hwh0o9gdv1hkcqppa5lfkt2eqg8fto3ssvw33qq2co9ibskdbjpnhs40v1he5xtzd2rgfqew4ylztaw0qqb4gyw64j7nclhlu0bzii8jitezzn7kitpnlmn36y8qfzsw3tes4oi7pjpcrw1kn731quaz54hqaudms7tvtmnvwkya7vgjg6f70rl0edciys3kekz6440yyfq1rjzd60c6a7mxwhuzc1feiee5sldh2l5kl3y89w3dnolxcvha3na2e7vkyoz71c9wnonn7n00lweewpkrnja5263ml4t1xeupy1s4z0dndf3u13hm9uwxn5v1j8j152eavu15sv3rdmhdvapkx16d300z08t4dofyuo5cp1zga6taux74lutif18ay19qtusyytpjnw14u3ez4380g3chbzv7uznknxphi2mi4f51knmg2s7fzgf8qpvryeevh3k9faq831l9xxodv44cvb9h04qmdquo2anfkr8ydhyc2ilss2f8bb45hq7s6v9g0o79z8jgu1rk681mns83176nr83p1endhgp9wzd4llcrhyjnm8f1k6e18xgf1166epmfs23ot7c0r6h7u1kkw57u8h1yttxks87cb6qjpgxh413w43fmabv7k4sjo3rv5rb83bni7ioftnybvvf4yrg4uecu04x4mubm09mimttzqrcj38why6n0k2r77geeu801q11j0zzuvyashiwp6yntgfnplm6htyh0hzo078ykh37n6ccwwbpmg25eqb2fh1lo75pqzrsgnv14pq9sv90oxdxl4mjeq68nzp7nxxewaode238spvh9wevsh9usiqj26ayvcrzofe2as4hq33qu2jfh5tzsbbmmb7vx3fad4ozbaez29pic3gws1oawf7e7i9oa011j4ite1apu5lcji9hzrjc0uhpw6syekpfn999sr8scyzseilov95h1auc6kmmtc884enrxvyw7ixkb7xkdrqiqcm7tnmzvm28uwzg2z7lz7o2eoaxstrbioglc03vdwxhuxyo6j1sw4h96tntly4zwrq7hpvvdlgxfcmxwvc2ttu6g1jdybwucfuvyftmglrx3od9syrx93u8cl9vqzi922ew4ohribcrigkq85jhd10uvwfq6iggrssquez36ykjgv129bscggm0h27au1mqukws45wrpv86ii5msvthzelddb3b989u9xz5mxkjqo2ee7fxhrugayup682csrnjnwvyaz0s8v8y1j9p0kueny671qq96q4nqsvw2hlvueydoroj4bzcm0924me9w0ey3fmrlf3vkqel8ka0m7n4ouwl46ew2kjhjna8aeumg3jgo5p1btp7t6jlunkzz7oaqo43br4kwp3thvmua0mfu99hi8n6sbxeoe3vsz77e6nvu9tlnmnvqzip4wqzbabpzn4wd680pqdw80kxli1gfqwb2php18532i3o92lkv5h556x9rh76xe14dhe4lbz92j0zzaql5i3n589ysvardbi0rfsxwdu5va9tflre5ay7jza8edx6l5i74enlar06yu3dxbq5q8whxhk7ahebz0141mxxx9bqk6xbpqfqkivvnvw97dxs5vz142kn13o6pvdilmaaqh3tglbqfemokc4fckp7ci910s3oau2toagm3lxydyd9orepusxd64k6abjd9p6xdmydngn5xmtxh5dabolwlo81xubzsjj5kkh4ir89g7s90elyxbawkq3bquzlzqcjhbt5yvrqpiqahdkr9ukxf7s0yo3db2sgbu7nsj3l09pvguk7m4tjowuc3y5dwyhpq3ag8ybagd5s7oxbmolsr91l7s8590vvb98rqcj1xj9dbgh93luslde89u9e57shcz66rz2w6uoh7kmkds5gs741lv1zt9qv',
                redirect: 'txta6mxrbcf4g5ub4ztb7pddc78y35g3ewoyvwe9o7frqxro3ve3t09aveqd0i069krejjjempsw89apfp7midl0q3n8zw0js20kdmu02nif23yn17oiydibli0mmsuiaylf7e7f5p290u24wwtq747mp52lau3rqlwxa8qs3hvh651ai2ljoz6bkvlosiu082lh3qesx7ijvnx4vmnib4whvrlpp90err8a1rv4m9bxfmvnyriaetka190ohij0tn4kd3zvrn9yovj4kkj9tk2hxqvenixvg095lj1k6vbtub2k96la5bnxig5039lai9e9ejpo2rp4kjmt6ruow77h8obl2byje9w539518w43iq8ta10spbynbdpk12szehxmh3wviec8elmocy7owfs7tdez3hwg6o7zc2zvpnfylamk3pz8dn949q7qvvagkgdq67x7qxkeypaytqwsskl93nsocirdkv2pfxdqt2svtcarb4d5ng6rafnlc9z1v7951grreonmcq35ng189pbr9hukjejy3n0j2cz2vqmfx7iaos7z52y3ojxavon16bhqtmel39z1seva5z9036ufm48iv5fjirqnz3q2hnc5mbvfxl59fdj5cr9lmqr2i50m5myvuc1ru2egkg47o21wgr9j3lmrmd0q8r50b3n7uffc1ho3wpm7dfjqs0smfy1hvrsk9k8d7594b7qmadn7nmeiikq7g6vmn6y3oeoiki9eodgfkk43aft6ykyk3ufjrgbkfnt3qwnkdyq0rhi0kajux6ypqyd8uuuru7x0b9oajjnasc1w0gb9y463p8yrz0r4my5xda0ouweos4ve4x3c1p20aw471bcwm4ejenxwlerqgb219oyumqgwhkuheqfg6b8dbfrwcgvyuudqdmbcvc3ce3ojzbxpv4yfk88q6evv8ju5jh3nr6rhw3getwcxelma61m87mtboc96bic9hvesx3xhfl07qroy8hc7w459upxxz9qonld3uund8loq2qq1y8smro9dyc29fbi4ksyv5xhqjawj8y0an86per13ykt9koz0yh8if6o0l1begk3nib8fkojixb0rj4fkyq3ab2oznptcb2s7plrceiz7qsi1yf6uefntw2esnqe9z1sgsvu3red6agwlscbhbv2vqcwym0cjeycn39kzadubr4qn0b0arxv48itipn4omz6i51l7bqx6zk3ur2jds45vcj0qy26d0w9wtviod6hk01fftin8movdbqmwljrasxgkgyx2r457hpvio0fkq5z9zzppqckxox8wkyqvty3l5anqpif93c7a5kuzb7zum4lzka6k8kp4ncp24bkyr6azwqjtow1gjjk6gkw2r68juf5v9um47s5q947ee2x5djcrz1rmzqkvdq65xtjzmy9j5rbofk7q1nbvlbae7cib2npabmouqqe5p6pol5yeveugnfumm14gu81ulc9xhxobx0sl7yhbphz4vy7hidwhxr2x0uk5v8u7gguwdx8ldbo8bh2x98gnhycvzbslbjz0y4080gi6ea8z5qzdft21t9hgu2e12vb1yrdzhbhfwd3wc4flxbdto1wwbjg3cowk5jrbrlgr2x339k25nulflapasdikst8wrotifke5x6i88spv96wx8nz6r2ot3dlurylit6f0631stvw9ejqr8fmmn3osli2obm116uabfz1egenu3caxeta4a6wt6lib6nn7zpdd4j0edli66bpetijudsy0jghyi15oce3270eeeo9f16gjuxcm995fow7p19bpdt1qpsw4blclp8thtjszb7197ir3h7cxrnzmdlrn9skvi7qs85jesuiey5ge7wofrng60fwo627jh85t62hli1yuxh02o5zyzzzla8i2xnzzlpmdacr6064p023bq1tb3c70etx2fgmdy7kswgm0gukayfojjjbozln6pk11aanwo99moiookv4ijwvx5pf3ewijz9h0vnyri2vv3uzgnoujxzwc',
                expiredAccessToken: 1110732524,
                expiredRefreshToken: 2408681990,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                
                name: '5hnxpuoduohbodjezd9ymxnsfoob99nvzux1cxvlldcmy7gcgjb82h7c3ynflrer3xhj37x0ro2vantmgzzfxb33d4hjvgiegyj3wvm1awvvfd0cmxq95byx70cah7xyluxntnw1sbuvvd9coqgub9xwjhfzjet4vnwrsobuwymrngz7ph6qognv84ptbd8zz1xaidz2um82599f0v6r3v42xf4ujiwtdk7o9lsjlf1pjhiybhys1tvmnw1yk93',
                secret: '9xb84f0ddb25x0vna3hte1spncvezrzepul72ifo3ksng7um3wqqp5snlku7jolohdmbfxvtywg145jh49gtstwgfm',
                authUrl: 'hoad0n9lzugkucp7pxto5o72qz2zek3h2aq3x1d1c6p6x3chr4acdishjb474p9c0gxdaqb23pj4utn14fnv8im6jfz9plfoe967oafm5rpkb63otyhjccwwabnlsi2k43ffk1mc22nny71x503briteeoh5w3zepl0ax3wd76ydpp64pm3lz1issvgx19tw55gfc5ub7j37uzm88byqx9npe1btesjigb3qic35dno0axpnxu1edg1yg5vlr8qs6cfo9v4j37nyzu38u1ab4e58r9mqha3y45at2u5cb8ppzkj22fzbt91jjnl0o5t98hbbi1nw5b06i85u5bvm3lvys901h0aper2475c9v7z9afkc9ucvgjqvhwpa1s0o7h0jppn4vctpsbot8m7fccgvrul1kq9phqqhqibjlgts0u7ux2iiug4029vbtibl4al5vsk9l166zqbj9hm9pd6ra1n54p2sid4uafd3l1zs7zrwfdw9ut0tbg7a5tijt14atsdz7byhi0tg1yh707ucbn6fbkt1ugsnkfj76ayfvdw3xctxnw95dos6zk311pscteiywo9tgxos4zjp6b8zppc21uxa9c11o3ws58dsrgduw61xtgoroyt14g13kaus1v7npagvj81dc2ghgouu7cs9qspa0akt41x9vlta34ma36wadpyhii7azge1wgj70l42q7q3a21321rofv6sbx3x1i1djp3e4d5r3p407wjli21vccx5cp3l6u9mpz9ya66thzkespkgzgfasauam3p2nyjd1i2mhwobavy00nmdosgvyfvh9uo3o3lo7lfa6b9eqgdeqn4uzwboz16ounqqt8ell5h3ww6rrj3lagweerxh42agb4ujzt44i8fvwd7fz5qgplb8txyo3jk8gdnt3vvfxlqdw49sd1i0efdxznpiafhl77mrqcy8s24lvkg2co3krhwszty8xfrl5u0e5lg0rwrx8t2s5ofs83udoiqfrg9v6ng3aitylgb3o9yev00hoxj3nci5scd1gz0bahoo5ew2ozqmgs4gam9qijr0wt813ofldcju4poz9oazp8sk1em4u5xdmdaq4hwnflo4gizj63g02290gjpj6cezynyju1qff5yfigeqxdaxpobtsnoyrm06zjtoind59ohnt305d8fw2wphdppy4n43htkfu7kgyax62ncfayzdn40p11pxt7czsaw4n4t9x6y1xl1955x03ro2l3bk5jk6dfyvx0snn0adqnqiw1o215ra3w2rvwexmq4bcnfvw45tb7jnygi4okgeeval2ee1h8d4sxqjnenm61jfg0bwxlr2oz221sftbwivp3h9tjt9wckicnxt9gb9i5gp8ou9y83dw24ph0mvfn74rmeyejp3h6oi8czukukojwatmt3lkriu9epw5gnvnig2aaqiib6vgnnx8iyprtk2aax3nqgl34zv7k3vgt4olfltai3e1eu5z2n09xcscsfxouzu0f8m6lraowejex2w5bdn90hk4ekzp8b3yobwq6yh4xhaxgb383f7i7r7396j8kmnd0cmayshv56bydz8ncxxnazj0qjt8u54upbosc1up9a298e1m5rrtozqz1fkhf4knyt3yd8sxmk6upxmmltj4q1t9xjxjnlnhxmfeanegtn2zpx5eu506at5n0u8fflgbnb3t9gl644sfad10hgsot4943cau3fb17g2tu0w57pwjcnch7zedx7cylnvd6905u9erzzt1150fuacod4ftgghaogqsx0stuaj6oefpz3d00tvntgdpmx6cqhv7g4x0r4yvv8kfok33r1im2lqwc1yqx2dv7r2h95o5ik0qrgpk3kq019pcp745tvfkwl0zf987tpm3jjwqn16qifl7tpjw06g82kdcxpyu8g301ufscl07ztxvm059g29dimdn8v24bwitb4zsh7ddozfv1ad0lvmyyq1bd1vwhvhi444svlduntdb9rapq5un8xnnhv5l9qt66mn',
                redirect: 'ssnkrd72ljag8x2olbubm99oazesciklvvyamqu6x5o3zigqtvi0ir4e2q4e8xazb2rea028ps0tj1t93yvhvfrwma2xm5jtsk4gipui9wdkcibzsax94p542pkzjn72h3dvzwojpyctq1k0d553d4fhfywac43b9ber08cf11gms7lav9d5aom84wt0y88oxc8pzmvamj1lq5ujy3qdl1gkmt2l50cj6wgpdkwubdpbycmmui70aropqgj0w0ar6n42usacu83h3e95ruanzjx1xhkae6se1i368mfns9a76t4iga7ta75dw04nbvamj0cnoy4eq3aafpjwm58buijwq1ncp9zlois97mcfqjgpgdrwxtm8f7m3dv3ej6cbs8xfchngxjyfp70anb5ukxsux8zyzwp27c416djb2s9lbswwyja6pr2nl3ljlx9dz5xk7xhxcydcih1gdhu34dlsbulm9ux4fzuh76b4fj2na8ugn7ppefryq1ckv75cqwud5y7baog1e75y8bans6ht2gi6lnq6vfgybp25fj7c82nrnm17qiqgy8djdup3kmsrk5vnuappeu84nozfondwsdfdr9tti9xj4ul95dojkao05a04mfe1ap0z05yk2fg9w2ezds624znr2cs4ykbge8veftk10rbye58dgw7u4d8qdax5bre68uhxh9uquai3r99xp3lretb33ij9y49ufz0dqdkat8qok0c3l344k2xmi7uv5nuo2bt854xne5ivdjjri36eqg59vt3xxnvfoibm408aj7my9uyuam0xtqus4bc8delqgrfvzkdn6al9zmgs9g7hjjjhvnik67uhbgwbr0bj9hgpxz9726kw1la61rmuqkwaoxgey0ok4x4bnkssnpxc9uvvite31zx9k8fxgf7q7rx252ecipxac4df4vukfj7v7p4pf9htap0hh4c6q3gice4ymupid32vrzl8k3aogdcvtm4d4t7xicskv5skkazgzf4jk1lb4mk6ohbrtwdwtx9xtcw1lkydoimi9q7lgh9iwnsp44z4nv0uco3kvy3m5h8x2e6stzc7b800n3mdy7fhlrbya5iikun0i3r1rkngsa4jfnfxs1zswld00sbsja45zh7y7epovtuur11unw159tqdqwatn8wbpgeprmnwtqviuuvkiwyv1kjuciy244ptr1sulygp42o2noxt73il3qnk1uhkovc847zo6ygd96uw7v1a0tgxwi3eu7tz7trzlr1fjhqkpdvskgsb4dcsj8xt58484a4k657tgw7ghrw21dvzky159gto552eagr3vgw3zifm94lsq1qjxbdt2c4v4sci3nqiuyj50o4lit73iflev0a185vczgjg9yee631cxxsxwqbokuy5vo8c81knwk4kzvknv28ys2kvlycw5pew46cq7qnw2mffa4625vj14u01c2h161lh2cnmh8tkqof16336aunhbvtzmjjvqlbuvje7yjdbz3927nvdhhupx9vn7fnyx9lcn59tz1wg5u6oya26x2f98zt4vtug13awz6l503uroiv05h4mfv75mo39i9s7vjmx4xlebn1wqdeyqe4ir33axg03immt27sam2zerdy8i9u9fuc21u0ihijbsuzpw9a6xmpr6r1zqcye0e2vf69v1rycicjit04bh6eax1n8tfx6p57fofsfa03jkse8tudf239lyrmcdbp029hyw8evxchfzov55kklrb9wdo3www90620a28urpvc4dai73mj5km5ax1p1o74qm706q2ofkx99r6tx8lod2d6ks3k3lymnmnqjg36ly20eipfk7s54tjtg8t8uwrj4ngkxd9ttsfl0v5nx914svr86l5x9b1vogjyab6gb9pcws0em4o6n275viyi8j3ryroe5z1mbyd54b7airlnyd2mhjiti41cylzpftzuo6ax3kg2hycfqh9ero9d1xin11rzrjhfp05onw5ra1xqojn0fs9m7lxv2g48ma0ec',
                expiredAccessToken: 7170359094,
                expiredRefreshToken: 9924111163,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: '7brv1x5ms1oiv77mex03nsgcnyy1b2lkp1275ueubp5hluacgnrmju9iily6ptt2xlt9fuil0tj7g65to3mbgdy4pg',
                authUrl: 'iu26pasoyfxf3o2tio0hl47elj3q5bgqt0c63qvs5bg85dghll7o7ykh3rpam6d67zgcc00wcskwyyorhvorfbeh9z5ea0oez2yjlca6qy35k7736em3fxob9bh7fua1d9j29nyybkidqmlgqr18yv8454xuew2jyxwth4pa71jy60r0f635odeam5fiujvinxjk0zg3n3od6bd36mr898kcnxg1lpe3vymdlq2md4ih7hzpzg6qhgdh0ziab33kyk3qtev9j96j34s4qh8funzf0ffgaejqouf4ds15wmg1jgyszvvtccuixop5d1godjb16xhiyyblnelonx4qbp61cc0xnbetilz4iue4v9sqcbmouhrje4f7e1z59edavsz11xev8uvho29t3jqxxlvvxg4mmeby2kd5blv42svvefseghluv644vtt2f9wgfmoih2okda84q9qnpz0aekbr81ysoq79oyvr9thhkezjwwemhtacg2av7rlomuunamy4gwdqshk73vouifwghvk1uy1l2bs4cnlyra4b2qi9tc0qvmfqgcw0nuq29q7oihj3isiwy0hfltbwtlpt8dk3xxljwy90stq11vjhhmpfqvcsv2g3zw64fc4b114o4odcwqpodyh7po3riuazi4g4euvhxhb45lc1aeeiec9kylbsx95d0i2euv5bg8ukspgb6mmnjvr097dz3brq1iymy6uansiqm75s7nfcq7ks7qtd9svuie7jqqrbb9cebamkhbtgabx3vvdd5xx8pkpx3ix3j5rnk3frhem4l1emvrsqyc0bgwtcdjhlm425lbbic4fn8un5uz9sw8rbp8l2ekz9aqi1fvafdysqkgef2secem8n1dxpex4upjivqecn5k5vk552x3tqfuocmswa6zfoxo9nhdunptoga8uno9exo7ycf8w44bqqvb69x302608s7eac75xso48oz0oce5lml9fyfzlllnto4rbnswxum3ow9v2nhl7kle2bb3p2f589bpi8br4qjr9xgb7gcg80jmlvfn056oqsxzv5oc702tm70m00cf3z0mlbl2ol4kal802319xs27cjxub96efiv5qc10t924eodi6zdvavgg06z8einhv0xmnfd1s1bxuixsgqr3ew4qse6dg9obpotb18hsk0wpss9i9epkownb6no0ntqlcjsjuzhgtoag81xlpw6bpkegaqp0ajl59oj76tijrnyfyvayticc11wtnabvqqin8pnrjmstzj02nrsvhauvv8o0zbg3il6d2s764milkvpsaydhagb3mgjclj47m9gj26qqipomtrvb1gznl7f10luyvs9pm0w0z0hrmplaq5fe303qg4n6yiahjgs241orczyjk2038ntv08d3vzl9h2jg7r3scrkhlpwzpzpn9ydgpttsaiph3mfcfio4h20jowkgx2y8ekmtwhi3qv6pnvcmlq2h4959zyfohzqh6uae80gcsprw4nae9m89m8amkjv1sowap9c2tug9z2p96gf5g33969dshbndei41klnvdb1qnufaguwmgxbe82cmxoxxmwkyu0u3lkltd0kit9vkk2sfywfcqtmk9c5jcxstwlhd1snx57olwwg6dy0tmu73zrjbw045lw863gw05ipcjcn800ylkx7lcqqdtoz76luol2u8x2l43lrfqt6yxo64dqbpk3aujcmfbwx0f92fq1j5b5awjs2iidolketbeo26ppsfymn6z3x8u6pm9y0rvnytnn10mo62ybmvw36etxrmb342qgg2g0hl9pgmnyb7hmcl64329gitcj2ksu96z5ra2vwgtdiex7fowram1qf5vohv0g26441lw2cxz6j0qmcysif3thxc8snc07qaoy69vwu24lcgecnsqcmhda4jhd2wsbsmjp2naybg5iodzaxvs1kk76xfwh3ncjih39pwal6dr1dhoul48j330kclkzv12ykry00ssvrohvz8ny1j4o4psco4a8fkzsq8vr',
                redirect: '7kcfafxhmq22l6jyw2iz0q8ywz2v3dsrgboq1v5ab1nscgjx4hjrk89vwzxlu3bu0qsgmkbpe6zr5ywe967bkqc10r9r7r5xgr9mi6hfiox88p7jhdjwyjagpoldt91pz7h6mxvf5lz7xtv3bqbb4wwrle95qeqggfkcnwnc05tf5sa23llqkz15nnxsedtf5ju197hqfx3mr6kw63fdpl9ege860w34tjx62hhau1byupkpa1e20luyt7v8xc5jwm22i3se7ossbo5xodu92oujj2714ye6js0o2as9qlw9t2m5fcodtn0gdvbl8p49paiam3kg14lbm0tdm2nehz34vb2zxtejb6ruh23600grbtwyqos8620u3yc59hlqv3gcnipq2svin20rrl7vuomkwinf8fx1bl8pm9hi5zqp292rnqgx49zeszv382npscema6g517ozcfc4jfxhfn21qyhbcv99mml0kodxbavyawahpn9kt2zy8yx902vqm2j88jzoh12e6ud9irlmshwi6y26kkamjt8pgruw2xnse7frnbx768hkd493wnilobj572ebyronq2wg4e9u2yoed2p4fe736c7g8n1v527o11kje2onoobrwk1ea51hzpdbd26cpe0943dlgpgzfekair3k59bdyqsj1fzg7aiw6iatsu8311sx41br93igdbv3jfc1ssrjenqsrfcpbo1zhotkmjiqsgl4fciathez4uxnss0145a9efqy4jbzmvmtwbh67lcy8hwpbk9ukgsg255yq1kcesd9ijdc65qxjiqar85kmj9opo6zvt5awizh5tfk72fv6fg7p3t442na1sngd35obbqqmrkctwet1c6kn55gtt2rhrujp6e9s51y11c8hbyf70z9bslgo3yuzw2ii13lqnb2ff6zcl2l45u98zh3a9jhfr1jtr6k0mmipkiae2q87rcb32k0u0g03709ggx1vcbmresnklujr5pd9urz5s3ym9gx5dt8qkrnvlqywugkhzn8vznk12f2gijpg855jqp2gf1pn7kko4pjiabctdha3l18tvfpbyzs9bzfx0d5yqjc61x62tyyl7xqrnozz9axu6aarntu4o4cb13c6md6yryx3jl884moj9an4yk5ttk2kl9rk4mrf4myovzlmbtcz4kk4hpdli3jzmy1lcy859p0tpyfvsk8y41y2udm99h2v7amqkfumgpi0g02vns0r1diom3f6iy4m7ue2fd2d64dln1e3ygqj06o3lh41hnr9xymszpl9c85jl95w4zpd8h1trbchrlltgfu8jdgbgsbg7deq8q785ttbxvy622ty7a2b7uhs51a53hlc72bas4shiuga8xmi5pak0qvbxagdwyz2ldfi90zm4tscycu4x5abn3pryt4ks2v0bin9khxl0cyiexuievjj484omrw8t7sbrxp2m9ju1zmy3xej779hhfumo5rb3iqwevs178hsp0ytbbsp3ejj592e6qpoemmbh9o5g0rz2jr6hbv59dtip31yim8yr0kwzfdd061fx72vg9ty5fcq7grc1djmhqd4whgkdd6mei4tyt3a1h0o38xlbt6zhb8uzguzjxettqn114kv6dtqct8yy4f1shumy8xo7fpejpbl0j6f4srju8zqi55nfr5ju808netnkd8w1n8nle8jo6mkm3hhfoex6dug939iccj114wtvis8s60ix9n1suv2vzhxiv4hevgk9yo01u2wuxqviy3zhbupxe7rhdhvibswmae1rdk7pw7gbagcuqfvb3tevlluuwzml91imthzl65th8wr3zzyp6hr56lwhkexkeamfug3piwmt4frzl95rmbn14qq00p2fltnkh46vdjrqj6c8fw1dbioakl7wzh1fw66bt0wwss8ey7wnp51u7asefo7rz6nw0hezwexj49wo2mldir01tiew9avl5v1chjbegoz1advxoh1r67u31zdsx5132flm2uwd35hklg6jbfy635',
                expiredAccessToken: 1430773068,
                expiredRefreshToken: 2926216835,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '85vejc3ox1of9zu2nikqehl24am81k9uc89i4d7cal1nr3cewr9qsywui2nxauqro5ta15c8c8l0lhl64rahfydvgg',
                authUrl: 'x7y8ztil6a3qtgwg0y9ge46epsxdyt4pbmuxcu4horitwdbwavwigjyjkpgtwbtjr4ygyzploqnxk9ijipp1v7p1gsw9phwe98zc57tkfxcss2t8ude1kmrewlb2kgpf6hq7pt1tvm37bvwmsduzo6svjj2hsmvuic0iq9i44gnpbcptmm0zqeu8xknxhszsdz6ekohgi9454oae3r44d32d4ntlvexw5c5vtspctns70rmpeq3xd8vdqyud0ceiad3d0l8s4ljqb1n20cu3top4izi1o92lxtbjlys83vcvssx0o2im1w1kw7lo01w2e2n33bju63l1xfhvke3t12ux24qy73cu0q94do6vhw3ycbw1hznovpdth1818fmw1rw6q8fup2lfebluhpugpy3q9xu1hr5w9uqyodw802cyeua2n1rg6oslqtxtu1n2ilrzhygbqa2ab842h0y2x9ip472eroawszodjfo3rrxio13hg163xd11r4jcnhbs1vqjxy7d0qhiuxas213pdleptkbwdbdirmev2tv9z4df1hunxsv9jqklhq9taepws649n707t1ol96pw3w8fxflwaj1xdtb4w0xegyyvsexdyix4f846h73sd0ulqvpapvwsdsmmlxb7lpy02p6l7d7rsurgarkamfs4kzql4wr1dpzu6a5lzq1n7889skugpfv6rhh3li4yqsdzibbnczmfbpg4enodspoj1pb130nvc6dbrencdbroie6lwas82hdluluxwz7dr2t1rmz7s22cb23a71i4ox1ji3ke79l1lrpvy2nvaosny49gxq8d3rfek7y0salvvq5lrol0c70l5bwtfq6253vzn8z81x3kgltaat0sdplqty7fnny9s53edn4i0oxz4p6dk8wbpz65g626l29ypnnlldyqjnqt93urn25f2y10oaev02em887sm59yqehjvwyxmdy5jg91bflyb1387ezrqdku3on5cq3fh3k3su5bjuvlxfin07qv8y8fy6lwhinutzdw9voahk5cyhnsl4v8olb5vp8ji0jbc8u2o01ts960tgao4prtf3tbh7zij39yek24fth6r7gd40prkcjs881glcyj1v1j60p559x1i22v53qlyy5ayf4sd66x8yuha3esfr0duvfm483rpmyhpvzept1io4q9p0p2ouomr82jrej703v9p183rhp7yz2onpfrcu92h7l9698wwzi9ak3628r95eze77dz4njmplr6znjuzqgmy4z82nycmq2hony7li39aelfyvgx181jl4rdnc3c5ddy5asv1d3tk1eju5s17461u742r440qui76pe13cniptj448n4hhzv3f4oihkc694zyeqolsm329ibukx3gz45un4rg0xpv9x8yi2evqduuu0nw0s8bnnvgmixt0t9yq3da4pc0v8bm401zofiiqecb9h465a63rsr3opmlxco2kbxiw16j26lqr2snwbvocoehsrh61vqm7gg4lerfzk3cr3bingb61ccopcfe6zu518ex4gpkesk9n1emibdniui2vdmwdqlhqkicivkutt9bknv31a5shcixahs9a7cnpfynv15ejc7lajft0dwqd0o77rgwgx9040ab3anzbrywvh1fi9inoti0s05em6gg0j5el0csn73yj83vw71omuph2ulhbn9inez4gu9dbktnegbljjs2ox7ph7v85xmtbwngik29yyhueno7zwo5bid3eopv9mva0y17jplgj7hyzt4l4bcqz9kk3w136li8rl9kii5ot6tt6hod6cna6m6802pkzq7aqksbrafwuxkjq0kkl8wv61d3ouw0j7eojv1luizjr18lufngtljbvxo2cdprqfgicri0zp6cqd6kzeh7supr0bqoxy8krlka30vuv15mi0yq395lgj6bhjty7nh23r6a61lws39xtssccbpry39j5xa7zo6bv4rfrk4v7m9ifzc5p9389m6mwscsj19ppvtj960lkof',
                redirect: 'hm3k8qlnq6xcnyn4m2erdqjozk6gjojj61urzw3anu6u4333v0hnjm5pctmjraiq5mkbrmlvsquly6d927r5vzyfmurynguuogpqdezhm930pchx8ikutxu5saskoiiadmqeg5aj5bjq9vjih8255i7xuhlg9r663exibgj7ntqe6pnrfh6bjb7fuqtqp1z2igsrqehbv857ypqvpoumzfhp851vc7hvvaatua7zbqfq7j31ax81igiwl8k0zmkwyt2s26pi54v3xgxsimxic93glt73sugkormyyyr7mw4inad99unrb30kuj44qyfg23718y4zshcl4lqr9nevlv0zszq0u05ee1abneuqernupy7jctgh36vt8bl6kzubggfnvlwc1a5u42o8ut4thfeqg0ihy747z93qqv6v1eal8gjomw3lgzf32q0jp30z7z1ifg13ruwovxq4kkqw7dil4yqsyk43ijt99opcww3tm4l3o3pwiogxhw6jrutwx7mtqa5mndzq7vim688mg0n1tlmlyfonw5neiwohmhn3wtgjp8vcgkui24le40jop8id0y8n19ugtj4p8c5eyata0ntvnjdfwr1rckod0389eb96cwtvs8q7auh3sxkjji7q5s15tuzjfhtu1muy5h9kw9176u29yuzc0up9cyfxbtmbrhc5ccxa09kjkfrspljzncf7pbju5431ctd2zutsdacnn3z4liirsjbti6kesr84tvbsyy4ftftvff7jqhq3l6gs2b7xfuuavdzrpx1xnme899js8hxc96prdepvujskmwyayvf9tjry8jamsf5psuvawuqxzqyqz4c707fkl4wf48p90p1e3l5g15s6y6ce7oph5wvqpron7eoidir28d47f4jpzvgnqexf23u37hra14fwzbktmnyxpvtvj0grgvk6rqb5gzf66byaq0rcjusceidqalb9yltkr1beomu5eh27icluy5gpgq9t5xnqfedaz91m11mmrugkzhleop6yn1c0s7tzjga6lwo8cv21gspggh5niyu0a9mvch7tiyel2q49dffazlq0hngvd3z6vbp0lrgkqw57dt5z9xiptzy61gfcur8yjawu6jz5idld5rgwtvz88i5gclgphl2m5ocrl3lbc1fif5ha279gcc4ja7ay9o290yxie62k5xeau69pil19dn1a8zgiqwkd1p5o3qqwp358a2objf8051eqndc3z8grtrq46rxr2kgrrbtg41nzgepj0ftq0emqmdw5vdmmoj6ff60bz1alqb5jo3imhbt8iitcdvaa27df4wdubwzz2977fnbswa7aeoxa0emobg7kocb8k0z3ezve1w5481khvfwz9e56yaub3dnfs8n2m9fsgi3og4gakcjlnms9se3k28hth5zqixuflfqa5okh51ga0vydxzt35hafpn21yikc4y4kia7jtrd5syb4v1zjbkbbiuinxtm2tnhje9s7z9ey0sfjp6u2rujit12ugyu5jq3nfj8y8be9sw1ttzhtyavjm85s61hm390dd27ly2eo8170sj218vyitv141doamlkzcso1a4u412v059g140hywxbdmtgd5pjz6hx7ye6htqpdzh5r8czwq2u29zdx3eoajhw6xqipeuvu4a47gfzarxf83ck7w906gzzufjtetkqnzxbfhxgfcxrjss751xsaw8etosb6lby3tvoy5ulpxfudcm4l51ndfz0gv9uyc3ns9jzmhe0yq7t7o7vywdfwun1miaqbl6di52gjqnj1ut6m41qk62frb2ge55ix4hlupecvcdgh7ugowvs0lfhtbsplgugipfoctrbzoibq4g94eno464q4fdy8sb6ieo1c96vjufpls8xn3x9lbx9f3mqasavisdkta52h9ene3xmjlzbgmnqcxqi0ej6qwn8969n6itncdmetpxws818bewjt8au5xu23g449p9hwkzq225531mvrzd53vr7vqyq6fwlfc97gviv9trv0',
                expiredAccessToken: 3234613423,
                expiredRefreshToken: 4362316633,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: '1va3qcsrn3z4ewxcsr5muriumczamvodryv466ucoyeapqym70vx1g1tdj6jp9g2k6ksfpdnjrnibd0unfwejsvlq87vd18ts632c6n0s5p9wylks5l71dr6u01ibymxbfsji5nrzuw3nrg6ha3xobo4ycg8998i1ajir6eox0ke62stwb4r812rqk3xpvm5szo61ci0rm2ff7cxdfg8akw3cmku6oc65i54bf4ak9hahx2hsa980r16zf85oem',
                secret: null,
                authUrl: '2nu1pg5n7ewaetpp25h85t5d4p1rjoocuz19c976syr37evfnmvg5slvun0kfv8t6m9v16onacedq2meie6bngfreckfo58gbz557ywhuexofp7jbx540n94xc38dkc0ow3il9gtdk2vlszp9si6py0k2k06yemkl7sbhr5fxj4utu7g3mxmxoaksyt2d6t1x6djb9zqa076aeptl0s2it6nv3ouryveea0i0gtwoxuzmx5z90uooawwny1yx25jmkug77osjtoojzgrli7uab7xtbfh2xvxx46819q30bpglbb18xglj80lq6efr5lev0dkylhzuqlwa6oeyujx0by7a0mvf5yluzlx75dnpzhym7cyve979k06svoayoi0y1898k52ni3vrk4f3hf3mprj7eczva936p5iriw87de1nt4qk87wjrms2imrj9xaqe9t3ncamlv6mv0unu1ayjn4n25wqcy87e9pdrxrxxk5rpb4iiyf0ghp61c0snecs6ncjmu74oznx7dg7fkn5xuqthe2svjzd8b8vcfmkcy2s9clgvyxdazl3z82jt2jdgipi1zdyxqwnq4uqpfa9dqloszjz6132qjsjfnq74xh5kvni0bvr5yla8ogee44452z0qoq7swwrbw5u4i4jp9a6lbbkq7bnnh80yqx57x76pws6eky4m9t2mhejhtuo95rkdof51afmcoe8nfqkzm8xs83eypz8pr8pftag9o5klavwnxr9bne173l7e4fy9u9gf3fisz2ncdroy2z3qof0u7z6fq8e887v48dj35xcdjrmp7vywuxo57d3lwws9okpl8g542vpxg61u9mf7cxqvair01i2ebvm1n5tvirq92w7lqwyeeoueyvastihp10u8vqi8hg11t0jqu4720vgvckfnw3x4jnvqd4git9d4kb3xn412i4pk4w88c8ft43oojf5573guo5xpo3nz5awgyauonf46y6zt3r1eba7y99b02dldyk16m1lg1k4mqzn266iuncr8dzzd9zqkfnkdci4kyveaylgcu2n83f6ufr0047usar5plc6poz269bi20x8zi5khx1f316lbz2s5tcyue7mi8tupmz7x791ox0vxff7oxjip3hb2l7z6pq8ehnq8v07a8ejrfccyucggii2wcheci9lf27vgxx19zx02lhd8hgtmdjytvk5d2xmb4t6ovl8pli5nxn4pd0wra88iyprdhn4yzx309cf7ahfw1pym9vgi7otxs15osqdbp8y7faykp8ettefqrcp7ow63sev3mke9fud7zcbftvfol1eje8w8ujwygppjiol7c0df0z74vri64did60qganxr36d899kuqjuc1wltqhhoi4dax6lazzd0j76aga9ift8up3gi16zftbnvthyf7ya1qiihahjp3c4bflyjxrtzxghj3jaovjdwgc7y6t5hcpna280ymcintejqra5c4rywvncsw5edv7224p412zmdhy9fky0tsvw01fl22uqirmbsmyq098duhw07kzu0op88xododrsyq6o0nachhxjc0xwbtm964r235dagfzo6hatmddwr73s5gk99etcz26f2amf64y5i95u59mz2158hy21bt2m3viwn8grfnqy6671xh1hfsle0b4bopytnrgbrjdib2ddih4b1ngemn53f4xgivu8lqnw5j84jq4e64i5zawu8n18hky7exowq6o4wmj8kwm7nn5bissggxjm1daa5ty494uh7hryrynrueiu2yqnq58vl0rpsfa8qu8lvo8ds936rxe39ti2lsiwqjncail32dujkwhes6vpsxc8otxff8mwr73ee8wbbv0vliwwu4zk4o8qr3e340d8xom0ure32pmij2wzo82maffr56fdpm136dw4vkk9e5bjoq28upo7d63u24n5c6jsh4zryqwrgy36ywpdv2m8drl8reuiauegpjhv458btsgt2q7h6znwux826bx0zuh95n2sla8tg4a2fqo',
                redirect: 'xm4gc5qgl4lsgzz76zlcmtawzqrmvwsx0ju22jsvqcu5kf8dpd5z49uxm8bxcddw9z7bnidiv17fppgjy88h9696xvfkdwbngwj2v9kgccol6fzm412pr092tgu6jupx5pmehacef4e5ylnxkhcfplghozmy77vx5nd89fkotbqshzos5lvn1i82w25w0u1jrnp4zhnqygtiztck3znfpjm8lan342cu1dwbacyheezets86imlibsei516ev8pvd8d3nos4jcj1zs593uam30gyz0zc85ca313qyczts2kf3vcso9stdbyi2wo9wm438cfv5odgxb2z8th0ow45xjkdkmhwu5u630ryrho5upazlx5zaank7e2gdipi26azps7k22cricr1a3z4q6i0bmxjxyy3kpfiu19og5xl4ti1bnddh8nlfppqdx7gme3qdgt6102hamqaecfng7c901g063uwyw6a6nvzlhw5uxs4tfzqxvmkz0yxwyt4ivsn67yz93dsw54xubqwick3l0lcr7j743zzqihww2y0zt9ihe1ufushdjrnf1du94fyq72pqy9jwrevstgjfawtuw5ql6qylyr5lqs77p47mg0nv03s5uu3cshjpr4m8wcm51yfhcw1sjavorlazy57jxki6anhj78nvkbhe6hjldxfhumdhhx3z6svlp064d0ykomkzsgh4rll6j5tks2bzefo122p97t7hhv4mnup3p6ffw6s289qicradvwrqs9j0gu7w2fz0ibp9p073uc65annnjnkjuug14z9kin2bfyl2wgy7qsg325qghudcbyk3s4s7s11varw7yk6aphnh7s8f68zkvvkjkaiub8yjzeh1o2zacdeumj71sbchtz3irh48i1jxe6stfwynkiocz1sw7jdzri4oevvdadx28uf7ter3dbkspgybp3epy7bbqm60df7hoarb12a6amdkv0xwghti9uba9oz46bc2qssgtweewdd3m0cicvrg0i16yc4vjml75ga18v0r6pua8g3rfvc5xy3kvc5jkhvvgqrd84oylxxgafr7ksos3pbb8iby8mi9azvpo8lpvxrure1bjlqeuh56qu92qb4q2evk50msywkyxj3q009db40a5xd7cmux0oebej54gs9i46ot8crtak7ywf7e38m0bvpll4r0jl7znpsxib78ahkm70qnffgj7n23r52i048a4upufpf5pf87x92t86shvhdiyp5valuvl5218ji7hnftreoauf1h1o2u77ltpic6mst0570rbjzs87fs8p0i08o7iwylg8yjsecsj0e9v9uyipv8sn6zc0glrqv2bstn6jawv2pvrm7ym38x9yiuo5wn6qtlq77x0cnve0u13n71bunkq1rvx8mcgczmovch0ppe78nnvwugcbiii63ak24e3005qeaupw1ccy0us22ut0i411q7jzh84s4b48czslzi26l93k8l4bpdsbo43xx5dftclmo9rfcfc4w40iua7yajp832g7ni1zdewkp9xofkrsgqp0j0j6d391ijz63uqctup4kyyqgfiz4rmawubl02swi2tcs4bmtegnhm7b9q9so6anicih3mo00fpmye1srcdiqstjwlhyfb3mnfpuaya1gwuqdwko4lkbjfx4sczbptuw1i9rtwf3pj1yekxu2u171k7o4d8iaftg1nl0m53d3emr29okhl8e35oil48m5lfvtexspv47e4zo05hw39l7gljnsbijofsb1smmal5uo31xlb4kqm8s6fn4nptbl0bds4alepq6acbafuiiksotru9wtd0csubljy3awbo2498x9jkpsyy9bfc2ydhi656t5qfdyminz68h91juzywzuyv9cqlfiighks9kmfcd103qzp04wzhb86rn640e9tf251rjvu9j0pyxi9on5xto34hnmqeag2ao6stcbjw1xxt6o5qdq9g4nwm2fbyvjc9wojcgm21xu9hgwv2ovfvkswk65jtrbox2j',
                expiredAccessToken: 7649010634,
                expiredRefreshToken: 2540195538,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'PASSWORD',
                name: '5g72c69hklcvogc6gmvk9b3tcma5tq87k8d6skvk5j49vhlsgp445jinqiv5di2ny4wwbgwifnmdssha80f1l9yzxvauyvq8zqmc1ctpw2sy7clqxiyq9jv2prfh61siyo1mcu46cwobd88b9t9wov9dmxic9rkc7zmjcyfcripf81p697papc13ykc15spxws30u6lzmu3uryxedrpoke6zwh2u15v0i757wkpxo2swb6cd704x5lhtebpmdat',
                
                authUrl: 'fzpuir2of7ezj1r8lu1192vj1jof9bycpa3j2nrgs6h0orzu02nisxocpv57tvcrlpkjy1yis7q8z2dkjrs4a81aw7drnunob8pqamuhxivioxj76b2mjezfymh5obu8hycxlne90b6p6ksgul5rybpq6dckq7en09z6aytnabu8xbn5ky194qpdvoogco3rf561tzq050dtyfx2qno1m5vge6p126a0uuhozu001k75x6mmo30nk7tmaqy5269yimp0favysfrjnlopwk89z60a4xcywxt29y72fhue5pdvskerzdenwslmb8w2zyjahn6t7o3xy8kfrpwnqqzt6yw9gmbtux3epbi1f7pfqmg6oqlxtlr74jgpf8c41bp7ykza0em0ipsmc2962zl6nfm0dy3z2bd94lhnzcelso42t5ywe1k1na5o1faprlgdd6qrps9qnnr8vpfyelvq460ls66lkq9lrktgzoriby9ckly2g0qze8lttmubpmfwypne2x07ukyp9xacdtdczzczer30ei7im09qxvly8tdf88e666qzop1vx8honi9ai2g1r8ykle6sy8iuaxcda51zmtny3f2nmygjaqduzqftdkd3zodzk5d8bftgpcl6pqn9qmb0lhhhtck41ocym1uf2kkw1q6guaxm9uhdwvzoew8inyhjinoi9pc0cflyn9svslng0kivxd4qqnj59e11rcvhyogi82m9uyutbab9d5j1h0rcb16sc5f12zetutfcs03ynl775hf4qeovx710s9hvn5a7grupfq0duyintrrpu9otw8zoqawpit51ql8x4oniw6sek0io44qq5fm8os9qk5n79xubseee7ym6zewlvcuoipaek79rnk70zsabqcoihf5lwotzucszfd0mc9wd0x38er7jdg3fh7rsozci8jdzuuoa6eqoswvv8eywrnyblbrlhrgtr1jw7oqcyacju9pj7ilb3mgo5xohr42pyb62mljizxdwv2mucljuwi9dycr5d1ic08h8f6fisrs0ptu35lvetmekseghq7qzfkl682tfla7d9civrjvsiaco7477k8h4wohxbebdm8uol23xhdul4h3g5aup1fx6am4167cuedezd0cwpyuchyyppof2rymzqy9pkc9zgvok46b339rd5nleth5nhuzl1f4v7okwi9hnet89n0smdigsbtyuk7xaa3sjfj4a5ecb6abapjd14082hnstxmslx2p7ij5wu4wqoc6a73rsfg2l3hvokfdftie4kl2unfpakpgxtyjjyag394qcao83ked020ckkk9s54fm0nuinuwmttrd0vh9urrkiwgg19ij939d43jrfdceh0z4zjyu9ppsde2dpx7s925qkcgw7lior7welvh19pwm0hs9ozmuryniolpvqueaf8q2i1vz4v8cgok1eg27gkwrugz40gg6aq9wzysunacp65n81qgavyg1vip78li6kqcb2ngpdt34fl5bfw3xr3s665gj2vm89cbb01wcroly6ne6mq399dt2vcl3w0y2bd73c6tgiiusovwpjz1ehndr5xsdujmcim5q7kyhofu9m2zdhpp1ow5ofavcqig9yz6hwe1vckulo198rmvi173qfrcv4bgehysqkp975pw9ylzaxa2y3h08i01gwraxb39qf5k8wa5vcv7vtfhpms16q7va5ni2i79g8teoq0oc1ep1g4p36i05nwvpx98g95eambjuofbv94qf1ge186najutngx2bcw6y16ub8p7ht424nh96xne4unjqkc09zeei97vrh5d466148d6mxtil22sf67vldu2af8o7vptlv76lfjigpxut0tbazkg3nfdfa3j1gnd17luslrgehkluoazjdxt3cn0q3xmachwq19w18ktonp8wehzt63i6ai950e4633v46igfqnbjtqo9aoltf9jduym321qqx9aepipnx84o0l6cvdvjr3784lchyew6cf6dxogz65lpj58m',
                redirect: 'zzqb95bra2tgwa4kch1s9dbxong2d24yqnhlttlji5hlxdh6l14ksncq08oiu7wbhu9f7ixypaeyfxtwhz7w94y1a9ayim5cxmqtne3smu7pbne7ge4gub6rrunmrxy3ef3yi7l9s079jnchh9rufherz8oagv1wd4bdcpaowa7vkpi5w80h1dq1spexaoyioejbqnhk6l9r3x8hlhs6jjjhek1fkbnov6mzjiudofq4ba4o648zeshvesf8o3wf80apwe61qobc66frcrz5a4g0b87e5eko4n4x3j0vjb8xurqn94th8bzr2zyda8fgloz60ro6nc45s7o5avttqqv70uyw86p0f5b5suitjwre562p65su6tcgniq6rij0uhoz4abw0xlhsur9hltwdhewjtjc9xc0rwr4vgnstbydw9f32mjl5tis40qnqoxdkmjhif2y3yi2q5c5fhna3mr78690kkx534wduylhb4m4am5fa3n6cf2flmq0mf2szw3ss6z98pll7abbfpe7tyvn5td4k67wsucx5lpukt6i3km8ccqbqne84r88ojxfrwhioc1kz7w99l9olu09uzomgzywwhu2ughcdts1032olnrs9gd1l0lt9dv7bjiurvufmj80dkqgaxrvd83p1k5nbci7qpzs0aej0tlv8jb0lytb2p7p524qhibz4936a9rdhzkvc51ji43731lqenrobsmk2hfoyd4ke9x3latow5qousi1og0arhcoj514cxwk2h8gz8xioj53nhh2jt112kjhh8m7gzgq9yr60ldyvoertj7vfw72ake15wjvuffg1p5ny3w4qwxqucmybdq3503qx9pwh9ask5unpxxqovqp3vyfr5os29mlpuxwjm54ub74vnij31b1qxe9q4dngiqodr9o7955idk9poformtclnp9h832vats3o2s5zyghwx6emggys2ho4hpp166fka9p4fbagbft2ixn2i0uebdsi1oa3b0mbyb4clrde90bgo50m0m1js3qlrzy780vihlhkibh61xc9jf7e6y25vbs6x3luclc9cyuu11nwi4non2y2hcfz7jjl3pjea6iu8tsy8bgrbkr4nj0qop3jnvzxl51gd2ev53notquhmq6xwrqeetckjmme7jmlut3llhlv35o4zffm2nuhh8ahtlt385ztz45s7971xg74jgwvqeega6oszksgtvfes24e1o7cjiewyk7dv9s147dgbnnigiy495he6upc9n0vjqcf2171s57ctg2y6dnacch49tiy2s68gmmaru76kq7qk92o9zhd21weuy5lr2wxa37pya0n96iotgjz252pgbrq5gefbcm3l1km8v3ermpm7ag7wjgdn4468i4enfnjmlmo78q0pvc5gavsoct0wo54gljfvllu4deuwufo3kkasly3vjrmao3ken16wknzcr1ekcqk0t7l7p05uthd2e7b1ue3am2vjinb17zaqyfklh8i78hcounxsriykhjai409q0vp87t3y0cxwdmh4nto5kraulw4auul3pb4l4mtfaklunapm9mfzh6tct3jsryngqroymtsrjr241eui8q5c77gp9nhm3a630iuyjezkzl9ewxljc0w3s1hm7t55yzazgmjhihya03vx7hh0m4uel9lcldiebixalvo1wpxc8ax0z8ghrwoc1xwqed0cdpr7eq2cxf3pmu8qjf907nkl018bko6v0j94f0phicsqdzbgjwg5fnylo8t3ch3ys25x3x0a1t2byq9zgzlrre19d93et6tnztvotbxxymd9r40lpnxp5uwltwube5hgztj79kg9j5viagibnrvdbqr78930hfdyl305bvlboymkjrriyh8fo45g6d2e992qbxe38xrvc09j1fg7srxvnhuqyevc9swwq6zhfigqyuzivxpva3jpptuo9b5jmeu60tw8x0ttydwm3ili8n85n86wpihxjn7qvy2n6ew4hhhwuffe6ebecgd36ho2z',
                expiredAccessToken: 1745827331,
                expiredRefreshToken: 1347518023,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'v93gfar1sy9akzih0cnnstj3kgu0jvqfsnpdcszkevr80wfksn90xs3u9gasqja9i9xyeenz8mos0a28o46byfsxf9h4oyhjsmhzskpe8dtkg0mt56m4iokd3c1yn7pqg55p91u7v0wdzqo28zl5llbaiwb97xxe6ohe0gev45t88g0hruhmbzs09km2y5ejmcm91k07pht54bzbbkny5nby1952s2xpuk2jvae798xzavt1fozita7672682wh',
                secret: 'aruk0gs3xq9vv0f2tw1s84hayt7qcshl3bg72as2mqgwhf354pfjp1jt0foxfmc98330subcjo95f7x60qhhxwkik1',
                authUrl: 'vr2om85h62ztutcqdcszf3jsa9pk6gomrb4wfq51663xskiiriq1cwhjxgb0eb6we9ekg43wwz1zltam8hzf0m9ds8gk349rzxic0rao7x9eatu9w3j4vekunj8fi76px36me7vk821feoi6in800r1rs4fgrrk2scgv8r66kc5fymsvafmc4qzc2iea0tt58cx6lt9e4dqrwczbxu82f33kzeo8ud59lt6498y6xbnpa8ts8iu61cgrroeaeal5z6teg4cclcq0wgb446dc52ubbqzd983x50y5panu3jaw084vd049avaigyx99id07wtacto1taeqfxup2142esnnabnfy6uole2i8bfm1vkj1exew67tutka0zfapo4npu7f9q8ujcjzfommxyq9wvcu5t5ia077o09xfyp9asxbwziphg9dybkg1o4ofgdlfxdp06a0n1po0my1uowfe7tyre6uz1tdcsbkpo4bee6c23j6zpk5l8cb48ytlxaisv9aqj5svo6fywgphgcs32qk7xd5oantnlmayrufrt70vnvtf0ciqw7hb0vwaq20lagoaerk5fdukplfmm6zipecsciulnptjeqxicnpnwa4qqekk00lnrxoj8037juw3u8ofaafoniuc9heyttdcl8q58w1hlutmxt1fcrsaq5p36k8vzz0sd716hygmc97yw9aq0i3qat0fq4vqeijyb073q8pmgg0hbod3rc46ka7q1qq5c3x1ofgtg0r1xswhi0gk2hx3rt674wcj4hn6a61gw9bi5wz41tqd94xveqont3h9t0kz8f0jb53geaduchnzen83qq8r12pch34k73bg6pe7kjjlpy2y45on2paxqb8mdxgy4qprdua4e8p4lw8u680cr4z9yh1c5dqzqyrr34m62tcvf3vzby1ndctssmijrixdtn4e90d9ve7a36fqpldvrcwf0pptdgs0j5mn2m5ocxnerhig7zn27l3zftxm0n3olvkhmhq8zo6qk5jg7rw16qscbg8vrdrsfy4wfdy15k4xehtoxur52xkaph3cmyd2bc1mmu5xtctadnpnvxwmvq34b1cl5d1umt7m3fajrxg0ptcd2wgyu99rlx3jaiajlcfombokiziqmzu0hm6jfhy7eymc7ncyruecfkcto9herjafbkfsiz7yv62f8p2bbavxe89dp0b2gcazuyxdporjkmy310ertj45ve9wrhj7m0eu1ddl1mnwj3xhi8f5nsh3tyn3magku2nefngyfpkp8v9lq5mzs5p33ge5cvr8dy9mruh34cv17nbar1jstdqi8meacbl5fg6g4hy91dhdfm31azbv47w4ka3kb8gyzcjwjs5yz2vmkdjrm0ims4ygfecip64mlsp5vni5ser96cas646tjf2xcjxu02ezgzzwcd3zqcpy0gw4b50pap1umths318vg9t9gcrdqtxru8ou4pevxeobk0thqdpuv9mnicmcocgbqpvqzxr4cmxc2t6snts5o666vr0vi6ihdyzn16c6ddkbr9ie8efe0p0oeb9c4kg7fi0asfj2mytma5ho29hog7vnpximtwmh9wed3zk2157jmitak5c22s9fuz6gey5xv8tdirvimvd4r560ojui8s3i16atpj2ppx3thduwrr4x859ll3cao12hm8fzj77zqnqxchsjhs00nwfyll2a81lrb0bf53z0nus7k1cvyk5zjqgaai9l6939bntt13zmatavpzehp5eb6s0yjo36l1s52zmmr32h7sh5xvx6a24hq9vb5fhsksmii3gc1t1hg9swq2ux6qu8t94vcv6ix9uyw9hdgzvnifm1qbg0qzkc678o09ndw3ifrxetm4mqpbx1dk3sqxgkxbpq7orjtq4k9j5wmkrzly6vf7dusgf9ud8jzz6m617ebguji540pkm03iv36f847nwwmgguoe2npbof9p8v2xk9o2y4p3xveqbc9oj8vlgktu767rpooin7nanf46x4069910r',
                redirect: 'p2lzppe0mm4ix1mb7sigktkb7eepissziplqlr1n6h5w7wf5xvrsdy0pujgup4681gfg77n3eem1gqn22bovzj1rrf9dhi7k4hekf33lavfp3gksocc0y56nnmkt90yu28gjvqy59div4xz9cfuzjmobt8gac00z2zo1wmepzodr1o1o7e50spdvon4l9up246are99y315qs5ztr77fovsy29s5thglr7bpq29is00ci77v382sk4je6pfb5ldnhbuw4wb47jwe6w2bj7wzfvso64oso1iy7bxot6h6aqd66dpiyh01z8wlbzueiktb6l9k4bmuw6vwkrm4500484k4if4oi0uqgdmwhkud5ic21w98besp57zksz4qafb83jiojl4bg8jqaz2tyu6q77rh3s50v8jmc00rpg48ml540aytgw7w86bzqr8bxt8set56f6n1s71mn8fh8rdmf837rpi0i9rqe31iklppnd3kr10he6rfsn1qxsvga7gfm010q2mhlum7n6aad29rsp660oc003dg3s79p5e8ielvtre105x3aox5sz4rzkq7u1dkfabruczatx5ztq6wy11yu0imc95q8meokw0gmpzii023hf9mtxbvci77mi95wqzmxgkpfao8yimu9hvzbfival6cuvs5vaxh2pqy5eo04ngkhjxhjswrpl0e99w07p9b8m2t8l48pfsvdj4d43takk9bytgq8aymglh068lb3x3keh9q1cstvm4a98fyr5sm7i5t7ewua95yk6p8m33wq6plammf3abhbkbux2jup04zs96x4rhi4hyifq8vt1f2e595of13rqz079x34fduo69dbdq4xcuiio77sqyvuquflb3fcopv67i8w0ilbl5f9e7aldmyzwh5e4oi0ju37y8d17a4b1472e3bbju4ofpam2brs53ypyd4f22c0da28xi1ql14j01974d2nrkpsjneccuiukxff4993n9mw69idlcv9bhqveklm57yuv5x0d0ciigfu9m2sukkk1m5xkop5lzfymmg4b3xhgobxs40ciq163n94ibfu3ra6lpcrlxx5h076rdelrn0ibnwkr4nrhhufpatdtlxhbqctgg07sprqqaz22kjxrw6179lv89kiyksw2cmjzirc5bp1hh54qeen1xcvdo3b0w23bnrarob7od6j58in63rpiawegiix9qbxa8wqhqpqxifkr90f828p0dzq12bxqjjn7yajxrn235k9klcxqnkkg726j5kxxrawc1he3oeevyk2j5x1b0cpzgn55yfogwnf1sx32rdmeix5433i06le06bz0slzl1q5289io52zvc4vmyl23n7b9r5cjl1m9ge2ufk7a9rcl8vpakpjlvhzvpto7k9iu6fk0vi8g0ene55olc7wky5rbkq88ywjfegkb6z2azqqxbzdzi6pl8cfuvpm0cakfqccjhqmef68uj5k8q5fukuogdu6sqfqie0pfx3r7gtxpqhbazt36kdch0ekw1mloygf7tlamuijj76bx61j830yd6wpg01jkxrph3ei6i50k48256y6418pn8l4hf3plr7bd9tmeukqbog48c9w56o6mr5k0s6t0rro7kuysjadlsnh2ct3z4861zuj87obtsu1umms5eno3bovvq2vy7bkhs0l7xe5dmrxw0ae9deoib8gkqtnnu2mykimwh1ibn13ob6kudsk6stfbpn6939rix594tdi0vfdqcl1bx2g36ah2x3mjtdxgjz7mh0uqlq1cpsnfbf4k1leqwamebxkh73k488od3syvgd85f652rx9qws9yrhrzjr0k2jwgd3b2kx3cdvklfnnboukanj9u8g65rn5pbjuqdb9t2sk5oxh1ogt53kkyghlxpc8sgbg97srofqn33r9oah8kv2bsop963gd9hgjyh8t81lrpu045cp6d4ce8s3gdi34h899zh18xiddw4kujscg8qemschd9ctw6ncru2p8bse69uh2sj69pof',
                expiredAccessToken: 8765078214,
                expiredRefreshToken: 6292751748,
                isActive: null,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'bwazijo7fq0d79ggzcj1juj038l0y2t9v17ft4xn7s5b423sbzwzv3373xz5g3xlitcpqf7g5i2mu0n6q7ugx6xdao9rgf9k4vg9vpob6c9dqfnfx0r1f4kdtw9onolqjp4mw0dnzy3e70ma3cacojerdtwejzu84wjc6c0ddqb44xa5887li3umygpfgig6pic7ckjqph237bii41h6cmdw9r816k4kzw26adn4h86pq6wh2gkt51dnu2qzr8q',
                secret: 'qbw577nazghfogg88gte70z4wm8v56xc49xr5f11ozndq9f1tlvpshw40efqcxwuixqed8rv1hfro0tk5dm3yski75',
                authUrl: 'pm9vbjlywavsrlhc185citmbuub7oucecoqrynstoqrul8oc7s925ov7tx8j80xccnvpwwss8q9mn6rhxohb1oonbu49uebxzbfjrw3rj82t4cysfptedxkvza6ne2lp6ruidw2xovsem4ntqc7yj6ofgw88fgap0yhczq164vou3mltziw8vx4eq8m7e4c84vb28zv4zrmww4v9in87ryhu221dck098xym418e24v136f3ozrsbed3jz37bfxhlcf8vfjrwq4xz373xvmk1624yc9eoxxp6gqp717p172ivajvhop2zzzo8khlup2nx4k6sm2xb0ixc8uqrz0tj6o3faryxxr6al4jaj7kyinu5hb82nnc9mp2bgdsij340orec2bh4gh9718b4dshepj652jqc315khxusz36l0jlzurywmjuio3wqdz7xlt3z33nkkt9yrg0igmci0c20t0ld8tsz6ir7yci5nacjx5ai3y7vqhbchlwahqnx7xnh4f3liitu3y8zzmi8jofjkuqjueph5zvoxs8n55sg0og5ca8ei6ufzw6in39eojy8vqrsgvzcufrgmz5j2ph48eawb7ebgwsmzqin9n4jqegk5psbjv3u105cqh33p1x07tbcoe4j3jwbskfthy84n6tc2kwlv9nkv8vfheg6ztfczr2ulfqhhbzygo2fd02gdr8jtfihx19dh0oyhtj82l2g1rsiol1wub084j8npwcs3fugog62rxl4lavjfsycqsxiiog8lf0gch71tku2pqypdyxa592ynwdgrg4wuqjwkt2e8akmnp3qnv2pu74pisidepk8g69wmat119rerl3zekasrf7w5xpes1wp6ntn75ae6im95nb5rc54yur5qne5tmbsfgr44wvmx0eagboy1k2m4om5bqlh8z3a17aubx1tat6zt3qj3mpki77t9834yjfzksg2e6h00dtrtnsgf95ggc5p845aze8chfivnqkjnjury0c2hv19ccfi8a5rlktf7y4rwlzeo6uz2xprg14kyxy6ehgu1h4f1hbkw0tksx8f2g8wvgpqul8zvl8rqdhivgwbvl07tznx6384tu5omp7it92xj71w6dosww4nsqlzga3cy2yvq5z956zwy2cb8hh8i81m6i08ta2kn6vd4aitewrn3plte2a9lq17yk7xnlh62amll90ecnjo5yw1jnf5n70wh2rzwx727acuu32gmtjpwj8rpgq1841tbqg9sv5ur1e0h93min7jlexug8rbb3y469u3o1c5gtetfe0egeu36ebhzl87r1g522ynoux3imyjgv7ufwsbye57u13a0bpmlnpbyyic9ak32h7x5uc1ia697mialhoxf4xd7x7nm8wspyoxb3hovv43k570lto047mdfdyuvxt06ws2t74oqcweroiu4xc9d7h6rk3gxl99a9wb8c07565fng1mdk3njydegravh5a4v7mpziekje0emqc0extz60chobncytdzuvzjhudamxyrkbxhha6daqrzizn85v5x1p6ad16i9osypthqy4kxf2win4rhflf1jbzmcvb3l1ro2darsnk2ofh37xbzielyy9lpuirus82o3fft40inc2jn0kjfgb6n3n28n0t2adkmav7aamvs4nard9qq2qllagzyb8tfrgylv6qmk2mu5j94swhnlfgtjinl1054v83t0r72xsy9nd9ajkzp5bn5rqccdwz4dearxdw33u91bdqlq0v08hh7jcofuzeh6a4cr8k7k9qxgfjs1fbsm3s01yb9q9nxau06uudz3tvsdffl68g4eud0losui5ij8a0w8utydvndrhgvpa6at6x9umtc42aiaxa1zdjyxiq6ng5pjwo3s9uk5fu33fq41kich5mqh1lodwr6fcewyu8p57wwcnzli6qowsn7vz68cbp4wjqql526vfbnrfla3h0mqaqgwtaq38gknjyscnghh6b3nvna8ku0c3yvoijv2kclay3rxjd2fwj',
                redirect: 'uzr62gr88exkos41zxqq267bfeck6jhjkluc5aenp1iaxn2gw9sjbq7ggenrycsaoin4haavh41lvl7uzzk1b99eumruj4xwbtapvej00frib3okaswyfd6mrx5zsaadje0r4jtb0rnw5ht6dizmaxbgomtzmgd3uhxr23ze9llmn38q27vtke13iytfn7800wvjdz7tpzxn964e8gfedewvoe1gin8m2f0avzl0irqz6ocaondxte04dnfe5jigzifm9udn0tqow9yxghntggmfglppjtu2by5s849oahkrajp9rw6ssd12a2zlb8yk5kdmhan7k4sooq3q76k009hd0s6z7964by1dsiqh12x481vff77olcx54m9vbqr6huhtdq54itmxrdhyu21a4vqz0nyzydhsn9w6yuqi3tilslh6dpnqmo4edrys4elhzi89u28wr4vqnhgyvgeimz1r93dwsy00mjpusqaw60rt52pwi08qj1cfe2trmll7qwb089skacvzmdj5gqk9m3ssgkivckbxl725giqh8n40lwcvo3pr2bz9h6e2voz8ydkax007b5iasky7qz8d652uhjjnoo1kviavty82xj5vh89zrqlpj22g92qn20ca04b7p652yuzw8vgg9i2q800db2ofr2rfnc2jj07zw2lcojqtrn4igrysyhx1zjbaccsrlp3nqufujd33n3hsvmdvqxwb2tcgs4qy4bre7ufu64spvxcxhjx8igcj7yg9l2gklt3ofxon36epyjsulxzqfxyrtbv87rq1xfy4pwkednwq8jva022bh73lt1t11xq9e454tjbqrczfn4fthzycoq44d0b2gqgu897qthu5erv9xkfo0j4mdmbzdvmcc5bkv81o2j6fcz4xry9ykidxbvtn44tgtesn4xt5y9kwbema52z4wigco22f136d0vi68ufrknfdvkmsw4hnqibg9udiqvgkbcg3dula3vk5qqyje64y1asg96na0o7j9kqc6gs90q0wgbr7chkg2wkypfr1rxq99c5hhql2pwp2dhs7ezjn9z4hayyddwbjcgwb8tf5otrxy64hah6sad0i80sm7um4bk7jxiynnal3dfsrgt4r0i2582srlmor4uih58h5v80124aun3qqexjjzobmzfoaxvdxdi204xtajn7ozr1gu0yl41rgn4e7wav3y7nhi26bik1w850wd75p6jlr495aesqfochzm0c5gpnmxo4fplojxr5ccs7x01s4tp870ombpfor3d3gvulg1js7bamgohcbporo6oq896me77lo3brlhltdfmv5z1i0wwsx8b8sp3l3cxr2tm8atfqt5829ehq65ooinjjn4raxuian8okoia315076y0qvxbljvzbf5rb11yz1hq00dsw9y7uvehs9bsrwndmgyq8csqlj7lpxazttl1luyplpmnhgywk9ouivpvb6a1xblhe382kpbg4vaqv7irc78ezgz3z8wy9gf9v8vvylyaswlt9xnmxp8sefs2ojeqzg5xn69w3j8ynj8ltawpvgdw6sih223op0lcybfcpy5xd4h68t9bxzlb1wl8m9ic33cyl2phctdi07m0378sw2zfw5rxnchg98q0lvznbpcmuqhgw46dtldah6hncbxmzjg5iawuq64fnrflwh0lcy1wtczrusmpdu13mat96ntjp6ji5orcijno00ixfd7lp6tntuk3x4dn004w3y2rx8ypfiu285rrblrdpt3vll89528yo5ef3wpk2e5ssihob6uc8acsif2cvvfc6qthl2m5yifwnwlyexfc3ce2kqpho5qtt2nphdsvis1kc5sa7stdkrkw13e9tcuovyiu6nuuafjux8m3cnp17d6k74td43t1lqb8c6z9gyco5vt23cumatmrqv4z4nd1kkrs3fu3rxhbjux56ve626erb2nl0hhg0tga99149gfywwug4mn6u0arz3ls8ujatr8q8cmop1snih7wn2lr3j4h1m',
                expiredAccessToken: 8946866363,
                expiredRefreshToken: 4435961116,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'PASSWORD',
                name: 'o44v878pf65dq946x0t5beh30xwxu9lgrvoz8qnm0rl1126381ycfzim9bg5hbk2kajexcy2emiegrv2rvzf15lo5a4lpa15fnilhh1cuiymlwfuk2zc5eyvz2i1cybezvyxw7nezpgddotbje7lho5e7tyuybgszb3tlvyx1m503jci54ypfhxt7bt6luzeddxe55wcxebg4xxigzsgddbz35vlyvmjkd2rbhl0n8uirby13m0ot5mpbfi536l',
                secret: 'xivke7tgtvkkcvo53io7yabmt7u47571j8g1bpbtfht6i4w8z1z0or7klvgg6zzb95bwkmm48m8p7ninilt0ed8rdx',
                authUrl: 'qevajtzi4potigyjb1hm7b42rxdyphrcnpmdidmb85vwdd00rgfkfvo7d9u2oggx5u9gvo5yyyogtzzunzxs9xk5oy9zdp56mw204i8mk8gdx4znphrg6y6xbgazl0q0uj9l7qlcwvz9ll1h3zmnh5wlj7plrn55snixep1brc3q444fh62r1atf9r4050e8igh8fdce5eh8e5x7zlhho5yunwqtlxpph17yfdmqr8sy39vpckelx7q75k3bccnpcwmf1lbl31fs5e7py645929pm1zwcdy8lpjvdd5p3pom68b4zr9b6fzjssz8s7y9jv7csk2swxsdoyi7k86w2s3rm2jjnt85vyrxpoyfu03g5com0zdzietyj3wfglrx3gbaroac0lr18l7c76pjwiwmizzbfwb9oknbjnnyhzijfwa59eigcbbqqvoz2srapgjr8rts0hvisi4l1ylr4c09b6vgfvyfmuwson1i24it3j3g6v375ibftkmzztbir20e2sihjkan48wddwr2zk9k2qfevqpj8cqv05d4jsw9uj1cfiq4ndzbtw01fgx2vppgpaj0lc0ctcz4lweb5et2ltyi26s7vb0by3816klwu5pwvkxj1q7vvwl1qqhw863a1rlaslj1luflowgfi9q86l6cbeu3snu28sa0o9hbjiks5al9qaymqtk582dj6wkplzsvpf9kiqukilo4iihlyjoyvgf6bis17stetovvviii2bss1n57zhsmq2ruj6zr56vpgmujkceepp6h3xjxgx83i3ydfcm4lvc2jnt3y8nhewmuwk9ct5k6fawe8o3iwmluyxnap4ceyy5l1rkbhx0idfiiuchj6h5dykc59hb9b7e320ji7ctxsxs695f5v2wcrhpc7t4uhrvzj7i562q3trytawzw7pzebirlef4rn90g2yfu411fta4ld83p04oq2lyga1270nplfzv97cvsu85l9jtxtal9en03xxev9kha7wqujkdydbpgbrli4z1l6xn4hd3kabbh5q7xv9o8t08tlq0gd2u7rhs19fyw94xp8fmmpdvm5n976hpaavan59rkid6bego652eyz2rnpsjjbmftknn9joc7d4vbat9qdtuj5g66ewzah11nf0662nj6b6xtawvj2128syy9jwfje4wytpett0s3jpqdwz4purzcm6v3gucvgubk4h1vnxjdbx8tq9ram93dpvdc7ex3hp00m2orhf2o9eyogq12nhb6cwqj2039758zrgoqky7ap6yyoue7hnkcw81te30upcc6g0vvr5httvz0t72fhyt6t5j9264p54e4jxnuasujxy2yc25baxzageayyucckizj8eyurc2uwqib3f5fma98985o85tnl493qeorb2nwnxkc9uf0op5phyw6cqyrvfy3gqx2du6pt4eyjaopu52hcfa7ekqyzrvez04nlfyjizttsk7cvuzwto7u9gypgr0tm1ejd6p969yfoz95fhbf3nivg9iuvuzrrrvh48spw7pu9cwy7cybdjw09hefatncnmpvdz99zgm738mrsy4w7rh0fr6hfjmygsfwe1y0nrs4xf1kxt7vfqw8dmorau3nz6uf2220ru7c77tq65hhnvx5w6u6eqitop944u0gd26z95qsmf3v6la4blvqrhcka2b2c4pdxu3lscadw8rgelgw201bncf0ufja7xdfuto3giqh4pqk65lf7pk5cf4r82yh8tpnxtvfn9k3cbg3lwy9omuakrq8txmqiy7n87lly8sy8aq428hgmiry941dl6r1liqj1u6iukigc13wjxw8agj0qvedxc0jhmzcr97qdqvlkc2ppzfiudhekwoo3m9c09n6xh90u8x86axnmqxfpbijfo42gbqudqrr0cd1rh57usqvmc1jxk63s9pu4gpj3iwtmpkm9lumt32o1esxq1h7vkhmv0udmy7veetz4smk90rapo34u1kipz0n3vf60jnzljsq3ms6lq9c5eih1lnl',
                redirect: '0xtusfmipg88rxu656w8flczrwrvadcy8ucphau7yk0gkqib2gxuydq8c31a4ry48glsvb66vh2s1m25zhlzp72idry4hlt8ng8bgwf5q1sr2ogrbgvdnrfnp26x8c7wk09vr92gbkpumjaokii98g3at9i2kidesrkfibkc2qgoulbjs9ra1xq3d4hgp3sa8vboiidw933t9hoqvfdkerq2ks2820zy65xj1h543tue5rm130lab3p8a8imbqpolkbxbysxlgkuyphz5nmtfsrhs7i7nrqjaynjk2b5hhci7cy9vdgll5x0b34l8n03egr21shdyjfznq8iz8xnpya1ykbuvmo76gutmuntmgwiu5unkfhd9m28qcle30y837jh9akobfm8ch5zwpi2bd5tzuyzyxnrv1g1i55icekbkwzhmhg9tfu5cus91q58xawavg7kd3t8ynh5brlum5e3qmt8pux1elt1x43k7hwm2503wowuy4rgv1algp7h43j8blvhib5vgnt9matr9d84phi6935ea85d8dynjjuk5a7yi3plztzhmjk3youxm4enpt1gnq8yjpxrq9t0f8a920701tms2zfiihwnkv5mz4dcilyxaxaijzrva45e8095prxik5nqw6b7gyl9zwp9dza014wsh5trs9a6e7dhbrb4epeiek88x09ly776xnx8eb35ew4plm4ztrel3rlncfdbsbws3t8qika1kwnva24g6nttqbgmxuzasud06c0s0aki2214n5ho03md8kso1oqd87u62i8stflulwgpcndfezuztygnh7sbzlff8ow8zltmu6tstwymqrufhuq0ejbge46i6rf6oynp316x829qp8dork7o004twxo2mzh17rdu8ytacrduig57qnp0ed4uyaj6e0ttk4h419tl017wqjh5spdat2s4zpdr3ehqgj1w35bq76orqu1apv3gu112cobv78rdehu8tylkl05hjj5idxr6azv20ewuart39p75cszchhisx8sbje25ikrf8u8varf65pnefasa4a74wmulkwi0jeizzu2d7s2e7ssx8i7vobx59rf4725umdgbhjsyy32sztt1js4imclp0bc8fbl89rq0s35heua0g9ljlonm3petx5xwch7f6z637q9ia44v2u1uibe8o59753ea7261wf0pat2yny7ztiz95fe2nnlwnfk2aenrdx7ny32rle9ute3ip0fjjnc4kc7zoaz21nnlcgzl5ctjle8ucz3ml5j5dsgjwesh7teqkzma9k0ztr0zpqe8utizunwfh2up5xhc573hijq42r6bpygqk55hoppiehzyaaqew9hnf8yk8uy075wrottgvzr9xbaqxbhfae2vol7sks8ic830484if7r28o9rnmk0ydv5f3xaq26ahsjt05ib6ojau9jutk11px1e4r2ortylimfcrl2in4brctsds4bgg3sxu0hwaehy5g159qd86m29hvoiosz1y7y541qucfsgi824qp97zrerplcr2qhcrg4cpzpxshyh0h6mt10js4yco9aup22lhfej7nvo0nhsdax013g5u3j796r0qjpk0ca33volcl0orsxl8k4sukglbm3phkuzzrk9h2utvtdqybfzfdz0kgmpaus875l2snhuo7wsupm69e4vbtty8oy2qteaocr2zbn4a9m0ki3v6cxtw330dcq6p4ia2553pnzf3qmvi2bx54y50wzl5mrazsc3tt8q6smoqcf7ez1y5u9afj0v18p5zan8lq2e877ed8pss8ltxzedv93lsrxhskpfh64zywdwoi9mg7n2vac43grhxffossjjvphvxk2x5xaj8e6qfn5go8fb5jncvomx4ose8yxdlj6l9d281w9w4a9vdl3x8wwdgvfd1a5m1tkuae0m6a65fccbjysmnbbw1w4cn4b1qta842h44eakq7lamgubhqxyhcupx3koa19flr2c7o23gfldpmhv0glrhm9sedfz',
                expiredAccessToken: 6825261517,
                expiredRefreshToken: 2898932829,
                isActive: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'c4a0zdyui7zpelxfbirssm12mrluph8wzexh514donq9c45j2ok00b5lm8szus78wnc49jdp4ujztbxzmyg77we98d46q2g3s1ayvv5qo2nh3b12nopsv42b6jftcg7jc61kyoqre84rtwogvp13t67ca5ccag2ydy3a3c65lb9w0xtn378vvggt328yqhcjg12qn56ekx17rxe72njkeimjxgk3qvxlwsl1npk8auqyxk3wc002e88wgx2wqj2',
                secret: 'ntity1gqosmpwd0pu0nysw5jkeymjsmi6hv0bmt8igoe09higp0025jqxqmr629s64efrgxe9289fhe74t20apewb9',
                authUrl: '0fdeypegmrceu7w0z5ljh9yew84h9l4wy38ys8m802c9nk8cbdq289my5bpoq5lqw9xz8ynn56fqx1wjdsmjjvy4jfp88weewujgsgoabzog5x3dcy5t1ezlsee3nihs9i24b5plefviywravh8mpsus0epl4ib5zcp6vqhlgypwydjmype6xahbqb2g6xxq77s1w8mzek96xief74oibktdd3844fsveqoyln0x8rq2j2yq37uuwf3qsxm0ov6t5rmt9rhfcwpuauhi95ct4z6gxxoufogncv1apeva1aeoll2gdpfm79k0jygtzsao3nxctbeyydj28qi9eak446xsym7alg6a9695he3ojgo89i96qz15luxw1fzdyee9sb4k6gtopsncy9fqgfkjylopg5lb07l1cl5bumslkkm6nn66oyx4s7w6hji4esg2ahiy1h397h4is30l3en29wh9ngpgddca8xm7u1ob4xj8qy9joxr63r8czazen47equ9s9uj84vyad5rfwqwps7bc436l8l33vtvkgspuxua51i0p00mhllfux51e8wl4sfrmuhnmkn60jqa1eobmxtqaqoqo2b2nk5psfkd2edo3e45zv0ek678j8dslzdvlqmavxvdq3ascyjtdopem6e0qppi4wxkxlnizud6ojsh1lltbzxbnkzyrmr5dn9uanhja0tderxi3ukso8vn1pdy6v83fc3nflt32jxvf9fxtyp8nimrv750vesndneh5l3kyla8iv7nsgh0jtsfvqvfqq4us52267r66rjm1ewrp0mzl8epwq8a8h1jycwfoa1qphehhzca4mczzgfs2koio0lp36nnt81krexx0fcqthr502qs1o7dc3d2pdid2buvyhl6uhsxnw7eqf68zdz05w52pq69j865g4y4rpycl7mhpy1szjhutrylnkd3v4b73aut7r2vpu7gyecjbftx0vajr4t649vyydh7iafcl3o8cy5f1rehwk0kbf5yadd62xvq3bd1pqclv00rh6po3d9nwr21tvm5estl7yandee7mzarm88pcb2p8uo5942hkegruz4ukezgz6n51a7sxbf5drrkqkfhghxwlgnu34z0ailup0ymzaxxwgi08u7nfv41ap3dh8tdo8gfbvreb6p6s8vhzaezn0f8r2zq2t5j2gst89ojof31pzsk7w92bleahit9kobnf1owci5o6ez0js9zmatc6tfq2v92ujovroogyyp2wohw5ykib0qjx0rvxabyupdcmmscc8dzhuhq2lr6l5he9zc64b5n6hs6mn5uzxab42nsuewpum4mcrq7ider4kcwrt2ya9esxiap1xo1ps028mojvrvjvoc1iqo6kk1hcxfyl780opxxqetwufi7sb0301qfa7gpxnqokc1orbttuufv02r7m407z2qhq8d1zn7s93pcfzs3f3zyopwxsykm6v03wadnwcnwc524wicy8d2xmjrvyjrtya9z4luv44gu5size4v9llemw8l7l52v1sdmg6bqxqu1f1o9uz3niywq3smjqd3g67ulujqwzesd6k22n7rpsccxw2h5o1mbnioo6bmtcj5pj89kourlgbjm4hndywawhakwppzzuv0myr48z13eb8954cta4l7ia0bkuesemfbvrxibjwn1t4kvg76ei0ag9cz2inzs4st0exvu7vwmd3ujd1ah3ichsjvjdq6nqc6t2ce71wj1o4pp3zl5x5etvulbp0bsdsuudaqug14t1uv8rtp2qhkwfvgadjreow6ul2y01jfw7oymauztmqg7oczyest0l8sw66sj2mwqdzl96rdhdwu3j39ql4cq0vcva8dfucujv7gz29qxrb3jj55gttaqgs3rx6uqu1g0k2thg5mir9qhzf9ich507q5k3qo71kuzhvbnmhggr3dc53nfe0g9opbssme7qszqz6rpxbtoo5sqml9lbgapljzd0fjshiievzmfv3u1ohfbwnl71rtd2pfzjrtac',
                redirect: 'u7754p8vkjhqg1ma5uoqm1bovg3it4x411p1c6cv3p2esl4ckgoy49ybajtozzc4hfjvh98magvomw4e84q6z6fkc2gzz8e9dgkg7m5d998qzq66m3fykg5y2mcyka2ufj1toj274xqmu2g5hm8m3f0uwq8qlvhq6if9ckeq3msnqfywgixtpoehvv3e7x93ttykdu6mma1y0cijf2an2s4t9bug4u9b5085b3cz0cey445dvk979kbh6grlfv3q38eoureo899mird1akeflbzz817dshan16kh3ts1pagt367qxlajizhw92t788woepmw7cfqi4xxmt2qs5dcf9r06l2t4cy347fx4k0mzpd1gaxyfcq56fjv2o3g1kz6ymv642hembtcna7gne8btlnplhj3trbrl3vxafsd82yakdshku8ay8f48x1k3rdlk5wv77cuv62k4zggxah3w4rzheh8yowe89xivv4jrexcmxovdptxemrd24oupufqatgcxkkpp1v2dcab4dsmqgasrohuwp185qpysqmvzl2byhiud9acjyk2ne58d636r3wx8ns55uhy1gfk44bn8a4fnvmgsa31h925gd5pjpsm7n95mnqh68jxch87axwmbqrtl8uflq0wf29xytdjr0ya1k0xvkbmmxnwevax40fsd8lfbdx5npseezmqr85u9uz7nt6x5kydv661z78cxkaee5lmhsvu49d1rsgq4uhyuzn83qan36z11ommgl9luj83azy1xpgo8gmfrd6cbo1ujd9uautt8v415807whft72bjwmz0hk13f9sfgf4h1eg7q7j3v0alxtvjnm1batdzrlzx8prr3xyt9smk1rqc5hh628gg8m3e939jzcyp8egpc9zpn4o9if3atmzbj7ivdg3d5tvb3vddrqyt2xquyyx2axae1hx2aapig2wv6dlscwn33brnksspl81u48ilwmxj1h3sbkcb9m39mprsvy2225e9aw42i1gezxntwtpy5isfblxrxclk3al1su268ykfwmrtq48am3p9rk2mynlofewyc5im07cs1gfit7nf2ibb308ph5e1aoevr3h1747pzc3ojxvq03o2flffjt0tjrrcqgnxbmvhwpxdl9y7ab5uq0etl0ucxa5hqz3qxpa1k0fqknsa8k5s9zece91b8x6dh6xuhkwviu9i606nvrc5ouqzsnpc91g62gaxdsfslaznb2e1gmx29mz2vm2ju3xg6eskelj0rbj776po8wn2pb1ncwwpc7kr3j5peo7mr8ijpubbqjb5z2anto4obwwtsmf8pm6fzupb8bkc1qdm2ratq37kz7gjaeiznp6t8ukh0zpoovrt7stelg6ql635gcguitv3v844tc7201h6wku4d10l0ysefb6upeuom26e0pdnusayiljirnh3tnpqwoh62tlauyue22f8e7imyt991ihiegxj3waqeq1hkqxeihc009psvzioeh2o98v1kmmb49krbkhczmm4ypemlije7t434jt9ecm1xvh43yonls31vy7j646ivsge8ox31n09rzew4cepaojszwf6exbmrpx4gbapps78moly8skdkbuwvsodxszpkfwyn5tb2kvlqd0deq88454ejouoh5644vn0pa4t7eydtbsfkuain97u8r3a0g4x4pw71wmprqvc9egkcg31fqhpfmlkm554qoqz0pf6a5u0ma2qhd56sbxo38re6p3zadxkjz9kn8h8h7hx3ccr50g12tfd1ybdrmhu8ffp171fsz04t7ewkg7auspmactlm73f2e6coinrprof2sx3vcpqn5ho81113h34ua2x35yepas49rphybg56665gg9kr30hcq2s1z6s1bdmltixnetvumqjeiin5ll33f2keif9w6dsj3mujvlnw1wy423t7v70ow32hsuvuro8aclwxewjxw9rp0iq7dou2c4ecy3s85g87kp2824utpdllqgjlpmzma5ydy7dpkwi9l4f',
                expiredAccessToken: 5357167046,
                expiredRefreshToken: 8935063520,
                isActive: false,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'nhcsd7q3bgxs6rmu31mycxgavu2bgllws9lo2',
                grantType: 'AUTHORIZATION_CODE',
                name: '66hlfh7ni0rpo8o3l50ur79le9eoo64m9nf8xrsti22ckpcark3xz52ibb5ngs563aikjgkexvwj90yoju6aydqahbmqr00hwb3v1sndlk1eih5tj840ynrtg97f5vjdk6llh40fhyzwqhogag3877odzw9ey6umujmdh9xhe5yep7ofh9aeh1p3wiui3khk4ja4o0bwsioukr5zcl6wpqy81ldrzovidl63e8hp1si4sl4i5h80vgxb8pwvyhh',
                secret: 'cqwwbw7t2yk7yddgcdy07jhfiemmpyz960trmec67matyplkd6warjic5dp14iee9wmuph6tepaw905z8gqpbplhj2',
                authUrl: '50zh88mm4djsy2h4ldlrtxjd126x7wzh820gcfi6bqqm6er15upi77d8hmg7o82mg08rvj01to4hvroap37b07a7iwnijqq69hnkc5j03t94cg8y68wl1ar89ol8c2hq3cnnbmls52v5xsrw9bjnkn0r38ipknl30jtdr1dnym0qz3xjpim4s8jqrggn5nausgpzvvsny3twkdwyvjj8sbvom8ry5t84ygi7q4pfh374rpyszz60vkws95rmtf2pml2bva9z893lv1flnsi0yus0faqwnbb8ld17c660x727yhr0ulwdlvj5ol3w4xewgvmpqiz1jq57lpyztm92rvntrxsd2neh1w5l14ph8gv33gecfaazjx0d2shslqw88a5w1a6yi471of5b8aq05ux09mv4kyt1djtzamuortss1y5xk4kljo8fg5za6f7w70hfh506z1vv242wy6z08rwaekg1ohfx2sk8b9hyv7o0nl3ooz76v6cz5eg9kkcddo6yt9hx5kve1k93uzpda9a1bu7xp17w1yt6j9hwvrogysmjxjhswybhk1h6po4ts6v5xazujo2tvavbh8s47obcnu2j87kejlbyu815e79bs41534g6q1eog143dcm71fyudp9ohep8auwbxgqjktwbj9w7tfoqohiy89jlpfd34fc5kd6x664m19c5wu75ew1yb8tfouif59zenjuhis55c8mltji076efaou23ymdnvemwif36piz0bt3lpeholhufyefsd6x1n7xt1t4r1cxmb9zhbm6307o0ihijuq5czpe5oz2i06sga2hc8zc7o1ubel7yc3ifim7ezkw4kspj4flnf0c51ff17xue4y6vjymj11w4dd1z1fx3vo74v828ere0n2fvgm59hli212qj1bb5dhx6bbd29prhsnef26m55cmcjpojhezn7lcowdsujppavzwj9nvd0qw8h73k8spfyc5dn6satwl6kd42i7f7rn7kil8so31to03pgk10cxc9aitdv9ryjnoy6bwy1p6uqlfnbawda0khziq3du9csyrqtfsajkzmwxluu22944i3f4l1xqytbtnqigav5xlq4cv7iqn4wd13cun0tn9plvr7plbzlwbom57u006lyxwbllxgxl2u7x0kqfbswolcsit6nndlsspvl8qj46glld7bdna1mpwfpvdva4nltfkihnw1rhmipos8avwl0g6qtwwyul05otlp2ts52poc5yyqkc6t2ur86xfn54r6afqv5dc4rpsc1ad7h6yj528p0th96ez47x74sgliyyen721evzag4xw3hl6tuhjarpp5jm0vckr7un9gsxvwltzznz4n46vr4f8obkcqjkuh99er8h56hl1suttpwr236qavws2yk72vxkybx55pjnp3twc418g3twc4021it42wlsxoryua1kkb13za4jfbx2zvh0ilvc2kbb6u8oupp7qgmetkfbvybysghqucn6x63xqc929dq3q0b0h12413v8keaeug70b2zvbt8uc0y2fbvrful50n3ama2jpa5ubx211xhmiqy3np0pn4bgwbtubjx1jsbd4cjyphoj1p9oktyvoq0vqifqd482vsrd7aefkmcw9r8sktbthibk45ltcfqqkkqdulek9t4xnp27pnzxgx7jx86coddys5xnls7ws1kgakyurcggvvvxyv6sltkbk7672dvcej4y8crzmjxui97d4h04pjr8al2ejgjtw5mhusm9yuft7b676i1gf14wy3q5q13dgycclow6x59eh0d5sypyc4uigqvhiu9s765ywgtig5u8rekcsnh597koy2o9hcbt592lb7ruqe1xtz1ivznce6nvtcmitzap22hkqdten9jtj3da11sa38em08jwg4zrkgl74a1s91pd2fd29z6qjgc6blq3udc0pnx73vvzribufmvu4sj4ozh0v1d06bzybox9qle1ipce1vhwgxj84kguu7vz9kx5498ie5j3aqmys',
                redirect: 'nk5dl6l44nbw0wezoybf9tla5mryzaw5psa1x12qmteeb8l8u9cuewrkncvaohdzw6lhrfe47xvhicvcjml0zldfc3jw6c3i52fl252gzfindha81btp560qju2thbrn1yry34j44sdqsn7zsucggzpqzyx35zu5eg5y90hi0vfcgkvvvu8dkdr9o3n7lwfe2huckvp8u6ccc81f3cahoyhsz90tdhpwxs9u1dt44zhw8ztbq2nn814e2x1qgqbdzwlmyjm71lg4nhmvtdrhv022ls9db30ry4jpqb06nzvgg35tm9jhmsfc6dubuz4j6gwbkcitrywdeapmj51vxpunuvx5nui7tr90q9muws3o5rudv73uf4di3heamxrn0iasr107a45vzetfx16jv4ck5zbsw7b42vudhrqm0aixyt143hj1yi1bcqoe4q5q5ohb2l79s94gfj3o6ccybbh6phftdo1zj0j6z6kp7i011ffhl26jfq507inj61s42ioq4fpu05xcxi891j97zyrx5x8azg012z85hdis3o914gwkzq8mgefhwfl48aix3elpu8qsgdeevjd97y8ca3q9qlctepnling9noxafhus5h8gr3synn1el1n9wfvrojjnru7ww9w3venx8ywpnku0iqgi6vemgh1iveqhbdmhnjz4bvpnxra71cna94dfgxfk1pofq9up1lfc87xo0837e4wlzrgzdesm8ex9pg81b0ywsy3oe82qttv9nsjqufdyb87mxf8lhii3i21lf8jnwpfm6wgj43gdeqgyavf8wm2u09a82wt1lf35mv9mozauf6q7yrvqdxlbls9fmzwfzt723s06vip451snkq3grgr62pcmkipqsdp3cj5bi48v0agyh0hu0im4k3hpoaqjxjvdq7rclpehp1l8hyidsuxjigcf9dktpwgxy5587qldt501ev8moawz32om5tfkkp9dvfbhlb93dzqz6o8qlqoty8givm9v2cnx2bs8e5fleol3h5d8me5gc6cy421o9ruj9rehr3hswgpbjmp03affgapxm4ou4lm0pj3valoxgy83gd9yuc8d0t7pc6kv1iercpritxj4njsypmo0giymkfmjatz7ec0gd38c0og9wixs2gfuwb9qlt3q6h5804zsp8bfp8i81ts2z0aarbvj8kebyz617p0ah46acaxczafvfp3s3evuiur36yotb4onfvet5b88orr3p34b4vw0cw91qqz4gsrnhagft8bznhgw00htnwfdabnhdxkf41ov6w9feksjfre5isw0b56on5q6a3xoklpvtqpl8yn0w2khox9myb91umfr814w06go4kwed81l6irbbw8tdhnlicc1ln2xkqaunnsqzegd3fv5mhu0n3ovitzjuvnzmrrzqca6ybri7wpetr2qnvwjhmlsht2ylxu7l4nakujc2t1ppdp4jxfw1hq2jqpa6qy67q2wsqt3m4tkyzlkub2gl0ex4nrx2ruokhipyqnyqc53hudevq0gfk003at89mxnqftkl2gwfam44uinxq75j239zphi0ldrlt0mc5yrhqhen8ix0ipqw7bmdp209i1q8wijt55u54dj40sjolhc92n2ac2zl09ilbpnm659mg5c1c9zndmtjfufxct1c9bmiqqmbgv4f2w54o65hzeeu3woedk33ot7uk7t3fu7u4zi2ey7y1lq6jxlr6yk57f1l3ut17p3621ia48wvhi56livnshxd1bkry95cp1aalhgoyh44es3akkj10rzqupd9msh9bhus0iovrpvc8up53elbh8gr9sufpoeriwmodic7714r4n4zbj6ok3f1zthy8t4wk37f3w1p6e770n0wa3g6usw29mbz1bm3saxd1o83nikfyyusfsiiqi6va62qdit2q5bzc1uv146iojrrq6i80hwwnzh1365lopam5yo5vn6f72jc5j942ay96ogp45dunheh2lssyzkgnml0fefevj0zxhi90s3',
                expiredAccessToken: 7051053225,
                expiredRefreshToken: 6690205453,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: 'gifq5i4zccs1woffoonlrs1twl3e2wz2sla128xb58rr986zktkde0nlp6mphvqc4y009nru0z8nc8mx9fcmno8q8iv39qebcd8skliuvfkluc28zuvhhbbwqqmszyqkw0xbpecctxe4qvzciupg76w4f5nkejsrz5tjvz0un2zozrymlzc9c8ckmzmhovi0w7ucyh478tbdnl8wt0sqf2xynqy218kjra9clr1ithl022fuk2g9sg441suh9mji',
                secret: 'hozrywrajjvcic18dxqofzanvyortf7gpykn59dsqqi39e2e6ib4zqu9gixg7rfnm4yi8zjvba5az6bmlus1cseaer',
                authUrl: 'odpr388f2pxfz15mrsuokoqf5u388x22rcj7hi2eztvd177uxjy6ucche4nmf8n8jkigqeggpdplf70yq9idw0cprdesr35j0lq7eybely4v609jtqxnfamfs9t7v8fdbfcr1m71za1qk29uyb3pux9ul16y9foeupe08wqkbe2hz6ngq2irk0lqv0119ohbg0qhlgh7skzzrcal2q99epn1aum9av034gtx5qqdzel2cle50wvkehxt5lqihvfeiwyl772hatwzlxrasawjzkfwq04j62uv3vmqbinbp05ug8cr9l615y36tzmi1q3h81ehgs57xirbktnkf7jh77y34gryrnawxin54xxj2qig3yxcwe7smjjl1w697u5o3yg75bcozur8vlf41vl5alxoo6homp6z2a8x9mdaao292senegyyhm6u6djioaztt1l08mp1zx1jzgeqcf3izac4oom7daxdk52wiqrqnrvpz358al5can8drzxryn3atkpdx5cp1x7kpqzsdhwkri1fqxfhqqaryb8bj9wxz2bh06vqor481h1l8drn3zn1gj6olvirehhq8635uc09k31mpi7sl2jn52rghapmod0ntvrl83ms2zb3mntai6ksdj7a6f0rzl0ypikcyilhv150jaeg9rs4aypgr2n1ib8t3ryp449ulh3991jx0513rezj0apk5ilqgpxyc533hs30chv1pqxs3i3qcy57rjp9u4qb2sji7mvqcvjsbt32wvwsr8q1eqt3kv3k9jmv655ma87ae75k0ccubnw6z9s4xebl7qzkxcxxzs26q5cbeottzwoskheyrlutm8ftnl3e0vnb21jnwvhm9a7twmuii60e85tdd0so7txxa71rsm6mrtttf5iptc44e80kkcsrxsrwds1q0ksxnsuz95xexrj1s26t4rn38hgj4xldey0uyihzu8m37zu3ei1rylajl41ydgbrr58wkdfgis1di3zstnf1ducv59sigxe9s5us5ee40sbsxiy4ptcgpukabo50cdbm6j3mg7rna1u6reqj3zycmh15a9k6snc8ib7udjmcrvmz6g6rt828ey1l8o9t90aqluyu89sb6wvz2iyyslbiegy44q2rv1u9mqm8zff9qqr9fnplbccyknzvt5ia0jvhdysq9zupp74xj3cwav74ruj8rp3hqyepzttusi0tc6okjrimb7kyz0d3tzx2xlrwphrqvg6i0hvvc3ulsh4gj8l9wp1hj56tafr40mmtmw9e2oa4k8uvc0fxithidrpm2ki7ygmau1g7lsvhg4fj4wrd7a827nfknqof5xn1kbo6qmp1z6nlaoimiyvtt69ffwa0sv30oq8gk90kga4gn9e32z6n55ow3zhjpwwwoj58jb5aaajcjp36xo1owria5ei6sauz3fl9i1h1ukfab9v0h30bvjg0sqf3qup7enxo318q3htmyuazbl4r8z4e4llngbu4f0dzt1ke3t4l47hpe5kkpwf2rpw1t1x2wn82vq0sl329mf07xzbfq4b4qlopksagafftsjreuti8ei0pft0qglznlbs7zi03tyuz0wf6rafhdvmo2qpcvbez41g6kmy0fx24vl8phj3idjmx6zpcfbyki6f8ewmh6n29qbt7m384c65c2m8d4llyveuz4cdrv6x78ma8ucdnuc9ehc8j4zvehxp461ca4n39n18gsydrlwxc38wnmxvulq1zoj2czxxye22beepkpwxzfqv7wcfpg479fhkft5ncnn57fov8g9as17qjxjxnfzmt5m7bhtn5lwb4lpqhuwptznudv7wxjbbqgk7jqrgc1r71zubrxql27v1013f13bbascxiodp5o85o4c9rzqe0hbzo879tu5xsxcm819eenar1triyzmir74gjpu94wma4rwvwb1i2sq56lu1w5xlokedj0vx9ticum7lw01ynon9twnc3coptc493q633f7lw1bnvsx6n68gwifm36psxcoy8ppr7',
                redirect: '9qhzmsi3ud9hzhcsunhmxjjhxt1lev8l4m73dpcse0n6vdsm044gamcdk90akbd67wzq5bbj5nnfny8vp2g7uurprckva4to51w8sgn6sbb5eues136xw9el460qpoy7zumcdwr0j65ew050uhzk06lsgm9mtaz04cjcrbnratiici2n6ep5qd7wnxs301krp4ghp3hmzq2vjgdcugntwa6yu756krc63utmo2hkofnrtlco4twm6flsidu1vokeqojwgxbnuu48183vbsj1ucpl1ir7wjwq00fd7n7e4yqkjz601gqtgsiuj2vz78tv8g18bb103vsqwo91cw1oy59mfv2uze9ktcyun650t4zdb74r762zam8goqiazih1rcywm5rz88089a5lt72gahi0ejxnsdvzieo0qjgqis34b86dpb55dmqz5pmev83eldypyptm9tiepr9f9c198kmd1sc0icbrjjd19qx1gr66n33xqy5u1n2cjmfc4exr5hyzwdws3503uvolxhna81274p8t0co466j7ja5wjk4yc17imvxm5wv76x7pmcd2phix1c02v5ma5homv2jtoqzraom7uivkd663yty6m6j608ez0cd9yk0guvwrwobxfwcquku7xunocmifoo0butkkfzbzdb3kc2tlfqml3k0zo4pueq9z66yj7km7ua5ccs8491xgp0oh2pfh26bjpsrg91w9hkrmov93mdo7dma938pfat3ewae6hslsw7s8r5fyg4s114t8whk7csaw994a0rwzuaqwvzyhaorzu9nxgpcs8h574o11dy1r6gdiqn5p5n6i35f6nfzkby6axkcodu85q28uivd8y0vdod5dgfbrd1rofwv2kknd35ngmhuul3fcsso2ld6pgx1v8g78xpd09xtal5ndnctqrv5p4wq9peh1d3xmxwzdnmpfziy7ym6w5qnsk2bd3bqp3v2p0ng64vt95r82jwc96tyqe55fwwyv8xknzzv117gy7wk9t9hguz8h49740ody9izg3cjqdpp5vrqb35o9yi9gzyt7hbhbubspfkg28uf2nrvfjfose55l4d3ky3i45cokawl0qmj1a57jl01ef63utd2oniznns9cxg5o9nnwz6v7yxbscxgfl6aft8tv2mkuihc0a02uivgc2avsu52c4hfuuuuuu6b274ocoi6hzje4unzoup2syq70vpo022lo66leh12tuacmv5svflug4vk96x6vh2cz0tg4uwk7fyslxdub5ool771od1mwjesaapdf482jwywn0h7sthd1wp1otiwu1svmuhhjbvkicfrc2u61t2ntakeg80qf7ri2u8p6c3rewsa8yxxn0g7nqve7uru5jo4h67sb48t3bdqzuxv8x8j0ttpok0cxrmvxp19xfsibvq56vl8sxm3ucv6m1atlvb9ftm19r3x22d0vdcw909g6sfne8zmncpq9dvtc4e4iebd6u5l9vcsszan0fddm2izjxvww4bgydkwu6kwsr3tsiuphjnu6hscax76n9jllft7ykj1ftazr64566g9zaelxx92cvwa3j6ayma5sx6659wdbq4xnyd7j34ii0mx22jjs3jjzjpajkqmr8g0l8hv6sme2gw4mn0s4j7cshx39yuqfonk4ufk985r5at5yvtddhk0qc00u9x30ejdh35q4e7n9697fpgi8pxhjgt6mrqs10j8ppz17wovnz396g7nhzxby8kdrxqwvey2daxl65srukhghxmbgkc24t58d5ra0mjcbe0giac6m3g1xx2kunc03k0744bsxm459wezsm0nwln4tu3mdw989rg5m0hzhrzdomvcsotozc1jatktuklicluabvlku24s6td3xqnxyby200ii6kgb7pvld4y800c2ttk87fvs7aovhb6xzw9hi570b1z2e2y2v6pghenap6ffkygrv3fwjvhm8kg0hp608lnwes2xp8yf2wowfwzqqj3ran497jj4t1eslzbg520qy',
                expiredAccessToken: 5747468195,
                expiredRefreshToken: 1948563371,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'vhntfntlx0qa23h7i2475r5fnbvpgyfgaj3ocjf4fnmz7ishgc3hnw2sarcvsls4ts71sx31xl2t5pw3yknvliwyp7wp556oy2nn36w1df8gjcqbt5me4jh5xnnryanooi3o36rwer85bdcc4vayc9lbhdyysgmgov3qwqj3xnlheisd98vkv1z36q3ow987gu0orqov054cjt107xs9dhfd30lf3bhttme4p5s8awgjuqrpifqpvc8slj6x6ow',
                secret: 'x6n6donlffbjf33pe5jq7pgma81wcd0bq6s24s2qi8gy7uydawc43jwpr9iuskz1ab1tpohetzx1updb6739dmn148o',
                authUrl: 'jraxe5p9rknkm0rvwsuvss0mqvwqr3h43pgiz249qd0a8kt0tdc9wywqu5woi6t9cfwjxyykmv094063cv1lxrqrmfaajhceusijkalsiuumg3rtlg6qxiqresbdpwwpl99k404au2yx5ihxx5eio9zhtyyhqk50n0w1eq2ziiwdkyavxhhxj9a999ag5wm7me15yh98g36t5mujy5507zsksisds8b8u2wbhnzj7vvlyevjwkhk7tfj492dtrbrt6nuv5zt0y7ha70s9tjonlpsfy5g2zjmzwg0lbyznrtu03cquj83wovd526q6zhalu8byo2dy5shnxga4hl8bf2up6ngcxzsxspgso99jj1adp1eyvylj17kvcn1x8if6b48f5wo54ct04qloagwllyp95qgah4fqobqvgmctmnw6pkkf0rhyeqivu2bfzlc3n9p635p2xyn3xys0lihwh2pp9dcehvul3rl1brjtayl1ct0innaln6n3ye95t11mq3yp779y4uc14jra759rb3m1owsrle5d2tyi4ftk7lftvdeevezk3k7qy34nvus66j50nbm47tbu7vk8p7918auflmv9be30da144a66mbmvx0bvpiy1k59flcblwiry646ieluuphre831s2so9xve2vsbaah90aqxd2yywm0ftoc6r14b0wp42f9n788ox1dbwsuk228orriywo1op3kfg93dh7tdijcqinhsgl7rmwwstgsxthh3gvm2aqafei6i1kc7osd4amhnwi5zgw2ueuvbmq136xbnl8ys3ugyjnikj9x5ydk55l7t31x8xw5tx1u6fdpcyj7xxpxznmxi3qjlms4x5af86r9ybxkncc1knsxqfxcr9bwpqx61ke6bvcoztevbo49pi11odahpkblms7mis3hhurlb0dlt9ml284z4kmxryl9bwevb1plojimybys6ezh9m59bsmleawozweafr5e0s19coq8fzmln7wejdmq1arp9ldqp4c2uzqyq969afviwmxtxhu9lg1mbzapvbu6yjdyqi4jysugj987325yyag1vyl9cpypyylpx0fwqwmvt7q8pxc3e8i84ybybu3w2sohss6qdefsvhf68tbldvkbzbzd1l4l2wbu3i5pv6ykeri78dd52po62zup01y7gyn3xblefrjreyv0j1t3cnw4wp7kx3k0m8ovd0v8px7wnad6mzffhag0uscy8d1oqrj98jejdf68mdkegzvq62crnfc7j84hqvyptdr8wkhs011nkjujma0pykhkvnkhet2jgbhd25c51s3b8zaa48363wsvj6d0aft78mt7remm44aw8lwaix054490ylbh67kqvgn8ovegyrhsfj2ckh8k9n9oes3u8jvwyhp90etedoblzi8xax715kwl1j3rtzldtdua55tghy71ifqwa65rhcaqx5yc6uor5kp0bwgj8bup69nezmlnw90eowec769kpyo291y18vf1pylbyg8cvrxbq9vcytsvrw5xuyf2hpoa1fy0sbec3igkuymfdvi3mdzsfsyyyssccndq1ypl4y6qdhhhmc7fzw06k6ahi9o11dlp1t0ib3at8tvodun6f7p39q7a341oewsf1po7sivgomr2qtoiqoyxpuab8dne5gr905fusxdme45umcnb9xwulbvka61rtnu39u5q7ouhhftdt9u8k0ematoel07onzb643a7ntri851sdm96icjvoujfdheeseczbwdoq1xbgg6nqhj9pqqetvdlgk8lf77f2syinv5c1bo4mbulvgntcb1iqplw1u5hh7d03pmg4ioqmf475hio69hec7ezpl59x4fuc8ifoujkmkd2lt5qkehfjl3mjmcyxng8ppa7ovuf384zvqmel7dzms25tnprmwpar1rvn015dr416ax7xqsaga5oye36r7vl5lxi1lsu3l861fbiydnuw2wtyh5quc5ggif36811swpr7yqosn7vadkiu1kgkenco35s0',
                redirect: 'c8692tfr2kus8gr3ca6zeyu4lbf54vm5dkejauri7hgbxfei35ev9v9jk1ei9dqyq3i08t8aw8cunnki6sn3g5e3da2m1nrwmglbfonmlg34gbo01xisfpgumaohdpapvx61byae9ypx03p0gwh7fskz76py8it4c2cf5uk17zfooavup68fvs2kf9w1fkgmce1he6uplnbo8iwfka5d2f8qp6cizmccxe0dsl1g56rhvqmadwrrycq7dorygcspinbw76me49kakfq2d5n9dpgwh2o1o6pbijyncdszueim3dubzclbu9gl57y9d8ptu69x447wksaqlms7okwyzw5xea0t7bv58am1q6kwmfub7372g4gzugpykhhergno4dyjabpztvpnyey6h50wkd09d3pagqfci7zzsxxtwpn6o3iw9nnv0ci1cgng2pm7w70karqnjlw33y0vb36jibq9eqxp2g98v5powhsc7hktwrlnvfcued57hxo7nppyfegojdnnlrje1wlcutgl5jky7muym5ra3741qe1xza1kznbbchgh9nqfw8s0x64wrkkg19c356p2629sedakqe9jsbxzzbiabj8xceg6myafbbidnfxr5jz77zkp2ekzekhm6cctr0lw739btoks9wmtmlvkr4y2rrubupmiq3afax9uljjudky09fhm5w2uajakasmde52hszvufbw7yyxaabyjh4rn2lbhb302sngcqn8erdv3zxczkxpiq38lvwlijxxa4w843p6lec9xkkan15673951wsybfzzxzvqlqr44c6ifjqzs3ayesgg5ne3d6ec6ixbkn8zh29ygvpsek5e6489bjamxbv43obdw9o6j59sr4abmmgxme4g9f4w2umshaikcpmfpv53te32ym0dajlucnv45po3nwnmny1vyirn6boa2arnirli2gb113goss7rjxd6a0d60safh2f6acs9l9s8hwwx0t5rzr3jiykcupnl17we17za1x5aik9i3fxx1cl7ohkw7fd1ser4hu656s8990tp7e1pka47nalp8by0z3y9abcjwzgjefdy5zmrkseyxogacwi1h2r9ghlz912b6yu0wtdkns9x94x1a1o83hg54m20yq1e08xhtw688he9t5uvpcwpmm0uz3bcmgsbzrrf1nb8o8lb7rfav1xbdommlt960pbeprn9r1qdlt0b1o68pfg17tac8ge55asq33qcmt9gn8gaej27loj46oj6ppd75d63ocxny2r4e912p19u8ic6odl6vy26swi34a2hje7ozltueywq55apjsuawx7big22wmkwropjzrikxtayxiarjr5kzzccvq9esbjts3jkm1ms85bfercfb02ymodna4gkd5beqo68growgt7xuwp9eqj6keoidqrle5df3ivr967rqkpqbn8jfze8f10gqzqebazk31ezbnvyunt2refh6qh1zxafx0ny11f1p1masj216n06hhhwgup5bwg4rpvzrxjvzewrgg2jdp9b4mrda2joutg608lpucij8jy87xbt7x8wzruxk1ga630k82gwpulomkvy7rsl9q4nwwnyw6zg6jwfwsiuh3z92a4ckwdo8ze03l7nkwuh9s2g1hfhk99adgmnhzq8vzir26asbmuad25jhp4j9tgs845v6uciznu173psx8qs1bvyhy2xek2ou8ej74v79sk4w2929h5q9ptea26q1kg1u401l3ubyb01veccu8zzlk5c6cz246nlyw084n1op561f392ffwuy810hl74twrdmckiz5aloave1812nbtdpzbenh0cqhkeeelcj87ortu5pq70yb6681tmq9rdmyxtsf9opp11mbqcn5z1b3bk6jngjq9djh4jzltvz28fijlgj96lnruin8xyi5xlwdhgbic1mnqimq2pmaf2l24v1nywx321r6rxxgf2po1o4mhhah5yi2ybnflxoo8emsrjc4glsn5ida6cwzxmbrkixp84u',
                expiredAccessToken: 8850659945,
                expiredRefreshToken: 1461293712,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'PASSWORD',
                name: 'mnhtkdd25l34souou7fe0j302bax2qt3ftzsei7rbpc7phklc6kc1c8id85dfcrbenggm84cuwnz305knydicp9ifcefqwkevesyzhsmhnl3gbknohxkk2bsp0mfym5lunj5iovxbrdkbdf4g1fn7noet9ugmcj7n65i19nlpjokbfxw5axajo1z4me2nq94bemjkuih7w3x8vm0gftpw2d3gtgs13e5p3ymydpj3gba5fpadcapndu88k25967',
                secret: '59f6rgtzk1whuj9phxxdrs6mnnltljww7ewmrf1mhoj3gfo8ly74ddu9vz9lhplbxhf6gm7nsxm5rkv6v2956fkp59',
                authUrl: 'cl1fr5ekemj9p0l3guu3guls6dn646a4zho7ri5rte7hvyyvy4xhifo7ogjjrgrjolcema34fzjds95qvbl1vn7nizxpikdiyy16e3b5zdw0am1l9qt02bi5th2ml2gwl0qu1r6c6jejshble0uyp8shgjqwf0bny2ek0rox0xphp340db3l8kymuhlllwi04m2opqnzwe6s5mg4264xwlrkirgeedfmg9mukzazol2l7gaiwe3xp5wgsvrwdergtiwqdmcjsajmg4caxlbu4oes736ygjnev1jmm80r0csg5xyvlyxxty5vjmyitbmojvhh2734g7c5zo4p33agab10mjlukg0tphmhwvsw7jg1y0xirrd78612yqik5yembk2x8rpa7gdm2xelmau4obgypwnpesigygldeqcf8l6a2wumjo72bqmzmdqyccw87itqbmwb2qomtq691b6b7c2y63dr3ly1czbhf8f04bjh7z195hyiwra3y38cuvdk2towtc9ogaw5vfq56sq3ekefnd7mfir9yohspjinwe21jhkosadip1mjjar9yppptu9ecvndvvtl3mzkov6v1j1dxbmotc1zf1xr5vdbn90qgcxfyjn1lviy9ul1icuhhfak6ovu1qhuvhfe07cflbtqcsz299zxr5ku10aqxoc2itur88tibe1ppwto0auwxmvogoz5vv5tf92rln6runuljl7pmbzgoi1fnhgtcwcxiqs5qhr72orjrjy8t1mj6ggwokvyf0f63hu0et82zfdnwilp667ksmca5voy4xy0kno6sishb6j2vrwsj24eqi0m1843mb5zhdaif6jbwfuza5hykjpe85ei1cquffy31fe0deysbunm0j1u29j0im5gqqk1mxtt2q25jmga57fmx8a18wh28mgfv1xv9jfavqoxyyxe23b6wvl0dlfzxuq300h42vtb6fyvyra0owvl6l6y2x7fmxgz3e9gxaah99hg3i3uo54ndcr5m1mp73j2lnfhptkwblclz65dpixm48z1yiv7crlr1gbcegirk6qn6ik0yv7ua89sl5aszhix60rebenfnx8q8q5cex9f0wbhhm6n8kde4735tifs008x1s88xq9kjtawyw1ol5ojl3i5mhzw7yh1cgb4u0hgygbr855vaetvunijzq62vpvoy63trl5ivoss4kau8tuaka0l03yy1lefd6y5wdnltmymhv2p9g11ti3lq1chfrx1dgzra2eos40u2elj2s3haum10i1ooamvvthbnn0rqhj20awmvjjiov1sknq2skhd4kgbbw6pp6czp4mkrlm0ceop3el2wh737wxrw6qwnszcwnz5y6yz8qnajpwoo4w0qpfj40copbv3dsbm9nszepcq0dqub6y56o6sbu02015osxhj09ywiau7am597aazdwajmn24mq6gah76hejt9c8rbfgs0e1se5fgnlr9t74xt4iuo24j6zrmck3y4tyr2k7p8dj2sw7upvz6uk4n6ine30tm6dgvl8i4i8go7m6gslbqvvey80suigbpj6ji38g2o5mhcqywwu7xvot5tkm9chttqfd5ouaummr5687iudsqw1bhlmuwmldovn5t1oomecyvnpz6sogdog9lhbmqu71iml95y0inz8sq5u9m09hnjpb7x13trkp90e3zu949mm7e70o5jc15j7fyigej8yoibskngb09mjs6ulfhhqhow3e9ryxozx0xr8txv0crkxdt5p12bs81enl852rd2evb9vwz4sc4fpi1ou4comj7zed9g4zfj43agc8m4s1nzrdo1dvpzrjsvgzycygqu32hogu9gcmq7h97je1hu0ysg3x8stvyjhk856lyq6uav3akjoc3xc027tugrzzwv26stw8qrf0rf1sxetg6dr9zugpt39jcz65lmklxcotm9aeygr921p0pzj9372yat8ejenih36g3iqe8ufegutmkfb16ummfttocvl506jaxvr7zka68g6qrm',
                redirect: 'f6oz689garce4864j04j3ey8ioo0c5uov7712z0mba13v1y9ofq092hp4scdrw9tnwcfqc0ow7s6fcgqmqwhmp1vujotztnf96u8vd0ul8skeotlceu2j6r9s6opqfqoscb16zw3u2ilf3byhpybaaykk63mm2pz7r9q0ykdthrjf3l52gs5s792grs0k2b170vfw1iheav1aytw3kna3bxnb33e8jwvln4y1893bim2ba5yglb1x8ej7uvx1j3eclx7vmxcn17p45shozjenv2ztzyp82l1fjrqhbe9xxmnq8ns0ttxqdd29trdgseayjjacr3hn8l1271sjigrulaf5yaa6ngtzqd2r9opozvm035tgqr8fu8s4o0h0p522f2u4vrq6xu14aaaih79br1eu8xciwkll0prxvei2l2a6o9s2w027fy28vytw46wubmsa8aip5cjn43duxzi2kisjdnr82ebj06rgb0vxk2vj32qpvm1yw8mvg48ijw5i80nq7eehh4uowjq70oz97ru5nj7jqrxwm9nxg9vt802u6bkzxa0e041iv5o56lzzg9lpxfq5qtlzctz90bmhrnqk3qjm6yh7f4sns6i5jbx9uuud7z7chmsnsjph4lm8xtq83voqbcnjyk5uyr83ds0cc49q0yf6wttxxygnlc92h6ve7h7nyc8ornv9ik4zv32co0n51kzhmyuarkst1xnbg26hevkxc9isrk1vobal2i65ne6d9axt237gzo8l8tnkce3acykuwozbm6nfekw2y486353gjaezvo4q1xs2bpw6clrrdpok41s3lsxplb1a94ksgxd5qd6wch9r35ro9p5e3f1vkpzzxbhvfslcm9sig1ospo1mr2qhx3yneihbwkzjqq8cxc0oxi2acown2kjju8vwnonoh6fapv1pnb5hlncvu7mehej98tdsc1uz6b6ielt4t8y4c6wukripysec3p4ckddje56u7jqbvo5vx8j5o07pfbjzb4azw1wngjb0ebi0e2semg25qnw0vhc645y62jbnuw60lsmufrbxyl2ildk315mczwq4rf9vjuct7l3103zdtf3t2x8c9d2bcf6z62cuu4yaf88bjmuhsm980n4weufpwptjhr1j0pzynta92urmurozxtr3ec6ogudps1j3uyaybo5fm1yczkr72n0ozyc965uwgkgvr1y8if9zfvh49u6x8xarpg5jt3uyfd6t95uz16zjfh9ojsi268d13bp27pz8s7ukpm39c7riwlmb80jo07mwoieqa07p11pdh6i84akjrm65w9spe9w2zd8eiqfbau3epp6banuaa63m5wihf8d00mxocjgv8ptpfut1e3h1ptebz4m8aqcb3sxn01ho5y9u02hxf4sci6gr4v1hzs8ng2e7j6qv6bz3c6kbesmuzt4do0jr28zsuh5copoeetqwat7js8pp0o2btj6tlfy7b9jnwj63hclt1bnxo5xg6qucul6xyhxs8ud3mkvw1lpac07mft9zmeqzrovx7guyaabeuvnq4z1ibtp88t62bxfv9unsea6d3z474bvxje5usjry465k7en6vfokaqkgtlro8hql0kw7je54mfivxfuoklv5iw5uangvnecs7asjbo08jbz4eco8q6fl4c81ixh939qaqle88vafjhbnumvch8kctx3p2q3y4flxonn5cky99wi2zfv3t4lbgqu7qybz165qpkue9a53nydxwqj184k8dc4exwanszyr6rv5mhoh9s29rjfhpcikl9tead3cz9lw2yoch2kgpdshe933y0gajintfcoqrza9rf47mhsf89oslfxydaerowoid50qwm3bmf7wi8ewpdgu5xjcg9qkeyot0k0s8bxzceht8y74i4geaese9aluiy06dn7zg3pxqdeop1vt44kw7f5w23ncbjrsgsea6hvmcgt5ozfvc571kzuw40yaj76tbzt9pujfcr9mq4ysmm05d75pz6b8dxl2d4c1x3t',
                expiredAccessToken: 9207038821,
                expiredRefreshToken: 5712296835,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: '51q2z7jntp4ss6cmiykccjc4p7sxqroaq1xdjgo79yn27d86ouxlqcutg8hxdk4ke5slyzgiuolo83fi8636xfu5l3pbed0x9t2i9zru8ot46r7oggz9ofckjsjtpbfd9rotg92eh67hnmuj0vr6plalubtyyrshx65sdtidqzixy1dmppwz4u3rjqfze4n4ylh0iipu2ov7d222e57qja1i75o0beetzfg6m3b8ux1sgvrxxputvf8bpxtfqct',
                secret: 'xtbjbc4k1rsry8z3cf51lb89ov8u02vrve2a3iyfip0o9mkcltfvv4wifwo6qagz2savq1qyhqvi9i60rlgnk60c8q',
                authUrl: 'gx95m8vy5zjie4f1o36tti298ev20hamuuzi83cssmrpvy14snsk38vphqr2oelx9eas8hvscrxive39nf3e3rq0pjtp0psqj2whxnc6k8cfa3irgai00mkkx5xowcrwezixs2yze9x12927b54j24o74tg7aifal6bsi6e74fqpqvy2yz15548judstk9wufrpyg3cnbid9klryszvk6m14eci0p98sw1bsg8mg1e8idlx68vq7nozsc8r74vtucme8yjdkcwtcrd0bb4tag5cq5qg6bun1n4sn8z2xsp41u34ilbhhy4qz6t6eufoqb35icq4zisqdlmz03du2a248nni2v4inqueehtk6qxcgz77eg2l80ndyg1cfawbx79vtg3tcvfa5mh0dzbdh27fo0choa8hyvotyziv0ssnbcmw7iyhxg3bcpjicznjvk702d297ut4cxwor9e4bx5xy76pfunaw6n05ga8af24042xueaaql5mjyfuysl3q9d8xfbd4ymqlwz38sfugdykgp17zzse49df6mogq2vpgoqa5qvl2usqqvx2ghsyz7ltlqo4selmswyb5qdofzr0gmptexuo3eddt02vfxa953k2hwf59shzvf7qybxyheb5m1oov3qxou2aiu37ann647924rdk3jaeoh86et6oy97w01flnts10xt90nowgkhv7qvzkfmbgldr3s8hg90jcyku8fvtpghswaz11irqzan1uqvhvo1wg6tgu1fuyzz170b6ieqqpqap7eakqa7rxtyw85yqcjauqg84s3tbes1iphwcpmmk94bsbnr0ygvcukvkqjjz7zvxggtafk7rbnsvtdeddb79b6z8qu934sla70v5w6ih0fnxqwbx2yap93lio7blzbmqbru48p6kqb469ec74tt9qtj4qkfd8y11nc0eg10q06yl50xo69h7kz8r7maqjdz8h0r3szftvk7l95nhwaokstc9bfx9u987e02vgkoypxv2ua9pujzv8ykgcgxhdmx19e4oc03d13bmome54p8m6pw4kc6knyi8xixeiptppc9buo8c3iigtq8d2jicwq7g8ozfhjgoc36fd6y1wsvuq084yt92p1xrca6yy49vuncro5e52frlu063ldro2aqx8ddov95iozqtax7p57of0frk73y5im05xqyxl2x4wqk06bj9tseoa8j9ttk2fu79j7pn5qws7inthehf6ws3d2k7oxj8tj00tkgsxzthjysaghsrygubg2y1d0lwg5yjsj8cvyqw8t7oi0sbrbe21pz6h0bajsu5ss6guvtn4ijqk9x6hljmmmi2imaxchdihtgwmdmzwlw10sjvp4kno9p8x7s2xvw2qaq3u73w5afxanbuxvhb2tmwawagx989sj7ybnnh85p8gqpjwpwd12yfqmk7wzg0cr5tdix6sloqlnnebcoh8anynnx7b6907a2xvf9jz74klinjydevtf9s3eha105rxz4zckg56x5m2yvez1q4cp90scddfskkw6fu3dql0c7q2x1py2qm5buwc7gppeba1jzwkyhxl73b159uyldun9uarijjoaxi0r6klu1r4vswk3zrrjjaejt9ox86naq289lhszrwa6iaq7zffqq7ny44ace3qzzb24g5fy2gj6jt9f0fhnq8uhi4208dfdsp4jb010kfkrjn7k37ws87lwjhaq4c5k9bka7geurh1eoeskcrlyzmdb6525zfyvpv7dgt6uss23hnfigyou5vv47iazpml2drkt5meiewt9tlzddirwoa43gyv85y03cxpdyhbe6o1df7hfmf4cqzhjd2xj3f3nsq8otngrbp2ex1n777ga8sennb0enl35e8m5q2uekbjhud6skxw2yld85rfi3uyve9dwzwpwqyvj2x0xlshg8djx49vqbhwxwv8zonths9nt9odu7pb2i50ji4v9d6pgd6x6f1vo9tj1pn6qiyluhk3711xeqstob1d01vhynmedusotuf5',
                redirect: '67uk9kmiuv1b3u8judpwckyn9yj2y6fix28hls6sf35fa33nggmcm5qcjjsfiu73jhqoqqk4d43nex0b6d8bc5wqf4hi6l9n9gv6rkouqwj162pl3ade2svsrbuk5ll6feka5yjtcnr0bgccug5afyqhro2l0jj6j1by0ufg9pfz196lvd64ki239jgud1ez6hw6yj5jo0zunuo0qheaa03qfv33q2fq5lrucfw6esgm7rcy3ri1gjcmhfy6xbx0xbwtxf9219fws1rob0rh68zitqleed67ylweo62hb4xl9q6lrr4f4unqwzgpim2i7tbhrbqasho0upganddrg0w0w8flevmemvjfx2c33rmtz5fu65ttct5nqrysfmuop137aw37gsiqi93tzqbo0pys3aofeon98u4h64qftldprvfajlqw0csua2mlhdop5vw3g0842z58nu8w28uxsdp9yoc71bcljzezipm5c09wz23ygrcfn5msdw270se2g9l9jjm3ei5xixlbog70rtb4o1kkqzki3kodyujdv7f1vjixdqel7cn3nbfm817h34dpt9xc7l3uizlyi2wtixe7m0s43ax6zfzalkvmy0pbn06hdrlzjod2pnqwxvexoeoxqmgbw00uiobasfi9vf48rwo45s633lc963nf1b61u69tntq8dr0k53y4em0jyzph2uienjwtnk2t7ocz2hguz4poec29ewidb8can55qr5d6qeh58xnr72madg1tjfab1prfvvmu7yd9sgd0ev43mzjzd9epsbk27e01qg65fm40unsm5pogdcrk0w7j5sctksccwett6bddhswwzrtst3zgiygpwhetlicfndqbj4ticb77oi6jpkcxqv5dgc11ytq6dlgvvyiffsg1u1nmna1qjty8hlhiojl4g4ttn0xpi4a3rambusi4ezxjamz82lhzlgpx8pcq1kde330ssvar69062ujhs32oswdmplrhaoml2vp1x4cfghley60e6h8usawq476wg40wugpxuya586l8g7e5w882xslzgxfrl3ndpe5w879yto0q063hhubdd7vsz6l8hbgd2fyf6l9v83x8bqthj2awphdqn1cm9dc3c0tn7r6urwfhxefcuela0oyk3hip0d8pldv1ewrue55oxdhmi6oi3fk26labeysl1misr6jg9qm2g4gmjo4g5ocszlxu3gfaxnhpo4cnpzkuigaf2krlwyda8yo9ldn67jg4oqjdfvitg71zxvnvxlbi22ge1vw1fjls414ho1kqjvvarxzd4xf3e6vzxz3eme46k7rj6lixx96d3lliv92swxvqsk2kx7wp59ufbeealoijmjjhafgn4pmyd3y75lyue3g47hl8q6i9om5ql83nm1bigscvq8k0auam321vwp294j2tf95d6hnlevqvureqgf0dtl84cpynphoh3qiruo16qpiey83cmrcgp7ahgrbqbils3jmor1zc8fqo0zgyhckv5d6ds7lms871uqrqp6ifhj6m9k9xkbu90plh2g6zlzzqt6lp1bf5hlfayv3cqh1jm3z3fqe4pdakqhww0ay33vay2fvche64wmlhdlvu9qzte9x7sudlidl9sogpuypxw3qqyynt8ht8z5vsakbe4ubuq1ce7292asxvewyafhqbipkidut5f3vls3hefxl7ce6jqt7x703crub63vhbolktzrowd26t8on8lmc0da6mlp7wbx6xd0d0l3dx1x6j6eav8qgs2vzqu7j8shw0ym7tpyas3x8jhemhly38qg54hjq20zgbvlwps47toeyjukk2b5ynzo65dbzc7lk23up2xqmi7u42kqnglg9fq3qbix15h54q8o89meuq8qufbpdhoc3womeloayqz2cmea8z1rhzcrhzdf4cw9n2sbp0dacmz3kuuhd1951sbfo5dqrub7eh6i9e1u13mnz402gkbmp7sg5un3cxjnojupdsle262yethjav9b14qqsl35gqp',
                expiredAccessToken: 6162094143,
                expiredRefreshToken: 6183529638,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2bqw01c8zdq1glr6aw7h60ltuqo9wuo5kolg83ywnunj9qw2y9pe822ngudncfqvktbdp9ol2x8sgufdzd0a9mm9rpve08dy4wci4808umwcns7c9za1ttqvuozp8le9055utospgzh7dpcg8oq0bphm1mljnaiqmn9x6peuzkypsrfita4ryme1utax5e5d50weezuerk9fs6yh8b3zm70rm7nr68wluw3jpmpz5vz66ujn9xnebqfvly01x4w',
                secret: '3k3zqkpjiwp3xtf8l1p0ttk1hu4e2n9o1zl8vgddcbmc26ildrng7lp4a5u58bwzzhw4jdq12gjbu46ws4tm8u2myo',
                authUrl: '81o86anpy284lrurrw5h0ygd83gps8q4gl8kgufx21mymdvjluinj837kzjdx3rfcit48idtk4igtbzw947geq1dox35k12t3an2i9dqqzagvg9equb7dm5ksncwsgbxfxvycjjk330rwxgchuu6d580axp1z9tfss9wnpnnr3avxcrxis7xqmt1e6dasqtngb4h86b06iz50xz92hv56vnxigk7hb3ihpllw8ymwmjc7avz9mkh8nx45otcfycc5vbx28bd4kphzfbfx2d5jcgqqctnxoxukiewrk1my5kdfih3yezv2jz1rcbotyeoiportptkd9hnakxnqo8y3gei05jtd9s2zrcmtl04caa6ho83ag1etibym53hhi1fqtmhcqjbtf79pvgdiqye9zh8niiqlcd0vt71nvsmr7v4ufu8m7buos7e1un6mugj9t7vb3o9gzopps64ct2gxaonog3f7wa5o2sdjrqyo5gzu1a441yuxdw500o9ru7xkhoqrhji6rxks8pa7k4s85sxqaxatdkaklyg98on5i96ke6ixivx3lnjz3x9kzf7ogtogpn59hs8ui92m6sl1b5priqwzlv7ryq3m8tq1a2t9u91x4kjv2qi6sxuijxdh2ca5w2dbc3kz5hgxt5rxx1bgxx0eriwoccnulzqalsu6eds3w91in3lmjgxs8qgztpn9f613gdkgty8femi2fmgwfqox3vdg9viw9nwx4l6l33kltypstai45fzmevlxvjcxvq2tjdstkqj73l72lp3fuwd784zdmnnkuyo4lhwuvxiade5nz3lid34bt09pcr5mocrtxj70ekjtqe537cjj6209sjtt0ehacwz1exdugq8zr286pf78rscyzrcav99sklm1hv3zygdjy1egopzwoanu8j2clg20asjqwru9u6az7sluv4tk41wdktbvwsx5bdaw3v9r1ee8bba9fcz5s0zzpwvra4msf03onw08ffq2a3xdh512grq5qn59sgbkbdr5mox844coqpgoa0ilr054yjn8xokjzyyk7kpbl18qnxfqthjt7cixn3j32hfc03r6hc2bohjnohfgw34zizfegz6saxxe21onbjuvo6jbbxxrfyydk9dhwkf7dud6662p659hid5rndepvk4xtph1sesej3jem4etdf8rz2kzbp3z75x5gop5x91gwu7yuz1810ikdc9spkvdowsig3ihj9zngqtqryt1apqelft1f2didudfqu59lbcj0mg4hc43o6uavmjtwde8t756kl5xscx0qaaq6s92ycc7v9318sq3ui3w7j9xjutu3522v6k9xh8y7k1f2w234xygga6kepz8g8e0y66fcfsqrs6fqebmy8y3bwed6bb2jrh9lerey8mkth1aaguvc3fnpkflphgdzlp862mpm9hv5k2gzymhlnuqqcyyrq3sjgjzdiyg236owbydnrykia47v5qj4sp3f6fnl26o0ji57ikn25dx04s1ru0r9wyd18cwjho3wvso4dbb5m8vlvw7du2yw3qj41jpb0tcbvoonwebbez4v35ky16qf9gn9uh6om42mbmn9ymqqn2kbcdeqz2qrk8mhhk071k6wzpvv5qyr0q3ppvl48o3l8pqdie8sppvnh52lgykohgq9hae5amlac5vi7qez535cuvsiwm2ascsi6z26t3ix8uw91cgtf3viumugr85p2pv06h10gklef2lrux4nk3h9vq9ojb4hcq5htcjq1d3fawddq1ytj3quuhqmk1lkns7s0np605d878v7lpgaejp0kiiah9d1jdib5ckfqzofw5jwuctpeg0rpdb2hfrqg4hql17vgqsame95s8h6f09gd51bnvpfg08y5610nck3o65kka6audott9knko7wyusiimgnpa5kkt6qdwwp99m8zq6bdz5qp9dylpqqftg3wsqqmu1jqeuim9ene4gdl6kvg5vtc9m5tzp6wwc71sv01nfrbq8ciz9rh0ooulo3a2',
                redirect: 'ber6nibjpe19wnd8d87yunc7cut0ahdlcxp9jdpevodjs9h9fcwwoovgx8gltk4rxm5x9ktpzkpcgy83t3lklsctcrg3csag8xgjymtg17jvs7t369jnxct5me4j6wwk290ysv42xqhxavb9jvxb5kap6cd5091520bnxf0iiwuuivdndoj3uqwfrhhxncjnt6aasnar51v60w5ts6vrg8szbeh8cx7hm92p07xu6ssjquiz96029s3ci22gu49nk75hsre5norpannfdfx0kt65t9f5tm554g3cgf0ys44lbq9iqws0vp305jmgrjf4762r50h7fs85lgq3gl3jmqrqn6are9p5k7521egbt7r1vvxtgjremf2tsaf82j1e2yqtu1wpipeumrqq3rnm5ibbw89p3kpx4x4esi4v54xwtbbnao2e21nyyxweqzqvtux7cqpp6fusdu95tssnorji2xjzpjqmqtp237prwjcx2egkho5ez37boyzrm7tjfdyqamgfd8tiot4vp15xj3e1c00ojc9ms94y8jbjhrp9lz2xsx52wab7p9astbjk682vkwyep49vxsk9oc4c5hxpmeazyxzrh6hrqlau0pz32q6f7d6j5bqlwe7frs24mv6kv5i0susodin8coyd4if1c9utgp0kchmghe42vudednmgezodmeix5d0lvgsm3bl4hq8o3iox3jm1zz71412u35wqs8vsteozo5cqtxrufvw0h8kn3dpiqzb0y7300y7qd7ghuoyl8zyjzi3zb6nz5clakd5c1h26xv6av2on59g13hdv9hqgw5y6w7h6xp6bblijyxla3ysaszcte094s1c9xyjs4mg9q1qm70gn5dsf0c327xmtwi1v8zel7a4o625is6822bc22j73s7mhp9io8dorsujhtgrl5ts0uhi741wv075b9ns0vc7v61b798i59v5n3x7k719xo47l0qs68wpwoxl324p3llra2vl4or3xk5dkz3wfjvi2vduj3fdf44k65xytc7l72o13o4ioxcqk0f27te02n9cjcdk1msrv8qks656aml3hhams606mg6954tnp133c23gnl1gwd22tug9q7991cwf7expos3d9uqdh1e5gp6wshceb807o5wd4fc6dqhwyt7ewia7xw0a7h667b23hoivkq2fw28mwiy78bqgmn4ujs4pvf62y8ax8yin0owy1j4s1q3fh5j9idqx8wm2l280hp2q7wl5a8q3h9t69k8ulldmv7x9k80zbrmbcb7wd6y48au08lu9916szm8zm3e97yp7u7uctx3c8nzhvrlov37l0hpmked0zc9kjmxfhpx6y0l70q6y8bmypo3iva8lad65wfnd0j20p61wo5fi9wtdcnrjjgypdigoru9zb9ca00o7kumkhj15fibm7rzuq7q0nacoo9d9kog82f75ga1umwedpo2q8bo3x0dlslgx7wzksqq1nfxirzy6dzbkezv22tsfil2v7sfy03ly6v2d1mkortv1q78vzork4q0hh9ts483eyucwo4lkpbokfcxgl2j2jdfvvl51hnl0cvhc4dw05wilrxq4bn4jl0h9rshybdmjc67y4nca6da9g1ckldu9ugexk1e27u9ivx4ar14cm662fsamjballhakhh5shm932vpjkpbqudt3tmg4tjcuqjgdyo2lndrd88c0rz7e31gfdb8gfi394xajfjn5t3qbhv37j0p44xxm34lyfq3bjyxsif6uzg8pcjmck8xrcv63d36jxppw26icujazp5nz4bedogqlf26iape1tpss7s9mnkghpxfj7h4juw1u6lusut7fzlwmnph6yeks42fixi21hpn6mcz65lwcvlfk12fa0scpa6q8fwcul3ghccfdq3mn064gliqht7rvs2xd7zefolzktv1hido50ekxumiiahyyym5fkjqbaewo3toauvlka4c194h91lm63fcmrnpqkb71um5235rdf8y0b07jifmd8nl1j',
                expiredAccessToken: 79754641409,
                expiredRefreshToken: 8766820708,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'PASSWORD',
                name: '70ix2z774ppgj48jocih02v75wphgj1p00kajuauuzew9pyrrfcx3cmvqr6zii1kx6louhuq3f4bi6bm4pp5kkppjdjz3ckypbhar6ookoajc2l889fzci7e3gzli6w0nywzf3zg5qo4h32vvno4fznd7mzrnoi4yd8r8e1h1yl0btk3bg0puwvo5223f3xeuqyzd7twx2e3w3v9zmj3080vcakjpsracq1a0p1tb5u5hkwl0rjmi16v01axf6a',
                secret: 'opyvfcukd26904egdev29oarhs4wsqpmcwaw339f5emoeudsy97x8dmg7lpnjufc7ecfndq0f6luj0o36ac5kzonux',
                authUrl: 'o3xo9cny3ufv1v3i5r216fo33mng6sw4s7h5hkkdw7m7vg973wheqnkpo6e1cfx5g75n45646k3zto5skv1ifmkquu0pccnell0ls4wskoc2bht5o28ov17oj2qg1pqmox6ppzqerigy7y19lmd4wdb8nixeycyysc5aurfjfk3nlsvilyk27gvkxiod3beflije8ynowie7z7tkl0v6vb742i8s11nmuqv3ovytjrl7z8y01wymji4b84ndrs9hrwfg7p0v8xsfin51pjnkns7zerwnbkl7gt1tm5a4k70ykoey9lyxinbhdo4di3vdqzw1y1bsszyvz7ej1aqa96usrcb1vqe85u9lc3g0qciuw3e7uva4zmkarnz1c6rmuix8g44ppcoc1irfzeih88gwck2fv46mnyxyycwtxkdfkuidd89ybc8r13if1c8rxvxy8zb1ke576zw91y10jxgm27wevxw9a4s85f0amv97grs954ylmjr1qneu6vnf64af9z641g8xew8o2btje4lfnc7inzoiwhaq2t2tex6wn55sdvz2j4brbagt5tc2lvwslkarxzsnnhktru6w2gq2p4xn9z3pptm9rg2aj4dgcqs9sj1wk7giu22qw041h4u59126cihplmzuyty8g2vt9jrz580w2na3n5dymuwhg0ficfdsotrcldr4ntpike242so8sdrujb81lcatr46poyjx2pecjsue06iork4sfz9oqm22vknur1jb7kfjp4sv7pxc62idgetbvl6cvehv5bjv2p7nwyz8z6wre5olhl3rm8zpxpq2br05al4p8nww8fwe7utye5o9nz9ov4y8qt8r2bay7rbrab99jrznez3wn6d1bfdvnod3537e185j2vmxs99qm7euh2hs3xu57yzs00z843futtvr7erajyloeljzu4o294u66s5f78i9yx2xijq8p0qtb5mbka21hfl8ekd4oc04l0dajybg4aum7ziv3ky69lb9nqrer3s6el38pl98oazi2jeanjqx86zkxilfgj2dt1d39ra7v37hb0iy84ihr1xf1pdyy4z5eu2st46pzrhwyg9hol6it60ugle72klk7pt0mfaetrnj6j021e9sqcxvdg6hxiz1d5ton7issdj1np7bbu0bgclbs3d05r1m9tfryyb971ccnmhfvnozs43p5jiffl4z5841cf4d25zfyykqdeipptck0jx2g88epued16da301icgwznn027dj8j090rodgz5exxkw6tnenyhucr4fjf1650vqjp25s2x3lgtng2l5wqk6prbjos0zswzjmu7gepj2mz2gefitm5o7tyjs8sg47shli2dvyk8aq680p0xsd7yfx72p2w0zlag4qeo0lf9a84jucj80oon6b1hcifkybw6ho39dq0vzouebv9b2icsqw8z1echbzjfcj9j6vxt9vxltmf2gpe1ub2nbh2p0xbztibbgdg8hu1iz49mbku9ut8lfwcclcxnv1dn5bflw04u4cyg2irkpflcwtu4r3k5zetkixu529yvgmm86e598dmikey9r7z9xka27xt1o7j2dnss6cdvk2906txl1j3k60jgjx44ylc15zlbvmjkfthd45dn9m3sj2a9vpcyzmv22thecxi58ci24qm13dd5dy1y1xdbnn6ww1cl7ilct404i7m2o0a9a1oc2w9qicomfi1xdr9osjscsrmspzpkxsqhljz9pis9x9myxdl7rn6yl0r1fkg15bwep8mlggcas4pftci2y1v3iajsb57nruk3olz8vgztfv20b7ilj5ny996nwrxslgwdm438bahg14snn93eiffmtijf3f5fjcw06ktsw2zvs87za0ll1j6l7o29htx1cgaurtlz0q8reatztd918v8f4hr53xpw9z18mwsxzx5wkhc57gvamb9fm1qvdvq0wih1j8ziilucumkwy7axoxdxchvb2rqnqw0bx7svyu0f8t05u3lxqm0c9ovl09cocc',
                redirect: '1u17i3f1vnq5xx3f25bm3wmqsi9o4i65hxhm4hgvgbq8vpqqxlh263kl46fed4431jhaiuycdpq5pjjwa12m5q2p4y5up2hnhoxy2it6uwqwnear8fcugltk2vx38glk9wy6ie44a07gbpyyag0or579pqqq0aac1qlwyqa4xwxievhaqdjt4218bsqr1irq3wtwdjvv8znqmqkwvep2oxhz6n67iv89kuncpf7kw5fcj8qvxqbgot8j0nsf23crbz6d769rnt4u80b89k2pf0k0krc0ywni6z005p78zzm0amtxhbernz7hi1wuguntmw38xd4vp0v5twtg2h4d7atemxo4d1xk89ywwx4w30buia7bzj3j6ity143bg5rmmv1e4yf67zqyghhj1e128k2bnpqyq859ugi79z60nqh3793uloy8g493us47g2om2wkb1jof0dj69aj4ldc27sbh20cjzmyqbzsf64dyky737vbqq9dnrqnqsw388a10yf8573l6igbpkpkkc3ouq8i8f8nua1v61187ji7cj5fmkxl6g408oxy5po343hf2vre1o8hzonksqr1u9nej6x7ade1znxp5n40c4kpnh1g47sxhslf5mc676ezrqa1qwqv77znjoqewytarqlbhde1bvltdaztuwh6ycc8nchja8qb1hhzoe4vuqttyxwjiqoe5ehuaqj0zz8i56l6h5xiq5daefwo7nvzc5yw8vhe299ku9w6nnyxlv6vlj9r9tvf9t2vbf65ahlp33b6aubzdo8gp92hb0q26tg68l894oprxnkvpf0b90vu45i22z1jxqnfd437dizafuetdec2338xwfpr4yuxcvaphf7cdh87cjlkzxs2mb6ubnl26gqe5kw6eqpoq5hveboid1xlje6pg7r1pacjur5s8rpzn2gyfzsqovjdk2l3p4oq8po4xo1xdyzjlf4ppktfluaom9bdiqaw8b576ry1nqls0e1janubmn7lbs9dpcocz4epfbbe1kjtedg4hki7jtgz1h8t3fzsy6mx9o355hufd0dnnf078x0noqbz7kre5vc2wz7vnfzvjdiglkxa6gufc06hyz75e5a76syle762c6opx5ge6yltpz52zflieph4x9hlt86rv5i3eqoyvvws8q7c9w36gy327xagmhu82suy2wmk7ea9aa4f3bh3jr2lyv5lskfmtzoz6rt8d0cyu4c6m9qxipc8nnbd2vvqeig5rc6xhenppk5ytev15a6kdujsyyhpjx8mlki0zwpyfe9n4ahkhijzpj1fifnzjrlf9myzmzugnw2zgwmenz7286epq1gxpxpyl7bs0v8kbiuzwxbgbnf7f2p616rb5vteuczcppwcm8mxty96o0vaqdlqxuj2g0j1syj79fq1kpya4wh9ha48xmly0e1bmzeguo0p6p8jeutnbvoe6p6g6s5muga4vf3sfxz6fzzjwwv76lkqe6idrnw99jutk2j58djeyicsa2yqqif7pkgrx2cxnd3uorr8jk5y8pbq3442tdf02otkc6ihuw5gyocdid92v04nxei7ojsp029fgbi38nyp15xmekpbl3aucmsihwnvhmddru2co79j89exef1ynecu1thvhl6zyzd23wzos2h4t2k0lpuks4kxfq0a40dgb6ctkjc82y9ubz4fyrqmmmaz7uzorzt4ifbbd7tv8s01n15vhllqbu1gm1loi1fgtdr2en5gek0i52ih9ea6qkxh2c5ehlaz1o3ity0hgd8w7ar81ed98ym7f5fw2q4vv06s6gvpsbdouyo0hbtht40az7xpa15zojitwszz1vscw8kn2h2x0at8wpblt08tpog4e03tcznshucbaj75s0pj0blxwcn5sujqctkt9oya631nexb6431v055wk5l4temmctlb4yg97t1jf4mbzrazmautzkmy44dwzzzze77f4skb97hckov61390n75t6cuj3ofgktg7zdpdfa8w1e55mu39j840y',
                expiredAccessToken: 1121762296,
                expiredRefreshToken: 78562780321,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: 'kdxot8ghfepec3dtwt1wj36qmc9jpbou97poaixykcivh0buhf9kxw0bw66bo5pb518mbqti77roqckbvf7hziupwhe0dhykyhbqmnex6mqjtcxp3b1bmo8ara1rz0wn7dwkn58wu4c15992469o540mu4punpfazb8erkwoqmv2dyqmkfe9li5ub2fmo2jmq3yo4g3id1g6tllye88kluh40p22tvgyep71y64j7gaf6xae7lgivxssa2081x1',
                secret: '6uvtyses1q25p5sp2ugx0zxmt0nildaywqv6aucj8ist6lp95e0iwkf4v1ix3ylqlq16yuwtblka3ve2dgn0niw2d6',
                authUrl: '3r8laxtewv1bcbrtjqkm7f5bvswyy0l7mis3795iitlyb7qbleskxgyije3k04o8zxfccnxzi3dzgwpxj7p8byhxayfclolfjputq54kfw4yg3j8mgt700d3gwo0pvpnsr9y302tjhfgl7mhgdxz98nruxlizouk5k0gjbe8px1lm7oxntk6nzij5kpatzv4n2rgow6hamqhb647puah6pfnf7jnwdrs0h9z8l5khytzehtccgpjsp3qps78qu37gjpaymd4cnjqfc9whgmeinuwalnr0aq1caxuu97mudixn5hrl2vghvmd07flekkfafnmfqexbpabg2ogjtenmm1hgif8p52cr4ru3lgxs1o7592ytn2w4ukdemoa57m61gao211xc60lfi5xlx5f51hsyp28u9kbx6ejwi6j1skaazo2d1bhxrigtptywyhgud5s3kjr7z1kb4sz0zqlfdewts092t5qepdoyz3xu1anaqiv7ztsb9075ly1d8rauvl9ue8hc53a7a1b4sfkfkbjsj5wl0zkp3zpu8lpz2j4tey0dy0b8ynifm3i12iynaak2zw9mju0g24hnt5qo2q1xzcrey92ki4pmg67lknkwf0kgcmtvdbbkzehwm2heeyf4i2kdgd95ouhdcdxxbu2vovku851qvyd4gavljxz0q9rr4rc8x9byh5l294h3o9f9wlqdivqyahgdunmq21ri20unmj06voffwc05q7esketr3zava8vc29naxqbjqusl4hbq82nm566413bxdrv1xvgj2n3il24j8576ri12t4avh0b8ehr85t6pzkwjx4wlh5ucgf6zuc3ri6fes9egtyg59axqhpl1ohucdeshr64hhqg9x2lv2akh384tbqukkpavh5a8a9w5wrsykjaqytom5w9q54pngenn61ge408h8vulmk3v1mo3mv1kysbkimv9y2n8ruom3dmo38367h57vfei9arlztuo6mw9210501omtgdyj71ku2gkkg2w93949fd8r9xwohxnfbxnnbzttbdka11a6ah63iuqwebgg3umk6nvu00vhtyx0ef8l03ryq2e145qmxrrx7u0fwrt2aj386ihxv3jvgiurbkhafdinjcezuod7chrrxz6vv34y0syn3qrq38phj9x79g8e8kbvnt3fe1asaes436j69ywpegpefougp9pcphhnd7iul6bnzuldqadrou9vdtzsk9dubtwwbexjh7upx2hxrph6j6z99ihdrltvnt6406r7kzaznejxr1p37xvrbiy3wt2ezvlg9xvbyygtbahvupwufuqge700tfb7bvlvtp466keanymqlgl9ad8dou8nb2v2yfr6zg5yahbilpnnxlb4sai47mp50q2wzp864y20kbsoazy693paqfoujzyjnw7ikfhsrlt64xo4hse6vrbdhiag7x272fmap7zohosawvio0l7k5zeopofgsr49kawhtb1msypczgm0xqoml7bx6lkapqcadhf08h0oaiqd8cqhlz0qz5jtnrr61ikz4ebvzogwy0kufw2efq6liwgpa8jxudbbd8nhvwakqynjl5in3sxka244x7kjos0mzt08aez6cw5c21e2yk6u1k751ltbfwp5gmkop8198o0lm8cbyqb7oj8t732wwdp7sclbutdb7debp2vf7ii9drkj276yosvuvkmurly1loncdndt14q34yq6038i8mohdvp8oo4u7zdrcc1zepwuzsf97ej85q904l6r3tv2acvvtx32m3aekra0ogjes5gsv9zcxbfm1nia7fp2xx3f22ssmnhjmz0sitd1o6hk6e0gk2u4wyezsjpkxyyvymmzdbxgmlaa3wucvomfuhbaulqze0xnwml07nsr4hwmx9xrsz47ja5162z6gcbjzw19e30pt606xl75yslim66if8nm6078sxo7t61zt68f0p7z6dev00bhwkkjr61zmy883xi3vb1c005kdtlei6g99ocll837wut0pv',
                redirect: 'bipnnp1v00le6rzuzx89c0ee776gf1dym25z487u8riwsqmmtg5h8wi90d0ppehn0265wj8do1b9wxl868y3eccu71awzo9a6dr9tbish312g2pecpf2l4570ypccedcnuih7trffnmqtbgz6jjy8zk1e9ktdo5y12t1ls9vc5uefmhsx55in16q4l0p0o4qwdmxtfpzabuise82dlo1jn4vbkdf8szhv02uvc8uw3br8rss2dyevef9r8p55g8et8j1lvhumuxacy9pz6hc9qytgf3l5g98pu49z1dqdr7vvqlsgfzsn4gtqihtpu65ex2n0u6m290ogjvvh4brydzop0i5mguimgx596hdimzl9yu9va3sej9xa10tjm9p08e9gwow65j93zj2qyg2nrfwmmivb5kj2jrm6n6zmy6morw39vb977i7iitzy06sj01lhc19p7igjn0rif0l000bpiq7il73a2kngj3n33whzfg7hkh2z4cci607ogbrkn0g4zgj2g9xwbpu39c8k10en6rwcglvwjavh6vtzg4zhoec5aliwq9jg8tcah4hkmgk7gkxij4wvi1nt4s5x6k7uo2wb6kzn0ny96vnx5xobjaxuzqnzlj2guwlbu2kty0pu4tb1rpjughr7bkcsvifpxsxndl56dvcre3wymxd9w2le94g4aprkxxpar2kc5ws6z0i9l0zre8t2eermq6qcdochrgwq2xye2ocmldzmhn88obpvsxpve53xochwuxxcf8g6003kqf53xnad1sxf9xqiv82noddwp8o4qs7pmg910ik05qc81gn2veofrhkokd8f9ismzjmwlmrxtkce2xoo4tjbq93hw98wb2io27kvklkpurii2z9ogm1fdp6p4nct7msflunntfar83sio3iwzb8zjmtkbozdhfdi0erzwrgoozxsua81cvugzpsytaojc1ydvk37zlywrlect1b3y1r3uzziaj1nvlscfknl83ar9xu95xsi2tabl3iv6g64fdj4dscmmt4ic2d4ljlg2sm9lxpbezui813qszr6g93kc0svd4l3armwhnt1w96w32mx62kpp5tjv2t9gmf5lgx4imez28j0a5do76r9po0ajrp3z4eyn43fqjguy2p98inp5dafgm6detw19fxriers6w9uyf3iu4sqe9jzo3740z0wn9ui0n5s9rx4r7i9vh42rda754925kzrislnvd04vv6ygukg0d15pnf2leqb58lh7cibieirj13za18mmvakwicgsngv5fcmjlxq7wup12ro9xd911vpsc625kaeivgs85w3moflgjb8hunu8bq35yjorp7hngz80rt0j4i9xwdo3hes15p8e1obym4q7zt793ianm4h5unefccktn72b6gwi7pojvnxa0zqd3bdp1xbiayosrs8elpjmmi3eqy9avdbtyhqywpzgdpsj9zt2o6lq08texnwvdy9ap4492mxa1w87ft3gx69toy7sbbqg4mo7wwk4j3bbdms3gk4sajvuhj6a70l4iezrpd6p7ogx0vjwlag1meadpfa2h3jghrzjngay0y3ay6d3g5vckjjodvqf120jd2ssp85un640x77yx5bwymalzxf1erkictvysw6n80z16whiio4g65lb0o45vd4faet7m2v4p1k8c7f680hy6e7l1xqxi1q39uo6tey5jy7dnz8vpsk954kdqifar4akhji3pqtbdshabn94ys9euerycfchh7irrewjuucx67f9gzct0tupww7narjn1cvaf2zajd686qt2dnrdchbxd6fz2ovvvolpyd5aqj5wmwkuye8y41twtaueqq6l3tbgyhqg0zijwldan3qlbtc051m7yekqmegkfsj6y5yvptlw49opef1qwlmjpep822gce7b9hl8haexne8fvkxengn3sf07ms8l4t4wa5bx4ivie6npm9f5vyl3nstvvvsfgfimlvw77w3whlgwb6fi7vvde4umvsptsxu54ub',
                expiredAccessToken: -9,
                expiredRefreshToken: 4682532837,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'futjdo8ecxioqqa1dc2pa6w0a1miyzw6mr5909mjvzdql8pv5fyngf1hognxlf8lc5w6bc7sptjks0k91kw9mw8uv1ipt4aofji9g43ef8vlsgz1c1v7fq0qnjys1yg792wj2dvq8u4jx9oxhybtrc458rfjchpv6d2089t2578l72wn1or91q8mdyu2v948k9tz8umkjh539cc1eakfdpqp289hz81smw7sao0dfwtxu3pudp0xnvl8t4s7ot2',
                secret: 'qk7qmzlmvezjy6mbdwkczyggkg7o54fgwpbknwyqdg39bipotb55rdx52sxr873zrptur015p9v407m12j3fklqda2',
                authUrl: 'j551gn63pcv7i6va1nn8rjtjld7p3yrachtgdwjhedobr701chvmnin9tu09l3x2pyx2hvv29oy2wkopz34s3rp020qdbpt0tbj0334rpl87dt4w09nua3hndao5pbrzx8rcc02x0p42z4bwp1uyxgnqx4q2xrlq0btmw4yhnvr2e4zx8p28rrhyomzyccq4yg24kc7jhd4yp2cj6muafcxa7b3mmevd7b66fbpsnhxjmi14lpcfocug53th5047mehh70fxmm00mnvoaj4wh8di91fbs875qhs9ozhz9pcb1kg54x3h5n6q6919eeoof6wfbulot2iu1woukq76n64q4pnbj3xpkgxurlbyrpl9fwekphd4zr7ssa022reifvcnwd4wjl82k2rjcmmr1u8pvr349qejwvmtevgedbzxu8pseh0to7yi7bvvjl4mj4ii1sc3pzreltwy96xfli9izgxykxvx3ffymeyp3qws9hzi702factagnyp9hohw9am6nuiimh1idgo7zxl7vk09njtzrggt448j31eon94x2lm3zno7eb2diksjzunacupydmehpswu1t1tln2v5gqae6newn3h7feh5kc0oatp5k0aglxlj61rq3m3c0m7pljwfp49gbj024v8ti7fnhamvihjt3muduw3xxaasfcgsv9z8m2xgtikn6zccrrkvacuizmyz73pm3vp3uhc8mxqwabwv6qto3wpmnwkj16a1jvct7iwog6365rf6b3kxffv1pzgv4o1kh5p234t673ayz32i0fkzivvyqnl5yfv1vd0q7olh32oydwdhipy2cqk20i0ln3z8whcl9d0y4dyr482pfzpbdsu6ofb5dr9z8ou7ucze234v8vj2sw5y0n9c33z756ta32cou534qwdja3oeupehg42xlpie4j9r2kmrxoqo19vjlg6ddqsgxyjy85he41a571hb7je271glnfk4oe4aohj94moyxx473nba4tx7po8aoslsba0n31o70y2px3svtgw1imbc84efxylsge9pjrgy7gt7ccgn1h3zatv6cxwjysbxs5y59pjcljkela4bzmwy1wmivv791rnw8z5azz2km5ubfabq1i1rml5ngb07hly29kwmg0xg0y1texsmwql7ke0gaxwvrux65lmklkgz3lw2g2d9p2lbpco5x2ct4nublqxu9f9scpmx3a6n4g4ia88to8aokb9ud8meu0tkwrc8t99tpe6pstcfo04zwc0o9ppv4h9j1upx7f7iqm1zndwngeoo8m1ape1poo6puo5d4fm3bjp3e2lohgwkxa6p71ipdoq2e4262rt9b0vh874f1wvfw450jy9b2ht7jtl34h6ocx0g9ek2q1oxwjkarlkfqm8jes67h7x07wi17agkmb265831pmejs44odqdtkke8iwd9dwuc7i1kywgv91jaazm0w2iqaw9tv6ecbhrt334107riysybm2ta42zgxirinbj35z1hql1d3c40qwaj6ogyoq3bt0j76xxe8dkzfw5ey5e6x19tcapi4o9lrr5sqrpojr0pgsamzxp6xkbdsbadvs8mudgt3bz401ckaa1xv61kva7vltyfej2t62u5d4q01dw0rkkl9pxl9527jetym2ofcot4wln0vmthjydkn1o986wga65mk283hydtn7ka7t7fk83kw3xgafg8mdwb9b55ffd5py2x9bly8dqeju2ir433el472nmbv9ny40mpa2dx0n080thqb1c1aexqjmsqvd1o94dmalw3fjmix3sidi7d5cmzyayj12nup9iqe74tm98q9tpo1yr5638evyeb53pantvoa6wb4v3o681364q86p9fp17q1oszg83wbskub5cxok5y63ylmy147itndzorn49oz11rnz8oai3y6nreghf9f5rtn3she3r0ngbhty0vrmmndgu5vb0j6ejj4iz750xz2acwv8o8es01mf9w0d4ofu78rc29n1n9y6iz2fsmjoplpz',
                redirect: '5bm5tkzr9slhmoi6pmh1sevl9hiardf3zaqlzb6gn9yxs6kdgn35qybbk8gczjgfrue74b8mweuo2l9hih87oaotnmjc0qpiiexgpmalyw3wgzwka3b5cbkd6ti1iavj1ycvgdhm3luwk6jx55mep6dl5j3386osbxs35iu8knub38p9x3obaj5yb5pmath5peitlbsk0qp1hwb6zi4cdroluf05t2s99m4rkue36levf5ycybdapv5ewxenovsdpa51l97wt5ilblr0qeb23v3ywk9xhktmcazpz486iznsx2fadh9e2j98x2oe4h2ros65mfruso99mu8wrlq5fs7swmddzdow40niy4yqt18xernwrvbjdpjsxe81qgdd0m81048hx4mmechpuh1z1rwogtizy6yj5wg5ze7ljsmqtjx3kzerhkf9bz40lnyfypv0u2wed6053vxvm5j0dfhbbztv2qjkl77xqtnb2or119wvr2gsw4bn3qdeuhbezs3p4nst4xbqowyp8kzw34vev7wucgplmznjf1s9zndrxqfwwoqkyhbttwu10ev9kbdx90cx2uf65cxtxa2cnfzcit4vr27e52sxpr8imenzdnseuymbvt4yvs95xn7qgdjpkntt8eio8sx9gmeqexp9gbhvi3st2oalka4cec7i0wh0501f6ue9aklk05w1ygx02eqp6ilsd15twvden592dc9ljgvoly62e91aqsjnr1wnx28a1kjnn4c5njbd3s9mmojcqp7m0akx9xs2jiys6e64mveauy7tl0pmvj81gssl5zt8ndjz60sxe2d0pjd0ljcjqkjybtx5hdi9fnltsxdrqgd5bmb5kagtnu9skpwuvcymanwfr3or1ad58i0j26wbk94dpj8534ps8g9myo9ooajmdx1b81tdcdsao9q8qsyd5ehkbt7o6esw6gkoaw0yrs06n0yyewlo9en9heuhicddii9n7f3t0ylnqk1iwbwivv2akgdbjq3ywdd61sj1o5nj3u4twc0ofyhcorxhxqaukw0977dapz3wkt3jhmhn0w90w2i40r84nu6bmp54o7m70tq2vrxqq47s5odpi7yh13rmxhufwthge9ng2xsk3oeet5c4yllvl13p7e39mizq4m1bl4mlwgqf1uma9na6lyt6clju2dwoo7zto37dskr222mfnz2mwkah7r50e4m4cmsmx02tbtcsw03hvp6y3rm4eslrvta3x9gf8jfi7vlre82dsvxe0nw1rrgll03jx51jx1p4ndmokr5jbi1g7ykmmnsmk2uvbllfs117kp7t42g3pg7pxvzbxcqffy3hkzvkbpt3cdqywq1rx9rwssc3u98kki2hmys9cgi1vspejnz7nzg1xcfk4c5pn9po2xgvwbe3kmxkswpi7h2koscydb8ek233tcto0l25a9whcp9keqq2jt7dvwlvkabh7okeukbrc0qk43o8z82v6yh272e5lr3vyamoj443drp44sxpmbsl5ufmry5cs30kx225nn8236z5v58hbri2xv3euavscr91a0jnhcba8g32hlbsp19wgzqyrv1895bbfne3usi8c2qcem1j7rp2z4zsb9l5ued3zlonh2kp1ra8bqxs3fg8ik6nmdcd26svh8kmc892gta6ammo5obmaj8tn9yxltzi13vsjt9inv9mabvkeapbdvjrftokuhbodemc8icnoz4qe9yx12xifsmj1du4i3aadxflbsuybt876u8gay25yfg0lmyw04trrxma8trzmnkxn27hdewmunu8phz5zbo3hhzd1bo4v2mh8k7yz2mguxrctu749kedl8o4espvmu1cj2q0g25kukamkdzmisxs2v8qz1zlhy5q0jpurjmjvgjxopkhs4p1sokbzar1mjet0t86n3dwizmyell5ip750rlyuz4n6ccrtsv89g3jv1yzmtg04uuqx644abx32u5puw25o1f5rcvwdotgrzkdn9o0ai7196o4px64rilu',
                expiredAccessToken: 2370723741,
                expiredRefreshToken: -9,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: 'dmkza4ldqqqqbe619vzzoul76b1tjmiaaydl471ddb5sj13jf0byr94bem7bt6l1er5ewk2vyjcq6iso2mpdi9b1p7n9wqm7qabzq8xo148xmjfj10w65p3omuqlxwfj4qnz6tw8e6c4sipe6lh3ps1vkarggr1kb3crbodu03p67bz387d7493ta26gppg7jdl1xtbq37wmjrfk4a9hmvci0tl753ubl5d2dzfpjxnw13pbaqsdu31ed1qfss5',
                secret: 'cpm5bpohfry5g095ytwlhzfb76qvzzwbz593xl37v61803l5ojv7ljml7f7idawi2sujla8nmobyeb00rgv14eyau9',
                authUrl: 'd2bqua3kmhkmjbtgcrxajrxuyzidekq1p7d2k38j3aba9a3km0oiotzqsv0sy0seeayr5gqit4ig6quot4q5xpnct0rj8qxa71t7quctzz47fcup746hlsxjpdemtfyfd96soodhfowpvqvsqb49enouoixyfl8ta9rudtb3hizrwbxdry5av2aevdapih082i0tbl6ff8m6h6gumhtvj5vcbb5jck35ap1yr2t3bikrqqksc550v9jpz6veck8oc825nxus6edkirshqii6vqbkad6w9f7b9hkxabdfuo35jltqw0bitejglquwyqi25m5w1mwgvzrxbge2vrwtuh78840umod7kfrvthw3smpdka3jhu6rgoou6rzex0b95c84rvdo7oumsxnqobcj81hhdal7dp7kxoad1axo7znsptsps3ur0ltj1awvkx8jg7mci32p6851h19mjubp7w91fk0ngtvavuababmp7y3n2b4v83d0d7tylua5nhr5bvr3ovjtmdwixna0jixckxpkqltr9hddkdditcqqu0wbihv0xdiwlynk5xfdzqektmg4cjo31h8sd7218nsoh7c971doe2ntoerh54iyz7r571g3ya1f1ruyrs82apkk225gv7o2i6smvpl8dp952rym8ts9ajtm1w6inxfymtr81e6og01vtl9nh4ogu016earl50ucad525abef6vsucubug4tshg4wr98osf3z1ifejucwbstsy0ii72vn960krbpvdhx6llfxaim87f4b2ekpz6jrbvt4x4tmm6sbbdfkj5wape1360gkbgjzqwl415gyl6fqkxv3v6vbmm1k464chweeu2lkw4qb0puimvsfu5ncioc3bfnhvzkckh50i7xt8ai0eqowp63aqpra7mcmn7vt5nsyx4r7ozea8klo7xac2mka9qii6v6vdivrztkpnourn6uovhfba0wtlcoyxziqz4qkgn4x6panxf9ldilfy3huruzoztyg144nb0p7gdjy93a62kby12pjhkh2hc5iu84vm26pvutnxju3wd2f54f2cmey3cep1kdye1f3wh3ksgl5ssbh4rxmox0ozhmgcxqcvnae94pwlkb4bnqa3n8lpnphfoqa89oxxb2asna0v92r25ajgbh16tdrspjtskrmbp0rf2xf4cf4ig598xjdwf3pp2riw2viy67p9e3b7kicdt2gl72wmo0neugdz8zlp0iyv98uhicauvp31o2hcckxce918cjmarswc2hcuv91q9dj8gattiifb8ea0magbyu2p9qlomuz3nwwv9w6r18r0wap6pzfhbmrri1eshmj52upzei0h231qclua36uxk3xuo5zoczhmz36a39qe0h1osbu6ryp7k6zz8n03ifqc1fh0lfhi52205sr6ry0fvke13ykf1sopntjv49ffvszps57500qdd8hnxgj53yk9l7nj5s73v0ev1dctjudb2ht8lralm34393nnvxm7o5lr4fo54qw8m17pkq0d4tmi45aph3g1lfa7qezxoqzkciu0471radv5bmdfi5ox27x1d8f4oyac049h97z7s8hbl8xfu3r5idf1174fokher3diopwrhp0syxzl8fq18iv3a6233716jhdtqb0kvthehlphzja34v8u0e4w0c3cqzzr9b593uohyanbjw4cf9t3jz9favu1pusjnb0ig1m60a0vfaiv66vpzhebukbgqp3i6vwfuh3dcmf0i59wy2m224ymk9w90mqs4ns427ma6dym8itsgkz1dnuj94b9gljy32teojhxgros9yrca0mrjsqh6g8vig5oa6xibtvpq4a6a97gqz4za7akaihayhatv2vl6uexyaktyzvzd3d0hgeforvtuwvzjqez0aky7kdqtc05c0qdw05zbtaapfujyd1uouo5qc0n70xcem713vsvn1d9stpgmie8lhbpccugflxiqsz35ry6hx2aa5mon5fko3zdrlmxvtjhjx7r65zi5v',
                redirect: '4ksva30nc4kp70o9i4wywmyiwsn3k0za4on3sgpmr0tq9am650n7jbwza21l8r3h8gu2gr45hqmd7lihty361f9lerh9wkrab4p76xji3sk47afb27hooikdhnipxmm7kcgfm8ljpnpa9xl856rwh9w2frcu2rnjgmrwcp6c8q56cqs2xv17jbv2oa3as231b4mqyqix1ekikbko2kmd0k71szs9wd28xxj38ocxdu19nott40301ga23xt7fud93261r0uyvd9yzqpi2p5h0vs6igea2z2fdw7turvcraqymmjrgiu5rc86dj1irxvu1398cqpc1eluvzns54w7ae0ky51dficvd5v99bva9zn7f2x9la3bk2vjcaa1npwt1r3an8qrl3ng0q2jfomth5wsxn8nxbcpn0i988xxjh2ietnl39zatd81i5clfnbs6kopsb7gtnharbe52xt6bst84fqjoqcefds2t4eudrsiqhklcpm6jjkix8ptbwtmr8hof74cwd2fth20yp9txtc4lsjo3brqxk7zjpnepsoegasec2qzswk79e5iypmm95pcs9nafdee4pw47kpw9iiei29oidkmhgnkx1xhify2ne6l5r7cocum4li0agmi34xk9xn78kgsnxqge4ek7bwvj9jpwfs39h2e9zh8wzkxh37qxscrsj8n0st2ly03bh5f4pw2hdzyucdxrdkje5a7ysowofi3qa4sgn3zxowsbu3gxf00tzi42y6qlwrmqkma3l36opcjb6xxnvsfd9mpvdjmyexln55ak1dgvmgfikmy0t9a87rsndptsn9202qlchkwh76uyd117nxqceas4zflopqqt33pke369v183278wxxh7hjn6rspfb97gb72aa8d69zqasg3cuyqs8suknhf3k96dycyzkl2yftyiwah91dpfkv9t0lrc5j6d4dzdpye2zf3l3iilfqfcgi1dijkulfujq5gh7sdmpfa4dq1tagm1b34odaz923wjc6uxnu5vm1n2sur1aqp26o5l4kn2a0zztkdw3as8yvu1d4foso3km2ru3b8k98i773be0jmtbk9hwcfqwjsw2dg0zdx3jji0xxiugozlydjaypgtqowox3afbgfcpl6aaqm3ogf5l92un54hgoqqgjyk6b9oed075mmp4f91p7q04ssxfnh2isxiqakczksnj2mpmhspifse3atsl6wqg01kwut91bnpay5iv6gvor0wz8ke2924a0qzsx49mjcnjmksck7y9xi3byz23whj160fdf9go5swkbtsrcqbprkrpvajemnhbly52v3dkvcypee6d2xy9frnpv527n7dew95xgvvsu5ta3338cxx1z6g0997vp9wb4y9wh1kj9qmvkklhcdatpe4dh7kfmgaoxxyoan2q760jjsd3gddyqt6k135lsm9edbx7myn100f9db4r7oys9ycvnp9jranvwl217eaj6pdwpkyb511e8huzhs33e7n4g02cmlokcllvc9nzzrwduz4zvz3nk41tqvxs0zlek4pteaa8nm3h4ix0pw04z6iybs5s254qux8q8zn433b7w9hzqwvy9i83d915jnqj5ou7x88ddy46606i2auojq4e1mezkwv193j6a8bhsk71x67ripewt5sgz2vha32ma4ti7p2noqazbg19ue7tbgnkapctly3gxnkqx8i5surl7fxq6d8uplazpuvfsy3vh4zssydz9chypnsldk7z1xilx26rd0x1jrcu6vudx1hpcqzgqj6vt76o8tmlicrp86k19l9tsvi76l0lrql0i8ejmg6pue0ajw85c8fjcuppitamlj1yhxxw86l1ndbf3dm4qloduwlebl71kr8xsfvlq4heuvelv94393jhqwdknuvdcbofk86004c3lgwznm66vhefao65nay0t2v0b21b6e0l5wc2ifvuvoe7lhekvrmj90r8hkyexlqunyidteuiognhc879vbi7cqnybt91kfzv58pqjp',
                expiredAccessToken: 3166435464,
                expiredRefreshToken: 8730751693,
                isActive: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: 't1hcrjjjryhc9xju5d5sd1f6hlejqozbkrswd3p0u6sjox6mpb6t01dq5t9csemiozmg8b9jjbxk16faykmstkoe0kh8nkr1fbq7w1nkigz8z4r8xxwe38shj4bnozgpp329blpc471m688adr2w2c9y7384m2iem6o0timzl93apjzauraz4l5omnwwbralmyrx2mcpj1mqrixy1dsn2lrx0wqy3nah17jh6kv60sxyjn48hex58afn85b4nfm',
                secret: 'ww0yt48pb73wysk0dqhqxh7okse9ur6l8hlhsilpctptyotvczmqp2pcyrrlu6ihttgrj0kk3ojdrlyrtn92vxk1cq',
                authUrl: 'k889ufohd4zzlwzepf36zsrozpsviwneha6281wxbpaznt3tuq6pwobmc49oquyq8y61gu3kf7y1qbc4mpichijd0la90gi94r181qqef7qkh0vf1fzdi8s62xjb1us50kcs1pnnvdusllxjyxfc56kkmynzmly8p14klg27asir1j6h4ataaqsio4p96f81lnwglzlqte5nler7zhesnra95kex79wu4lrcmn40fnnx7ql6wmggft6nnc9w41qv71wgo0lp21if6vj84kn7jpx8bl6s6z54k8iaghkiu3wi0a3nx1r1nyt5zi78pi03dau6idlofu4rwlukbbomy3e2o3851pwl1leaz2s8e54tdrjw92uywxk9g8a75768keazdqyx7vxshham5g1p7ln3vrb9nzbdvf9a3g6urvnua85ayk0vsbgzkfpxkt6re1lizqq3ubldg4sxw77wt6c0xqylsp4cccpi20s5lqpolxye8kwi07cvpq1b84hwrd82gecdxja0lgmk06lpmtlfyf9q2p078szas11luakgcseuz8yjcfgw9crg566m9jtunhyvlxhw5klgcqvux71j48d6pddfq7qbedqea30tpwtvqf124jhk0a9fg8o5th6u1ag40y6ugkb4r98h7ow0m69z9syhu0ux73onk0b9szw2xl7r4hknpah6dgl854oaikevhe7mqlocyxbb141g6yyotk2b9muwximczlxopkortwu46kqrdp3rw0704q7ghiffmta5nygcesqcq43d6r08yan4ypa4fhz0mp5kujv5mncotskunokazrg35b1ve9np27kaxl1s9jz8azxfb491cakf8h9harkb0q83tw01p6x0j8cqk6otc42ihx2j80hswfl9h0sv1cd4jyeh59lglrksxcn4ohlmnzvvc77fppmy555bpb6yi8he3hdioabtbowur9ynr7yaqeak98jv51rj4i8ma5z2re22ghiucj030uvyt54idq751r2mk856a43d08anck2c4ssizwk5vkjsoku2o06697cuqry3auz82n2wv07otlfbvs6sp1p0mzhsysmfg75fa7moyxct5pefaxjci010vr710119vox6vf8y936mwn0u4x2l2ct90q9qi0gu6wff1vmghqlhsxjkbnnlfjlm3t8ucbbssu5h6dc6ow6bg827ej3d5rkss60x03lweeevhb62tlxida53ffddz4zla1bie8z2o7qf64hsz6k27kftpcc6o629yv99xw7taf9spb5137f25bsa912zue6ffjdv8r78l67om8e51vgx0qgomvlfv5b8czsnq0t7iuaczrsslsnc49zl1ffdmga7xmuhkyophpkg6plakjrdwzt6uu3pjtwa6jafl3jpk0rt19pdcbxgu6jhq7lp5x6iwi807r3lv3aqtt8lqzqj4di7oxfk2b78323m3y6la5x8pi00fazz8n4pvx8upm66i5wunz1266skwbzju0h1gvctteq6xjykea7b4x3vzidxra93l92dr83xj3gx3qbe305j2u906jeknlhj0lc485e9n8o3h70fo4jsf1fe61jmjcmruftincrhyrk23px5esqb77jvmynnxh19uqt7u5csb0wwhkyj598mismoezw2hfhyvr7j3lb45sm6pe5o2md99q9zbpcabiivydfzi7711rg7l4xmd7d0yqjnhwzyp6aqa7jm7pq9568xcdp8u8km8h5w3jvula05u5m44vvoxv47oe25utuqs4j86f2smalxybaeuo9ob2wdupk61qzbljmfzm2esd7022chtfd1075port9sgznorbsa8ti4p79xtvbblzognd6vsnar0gyd9fmjnex9f31sv60c8y5wpyhj52cvhzwq35fvwvcc62h6qyp683bp3gbsx07on6g6s0t4ai8kgtyslgqp06kfo8wg89jmzyowk87f7urr2nfflp0obv5g51otdpf1p4hbczo69f4x2494lfhbf30',
                redirect: 'cbl4piht59t8469bdgg4211gsuvh9zxsb939pk5pnaia50pvahsngeuj9f6pfpehf6d2yoz07m30941216j309ekm7vyiu1k3158wstzl0isyadd365b93ti2fxopnmhanquc8h6mi92j2a9werwpx01nmvxe8ycc4mwe0eus1irtmg9wdqcid6voev6zog2nyo9y6hceqe12zvvlqop7ntqd8z30ggzl3w0augv0k4t6492wg9q6jkggmxwgzvkwc6xb4vyjtfmum7cj6jzas99tt8vpw4zwn0ze4idunbkyzvaug73sryokmm2gs4fxl5wvdo89qx2g6dyzygpowo0a0y8f467fkycrwle3wx0pi81fnz17opedqczty0074p94b6l9pcft77c94buv9jjcxc788xhuyifjd8qps180fk0czes5sxr57b8v8iksr38qiu9b6tllwngvxzzgcm69goe9n1y2hyiq0g0dj7kyupo5hu2d1hsey0zm743c9lt67pnqdhg4i31h1uqko77lvnmxl1xdydxpec2si52qgy687sy90a9pgjfmn1a0s1sifrzqjnaee66iazrnyjv0873yzyhtb1r5er5gw1dh8ima2jrdanljqwl9b51x75ajwu44058664jy9bcf9z3kj1nvs0s9p12zz83tx61p9wjufpl47usmpdz6rxpo1zrwu3lskk3x4yzzy01gu5t68bggo4oj6j98bkoel92o0jwae65r9mw5oe9gfeym3avmibf8d64d8pes1gu03n6l32kpyjic4tc2ok6wq8sqsob43x37h0uowg9snacy4wmefcaqanxocgqwnyfq6aadolsyxzq1ml2abzvxty0umerg3u1uxag1kerv4camtxqtocidf5uferyb2k69fgqajlbu17glpzhjeth9fyekfb012ffdmu2eo4ku65styx6pi0nk3khw18wbd8qxlwiati2vfht5hnt9acx7q2v1pzv2x2tjovv1k6hgzi3rv3ujlsdm29nzmkdmlg69hs7jmar5tlnoadasqpq9xa7ud1j7a98o7ww5nd7ad3igyumy3irk7yi3pfcmipgz5qf1pmbjoxjsc6m922j4idok6ruvl1vgpp88y9753r3nr2l9tp6dajx15c0q4xmb7voziqqsw39csvycje27ujqyjn97a92ilnr2sjaclzgo1lwjij8nlj5npyurdhwnoa1z9bquca73y8y2d6e9pht1mxynzivgz5n63ay6prdi7nksmrqf6dniqe3dv37569t34v6dyd9oh6n0d58s9agcph4amnktw8dsp9pqj6dlbqvr7t9u5k7qbo54u0bwj9h894ewarggnd83bhynjwi3g4xv4vq84ryu766bxregv9c2zxxgshn6zkoip00hkxz1zhoiiqjdn3l4bj99a967b0z2k3hvcgkxx78mt8uu17d73a09efax8gisinpcdaw6wdp71fx8bu3w8gtikru73m460o1iae0il19saqihvpqc7wr2tvhsmn4s341gxuejzjc9mxru5ps3c80xq6oo0qodnj5n0r8r9rsw34i632ff2adh0mvil0ekuw7ftsqtgy8jf6rqehv14n514w8e8e3s6rfd1yms37t4k1k6uurfxxincxbqx2d0f3h0bxn1xtoqpmrmq4bails2az8994439qlddt66e7j21p0ythmjv8gvpwuxgt5eqz1et0hw13xb5a3tvfnznavr2jz1tk4csuhw20m1h5ogmw4hrzpgk7kkj0iip5g6j2oet6kldllu38m2115pngdjlwzm0ei7of9zfsavbupti4y0cnztsgo6h86903rn74sqv0ukg1hlu1en5emw645ab4scct8xgdyu6mx7ozx6koa4pihxgxpbqqosnwyqm1m9fwufzoeuyrrrfyixzss23hypr9dytdgdr787q9x3u2zk6amizadz7252jt3h5bbly4yxnfqb9fgrxeyx89fvh4gq6diptib4nkwwsrehg9h',
                expiredAccessToken: 9963729014,
                expiredRefreshToken: 3784325953,
                isActive: true,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'XXXX',
                name: 'wcnzawbs6dw7kzdqj1vqawtef47oug7cnbp55p7xe08j4qvv1r1rbpm791bo9tkzzgwxeik8ekklr36uqlbqkm1qze5r2ls20xhil9ptb4jr9003sp2x3owkov5hlwphv2a9zrki9kh891phwzxkrvaktj7h7l81wo4ddpp21g7929zom506kt8mk2npcahph7y4c4ofwj9r2j5kjfq1d51pd59cljcpne7h9luryswju91gyln77p8ue3s3gpc',
                secret: 'rw53o7exlt9dp7tzkeg5pmv63qomyyo1i7so8b36shcknck0zd87gxqm7ui8rny1t4nq5wdvjy70q2ump02xlyhzfr',
                authUrl: 'dhc40va4peeu3n4q1s99oso4vqzuohrune9koyu8p2cj89qzcr9yyskke7433dtvl5rc7c0rb8n1kyri93fkfz8c49jrex1i7hvwzt75tz785fy9nnb9vlys4ckbllfaphe0uw587rqw42mkhrwsq4hs9zvw9yh8ukvpx7fbw4kwc8xxbu95m04kjuc971td1uz599rpcuvtdjvbgju6i7ans6om8bjc4fllph1kvlezztau0rbc44x398s7kjsy0ezy86ur6lg6b4ewbmnixv31o8s9ecxyde36a0n1togu9nj05pslwmswak4tkzt00jnzeje8zcfu7h29a67i82cncv4ift1k4bjsgiscpjva0944kdjykduls4b43jpkggyu9127kew45mce7tugg42ac5pv18bf5mxk8ks502b7esir0eur4jyni4bg93lppwvhmt165eqpl5t7swb52f9sg25agswuabzhut2rjvr0sqrxfyrt8m6qv45k122ydceu4diaiuonv91vb02nv5ykuoreju8j3ol5zqthh6l6uxp50158iya52lefucfqse5ml7676gizdjfxwtgb20u0fh1xvgls88hthrx4mx0al8xmltx0bkr7o9vtyi4d8655xyl6i6jx4eni42bjhlyguzu0hzw1ucwkfvm4glt15ydo9ugz53s90lhvkektzl6qmu8ytqff5ztocv4xiowhwkz6zu90zw1r2agaufbpfgv7vcrrk2v1uxa4skd0wjgxbo17fu9mp4bfa65mzyqxpr0hpzpw2yzjjpf0n9fozv0sn36zscodtqa1tyga52wjajacfmg11bo6afgxhdwldf50lpbvfgaj5uit0rrozouwsb80z16mhpnvf8647m6yow3kq61z7bv889sqysf6iosnq7bi8gxrgft5ib8b8ct3lexc06s66dggg9eyqudfo60738lwbtorksuykbuw79bd6td78c2ldp4cq0irzd1l7q7368lghrl15iddh5b0pfwdwu6j06fzruboglmn7el0x8vsk5ixufw9djgy6ic5d2aujt983q3c9a22w1fyqhksizl7403f10ptmd05vdh184ptvshatu03xszgahjiwieb5gij2sdy4aflhkjh0hvxkv4519pfmpofngpmsgimmak5za5mbbuljgvrp1qp40citlhbnqzr9464srg0vmlhas4aj3bq1njh26shrvy35x3ntgiua4smb3sop1bi75ilgsg7lxndg1y8bd6c2cgbns55qp2ovf8e11r1eomwjht6ejbpmbnfykh09hkjhvlox34brlpug8lo2iu8q5g7tsz7074qxm5ir1p19prmqfj0shgfxevmrgyz5ufq871jq6uip1zkmmdaailcb57reg476x4wlxjev7z8jlu8psp106cr6pdjsg1kwllvdusth7jxdstmgkq0yz711s4nly0fthp21ilf4kvy162x6qb8tqzsoj7ysa08d2k50uxwiug8udhaej60zb9yei0l6w5g9bk155qot9i82qlzyaqsf9hi63otkp0f4qdvg0oua37khozkd9k6k5uleyhyz163vbhjlwex519uv74l89du9em1tb74jruxogn3vktc3xjuqhy6vu7ljskc6wqjhi47iz6scgvc03q7pqagop08yr8d98z6gds5v1k550q0ldn2o7fwqpl5gq272usx2oobhqi46wm83wjdaqgjqnaw4xu1r2qm67i7c4pt9s4hhp3varfuxc77249n75pm4yhevu7stcaszngflhfs3glx1vnhxrl4z5mcgp0h5jaywbm16q91rw1bvvybqgl45y3oj23vv6it6zua33kt6ndj51bef973ifxjnhqpricet17xqhrp9ibo3aodfau2wz8aygshqf6ncc79vgwgb6itnp1fmee49be7yvqvm9lc714tclqqzjj0zwfp9hjuizxhyd8vab5lxblwmvzligb5m0lstzqwtfmagr48b70szggpbrnaod7q',
                redirect: '7dnsr3t6aaoufsgcqn0vpcp11zkeay8zvkhemhlhufc1eb0pdbs1p1ifj4he4c0taldgeyl32tdwuyj3i8bvdfn8tezfsfs0g8xe79osei3ptccnwwbusdkhprnlozfolryzzc8ahmrzezeivubbpbpufhpnnmgdv3kr2uq1p8ta727irzz8rpkkrazme2uzs9b6urww1c9n5lisofbxebtyfpwctrxdytxieerdzs4elpxes72xi86tbtnb95vqshg06vhriz5v1x6545xyyjdpczlnbn9cgps3j7k5vrshj9lg3ild8ke3xogjbz12gv8nj3x13adqbj82kjrmnv2ex3s7co3nlzmxw04al3krtvzfcqnerfmpug1ywoflns8gr7fe43ivn0leoa4dha0xtvkpzrewancfza6aojgpgwyyuyj4kodgveh0mqdnhohxhmdqk0t0o0y2w5krvuvb6hhhirjssm4ztlqjx5gvraczj1vdaobqu2jdduaifw0ptupq80hjdkd349uv5gsctgl4r4a6abzlfi65tg2tj16aweardyk9gzvue4pmotlfl1nik9z8bmst2nx9y4vtvqi0n4mu70jykhyl4zgpmqx7wv9a4fvd7ynsrqqiacne3t34b8qlyhrrvsqbtqlda0ejtz6zw52npskihlpk9bq7d1eam3vynl9e3fhowte466ouehqae94yxf7hhiiw5kz49w5wwmw1o9kts7nqk0k38awbqx18uov2hrodvqbafx2vqyrxzrw9uievp8rgvyr93u5yxklvd26br482mfqyusl2zsdnh4upmnt8r0o6dc69yxwbqsgeemfhavyilown6mfemyvbfb59vbruzmnisr4oljdzdvcaqghs99a8x4pfsfpg8w58l1c2sqbvfha680bv7viha8mjxjvl5ragqkzcjtuangn2oru9ctt1tk9rapwawmgjp81nmxwxi21rzwsiq0831ymv3ygel7ngmp3ydn13gapba7fdw335gda05xlp3rx2j44c4fi0b9g6juaj4ir4b30r5m0iqnkdrz0akrajziodxkke4wddndj552szkbpw91z5wzrhx7zasjp1tf8fxfbbg7veg71hvj4oorsydy05ohy4bwoyogewsf0h9sswayifw5kn6id6nwubzl255e6ayj54kj0zqzmmxopqjf1zt98ra4tpl5e61h4xhc3mvkpy6qvypz1hb3caalxj6hbnuyr6wwqlrjso82rdd6z01g34vmk86o60u4rmq67dhcpg3solpfl1i8ukjhsm5703g7p8aj24p1dhdkirehp0748sm6a58npgwgxmltvfdfw5db9p5ssiztoz2t82a63j557gbjywka05t4dmrnunjjrs5ovznvo2qo74sylyel91uwk2lj3osaox08b210f8so5d34bw4d5k0f4dlrm1rmtzsvq4nulg3at7bajh13me9q0ianmenw14hw5qu5x5ai6x9a8k387ig18wixapkrcwmzmea6s6asr5wfs247begxiv36t4pr0x5nljf83q3h0dbdcl47bof5jqvrcfjgthrikkroc5mh8dr59xb8isxgptl4naeo1tktshs30rru3mncx93jqjoio9nhit4ktwvnskgxhqrvtpcew303st8c3jqof1rxkzfblao6ydf0v7alajj4pywee89nfyepjhn06rtv90kkhi2j091wdl6ri4vp2wciu428a5gedla68u0sw47kvy3dbpkk09dztdzi40iz7599pkmknjnqqiqb40elp11gnijodi8v9twah0b1p8ujh4qza96bdaqyf7xf5kuolh2upgk29rrifodnflrzg0caevgo23mvdytyccegt1ppar3znl8ogak5wrm6f8s2t1z2rb2w8qyhyzadsj3wofs9lub499h5rqygc2uo05yowvsvki4uqf6ucwnaul00k3iz51y2o2nele1xiqcsglncee3yyhtpvlwoi24mva5o3y01md27wx4far',
                expiredAccessToken: 8136931695,
                expiredRefreshToken: 6058670928,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'AUTHORIZATION_CODE',
                name: '3l7isdpbwlkp2duob0a8mpodqxrxodezwwj3nq4xrbp7nyacy9s4er9liixlqlupz8pz395entpo2p3o9u7pponugnifmso0sdv5vpcpgy9p0vu43kvuwgm0v2z0xdbv0ooi459alfr4nhmz9w50ugepaqakrd6xy0q1v5stm428m42hd5o4qlgg5igvm3tjdab0lsrfq6met23zfgfdxpmdqhf28ywvpasj8l5k3yb72vp19vjendj3gv0i6sr',
                secret: '9b0jvgj86t8k034tnqs5jeom9gekv5bru4acxpp6a91dm1jt1wd6jwkmxugs9lfjo22ybzgpxska5okmpv1d6t0jqe',
                authUrl: 'h4x42t2rrsxro3adngm56nt6xxzq06h6vavff8xhk77d9hg12t3vnkw0n0phk2hedltykofb6zue3k35krt6lch8hswf689w96ky59klo64axjtm0rw2jcmouorso5n2f09j6h7x1q1jtgqbgpkwa5z5svjas6my2jv4o9ifq4631lfd92oev5v415qzg13jqjjwzcl44u7exusyw3caj5krtmsfk2ixg5mwwyuqnqieihgy5trnwnq2k3v1hc250x5t8g2qyih2lxa3oy43g9w2c5bgoovhlsj9yxxo5ncgpx4v27c7qh3e4uy5v2bmpgyjpx5zr2l098rbnn6rb2l8xtv5gpdutjzfv11ksopdih085gvdv2dockubytkankbfv5dqapsr9aoll68cutj037irpz6k87n6mm26rf7xgu6gyr2nfxtbuaod5u8wmz6ysts31vs4i0uwmt7ypkrs3oyy4a1x6s7clg417rpurn81nv8fjynop0gycsqcif590hamstytmlq2iac9hltbtoy5utmua4rin9uh653l4wooa7tknzhfcnbciskv97oeu8wqzpis74uy4613cspij82d87vly3n0i9hywbzit5qq2dp08g7syq5pqtj7n785mxibii9sn9j6qpxsv6jpib36vax8r5zqwtjstwa5swx4p4rlq9u98jkww0snjw4i4p6a2dlir1mwtoddfm5k0ps62v5tcl4ixid164ius8gw6glsid8m5c5abbrpttgq5shyq5ylqonj5gvgs4imunf7d3vdn03rf2jlsk37nq5gyiborc58brl8xjlow5he2iq93g607n0nxjzhcyc5yfxj237lk099chdbdk9s08d2k4fjtyxzq505j6mlrxyszjyv7v54pxydwx7qsrgmplqu6y2pqmqnnevldz44fa5gp1a9mo7p0jflrbpvbk6htealxo2oa3slykrsymgzy8ecwkb4fbh4ax9ty3olzyzkwbegoi45y3d58qzb74eyncv4xtx07tpvej5dt0jikic667fm7x4kn5zz27ji7um12pewb1yaelw7hfr6l8qgtjjlqlxcal4ekbck6eh5ew5b33u7cm7hp9zn8l8cbfd1kxmvtttiw6i009xi9av46f6ggc5ni1ny3jowmitnnuwot6wl6x2aukmavgwkmqvdk41izygl34kkmwpcbxpu7eeki870azvsn8od9efohsyss2cibosbxqfvckv8ma7vmfjf725svd6tobt0fbn90tjiw0txcu7n14ezmjlzfza2lfjkeffd04twj4gyvz68dhe1bgg097s1lbbs955kv1gdl8qzgaxdons0720i6xy4nsksyoit8lc9mg35hlj61q8keugbjldubyailiwth29dklad9mvexwmaqiqmyj3u70fgird4ioya2r52iu3p8iqeo4g7qy6lk6vfub57ae10e0iw0j6jmnb3oi8zem0fk0fmpc47q9ujdqexq4ttqdoddilrpdz7mzej6t782fwt3cywdqqnico4w56vzdxi6g15ryg997q5t18lwq8p6u7thlwyhac445guyolhpq1artmib6stb2n5chyqcei5lf3oo99m4gyw4gdwh72w0d9kqloi680tc24k5utizuv5jl4bco2fxshjzof71ghjzs93zggu62ng2srtc9vpty2t4dfm0b7w0fe1g0d94cfz5xyyt7wqgr5veadqhsob9mshykqtr8827fzzu06zza3jnr8er1quohmnfu0ajbkd0wi9q2n0h3s9s81mwzy4ejhvzt17vzdckz8broepqrui60lhcs5lzd5sxf53e75cpstkoz1owu2licvfeq6wvmthz3a6ugfs909m3q1g8cv8rv534p67nopks4e87mwj2skh2f80hlt2x6zg4y5r1n9y9yjjadw8a2jridvhf2rhnlc59k5lpvvj33rrao94gw5ldpd8vor68chhzwuktz1m8hiiek5ph054tnhhhcap6293axdec5tr',
                redirect: 'fjxvzlunorjk1jzbau07l5qn3s9vxfqq07d398yphp8ypeoo4ikkwf83t5vjcg1jt7n5a0ycz5lrqk7hywbgkymcr58fg22ykkvexcm5xp6a5m8dtgz9v1hk9a0ryf67d8jv975m5t7ybb3vr73z61t7vz2ivz8vg318yutitorzxszbquba0830m50g2tp4fc3swisr9h9r637wec9delxczcgsbadnp4e3v4fv3fw2en1z9v7ug3cm9m5bt2qjrg0ls3xzq3fpynccae1ykqgel3q4x2mgspsin2jh0emmio7pepqjp2iujead09j657z16w0mky0xygm430ep66m1xo31q00faun116u8fjqhf6nynnylay06cantbpvcvax0zbx487oqxrnqy7bytcrg3qqefi22axpnem8kr8xeduwd4thf7gd6x2m85g6yr7e2i9x8gpg1c44j3h1swxn3tdkghrpngh5l49f5c9dnyvtusz3cbx9u6ba3aspfsyf3rpt3npsfn2b1g0n4vxbhcg9d8m94bs2g55sv4e6b1azuvr5098hsh8czc8qe6g3qvib978kstrcllr3q57ier04kjt8298swtxfn9mvndddz5cwaqrw6zr87wdebcxwcd390jci3eelzgs8xlb7gx64cpkhf6t229nemeesjrlu8s8p52j8krnxjyw0hxm0cflmvimgel55hxsahk5h45vvf3fq5kgpfevi97ndastzh74rgz9pofg36vv8kynkbj4sfc0581h087jbrsw4b9ve8wchnuzfzigkrvxacsa7agaypq5r2f9h2xufr2sf9u67asf6apjv28axlcbln8gcaoc91k1cfp3k9wucv9f9t9iefqlt7v1nasqopsmebfjbkvm1at1rewr1tp8pkpwdb8ql1n1w7r2bvy9pu60v19na5evk0m3gs4ozboyirru86pmrvpu936owj8m7zgnmw8v2np8hq6odojorfzy3lofqjolxgiyl8fdohvjf3q24xox722nx6bgztayky6pd6chcdt0yd36yb2r8bzyjxpiar7w9pcn7peq4b8h264p05j6ydmsdti1g0prbnzgxfara0stkmjcb8e2236pqo3sb0i8onw50wlsrtgolvvjp0ph3l6uorj8y7ee3gfdbhsq53vk7d9ag0avwnqt6onsvauq6deoc3wj97daew878ylgej3dhj1esnnx7pk29l802crehoy5wh5f9tpdz9sw9pyli508k25fcez9ep3ibc91zhrcc4nj5wuqym5uc1ynchvq9no3q4gv9bbigfittxz3a43jdcnyaj66w6pha7r3ob6jebblvgru2eqmvd6th8d2zodmhu1pck3r80gjtw0ssmcpfs3w0ocft9aoki67tpu1qaed7l17j0qb66iroyhaeudtd6qfkglj2okizz2y10f26nhz5kajs3p22hni2gyysqr9b895o5gxxqlhzn7nha3f72sbpxesgach84f1e0rz5yrpef6n9nxvw5trqdh6yjpa9xmpfcib658r1un4ao9ssci0awhg571px0podepbea18f26mdi6yxxpn8zrabq0ikvh3aru0jvwpoxzh73uyjx3rcgrsnnjfp7i1hubujkt6u2g15g5ebn9hftn9qdfakagu9fyjt0pyxnb3e6gez9acdd1374bq3d71j9ezm8yr069gc0ji7ytoy7hslcs4j7jl42ym6iworw5y5nhcuny7f85lrj5fjg3hadcwoyg2k0il4mvu6h3slwoixru1cajdabvve8wxl1whiws4sj96cikdan33j1ww05r9ysfoow0rtrxjnk04kjlt4yte2e7sfbh7roepdg67nj29wxecrk9ny7sg7fcu7qzsapxhfadatcdy172wta2m1mbv67yrucy6urjqcpw86k2fhclp50qbuc2tgt2yyhfndk58j1p2ee7oicz63w99kua4mvo1zah1o3wzr2sq69leqqi0bezox8ghq9i59k8ev6gbir',
                expiredAccessToken: 9676431232,
                expiredRefreshToken: 3354961574,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ddbc657c-6f2f-4f7a-b478-c71d48d0c408'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8327d549-c4a1-4f1f-9509-108d5766f49a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8327d549-c4a1-4f1f-9509-108d5766f49a'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/dedc34c4-0ca6-41f4-9256-e8d46ef76840')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/8327d549-c4a1-4f1f-9509-108d5766f49a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8327d549-c4a1-4f1f-9509-108d5766f49a'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '75c5d8fc-aba0-4e74-be38-076ae13bf942',
                grantType: 'CLIENT_CREDENTIALS',
                name: '35hdgbhrol016yi5ktjpksp6oitvfbno3gaed23eapeb0llm8pmqhzj04m7u0gdqet5af51fctbozrgdvzq97on06pq4quiikmet8wzrv10aif7db4i8pc1tl7ezfjjtctxhbnnd1w8uj0ovrojuce0vrn77p8glf2tf42l31c980s5vx159rzea14vs6gui4n5433etvcqqiev9ls9jijo91bvlienrlo3qr4ts8on1b7z5wrm103vn0k24spk',
                secret: '2zdjnudebtc9w0b0bua03kz2ae2f45rn2y80iy9rd0zw5x8bj5szrruz0silypaeyt79e0f1ggedj3uhjdfbod1y5j',
                authUrl: 'g36d3qk2qdz7961j4la0e1dzgtqt1i4qbmydn2qfdz3qzfpzv6n4djouuwtwla0jrvikjjx7xxovro3926ua1dnniscteq4ji2qw56ik1ipbz7rb5nmuqn6vmy6bqyan6e9yxyfibr1mwppfl0w500tyd6pu2mgcvjgap58k61asue62qo9eh1mafyyyw8v56hbltnwpj491vzda25wgjwme4g6452aeaqk3l456nfdd2ivu6nuo2kc68urqeohgcs4mn75lhd1zj5loyahqxb1drpock3stfduo3by808n9c73cjpq4nu39lmpze8yurq4ya0c2rrzr33zrwd6z417n8h95g0ib9dhpkqpzvp8ya3nsu6ia0pummjt613jfx27809d6uy7bqt4kbwd8vhhv3i7n87sydyip32g20z97jk0bglb1vcvjqor9qyl2zir6n43j9bdc1ltblw1f8yl52v7gwfhu33ydjkjoq4vo2aa9epr09e7mjht1du9kraefvasahk9ds4jkj3qnfr5d6w8jg415swf83yv2p4alq9lrge717swsyas3mbxog6svf84hxhu2wh4ix2ny9nugcpi6jm25sawa1ijay9e5akwf1rb8rj4yrceiwhfnpvaexylsx9ktyvy4zsod40cboiwdag4qytsb4sas9vqn83alyij1htw5hna7n5tn7l8ahlf2yuvqvrbhg46r0c6scvpr7h0z83iwb6gn2u6ogw7a8yjpt4xyiyud6rwjcsjz2c2ywa8q9se6btcjes63kem6drfc6njk4vrayejm7iz9qkijhhkb8m52sz65yxc0asiyscgzksbbts2utgmckhkd7ldzryfsc993rht8pvexmvishxviodwipb14d8okpgdyd5ind4tqfgbwkxvb6twwtz70yknskkdxxz7oyqt09rxufgv4cysxj7flzezlbda8v21997p2fdbnihv2x9eeltvv5472b2bhj0zlk9biuzccq1y42jsq6q5k51i79xvxwa5wrf2opu7mrkwmprvyrcwy5nchq9p44zlsh5zj815v03350vqe8g2tr2105y64neuuzb02qzqiwolcnxhgm6xazivyrih6bu0sc26r8fb2e0bqoaqxt8tryel9yjxsor5h7af12ywt36drez4vvg1mpjkyo55g0eaq7wlkyhidsphut3poc1jp988d1nbw8tg0jfqzcil5szdjwufjpo4x11znl3wim4dysxt8keh06kw99jwizhuukzwkco2ocy7e4am9dnaz7dq8js67xn4vhjo52evehl9mov36vwv93smeyih39ewgq65uakt9q2chccmpa3urfso5qh9yaybmcn6qkfi0gm7v2fv4s5w0vyr1114mtp8wcq3mpwrvnwumblcckkvp8en6fzz0uhns9mw8bc0ktdh6tm34iotyadslpua5izdrc0ojd8sofwvmkn5t09rwl99fq5p42m6jeeyfq9j4hcy86mpzt6h9wyziuyr4v6fexwv8ldbvfoeasbf34lqqps6316sxq2ls7esca7ykmu9cwbzbr7t7l6dznjokokkqtxqi8zruhnwwvq3mxiecmd9cvuv42jugr6pimvelw3mjlwfmb1w0aqxzb9y0geilwxlli9re6onjz1ibimqo2fe8fmsdo64ifa2c4pvuq4xan5njfvgo0aj2pnrm0trlsf8ryyt4zrd336drlbgy0sj7p5xrbps8eowxvlcf4gw2z9ilkifzytogo6l6sm4hafh5ku7of3a5bp8hnj6b89q04bbnr12v4o5111fpdonocimrg394b891xx6z09rxls92y5vy3qt8kj8d6371055eb1vcjnzct0ci9jej09uqv9jb52skv2kl94o74pw23qzrjneqz1awsqci6orp5dh5w0t0otjns9v5ftliku6q47347b9825dcr3org2z3jx69afacaohjfzhnfk1muqauj5tcq5ddhi63hw1wgc2sbvakbv42ujld7scglres',
                redirect: 'dz8wqmskujl55tyg7hgrti3baobfzc9f2hs728c96wa6jxg16i1ax9lq86lufww0exrbenyp7whdwa5cvlus359tl6j8jv5x9freortpy9avl8er9h2b5x9dwlcc8mlwa9qfqj1lnppnlg4uq3t5ngz4neao24hugv0p7mwmzgpvyw9m7ej30hywilh5vzs13ti307mdsm76gnarkh27fk27sud3xoupb8rz7qen7jvct4uoo536wa0ewuvznjavu0cuvou6vpa2tbqy31a1lrxeus0ewti20eduxtuziwjguyvhz2vzf2h2o4nl22yqvp0vnu1wyupmx88niquu4jvqw7urcuc1d7wiem5wff6r91kgjtuhawlnehwm0plrl8r6rvtwyx4sz31wpxovumqqhk6zg7pxz66pgqg3rflekvhol79aap5fjvkktisddwjb5460y5koh0qrpssu6hc4gc82vikle8a3l8ddsa0tzgjdbk8kh0o2wa1y880atvlacj50avuhxd7dvdx8rncslboc0c0y8pac1ac35oglqobbm1gouhutzt91f2agm23c1gnb1zei6awmy6gpwhrikdre22pn9c3kt2w76jk68m8huozadshd6xfhr0h2t3ohnw9x17jnmehw7qqvxu6v4jw675kw7f1f66lyuu8h3xreqjobw6cwstnys3npgejd4eoqqi0syx32jgu8o5u3y4invbci30n8jq7r16qfjmnr6mafsyemuylvb2o65a4rujbz2mmgut7ma2pfg0qzhld4i8qc40hb1d7qlecuh4qphssl91de7gs7qohfzd57gj2l6jxw7yfavoqifvkvq6pu3wiznbffzk9i0oq8c4gnjhulr87krsjuadr1gtbp55rmp0r70ot06jjb2i3399axr98ewvihiwn085ai1hu0pp4gr9d8nj0v2tvotxdr91i1qy2m86rw9q6u4bo7vrl08l8o1s60g5kuqsmsdblvk7uv0xel73wxd7tdrdeevtheuqfvhbgyvnja4wh8oo1m9jycgm6dcyms1n4inwjihgv63w8ks7mwqalqrvd8e9mohsxnz138pobcbls1p93p4dk5mfv9abi9stpzl3m0ma0g87ast1v92qmynzkcc4nkoile2xxdzq146k6wg6zlxf8n5xm4fbmvmtwonvd9r0egoh25jo378xma67p6aclwvcwimd0snps6vgp6sjhs6hb2asmlqw3w2hqs1wym18unua3cpag87hue41km3s0rdzk8gz5y7fg951wo6fyjuva3e4vxn5ptpy1rk1i16egpmpjdq1jl3peyk6ibpwj8bh37x7zgsp22sty2kcaxit9p6y6vestim8rm0vik67p6mlip7nxz7s8cqtwgmgk1ek17y4w1d4ccqyksftnom4noxpef4qhl41o6z1sy5i56wgc2yncfvf2jddv9zcqflw3l92s2pp4gq7znwcjmfh2s4mg87a51csi2ktw7wt9cfx0yh6ff2hb7j37asiam98u4740qjydh8d5v5ky8jaaie6dvrio4wel1w1y55mtnilocugrd5lv7begh4c0g8a5snf5inj801dxbj5hf1l95cvualnb3k1phrls61hrirt974drj5bz7q9inkq9hicuc96cyz2w59os4in3xey05op8m6wz2i1azcv6ljswll1matiq87rojmt7e8ch4mosmmc8na0igy5uf0np69vh3hb1tj13x8gwu738uxazhjcrgdl6687joow208vu734tuzweiuyxhp0sfx4j9vrs0vnlw71reopv8j1k1ct9mrqnpxbqb699zu739ov0sswxd4e775f7mg2i01udytmyriois5q66ocwq0cml3qa6cfdfogbtc7kur4946q71f55ar2z4aju0ssx5ehhlkv1nngdxcb5wun8xcry20r0vzah8m8eh3duz7lmann04f1hqxzz9dtjromm6b113stf8ly2k5he7qfiq14j4fzwoz1kcpi7in5d0',
                expiredAccessToken: 8872948194,
                expiredRefreshToken: 3191214744,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                grantType: 'PASSWORD',
                name: 'c5gu0f2i1vrnciisp8c9n9fxqvvp7pwa46y464bw9f9rz8hthbtb2xw7884h5omvp8ul1mkuf7r4w500eo3namd7n59x0xdqzgo6zfof9om3q3fw1geneya2fe6wnvwehtfvm7d2yznoce49exuhgz2mixhf90gc3oles3rpk9h9vk7hvp9f6u7ak8gp7ow6ivryyc9zaul5i5eem4ns45jghhdsojfa9tl6d8pjf4ibpya76reeid2cuh27wax',
                secret: '8mx37k03mzj84dj43h32j9jxv6jb4u3goy67pvxzn7xcdvoowmo7ymt6b9rdfy57l6r6l7z5ag7ktrfukx0jrqkkmi',
                authUrl: '169azeqh75qzx1a4wayju7upvx7nqzrcp4rmdsfrj6rnuod48pn4x0dmx4tbpxs347nj2nsmqmy54e3avgwnrifilraxp11wr5bh8ra32izzn2x1i0wx6spbl0zkrxc3uolzj08c6nszvhdniew1b2hi02a8na37vkvi8vfykqs22cigfbkldtpz6e6g7l5g6b3qapuqa5t6u89mfcm33mgk9jokojwxve0cd3mhu3froedbjagy0k1vi503nqrwh7jc3qwc60upk478xv7dyk48tfrqf42ezi0dva6nb0uea8ob2hmppervghq2k5fx9z1gke584i3vkikw2oqepa1ofbntxq080xczyoh1xqfr4d16zpsettmdphsctzfgysop4cxtsy58c74e3swa7qqxqs0jc9mvqjybgd8aaoh3tubvxnwt10kkpaiman50gpjxx3zut52sue08ajygjbjg2azazfpsxxtig5j7iee52vbyr45a5donrltvd6lqmjclzmhx7q6gpzy3r6j17wxn2eriwadosx009sb8xa88sj8lwpcsic9yecxpttjcvzohwc9i8xgojgk0fqfqohdfb1n3k8000mczlohoyu1d01dbjot8yu9ab9t1ezx1tw9gcu0rp26e6nmbqacbgbksstbtt6k63lygar3t04elqk6rsagpnddvq040ft4my7x2mwezgvc33xunayw4wz79pdwx0oqms7mjefiardan32rfwctfk7lxqm4jhcdzm3k9npryz99hwwm7tne00uxqg2qd1wtss9ioigtr4lpoe05lcgs7bizncrdkp2mdubs4zshu4zqkrbix7mn70ek9ge65qfn4orjgvwt9dpryvyolkai3o7toaxg624t6nvz50n3desyk3qm9r0vt8vhu2piqz0tdr06b8144kb8k4diwz9id14jm3ew6jtuy3lzlnej5gs48lhwl20ymqvvbbv3vjp3rw5wz81y174t47c1vnanks4td3f9fokn8rpr138awii4gw12ekbhd8kj2n20r9lcnvehps40o6at3vtv12k3t96e695omnzp5z167wtwi15f10fnwxnp784nguvrbbp34k8u0pih9hjz3axwii5c3qrbqvil9knfgdsilb36ypw659j35nyxwyxt9szkxomioiy48garqsp2j389qmwxdg5we5h0stchjc69ad19w680t7fghusn66h8xld90gbyc8wqi9pgonkrb6kczeyvlhern7goq9f3wm6z1v8v3gfjewr6l2r2e99pybagcuj8glb5vbcfdqadq6xyvkgb4j23bwb9p8lf5h50qgbh44vudyb7yk07wu2xlvaq8gtq1h95f0eld29o6jh97a13gc8s3z99p2kwdtzmrsjyxo8yvds95z39oogkty9hbyc2blfqxhmzo35o5rgkai66s4cghzwinxb0i6hio60s0y6pfjdbrvzp54c6czgdiljtqkdvs8p6gn82j36mciwzqmbzommn7tv72mexmwkjwn0omictr8zgbw4tdan6eobwmvuhez59g5pqasr3wk92mtdlxqg5wa3aqheda8dyh32wjplnnazmkxfx4tb5l4xifbetr2h12lkxu88nsya1pi3gc66ttclwgpkv1c2ubjoi3d020ga81bcq3us9q4ion5ywt5pu8ol1e7rt35rxiw48xz6my1i6rlkm6ujfz5hsx29t5tf3kd9h4d36iz3p22wpixwac8g7aiegmzyivoh5rzqsefn9syttt8hzwwvtjlhlgj9kqo4qpyu2e0mf0lodptotywhiszh6sst770djl619m3gh0zr1ivvqosj41v6fersc67pjeold2pionnpve1ugsnpw710u2z8pzax3v7n182mk8b6v1jr9pqmp9eixekuitayu2o4vqnp4sitwqlclqr4xidyqmpg587r4l3aqi4jj66fdxaunusxpxm2lf0fqbowetfiqbcfrswnv651c77bya4r94ypnhm13bx0gtgrc6',
                redirect: 'd0ioq1b6286xipcdbov3cut6ysm9bwq6678d06amlohd6avo9t36ollg2yhelsrz8wz5dbbymu4jzlgxw9tt12y03d4ex2dslex8yzh85g30qihdu0jfdpj746vkfnuzbcfq6g7sm71nb7e0b99o0dtkuav2vd3dqgl7my5wmv3ipomifufhdua7xc9k3w0aziurci30jfex6oxw5cmpz6adne6nm89lfbxs2os5sm5tq5qctot5zbpjtgsefx5qdrghvmyyv655b7jygis6a2i2ziqchp8yyjbesa06aujgej0f0cpkbtl6rqnue6mgrkn0nf1bm1akonbpzi3fc7hl77y3ztrnm620rjzk6rbah4aq5s0os4q7jiniyhssebp4jy3jd0sp11xq5czt4byt8xxtwrb9f038rl8aopzat56tn68qqkreyzt1l2t4kn980wbtj53lv6p90qu677yexhms8va1u5xwlkt7cflvuess3lx1vmn7f22ednvnw7za6ym1jze7vva7by9opwgcblpjbarepv9xtlc3rrp0zsbshfgw8uuyn1rhb5qyw4jp89150h10sj8cyyzsjwthp52aa4hom2ew97vpyrmnc1mm11kk0qxaptvxjze8rkrzxhhqb0bztdqnsatydbsekbgpnbbpiy7d01k7l3qhwxhqgedwenlybwvij5zdpickrpwfb2vcjkyxwkvp8xn66xnhuvyv43zwz3f5hxr2tdcw9w6fdp3a6fc7aznx7t3hfk3eqcm5qyoa7tjoza4c4en6jhq7x1znheb7o4hq6wos8fqq9rhjye67pw9beaaf3qlpi2qhikrw4e3cnntep5jkpeau55k2u6t7rtlu4ri4w2mkhfhtt32t67s4cjihzzp5lnpw5yf1qtq84yif6srk8x5rrhv63qftre8csu1m9dzgb3cll5ql1k05l08in2z4zl8u2et8m7rw8fveyo19o5jd44y08lbnt9bkyecbmjr3urssjnku3kvh57dl0yoer39zznq8e5kw76ojdk6hr8o2wuhi8nmw7m8xzi2e6ouoid9f2ty4r80goumfbjydhdm3yqdjqyltaintivf7vk729ukl1pf7fhuucefa6kog1coifrgd3p62hwdmhzv9v5fbs982uyajwbsl4v8w2uoc0bamq5a1tn3ahwwpcpqxj2qwm27r4t0nwmfu4657wdtpn2sbg5yssaux4tj0wbvle58ac8p2tyoe2ih8km0a3glh3v9en7o45ib5sqdr2sj7u23r61cxibeinovy3qyve02ljge4844iajusbhqs91ag3fxp9rk9om0yubtvx40z1kucskofrl7g32glu4q0ehj63ol49hw93wx910mcbio7o3fyszaz96sq1x1e4sd92phrziv5y0joeibzhni4fj4pknt6jq0xywbu0p79hfv3zbpuinq6hrv2b7ay1fie59s75am6ett5lcsq3aga1g81q5qdnerlxynlff97kvk3s5z010y23by6bwbyazc3fylpddeddevezy88tc05q8madiwdd9g664b899g1jmy92jy16ihqtmaq55w1jp8fqis1fy7w7n1zrf87a5y17asgcl69xnwlrcxbaxt5rv5alp362bvrvzjx1bos9cxuc1bidskom3ai0cuv0d8sz7fqopf784jmsebppw3dz6pjhvo3kfu5s2bw9vmzdy9e2ibs33pw7o9nl48aw6idv1d3cnuw3lrsu7l0002eelrbnb6r1o2tgj5nsj0ltkf1e7ecjqepp4bxamq1o47fj5ntksgpmyubs800oc8gx9h82n2veb8vbpyokx0whun84x9qt1ve6s9u617cptbo8lyfegbz9beijda13mkc4wktzut1os04r81auprrmud9n3aldhyj6zurqe6j0syd1kl8ca6yg6bzqrqfv085sv4tdnkivr4zhx8dzt6lrokqt0rx5el6opos5fcygpdgzw6yjjkrf3qiery8n7wws626u2pfzfgu',
                expiredAccessToken: 9739260513,
                expiredRefreshToken: 5476780399,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8327d549-c4a1-4f1f-9509-108d5766f49a'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/a0ca5f48-261d-4029-8f4d-f2a9df0adaf1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/8327d549-c4a1-4f1f-9509-108d5766f49a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ed8aa803-610b-48b9-9765-ec0ca934940c',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'iycieopqnke9nm0de244l1f9f7z9xz3x16r2squ5rg3mwe0405kiawjqnkm4t1emj72xnzpkra19tlvz5w1eley0zu8ct5v86nfpp00b1abkgq6zzq6zsw1t0z9qsnsglwtlh3cnkxh1pquov4ru68y7ay6ognb514ykm6ukyy807n8kouhu17714sa5eqmzd6jko7rvyxjbqsn5vl9s2vibk2zc7lk9zyuruxkln5kptr0uq77ex5uav9bm05q',
                        secret: 'mrdymjuibj6omjnc36ai3fw09s5i64nvltpts8mfw3d5ouwzt88ms3aatfvqufxp0uawj8qfxyr7425v4di7547v7o',
                        authUrl: '4drbru6t9r69p7obzga46fh6obgkvrd69c67plz6ixblzzlxepg94tc319xcdr80rn09rwpzii9j5e6loarh3d97k3vvhyh2dvduwruuszter1ig38m8n1r4asoek8kld3356ju7nghabrgvqdvq1ubml6tq35o3arlmbxzs9pdakl54uxrnwrzlqko9p5ewa3k31bcj04mgzkfrs8lc77bvk6k82bpjvr2kn10k79rzbgoi0w1i6lz8fi8dwz6v2h1wnqv3klnqabxo8ap0oms785xnzrcchekgcdqk2jnd0d28y4qmqorzw64ep3imya8bwi0707lsnskaoqfgdg0zqr4m61ej073akmc7sb5fppmenl5hpjo2md8zgsif1yg0xlqycmlhgw7qp3kofi6spilnkc8ethqnhysjw4kbfhg9gzeokrv4c7zpqrcxxug9l4ks83rxmaz8nh8df9c86ppeqyr6erswrh5hgx4oi2iu4r7eefsr5wl3jautdje4hdida9bgrt27hblqccq8a893z3n9quq6j36sl1ft2d3bn15pr8upz68pp7d1fkt26z4yfmupixe5ogy5pg7842z06t2ax8jpv86ghduuxti5kk06ow2cub3pnqkqraxhau43rdt1rxogxwpe1kx3fir4w4t0bvienhsz4cchi5fy2ibg0gbxlbeei1upu9h2n0ts413wcfgymr8ue65glatpne8gintstazuvylxczh1im7o3zg06xp7r146sihc9ky8d9fe939iqoy5j66zuaoll65ja3n6gbp03ow4oz7b71l2tueiacwpq8xn8et4fut9q126t66tjfwb9xi16f800tbnws0qgkgvr8f0kr6ab1so96oy1dykwbfqwgws6n63hp4aflqtt5aw1qlgpnlqflv9bkolcle0tz3b33aqux0phaf5r9q7t89eyyw8qab5w1tav3i8flg9g109yg3gjs6leo1tdwyqvxfrocmg1ritj0cnbchxlbxsszabxqemb02dntdan13kor54vmzqd5aixpclpbj378ye1b57m2xxht5z0gxti5p05zcy3x2riftrahu2c916pt420kw4vo3bfulv38zgr5plsbu1jxrokz4rb5qcdjawlj2dm0ddv94zw30pc9db4pmvanarggy5594fzmgsrpwnt4qwl0co5kzqfmxtpw9r51xmb77rr0y69nz23cawc10tggk6q5i9lboy2vttwu4asd7m6bxqlbsvn53pgo9klcz3vm0s7t25s7gr7k5cyi9vezoopxafk38v7gbu71rtap1l324ltrlt6ihhgggst6ok8hmmun3gtljaq6ewtctowjp4wrvjpag8dz1s39pcio2njq7hqqgqlff3clhz0wk1herj68nnz4an2uovq7q3zpu8pytxnj4dj52vrjn4d19qia9wwijld3si3yar3gxxiem251ucentoiqxf4ujjk9eig6iijy0lalptn0dkiqxig5vhe7i23pgvdwjmznpjuexkftylnnaz5a9jkedyrt9rjd5tcklu5kspfbziwuuphiitt4zoggt3jal9xavzz31zxrq6yqvthxj7j5fajaxexa6rws14mokzcbkc9qw7lvkykrg01ghavzzu8kwf7tk5loz5sp22p4224qrkj3zbf9j7cad002zjdzdqv792aembrgab1z26v4f0d6u7crru22isjko065j79oynp0zztteo0b4w9hefxm1hfsv9fnjb1y6qiu0lxthqz8qi4nzw5lh14eknduqv2mnzzqp3ipt8y8leyz67uys35f6vgbpha5jino00497kbmxi4bd6s7xboatgh0zhkfke8pdpbt7tqmku37pi3ryn7iy07m5ezu9082gwks3ulptywwpj9hlnt6u7ma0ifgh928o2j71v3j819b3n5ge7crmv91n891asu5oxq6irnum8cgukfm4xlcg6slbtp1sup6iyzhg9tzvffkpkas64qn3h2xjn1oy2u06g7fb0',
                        redirect: 'dagmuggafs9ypkrpk8wgffcxkkzwa59af5o4rszo74nyeouu0qty15d82mwcuynneqhavtq8by72pkft7wudbizne4scdx8yr1feg9yx266q6o8m9fg8f8fe29w3a8gaz4kqoq4n3esaktsue0x6tmjylgs8h02cyldpn43giw1ysqgmfax22s2jwc0wl0ssm0u598dmaw54iglze3f9zhupp23v6mx6vjftbqohy7lv47fe3z1icebgletsguppop5cyrifoqjtbem1gia8n38gv2yrkw3sch3l40c3y9d98f64o4p2wsq16pwhd2chm1hsozgaqycesgc307xc0tidjngig534j2t086gk47e5ampdt61l21eyja68hplvyk06u1i5ybj3cslhg822tgtd3szzc01baabj9fij61s46cg1iiixzq8zl2koqngvklnn0y3rzm1nvcwb3frbduag3e56mqt7b59aa1e48x9cyoonjsfuyk0lvq8xmsc4xxbng6wzi6lg86pi4q1tcjqzaussh9unjc7rdgfajpkilhlaqyvxdtkc36h6yi9mkek6g998flm5t7ob2g56e759ld3bgcnr9fvg1luwgp5zjgrqcvmsj6w8lrvo7t0a3c5w7vjuf739jok04cm5796dmm4unsuh6e799hpq072v849uf2bvaq4xcmj2hqgzivl9r4sl4ya459f3dhocsbgycmjq9nm5b19p9ks6r64q5uykh4oyta8bqsa74dgstolap6xw9orc05ncom48651ztkxxrblhsmtcdt71ze1nkvvqa0bldhz630dw473zeykno24r1j2o86vix9rarr4843b0bpw4n3psnrmhohx2vtiewh7i0zna7blu4wr1u6msdgyg000dap75armu67x3imb1poqqnaoegrhrj2ymur8j8prmvr6vkfr1hqxzn7mej62dvkx429iau9a609my6jnz2vvsiiqjf9g14styj929gm807sd98uez0jos5p94obmeuiwlo0clfl8umnm8ha832npkucqu8o2rih99gksye1jvnsksccpvo2h5mo28a4c8m54gohps1pxlfsc02wgcl05fezb9kdt1ussut6emmhgkce1leohoe7der6d00vqoloywkc5d21wliqdyov88pjq8jwiankfx59sma5xk8njjq30u48obt2q66a0kglbuwpbfko43ve6o1baxop7qgwzog0nfnm3jfex50v2nq3c90h73pz3s3y5rirguuyme20u0qb0q8ezd629ez805neu1oj016htzg56304peapcn2e5jstdyrnc3ybgvakk0lo8oqrdgqa7qje0w1pph15c3pyzaynb5oe1o29u69ocxkkmw490e337glzpj7gdtzrvq9s5uqelxw85gsv2vugrpud6hansvy4bn70ybg6rti46zlw01ehdddq7i06k607umfch3gqnql34cqzfviatmyxgh8zh1om19lzvg3wciq8b2f3wp8odx8nduj7yf2dgrmuq63fj9u5atshgt28sib00dtpuk1jwgkup9ziu5yxzkoor3yke2tmjnyuezg3l9ywebu56t5m9s8fdkysq9tw8g3v0exnpunxpzc0g9pfbjd5k4v5bduun8w25dmmkn86vfn1weo6hewbmx8v111at8smsoj76wwxif8lsrmky3yekqmsnnze3h7ixrj6z0untgj179c49cr5ig1zd722hyjdpavg8omali8siny7tlmowz2b2wr5yrmilnrrvgasby8wzslblurpqpv6cl8g34xkiyhn01keyanc7u11lvlcut99328kc8shk9wmvaapqin9zahxb380ru2rp1nj3w3udhiyk8y5l2lz016dzh9qyhnsvh8xb1gf2hcpldvcjmup0fxlonrbkq1a9152luqsqyp142oqq03ek0d36yijkbgyfyuqi3h3grm0s1hl6ke69cvfyjcb47i8eijehwag7no76ez12k3tbo0iwd30zxtmsq',
                        expiredAccessToken: 3240000104,
                        expiredRefreshToken: 4388944927,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'ed8aa803-610b-48b9-9765-ec0ca934940c');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '60c2b4f5-7640-4596-b683-d51742bccf0e'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '8327d549-c4a1-4f1f-9509-108d5766f49a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('8327d549-c4a1-4f1f-9509-108d5766f49a');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '876e4d43-1eae-4889-9d3b-cfe3ff598657'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8327d549-c4a1-4f1f-9509-108d5766f49a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('8327d549-c4a1-4f1f-9509-108d5766f49a');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ce049c6d-5b18-424b-8641-a72263de12ab',
                        grantType: 'PASSWORD',
                        name: 'tnrpihzovyfvl06vsrpwvxjj4vlfn9tcri0gfqwrav1ft3yre05eo526frvsgiyioro516hvigv9udelva3eosuznu9wu2pqte2rp8yyizpsxn5djuygzh88ffvbz1oa4538gw6guqs859v40614hqzdzka78j81qnjw7sfge0zgb09kl9laxezo4i3udlapd0lusl6girprha68tg7045bgc1mwr28zecdkh1823btyt0lt3dny63bcq27uv9j',
                        secret: 'at71i06ddy6dregdcwacphosiqm8gm5sj6stvv4v4d6hcgzcrerf9asi3nguieh64wt0etiy98d7sjoi6pgrkzqlpx',
                        authUrl: '1eq7cm54y4m5of850oh1xsnmub7uq3ziiv8u23gxx34f4hrupmjqqlusfdsp965rkmatjglzs2azglatx0nuicxtzkva8p9mjadyuf7rughn34f8dob8kzkfbz2ewokj8qk1a2m808119c455n2ixoe3iay7tex4haaa3y4fc5z536eylwd9vnvorz2tmdqagfdq9yz79977vdac9uhm59tssbj0ottn04nxgqo5ovnc87v5wahp2wiup273cg9k4vzzbvf8is7gj3blp5bfn4h58hu8pupe99ydhdjlautnhwu1lpp3k2sqaou72wfnqcm4zb32h9nneq60u989lc4sdo4b5d1as5lnoel2gou7gzezxckpnawwzbwtltgi4lu1uuhkvit7r1y9fg21vrdve4p8qxju3zcrjpftxnujfkusad5tc1qcqwqed8muk25y58q753m5igrg71yb9g38cs8vjm7hujdgexzylhphjrvb43hkx3atj9j7d1sg1m9uh4nq8q9ql73kzho90ibqtqcvbclfd82un74mb2l6gszwdwnxdeuox70dqs87ilvfdmptadknx5o9uxfmvv470n5x73jbrtow3sp2k0dll4jkznuzvnt27n91fvvuzgb48dt8xjzouoc241495qmkf9d7h4pc6j4j9w2a281weqtlz0x2lag7tppolfvbqo1x5cww7lf5d2quave50e4jzu6fubquxfrwiduo0tbkj2bm45n9l95w3wg4xj7hxh1vcl0oqi3gcmx4ci1d81hq5txfmc0vmu07rvd3b762j7ryague2sv0y6i1g5bueb97lf5vhmai618oxaeepu82p573a7d4bpjegkjns90v0e397trtxp8hpn8ldoh7ljgcgimleabip9wn8ynarbm9wvazgid4r4p805i5irk8l5utt0pngj1p7af4t402ug3axxq93ganrbf7tntj4bmukowpco9vdnjnk3xxtqjykdw6epcialziuj1a37ge5ry9xqq60g3qjnnx2sdybgm5w8u9uepc40q53tx4oubzlg23o7yvwzd948dsccocw4goew1lpb8zyj9cqmguggyhigzdhri7m0oiiz6ioik85ot47s6se4no1uhj9oel7p9ydngibwc6d2loscs0j2e695vkidsyvodyvrcvacxxw51m77ltnt8lc3hol8h7ncreb13gs2f27yet4qizw5w3ee3k1rz6xd0joypdt7nviniurvnrqdbrm20j2gu00w73rzq9l6amndpyawzfog0j3mxq4t41s62p85306u5fxuxcimppe9hc0z9tp6cwgc57m4knhfwat5ohi7owv2b54pbjyilpismxn75rvc7veroje5udvgq7spluppkibkrkmyxs48xotlaxk40fs97470w0l2qw0q28dfvr7rdhqpiunppomgx1bxvj8lv800z9zlh7jv2r0eb0a3ghfczj5lb2mveqerimerxjhiujltdmshn38uhfs0o1e356xiqpukuv9jvg9scn010o3sxul9vuiqgd9n69ujgsznz3le9ixdgtubdwhonx07doghjavrogi0hfq7bzjr5bv3jcpui5xn2sfh3k004wbvqnyryi80ggr4ibs4m0trd2hav9odjr5fmw7hx87wvxhqfz8l8wenh0ga9h4bh8dhqp3l7hrd867s5a2ndl230le86r7ytt5dmf0du92p1dwwpjjw8i9zu6wt108cxnjpp779zvmvucbil5qyjh3vp4vbpo55u1ii5chkp67h8w389vnfzlxjtx2c8nlem1uppz67qncaitv4gtbchmgwkyj5rx7glpcud2tpg7b1kb6l573r5nyz0m07w4aztb9y5civ3ucoh6jfgwqfz54pzr1hhwo4n33ojahd42jl2f1rveg8qh3mhvpz5c14v63sswup8d0r7q2yfzcnq4f4yqi1cj0oacj2vsbyi0heaf6uenh9dz7hrkg7cnvr5s4u8bfz9rwlec4f6q4lly4m8w',
                        redirect: '00l03ml4yz7vksbp15bavp9f1gwtezlwue2d3g4lkr5tlidwrt80a9pjwupjvra5f6791cn7oonme77rrfwckz3nvu67ww5c3dqbrr530j7woawxcs7ot15hw3r1km0d1uwoa11ohm6j18q1123oiawylafn3xy4quokt1g7oru60ny46vb2gv96g7yf0amprvssy7wr4lzxsidx3qeyrxlc8tposaya1m2ygq91xd2bexw60zx4y37apb18hhbhp9mdraybx2p0joofumagb1zq8v7n8u3raiuuftctbktfes8lrcktn8bv6e45c4rmo2xn7rn64jw05dnja4y4nwgyq17jdkmgxm7zbxbamjj8jm8o90k3ajc6qys4y3o15w1qzseqo2tdceyq829i3x482h96a33f1pysgms8vtrdpzomjftvgmpjk4k9x4yklju1enw0qp2in7lb69fpiudjnftj7ef7mcckef286wez67jic3bj3a3rtk843da47qcko9put3d0p3hg4x1po8v1id38rnuelt8at0ahefndgflgffyvlqh5pohn49ijuctpg8vsorvxvpoadhd4o4irqteog2hoq0ttfc44io131p3lrz0p219pair9yp9msfzr6p6zbvfxrssiasmsradqorijqz0sv9u4ji48xkyksowxkj715tmqtj9ieciykt3gp2hozo78a3lolqogw7hpwu6wrhq4jg2n7ye02qnwa601zatti4idgnwgpai8kb727lh4t2ycf9wb7l1tai0ahovozph8fg3jw5vl9r824li8i7etmt2r8i1tpbr7x96lajtt17na3ek329w504mpgwdba4trhoot5eo8027c20rnou0m7llgcs3yf3dklat27r4s6l2obrp3vk3r0zdsr3i4mne92sv7zcwf3uno7v9ij8yy44qx9bdnkvqhn19fiq80nurb8gjmnjiwl6x2k9dr3yydasomw2ha7dei7fb2007zrhsry5h3ktdqkunyqdf5ts8lzyy3tvnaa7vm7d69kalqaurrh826b709tuydfmhm8knyf4bci28hbyhwax89q9a4c0h5ewg0ixypnrhk40d5zog1i7eekalfrqrzo3deqn06bf1ocjw1luuy6il0nqpubh0q9mlcen0wmj5gsvpmg7365lgmg7oyui29wv7sumkt9pg4osmz994ld3byg2edqoxts04s72lu25oyh2wa0wk138hgn59yfs6ejk54w50z83he1rs90qbtwtxonxkf578xjasliwe0gxtukqikad1pxo8c8j6yqta10cn6msra2pg0ydsvgodj5urrhekpsnojhm1ab2zp66sc4amwht5qnsgcsf0biqlypvb79jegipnf0jgedlmotyqcb605pu80dso7dc45tycrxtd962707szrh4fg2eua8agysb4h20s8npr4ox4aa8yf5o4f6et4uuhgv4fjklyy56yo3yph3tdx4ikinxqv96l9uhx8rstfbtwd6xmpo9uz52kait2natnl1laxd8n0hnujgch2s7dijexj2hxf47ct7dgcrzo9ou771bihko9kcg2juj44vkj261lmsudj6imzs36opcz2od7bkt3gb28hmgfwh89kfnkgpx0xgkxykfk3s5lpwykbf95i7smzvklt03kuzbczf4pxusm6kou59hii41ihwaq50ias736rmeokk2czqf875xfgf5wyfee3m2v8lpi6zad9i1bxduavhunv6he998jnnzcfo3d25ijhku3mp928lzk4pz1pdm42zjrbhgl71l8nyj0cf82utkvyh4df3goj5w2brfzgg2tmuek9g46cwlwkwvi1mgxwlm1goij2sb0trgdlsxnaqit1mprn1n7e5n9mdg1k9zrdvydapr1ytlk9s8gfxjbe49wigwu14jn8c806i51ix2xlvrslbn03ry0jpvst6v678ksdduoxstiupznu3pjxzufatb9qn0kqclhj40tqpegrxcmkhzqe',
                        expiredAccessToken: 4350589114,
                        expiredRefreshToken: 7326171693,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8327d549-c4a1-4f1f-9509-108d5766f49a',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'fd950wrhl20ig6c01oo90q0jueln86c9axz6x9h9tyq1mqz0to8w7dprqp8fvee2dgxvv63qabqmw4rnd6iyk3e5hykt3vuofe6x6d1q9um2ca5er4b2sfg57oa4l6jojanvidx1twloe3hb976o5oxuf8ygyxycnmlml7csr0devm25gqbo1f57tmcmk5fhfp7bwith8jd2sccdx2j2ra5csf60ovq2y1vhop1rjbr71hqw3dj8e4qo53tbsi1',
                        secret: 'fcno4s7edaubz850redyqihpzwge73ng4xvd2bqnhi8royknf1t1z8k58toxb76eho7uadfs39i3khnmyeepfgu5xy',
                        authUrl: 'y3i43r5xa28nfdaq1ntvfdjkqsek1hzhkphck41r8mk0wn38mbmwdz0fejlb8u50p1qx5257d14wpp62bsmmr1wdvz6j7lvw9ikmfu5468qdc4oserbddq1fqnmfqsqexeqocdmneuianvt26ve075lc8b2j12pkqwwsraculqv5fy6ocplw9b40w6wxre3ffvvr8pjbjzm7kc4dc0zb9jgq0nyjv85agvw0dnbhxlb77refvawqjp99ivettaocspkztpr79hys03ex4pmbw1c0cusz8dai51d4xfsijvpqgdp9owqlvwydnibqt0f11o6ka1xdfj195ybivvupmyzgt2e6kn4cy3o1syr6x94psoyjt53dqjg0zsih7tc04e231r7uzxv3ngjmc94y5v0ydckwijdkmru6b1mi6m0qklci428ahx4h6y7l9ividi8ucs05g7kaw1bxtlewtm1bkpnefs1e9smwh4m6blkupz2iqa8b68i4m3jv5jiybsw5nn51v592dyvs3m4sbun7p3e4xejz2ygj5s6b4clgl6bo709j8pywctzcjgeidxqhz9grjdkisejyvyem9t4o83hkhanw5t5csi91avz88hrt5m7budjxjs330bq3azl2p1d3j5yh40870pha5q8u4ezzct6u3bmz2nk34mp2m9q1kjhosdypbbjk7gnj0dvq37azxwgnkybrcvlvq1kixlj03pshz50q9mc834q0xfmtw9ufhtqwvn5j098cngv9bc9uk301gyq3jnyrjobgqtuy97f9vqagtk0d0kt2qd6lt2u2j24ln8fdwlu52g1v3s7yo90wwht9i4gl6n4zjupvmu8fzfjsqfn8lmgxrkorojt91d0inont5vejmhuqesuzb780x2848lpb2hvu6scco4dmukqwtw8t99r2mwv9z16o5qzhtntlr59jyalba8y2ptixvingq0tld77tea4hau586a1yh6h3pt5yg4oqwjics9n1u8syn1farnw69om5bh6oju8q7lw2idcjstp1wdjl52ted5oy0clfrrszf0eqjocyp7p0twm4djjrpb3ku16a1pm4ljsgr450ijb1f8yi8t9sgoj5htlnz6lz7wpt8w8dfbrd63delxi6s8wyfvy3u4r43nzp9pb0p1malaynp939p2q9cl31lqdtrgcjzrsig8trcxs8zrulvom2ur0sw7cl8htjenldlduef4a15gkmeaw1h86bien7vlmd9crtsg4vfmw9x9rvvb5igqqb08fn9y6o1ceok35bzj89tcrf525fewjvca0zadayvabg6qxepldfbw9joly3bhx5j41cxy6no7n03xbw6p7z50vlb7iru8y6cos3jzyhsp92ng01a9dyfkscv9p11dwhrwjrzo9uon3doo931onwt8n94nljtdm6w5oe01xbpryqi0tqpod6128rgeso12u2qnjyj45b0lu6bhqlae049may8ap4jwhzm4sdvs3h9lnd78vet8dk7n4faozzxfw11grpj17e37dy4ad0mzj1rhlr97qyh8v5bxo9xoh3culnattmy5vdbnxo8vdb6z0cei9g7t139ox2fe6hdo63j17lem1gnkhqqenjagqjqotbqavdnoga6msanocnbpvj6yzwib1x3n379osj05dm6qz0khudgt9c3ffezg75ebdr0xm13jpxeso6grlmjhepzp0h312wlqhj3rqkjkstul57kxj8o8y8x3qxzrhf5mjv1ih43m9ez338eibueiixc2mzg2o2lg49tqoog21963eunnr1w7re6gnp2kstbw3foq4ohnqh2lq37nms6ex40q8bnybo72wi8kda2mdzz37j8tc76sxrr3f997n89gjgaa1japjsaen3bhzrfhactl9db7xbq8uxo3l99xsh9d5ej8l2zw8b9rzdljg89sdkqzl8lpa4q807e69bg5eu7nesb7oo1xnvmq9iaiuwv5ol319w69oldbwy0cs6kwaoikx68675',
                        redirect: 'z0ms5ymgw5pa7iz5a79spcqxi0rpzwvfh9oqidfscqltels3pgep65edzwfy4046xwwt6q1yasgaja5mlnn03bh1b917bypfob7xpgs6ga5hmpk8wivaz9cy57upb5dtgvwex0ym5mbjqx99ubxv1m4djea7y84187wvi6fzl0nbchuaygexbn7tn40anxy932g2eyqh7kajcot3kap42mv4ntuhz0tclho415a02roreame3obverhrc0j2n5x1006iqy9eku985lbkfifzbxwpg55d6z9b07zd9ace91ksdykn4bw26rv0qyoihny3oc0ampgmsjxsna3lsua6jgl1zmb9li12uwmoxlg69qecuhr383oom5k9mjiz212zku0ahgvyygivkm5qvdpwa7gq8ymnkkvchyc1f4fkk8jhw8ab7e0993s7f1c9p3v0u7y5h0bghq5xpcgyb5m9gtvz74enkcpgwz94z0zlm6wvtdf7my96fhaicpi4i0i3bzt43222q13xe44y9v7x1sbr470ilwcvckc26d8dw80py6lborjpemjhp7vvn0vuf8r8rzml5t07wwv9llwj6q75o4yx4sewb3806uc32jzw0h46krayfnm0uvvc4jqpcwxs7gc3epx14my833ons9p14sqsoo5s72xt7ecs7xzndtksx3w85tm5hzpgel3fc9pnieutha66g2amb7y9s2c66ensemoej48wxevq5dgi2jw8ozb81cemmmnnjtjvv6wgyf0prma69q9yeua5fy5gd3jlszus2x2ixeq0n2be8y8pmleizo34ivmwpf2l1h6kxtdmdrl0ewpqf8y1a8hoc0cafpjg74oes49cvt1k1i0uha5dclofu0x6vu8cm7awiutncbs16bmnfwxkdk3y69zgy7zef4crk7tje5droadwsmpbbk58eu9vozp2i9yv05bo9wmow2tlwihkw81ilnas0q10m5183x8tse11nkotq8w80h9o2975b9g5a3ve58qxhl7s44mc3mv5nygeloh46ioog8kocg6k6js4wk3vu2v3nmtpj8iu3vytcqf2ydbiohlvjaiojjr9c0p6v0ak8jybtiuj5kykoq4cgh4ind9z19hams1u9rux0y6gwe5bixub0qt1nf3rki83d5cdqjodu1qf311ud7o6e3d3ay7bpt8zk8a27qpcl7fommexlrws5qzvnw6qd4wenmh4pn031eocnos93e4m73nqf9i9yqi0tu1x8vzpqacauvakur0ssqrympohdlu02bui1l9z3d17k0ns0smw06kswv0ryqzhq1wdxw9hlgkmnjup0pprgd9y4hhzffcy00j20gbit0g121g3g7gleolp4o9n4ql2bvdw6bzreo5xbclew1a9nzdaguevnby4s8b3nfl2ua6x02cn7a8sv55glg23uer8c3d76syjpo6hj6wm58qsas42p9u7r8ov2yw3woav09tu6fwdagdhpgijnpsdttppd3h5h5psl3gq2dveqo61no13x31idgo3qbf8yuctmni4e6axs00um2gyotl2ri3gbelzi8jsmmzhubbm8tr5nal1b26rex36l5jlam55ojg8byl8rlo379srt5elt8sqhdvm4a6jqxztxk29mbit3qx8e6bazhfcow0yqay1nv8yhsst11x4t5p50d7dcllmosis18v76xwyebl4aas9t3oyxxe0kbb57vclgwansilq9fop7gooke84yezopp0gnebjrog1czezp5b1pjfb34oe3ld6xj96o5l9qritv9dz69lt8jf2qdkscd5l9n8thalipyj83we9h2m39sm5w8nmhpyn1at0i6mn225r5eod1apy08qek8n7lt7v1i5wojo7q9gh7v3j10laye2a0musfbb4jkjq9j3o9ui8y2zp86k457akf2o5d8ctibxy56vcwekuipodcfdgoj31fnbal0mr8dsto39atezozu24vfxrdbj3u3f8haau82ky7ykae7eu',
                        expiredAccessToken: 5922195090,
                        expiredRefreshToken: 4871447020,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('8327d549-c4a1-4f1f-9509-108d5766f49a');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d600ecc-4da1-4c65-b8e1-9b14b702c19a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8327d549-c4a1-4f1f-9509-108d5766f49a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('8327d549-c4a1-4f1f-9509-108d5766f49a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});